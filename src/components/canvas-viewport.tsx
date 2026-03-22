import React, { useRef, useState, useCallback, useEffect } from "react";

interface Transform {
  x: number;
  y: number;
  scale: number;
}

interface Props {
  children: React.ReactNode;
  transform: Transform;
  onTransformChange: (t: Transform) => void;
}

const MIN_SCALE = 0.1;
const MAX_SCALE = 3;

export function CanvasViewport({ children, transform, onTransformChange }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPanning, setIsPanning] = useState(false);
  const [spaceHeld, setSpaceHeld] = useState(false);
  const panStart = useRef({ x: 0, y: 0, tx: 0, ty: 0 });

  // Zoom centered on cursor
  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const cursorX = e.clientX - rect.left;
    const cursorY = e.clientY - rect.top;

    // Pinch zoom (ctrlKey) or scroll zoom
    const delta = e.ctrlKey ? -e.deltaY * 0.01 : -e.deltaY * 0.002;
    const newScale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, transform.scale * (1 + delta)));
    const ratio = newScale / transform.scale;

    onTransformChange({
      scale: newScale,
      x: cursorX - (cursorX - transform.x) * ratio,
      y: cursorY - (cursorY - transform.y) * ratio,
    });
  }, [transform, onTransformChange]);

  // Pan start
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    // Middle mouse button or space held
    if (e.button === 1 || (e.button === 0 && spaceHeld)) {
      e.preventDefault();
      setIsPanning(true);
      panStart.current = { x: e.clientX, y: e.clientY, tx: transform.x, ty: transform.y };
    }
  }, [spaceHeld, transform]);

  // Pan move/end via window events
  useEffect(() => {
    if (!isPanning) return;

    const handleMove = (e: MouseEvent) => {
      onTransformChange({
        ...transform,
        x: panStart.current.tx + (e.clientX - panStart.current.x),
        y: panStart.current.ty + (e.clientY - panStart.current.y),
      });
    };

    const handleUp = () => setIsPanning(false);

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleUp);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleUp);
    };
  }, [isPanning, transform, onTransformChange]);

  // Space key for pan mode
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.code === "Space" && !e.repeat) { e.preventDefault(); setSpaceHeld(true); }
    };
    const up = (e: KeyboardEvent) => {
      if (e.code === "Space") setSpaceHeld(false);
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => { window.removeEventListener("keydown", down); window.removeEventListener("keyup", up); };
  }, []);

  const gridSize = 24 * transform.scale;
  const gridX = transform.x % gridSize;
  const gridY = transform.y % gridSize;

  return (
    <div
      ref={containerRef}
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      style={{
        position: "absolute", inset: 0, overflow: "hidden",
        cursor: isPanning ? "grabbing" : spaceHeld ? "grab" : "default",
        backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
        backgroundSize: `${gridSize}px ${gridSize}px`,
        backgroundPosition: `${gridX}px ${gridY}px`,
      }}
    >
      <div style={{
        position: "absolute", left: 0, top: 0,
        transformOrigin: "0 0",
        transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`,
        willChange: "transform",
      }}>
        {children}
      </div>
    </div>
  );
}
