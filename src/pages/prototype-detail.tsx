import React from "react";
import type { Prototype } from "../types";

interface Props {
  prototype: Prototype | undefined;
  navigate: (to: string) => void;
}

export function PrototypeDetail({ prototype: p, navigate }: Props) {
  if (!p) {
    return (
      <div className="detail-page">
        <div className="detail-not-found">
          <h1>Prototype not found</h1>
          <button className="btn-primary" onClick={() => navigate("/gallery")}>
            Back to Gallery
          </button>
        </div>
      </div>
    );
  }

  const ds = p.designSystem;
  const colors = [
    { label: "Primary", value: ds.primaryColor },
    { label: "Secondary", value: ds.secondaryColor },
    { label: "Accent", value: ds.accentColor },
    { label: "Background", value: ds.backgroundColor },
  ].filter((c) => c.value);

  const date = p.folder.match(/^(\d{4}-\d{2}-\d{2})/)?.[1] || "";

  return (
    <div className="detail-page">
      <div className="detail-nav">
        <button className="btn-ghost" onClick={() => navigate("/gallery")}>
          &larr; Back to Gallery
        </button>
      </div>

      <div className="detail-layout">
        {/* Preview */}
        <div className="detail-preview">
          <iframe
            src={`/prototypes/${p.folder}/preview.html`}
            sandbox="allow-scripts allow-same-origin"
            title={p.appName}
          />
        </div>

        {/* Info */}
        <div className="detail-info">
          <div className="detail-header">
            <h1>{p.appName}</h1>
            <p className="detail-tagline">{p.tagline}</p>
            <div className="detail-meta">
              {p.category && <span className="tag tag-category">{p.category}</span>}
              {date && <span className="tag">{date}</span>}
              {p.audience && <span className="tag">{p.audience}</span>}
            </div>
          </div>

          <div className="detail-section">
            <h2>Description</h2>
            <p>{p.description}</p>
          </div>

          {p.features.length > 0 && (
            <div className="detail-section">
              <h2>Features</h2>
              <ul className="detail-features">
                {p.features.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </div>
          )}

          {p.screens.length > 0 && (
            <div className="detail-section">
              <h2>Screens</h2>
              <div className="detail-screens">
                {p.screens.map((s, i) => (
                  <div key={i} className="screen-item">
                    <span className="screen-num">{i + 1}</span>
                    <span>{s}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {p.useCases.length > 0 && (
            <div className="detail-section">
              <h2>Use Cases</h2>
              {p.useCases.map((uc, i) => (
                <p key={i} className="use-case">{uc}</p>
              ))}
            </div>
          )}

          {/* Design System */}
          <div className="detail-section">
            <h2>Design System</h2>
            <div className="ds-colors">
              {colors.map((c) => (
                <div key={c.label} className="ds-color">
                  <div className="ds-swatch" style={{ background: c.value }} />
                  <span className="ds-color-label">{c.label}</span>
                  <span className="ds-color-value">{c.value}</span>
                </div>
              ))}
            </div>
            <p className="ds-font">
              Font: <strong>{ds.fontFamily}</strong>
            </p>
            {ds.style && <p className="ds-style">{ds.style}</p>}
          </div>

          {/* Actions */}
          <div className="detail-actions">
            <a className="btn-primary" href={`/prototypes/${p.folder}/preview.html`} target="_blank" rel="noopener">
              Open Full Screen
            </a>
            <a className="btn-secondary" href={`/prototypes/${p.folder}/assets.html`} target="_blank" rel="noopener">
              View Assets
            </a>
            <a className="btn-secondary" href={`/prototypes/${p.folder}/design-spec.json`} target="_blank" rel="noopener">
              Design Spec
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
