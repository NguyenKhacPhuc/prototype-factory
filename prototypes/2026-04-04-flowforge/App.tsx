
const { useState, useEffect, useRef } = React;

function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [darkMode, setDarkMode] = useState(false);
  const [completedFragments, setCompletedFragments] = useState([0]);
  const [activeQuest, setActiveQuest] = useState(null);
  const [expandedTapestry, setExpandedTapestry] = useState(null);

  const themes = {
    light: {
      bg: '#F5F0E8',
      surface: '#EDE8DC',
      card: '#FFFFFF',
      primary: '#0D1B2A',
      brass: '#C9922A',
      coral: '#FF5A38',
      text: '#0D1B2A',
      textMuted: '#6B6457',
      textLight: '#9E9688',
      border: '#D4CFC4',
      navBg: '#0D1B2A',
      navText: '#F5F0E8',
      navActive: '#C9922A',
      accent: '#E8E2D6',
    },
    dark: {
      bg: '#0D1B2A',
      surface: '#152133',
      card: '#1C2B3A',
      primary: '#F5F0E8',
      brass: '#D4A843',
      coral: '#FF6B4A',
      text: '#F5F0E8',
      textMuted: '#A09B8E',
      textLight: '#6B6457',
      border: '#2A3D52',
      navBg: '#091421',
      navText: '#F5F0E8',
      navActive: '#D4A843',
      accent: '#1C2B3A',
    }
  };

  const t = darkMode ? themes.dark : themes.light;

  const screens = {
    home: HomeScreen,
    tapestries: TapestriesScreen,
    quests: QuestsScreen,
    journal: JournalScreen,
  };

  const ScreenComponent = screens[activeScreen];

  const navItems = [
    { id: 'home', label: 'Forge', icon: 'Zap' },
    { id: 'tapestries', label: 'Tapestries', icon: 'Layers' },
    { id: 'quests', label: 'Quests', icon: 'Target' },
    { id: 'journal', label: 'Journal', icon: 'BookOpen' },
  ];

  return React.createElement('div', {
    style: {
      minHeight: '100vh',
      background: '#f0f0f0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Work Sans', sans-serif",
    }
  },
    React.createElement('style', null, `
      @import url('https://fonts.googleapis.com/css2?family=Work+Sans:wght@300;400;500;600;700;800;900&display=swap');
      * { box-sizing: border-box; margin: 0; padding: 0; }
      ::-webkit-scrollbar { width: 3px; }
      ::-webkit-scrollbar-track { background: transparent; }
      ::-webkit-scrollbar-thumb { background: #C9922A; border-radius: 2px; }
      .fragment-card:hover { transform: translateY(-2px); }
      .nav-item { transition: all 0.2s ease; }
      .nav-item:hover { opacity: 0.8; }
      .press-effect:active { transform: scale(0.96); }
      .tapestry-cell { transition: all 0.3s ease; }
      .tapestry-cell:hover { transform: scale(1.05); z-index: 10; }
      @keyframes pulse-brass { 0%,100%{opacity:1} 50%{opacity:0.6} }
      @keyframes thread-in { from{opacity:0;transform:scale(0.8)} to{opacity:1;transform:scale(1)} }
      .thread-anim { animation: thread-in 0.4s ease forwards; }
      @keyframes shimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
    `),
    React.createElement('div', {
      style: {
        width: 375,
        height: 812,
        background: t.bg,
        borderRadius: 40,
        overflow: 'hidden',
        position: 'relative',
        boxShadow: '0 30px 80px rgba(0,0,0,0.25), 0 0 0 10px #1a1a1a',
        display: 'flex',
        flexDirection: 'column',
      }
    },
      React.createElement(ScreenComponent, {
        t, darkMode, setDarkMode, setActiveScreen,
        completedFragments, setCompletedFragments,
        activeQuest, setActiveQuest,
        expandedTapestry, setExpandedTapestry,
      }),
      React.createElement('nav', {
        style: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          background: t.navBg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          padding: '12px 8px 20px',
          borderTop: `2px solid ${t.brass}`,
        }
      },
        navItems.map(item => {
          const Icon = window.lucide[item.icon];
          const isActive = activeScreen === item.id;
          return React.createElement('button', {
            key: item.id,
            className: 'nav-item press-effect',
            onClick: () => setActiveScreen(item.id),
            style: {
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 3,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px 12px',
              borderRadius: 8,
              position: 'relative',
            }
          },
            isActive && React.createElement('div', {
              style: {
                position: 'absolute',
                top: -12,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 32,
                height: 3,
                background: t.navActive,
                borderRadius: '0 0 3px 3px',
              }
            }),
            Icon && React.createElement(Icon, {
              size: 20,
              color: isActive ? t.navActive : t.navText,
              strokeWidth: isActive ? 2.5 : 1.5,
            }),
            React.createElement('span', {
              style: {
                fontSize: 10,
                fontWeight: isActive ? 700 : 400,
                color: isActive ? t.navActive : t.navText,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
              }
            }, item.label)
          );
        })
      )
    )
  );
}

// ─── HOME SCREEN ──────────────────────────────────────────────────────────────

