import { writeFileSync, readFileSync, existsSync, mkdirSync, readdirSync } from 'fs';
import { execSync } from 'child_process';
import { dirname, join } from 'path';
import { config } from './config';
import { SkillRouter } from './skill-router';
import { PipelineLogger } from './pipeline-logger';

const SKILLS_DIR = config.skillsDir;

// === LIMITS (inspired by claw-code) ===
const MAX_TOOL_OUTPUT = 16_384;
const MAX_FILE_READ = 100_000;
const MAX_BASH_OUTPUT = 16_384;
const MAX_TOOL_LOOPS = 8;
const COMPACTION_THRESHOLD = 50_000;
const COMPACTION_KEEP_LAST = 4;

interface Message {
  role: 'user' | 'assistant' | 'system' | 'tool';
  content?: string;
  tool_calls?: any[];
  tool_call_id?: string;
}

export class SessionManager {
  private messages: Message[] = [];
  private router: SkillRouter;
  private logger: PipelineLogger;
  private workDir: string;

  constructor(router: SkillRouter, logger: PipelineLogger, workDir: string) {
    this.router = router;
    this.logger = logger;
    this.workDir = workDir;
    mkdirSync(workDir, { recursive: true });
    console.log('  Using OpenRouter (multi-model routing)');
  }

  async runStep(stage: number, step: string, prompt: string, taskReqs?: string[]): Promise<string> {
    const includeRefs = stage === 1;
    const systemPrompt = this.router.buildSystemPromptText(stage, step, taskReqs, includeRefs);
    const model = SkillRouter.getModel(stage, step);
    const start = Date.now();

    // Set system message + user message
    const apiMessages: Message[] = [
      { role: 'system', content: systemPrompt },
      ...this.messages,
      { role: 'user', content: prompt },
    ];

    this.messages.push({ role: 'user', content: prompt });
    this.maybeCompact();

    let response = await this.callOpenRouter(model, apiMessages);

    // Handle tool use loops
    let iterations = 0;
    while (response.tool_calls && response.tool_calls.length > 0 && iterations < MAX_TOOL_LOOPS) {
      iterations++;

      // Add assistant message with tool calls
      this.messages.push({ role: 'assistant', content: response.content || '', tool_calls: response.tool_calls });

      // Execute each tool and add results
      for (const tc of response.tool_calls) {
        let args: any;
        try {
          args = JSON.parse(tc.function.arguments);
        } catch {
          // Model returned malformed JSON — try to fix common issues
          try {
            args = JSON.parse(tc.function.arguments + '}');
          } catch {
            this.logger.log({ stage: 0, step: 'tool', event: 'error', detail: `Bad JSON: ${tc.function.arguments.slice(0, 100)}` });
            this.messages.push({ role: 'tool', tool_call_id: tc.id, content: 'Error: malformed arguments' });
            continue;
          }
        }
        const result = await this.executeTool({ name: tc.function.name, input: args });

        this.logger.log({
          stage, step, event: 'tool_use',
          detail: `${tc.function.name}: ${JSON.stringify(args).slice(0, 80)}`,
        });

        this.messages.push({
          role: 'tool',
          tool_call_id: tc.id,
          content: truncate(result, MAX_TOOL_OUTPUT),
        });
      }

      // Next API call with updated messages
      const nextMessages: Message[] = [
        { role: 'system', content: systemPrompt },
        ...this.messages,
      ];

      response = await this.callOpenRouter(model, nextMessages);
    }

    // Log final response
    const duration = Date.now() - start;
    this.logger.log({
      stage, step, event: 'api_call',
      model,
      input_tokens: response.usage?.prompt_tokens || 0,
      output_tokens: response.usage?.completion_tokens || 0,
      cached_tokens: 0,
      duration_ms: duration,
    });

    await this.logger.trackTokens(
      response.usage?.prompt_tokens || 0,
      response.usage?.completion_tokens || 0,
      0,
    );

    const text = response.content || '';
    this.messages.push({ role: 'assistant', content: text });

    return text;
  }

  private async callOpenRouter(model: string, messages: Message[], retries = 5): Promise<any> {
    for (let attempt = 0; attempt <= retries; attempt++) {
      // Rate limit pacing
      const delaySec = Number(process.env.API_DELAY_SEC) || 10;
      if (attempt === 0) {
        console.log(`  Waiting ${delaySec}s... [${model.split('/').pop()}]`);
        await new Promise(r => setTimeout(r, delaySec * 1000));
      }

      try {
        const resp = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${config.openrouterApiKey}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': 'https://appdex-ai.vercel.app',
            'X-Title': 'Appdex AI',
          },
          body: JSON.stringify({
            model,
            max_tokens: 8000,
            messages: messages.map(m => {
              const msg: any = { role: m.role, content: m.content || '' };
              if (m.tool_calls) msg.tool_calls = m.tool_calls;
              if (m.tool_call_id) msg.tool_call_id = m.tool_call_id;
              return msg;
            }),
            tools: this.getToolsOpenAI(),
          }),
        });

        const data = await resp.json();

        if (data.error) {
          const isRateLimit = data.error.code === 429 || data.error.message?.includes('rate');
          if (isRateLimit && attempt < retries) {
            const waitSec = 30 * Math.pow(2, attempt);
            console.log(`  Rate limited. Waiting ${waitSec}s...`);
            await new Promise(r => setTimeout(r, waitSec * 1000));
            continue;
          }
          throw new Error(`${data.error.code || resp.status} ${data.error.message}`);
        }

