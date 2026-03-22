import React from "react";
import type { DesignNode } from "./canvas-design-node";

interface Props {
  node: DesignNode;
  path: string;
  onUpdate: (path: string, updates: Partial<DesignNode>) => void;
}

const label: React.CSSProperties = {
  fontSize: 10, fontWeight: 600, letterSpacing: 1,
  color: "rgba(255,255,255,0.35)", textTransform: "uppercase",
  marginBottom: 6, display: "block",
};

const row: React.CSSProperties = {
  display: "flex", gap: 6, marginBottom: 8,
};

const inputStyle: React.CSSProperties = {
  flex: 1, padding: "6px 8px", borderRadius: 6,
  border: "1px solid rgba(255,255,255,0.1)",
  background: "rgba(255,255,255,0.04)", color: "#f0f0f0",
  fontSize: 12, fontFamily: "inherit", outline: "none",
  boxSizing: "border-box", width: "100%",
};

const colorInput: React.CSSProperties = {
  width: 28, height: 28, padding: 0, border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: 6, cursor: "pointer", background: "none",
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ padding: "12px 16px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
      <span style={label}>{title}</span>
      {children}
    </div>
  );
}

function NumField({ value, onChange, suffix }: { value: number; onChange: (v: number) => void; suffix?: string }) {
  return (
    <div style={{ flex: 1, position: "relative" }}>
      <input
        type="number"
        value={Math.round(value)}
        onChange={(e) => onChange(Number(e.target.value))}
        style={inputStyle}
      />
      {suffix && <span style={{ position: "absolute", right: 8, top: 7, fontSize: 10, color: "rgba(255,255,255,0.25)" }}>{suffix}</span>}
    </div>
  );
}

