const { useState, useEffect, useRef } = React;

const themes = {
  dark: {
    bg: '#0D0F1A',
    surface: '#151826',
    surfaceAlt: '#1C2035',
    card: '#1A1E30',
    cardBorder: '#252A40',
    accent: '#FF6B35',
    accentDim: '#C4501E',
    accentGlow: 'rgba(255,107,53,0.2)',
    blue: '#1A2A6C',
    blueLight: '#2B3D8F',
    text: '#F0F2FF',
    textSub: '#8B92B8',
    textMuted: '#555E88',
    navBg: '#0D0F1A',
    navBorder: '#252A40',
    statusBar: '#F0F2FF',
    inputBg: '#1C2035',
  },
  light: {
    bg: '#F0F1F8',
    surface: '#FFFFFF',
    surfaceAlt: '#E8EAF5',
    card: '#FFFFFF',
    cardBorder: '#D0D4E8',
    accent: '#FF6B35',
    accentDim: '#C4501E',
    accentGlow: 'rgba(255,107,53,0.15)',
    blue: '#1A2A6C',
    blueLight: '#2B3D8F',
    text: '#0D0F1A',
    textSub: '#4A5280',
    textMuted: '#8B92B8',
    navBg: '#FFFFFF',
    navBorder: '#D0D4E8',
    statusBar: '#0D0F1A',
    inputBg: '#F0F1F8',
  }
};

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isDark, setIsDark] = useState(true);
  const t = isDark ? themes.dark : themes.light;

  const fontStyle = `
    @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    ::-webkit-scrollbar { width: 0px; }
    @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
    @keyframes ripple { 0%{transform:scale(1);opacity:0.6} 100%{transform:scale(2.5);opacity:0} }
    @keyframes slideUp { from{transform:translateY(20px);opacity:0} to{transform:translateY(0);opacity:1} }
    @keyframes heartbeat { 0%,100%{transform:scale(1)} 14%{transform:scale(1.15)} 28%{transform:scale(1)} 42%{transform:scale(1.1)} 56%{transform:scale(1)} }
    @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
    @keyframes glow { 0%,100%{box-shadow:0 0 8px rgba(255,107,53,0.4)} 50%{box-shadow:0 0 24px rgba(255,107,53,0.9)} }
  `;

  const tabs = [
    { id: 'home', label: 'Home', icon: window.lucide.Home },
    { id: 'rituals', label: 'Rituals', icon: window.lucide.Flame },
    { id: 'tribe', label: 'Tribe', icon: window.lucide.Users },
    { id: 'pulse', label: 'Pulse', icon: window.lucide.Activity },
    { id: 'settings', label: 'Settings', icon: window.lucide.Settings },
  ];

  const screens = {
    home: HomeScreen,
    rituals: RitualsScreen,
    tribe: TribeScreen,
    pulse: PulseScreen,
    settings: SettingsScreen,
  };

  const ScreenComponent = screens[activeTab];

  return React.createElement('div', {
    style: { minHeight: '100vh', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Orbitron', monospace", padding: '20px' }
  },
    React.createElement('style', null, fontStyle),
    React.createElement('div', {
      style: {
        width: 375, height: 812, background: t.bg, borderRadius: 44,
        overflow: 'hidden', position: 'relative', display: 'flex', flexDirection: 'column',
        boxShadow: '0 40px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.08)',
        fontFamily: "'Orbitron', monospace"
      }
    },
      // Dynamic Island
      React.createElement('div', {
        style: {
          position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)',
          width: 120, height: 34, background: '#000', borderRadius: 20, zIndex: 100,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6
        }
      },
        React.createElement('div', { style: { width: 8, height: 8, borderRadius: '50%', background: '#1a1a1a' } }),
        React.createElement('div', { style: { width: 12, height: 12, borderRadius: '50%', background: '#111' } })
      ),
      // Status bar
      React.createElement('div', {
        style: { height: 50, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 28px', flexShrink: 0, zIndex: 10 }
      },
        React.createElement('span', { style: { fontSize: 11, fontWeight: '700', color: t.statusBar, letterSpacing: 1 } }, '9:41'),
        React.createElement('div', { style: { display: 'flex', gap: 6, alignItems: 'center' } },
          React.createElement(window.lucide.Wifi, { size: 14, color: t.statusBar }),
          React.createElement(window.lucide.Signal, { size: 14, color: t.statusBar }),
          React.createElement(window.lucide.Battery, { size: 14, color: t.statusBar })
        )
      ),
      // Screen content
      React.createElement('div', {
        style: { flex: 1, overflow: 'hidden', position: 'relative' }
      },
        React.createElement(ScreenComponent, { t, isDark, setIsDark })
      ),
      // Bottom nav
      React.createElement('div', {
        style: {
          height: 72, background: t.navBg, borderTop: `1px solid ${t.navBorder}`,
          display: 'flex', alignItems: 'center', justifyContent: 'space-around',
          padding: '0 4px', flexShrink: 0
        }
      },
        tabs.map(tab => {
          const isActive = activeTab === tab.id;
          const navItemStyle = {
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
            padding: '8px 10px', borderRadius: 12, cursor: 'pointer',
            transition: 'all 0.2s', flex: 1,
            background: isActive ? t.accentGlow : 'transparent',
          };
          const labelStyle = {
            fontSize: 8, fontWeight: '700', letterSpacing: 0.5,
            color: isActive ? t.accent : t.textMuted,
            textTransform: 'uppercase'
          };
          return React.createElement('div', {
            key: tab.id,
            onClick: () => setActiveTab(tab.id),
            style: navItemStyle
          },
            React.createElement(tab.icon, { size: 22, color: isActive ? t.accent : t.textMuted }),
            React.createElement('span', { style: labelStyle }, tab.label)
          );
        })
      )
    )
  );
}