        const choice = data.choices?.[0]?.message;
        return {
          content: choice?.content || '',
          tool_calls: choice?.tool_calls || null,
          usage: data.usage,
        };
      } catch (err: any) {
        if (attempt < retries && err.message?.includes('rate')) {
          const waitSec = 30 * Math.pow(2, attempt);
          console.log(`  Error, retrying in ${waitSec}s: ${err.message?.slice(0, 80)}`);
          await new Promise(r => setTimeout(r, waitSec * 1000));
          continue;
        }
        throw err;
      }
    }
    throw new Error('Max retries exceeded');
  }

  private maybeCompact() {
    const estimatedTokens = this.estimateContextTokens();
    if (estimatedTokens < COMPACTION_THRESHOLD || this.messages.length <= COMPACTION_KEEP_LAST) return;

    // Only keep messages that don't break tool pairs
    const recentMessages = this.messages.slice(-COMPACTION_KEEP_LAST);
    const oldMessages = this.messages.slice(0, -COMPACTION_KEEP_LAST);
    const summary = this.buildCompactionSummary(oldMessages);

    this.messages = [
      { role: 'user', content: `[Context summary]\n${summary}` },
      { role: 'assistant', content: 'Understood. Continuing with the context.' },
      ...recentMessages,
    ];

    this.logger.log({
      stage: 0, step: 'compact', event: 'complete',
      detail: `Compacted ${oldMessages.length} msgs → ~${this.estimateContextTokens()} tokens`,
    });
  }

  private buildCompactionSummary(messages: Message[]): string {
    const files: Set<string> = new Set();
    const tools: Set<string> = new Set();

    for (const msg of messages) {
      const content = typeof msg.content === 'string' ? msg.content : JSON.stringify(msg.content || '');
      const fileMatches = content.match(/([a-zA-Z0-9_\-/.]+\.\w{1,4})/g);
      if (fileMatches) fileMatches.slice(0, 20).forEach(f => files.add(f));
      if (msg.tool_calls) msg.tool_calls.forEach((tc: any) => tools.add(tc.function?.name || ''));
    }

    return [
      `Messages compacted: ${messages.length}`,
      `Files touched: ${[...files].slice(0, 15).join(', ')}`,
      `Tools used: ${[...tools].join(', ')}`,
    ].join('\n').slice(0, 1200);
  }

  private estimateContextTokens(): number {
    let chars = 0;
    for (const msg of this.messages) {
      chars += (msg.content || '').length + JSON.stringify(msg.tool_calls || '').length;
    }
    return Math.ceil(chars / 4);
  }

  clearHistory() {
    this.messages = [];
  }

  private getToolsOpenAI() {
    return [
      {
        type: 'function',
        function: {
          name: 'write_file',
          description: 'Write content to a file. Creates parent directories if needed.',
          parameters: {
            type: 'object',
            properties: {
              path: { type: 'string', description: 'File path relative to project root' },
              content: { type: 'string', description: 'File content' },
            },
            required: ['path', 'content'],
          },
        },
      },
      {
        type: 'function',
        function: {
          name: 'read_file',
          description: 'Read content of a file (max 100KB).',
          parameters: {
            type: 'object',
            properties: {
              path: { type: 'string', description: 'File path relative to project root' },
            },
            required: ['path'],
          },
        },
      },
      {
        type: 'function',
        function: {
          name: 'run_command',
          description: 'Run a shell command (output truncated to 16KB).',
          parameters: {
            type: 'object',
            properties: {
              command: { type: 'string', description: 'Shell command to execute' },
            },
            required: ['command'],
          },
        },
      },
    ];
  }

  private async executeTool(block: { name: string; input: any }): Promise<string> {
    try {
      switch (block.name) {
        case 'write_file': {
          const fullPath = block.input.path.startsWith('/')
            ? block.input.path
            : `${this.workDir}/${block.input.path}`;
          mkdirSync(dirname(fullPath), { recursive: true });
          writeFileSync(fullPath, block.input.content);
          this.logger.log({ stage: 0, step: 'tool', event: 'file_write', detail: fullPath });
          return `File written: ${fullPath}`;
        }
        case 'read_file': {
          let fullPath = block.input.path.startsWith('/')
            ? block.input.path
            : `${this.workDir}/${block.input.path}`;

          if (!existsSync(fullPath)) {
            for (const skillDir of readdirSync(SKILLS_DIR)) {
              const tryPath = join(SKILLS_DIR, skillDir, block.input.path);
              if (existsSync(tryPath)) { fullPath = tryPath; break; }
              const tryRef = join(SKILLS_DIR, skillDir, 'references', block.input.path);
              if (existsSync(tryRef)) { fullPath = tryRef; break; }
            }
          }

          if (!existsSync(fullPath)) return `Error: File not found: ${block.input.path}`;
          return truncate(readFileSync(fullPath, 'utf-8'), MAX_FILE_READ);
        }
        case 'run_command': {
          const result = execSync(block.input.command, {
            cwd: this.workDir,
            timeout: 60000,
            maxBuffer: 1024 * 1024,
          });
          return truncate(result.toString(), MAX_BASH_OUTPUT);
        }
        default:
          return `Unknown tool: ${block.name}`;
      }
    } catch (err: any) {
      return truncate(`Error: ${err.message || 'Unknown error'}`, 2000);
    }
  }
}

function truncate(str: string, maxBytes: number): string {
  if (str.length <= maxBytes) return str;
  return str.slice(0, maxBytes) + `\n[truncated, ${str.length - maxBytes} bytes omitted]`;
}
