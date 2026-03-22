
const { useState, useEffect, useRef } = React;

const themes = {
  dark: {
    bg: "#0B0F1A",
    surface: "#141927",
    surface2: "#1C2438",
    surface3: "#232E45",
    border: "#2A3550",
    primary: "#3ECFAA",
    primaryDim: "#1A6B58",
    primaryGlow: "rgba(62,207,170,0.18)",
    secondary: "#7C6FFF",
    secondaryDim: "rgba(124,111,255,0.18)",
    accent: "#FF7A5C",
    accentDim: "rgba(255,122,92,0.18)",
    text: "#EEF3FF",
    textSub: "#7A8BAD",
    textMuted: "#3F506E",
    success: "#4ADE80",
    warning: "#FBBF24",
    danger: "#F87171",
    cardShadow: "0 4px 24px rgba(0,0,0,0.4)",
    navBg: "rgba(11,15,26,0.92)",
  },
  light: {
    bg: "#F0F4FB",
    surface: "#FFFFFF",
    surface2: "#EBF0FB",
    surface3: "#DDE5F5",
    border: "#C9D5EE",
    primary: "#1DAE8A",
    primaryDim: "#C0EDE4",
    primaryGlow: "rgba(29,174,138,0.14)",
    secondary: "#5D52E8",
    secondaryDim: "rgba(93,82,232,0.12)",
    accent: "#E85C38",
    accentDim: "rgba(232,92,56,0.12)",
    text: "#131C35",
    textSub: "#546A9A",
    textMuted: "#A0B0CC",
    success: "#22C55E",
    warning: "#D97706",
    danger: "#EF4444",
    cardShadow: "0 4px 20px rgba(60,80,150,0.10)",
    navBg: "rgba(240,244,251,0.95)",
  },
};

function App() {
  const [themeKey, setThemeKey] = useState("dark");
  const [tab, setTab] = useState("today");
  const [pressedBtn, setPressedBtn] = useState(null);
  const t = themes[themeKey];

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap";
    document.head.appendChild(link);
  }, []);

  const press = (id) => {
    setPressedBtn(id);
    setTimeout(() => setPressedBtn(null), 180);
  };

  const phoneStyle = {
    width: 375,
    height: 812,
    backgroundColor: t.bg,
    borderRadius: 48,
    overflow: "hidden",
    position: "relative",
    boxShadow: "0 30px 80px rgba(0,0,0,0.55), 0 0 0 1.5px rgba(255,255,255,0.08)",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    display: "flex",
    flexDirection: "column",
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0A0E17", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={phoneStyle}>
        <StatusBar t={t} themeKey={themeKey} setThemeKey={setThemeKey} />
        <DynamicIsland t={t} />
        <div style={{ flex: 1, overflowY: "auto", overflowX: "hidden", scrollbarWidth: "none" }}>
          {tab === "today" && <TodayScreen t={t} press={press} pressedBtn={pressedBtn} />}
          {tab === "routines" && <RoutinesScreen t={t} press={press} pressedBtn={pressedBtn} />}
          {tab === "insights" && <InsightsScreen t={t} />}
          {tab === "settings" && <SettingsScreen t={t} themeKey={themeKey} setThemeKey={setThemeKey} press={press} pressedBtn={pressedBtn} />}
        </div>
        <BottomNav t={t} tab={tab} setTab={setTab} press={press} pressedBtn={pressedBtn} />
      </div>
    </div>
  );
}

function StatusBar({ t, themeKey, setThemeKey }) {
  const [time, setTime] = useState("");
  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 22px 0", zIndex: 10 }}>
      <span style={{ color: t.text, fontSize: 15, fontWeight: 700, letterSpacing: -0.3 }}>{time}</span>
      <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
        <svg width="16" height="12" viewBox="0 0 16 12" fill={t.text}>
          <rect x="0" y="6" width="3" height="6" rx="0.8" opacity="0.4" />
          <rect x="4.5" y="4" width="3" height="8" rx="0.8" opacity="0.6" />
          <rect x="9" y="1.5" width="3" height="10.5" rx="0.8" opacity="0.8" />
          <rect x="13.5" y="0" width="2.5" height="12" rx="0.8" />
        </svg>
        <svg width="15" height="12" viewBox="0 0 15 12" fill={t.text}>
          <path d="M7.5 2C9.8 2 11.8 3 13.2 4.6L14.5 3.2C12.7 1.2 10.2 0 7.5 0C4.8 0 2.3 1.2 0.5 3.2L1.8 4.6C3.2 3 5.2 2 7.5 2Z" />
          <path d="M7.5 5C9 5 10.3 5.6 11.3 6.6L12.6 5.2C11.2 3.9 9.4 3 7.5 3C5.6 3 3.8 3.9 2.4 5.2L3.7 6.6C4.7 5.6 6 5 7.5 5Z" />
          <circle cx="7.5" cy="10" r="2" />
        </svg>
        <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
          <rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke={t.text} strokeOpacity="0.5" />
          <rect x="2" y="2" width="16" height="8" rx="2" fill={t.primary} />
          <path d="M23 4v4a2 2 0 000-4z" fill={t.text} fillOpacity="0.5" />
        </svg>
      </div>
    </div>
  );
}

