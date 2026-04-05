const { useState, useEffect, useRef } = React;

function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [isDark, setIsDark] = useState(false);
  const [sessionTimer, setSessionTimer] = useState(847);
  const [pulseActive, setPulseActive] = useState(false);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
      @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes pulse { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.05); opacity: 0.85; } }
      @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
      @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      @keyframes ripple { 0% { transform: scale(0); opacity: 0.6; } 100% { transform: scale(3); opacity: 0; } }
      @keyframes glow { 0%, 100% { box-shadow: 0 0 10px rgba(37,99,235,0.3); } 50% { box-shadow: 0 0 25px rgba(37,99,235,0.7), 0 0 40px rgba(59,130,246,0.4); } }
      @keyframes waveform { 0%, 100% { height: 4px; } 50% { height: 16px; } }
      @keyframes orbit { from { transform: rotate(0deg) translateX(40px) rotate(0deg); } to { transform: rotate(360deg) translateX(40px) rotate(-360deg); } }
      * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
      ::-webkit-scrollbar { width: 0; }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setSessionTimer(p => p > 0 ? p - 1 : 847), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setPulseActive(p => !p), 2000);
    return () => clearInterval(t);
  }, []);

  const themes = {
    light: {
      bg: '#F8FAFC',
      surface: '#FFFFFF',
      surfaceAlt: '#F1F5F9',
      border: '#E2E8F0',
      text: '#0F172A',
      textSec: '#475569',
      textMuted: '#94A3B8',
      primary: '#2563EB',
      secondary: '#3B82F6',
      cta: '#F97316',
      navBg: '#FFFFFF',
      cardBg: '#FFFFFF',
      inputBg: '#F1F5F9',
      sessionBg: 'linear-gradient(135deg, #0F172A 0%, #1E1B4B 50%, #0C1445 100%)',
    },
    dark: {
      bg: '#030712',
      surface: '#0F172A',
      surfaceAlt: '#1E293B',
      border: '#1E293B',
      text: '#F1F5F9',
      textSec: '#94A3B8',
      textMuted: '#475569',
      primary: '#3B82F6',
      secondary: '#60A5FA',
      cta: '#F97316',
      navBg: '#0F172A',
      cardBg: '#0F172A',
      inputBg: '#1E293B',
      sessionBg: 'linear-gradient(135deg, #030712 0%, #0D0B2A 50%, #030A1C 100%)',
    }
  };

  const t = isDark ? themes.dark : themes.light;

  const formatTime = (s) => `${Math.floor(s/60)}:${String(s%60).padStart(2,'0')}`;

  const screens = {
    home: () => HomeScreen({ t, setActiveScreen, sessionTimer, formatTime, pulseActive, isDark }),
    session: () => SessionScreen({ t, setActiveScreen, sessionTimer, formatTime, pulseActive }),
    gallery: () => GalleryScreen({ t, setActiveScreen }),
    guilds: () => GuildsScreen({ t, setActiveScreen }),
    profile: () => ProfileScreen({ t, setActiveScreen }),
  };

  const navItems = [
    { id: 'home', label: 'Home', icon: 'Home' },
    { id: 'session', label: 'Session', icon: 'Zap' },
    { id: 'gallery', label: 'Gallery', icon: 'Image' },
    { id: 'guilds', label: 'Guilds', icon: 'Users' },
    { id: 'profile', label: 'Profile', icon: 'User' },
  ];

  return React.createElement('div', {
    style: { minHeight: '100vh', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', fontFamily: "'Inter', sans-serif" }
  },
    React.createElement('div', {
      style: {
        width: 375, height: 812, background: t.bg, borderRadius: 44, overflow: 'hidden',
        position: 'relative', display: 'flex', flexDirection: 'column',
        boxShadow: '0 40px 80px rgba(0,0,0,0.25), 0 0 0 1px rgba(0,0,0,0.08)',
      }
    },
      // Theme toggle
      React.createElement('button', {
        onClick: () => setIsDark(d => !d),
        style: {
          position: 'absolute', top: 16, right: 16, zIndex: 100,
          width: 36, height: 36, borderRadius: 18, border: 'none',
          background: isDark ? '#1E293B' : '#E2E8F0', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all 0.2s',
        }
      },
        React.createElement(isDark ? window.lucide.Sun : window.lucide.Moon, { size: 16, color: t.textSec })
      ),

      // Main content
      React.createElement('div', {
        style: { flex: 1, overflow: 'auto', position: 'relative' }
      },
        screens[activeScreen]()
      ),

      // Bottom nav
      React.createElement('div', {
        style: {
          background: t.navBg, borderTop: `1px solid ${t.border}`,
          display: 'flex', padding: '8px 4px 20px',
          boxShadow: isDark ? '0 -4px 20px rgba(0,0,0,0.4)' : '0 -4px 20px rgba(0,0,0,0.06)',
        }
      },
        navItems.map(item =>
          React.createElement('button', {
            key: item.id,
            onClick: () => setActiveScreen(item.id),
            style: {
              flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
              gap: 4, border: 'none', background: 'none', cursor: 'pointer',
              padding: '8px 4px', borderRadius: 12, minHeight: 44,
              transition: 'all 0.2s',
            }
          },
            React.createElement(window.lucide[item.icon], {
              size: 20,
              color: activeScreen === item.id ? t.primary : t.textMuted,
              strokeWidth: activeScreen === item.id ? 2.5 : 1.5,
            }),
            React.createElement('span', {
              style: {
                fontSize: 10, fontWeight: activeScreen === item.id ? 600 : 400,
                color: activeScreen === item.id ? t.primary : t.textMuted,
                letterSpacing: '0.02em',
              }
            }, item.label)
          )
        )
      )
    )
  );
}

