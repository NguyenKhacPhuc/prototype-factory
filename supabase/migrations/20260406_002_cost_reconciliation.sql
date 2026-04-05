-- P1.2: cost_reconciliation table
-- P7.2: daily_costs view

create table if not exists cost_reconciliation (
  id uuid primary key default gen_random_uuid(),
  job_id uuid references generation_jobs on delete cascade,
  tier text,
  estimated_tasks integer,
  actual_tasks integer,
  actual_cost_cents integer,
  quoted_price_cents integer,
  margin_pct numeric,
  created_at timestamptz not null default now()
);

create index if not exists idx_reconciliation_job
  on cost_reconciliation (job_id);

-- Daily cost summary view
create or replace view daily_costs as
select
  date_trunc('day', created_at)::date as day,
  count(*) as jobs,
  sum(estimated_cost_cents) / 100.0 as total_cost,
  avg(estimated_cost_cents) / 100.0 as avg_cost,
  sum(case when type = 'prototype' then 1 else 0 end) as prototypes,
  sum(case when type = 'mobile-app' then 1 else 0 end) as mobile_apps,
  sum(total_input_tokens) as total_input_tokens,
  sum(total_output_tokens) as total_output_tokens,
  sum(total_cached_tokens) as total_cached_tokens
from generation_jobs
where status = 'completed'
group by 1
order by 1 desc;
