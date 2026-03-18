import React, { useState } from "react";
import type { Prototype } from "../types";
import { PrototypeCard } from "../components/prototype-card";
import { getCategories } from "../hooks/use-prototypes";
import { useScrollReveal, useCountUp } from "../hooks/use-scroll-reveal";

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

function CountStat({ value, label }: { value: number; label: string }) {
  const { count, ref } = useCountUp(value);
  return (
    <div className="stat" ref={ref as React.Ref<HTMLDivElement>}>
      <span className="stat-num">{count}</span>
      <span className="stat-label">{label}</span>
    </div>
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
          <p className="hero-badge">AI-Powered App Gallery</p>
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

      {/* Stats — pitch deck style with counters */}
      <section className="stats-section reveal">
        <div className="stats-bar">
          <CountStat value={prototypes.length} label="Prototypes" />
          <CountStat value={categories.length} label="Categories" />
          <CountStat value={6} label="Added Daily" />
          <CountStat value={10} label="Design Styles" />
        </div>
      </section>

      {/* How it works — pitch deck slide */}
      <section className="section pitch-section">
        <div className="section-inner">
          <div className="reveal">
            <p className="section-eyebrow">How It Works</p>
            <h2 className="section-title">From Idea to Prototype in Seconds</h2>
          </div>
          <div className="pitch-steps">
            {[
              { icon: "💡", title: "AI Ideation", desc: "GPT-4o-mini generates unique app ideas across 10 categories" },
              { icon: "🎨", title: "Design & Build", desc: "Claude Sonnet creates interactive React prototypes with full design systems" },
              { icon: "✅", title: "Validate & Ship", desc: "Headless Chrome validates rendering, then auto-deploys to the gallery" },
            ].map((step, i) => (
              <div key={i} className={`pitch-step reveal`} style={{ transitionDelay: `${i * 120}ms` }}>
                <span className="pitch-step-icon">{step.icon}</span>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="section">
        <div className="section-inner">
          <div className="reveal">
            <p className="section-eyebrow">Explore</p>
            <h2 className="section-title">Browse by Category</h2>
          </div>
          <div className="category-grid reveal" style={{ transitionDelay: "100ms" }}>
            {categories.map((c, i) => (
              <button
                key={c.name}
                className="category-chip"
                style={{ animationDelay: `${i * 50}ms` }}
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
            <div>
              <p className="section-eyebrow">Gallery</p>
              <h2 className="section-title">Latest Prototypes</h2>
            </div>
            <button className="btn-ghost" onClick={() => navigate("/gallery")}>
              View all &rarr;
            </button>
          </div>
          <div className="proto-grid">
            {featured.map((p, i) => (
              <div key={p.folder} className="reveal" style={{ transitionDelay: `${i * 100}ms` }}>
                <PrototypeCard prototype={p} navigate={navigate} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section cta-section reveal">
        <div className="cta-inner">
          <h2>Ready to explore?</h2>
          <p>Browse {prototypes.length}+ AI-generated prototypes with live interactive previews.</p>
          <button className="btn-outline" onClick={() => navigate("/gallery")}>
            Open Gallery &rarr;
          </button>
        </div>
      </section>
    </div>
  );
}
