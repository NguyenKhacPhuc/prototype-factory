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
  complexity: { tier?: string; estimated_screens?: number; task_count?: number; weighted_score?: number; reasoning?: string } | null;
  design_data: any;
  progress: { step?: number; total?: number; message?: string };
  estimated_cost_cents: number;
  files_created: { path: string; status: string; size: number }[];
  live_output: string;
  result: any;
  error: string | null;
}

const TIER_COST: Record<string, string> = { simple: "$0.20", standard: "$0.40", complex: "$0.80", advanced: "$1.50", enterprise: "$3.00" };

export function DesignReview({ jobId, navigate }: Props) {
  const { user } = useAuth();
  const [job, setJob] = useState<JobData | null>(null);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState("");
  const terminalRef = useRef<HTMLDivElement>(null);

  // Load job + subscribe to realtime
  useEffect(() => {
    loadJob();
    const channel = supabase
      .channel(`design-${jobId}`)
      .on("postgres_changes", { event: "UPDATE", schema: "public", table: "generation_jobs", filter: `id=eq.${jobId}` },
        (payload: any) => setJob(payload.new))
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [jobId]);

  // Auto-scroll terminal
  useEffect(() => {
    if (terminalRef.current) terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
  }, [job?.live_output, job?.files_created]);

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

  if (loading) return <div style={{ padding: 60, textAlign: "center", color: "var(--text-muted)" }}>Loading...</div>;
  if (!job) return <div style={{ padding: 60, textAlign: "center", color: "var(--text-muted)" }}>Job not found</div>;

  const design = job.design_data || {};
  const colors = design.colors || {};
  const screens = design.screens || [];
  const isBuilding = job.status === "running";
  const isDone = job.status === "completed";
  const isFailed = job.status === "failed";
  const isReview = job.status === "pending_design_review";
  const progress = job.progress || {};
  const files = job.files_created || [];

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 24px" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <button onClick={() => navigate("/gallery")} style={{ background: "none", border: "none", color: "var(--text-muted)", fontSize: 13, cursor: "pointer", marginBottom: 8 }}>&larr; Back</button>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, fontWeight: 600 }}>
            {design.appName || "Building App"}
          </h1>
          <p style={{ fontSize: 14, color: "var(--text-muted)", marginTop: 4 }}>{design.description || job.input?.prompt}</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{
            padding: "4px 14px", borderRadius: 50, fontSize: 12, fontWeight: 600,
            background: isBuilding ? "rgba(59,130,246,0.15)" : isDone ? "rgba(34,197,94,0.15)" : isFailed ? "rgba(239,68,68,0.15)" : "rgba(232,160,74,0.15)",
            color: isBuilding ? "#3b82f6" : isDone ? "#22c55e" : isFailed ? "#ef4444" : "var(--accent)",
          }}>{job.status.replace(/_/g, " ")}</span>
          {job.estimated_cost_cents > 0 && (
            <span style={{ fontSize: 13, fontFamily: "monospace", color: "var(--text-dim)" }}>${(job.estimated_cost_cents / 100).toFixed(2)}</span>
          )}
        </div>
      </div>

      {/* Split Panel */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, alignItems: "start" }}>

        {/* LEFT: Design Review */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

          {/* Colors */}
          {Object.keys(colors).length > 0 && (
            <div style={{ padding: 20, borderRadius: 14, background: "var(--bg-elevated)", border: "1px solid var(--border)" }}>
              <h3 style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: "var(--text-muted)", marginBottom: 12 }}>Colors</h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {Object.entries(colors).map(([name, hex]) => (
                  <div key={name} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: String(hex), border: "1px solid var(--border)" }} />
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 600, color: "var(--text)" }}>{name}</div>
                      <div style={{ fontSize: 11, fontFamily: "monospace", color: "var(--text-dim)" }}>{String(hex)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Screens */}
          {screens.length > 0 && (
            <div style={{ padding: 20, borderRadius: 14, background: "var(--bg-elevated)", border: "1px solid var(--border)" }}>
              <h3 style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: "var(--text-muted)", marginBottom: 12 }}>Screens ({screens.length})</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {screens.map((s: any, i: number) => (
                  <div key={i} style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    <span style={{ width: 24, height: 24, borderRadius: "50%", background: "var(--accent)", color: "#fff", fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{i + 1}</span>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600 }}>{typeof s === "string" ? s : s.name}</div>
                      {typeof s !== "string" && s.description && <div style={{ fontSize: 12, color: "var(--text-dim)" }}>{s.description}</div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Features */}
          {design.features?.length > 0 && (
            <div style={{ padding: 20, borderRadius: 14, background: "var(--bg-elevated)", border: "1px solid var(--border)" }}>
              <h3 style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: "var(--text-muted)", marginBottom: 12 }}>Features</h3>
              {design.features.map((f: string, i: number) => (
                <div key={i} style={{ fontSize: 13, color: "var(--text-secondary)", marginBottom: 6, paddingLeft: 12, borderLeft: "2px solid var(--accent)" }}>{f}</div>
              ))}
            </div>
          )}

          {/* Feedback + Actions (only during review) */}
          {isReview && (
            <div style={{ padding: 20, borderRadius: 14, background: "var(--bg-elevated)", border: "1px solid rgba(232,160,74,0.3)" }}>
              <h3 style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: "var(--text-muted)", marginBottom: 12 }}>Feedback (optional)</h3>
              <textarea
                value={feedback}
                onChange={e => setFeedback(e.target.value)}
                placeholder="Any changes? e.g. 'make it darker', 'add a search screen'..."
                rows={3}
                style={{ width: "100%", padding: 12, borderRadius: 10, border: "1px solid var(--border)", background: "var(--bg)", color: "var(--text)", fontSize: 13, fontFamily: "inherit", resize: "none", boxSizing: "border-box" }}
              />
              <div style={{ display: "flex", gap: 12, marginTop: 14 }}>
                <button onClick={handleCancel} style={{ flex: 1, padding: 12, borderRadius: 10, border: "1px solid var(--border)", background: "none", color: "var(--text-secondary)", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>Cancel</button>
                <button onClick={handleApprove} style={{ flex: 2, padding: 12, borderRadius: 10, border: "none", background: "var(--accent)", color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>Approve & Build</button>
              </div>
            </div>
          )}

          {/* Done actions */}
          {isDone && job.result?.download_url && (
            <a href={job.result.download_url} target="_blank" rel="noopener" style={{
              display: "block", padding: 14, borderRadius: 12, background: "var(--accent)", color: "#fff",
              fontSize: 14, fontWeight: 700, textAlign: "center", textDecoration: "none",
            }}>Download Source Code</a>
          )}

          {isFailed && (
            <div style={{ padding: 16, borderRadius: 12, background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", color: "#ef4444", fontSize: 13 }}>
              {job.error || "Build failed"}
            </div>
          )}
        </div>

        {/* RIGHT: Live Terminal */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

          {/* Terminal */}
          <div style={{ borderRadius: 14, background: "#0D0D0D", border: "1px solid #222", overflow: "hidden" }}>
            <div style={{ padding: "10px 16px", borderBottom: "1px solid #222", display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ display: "flex", gap: 6 }}>
                <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#FF5F57" }} />
                <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#FEBC2E" }} />
                <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#28C840" }} />
              </div>
              <span style={{ fontSize: 12, color: "#666", marginLeft: 8 }}>build output</span>
            </div>
            <div
              ref={terminalRef}
              style={{ padding: 16, height: 300, overflowY: "auto", fontFamily: "'SF Mono', 'Fira Code', 'Consolas', monospace", fontSize: 12, lineHeight: 1.6, color: "#e0e0e0" }}
            >
              {!isBuilding && !isDone && !isFailed ? (
                <span style={{ color: "#666" }}>Waiting for build to start...</span>
              ) : (
                <>
                  <div style={{ color: "#22c55e" }}>$ appdex build --framework react-native</div>
                  <div style={{ color: "#666", marginBottom: 8 }}>{progress.message || "..."}</div>
                  {job.live_output ? (
                    <pre style={{ margin: 0, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>{job.live_output}</pre>
                  ) : (
                    <span style={{ color: "#444" }}>Building...</span>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Files */}
          <div style={{ padding: 20, borderRadius: 14, background: "var(--bg-elevated)", border: "1px solid var(--border)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <h3 style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: "var(--text-muted)" }}>Files</h3>
              <span style={{ fontSize: 12, color: "var(--text-dim)" }}>{files.length} created</span>
            </div>
            {files.length === 0 ? (
              <span style={{ fontSize: 12, color: "var(--text-dim)" }}>No files yet...</span>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 4, maxHeight: 250, overflowY: "auto" }}>
                {files.map((f: any, i: number) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "4px 8px", borderRadius: 6, background: "var(--bg)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <span style={{ color: f.status === "done" ? "#22c55e" : "#f59e0b", fontSize: 12 }}>
                        {f.status === "done" ? "✓" : "⏳"}
                      </span>
                      <span style={{ fontSize: 12, fontFamily: "monospace", color: "var(--text-secondary)" }}>{f.path}</span>
                    </div>
                    <span style={{ fontSize: 11, color: "var(--text-dim)" }}>
                      {f.size ? `${(f.size / 1024).toFixed(1)}KB` : ""}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Progress */}
          {(isBuilding || isDone) && (
            <div style={{ padding: 16, borderRadius: 14, background: "var(--bg-elevated)", border: "1px solid var(--border)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "var(--text-muted)", marginBottom: 8 }}>
                <span>{progress.message || "Building..."}</span>
                <span>{progress.step || 0}/{progress.total || 5}</span>
              </div>
              <div style={{ width: "100%", height: 4, borderRadius: 2, background: "var(--border)" }}>
                <div style={{
                  width: `${((progress.step || 0) / (progress.total || 5)) * 100}%`,
                  height: "100%", borderRadius: 2,
                  background: isDone ? "#22c55e" : "var(--accent)",
                  transition: "width 0.5s ease",
                }} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
