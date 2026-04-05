
const { useState, useEffect, useRef } = React;

const themes = {
  light: {
    bg: '#F0FDFA',
    surface: '#FFFFFF',
    surfaceAlt: '#F8FFFE',
    border: '#CCFBF1',
    borderMid: '#99F6E4',
    primary: '#0D9488',
    primaryLight: '#14B8A6',
    primaryBg: '#CCFBF1',
    secondary: '#14B8A6',
    cta: '#F97316',
    ctaLight: '#FED7AA',
    text: '#0F172A',
    textMuted: '#475569',
    textLight: '#94A3B8',
    navBg: '#FFFFFF',
    navBorder: '#E2F8F4',
    cardShadow: '0 2px 12px rgba(13,148,136,0.10)',
    cardShadowHover: '0 6px 24px rgba(13,148,136,0.18)',
    pill: '#F0FDFA',
    pillBorder: '#99F6E4',
    overlayBg: 'rgba(240,253,250,0.95)',
  },
  dark: {
    bg: '#0A1628',
    surface: '#111F35',
    surfaceAlt: '#0D2540',
    border: '#1E3A5F',
    borderMid: '#254D7A',
    primary: '#14B8A6',
    primaryLight: '#2DD4BF',
    primaryBg: '#0D2540',
    secondary: '#0D9488',
    cta: '#F97316',
    ctaLight: '#7C3000',
    text: '#F1F5F9',
    textMuted: '#94A3B8',
    textLight: '#475569',
    navBg: '#0D1F36',
    navBorder: '#1E3A5F',
    cardShadow: '0 2px 12px rgba(0,0,0,0.4)',
    cardShadowHover: '0 6px 24px rgba(0,0,0,0.6)',
    pill: '#1E3A5F',
    pillBorder: '#254D7A',
    overlayBg: 'rgba(10,22,40,0.95)',
  }
};

function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [themeMode, setThemeMode] = useState('light');
  const t = themes[themeMode];

  const styleTag = `
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
    * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: #14B8A6; border-radius: 4px; }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(12px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(28px); }
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
    @keyframes floatNode {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-6px); }
    }
    @keyframes progressFill {
      from { width: 0%; }
      to { width: var(--target-width); }
    }
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    @keyframes beeFloat {
      0%, 100% { transform: translateY(0) rotate(-2deg); }
      50% { transform: translateY(-8px) rotate(2deg); }
    }
    @keyframes ripple {
      0% { transform: scale(0); opacity: 0.5; }
      100% { transform: scale(3); opacity: 0; }
    }

    .nav-tab { transition: all 0.2s ease; }
    .nav-tab:active { transform: scale(0.92); }
    .card-hover { transition: box-shadow 0.2s, transform 0.2s; }
    .card-hover:hover { transform: translateY(-2px); }
    .btn-press:active { transform: scale(0.96); }
    .tag-pill { transition: background 0.15s, transform 0.15s; }
    .tag-pill:active { transform: scale(0.94); }
    .node-circle { transition: transform 0.2s, box-shadow 0.2s; cursor: pointer; }
    .node-circle:hover { transform: scale(1.15); }
    .forge-card { transition: border-color 0.2s, box-shadow 0.2s; }
    .forge-card:hover { border-color: #14B8A6 !important; box-shadow: 0 4px 16px rgba(13,148,136,0.18) !important; }
  `;

  const screens = {
    home: () => React.createElement(HomeScreen, { t, themeMode, setThemeMode, setActiveScreen }),
    explore: () => React.createElement(ExploreScreen, { t, themeMode, setActiveScreen }),
    guild: () => React.createElement(GuildScreen, { t, themeMode, setActiveScreen }),
    forge: () => React.createElement(ForgeScreen, { t, themeMode, setActiveScreen }),
    profile: () => React.createElement(ProfileScreen, { t, themeMode, setActiveScreen }),
  };

  const navItems = [
    { id: 'home', label: 'Quests', icon: 'Zap' },
    { id: 'explore', label: 'Discover', icon: 'Globe' },
    { id: 'guild', label: 'Guild', icon: 'Users' },
    { id: 'forge', label: 'Forge', icon: 'Flame' },
    { id: 'profile', label: 'Me', icon: 'User' },
  ];

  return React.createElement('div', {
    style: {
      minHeight: '100vh',
      background: '#f0f0f0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      padding: '24px 16px',
    }
  },
    React.createElement('style', { dangerouslySetInnerHTML: { __html: styleTag } }),
    React.createElement('div', {
      style: {
        width: 375,
        height: 812,
        background: t.bg,
        borderRadius: 44,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        boxShadow: '0 32px 80px rgba(0,0,0,0.25), 0 2px 8px rgba(0,0,0,0.12)',
        border: `1px solid ${themeMode === 'light' ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.08)'}`,
      }
    },
      // Screen Content
      React.createElement('div', {
        style: {
          flex: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
          position: 'relative',
        }
      }, React.createElement(screens[activeScreen])),

      // Bottom Nav
      React.createElement('div', {
        style: {
          background: t.navBg,
          borderTop: `1px solid ${t.navBorder}`,
          display: 'flex',
          paddingBottom: 8,
          paddingTop: 8,
          flexShrink: 0,
        }
      }, navItems.map(item => {
        const isActive = activeScreen === item.id;
        const Icon = window.lucide[item.icon];
        return React.createElement('button', {
          key: item.id,
          className: 'nav-tab',
          onClick: () => setActiveScreen(item.id),
          style: {
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 3,
            padding: '6px 4px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            position: 'relative',
          }
        },
          isActive && React.createElement('div', {
            style: {
              position: 'absolute',
              top: -8,
              width: 32,
              height: 3,
              background: t.primary,
              borderRadius: '0 0 4px 4px',
            }
          }),
          React.createElement(Icon, {
            size: 22,
            color: isActive ? t.primary : t.textLight,
            strokeWidth: isActive ? 2.5 : 1.8,
          }),
          React.createElement('span', {
            style: {
              fontSize: 10,
              fontWeight: isActive ? 700 : 500,
              color: isActive ? t.primary : t.textLight,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }
          }, item.label)
        );
      }))
    )
  );
}

