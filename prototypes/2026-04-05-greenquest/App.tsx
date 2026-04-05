const { useState, useEffect, useRef } = React;

const themes = {
  light: {
    bg: '#ECFDF5',
    surface: '#ffffff',
    surfaceAlt: '#f0fdf4',
    border: '#d1fae5',
    borderMuted: '#e5e7eb',
    primary: '#059669',
    primaryDark: '#047857',
    secondary: '#10B981',
    cta: '#0891B2',
    ctaDark: '#0e7490',
    text: '#064e3b',
    textMuted: '#6b7280',
    textLight: '#9ca3af',
    cardShadow: '0 2px 16px rgba(5,150,105,0.10)',
    navBg: '#ffffff',
    navBorder: '#d1fae5',
    inputBg: '#f0fdf4',
    tagBg: '#d1fae5',
    tagText: '#065f46',
    scanBg: '#f0fdf4',
    overlay: 'rgba(236,253,245,0.92)',
  },
  dark: {
    bg: '#0a1a14',
    surface: '#112118',
    surfaceAlt: '#162e1e',
    border: '#1a3d26',
    borderMuted: '#1f2937',
    primary: '#10B981',
    primaryDark: '#059669',
    secondary: '#34d399',
    cta: '#22d3ee',
    ctaDark: '#0891B2',
    text: '#d1fae5',
    textMuted: '#6ee7b7',
    textLight: '#4b5563',
    cardShadow: '0 2px 24px rgba(0,0,0,0.5)',
    navBg: '#0f1f18',
    navBorder: '#1a3d26',
    inputBg: '#162e1e',
    tagBg: '#1a3d26',
    tagText: '#6ee7b7',
    scanBg: '#162e1e',
    overlay: 'rgba(10,26,20,0.92)',
  }
};

function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [isDark, setIsDark] = useState(false);
  const t = isDark ? themes.dark : themes.light;

  const screens = {
    home: HomeScreen,
    scan: ScanScreen,
    quests: QuestsScreen,
    leaderboard: LeaderboardScreen,
    community: CommunityScreen,
  };

  const ActiveScreen = screens[activeScreen];

  return React.createElement('div', {
    style: {
      minHeight: '100vh',
      background: '#f0f0f0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Inter', sans-serif",
    }
  },
    React.createElement('style', null, `
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(12px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes slideUp {
        from { opacity: 0; transform: translateY(24px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes pulse {
        0%, 100% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.06); opacity: 0.85; }
      }
      @keyframes shimmer {
        0% { background-position: -400px 0; }
        100% { background-position: 400px 0; }
      }
      @keyframes scanLine {
        0% { top: 10%; }
        50% { top: 80%; }
        100% { top: 10%; }
      }
      @keyframes ripple {
        0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(5,150,105,0.4); }
        70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(5,150,105,0); }
        100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(5,150,105,0); }
      }
      @keyframes floatBubble {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-6px); }
      }
      @keyframes scoreReveal {
        from { stroke-dashoffset: 220; }
        to { stroke-dashoffset: 44; }
      }
      .nav-tab:hover { opacity: 0.8; }
      .card-hover { transition: transform 150ms ease, box-shadow 150ms ease; }
      .card-hover:hover { transform: translateY(-2px); box-shadow: 0 6px 24px rgba(5,150,105,0.18) !important; }
      .btn-press:active { transform: scale(0.96); }
      .quest-item:hover { background: rgba(5,150,105,0.07) !important; }
      ::-webkit-scrollbar { width: 0px; }
    `),
    React.createElement('div', {
      style: {
        width: 375,
        height: 812,
        background: t.bg,
        borderRadius: 40,
        overflow: 'hidden',
        position: 'relative',
        boxShadow: '0 32px 80px rgba(0,0,0,0.22), 0 0 0 1px rgba(0,0,0,0.08)',
        display: 'flex',
        flexDirection: 'column',
      }
    },
      React.createElement('div', {
        style: { flex: 1, overflowY: 'auto', overflowX: 'hidden' }
      },
        React.createElement(ActiveScreen, { t, isDark, setIsDark, setActiveScreen })
      ),
      React.createElement(BottomNav, { activeScreen, setActiveScreen, t })
    )
  );
}

// ─── Bottom Navigation ───────────────────────────────────────────────────────

