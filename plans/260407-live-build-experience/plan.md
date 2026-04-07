# Live Build Experience + OpenRouter + Design Review

**Created:** 2026-04-07
**Status:** Planning
**Goal:** Full user journey from idea to testable app, with live streaming, design review, and cost-optimized multi-model routing.

## User Flow

```
/create → Type idea → "Generate Prototype"
    ↓
PHASE 1: PROTOTYPE (~30s, ~$0.66)
    → AI generates interactive React preview
    → User plays with it in browser
    → Clicks "I like this" or "Try again"
    ↓
PHASE 2: DESIGN REVIEW (new dashboard)
    → Show: color palette, fonts, screen wireframes
    → User approves or tweaks ("darker", "more playful")
    → Gate G1 — must approve before build starts
    ↓
PHASE 3: LIVE BUILD (~15-30min, ~$0.40)
    → User watches LLM write code in real-time
    → Live terminal: streaming code as it's written
    → File tree: shows files created/modified
    → Progress: stage, task count, cost
    ↓
PHASE 4: TEST ON DEVICE
    → Expo Go QR code
    → Or web preview
```

## Phases

| Phase | What | Status |
|-------|------|--------|
| [Phase 1](phase-01-openrouter.md) | OpenRouter integration + model routing per stage | Planned |
| [Phase 2](phase-02-design-review.md) | Design review dashboard with gate approval | Planned |
| [Phase 3](phase-03-live-terminal.md) | Live terminal streaming during build | Planned |
| [Phase 4](phase-04-prototype-reuse.md) | Reuse existing prototype data to skip stages | Planned |

## Architecture

```
┌───────────────────────────────────────────────────────┐
│                    FRONTEND                            │
│                                                       │
│  /create → /prototype/:slug → /design/:jobId → /build/:jobId │
│                                                       │
│  Build page shows:                                    │
│  ├── Live terminal (streaming LLM output)             │
│  ├── File tree (created/modified files)               │
│  ├── Progress bar (stage + tasks)                     │
│  └── Cost tracker (real-time $)                       │
└───────────┬───────────────────────────────────────────┘
            │ Supabase Realtime
┌───────────▼───────────────────────────────────────────┐
│  generation_jobs table                                 │
│                                                       │
│  + live_output text     ← latest LLM text chunk       │
│  + files_created jsonb  ← [{path, status, size}]      │
│  + current_file text    ← file being written now       │
└───────────┬───────────────────────────────────────────┘
            │
┌───────────▼───────────────────────────────────────────┐
│  WORKER (OpenRouter)                                   │
│                                                       │
│  Model routing per stage:                              │
│  ├── Stage 0 Ideation:  Claude Sonnet (creative)      │
│  ├── Stage 1 Design:    Claude Sonnet (design sense)  │
│  ├── Stage 2 Scaffold:  GPT-4.1-mini (boilerplate)   │
│  ├── Stage 3 Implement: Qwen3 Coder (bulk code)      │
│  └── Stage 4 Ship:      GPT-4.1-mini (templates)     │
│                                                       │
│  After each tool_use:                                  │
│  ├── Update live_output in Supabase                   │
│  ├── Update files_created in Supabase                 │
│  └── Frontend sees it via Realtime                    │
└───────────────────────────────────────────────────────┘
```

## Cost Model (with OpenRouter)

| Stage | Model | Input $/M | Output $/M | Est. cost |
|-------|-------|-----------|------------|-----------|
| 0 Ideation | Claude Sonnet | $3.00 | $15.00 | $0.15 |
| 1 Design | Claude Sonnet | $3.00 | $15.00 | $0.15 |
| 2 Scaffold | GPT-4.1-mini | $0.40 | $1.60 | $0.02 |
| 3 Implement | Qwen3 Coder | $0.22 | $1.00 | $0.05 |
| 4 Ship | GPT-4.1-mini | $0.40 | $1.60 | $0.02 |
| **Total** | | | | **~$0.40** |

With prototype reuse (skip Stage 0+1): **~$0.10**

## Key Decisions

- **OpenRouter** as unified API gateway — one API key, all models
- **Streaming** via Supabase Realtime (update `live_output` column on each chunk)
- **Design review** is a gate — build won't start until user approves
- **Prototype data reuse** — idea.json + design-spec.json from existing prototype skip Stages 0-1
