const { useState, useEffect, useRef } = React;

// ─── Data ─────────────────────────────────────────────────────────────────────

const SPARKS_DATA = [
  { id: 1, prompt: "Capture your ideal 30-second focus break", category: "Mindfulness", color: "#2563EB", emoji: "⚡", contributors: 847 },
  { id: 2, prompt: "Illustrate a strategy for digital decluttering", category: "Productivity", color: "#FF5A45", emoji: "🧹", contributors: 1203 },
  { id: 3, prompt: "Show your morning ritual that sets a positive tone", category: "Habits", color: "#FFD233", emoji: "🌅", contributors: 562 },
  { id: 4, prompt: "Demonstrate your go-to stress relief technique", category: "Wellness", color: "#10B981", emoji: "💚", contributors: 934 },
  { id: 5, prompt: "Create a 15-second workspace transformation", category: "Environment", color: "#F59E0B", emoji: "🏠", contributors: 421 },
];

const SQUADS_DATA = [
  { id: 1, name: "Morning Makers", members: ["Alex", "Sam", "Jordan", "Riley"], progress: 75, spark: "Morning ritual that sets a positive tone", avatar: "🌅", color: "#2563EB" },
  { id: 2, name: "Digital Detox Crew", members: ["Casey", "Morgan"], progress: 40, spark: "Strategy for digital decluttering", avatar: "🧹", color: "#FF5A45" },
  { id: 3, name: "Focus Flow", members: ["Taylor", "Jamie", "Drew"], progress: 90, spark: "Capture your ideal 30-second focus break", avatar: "⚡", color: "#FFD233" },
];

const REELS_DATA = [
  { id: 1, squadName: "Morning Makers", spark: "Morning ritual", clips: 4, likes: 234, views: "1.2K", duration: "0:47" },
  { id: 2, squadName: "Focus Flow", spark: "30-sec focus break", clips: 3, likes: 189, views: "987", duration: "0:32" },
];

// ─── HomeScreen ───────────────────────────────────────────────────────────────

