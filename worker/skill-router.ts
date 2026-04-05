import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

interface SkillEntry {
  name: string;
  content: string;
  tokens: number;  // approximate (chars / 4)
  tags: string[];
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
  private framework: 'flutter' | 'react-native' | 'kmp' = 'flutter';

  constructor(skillsDir: string) {
    this.loadSkills(skillsDir);
  }

  setFramework(fw: 'flutter' | 'react-native' | 'kmp') {
    this.framework = fw;
  }

  private loadSkills(dir: string) {
    for (const [name, tags] of Object.entries(SKILL_TAGS)) {
      const skillFile = join(dir, name, 'SKILL.md');
      if (!existsSync(skillFile)) {
        console.warn(`Skill not found: ${skillFile}`);
        continue;
      }
      const content = readFileSync(skillFile, 'utf-8');
      this.registry.set(name, {
        name,
        content,
        tokens: Math.ceil(content.length / 4),
        tags,
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
  buildSystemMessage(stage: number, step: string, taskReqs?: string[]) {
    const skills = this.resolve(stage, step, taskReqs);
    const totalTokens = skills.reduce((sum, s) => sum + s.tokens, 0);

    const skillText = skills
      .map(s => `## SKILL: ${s.name}\n\n${s.content}`)
      .join('\n\n---\n\n');

    console.log(`  Skills loaded: [${skills.map(s => s.name).join(', ')}] (~${totalTokens} tokens)`);

    return [
      {
        type: 'text' as const,
        text: skillText,
        cache_control: { type: 'ephemeral' as const },
      },
      {
        type: 'text' as const,
        text: 'Follow the skill instructions above precisely. You are building a production mobile app.',
      },
    ];
  }

  /** Check if a task is creative (Opus) or routine (Sonnet) */
  static isCreativeTask(stage: number, step: string): boolean {
    if (stage <= 1) return true;  // ideation + design always Opus
    if (stage === 3 && step === 'implement') return true;
    return false; // scaffold, test, review, ship → Sonnet
  }

  /** Get recommended model for this stage/step */
  static getModel(stage: number, step: string): string {
    return SkillRouter.isCreativeTask(stage, step)
      ? 'claude-opus-4-6'
      : 'claude-sonnet-4-6';
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