function BottomNav({ activeScreen, setActiveScreen, t }) {
  const tabs = [
    { id: 'home', icon: 'Home', label: 'Home' },
    { id: 'scan', icon: 'Camera', label: 'Scan' },
    { id: 'quests', icon: 'Zap', label: 'Quests' },
    { id: 'leaderboard', icon: 'Trophy', label: 'Ranks' },
    { id: 'community', icon: 'Globe', label: 'Wiki' },
  ];

  return React.createElement('div', {
    style: {
      background: t.navBg,
      borderTop: `1px solid ${t.navBorder}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      padding: '10px 8px 16px',
      boxShadow: `0 -4px 16px rgba(5,150,105,0.08)`,
      flexShrink: 0,
    }
  },
    tabs.map(tab =>
      React.createElement('button', {
        key: tab.id,
        className: 'nav-tab btn-press',
        onClick: () => setActiveScreen(tab.id),
        style: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 4,
          padding: '6px 12px',
          border: 'none',
          background: 'none',
          cursor: 'pointer',
          borderRadius: 12,
          minWidth: 48,
          minHeight: 44,
          transition: 'all 200ms ease',
          color: activeScreen === tab.id ? t.primary : t.textLight,
        }
      },
        React.createElement(window.lucide[tab.icon], {
          size: 22,
          strokeWidth: activeScreen === tab.id ? 2.5 : 1.8,
          color: activeScreen === tab.id ? t.primary : t.textLight,
        }),
        React.createElement('span', {
          style: {
            fontSize: 10,
            fontWeight: activeScreen === tab.id ? 700 : 500,
            letterSpacing: 0.2,
            color: activeScreen === tab.id ? t.primary : t.textLight,
          }
        }, tab.label)
      )
    )
  );
}

// ─── Home Screen ─────────────────────────────────────────────────────────────

function HomeScreen({ t, isDark, setIsDark, setActiveScreen }) {
  const recentScans = [
    { name: 'Oat Milk Latte', score: 'A', color: '#059669', impact: 'Low carbon', icon: 'Coffee' },
    { name: 'Cotton T-Shirt', score: 'C', color: '#d97706', impact: 'High water use', icon: 'Shirt' },
    { name: 'Bus Route 42', score: 'A+', color: '#047857', impact: 'Near zero', icon: 'Bus' },
    { name: 'Plastic Bottle', score: 'D', color: '#dc2626', impact: 'High waste', icon: 'Package' },
  ];

  return React.createElement('div', {
    style: { animation: 'fadeIn 300ms ease', paddingBottom: 8 }
  },
    // Header
    React.createElement('div', {
      style: {
        padding: '20px 20px 0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
      }
    },
      React.createElement('div', null,
        React.createElement('p', { style: { fontSize: 13, color: t.textMuted, margin: 0, fontWeight: 500 } }, 'Sunday, April 5'),
        React.createElement('h1', {
          style: {
            fontSize: 24,
            fontWeight: 800,
            color: t.text,
            margin: '2px 0 0',
            letterSpacing: -0.5,
          }
        }, 'Hey, Alex 🌿'),
      ),
      React.createElement('div', { style: { display: 'flex', gap: 8, alignItems: 'center' } },
        React.createElement('button', {
          className: 'btn-press',
          onClick: () => setIsDark(!isDark),
          style: {
            width: 40, height: 40,
            borderRadius: 20,
            border: `1.5px solid ${t.border}`,
            background: t.surface,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: t.cardShadow,
          }
        },
          React.createElement(window.lucide[isDark ? 'Sun' : 'Moon'], { size: 18, color: t.primary })
        ),
        React.createElement('div', {
          style: {
            width: 40, height: 40,
            borderRadius: 20,
            background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontSize: 16, fontWeight: 700,
            boxShadow: `0 4px 12px rgba(5,150,105,0.35)`,
          }
        }, 'A')
      )
    ),

    // Eco Score Card
    React.createElement('div', {
      style: {
        margin: '20px 20px 0',
        background: `linear-gradient(135deg, ${t.primary} 0%, #047857 100%)`,
        borderRadius: 24,
        padding: '20px 20px 16px',
        boxShadow: `0 8px 32px rgba(5,150,105,0.35)`,
        position: 'relative',
        overflow: 'hidden',
      }
    },
      React.createElement('div', {
        style: {
          position: 'absolute', top: -30, right: -20,
          width: 120, height: 120,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.08)',
        }
      }),
      React.createElement('div', {
        style: {
          position: 'absolute', bottom: -20, left: 60,
          width: 80, height: 80,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.06)',
        }
      }),
      React.createElement('p', { style: { color: 'rgba(255,255,255,0.8)', fontSize: 12, fontWeight: 600, margin: 0, letterSpacing: 1, textTransform: 'uppercase' } }, 'Your Eco Score'),
      React.createElement('div', { style: { display: 'flex', alignItems: 'flex-end', gap: 8, margin: '6px 0 4px' } },
        React.createElement('span', { style: { color: '#fff', fontSize: 52, fontWeight: 900, lineHeight: 1, letterSpacing: -2 } }, '7,840'),
        React.createElement('span', { style: { color: 'rgba(255,255,255,0.7)', fontSize: 14, fontWeight: 600, marginBottom: 8 } }, 'pts'),
      ),
      React.createElement('div', { style: { display: 'flex', gap: 6, alignItems: 'center', marginBottom: 16 } },
        React.createElement(window.lucide.TrendingUp, { size: 14, color: '#6ee7b7' }),
        React.createElement('span', { style: { color: '#6ee7b7', fontSize: 13, fontWeight: 600 } }, '+340 this week'),
      ),
      React.createElement('div', { style: { display: 'flex', gap: 12 } },
        [
          { label: 'Scans', value: '48', icon: 'Camera' },
          { label: 'Quests', value: '12', icon: 'Zap' },
          { label: 'Streak', value: '7d', icon: 'Flame' },
        ].map(stat =>
          React.createElement('div', {
            key: stat.label,
            style: {
              flex: 1,
              background: 'rgba(255,255,255,0.12)',
              borderRadius: 14,
              padding: '10px 8px',
              textAlign: 'center',
              backdropFilter: 'blur(4px)',
            }
          },
            React.createElement(window.lucide[stat.icon], { size: 14, color: 'rgba(255,255,255,0.85)', style: { margin: '0 auto 4px', display: 'block' } }),
            React.createElement('div', { style: { color: '#fff', fontSize: 18, fontWeight: 800 } }, stat.value),
            React.createElement('div', { style: { color: 'rgba(255,255,255,0.7)', fontSize: 10, fontWeight: 600, letterSpacing: 0.5 } }, stat.label),
          )
        )
      )
    ),

    // Daily Quest Banner
    React.createElement('div', {
      className: 'card-hover',
      onClick: () => setActiveScreen('quests'),
      style: {
        margin: '16px 20px 0',
        background: `linear-gradient(135deg, ${t.cta}15, ${t.cta}08)`,
        border: `1.5px solid ${t.cta}30`,
        borderRadius: 20,
        padding: '14px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        cursor: 'pointer',
        animation: 'floatBubble 3s ease-in-out infinite',
      }
    },
      React.createElement('div', {
        style: {
          width: 44, height: 44,
          borderRadius: 14,
          background: `${t.cta}20`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }
      },
        React.createElement(window.lucide.Zap, { size: 22, color: t.cta })
      ),
      React.createElement('div', { style: { flex: 1 } },
        React.createElement('p', { style: { margin: 0, fontSize: 11, color: t.cta, fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase' } }, 'Daily Quest Active'),
        React.createElement('p', { style: { margin: '2px 0 0', fontSize: 13, color: t.text, fontWeight: 600 } }, 'Find 3 A+ items at the grocery store'),
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6, marginTop: 6 } },
          React.createElement('div', {
            style: {
              flex: 1, height: 5, background: t.border, borderRadius: 3, overflow: 'hidden'
            }
          },
            React.createElement('div', {
              style: {
                width: '33%', height: '100%',
                background: `linear-gradient(90deg, ${t.cta}, ${t.secondary})`,
                borderRadius: 3,
                transition: 'width 600ms ease',
              }
            })
          ),
          React.createElement('span', { style: { fontSize: 11, color: t.textMuted, fontWeight: 600 } }, '1/3'),
        )
      ),
      React.createElement(window.lucide.ChevronRight, { size: 16, color: t.textMuted })
    ),

    // Recent Scans
    React.createElement('div', { style: { padding: '20px 20px 0' } },
      React.createElement('div', {
        style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }
      },
        React.createElement('h2', { style: { fontSize: 17, fontWeight: 800, color: t.text, margin: 0 } }, 'Recent Scans'),
        React.createElement('button', {
          className: 'btn-press',
          onClick: () => setActiveScreen('scan'),
          style: {
            fontSize: 12, color: t.primary, fontWeight: 700,
            background: 'none', border: 'none', cursor: 'pointer', padding: 0,
          }
        }, 'Scan new →')
      ),
      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 } },
        recentScans.map((item, i) =>
          React.createElement('div', {
            key: item.name,
            className: 'card-hover',
            style: {
              background: t.surface,
              borderRadius: 18,
              padding: '14px',
              border: `1px solid ${t.border}`,
              boxShadow: t.cardShadow,
              cursor: 'pointer',
              animation: `slideUp ${300 + i * 60}ms ease`,
            }
          },
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 } },
              React.createElement('div', {
                style: {
                  width: 36, height: 36, borderRadius: 10,
                  background: `${item.color}18`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }
              },
                React.createElement(window.lucide[item.icon], { size: 18, color: item.color })
              ),
              React.createElement('span', {
                style: {
                  fontSize: 16, fontWeight: 900, color: item.color,
                  background: `${item.color}15`, borderRadius: 8,
                  padding: '2px 8px', letterSpacing: -0.5,
                }
              }, item.score)
            ),
            React.createElement('p', { style: { fontSize: 13, fontWeight: 700, color: t.text, margin: '0 0 2px' } }, item.name),
            React.createElement('p', { style: { fontSize: 11, color: t.textMuted, margin: 0, fontWeight: 500 } }, item.impact),
          )
        )
      )
    ),

    // Tip Card
    React.createElement('div', {
      style: {
        margin: '16px 20px 20px',
        background: `${t.secondary}12`,
        border: `1.5px solid ${t.secondary}30`,
        borderRadius: 20,
        padding: '14px 16px',
        display: 'flex', gap: 12, alignItems: 'flex-start',
      }
    },
      React.createElement(window.lucide.Lightbulb, { size: 20, color: t.secondary, style: { flexShrink: 0, marginTop: 2 } }),
      React.createElement('div', null,
        React.createElement('p', { style: { margin: 0, fontSize: 12, fontWeight: 700, color: t.secondary, textTransform: 'uppercase', letterSpacing: 0.5 } }, 'Eco Tip'),
        React.createElement('p', { style: { margin: '3px 0 0', fontSize: 13, color: t.text, fontWeight: 500, lineHeight: 1.5 } },
          'Bringing a reusable bag to the grocery store saves ~2.4kg of CO₂ per month.'
        ),
      )
    )
  );
}

