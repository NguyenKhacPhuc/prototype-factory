# Phase 1: Supabase Job Queue

**Priority:** High
**Status:** Planned
**Dependencies:** None

## Overview

Create the `generation_jobs` table in Supabase to serve as the job queue for both prototype and mobile app generation. Enable Realtime for live progress updates.

## Schema

```sql
create table generation_jobs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users,
  type text not null,                    -- 'prototype' | 'mobile-app'
  status text default 'pending',         -- pending → running → completed | failed
  input jsonb not null,                  -- {prompt, category, config}

  -- Progress (user-facing, pushed via Realtime)
  progress jsonb default '{}',           -- {step: 3, total: 6, message: "Generating code..."}

  -- Results
  result jsonb,                          -- {folder, url, screens, designSystem}
  error text,                            -- error message if failed

  -- Timing
  started_at timestamptz,
  completed_at timestamptz,
  duration_ms integer,

  -- Cost tracking
  total_input_tokens integer default 0,
  total_output_tokens integer default 0,
  total_cached_tokens integer default 0,
  estimated_cost_cents integer default 0,

  -- Complexity (for mobile-app type)
  complexity jsonb,                      -- {tier, score, task_count, integrations}

  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Index for worker polling
create index idx_jobs_pending on generation_jobs (status, created_at)
  where status = 'pending';

-- Enable realtime
alter publication supabase_realtime add table generation_jobs;

-- RLS: users can only see their own jobs
alter table generation_jobs enable row level security;

create policy "Users can view own jobs"
  on generation_jobs for select
  using (auth.uid() = user_id);

create policy "Users can create jobs"
  on generation_jobs for insert
  with check (auth.uid() = user_id);

-- Workers update via service role key (not anon)
```

## Atomic Token Increment Function

```sql
create or replace function increment_job_tokens(
  p_job_id uuid,
  p_input_tokens int,
  p_output_tokens int,
  p_cached_tokens int
) returns void as $$
begin
  update generation_jobs set
    total_input_tokens = total_input_tokens + p_input_tokens,
    total_output_tokens = total_output_tokens + p_output_tokens,
    total_cached_tokens = total_cached_tokens + p_cached_tokens,
    estimated_cost_cents = (
      (total_input_tokens + p_input_tokens) * 15 / 100000 +
      (total_output_tokens + p_output_tokens) * 75 / 100000
    ),
    updated_at = now()
  where id = p_job_id;
end;
$$ language plpgsql;
```

## Cost Reconciliation Table

```sql
create table cost_reconciliation (
  id uuid primary key default gen_random_uuid(),
  job_id uuid references generation_jobs,
  tier text,
  estimated_tasks int,
  actual_tasks int,
  actual_cost_cents int,
  quoted_price_cents int,
  margin_pct numeric,
  created_at timestamptz default now()
);
```

## Success Criteria

- [ ] Tables created in Supabase
- [ ] RLS policies working (users see own jobs only)
- [ ] Realtime enabled and tested
- [ ] Token increment function working
- [ ] Can insert a job from frontend and see it appear