// ─── HOME SCREEN ─────────────────────────────────────────────────────────────
function HomeScreen({ t }) {
  const [liveCount, setLiveCount] = useState(247);
  const [pressed, setPressed] = useState(null);

  useEffect(() => {
    const iv = setInterval(() => setLiveCount(c => c + Math.floor(Math.random() * 3 - 1)), 3000);
    return () => clearInterval(iv);
  }, []);

  const liveRituals = [
    { id: 1, name: 'MORNING WRITERS CIRCLE', tribe: 'Novel Seekers', participants: 38, timeLeft: '14:22', mood: 92, color: '#FF6B35' },
    { id: 2, name: 'BREATH & RELEASE', tribe: 'Yoga Collective', participants: 61, timeLeft: '08:45', mood: 88, color: '#2B3D8F' },
    { id: 3, name: 'CODE SPRINT #47', tribe: 'Dev Minds', participants: 24, timeLeft: '22:10', mood: 95, color: '#1A7A4A' },
  ];

  const upcomingRituals = [
    { name: 'Evening Gratitude', tribe: 'Mindful Living', time: 'In 2h 15m', participants: 120 },
    { name: 'Creator Accountability', tribe: 'Build In Public', time: 'In 4h', participants: 85 },
  ];

  return React.createElement('div', {
    style: { height: '100%', overflowY: 'auto', background: t.bg }
  },
    // Header with diagonal split
    React.createElement('div', {
      style: { position: 'relative', overflow: 'hidden', marginBottom: 20 }
    },
      // Diagonal background
      React.createElement('div', {
        style: {
          position: 'absolute', inset: 0, background: t.blue,
          clipPath: 'polygon(0 0, 100% 0, 100% 60%, 0 100%)',
          zIndex: 0
        }
      }),
      React.createElement('div', {
        style: {
          position: 'absolute', top: 0, right: 0, width: '50%', height: '100%',
          background: t.accent, clipPath: 'polygon(40% 0, 100% 0, 100% 100%, 0 100%)',
          zIndex: 0, opacity: 0.12
        }
      }),
      React.createElement('div', {
        style: { position: 'relative', zIndex: 1, padding: '20px 20px 60px' }
      },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 } },
          React.createElement('div', null,
            React.createElement('div', { style: { fontSize: 9, color: t.accent, letterSpacing: 3, fontWeight: '700', marginBottom: 4 } }, '— WELCOME BACK'),
            React.createElement('div', { style: { fontSize: 20, fontWeight: '800', color: '#F0F2FF', letterSpacing: 1, lineHeight: 1.2 } }, 'MARCUS'),
            React.createElement('div', { style: { fontSize: 9, color: 'rgba(240,242,255,0.6)', letterSpacing: 2 } }, 'STREAK: 14 DAYS 🔥')
          ),
          React.createElement('div', {
            style: {
              width: 44, height: 44, borderRadius: 12, background: t.accent,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              animation: 'heartbeat 2s infinite'
            }
          },
            React.createElement(window.lucide.Heart, { size: 22, color: '#fff' })
          )
        ),
        // Live count pill
        React.createElement('div', {
          style: {
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(255,107,53,0.2)', border: '1px solid rgba(255,107,53,0.4)',
            borderRadius: 20, padding: '6px 14px'
          }
        },
          React.createElement('div', { style: { width: 8, height: 8, borderRadius: '50%', background: '#FF6B35', animation: 'pulse 1.5s infinite' } }),
          React.createElement('span', { style: { fontSize: 10, color: t.accent, fontWeight: '700', letterSpacing: 1 } }, `${liveCount} MEMBERS LIVE NOW`)
        )
      )
    ),

    // Live Rituals section
    React.createElement('div', { style: { padding: '0 16px 16px' } },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 } },
        React.createElement('span', { style: { fontSize: 11, fontWeight: '800', color: t.text, letterSpacing: 2 } }, '⚡ LIVE NOW'),
        React.createElement('span', { style: { fontSize: 9, color: t.accent, fontWeight: '700', letterSpacing: 1 } }, 'SEE ALL →')
      ),
      liveRituals.map(ritual =>
        React.createElement('div', {
          key: ritual.id,
          style: {
            background: t.card, border: `1px solid ${t.cardBorder}`,
            borderLeft: `3px solid ${ritual.color}`,
            borderRadius: 12, padding: '14px', marginBottom: 10,
            cursor: 'pointer', transition: 'all 0.2s',
            transform: pressed === ritual.id ? 'scale(0.98)' : 'scale(1)'
          },
          onMouseDown: () => setPressed(ritual.id),
          onMouseUp: () => setPressed(null),
          onTouchStart: () => setPressed(ritual.id),
          onTouchEnd: () => setPressed(null)
        },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 } },
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', { style: { fontSize: 11, fontWeight: '800', color: t.text, letterSpacing: 0.5, marginBottom: 3 } }, ritual.name),
              React.createElement('div', { style: { fontSize: 9, color: t.textSub, letterSpacing: 1 } }, ritual.tribe)
            ),
            React.createElement('div', {
              style: {
                background: `${ritual.color}22`, border: `1px solid ${ritual.color}55`,
                borderRadius: 6, padding: '3px 8px', display: 'flex', alignItems: 'center', gap: 4
              }
            },
              React.createElement('div', { style: { width: 6, height: 6, borderRadius: '50%', background: ritual.color, animation: 'pulse 1s infinite' } }),
              React.createElement('span', { style: { fontSize: 9, color: ritual.color, fontWeight: '700' } }, ritual.timeLeft)
            )
          ),
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
              React.createElement(window.lucide.Users, { size: 12, color: t.textMuted }),
              React.createElement('span', { style: { fontSize: 9, color: t.textMuted, fontWeight: '600' } }, `${ritual.participants} MEMBERS`)
            ),
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6 } },
              React.createElement('span', { style: { fontSize: 9, color: t.textMuted } }, 'MOOD'),
              React.createElement('div', { style: { width: 60, height: 4, background: t.surfaceAlt, borderRadius: 2, overflow: 'hidden' } },
                React.createElement('div', { style: { width: `${ritual.mood}%`, height: '100%', background: ritual.color, borderRadius: 2 } })
              ),
              React.createElement('span', { style: { fontSize: 9, color: ritual.color, fontWeight: '700' } }, `${ritual.mood}%`)
            )
          )
        )
      ),

      // Upcoming
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, marginTop: 6 } },
        React.createElement('span', { style: { fontSize: 11, fontWeight: '800', color: t.text, letterSpacing: 2 } }, '🕐 UPCOMING'),
      ),
      upcomingRituals.map((r, i) =>
        React.createElement('div', {
          key: i,
          style: {
            background: t.surfaceAlt, borderRadius: 10, padding: '12px 14px',
            marginBottom: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center'
          }
        },
          React.createElement('div', null,
            React.createElement('div', { style: { fontSize: 10, fontWeight: '700', color: t.text, marginBottom: 2 } }, r.name),
            React.createElement('div', { style: { fontSize: 9, color: t.textSub } }, r.tribe)
          ),
          React.createElement('div', { style: { textAlign: 'right' } },
            React.createElement('div', { style: { fontSize: 9, color: t.accent, fontWeight: '700' } }, r.time),
            React.createElement('div', { style: { fontSize: 9, color: t.textMuted } }, `${r.participants} going`)
          )
        )
      )
    )
  );
}

