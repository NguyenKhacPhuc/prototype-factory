# Phase 4: Skill Router + Session Manager

**Priority:** Medium
**Status:** Planned
**Dependencies:** Phase 2

## Overview

The Skill Router loads only the skills needed for each stage of a mobile app build, reducing token costs by ~85%. The Session Manager maintains conversation context and handles tool calls across multiple Claude API requests.

## Skill Registry

| Skill | Tokens | Tags |
|-------|--------|------|
| mobile-app | ~7K | orchestrator |
| mobile-app-design-pro | ~4K | design, theme |
| app-design-preview | ~4K | wireframe, mockup |
| mobile-init | ~1K | scaffold |
| mobile-build | ~2K | release, signing |
| mobile-web | ~1K | landing, legal |
| mobile-iap | ~1K | purchases |
| mobile-admob | ~1K | ads |
| asset-manager | ~2K | icons, fonts |
| flutter-expert | ~4K | flutter |
| react-native-architecture | ~4K | react-native |

## Routing Rules

```
Stage 0 (Ideation):
  → [mobile-app]                                    = ~7K tokens

Stage 1 (Design):
  → [mobile-app-design-pro, app-design-preview]     = ~8K tokens

Stage 2 (Scaffold):
  → [mobile-init, {framework-skill}]                = ~5K tokens

Stage 3 (Implement) — per task:
  → base: [{framework-skill}]                       = ~4K tokens
  → +[mobile-iap] if task needs purchases           = +1K
  → +[mobile-admob] if task needs ads               = +1K
  → +[asset-manager] if task needs icons/fonts       = +2K
  → +[mobile-app-design-pro] if task needs UI work   = +4K

Stage 4 (Ship):
  → [mobile-build, mobile-web]                      = ~3K tokens
```

## Prompt Caching Strategy

```
Cache behavior:
  - TTL: 5 minutes, resets on each hit
  - Within a stage: same skills → cache hits (90% off)
  - Stage transition: different skills → cache miss (full price)
  - Calls happen every 10-30s → cache stays alive within a stage

Cost savings per app:
  Without caching: ~$45 (all skills every call)
  With routing only: ~$15 (minimal skills)
  With routing + caching: ~$10 (cached within stages)
```

## Implementation

```typescript
class SkillRouter {
  private skills: Map<string, { content: string; tokens: number }>;
  private framework: 'flutter' | 'react-native' | 'kmp';

  resolve(stage: number, step: string, taskReqs?: string[]): string {
    // Returns concatenated skill text for this stage/step
  }

  buildSystemMessage(stage: number, step: string, taskReqs?: string[]) {
    const skillText = this.resolve(stage, step, taskReqs);
    return [{
      type: "text",
      text: skillText,
      cache_control: { type: "ephemeral" }
    }];
  }
}

class SessionManager {
  private messages: Message[] = [];
  private router: SkillRouter;

  async runStep(stage: number, step: string, prompt: string) {
    const system = this.router.buildSystemMessage(stage, step);
    const model = this.isCreative(stage) ? 'claude-opus-4-6' : 'claude-sonnet-4-6';

    const response = await anthropic.messages.create({
      model,
      system,
      messages: [...this.messages, { role: 'user', content: prompt }],
      tools: [/* Read, Write, Edit, Bash */],
    });

    this.messages.push({ role: 'user', content: prompt });
    this.messages.push({ role: 'assistant', content: response.content });

    return response;
  }
}
```

## Model Router

```
Opus ($15/$75 per M tokens):
  - Stage 0: constitution, specification
  - Stage 1: design system, mockups
  - Stage 3: complex feature implementation

Sonnet ($3/$15 per M tokens):
  - Stage 2: scaffolding, boilerplate
  - Stage 3: tests, reviews, simple tasks
  - Stage 4: build configs, store listing
```

## Success Criteria

- [ ] Skill Router loads correct skills per stage
- [ ] Prompt caching verified (check usage.cache_read_input_tokens in response)
- [ ] Model Router selects correct model per task type
- [ ] Session Manager maintains conversation across calls
- [ ] Unit tests for routing rules
- [ ] Cost per app: $10-25 (vs $45 without optimization)