export function CanvasInspector({ node, path, onUpdate }: Props) {
  const s = node.styles;
  const ts = node.textStyles || {};

  const updateStyle = (key: string, value: unknown) => {
    onUpdate(path, { styles: { ...node.styles, [key]: value } });
  };

  const updateTextStyle = (key: string, value: unknown) => {
    onUpdate(path, { textStyles: { ...node.textStyles, [key]: value } } as any);
  };

  return (
    <div style={{
      width: 240, borderLeft: "1px solid rgba(255,255,255,0.06)",
      background: "#0e0e0e", overflowY: "auto", flexShrink: 0,
    }}>
      {/* Header */}
      <div style={{
        padding: "12px 16px", borderBottom: "1px solid rgba(255,255,255,0.06)",
        display: "flex", alignItems: "center", gap: 8,
      }}>
        <div style={{
          fontSize: 10, fontWeight: 700, padding: "2px 6px", borderRadius: 4,
          background: node.type === "text" ? "rgba(232,160,74,0.15)" : "rgba(74,144,232,0.15)",
          color: node.type === "text" ? "#e8a04a" : "#4a90e8",
          textTransform: "uppercase", letterSpacing: 1,
        }}>{node.type}</div>
        <span style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", fontWeight: 500 }}>
          {node.name}
        </span>
      </div>

      {/* Layout */}
      <Section title="Layout">
        <div style={row}>
          <div style={{ flex: 1 }}>
            <span style={{ fontSize: 9, color: "rgba(255,255,255,0.25)" }}>X</span>
            <NumField value={node.x} onChange={(v) => onUpdate(path, { x: v })} />
          </div>
          <div style={{ flex: 1 }}>
            <span style={{ fontSize: 9, color: "rgba(255,255,255,0.25)" }}>Y</span>
            <NumField value={node.y} onChange={(v) => onUpdate(path, { y: v })} />
          </div>
        </div>
        <div style={row}>
          <div style={{ flex: 1 }}>
            <span style={{ fontSize: 9, color: "rgba(255,255,255,0.25)" }}>W</span>
            <NumField value={node.width} onChange={(v) => onUpdate(path, { width: v })} />
          </div>
          <div style={{ flex: 1 }}>
            <span style={{ fontSize: 9, color: "rgba(255,255,255,0.25)" }}>H</span>
            <NumField value={node.height} onChange={(v) => onUpdate(path, { height: v })} />
          </div>
        </div>
      </Section>

      {/* Fill */}
      {s.backgroundColor && (
        <Section title="Fill">
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <input
              type="color"
              value={toHex(s.backgroundColor as string)}
              onChange={(e) => updateStyle("backgroundColor", e.target.value)}
              style={colorInput}
            />
            <input
              type="text"
              value={s.backgroundColor as string}
              onChange={(e) => updateStyle("backgroundColor", e.target.value)}
              style={{ ...inputStyle, flex: 1 }}
            />
          </div>
        </Section>
      )}

      {/* Border */}
      {(s.borderWidth || s.borderRadius) && (
        <Section title="Border">
          {s.borderRadius != null && (
            <div style={{ ...row, alignItems: "center" }}>
              <span style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", width: 50 }}>Radius</span>
              <NumField value={Number(s.borderRadius) || 0} onChange={(v) => updateStyle("borderRadius", v)} suffix="px" />
            </div>
          )}
          {s.borderWidth != null && (
            <div style={{ ...row, alignItems: "center" }}>
              <span style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", width: 50 }}>Width</span>
              <NumField value={Number(s.borderWidth) || 0} onChange={(v) => updateStyle("borderWidth", v)} suffix="px" />
            </div>
          )}
          {s.borderColor && (
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4 }}>
              <input
                type="color"
                value={toHex(s.borderColor as string)}
                onChange={(e) => updateStyle("borderColor", e.target.value)}
                style={colorInput}
              />
              <input
                type="text"
                value={s.borderColor as string}
                onChange={(e) => updateStyle("borderColor", e.target.value)}
                style={{ ...inputStyle, flex: 1 }}
              />
            </div>
          )}
        </Section>
      )}

      {/* Typography (text nodes only) */}
      {node.type === "text" && (
        <Section title="Typography">
          <div style={{ marginBottom: 8 }}>
            <textarea
              value={node.textContent || ""}
              onChange={(e) => onUpdate(path, { textContent: e.target.value })}
              rows={2}
              style={{ ...inputStyle, resize: "vertical", fontFamily: "inherit" }}
            />
          </div>
          <div style={row}>
            <div style={{ flex: 1 }}>
              <span style={{ fontSize: 9, color: "rgba(255,255,255,0.25)" }}>Size</span>
              <NumField value={ts.fontSize || 14} onChange={(v) => updateTextStyle("fontSize", v)} suffix="px" />
            </div>
            <div style={{ flex: 1 }}>
              <span style={{ fontSize: 9, color: "rgba(255,255,255,0.25)" }}>Weight</span>
              <NumField value={ts.fontWeight || 400} onChange={(v) => updateTextStyle("fontWeight", v)} />
            </div>
          </div>
          {ts.color && (
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <input
                type="color"
                value={toHex(ts.color)}
                onChange={(e) => updateTextStyle("color", e.target.value)}
                style={colorInput}
              />
              <input
                type="text"
                value={ts.color}
                onChange={(e) => updateTextStyle("color", e.target.value)}
                style={{ ...inputStyle, flex: 1 }}
              />
            </div>
          )}
          {ts.fontFamily && (
            <div style={{ marginTop: 8 }}>
              <span style={{ fontSize: 9, color: "rgba(255,255,255,0.25)" }}>Font</span>
              <input
                type="text"
                value={ts.fontFamily}
                onChange={(e) => updateTextStyle("fontFamily", e.target.value)}
                style={inputStyle}
              />
            </div>
          )}
        </Section>
      )}

      {/* Spacing */}
      {(s.paddingTop || s.paddingRight || s.paddingBottom || s.paddingLeft) && (
        <Section title="Padding">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4 }}>
            {(["Top", "Right", "Bottom", "Left"] as const).map((side) => {
              const key = `padding${side}`;
              const val = Number(s[key]) || 0;
              return (
                <div key={side}>
                  <span style={{ fontSize: 9, color: "rgba(255,255,255,0.25)" }}>{side[0]}</span>
                  <NumField value={val} onChange={(v) => updateStyle(key, v)} suffix="px" />
                </div>
              );
            })}
          </div>
        </Section>
      )}
    </div>
  );
}

// Convert rgb/rgba/named colors to hex for color input
function toHex(color: string): string {
  if (color.startsWith("#")) return color.slice(0, 7);
  const m = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (m) {
    const [, r, g, b] = m;
    return "#" + [r, g, b].map((c) => Number(c).toString(16).padStart(2, "0")).join("");
  }
  return "#000000";
}
