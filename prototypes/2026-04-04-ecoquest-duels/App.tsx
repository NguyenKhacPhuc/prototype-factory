const { useState, useEffect, useRef } = React;

const themes = {
  dark: {
    bg: '#1a2e1a',
    bgSecondary: '#243324',
    bgCard: '#2d4a2d',
    bgCardAlt: '#3a5c35',
    surface: '#1e361e',
    primary: '#4a9e4a',
    primaryLight: '#6abb6a',
    accent: '#8fd46b',
    accentBrown: '#8b6914',
    accentBrownLight: '#c49a2e',
    text: '#f0ede4',
    textSecondary: '#b8d4a8',
    textMuted: '#7a9e6a',
    border: '#3a5c35',
    navBg: '#162616',
    navBorder: '#2d4a2d',
    inputBg: '#243324',
    badge: '#4a9e4a',
    badgeText: '#f0ede4',
    danger: '#e07050',
    warning: '#d4a830',
    success: '#5ab85a',
  },
  light: {
    bg: '#f5f0e8',
    bgSecondary: '#ede8dc',
    bgCard: '#ffffff',
    bgCardAlt: '#f0ede4',
    surface: '#e8e0d0',
    primary: '#2d6e2d',
    primaryLight: '#4a9e4a',
    accent: '#5a9e2a',
    accentBrown: '#7a5210',
    accentBrownLight: '#b8860b',
    text: '#1a2e1a',
    textSecondary: '#3a5c35',
    textMuted: '#6a8e5a',
    border: '#c8d8b8',
    navBg: '#f0ede4',
    navBorder: '#c8d8b8',
    inputBg: '#ffffff',
    badge: '#2d6e2d',
    badgeText: '#ffffff',
    danger: '#c05030',
    warning: '#b48820',
    success: '#3a9e3a',
  }
};

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [themeMode, setThemeMode] = useState('dark');
  const theme = themes[themeMode];

  useEffect(() => {
    const styleTag = document.createElement('style');
    styleTag.innerHTML = `
      @import url('https://fonts.googleapis.com/css2?family=Patrick+Hand&family=Patrick+Hand+SC&display=swap');
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body { background: #f0f0f0; font-family: 'Patrick Hand', cursive; }
      ::-webkit-scrollbar { width: 4px; }
      ::-webkit-scrollbar-track { background: transparent; }
      ::-webkit-scrollbar-thumb { background: rgba(100,160,100,0.4); border-radius: 4px; }
      @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.6} }
      @keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }
      @keyframes wiggle { 0%,100%{transform:rotate(-2deg)} 50%{transform:rotate(2deg)} }
      @keyframes fadeIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
      @keyframes drawLine { from{stroke-dashoffset:100} to{stroke-dashoffset:0} }
      .bounce { animation: bounce 2s infinite; }
      .wiggle { animation: wiggle 1.5s infinite; }
      .pulse { animation: pulse 2s infinite; }
      .fade-in { animation: fadeIn 0.4s ease forwards; }
    `;
    document.head.appendChild(styleTag);
    return () => document.head.removeChild(styleTag);
  }, []);

  const tabs = [
    { id: 'home', label: 'Duels', icon: window.lucide.Swords },
    { id: 'missions', label: 'Missions', icon: window.lucide.Leaf },
    { id: 'community', label: 'League', icon: window.lucide.Trophy },
    { id: 'rewards', label: 'Rewards', icon: window.lucide.Gift },
    { id: 'profile', label: 'Me', icon: window.lucide.User },
  ];

  const screens = {
    home: HomeScreen,
    missions: MissionsScreen,
    community: CommunityScreen,
    rewards: RewardsScreen,
    profile: ProfileScreen,
  };

  const ActiveScreen = screens[activeTab];

  return React.createElement('div', {
    style: { minHeight: '100vh', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', fontFamily: "'Patrick Hand', cursive" }
  },
    React.createElement('div', {
      style: {
        width: 375,
        height: 812,
        background: theme.bg,
        borderRadius: 44,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 40px 80px rgba(0,0,0,0.35), 0 0 0 10px #2a2a2a, 0 0 0 12px #444',
        fontFamily: "'Patrick Hand', cursive",
      }
    },
      // Status bar
      React.createElement(StatusBar, { theme }),
      // Dynamic Island
      React.createElement('div', {
        style: {
          position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)',
          width: 120, height: 34, background: '#000', borderRadius: 20, zIndex: 100,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }
      },
        React.createElement('div', { style: { width: 12, height: 12, borderRadius: '50%', background: '#1a1a1a', border: '2px solid #333', marginRight: 8 } }),
        React.createElement('div', { style: { width: 28, height: 8, borderRadius: 4, background: '#1a1a1a', border: '2px solid #333' } })
      ),
      // Main content
      React.createElement('div', {
        style: { flex: 1, overflowY: 'auto', overflowX: 'hidden', marginTop: 0 }
      },
        React.createElement(ActiveScreen, { theme, themeMode, setThemeMode })
      ),
      // Bottom Nav
      React.createElement('div', {
        style: {
          background: theme.navBg,
          borderTop: `2px dashed ${theme.navBorder}`,
          display: 'flex',
          padding: '8px 4px 12px',
          gap: 0,
        }
      },
        tabs.map(tab => {
          const isActive = activeTab === tab.id;
          const navItemStyle = {
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 3,
            padding: '6px 2px',
            cursor: 'pointer',
            borderRadius: 12,
            background: isActive ? `${theme.primary}22` : 'transparent',
            transition: 'all 0.2s',
            transform: isActive ? 'translateY(-2px)' : 'none',
          };
          const labelStyle = {
            fontSize: 10,
            color: isActive ? theme.accent : theme.textMuted,
            fontFamily: "'Patrick Hand', cursive",
            fontWeight: isActive ? '700' : '400',
          };
          return React.createElement('div', {
            key: tab.id,
            onClick: () => setActiveTab(tab.id),
            style: navItemStyle,
          },
            React.createElement(tab.icon, { size: 22, color: isActive ? theme.accent : theme.textMuted, strokeWidth: isActive ? 2.5 : 1.8 }),
            React.createElement('span', { style: labelStyle }, tab.label)
          );
        })
      )
    )
  );
}

