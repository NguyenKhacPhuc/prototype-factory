const { useState, useEffect, useRef } = React;

const themes = {
  dark: {
    bg: "#080C14",
    surface: "#0F1624",
    card: "#161E2E",
    cardAlt: "#1A2438",
    border: "#1E2A3D",
    borderLight: "#253045",
    primary: "#00C9A7",
    primaryDim: "rgba(0,201,167,0.12)",
    primaryGlow: "rgba(0,201,167,0.25)",
    secondary: "#6C63FF",
    secondaryDim: "rgba(108,99,255,0.12)",
    text: "#EEF2FF",
    textSecondary: "#7A90B4",
    textMuted: "#4A5A78",
    success: "#34D399",
    successDim: "rgba(52,211,153,0.12)",
    warning: "#FBBF24",
    warningDim: "rgba(251,191,36,0.12)",
    danger: "#F87171",
    dangerDim: "rgba(248,113,113,0.12)",
    info: "#60A5FA",
    infoDim: "rgba(96,165,250,0.12)",
    gradient: "linear-gradient(135deg, #00C9A7, #6C63FF)",
    navBg: "#0A0F1E",
    statusBg: "transparent",
  },
  light: {
    bg: "#EDF0F7",
    surface: "#FFFFFF",
    card: "#F8FAFF",
    cardAlt: "#EEF2FF",
    border: "#DDE4F0",
    borderLight: "#E8EDF8",
    primary: "#00A88A",
    primaryDim: "rgba(0,168,138,0.10)",
    primaryGlow: "rgba(0,168,138,0.20)",
    secondary: "#5B52E8",
    secondaryDim: "rgba(91,82,232,0.10)",
    text: "#0D1829",
    textSecondary: "#5A6A84",
    textMuted: "#94A3B8",
    success: "#059669",
    successDim: "rgba(5,150,105,0.10)",
    warning: "#D97706",
    warningDim: "rgba(217,119,6,0.10)",
    danger: "#DC2626",
    dangerDim: "rgba(220,38,38,0.10)",
    info: "#2563EB",
    infoDim: "rgba(37,99,235,0.10)",
    gradient: "linear-gradient(135deg, #00A88A, #5B52E8)",
    navBg: "#FFFFFF",
    statusBg: "transparent",
  },
};

const fontUrl = "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap";

const iconStyle = (size = 18) => ({ width: size, height: size });

function StatusBar({ t, isDark }) {
  const [time, setTime] = useState(() => {
    const now = new Date();
    return now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false });
  });
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false }));
    }, 30000);
    return () => clearInterval(timer);
  }, []);

  const WifiIcon = window.lucide.Wifi;
  const BatteryFullIcon = window.lucide.BatteryFull;
  const SignalIcon = window.lucide.Signal;

  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 20px 4px", position: "relative", zIndex: 10 }}>
      <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 14, color: t.text }}>{time}</span>
      <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", width: 120, height: 32, background: "#000", borderRadius: 20, top: 8 }} />
      <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
        <SignalIcon style={{ ...iconStyle(14), color: t.text }} />
        <WifiIcon style={{ ...iconStyle(14), color: t.text }} />
        <BatteryFullIcon style={{ ...iconStyle(16), color: t.text }} />
      </div>
    </div>
  );
}

function BottomNav({ activeTab, setActiveTab, t }) {
  const HomeIcon = window.lucide.Home;
  const PlusCircleIcon = window.lucide.PlusCircle;
  const ListIcon = window.lucide.List;
  const BarChart2Icon = window.lucide.BarChart2;

  const tabs = [
    { id: "home", label: "Home", Icon: HomeIcon },
    { id: "brief", label: "New Brief", Icon: PlusCircleIcon },
    { id: "lists", label: "My Lists", Icon: ListIcon },
    { id: "insights", label: "Insights", Icon: BarChart2Icon },
  ];

  return (
    <div style={{
      display: "flex", borderTop: `1px solid ${t.border}`,
      background: t.navBg, padding: "8px 0 12px", flexShrink: 0,
    }}>
      {tabs.map(({ id, label, Icon }) => {
        const active = activeTab === id;
        return (
          <button key={id} onClick={() => setActiveTab(id)}
            style={{
              flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
              background: "none", border: "none", cursor: "pointer", padding: "4px 0",
              transition: "all 0.15s",
            }}>
            <div style={{
              width: 40, height: 28, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center",
              background: active ? t.primaryDim : "transparent",
              transition: "all 0.2s",
            }}>
              <Icon style={{ ...iconStyle(20), color: active ? t.primary : t.textMuted, transition: "color 0.2s" }} />
            </div>
            <span style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 10, fontWeight: active ? 700 : 500,
              color: active ? t.primary : t.textMuted, letterSpacing: 0.3, transition: "color 0.2s",
            }}>{label}</span>
          </button>
        );
      })}
    </div>
  );
}

