import React, { useState, useCallback } from "react";
import type { DesignNode } from "./canvas-design-node";

interface Props {
  screens: { name: string; root: DesignNode }[];
  selectedPath: string | null;
  hoveredPath: string | null;
  onSelect: (path: string | null) => void;
  onHover: (path: string | null) => void;
}

const ICONS: Record<string, string> = {
  frame: "[ ]",
  text: "T",
  svg: "<>",
  image: "img",
};

function NodeRow({
  node, path, depth, selectedPath, hoveredPath, onSelect, onHover, collapsed, onToggle,
}: {
  node: DesignNode;
  path: string;
  depth: number;
  selectedPath: string | null;
  hoveredPath: string | null;
  onSelect: (p: string | null) => void;
  onHover: (p: string | null) => void;
  collapsed: Set<string>;
  onToggle: (p: string) => void;
}) {
  const isSelected = selectedPath === path;
  const isHovered = hoveredPath === path;
  const hasChildren = node.children && node.children.length > 0;
  const isCollapsed = collapsed.has(path);

  const label = node.type === "text" && node.textContent
    ? node.textContent.slice(0, 24) + (node.textContent.length > 24 ? "..." : "")
    : node.name || node.type;

  return (
    <>
      <div
        onClick={(e) => { e.stopPropagation(); onSelect(isSelected ? null : path); }}
        onMouseEnter={() => onHover(path)}
        onMouseLeave={() => onHover(null)}
        style={{
          display: "flex", alignItems: "center", gap: 4,
          padding: "3px 8px 3px " + (8 + depth * 14) + "px",
          fontSize: 11, cursor: "pointer",
          background: isSelected ? "rgba(74,144,232,0.15)" : isHovered ? "rgba(255,255,255,0.04)" : "transparent",
          color: isSelected ? "#4a90e8" : "rgba(255,255,255,0.55)",
          borderLeft: isSelected ? "2px solid #4a90e8" : "2px solid transparent",
        }}
      >
        {/* Expand/collapse toggle */}
        {hasChildren ? (
          <span
            onClick={(e) => { e.stopPropagation(); onToggle(path); }}
            style={{
              width: 14, height: 14, display: "flex", alignItems: "center",
              justifyContent: "center", fontSize: 8, color: "rgba(255,255,255,0.3)",
              flexShrink: 0, cursor: "pointer",
            }}
          >
            {isCollapsed ? "▶" : "▼"}
          </span>
        ) : (
          <span style={{ width: 14, flexShrink: 0 }} />
        )}

        {/* Type icon */}
        <span style={{
          fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.25)",
          width: 20, textAlign: "center" as const, flexShrink: 0,
          fontFamily: "monospace",
        }}>
          {ICONS[node.type] || "?"}
        </span>

        {/* Label */}
        <span style={{
          overflow: "hidden", textOverflow: "ellipsis",
          whiteSpace: "nowrap", flex: 1,
        }}>
          {label}
        </span>
      </div>

      {/* Children */}
      {hasChildren && !isCollapsed && node.children!.map((child, i) => (
        <NodeRow
          key={i}
          node={child}
          path={`${path}.${i}`}
          depth={depth + 1}
          selectedPath={selectedPath}
          hoveredPath={hoveredPath}
          onSelect={onSelect}
          onHover={onHover}
          collapsed={collapsed}
          onToggle={onToggle}
        />
      ))}
    </>
  );
}

export function CanvasLayersPanel({ screens, selectedPath, hoveredPath, onSelect, onHover }: Props) {
  const [collapsed, setCollapsed] = useState<Set<string>>(() => new Set());

  const handleToggle = useCallback((path: string) => {
    setCollapsed((prev) => {
      const next = new Set(prev);
      if (next.has(path)) next.delete(path);
      else next.add(path);
      return next;
    });
  }, []);

  return (
    <div style={{
      width: 220, borderRight: "1px solid rgba(255,255,255,0.06)",
      background: "#0e0e0e", overflowY: "auto", flexShrink: 0,
    }}>
      {/* Header */}
      <div style={{
        padding: "10px 12px", borderBottom: "1px solid rgba(255,255,255,0.06)",
        fontSize: 10, fontWeight: 700, letterSpacing: 1.5,
        color: "rgba(255,255,255,0.35)", textTransform: "uppercase" as const,
      }}>
        Layers
      </div>

      {/* Screen trees */}
      {screens.map((screen, si) => {
        const prefix = `${si}:`;
        // Strip prefix for comparison
        const mySelected = selectedPath?.startsWith(prefix) ? selectedPath : null;
        const myHovered = hoveredPath?.startsWith(prefix) ? hoveredPath : null;

        return (
          <div key={si}>
            {/* Screen label */}
            <div style={{
              padding: "8px 12px 4px",
              fontSize: 10, fontWeight: 700, letterSpacing: 1,
              color: "rgba(255,255,255,0.25)",
              borderTop: si > 0 ? "1px solid rgba(255,255,255,0.06)" : undefined,
            }}>
              {screen.name}
            </div>

            <NodeRow
              node={screen.root}
              path={`${prefix}root`}
              depth={0}
              selectedPath={mySelected}
              hoveredPath={myHovered}
              onSelect={onSelect}
              onHover={onHover}
              collapsed={collapsed}
              onToggle={handleToggle}
            />
          </div>
        );
      })}
    </div>
  );
}