function StatusBar({ theme }) {
  return React.createElement('div', {
    style: {
      height: 50,
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      padding: '0 24px 8px',
      flexShrink: 0,
    }
  },
    React.createElement('span', { style: { fontSize: 13, color: theme.text, fontWeight: '700', fontFamily: "'Patrick Hand', cursive" } }, '9:41'),
    React.createElement('div', { style: { display: 'flex', gap: 6, alignItems: 'center' } },
      React.createElement(window.lucide.Wifi, { size: 14, color: theme.text }),
      React.createElement(window.lucide.Signal, { size: 14, color: theme.text }),
      React.createElement(window.lucide.Battery, { size: 16, color: theme.text }),
    )
  );
}

// ── Squiggly border SVG decorator ──────────────────────────────────────────
function SquigglyDivider({ color, width = 340 }) {
  return React.createElement('svg', {
    width, height: 12,
    style: { display: 'block', overflow: 'visible' }
  },
    React.createElement('path', {
      d: `M0,6 C20,2 40,10 60,6 C80,2 100,10 120,6 C140,2 160,10 180,6 C200,2 220,10 240,6 C260,2 280,10 300,6 C320,2 340,10 ${width},6`,
      fill: 'none', stroke: color || '#4a9e4a', strokeWidth: 2, strokeLinecap: 'round'
    })
  );
}

// ── Leaf badge ─────────────────────────────────────────────────────────────
function LeafBadge({ text, color, bg }) {
  return React.createElement('div', {
    style: {
      display: 'inline-flex', alignItems: 'center', gap: 4,
      background: bg || '#4a9e4a33',
      border: `1.5px solid ${color || '#4a9e4a'}`,
      borderRadius: '20px 4px 20px 4px',
      padding: '2px 10px',
      fontSize: 11,
      color: color || '#4a9e4a',
      fontFamily: "'Patrick Hand', cursive",
    }
  },
    React.createElement(window.lucide.Leaf, { size: 10, color: color || '#4a9e4a' }),
    text
  );
}

// ── ECO CHARACTER SVG ──────────────────────────────────────────────────────
function EcoCharacter({ type = 'tree', size = 60 }) {
  if (type === 'tree') {
    return React.createElement('svg', { width: size, height: size, viewBox: '0 0 60 60' },
      React.createElement('ellipse', { cx: 30, cy: 20, rx: 18, ry: 16, fill: '#4a9e4a', stroke: '#2d6e2d', strokeWidth: 2 }),
      React.createElement('ellipse', { cx: 22, cy: 28, rx: 10, ry: 8, fill: '#5ab85a', stroke: '#2d6e2d', strokeWidth: 1.5 }),
      React.createElement('ellipse', { cx: 38, cy: 26, rx: 10, ry: 8, fill: '#5ab85a', stroke: '#2d6e2d', strokeWidth: 1.5 }),
      React.createElement('rect', { x: 26, y: 32, width: 8, height: 14, rx: 3, fill: '#8b6914', stroke: '#5a4010', strokeWidth: 1.5 }),
      React.createElement('circle', { cx: 24, cy: 18, r: 3, fill: '#8fd46b' }),
      React.createElement('circle', { cx: 34, cy: 14, r: 2, fill: '#8fd46b' }),
    );
  }
  if (type === 'sprout') {
    return React.createElement('svg', { width: size, height: size, viewBox: '0 0 60 60' },
      React.createElement('line', { x1: 30, y1: 50, x2: 30, y2: 25, stroke: '#4a9e4a', strokeWidth: 3, strokeLinecap: 'round' }),
      React.createElement('ellipse', { cx: 22, cy: 28, rx: 10, ry: 7, fill: '#5ab85a', stroke: '#2d6e2d', strokeWidth: 1.5, transform: 'rotate(-20 22 28)' }),
      React.createElement('ellipse', { cx: 38, cy: 24, rx: 10, ry: 7, fill: '#6abb6a', stroke: '#2d6e2d', strokeWidth: 1.5, transform: 'rotate(20 38 24)' }),
      React.createElement('circle', { cx: 30, cy: 18, r: 6, fill: '#8fd46b', stroke: '#4a9e4a', strokeWidth: 1.5 }),
    );
  }
  if (type === 'sun') {
    return React.createElement('svg', { width: size, height: size, viewBox: '0 0 60 60' },
      ...[0,45,90,135,180,225,270,315].map(a =>
        React.createElement('line', {
          key: a,
          x1: 30 + 14 * Math.cos(a * Math.PI/180),
          y1: 30 + 14 * Math.sin(a * Math.PI/180),
          x2: 30 + 22 * Math.cos(a * Math.PI/180),
          y2: 30 + 22 * Math.sin(a * Math.PI/180),
          stroke: '#d4a830', strokeWidth: 2.5, strokeLinecap: 'round'
        })
      ),
      React.createElement('circle', { cx: 30, cy: 30, r: 12, fill: '#f0c030', stroke: '#d4a830', strokeWidth: 2 }),
      React.createElement('circle', { cx: 26, cy: 28, r: 2, fill: '#d4a830' }),
      React.createElement('circle', { cx: 34, cy: 28, r: 2, fill: '#d4a830' }),
      React.createElement('path', { d: 'M26,34 Q30,38 34,34', fill: 'none', stroke: '#d4a830', strokeWidth: 2, strokeLinecap: 'round' }),
    );
  }
  return null;
}

