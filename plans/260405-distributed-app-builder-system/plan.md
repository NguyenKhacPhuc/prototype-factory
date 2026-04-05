# Distributed App Builder System

**Created:** 2026-04-05
**Status:** Planning
**Goal:** Transform the prototype factory from a local Mac pipeline into a scalable, distributed system that users can trigger from the website.

## Overview

Two products, one platform:
1. **Prototype Generation** — user describes an idea → AI generates interactive React prototype (~30s, ~$0.66)
2. **Mobile App Build** — user picks a prototype → AI builds a full mobile app (~15-60min, $29-249)

## Current State

- **Batch pipeline (stays unchanged):** runs on local Mac via `claude` CLI, cron/manual, uses full skill system. This is the content engine — generates prototypes in bulk for the gallery.
- Website shows "Coming Soon" modal on Create page
- No API, no job queue for user-triggered generation
- Mobile app agent system is CLI-only with 11 skills

## Two Separate Paths (coexist)

```
PATH 1: BATCH (unchanged, local Mac)
  run-batch.sh → generate-prototype.sh → claude -p (CLI)
  - Triggered: manually or cron
  - Uses: full CLI with skills
  - Purpose: populate gallery with content
  - Cost: Claude subscription (included)

PATH 2: USER-TRIGGERED (new, distributed)
  Website → Supabase job → Worker → Claude Agent SDK
  - Triggered: user clicks "Generate" on /create
  - Uses: Agent SDK (API), no CLI
  - Purpose: on-demand generation for individual users
  - Cost: API tokens ($0.66/prototype, $10-50/app)
```

Both paths produce the same output (prototypes in `prototypes/` folder) and both feed into the same gallery. They do not conflict.

## Phases

| Phase | What | Status |
|-------|------|--------|
| [Phase 1](phase-01-supabase-job-queue.md) | Supabase job queue + generation_jobs table | Planned |
| [Phase 2](phase-02-prototype-worker.md) | Prototype worker (Claude Agent SDK) | Planned |
| [Phase 3](phase-03-create-page.md) | Wire up Create page with real generation + progress UI | Planned |
| [Phase 4](phase-04-skill-router.md) | Skill Router + Session Manager for mobile app builds | Planned |
| [Phase 5](phase-05-mobile-app-worker.md) | Mobile App worker (Railway) | Planned |
| [Phase 6](phase-06-complexity-pricing.md) | Complexity estimator + pricing engine | Planned |
| [Phase 7](phase-07-observability.md) | Logging, cost tracking, admin dashboard | Planned |

## Architecture

```
                        ┌─────────────────────────────────┐
                        │         FRONTEND (Vercel)        │
                        │  Gallery ─ Create ─ Canvas ─ Build│
                        └──────┬────────┬────────┬─────────┘
                               │        │        │
                        ┌──────▼────────▼────────▼─────────┐
                        │       SUPABASE                    │
                        │  Auth ── Jobs Queue ── Realtime   │
                        │  Storage ── Cost Tracking         │
                        └──────────┬────────────┬───────────┘
                                   │            │
                    ┌──────────────▼──┐  ┌──────▼──────────────┐
                    │ PROTOTYPE       │  │ MOBILE APP           │
                    │ WORKER          │  │ WORKER               │
                    │                 │  │                      │
                    │ Agent SDK       │  │ Agent SDK            │
                    │ No skills       │  │ + Skill Router       │
                    │ ~30s, $0.66     │  │ + Prompt Caching     │
                    │                 │  │ ~15-60min, $5-65     │
                    └─────────────────┘  └──────────────────────┘
```

## Key Decisions

- **Claude Agent SDK** over CLI for both workers (scalable, no infra dependency)
- **Skill Router** loads minimal skills per stage (85% token savings)
- **Prompt Caching** keeps skill tokens cached within a build session (90% off repeated tokens)
- **Model Router** uses Opus for creative tasks, Sonnet for routine tasks
- **Gemini** for idea generation + trend scouting + complexity estimation (free)
- **Supabase Realtime** for live progress updates (no WebSocket server needed)