// ─── Scan Screen ─────────────────────────────────────────────────────────────

function ScanScreen({ t, isDark, setIsDark, setActiveScreen }) {
  const [mode, setMode] = useState('camera'); // camera | text
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState(null);
  const [input, setInput] = useState('');
  const [arMode, setArMode] = useState(false);

  const mockResults = [
    { name: 'Organic Almond Milk', score: 'A', grade: 92, color: '#059669', footprint: '0.7 kg CO₂e', water: '371L', renewable: '80%', tips: ['Choose refillable containers', 'Local brands reduce transport impact'], category: 'Food & Beverage' },
    { name: 'Cotton Tote Bag', score: 'B+', grade: 78, color: '#0891B2', footprint: '2.1 kg CO₂e', water: '800L', renewable: '60%', tips: ['Use 131+ times to offset production', 'Organic cotton is better'], category: 'Accessories' },
  ];

  const doScan = () => {
    setScanning(true);
    setResult(null);
    setTimeout(() => {
      setScanning(false);
      setResult(mockResults[Math.floor(Math.random() * mockResults.length)]);
    }, 2200);
  };

  const scoreGrade = result ? result.grade : 0;
  const circumference = 220;
  const dashOffset = circumference - (circumference * scoreGrade / 100);

  return React.createElement('div', {
    style: { animation: 'fadeIn 300ms ease', paddingBottom: 8 }
  },
    // Header
    React.createElement('div', {
      style: { padding: '20px 20px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }
    },
      React.createElement('h1', { style: { fontSize: 22, fontWeight: 800, color: t.text, margin: 0, letterSpacing: -0.5 } }, 'Eco Scan'),
      React.createElement('div', { style: { display: 'flex', gap: 8 } },
        React.createElement('button', {
          className: 'btn-press',
          onClick: () => setArMode(!arMode),
          style: {
            height: 36, paddingInline: 14,
            borderRadius: 18,
            border: `1.5px solid ${arMode ? t.primary : t.border}`,
            background: arMode ? `${t.primary}18` : t.surface,
            color: arMode ? t.primary : t.textMuted,
            fontSize: 12, fontWeight: 700,
            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
          }
        },
          React.createElement(window.lucide.Layers, { size: 14, color: arMode ? t.primary : t.textMuted }),
          React.createElement('span', null, 'AR')
        ),
        React.createElement('button', {
          className: 'btn-press',
          onClick: () => setIsDark(!isDark),
          style: {
            width: 36, height: 36, borderRadius: 18,
            border: `1.5px solid ${t.border}`, background: t.surface,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
          }
        }, React.createElement(window.lucide[isDark ? 'Sun' : 'Moon'], { size: 16, color: t.primary }))
      )
    ),

    // Mode Toggle
    React.createElement('div', {
      style: {
        margin: '0 20px 16px',
        background: t.surfaceAlt,
        borderRadius: 14,
        padding: 4,
        display: 'flex',
        border: `1px solid ${t.border}`,
      }
    },
      ['camera', 'text'].map(m =>
        React.createElement('button', {
          key: m,
          className: 'btn-press',
          onClick: () => { setMode(m); setResult(null); setScanning(false); },
          style: {
            flex: 1,
            padding: '9px',
            borderRadius: 10,
            border: 'none',
            background: mode === m ? t.primary : 'transparent',
            color: mode === m ? '#fff' : t.textMuted,
            fontSize: 13, fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 200ms ease',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
          }
        },
          React.createElement(window.lucide[m === 'camera' ? 'Camera' : 'Type'], { size: 14, color: mode === m ? '#fff' : t.textMuted }),
          React.createElement('span', null, m === 'camera' ? 'Camera Scan' : 'Describe Item')
        )
      )
    ),

    // Camera View / Text Input
    mode === 'camera' ? React.createElement('div', {
      style: {
        margin: '0 20px',
        height: 220,
        borderRadius: 24,
        background: t.scanBg,
        border: `2px dashed ${scanning ? t.primary : t.border}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative', overflow: 'hidden',
        transition: 'border-color 300ms ease',
      }
    },
      scanning && React.createElement('div', {
        style: {
          position: 'absolute', left: '10%', right: '10%', height: 2,
          background: `linear-gradient(90deg, transparent, ${t.primary}, transparent)`,
          animation: 'scanLine 1.6s ease-in-out infinite',
          boxShadow: `0 0 12px ${t.primary}`,
        }
      }),
      !scanning && !result && React.createElement('div', { style: { textAlign: 'center' } },
        React.createElement('div', {
          style: {
            width: 64, height: 64, borderRadius: 20,
            background: `${t.primary}15`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 12px',
            animation: 'pulse 2s ease-in-out infinite',
          }
        },
          React.createElement(window.lucide.Camera, { size: 28, color: t.primary })
        ),
        React.createElement('p', { style: { fontSize: 14, color: t.text, fontWeight: 600, margin: '0 0 4px' } }, 'Point at any object'),
        React.createElement('p', { style: { fontSize: 12, color: t.textMuted, margin: 0 } }, 'Products, food, packaging, transport'),
      ),
      scanning && React.createElement('div', { style: { textAlign: 'center' } },
        React.createElement('div', {
          style: {
            width: 64, height: 64, borderRadius: 20,
            background: `${t.primary}20`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 12px',
          }
        },
          React.createElement(window.lucide.Scan, { size: 28, color: t.primary })
        ),
        React.createElement('p', { style: { fontSize: 14, color: t.primary, fontWeight: 700, margin: 0 } }, 'Analyzing eco-impact...'),
      ),
      arMode && !scanning && React.createElement('div', {
        style: {
          position: 'absolute', top: 10, left: 10,
          background: `${t.primary}20`, borderRadius: 10, padding: '4px 10px',
          display: 'flex', alignItems: 'center', gap: 5,
          backdropFilter: 'blur(8px)',
          border: `1px solid ${t.primary}30`,
        }
      },
        React.createElement(window.lucide.Layers, { size: 12, color: t.primary }),
        React.createElement('span', { style: { fontSize: 10, color: t.primary, fontWeight: 700 } }, 'AR Active'),
      ),
    ) : React.createElement('div', { style: { margin: '0 20px' } },
      React.createElement('textarea', {
        value: input,
        onChange: e => setInput(e.target.value),
        placeholder: "Describe the item or action (e.g. 'a disposable plastic coffee cup' or 'taking the subway to work')...",
        style: {
          width: '100%', height: 100,
          background: t.inputBg,
          border: `1.5px solid ${t.border}`,
          borderRadius: 18,
          padding: '14px 16px',
          fontSize: 14, color: t.text,
          fontFamily: "'Inter', sans-serif",
          resize: 'none',
          outline: 'none',
          boxSizing: 'border-box',
          lineHeight: 1.5,
        }
      }),
    ),

    // Scan Button
    React.createElement('div', { style: { padding: '14px 20px 0' } },
      React.createElement('button', {
        className: 'btn-press',
        onClick: doScan,
        disabled: scanning,
        style: {
          width: '100%', height: 52,
          borderRadius: 18,
          border: 'none',
          background: scanning ? `${t.primary}60` : `linear-gradient(135deg, ${t.primary}, #047857)`,
          color: '#fff',
          fontSize: 15, fontWeight: 800,
          cursor: scanning ? 'default' : 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          boxShadow: scanning ? 'none' : `0 4px 20px rgba(5,150,105,0.4)`,
          transition: 'all 200ms ease',
          letterSpacing: 0.3,
          animation: !scanning && !result ? 'ripple 2s ease-in-out infinite' : 'none',
        }
      },
        React.createElement(window.lucide[scanning ? 'Loader' : 'Scan'], { size: 20, color: '#fff' }),
        React.createElement('span', null, scanning ? 'Scanning...' : `${mode === 'camera' ? 'Scan Object' : 'Reveal Eco-Score'}`)
      )
    ),

    // Result Card
    result && React.createElement('div', {
      style: {
        margin: '16px 20px 0',
        background: t.surface,
        borderRadius: 24,
        padding: 18,
        border: `1px solid ${t.border}`,
        boxShadow: t.cardShadow,
        animation: 'slideUp 400ms ease',
      }
    },
      React.createElement('div', { style: { display: 'flex', gap: 14, alignItems: 'center', marginBottom: 16 } },
        // Score Circle
        React.createElement('div', { style: { position: 'relative', flexShrink: 0 } },
          React.createElement('svg', { width: 72, height: 72, viewBox: '0 0 72 72' },
            React.createElement('circle', { cx: 36, cy: 36, r: 30, fill: 'none', stroke: t.border, strokeWidth: 6 }),
            React.createElement('circle', {
              cx: 36, cy: 36, r: 30,
              fill: 'none', stroke: result.color, strokeWidth: 6,
              strokeLinecap: 'round',
              strokeDasharray: '188.4',
              strokeDashoffset: 188.4 - (188.4 * result.grade / 100),
              transform: 'rotate(-90 36 36)',
              style: { transition: 'stroke-dashoffset 1s ease' }
            }),
            React.createElement('text', { x: 36, y: 40, textAnchor: 'middle', fontSize: 20, fontWeight: 900, fill: result.color }, result.score),
          )
        ),
        React.createElement('div', { style: { flex: 1 } },
          React.createElement('p', { style: { margin: '0 0 2px', fontSize: 16, fontWeight: 800, color: t.text } }, result.name),
          React.createElement('p', { style: { margin: '0 0 8px', fontSize: 11, color: t.textMuted, fontWeight: 500 } }, result.category),
          React.createElement('div', { style: { display: 'flex', gap: 8 } },
            React.createElement('div', { style: { textAlign: 'center', flex: 1, background: t.surfaceAlt, borderRadius: 10, padding: '6px 4px' } },
              React.createElement('p', { style: { margin: 0, fontSize: 11, fontWeight: 800, color: t.text } }, result.footprint),
              React.createElement('p', { style: { margin: 0, fontSize: 9, color: t.textMuted, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.3 } }, 'Carbon'),
            ),
            React.createElement('div', { style: { textAlign: 'center', flex: 1, background: t.surfaceAlt, borderRadius: 10, padding: '6px 4px' } },
              React.createElement('p', { style: { margin: 0, fontSize: 11, fontWeight: 800, color: t.text } }, result.water),
              React.createElement('p', { style: { margin: 0, fontSize: 9, color: t.textMuted, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.3 } }, 'Water'),
            ),
            React.createElement('div', { style: { textAlign: 'center', flex: 1, background: t.surfaceAlt, borderRadius: 10, padding: '6px 4px' } },
              React.createElement('p', { style: { margin: 0, fontSize: 11, fontWeight: 800, color: t.text } }, result.renewable),
              React.createElement('p', { style: { margin: 0, fontSize: 9, color: t.textMuted, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.3 } }, 'Renew.'),
            ),
          )
        )
      ),
      React.createElement('div', { style: { borderTop: `1px solid ${t.border}`, paddingTop: 12 } },
        React.createElement('p', { style: { margin: '0 0 8px', fontSize: 12, fontWeight: 700, color: t.primary, textTransform: 'uppercase', letterSpacing: 0.5 } }, 'Eco Tips'),
        result.tips.map((tip, i) =>
          React.createElement('div', {
            key: i,
            style: { display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: i < result.tips.length - 1 ? 6 : 0 }
          },
            React.createElement(window.lucide.Leaf, { size: 13, color: t.secondary, style: { flexShrink: 0, marginTop: 1 } }),
            React.createElement('span', { style: { fontSize: 12, color: t.text, fontWeight: 500, lineHeight: 1.4 } }, tip)
          )
        )
      )
    )
  );
}

// ─── Quests Screen ─────────────────────────────────────────────────────────────

function QuestsScreen({ t, isDark, setIsDark, setActiveScreen }) {
  const [tab, setTab] = useState('daily');
  const [completed, setCompleted] = useState(new Set([0]));

  const dailyQuests = [
    { id: 0, title: 'Grocery A+ Hunter', desc: 'Find 3 items with an A+ Eco-Score at the grocery store', reward: 150, progress: 1, total: 3, icon: 'ShoppingBag', done: true },
    { id: 1, title: 'Low-Carbon Commute', desc: 'Take public transit or bike to your workplace', reward: 200, progress: 0, total: 1, icon: 'Train' },
    { id: 2, title: 'Packaging Detective', desc: 'Scan 5 different packaging materials', reward: 100, progress: 3, total: 5, icon: 'Package' },
    { id: 3, title: 'Water Wise', desc: 'Discover a product with water usage under 50L', reward: 120, progress: 0, total: 1, icon: 'Droplets' },
  ];

  const weeklyQuests = [
    { id: 10, title: 'Green Week Challenge', desc: 'Complete all daily quests for 5 consecutive days', reward: 1000, progress: 3, total: 5, icon: 'Calendar' },
    { id: 11, title: 'Community Contributor', desc: 'Add eco data for 10 new products to the Wiki', reward: 800, progress: 4, total: 10, icon: 'Globe' },
    { id: 12, title: 'Zero Plastic Week', desc: 'Avoid scanning any D/F rated plastic products', reward: 1500, progress: 6, total: 7, icon: 'Leaf' },
  ];

  const quests = tab === 'daily' ? dailyQuests : weeklyQuests;

  return React.createElement('div', {
    style: { animation: 'fadeIn 300ms ease', paddingBottom: 8 }
  },
    // Header
    React.createElement('div', { style: { padding: '20px 20px 14px' } },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 } },
        React.createElement('h1', { style: { fontSize: 22, fontWeight: 800, color: t.text, margin: 0, letterSpacing: -0.5 } }, 'GreenQuests'),
        React.createElement('div', {
          style: {
            background: `${t.primary}15`, borderRadius: 12, padding: '6px 12px',
            display: 'flex', alignItems: 'center', gap: 5,
          }
        },
          React.createElement(window.lucide.Zap, { size: 14, color: t.primary }),
          React.createElement('span', { style: { fontSize: 13, fontWeight: 800, color: t.primary } }, '7 day streak!')
        )
      ),
      React.createElement('p', { style: { fontSize: 13, color: t.textMuted, margin: 0, fontWeight: 500 } }, 'Complete quests to earn eco-points & climb the ranks'),
    ),

    // Tab Toggle
    React.createElement('div', {
      style: { margin: '0 20px 16px', display: 'flex', background: t.surfaceAlt, borderRadius: 14, padding: 4, border: `1px solid ${t.border}` }
    },
      ['daily', 'weekly'].map(t2 =>
        React.createElement('button', {
          key: t2,
          className: 'btn-press',
          onClick: () => setTab(t2),
          style: {
            flex: 1, padding: '9px',
            borderRadius: 10, border: 'none',
            background: tab === t2 ? t.primary : 'transparent',
            color: tab === t2 ? '#fff' : t.textMuted,
            fontSize: 13, fontWeight: 700,
            cursor: 'pointer', transition: 'all 200ms ease',
          }
        }, React.createElement('span', null, t2 === 'daily' ? '⚡ Daily' : '🏆 Weekly'))
      )
    ),

    // Progress Banner
    React.createElement('div', {
      style: {
        margin: '0 20px 16px',
        background: `linear-gradient(135deg, ${t.primary}12, ${t.secondary}08)`,
        borderRadius: 18,
        padding: '12px 16px',
        border: `1px solid ${t.primary}20`,
        display: 'flex', alignItems: 'center', gap: 14,
      }
    },
      React.createElement('div', {
        style: {
          width: 48, height: 48,
          borderRadius: '50%',
          background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0, boxShadow: `0 4px 12px rgba(5,150,105,0.3)`,
        }
      },
        React.createElement(window.lucide.Target, { size: 22, color: '#fff' })
      ),
      React.createElement('div', { style: { flex: 1 } },
        React.createElement('p', { style: { margin: '0 0 4px', fontSize: 13, fontWeight: 700, color: t.text } },
          tab === 'daily' ? '1 of 4 daily quests done' : '0 of 3 weekly quests done'
        ),
        React.createElement('div', {
          style: { height: 6, background: t.border, borderRadius: 3, overflow: 'hidden' }
        },
          React.createElement('div', {
            style: {
              width: tab === 'daily' ? '25%' : '0%', height: '100%',
              background: `linear-gradient(90deg, ${t.primary}, ${t.secondary})`,
              borderRadius: 3, transition: 'width 600ms ease',
            }
          })
        ),
      ),
      React.createElement('div', { style: { textAlign: 'center' } },
        React.createElement('p', { style: { margin: 0, fontSize: 20, fontWeight: 900, color: t.primary } },
          tab === 'daily' ? '570' : '3,300'
        ),
        React.createElement('p', { style: { margin: 0, fontSize: 10, color: t.textMuted, fontWeight: 600 } }, 'pts left'),
      )
    ),

    // Quest List
    React.createElement('div', { style: { padding: '0 20px' } },
      quests.map((q, i) =>
        React.createElement('div', {
          key: q.id,
          className: 'quest-item card-hover',
          style: {
            background: t.surface,
            borderRadius: 20,
            padding: '14px',
            marginBottom: 10,
            border: `1.5px solid ${completed.has(q.id) || q.done ? t.primary + '40' : t.border}`,
            boxShadow: t.cardShadow,
            opacity: completed.has(q.id) || q.done ? 0.75 : 1,
            animation: `slideUp ${250 + i * 60}ms ease`,
            cursor: 'pointer',
            transition: 'all 200ms ease',
          }
        },
          React.createElement('div', { style: { display: 'flex', gap: 12, alignItems: 'flex-start' } },
            React.createElement('div', {
              style: {
                width: 42, height: 42, borderRadius: 13,
                background: completed.has(q.id) || q.done ? `${t.primary}20` : t.surfaceAlt,
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }
            },
              completed.has(q.id) || q.done
                ? React.createElement(window.lucide.CheckCircle2, { size: 22, color: t.primary })
                : React.createElement(window.lucide[q.icon], { size: 22, color: t.textMuted })
            ),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' } },
                React.createElement('p', { style: { margin: '0 0 3px', fontSize: 14, fontWeight: 700, color: t.text } }, q.title),
                React.createElement('div', {
                  style: {
                    background: `${t.primary}15`, borderRadius: 8, padding: '3px 8px',
                    display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0,
                  }
                },
                  React.createElement(window.lucide.Zap, { size: 11, color: t.primary }),
                  React.createElement('span', { style: { fontSize: 11, fontWeight: 800, color: t.primary } }, `+${q.reward}`)
                )
              ),
              React.createElement('p', { style: { margin: '0 0 8px', fontSize: 12, color: t.textMuted, fontWeight: 500, lineHeight: 1.4 } }, q.desc),
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8 } },
                React.createElement('div', { style: { flex: 1, height: 5, background: t.border, borderRadius: 3, overflow: 'hidden' } },
                  React.createElement('div', {
                    style: {
                      width: `${(q.progress / q.total) * 100}%`, height: '100%',
                      background: `linear-gradient(90deg, ${t.primary}, ${t.secondary})`,
                      borderRadius: 3,
                    }
                  })
                ),
                React.createElement('span', { style: { fontSize: 11, color: t.textMuted, fontWeight: 600 } }, `${q.progress}/${q.total}`),
              )
            )
          )
        )
      )
    )
  );
}

