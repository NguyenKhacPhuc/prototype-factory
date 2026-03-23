
function App() {
  const { useState, useEffect, useRef } = React;

  const themes = {
    dark: {
      bg: '#0A0E1A',
      surface: '#111827',
      surfaceAlt: '#1A2236',
      card: '#1E2D42',
      cardBorder: '#2A3F5C',
      text: '#F0F4FF',
      textSecondary: '#8A9BB5',
      textMuted: '#4A5A73',
      primary: '#00D4FF',
      primaryDark: '#0099BB',
      primaryGlow: 'rgba(0,212,255,0.2)',
      accent: '#FF6B35',
      accentGlow: 'rgba(255,107,53,0.2)',
      green: '#00E5A0',
      yellow: '#FFD60A',
      red: '#FF4D6D',
      navBg: '#0D1422',
      navBorder: '#1E2D42',
      statusBar: '#0A0E1A',
    },
    light: {
      bg: '#F0F4FF',
      surface: '#FFFFFF',
      surfaceAlt: '#E8EEFA',
      card: '#FFFFFF',
      cardBorder: '#D0DCF0',
      text: '#0D1422',
      textSecondary: '#4A5A73',
      textMuted: '#8A9BB5',
      primary: '#0077BB',
      primaryDark: '#005A8E',
      primaryGlow: 'rgba(0,119,187,0.15)',
      accent: '#E85A22',
      accentGlow: 'rgba(232,90,34,0.15)',
      green: '#00A870',
      yellow: '#C9A800',
      red: '#D63050',
      navBg: '#FFFFFF',
      navBorder: '#D0DCF0',
      statusBar: '#FFFFFF',
    }
  };

  const [isDark, setIsDark] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const [pressedBtn, setPressedBtn] = useState(null);

  const t = isDark ? themes.dark : themes.light;

  const styleTag = `
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    ::-webkit-scrollbar { width: 0px; }
    .scroll-area { overflow-y: auto; -webkit-overflow-scrolling: touch; }
  `;

  const phoneStyle = {
    width: 375,
    height: 812,
    background: t.bg,
    borderRadius: 44,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: "'Space Grotesk', sans-serif",
    boxShadow: isDark
      ? '0 40px 120px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.06)'
      : '0 40px 120px rgba(0,0,0,0.25), 0 0 0 1px rgba(0,0,0,0.08)',
  };

  const outerStyle = {
    minHeight: '100vh',
    background: isDark ? '#050810' : '#C8D4E8',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  };

  const tabs = [
    { id: 'home', label: 'Race', icon: window.lucide.Zap },
    { id: 'map', label: 'Map', icon: window.lucide.Map },
    { id: 'rivals', label: 'Rivals', icon: window.lucide.Users },
    { id: 'garage', label: 'Garage', icon: window.lucide.Trophy },
    { id: 'settings', label: 'Settings', icon: window.lucide.Settings },
  ];

  function handlePress(id) {
    setPressedBtn(id);
    setTimeout(() => setPressedBtn(null), 150);
  }

  // ─── Status Bar ──────────────────────────────────────────
  function StatusBar() {
    return React.createElement('div', {
      style: {
        background: t.statusBar,
        padding: '14px 24px 6px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexShrink: 0,
      }
    },
      React.createElement('span', { style: { fontSize: 13, fontWeight: 600, color: t.text } }, '9:41'),
      React.createElement('div', {
        style: {
          width: 120, height: 32,
          background: '#000',
          borderRadius: 20,
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          top: 8,
        }
      }),
      React.createElement('div', { style: { display: 'flex', gap: 5, alignItems: 'center' } },
        React.createElement(window.lucide.Wifi, { size: 14, color: t.text }),
        React.createElement(window.lucide.Battery, { size: 16, color: t.text }),
      )
    );
  }

  // ─── Bottom Nav ──────────────────────────────────────────
  function BottomNav() {
    return React.createElement('div', {
      style: {
        background: t.navBg,
        borderTop: `1px solid ${t.navBorder}`,
        display: 'flex',
        padding: '8px 0 20px',
        flexShrink: 0,
      }
    },
      tabs.map(tab => React.createElement('div', {
        key: tab.id,
        onClick: () => setActiveTab(tab.id),
        style: {
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 3,
          cursor: 'pointer',
          padding: '6px 0',
          transition: 'opacity 0.15s',
          opacity: activeTab === tab.id ? 1 : 0.45,
        }
      },
        React.createElement(tab.icon, {
          size: 22,
          color: activeTab === tab.id ? t.primary : t.textSecondary,
          strokeWidth: activeTab === tab.id ? 2.5 : 1.8,
        }),
        React.createElement('span', {
          style: {
            fontSize: 10,
            fontWeight: activeTab === tab.id ? 700 : 500,
            color: activeTab === tab.id ? t.primary : t.textSecondary,
            letterSpacing: 0.3,
          }
        }, tab.label)
      ))
    );
  }

  // ─── HOME SCREEN ─────────────────────────────────────────
  function HomeScreen() {
    const [missionActive, setMissionActive] = useState(false);
    const [elapsed, setElapsed] = useState(0);
    const intervalRef = useRef(null);

    useEffect(() => {
      if (missionActive) {
        intervalRef.current = setInterval(() => setElapsed(e => e + 1), 1000);
      } else {
        clearInterval(intervalRef.current);
        if (!missionActive) setElapsed(0);
      }
      return () => clearInterval(intervalRef.current);
    }, [missionActive]);

    const fmt = s => `${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`;

    const missions = [
      { title: 'Morning Commute Sprint', route: 'Home → Office', dist: '8.4 mi', est: '22 min', diff: 'Tactical', pts: 340, color: t.primary },
      { title: 'School Drop-off Run', route: 'Home → Lincoln Elem', dist: '2.1 mi', est: '6 min', diff: 'Quick', pts: 180, color: t.green },
      { title: 'Rush Hour Recovery', route: 'Downtown → Uptown', dist: '5.7 mi', est: '31 min', diff: 'Expert', pts: 520, color: t.accent },
    ];

    return React.createElement('div', {
      className: 'scroll-area',
      style: { flex: 1, overflowY: 'auto', padding: '0 0 8px' }
    },
      // Hero
      React.createElement('div', {
        style: {
          background: `linear-gradient(135deg, ${t.surface} 0%, ${t.surfaceAlt} 100%)`,
          margin: '12px 16px',
          borderRadius: 20,
          padding: 20,
          border: `1px solid ${t.cardBorder}`,
          position: 'relative',
          overflow: 'hidden',
        }
      },
        React.createElement('div', {
          style: {
            position: 'absolute', top: -20, right: -20,
            width: 120, height: 120,
            background: t.primaryGlow,
            borderRadius: '50%',
            filter: 'blur(30px)',
          }
        }),
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' } },
          React.createElement('div', null,
            React.createElement('div', { style: { fontSize: 11, color: t.primary, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 4 } }, 'Daily Mission'),
            React.createElement('div', { style: { fontSize: 20, fontWeight: 700, color: t.text, lineHeight: 1.2, marginBottom: 6 } }, 'Morning\nCommute Sprint'),
            React.createElement('div', { style: { display: 'flex', gap: 8, flexWrap: 'wrap' } },
              React.createElement('span', { style: { fontSize: 11, color: t.textSecondary, background: t.cardBorder + '66', padding: '3px 8px', borderRadius: 6 } }, '8.4 mi'),
              React.createElement('span', { style: { fontSize: 11, color: t.textSecondary, background: t.cardBorder + '66', padding: '3px 8px', borderRadius: 6 } }, 'Est. 22 min'),
              React.createElement('span', { style: { fontSize: 11, color: t.accent, background: t.accentGlow, padding: '3px 8px', borderRadius: 6, fontWeight: 600 } }, '+340 pts'),
            )
          ),
          React.createElement('div', {
            style: {
              width: 56, height: 56, borderRadius: 16,
              background: `linear-gradient(135deg, ${t.primary}, ${t.primaryDark})`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: `0 4px 20px ${t.primaryGlow}`,
            }
          },
            React.createElement(window.lucide.Navigation, { size: 24, color: '#fff' })
          )
        ),
        React.createElement('div', { style: { height: 1, background: t.cardBorder, margin: '14px 0' } }),
        missionActive
          ? React.createElement('div', null,
              React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 } },
                React.createElement('div', null,
                  React.createElement('div', { style: { fontSize: 11, color: t.textSecondary, marginBottom: 2 } }, 'ELAPSED'),
                  React.createElement('div', { style: { fontSize: 28, fontWeight: 700, color: t.primary, fontVariantNumeric: 'tabular-nums' } }, fmt(elapsed))
                ),
                React.createElement('div', { style: { textAlign: 'right' } },
                  React.createElement('div', { style: { fontSize: 11, color: t.textSecondary, marginBottom: 2 } }, 'COMPOSURE'),
                  React.createElement('div', { style: { fontSize: 28, fontWeight: 700, color: t.green } }, '94%')
                ),
                React.createElement('div', { style: { textAlign: 'right' } },
                  React.createElement('div', { style: { fontSize: 11, color: t.textSecondary, marginBottom: 2 } }, 'SCORE'),
                  React.createElement('div', { style: { fontSize: 28, fontWeight: 700, color: t.accent } }, '218')
                ),
              ),
              React.createElement('button', {
                onClick: () => setMissionActive(false),
                style: {
                  width: '100%', padding: '13px', borderRadius: 14,
                  background: t.red + '22', border: `1px solid ${t.red}44`,
                  color: t.red, fontWeight: 700, fontSize: 14,
                  cursor: 'pointer', fontFamily: 'inherit',
                  transition: 'transform 0.1s',
                }
              }, 'End Mission')
            )
          : React.createElement('button', {
              onClick: () => setMissionActive(true),
              style: {
                width: '100%', padding: '14px',
                borderRadius: 14,
                background: `linear-gradient(135deg, ${t.primary}, ${t.primaryDark})`,
                border: 'none', color: '#fff',
                fontWeight: 700, fontSize: 15,
                cursor: 'pointer', fontFamily: 'inherit',
                boxShadow: `0 6px 24px ${t.primaryGlow}`,
                transform: pressedBtn === 'start' ? 'scale(0.97)' : 'scale(1)',
                transition: 'transform 0.1s',
              },
              onMouseDown: () => handlePress('start'),
            }, '🚦  Start Mission')
      ),

      // Stats Row
      React.createElement('div', {
        style: { display: 'flex', gap: 10, margin: '0 16px 16px', }
      },
        [
          { label: 'Best Time', value: '19:42', icon: window.lucide.Clock, color: t.primary },
          { label: 'Rank', value: '#12', icon: window.lucide.Award, color: t.accent },
          { label: 'Streak', value: '7d', icon: window.lucide.Flame, color: t.yellow },
        ].map((s, i) => React.createElement('div', {
          key: i,
          style: {
            flex: 1, background: t.card, borderRadius: 14,
            padding: '12px 10px', border: `1px solid ${t.cardBorder}`,
            textAlign: 'center',
          }
        },
          React.createElement(s.icon, { size: 18, color: s.color, style: { marginBottom: 4 } }),
          React.createElement('div', { style: { fontSize: 16, fontWeight: 700, color: t.text } }, s.value),
          React.createElement('div', { style: { fontSize: 10, color: t.textMuted, marginTop: 1 } }, s.label),
        ))
      ),

      // Available Missions
      React.createElement('div', { style: { padding: '0 16px' } },
        React.createElement('div', { style: { fontSize: 13, fontWeight: 700, color: t.textSecondary, letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 12 } }, 'Available Missions'),
        missions.map((m, i) => React.createElement('div', {
          key: i,
          style: {
            background: t.card, borderRadius: 16,
            border: `1px solid ${t.cardBorder}`,
            padding: '14px 16px', marginBottom: 10,
            display: 'flex', alignItems: 'center', gap: 14,
            cursor: 'pointer',
          }
        },
          React.createElement('div', {
            style: {
              width: 44, height: 44, borderRadius: 12,
              background: m.color + '22',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }
          },
            React.createElement(window.lucide.MapPin, { size: 20, color: m.color })
          ),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', { style: { fontSize: 14, fontWeight: 600, color: t.text, marginBottom: 2 } }, m.title),
            React.createElement('div', { style: { fontSize: 12, color: t.textSecondary } }, `${m.route} · ${m.dist} · ${m.est}`),
          ),
          React.createElement('div', { style: { textAlign: 'right' } },
            React.createElement('div', { style: { fontSize: 13, fontWeight: 700, color: m.color } }, `+${m.pts}`),
            React.createElement('div', { style: { fontSize: 10, color: t.textMuted } }, m.diff),
          )
        ))
      )
    );
  }

  // ─── MAP SCREEN ──────────────────────────────────────────
  function MapScreen() {
    const [selected, setSelected] = useState(0);
    const routes = [
      { name: 'Fastest Route', time: '19 min', dist: '8.4 mi', pts: 340, type: 'Tactical', color: t.primary, savings: '3 min faster' },
      { name: 'Flow Route', time: '22 min', dist: '9.1 mi', pts: 280, type: 'Smooth', color: t.green, savings: 'Less braking' },
      { name: 'Challenge Route', time: '24 min', dist: '7.8 mi', pts: 520, type: 'Expert', color: t.accent, savings: '+180 bonus pts' },
    ];

    const objectives = [
      { icon: '🔀', label: 'Anticipate merge at Oak & 5th', pts: 80, done: false },
      { icon: '🚦', label: 'No hard braking on Main St', pts: 60, done: true },
      { icon: '⚡', label: 'Take Elm Ave detour under 4 min', pts: 120, done: false },
      { icon: '🧭', label: 'Maintain flow through downtown', pts: 80, done: true },
    ];

    return React.createElement('div', {
      className: 'scroll-area',
      style: { flex: 1, overflowY: 'auto' }
    },
      // Map placeholder
      React.createElement('div', {
        style: {
          height: 220, margin: '12px 16px',
          borderRadius: 20,
          background: isDark
            ? 'linear-gradient(135deg, #0D1E2E 0%, #0A2040 40%, #0D2035 100%)'
            : 'linear-gradient(135deg, #C8DFF0 0%, #B0D0E8 100%)',
          border: `1px solid ${t.cardBorder}`,
          position: 'relative', overflow: 'hidden',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }
      },
        // Grid lines
        ...[0,1,2,3,4].map(i => React.createElement('div', {
          key: `h${i}`, style: {
            position: 'absolute', left: 0, right: 0,
            top: `${20 + i * 18}%`, height: 1,
            background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.06)',
          }
        })),
        ...[0,1,2,3,4,5].map(i => React.createElement('div', {
          key: `v${i}`, style: {
            position: 'absolute', top: 0, bottom: 0,
            left: `${8 + i * 16}%`, width: 1,
            background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.06)',
          }
        })),
        // Route line
        React.createElement('svg', {
          style: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' },
          viewBox: '0 0 375 220',
        },
          React.createElement('polyline', {
            points: '40,180 80,160 120,140 160,110 200,100 240,80 290,55 340,40',
            fill: 'none', stroke: t.primary, strokeWidth: 3,
            strokeDasharray: '6,3', opacity: 0.9,
          }),
          React.createElement('polyline', {
            points: '40,180 70,170 110,155 160,130 210,115 270,90 320,65 340,40',
            fill: 'none', stroke: t.green, strokeWidth: 2,
            strokeDasharray: '4,4', opacity: 0.6,
          }),
          React.createElement('circle', { cx: 40, cy: 180, r: 7, fill: t.green }),
          React.createElement('circle', { cx: 340, cy: 40, r: 7, fill: t.accent }),
        ),
        // Labels
        React.createElement('div', {
          style: { position: 'absolute', bottom: 12, left: 12, background: t.surface + 'EE', borderRadius: 8, padding: '4px 10px' }
        },
          React.createElement('span', { style: { fontSize: 11, fontWeight: 600, color: t.green } }, '● Home'),
        ),
        React.createElement('div', {
          style: { position: 'absolute', top: 12, right: 12, background: t.surface + 'EE', borderRadius: 8, padding: '4px 10px' }
        },
          React.createElement('span', { style: { fontSize: 11, fontWeight: 600, color: t.accent } }, '● Office'),
        ),
        // Traffic blob
        React.createElement('div', {
          style: {
            position: 'absolute', top: '40%', left: '52%',
            width: 40, height: 30,
            background: t.red + '44', borderRadius: 8,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }
        },
          React.createElement('span', { style: { fontSize: 9, fontWeight: 700, color: t.red } }, 'JAM')
        ),
      ),

      // Route options
      React.createElement('div', { style: { padding: '0 16px 12px' } },
        React.createElement('div', { style: { fontSize: 13, fontWeight: 700, color: t.textSecondary, letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 10 } }, 'Route Options'),
        routes.map((r, i) => React.createElement('div', {
          key: i,
          onClick: () => setSelected(i),
          style: {
            background: selected === i ? r.color + '15' : t.card,
            borderRadius: 14, border: `1.5px solid ${selected === i ? r.color : t.cardBorder}`,
            padding: '12px 14px', marginBottom: 8,
            display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer',
            transition: 'all 0.2s',
          }
        },
          React.createElement('div', {
            style: {
              width: 10, height: 10, borderRadius: '50%',
              background: r.color, flexShrink: 0,
              boxShadow: selected === i ? `0 0 8px ${r.color}` : 'none',
            }
          }),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between' } },
              React.createElement('span', { style: { fontSize: 14, fontWeight: 600, color: t.text } }, r.name),
              React.createElement('span', { style: { fontSize: 13, fontWeight: 700, color: r.color } }, `+${r.pts} pts`),
            ),
            React.createElement('div', { style: { display: 'flex', gap: 8, marginTop: 3 } },
              React.createElement('span', { style: { fontSize: 11, color: t.textSecondary } }, r.time),
              React.createElement('span', { style: { fontSize: 11, color: t.textSecondary } }, '·'),
              React.createElement('span', { style: { fontSize: 11, color: t.textSecondary } }, r.dist),
              React.createElement('span', { style: { fontSize: 11, color: t.textSecondary } }, '·'),
              React.createElement('span', { style: { fontSize: 11, color: r.color, fontWeight: 600 } }, r.savings),
            )
          )
        )),
      ),

      // Micro-objectives
      React.createElement('div', { style: { padding: '0 16px 16px' } },
        React.createElement('div', { style: { fontSize: 13, fontWeight: 700, color: t.textSecondary, letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 10 } }, 'Micro-Objectives'),
        objectives.map((o, i) => React.createElement('div', {
          key: i,
          style: {
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '10px 14px', background: t.card,
            borderRadius: 12, marginBottom: 6,
            border: `1px solid ${t.cardBorder}`,
            opacity: o.done ? 0.55 : 1,
          }
        },
          React.createElement('span', { style: { fontSize: 18 } }, o.icon),
          React.createElement('span', { style: { flex: 1, fontSize: 13, color: t.text, textDecoration: o.done ? 'line-through' : 'none' } }, o.label),
          React.createElement('span', { style: { fontSize: 12, fontWeight: 700, color: o.done ? t.green : t.textMuted } }, o.done ? '✓' : `+${o.pts}`)
        ))
      ),
    );
  }

  // ─── RIVALS SCREEN ───────────────────────────────────────
  function RivalsScreen() {
    const [tab, setTab] = useState('nearby');

    const rivals = {
      nearby: [
        { name: 'Alex M.', route: 'Home → Office', time: '18:34', delta: '-1:08', rank: 1, pts: 12450, avatar: '🏎️' },
        { name: 'You', route: 'Home → Office', time: '19:42', delta: 'Personal Best', rank: 2, pts: 11200, avatar: '⚡', isMe: true },
        { name: 'Jordan K.', route: 'Home → Office', time: '20:15', delta: '+0:33', rank: 3, pts: 10800, avatar: '🚗' },
        { name: 'Sam T.', route: 'Home → Office', time: '21:03', delta: '+1:21', rank: 4, pts: 9950, avatar: '🚙' },
        { name: 'Riley P.', route: 'Home → Office', time: '22:47', delta: '+3:05', rank: 5, pts: 8720, avatar: '🛻' },
      ],
      friends: [
        { name: 'Chris D.', route: 'Elm Ave', time: '14:22', delta: '-2:10', rank: 1, pts: 15200, avatar: '🏁' },
        { name: 'You', route: 'Elm Ave', time: '16:32', delta: 'Your Best', rank: 3, pts: 11200, avatar: '⚡', isMe: true },
        { name: 'Taylor W.', route: 'Elm Ave', time: '17:05', delta: '+0:33', rank: 4, pts: 10400, avatar: '🚘' },
      ],
    };

    const current = rivals[tab] || [];

    return React.createElement('div', {
      className: 'scroll-area',
      style: { flex: 1, overflowY: 'auto', padding: '12px 16px' }
    },
      React.createElement('div', { style: { marginBottom: 16 } },
        React.createElement('div', { style: { fontSize: 22, fontWeight: 700, color: t.text, marginBottom: 4 } }, 'Commute Rivals'),
        React.createElement('div', { style: { fontSize: 13, color: t.textSecondary } }, 'Race against friends on the same route'),
      ),
      // Tab toggle
      React.createElement('div', {
        style: {
          display: 'flex', background: t.surfaceAlt,
          borderRadius: 12, padding: 4, marginBottom: 16,
        }
      },
        ['nearby', 'friends'].map(id => React.createElement('button', {
          key: id,
          onClick: () => setTab(id),
          style: {
            flex: 1, padding: '8px', borderRadius: 9,
            border: 'none', cursor: 'pointer',
            fontFamily: 'inherit', fontSize: 13, fontWeight: 600,
            background: tab === id ? t.primary : 'transparent',
            color: tab === id ? '#fff' : t.textSecondary,
            transition: 'all 0.2s',
          }
        }, id === 'nearby' ? 'Nearby Drivers' : 'Friends'))
      ),

      // Leaderboard
      current.map((r, i) => React.createElement('div', {
        key: i,
        style: {
          display: 'flex', alignItems: 'center', gap: 12,
          padding: '14px', background: r.isMe ? t.primaryGlow : t.card,
          borderRadius: 16, marginBottom: 8,
          border: `1.5px solid ${r.isMe ? t.primary + '44' : t.cardBorder}`,
        }
      },
        React.createElement('div', { style: { fontSize: 13, fontWeight: 700, color: r.rank <= 3 ? [t.yellow, t.textSecondary, '#CD7F32'][r.rank-1] : t.textMuted, width: 20, textAlign: 'center' } }, `#${r.rank}`),
        React.createElement('div', {
          style: {
            width: 42, height: 42, borderRadius: 13,
            background: t.surfaceAlt,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 20, flexShrink: 0,
            border: `1.5px solid ${r.isMe ? t.primary : t.cardBorder}`,
          }
        }, r.avatar),
        React.createElement('div', { style: { flex: 1 } },
          React.createElement('div', { style: { fontSize: 14, fontWeight: r.isMe ? 700 : 600, color: r.isMe ? t.primary : t.text } }, r.name),
          React.createElement('div', { style: { fontSize: 11, color: t.textSecondary, marginTop: 1 } }, r.route),
        ),
        React.createElement('div', { style: { textAlign: 'right' } },
          React.createElement('div', { style: { fontSize: 15, fontWeight: 700, color: t.text, fontVariantNumeric: 'tabular-nums' } }, r.time),
          React.createElement('div', { style: { fontSize: 11, color: r.delta.startsWith('-') ? t.green : r.delta.startsWith('+') ? t.red : t.primary, marginTop: 1 } }, r.delta),
        )
      )),

      // Challenge card
      React.createElement('div', {
        style: {
          margin: '16px 0',
          background: `linear-gradient(135deg, ${t.accent}22, ${t.accent}11)`,
          border: `1px solid ${t.accent}44`,
          borderRadius: 16, padding: '16px',
          display: 'flex', alignItems: 'center', gap: 14,
        }
      },
        React.createElement('div', {
          style: { width: 46, height: 46, borderRadius: 13, background: t.accent + '33', display: 'flex', alignItems: 'center', justifyContent: 'center' }
        },
          React.createElement(window.lucide.Swords, { size: 22, color: t.accent })
        ),
        React.createElement('div', { style: { flex: 1 } },
          React.createElement('div', { style: { fontSize: 15, fontWeight: 700, color: t.text } }, 'Challenge Alex M.'),
          React.createElement('div', { style: { fontSize: 12, color: t.textSecondary, marginTop: 2 } }, 'Beat their 18:34 on Home → Office'),
        ),
        React.createElement('button', {
          style: {
            padding: '8px 16px', borderRadius: 10,
            background: t.accent, border: 'none',
            color: '#fff', fontWeight: 700, fontSize: 13,
            cursor: 'pointer', fontFamily: 'inherit',
          }
        }, 'Race')
      ),
    );
  }

  // ─── GARAGE SCREEN ───────────────────────────────────────
  function GarageScreen() {
    const [xp, setXp] = useState(6840);
    const maxXp = 8000;
    const level = 12;

    const achievements = [
      { icon: '🏆', title: 'Smooth Operator', desc: 'Zero hard brakes in 5 missions', earned: true },
      { icon: '⚡', title: 'Flow State', desc: 'Maintain 90%+ composure for 3 days', earned: true },
      { icon: '🗺️', title: 'Route Pioneer', desc: 'Discover 3 new alternate routes', earned: true },
      { icon: '🔥', title: 'Week Warrior', desc: 'Complete daily missions 7 days straight', earned: false, progress: 5, total: 7 },
      { icon: '🌟', title: 'Top 10 Rival', desc: 'Reach rank #10 on any route', earned: false, progress: 12, total: 10 },
      { icon: '🏁', title: 'Speed Strategist', desc: 'Beat personal best 10 times', earned: false, progress: 6, total: 10 },
    ];

    const upgrades = [
      { name: 'Predictive Merge', desc: 'See merge warnings 200m earlier', cost: 500, owned: true, icon: '🔀' },
      { name: 'Traffic Oracle', desc: 'Real-time congestion heat maps', cost: 800, owned: true, icon: '🔮' },
      { name: 'Turbo Reroute', desc: 'Instant alternate route suggestions', cost: 1200, owned: false, icon: '⚡' },
      { name: 'Ghost Mode', desc: 'See top rivals ghost paths on map', cost: 1500, owned: false, icon: '👻' },
    ];

    return React.createElement('div', {
      className: 'scroll-area',
      style: { flex: 1, overflowY: 'auto', padding: '12px 16px' }
    },
      // XP Card
      React.createElement('div', {
        style: {
          background: `linear-gradient(135deg, ${t.primary}22, ${t.accent}11)`,
          border: `1px solid ${t.primary}33`,
          borderRadius: 20, padding: '18px', marginBottom: 16,
        }
      },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 } },
          React.createElement('div', null,
            React.createElement('div', { style: { fontSize: 12, color: t.primary, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase' } }, 'Driver Level'),
            React.createElement('div', { style: { fontSize: 32, fontWeight: 700, color: t.text, lineHeight: 1.1 } }, `Lv. ${level}`),
            React.createElement('div', { style: { fontSize: 12, color: t.textSecondary, marginTop: 2 } }, 'Tactical Racer'),
          ),
          React.createElement('div', { style: { fontSize: 48 } }, '🏎️'),
        ),
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: 6 } },
          React.createElement('span', { style: { fontSize: 11, color: t.textSecondary } }, `${xp.toLocaleString()} XP`),
          React.createElement('span', { style: { fontSize: 11, color: t.textSecondary } }, `${maxXp.toLocaleString()} XP`),
        ),
        React.createElement('div', {
          style: { height: 8, background: t.cardBorder, borderRadius: 4, overflow: 'hidden' }
        },
          React.createElement('div', {
            style: {
              height: '100%', width: `${(xp/maxXp)*100}%`,
              background: `linear-gradient(90deg, ${t.primary}, ${t.accent})`,
              borderRadius: 4, transition: 'width 0.5s ease',
            }
          })
        ),
        React.createElement('div', { style: { fontSize: 11, color: t.textSecondary, marginTop: 6 } }, `${(maxXp-xp).toLocaleString()} XP to Level ${level+1}`)
      ),

      // Stats Grid
      React.createElement('div', {
        style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }
      },
        [
          { label: 'Missions', value: '147', icon: '🎯', color: t.primary },
          { label: 'Total Points', value: '11,200', icon: '⭐', color: t.yellow },
          { label: 'Avg Composure', value: '87%', icon: '🧘', color: t.green },
          { label: 'Time Saved', value: '3.2 hrs', icon: '⏱️', color: t.accent },
        ].map((s, i) => React.createElement('div', {
          key: i,
          style: {
            background: t.card, borderRadius: 14,
            border: `1px solid ${t.cardBorder}`,
            padding: '14px',
          }
        },
          React.createElement('div', { style: { fontSize: 20, marginBottom: 6 } }, s.icon),
          React.createElement('div', { style: { fontSize: 18, fontWeight: 700, color: t.text } }, s.value),
          React.createElement('div', { style: { fontSize: 11, color: t.textMuted } }, s.label),
        ))
      ),

      // Upgrades
      React.createElement('div', { style: { fontSize: 13, fontWeight: 700, color: t.textSecondary, letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 10 } }, 'Upgrades'),
      upgrades.map((u, i) => React.createElement('div', {
        key: i,
        style: {
          display: 'flex', alignItems: 'center', gap: 12,
          padding: '12px 14px', background: t.card,
          borderRadius: 14, marginBottom: 8,
          border: `1px solid ${u.owned ? t.primary + '33' : t.cardBorder}`,
        }
      },
        React.createElement('span', { style: { fontSize: 22 } }, u.icon),
        React.createElement('div', { style: { flex: 1 } },
          React.createElement('div', { style: { fontSize: 14, fontWeight: 600, color: t.text } }, u.name),
          React.createElement('div', { style: { fontSize: 11, color: t.textSecondary, marginTop: 1 } }, u.desc),
        ),
        u.owned
          ? React.createElement('span', { style: { fontSize: 11, color: t.green, fontWeight: 700, background: t.green + '22', padding: '3px 8px', borderRadius: 6 } }, 'Owned')
          : React.createElement('button', {
              style: {
                padding: '6px 12px', borderRadius: 8,
                background: t.surfaceAlt, border: `1px solid ${t.cardBorder}`,
                color: t.text, fontWeight: 600, fontSize: 12,
                cursor: 'pointer', fontFamily: 'inherit',
              }
            }, `${u.cost} pts`)
      )),

      // Achievements
      React.createElement('div', { style: { fontSize: 13, fontWeight: 700, color: t.textSecondary, letterSpacing: 0.8, textTransform: 'uppercase', margin: '16px 0 10px' } }, 'Achievements'),
      achievements.map((a, i) => React.createElement('div', {
        key: i,
        style: {
          display: 'flex', alignItems: 'center', gap: 12,
          padding: '12px 14px', background: t.card,
          borderRadius: 14, marginBottom: 8,
          border: `1px solid ${a.earned ? t.yellow + '33' : t.cardBorder}`,
          opacity: a.earned ? 1 : 0.7,
        }
      },
        React.createElement('span', { style: { fontSize: 22 } }, a.icon),
        React.createElement('div', { style: { flex: 1 } },
          React.createElement('div', { style: { fontSize: 14, fontWeight: 600, color: t.text } }, a.title),
          React.createElement('div', { style: { fontSize: 11, color: t.textSecondary } }, a.desc),
          !a.earned && a.progress !== undefined && React.createElement('div', {
            style: { height: 4, background: t.cardBorder, borderRadius: 2, marginTop: 6, overflow: 'hidden' }
          },
            React.createElement('div', {
              style: {
                height: '100%',
                width: `${Math.min((a.progress/a.total)*100,100)}%`,
                background: t.yellow, borderRadius: 2,
              }
            })
          ),
        ),
        a.earned && React.createElement(window.lucide.CheckCircle, { size: 18, color: t.yellow }),
      ))
    );
  }

  // ─── SETTINGS SCREEN ─────────────────────────────────────
  function SettingsScreen() {
    const [notifications, setNotifications] = useState(true);
    const [soundEffects, setSoundEffects] = useState(true);
    const [liveTracking, setLiveTracking] = useState(false);
    const [haptics, setHaptics] = useState(true);

    function Toggle({ value, onChange }) {
      return React.createElement('div', {
        onClick: () => onChange(!value),
        style: {
          width: 44, height: 26, borderRadius: 13,
          background: value ? t.primary : t.cardBorder,
          position: 'relative', cursor: 'pointer',
          transition: 'background 0.2s',
          flexShrink: 0,
        }
      },
        React.createElement('div', {
          style: {
            width: 20, height: 20, borderRadius: '50%',
            background: '#fff',
            position: 'absolute', top: 3,
            left: value ? 21 : 3,
            transition: 'left 0.2s',
            boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
          }
        })
      );
    }

    const settingGroups = [
      {
        title: 'Appearance',
        items: [
          {
            label: 'Dark Mode',
            desc: 'Switch between light and dark theme',
            control: React.createElement(Toggle, { value: isDark, onChange: setIsDark }),
          },
        ]
      },
      {
        title: 'Notifications',
        items: [
          { label: 'Mission Alerts', desc: 'Get notified when new missions start', control: React.createElement(Toggle, { value: notifications, onChange: setNotifications }) },
          { label: 'Rival Updates', desc: 'Alert when rivals beat your time', control: React.createElement(Toggle, { value: true, onChange: () => {} }) },
        ]
      },
      {
        title: 'Racing',
        items: [
          { label: 'Sound Effects', desc: 'In-mission audio feedback', control: React.createElement(Toggle, { value: soundEffects, onChange: setSoundEffects }) },
          { label: 'Haptic Feedback', desc: 'Vibrations for milestones', control: React.createElement(Toggle, { value: haptics, onChange: setHaptics }) },
          { label: 'Live Tracking', desc: 'Share real-time position with rivals', control: React.createElement(Toggle, { value: liveTracking, onChange: setLiveTracking }) },
        ]
      },
    ];

    return React.createElement('div', {
      className: 'scroll-area',
      style: { flex: 1, overflowY: 'auto', padding: '12px 16px' }
    },
      // Profile card
      React.createElement('div', {
        style: {
          background: t.card, borderRadius: 20,
          border: `1px solid ${t.cardBorder}`,
          padding: '18px', marginBottom: 20,
          display: 'flex', alignItems: 'center', gap: 14,
        }
      },
        React.createElement('div', {
          style: {
            width: 60, height: 60, borderRadius: 18,
            background: `linear-gradient(135deg, ${t.primary}, ${t.accent})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 28,
          }
        }, '⚡'),
        React.createElement('div', { style: { flex: 1 } },
          React.createElement('div', { style: { fontSize: 18, fontWeight: 700, color: t.text } }, 'Alex Rivera'),
          React.createElement('div', { style: { fontSize: 12, color: t.textSecondary, marginTop: 2 } }, 'Lv. 12 · Tactical Racer'),
          React.createElement('div', { style: { fontSize: 11, color: t.primary, marginTop: 2 } }, '11,200 total points'),
        ),
        React.createElement(window.lucide.ChevronRight, { size: 18, color: t.textMuted })
      ),

      settingGroups.map((g, gi) => React.createElement('div', { key: gi, style: { marginBottom: 20 } },
        React.createElement('div', { style: { fontSize: 12, fontWeight: 700, color: t.textSecondary, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8, paddingLeft: 4 } }, g.title),
        React.createElement('div', {
          style: { background: t.card, borderRadius: 16, border: `1px solid ${t.cardBorder}`, overflow: 'hidden' }
        },
          g.items.map((item, ii) => React.createElement('div', {
            key: ii,
            style: {
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '14px 16px',
              borderBottom: ii < g.items.length - 1 ? `1px solid ${t.cardBorder}` : 'none',
            }
          },
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', { style: { fontSize: 14, fontWeight: 500, color: t.text } }, item.label),
              React.createElement('div', { style: { fontSize: 11, color: t.textMuted, marginTop: 1 } }, item.desc),
            ),
            item.control,
          ))
        )
      )),

      // Version
      React.createElement('div', { style: { textAlign: 'center', padding: '8px 0 24px' } },
        React.createElement('div', { style: { fontSize: 11, color: t.textMuted } }, 'LaneShift v1.2.0'),
        React.createElement('div', { style: { fontSize: 11, color: t.textMuted, marginTop: 2 } }, 'Turn commute stress into street-smart racing.'),
      )
    );
  }

  const screens = {
    home: HomeScreen,
    map: MapScreen,
    rivals: RivalsScreen,
    garage: GarageScreen,
    settings: SettingsScreen,
  };

  return React.createElement('div', { style: outerStyle },
    React.createElement('style', null, styleTag),
    React.createElement('div', { style: phoneStyle },
      React.createElement(StatusBar),
      React.createElement(screens[activeTab]),
      React.createElement(BottomNav),
    )
  );
}
