import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "../hooks/use-auth";

interface Props {
  navigate: (to: string) => void;
}

interface Job {
  id: string;
  type: string;
  status: string;
  source: string;
  input: { prompt?: string };
  progress: { step?: number; total?: number; message?: string };
  result: { folder?: string; download_url?: string } | null;
  error: string | null;
  total_input_tokens: number;
  total_output_tokens: number;
  total_cached_tokens: number;
  estimated_cost_cents: number;
  duration_ms: number | null;
  created_at: string;
}

const STATUS_COLORS: Record<string, string> = {
  pending: '#f59e0b',
  running: '#3b82f6',
  completed: '#22c55e',
  failed: '#ef4444',
  cancelled: '#6b7280',
};

export function Admin({ navigate }: Props) {
  const { user } = useAuth();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [stats, setStats] = useState({ today: 0, cost: 0, active: 0, failed: 0 });

  useEffect(() => {
    loadJobs();

    // Subscribe to realtime updates
    const channel = supabase
      .channel('admin-jobs')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'generation_jobs',
      }, () => {
        loadJobs();
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  async function loadJobs() {
    const { data, error } = await supabase
      .from('generation_jobs')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100);

    if (data) {
      setJobs(data);
      const today = new Date().toISOString().split('T')[0];
      const todayJobs = data.filter(j => j.created_at.startsWith(today));
      setStats({
        today: todayJobs.length,
        cost: todayJobs.reduce((sum, j) => sum + (j.estimated_cost_cents || 0), 0) / 100,
        active: data.filter(j => j.status === 'running' || j.status === 'pending').length,
        failed: todayJobs.filter(j => j.status === 'failed').length,
      });
    }
    setLoading(false);
  }

  const formatDuration = (ms: number | null) => {
    if (!ms) return '—';
    if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`;
    return `${(ms / 60000).toFixed(1)}m`;
  };

  const formatCost = (cents: number) => `$${(cents / 100).toFixed(2)}`;
  const formatTokens = (n: number) => n > 1000 ? `${(n / 1000).toFixed(1)}K` : String(n);

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 32px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
        <div>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 32, fontWeight: 600 }}>Admin Dashboard</h1>
          <p style={{ fontSize: 14, color: 'var(--text-muted)', marginTop: 4 }}>Job monitoring & cost tracking</p>
        </div>
        <button
          onClick={() => navigate('/gallery')}
          style={{ padding: '8px 20px', borderRadius: 8, border: '1px solid var(--border)', background: 'none', color: 'var(--text-secondary)', fontSize: 13, cursor: 'pointer' }}
        >&larr; Gallery</button>
      </div>

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 32 }}>
        {[
          { label: 'Today', value: String(stats.today), sub: 'jobs' },
          { label: 'Cost', value: `$${stats.cost.toFixed(2)}`, sub: 'today' },
          { label: 'Active', value: String(stats.active), sub: 'running' },
          { label: 'Failed', value: String(stats.failed), sub: 'today' },
        ].map(s => (
          <div key={s.label} style={{
            padding: 20, borderRadius: 14, background: 'var(--bg-elevated)',
            border: '1px solid var(--border)',
          }}>
            <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.5, color: 'var(--text-muted)', marginBottom: 8 }}>{s.label}</p>
            <p style={{ fontSize: 28, fontWeight: 700, color: 'var(--text)' }}>{s.value}</p>
            <p style={{ fontSize: 12, color: 'var(--text-dim)', marginTop: 2 }}>{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Jobs Table */}
      <div style={{
        background: 'var(--bg-elevated)', borderRadius: 14,
        border: '1px solid var(--border)', overflow: 'hidden',
      }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: 15, fontWeight: 600 }}>Recent Jobs</h2>
          <span style={{ fontSize: 12, color: 'var(--text-dim)' }}>{jobs.length} total</span>
        </div>

        {loading ? (
          <div style={{ padding: 40, textAlign: 'center', color: 'var(--text-muted)' }}>Loading...</div>
        ) : jobs.length === 0 ? (
          <div style={{ padding: 40, textAlign: 'center', color: 'var(--text-muted)' }}>No jobs yet</div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                {['Status', 'Type', 'Prompt', 'Progress', 'Cost', 'Tokens', 'Duration', 'Created'].map(h => (
                  <th key={h} style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 600, color: 'var(--text-muted)', fontSize: 11, textTransform: 'uppercase', letterSpacing: 1 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {jobs.map(job => (
                <tr
                  key={job.id}
                  onClick={() => setSelectedJob(selectedJob?.id === job.id ? null : job)}
                  style={{
                    borderBottom: '1px solid var(--border)',
                    cursor: 'pointer',
                    background: selectedJob?.id === job.id ? 'rgba(232,160,74,0.05)' : 'transparent',
                  }}
                >
                  <td style={{ padding: '10px 12px' }}>
                    <span style={{
                      display: 'inline-block', padding: '3px 10px', borderRadius: 50, fontSize: 11, fontWeight: 600,
                      background: `${STATUS_COLORS[job.status]}22`,
                      color: STATUS_COLORS[job.status],
                    }}>{job.status}</span>
                  </td>
                  <td style={{ padding: '10px 12px', color: 'var(--text-secondary)' }}>{job.type}</td>
                  <td style={{ padding: '10px 12px', maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {job.input?.prompt?.slice(0, 60) || '—'}
                  </td>
                  <td style={{ padding: '10px 12px' }}>
                    {job.status === 'running' ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ width: 60, height: 4, borderRadius: 2, background: 'var(--border)', overflow: 'hidden' }}>
                          <div style={{ width: `${((job.progress?.step || 0) / (job.progress?.total || 6)) * 100}%`, height: '100%', background: '#3b82f6', borderRadius: 2, transition: 'width 0.3s' }} />
                        </div>
                        <span style={{ fontSize: 11, color: 'var(--text-dim)' }}>{job.progress?.step}/{job.progress?.total}</span>
                      </div>
                    ) : job.status === 'completed' ? (
                      <span style={{ color: '#22c55e', fontSize: 11 }}>Done</span>
                    ) : job.status === 'failed' ? (
                      <span style={{ color: '#ef4444', fontSize: 11 }}>Error</span>
                    ) : (
                      <span style={{ color: 'var(--text-dim)', fontSize: 11 }}>Queued</span>
                    )}
                  </td>
                  <td style={{ padding: '10px 12px', fontFamily: 'monospace', fontSize: 12 }}>{formatCost(job.estimated_cost_cents)}</td>
                  <td style={{ padding: '10px 12px', fontSize: 11, color: 'var(--text-dim)' }}>
                    {formatTokens(job.total_input_tokens)}↓ {formatTokens(job.total_output_tokens)}↑
                  </td>
                  <td style={{ padding: '10px 12px', fontSize: 12, color: 'var(--text-dim)' }}>{formatDuration(job.duration_ms)}</td>
                  <td style={{ padding: '10px 12px', fontSize: 11, color: 'var(--text-dim)' }}>
                    {new Date(job.created_at).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Job Detail Panel */}
      {selectedJob && (
        <div style={{
          marginTop: 20, padding: 24, borderRadius: 14,
          background: 'var(--bg-elevated)', border: '1px solid var(--border)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h3 style={{ fontSize: 16, fontWeight: 600 }}>Job Detail</h3>
            <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--text-dim)' }}>{selectedJob.id}</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 16 }}>
            <div>
              <p style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>Prompt</p>
              <p style={{ fontSize: 13 }}>{selectedJob.input?.prompt || '—'}</p>
            </div>
            <div>
              <p style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>Cost Breakdown</p>
              <p style={{ fontSize: 13 }}>
                Input: {formatTokens(selectedJob.total_input_tokens)} tokens
                (cached: {formatTokens(selectedJob.total_cached_tokens)})<br />
                Output: {formatTokens(selectedJob.total_output_tokens)} tokens<br />
                <strong>Total: {formatCost(selectedJob.estimated_cost_cents)}</strong>
              </p>
            </div>
            <div>
              <p style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>Result</p>
              {selectedJob.result?.folder ? (
                <button
                  onClick={() => navigate(`/prototype/${selectedJob.result!.folder}`)}
                  style={{ padding: '6px 14px', borderRadius: 6, background: 'var(--accent)', border: 'none', color: '#fff', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}
                >View Prototype</button>
              ) : selectedJob.error ? (
                <p style={{ fontSize: 13, color: '#ef4444' }}>{selectedJob.error}</p>
              ) : (
                <p style={{ fontSize: 13, color: 'var(--text-dim)' }}>In progress...</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
