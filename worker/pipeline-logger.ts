import { createClient } from '@supabase/supabase-js';
import { config } from './config';

interface LogEntry {
  timestamp: string;
  stage: number;
  step: string;
  event: 'start' | 'complete' | 'error' | 'api_call' | 'tool_use' | 'file_write' | 'progress';
  model?: string;
  input_tokens?: number;
  output_tokens?: number;
  cached_tokens?: number;
  duration_ms?: number;
  detail?: string;
}

export class PipelineLogger {
  private entries: LogEntry[] = [];
  private jobId: string;
  private supabase;

  constructor(jobId: string) {
    this.jobId = jobId;
    this.supabase = createClient(config.supabaseUrl, config.supabaseServiceKey);
  }

  log(entry: Omit<LogEntry, 'timestamp'>) {
    const full: LogEntry = { ...entry, timestamp: new Date().toISOString() };
    this.entries.push(full);
    console.log(JSON.stringify(full));
  }

  async updateProgress(step: number, total: number, message: string) {
    this.log({ stage: step, step: String(step), event: 'progress', detail: message });
    await this.supabase
      .from('generation_jobs')
      .update({
        progress: { step, total, message },
        status: 'running',
      })
      .eq('id', this.jobId);
  }

  async markStarted() {
    await this.supabase
      .from('generation_jobs')
      .update({ status: 'running', started_at: new Date().toISOString() })
      .eq('id', this.jobId);
  }

  async markCompleted(result: Record<string, unknown>) {
    const now = new Date().toISOString();
    const startedAt = (await this.supabase
      .from('generation_jobs')
      .select('started_at')
      .eq('id', this.jobId)
      .single()).data?.started_at;

    const durationMs = startedAt
      ? new Date(now).getTime() - new Date(startedAt).getTime()
      : 0;

    await this.supabase
      .from('generation_jobs')
      .update({
        status: 'completed',
        result,
        completed_at: now,
        duration_ms: durationMs,
        progress: { step: 6, total: 6, message: 'Done!' },
      })
      .eq('id', this.jobId);
  }

  async markFailed(error: string) {
    await this.supabase
      .from('generation_jobs')
      .update({
        status: 'failed',
        error,
        completed_at: new Date().toISOString(),
      })
      .eq('id', this.jobId);
  }

  async trackTokens(inputTokens: number, outputTokens: number, cachedTokens: number) {
    await this.supabase.rpc('increment_job_tokens', {
      p_job_id: this.jobId,
      p_input_tokens: inputTokens,
      p_output_tokens: outputTokens,
      p_cached_tokens: cachedTokens,
    });
  }

  async persist() {
    const content = this.entries.map(e => JSON.stringify(e)).join('\n');
    await this.supabase.storage
      .from('pipeline-logs')
      .upload(`${this.jobId}.jsonl`, new Blob([content]), { upsert: true });
  }

  totalCost(): number {
    let cost = 0;
    for (const e of this.entries) {
      if (e.event !== 'api_call') continue;
      const isOpus = e.model?.includes('opus');
      const inputRate = isOpus ? 15 : 3;
      const outputRate = isOpus ? 75 : 15;
      cost += (e.input_tokens ?? 0) * inputRate / 1_000_000;
      cost += (e.output_tokens ?? 0) * outputRate / 1_000_000;
    }
    return cost;
  }
}
