import React, { useCallback, useMemo, useRef, useState, useEffect } from "react";
import { designTreeToSvg } from "../lib/design-tree-to-svg";
import { hitTest, getNodeByPath, type DesignNode } from "./canvas-design-node";

interface ScreenData {
  name: string;
  root: DesignNode;
}

interface Props {
  screen: ScreenData;
  viewport: { width: number; height: number };
  fonts?: string[];
  appName: string;
  x: number;
  y: number;
  selectedPath: string | null;
  screenIndex: number;
  hoveredPath: string | null;
  onHover: (path: string | null) => void;
  onSelect: (path: string | null) => void;
  onNodeUpdate: (fullPath: string, updates: Partial<DesignNode>) => void;
  onScreenMove: (screenIdx: number, dx: number, dy: number) => void;
}

export function CanvasFrame({ screen, viewport, fonts, appName, x, y, screenIndex, selectedPath, hoveredPath, onHover, onSelect, onNodeUpdate, onScreenMove }: Props) {
  const w = viewport.width;
  const h = viewport.height;
  const frameRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef({ cx: 0, cy: 0, nodeX: 0, nodeY: 0, path: "", isRoot: false });

  const svgHtml = useMemo(() => {
    return designTreeToSvg({
      appName,
      viewport,
      fonts: fonts || [],
      root: screen.root,
      screens: [],
    });
  }, [screen, viewport, fonts, appName]);

  const clientToDesign = useCallback((clientX: number, clientY: number) => {
    const el = frameRef.current;
    if (!el) return null;
    const rect = el.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return null;
    return {
      x: (clientX - rect.left) * (w / rect.width),
      y: (clientY - rect.top) * (h / rect.height),
      scaleX: w / rect.width,
      scaleY: h / rect.height,
    };
  }, [w, h]);

  const prefix = `${screenIndex}:`;
  const mySelectedPath = selectedPath?.startsWith(prefix) ? selectedPath.slice(prefix.length) : null;

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (dragging) return;
    const pt = clientToDesign(e.clientX, e.clientY);
    if (!pt) return;
    const hit = hitTest(screen.root, pt.x, pt.y);
    onHover(hit ? `${prefix}${hit.path}` : null);
  }, [screen.root, clientToDesign, onHover, prefix, dragging]);

  // Check if point is inside a node at a known path
  const isPointInNode = useCallback((px: number, py: number, path: string) => {
    const found = getNodeByPath(screen.root, path);
    if (!found) return false;
    const { node, absX, absY } = found;
    return px >= absX && py >= absY && px <= absX + node.width && py <= absY + node.height;
  }, [screen.root]);

  // Mousedown: if on selected element, start drag; otherwise select
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button !== 0) return;
    const pt = clientToDesign(e.clientX, e.clientY);
    if (!pt) return;

    // If click is within selected element, start drag
    if (mySelectedPath && isPointInNode(pt.x, pt.y, mySelectedPath)) {
      const found = getNodeByPath(screen.root, mySelectedPath);
      if (found) {
        e.stopPropagation();
        e.preventDefault();
        setDragging(true);
        dragStart.current = {
          cx: e.clientX, cy: e.clientY,
          nodeX: found.node.x, nodeY: found.node.y,
          path: selectedPath!,
          isRoot: mySelectedPath === "root",
        };
        return;
      }
    }

    // Select deepest element
    const hit = hitTest(screen.root, pt.x, pt.y);
    if (hit) {
      e.stopPropagation();
      const fullPath = `${prefix}${hit.path}`;
      onSelect(fullPath === selectedPath ? null : fullPath);
    }
  }, [screen.root, clientToDesign, selectedPath, mySelectedPath, onSelect, prefix, isPointInNode]);

  // Drag move/end via window events
  useEffect(() => {
    if (!dragging) return;
    const rect = frameRef.current?.getBoundingClientRect();
    const scaleX = rect ? w / rect.width : 1;
    const scaleY = rect ? h / rect.height : 1;
    let lastCx = dragStart.current.cx;
    let lastCy = dragStart.current.cy;

    const handleMove = (e: MouseEvent) => {
      if (dragStart.current.isRoot) {
        // Root drag: move the screen frame on the canvas
        const dx = (e.clientX - lastCx) * scaleX;
        const dy = (e.clientY - lastCy) * scaleY;
        lastCx = e.clientX;
        lastCy = e.clientY;
        onScreenMove(screenIndex, Math.round(dx), Math.round(dy));
      } else {
        // Node drag: update node x/y
        const dx = (e.clientX - dragStart.current.cx) * scaleX;
        const dy = (e.clientY - dragStart.current.cy) * scaleY;
        onNodeUpdate(dragStart.current.path, {
          x: Math.round(dragStart.current.nodeX + dx),
          y: Math.round(dragStart.current.nodeY + dy),
        });
      }
    };

    const handleUp = () => setDragging(false);

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleUp);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleUp);
    };
  }, [dragging, w, h, onNodeUpdate, onScreenMove, screenIndex, clientToDesign]);

  const myHoveredPath = hoveredPath?.startsWith(prefix) ? hoveredPath.slice(prefix.length) : null;

  const hoverBox = useMemo(() => {
    if (!myHoveredPath || myHoveredPath === mySelectedPath) return null;
    return getNodeByPath(screen.root, myHoveredPath);
  }, [myHoveredPath, mySelectedPath, screen.root]);

  const selectBox = useMemo(() => {
    if (!mySelectedPath) return null;
    return getNodeByPath(screen.root, mySelectedPath);
  }, [mySelectedPath, screen.root]);

  return (
    <div style={{ position: "absolute", left: x, top: y, userSelect: "none" }}>
      {/* Label */}
      <div style={{
        display: "flex", alignItems: "center", gap: 8,
        marginBottom: 10, paddingLeft: 4,
      }}>
        <div style={{ width: 10, height: 10, borderRadius: 3, background: "#e8a04a" }} />
        <span style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.6)" }}>
          {screen.name}
        </span>
        <span style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", fontWeight: 500 }}>
          {w} x {h}
        </span>
      </div>

      {/* Frame */}
      <div
        ref={frameRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => { if (!dragging) onHover(null); }}
        onMouseDown={handleMouseDown}
        style={{
          width: w,
          height: h,
          borderRadius: 12,
          border: "2px solid rgba(255,255,255,0.15)",
          overflow: "hidden",
          position: "relative",
          cursor: dragging ? "grabbing" : mySelectedPath ? "move" : "crosshair",
          boxShadow: "0 8px 40px rgba(0,0,0,0.5)",
        }}
      >
        {/* SVG render */}
        <div
          dangerouslySetInnerHTML={{ __html: svgHtml }}
          style={{ width: w, height: h, pointerEvents: "none" }}
        />

        {/* Hover outline */}
        {hoverBox && (
          <div style={{
            position: "absolute",
            left: hoverBox.absX, top: hoverBox.absY,
            width: hoverBox.node.width, height: hoverBox.node.height,
            border: "1px solid rgba(74,144,232,0.6)",
            pointerEvents: "none", boxSizing: "border-box",
          }} />
        )}

        {/* Selection outline + handles */}
        {selectBox && (
          <>
            <div style={{
              position: "absolute",
              left: selectBox.absX, top: selectBox.absY,
              width: selectBox.node.width, height: selectBox.node.height,
              border: "2px solid #4a90e8",
              pointerEvents: "none", boxSizing: "border-box",
            }} />
            {[
              { l: selectBox.absX - 3, t: selectBox.absY - 3 },
              { l: selectBox.absX + selectBox.node.width - 3, t: selectBox.absY - 3 },
              { l: selectBox.absX - 3, t: selectBox.absY + selectBox.node.height - 3 },
              { l: selectBox.absX + selectBox.node.width - 3, t: selectBox.absY + selectBox.node.height - 3 },
            ].map((p, i) => (
              <div key={i} style={{
                position: "absolute", left: p.l, top: p.t,
                width: 6, height: 6,
                background: "#fff", border: "1px solid #4a90e8",
                borderRadius: 1, pointerEvents: "none",
              }} />
            ))}
            <div style={{
              position: "absolute",
              left: selectBox.absX + selectBox.node.width / 2,
              top: selectBox.absY + selectBox.node.height + 8,
              transform: "translateX(-50%)",
              fontSize: 10, fontWeight: 600,
              color: "#fff", background: "#4a90e8",
              padding: "2px 6px", borderRadius: 3,
              whiteSpace: "nowrap", pointerEvents: "none",
            }}>
              {Math.round(selectBox.node.width)} x {Math.round(selectBox.node.height)}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
