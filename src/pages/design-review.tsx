import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "../hooks/use-auth";

interface Props {
  jobId: string;
  navigate: (to: string) => void;
}

interface DesignTokens {
  colors?: Record<string, string>;
  typography?: {
    fontFamily?: string;
    headingFont?: string;
    bodyFont?: string;
    sizes?: Record<string, number | string>;
    weights?: Record<string, number | string>;
  };
  spacing?: Record<string, number | string>;
}

interface DesignSpec {
  appName?: string;
  tagline?: string;
  style?: string;
  screens?: Array<{ name: string; description?: string }> | string[];
  framework?: string;
}

interface JobData {
  id: string;
  status: string;
  input: {
    prompt?: string;
    prototype_folder?: string;
    framework?: string;
  };
  complexity: {
    tier?: string;
    estimated_screens?: number;
    task_count?: number;
    weighted_score?: number;
    reasoning?: string;
  } | null;
  specs?: {
    design_tokens?: DesignTokens;
    design_spec?: DesignSpec;
  } | null;
}

const TIER_TIME: Record<string, string> = {
  simple: "~10 min",
  standard: "~20 min",
  complex: "~35 min",
  advanced: "~50 min",
  enterprise: "~60 min",
};

const TIER_COST: Record<string, string> = {
  simple: "$0.20",
  standard: "$0.40",
  complex: "$0.80",
  advanced: "$1.50",
  enterprise: "$3.00",
};