// ─── RITUALS SCREEN ───────────────────────────────────────────────────────────
function RitualsScreen({ t }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [joinedRitual, setJoinedRitual] = useState(null);
  const [timer, setTimer] = useState(900);

  const filters = ['ALL', 'WRITING', 'WELLNESS', 'CODING', 'CREATIVE'];

  const rituals = [
    { id: 1, name: 'DAWN WRITERS RITUAL', category: 'WRITING', time: '06:00 AM', duration: '30 MIN', participants: 48, streak: 21, color: '#FF6B35', icon: '✍️', live: true },
    { id: 2, name: 'BREATH OF FIRE', category: 'WELLNESS', time: '07:30 AM', duration: '20 MIN', participants: 92, streak: 7, color: '#2B7A78', icon: '🧘', live: true },
    { id: 3, name: 'SPRINT & SHIP', category: 'CODING', time: '09:00 AM', duration: '45 MIN', participants: 35, streak: 12, color: '#2B3D8F', icon: '💻', live: false },
    { id: 4, name: 'SKETCH DAILY', category: 'CREATIVE', time: '12:00 PM', duration: '25 MIN', participants: 29, streak: 5, color: '#8B35FF', icon: '🎨', live: false },
    { id: 5, name: 'EVENING RESET', category: 'WELLNESS', time: '08:00 PM', duration: '15 MIN', participants: 115, streak: 30, color: '#FF3D6B', icon: '🌙', live: false },
  ];

  useEffect(() => {
    if (joinedRitual) {
      const iv = setInterval(() => setTimer(t => t > 0 ? t - 1 : 0), 1000);
      return () => clearInterval(iv);
    }
  }, [joinedRitual]);

  const formatTime = s => `${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`;

  if (joinedRitual) {
    const ritual = rituals.find(r => r.id === joinedRitual);
    return React.createElement('div', { style: { height: '100%', background: t.bg, display: 'flex', flexDirection: 'column', position: 'relative' } },
      // Diagonal header
      React.createElement('div', { style: { position: 'relative', height: 200, overflow: 'hidden' } },
        React.createElement('div', { style: { position: 'absolute', inset: 0, background: ritual.color, clipPath: 'polygon(0 0,100% 0,100% 70%,0 100%)' } }),
        React.createElement('div', { style: { position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 20px' } },
          React.createElement('div', { style: { fontSize: 9, color: 'rgba(255,255,255,0.7)', letterSpacing: 3, marginBottom: 8 } }, '● LIVE RITUAL'),
          React.createElement('div', { style: { fontSize: 16, fontWeight: '800', color: '#fff', letterSpacing: 1, marginBottom: 12 } }, ritual.name),
          React.createElement('div', {
            style: {
              fontSize: 36, fontWeight: '900', color: '#fff', letterSpacing: 2,
              animation: 'glow 2s infinite'
            }
          }, formatTime(timer))
        ),
        React.createElement('button', {
          onClick: () => setJoinedRitual(null),
          style: {
            position: 'absolute', top: 16, right: 16, background: 'rgba(0,0,0,0.3)',
            border: 'none', borderRadius: 8, padding: '6px 12px', color: '#fff',
            fontSize: 9, fontWeight: '700', cursor: 'pointer', letterSpacing: 1, fontFamily: "'Orbitron', monospace"
          }
        }, '✕ LEAVE')
      ),
      // Session content
      React.createElement('div', { style: { flex: 1, padding: '16px', overflowY: 'auto' } },
        // Participants
        React.createElement('div', { style: { marginBottom: 16 } },
          React.createElement('div', { style: { fontSize: 9, color: t.textMuted, letterSpacing: 2, marginBottom: 10 } }, 'ACTIVE MEMBERS'),
          React.createElement('div', { style: { display: 'flex', flexWrap: 'wrap', gap: 6 } },
            ['Marcus', 'Ava', 'Jun', 'Sara', 'Eli', 'Nour', 'Ren', 'Lila'].map((name, i) =>
              React.createElement('div', {
                key: i,
                style: {
                  background: i === 0 ? ritual.color : t.surfaceAlt,
                  borderRadius: 20, padding: '5px 12px', fontSize: 9,
                  color: i === 0 ? '#fff' : t.textSub, fontWeight: '700', letterSpacing: 0.5
                }
              }, name)
            )
          )
        ),
        // Heartbeat check-in
        React.createElement('div', {
          style: { background: t.card, border: `1px solid ${t.cardBorder}`, borderRadius: 12, padding: 14, marginBottom: 12 }
        },
          React.createElement('div', { style: { fontSize: 10, fontWeight: '800', color: t.text, marginBottom: 8, letterSpacing: 1 } }, '💓 HEARTBEAT CHECK-IN'),
          React.createElement('div', { style: { fontSize: 9, color: t.textSub, lineHeight: 1.6, marginBottom: 10 } }, '"State your intention for this session in one sentence."'),
          React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 6 } },
            ['I will finish Chapter 3 today — Ava', 'No distractions, full focus — Jun', 'I commit to 500 words — Sara'].map((msg, i) =>
              React.createElement('div', { key: i, style: { background: t.surfaceAlt, borderRadius: 8, padding: '8px 10px', fontSize: 9, color: t.text } }, msg)
            )
          )
        ),
        // Mood pulse
        React.createElement('div', {
          style: { background: t.card, border: `1px solid ${t.cardBorder}`, borderRadius: 12, padding: 14 }
        },
          React.createElement('div', { style: { fontSize: 10, fontWeight: '800', color: t.text, marginBottom: 12, letterSpacing: 1 } }, '📊 SESSION MOOD PULSE'),
          React.createElement('div', { style: { display: 'flex', gap: 8, alignItems: 'flex-end', height: 60 } },
            [70, 85, 78, 92, 88, 95, 91].map((val, i) =>
              React.createElement('div', {
                key: i,
                style: {
                  flex: 1, background: i === 6 ? ritual.color : t.surfaceAlt,
                  height: `${val}%`, borderRadius: '3px 3px 0 0', transition: 'all 0.5s'
                }
              })
            )
          )
        )
      )
    );
  }

  return React.createElement('div', { style: { height: '100%', background: t.bg, overflowY: 'auto' } },
    React.createElement('div', { style: { padding: '16px 16px 8px' } },
      React.createElement('div', { style: { fontSize: 16, fontWeight: '800', color: t.text, letterSpacing: 2, marginBottom: 4 } }, 'RITUALS'),
      React.createElement('div', { style: { fontSize: 9, color: t.textSub, letterSpacing: 1, marginBottom: 16 } }, 'FIND YOUR DAILY PRACTICE'),
      // Filters
      React.createElement('div', { style: { display: 'flex', gap: 6, marginBottom: 16, overflowX: 'auto' } },
        filters.map(f =>
          React.createElement('button', {
            key: f,
            onClick: () => setActiveFilter(f.toLowerCase()),
            style: {
              background: activeFilter === f.toLowerCase() ? t.accent : t.surfaceAlt,
              color: activeFilter === f.toLowerCase() ? '#fff' : t.textSub,
              border: 'none', borderRadius: 6, padding: '6px 12px', fontSize: 8,
              fontWeight: '700', letterSpacing: 1, cursor: 'pointer', whiteSpace: 'nowrap',
              fontFamily: "'Orbitron', monospace"
            }
          }, f)
        )
      )
    ),
    React.createElement('div', { style: { padding: '0 16px 16px' } },
      rituals.map(ritual =>
        React.createElement('div', {
          key: ritual.id,
          style: {
            background: t.card, borderRadius: 12, marginBottom: 10, overflow: 'hidden',
            border: `1px solid ${t.cardBorder}`, cursor: 'pointer'
          },
          onClick: () => setJoinedRitual(ritual.id)
        },
          // Color accent strip + diagonal
          React.createElement('div', { style: { position: 'relative', height: 6, background: ritual.color, overflow: 'hidden' } },
            React.createElement('div', { style: { position: 'absolute', right: 0, top: 0, width: '30%', height: '100%', background: 'rgba(0,0,0,0.2)', clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0 100%)' } })
          ),
          React.createElement('div', { style: { padding: '12px 14px' } },
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 } },
              React.createElement('div', null,
                React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 } },
                  React.createElement('span', null, ritual.icon),
                  React.createElement('span', { style: { fontSize: 11, fontWeight: '800', color: t.text, letterSpacing: 0.5 } }, ritual.name)
                ),
                React.createElement('div', { style: { fontSize: 9, color: t.textMuted, letterSpacing: 1 } }, `${ritual.time} · ${ritual.duration}`)
              ),
              ritual.live && React.createElement('div', {
                style: {
                  background: 'rgba(255,107,53,0.15)', border: '1px solid rgba(255,107,53,0.4)',
                  borderRadius: 4, padding: '3px 8px', display: 'flex', alignItems: 'center', gap: 4
                }
              },
                React.createElement('div', { style: { width: 5, height: 5, borderRadius: '50%', background: t.accent, animation: 'pulse 1s infinite' } }),
                React.createElement('span', { style: { fontSize: 8, color: t.accent, fontWeight: '700' } }, 'LIVE')
              )
            ),
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
              React.createElement('div', { style: { display: 'flex', gap: 12 } },
                React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
                  React.createElement(window.lucide.Users, { size: 11, color: t.textMuted }),
                  React.createElement('span', { style: { fontSize: 9, color: t.textMuted } }, ritual.participants)
                ),
                React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
                  React.createElement('span', { style: { fontSize: 9 } }, '🔥'),
                  React.createElement('span', { style: { fontSize: 9, color: t.textMuted } }, `${ritual.streak} day streak`)
                )
              ),
              React.createElement('div', {
                style: {
                  background: ritual.color, borderRadius: 6, padding: '5px 12px',
                  fontSize: 8, fontWeight: '700', color: '#fff', letterSpacing: 1
                }
              }, ritual.live ? 'JOIN NOW' : 'REMIND ME')
            )
          )
        )
      )
    )
  );
}