function HomeScreen({ t, setActiveScreen, sessionTimer, formatTime, pulseActive, isDark }) {
  const [activeFilter, setActiveFilter] = useState('upcoming');

  const sessions = [
    { id: 1, title: 'Midnight Reverie', theme: 'Dreams & Shadows', participants: 47, cap: 64, type: 'Poetry', timeLabel: 'LIVE NOW', live: true, color: '#7C3AED' },
    { id: 2, title: 'Chromatic Storm', theme: 'Emotional Turbulence', participants: 23, cap: 50, type: 'Visual', timeLabel: 'In 12 min', live: false, color: '#2563EB' },
    { id: 3, title: 'Echo Chamber', theme: 'Urban Soundscapes', participants: 0, cap: 32, type: 'Sound', timeLabel: 'In 1h 30m', live: false, color: '#059669' },
    { id: 4, title: 'Fractal Mind', theme: 'Recursive Beauty', participants: 0, cap: 128, type: 'Visual', timeLabel: 'Tomorrow', live: false, color: '#DC2626' },
  ];

  return React.createElement('div', {
    style: { padding: '60px 20px 20px', animation: 'fadeIn 0.4s ease', fontFamily: "'Inter', sans-serif" }
  },
    // Header
    React.createElement('div', { style: { marginBottom: 24 } },
      React.createElement('p', { style: { fontSize: 13, color: t.primary, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 4px' } }, 'Welcome back'),
      React.createElement('h1', { style: { fontSize: 26, fontWeight: 800, color: t.text, margin: '0 0 4px', lineHeight: 1.2 } }, 'Muse Weave'),
      React.createElement('p', { style: { fontSize: 14, color: t.textSec, margin: 0 } }, 'Live creative rituals, AI-conducted.')
    ),

    // Featured live session
    React.createElement('div', {
      onClick: () => setActiveScreen('session'),
      style: {
        background: 'linear-gradient(135deg, #0F172A 0%, #1E1B4B 60%, #4C1D95 100%)',
        borderRadius: 20, padding: '20px', marginBottom: 20, cursor: 'pointer',
        position: 'relative', overflow: 'hidden',
        animation: pulseActive ? 'glow 2s ease' : 'none',
        boxShadow: '0 8px 32px rgba(124,58,237,0.35)',
        transition: 'transform 0.2s',
      }
    },
      // Animated orbs
      React.createElement('div', {
        style: {
          position: 'absolute', top: -20, right: -20, width: 100, height: 100,
          borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.4) 0%, transparent 70%)',
          animation: 'pulse 3s ease infinite',
        }
      }),
      React.createElement('div', {
        style: {
          position: 'absolute', bottom: -10, left: 40, width: 60, height: 60,
          borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.3) 0%, transparent 70%)',
          animation: 'pulse 4s ease infinite 1s',
        }
      }),

      React.createElement('div', { style: { position: 'relative' } },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 } },
          React.createElement('div', {
            style: {
              background: '#EF4444', borderRadius: 6, padding: '3px 8px',
              display: 'flex', alignItems: 'center', gap: 4,
            }
          },
            React.createElement('div', {
              style: {
                width: 6, height: 6, borderRadius: '50%', background: '#fff',
                animation: 'pulse 1s ease infinite',
              }
            }),
            React.createElement('span', { style: { fontSize: 10, fontWeight: 700, color: '#fff', letterSpacing: '0.05em' } }, 'LIVE')
          ),
          React.createElement('span', { style: { fontSize: 12, color: 'rgba(255,255,255,0.6)' } }, '47 / 64 participants')
        ),

        React.createElement('h2', { style: { fontSize: 22, fontWeight: 800, color: '#fff', margin: '0 0 4px', letterSpacing: '-0.02em' } }, 'Midnight Reverie'),
        React.createElement('p', { style: { fontSize: 13, color: 'rgba(255,255,255,0.65)', margin: '0 0 16px' } }, 'Dreams & Shadows · Generative Poetry'),

        React.createElement('div', { style: { display: 'flex', gap: 8, alignItems: 'center', marginBottom: 16 } },
          ...Array.from({ length: 4 }, (_, i) =>
            React.createElement('div', {
              key: i,
              style: {
                width: 3, background: 'rgba(255,255,255,0.7)', borderRadius: 2,
                animation: `waveform ${0.6 + i * 0.15}s ease infinite alternate`,
                animationDelay: `${i * 0.1}s`,
              }
            })
          )
        ),

        React.createElement('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' } },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6 } },
            React.createElement(window.lucide.Clock, { size: 14, color: 'rgba(255,255,255,0.6)' }),
            React.createElement('span', { style: { fontSize: 13, color: 'rgba(255,255,255,0.6)' } }, `${formatTime(sessionTimer)} remaining`)
          ),
          React.createElement('div', {
            style: {
              background: '#F97316', borderRadius: 12, padding: '8px 16px',
              display: 'flex', alignItems: 'center', gap: 6,
            }
          },
            React.createElement('span', { style: { fontSize: 13, fontWeight: 700, color: '#fff' } }, 'Join Session'),
            React.createElement(window.lucide.ArrowRight, { size: 14, color: '#fff' })
          )
        )
      )
    ),

    // Filter tabs
    React.createElement('div', { style: { display: 'flex', gap: 8, marginBottom: 16 } },
      ['upcoming', 'my guilds', 'trending'].map(f =>
        React.createElement('button', {
          key: f,
          onClick: () => setActiveFilter(f),
          style: {
            padding: '7px 14px', borderRadius: 20, border: `1px solid ${activeFilter === f ? t.primary : t.border}`,
            background: activeFilter === f ? t.primary : 'transparent', cursor: 'pointer',
            fontSize: 12, fontWeight: 600, color: activeFilter === f ? '#fff' : t.textSec,
            textTransform: 'capitalize', transition: 'all 0.15s',
          }
        }, f)
      )
    ),

    // Session list
    React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 10 } },
      sessions.slice(1).map((s, i) =>
        React.createElement('div', {
          key: s.id,
          onClick: () => setActiveScreen('session'),
          style: {
            background: t.cardBg, border: `1px solid ${t.border}`,
            borderRadius: 16, padding: '14px 16px', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 12,
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            animation: `slideUp 0.3s ease ${0.1 * i}s both`,
            transition: 'transform 0.15s, box-shadow 0.15s',
          }
        },
          React.createElement('div', {
            style: {
              width: 44, height: 44, borderRadius: 14,
              background: `${s.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: `1px solid ${s.color}30`,
            }
          },
            React.createElement(window.lucide[s.type === 'Poetry' ? 'BookOpen' : s.type === 'Visual' ? 'Image' : 'Music'], { size: 20, color: s.color })
          ),
          React.createElement('div', { style: { flex: 1, minWidth: 0 } },
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 3 } },
              React.createElement('span', { style: { fontSize: 15, fontWeight: 700, color: t.text } }, s.title),
              React.createElement('span', { style: { fontSize: 11, color: s.live ? '#EF4444' : t.textMuted, fontWeight: 600 } }, s.timeLabel)
            ),
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8 } },
              React.createElement('span', { style: { fontSize: 12, color: t.textSec } }, s.theme),
              React.createElement('span', { style: { width: 3, height: 3, borderRadius: '50%', background: t.textMuted } }),
              React.createElement('span', { style: { fontSize: 12, color: t.textMuted } }, `${s.cap} cap`)
            )
          ),
          React.createElement(window.lucide.ChevronRight, { size: 16, color: t.textMuted })
        )
      )
    )
  );
}

function SessionScreen({ t, setActiveScreen, sessionTimer, formatTime, pulseActive }) {
  const [phase, setPhase] = useState('active');
  const [contributed, setContributed] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [contributions, setContributions] = useState([
    { user: 'Aria M.', text: 'velvet midnight', avatar: '#7C3AED' },
    { user: 'Koa R.', text: 'dissolving stars', avatar: '#2563EB' },
    { user: 'Zhen L.', text: 'forgotten warmth', avatar: '#059669' },
    { user: 'Mira T.', text: 'silver silence', avatar: '#DC2626' },
  ]);

  const progress = ((847 - sessionTimer) / 847) * 100;

  const handleContribute = () => {
    if (!inputVal.trim()) return;
    setContributions(prev => [{ user: 'You', text: inputVal, avatar: '#F97316' }, ...prev]);
    setContributed(true);
    setInputVal('');
  };

  return React.createElement('div', {
    style: {
      background: 'linear-gradient(180deg, #0A0118 0%, #0F0933 40%, #090620 100%)',
      minHeight: '100%', padding: '0', fontFamily: "'Inter', sans-serif",
      animation: 'fadeIn 0.3s ease',
    }
  },
    // Session header
    React.createElement('div', {
      style: { padding: '60px 20px 20px', position: 'relative', overflow: 'hidden' }
    },
      // Ambient orbs
      React.createElement('div', { style: { position: 'absolute', top: 20, left: 20, width: 120, height: 120, borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.25) 0%, transparent 70%)', animation: 'pulse 4s ease infinite' } }),
      React.createElement('div', { style: { position: 'absolute', top: 60, right: -20, width: 80, height: 80, borderRadius: '50%', background: 'radial-gradient(circle, rgba(37,99,235,0.2) 0%, transparent 70%)', animation: 'pulse 3s ease infinite 1.5s' } }),

      React.createElement('div', { style: { position: 'relative', display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 } },
        React.createElement('div', { style: { flex: 1 } },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 } },
            React.createElement('div', { style: { width: 8, height: 8, borderRadius: '50%', background: '#EF4444', animation: 'pulse 1s ease infinite' } }),
            React.createElement('span', { style: { fontSize: 11, color: '#EF4444', fontWeight: 700, letterSpacing: '0.08em' } }, 'LIVE SESSION'),
            React.createElement('span', { style: { fontSize: 11, color: 'rgba(255,255,255,0.4)' } }, '· 47 participants')
          ),
          React.createElement('h2', { style: { fontSize: 24, fontWeight: 800, color: '#fff', margin: '0 0 4px', letterSpacing: '-0.02em' } }, 'Midnight Reverie'),
          React.createElement('p', { style: { fontSize: 13, color: 'rgba(255,255,255,0.55)', margin: 0 } }, 'Generative Poetry · Dreams & Shadows')
        )
      ),

      // Timer bar
      React.createElement('div', { style: { marginBottom: 8 } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: 6 } },
          React.createElement('span', { style: { fontSize: 12, color: 'rgba(255,255,255,0.5)' } }, 'Session progress'),
          React.createElement('span', { style: { fontSize: 12, color: 'rgba(255,255,255,0.7)', fontWeight: 600 } }, `${formatTime(sessionTimer)} left`)
        ),
        React.createElement('div', { style: { height: 4, background: 'rgba(255,255,255,0.1)', borderRadius: 2, overflow: 'hidden' } },
          React.createElement('div', { style: { width: `${100 - (sessionTimer/847*100)}%`, height: '100%', background: 'linear-gradient(90deg, #7C3AED, #3B82F6)', borderRadius: 2, transition: 'width 1s linear' } })
        )
      )
    ),

    // AI Conductor prompt
    React.createElement('div', {
      style: {
        margin: '0 16px 16px', background: 'rgba(124,58,237,0.12)',
        border: '1px solid rgba(124,58,237,0.3)', borderRadius: 16, padding: 16,
      }
    },
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 } },
        React.createElement('div', { style: { width: 28, height: 28, borderRadius: 8, background: 'linear-gradient(135deg, #7C3AED, #3B82F6)', display: 'flex', alignItems: 'center', justifyContent: 'center' } },
          React.createElement(window.lucide.Sparkles, { size: 14, color: '#fff' })
        ),
        React.createElement('span', { style: { fontSize: 11, fontWeight: 700, color: 'rgba(167,139,250,1)', letterSpacing: '0.06em' } }, 'AI CONDUCTOR')
      ),
      React.createElement('p', { style: { fontSize: 14, color: '#E9D5FF', margin: '0 0 4px', fontWeight: 600, lineHeight: 1.4 } }, '"Describe a forgotten feeling in three words."'),
      React.createElement('p', { style: { fontSize: 12, color: 'rgba(255,255,255,0.4)', margin: 0 } }, 'Prompt 3 of 7 · 47 contributions so far')
    ),

    // Contribution input
    !contributed ? React.createElement('div', {
      style: { margin: '0 16px 16px' }
    },
      React.createElement('div', {
        style: {
          background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: 14, padding: '12px 14px', display: 'flex', gap: 10, alignItems: 'center',
        }
      },
        React.createElement('input', {
          value: inputVal,
          onChange: e => setInputVal(e.target.value),
          placeholder: 'Three words...',
          style: {
            flex: 1, background: 'none', border: 'none', outline: 'none',
            fontSize: 15, color: '#fff', fontFamily: "'Inter', sans-serif",
          }
        }),
        React.createElement('button', {
          onClick: handleContribute,
          style: {
            width: 36, height: 36, borderRadius: 10, border: 'none',
            background: inputVal ? 'linear-gradient(135deg, #7C3AED, #2563EB)' : 'rgba(255,255,255,0.1)',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.2s',
          }
        },
          React.createElement(window.lucide.Send, { size: 16, color: inputVal ? '#fff' : 'rgba(255,255,255,0.3)' })
        )
      )
    ) : React.createElement('div', {
      style: {
        margin: '0 16px 16px', background: 'rgba(16,185,129,0.1)',
        border: '1px solid rgba(16,185,129,0.3)', borderRadius: 14, padding: '12px 16px',
        display: 'flex', alignItems: 'center', gap: 10,
      }
    },
      React.createElement(window.lucide.CheckCircle, { size: 18, color: '#10B981' }),
      React.createElement('span', { style: { fontSize: 13, color: '#6EE7B7', fontWeight: 500 } }, 'Your contribution is woven in!')
    ),

    // Live contributions feed
    React.createElement('div', { style: { padding: '0 16px 16px' } },
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 } },
        React.createElement(window.lucide.Activity, { size: 14, color: 'rgba(255,255,255,0.4)' }),
        React.createElement('span', { style: { fontSize: 12, color: 'rgba(255,255,255,0.4)', fontWeight: 600, letterSpacing: '0.04em' } }, 'LIVE CONTRIBUTIONS')
      ),
      React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 8 } },
        contributions.map((c, i) =>
          React.createElement('div', {
            key: i,
            style: {
              background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 10, padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 10,
              animation: `slideUp 0.3s ease ${i * 0.08}s both`,
            }
          },
            React.createElement('div', {
              style: {
                width: 28, height: 28, borderRadius: '50%', background: c.avatar,
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }
            },
              React.createElement('span', { style: { fontSize: 10, fontWeight: 700, color: '#fff' } }, c.user[0])
            ),
            React.createElement('div', {},
              React.createElement('div', { style: { fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 1 } }, c.user),
              React.createElement('div', { style: { fontSize: 14, color: 'rgba(255,255,255,0.85)', fontStyle: 'italic', fontWeight: 500 } }, `"${c.text}"`)
            )
          )
        )
      )
    ),

    // Emerging poem preview
    React.createElement('div', {
      style: {
        margin: '0 16px 80px', background: 'rgba(37,99,235,0.08)',
        border: '1px solid rgba(37,99,235,0.25)', borderRadius: 16, padding: 16,
      }
    },
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 } },
        React.createElement(window.lucide.Feather, { size: 14, color: '#60A5FA' }),
        React.createElement('span', { style: { fontSize: 11, fontWeight: 700, color: '#60A5FA', letterSpacing: '0.06em' } }, 'EMERGING POEM · LIVE WEAVE')
      ),
      React.createElement('p', {
        style: {
          fontSize: 13, color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, margin: 0,
          fontStyle: 'italic', fontFamily: 'Georgia, serif',
        }
      }, '"In the velvet midnight\nwhere dissolving stars\nforgot their warmth—\nsilver silence falls\nlike forgotten rain..."')
    )
  );
}

function GalleryScreen({ t, setActiveScreen }) {
  const [activeTab, setActiveTab] = useState('all');
  const artworks = [
    { id: 1, title: 'Neon Elegy', session: 'Urban Nocturne', type: 'Visual', participants: 62, date: 'Apr 3', color: '#7C3AED', likes: 234, gradient: 'linear-gradient(135deg, #1a0533, #2d1b69, #0f0c2e)' },
    { id: 2, title: 'The Grief Hymn', session: 'Emotional Turbulence', type: 'Poetry', participants: 38, date: 'Apr 2', color: '#2563EB', likes: 189, gradient: 'linear-gradient(135deg, #0c1445, #1e3a8a, #0a0f2e)' },
    { id: 3, title: 'Fractal Solstice', session: 'Recursive Beauty', type: 'Visual', participants: 91, date: 'Apr 1', color: '#059669', likes: 412, gradient: 'linear-gradient(135deg, #022c22, #064e3b, #0a2e1e)' },
    { id: 4, title: 'Rain on Glass', session: 'Urban Soundscapes', type: 'Sound', participants: 29, date: 'Mar 30', color: '#F97316', likes: 156, gradient: 'linear-gradient(135deg, #431407, #7c2d12, #2c0f03)' },
  ];

  return React.createElement('div', {
    style: { padding: '60px 20px 20px', fontFamily: "'Inter', sans-serif", animation: 'fadeIn 0.3s ease' }
  },
    React.createElement('h1', { style: { fontSize: 24, fontWeight: 800, color: t.text, margin: '0 0 4px', letterSpacing: '-0.02em' } }, 'Collective Gallery'),
    React.createElement('p', { style: { fontSize: 14, color: t.textSec, margin: '0 0 20px' } }, 'Artifacts from past Alchemy Sessions'),

    // Tabs
    React.createElement('div', { style: { display: 'flex', gap: 8, marginBottom: 20 } },
      ['all', 'poetry', 'visual', 'sound'].map(tab =>
        React.createElement('button', {
          key: tab,
          onClick: () => setActiveTab(tab),
          style: {
            padding: '7px 14px', borderRadius: 20, border: `1px solid ${activeTab === tab ? t.primary : t.border}`,
            background: activeTab === tab ? t.primary : 'transparent', cursor: 'pointer',
            fontSize: 12, fontWeight: 600, color: activeTab === tab ? '#fff' : t.textSec,
            textTransform: 'capitalize', transition: 'all 0.15s',
          }
        }, tab)
      )
    ),

    // Featured artwork
    React.createElement('div', {
      style: {
        borderRadius: 20, overflow: 'hidden', marginBottom: 16, cursor: 'pointer',
        boxShadow: '0 8px 32px rgba(124,58,237,0.2)',
        animation: 'fadeIn 0.4s ease',
      }
    },
      React.createElement('div', {
        style: {
          background: artworks[0].gradient, padding: '32px 20px 20px',
          minHeight: 160, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
          position: 'relative', overflow: 'hidden',
        }
      },
        React.createElement('div', { style: { position: 'absolute', top: 16, right: 16, background: 'rgba(255,255,255,0.12)', borderRadius: 20, padding: '4px 10px', display: 'flex', alignItems: 'center', gap: 4 } },
          React.createElement(window.lucide.Heart, { size: 12, color: '#fff' }),
          React.createElement('span', { style: { fontSize: 11, color: '#fff', fontWeight: 600 } }, '234')
        ),
        React.createElement('div', { style: { background: 'rgba(124,58,237,0.3)', borderRadius: 6, padding: '3px 8px', display: 'inline-flex', marginBottom: 8, alignSelf: 'flex-start' } },
          React.createElement('span', { style: { fontSize: 10, color: '#DDD6FE', fontWeight: 700, letterSpacing: '0.06em' } }, 'FEATURED · VISUAL')
        ),
        React.createElement('h3', { style: { fontSize: 22, fontWeight: 800, color: '#fff', margin: '0 0 4px' } }, 'Neon Elegy'),
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8 } },
          React.createElement(window.lucide.Users, { size: 12, color: 'rgba(255,255,255,0.6)' }),
          React.createElement('span', { style: { fontSize: 12, color: 'rgba(255,255,255,0.6)' } }, '62 weavers · Apr 3')
        )
      )
    ),

    // Grid of artworks
    React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 } },
      artworks.slice(1).map((a, i) =>
        React.createElement('div', {
          key: a.id,
          style: {
            borderRadius: 16, overflow: 'hidden', cursor: 'pointer',
            boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
            animation: `slideUp 0.3s ease ${i * 0.1}s both`,
          }
        },
          React.createElement('div', {
            style: { background: a.gradient, padding: '24px 12px 12px', position: 'relative' }
          },
            React.createElement('div', { style: { position: 'absolute', top: 8, right: 8, background: 'rgba(255,255,255,0.1)', borderRadius: 12, padding: '2px 6px', display: 'flex', alignItems: 'center', gap: 3 } },
              React.createElement(window.lucide.Heart, { size: 10, color: '#fff' }),
              React.createElement('span', { style: { fontSize: 9, color: '#fff', fontWeight: 600 } }, a.likes)
            ),
            React.createElement('div', { style: { background: `${a.color}30`, borderRadius: 4, padding: '2px 6px', display: 'inline-flex', marginBottom: 6 } },
              React.createElement('span', { style: { fontSize: 9, color: '#fff', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase' } }, a.type)
            ),
            React.createElement('h4', { style: { fontSize: 14, fontWeight: 700, color: '#fff', margin: '0 0 4px', lineHeight: 1.2 } }, a.title),
            React.createElement('p', { style: { fontSize: 10, color: 'rgba(255,255,255,0.55)', margin: 0 } }, `${a.participants} weavers`)
          )
        )
      )
    )
  );
}

function GuildsScreen({ t, setActiveScreen }) {
  const guilds = [
    { name: 'Neon Dreamers', members: 1247, focus: 'Visual · Synthwave', sessions: 48, joined: true, color: '#7C3AED', icon: 'Zap' },
    { name: 'Word Alchemists', members: 892, focus: 'Poetry · Surrealist', sessions: 31, joined: true, color: '#2563EB', icon: 'Feather' },
    { name: 'Sound Cartographers', members: 634, focus: 'Sound · Ambient', sessions: 22, joined: false, color: '#059669', icon: 'Music' },
    { name: 'Chaos Painters', members: 2103, focus: 'Visual · Abstract', sessions: 77, joined: false, color: '#DC2626', icon: 'Palette' },
    { name: 'The Void Scribes', members: 421, focus: 'Poetry · Dark', sessions: 19, joined: false, color: '#0891B2', icon: 'Moon' },
  ];

  return React.createElement('div', {
    style: { padding: '60px 20px 20px', fontFamily: "'Inter', sans-serif", animation: 'fadeIn 0.3s ease' }
  },
    React.createElement('div', { style: { marginBottom: 20 } },
      React.createElement('h1', { style: { fontSize: 24, fontWeight: 800, color: t.text, margin: '0 0 4px', letterSpacing: '-0.02em' } }, 'Identity Guilds'),
      React.createElement('p', { style: { fontSize: 14, color: t.textSec, margin: '0 0 16px' } }, 'Find your creative tribe')
    ),

    // Create guild CTA
    React.createElement('div', {
      style: {
        background: `linear-gradient(135deg, ${t.primary}15, ${t.secondary}15)`,
        border: `1px dashed ${t.primary}40`, borderRadius: 16, padding: '14px 16px',
        display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20, cursor: 'pointer',
      }
    },
      React.createElement('div', {
        style: { width: 40, height: 40, borderRadius: 12, border: `2px dashed ${t.primary}60`, display: 'flex', alignItems: 'center', justifyContent: 'center' }
      },
        React.createElement(window.lucide.Plus, { size: 20, color: t.primary })
      ),
      React.createElement('div', {},
        React.createElement('div', { style: { fontSize: 14, fontWeight: 700, color: t.text } }, 'Create a Guild'),
        React.createElement('div', { style: { fontSize: 12, color: t.textSec } }, 'Build your own creative ritual space')
      )
    ),

    // My guilds section
    React.createElement('div', { style: { marginBottom: 16 } },
      React.createElement('p', { style: { fontSize: 12, fontWeight: 700, color: t.textMuted, letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 10px' } }, 'My Guilds'),
      React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 8 } },
        guilds.filter(g => g.joined).map((g, i) =>
          GuildCard({ g, t, i })
        )
      )
    ),

    // Discover section
    React.createElement('div', {},
      React.createElement('p', { style: { fontSize: 12, fontWeight: 700, color: t.textMuted, letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 10px' } }, 'Discover'),
      React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 8 } },
        guilds.filter(g => !g.joined).map((g, i) =>
          GuildCard({ g, t, i })
        )
      )
    )
  );
}

function GuildCard({ g, t, i }) {
  const [joined, setJoined] = useState(g.joined);
  const icons = { Zap: window.lucide.Zap, Feather: window.lucide.Feather, Music: window.lucide.Music, Palette: window.lucide.Palette, Moon: window.lucide.Moon };
  const Icon = icons[g.icon];

  return React.createElement('div', {
    key: g.name,
    style: {
      background: t.cardBg, border: `1px solid ${t.border}`, borderRadius: 16,
      padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12,
      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
      animation: `slideUp 0.3s ease ${i * 0.1}s both`,
    }
  },
    React.createElement('div', {
      style: {
        width: 44, height: 44, borderRadius: 14, background: `${g.color}18`,
        border: `1px solid ${g.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center',
      }
    },
      React.createElement(Icon, { size: 20, color: g.color })
    ),
    React.createElement('div', { style: { flex: 1, minWidth: 0 } },
      React.createElement('div', { style: { fontSize: 15, fontWeight: 700, color: t.text, marginBottom: 2 } }, g.name),
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6 } },
        React.createElement('span', { style: { fontSize: 12, color: t.textSec } }, g.focus),
        React.createElement('span', { style: { width: 3, height: 3, borderRadius: '50%', background: t.textMuted } }),
        React.createElement(window.lucide.Users, { size: 10, color: t.textMuted }),
        React.createElement('span', { style: { fontSize: 12, color: t.textMuted } }, g.members.toLocaleString())
      )
    ),
    React.createElement('button', {
      onClick: () => setJoined(j => !j),
      style: {
        padding: '7px 14px', borderRadius: 20, border: `1px solid ${joined ? t.border : g.color}`,
        background: joined ? 'transparent' : `${g.color}18`, cursor: 'pointer',
        fontSize: 12, fontWeight: 600,
        color: joined ? t.textSec : g.color,
        transition: 'all 0.15s', minHeight: 34,
      }
    }, joined ? 'Joined' : 'Join')
  );
}

