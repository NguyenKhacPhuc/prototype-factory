import React from "react";

interface Props {
  prototypeCount: number;
  navigate: (to: string) => void;
}

export function About({ prototypeCount, navigate }: Props) {
  return (
    <div className="about-page">
      <h1>About Appdex</h1>

      <div className="about-content">
        <section className="about-section">
          <h2>What is this?</h2>
          <p>
            Appdex is an AI-powered platform that automatically generates interactive app prototypes. Every
            day, new app ideas are created and turned into fully functional React previews with complete design systems.
          </p>
        </section>

        <section className="about-section">
          <h2>How it works</h2>
          <div className="how-steps">
            <div className="how-step">
              <span className="step-num">1</span>
              <div>
                <h3>Ideation</h3>
                <p>GPT-4o-mini generates unique app ideas across 10 rotating categories — health, finance, social, productivity, education, entertainment, travel, food, sustainability, and creative tools.</p>
              </div>
            </div>
            <div className="how-step">
              <span className="step-num">2</span>
              <div>
                <h3>Prototyping</h3>
                <p>Claude Sonnet transforms each idea into a fully interactive React prototype with 4+ screens, tab navigation, animations, and a complete design system with 10 rotating visual styles.</p>
              </div>
            </div>
            <div className="how-step">
              <span className="step-num">3</span>
              <div>
                <h3>Asset Generation</h3>
                <p>Fonts are downloaded from Google Fonts, icons from Lucide, and a complete asset manifest is generated. Each prototype gets its own design spec and asset showcase page.</p>
              </div>
            </div>
            <div className="how-step">
              <span className="step-num">4</span>
              <div>
                <h3>Validation &amp; Deploy</h3>
                <p>Each prototype is validated via headless Chrome to ensure it renders correctly. Valid prototypes are auto-committed and deployed to Vercel.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2>By the numbers</h2>
          <div className="about-stats">
            <div className="about-stat">
              <span className="stat-num">{prototypeCount}</span>
              <span className="stat-label">Prototypes</span>
            </div>
            <div className="about-stat">
              <span className="stat-num">10</span>
              <span className="stat-label">Categories</span>
            </div>
            <div className="about-stat">
              <span className="stat-num">10</span>
              <span className="stat-label">Design Styles</span>
            </div>
            <div className="about-stat">
              <span className="stat-num">6</span>
              <span className="stat-label">Daily</span>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2>Tech stack</h2>
          <div className="tech-list">
            <span className="tech-badge">OpenAI GPT-4o-mini</span>
            <span className="tech-badge">Claude Sonnet</span>
            <span className="tech-badge">React 18</span>
            <span className="tech-badge">Bun</span>
            <span className="tech-badge">Vercel</span>
            <span className="tech-badge">Puppeteer</span>
            <span className="tech-badge">Google Fonts</span>
            <span className="tech-badge">Lucide Icons</span>
          </div>
        </section>

        <div className="about-cta" style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <button className="btn-primary" onClick={() => navigate("/gallery")}>
            Browse Prototypes &rarr;
          </button>
          <a href="https://ko-fi.com/steve31" target="_blank" rel="noopener" className="btn-outline" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6 }}>
            ☕ Support on Ko-fi
          </a>
        </div>
      </div>
    </div>
  );
}
