import React, { useState } from "react";
import type { Prototype } from "../types";
import { useAuth } from "../hooks/use-auth";
import { useFavorites } from "../hooks/use-favorites";
import { designTreeToSvg } from "../lib/design-tree-to-svg";
import { safeText } from "../lib/safe-text";
import { BuildAppModal } from "./build-app-modal";
import { GenerationProgress } from "./generation-progress";

interface Props {
  prototype: Prototype | undefined;
  navigate: (to: string) => void;
}

type CopyStatus = "idle" | "copying" | "copied" | "error";

async function fetchDesignTree(folder: string) {
  const res = await fetch(`/prototypes/${folder}/design-tree.json`);
  if (!res.ok) throw new Error("Design tree not available for this prototype");
  const contentType = res.headers.get("content-type") || "";
  if (!contentType.includes("json")) throw new Error("Design tree not available for this prototype");
  return res.json();
}

async function copySvgToClipboard(folder: string): Promise<void> {
  const tree = await fetchDesignTree(folder);
  const svg = designTreeToSvg(tree);
  await navigator.clipboard.writeText(svg);
}

function CopyButton({
  label,
  onClick,
  className = "btn-outline",
}: {
  label: string;
  onClick: () => Promise<void>;
  className?: string;
}) {
  const [status, setStatus] = useState<CopyStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleClick = async () => {
    setStatus("copying");
    setErrorMsg("");
    try {
      await onClick();
      setStatus("copied");
      setTimeout(() => setStatus("idle"), 2000);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Copy failed");
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  const text =
    status === "copying"
      ? "Copying..."
      : status === "copied"
        ? "Copied!"
        : status === "error"
          ? errorMsg
          : label;

  return (
    <button
      className={className}
      onClick={handleClick}
      disabled={status === "copying"}
    >
      {text}
    </button>
  );
}

export function PrototypeDetail({ prototype: p, navigate }: Props) {
  const { user } = useAuth();
  const { isFavorite, toggleFavorite } = useFavorites(user?.id ?? null);
  const [showBuildModal, setShowBuildModal] = useState(false);
  const [buildJobId, setBuildJobId] = useState<string | null>(null);

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

  const date = p.folder.match(/^(\d{4}-\d{2}-\d{2})/)?.[1] || "";
  const favorited = isFavorite(p.folder);

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
            <p className="detail-tagline">{safeText(p.tagline)}</p>
            <div className="detail-meta">
              {p.category && <span className="tag tag-category">{safeText(p.category)}</span>}
              {date && <span className="tag">{date}</span>}
              {p.audience && <span className="tag">{safeText(p.audience)}</span>}
            </div>
          </div>

          <div className="detail-section">
            <h2>Description</h2>
            <p>{safeText(p.description)}</p>
          </div>

          {p.features?.length > 0 && (
            <div className="detail-section">
              <h2>Features</h2>
              <ul className="detail-features">
                {p.features.map((f, i) => (
                  <li key={i}>{safeText(f)}</li>
                ))}
              </ul>
            </div>
          )}

          {p.screens?.length > 0 && (
            <div className="detail-section">
              <h2>Screens</h2>
              <div className="detail-screens">
                {p.screens.map((s, i) => (
                  <div key={i} className="screen-item">
                    <span className="screen-num">{i + 1}</span>
                    <span>{safeText(s)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {p.useCases?.length > 0 && (
            <div className="detail-section">
              <h2>Use Cases</h2>
              {p.useCases.map((uc, i) => (
                <p key={i} className="use-case">{safeText(uc)}</p>
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="detail-actions">
            <a className="btn-primary" href={`/prototypes/${p.folder}/preview.html`} target="_blank" rel="noopener">
              Open Full Screen
            </a>
            {user && (
              <button
                className={`btn-outline detail-fav-btn${favorited ? " favorited" : ""}`}
                onClick={() => toggleFavorite(p.folder)}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill={favorited ? "var(--accent)" : "none"} stroke={favorited ? "var(--accent)" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                </svg>
                {favorited ? "Favorited" : "Favorite"}
              </button>
            )}
            {p.figmaUrl && (
              <a className="btn-secondary" href={p.figmaUrl} target="_blank" rel="noopener">
                View Figma
              </a>
            )}
            <a className="btn-outline" href={`/prototypes/${p.folder}/assets.html`} target="_blank" rel="noopener">
              View Assets
            </a>
          </div>

          {/* Build Real App */}
          <div style={{
            marginTop: 24, padding: 24, borderRadius: 14,
            background: 'linear-gradient(135deg, rgba(232,160,74,0.08), rgba(232,160,74,0.02))',
            border: '1px solid rgba(232,160,74,0.2)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{
                width: 44, height: 44, borderRadius: 12, background: 'var(--accent)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                  <line x1="12" y1="18" x2="12.01" y2="18" />
                </svg>
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 2 }}>Build Real App</h3>
                <p style={{ fontSize: 13, color: 'var(--text-muted)', margin: 0 }}>
                  AI builds a full iOS + Android app from this prototype
                </p>
              </div>
              <button
                onClick={() => user ? setShowBuildModal(true) : navigate('/profile')}
                style={{
                  padding: '12px 24px', borderRadius: 12, border: 'none',
                  background: 'var(--accent)', color: '#fff', fontSize: 14,
                  fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap',
                }}
              >
                Build Now
              </button>
            </div>
          </div>

          {showBuildModal && (
            <BuildAppModal
              prototype={{ folder: p.folder, appName: p.appName, tagline: p.tagline, description: p.description, category: p.category }}
              onClose={() => setShowBuildModal(false)}
              onStarted={(jobId) => { setShowBuildModal(false); navigate(`/design/${jobId}`); }}
            />
          )}

          {buildJobId && (
            <GenerationProgress
              jobId={buildJobId}
              onComplete={() => setBuildJobId(null)}
              onClose={() => setBuildJobId(null)}
            />
          )}

          {/* Figma Export */}
          <div style={{ marginTop: 32, paddingTop: 28, borderTop: '1px solid var(--border)' }}>
            <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>Export to Figma</h2>
            <div style={{ display: 'flex', gap: 12 }}>
              <div style={{ flex: 1, padding: '16px 18px', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', display: 'flex', flexDirection: 'column', gap: 10 }}>
                <CopyButton label="Copy SVG" onClick={() => copySvgToClipboard(p.folder)} />
                <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.4, margin: 0 }}>Paste in Figma as editable vectors</p>
              </div>
              <div style={{ flex: 1, padding: '16px 18px', border: '1px solid color-mix(in srgb, var(--accent) 30%, transparent)', borderRadius: 'var(--radius-sm)', display: 'flex', flexDirection: 'column', gap: 10, position: 'relative' }}>
                <span style={{ position: 'absolute', top: -9, right: 14, fontSize: 10, fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: 0.5, color: 'var(--accent)', background: 'var(--bg)', padding: '1px 8px' }}>Recommended</span>
                <CopyButton label="Copy Design Tree JSON" onClick={async () => {
                  const tree = await fetchDesignTree(p.folder);
                  await navigator.clipboard.writeText(JSON.stringify(tree));
                }} />
                <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.4, margin: 0 }}>
                  Use with{" "}
                  <a href="https://www.figma.com/community/plugin/1617253090176959808/proto-to-figma" target="_blank" rel="noopener" style={{ color: 'var(--accent)', textDecoration: 'underline', textUnderlineOffset: 2, fontWeight: 500 }}>
                    Proto-to-Figma
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ verticalAlign: 'middle', marginLeft: 3 }}><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
                  </a>{" "}
                  for auto-layout frames
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
