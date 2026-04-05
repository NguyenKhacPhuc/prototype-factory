# Phase 7: Observability & Admin Dashboard

**Priority:** Low
**Status:** Planned
**Dependencies:** Phase 1, Phase 2

## Overview

4 layers of logging + admin dashboard for monitoring jobs, costs, and system health.

## Layer 1: Job Log (User-Facing)

Supabase `generation_jobs` table with Realtime — users see their own jobs, status, progress.

## Layer 2: Pipeline Log (Per-Job Detail)

Every API call, tool use, file write logged as JSONL:

```jsonl
{"timestamp":"2026-04-05T10:00:00Z","stage":0,"step":"constitution","event":"api_call","model":"opus","input_tokens":7200,"output_tokens":3100,"cached_tokens":0,"duration_ms":12400}
{"timestamp":"2026-04-05T10:00:15Z","stage":0,"step":"constitution","event":"file_write","detail":"specs/constitution.md"}
```

Stored in Supabase Storage: `pipeline-logs/{job-id}.jsonl`

## Layer 3: Cost Tracker (Aggregate)

```sql
-- Tokens and cost per job, updated atomically via RPC
-- See Phase 1 for increment_job_tokens function

-- Daily cost summary view
create view daily_costs as
select
  date_trunc('day', created_at) as day,
  count(*) as jobs,
  sum(estimated_cost_cents) / 100.0 as total_cost,
  avg(estimated_cost_cents) / 100.0 as avg_cost,
  sum(case when type = 'prototype' then 1 else 0 end) as prototypes,
  sum(case when type = 'mobile-app' then 1 else 0 end) as mobile_apps
from generation_jobs
where status = 'completed'
group by 1
order by 1 desc;
```

## Layer 4: System Health (Worker)

```typescript
// Health endpoint on Railway worker
GET /health → {
  status: 'ok',
  uptime: 3600,
  activeJobs: 2,
  lastJobAt: '2026-04-05T10:00:00Z',
  queueDepth: 5,
  memoryMB: 256
}
```

## Admin Dashboard (/admin/jobs)

```
┌─────────────────────────────────────────────────┐
│  Today: 16 jobs │ $12.40 spent │ 3 active       │
│                                                  │
│  ┌─────────────────────────────────────────────┐ │
│  │ ID      │ Type      │ Progress  │ Cost      │ │
│  │ abc123  │ prototype │ ████ done │ $0.52     │ │
│  │ def456  │ mobile    │ ██░░ 20%  │ $3.10     │ │
│  │ ghi789  │ prototype │ ████ done │ $0.66     │ │
│  └─────────────────────────────────────────────┘ │
│                                                  │
│  Click job → pipeline log + cost breakdown       │
└─────────────────────────────────────────────────┘
```

## Test Commands

```bash
# Unit tests (free)
bun test worker/tests/

# Mock mode (free, full pipeline simulation)
MOCK_MODE=true bun run worker/test.ts --idea "A fitness app"

# Integration test (real API, ~$1)
bun run worker/test.ts --idea "A todo app" --stage 0

# E2E test (real API, ~$5-25)
bun run worker/test.ts --idea "A meditation app" --full

# View job log
bun run worker/view-log.ts --job abc123

# Cost report
bun run worker/cost-report.ts --date 2026-04-05
```

## Success Criteria

- [ ] Pipeline logs saved for every job
- [ ] Cost tracking accurate (verified against Anthropic billing)
- [ ] Admin dashboard shows real-time job status
- [ ] Health endpoint monitored (Railway alerts)
- [ ] Daily cost summary available
- [ ] Budget alerts trigger when thresholds hit