// ──────────────────────────────────────────────────────────────────────────
// HOME SCREEN — Active Duels
// ──────────────────────────────────────────────────────────────────────────
function HomeScreen({ theme }) {
  const [challenged, setChallenged] = useState(null);
  const [scrollX, setScrollX] = useState(0);
  const scrollRef = useRef(null);

  const activeDuels = [
    { id: 1, opponent: 'Maya K.', avatar: '🌿', mission: 'Zero-Waste Lunch', myScore: 780, theirScore: 650, timeLeft: '4h 22m', status: 'winning', category: 'food' },
    { id: 2, opponent: 'Raj P.', avatar: '🌱', mission: 'Bike Commute Week', myScore: 430, theirScore: 590, timeLeft: '2d 6h', status: 'losing', category: 'transport' },
    { id: 3, opponent: 'Sofia M.', avatar: '🍃', mission: 'Energy Save Sprint', myScore: 910, theirScore: 910, timeLeft: '1h 5m', status: 'tied', category: 'energy' },
  ];

  const nearbyPlayers = [
    { id: 1, name: 'Alex R.', avatar: '🌳', level: 14, specialty: 'Transport', distance: '0.3km' },
    { id: 2, name: 'Priya S.', avatar: '♻️', level: 22, specialty: 'Zero Waste', distance: '0.8km' },
    { id: 3, name: 'Tom W.', avatar: '🌊', level: 9, specialty: 'Water', distance: '1.2km' },
    { id: 4, name: 'Luna C.', avatar: '☀️', level: 31, specialty: 'Solar', distance: '1.5km' },
  ];

  const statusColor = { winning: theme.success, losing: theme.danger, tied: theme.warning };
  const statusLabel = { winning: '🌿 Winning!', losing: '⚡ Behind', tied: '🤝 Tied!' };

  return React.createElement('div', { style: { paddingBottom: 16 } },
    // Header
    React.createElement('div', {
      style: {
        padding: '16px 20px 12px',
        background: `linear-gradient(160deg, ${theme.bgCard} 0%, ${theme.bgSecondary} 100%)`,
        borderBottom: `2px dashed ${theme.border}`,
        position: 'relative', overflow: 'hidden',
      }
    },
      // Background nature texture dots
      React.createElement('div', {
        style: {
          position: 'absolute', top: 0, right: 0, opacity: 0.15,
          fontSize: 60, lineHeight: 1, userSelect: 'none',
        }
      }, '🌿'),
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' } },
        React.createElement('div', {},
          React.createElement('div', { style: { fontSize: 11, color: theme.textMuted, letterSpacing: 1.5 } }, 'ECOQUEST'),
          React.createElement('div', { style: { fontSize: 26, fontWeight: '700', color: theme.text, lineHeight: 1.1 } }, '⚔️ Duels'),
          React.createElement('div', { style: { fontSize: 12, color: theme.textSecondary, marginTop: 2 } }, 'Compete sustainably. Win surprises.')
        ),
        React.createElement('div', { style: { textAlign: 'right' } },
          React.createElement('div', {
            style: {
              background: `${theme.primary}33`,
              border: `2px solid ${theme.primary}`,
              borderRadius: '16px 4px 16px 4px',
              padding: '6px 12px',
              fontSize: 12,
              color: theme.accent,
            }
          },
            React.createElement('div', { style: { fontSize: 18, fontWeight: '700' } }, '1,840'),
            React.createElement('div', { style: { fontSize: 10, color: theme.textMuted } }, '🌱 EcoPoints')
          )
        )
      ),
      React.createElement('div', { style: { marginTop: 10 } },
        SquigglyDivider({ color: theme.border, width: 335 })
      )
    ),

    // Active Duels Section
    React.createElement('div', { style: { padding: '16px 20px 8px' } },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 } },
        React.createElement('span', { style: { fontSize: 16, fontWeight: '700', color: theme.text } }, '⚔️ Active Duels'),
        React.createElement('span', {
          style: {
            fontSize: 11, color: theme.primary,
            background: `${theme.primary}22`,
            border: `1px solid ${theme.primary}`,
            borderRadius: '8px 2px 8px 2px',
            padding: '2px 8px',
          }
        }, '3 Active')
      ),
      ...activeDuels.map(duel =>
        React.createElement('div', {
          key: duel.id,
          style: {
            background: theme.bgCard,
            border: `2px solid ${theme.border}`,
            borderRadius: '16px 4px 16px 4px',
            padding: 14,
            marginBottom: 10,
            position: 'relative',
            overflow: 'hidden',
          }
        },
          // Status strip
          React.createElement('div', {
            style: {
              position: 'absolute', top: 0, left: 0, right: 0, height: 3,
              background: statusColor[duel.status],
              borderRadius: '16px 4px 0 0',
            }
          }),
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' } },
            React.createElement('div', { style: { display: 'flex', gap: 10, alignItems: 'center' } },
              React.createElement('div', {
                style: {
                  width: 40, height: 40,
                  background: `${theme.primary}22`,
                  border: `2px dashed ${theme.primary}`,
                  borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 20,
                }
              }, duel.avatar),
              React.createElement('div', {},
                React.createElement('div', { style: { fontSize: 14, fontWeight: '700', color: theme.text } }, `vs ${duel.opponent}`),
                React.createElement('div', { style: { fontSize: 11, color: theme.textMuted } }, `🎯 ${duel.mission}`),
              )
            ),
            React.createElement('div', { style: { textAlign: 'right' } },
              React.createElement('div', {
                style: {
                  fontSize: 11, fontWeight: '700',
                  color: statusColor[duel.status],
                  background: `${statusColor[duel.status]}22`,
                  border: `1px solid ${statusColor[duel.status]}`,
                  borderRadius: '8px 2px 8px 2px',
                  padding: '2px 8px',
                }
              }, statusLabel[duel.status]),
              React.createElement('div', { style: { fontSize: 10, color: theme.textMuted, marginTop: 2 } }, `⏱ ${duel.timeLeft}`)
            )
          ),
          // Score bar
          React.createElement('div', { style: { marginTop: 10 } },
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: 4, fontSize: 11 } },
              React.createElement('span', { style: { color: theme.accent, fontWeight: '700' } }, `You: ${duel.myScore}`),
              React.createElement('span', { style: { color: theme.textMuted } }, `${duel.opponent}: ${duel.theirScore}`)
            ),
            React.createElement('div', {
              style: {
                height: 8, background: theme.bgSecondary,
                borderRadius: 4, overflow: 'hidden',
                border: `1px solid ${theme.border}`,
              }
            },
              React.createElement('div', {
                style: {
                  height: '100%',
                  width: `${(duel.myScore / (duel.myScore + duel.theirScore)) * 100}%`,
                  background: `linear-gradient(90deg, ${theme.primary}, ${theme.accent})`,
                  borderRadius: 4,
                  transition: 'width 0.5s',
                }
              })
            )
          )
        )
      )
    ),

    // Challenge Nearby — horizontal scroll
    React.createElement('div', { style: { padding: '8px 0 16px' } },
      React.createElement('div', { style: { padding: '0 20px 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
        React.createElement('span', { style: { fontSize: 16, fontWeight: '700', color: theme.text } }, '🌍 Challenge Nearby'),
        React.createElement('span', { style: { fontSize: 11, color: theme.textMuted } }, 'Swipe →')
      ),
      // Hand-sketched edge decoration
      React.createElement('div', { style: { position: 'relative' } },
        React.createElement('div', {
          style: {
            position: 'absolute', left: 0, top: 0, bottom: 0, width: 24,
            background: `linear-gradient(90deg, ${theme.bg}, transparent)`,
            zIndex: 2, pointerEvents: 'none',
          }
        }),
        React.createElement('div', {
          ref: scrollRef,
          style: {
            display: 'flex', gap: 12,
            overflowX: 'auto', padding: '4px 20px 8px',
            scrollbarWidth: 'none',
          }
        },
          nearbyPlayers.map(player =>
            React.createElement('div', {
              key: player.id,
              onClick: () => setChallenged(player.id === challenged ? null : player.id),
              style: {
                flexShrink: 0,
                width: 110,
                background: challenged === player.id ? `${theme.primary}33` : theme.bgCard,
                border: `2px ${challenged === player.id ? 'solid' : 'dashed'} ${challenged === player.id ? theme.primary : theme.border}`,
                borderRadius: '16px 4px 16px 4px',
                padding: '12px 10px',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s',
                transform: challenged === player.id ? 'translateY(-4px) scale(1.02)' : 'none',
              }
            },
              React.createElement('div', { style: { fontSize: 28, marginBottom: 4 } }, player.avatar),
              React.createElement('div', { style: { fontSize: 13, fontWeight: '700', color: theme.text } }, player.name),
              React.createElement('div', { style: { fontSize: 10, color: theme.textMuted } }, `Lv.${player.level}`),
              React.createElement('div', { style: { fontSize: 10, color: theme.accent, marginTop: 2 } }, player.specialty),
              React.createElement('div', { style: { fontSize: 9, color: theme.textMuted } }, player.distance),
              challenged === player.id
                ? React.createElement('div', {
                    style: {
                      marginTop: 8, background: theme.primary,
                      color: '#fff', borderRadius: '8px 2px 8px 2px',
                      fontSize: 11, padding: '4px 8px', fontWeight: '700',
                    }
                  }, '⚔️ Challenge!')
                : React.createElement('div', {
                    style: {
                      marginTop: 8, background: 'transparent',
                      color: theme.textMuted, borderRadius: '8px 2px 8px 2px',
                      fontSize: 10, padding: '3px 8px',
                      border: `1px dashed ${theme.border}`,
                    }
                  }, '+ Duel')
            )
          )
        )
      )
    ),

    // Quick Start button
    React.createElement('div', { style: { padding: '0 20px' } },
      React.createElement('div', {
        style: {
          background: `linear-gradient(135deg, ${theme.primary}, ${theme.accent})`,
          borderRadius: '20px 6px 20px 6px',
          padding: '14px 20px',
          textAlign: 'center',
          cursor: 'pointer',
          boxShadow: `0 4px 16px ${theme.primary}44`,
          position: 'relative', overflow: 'hidden',
        }
      },
        React.createElement('div', { style: { position: 'absolute', top: -8, right: -8, fontSize: 40, opacity: 0.2 } }, '🌿'),
        React.createElement('div', { style: { fontSize: 16, fontWeight: '700', color: '#fff' } }, '⚔️ Start New Duel'),
        React.createElement('div', { style: { fontSize: 11, color: 'rgba(255,255,255,0.8)', marginTop: 2 } }, 'Choose a mission & challenge someone now')
      )
    )
  );
}

