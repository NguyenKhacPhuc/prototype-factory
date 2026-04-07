import { readFileSync, existsSync, readdirSync } from 'fs';
import { join } from 'path';

interface SkillEntry {
  name: string;
  content: string;
  tokens: number;  // approximate (chars / 4)
  tags: string[];
  references: { name: string; content: string }[];
  skillDir: string;  // absolute path to skill directory
}

const SKILL_TAGS: Record<string, string[]> = {
  'mobile-app': ['orchestrator', 'pipeline'],
  'mobile-app-design-pro': ['design', 'theme', 'ui'],
  'app-design-preview': ['wireframe', 'mockup', 'preview'],
  'mobile-init': ['scaffold', 'project-setup'],
  'mobile-build': ['release', 'signing', 'store'],
  'mobile-web': ['landing', 'legal', 'support'],
  'mobile-iap': ['purchases', 'subscriptions', 'payments'],
  'mobile-admob': ['ads', 'monetization'],
  'asset-manager': ['icons', 'fonts', 'assets'],
  'flutter-expert': ['flutter', 'dart', 'framework'],
  'react-native-architecture': ['react-native', 'expo', 'framework'],
};

const STAGE_SKILLS: Record<number, string[]> = {
  0: ['mobile-app'],
  1: ['mobile-app-design-pro', 'app-design-preview'],
  2: ['mobile-init'],  // + framework skill added dynamically
  4: ['mobile-build', 'mobile-web'],
};

// Stage 3 task requirement → additional skills
const TASK_SKILL_MAP: Record<string, string[]> = {
  'iap': ['mobile-iap'],
  'purchases': ['mobile-iap'],
  'subscriptions': ['mobile-iap'],
  'ads': ['mobile-admob'],
  'monetization': ['mobile-admob'],
  'icons': ['asset-manager'],
  'fonts': ['asset-manager'],
  'assets': ['asset-manager'],
  'ui': ['mobile-app-design-pro'],
  'design': ['mobile-app-design-pro'],
  'theme': ['mobile-app-design-pro'],
};

export class SkillRouter {
  private registry: Map<string, SkillEntry> = new Map();
  private framework: 'flutter' | 'react-native' | 'kmp' = 'react-native';

  constructor(skillsDir: string) {
    this.loadSkills(skillsDir);
  }

  setFramework(fw: 'flutter' | 'react-native' | 'kmp') {
    this.framework = fw;
  }

  private loadSkills(dir: string) {
    for (const [name, tags] of Object.entries(SKILL_TAGS)) {
      const skillDir = join(dir, name);
      const skillFile = join(skillDir, 'SKILL.md');
      if (!existsSync(skillFile)) {
        console.warn(`Skill not found: ${skillFile}`);
        continue;
      }
      const content = readFileSync(skillFile, 'utf-8');

      // Load reference files if they exist
      const references: { name: string; content: string }[] = [];
      const refsDir = join(skillDir, 'references');
      if (existsSync(refsDir)) {
        const files = readdirSync(refsDir).filter(f => f.endsWith('.md'));
        for (const f of files) {
          references.push({
            name: f,
            content: readFileSync(join(refsDir, f), 'utf-8'),
          });
        }
      }

      this.registry.set(name, {
        name,
        content,
        tokens: Math.ceil(content.length / 4),
        tags,
        references,
        skillDir,
      });
    }
    console.log(`Loaded ${this.registry.size} skills`);
  }

  private get(name: string): SkillEntry | null {
    return this.registry.get(name) || null;
  }

  private getFrameworkSkill(): string {
    switch (this.framework) {
      case 'flutter': return 'flutter-expert';
      case 'react-native': return 'react-native-architecture';
      default: return 'mobile-app'; // KMP uses the main skill
    }
  }

