const { useState, useEffect, useRef } = React;

const themes = {
  dark: {
    bg: '#1a1410',
    surface: '#241e17',
    surfaceAlt: '#2d261d',
    card: '#2d261d',
    cardBorder: '#3d3428',
    primary: '#d4622a',
    primaryLight: '#e07a47',
    secondary: '#2d6b4a',
    secondaryLight: '#3d8f63',
    accent: '#f0e8d8',
    text: '#f0e8d8',
    textMuted: '#a89880',
    textFaint: '#6b5e4e',
    navBg: '#1a1410',
    navBorder: '#3d3428',
    tag: '#3d3428',
    tagText: '#d4622a',
    greenTag: '#1e3a2a',
    greenTagText: '#3d8f63',
    divider: '#3d3428',
  },
  light: {
    bg: '#f5efe4',
    surface: '#ede4d3',
    surfaceAlt: '#e8ddc8',
    card: '#ffffff',
    cardBorder: '#d9cdb8',
    primary: '#c4521a',
    primaryLight: '#d4622a',
    secondary: '#246040',
    secondaryLight: '#2d6b4a',
    accent: '#1a1410',
    text: '#1a1410',
    textMuted: '#6b5040',
    textFaint: '#9a8470',
    navBg: '#ede4d3',
    navBorder: '#d9cdb8',
    tag: '#f5efe4',
    tagText: '#c4521a',
    greenTag: '#e0f0e8',
    greenTagText: '#246040',
    divider: '#d9cdb8',
  },
};

function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [theme, setTheme] = useState('dark');
  const t = themes[theme];

  const fontStyle = `
    @import url('https://fonts.googleapis.com/css2?family=Instrument+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    ::-webkit-scrollbar { width: 0px; }
    body { font-family: 'Instrument Sans', sans-serif; }
  `;

  const screens = {
    home: HomeScreen,
    explore: ExploreScreen,
    studio: StudioScreen,
    portfolio: PortfolioScreen,
  };

  const ScreenComponent = screens[activeScreen];

  const navItems = [
    { id: 'home', label: 'Home', icon: 'House' },
    { id: 'explore', label: 'Explore', icon: 'Compass' },
    { id: 'studio', label: 'Studio', icon: 'Sparkles' },
    { id: 'portfolio', label: 'Portfolio', icon: 'BookOpen' },
  ];

  return React.createElement('div', {
    style: { minHeight: '100vh', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Instrument Sans', sans-serif" }
  },
    React.createElement('style', null, fontStyle),
    React.createElement('div', {
      style: {
        width: 375,
        height: 812,
        background: t.bg,
        borderRadius: 40,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 40px 80px rgba(0,0,0,0.35)',
      }
    },
      // Main content area
      React.createElement('div', {
        style: { flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }
      },
        React.createElement(ScreenComponent, { t, setActiveScreen, theme, setTheme })
      ),

      // Bottom Navigation
      React.createElement('div', {
        style: {
          background: t.navBg,
          borderTop: `1px solid ${t.navBorder}`,
          display: 'flex',
          padding: '8px 0 12px',
          flexShrink: 0,
        }
      },
        navItems.map(item => {
          const isActive = activeScreen === item.id;
          const Icon = window.lucide[item.icon];
          return React.createElement('button', {
            key: item.id,
            onClick: () => setActiveScreen(item.id),
            style: {
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 4,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px 0',
            }
          },
            Icon && React.createElement(Icon, {
              size: 22,
              color: isActive ? t.primary : t.textFaint,
              strokeWidth: isActive ? 2.5 : 1.8,
            }),
            React.createElement('span', {
              style: {
                fontSize: 10,
                fontFamily: "'Instrument Sans', sans-serif",
                fontWeight: isActive ? 600 : 400,
                color: isActive ? t.primary : t.textFaint,
                letterSpacing: '0.02em',
              }
            }, item.label)
          );
        })
      )
    )
  );
}

