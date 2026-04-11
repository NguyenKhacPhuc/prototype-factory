import React, { useState, useMemo } from "react";

interface Props {
  navigate: (to: string) => void;
}

type Layout = "app" | "cards" | "editorial" | "dashboard" | "hero" | "minimal";

interface StyleDef {
  name: string;
  bestFor: string;
  accent: string;
  bg: string;
  card: string;
  text: string;
  radius: number;
  font: string;
  layout: Layout;
  shadow?: string;
  border?: string;
}

const APP_STYLES: StyleDef[] = [
  { name: "Minimalism & Swiss Style", bestFor: "Enterprise apps, dashboards", accent: "#1a1a1a", bg: "#ffffff", card: "#f5f5f5", text: "#111", radius: 4, font: "Inter", layout: "minimal" },
  { name: "Neumorphism", bestFor: "Health/wellness, meditation", accent: "#6C63FF", bg: "#e0e5ec", card: "#e0e5ec", text: "#333", radius: 20, font: "Inter", layout: "cards", shadow: "8px 8px 16px #b8bec7, -8px -8px 16px #ffffff" },
  { name: "Glassmorphism", bestFor: "Modern SaaS, financial", accent: "#7C5CFC", bg: "#0f0f23", card: "rgba(255,255,255,0.08)", text: "#f0f0f0", radius: 16, font: "Inter", layout: "cards", border: "1px solid rgba(255,255,255,0.15)" },
  { name: "Brutalism", bestFor: "Design portfolios, artistic", accent: "#FF3333", bg: "#ffffff", card: "#ffffff", text: "#000", radius: 0, font: "Menlo", layout: "editorial", border: "3px solid #000", shadow: "4px 4px 0 #000" },
  { name: "3D & Hyperrealism", bestFor: "Gaming, product showcase", accent: "#FF6B35", bg: "#0a0a0a", card: "#1a1a1a", text: "#f0f0f0", radius: 24, font: "Inter", layout: "hero" },
  { name: "Vibrant & Block-based", bestFor: "Startups, creative agencies", accent: "#FF5722", bg: "#FFF8E1", card: "#ffffff", text: "#1a1a1a", radius: 12, font: "Inter", layout: "cards" },
  { name: "Dark Mode (OLED)", bestFor: "Night-mode apps, coding", accent: "#00D4AA", bg: "#000000", card: "#111111", text: "#e0e0e0", radius: 12, font: "Menlo", layout: "dashboard" },
  { name: "Accessible & Ethical", bestFor: "Government, healthcare", accent: "#0066CC", bg: "#ffffff", card: "#f8f8f8", text: "#1a1a1a", radius: 8, font: "Georgia", layout: "app" },
  { name: "Claymorphism", bestFor: "Educational, children's apps", accent: "#FFA07A", bg: "#f0ebe3", card: "#f0ebe3", text: "#333", radius: 24, font: "Inter", layout: "cards", shadow: "6px 6px 12px #d4cfc7, -2px -2px 8px #ffffff" },
  { name: "Aurora UI", bestFor: "Modern SaaS, creative", accent: "#6366F1", bg: "#0f172a", card: "#1e293b", text: "#e2e8f0", radius: 16, font: "Inter", layout: "dashboard" },
  { name: "Retro-Futurism", bestFor: "Gaming, entertainment", accent: "#FF00FF", bg: "#0a001a", card: "#1a0033", text: "#e0e0ff", radius: 8, font: "Menlo", layout: "hero" },
  { name: "Flat Design", bestFor: "Web apps, mobile, MVPs", accent: "#2196F3", bg: "#ffffff", card: "#f5f5f5", text: "#333", radius: 8, font: "Inter", layout: "app" },
  { name: "Skeuomorphism", bestFor: "Legacy, gaming, premium", accent: "#8B6914", bg: "#d4c5a0", card: "#c4b590", text: "#2a2a2a", radius: 12, font: "Georgia", layout: "app", shadow: "inset 0 1px 0 rgba(255,255,255,0.3), 0 4px 8px rgba(0,0,0,0.3)" },
  { name: "Liquid Glass", bestFor: "Premium SaaS, e-commerce", accent: "#60A5FA", bg: "#0c1220", card: "rgba(255,255,255,0.06)", text: "#e0e8f0", radius: 20, font: "Inter", layout: "cards", border: "1px solid rgba(255,255,255,0.1)" },
  { name: "Motion-Driven", bestFor: "Portfolio, storytelling", accent: "#EF4444", bg: "#18181b", card: "#27272a", text: "#fafafa", radius: 16, font: "Inter", layout: "hero" },
  { name: "Micro-interactions", bestFor: "Mobile, touchscreen UIs", accent: "#8B5CF6", bg: "#fafafa", card: "#ffffff", text: "#1a1a1a", radius: 16, font: "Inter", layout: "app" },
  { name: "Inclusive Design", bestFor: "Public services, education", accent: "#1B5E20", bg: "#ffffff", card: "#f1f8e9", text: "#1a1a1a", radius: 8, font: "Georgia", layout: "app" },
  { name: "Zero Interface", bestFor: "Voice assistants, AI", accent: "#00BCD4", bg: "#121212", card: "#1e1e1e", text: "#e0e0e0", radius: 32, font: "Inter", layout: "minimal" },
  { name: "Soft UI Evolution", bestFor: "Modern enterprise, SaaS", accent: "#5B8DEF", bg: "#eef1f5", card: "#eef1f5", text: "#2d3748", radius: 16, font: "Inter", layout: "cards", shadow: "6px 6px 12px #d1d5db, -4px -4px 10px #ffffff" },
  { name: "Neubrutalism", bestFor: "Gen Z brands, startups", accent: "#FFDD00", bg: "#ffffff", card: "#ffffff", text: "#000", radius: 0, font: "Inter", layout: "editorial", border: "2px solid #000", shadow: "4px 4px 0 #000" },
  { name: "Bento Box Grid", bestFor: "Dashboards, portfolios", accent: "#3B82F6", bg: "#09090b", card: "#18181b", text: "#fafafa", radius: 16, font: "Inter", layout: "dashboard" },
  { name: "Y2K Aesthetic", bestFor: "Fashion, music, Gen Z", accent: "#FF69B4", bg: "#ffe6f0", card: "#fff0f5", text: "#333", radius: 20, font: "Inter", layout: "cards" },
  { name: "Cyberpunk UI", bestFor: "Gaming, crypto", accent: "#00FFAA", bg: "#0a0a0a", card: "#111", text: "#00ff88", radius: 4, font: "Menlo", layout: "dashboard", border: "1px solid #00ff8840" },
  { name: "Organic Biophilic", bestFor: "Wellness, sustainability", accent: "#2D6A4F", bg: "#f8f5f0", card: "#f0ebe3", text: "#2d3436", radius: 20, font: "Georgia", layout: "app" },
  { name: "AI-Native UI", bestFor: "AI products, chatbots", accent: "#8B5CF6", bg: "#0f0f23", card: "#1a1a2e", text: "#e0e0f0", radius: 16, font: "Inter", layout: "minimal" },
  { name: "Memphis Design", bestFor: "Creative agencies, youth", accent: "#FF6B6B", bg: "#FFF9C4", card: "#ffffff", text: "#1a1a1a", radius: 0, font: "Inter", layout: "editorial" },
  { name: "Vaporwave", bestFor: "Music, gaming, portfolios", accent: "#E040FB", bg: "#1a0030", card: "#2a0050", text: "#e0c0ff", radius: 12, font: "Menlo", layout: "hero" },
  { name: "Dimensional Layering", bestFor: "Dashboards, modals", accent: "#6366F1", bg: "#f8fafc", card: "#ffffff", text: "#1e293b", radius: 16, font: "Inter", layout: "dashboard", shadow: "0 4px 24px rgba(0,0,0,0.08)" },
  { name: "Exaggerated Minimalism", bestFor: "Fashion, architecture", accent: "#000000", bg: "#ffffff", card: "#fafafa", text: "#000", radius: 0, font: "Playfair Display", layout: "minimal" },
  { name: "Kinetic Typography", bestFor: "Hero sections, marketing", accent: "#EF4444", bg: "#000000", card: "#111", text: "#ffffff", radius: 8, font: "Playfair Display", layout: "hero" },
  { name: "Parallax Storytelling", bestFor: "Brand storytelling", accent: "#D97706", bg: "#1c1917", card: "#292524", text: "#fafaf9", radius: 12, font: "Playfair Display", layout: "hero" },
  { name: "Swiss Modernism 2.0", bestFor: "Corporate, editorial", accent: "#DC2626", bg: "#ffffff", card: "#f5f5f5", text: "#111", radius: 0, font: "Inter", layout: "editorial" },
  { name: "HUD / Sci-Fi FUI", bestFor: "Sci-fi, cybersecurity", accent: "#00BFFF", bg: "#000810", card: "#001020", text: "#00d4ff", radius: 4, font: "Menlo", layout: "dashboard", border: "1px solid #00bfff30" },
  { name: "Pixel Art", bestFor: "Indie games, retro tools", accent: "#4ADE80", bg: "#1a1a2e", card: "#16213e", text: "#e0e0e0", radius: 0, font: "Menlo", layout: "cards" },
  { name: "Bento Grids", bestFor: "Product features, dashboards", accent: "#7C3AED", bg: "#fafafa", card: "#ffffff", text: "#1a1a1a", radius: 20, font: "Inter", layout: "dashboard" },
  { name: "Spatial UI (VisionOS)", bestFor: "VR/AR, spatial computing", accent: "#60A5FA", bg: "#f2f2f7", card: "rgba(255,255,255,0.7)", text: "#1c1c1e", radius: 24, font: "Inter", layout: "cards", border: "1px solid rgba(0,0,0,0.06)" },
  { name: "E-Ink / Paper", bestFor: "Reading, digital news", accent: "#555555", bg: "#f5f1eb", card: "#ebe7e0", text: "#2a2a2a", radius: 4, font: "Georgia", layout: "editorial" },
  { name: "Gen Z Chaos", bestFor: "Gen Z lifestyle, music", accent: "#FF3864", bg: "#000000", card: "#1a1a1a", text: "#ffffff", radius: 24, font: "Inter", layout: "hero" },
  { name: "Biomimetic / Organic", bestFor: "Biotech, health", accent: "#059669", bg: "#f0fdf4", card: "#dcfce7", text: "#14532d", radius: 32, font: "Inter", layout: "app" },
  { name: "Anti-Polish / Raw", bestFor: "Creative portfolios", accent: "#EF4444", bg: "#fafaf9", card: "#f5f5f4", text: "#1c1917", radius: 0, font: "Menlo", layout: "editorial", border: "1px solid #1c1917" },
  { name: "Tactile / Deformable UI", bestFor: "Playful brands, mobile", accent: "#F472B6", bg: "#fdf2f8", card: "#fce7f3", text: "#831843", radius: 28, font: "Inter", layout: "cards", shadow: "0 8px 24px rgba(244,114,182,0.2)" },
  { name: "Nature Distilled", bestFor: "Wellness, sustainable", accent: "#65A30D", bg: "#fefce8", card: "#f7fee7", text: "#365314", radius: 16, font: "Georgia", layout: "app" },
  { name: "Interactive Cursor", bestFor: "Creative portfolios", accent: "#A855F7", bg: "#0c0a09", card: "#1c1917", text: "#fafaf9", radius: 12, font: "Inter", layout: "hero" },
  { name: "Voice-First Multimodal", bestFor: "Voice assistants, a11y", accent: "#06B6D4", bg: "#0f172a", card: "#1e293b", text: "#e2e8f0", radius: 32, font: "Inter", layout: "minimal" },
  { name: "3D Product Preview", bestFor: "E-commerce, furniture", accent: "#EA580C", bg: "#ffffff", card: "#f5f5f5", text: "#1a1a1a", radius: 16, font: "Inter", layout: "cards" },
  { name: "Gradient Mesh / Aurora", bestFor: "Hero sections, creative", accent: "#818CF8", bg: "#0f0524", card: "#1a103a", text: "#e0e0ff", radius: 20, font: "Inter", layout: "hero" },
  { name: "Editorial Grid", bestFor: "News, blogs, magazines", accent: "#B91C1C", bg: "#ffffff", card: "#f9fafb", text: "#111827", radius: 4, font: "Playfair Display", layout: "editorial" },
  { name: "Chromatic Aberration", bestFor: "Music, gaming, tech", accent: "#FF0066", bg: "#050505", card: "#111", text: "#ffffff", radius: 8, font: "Menlo", layout: "hero" },
  { name: "Vintage Analog", bestFor: "Photography, music/vinyl", accent: "#92400E", bg: "#FEF3C7", card: "#FDE68A", text: "#451A03", radius: 8, font: "Georgia", layout: "editorial" },
];

