import { createClient } from '@supabase/supabase-js';
import { config } from './config';
import { runPrototypeJob } from './prototype-worker';
import { runMobileAppJob } from './mobile-app-worker';

const supabase = createClient(config.supabaseUrl, config.supabaseServiceKey);

let activeJobs = 0;
const MAX_CONCURRENT_PROTOTYPE = 3;
const MAX_CONCURRENT_MOBILE = 1;

export async function startPolling() {
  console.log(`Worker started (mock=${config.mockMode}, polling every ${config.pollIntervalMs}ms)`);

  setInterval(async () => {
    if (activeJobs >= MAX_CONCURRENT_PROTOTYPE + MAX_CONCURRENT_MOBILE) return;

    try {
      // Claim a pending job (prototype or mobile-app)
      const { data: jobs, error } = await supabase
        .from('generation_jobs')
        .update({ status: 'running', started_at: new Date().toISOString() })
        .eq('status', 'pending')
        .order('created_at', { ascending: true })
        .limit(1)
        .select();

      if (error || !jobs?.length) return;

      const job = jobs[0];
      console.log(`Picked up ${job.type} job ${job.id}: ${job.input?.prompt?.slice(0, 50)}...`);

      activeJobs++;
      const runner = job.type === 'mobile-app'
        ? runMobileAppJob(job.id, job.input)
        : runPrototypeJob(job.id, job.input);

      runner
        .catch(err => console.error(`Job ${job.id} failed:`, err.message))
        .finally(() => { activeJobs--; });

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