// ─── TRIBE SCREEN ─────────────────────────────────────────────────────────────
function TribeScreen({ t }) {
  const [onboarding, setOnboarding] = useState(false);
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState([]);

  const tribes = [
    { name: 'Novel Seekers', members: 1240, category: 'Writing', desc: 'Morning writers building daily fiction habits', color: '#FF6B35', emoji: '✍️', joined: true },
    { name: 'Yoga Collective', members: 3820, category: 'Wellness', desc: 'Mind-body harmony through daily rituals', color: '#2B7A78', emoji: '🧘', joined: true },
    { name: 'Dev Minds', members: 876, category: 'Coding', desc: 'Ship code every day, no excuses', color: '#2B3D8F', emoji: '💻', joined: false },
    { name: 'Sketch Daily', members: 532, category: 'Creative', desc: 'One sketch a day, every day', color: '#8B35FF', emoji: '🎨', joined: false },
    { name: 'Build In Public', members: 2100, category: 'Entrepreneurship', desc: 'Weekly accountability for makers', color: '#FF3D6B', emoji: '🚀', joined: false },
  ];

  const identities = ['WRITER', 'CODER', 'YOGI', 'MAKER', 'RUNNER', 'ARTIST', 'MEDITATOR', 'READER'];

  if (onboarding) {
    return React.createElement('div', { style: { height: '100%', background: t.bg, display: 'flex', flexDirection: 'column' } },
      // Diagonal header
      React.createElement('div', { style: { position: 'relative', height: 140, overflow: 'hidden', flexShrink: 0 } },
        React.createElement('div', { style: { position: 'absolute', inset: 0, background: t.accent, clipPath: 'polygon(0 0,100% 0,100% 60%,0 100%)' } }),
        React.createElement('div', { style: { position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 20px' } },
          React.createElement('div', { style: { fontSize: 9, color: 'rgba(255,255,255,0.7)', letterSpacing: 3, marginBottom: 6 } }, `STEP ${step + 1} OF 2`),
          React.createElement('div', { style: { fontSize: 16, fontWeight: '800', color: '#fff', letterSpacing: 1 } },
            step === 0 ? 'WHO ARE YOU?' : 'YOUR TRIBES'
          )
        )
      ),
      React.createElement('div', { style: { flex: 1, padding: '20px 16px', overflowY: 'auto' } },
        step === 0
          ? React.createElement('div', null,
              React.createElement('div', { style: { fontSize: 9, color: t.textSub, letterSpacing: 1, marginBottom: 16 } }, 'SELECT ALL THAT RESONATE WITH YOUR IDENTITY'),
              React.createElement('div', { style: { display: 'flex', flexWrap: 'wrap', gap: 8 } },
                identities.map(id =>
                  React.createElement('button', {
                    key: id,
                    onClick: () => setSelected(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]),
                    style: {
                      background: selected.includes(id) ? t.accent : t.surfaceAlt,
                      color: selected.includes(id) ? '#fff' : t.textSub,
                      border: `2px solid ${selected.includes(id) ? t.accent : t.cardBorder}`,
                      borderRadius: 8, padding: '10px 16px', fontSize: 9,
                      fontWeight: '700', cursor: 'pointer', letterSpacing: 1,
                      fontFamily: "'Orbitron', monospace", transition: 'all 0.2s'
                    }
                  }, id)
                )
              )
            )
          : React.createElement('div', null,
              React.createElement('div', { style: { fontSize: 9, color: t.textSub, letterSpacing: 1, marginBottom: 16 } }, 'RECOMMENDED TRIBES BASED ON YOUR IDENTITY'),
              tribes.slice(0, 3).map((tribe, i) =>
                React.createElement('div', {
                  key: i,
                  style: { background: t.card, border: `1px solid ${tribe.color}44`, borderRadius: 12, padding: 14, marginBottom: 10 }
                },
                  React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10 } },
                    React.createElement('div', { style: { fontSize: 24 } }, tribe.emoji),
                    React.createElement('div', { style: { flex: 1 } },
                      React.createElement('div', { style: { fontSize: 11, fontWeight: '800', color: t.text, marginBottom: 2 } }, tribe.name),
                      React.createElement('div', { style: { fontSize: 9, color: t.textSub } }, tribe.desc)
                    ),
                    React.createElement('div', { style: { width: 8, height: 8, borderRadius: '50%', background: tribe.color } })
                  )
                )
              )
            ),
        React.createElement('button', {
          onClick: () => step === 0 ? setStep(1) : setOnboarding(false),
          style: {
            width: '100%', background: t.accent, border: 'none', borderRadius: 10,
            padding: '14px', color: '#fff', fontSize: 11, fontWeight: '800',
            letterSpacing: 2, cursor: 'pointer', marginTop: 20, fontFamily: "'Orbitron', monospace"
          }
        }, step === 0 ? 'NEXT →' : 'JOIN MY TRIBES')
      )
    );
  }

  return React.createElement('div', { style: { height: '100%', background: t.bg, overflowY: 'auto' } },
    React.createElement('div', { style: { padding: '16px 16px 8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
      React.createElement('div', null,
        React.createElement('div', { style: { fontSize: 16, fontWeight: '800', color: t.text, letterSpacing: 2 } }, 'YOUR TRIBES'),
        React.createElement('div', { style: { fontSize: 9, color: t.textSub, letterSpacing: 1 } }, '2 COMMUNITIES JOINED')
      ),
      React.createElement('button', {
        onClick: () => setOnboarding(true),
        style: {
          background: t.accent, border: 'none', borderRadius: 8, padding: '8px 12px',
          color: '#fff', fontSize: 8, fontWeight: '800', letterSpacing: 1, cursor: 'pointer',
          fontFamily: "'Orbitron', monospace"
        }
      }, '+ FIND MORE')
    ),
    // Joined tribes
    React.createElement('div', { style: { padding: '8px 16px' } },
      React.createElement('div', { style: { fontSize: 9, color: t.textMuted, letterSpacing: 2, marginBottom: 10 } }, '● MY COMMUNITIES'),
      tribes.filter(t => t.joined).map((tribe, i) =>
        React.createElement('div', {
          key: i,
          style: {
            background: t.card, borderRadius: 14, marginBottom: 10, overflow: 'hidden',
            border: `1px solid ${tribe.color}33`
          }
        },
          React.createElement('div', { style: { height: 4, background: tribe.color } }),
          React.createElement('div', { style: { padding: 14 } },
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 } },
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8 } },
                React.createElement('span', { style: { fontSize: 20 } }, tribe.emoji),
                React.createElement('div', null,
                  React.createElement('div', { style: { fontSize: 11, fontWeight: '800', color: t.text, letterSpacing: 0.5 } }, tribe.name),
                  React.createElement('div', { style: { fontSize: 9, color: t.textMuted } }, `${tribe.members.toLocaleString()} members`)
                )
              ),
              React.createElement('div', { style: { background: `${tribe.color}22`, borderRadius: 6, padding: '4px 8px', fontSize: 9, color: tribe.color, fontWeight: '700' } }, tribe.category)
            ),
            React.createElement('div', { style: { fontSize: 9, color: t.textSub, lineHeight: 1.5 } }, tribe.desc)
          )
        )
      ),
      React.createElement('div', { style: { fontSize: 9, color: t.textMuted, letterSpacing: 2, marginBottom: 10, marginTop: 6 } }, '○ EXPLORE'),
      tribes.filter(tri => !tri.joined).map((tribe, i) =>
        React.createElement('div', {
          key: i,
          style: {
            background: t.surfaceAlt, borderRadius: 10, padding: '12px 14px',
            marginBottom: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center'
          }
        },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8 } },
            React.createElement('span', { style: { fontSize: 16 } }, tribe.emoji),
            React.createElement('div', null,
              React.createElement('div', { style: { fontSize: 10, fontWeight: '700', color: t.text } }, tribe.name),
              React.createElement('div', { style: { fontSize: 9, color: t.textMuted } }, `${tribe.members.toLocaleString()} members`)
            )
          ),
          React.createElement('button', {
            style: {
              background: 'transparent', border: `1px solid ${tribe.color}`,
              borderRadius: 6, padding: '5px 10px', fontSize: 8, color: tribe.color,
              fontWeight: '700', cursor: 'pointer', fontFamily: "'Orbitron', monospace"
            }
          }, 'JOIN')
        )
      )
    )
  );
}

