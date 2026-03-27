const { useState, useEffect, useRef } = React;

function App() {
  const styleTag = React.createElement('style', { dangerouslySetInnerHTML: { __html: `
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    ::-webkit-scrollbar { width: 0; }
    @keyframes pulseRing {
      0% { transform: scale(0.95); opacity: 0.8; }
      70% { transform: scale(1.1); opacity: 0; }
      100% { transform: scale(0.95); opacity: 0; }
    }
    @keyframes shimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(8px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    @keyframes gradientShift {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    .fade-in { animation: fadeIn 0.3s ease forwards; }
    .dna-bar { transition: width 1s ease; }
  ` } });

  const themes = {
    dark: {
      bg: '#080810',
      surface: '#10101E',
      surfaceAlt: '#16162A',
      card: '#1A1A30',
      cardHover: '#20203A',
      border: '#2A2A4A',
      borderLight: '#1E1E38',
      primary: '#8B5CF6',
      primaryDark: '#6D28D9',
      primaryLight: '#A78BFA',
      accent: '#22D3EE',
      accentDark: '#0891B2',
      gradient: 'linear-gradient(135deg, #8B5CF6, #22D3EE)',
      gradientSoft: 'linear-gradient(135deg, rgba(139,92,246,0.15), rgba(34,211,238,0.15))',
      text: '#F1F0FF',
      textMuted: '#8B8AAA',
      textDim: '#5A5A7A',
      success: '#10B981',
      warning: '#F59E0B',
      error: '#EF4444',
      pink: '#EC4899',
      orange: '#F97316',
    },
    light: {
      bg: '#F0EFF8',
      surface: '#FFFFFF',
      surfaceAlt: '#F7F6FF',
      card: '#FFFFFF',
      cardHover: '#F0EFFE',
      border: '#E4E2F5',
      borderLight: '#EAE8FF',
      primary: '#7C3AED',
      primaryDark: '#5B21B6',
      primaryLight: '#8B5CF6',
      accent: '#0891B2',
      accentDark: '#0E7490',
      gradient: 'linear-gradient(135deg, #7C3AED, #0891B2)',
      gradientSoft: 'linear-gradient(135deg, rgba(124,58,237,0.1), rgba(8,145,178,0.1))',
      text: '#1A1830',
      textMuted: '#6B6890',
      textDim: '#9B98B8',
      success: '#059669',
      warning: '#D97706',
      error: '#DC2626',
      pink: '#DB2777',
      orange: '#EA580C',
    }
  };

  const [themeKey, setThemeKey] = useState('dark');
  const [activeTab, setActiveTab] = useState('home');
  const [pressedTab, setPressedTab] = useState(null);

  const t = themes[themeKey];

  const tabs = [
    { id: 'home', label: 'Home', icon: window.lucide.Home },
    { id: 'studio', label: 'Studio', icon: window.lucide.Layers },
    { id: 'explore', label: 'Explore', icon: window.lucide.Compass },
    { id: 'challenges', label: 'Challenges', icon: window.lucide.Trophy },
    { id: 'profile', label: 'Profile', icon: window.lucide.User },
  ];

  // ── Status Bar ──────────────────────────────────────────────────────────────
  function StatusBar() {
    return React.createElement('div', {
      style: {
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '10px 20px 4px',
        fontFamily: 'Space Grotesk', fontSize: 12, fontWeight: 600,
        color: t.text, zIndex: 10,
      }
    },
      React.createElement('span', null, '9:41'),
      React.createElement('div', {
        style: {
          width: 120, height: 28, background: themeKey === 'dark' ? '#000' : '#111',
          borderRadius: 14, margin: '0 auto',
          position: 'absolute', left: '50%', transform: 'translateX(-50%)',
          top: 8,
        }
      }),
      React.createElement('div', { style: { display: 'flex', gap: 5, alignItems: 'center' } },
        React.createElement(window.lucide.Wifi, { size: 13, color: t.text }),
        React.createElement(window.lucide.Signal, { size: 13, color: t.text }),
        React.createElement('div', {
          style: {
            width: 22, height: 11, border: `1.5px solid ${t.text}`,
            borderRadius: 3, position: 'relative', display: 'flex', alignItems: 'center', padding: '0 2px',
          }
        },
          React.createElement('div', { style: { width: '70%', height: 6, background: t.success, borderRadius: 1.5 } }),
          React.createElement('div', {
            style: {
              width: 2, height: 5, background: t.text, borderRadius: 1,
              position: 'absolute', right: -4, top: '50%', transform: 'translateY(-50%)',
            }
          })
        )
      )
    );
  }

  // ── Home Screen ─────────────────────────────────────────────────────────────
  function HomeScreen() {
    const [dnaAnimated, setDnaAnimated] = useState(false);
    useEffect(() => { setTimeout(() => setDnaAnimated(true), 200); }, []);

    const dnaData = [
      { topic: 'Physics', pct: 82, color: t.primary },
      { topic: 'History', pct: 67, color: t.accent },
      { topic: 'Tech Culture', pct: 74, color: t.pink },
      { topic: 'Philosophy', pct: 53, color: t.warning },
      { topic: 'Biology', pct: 45, color: t.success },
    ];

    const featured = [
      { title: 'Quantum Meets Pop Culture', icon: '⚛️', creator: 'mix by @nova_learns', tags: ['Physics', 'Cinema'], time: '18 min', color: t.primary },
      { title: 'AI Ethics Through History', icon: '🧠', creator: 'mix by @deepdive_kai', tags: ['Tech', 'Philosophy'], time: '24 min', color: t.accent },
      { title: 'Climate Science & Music', icon: '🌿', creator: 'mix by @earthjams', tags: ['Ecology', 'Culture'], time: '14 min', color: t.success },
    ];

    return React.createElement('div', { className: 'fade-in', style: { flex: 1, overflowY: 'auto', paddingBottom: 80 } },
      // Header
      React.createElement('div', { style: { padding: '12px 20px 16px' } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 } },
          React.createElement('div', null,
            React.createElement('p', { style: { fontSize: 12, color: t.textMuted, fontWeight: 500 } }, 'Good morning,'),
            React.createElement('h2', { style: { fontSize: 22, fontWeight: 700, color: t.text, lineHeight: 1.2 } }, 'Alex Remix ✦')
          ),
          React.createElement('div', {
            style: {
              width: 42, height: 42, borderRadius: 14,
              background: t.gradient,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 18,
            }
          }, '🧬')
        ),
        // Streak badge
        React.createElement('div', {
          style: {
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: `rgba(251,146,60,0.15)`, border: `1px solid rgba(251,146,60,0.3)`,
            borderRadius: 20, padding: '4px 12px', marginTop: 8,
          }
        },
          React.createElement('span', { style: { fontSize: 14 } }, '🔥'),
          React.createElement('span', { style: { fontSize: 12, fontWeight: 600, color: t.orange } }, '12-day remix streak')
        )
      ),

      // DNA Card
      React.createElement('div', { style: { margin: '0 16px 16px' } },
        React.createElement('div', {
          style: {
            background: t.card, border: `1px solid ${t.border}`,
            borderRadius: 20, padding: '16px',
            boxShadow: themeKey === 'dark' ? '0 4px 24px rgba(139,92,246,0.1)' : '0 4px 24px rgba(124,58,237,0.08)',
          }
        },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 } },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8 } },
              React.createElement('div', {
                style: {
                  width: 28, height: 28, borderRadius: 8,
                  background: t.gradient,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }
              }, React.createElement(window.lucide.Dna, { size: 14, color: '#fff' })),
              React.createElement('span', { style: { fontSize: 14, fontWeight: 700, color: t.text } }, 'Remix DNA')
            ),
            React.createElement('span', {
              style: {
                fontSize: 10, fontWeight: 600, color: t.primary,
                background: `rgba(139,92,246,0.15)`, padding: '3px 8px', borderRadius: 10,
              }
            }, 'LIVE')
          ),
          ...dnaData.map(d =>
            React.createElement('div', { key: d.topic, style: { marginBottom: 10 } },
              React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: 4 } },
                React.createElement('span', { style: { fontSize: 12, color: t.textMuted, fontWeight: 500 } }, d.topic),
                React.createElement('span', { style: { fontSize: 12, color: t.text, fontWeight: 700 } }, `${d.pct}%`)
              ),
              React.createElement('div', { style: { height: 5, background: t.borderLight, borderRadius: 3, overflow: 'hidden' } },
                React.createElement('div', {
                  className: 'dna-bar',
                  style: {
                    height: '100%', borderRadius: 3,
                    background: `linear-gradient(90deg, ${d.color}, ${d.color}cc)`,
                    width: dnaAnimated ? `${d.pct}%` : '0%',
                    transition: 'width 1s ease',
                  }
                })
              )
            )
          )
        )
      ),

      // Weekly challenge banner
      React.createElement('div', { style: { margin: '0 16px 16px' } },
        React.createElement('div', {
          style: {
            borderRadius: 20, padding: '16px',
            background: 'linear-gradient(135deg, #6D28D9, #0E7490)',
            position: 'relative', overflow: 'hidden',
          }
        },
          React.createElement('div', {
            style: {
              position: 'absolute', right: -20, top: -20,
              width: 100, height: 100, borderRadius: '50%',
              background: 'rgba(255,255,255,0.06)',
            }
          }),
          React.createElement('div', {
            style: {
              position: 'absolute', right: 10, bottom: -30,
              width: 80, height: 80, borderRadius: '50%',
              background: 'rgba(255,255,255,0.04)',
            }
          }),
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 } },
            React.createElement(window.lucide.Trophy, { size: 16, color: '#FCD34D' }),
            React.createElement('span', { style: { fontSize: 11, fontWeight: 700, color: '#FCD34D', letterSpacing: 1 } }, 'THIS WEEK\'S CHALLENGE')
          ),
          React.createElement('p', { style: { fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 4 } }, 'Space Age meets Hip-Hop 🚀🎵'),
          React.createElement('p', { style: { fontSize: 12, color: 'rgba(255,255,255,0.7)' } }, '847 remixers joined · 2d 14h left'),
          React.createElement('button', {
            style: {
              marginTop: 12, background: 'rgba(255,255,255,0.2)',
              border: '1px solid rgba(255,255,255,0.3)',
              borderRadius: 10, padding: '8px 16px',
              color: '#fff', fontSize: 12, fontWeight: 700,
              cursor: 'pointer', fontFamily: 'Space Grotesk',
            }
          }, 'Join Challenge →')
        )
      ),

      // Featured remixes
      React.createElement('div', { style: { padding: '0 20px', marginBottom: 8 } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
          React.createElement('h3', { style: { fontSize: 15, fontWeight: 700, color: t.text } }, 'Trending Remixes'),
          React.createElement('span', { style: { fontSize: 12, color: t.primary, fontWeight: 600 } }, 'See all')
        )
      ),

      React.createElement('div', { style: { paddingLeft: 20, display: 'flex', gap: 12, overflowX: 'auto', paddingRight: 20, paddingBottom: 8 } },
        ...featured.map((f, i) =>
          React.createElement('div', {
            key: i,
            style: {
              minWidth: 160, background: t.card,
              border: `1px solid ${t.border}`, borderRadius: 16,
              padding: '14px', flexShrink: 0,
            }
          },
            React.createElement('div', {
              style: {
                width: 40, height: 40, borderRadius: 12,
                background: `${f.color}22`, border: `1px solid ${f.color}44`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 20, marginBottom: 10,
              }
            }, f.icon),
            React.createElement('p', { style: { fontSize: 13, fontWeight: 700, color: t.text, marginBottom: 4, lineHeight: 1.3 } }, f.title),
            React.createElement('p', { style: { fontSize: 10, color: t.textMuted, marginBottom: 8 } }, f.creator),
            React.createElement('div', { style: { display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 8 } },
              ...f.tags.map(tag =>
                React.createElement('span', {
                  key: tag,
                  style: {
                    fontSize: 10, fontWeight: 600,
                    color: f.color, background: `${f.color}18`,
                    padding: '2px 7px', borderRadius: 6,
                  }
                }, tag)
              )
            ),
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
              React.createElement(window.lucide.Clock, { size: 11, color: t.textDim }),
              React.createElement('span', { style: { fontSize: 10, color: t.textDim } }, f.time)
            )
          )
        )
      )
    );
  }

  // ── Studio Screen ────────────────────────────────────────────────────────────
  function StudioScreen() {
    const [activeLayer, setActiveLayer] = useState(0);
    const [isBuilding, setIsBuilding] = useState(false);

    const layers = [
      { id: 0, label: 'Physics Lecture', source: 'MIT OpenCourseWare', icon: '⚛️', color: t.primary, duration: '32 min' },
      { id: 1, label: 'Tech History Documentary', source: 'YouTube', icon: '🎬', color: t.accent, duration: '45 min' },
      { id: 2, label: 'Pop Culture Essay', source: 'Medium', icon: '📝', color: t.pink, duration: '8 min' },
    ];

    const tools = [
      { icon: window.lucide.Type, label: 'Annotate', color: t.primary },
      { icon: window.lucide.Image, label: 'Visual', color: t.accent },
      { icon: window.lucide.Link2, label: 'Thread', color: t.pink },
      { icon: window.lucide.Mic, label: 'Voice', color: t.warning },
      { icon: window.lucide.Sparkles, label: 'AI Mix', color: t.success },
    ];

    return React.createElement('div', { className: 'fade-in', style: { flex: 1, overflowY: 'auto', paddingBottom: 80 } },
      // Header
      React.createElement('div', { style: { padding: '12px 20px 16px' } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
          React.createElement('div', null,
            React.createElement('h2', { style: { fontSize: 20, fontWeight: 700, color: t.text } }, 'Mashup Studio'),
            React.createElement('p', { style: { fontSize: 12, color: t.textMuted } }, 'Build your remix')
          ),
          React.createElement('button', {
            style: {
              background: t.gradient, border: 'none',
              borderRadius: 12, padding: '8px 16px',
              color: '#fff', fontSize: 12, fontWeight: 700,
              cursor: 'pointer', fontFamily: 'Space Grotesk',
              display: 'flex', alignItems: 'center', gap: 6,
            }
          },
            React.createElement(window.lucide.Share2, { size: 13, color: '#fff' }),
            'Publish'
          )
        )
      ),

      // Course title input
      React.createElement('div', { style: { margin: '0 16px 16px' } },
        React.createElement('div', {
          style: {
            background: t.card, border: `1.5px solid ${t.primary}55`,
            borderRadius: 16, padding: '14px 16px',
          }
        },
          React.createElement('p', { style: { fontSize: 11, color: t.primary, fontWeight: 700, marginBottom: 4, letterSpacing: 0.5 } }, 'MICRO-COURSE TITLE'),
          React.createElement('p', { style: { fontSize: 16, fontWeight: 700, color: t.text } }, 'The Physics Behind Silicon Valley'),
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12, marginTop: 8 } },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
              React.createElement(window.lucide.Clock, { size: 12, color: t.textMuted }),
              React.createElement('span', { style: { fontSize: 11, color: t.textMuted } }, '~85 min remix')
            ),
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
              React.createElement(window.lucide.Layers, { size: 12, color: t.textMuted }),
              React.createElement('span', { style: { fontSize: 11, color: t.textMuted } }, '3 sources')
            ),
            React.createElement('div', {
              style: {
                marginLeft: 'auto', fontSize: 10, fontWeight: 600, color: t.success,
                background: `${t.success}18`, padding: '2px 8px', borderRadius: 8,
              }
            }, '● DRAFT')
          )
        )
      ),

      // Layer mixer
      React.createElement('div', { style: { padding: '0 20px', marginBottom: 12 } },
        React.createElement('h3', { style: { fontSize: 13, fontWeight: 700, color: t.textMuted, letterSpacing: 0.5, marginBottom: 10 } }, 'CONTENT LAYERS'),
        ...layers.map((layer, i) =>
          React.createElement('div', {
            key: layer.id,
            onClick: () => setActiveLayer(layer.id),
            style: {
              background: activeLayer === layer.id ? `${layer.color}14` : t.card,
              border: `1.5px solid ${activeLayer === layer.id ? layer.color + '55' : t.border}`,
              borderRadius: 14, padding: '12px 14px',
              marginBottom: 8, cursor: 'pointer',
              transition: 'all 0.2s',
            }
          },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10 } },
              React.createElement('div', {
                style: {
                  width: 38, height: 38, borderRadius: 10,
                  background: `${layer.color}20`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 18,
                }
              }, layer.icon),
              React.createElement('div', { style: { flex: 1 } },
                React.createElement('p', { style: { fontSize: 13, fontWeight: 700, color: t.text, marginBottom: 2 } }, layer.label),
                React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8 } },
                  React.createElement('span', { style: { fontSize: 11, color: t.textMuted } }, layer.source),
                  React.createElement('span', { style: { fontSize: 10, color: t.textDim } }, '·'),
                  React.createElement('span', { style: { fontSize: 11, color: t.textMuted } }, layer.duration),
                )
              ),
              React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 4 } },
                React.createElement(window.lucide.GripVertical, { size: 14, color: t.textDim }),
              )
            ),
            activeLayer === layer.id && React.createElement('div', { style: { marginTop: 10, display: 'flex', gap: 6 } },
              React.createElement('button', {
                style: {
                  flex: 1, background: `${layer.color}20`, border: `1px solid ${layer.color}44`,
                  borderRadius: 8, padding: '6px', fontSize: 11, fontWeight: 600,
                  color: layer.color, cursor: 'pointer', fontFamily: 'Space Grotesk',
                }
              }, 'Clip'),
              React.createElement('button', {
                style: {
                  flex: 1, background: `${layer.color}20`, border: `1px solid ${layer.color}44`,
                  borderRadius: 8, padding: '6px', fontSize: 11, fontWeight: 600,
                  color: layer.color, cursor: 'pointer', fontFamily: 'Space Grotesk',
                }
              }, 'Annotate'),
              React.createElement('button', {
                style: {
                  flex: 1, background: `${layer.color}20`, border: `1px solid ${layer.color}44`,
                  borderRadius: 8, padding: '6px', fontSize: 11, fontWeight: 600,
                  color: layer.color, cursor: 'pointer', fontFamily: 'Space Grotesk',
                }
              }, 'Reorder'),
            )
          )
        ),
        React.createElement('button', {
          style: {
            width: '100%', background: 'transparent',
            border: `1.5px dashed ${t.border}`,
            borderRadius: 14, padding: '12px',
            color: t.textMuted, fontSize: 13, fontWeight: 600,
            cursor: 'pointer', fontFamily: 'Space Grotesk',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }
        },
          React.createElement(window.lucide.Plus, { size: 16, color: t.textMuted }),
          'Add content source'
        )
      ),

      // Tools row
      React.createElement('div', { style: { padding: '0 20px', marginBottom: 16 } },
        React.createElement('h3', { style: { fontSize: 13, fontWeight: 700, color: t.textMuted, letterSpacing: 0.5, marginBottom: 10 } }, 'CREATIVE TOOLS'),
        React.createElement('div', { style: { display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 4 } },
          ...tools.map((tool, i) =>
            React.createElement('div', {
              key: i,
              style: {
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                minWidth: 60, cursor: 'pointer',
              }
            },
              React.createElement('div', {
                style: {
                  width: 48, height: 48, borderRadius: 14,
                  background: `${tool.color}18`, border: `1px solid ${tool.color}33`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }
              }, React.createElement(tool.icon, { size: 20, color: tool.color })),
              React.createElement('span', { style: { fontSize: 10, color: t.textMuted, fontWeight: 500 } }, tool.label)
            )
          )
        )
      ),

      // AI suggestion
      React.createElement('div', { style: { margin: '0 16px' } },
        React.createElement('div', {
          style: {
            background: `linear-gradient(135deg, ${t.primary}18, ${t.accent}12)`,
            border: `1px solid ${t.primary}33`, borderRadius: 16, padding: '14px',
            display: 'flex', alignItems: 'flex-start', gap: 10,
          }
        },
          React.createElement('div', {
            style: {
              width: 32, height: 32, borderRadius: 10, background: t.gradient,
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }
          }, React.createElement(window.lucide.Sparkles, { size: 16, color: '#fff' })),
          React.createElement('div', null,
            React.createElement('p', { style: { fontSize: 12, fontWeight: 700, color: t.primaryLight, marginBottom: 2 } }, 'AI Remix Suggestion'),
            React.createElement('p', { style: { fontSize: 12, color: t.textMuted, lineHeight: 1.5 } },
              'Add a Feynman lecture segment after layer 2 to bridge quantum principles with Silicon Valley culture.')
          )
        )
      )
    );
  }

  // ── Explore Screen ───────────────────────────────────────────────────────────
  function ExploreScreen() {
    const [searchVal, setSearchVal] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');

    const categories = ['All', 'Science', 'History', 'Tech', 'Art', 'Society'];

    const items = [
      { title: 'Astrophysics for Curious Minds', creator: '@stardust_kai', sources: 4, likes: 1240, tags: ['Physics', 'Space'], icon: '🌌', hot: true },
      { title: 'Renaissance Art & Algorithm', creator: '@artcode', sources: 3, likes: 892, tags: ['Art', 'Tech'], icon: '🎨', hot: false },
      { title: 'Cold War Through Cinema', creator: '@historeel', sources: 5, likes: 2103, tags: ['History', 'Film'], icon: '🎥', hot: true },
      { title: 'Nutrition Science Unpacked', creator: '@bodymind', sources: 3, likes: 634, tags: ['Biology', 'Health'], icon: '🥦', hot: false },
      { title: 'Philosophy of Code', creator: '@0x_think', sources: 6, likes: 1789, tags: ['Tech', 'Philosophy'], icon: '💡', hot: false },
      { title: 'Jazz & Chaos Theory', creator: '@improvise_me', sources: 4, likes: 987, tags: ['Music', 'Science'], icon: '🎷', hot: true },
    ];

    return React.createElement('div', { className: 'fade-in', style: { flex: 1, overflowY: 'auto', paddingBottom: 80 } },
      // Header
      React.createElement('div', { style: { padding: '12px 20px 12px' } },
        React.createElement('h2', { style: { fontSize: 20, fontWeight: 700, color: t.text, marginBottom: 12 } }, 'Explore Remixes'),
        // Search bar
        React.createElement('div', {
          style: {
            display: 'flex', alignItems: 'center', gap: 10,
            background: t.card, border: `1px solid ${t.border}`,
            borderRadius: 14, padding: '10px 14px',
          }
        },
          React.createElement(window.lucide.Search, { size: 16, color: t.textMuted }),
          React.createElement('input', {
            value: searchVal,
            onChange: e => setSearchVal(e.target.value),
            placeholder: 'Search topics, creators, mashups...',
            style: {
              flex: 1, background: 'transparent', border: 'none', outline: 'none',
              color: t.text, fontSize: 13, fontFamily: 'Space Grotesk',
            }
          }),
          React.createElement(window.lucide.SlidersHorizontal, { size: 16, color: t.textMuted })
        )
      ),

      // Categories
      React.createElement('div', { style: { paddingLeft: 20, display: 'flex', gap: 8, overflowX: 'auto', paddingRight: 20, marginBottom: 16, paddingBottom: 4 } },
        ...categories.map(cat =>
          React.createElement('button', {
            key: cat,
            onClick: () => setActiveCategory(cat),
            style: {
              flexShrink: 0,
              background: activeCategory === cat ? t.primary : t.card,
              border: `1px solid ${activeCategory === cat ? t.primary : t.border}`,
              borderRadius: 20, padding: '6px 16px',
              color: activeCategory === cat ? '#fff' : t.textMuted,
              fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'Space Grotesk',
              transition: 'all 0.2s',
            }
          }, cat)
        )
      ),

      // Grid
      React.createElement('div', { style: { padding: '0 16px' } },
        ...items.map((item, i) =>
          React.createElement('div', {
            key: i,
            style: {
              background: t.card, border: `1px solid ${t.border}`,
              borderRadius: 16, padding: '14px', marginBottom: 10,
              display: 'flex', gap: 12, alignItems: 'flex-start',
            }
          },
            React.createElement('div', {
              style: {
                width: 52, height: 52, borderRadius: 14, flexShrink: 0,
                background: t.surfaceAlt, border: `1px solid ${t.border}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 24,
              }
            }, item.icon),
            React.createElement('div', { style: { flex: 1, minWidth: 0 } },
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 } },
                React.createElement('p', { style: { fontSize: 14, fontWeight: 700, color: t.text, flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' } }, item.title),
                item.hot && React.createElement('span', { style: { fontSize: 9, fontWeight: 700, color: t.orange, background: `${t.orange}18`, padding: '2px 6px', borderRadius: 6, flexShrink: 0 } }, '🔥 HOT')
              ),
              React.createElement('p', { style: { fontSize: 11, color: t.textMuted, marginBottom: 8 } }, item.creator),
              React.createElement('div', { style: { display: 'flex', gap: 6, marginBottom: 8 } },
                ...item.tags.map(tag =>
                  React.createElement('span', {
                    key: tag,
                    style: {
                      fontSize: 10, fontWeight: 600, color: t.primary,
                      background: `${t.primary}18`, padding: '2px 8px', borderRadius: 6,
                    }
                  }, tag)
                )
              ),
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12 } },
                React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
                  React.createElement(window.lucide.Heart, { size: 12, color: t.pink }),
                  React.createElement('span', { style: { fontSize: 11, color: t.textMuted } }, item.likes.toLocaleString())
                ),
                React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
                  React.createElement(window.lucide.Layers, { size: 12, color: t.textMuted }),
                  React.createElement('span', { style: { fontSize: 11, color: t.textMuted } }, `${item.sources} sources`)
                ),
                React.createElement('button', {
                  style: {
                    marginLeft: 'auto', background: t.gradient, border: 'none',
                    borderRadius: 8, padding: '5px 12px',
                    color: '#fff', fontSize: 11, fontWeight: 700,
                    cursor: 'pointer', fontFamily: 'Space Grotesk',
                  }
                }, 'Remix')
              )
            )
          )
        )
      )
    );
  }

  // ── Challenges Screen ────────────────────────────────────────────────────────
  function ChallengesScreen() {
    const [activeFilter, setActiveFilter] = useState('active');

    const challenges = [
      {
        title: 'Space Age meets Hip-Hop',
        prize: '500 XP',
        participants: 847,
        deadline: '2d 14h',
        difficulty: 'Medium',
        icon: '🚀',
        tags: ['Space', 'Music'],
        color: t.primary,
        status: 'active',
        joined: true,
      },
      {
        title: 'Ancient Philosophy IRL',
        prize: '750 XP',
        participants: 1203,
        deadline: '4d 2h',
        difficulty: 'Hard',
        icon: '🏛️',
        tags: ['Philosophy', 'Modern'],
        color: t.accent,
        status: 'active',
        joined: false,
      },
      {
        title: 'Climate Meets Economics',
        prize: '300 XP',
        participants: 412,
        deadline: '6d 8h',
        difficulty: 'Easy',
        icon: '🌍',
        tags: ['Climate', 'Economics'],
        color: t.success,
        status: 'active',
        joined: false,
      },
      {
        title: 'Neural Networks & Art History',
        prize: '600 XP',
        participants: 2341,
        deadline: 'Ended',
        difficulty: 'Hard',
        icon: '🖼️',
        tags: ['AI', 'Art'],
        color: t.pink,
        status: 'past',
        joined: true,
      },
    ];

    const leaderboard = [
      { rank: 1, name: 'nova_learns', xp: 4820, badge: '👑' },
      { rank: 2, name: 'deepdive_kai', xp: 4210, badge: '🥈' },
      { rank: 3, name: 'alex_remix', xp: 3890, badge: '🥉', isMe: true },
      { rank: 4, name: 'quantumjoy', xp: 3420, badge: null },
      { rank: 5, name: 'earthjams', xp: 2980, badge: null },
    ];

    const filtered = challenges.filter(c => activeFilter === 'all' ? true : c.status === activeFilter);

    return React.createElement('div', { className: 'fade-in', style: { flex: 1, overflowY: 'auto', paddingBottom: 80 } },
      React.createElement('div', { style: { padding: '12px 20px 16px' } },
        React.createElement('h2', { style: { fontSize: 20, fontWeight: 700, color: t.text, marginBottom: 16 } }, 'Remix Challenges')
      ),

      // XP summary
      React.createElement('div', { style: { margin: '0 16px 16px' } },
        React.createElement('div', {
          style: {
            borderRadius: 20, padding: '16px',
            background: `linear-gradient(135deg, ${t.primary}22, ${t.accent}18)`,
            border: `1px solid ${t.primary}33`,
          }
        },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' } },
            React.createElement('div', null,
              React.createElement('p', { style: { fontSize: 11, color: t.textMuted, fontWeight: 600, letterSpacing: 0.5, marginBottom: 4 } }, 'YOUR XP'),
              React.createElement('p', { style: { fontSize: 28, fontWeight: 700, color: t.text, lineHeight: 1 } }, '3,890'),
              React.createElement('p', { style: { fontSize: 11, color: t.success, marginTop: 2 } }, '+420 this week 📈')
            ),
            React.createElement('div', { style: { textAlign: 'right' } },
              React.createElement('p', { style: { fontSize: 11, color: t.textMuted, marginBottom: 4 } }, 'RANK'),
              React.createElement('p', { style: { fontSize: 28, fontWeight: 700, color: t.primaryLight } }, '#3'),
              React.createElement('p', { style: { fontSize: 11, color: t.textMuted } }, 'Global leaderboard')
            )
          )
        )
      ),

      // Filter tabs
      React.createElement('div', { style: { padding: '0 20px', marginBottom: 14, display: 'flex', gap: 8 } },
        [['active', 'Active'], ['past', 'Past'], ['all', 'All']].map(([key, label]) =>
          React.createElement('button', {
            key,
            onClick: () => setActiveFilter(key),
            style: {
              background: activeFilter === key ? t.primary : t.card,
              border: `1px solid ${activeFilter === key ? t.primary : t.border}`,
              borderRadius: 10, padding: '6px 14px',
              color: activeFilter === key ? '#fff' : t.textMuted,
              fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'Space Grotesk',
            }
          }, label)
        )
      ),

      // Challenge cards
      React.createElement('div', { style: { padding: '0 16px', marginBottom: 20 } },
        ...filtered.map((c, i) =>
          React.createElement('div', {
            key: i,
            style: {
              background: t.card, border: `1.5px solid ${c.joined ? c.color + '44' : t.border}`,
              borderRadius: 18, padding: '16px', marginBottom: 10,
            }
          },
            React.createElement('div', { style: { display: 'flex', alignItems: 'flex-start', gap: 12 } },
              React.createElement('div', {
                style: {
                  width: 48, height: 48, borderRadius: 14,
                  background: `${c.color}18`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 22, flexShrink: 0,
                }
              }, c.icon),
              React.createElement('div', { style: { flex: 1 } },
                React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 } },
                  React.createElement('p', { style: { fontSize: 14, fontWeight: 700, color: t.text } }, c.title),
                  c.joined && React.createElement('span', {
                    style: {
                      fontSize: 9, fontWeight: 700, color: c.color,
                      background: `${c.color}18`, padding: '2px 7px', borderRadius: 6,
                    }
                  }, '✓ JOINED')
                ),
                React.createElement('div', { style: { display: 'flex', gap: 12, marginBottom: 10 } },
                  React.createElement('span', { style: { fontSize: 11, color: t.textMuted } },
                    React.createElement('span', { style: { color: t.warning, fontWeight: 700 } }, c.prize + ' ')),
                  React.createElement('span', { style: { fontSize: 11, color: t.textMuted } }, `👥 ${c.participants}`),
                  React.createElement('span', { style: { fontSize: 11, color: c.status === 'past' ? t.textDim : t.accent } },
                    c.status === 'past' ? '🏁 Ended' : `⏱ ${c.deadline}`)
                ),
                React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
                  React.createElement('div', { style: { display: 'flex', gap: 6 } },
                    ...c.tags.map(tag =>
                      React.createElement('span', {
                        key: tag,
                        style: {
                          fontSize: 10, color: c.color, background: `${c.color}18`,
                          padding: '2px 7px', borderRadius: 6, fontWeight: 600,
                        }
                      }, tag)
                    )
                  ),
                  c.status === 'active' && React.createElement('button', {
                    style: {
                      background: c.joined ? 'transparent' : c.color,
                      border: `1px solid ${c.color}`,
                      borderRadius: 8, padding: '5px 14px',
                      color: c.joined ? c.color : '#fff',
                      fontSize: 11, fontWeight: 700,
                      cursor: 'pointer', fontFamily: 'Space Grotesk',
                    }
                  }, c.joined ? 'View' : 'Join')
                )
              )
            )
          )
        )
      ),

      // Leaderboard
      React.createElement('div', { style: { padding: '0 20px', marginBottom: 8 } },
        React.createElement('h3', { style: { fontSize: 15, fontWeight: 700, color: t.text, marginBottom: 12 } }, '🏆 Leaderboard'),
        ...leaderboard.map((p, i) =>
          React.createElement('div', {
            key: i,
            style: {
              display: 'flex', alignItems: 'center', gap: 12,
              background: p.isMe ? `${t.primary}14` : t.card,
              border: `1px solid ${p.isMe ? t.primary + '44' : t.border}`,
              borderRadius: 12, padding: '10px 14px', marginBottom: 8,
            }
          },
            React.createElement('span', { style: { fontSize: 16, width: 24 } }, p.badge || `${p.rank}`),
            React.createElement('span', { style: { flex: 1, fontSize: 13, fontWeight: p.isMe ? 700 : 500, color: p.isMe ? t.primaryLight : t.text } },
              `@${p.name}${p.isMe ? ' (you)' : ''}`),
            React.createElement('span', { style: { fontSize: 13, fontWeight: 700, color: t.warning } }, `${p.xp.toLocaleString()} XP`)
          )
        )
      )
    );
  }

  // ── Profile Screen ───────────────────────────────────────────────────────────
  function ProfileScreen() {
    const [notifs, setNotifs] = useState(true);
    const [dnaPublic, setDnaPublic] = useState(true);

    const stats = [
      { label: 'Remixes Made', value: '47', icon: '🎛️', color: t.primary },
      { label: 'Total Learners', value: '2.3K', icon: '👥', color: t.accent },
      { label: 'XP Earned', value: '3,890', icon: '⚡', color: t.warning },
      { label: 'Streak Days', value: '12', icon: '🔥', color: t.orange },
    ];

    const mastery = [
      { topic: 'Physics', level: 'Advanced', xp: 1240, pct: 82 },
      { topic: 'Tech History', level: 'Intermediate', xp: 870, pct: 65 },
      { topic: 'Philosophy', level: 'Beginner', xp: 320, pct: 38 },
    ];

    const Toggle = ({ value, onToggle }) =>
      React.createElement('div', {
        onClick: onToggle,
        style: {
          width: 44, height: 24, borderRadius: 12,
          background: value ? t.primary : t.border,
          position: 'relative', cursor: 'pointer',
          transition: 'background 0.2s',
        }
      },
        React.createElement('div', {
          style: {
            width: 18, height: 18, borderRadius: '50%', background: '#fff',
            position: 'absolute', top: 3,
            left: value ? 23 : 3,
            transition: 'left 0.2s',
          }
        })
      );

    return React.createElement('div', { className: 'fade-in', style: { flex: 1, overflowY: 'auto', paddingBottom: 80 } },
      // Header
      React.createElement('div', {
        style: {
          padding: '12px 20px 24px',
          background: `linear-gradient(180deg, ${t.primary}22 0%, transparent 100%)`,
        }
      },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 } },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 14 } },
            React.createElement('div', {
              style: {
                width: 64, height: 64, borderRadius: 20,
                background: t.gradient,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 28, flexShrink: 0,
              }
            }, '🧬'),
            React.createElement('div', null,
              React.createElement('h2', { style: { fontSize: 20, fontWeight: 700, color: t.text } }, 'Alex Remix'),
              React.createElement('p', { style: { fontSize: 12, color: t.textMuted } }, '@alex_remix'),
              React.createElement('div', {
                style: {
                  display: 'inline-flex', alignItems: 'center', gap: 4, marginTop: 4,
                  background: `${t.warning}18`, border: `1px solid ${t.warning}33`,
                  borderRadius: 8, padding: '2px 8px',
                }
              },
                React.createElement('span', { style: { fontSize: 10 } }, '⭐'),
                React.createElement('span', { style: { fontSize: 10, fontWeight: 700, color: t.warning } }, 'Top Creator')
              )
            )
          ),
          // Theme toggle
          React.createElement('button', {
            onClick: () => setThemeKey(themeKey === 'dark' ? 'light' : 'dark'),
            style: {
              width: 40, height: 40, borderRadius: 12,
              background: t.card, border: `1px solid ${t.border}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
            }
          },
            themeKey === 'dark'
              ? React.createElement(window.lucide.Sun, { size: 18, color: t.warning })
              : React.createElement(window.lucide.Moon, { size: 18, color: t.primary })
          )
        )
      ),

      // Stats grid
      React.createElement('div', { style: { padding: '0 16px', marginBottom: 16 } },
        React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 } },
          ...stats.map((s, i) =>
            React.createElement('div', {
              key: i,
              style: {
                background: t.card, border: `1px solid ${t.border}`,
                borderRadius: 16, padding: '14px',
                display: 'flex', alignItems: 'center', gap: 10,
              }
            },
              React.createElement('span', { style: { fontSize: 22 } }, s.icon),
              React.createElement('div', null,
                React.createElement('p', { style: { fontSize: 18, fontWeight: 700, color: t.text, lineHeight: 1.1 } }, s.value),
                React.createElement('p', { style: { fontSize: 10, color: t.textMuted } }, s.label)
              )
            )
          )
        )
      ),

      // Mastery
      React.createElement('div', { style: { padding: '0 20px', marginBottom: 16 } },
        React.createElement('h3', { style: { fontSize: 15, fontWeight: 700, color: t.text, marginBottom: 12 } }, 'Subject Mastery'),
        ...mastery.map((m, i) =>
          React.createElement('div', {
            key: i,
            style: { background: t.card, border: `1px solid ${t.border}`, borderRadius: 14, padding: '12px 14px', marginBottom: 8 }
          },
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 } },
              React.createElement('div', null,
                React.createElement('p', { style: { fontSize: 13, fontWeight: 700, color: t.text } }, m.topic),
                React.createElement('p', { style: { fontSize: 10, color: t.textMuted } }, `${m.level} · ${m.xp} XP`)
              ),
              React.createElement('span', { style: { fontSize: 13, fontWeight: 700, color: t.primary } }, `${m.pct}%`)
            ),
            React.createElement('div', { style: { height: 5, background: t.borderLight, borderRadius: 3 } },
              React.createElement('div', { style: { width: `${m.pct}%`, height: '100%', borderRadius: 3, background: t.gradient } })
            )
          )
        )
      ),

      // Settings
      React.createElement('div', { style: { padding: '0 20px' } },
        React.createElement('h3', { style: { fontSize: 15, fontWeight: 700, color: t.text, marginBottom: 12 } }, 'Settings'),
        React.createElement('div', { style: { background: t.card, border: `1px solid ${t.border}`, borderRadius: 16, overflow: 'hidden' } },
          [
            { label: 'Notifications', sub: 'Challenges & new remixes', val: notifs, toggle: () => setNotifs(!notifs) },
            { label: 'Public DNA Profile', sub: 'Share learning fingerprint', val: dnaPublic, toggle: () => setDnaPublic(!dnaPublic) },
          ].map((item, i) =>
            React.createElement('div', {
              key: i,
              style: {
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '14px 16px',
                borderBottom: i === 0 ? `1px solid ${t.border}` : 'none',
              }
            },
              React.createElement('div', null,
                React.createElement('p', { style: { fontSize: 13, fontWeight: 600, color: t.text } }, item.label),
                React.createElement('p', { style: { fontSize: 11, color: t.textMuted } }, item.sub)
              ),
              React.createElement(Toggle, { value: item.val, onToggle: item.toggle })
            )
          )
        ),
        React.createElement('button', {
          style: {
            width: '100%', marginTop: 12,
            background: 'transparent', border: `1px solid ${t.error}44`,
            borderRadius: 14, padding: '12px',
            color: t.error, fontSize: 13, fontWeight: 600,
            cursor: 'pointer', fontFamily: 'Space Grotesk',
          }
        }, 'Sign Out')
      )
    );
  }

  // ── Bottom Nav & Root ───────────────────────────────────────────────────────
  const screens = {
    home: HomeScreen,
    studio: StudioScreen,
    explore: ExploreScreen,
    challenges: ChallengesScreen,
    profile: ProfileScreen,
  };

  return React.createElement(React.Fragment, null,
    styleTag,
    React.createElement('div', {
      style: {
        minHeight: '100vh', background: '#e8e8e8',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'Space Grotesk, sans-serif',
      }
    },
      React.createElement('div', {
        style: {
          width: 375, height: 812,
          background: t.bg, borderRadius: 48,
          overflow: 'hidden', position: 'relative',
          boxShadow: '0 30px 80px rgba(0,0,0,0.4), 0 0 0 10px #1a1a1a, 0 0 0 12px #2a2a2a',
          display: 'flex', flexDirection: 'column',
          transition: 'background 0.3s',
        }
      },
        // Status bar
        React.createElement(StatusBar),

        // Screen content
        React.createElement('div', { style: { flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' } },
          React.createElement(screens[activeTab])
        ),

        // Bottom nav
        React.createElement('div', {
          style: {
            position: 'absolute', bottom: 0, left: 0, right: 0,
            background: themeKey === 'dark'
              ? 'rgba(8,8,16,0.95)'
              : 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(20px)',
            borderTop: `1px solid ${t.border}`,
            padding: '8px 0 20px',
            display: 'flex',
          }
        },
          tabs.map(tab =>
            React.createElement('div', {
              key: tab.id,
              onClick: () => setActiveTab(tab.id),
              style: {
                flex: 1, display: 'flex', flexDirection: 'column',
                alignItems: 'center', gap: 3, cursor: 'pointer',
                padding: '4px 0',
              }
            },
              React.createElement('div', {
                style: {
                  width: 36, height: 36, borderRadius: 12,
                  background: activeTab === tab.id ? `${t.primary}22` : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.2s',
                }
              },
                React.createElement(tab.icon, {
                  size: 20,
                  color: activeTab === tab.id ? t.primary : t.textDim,
                  strokeWidth: activeTab === tab.id ? 2.5 : 1.8,
                })
              ),
              React.createElement('span', {
                style: {
                  fontSize: 10, fontWeight: activeTab === tab.id ? 700 : 500,
                  color: activeTab === tab.id ? t.primary : t.textDim,
                  transition: 'color 0.2s',
                }
              }, tab.label)
            )
          )
        )
      )
    )
  );
}
