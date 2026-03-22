
function App() {
  const { useState, useEffect, useRef } = React;

  // ─── Theme ───────────────────────────────────────────────────────────────
  const themes = {
    dark: {
      bg: "#08080F",
      surface: "#111120",
      surface2: "#191929",
      surface3: "#22223A",
      primary: "#8B5CF6",
      primaryLight: "#A78BFA",
      primaryGlow: "rgba(139,92,246,0.25)",
      accent: "#EC4899",
      accentGlow: "rgba(236,72,153,0.2)",
      teal: "#06B6D4",
      green: "#10B981",
      orange: "#F59E0B",
      text: "#F0EEFF",
      textMuted: "#7C7C9E",
      textDim: "#4A4A6A",
      border: "#252540",
      border2: "#1D1D33",
      navBg: "#0D0D1C",
      pillBg: "#1A1A30",
    },
    light: {
      bg: "#F3F0FF",
      surface: "#FFFFFF",
      surface2: "#EDE9FE",
      surface3: "#DDD6FE",
      primary: "#7C3AED",
      primaryLight: "#8B5CF6",
      primaryGlow: "rgba(124,58,237,0.18)",
      accent: "#DB2777",
      accentGlow: "rgba(219,39,119,0.15)",
      teal: "#0891B2",
      green: "#059669",
      orange: "#D97706",
      text: "#1A1033",
      textMuted: "#6B5F8A",
      textDim: "#A89FC0",
      border: "#E4DEFF",
      border2: "#EDE9FE",
      navBg: "#FFFFFF",
      pillBg: "#EDE9FE",
    },
  };

  const [themeKey, setThemeKey] = useState("dark");
  const t = themes[themeKey];

  // ─── State ────────────────────────────────────────────────────────────────
  const [activeTab, setActiveTab] = useState("home");
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(38);
  const [volume, setVolume] = useState(72);
  const [liked, setLiked] = useState(false);
  const [selectedMood, setSelectedMood] = useState("focus");
  const [selectedEnergy, setSelectedEnergy] = useState(3);
  const [selectedActivity, setSelectedActivity] = useState("studying");
  const [showSkipModal, setShowSkipModal] = useState(false);
  const [skipReason, setSkipReason] = useState(null);
  const [patternNotif, setPatternNotif] = useState(true);
  const [pressedBtn, setPressedBtn] = useState(null);
  const [currentTime, setCurrentTime] = useState("9:41");
  const [showMoodSheet, setShowMoodSheet] = useState(false);
  const [activeSession, setActiveSession] = useState(null);
  const [notifications, setNotifications] = useState(true);
  const [adaptiveLearning, setAdaptiveLearning] = useState(true);
  const [calendarSync, setCalendarSync] = useState(false);
  const [motionCues, setMotionCues] = useState(true);
  const [progressInterval, setProgressInterval] = useState(null);
  const [waveFrame, setWaveFrame] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isPlaying) {
        setProgress(p => (p >= 100 ? 0 : p + 0.3));
        setWaveFrame(f => (f + 1) % 60);
      }
    }, 200);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handlePress = (id, fn) => {
    setPressedBtn(id);
    setTimeout(() => setPressedBtn(null), 150);
    fn && fn();
  };

  // ─── Font ─────────────────────────────────────────────────────────────────
  const fontStyle = `
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    ::-webkit-scrollbar { display: none; }
    body { background: #1A1A2E; }
  `;

  // ─── Data ─────────────────────────────────────────────────────────────────
  const moods = [
    { id: "focus", label: "Focus", emoji: "🎯", color: t.teal },
    { id: "energy", label: "Energy", emoji: "⚡", color: t.orange },
    { id: "calm", label: "Calm", emoji: "🌊", color: t.primary },
    { id: "confidence", label: "Hype", emoji: "🔥", color: t.accent },
    { id: "recovery", label: "Reset", emoji: "🌙", color: t.green },
  ];

  const activities = [
    { id: "studying", label: "Studying", icon: "BookOpen" },
    { id: "commuting", label: "Commute", icon: "Train" },
    { id: "workout", label: "Workout", icon: "Zap" },
    { id: "cleaning", label: "Cleaning", icon: "Sparkles" },
    { id: "cooking", label: "Cooking", icon: "Utensils" },
    { id: "winddown", label: "Wind Down", icon: "Moon" },
    { id: "meeting", label: "Post-Meeting", icon: "Users" },
    { id: "commute", label: "Driving", icon: "Car" },
  ];

  const nowPlaying = {
    title: "Velvet Hours",
    artist: "Nils Frahm",
    album: "All Melody",
    context: "Pre-exam focus · 12 min into session",
    duration: "4:32",
    progress: progress,
  };

  const queue = [
    { title: "Cascade", artist: "Jon Hopkins", duration: "5:11", match: 97 },
    { title: "Apparition", artist: "Max Richter", duration: "3:44", match: 94 },
    { title: "On the Nature of Daylight", artist: "Max Richter", duration: "6:23", match: 91 },
    { title: "Divenire", artist: "Ludovico Einaudi", duration: "7:02", match: 88 },
  ];

  const sessions = [
    {
      id: 1,
      name: "Morning Focus Block",
      time: "Today · 7:30 AM",
      duration: "1h 24m",
      mood: "focus",
      activity: "studying",
      tracks: 14,
      skips: 1,
      color: t.teal,
      icon: "Sun",
      insight: "You skip 60% less in the first 90 mins after waking.",
    },
    {
      id: 2,
      name: "Post-Meeting Reset",
      time: "Today · 11:15 AM",
      duration: "22m",
      mood: "recovery",
      activity: "winddown",
      tracks: 5,
      skips: 0,
      color: t.green,
      icon: "RefreshCw",
      insight: "Ambient tracks work best for you after group calls.",
    },
    {
      id: 3,
      name: "Afternoon Sprint",
      time: "Yesterday · 2:40 PM",
      duration: "48m",
      mood: "energy",
      activity: "workout",
      tracks: 11,
      skips: 3,
      color: t.orange,
      icon: "Zap",
      insight: "Tracks with 120–130 BPM matched your pace best.",
    },
    {
      id: 4,
      name: "Wind-Down Ritual",
      time: "Yesterday · 9:55 PM",
      duration: "35m",
      mood: "calm",
      activity: "winddown",
      tracks: 7,
      skips: 0,
      color: t.primary,
      icon: "Moon",
      insight: "You've listened to this routine 11 nights in a row.",
    },
  ];

  const patterns = [
    {
      label: "Pre-exam focus window",
      desc: "Every weekday 8–10 AM",
      icon: "BookOpen",
      color: t.teal,
      streak: "14 days",
    },
    {
      label: "Post-meeting decompression",
      desc: "After calendar blocks end",
      icon: "RefreshCw",
      color: t.green,
      streak: "9 times",
    },
    {
      label: "Late-night wind-down",
      desc: "Weeknights after 9:30 PM",
      icon: "Moon",
      color: t.primary,
      streak: "11 nights",
    },
    {
      label: "Commute confidence boost",
      desc: "8:15–8:45 AM weekdays",
      icon: "Train",
      color: t.accent,
      streak: "18 trips",
    },
  ];

  const skipReasons = [
    { id: "tempo", label: "Too slow / fast", icon: "Clock" },
    { id: "vocals", label: "Vocals off", icon: "Mic" },
    { id: "lyrics", label: "Distracting lyrics", icon: "FileText" },
    { id: "familiar", label: "Overplayed", icon: "RotateCcw" },
    { id: "vibe", label: "Wrong vibe", icon: "Waves" },
    { id: "genre", label: "Wrong genre", icon: "Music" },
  ];

  const discoverMixes = [
    {
      name: "Deep Work Flow",
      desc: "Instrumental beats for sustained focus sessions",
      tracks: 18,
      duration: "1h 12m",
      tags: ["Focus", "Instrumental"],
      match: 98,
      color: "#0EA5E9",
      gradient: ["#0EA5E9", "#6366F1"],
      icon: "Brain",
    },
    {
      name: "Commute Confidence",
      desc: "Builds momentum from first track to arrival",
      tracks: 12,
      duration: "42m",
      tags: ["Energy", "Commute"],
      match: 95,
      color: t.accent,
      gradient: ["#EC4899", "#F59E0B"],
      icon: "TrendingUp",
    },
    {
      name: "Finish Strong",
      desc: "BPM escalates with your workout's final miles",
      tracks: 10,
      duration: "38m",
      tags: ["Workout", "Progressive"],
      match: 92,
      color: t.orange,
      gradient: ["#F59E0B", "#EF4444"],
      icon: "Zap",
    },
    {
      name: "After-Meeting Calm",
      desc: "Resets mental noise post-collaboration overload",
      tracks: 8,
      duration: "28m",
      tags: ["Recovery", "Ambient"],
      match: 89,
      color: t.green,
      gradient: ["#10B981", "#06B6D4"],
      icon: "Wind",
    },
    {
      name: "Night Ritual",
      desc: "Slows heart rate for sleep-ready wind-down",
      tracks: 9,
      duration: "34m",
      tags: ["Calm", "Sleep"],
      match: 87,
      color: "#8B5CF6",
      gradient: ["#8B5CF6", "#3B82F6"],
      icon: "Moon",
    },
  ];

  // ─── Helpers ──────────────────────────────────────────────────────────────
  const Icon = ({ name, size = 20, color = t.text, strokeWidth = 1.8 }) => {
    const LucideIcon = window.lucide && window.lucide[name];
    if (!LucideIcon) return React.createElement("span", { style: { width: size, height: size, display: "inline-block" } });
    return React.createElement(LucideIcon, { size, color, strokeWidth });
  };

  const formatProgress = (pct) => {
    const total = 272;
    const elapsed = Math.round((pct / 100) * total);
    const m = Math.floor(elapsed / 60);
    const s = elapsed % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const WaveBar = ({ index, playing }) => {
    const heights = [8, 16, 24, 20, 12, 28, 18, 14, 22, 10, 26, 16, 8, 20, 28];
    const base = heights[index % heights.length];
    const animated = playing ? base * (0.5 + 0.5 * Math.sin((waveFrame * 0.18) + index * 0.7)) : base * 0.3;
    return React.createElement("div", {
      style: {
        width: 3,
        height: Math.max(3, animated),
        borderRadius: 2,
        background: t.primary,
        opacity: 0.85,
        transition: "height 0.2s ease",
      }
    });
  };

  // ─── Screens ──────────────────────────────────────────────────────────────

  const HomeScreen = () => (
    React.createElement("div", {
      style: { flex: 1, overflowY: "auto", paddingBottom: 90 }
    },
      // Header
      React.createElement("div", {
        style: {
          padding: "16px 20px 8px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }
      },
        React.createElement("div", null,
          React.createElement("div", { style: { fontSize: 13, color: t.textMuted, fontWeight: 500 } }, "Good morning, Alex"),
          React.createElement("div", { style: { fontSize: 20, color: t.text, fontWeight: 700, marginTop: 2 } }, "What's your moment?")
        ),
        React.createElement("div", {
          style: {
            width: 40, height: 40, borderRadius: "50%",
            background: `linear-gradient(135deg, ${t.primary}, ${t.accent})`,
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer",
          },
          onClick: () => setActiveTab("settings")
        },
          React.createElement(Icon, { name: "User", size: 18, color: "#fff" })
        )
      ),

      // Mood Quick-Check
      React.createElement("div", { style: { padding: "10px 20px 6px" } },
        React.createElement("div", { style: { fontSize: 11, color: t.textMuted, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10 } }, "2-tap mood check-in"),
        React.createElement("div", { style: { display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4 } },
          moods.map(m => React.createElement("button", {
            key: m.id,
            onClick: () => handlePress(`mood-${m.id}`, () => setSelectedMood(m.id)),
            style: {
              flex: "0 0 auto",
              padding: "8px 14px",
              borderRadius: 24,
              border: `1.5px solid ${selectedMood === m.id ? m.color : t.border}`,
              background: selectedMood === m.id ? `${m.color}22` : t.surface2,
              display: "flex", alignItems: "center", gap: 6,
              cursor: "pointer",
              transform: pressedBtn === `mood-${m.id}` ? "scale(0.92)" : "scale(1)",
              transition: "all 0.15s ease",
            }
          },
            React.createElement("span", { style: { fontSize: 15 } }, m.emoji),
            React.createElement("span", { style: { fontSize: 13, color: selectedMood === m.id ? m.color : t.textMuted, fontWeight: 600 } }, m.label)
          ))
        )
      ),

      // Energy Level
      React.createElement("div", { style: { padding: "10px 20px" } },
        React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 } },
          React.createElement("div", { style: { fontSize: 11, color: t.textMuted, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" } }, "Energy level"),
          React.createElement("div", { style: { fontSize: 12, color: t.primary, fontWeight: 700 } }, ["Drained", "Low", "Neutral", "Charged", "Peak"][selectedEnergy - 1])
        ),
        React.createElement("div", { style: { display: "flex", gap: 6 } },
          [1, 2, 3, 4, 5].map(n => React.createElement("button", {
            key: n,
            onClick: () => handlePress(`energy-${n}`, () => setSelectedEnergy(n)),
            style: {
              flex: 1, height: 36, borderRadius: 10,
              background: n <= selectedEnergy ? `linear-gradient(135deg, ${t.primary}, ${t.primaryLight})` : t.surface2,
              border: `1.5px solid ${n <= selectedEnergy ? t.primary : t.border}`,
              cursor: "pointer",
              transform: pressedBtn === `energy-${n}` ? "scale(0.9)" : "scale(1)",
              transition: "all 0.15s ease",
            }
          }))
        )
      ),

      // Activity Selector
      React.createElement("div", { style: { padding: "6px 20px 10px" } },
        React.createElement("div", { style: { fontSize: 11, color: t.textMuted, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10 } }, "What are you doing?"),
        React.createElement("div", {
          style: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }
        },
          activities.map(act => React.createElement("button", {
            key: act.id,
            onClick: () => handlePress(`act-${act.id}`, () => setSelectedActivity(act.id)),
            style: {
              padding: "10px 6px",
              borderRadius: 14,
              border: `1.5px solid ${selectedActivity === act.id ? t.primary : t.border}`,
              background: selectedActivity === act.id ? t.primaryGlow : t.surface2,
              display: "flex", flexDirection: "column", alignItems: "center", gap: 5,
              cursor: "pointer",
              transform: pressedBtn === `act-${act.id}` ? "scale(0.88)" : "scale(1)",
              transition: "all 0.15s ease",
            }
          },
            React.createElement(Icon, { name: act.icon, size: 16, color: selectedActivity === act.id ? t.primary : t.textMuted }),
            React.createElement("span", { style: { fontSize: 10, color: selectedActivity === act.id ? t.primary : t.textMuted, fontWeight: 600, textAlign: "center" } }, act.label)
          ))
        )
      ),

      // Build Mix Button
      React.createElement("div", { style: { padding: "0 20px 16px" } },
        React.createElement("button", {
          onClick: () => handlePress("build", () => setActiveTab("nowplaying")),
          style: {
            width: "100%", padding: "15px 0", borderRadius: 18,
            background: `linear-gradient(135deg, ${t.primary} 0%, ${t.accent} 100%)`,
            border: "none", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
            transform: pressedBtn === "build" ? "scale(0.97)" : "scale(1)",
            transition: "transform 0.15s ease",
            boxShadow: `0 8px 32px ${t.primaryGlow}`,
          }
        },
          React.createElement(Icon, { name: "Sparkles", size: 18, color: "#fff", strokeWidth: 2 }),
          React.createElement("span", { style: { fontSize: 16, fontWeight: 700, color: "#fff" } }, "Build My Mix")
        )
      ),

      // Pattern Detected
      patternNotif && React.createElement("div", {
        style: {
          margin: "0 20px 16px",
          padding: "14px 16px",
          borderRadius: 16,
          background: t.surface2,
          border: `1px solid ${t.teal}44`,
          display: "flex", gap: 12, alignItems: "flex-start",
          position: "relative",
        }
      },
        React.createElement("div", {
          style: {
            width: 36, height: 36, borderRadius: 10, background: `${t.teal}22`,
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          }
        }, React.createElement(Icon, { name: "TrendingUp", size: 16, color: t.teal })),
        React.createElement("div", { style: { flex: 1 } },
          React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: t.text } }, "Pattern detected"),
          React.createElement("div", { style: { fontSize: 11, color: t.textMuted, marginTop: 2, lineHeight: 1.4 } }, "You usually focus best right now. Starting your study mix in 3 min.")
        ),
        React.createElement("button", {
          onClick: () => setPatternNotif(false),
          style: { background: "none", border: "none", cursor: "pointer", padding: 0 }
        }, React.createElement(Icon, { name: "X", size: 14, color: t.textDim }))
      ),

      // Quick Situations
      React.createElement("div", { style: { padding: "0 20px 8px" } },
        React.createElement("div", { style: { fontSize: 11, color: t.textMuted, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10 } }, "Quick situations"),
        [
          { label: "Pre-exam focus", emoji: "🎯", sub: "Reduces distraction over 45 min", color: t.teal },
          { label: "Finish strong", emoji: "🏃", sub: "Escalates BPM to your pace", color: t.orange },
          { label: "Chaotic commute reset", emoji: "🚇", sub: "Calming transition tracks", color: t.primary },
        ].map((s, i) => React.createElement("button", {
          key: i,
          onClick: () => handlePress(`sit-${i}`, () => setActiveTab("nowplaying")),
          style: {
            width: "100%", padding: "13px 16px", borderRadius: 16, marginBottom: 8,
            background: t.surface2, border: `1px solid ${t.border}`,
            display: "flex", alignItems: "center", gap: 14, cursor: "pointer",
            transform: pressedBtn === `sit-${i}` ? "scale(0.97)" : "scale(1)",
            transition: "transform 0.15s ease",
          }
        },
          React.createElement("span", { style: { fontSize: 22 } }, s.emoji),
          React.createElement("div", { style: { flex: 1, textAlign: "left" } },
            React.createElement("div", { style: { fontSize: 14, fontWeight: 600, color: t.text } }, s.label),
            React.createElement("div", { style: { fontSize: 11, color: t.textMuted, marginTop: 2 } }, s.sub)
          ),
          React.createElement(Icon, { name: "ChevronRight", size: 16, color: t.textDim })
        ))
      )
    )
  );

  // Now Playing Screen
  const NowPlayingScreen = () => (
    React.createElement("div", {
      style: { flex: 1, overflowY: "auto", paddingBottom: 90 }
    },
      // Context Banner
      React.createElement("div", {
        style: {
          margin: "12px 20px",
          padding: "10px 14px",
          borderRadius: 12,
          background: `${t.teal}18`,
          border: `1px solid ${t.teal}33`,
          display: "flex", alignItems: "center", gap: 8,
        }
      },
        React.createElement(Icon, { name: "Brain", size: 14, color: t.teal }),
        React.createElement("span", { style: { fontSize: 12, color: t.teal, fontWeight: 600 } }, "Pre-exam focus · Instrumental progression active")
      ),

      // Album Art
      React.createElement("div", {
        style: {
          margin: "0 auto 20px",
          width: 240, height: 240,
          borderRadius: 28,
          background: `linear-gradient(135deg, #1a1a3e 0%, #2d1b69 50%, #1e1b4b 100%)`,
          boxShadow: `0 24px 64px ${t.primaryGlow}, 0 8px 24px rgba(0,0,0,0.6)`,
          display: "flex", alignItems: "center", justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }
      },
        React.createElement("div", {
          style: {
            position: "absolute", inset: 0,
            background: "radial-gradient(circle at 30% 40%, rgba(139,92,246,0.4) 0%, transparent 60%), radial-gradient(circle at 70% 70%, rgba(236,72,153,0.2) 0%, transparent 50%)",
          }
        }),
        React.createElement("div", { style: { textAlign: "center", position: "relative", zIndex: 1 } },
          React.createElement("div", { style: { fontSize: 60, marginBottom: 8 } }, "🎹"),
          React.createElement("div", { style: { fontSize: 11, color: "rgba(255,255,255,0.5)", fontWeight: 500 } }, "All Melody")
        )
      ),

      // Track Info + Like
      React.createElement("div", {
        style: { padding: "0 28px", display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }
      },
        React.createElement("div", null,
          React.createElement("div", { style: { fontSize: 22, fontWeight: 700, color: t.text } }, nowPlaying.title),
          React.createElement("div", { style: { fontSize: 14, color: t.textMuted, marginTop: 3 } }, nowPlaying.artist),
          React.createElement("div", { style: { fontSize: 11, color: t.primary, marginTop: 5, fontWeight: 500 } }, nowPlaying.context)
        ),
        React.createElement("button", {
          onClick: () => handlePress("like", () => setLiked(l => !l)),
          style: {
            background: liked ? `${t.accent}22` : t.surface2,
            border: `1.5px solid ${liked ? t.accent : t.border}`,
            borderRadius: 12, width: 44, height: 44,
            display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
            transform: pressedBtn === "like" ? "scale(0.85)" : "scale(1)",
            transition: "all 0.15s ease",
          }
        }, React.createElement(Icon, { name: liked ? "Heart" : "Heart", size: 20, color: liked ? t.accent : t.textMuted, strokeWidth: liked ? 2.5 : 1.8 }))
      ),

      // Waveform
      React.createElement("div", {
        style: { padding: "0 28px", display: "flex", alignItems: "center", gap: 3, height: 36, marginBottom: 14 }
      },
        Array.from({ length: 48 }, (_, i) => React.createElement(WaveBar, { key: i, index: i, playing: isPlaying }))
      ),

      // Progress Bar
      React.createElement("div", { style: { padding: "0 28px", marginBottom: 6 } },
        React.createElement("div", {
          style: {
            height: 4, borderRadius: 4, background: t.surface3,
            position: "relative", cursor: "pointer",
          }
        },
          React.createElement("div", {
            style: {
              height: "100%", borderRadius: 4, width: `${progress}%`,
              background: `linear-gradient(90deg, ${t.primary}, ${t.primaryLight})`,
              transition: "width 0.2s linear",
            }
          }),
          React.createElement("div", {
            style: {
              position: "absolute", top: "50%", transform: "translate(-50%,-50%)",
              left: `${progress}%`,
              width: 14, height: 14, borderRadius: "50%",
              background: t.primaryLight,
              boxShadow: `0 0 8px ${t.primaryGlow}`,
            }
          })
        ),
        React.createElement("div", { style: { display: "flex", justifyContent: "space-between", marginTop: 6 } },
          React.createElement("span", { style: { fontSize: 11, color: t.textMuted } }, formatProgress(progress)),
          React.createElement("span", { style: { fontSize: 11, color: t.textMuted } }, nowPlaying.duration)
        )
      ),

      // Controls
      React.createElement("div", {
        style: { padding: "10px 28px", display: "flex", alignItems: "center", justifyContent: "space-between" }
      },
        React.createElement("button", {
          onClick: () => handlePress("shuffle", null),
          style: { background: "none", border: "none", cursor: "pointer", padding: 6,
            transform: pressedBtn === "shuffle" ? "scale(0.85)" : "scale(1)", transition: "transform 0.15s" }
        }, React.createElement(Icon, { name: "Shuffle", size: 20, color: t.primary })),
        React.createElement("button", {
          onClick: () => handlePress("prev", null),
          style: { background: "none", border: "none", cursor: "pointer", padding: 6,
            transform: pressedBtn === "prev" ? "scale(0.85)" : "scale(1)", transition: "transform 0.15s" }
        }, React.createElement(Icon, { name: "SkipBack", size: 28, color: t.text, strokeWidth: 2 })),
        React.createElement("button", {
          onClick: () => handlePress("playpause", () => setIsPlaying(p => !p)),
          style: {
            width: 64, height: 64, borderRadius: "50%",
            background: `linear-gradient(135deg, ${t.primary}, ${t.primaryLight})`,
            border: "none", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: `0 8px 24px ${t.primaryGlow}`,
            transform: pressedBtn === "playpause" ? "scale(0.9)" : "scale(1)",
            transition: "transform 0.15s",
          }
        }, React.createElement(Icon, { name: isPlaying ? "Pause" : "Play", size: 26, color: "#fff", strokeWidth: 2.5 })),
        React.createElement("button", {
          onClick: () => handlePress("next", null),
          style: { background: "none", border: "none", cursor: "pointer", padding: 6,
            transform: pressedBtn === "next" ? "scale(0.85)" : "scale(1)", transition: "transform 0.15s" }
        }, React.createElement(Icon, { name: "SkipForward", size: 28, color: t.text, strokeWidth: 2 })),
        React.createElement("button", {
          onClick: () => handlePress("skipwhy", () => setShowSkipModal(true)),
          style: { background: "none", border: "none", cursor: "pointer", padding: 6,
            transform: pressedBtn === "skipwhy" ? "scale(0.85)" : "scale(1)", transition: "transform 0.15s" }
        }, React.createElement(Icon, { name: "MessageSquare", size: 20, color: t.textMuted }))
      ),

      // Up Next Queue
      React.createElement("div", { style: { padding: "12px 20px 0" } },
        React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 } },
          React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: t.text } }, "Up Next"),
          React.createElement("span", { style: { fontSize: 11, color: t.primary, fontWeight: 600 } }, "AI-curated")
        ),
        queue.map((track, i) => React.createElement("div", {
          key: i,
          style: {
            display: "flex", alignItems: "center", gap: 12, padding: "10px 0",
            borderBottom: i < queue.length - 1 ? `1px solid ${t.border2}` : "none",
          }
        },
          React.createElement("div", {
            style: {
              width: 40, height: 40, borderRadius: 10,
              background: `linear-gradient(135deg, ${t.surface3}, ${t.surface2})`,
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            }
          }, React.createElement(Icon, { name: "Music", size: 16, color: t.textMuted })),
          React.createElement("div", { style: { flex: 1 } },
            React.createElement("div", { style: { fontSize: 13, fontWeight: 600, color: t.text } }, track.title),
            React.createElement("div", { style: { fontSize: 11, color: t.textMuted, marginTop: 2 } }, track.artist)
          ),
          React.createElement("div", { style: { textAlign: "right" } },
            React.createElement("div", { style: { fontSize: 11, color: t.primary, fontWeight: 700 } }, `${track.match}%`),
            React.createElement("div", { style: { fontSize: 10, color: t.textDim } }, track.duration)
          )
        ))
      ),

      // Skip Modal
      showSkipModal && React.createElement("div", {
        style: {
          position: "absolute", inset: 0, background: "rgba(0,0,0,0.7)",
          display: "flex", alignItems: "flex-end", zIndex: 100,
        },
        onClick: (e) => { if (e.target === e.currentTarget) setShowSkipModal(false); }
      },
        React.createElement("div", {
          style: {
            width: "100%", borderRadius: "24px 24px 0 0",
            background: t.surface, padding: "20px 20px 40px",
          }
        },
          React.createElement("div", { style: { width: 40, height: 4, borderRadius: 4, background: t.border, margin: "0 auto 20px" } }),
          React.createElement("div", { style: { fontSize: 16, fontWeight: 700, color: t.text, marginBottom: 4 } }, "Why skip this track?"),
          React.createElement("div", { style: { fontSize: 12, color: t.textMuted, marginBottom: 20 } }, "Helps MoodMixer learn your context better"),
          React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 } },
            skipReasons.map(r => React.createElement("button", {
              key: r.id,
              onClick: () => { setSkipReason(r.id); setShowSkipModal(false); },
              style: {
                padding: "12px 14px", borderRadius: 14, textAlign: "left",
                background: skipReason === r.id ? t.primaryGlow : t.surface2,
                border: `1.5px solid ${skipReason === r.id ? t.primary : t.border}`,
                cursor: "pointer", display: "flex", alignItems: "center", gap: 8,
              }
            },
              React.createElement(Icon, { name: r.icon, size: 15, color: t.textMuted }),
              React.createElement("span", { style: { fontSize: 12, color: t.text, fontWeight: 500 } }, r.label)
            ))
          )
        )
      )
    )
  );

  // Sessions Screen
  const SessionsScreen = () => (
    React.createElement("div", {
      style: { flex: 1, overflowY: "auto", paddingBottom: 90 }
    },
      React.createElement("div", { style: { padding: "16px 20px 8px", display: "flex", justifyContent: "space-between", alignItems: "center" } },
        React.createElement("div", { style: { fontSize: 20, fontWeight: 700, color: t.text } }, "Your Sessions"),
        React.createElement("div", {
          style: {
            padding: "6px 12px", borderRadius: 20,
            background: t.surface2, border: `1px solid ${t.border}`,
          }
        },
          React.createElement("span", { style: { fontSize: 11, color: t.textMuted, fontWeight: 600 } }, "This Week")
        )
      ),

      // Stats Row
      React.createElement("div", {
        style: { padding: "8px 20px 16px", display: "flex", gap: 10 }
      },
        [
          { label: "Sessions", val: "24", icon: "Headphones", color: t.primary },
          { label: "Hours", val: "18.4", icon: "Clock", color: t.teal },
          { label: "Skip rate", val: "11%", icon: "SkipForward", color: t.green },
        ].map((s, i) => React.createElement("div", {
          key: i,
          style: {
            flex: 1, padding: "12px 10px", borderRadius: 16,
            background: t.surface2, border: `1px solid ${t.border}`,
            textAlign: "center",
          }
        },
          React.createElement(Icon, { name: s.icon, size: 16, color: s.color }),
          React.createElement("div", { style: { fontSize: 18, fontWeight: 800, color: t.text, marginTop: 4 } }, s.val),
          React.createElement("div", { style: { fontSize: 10, color: t.textMuted, fontWeight: 600 } }, s.label)
        ))
      ),

      // Detected Patterns
      React.createElement("div", { style: { padding: "0 20px 16px" } },
        React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: t.text, marginBottom: 12 } }, "Detected Routines"),
        React.createElement("div", { style: { display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4 } },
          patterns.map((p, i) => React.createElement("div", {
            key: i,
            style: {
              flex: "0 0 auto", width: 160, padding: "14px 14px",
              borderRadius: 18, background: t.surface2,
              border: `1px solid ${p.color}33`,
            }
          },
            React.createElement("div", {
              style: {
                width: 32, height: 32, borderRadius: 10, background: `${p.color}22`,
                display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 8,
              }
            }, React.createElement(Icon, { name: p.icon, size: 15, color: p.color })),
            React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: t.text, lineHeight: 1.3, marginBottom: 4 } }, p.label),
            React.createElement("div", { style: { fontSize: 10, color: t.textMuted, marginBottom: 6 } }, p.desc),
            React.createElement("div", {
              style: {
                display: "inline-block", padding: "3px 8px", borderRadius: 20,
                background: `${p.color}18`, border: `1px solid ${p.color}33`,
              }
            }, React.createElement("span", { style: { fontSize: 10, color: p.color, fontWeight: 700 } }, p.streak))
          ))
        )
      ),

      // Recent Sessions
      React.createElement("div", { style: { padding: "0 20px" } },
        React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: t.text, marginBottom: 12 } }, "Recent Sessions"),
        sessions.map(s => React.createElement("div", {
          key: s.id,
          onClick: () => setActiveSession(activeSession === s.id ? null : s.id),
          style: {
            marginBottom: 10, borderRadius: 18, background: t.surface2,
            border: `1px solid ${activeSession === s.id ? s.color + "55" : t.border}`,
            overflow: "hidden", cursor: "pointer",
            transition: "border-color 0.2s ease",
          }
        },
          React.createElement("div", { style: { padding: "14px 16px", display: "flex", alignItems: "center", gap: 12 } },
            React.createElement("div", {
              style: {
                width: 42, height: 42, borderRadius: 13, background: `${s.color}22`,
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              }
            }, React.createElement(Icon, { name: s.icon, size: 18, color: s.color })),
            React.createElement("div", { style: { flex: 1 } },
              React.createElement("div", { style: { fontSize: 14, fontWeight: 700, color: t.text } }, s.name),
              React.createElement("div", { style: { fontSize: 11, color: t.textMuted, marginTop: 2 } }, s.time)
            ),
            React.createElement("div", { style: { textAlign: "right" } },
              React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: t.text } }, s.duration),
              React.createElement("div", { style: { fontSize: 10, color: t.textMuted } }, `${s.tracks} tracks`)
            )
          ),
          activeSession === s.id && React.createElement("div", {
            style: {
              padding: "0 16px 14px",
              borderTop: `1px solid ${t.border}`,
              paddingTop: 12,
            }
          },
            React.createElement("div", {
              style: {
                padding: "10px 12px", borderRadius: 12,
                background: `${s.color}12`, border: `1px solid ${s.color}22`,
                display: "flex", gap: 8, alignItems: "flex-start",
              }
            },
              React.createElement(Icon, { name: "Lightbulb", size: 13, color: s.color }),
              React.createElement("span", { style: { fontSize: 11, color: t.textMuted, lineHeight: 1.5 } }, s.insight)
            ),
            React.createElement("div", { style: { display: "flex", gap: 8, marginTop: 10 } },
              React.createElement("div", { style: { flex: 1, padding: "8px 12px", borderRadius: 10, background: t.surface3, textAlign: "center" } },
                React.createElement("div", { style: { fontSize: 14, fontWeight: 800, color: t.text } }, s.tracks),
                React.createElement("div", { style: { fontSize: 10, color: t.textMuted } }, "Tracks")
              ),
              React.createElement("div", { style: { flex: 1, padding: "8px 12px", borderRadius: 10, background: t.surface3, textAlign: "center" } },
                React.createElement("div", { style: { fontSize: 14, fontWeight: 800, color: s.skips === 0 ? t.green : t.text } }, s.skips),
                React.createElement("div", { style: { fontSize: 10, color: t.textMuted } }, "Skips")
              ),
              React.createElement("div", { style: { flex: 1, padding: "8px 12px", borderRadius: 10, background: t.surface3, textAlign: "center" } },
                React.createElement("div", { style: { fontSize: 14, fontWeight: 800, color: s.color } }, s.duration),
                React.createElement("div", { style: { fontSize: 10, color: t.textMuted } }, "Duration")
              )
            )
          )
        ))
      )
    )
  );

  // Discover Screen
  const DiscoverScreen = () => (
    React.createElement("div", {
      style: { flex: 1, overflowY: "auto", paddingBottom: 90 }
    },
      React.createElement("div", { style: { padding: "16px 20px 12px" } },
        React.createElement("div", { style: { fontSize: 20, fontWeight: 700, color: t.text } }, "Discover"),
        React.createElement("div", { style: { fontSize: 13, color: t.textMuted, marginTop: 2 } }, "Situation-based mixes, built for your life")
      ),

      // Featured Banner
      React.createElement("div", {
        style: {
          margin: "0 20px 20px",
          height: 160, borderRadius: 22,
          background: "linear-gradient(135deg, #1a0a3e 0%, #2d1569 50%, #0e1a4e 100%)",
          position: "relative", overflow: "hidden",
          display: "flex", flexDirection: "column", justifyContent: "flex-end",
          padding: 20, cursor: "pointer",
          boxShadow: `0 16px 48px rgba(0,0,0,0.5)`,
        }
      },
        React.createElement("div", {
          style: {
            position: "absolute", inset: 0,
            background: "radial-gradient(circle at 80% 20%, rgba(139,92,246,0.5) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(236,72,153,0.3) 0%, transparent 50%)",
          }
        }),
        React.createElement("div", { style: { position: "absolute", top: 16, right: 16 } },
          React.createElement("div", {
            style: {
              padding: "4px 10px", borderRadius: 20,
              background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)",
            }
          }, React.createElement("span", { style: { fontSize: 10, color: "#fff", fontWeight: 700 } }, "FEATURED"))
        ),
        React.createElement("div", { style: { position: "relative" } },
          React.createElement("div", { style: { fontSize: 10, color: "rgba(255,255,255,0.6)", fontWeight: 600, letterSpacing: "0.1em", marginBottom: 4 } }, "TODAY'S PICK"),
          React.createElement("div", { style: { fontSize: 20, fontWeight: 800, color: "#fff" } }, "Sunday Morning Reset"),
          React.createElement("div", { style: { fontSize: 12, color: "rgba(255,255,255,0.65)", marginTop: 2 } }, "Eases you from sleep into a soft, clear-headed Sunday")
        )
      ),

      // Filter Chips
      React.createElement("div", {
        style: { padding: "0 20px 16px", display: "flex", gap: 8, overflowX: "auto" }
      },
        ["All", "Focus", "Energy", "Calm", "Workout", "Sleep"].map((f, i) => React.createElement("button", {
          key: i,
          style: {
            flex: "0 0 auto", padding: "7px 14px", borderRadius: 20,
            background: i === 0 ? t.primary : t.surface2,
            border: `1.5px solid ${i === 0 ? t.primary : t.border}`,
            cursor: "pointer",
          }
        }, React.createElement("span", { style: { fontSize: 12, color: i === 0 ? "#fff" : t.textMuted, fontWeight: 600 } }, f)))
      ),

      // Mix Cards
      React.createElement("div", { style: { padding: "0 20px" } },
        React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: t.text, marginBottom: 12 } }, "Matched to your patterns"),
        discoverMixes.map((mix, i) => React.createElement("button", {
          key: i,
          onClick: () => handlePress(`mix-${i}`, () => setActiveTab("nowplaying")),
          style: {
            width: "100%", marginBottom: 12, borderRadius: 18,
            background: t.surface2, border: `1px solid ${t.border}`,
            padding: 0, overflow: "hidden", cursor: "pointer",
            transform: pressedBtn === `mix-${i}` ? "scale(0.97)" : "scale(1)",
            transition: "transform 0.15s ease",
          }
        },
          React.createElement("div", { style: { display: "flex", height: 80 } },
            React.createElement("div", {
              style: {
                width: 80, flexShrink: 0,
                background: `linear-gradient(135deg, ${mix.gradient[0]}, ${mix.gradient[1]})`,
                display: "flex", alignItems: "center", justifyContent: "center",
              }
            }, React.createElement(Icon, { name: mix.icon, size: 28, color: "#fff", strokeWidth: 1.8 })),
            React.createElement("div", {
              style: {
                flex: 1, padding: "12px 14px", textAlign: "left",
                display: "flex", flexDirection: "column", justifyContent: "space-between",
              }
            },
              React.createElement("div", null,
                React.createElement("div", { style: { fontSize: 14, fontWeight: 700, color: t.text } }, mix.name),
                React.createElement("div", { style: { fontSize: 11, color: t.textMuted, marginTop: 2, lineHeight: 1.3 } }, mix.desc)
              ),
              React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between" } },
                React.createElement("div", { style: { display: "flex", gap: 6 } },
                  mix.tags.map((tag, j) => React.createElement("div", {
                    key: j,
                    style: {
                      padding: "2px 8px", borderRadius: 10,
                      background: `${mix.color}22`, border: `1px solid ${mix.color}33`,
                    }
                  }, React.createElement("span", { style: { fontSize: 10, color: mix.color, fontWeight: 600 } }, tag)))
                ),
                React.createElement("div", {
                  style: {
                    padding: "3px 8px", borderRadius: 20,
                    background: `${t.green}18`,
                  }
                }, React.createElement("span", { style: { fontSize: 11, fontWeight: 800, color: t.green } }, `${mix.match}% match`))
              )
            )
          )
        ))
      )
    )
  );

  // Settings Screen
  const SettingsScreen = () => {
    const ToggleSwitch = ({ value, onChange }) => React.createElement("button", {
      onClick: onChange,
      style: {
        width: 46, height: 26, borderRadius: 13,
        background: value ? t.primary : t.surface3,
        border: "none", cursor: "pointer", position: "relative",
        transition: "background 0.25s ease",
        flexShrink: 0,
      }
    },
      React.createElement("div", {
        style: {
          position: "absolute", top: 3,
          left: value ? 23 : 3,
          width: 20, height: 20, borderRadius: "50%", background: "#fff",
          transition: "left 0.25s ease",
          boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
        }
      })
    );

    const SettingRow = ({ label, sub, value, onChange, icon, color }) => React.createElement("div", {
      style: {
        display: "flex", alignItems: "center", gap: 12,
        padding: "13px 0",
        borderBottom: `1px solid ${t.border2}`,
      }
    },
      React.createElement("div", {
        style: {
          width: 36, height: 36, borderRadius: 10, background: `${color || t.primary}22`,
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
        }
      }, React.createElement(Icon, { name: icon, size: 16, color: color || t.primary })),
      React.createElement("div", { style: { flex: 1 } },
        React.createElement("div", { style: { fontSize: 14, fontWeight: 600, color: t.text } }, label),
        sub && React.createElement("div", { style: { fontSize: 11, color: t.textMuted, marginTop: 2 } }, sub)
      ),
      React.createElement(ToggleSwitch, { value, onChange })
    );

    return React.createElement("div", {
      style: { flex: 1, overflowY: "auto", paddingBottom: 90 }
    },
      React.createElement("div", { style: { padding: "16px 20px 20px" } },
        React.createElement("div", { style: { fontSize: 20, fontWeight: 700, color: t.text } }, "Settings")
      ),

      // Profile Card
      React.createElement("div", { style: { padding: "0 20px 20px" } },
        React.createElement("div", {
          style: {
            padding: "18px 20px", borderRadius: 22,
            background: `linear-gradient(135deg, ${t.surface2}, ${t.surface3})`,
            border: `1px solid ${t.border}`,
            display: "flex", alignItems: "center", gap: 14,
          }
        },
          React.createElement("div", {
            style: {
              width: 52, height: 52, borderRadius: "50%",
              background: `linear-gradient(135deg, ${t.primary}, ${t.accent})`,
              display: "flex", alignItems: "center", justifyContent: "center",
            }
          }, React.createElement("span", { style: { fontSize: 20 } }, "🎵")),
          React.createElement("div", { style: { flex: 1 } },
            React.createElement("div", { style: { fontSize: 16, fontWeight: 700, color: t.text } }, "Alex Rivera"),
            React.createElement("div", { style: { fontSize: 12, color: t.textMuted } }, "Member since Jan 2025"),
            React.createElement("div", { style: { fontSize: 11, color: t.primary, marginTop: 3, fontWeight: 600 } }, "24 sessions · 18h this week")
          ),
          React.createElement(Icon, { name: "ChevronRight", size: 16, color: t.textDim })
        )
      ),

      // Theme Toggle
      React.createElement("div", { style: { padding: "0 20px 8px" } },
        React.createElement("div", { style: { fontSize: 11, color: t.textMuted, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 } }, "Appearance"),
        React.createElement("div", {
          style: {
            padding: "14px 16px", borderRadius: 18,
            background: t.surface2, border: `1px solid ${t.border}`,
            display: "flex", gap: 8,
          }
        },
          [
            { key: "dark", label: "Dark", icon: "Moon" },
            { key: "light", label: "Light", icon: "Sun" },
          ].map(opt => React.createElement("button", {
            key: opt.key,
            onClick: () => setThemeKey(opt.key),
            style: {
              flex: 1, padding: "10px 0", borderRadius: 14,
              background: themeKey === opt.key ? t.primary : "transparent",
              border: `1.5px solid ${themeKey === opt.key ? t.primary : t.border}`,
              cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
              transition: "all 0.2s ease",
            }
          },
            React.createElement(Icon, { name: opt.icon, size: 14, color: themeKey === opt.key ? "#fff" : t.textMuted }),
            React.createElement("span", { style: { fontSize: 13, fontWeight: 600, color: themeKey === opt.key ? "#fff" : t.textMuted } }, opt.label)
          ))
        )
      ),

      // Intelligence Settings
      React.createElement("div", { style: { padding: "12px 20px 8px" } },
        React.createElement("div", { style: { fontSize: 11, color: t.textMuted, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 2 } }, "Intelligence"),
        React.createElement("div", {
          style: { padding: "0 16px", borderRadius: 18, background: t.surface2, border: `1px solid ${t.border}` }
        },
          React.createElement(SettingRow, {
            label: "Adaptive Learning", sub: "Learns from your skips and patterns",
            value: adaptiveLearning, onChange: () => setAdaptiveLearning(v => !v),
            icon: "Brain", color: t.primary
          }),
          React.createElement(SettingRow, {
            label: "Calendar Sync", sub: "Uses events to predict your mood context",
            value: calendarSync, onChange: () => setCalendarSync(v => !v),
            icon: "Calendar", color: t.teal
          }),
          React.createElement(SettingRow, {
            label: "Motion Cues", sub: "Detects pace and movement for BPM matching",
            value: motionCues, onChange: () => setMotionCues(v => !v),
            icon: "Activity", color: t.orange
          }),
          React.createElement("div", {
            style: {
              display: "flex", alignItems: "center", gap: 12, padding: "13px 0",
            }
          },
            React.createElement("div", {
              style: {
                width: 36, height: 36, borderRadius: 10, background: `${t.green}22`,
                display: "flex", alignItems: "center", justifyContent: "center",
              }
            }, React.createElement(Icon, { name: "Bell", size: 16, color: t.green })),
            React.createElement("div", { style: { flex: 1 } },
              React.createElement("div", { style: { fontSize: 14, fontWeight: 600, color: t.text } }, "Pattern Nudges"),
              React.createElement("div", { style: { fontSize: 11, color: t.textMuted, marginTop: 2 } }, "Notify when a routine is detected")
            ),
            React.createElement("button", {
              onClick: () => setNotifications(v => !v),
              style: {
                width: 46, height: 26, borderRadius: 13,
                background: notifications ? t.primary : t.surface3,
                border: "none", cursor: "pointer", position: "relative",
                transition: "background 0.25s ease",
              }
            },
              React.createElement("div", {
                style: {
                  position: "absolute", top: 3, left: notifications ? 23 : 3,
                  width: 20, height: 20, borderRadius: "50%", background: "#fff",
                  transition: "left 0.25s ease",
                }
              })
            )
          )
        )
      ),

      // Skip Learning Card
      React.createElement("div", { style: { padding: "12px 20px 8px" } },
        React.createElement("div", { style: { fontSize: 11, color: t.textMuted, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 } }, "Skip Learning"),
        React.createElement("div", {
          style: {
            padding: "16px", borderRadius: 18,
            background: t.surface2, border: `1px solid ${t.border}`,
          }
        },
          React.createElement("div", { style: { display: "flex", justifyContent: "space-between", marginBottom: 14 } },
            React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: t.text } }, "Top skip reasons"),
            React.createElement("span", { style: { fontSize: 11, color: t.primary, fontWeight: 600 } }, "Last 30 days")
          ),
          [
            { reason: "Wrong vibe", pct: 38, color: t.accent },
            { reason: "Too slow", pct: 27, color: t.teal },
            { reason: "Overplayed", pct: 21, color: t.orange },
            { reason: "Distracting lyrics", pct: 14, color: t.primary },
          ].map((r, i) => React.createElement("div", { key: i, style: { marginBottom: 10 } },
            React.createElement("div", { style: { display: "flex", justifyContent: "space-between", marginBottom: 4 } },
              React.createElement("span", { style: { fontSize: 12, color: t.textMuted } }, r.reason),
              React.createElement("span", { style: { fontSize: 12, fontWeight: 700, color: t.text } }, `${r.pct}%`)
            ),
            React.createElement("div", { style: { height: 5, borderRadius: 5, background: t.surface3 } },
              React.createElement("div", {
                style: {
                  height: "100%", borderRadius: 5, width: `${r.pct}%`,
                  background: r.color,
                  transition: "width 0.6s ease",
                }
              })
            )
          ))
        )
      ),

      // Version
      React.createElement("div", { style: { padding: "16px 20px 8px", textAlign: "center" } },
        React.createElement("div", { style: { fontSize: 11, color: t.textDim } }, "MoodMixer v2.4.1 · Personalization index: 94%")
      )
    );
  };

  const screens = {
    home: React.createElement(HomeScreen),
    nowplaying: React.createElement(NowPlayingScreen),
    sessions: React.createElement(SessionsScreen),
    discover: React.createElement(DiscoverScreen),
    settings: React.createElement(SettingsScreen),
  };

  const navItems = [
    { id: "home", icon: "Home", label: "Home" },
    { id: "discover", icon: "Compass", label: "Discover" },
    { id: "nowplaying", icon: "Music2", label: "Playing" },
    { id: "sessions", icon: "BarChart2", label: "Sessions" },
    { id: "settings", icon: "Settings", label: "Settings" },
  ];

  // ─── Render ───────────────────────────────────────────────────────────────
  return React.createElement("div", {
    style: {
      minHeight: "100vh",
      background: themeKey === "dark"
        ? "radial-gradient(ellipse at 30% 20%, #1a0a3e 0%, #08080F 60%)"
        : "radial-gradient(ellipse at 30% 20%, #E9E0FF 0%, #F3F0FF 60%)",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "'Outfit', sans-serif",
    }
  },
    React.createElement("style", null, fontStyle),

    // Phone Frame
    React.createElement("div", {
      style: {
        width: 375, height: 812,
        borderRadius: 52,
        background: t.bg,
        boxShadow: themeKey === "dark"
          ? "0 40px 120px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.07), inset 0 0 0 1px rgba(255,255,255,0.04)"
          : "0 40px 120px rgba(0,0,0,0.25), 0 0 0 1px rgba(0,0,0,0.1)",
        overflow: "hidden",
        display: "flex", flexDirection: "column",
        position: "relative",
      }
    },

      // Status Bar
      React.createElement("div", {
        style: {
          height: 50, paddingTop: 14, paddingLeft: 24, paddingRight: 24,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          flexShrink: 0, position: "relative", zIndex: 10,
          background: t.bg,
        }
      },
        React.createElement("span", { style: { fontSize: 15, fontWeight: 700, color: t.text } }, currentTime),
        // Dynamic Island
        React.createElement("div", {
          style: {
            position: "absolute", left: "50%", transform: "translateX(-50%)",
            top: 10, width: 120, height: 34, borderRadius: 20,
            background: "#000",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          }
        },
          isPlaying && activeTab === "nowplaying"
            ? React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 6 } },
                React.createElement("div", { style: { width: 18, height: 18, borderRadius: 6, background: `linear-gradient(135deg, ${t.primary}, ${t.accent})`, display: "flex", alignItems: "center", justifyContent: "center" } },
                  React.createElement(Icon, { name: "Music", size: 10, color: "#fff", strokeWidth: 2 })
                ),
                React.createElement("div", { style: { display: "flex", gap: 2, alignItems: "flex-end" } },
                  [4, 8, 6, 10, 5].map((h, i) => React.createElement("div", {
                    key: i,
                    style: {
                      width: 2, borderRadius: 2, background: t.primaryLight,
                      height: Math.max(2, h * (0.4 + 0.6 * Math.sin(waveFrame * 0.2 + i))),
                      transition: "height 0.15s ease",
                    }
                  }))
                )
              )
            : null
        ),
        React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 6 } },
          React.createElement(Icon, { name: "Wifi", size: 14, color: t.text }),
          React.createElement("div", {
            style: {
              width: 22, height: 11, borderRadius: 3,
              border: `1.5px solid ${t.textMuted}`,
              position: "relative", display: "flex", alignItems: "center", padding: 2,
            }
          },
            React.createElement("div", { style: { flex: 1, height: "100%", borderRadius: 1, background: t.text } }),
            React.createElement("div", {
              style: {
                position: "absolute", right: -4, top: "50%", transform: "translateY(-50%)",
                width: 2, height: 5, borderRadius: "0 1px 1px 0", background: t.textMuted,
              }
            })
          )
        )
      ),

      // Screen Content
      React.createElement("div", {
        style: { flex: 1, overflow: "hidden", display: "flex", flexDirection: "column", position: "relative" }
      }, screens[activeTab]),

      // Bottom Nav
      React.createElement("div", {
        style: {
          height: 80, background: t.navBg,
          borderTop: `1px solid ${t.border}`,
          display: "flex", alignItems: "center", justifyContent: "space-around",
          padding: "0 10px 12px",
          flexShrink: 0,
        }
      },
        navItems.map(item => {
          const active = activeTab === item.id;
          return React.createElement("button", {
            key: item.id,
            onClick: () => handlePress(`nav-${item.id}`, () => setActiveTab(item.id)),
            style: {
              display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
              background: "none", border: "none", cursor: "pointer",
              padding: "8px 12px", borderRadius: 16,
              transform: pressedBtn === `nav-${item.id}` ? "scale(0.85)" : "scale(1)",
              transition: "transform 0.15s ease",
            }
          },
            item.id === "nowplaying"
              ? React.createElement("div", {
                  style: {
                    width: 44, height: 44, borderRadius: 16, marginTop: -20,
                    background: active
                      ? `linear-gradient(135deg, ${t.primary}, ${t.accent})`
                      : t.surface2,
                    border: `2px solid ${active ? t.primary : t.border}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    boxShadow: active ? `0 8px 20px ${t.primaryGlow}` : "none",
                    transition: "all 0.2s ease",
                  }
                }, React.createElement(Icon, { name: item.icon, size: 20, color: active ? "#fff" : t.textMuted, strokeWidth: 2 }))
              : React.createElement(React.Fragment, null,
                  React.createElement("div", {
                    style: {
                      width: 28, height: 28, borderRadius: 10,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      background: active ? t.primaryGlow : "transparent",
                    }
                  }, React.createElement(Icon, { name: item.icon, size: 20, color: active ? t.primary : t.textMuted, strokeWidth: active ? 2.2 : 1.7 })),
                  React.createElement("span", {
                    style: {
                      fontSize: 10, fontWeight: active ? 700 : 500,
                      color: active ? t.primary : t.textMuted,
                    }
                  }, item.label)
                )
          );
        })
      )
    )
  );
}
