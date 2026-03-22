const { useState, useEffect, useRef } = React;

const themes = {
  light: {
    bg: "#F5F4F0",
    surface: "#FFFFFF",
    surfaceAlt: "#F0EEE9",
    card: "#FFFFFF",
    cardBorder: "#E8E5DE",
    text: "#1A1714",
    textSec: "#6B6560",
    textMuted: "#A09890",
    primary: "#FF4D1C",
    primaryLight: "#FF6B3D",
    primaryGlow: "rgba(255,77,28,0.15)",
    secondary: "#1C3FFF",
    accent: "#FFB800",
    accentGreen: "#00C853",
    navBg: "#FFFFFF",
    navBorder: "#E8E5DE",
    statusBar: "#1A1714",
    inputBg: "#F0EEE9",
    tagBg: "#FCEEE9",
    tagText: "#FF4D1C",
    divider: "#E8E5DE",
    skillBar: "#F0EEE9",
    overlay: "rgba(26,23,20,0.5)",
    gradientA: "linear-gradient(135deg, #FF4D1C 0%, #FF8A50 100%)",
    gradientB: "linear-gradient(135deg, #1C3FFF 0%, #6B8AFF 100%)",
    gradientC: "linear-gradient(135deg, #FFB800 0%, #FFD54F 100%)",
    cardGrad: "linear-gradient(160deg, #FF4D1C 0%, #FF6B3D 60%, #FF8A50 100%)",
    heroGrad: "linear-gradient(180deg, rgba(255,77,28,0.08) 0%, transparent 60%)",
  },
  dark: {
    bg: "#0F0D0B",
    surface: "#1A1714",
    surfaceAlt: "#242018",
    card: "#1F1C18",
    cardBorder: "#2E2A24",
    text: "#F5F2EC",
    textSec: "#A09888",
    textMuted: "#665E54",
    primary: "#FF5A2C",
    primaryLight: "#FF7A52",
    primaryGlow: "rgba(255,90,44,0.2)",
    secondary: "#4D6FFF",
    accent: "#FFB800",
    accentGreen: "#00E676",
    navBg: "#1A1714",
    navBorder: "#2E2A24",
    statusBar: "#F5F2EC",
    inputBg: "#242018",
    tagBg: "rgba(255,90,44,0.15)",
    tagText: "#FF7A52",
    divider: "#2E2A24",
    skillBar: "#2E2A24",
    overlay: "rgba(0,0,0,0.7)",
    gradientA: "linear-gradient(135deg, #FF5A2C 0%, #FF7A52 100%)",
    gradientB: "linear-gradient(135deg, #4D6FFF 0%, #8FA0FF 100%)",
    gradientC: "linear-gradient(135deg, #FFB800 0%, #FFCF4D 100%)",
    cardGrad: "linear-gradient(160deg, #CC3D16 0%, #FF5A2C 60%, #FF7A52 100%)",
    heroGrad: "linear-gradient(180deg, rgba(255,90,44,0.12) 0%, transparent 60%)",
  }
};

const fontLink = document.createElement("link");
fontLink.rel = "stylesheet";
fontLink.href = "https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap";
document.head.appendChild(fontLink);

const RIFTS = [
  { id: 1, name: "Wall Volley Blitz", type: "Accuracy", distance: "12m away", duration: "4 min", difficulty: "Medium", xp: 120, icon: "🎯", color: "#FF4D1C", players: 3, hot: true },
  { id: 2, name: "Stair Sprint Sprint", type: "Agility", distance: "38m away", duration: "3 min", difficulty: "Hard", xp: 180, icon: "⚡", color: "#1C3FFF", players: 7, hot: false },
  { id: 3, name: "Balance Hold Duel", type: "Balance", distance: "5m away", duration: "5 min", difficulty: "Easy", xp: 80, icon: "⚖️", color: "#FFB800", players: 2, hot: false },
  { id: 4, name: "Reaction Tap Race", type: "Reaction", distance: "0m", duration: "2 min", difficulty: "Medium", xp: 100, icon: "💥", color: "#00C853", players: 12, hot: true },
  { id: 5, name: "Bench Agility Flow", type: "Agility", distance: "60m away", duration: "6 min", difficulty: "Hard", xp: 200, icon: "🏃", color: "#9C27B0", players: 1, hot: false },
];

const DUELS = [
  { id: 1, opponent: "Marcus K.", avatar: "MK", challenge: "Wall Volley Blitz", status: "pending", time: "2m ago", xpWin: 150 },
  { id: 2, opponent: "Sofia R.", avatar: "SR", challenge: "Reaction Tap Race", status: "active", time: "Live now", xpWin: 110 },
  { id: 3, opponent: "Dev P.", avatar: "DP", challenge: "Balance Hold Duel", status: "completed", time: "Yesterday", xpWin: 85, won: true },
  { id: 4, opponent: "Yuki T.", avatar: "YT", challenge: "Stair Sprint", status: "completed", time: "2d ago", xpWin: 170, won: false },
];

const LEAGUE = [
  { rank: 1, name: "Sofia R.", xp: 4820, streak: 12, avatar: "SR", change: "up" },
  { rank: 2, name: "Marcus K.", xp: 4605, streak: 8, avatar: "MK", change: "up" },
  { rank: 3, name: "You", xp: 4210, streak: 5, avatar: "YO", change: "same", isMe: true },
  { rank: 4, name: "Dev P.", xp: 3980, streak: 3, avatar: "DP", change: "down" },
  { rank: 5, name: "Yuki T.", xp: 3750, streak: 7, avatar: "YT", change: "up" },
  { rank: 6, name: "Ava M.", xp: 3310, streak: 2, avatar: "AM", change: "down" },
];

