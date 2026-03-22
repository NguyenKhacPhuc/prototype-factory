import React, { useState } from "react";
import { supabase } from "../lib/supabase";

interface Props {
  onClose: () => void;
}

export function ComingSoonModal({ onClose }: Props) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || saving) return;
    setSaving(true);
    setError("");
    try {
      const { error: dbError } = await supabase
        .from("waitlist_emails")
        .insert({ email: email.trim().toLowerCase() });
      if (dbError) {
        if (dbError.code === "23505") {
          // Duplicate — still count as success
          setSubmitted(true);
        } else {
          setError("Something went wrong. Please try again.");
        }
      } else {
        setSubmitted(true);
      }
    } catch {
      setError("Something went wrong. Please try again.");
    }
    setSaving(false);
  };

  return (
    <div
      onClick={() => !submitted && onClose()}
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "rgba(0,0,0,0.8)", backdropFilter: "blur(12px)",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative", display: "flex",
          background: "#111", border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 16, maxWidth: 820, width: "92%",
          overflow: "hidden",
          animation: "csSlideUp 0.4s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute", top: 16, right: 20, background: "none",
            border: "none", color: "rgba(255,255,255,0.3)", fontSize: 28,
            cursor: "pointer", lineHeight: 1, zIndex: 2,
          }}
        >
          &times;
        </button>

        {/* Left */}
        <div style={{ flex: 1, padding: "48px 40px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase" as const, color: "rgba(255,255,255,0.4)", marginBottom: 20, display: "block" }}>
            PHASE 01: IGNITION
          </span>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 42, fontWeight: 900, lineHeight: 1.05, letterSpacing: -1, color: "#f5f0e8", margin: "0 0 24px" }}>
            SOMETHING<br />BIG<br />
            <span style={{ color: "#e8e4a0" }}>IS<br />CHARGING<br />UP</span>
          </h2>
          <p style={{ fontSize: 14, lineHeight: 1.7, color: "rgba(255,255,255,0.45)", maxWidth: 320, marginBottom: 28 }}>
            We are engineering the future of AI-powered prototyping.
            A new experience built for creators. Prototype Factory AI arrives soon.
          </p>
          <div style={{ display: "flex", gap: 10 }}>
            {[{ label: "STATUS", value: "SYSTEM STABLE" }, { label: "TARGET", value: "Q3 2026" }].map((b) => (
              <div key={b.label} style={{ background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 6, padding: "10px 16px", display: "flex", flexDirection: "column", gap: 2 }}>
                <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: 2, color: "rgba(255,255,255,0.35)" }}>{b.label}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#f5f0e8" }}>{b.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right */}
        <div style={{ width: 340, flexShrink: 0, padding: "40px 32px", display: "flex", alignItems: "center" }}>
          <div style={{ width: "100%", background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: "32px 28px" }}>
            {!submitted ? (
              <>
                <h3 style={{ fontSize: 18, fontWeight: 800, letterSpacing: 1, color: "#f5f0e8", margin: "0 0 8px" }}>SECURE ACCESS</h3>
                <p style={{ fontSize: 13, lineHeight: 1.6, color: "rgba(255,255,255,0.5)", marginBottom: 24 }}>
                  Join the waitlist to receive updates and early access keys.
                </p>
                <form onSubmit={handleSubmit}>
                  <label style={{ display: "block", fontSize: 9, fontWeight: 700, letterSpacing: 2, color: "rgba(255,255,255,0.35)", marginBottom: 8 }}>EMAIL PROTOCOL</label>
                  <input
                    type="email"
                    placeholder="USER@DOMAIN.COM"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoFocus
                    style={{
                      width: "100%", padding: "14px 16px", borderRadius: 8,
                      border: "1px solid rgba(255,255,255,0.1)", background: "#111",
                      color: "rgba(255,255,255,0.5)", fontSize: 13, fontFamily: "inherit",
                      letterSpacing: 1, outline: "none", marginBottom: 16, boxSizing: "border-box" as const,
                    }}
                  />
                  <button type="submit" disabled={saving} style={{
                    width: "100%", padding: 14, borderRadius: 8, border: "none",
                    background: saving ? "#a0a090" : "#e8e4a0", color: "#111", fontSize: 13, fontWeight: 800,
                    letterSpacing: 2, cursor: saving ? "wait" : "pointer",
                  }}>{saving ? "SAVING..." : "NOTIFY ME"}</button>
                  {error && <p style={{ fontSize: 11, color: "#e85050", marginTop: 10, textAlign: "center" as const }}>{error}</p>}
                </form>
                <div style={{ textAlign: "center" as const, marginTop: 24, paddingTop: 20, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                  <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: 2, color: "rgba(255,255,255,0.25)" }}>DIRECT LINK ESTABLISHED</span>
                </div>
              </>
            ) : (
              <>
                <div style={{ color: "#e8e4a0", marginBottom: 16 }}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 800, letterSpacing: 1, color: "#f5f0e8", margin: "0 0 8px" }}>ACCESS GRANTED</h3>
                <p style={{ fontSize: 13, lineHeight: 1.6, color: "rgba(255,255,255,0.5)", marginBottom: 24 }}>
                  We'll notify <strong style={{ color: "#e8e4a0" }}>{email}</strong> when AI generation goes live.
                </p>
                <button onClick={onClose} style={{
                  width: "100%", padding: 14, borderRadius: 8, border: "none",
                  background: "#e8e4a0", color: "#111", fontSize: 13, fontWeight: 800,
                  letterSpacing: 2, cursor: "pointer",
                }}>GOT IT</button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
