import React, { useState, useEffect, useRef, useCallback } from "react";
import { CanvasViewport } from "../components/canvas-viewport";
import { ZoomControls } from "../components/canvas-zoom-controls";
import { CanvasFrame } from "../components/canvas-frame";
import { CanvasInspector } from "../components/canvas-inspector";
import { CanvasLayersPanel } from "../components/canvas-layers-panel";
import { getNodeByPath, type DesignNode } from "../components/canvas-design-node";
import { CanvasStylePanel } from "../components/canvas-style-panel";

interface Props {
  navigate: (to: string) => void;
}

interface DesignTree {
  appName: string;
  viewport: { width: number; height: number };
  fonts?: string[];
  root: DesignNode;
  screens?: { name: string; root: DesignNode }[];
}

const SCREEN_GAP = 60;

// Deep-clone and update a node at a given path
function updateNodeAtPath(root: DesignNode, path: string, updates: Partial<DesignNode>): DesignNode {
  const clone = JSON.parse(JSON.stringify(root));
  const parts = path.split(".");
  let current = clone;

  for (let i = 1; i < parts.length; i++) {
    const idx = parseInt(parts[i]);
    if (!current.children?.[idx]) return clone;
    current = current.children[idx];
  }

  // Merge updates
  Object.assign(current, {
    ...updates,
    styles: updates.styles ? { ...current.styles, ...updates.styles } : current.styles,
    textStyles: updates.textStyles ? { ...current.textStyles, ...updates.textStyles } : current.textStyles,
  });

  return clone;
}

