import { createClient } from '@supabase/supabase-js';
import { config } from './config';
import { runPrototypeJob } from './prototype-worker';
import { runMobileAppJob } from './mobile-app-worker';
import { buildAppV2, runDesignPhase } from './app-builder-v2';

const supabase = createClient(config.supabaseUrl, config.supabaseServiceKey);

let activeJobs = 0;
const MAX_CONCURRENT = 5; // total parallel jobs (prototypes + mobile apps)

export async function startPolling() {
  console.log(`Worker started (mock=${config.mockMode}, polling every ${config.pollIntervalMs}ms)`);

  setInterval(async () => {
    if (activeJobs >= MAX_CONCURRENT) return;

    try {
      // Check for pending_design_review jobs first (run design only)
      const { data: reviewJobs } = await supabase
        .from('generation_jobs')
        .update({ status: 'running', started_at: new Date().toISOString() })
        .eq('status', 'pending_design_review')
        .eq('type', 'mobile-app')
        .order('created_at', { ascending: true })
        .limit(1)
        .select();

      if (reviewJobs?.length) {
        const job = reviewJobs[0];
        console.log(`Design review job ${job.id}: ${job.input?.prompt?.slice(0, 50)}...`);
        activeJobs++;
        runDesignPhase(job.id, job.input)
          .catch(err => console.error(`Design job ${job.id} failed:`, err.message))
          .finally(() => { activeJobs--; });
        // Don't return — check for more jobs below
      }

      if (activeJobs >= MAX_CONCURRENT) return;

      // Check for approved pending jobs (full build) — pick up multiple
      const slotsAvailable = MAX_CONCURRENT - activeJobs;
      const { data: jobs, error } = await supabase
        .from('generation_jobs')
        .update({ status: 'running', started_at: new Date().toISOString() })
        .eq('status', 'pending')
        .order('created_at', { ascending: true })
        .limit(slotsAvailable)
        .select();

      if (error || !jobs?.length) return;

      for (const job of jobs) {
      console.log(`Picked up ${job.type} job ${job.id}: ${job.input?.prompt?.slice(0, 50)}...`);

      activeJobs++;
      const runner = job.type === 'mobile-app'
        ? buildAppV2(job.id, job.input)
        : runPrototypeJob(job.id, job.input);

      runner
        .catch(err => console.error(`Job ${job.id} failed:`, err.message))
        .finally(() => { activeJobs--; });
      }

    } catch (err: any) {
      console.error('Polling error:', err.message);
    }
  }, config.pollIntervalMs);
}

// Health check endpoint
export function startHealthServer() {
  Bun.serve({
    port: Number(process.env.PORT) || 8080,
    fetch(req) {
      const url = new URL(req.url);
      if (url.pathname === '/health') {
        return Response.json({
          status: 'ok',
          uptime: Math.floor(process.uptime()),
          activeJobs,
          mockMode: config.mockMode,
        });
      }
      return new Response('Not found', { status: 404 });
    },
  });
  console.log('Health check on :8080/health');
}
