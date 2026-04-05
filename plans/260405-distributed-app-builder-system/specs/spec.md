# Specification: Distributed App Builder System

## Requirements Verification

### Functional Requirements

| ID | Requirement | Phase | Verified |
|----|------------|-------|----------|
| FR-01 | User can type an app idea and trigger prototype generation from /create | P3 | ✅ |
| FR-02 | User sees real-time progress during generation | P1, P3 | ✅ |
| FR-03 | Generated prototype appears in gallery and is interactive | P2 | ✅ |
| FR-04 | User can trigger "Build Real App" from a prototype | P5 | ✅ |
| FR-05 | System estimates complexity and shows price before mobile app build | P6 | ✅ |
| FR-06 | User confirms price before build starts | P6 | ✅ |
| FR-07 | Mobile app build runs full pipeline (ideation → design → scaffold → implement → ship) | P4, P5 | ✅ |
| FR-08 | Batch pipeline on local Mac continues to work unchanged | Plan | ✅ |
| FR-09 | Both paths produce same output format (prototypes/ folder) | P2 | ✅ |
| FR-10 | Admin can view all jobs, costs, and system health | P7 | ✅ |

### Non-Functional Requirements

| ID | Requirement | Phase | Verified |
|----|------------|-------|----------|
| NF-01 | Prototype generation < 60 seconds | P2 | ✅ |
| NF-02 | Support 20 concurrent prototype generations | P2 | ✅ |
| NF-03 | Mobile app build cost < $50 for standard app | P4, P6 | ✅ |
| NF-04 | System must not lose jobs on worker crash (checkpoint/resume) | P5 | ✅ |
| NF-05 | User data isolated (RLS on all tables) | P1 | ✅ |
| NF-06 | Cost guardrails prevent runaway spending | P6 | ✅ |
| NF-07 | System works without Claude CLI (API only for user path) | P2, P4 | ✅ |
| NF-08 | Auth required before generation | P3 | ✅ |

### Gaps Identified

| Gap | Risk | Mitigation | Phase |
|-----|------|-----------|-------|
| G-01 | Prototype worker needs git access to push to repo | Worker needs GitHub token + git installed | P2 |
| G-02 | Prototype worker needs Puppeteer for validation | Railway supports it, Edge Functions don't | P2 |
| G-03 | User-generated prototypes mix with batch-generated in gallery | Add `source` field: 'batch' vs 'user' | P1 |
| G-04 | No payment integration designed yet | Need Stripe for mobile app tier charges | P6 |
| G-05 | Agent SDK may not support all tools (Bash for validation scripts) | Test early, fall back to raw API + manual tool handling | P2 |
| G-06 | Prompt caching requires minimum 1024 tokens in cached block | All skill blocks exceed this, no issue | P4 |
| G-07 | No rate limiting on job creation | User could spam jobs, burning budget | P3 |
| G-08 | Mobile app output (source code) needs to be delivered to user | Need: zip download, GitHub repo, or cloud storage | P5 |

## Data Model

```
┌──────────────┐    ┌──────────────────┐    ┌───────────────────┐
│  auth.users  │───<│ generation_jobs   │───<│ cost_reconciliation│
│  (Supabase)  │    │                  │    │                   │
│              │    │ id               │    │ job_id            │
│ id           │    │ user_id (FK)     │    │ tier              │
│ email        │    │ type             │    │ estimated_tasks   │
│ metadata     │    │ status           │    │ actual_tasks      │
└──────────────┘    │ input (jsonb)    │    │ actual_cost       │
                    │ progress (jsonb) │    │ quoted_price      │
                    │ result (jsonb)   │    │ margin_pct        │
                    │ error            │    └───────────────────┘
                    │ complexity (jsonb)│
                    │ source           │  ← 'user' | 'batch'
                    │ started_at       │
                    │ completed_at     │
                    │ duration_ms      │
                    │ total_input_tokens│
                    │ total_output_tokens│
                    │ total_cached_tokens│
                    │ estimated_cost_cents│
                    └──────────────────┘

Supabase Storage:
  pipeline-logs/{job-id}.jsonl   ← detailed per-call log
  builds/{job-id}.zip            ← mobile app source code
```

## API Contracts

```
POST /api/create-job
  Auth: required (Bearer token)
  Body: { type: 'prototype' | 'mobile-app', prompt: string, config?: object }
  Response: { jobId: string, status: 'pending' }
  Rate limit: 3 active jobs per user

GET /api/job/:id
  Auth: required
  Response: { id, status, progress, result, error, cost }

POST /api/estimate-complexity
  Auth: required
  Body: { prompt: string }
  Response: { tier, score, task_count, estimated_screens, price_cents, integrations }

Realtime (Supabase channel):
  Subscribe: generation_jobs where id=eq.{jobId}
  Events: UPDATE → progress, status changes
```