function ProfileScreen({ t, setActiveScreen }) {
  const stats = [
    { label: 'Sessions', value: '23' },
    { label: 'Contributions', value: '347' },
    { label: 'Guilds', value: '4' },
  ];

  const badges = [
    { name: 'First Weave', icon: 'Star', color: '#F59E0B' },
    { name: 'Word Crafter', icon: 'Feather', color: '#7C3AED' },
    { name: 'Night Owl', icon: 'Moon', color: '#2563EB' },
    { name: 'Catalyst', icon: 'Zap', color: '#EF4444' },
  ];

  const recentActivity = [
    { type: 'Joined', session: 'Midnight Reverie', time: '2h ago', color: '#7C3AED' },
    { type: 'Contributed', session: 'Chromatic Storm', time: 'Yesterday', color: '#2563EB' },
    { type: 'Gallery', session: 'Neon Elegy liked', time: '2d ago', color: '#059669' },
  ];

  return React.createElement('div', {
    style: { padding: '0 0 20px', fontFamily: "'Inter', sans-serif", animation: 'fadeIn 0.3s ease' }
  },
    // Profile header
    React.createElement('div', {
      style: {
        background: 'linear-gradient(180deg, #0F172A 0%, #1E1B4B 100%)',
        padding: '60px 20px 24px', position: 'relative', overflow: 'hidden',
      }
    },
      React.createElement('div', { style: { position: 'absolute', top: 0, right: 0, width: 120, height: 120, borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.2) 0%, transparent 70%)', transform: 'translate(30px, -30px)' } }),
      React.createElement('div', { style: { display: 'flex', alignItems: 'flex-end', gap: 16, position: 'relative' } },
        React.createElement('div', {
          style: {
            width: 72, height: 72, borderRadius: 22,
            background: 'linear-gradient(135deg, #7C3AED, #2563EB)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: '3px solid rgba(255,255,255,0.15)',
            boxShadow: '0 8px 24px rgba(124,58,237,0.4)',
          }
        },
          React.createElement('span', { style: { fontSize: 28, fontWeight: 800, color: '#fff' } }, 'A')
        ),
        React.createElement('div', { style: { flex: 1 } },
          React.createElement('h2', { style: { fontSize: 20, fontWeight: 800, color: '#fff', margin: '0 0 3px' } }, 'Aria Moonfield'),
          React.createElement('p', { style: { fontSize: 13, color: 'rgba(255,255,255,0.55)', margin: '0 0 8px' } }, '@aria.weaves · Joined Mar 2025'),
          React.createElement('div', { style: { background: 'rgba(124,58,237,0.3)', borderRadius: 8, padding: '3px 10px', display: 'inline-flex', alignItems: 'center', gap: 4 } },
            React.createElement(window.lucide.Sparkles, { size: 12, color: '#DDD6FE' }),
            React.createElement('span', { style: { fontSize: 11, color: '#DDD6FE', fontWeight: 600 } }, 'Dream Weaver')
          )
        )
      )
    ),

    // Stats
    React.createElement('div', { style: { display: 'flex', padding: '16px 20px', gap: 8 } },
      stats.map(s =>
        React.createElement('div', {
          key: s.label,
          style: {
            flex: 1, background: t.surfaceAlt, borderRadius: 14, padding: '14px 8px',
            textAlign: 'center', border: `1px solid ${t.border}`,
          }
        },
          React.createElement('div', { style: { fontSize: 22, fontWeight: 800, color: t.primary, letterSpacing: '-0.02em' } }, s.value),
          React.createElement('div', { style: { fontSize: 11, color: t.textMuted, fontWeight: 500, marginTop: 2 } }, s.label)
        )
      )
    ),

    // Bio
    React.createElement('div', { style: { padding: '0 20px 16px' } },
      React.createElement('div', {
        style: { background: t.cardBg, border: `1px solid ${t.border}`, borderRadius: 16, padding: 16 }
      },
        React.createElement('p', { style: { fontSize: 14, color: t.textSec, margin: 0, lineHeight: 1.6 } }, '"Chasing the liminal space between sound and silence. Weaving dreams into pixels since \'25. Neon Dreamers guild captain."')
      )
    ),

    // Badges
    React.createElement('div', { style: { padding: '0 20px 16px' } },
      React.createElement('p', { style: { fontSize: 12, fontWeight: 700, color: t.textMuted, letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 10px' } }, 'Badges'),
      React.createElement('div', { style: { display: 'flex', gap: 8 } },
        badges.map(b => {
          const Icon = window.lucide[b.icon];
          return React.createElement('div', {
            key: b.name,
            style: {
              flex: 1, background: `${b.color}12`, border: `1px solid ${b.color}30`,
              borderRadius: 12, padding: '10px 6px', textAlign: 'center',
            }
          },
            React.createElement(Icon, { size: 18, color: b.color }),
            React.createElement('div', { style: { fontSize: 9, color: t.textSec, fontWeight: 600, marginTop: 4, lineHeight: 1.2 } }, b.name)
          );
        })
      )
    ),

    // Recent activity
    React.createElement('div', { style: { padding: '0 20px' } },
      React.createElement('p', { style: { fontSize: 12, fontWeight: 700, color: t.textMuted, letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 10px' } }, 'Recent Activity'),
      React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 8 } },
        recentActivity.map((a, i) =>
          React.createElement('div', {
            key: i,
            style: {
              background: t.cardBg, border: `1px solid ${t.border}`, borderRadius: 12,
              padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10,
            }
          },
            React.createElement('div', { style: { width: 8, height: 8, borderRadius: '50%', background: a.color, flexShrink: 0 } }),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('span', { style: { fontSize: 13, color: t.text, fontWeight: 500 } }, `${a.type} · `),
              React.createElement('span', { style: { fontSize: 13, color: t.textSec } }, a.session)
            ),
            React.createElement('span', { style: { fontSize: 11, color: t.textMuted } }, a.time)
          )
        )
      )
    )
  );
}