function HomeScreen({ t, darkMode, setDarkMode, setActiveScreen, completedFragments, setCompletedFragments }) {
  const [swipeIndex, setSwipeIndex] = useState(0);
  const [capturing, setCapturing] = useState(false);
  const [captureType, setCaptureType] = useState(null);

  const fragments = [
    {
      id: 0, theme: 'Digital Declutter', emoji: '🧹',
      prompt: 'Spot one digital file you can delete right now.',
      sub: 'Quick Screenshot', time: '60 sec',
      color: '#C9922A', accent: '#FF5A38',
    },
    {
      id: 1, theme: 'Mindful Moments', emoji: '🌿',
      prompt: 'Capture a surface texture that makes you feel calm.',
      sub: 'Quick Photo', time: '30 sec',
      color: '#0D6E6E', accent: '#C9922A',
    },
    {
      id: 2, theme: 'Learning Sprint', emoji: '⚡',
      prompt: 'Draft a 2-sentence summary of your last meeting.',
      sub: 'Quick Note', time: '90 sec',
      color: '#8B2FC9', accent: '#FF5A38',
    },
    {
      id: 3, theme: 'Focus Atlas', emoji: '🔭',
      prompt: 'Photograph your current workspace from above.',
      sub: 'Quick Photo', time: '45 sec',
      color: '#1B4332', accent: '#C9922A',
    },
  ];

  const current = fragments[swipeIndex];
  const isCompleted = completedFragments.includes(current.id);

  const handleCapture = (type) => {
    setCaptureType(type);
    setCapturing(true);
    setTimeout(() => {
      setCapturing(false);
      setCompletedFragments(prev => [...new Set([...prev, current.id])]);
    }, 1800);
  };

  const MoonIcon = window.lucide.Moon;
  const SunIcon = window.lucide.Sun;
  const ChevronLeftIcon = window.lucide.ChevronLeft;
  const ChevronRightIcon = window.lucide.ChevronRight;
  const CheckIcon = window.lucide.Check;
  const CameraIcon = window.lucide.Camera;
  const MicIcon = window.lucide.Mic;
  const TypeIcon = window.lucide.Type;
  const ZapIcon = window.lucide.Zap;
  const FlameIcon = window.lucide.Flame;

  return React.createElement('div', {
    style: { flex: 1, overflowY: 'auto', paddingBottom: 80 }
  },
    // Header
    React.createElement('div', {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '20px 20px 16px',
        background: t.bg,
      }
    },
      React.createElement('div', null,
        React.createElement('div', {
          style: { display: 'flex', alignItems: 'center', gap: 8 }
        },
          ZapIcon && React.createElement(ZapIcon, { size: 18, color: t.brass, strokeWidth: 2.5 }),
          React.createElement('span', {
            style: { fontSize: 11, fontWeight: 700, color: t.brass, letterSpacing: '0.12em', textTransform: 'uppercase' }
          }, 'FlowForge')
        ),
        React.createElement('div', {
          style: { fontSize: 22, fontWeight: 800, color: t.text, lineHeight: 1.1, marginTop: 2 }
        }, 'Daily Forge')
      ),
      React.createElement('div', {
        style: { display: 'flex', alignItems: 'center', gap: 10 }
      },
        React.createElement('div', {
          style: {
            display: 'flex', alignItems: 'center', gap: 5,
            background: t.coral, padding: '4px 10px', borderRadius: 20,
          }
        },
          FlameIcon && React.createElement(FlameIcon, { size: 13, color: '#fff', strokeWidth: 2.5 }),
          React.createElement('span', { style: { fontSize: 12, fontWeight: 700, color: '#fff' } }, '7')
        ),
        React.createElement('button', {
          onClick: () => setDarkMode(!darkMode),
          className: 'press-effect',
          style: {
            background: t.surface, border: 'none', borderRadius: 20,
            width: 36, height: 36, display: 'flex', alignItems: 'center',
            justifyContent: 'center', cursor: 'pointer',
          }
        },
          darkMode
            ? (SunIcon && React.createElement(SunIcon, { size: 16, color: t.brass }))
            : (MoonIcon && React.createElement(MoonIcon, { size: 16, color: t.text }))
        )
      )
    ),

    // Progress strip
    React.createElement('div', {
      style: { padding: '0 20px 16px', display: 'flex', gap: 6 }
    },
      fragments.map((f, i) =>
        React.createElement('div', {
          key: f.id,
          style: {
            flex: 1, height: 4,
            background: completedFragments.includes(f.id) ? t.brass
              : i === swipeIndex ? t.coral : t.border,
            borderRadius: 2,
            transition: 'background 0.3s ease',
          }
        })
      )
    ),

    // Asymmetric layout — big fragment card + small stats
    React.createElement('div', {
      style: { padding: '0 20px', display: 'grid', gridTemplateColumns: '1fr 88px', gap: 10, marginBottom: 10 }
    },
      // Fragment count label
      React.createElement('div', {
        style: {
          background: t.surface, borderRadius: 16, padding: '12px 16px',
          display: 'flex', alignItems: 'center', gap: 10,
          border: `1.5px solid ${t.border}`,
        }
      },
        React.createElement('div', {
          style: {
            width: 36, height: 36, borderRadius: 8,
            background: current.color + '20',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 18,
          }
        }, current.emoji),
        React.createElement('div', null,
          React.createElement('div', { style: { fontSize: 10, fontWeight: 600, color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.1em' } }, current.theme),
          React.createElement('div', { style: { fontSize: 13, fontWeight: 700, color: t.text, marginTop: 1 } }, `Fragment ${swipeIndex + 1} of ${fragments.length}`)
        )
      ),
      // Stat block
      React.createElement('div', {
        style: {
          background: t.brass, borderRadius: 16, padding: '12px',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          gap: 2,
        }
      },
        React.createElement('div', { style: { fontSize: 22, fontWeight: 900, color: '#fff', lineHeight: 1 } }, completedFragments.length),
        React.createElement('div', { style: { fontSize: 9, fontWeight: 600, color: 'rgba(255,255,255,0.8)', textTransform: 'uppercase', letterSpacing: '0.08em', textAlign: 'center' } }, 'Threads\nForged')
      )
    ),

    // Main fragment card
    React.createElement('div', {
      className: 'fragment-card',
      style: {
        margin: '0 20px',
        background: t.card,
        borderRadius: 20,
        overflow: 'hidden',
        border: `2px solid ${isCompleted ? t.brass : t.border}`,
        transition: 'all 0.3s ease',
        boxShadow: isCompleted ? `0 0 0 2px ${t.brass}40` : '0 4px 16px rgba(0,0,0,0.06)',
      }
    },
      // Card top band
      React.createElement('div', {
        style: {
          background: current.color,
          padding: '20px 20px 24px',
          position: 'relative',
          overflow: 'hidden',
        }
      },
        // Geometric decoration
        React.createElement('div', {
          style: {
            position: 'absolute', top: -20, right: -20,
            width: 120, height: 120,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.08)',
          }
        }),
        React.createElement('div', {
          style: {
            position: 'absolute', bottom: -30, left: 40,
            width: 80, height: 80,
            background: 'rgba(255,255,255,0.05)',
            transform: 'rotate(45deg)',
          }
        }),
        React.createElement('div', {
          style: { fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.7)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8 }
        }, `⏱ ${current.time} · ${current.sub}`),
        React.createElement('div', {
          style: { fontSize: 20, fontWeight: 700, color: '#fff', lineHeight: 1.3, position: 'relative', zIndex: 1 }
        }, `"${current.prompt}"`)
      ),

      // Card bottom actions
      React.createElement('div', { style: { padding: '16px 20px' } },
        isCompleted
          ? React.createElement('div', {
            style: {
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              gap: 8, padding: '12px', borderRadius: 12,
              background: t.brass + '15', border: `1.5px solid ${t.brass}`,
            }
          },
            CheckIcon && React.createElement(CheckIcon, { size: 18, color: t.brass, strokeWidth: 2.5 }),
            React.createElement('span', { style: { fontSize: 14, fontWeight: 700, color: t.brass } }, 'Thread Added to Tapestry!')
          )
          : capturing
          ? React.createElement('div', {
            style: { textAlign: 'center', padding: '16px 0' }
          },
            React.createElement('div', {
              style: {
                display: 'inline-flex', alignItems: 'center', gap: 8,
                fontSize: 13, fontWeight: 600, color: t.textMuted,
              }
            },
              React.createElement('div', {
                style: {
                  width: 20, height: 20, borderRadius: '50%',
                  border: `2px solid ${t.brass}`,
                  borderTopColor: 'transparent',
                  animation: 'spin 0.8s linear infinite',
                }
              }),
              `Weaving your ${captureType}...`
            )
          )
          : React.createElement('div', { style: { display: 'flex', gap: 8 } },
            [
              { type: 'photo', Icon: CameraIcon, label: 'Photo' },
              { type: 'audio', Icon: MicIcon, label: 'Audio' },
              { type: 'note', Icon: TypeIcon, label: 'Note' },
            ].map(({ type, Icon, label }) =>
              React.createElement('button', {
                key: type,
                className: 'press-effect',
                onClick: () => handleCapture(type),
                style: {
                  flex: 1, padding: '10px 6px', borderRadius: 10,
                  background: type === 'photo' ? t.coral : t.surface,
                  border: `1.5px solid ${type === 'photo' ? t.coral : t.border}`,
                  cursor: 'pointer', display: 'flex', flexDirection: 'column',
                  alignItems: 'center', gap: 4,
                }
              },
                Icon && React.createElement(Icon, { size: 16, color: type === 'photo' ? '#fff' : t.text, strokeWidth: 2 }),
                React.createElement('span', {
                  style: { fontSize: 11, fontWeight: 600, color: type === 'photo' ? '#fff' : t.text }
                }, label)
              )
            )
          )
      )
    ),

    // Navigation arrows + counter
    React.createElement('div', {
      style: {
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '14px 20px',
      }
    },
      React.createElement('button', {
        onClick: () => setSwipeIndex(Math.max(0, swipeIndex - 1)),
        className: 'press-effect',
        style: {
          background: swipeIndex === 0 ? t.surface : t.primary,
          border: 'none', borderRadius: 12, width: 44, height: 44,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: swipeIndex === 0 ? 'default' : 'pointer', opacity: swipeIndex === 0 ? 0.4 : 1,
        }
      }, ChevronLeftIcon && React.createElement(ChevronLeftIcon, { size: 20, color: swipeIndex === 0 ? t.text : '#fff' })),
      React.createElement('div', { style: { textAlign: 'center' } },
        React.createElement('div', { style: { fontSize: 13, fontWeight: 600, color: t.textMuted } }, 'Swipe to explore'),
        React.createElement('div', { style: { fontSize: 11, color: t.textLight, marginTop: 2 } }, `${completedFragments.length} of ${fragments.length} completed today`)
      ),
      React.createElement('button', {
        onClick: () => setSwipeIndex(Math.min(fragments.length - 1, swipeIndex + 1)),
        className: 'press-effect',
        style: {
          background: swipeIndex === fragments.length - 1 ? t.surface : t.coral,
          border: 'none', borderRadius: 12, width: 44, height: 44,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: swipeIndex === fragments.length - 1 ? 'default' : 'pointer',
          opacity: swipeIndex === fragments.length - 1 ? 0.4 : 1,
        }
      }, ChevronRightIcon && React.createElement(ChevronRightIcon, { size: 20, color: swipeIndex === fragments.length - 1 ? t.text : '#fff' }))
    ),

    // Community pulse — asymmetric 2-col
    React.createElement('div', { style: { padding: '0 20px', marginBottom: 16 } },
      React.createElement('div', { style: { fontSize: 12, fontWeight: 700, color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 } }, 'Community Pulse'),
      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 8 } },
        React.createElement('div', {
          style: {
            background: t.primary, borderRadius: 16, padding: '14px 16px',
          }
        },
          React.createElement('div', { style: { fontSize: 11, color: 'rgba(245,240,232,0.6)', fontWeight: 500, marginBottom: 4 } }, 'Most active now'),
          React.createElement('div', { style: { fontSize: 16, fontWeight: 800, color: '#fff', marginBottom: 2 } }, 'Digital Declutter'),
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6, marginTop: 8 } },
            React.createElement('div', {
              style: { flex: 1, height: 4, background: 'rgba(255,255,255,0.15)', borderRadius: 2, overflow: 'hidden' }
            },
              React.createElement('div', { style: { width: '74%', height: '100%', background: t.brass, borderRadius: 2 } })
            ),
            React.createElement('span', { style: { fontSize: 11, fontWeight: 700, color: t.brass } }, '74%')
          )
        ),
        React.createElement('div', {
          style: { display: 'flex', flexDirection: 'column', gap: 8 }
        },
          React.createElement('div', {
            style: { background: t.coral, borderRadius: 14, padding: '10px 12px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }
          },
            React.createElement('div', { style: { fontSize: 22, fontWeight: 900, color: '#fff', lineHeight: 1 } }, '2.4k'),
            React.createElement('div', { style: { fontSize: 9, fontWeight: 600, color: 'rgba(255,255,255,0.8)', textTransform: 'uppercase' } }, 'Active\nForgers')
          ),
          React.createElement('div', {
            style: { background: t.surface, borderRadius: 14, padding: '10px 12px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', border: `1.5px solid ${t.border}` }
          },
            React.createElement('div', { style: { fontSize: 22, fontWeight: 900, color: t.text, lineHeight: 1 } }, '18k'),
            React.createElement('div', { style: { fontSize: 9, fontWeight: 600, color: t.textMuted, textTransform: 'uppercase' } }, 'Threads\nToday')
          )
        )
      )
    )
  );
}

