const { useState, useEffect, useRef, useCallback } = React;

function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [isDark, setIsDark] = useState(true);
  const [activeCurrent, setActiveCurrent] = useState(null);
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [echoTrailItem, setEchoTrailItem] = useState(null);

  const themes = {
    dark: {
      bg: '#0A0E1A',
      surface: '#111827',
      surfaceAlt: '#1A2035',
      card: '#151C2F',
      cardHover: '#1E2743',
      border: '#1F2937',
      borderLight: '#2A3450',
      text: '#F1F5F9',
      textSecondary: '#94A3B8',
      textMuted: '#64748B',
      primary: '#2563EB',
      secondary: '#3B82F6',
      cta: '#F97316',
      ctaHover: '#FB923C',
      accent: '#8B5CF6',
      success: '#10B981',
      danger: '#EF4444',
      gradient1: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
      gradient2: 'linear-gradient(135deg, #F97316 0%, #F59E0B 100%)',
      gradient3: 'linear-gradient(135deg, #0A0E1A 0%, #1A2035 100%)',
      glow: '0 0 20px rgba(37, 99, 235, 0.3)',
      shadow: '0 4px 20px rgba(0,0,0,0.4)',
      shadowSm: '0 2px 8px rgba(0,0,0,0.3)',
    },
    light: {
      bg: '#F8FAFC',
      surface: '#FFFFFF',
      surfaceAlt: '#F1F5F9',
      card: '#FFFFFF',
      cardHover: '#F8FAFC',
      border: '#E2E8F0',
      borderLight: '#CBD5E1',
      text: '#0F172A',
      textSecondary: '#475569',
      textMuted: '#94A3B8',
      primary: '#2563EB',
      secondary: '#3B82F6',
      cta: '#F97316',
      ctaHover: '#EA580C',
      accent: '#8B5CF6',
      success: '#10B981',
      danger: '#EF4444',
      gradient1: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
      gradient2: 'linear-gradient(135deg, #F97316 0%, #F59E0B 100%)',
      gradient3: 'linear-gradient(135deg, #F8FAFC 0%, #E2E8F0 100%)',
      glow: '0 0 20px rgba(37, 99, 235, 0.15)',
      shadow: '0 4px 20px rgba(0,0,0,0.08)',
      shadowSm: '0 2px 8px rgba(0,0,0,0.05)',
    }
  };

  const t = isDark ? themes.dark : themes.light;
  const font = "-apple-system, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif";

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
      0%, 100% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.05); opacity: 0.85; }
    }
    @keyframes shimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }
    @keyframes waveform {
      0%, 100% { height: 8px; }
      50% { height: 24px; }
    }
    @keyframes ripple {
      0% { transform: scale(0.8); opacity: 0.6; }
      100% { transform: scale(2.5); opacity: 0; }
    }
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-6px); }
    }
    @keyframes gradientShift {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    * { scrollbar-width: none; -ms-overflow-style: none; }
    *::-webkit-scrollbar { display: none; }
  `);

  // Lucide icons
  const icons = window.lucide || {};
  const Icon = ({ name, size = 24, color = t.text, style = {} }) => {
    const iconFn = icons[name];
    if (!iconFn) return React.createElement('span', { style: { width: size, height: size, display: 'inline-block', ...style } });
    const svgStr = iconFn.toString ? null : null;
    const ref = useRef(null);
    useEffect(() => {
      if (ref.current) {
        ref.current.innerHTML = '';
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', size);
        svg.setAttribute('height', size);
        svg.setAttribute('viewBox', '0 0 24 24');
        svg.setAttribute('fill', 'none');
        svg.setAttribute('stroke', color);
        svg.setAttribute('stroke-width', '2');
        svg.setAttribute('stroke-linecap', 'round');
        svg.setAttribute('stroke-linejoin', 'round');
        const iconData = icons[name];
        if (iconData && Array.isArray(iconData)) {
          iconData.forEach(([tag, attrs]) => {
            const el = document.createElementNS('http://www.w3.org/2000/svg', tag);
            Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
            svg.appendChild(el);
          });
          ref.current.appendChild(svg);
        }
      }
    }, [name, size, color]);
    return React.createElement('span', {
      ref,
      style: { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: size, height: size, ...style }
    });
  };

  // Shared components
  const LiveDot = ({ size = 8, color = '#EF4444' }) => React.createElement('span', {
    style: {
      width: size, height: size, borderRadius: '50%', background: color,
      display: 'inline-block', marginRight: 6,
      boxShadow: `0 0 ${size}px ${color}`,
      animation: 'pulse 2s ease-in-out infinite'
    }
  });

  const WaveformBar = ({ delay = 0, color = t.primary }) => React.createElement('span', {
    style: {
      width: 3, height: 8, borderRadius: 2, background: color,
      display: 'inline-block', margin: '0 1px',
      animation: `waveform 1.2s ease-in-out ${delay}s infinite`
    }
  });

  const Waveform = ({ color = t.primary }) => React.createElement('span', {
    style: { display: 'inline-flex', alignItems: 'center', gap: 1, height: 24 }
  }, ...[0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9].map((d, i) =>
    React.createElement(WaveformBar, { key: i, delay: d, color })
  ));

  const Badge = ({ children, color = t.primary, style: s = {} }) => React.createElement('span', {
    style: {
      display: 'inline-flex', alignItems: 'center', padding: '4px 10px',
      borderRadius: 12, fontSize: 11, fontWeight: 600, fontFamily: font,
      background: color + '20', color: color, letterSpacing: 0.3, ...s
    }
  }, children);

  const Button = ({ children, primary, small, style: s = {}, onClick }) => React.createElement('button', {
    onClick,
    style: {
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
      padding: small ? '8px 16px' : '12px 24px',
      borderRadius: small ? 10 : 14,
      border: primary ? 'none' : `1px solid ${t.border}`,
      background: primary ? t.gradient1 : 'transparent',
      color: primary ? '#fff' : t.text,
      fontSize: small ? 13 : 15, fontWeight: 600, fontFamily: font,
      cursor: 'pointer', transition: 'all 200ms ease',
      minHeight: 44, minWidth: 44, ...s
    }
  }, children);

  // ===== HOME SCREEN =====
  const HomeScreen = () => {
    const [pressedCard, setPressedCard] = useState(null);

    const liveCurrents = [
      { id: 1, name: 'Glitch Garden', participants: 234, conductor: 'AetherMind', theme: 'Digital flora meets corrupted data', gradient: 'linear-gradient(135deg, #10B981 0%, #059669 50%, #047857 100%)', timeLeft: '18:42', intensity: 87 },
      { id: 2, name: 'Dreamweave Drift', participants: 156, conductor: 'LunaSynth', theme: 'Lucid landscapes in watercolor mist', gradient: 'linear-gradient(135deg, #8B5CF6 0%, #6D28D9 50%, #5B21B6 100%)', timeLeft: '32:15', intensity: 64 },
      { id: 3, name: 'Sonic Sculptors', participants: 89, conductor: 'WaveForge', theme: 'Architecture built from sound waves', gradient: 'linear-gradient(135deg, #F97316 0%, #EA580C 50%, #DC2626 100%)', timeLeft: '45:30', intensity: 92 },
    ];

    const upcomingRises = [
      { id: 4, name: 'Neon Mythology', time: '8:00 PM', channel: 'Cyberpunk Lore', subscribers: 1240 },
      { id: 5, name: 'Fractal Feelings', time: '9:30 PM', channel: 'Abstract Emotion', subscribers: 870 },
      { id: 6, name: 'Moss & Metal', time: 'Tomorrow 2PM', channel: 'Organic Tech', subscribers: 560 },
    ];

    const recentEchoes = [
      { id: 1, title: 'Crystalline Cascade', contributors: 312, pieces: 2847, mood: 'Transcendent' },
      { id: 2, title: 'Rust & Reverie', contributors: 198, pieces: 1563, mood: 'Melancholic' },
    ];

    return React.createElement('div', {
      style: { padding: '0 16px', paddingBottom: 100, animation: 'fadeIn 0.4s ease' }
    },
      // Header
      React.createElement('div', {
        style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0 20px' }
      },
        React.createElement('div', null,
          React.createElement('h1', {
            style: { fontSize: 34, fontWeight: 800, color: t.text, fontFamily: font, letterSpacing: -0.5, margin: 0, lineHeight: 1.1 }
          }, 'EchoWeave'),
          React.createElement('p', {
            style: { fontSize: 13, color: t.textMuted, fontFamily: font, margin: '4px 0 0', fontWeight: 400 }
          }, 'Co-create live with AI currents')
        ),
        React.createElement('div', { style: { display: 'flex', gap: 8, alignItems: 'center' } },
          React.createElement('button', {
            onClick: () => setIsDark(!isDark),
            style: {
              width: 40, height: 40, borderRadius: 20, border: `1px solid ${t.border}`,
              background: t.surfaceAlt, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
            }
          }, React.createElement(Icon, { name: isDark ? 'Sun' : 'Moon', size: 18, color: t.textSecondary })),
          React.createElement('button', {
            style: {
              width: 40, height: 40, borderRadius: 20, border: `1px solid ${t.border}`,
              background: t.surfaceAlt, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
            }
          }, React.createElement(Icon, { name: 'Bell', size: 18, color: t.textSecondary }))
        )
      ),

      // Live Now Section
      React.createElement('div', { style: { marginBottom: 28 } },
        React.createElement('div', {
          style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }
        },
          React.createElement(LiveDot, { size: 10 }),
          React.createElement('h2', {
            style: { fontSize: 22, fontWeight: 700, color: t.text, fontFamily: font, margin: 0, letterSpacing: -0.3 }
          }, 'Live Current Rises')
        ),

        // Horizontal scroll of live cards
        React.createElement('div', {
          style: { display: 'flex', gap: 14, overflowX: 'auto', paddingBottom: 8, margin: '0 -16px', padding: '0 16px 8px' }
        },
          ...liveCurrents.map((c, i) => React.createElement('div', {
            key: c.id,
            onClick: () => { setActiveCurrent(c); setActiveScreen('live'); },
            onMouseDown: () => setPressedCard(c.id),
            onMouseUp: () => setPressedCard(null),
            onMouseLeave: () => setPressedCard(null),
            style: {
              minWidth: 280, borderRadius: 20, overflow: 'hidden', cursor: 'pointer',
              background: c.gradient, position: 'relative',
              transform: pressedCard === c.id ? 'scale(0.97)' : 'scale(1)',
              transition: 'transform 200ms ease',
              boxShadow: t.shadow,
              animation: `slideUp 0.5s ease ${i * 0.1}s both`
            }
          },
            // Overlay
            React.createElement('div', {
              style: {
                position: 'absolute', inset: 0,
                background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.6) 100%)'
              }
            }),
            React.createElement('div', { style: { position: 'relative', padding: 20, height: 180, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' } },
              React.createElement('div', null,
                React.createElement('div', {
                  style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }
                },
                  React.createElement(Badge, { color: '#fff', style: { background: 'rgba(255,255,255,0.2)', color: '#fff' } },
                    React.createElement(LiveDot, { size: 6 }), ' LIVE'
                  ),
                  React.createElement('span', {
                    style: { fontSize: 13, color: 'rgba(255,255,255,0.8)', fontFamily: font, fontWeight: 500 }
                  }, c.timeLeft, ' left')
                ),
                React.createElement('h3', {
                  style: { fontSize: 22, fontWeight: 700, color: '#fff', fontFamily: font, margin: '4px 0', letterSpacing: -0.3 }
                }, c.name),
                React.createElement('p', {
                  style: { fontSize: 13, color: 'rgba(255,255,255,0.7)', fontFamily: font, margin: 0, lineHeight: 1.4 }
                }, c.theme)
              ),
              React.createElement('div', {
                style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' }
              },
                React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6 } },
                  React.createElement(Icon, { name: 'Users', size: 14, color: 'rgba(255,255,255,0.8)' }),
                  React.createElement('span', {
                    style: { fontSize: 13, color: 'rgba(255,255,255,0.8)', fontFamily: font, fontWeight: 500 }
                  }, c.participants, ' weaving')
                ),
                React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6 } },
                  React.createElement(Waveform, { color: 'rgba(255,255,255,0.6)' }),
                  React.createElement('span', {
                    style: { fontSize: 11, color: 'rgba(255,255,255,0.6)', fontFamily: font }
                  }, c.intensity, '%')
                )
              )
            )
          ))
        )
      ),

      // Upcoming Rises
      React.createElement('div', { style: { marginBottom: 28 } },
        React.createElement('div', {
          style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }
        },
          React.createElement('h2', {
            style: { fontSize: 22, fontWeight: 700, color: t.text, fontFamily: font, margin: 0, letterSpacing: -0.3 }
          }, 'Upcoming Rises'),
          React.createElement('button', {
            onClick: () => setActiveScreen('explore'),
            style: { fontSize: 13, color: t.primary, fontFamily: font, fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', minHeight: 44, minWidth: 44, display: 'flex', alignItems: 'center' }
          }, 'See All')
        ),
        ...upcomingRises.map((r, i) => React.createElement('div', {
          key: r.id,
          style: {
            display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px',
            background: t.card, borderRadius: 16, marginBottom: 8,
            border: `1px solid ${t.border}`, cursor: 'pointer',
            transition: 'all 200ms ease',
            animation: `fadeIn 0.4s ease ${0.2 + i * 0.1}s both`
          }
        },
          React.createElement('div', {
            style: {
              width: 48, height: 48, borderRadius: 14, background: t.gradient1,
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
            }
          }, React.createElement(Icon, { name: 'Clock', size: 20, color: '#fff' })),
          React.createElement('div', { style: { flex: 1, minWidth: 0 } },
            React.createElement('h4', {
              style: { fontSize: 15, fontWeight: 600, color: t.text, fontFamily: font, margin: 0 }
            }, r.name),
            React.createElement('p', {
              style: { fontSize: 13, color: t.textMuted, fontFamily: font, margin: '2px 0 0' }
            }, r.channel, ' \u00B7 ', r.subscribers, ' subscribers')
          ),
          React.createElement('div', { style: { textAlign: 'right', flexShrink: 0 } },
            React.createElement('span', {
              style: { fontSize: 13, fontWeight: 600, color: t.cta, fontFamily: font }
            }, r.time),
            React.createElement('div', null,
              React.createElement(Button, {
                small: true,
                style: { fontSize: 11, padding: '4px 12px', minHeight: 32, marginTop: 4, background: t.cta + '15', color: t.cta, border: 'none' }
              }, 'Remind')
            )
          )
        ))
      ),

      // Recent Echoes
      React.createElement('div', { style: { marginBottom: 20 } },
        React.createElement('h2', {
          style: { fontSize: 22, fontWeight: 700, color: t.text, fontFamily: font, margin: '0 0 14px', letterSpacing: -0.3 }
        }, 'Recent Echoes'),
        ...recentEchoes.map((e, i) => React.createElement('div', {
          key: e.id,
          onClick: () => { setEchoTrailItem(e); setActiveScreen('echo'); },
          style: {
            padding: 16, background: t.card, borderRadius: 16, marginBottom: 8,
            border: `1px solid ${t.border}`, cursor: 'pointer',
            transition: 'all 200ms ease',
            animation: `fadeIn 0.4s ease ${0.4 + i * 0.1}s both`
          }
        },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 } },
            React.createElement('h4', {
              style: { fontSize: 17, fontWeight: 600, color: t.text, fontFamily: font, margin: 0 }
            }, e.title),
            React.createElement(Badge, { color: t.accent }, e.mood)
          ),
          React.createElement('div', { style: { display: 'flex', gap: 20 } },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6 } },
              React.createElement(Icon, { name: 'Users', size: 14, color: t.textMuted }),
              React.createElement('span', { style: { fontSize: 13, color: t.textMuted, fontFamily: font } }, e.contributors, ' contributors')
            ),
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6 } },
              React.createElement(Icon, { name: 'Layers', size: 14, color: t.textMuted }),
              React.createElement('span', { style: { fontSize: 13, color: t.textMuted, fontFamily: font } }, e.pieces.toLocaleString(), ' pieces')
            )
          )
        ))
      )
    );
  };

  // ===== EXPLORE SCREEN =====
  const ExploreScreen = () => {
    const [searchFocused, setSearchFocused] = useState(false);
    const [activeFilter, setActiveFilter] = useState('all');

    const filters = ['all', 'visual', 'audio', 'text', 'mixed'];

    const channels = [
      { id: 1, name: 'Glitch Garden', desc: 'Digital flora meets corrupted data streams', subscribers: 3420, color: '#10B981', icon: 'Flower2', nextRise: '2h 15m' },
      { id: 2, name: 'Dreamweave Drift', desc: 'Lucid landscapes painted in watercolor mist', subscribers: 2850, color: '#8B5CF6', icon: 'Cloud', nextRise: '4h 30m' },
      { id: 3, name: 'Sonic Sculptors', desc: 'Architecture built from sound and vibration', subscribers: 1920, color: '#F97316', icon: 'Music', nextRise: '1h 45m' },
      { id: 4, name: 'Neon Mythology', desc: 'Ancient legends reimagined in cyberpunk neon', subscribers: 1240, color: '#EC4899', icon: 'Zap', nextRise: '6h' },
      { id: 5, name: 'Fractal Feelings', desc: 'Emotions rendered as infinite mathematical patterns', subscribers: 870, color: '#06B6D4', icon: 'Hexagon', nextRise: '8h 20m' },
      { id: 6, name: 'Moss & Metal', desc: 'Where organic growth overtakes industrial decay', subscribers: 560, color: '#84CC16', icon: 'Leaf', nextRise: 'Tomorrow' },
    ];

    const trending = [
      { tag: 'bioluminescent', count: 4520 },
      { tag: 'time-lapse-weave', count: 3180 },
      { tag: 'synth-coral', count: 2750 },
      { tag: 'void-bloom', count: 1900 },
    ];

    return React.createElement('div', {
      style: { padding: '0 16px', paddingBottom: 100, animation: 'fadeIn 0.4s ease' }
    },
      React.createElement('div', { style: { padding: '16px 0 12px' } },
        React.createElement('h1', {
          style: { fontSize: 34, fontWeight: 800, color: t.text, fontFamily: font, letterSpacing: -0.5, margin: '0 0 16px' }
        }, 'Explore Currents')
      ),

      // Search bar
      React.createElement('div', {
        style: {
          display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px',
          background: t.surfaceAlt, borderRadius: 14, marginBottom: 16,
          border: `1px solid ${searchFocused ? t.primary : t.border}`,
          transition: 'border-color 200ms ease'
        }
      },
        React.createElement(Icon, { name: 'Search', size: 18, color: t.textMuted }),
        React.createElement('input', {
          placeholder: 'Search currents, channels, tags...',
          onFocus: () => setSearchFocused(true),
          onBlur: () => setSearchFocused(false),
          style: {
            flex: 1, background: 'none', border: 'none', outline: 'none',
            fontSize: 15, color: t.text, fontFamily: font
          }
        })
      ),

      // Filter pills
      React.createElement('div', {
        style: { display: 'flex', gap: 8, marginBottom: 20, overflowX: 'auto' }
      },
        ...filters.map(f => React.createElement('button', {
          key: f,
          onClick: () => setActiveFilter(f),
          style: {
            padding: '8px 18px', borderRadius: 20, border: 'none',
            background: activeFilter === f ? t.primary : t.surfaceAlt,
            color: activeFilter === f ? '#fff' : t.textSecondary,
            fontSize: 13, fontWeight: 600, fontFamily: font, cursor: 'pointer',
            textTransform: 'capitalize', whiteSpace: 'nowrap',
            transition: 'all 200ms ease', minHeight: 44
          }
        }, f))
      ),

      // Trending tags
      React.createElement('div', { style: { marginBottom: 24 } },
        React.createElement('h3', {
          style: { fontSize: 15, fontWeight: 600, color: t.textSecondary, fontFamily: font, margin: '0 0 10px', textTransform: 'uppercase', letterSpacing: 1 }
        }, 'Trending Tags'),
        React.createElement('div', { style: { display: 'flex', flexWrap: 'wrap', gap: 8 } },
          ...trending.map(tag => React.createElement('span', {
            key: tag.tag,
            style: {
              padding: '8px 14px', borderRadius: 12, fontSize: 13, fontWeight: 500,
              background: t.card, color: t.primary, fontFamily: font,
              border: `1px solid ${t.border}`, cursor: 'pointer',
              transition: 'all 200ms ease'
            }
          }, '#', tag.tag, React.createElement('span', { style: { color: t.textMuted, marginLeft: 6, fontSize: 11 } }, tag.count.toLocaleString())))
        )
      ),

      // Identity Currents grid
      React.createElement('h3', {
        style: { fontSize: 22, fontWeight: 700, color: t.text, fontFamily: font, margin: '0 0 14px', letterSpacing: -0.3 }
      }, 'Identity Currents'),
      React.createElement('div', {
        style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }
      },
        ...channels.map((ch, i) => React.createElement('div', {
          key: ch.id,
          onClick: () => { setSelectedChannel(ch); setActiveScreen('channel'); },
          style: {
            padding: 16, background: t.card, borderRadius: 18,
            border: `1px solid ${t.border}`, cursor: 'pointer',
            transition: 'all 200ms ease',
            animation: `fadeIn 0.4s ease ${i * 0.08}s both`
          }
        },
          React.createElement('div', {
            style: {
              width: 44, height: 44, borderRadius: 14, background: ch.color + '20',
              display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10
            }
          }, React.createElement(Icon, { name: ch.icon, size: 22, color: ch.color })),
          React.createElement('h4', {
            style: { fontSize: 15, fontWeight: 600, color: t.text, fontFamily: font, margin: '0 0 4px' }
          }, ch.name),
          React.createElement('p', {
            style: { fontSize: 12, color: t.textMuted, fontFamily: font, margin: '0 0 10px', lineHeight: 1.4 }
          }, ch.desc),
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
            React.createElement('span', {
              style: { fontSize: 11, color: t.textSecondary, fontFamily: font }
            }, ch.subscribers.toLocaleString(), ' subs'),
            React.createElement('span', {
              style: { fontSize: 11, color: ch.color, fontWeight: 600, fontFamily: font }
            }, ch.nextRise)
          )
        ))
      )
    );
  };

  // ===== LIVE SESSION SCREEN =====
  const LiveScreen = () => {
    const current = activeCurrent || { name: 'Glitch Garden', participants: 234, conductor: 'AetherMind', theme: 'Digital flora meets corrupted data', gradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)', timeLeft: '18:42', intensity: 87 };
    const [contributionType, setContributionType] = useState('draw');
    const [moodValue, setMoodValue] = useState(72);
    const [showPrompt, setShowPrompt] = useState(true);

    const contributions = [
      { user: 'aurora_weaver', type: 'visual', time: '2s ago', impact: 94 },
      { user: 'glitch.fox', type: 'text', time: '5s ago', impact: 78 },
      { user: 'neon_drift', type: 'audio', time: '8s ago', impact: 85 },
      { user: 'pixel_moth', type: 'visual', time: '12s ago', impact: 91 },
      { user: 'bass_thread', type: 'audio', time: '15s ago', impact: 67 },
    ];

    const aiAgents = [
      { name: 'Conductor', status: 'Generating prompt...', icon: 'Wand2', color: t.cta },
      { name: 'Weaver', status: 'Integrating 3 pieces', icon: 'Workflow', color: t.accent },
      { name: 'RemiXer', status: 'Transforming visual', icon: 'Sparkles', color: t.success },
    ];

    return React.createElement('div', {
      style: { padding: 0, paddingBottom: 100, animation: 'fadeIn 0.3s ease' }
    },
      // Canvas area
      React.createElement('div', {
        style: {
          height: 300, background: current.gradient, position: 'relative', overflow: 'hidden'
        }
      },
        // Animated overlay grid
        React.createElement('div', {
          style: {
            position: 'absolute', inset: 0,
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255,255,255,0.05) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(255,255,255,0.08) 0%, transparent 40%)`,
            animation: 'gradientShift 8s ease infinite',
            backgroundSize: '200% 200%'
          }
        }),
        // Top bar
        React.createElement('div', {
          style: {
            position: 'absolute', top: 0, left: 0, right: 0, padding: '12px 16px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            background: 'linear-gradient(180deg, rgba(0,0,0,0.5) 0%, transparent 100%)'
          }
        },
          React.createElement('button', {
            onClick: () => setActiveScreen('home'),
            style: { width: 44, height: 44, borderRadius: 22, background: 'rgba(0,0,0,0.3)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }
          }, React.createElement(Icon, { name: 'ArrowLeft', size: 20, color: '#fff' })),
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6 } },
            React.createElement(LiveDot, {}),
            React.createElement('span', { style: { fontSize: 15, fontWeight: 600, color: '#fff', fontFamily: font } }, current.timeLeft, ' remaining')
          ),
          React.createElement('div', { style: { display: 'flex', gap: 8 } },
            React.createElement('button', {
              style: { width: 44, height: 44, borderRadius: 22, background: 'rgba(0,0,0,0.3)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }
            }, React.createElement(Icon, { name: 'Users', size: 18, color: '#fff' })),
            React.createElement('span', { style: { position: 'absolute', right: 16, top: 8, fontSize: 11, color: '#fff', fontWeight: 600, background: t.cta, padding: '2px 6px', borderRadius: 8, fontFamily: font } }, current.participants)
          )
        ),
        // Center canvas placeholder with ripple
        React.createElement('div', {
          style: { position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }
        },
          React.createElement('div', {
            style: {
              width: 80, height: 80, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px',
              position: 'relative'
            }
          },
            React.createElement('div', {
              style: {
                position: 'absolute', width: '100%', height: '100%', borderRadius: '50%',
                border: '1px solid rgba(255,255,255,0.2)', animation: 'ripple 2s ease-out infinite'
              }
            }),
            React.createElement(Icon, { name: 'Paintbrush', size: 32, color: '#fff' })
          ),
          React.createElement('p', { style: { fontSize: 13, color: 'rgba(255,255,255,0.7)', fontFamily: font } }, 'Tap to contribute')
        )
      ),

      // AI Conductor Prompt
      showPrompt && React.createElement('div', {
        style: {
          margin: '0 16px', marginTop: -20, padding: 16, borderRadius: 16,
          background: t.card, border: `1px solid ${t.border}`,
          boxShadow: t.shadow, position: 'relative', zIndex: 2
        }
      },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 } },
          React.createElement(Icon, { name: 'Wand2', size: 16, color: t.cta }),
          React.createElement('span', { style: { fontSize: 13, fontWeight: 600, color: t.cta, fontFamily: font } }, 'AI Conductor \u00B7 ', current.conductor),
          React.createElement('button', {
            onClick: () => setShowPrompt(false),
            style: { marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer', minWidth: 44, minHeight: 44, display: 'flex', alignItems: 'center', justifyContent: 'center' }
          }, React.createElement(Icon, { name: 'X', size: 16, color: t.textMuted }))
        ),
        React.createElement('p', {
          style: { fontSize: 17, fontWeight: 500, color: t.text, fontFamily: font, margin: 0, lineHeight: 1.5 }
        }, '"Imagine roots becoming circuits \u2014 draw the moment organic meets digital"'),
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginTop: 10 } },
          React.createElement(Waveform, { color: t.cta }),
          React.createElement('span', { style: { fontSize: 11, color: t.textMuted, fontFamily: font } }, 'Prompt evolving in 45s')
        )
      ),

      // Contribution tools
      React.createElement('div', {
        style: { display: 'flex', gap: 8, padding: '16px', justifyContent: 'center' }
      },
        ...[
          { id: 'draw', icon: 'Pencil', label: 'Draw' },
          { id: 'text', icon: 'Type', label: 'Text' },
          { id: 'audio', icon: 'Mic', label: 'Sound' },
          { id: 'photo', icon: 'Camera', label: 'Photo' },
        ].map(tool => React.createElement('button', {
          key: tool.id,
          onClick: () => setContributionType(tool.id),
          style: {
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
            padding: '10px 16px', borderRadius: 14, border: 'none',
            background: contributionType === tool.id ? t.primary : t.surfaceAlt,
            color: contributionType === tool.id ? '#fff' : t.textSecondary,
            cursor: 'pointer', transition: 'all 200ms ease', minWidth: 64, minHeight: 44,
            fontFamily: font, fontSize: 11, fontWeight: 500
          }
        },
          React.createElement(Icon, { name: tool.icon, size: 20, color: contributionType === tool.id ? '#fff' : t.textSecondary }),
          React.createElement('span', null, tool.label)
        ))
      ),

      // AI Agents status
      React.createElement('div', { style: { padding: '0 16px', marginBottom: 16 } },
        React.createElement('h3', {
          style: { fontSize: 15, fontWeight: 600, color: t.textSecondary, fontFamily: font, margin: '0 0 10px', textTransform: 'uppercase', letterSpacing: 1 }
        }, 'AI Agents'),
        React.createElement('div', { style: { display: 'flex', gap: 8 } },
          ...aiAgents.map(agent => React.createElement('div', {
            key: agent.name,
            style: {
              flex: 1, padding: 12, borderRadius: 14, background: t.surfaceAlt,
              border: `1px solid ${t.border}`, textAlign: 'center'
            }
          },
            React.createElement(Icon, { name: agent.icon, size: 18, color: agent.color }),
            React.createElement('div', { style: { fontSize: 12, fontWeight: 600, color: t.text, fontFamily: font, marginTop: 4 } }, agent.name),
            React.createElement('div', { style: { fontSize: 10, color: agent.color, fontFamily: font, marginTop: 2 } }, agent.status)
          ))
        )
      ),

      // Reactive mood bar
      React.createElement('div', { style: { padding: '0 16px', marginBottom: 16 } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 } },
          React.createElement('span', { style: { fontSize: 13, fontWeight: 600, color: t.textSecondary, fontFamily: font } }, 'Collective Mood'),
          React.createElement('span', { style: { fontSize: 13, fontWeight: 600, color: t.success, fontFamily: font } }, 'Euphoric ', moodValue, '%')
        ),
        React.createElement('div', {
          style: { height: 6, borderRadius: 3, background: t.surfaceAlt, overflow: 'hidden' }
        },
          React.createElement('div', {
            style: {
              width: moodValue + '%', height: '100%', borderRadius: 3,
              background: 'linear-gradient(90deg, #10B981, #3B82F6, #8B5CF6)',
              transition: 'width 1s ease'
            }
          })
        )
      ),

      // Live feed
      React.createElement('div', { style: { padding: '0 16px' } },
        React.createElement('h3', {
          style: { fontSize: 15, fontWeight: 600, color: t.textSecondary, fontFamily: font, margin: '0 0 10px', textTransform: 'uppercase', letterSpacing: 1 }
        }, 'Live Contributions'),
        ...contributions.map((c, i) => React.createElement('div', {
          key: i,
          style: {
            display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0',
            borderBottom: i < contributions.length - 1 ? `1px solid ${t.border}` : 'none',
            animation: `fadeIn 0.3s ease ${i * 0.05}s both`
          }
        },
          React.createElement('div', {
            style: {
              width: 32, height: 32, borderRadius: 10,
              background: ['#10B981', '#3B82F6', '#F97316', '#8B5CF6', '#EC4899'][i] + '20',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
            }
          }, React.createElement(Icon, { name: c.type === 'visual' ? 'Paintbrush' : c.type === 'text' ? 'Type' : 'Music', size: 14, color: ['#10B981', '#3B82F6', '#F97316', '#8B5CF6', '#EC4899'][i] })),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('span', { style: { fontSize: 14, fontWeight: 500, color: t.text, fontFamily: font } }, c.user),
            React.createElement('span', { style: { fontSize: 12, color: t.textMuted, fontFamily: font, marginLeft: 6 } }, c.time)
          ),
          React.createElement('div', {
            style: {
              padding: '2px 8px', borderRadius: 8, fontSize: 11, fontWeight: 600,
              background: c.impact > 85 ? t.success + '20' : t.primary + '15',
              color: c.impact > 85 ? t.success : t.primary, fontFamily: font
            }
          }, c.impact, '% impact')
        ))
      )
    );
  };

  // ===== ECHO TRAIL SCREEN =====
  const EchoScreen = () => {
    const echo = echoTrailItem || { title: 'Crystalline Cascade', contributors: 312, pieces: 2847, mood: 'Transcendent' };
    const [rewindPos, setRewindPos] = useState(75);

    const timeline = [
      { time: '0:00', event: 'Current Rise begins', type: 'system', user: 'AI Conductor' },
      { time: '0:32', event: 'First visual contribution', type: 'visual', user: 'aurora_weaver' },
      { time: '1:15', event: 'AI Weaver remix #1', type: 'ai', user: 'Weaver Agent' },
      { time: '2:44', event: 'Audio layer added', type: 'audio', user: 'bass_thread' },
      { time: '3:20', event: 'Prompt shift: "dissolve boundaries"', type: 'system', user: 'AI Conductor' },
      { time: '4:05', event: 'Collective mood peak: Euphoric', type: 'mood', user: 'System' },
      { time: '5:30', event: 'Text weave contribution', type: 'text', user: 'glitch.fox' },
      { time: '6:15', event: 'AI RemiXer transformation', type: 'ai', user: 'RemiXer Agent' },
    ];

    const contributors = [
      { name: 'aurora_weaver', contributions: 24, impact: 94, color: '#10B981' },
      { name: 'glitch.fox', contributions: 18, impact: 78, color: '#3B82F6' },
      { name: 'neon_drift', contributions: 15, impact: 85, color: '#F97316' },
      { name: 'pixel_moth', contributions: 12, impact: 91, color: '#8B5CF6' },
    ];

    return React.createElement('div', {
      style: { padding: '0 16px', paddingBottom: 100, animation: 'fadeIn 0.4s ease' }
    },
      // Header
      React.createElement('div', { style: { padding: '16px 0 20px' } },
        React.createElement('button', {
          onClick: () => setActiveScreen('home'),
          style: {
            display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none',
            color: t.primary, fontSize: 15, fontWeight: 500, fontFamily: font, cursor: 'pointer',
            marginBottom: 12, minHeight: 44, padding: 0
          }
        }, React.createElement(Icon, { name: 'ArrowLeft', size: 18, color: t.primary }), 'Back'),
        React.createElement('h1', {
          style: { fontSize: 34, fontWeight: 800, color: t.text, fontFamily: font, letterSpacing: -0.5, margin: '0 0 4px' }
        }, 'Echo Trail'),
        React.createElement('p', {
          style: { fontSize: 15, color: t.textSecondary, fontFamily: font, margin: 0 }
        }, echo.title, ' \u00B7 ', echo.mood)
      ),

      // Rewind scrubber
      React.createElement('div', {
        style: {
          padding: 16, background: t.card, borderRadius: 18,
          border: `1px solid ${t.border}`, marginBottom: 20
        }
      },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 } },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8 } },
            React.createElement(Icon, { name: 'Rewind', size: 18, color: t.accent }),
            React.createElement('span', { style: { fontSize: 15, fontWeight: 600, color: t.text, fontFamily: font } }, 'Rewind & Replay')
          ),
          React.createElement('span', { style: { fontSize: 13, color: t.textMuted, fontFamily: font } }, Math.round(rewindPos), '% through')
        ),
        // Scrubber track
        React.createElement('div', {
          style: { position: 'relative', height: 32, display: 'flex', alignItems: 'center', cursor: 'pointer' },
          onClick: (e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            setRewindPos(Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100)));
          }
        },
          React.createElement('div', {
            style: { position: 'absolute', left: 0, right: 0, height: 6, borderRadius: 3, background: t.surfaceAlt }
          }),
          React.createElement('div', {
            style: {
              position: 'absolute', left: 0, width: rewindPos + '%', height: 6, borderRadius: 3,
              background: t.gradient1
            }
          }),
          React.createElement('div', {
            style: {
              position: 'absolute', left: `calc(${rewindPos}% - 10px)`,
              width: 20, height: 20, borderRadius: 10, background: t.primary,
              boxShadow: t.glow, transition: 'left 0.1s ease'
            }
          }),
          // Event markers
          ...[10, 25, 40, 55, 70, 85].map((pos, i) => React.createElement('div', {
            key: i,
            style: {
              position: 'absolute', left: pos + '%', width: 4, height: 4, borderRadius: 2,
              background: pos < rewindPos ? t.primary : t.textMuted,
              transform: 'translateX(-2px)'
            }
          }))
        ),
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginTop: 8 } },
          React.createElement('span', { style: { fontSize: 11, color: t.textMuted, fontFamily: font } }, '0:00'),
          React.createElement('span', { style: { fontSize: 11, color: t.textMuted, fontFamily: font } }, '12:30')
        )
      ),

      // Stats row
      React.createElement('div', {
        style: { display: 'flex', gap: 8, marginBottom: 20 }
      },
        ...[
          { label: 'Contributors', value: echo.contributors, icon: 'Users', color: t.primary },
          { label: 'Pieces', value: echo.pieces.toLocaleString(), icon: 'Layers', color: t.accent },
          { label: 'AI Remixes', value: '156', icon: 'Sparkles', color: t.cta },
        ].map(stat => React.createElement('div', {
          key: stat.label,
          style: {
            flex: 1, padding: 14, borderRadius: 14, background: t.card,
            border: `1px solid ${t.border}`, textAlign: 'center'
          }
        },
          React.createElement(Icon, { name: stat.icon, size: 18, color: stat.color }),
          React.createElement('div', { style: { fontSize: 22, fontWeight: 700, color: t.text, fontFamily: font, marginTop: 4, letterSpacing: -0.3 } }, stat.value),
          React.createElement('div', { style: { fontSize: 11, color: t.textMuted, fontFamily: font, marginTop: 2 } }, stat.label)
        ))
      ),

      // Top contributors
      React.createElement('h3', {
        style: { fontSize: 17, fontWeight: 600, color: t.text, fontFamily: font, margin: '0 0 12px' }
      }, 'Top Contributors'),
      ...contributors.map((c, i) => React.createElement('div', {
        key: c.name,
        style: {
          display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px',
          background: t.card, borderRadius: 14, marginBottom: 8,
          border: `1px solid ${t.border}`,
          animation: `fadeIn 0.3s ease ${i * 0.1}s both`
        }
      },
        React.createElement('div', {
          style: {
            width: 36, height: 36, borderRadius: 12, background: c.color + '20',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 14, fontWeight: 700, color: c.color, fontFamily: font
          }
        }, '#', i + 1),
        React.createElement('div', { style: { flex: 1 } },
          React.createElement('div', { style: { fontSize: 15, fontWeight: 600, color: t.text, fontFamily: font } }, c.name),
          React.createElement('div', { style: { fontSize: 12, color: t.textMuted, fontFamily: font } }, c.contributions, ' contributions')
        ),
        React.createElement('div', {
          style: { padding: '4px 10px', borderRadius: 8, background: c.color + '15', fontSize: 13, fontWeight: 600, color: c.color, fontFamily: font }
        }, c.impact, '%')
      )),

      // Timeline
      React.createElement('h3', {
        style: { fontSize: 17, fontWeight: 600, color: t.text, fontFamily: font, margin: '20px 0 12px' }
      }, 'Event Timeline'),
      React.createElement('div', { style: { position: 'relative', paddingLeft: 24 } },
        // Vertical line
        React.createElement('div', {
          style: { position: 'absolute', left: 7, top: 4, bottom: 4, width: 2, background: t.border, borderRadius: 1 }
        }),
        ...timeline.map((item, i) => React.createElement('div', {
          key: i,
          style: { display: 'flex', gap: 12, marginBottom: 16, position: 'relative', animation: `fadeIn 0.3s ease ${i * 0.05}s both` }
        },
          React.createElement('div', {
            style: {
              position: 'absolute', left: -20, width: 12, height: 12, borderRadius: 6,
              background: item.type === 'ai' ? t.accent : item.type === 'system' ? t.cta : item.type === 'mood' ? t.success : t.primary,
              border: `2px solid ${t.bg}`, top: 2
            }
          }),
          React.createElement('div', null,
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 } },
              React.createElement('span', { style: { fontSize: 11, color: t.textMuted, fontFamily: font, fontWeight: 500 } }, item.time),
              React.createElement('span', { style: { fontSize: 11, color: item.type === 'ai' ? t.accent : t.textMuted, fontFamily: font } }, '\u00B7 ', item.user)
            ),
            React.createElement('p', { style: { fontSize: 14, color: t.text, fontFamily: font, margin: 0 } }, item.event)
          )
        ))
      )
    );
  };

  // ===== CHANNEL DETAIL SCREEN =====
  const ChannelScreen = () => {
    const ch = selectedChannel || { id: 1, name: 'Glitch Garden', desc: 'Digital flora meets corrupted data streams', subscribers: 3420, color: '#10B981', icon: 'Flower2', nextRise: '2h 15m' };
    const [subscribed, setSubscribed] = useState(false);

    const recentSessions = [
      { title: 'Root Systems v2.1', date: 'Today', participants: 178, pieces: 1432, mood: 'Meditative' },
      { title: 'Pixel Petals', date: 'Yesterday', participants: 234, pieces: 2103, mood: 'Vibrant' },
      { title: 'Data Bloom', date: 'Apr 17', participants: 145, pieces: 987, mood: 'Mysterious' },
    ];

    return React.createElement('div', {
      style: { padding: 0, paddingBottom: 100, animation: 'fadeIn 0.3s ease' }
    },
      // Hero
      React.createElement('div', {
        style: {
          height: 200, background: `linear-gradient(135deg, ${ch.color}33 0%, ${t.bg} 100%)`,
          position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
          padding: 20
        }
      },
        React.createElement('button', {
          onClick: () => setActiveScreen('explore'),
          style: {
            position: 'absolute', top: 12, left: 12, width: 44, height: 44, borderRadius: 22,
            background: t.card + 'cc', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }
        }, React.createElement(Icon, { name: 'ArrowLeft', size: 20, color: t.text })),
        React.createElement('div', {
          style: {
            width: 56, height: 56, borderRadius: 18, background: ch.color + '30',
            display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12,
            border: `2px solid ${ch.color}50`
          }
        }, React.createElement(Icon, { name: ch.icon, size: 28, color: ch.color })),
        React.createElement('h1', {
          style: { fontSize: 28, fontWeight: 800, color: t.text, fontFamily: font, letterSpacing: -0.5, margin: '0 0 4px' }
        }, ch.name),
        React.createElement('p', { style: { fontSize: 15, color: t.textSecondary, fontFamily: font, margin: 0 } }, ch.desc)
      ),

      React.createElement('div', { style: { padding: '0 16px' } },
        // Stats & subscribe
        React.createElement('div', {
          style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0', borderBottom: `1px solid ${t.border}`, marginBottom: 20 }
        },
          React.createElement('div', { style: { display: 'flex', gap: 24 } },
            React.createElement('div', null,
              React.createElement('div', { style: { fontSize: 22, fontWeight: 700, color: t.text, fontFamily: font } }, ch.subscribers.toLocaleString()),
              React.createElement('div', { style: { fontSize: 12, color: t.textMuted, fontFamily: font } }, 'Subscribers')
            ),
            React.createElement('div', null,
              React.createElement('div', { style: { fontSize: 22, fontWeight: 700, color: t.text, fontFamily: font } }, '47'),
              React.createElement('div', { style: { fontSize: 12, color: t.textMuted, fontFamily: font } }, 'Sessions')
            )
          ),
          React.createElement('button', {
            onClick: () => setSubscribed(!subscribed),
            style: {
              padding: '12px 24px', borderRadius: 14, border: 'none',
              background: subscribed ? t.surfaceAlt : ch.color,
              color: subscribed ? t.textSecondary : '#fff',
              fontSize: 15, fontWeight: 600, fontFamily: font, cursor: 'pointer',
              transition: 'all 200ms ease', minHeight: 44
            }
          }, subscribed ? 'Subscribed' : 'Subscribe')
        ),

        // Next rise
        React.createElement('div', {
          style: {
            padding: 16, borderRadius: 16, background: ch.color + '10',
            border: `1px solid ${ch.color}30`, marginBottom: 20,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between'
          }
        },
          React.createElement('div', null,
            React.createElement('div', { style: { fontSize: 13, color: t.textMuted, fontFamily: font, marginBottom: 2 } }, 'Next Current Rise'),
            React.createElement('div', { style: { fontSize: 22, fontWeight: 700, color: ch.color, fontFamily: font } }, ch.nextRise),
          ),
          React.createElement(Button, {
            primary: true,
            style: { background: ch.color }
          },
            React.createElement(Icon, { name: 'Bell', size: 16, color: '#fff' }),
            'Remind Me'
          )
        ),

        // Recent sessions
        React.createElement('h3', {
          style: { fontSize: 17, fontWeight: 600, color: t.text, fontFamily: font, margin: '0 0 12px' }
        }, 'Recent Sessions'),
        ...recentSessions.map((s, i) => React.createElement('div', {
          key: i,
          onClick: () => { setEchoTrailItem(s); setActiveScreen('echo'); },
          style: {
            padding: 16, background: t.card, borderRadius: 16, marginBottom: 8,
            border: `1px solid ${t.border}`, cursor: 'pointer',
            animation: `fadeIn 0.3s ease ${i * 0.1}s both`
          }
        },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: 8 } },
            React.createElement('h4', { style: { fontSize: 15, fontWeight: 600, color: t.text, fontFamily: font, margin: 0 } }, s.title),
            React.createElement(Badge, { color: ch.color }, s.mood)
          ),
          React.createElement('div', { style: { display: 'flex', gap: 16, fontSize: 13, color: t.textMuted, fontFamily: font } },
            React.createElement('span', null, s.date),
            React.createElement('span', null, s.participants, ' weavers'),
            React.createElement('span', null, s.pieces.toLocaleString(), ' pieces')
          )
        ))
      )
    );
  };

  // ===== PROFILE SCREEN =====
  const ProfileScreen = () => {
    const stats = [
      { label: 'Sessions', value: '47', icon: 'Zap' },
      { label: 'Contributions', value: '1,283', icon: 'Layers' },
      { label: 'Avg Impact', value: '84%', icon: 'TrendingUp' },
      { label: 'Streaks', value: '12d', icon: 'Flame' },
    ];

    const badges = [
      { name: 'First Weave', desc: 'Complete your first session', color: '#10B981', earned: true },
      { name: 'Night Owl', desc: '10 sessions after midnight', color: '#8B5CF6', earned: true },
      { name: 'Echo Master', desc: '100+ impact score', color: '#F97316', earned: true },
      { name: 'Conductor', desc: 'Lead a Current Rise', color: '#EC4899', earned: false },
    ];

    const subscriptions = [
      { name: 'Glitch Garden', color: '#10B981', icon: 'Flower2' },
      { name: 'Sonic Sculptors', color: '#F97316', icon: 'Music' },
      { name: 'Fractal Feelings', color: '#06B6D4', icon: 'Hexagon' },
    ];

    return React.createElement('div', {
      style: { padding: '0 16px', paddingBottom: 100, animation: 'fadeIn 0.4s ease' }
    },
      // Profile header
      React.createElement('div', { style: { textAlign: 'center', padding: '24px 0 20px' } },
        React.createElement('div', {
          style: {
            width: 80, height: 80, borderRadius: 28, margin: '0 auto 14px',
            background: t.gradient1, display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: t.glow
          }
        }, React.createElement(Icon, { name: 'User', size: 36, color: '#fff' })),
        React.createElement('h1', {
          style: { fontSize: 22, fontWeight: 700, color: t.text, fontFamily: font, margin: '0 0 4px' }
        }, 'aurora_weaver'),
        React.createElement('p', { style: { fontSize: 15, color: t.textSecondary, fontFamily: font, margin: '0 0 4px' } }, 'Visual artist & sound explorer'),
        React.createElement('p', { style: { fontSize: 13, color: t.textMuted, fontFamily: font, margin: 0 } }, 'Weaving since March 2026'),
      ),

      // Stats grid
      React.createElement('div', {
        style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 24 }
      },
        ...stats.map(s => React.createElement('div', {
          key: s.label,
          style: {
            padding: 16, borderRadius: 16, background: t.card,
            border: `1px solid ${t.border}`, textAlign: 'center'
          }
        },
          React.createElement(Icon, { name: s.icon, size: 20, color: t.primary }),
          React.createElement('div', { style: { fontSize: 22, fontWeight: 700, color: t.text, fontFamily: font, marginTop: 6, letterSpacing: -0.3 } }, s.value),
          React.createElement('div', { style: { fontSize: 12, color: t.textMuted, fontFamily: font, marginTop: 2 } }, s.label)
        ))
      ),

      // Badges
      React.createElement('h3', {
        style: { fontSize: 17, fontWeight: 600, color: t.text, fontFamily: font, margin: '0 0 12px' }
      }, 'Badges'),
      React.createElement('div', { style: { display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 8, margin: '0 -16px', padding: '0 16px 8px' } },
        ...badges.map(b => React.createElement('div', {
          key: b.name,
          style: {
            minWidth: 120, padding: 14, borderRadius: 16, background: t.card,
            border: `1px solid ${b.earned ? b.color + '40' : t.border}`,
            textAlign: 'center', opacity: b.earned ? 1 : 0.5
          }
        },
          React.createElement('div', {
            style: {
              width: 40, height: 40, borderRadius: 14, margin: '0 auto 8px',
              background: b.color + '20', display: 'flex', alignItems: 'center', justifyContent: 'center'
            }
          }, React.createElement(Icon, { name: b.earned ? 'Award' : 'Lock', size: 20, color: b.color })),
          React.createElement('div', { style: { fontSize: 13, fontWeight: 600, color: t.text, fontFamily: font } }, b.name),
          React.createElement('div', { style: { fontSize: 11, color: t.textMuted, fontFamily: font, marginTop: 2 } }, b.desc)
        ))
      ),

      // Subscriptions
      React.createElement('h3', {
        style: { fontSize: 17, fontWeight: 600, color: t.text, fontFamily: font, margin: '20px 0 12px' }
      }, 'My Currents'),
      ...subscriptions.map(s => React.createElement('div', {
        key: s.name,
        onClick: () => { setSelectedChannel({ ...s, desc: '', subscribers: 0, nextRise: '' }); setActiveScreen('channel'); },
        style: {
          display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px',
          background: t.card, borderRadius: 14, marginBottom: 8,
          border: `1px solid ${t.border}`, cursor: 'pointer'
        }
      },
        React.createElement('div', {
          style: {
            width: 40, height: 40, borderRadius: 12, background: s.color + '20',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }
        }, React.createElement(Icon, { name: s.icon, size: 20, color: s.color })),
        React.createElement('span', { style: { flex: 1, fontSize: 15, fontWeight: 500, color: t.text, fontFamily: font } }, s.name),
        React.createElement(Icon, { name: 'ChevronRight', size: 18, color: t.textMuted })
      )),

      // Settings
      React.createElement('h3', {
        style: { fontSize: 17, fontWeight: 600, color: t.text, fontFamily: font, margin: '20px 0 12px' }
      }, 'Settings'),
      ...[
        { icon: isDark ? 'Sun' : 'Moon', label: isDark ? 'Light Mode' : 'Dark Mode', action: () => setIsDark(!isDark) },
        { icon: 'Bell', label: 'Notifications' },
        { icon: 'Shield', label: 'Privacy' },
        { icon: 'HelpCircle', label: 'Help & Support' },
      ].map(item => React.createElement('div', {
        key: item.label,
        onClick: item.action,
        style: {
          display: 'flex', alignItems: 'center', gap: 12, padding: '14px',
          background: t.card, borderRadius: 14, marginBottom: 8,
          border: `1px solid ${t.border}`, cursor: 'pointer'
        }
      },
        React.createElement(Icon, { name: item.icon, size: 20, color: t.textSecondary }),
        React.createElement('span', { style: { flex: 1, fontSize: 15, color: t.text, fontFamily: font } }, item.label),
        React.createElement(Icon, { name: 'ChevronRight', size: 18, color: t.textMuted })
      ))
    );
  };

  // Screen mapping
  const screens = {
    home: HomeScreen,
    explore: ExploreScreen,
    live: LiveScreen,
    echo: EchoScreen,
    channel: ChannelScreen,
    profile: ProfileScreen,
  };

  const ActiveScreenComponent = screens[activeScreen] || HomeScreen;

  // Tab bar items
  const tabs = [
    { id: 'home', icon: 'Home', label: 'Home' },
    { id: 'explore', icon: 'Compass', label: 'Explore' },
    { id: 'live', icon: 'Radio', label: 'Live' },
    { id: 'echo', icon: 'History', label: 'Echoes' },
    { id: 'profile', icon: 'User', label: 'Profile' },
  ];

  return React.createElement('div', {
    style: {
      minHeight: '100vh', background: '#f0f0f0',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: font, padding: '20px 0'
    }
  },
    styleTag,
    React.createElement('div', {
      style: {
        width: 375, height: 812, borderRadius: 40, overflow: 'hidden',
        background: t.bg, position: 'relative',
        boxShadow: '0 25px 80px rgba(0,0,0,0.3)',
        display: 'flex', flexDirection: 'column'
      }
    },
      // Scrollable content
      React.createElement('div', {
        style: { flex: 1, overflowY: 'auto', overflowX: 'hidden' }
      }, React.createElement(ActiveScreenComponent)),

      // Bottom tab bar
      React.createElement('div', {
        style: {
          position: 'absolute', bottom: 0, left: 0, right: 0,
          background: isDark ? 'rgba(10,14,26,0.92)' : 'rgba(248,250,252,0.92)',
          backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
          borderTop: `1px solid ${t.border}`,
          display: 'flex', justifyContent: 'space-around', alignItems: 'center',
          padding: '8px 0 28px', zIndex: 10
        }
      },
        ...tabs.map(tab => React.createElement('button', {
          key: tab.id,
          onClick: () => setActiveScreen(tab.id),
          style: {
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
            background: 'none', border: 'none', cursor: 'pointer',
            minWidth: 56, minHeight: 44, padding: '4px 0',
            transition: 'all 200ms ease'
          }
        },
          React.createElement(Icon, {
            name: tab.icon, size: 22,
            color: activeScreen === tab.id ? t.primary : t.textMuted
          }),
          React.createElement('span', {
            style: {
              fontSize: 10, fontWeight: activeScreen === tab.id ? 600 : 400,
              color: activeScreen === tab.id ? t.primary : t.textMuted,
              fontFamily: font
            }
          }, tab.label),
          activeScreen === tab.id && React.createElement('div', {
            style: {
              width: 4, height: 4, borderRadius: 2, background: t.primary,
              marginTop: 1
            }
          })
        ))
      )
    )
  );
}