// ─── PULSE SCREEN ─────────────────────────────────────────────────────────────
function PulseScreen({ t }) {
  const [tab, setTab] = useState('leaderboard');

  const leaders = [
    { rank: 1, name: 'ANYA KOVAC', tribe: 'Novel Seekers', streak: 87, pts: 4210, delta: '+12', badge: '👑' },
    { rank: 2, name: 'JUN TANAKA', tribe: 'Dev Minds', streak: 62, pts: 3980, delta: '+8', badge: '🥈' },
    { rank: 3, name: 'SARA OKONKWO', tribe: 'Yoga Collective', streak: 55, pts: 3640, delta: '+15', badge: '🥉' },
    { rank: 4, name: 'MARCUS (YOU)', tribe: 'Novel Seekers', streak: 14, pts: 1820, delta: '+4', badge: '⚡', isUser: true },
    { rank: 5, name: 'ELI ROSEN', tribe: 'Build In Public', streak: 30, pts: 1790, delta: '+6', badge: '🔥' },
    { rank: 6, name: 'NOUR HASSAN', tribe: 'Sketch Daily', streak: 22, pts: 1620, delta: '+2', badge: '🎨' },
  ];

  const myStats = [
    { label: 'TOTAL PTS', value: '1,820', icon: '⚡' },
    { label: 'STREAK', value: '14 days', icon: '🔥' },
    { label: 'RITUALS', value: '42', icon: '✅' },
    { label: 'TRIBE RANK', value: '#4', icon: '🏆' },
  ];

  return React.createElement('div', { style: { height: '100%', background: t.bg, display: 'flex', flexDirection: 'column' } },
    // Header
    React.createElement('div', { style: { padding: '16px 16px 0', flexShrink: 0 } },
      React.createElement('div', { style: { fontSize: 16, fontWeight: '800', color: t.text, letterSpacing: 2, marginBottom: 4 } }, 'PULSE'),
      React.createElement('div', { style: { fontSize: 9, color: t.textSub, letterSpacing: 1, marginBottom: 14 } }, 'YOUR IMPACT IN THE TRIBE'),
      // My stats
      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 16 } },
        myStats.map((stat, i) =>
          React.createElement('div', {
            key: i,
            style: {
              background: i === 0 ? t.accent : t.card,
              border: `1px solid ${i === 0 ? t.accent : t.cardBorder}`,
              borderRadius: 10, padding: '10px 12px'
            }
          },
            React.createElement('div', { style: { fontSize: 16 } }, stat.icon),
            React.createElement('div', { style: { fontSize: 16, fontWeight: '800', color: i === 0 ? '#fff' : t.text, letterSpacing: 0.5, marginTop: 4 } }, stat.value),
            React.createElement('div', { style: { fontSize: 8, color: i === 0 ? 'rgba(255,255,255,0.7)' : t.textMuted, letterSpacing: 1 } }, stat.label)
          )
        )
      ),
      // Tabs
      React.createElement('div', { style: { display: 'flex', gap: 6, marginBottom: 14 } },
        ['leaderboard', 'activity'].map(t2 =>
          React.createElement('button', {
            key: t2,
            onClick: () => setTab(t2),
            style: {
              flex: 1, background: tab === t2 ? t.accent : t.surfaceAlt,
              border: 'none', borderRadius: 8, padding: '8px', fontSize: 9,
              fontWeight: '700', color: tab === t2 ? '#fff' : t.textSub,
              cursor: 'pointer', letterSpacing: 1, textTransform: 'uppercase',
              fontFamily: "'Orbitron', monospace"
            }
          }, t2)
        )
      )
    ),
    // Leaderboard
    React.createElement('div', { style: { flex: 1, overflowY: 'auto', padding: '0 16px 16px' } },
      tab === 'leaderboard'
        ? leaders.map((p, i) =>
            React.createElement('div', {
              key: i,
              style: {
                background: p.isUser ? `${t.accent}22` : t.card,
                border: `1px solid ${p.isUser ? t.accent : t.cardBorder}`,
                borderRadius: 10, padding: '10px 14px', marginBottom: 8,
                display: 'flex', alignItems: 'center', gap: 10
              }
            },
              React.createElement('span', { style: { fontSize: 16, width: 24, textAlign: 'center' } }, p.badge),
              React.createElement('div', { style: { flex: 1 } },
                React.createElement('div', { style: { fontSize: 10, fontWeight: '800', color: t.text, letterSpacing: 0.5 } }, p.name),
                React.createElement('div', { style: { fontSize: 8, color: t.textMuted } }, p.tribe)
              ),
              React.createElement('div', { style: { textAlign: 'right' } },
                React.createElement('div', { style: { fontSize: 12, fontWeight: '800', color: p.isUser ? t.accent : t.text } }, p.pts.toLocaleString()),
                React.createElement('div', { style: { fontSize: 8, color: '#4CAF50', fontWeight: '700' } }, p.delta + ' today')
              )
            )
          )
        : React.createElement('div', null,
            [
              { time: '7:02 AM', event: 'Completed "Dawn Writers Ritual"', pts: '+45', icon: '✍️' },
              { time: 'Yesterday', event: 'Heartbeat Check-in shared', pts: '+10', icon: '💓' },
              { time: '2 days ago', event: '14-day streak milestone!', pts: '+100', icon: '🔥' },
              { time: '3 days ago', event: 'Joined Breath & Release', pts: '+20', icon: '🧘' },
              { time: '4 days ago', event: 'Completed "Dawn Writers Ritual"', pts: '+45', icon: '✍️' },
            ].map((ev, i) =>
              React.createElement('div', {
                key: i,
                style: {
                  background: t.card, border: `1px solid ${t.cardBorder}`,
                  borderRadius: 10, padding: '10px 14px', marginBottom: 8,
                  display: 'flex', alignItems: 'center', gap: 10
                }
              },
                React.createElement('span', { style: { fontSize: 18 } }, ev.icon),
                React.createElement('div', { style: { flex: 1 } },
                  React.createElement('div', { style: { fontSize: 9, fontWeight: '700', color: t.text, marginBottom: 2 } }, ev.event),
                  React.createElement('div', { style: { fontSize: 8, color: t.textMuted } }, ev.time)
                ),
                React.createElement('span', { style: { fontSize: 10, fontWeight: '800', color: t.accent } }, ev.pts)
              )
            )
          )
    )
  );
}