const LANDING_STYLES: StyleDef[] = [
  { name: "Hero-Centric", bestFor: "Strong visual identity", accent: "#6366F1", bg: "#000000", card: "#111", text: "#fff", radius: 16, font: "Playfair Display", layout: "hero" },
  { name: "Conversion-Optimized", bestFor: "Lead gen, sales pages", accent: "#16A34A", bg: "#ffffff", card: "#f0fdf4", text: "#111", radius: 12, font: "Inter", layout: "app" },
  { name: "Feature-Rich Showcase", bestFor: "SaaS, complex products", accent: "#3B82F6", bg: "#0f172a", card: "#1e293b", text: "#e2e8f0", radius: 12, font: "Inter", layout: "cards" },
  { name: "Minimal & Direct", bestFor: "Simple products, apps", accent: "#000000", bg: "#ffffff", card: "#fafafa", text: "#000", radius: 8, font: "Inter", layout: "minimal" },
  { name: "Social Proof-Focused", bestFor: "Services, B2C products", accent: "#F59E0B", bg: "#FFFBEB", card: "#ffffff", text: "#1a1a1a", radius: 16, font: "Inter", layout: "app" },
  { name: "Interactive Product Demo", bestFor: "Software, tools", accent: "#8B5CF6", bg: "#0c0a09", card: "#1c1917", text: "#fafaf9", radius: 16, font: "Inter", layout: "hero" },
  { name: "Trust & Authority", bestFor: "B2B, enterprise", accent: "#1E40AF", bg: "#ffffff", card: "#f0f4ff", text: "#1e293b", radius: 8, font: "Georgia", layout: "editorial" },
  { name: "Storytelling-Driven", bestFor: "Brands, agencies", accent: "#D97706", bg: "#1c1917", card: "#292524", text: "#fafaf9", radius: 12, font: "Playfair Display", layout: "hero" },
];