// ──────────────────────────────────────────────────────────────────────────
// MISSIONS SCREEN
// ──────────────────────────────────────────────────────────────────────────
function MissionsScreen({ theme }) {
  const [selectedPack, setSelectedPack] = useState('active');

  const packs = [
    { id: 'active', label: '🌿 Active', count: 5 },
    { id: 'water', label: '💧 Water Week', count: 8, locked: false },
    { id: 'zero-waste', label: '♻️ Zero Waste', count: 6, locked: false },
    { id: 'solar', label: '☀️ Solar Sprint', count: 4, locked: true },
    { id: 'forest', label: '🌲 Forest Month', count: 10, locked: true },
  ];

  const missions = {
    active: [
      { id: 1, title: 'Zero-Waste Lunch', desc: 'Pack a lunch with no disposables', points: 150, difficulty: 'Easy', verified: 'photo', progress: 1, total: 1, done: true },
      { id: 2, title: 'Bike Commute', desc: 'Bike instead of driving', points: 280, difficulty: 'Medium', verified: 'gps', progress: 3, total: 5, done: false },
      { id: 3, title: 'Cold Shower', desc: 'Take a cold shower to save energy', points: 80, difficulty: 'Easy', verified: 'sensor', progress: 0, total: 1, done: false },
      { id: 4, title: 'Buy Second-Hand', desc: 'Purchase from a thrift or swap shop', points: 200, difficulty: 'Medium', verified: 'photo', progress: 0, total: 1, done: false },
      { id: 5, title: 'Plant Something', desc: 'Plant a seed or seedling outdoors', points: 350, difficulty: 'Hard', verified: 'photo+gps', progress: 0, total: 1, done: false },
    ],
    water: [
      { id: 6, title: '2-Min Shower', desc: 'Time your shower under 2 minutes', points: 100, difficulty: 'Easy', verified: 'sensor', progress: 2, total: 7, done: false },
      { id: 7, title: 'Fix a Drip', desc: 'Fix a leaking tap at home', points: 300, difficulty: 'Hard', verified: 'photo', progress: 0, total: 1, done: false },
    ],
  };

  const difficultyColor = { Easy: theme.success, Medium: theme.warning, Hard: theme.danger };
  const verifiedIcon = { photo: '📸', gps: '📍', sensor: '📡', 'photo+gps': '📸📍' };

  const currentMissions = missions[selectedPack] || missions.active;

  return React.createElement('div', { style: { paddingBottom: 16 } },
    // Header
    React.createElement('div', {
      style: {
        padding: '16px 20px 12px',
        background: `linear-gradient(160deg, ${theme.bgCard} 0%, ${theme.bgSecondary} 100%)`,
        borderBottom: `2px dashed ${theme.border}`,
        position: 'relative', overflow: 'hidden',
      }
    },
      React.createElement('div', { style: { position: 'absolute', top: -10, right: -5, fontSize: 70, opacity: 0.07 } }, '🌿'),
      React.createElement('div', { style: { fontSize: 26, fontWeight: '700', color: theme.text } }, '🎯 Missions'),
      React.createElement('div', { style: { fontSize: 12, color: theme.textSecondary } }, 'Complete eco-actions. Earn duel power.'),
      React.createElement('div', { style: { marginTop: 8 } },
        SquigglyDivider({ color: theme.border, width: 335 })
      )
    ),

    // Mission Pack horizontal scroll
    React.createElement('div', { style: { padding: '12px 0 0' } },
      React.createElement('div', { style: { padding: '0 20px 8px', fontSize: 13, fontWeight: '700', color: theme.textSecondary } }, 'Mission Packs'),
      React.createElement('div', {
        style: {
          display: 'flex', gap: 10,
          overflowX: 'auto', padding: '4px 20px 12px',
          scrollbarWidth: 'none',
        }
      },
        packs.map(pack =>
          React.createElement('div', {
            key: pack.id,
            onClick: () => !pack.locked && setSelectedPack(pack.id),
            style: {
              flexShrink: 0,
              background: selectedPack === pack.id ? `${theme.primary}33` : (pack.locked ? `${theme.bgCard}88` : theme.bgCard),
              border: `2px ${selectedPack === pack.id ? 'solid' : 'dashed'} ${selectedPack === pack.id ? theme.primary : (pack.locked ? theme.border : theme.border)}`,
              borderRadius: '12px 3px 12px 3px',
              padding: '8px 14px',
              cursor: pack.locked ? 'not-allowed' : 'pointer',
              opacity: pack.locked ? 0.55 : 1,
              transition: 'all 0.2s',
              display: 'flex', alignItems: 'center', gap: 6,
              whiteSpace: 'nowrap',
            }
          },
            React.createElement('span', { style: { fontSize: 12, color: selectedPack === pack.id ? theme.accent : theme.text, fontWeight: selectedPack === pack.id ? '700' : '400' } }, pack.label),
            pack.locked
              ? React.createElement(window.lucide.Lock, { size: 11, color: theme.textMuted })
              : React.createElement('span', { style: { fontSize: 10, background: `${theme.primary}33`, color: theme.primary, borderRadius: 8, padding: '1px 6px' } }, pack.count)
          )
        )
      )
    ),

    // Mission list
    React.createElement('div', { style: { padding: '0 20px' } },
      React.createElement('div', { style: { marginBottom: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
        React.createElement('span', { style: { fontSize: 14, fontWeight: '700', color: theme.text } }, `${currentMissions.length} missions`),
        React.createElement(LeafBadge, { text: `${currentMissions.filter(m => m.done).length} done`, color: theme.success, bg: `${theme.success}22` })
      ),
      ...currentMissions.map(mission =>
        React.createElement('div', {
          key: mission.id,
          style: {
            background: mission.done ? `${theme.success}15` : theme.bgCard,
            border: `2px ${mission.done ? 'solid' : 'dashed'} ${mission.done ? theme.success : theme.border}`,
            borderRadius: '16px 4px 16px 4px',
            padding: 14,
            marginBottom: 10,
            position: 'relative', overflow: 'hidden',
          }
        },
          mission.done && React.createElement('div', {
            style: { position: 'absolute', top: 10, right: 10, fontSize: 18 }
          }, '✅'),
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', paddingRight: mission.done ? 28 : 0 } },
            React.createElement('div', {},
              React.createElement('div', { style: { fontSize: 14, fontWeight: '700', color: theme.text } }, mission.title),
              React.createElement('div', { style: { fontSize: 11, color: theme.textMuted, marginTop: 2 } }, mission.desc),
            ),
            React.createElement('div', { style: { textAlign: 'right', flexShrink: 0 } },
              React.createElement('div', { style: { fontSize: 14, fontWeight: '700', color: theme.accent } }, `+${mission.points}`),
              React.createElement('div', { style: { fontSize: 9, color: theme.textMuted } }, 'pts')
            )
          ),
          React.createElement('div', { style: { display: 'flex', gap: 6, marginTop: 8, alignItems: 'center' } },
            React.createElement('span', {
              style: {
                fontSize: 10, padding: '2px 8px',
                background: `${difficultyColor[mission.difficulty]}22`,
                color: difficultyColor[mission.difficulty],
                border: `1px solid ${difficultyColor[mission.difficulty]}`,
                borderRadius: '8px 2px 8px 2px',
              }
            }, mission.difficulty),
            React.createElement('span', { style: { fontSize: 10, color: theme.textMuted } }, verifiedIcon[mission.verified]),
            React.createElement('span', { style: { fontSize: 10, color: theme.textMuted } }, mission.verified),
          ),
          !mission.done && React.createElement('div', { style: { marginTop: 8 } },
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', fontSize: 10, color: theme.textMuted, marginBottom: 3 } },
              React.createElement('span', {}, `Progress: ${mission.progress}/${mission.total}`),
              React.createElement('span', {}, `${Math.round(mission.progress/mission.total*100)}%`)
            ),
            React.createElement('div', { style: { height: 6, background: theme.bgSecondary, borderRadius: 3, overflow: 'hidden', border: `1px solid ${theme.border}` } },
              React.createElement('div', { style: { height: '100%', width: `${(mission.progress/mission.total)*100}%`, background: `linear-gradient(90deg, ${theme.primary}, ${theme.accent})`, borderRadius: 3 } })
            )
          )
        )
      )
    )
  );
}

