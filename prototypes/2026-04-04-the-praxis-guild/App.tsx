const { useState, useEffect, useRef } = React;

// ─── FONT INJECTION ───────────────────────────────────────────────────────────
(() => {
  if (document.getElementById('praxis-font')) return;
  const s = document.createElement('style');
  s.id = 'praxis-font';
  s.textContent = "@import url('https://fonts.googleapis.com/css2?family=Bitter:ital,wght@0,300;0,400;0,600;0,700;1,400;1,600&display=swap');";
  document.head.appendChild(s);
})();

// ─── THEMES ───────────────────────────────────────────────────────────────────
const themes = {
  dark: {
    bg: '#0D1810',
    surface: '#142016',
    surfaceAlt: '#1A2A1C',
    border: '#223026',
    borderStrong: '#364A3A',
    text: '#F0E8D0',
    textMuted: '#98907A',
    textFaint: '#585650',
    accent: '#C4622D',
    accentDim: 'rgba(196,98,45,0.15)',
    green: '#2A5638',
    greenMid: '#386848',
    greenBright: '#4E9260',
    liveGreen: '#4CAF50',
    liveGreenDim: 'rgba(76,175,80,0.25)',
  },
  light: {
    bg: '#F0E8D0',
    surface: '#E8DEC0',
    surfaceAlt: '#DFCFAC',
    border: '#C0B090',
    borderStrong: '#9A8A6A',
    text: '#181E16',
    textMuted: '#504840',
    textFaint: '#888070',
    accent: '#C4622D',
    accentDim: 'rgba(196,98,45,0.12)',
    green: '#2A5638',
    greenMid: '#386848',
    greenBright: '#4E9260',
    liveGreen: '#3A8A3A',
    liveGreenDim: 'rgba(58,138,58,0.2)',
  },
};

// ─── MOCK DATA ─────────────────────────────────────────────────────────────────
const guildData = [
  {
    id: 1, name: "The Writer's Collective", tag: "WRITING",
    members: 847, activeNow: 23, nextSession: "2:00 PM", duration: "60 min",
    accent: "#C4622D", joined: true,
    desc: "Daily writing sprints for novelists, poets, and essayists united by craft.",
  },
  {
    id: 2, name: "Deep Focus Engineers", tag: "CODE",
    members: 1204, activeNow: 45, nextSession: "3:30 PM", duration: "90 min",
    accent: "#2A5638", joined: false,
    desc: "Flow state sessions for builders, thinkers, and makers who ship.",
  },
  {
    id: 3, name: "Study Sanctuary", tag: "ACADEMIC",
    members: 2341, activeNow: 67, nextSession: "LIVE NOW", duration: "45 min",
    accent: "#5A4428", joined: true,
    desc: "Collective deep study for students and lifelong learners.",
  },
  {
    id: 4, name: "The Maker's Circle", tag: "ART",
    members: 534, activeNow: 12, nextSession: "5:00 PM", duration: "120 min",
    accent: "#3A5A70", joined: false,
    desc: "Artists and craftspeople in silent, focused creation.",
  },
  {
    id: 5, name: "Morning Pages Guild", tag: "WELLNESS",
    members: 689, activeNow: 8, nextSession: "6:00 AM", duration: "30 min",
    accent: "#5A3A28", joined: false,
    desc: "Sunrise rituals for journaling, gratitude, and mindful reflection.",
  },
];

const reflections = [
  {
    date: "Apr 4 · 9:14 AM", guild: "Morning Pages Guild", duration: "60 min", mood: "Focused",
    intention: "Write 3 pages of freeform thoughts, no editing.",
    reflection: "Wrote 800 words on chapter 3. The opening scene finally clicked — found the voice I'd been searching for.",
  },
  {
    date: "Apr 3 · 2:00 PM", guild: "The Writer's Collective", duration: "90 min", mood: "Breakthrough",
    intention: "Draft the confrontation scene between Lyra and the Architect.",
    reflection: "Struggled at first but found flow after 15 minutes. 1,200 words written. Strong finish.",
  },
  {
    date: "Apr 1 · 3:30 PM", guild: "The Writer's Collective", duration: "60 min", mood: "Steady",
    intention: "Edit chapter 2 opening and tighten the prose.",
    reflection: "Tightened 300 words, found cleaner transitions. Productive, if quiet.",
  },
];

const weekDays = ["M", "T", "W", "T", "F", "S", "S"];
const weekHours = [3.5, 2, 4.5, 1.5, 5, 0, 2];
const presenceOpacities = [0.65, 0.8, 0.7, 0.9, 0.6, 0.75, 0.85, 0.7];

const presenceMembers = [
  { initials: "MV", color: "#C4622D" },
  { initials: "JK", color: "#2A5638" },
  { initials: "SR", color: "#5A4428" },
  { initials: "LP", color: "#3A5A70" },
  { initials: "AH", color: "#6A4040" },
  { initials: "TC", color: "#4A6A2A" },
  { initials: "BW", color: "#5A3A5A" },
  { initials: "NM", color: "#3A4A6A" },
];

// ─── SHARED COMPONENTS ────────────────────────────────────────────────────────
function Icon({ name, size = 20, color, strokeWidth = 1.8 }) {
  const C = window.lucide && window.lucide[name];
  if (!C) return null;
  return React.createElement(C, { size, color, strokeWidth });
}

