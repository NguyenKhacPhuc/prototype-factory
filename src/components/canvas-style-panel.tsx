import React, { useState } from "react";

interface StylePreset {
  name: string;
  accent: string;
  bg: string;
  card: string;
  text: string;
  font: string;
  radius: number;
}

interface Props {
  colors: { primary: string; secondary: string; bg: string; text: string; accent: string };
  onColorsChange: (colors: any) => void;
  onPresetApply: (preset: StylePreset) => void;
  onBuild: () => void;
}

const PRESETS: StylePreset[] = [
  { name: "Minimal", accent: "#1a1a1a", bg: "#ffffff", card: "#f5f5f5", text: "#111", font: "Inter", radius: 4 },
  { name: "Neumorphism", accent: "#6C63FF", bg: "#e0e5ec", card: "#e0e5ec", text: "#333", font: "Inter", radius: 20 },
  { name: "Glassmorphism", accent: "#7C5CFC", bg: "#0f0f23", card: "rgba(255,255,255,0.08)", text: "#f0f0f0", font: "Inter", radius: 16 },
  { name: "Brutalism", accent: "#FF3333", bg: "#ffffff", card: "#ffffff", text: "#000", font: "Menlo", radius: 0 },
  { name: "Dark OLED", accent: "#00D4AA", bg: "#000000", card: "#111111", text: "#e0e0e0", font: "Menlo", radius: 12 },
  { name: "Vibrant", accent: "#FF5722", bg: "#FFF8E1", card: "#ffffff", text: "#1a1a1a", font: "Inter", radius: 12 },
  { name: "Aurora", accent: "#6366F1", bg: "#0f172a", card: "#1e293b", text: "#e2e8f0", font: "Inter", radius: 16 },
  { name: "Retro", accent: "#FF00FF", bg: "#0a001a", card: "#1a0033", text: "#e0e0ff", font: "Menlo", radius: 8 },
  { name: "Candy", accent: "#EC4899", bg: "#FFF0F5", card: "#ffffff", text: "#1a1a1a", font: "Inter", radius: 20 },
  { name: "Earth", accent: "#8B6914", bg: "#F5F0E8", card: "#EDE8DD", text: "#2a2a2a", font: "Georgia", radius: 12 },
  { name: "Ocean", accent: "#0891B2", bg: "#F0F9FF", card: "#ffffff", text: "#0C4A6E", font: "Inter", radius: 12 },
  { name: "Forest", accent: "#16A34A", bg: "#F0FDF4", card: "#ffffff", text: "#14532D", font: "Inter", radius: 10 },
];

const colorField = (label: string, value: string, onChange: (v: string) => void) => (
  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
    <input
      type="color"
      value={value}
      onChange={e => onChange(e.target.value)}
      style={{ width: 24, height: 24, border: "1px solid rgba(255,255,255,0.1)", borderRadius: 4, cursor: "pointer", padding: 0, background: "none" }}
    />
    <span style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", flex: 1 }}>{label}</span>
    <span style={{ fontSize: 10, fontFamily: "monospace", color: "rgba(255,255,255,0.3)" }}>{value}</span>
  </div>
);

export function CanvasStylePanel({ colors, onColorsChange, onPresetApply, onBuild }: Props) {
  const [tab, setTab] = useState<"presets" | "colors">("presets");

  return (
    <div style={{ width: 220, borderRight: "1px solid rgba(255,255,255,0.06)", display: "flex", flexDirection: "column", background: "#111" }}>
      {/* Tab switcher */}
      <div style={{ display: "flex", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        {(["presets", "colors"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              flex: 1, padding: "10px 0", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1,
              border: "none", cursor: "pointer",
              background: tab === t ? "rgba(255,255,255,0.05)" : "transparent",
              color: tab === t ? "#fff" : "rgba(255,255,255,0.3)",
              borderBottom: tab === t ? "2px solid var(--accent, #e8a04a)" : "2px solid transparent",
            }}
          >{t}</button>
        ))}
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: "auto", padding: 12 }}>
        {tab === "presets" ? (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
            {PRESETS.map(p => (
              <button
                key={p.name}
                onClick={() => onPresetApply(p)}
                style={{
                  padding: 8, borderRadius: 8, cursor: "pointer",
                  border: "1px solid rgba(255,255,255,0.08)",
                  background: "rgba(255,255,255,0.03)",
                  textAlign: "center",
                }}
              >
                <div style={{ display: "flex", justifyContent: "center", gap: 3, marginBottom: 4 }}>
                  <div style={{ width: 12, height: 12, borderRadius: 3, background: p.accent }} />
                  <div style={{ width: 12, height: 12, borderRadius: 3, background: p.bg, border: "1px solid rgba(255,255,255,0.1)" }} />
                  <div style={{ width: 12, height: 12, borderRadius: 3, background: p.text }} />
                </div>
                <span style={{ fontSize: 9, color: "rgba(255,255,255,0.5)" }}>{p.name}</span>
              </button>
            ))}
          </div>
        ) : (
          <div>
            <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: 1, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", display: "block", marginBottom: 10 }}>Custom Colors</span>
            {colorField("Primary", colors.primary, v => onColorsChange({ ...colors, primary: v }))}
            {colorField("Secondary", colors.secondary, v => onColorsChange({ ...colors, secondary: v }))}
            {colorField("Background", colors.bg, v => onColorsChange({ ...colors, bg: v }))}
            {colorField("Text", colors.text, v => onColorsChange({ ...colors, text: v }))}
            {colorField("Accent", colors.accent, v => onColorsChange({ ...colors, accent: v }))}
          </div>
        )}
      </div>

      {/* Build button */}
      <div style={{ padding: 12, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <button
          onClick={onBuild}
          style={{
            width: "100%", padding: 10, borderRadius: 8, border: "none",
            background: "var(--accent, #e8a04a)", color: "#fff", fontSize: 12, fontWeight: 700, cursor: "pointer",
          }}
        >Build App with This Style</button>
      </div>
    </div>
  );
}
