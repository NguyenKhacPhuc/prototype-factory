import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

interface Props {
  jobId: string;
  onComplete: (folder: string) => void;
  onClose: () => void;
}

const STEP_MESSAGES = [
  "Queued...",
  "Scouting trends and market context...",
  "Generating your app concept...",
  "Designing the visual system...",
  "Building your interactive prototype...",
  "Validating and testing...",
  "Deploying to preview...",
];

export function GenerationProgress({ jobId, onComplete, onClose }: Props) {
  const [step, setStep] = useState(0);
  const [total, setTotal] = useState(6);
  const [message, setMessage] = useState("Queued...");
  const [status, setStatus] = useState<"pending" | "running" | "completed" | "failed">("pending");
  const [error, setError] = useState<string | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [result, setResult] = useState<any>(null);

  // Timer
  useEffect(() => {
    const t = setInterval(() => setElapsed(e => e + 1), 1000);
    return () => clearInterval(t);
  }, []);

  // Subscribe to job updates
  useEffect(() => {
    const channel = supabase
      .channel(`job-${jobId}`)
      .on("postgres_changes", {
        event: "UPDATE",
        schema: "public",
        table: "generation_jobs",
        filter: `id=eq.${jobId}`,
      }, (payload: any) => {
        const j = payload.new;
        const p = j.progress || {};
        setStep(p.step || 0);
        setTotal(p.total || 6);
        setMessage(p.message || STEP_MESSAGES[p.step] || "Working...");
        setStatus(j.status);

        if (j.status === "completed") {
          setResult(j.result);
          if (j.result?.folder) {
            setTimeout(() => onComplete(j.result.folder), 2500);
          }
        }
        if (j.status === "failed") {
          setError(j.error || "Generation failed. Please try again.");
        }
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [jobId, onComplete]);

  const pct = total > 0 ? Math.round((step / total) * 100) : 0;
  const mins = Math.floor(elapsed / 60);
  const secs = elapsed % 60;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "rgba(0,0,0,0.75)", backdropFilter: "blur(10px)",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: "var(--bg-elevated)", border: "1px solid var(--border)",
          borderRadius: 20, padding: "40px 48px", maxWidth: 480, width: "90%",
          textAlign: "center",
        }}
      >
        {status === "failed" ? (
          <>
            <div style={{ fontSize: 48, marginBottom: 16 }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="15" y1="9" x2="9" y2="15" />
                <line x1="9" y1="9" x2="15" y2="15" />
              </svg>
            </div>
            <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Generation Failed</h2>
            <p style={{ fontSize: 14, color: "var(--text-muted)", lineHeight: 1.6, marginBottom: 24 }}>{error}</p>
            <button
              onClick={onClose}
              style={{
                padding: "12px 32px", borderRadius: 10, border: "none",
                background: "var(--accent)", color: "#fff", fontSize: 14,
                fontWeight: 600, cursor: "pointer",
              }}
            >Try Again</button>
          </>
        ) : status === "completed" ? (
          <>
            <div style={{ marginBottom: 16 }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>

            {result?.expo_url ? (
              <>
                <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>App Built!</h2>
                <p style={{ fontSize: 14, color: "var(--text-muted)", marginBottom: 20 }}>Test it on your phone now.</p>

                {/* Test on Device instructions */}
                <div style={{
                  padding: 20, borderRadius: 14, border: "1px solid var(--border)",
                  background: "var(--bg)", textAlign: "left", marginBottom: 20,
                }}>
                  <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>Test on Your Device</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {[
                      { step: "1", text: "Install Expo Go from App Store / Play Store" },
                      { step: "2", text: "Open Camera (iOS) or Expo Go (Android)" },
                      { step: "3", text: "Scan the QR code or open the link below" },
                    ].map(s => (
                      <div key={s.step} style={{ display: "flex", gap: 10, alignItems: "center" }}>
                        <span style={{
                          width: 24, height: 24, borderRadius: "50%", background: "var(--accent)",
                          color: "#fff", fontSize: 12, fontWeight: 700,
                          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                        }}>{s.step}</span>
                        <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>{s.text}</span>
                      </div>
                    ))}
                  </div>

                  {result.expo_url.startsWith("http") && (
                    <a href={result.expo_url} target="_blank" rel="noopener"
                      style={{
                        display: "block", marginTop: 16, padding: "10px 16px", borderRadius: 10,
                        background: "rgba(232,160,74,0.1)", border: "1px solid rgba(232,160,74,0.3)",
                        color: "var(--accent)", fontSize: 13, fontWeight: 600,
                        textDecoration: "none", textAlign: "center",
                      }}
                    >Open in Expo Go</a>
                  )}
                </div>

                {result.download_url && (
                  <a href={result.download_url} target="_blank" rel="noopener"
                    style={{
                      display: "block", padding: "12px 24px", borderRadius: 10, border: "1px solid var(--border)",
                      color: "var(--text-secondary)", fontSize: 13, fontWeight: 600,
                      textDecoration: "none", textAlign: "center", marginBottom: 12,
                    }}
                  >Download Source Code</a>
                )}

                <button onClick={onClose} style={{
                  width: "100%", padding: 14, borderRadius: 12, border: "none",
                  background: "var(--accent)", color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer",
                }}>Done</button>
              </>
            ) : (
              <>
                <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>
                  {result?.folder ? "Prototype Ready!" : "Build Complete!"}
                </h2>
                <p style={{ fontSize: 14, color: "var(--text-muted)" }}>
                  {result?.folder ? "Redirecting to your prototype..." : "Your app has been built."}
                </p>
                {result?.download_url && (
                  <a href={result.download_url} target="_blank" rel="noopener"
                    style={{
                      display: "inline-block", marginTop: 16, padding: "10px 24px", borderRadius: 10,
                      background: "var(--accent)", color: "#fff", fontSize: 14, fontWeight: 600,
                      textDecoration: "none",
                    }}
                  >Download Source</a>
                )}
              </>
            )}
          </>
        ) : (
          <>
            {/* Spinner */}
            <div style={{ marginBottom: 24 }}>
              <svg width="48" height="48" viewBox="0 0 24 24" style={{ animation: "spin 1.5s linear infinite" }}>
                <circle cx="12" cy="12" r="10" fill="none" stroke="var(--border)" strokeWidth="2" />
                <path d="M12 2a10 10 0 019.75 7.75" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>

            <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 6 }}>
              {status === "pending" ? "In Queue..." : "Generating..."}
            </h2>
            <p style={{ fontSize: 14, color: "var(--text-muted)", marginBottom: 24 }}>{message}</p>

            {/* Progress bar */}
            <div style={{
              width: "100%", height: 6, borderRadius: 3,
              background: "var(--border)", overflow: "hidden", marginBottom: 12,
            }}>
              <div style={{
                width: `${pct}%`, height: "100%", borderRadius: 3,
                background: "var(--accent)",
                transition: "width 0.5s ease",
              }} />
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "var(--text-dim)" }}>
              <span>Step {step}/{total}</span>
              <span>{mins}:{secs.toString().padStart(2, "0")}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