// ─── HOME SCREEN ───────────────────────────────────────────────────────────────
function HomeScreen({ t, setActiveScreen, theme, setTheme }) {
  const [pressedCard, setPressedCard] = useState(null);

  const remixBlueprints = [
    {
      id: 1,
      title: 'Quantum Entanglement → Love Story',
      category: 'Physics × Narrative',
      difficulty: 'Creative',
      time: '25 min',
      color: t.primary,
    },
    {
      id: 2,
      title: 'Rome\'s Fall → Modern Parallels',
      category: 'History × Analysis',
      difficulty: 'Deep Dive',
      time: '40 min',
      color: t.secondary,
    },
  ];

  const recentActivity = [
    { title: 'Cognitive Bias Visual Map', type: 'Visual Explainer', date: 'Today', progress: 100 },
    { title: 'Stoicism for Developers', type: 'Narrative Remix', date: 'Yesterday', progress: 65 },
    { title: 'Black Holes in Plain English', type: 'Simplified Summary', date: '2 days ago', progress: 30 },
  ];

  return React.createElement('div', {
    style: { flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column' }
  },
    // Header — asymmetric
    React.createElement('div', {
      style: {
        padding: '28px 24px 0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
      }
    },
      React.createElement('div', null,
        React.createElement('p', {
          style: { fontSize: 12, color: t.primary, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: "'Instrument Sans', sans-serif" }
        }, 'Saturday, April 4'),
        React.createElement('h1', {
          style: { fontSize: 28, fontWeight: 700, color: t.text, marginTop: 4, lineHeight: 1.1, fontFamily: "'Instrument Sans', sans-serif" }
        }, 'Good morning,', React.createElement('br'), 'Alex.'),
      ),
      React.createElement('button', {
        onClick: () => setTheme(theme === 'dark' ? 'light' : 'dark'),
        style: {
          width: 36,
          height: 36,
          borderRadius: '50%',
          background: t.surfaceAlt,
          border: `1px solid ${t.cardBorder}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
        }
      },
        React.createElement(theme === 'dark' ? window.lucide.Sun : window.lucide.Moon, {
          size: 16,
          color: t.textMuted,
        })
      )
    ),

    // Today's streak banner
    React.createElement('div', {
      style: {
        margin: '20px 24px 0',
        background: `linear-gradient(135deg, ${t.primary}22, ${t.secondary}22)`,
        border: `1px solid ${t.primary}44`,
        borderRadius: 12,
        padding: '12px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
      }
    },
      React.createElement('div', {
        style: {
          width: 36,
          height: 36,
          borderRadius: 8,
          background: t.primary,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }
      },
        React.createElement(window.lucide.Flame, { size: 18, color: '#fff' })
      ),
      React.createElement('div', { style: { flex: 1 } },
        React.createElement('p', {
          style: { fontSize: 13, fontWeight: 700, color: t.text, fontFamily: "'Instrument Sans', sans-serif" }
        }, '14-day remix streak'),
        React.createElement('p', {
          style: { fontSize: 11, color: t.textMuted, marginTop: 1, fontFamily: "'Instrument Sans', sans-serif" }
        }, 'You\'ve been on a roll. Keep crafting.')
      ),
      React.createElement('div', {
        style: {
          fontSize: 22,
          fontWeight: 700,
          color: t.primary,
          fontFamily: "'Instrument Sans', sans-serif",
        }
      }, '🔥')
    ),

    // Section: Remix Blueprints — asymmetric layout
    React.createElement('div', { style: { padding: '24px 24px 0' } },
      React.createElement('div', {
        style: { display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }
      },
        React.createElement('h2', {
          style: { fontSize: 13, fontWeight: 700, color: t.textMuted, letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: "'Instrument Sans', sans-serif" }
        }, 'Today\'s Blueprints'),
        React.createElement('button', {
          onClick: () => setActiveScreen('explore'),
          style: { background: 'none', border: 'none', color: t.primary, fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: "'Instrument Sans', sans-serif" }
        }, 'See all →')
      ),

      // Asymmetric two-panel layout
      React.createElement('div', { style: { display: 'flex', gap: 10 } },
        // Large card (left, 60%)
        React.createElement('div', {
          onClick: () => setActiveScreen('studio'),
          onMouseDown: () => setPressedCard(1),
          onMouseUp: () => setPressedCard(null),
          style: {
            flex: '0 0 58%',
            background: t.card,
            border: `1px solid ${t.cardBorder}`,
            borderRadius: 16,
            padding: 16,
            cursor: 'pointer',
            transform: pressedCard === 1 ? 'scale(0.97)' : 'scale(1)',
            transition: 'transform 0.15s ease',
            borderLeft: `3px solid ${t.primary}`,
          }
        },
          React.createElement('div', {
            style: {
              display: 'inline-block',
              background: t.tag,
              color: t.tagText,
              fontSize: 10,
              fontWeight: 600,
              padding: '3px 8px',
              borderRadius: 4,
              marginBottom: 10,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              fontFamily: "'Instrument Sans', sans-serif",
            }
          }, 'Physics × Narrative'),
          React.createElement('p', {
            style: { fontSize: 15, fontWeight: 700, color: t.text, lineHeight: 1.3, fontFamily: "'Instrument Sans', sans-serif" }
          }, 'Quantum Entanglement → Love Story'),
          React.createElement('div', {
            style: { display: 'flex', alignItems: 'center', gap: 6, marginTop: 12 }
          },
            React.createElement(window.lucide.Clock, { size: 12, color: t.textFaint }),
            React.createElement('span', {
              style: { fontSize: 11, color: t.textFaint, fontFamily: "'Instrument Sans', sans-serif" }
            }, '25 min'),
          )
        ),

        // Small cards (right, stacked)
        React.createElement('div', { style: { flex: 1, display: 'flex', flexDirection: 'column', gap: 10 } },
          React.createElement('div', {
            onClick: () => setActiveScreen('studio'),
            onMouseDown: () => setPressedCard(2),
            onMouseUp: () => setPressedCard(null),
            style: {
              background: t.secondary,
              borderRadius: 16,
              padding: 14,
              cursor: 'pointer',
              transform: pressedCard === 2 ? 'scale(0.97)' : 'scale(1)',
              transition: 'transform 0.15s ease',
            }
          },
            React.createElement('p', {
              style: { fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,0.7)', letterSpacing: '0.05em', textTransform: 'uppercase', fontFamily: "'Instrument Sans', sans-serif", marginBottom: 4 }
            }, 'History'),
            React.createElement('p', {
              style: { fontSize: 13, fontWeight: 700, color: '#fff', lineHeight: 1.3, fontFamily: "'Instrument Sans', sans-serif" }
            }, 'Rome\'s Fall → Modern Parallels'),
          ),
          React.createElement('div', {
            onClick: () => setActiveScreen('studio'),
            style: {
              background: t.surfaceAlt,
              border: `1px solid ${t.cardBorder}`,
              borderRadius: 16,
              padding: 14,
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 4,
            }
          },
            React.createElement(window.lucide.Plus, { size: 20, color: t.primary }),
            React.createElement('span', {
              style: { fontSize: 11, color: t.textMuted, fontFamily: "'Instrument Sans', sans-serif" }
            }, 'Custom')
          )
        )
      )
    ),

    // Section: Recent Activity
    React.createElement('div', { style: { padding: '24px 24px 0' } },
      React.createElement('h2', {
        style: { fontSize: 13, fontWeight: 700, color: t.textMuted, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 14, fontFamily: "'Instrument Sans', sans-serif" }
      }, 'Continue Creating'),

      recentActivity.map((item, i) =>
        React.createElement('div', {
          key: i,
          onClick: () => setActiveScreen('studio'),
          style: {
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: '12px 0',
            borderBottom: i < recentActivity.length - 1 ? `1px solid ${t.divider}` : 'none',
            cursor: 'pointer',
          }
        },
          React.createElement('div', {
            style: {
              width: 40,
              height: 40,
              borderRadius: 10,
              background: item.progress === 100 ? `${t.secondary}33` : `${t.primary}22`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }
          },
            React.createElement(
              item.progress === 100 ? window.lucide.CheckCircle2 : window.lucide.Pencil,
              { size: 18, color: item.progress === 100 ? t.secondaryLight : t.primary }
            )
          ),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('p', {
              style: { fontSize: 14, fontWeight: 600, color: t.text, fontFamily: "'Instrument Sans', sans-serif" }
            }, item.title),
            React.createElement('p', {
              style: { fontSize: 11, color: t.textMuted, marginTop: 2, fontFamily: "'Instrument Sans', sans-serif" }
            }, `${item.type} · ${item.date}`)
          ),
          React.createElement('div', {
            style: {
              fontSize: 12,
              fontWeight: 700,
              color: item.progress === 100 ? t.secondaryLight : t.primary,
              fontFamily: "'Instrument Sans', sans-serif",
            }
          }, `${item.progress}%`)
        )
      )
    ),

    React.createElement('div', { style: { height: 24 } })
  );
}

// ─── EXPLORE SCREEN ────────────────────────────────────────────────────────────
function ExploreScreen({ t, setActiveScreen }) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [pressedItem, setPressedItem] = useState(null);

  const filters = ['All', 'Science', 'History', 'Philosophy', 'Tech', 'Art'];

  const sources = [
    {
      type: 'Article',
      title: 'The Hidden Language of Trees',
      source: 'Nature Journal',
      concepts: ['Biology', 'Ecology', 'Communication'],
      readTime: '8 min',
      icon: 'FileText',
    },
    {
      type: 'Podcast',
      title: 'Why Democracy is Fragile',
      source: 'The Daily · NYT',
      concepts: ['Politics', 'History', 'Society'],
      readTime: '42 min',
      icon: 'Mic',
    },
    {
      type: 'Video',
      title: 'How GPT Actually Works',
      source: '3Blue1Brown',
      concepts: ['AI', 'Math', 'Neural Networks'],
      readTime: '20 min',
      icon: 'Play',
    },
    {
      type: 'PDF',
      title: 'Sapiens — Chapter 3',
      source: 'Harari · Upload',
      concepts: ['Anthropology', 'Myth', 'Civilization'],
      readTime: '15 min',
      icon: 'BookOpen',
    },
  ];

  const trending = [
    { topic: 'Stoicism', count: '2.1k remixes', color: t.primary },
    { topic: 'Quantum Physics', count: '1.8k remixes', color: t.secondary },
    { topic: 'Cognitive Biases', count: '3.4k remixes', color: '#8B4513' },
  ];

  return React.createElement('div', {
    style: { flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column' }
  },
    // Header
    React.createElement('div', { style: { padding: '28px 24px 0' } },
      React.createElement('h1', {
        style: { fontSize: 26, fontWeight: 700, color: t.text, fontFamily: "'Instrument Sans', sans-serif" }
      }, 'Explore'),
      React.createElement('p', {
        style: { fontSize: 14, color: t.textMuted, marginTop: 4, fontFamily: "'Instrument Sans', sans-serif" }
      }, 'Import sources. Ignite ideas.'),

      // Search bar
      React.createElement('div', {
        style: {
          marginTop: 16,
          background: t.surfaceAlt,
          border: `1px solid ${t.cardBorder}`,
          borderRadius: 12,
          padding: '10px 14px',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }
      },
        React.createElement(window.lucide.Search, { size: 16, color: t.textFaint }),
        React.createElement('span', {
          style: { fontSize: 14, color: t.textFaint, fontFamily: "'Instrument Sans', sans-serif" }
        }, 'Paste URL, search topics...')
      ),

      // Import options row
      React.createElement('div', {
        style: { display: 'flex', gap: 8, marginTop: 12 }
      },
        [
          { icon: 'Link', label: 'URL' },
          { icon: 'FileUp', label: 'PDF' },
          { icon: 'Youtube', label: 'YouTube' },
          { icon: 'Mic', label: 'Podcast' },
        ].map((opt, i) =>
          React.createElement('div', {
            key: i,
            style: {
              flex: 1,
              background: t.card,
              border: `1px solid ${t.cardBorder}`,
              borderRadius: 10,
              padding: '8px 4px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 4,
              cursor: 'pointer',
            }
          },
            React.createElement(window.lucide[opt.icon], { size: 16, color: t.primary }),
            React.createElement('span', {
              style: { fontSize: 10, color: t.textMuted, fontFamily: "'Instrument Sans', sans-serif", fontWeight: 500 }
            }, opt.label)
          )
        )
      )
    ),

    // Filter chips
    React.createElement('div', {
      style: { padding: '20px 24px 0', display: 'flex', gap: 8, overflowX: 'auto' }
    },
      filters.map(f =>
        React.createElement('button', {
          key: f,
          onClick: () => setActiveFilter(f),
          style: {
            flexShrink: 0,
            padding: '6px 14px',
            borderRadius: 20,
            border: `1.5px solid ${activeFilter === f ? t.primary : t.cardBorder}`,
            background: activeFilter === f ? `${t.primary}22` : 'none',
            color: activeFilter === f ? t.primary : t.textMuted,
            fontSize: 12,
            fontWeight: activeFilter === f ? 700 : 400,
            cursor: 'pointer',
            fontFamily: "'Instrument Sans', sans-serif",
          }
        }, f)
      )
    ),

    // Trending — asymmetric horizontal strip
    React.createElement('div', { style: { padding: '20px 24px 0' } },
      React.createElement('p', {
        style: { fontSize: 11, fontWeight: 700, color: t.textMuted, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10, fontFamily: "'Instrument Sans', sans-serif" }
      }, 'Trending Topics'),
      React.createElement('div', { style: { display: 'flex', gap: 8 } },
        trending.map((item, i) =>
          React.createElement('div', {
            key: i,
            style: {
              flex: i === 0 ? '0 0 44%' : '1',
              background: `${item.color}18`,
              border: `1px solid ${item.color}44`,
              borderRadius: 10,
              padding: '10px 12px',
              cursor: 'pointer',
            }
          },
            React.createElement('p', {
              style: { fontSize: i === 0 ? 14 : 12, fontWeight: 700, color: item.color, fontFamily: "'Instrument Sans', sans-serif" }
            }, item.topic),
            React.createElement('p', {
              style: { fontSize: 10, color: t.textMuted, marginTop: 3, fontFamily: "'Instrument Sans', sans-serif" }
            }, item.count)
          )
        )
      )
    ),

    // Suggested sources
    React.createElement('div', { style: { padding: '20px 24px 0' } },
      React.createElement('p', {
        style: { fontSize: 11, fontWeight: 700, color: t.textMuted, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12, fontFamily: "'Instrument Sans', sans-serif" }
      }, 'Suggested for You'),

      sources.map((src, i) =>
        React.createElement('div', {
          key: i,
          onClick: () => setActiveScreen('studio'),
          onMouseDown: () => setPressedItem(i),
          onMouseUp: () => setPressedItem(null),
          style: {
            display: 'flex',
            gap: 12,
            padding: '14px 0',
            borderBottom: i < sources.length - 1 ? `1px solid ${t.divider}` : 'none',
            cursor: 'pointer',
            transform: pressedItem === i ? 'scale(0.98)' : 'scale(1)',
            transition: 'transform 0.12s',
          }
        },
          React.createElement('div', {
            style: {
              width: 44,
              height: 44,
              background: t.surfaceAlt,
              border: `1px solid ${t.cardBorder}`,
              borderRadius: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }
          },
            React.createElement(window.lucide[src.icon], { size: 18, color: t.primary })
          ),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between' } },
              React.createElement('span', {
                style: {
                  fontSize: 10,
                  fontWeight: 600,
                  color: t.secondary === t.secondary ? t.secondaryLight : t.secondary,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  fontFamily: "'Instrument Sans', sans-serif",
                }
              }, src.type),
              React.createElement('span', {
                style: { fontSize: 10, color: t.textFaint, fontFamily: "'Instrument Sans', sans-serif" }
              }, src.readTime)
            ),
            React.createElement('p', {
              style: { fontSize: 14, fontWeight: 600, color: t.text, marginTop: 2, fontFamily: "'Instrument Sans', sans-serif" }
            }, src.title),
            React.createElement('p', {
              style: { fontSize: 11, color: t.textMuted, marginTop: 2, fontFamily: "'Instrument Sans', sans-serif" }
            }, src.source),
            React.createElement('div', { style: { display: 'flex', gap: 6, marginTop: 8 } },
              src.concepts.slice(0, 2).map((c, j) =>
                React.createElement('span', {
                  key: j,
                  style: {
                    fontSize: 10,
                    background: t.tag,
                    color: t.tagText,
                    padding: '2px 8px',
                    borderRadius: 4,
                    fontFamily: "'Instrument Sans', sans-serif",
                    fontWeight: 500,
                  }
                }, c)
              )
            )
          )
        )
      )
    ),

    React.createElement('div', { style: { height: 24 } })
  );
}

// ─── STUDIO SCREEN ─────────────────────────────────────────────────────────────
function StudioScreen({ t, setActiveScreen }) {
  const [activeTool, setActiveTool] = useState('simplify');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processed, setProcessed] = useState(false);

  const tools = [
    { id: 'simplify', label: 'Simplify', icon: 'Zap' },
    { id: 'visualize', label: 'Visualize', icon: 'Layers' },
    { id: 'narrative', label: 'Narrative', icon: 'BookMarked' },
    { id: 'connect', label: 'Connect', icon: 'Network' },
  ];

  const handleProcess = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setProcessed(true);
    }, 1800);
  };

  return React.createElement('div', {
    style: { flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column' }
  },
    // Header
    React.createElement('div', {
      style: {
        padding: '28px 24px 20px',
        borderBottom: `1px solid ${t.divider}`,
      }
    },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
        React.createElement('div', null,
          React.createElement('h1', {
            style: { fontSize: 26, fontWeight: 700, color: t.text, fontFamily: "'Instrument Sans', sans-serif" }
          }, 'Studio'),
          React.createElement('p', {
            style: { fontSize: 13, color: t.textMuted, marginTop: 3, fontFamily: "'Instrument Sans', sans-serif" }
          }, 'Quantum Entanglement → Love Story')
        ),
        React.createElement('div', {
          style: {
            background: `${t.secondary}33`,
            border: `1px solid ${t.secondaryLight}55`,
            borderRadius: 8,
            padding: '4px 10px',
            fontSize: 11,
            fontWeight: 600,
            color: t.secondaryLight,
            fontFamily: "'Instrument Sans', sans-serif",
          }
        }, 'In Progress')
      )
    ),

    // Source preview
    React.createElement('div', { style: { padding: '16px 24px 0' } },
      React.createElement('p', {
        style: { fontSize: 11, fontWeight: 700, color: t.textMuted, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10, fontFamily: "'Instrument Sans', sans-serif" }
      }, 'Source Material'),
      React.createElement('div', {
        style: {
          background: t.surfaceAlt,
          border: `1px solid ${t.cardBorder}`,
          borderRadius: 12,
          padding: 14,
          borderLeft: `3px solid ${t.primary}`,
        }
      },
        React.createElement('div', { style: { display: 'flex', gap: 10, alignItems: 'flex-start' } },
          React.createElement(window.lucide.FileText, { size: 16, color: t.primary, style: { marginTop: 2, flexShrink: 0 } }),
          React.createElement('div', null,
            React.createElement('p', {
              style: { fontSize: 13, fontWeight: 600, color: t.text, fontFamily: "'Instrument Sans', sans-serif" }
            }, 'Quantum Entanglement Explained'),
            React.createElement('p', {
              style: { fontSize: 11, color: t.textMuted, marginTop: 2, fontFamily: "'Instrument Sans', sans-serif" }
            }, 'Nature Journal · 8 min read'),
            React.createElement('p', {
              style: { fontSize: 12, color: t.textMuted, marginTop: 8, lineHeight: 1.6, fontFamily: "'Instrument Sans', sans-serif" }
            }, '"Quantum entanglement occurs when two particles become interconnected, sharing quantum states instantaneously regardless of distance..."')
          )
        ),
        React.createElement('div', {
          style: { display: 'flex', gap: 6, marginTop: 10 }
        },
          ['Physics', 'Quantum', 'Particles'].map((c, i) =>
            React.createElement('span', {
              key: i,
              style: {
                fontSize: 10,
                background: t.tag,
                color: t.tagText,
                padding: '2px 8px',
                borderRadius: 4,
                fontFamily: "'Instrument Sans', sans-serif",
                fontWeight: 500,
              }
            }, c)
          )
        )
      )
    ),

    // AI Tools
    React.createElement('div', { style: { padding: '20px 24px 0' } },
      React.createElement('p', {
        style: { fontSize: 11, fontWeight: 700, color: t.textMuted, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12, fontFamily: "'Instrument Sans', sans-serif" }
      }, 'AI Co-Pilot Tools'),
      React.createElement('div', { style: { display: 'flex', gap: 8 } },
        tools.map(tool =>
          React.createElement('button', {
            key: tool.id,
            onClick: () => { setActiveTool(tool.id); setProcessed(false); },
            style: {
              flex: 1,
              padding: '10px 4px',
              borderRadius: 10,
              border: `1.5px solid ${activeTool === tool.id ? t.primary : t.cardBorder}`,
              background: activeTool === tool.id ? `${t.primary}22` : t.surfaceAlt,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 5,
              cursor: 'pointer',
            }
          },
            React.createElement(window.lucide[tool.icon], {
              size: 18,
              color: activeTool === tool.id ? t.primary : t.textFaint,
            }),
            React.createElement('span', {
              style: {
                fontSize: 10,
                fontWeight: activeTool === tool.id ? 700 : 400,
                color: activeTool === tool.id ? t.primary : t.textFaint,
                fontFamily: "'Instrument Sans', sans-serif",
              }
            }, tool.label)
          )
        )
      )
    ),

    // Remix canvas
    React.createElement('div', { style: { padding: '20px 24px 0' } },
      React.createElement('div', {
        style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }
      },
        React.createElement('p', {
          style: { fontSize: 11, fontWeight: 700, color: t.textMuted, letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: "'Instrument Sans', sans-serif" }
        }, 'Your Remix'),
        !processed && React.createElement('button', {
          onClick: handleProcess,
          disabled: isProcessing,
          style: {
            background: t.primary,
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            padding: '6px 14px',
            fontSize: 12,
            fontWeight: 700,
            cursor: 'pointer',
            fontFamily: "'Instrument Sans', sans-serif",
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            opacity: isProcessing ? 0.7 : 1,
          }
        },
          isProcessing
            ? React.createElement(window.lucide.Loader, { size: 12, color: '#fff' })
            : React.createElement(window.lucide.Sparkles, { size: 12, color: '#fff' }),
          isProcessing ? 'Crafting...' : 'Generate'
        )
      ),

      processed
        ? React.createElement('div', {
            style: {
              background: t.card,
              border: `1px solid ${t.cardBorder}`,
              borderRadius: 14,
              padding: 16,
              borderTop: `3px solid ${t.primary}`,
            }
          },
            React.createElement('p', {
              style: { fontSize: 12, color: t.primary, fontWeight: 700, marginBottom: 10, fontFamily: "'Instrument Sans', sans-serif" }
            }, '✦ Narrative Remix Generated'),
            React.createElement('p', {
              style: { fontSize: 13, color: t.text, lineHeight: 1.7, fontFamily: "'Instrument Sans', sans-serif" }
            }, 'Imagine two souls, born worlds apart, yet inexplicably drawn to each other. Like entangled particles, their fates were woven together from the start — no matter how far one travels, the other feels every joy and sorrow instantaneously...'),
            React.createElement('div', {
              style: { display: 'flex', gap: 10, marginTop: 14 }
            },
              React.createElement('button', {
                onClick: () => setActiveScreen('portfolio'),
                style: {
                  flex: 1,
                  background: t.primary,
                  color: '#fff',
                  border: 'none',
                  borderRadius: 8,
                  padding: '10px',
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: 'pointer',
                  fontFamily: "'Instrument Sans', sans-serif",
                }
              }, 'Save to Portfolio'),
              React.createElement('button', {
                onClick: () => setProcessed(false),
                style: {
                  flex: 1,
                  background: t.surfaceAlt,
                  color: t.textMuted,
                  border: `1px solid ${t.cardBorder}`,
                  borderRadius: 8,
                  padding: '10px',
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontFamily: "'Instrument Sans', sans-serif",
                }
              }, 'Regenerate')
            )
          )
        : React.createElement('div', {
            style: {
              background: t.surfaceAlt,
              border: `1.5px dashed ${t.cardBorder}`,
              borderRadius: 14,
              padding: 24,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              minHeight: 120,
            }
          },
            React.createElement(window.lucide.Wand2, { size: 28, color: t.textFaint }),
            React.createElement('p', {
              style: { fontSize: 13, color: t.textFaint, textAlign: 'center', fontFamily: "'Instrument Sans', sans-serif" }
            }, 'Select a tool and hit Generate\nto craft your remix')
          )
    ),

    // Idea Weaver suggestion
    React.createElement('div', {
      style: {
        margin: '20px 24px 0',
        background: `${t.secondary}18`,
        border: `1px solid ${t.secondaryLight}44`,
        borderRadius: 12,
        padding: '12px 14px',
        display: 'flex',
        gap: 10,
        alignItems: 'flex-start',
      }
    },
      React.createElement(window.lucide.Network, { size: 18, color: t.secondaryLight, style: { flexShrink: 0, marginTop: 2 } }),
      React.createElement('div', null,
        React.createElement('p', {
          style: { fontSize: 12, fontWeight: 700, color: t.secondaryLight, fontFamily: "'Instrument Sans', sans-serif" }
        }, 'Idea Weaver Suggestion'),
        React.createElement('p', {
          style: { fontSize: 12, color: t.textMuted, marginTop: 3, lineHeight: 1.5, fontFamily: "'Instrument Sans', sans-serif" }
        }, 'Connect this to "Non-Local Consciousness" in philosophy for a deeper interdisciplinary remix.')
      )
    ),

    React.createElement('div', { style: { height: 24 } })
  );
}

// ─── PORTFOLIO SCREEN ──────────────────────────────────────────────────────────
function PortfolioScreen({ t, setActiveScreen }) {
  const [activeTab, setActiveTab] = useState('mine');
  const [hoveredCard, setHoveredCard] = useState(null);

  const creations = [
    {
      title: 'Cognitive Bias Visual Map',
      type: 'Visual Explainer',
      date: 'Apr 4, 2026',
      views: 142,
      likes: 38,
      source: 'Psychology Today',
      color: t.primary,
      featured: true,
    },
    {
      title: 'Stoicism for Developers',
      type: 'Narrative Remix',
      date: 'Apr 3, 2026',
      views: 89,
      likes: 22,
      source: 'Meditations — Marcus Aurelius',
      color: t.secondary,
      featured: false,
    },
    {
      title: 'Black Holes in Plain English',
      type: 'Simplified Summary',
      date: 'Apr 2, 2026',
      views: 56,
      likes: 14,
      source: 'A Brief History of Time',
      color: '#8B4513',
      featured: false,
    },
    {
      title: 'Rome\'s Fall → Today',
      type: 'Deep Dive Analysis',
      date: 'Mar 30, 2026',
      views: 203,
      likes: 61,
      source: 'The Fate of Rome — Harper',
      color: t.primary,
      featured: false,
    },
  ];

  const stats = [
    { label: 'Total Creations', value: '24' },
    { label: 'Total Views', value: '1.2k' },
    { label: 'Topics Mastered', value: '11' },
  ];

  return React.createElement('div', {
    style: { flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column' }
  },
    // Header with profile stats — asymmetric
    React.createElement('div', {
      style: {
        padding: '28px 24px 20px',
        background: t.surface,
        borderBottom: `1px solid ${t.divider}`,
      }
    },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' } },
        React.createElement('div', null,
          React.createElement('h1', {
            style: { fontSize: 26, fontWeight: 700, color: t.text, fontFamily: "'Instrument Sans', sans-serif" }
          }, 'Portfolio'),
          React.createElement('p', {
            style: { fontSize: 13, color: t.textMuted, marginTop: 3, fontFamily: "'Instrument Sans', sans-serif" }
          }, 'Alex\'s Knowledge Studio')
        ),
        React.createElement('div', {
          style: {
            width: 44,
            height: 44,
            borderRadius: '50%',
            background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }
        },
          React.createElement('span', {
            style: { fontSize: 18, fontWeight: 700, color: '#fff', fontFamily: "'Instrument Sans', sans-serif" }
          }, 'A')
        )
      ),

      // Stats row — uneven widths for editorial feel
      React.createElement('div', { style: { display: 'flex', gap: 0, marginTop: 18 } },
        stats.map((stat, i) =>
          React.createElement('div', {
            key: i,
            style: {
              flex: i === 1 ? 2 : 1,
              textAlign: 'center',
              borderRight: i < stats.length - 1 ? `1px solid ${t.divider}` : 'none',
              padding: '0 8px',
            }
          },
            React.createElement('p', {
              style: { fontSize: 22, fontWeight: 700, color: t.text, fontFamily: "'Instrument Sans', sans-serif" }
            }, stat.value),
            React.createElement('p', {
              style: { fontSize: 10, color: t.textMuted, marginTop: 2, fontFamily: "'Instrument Sans', sans-serif" }
            }, stat.label)
          )
        )
      )
    ),

    // Tabs
    React.createElement('div', {
      style: {
        display: 'flex',
        borderBottom: `1px solid ${t.divider}`,
        padding: '0 24px',
      }
    },
      [
        { id: 'mine', label: 'My Creations' },
        { id: 'featured', label: 'Showcase' },
      ].map(tab =>
        React.createElement('button', {
          key: tab.id,
          onClick: () => setActiveTab(tab.id),
          style: {
            marginRight: 24,
            padding: '14px 0',
            background: 'none',
            border: 'none',
            borderBottom: `2px solid ${activeTab === tab.id ? t.primary : 'transparent'}`,
            color: activeTab === tab.id ? t.text : t.textFaint,
            fontSize: 13,
            fontWeight: activeTab === tab.id ? 700 : 400,
            cursor: 'pointer',
            fontFamily: "'Instrument Sans', sans-serif",
          }
        }, tab.label)
      )
    ),

    // Creations list
    React.createElement('div', { style: { padding: '16px 24px 0' } },
      creations.map((item, i) =>
        React.createElement('div', {
          key: i,
          onMouseEnter: () => setHoveredCard(i),
          onMouseLeave: () => setHoveredCard(null),
          onClick: () => setActiveScreen('studio'),
          style: {
            marginBottom: 12,
            background: hoveredCard === i ? t.surfaceAlt : t.card,
            border: `1px solid ${hoveredCard === i ? item.color + '66' : t.cardBorder}`,
            borderRadius: 14,
            padding: '14px 16px',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
            borderLeft: `3px solid ${item.color}`,
          }
        },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' } },
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', { style: { display: 'flex', gap: 8, alignItems: 'center', marginBottom: 6 } },
                React.createElement('span', {
                  style: {
                    fontSize: 10,
                    background: `${item.color}22`,
                    color: item.color,
                    padding: '2px 8px',
                    borderRadius: 4,
                    fontWeight: 700,
                    fontFamily: "'Instrument Sans', sans-serif",
                    letterSpacing: '0.04em',
                  }
                }, item.type),
                item.featured && React.createElement('span', {
                  style: {
                    fontSize: 10,
                    background: t.greenTag,
                    color: t.greenTagText,
                    padding: '2px 8px',
                    borderRadius: 4,
                    fontWeight: 600,
                    fontFamily: "'Instrument Sans', sans-serif",
                  }
                }, '✦ Featured')
              ),
              React.createElement('p', {
                style: { fontSize: 15, fontWeight: 700, color: t.text, fontFamily: "'Instrument Sans', sans-serif" }
              }, item.title),
              React.createElement('p', {
                style: { fontSize: 11, color: t.textMuted, marginTop: 3, fontFamily: "'Instrument Sans', sans-serif" }
              }, `Based on: ${item.source}`)
            )
          ),
          React.createElement('div', {
            style: {
              display: 'flex',
              gap: 16,
              marginTop: 12,
              paddingTop: 10,
              borderTop: `1px solid ${t.divider}`,
            }
          },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 5 } },
              React.createElement(window.lucide.Eye, { size: 12, color: t.textFaint }),
              React.createElement('span', {
                style: { fontSize: 12, color: t.textFaint, fontFamily: "'Instrument Sans', sans-serif" }
              }, item.views)
            ),
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 5 } },
              React.createElement(window.lucide.Heart, { size: 12, color: t.textFaint }),
              React.createElement('span', {
                style: { fontSize: 12, color: t.textFaint, fontFamily: "'Instrument Sans', sans-serif" }
              }, item.likes)
            ),
            React.createElement('div', { style: { flex: 1, textAlign: 'right' } },
              React.createElement('span', {
                style: { fontSize: 11, color: t.textFaint, fontFamily: "'Instrument Sans', sans-serif" }
              }, item.date)
            )
          )
        )
      ),

      // New creation CTA
      React.createElement('button', {
        onClick: () => setActiveScreen('explore'),
        style: {
          width: '100%',
          padding: '14px',
          background: 'none',
          border: `1.5px dashed ${t.primary}`,
          borderRadius: 14,
          color: t.primary,
          fontSize: 13,
          fontWeight: 700,
          cursor: 'pointer',
          fontFamily: "'Instrument Sans', sans-serif",
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          marginBottom: 24,
        }
      },
        React.createElement(window.lucide.Plus, { size: 16, color: t.primary }),
        React.createElement('span', null, 'Start a New Creation')
      )
    )
  );
}
