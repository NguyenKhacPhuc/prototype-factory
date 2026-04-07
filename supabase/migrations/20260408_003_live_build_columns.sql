-- Phase 3: Live terminal streaming columns
-- Phase 2: Design review status

-- Add live build tracking columns
alter table generation_jobs add column if not exists live_output text default '';
alter table generation_jobs add column if not exists files_created jsonb default '[]';
alter table generation_jobs add column if not exists current_file text default '';

-- Add pending_design_review status
alter table generation_jobs drop constraint if exists generation_jobs_status_check;
alter table generation_jobs add constraint generation_jobs_status_check
  check (status in ('pending', 'pending_design_review', 'running', 'completed', 'failed', 'cancelled'));

-- Add design data column (stores Gemini design output for review page)
alter table generation_jobs add column if not exists design_data jsonb;