// ─── TAPESTRIES SCREEN ────────────────────────────────────────────────────────

function TapestriesScreen({ t, setActiveScreen, expandedTapestry, setExpandedTapestry }) {
  const [selectedTapestry, setSelectedTapestry] = useState(null);

  const tapestries = [
    {
      id: 'atlas', name: 'Atlas of Focus', theme: 'Focus',
      contributors: 4820, threads: 18340,
      desc: 'A living mosaic of workspace moments and clarity rituals from forgers worldwide.',
      pattern: [
        ['#0D6E6E','#C9922A','#0D1B2A','#FF5A38','#0D6E6E'],
        ['#FF5A38','#0D1B2A','#C9922A','#0D6E6E','#0D1B2A'],
        ['#C9922A','#FF5A38','#0D6E6E','#0D1B2A','#C9922A'],
        ['#0D1B2A','#0D6E6E','#FF5A38','#C9922A','#0D6E6E'],
      ],
      myThread: true, accent: '#0D6E6E',
    },
    {
      id: 'garden', name: 'Digital Garden Weave', theme: 'Declutter',
      contributors: 3110, threads: 12890,
      desc: 'Every deleted file, cleared inbox, and organized folder woven into collective clarity.',
      pattern: [
        ['#1B4332','#52B788','#C9922A','#1B4332','#40916C'],
        ['#C9922A','#1B4332','#40916C','#52B788','#1B4332'],
        ['#40916C','#C9922A','#1B4332','#40916C','#52B788'],
        ['#52B788','#40916C','#C9922A','#1B4332','#C9922A'],
      ],
      myThread: false, accent: '#1B4332',
    },
    {
      id: 'model', name: 'Mental Model Map', theme: 'Learning',
      contributors: 2240, threads: 8670,
      desc: 'Summaries, insights, and learning breakthroughs forming a tapestry of shared knowledge.',
      pattern: [
        ['#8B2FC9','#C9922A','#FF5A38','#8B2FC9','#C9922A'],
        ['#FF5A38','#8B2FC9','#C9922A','#FF5A38','#8B2FC9'],
        ['#C9922A','#FF5A38','#8B2FC9','#C9922A','#FF5A38'],
        ['#8B2FC9','#C9922A','#FF5A38','#8B2FC9','#C9922A'],
      ],
      myThread: true, accent: '#8B2FC9',
    },
  ];

  const LayersIcon = window.lucide.Layers;
  const UsersIcon = window.lucide.Users;
  const ArrowRightIcon = window.lucide.ArrowRight;
  const XIcon = window.lucide.X;
  const SparklesIcon = window.lucide.Sparkles;
  const CheckCircleIcon = window.lucide.CheckCircle;

  if (selectedTapestry) {
    const tap = tapestries.find(t => t.id === selectedTapestry);
    return React.createElement('div', {
      style: { flex: 1, overflowY: 'auto', paddingBottom: 80 }
    },
      React.createElement('div', {
        style: { background: tap.accent, padding: '20px 20px 0' }
      },
        React.createElement('div', {
          style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }
        },
          React.createElement('div', null,
            React.createElement('div', { style: { fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.7)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 } }, tap.theme),
            React.createElement('div', { style: { fontSize: 22, fontWeight: 800, color: '#fff', lineHeight: 1.2 } }, tap.name)
          ),
          React.createElement('button', {
            onClick: () => setSelectedTapestry(null),
            className: 'press-effect',
            style: { background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: 20, width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }
          }, XIcon && React.createElement(XIcon, { size: 16, color: '#fff' }))
        ),
        // Full tapestry grid
        React.createElement('div', {
          style: {
            borderRadius: '12px 12px 0 0', overflow: 'hidden',
            display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)',
            marginTop: 16,
          }
        },
          tap.pattern.concat(tap.pattern).map((row, ri) =>
            row.map((color, ci) =>
              React.createElement('div', {
                key: `${ri}-${ci}`,
                className: 'tapestry-cell',
                style: {
                  width: '100%', aspectRatio: '1',
                  background: color,
                  opacity: 0.85 + Math.random() * 0.15,
                }
              })
            )
          )
        )
      ),
      React.createElement('div', { style: { padding: '20px 20px' } },
        React.createElement('p', { style: { fontSize: 14, color: t.textMuted, lineHeight: 1.6, marginBottom: 20 } }, tap.desc),
        React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 } },
          [
            { label: 'Contributors', value: tap.contributors.toLocaleString() },
            { label: 'Total Threads', value: tap.threads.toLocaleString() },
            { label: 'Your Threads', value: tap.myThread ? '23' : '0' },
            { label: 'This Week', value: '+' + Math.floor(tap.threads * 0.08).toLocaleString() },
          ].map(({ label, value }) =>
            React.createElement('div', {
              key: label,
              style: { background: t.surface, borderRadius: 12, padding: '12px 14px', border: `1.5px solid ${t.border}` }
            },
              React.createElement('div', { style: { fontSize: 20, fontWeight: 800, color: t.text } }, value),
              React.createElement('div', { style: { fontSize: 11, color: t.textMuted, marginTop: 2 } }, label)
            )
          )
        ),
        tap.myThread && React.createElement('div', {
          style: {
            display: 'flex', alignItems: 'center', gap: 10,
            background: t.brass + '18', border: `1.5px solid ${t.brass}`,
            borderRadius: 12, padding: '12px 16px',
          }
        },
          CheckCircleIcon && React.createElement(CheckCircleIcon, { size: 18, color: t.brass }),
          React.createElement('span', { style: { fontSize: 13, fontWeight: 600, color: t.brass } }, 'Your threads are woven here')
        )
      )
    );
  }

  return React.createElement('div', {
    style: { flex: 1, overflowY: 'auto', paddingBottom: 80 }
  },
    React.createElement('div', { style: { padding: '20px 20px 16px' } },
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 } },
        LayersIcon && React.createElement(LayersIcon, { size: 18, color: t.brass }),
        React.createElement('span', { style: { fontSize: 11, fontWeight: 700, color: t.brass, letterSpacing: '0.12em', textTransform: 'uppercase' } }, 'Momentum Tapestries')
      ),
      React.createElement('div', { style: { fontSize: 22, fontWeight: 800, color: t.text } }, 'Living Collective Art'),
      React.createElement('p', { style: { fontSize: 13, color: t.textMuted, marginTop: 4, lineHeight: 1.5 } }, 'Every fragment you forge weaves into these shared masterpieces.')
    ),

    tapestries.map((tap, idx) =>
      React.createElement('div', {
        key: tap.id,
        className: 'press-effect',
        onClick: () => setSelectedTapestry(tap.id),
        style: {
          margin: `0 20px ${idx < tapestries.length - 1 ? '14px' : '0'}`,
          background: t.card,
          borderRadius: 20,
          overflow: 'hidden',
          border: `2px solid ${tap.myThread ? t.brass : t.border}`,
          cursor: 'pointer',
        }
      },
        // Tapestry preview
        React.createElement('div', {
          style: {
            display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)',
            height: 80, overflow: 'hidden',
          }
        },
          tap.pattern.map((row, ri) =>
            row.map((color, ci) =>
              React.createElement('div', {
                key: `${ri}-${ci}`,
                style: { background: color, opacity: 0.9 }
              })
            )
          )
        ),
        // Tapestry info
        React.createElement('div', {
          style: {
            padding: '14px 16px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }
        },
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 } },
              React.createElement('span', { style: { fontSize: 16, fontWeight: 800, color: t.text } }, tap.name),
              tap.myThread && React.createElement('div', {
                style: { background: t.brass, borderRadius: 6, padding: '2px 6px' }
              }, React.createElement('span', { style: { fontSize: 9, fontWeight: 700, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.08em' } }, 'Yours'))
            ),
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12, marginTop: 4 } },
              React.createElement('span', { style: { fontSize: 11, color: t.textMuted } },
                UsersIcon && React.createElement(UsersIcon, { size: 10, color: t.textMuted, style: { display: 'inline', marginRight: 3 } }),
                `${tap.contributors.toLocaleString()} forgers`
              ),
              React.createElement('span', { style: { fontSize: 11, color: t.textMuted } }, `${tap.threads.toLocaleString()} threads`)
            )
          ),
          ArrowRightIcon && React.createElement(ArrowRightIcon, { size: 18, color: t.textMuted })
        )
      )
    ),

    // CTA
    React.createElement('div', {
      style: { margin: '16px 20px 0', background: t.primary, borderRadius: 20, padding: '20px' }
    },
      SparklesIcon && React.createElement(SparklesIcon, { size: 20, color: t.brass, marginBottom: 8 }),
      React.createElement('div', { style: { fontSize: 16, fontWeight: 800, color: '#fff', marginTop: 8, marginBottom: 6 } }, 'New tapestry forming...'),
      React.createElement('div', { style: { fontSize: 12, color: 'rgba(245,240,232,0.7)', lineHeight: 1.5, marginBottom: 14 } }, '"Workspace Refresh Week" tapestry needs 500 more threads to unlock.'),
      React.createElement('div', { style: { background: 'rgba(255,255,255,0.1)', borderRadius: 8, overflow: 'hidden', height: 6, marginBottom: 10 } },
        React.createElement('div', { style: { width: '63%', height: '100%', background: t.brass, borderRadius: 8 } })
      ),
      React.createElement('div', { style: { fontSize: 11, fontWeight: 600, color: t.brass } }, '315 / 500 threads — be a founding weaver')
    )
  );
}