// ─── SETTINGS SCREEN ──────────────────────────────────────────────────────────
function SettingsScreen({ t, isDark, setIsDark }) {
  const [notifications, setNotifications] = useState(true);
  const [soundOn, setSoundOn] = useState(true);
  const [haptics, setHaptics] = useState(false);

  const Toggle = ({ value, onChange }) =>
    React.createElement('div', {
      onClick: () => onChange(!value),
      style: {
        width: 40, height: 22, borderRadius: 11,
        background: value ? t.accent : t.surfaceAlt,
        position: 'relative', cursor: 'pointer', transition: 'all 0.3s',
        border: `1px solid ${value ? t.accent : t.cardBorder}`
      }
    },
      React.createElement('div', {
        style: {
          width: 16, height: 16, borderRadius: '50%', background: '#fff',
          position: 'absolute', top: 2,
          left: value ? 20 : 2, transition: 'left 0.3s',
          boxShadow: '0 1px 4px rgba(0,0,0,0.3)'
        }
      })
    );

  const Row = ({ label, sub, control }) =>
    React.createElement('div', {
      style: {
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '12px 0', borderBottom: `1px solid ${t.cardBorder}`
      }
    },
      React.createElement('div', null,
        React.createElement('div', { style: { fontSize: 10, fontWeight: '700', color: t.text } }, label),
        sub && React.createElement('div', { style: { fontSize: 8, color: t.textMuted, marginTop: 2 } }, sub)
      ),
      control
    );

  return React.createElement('div', { style: { height: '100%', background: t.bg, overflowY: 'auto' } },
    React.createElement('div', { style: { padding: '16px' } },
      React.createElement('div', { style: { fontSize: 16, fontWeight: '800', color: t.text, letterSpacing: 2, marginBottom: 16 } }, 'SETTINGS'),

      // Profile card
      React.createElement('div', {
        style: {
          background: t.accent, borderRadius: 14, padding: '16px',
          marginBottom: 20, position: 'relative', overflow: 'hidden'
        }
      },
        React.createElement('div', {
          style: {
            position: 'absolute', top: 0, right: 0, width: '40%', height: '100%',
            background: 'rgba(0,0,0,0.15)', clipPath: 'polygon(30% 0, 100% 0, 100% 100%, 0 100%)'
          }
        }),
        React.createElement('div', { style: { position: 'relative', display: 'flex', alignItems: 'center', gap: 12 } },
          React.createElement('div', {
            style: {
              width: 48, height: 48, borderRadius: 12, background: 'rgba(255,255,255,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 22, border: '2px solid rgba(255,255,255,0.4)'
            }
          }, '🧑'),
          React.createElement('div', null,
            React.createElement('div', { style: { fontSize: 14, fontWeight: '800', color: '#fff', letterSpacing: 1 } }, 'MARCUS W.'),
            React.createElement('div', { style: { fontSize: 9, color: 'rgba(255,255,255,0.7)', letterSpacing: 1 } }, 'MEMBER SINCE 2024 · WRITER')
          )
        )
      ),

      // Appearance
      React.createElement('div', { style: { background: t.card, border: `1px solid ${t.cardBorder}`, borderRadius: 12, padding: '0 14px', marginBottom: 16 } },
        React.createElement('div', { style: { fontSize: 9, color: t.textMuted, letterSpacing: 2, padding: '10px 0 4px', fontWeight: '700' } }, 'APPEARANCE'),
        React.createElement(Row, {
          label: 'Dark Mode',
          sub: isDark ? 'Currently dark theme' : 'Currently light theme',
          control: React.createElement(Toggle, { value: isDark, onChange: setIsDark })
        })
      ),

      // Notifications
      React.createElement('div', { style: { background: t.card, border: `1px solid ${t.cardBorder}`, borderRadius: 12, padding: '0 14px', marginBottom: 16 } },
        React.createElement('div', { style: { fontSize: 9, color: t.textMuted, letterSpacing: 2, padding: '10px 0 4px', fontWeight: '700' } }, 'NOTIFICATIONS'),
        React.createElement(Row, { label: 'Ritual Alerts', sub: 'Live session reminders', control: React.createElement(Toggle, { value: notifications, onChange: setNotifications }) }),
        React.createElement(Row, { label: 'Sound Effects', sub: 'Ritual ambient audio', control: React.createElement(Toggle, { value: soundOn, onChange: setSoundOn }) }),
        React.createElement(Row, { label: 'Haptic Feedback', sub: 'Vibrate on check-ins', control: React.createElement(Toggle, { value: haptics, onChange: setHaptics }) })
      ),

      // Account links
      React.createElement('div', { style: { background: t.card, border: `1px solid ${t.cardBorder}`, borderRadius: 12, padding: '0 14px', marginBottom: 16 } },
        React.createElement('div', { style: { fontSize: 9, color: t.textMuted, letterSpacing: 2, padding: '10px 0 4px', fontWeight: '700' } }, 'ACCOUNT'),
        ['Edit Profile', 'Privacy Settings', 'Data & Analytics', 'Help Center', 'Log Out'].map((item, i) =>
          React.createElement('div', {
            key: i,
            style: {
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '12px 0', borderBottom: i < 4 ? `1px solid ${t.cardBorder}` : 'none',
              cursor: 'pointer'
            }
          },
            React.createElement('span', { style: { fontSize: 10, fontWeight: '700', color: item === 'Log Out' ? '#FF4444' : t.text } }, item),
            React.createElement(window.lucide.ChevronRight, { size: 14, color: t.textMuted })
          )
        )
      ),

      React.createElement('div', { style: { textAlign: 'center', fontSize: 8, color: t.textMuted, letterSpacing: 2, paddingBottom: 8 } }, 'TRIBEPULSE v1.0.0 · BETA')
    )
  );
}
