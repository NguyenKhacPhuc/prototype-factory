
const { useState, useEffect, useRef } = React;

const themes = {
  light: {
    bg: '#F0F4FF',
    surface: '#FFFFFF',
    surfaceAlt: '#F5F7FF',
    card: '#FFFFFF',
    primary: '#4F46E5',
    primaryLight: '#818CF8',
    primaryDark: '#3730A3',
    accent: '#06B6D4',
    accentLight: '#67E8F9',
    success: '#10B981',
    warning: '#F59E0B',
    danger: '#EF4444',
    text: '#0F172A',
    textSecondary: '#475569',
    textMuted: '#94A3B8',
    border: '#E2E8F0',
    navBg: '#FFFFFF',
    statusBar: '#0F172A',
    gradientFrom: '#4F46E5',
    gradientTo: '#06B6D4',
    shadow: 'rgba(79,70,229,0.15)',
  },
  dark: {
    bg: '#0A0A1A',
    surface: '#131326',
    surfaceAlt: '#1A1A33',
    card: '#1E1E38',
    primary: '#818CF8',
    primaryLight: '#A5B4FC',
    primaryDark: '#4F46E5',
    accent: '#22D3EE',
    accentLight: '#67E8F9',
    success: '#34D399',
    warning: '#FBBF24',
    danger: '#F87171',
    text: '#F1F5F9',
    textSecondary: '#94A3B8',
    textMuted: '#475569',
    border: '#1E293B',
    navBg: '#131326',
    statusBar: '#F1F5F9',
    gradientFrom: '#6366F1',
    gradientTo: '#22D3EE',
    shadow: 'rgba(99,102,241,0.25)',
  }
};

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isDark, setIsDark] = useState(false);
  const [pressedTab, setPressedTab] = useState(null);

  const t = isDark ? themes.dark : themes.light;

  const tabs = [
    { id: 'home', label: 'Home', icon: window.lucide.Zap },
    { id: 'explore', label: 'Explore', icon: window.lucide.Map },
    { id: 'play', label: 'Play', icon: window.lucide.Play },
    { id: 'progress', label: 'Progress', icon: window.lucide.BarChart2 },
    { id: 'profile', label: 'Profile', icon: window.lucide.User },
  ];

  const screens = {
    home: HomeScreen,
    explore: ExploreScreen,
    play: PlayScreen,
    progress: ProgressScreen,
    profile: ProfileScreen,
  };

  const fontLink = React.createElement('style', { key: 'font' }, `
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    ::-webkit-scrollbar { display: none; }
  `);

  const phoneStyle = {
    width: 375,
    height: 812,
    background: t.bg,
    borderRadius: 50,
    overflow: 'hidden',
    position: 'relative',
    boxShadow: `0 40px 80px rgba(0,0,0,0.35), 0 0 0 10px #1a1a2e, 0 0 0 12px #2d2d4e`,
    fontFamily: "'Space Grotesk', sans-serif",
    display: 'flex',
    flexDirection: 'column',
  };

  const wrapperStyle = {
    minHeight: '100vh',
    background: '#0D0D1A',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const contentStyle = {
    flex: 1,
    overflowY: 'auto',
    overflowX: 'hidden',
  };

  const navStyle = {
    height: 80,
    background: t.navBg,
    borderTop: `1px solid ${t.border}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingBottom: 10,
    flexShrink: 0,
  };

  return React.createElement('div', { style: wrapperStyle },
    fontLink,
    React.createElement('div', { style: phoneStyle },
      React.createElement(StatusBar, { t, isDark }),
      React.createElement(DynamicIsland),
      React.createElement('div', { style: contentStyle },
        React.createElement(screens[activeTab], { t, isDark, setIsDark })
      ),
      React.createElement('div', { style: navStyle },
        tabs.map(tab => {
          const isActive = activeTab === tab.id;
          const isPlay = tab.id === 'play';
          const navItemStyle = {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 3,
            cursor: 'pointer',
            transition: 'transform 0.15s ease',
            transform: pressedTab === tab.id ? 'scale(0.88)' : 'scale(1)',
            padding: isPlay ? '0' : '6px 12px',
          };

          const labelStyle = {
            fontSize: 10,
            fontWeight: isActive ? 600 : 400,
            color: isActive ? t.primary : t.textMuted,
            fontFamily: "'Space Grotesk', sans-serif",
          };

          if (isPlay) {
            return React.createElement('div', {
              key: tab.id,
              onClick: () => setActiveTab(tab.id),
              onMouseDown: () => setPressedTab(tab.id),
              onMouseUp: () => setPressedTab(null),
              style: {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 3,
                cursor: 'pointer',
                transform: pressedTab === 'play' ? 'scale(0.88) translateY(0)' : 'translateY(-18px)',
                transition: 'transform 0.15s ease',
              }
            },
              React.createElement('div', {
                style: {
                  width: 56,
                  height: 56,
                  borderRadius: 28,
                  background: `linear-gradient(135deg, ${t.gradientFrom}, ${t.gradientTo})`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: `0 8px 24px ${t.shadow}`,
                }
              }, React.createElement(tab.icon, { size: 26, color: '#fff', strokeWidth: 2.5 })),
              React.createElement('span', { style: { ...labelStyle, color: isActive ? t.primary : t.textMuted } }, tab.label)
            );
          }

          return React.createElement('div', {
            key: tab.id,
            onClick: () => setActiveTab(tab.id),
            onMouseDown: () => setPressedTab(tab.id),
            onMouseUp: () => setPressedTab(null),
            style: navItemStyle
          },
            React.createElement(tab.icon, {
              size: 22,
              color: isActive ? t.primary : t.textMuted,
              strokeWidth: isActive ? 2.5 : 1.8,
            }),
            React.createElement('span', { style: labelStyle }, tab.label)
          );
        })
      )
    )
  );
}

function DynamicIsland() {
  return React.createElement('div', {
    style: {
      position: 'absolute',
      top: 14,
      left: '50%',
      transform: 'translateX(-50%)',
      width: 120,
      height: 34,
      background: '#000',
      borderRadius: 20,
      zIndex: 100,
    }
  });
}

function StatusBar({ t, isDark }) {
  const [time, setTime] = useState(() => {
    const n = new Date();
    return `${n.getHours()}:${String(n.getMinutes()).padStart(2, '0')}`;
  });

  useEffect(() => {
    const id = setInterval(() => {
      const n = new Date();
      setTime(`${n.getHours()}:${String(n.getMinutes()).padStart(2, '0')}`);
    }, 10000);
    return () => clearInterval(id);
  }, []);

  return React.createElement('div', {
    style: {
      height: 54,
      paddingTop: 14,
      paddingLeft: 28,
      paddingRight: 28,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexShrink: 0,
      zIndex: 50,
      position: 'relative',
    }
  },
    React.createElement('span', {
      style: { fontSize: 15, fontWeight: 700, color: t.statusBar, fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '-0.3px' }
    }, time),
    React.createElement('div', { style: { display: 'flex', gap: 6, alignItems: 'center' } },
      React.createElement(window.lucide.Wifi, { size: 15, color: t.statusBar }),
      React.createElement(window.lucide.Signal, { size: 15, color: t.statusBar }),
      React.createElement(window.lucide.Battery, { size: 17, color: t.statusBar }),
    )
  );
}

// ============ HOME SCREEN ============
function HomeScreen({ t, isDark, setIsDark }) {
  const [activeMission, setActiveMission] = useState(null);

  const missions = [
    { id: 1, title: 'Cone Dash Sprint', type: 'Solo', difficulty: 'Easy', duration: '8 min', xp: 120, icon: '⚡', color: '#F59E0B', sport: 'Football' },
    { id: 2, title: 'Reaction Pivot Drill', type: 'Solo', difficulty: 'Medium', duration: '12 min', xp: 200, icon: '🎯', color: '#06B6D4', sport: 'Basketball' },
    { id: 3, title: 'Moving Target Pass', type: 'VS', difficulty: 'Hard', duration: '15 min', xp: 350, icon: '🏃', color: '#8B5CF6', sport: 'Soccer' },
  ];

  const nearbyZones = [
    { name: 'Riverside Park', distance: '0.3 mi', active: 4, type: 'Open Field' },
    { name: 'Tech Campus Plaza', distance: '0.8 mi', active: 2, type: 'Urban Court' },
  ];

  return React.createElement('div', { style: { padding: '0 0 16px 0' } },
    // Header
    React.createElement('div', {
      style: {
        padding: '8px 20px 20px',
        background: `linear-gradient(160deg, ${t.gradientFrom}ee, ${t.gradientTo}cc)`,
        borderRadius: '0 0 28px 28px',
        position: 'relative',
        overflow: 'hidden',
      }
    },
      React.createElement('div', {
        style: {
          position: 'absolute', top: -40, right: -40,
          width: 160, height: 160,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.08)',
        }
      }),
      React.createElement('div', {
        style: {
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16
        }
      },
        React.createElement('div', null,
          React.createElement('p', { style: { color: 'rgba(255,255,255,0.75)', fontSize: 13, fontWeight: 500 } }, 'Good afternoon,'),
          React.createElement('h2', { style: { color: '#fff', fontSize: 22, fontWeight: 700, letterSpacing: '-0.5px' } }, 'Alex Rivera 👋'),
        ),
        React.createElement('div', {
          style: {
            width: 40, height: 40, borderRadius: 20,
            background: 'rgba(255,255,255,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
          }
        }, React.createElement(window.lucide.Bell, { size: 18, color: '#fff' }))
      ),
      // Stats row
      React.createElement('div', { style: { display: 'flex', gap: 10 } },
        [
          { label: 'Streak', value: '12d', icon: '🔥' },
          { label: 'This Week', value: '4 runs', icon: '📍' },
          { label: 'League Rank', value: '#23', icon: '🏆' },
        ].map((s, i) =>
          React.createElement('div', {
            key: i,
            style: {
              flex: 1,
              background: 'rgba(255,255,255,0.15)',
              borderRadius: 14,
              padding: '10px 8px',
              textAlign: 'center',
              backdropFilter: 'blur(4px)',
            }
          },
            React.createElement('div', { style: { fontSize: 16 } }, s.icon),
            React.createElement('div', { style: { color: '#fff', fontSize: 15, fontWeight: 700, marginTop: 2 } }, s.value),
            React.createElement('div', { style: { color: 'rgba(255,255,255,0.65)', fontSize: 10 } }, s.label),
          )
        )
      )
    ),

    // Nearby Zones
    React.createElement('div', { style: { padding: '18px 20px 0' } },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 } },
        React.createElement('h3', { style: { color: t.text, fontSize: 16, fontWeight: 700 } }, 'Nearby Zones'),
        React.createElement('span', { style: { color: t.primary, fontSize: 12, fontWeight: 600, cursor: 'pointer' } }, 'See all')
      ),
      React.createElement('div', { style: { display: 'flex', gap: 10 } },
        nearbyZones.map((z, i) =>
          React.createElement('div', {
            key: i,
            style: {
              flex: 1,
              background: t.card,
              borderRadius: 16,
              padding: 14,
              border: `1px solid ${t.border}`,
              boxShadow: `0 2px 12px ${t.shadow}`,
            }
          },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 } },
              React.createElement('div', { style: { width: 8, height: 8, borderRadius: 4, background: t.success } }),
              React.createElement('span', { style: { color: t.success, fontSize: 10, fontWeight: 600 } }, `${z.active} active`),
            ),
            React.createElement('p', { style: { color: t.text, fontSize: 13, fontWeight: 600, marginBottom: 2 } }, z.name),
            React.createElement('p', { style: { color: t.textMuted, fontSize: 11 } }, `${z.distance} · ${z.type}`),
          )
        )
      )
    ),

    // Quick Play Mission
    React.createElement('div', { style: { padding: '18px 20px 0' } },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 } },
        React.createElement('h3', { style: { color: t.text, fontSize: 16, fontWeight: 700 } }, 'Today\'s Missions'),
        React.createElement('span', { style: { color: t.primary, fontSize: 12, fontWeight: 600 } }, 'Refresh')
      ),
      missions.map((m, i) =>
        React.createElement('div', {
          key: m.id,
          onClick: () => setActiveMission(activeMission === m.id ? null : m.id),
          style: {
            background: t.card,
            borderRadius: 18,
            padding: '14px 16px',
            marginBottom: 10,
            border: activeMission === m.id ? `2px solid ${t.primary}` : `1px solid ${t.border}`,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            boxShadow: activeMission === m.id ? `0 4px 20px ${t.shadow}` : `0 2px 8px rgba(0,0,0,0.05)`,
          }
        },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12 } },
            React.createElement('div', {
              style: {
                width: 46, height: 46, borderRadius: 14,
                background: `${m.color}22`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 22,
              }
            }, m.icon),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('p', { style: { color: t.text, fontSize: 14, fontWeight: 600 } }, m.title),
              React.createElement('div', { style: { display: 'flex', gap: 8, marginTop: 3 } },
                React.createElement('span', { style: { color: t.textMuted, fontSize: 11 } }, m.sport),
                React.createElement('span', { style: { color: t.textMuted, fontSize: 11 } }, '·'),
                React.createElement('span', { style: { color: t.textMuted, fontSize: 11 } }, m.duration),
                React.createElement('span', { style: { color: t.textMuted, fontSize: 11 } }, '·'),
                React.createElement('span', {
                  style: {
                    color: m.difficulty === 'Easy' ? t.success : m.difficulty === 'Medium' ? t.warning : t.danger,
                    fontSize: 11, fontWeight: 600
                  }
                }, m.difficulty),
              )
            ),
            React.createElement('div', { style: { textAlign: 'right' } },
              React.createElement('span', {
                style: { color: t.primary, fontSize: 12, fontWeight: 700, background: `${t.primary}18`, padding: '3px 8px', borderRadius: 8 }
              }, `+${m.xp} XP`),
            )
          ),
          activeMission === m.id && React.createElement('div', {
            style: { marginTop: 12, paddingTop: 12, borderTop: `1px solid ${t.border}` }
          },
            React.createElement('div', {
              style: {
                background: `linear-gradient(135deg, ${t.gradientFrom}, ${t.gradientTo})`,
                borderRadius: 12,
                padding: '10px 14px',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                cursor: 'pointer',
              }
            },
              React.createElement(window.lucide.Play, { size: 16, color: '#fff', fill: '#fff' }),
              React.createElement('span', { style: { color: '#fff', fontSize: 13, fontWeight: 700 } }, 'Start Mission Now')
            )
          )
        )
      )
    )
  );
}

// ============ EXPLORE SCREEN ============
function ExploreScreen({ t }) {
  const [selectedZone, setSelectedZone] = useState(null);

  const zones = [
    { id: 1, name: 'Riverside Park', x: 55, y: 38, active: 7, type: 'Park', missions: 6 },
    { id: 2, name: 'Central Plaza', x: 72, y: 55, active: 3, type: 'Urban', missions: 4 },
    { id: 3, name: 'Campus Quad', x: 30, y: 62, active: 5, type: 'Campus', missions: 8 },
    { id: 4, name: 'Eastside Court', x: 80, y: 30, active: 1, type: 'Court', missions: 3 },
    { id: 5, name: 'Harbor Walk', x: 20, y: 35, active: 9, type: 'Path', missions: 5 },
  ];

  const leaderboard = [
    { rank: 1, name: 'Jordan M.', score: 4820, badge: '🥇' },
    { rank: 2, name: 'Taylor K.', score: 4510, badge: '🥈' },
    { rank: 3, name: 'Alex R.', score: 4200, badge: '🥉', isMe: true },
    { rank: 4, name: 'Casey B.', score: 3980, badge: null },
    { rank: 5, name: 'Morgan L.', score: 3750, badge: null },
  ];

  return React.createElement('div', { style: { padding: '16px 20px' } },
    React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 } },
      React.createElement('h2', { style: { color: t.text, fontSize: 22, fontWeight: 700 } }, 'Explore'),
      React.createElement('div', {
        style: {
          background: t.primary, borderRadius: 10, padding: '6px 12px',
          display: 'flex', alignItems: 'center', gap: 6,
        }
      },
        React.createElement(window.lucide.Navigation, { size: 14, color: '#fff' }),
        React.createElement('span', { style: { color: '#fff', fontSize: 12, fontWeight: 600 } }, 'Near Me')
      )
    ),

    // Map
    React.createElement('div', {
      style: {
        background: isDark => isDark ? '#1a1a33' : '#dde8ff',
        borderRadius: 20,
        height: 220,
        position: 'relative',
        overflow: 'hidden',
        border: `1px solid ${t.border}`,
        marginBottom: 16,
        background: t.surfaceAlt,
      }
    },
      // Grid lines
      React.createElement('div', {
        style: {
          position: 'absolute', inset: 0,
          backgroundImage: `linear-gradient(${t.border} 1px, transparent 1px), linear-gradient(90deg, ${t.border} 1px, transparent 1px)`,
          backgroundSize: '30px 30px',
          opacity: 0.6,
        }
      }),
      // Zone dots
      zones.map(z =>
        React.createElement('div', {
          key: z.id,
          onClick: () => setSelectedZone(selectedZone?.id === z.id ? null : z),
          style: {
            position: 'absolute',
            left: `${z.x}%`,
            top: `${z.y}%`,
            transform: 'translate(-50%, -50%)',
            cursor: 'pointer',
            zIndex: 10,
          }
        },
          React.createElement('div', {
            style: {
              width: selectedZone?.id === z.id ? 20 : 14,
              height: selectedZone?.id === z.id ? 20 : 14,
              borderRadius: '50%',
              background: selectedZone?.id === z.id ? t.primary : t.accent,
              border: `2px solid ${t.surface}`,
              boxShadow: `0 0 0 ${selectedZone?.id === z.id ? '6px' : '4px'} ${t.primary}33`,
              transition: 'all 0.2s ease',
            }
          }),
          React.createElement('div', {
            style: {
              position: 'absolute',
              top: -24,
              left: '50%',
              transform: 'translateX(-50%)',
              background: t.card,
              borderRadius: 6,
              padding: '2px 6px',
              fontSize: 9,
              fontWeight: 600,
              color: t.text,
              whiteSpace: 'nowrap',
              border: `1px solid ${t.border}`,
            }
          }, z.name)
        )
      ),
      // Current location
      React.createElement('div', {
        style: {
          position: 'absolute', left: '50%', top: '50%',
          transform: 'translate(-50%, -50%)',
          width: 16, height: 16, borderRadius: '50%',
          background: t.primary,
          border: '3px solid #fff',
          boxShadow: `0 0 0 8px ${t.primary}33`,
          zIndex: 20,
        }
      })
    ),

    // Selected zone info
    selectedZone && React.createElement('div', {
      style: {
        background: t.card,
        borderRadius: 16,
        padding: 16,
        border: `1px solid ${t.primary}44`,
        marginBottom: 16,
        boxShadow: `0 4px 20px ${t.shadow}`,
      }
    },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
        React.createElement('div', null,
          React.createElement('h4', { style: { color: t.text, fontSize: 15, fontWeight: 700 } }, selectedZone.name),
          React.createElement('p', { style: { color: t.textMuted, fontSize: 12, marginTop: 2 } }, `${selectedZone.type} · ${selectedZone.missions} missions available`),
        ),
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
          React.createElement('div', { style: { width: 8, height: 8, borderRadius: 4, background: t.success } }),
          React.createElement('span', { style: { color: t.success, fontSize: 12, fontWeight: 600 } }, `${selectedZone.active} playing`)
        )
      ),
      React.createElement('div', {
        style: {
          marginTop: 12,
          background: `linear-gradient(135deg, ${t.gradientFrom}, ${t.gradientTo})`,
          borderRadius: 10, padding: '10px 14px',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          cursor: 'pointer',
        }
      },
        React.createElement(window.lucide.Navigation, { size: 14, color: '#fff' }),
        React.createElement('span', { style: { color: '#fff', fontSize: 13, fontWeight: 700 } }, 'Go to Zone')
      )
    ),

    // Leaderboard
    React.createElement('h3', { style: { color: t.text, fontSize: 16, fontWeight: 700, marginBottom: 12 } }, 'Neighborhood League'),
    leaderboard.map((p, i) =>
      React.createElement('div', {
        key: p.rank,
        style: {
          display: 'flex', alignItems: 'center', gap: 12,
          background: p.isMe ? `${t.primary}18` : t.card,
          borderRadius: 14,
          padding: '11px 14px',
          marginBottom: 8,
          border: p.isMe ? `1px solid ${t.primary}55` : `1px solid ${t.border}`,
        }
      },
        React.createElement('span', { style: { width: 24, fontSize: 14, textAlign: 'center' } }, p.badge || `#${p.rank}`),
        React.createElement('div', {
          style: {
            width: 32, height: 32, borderRadius: 16,
            background: `linear-gradient(135deg, ${t.gradientFrom}, ${t.gradientTo})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }
        }, React.createElement('span', { style: { color: '#fff', fontSize: 12, fontWeight: 700 } }, p.name[0])),
        React.createElement('span', { style: { flex: 1, color: t.text, fontSize: 13, fontWeight: p.isMe ? 700 : 500 } }, p.isMe ? `${p.name} (You)` : p.name),
        React.createElement('span', { style: { color: t.primary, fontSize: 13, fontWeight: 700 } }, p.score.toLocaleString()),
      )
    )
  );
}

// ============ PLAY SCREEN ============
function PlayScreen({ t }) {
  const [scanning, setScanning] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [selected, setSelected] = useState(null);
  const scanRef = useRef(null);

  const startScan = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setScanned(true);
    }, 2500);
  };

  const missionTypes = [
    { id: 'sprint', label: 'Sprint Circuit', icon: '⚡', color: '#F59E0B', desc: '3 cones, 40m total, beat your PR' },
    { id: 'pass', label: 'Target Pass', icon: '🎯', color: '#06B6D4', desc: 'Hit 5 zones in sequence' },
    { id: 'react', label: 'Reaction Drill', icon: '🔴', color: '#EF4444', desc: 'Mirror opponent signals' },
    { id: 'agility', label: 'Agility Ladder', icon: '🏃', color: '#8B5CF6', desc: 'Pattern moves, timed precision' },
  ];

  return React.createElement('div', { style: { padding: '16px 20px' } },
    React.createElement('h2', { style: { color: t.text, fontSize: 22, fontWeight: 700, marginBottom: 4 } }, 'Quick Play'),
    React.createElement('p', { style: { color: t.textSecondary, fontSize: 13, marginBottom: 20 } }, 'Scan your space to generate a mission'),

    // Camera/Scan area
    React.createElement('div', {
      style: {
        height: 200,
        borderRadius: 24,
        background: scanned ? `linear-gradient(135deg, ${t.gradientFrom}22, ${t.gradientTo}22)` : t.surfaceAlt,
        border: `2px dashed ${scanned ? t.primary : t.border}`,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        marginBottom: 20,
        cursor: 'pointer',
      },
      onClick: !scanning && !scanned ? startScan : undefined,
    },
      scanning && React.createElement('div', {
        style: {
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: 3,
          background: `linear-gradient(90deg, transparent, ${t.primary}, transparent)`,
          animation: 'scan 1.5s ease-in-out infinite',
        }
      }),
      scanned
        ? React.createElement('div', { style: { textAlign: 'center' } },
            React.createElement('div', { style: { fontSize: 36, marginBottom: 8 } }, '✅'),
            React.createElement('p', { style: { color: t.success, fontSize: 15, fontWeight: 700 } }, 'Space Scanned!'),
            React.createElement('p', { style: { color: t.textMuted, fontSize: 12, marginTop: 4 } }, '~180m² open area detected'),
            React.createElement('p', { style: { color: t.primary, fontSize: 12, fontWeight: 600, marginTop: 4 } }, '4 missions unlocked for this space'),
          )
        : scanning
          ? React.createElement('div', { style: { textAlign: 'center' } },
              React.createElement(window.lucide.ScanLine, { size: 40, color: t.primary }),
              React.createElement('p', { style: { color: t.primary, fontSize: 14, fontWeight: 600, marginTop: 10 } }, 'Analyzing space...'),
              React.createElement('p', { style: { color: t.textMuted, fontSize: 11, marginTop: 4 } }, 'Measuring area and obstacles'),
            )
          : React.createElement('div', { style: { textAlign: 'center' } },
              React.createElement(window.lucide.Camera, { size: 40, color: t.textMuted }),
              React.createElement('p', { style: { color: t.textSecondary, fontSize: 14, fontWeight: 600, marginTop: 10 } }, 'Tap to Scan Your Space'),
              React.createElement('p', { style: { color: t.textMuted, fontSize: 11, marginTop: 4 } }, 'Point camera at the play area'),
            )
    ),

    scanned && React.createElement('div', null,
      React.createElement('h3', { style: { color: t.text, fontSize: 15, fontWeight: 700, marginBottom: 12 } }, 'Choose Mission Type'),
      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 } },
        missionTypes.map(m =>
          React.createElement('div', {
            key: m.id,
            onClick: () => setSelected(selected === m.id ? null : m.id),
            style: {
              background: selected === m.id ? `${m.color}22` : t.card,
              border: selected === m.id ? `2px solid ${m.color}` : `1px solid ${t.border}`,
              borderRadius: 16,
              padding: '14px 12px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }
          },
            React.createElement('div', { style: { fontSize: 26, marginBottom: 6 } }, m.icon),
            React.createElement('p', { style: { color: t.text, fontSize: 13, fontWeight: 700 } }, m.label),
            React.createElement('p', { style: { color: t.textMuted, fontSize: 10, marginTop: 4 } }, m.desc),
          )
        )
      ),
      selected && React.createElement('div', {
        style: {
          marginTop: 16,
          background: `linear-gradient(135deg, ${t.gradientFrom}, ${t.gradientTo})`,
          borderRadius: 16, padding: '16px',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
          cursor: 'pointer',
          boxShadow: `0 8px 24px ${t.shadow}`,
        }
      },
        React.createElement(window.lucide.Play, { size: 22, color: '#fff', fill: '#fff' }),
        React.createElement('span', { style: { color: '#fff', fontSize: 15, fontWeight: 700, marginTop: 4 } }, 'Launch Mission'),
        React.createElement('span', { style: { color: 'rgba(255,255,255,0.7)', fontSize: 11 } }, 'AR overlay starting...'),
      )
    ),

    !scanned && React.createElement('div', null,
      React.createElement('h3', { style: { color: t.text, fontSize: 15, fontWeight: 700, marginBottom: 12 } }, 'Recent Sessions'),
      [
        { title: 'Cone Dash Sprint', date: 'Today, 12:30 PM', score: 94, xp: 120 },
        { title: 'Reaction Pivot', date: 'Yesterday', score: 78, xp: 180 },
        { title: 'Target Pass', date: 'Mon', score: 88, xp: 200 },
      ].map((s, i) =>
        React.createElement('div', {
          key: i,
          style: {
            display: 'flex', alignItems: 'center', gap: 12,
            background: t.card, borderRadius: 14,
            padding: '12px 14px', marginBottom: 8,
            border: `1px solid ${t.border}`,
          }
        },
          React.createElement('div', {
            style: {
              width: 40, height: 40, borderRadius: 12,
              background: `${t.primary}22`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }
          }, React.createElement(window.lucide.Activity, { size: 18, color: t.primary })),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('p', { style: { color: t.text, fontSize: 13, fontWeight: 600 } }, s.title),
            React.createElement('p', { style: { color: t.textMuted, fontSize: 11, marginTop: 2 } }, s.date),
          ),
          React.createElement('div', { style: { textAlign: 'right' } },
            React.createElement('p', { style: { color: t.primary, fontSize: 14, fontWeight: 700 } }, `${s.score}%`),
            React.createElement('p', { style: { color: t.textMuted, fontSize: 10 } }, `+${s.xp} XP`),
          )
        )
      )
    )
  );
}

// ============ PROGRESS SCREEN ============
function ProgressScreen({ t }) {
  const skills = [
    { name: 'Speed', value: 72, color: '#F59E0B', icon: '⚡' },
    { name: 'Precision', value: 85, color: '#06B6D4', icon: '🎯' },
    { name: 'Reaction', value: 63, color: '#EF4444', icon: '🔴' },
    { name: 'Balance', value: 78, color: '#8B5CF6', icon: '⚖️' },
    { name: 'Agility', value: 69, color: '#10B981', icon: '🏃' },
  ];

  const weekly = [40, 65, 55, 80, 70, 90, 45];
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const maxVal = Math.max(...weekly);

  const achievements = [
    { title: 'First Blood', desc: 'Complete your first mission', done: true, icon: '⚡' },
    { title: 'Streak Master', desc: '7-day streak achieved', done: true, icon: '🔥' },
    { title: 'Precision Pro', desc: '90%+ accuracy in 5 missions', done: false, icon: '🎯' },
    { title: 'Neighborhood King', desc: 'Top 10 in local league', done: false, icon: '👑' },
  ];

  return React.createElement('div', { style: { padding: '16px 20px' } },
    React.createElement('h2', { style: { color: t.text, fontSize: 22, fontWeight: 700, marginBottom: 4 } }, 'Progress'),
    React.createElement('p', { style: { color: t.textSecondary, fontSize: 13, marginBottom: 20 } }, 'Your athletic skill development'),

    // XP Card
    React.createElement('div', {
      style: {
        background: `linear-gradient(135deg, ${t.gradientFrom}, ${t.gradientTo})`,
        borderRadius: 20, padding: 20, marginBottom: 18,
        position: 'relative', overflow: 'hidden',
      }
    },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' } },
        React.createElement('div', null,
          React.createElement('p', { style: { color: 'rgba(255,255,255,0.7)', fontSize: 12 } }, 'Total XP'),
          React.createElement('h3', { style: { color: '#fff', fontSize: 30, fontWeight: 700, letterSpacing: '-1px' } }, '4,200'),
          React.createElement('p', { style: { color: 'rgba(255,255,255,0.7)', fontSize: 12, marginTop: 2 } }, 'Level 8 · Rally Pro'),
        ),
        React.createElement('div', { style: { textAlign: 'right' } },
          React.createElement('span', { style: { fontSize: 36 } }, '🏆'),
          React.createElement('p', { style: { color: 'rgba(255,255,255,0.8)', fontSize: 11, marginTop: 4 } }, '800 XP to Level 9'),
        )
      ),
      // Progress bar
      React.createElement('div', { style: { marginTop: 16 } },
        React.createElement('div', { style: { background: 'rgba(255,255,255,0.25)', borderRadius: 4, height: 6 } },
          React.createElement('div', { style: { background: '#fff', borderRadius: 4, height: 6, width: '68%' } })
        ),
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginTop: 4 } },
          React.createElement('span', { style: { color: 'rgba(255,255,255,0.7)', fontSize: 10 } }, 'Level 8'),
          React.createElement('span', { style: { color: 'rgba(255,255,255,0.7)', fontSize: 10 } }, 'Level 9'),
        )
      )
    ),

    // Weekly chart
    React.createElement('div', {
      style: { background: t.card, borderRadius: 18, padding: 16, marginBottom: 18, border: `1px solid ${t.border}` }
    },
      React.createElement('h4', { style: { color: t.text, fontSize: 14, fontWeight: 700, marginBottom: 14 } }, 'This Week'),
      React.createElement('div', { style: { display: 'flex', gap: 6, alignItems: 'flex-end', height: 80 } },
        weekly.map((val, i) =>
          React.createElement('div', {
            key: i,
            style: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }
          },
            React.createElement('div', {
              style: {
                flex: 1,
                width: '100%',
                display: 'flex', alignItems: 'flex-end',
              }
            },
              React.createElement('div', {
                style: {
                  width: '100%',
                  height: `${(val / maxVal) * 64}px`,
                  background: i === 5
                    ? `linear-gradient(180deg, ${t.gradientFrom}, ${t.gradientTo})`
                    : `${t.primary}44`,
                  borderRadius: '4px 4px 0 0',
                  transition: 'height 0.3s ease',
                }
              })
            ),
            React.createElement('span', { style: { color: t.textMuted, fontSize: 10 } }, days[i])
          )
        )
      )
    ),

    // Skill bars
    React.createElement('h3', { style: { color: t.text, fontSize: 15, fontWeight: 700, marginBottom: 12 } }, 'Skill Breakdown'),
    React.createElement('div', {
      style: { background: t.card, borderRadius: 18, padding: 16, marginBottom: 18, border: `1px solid ${t.border}` }
    },
      skills.map((s, i) =>
        React.createElement('div', {
          key: s.name,
          style: { marginBottom: i < skills.length - 1 ? 14 : 0 }
        },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: 5 } },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6 } },
              React.createElement('span', { style: { fontSize: 13 } }, s.icon),
              React.createElement('span', { style: { color: t.text, fontSize: 13, fontWeight: 500 } }, s.name),
            ),
            React.createElement('span', { style: { color: s.color, fontSize: 13, fontWeight: 700 } }, `${s.value}%`)
          ),
          React.createElement('div', { style: { background: t.surfaceAlt, borderRadius: 4, height: 6 } },
            React.createElement('div', {
              style: {
                background: s.color,
                borderRadius: 4, height: 6,
                width: `${s.value}%`,
                transition: 'width 0.4s ease',
              }
            })
          )
        )
      )
    ),

    // Achievements
    React.createElement('h3', { style: { color: t.text, fontSize: 15, fontWeight: 700, marginBottom: 12 } }, 'Achievements'),
    achievements.map((a, i) =>
      React.createElement('div', {
        key: i,
        style: {
          display: 'flex', alignItems: 'center', gap: 12,
          background: a.done ? `${t.primary}12` : t.card,
          borderRadius: 14, padding: '12px 14px', marginBottom: 8,
          border: a.done ? `1px solid ${t.primary}44` : `1px solid ${t.border}`,
          opacity: a.done ? 1 : 0.6,
        }
      },
        React.createElement('div', { style: { fontSize: 22 } }, a.icon),
        React.createElement('div', { style: { flex: 1 } },
          React.createElement('p', { style: { color: t.text, fontSize: 13, fontWeight: 600 } }, a.title),
          React.createElement('p', { style: { color: t.textMuted, fontSize: 11, marginTop: 2 } }, a.desc),
        ),
        a.done
          ? React.createElement(window.lucide.CheckCircle, { size: 18, color: t.success })
          : React.createElement(window.lucide.Lock, { size: 16, color: t.textMuted })
      )
    )
  );
}

// ============ PROFILE SCREEN ============
function ProfileScreen({ t, isDark, setIsDark }) {
  const [notifications, setNotifications] = useState(true);
  const [locationShare, setLocationShare] = useState(true);

  const Toggle = ({ value, onToggle }) =>
    React.createElement('div', {
      onClick: onToggle,
      style: {
        width: 44, height: 24, borderRadius: 12,
        background: value ? t.primary : t.border,
        position: 'relative', cursor: 'pointer',
        transition: 'background 0.2s ease',
        flexShrink: 0,
      }
    },
      React.createElement('div', {
        style: {
          position: 'absolute',
          top: 2, left: value ? 22 : 2,
          width: 20, height: 20, borderRadius: 10,
          background: '#fff',
          transition: 'left 0.2s ease',
          boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
        }
      })
    );

  const statItems = [
    { label: 'Missions', value: '47' },
    { label: 'Hours', value: '12.4' },
    { label: 'Best Streak', value: '15d' },
    { label: 'Avg Score', value: '81%' },
  ];

  const menuItems = [
    { icon: window.lucide.Trophy, label: 'My Achievements', arrow: true },
    { icon: window.lucide.Users, label: 'Friends & Rivals', arrow: true },
    { icon: window.lucide.MapPin, label: 'Favorite Zones', arrow: true },
    { icon: window.lucide.Download, label: 'Offline Missions', arrow: true },
  ];

  return React.createElement('div', { style: { padding: '16px 20px' } },
    // Profile header
    React.createElement('div', {
      style: {
        background: `linear-gradient(135deg, ${t.gradientFrom}22, ${t.gradientTo}22)`,
        borderRadius: 24, padding: 20, marginBottom: 20,
        border: `1px solid ${t.primary}33`,
        display: 'flex', flexDirection: 'column', alignItems: 'center',
      }
    },
      React.createElement('div', {
        style: {
          width: 72, height: 72, borderRadius: 36,
          background: `linear-gradient(135deg, ${t.gradientFrom}, ${t.gradientTo})`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 30, marginBottom: 10,
          boxShadow: `0 4px 20px ${t.shadow}`,
        }
      }, '🧑‍🦱'),
      React.createElement('h3', { style: { color: t.text, fontSize: 18, fontWeight: 700 } }, 'Alex Rivera'),
      React.createElement('p', { style: { color: t.textMuted, fontSize: 12, marginTop: 2 } }, '@alex_rally · Level 8 · Rally Pro'),
      React.createElement('div', { style: { display: 'flex', gap: 16, marginTop: 16 } },
        statItems.map((s, i) =>
          React.createElement('div', { key: i, style: { textAlign: 'center' } },
            React.createElement('p', { style: { color: t.text, fontSize: 16, fontWeight: 700 } }, s.value),
            React.createElement('p', { style: { color: t.textMuted, fontSize: 10 } }, s.label),
          )
        )
      )
    ),

    // Menu items
    React.createElement('div', {
      style: { background: t.card, borderRadius: 18, overflow: 'hidden', border: `1px solid ${t.border}`, marginBottom: 16 }
    },
      menuItems.map((item, i) =>
        React.createElement('div', {
          key: i,
          style: {
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '14px 16px',
            borderBottom: i < menuItems.length - 1 ? `1px solid ${t.border}` : 'none',
            cursor: 'pointer',
          }
        },
          React.createElement('div', {
            style: {
              width: 34, height: 34, borderRadius: 10,
              background: `${t.primary}18`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }
          }, React.createElement(item.icon, { size: 16, color: t.primary })),
          React.createElement('span', { style: { flex: 1, color: t.text, fontSize: 14, fontWeight: 500 } }, item.label),
          React.createElement(window.lucide.ChevronRight, { size: 16, color: t.textMuted })
        )
      )
    ),

    // Settings
    React.createElement('div', {
      style: { background: t.card, borderRadius: 18, overflow: 'hidden', border: `1px solid ${t.border}` }
    },
      [
        {
          icon: isDark ? window.lucide.Sun : window.lucide.Moon,
          label: 'Dark Mode',
          control: React.createElement(Toggle, { value: isDark, onToggle: () => setIsDark(!isDark) })
        },
        {
          icon: window.lucide.Bell,
          label: 'Notifications',
          control: React.createElement(Toggle, { value: notifications, onToggle: () => setNotifications(!notifications) })
        },
        {
          icon: window.lucide.MapPin,
          label: 'Share Location',
          control: React.createElement(Toggle, { value: locationShare, onToggle: () => setLocationShare(!locationShare) })
        },
      ].map((item, i) =>
        React.createElement('div', {
          key: i,
          style: {
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '14px 16px',
            borderBottom: i < 2 ? `1px solid ${t.border}` : 'none',
          }
        },
          React.createElement('div', {
            style: {
              width: 34, height: 34, borderRadius: 10,
              background: `${t.primary}18`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }
          }, React.createElement(item.icon, { size: 16, color: t.primary })),
          React.createElement('span', { style: { flex: 1, color: t.text, fontSize: 14, fontWeight: 500 } }, item.label),
          item.control,
        )
      )
    )
  );
}
