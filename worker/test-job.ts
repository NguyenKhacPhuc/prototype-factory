import { createClient } from '@supabase/supabase-js';
import { config } from './config';

/**
 * Creates a test job in Supabase and watches progress via Realtime.
 * Usage:
 *   MOCK_MODE=true bun run worker/test-job.ts          # free test
 *   bun run worker/test-job.ts                          # real API (~$0.66)
 *   bun run worker/test-job.ts "A meditation app"       # custom prompt
 */

const supabase = createClient(config.supabaseUrl, config.supabaseServiceKey);
const prompt = process.argv[2] || 'A habit tracker that gamifies daily routines with streaks and social accountability';

async function main() {
  console.log(`Creating test job: "${prompt.slice(0, 60)}..."`);
  console.log(`Mode: ${config.mockMode ? 'MOCK' : 'LIVE'}\n`);

  // Create job (using service key to bypass RLS for testing)
  const { data: job, error } = await supabase
    .from('generation_jobs')
    .insert({
      type: 'prototype',
      source: 'user',
      input: { prompt },
      // user_id is null for test jobs
    })
    .select()
    .single();

  if (error) {
    console.error('Failed to create job:', error.message);
    process.exit(1);
  }

  console.log(`Job created: ${job.id}\n`);

  // Watch progress
  const channel = supabase
    .channel(`test-job-${job.id}`)
    .on('postgres_changes', {
      event: 'UPDATE',
      schema: 'public',
      table: 'generation_jobs',
      filter: `id=eq.${job.id}`,
    }, (payload: any) => {
      const j = payload.new;
      const p = j.progress || {};

      if (j.status === 'running') {
        console.log(`  [${p.step}/${p.total}] ${p.message}`);
      } else if (j.status === 'completed') {
        console.log(`\n  Done! ${j.result?.folder}`);
        console.log(`  Cost: $${(j.estimated_cost_cents / 100).toFixed(2)}`);
        console.log(`  Duration: ${(j.duration_ms / 1000).toFixed(1)}s`);
        process.exit(0);
      } else if (j.status === 'failed') {
        console.error(`\n  FAILED: ${j.error}`);
        process.exit(1);
      }
    })
    .subscribe();

  // Timeout after 5 minutes
  setTimeout(() => {
    console.error('\nTest timed out after 5 minutes');
    process.exit(1);
  }, 300000);
}

main().catch(console.error);
