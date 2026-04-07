import React, { useState, useEffect, useRef } from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "../hooks/use-auth";

interface Props {
  jobId: string;
  navigate: (to: string) => void;
}

interface JobData {
  id: string;
  status: string;
  input: { prompt?: string; prototype_folder?: string; framework?: string };
  complexity: { tier?: string; estimated_screens?: number; task_count?: number } | null;
  design_data: any;
  progress: { step?: number; total?: number; message?: string };
  estimated_cost_cents: number;
  files_created: { path: string; status: string; size: number }[];
  live_output: string;
  result: any;
  error: string | null;
}

export function DesignReview({ jobId, navigate }: Props) {
  const { user } = useAuth();
  const [job, setJob] = useState<JobData | null>(null);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState("");
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadJob();
    const channel = supabase
      .channel(`design-${jobId}`)
      .on("postgres_changes", { event: "UPDATE", schema: "public", table: "generation_jobs", filter: `id=eq.${jobId}` },
        (payload: any) => setJob(payload.new))
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [jobId]);

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [job?.live_output, job?.files_created, job?.progress]);

  async function loadJob() {
    const { data } = await supabase.from("generation_jobs").select("*").eq("id", jobId).single();
    if (data) setJob(data);
    setLoading(false);
  }

  async function handleApprove() {
    await supabase.from("generation_jobs").update({ status: "pending" }).eq("id", jobId);
  }

  async function handleCancel() {
    await supabase.from("generation_jobs").update({ status: "cancelled" }).eq("id", jobId);
    navigate("/gallery");
  }

  if (loading) return <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-muted)" }}>Loading...</div>;
  if (!job) return <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-muted)" }}>Job not found</div>;

  const design = job.design_data || {};
  const colors = design.colors || {};
  const screens = design.screens || [];
  const protoFolder = job.input?.prototype_folder || "";
  const files = job.files_created || [];
  const progress = job.progress || {};
  const isReview = job.status === "pending_design_review";
  const isBuilding = job.status === "running";
  const isDone = job.status === "completed";
  const isFailed = job.status === "failed";
  const isPending = job.status === "pending";

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>

      {/* ═══ LEFT: Activity Log ═══ */}
      <div style={{ width: 420, flexShrink: 0, borderRight: "1px solid var(--border)", display: "flex", flexDirection: "column", background: "var(--bg)" }}>

        {/* Header */}
        <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 12 }}>
          <button onClick={() => navigate("/gallery")} style={{ background: "none", border: "none", color: "var(--text-muted)", fontSize: 18, cursor: "pointer", padding: 0 }}>&larr;</button>
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: 16, fontWeight: 700, margin: 0 }}>{design.appName || "Building App"}</h1>
            <p style={{ fontSize: 12, color: "var(--text-dim)", margin: 0, marginTop: 2 }}>{job.input?.prompt?.slice(0, 60)}</p>
          </div>
          <span style={{
            padding: "3px 10px", borderRadius: 50, fontSize: 11, fontWeight: 600,
            background: isBuilding ? "rgba(59,130,246,0.15)" : isDone ? "rgba(34,197,94,0.15)" : isFailed ? "rgba(239,68,68,0.15)" : "rgba(232,160,74,0.15)",
            color: isBuilding ? "#3b82f6" : isDone ? "#22c55e" : isFailed ? "#ef4444" : "var(--accent)",
          }}>{isDone ? "Done" : isFailed ? "Failed" : isBuilding ? "Building" : isPending ? "Queued" : "Review"}</span>
        </div>

        {/* Scrollable log area */}
        <div ref={logRef} style={{ flex: 1, overflowY: "auto", padding: "16px 20px" }}>

          {/* Design summary */}
          {screens.length > 0 && (
            <LogSection title="App Design">
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12 }}>
                {Object.entries(colors).map(([name, hex]) => (
                  <div key={name} title={`${name}: ${hex}`} style={{ width: 24, height: 24, borderRadius: 6, background: String(hex), border: "1px solid rgba(255,255,255,0.1)" }} />
                ))}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {screens.map((s: any, i: number) => (
                  <span key={i} style={{ padding: "3px 10px", borderRadius: 50, fontSize: 11, background: "var(--bg-elevated)", border: "1px solid var(--border)", color: "var(--text-secondary)" }}>
                    {typeof s === "string" ? s : s.name}
                  </span>
                ))}
              </div>
            </LogSection>
          )}

          {/* Actions performed */}
          {files.length > 0 && (
            <LogSection title={`Writing ${files.length} files`}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                {files.map((f: any, i: number) => (
                  <FileIcon key={i} path={f.path} status={f.status} />
                ))}
              </div>
            </LogSection>
          )}

          {/* Progress messages */}
          {progress.message && (isBuilding || isDone) && (
            <LogSection title={progress.message}>
              {job.estimated_cost_cents > 0 && (
                <span style={{ fontSize: 11, color: "var(--text-dim)" }}>${(job.estimated_cost_cents / 100).toFixed(2)} spent</span>
              )}
            </LogSection>
          )}

          {/* Live output */}
          {job.live_output && (
            <LogSection title="Build output">
              <pre style={{ margin: 0, fontSize: 11, fontFamily: "'SF Mono', monospace", color: "var(--text-dim)", whiteSpace: "pre-wrap", wordBreak: "break-word", maxHeight: 200, overflow: "auto" }}>
                {job.live_output}
              </pre>
            </LogSection>
          )}

          {/* Error */}
          {isFailed && (
            <LogSection title="Build failed">
              <p style={{ fontSize: 12, color: "#ef4444", margin: 0 }}>{job.error}</p>
            </LogSection>
          )}

          {/* Done — QR code */}
          {isDone && (
            <LogSection title="Build complete!">
              {job.result?.expo_url ? (
                <div style={{ textAlign: "center", marginTop: 8 }}>
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(job.result.expo_url)}&bgcolor=1a1a1a&color=ffffff`}
                    alt="QR"
                    style={{ width: 180, height: 180, borderRadius: 12 }}
                  />
                  <p style={{ fontSize: 11, color: "var(--text-dim)", marginTop: 6 }}>Scan with Expo Go</p>
                </div>
              ) : (
                <div style={{ fontSize: 12, color: "var(--text-muted)" }}>
                  <p style={{ margin: "0 0 8px" }}>Download and run:</p>
                  <code style={{ fontSize: 11, color: "var(--accent)" }}>bun install && npx expo start</code>
                </div>
              )}
              {job.result?.download_url && (
                <a href={job.result.download_url} target="_blank" rel="noopener" style={{
                  display: "block", marginTop: 12, padding: 10, borderRadius: 10, background: "var(--accent)",
                  color: "#fff", fontSize: 13, fontWeight: 600, textAlign: "center", textDecoration: "none",
                }}>Download Source</a>
              )}
            </LogSection>
          )}

          {/* Scroll to latest indicator */}
          {isBuilding && (
            <div style={{ textAlign: "center", padding: "12px 0" }}>
              <span style={{ fontSize: 11, color: "var(--text-dim)" }}>↓ Building...</span>
            </div>
          )}
        </div>

        {/* Bottom: Feedback + Actions (review mode) OR Progress bar */}
        <div style={{ borderTop: "1px solid var(--border)", padding: "12px 20px" }}>
          {isReview ? (
            <>
              <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
                <input
                  value={feedback}
                  onChange={e => setFeedback(e.target.value)}
                  placeholder="Any feedback? e.g. 'make it darker'"
                  style={{ flex: 1, padding: "8px 12px", borderRadius: 8, border: "1px solid var(--border)", background: "var(--bg-elevated)", color: "var(--text)", fontSize: 13, fontFamily: "inherit" }}
                />
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={handleCancel} style={{ flex: 1, padding: 10, borderRadius: 8, border: "1px solid var(--border)", background: "none", color: "var(--text-muted)", fontSize: 13, cursor: "pointer" }}>Cancel</button>
                <button onClick={handleApprove} style={{ flex: 2, padding: 10, borderRadius: 8, border: "none", background: "var(--accent)", color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Approve & Build</button>
              </div>
            </>
          ) : (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--text-dim)", marginBottom: 6 }}>
                <span>{progress.message || (isDone ? "Complete" : "...")}</span>
                <span>{progress.step || 0}/{progress.total || 5}</span>
              </div>
              <div style={{ width: "100%", height: 3, borderRadius: 2, background: "var(--border)" }}>
                <div style={{
                  width: `${((progress.step || 0) / (progress.total || 5)) * 100}%`,
                  height: "100%", borderRadius: 2,
                  background: isDone ? "#22c55e" : isFailed ? "#ef4444" : "var(--accent)",
                  transition: "width 0.5s",
                }} />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ═══ RIGHT: Phone Preview ═══ */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", background: "#0a0a0a", position: "relative" }}>
        {protoFolder ? (
          <div style={{ position: "relative" }}>
            {/* Phone frame */}
            <div style={{
              width: 375, height: 812,
              borderRadius: 44, overflow: "hidden",
              border: "8px solid #2a2a2a",
              boxShadow: "0 40px 80px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(255,255,255,0.05)",
              background: "#000",
            }}>
              <iframe
                src={`/prototypes/${protoFolder}/preview.html`}
                sandbox="allow-scripts allow-same-origin"
                title={design.appName || "Preview"}
                style={{ width: "100%", height: "100%", border: "none" }}
              />
            </div>
            {/* App name badge */}
            <div style={{
              position: "absolute", top: -36, left: "50%", transform: "translateX(-50%)",
              padding: "4px 16px", borderRadius: 50, fontSize: 12, fontWeight: 600,
              background: "rgba(232,160,74,0.15)", color: "var(--accent)", border: "1px solid rgba(232,160,74,0.3)",
              whiteSpace: "nowrap",
            }}>
              {design.appName || "Preview"}
            </div>
          </div>
        ) : isDone ? (
          <div style={{ textAlign: "center", color: "var(--text-muted)" }}>
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            <p style={{ fontSize: 16, fontWeight: 600, marginTop: 16 }}>App built successfully</p>
            <p style={{ fontSize: 13, color: "var(--text-dim)" }}>Download source or scan QR to test</p>
          </div>
        ) : (
          <div style={{ textAlign: "center", color: "var(--text-dim)" }}>
            {isBuilding ? (
              <>
                <div style={{ width: 48, height: 48, border: "3px solid var(--border)", borderTopColor: "var(--accent)", borderRadius: "50%", animation: "spin 1s linear infinite", margin: "0 auto 16px" }} />
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                <p style={{ fontSize: 14 }}>Building your app...</p>
              </>
            ) : (
              <p style={{ fontSize: 14 }}>Preview will appear here</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Subcomponents ───────────────────────────────────────────

function LogSection({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <p style={{ fontSize: 13, fontWeight: 600, color: "var(--text)", margin: "0 0 8px", lineHeight: 1.5 }}>{title}</p>
      {children}
    </div>
  );
}

function FileIcon({ path, status }: { path: string; status: string }) {
  const ext = path.split(".").pop() || "";
  const icon = ext === "tsx" || ext === "ts" ? "⟨⟩" : ext === "json" ? "{}" : "📄";
  return (
    <div title={path} style={{
      width: 28, height: 28, borderRadius: 6,
      background: status === "done" ? "rgba(34,197,94,0.1)" : "rgba(245,158,11,0.1)",
      border: `1px solid ${status === "done" ? "rgba(34,197,94,0.2)" : "rgba(245,158,11,0.2)"}`,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: 10, cursor: "default",
    }}>{icon}</div>
  );
}