const SKILLS = [
  { name: "Reaction", value: 72, color: "#FF4D1C", icon: "💥", desc: "Fast-twitch response speed" },
  { name: "Balance", value: 58, color: "#FFB800", icon: "⚖️", desc: "Stability under pressure" },
  { name: "Accuracy", value: 84, color: "#1C3FFF", icon: "🎯", desc: "Precision targeting" },
  { name: "Agility", value: 63, color: "#00C853", icon: "⚡", desc: "Multi-directional quickness" },
  { name: "Stamina", value: 45, color: "#9C27B0", icon: "🔥", desc: "Endurance over time" },
];

function App() {
  const [theme, setTheme] = useState("light");
  const [activeTab, setActiveTab] = useState("home");
  const [activeRift, setActiveRift] = useState(null);
  const [challengeActive, setChallengeActive] = useState(false);
  const [challengeTimer, setChallengeTimer] = useState(0);
  const [challengeDone, setChallengeDone] = useState(false);
  const [filterType, setFilterType] = useState("All");
  const [pressedBtn, setPressedBtn] = useState(null);
  const [dailyComplete, setDailyComplete] = useState([false, false, false]);
  const [streakAnim, setStreakAnim] = useState(false);
  const timerRef = useRef(null);
  const t = themes[theme];

  useEffect(() => {
    if (challengeActive && !challengeDone) {
      timerRef.current = setInterval(() => {
        setChallengeTimer(p => {
          if (p >= 100) {
            clearInterval(timerRef.current);
            setChallengeDone(true);
            setChallengeActive(false);
            return 100;
          }
          return p + 1.2;
        });
      }, 60);
    }
    return () => clearInterval(timerRef.current);
  }, [challengeActive, challengeDone]);

  const press = (id, cb) => {
    setPressedBtn(id);
    setTimeout(() => { setPressedBtn(null); if(cb) cb(); }, 150);
  };

  const btnStyle = (id, base) => ({
    ...base,
    transform: pressedBtn === id ? "scale(0.95)" : "scale(1)",
    transition: "transform 0.15s ease, opacity 0.15s ease",
  });

  const styles = {
    page: {
      minHeight: "100vh", background: "#D8D5CF", display: "flex",
      alignItems: "center", justifyContent: "center",
      fontFamily: "'Outfit', sans-serif",
    },
    phone: {
      width: 375, height: 812, background: t.bg, borderRadius: 48,
      overflow: "hidden", position: "relative", boxShadow:
        "0 40px 80px rgba(0,0,0,0.35), 0 0 0 2px rgba(0,0,0,0.15), inset 0 0 0 1px rgba(255,255,255,0.08)",
      display: "flex", flexDirection: "column",
    },
    statusBar: {
      height: 44, background: t.bg, display: "flex",
      alignItems: "center", justifyContent: "space-between",
      paddingInline: 24, paddingTop: 8, flexShrink: 0,
      position: "relative", zIndex: 10,
    },
    dynamicIsland: {
      position: "absolute", top: 10, left: "50%", transform: "translateX(-50%)",
      width: 120, height: 34, background: "#000",
      borderRadius: 20, zIndex: 20,
    },
    scrollArea: {
      flex: 1, overflowY: "auto", overflowX: "hidden",
      scrollbarWidth: "none",
    },
    navBar: {
      height: 82, background: t.navBg,
      borderTop: `1px solid ${t.navBorder}`,
      display: "flex", alignItems: "center", justifyContent: "space-around",
      paddingInline: 8, paddingBottom: 16, flexShrink: 0,
      backdropFilter: "blur(20px)",
    },
    navItem: (active) => ({
      display: "flex", flexDirection: "column", alignItems: "center",
      gap: 4, flex: 1, padding: "6px 4px", borderRadius: 12,
      cursor: "pointer", transition: "all 0.2s ease",
      background: active ? t.primaryGlow : "transparent",
    }),
    navIcon: (active) => ({
      color: active ? t.primary : t.textMuted,
      transition: "color 0.2s",
    }),
    navLabel: (active) => ({
      fontSize: 10, fontWeight: active ? 700 : 500,
      color: active ? t.primary : t.textMuted,
      letterSpacing: "0.02em",
    }),
  };

  // ---- HOME SCREEN ----
  const HomeScreen = () => {
    const types = ["All", "Accuracy", "Agility", "Balance", "Reaction"];
    const filtered = filterType === "All" ? RIFTS : RIFTS.filter(r => r.type === filterType);

    return (
      <div style={{ paddingBottom: 16 }}>
        {/* Hero gradient */}
        <div style={{ background: t.heroGrad, paddingTop: 8 }}>
          {/* Header */}
          <div style={{ paddingInline: 20, paddingBottom: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div style={{ fontSize: 13, color: t.textMuted, fontWeight: 500, letterSpacing: "0.04em", textTransform: "uppercase" }}>
                  📍 Midtown East
                </div>
                <div style={{ fontSize: 26, fontWeight: 800, color: t.text, lineHeight: 1.2, marginTop: 2 }}>
                  Ready to Rift?
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{
                  background: t.primary, color: "#fff", borderRadius: 12,
                  padding: "6px 10px", fontSize: 12, fontWeight: 700,
                  display: "flex", alignItems: "center", gap: 4,
                }}>
                  <span>🔥</span> 5
                </div>
                <div style={{
                  width: 38, height: 38, borderRadius: 12,
                  background: t.gradientA, display: "flex",
                  alignItems: "center", justifyContent: "center",
                  fontSize: 16, boxShadow: `0 4px 12px ${t.primaryGlow}`,
                }}>
                  🏅
                </div>
              </div>
            </div>

            {/* Daily Rifts */}
            <div style={{
              background: t.card, borderRadius: 20, padding: "14px 16px",
              marginTop: 14, border: `1px solid ${t.cardBorder}`,
              boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: t.text }}>Daily Rifts</div>
                <div style={{ fontSize: 11, color: t.textMuted, fontWeight: 500 }}>Resets in 6h 24m</div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                {["Accuracy", "Agility", "Balance"].map((s, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      const next = [...dailyComplete];
                      next[i] = !next[i];
                      setDailyComplete(next);
                      if (!dailyComplete[i]) setStreakAnim(true);
                      setTimeout(() => setStreakAnim(false), 600);
                    }}
                    style={{
                      flex: 1, borderRadius: 12, padding: "10px 6px",
                      background: dailyComplete[i] ? t.primaryGlow : t.surfaceAlt,
                      border: `1.5px solid ${dailyComplete[i] ? t.primary : t.cardBorder}`,
                      display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
                      cursor: "pointer", transition: "all 0.2s",
                    }}
                  >
                    <div style={{ fontSize: 18 }}>{["🎯", "⚡", "⚖️"][i]}</div>
                    <div style={{ fontSize: 10, fontWeight: 600, color: dailyComplete[i] ? t.primary : t.textSec }}>{s}</div>
                    {dailyComplete[i] && <div style={{ fontSize: 9, color: t.primary }}>✓ Done</div>}
                  </div>
                ))}
              </div>
              <div style={{
                marginTop: 10, height: 5, borderRadius: 99, background: t.skillBar, overflow: "hidden"
              }}>
                <div style={{
                  height: "100%", borderRadius: 99,
                  background: t.gradientA,
                  width: `${(dailyComplete.filter(Boolean).length / 3) * 100}%`,
                  transition: "width 0.4s ease",
                }} />
              </div>
              <div style={{ fontSize: 11, color: t.textMuted, marginTop: 5 }}>
                {dailyComplete.filter(Boolean).length}/3 complete — earn 300 XP
              </div>
            </div>
          </div>
        </div>

        {/* Filter chips */}
        <div style={{ paddingInline: 20, marginBottom: 12 }}>
          <div style={{ display: "flex", gap: 8, overflowX: "auto", scrollbarWidth: "none" }}>
            {types.map(type => (
              <div
                key={type}
                onClick={() => setFilterType(type)}
                style={{
                  padding: "7px 14px", borderRadius: 99, cursor: "pointer",
                  background: filterType === type ? t.primary : t.surfaceAlt,
                  color: filterType === type ? "#fff" : t.textSec,
                  fontSize: 12, fontWeight: 600, whiteSpace: "nowrap",
                  transition: "all 0.2s",
                  border: `1.5px solid ${filterType === type ? t.primary : t.cardBorder}`,
                }}
              >
                {type}
              </div>
            ))}
          </div>
        </div>

        {/* Rift Cards */}
        <div style={{ paddingInline: 20, display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: t.text, marginBottom: 2 }}>
            {filtered.length} rifts nearby
          </div>
          {filtered.map(rift => (
            <div
              key={rift.id}
              onClick={() => { setActiveRift(rift); setActiveTab("play"); setChallengeDone(false); setChallengeTimer(0); setChallengeActive(false); }}
              style={{
                background: t.card, borderRadius: 20, padding: "16px",
                border: `1.5px solid ${t.cardBorder}`,
                boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                cursor: "pointer", transition: "transform 0.15s",
                display: "flex", alignItems: "center", gap: 14,
              }}
            >
              <div style={{
                width: 52, height: 52, borderRadius: 16,
                background: `${rift.color}20`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 24, flexShrink: 0,
                border: `1.5px solid ${rift.color}30`,
              }}>
                {rift.icon}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: t.text }}>{rift.name}</div>
                  {rift.hot && (
                    <div style={{
                      background: "#FF4D1C", color: "#fff", borderRadius: 6,
                      padding: "2px 7px", fontSize: 9, fontWeight: 800,
                      letterSpacing: "0.04em", textTransform: "uppercase",
                    }}>HOT</div>
                  )}
                </div>
                <div style={{ display: "flex", gap: 8, marginTop: 4, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 11, color: t.textMuted }}>📍 {rift.distance}</span>
                  <span style={{ fontSize: 11, color: t.textMuted }}>⏱ {rift.duration}</span>
                  <span style={{ fontSize: 11, color: t.textMuted }}>👥 {rift.players} playing</span>
                </div>
                <div style={{ display: "flex", gap: 6, marginTop: 6 }}>
                  <span style={{
                    fontSize: 11, fontWeight: 600, color: rift.color,
                    background: `${rift.color}15`, borderRadius: 6, padding: "2px 8px",
                  }}>{rift.type}</span>
                  <span style={{
                    fontSize: 11, fontWeight: 600,
                    color: rift.difficulty === "Hard" ? "#FF4D1C" : rift.difficulty === "Easy" ? "#00C853" : t.textSec,
                    background: t.surfaceAlt, borderRadius: 6, padding: "2px 8px",
                  }}>{rift.difficulty}</span>
                  <span style={{
                    fontSize: 11, fontWeight: 700, color: "#FFB800",
                    background: "rgba(255,184,0,0.12)", borderRadius: 6, padding: "2px 8px",
                  }}>+{rift.xp} XP</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ---- PLAY SCREEN ----
  const PlayScreen = () => {
    if (!activeRift) {
      return (
        <div style={{ padding: 24, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 500 }}>
          <div style={{ fontSize: 52, marginBottom: 16 }}>⚡</div>
          <div style={{ fontSize: 20, fontWeight: 800, color: t.text, textAlign: "center" }}>No Active Rift</div>
          <div style={{ fontSize: 14, color: t.textMuted, textAlign: "center", marginTop: 8, lineHeight: 1.6 }}>
            Head to the Discover tab and tap a rift to start playing
          </div>
          <div
            onClick={() => setActiveTab("home")}
            style={btnStyle("find-rift", {
              marginTop: 24, background: t.gradientA, color: "#fff",
              padding: "14px 28px", borderRadius: 16, fontSize: 15, fontWeight: 700,
              cursor: "pointer", boxShadow: `0 8px 20px ${t.primaryGlow}`,
            })}
          >
            Find a Rift
          </div>
        </div>
      );
    }

    if (challengeDone) {
      return (
        <div style={{ padding: 24, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{
            width: "100%", borderRadius: 28, padding: "28px 24px",
            background: t.cardGrad, marginBottom: 20, textAlign: "center",
            boxShadow: `0 16px 40px ${t.primaryGlow}`,
          }}>
            <div style={{ fontSize: 56 }}>🏆</div>
            <div style={{ fontSize: 28, fontWeight: 900, color: "#fff", marginTop: 8 }}>Rift Complete!</div>
            <div style={{ fontSize: 14, color: "rgba(255,255,255,0.8)", marginTop: 4 }}>{activeRift.name}</div>
            <div style={{
              display: "flex", justifyContent: "center", gap: 20, marginTop: 20,
            }}>
              {[["XP", `+${activeRift.xp}`], ["Rank", "+2"], ["Streak", "5🔥"]].map(([label, val]) => (
                <div key={label} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 22, fontWeight: 800, color: "#fff" }}>{val}</div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", fontWeight: 500 }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ fontSize: 15, fontWeight: 700, color: t.text, marginBottom: 14 }}>Skill Improvements</div>
          {[{ skill: activeRift.type, gain: "+4pts" }].map(({ skill, gain }) => (
            <div key={skill} style={{
              width: "100%", background: t.card, borderRadius: 16, padding: "14px 16px",
              border: `1.5px solid ${t.cardBorder}`, display: "flex", justifyContent: "space-between",
              alignItems: "center", marginBottom: 10,
            }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: t.text }}>{skill}</div>
                <div style={{ fontSize: 12, color: t.textMuted }}>New: 76/100</div>
              </div>
              <div style={{ color: t.accentGreen, fontSize: 16, fontWeight: 800 }}>{gain}</div>
            </div>
          ))}
          <div style={{ display: "flex", gap: 10, width: "100%", marginTop: 8 }}>
            <div
              onClick={() => { setActiveRift(null); setChallengeDone(false); setChallengeTimer(0); }}
              style={btnStyle("done-btn", {
                flex: 1, background: t.surfaceAlt, color: t.text,
                padding: "14px", borderRadius: 16, fontSize: 14, fontWeight: 700,
                cursor: "pointer", textAlign: "center",
                border: `1.5px solid ${t.cardBorder}`,
              })}
            >
              Done
            </div>
            <div
              onClick={() => { setChallengeTimer(0); setChallengeDone(false); setChallengeActive(false); }}
              style={btnStyle("replay-btn", {
                flex: 1, background: t.gradientA, color: "#fff",
                padding: "14px", borderRadius: 16, fontSize: 14, fontWeight: 700,
                cursor: "pointer", textAlign: "center",
                boxShadow: `0 6px 18px ${t.primaryGlow}`,
              })}
            >
              Play Again
            </div>
          </div>
        </div>
      );
    }

    return (
      <div style={{ padding: "16px 20px 24px" }}>
        {/* Challenge Header */}
        <div style={{
          borderRadius: 24, padding: "20px",
          background: t.cardGrad,
          boxShadow: `0 12px 32px ${t.primaryGlow}`,
          marginBottom: 16,
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{
              background: "rgba(255,255,255,0.2)", borderRadius: 10, padding: "4px 10px",
              fontSize: 11, fontWeight: 700, color: "#fff", letterSpacing: "0.05em",
            }}>
              {activeRift.type.toUpperCase()}
            </div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.8)", fontWeight: 600 }}>
              {activeRift.duration} • {activeRift.difficulty}
            </div>
          </div>
          <div style={{ fontSize: 22, fontWeight: 900, color: "#fff", marginTop: 12, lineHeight: 1.2 }}>
            {activeRift.icon} {activeRift.name}
          </div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.8)", marginTop: 6, lineHeight: 1.5 }}>
            {activeRift.type === "Accuracy" && "Hit 10 targets on the wall in sequence. Use your palm to slap each marker."}
            {activeRift.type === "Agility" && "Sprint the staircase 3 times, tagging each landing. Fastest time wins."}
            {activeRift.type === "Balance" && "Hold a single-leg stance for 30 seconds on each side. No wobbles allowed."}
            {activeRift.type === "Reaction" && "Tap the screen when flashes appear. Score 8/10 within 2 minutes."}
          </div>
        </div>

        {/* AR Verification area */}
        <div style={{
          background: t.card, borderRadius: 20, padding: "18px",
          border: `1.5px solid ${t.cardBorder}`, marginBottom: 14,
        }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: t.text, marginBottom: 10 }}>
            📸 Camera Verification
          </div>
          <div style={{
            height: 120, borderRadius: 14, background: t.surfaceAlt,
            display: "flex", alignItems: "center", justifyContent: "center",
            border: `2px dashed ${t.cardBorder}`, flexDirection: "column", gap: 6,
          }}>
            {challengeActive ? (
              <>
                <div style={{ fontSize: 24 }}>📷</div>
                <div style={{ fontSize: 12, color: t.primary, fontWeight: 600 }}>Tracking motion...</div>
                <div style={{ fontSize: 11, color: t.textMuted }}>AR overlay active</div>
              </>
            ) : (
              <>
                <div style={{ fontSize: 24 }}>🎥</div>
                <div style={{ fontSize: 12, color: t.textMuted, fontWeight: 500 }}>Camera will activate on start</div>
              </>
            )}
          </div>
        </div>

        {/* Progress */}
        {challengeActive && (
          <div style={{
            background: t.card, borderRadius: 20, padding: "16px",
            border: `1.5px solid ${t.cardBorder}`, marginBottom: 14,
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: t.text }}>Progress</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: t.primary }}>{Math.round(challengeTimer)}%</div>
            </div>
            <div style={{ height: 8, borderRadius: 99, background: t.skillBar, overflow: "hidden" }}>
              <div style={{
                height: "100%", borderRadius: 99, background: t.gradientA,
                width: `${challengeTimer}%`, transition: "width 0.1s linear",
              }} />
            </div>
          </div>
        )}

        {/* Opponents */}
        <div style={{
          background: t.card, borderRadius: 20, padding: "14px 16px",
          border: `1.5px solid ${t.cardBorder}`, marginBottom: 16,
        }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: t.text, marginBottom: 10 }}>
            👥 {activeRift.players} Playing
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            {["MK", "SR", "You", "DP"].slice(0, Math.min(4, activeRift.players)).map((p, i) => (
              <div key={i} style={{
                display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 12,
                  background: i === 2 ? t.gradientA : t.surfaceAlt,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 12, fontWeight: 700, color: i === 2 ? "#fff" : t.text,
                  border: i === 2 ? `2px solid ${t.primary}` : `1.5px solid ${t.cardBorder}`,
                }}>{p}</div>
                <div style={{ fontSize: 9, color: t.textMuted, fontWeight: 500 }}>
                  {i === 2 ? "You" : p}
                </div>
              </div>
            ))}
            {activeRift.players > 4 && (
              <div style={{
                width: 36, height: 36, borderRadius: 12,
                background: t.surfaceAlt, display: "flex",
                alignItems: "center", justifyContent: "center",
                fontSize: 11, fontWeight: 700, color: t.textMuted,
              }}>+{activeRift.players - 4}</div>
            )}
          </div>
        </div>

        {/* Action button */}
        <div
          onClick={() => press("start-btn", () => setChallengeActive(true))}
          style={btnStyle("start-btn", {
            width: "100%", background: t.gradientA, color: "#fff",
            padding: "16px", borderRadius: 18, fontSize: 16, fontWeight: 800,
            cursor: "pointer", textAlign: "center",
            boxShadow: `0 10px 28px ${t.primaryGlow}`,
            letterSpacing: "0.02em",
          })}
        >
          {challengeActive ? "⏹ Stop" : "▶ Start Rift"}
        </div>
      </div>
    );
  };

  // ---- DUELS SCREEN ----
  const DuelsScreen = () => {
    const [showInvite, setShowInvite] = useState(false);
    return (
      <div style={{ paddingBottom: 16 }}>
        <div style={{ padding: "12px 20px 16px" }}>
          <div style={{ fontSize: 22, fontWeight: 800, color: t.text }}>Duels</div>
          <div style={{ fontSize: 13, color: t.textMuted, marginTop: 2 }}>Challenge or get challenged</div>
        </div>

        {/* Invite banner */}
        <div style={{ paddingInline: 20, marginBottom: 16 }}>
          <div style={{
            borderRadius: 20, padding: "16px 18px",
            background: t.gradientB,
            display: "flex", alignItems: "center", justifyContent: "space-between",
            boxShadow: "0 8px 20px rgba(28,63,255,0.2)",
          }}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 800, color: "#fff" }}>Challenge a Friend</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.75)", marginTop: 2 }}>Pick a rift, send the link</div>
            </div>
            <div
              onClick={() => setShowInvite(!showInvite)}
              style={btnStyle("invite-btn", {
                background: "rgba(255,255,255,0.25)", color: "#fff",
                padding: "9px 16px", borderRadius: 12, fontSize: 13, fontWeight: 700,
                cursor: "pointer", backdropFilter: "blur(10px)",
              })}
            >
              Invite
            </div>
          </div>
        </div>

        {/* Duel list */}
        <div style={{ paddingInline: 20, display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: t.text, marginBottom: 2 }}>Active & Recent</div>
          {DUELS.map(duel => (
            <div key={duel.id} style={{
              background: t.card, borderRadius: 18, padding: "14px 16px",
              border: `1.5px solid ${duel.status === "active" ? t.primary : t.cardBorder}`,
              display: "flex", alignItems: "center", gap: 12,
              boxShadow: duel.status === "active" ? `0 4px 16px ${t.primaryGlow}` : "none",
            }}>
              <div style={{
                width: 44, height: 44, borderRadius: 14,
                background: duel.status === "active" ? t.gradientA :
                  duel.status === "pending" ? t.gradientB : t.surfaceAlt,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 13, fontWeight: 800,
                color: duel.status === "completed" ? t.textSec : "#fff",
              }}>
                {duel.avatar}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: t.text }}>{duel.opponent}</div>
                  <div style={{ fontSize: 11, color: t.textMuted }}>{duel.time}</div>
                </div>
                <div style={{ fontSize: 12, color: t.textMuted, marginTop: 2 }}>{duel.challenge}</div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 6 }}>
                  <div style={{
                    fontSize: 11, fontWeight: 700, borderRadius: 6, padding: "2px 8px",
                    background: duel.status === "active" ? t.primaryGlow :
                      duel.status === "pending" ? "rgba(28,63,255,0.12)" : t.surfaceAlt,
                    color: duel.status === "active" ? t.primary :
                      duel.status === "pending" ? t.secondary : t.textMuted,
                  }}>
                    {duel.status === "active" ? "🔴 Live" : duel.status === "pending" ? "⏳ Pending" : duel.won ? "✅ Won" : "❌ Lost"}
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#FFB800" }}>+{duel.xpWin} XP</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ---- SKILLS SCREEN ----
  const SkillsScreen = () => {
    return (
      <div style={{ paddingBottom: 16 }}>
        <div style={{ padding: "12px 20px 16px" }}>
          <div style={{ fontSize: 22, fontWeight: 800, color: t.text }}>Skill Map</div>
          <div style={{ fontSize: 13, color: t.textMuted, marginTop: 2 }}>Track your athletic growth</div>
        </div>

        {/* Overall level card */}
        <div style={{ paddingInline: 20, marginBottom: 16 }}>
          <div style={{
            borderRadius: 24, padding: "20px",
            background: t.cardGrad,
            boxShadow: `0 12px 32px ${t.primaryGlow}`,
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.75)", fontWeight: 500 }}>Overall Rank</div>
                <div style={{ fontSize: 36, fontWeight: 900, color: "#fff", lineHeight: 1.1 }}>
                  Lv.18
                </div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.8)", marginTop: 2 }}>Gold Athlete</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.75)" }}>Total XP</div>
                <div style={{ fontSize: 28, fontWeight: 900, color: "#fff" }}>4,210</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.7)" }}>790 to next level</div>
              </div>
            </div>
            <div style={{ marginTop: 14, height: 6, borderRadius: 99, background: "rgba(255,255,255,0.2)" }}>
              <div style={{
                height: "100%", borderRadius: 99, background: "#fff",
                width: "54%", transition: "width 0.4s",
              }} />
            </div>
          </div>
        </div>

        {/* Skills */}
        <div style={{ paddingInline: 20, display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: t.text, marginBottom: 2 }}>Skill Breakdown</div>
          {SKILLS.map(skill => (
            <div key={skill.name} style={{
              background: t.card, borderRadius: 18, padding: "14px 16px",
              border: `1.5px solid ${t.cardBorder}`,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 14,
                  background: `${skill.color}18`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 20, flexShrink: 0,
                  border: `1.5px solid ${skill.color}25`,
                }}>
                  {skill.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: t.text }}>{skill.name}</div>
                    <div style={{ fontSize: 15, fontWeight: 800, color: skill.color }}>{skill.value}</div>
                  </div>
                  <div style={{ fontSize: 11, color: t.textMuted, marginTop: 1 }}>{skill.desc}</div>
                  <div style={{ marginTop: 8, height: 6, borderRadius: 99, background: t.skillBar, overflow: "hidden" }}>
                    <div style={{
                      height: "100%", borderRadius: 99,
                      background: `linear-gradient(90deg, ${skill.color}cc, ${skill.color})`,
                      width: `${skill.value}%`, transition: "width 0.6s ease",
                    }} />
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Recent XP gains */}
          <div style={{ marginTop: 6 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: t.text, marginBottom: 10 }}>Recent Gains</div>
            {[
              { label: "Wall Volley Blitz", skill: "Accuracy", xp: "+4pts", time: "1h ago" },
              { label: "Reaction Tap Race", skill: "Reaction", xp: "+3pts", time: "Yesterday" },
              { label: "Balance Hold Duel", skill: "Balance", xp: "+2pts", time: "2d ago" },
            ].map((g, i) => (
              <div key={i} style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                paddingBlock: 10, borderBottom: i < 2 ? `1px solid ${t.divider}` : "none",
              }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: t.text }}>{g.label}</div>
                  <div style={{ fontSize: 11, color: t.textMuted }}>{g.skill} • {g.time}</div>
                </div>
                <div style={{ fontSize: 14, fontWeight: 700, color: t.accentGreen }}>{g.xp}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // ---- LEAGUE SCREEN ----
  const LeagueScreen = () => {
    return (
      <div style={{ paddingBottom: 16 }}>
        <div style={{ padding: "12px 20px 4px" }}>
          <div style={{ fontSize: 22, fontWeight: 800, color: t.text }}>Leagues</div>
          <div style={{ fontSize: 13, color: t.textMuted, marginTop: 2 }}>Compete with your crew</div>
        </div>

        {/* Season banner */}
        <div style={{ paddingInline: 20, marginTop: 12, marginBottom: 14 }}>
          <div style={{
            borderRadius: 20, padding: "16px 18px",
            background: t.gradientC,
            display: "flex", justifyContent: "space-between", alignItems: "center",
            boxShadow: "0 8px 24px rgba(255,184,0,0.25)",
          }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(0,0,0,0.55)", letterSpacing: "0.06em", textTransform: "uppercase" }}>Season 3</div>
              <div style={{ fontSize: 18, fontWeight: 900, color: "#1A1200" }}>City Sprinters 🏙️</div>
              <div style={{ fontSize: 12, color: "rgba(0,0,0,0.5)", marginTop: 2 }}>Ends in 4 days</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 28, fontWeight: 900, color: "#1A1200" }}>#3</div>
              <div style={{ fontSize: 11, color: "rgba(0,0,0,0.5)", fontWeight: 600 }}>Your rank</div>
            </div>
          </div>
        </div>

        {/* Leaderboard */}
        <div style={{ paddingInline: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: t.text, marginBottom: 10 }}>Leaderboard</div>
          {LEAGUE.map((p, i) => (
            <div key={i} style={{
              background: p.isMe ? t.primaryGlow : t.card,
              borderRadius: 16, padding: "12px 14px", marginBottom: 8,
              border: `1.5px solid ${p.isMe ? t.primary : t.cardBorder}`,
              display: "flex", alignItems: "center", gap: 12,
            }}>
              <div style={{
                width: 28, textAlign: "center",
                fontSize: p.rank <= 3 ? 20 : 15,
                fontWeight: p.rank > 3 ? 700 : "normal",
                color: p.rank > 3 ? t.textMuted : "inherit",
              }}>
                {p.rank === 1 ? "🥇" : p.rank === 2 ? "🥈" : p.rank === 3 ? "🥉" : p.rank}
              </div>
              <div style={{
                width: 38, height: 38, borderRadius: 12,
                background: p.isMe ? t.gradientA : t.surfaceAlt,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 12, fontWeight: 800,
                color: p.isMe ? "#fff" : t.text,
                border: p.isMe ? `2px solid ${t.primary}` : `1.5px solid ${t.cardBorder}`,
              }}>
                {p.avatar}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: p.isMe ? 800 : 600, color: t.text }}>
                  {p.name} {p.isMe && <span style={{ fontSize: 10, color: t.primary, fontWeight: 700 }}>YOU</span>}
                </div>
                <div style={{ fontSize: 11, color: t.textMuted, marginTop: 1 }}>🔥 {p.streak} day streak</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 15, fontWeight: 800, color: t.text }}>{p.xp.toLocaleString()}</div>
                <div style={{
                  fontSize: 11, fontWeight: 700,
                  color: p.change === "up" ? t.accentGreen : p.change === "down" ? "#FF4D1C" : t.textMuted,
                }}>
                  {p.change === "up" ? "▲" : p.change === "down" ? "▼" : "—"} XP
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Weekly challenge */}
        <div style={{ paddingInline: 20, marginTop: 8 }}>
          <div style={{
            background: t.card, borderRadius: 18, padding: "14px 16px",
            border: `1.5px solid ${t.cardBorder}`,
          }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: t.text, marginBottom: 8 }}>
              🏆 Team Goal This Week
            </div>
            <div style={{ fontSize: 12, color: t.textMuted, marginBottom: 10, lineHeight: 1.5 }}>
              Complete 25 accuracy rifts as a team before Sunday to unlock a rare badge.
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: t.text }}>18/25 rifts</div>
              <div style={{ fontSize: 12, color: t.primary, fontWeight: 700 }}>72%</div>
            </div>
            <div style={{ height: 7, borderRadius: 99, background: t.skillBar, overflow: "hidden" }}>
              <div style={{
                height: "100%", borderRadius: 99, background: t.gradientC,
                width: "72%",
              }} />
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ---- PROFILE SCREEN ----
  const ProfileScreen = () => {
    return (
      <div style={{ paddingBottom: 24 }}>
        {/* Header */}
        <div style={{ padding: "16px 20px 20px", borderBottom: `1px solid ${t.divider}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontSize: 20, fontWeight: 800, color: t.text }}>Profile</div>
            {/* Theme Toggle */}
            <div
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              style={{
                width: 44, height: 26, borderRadius: 99,
                background: theme === "dark" ? t.primary : t.surfaceAlt,
                border: `1.5px solid ${t.cardBorder}`,
                display: "flex", alignItems: "center",
                padding: "0 3px", cursor: "pointer",
                transition: "background 0.3s",
                position: "relative",
              }}
            >
              <div style={{
                width: 20, height: 20, borderRadius: 99,
                background: theme === "dark" ? "#fff" : t.primary,
                transform: theme === "dark" ? "translateX(18px)" : "translateX(0)",
                transition: "transform 0.3s, background 0.3s",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 11,
              }}>
                {theme === "dark" ? "🌙" : "☀️"}
              </div>
            </div>
          </div>

          {/* Avatar and name */}
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 20 }}>
            <div style={{
              width: 72, height: 72, borderRadius: 22,
              background: t.gradientA,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 28, fontWeight: 800, color: "#fff",
              boxShadow: `0 8px 20px ${t.primaryGlow}`,
              border: `3px solid ${t.primary}`,
            }}>
              YO
            </div>
            <div>
              <div style={{ fontSize: 20, fontWeight: 800, color: t.text }}>Alex Jordan</div>
              <div style={{ fontSize: 13, color: t.textMuted, marginTop: 2 }}>@alexjordan · Gold Athlete</div>
              <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
                <span style={{
                  fontSize: 11, fontWeight: 700, color: t.primary,
                  background: t.primaryGlow, borderRadius: 6, padding: "2px 8px",
                }}>Lv. 18</span>
                <span style={{
                  fontSize: 11, fontWeight: 700, color: "#FFB800",
                  background: "rgba(255,184,0,0.12)", borderRadius: 6, padding: "2px 8px",
                }}>🔥 5 Streak</span>
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div style={{
            display: "flex", gap: 8, marginTop: 18,
          }}>
            {[["Rifts", "127"], ["Duels Won", "43"], ["XP", "4,210"]].map(([label, val]) => (
              <div key={label} style={{
                flex: 1, background: t.surfaceAlt, borderRadius: 14, padding: "12px 8px",
                textAlign: "center", border: `1.5px solid ${t.cardBorder}`,
              }}>
                <div style={{ fontSize: 18, fontWeight: 900, color: t.text }}>{val}</div>
                <div style={{ fontSize: 11, color: t.textMuted, marginTop: 2 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Settings sections */}
        <div style={{ padding: "16px 20px" }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: t.textMuted, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 10 }}>
            Settings
          </div>
          {[
            { icon: "📍", label: "Location Permissions", sub: "Enabled · High accuracy" },
            { icon: "📸", label: "Camera Access", sub: "Enabled for AR verification" },
            { icon: "🔔", label: "Notifications", sub: "Duels, streaks, daily rifts" },
            { icon: "🔒", label: "Privacy", sub: "Profile visible to friends" },
          ].map((item, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 14,
              paddingBlock: 13, borderBottom: i < 3 ? `1px solid ${t.divider}` : "none",
              cursor: "pointer",
            }}>
              <div style={{
                width: 38, height: 38, borderRadius: 12,
                background: t.surfaceAlt, display: "flex",
                alignItems: "center", justifyContent: "center", fontSize: 18,
                border: `1.5px solid ${t.cardBorder}`, flexShrink: 0,
              }}>{item.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: t.text }}>{item.label}</div>
                <div style={{ fontSize: 11, color: t.textMuted, marginTop: 1 }}>{item.sub}</div>
              </div>
              <div style={{ fontSize: 16, color: t.textMuted }}>›</div>
            </div>
          ))}
        </div>

        {/* Badges */}
        <div style={{ paddingInline: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: t.textMuted, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 10 }}>
            Badges Earned
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {["🎯 Sharp Eye", "⚡ Speed Demon", "🔥 5-Day Streak", "🏆 League Winner", "💥 Reaction King"].map((badge, i) => (
              <div key={i} style={{
                background: t.surfaceAlt, borderRadius: 10,
                padding: "7px 12px", fontSize: 12, fontWeight: 600, color: t.text,
                border: `1.5px solid ${t.cardBorder}`,
              }}>
                {badge}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const tabs = [
    { id: "home", label: "Discover", emoji: "🗺️" },
    { id: "duels", label: "Duels", emoji: "⚔️" },
    { id: "play", label: "Play", emoji: "▶️" },
    { id: "skills", label: "Skills", emoji: "📊" },
    { id: "league", label: "League", emoji: "🏆" },
  ];

  const renderScreen = () => {
    switch(activeTab) {
      case "home": return <HomeScreen />;
      case "play": return <PlayScreen />;
      case "duels": return <DuelsScreen />;
      case "skills": return <SkillsScreen />;
      case "league": return <LeagueScreen />;
      default: return <HomeScreen />;
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.phone}>
        {/* Status bar */}
        <div style={styles.statusBar}>
          <div style={{ fontSize: 12, fontWeight: 700, color: t.statusBar }}>9:41</div>
          <div style={styles.dynamicIsland} />
          <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
            <div style={{ fontSize: 11, color: t.statusBar }}>▲▲▲</div>
            <div style={{ fontSize: 11, color: t.statusBar }}>WiFi</div>
            <div style={{ fontSize: 11, color: t.statusBar }}>■■</div>
          </div>
        </div>

        {/* Screen title bar */}
        <div style={{
          paddingInline: 20, paddingBottom: 4, paddingTop: 4,
          display: "flex", alignItems: "center", gap: 10,
          background: t.bg, borderBottom: activeTab !== "home" ? `1px solid ${t.divider}` : "none",
        }}>
          <div style={{
            fontSize: 20, lineHeight: 1,
          }}>{tabs.find(tb => tb.id === activeTab)?.emoji}</div>
          <div style={{ fontSize: 16, fontWeight: 700, color: t.primary, letterSpacing: "0.01em" }}>
            Rally Rift
          </div>
          {activeTab === "profile" && null}
        </div>

        {/* Scrollable content */}
        <div style={styles.scrollArea}>
          {renderScreen()}
          {/* Profile tab accessible via settings button */}
          {activeTab === "home" && (
            <div style={{ paddingInline: 20, paddingBottom: 16 }}>
              <div
                onClick={() => setActiveTab("profile")}
                style={{
                  marginTop: 8, background: t.card, borderRadius: 18, padding: "14px 16px",
                  border: `1.5px solid ${t.cardBorder}`, display: "flex",
                  alignItems: "center", gap: 12, cursor: "pointer",
                }}
              >
                <div style={{
                  width: 40, height: 40, borderRadius: 12, background: t.gradientA,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 14, fontWeight: 800, color: "#fff",
                }}>YO</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: t.text }}>Alex Jordan</div>
                  <div style={{ fontSize: 12, color: t.textMuted }}>View profile & settings</div>
                </div>
                <div style={{ fontSize: 18, color: t.textMuted }}>›</div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom nav */}
        <div style={styles.navBar}>
          {tabs.filter(t => t.id !== "profile").map(tab => (
            <div
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={styles.navItem(activeTab === tab.id)}
            >
              <div style={{ fontSize: activeTab === tab.id ? 22 : 20, transition: "font-size 0.2s" }}>
                {tab.emoji}
              </div>
              <div style={styles.navLabel(activeTab === tab.id)}>{tab.label}</div>
              {tab.id === "play" && activeRift && !challengeDone && (
                <div style={{
                  position: "absolute", top: 6, width: 7, height: 7,
                  borderRadius: 99, background: "#FF4D1C",
                }} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