function HomeScreen({ theme: t, colors: C }) {
  const [likedSparks, setLikedSparks] = useState({});

  return (
    <div style={{ height: "100%", overflowY: "auto", background: t.bg }}>
      {/* Header */}
      <div style={{ padding: "14px 20px 8px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontSize: 13, color: t.subtext, fontWeight: 600 }}>Good morning ✨</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: t.text, lineHeight: 1.2 }}>What sparks today?</div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <div style={{ width: 40, height: 40, borderRadius: 14, background: C.blueLight, display: "flex", alignItems: "center", justifyContent: "center" }}>
            {React.createElement(window.lucide.Bell, { size: 20, color: C.blue })}
          </div>
          <div style={{ width: 40, height: 40, borderRadius: 14, background: "#FFE8E5", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>
            😊
          </div>
        </div>
      </div>

      {/* Featured Spark */}
      <div style={{ padding: "10px 20px" }}>
        <div style={{ background: `linear-gradient(135deg, ${C.blue} 0%, #1D4ED8 100%)`, borderRadius: 24, padding: 20, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: -24, right: -24, width: 110, height: 110, borderRadius: "50%", background: "rgba(255,255,255,0.09)" }} />
          <div style={{ position: "absolute", bottom: -20, right: 40, width: 70, height: 70, borderRadius: "50%", background: "rgba(255,255,255,0.07)" }} />
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
            <div style={{ background: C.yellow, borderRadius: 8, padding: "3px 10px" }}>
              <span style={{ fontSize: 11, fontWeight: 800, color: C.charcoal }}>⚡ TODAY'S SPARK</span>
            </div>
          </div>
          <div style={{ fontSize: 18, fontWeight: 700, color: "#fff", lineHeight: 1.4, marginBottom: 14, position: "relative", zIndex: 1 }}>
            "Capture your ideal 30-second focus break"
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", gap: 14 }}>
              <span style={{ fontSize: 13, color: "rgba(255,255,255,0.85)", fontWeight: 500 }}>🔥 847 contributions</span>
              <span style={{ fontSize: 13, color: "rgba(255,255,255,0.85)", fontWeight: 500 }}>⏱ 15-30s</span>
            </div>
            <div style={{ background: C.coral, borderRadius: 14, padding: "8px 16px", display: "flex", alignItems: "center", gap: 6, cursor: "pointer" }}>
              {React.createElement(window.lucide.Zap, { size: 14, color: "#fff" })}
              <span style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>Join</span>
            </div>
          </div>
        </div>
      </div>

      {/* Trending Sparks — Overlapping Angled Cards */}
      <div style={{ padding: "8px 20px 4px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <span style={{ fontSize: 16, fontWeight: 700, color: t.text }}>Trending Sparks</span>
          <span style={{ fontSize: 13, color: C.blue, fontWeight: 600 }}>See all</span>
        </div>
        <div style={{ position: "relative", height: 188 }}>
          {/* Back card */}
          <div style={{ position: "absolute", left: 50, top: 18, width: 205, background: "#10B981", borderRadius: 18, padding: "14px 16px", transform: "rotate(5deg)", boxShadow: "0 4px 14px rgba(0,0,0,0.1)" }}>
            <div style={{ fontSize: 24, marginBottom: 6 }}>💚</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", lineHeight: 1.3 }}>Show your stress relief technique</div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.8)", marginTop: 6 }}>Wellness · 934</div>
          </div>
          {/* Middle card */}
          <div style={{ position: "absolute", left: 22, top: 10, width: 215, background: C.coral, borderRadius: 18, padding: "14px 16px", transform: "rotate(-3deg)", boxShadow: "0 6px 18px rgba(0,0,0,0.12)", zIndex: 2 }}>
            <div style={{ fontSize: 24, marginBottom: 6 }}>🧹</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", lineHeight: 1.3 }}>Strategy for digital decluttering</div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.8)", marginTop: 6 }}>Productivity · 1.2K</div>
          </div>
          {/* Front card */}
          <div style={{ position: "absolute", left: 0, top: 0, width: 224, background: C.yellow, borderRadius: 18, padding: "14px 16px", transform: "rotate(-1.5deg)", boxShadow: "0 8px 24px rgba(0,0,0,0.15)", zIndex: 3 }}>
            <div style={{ fontSize: 24, marginBottom: 6 }}>🌅</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: C.charcoal, lineHeight: 1.3 }}>Show your morning ritual</div>
            <div style={{ fontSize: 12, color: "rgba(46,43,40,0.65)", marginTop: 6 }}>Habits · 562 members</div>
            <div style={{ position: "absolute", top: 14, right: 14, background: C.charcoal, borderRadius: 10, padding: "4px 10px" }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: "#fff" }}>HOT 🔥</span>
            </div>
          </div>
        </div>
      </div>

      {/* Squad Activity */}
      <div style={{ padding: "10px 20px 0" }}>
        <span style={{ fontSize: 16, fontWeight: 700, color: t.text }}>Squad Activity</span>
        {[
          { name: "Morning Makers", action: "completed a Spark!", time: "2m ago", avatar: "🌅", bg: C.blueLight },
          { name: "Focus Flow", action: "posted a new Reel", time: "15m ago", avatar: "⚡", bg: "#FFF9DB" },
          { name: "Digital Detox Crew", action: "joined a new Spark", time: "1h ago", avatar: "🧹", bg: "#FFE8E5" },
        ].map((item, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 0", borderBottom: i < 2 ? `1px solid ${t.border}` : "none" }}>
            <div style={{ width: 44, height: 44, borderRadius: 16, background: item.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>
              {item.avatar}
            </div>
            <div style={{ flex: 1 }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: t.text }}>{item.name} </span>
              <span style={{ fontSize: 14, color: t.subtext }}>{item.action}</span>
              <div style={{ fontSize: 12, color: t.subtext, marginTop: 2 }}>{item.time}</div>
            </div>
            {React.createElement(window.lucide.ChevronRight, { size: 18, color: t.subtext })}
          </div>
        ))}
      </div>
      <div style={{ height: 20 }} />
    </div>
  );
}

// ─── SquadsScreen ─────────────────────────────────────────────────────────────

