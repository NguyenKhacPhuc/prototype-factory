import React, { useEffect, useMemo, useRef, useState } from "react";
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
  const heroCards = useMemo(() => {
    const shuffled = [...prototypes].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 5);
  }, [prototypes]);
  const categories = getCategories(prototypes);
  const showcaseCards = useMemo(() => {
    const heroFolders = new Set(heroCards.map((p) => p.folder));
    const remaining = prototypes.filter((p) => !heroFolders.has(p.folder));
    return [...remaining].sort(() => Math.random() - 0.5).slice(0, 6);
  }, [prototypes, heroCards]);

  const usernames = useMemo(() => [
    "@alex", "@jordan", "@casey", "@riley", "@morgan", "@taylor",
    "@sam", "@avery", "@blake", "@drew", "@kai", "@quinn",
  ], []);
  // Which card currently shows a bubble (-1 = none)
  const [activeBubble, setActiveBubble] = useState(-1);
  const [bubbleName, setBubbleName] = useState("");

  const visionCards = useMemo(() => {
    const used = new Set([...heroCards, ...showcaseCards].map((p) => p.folder));
    const remaining = prototypes.filter((p) => !used.has(p.folder));
    return [...remaining].sort(() => Math.random() - 0.5).slice(0, 6);
  }, [prototypes, heroCards, showcaseCards]);
  const [visionTab, setVisionTab] = useState<"browse" | "create">("browse");

  // Style studio
  const [styleColor, setStyleColor] = useState("#6C5CE7");
  const [styleFont, setStyleFont] = useState("Inter");
  const [styleRadius, setStyleRadius] = useState(16);
  const [styleMode, setStyleMode] = useState<"dark" | "light">("dark");

  const [cardPhase, setCardPhase] = useState<"idle" | "animating" | "done">("idle");
  const [showcaseVisible, setShowcaseVisible] = useState(false);
  const showcaseRef = useRef<HTMLDivElement>(null);

  useScrollReveal();

  useEffect(() => {
    const t1 = setTimeout(() => setCardPhase("animating"), 400);
    const t2 = setTimeout(() => setCardPhase("done"), 3700);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  useEffect(() => {
    const el = showcaseRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowcaseVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Cycle random username bubbles on showcase cards
  useEffect(() => {
    const show = () => {
      const cardIdx = Math.floor(Math.random() * 6);
      const nameIdx = Math.floor(Math.random() * usernames.length);
      setActiveBubble(cardIdx);
      setBubbleName(usernames[nameIdx]);
      setTimeout(() => setActiveBubble(-1), 1500);
    };
    // Start after 1s delay
    const t = setTimeout(show, 1000);
    const interval = setInterval(show, 2000);
    return () => { clearTimeout(t); clearInterval(interval); };
  }, [usernames]);

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
        </div>

        {/* Card carousel fan */}
        <div className="hero-carousel fade-in-up-delayed">
          {heroCards.map((p, i) => {
            const pos = cardPositions[i];
            const phaseClass = cardPhase === "idle" ? "" : cardPhase === "done" ? "spread-ready spread-done" : "spread-ready";

            return (
              <div
                key={p.folder}
                className={`hero-card ${phaseClass}`}
                style={{
                  "--spread-x": `${pos.x}px`,
                  "--spread-y": `${pos.y}px`,
                  "--spread-r": `${pos.rotate}deg`,
                  zIndex: 5 - Math.abs(i - 2),
                } as React.CSSProperties}
                onClick={() => navigate(`/prototype/${p.folder}`)}
              >
                <div className="hero-card-overlay">
                  <div className="hero-card-name">{p.appName}</div>
                  <div className="hero-card-category">{p.category}</div>
                </div>
                {p.hasScreenshot ? (
                  <img
                    src={`/prototypes/${p.folder}/screenshot.png`}
                    alt={p.appName}
                    loading="lazy"
                    draggable={false}
                  />
                ) : (
                  <iframe
                    src={`/prototypes/${p.folder}/preview.html`}
                    sandbox="allow-scripts allow-same-origin"
                    loading="lazy"
                    title={p.appName}
                  />
                )}
              </div>
            );
          })}
        </div>

        <div className="hero-bottom fade-in-up" style={{ animationDelay: "1.2s" }}>
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

      {/* Showcase — app design section */}
      <section className="showcase-section" ref={showcaseRef}>
        <div className="showcase-inner">
          <div className="showcase-text reveal">
            <p className="section-eyebrow">App Showcase</p>
            <h2 className="showcase-title">
              Discover, Explore,
              <br />
              <span className="showcase-highlight">& interact with apps</span>
              <br />
              in our gallery.
            </h2>
            <p className="showcase-desc">
              A dynamic collection where AI-generated prototypes come alive.
              Appdex brings together cutting-edge design and interactive
              experiences for you to explore.
            </p>
            <div className="showcase-actions">
              <button className="btn-primary" onClick={() => navigate("/gallery")}>
                Browse Gallery
              </button>
              <button className="btn-ghost" onClick={() => navigate("/about")}>
                Read more
              </button>
            </div>
          </div>
          <div className="showcase-cards">
            {showcaseCards.map((p, i) => {
              const positions = [
                { x: 0, y: 40, r: -6 },
                { x: 180, y: 0, r: 3 },
                { x: 340, y: 60, r: 8 },
                { x: 120, y: 220, r: -4 },
                { x: 300, y: 240, r: 6 },
                { x: 460, y: 200, r: -8 },
              ];
              const pos = positions[i];
              return (
                <div
                  key={p.folder}
                  className={`showcase-card ${showcaseVisible ? "sc-visible" : ""}`}
                  style={{
                    "--sc-x": `${pos.x}px`,
                    "--sc-y": `${pos.y}px`,
                    "--sc-r": `${pos.r}deg`,
                    transitionDelay: showcaseVisible ? `${i * 150}ms` : "0ms",
                  } as React.CSSProperties}
                  onClick={() => navigate(`/prototype/${p.folder}`)}
                >
                  {activeBubble === i && (
                    <div className="showcase-bubble" key={bubbleName}>
                      {bubbleName}
                    </div>
                  )}
                  <div className="showcase-card-inner">
                    {p.hasScreenshot ? (
                      <img
                        src={`/prototypes/${p.folder}/screenshot.png`}
                        alt={p.appName}
                        loading="lazy"
                        draggable={false}
                      />
                    ) : (
                      <iframe
                        src={`/prototypes/${p.folder}/preview.html`}
                        sandbox="allow-scripts allow-same-origin"
                        loading="lazy"
                        title={p.appName}
                      />
                    )}
                    <div className="showcase-card-label">{p.appName}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="vision-section">
        <div className="vision-inner">
          <div className="vision-text reveal">
            <svg className="vision-icon" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
              <path d="M12 8v8M8 12h8" />
            </svg>
            <h2 className="vision-title">
              Our vision
              <br />
              <span className="vision-highlight">for app design.</span>
            </h2>
            <p className="vision-desc">
              Appdex is building the future of app prototyping. Browse AI-generated ideas today,
              and soon create your own — just describe your app and AI builds the prototype for you.
            </p>
            <div className="vision-features">
              {[
                { icon: "M9.663 17h4.674M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z", label: "AI Ideas" },
                { icon: "M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z", label: "Prototypes" },
                { icon: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01", label: "Design Specs" },
                { icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4", label: "Export Code" },
                { icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z", label: "Community" },
                { icon: "M13 10V3L4 14h7v7l9-11h-7z", label: "Instant" },
              ].map((f, i) => (
                <div key={i} className="vision-feature reveal" style={{ transitionDelay: `${i * 80}ms` }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d={f.icon} />
                  </svg>
                  <span>{f.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="vision-preview reveal-right">
            <div className="vision-tabs">
              <button
                className={`vision-tab ${visionTab === "browse" ? "active" : ""}`}
                onClick={() => setVisionTab("browse")}
              >
                Browse
              </button>
              <button
                className={`vision-tab ${visionTab === "create" ? "active" : ""}`}
                onClick={() => setVisionTab("create")}
              >
                Create
              </button>
            </div>
            {visionTab === "browse" ? (
              <div className="vision-grid">
                {visionCards.map((p) => (
                  <div key={p.folder} className="vision-card" onClick={() => navigate(`/prototype/${p.folder}`)}>
                    {p.hasScreenshot ? (
                      <img
                        src={`/prototypes/${p.folder}/screenshot.png`}
                        alt={p.appName}
                        loading="lazy"
                        draggable={false}
                      />
                    ) : (
                      <iframe
                        src={`/prototypes/${p.folder}/preview.html`}
                        sandbox="allow-scripts allow-same-origin"
                        loading="lazy"
                        title={p.appName}
                      />
                    )}
                    <div className="vision-card-name">{p.appName}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="vision-create-preview">
                <div className="vision-create-prompt">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                  <span>Describe your app idea...</span>
                </div>
                <p className="vision-create-hint">Coming soon: type a prompt and AI generates a full interactive prototype with design system, screens, and exportable code.</p>
              </div>
            )}
          </div>
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
          <div className="shots-grid">
            {featured.map((p, i) => (
              <div key={p.folder} className="reveal" style={{ transitionDelay: `${i * 100}ms` }}>
                <PrototypeCard prototype={p} navigate={navigate} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Style Studio */}
      <section className="section style-section">
        <div className="section-inner">
          <div className="style-layout">
            <div className="style-controls reveal">
              <p className="section-eyebrow">Style Studio</p>
              <h2 className="section-title">Create your own style.</h2>
              <p className="style-desc">
                Customize colors, typography, and shape to match your vision.
                Every prototype gets a unique design system tailored to your taste.
              </p>

              <div className="style-group">
                <label className="style-label">Accent Color</label>
                <div className="style-colors">
                  {["#6C5CE7", "#E05A6D", "#00B894", "#FDCB6E", "#0984E3", "#E07C3E", "#A29BFE", "#55EFC4"].map((c) => (
                    <button
                      key={c}
                      className={`style-color-btn ${styleColor === c ? "active" : ""}`}
                      style={{ background: c }}
                      onClick={() => setStyleColor(c)}
                    />
                  ))}
                </div>
              </div>

              <div className="style-group">
                <label className="style-label">Typography</label>
                <div className="style-fonts">
                  {["Inter", "Playfair Display", "Georgia", "Menlo"].map((f) => (
                    <button
                      key={f}
                      className={`style-font-btn ${styleFont === f ? "active" : ""}`}
                      style={{ fontFamily: f }}
                      onClick={() => setStyleFont(f)}
                    >
                      Aa
                    </button>
                  ))}
                </div>
              </div>

              <div className="style-group">
                <label className="style-label">Border Radius &mdash; {styleRadius}px</label>
                <input
                  type="range"
                  min="0"
                  max="32"
                  value={styleRadius}
                  onChange={(e) => setStyleRadius(Number(e.target.value))}
                  className="style-slider"
                />
              </div>

              <div className="style-group">
                <label className="style-label">Mode</label>
                <div className="style-mode-btns">
                  <button
                    className={`style-mode-btn ${styleMode === "dark" ? "active" : ""}`}
                    onClick={() => setStyleMode("dark")}
                  >
                    Dark
                  </button>
                  <button
                    className={`style-mode-btn ${styleMode === "light" ? "active" : ""}`}
                    onClick={() => setStyleMode("light")}
                  >
                    Light
                  </button>
                </div>
              </div>

              <button className="btn-outline" style={{ marginTop: 20 }} onClick={() => navigate("/styles")}>
                Open Style Studio &rarr;
              </button>
            </div>

            <div className="style-preview reveal-right">
              <div
                className="style-phone"
                style={{
                  background: styleMode === "dark" ? "#1a1a1a" : "#ffffff",
                  color: styleMode === "dark" ? "#f0f0f0" : "#1a1a1a",
                  fontFamily: styleFont,
                }}
              >
                <div className="style-phone-status">
                  <span>9:41</span>
                  <span className="style-phone-notch" />
                  <span>100%</span>
                </div>
                <div className="style-phone-content">
                  <div className="style-phone-nav" style={{ borderColor: styleMode === "dark" ? "#333" : "#e5e5e5" }}>
                    <div className="style-phone-avatar" style={{ background: styleColor }} />
                    <span style={{ fontFamily: styleFont, fontWeight: 700 }}>MyApp</span>
                  </div>
                  <div
                    className="style-phone-hero"
                    style={{ background: styleColor, borderRadius: `${styleRadius}px` }}
                  >
                    <span style={{ fontFamily: styleFont }}>Welcome back</span>
                    <small>Your dashboard is ready</small>
                  </div>
                  <div className="style-phone-cards">
                    <div
                      className="style-phone-card"
                      style={{
                        borderRadius: `${styleRadius}px`,
                        background: styleMode === "dark" ? "#252525" : "#f5f5f5",
                        borderColor: styleMode === "dark" ? "#333" : "#e8e8e8",
                      }}
                    >
                      <div className="style-phone-card-dot" style={{ background: styleColor }} />
                      <div className="style-phone-card-lines">
                        <div style={{ width: "80%", background: styleMode === "dark" ? "#444" : "#ddd" }} />
                        <div style={{ width: "55%", background: styleMode === "dark" ? "#333" : "#e5e5e5" }} />
                      </div>
                    </div>
                    <div
                      className="style-phone-card"
                      style={{
                        borderRadius: `${styleRadius}px`,
                        background: styleMode === "dark" ? "#252525" : "#f5f5f5",
                        borderColor: styleMode === "dark" ? "#333" : "#e8e8e8",
                      }}
                    >
                      <div className="style-phone-card-dot" style={{ background: `${styleColor}80` }} />
                      <div className="style-phone-card-lines">
                        <div style={{ width: "65%", background: styleMode === "dark" ? "#444" : "#ddd" }} />
                        <div style={{ width: "90%", background: styleMode === "dark" ? "#333" : "#e5e5e5" }} />
                      </div>
                    </div>
                  </div>
                  <div
                    className="style-phone-btn"
                    style={{ background: styleColor, borderRadius: `${styleRadius}px`, fontFamily: styleFont }}
                  >
                    Get Started
                  </div>
                </div>
              </div>
            </div>
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