// ─── HOME SCREEN ───────────────────────────────────────────────────────────────
function HomeScreen({ t, themeMode, setThemeMode, setActiveScreen }) {
  const [submitted, setSubmitted] = useState(false);
  const [response, setResponse] = useState('');
  const [submitMode, setSubmitMode] = useState('text');
  const [xpAnim, setXpAnim] = useState(false);
  const [streak] = useState(7);

  const quest = {
    id: 'q-042',
    day: 'Day 042',
    title: 'Object Poetry',
    prompt: 'Describe an object around you using only three adjectives and a vivid simile.',
    example: '"The coffee mug: warm, chipped, and stubborn — like a retired lighthouse keeper."',
    category: 'Creativity',
    timeEstimate: '< 3 min',
    participants: 1847,
    xp: 25,
  };

  const handleSubmit = () => {
    if (!response.trim()) return;
    setSubmitted(true);
    setXpAnim(true);
    setTimeout(() => setXpAnim(false), 1500);
  };

  return React.createElement('div', {
    style: { padding: '20px 20px 16px', animation: 'fadeIn 0.4s ease', minHeight: '100%' }
  },
    // Header
    React.createElement('div', {
      style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }
    },
      React.createElement('div', null,
        React.createElement('div', {
          style: { fontSize: 13, fontWeight: 600, color: t.textMuted, letterSpacing: '0.05em', textTransform: 'uppercase' }
        }, "Today's Quest"),
        React.createElement('div', {
          style: { fontSize: 22, fontWeight: 800, color: t.text, lineHeight: 1.2, fontFamily: "'Plus Jakarta Sans', sans-serif" }
        }, 'PromptHive')
      ),
      React.createElement('div', { style: { display: 'flex', gap: 8, alignItems: 'center' } },
        // Streak
        React.createElement('div', {
          style: {
            display: 'flex', alignItems: 'center', gap: 4,
            background: t.ctaLight,
            padding: '6px 10px', borderRadius: 20,
          }
        },
          React.createElement(window.lucide.Flame, { size: 14, color: t.cta }),
          React.createElement('span', { style: { fontSize: 12, fontWeight: 700, color: t.cta } }, `${streak}`)
        ),
        // Theme Toggle
        React.createElement('button', {
          onClick: () => setThemeMode(themeMode === 'light' ? 'dark' : 'light'),
          style: {
            width: 36, height: 36, borderRadius: 18,
            background: t.surface, border: `1px solid ${t.border}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
          }
        },
          React.createElement(themeMode === 'light' ? window.lucide.Moon : window.lucide.Sun, {
            size: 16, color: t.primary
          })
        )
      )
    ),

    // XP Banner
    xpAnim && React.createElement('div', {
      style: {
        position: 'absolute', top: 80, left: '50%', transform: 'translateX(-50%)',
        background: t.cta, color: '#fff', padding: '8px 20px', borderRadius: 20,
        fontWeight: 800, fontSize: 16, zIndex: 100, animation: 'slideUp 0.3s ease',
        boxShadow: '0 4px 16px rgba(249,115,22,0.4)',
      }
    }, `+${quest.xp} XP!`),

    // Quest Card
    React.createElement('div', {
      className: 'card-hover',
      style: {
        background: `linear-gradient(135deg, ${t.primary} 0%, #0F766E 100%)`,
        borderRadius: 20, padding: '20px', marginBottom: 16,
        boxShadow: '0 8px 32px rgba(13,148,136,0.35)',
        position: 'relative', overflow: 'hidden',
      }
    },
      React.createElement('div', {
        style: {
          position: 'absolute', top: -20, right: -20, width: 100, height: 100,
          background: 'rgba(255,255,255,0.06)', borderRadius: '50%',
        }
      }),
      React.createElement('div', {
        style: {
          position: 'absolute', bottom: -30, left: -10, width: 80, height: 80,
          background: 'rgba(255,255,255,0.04)', borderRadius: '50%',
        }
      }),
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 } },
        React.createElement('div', { style: { display: 'flex', gap: 8 } },
          React.createElement('span', {
            style: {
              background: 'rgba(255,255,255,0.2)', color: '#fff',
              fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 12,
              letterSpacing: '0.04em',
            }
          }, quest.day),
          React.createElement('span', {
            style: {
              background: 'rgba(249,115,22,0.3)', color: '#FED7AA',
              fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 12,
            }
          }, quest.category)
        ),
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
          React.createElement(window.lucide.Clock, { size: 12, color: 'rgba(255,255,255,0.7)' }),
          React.createElement('span', { style: { fontSize: 11, color: 'rgba(255,255,255,0.7)', fontWeight: 600 } }, quest.timeEstimate)
        )
      ),
      React.createElement('div', {
        style: { fontSize: 20, fontWeight: 800, color: '#fff', marginBottom: 8, fontFamily: "'Plus Jakarta Sans', sans-serif", lineHeight: 1.2 }
      }, quest.title),
      React.createElement('div', {
        style: { fontSize: 14, color: 'rgba(255,255,255,0.88)', lineHeight: 1.6, marginBottom: 12 }
      }, quest.prompt),
      React.createElement('div', {
        style: {
          background: 'rgba(255,255,255,0.12)', borderRadius: 12, padding: '10px 14px',
          fontSize: 13, color: 'rgba(255,255,255,0.8)', fontStyle: 'italic', lineHeight: 1.5,
        }
      }, quest.example),
      React.createElement('div', {
        style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 14 }
      },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 5 } },
          React.createElement(window.lucide.Users, { size: 13, color: 'rgba(255,255,255,0.65)' }),
          React.createElement('span', { style: { fontSize: 12, color: 'rgba(255,255,255,0.65)', fontWeight: 500 } }, `${quest.participants.toLocaleString()} responding`)
        ),
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 5 } },
          React.createElement(window.lucide.Star, { size: 13, color: '#FCD34D' }),
          React.createElement('span', { style: { fontSize: 12, color: '#FCD34D', fontWeight: 700 } }, `+${quest.xp} XP`)
        )
      )
    ),

    // Response Area
    !submitted ? React.createElement('div', null,
      // Input Mode Toggle
      React.createElement('div', {
        style: { display: 'flex', gap: 6, marginBottom: 12 }
      }, ['text', 'image', 'audio'].map(mode =>
        React.createElement('button', {
          key: mode,
          className: 'tag-pill btn-press',
          onClick: () => setSubmitMode(mode),
          style: {
            flex: 1, padding: '8px 4px', borderRadius: 12,
            background: submitMode === mode ? t.primaryBg : t.surface,
            border: `1.5px solid ${submitMode === mode ? t.primary : t.border}`,
            color: submitMode === mode ? t.primary : t.textMuted,
            fontSize: 12, fontWeight: 700, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5,
          }
        },
          React.createElement(
            mode === 'text' ? window.lucide.Type :
            mode === 'image' ? window.lucide.Camera :
            window.lucide.Mic,
            { size: 13, color: submitMode === mode ? t.primary : t.textMuted }
          ),
          React.createElement('span', null, mode.charAt(0).toUpperCase() + mode.slice(1))
        )
      )),

      // Text input
      React.createElement('textarea', {
        value: response,
        onChange: (e) => setResponse(e.target.value),
        placeholder: 'Type your response here... be creative!',
        style: {
          width: '100%', minHeight: 90, padding: '12px 14px',
          background: t.surface, border: `1.5px solid ${t.border}`,
          borderRadius: 14, resize: 'none', outline: 'none',
          fontSize: 14, color: t.text, lineHeight: 1.6,
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          transition: 'border-color 0.2s',
          marginBottom: 10,
        },
        onFocus: (e) => { e.target.style.borderColor = t.primary; },
        onBlur: (e) => { e.target.style.borderColor = t.border; },
      }),

      React.createElement('button', {
        className: 'btn-press',
        onClick: handleSubmit,
        style: {
          width: '100%', padding: '14px', borderRadius: 14,
          background: response.trim() ? t.cta : t.border,
          border: 'none', cursor: response.trim() ? 'pointer' : 'default',
          color: response.trim() ? '#fff' : t.textLight,
          fontSize: 15, fontWeight: 800, fontFamily: "'Plus Jakarta Sans', sans-serif",
          transition: 'background 0.2s, transform 0.1s',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        }
      },
        React.createElement(window.lucide.Send, { size: 16, color: response.trim() ? '#fff' : t.textLight }),
        React.createElement('span', null, 'Submit Quest')
      )
    ) : React.createElement('div', {
      style: {
        background: t.surface, borderRadius: 16, padding: 16,
        border: `1.5px solid ${t.primary}`, animation: 'slideUp 0.4s ease',
      }
    },
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 } },
        React.createElement('div', {
          style: {
            width: 36, height: 36, borderRadius: 18,
            background: t.primaryBg, display: 'flex', alignItems: 'center', justifyContent: 'center',
          }
        }, React.createElement(window.lucide.CheckCircle, { size: 20, color: t.primary })),
        React.createElement('div', null,
          React.createElement('div', { style: { fontWeight: 800, color: t.text, fontSize: 15 } }, 'Quest Complete!'),
          React.createElement('div', { style: { color: t.textMuted, fontSize: 12 } }, 'Your response is now part of the hive')
        )
      ),
      React.createElement('div', {
        style: { background: t.bg, borderRadius: 10, padding: '10px 12px', marginBottom: 12, fontSize: 13, color: t.text, fontStyle: 'italic' }
      }, `"${response}"`),
      React.createElement('button', {
        className: 'btn-press',
        onClick: () => setActiveScreen('explore'),
        style: {
          width: '100%', padding: '12px', borderRadius: 12,
          background: t.primaryBg, border: `1px solid ${t.primary}`,
          color: t.primary, fontSize: 13, fontWeight: 700, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
        }
      },
        React.createElement(window.lucide.Map, { size: 14, color: t.primary }),
        React.createElement('span', null, 'See Discovery Map')
      )
    ),

    // Curiosity Hooks
    React.createElement('div', { style: { marginTop: 16 } },
      React.createElement('div', {
        style: { fontSize: 13, fontWeight: 700, color: t.textMuted, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }
      },
        React.createElement(window.lucide.Lightbulb, { size: 14, color: t.primary }),
        React.createElement('span', null, 'Curiosity Hooks')
      ),
      [
        { icon: 'BookOpen', label: 'The Science of Metaphor', tag: 'Article', time: '3 min' },
        { icon: 'Play', label: 'Object Poetry Workshop', tag: 'Video', time: '7 min' },
      ].map((hook, i) =>
        React.createElement('div', {
          key: i,
          className: 'card-hover',
          style: {
            display: 'flex', alignItems: 'center', gap: 12,
            background: t.surface, borderRadius: 12, padding: '10px 14px', marginBottom: 8,
            border: `1px solid ${t.border}`, cursor: 'pointer',
          }
        },
          React.createElement('div', {
            style: {
              width: 36, height: 36, borderRadius: 10,
              background: t.primaryBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
            }
          }, React.createElement(window.lucide[hook.icon], { size: 16, color: t.primary })),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', { style: { fontSize: 13, fontWeight: 600, color: t.text } }, hook.label),
            React.createElement('div', { style: { display: 'flex', gap: 6, marginTop: 2 } },
              React.createElement('span', { style: { fontSize: 10, fontWeight: 700, color: t.primary, background: t.primaryBg, padding: '2px 8px', borderRadius: 8 } }, hook.tag),
              React.createElement('span', { style: { fontSize: 10, color: t.textLight } }, hook.time)
            )
          ),
          React.createElement(window.lucide.ChevronRight, { size: 14, color: t.textLight })
        )
      )
    )
  );
}

