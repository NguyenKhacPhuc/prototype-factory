const { useState, useEffect, useRef, useCallback } = React;

function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [isDark, setIsDark] = useState(false);
  const [animateIn, setAnimateIn] = useState(true);
  const [activeWeave, setActiveWeave] = useState(null);
  const [completedFacts, setCompletedFacts] = useState([0, 1, 2]);
  const [selectedThread, setSelectedThread] = useState(null);
  const [activeGuild, setActiveGuild] = useState(null);
  const [tapestryZoom, setTapestryZoom] = useState(false);
  const [quizAnswer, setQuizAnswer] = useState(null);
  const [showQuizResult, setShowQuizResult] = useState(false);

  const themes = {
    light: {
      primary: '#0891B2',
      secondary: '#22D3EE',
      cta: '#22C55E',
      bg: '#ECFEFF',
      card: '#FFFFFF',
      cardAlt: '#F0FDFA',
      text: '#0C4A6E',
      textSecondary: '#0E7490',
      textMuted: '#67A8B9',
      border: '#A5F3FC',
      borderLight: '#CFFAFE',
      navBg: '#FFFFFF',
      navBorder: '#E0F2FE',
      surface: '#F0FDFA',
      danger: '#EF4444',
      gold: '#F59E0B',
      purple: '#8B5CF6',
    },
    dark: {
      primary: '#22D3EE',
      secondary: '#0891B2',
      cta: '#22C55E',
      bg: '#0C1B2A',
      card: '#132F4C',
      cardAlt: '#1A3A5C',
      text: '#E0F7FA',
      textSecondary: '#67E8F9',
      textMuted: '#4A8A9A',
      border: '#1E4D6E',
      borderLight: '#163D5C',
      navBg: '#0F2740',
      navBorder: '#1A3A5C',
      surface: '#132F4C',
      danger: '#F87171',
      gold: '#FBBF24',
      purple: '#A78BFA',
    }
  };

  const t = isDark ? themes.dark : themes.light;

  const font = "-apple-system, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif";

  useEffect(() => {
    setAnimateIn(false);
    const timer = setTimeout(() => setAnimateIn(true), 30);
    return () => clearTimeout(timer);
  }, [activeScreen]);

  const weeklyWeaves = [
    {
      id: 'ancient',
      title: 'Ancient Wonders',
      domain: 'History',
      color: '#F59E0B',
      icon: 'Landmark',
      facts: [
        { q: 'The Great Pyramid of Giza was the tallest structure for over 3,800 years.', detail: 'Built around 2560 BCE, it stood 146.6m tall.' },
        { q: 'The Library of Alexandria held an estimated 400,000 scrolls.', detail: 'Scholars from across the ancient world gathered here.' },
        { q: 'Roman concrete is stronger than modern concrete after 2,000 years.', detail: 'Seawater actually strengthens the volcanic ash mixture.' },
        { q: 'The Hanging Gardens may have used an early water pump system.', detail: 'Archimedes screw-like devices lifted water to terraces.' },
        { q: 'Which ancient wonder was in modern-day Turkey?', options: ['Colossus of Rhodes', 'Temple of Artemis', 'Lighthouse of Alexandria', 'Statue of Zeus'], answer: 1 },
      ],
      progress: 3,
      total: 5,
    },
    {
      id: 'cosmos',
      title: 'Cosmic Threads',
      domain: 'Science',
      color: '#8B5CF6',
      icon: 'Telescope',
      facts: [
        { q: 'A teaspoon of neutron star weighs about 6 billion tons.', detail: 'The density is almost incomprehensible to human experience.' },
        { q: 'Light from the Sun takes 8 minutes and 20 seconds to reach Earth.', detail: 'The Sun is about 150 million km away.' },
        { q: 'There are more stars in the universe than grains of sand on Earth.', detail: 'Estimated 70 sextillion observable stars.' },
        { q: 'Saturn could float in water if you had a big enough bathtub.', detail: 'Its density is 0.687 g/cm\u00B3, less than water.' },
        { q: 'What is the largest known structure in the universe?', options: ['Laniakea Supercluster', 'Hercules-Corona Borealis Great Wall', 'Observable Universe Edge', 'Bootes Void'], answer: 1 },
      ],
      progress: 1,
      total: 5,
    },
    {
      id: 'artistry',
      title: 'Hidden Artistry',
      domain: 'Arts',
      color: '#EC4899',
      icon: 'Palette',
      facts: [
        { q: 'The Mona Lisa was once hung in Napoleon\'s bedroom.', detail: 'He kept it there for about four years before it moved to the Louvre.' },
        { q: 'Picasso could draw before he could walk.', detail: 'His first word was reportedly "p\u00EDz" (pencil in Spanish).' },
        { q: 'Van Gogh only sold one painting during his lifetime.', detail: 'The Red Vineyard sold for 400 francs in 1890.' },
        { q: 'Michelangelo painted the Sistine Chapel ceiling standing up, not lying down.', detail: 'He designed a special scaffolding system.' },
        { q: 'Which artist cut off part of their own ear?', options: ['Monet', 'Van Gogh', 'Rembrandt', 'Dali'], answer: 1 },
      ],
      progress: 0,
      total: 5,
    },
  ];

  const tapestryThreads = [
    { id: 1, label: 'Great Pyramid', domain: 'History', color: '#F59E0B', x: 30, y: 25, size: 28 },
    { id: 2, label: 'Library of Alexandria', domain: 'History', color: '#F59E0B', x: 65, y: 18, size: 22 },
    { id: 3, label: 'Roman Concrete', domain: 'History', color: '#F59E0B', x: 50, y: 42, size: 26 },
    { id: 4, label: 'Neutron Star', domain: 'Science', color: '#8B5CF6', x: 20, y: 60, size: 24 },
    { id: 5, label: 'Mona Lisa', domain: 'Arts', color: '#EC4899', x: 75, y: 55, size: 20 },
    { id: 6, label: 'Sun Light', domain: 'Science', color: '#8B5CF6', x: 45, y: 72, size: 22 },
    { id: 7, label: 'Hanging Gardens', domain: 'History', color: '#F59E0B', x: 80, y: 35, size: 18 },
    { id: 8, label: 'Picasso', domain: 'Arts', color: '#EC4899', x: 15, y: 40, size: 20 },
  ];

  const guilds = [
    { id: 'ancient', name: 'Ancient Wonders Weavers', members: 3420, icon: 'Landmark', color: '#F59E0B', desc: 'Unraveling the mysteries of lost civilizations', threads: 12400 },
    { id: 'cosmic', name: 'Cosmic Thread Keepers', members: 5180, icon: 'Telescope', color: '#8B5CF6', desc: 'Mapping the wonders of the universe', threads: 18900 },
    { id: 'nature', name: 'Nature Pattern Society', members: 2890, icon: 'TreePine', color: '#22C55E', desc: 'Exploring the mathematics of the natural world', threads: 9700 },
    { id: 'arts', name: 'Creative Loom Collective', members: 1960, icon: 'Palette', color: '#EC4899', desc: 'Weaving stories through artistic expression', threads: 7200 },
  ];

  const seasonalEvents = [
    {
      id: 'solstice',
      title: 'Summer Solstice Weave',
      subtitle: 'Celestial Patterns Edition',
      desc: 'Explore the ancient astronomical traditions and modern science behind the longest day of the year.',
      reward: 'Golden Helix Super Thread',
      participants: 14200,
      daysLeft: 5,
      color: '#F59E0B',
      icon: 'Sun',
      progress: 60,
    },
    {
      id: 'renaissance',
      title: 'Renaissance Revival',
      subtitle: 'Masters & Movements',
      desc: 'A deep dive into the artistic and scientific revolution that shaped the modern world.',
      reward: 'Da Vinci Codex Thread',
      participants: 8900,
      daysLeft: 12,
      color: '#EC4899',
      icon: 'Brush',
      progress: 25,
    },
    {
      id: 'ocean',
      title: 'World Oceans Week',
      subtitle: 'Deep Blue Discovery',
      desc: 'Plunge into the mysteries of the deep ocean and discover creatures beyond imagination.',
      reward: 'Abyssal Weave Thread',
      participants: 11300,
      daysLeft: 19,
      color: '#0891B2',
      icon: 'Waves',
      progress: 10,
    },
  ];

  const Icon = ({ name, size = 20, color = t.text, style = {} }) => {
    const IconComponent = window.lucide && window.lucide[name];
    if (!IconComponent) return null;
    return React.createElement(IconComponent, { size, color, style, strokeWidth: 2 });
  };

  // ============ HOME SCREEN ============
  const HomeScreen = () => {
    const currentWeave = weeklyWeaves[0];
    return React.createElement('div', {
      style: { padding: '20px 16px 24px', animation: animateIn ? 'fadeIn 0.4s ease' : 'none' }
    },
      // Header
      React.createElement('div', {
        style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }
      },
        React.createElement('div', null,
          React.createElement('div', {
            style: { fontSize: 13, fontWeight: 600, color: t.textMuted, textTransform: 'uppercase', letterSpacing: 1.2, fontFamily: font }
          }, 'Welcome back'),
          React.createElement('h1', {
            style: { fontSize: 34, fontWeight: 800, color: t.text, letterSpacing: -0.5, margin: '4px 0 0', fontFamily: font }
          }, "Mimir's Tapestry"),
        ),
        React.createElement('div', {
          onClick: () => setIsDark(!isDark),
          style: {
            width: 44, height: 44, borderRadius: 22, background: t.card,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)', cursor: 'pointer',
            border: `1px solid ${t.border}`, transition: 'all 0.2s ease'
          }
        },
          React.createElement(Icon, { name: isDark ? 'Sun' : 'Moon', size: 20, color: t.primary })
        )
      ),

      // Tapestry Preview Card
      React.createElement('div', {
        onClick: () => setActiveScreen('tapestry'),
        style: {
          background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})`,
          borderRadius: 20, padding: 20, marginBottom: 20, cursor: 'pointer',
          position: 'relative', overflow: 'hidden', transition: 'transform 0.2s ease',
          boxShadow: '0 8px 32px rgba(8,145,178,0.25)'
        }
      },
        React.createElement('div', {
          style: {
            position: 'absolute', top: -20, right: -20, width: 120, height: 120,
            borderRadius: '50%', background: 'rgba(255,255,255,0.1)',
          }
        }),
        React.createElement('div', {
          style: {
            position: 'absolute', bottom: -30, left: 40, width: 80, height: 80,
            borderRadius: '50%', background: 'rgba(255,255,255,0.07)',
          }
        }),
        React.createElement('div', {
          style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }
        },
          React.createElement(Icon, { name: 'Sparkles', size: 18, color: '#FFF' }),
          React.createElement('span', {
            style: { fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.9)', fontFamily: font, textTransform: 'uppercase', letterSpacing: 1 }
          }, 'Your Tapestry')
        ),
        React.createElement('div', {
          style: { fontSize: 22, fontWeight: 700, color: '#FFF', fontFamily: font, marginBottom: 6 }
        }, '8 Threads Woven'),
        React.createElement('div', {
          style: { fontSize: 15, color: 'rgba(255,255,255,0.8)', fontFamily: font, marginBottom: 16 }
        }, '3 domains explored \u2022 Level 4 Weaver'),
        // Mini tapestry visualization
        React.createElement('div', {
          style: {
            height: 60, borderRadius: 12, background: 'rgba(255,255,255,0.12)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '0 12px',
            backdropFilter: 'blur(10px)'
          }
        },
          ...[...Array(12)].map((_, i) =>
            React.createElement('div', {
              key: i,
              style: {
                width: 4, borderRadius: 2,
                height: 16 + Math.sin(i * 0.8) * 14,
                background: ['#F59E0B', '#8B5CF6', '#EC4899', '#22C55E'][i % 4],
                opacity: i < 8 ? 1 : 0.3,
                animation: `pulse ${1.5 + i * 0.2}s ease-in-out infinite alternate`,
              }
            })
          )
        ),
        React.createElement('div', {
          style: { display: 'flex', alignItems: 'center', gap: 6, marginTop: 12 }
        },
          React.createElement('span', {
            style: { fontSize: 13, color: 'rgba(255,255,255,0.8)', fontFamily: font }
          }, 'Tap to explore your tapestry'),
          React.createElement(Icon, { name: 'ChevronRight', size: 14, color: 'rgba(255,255,255,0.8)' })
        )
      ),

      // Weekly Weave Section
      React.createElement('div', {
        style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }
      },
        React.createElement('h2', {
          style: { fontSize: 22, fontWeight: 700, color: t.text, letterSpacing: -0.3, fontFamily: font }
        }, 'Weekly Weaves'),
        React.createElement('span', {
          style: { fontSize: 13, fontWeight: 600, color: t.primary, fontFamily: font, cursor: 'pointer' }
        }, 'See all')
      ),

      ...weeklyWeaves.map((weave, idx) =>
        React.createElement('div', {
          key: weave.id,
          onClick: () => setActiveWeave(weave),
          style: {
            background: t.card, borderRadius: 16, padding: 16, marginBottom: 12,
            border: `1px solid ${t.border}`, cursor: 'pointer',
            boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
            transition: 'all 0.2s ease', display: 'flex', gap: 14, alignItems: 'center',
            animation: animateIn ? `slideUp 0.4s ease ${idx * 0.1}s both` : 'none',
          }
        },
          React.createElement('div', {
            style: {
              width: 52, height: 52, borderRadius: 14,
              background: `${weave.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }
          },
            React.createElement(Icon, { name: weave.icon, size: 24, color: weave.color })
          ),
          React.createElement('div', { style: { flex: 1, minWidth: 0 } },
            React.createElement('div', {
              style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }
            },
              React.createElement('span', {
                style: { fontSize: 17, fontWeight: 600, color: t.text, fontFamily: font }
              }, weave.title),
              React.createElement('span', {
                style: {
                  fontSize: 11, fontWeight: 700, color: weave.color, fontFamily: font,
                  background: `${weave.color}15`, padding: '3px 8px', borderRadius: 6,
                  textTransform: 'uppercase', letterSpacing: 0.5,
                }
              }, weave.domain)
            ),
            React.createElement('div', {
              style: { fontSize: 13, color: t.textMuted, fontFamily: font, marginBottom: 8 }
            }, `${weave.progress}/${weave.total} facts discovered`),
            React.createElement('div', {
              style: { height: 4, borderRadius: 2, background: `${weave.color}20`, overflow: 'hidden' }
            },
              React.createElement('div', {
                style: {
                  height: '100%', borderRadius: 2, background: weave.color,
                  width: `${(weave.progress / weave.total) * 100}%`,
                  transition: 'width 0.6s ease',
                }
              })
            )
          )
        )
      ),

      // Active Weave Modal
      activeWeave && React.createElement('div', {
        onClick: (e) => { if (e.target === e.currentTarget) { setActiveWeave(null); setQuizAnswer(null); setShowQuizResult(false); } },
        style: {
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.5)', zIndex: 100,
          display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
          animation: 'fadeIn 0.2s ease',
        }
      },
        React.createElement('div', {
          style: {
            background: t.bg, borderRadius: '24px 24px 0 0', width: '100%',
            maxHeight: '85%', overflow: 'auto', padding: '8px 20px 32px',
            animation: 'slideUp 0.3s ease',
          }
        },
          React.createElement('div', {
            style: { width: 36, height: 4, borderRadius: 2, background: t.border, margin: '8px auto 20px' }
          }),
          React.createElement('div', {
            style: { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }
          },
            React.createElement('div', {
              style: {
                width: 48, height: 48, borderRadius: 14,
                background: `${activeWeave.color}18`, display: 'flex',
                alignItems: 'center', justifyContent: 'center',
              }
            },
              React.createElement(Icon, { name: activeWeave.icon, size: 24, color: activeWeave.color })
            ),
            React.createElement('div', null,
              React.createElement('h3', {
                style: { fontSize: 22, fontWeight: 700, color: t.text, fontFamily: font }
              }, activeWeave.title),
              React.createElement('span', {
                style: { fontSize: 15, color: t.textMuted, fontFamily: font }
              }, `${activeWeave.domain} \u2022 Week 12`)
            )
          ),
          ...activeWeave.facts.map((fact, fi) => {
            const isCompleted = fi < activeWeave.progress;
            const isQuiz = fact.options;
            const isCurrent = fi === activeWeave.progress;
            return React.createElement('div', {
              key: fi,
              style: {
                background: isCompleted ? `${activeWeave.color}08` : t.card,
                borderRadius: 14, padding: 16, marginBottom: 10,
                border: `1px solid ${isCurrent ? activeWeave.color : t.border}`,
                opacity: fi > activeWeave.progress ? 0.5 : 1,
                boxShadow: isCurrent ? `0 0 0 2px ${activeWeave.color}30` : 'none',
              }
            },
              React.createElement('div', {
                style: { display: 'flex', alignItems: 'flex-start', gap: 12 }
              },
                React.createElement('div', {
                  style: {
                    width: 28, height: 28, borderRadius: 14, flexShrink: 0,
                    background: isCompleted ? activeWeave.color : `${activeWeave.color}20`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }
                },
                  isCompleted
                    ? React.createElement(Icon, { name: 'Check', size: 14, color: '#FFF' })
                    : React.createElement('span', {
                      style: { fontSize: 13, fontWeight: 700, color: activeWeave.color, fontFamily: font }
                    }, fi + 1)
                ),
                React.createElement('div', { style: { flex: 1 } },
                  React.createElement('div', {
                    style: { fontSize: 15, fontWeight: 600, color: t.text, fontFamily: font, lineHeight: 1.4 }
                  }, isQuiz ? fact.q : fact.q),
                  isCompleted && !isQuiz && React.createElement('div', {
                    style: { fontSize: 13, color: t.textMuted, fontFamily: font, marginTop: 6 }
                  }, fact.detail),
                  isQuiz && isCurrent && React.createElement('div', { style: { marginTop: 12 } },
                    ...fact.options.map((opt, oi) =>
                      React.createElement('div', {
                        key: oi,
                        onClick: (e) => {
                          e.stopPropagation();
                          if (!showQuizResult) {
                            setQuizAnswer(oi);
                            setShowQuizResult(true);
                          }
                        },
                        style: {
                          padding: '12px 14px', borderRadius: 10, marginBottom: 8, cursor: 'pointer',
                          background: showQuizResult
                            ? oi === fact.answer ? `${t.cta}18` : oi === quizAnswer ? `${t.danger}15` : t.surface
                            : quizAnswer === oi ? `${activeWeave.color}12` : t.surface,
                          border: `1.5px solid ${
                            showQuizResult
                              ? oi === fact.answer ? t.cta : oi === quizAnswer ? t.danger : t.border
                              : quizAnswer === oi ? activeWeave.color : t.border
                          }`,
                          fontSize: 15, fontFamily: font, color: t.text,
                          transition: 'all 0.2s ease', display: 'flex', alignItems: 'center', gap: 10,
                        }
                      },
                        React.createElement('div', {
                          style: {
                            width: 22, height: 22, borderRadius: 11, flexShrink: 0,
                            border: `2px solid ${
                              showQuizResult
                                ? oi === fact.answer ? t.cta : oi === quizAnswer ? t.danger : t.border
                                : quizAnswer === oi ? activeWeave.color : t.border
                            }`,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            background: (showQuizResult && oi === fact.answer) ? t.cta : 'transparent',
                          }
                        },
                          showQuizResult && oi === fact.answer && React.createElement(Icon, { name: 'Check', size: 12, color: '#FFF' }),
                          showQuizResult && oi === quizAnswer && oi !== fact.answer && React.createElement(Icon, { name: 'X', size: 12, color: t.danger })
                        ),
                        opt
                      )
                    )
                  )
                )
              )
            );
          })
        )
      )
    );
  };

  // ============ TAPESTRY SCREEN ============
  const TapestryScreen = () => {
    return React.createElement('div', {
      style: { padding: '20px 16px 24px', animation: animateIn ? 'fadeIn 0.4s ease' : 'none' }
    },
      React.createElement('div', {
        style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }
      },
        React.createElement('h1', {
          style: { fontSize: 34, fontWeight: 800, color: t.text, letterSpacing: -0.5, fontFamily: font }
        }, 'My Tapestry'),
        React.createElement('div', {
          style: { display: 'flex', gap: 8 }
        },
          React.createElement('div', {
            onClick: () => setTapestryZoom(!tapestryZoom),
            style: {
              width: 44, height: 44, borderRadius: 22, background: t.card,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: `1px solid ${t.border}`, cursor: 'pointer',
            }
          },
            React.createElement(Icon, { name: tapestryZoom ? 'ZoomOut' : 'ZoomIn', size: 20, color: t.primary })
          )
        )
      ),

      // Stats row
      React.createElement('div', {
        style: { display: 'flex', gap: 10, marginBottom: 20 }
      },
        ...[
          { label: 'Threads', value: '8', icon: 'Sparkles', color: t.primary },
          { label: 'Domains', value: '3', icon: 'Layers', color: t.purple },
          { label: 'Streak', value: '12d', icon: 'Flame', color: '#F59E0B' },
        ].map((stat) =>
          React.createElement('div', {
            key: stat.label,
            style: {
              flex: 1, background: t.card, borderRadius: 14, padding: '14px 12px',
              border: `1px solid ${t.border}`, textAlign: 'center',
            }
          },
            React.createElement(Icon, { name: stat.icon, size: 18, color: stat.color, style: { margin: '0 auto 6px', display: 'block' } }),
            React.createElement('div', {
              style: { fontSize: 22, fontWeight: 800, color: t.text, fontFamily: font }
            }, stat.value),
            React.createElement('div', {
              style: { fontSize: 11, fontWeight: 600, color: t.textMuted, fontFamily: font, textTransform: 'uppercase', letterSpacing: 0.5 }
            }, stat.label)
          )
        )
      ),

      // Tapestry Canvas
      React.createElement('div', {
        style: {
          background: isDark ? '#0A1929' : '#F8FFFE',
          borderRadius: 20, padding: 4, marginBottom: 20,
          border: `2px solid ${t.border}`,
          boxShadow: `0 4px 24px ${isDark ? 'rgba(0,0,0,0.3)' : 'rgba(8,145,178,0.1)'}`,
          position: 'relative', height: tapestryZoom ? 360 : 280,
          overflow: 'hidden', transition: 'height 0.4s ease',
        }
      },
        // Background weave pattern
        ...[...Array(8)].map((_, i) =>
          React.createElement('div', {
            key: `line-${i}`,
            style: {
              position: 'absolute',
              left: 0, right: 0,
              top: `${12 + i * 12}%`,
              height: 1,
              background: `${t.border}`,
              opacity: 0.5,
              transform: `rotate(${i % 2 === 0 ? 2 : -2}deg)`,
            }
          })
        ),
        // Connecting lines between threads
        React.createElement('svg', {
          style: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }
        },
          ...[[0, 1], [0, 2], [1, 6], [2, 3], [3, 5], [4, 7], [5, 4]].map(([a, b], i) => {
            const ta = tapestryThreads[a];
            const tb = tapestryThreads[b];
            return React.createElement('line', {
              key: `conn-${i}`,
              x1: `${ta.x}%`, y1: `${ta.y}%`,
              x2: `${tb.x}%`, y2: `${tb.y}%`,
              stroke: ta.color, strokeWidth: 1.5, opacity: 0.25,
              strokeDasharray: '4 4',
            });
          })
        ),
        // Thread nodes
        ...tapestryThreads.map((thread) =>
          React.createElement('div', {
            key: thread.id,
            onClick: () => setSelectedThread(selectedThread?.id === thread.id ? null : thread),
            style: {
              position: 'absolute',
              left: `${thread.x}%`, top: `${thread.y}%`,
              transform: 'translate(-50%, -50%)',
              width: tapestryZoom ? thread.size * 1.4 : thread.size,
              height: tapestryZoom ? thread.size * 1.4 : thread.size,
              borderRadius: '50%',
              background: `radial-gradient(circle at 35% 35%, ${thread.color}DD, ${thread.color})`,
              boxShadow: selectedThread?.id === thread.id
                ? `0 0 0 3px ${thread.color}40, 0 4px 16px ${thread.color}50`
                : `0 2px 8px ${thread.color}30`,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              animation: `pulse ${2 + thread.id * 0.3}s ease-in-out infinite alternate`,
              zIndex: selectedThread?.id === thread.id ? 10 : 1,
            }
          })
        ),
      ),

      // Thread Detail
      selectedThread && React.createElement('div', {
        style: {
          background: t.card, borderRadius: 16, padding: 16, marginBottom: 16,
          border: `2px solid ${selectedThread.color}40`,
          animation: 'slideUp 0.3s ease',
          boxShadow: `0 4px 16px ${selectedThread.color}15`,
        }
      },
        React.createElement('div', {
          style: { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }
        },
          React.createElement('div', {
            style: {
              width: 40, height: 40, borderRadius: 20,
              background: `${selectedThread.color}20`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }
          },
            React.createElement('div', {
              style: { width: 16, height: 16, borderRadius: 8, background: selectedThread.color }
            })
          ),
          React.createElement('div', null,
            React.createElement('div', {
              style: { fontSize: 17, fontWeight: 700, color: t.text, fontFamily: font }
            }, selectedThread.label),
            React.createElement('span', {
              style: { fontSize: 13, color: selectedThread.color, fontWeight: 600, fontFamily: font }
            }, selectedThread.domain)
          ),
          React.createElement('div', {
            onClick: () => setSelectedThread(null),
            style: { marginLeft: 'auto', cursor: 'pointer', padding: 8 }
          },
            React.createElement(Icon, { name: 'X', size: 18, color: t.textMuted })
          )
        ),
        React.createElement('div', {
          style: { fontSize: 15, color: t.textSecondary, fontFamily: font, lineHeight: 1.5 }
        }, `This thread was woven when you discovered a fascinating fact about ${selectedThread.label}. It connects to ${Math.floor(Math.random() * 3 + 1)} other threads in your tapestry.`)
      ),

      // Domain Legend
      React.createElement('div', {
        style: { display: 'flex', gap: 12, flexWrap: 'wrap' }
      },
        ...['History', 'Science', 'Arts'].map((domain) => {
          const colors = { History: '#F59E0B', Science: '#8B5CF6', Arts: '#EC4899' };
          const count = tapestryThreads.filter(t => t.domain === domain).length;
          return React.createElement('div', {
            key: domain,
            style: {
              display: 'flex', alignItems: 'center', gap: 8,
              background: t.card, borderRadius: 10, padding: '8px 14px',
              border: `1px solid ${t.border}`,
            }
          },
            React.createElement('div', {
              style: { width: 10, height: 10, borderRadius: 5, background: colors[domain] }
            }),
            React.createElement('span', {
              style: { fontSize: 13, fontWeight: 600, color: t.text, fontFamily: font }
            }, `${domain} (${count})`)
          );
        })
      )
    );
  };

  // ============ GUILDS SCREEN ============
  const GuildsScreen = () => {
    return React.createElement('div', {
      style: { padding: '20px 16px 24px', animation: animateIn ? 'fadeIn 0.4s ease' : 'none' }
    },
      React.createElement('h1', {
        style: { fontSize: 34, fontWeight: 800, color: t.text, letterSpacing: -0.5, fontFamily: font, marginBottom: 6 }
      }, 'Pattern Guilds'),
      React.createElement('p', {
        style: { fontSize: 15, color: t.textMuted, fontFamily: font, marginBottom: 24, lineHeight: 1.4 }
      }, 'Join communities of fellow weavers who share your intellectual passions.'),

      // Featured Guild
      !activeGuild && React.createElement('div', {
        onClick: () => setActiveGuild(guilds[1]),
        style: {
          background: `linear-gradient(135deg, ${guilds[1].color}20, ${guilds[1].color}08)`,
          borderRadius: 20, padding: 20, marginBottom: 20, cursor: 'pointer',
          border: `1.5px solid ${guilds[1].color}30`,
          position: 'relative', overflow: 'hidden',
        }
      },
        React.createElement('div', {
          style: {
            position: 'absolute', top: -10, right: -10, width: 80, height: 80,
            borderRadius: '50%', background: `${guilds[1].color}10`,
          }
        }),
        React.createElement('div', {
          style: {
            fontSize: 11, fontWeight: 700, color: guilds[1].color, fontFamily: font,
            textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 10,
          }
        }, 'Featured Guild'),
        React.createElement('div', {
          style: { display: 'flex', alignItems: 'center', gap: 12 }
        },
          React.createElement('div', {
            style: {
              width: 52, height: 52, borderRadius: 16,
              background: `${guilds[1].color}20`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }
          },
            React.createElement(Icon, { name: guilds[1].icon, size: 26, color: guilds[1].color })
          ),
          React.createElement('div', null,
            React.createElement('div', {
              style: { fontSize: 17, fontWeight: 700, color: t.text, fontFamily: font }
            }, guilds[1].name),
            React.createElement('div', {
              style: { fontSize: 13, color: t.textMuted, fontFamily: font, marginTop: 2 }
            }, `${guilds[1].members.toLocaleString()} weavers \u2022 ${guilds[1].threads.toLocaleString()} threads`)
          )
        )
      ),

      // Guild List
      ...guilds.map((guild, idx) =>
        React.createElement('div', {
          key: guild.id,
          onClick: () => setActiveGuild(activeGuild?.id === guild.id ? null : guild),
          style: {
            background: activeGuild?.id === guild.id ? `${guild.color}08` : t.card,
            borderRadius: 16, padding: 16, marginBottom: 12,
            border: `1px solid ${activeGuild?.id === guild.id ? guild.color + '40' : t.border}`,
            cursor: 'pointer', transition: 'all 0.2s ease',
            animation: animateIn ? `slideUp 0.4s ease ${idx * 0.08}s both` : 'none',
          }
        },
          React.createElement('div', {
            style: { display: 'flex', alignItems: 'center', gap: 14 }
          },
            React.createElement('div', {
              style: {
                width: 48, height: 48, borderRadius: 14,
                background: `${guild.color}15`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }
            },
              React.createElement(Icon, { name: guild.icon, size: 22, color: guild.color })
            ),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', {
                style: { fontSize: 17, fontWeight: 600, color: t.text, fontFamily: font, marginBottom: 3 }
              }, guild.name),
              React.createElement('div', {
                style: { fontSize: 13, color: t.textMuted, fontFamily: font }
              }, guild.desc),
            ),
            React.createElement(Icon, { name: 'ChevronRight', size: 18, color: t.textMuted })
          ),
          // Expanded detail
          activeGuild?.id === guild.id && React.createElement('div', {
            style: {
              marginTop: 16, paddingTop: 16, borderTop: `1px solid ${t.border}`,
              animation: 'fadeIn 0.3s ease',
            }
          },
            React.createElement('div', {
              style: { display: 'flex', gap: 10, marginBottom: 16 }
            },
              ...[
                { label: 'Members', value: guild.members.toLocaleString(), icon: 'Users' },
                { label: 'Threads', value: guild.threads.toLocaleString(), icon: 'Sparkles' },
              ].map((s) =>
                React.createElement('div', {
                  key: s.label,
                  style: {
                    flex: 1, background: t.surface, borderRadius: 12, padding: '12px 10px',
                    textAlign: 'center', border: `1px solid ${t.border}`,
                  }
                },
                  React.createElement(Icon, { name: s.icon, size: 16, color: guild.color, style: { margin: '0 auto 4px', display: 'block' } }),
                  React.createElement('div', {
                    style: { fontSize: 17, fontWeight: 700, color: t.text, fontFamily: font }
                  }, s.value),
                  React.createElement('div', {
                    style: { fontSize: 11, color: t.textMuted, fontFamily: font, textTransform: 'uppercase' }
                  }, s.label)
                )
              )
            ),
            React.createElement('div', {
              style: { fontSize: 13, fontWeight: 600, color: t.textMuted, fontFamily: font, marginBottom: 10, textTransform: 'uppercase', letterSpacing: 0.5 }
            }, 'Recent Activity'),
            ...['Weaver Astra shared a Nebula Thread', 'New challenge: Name that constellation', 'Guild reached 5,000 collective threads'].map((activity, i) =>
              React.createElement('div', {
                key: i,
                style: {
                  display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0',
                  borderBottom: i < 2 ? `1px solid ${t.border}` : 'none',
                }
              },
                React.createElement('div', {
                  style: { width: 6, height: 6, borderRadius: 3, background: guild.color, flexShrink: 0 }
                }),
                React.createElement('span', {
                  style: { fontSize: 14, color: t.textSecondary, fontFamily: font }
                }, activity)
              )
            ),
            React.createElement('div', {
              onClick: (e) => e.stopPropagation(),
              style: {
                marginTop: 16, padding: '14px 0', borderRadius: 14,
                background: guild.color, textAlign: 'center', cursor: 'pointer',
                fontSize: 15, fontWeight: 700, color: '#FFF', fontFamily: font,
                transition: 'opacity 0.2s ease',
              }
            }, 'Join Guild')
          )
        )
      )
    );
  };

  // ============ EVENTS SCREEN ============
  const EventsScreen = () => {
    return React.createElement('div', {
      style: { padding: '20px 16px 24px', animation: animateIn ? 'fadeIn 0.4s ease' : 'none' }
    },
      React.createElement('h1', {
        style: { fontSize: 34, fontWeight: 800, color: t.text, letterSpacing: -0.5, fontFamily: font, marginBottom: 6 }
      }, 'Seasonal Loom'),
      React.createElement('p', {
        style: { fontSize: 15, color: t.textMuted, fontFamily: font, marginBottom: 24, lineHeight: 1.4 }
      }, 'Limited-time grand challenges with exclusive super threads.'),

      ...seasonalEvents.map((event, idx) =>
        React.createElement('div', {
          key: event.id,
          style: {
            background: t.card, borderRadius: 20, marginBottom: 16,
            border: `1px solid ${t.border}`, overflow: 'hidden',
            boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
            animation: animateIn ? `slideUp 0.4s ease ${idx * 0.1}s both` : 'none',
          }
        },
          // Header banner
          React.createElement('div', {
            style: {
              background: `linear-gradient(135deg, ${event.color}, ${event.color}CC)`,
              padding: '20px 18px 16px', position: 'relative', overflow: 'hidden',
            }
          },
            React.createElement('div', {
              style: {
                position: 'absolute', top: -20, right: -20, width: 100, height: 100,
                borderRadius: '50%', background: 'rgba(255,255,255,0.1)',
              }
            }),
            React.createElement('div', {
              style: {
                position: 'absolute', bottom: -15, left: 30, width: 60, height: 60,
                borderRadius: '50%', background: 'rgba(255,255,255,0.06)',
              }
            }),
            React.createElement('div', {
              style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }
            },
              React.createElement('div', null,
                React.createElement('div', {
                  style: { fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.8)', textTransform: 'uppercase', letterSpacing: 1.2, fontFamily: font, marginBottom: 6 }
                }, event.subtitle),
                React.createElement('div', {
                  style: { fontSize: 22, fontWeight: 800, color: '#FFF', fontFamily: font }
                }, event.title),
              ),
              React.createElement('div', {
                style: {
                  width: 44, height: 44, borderRadius: 14,
                  background: 'rgba(255,255,255,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }
              },
                React.createElement(Icon, { name: event.icon, size: 22, color: '#FFF' })
              )
            )
          ),
          // Content
          React.createElement('div', { style: { padding: '16px 18px 18px' } },
            React.createElement('p', {
              style: { fontSize: 15, color: t.textSecondary, fontFamily: font, lineHeight: 1.5, marginBottom: 16 }
            }, event.desc),
            // Progress
            React.createElement('div', {
              style: { marginBottom: 16 }
            },
              React.createElement('div', {
                style: { display: 'flex', justifyContent: 'space-between', marginBottom: 6 }
              },
                React.createElement('span', {
                  style: { fontSize: 13, fontWeight: 600, color: t.text, fontFamily: font }
                }, `${event.progress}% Complete`),
                React.createElement('span', {
                  style: { fontSize: 13, color: t.textMuted, fontFamily: font }
                }, `${event.daysLeft} days left`)
              ),
              React.createElement('div', {
                style: { height: 6, borderRadius: 3, background: `${event.color}15`, overflow: 'hidden' }
              },
                React.createElement('div', {
                  style: {
                    height: '100%', borderRadius: 3,
                    background: `linear-gradient(90deg, ${event.color}, ${event.color}CC)`,
                    width: `${event.progress}%`, transition: 'width 0.8s ease',
                  }
                })
              )
            ),
            // Reward & Stats
            React.createElement('div', {
              style: { display: 'flex', gap: 10 }
            },
              React.createElement('div', {
                style: {
                  flex: 1, background: `${event.color}08`, borderRadius: 12, padding: '12px 10px',
                  border: `1px solid ${event.color}20`, display: 'flex', alignItems: 'center', gap: 8,
                }
              },
                React.createElement(Icon, { name: 'Gift', size: 16, color: event.color }),
                React.createElement('div', null,
                  React.createElement('div', {
                    style: { fontSize: 11, color: t.textMuted, fontFamily: font, textTransform: 'uppercase' }
                  }, 'Reward'),
                  React.createElement('div', {
                    style: { fontSize: 13, fontWeight: 600, color: t.text, fontFamily: font }
                  }, event.reward)
                )
              ),
              React.createElement('div', {
                style: {
                  background: t.surface, borderRadius: 12, padding: '12px 14px',
                  border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', gap: 8,
                }
              },
                React.createElement(Icon, { name: 'Users', size: 16, color: t.textMuted }),
                React.createElement('span', {
                  style: { fontSize: 13, fontWeight: 600, color: t.text, fontFamily: font }
                }, event.participants.toLocaleString())
              )
            ),
            // CTA
            React.createElement('div', {
              style: {
                marginTop: 14, padding: '14px 0', borderRadius: 14,
                background: event.progress > 0 ? `${event.color}15` : event.color,
                textAlign: 'center', cursor: 'pointer',
                fontSize: 15, fontWeight: 700,
                color: event.progress > 0 ? event.color : '#FFF',
                fontFamily: font, transition: 'all 0.2s ease',
                border: event.progress > 0 ? `1.5px solid ${event.color}30` : 'none',
              }
            }, event.progress > 0 ? 'Continue Weaving' : 'Begin Challenge')
          )
        )
      )
    );
  };

  // ============ PROFILE SCREEN ============
  const ProfileScreen = () => {
    const stats = [
      { label: 'Threads', value: '8', icon: 'Sparkles' },
      { label: 'Weaves', value: '4', icon: 'BookOpen' },
      { label: 'Streak', value: '12', icon: 'Flame' },
      { label: 'Guilds', value: '2', icon: 'Users' },
    ];
    const achievements = [
      { name: 'First Thread', desc: 'Wove your first thread', icon: 'Award', unlocked: true },
      { name: 'Curious Mind', desc: 'Completed 3 weaves', icon: 'Brain', unlocked: true },
      { name: 'Guild Member', desc: 'Joined a Pattern Guild', icon: 'Shield', unlocked: true },
      { name: 'Loom Master', desc: 'Complete 10 weaves', icon: 'Crown', unlocked: false },
      { name: 'Tapestry Sage', desc: 'Weave 50 threads', icon: 'Gem', unlocked: false },
    ];

    return React.createElement('div', {
      style: { padding: '20px 16px 24px', animation: animateIn ? 'fadeIn 0.4s ease' : 'none' }
    },
      // Profile Header
      React.createElement('div', {
        style: { textAlign: 'center', marginBottom: 28 }
      },
        React.createElement('div', {
          style: {
            width: 80, height: 80, borderRadius: 40, margin: '0 auto 14px',
            background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: `0 4px 20px ${t.primary}30`,
          }
        },
          React.createElement(Icon, { name: 'User', size: 36, color: '#FFF' })
        ),
        React.createElement('h1', {
          style: { fontSize: 22, fontWeight: 800, color: t.text, fontFamily: font, marginBottom: 4 }
        }, 'Knowledge Weaver'),
        React.createElement('div', {
          style: { fontSize: 15, color: t.textMuted, fontFamily: font }
        }, 'Level 4 \u2022 Joined March 2026'),
        // Theme toggle
        React.createElement('div', {
          onClick: () => setIsDark(!isDark),
          style: {
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: t.card, borderRadius: 20, padding: '8px 16px',
            border: `1px solid ${t.border}`, cursor: 'pointer', marginTop: 14,
            transition: 'all 0.2s ease',
          }
        },
          React.createElement(Icon, { name: isDark ? 'Sun' : 'Moon', size: 16, color: t.primary }),
          React.createElement('span', {
            style: { fontSize: 13, fontWeight: 600, color: t.text, fontFamily: font }
          }, isDark ? 'Light Mode' : 'Dark Mode')
        )
      ),

      // Stats Grid
      React.createElement('div', {
        style: {
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 24,
        }
      },
        ...stats.map((stat, i) =>
          React.createElement('div', {
            key: stat.label,
            style: {
              background: t.card, borderRadius: 16, padding: '16px 14px',
              border: `1px solid ${t.border}`, textAlign: 'center',
              animation: animateIn ? `slideUp 0.4s ease ${i * 0.06}s both` : 'none',
            }
          },
            React.createElement(Icon, { name: stat.icon, size: 20, color: t.primary, style: { margin: '0 auto 8px', display: 'block' } }),
            React.createElement('div', {
              style: { fontSize: 28, fontWeight: 800, color: t.text, fontFamily: font }
            }, stat.value),
            React.createElement('div', {
              style: { fontSize: 13, color: t.textMuted, fontFamily: font, fontWeight: 500 }
            }, stat.label)
          )
        )
      ),

      // Achievements
      React.createElement('h2', {
        style: { fontSize: 22, fontWeight: 700, color: t.text, fontFamily: font, marginBottom: 14, letterSpacing: -0.3 }
      }, 'Achievements'),
      ...achievements.map((ach, idx) =>
        React.createElement('div', {
          key: ach.name,
          style: {
            display: 'flex', alignItems: 'center', gap: 14, padding: '14px 0',
            borderBottom: idx < achievements.length - 1 ? `1px solid ${t.border}` : 'none',
            opacity: ach.unlocked ? 1 : 0.45,
          }
        },
          React.createElement('div', {
            style: {
              width: 44, height: 44, borderRadius: 14,
              background: ach.unlocked ? `${t.gold}18` : t.surface,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: ach.unlocked ? `1.5px solid ${t.gold}30` : `1px solid ${t.border}`,
            }
          },
            React.createElement(Icon, { name: ach.icon, size: 20, color: ach.unlocked ? t.gold : t.textMuted })
          ),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', {
              style: { fontSize: 15, fontWeight: 600, color: t.text, fontFamily: font }
            }, ach.name),
            React.createElement('div', {
              style: { fontSize: 13, color: t.textMuted, fontFamily: font }
            }, ach.desc)
          ),
          ach.unlocked && React.createElement(Icon, { name: 'CheckCircle', size: 20, color: t.cta })
        )
      ),

      // Settings links
      React.createElement('div', { style: { marginTop: 24 } },
        ...['Notification Preferences', 'Privacy Settings', 'Help & Feedback'].map((item, i) =>
          React.createElement('div', {
            key: item,
            style: {
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '16px 0', cursor: 'pointer',
              borderBottom: i < 2 ? `1px solid ${t.border}` : 'none',
            }
          },
            React.createElement('span', {
              style: { fontSize: 15, color: t.text, fontFamily: font }
            }, item),
            React.createElement(Icon, { name: 'ChevronRight', size: 18, color: t.textMuted })
          )
        )
      )
    );
  };

  // ============ NAVIGATION ============
  const screens = { home: HomeScreen, tapestry: TapestryScreen, guilds: GuildsScreen, events: EventsScreen, profile: ProfileScreen };
  const navItems = [
    { id: 'home', label: 'Home', icon: 'Home' },
    { id: 'tapestry', label: 'Tapestry', icon: 'Sparkles' },
    { id: 'guilds', label: 'Guilds', icon: 'Users' },
    { id: 'events', label: 'Events', icon: 'Calendar' },
    { id: 'profile', label: 'Profile', icon: 'User' },
  ];

  return React.createElement('div', {
    style: {
      minHeight: '100vh', background: '#f0f0f0',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '20px 0', fontFamily: font,
    }
  },
    React.createElement('style', null, `
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes slideUp {
        from { opacity: 0; transform: translateY(16px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes pulse {
        from { transform: translate(-50%, -50%) scale(1); }
        to { transform: translate(-50%, -50%) scale(1.08); }
      }
      @keyframes shimmer {
        0% { background-position: -200px 0; }
        100% { background-position: 200px 0; }
      }
      * { box-sizing: border-box; margin: 0; padding: 0; }
      ::-webkit-scrollbar { width: 0; height: 0; }
    `),
    React.createElement('div', {
      style: {
        width: 375, height: 812, borderRadius: 44, overflow: 'hidden',
        background: t.bg, position: 'relative',
        boxShadow: '0 20px 60px rgba(0,0,0,0.2), 0 0 0 1px rgba(0,0,0,0.08)',
        display: 'flex', flexDirection: 'column',
      }
    },
      // Scrollable content
      React.createElement('div', {
        style: {
          flex: 1, overflowY: 'auto', overflowX: 'hidden',
          paddingTop: 12, paddingBottom: 8,
          WebkitOverflowScrolling: 'touch',
        }
      },
        React.createElement(screens[activeScreen])
      ),
      // Bottom Tab Bar
      React.createElement('div', {
        style: {
          background: t.navBg, borderTop: `1px solid ${t.navBorder}`,
          display: 'flex', padding: '8px 4px 28px',
          boxShadow: '0 -2px 12px rgba(0,0,0,0.04)',
        }
      },
        ...navItems.map((item) => {
          const isActive = activeScreen === item.id;
          return React.createElement('div', {
            key: item.id,
            onClick: () => {
              setActiveScreen(item.id);
              setActiveWeave(null);
              setSelectedThread(null);
              setActiveGuild(null);
              setQuizAnswer(null);
              setShowQuizResult(false);
            },
            style: {
              flex: 1, display: 'flex', flexDirection: 'column',
              alignItems: 'center', gap: 4, cursor: 'pointer',
              padding: '4px 0', transition: 'all 0.2s ease',
              minHeight: 44,
            }
          },
            React.createElement(Icon, {
              name: item.icon, size: 22,
              color: isActive ? t.primary : t.textMuted,
            }),
            React.createElement('span', {
              style: {
                fontSize: 10, fontWeight: isActive ? 700 : 500,
                color: isActive ? t.primary : t.textMuted,
                fontFamily: font,
              }
            }, item.label)
          );
        })
      )
    )
  );
}
