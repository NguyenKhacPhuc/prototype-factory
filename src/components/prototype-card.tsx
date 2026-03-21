import React from "react";
import type { Prototype } from "../types";

interface Props {
  prototype: Prototype;
  navigate: (to: string) => void;
}

// Deterministic number from string (consistent across renders)
function hashNum(str: string, min: number, max: number): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) | 0;
  }
  return min + Math.abs(hash) % (max - min);
}

function formatNum(n: number): string {
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, "") + "k";
  return String(n);
}

export function PrototypeCard({ prototype: p, navigate }: Props) {
  const slug = p.folder;
  const views = hashNum(slug + "v", 120, 9800);
  const likes = hashNum(slug + "l", 10, 480);

  return (
    <div
      className="shot-card"
      onClick={() => navigate(`/prototype/${slug}`)}
      role="link"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && navigate(`/prototype/${slug}`)}
    >
      <div className="shot-preview">
        {p.hasScreenshot ? (
          <img
            src={`/prototypes/${slug}/screenshot.png`}
            alt={p.appName}
            loading="lazy"
            draggable={false}
          />
        ) : (
          <iframe
            src={`/prototypes/${slug}/preview.html`}
            sandbox="allow-scripts allow-same-origin"
            loading="lazy"
            title={p.appName}
          />
        )}
        <div className="shot-overlay">
          <span className="shot-title">{p.appName}</span>
        </div>
      </div>
      <div className="shot-footer">
        <div className="shot-info">
          <div className="shot-header">
            <span className="shot-name">{p.appName}</span>
            {p.category && <span className="shot-category">{p.category}</span>}
          </div>
          <span className="shot-tagline">{p.tagline}</span>
          {p.description && <span className="shot-desc">{p.description}</span>}
        </div>
        <div className="shot-stats">
          <span className="shot-stat">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
            </svg>
            {formatNum(likes)}
          </span>
          <span className="shot-stat">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            {formatNum(views)}
          </span>
        </div>
      </div>
    </div>
  );
}
