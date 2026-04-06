import Anthropic from '@anthropic-ai/sdk';
import { writeFileSync, readFileSync, existsSync, mkdirSync, readdirSync } from 'fs';
import { execSync } from 'child_process';
import { dirname } from 'path';
import { config } from './config';
import { SkillRouter } from './skill-router';
import { PipelineLogger } from './pipeline-logger';

// Skill reference paths that Claude might try to read
const SKILLS_DIR = config.skillsDir;

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
  private maxMessages = 40; // prevent context overflow

  constructor(router: SkillRouter, logger: PipelineLogger, workDir: string) {
    this.client = new Anthropic({ apiKey: config.anthropicApiKey });
    this.router = router;
    this.logger = logger;
    this.workDir = workDir;
    mkdirSync(workDir, { recursive: true });
  }

  /** Run a single step with appropriate skills and model */
  async runStep(stage: number, step: string, prompt: string, taskReqs?: string[]): Promise<string> {
    const system = this.router.buildSystemMessage(stage, step, taskReqs);
    const model = SkillRouter.getModel(stage, step);
    const start = Date.now();

    // Add user message
    this.messages.push({ role: 'user', content: prompt });

    // Trim old messages if too long
    if (this.messages.length > this.maxMessages) {
      this.messages = this.messages.slice(-this.maxMessages);
    }

    let response = await this.callWithRetry(model, system, this.messages, this.getTools());

    // Handle tool use loops
    let iterations = 0;
    while (response.stop_reason === 'tool_use' && iterations < 20) {
      iterations++;
      const toolBlocks = response.content.filter((b: any) => b.type === 'tool_use');
      const toolResults: ToolResult[] = [];

      for (const block of toolBlocks) {
        const result = await this.executeTool(block as any);
        toolResults.push({
          type: 'tool_result',
          tool_use_id: (block as any).id,
          content: result,
        });
        this.logger.log({
          stage, step, event: 'tool_use',
          detail: `${(block as any).name}: ${JSON.stringify((block as any).input).slice(0, 100)}`,
        });
      }

      // Add assistant response + tool results
      this.messages.push({ role: 'assistant', content: response.content });
      this.messages.push({ role: 'user', content: toolResults });

      response = await this.callWithRetry(model, system, this.messages, this.getTools());
    }

    // Log API call
    const usage = response.usage;
    const duration = Date.now() - start;
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

    // Add final assistant response
    this.messages.push({ role: 'assistant', content: response.content });

    // Extract text content
    return response.content
      .filter((b: any) => b.type === 'text')
      .map((b: any) => b.text)
      .join('');
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
        // Pace calls to avoid hitting rate limits
        if (attempt === 0) await this.rateLimitPause();

        return await this.client.messages.create({
          model,
          max_tokens: 16000,
          system,
          messages,
          tools,
        });
      } catch (err: any) {
        const isRateLimit = err.status === 429 || err.message?.includes('rate_limit');
        if (isRateLimit && attempt < maxRetries) {
          const waitSec = 45 * Math.pow(2, attempt); // 45s, 90s, 180s, 360s
          console.log(`  Rate limited. Waiting ${waitSec}s before retry ${attempt + 1}/${maxRetries}...`);
          this.logger.log({ stage: 0, step: 'retry', event: 'error', detail: `Rate limited, waiting ${waitSec}s` });
          await new Promise(r => setTimeout(r, waitSec * 1000));
          continue;
        }
        throw err;
      }
    }
  }

  /** Clear message history (call between stages to prevent overflow) */
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
        description: 'Read content of a file.',
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
        description: 'Run a shell command in the project directory.',
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

          // If file not found, try resolving from skills directory
          // (Claude may try to read references/ files from skill context)
          if (!existsSync(fullPath)) {
            const refPath = `${SKILLS_DIR}/${block.input.path}`;
            if (existsSync(refPath)) fullPath = refPath;
            // Also try: skill-name/references/filename
            for (const skillDir of readdirSync(SKILLS_DIR)) {
              const tryPath = join(SKILLS_DIR, skillDir, block.input.path);
              if (existsSync(tryPath)) { fullPath = tryPath; break; }
              const tryRef = join(SKILLS_DIR, skillDir, 'references', block.input.path);
              if (existsSync(tryRef)) { fullPath = tryRef; break; }
            }
          }

          if (!existsSync(fullPath)) return `Error: File not found: ${block.input.path}`;
          return readFileSync(fullPath, 'utf-8');
        }
        case 'run_command': {
          const result = execSync(block.input.command, {
            cwd: this.workDir,
            timeout: 60000,
            maxBuffer: 1024 * 1024,
          });
          return result.toString().slice(0, 4000);
        }
        default:
          return `Unknown tool: ${block.name}`;
      }
    } catch (err: any) {
      return `Error: ${err.message?.slice(0, 500)}`;
    }
  }
}
