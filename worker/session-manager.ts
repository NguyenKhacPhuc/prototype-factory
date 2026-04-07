import Anthropic from '@anthropic-ai/sdk';
import { writeFileSync, readFileSync, existsSync, mkdirSync, readdirSync } from 'fs';
import { execSync } from 'child_process';
import { dirname, join } from 'path';
import { config } from './config';
import { SkillRouter } from './skill-router';
import { PipelineLogger } from './pipeline-logger';

const SKILLS_DIR = config.skillsDir;

// === LIMITS (inspired by claw-code) ===
const MAX_TOOL_OUTPUT = 16_384;        // 16KB max per tool result
const MAX_FILE_READ = 100_000;         // 100KB max file read
const MAX_BASH_OUTPUT = 16_384;        // 16KB max bash output
const MAX_TOOL_LOOPS = 8;             // max tool use iterations per step
const COMPACTION_THRESHOLD = 50_000;   // compact when context exceeds ~50K tokens
const COMPACTION_KEEP_LAST = 4;        // keep last N messages after compaction

interface Message {
  role: 'user' | 'assistant';
  content: any;
}

interface ToolResult {
  type: 'tool_result';
  tool_use_id: string;
  content: string;
}

export class SessionManager {
  private client: Anthropic;
  private messages: Message[] = [];
  private router: SkillRouter;
  private logger: PipelineLogger;
  private workDir: string;
  private totalInputTokens = 0;

  constructor(router: SkillRouter, logger: PipelineLogger, workDir: string) {
    this.client = new Anthropic({ apiKey: config.anthropicApiKey });
    this.router = router;
    this.logger = logger;
    this.workDir = workDir;
    mkdirSync(workDir, { recursive: true });
  }

  /** Run a single step with appropriate skills and model */
  async runStep(stage: number, step: string, prompt: string, taskReqs?: string[]): Promise<string> {
    const includeRefs = stage === 1;
    const system = this.router.buildSystemMessage(stage, step, taskReqs, includeRefs);
    const model = SkillRouter.getModel(stage, step);
    const start = Date.now();

    this.messages.push({ role: 'user', content: prompt });

    // Compact if context is getting large
    this.maybeCompact();

    let response = await this.callWithRetry(model, system, this.messages, this.getTools());

    // Handle tool use loops (capped)
    let iterations = 0;
    while (response.stop_reason === 'tool_use' && iterations < MAX_TOOL_LOOPS) {
      iterations++;
      const toolBlocks = response.content.filter((b: any) => b.type === 'tool_use');
      const toolResults: ToolResult[] = [];

      for (const block of toolBlocks) {
        const result = await this.executeTool(block as any);
        toolResults.push({
          type: 'tool_result',
          tool_use_id: (block as any).id,
          content: truncate(result, MAX_TOOL_OUTPUT),
        });
        this.logger.log({
          stage, step, event: 'tool_use',
          detail: `${(block as any).name}: ${JSON.stringify((block as any).input).slice(0, 80)}`,
        });
      }

      this.messages.push({ role: 'assistant', content: response.content });
      this.messages.push({ role: 'user', content: toolResults });

      // Compact mid-loop if context is growing
      this.maybeCompact();

      response = await this.callWithRetry(model, system, this.messages, this.getTools());
    }

    // Track tokens
    const duration = Date.now() - start;
    const usage = response.usage;
    this.totalInputTokens += usage.input_tokens;

    this.logger.log({
      stage, step, event: 'api_call',
      model,
      input_tokens: usage.input_tokens,
      output_tokens: usage.output_tokens,
      cached_tokens: (usage as any).cache_read_input_tokens ?? 0,
      duration_ms: duration,
    });

    await this.logger.trackTokens(
      usage.input_tokens,
      usage.output_tokens,
      (usage as any).cache_read_input_tokens ?? 0,
    );

    this.messages.push({ role: 'assistant', content: response.content });

    return response.content
      .filter((b: any) => b.type === 'text')
      .map((b: any) => b.text)
      .join('');
  }

  /** Compact conversation when it exceeds threshold */
  private maybeCompact() {
    const estimatedTokens = this.estimateContextTokens();
    if (estimatedTokens < COMPACTION_THRESHOLD || this.messages.length <= COMPACTION_KEEP_LAST) return;

    const oldMessages = this.messages.slice(0, -COMPACTION_KEEP_LAST);
    const recentMessages = this.messages.slice(-COMPACTION_KEEP_LAST);

    // Build structured summary of old messages
    const summary = this.buildCompactionSummary(oldMessages);

    this.messages = [
      { role: 'user', content: `[Context summary from previous conversation]\n${summary}` },
      { role: 'assistant', content: [{ type: 'text', text: 'Understood. I have the context from the previous conversation. Continuing.' }] },
      ...recentMessages,
    ];

    this.logger.log({
      stage: 0, step: 'compact', event: 'complete',
      detail: `Compacted ${oldMessages.length} messages → summary. Context: ${estimatedTokens} → ~${this.estimateContextTokens()} tokens`,
    });
  }