function SquadsScreen({ theme: t, colors: C }) {
  const [expandedSquad, setExpandedSquad] = useState(null);

  return (
    <div style={{ height: "100%", overflowY: "auto", background: t.bg }}>
      {/* Header */}
      <div style={{ padding: "14px 20px 12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontSize: 22, fontWeight: 800, color: t.text }}>My Squads</div>
        <div style={{ background: C.blue, borderRadius: 14, padding: "8px 14px", display: "flex", alignItems: "center", gap: 6, cursor: "pointer" }}>
          {React.createElement(window.lucide.Plus, { size: 15, color: "#fff" })}
          <span style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>New Squad</span>
        </div>
      </div>

      {/* Search */}
      <div style={{ padding: "0 20px 14px" }}>
        <div style={{ background: t.inputBg, borderRadius: 16, padding: "10px 14px", display: "flex", alignItems: "center", gap: 10 }}>
          {React.createElement(window.lucide.Search, { size: 17, color: t.subtext })}
          <span style={{ fontSize: 14, color: t.subtext }}>Find or join a squad...</span>
        </div>
      </div>

      {/* Active Squads */}
      {SQUADS_DATA.map((squad) => (
        <div key={squad.id} style={{ padding: "0 20px 12px" }}>
          <div
            onClick={() => setExpandedSquad(expandedSquad === squad.id ? null : squad.id)}
            style={{ background: t.card, borderRadius: 20, padding: 16, boxShadow: "0 2px 12px rgba(0,0,0,0.06)", border: `1px solid ${t.border}`, cursor: "pointer" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
              <div style={{ width: 48, height: 48, borderRadius: 18, background: squad.color + "22", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>
                {squad.avatar}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: t.text }}>{squad.name}</div>
                <div style={{ fontSize: 13, color: t.subtext }}>{squad.members.length} members · Active now</div>
              </div>
              <div style={{ background: squad.color + "22", borderRadius: 10, padding: "5px 10px" }}>
                <span style={{ fontSize: 13, fontWeight: 800, color: squad.color }}>{squad.progress}%</span>
              </div>
            </div>
            <div style={{ background: t.border, borderRadius: 6, height: 8, marginBottom: 10, overflow: "hidden" }}>
              <div style={{ background: squad.color, height: "100%", width: `${squad.progress}%`, borderRadius: 6 }} />
            </div>
            <div style={{ fontSize: 13, color: t.subtext, fontStyle: "italic", marginBottom: 8 }}>"{squad.spark}"</div>
            <div style={{ display: "flex", alignItems: "center" }}>
              {squad.members.slice(0, 4).map((m, mi) => (
                <div key={mi} style={{ width: 28, height: 28, borderRadius: "50%", background: [C.blue, C.coral, C.yellow, "#10B981"][mi % 4], border: `2px solid ${t.card}`, marginLeft: mi > 0 ? -8 : 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: mi === 2 ? C.charcoal : "#fff" }}>
                  {m[0]}
                </div>
              ))}
              <span style={{ fontSize: 12, color: t.subtext, marginLeft: 10 }}>{squad.members.join(", ")}</span>
            </div>
          </div>
        </div>
      ))}

      {/* Find Your Vibe — Overlapping Angled Cards */}
      <div style={{ padding: "4px 20px 16px" }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: t.text, marginBottom: 14 }}>Find Your Vibe</div>
        <div style={{ position: "relative", height: 170 }}>
          {[
            { label: "Mindfulness Masters", emoji: "🧘", color: "#7C3AED", members: "2/4", left: 38, top: 20, rot: 4, z: 1 },
            { label: "Creative Hustlers", emoji: "🎨", color: C.coral, members: "1/4", left: 18, top: 10, rot: -3, z: 2 },
            { label: "Habit Builders", emoji: "🏃", color: C.blue, members: "3/4", left: 0, top: 0, rot: -1, z: 3 },
          ].map((card, i) => (
            <div key={i} style={{ position: "absolute", left: card.left, top: card.top, width: 250, background: card.color, borderRadius: 18, padding: "14px 16px", transform: `rotate(${card.rot}deg)`, boxShadow: "0 4px 16px rgba(0,0,0,0.13)", zIndex: card.z, cursor: "pointer" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 26 }}>{card.emoji}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "#fff" }}>{card.label}</div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.8)" }}>{card.members} spots filled</div>
                </div>
                <div style={{ background: "rgba(255,255,255,0.25)", borderRadius: 10, padding: "6px 12px" }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>Join</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ height: 20 }} />
    </div>
  );
}

// ─── StudioScreen ─────────────────────────────────────────────────────────────

function StudioScreen({ theme: t, colors: C }) {
  const [mode, setMode] = useState("video");
  const [recording, setRecording] = useState(false);
  const [countdown, setCountdown] = useState(null);
  const [elapsed, setElapsed] = useState(0);

  const startRec = () => {
    let c = 3;
    setCountdown(c);
    const cd = setInterval(() => {
      c--;
      if (c <= 0) {
        clearInterval(cd);
        setCountdown(null);
        setRecording(true);
        setElapsed(0);
      } else {
        setCountdown(c);
      }
    }, 1000);
  };

  const stopRec = () => {
    setRecording(false);
    setElapsed(0);
  };

  useEffect(() => {
    if (!recording) return;
    const t = setInterval(() => setElapsed(e => e + 1), 1000);
    return () => clearInterval(t);
  }, [recording]);

  const fmt = (s) => `0:${String(s).padStart(2, "0")}`;

  return (
    <div style={{ height: "100%", overflowY: "auto", background: t.bg }}>
      <div style={{ padding: "14px 20px 10px" }}>
        <div style={{ fontSize: 22, fontWeight: 800, color: t.text }}>Create</div>
        <div style={{ fontSize: 14, color: t.subtext }}>Contribute to your active Spark</div>
      </div>

      {/* Active Spark badge */}
      <div style={{ padding: "0 20px 12px" }}>
        <div style={{ background: C.blueLight, borderRadius: 14, padding: "10px 14px", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 10, background: C.blue, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 16 }}>⚡</span>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.blue, letterSpacing: 0.5 }}>ACTIVE SPARK</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: t.text }}>Capture your ideal 30-second focus break</div>
          </div>
        </div>
      </div>

      {/* Viewfinder */}
      <div style={{ padding: "0 20px 14px" }}>
        <div style={{ background: "#0F172A", borderRadius: 24, height: 230, position: "relative", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
          {[33, 66].flatMap(p => [
            <div key={`h${p}`} style={{ position: "absolute", top: `${p}%`, left: 0, right: 0, height: 1, background: "rgba(255,255,255,0.08)" }} />,
            <div key={`v${p}`} style={{ position: "absolute", left: `${p}%`, top: 0, bottom: 0, width: 1, background: "rgba(255,255,255,0.08)" }} />,
          ])}

          {countdown !== null && (
            <div style={{ fontSize: 80, fontWeight: 800, color: C.yellow, zIndex: 10, textShadow: "0 0 30px rgba(255,210,51,0.5)" }}>{countdown}</div>
          )}

          {recording && (
            <div style={{ position: "absolute", top: 14, left: 14, display: "flex", alignItems: "center", gap: 6, background: "rgba(255,0,0,0.85)", borderRadius: 8, padding: "4px 10px" }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#fff" }} />
              <span style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>REC {fmt(elapsed)}</span>
            </div>
          )}

          {!recording && countdown === null && (
            <div style={{ textAlign: "center", zIndex: 1 }}>
              {React.createElement(window.lucide.User, { size: 56, color: "rgba(255,255,255,0.25)" })}
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginTop: 8 }}>Tap record to start</div>
            </div>
          )}

          {recording && (
            <div style={{ position: "absolute", bottom: 14, left: "50%", transform: "translateX(-50%)", background: "rgba(0,0,0,0.7)", borderRadius: 8, padding: "4px 12px" }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{fmt(elapsed)} / 0:30</span>
            </div>
          )}

          <div style={{ position: "absolute", top: 14, right: 14, background: "rgba(0,0,0,0.5)", borderRadius: 10, padding: 8 }}>
            {React.createElement(mode === "video" ? window.lucide.Video : mode === "photo" ? window.lucide.Camera : window.lucide.Mic, { size: 18, color: "#fff" })}
          </div>
        </div>
      </div>

      {/* Mode selector */}
      <div style={{ padding: "0 20px 18px", display: "flex", justifyContent: "center", gap: 8 }}>
        {[
          { id: "video", label: "Video", icon: window.lucide.Video },
          { id: "photo", label: "Photo", icon: window.lucide.Camera },
          { id: "audio", label: "Audio", icon: window.lucide.Mic },
        ].map(m => (
          <div key={m.id} onClick={() => setMode(m.id)} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 18px", borderRadius: 14, cursor: "pointer", background: mode === m.id ? C.blue : t.inputBg }}>
            {React.createElement(m.icon, { size: 15, color: mode === m.id ? "#fff" : t.subtext })}
            <span style={{ fontSize: 13, fontWeight: 600, color: mode === m.id ? "#fff" : t.subtext }}>{m.label}</span>
          </div>
        ))}
      </div>

      {/* Record button */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
        <div
          onClick={recording ? stopRec : (!countdown ? startRec : undefined)}
          style={{ width: 74, height: 74, borderRadius: "50%", background: recording ? "#EF4444" : C.coral, border: `5px solid ${recording ? "rgba(239,68,68,0.25)" : C.coral + "40"}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: `0 4px 24px ${recording ? "#EF444460" : C.coral + "60"}` }}
        >
          <div style={{ width: recording ? 22 : 32, height: recording ? 22 : 32, borderRadius: recording ? 5 : "50%", background: "#fff" }} />
        </div>
      </div>

      {/* Recent clips */}
      <div style={{ padding: "0 20px" }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: t.text, marginBottom: 10 }}>Recent Clips</div>
        <div style={{ display: "flex", gap: 10 }}>
          {[
            { color: C.blue, duration: "0:18", thumb: "🧘" },
            { color: "#10B981", duration: "0:25", thumb: "🌅" },
            { color: C.coral, duration: "0:12", thumb: "💡" },
          ].map((clip, i) => (
            <div key={i} style={{ width: 88, height: 88, borderRadius: 16, background: clip.color, position: "relative", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span style={{ fontSize: 32 }}>{clip.thumb}</span>
              <div style={{ position: "absolute", bottom: 6, right: 6, background: "rgba(0,0,0,0.6)", borderRadius: 6, padding: "2px 6px" }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: "#fff" }}>{clip.duration}</span>
              </div>
              <div style={{ position: "absolute", top: 6, right: 6 }}>
                {React.createElement(window.lucide.CheckCircle, { size: 15, color: "#fff" })}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ height: 20 }} />
    </div>
  );
}

// ─── ReelsScreen ──────────────────────────────────────────────────────────────

function ReelsScreen({ theme: t, colors: C }) {
  const [liked, setLiked] = useState({});
  const [playing, setPlaying] = useState(true);
  const [activeReelIdx, setActiveReelIdx] = useState(0);
  const reel = REELS_DATA[activeReelIdx];

  return (
    <div style={{ height: "100%", overflowY: "auto", background: t.bg }}>
      <div style={{ padding: "14px 20px 12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontSize: 22, fontWeight: 800, color: t.text }}>Spark Reels</div>
        {React.createElement(window.lucide.Sparkles, { size: 22, color: C.yellow })}
      </div>

      {/* Featured Reel */}
      <div style={{ padding: "0 20px 14px" }}>
        <div style={{ background: "#0F172A", borderRadius: 24, height: 270, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "1fr 1fr", gap: 2 }}>
            {[
              { color: C.blue, emoji: "🌅", name: "Alex" },
              { color: C.coral, emoji: "⚡", name: "Sam" },
              { color: C.yellow, emoji: "🧘", name: "Jordan" },
              { color: "#10B981", emoji: "💪", name: "Riley" },
            ].map((clip, i) => (
              <div key={i} style={{ background: clip.color + "55", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: 34 }}>{clip.emoji}</span>
                <span style={{ fontSize: 11, fontWeight: 600, color: "#fff", marginTop: 4 }}>{clip.name}</span>
              </div>
            ))}
          </div>

          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(transparent, rgba(0,0,0,0.75))", padding: "20px 16px 14px" }}>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#fff" }}>{reel.squadName}</div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.8)" }}>"{reel.spark}" · {reel.duration}</div>
          </div>

          <div onClick={() => setPlaying(!playing)} style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 54, height: 54, borderRadius: "50%", background: "rgba(255,255,255,0.9)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: "0 4px 20px rgba(0,0,0,0.35)", zIndex: 10 }}>
            {React.createElement(playing ? window.lucide.Pause : window.lucide.Play, { size: 22, color: C.charcoal })}
          </div>

          <div style={{ position: "absolute", top: 14, right: 14, background: C.yellow, borderRadius: 10, padding: "4px 10px" }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: C.charcoal }}>{reel.clips} clips</span>
          </div>
        </div>

        {/* Reel nav dots */}
        <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 10 }}>
          {REELS_DATA.map((_, i) => (
            <div key={i} onClick={() => setActiveReelIdx(i)} style={{ width: i === activeReelIdx ? 20 : 8, height: 8, borderRadius: 4, background: i === activeReelIdx ? C.blue : t.border, cursor: "pointer" }} />
          ))}
        </div>

        {/* Actions */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 12 }}>
          <div style={{ display: "flex", gap: 18 }}>
            <div onClick={() => setLiked(l => ({ ...l, [reel.id]: !l[reel.id] }))} style={{ display: "flex", alignItems: "center", gap: 5, cursor: "pointer" }}>
              {React.createElement(window.lucide.Heart, { size: 20, color: liked[reel.id] ? C.coral : t.subtext, fill: liked[reel.id] ? C.coral : "none" })}
              <span style={{ fontSize: 14, fontWeight: 600, color: t.subtext }}>{liked[reel.id] ? reel.likes + 1 : reel.likes}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              {React.createElement(window.lucide.Eye, { size: 20, color: t.subtext })}
              <span style={{ fontSize: 14, fontWeight: 600, color: t.subtext }}>{reel.views}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              {React.createElement(window.lucide.Share2, { size: 20, color: t.subtext })}
              <span style={{ fontSize: 14, fontWeight: 600, color: t.subtext }}>Share</span>
            </div>
          </div>
          <div style={{ background: C.blue, borderRadius: 12, padding: "7px 14px", cursor: "pointer" }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>Add Clip</span>
          </div>
        </div>
      </div>

      {/* More Reels */}
      <div style={{ padding: "0 20px 16px" }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: t.text, marginBottom: 12 }}>More Reels</div>
        {[
          { squad: "Focus Flow", spark: "30-sec focus break", likes: 189, color: C.coral, emoji: "⚡" },
          { squad: "Wellness Warriors", spark: "Stress relief technique", likes: 312, color: "#10B981", emoji: "💚" },
          { squad: "Creative Hustlers", spark: "Workspace transformation", likes: 97, color: C.yellow, emoji: "🎨" },
        ].map((item, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: i < 2 ? `1px solid ${t.border}` : "none", cursor: "pointer" }}>
            <div style={{ width: 62, height: 62, borderRadius: 16, background: item.color + "33", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, flexShrink: 0 }}>
              {item.emoji}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: t.text }}>{item.squad}</div>
              <div style={{ fontSize: 12, color: t.subtext }}>"{item.spark}"</div>
              <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 4 }}>
                {React.createElement(window.lucide.Heart, { size: 13, color: C.coral, fill: C.coral })}
                <span style={{ fontSize: 12, color: t.subtext }}>{item.likes}</span>
              </div>
            </div>
            {React.createElement(window.lucide.Play, { size: 20, color: t.subtext })}
          </div>
        ))}
      </div>
      <div style={{ height: 20 }} />
    </div>
  );
}

// ─── ProfileScreen ────────────────────────────────────────────────────────────

function ProfileScreen({ theme: t, colors: C, setTheme, currentTheme }) {
  const [darkMode, setDarkMode] = useState(currentTheme === "dark");
  const [activePath, setActivePath] = useState(null);

  const toggleTheme = () => {
    const next = !darkMode;
    setDarkMode(next);
    setTheme(next ? "dark" : "light");
  };

  const paths = [
    { title: "Mindfulness at Work", emoji: "🧘", total: 12, done: 7, color: "#7C3AED" },
    { title: "Creative Habit Building", emoji: "🎨", total: 8, done: 3, color: C.coral },
    { title: "Deep Focus Mastery", emoji: "⚡", total: 10, done: 10, color: C.blue },
  ];

  return (
    <div style={{ height: "100%", overflowY: "auto", background: t.bg }}>
      {/* Profile header */}
      <div style={{ padding: "14px 20px 10px", textAlign: "center" }}>
        <div style={{ width: 78, height: 78, borderRadius: "50%", background: `linear-gradient(135deg, ${C.blue} 0%, ${C.coral} 100%)`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 10px", fontSize: 34 }}>
          😊
        </div>
        <div style={{ fontSize: 20, fontWeight: 800, color: t.text }}>Alex Rivera</div>
        <div style={{ fontSize: 13, color: t.subtext, marginTop: 2 }}>@alexrivera · Member since Jan 2025</div>
        <div style={{ display: "flex", justifyContent: "center", marginTop: 14 }}>
          {[
            { label: "Sparks", value: "47" },
            { label: "Squads", value: "3" },
            { label: "Streak", value: "14🔥" },
          ].map((s, i) => (
            <div key={i} style={{ padding: "0 20px", borderRight: i < 2 ? `1px solid ${t.border}` : "none", textAlign: "center" }}>
              <div style={{ fontSize: 20, fontWeight: 800, color: t.text }}>{s.value}</div>
              <div style={{ fontSize: 12, color: t.subtext }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements strip */}
      <div style={{ padding: "6px 20px 14px" }}>
        <div style={{ display: "flex", gap: 8 }}>
          {[
            { emoji: "🏆", label: "Top Creator" },
            { emoji: "⚡", label: "Spark Streak" },
            { emoji: "👥", label: "Squad Leader" },
            { emoji: "🌟", label: "Trendsetter" },
          ].map((a, i) => (
            <div key={i} style={{ flex: 1, background: t.card, borderRadius: 14, padding: "8px 4px", textAlign: "center", border: `1px solid ${t.border}` }}>
              <div style={{ fontSize: 20 }}>{a.emoji}</div>
              <div style={{ fontSize: 10, fontWeight: 600, color: t.subtext, marginTop: 3 }}>{a.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Discovery Paths */}
      <div style={{ padding: "0 20px 14px" }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: t.text, marginBottom: 12 }}>Discovery Paths</div>
        {paths.map((path, i) => (
          <div key={i} onClick={() => setActivePath(activePath === i ? null : i)} style={{ background: t.card, borderRadius: 18, padding: 14, marginBottom: 10, boxShadow: "0 2px 10px rgba(0,0,0,0.05)", border: `1px solid ${t.border}`, cursor: "pointer" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 44, height: 44, borderRadius: 16, background: path.color + "22", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>
                {path.emoji}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: t.text }}>{path.title}</div>
                <div style={{ fontSize: 12, color: t.subtext, marginBottom: 6 }}>{path.done}/{path.total} completed</div>
                <div style={{ background: t.border, borderRadius: 4, height: 6, overflow: "hidden" }}>
                  <div style={{ background: path.color, height: "100%", width: `${(path.done / path.total) * 100}%`, borderRadius: 4 }} />
                </div>
              </div>
              <div style={{ background: path.done === path.total ? path.color : t.inputBg, borderRadius: 10, padding: "7px 10px" }}>
                {path.done === path.total
                  ? React.createElement(window.lucide.CheckCircle, { size: 16, color: "#fff" })
                  : React.createElement(window.lucide.ChevronRight, { size: 16, color: t.subtext })}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Settings */}
      <div style={{ padding: "0 20px 16px" }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: t.text, marginBottom: 12 }}>Settings</div>
        <div style={{ background: t.card, borderRadius: 18, overflow: "hidden", border: `1px solid ${t.border}` }}>
          {/* Dark Mode */}
          <div style={{ padding: "14px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: `1px solid ${t.border}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {React.createElement(darkMode ? window.lucide.Moon : window.lucide.Sun, { size: 20, color: t.subtext })}
              <span style={{ fontSize: 14, fontWeight: 600, color: t.text }}>Dark Mode</span>
            </div>
            <div onClick={toggleTheme} style={{ width: 50, height: 28, borderRadius: 14, background: darkMode ? C.blue : t.border, position: "relative", cursor: "pointer" }}>
              <div style={{ position: "absolute", top: 3, left: darkMode ? 24 : 3, width: 22, height: 22, borderRadius: "50%", background: "#fff", boxShadow: "0 2px 4px rgba(0,0,0,0.2)", transition: "left 0.25s" }} />
            </div>
          </div>
          {[
            { icon: window.lucide.Bell, label: "Notifications" },
            { icon: window.lucide.Shield, label: "Privacy" },
            { icon: window.lucide.Info, label: "Help & Support" },
          ].map((item, i) => (
            <div key={i} style={{ padding: "14px 16px", display: "flex", alignItems: "center", gap: 10, borderBottom: i < 2 ? `1px solid ${t.border}` : "none", cursor: "pointer" }}>
              {React.createElement(item.icon, { size: 20, color: t.subtext })}
              <span style={{ fontSize: 14, fontWeight: 600, color: t.text, flex: 1 }}>{item.label}</span>
              {React.createElement(window.lucide.ChevronRight, { size: 16, color: t.subtext })}
            </div>
          ))}
        </div>
      </div>
      <div style={{ height: 20 }} />
    </div>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [theme, setTheme] = useState("light");

  const themes = {
    light: {
      bg: "#FFF9F0",
      card: "#FFFFFF",
      text: "#2E2B28",
      subtext: "#8A7E75",
      border: "#F0E8DF",
      navBg: "#FFFFFF",
      inputBg: "#F5EEE6",
    },
    dark: {
      bg: "#1A1815",
      card: "#252018",
      text: "#F5EFE8",
      subtext: "#A09080",
      border: "#352E26",
      navBg: "#1F1B16",
      inputBg: "#2C2620",
    },
  };

  const C = {
    blue: "#2563EB",
    coral: "#FF5A45",
    yellow: "#FFD233",
    charcoal: "#2E2B28",
    blueLight: "#DBEAFE",
    coralLight: "#FFE8E5",
    yellowLight: "#FFF9DB",
  };

  const t = themes[theme];

  const tabs = [
    { id: "home", label: "Home", icon: window.lucide.Home },
    { id: "squads", label: "Squads", icon: window.lucide.Users },
    { id: "studio", label: "Create", icon: window.lucide.Plus },
    { id: "reels", label: "Reels", icon: window.lucide.Play },
    { id: "profile", label: "Me", icon: window.lucide.User },
  ];

  const screens = {
    home: HomeScreen,
    squads: SquadsScreen,
    studio: StudioScreen,
    reels: ReelsScreen,
    profile: ProfileScreen,
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f0f0f0", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: '"Baloo 2", cursive' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;500;600;700;800&display=swap'); * { box-sizing: border-box; margin: 0; padding: 0; } ::-webkit-scrollbar { display: none; } html { scroll-behavior: smooth; }`}</style>

      {/* Phone frame */}
      <div style={{ width: 375, height: 812, background: t.bg, borderRadius: 50, overflow: "hidden", position: "relative", boxShadow: "0 40px 80px rgba(0,0,0,0.3), 0 0 0 1px rgba(0,0,0,0.08)", display: "flex", flexDirection: "column", fontFamily: '"Baloo 2", cursive' }}>
        {/* Dynamic Island */}
        <div style={{ position: "absolute", top: 12, left: "50%", transform: "translateX(-50%)", width: 126, height: 37, background: "#000", borderRadius: 20, zIndex: 100 }} />

        {/* Status bar */}
        <div style={{ padding: "52px 24px 6px", display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0 }}>
          <span style={{ fontSize: 15, fontWeight: 700, color: t.text }}>9:41</span>
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            {React.createElement(window.lucide.Wifi, { size: 15, color: t.text })}
            {React.createElement(window.lucide.Battery, { size: 15, color: t.text })}
          </div>
        </div>

        {/* Screen content */}
        <div style={{ flex: 1, overflow: "hidden" }}>
          {React.createElement(screens[activeTab], { theme: t, colors: C, setTheme, currentTheme: theme })}
        </div>

        {/* Bottom Nav */}
        <div style={{ background: t.navBg, borderTop: `1px solid ${t.border}`, paddingBottom: 22, paddingTop: 4, flexShrink: 0, display: "flex", justifyContent: "space-around", alignItems: "flex-end" }}>
          {tabs.map(tab => {
            const isActive = activeTab === tab.id;
            const isCreate = tab.id === "studio";
            const navItemStyle = {
              display: "flex", flexDirection: "column", alignItems: "center", gap: isCreate ? 0 : 3,
              cursor: "pointer",
              ...(isCreate
                ? { width: 54, height: 54, borderRadius: "50%", background: C.coral, justifyContent: "center", marginBottom: 14, boxShadow: `0 6px 22px ${C.coral}55` }
                : { padding: "6px 10px" }),
            };
            const labelStyle = {
              fontSize: 10, fontWeight: isActive ? 700 : 500,
              color: isActive ? C.blue : t.subtext,
            };
            return React.createElement(
              "div",
              { key: tab.id, onClick: () => setActiveTab(tab.id), style: navItemStyle },
              React.createElement(tab.icon, { size: isCreate ? 24 : 22, color: isCreate ? "#fff" : isActive ? C.blue : t.subtext }),
              !isCreate && React.createElement("span", { style: labelStyle }, tab.label)
            );
          })}
        </div>
      </div>
    </div>
  );
}