function SectionLabel({ children, theme, style = {} }) {
  return (
    <span style={{
      fontFamily: "'Bitter', serif",
      fontSize: 10,
      fontWeight: 700,
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      color: theme.textFaint,
      ...style,
    }}>
      {children}
    </span>
  );
}

function BottomNav({ active, onNav, theme }) {
  const tabs = [
    { id: 'home', label: 'Hall', icon: 'Home' },
    { id: 'sanctuaries', label: 'Sanctuaries', icon: 'Compass' },
    { id: 'session', label: 'Ritual', icon: 'Flame' },
    { id: 'altar', label: 'Altar', icon: 'Mountain' },
  ];
  return (
    <div style={{
      display: 'flex',
      background: theme.surface,
      borderTop: `1px solid ${theme.border}`,
      flexShrink: 0,
    }}>
      {tabs.map(t => {
        const isActive = active === t.id;
        return (
          <button
            key={t.id}
            onClick={() => onNav(t.id)}
            style={{
              flex: 1, background: 'none', border: 'none', cursor: 'pointer',
              padding: '10px 0 14px',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
              color: isActive ? theme.accent : theme.textFaint,
              transition: 'color 0.15s',
            }}
          >
            <Icon name={t.icon} size={19} color={isActive ? theme.accent : theme.textFaint} strokeWidth={isActive ? 2.2 : 1.6} />
            <span style={{
              fontFamily: "'Bitter', serif", fontSize: 10,
              fontWeight: isActive ? 700 : 400,
              letterSpacing: '0.06em',
            }}>
              {t.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

// ─── HOME SCREEN ──────────────────────────────────────────────────────────────
function HomeScreen({ theme, isDark, setIsDark, setActiveScreen }) {
  const [pressed, setPressed] = useState(null);

  const timeline = [
    { time: "9:00 AM", guild: "Morning Pages", status: "done", duration: "30 min" },
    { time: "12:00 PM", guild: "The Writer's Collective", status: "done", duration: "60 min" },
    { time: "NOW", guild: "Study Sanctuary", status: "live", duration: "45 min" },
    { time: "3:30 PM", guild: "Deep Focus Engineers", status: "upcoming", duration: "90 min" },
    { time: "5:00 PM", guild: "The Maker's Circle", status: "upcoming", duration: "120 min" },
  ];

  return (
    <div style={{ height: '100%', overflowY: 'auto', background: theme.bg }}>
      {/* ── Header ── */}
      <div style={{ padding: '22px 20px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{
            fontFamily: "'Bitter', serif", fontSize: 10, fontWeight: 700,
            letterSpacing: '0.18em', color: theme.accent, textTransform: 'uppercase', marginBottom: 5,
          }}>
            The Praxis Guild
          </div>
          <div style={{ fontFamily: "'Bitter', serif", fontSize: 26, fontWeight: 700, color: theme.text, lineHeight: 1.1 }}>
            Guild Hall
          </div>
          <div style={{ fontFamily: "'Bitter', serif", fontSize: 12, color: theme.textMuted, marginTop: 3, fontStyle: 'italic' }}>
            Friday, April 4 · Good morning, Mara
          </div>
        </div>
        <button
          onClick={() => setIsDark(!isDark)}
          style={{
            background: theme.surface, border: `1px solid ${theme.border}`,
            borderRadius: 20, padding: '6px 12px', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 6, marginTop: 4,
          }}
        >
          <Icon name={isDark ? 'Sun' : 'Moon'} size={13} color={theme.textMuted} />
          <span style={{ fontFamily: "'Bitter', serif", fontSize: 10, color: theme.textMuted }}>
            {isDark ? 'Light' : 'Dark'}
          </span>
        </button>
      </div>

      {/* ── Live Session Hero — Asymmetric ── */}
      <div style={{ margin: '18px 20px 0', background: theme.green, borderRadius: 3, overflow: 'hidden', position: 'relative' }}>
        {/* Ghost number — asymmetric editorial element */}
        <div style={{
          position: 'absolute', right: -8, bottom: -20,
          fontFamily: "'Bitter', serif", fontSize: 130, fontWeight: 700,
          color: 'rgba(240,232,208,0.06)', lineHeight: 1, userSelect: 'none', pointerEvents: 'none',
        }}>
          67
        </div>
        <div style={{ padding: '18px 18px 16px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div style={{ flex: 1, zIndex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 10 }}>
              <div style={{
                width: 8, height: 8, borderRadius: '50%',
                background: theme.liveGreen,
                boxShadow: `0 0 0 3px ${theme.liveGreenDim}`,
              }} />
              <span style={{
                fontFamily: "'Bitter', serif", fontSize: 10, fontWeight: 700,
                letterSpacing: '0.14em', color: 'rgba(240,232,208,0.6)', textTransform: 'uppercase',
              }}>
                Live Now
              </span>
            </div>
            <div style={{ fontFamily: "'Bitter', serif", fontSize: 20, fontWeight: 700, color: '#F0E8D0', lineHeight: 1.15 }}>
              Study Sanctuary
            </div>
            <div style={{ fontFamily: "'Bitter', serif", fontSize: 12, color: 'rgba(240,232,208,0.55)', marginTop: 5, lineHeight: 1.5 }}>
              45 min · 67 members present
            </div>
            <button
              onClick={() => setActiveScreen('session')}
              onMouseDown={() => setPressed('join')}
              onMouseUp={() => setPressed(null)}
              style={{
                marginTop: 14,
                background: pressed === 'join' ? '#A04A1D' : theme.accent,
                border: 'none', borderRadius: 2,
                padding: '8px 16px', cursor: 'pointer',
                fontFamily: "'Bitter', serif", fontSize: 11, fontWeight: 700,
                letterSpacing: '0.1em', textTransform: 'uppercase', color: '#F0E8D0',
                transition: 'background 0.1s',
              }}
            >
              <span>Join Ritual</span>
              <span style={{ marginLeft: 6 }}>→</span>
            </button>
          </div>
          {/* Asymmetric large stat */}
          <div style={{ textAlign: 'right', paddingLeft: 12, zIndex: 1, alignSelf: 'flex-end' }}>
            <div style={{ fontFamily: "'Bitter', serif", fontSize: 48, fontWeight: 700, color: 'rgba(240,232,208,0.18)', lineHeight: 1 }}>
              67
            </div>
            <div style={{ fontFamily: "'Bitter', serif", fontSize: 9, color: 'rgba(240,232,208,0.35)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              present
            </div>
          </div>
        </div>
      </div>

      {/* ── Your Guilds ── */}
      <div style={{ padding: '22px 20px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 13 }}>
          <SectionLabel theme={theme}>Your Guilds</SectionLabel>
          <button
            onClick={() => setActiveScreen('sanctuaries')}
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Bitter', serif", fontSize: 11, color: theme.accent }}
          >
            Explore →
          </button>
        </div>
        {guildData.filter(g => g.joined).map(guild => (
          <div
            key={guild.id}
            style={{
              background: theme.surface,
              border: `1px solid ${theme.border}`,
              borderLeft: `3px solid ${guild.accent}`,
              borderRadius: 2, padding: '12px 14px',
              marginBottom: 8,
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}
          >
            <div>
              <div style={{ fontFamily: "'Bitter', serif", fontSize: 14, fontWeight: 600, color: theme.text }}>{guild.name}</div>
              <div style={{ fontFamily: "'Bitter', serif", fontSize: 11, color: theme.textMuted, marginTop: 3 }}>
                Next: {guild.nextSession} · {guild.duration}
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontFamily: "'Bitter', serif", fontSize: 22, fontWeight: 700, color: guild.accent, lineHeight: 1 }}>{guild.activeNow}</div>
              <div style={{ fontFamily: "'Bitter', serif", fontSize: 9, color: theme.textFaint, letterSpacing: '0.08em', textTransform: 'uppercase' }}>active</div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Today's Timeline ── */}
      <div style={{ padding: '20px 20px 0' }}>
        <SectionLabel theme={theme} style={{ display: 'block', marginBottom: 14 }}>Today's Rituals</SectionLabel>
        {timeline.map((s, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 0 }}>
            <div style={{ width: 50, textAlign: 'right', flexShrink: 0, paddingTop: 2 }}>
              <span style={{ fontFamily: "'Bitter', serif", fontSize: 10, color: s.status === 'live' ? theme.liveGreen : theme.textFaint }}>
                {s.time}
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
              <div style={{
                width: 9, height: 9, borderRadius: '50%', flexShrink: 0, marginTop: 3,
                background: s.status === 'done' ? theme.border : s.status === 'live' ? theme.liveGreen : theme.accent,
                boxShadow: s.status === 'live' ? `0 0 0 3px ${theme.liveGreenDim}` : 'none',
              }} />
              {i < timeline.length - 1 && (
                <div style={{ width: 1, height: 26, background: theme.border, flexShrink: 0, marginTop: 2 }} />
              )}
            </div>
            <div style={{ flex: 1, paddingBottom: i < timeline.length - 1 ? 0 : 0, paddingTop: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', paddingBottom: 8 }}>
                <span style={{
                  fontFamily: "'Bitter', serif", fontSize: 13,
                  fontWeight: s.status === 'live' ? 700 : s.status === 'upcoming' ? 600 : 400,
                  color: s.status === 'done' ? theme.textFaint : s.status === 'live' ? theme.text : theme.text,
                  fontStyle: s.status === 'done' ? 'italic' : 'normal',
                }}>
                  {s.guild}
                </span>
                <span style={{ fontFamily: "'Bitter', serif", fontSize: 10, color: theme.textFaint, marginLeft: 8, flexShrink: 0 }}>{s.duration}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Streak Banner ── */}
      <div style={{
        margin: '20px 20px 28px',
        background: theme.accentDim,
        border: `1px solid ${theme.accent}`,
        borderRadius: 2, padding: '14px 16px',
        display: 'flex', alignItems: 'center', gap: 14,
      }}>
        <div style={{ fontFamily: "'Bitter', serif", fontSize: 38, fontWeight: 700, color: theme.accent, lineHeight: 1 }}>14</div>
        <div>
          <div style={{ fontFamily: "'Bitter', serif", fontSize: 13, fontWeight: 600, color: theme.text }}>Day Streak</div>
          <div style={{ fontFamily: "'Bitter', serif", fontSize: 11, color: theme.textMuted, marginTop: 2 }}>89 sessions · 127 hours total</div>
        </div>
        <div style={{ marginLeft: 'auto' }}>
          <Icon name="Flame" size={24} color={theme.accent} />
        </div>
      </div>
    </div>
  );
}

// ─── SANCTUARIES SCREEN ───────────────────────────────────────────────────────
function SanctuariesScreen({ theme, isDark, setIsDark, setActiveScreen }) {
  const [filter, setFilter] = useState('ALL');
  const [joinedIds, setJoinedIds] = useState([1, 3]);
  const tags = ['ALL', 'WRITING', 'CODE', 'ACADEMIC', 'ART', 'WELLNESS'];
  const filtered = filter === 'ALL' ? guildData : guildData.filter(g => g.tag === filter);
  const totalActive = guildData.reduce((a, g) => a + g.activeNow, 0);

  return (
    <div style={{ height: '100%', overflowY: 'auto', background: theme.bg }}>
      {/* ── Asymmetric Hero Header ── */}
      <div style={{ position: 'relative', overflow: 'hidden', background: theme.green, minHeight: 155, padding: '22px 20px 20px' }}>
        {/* Ghost editorial letterform */}
        <div style={{
          position: 'absolute', right: -15, top: -25,
          fontFamily: "'Bitter', serif", fontSize: 160, fontWeight: 700,
          color: 'rgba(240,232,208,0.04)', lineHeight: 1,
          userSelect: 'none', pointerEvents: 'none',
        }}>
          G
        </div>
        <div style={{ fontFamily: "'Bitter', serif", fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', color: 'rgba(240,232,208,0.45)', textTransform: 'uppercase', marginBottom: 8 }}>
          Explore
        </div>
        <div style={{ fontFamily: "'Bitter', serif", fontSize: 30, fontWeight: 700, color: '#F0E8D0', lineHeight: 1.1, maxWidth: '72%' }}>
          Find Your<br />Sanctuary
        </div>
        <div style={{ fontFamily: "'Bitter', serif", fontSize: 12, color: 'rgba(240,232,208,0.5)', marginTop: 10, fontStyle: 'italic' }}>
          {totalActive} guild members in session now
        </div>
      </div>

      {/* ── Filter Tags ── */}
      <div style={{
        padding: '14px 20px 12px', display: 'flex', gap: 7,
        overflowX: 'auto', scrollbarWidth: 'none',
        borderBottom: `1px solid ${theme.border}`,
      }}>
        {tags.map(tag => {
          const active = filter === tag;
          return (
            <button
              key={tag}
              onClick={() => setFilter(tag)}
              style={{
                background: active ? theme.accent : theme.surface,
                border: `1px solid ${active ? theme.accent : theme.border}`,
                borderRadius: 2, padding: '5px 12px', cursor: 'pointer',
                fontFamily: "'Bitter', serif", fontSize: 10, fontWeight: 700,
                letterSpacing: '0.1em', color: active ? '#F0E8D0' : theme.textMuted,
                whiteSpace: 'nowrap', transition: 'all 0.15s', flexShrink: 0,
              }}
            >
              {tag}
            </button>
          );
        })}
      </div>

      {/* ── Guild List ── */}
      <div style={{ padding: '14px 20px 28px' }}>
        {filtered.map(guild => {
          const isJoined = joinedIds.includes(guild.id);
          const isLive = guild.nextSession === 'LIVE NOW';
          return (
            <div
              key={guild.id}
              style={{
                background: theme.surface,
                border: `1px solid ${theme.border}`,
                borderRadius: 3, marginBottom: 10, overflow: 'hidden',
              }}
            >
              <div style={{ height: 4, background: guild.accent }} />
              <div style={{ padding: '14px 14px 13px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                  <div style={{ flex: 1, paddingRight: 10 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 4 }}>
                      {isLive && (
                        <div style={{
                          width: 7, height: 7, borderRadius: '50%',
                          background: theme.liveGreen,
                          boxShadow: `0 0 0 2px ${theme.liveGreenDim}`,
                          flexShrink: 0,
                        }} />
                      )}
                      <div style={{ fontFamily: "'Bitter', serif", fontSize: 15, fontWeight: 700, color: theme.text }}>
                        {guild.name}
                      </div>
                    </div>
                    <div style={{ fontFamily: "'Bitter', serif", fontSize: 11, color: theme.textMuted, lineHeight: 1.5 }}>
                      {guild.desc}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <div style={{ fontFamily: "'Bitter', serif", fontSize: 15, fontWeight: 600, color: theme.textMuted }}>
                      {guild.members.toLocaleString()}
                    </div>
                    <div style={{ fontFamily: "'Bitter', serif", fontSize: 9, color: theme.textFaint, letterSpacing: '0.08em', textTransform: 'uppercase' }}>members</div>
                  </div>
                </div>
                <div style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  paddingTop: 10, borderTop: `1px solid ${theme.border}`,
                }}>
                  <div>
                    <span style={{
                      fontFamily: "'Bitter', serif", fontSize: 12,
                      color: isLive ? theme.liveGreen : theme.accent, fontWeight: 600,
                    }}>
                      {guild.nextSession}
                    </span>
                    <span style={{ fontFamily: "'Bitter', serif", fontSize: 11, color: theme.textFaint }}>
                      {' '}· {guild.duration} · {guild.activeNow} present
                    </span>
                  </div>
                  <button
                    onClick={() =>
                      setJoinedIds(ids =>
                        isJoined ? ids.filter(id => id !== guild.id) : [...ids, guild.id]
                      )
                    }
                    style={{
                      background: isJoined ? 'transparent' : theme.accent,
                      border: `1px solid ${isJoined ? theme.border : theme.accent}`,
                      borderRadius: 2, padding: '5px 13px', cursor: 'pointer',
                      fontFamily: "'Bitter', serif", fontSize: 10, fontWeight: 700,
                      letterSpacing: '0.08em', textTransform: 'uppercase',
                      color: isJoined ? theme.textMuted : '#F0E8D0',
                      transition: 'all 0.15s',
                    }}
                  >
                    {isJoined ? 'Joined ✓' : 'Join'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── SESSION SCREEN ───────────────────────────────────────────────────────────
function SessionScreen({ theme, isDark, setIsDark, setActiveScreen }) {
  const [phase, setPhase] = useState('intention');
  const [intention, setIntention] = useState('');
  const [reflection, setReflection] = useState('');
  const [selectedMood, setSelectedMood] = useState(null);
  const [timeLeft, setTimeLeft] = useState(45 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (phase === 'active' && isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(t => {
          if (t <= 1) {
            clearInterval(intervalRef.current);
            setPhase('reflection');
            setIsRunning(false);
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [phase, isRunning]);

  const fmt = secs => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const totalSecs = 45 * 60;
  const progress = 1 - timeLeft / totalSecs;

  const resetSession = () => {
    setPhase('intention');
    setTimeLeft(45 * 60);
    setIntention('');
    setReflection('');
    setSelectedMood(null);
    setIsRunning(false);
  };

  // ── Intention Phase ──
  if (phase === 'intention') {
    return (
      <div style={{ height: '100%', overflowY: 'auto', background: theme.bg }}>
        <div style={{ padding: '24px 24px 40px' }}>
          <div style={{
            fontFamily: "'Bitter', serif", fontSize: 10, fontWeight: 700,
            letterSpacing: '0.18em', color: theme.accent, textTransform: 'uppercase', marginBottom: 8,
          }}>
            Ritual Begins
          </div>
          <div style={{ fontFamily: "'Bitter', serif", fontSize: 28, fontWeight: 700, color: theme.text, lineHeight: 1.15, marginBottom: 6 }}>
            Set Your<br />Intention
          </div>
          <div style={{ fontFamily: "'Bitter', serif", fontSize: 12, color: theme.textMuted, marginBottom: 24, lineHeight: 1.7, fontStyle: 'italic' }}>
            Before you enter the sanctuary, declare what you will accomplish. Your guild awaits.
          </div>

          <div style={{
            background: theme.surface,
            border: `1px solid ${theme.border}`,
            borderLeft: `3px solid ${theme.greenMid}`,
            borderRadius: 2, padding: '12px 14px', marginBottom: 22,
          }}>
            <div style={{ fontFamily: "'Bitter', serif", fontSize: 13, fontWeight: 700, color: theme.text }}>Study Sanctuary</div>
            <div style={{ fontFamily: "'Bitter', serif", fontSize: 11, color: theme.textMuted, marginTop: 3 }}>45 min · 67 members present</div>
          </div>

          <div style={{ marginBottom: 22 }}>
            <SectionLabel theme={theme} style={{ display: 'block', marginBottom: 9 }}>Your Intention</SectionLabel>
            <textarea
              value={intention}
              onChange={e => setIntention(e.target.value)}
              placeholder="I will complete the introduction draft and outline my three main arguments, no editing allowed..."
              style={{
                width: '100%', minHeight: 120, background: theme.surface,
                border: `1px solid ${intention.trim() ? theme.borderStrong : theme.border}`,
                borderRadius: 2, padding: '12px',
                fontFamily: "'Bitter', serif", fontSize: 13, color: theme.text,
                resize: 'none', outline: 'none', lineHeight: 1.65,
                boxSizing: 'border-box', transition: 'border-color 0.2s',
              }}
            />
          </div>

          <div style={{
            background: theme.surfaceAlt,
            border: `1px solid ${theme.border}`,
            borderRadius: 2, padding: '16px', marginBottom: 26,
          }}>
            <div style={{
              fontFamily: "'Bitter', serif", fontSize: 12, fontStyle: 'italic',
              color: theme.textMuted, lineHeight: 1.8, textAlign: 'center',
            }}>
              "I enter this sanctuary with clear purpose.<br />
              I commit to focused, uninterrupted work.<br />
              I show up — for myself, and for my guild."
            </div>
          </div>

          <button
            onClick={() => { setPhase('active'); setIsRunning(true); }}
            disabled={!intention.trim()}
            style={{
              width: '100%',
              background: intention.trim() ? theme.accent : theme.border,
              border: 'none', borderRadius: 2, padding: '15px',
              cursor: intention.trim() ? 'pointer' : 'default',
              fontFamily: "'Bitter', serif", fontSize: 13, fontWeight: 700,
              letterSpacing: '0.1em', textTransform: 'uppercase', color: '#F0E8D0',
              transition: 'background 0.2s',
            }}
          >
            Enter the Sanctuary →
          </button>
        </div>
      </div>
    );
  }

  // ── Active Phase ──
  if (phase === 'active') {
    return (
      <div style={{
        height: '100%', background: theme.bg,
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', position: 'relative',
      }}>
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          padding: '18px 20px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <div>
            <div style={{ fontFamily: "'Bitter', serif", fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', color: theme.textFaint, textTransform: 'uppercase' }}>
              Study Sanctuary
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 4 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: theme.liveGreen, boxShadow: `0 0 0 2px ${theme.liveGreenDim}` }} />
              <span style={{ fontFamily: "'Bitter', serif", fontSize: 11, color: theme.liveGreen }}>Live · 67 present</span>
            </div>
          </div>
          <button
            onClick={() => { setPhase('reflection'); setIsRunning(false); }}
            style={{
              background: 'none', border: `1px solid ${theme.border}`,
              borderRadius: 2, padding: '6px 12px', cursor: 'pointer',
              fontFamily: "'Bitter', serif", fontSize: 10, color: theme.textMuted,
            }}
          >
            End Early
          </button>
        </div>

        {/* Timer */}
        <div style={{ textAlign: 'center', marginBottom: 10 }}>
          <div style={{
            fontFamily: "'Bitter', serif", fontSize: 76, fontWeight: 700,
            color: theme.text, lineHeight: 1, letterSpacing: '-3px',
          }}>
            {fmt(timeLeft)}
          </div>
          <div style={{
            fontFamily: "'Bitter', serif", fontSize: 10, color: theme.textFaint,
            letterSpacing: '0.14em', textTransform: 'uppercase', marginTop: 6,
          }}>
            remaining
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ width: 200, height: 2, background: theme.border, borderRadius: 1, marginBottom: 30, overflow: 'hidden' }}>
          <div style={{
            width: `${progress * 100}%`, height: '100%',
            background: theme.accent, transition: 'width 1s linear',
          }} />
        </div>

        {/* Intention */}
        <div style={{ padding: '0 36px', marginBottom: 30, textAlign: 'center' }}>
          <div style={{
            fontFamily: "'Bitter', serif", fontSize: 12, fontStyle: 'italic',
            color: theme.textMuted, lineHeight: 1.7,
          }}>
            "{intention || 'Your focused intention for this session'}"
          </div>
        </div>

        {/* Presence Grid */}
        <div style={{ marginBottom: 28 }}>
          <div style={{
            fontFamily: "'Bitter', serif", fontSize: 9, fontWeight: 700,
            letterSpacing: '0.16em', color: theme.textFaint, textTransform: 'uppercase',
            textAlign: 'center', marginBottom: 12,
          }}>
            Silent Companions
          </div>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap', maxWidth: 240 }}>
            {presenceMembers.map((m, i) => (
              <div
                key={i}
                style={{
                  width: 38, height: 38, borderRadius: '50%',
                  background: m.color,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  filter: 'blur(3.5px)',
                  opacity: presenceOpacities[i],
                  fontFamily: "'Bitter', serif", fontSize: 11, fontWeight: 700,
                  color: '#F0E8D0', userSelect: 'none',
                }}
              >
                {m.initials}
              </div>
            ))}
            <div style={{
              width: 38, height: 38, borderRadius: '50%',
              border: `1px dashed ${theme.border}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ fontFamily: "'Bitter', serif", fontSize: 9, color: theme.textFaint }}>+59</span>
            </div>
          </div>
        </div>

        {/* Play/Pause */}
        <button
          onClick={() => setIsRunning(r => !r)}
          style={{
            background: theme.surface,
            border: `1px solid ${theme.border}`,
            borderRadius: '50%', width: 50, height: 50,
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <Icon name={isRunning ? 'Pause' : 'Play'} size={18} color={theme.textMuted} />
        </button>
      </div>
    );
  }

  // ── Reflection Phase ──
  const moods = ['Focused', 'Breakthrough', 'Steady', 'Challenging', 'Flow State'];
  return (
    <div style={{ height: '100%', overflowY: 'auto', background: theme.bg }}>
      <div style={{ padding: '24px 24px 40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <Icon name="CheckCircle" size={18} color={theme.greenBright} />
          <div style={{
            fontFamily: "'Bitter', serif", fontSize: 10, fontWeight: 700,
            letterSpacing: '0.18em', color: theme.greenBright, textTransform: 'uppercase',
          }}>
            Session Complete
          </div>
        </div>
        <div style={{ fontFamily: "'Bitter', serif", fontSize: 28, fontWeight: 700, color: theme.text, lineHeight: 1.15, marginBottom: 6 }}>
          Time to<br />Reflect
        </div>
        <div style={{ fontFamily: "'Bitter', serif", fontSize: 12, color: theme.textMuted, marginBottom: 22, lineHeight: 1.7, fontStyle: 'italic' }}>
          A moment of mindful reflection closes the ritual. What did you create?
        </div>

        <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
          {[{ label: "Duration", val: "45 min" }, { label: "Focus", val: "94%" }, { label: "Guild Rank", val: "#12" }].map(s => (
            <div key={s.label} style={{
              flex: 1, background: theme.surface,
              border: `1px solid ${theme.border}`, borderRadius: 2,
              padding: '10px 8px', textAlign: 'center',
            }}>
              <div style={{ fontFamily: "'Bitter', serif", fontSize: 20, fontWeight: 700, color: theme.text, lineHeight: 1 }}>{s.val}</div>
              <div style={{ fontFamily: "'Bitter', serif", fontSize: 9, color: theme.textFaint, letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{
          background: theme.surfaceAlt,
          border: `1px solid ${theme.border}`, borderLeft: `3px solid ${theme.accent}`,
          borderRadius: 2, padding: '12px 14px', marginBottom: 18,
        }}>
          <SectionLabel theme={theme} style={{ display: 'block', marginBottom: 5 }}>Your Intention Was</SectionLabel>
          <div style={{ fontFamily: "'Bitter', serif", fontSize: 12, fontStyle: 'italic', color: theme.textMuted, lineHeight: 1.6 }}>
            "{intention || 'Complete focused work'}"
          </div>
        </div>

        <div style={{ marginBottom: 18 }}>
          <SectionLabel theme={theme} style={{ display: 'block', marginBottom: 9 }}>Your Reflection</SectionLabel>
          <textarea
            value={reflection}
            onChange={e => setReflection(e.target.value)}
            placeholder="What did you accomplish? What surprised you? What will you carry forward..."
            style={{
              width: '100%', minHeight: 100, background: theme.surface,
              border: `1px solid ${theme.border}`, borderRadius: 2, padding: '12px',
              fontFamily: "'Bitter', serif", fontSize: 13, color: theme.text,
              resize: 'none', outline: 'none', lineHeight: 1.65, boxSizing: 'border-box',
            }}
          />
        </div>

        <div style={{ marginBottom: 24 }}>
          <SectionLabel theme={theme} style={{ display: 'block', marginBottom: 9 }}>Session Mood</SectionLabel>
          <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
            {moods.map(mood => {
              const selected = selectedMood === mood;
              return (
                <button
                  key={mood}
                  onClick={() => setSelectedMood(mood)}
                  style={{
                    background: selected ? theme.accentDim : theme.surface,
                    border: `1px solid ${selected ? theme.accent : theme.border}`,
                    borderRadius: 2, padding: '6px 12px', cursor: 'pointer',
                    fontFamily: "'Bitter', serif", fontSize: 11,
                    color: selected ? theme.accent : theme.textMuted,
                    transition: 'all 0.15s',
                  }}
                >
                  {mood}
                </button>
              );
            })}
          </div>
        </div>

        <button
          onClick={() => { resetSession(); setActiveScreen('home'); }}
          style={{
            width: '100%', background: theme.accent, border: 'none',
            borderRadius: 2, padding: '15px', cursor: 'pointer',
            fontFamily: "'Bitter', serif", fontSize: 13, fontWeight: 700,
            letterSpacing: '0.1em', textTransform: 'uppercase', color: '#F0E8D0',
          }}
        >
          Complete Ritual →
        </button>
        <button
          onClick={resetSession}
          style={{
            width: '100%', background: 'none', border: 'none', cursor: 'pointer',
            fontFamily: "'Bitter', serif", fontSize: 12, color: theme.textMuted,
            marginTop: 12, textDecoration: 'underline', padding: '4px',
          }}
        >
          Join another session
        </button>
      </div>
    </div>
  );
}

// ─── ALTAR SCREEN ─────────────────────────────────────────────────────────────
function AltarScreen({ theme, isDark, setIsDark, setActiveScreen }) {
  const maxHours = Math.max(...weekHours);
  const joinedGuilds = guildData.filter(g => [1, 3].includes(g.id));
  const guildContrib = [{ hours: '68h', rank: '#5' }, { hours: '24h', rank: '#18' }];

  return (
    <div style={{ height: '100%', overflowY: 'auto', background: theme.bg }}>
      {/* ── Asymmetric Hero ── */}
      <div style={{
        position: 'relative', overflow: 'hidden',
        padding: '22px 20px 20px',
        borderBottom: `1px solid ${theme.border}`,
        minHeight: 160,
      }}>
        {/* Ghost number — asymmetric large background element */}
        <div style={{
          position: 'absolute', right: -12, top: -18,
          fontFamily: "'Bitter', serif", fontSize: 150, fontWeight: 700,
          color: theme.border, lineHeight: 1, userSelect: 'none', pointerEvents: 'none', zIndex: 0,
        }}>
          14
        </div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <SectionLabel theme={theme} style={{ display: 'block', marginBottom: 10 }}>Progress Altar</SectionLabel>
          <div style={{ fontFamily: "'Bitter', serif", fontSize: 16, fontWeight: 700, color: theme.text }}>Mara Voss</div>
          <div style={{ fontFamily: "'Bitter', serif", fontSize: 11, color: theme.textMuted, marginBottom: 16 }}>@maravoss · Member since Jan 2024</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Icon name="Flame" size={28} color={theme.accent} />
            <div>
              <div style={{ fontFamily: "'Bitter', serif", fontSize: 11, color: theme.textMuted }}>Current Streak</div>
              <div style={{ fontFamily: "'Bitter', serif", fontSize: 36, fontWeight: 700, color: theme.accent, lineHeight: 1.1 }}>
                14 <span style={{ fontSize: 16, color: theme.textMuted }}>days</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Stats Grid ── */}
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        gap: 1, background: theme.border,
        borderBottom: `1px solid ${theme.border}`,
      }}>
        {[
          { label: "Total Hours", value: "127", icon: "Clock" },
          { label: "Sessions", value: "89", icon: "CheckCircle" },
          { label: "Guilds", value: "2", icon: "Users" },
          { label: "Best Streak", value: "21d", icon: "Zap" },
        ].map(s => (
          <div key={s.label} style={{ background: theme.surface, padding: '14px 16px' }}>
            <Icon name={s.icon} size={13} color={theme.textFaint} />
            <div style={{ fontFamily: "'Bitter', serif", fontSize: 26, fontWeight: 700, color: theme.text, marginTop: 6, lineHeight: 1 }}>
              {s.value}
            </div>
            <div style={{
              fontFamily: "'Bitter', serif", fontSize: 9, color: theme.textFaint,
              letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 4,
            }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* ── Weekly Chart ── */}
      <div style={{ padding: '20px 20px 0' }}>
        <SectionLabel theme={theme} style={{ display: 'block', marginBottom: 16 }}>This Week</SectionLabel>
        <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end', height: 90 }}>
          {weekHours.map((hours, i) => {
            const isToday = i === 4;
            const heightPct = maxHours > 0 ? hours / maxHours : 0;
            return (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, height: '100%', justifyContent: 'flex-end' }}>
                <div style={{ fontFamily: "'Bitter', serif", fontSize: 9, color: theme.textFaint, minHeight: 12 }}>
                  {hours > 0 ? `${hours}h` : ''}
                </div>
                <div style={{
                  width: '100%', borderRadius: '2px 2px 0 0',
                  height: hours === 0 ? 3 : `${Math.max(heightPct * 60, 4)}px`,
                  background: isToday ? theme.accent : hours === 0 ? theme.border : theme.greenMid,
                  transition: 'height 0.4s ease',
                  flexShrink: 0,
                }} />
                <div style={{
                  fontFamily: "'Bitter', serif", fontSize: 10,
                  color: isToday ? theme.accent : theme.textFaint,
                  fontWeight: isToday ? 700 : 400,
                }}>
                  {weekDays[i]}
                </div>
              </div>
            );
          })}
        </div>
        <div style={{ fontFamily: "'Bitter', serif", fontSize: 11, color: theme.textMuted, marginTop: 12, fontStyle: 'italic' }}>
          18.5 hours this week · 3.7 daily average
        </div>
      </div>

      {/* ── Guild Contributions ── */}
      <div style={{ padding: '20px 20px 0', borderTop: `1px solid ${theme.border}`, marginTop: 18 }}>
        <SectionLabel theme={theme} style={{ display: 'block', marginBottom: 14 }}>Guild Contributions</SectionLabel>
        {joinedGuilds.map((guild, i) => (
          <div key={guild.id} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: guild.accent, flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "'Bitter', serif", fontSize: 13, color: theme.text }}>{guild.name}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontFamily: "'Bitter', serif", fontSize: 15, fontWeight: 700, color: theme.text }}>{guildContrib[i].hours}</div>
              <div style={{ fontFamily: "'Bitter', serif", fontSize: 9, color: theme.textFaint, letterSpacing: '0.08em' }}>Rank {guildContrib[i].rank}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Recent Reflections ── */}
      <div style={{ padding: '20px 20px 32px', borderTop: `1px solid ${theme.border}`, marginTop: 6 }}>
        <SectionLabel theme={theme} style={{ display: 'block', marginBottom: 14 }}>Recent Reflections</SectionLabel>
        {reflections.map((r, i) => (
          <div
            key={i}
            style={{
              background: theme.surface,
              border: `1px solid ${theme.border}`,
              borderRadius: 2, padding: '13px 14px', marginBottom: 10,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
              <div>
                <div style={{ fontFamily: "'Bitter', serif", fontSize: 12, fontWeight: 700, color: theme.accent }}>{r.guild}</div>
                <div style={{ fontFamily: "'Bitter', serif", fontSize: 10, color: theme.textFaint, marginTop: 2 }}>{r.date}</div>
              </div>
              <div style={{
                background: theme.border, borderRadius: 2, padding: '2px 8px',
                fontFamily: "'Bitter', serif", fontSize: 9, color: theme.textMuted, fontWeight: 600,
                letterSpacing: '0.06em', flexShrink: 0, marginLeft: 8,
              }}>
                {r.mood}
              </div>
            </div>
            <div style={{
              fontFamily: "'Bitter', serif", fontSize: 11, fontStyle: 'italic',
              color: theme.textMuted, lineHeight: 1.7,
            }}>
              "{r.reflection}"
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── APP ROOT ─────────────────────────────────────────────────────────────────
function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [isDark, setIsDark] = useState(true);
  const theme = isDark ? themes.dark : themes.light;

  const screens = {
    home: HomeScreen,
    sanctuaries: SanctuariesScreen,
    session: SessionScreen,
    altar: AltarScreen,
  };

  const sharedProps = { theme, isDark, setIsDark, setActiveScreen };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f0f0f0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      fontFamily: "'Bitter', serif",
    }}>
      <div style={{
        width: 375,
        height: 812,
        borderRadius: 42,
        overflow: 'hidden',
        background: theme.bg,
        position: 'relative',
        boxShadow: '0 40px 100px rgba(0,0,0,0.32), 0 0 0 1px rgba(0,0,0,0.08)',
        display: 'flex',
        flexDirection: 'column',
      }}>
        <div style={{ flex: 1, overflow: 'hidden', position: 'relative', minHeight: 0 }}>
          {React.createElement(screens[activeScreen], sharedProps)}
        </div>
        <BottomNav active={activeScreen} onNav={setActiveScreen} theme={theme} />
      </div>
    </div>
  );
}
