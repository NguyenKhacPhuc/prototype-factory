import React, { useState } from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "../hooks/use-auth";

interface Props {
  navigate: (to: string) => void;
}

const EXAMPLES = [
  "A meditation app for nurses on night shifts with calming visuals",
  "A recipe platform where you unlock dishes by cooking streaks",
  "A habit tracker with loss aversion — your streak character gets weaker if you miss",
  "An AI code review app for freelance developers",
  "A plant parent app that diagnoses sick plants from photos",
  "A neighborhood micro-task exchange for busy parents",
];

export function Create({ navigate }: Props) {
  const { user } = useAuth();
  const [prompt, setPrompt] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim() || submitting) return;

    // Auth gate
    if (!user) {
      // Save prompt to sessionStorage so it survives the auth redirect
      sessionStorage.setItem("create_prompt", prompt);
      navigate("/profile");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      // Check active job count
      const { count } = await supabase
        .from("generation_jobs")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.id)
        .in("status", ["pending", "running"]);

      if ((count ?? 0) >= 3) {
        setError("You have 3 active jobs. Please wait for one to finish.");
        setSubmitting(false);
        return;
      }

      // Create job
      const { data: job, error: insertError } = await supabase
        .from("generation_jobs")
        .insert({
          user_id: user.id,
          type: "prototype",
          source: "user",
          input: { prompt: prompt.trim() },
        })
        .select()
        .single();

      if (insertError) throw insertError;

      navigate(`/design/${job.id}`);
    } catch (err: any) {
      setError(err.message || "Failed to start generation. Please try again.");
    }
    setSubmitting(false);
  };

  // Restore prompt after auth redirect
  React.useEffect(() => {
    const saved = sessionStorage.getItem("create_prompt");
    if (saved && user) {
      setPrompt(saved);
      sessionStorage.removeItem("create_prompt");
    }
  }, [user]);

  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "60px 32px 100px" }}>
      <div style={{ textAlign: "center" as const, marginBottom: 40 }}>
        <span style={{
          display: "inline-block", fontSize: 11, fontWeight: 700,
          textTransform: "uppercase" as const, letterSpacing: 1.5,
          padding: "4px 14px", borderRadius: 50,
          background: "rgba(232,160,74,0.12)", color: "var(--accent)",
          border: "1px solid rgba(232,160,74,0.25)", marginBottom: 16,
        }}>Beta</span>
        <h1 style={{
          fontFamily: "'Playfair Display',serif", fontSize: 48,
          fontWeight: 600, lineHeight: 1.15, letterSpacing: -1,
        }}>
          Describe your app,<br />
          <span style={{ color: "var(--accent)" }}>AI builds it.</span>
        </h1>
        <p style={{
          fontSize: 16, color: "var(--text-secondary)", lineHeight: 1.7,
          marginTop: 16, maxWidth: 480, marginLeft: "auto", marginRight: "auto",
        }}>
          Type a description of your app idea and our AI will generate
          a full interactive prototype with design system and screens.
        </p>
      </div>

      <div style={{
        background: "var(--bg-elevated)", border: "1px solid var(--border-hover)",
        borderRadius: 16, overflow: "hidden",
      }}>
        <textarea
          placeholder="Describe your app idea in a few sentences..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value.slice(0, 500))}
          rows={4}
          style={{
            width: "100%", padding: 20, background: "none", border: "none",
            outline: "none", color: "var(--text)", fontSize: 15,
            fontFamily: "inherit", lineHeight: 1.6, resize: "none",
            boxSizing: "border-box" as const,
          }}
        />
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "12px 16px", borderTop: "1px solid var(--border)",
        }}>
          <span style={{ fontSize: 12, color: "var(--text-dim)" }}>{prompt.length}/500</span>
          <button
            onClick={handleGenerate}
            disabled={!prompt.trim() || submitting}
            style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: "10px 22px", borderRadius: 10,
              background: "var(--accent)", border: "none",
              color: "#fff", fontSize: 14, fontWeight: 600,
              cursor: prompt.trim() && !submitting ? "pointer" : "not-allowed",
              opacity: prompt.trim() && !submitting ? 1 : 0.4,
            }}
          >
            {submitting ? (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" style={{ animation: "spin 1s linear infinite" }}>
                  <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.3" />
                  <path d="M12 2a10 10 0 019.75 7.75" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                Starting...
              </>
            ) : (
              <>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Generate Prototype
              </>
            )}
          </button>
        </div>
      </div>

      {error && (
        <div style={{
          marginTop: 12, padding: "10px 16px", borderRadius: 10,
          background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)",
          color: "#ef4444", fontSize: 13,
        }}>{error}</div>
      )}

      <div style={{ marginTop: 28 }}>
        <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 10 }}>Try an example:</p>
        <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 8 }}>
          {EXAMPLES.map((ex, i) => (
            <button key={i} onClick={() => setPrompt(ex)} style={{
              padding: "8px 16px", borderRadius: 50, fontSize: 13,
              background: "var(--bg-elevated)", border: "1px solid var(--border)",
              color: "var(--text-secondary)", cursor: "pointer",
            }}>{ex}</button>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", gap: 20, marginTop: 60 }}>
        {[
          { num: "1", title: "Describe", desc: "Tell us your app idea in natural language" },
          { num: "2", title: "Generate", desc: "AI creates a full prototype with design system" },
          { num: "3", title: "Preview", desc: "Interact with your prototype in the browser" },
        ].map((step) => (
          <div key={step.num} style={{
            flex: 1, display: "flex", gap: 14, padding: 20,
            background: "var(--bg-elevated)", borderRadius: 14,
            border: "1px solid var(--border)",
          }}>
            <span style={{
              flexShrink: 0, width: 32, height: 32, borderRadius: "50%",
              background: "var(--accent)", color: "#fff", fontSize: 14, fontWeight: 700,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>{step.num}</span>
            <div>
              <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>{step.title}</h3>
              <p style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.5 }}>{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
