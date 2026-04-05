# Phase 5: Mobile App Worker

**Priority:** Medium
**Status:** Planned
**Dependencies:** Phase 1, Phase 4

## Overview

Worker that builds full mobile apps from prototype ideas. Uses Claude Agent SDK + Skill Router + Prompt Caching. Deployed on Railway with persistent filesystem.

## Architecture

```
Railway Worker
├── Job Poller (Supabase subscription, type='mobile-app')
├── Skill Router (loads minimal skills per stage)
├── Session Manager (conversation + tool calls)
├── File System (/tmp/builds/{job-id}/)
│   ├── specs/          (constitution, spec, plan, tasks)
│   ├── src/            (framework-specific source)
│   ├── web/            (landing, legal, support)
│   └── plans/{id}/     (pipeline log, checkpoint)
├── Claude API (Opus for creative, Sonnet for routine)
└── Progress Reporter (updates Supabase generation_jobs)
```

## 4-Stage Pipeline

```
Stage 0: Ideation (3-5 API calls, Opus)
  - Generate constitution
  - Research + specification
  - Output: specs/constitution.md, specs/spec.md

Stage 1: Design (5-8 API calls, Opus)
  - Design system (via mobile-app-design-pro skill text)
  - Wireframes + mockups
  - Output: specs/design-tokens.json, specs/design-spec.json

Stage 2: Scaffold (3-5 API calls, Sonnet)
  - Project init (framework-specific)
  - Backend setup (Supabase)
  - Asset bootstrap
  - Output: project structure, configs

Stage 3: Implement (20-100 API calls, mixed)
  - Per task: plan → implement → test → review → commit
  - Skill Router loads task-specific skills
  - Prompt cache stays alive within stage
  - Output: complete source code

Stage 4: Ship (5-8 API calls, Sonnet)
  - Build release artifacts
  - Generate store assets
  - Deploy web presence
  - Output: APK/IPA, screenshots, store listing
```

## Railway Deployment

```dockerfile
FROM oven/bun:latest
WORKDIR /app
COPY package.json bun.lockb ./
RUN bun install
COPY worker/ ./worker/
COPY skills/ ./skills/    # skill SKILL.md files for router
ENV ANTHROPIC_API_KEY=...
ENV SUPABASE_URL=...
ENV SUPABASE_SERVICE_KEY=...
CMD ["bun", "run", "worker/index.ts"]
```

## Checkpoint & Resume

```yaml
# Saved to Supabase Storage after each stage
checkpoint:
  job_id: "abc-123"
  stage: 3
  step: "task:auth:implement"
  tasks_completed: ["setup", "data-model"]
  tasks_remaining: ["auth", "home-feed", "settings"]
  messages_snapshot: "..." # compressed conversation
```

If worker crashes → restart → load checkpoint → resume from last step.

## Success Criteria

- [ ] Worker picks up mobile-app jobs from queue
- [ ] All 4 stages execute with correct skills loaded
- [ ] Prompt caching verified across calls within a stage
- [ ] Checkpoint saves after each stage
- [ ] Resume works after simulated crash
- [ ] Progress updates visible on frontend
- [ ] Cost per simple app: ~$12
- [ ] Cost per complex app: ~$50
