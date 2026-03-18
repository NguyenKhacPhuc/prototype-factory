import React from "react";
import type { Prototype } from "../types";

interface Props {
  prototype: Prototype;
  navigate: (to: string) => void;
}

export function PrototypeCard({ prototype: p, navigate }: Props) {
  const slug = p.folder;
  const colors = [p.designSystem?.primaryColor, p.designSystem?.secondaryColor].filter(Boolean);

  return (
    <div
      className="proto-card"
      onClick={() => navigate(`/prototype/${slug}`)}
      role="link"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && navigate(`/prototype/${slug}`)}
    >
      <div className="proto-card-preview">
        <iframe
          src={`/prototypes/${slug}/preview.html`}
          sandbox="allow-scripts allow-same-origin"
          loading="lazy"
          title={p.appName}
        />
      </div>
      <div className="proto-card-body">
        <h3 className="proto-card-title">{p.appName}</h3>
        <p className="proto-card-tagline">{p.tagline}</p>
        <p className="proto-card-desc">{p.description}</p>
        <div className="proto-card-meta">
          {p.category && <span className="tag tag-category">{p.category}</span>}
          {colors.map((c) => (
            <span key={c} className="tag tag-color" style={{ background: `${c}20`, color: c, borderColor: `${c}40` }}>
              {c}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