export function Canvas({ navigate }: Props) {
  const [prompt, setPrompt] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [transform, setTransform] = useState({ x: 0, y: 0, scale: 0.65 });
  const [designTree, setDesignTree] = useState<DesignTree | null>(null);
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);
  const [canvasSize, setCanvasSize] = useState({ w: 800, h: 600 });
  const [showStylePanel, setShowStylePanel] = useState(true);
  const [customColors, setCustomColors] = useState({ primary: '#2979FF', secondary: '#FF5252', bg: '#FAFAFA', text: '#111', accent: '#EC4899' });
  const protoFolder = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '').get('proto') || '';
  const [screenPositions, setScreenPositions] = useState<{ x: number; y: number }[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const hasCentered = useRef(false);

  // Inject CSS color overrides into the prototype iframe
  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe || !protoFolder) return;

    const inject = () => {
      try {
        const doc = iframe.contentDocument || iframe.contentWindow?.document;
        if (!doc) return;

        let style = doc.getElementById('canvas-color-override');
        if (!style) {
          style = doc.createElement('style');
          style.id = 'canvas-color-override';
          doc.head.appendChild(style);
        }
        // Override CSS custom properties and common color patterns
        style.textContent = `
          :root {
            --primary: ${customColors.primary} !important;
            --accent: ${customColors.accent} !important;
            --bg: ${customColors.bg} !important;
            --text: ${customColors.text} !important;
          }
        `;
      } catch {}
    };

    iframe.addEventListener('load', inject);
    inject(); // try immediately too
    return () => iframe.removeEventListener('load', inject);
  }, [customColors, protoFolder]);

  // Fetch design tree
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const folder = params.get("proto");
    if (folder) {
      fetch(`/api/design-tree/${folder}`)
        .then((r) => r.ok ? r.json() : null)
        .then((tree) => tree ? setDesignTree(tree) : setShowModal(true))
        .catch(() => setShowModal(true));
    } else {
      setShowModal(true);
    }
  }, []);

  const screens = designTree
    ? (designTree.screens?.length
        ? designTree.screens
        : [{ name: designTree.appName || "Main", root: designTree.root }])
    : [];

  const vp = designTree?.viewport || { width: 375, height: 812 };

  // Initialize screen positions when screens change
  useEffect(() => {
    if (screens.length > 0 && screenPositions.length !== screens.length) {
      setScreenPositions(screens.map((_, i) => ({
        x: i * (vp.width + SCREEN_GAP),
        y: 0,
      })));
    }
  }, [screens.length, vp.width]);

  const totalW = screenPositions.length > 0
    ? Math.max(...screenPositions.map((p) => p.x + vp.width)) - Math.min(...screenPositions.map((p) => p.x))
    : screens.length * vp.width + (screens.length - 1) * SCREEN_GAP;

  // Track container size
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setCanvasSize({ w: e.contentRect.width, h: e.contentRect.height }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Center on load
  useEffect(() => {
    if (!designTree || canvasSize.w === 0 || hasCentered.current) return;
    hasCentered.current = true;
    const pad = 80;
    const sx = (canvasSize.w - pad * 2) / totalW;
    const sy = (canvasSize.h - pad * 2) / (vp.height + 40);
    const scale = Math.min(sx, sy, 0.85);
    setTransform({
      scale,
      x: (canvasSize.w - totalW * scale) / 2,
      y: (canvasSize.h - (vp.height + 40) * scale) / 2 + 20,
    });
  }, [designTree, canvasSize.w, canvasSize.h, totalW, vp.height]);

  // Get selected node — path is "screenIdx:root.0.1.2"
  const selectedNode = (() => {
    if (!selectedPath || screens.length === 0) return null;
    const colonIdx = selectedPath.indexOf(":");
    const screenIdx = colonIdx >= 0 ? parseInt(selectedPath.slice(0, colonIdx)) : 0;
    const nodePath = colonIdx >= 0 ? selectedPath.slice(colonIdx + 1) : selectedPath;
    const screen = screens[screenIdx];
    if (!screen) return null;
    return getNodeByPath(screen.root, nodePath);
  })();

  // Handle node property updates
  const handleNodeUpdate = useCallback((fullPath: string, updates: Partial<DesignNode>) => {
    if (!designTree) return;
    const colonIdx = fullPath.indexOf(":");
    const screenIdx = colonIdx >= 0 ? parseInt(fullPath.slice(0, colonIdx)) : 0;
    const nodePath = colonIdx >= 0 ? fullPath.slice(colonIdx + 1) : fullPath;
    const newTree = { ...designTree };
    if (newTree.screens?.length) {
      newTree.screens = newTree.screens.map((s, i) =>
        i === screenIdx ? { ...s, root: updateNodeAtPath(s.root, nodePath, updates) } : s
      );
    } else {
      newTree.root = updateNodeAtPath(newTree.root, nodePath, updates);
    }
    setDesignTree(newTree);
  }, [designTree]);

  // Handle screen frame move (dragging root)
  const handleScreenMove = useCallback((screenIdx: number, dx: number, dy: number) => {
    setScreenPositions((prev) => prev.map((p, i) =>
      i === screenIdx ? { x: p.x + dx, y: p.y + dy } : p
    ));
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    setShowModal(true);
  }, [prompt]);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", width: "100vw", position: "fixed", inset: 0, background: "#0a0a0a", overflow: "hidden", zIndex: 50 }}>
      {/* Modal removed — generation is live */}

      {/* Top Bar */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 20px", height: 52, borderBottom: "1px solid rgba(255,255,255,0.06)",
        background: "#0e0e0e", flexShrink: 0,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button onClick={() => navigate("/create")} style={{
            background: "none", border: "none", color: "rgba(255,255,255,0.5)",
            cursor: "pointer", display: "flex", alignItems: "center",
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>
          <span style={{ fontSize: 14, fontWeight: 600, color: "#f0f0f0" }}>
            {designTree?.appName || "New Project"}
          </span>
          {screens.length > 0 && (
            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", fontWeight: 500 }}>
              {screens.length} screen{screens.length > 1 ? "s" : ""}
            </span>
          )}
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={() => setShowStylePanel(s => !s)} style={{
            padding: "7px 16px", borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer",
            background: showStylePanel ? "rgba(232,160,74,0.15)" : "transparent",
            border: showStylePanel ? "1px solid rgba(232,160,74,0.3)" : "1px solid rgba(255,255,255,0.08)",
            color: showStylePanel ? "#e8a04a" : "rgba(255,255,255,0.7)",
          }}>Styles</button>
          {["Preview", "Export", "Share"].map((l) => (
            <button key={l} onClick={() => setShowModal(true)} style={{
              padding: "7px 16px", borderRadius: 8, fontSize: 12, fontWeight: 600,
              cursor: "pointer", letterSpacing: 0.5,
              background: l === "Export" ? "rgba(232,160,74,0.15)" : "transparent",
              border: l === "Export" ? "1px solid rgba(232,160,74,0.3)" : "1px solid rgba(255,255,255,0.08)",
              color: l === "Export" ? "#e8a04a" : "rgba(255,255,255,0.7)",
            }}>{l}</button>
          ))}
        </div>
      </div>

      {/* Main area: style panel + layers + canvas + inspector */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* Style Panel */}
        {showStylePanel && (
          <CanvasStylePanel
            colors={customColors}
            onColorsChange={setCustomColors}
            onPresetApply={(preset) => setCustomColors({ primary: preset.accent, secondary: preset.accent, bg: preset.bg, text: preset.text, accent: preset.accent })}
            onBuild={() => {
              sessionStorage.setItem('selected_style', JSON.stringify({
                name: 'Custom',
                colors: customColors,
                font: '-apple-system, sans-serif',
              }));
              navigate(`/create`);
            }}
          />
        )}

        {/* Layers Panel */}
        {screens.length > 0 && (
          <CanvasLayersPanel
            screens={screens}
            selectedPath={selectedPath}
            hoveredPath={hoveredPath}
            onSelect={setSelectedPath}
            onHover={setHoveredPath}
          />
        )}

        {/* Center: Live Preview + Canvas */}
        <div ref={containerRef} style={{ flex: 1, position: "relative", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", background: "#080808" }}>
          {protoFolder ? (
            /* Live prototype iframe with CSS color injection */
            <div style={{ position: "relative" }}>
              <div style={{
                width: 375, height: 812, borderRadius: 44, overflow: "hidden",
                border: "8px solid #2a2a2a",
                boxShadow: "0 40px 80px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(255,255,255,0.05)",
                background: "#000",
              }}>
                <iframe
                  ref={iframeRef}
                  src={`/prototypes/${protoFolder}/preview.html`}
                  sandbox="allow-scripts allow-same-origin"
                  title={designTree?.appName || "Preview"}
                  style={{ width: "100%", height: "100%", border: "none" }}
                />
              </div>
              <div style={{
                position: "absolute", top: -36, left: "50%", transform: "translateX(-50%)",
                padding: "4px 16px", borderRadius: 50, fontSize: 12, fontWeight: 600,
                background: "rgba(232,160,74,0.15)", color: "#e8a04a", border: "1px solid rgba(232,160,74,0.3)",
                whiteSpace: "nowrap",
              }}>{designTree?.appName || protoFolder}</div>
            </div>
          ) : (
            /* No prototype — show design tree canvas */
            <>
              <CanvasViewport transform={transform} onTransformChange={setTransform}>
                {screens.map((screen, i) => (
                  <CanvasFrame
                    key={i}
                    screenIndex={i}
                    screen={screen}
                    viewport={vp}
                    fonts={designTree?.fonts}
                    appName={designTree?.appName || ""}
                    x={screenPositions[i]?.x ?? i * (vp.width + SCREEN_GAP)}
                    y={screenPositions[i]?.y ?? 0}
                    selectedPath={selectedPath}
                    hoveredPath={hoveredPath}
                    onHover={setHoveredPath}
                    onSelect={setSelectedPath}
                    onNodeUpdate={handleNodeUpdate}
                    onScreenMove={handleScreenMove}
                  />
                ))}
                {!designTree && (
                  <div style={{
                    position: "absolute", left: "50%", top: "50%",
                    transform: "translate(-50%, -50%)",
                    textAlign: "center" as const, color: "rgba(255,255,255,0.2)",
                  }}>
                    <div style={{ fontSize: 48, marginBottom: 12 }}>+</div>
                    <div style={{ fontSize: 14 }}>Generate a prototype to get started</div>
                  </div>
                )}
              </CanvasViewport>
              <ZoomControls
                transform={transform}
                onTransformChange={setTransform}
                canvasWidth={canvasSize.w}
                canvasHeight={canvasSize.h}
                contentWidth={totalW}
                contentHeight={vp.height + 40}
              />
            </>
          )}
        </div>

        {/* Inspector Panel */}
        {selectedNode && selectedPath && (
          <CanvasInspector
            node={selectedNode.node}
            path={selectedPath}
            onUpdate={handleNodeUpdate}
          />
        )}
      </div>

      {/* Bottom Prompt Bar */}
      <div style={{
        borderTop: "1px solid rgba(255,255,255,0.06)",
        background: "#0e0e0e", padding: "12px 20px",
        display: "flex", alignItems: "center", gap: 12, flexShrink: 0,
      }}>
        <form onSubmit={handleSubmit} style={{ flex: 1, display: "flex" }}>
          <input
            type="text"
            placeholder="What would you like to change or create?"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            style={{
              flex: 1, padding: "10px 16px", borderRadius: 10,
              border: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(255,255,255,0.03)", color: "#f0f0f0",
              fontSize: 14, fontFamily: "inherit", outline: "none",
              boxSizing: "border-box" as const,
            }}
          />
        </form>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 20, height: 20, borderRadius: "50%", background: "#e8a04a" }} />
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", fontWeight: 500 }}>AI Engine</span>
        </div>
      </div>
    </div>
  );
}
