import React, { useState } from "react";
import type { Prototype } from "../types";
import { useAuth } from "../hooks/use-auth";
import { useFavorites } from "../hooks/use-favorites";
import { designTreeToSvg } from "../lib/design-tree-to-svg";

interface Props {
  prototype: Prototype | undefined;
  navigate: (to: string) => void;
}

type CopyStatus = "idle" | "copying" | "copied" | "error";

async function fetchDesignTree(folder: string) {
  const res = await fetch(`/api/design-tree/${folder}`);
  if (!res.ok) throw new Error("Design tree not found");
  return res.json();
}

async function copySvgToClipboard(folder: string): Promise<void> {
  const tree = await fetchDesignTree(folder);
  const svg = designTreeToSvg(tree);
  const htmlBlob = new Blob([svg], { type: "text/html" });
  const textBlob = new Blob([svg], { type: "text/plain" });
  await navigator.clipboard.write([
    new ClipboardItem({
      "text/html": htmlBlob,
      "text/plain": textBlob,
    }),
  ]);
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

          {p.features?.length > 0 && (
            <div className="detail-section">
              <h2>Features</h2>
              <ul className="detail-features">
                {p.features.map((f, i) => (
                  <li key={i}>{f}</li>
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
                    <span>{s}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {p.useCases?.length > 0 && (
            <div className="detail-section">
              <h2>Use Cases</h2>
              {p.useCases.map((uc, i) => (
                <p key={i} className="use-case">{uc}</p>
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

          {/* Figma Export */}
          <div className="detail-section detail-export-section">
            <h2>Export to Figma</h2>
            <div className="detail-export-cards">
              <div className="export-card">
                <CopyButton
                  label="Copy SVG"
                  onClick={() => copySvgToClipboard(p.folder)}
                />
                <span className="export-card-desc">Paste in Figma as editable vectors. Some alignment may differ.</span>
              </div>
              <div className="export-card">
                <CopyButton
                  label="Copy Design Tree JSON"
                  onClick={async () => {
                    const tree = await fetchDesignTree(p.folder);
                    await navigator.clipboard.writeText(JSON.stringify(tree));
                  }}
                />
                <span className="export-card-desc">
                  Paste into the{" "}
                  <a href="https://www.figma.com/community/plugin/1617253090176959808/proto-to-figma" target="_blank" rel="noopener">
                    Proto-to-Figma plugin
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{verticalAlign: "middle", marginLeft: "3px"}}><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
                  </a>{" "}
                  for editable frames with auto-layout. <em>(Recommended)</em>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