const DASHBOARD_STYLES: StyleDef[] = [
  { name: "Data-Dense Dashboard", bestFor: "Complex data analysis", accent: "#3B82F6", bg: "#0f172a", card: "#1e293b", text: "#cbd5e1", radius: 8, font: "Inter", layout: "dashboard" },
  { name: "Heat Map Style", bestFor: "Geographic/behavior data", accent: "#EF4444", bg: "#18181b", card: "#27272a", text: "#e4e4e7", radius: 8, font: "Inter", layout: "dashboard" },
  { name: "Executive Dashboard", bestFor: "C-suite summaries", accent: "#1E40AF", bg: "#ffffff", card: "#f8fafc", text: "#1e293b", radius: 12, font: "Inter", layout: "dashboard" },
  { name: "Real-Time Monitoring", bestFor: "Operations, DevOps", accent: "#22C55E", bg: "#020617", card: "#0f172a", text: "#4ade80", radius: 8, font: "Menlo", layout: "dashboard", border: "1px solid #22c55e30" },
  { name: "Drill-Down Analytics", bestFor: "Detailed exploration", accent: "#8B5CF6", bg: "#fafafa", card: "#ffffff", text: "#1a1a1a", radius: 12, font: "Inter", layout: "dashboard" },
  { name: "Comparative Analysis", bestFor: "Side-by-side comparisons", accent: "#0EA5E9", bg: "#f0f9ff", card: "#ffffff", text: "#0c4a6e", radius: 8, font: "Inter", layout: "dashboard" },
  { name: "Predictive Analytics", bestFor: "Forecasting, ML insights", accent: "#A855F7", bg: "#0c0a09", card: "#1c1917", text: "#d8b4fe", radius: 16, font: "Inter", layout: "dashboard" },
  { name: "User Behavior Analytics", bestFor: "UX research, product", accent: "#F97316", bg: "#ffffff", card: "#fff7ed", text: "#1a1a1a", radius: 12, font: "Inter", layout: "dashboard" },
  { name: "Financial Dashboard", bestFor: "Finance, accounting", accent: "#059669", bg: "#ffffff", card: "#f0fdf4", text: "#14532d", radius: 8, font: "Inter", layout: "dashboard" },
  { name: "Sales Intelligence", bestFor: "Sales teams, CRM", accent: "#2563EB", bg: "#f8fafc", card: "#ffffff", text: "#1e293b", radius: 12, font: "Inter", layout: "dashboard" },
];

