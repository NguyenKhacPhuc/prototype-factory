-- P1.1: generation_jobs table
-- P1.3: increment_job_tokens RPC
-- P1.4: Realtime enabled

-- Main job queue table
create table if not exists generation_jobs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users on delete cascade,
  type text not null check (type in ('prototype', 'mobile-app')),
  status text not null default 'pending' check (status in ('pending', 'running', 'completed', 'failed', 'cancelled')),
  source text not null default 'user' check (source in ('user', 'batch')),
  input jsonb not null default '{}',
  progress jsonb not null default '{"step": 0, "total": 6, "message": "Queued..."}',
  result jsonb,
  error text,
  complexity jsonb,
  started_at timestamptz,
  completed_at timestamptz,
  duration_ms integer,
  total_input_tokens integer not null default 0,
  total_output_tokens integer not null default 0,
  total_cached_tokens integer not null default 0,
  estimated_cost_cents integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Index for worker polling (pending jobs, oldest first)
create index if not exists idx_jobs_pending
  on generation_jobs (created_at asc)
  where status = 'pending';

-- Index for user's job list
create index if not exists idx_jobs_user
  on generation_jobs (user_id, created_at desc);

-- RLS
alter table generation_jobs enable row level security;

create policy "Users can view own jobs"
  on generation_jobs for select
  using (auth.uid() = user_id);

create policy "Users can create jobs"
  on generation_jobs for insert
  with check (auth.uid() = user_id);

create policy "Users can cancel own pending jobs"
  on generation_jobs for update
  using (auth.uid() = user_id and status = 'pending')
  with check (status = 'cancelled');

-- Workers use service role key (bypasses RLS)

-- Atomic token increment function
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
$$ language plpgsql security definer;

-- Enable realtime
alter publication supabase_realtime add table generation_jobs;

-- Updated_at trigger
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger generation_jobs_updated_at
  before update on generation_jobs
  for each row execute function update_updated_at();