function DynamicIsland({ t }) {
  return (
    <div style={{ display: "flex", justifyContent: "center", paddingTop: 6, paddingBottom: 4 }}>
      <div style={{ width: 120, height: 34, backgroundColor: "#000", borderRadius: 20, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 12px" }}>
        <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#1a1a1a", border: "1.5px solid #333" }} />
        <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#1a1a1a", border: "1.5px solid #2a2a2a", opacity: 0.7 }} />
      </div>
    </div>
  );
}

function BottomNav({ t, tab, setTab, press, pressedBtn }) {
  const tabs = [
    { id: "today", icon: "Sun", label: "Today" },
    { id: "routines", icon: "Repeat2", label: "Routines" },
    { id: "insights", icon: "BarChart2", label: "Insights" },
    { id: "settings", icon: "Settings2", label: "Settings" },
  ];

  return (
    <div style={{
      background: t.navBg,
      backdropFilter: "blur(20px)",
      borderTop: `1px solid ${t.border}`,
      display: "flex",
      padding: "10px 0 18px",
      zIndex: 100,
    }}>
      {tabs.map((item) => {
        const Icon = window.lucide[item.icon];
        const active = tab === item.id;
        const isPressed = pressedBtn === `nav-${item.id}`;
        return (
          <div
            key={item.id}
            onClick={() => { press(`nav-${item.id}`); setTab(item.id); }}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4,
              cursor: "pointer",
              transform: isPressed ? "scale(0.88)" : "scale(1)",
              transition: "transform 0.15s ease",
            }}
          >
            <div style={{
              width: 40,
              height: 28,
              borderRadius: 14,
              backgroundColor: active ? t.primaryGlow : "transparent",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background 0.2s",
            }}>
              {Icon && <Icon size={20} color={active ? t.primary : t.textSub} strokeWidth={active ? 2.2 : 1.8} />}
            </div>
            <span style={{ fontSize: 10.5, fontWeight: active ? 700 : 500, color: active ? t.primary : t.textSub, letterSpacing: 0.1 }}>{item.label}</span>
          </div>
        );
      })}
    </div>
  );
}

