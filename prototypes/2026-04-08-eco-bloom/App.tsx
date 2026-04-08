const { useState, useEffect, useRef, useCallback } = React;

function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [darkMode, setDarkMode] = useState(false);
  const [completedActions, setCompletedActions] = useState([0, 1, 4]);
  const [ecoPoints, setEcoPoints] = useState(847);
  const [streak, setStreak] = useState(12);
  const [sanctuaryZoom, setSanctuaryZoom] = useState(false);
  const [selectedBloom, setSelectedBloom] = useState(null);
  const [journalTab, setJournalTab] = useState('weekly');
  const [challengeJoined, setChallengeJoined] = useState({});
  const [showActionDetail, setShowActionDetail] = useState(null);
  const [animatingAction, setAnimatingAction] = useState(null);

  const themes = {
    light: {
      primary: '#0891B2',
      secondary: '#22D3EE',
      cta: '#22C55E',
      bg: '#ECFEFF',
      card: '#FFFFFF',
      cardAlt: '#F0FDFA',
      text: '#0C4A6E',
      textSecondary: '#64748B',
      textMuted: '#94A3B8',
      border: '#E0F2FE',
      navBg: '#FFFFFF',
      navBorder: '#E0F2FE',
      overlay: 'rgba(12, 74, 110, 0.08)',
      gradientStart: '#ECFEFF',
      gradientEnd: '#CFFAFE',
      dangerBg: '#FEF2F2',
      dangerText: '#DC2626',
      successBg: '#F0FDF4',
      successText: '#16A34A',
    },
    dark: {
      primary: '#22D3EE',
      secondary: '#0891B2',
      cta: '#22C55E',
      bg: '#0C1222',
      card: '#162032',
      cardAlt: '#1A2842',
      text: '#E0F2FE',
      textSecondary: '#94A3B8',
      textMuted: '#64748B',
      border: '#1E3A5F',
      navBg: '#0F1A2E',
      navBorder: '#1E3A5F',
      overlay: 'rgba(0, 0, 0, 0.3)',
      gradientStart: '#0C1222',
      gradientEnd: '#162032',
      dangerBg: '#2D1B1B',
      dangerText: '#F87171',
      successBg: '#1A2E1A',
      successText: '#4ADE80',
    },
  };

  const t = darkMode ? themes.dark : themes.light;
  const font = "-apple-system, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif";

  const icons = window.lucide || {};

  const createIcon = (IconComponent, size = 24, color = t.text, strokeWidth = 2) => {
    if (!IconComponent) return null;
    return React.createElement(IconComponent, { size, color, strokeWidth });
  };

  // --- DATA ---
  const todayActions = [
    { id: 0, icon: icons.Zap, label: 'Unplug idle electronics', points: 15, impact: '0.3 kg CO2', category: 'Energy' },
    { id: 1, icon: icons.ShoppingBag, label: 'Bring reusable bags', points: 10, impact: '2 plastic bags', category: 'Waste' },
    { id: 2, icon: icons.Bike, label: 'Bike to work today', points: 25, impact: '2.1 kg CO2', category: 'Transport' },
    { id: 3, icon: icons.Droplets, label: 'Take a 5-min shower', points: 12, impact: '40L water', category: 'Water' },
    { id: 4, icon: icons.Apple, label: 'Eat a plant-based meal', points: 20, impact: '1.5 kg CO2', category: 'Food' },
    { id: 5, icon: icons.Recycle, label: 'Sort recycling properly', points: 10, impact: '0.5 kg waste', category: 'Waste' },
  ];

  const blooms = [
    { id: 'b1', name: 'Solar Fern', rarity: 'Common', health: 95, color: '#22C55E', earned: 'Energy actions', days: 14, shape: 'fern' },
    { id: 'b2', name: 'Aqua Lily', rarity: 'Rare', health: 88, color: '#0891B2', earned: 'Water conservation', days: 9, shape: 'lily' },
    { id: 'b3', name: 'Ember Orchid', rarity: 'Epic', health: 72, color: '#F59E0B', earned: 'Transport streak', days: 21, shape: 'orchid' },
    { id: 'b4', name: 'Frost Moss', rarity: 'Common', health: 100, color: '#6366F1', earned: 'Waste reduction', days: 5, shape: 'moss' },
    { id: 'b5', name: 'Breeze Blossom', rarity: 'Legendary', health: 60, color: '#EC4899', earned: 'Cross-pollination', days: 30, shape: 'blossom' },
  ];

  const weeklyData = [
    { day: 'Mon', co2: 2.1, water: 40, actions: 4 },
    { day: 'Tue', co2: 3.5, water: 65, actions: 6 },
    { day: 'Wed', co2: 1.8, water: 30, actions: 3 },
    { day: 'Thu', co2: 4.2, water: 80, actions: 7 },
    { day: 'Fri', co2: 2.9, water: 55, actions: 5 },
    { day: 'Sat', co2: 5.1, water: 90, actions: 8 },
    { day: 'Sun', co2: 3.8, water: 70, actions: 6 },
  ];

  const challenges = [
    { id: 'c1', title: 'Urban Gardeners Unite', desc: 'Cross-pollinate with someone who composts regularly', participants: 234, reward: 'Hybrid Compost Rose', partner: 'Maya K.', partnerHabit: 'Composting', icon: icons.Flower2, color: '#22C55E' },
    { id: 'c2', title: 'Commuter Challenge', desc: 'Pair with a cyclist while you reduce energy use', participants: 189, reward: 'Wind Rider Bloom', partner: 'Alex T.', partnerHabit: 'Cycling', icon: icons.Wind, color: '#0891B2' },
    { id: 'c3', title: 'Ocean Guardians', desc: 'Team up to reduce single-use plastics together', participants: 412, reward: 'Coral Bloom', partner: 'Sam R.', partnerHabit: 'Zero waste', icon: icons.Waves, color: '#6366F1' },
  ];

  const toggleAction = (id) => {
    setAnimatingAction(id);
    setTimeout(() => setAnimatingAction(null), 600);
    if (completedActions.includes(id)) {
      setCompletedActions(completedActions.filter(a => a !== id));
      setEcoPoints(p => p - todayActions.find(a => a.id === id).points);
    } else {
      setCompletedActions([...completedActions, id]);
      setEcoPoints(p => p + todayActions.find(a => a.id === id).points);
    }
  };

  // --- STYLE TAG ---
  const styleTag = React.createElement('style', null, `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(12px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.08); }
    }
    @keyframes shimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }
    @keyframes bloomGrow {
      0% { transform: scale(0) rotate(-20deg); opacity: 0; }
      60% { transform: scale(1.15) rotate(5deg); opacity: 1; }
      100% { transform: scale(1) rotate(0deg); opacity: 1; }
    }
    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-6px); }
    }
    @keyframes checkPop {
      0% { transform: scale(0); }
      50% { transform: scale(1.3); }
      100% { transform: scale(1); }
    }
    @keyframes ripple {
      0% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.4); }
      100% { box-shadow: 0 0 0 20px rgba(34, 197, 94, 0); }
    }
  `);

  // --- BLOOM SVG RENDERER ---
  const BloomSVG = ({ bloom, size = 60 }) => {
    const s = size;
    const c = bloom.color;
    const healthOpacity = bloom.health / 100;

    if (bloom.shape === 'fern') {
      return React.createElement('svg', { width: s, height: s, viewBox: '0 0 60 60' },
        React.createElement('g', { opacity: healthOpacity },
          React.createElement('path', { d: 'M30 55 Q25 40 15 30 Q25 35 30 25 Q35 35 45 30 Q35 40 30 55Z', fill: c, opacity: 0.8 }),
          React.createElement('path', { d: 'M30 45 Q22 32 10 25 Q22 30 30 18 Q38 30 50 25 Q38 32 30 45Z', fill: c, opacity: 0.6 }),
          React.createElement('path', { d: 'M30 35 Q24 26 16 20 Q24 24 30 12 Q36 24 44 20 Q36 26 30 35Z', fill: c }),
          React.createElement('circle', { cx: 30, cy: 10, r: 3, fill: '#FDE047' }),
        )
      );
    }
    if (bloom.shape === 'lily') {
      return React.createElement('svg', { width: s, height: s, viewBox: '0 0 60 60' },
        React.createElement('g', { opacity: healthOpacity },
          React.createElement('ellipse', { cx: 30, cy: 35, rx: 22, ry: 12, fill: c, opacity: 0.3 }),
          React.createElement('path', { d: 'M30 10 Q15 25 20 40 Q25 35 30 30 Q35 35 40 40 Q45 25 30 10Z', fill: c, opacity: 0.7 }),
          React.createElement('path', { d: 'M30 15 Q20 28 25 38 Q28 34 30 30 Q32 34 35 38 Q40 28 30 15Z', fill: c }),
          React.createElement('circle', { cx: 30, cy: 25, r: 4, fill: '#FDE047' }),
          React.createElement('circle', { cx: 30, cy: 25, r: 2, fill: '#FBBF24' }),
        )
      );
    }
    if (bloom.shape === 'orchid') {
      return React.createElement('svg', { width: s, height: s, viewBox: '0 0 60 60' },
        React.createElement('g', { opacity: healthOpacity },
          React.createElement('ellipse', { cx: 30, cy: 20, rx: 10, ry: 15, fill: c, opacity: 0.6, transform: 'rotate(-15 30 20)' }),
          React.createElement('ellipse', { cx: 30, cy: 20, rx: 10, ry: 15, fill: c, opacity: 0.6, transform: 'rotate(15 30 20)' }),
          React.createElement('ellipse', { cx: 22, cy: 28, rx: 8, ry: 12, fill: c, opacity: 0.5, transform: 'rotate(-40 22 28)' }),
          React.createElement('ellipse', { cx: 38, cy: 28, rx: 8, ry: 12, fill: c, opacity: 0.5, transform: 'rotate(40 38 28)' }),
          React.createElement('circle', { cx: 30, cy: 22, r: 5, fill: '#FDE047' }),
          React.createElement('line', { x1: 30, y1: 35, x2: 30, y2: 55, stroke: '#16A34A', strokeWidth: 2 }),
        )
      );
    }
    if (bloom.shape === 'moss') {
      return React.createElement('svg', { width: s, height: s, viewBox: '0 0 60 60' },
        React.createElement('g', { opacity: healthOpacity },
          [12, 22, 32, 42, 17, 27, 37].map((x, i) =>
            React.createElement('circle', { key: i, cx: x, cy: 35 - (i % 3) * 8, r: 6 + (i % 3) * 2, fill: c, opacity: 0.5 + (i % 3) * 0.15 })
          ),
          React.createElement('circle', { cx: 30, cy: 20, r: 8, fill: c }),
        )
      );
    }
    // blossom (legendary)
    return React.createElement('svg', { width: s, height: s, viewBox: '0 0 60 60' },
      React.createElement('g', { opacity: healthOpacity },
        [0, 72, 144, 216, 288].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          const px = 30 + Math.cos(rad) * 14;
          const py = 25 + Math.sin(rad) * 14;
          return React.createElement('ellipse', { key: i, cx: px, cy: py, rx: 9, ry: 14, fill: c, opacity: 0.6, transform: `rotate(${angle} ${px} ${py})` });
        }),
        React.createElement('circle', { cx: 30, cy: 25, r: 7, fill: '#FDE047' }),
        React.createElement('circle', { cx: 30, cy: 25, r: 4, fill: '#FBBF24' }),
        React.createElement('line', { x1: 30, y1: 40, x2: 30, y2: 55, stroke: '#16A34A', strokeWidth: 2.5 }),
        React.createElement('path', { d: 'M30 48 Q22 44 18 50', fill: 'none', stroke: '#16A34A', strokeWidth: 1.5 }),
      )
    );
  };

  // --- SCREENS ---

  const HomeScreen = () => {
    const completedCount = completedActions.length;
    const totalActions = todayActions.length;
    const progress = completedCount / totalActions;

    return React.createElement('div', {
      style: { padding: '20px 16px 24px', animation: 'fadeIn 0.4s ease' }
    },
      // Header
      React.createElement('div', {
        style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }
      },
        React.createElement('div', null,
          React.createElement('div', {
            style: { fontSize: 15, fontWeight: 600, color: t.textSecondary, fontFamily: font, marginBottom: 2 }
          }, 'Good morning, Alex'),
          React.createElement('div', {
            style: { fontSize: 34, fontWeight: 800, color: t.text, fontFamily: font, letterSpacing: -0.5 }
          }, 'Eco Bloom'),
        ),
        React.createElement('button', {
          onClick: () => setDarkMode(!darkMode),
          style: {
            width: 44, height: 44, borderRadius: 22, border: 'none',
            background: t.overlay, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          }
        }, createIcon(darkMode ? icons.Sun : icons.Moon, 20, t.text)),
      ),

      // Streak + Points Card
      React.createElement('div', {
        style: {
          background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})`,
          borderRadius: 20, padding: '20px', marginBottom: 16, position: 'relative', overflow: 'hidden',
        }
      },
        React.createElement('div', {
          style: { position: 'absolute', top: -20, right: -20, width: 100, height: 100, borderRadius: 50, background: 'rgba(255,255,255,0.1)' }
        }),
        React.createElement('div', {
          style: { position: 'absolute', bottom: -30, left: -10, width: 80, height: 80, borderRadius: 40, background: 'rgba(255,255,255,0.07)' }
        }),
        React.createElement('div', {
          style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 1 }
        },
          React.createElement('div', null,
            React.createElement('div', {
              style: { display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }
            },
              createIcon(icons.Flame, 18, '#FDE047'),
              React.createElement('span', {
                style: { fontSize: 15, fontWeight: 600, color: 'rgba(255,255,255,0.9)', fontFamily: font }
              }, `${streak}-day streak`),
            ),
            React.createElement('div', {
              style: { fontSize: 34, fontWeight: 800, color: '#FFFFFF', fontFamily: font, letterSpacing: -0.5 }
            }, ecoPoints.toLocaleString()),
            React.createElement('div', {
              style: { fontSize: 13, color: 'rgba(255,255,255,0.8)', fontFamily: font }
            }, 'EcoPoints earned'),
          ),
          React.createElement('div', {
            style: { width: 72, height: 72, borderRadius: 36, background: 'rgba(255,255,255,0.15)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'float 3s ease-in-out infinite' }
          },
            createIcon(icons.Leaf, 32, '#FFFFFF'),
          ),
        ),
      ),

      // Progress bar
      React.createElement('div', {
        style: { marginBottom: 20 }
      },
        React.createElement('div', {
          style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }
        },
          React.createElement('span', {
            style: { fontSize: 17, fontWeight: 700, color: t.text, fontFamily: font }
          }, "Today's Actions"),
          React.createElement('span', {
            style: { fontSize: 13, fontWeight: 600, color: t.primary, fontFamily: font }
          }, `${completedCount}/${totalActions} done`),
        ),
        React.createElement('div', {
          style: { height: 8, borderRadius: 4, background: t.overlay, overflow: 'hidden' }
        },
          React.createElement('div', {
            style: {
              height: '100%', borderRadius: 4, width: `${progress * 100}%`,
              background: `linear-gradient(90deg, ${t.cta}, #4ADE80)`,
              transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
            }
          }),
        ),
      ),

      // AI Suggestion Banner
      React.createElement('div', {
        style: {
          background: t.cardAlt, borderRadius: 16, padding: '14px 16px', marginBottom: 16,
          border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', gap: 12,
        }
      },
        React.createElement('div', {
          style: { width: 40, height: 40, borderRadius: 12, background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }
        }, createIcon(icons.Sparkles, 20, '#FFF')),
        React.createElement('div', { style: { flex: 1 } },
          React.createElement('div', {
            style: { fontSize: 13, fontWeight: 600, color: t.primary, fontFamily: font, marginBottom: 2 }
          }, 'AI Eco-Companion'),
          React.createElement('div', {
            style: { fontSize: 15, color: t.text, fontFamily: font, lineHeight: 1.3 }
          }, "It's sunny today! Great time to air-dry laundry instead of using the dryer."),
        ),
      ),

      // Action List
      ...todayActions.map((action, idx) => {
        const done = completedActions.includes(action.id);
        const isAnimating = animatingAction === action.id;
        return React.createElement('div', {
          key: action.id,
          onClick: () => toggleAction(action.id),
          style: {
            display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px',
            background: done ? t.successBg : t.card, borderRadius: 14, marginBottom: 8,
            border: `1px solid ${done ? t.cta + '30' : t.border}`, cursor: 'pointer',
            transition: 'all 0.2s ease', animation: `fadeIn 0.3s ease ${idx * 0.05}s both`,
            transform: isAnimating ? 'scale(0.97)' : 'scale(1)',
          }
        },
          React.createElement('div', {
            style: {
              width: 36, height: 36, borderRadius: 10,
              background: done ? t.cta : t.overlay,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s ease',
              animation: isAnimating && done ? 'checkPop 0.4s ease' : 'none',
            }
          }, done
            ? createIcon(icons.Check, 18, '#FFF')
            : createIcon(action.icon, 18, t.primary)
          ),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', {
              style: {
                fontSize: 15, fontWeight: 600, color: t.text, fontFamily: font,
                textDecoration: done ? 'line-through' : 'none', opacity: done ? 0.7 : 1,
              }
            }, action.label),
            React.createElement('div', {
              style: { fontSize: 13, color: t.textMuted, fontFamily: font, marginTop: 2 }
            }, `${action.impact} saved`),
          ),
          React.createElement('div', {
            style: {
              fontSize: 13, fontWeight: 700, color: done ? t.cta : t.primary, fontFamily: font,
              background: done ? t.cta + '15' : t.primary + '15',
              padding: '4px 10px', borderRadius: 20,
            }
          }, `+${action.points}`),
        );
      }),
    );
  };

  const SanctuaryScreen = () => {
    return React.createElement('div', {
      style: { padding: '20px 16px', animation: 'fadeIn 0.4s ease' }
    },
      React.createElement('div', {
        style: { fontSize: 34, fontWeight: 800, color: t.text, fontFamily: font, letterSpacing: -0.5, marginBottom: 4 }
      }, 'Eco-Sanctuary'),
      React.createElement('div', {
        style: { fontSize: 15, color: t.textSecondary, fontFamily: font, marginBottom: 20 }
      }, 'Your living digital garden'),

      // Sanctuary Garden View
      React.createElement('div', {
        style: {
          borderRadius: 24, padding: 24, marginBottom: 20, position: 'relative', overflow: 'hidden',
          background: darkMode
            ? 'linear-gradient(180deg, #0C2D1A 0%, #162032 60%, #1A2842 100%)'
            : 'linear-gradient(180deg, #ECFDF5 0%, #D1FAE5 40%, #A7F3D0 100%)',
          minHeight: 220,
        }
      },
        // Sky elements
        React.createElement('div', {
          style: { position: 'absolute', top: 12, right: 20, width: 30, height: 30, borderRadius: 15,
            background: darkMode ? '#FDE047' : '#FCD34D', opacity: 0.8 }
        }),
        ...[
          { x: 15, y: 8, s: 2 }, { x: 60, y: 15, s: 1.5 }, { x: 82, y: 6, s: 1 },
        ].map((star, i) => darkMode ? React.createElement('div', {
          key: `star-${i}`, style: { position: 'absolute', top: `${star.y}%`, left: `${star.x}%`,
            width: star.s * 2, height: star.s * 2, borderRadius: star.s, background: '#FDE047',
            animation: `pulse ${2 + i * 0.5}s ease-in-out infinite` }
        }) : null),

        // Blooms in garden
        React.createElement('div', {
          style: { display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end', paddingTop: 40, position: 'relative', zIndex: 2 }
        },
          ...blooms.map((bloom, i) =>
            React.createElement('div', {
              key: bloom.id,
              onClick: () => setSelectedBloom(bloom),
              style: {
                cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center',
                animation: `bloomGrow 0.6s ease ${i * 0.1}s both`,
                transition: 'transform 0.2s ease',
              }
            },
              React.createElement(BloomSVG, { bloom, size: 48 }),
              bloom.health < 75 && React.createElement('div', {
                style: { fontSize: 10, color: darkMode ? '#F87171' : '#DC2626', fontWeight: 600, fontFamily: font, marginTop: 2 }
              }, 'Needs care'),
            )
          ),
        ),

        // Ground
        React.createElement('div', {
          style: {
            position: 'absolute', bottom: 0, left: 0, right: 0, height: 40,
            background: darkMode ? '#1A2E1A' : '#86EFAC', borderRadius: '0 0 24px 24px', opacity: 0.5,
          }
        }),
      ),

      // Bloom Detail Modal
      selectedBloom && React.createElement('div', {
        style: {
          background: t.card, borderRadius: 20, padding: 20, marginBottom: 16,
          border: `2px solid ${selectedBloom.color}30`, animation: 'slideUp 0.3s ease',
          boxShadow: `0 4px 24px ${selectedBloom.color}20`,
        }
      },
        React.createElement('div', {
          style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }
        },
          React.createElement('div', { style: { display: 'flex', gap: 16, alignItems: 'center' } },
            React.createElement('div', {
              style: { width: 64, height: 64, borderRadius: 16, background: selectedBloom.color + '15',
                display: 'flex', alignItems: 'center', justifyContent: 'center' }
            }, React.createElement(BloomSVG, { bloom: selectedBloom, size: 52 })),
            React.createElement('div', null,
              React.createElement('div', {
                style: { fontSize: 22, fontWeight: 700, color: t.text, fontFamily: font }
              }, selectedBloom.name),
              React.createElement('div', {
                style: {
                  fontSize: 12, fontWeight: 700, color: selectedBloom.color, fontFamily: font,
                  background: selectedBloom.color + '15', padding: '2px 10px', borderRadius: 10,
                  display: 'inline-block', marginTop: 4,
                }
              }, selectedBloom.rarity),
            ),
          ),
          React.createElement('button', {
            onClick: () => setSelectedBloom(null),
            style: { width: 32, height: 32, borderRadius: 16, border: 'none', background: t.overlay,
              display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }
          }, createIcon(icons.X, 16, t.textMuted)),
        ),
        React.createElement('div', {
          style: { marginTop: 16, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }
        },
          React.createElement('div', {
            style: { background: t.cardAlt, borderRadius: 12, padding: '10px 14px' }
          },
            React.createElement('div', { style: { fontSize: 13, color: t.textMuted, fontFamily: font } }, 'Health'),
            React.createElement('div', {
              style: { fontSize: 22, fontWeight: 700, color: selectedBloom.health >= 80 ? t.cta : t.dangerText, fontFamily: font }
            }, `${selectedBloom.health}%`),
          ),
          React.createElement('div', {
            style: { background: t.cardAlt, borderRadius: 12, padding: '10px 14px' }
          },
            React.createElement('div', { style: { fontSize: 13, color: t.textMuted, fontFamily: font } }, 'Age'),
            React.createElement('div', {
              style: { fontSize: 22, fontWeight: 700, color: t.text, fontFamily: font }
            }, `${selectedBloom.days}d`),
          ),
        ),
        React.createElement('div', {
          style: { fontSize: 13, color: t.textSecondary, fontFamily: font, marginTop: 12 }
        }, `Earned from: ${selectedBloom.earned}`),
        // Health bar
        React.createElement('div', {
          style: { marginTop: 12 }
        },
          React.createElement('div', {
            style: { height: 6, borderRadius: 3, background: t.overlay, overflow: 'hidden' }
          },
            React.createElement('div', {
              style: {
                height: '100%', borderRadius: 3, width: `${selectedBloom.health}%`,
                background: selectedBloom.health >= 80
                  ? `linear-gradient(90deg, ${t.cta}, #4ADE80)`
                  : selectedBloom.health >= 50
                    ? 'linear-gradient(90deg, #F59E0B, #FBBF24)'
                    : 'linear-gradient(90deg, #DC2626, #F87171)',
                transition: 'width 0.5s ease',
              }
            }),
          ),
        ),
      ),

      // Bloom Collection
      React.createElement('div', {
        style: { fontSize: 17, fontWeight: 700, color: t.text, fontFamily: font, marginBottom: 12 }
      }, 'Your Collection'),
      ...blooms.map((bloom, i) =>
        React.createElement('div', {
          key: bloom.id,
          onClick: () => setSelectedBloom(bloom),
          style: {
            display: 'flex', alignItems: 'center', gap: 14, padding: '12px 14px',
            background: selectedBloom?.id === bloom.id ? bloom.color + '10' : t.card,
            borderRadius: 14, marginBottom: 8, cursor: 'pointer',
            border: `1px solid ${selectedBloom?.id === bloom.id ? bloom.color + '40' : t.border}`,
            transition: 'all 0.2s ease', animation: `fadeIn 0.3s ease ${i * 0.08}s both`,
          }
        },
          React.createElement('div', {
            style: { width: 44, height: 44, borderRadius: 12, background: bloom.color + '12',
              display: 'flex', alignItems: 'center', justifyContent: 'center' }
          }, React.createElement(BloomSVG, { bloom, size: 36 })),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', {
              style: { fontSize: 15, fontWeight: 600, color: t.text, fontFamily: font }
            }, bloom.name),
            React.createElement('div', {
              style: { fontSize: 13, color: t.textMuted, fontFamily: font }
            }, `${bloom.rarity} \u2022 ${bloom.days} days old`),
          ),
          React.createElement('div', {
            style: {
              width: 10, height: 10, borderRadius: 5,
              background: bloom.health >= 80 ? t.cta : bloom.health >= 50 ? '#F59E0B' : t.dangerText,
            }
          }),
        )
      ),
    );
  };

  const JournalScreen = () => {
    const maxCo2 = Math.max(...weeklyData.map(d => d.co2));
    const totalCo2 = weeklyData.reduce((s, d) => s + d.co2, 0);
    const totalWater = weeklyData.reduce((s, d) => s + d.water, 0);
    const totalActions = weeklyData.reduce((s, d) => s + d.actions, 0);

    return React.createElement('div', {
      style: { padding: '20px 16px', animation: 'fadeIn 0.4s ease' }
    },
      React.createElement('div', {
        style: { fontSize: 34, fontWeight: 800, color: t.text, fontFamily: font, letterSpacing: -0.5, marginBottom: 4 }
      }, 'Impact Journal'),
      React.createElement('div', {
        style: { fontSize: 15, color: t.textSecondary, fontFamily: font, marginBottom: 20 }
      }, 'Your environmental footprint'),

      // Stats Cards
      React.createElement('div', {
        style: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 20 }
      },
        ...[
          { label: 'CO\u2082 Saved', value: `${totalCo2.toFixed(1)}kg`, icon: icons.CloudOff, color: t.cta },
          { label: 'Water Saved', value: `${totalWater}L`, icon: icons.Droplets, color: '#0891B2' },
          { label: 'Actions', value: totalActions.toString(), icon: icons.CheckCircle, color: '#6366F1' },
        ].map((stat, i) =>
          React.createElement('div', {
            key: i,
            style: {
              background: t.card, borderRadius: 16, padding: '16px 12px', textAlign: 'center',
              border: `1px solid ${t.border}`, animation: `slideUp 0.4s ease ${i * 0.1}s both`,
            }
          },
            React.createElement('div', {
              style: { width: 36, height: 36, borderRadius: 10, background: stat.color + '15',
                display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px' }
            }, createIcon(stat.icon, 18, stat.color)),
            React.createElement('div', {
              style: { fontSize: 22, fontWeight: 800, color: t.text, fontFamily: font }
            }, stat.value),
            React.createElement('div', {
              style: { fontSize: 12, color: t.textMuted, fontFamily: font, marginTop: 2 }
            }, stat.label),
          )
        ),
      ),

      // Tab Switcher
      React.createElement('div', {
        style: {
          display: 'flex', background: t.overlay, borderRadius: 12, padding: 3, marginBottom: 16,
        }
      },
        ...['weekly', 'monthly', 'yearly'].map(tab =>
          React.createElement('button', {
            key: tab, onClick: () => setJournalTab(tab),
            style: {
              flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', fontFamily: font,
              fontSize: 13, fontWeight: 600, cursor: 'pointer',
              background: journalTab === tab ? t.card : 'transparent',
              color: journalTab === tab ? t.text : t.textMuted,
              boxShadow: journalTab === tab ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
              transition: 'all 0.2s ease',
            }
          }, tab.charAt(0).toUpperCase() + tab.slice(1))
        ),
      ),

      // Chart
      React.createElement('div', {
        style: {
          background: t.card, borderRadius: 20, padding: '20px 16px', marginBottom: 16,
          border: `1px solid ${t.border}`,
        }
      },
        React.createElement('div', {
          style: { fontSize: 17, fontWeight: 700, color: t.text, fontFamily: font, marginBottom: 16 }
        }, 'CO\u2082 Reduction This Week'),
        React.createElement('div', {
          style: { display: 'flex', alignItems: 'flex-end', gap: 8, height: 120 }
        },
          ...weeklyData.map((d, i) =>
            React.createElement('div', {
              key: i, style: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }
            },
              React.createElement('div', {
                style: { fontSize: 11, fontWeight: 600, color: t.textMuted, fontFamily: font }
              }, `${d.co2}`),
              React.createElement('div', {
                style: {
                  width: '100%', borderRadius: 6,
                  height: `${(d.co2 / maxCo2) * 80}px`,
                  background: `linear-gradient(180deg, ${t.cta}, ${t.cta}90)`,
                  transition: 'height 0.5s ease',
                  animation: `slideUp 0.5s ease ${i * 0.08}s both`,
                }
              }),
              React.createElement('div', {
                style: { fontSize: 11, color: t.textMuted, fontFamily: font }
              }, d.day),
            )
          ),
        ),
      ),

      // Recent Activity Log
      React.createElement('div', {
        style: { fontSize: 17, fontWeight: 700, color: t.text, fontFamily: font, marginBottom: 12 }
      }, 'Recent Activity'),
      ...[
        { action: 'Biked to work', time: '2h ago', impact: '-2.1 kg CO\u2082', icon: icons.Bike, color: t.cta },
        { action: 'Plant-based lunch', time: '5h ago', impact: '-1.5 kg CO\u2082', icon: icons.Salad, color: '#F59E0B' },
        { action: 'Recycled packaging', time: 'Yesterday', impact: '-0.5 kg waste', icon: icons.Recycle, color: '#6366F1' },
        { action: 'Cold water wash', time: 'Yesterday', impact: '-0.8 kg CO\u2082', icon: icons.Droplets, color: '#0891B2' },
        { action: 'Unplugged devices', time: '2 days ago', impact: '-0.3 kg CO\u2082', icon: icons.Zap, color: '#EC4899' },
      ].map((item, i) =>
        React.createElement('div', {
          key: i,
          style: {
            display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px',
            background: t.card, borderRadius: 14, marginBottom: 8,
            border: `1px solid ${t.border}`, animation: `fadeIn 0.3s ease ${i * 0.06}s both`,
          }
        },
          React.createElement('div', {
            style: { width: 36, height: 36, borderRadius: 10, background: item.color + '15',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }
          }, createIcon(item.icon, 18, item.color)),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', {
              style: { fontSize: 15, fontWeight: 600, color: t.text, fontFamily: font }
            }, item.action),
            React.createElement('div', {
              style: { fontSize: 13, color: t.textMuted, fontFamily: font }
            }, item.time),
          ),
          React.createElement('div', {
            style: { fontSize: 13, fontWeight: 600, color: t.cta, fontFamily: font }
          }, item.impact),
        )
      ),
    );
  };

  const ChallengesScreen = () => {
    return React.createElement('div', {
      style: { padding: '20px 16px', animation: 'fadeIn 0.4s ease' }
    },
      React.createElement('div', {
        style: { fontSize: 34, fontWeight: 800, color: t.text, fontFamily: font, letterSpacing: -0.5, marginBottom: 4 }
      }, 'Bloom Challenges'),
      React.createElement('div', {
        style: { fontSize: 15, color: t.textSecondary, fontFamily: font, marginBottom: 20 }
      }, 'Cross-pollinate for rare hybrids'),

      // How it works
      React.createElement('div', {
        style: {
          background: `linear-gradient(135deg, ${t.primary}12, ${t.secondary}12)`,
          borderRadius: 16, padding: 16, marginBottom: 20,
          border: `1px solid ${t.primary}20`,
        }
      },
        React.createElement('div', {
          style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }
        },
          createIcon(icons.Info, 16, t.primary),
          React.createElement('span', {
            style: { fontSize: 15, fontWeight: 700, color: t.primary, fontFamily: font }
          }, 'How Cross-Pollination Works'),
        ),
        React.createElement('div', {
          style: { fontSize: 13, color: t.textSecondary, fontFamily: font, lineHeight: 1.5 }
        }, "Partner with users who have complementary sustainability habits. Complete challenges together to grow rare hybrid EcoBlooms that neither could create alone."),
      ),

      // Challenge Cards
      ...challenges.map((ch, i) => {
        const joined = challengeJoined[ch.id];
        return React.createElement('div', {
          key: ch.id,
          style: {
            background: t.card, borderRadius: 20, padding: 20, marginBottom: 14,
            border: `1px solid ${joined ? ch.color + '40' : t.border}`,
            animation: `slideUp 0.4s ease ${i * 0.1}s both`,
            boxShadow: joined ? `0 4px 20px ${ch.color}15` : 'none',
            transition: 'all 0.3s ease',
          }
        },
          // Header
          React.createElement('div', {
            style: { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }
          },
            React.createElement('div', {
              style: {
                width: 48, height: 48, borderRadius: 14,
                background: `linear-gradient(135deg, ${ch.color}, ${ch.color}BB)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }
            }, createIcon(ch.icon, 24, '#FFF')),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', {
                style: { fontSize: 17, fontWeight: 700, color: t.text, fontFamily: font }
              }, ch.title),
              React.createElement('div', {
                style: { fontSize: 13, color: t.textMuted, fontFamily: font, display: 'flex', alignItems: 'center', gap: 4 }
              },
                createIcon(icons.Users, 12, t.textMuted),
                ` ${ch.participants} participants`,
              ),
            ),
          ),

          React.createElement('div', {
            style: { fontSize: 15, color: t.textSecondary, fontFamily: font, lineHeight: 1.4, marginBottom: 14 }
          }, ch.desc),

          // Partner
          React.createElement('div', {
            style: {
              display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px',
              background: t.cardAlt, borderRadius: 12, marginBottom: 14,
            }
          },
            React.createElement('div', {
              style: { width: 32, height: 32, borderRadius: 16, background: ch.color + '20',
                display: 'flex', alignItems: 'center', justifyContent: 'center' }
            }, createIcon(icons.User, 16, ch.color)),
            React.createElement('div', null,
              React.createElement('div', {
                style: { fontSize: 13, fontWeight: 600, color: t.text, fontFamily: font }
              }, `Suggested partner: ${ch.partner}`),
              React.createElement('div', {
                style: { fontSize: 12, color: t.textMuted, fontFamily: font }
              }, `Strength: ${ch.partnerHabit}`),
            ),
          ),

          // Reward
          React.createElement('div', {
            style: { display: 'flex', alignItems: 'center', gap: 6, marginBottom: 14 }
          },
            createIcon(icons.Gift, 14, '#F59E0B'),
            React.createElement('span', {
              style: { fontSize: 13, fontWeight: 600, color: '#F59E0B', fontFamily: font }
            }, `Reward: ${ch.reward}`),
          ),

          // Join Button
          React.createElement('button', {
            onClick: () => setChallengeJoined({ ...challengeJoined, [ch.id]: !joined }),
            style: {
              width: '100%', padding: '14px 0', borderRadius: 14, border: 'none',
              background: joined
                ? ch.color + '15'
                : `linear-gradient(135deg, ${ch.color}, ${ch.color}CC)`,
              color: joined ? ch.color : '#FFF',
              fontSize: 15, fontWeight: 700, fontFamily: font, cursor: 'pointer',
              transition: 'all 0.2s ease', minHeight: 48,
              animation: joined ? 'ripple 0.6s ease' : 'none',
            }
          },
            joined ? 'Joined \u2713' : 'Cross-Pollinate'
          ),
        );
      }),
    );
  };

  // --- NAVIGATION ---
  const screens = {
    home: HomeScreen,
    sanctuary: SanctuaryScreen,
    journal: JournalScreen,
    challenges: ChallengesScreen,
  };

  const navItems = [
    { id: 'home', label: 'Home', icon: icons.Home },
    { id: 'sanctuary', label: 'Garden', icon: icons.Flower2 },
    { id: 'journal', label: 'Journal', icon: icons.BarChart3 },
    { id: 'challenges', label: 'Challenges', icon: icons.Handshake },
  ];

  const ActiveScreenComponent = screens[activeScreen] || HomeScreen;

  return React.createElement('div', {
    style: {
      minHeight: '100vh', background: '#f0f0f0',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px 0',
      fontFamily: font,
    }
  },
    styleTag,
    React.createElement('div', {
      style: {
        width: 375, height: 812, borderRadius: 40, overflow: 'hidden', position: 'relative',
        background: t.bg, boxShadow: '0 25px 80px rgba(0,0,0,0.2)',
        display: 'flex', flexDirection: 'column',
      }
    },
      // Scrollable Content
      React.createElement('div', {
        style: {
          flex: 1, overflowY: 'auto', overflowX: 'hidden',
          paddingBottom: 80,
          WebkitOverflowScrolling: 'touch',
        }
      },
        React.createElement(ActiveScreenComponent),
      ),

      // Bottom Tab Bar
      React.createElement('div', {
        style: {
          position: 'absolute', bottom: 0, left: 0, right: 0,
          background: t.navBg, borderTop: `1px solid ${t.navBorder}`,
          display: 'flex', justifyContent: 'space-around', alignItems: 'center',
          paddingTop: 8, paddingBottom: 28, zIndex: 10,
          backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
        }
      },
        ...navItems.map(item =>
          React.createElement('button', {
            key: item.id,
            onClick: () => setActiveScreen(item.id),
            style: {
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
              background: 'none', border: 'none', cursor: 'pointer', padding: '4px 16px',
              minWidth: 64, minHeight: 44, transition: 'all 0.2s ease',
            }
          },
            React.createElement('div', {
              style: {
                transition: 'all 0.2s ease',
                transform: activeScreen === item.id ? 'scale(1.15)' : 'scale(1)',
              }
            }, createIcon(item.icon, 22, activeScreen === item.id ? t.primary : t.textMuted)),
            React.createElement('span', {
              style: {
                fontSize: 11, fontWeight: activeScreen === item.id ? 700 : 500,
                color: activeScreen === item.id ? t.primary : t.textMuted,
                fontFamily: font, transition: 'all 0.2s ease',
              }
            }, item.label),
          )
        ),
      ),
    ),
  );
}