// ──────────────────────────────────────────────────────────────────────────
// COMMUNITY / LEAGUE SCREEN
// ──────────────────────────────────────────────────────────────────────────
function CommunityScreen({ theme }) {
  const [activeLeague, setActiveLeague] = useState('city');

  const leagueData = {
    city: [
      { rank: 1, name: 'EcoWarrior_88', avatar: '🌲', points: 12840, badge: '🏆', isMe: false },
      { rank: 2, name: 'GreenRider', avatar: '🚲', points: 11200, badge: '🥈', isMe: false },
      { rank: 3, name: 'You', avatar: '🌿', points: 9840, badge: '🥉', isMe: true },
      { rank: 4, name: 'SolarSoph', avatar: '☀️', points: 8760, badge: '', isMe: false },
      { rank: 5, name: 'CompostKing', avatar: '🌱', points: 7300, badge: '', isMe: false },
      { rank: 6, name: 'WaterWise_J', avatar: '💧', points: 5800, badge: '', isMe: false },
    ],
    neighborhood: [
      { rank: 1, name: 'You', avatar: '🌿', points: 9840, badge: '🏆', isMe: true },
      { rank: 2, name: 'Maya K.', avatar: '🌸', points: 8200, badge: '🥈', isMe: false },
      { rank: 3, name: 'Alex R.', avatar: '🌳', points: 7600, badge: '🥉', isMe: false },
      { rank: 4, name: 'Raj P.', avatar: '🌱', points: 6400, badge: '', isMe: false },
    ]
  };

  const tournaments = [
    { id: 1, name: 'City Zero-Waste Month', emoji: '♻️', participants: 2840, endDate: 'Apr 30', prize: 'Eco Hamper', status: 'joined' },
    { id: 2, name: 'Neighborhood Bike Week', emoji: '🚲', participants: 340, endDate: 'Apr 14', prize: 'Local Vouchers', status: 'open' },
    { id: 3, name: 'Energy Save Championship', emoji: '⚡', participants: 1200, endDate: 'May 15', prize: 'Smart Plug Set', status: 'upcoming' },
  ];

  const currentLeague = leagueData[activeLeague];

  return React.createElement('div', { style: { paddingBottom: 16 } },
    // Header
    React.createElement('div', {
      style: {
        padding: '16px 20px 12px',
        background: `linear-gradient(160deg, ${theme.bgCard} 0%, ${theme.bgSecondary} 100%)`,
        borderBottom: `2px dashed ${theme.border}`,
        position: 'relative', overflow: 'hidden',
      }
    },
      React.createElement('div', { style: { position: 'absolute', top: -5, right: 0, opacity: 0.1, fontSize: 60 } }, '🏆'),
      React.createElement('div', { style: { fontSize: 26, fontWeight: '700', color: theme.text } }, '🏆 League'),
      React.createElement('div', { style: { fontSize: 12, color: theme.textSecondary } }, 'City-wide sustainability competitions'),
      React.createElement('div', { style: { marginTop: 8 } }, SquigglyDivider({ color: theme.border, width: 335 }))
    ),

    // League toggle
    React.createElement('div', { style: { padding: '14px 20px 8px' } },
      React.createElement('div', {
        style: {
          display: 'flex', background: theme.bgSecondary,
          borderRadius: '12px 3px 12px 3px',
          border: `2px dashed ${theme.border}`,
          overflow: 'hidden',
        }
      },
        ['city', 'neighborhood'].map(l =>
          React.createElement('div', {
            key: l,
            onClick: () => setActiveLeague(l),
            style: {
              flex: 1, textAlign: 'center',
              padding: '8px 0', cursor: 'pointer',
              background: activeLeague === l ? theme.primary : 'transparent',
              color: activeLeague === l ? '#fff' : theme.textMuted,
              fontSize: 13, fontWeight: activeLeague === l ? '700' : '400',
              transition: 'all 0.2s',
              borderRadius: activeLeague === l ? '10px 2px 10px 2px' : 0,
              fontFamily: "'Patrick Hand', cursive",
            }
          }, l === 'city' ? '🏙 City' : '🏘 Neighborhood')
        )
      )
    ),

    // Leaderboard
    React.createElement('div', { style: { padding: '8px 20px' } },
      React.createElement('div', { style: { fontSize: 13, fontWeight: '700', color: theme.textSecondary, marginBottom: 10 } }, 'Leaderboard'),
      ...currentLeague.map(entry =>
        React.createElement('div', {
          key: entry.rank,
          style: {
            background: entry.isMe ? `${theme.primary}22` : theme.bgCard,
            border: `2px ${entry.isMe ? 'solid' : 'dashed'} ${entry.isMe ? theme.primary : theme.border}`,
            borderRadius: '12px 3px 12px 3px',
            padding: '10px 14px',
            marginBottom: 8,
            display: 'flex', alignItems: 'center', gap: 12,
          }
        },
          React.createElement('div', { style: { width: 28, textAlign: 'center', fontSize: 14, fontWeight: '700', color: entry.rank <= 3 ? theme.accent : theme.textMuted } },
            entry.rank <= 3 ? ['🥇','🥈','🥉'][entry.rank-1] : `#${entry.rank}`
          ),
          React.createElement('div', { style: { fontSize: 24 } }, entry.avatar),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', { style: { fontSize: 14, fontWeight: '700', color: entry.isMe ? theme.accent : theme.text } },
              entry.name, entry.isMe ? ' (you)' : ''
            ),
            React.createElement('div', { style: { fontSize: 11, color: theme.textMuted } }, `${entry.points.toLocaleString()} EcoPoints`)
          ),
          entry.badge && React.createElement('div', { style: { fontSize: 18 } }, entry.badge)
        )
      )
    ),

    // Tournaments - horizontal scroll with nature texture
    React.createElement('div', { style: { padding: '12px 0 0' } },
      React.createElement('div', { style: { padding: '0 20px 10px', display: 'flex', justifyContent: 'space-between' } },
        React.createElement('span', { style: { fontSize: 16, fontWeight: '700', color: theme.text } }, '🌍 Tournaments'),
        React.createElement('span', { style: { fontSize: 11, color: theme.textMuted } }, 'Swipe →')
      ),
      React.createElement('div', {
        style: { display: 'flex', gap: 12, overflowX: 'auto', padding: '4px 20px 12px', scrollbarWidth: 'none' }
      },
        tournaments.map(t => {
          const statusColors = { joined: theme.success, open: theme.primary, upcoming: theme.warning };
          const statusLabels = { joined: '✓ Joined', open: '+ Join', upcoming: '⏳ Soon' };
          return React.createElement('div', {
            key: t.id,
            style: {
              flexShrink: 0, width: 155,
              background: theme.bgCard,
              border: `2px dashed ${theme.border}`,
              borderRadius: '16px 4px 16px 4px',
              padding: 14,
              position: 'relative', overflow: 'hidden',
            }
          },
            React.createElement('div', { style: { fontSize: 28, marginBottom: 6 } }, t.emoji),
            React.createElement('div', { style: { fontSize: 13, fontWeight: '700', color: theme.text, lineHeight: 1.2, marginBottom: 4 } }, t.name),
            React.createElement('div', { style: { fontSize: 10, color: theme.textMuted, marginBottom: 2 } }, `👥 ${t.participants.toLocaleString()} players`),
            React.createElement('div', { style: { fontSize: 10, color: theme.textMuted, marginBottom: 8 } }, `📅 Ends ${t.endDate}`),
            React.createElement('div', { style: { fontSize: 10, color: theme.accent, marginBottom: 8 } }, `🎁 ${t.prize}`),
            React.createElement('div', {
              style: {
                background: `${statusColors[t.status]}22`,
                border: `1.5px solid ${statusColors[t.status]}`,
                color: statusColors[t.status],
                borderRadius: '8px 2px 8px 2px',
                padding: '4px 10px',
                fontSize: 11, fontWeight: '700', textAlign: 'center',
                fontFamily: "'Patrick Hand', cursive",
              }
            }, statusLabels[t.status])
          );
        })
      )
    )
  );
}