// ─── EXPLORE SCREEN ──────────────────────────────────────────────────────────
function ExploreScreen({ t, themeMode, setActiveScreen }) {
  const [activeMap, setActiveMap] = useState('object-poetry');
  const [hoveredNode, setHoveredNode] = useState(null);

  const maps = [
    { id: 'object-poetry', label: 'Object Poetry', count: 1847 },
    { id: 'daily-wins', label: 'Daily Wins', count: 923 },
    { id: 'sketch-solutions', label: 'Sketch Solutions', count: 651 },
  ];

  const nodes = [
    { id: 1, x: 42, y: 28, size: 52, label: 'Warmth', count: 312, color: '#F97316', connections: [2, 3] },
    { id: 2, x: 68, y: 18, size: 40, label: 'Time', count: 198, color: '#0D9488', connections: [1, 4] },
    { id: 3, x: 22, y: 50, size: 44, label: 'Memory', count: 245, color: '#8B5CF6', connections: [1, 5] },
    { id: 4, x: 72, y: 45, size: 36, label: 'Solitude', count: 167, color: '#14B8A6', connections: [2, 6] },
    { id: 5, x: 38, y: 70, size: 48, label: 'Comfort', count: 289, color: '#EC4899', connections: [3, 6] },
    { id: 6, x: 65, y: 68, size: 34, label: 'Ritual', count: 143, color: '#F59E0B', connections: [4, 5] },
    { id: 7, x: 50, y: 46, size: 56, label: 'Belonging', count: 378, color: '#0D9488', connections: [1, 3, 5] },
  ];

  const streams = [
    { avatar: 'A', text: '"crisp, golden, patient — like a monk who\'s given up on hurrying"', theme: 'Patience', likes: 89 },
    { avatar: 'M', text: '"warm, scratched, reliable — like a grandmother\'s handshake"', theme: 'Warmth', likes: 134 },
    { avatar: 'S', text: '"cold, perfect, anxious — like a first job interview in glass shoes"', theme: 'Tension', likes: 67 },
  ];

  return React.createElement('div', {
    style: { animation: 'fadeIn 0.4s ease', minHeight: '100%' }
  },
    // Header
    React.createElement('div', {
      style: { padding: '20px 20px 12px' }
    },
      React.createElement('div', { style: { fontSize: 22, fontWeight: 800, color: t.text, marginBottom: 2, fontFamily: "'Plus Jakarta Sans', sans-serif" } }, 'Discovery Maps'),
      React.createElement('div', { style: { fontSize: 13, color: t.textMuted } }, 'Collective intelligence, visualized')
    ),

    // Map Selector
    React.createElement('div', {
      style: { display: 'flex', gap: 8, padding: '0 20px', marginBottom: 16, overflowX: 'auto', paddingBottom: 4 }
    }, maps.map(map =>
      React.createElement('button', {
        key: map.id,
        className: 'tag-pill btn-press',
        onClick: () => setActiveMap(map.id),
        style: {
          flexShrink: 0, padding: '8px 14px', borderRadius: 20,
          background: activeMap === map.id ? t.primary : t.surface,
          border: `1.5px solid ${activeMap === map.id ? t.primary : t.border}`,
          color: activeMap === map.id ? '#fff' : t.textMuted,
          fontSize: 12, fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap',
        }
      },
        React.createElement('span', null, map.label),
        React.createElement('span', {
          style: {
            marginLeft: 6, fontSize: 10, fontWeight: 800,
            background: activeMap === map.id ? 'rgba(255,255,255,0.25)' : t.primaryBg,
            color: activeMap === map.id ? '#fff' : t.primary,
            padding: '1px 6px', borderRadius: 8,
          }
        }, map.count)
      )
    )),

    // Map Canvas
    React.createElement('div', {
      style: {
        margin: '0 20px 16px',
        background: t.surface,
        borderRadius: 20, border: `1px solid ${t.border}`,
        height: 220, position: 'relative', overflow: 'hidden',
      }
    },
      // SVG connections
      React.createElement('svg', {
        style: { position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' },
        viewBox: '0 0 100 100', preserveAspectRatio: 'none'
      },
        nodes.flatMap(node =>
          node.connections.map(connId => {
            const conn = nodes.find(n => n.id === connId);
            if (!conn) return null;
            return React.createElement('line', {
              key: `${node.id}-${connId}`,
              x1: node.x, y1: node.y, x2: conn.x, y2: conn.y,
              stroke: t.borderMid, strokeWidth: 0.5, opacity: 0.6,
            });
          })
        ),
      ),
      // Nodes
      nodes.map(node =>
        React.createElement('div', {
          key: node.id,
          className: 'node-circle',
          onMouseEnter: () => setHoveredNode(node.id),
          onMouseLeave: () => setHoveredNode(null),
          style: {
            position: 'absolute',
            left: `calc(${node.x}% - ${node.size / 2}px)`,
            top: `calc(${node.y}% - ${node.size / 2}px)`,
            width: node.size, height: node.size,
            borderRadius: '50%',
            background: `${node.color}22`,
            border: `2px solid ${node.color}`,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
            animation: `floatNode ${2.5 + node.id * 0.3}s ease-in-out infinite`,
            boxShadow: hoveredNode === node.id ? `0 0 20px ${node.color}60` : 'none',
            zIndex: hoveredNode === node.id ? 10 : 1,
          }
        },
          React.createElement('span', { style: { fontSize: node.size > 44 ? 10 : 9, fontWeight: 800, color: node.color, textAlign: 'center', lineHeight: 1.2 } }, node.label),
          React.createElement('span', { style: { fontSize: 8, fontWeight: 600, color: node.color, opacity: 0.7 } }, node.count)
        )
      ),
      // Legend
      React.createElement('div', {
        style: {
          position: 'absolute', bottom: 8, right: 10,
          fontSize: 10, color: t.textLight, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 4,
        }
      },
        React.createElement(window.lucide.Info, { size: 10, color: t.textLight }),
        React.createElement('span', null, 'Node size = responses')
      )
    ),

    // Idea Streams
    React.createElement('div', { style: { padding: '0 20px' } },
      React.createElement('div', {
        style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }
      },
        React.createElement('div', { style: { fontSize: 15, fontWeight: 800, color: t.text } }, 'Idea Streams'),
        React.createElement('button', {
          style: { fontSize: 12, fontWeight: 700, color: t.primary, background: 'none', border: 'none', cursor: 'pointer' }
        }, 'See all')
      ),
      streams.map((s, i) =>
        React.createElement('div', {
          key: i,
          className: 'card-hover',
          style: {
            background: t.surface, borderRadius: 14, padding: '12px 14px', marginBottom: 10,
            border: `1px solid ${t.border}`, cursor: 'pointer',
          }
        },
          React.createElement('div', { style: { display: 'flex', gap: 10 } },
            React.createElement('div', {
              style: {
                width: 32, height: 32, borderRadius: 16, flexShrink: 0,
                background: `linear-gradient(135deg, ${t.primary}, ${t.cta})`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 13, fontWeight: 800, color: '#fff',
              }
            }, s.avatar),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', {
                style: { fontSize: 13, color: t.text, fontStyle: 'italic', lineHeight: 1.5, marginBottom: 8 }
              }, s.text),
              React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
                React.createElement('span', {
                  style: {
                    fontSize: 10, fontWeight: 700, color: t.primary,
                    background: t.primaryBg, padding: '2px 8px', borderRadius: 8
                  }
                }, `#${s.theme}`),
                React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
                  React.createElement(window.lucide.Heart, { size: 12, color: '#EC4899' }),
                  React.createElement('span', { style: { fontSize: 11, color: t.textMuted, fontWeight: 600 } }, s.likes)
                )
              )
            )
          )
        )
      )
    )
  );
}

