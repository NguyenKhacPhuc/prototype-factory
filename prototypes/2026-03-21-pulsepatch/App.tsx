function App() {
  const { useState, useEffect, useRef } = React;

  // ─── Theme ───────────────────────────────────────────────────────────────
  const themes = {
    light: {
      bg: "#F4F2EF",
      surface: "#FFFFFF",
      surfaceAlt: "#F9F7F4",
      card: "#FFFFFF",
      cardBorder: "#EDE9E3",
      primary: "#FF6B35",
      primaryLight: "#FFF0EB",
      primaryGrad: "linear-gradient(135deg, #FF6B35 0%, #FF8C5A 100%)",
      secondary: "#2D3561",
      accent: "#4ECDC4",
      accentLight: "#E8FAF9",
      text: "#1A1A2E",
      textSub: "#6B7280",
      textMuted: "#9CA3AF",
      navBg: "#FFFFFF",
      navBorder: "#EDE9E3",
      statusBar: "#1A1A2E",
      green: "#22C55E",
      greenLight: "#DCFCE7",
      yellow: "#F59E0B",
      yellowLight: "#FEF3C7",
      red: "#EF4444",
      redLight: "#FEE2E2",
      blue: "#3B82F6",
      blueLight: "#DBEAFE",
      shadow: "0 4px 20px rgba(0,0,0,0.08)",
      shadowSm: "0 2px 8px rgba(0,0,0,0.06)",
    },
    dark: {
      bg: "#0F0F1A",
      surface: "#1A1A2E",
      surfaceAlt: "#16213E",
      card: "#1E1E32",
      cardBorder: "#2A2A42",
      primary: "#FF6B35",
      primaryLight: "#2A1A12",
      primaryGrad: "linear-gradient(135deg, #FF6B35 0%, #FF8C5A 100%)",
      secondary: "#7C8CF8",
      accent: "#4ECDC4",
      accentLight: "#0D2926",
      text: "#F1F0FF",
      textSub: "#9CA3AF",
      textMuted: "#6B7280",
      navBg: "#1A1A2E",
      navBorder: "#2A2A42",
      statusBar: "#F1F0FF",
      green: "#4ADE80",
      greenLight: "#052E16",
      yellow: "#FCD34D",
      yellowLight: "#1C1300",
      red: "#F87171",
      redLight: "#1F0000",
      blue: "#60A5FA",
      blueLight: "#0C1A3D",
      shadow: "0 4px 20px rgba(0,0,0,0.4)",
      shadowSm: "0 2px 8px rgba(0,0,0,0.3)",
    },
  };

  // ─── State ────────────────────────────────────────────────────────────────
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const [scanStep, setScanStep] = useState(0);
  const [scanDone, setScanDone] = useState(false);
  const [scanAnswers, setScanAnswers] = useState({});
  const [pressedBtn, setPressedBtn] = useState(null);
  const [activeRoutine, setActiveRoutine] = useState(null);
  const [routineStep, setRoutineStep] = useState(0);
  const [routineRunning, setRoutineRunning] = useState(false);
  const [routineTimer, setRoutineTimer] = useState(0);
  const [completedRoutines, setCompletedRoutines] = useState([]);
  const [selectedInsight, setSelectedInsight] = useState(null);
  const [breathePhase, setBreathePhase] = useState("inhale");
  const [breatheActive, setBreatheActive] = useState(false);
  const [breatheCount, setBreatheCount] = useState(0);
  const breatheRef = useRef(null);
  const timerRef = useRef(null);

  const t = darkMode ? themes.dark : themes.light;

  // ─── Font ─────────────────────────────────────────────────────────────────
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
      * { font-family: 'Plus Jakarta Sans', sans-serif; box-sizing: border-box; }
      ::-webkit-scrollbar { width: 0px; }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  // ─── Breathe animation ───────────────────────────────────────────────────
  useEffect(() => {
    if (!breatheActive) {
      clearInterval(breatheRef.current);
      return;
    }
    const phases = [
      { name: "inhale", dur: 4000 },
      { name: "hold", dur: 2000 },
      { name: "exhale", dur: 6000 },
      { name: "pause", dur: 1000 },
    ];
    let idx = 0;
    setBreathePhase(phases[0].name);
    const cycle = () => {
      idx = (idx + 1) % phases.length;
      setBreathePhase(phases[idx].name);
      if (idx === 0) setBreatheCount((c) => c + 1);
    };
    let elapsed = 0;
    const tick = () => {
      elapsed += 100;
      const cur = phases[idx];
      if (elapsed >= cur.dur) {
        elapsed = 0;
        cycle();
      }
    };
    breatheRef.current = setInterval(tick, 100);
    return () => clearInterval(breatheRef.current);
  }, [breatheActive]);

  // ─── Routine timer ────────────────────────────────────────────────────────
  useEffect(() => {
    if (!routineRunning) { clearInterval(timerRef.current); return; }
    timerRef.current = setInterval(() => setRoutineTimer((t) => t + 1), 1000);
    return () => clearInterval(timerRef.current);
  }, [routineRunning]);

  // ─── Data ─────────────────────────────────────────────────────────────────
  const scanQuestions = [
    {
      id: "sleep",
      q: "How did you sleep?",
      emoji: "😴",
      options: [
        { label: "Deep & refreshed", val: 3 },
        { label: "Decent, a bit groggy", val: 2 },
        { label: "Restless or short", val: 1 },
        { label: "Barely slept", val: 0 },
      ],
    },
    {
      id: "soreness",
      q: "Any body soreness or tension?",
      emoji: "💪",
      options: [
        { label: "Feeling great", val: 3 },
        { label: "Mild tightness", val: 2 },
        { label: "Noticeable aches", val: 1 },
        { label: "Pretty sore / stiff", val: 0 },
      ],
    },
    {
      id: "stress",
      q: "Mental load today?",
      emoji: "🧠",
      options: [
        { label: "Light & clear", val: 3 },
        { label: "Moderate tasks", val: 2 },
        { label: "Busy & stretched", val: 1 },
        { label: "Overwhelmed", val: 0 },
      ],
    },
    {
      id: "schedule",
      q: "Today's schedule pressure?",
      emoji: "📅",
      options: [
        { label: "Free & flexible", val: 3 },
        { label: "A few meetings", val: 2 },
        { label: "Back-to-back packed", val: 1 },
        { label: "No breathing room", val: 0 },
      ],
    },
  ];

  const routines = [
    {
      id: "neck-reset",
      title: "Neck Reset",
      subtitle: "After screen sessions",
      duration: "90 sec",
      durationSec: 90,
      tag: "Posture",
      tagColor: "#3B82F6",
      icon: "Zap",
      steps: [
        { name: "Chin tucks", desc: "Gently retract chin toward neck. Hold 3s.", dur: 20 },
        { name: "Side tilts", desc: "Tilt ear to shoulder, hold 10s each side.", dur: 25 },
        { name: "Neck circles", desc: "Slow half-circles, front only, 5 reps.", dur: 20 },
        { name: "Shoulder shrugs", desc: "Lift shoulders to ears, drop. 5 reps.", dur: 15 },
        { name: "Deep breath", desc: "Inhale 4s, hold 2s, exhale 6s. Twice.", dur: 10 },
      ],
      benefit: "Reduces cervical tension and headache risk",
    },
    {
      id: "hip-release",
      title: "Hip & Calf Release",
      subtitle: "Post-run recovery",
      duration: "3 min",
      durationSec: 180,
      tag: "Movement",
      tagColor: "#FF6B35",
      icon: "Activity",
      steps: [
        { name: "Standing calf stretch", desc: "Step back, heel down. Hold 30s each.", dur: 60 },
        { name: "Hip flexor lunge", desc: "Low lunge, sink hips. Hold 20s each.", dur: 40 },
        { name: "Figure-4 stretch", desc: "Seated or standing, 30s per side.", dur: 60 },
        { name: "Quad pull", desc: "Stand, pull ankle to glute. 20s each.", dur: 40 },
      ],
      benefit: "Accelerates muscle recovery and reduces DOMS",
    },
    {
      id: "desk-spinal",
      title: "Desk Spinal Mobility",
      subtitle: "For all-day sitters",
      duration: "2 min",
      durationSec: 120,
      tag: "Posture",
      tagColor: "#3B82F6",
      icon: "Layers",
      steps: [
        { name: "Seated cat-cow", desc: "Arch and round back, 8 slow reps.", dur: 30 },
        { name: "Thoracic rotation", desc: "Hand behind head, rotate open. 6 per side.", dur: 30 },
        { name: "Seated forward fold", desc: "Hinge at hips, let spine decompress.", dur: 20 },
        { name: "Chest opener", desc: "Clasp hands behind, lift chest. Hold 15s.", dur: 20 },
        { name: "Final breathe", desc: "Slow deep breaths, feel spine lengthen.", dur: 20 },
      ],
      benefit: "Offsets prolonged seated posture compression",
    },
    {
      id: "breathe-reset",
      title: "4-2-6 Breathe",
      subtitle: "Before afternoon crash",
      duration: "90 sec",
      durationSec: 90,
      tag: "Recovery",
      tagColor: "#4ECDC4",
      icon: "Wind",
      steps: [
        { name: "Settle in", desc: "Sit comfortably, close eyes.", dur: 10 },
        { name: "Breathe cycle x6", desc: "Inhale 4s, hold 2s, exhale 6s.", dur: 72 },
        { name: "Return slowly", desc: "Open eyes, take a slow look around.", dur: 8 },
      ],
      benefit: "Activates parasympathetic system in under 2 minutes",
    },
  ];

  const todayInterventions = [
    {
      time: "Now",
      title: "Neck Reset",
      reason: "3h screen session detected",
      urgency: "high",
      routineId: "neck-reset",
    },
    {
      time: "2:30 PM",
      title: "4-2-6 Breathe",
      reason: "Pre-afternoon slump window",
      urgency: "medium",
      routineId: "breathe-reset",
    },
    {
      time: "5:00 PM",
      title: "Decompression Walk",
      reason: "Post-meeting stress release",
      urgency: "low",
      routineId: null,
    },
    {
      time: "7:00 PM",
      title: "Hip & Calf Release",
      reason: "Pre-run mobility prep",
      urgency: "medium",
      routineId: "hip-release",
    },
  ];

  const insights = [
    {
      id: 1,
      title: "Neck tension spikes on Tue/Thu",
      detail: "Your back-to-back call days are correlating with elevated neck soreness scores. The 90-sec reset after calls reduced next-day soreness by 40%.",
      metric: "+40% relief",
      metricColor: "#22C55E",
      icon: "TrendingDown",
      week: [2, 4, 3, 5, 4, 2, 1],
    },
    {
      id: 2,
      title: "4-2-6 Breathe boosts focus",
      detail: "On days you complete the afternoon breathe session, your self-reported focus score is 1.8 points higher in the evening check-in.",
      metric: "+1.8 focus",
      metricColor: "#3B82F6",
      icon: "Brain",
      week: [3, 3, 4, 5, 4, 5, 5],
    },
    {
      id: 3,
      title: "Sleep quality drives recovery",
      detail: "Nights with 7+ hours of sleep lead to 60% fewer overload moments the following day. Your average this week: 6.2h.",
      metric: "6.2h avg",
      metricColor: "#F59E0B",
      icon: "Moon",
      week: [5, 6, 7, 6, 8, 6, 7],
    },
    {
      id: 4,
      title: "Running streak: hip tightness",
      detail: "3 consecutive running days without mobility work leads to your hip soreness score jumping from 2 to 4. Post-run routine keeps it at 1-2.",
      metric: "2x safer",
      metricColor: "#FF6B35",
      icon: "Activity",
      week: [1, 2, 2, 4, 3, 2, 1],
    },
  ];

  const weekDays = ["M", "T", "W", "T", "F", "S", "S"];
  const streakData = [true, true, true, false, true, true, false];

  // ─── Helpers ──────────────────────────────────────────────────────────────
  const calcRecoveryScore = () => {
    if (!scanDone) return null;
    const vals = Object.values(scanAnswers);
    if (!vals.length) return null;
    return Math.round((vals.reduce((a, b) => a + b, 0) / (vals.length * 3)) * 100);
  };

  const recoveryScore = calcRecoveryScore();

  const scoreColor = (s) => {
    if (s === null) return t.textMuted;
    if (s >= 70) return t.green;
    if (s >= 40) return t.yellow;
    return t.red;
  };

  const scoreLabel = (s) => {
    if (s === null) return "—";
    if (s >= 70) return "Good";
    if (s >= 40) return "Fair";
    return "Low";
  };

  const btnPress = (id, fn) => {
    setPressedBtn(id);
    setTimeout(() => setPressedBtn(null), 150);
    fn && fn();
  };

  const btnStyle = (id, base = {}) => ({
    ...base,
    transform: pressedBtn === id ? "scale(0.96)" : "scale(1)",
    transition: "transform 0.1s ease, opacity 0.1s ease",
    cursor: "pointer",
  });

  const urgencyColor = (u) => {
    if (u === "high") return t.red;
    if (u === "medium") return t.yellow;
    return t.accent;
  };

  const urgencyBg = (u) => {
    if (u === "high") return t.redLight;
    if (u === "medium") return t.yellowLight;
    return t.accentLight;
  };

  // ─── Screen: Home ─────────────────────────────────────────────────────────
  const HomeScreen = () => {
    const now = new Date();
    const hour = now.getHours();
    const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

    return (
      <div style={{ flex: 1, overflowY: "auto", paddingBottom: 80 }}>
        {/* Header */}
        <div style={{ padding: "16px 20px 12px", background: t.surface }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 13, color: t.textSub, fontWeight: 500 }}>{greeting}, Alex</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: t.text, marginTop: 2 }}>
                {scanDone ? "Recovery Forecast" : "Start your scan"}
              </div>
            </div>
            <div style={{
              width: 44, height: 44, borderRadius: 22,
              background: t.primaryGrad,
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: `0 4px 12px rgba(255,107,53,0.35)`,
            }}>
              <span style={{ fontSize: 20 }}>⚡</span>
            </div>
          </div>
        </div>

        {/* Streak bar */}
        <div style={{ padding: "12px 20px", background: t.surface, borderBottom: `1px solid ${t.cardBorder}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: t.textSub }}>RECOVERY STREAK</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: t.primary }}>5 days 🔥</span>
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            {weekDays.map((d, i) => (
              <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                <div style={{
                  width: "100%", height: 28, borderRadius: 6,
                  background: streakData[i] ? t.primaryGrad : t.surfaceAlt,
                  border: streakData[i] ? "none" : `1px solid ${t.cardBorder}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  {streakData[i] && <span style={{ fontSize: 12 }}>✓</span>}
                </div>
                <span style={{ fontSize: 11, color: t.textMuted, fontWeight: 500 }}>{d}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ padding: "16px 20px", display: "flex", flexDirection: "column", gap: 14 }}>
          {/* Recovery Score Card */}
          {scanDone && recoveryScore !== null ? (
            <div style={{
              background: t.card, borderRadius: 20, padding: 20,
              border: `1px solid ${t.cardBorder}`, boxShadow: t.shadow,
            }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: t.textSub, marginBottom: 6 }}>TODAY'S RECOVERY SCORE</div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                    <span style={{ fontSize: 52, fontWeight: 800, color: scoreColor(recoveryScore), lineHeight: 1 }}>
                      {recoveryScore}
                    </span>
                    <span style={{ fontSize: 16, fontWeight: 600, color: scoreColor(recoveryScore) }}>
                      {scoreLabel(recoveryScore)}
                    </span>
                  </div>
                </div>
                <div style={{ position: "relative", width: 80, height: 80 }}>
                  <svg width="80" height="80" style={{ transform: "rotate(-90deg)" }}>
                    <circle cx="40" cy="40" r="32" fill="none" stroke={t.cardBorder} strokeWidth="6" />
                    <circle cx="40" cy="40" r="32" fill="none"
                      stroke={scoreColor(recoveryScore)} strokeWidth="6"
                      strokeDasharray={`${2 * Math.PI * 32 * recoveryScore / 100} ${2 * Math.PI * 32}`}
                      strokeLinecap="round" />
                  </svg>
                  <div style={{
                    position: "absolute", inset: 0,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 22,
                  }}>
                    {recoveryScore >= 70 ? "✅" : recoveryScore >= 40 ? "⚠️" : "🔴"}
                  </div>
                </div>
              </div>
              <div style={{ marginTop: 16, display: "flex", gap: 8 }}>
                {[
                  { label: "Sleep", val: scanAnswers.sleep, max: 3 },
                  { label: "Body", val: scanAnswers.soreness, max: 3 },
                  { label: "Mind", val: scanAnswers.stress, max: 3 },
                  { label: "Load", val: scanAnswers.schedule, max: 3 },
                ].map((item) => (
                  <div key={item.label} style={{ flex: 1, textAlign: "center" }}>
                    <div style={{
                      height: 4, borderRadius: 2, background: t.cardBorder, marginBottom: 4, overflow: "hidden",
                    }}>
                      <div style={{
                        height: "100%", width: `${(item.val / item.max) * 100}%`,
                        background: t.primaryGrad, borderRadius: 2,
                      }} />
                    </div>
                    <span style={{ fontSize: 11, color: t.textMuted }}>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div
              onClick={() => { setActiveTab("scan"); setScanStep(0); setScanDone(false); setScanAnswers({}); }}
              style={{
                ...btnStyle("scan-start"),
                background: t.primaryGrad,
                borderRadius: 20, padding: 20,
                boxShadow: "0 8px 24px rgba(255,107,53,0.35)",
              }}
              onMouseDown={() => setPressedBtn("scan-start")}
            >
              <div style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.7)", marginBottom: 4 }}>
                20-SECOND SCAN
              </div>
              <div style={{ fontSize: 20, fontWeight: 800, color: "#fff", marginBottom: 8 }}>
                How's your body today?
              </div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.8)", marginBottom: 16 }}>
                4 quick questions → personalized recovery plan
              </div>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                background: "rgba(255,255,255,0.25)", borderRadius: 20, padding: "8px 16px",
              }}>
                <span style={{ color: "#fff", fontSize: 13, fontWeight: 700 }}>Start Scan →</span>
              </div>
            </div>
          )}

          {/* Today's Interventions */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: t.text }}>Today's Recovery Plan</span>
              <span style={{ fontSize: 12, color: t.primary, fontWeight: 600 }}>4 actions</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {todayInterventions.map((item, i) => (
                <div key={i}
                  onClick={() => {
                    if (item.routineId) {
                      setActiveRoutine(routines.find(r => r.id === item.routineId));
                      setActiveTab("routines");
                    }
                  }}
                  style={{
                    ...btnStyle(`iv-${i}`),
                    background: t.card, borderRadius: 14, padding: "12px 14px",
                    border: `1px solid ${t.cardBorder}`,
                    display: "flex", alignItems: "center", gap: 12,
                  }}
                  onMouseDown={() => item.routineId && setPressedBtn(`iv-${i}`)}
                >
                  <div style={{
                    width: 36, height: 36, borderRadius: 10,
                    background: urgencyBg(item.urgency),
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                  }}>
                    <div style={{ width: 8, height: 8, borderRadius: 4, background: urgencyColor(item.urgency) }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: t.text }}>{item.title}</div>
                    <div style={{ fontSize: 12, color: t.textSub, marginTop: 2 }}>{item.reason}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: urgencyColor(item.urgency) }}>{item.time}</div>
                    {item.routineId && (
                      <div style={{ fontSize: 11, color: t.textMuted, marginTop: 2 }}>Tap →</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Breathe Card */}
          <div style={{
            background: t.accentLight, borderRadius: 20, padding: 16,
            border: `1px solid ${t.accent}33`, display: "flex", alignItems: "center", gap: 14,
          }}>
            <div style={{
              width: 48, height: 48, borderRadius: 14,
              background: t.accent,
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}>
              <span style={{ fontSize: 22 }}>💨</span>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: t.text }}>Feeling tense?</div>
              <div style={{ fontSize: 12, color: t.textSub }}>Try a 90-sec breathing reset now</div>
            </div>
            <div
              onClick={() => { setActiveTab("scan"); }}
              style={{
                ...btnStyle("breathe-now"),
                background: t.accent, borderRadius: 10, padding: "8px 14px",
              }}
              onMouseDown={() => setPressedBtn("breathe-now")}
            >
              <span style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>Go</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ─── Screen: Scan ─────────────────────────────────────────────────────────
  const ScanScreen = () => {
    if (scanDone) {
      return (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 32, gap: 20 }}>
          <div style={{ fontSize: 60 }}>✅</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: t.text, textAlign: "center" }}>Scan Complete!</div>
          <div style={{ fontSize: 14, color: t.textSub, textAlign: "center", lineHeight: 1.6 }}>
            Your recovery score is ready. Check your personalized plan on the home screen.
          </div>
          {recoveryScore !== null && (
            <div style={{
              background: t.primaryGrad, borderRadius: 20, padding: "20px 40px", textAlign: "center",
              boxShadow: "0 8px 24px rgba(255,107,53,0.3)",
            }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.7)" }}>RECOVERY SCORE</div>
              <div style={{ fontSize: 56, fontWeight: 800, color: "#fff", lineHeight: 1.1 }}>{recoveryScore}</div>
              <div style={{ fontSize: 16, fontWeight: 600, color: "rgba(255,255,255,0.9)" }}>{scoreLabel(recoveryScore)}</div>
            </div>
          )}
          <div
            onClick={() => { setActiveTab("home"); }}
            style={{
              ...btnStyle("scan-done"),
              background: t.primaryGrad, borderRadius: 14, padding: "14px 32px",
              boxShadow: "0 4px 16px rgba(255,107,53,0.3)", width: "100%", textAlign: "center",
            }}
            onMouseDown={() => setPressedBtn("scan-done")}
          >
            <span style={{ fontSize: 16, fontWeight: 700, color: "#fff" }}>View My Plan</span>
          </div>

          {/* Breathe Tool */}
          <div style={{ width: "100%", background: t.card, borderRadius: 20, padding: 20, border: `1px solid ${t.cardBorder}` }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: t.text, marginBottom: 4 }}>Quick Breathe Reset</div>
            <div style={{ fontSize: 13, color: t.textSub, marginBottom: 16 }}>4-2-6 breathing technique</div>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
              <div style={{
                width: 100, height: 100, borderRadius: 50,
                background: breatheActive
                  ? breathePhase === "inhale" ? `radial-gradient(circle, ${t.primary}44, ${t.primary}22)` : `radial-gradient(circle, ${t.accent}44, ${t.accent}22)`
                  : t.surfaceAlt,
                border: `3px solid ${breatheActive ? (breathePhase === "inhale" ? t.primary : t.accent) : t.cardBorder}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                flexDirection: "column",
                transition: "all 0.8s ease",
                transform: breatheActive && breathePhase === "inhale" ? "scale(1.15)" : breatheActive && breathePhase === "exhale" ? "scale(0.88)" : "scale(1)",
              }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: breatheActive ? t.text : t.textMuted }}>
                  {breatheActive ? breathePhase.toUpperCase() : "READY"}
                </div>
                {breatheActive && breatheCount > 0 && (
                  <div style={{ fontSize: 11, color: t.textSub }}>{breatheCount} cycles</div>
                )}
              </div>
            </div>
            <div
              onClick={() => { setBreatheActive(!breatheActive); if (!breatheActive) setBreatheCount(0); }}
              style={{
                ...btnStyle("breathe-toggle"),
                background: breatheActive ? t.surfaceAlt : t.primaryGrad,
                borderRadius: 12, padding: "12px", textAlign: "center",
                border: breatheActive ? `1px solid ${t.cardBorder}` : "none",
              }}
              onMouseDown={() => setPressedBtn("breathe-toggle")}
            >
              <span style={{ fontSize: 14, fontWeight: 700, color: breatheActive ? t.text : "#fff" }}>
                {breatheActive ? "Stop" : "Start Breathing"}
              </span>
            </div>
          </div>
        </div>
      );
    }

    const q = scanQuestions[scanStep];
    const progress = (scanStep / scanQuestions.length) * 100;

    return (
      <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "20px 20px 80px" }}>
        {/* Progress */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: t.textSub }}>STRAIN SCAN</span>
            <span style={{ fontSize: 12, fontWeight: 600, color: t.primary }}>{scanStep + 1} / {scanQuestions.length}</span>
          </div>
          <div style={{ height: 6, background: t.surfaceAlt, borderRadius: 3 }}>
            <div style={{
              height: "100%", width: `${((scanStep + 1) / scanQuestions.length) * 100}%`,
              background: t.primaryGrad, borderRadius: 3, transition: "width 0.4s ease",
            }} />
          </div>
        </div>

        <div style={{ fontSize: 40, marginBottom: 12, textAlign: "center" }}>{q.emoji}</div>
        <div style={{ fontSize: 22, fontWeight: 800, color: t.text, textAlign: "center", marginBottom: 32, lineHeight: 1.3 }}>
          {q.q}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {q.options.map((opt, i) => (
            <div
              key={i}
              onClick={() => {
                setScanAnswers((prev) => ({ ...prev, [q.id]: opt.val }));
                setTimeout(() => {
                  if (scanStep < scanQuestions.length - 1) {
                    setScanStep(scanStep + 1);
                  } else {
                    setScanDone(true);
                  }
                }, 200);
              }}
              style={{
                ...btnStyle(`q-${scanStep}-${i}`),
                background: scanAnswers[q.id] === opt.val ? t.primaryGrad : t.card,
                borderRadius: 14, padding: "16px 18px",
                border: `2px solid ${scanAnswers[q.id] === opt.val ? t.primary : t.cardBorder}`,
                display: "flex", alignItems: "center", justifyContent: "space-between",
              }}
              onMouseDown={() => setPressedBtn(`q-${scanStep}-${i}`)}
            >
              <span style={{
                fontSize: 15, fontWeight: 600,
                color: scanAnswers[q.id] === opt.val ? "#fff" : t.text,
              }}>{opt.label}</span>
              <div style={{
                width: 22, height: 22, borderRadius: 11,
                border: `2px solid ${scanAnswers[q.id] === opt.val ? "rgba(255,255,255,0.5)" : t.cardBorder}`,
                background: scanAnswers[q.id] === opt.val ? "rgba(255,255,255,0.25)" : "transparent",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                {scanAnswers[q.id] === opt.val && <span style={{ color: "#fff", fontSize: 12 }}>✓</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ─── Screen: Routines ─────────────────────────────────────────────────────
  const RoutinesScreen = () => {
    if (activeRoutine && routineStep >= 0) {
      const steps = activeRoutine.steps;
      const curStep = steps[routineStep];
      const totalDone = completedRoutines.includes(activeRoutine.id);
      const allDone = routineStep >= steps.length;

      if (allDone) {
        return (
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 32, gap: 20 }}>
            <div style={{ fontSize: 60 }}>🎉</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: t.text, textAlign: "center" }}>Routine Complete!</div>
            <div style={{ fontSize: 14, color: t.textSub, textAlign: "center", lineHeight: 1.6 }}>
              Great work! {activeRoutine.benefit}
            </div>
            <div style={{
              background: t.greenLight, borderRadius: 16, padding: 16, width: "100%",
              border: `1px solid ${t.green}33`,
            }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: t.green }}>🏆 {activeRoutine.title} Complete</div>
              <div style={{ fontSize: 13, color: t.textSub, marginTop: 4 }}>{activeRoutine.duration} of recovery done</div>
            </div>
            <div style={{ display: "flex", gap: 10, width: "100%" }}>
              <div
                onClick={() => {
                  setActiveRoutine(null);
                  setRoutineStep(0);
                  setRoutineRunning(false);
                  setRoutineTimer(0);
                }}
                style={{
                  ...btnStyle("routine-back"),
                  flex: 1, background: t.surfaceAlt, borderRadius: 14, padding: "14px",
                  textAlign: "center", border: `1px solid ${t.cardBorder}`,
                }}
                onMouseDown={() => setPressedBtn("routine-back")}
              >
                <span style={{ fontSize: 14, fontWeight: 700, color: t.text }}>Back</span>
              </div>
              <div
                onClick={() => {
                  setCompletedRoutines((prev) => [...prev, activeRoutine.id]);
                  setActiveRoutine(null); setRoutineStep(0);
                  setRoutineRunning(false); setRoutineTimer(0);
                  setActiveTab("home");
                }}
                style={{
                  ...btnStyle("routine-done"),
                  flex: 2, background: t.primaryGrad, borderRadius: 14, padding: "14px",
                  textAlign: "center", boxShadow: "0 4px 12px rgba(255,107,53,0.3)",
                }}
                onMouseDown={() => setPressedBtn("routine-done")}
              >
                <span style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>Log & Return</span>
              </div>
            </div>
          </div>
        );
      }

      return (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "20px 20px 80px" }}>
          {/* Back */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
            <div
              onClick={() => { setActiveRoutine(null); setRoutineStep(0); setRoutineRunning(false); setRoutineTimer(0); }}
              style={{ ...btnStyle("back"), padding: "6px 12px", background: t.surfaceAlt, borderRadius: 10, border: `1px solid ${t.cardBorder}` }}
              onMouseDown={() => setPressedBtn("back")}
            >
              <span style={{ fontSize: 14, color: t.text }}>← Back</span>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 16, fontWeight: 800, color: t.text }}>{activeRoutine.title}</div>
            </div>
            <div style={{ fontSize: 13, fontWeight: 600, color: t.primary }}>
              {routineStep + 1}/{steps.length}
            </div>
          </div>

          {/* Progress dots */}
          <div style={{ display: "flex", gap: 6, marginBottom: 24 }}>
            {steps.map((_, i) => (
              <div key={i} style={{
                flex: 1, height: 4, borderRadius: 2,
                background: i <= routineStep ? t.primary : t.cardBorder,
                transition: "background 0.3s ease",
              }} />
            ))}
          </div>

          {/* Current step */}
          <div style={{
            background: t.card, borderRadius: 24, padding: 24, marginBottom: 16,
            border: `1px solid ${t.cardBorder}`, boxShadow: t.shadow,
          }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: t.textSub, marginBottom: 8 }}>STEP {routineStep + 1}</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: t.text, marginBottom: 10 }}>{curStep.name}</div>
            <div style={{ fontSize: 15, color: t.textSub, lineHeight: 1.6, marginBottom: 20 }}>{curStep.desc}</div>
            <div style={{
              display: "flex", alignItems: "center", gap: 8,
              background: t.primaryLight, borderRadius: 12, padding: "10px 14px",
            }}>
              <span style={{ fontSize: 16 }}>⏱</span>
              <span style={{ fontSize: 14, fontWeight: 700, color: t.primary }}>{curStep.dur} seconds</span>
            </div>
          </div>

          {/* Timer ring */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
            <div style={{ position: "relative", width: 120, height: 120 }}>
              <svg width="120" height="120" style={{ transform: "rotate(-90deg)" }}>
                <circle cx="60" cy="60" r="50" fill="none" stroke={t.cardBorder} strokeWidth="8" />
                <circle cx="60" cy="60" r="50" fill="none"
                  stroke={t.primary} strokeWidth="8"
                  strokeDasharray={`${2 * Math.PI * 50 * Math.min(routineTimer / curStep.dur, 1)} ${2 * Math.PI * 50}`}
                  strokeLinecap="round" style={{ transition: "stroke-dasharray 1s linear" }} />
              </svg>
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
                <div style={{ fontSize: 24, fontWeight: 800, color: t.text }}>{routineTimer}s</div>
                <div style={{ fontSize: 11, color: t.textMuted }}>of {curStep.dur}s</div>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            <div
              onClick={() => setRoutineRunning(!routineRunning)}
              style={{
                ...btnStyle("timer-toggle"),
                flex: 1, background: routineRunning ? t.surfaceAlt : t.primaryGrad,
                borderRadius: 14, padding: "14px", textAlign: "center",
                border: routineRunning ? `1px solid ${t.cardBorder}` : "none",
                boxShadow: routineRunning ? "none" : "0 4px 12px rgba(255,107,53,0.3)",
              }}
              onMouseDown={() => setPressedBtn("timer-toggle")}
            >
              <span style={{ fontSize: 14, fontWeight: 700, color: routineRunning ? t.text : "#fff" }}>
                {routineRunning ? "⏸ Pause" : "▶ Start Timer"}
              </span>
            </div>
            <div
              onClick={() => { setRoutineStep(routineStep + 1); setRoutineTimer(0); setRoutineRunning(false); }}
              style={{
                ...btnStyle("next-step"),
                flex: 1, background: t.surfaceAlt, borderRadius: 14, padding: "14px",
                textAlign: "center", border: `1px solid ${t.cardBorder}`,
              }}
              onMouseDown={() => setPressedBtn("next-step")}
            >
              <span style={{ fontSize: 14, fontWeight: 700, color: t.text }}>Next Step →</span>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div style={{ flex: 1, overflowY: "auto", paddingBottom: 80 }}>
        <div style={{ padding: "16px 20px 12px", background: t.surface, borderBottom: `1px solid ${t.cardBorder}` }}>
          <div style={{ fontSize: 20, fontWeight: 800, color: t.text }}>Micro-Routines</div>
          <div style={{ fontSize: 13, color: t.textSub, marginTop: 2 }}>Tailored to your patterns</div>
        </div>

        <div style={{ padding: "16px 20px", display: "flex", flexDirection: "column", gap: 14 }}>
          {routines.map((r) => {
            const done = completedRoutines.includes(r.id);
            return (
              <div
                key={r.id}
                onClick={() => { setActiveRoutine(r); setRoutineStep(0); setRoutineTimer(0); setRoutineRunning(false); }}
                style={{
                  ...btnStyle(`r-${r.id}`),
                  background: t.card, borderRadius: 18, padding: 18,
                  border: done ? `2px solid ${t.green}` : `1px solid ${t.cardBorder}`,
                  boxShadow: t.shadowSm,
                }}
                onMouseDown={() => setPressedBtn(`r-${r.id}`)}
              >
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12 }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                      <span style={{
                        fontSize: 11, fontWeight: 700, color: r.tagColor,
                        background: `${r.tagColor}22`, borderRadius: 6, padding: "2px 8px",
                      }}>{r.tag}</span>
                      {done && <span style={{ fontSize: 11, fontWeight: 700, color: t.green, background: t.greenLight, borderRadius: 6, padding: "2px 8px" }}>✓ Done</span>}
                    </div>
                    <div style={{ fontSize: 18, fontWeight: 800, color: t.text }}>{r.title}</div>
                    <div style={{ fontSize: 13, color: t.textSub, marginTop: 2 }}>{r.subtitle}</div>
                  </div>
                  <div style={{
                    background: `${r.tagColor}22`, borderRadius: 12, padding: "6px 12px",
                    fontSize: 13, fontWeight: 700, color: r.tagColor,
                  }}>{r.duration}</div>
                </div>
                <div style={{ fontSize: 12, color: t.textMuted, fontStyle: "italic", borderTop: `1px solid ${t.cardBorder}`, paddingTop: 10 }}>
                  💡 {r.benefit}
                </div>
                <div style={{ marginTop: 10, display: "flex", gap: 4 }}>
                  {r.steps.map((_, i) => (
                    <div key={i} style={{
                      flex: 1, height: 3, borderRadius: 2,
                      background: i === 0 && !done ? t.primary : t.cardBorder,
                    }} />
                  ))}
                </div>
                <div style={{ marginTop: 8, fontSize: 12, color: t.textSub }}>{r.steps.length} steps</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // ─── Screen: Insights ─────────────────────────────────────────────────────
  const InsightsScreen = () => {
    if (selectedInsight) {
      const ins = selectedInsight;
      return (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "20px 20px 80px" }}>
          <div
            onClick={() => setSelectedInsight(null)}
            style={{ ...btnStyle("ins-back"), display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 20, background: t.surfaceAlt, borderRadius: 10, padding: "8px 14px", border: `1px solid ${t.cardBorder}` }}
            onMouseDown={() => setPressedBtn("ins-back")}
          >
            <span style={{ fontSize: 13, color: t.text }}>← Insights</span>
          </div>

          <div style={{ fontSize: 22, fontWeight: 800, color: t.text, marginBottom: 6, lineHeight: 1.3 }}>{ins.title}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
            <span style={{ fontSize: 20, fontWeight: 800, color: ins.metricColor }}>{ins.metric}</span>
            <span style={{ fontSize: 13, color: t.textSub }}>vs. baseline</span>
          </div>

          <div style={{ background: t.card, borderRadius: 18, padding: 20, marginBottom: 16, border: `1px solid ${t.cardBorder}` }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: t.textSub, marginBottom: 12 }}>THIS WEEK</div>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 80 }}>
              {ins.week.map((val, i) => {
                const maxVal = Math.max(...ins.week);
                return (
                  <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                    <div style={{
                      width: "100%", height: `${(val / maxVal) * 64}px`,
                      background: i === 6 ? t.primaryGrad : `linear-gradient(180deg, ${ins.metricColor}88, ${ins.metricColor}44)`,
                      borderRadius: "4px 4px 0 0",
                      minHeight: 4,
                    }} />
                    <span style={{ fontSize: 10, color: t.textMuted }}>{weekDays[i]}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div style={{ background: t.card, borderRadius: 18, padding: 20, border: `1px solid ${t.cardBorder}` }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: t.textSub, marginBottom: 10 }}>INSIGHT</div>
            <div style={{ fontSize: 14, color: t.text, lineHeight: 1.7 }}>{ins.detail}</div>
          </div>
        </div>
      );
    }

    return (
      <div style={{ flex: 1, overflowY: "auto", paddingBottom: 80 }}>
        <div style={{ padding: "16px 20px 12px", background: t.surface, borderBottom: `1px solid ${t.cardBorder}` }}>
          <div style={{ fontSize: 20, fontWeight: 800, color: t.text }}>Recovery Insights</div>
          <div style={{ fontSize: 13, color: t.textSub, marginTop: 2 }}>What's actually helping you</div>
        </div>

        <div style={{ padding: "16px 20px", display: "flex", flexDirection: "column", gap: 12 }}>
          {/* Summary strip */}
          <div style={{
            background: t.primaryGrad, borderRadius: 18, padding: 18,
            boxShadow: "0 6px 20px rgba(255,107,53,0.3)",
          }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.7)", marginBottom: 8 }}>WEEKLY SUMMARY</div>
            <div style={{ display: "flex", gap: 16 }}>
              {[
                { label: "Routines done", val: completedRoutines.length + 11, unit: "" },
                { label: "Avg score", val: scanDone && recoveryScore ? recoveryScore : 72, unit: "" },
                { label: "Streak", val: 5, unit: "d" },
              ].map((s) => (
                <div key={s.label} style={{ flex: 1, textAlign: "center" }}>
                  <div style={{ fontSize: 26, fontWeight: 800, color: "#fff" }}>{s.val}{s.unit}</div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.7)" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ fontSize: 14, fontWeight: 700, color: t.text, marginTop: 4 }}>Patterns Found</div>

          {insights.map((ins) => (
            <div
              key={ins.id}
              onClick={() => setSelectedInsight(ins)}
              style={{
                ...btnStyle(`ins-${ins.id}`),
                background: t.card, borderRadius: 16, padding: 16,
                border: `1px solid ${t.cardBorder}`, boxShadow: t.shadowSm,
              }}
              onMouseDown={() => setPressedBtn(`ins-${ins.id}`)}
            >
              <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 12,
                  background: `${ins.metricColor}22`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0, fontSize: 20,
                }}>
                  {ins.id === 1 ? "📉" : ins.id === 2 ? "🧠" : ins.id === 3 ? "🌙" : "🏃"}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: t.text, lineHeight: 1.3, marginBottom: 6 }}>{ins.title}</div>
                  <div style={{ fontSize: 12, color: t.textSub, lineHeight: 1.5 }}>
                    {ins.detail.substring(0, 80)}...
                  </div>
                </div>
              </div>
              <div style={{ marginTop: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 24 }}>
                  {ins.week.map((val, i) => {
                    const mx = Math.max(...ins.week);
                    return (
                      <div key={i} style={{
                        width: 14, height: `${(val / mx) * 20}px`,
                        background: i === 6 ? ins.metricColor : `${ins.metricColor}55`,
                        borderRadius: "2px 2px 0 0", minHeight: 2,
                      }} />
                    );
                  })}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ fontSize: 16, fontWeight: 800, color: ins.metricColor }}>{ins.metric}</span>
                  <span style={{ fontSize: 13, color: t.textSub }}>→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ─── Screen: Settings ─────────────────────────────────────────────────────
  const SettingsScreen = () => {
    const [notifications, setNotifications] = useState(true);
    const [calendarSync, setCalendarSync] = useState(true);
    const [locationAware, setLocationAware] = useState(false);
    const [wearable, setWearable] = useState(false);

    const Toggle = ({ val, onToggle, id }) => (
      <div
        onClick={() => { btnPress(id, onToggle); }}
        style={{
          ...btnStyle(id),
          width: 44, height: 24, borderRadius: 12,
          background: val ? t.primary : t.cardBorder,
          position: "relative", transition: "background 0.2s ease",
        }}
      >
        <div style={{
          position: "absolute", top: 2, left: val ? 22 : 2,
          width: 20, height: 20, borderRadius: 10, background: "#fff",
          boxShadow: "0 1px 4px rgba(0,0,0,0.2)", transition: "left 0.2s ease",
        }} />
      </div>
    );

    const Row = ({ icon, label, sub, right }) => (
      <div style={{
        display: "flex", alignItems: "center", gap: 14, padding: "14px 0",
        borderBottom: `1px solid ${t.cardBorder}`,
      }}>
        <div style={{
          width: 36, height: 36, borderRadius: 10,
          background: t.primaryLight,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 18, flexShrink: 0,
        }}>{icon}</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: t.text }}>{label}</div>
          {sub && <div style={{ fontSize: 12, color: t.textSub, marginTop: 2 }}>{sub}</div>}
        </div>
        {right}
      </div>
    );

    return (
      <div style={{ flex: 1, overflowY: "auto", paddingBottom: 80 }}>
        <div style={{ padding: "16px 20px 12px", background: t.surface, borderBottom: `1px solid ${t.cardBorder}` }}>
          <div style={{ fontSize: 20, fontWeight: 800, color: t.text }}>Settings</div>
        </div>

        {/* Profile */}
        <div style={{ margin: 20, background: t.card, borderRadius: 18, padding: 16, border: `1px solid ${t.cardBorder}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{
              width: 56, height: 56, borderRadius: 28,
              background: t.primaryGrad,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 24, boxShadow: "0 4px 12px rgba(255,107,53,0.3)",
            }}>👤</div>
            <div>
              <div style={{ fontSize: 17, fontWeight: 800, color: t.text }}>Alex Rivera</div>
              <div style={{ fontSize: 13, color: t.textSub }}>alex@example.com</div>
              <div style={{ fontSize: 12, color: t.primary, fontWeight: 600, marginTop: 2 }}>Runner · Desk worker</div>
            </div>
          </div>
        </div>

        {/* Theme toggle */}
        <div style={{ margin: "0 20px 20px", background: t.card, borderRadius: 18, padding: "0 16px", border: `1px solid ${t.cardBorder}` }}>
          <Row
            icon={darkMode ? "🌙" : "☀️"}
            label="Appearance"
            sub={darkMode ? "Dark mode enabled" : "Light mode enabled"}
            right={
              <div
                onClick={() => btnPress("theme-toggle", () => setDarkMode(!darkMode))}
                style={{
                  ...btnStyle("theme-toggle"),
                  background: darkMode ? t.secondary : t.primaryGrad,
                  borderRadius: 20, padding: "8px 14px",
                }}
              >
                <span style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>
                  {darkMode ? "Light" : "Dark"}
                </span>
              </div>
            }
          />
          <Row
            icon="🔔"
            label="Smart Reminders"
            sub="Location & calendar-aware nudges"
            right={<Toggle val={notifications} onToggle={() => setNotifications(!notifications)} id="notif" />}
          />
          <Row
            icon="📅"
            label="Calendar Sync"
            sub="Detect meeting loads automatically"
            right={<Toggle val={calendarSync} onToggle={() => setCalendarSync(!calendarSync)} id="cal" />}
          />
          <Row
            icon="📍"
            label="Location Awareness"
            sub="Context-based suggestions"
            right={<Toggle val={locationAware} onToggle={() => setLocationAware(!locationAware)} id="loc" />}
          />
          <Row
            icon="⌚"
            label="Wearable Data"
            sub="Connect Apple Watch / Garmin"
            right={<Toggle val={wearable} onToggle={() => setWearable(!wearable)} id="wear" />}
          />
        </div>

        {/* Profile type */}
        <div style={{ margin: "0 20px 20px" }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: t.textSub, marginBottom: 10 }}>MY PROFILE</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, background: t.card, borderRadius: 18, padding: "0 16px", border: `1px solid ${t.cardBorder}` }}>
            {[
              { icon: "🏃", label: "Primary Activity", val: "Running (4x/week)" },
              { icon: "💼", label: "Work Style", val: "Desk-based, 8h/day" },
              { icon: "🚇", label: "Commute", val: "40 min daily" },
              { icon: "😴", label: "Sleep Goal", val: "7.5 hours" },
            ].map((item) => (
              <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 14, padding: "13px 0", borderBottom: `1px solid ${t.cardBorder}` }}>
                <span style={{ fontSize: 18, width: 36, textAlign: "center" }}>{item.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, color: t.textSub }}>{item.label}</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: t.text, marginTop: 1 }}>{item.val}</div>
                </div>
                <span style={{ color: t.textMuted, fontSize: 16 }}>›</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // ─── Nav tabs ─────────────────────────────────────────────────────────────
  const tabs = [
    { id: "home", label: "Home", icon: "🏠" },
    { id: "scan", label: "Scan", icon: "⚡" },
    { id: "routines", label: "Routines", icon: "🔄" },
    { id: "insights", label: "Insights", icon: "📊" },
    { id: "settings", label: "Settings", icon: "⚙️" },
  ];

  // ─── Time ─────────────────────────────────────────────────────────────────
  const now = new Date();
  const timeStr = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false });

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <div style={{
      minHeight: "100vh", background: "#e8e5e0",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: 24,
    }}>
      {/* Phone frame */}
      <div style={{
        width: 375, height: 812,
        background: t.bg,
        borderRadius: 50,
        overflow: "hidden",
        boxShadow: "0 40px 80px rgba(0,0,0,0.35), 0 0 0 10px #1a1a1a, 0 0 0 12px #333",
        display: "flex", flexDirection: "column",
        position: "relative",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}>
        {/* Dynamic Island */}
        <div style={{
          position: "absolute", top: 12, left: "50%", transform: "translateX(-50%)",
          width: 120, height: 34, background: "#000", borderRadius: 20,
          zIndex: 100,
          boxShadow: "0 0 0 2px #1a1a1a",
        }} />

        {/* Status bar */}
        <div style={{
          padding: "14px 28px 0",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          background: t.surface, zIndex: 50, paddingTop: 54,
        }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: t.statusBar }}>{timeStr}</span>
          <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
            <span style={{ fontSize: 11, color: t.statusBar }}>▲▲▲</span>
            <span style={{ fontSize: 11, color: t.statusBar }}>WiFi</span>
            <span style={{ fontSize: 11, color: t.statusBar }}>🔋</span>
          </div>
        </div>

        {/* Screen content */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflowY: "auto", background: t.bg }}>
          {activeTab === "home" && <HomeScreen />}
          {activeTab === "scan" && <ScanScreen />}
          {activeTab === "routines" && <RoutinesScreen />}
          {activeTab === "insights" && <InsightsScreen />}
          {activeTab === "settings" && <SettingsScreen />}
        </div>

        {/* Bottom Nav */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          background: t.navBg, borderTop: `1px solid ${t.navBorder}`,
          display: "flex", padding: "8px 0 20px",
          zIndex: 50, boxShadow: `0 -8px 24px rgba(0,0,0,0.06)`,
        }}>
          {tabs.map((tab) => {
            const active = activeTab === tab.id;
            return (
              <div
                key={tab.id}
                onClick={() => {
                  btnPress(`tab-${tab.id}`, () => {
                    setActiveTab(tab.id);
                    if (tab.id !== "routines") setActiveRoutine(null);
                  });
                }}
                style={{
                  ...btnStyle(`tab-${tab.id}`),
                  flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3, padding: "6px 0",
                }}
              >
                <div style={{
                  width: 40, height: 28, borderRadius: 10,
                  background: active ? t.primaryLight : "transparent",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "background 0.2s ease",
                }}>
                  <span style={{ fontSize: 17, opacity: active ? 1 : 0.5 }}>{tab.icon}</span>
                </div>
                <span style={{
                  fontSize: 10, fontWeight: active ? 700 : 500,
                  color: active ? t.primary : t.textMuted,
                  transition: "color 0.2s ease",
                }}>{tab.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