// ──────────────────────────────────────────────────────────────────────────
// REWARDS SCREEN
// ──────────────────────────────────────────────────────────────────────────
function RewardsScreen({ theme }) {
  const [openedSurprise, setOpenedSurprise] = useState(false);

  const collectibles = [
    { id: 1, name: 'Ancient Oak', emoji: '🌳', rarity: 'Epic', unlocked: true },
    { id: 2, name: 'Solar Leaf', emoji: '🍃', rarity: 'Rare', unlocked: true },
    { id: 3, name: 'River Spirit', emoji: '💧', rarity: 'Common', unlocked: true },
    { id: 4, name: 'Wind Dancer', emoji: '🌬️', rarity: 'Legendary', unlocked: false },
    { id: 5, name: 'Seed Guardian', emoji: '🌱', rarity: 'Rare', unlocked: false },
    { id: 6, name: 'Frost Moss', emoji: '🪴', rarity: 'Epic', unlocked: false },
  ];

  const discounts = [
    { id: 1, shop: 'Green Bites Cafe', discount: '20% off', emoji: '🥗', expires: 'Apr 10', code: 'ECO20' },
    { id: 2, shop: 'Cycle City', discount: '15% off service', emoji: '🚲', expires: 'Apr 30', code: 'ECOBIKE15' },
    { id: 3, shop: 'Roots & Seeds', discount: 'Free seedling', emoji: '🪴', expires: 'May 1', code: 'FREESEED' },
  ];

  const rarityColor = { Common: theme.textMuted, Rare: '#4a9ef0', Epic: '#9a6ae0', Legendary: theme.warning };

  return React.createElement('div', { style: { paddingBottom: 16 } },
    // Header
    React.createElement('div', {
      style: {
        padding: '16px 20px 12px',
        background: `linear-gradient(160deg, ${theme.bgCard} 0%, ${theme.bgSecondary} 100%)`,
        borderBottom: `2px dashed ${theme.border}`,
        position: 'relative', overflow: 'hidden',
      }
    },
      React.createElement('div', { style: { position: 'absolute', top: -5, right: 0, opacity: 0.1, fontSize: 60 } }, '🎁'),
      React.createElement('div', { style: { fontSize: 26, fontWeight: '700', color: theme.text } }, '🎁 Rewards'),
      React.createElement('div', { style: { fontSize: 12, color: theme.textSecondary } }, 'Win duels. Unlock surprises.'),
      React.createElement('div', { style: { marginTop: 8 } }, SquigglyDivider({ color: theme.border, width: 335 }))
    ),

    // Mystery surprise box
    React.createElement('div', { style: { padding: '16px 20px' } },
      React.createElement('div', {
        style: {
          background: `linear-gradient(135deg, ${theme.accentBrown}44, ${theme.primary}44)`,
          border: `2px dashed ${theme.accentBrownLight}`,
          borderRadius: '20px 6px 20px 6px',
          padding: 20, textAlign: 'center',
          position: 'relative', overflow: 'hidden',
          cursor: 'pointer',
        },
        onClick: () => setOpenedSurprise(!openedSurprise)
      },
        React.createElement('div', { style: { fontSize: 48, marginBottom: 8 } }, openedSurprise ? '✨' : '📦'),
        React.createElement('div', { style: { fontSize: 16, fontWeight: '700', color: theme.text } },
          openedSurprise ? '🌿 Rare: Solar Leaf Collectible!' : '🎁 Daily Surprise Box'
        ),
        React.createElement('div', { style: { fontSize: 11, color: theme.textMuted, marginTop: 4 } },
          openedSurprise ? 'Added to your collection!' : 'Win a duel to unlock • Tap to peek'
        ),
        !openedSurprise && React.createElement('div', {
          style: {
            marginTop: 12,
            background: theme.accentBrownLight,
            color: '#fff',
            borderRadius: '10px 3px 10px 3px',
            padding: '6px 20px',
            fontSize: 13, fontWeight: '700',
            display: 'inline-block',
            fontFamily: "'Patrick Hand', cursive",
          }
        }, '🔓 Open (2 duels won)')
      )
    ),

    // Eco-Art Collectibles
    React.createElement('div', { style: { padding: '0 20px 12px' } },
      React.createElement('div', { style: { fontSize: 16, fontWeight: '700', color: theme.text, marginBottom: 12 } }, '🖼 Eco-Art Collection'),
      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 } },
        collectibles.map(c =>
          React.createElement('div', {
            key: c.id,
            style: {
              background: c.unlocked ? theme.bgCard : `${theme.bgCard}66`,
              border: `2px ${c.unlocked ? 'solid' : 'dashed'} ${c.unlocked ? rarityColor[c.rarity] : theme.border}`,
              borderRadius: '12px 3px 12px 3px',
              padding: '10px 6px',
              textAlign: 'center',
              opacity: c.unlocked ? 1 : 0.5,
              position: 'relative',
            }
          },
            React.createElement('div', { style: { fontSize: 28, marginBottom: 4, filter: c.unlocked ? 'none' : 'grayscale(1)' } }, c.emoji),
            React.createElement('div', { style: { fontSize: 10, color: theme.text, fontWeight: c.unlocked ? '700' : '400' } }, c.name),
            React.createElement('div', { style: { fontSize: 9, color: rarityColor[c.rarity], marginTop: 2 } }, c.rarity),
            !c.unlocked && React.createElement('div', {
              style: { position: 'absolute', top: 4, right: 4 }
            }, React.createElement(window.lucide.Lock, { size: 10, color: theme.textMuted }))
          )
        )
      )
    ),

    // Local Discounts
    React.createElement('div', { style: { padding: '0 20px' } },
      React.createElement('div', { style: { fontSize: 16, fontWeight: '700', color: theme.text, marginBottom: 12 } }, '🏪 Local Eco Discounts'),
      ...discounts.map(d =>
        React.createElement('div', {
          key: d.id,
          style: {
            background: theme.bgCard,
            border: `2px dashed ${theme.border}`,
            borderRadius: '16px 4px 16px 4px',
            padding: '12px 14px',
            marginBottom: 10,
            display: 'flex', alignItems: 'center', gap: 12,
          }
        },
          React.createElement('div', { style: { fontSize: 28, flexShrink: 0 } }, d.emoji),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', { style: { fontSize: 14, fontWeight: '700', color: theme.text } }, d.shop),
            React.createElement('div', { style: { fontSize: 12, color: theme.accent, fontWeight: '700' } }, d.discount),
            React.createElement('div', { style: { fontSize: 10, color: theme.textMuted } }, `Expires ${d.expires}`)
          ),
          React.createElement('div', {
            style: {
              background: `${theme.primary}22`,
              border: `1.5px solid ${theme.primary}`,
              borderRadius: '8px 2px 8px 2px',
              padding: '4px 8px',
              fontSize: 10, fontWeight: '700', color: theme.primary,
              textAlign: 'center',
              fontFamily: "'Patrick Hand', cursive",
            }
          }, d.code)
        )
      )
    )
  );
}