// ─── GUILD SCREEN ─────────────────────────────────────────────────────────────
function GuildScreen({ t, themeMode, setActiveScreen }) {
  const [activeTab, setActiveTab] = useState('my-guild');
  const [expandedGoal, setExpandedGoal] = useState(null);

  const myGuild = {
    name: 'The Thought Weavers',
    members: 12,
    rank: 4,
    badge: 'W',
    color: '#8B5CF6',
    xp: 3240,
    level: 8,
  };

  const goals = [
    {
      id: 1, title: 'Week of Wonder', theme: 'Creativity',
      desc: 'Complete 7 consecutive creative quests as a guild',
      progress: 68, target: 84, current: 57, daysLeft: 3,
      reward: 'Exclusive \'Dreamsmith\' badge + 500 XP',
      color: '#8B5CF6',
    },
    {
      id: 2, title: 'Mindful Month', theme: 'Reflection',
      desc: 'Accumulate 1200 collective reflection responses',
      progress: 42, target: 1200, current: 504, daysLeft: 18,
      reward: 'Community Reflection Archive unlock',
      color: '#EC4899',
    },
  ];

  const leaderboard = [
    { rank: 1, name: 'Spark Collective', members: 18, xp: 8920, badge: 'S', color: '#F59E0B' },
    { rank: 2, name: 'Deep Divers', members: 9, xp: 7140, badge: 'D', color: '#0D9488' },
    { rank: 3, name: 'Idea Architects', members: 15, xp: 5880, badge: 'I', color: '#F97316' },
    { rank: 4, name: 'The Thought Weavers', members: 12, xp: 3240, badge: 'W', color: '#8B5CF6', isMe: true },
  ];

  return React.createElement('div', {
    style: { animation: 'fadeIn 0.4s ease', minHeight: '100%', paddingBottom: 20 }
  },
    // Header
    React.createElement('div', {
      style: {
        background: `linear-gradient(135deg, #7C3AED 0%, #8B5CF6 100%)`,
        padding: '20px 20px 24px',
        borderRadius: '0 0 24px 24px',
        marginBottom: 16,
      }
    },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 } },
        React.createElement('div', null,
          React.createElement('div', { style: { fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.7)', marginBottom: 4 } }, 'Your Guild'),
          React.createElement('div', { style: { fontSize: 22, fontWeight: 800, color: '#fff', fontFamily: "'Plus Jakarta Sans', sans-serif" } }, myGuild.name),
        ),
        React.createElement('div', {
          style: {
            width: 48, height: 48, borderRadius: 16,
            background: 'rgba(255,255,255,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 20, fontWeight: 800, color: '#fff',
          }
        }, myGuild.badge)
      ),
      React.createElement('div', { style: { display: 'flex', gap: 16 } },
        [
          { label: 'Members', value: myGuild.members, icon: 'Users' },
          { label: 'Guild Rank', value: `#${myGuild.rank}`, icon: 'Trophy' },
          { label: 'Total XP', value: myGuild.xp.toLocaleString(), icon: 'Star' },
        ].map((stat, i) =>
          React.createElement('div', {
            key: i,
            style: {
              flex: 1, background: 'rgba(255,255,255,0.15)', borderRadius: 12, padding: '10px 8px', textAlign: 'center'
            }
          },
            React.createElement(window.lucide[stat.icon], { size: 14, color: 'rgba(255,255,255,0.8)', style: { margin: '0 auto 4px' } }),
            React.createElement('div', { style: { fontSize: 16, fontWeight: 800, color: '#fff' } }, stat.value),
            React.createElement('div', { style: { fontSize: 10, color: 'rgba(255,255,255,0.65)' } }, stat.label)
          )
        )
      )
    ),

    // Tabs
    React.createElement('div', {
      style: { display: 'flex', gap: 0, margin: '0 20px', marginBottom: 16, background: t.surface, borderRadius: 12, padding: 4, border: `1px solid ${t.border}` }
    }, [
      { id: 'my-guild', label: 'Guild Goals' },
      { id: 'leaderboard', label: 'Leaderboard' },
    ].map(tab =>
      React.createElement('button', {
        key: tab.id,
        onClick: () => setActiveTab(tab.id),
        style: {
          flex: 1, padding: '8px', borderRadius: 10,
          background: activeTab === tab.id ? t.primary : 'transparent',
          border: 'none', color: activeTab === tab.id ? '#fff' : t.textMuted,
          fontSize: 12, fontWeight: 700, cursor: 'pointer',
          transition: 'all 0.2s',
        }
      }, tab.label)
    )),

    // Goals Tab
    activeTab === 'my-guild' && React.createElement('div', { style: { padding: '0 20px' } },
      goals.map(goal =>
        React.createElement('div', {
          key: goal.id,
          className: 'card-hover',
          onClick: () => setExpandedGoal(expandedGoal === goal.id ? null : goal.id),
          style: {
            background: t.surface, borderRadius: 16, padding: '16px', marginBottom: 12,
            border: `1.5px solid ${expandedGoal === goal.id ? goal.color : t.border}`,
            cursor: 'pointer', transition: 'border-color 0.2s',
          }
        },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 } },
            React.createElement('div', null,
              React.createElement('div', { style: { fontSize: 15, fontWeight: 800, color: t.text, marginBottom: 2 } }, goal.title),
              React.createElement('div', { style: { fontSize: 12, color: t.textMuted } }, goal.desc)
            ),
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
              React.createElement(window.lucide.Clock, { size: 12, color: t.textLight }),
              React.createElement('span', { style: { fontSize: 11, color: t.textLight } }, `${goal.daysLeft}d left`)
            )
          ),
          // Progress Bar
          React.createElement('div', { style: { marginBottom: 8 } },
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: 6 } },
              React.createElement('span', { style: { fontSize: 11, fontWeight: 700, color: goal.color } }, `${goal.progress}% complete`),
              React.createElement('span', { style: { fontSize: 11, color: t.textMuted } }, `${goal.current} / ${goal.target}`)
            ),
            React.createElement('div', { style: { height: 8, background: t.bg, borderRadius: 8, overflow: 'hidden' } },
              React.createElement('div', {
                style: {
                  height: '100%', width: `${goal.progress}%`, borderRadius: 8,
                  background: `linear-gradient(90deg, ${goal.color}, ${goal.color}BB)`,
                  transition: 'width 0.6s ease',
                }
              })
            )
          ),
          expandedGoal === goal.id && React.createElement('div', {
            style: {
              marginTop: 10, paddingTop: 10, borderTop: `1px solid ${t.border}`,
              animation: 'slideUp 0.2s ease'
            }
          },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 } },
              React.createElement(window.lucide.Gift, { size: 14, color: t.cta }),
              React.createElement('span', { style: { fontSize: 12, fontWeight: 700, color: t.text } }, 'Reward:'),
              React.createElement('span', { style: { fontSize: 12, color: t.textMuted } }, goal.reward)
            ),
            React.createElement('button', {
              className: 'btn-press',
              onClick: (e) => { e.stopPropagation(); setActiveScreen('home'); },
              style: {
                width: '100%', padding: '10px', borderRadius: 10,
                background: goal.color, border: 'none', color: '#fff',
                fontSize: 13, fontWeight: 700, cursor: 'pointer',
              }
            }, 'Contribute Today\'s Quest')
          )
        )
      ),
      // Discover Guilds
      React.createElement('div', {
        className: 'card-hover',
        style: {
          background: t.primaryBg, borderRadius: 14, padding: '14px 16px',
          border: `1.5px dashed ${t.primary}`, cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: 12,
        }
      },
        React.createElement('div', {
          style: {
            width: 36, height: 36, borderRadius: 18, background: t.primary,
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
          }
        }, React.createElement(window.lucide.Plus, { size: 18, color: '#fff' })),
        React.createElement('div', null,
          React.createElement('div', { style: { fontWeight: 700, color: t.primary, fontSize: 13 } }, 'Create or Join a Guild'),
          React.createElement('div', { style: { fontSize: 11, color: t.textMuted } }, '48 guilds active this week')
        )
      )
    ),

    // Leaderboard Tab
    activeTab === 'leaderboard' && React.createElement('div', { style: { padding: '0 20px' } },
      leaderboard.map((entry, i) =>
        React.createElement('div', {
          key: i,
          className: 'card-hover',
          style: {
            background: entry.isMe ? t.primaryBg : t.surface,
            borderRadius: 14, padding: '12px 14px', marginBottom: 10,
            border: `1.5px solid ${entry.isMe ? t.primary : t.border}`,
            display: 'flex', alignItems: 'center', gap: 12,
          }
        },
          React.createElement('div', {
            style: {
              width: 28, height: 28, borderRadius: 8, flexShrink: 0,
              background: entry.rank <= 3 ? ['#F59E0B', '#94A3B8', '#F97316'][entry.rank - 1] : t.border,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 12, fontWeight: 800, color: '#fff',
            }
          }, entry.rank <= 3 ? React.createElement(window.lucide.Trophy, { size: 12, color: '#fff' }) : entry.rank),
          React.createElement('div', {
            style: {
              width: 36, height: 36, borderRadius: 10, flexShrink: 0,
              background: entry.color + '22', border: `2px solid ${entry.color}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 14, fontWeight: 800, color: entry.color,
            }
          }, entry.badge),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', {
              style: {
                fontSize: 13, fontWeight: 700,
                color: entry.isMe ? t.primary : t.text,
                display: 'flex', alignItems: 'center', gap: 6,
              }
            },
              entry.name,
              entry.isMe && React.createElement('span', {
                style: { fontSize: 9, fontWeight: 800, background: t.primary, color: '#fff', padding: '1px 5px', borderRadius: 6 }
              }, 'YOU')
            ),
            React.createElement('div', { style: { fontSize: 11, color: t.textMuted } }, `${entry.members} members`)
          ),
          React.createElement('div', { style: { textAlign: 'right' } },
            React.createElement('div', { style: { fontSize: 14, fontWeight: 800, color: t.text } }, entry.xp.toLocaleString()),
            React.createElement('div', { style: { fontSize: 10, color: t.textLight } }, 'XP')
          )
        )
      )
    )
  );
}

// ─── FORGE SCREEN ─────────────────────────────────────────────────────────────
function ForgeScreen({ t, themeMode, setActiveScreen }) {
  const [idea, setIdea] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Creativity');
  const [voted, setVoted] = useState({});

  const categories = ['Creativity', 'Mindfulness', 'Logic', 'Observation', 'Social', 'Science'];

  const trendingPrompts = [
    { id: 1, text: 'If your current mood were a weather pattern, describe the forecast for the week.', author: 'Maya R.', votes: 347, category: 'Mindfulness', hot: true },
    { id: 2, text: 'Invent a tool that solves a problem most people don\'t know they have.', author: 'Dev K.', votes: 289, category: 'Creativity', hot: true },
    { id: 3, text: 'Teach a complex concept using only objects you can see from where you sit.', author: 'Sam L.', votes: 201, category: 'Logic', hot: false },
    { id: 4, text: 'Write the opening line of a novel set in the world of your current job.', author: 'Priya N.', votes: 178, category: 'Creativity', hot: false },
  ];

  return React.createElement('div', {
    style: { padding: '20px 20px', animation: 'fadeIn 0.4s ease', minHeight: '100%', paddingBottom: 24 }
  },
    // Header
    React.createElement('div', { style: { marginBottom: 20 } },
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 } },
        React.createElement('div', {
          style: {
            width: 36, height: 36, borderRadius: 12,
            background: `linear-gradient(135deg, ${t.cta}, #DC2626)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }
        }, React.createElement(window.lucide.Flame, { size: 18, color: '#fff' })),
        React.createElement('div', null,
          React.createElement('div', { style: { fontSize: 22, fontWeight: 800, color: t.text, fontFamily: "'Plus Jakarta Sans', sans-serif" } }, 'Prompt Forge'),
          React.createElement('div', { style: { fontSize: 12, color: t.textMuted } }, 'Shape tomorrow\'s quests')
        )
      )
    ),

    // Submit Idea Card
    React.createElement('div', {
      style: {
        background: t.surface, borderRadius: 18, padding: '16px',
        border: `1.5px solid ${t.border}`, marginBottom: 20,
        boxShadow: t.cardShadow,
      }
    },
      React.createElement('div', { style: { fontSize: 14, fontWeight: 700, color: t.text, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 } },
        React.createElement(window.lucide.PenLine, { size: 15, color: t.primary }),
        React.createElement('span', null, 'Submit a Prompt Idea')
      ),

      // Category Selector
      React.createElement('div', {
        style: { display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }
      }, categories.map(cat =>
        React.createElement('button', {
          key: cat,
          className: 'tag-pill btn-press',
          onClick: () => setSelectedCategory(cat),
          style: {
            padding: '5px 10px', borderRadius: 12,
            background: selectedCategory === cat ? t.cta : t.bg,
            border: `1.5px solid ${selectedCategory === cat ? t.cta : t.border}`,
            color: selectedCategory === cat ? '#fff' : t.textMuted,
            fontSize: 11, fontWeight: 700, cursor: 'pointer',
          }
        }, cat)
      )),

      React.createElement('textarea', {
        value: idea,
        onChange: (e) => setIdea(e.target.value),
        placeholder: 'Write your prompt idea... be specific, playful, and completable in under 5 minutes.',
        style: {
          width: '100%', minHeight: 80, padding: '12px',
          background: t.bg, border: `1.5px solid ${t.border}`,
          borderRadius: 12, resize: 'none', outline: 'none',
          fontSize: 13, color: t.text, lineHeight: 1.6,
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          marginBottom: 10,
          transition: 'border-color 0.2s',
        },
        onFocus: (e) => { e.target.style.borderColor = t.cta; },
        onBlur: (e) => { e.target.style.borderColor = t.border; },
      }),

      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
        React.createElement('div', { style: { fontSize: 11, color: t.textLight } },
          `${idea.length}/200 chars`
        ),
        React.createElement('button', {
          className: 'btn-press',
          onClick: () => { if (idea.trim()) setSubmitted(!submitted); },
          style: {
            padding: '10px 20px', borderRadius: 12,
            background: idea.trim() ? `linear-gradient(135deg, ${t.cta}, #DC2626)` : t.border,
            border: 'none', cursor: idea.trim() ? 'pointer' : 'default',
            color: idea.trim() ? '#fff' : t.textLight,
            fontSize: 13, fontWeight: 700,
            display: 'flex', alignItems: 'center', gap: 6,
          }
        },
          React.createElement(window.lucide.Send, { size: 13, color: idea.trim() ? '#fff' : t.textLight }),
          React.createElement('span', null, submitted ? 'Submitted!' : 'Submit Idea')
        )
      )
    ),

    // Trending Prompts
    React.createElement('div', null,
      React.createElement('div', {
        style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }
      },
        React.createElement('div', { style: { fontSize: 15, fontWeight: 800, color: t.text, display: 'flex', alignItems: 'center', gap: 6 } },
          React.createElement(window.lucide.TrendingUp, { size: 15, color: t.cta }),
          React.createElement('span', null, 'Trending Ideas')
        ),
        React.createElement('span', { style: { fontSize: 11, color: t.textMuted, fontWeight: 600 } }, 'Community votes')
      ),
      trendingPrompts.map((p, i) =>
        React.createElement('div', {
          key: p.id,
          className: 'forge-card card-hover',
          style: {
            background: t.surface, borderRadius: 14, padding: '14px',
            border: `1.5px solid ${t.border}`, marginBottom: 10, cursor: 'pointer',
          }
        },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10 } },
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', { style: { display: 'flex', gap: 6, alignItems: 'center', marginBottom: 6 } },
                p.hot && React.createElement('span', {
                  style: {
                    fontSize: 9, fontWeight: 800, background: '#FEF3C7',
                    color: '#D97706', padding: '2px 6px', borderRadius: 6,
                    display: 'flex', alignItems: 'center', gap: 3,
                  }
                },
                  React.createElement(window.lucide.TrendingUp, { size: 9, color: '#D97706' }),
                  ' HOT'
                ),
                React.createElement('span', {
                  style: { fontSize: 10, fontWeight: 700, color: t.textMuted, background: t.bg, padding: '2px 7px', borderRadius: 6 }
                }, p.category)
              ),
              React.createElement('div', { style: { fontSize: 13, color: t.text, lineHeight: 1.5, marginBottom: 8 } }, `"${p.text}"`),
              React.createElement('div', { style: { fontSize: 11, color: t.textLight } }, `by ${p.author}`)
            ),
            React.createElement('button', {
              className: 'btn-press',
              onClick: (e) => {
                e.stopPropagation();
                setVoted(prev => ({ ...prev, [p.id]: !prev[p.id] }));
              },
              style: {
                flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
                background: voted[p.id] ? t.primaryBg : t.bg,
                border: `1.5px solid ${voted[p.id] ? t.primary : t.border}`,
                borderRadius: 10, padding: '8px 10px', cursor: 'pointer',
                transition: 'all 0.2s',
              }
            },
              React.createElement(window.lucide.ArrowUp, { size: 14, color: voted[p.id] ? t.primary : t.textMuted }),
              React.createElement('span', { style: { fontSize: 11, fontWeight: 800, color: voted[p.id] ? t.primary : t.textMuted } },
                p.votes + (voted[p.id] ? 1 : 0)
              )
            )
          )
        )
      )
    )
  );
}