function Badge({ label, variant, t }) {
  const colors = {
    buy: { bg: t.successDim, text: t.success },
    borrow: { bg: t.secondaryDim, text: t.secondary },
    wait: { bg: t.warningDim, text: t.warning },
    used: { bg: t.infoDim, text: t.info },
    avoid: { bg: t.dangerDim, text: t.danger },
    new: { bg: t.primaryDim, text: t.primary },
  };
  const c = colors[variant] || colors.new;
  return (
    <span style={{
      background: c.bg, color: c.text, fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 20, letterSpacing: 0.5,
      textTransform: "uppercase",
    }}>{label}</span>
  );
}

function ScoreBar({ score, t }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <div style={{ flex: 1, height: 4, background: t.border, borderRadius: 4, overflow: "hidden" }}>
        <div style={{
          height: "100%", width: `${score}%`,
          background: score >= 70 ? t.success : score >= 40 ? t.warning : t.danger,
          borderRadius: 4, transition: "width 0.6s ease",
        }} />
      </div>
      <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 11, fontWeight: 700, color: t.textSecondary, minWidth: 24 }}>{score}</span>
    </div>
  );
}

// ─── SCREEN: HOME ────────────────────────────────────────────────────────────
function HomeScreen({ t, setActiveTab }) {
  const [pressedCard, setPressedCard] = useState(null);
  const ArrowRightIcon = window.lucide.ArrowRight;
  const CalendarIcon = window.lucide.Calendar;
  const SparklesIcon = window.lucide.Sparkles;
  const ClockIcon = window.lucide.Clock;
  const CheckCircleIcon = window.lucide.CheckCircle2;
  const TrendingDownIcon = window.lucide.TrendingDown;
  const ZapIcon = window.lucide.Zap;

  const briefs = [
    {
      id: 1, title: "Beach Vacation", subtitle: "Phuket · 10 days",
      icon: "🏖️", items: 7, ready: 3, progress: 43,
      due: "Apr 12", tag: "Upcoming",
    },
    {
      id: 2, title: "Home Office Upgrade", subtitle: "WFH improvement",
      icon: "💼", items: 5, ready: 5, progress: 100,
      due: "Done", tag: "Complete",
    },
    {
      id: 3, title: "Weekend Trail Run", subtitle: "Blue Ridge Trail",
      icon: "🏃", items: 4, ready: 1, progress: 25,
      due: "Apr 5", tag: "Urgent",
    },
  ];

  const events = [
    { icon: "🏖️", title: "Beach Vacation", date: "Apr 12", daysLeft: 21 },
    { icon: "🎂", title: "Mom's Birthday", date: "Apr 8", daysLeft: 17 },
    { icon: "🧳", title: "NY Business Trip", date: "Apr 22", daysLeft: 31 },
  ];

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "0 0 8px" }}>
      {/* Hero section */}
      <div style={{ padding: "8px 20px 20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
          <div>
            <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 13, color: t.textSecondary, margin: 0, fontWeight: 500 }}>Good morning</p>
            <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 22, fontWeight: 800, color: t.text, margin: "2px 0 0", letterSpacing: -0.5 }}>
              Alex Rivera
            </h1>
          </div>
          <div style={{
            width: 40, height: 40, borderRadius: 14, background: t.gradient,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 18, boxShadow: `0 4px 12px ${t.primaryGlow}`,
          }}>👤</div>
        </div>

        {/* Stats strip */}
        <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
          {[
            { label: "Saved", value: "$284", icon: TrendingDownIcon, color: t.success },
            { label: "Briefs", value: "6", icon: ZapIcon, color: t.primary },
            { label: "Items", value: "12", icon: CheckCircleIcon, color: t.secondary },
          ].map(({ label, value, icon: Icon, color }) => (
            <div key={label} style={{
              flex: 1, background: t.card, borderRadius: 14, padding: "10px 12px",
              border: `1px solid ${t.border}`, display: "flex", flexDirection: "column", gap: 6,
            }}>
              <Icon style={{ ...iconStyle(16), color }} />
              <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 16, fontWeight: 800, color: t.text, margin: 0 }}>{value}</p>
              <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 10, color: t.textSecondary, margin: 0, fontWeight: 500 }}>{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* New Brief CTA */}
      <div style={{ padding: "0 20px 20px" }}>
        <button onClick={() => setActiveTab("brief")} style={{
          width: "100%", padding: "14px 20px",
          background: t.gradient, border: "none", borderRadius: 16, cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          boxShadow: `0 8px 24px ${t.primaryGlow}`,
          transform: "scale(1)", transition: "transform 0.1s",
        }}
          onMouseDown={e => e.currentTarget.style.transform = "scale(0.97)"}
          onMouseUp={e => e.currentTarget.style.transform = "scale(1)"}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <SparklesIcon style={{ ...iconStyle(20), color: "#fff" }} />
            <div style={{ textAlign: "left" }}>
              <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14, fontWeight: 800, color: "#fff", margin: 0 }}>Start a New Brief</p>
              <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 11, color: "rgba(255,255,255,0.75)", margin: 0 }}>Turn your situation into a smart list</p>
            </div>
          </div>
          <ArrowRightIcon style={{ ...iconStyle(18), color: "#fff" }} />
        </button>
      </div>

      {/* Active Briefs */}
      <div style={{ padding: "0 20px 20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 15, fontWeight: 800, color: t.text, margin: 0 }}>Active Briefs</h2>
          <button onClick={() => setActiveTab("lists")} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 12, color: t.primary, fontWeight: 600, background: "none", border: "none", cursor: "pointer", padding: 0 }}>See all</button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {briefs.map((brief) => (
            <div key={brief.id}
              onMouseDown={() => setPressedCard(brief.id)}
              onMouseUp={() => setPressedCard(null)}
              onClick={() => setActiveTab("lists")}
              style={{
                background: t.card, borderRadius: 16, padding: "14px 16px",
                border: `1px solid ${t.border}`, cursor: "pointer",
                transform: pressedCard === brief.id ? "scale(0.98)" : "scale(1)",
                transition: "transform 0.1s",
              }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: t.cardAlt, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>
                  {brief.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14, fontWeight: 700, color: t.text, margin: 0 }}>{brief.title}</p>
                    <Badge label={brief.tag} variant={brief.tag === "Complete" ? "buy" : brief.tag === "Urgent" ? "avoid" : "new"} t={t} />
                  </div>
                  <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 12, color: t.textSecondary, margin: "2px 0 0" }}>{brief.subtitle}</p>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ flex: 1, height: 4, background: t.border, borderRadius: 4, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${brief.progress}%`, background: brief.progress === 100 ? t.success : t.primary, borderRadius: 4, transition: "width 0.6s" }} />
                </div>
                <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 11, color: t.textSecondary, fontWeight: 600, minWidth: 80, textAlign: "right" }}>
                  {brief.ready}/{brief.items} ready · {brief.due}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming events */}
      <div style={{ padding: "0 20px 8px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 15, fontWeight: 800, color: t.text, margin: 0 }}>Upcoming Events</h2>
          <CalendarIcon style={{ ...iconStyle(16), color: t.textSecondary }} />
        </div>
        <div style={{ display: "flex", gap: 10, overflowX: "auto", paddingBottom: 4 }}>
          {events.map((event, i) => (
            <div key={i} style={{
              minWidth: 120, background: t.card, borderRadius: 14, padding: "12px 14px",
              border: `1px solid ${t.border}`, flexShrink: 0,
            }}>
              <div style={{ fontSize: 22, marginBottom: 8 }}>{event.icon}</div>
              <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 12, fontWeight: 700, color: t.text, margin: "0 0 2px" }}>{event.title}</p>
              <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 11, color: t.textSecondary, margin: "0 0 6px" }}>{event.date}</p>
              <div style={{ background: t.primaryDim, borderRadius: 8, padding: "3px 8px", display: "inline-block" }}>
                <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 10, fontWeight: 700, color: t.primary }}>{event.daysLeft}d</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── SCREEN: BRIEF BUILDER ───────────────────────────────────────────────────
function BriefScreen({ t }) {
  const [step, setStep] = useState(0);
  const [situation, setSituation] = useState("");
  const [selectedScenario, setSelectedScenario] = useState(null);
  const [generated, setGenerated] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatingDots, setGeneratingDots] = useState(0);
  const SparklesIcon = window.lucide.Sparkles;
  const ChevronRightIcon = window.lucide.ChevronRight;
  const CheckIcon = window.lucide.Check;
  const ArrowLeftIcon = window.lucide.ArrowLeft;
  const XIcon = window.lucide.X;

  const scenarios = [
    { icon: "🏖️", label: "Vacation", desc: "Trip packing & gear" },
    { icon: "🏠", label: "Home Fix", desc: "Repairs & DIY" },
    { icon: "💼", label: "Work Trip", desc: "Business travel" },
    { icon: "🏋️", label: "Fitness", desc: "New workout routine" },
    { icon: "🎉", label: "Event", desc: "Party or occasion" },
    { icon: "🌿", label: "New Habit", desc: "Lifestyle change" },
  ];

  const generatedBrief = {
    title: "10-Day Beach Trip to Phuket",
    needs: [
      { item: "Reef-safe sunscreen SPF50+", action: "buy", score: 92, reason: "Daily use, compact size needed", price: "$18", saves: "$12 vs resort" },
      { item: "Lightweight tote bag", action: "borrow", score: 71, reason: "Used 10 days only, have similar", price: "$0", saves: "$32" },
      { item: "Portable charger 10,000mAh", action: "buy_used", score: 84, reason: "High frequency, carry-on fits", price: "$22", saves: "$18" },
      { item: "Water shoes", action: "wait", score: 38, reason: "Low use, rental available on-site", price: "—", saves: "$35" },
      { item: "Snorkel set", action: "rent", score: 44, reason: "Single trip use, bulky to pack", price: "$8/day", saves: "$60" },
    ],
  };

  useEffect(() => {
    if (isGenerating) {
      const interval = setInterval(() => setGeneratingDots(d => (d + 1) % 4), 400);
      return () => clearInterval(interval);
    }
  }, [isGenerating]);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setGenerated(true);
      setStep(2);
    }, 2200);
  };

  const actionVariant = { buy: "buy", borrow: "borrow", wait: "wait", buy_used: "used", rent: "info" };
  const actionLabel = { buy: "Buy New", borrow: "Borrow", wait: "Wait", buy_used: "Buy Used", rent: "Rent" };
  const actionIcon = { buy: "🛒", borrow: "🤝", wait: "⏳", buy_used: "♻️", rent: "📦" };

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "0 0 8px" }}>
      <div style={{ padding: "8px 20px 16px" }}>
        {step < 2 && (
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
            {step > 0 && (
              <button onClick={() => setStep(s => s - 1)} style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 10, width: 34, height: 34, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                <ArrowLeftIcon style={{ ...iconStyle(16), color: t.text }} />
              </button>
            )}
            <div>
              <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 20, fontWeight: 800, color: t.text, margin: 0, letterSpacing: -0.5 }}>Build a Brief</h1>
              <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 12, color: t.textSecondary, margin: "2px 0 0" }}>Describe your situation to get smart recommendations</p>
            </div>
          </div>
        )}

        {/* Step indicator */}
        {step < 2 && (
          <div style={{ display: "flex", gap: 6, marginBottom: 24 }}>
            {[0, 1].map(i => (
              <div key={i} style={{ flex: 1, height: 3, borderRadius: 3, background: i <= step ? t.primary : t.border, transition: "background 0.3s" }} />
            ))}
          </div>
        )}

        {/* Step 0: Pick scenario */}
        {step === 0 && (
          <div>
            <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14, fontWeight: 700, color: t.text, margin: "0 0 16px" }}>What's the situation?</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
              {scenarios.map((sc) => (
                <button key={sc.label} onClick={() => { setSelectedScenario(sc.label); setSituation(`${sc.label} — ${sc.desc}`); }}
                  style={{
                    background: selectedScenario === sc.label ? t.primaryDim : t.card,
                    border: `1px solid ${selectedScenario === sc.label ? t.primary : t.border}`,
                    borderRadius: 14, padding: "14px 14px", cursor: "pointer", textAlign: "left",
                    transition: "all 0.15s",
                  }}>
                  <div style={{ fontSize: 22, marginBottom: 6 }}>{sc.icon}</div>
                  <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 13, fontWeight: 700, color: t.text, margin: "0 0 2px" }}>{sc.label}</p>
                  <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 11, color: t.textSecondary, margin: 0 }}>{sc.desc}</p>
                </button>
              ))}
            </div>
            <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 13, fontWeight: 600, color: t.text, margin: "0 0 8px" }}>Or describe it yourself</p>
            <textarea
              value={situation}
              onChange={e => setSituation(e.target.value)}
              placeholder="e.g. I have a 10-day beach vacation in Phuket next month..."
              style={{
                width: "100%", minHeight: 80, background: t.card, border: `1px solid ${t.border}`,
                borderRadius: 14, padding: "12px 14px", color: t.text,
                fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 13, resize: "none",
                outline: "none", boxSizing: "border-box", lineHeight: 1.6,
              }}
            />
            <button
              onClick={() => situation.trim() && setStep(1)}
              disabled={!situation.trim()}
              style={{
                width: "100%", marginTop: 14, padding: "14px", background: situation.trim() ? t.gradient : t.border,
                border: "none", borderRadius: 14, color: situation.trim() ? "#fff" : t.textMuted,
                fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14, fontWeight: 700, cursor: situation.trim() ? "pointer" : "default",
                transition: "all 0.2s",
              }}>
              Continue →
            </button>
          </div>
        )}

        {/* Step 1: Refine */}
        {step === 1 && (
          <div>
            <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14, fontWeight: 700, color: t.text, margin: "0 0 16px" }}>Refine your brief</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { label: "Duration", placeholder: "e.g. 10 days", icon: "📅" },
                { label: "Budget", placeholder: "e.g. $200 total", icon: "💰" },
                { label: "Constraints", placeholder: "e.g. carry-on only", icon: "🎒" },
                { label: "Already owned", placeholder: "e.g. hiking boots, sunglasses", icon: "✅" },
              ].map(({ label, placeholder, icon }) => (
                <div key={label}>
                  <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 12, fontWeight: 700, color: t.textSecondary, margin: "0 0 6px", textTransform: "uppercase", letterSpacing: 0.5 }}>{icon} {label}</p>
                  <input placeholder={placeholder} style={{
                    width: "100%", background: t.card, border: `1px solid ${t.border}`,
                    borderRadius: 12, padding: "11px 14px", color: t.text,
                    fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 13, outline: "none",
                    boxSizing: "border-box",
                  }} />
                </div>
              ))}
            </div>
            <button onClick={handleGenerate} style={{
              width: "100%", marginTop: 20, padding: "14px", background: t.gradient,
              border: "none", borderRadius: 14, color: "#fff",
              fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14, fontWeight: 700, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              boxShadow: `0 6px 20px ${t.primaryGlow}`,
            }}>
              {isGenerating ? (
                <span>Analyzing{".".repeat(generatingDots)}</span>
              ) : (
                <><SparklesIcon style={{ ...iconStyle(16), color: "#fff" }} /> Generate Smart Brief</>
              )}
            </button>
          </div>
        )}

        {/* Step 2: Generated brief */}
        {step === 2 && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                  <SparklesIcon style={{ ...iconStyle(14), color: t.primary }} />
                  <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 11, color: t.primary, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5 }}>Smart Brief Ready</span>
                </div>
                <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 18, fontWeight: 800, color: t.text, margin: 0, letterSpacing: -0.5 }}>{generatedBrief.title}</h1>
              </div>
              <button onClick={() => { setStep(0); setGenerated(false); setSituation(""); setSelectedScenario(null); }}
                style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 10, width: 34, height: 34, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                <XIcon style={{ ...iconStyle(16), color: t.text }} />
              </button>
            </div>

            {/* Summary chips */}
            <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
              <div style={{ background: t.successDim, borderRadius: 20, padding: "4px 12px" }}>
                <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 11, color: t.success, fontWeight: 700 }}>Est. save $157</span>
              </div>
              <div style={{ background: t.primaryDim, borderRadius: 20, padding: "4px 12px" }}>
                <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 11, color: t.primary, fontWeight: 700 }}>5 items analyzed</span>
              </div>
              <div style={{ background: t.secondaryDim, borderRadius: 20, padding: "4px 12px" }}>
                <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 11, color: t.secondary, fontWeight: 700 }}>2 buy · 2 skip · 1 rent</span>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {generatedBrief.needs.map((need, i) => (
                <div key={i} style={{
                  background: t.card, borderRadius: 16, padding: "14px 16px",
                  border: `1px solid ${t.border}`,
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                    <div style={{ flex: 1, marginRight: 8 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
                        <span style={{ fontSize: 14 }}>{actionIcon[need.action]}</span>
                        <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 13, fontWeight: 700, color: t.text, margin: 0 }}>{need.item}</p>
                      </div>
                      <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 11, color: t.textSecondary, margin: "0 0 8px" }}>{need.reason}</p>
                      <ScoreBar score={need.score} t={t} />
                    </div>
                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                      <Badge label={actionLabel[need.action]} variant={actionVariant[need.action]} t={t} />
                      <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 13, fontWeight: 800, color: t.text, margin: "6px 0 0" }}>{need.price}</p>
                      <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 10, color: t.success, margin: 0, fontWeight: 600 }}>saves {need.saves}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button style={{
              width: "100%", marginTop: 16, padding: "14px", background: t.gradient,
              border: "none", borderRadius: 14, color: "#fff",
              fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14, fontWeight: 700, cursor: "pointer",
              boxShadow: `0 6px 20px ${t.primaryGlow}`,
            }}>
              <CheckIcon style={{ ...iconStyle(16), color: "#fff", display: "inline", marginRight: 6 }} />
              Save to My Lists
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── SCREEN: MY LISTS ────────────────────────────────────────────────────────
function ListsScreen({ t }) {
  const [activeList, setActiveList] = useState(null);
  const [checkedItems, setCheckedItems] = useState({});
  const ArrowLeftIcon = window.lucide.ArrowLeft;
  const CheckIcon = window.lucide.Check;
  const ChevronRightIcon = window.lucide.ChevronRight;
  const FilterIcon = window.lucide.Filter;

  const lists = [
    {
      id: "beach", icon: "🏖️", title: "Beach Vacation – Phuket", date: "Apr 12",
      total: 7, done: 3, saved: "$157",
      items: [
        { name: "Reef-safe sunscreen SPF50+", brand: "Stream2Sea", action: "buy", score: 92, price: "$18", note: "Compact 3oz, TSA-safe", durable: "High", freq: "Daily" },
        { name: "Portable charger 10,000mAh", brand: "Anker PowerCore", action: "buy_used", score: 84, price: "$22", note: "Carry-on friendly, USB-C", durable: "High", freq: "Daily" },
        { name: "Sand-friendly tote", brand: "Borrow from friend", action: "borrow", score: 71, price: "$0", note: "Used for 10 days only", durable: "Med", freq: "Daily" },
        { name: "Snorkel set", brand: "Rental on-site", action: "rent", score: 44, price: "$8/day", note: "Skip packing, save space", durable: "—", freq: "2x" },
        { name: "Water shoes", brand: "Skip", action: "wait", score: 38, price: "—", note: "Rental available on-site", durable: "—", freq: "1x" },
        { name: "Travel-size moisturizer", brand: "CeraVe", action: "buy", score: 88, price: "$9", note: "Repack from existing bottle", durable: "High", freq: "Daily" },
        { name: "Dry bag 5L", brand: "Sea to Summit", action: "buy_used", score: 78, price: "$14", note: "Waterproof for beach days", durable: "High", freq: "Daily" },
      ],
    },
    {
      id: "office", icon: "💼", title: "Home Office Upgrade", date: "Done",
      total: 5, done: 5, saved: "$94",
      items: [
        { name: "Ergonomic mouse", brand: "Logitech MX Master", action: "buy", score: 95, price: "$79", note: "Daily use, reduces strain", durable: "High", freq: "Daily" },
        { name: "Monitor riser", brand: "Ikea BRADA", action: "buy", score: 88, price: "$15", note: "Posture fix, long-term use", durable: "High", freq: "Daily" },
        { name: "Cable management kit", brand: "Amazon Basics", action: "buy", score: 80, price: "$11", note: "One-time setup", durable: "High", freq: "Once" },
        { name: "Desk lamp", brand: "Borrow from garage", action: "borrow", score: 65, price: "$0", note: "Had one unused", durable: "Med", freq: "Daily" },
        { name: "Standing mat", brand: "Topo Mini", action: "buy", score: 91, price: "$99", note: "Daily use, back health", durable: "High", freq: "Daily" },
      ],
    },
    {
      id: "run", icon: "🏃", title: "Weekend Trail Run", date: "Apr 5",
      total: 4, done: 1, saved: "$45",
      items: [
        { name: "Trail running shoes", brand: "Salomon Speedcross", action: "buy", score: 96, price: "$139", note: "Needed, high frequency", durable: "High", freq: "Weekly" },
        { name: "Hydration vest", brand: "Borrow from club", action: "borrow", score: 70, price: "$0", note: "Single event first try", durable: "Med", freq: "1x" },
        { name: "Energy gels", brand: "Maurten", action: "buy", score: 85, price: "$28", note: "Consumable, 4-pack needed", durable: "—", freq: "Race day" },
        { name: "Trail gaiters", brand: "Skip", action: "wait", score: 30, price: "—", note: "Not needed for this trail", durable: "—", freq: "0x" },
      ],
    },
  ];

  const actionVariant = { buy: "buy", borrow: "borrow", wait: "wait", buy_used: "used", rent: "info" };
  const actionLabel = { buy: "Buy New", borrow: "Borrow", wait: "Skip", buy_used: "Buy Used", rent: "Rent" };

  if (activeList) {
    const list = lists.find(l => l.id === activeList);
    const bought = list.items.filter((_, i) => checkedItems[`${activeList}-${i}`]).length;
    return (
      <div style={{ flex: 1, overflowY: "auto", padding: "0 0 8px" }}>
        <div style={{ padding: "8px 20px 16px" }}>
          <button onClick={() => setActiveList(null)} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", padding: 0, marginBottom: 16 }}>
            <ArrowLeftIcon style={{ ...iconStyle(16), color: t.textSecondary }} />
            <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 13, color: t.textSecondary, fontWeight: 600 }}>All Lists</span>
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
            <div style={{ width: 44, height: 44, borderRadius: 14, background: t.cardAlt, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>{list.icon}</div>
            <div>
              <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 18, fontWeight: 800, color: t.text, margin: 0 }}>{list.title}</h1>
              <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 12, color: t.textSecondary, margin: "2px 0 0" }}>{list.total} items · saves {list.saved}</p>
            </div>
          </div>

          <div style={{ height: 4, background: t.border, borderRadius: 4, overflow: "hidden", marginBottom: 20 }}>
            <div style={{ height: "100%", width: `${(bought / list.items.length) * 100}%`, background: t.primary, borderRadius: 4, transition: "width 0.4s" }} />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {list.items.map((item, i) => {
              const key = `${activeList}-${i}`;
              const checked = !!checkedItems[key];
              return (
                <div key={i} style={{
                  background: checked ? t.successDim : t.card,
                  border: `1px solid ${checked ? t.success : t.border}`,
                  borderRadius: 16, padding: "14px 16px", transition: "all 0.2s",
                }}>
                  <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <button onClick={() => setCheckedItems(prev => ({ ...prev, [key]: !prev[key] }))}
                      style={{
                        width: 24, height: 24, borderRadius: 8, flexShrink: 0, marginTop: 1,
                        background: checked ? t.success : "transparent",
                        border: `2px solid ${checked ? t.success : t.border}`,
                        cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                        transition: "all 0.2s",
                      }}>
                      {checked && <CheckIcon style={{ ...iconStyle(12), color: "#fff" }} />}
                    </button>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 2 }}>
                        <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 13, fontWeight: 700, color: checked ? t.textSecondary : t.text, margin: 0, textDecoration: checked ? "line-through" : "none" }}>{item.name}</p>
                        <Badge label={actionLabel[item.action]} variant={actionVariant[item.action]} t={t} />
                      </div>
                      <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 11, color: t.textMuted, margin: "0 0 8px" }}>{item.brand} · {item.note}</p>
                      <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                        <ScoreBar score={item.score} t={t} />
                        <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 13, fontWeight: 800, color: item.action === "borrow" || item.action === "wait" ? t.success : t.text, flexShrink: 0 }}>{item.price}</span>
                      </div>
                      <div style={{ display: "flex", gap: 12, marginTop: 6 }}>
                        {[["Durability", item.durable], ["Usage", item.freq]].map(([label, val]) => (
                          <span key={label} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 10, color: t.textMuted, fontWeight: 500 }}>
                            <span style={{ color: t.textSecondary, fontWeight: 700 }}>{label}: </span>{val}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "0 0 8px" }}>
      <div style={{ padding: "8px 20px 16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <div>
            <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 20, fontWeight: 800, color: t.text, margin: 0 }}>My Lists</h1>
            <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 12, color: t.textSecondary, margin: "2px 0 0" }}>3 active · all time saved $336</p>
          </div>
          <button style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 10, width: 34, height: 34, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            <FilterIcon style={{ ...iconStyle(16), color: t.textSecondary }} />
          </button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {lists.map(list => (
            <button key={list.id} onClick={() => setActiveList(list.id)}
              style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 18, padding: "16px", textAlign: "left", cursor: "pointer", width: "100%", transition: "transform 0.1s" }}
              onMouseDown={e => e.currentTarget.style.transform = "scale(0.98)"}
              onMouseUp={e => e.currentTarget.style.transform = "scale(1)"}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                <div style={{ width: 46, height: 46, borderRadius: 14, background: t.cardAlt, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>{list.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14, fontWeight: 700, color: t.text, margin: 0 }}>{list.title}</p>
                    <ChevronRightIcon style={{ ...iconStyle(16), color: t.textMuted }} />
                  </div>
                  <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
                    <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 11, color: t.textSecondary }}>{list.date}</span>
                    <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 11, color: t.success, fontWeight: 700 }}>saves {list.saved}</span>
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ flex: 1, height: 4, background: t.border, borderRadius: 4, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${(list.done / list.total) * 100}%`, background: list.done === list.total ? t.success : t.primary, borderRadius: 4 }} />
                </div>
                <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 11, color: t.textSecondary, fontWeight: 600, minWidth: 60, textAlign: "right" }}>{list.done}/{list.total} done</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── SCREEN: INSIGHTS ────────────────────────────────────────────────────────