// ──────────────────────────────────────────────────────────────────────────
// PROFILE SCREEN
// ──────────────────────────────────────────────────────────────────────────
function ProfileScreen({ theme, themeMode, setThemeMode }) {
  const stats = [
    { label: 'Duels Won', value: 42, icon: '⚔️' },
    { label: 'EcoPoints', value: '9,840', icon: '🌱' },
    { label: 'Streak', value: '14d', icon: '🔥' },
    { label: 'CO₂ Saved', value: '38kg', icon: '🌍' },
  ];

  const badges = ['🌿', '🚲', '♻️', '☀️', '💧', '🌱'];

  const settings = [
    { label: 'Notifications', icon: window.lucide.Bell, value: 'On' },
    { label: 'Challenge Privacy', icon: window.lucide.Shield, value: 'Friends' },
    { label: 'Location Sharing', icon: window.lucide.MapPin, value: 'Neighborhood' },
    { label: 'Verified Actions', icon: window.lucide.CheckCircle, value: 'All enabled' },
  ];

  return React.createElement('div', { style: { paddingBottom: 16 } },
    // Profile header with nature art
    React.createElement('div', {
      style: {
        padding: '16px 20px 20px',
        background: `linear-gradient(160deg, ${theme.bgCard} 0%, ${theme.bgSecondary} 100%)`,
        borderBottom: `2px dashed ${theme.border}`,
        position: 'relative', overflow: 'hidden',
      }
    },
      // Nature texture background
      React.createElement('div', { style: { position: 'absolute', bottom: -10, right: -10, opacity: 0.1, fontSize: 80 } }, '🌲'),
      React.createElement('div', { style: { display: 'flex', gap: 16, alignItems: 'center' } },
        React.createElement('div', {
          style: {
            width: 72, height: 72,
            background: `${theme.primary}33`,
            border: `3px dashed ${theme.primary}`,
            borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 36,
            position: 'relative',
          }
        },
          '🌿',
          React.createElement('div', {
            style: {
              position: 'absolute', bottom: -4, right: -4,
              background: theme.accent, color: '#fff',
              borderRadius: '8px 2px 8px 2px',
              fontSize: 10, padding: '2px 6px', fontWeight: '700',
              fontFamily: "'Patrick Hand', cursive",
            }
          }, 'Lv.18')
        ),
        React.createElement('div', {},
          React.createElement('div', { style: { fontSize: 20, fontWeight: '700', color: theme.text } }, 'EcoQuester_You'),
          React.createElement('div', { style: { fontSize: 12, color: theme.textSecondary } }, '🏙 Greenfield City'),
          React.createElement('div', { style: { display: 'flex', gap: 4, marginTop: 6, flexWrap: 'wrap' } },
            badges.map((b, i) =>
              React.createElement('span', { key: i, style: { fontSize: 16 } }, b)
            )
          )
        )
      ),
      React.createElement('div', { style: { marginTop: 12 } }, SquigglyDivider({ color: theme.border, width: 335 }))
    ),

    // Stats grid
    React.createElement('div', { style: { padding: '16px 20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 } },
      stats.map(s =>
        React.createElement('div', {
          key: s.label,
          style: {
            background: theme.bgCard,
            border: `2px dashed ${theme.border}`,
            borderRadius: '12px 3px 12px 3px',
            padding: '12px 14px',
            textAlign: 'center',
          }
        },
          React.createElement('div', { style: { fontSize: 20 } }, s.icon),
          React.createElement('div', { style: { fontSize: 18, fontWeight: '700', color: theme.accent, marginTop: 4 } }, s.value),
          React.createElement('div', { style: { fontSize: 11, color: theme.textMuted } }, s.label)
        )
      )
    ),

    // Theme Toggle
    React.createElement('div', { style: { padding: '0 20px 12px' } },
      React.createElement('div', {
        style: {
          background: theme.bgCard,
          border: `2px dashed ${theme.border}`,
          borderRadius: '16px 4px 16px 4px',
          padding: '14px 16px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }
      },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10 } },
          React.createElement(window.lucide.Sun, { size: 18, color: theme.warning }),
          React.createElement('span', { style: { fontSize: 14, color: theme.text, fontFamily: "'Patrick Hand', cursive" } }, 'Theme Mode')
        ),
        React.createElement('div', {
          onClick: () => setThemeMode(themeMode === 'dark' ? 'light' : 'dark'),
          style: {
            width: 50, height: 26,
            background: themeMode === 'dark' ? theme.primary : theme.border,
            borderRadius: 13, cursor: 'pointer', position: 'relative',
            transition: 'background 0.3s',
            border: `2px solid ${theme.border}`,
          }
        },
          React.createElement('div', {
            style: {
              position: 'absolute', top: 2,
              left: themeMode === 'dark' ? 24 : 2,
              width: 18, height: 18,
              background: '#fff', borderRadius: '50%',
              transition: 'left 0.3s',
              boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
            }
          }),
        ),
        React.createElement('span', { style: { fontSize: 11, color: theme.textMuted, fontFamily: "'Patrick Hand', cursive" } },
          themeMode === 'dark' ? '🌙 Dark' : '☀️ Light'
        )
      )
    ),

    // Settings
    React.createElement('div', { style: { padding: '0 20px' } },
      React.createElement('div', { style: { fontSize: 14, fontWeight: '700', color: theme.textSecondary, marginBottom: 10 } }, 'Settings'),
      ...settings.map(s =>
        React.createElement('div', {
          key: s.label,
          style: {
            background: theme.bgCard,
            border: `1px solid ${theme.border}`,
            borderRadius: '10px 2px 10px 2px',
            padding: '10px 14px',
            marginBottom: 6,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }
        },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10 } },
            React.createElement(s.icon, { size: 16, color: theme.textMuted }),
            React.createElement('span', { style: { fontSize: 13, color: theme.text, fontFamily: "'Patrick Hand', cursive" } }, s.label)
          ),
          React.createElement('span', { style: { fontSize: 12, color: theme.accent, fontFamily: "'Patrick Hand', cursive" } }, s.value)
        )
      )
    )
  );
}