// ─── Leaderboard Screen ───────────────────────────────────────────────────────

function LeaderboardScreen({ t, isDark, setIsDark, setActiveScreen }) {
  const [view, setView] = useState('friends');

  const friends = [
    { rank: 1, name: 'Maya Chen', pts: 12840, badge: '🌱', avatar: 'M', color: '#059669', change: '+2' },
    { rank: 2, name: 'Alex (You)', pts: 7840, badge: '⚡', avatar: 'A', color: '#0891B2', change: '—', isYou: true },
    { rank: 3, name: 'Jordan Park', pts: 6520, badge: '🌿', avatar: 'J', color: '#7c3aed', change: '-1' },
    { rank: 4, name: 'Sam Rivers', pts: 5200, badge: '🌊', avatar: 'S', color: '#d97706', change: '+1' },
    { rank: 5, name: 'Riley Moss', pts: 3940, badge: '🍃', avatar: 'R', color: '#ec4899', change: '+3' },
  ];

  const global = [
    { rank: 1, name: 'GreenGuru99', pts: 94210, badge: '🏆', avatar: 'G', color: '#f59e0b', change: '—' },
    { rank: 2, name: 'EcoWarrior', pts: 87340, badge: '🌍', avatar: 'E', color: '#059669', change: '+1' },
    { rank: 3, name: 'PlanetFirst', pts: 76890, badge: '⭐', avatar: 'P', color: '#0891B2', change: '-1' },
    { rank: 4, name: 'CleanEarth', pts: 65120, badge: '💧', avatar: 'C', color: '#7c3aed', change: '+2' },
    { rank: 5, name: 'NatureHero', pts: 58400, badge: '🌱', avatar: 'N', color: '#10B981', change: '+1' },
    { rank: 247, name: 'Alex (You)', pts: 7840, badge: '⚡', avatar: 'A', color: '#0891B2', change: '+18', isYou: true },
  ];

  const data = view === 'friends' ? friends : global;
  const podium = data.slice(0, 3);
  const rest = data.slice(3);

  const podiumHeights = [140, 180, 110];
  const podiumOrder = [1, 0, 2]; // 2nd, 1st, 3rd

  return React.createElement('div', {
    style: { animation: 'fadeIn 300ms ease', paddingBottom: 8 }
  },
    // Header
    React.createElement('div', { style: { padding: '20px 20px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
      React.createElement('h1', { style: { fontSize: 22, fontWeight: 800, color: t.text, margin: 0, letterSpacing: -0.5 } }, 'Leaderboard'),
      React.createElement('div', {
        style: {
          background: `${t.primary}15`, borderRadius: 12, padding: '6px 12px',
          display: 'flex', alignItems: 'center', gap: 5,
        }
      },
        React.createElement(window.lucide.Trophy, { size: 14, color: '#f59e0b' }),
        React.createElement('span', { style: { fontSize: 12, fontWeight: 700, color: t.text } }, 'Week 14')
      )
    ),

    // View Toggle
    React.createElement('div', {
      style: { margin: '0 20px 16px', display: 'flex', background: t.surfaceAlt, borderRadius: 14, padding: 4, border: `1px solid ${t.border}` }
    },
      ['friends', 'global'].map(v =>
        React.createElement('button', {
          key: v,
          className: 'btn-press',
          onClick: () => setView(v),
          style: {
            flex: 1, padding: '9px',
            borderRadius: 10, border: 'none',
            background: view === v ? t.primary : 'transparent',
            color: view === v ? '#fff' : t.textMuted,
            fontSize: 13, fontWeight: 700,
            cursor: 'pointer', transition: 'all 200ms ease',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
          }
        },
          React.createElement(window.lucide[v === 'friends' ? 'Users' : 'Globe'], { size: 14, color: view === v ? '#fff' : t.textMuted }),
          React.createElement('span', null, v === 'friends' ? 'Friends' : 'Global')
        )
      )
    ),

    // Podium
    React.createElement('div', {
      style: {
        margin: '0 20px 16px',
        background: `linear-gradient(180deg, ${t.primary}12 0%, transparent 100%)`,
        borderRadius: 24,
        padding: '16px 12px 0',
        border: `1px solid ${t.primary}15`,
      }
    },
      React.createElement('div', {
        style: { display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 8 }
      },
        podiumOrder.map(idx => {
          const p = podium[idx];
          const height = podiumHeights[idx];
          const isFirst = idx === 0;
          return React.createElement('div', {
            key: p.rank,
            style: { display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }
          },
            isFirst && React.createElement(window.lucide.Crown, { size: 18, color: '#f59e0b', style: { marginBottom: 4, animation: 'pulse 2s ease-in-out infinite' } }),
            React.createElement('div', {
              style: {
                width: 40, height: 40, borderRadius: 20,
                background: `linear-gradient(135deg, ${p.color}, ${p.color}cc)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontSize: 15, fontWeight: 800,
                boxShadow: isFirst ? `0 4px 16px ${p.color}50` : `0 2px 8px ${p.color}30`,
                marginBottom: 6,
                border: p.isYou ? `2px solid ${t.primary}` : 'none',
              }
            }, p.avatar),
            React.createElement('p', { style: { margin: '0 0 6px', fontSize: 11, fontWeight: 700, color: t.text, textAlign: 'center' } },
              p.name.split(' ')[0]
            ),
            React.createElement('div', {
              style: {
                width: '100%',
                height: height,
                borderRadius: '14px 14px 0 0',
                background: isFirst
                  ? `linear-gradient(180deg, ${t.primary}, ${t.primaryDark})`
                  : idx === 1
                    ? `linear-gradient(180deg, #c0c0c0, #9ca3af)`
                    : `linear-gradient(180deg, #cd7f32, #92400e)`,
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start',
                paddingTop: 10,
              }
            },
              React.createElement('span', { style: { fontSize: isFirst ? 20 : 16, fontWeight: 900, color: '#fff' } },
                p.rank === 1 ? '1st' : p.rank === 2 ? '2nd' : '3rd'
              ),
              React.createElement('span', { style: { fontSize: 10, color: 'rgba(255,255,255,0.8)', fontWeight: 600 } },
                (p.pts / 1000).toFixed(1) + 'k'
              )
            )
          );
        })
      )
    ),

    // Rest of list
    React.createElement('div', { style: { padding: '0 20px' } },
      rest.map((p, i) =>
        React.createElement('div', {
          key: p.rank,
          className: 'card-hover',
          style: {
            background: p.isYou ? `${t.primary}08` : t.surface,
            borderRadius: 16,
            padding: '12px 14px',
            marginBottom: 8,
            border: `1.5px solid ${p.isYou ? t.primary + '40' : t.border}`,
            display: 'flex', alignItems: 'center', gap: 12,
            animation: `slideUp ${200 + i * 50}ms ease`,
          }
        },
          React.createElement('span', { style: { fontSize: 13, fontWeight: 800, color: t.textMuted, width: 24, textAlign: 'center' } }, `#${p.rank}`),
          React.createElement('div', {
            style: {
              width: 36, height: 36, borderRadius: 18,
              background: `${p.color}25`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: p.color, fontSize: 14, fontWeight: 800, flexShrink: 0,
            }
          }, p.avatar),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('p', { style: { margin: 0, fontSize: 14, fontWeight: p.isYou ? 800 : 600, color: t.text } }, p.name),
            React.createElement('p', { style: { margin: 0, fontSize: 11, color: t.textMuted, fontWeight: 500 } }, `${p.pts.toLocaleString()} pts`),
          ),
          React.createElement('span', {
            style: {
              fontSize: 11, fontWeight: 700,
              color: p.change.startsWith('+') ? t.primary : p.change === '—' ? t.textMuted : '#dc2626',
            }
          }, p.change)
        )
      )
    )
  );
}

// ─── Community Screen ─────────────────────────────────────────────────────────

function CommunityScreen({ t, isDark, setIsDark, setActiveScreen }) {
  const [search, setSearch] = useState('');
  const [liked, setLiked] = useState(new Set());

  const entries = [
    { id: 0, name: 'Bamboo Toothbrush', score: 'A+', color: '#047857', category: 'Personal Care', author: 'Maya C.', likes: 234, verified: true, summary: 'Biodegradable handle, 95% less plastic than standard.', icon: 'Smile' },
    { id: 1, name: 'Oat Milk (Tetra Pak)', score: 'A', color: '#059669', category: 'Food & Drink', author: 'GreenGuru', likes: 187, verified: true, summary: '80% lower emissions than dairy milk, recyclable carton.', icon: 'Coffee' },
    { id: 2, name: 'Fast Fashion Jeans', score: 'D', color: '#dc2626', category: 'Clothing', author: 'EcoWatcher', likes: 156, verified: false, summary: 'Uses 7,000L of water per pair, often synthetic blends.', icon: 'Shirt' },
    { id: 3, name: 'Electric Bus Route', score: 'A+', color: '#047857', category: 'Transport', author: 'UrbanGreen', likes: 312, verified: true, summary: 'Zero-emission urban transit. Charges via solar grid.', icon: 'Bus' },
    { id: 4, name: 'Single-use Coffee Pod', score: 'F', color: '#7f1d1d', category: 'Kitchen', author: 'CleanHome', likes: 98, verified: false, summary: 'Aluminium + plastic combo rarely recycled. High waste.', icon: 'Package' },
  ];

  const filtered = entries.filter(e =>
    !search || e.name.toLowerCase().includes(search.toLowerCase()) || e.category.toLowerCase().includes(search.toLowerCase())
  );

  return React.createElement('div', {
    style: { animation: 'fadeIn 300ms ease', paddingBottom: 8 }
  },
    // Header
    React.createElement('div', { style: { padding: '20px 20px 14px' } },
      React.createElement('h1', { style: { fontSize: 22, fontWeight: 800, color: t.text, margin: '0 0 4px', letterSpacing: -0.5 } }, 'Eco Wiki'),
      React.createElement('p', { style: { fontSize: 13, color: t.textMuted, margin: 0, fontWeight: 500 } }, 'Community-powered sustainability database'),
    ),

    // Stats Row
    React.createElement('div', {
      style: { display: 'flex', gap: 10, padding: '0 20px 16px' }
    },
      [
        { val: '48.2k', label: 'Entries', icon: 'Database' },
        { val: '12.4k', label: 'Contributors', icon: 'Users' },
        { val: '94%', label: 'Verified', icon: 'ShieldCheck' },
      ].map(s =>
        React.createElement('div', {
          key: s.label,
          style: {
            flex: 1, background: t.surface,
            borderRadius: 16, padding: '10px 8px',
            border: `1px solid ${t.border}`,
            textAlign: 'center',
            boxShadow: t.cardShadow,
          }
        },
          React.createElement(window.lucide[s.icon], { size: 14, color: t.primary, style: { margin: '0 auto 4px', display: 'block' } }),
          React.createElement('div', { style: { fontSize: 16, fontWeight: 800, color: t.text } }, s.val),
          React.createElement('div', { style: { fontSize: 10, color: t.textMuted, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.3 } }, s.label),
        )
      )
    ),

    // Search
    React.createElement('div', {
      style: {
        margin: '0 20px 14px',
        display: 'flex', alignItems: 'center', gap: 10,
        background: t.inputBg,
        borderRadius: 16, padding: '10px 14px',
        border: `1.5px solid ${t.border}`,
      }
    },
      React.createElement(window.lucide.Search, { size: 16, color: t.textMuted }),
      React.createElement('input', {
        value: search,
        onChange: e => setSearch(e.target.value),
        placeholder: 'Search products, foods, transport...',
        style: {
          flex: 1, border: 'none', background: 'transparent',
          fontSize: 13, color: t.text, fontFamily: "'Inter', sans-serif",
          outline: 'none',
        }
      })
    ),

    // Add Button
    React.createElement('button', {
      className: 'btn-press',
      style: {
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        margin: '0 20px 16px',
        width: 'calc(100% - 40px)',
        height: 46,
        borderRadius: 14,
        border: `1.5px dashed ${t.primary}`,
        background: `${t.primary}08`,
        color: t.primary,
        fontSize: 13, fontWeight: 700,
        cursor: 'pointer',
        transition: 'all 200ms ease',
      }
    },
      React.createElement(window.lucide.Plus, { size: 16, color: t.primary }),
      React.createElement('span', null, 'Contribute a new eco entry')
    ),

    // Entries
    React.createElement('div', { style: { padding: '0 20px' } },
      filtered.map((e, i) =>
        React.createElement('div', {
          key: e.id,
          className: 'card-hover',
          style: {
            background: t.surface,
            borderRadius: 20,
            padding: '14px',
            marginBottom: 10,
            border: `1px solid ${t.border}`,
            boxShadow: t.cardShadow,
            animation: `slideUp ${200 + i * 60}ms ease`,
            cursor: 'pointer',
          }
        },
          React.createElement('div', { style: { display: 'flex', gap: 12, alignItems: 'flex-start' } },
            React.createElement('div', {
              style: {
                width: 42, height: 42, borderRadius: 13,
                background: `${e.color}15`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }
            },
              React.createElement(window.lucide[e.icon], { size: 20, color: e.color })
            ),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 2 } },
                React.createElement('div', null,
                  React.createElement('p', { style: { margin: 0, fontSize: 14, fontWeight: 700, color: t.text } }, e.name),
                  React.createElement('div', { style: { display: 'flex', gap: 6, alignItems: 'center', marginTop: 3 } },
                    React.createElement('span', {
                      style: {
                        fontSize: 10, background: t.tagBg, color: t.tagText,
                        borderRadius: 6, padding: '2px 7px', fontWeight: 600,
                      }
                    }, e.category),
                    e.verified && React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 3 } },
                      React.createElement(window.lucide.BadgeCheck, { size: 12, color: t.primary }),
                      React.createElement('span', { style: { fontSize: 10, color: t.primary, fontWeight: 600 } }, 'Verified'),
                    )
                  )
                ),
                React.createElement('span', {
                  style: {
                    fontSize: 18, fontWeight: 900, color: e.color,
                    background: `${e.color}12`, borderRadius: 10,
                    padding: '4px 10px', letterSpacing: -0.5, flexShrink: 0,
                  }
                }, e.score)
              ),
              React.createElement('p', {
                style: { margin: '6px 0 8px', fontSize: 12, color: t.textMuted, fontWeight: 500, lineHeight: 1.4 }
              }, e.summary),
              React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
                React.createElement('span', { style: { fontSize: 11, color: t.textMuted, fontWeight: 500 } },
                  `by ${e.author}`
                ),
                React.createElement('button', {
                  className: 'btn-press',
                  onClick: ev => {
                    ev.stopPropagation();
                    const next = new Set(liked);
                    liked.has(e.id) ? next.delete(e.id) : next.add(e.id);
                    setLiked(next);
                  },
                  style: {
                    display: 'flex', alignItems: 'center', gap: 5,
                    background: liked.has(e.id) ? `${t.primary}15` : t.surfaceAlt,
                    border: `1px solid ${liked.has(e.id) ? t.primary + '40' : t.border}`,
                    borderRadius: 10, padding: '4px 10px',
                    cursor: 'pointer', transition: 'all 150ms ease',
                  }
                },
                  React.createElement(window.lucide.Heart, {
                    size: 13,
                    color: liked.has(e.id) ? t.primary : t.textMuted,
                    fill: liked.has(e.id) ? t.primary : 'none',
                  }),
                  React.createElement('span', {
                    style: { fontSize: 11, color: liked.has(e.id) ? t.primary : t.textMuted, fontWeight: 600 }
                  }, liked.has(e.id) ? e.likes + 1 : e.likes)
                )
              )
            )
          )
        )
      )
    )
  );
}