  private buildCompactionSummary(messages: Message[]): string {
    const files: Set<string> = new Set();
    const tools: Set<string> = new Set();
    let userRequests: string[] = [];

    for (const msg of messages) {
      const content = typeof msg.content === 'string' ? msg.content : JSON.stringify(msg.content);

      // Extract file paths
      const fileMatches = content.match(/(?:write_file|read_file|File written).*?([a-zA-Z0-9_\-/.]+\.[a-z]{1,4})/g);
      if (fileMatches) fileMatches.forEach(m => {
        const f = m.match(/([a-zA-Z0-9_\-/.]+\.[a-z]{1,4})/);
        if (f) files.add(f[1]);
      });

      // Extract tool names
      const toolMatches = content.match(/"name":\s*"(\w+)"/g);
      if (toolMatches) toolMatches.forEach(m => {
        const t = m.match(/"(\w+)"$/);
        if (t) tools.add(t[1]);
      });

      // Capture user requests
      if (msg.role === 'user' && typeof msg.content === 'string' && msg.content.length < 200) {
        userRequests.push(msg.content.slice(0, 100));
      }
    }

    // Cap summary to ~1200 chars (like claw-code)
    const lines = [
      `## Compacted Context`,
      `Messages compacted: ${messages.length}`,
      `Files touched: ${[...files].slice(0, 20).join(', ')}`,
      `Tools used: ${[...tools].join(', ')}`,
      `Recent requests: ${userRequests.slice(-3).join(' | ')}`,
    ];

    return lines.join('\n').slice(0, 1200);
  }

  private estimateContextTokens(): number {
    let chars = 0;
    for (const msg of this.messages) {
      chars += typeof msg.content === 'string' ? msg.content.length : JSON.stringify(msg.content).length;
    }
    return Math.ceil(chars / 4);
  }

  /** Pause between API calls to stay under rate limits */
  private async rateLimitPause() {
    const delaySec = Number(process.env.API_DELAY_SEC) || 15;
    console.log(`  Waiting ${delaySec}s (rate limit pacing)...`);
    await new Promise(r => setTimeout(r, delaySec * 1000));
  }

  /** Call Claude API with pacing delay + retry on rate limits */
  private async callWithRetry(model: string, system: any, messages: any[], tools: any[], maxRetries = 5): Promise<any> {
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        if (attempt === 0) await this.rateLimitPause();

        return await this.client.messages.create({
          model,
          max_tokens: 8000, // reduced from 16000 — saves output tokens
          system,
          messages,
          tools,
        });
      } catch (err: any) {
        const isRateLimit = err.status === 429 || err.message?.includes('rate_limit');
        if (isRateLimit && attempt < maxRetries) {
          const waitSec = 45 * Math.pow(2, attempt);
          console.log(`  Rate limited. Waiting ${waitSec}s before retry ${attempt + 1}/${maxRetries}...`);
          this.logger.log({ stage: 0, step: 'retry', event: 'error', detail: `Rate limited, waiting ${waitSec}s` });
          await new Promise(r => setTimeout(r, waitSec * 1000));
          continue;
        }
        throw err;
      }
    }
  }

  /** Clear message history */
  clearHistory() {
    this.messages = [];
  }

  private getTools() {
    return [
      {
        name: 'write_file',
        description: 'Write content to a file. Creates parent directories if needed.',
        input_schema: {
          type: 'object' as const,
          properties: {
            path: { type: 'string', description: 'File path relative to project root' },
            content: { type: 'string', description: 'File content' },
          },
          required: ['path', 'content'],
        },
      },
      {
        name: 'read_file',
        description: 'Read content of a file (max 100KB, truncated if larger).',
        input_schema: {
          type: 'object' as const,
          properties: {
            path: { type: 'string', description: 'File path relative to project root' },
          },
          required: ['path'],
        },
      },
      {
        name: 'run_command',
        description: 'Run a shell command (output truncated to 16KB).',
        input_schema: {
          type: 'object' as const,
          properties: {
            command: { type: 'string', description: 'Shell command to execute' },
          },
          required: ['command'],
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
            const refPath = `${SKILLS_DIR}/${block.input.path}`;
            if (existsSync(refPath)) fullPath = refPath;
            for (const skillDir of readdirSync(SKILLS_DIR)) {
              const tryPath = join(SKILLS_DIR, skillDir, block.input.path);
              if (existsSync(tryPath)) { fullPath = tryPath; break; }
              const tryRef = join(SKILLS_DIR, skillDir, 'references', block.input.path);
              if (existsSync(tryRef)) { fullPath = tryRef; break; }
            }
          }

          if (!existsSync(fullPath)) return `Error: File not found: ${block.input.path}`;
          const content = readFileSync(fullPath, 'utf-8');
          return truncate(content, MAX_FILE_READ);
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

/** Truncate string to max bytes, with indicator */
function truncate(str: string, maxBytes: number): string {
  if (str.length <= maxBytes) return str;
  return str.slice(0, maxBytes) + `\n\n[... truncated at ${maxBytes} bytes, ${str.length - maxBytes} bytes omitted]`;
}