function InsightsScreen({ t, isDark, setIsDark }) {
  const MoonIcon = window.lucide.Moon;
  const SunIcon = window.lucide.Sun;
  const TrendingDownIcon = window.lucide.TrendingDown;
  const ShieldIcon = window.lucide.Shield;
  const RefreshCcwIcon = window.lucide.RefreshCcw;
  const PackageIcon = window.lucide.Package;
  const AlertTriangleIcon = window.lucide.AlertTriangle;

  const months = ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"];
  const savingsData = [28, 45, 62, 88, 120, 157];
  const maxSaving = 160;

  const mistakes = [
    { item: "Yoga mat", reason: "Used 3x, then abandoned", saved: "$42", icon: "🧘" },
    { item: "Air fryer", reason: "Too large for 1-person use", saved: "$89", icon: "🍳" },
    { item: "Noise-canceling headphones", reason: "Already had similar", saved: "$129", icon: "🎧" },
  ];

  const categories = [
    { label: "Travel", pct: 42, color: t.primary },
    { label: "Fitness", pct: 28, color: t.secondary },
    { label: "Home", pct: 18, color: t.success },
    { label: "Work", pct: 12, color: t.warning },
  ];

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "0 0 8px" }}>
      <div style={{ padding: "8px 20px 16px" }}>

        {/* Header with theme toggle */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <div>
            <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 20, fontWeight: 800, color: t.text, margin: 0 }}>Insights</h1>
            <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 12, color: t.textSecondary, margin: "2px 0 0" }}>Your buying intelligence report</p>
          </div>
          <button onClick={() => setIsDark(!isDark)}
            style={{
              width: 46, height: 26, borderRadius: 13, position: "relative", cursor: "pointer",
              background: isDark ? t.primary : t.border, border: "none", transition: "background 0.3s",
              padding: 0,
            }}>
            <div style={{
              position: "absolute", top: 3, left: isDark ? 23 : 3, width: 20, height: 20, borderRadius: "50%",
              background: "#fff", transition: "left 0.3s", display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              {isDark
                ? <MoonIcon style={{ ...iconStyle(11), color: t.primary }} />
                : <SunIcon style={{ ...iconStyle(11), color: t.warning }} />
              }
            </div>
          </button>
        </div>

        {/* Big stat */}
        <div style={{
          background: t.gradient, borderRadius: 20, padding: "20px",
          marginBottom: 16, boxShadow: `0 8px 24px ${t.primaryGlow}`,
        }}>
          <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.8)", margin: "0 0 4px", fontWeight: 600 }}>TOTAL SAVED THIS YEAR</p>
          <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 38, fontWeight: 800, color: "#fff", margin: "0 0 8px", letterSpacing: -1 }}>$336</p>
          <div style={{ display: "flex", gap: 16 }}>
            {[["Impulse buys avoided", "14"], ["Briefs built", "6"], ["Items redirected", "23"]].map(([label, val]) => (
              <div key={label}>
                <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 15, fontWeight: 800, color: "#fff", margin: 0 }}>{val}</p>
                <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 10, color: "rgba(255,255,255,0.7)", margin: 0, fontWeight: 500 }}>{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Savings chart */}
        <div style={{ background: t.card, borderRadius: 18, padding: "16px", border: `1px solid ${t.border}`, marginBottom: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 13, fontWeight: 700, color: t.text, margin: 0 }}>Monthly Savings</p>
            <TrendingDownIcon style={{ ...iconStyle(16), color: t.success }} />
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 80 }}>
            {months.map((month, i) => (
              <div key={month} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                <div style={{
                  width: "100%", height: `${(savingsData[i] / maxSaving) * 70}px`,
                  background: i === months.length - 1 ? t.primary : t.border,
                  borderRadius: 6, transition: "height 0.6s ease",
                  minHeight: 4,
                }} />
                <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 9, color: t.textMuted, fontWeight: 600 }}>{month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Category breakdown */}
        <div style={{ background: t.card, borderRadius: 18, padding: "16px", border: `1px solid ${t.border}`, marginBottom: 16 }}>
          <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 13, fontWeight: 700, color: t.text, margin: "0 0 14px" }}>By Category</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {categories.map(cat => (
              <div key={cat.label} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 12, fontWeight: 600, color: t.textSecondary, width: 48, flexShrink: 0 }}>{cat.label}</span>
                <div style={{ flex: 1, height: 6, background: t.border, borderRadius: 6, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${cat.pct}%`, background: cat.color, borderRadius: 6, transition: "width 0.8s ease" }} />
                </div>
                <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 11, fontWeight: 700, color: t.textSecondary, width: 28, textAlign: "right" }}>{cat.pct}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Past mistakes */}
        <div style={{ background: t.card, borderRadius: 18, padding: "16px", border: `1px solid ${t.border}`, marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
            <AlertTriangleIcon style={{ ...iconStyle(16), color: t.warning }} />
            <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 13, fontWeight: 700, color: t.text, margin: 0 }}>Past Buying Mistakes</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {mistakes.map((m, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", background: t.cardAlt, borderRadius: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: t.warningDim, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{m.icon}</div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 12, fontWeight: 700, color: t.text, margin: "0 0 2px" }}>{m.item}</p>
                  <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 11, color: t.textMuted, margin: 0 }}>{m.reason}</p>
                </div>
                <div style={{ background: t.successDim, borderRadius: 8, padding: "4px 8px" }}>
                  <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 11, color: t.success, fontWeight: 700 }}>+{m.saved}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Smart tips */}
        <div style={{ background: t.primaryDim, borderRadius: 18, padding: "14px 16px", border: `1px solid ${t.primary}33` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
            <ShieldIcon style={{ ...iconStyle(16), color: t.primary }} />
            <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 13, fontWeight: 700, color: t.primary, margin: 0 }}>NeedSwap Tips</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              "You tend to over-buy fitness gear in January. Consider a 2-week wait rule.",
              "Your travel category has the best ROI — keep using briefs for trips.",
              "3 items in your lists could be borrowed. Tap to review.",
            ].map((tip, i) => (
              <div key={i} style={{ display: "flex", gap: 8 }}>
                <span style={{ color: t.primary, fontSize: 12, marginTop: 1, flexShrink: 0 }}>•</span>
                <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 12, color: t.text, margin: 0, lineHeight: 1.5 }}>{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── ROOT APP ────────────────────────────────────────────────────────────────
function App() {
  const [isDark, setIsDark] = useState(true);
  const [activeTab, setActiveTab] = useState("home");
  const t = isDark ? themes.dark : themes.light;

  // Load font
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = fontUrl;
    document.head.appendChild(link);
  }, []);

  const renderScreen = () => {
    switch (activeTab) {
      case "home": return <HomeScreen t={t} setActiveTab={setActiveTab} />;
      case "brief": return <BriefScreen t={t} />;
      case "lists": return <ListsScreen t={t} />;
      case "insights": return <InsightsScreen t={t} isDark={isDark} setIsDark={setIsDark} />;
      default: return <HomeScreen t={t} setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      background: "#E8ECF4", fontFamily: "'Plus Jakarta Sans', sans-serif",
      padding: "24px 0",
    }}>
      {/* Phone frame */}
      <div style={{
        width: 375, height: 812, borderRadius: 48,
        background: t.bg, overflow: "hidden", position: "relative",
        boxShadow: "0 40px 80px rgba(0,0,0,0.35), 0 0 0 12px #1A1A1A, 0 0 0 13px #2A2A2A, inset 0 0 0 1px rgba(255,255,255,0.05)",
        display: "flex", flexDirection: "column",
        transition: "background 0.3s",
      }}>
        {/* Dynamic island */}
        <div style={{
          position: "absolute", top: 10, left: "50%", transform: "translateX(-50%)",
          width: 120, height: 34, background: "#000", borderRadius: 20, zIndex: 100,
          boxShadow: "0 0 0 1px rgba(255,255,255,0.06)",
        }}>
          <div style={{ position: "absolute", right: 18, top: "50%", transform: "translateY(-50%)", width: 10, height: 10, borderRadius: "50%", background: "#1C1C1E", boxShadow: "inset 0 0 0 2px rgba(255,255,255,0.05)" }} />
        </div>

        <StatusBar t={t} isDark={isDark} />
        {renderScreen()}
        <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} t={t} />
      </div>
    </div>
  );
}