// ─── QUESTS SCREEN ────────────────────────────────────────────────────────────

function QuestsScreen({ t, activeQuest, setActiveQuest }) {
  const [joined, setJoined] = useState(['workspace']);

  const quests = [
    {
      id: 'workspace', name: 'Workspace Refresh Week', emoji: '🏗️',
      duration: 'Ends in 3 days', participants: 1240, goal: 5000, current: 3780,
      fragments: ['Photograph your desk from above', 'Spot one item to relocate', 'Draft a 2-line desk intention'],
      badge: 'Architect of Clarity', color: t.coral, locked: false,
    },
    {
      id: 'mental', name: 'Mental Model Mapping', emoji: '🧠',
      duration: 'Starts in 2 days', participants: 890, goal: 3000, current: 0,
      fragments: ['Summarize your last learning', 'Draw a rough concept map', 'Find a connection you missed'],
      badge: 'Cartographer of Ideas', color: '#8B2FC9', locked: false,
    },
    {
      id: 'focus', name: 'Month of Deep Focus', emoji: '🔭',
      duration: '28 days', participants: 3400, goal: 10000, current: 6720,
      fragments: ['Capture your focus ritual', 'Time one deep work session', 'Name your biggest distraction'],
      badge: 'Focus Architect', color: '#0D6E6E', locked: true,
    },
  ];

  const TargetIcon = window.lucide.Target;
  const UsersIcon = window.lucide.Users;
  const ClockIcon = window.lucide.Clock;
  const LockIcon = window.lucide.Lock;
  const CheckIcon = window.lucide.Check;
  const ChevronDownIcon = window.lucide.ChevronDown;
  const ChevronUpIcon = window.lucide.ChevronUp;
  const ZapIcon = window.lucide.Zap;

  return React.createElement('div', {
    style: { flex: 1, overflowY: 'auto', paddingBottom: 80 }
  },
    React.createElement('div', { style: { padding: '20px 20px 16px' } },
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 } },
        TargetIcon && React.createElement(TargetIcon, { size: 18, color: t.brass }),
        React.createElement('span', { style: { fontSize: 11, fontWeight: 700, color: t.brass, letterSpacing: '0.12em', textTransform: 'uppercase' } }, 'Co-Forge Quests')
      ),
      React.createElement('div', { style: { fontSize: 22, fontWeight: 800, color: t.text } }, 'Forge Together'),
      React.createElement('p', { style: { fontSize: 13, color: t.textMuted, marginTop: 4, lineHeight: 1.5 } }, 'Themed challenges where collective fragments unlock shared achievements.')
    ),

    quests.map((quest, idx) => {
      const isExpanded = activeQuest === quest.id;
      const isJoined = joined.includes(quest.id);
      const pct = quest.goal > 0 ? Math.round((quest.current / quest.goal) * 100) : 0;

      return React.createElement('div', {
        key: quest.id,
        style: { margin: `0 20px ${idx < quests.length - 1 ? '14px' : '0'}` }
      },
        React.createElement('div', {
          style: {
            background: t.card, borderRadius: 20, overflow: 'hidden',
            border: `2px solid ${isJoined ? quest.color : t.border}`,
            opacity: quest.locked ? 0.7 : 1,
          }
        },
          // Quest header — clickable
          React.createElement('div', {
            onClick: () => !quest.locked && setActiveQuest(isExpanded ? null : quest.id),
            style: {
              padding: '16px', cursor: quest.locked ? 'default' : 'pointer',
              display: 'flex', alignItems: 'flex-start', gap: 12,
            }
          },
            React.createElement('div', {
              style: {
                width: 48, height: 48, borderRadius: 14,
                background: quest.color + '20', display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                fontSize: 22, flexShrink: 0,
              }
            }, quest.locked ? (LockIcon && React.createElement(LockIcon, { size: 20, color: t.textMuted })) : quest.emoji),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', {
                style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }
              },
                React.createElement('div', { style: { fontSize: 15, fontWeight: 800, color: t.text } }, quest.name),
                !quest.locked && (isExpanded
                  ? (ChevronUpIcon && React.createElement(ChevronUpIcon, { size: 16, color: t.textMuted }))
                  : (ChevronDownIcon && React.createElement(ChevronDownIcon, { size: 16, color: t.textMuted })))
              ),
              React.createElement('div', { style: { display: 'flex', gap: 12, marginBottom: 8 } },
                React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
                  ClockIcon && React.createElement(ClockIcon, { size: 11, color: t.textMuted }),
                  React.createElement('span', { style: { fontSize: 11, color: t.textMuted } }, quest.duration)
                ),
                React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
                  UsersIcon && React.createElement(UsersIcon, { size: 11, color: t.textMuted }),
                  React.createElement('span', { style: { fontSize: 11, color: t.textMuted } }, `${quest.participants.toLocaleString()} forgers`)
                )
              ),
              // Progress
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8 } },
                React.createElement('div', {
                  style: { flex: 1, height: 5, background: t.surface, borderRadius: 3, overflow: 'hidden', border: `1px solid ${t.border}` }
                },
                  React.createElement('div', {
                    style: { width: `${pct}%`, height: '100%', background: quest.color, borderRadius: 3, transition: 'width 0.5s ease' }
                  })
                ),
                React.createElement('span', { style: { fontSize: 11, fontWeight: 700, color: quest.color, minWidth: 30 } }, `${pct}%`)
              )
            )
          ),

          // Expanded content
          isExpanded && !quest.locked && React.createElement('div', {
            style: { padding: '0 16px 16px', borderTop: `1px solid ${t.border}` }
          },
            React.createElement('div', { style: { paddingTop: 12, marginBottom: 12 } },
              React.createElement('div', { style: { fontSize: 11, fontWeight: 700, color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 } }, 'Quest Fragments'),
              quest.fragments.map((frag, fi) =>
                React.createElement('div', {
                  key: fi,
                  style: {
                    display: 'flex', alignItems: 'center', gap: 10,
                    padding: '8px 0', borderBottom: fi < quest.fragments.length - 1 ? `1px solid ${t.border}` : 'none',
                  }
                },
                  React.createElement('div', {
                    style: {
                      width: 24, height: 24, borderRadius: '50%',
                      background: fi === 0 && isJoined ? quest.color : t.surface,
                      border: `2px solid ${fi === 0 && isJoined ? quest.color : t.border}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                    }
                  },
                    fi === 0 && isJoined && CheckIcon && React.createElement(CheckIcon, { size: 12, color: '#fff', strokeWidth: 2.5 })
                  ),
                  React.createElement('span', { style: { fontSize: 12, color: fi === 0 && isJoined ? t.textMuted : t.text } }, frag)
                )
              )
            ),
            React.createElement('div', { style: { background: quest.color + '12', borderRadius: 10, padding: '10px 12px', marginBottom: 12 } },
              React.createElement('div', { style: { fontSize: 11, fontWeight: 700, color: quest.color, textTransform: 'uppercase', letterSpacing: '0.08em' } }, 'Quest Badge'),
              React.createElement('div', { style: { fontSize: 14, fontWeight: 700, color: t.text, marginTop: 2 } }, `🏅 ${quest.badge}`)
            ),
            React.createElement('button', {
              className: 'press-effect',
              onClick: () => setJoined(prev => isJoined ? prev.filter(j => j !== quest.id) : [...prev, quest.id]),
              style: {
                width: '100%', padding: '12px', borderRadius: 12,
                background: isJoined ? t.surface : quest.color,
                border: isJoined ? `1.5px solid ${t.border}` : 'none',
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              }
            },
              ZapIcon && React.createElement(ZapIcon, { size: 15, color: isJoined ? t.textMuted : '#fff', strokeWidth: 2 }),
              React.createElement('span', { style: { fontSize: 14, fontWeight: 700, color: isJoined ? t.textMuted : '#fff' } },
                isJoined ? 'Leave Quest' : 'Join Quest'
              )
            )
          )
        )
      );
    })
  );
}

// ─── JOURNAL SCREEN ───────────────────────────────────────────────────────────

function JournalScreen({ t, setActiveScreen }) {
  const [activeTab, setActiveTab] = useState('mine');
  const [bookmarked, setBookmarked] = useState([1, 3]);

  const myEntries = [
    {
      id: 0, date: 'Today', theme: 'Digital Declutter', emoji: '🧹',
      action: 'Screenshot', preview: 'Downloads folder before & after',
      tapestry: 'Digital Garden Weave', color: '#1B4332',
    },
    {
      id: 1, date: 'Yesterday', theme: 'Mindful Moments', emoji: '🌿',
      action: 'Photo', preview: 'Sunlight through office blinds',
      tapestry: 'Atlas of Focus', color: '#0D6E6E',
    },
    {
      id: 2, date: 'Wed Apr 2', theme: 'Learning Sprint', emoji: '⚡',
      action: 'Note', preview: '"The key insight from the retro was that we need async updates rather than sync reviews."',
      tapestry: 'Mental Model Map', color: '#8B2FC9',
    },
    {
      id: 3, date: 'Tue Apr 1', theme: 'Focus Atlas', emoji: '🔭',
      action: 'Photo', preview: 'Standing desk at golden hour',
      tapestry: 'Atlas of Focus', color: '#0D6E6E',
    },
  ];

  const communityEntries = [
    {
      id: 10, user: 'maya_m', theme: 'Digital Declutter', emoji: '🧹',
      preview: 'Cleared 4GB of old XD files — finally!',
      tapestry: 'Digital Garden Weave', color: '#1B4332', likes: 48,
    },
    {
      id: 11, user: 'forge_k', theme: 'Mindful Moments', emoji: '🌿',
      preview: 'Morning ritual: 5 mins of just breathing before opening laptop.',
      tapestry: 'Atlas of Focus', color: '#0D6E6E', likes: 31,
    },
    {
      id: 12, user: 'nadia_v', theme: 'Learning Sprint', emoji: '⚡',
      preview: 'Framework: every meeting needs a 1-line outcome. Changed everything.',
      tapestry: 'Mental Model Map', color: '#8B2FC9', likes: 72,
    },
  ];

  const BookOpenIcon = window.lucide.BookOpen;
  const BookmarkIcon = window.lucide.Bookmark;
  const HeartIcon = window.lucide.Heart;
  const CameraIcon = window.lucide.Camera;
  const TypeIcon = window.lucide.Type;
  const ImageIcon = window.lucide.Image;
  const UserIcon = window.lucide.User;

  const getActionIcon = (action) => {
    if (action === 'Photo') return CameraIcon && React.createElement(CameraIcon, { size: 11, color: '#fff' });
    if (action === 'Note') return TypeIcon && React.createElement(TypeIcon, { size: 11, color: '#fff' });
    return ImageIcon && React.createElement(ImageIcon, { size: 11, color: '#fff' });
  };

  return React.createElement('div', {
    style: { flex: 1, overflowY: 'auto', paddingBottom: 80 }
  },
    // Header
    React.createElement('div', { style: { padding: '20px 20px 0' } },
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 } },
        BookOpenIcon && React.createElement(BookOpenIcon, { size: 18, color: t.brass }),
        React.createElement('span', { style: { fontSize: 11, fontWeight: 700, color: t.brass, letterSpacing: '0.12em', textTransform: 'uppercase' } }, 'Reflect & Discover')
      ),
      React.createElement('div', { style: { fontSize: 22, fontWeight: 800, color: t.text } }, 'Your Journal'),
    ),

    // Asymmetric stats banner
    React.createElement('div', {
      style: { margin: '14px 20px', display: 'grid', gridTemplateColumns: '1fr 1fr 80px', gap: 8 }
    },
      React.createElement('div', {
        style: { background: t.primary, borderRadius: 16, padding: '14px' }
      },
        React.createElement('div', { style: { fontSize: 28, fontWeight: 900, color: t.brass, lineHeight: 1 } }, '7'),
        React.createElement('div', { style: { fontSize: 10, color: 'rgba(245,240,232,0.7)', fontWeight: 600, textTransform: 'uppercase', marginTop: 4 } }, 'Day Streak')
      ),
      React.createElement('div', {
        style: { background: t.surface, borderRadius: 16, padding: '14px', border: `1.5px solid ${t.border}` }
      },
        React.createElement('div', { style: { fontSize: 28, fontWeight: 900, color: t.text, lineHeight: 1 } }, '23'),
        React.createElement('div', { style: { fontSize: 10, color: t.textMuted, fontWeight: 600, textTransform: 'uppercase', marginTop: 4 } }, 'Threads\nTotal')
      ),
      React.createElement('div', {
        style: { background: t.coral, borderRadius: 16, padding: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }
      },
        React.createElement('div', { style: { fontSize: 24, fontWeight: 900, color: '#fff', lineHeight: 1 } }, '3'),
        React.createElement('div', { style: { fontSize: 9, color: 'rgba(255,255,255,0.85)', fontWeight: 600, textTransform: 'uppercase', textAlign: 'center', marginTop: 3 } }, 'Tapes-\ntries')
      )
    ),

    // Tabs
    React.createElement('div', {
      style: { padding: '0 20px', display: 'flex', gap: 0, marginBottom: 16 }
    },
      ['mine', 'discover', 'bookmarks'].map(tab =>
        React.createElement('button', {
          key: tab,
          onClick: () => setActiveTab(tab),
          className: 'press-effect',
          style: {
            flex: 1, padding: '10px 4px',
            background: 'none', border: 'none',
            borderBottom: `2.5px solid ${activeTab === tab ? t.brass : t.border}`,
            cursor: 'pointer',
            fontSize: 12, fontWeight: activeTab === tab ? 700 : 500,
            color: activeTab === tab ? t.brass : t.textMuted,
            textTransform: 'capitalize', letterSpacing: '0.05em',
            transition: 'all 0.2s ease',
          }
        }, tab === 'mine' ? 'My Entries' : tab === 'discover' ? 'Discover' : 'Bookmarks')
      )
    ),

    // Content
    React.createElement('div', { style: { padding: '0 20px' } },
      activeTab === 'mine' && myEntries.map((entry, idx) =>
        React.createElement('div', {
          key: entry.id,
          style: {
            background: t.card, borderRadius: 16, padding: '14px',
            marginBottom: 10, border: `1.5px solid ${t.border}`,
            display: 'flex', gap: 12,
          }
        },
          // Left color stripe + emoji
          React.createElement('div', {
            style: {
              width: 40, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6
            }
          },
            React.createElement('div', {
              style: {
                width: 40, height: 40, borderRadius: 12,
                background: entry.color + '20', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 18,
              }
            }, entry.emoji),
            idx < myEntries.length - 1 && React.createElement('div', {
              style: { width: 2, flex: 1, background: t.border, borderRadius: 1, minHeight: 16 }
            })
          ),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: 4 } },
              React.createElement('div', null,
                React.createElement('span', { style: { fontSize: 10, fontWeight: 700, color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em' } }, entry.theme),
                React.createElement('span', { style: { fontSize: 10, color: t.textLight, marginLeft: 8 } }, entry.date)
              ),
              React.createElement('div', {
                style: {
                  display: 'inline-flex', alignItems: 'center', gap: 3,
                  background: entry.color, borderRadius: 6, padding: '2px 6px',
                }
              },
                getActionIcon(entry.action),
                React.createElement('span', { style: { fontSize: 9, fontWeight: 600, color: '#fff', textTransform: 'uppercase' } }, entry.action)
              )
            ),
            React.createElement('div', {
              style: {
                fontSize: 13, color: t.text, lineHeight: 1.4, marginBottom: 6,
                fontStyle: entry.action === 'Note' ? 'italic' : 'normal',
              }
            }, entry.preview),
            React.createElement('div', { style: { fontSize: 10, color: t.textLight } },
              '→ ', React.createElement('span', { style: { fontWeight: 600 } }, entry.tapestry)
            )
          )
        )
      ),

      activeTab === 'discover' && communityEntries.map(entry =>
        React.createElement('div', {
          key: entry.id,
          style: {
            background: t.card, borderRadius: 16, padding: '14px',
            marginBottom: 10, border: `1.5px solid ${t.border}`,
          }
        },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 } },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8 } },
              React.createElement('div', {
                style: {
                  width: 32, height: 32, borderRadius: 10,
                  background: entry.color, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 15,
                }
              }, entry.emoji),
              React.createElement('div', null,
                React.createElement('div', { style: { fontSize: 13, fontWeight: 700, color: t.text } }, `@${entry.user}`),
                React.createElement('div', { style: { fontSize: 10, color: t.textMuted } }, entry.theme)
              )
            ),
            React.createElement('button', {
              className: 'press-effect',
              onClick: () => setBookmarked(prev => bookmarked.includes(entry.id) ? prev.filter(b => b !== entry.id) : [...prev, entry.id]),
              style: { background: 'none', border: 'none', cursor: 'pointer', padding: 4 }
            },
              BookmarkIcon && React.createElement(BookmarkIcon, {
                size: 16, color: bookmarked.includes(entry.id) ? t.brass : t.textMuted,
                fill: bookmarked.includes(entry.id) ? t.brass : 'none',
              })
            )
          ),
          React.createElement('p', { style: { fontSize: 13, color: t.text, lineHeight: 1.5, marginBottom: 10, fontStyle: 'italic' } },
            `"${entry.preview}"`
          ),
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
            React.createElement('div', { style: { fontSize: 10, color: t.textLight } },
              '→ ', React.createElement('span', { style: { fontWeight: 600 } }, entry.tapestry)
            ),
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
              HeartIcon && React.createElement(HeartIcon, { size: 12, color: t.coral, fill: t.coral }),
              React.createElement('span', { style: { fontSize: 11, color: t.textMuted } }, entry.likes)
            )
          )
        )
      ),

      activeTab === 'bookmarks' && (
        bookmarked.length === 0
          ? React.createElement('div', {
            style: { textAlign: 'center', padding: '40px 20px', color: t.textMuted }
          },
            React.createElement('div', { style: { fontSize: 32, marginBottom: 12 } }, '📌'),
            React.createElement('div', { style: { fontSize: 15, fontWeight: 700, color: t.text, marginBottom: 6 } }, 'No bookmarks yet'),
            React.createElement('div', { style: { fontSize: 13, lineHeight: 1.5 } }, 'Discover inspiring fragments and save them here.')
          )
          : communityEntries.filter(e => bookmarked.includes(e.id)).map(entry =>
            React.createElement('div', {
              key: entry.id,
              style: {
                background: t.card, borderRadius: 16, padding: '14px',
                marginBottom: 10, border: `1.5px solid ${t.brass}`,
              }
            },
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 } },
                React.createElement('div', {
                  style: { width: 28, height: 28, borderRadius: 8, background: entry.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13 }
                }, entry.emoji),
                React.createElement('span', { style: { fontSize: 12, fontWeight: 700, color: t.text } }, `@${entry.user}`),
                React.createElement('div', { style: { marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 4 } },
                  BookmarkIcon && React.createElement(BookmarkIcon, { size: 13, color: t.brass, fill: t.brass })
                )
              ),
              React.createElement('p', { style: { fontSize: 13, color: t.text, lineHeight: 1.5, fontStyle: 'italic' } },
                `"${entry.preview}"`
              )
            )
          )
      )
    )
  );
}