export function DesignReview({ jobId, navigate }: Props) {
  const { user } = useAuth();
  const [job, setJob] = useState<JobData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [feedback, setFeedback] = useState("");
  const [approving, setApproving] = useState(false);
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    loadJob();
  }, [jobId]);

  async function loadJob() {
    try {
      setLoading(true);
      const { data, error: fetchErr } = await supabase
        .from("generation_jobs")
        .select("id, status, input, complexity, specs")
        .eq("id", jobId)
        .single();

      if (fetchErr) throw fetchErr;
      if (!data) throw new Error("Job not found");

      setJob(data as JobData);
    } catch (err: any) {
      setError(err.message || "Failed to load design review");
    } finally {
      setLoading(false);
    }
  }

  async function handleApprove() {
    if (!user || !job) return;
    setApproving(true);
    try {
      const { error: updateErr } = await supabase
        .from("generation_jobs")
        .update({ status: "pending" })
        .eq("id", job.id);

      if (updateErr) throw updateErr;
      navigate("/profile");
    } catch (err: any) {
      setError(err.message || "Failed to approve design");
      setApproving(false);
    }
  }

  async function handleCancel() {
    if (!user || !job) return;
    setCancelling(true);
    try {
      const { error: updateErr } = await supabase
        .from("generation_jobs")
        .update({ status: "cancelled" })
        .eq("id", job.id);

      if (updateErr) throw updateErr;
      navigate("/profile");
    } catch (err: any) {
      setError(err.message || "Failed to cancel job");
      setCancelling(false);
    }
  }

  if (loading) {
    return (
      <div style={{ maxWidth: 820, margin: "0 auto", padding: "60px 24px" }}>
        <div style={{ textAlign: "center", padding: "60px 0" }}>
          <svg width="40" height="40" viewBox="0 0 24 24" style={{ animation: "spin 1.5s linear infinite", marginBottom: 16 }}>
            <circle cx="12" cy="12" r="10" fill="none" stroke="var(--border)" strokeWidth="2" />
            <path d="M12 2a10 10 0 019.75 7.75" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <p style={{ fontSize: 15, color: "var(--text-muted)" }}>Loading design review...</p>
        </div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div style={{ maxWidth: 820, margin: "0 auto", padding: "60px 24px" }}>
        <div style={{ textAlign: "center", padding: "60px 0" }}>
          <p style={{ fontSize: 16, color: "#ef4444", marginBottom: 20 }}>{error || "Job not found"}</p>
          <button onClick={() => navigate("/profile")} style={btnOutlineStyle}>Back to Profile</button>
        </div>
      </div>
    );
  }

  const tokens = job.specs?.design_tokens;
  const spec = job.specs?.design_spec;
  const complexity = job.complexity;
  const tier = complexity?.tier || "standard";
  const appName = spec?.appName || job.input?.prototype_folder || "Untitled App";

  const colors = tokens?.colors || {};
  const typography = tokens?.typography;
  const screens = spec?.screens || [];

  return (
    <div style={{ maxWidth: 820, margin: "0 auto", padding: "60px 24px" }}>
      {/* Header */}
      <div style={{ marginBottom: 40 }}>
        <button
          onClick={() => navigate("/profile")}
          style={{ background: "none", border: "none", color: "var(--text-muted)", fontSize: 14, cursor: "pointer", marginBottom: 16, display: "inline-flex", alignItems: "center", gap: 6 }}
        >
          <span>&larr;</span> Back
        </button>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 700, marginBottom: 6 }}>
          Design Review
        </h1>
        <p style={{ fontSize: 16, color: "var(--text-secondary)" }}>
          {appName}
          {spec?.tagline ? ` — ${spec.tagline}` : ""}
        </p>
        {job.status !== "pending_design_review" && (
          <span style={{
            display: "inline-block", marginTop: 8, padding: "4px 12px", borderRadius: 50,
            fontSize: 12, fontWeight: 600, textTransform: "uppercase",
            background: "rgba(239,68,68,0.1)", color: "#ef4444",
          }}>
            Status: {job.status}
          </span>
        )}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 24 }}>
        {/* Color Palette */}
        <div style={cardStyle}>
          <h2 style={sectionHeadingStyle}>Colors</h2>
          {Object.keys(colors).length > 0 ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {Object.entries(colors).map(([name, value]) => (
                <div key={name} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 8,
                    background: value, border: "1px solid var(--border)",
                    flexShrink: 0,
                  }} />
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 600, margin: 0, textTransform: "capitalize" }}>
                      {name.replace(/([A-Z])/g, " $1").replace(/_/g, " ").trim()}
                    </p>
                    <p style={{ fontSize: 12, color: "var(--text-muted)", margin: 0, fontFamily: "monospace" }}>{value}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p style={emptyStyle}>No color tokens available yet</p>
          )}
        </div>

        {/* Typography */}
        <div style={cardStyle}>
          <h2 style={sectionHeadingStyle}>Typography</h2>
          {typography ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {(typography.headingFont || typography.fontFamily) && (
                <div>
                  <p style={{ fontSize: 11, fontWeight: 600, color: "var(--text-muted)", marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.5 }}>Heading</p>
                  <p style={{ fontSize: 22, fontWeight: 700, margin: 0, fontFamily: typography.headingFont || typography.fontFamily }}>
                    {typography.headingFont || typography.fontFamily}
                  </p>
                </div>
              )}
              {(typography.bodyFont || typography.fontFamily) && (
                <div>
                  <p style={{ fontSize: 11, fontWeight: 600, color: "var(--text-muted)", marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.5 }}>Body</p>
                  <p style={{ fontSize: 15, margin: 0, fontFamily: typography.bodyFont || typography.fontFamily }}>
                    {typography.bodyFont || typography.fontFamily}
                  </p>
                </div>
              )}
              {typography.sizes && Object.keys(typography.sizes).length > 0 && (
                <div>
                  <p style={{ fontSize: 11, fontWeight: 600, color: "var(--text-muted)", marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 }}>Sizes</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {Object.entries(typography.sizes).map(([label, size]) => (
                      <span key={label} style={{
                        padding: "3px 10px", borderRadius: 50, fontSize: 11,
                        background: "var(--bg)", border: "1px solid var(--border)",
                        color: "var(--text-secondary)",
                      }}>
                        {label}: {size}{typeof size === "number" ? "px" : ""}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {typography.weights && Object.keys(typography.weights).length > 0 && (
                <div>
                  <p style={{ fontSize: 11, fontWeight: 600, color: "var(--text-muted)", marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 }}>Weights</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {Object.entries(typography.weights).map(([label, weight]) => (
                      <span key={label} style={{
                        padding: "3px 10px", borderRadius: 50, fontSize: 11,
                        background: "var(--bg)", border: "1px solid var(--border)",
                        color: "var(--text-secondary)",
                      }}>
                        {label}: {weight}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <p style={emptyStyle}>No typography tokens available yet</p>
          )}
        </div>
      </div>

      {/* Screens */}
      <div style={{ ...cardStyle, marginBottom: 24 }}>
        <h2 style={sectionHeadingStyle}>Screen Inventory</h2>
        {screens.length > 0 ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {screens.map((screen, i) => {
              const name = typeof screen === "string" ? screen : screen.name;
              const desc = typeof screen === "string" ? null : screen.description;
              return (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "10px 14px", borderRadius: 10, background: "var(--bg)" }}>
                  <span style={{
                    width: 26, height: 26, borderRadius: 8, background: "rgba(232,160,74,0.12)",
                    color: "var(--accent)", fontSize: 12, fontWeight: 700,
                    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                  }}>{i + 1}</span>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 600, margin: 0 }}>{name}</p>
                    {desc && <p style={{ fontSize: 12, color: "var(--text-muted)", margin: "2px 0 0" }}>{desc}</p>}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p style={emptyStyle}>No screens defined yet</p>
        )}
      </div>

      {/* Style + Estimate row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 24 }}>
        {/* Style Description */}
        <div style={cardStyle}>
          <h2 style={sectionHeadingStyle}>Style</h2>
          <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.6, margin: 0 }}>
            {spec?.style || "No style description available"}
          </p>
          {spec?.framework && (
            <div style={{ marginTop: 12 }}>
              <span style={{
                padding: "4px 12px", borderRadius: 50, fontSize: 11, fontWeight: 600,
                background: "rgba(232,160,74,0.1)", color: "var(--accent)",
              }}>
                {spec.framework}
              </span>
            </div>
          )}
          {job.input?.framework && (
            <div style={{ marginTop: spec?.framework ? 6 : 12 }}>
              <span style={{
                padding: "4px 12px", borderRadius: 50, fontSize: 11, fontWeight: 600,
                background: "rgba(59,130,246,0.1)", color: "#3b82f6",
              }}>
                {job.input.framework === "react-native" ? "React Native" : job.input.framework === "kmp" ? "KMP" : "Flutter"}
              </span>
            </div>
          )}
        </div>

        {/* Estimated Cost + Time */}
        <div style={cardStyle}>
          <h2 style={sectionHeadingStyle}>Estimate</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 13, color: "var(--text-muted)" }}>Tier</span>
              <span style={{
                padding: "3px 12px", borderRadius: 50, fontSize: 12, fontWeight: 700,
                textTransform: "uppercase", background: "rgba(232,160,74,0.1)", color: "var(--accent)",
              }}>{tier}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 13, color: "var(--text-muted)" }}>Est. Cost</span>
              <span style={{ fontSize: 18, fontWeight: 700 }}>{TIER_COST[tier] || "$0.40"}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 13, color: "var(--text-muted)" }}>Est. Time</span>
              <span style={{ fontSize: 14, fontWeight: 600 }}>{TIER_TIME[tier] || "~20 min"}</span>
            </div>
            {complexity?.estimated_screens && (
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 13, color: "var(--text-muted)" }}>Screens</span>
                <span style={{ fontSize: 14, fontWeight: 600 }}>~{complexity.estimated_screens}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Feedback */}
      <div style={{ ...cardStyle, marginBottom: 32 }}>
        <h2 style={sectionHeadingStyle}>Feedback</h2>
        <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 10 }}>
          Want tweaks? Describe what you'd like changed before approving.
        </p>
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder='e.g. "Make the accent color warmer" or "Use a serif heading font"'
          rows={3}
          style={{
            width: "100%", padding: "12px 14px", borderRadius: 10,
            background: "var(--bg)", border: "1px solid var(--border)",
            color: "var(--text)", fontSize: 14, resize: "vertical",
            fontFamily: "inherit", lineHeight: 1.5,
          }}
        />
      </div>

      {/* Actions */}
      <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
        <button
          onClick={handleCancel}
          disabled={cancelling}
          style={{
            padding: "14px 28px", borderRadius: 12, border: "1px solid var(--border)",
            background: "none", color: "var(--text-secondary)", fontSize: 14,
            fontWeight: 600, cursor: cancelling ? "not-allowed" : "pointer",
            opacity: cancelling ? 0.5 : 1,
          }}
        >
          {cancelling ? "Cancelling..." : "Cancel"}
        </button>
        <button
          onClick={handleApprove}
          disabled={approving || job.status !== "pending_design_review"}
          style={{
            padding: "14px 36px", borderRadius: 12, border: "none",
            background: "var(--accent)", color: "#fff", fontSize: 14,
            fontWeight: 700, cursor: approving ? "not-allowed" : "pointer",
            opacity: (approving || job.status !== "pending_design_review") ? 0.5 : 1,
          }}
        >
          {approving ? "Approving..." : "Approve & Build"}
        </button>
      </div>
    </div>
  );
}

const cardStyle: React.CSSProperties = {
  padding: 24,
  borderRadius: 14,
  background: "var(--bg-elevated)",
  border: "1px solid var(--border)",
};

const sectionHeadingStyle: React.CSSProperties = {
  fontFamily: "'Playfair Display', serif",
  fontSize: 18,
  fontWeight: 600,
  marginBottom: 16,
};

const emptyStyle: React.CSSProperties = {
  fontSize: 13,
  color: "var(--text-dim)",
  fontStyle: "italic",
};

const btnOutlineStyle: React.CSSProperties = {
  padding: "10px 24px",
  borderRadius: 10,
  border: "1px solid var(--border)",
  background: "none",
  color: "var(--text-secondary)",
  fontSize: 14,
  fontWeight: 600,
  cursor: "pointer",
};