// ─── PROFILE SCREEN ───────────────────────────────────────────────────────────
function ProfileScreen({ t, themeMode, setActiveScreen }) {
  const user = {
    name: 'Alex Rivera',
    handle: '@alexr',
    avatar: 'AR',
    level: 14,
    xp: 4820,
    nextLevelXp: 5500,
    streak: 7,
    totalQuests: 83,
    badges: [
      { label: 'Dreamsmith', icon: 'Star', color: '#F59E0B', earned: true },
      { label: '7-Day Streak', icon: 'Flame', color: '#F97316', earned: true },
      { label: 'Top Forger', icon: 'Hammer', color: '#8B5CF6', earned: true },
      { label: 'Guild Master', icon: 'Crown', color: '#0D9488', earned: false },
    ],
    recentQuests: [
      { day: 'Day 042', title: 'Object Poetry', xp: 25, date: 'Today' },
      { day: 'Day 041', title: 'Silent Victories', xp: 20, date: 'Yesterday' },
      { day: 'Day 040', title: 'Future Recipe', xp: 30, date: '2 days ago' },
      { day: 'Day 039', title: 'Color Emotion', xp: 25, date: '3 days ago' },
    ],
  };

  const xpPercent = Math.round((user.xp / user.nextLevelXp) * 100);

  return React.createElement('div', {
    style: { animation: 'fadeIn 0.4s ease', minHeight: '100%', paddingBottom: 24 }
  },
    // Profile Hero
    React.createElement('div', {
      style: {
        background: `linear-gradient(160deg, ${t.primary} 0%, #0F766E 60%, #134E4A 100%)`,
        padding: '28px 20px 32px',
        position: 'relative', overflow: 'hidden',
      }
    },
      React.createElement('div', {
        style: {
          position: 'absolute', top: -30, right: -30, width: 140, height: 140,
          background: 'rgba(255,255,255,0.05)', borderRadius: '50%',
        }
      }),
      React.createElement('div', {
        style: {
          position: 'absolute', bottom: -20, left: 20, width: 80, height: 80,
          background: 'rgba(255,255,255,0.04)', borderRadius: '50%',
        }
      }),
      React.createElement('div', { style: { display: 'flex', gap: 14, alignItems: 'center', marginBottom: 16, position: 'relative' } },
        React.createElement('div', {
          style: {
            width: 60, height: 60, borderRadius: 20,
            background: 'linear-gradient(135deg, #F97316, #DC2626)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 20, fontWeight: 800, color: '#fff',
            border: '3px solid rgba(255,255,255,0.3)',
          }
        }, user.avatar),
        React.createElement('div', null,
          React.createElement('div', { style: { fontSize: 20, fontWeight: 800, color: '#fff', fontFamily: "'Plus Jakarta Sans', sans-serif" } }, user.name),
          React.createElement('div', { style: { fontSize: 13, color: 'rgba(255,255,255,0.7)', marginBottom: 4 } }, user.handle),
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6 } },
            React.createElement('div', {
              style: {
                background: 'rgba(255,255,255,0.2)', padding: '3px 10px', borderRadius: 10,
                fontSize: 11, fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: 4,
              }
            },
              React.createElement(window.lucide.Zap, { size: 11, color: '#FCD34D' }),
              `Level ${user.level}`
            ),
            React.createElement('div', {
              style: {
                background: 'rgba(249,115,22,0.3)', padding: '3px 10px', borderRadius: 10,
                fontSize: 11, fontWeight: 800, color: '#FED7AA', display: 'flex', alignItems: 'center', gap: 4,
              }
            },
              React.createElement(window.lucide.Flame, { size: 11, color: '#F97316' }),
              `${user.streak} streak`
            )
          )
        )
      ),
      // XP Bar
      React.createElement('div', { style: { position: 'relative' } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: 6 } },
          React.createElement('span', { style: { fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.85)' } }, `${user.xp} XP`),
          React.createElement('span', { style: { fontSize: 12, color: 'rgba(255,255,255,0.6)' } }, `${user.nextLevelXp} to Level ${user.level + 1}`)
        ),
        React.createElement('div', { style: { height: 8, background: 'rgba(255,255,255,0.15)', borderRadius: 8, overflow: 'hidden' } },
          React.createElement('div', {
            style: {
              height: '100%', width: `${xpPercent}%`, borderRadius: 8,
              background: 'linear-gradient(90deg, #FCD34D, #F59E0B)',
              transition: 'width 0.8s ease',
            }
          })
        )
      )
    ),

    // Stats Row
    React.createElement('div', {
      style: { display: 'flex', gap: 0, padding: '0 20px', margin: '16px 0' }
    }, [
      { label: 'Quests Done', value: user.totalQuests, icon: 'Target' },
      { label: 'Streak Days', value: user.streak, icon: 'Flame' },
      { label: 'Ideas Forged', value: 11, icon: 'Hammer' },
    ].map((s, i) =>
      React.createElement('div', {
        key: i,
        style: {
          flex: 1, textAlign: 'center', padding: '12px 8px',
          background: t.surface, borderRadius: i === 0 ? '12px 0 0 12px' : i === 2 ? '0 12px 12px 0' : 0,
          border: `1px solid ${t.border}`,
          borderRight: i < 2 ? `1px solid ${t.border}` : `1px solid ${t.border}`,
        }
      },
        React.createElement(window.lucide[s.icon], { size: 16, color: t.primary, style: { margin: '0 auto 4px' } }),
        React.createElement('div', { style: { fontSize: 18, fontWeight: 800, color: t.text } }, s.value),
        React.createElement('div', { style: { fontSize: 10, color: t.textMuted, fontWeight: 600 } }, s.label)
      )
    )),

    // Badges
    React.createElement('div', { style: { padding: '0 20px', marginBottom: 20 } },
      React.createElement('div', { style: { fontSize: 15, fontWeight: 800, color: t.text, marginBottom: 12 } }, 'Badges'),
      React.createElement('div', { style: { display: 'flex', gap: 10, flexWrap: 'wrap' } },
        user.badges.map((badge, i) =>
          React.createElement('div', {
            key: i,
            style: {
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
              opacity: badge.earned ? 1 : 0.35, cursor: badge.earned ? 'pointer' : 'default',
            }
          },
            React.createElement('div', {
              style: {
                width: 52, height: 52, borderRadius: 16,
                background: badge.earned ? `${badge.color}22` : t.bg,
                border: `2px solid ${badge.earned ? badge.color : t.border}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: badge.earned ? `0 4px 12px ${badge.color}33` : 'none',
              }
            },
              React.createElement(window.lucide[badge.icon], { size: 22, color: badge.earned ? badge.color : t.textLight })
            ),
            React.createElement('span', { style: { fontSize: 9, fontWeight: 700, color: badge.earned ? t.text : t.textLight, textAlign: 'center', maxWidth: 54 } }, badge.label)
          )
        )
      )
    ),

    // Recent Quests
    React.createElement('div', { style: { padding: '0 20px' } },
      React.createElement('div', { style: { fontSize: 15, fontWeight: 800, color: t.text, marginBottom: 12 } }, 'Quest History'),
      user.recentQuests.map((q, i) =>
        React.createElement('div', {
          key: i,
          className: 'card-hover',
          style: {
            display: 'flex', alignItems: 'center', gap: 12,
            background: t.surface, borderRadius: 12, padding: '12px 14px',
            border: `1px solid ${t.border}`, marginBottom: 8, cursor: 'pointer',
          }
        },
          React.createElement('div', {
            style: {
              width: 36, height: 36, borderRadius: 10, flexShrink: 0,
              background: t.primaryBg, display: 'flex', alignItems: 'center', justifyContent: 'center',
            }
          }, React.createElement(window.lucide.CheckCircle, { size: 17, color: t.primary })),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', { style: { fontSize: 13, fontWeight: 700, color: t.text } }, q.title),
            React.createElement('div', { style: { fontSize: 11, color: t.textMuted } }, `${q.day} · ${q.date}`)
          ),
          React.createElement('div', {
            style: {
              background: '#FEF3C7', padding: '3px 8px', borderRadius: 8,
              fontSize: 11, fontWeight: 800, color: '#D97706',
              display: 'flex', alignItems: 'center', gap: 3,
            }
          },
            React.createElement(window.lucide.Star, { size: 10, color: '#D97706' }),
            `+${q.xp}`
          )
        )
      )
    )
  );
}