type Category = "app" | "landing" | "dashboard";

export function Styles({ navigate }: Props) {
  const [category, setCategory] = useState<Category>("app");
  const [selected, setSelected] = useState<StyleDef>(APP_STYLES[0]);
  const [search, setSearch] = useState("");

  const styles = category === "app" ? APP_STYLES : category === "landing" ? LANDING_STYLES : DASHBOARD_STYLES;
  const filtered = useMemo(() => {
    if (!search) return styles;
    const q = search.toLowerCase();
    return styles.filter((s) => s.name.toLowerCase().includes(q) || s.bestFor.toLowerCase().includes(q));
  }, [styles, search]);

  const isDark = selected.bg.startsWith("#0") || selected.bg.startsWith("#1") || selected.bg === "#000000" || selected.bg === "#000810";
  const cardStyle = {
    background: selected.card,
    borderRadius: `${selected.radius}px`,
    border: selected.border || `1px solid ${isDark ? "#ffffff10" : "#00000010"}`,
    boxShadow: selected.shadow || "none",
  };
  const mutedLine = isDark ? "#444" : "#ddd";
  const dimLine = isDark ? "#333" : "#e5e5e5";

  const renderMockup = () => {
    switch (selected.layout) {
      case "dashboard":
        return (
          <div className="sp-body">
            <div className="sp-nav" style={{ borderColor: dimLine }}>
              <div className="sp-avatar" style={{ background: selected.accent }} />
              <span style={{ fontWeight: 700, fontSize: 14 }}>Dashboard</span>
            </div>
            {/* Stats row */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginBottom: 10 }}>
              {[{ v: "12.4k", l: "Users" }, { v: "$84k", l: "Revenue" }, { v: "94%", l: "Uptime" }, { v: "2.1k", l: "Events" }].map((s) => (
                <div key={s.l} style={{ ...cardStyle, padding: "10px 8px", textAlign: "center" as const }}>
                  <strong style={{ color: selected.accent, fontSize: 15, display: "block" }}>{s.v}</strong>
                  <span style={{ fontSize: 9, opacity: 0.6 }}>{s.l}</span>
                </div>
              ))}
            </div>
            {/* Chart placeholder */}
            <div style={{ ...cardStyle, padding: 12, marginBottom: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <div style={{ width: 60, height: 8, borderRadius: 4, background: mutedLine }} />
                <div style={{ width: 30, height: 8, borderRadius: 4, background: dimLine }} />
              </div>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 60 }}>
                {[40, 65, 45, 80, 55, 70, 90, 60, 75, 50].map((h, i) => (
                  <div key={i} style={{ flex: 1, height: `${h}%`, background: i === 6 ? selected.accent : `${selected.accent}40`, borderRadius: `${Math.min(selected.radius, 4)}px` }} />
                ))}
              </div>
            </div>
            {/* Table rows */}
            {[70, 55, 85].map((w, i) => (
              <div key={i} style={{ ...cardStyle, display: "flex", alignItems: "center", gap: 8, padding: 10, marginBottom: 4 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: i === 0 ? selected.accent : `${selected.accent}60` }} />
                <div style={{ width: `${w}%`, height: 8, borderRadius: 4, background: mutedLine }} />
                <div style={{ marginLeft: "auto", width: 30, height: 8, borderRadius: 4, background: dimLine }} />
              </div>
            ))}
          </div>
        );

      case "hero":
        return (
          <div className="sp-body">
            {/* Big hero */}
            <div style={{ background: selected.accent, borderRadius: `${selected.radius}px`, padding: "32px 18px", marginBottom: 14, textAlign: "center" as const }}>
              <span style={{ fontSize: 22, fontWeight: 800, display: "block", color: "#fff" }}>Bold.</span>
              <small style={{ fontSize: 11, opacity: 0.8, color: "#fff", display: "block", marginTop: 4 }}>Your next big idea starts here</small>
              <div style={{ marginTop: 14, display: "inline-block", padding: "8px 20px", borderRadius: `${selected.radius}px`, background: "rgba(255,255,255,0.2)", color: "#fff", fontSize: 12, fontWeight: 600 }}>
                Get Started
              </div>
            </div>
            {/* Feature cards */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {[selected.accent, `${selected.accent}80`, `${selected.accent}50`, `${selected.accent}30`].map((c, i) => (
                <div key={i} style={{ ...cardStyle, padding: 14 }}>
                  <div style={{ width: 24, height: 24, borderRadius: `${Math.min(selected.radius, 8)}px`, background: c, marginBottom: 8 }} />
                  <div style={{ width: "70%", height: 8, borderRadius: 4, background: mutedLine, marginBottom: 4 }} />
                  <div style={{ width: "90%", height: 6, borderRadius: 3, background: dimLine }} />
                </div>
              ))}
            </div>
          </div>
        );

      case "editorial":
        return (
          <div className="sp-body">
            <div style={{ borderBottom: `2px solid ${selected.text}`, paddingBottom: 8, marginBottom: 12 }}>
              <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: 2 }}>Featured</span>
            </div>
            <div style={{ fontSize: 20, fontWeight: 800, lineHeight: 1.2, marginBottom: 6 }}>The Future of Design</div>
            <div style={{ width: "80%", height: 8, borderRadius: 4, background: mutedLine, marginBottom: 4 }} />
            <div style={{ width: "60%", height: 8, borderRadius: 4, background: dimLine, marginBottom: 14 }} />
            <div style={{ ...cardStyle, height: 80, marginBottom: 14, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: 40, height: 40, borderRadius: `${Math.min(selected.radius, 8)}px`, background: selected.accent }} />
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <div style={{ flex: 1, borderTop: selected.border || `2px solid ${selected.accent}`, paddingTop: 8 }}>
                <div style={{ fontSize: 11, fontWeight: 700, marginBottom: 4 }}>Article 1</div>
                <div style={{ width: "100%", height: 6, borderRadius: 3, background: dimLine }} />
              </div>
              <div style={{ flex: 1, borderTop: `2px solid ${dimLine}`, paddingTop: 8 }}>
                <div style={{ fontSize: 11, fontWeight: 700, marginBottom: 4 }}>Article 2</div>
                <div style={{ width: "100%", height: 6, borderRadius: 3, background: dimLine }} />
              </div>
            </div>
          </div>
        );

      case "cards":
        return (
          <div className="sp-body">
            <div className="sp-nav" style={{ borderColor: dimLine }}>
              <div className="sp-avatar" style={{ background: selected.accent }} />
              <span style={{ fontWeight: 700, fontSize: 14 }}>Explore</span>
            </div>
            {/* Stacked cards */}
            {[100, 80, 60].map((w, i) => (
              <div key={i} style={{ ...cardStyle, padding: 14, marginBottom: 10, ...(i > 0 ? { marginLeft: i * 4, marginRight: i * 4 } : {}) }}>
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <div style={{ width: 44, height: 44, borderRadius: `${Math.min(selected.radius, 12)}px`, background: i === 0 ? selected.accent : `${selected.accent}${60 - i * 20}`, flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ width: `${w}%`, height: 10, borderRadius: 5, background: mutedLine, marginBottom: 5 }} />
                    <div style={{ width: `${w - 20}%`, height: 7, borderRadius: 4, background: dimLine }} />
                  </div>
                </div>
              </div>
            ))}
            <div className="sp-bottom-btn" style={{ background: selected.accent, borderRadius: `${selected.radius}px`, marginTop: 8 }}>
              View All
            </div>
          </div>
        );

      case "minimal":
        return (
          <div className="sp-body" style={{ display: "flex", flexDirection: "column", justifyContent: "center", minHeight: 300, textAlign: "center" as const }}>
            <div style={{ fontSize: 28, fontWeight: 800, lineHeight: 1.1, marginBottom: 8 }}>Hello.</div>
            <div style={{ fontSize: 12, opacity: 0.5, marginBottom: 30 }}>Less is more.</div>
            <div style={{ width: 48, height: 48, borderRadius: `${selected.radius}px`, background: selected.accent, margin: "0 auto 24px" }} />
            <div style={{ width: "60%", height: 8, borderRadius: 4, background: mutedLine, margin: "0 auto 6px" }} />
            <div style={{ width: "40%", height: 6, borderRadius: 3, background: dimLine, margin: "0 auto 30px" }} />
            <div className="sp-bottom-btn" style={{ background: "transparent", border: `1px solid ${selected.accent}`, color: selected.accent, borderRadius: `${selected.radius}px` }}>
              Enter
            </div>
          </div>
        );

      default: // "app"
        return (
          <div className="sp-body">
            <div className="sp-nav" style={{ borderColor: dimLine }}>
              <div className="sp-avatar" style={{ background: selected.accent }} />
              <span style={{ fontWeight: 700 }}>MyApp</span>
            </div>
            <div className="sp-hero" style={{ background: selected.accent, borderRadius: `${selected.radius}px` }}>
              <span>Welcome back</span>
              <small>Your dashboard is ready</small>
            </div>
            <div className="sp-list">
              {["Recent", "Settings", "Profile"].map((item, i) => (
                <div key={i} style={{ ...cardStyle, display: "flex", alignItems: "center", gap: 12, padding: 12, marginBottom: 6 }}>
                  <div style={{ width: 32, height: 32, borderRadius: `${Math.min(selected.radius, 12)}px`, background: i === 0 ? selected.accent : `${selected.accent}60`, flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ width: `${70 - i * 10}%`, height: 10, borderRadius: 5, background: mutedLine }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="sp-bottom-btn" style={{ background: selected.accent, borderRadius: `${selected.radius}px` }}>
              Get Started
            </div>
          </div>
        );
    }
  };

  return (
    <div className="styles-page">
      <div className="styles-header">
        <h1>Style Studio</h1>
        <p>Choose from {APP_STYLES.length + LANDING_STYLES.length + DASHBOARD_STYLES.length} built-in design styles or customize your own.</p>
      </div>

      <div className="styles-layout">
        {/* Left column */}
        <div className="styles-left-col">
          {/* Style picker */}
          <div className="styles-picker-section">
            <h3 className="styles-palette-heading">Design Styles</h3>
            <div className="styles-picker-row">
              <select
                className="styles-select"
                value={category}
                onChange={(e) => { setCategory(e.target.value as Category); setSearch(""); }}
              >
                <option value="app">App Styles ({APP_STYLES.length})</option>
                <option value="landing">Landing Pages ({LANDING_STYLES.length})</option>
                <option value="dashboard">Dashboards ({DASHBOARD_STYLES.length})</option>
              </select>
              <input
                type="text"
                className="styles-search"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="styles-dropdown-wrap">
              <select
                className="styles-dropdown"
                value={selected.name}
                onChange={(e) => {
                  const all = [...APP_STYLES, ...LANDING_STYLES, ...DASHBOARD_STYLES];
                  const found = all.find((s) => s.name === e.target.value);
                  if (found) setSelected(found);
                }}
              >
                {filtered.map((s, i) => (
                  <option key={s.name} value={s.name}>{i + 1}. {s.name} — {s.bestFor}</option>
                ))}
              </select>
            </div>
            {/* Quick picks grid */}
            <div className="styles-quick-grid">
              {filtered.slice(0, 12).map((s) => (
                <button
                  key={s.name}
                  className={`styles-quick-pick ${selected.name === s.name ? "active" : ""}`}
                  onClick={() => setSelected(s)}
                  title={`${s.name} — ${s.bestFor}`}
                >
                  <div className="styles-quick-pick-colors">
                    <span style={{ background: s.accent }} />
                    <span style={{ background: s.bg }} />
                    <span style={{ background: s.card }} />
                  </div>
                  <span className="styles-quick-pick-name">{s.name}</span>
                </button>
              ))}
            </div>
            {filtered.length > 12 && (
              <p className="styles-more-hint">+ {filtered.length - 12} more in dropdown above</p>
            )}
          </div>

          {/* Color Palettes — inline */}
          <div className="styles-inline-section">
            <h3 className="styles-palette-heading">Color Palettes</h3>
            <p className="styles-palette-sub">Click a palette to apply it to the preview.</p>
            <div className="palette-grid">
              {[
                { name: "Midnight Ocean", colors: ["#0f172a", "#1e3a5f", "#3b82f6", "#93c5fd", "#e0f2fe"], tags: "SaaS, Finance" },
                { name: "Sunset Warmth", colors: ["#451a03", "#92400e", "#f59e0b", "#fcd34d", "#fef3c7"], tags: "Food, Travel" },
                { name: "Forest Canopy", colors: ["#052e16", "#166534", "#22c55e", "#86efac", "#f0fdf4"], tags: "Health, Eco" },
                { name: "Berry Bliss", colors: ["#4a044e", "#86198f", "#d946ef", "#f0abfc", "#fdf4ff"], tags: "Beauty, Fashion" },
                { name: "Coral Reef", colors: ["#431407", "#c2410c", "#fb923c", "#fed7aa", "#fff7ed"], tags: "Fitness, Energy" },
                { name: "Arctic", colors: ["#0c4a6e", "#0284c7", "#38bdf8", "#bae6fd", "#f0f9ff"], tags: "Tech, Medical" },
                { name: "Lavender Fields", colors: ["#2e1065", "#6d28d9", "#a78bfa", "#ddd6fe", "#f5f3ff"], tags: "Creative, AI" },
                { name: "Espresso", colors: ["#1c1917", "#44403c", "#78716c", "#a8a29e", "#f5f5f4"], tags: "Luxury, Minimal" },
                { name: "Neon Nights", colors: ["#000000", "#14b8a6", "#f43f5e", "#a855f7", "#facc15"], tags: "Gaming, Music" },
                { name: "Spring Garden", colors: ["#365314", "#65a30d", "#a3e635", "#d9f99d", "#fefce8"], tags: "Organic, Nature" },
                { name: "Monochrome", colors: ["#000000", "#333333", "#666666", "#aaaaaa", "#ffffff"], tags: "Editorial, Swiss" },
                { name: "Candy Pop", colors: ["#be185d", "#ec4899", "#f9a8d4", "#60a5fa", "#34d399"], tags: "Gen Z, Y2K" },
              ].map((p) => (
                <div key={p.name} className="palette-card" onClick={() => {
                  const dark = p.colors[0].startsWith("#0") || p.colors[0] === "#000000";
                  setSelected({ ...selected, accent: p.colors[2], bg: p.colors[0], card: dark ? p.colors[1] : p.colors[4], text: dark ? "#f0f0f0" : "#1a1a1a" });
                }}>
                  <div className="palette-swatches">
                    {p.colors.map((c) => <div key={c} className="palette-swatch" style={{ background: c }} />)}
                  </div>
                  <div className="palette-info">
                    <span className="palette-name">{p.name}</span>
                    <span className="palette-tags">{p.tags}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Font Pairings — inline */}
          <div className="styles-inline-section">
            <h3 className="styles-palette-heading">Font Pairings</h3>
            <p className="styles-palette-sub">Click a pairing to apply it to the preview.</p>
            <div className="font-pair-grid">
              {[
                { heading: "Inter", body: "Inter", style: "Clean & Modern", bestFor: "SaaS, Dashboards, Apps", sample: "The quick brown fox" },
                { heading: "Playfair Display", body: "Inter", style: "Elegant & Professional", bestFor: "Luxury, Editorial, Finance", sample: "The quick brown fox" },
                { heading: "Georgia", body: "Georgia", style: "Classic & Trustworthy", bestFor: "Government, Education, Law", sample: "The quick brown fox" },
                { heading: "Menlo", body: "Inter", style: "Technical & Precise", bestFor: "Developer tools, Coding, DevOps", sample: "const x = 42;" },
                { heading: "Playfair Display", body: "Georgia", style: "Editorial & Rich", bestFor: "Magazines, Blogs, Publishing", sample: "The quick brown fox" },
                { heading: "Inter", body: "Georgia", style: "Modern + Classic", bestFor: "Corporate, Healthcare, B2B", sample: "The quick brown fox" },
              ].map((f) => (
                <div key={f.style} className="font-pair-card" onClick={() => setSelected({ ...selected, font: f.heading })}>
                  <div className="font-pair-preview">
                    <span className="font-pair-heading" style={{ fontFamily: f.heading }}>{f.sample}</span>
                    <span className="font-pair-body" style={{ fontFamily: f.body }}>
                      Body text in {f.body}. Clean and readable for long-form content.
                    </span>
                  </div>
                  <div className="font-pair-meta">
                    <div>
                      <span className="font-pair-name">{f.heading} + {f.body}</span>
                      <span className="font-pair-style">{f.style}</span>
                    </div>
                    <span className="font-pair-for">{f.bestFor}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column: sticky preview */}
        <div className="styles-preview-area">
          <div className="styles-phone-frame" style={{ background: selected.bg, color: selected.text, fontFamily: selected.font }}>
            <div className="sp-status">
              <span>9:41</span>
              <span className="sp-notch" />
              <span>100%</span>
            </div>
            {renderMockup()}
          </div>

          <div className="styles-spec">
            <h4>{selected.name}</h4>
            <p className="styles-spec-for">{selected.bestFor}</p>
            <div className="styles-spec-grid">
              <div className="styles-spec-item">
                <span className="styles-spec-label">Accent</span>
                <div className="styles-spec-val"><div className="styles-spec-dot" style={{ background: selected.accent }} />{selected.accent.toUpperCase()}</div>
              </div>
              <div className="styles-spec-item">
                <span className="styles-spec-label">Background</span>
                <div className="styles-spec-val"><div className="styles-spec-dot" style={{ background: selected.bg }} />{selected.bg.toUpperCase()}</div>
              </div>
              <div className="styles-spec-item">
                <span className="styles-spec-label">Font</span>
                <span className="styles-spec-val">{selected.font}</span>
              </div>
              <div className="styles-spec-item">
                <span className="styles-spec-label">Radius</span>
                <span className="styles-spec-val">{selected.radius}px</span>
              </div>
            </div>
            <button className="btn-primary" style={{ background: selected.accent, width: "100%", justifyContent: "center", marginTop: 16 }} onClick={() => {
              sessionStorage.setItem("selected_style", JSON.stringify({
                name: selected.name,
                colors: { primary: selected.accent, background: selected.bg, surface: selected.card, text: selected.text },
                font: selected.font,
                radius: selected.radius,
                style: selected.name,
              }));
              navigate("/create");
            }}>
              Use This Style
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