// ─── TODAY SCREEN ────────────────────────────────────────────────────────────
function TodayScreen({ t, press, pressedBtn }) {
  const [energyLevel, setEnergyLevel] = useState(3);
  const [completedTasks, setCompletedTasks] = useState(new Set([0, 2]));
  const [expandedAnchor, setExpandedAnchor] = useState(null);

  const energyLabels = ["Drained", "Low", "Moderate", "Good", "Energized"];
  const energyColors = [t.danger, "#F97316", t.warning, "#84CC16", t.success];

  const microWindows = [
    { id: 0, time: "11:45 AM", duration: "15 min", label: "Kitchen reset", icon: "Home", tag: "Home", color: t.secondary },
    { id: 1, time: "1:10 PM", duration: "20 min", label: "Walk around the block", icon: "Footprints", tag: "Move", color: t.primary },
    { id: 2, time: "3:30 PM", duration: "10 min", label: "Reply 3 messages", icon: "MessageSquare", tag: "Work", color: t.accent },
  ];

  const anchors = [
    { id: 0, label: "Morning Start", time: "7:00 AM", done: true, icon: "Sunrise", tasks: ["Drink water", "5 min stretch", "Check calendar"] },
    { id: 1, label: "Lunch Break", time: "12:30 PM", done: false, icon: "UtensilsCrossed", tasks: ["Step outside", "Eat mindfully", "Decompress"] },
    { id: 2, label: "School Pickup", time: "3:15 PM", done: false, icon: "Users", tasks: ["Leave 10 min early", "Snack prep", "Clear car seat"] },
    { id: 3, label: "Wind Down", time: "9:30 PM", done: false, icon: "Moon", tasks: ["Dim lights", "Phone off desk", "Tomorrow plan"] },
  ];

  const toggleTask = (id) => {
    setCompletedTasks(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <div style={{ padding: "4px 0 16px" }}>
      {/* Header */}
      <div style={{ padding: "12px 22px 0" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
          <div>
            <p style={{ color: t.textSub, fontSize: 13, fontWeight: 500, margin: 0 }}>Sunday, March 22</p>
            <h1 style={{ color: t.text, fontSize: 26, fontWeight: 800, margin: "3px 0 0", letterSpacing: -0.8 }}>Your Rhythm</h1>
          </div>
          <div style={{ width: 42, height: 42, borderRadius: 21, background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "#fff", fontSize: 16, fontWeight: 800 }}>S</span>
          </div>
        </div>

        {/* Energy Check */}
        <div style={{ marginTop: 18, background: t.surface, borderRadius: 18, padding: "14px 16px", border: `1px solid ${t.border}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <span style={{ color: t.text, fontSize: 13, fontWeight: 600 }}>How's your energy?</span>
            <span style={{ color: energyColors[energyLevel - 1], fontSize: 12, fontWeight: 700, background: `${energyColors[energyLevel - 1]}22`, padding: "3px 9px", borderRadius: 20 }}>{energyLabels[energyLevel - 1]}</span>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {[1, 2, 3, 4, 5].map(n => (
              <div
                key={n}
                onClick={() => setEnergyLevel(n)}
                style={{
                  flex: 1, height: 8, borderRadius: 4,
                  backgroundColor: n <= energyLevel ? energyColors[energyLevel - 1] : t.surface2,
                  cursor: "pointer",
                  transition: "background 0.2s",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Micro Windows */}
      <div style={{ padding: "20px 22px 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <h2 style={{ color: t.text, fontSize: 16, fontWeight: 700, margin: 0, letterSpacing: -0.3 }}>Open Windows</h2>
          <span style={{ color: t.primary, fontSize: 12, fontWeight: 600 }}>3 found</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {microWindows.map((w) => {
            const Icon = window.lucide[w.icon] || window.lucide["Clock"];
            const done = completedTasks.has(w.id);
            const isPressed = pressedBtn === `task-${w.id}`;
            return (
              <div
                key={w.id}
                onClick={() => { press(`task-${w.id}`); toggleTask(w.id); }}
                style={{
                  background: done ? `${t.primary}15` : t.surface,
                  border: `1px solid ${done ? t.primary + "40" : t.border}`,
                  borderRadius: 16,
                  padding: "12px 14px",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  cursor: "pointer",
                  transform: isPressed ? "scale(0.97)" : "scale(1)",
                  transition: "transform 0.15s, background 0.2s",
                }}
              >
                <div style={{ width: 40, height: 40, borderRadius: 12, backgroundColor: `${w.color}22`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {Icon && <Icon size={18} color={w.color} />}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ color: done ? t.textSub : t.text, fontSize: 14, fontWeight: 600, margin: 0, textDecoration: done ? "line-through" : "none" }}>{w.label}</p>
                  <p style={{ color: t.textSub, fontSize: 11.5, margin: "2px 0 0" }}>{w.time} · {w.duration}</p>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
                  <span style={{ backgroundColor: `${w.color}20`, color: w.color, fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 10 }}>{w.tag}</span>
                  <div style={{ width: 22, height: 22, borderRadius: 11, border: `2px solid ${done ? t.primary : t.border}`, backgroundColor: done ? t.primary : "transparent", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {done && <svg width="11" height="9" viewBox="0 0 11 9" fill="none"><path d="M1 4L4 7.5L10 1" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Anchor Moments */}
      <div style={{ padding: "22px 22px 0" }}>
        <h2 style={{ color: t.text, fontSize: 16, fontWeight: 700, margin: "0 0 12px", letterSpacing: -0.3 }}>Anchor Moments</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {anchors.map((anchor) => {
            const Icon = window.lucide[anchor.icon] || window.lucide["Clock"];
            const expanded = expandedAnchor === anchor.id;
            return (
              <div
                key={anchor.id}
                style={{ background: t.surface, border: `1px solid ${anchor.done ? t.primary + "40" : t.border}`, borderRadius: 16, overflow: "hidden", transition: "all 0.2s" }}
              >
                <div
                  onClick={() => setExpandedAnchor(expanded ? null : anchor.id)}
                  style={{ padding: "12px 14px", display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }}
                >
                  <div style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: anchor.done ? t.primaryGlow : t.surface2, border: anchor.done ? `1px solid ${t.primary}40` : `1px solid ${t.border}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {Icon && <Icon size={16} color={anchor.done ? t.primary : t.textSub} />}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ color: t.text, fontSize: 13.5, fontWeight: 600, margin: 0 }}>{anchor.label}</p>
                    <p style={{ color: t.textSub, fontSize: 11.5, margin: "1px 0 0" }}>{anchor.time}</p>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    {anchor.done && <span style={{ color: t.primary, fontSize: 11, fontWeight: 700 }}>Done</span>}
                    {window.lucide.ChevronDown && React.createElement(window.lucide.ChevronDown, { size: 16, color: t.textMuted, style: { transform: expanded ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" } })}
                  </div>
                </div>
                {expanded && (
                  <div style={{ padding: "0 14px 12px 14px", borderTop: `1px solid ${t.border}` }}>
                    <div style={{ paddingTop: 10, display: "flex", flexDirection: "column", gap: 6 }}>
                      {anchor.tasks.map((task, i) => (
                        <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <div style={{ width: 5, height: 5, borderRadius: "50%", backgroundColor: t.primary, flexShrink: 0 }} />
                          <span style={{ color: t.textSub, fontSize: 12.5, fontWeight: 500 }}>{task}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Daily Quote */}
      <div style={{ margin: "22px 22px 0", background: `linear-gradient(135deg, ${t.primaryDim}, ${t.secondaryDim})`, borderRadius: 18, padding: "16px 18px", border: `1px solid ${t.primary}30` }}>
        <p style={{ color: t.primary, fontSize: 11, fontWeight: 700, margin: "0 0 6px", textTransform: "uppercase", letterSpacing: 1 }}>Rhythm Note</p>
        <p style={{ color: t.text, fontSize: 13, fontWeight: 500, margin: 0, lineHeight: 1.55, fontStyle: "italic" }}>"You're 2 for 3 today. Your weekday rhythm has a 78% completion rate — your best in 3 weeks."</p>
      </div>
    </div>
  );
}

// ─── ROUTINES SCREEN ──────────────────────────────────────────────────────────
function RoutinesScreen({ t, press, pressedBtn }) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [toggledRoutines, setToggledRoutines] = useState(new Set([0, 1, 3]));
  const filters = ["All", "Morning", "Midday", "Evening", "Weekend"];

  const routines = [
    { id: 0, name: "Morning Power-Up", time: "7:00 AM", steps: 4, streak: 12, tag: "Morning", icon: "Sunrise", color: t.warning, desc: "Hydrate, stretch, plan, energize" },
    { id: 1, name: "Kitchen Calm", time: "Flexible", steps: 3, streak: 5, tag: "Midday", icon: "Home", color: t.secondary, desc: "Quick tidy between transitions" },
    { id: 2, name: "Mindful Lunch", time: "12:30 PM", steps: 3, streak: 0, tag: "Midday", icon: "UtensilsCrossed", color: t.primary, desc: "Step away, eat well, decompress" },
    { id: 3, name: "Family Wind-Down", time: "8:30 PM", steps: 5, streak: 9, tag: "Evening", icon: "Heart", color: t.accent, desc: "Together time, bath, story, lights" },
    { id: 4, name: "Weekend Reset", time: "Sat 10 AM", steps: 6, streak: 3, tag: "Weekend", icon: "RefreshCw", color: t.success, desc: "Deep clean, plan week, recharge" },
    { id: 5, name: "Commute Focus", time: "8:15 AM", steps: 2, streak: 7, tag: "Morning", icon: "Train", color: "#A78BFA", desc: "Podcast or review weekly goals" },
  ];

  const filtered = activeFilter === "All" ? routines : routines.filter(r => r.tag === activeFilter);

  const toggleRoutine = (id) => {
    setToggledRoutines(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <div style={{ padding: "4px 0 16px" }}>
      <div style={{ padding: "12px 22px 0" }}>
        <p style={{ color: t.textSub, fontSize: 13, fontWeight: 500, margin: 0 }}>Your library</p>
        <h1 style={{ color: t.text, fontSize: 26, fontWeight: 800, margin: "3px 0 16px", letterSpacing: -0.8 }}>Routines</h1>

        {/* Filter tabs */}
        <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4, scrollbarWidth: "none" }}>
          {filters.map(f => (
            <div
              key={f}
              onClick={() => setActiveFilter(f)}
              style={{
                padding: "7px 14px",
                borderRadius: 20,
                backgroundColor: activeFilter === f ? t.primary : t.surface2,
                border: `1px solid ${activeFilter === f ? t.primary : t.border}`,
                cursor: "pointer",
                flexShrink: 0,
                transition: "all 0.18s",
              }}
            >
              <span style={{ color: activeFilter === f ? "#fff" : t.textSub, fontSize: 12.5, fontWeight: 600 }}>{f}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Add new CTA */}
      <div style={{ margin: "16px 22px 0" }}>
        <div
          onClick={() => press("add-routine")}
          style={{
            background: `linear-gradient(135deg, ${t.primary}22, ${t.secondary}22)`,
            border: `1.5px dashed ${t.primary}60`,
            borderRadius: 16,
            padding: "13px 16px",
            display: "flex",
            alignItems: "center",
            gap: 12,
            cursor: "pointer",
            transform: pressedBtn === "add-routine" ? "scale(0.97)" : "scale(1)",
            transition: "transform 0.15s",
          }}
        >
          <div style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: t.primaryGlow, display: "flex", alignItems: "center", justifyContent: "center" }}>
            {window.lucide.Plus && <window.lucide.Plus size={20} color={t.primary} />}
          </div>
          <div>
            <p style={{ color: t.primary, fontSize: 13.5, fontWeight: 700, margin: 0 }}>Create new routine</p>
            <p style={{ color: t.textSub, fontSize: 11.5, margin: "2px 0 0" }}>Tell us your goal, we'll build the steps</p>
          </div>
        </div>
      </div>

      {/* Routine List */}
      <div style={{ padding: "16px 22px 0", display: "flex", flexDirection: "column", gap: 10 }}>
        {filtered.map((r) => {
          const Icon = window.lucide[r.icon] || window.lucide["Repeat2"];
          const active = toggledRoutines.has(r.id);
          return (
            <div key={r.id} style={{ background: t.surface, borderRadius: 18, padding: "14px 16px", border: `1px solid ${t.border}`, boxShadow: t.cardShadow }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                <div style={{ width: 44, height: 44, borderRadius: 14, backgroundColor: `${r.color}20`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {Icon && <Icon size={20} color={r.color} />}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <p style={{ color: t.text, fontSize: 14, fontWeight: 700, margin: 0 }}>{r.name}</p>
                    {/* Toggle */}
                    <div
                      onClick={() => toggleRoutine(r.id)}
                      style={{
                        width: 44,
                        height: 26,
                        borderRadius: 13,
                        backgroundColor: active ? t.primary : t.surface3,
                        position: "relative",
                        cursor: "pointer",
                        transition: "background 0.25s",
                        flexShrink: 0,
                      }}
                    >
                      <div style={{
                        width: 20,
                        height: 20,
                        borderRadius: 10,
                        backgroundColor: "#fff",
                        position: "absolute",
                        top: 3,
                        left: active ? 21 : 3,
                        transition: "left 0.25s",
                        boxShadow: "0 1px 4px rgba(0,0,0,0.3)",
                      }} />
                    </div>
                  </div>
                  <p style={{ color: t.textSub, fontSize: 12, margin: "3px 0 0" }}>{r.desc}</p>
                  <div style={{ display: "flex", gap: 10, marginTop: 8, alignItems: "center" }}>
                    <span style={{ backgroundColor: `${r.color}18`, color: r.color, fontSize: 10.5, fontWeight: 700, padding: "2px 8px", borderRadius: 10 }}>{r.tag}</span>
                    <span style={{ color: t.textSub, fontSize: 11 }}>{r.time}</span>
                    <span style={{ color: t.textSub, fontSize: 11 }}>·</span>
                    <span style={{ color: t.textSub, fontSize: 11 }}>{r.steps} steps</span>
                    {r.streak > 0 && (
                      <>
                        <span style={{ color: t.textSub, fontSize: 11 }}>·</span>
                        <span style={{ color: t.warning, fontSize: 11, fontWeight: 600 }}>🔥 {r.streak}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── INSIGHTS SCREEN ──────────────────────────────────────────────────────────
function InsightsScreen({ t }) {
  const [activeMetric, setActiveMetric] = useState("mood");
  const weekDays = ["M", "T", "W", "T", "F", "S", "S"];
  const completionData = [5, 4, 7, 6, 5, 8, 6];
  const maxVal = Math.max(...completionData);

  const moodBars = [65, 80, 55, 90, 75, 95, 70];
  const focusBars = [70, 65, 80, 60, 85, 72, 78];
  const bars = activeMetric === "mood" ? moodBars : focusBars;

  const insights = [
    { icon: "TrendingUp", color: t.success, text: "You complete 2x more tasks on days you log energy first." },
    { icon: "Clock", color: t.secondary, text: "Your 10-min morning stretch keeps you 40% on-track at midday." },
    { icon: "Home", color: t.warning, text: "Kitchen resets happen most on Tuesdays — your natural reset day." },
    { icon: "Moon", color: "#A78BFA", text: "Wind-down rituals before 9:30 PM improve next-day completion by 30%." },
  ];

  const topRituals = [
    { name: "Morning hydration", count: 26, pct: 93, color: t.primary },
    { name: "Evening read", count: 21, pct: 75, color: t.secondary },
    { name: "Midday walk", count: 17, pct: 61, color: t.success },
    { name: "Phone-free dinner", count: 14, pct: 50, color: t.accent },
  ];

  return (
    <div style={{ padding: "4px 0 16px" }}>
      <div style={{ padding: "12px 22px 0" }}>
        <p style={{ color: t.textSub, fontSize: 13, fontWeight: 500, margin: 0 }}>Last 7 days</p>
        <h1 style={{ color: t.text, fontSize: 26, fontWeight: 800, margin: "3px 0 16px", letterSpacing: -0.8 }}>Insights</h1>

        {/* Summary cards */}
        <div style={{ display: "flex", gap: 10 }}>
          {[
            { label: "Streak", value: "12", unit: "days", color: t.warning, icon: "Flame" },
            { label: "Completed", value: "41", unit: "tasks", color: t.primary, icon: "CheckCircle2" },
            { label: "Best day", value: "Sat", unit: "8 tasks", color: t.secondary, icon: "Star" },
          ].map((card) => {
            const Icon = window.lucide[card.icon];
            return (
              <div key={card.label} style={{ flex: 1, background: t.surface, borderRadius: 16, padding: "12px 10px", border: `1px solid ${t.border}`, textAlign: "center" }}>
                {Icon && <Icon size={18} color={card.color} style={{ margin: "0 auto 4px" }} />}
                <p style={{ color: t.text, fontSize: 20, fontWeight: 800, margin: 0, letterSpacing: -0.5 }}>{card.value}</p>
                <p style={{ color: t.textSub, fontSize: 10.5, margin: "2px 0 0", fontWeight: 500 }}>{card.unit}</p>
                <p style={{ color: t.textMuted, fontSize: 10, margin: "1px 0 0" }}>{card.label}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mood / Focus Chart */}
      <div style={{ margin: "18px 22px 0", background: t.surface, borderRadius: 18, padding: "16px", border: `1px solid ${t.border}` }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <p style={{ color: t.text, fontSize: 14, fontWeight: 700, margin: 0 }}>Weekly Trend</p>
          <div style={{ display: "flex", gap: 6 }}>
            {["mood", "focus"].map(m => (
              <div key={m} onClick={() => setActiveMetric(m)} style={{ padding: "4px 12px", borderRadius: 12, backgroundColor: activeMetric === m ? t.primary : t.surface2, cursor: "pointer", transition: "all 0.18s" }}>
                <span style={{ color: activeMetric === m ? "#fff" : t.textSub, fontSize: 11.5, fontWeight: 600, textTransform: "capitalize" }}>{m}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", gap: 6, alignItems: "flex-end", height: 80 }}>
          {bars.map((val, i) => (
            <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4, height: "100%", justifyContent: "flex-end" }}>
              <div style={{
                width: "100%",
                height: `${val}%`,
                borderRadius: 6,
                background: `linear-gradient(180deg, ${t.primary}, ${t.primary}88)`,
                opacity: i === 5 ? 1 : 0.5 + (val / 200),
                transition: "height 0.3s ease",
              }} />
              <span style={{ color: t.textMuted, fontSize: 10, fontWeight: 600 }}>{weekDays[i]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Completion bars */}
      <div style={{ margin: "14px 22px 0", background: t.surface, borderRadius: 18, padding: "16px", border: `1px solid ${t.border}` }}>
        <p style={{ color: t.text, fontSize: 14, fontWeight: 700, margin: "0 0 12px" }}>Tasks completed / day</p>
        {weekDays.map((d, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
            <span style={{ color: t.textSub, fontSize: 11.5, fontWeight: 600, width: 14 }}>{d}</span>
            <div style={{ flex: 1, height: 8, borderRadius: 4, backgroundColor: t.surface2, overflow: "hidden" }}>
              <div style={{ width: `${(completionData[i] / maxVal) * 100}%`, height: "100%", borderRadius: 4, backgroundColor: t.secondary, transition: "width 0.4s" }} />
            </div>
            <span style={{ color: t.textSub, fontSize: 11.5, fontWeight: 600, width: 14 }}>{completionData[i]}</span>
          </div>
        ))}
      </div>

      {/* Top Rituals */}
      <div style={{ margin: "14px 22px 0", background: t.surface, borderRadius: 18, padding: "16px", border: `1px solid ${t.border}` }}>
        <p style={{ color: t.text, fontSize: 14, fontWeight: 700, margin: "0 0 12px" }}>Top Rituals This Month</p>
        {topRituals.map((r, i) => (
          <div key={i} style={{ marginBottom: i < topRituals.length - 1 ? 12 : 0 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
              <span style={{ color: t.text, fontSize: 12.5, fontWeight: 600 }}>{r.name}</span>
              <span style={{ color: t.textSub, fontSize: 12 }}>{r.count}x · {r.pct}%</span>
            </div>
            <div style={{ height: 6, borderRadius: 3, backgroundColor: t.surface2, overflow: "hidden" }}>
              <div style={{ width: `${r.pct}%`, height: "100%", borderRadius: 3, backgroundColor: r.color }} />
            </div>
          </div>
        ))}
      </div>

      {/* Insights Cards */}
      <div style={{ padding: "14px 22px 0" }}>
        <p style={{ color: t.text, fontSize: 14, fontWeight: 700, margin: "0 0 10px" }}>What We've Noticed</p>
        {insights.map((ins, i) => {
          const Icon = window.lucide[ins.icon];
          return (
            <div key={i} style={{ background: t.surface, borderRadius: 14, padding: "12px 14px", border: `1px solid ${t.border}`, marginBottom: 8, display: "flex", gap: 10, alignItems: "flex-start" }}>
              <div style={{ width: 32, height: 32, borderRadius: 10, backgroundColor: `${ins.color}20`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                {Icon && <Icon size={15} color={ins.color} />}
              </div>
              <p style={{ color: t.textSub, fontSize: 12.5, margin: 0, lineHeight: 1.5, fontWeight: 500 }}>{ins.text}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── SETTINGS SCREEN ──────────────────────────────────────────────────────────
function SettingsScreen({ t, themeKey, setThemeKey, press, pressedBtn }) {
  const [notifications, setNotifications] = useState(true);
  const [locationAware, setLocationAware] = useState(true);
  const [calendarSync, setCalendarSync] = useState(false);
  const [adaptiveMode, setAdaptiveMode] = useState(true);

  const ToggleRow = ({ label, sub, value, onToggle }) => (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "13px 0", borderBottom: `1px solid ${t.border}` }}>
      <div>
        <p style={{ color: t.text, fontSize: 13.5, fontWeight: 600, margin: 0 }}>{label}</p>
        {sub && <p style={{ color: t.textSub, fontSize: 11.5, margin: "2px 0 0" }}>{sub}</p>}
      </div>
      <div onClick={onToggle} style={{ width: 44, height: 26, borderRadius: 13, backgroundColor: value ? t.primary : t.surface3, position: "relative", cursor: "pointer", transition: "background 0.25s", flexShrink: 0 }}>
        <div style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: "#fff", position: "absolute", top: 3, left: value ? 21 : 3, transition: "left 0.25s", boxShadow: "0 1px 4px rgba(0,0,0,0.3)" }} />
      </div>
    </div>
  );

  const anchors = [
    { label: "Wake Up", time: "6:45 AM", icon: "Alarm" },
    { label: "Commute", time: "8:10 AM", icon: "Train" },
    { label: "Lunch", time: "12:30 PM", icon: "UtensilsCrossed" },
    { label: "School Pickup", time: "3:15 PM", icon: "Users" },
    { label: "Bedtime", time: "10:00 PM", icon: "Moon" },
  ];

  return (
    <div style={{ padding: "4px 0 24px" }}>
      <div style={{ padding: "12px 22px 0" }}>
        <p style={{ color: t.textSub, fontSize: 13, fontWeight: 500, margin: 0 }}>Preferences</p>
        <h1 style={{ color: t.text, fontSize: 26, fontWeight: 800, margin: "3px 0 0", letterSpacing: -0.8 }}>Settings</h1>

        {/* Profile Card */}
        <div style={{ marginTop: 18, background: `linear-gradient(135deg, ${t.primary}22, ${t.secondary}22)`, borderRadius: 20, padding: "16px", border: `1px solid ${t.primary}30`, display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 54, height: 54, borderRadius: 27, background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "#fff", fontSize: 22, fontWeight: 800 }}>S</span>
          </div>
          <div>
            <p style={{ color: t.text, fontSize: 16, fontWeight: 700, margin: 0 }}>Sarah Mitchell</p>
            <p style={{ color: t.textSub, fontSize: 12, margin: "2px 0 0" }}>Member since Jan 2026 · 12-day streak</p>
          </div>
        </div>

        {/* Theme Toggle */}
        <div style={{ marginTop: 20 }}>
          <p style={{ color: t.textSub, fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, margin: "0 0 10px" }}>Appearance</p>
          <div style={{ background: t.surface, borderRadius: 16, overflow: "hidden", border: `1px solid ${t.border}` }}>
            <div style={{ display: "flex", padding: 6, gap: 4 }}>
              {[
                { key: "dark", label: "Dark", icon: "Moon" },
                { key: "light", label: "Light", icon: "Sun" },
              ].map((opt) => {
                const Icon = window.lucide[opt.icon];
                const active = themeKey === opt.key;
                return (
                  <div
                    key={opt.key}
                    onClick={() => setThemeKey(opt.key)}
                    style={{
                      flex: 1,
                      padding: "10px 0",
                      borderRadius: 12,
                      backgroundColor: active ? t.primary : "transparent",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 6,
                      cursor: "pointer",
                      transition: "background 0.2s",
                    }}
                  >
                    {Icon && <Icon size={15} color={active ? "#fff" : t.textSub} />}
                    <span style={{ color: active ? "#fff" : t.textSub, fontSize: 13, fontWeight: 600 }}>{opt.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Anchor Moments */}
        <div style={{ marginTop: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <p style={{ color: t.textSub, fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, margin: 0 }}>Anchor Moments</p>
            <span style={{ color: t.primary, fontSize: 12, fontWeight: 600 }}>Edit</span>
          </div>
          <div style={{ background: t.surface, borderRadius: 16, padding: "4px 16px", border: `1px solid ${t.border}` }}>
            {anchors.map((a, i) => {
              const Icon = window.lucide[a.icon];
              return (
                <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "11px 0", borderBottom: i < anchors.length - 1 ? `1px solid ${t.border}` : "none" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 30, height: 30, borderRadius: 8, backgroundColor: t.surface2, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {Icon && <Icon size={14} color={t.textSub} />}
                    </div>
                    <span style={{ color: t.text, fontSize: 13.5, fontWeight: 600 }}>{a.label}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ color: t.textSub, fontSize: 12.5 }}>{a.time}</span>
                    {window.lucide.ChevronRight && <window.lucide.ChevronRight size={14} color={t.textMuted} />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Preferences */}
        <div style={{ marginTop: 20 }}>
          <p style={{ color: t.textSub, fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, margin: "0 0 10px" }}>Behavior</p>
          <div style={{ background: t.surface, borderRadius: 16, padding: "0 16px", border: `1px solid ${t.border}` }}>
            <ToggleRow label="Smart Nudges" sub="Context-aware reminders during windows" value={notifications} onToggle={() => setNotifications(v => !v)} />
            <ToggleRow label="Location Aware" sub="Adjust suggestions based on where you are" value={locationAware} onToggle={() => setLocationAware(v => !v)} />
            <ToggleRow label="Calendar Sync" sub="Pull events to build around your schedule" value={calendarSync} onToggle={() => setCalendarSync(v => !v)} />
            <ToggleRow label="Adaptive Mode" sub="Learn from completions to reshape future days" value={adaptiveMode} onToggle={() => setAdaptiveMode(v => !v)} />
          </div>
        </div>

        {/* App info */}
        <div style={{ marginTop: 20, textAlign: "center" }}>
          <div style={{ display: "flex", justifyContent: "center", gap: 6, marginBottom: 8 }}>
            <div style={{ width: 28, height: 28, borderRadius: 8, background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "#fff", fontSize: 13, fontWeight: 800 }}>R</span>
            </div>
            <span style={{ color: t.text, fontSize: 16, fontWeight: 800, lineHeight: "28px" }}>Rhythm Nest</span>
          </div>
          <p style={{ color: t.textMuted, fontSize: 11.5, margin: 0 }}>Version 1.0.0 · Build routines that fit real life.</p>
        </div>
      </div>
    </div>
  );
}
