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
  const [framework, setFramework] = useState<'flutter' | 'react-native' | 'kmp'>('react-native');
  const [error, setError] = useState('');
  const [showPaypal, setShowPaypal] = useState(false);
  const [paypalLoaded, setPaypalLoaded] = useState(false);
  const paypalRef = React.useRef<HTMLDivElement>(null);

  // Skip estimation — go straight to review
  useEffect(() => {
    setEstimate(fallbackEstimate(prototype));
    setStep('review');
  }, []);

  // Load PayPal SDK when showing payment
  useEffect(() => {
    if (!showPaypal || paypalLoaded) return;

    const PAYPAL_CLIENT_ID = 'AVxqysJg5cRM0IyK0A3xZ4VHhPPV43f73SDGHWPsE0rFafvHiKAeRJFQMq40Se0SQMRHaS02GQswjcAV';
    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&currency=USD&intent=capture`;
    script.onload = () => {
      setPaypalLoaded(true);
      if (paypalRef.current && (window as any).paypal) {
        (window as any).paypal.Buttons({
          style: { shape: 'rect', layout: 'vertical', color: 'gold', label: 'pay' },
          createOrder: function() {
            return fetch('/api/paypal-create-order', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ amount: '9.99', description: 'Build App' }),
            }).then(function(resp) { return resp.json(); })
              .then(function(order) { return order.id; });
          },
          onApprove: function(data: any) {
            return fetch('/api/paypal-capture-order', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ orderID: data.orderID }),
            }).then(function(resp) { return resp.json(); })
              .then(function(captureData: any) {
                const status = captureData.purchase_units?.[0]?.payments?.captures?.[0]?.status;
                if (status === 'COMPLETED') {
                  handleBuild();
                } else {
                  setError('Payment was not completed. Please try again.');
                }
              });
          },
          onError: function(err: any) {
            setError('Payment failed. Please try again.');
            console.error('PayPal error:', err);
          },
        }).render(paypalRef.current);
      }
    };
    document.body.appendChild(script);
    return () => { try { document.body.removeChild(script); } catch {} };
  }, [showPaypal]);

  async function handleBuild() {
    if (!user) return;
    setStep('building');

    try {
      const { data: job, error: insertErr } = await supabase
        .from('generation_jobs')
        .insert({
          user_id: user.id,
          type: 'mobile-app',
          status: 'pending',
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

        {step === 'review' && (
          <>
            <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Build {safeText(prototype.appName)}</h2>
            <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 24 }}>
              AI will build a full mobile app from this prototype.
            </p>

            {/* What you get */}
            <div style={{ padding: 20, borderRadius: 14, border: '1px solid var(--border)', background: 'var(--bg)', marginBottom: 20 }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 12 }}>What's included</p>
              {[
                { icon: '📱', text: 'Full source code (iOS + Android)' },
                { icon: '🎨', text: 'Design system + assets from your prototype' },
                { icon: '🌐', text: 'Landing page + privacy policy' },
                { icon: '🏪', text: 'Store listing + screenshots' },
                { icon: '⚡', text: 'Test instantly with Expo Go on your phone' },
              ].map(item => (
                <div key={item.text} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                  <span style={{ fontSize: 16 }}>{item.icon}</span>
                  <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{item.text}</span>
                </div>
              ))}
            </div>

            {/* How it works */}
            <div style={{ padding: 20, borderRadius: 14, border: '1px solid var(--border)', background: 'var(--bg)', marginBottom: 20 }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 12 }}>How it works</p>
              {[
                { step: '1', text: 'AI analyzes your prototype design' },
                { step: '2', text: 'Generates all screens, components, and navigation' },
                { step: '3', text: 'Installs packages and verifies code compiles' },
                { step: '4', text: 'Packages for download — ready in ~3 minutes' },
              ].map(s => (
                <div key={s.step} style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 8 }}>
                  <span style={{ width: 22, height: 22, borderRadius: '50%', background: 'var(--accent)', color: '#fff', fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{s.step}</span>
                  <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{s.text}</span>
                </div>
              ))}
            </div>

            {/* Framework Selection */}
            <div style={{ marginBottom: 24 }}>
              <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 8 }}>Framework</p>
              <div style={{ display: 'flex', gap: 8 }}>
                {(['react-native', 'flutter', 'kmp'] as const).map(fw => (
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

            {/* Actions */}
            {!showPaypal ? (
              <div style={{ display: 'flex', gap: 12 }}>
                <button onClick={onClose} style={{
                  flex: 1, padding: 14, borderRadius: 12, border: '1px solid var(--border)',
                  background: 'none', color: 'var(--text-secondary)', fontSize: 14, fontWeight: 600, cursor: 'pointer',
                }}>Cancel</button>
                <button onClick={() => setShowPaypal(true)} style={{
                  flex: 2, padding: 14, borderRadius: 12, border: 'none',
                  background: 'var(--accent)', color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer',
                }}>Build App — $9.99</button>
              </div>
            ) : (
              <div>
                <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 12, textAlign: 'center' }}>Complete payment to start building</p>
                <div ref={paypalRef} style={{ minHeight: 150 }}>
                  {!paypalLoaded && (
                    <div style={{ textAlign: 'center', padding: 20, color: 'var(--text-dim)' }}>Loading PayPal...</div>
                  )}
                </div>
                <button onClick={() => setShowPaypal(false)} style={{
                  width: '100%', marginTop: 12, padding: 10, borderRadius: 10, border: '1px solid var(--border)',
                  background: 'none', color: 'var(--text-muted)', fontSize: 13, cursor: 'pointer',
                }}>Back</button>
              </div>
            )}
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