  /** Returns minimal skill set for a given stage + task */
  resolve(stage: number, step: string, taskReqs?: string[]): SkillEntry[] {
    const skills: SkillEntry[] = [];
    const seen = new Set<string>();

    const add = (name: string) => {
      if (seen.has(name)) return;
      seen.add(name);
      const skill = this.get(name);
      if (skill) skills.push(skill);
    };

    // Stage-specific base skills
    const baseSkills = STAGE_SKILLS[stage] || [];
    for (const s of baseSkills) add(s);

    // Add framework skill for stages 2 and 3
    if (stage === 2 || stage === 3) {
      add(this.getFrameworkSkill());
    }

    // Stage 3: add task-specific skills
    if (stage === 3 && taskReqs) {
      for (const req of taskReqs) {
        const extra = TASK_SKILL_MAP[req.toLowerCase()];
        if (extra) for (const s of extra) add(s);
      }
    }

    return skills;
  }

  /** Build system message with prompt caching enabled */
  buildSystemMessage(stage: number, step: string, taskReqs?: string[], includeRefs = false) {
    const skills = this.resolve(stage, step, taskReqs);

    const skillText = skills
      .map(s => {
        let text = `## SKILL: ${s.name}\n\n${s.content}`;
        // Only include references for design stage (where they matter most)
        if (includeRefs && s.references.length > 0) {
          text += '\n\n### References\n';
          for (const ref of s.references) {
            text += `\n#### ${ref.name}\n${ref.content}\n`;
          }
        }
        return text;
      })
      .join('\n\n---\n\n');

    // Cap system prompt at 12K tokens (~48K chars) like claw-code
    const MAX_SYSTEM_CHARS = 48_000;
    const cappedText = skillText.length > MAX_SYSTEM_CHARS
      ? skillText.slice(0, MAX_SYSTEM_CHARS) + '\n\n[... skill text truncated to stay within token budget]'
      : skillText;

    const totalTokens = Math.ceil(cappedText.length / 4);
    console.log(`  Skills: [${skills.map(s => s.name).join(', ')}] ~${totalTokens} tokens (refs=${includeRefs}${skillText.length > MAX_SYSTEM_CHARS ? ', TRUNCATED' : ''})`);

    return [
      {
        type: 'text' as const,
        text: cappedText,
        cache_control: { type: 'ephemeral' as const },
      },
      {
        type: 'text' as const,
        text: 'Follow the skill instructions above precisely. You are building a production mobile app.',
      },
    ];
  }

  /** Build system prompt as plain text string (for OpenAI-compatible APIs like OpenRouter) */
  buildSystemPromptText(stage: number, step: string, taskReqs?: string[], includeRefs = false): string {
    const skills = this.resolve(stage, step, taskReqs);

    const skillText = skills
      .map(s => {
        let text = `## SKILL: ${s.name}\n\n${s.content}`;
        if (includeRefs && s.references.length > 0) {
          text += '\n\n### References\n';
          for (const ref of s.references) {
            text += `\n#### ${ref.name}\n${ref.content}\n`;
          }
        }
        return text;
      })
      .join('\n\n---\n\n');

    const MAX_SYSTEM_CHARS = 48_000;
    const cappedText = skillText.length > MAX_SYSTEM_CHARS
      ? skillText.slice(0, MAX_SYSTEM_CHARS) + '\n[truncated]'
      : skillText;

    const totalTokens = Math.ceil(cappedText.length / 4);
    console.log(`  Skills: [${skills.map(s => s.name).join(', ')}] ~${totalTokens} tokens`);

    return cappedText + '\n\nFollow the skill instructions above precisely. You are building a production mobile app.';
  }

  /** Get recommended model for this stage/step via OpenRouter */
  static getModel(stage: number, step: string): string {
    switch (stage) {
      case 0: return 'anthropic/claude-sonnet-4-6';   // Ideation — needs creativity
      case 1: return 'anthropic/claude-sonnet-4-6';   // Design — needs design sense
      case 2: return 'openai/gpt-4.1-mini';           // Scaffold — boilerplate
      case 3: return 'qwen/qwen3-coder';              // Implement — bulk code
      case 4: return 'openai/gpt-4.1-mini';           // Ship — templates
      default: return 'openai/gpt-4.1-mini';
    }
  }

  /** Summary stats */
  stats() {
    const entries = [...this.registry.values()];
    return {
      totalSkills: entries.length,
      totalTokens: entries.reduce((sum, s) => sum + s.tokens, 0),
      skills: entries.map(s => ({ name: s.name, tokens: s.tokens })),
    };
  }
}
