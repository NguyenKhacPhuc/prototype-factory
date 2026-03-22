import React from "react";

interface Transform {
  x: number;
  y: number;
  scale: number;
}

interface Props {
  transform: Transform;
  onTransformChange: (t: Transform) => void;
  canvasWidth: number;
  canvasHeight: number;
  contentWidth: number;
  contentHeight: number;
}

export function ZoomControls({ transform, onTransformChange, canvasWidth, canvasHeight, contentWidth, contentHeight }: Props) {
  const zoomTo = (newScale: number) => {
    const cx = canvasWidth / 2;
    const cy = canvasHeight / 2;
    const ratio = newScale / transform.scale;
    onTransformChange({
      scale: newScale,
      x: cx - (cx - transform.x) * ratio,
      y: cy - (cy - transform.y) * ratio,
    });
  };

  const fitToScreen = () => {
    if (contentWidth === 0 || contentHeight === 0) return;
    const padding = 80;
    const scaleX = (canvasWidth - padding * 2) / contentWidth;
    const scaleY = (canvasHeight - padding * 2) / contentHeight;
    const scale = Math.min(scaleX, scaleY, 1);
    onTransformChange({
      scale,
      x: (canvasWidth - contentWidth * scale) / 2,
      y: (canvasHeight - contentHeight * scale) / 2,
    });
  };

  const pct = Math.round(transform.scale * 100);

  const btn = (label: string, onClick: () => void, title: string): React.ReactElement => (
    <button onClick={onClick} title={title} style={{
      width: 32, height: 32, borderRadius: 6, border: "none",
      background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.6)",
      fontSize: 14, cursor: "pointer", display: "flex",
      alignItems: "center", justifyContent: "center", fontWeight: 600,
    }}>{label}</button>
  );

  return (
    <div style={{
      position: "absolute", bottom: 16, right: 16,
      display: "flex", alignItems: "center", gap: 4,
      background: "#111", border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: 8, padding: 4, zIndex: 10,
    }}>
      {btn("-", () => zoomTo(Math.max(0.1, transform.scale / 1.25)), "Zoom out")}
      <span style={{
        fontSize: 11, color: "rgba(255,255,255,0.5)", fontWeight: 600,
        minWidth: 40, textAlign: "center" as const,
      }}>{pct}%</span>
      {btn("+", () => zoomTo(Math.min(3, transform.scale * 1.25)), "Zoom in")}
      <div style={{ width: 1, height: 20, background: "rgba(255,255,255,0.08)", margin: "0 2px" }} />
      {btn("\u2922", fitToScreen, "Fit to screen")}
    </div>
  );
}
