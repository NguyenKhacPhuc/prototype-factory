import React, { useState } from "react";
import type { Prototype } from "../types";
import { PrototypeCard } from "../components/prototype-card";
import { getCategories } from "../hooks/use-prototypes";
import { useScrollReveal } from "../hooks/use-scroll-reveal";

interface Props {
  prototypes: Prototype[];
  navigate: (to: string) => void;
}

function Sparkle({ size = 20, style }: { size?: number; style: React.CSSProperties }) {
  return (
    <span className="sparkle" style={style}>
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0L14.59 8.41L23 12L14.59 15.59L12 24L9.41 15.59L1 12L9.41 8.41L12 0Z" />
      </svg>
    </span>
  );
}

export function Landing({ prototypes, navigate }: Props) {
  const featured = prototypes.slice(0, 6);
  const heroCards = prototypes.slice(0, 5);
  const categories = getCategories(prototypes);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useScrollReveal();

  const cardPositions = [
    { x: -280, rotate: -14, y: 40 },
    { x: -140, rotate: -7, y: 15 },
    { x: 0, rotate: 0, y: 0 },
    { x: 140, rotate: 7, y: 15 },
    { x: 280, rotate: 14, y: 40 },
  ];

  return (
    <div className="landing">
      {/* Hero */}
      <section className="hero">
        <Sparkle style={{ top: "10%", right: "15%", opacity: 0.6 }} size={24} />
        <Sparkle style={{ top: "6%", right: "20%", opacity: 0.3 }} size={14} />
        <Sparkle style={{ top: "25%", left: "8%", opacity: 0.25 }} size={16} />
        <Sparkle style={{ top: "12%", left: "22%", opacity: 0.15 }} size={12} />
        <Sparkle style={{ top: "35%", right: "6%", opacity: 0.2 }} size={18} />
        <Sparkle style={{ top: "50%", left: "15%", opacity: 0.12 }} size={10} />

        <div className="hero-inner fade-in-up">
          <h1 className="hero-title">
            Welcome to <span className="hero-highlight">Appdex:</span>
            <br />
            Your AI App Gallery
          </h1>
          <p className="hero-subtitle">
            Discover {prototypes.length}+ AI-generated app prototypes with interactive previews, complete design
            systems, and exportable assets. New ideas generated daily.
          </p>
          <div className="hero-actions">
            <button className="btn-outline" onClick={() => navigate("/gallery")}>
              Discover Gallery
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="m12 8 4 4-4 4M8 12h8" />
              </svg>
            </button>
            <button className="btn-primary" onClick={() => navigate("/about")}>
              How It Works
            </button>
          </div>
        </div>

        {/* Card carousel fan */}
        <div className="hero-carousel fade-in-up-delayed">
          {heroCards.map((p, i) => {
            const pos = cardPositions[i];
            const isHovered = hoveredCard === i;
            const hoverY = isHovered ? -50 : 0;
            const hoverScale = isHovered ? 1.05 : 1;
            const zIndex = isHovered ? 10 : 5 - Math.abs(i - 2);

            return (
              <div
                key={p.folder}
                className="hero-card"
                style={{
                  transform: `translateX(${pos.x}px) translateY(${pos.y + hoverY}px) rotate(${pos.rotate}deg) scale(${hoverScale})`,
                  zIndex,
                }}
                onMouseEnter={() => setHoveredCard(i)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => navigate(`/prototype/${p.folder}`)}
              >
                <div className="hero-card-overlay">
                  <div className="hero-card-name">{p.appName}</div>
                  <div className="hero-card-category">{p.category}</div>
                </div>
                <iframe
                  src={`/prototypes/${p.folder}/preview.html`}
                  sandbox="allow-scripts allow-same-origin"
                  loading="lazy"
                  title={p.appName}
                />
              </div>
            );
          })}
        </div>
      </section>

      {/* Stats */}
      <div className="stats-bar reveal">
        <div className="stat">
          <span className="stat-num">{prototypes.length}</span>
          <span className="stat-label">Prototypes</span>
        </div>
        <div className="stat">
          <span className="stat-num">{categories.length}</span>
          <span className="stat-label">Categories</span>
        </div>
        <div className="stat">
          <span className="stat-num">6</span>
          <span className="stat-label">Added Daily</span>
        </div>
        <div className="stat">
          <span className="stat-num">10</span>
          <span className="stat-label">Design Styles</span>
        </div>
      </div>

      {/* Categories */}
      <section className="section">
        <div className="section-inner reveal">
          <h2 className="section-title">Browse by Category</h2>
          <div className="category-grid">
            {categories.map((c, i) => (
              <button
                key={c.name}
                className="category-chip"
                style={{ transitionDelay: `${i * 40}ms` }}
                onClick={() => navigate(`/gallery?category=${encodeURIComponent(c.name)}`)}
              >
                <span className="category-name">{c.name}</span>
                <span className="category-count">{c.count}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="section">
        <div className="section-inner">
          <div className="section-header reveal">
            <h2 className="section-title">Latest Prototypes</h2>
            <button className="btn-ghost" onClick={() => navigate("/gallery")}>
              View all &rarr;
            </button>
          </div>
          <div className="proto-grid">
            {featured.map((p, i) => (
              <div key={p.folder} className="reveal" style={{ transitionDelay: `${i * 80}ms` }}>
                <PrototypeCard prototype={p} navigate={navigate} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
