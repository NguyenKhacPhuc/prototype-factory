import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "../hooks/use-auth";
import { safeText } from "../lib/safe-text";

interface Props {
  prototype: { folder: string; appName: string; tagline: string; description: string; category: string };
  onClose: () => void;
  onStarted: (jobId: string) => void;
}

interface Estimate {
  tier: string;
  weighted_score: number;
  task_count: number;
  estimated_screens: number;
  key_integrations: string[];
  reasoning: string;
}

const TIER_INFO: Record<string, { price: string; priceCents: number; color: string }> = {
  simple:     { price: '$29',  priceCents: 2900,  color: '#22c55e' },
  standard:   { price: '$59',  priceCents: 5900,  color: '#3b82f6' },
  complex:    { price: '$99',  priceCents: 9900,  color: '#f59e0b' },
  advanced:   { price: '$149', priceCents: 14900, color: '#ef4444' },
  enterprise: { price: '$249', priceCents: 24900, color: '#8b5cf6' },
};

export function BuildAppModal({ prototype, onClose, onStarted }: Props) {
  const { user } = useAuth();
  const [step, setStep] = useState<'estimating' | 'review' | 'building' | 'error'>('estimating');
  const [estimate, setEstimate] = useState<Estimate | null>(null);
  const [framework, setFramework] = useState<'flutter' | 'react-native' | 'kmp'>('flutter');
  const [error, setError] = useState('');

  // Estimate complexity on mount
  useEffect(() => {
    estimateComplexity();
  }, []);

  async function estimateComplexity() {
    try {
      const desc = `${safeText(prototype.appName)}: ${safeText(prototype.description)}`;
      const resp = await fetch('/api/estimate-complexity', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: desc }),
      });

      if (!resp.ok) {
        setEstimate(fallbackEstimate(prototype));
        setStep('review');
        return;
      }

      const data = await resp.json();
      if (data.error) {
        setEstimate(fallbackEstimate(prototype));
      } else {
        setEstimate(data);
      }
      setStep('review');
    } catch {
      setEstimate(fallbackEstimate(prototype));
      setStep('review');
    }
  }

  async function handleBuild() {
    if (!user) return;
    setStep('building');

    try {
      const { data: job, error: insertErr } = await supabase
        .from('generation_jobs')
        .insert({
          user_id: user.id,
          type: 'mobile-app',
          source: 'user',
          input: {
            prompt: safeText(prototype.description),
            prototype_folder: prototype.folder,
            framework,
          },
          complexity: estimate,
        })
        .select()
        .single();

      if (insertErr) throw insertErr;
      onStarted(job.id);
    } catch (err: any) {
      setError(err.message || 'Failed to start build');
      setStep('error');
    }
  }

  const tier = estimate ? TIER_INFO[estimate.tier] || TIER_INFO.complex : null;

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(10px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: 'var(--bg-elevated)', border: '1px solid var(--border)',
          borderRadius: 20, padding: '36px 40px', maxWidth: 520, width: '92%',
        }}
      >
        {step === 'estimating' && (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <svg width="40" height="40" viewBox="0 0 24 24" style={{ animation: 'spin 1.5s linear infinite', marginBottom: 16 }}>
              <circle cx="12" cy="12" r="10" fill="none" stroke="var(--border)" strokeWidth="2" />
              <path d="M12 2a10 10 0 019.75 7.75" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            <p style={{ fontSize: 15, color: 'var(--text-muted)' }}>Analyzing app complexity...</p>
          </div>
        )}

        {step === 'review' && estimate && tier && (
          <>
            <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Build {safeText(prototype.appName)}</h2>
            <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 24 }}>
              AI will build a full mobile app from this prototype.
            </p>

            {/* Complexity Card */}
            <div style={{
              padding: 20, borderRadius: 14, border: '1px solid var(--border)',
              background: 'var(--bg)', marginBottom: 20,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <div>
                  <span style={{
                    display: 'inline-block', padding: '3px 12px', borderRadius: 50,
                    fontSize: 12, fontWeight: 700, textTransform: 'uppercase',
                    background: `${tier.color}22`, color: tier.color,
                  }}>{estimate.tier}</span>
                </div>
                <span style={{ fontSize: 32, fontWeight: 800, color: 'var(--text)' }}>{tier.price}</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 16 }}>
                {[
                  { label: 'Screens', value: `~${estimate.estimated_screens}` },
                  { label: 'Tasks', value: `~${estimate.task_count}` },
                  { label: 'Score', value: `${estimate.weighted_score}/5` },
                ].map(s => (
                  <div key={s.label} style={{ textAlign: 'center' }}>
                    <p style={{ fontSize: 20, fontWeight: 700, margin: 0 }}>{s.value}</p>
                    <p style={{ fontSize: 11, color: 'var(--text-muted)', margin: 0 }}>{s.label}</p>
                  </div>
                ))}
              </div>

              {estimate.key_integrations?.length > 0 && (
                <div style={{ marginBottom: 12 }}>
                  <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 6 }}>Integrations</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {estimate.key_integrations.map(k => (
                      <span key={k} style={{
                        padding: '3px 10px', borderRadius: 50, fontSize: 11,
                        background: 'var(--bg-elevated)', border: '1px solid var(--border)',
                        color: 'var(--text-secondary)',
                      }}>{k}</span>
                    ))}
                  </div>
                </div>
              )}

              <p style={{ fontSize: 12, color: 'var(--text-dim)', lineHeight: 1.5, margin: 0 }}>{estimate.reasoning}</p>
            </div>

            {/* Framework Selection */}
            <div style={{ marginBottom: 20 }}>
              <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 8 }}>Framework</p>
              <div style={{ display: 'flex', gap: 8 }}>
                {(['flutter', 'react-native', 'kmp'] as const).map(fw => (
                  <button
                    key={fw}
                    onClick={() => setFramework(fw)}
                    style={{
                      flex: 1, padding: '10px 0', borderRadius: 10, fontSize: 13, fontWeight: 600,
                      border: `2px solid ${framework === fw ? 'var(--accent)' : 'var(--border)'}`,
                      background: framework === fw ? 'rgba(232,160,74,0.08)' : 'none',
                      color: framework === fw ? 'var(--accent)' : 'var(--text-secondary)',
                      cursor: 'pointer',
                    }}
                  >{fw === 'kmp' ? 'KMP' : fw === 'react-native' ? 'React Native' : 'Flutter'}</button>
                ))}
              </div>
            </div>

            {/* Includes */}
            <div style={{ marginBottom: 24 }}>
              <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 8 }}>Includes</p>
              {[
                'Full source code (iOS + Android)',
                'Landing page + privacy policy',
                'Design system + assets',
                'Store listing + screenshots',
              ].map(item => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{item}</span>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: 12 }}>
              <button onClick={onClose} style={{
                flex: 1, padding: 14, borderRadius: 12, border: '1px solid var(--border)',
                background: 'none', color: 'var(--text-secondary)', fontSize: 14, fontWeight: 600, cursor: 'pointer',
              }}>Cancel</button>
              <button onClick={handleBuild} style={{
                flex: 2, padding: 14, borderRadius: 12, border: 'none',
                background: 'var(--accent)', color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer',
              }}>Build for {tier.price}</button>
            </div>
          </>
        )}

        {step === 'building' && (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: 16 }}>
              <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Build Started!</h2>
            <p style={{ fontSize: 14, color: 'var(--text-muted)' }}>Your app is being built. This takes 15-60 minutes.</p>
          </div>
        )}

        {step === 'error' && (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <p style={{ fontSize: 15, color: '#ef4444', marginBottom: 16 }}>{error}</p>
            <button onClick={onClose} style={{
              padding: '10px 24px', borderRadius: 10, border: 'none',
              background: 'var(--accent)', color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer',
            }}>Close</button>
          </div>
        )}
      </div>
    </div>
  );
}

function fallbackEstimate(proto: { category: string }): Estimate {
  return {
    tier: 'standard',
    weighted_score: 2.2,
    task_count: 15,
    estimated_screens: 6,
    key_integrations: ['supabase-auth'],
    reasoning: 'Estimated based on category. Actual complexity may vary.',
  };
}
