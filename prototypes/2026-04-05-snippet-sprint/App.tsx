const { useState, useEffect, useRef } = React;

const themes = {
  light: {
    bg: '#F8FAFC',
    cardBg: '#FFFFFF',
    cardBg2: '#F1F5F9',
    surface: '#E2E8F0',
    border: '#CBD5E1',
    text: '#0F172A',
    textSecondary: '#475569',
    textMuted: '#94A3B8',
    primary: '#1E293B',
    secondary: '#334155',
    cta: '#22C55E',
    ctaDark: '#16A34A',
    ctaLight: '#DCFCE7',
    accent: '#6366F1',
    accentLight: '#EEF2FF',
    warning: '#F59E0B',
    warningLight: '#FEF3C7',
    error: '#EF4444',
    navBg: '#FFFFFF',
    navBorder: '#E2E8F0',
    codeBg: '#1E293B',
    codeText: '#E2E8F0',
    shimmer1: '#E2E8F0',
    shimmer2: '#F1F5F9',
  },
  dark: {
    bg: '#0F172A',
    cardBg: '#1E293B',
    cardBg2: '#0F172A',
    surface: '#334155',
    border: '#334155',
    text: '#F8FAFC',
    textSecondary: '#CBD5E1',
    textMuted: '#64748B',
    primary: '#F8FAFC',
    secondary: '#CBD5E1',
    cta: '#22C55E',
    ctaDark: '#16A34A',
    ctaLight: '#14532D',
    accent: '#818CF8',
    accentLight: '#1E1B4B',
    warning: '#FBBF24',
    warningLight: '#451A03',
    error: '#F87171',
    navBg: '#1E293B',
    navBorder: '#334155',
    codeBg: '#0F172A',
    codeText: '#E2E8F0',
    shimmer1: '#334155',
    shimmer2: '#475569',
  },
};

const SNIPPETS = [
  {
    id: 1,
    title: 'Debounce React Hook',
    description: 'Implement a custom React hook that debounces a value with configurable delay.',
    difficulty: 'Medium',
    xp: 120,
    time: '12 min',
    tags: ['React', 'Hooks', 'TypeScript'],
    category: 'Frontend',
    completions: 2847,
    shard: 'React Hooks Mastery',
  },
  {
    id: 2,
    title: 'Python Decorator Chain',
    description: 'Build a decorator factory that supports stacking multiple behaviors with argument passing.',
    difficulty: 'Hard',
    xp: 200,
    time: '15 min',
    tags: ['Python', 'Decorators', 'FP'],
    category: 'Backend',
    completions: 1203,
    shard: 'Python Decorator Expert',
  },
  {
    id: 3,
    title: 'CSS Grid Layout',
    description: 'Recreate a Bento-box style grid layout using only CSS Grid without media queries.',
    difficulty: 'Easy',
    xp: 60,
    time: '8 min',
    tags: ['CSS', 'Grid', 'Layout'],
    category: 'Frontend',
    completions: 5621,
    shard: 'CSS Grid Wizard',
  },
];

const SQUADS = [
  {
    id: 1,
    name: 'Async Avengers',
    goal: 'Build a real-time collaborative code editor',
    progress: 68,
    members: ['AJ', 'SK', 'MR', 'You'],
    snippetsDone: 17,
    snippetsTotal: 25,
    xpPool: 2040,
    timeLeft: '2d 4h',
    active: true,
  },
  {
    id: 2,
    name: 'Type Tacticians',
    goal: 'Create a TypeScript utility library',
    progress: 42,
    members: ['LP', 'TK', 'You'],
    snippetsDone: 11,
    snippetsTotal: 26,
    xpPool: 1320,
    timeLeft: '4d 12h',
    active: false,
  },
];

const SHARDS = [
  { name: 'React Hooks Mastery', level: 3, color: '#6366F1', progress: 72 },
  { name: 'Python Decorator Expert', level: 2, color: '#22C55E', progress: 45 },
  { name: 'CSS Grid Wizard', level: 4, color: '#F59E0B', progress: 88 },
  { name: 'TypeScript Guru', level: 2, color: '#EC4899', progress: 30 },
  { name: 'Async Patterns Pro', level: 1, color: '#06B6D4', progress: 15 },
];

const CODE_SAMPLE = `// Your solution here
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] =
    useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}`;

function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [theme, setTheme] = useState('light');
  const [timerActive, setTimerActive] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(720);
  const [activeSquad, setActiveSquad] = useState(0);
  const [streak, setStreak] = useState(12);
  const [xp, setXp] = useState(4820);
  const [completedToday, setCompletedToday] = useState(2);
  const [showXpBurst, setShowXpBurst] = useState(false);
  const timerRef = useRef(null);
  const t = themes[theme];

  useEffect(() => {
    if (timerActive && timerSeconds > 0) {
      timerRef.current = setInterval(() => {
        setTimerSeconds(s => s - 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [timerActive, timerSeconds]);

  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  };

  const screens = {
    home: HomeScreen,
    sprint: SprintScreen,
    squad: SquadScreen,
    profile: ProfileScreen,
  };

  const navItems = [
    { id: 'home', label: 'Home', icon: 'Home' },
    { id: 'sprint', label: 'Sprint', icon: 'Zap' },
    { id: 'squad', label: 'Squad', icon: 'Users' },
    { id: 'profile', label: 'Profile', icon: 'User' },
  ];

  const ctx = {
    t, theme, setTheme, activeScreen, setActiveScreen,
    timerActive, setTimerActive, timerSeconds, setTimerSeconds,
    formatTime, activeSquad, setActiveSquad,
    streak, xp, setXp, completedToday, setCompletedToday,
    showXpBurst, setShowXpBurst,
  };

  const CurrentScreen = screens[activeScreen];

  return React.createElement('div', {
    style: {
      minHeight: '100vh',
      background: '#f0f0f0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: '"IBM Plex Sans", sans-serif',
      padding: '20px',
    }
  },
    React.createElement('style', null, `
      @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700;800&family=IBM+Plex+Sans:wght@400;500;600;700&display=swap');

      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(8px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes slideUp {
        from { opacity: 0; transform: translateY(24px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
      }
      @keyframes shimmer {
        0% { background-position: -200% center; }
        100% { background-position: 200% center; }
      }
      @keyframes xpBurst {
        0% { opacity: 0; transform: scale(0.5) translateY(0); }
        50% { opacity: 1; transform: scale(1.2) translateY(-20px); }
        100% { opacity: 0; transform: scale(1) translateY(-40px); }
      }
      @keyframes timerPulse {
        0%, 100% { box-shadow: 0 0 0 0 rgba(34,197,94,0.4); }
        50% { box-shadow: 0 0 0 8px rgba(34,197,94,0); }
      }
      @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      @keyframes streakFlame {
        0%, 100% { transform: scaleY(1) scaleX(1); }
        25% { transform: scaleY(1.1) scaleX(0.95); }
        75% { transform: scaleY(0.95) scaleX(1.05); }
      }
      .snippet-card:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.15) !important; }
      .nav-tab:hover { opacity: 0.8; }
      .btn-press:active { transform: scale(0.96); }
      .squad-card:hover { transform: translateY(-2px); }
      .shard-row:hover { background: rgba(34,197,94,0.08) !important; }
      * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
      ::-webkit-scrollbar { width: 4px; }
      ::-webkit-scrollbar-track { background: transparent; }
      ::-webkit-scrollbar-thumb { background: rgba(148,163,184,0.4); border-radius: 2px; }
    `),

    React.createElement('div', {
      style: {
        width: 375,
        height: 812,
        background: t.bg,
        borderRadius: 44,
        overflow: 'hidden',
        boxShadow: '0 32px 80px rgba(0,0,0,0.35), 0 0 0 8px #1a1a1a, 0 0 0 10px #333',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        transition: 'background 0.3s ease',
      }
    },
      React.createElement('div', {
        style: {
          flex: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
          paddingBottom: 80,
        }
      },
        React.createElement(CurrentScreen, { ctx })
      ),

      React.createElement('div', {
        style: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 80,
          background: t.navBg,
          borderTop: `1px solid ${t.navBorder}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          padding: '0 8px 8px',
          backdropFilter: 'blur(12px)',
          transition: 'background 0.3s ease, border-color 0.3s ease',
        }
      },
        navItems.map(item => {
          const Icon = window.lucide[item.icon];
          const isActive = activeScreen === item.id;
          return React.createElement('button', {
            key: item.id,
            className: 'nav-tab btn-press',
            onClick: () => setActiveScreen(item.id),
            style: {
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 4,
              padding: '8px 16px',
              background: isActive ? t.ctaLight : 'transparent',
              border: 'none',
              borderRadius: 12,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              minWidth: 64,
              minHeight: 52,
            }
          },
            Icon && React.createElement(Icon, {
              size: 20,
              color: isActive ? t.cta : t.textMuted,
              strokeWidth: isActive ? 2.5 : 2,
            }),
            React.createElement('span', {
              style: {
                fontSize: 10,
                fontWeight: isActive ? 700 : 500,
                color: isActive ? t.cta : t.textMuted,
                fontFamily: '"IBM Plex Sans", sans-serif',
                transition: 'color 0.2s ease',
              }
            }, item.label)
          );
        })
      )
    )
  );
}

function HomeScreen({ ctx }) {
  const { t, theme, setTheme, setActiveScreen, streak, xp, completedToday } = ctx;
  const [hoveredSnippet, setHoveredSnippet] = useState(null);

  const difficultyColor = (d) => d === 'Easy' ? '#22C55E' : d === 'Medium' ? '#F59E0B' : '#EF4444';

  return React.createElement('div', {
    style: { animation: 'fadeIn 0.3s ease', padding: '20px 16px 0' }
  },
    React.createElement('div', {
      style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }
    },
      React.createElement('div', null,
        React.createElement('div', {
          style: {
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 22,
            fontWeight: 800,
            color: t.text,
            lineHeight: 1.2,
          }
        }, 'Snippet'),
        React.createElement('div', {
          style: {
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 22,
            fontWeight: 800,
            color: t.cta,
            lineHeight: 1.2,
          }
        }, 'Sprint_')
      ),
      React.createElement('div', { style: { display: 'flex', gap: 8, alignItems: 'center' } },
        React.createElement('button', {
          className: 'btn-press',
          onClick: () => setTheme(theme === 'light' ? 'dark' : 'light'),
          style: {
            width: 36, height: 36,
            borderRadius: 10,
            background: t.surface,
            border: 'none',
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.2s ease',
          }
        },
          React.createElement(window.lucide[theme === 'light' ? 'Moon' : 'Sun'], { size: 16, color: t.textSecondary })
        ),
        React.createElement('div', {
          style: {
            width: 36, height: 36, borderRadius: 10,
            background: 'linear-gradient(135deg, #22C55E, #16A34A)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(34,197,94,0.4)',
          }
        },
          React.createElement(window.lucide.Bell, { size: 16, color: '#fff' })
        )
      )
    ),

    React.createElement('div', {
      style: {
        background: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
        borderRadius: 20,
        padding: '18px 20px',
        marginBottom: 16,
        position: 'relative',
        overflow: 'hidden',
      }
    },
      React.createElement('div', {
        style: {
          position: 'absolute', top: -20, right: -20,
          width: 100, height: 100,
          background: 'rgba(34,197,94,0.15)',
          borderRadius: '50%',
        }
      }),
      React.createElement('div', {
        style: {
          position: 'absolute', bottom: -30, right: 40,
          width: 70, height: 70,
          background: 'rgba(99,102,241,0.2)',
          borderRadius: '50%',
        }
      }),
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative' } },
        React.createElement('div', null,
          React.createElement('div', {
            style: { fontSize: 11, fontWeight: 600, color: '#94A3B8', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 4 }
          }, 'Total XP Earned'),
          React.createElement('div', {
            style: { fontFamily: '"JetBrains Mono", monospace', fontSize: 32, fontWeight: 800, color: '#F8FAFC', lineHeight: 1 }
          }, xp.toLocaleString()),
          React.createElement('div', { style: { display: 'flex', gap: 12, marginTop: 12 } },
            [
              { label: 'Streak', value: `${streak}🔥`, sub: 'days' },
              { label: 'Today', value: completedToday, sub: 'done' },
              { label: 'Level', value: 24, sub: 'rank' },
            ].map(stat => React.createElement('div', { key: stat.label },
              React.createElement('div', {
                style: { fontFamily: '"JetBrains Mono", monospace', fontSize: 18, fontWeight: 700, color: '#22C55E' }
              }, stat.value),
              React.createElement('div', { style: { fontSize: 10, color: '#64748B' } }, stat.sub),
            ))
          )
        ),
        React.createElement('div', {
          style: {
            width: 52, height: 52, borderRadius: 14,
            background: 'rgba(34,197,94,0.2)',
            border: '2px solid rgba(34,197,94,0.5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }
        },
          React.createElement(window.lucide.Trophy, { size: 24, color: '#22C55E' })
        )
      )
    ),

    React.createElement('div', {
      style: {
        display: 'flex', gap: 10, marginBottom: 20,
        overflowX: 'auto', paddingBottom: 4,
      }
    },
      [
        { icon: 'Zap', label: 'Daily', count: 3, color: '#22C55E' },
        { icon: 'Clock', label: 'Hourly', count: 1, color: '#6366F1' },
        { icon: 'Users', label: 'Squad', count: 2, color: '#F59E0B' },
        { icon: 'Star', label: 'Forge', count: 5, color: '#EC4899' },
      ].map(cat => React.createElement('div', {
        key: cat.label,
        className: 'btn-press',
        style: {
          flexShrink: 0,
          padding: '10px 14px',
          background: t.cardBg,
          borderRadius: 14,
          border: `1px solid ${t.border}`,
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          minWidth: 72,
          boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
        }
      },
        React.createElement(window.lucide[cat.icon], { size: 18, color: cat.color }),
        React.createElement('div', { style: { fontSize: 10, fontWeight: 600, color: t.textSecondary } }, cat.label),
        React.createElement('div', {
          style: {
            fontSize: 9, fontWeight: 700,
            background: cat.color,
            color: '#fff',
            padding: '1px 6px', borderRadius: 20,
          }
        }, cat.count)
      ))
    ),

    React.createElement('div', {
      style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }
    },
      React.createElement('div', {
        style: { fontFamily: '"JetBrains Mono", monospace', fontSize: 14, fontWeight: 700, color: t.text }
      }, 'Today\'s Sprints'),
      React.createElement('button', {
        style: { fontSize: 12, fontWeight: 600, color: t.cta, background: 'none', border: 'none', cursor: 'pointer' }
      }, 'See all →')
    ),

    SNIPPETS.map((snippet, i) => React.createElement('div', {
      key: snippet.id,
      className: 'snippet-card btn-press',
      onMouseEnter: () => setHoveredSnippet(snippet.id),
      onMouseLeave: () => setHoveredSnippet(null),
      onClick: () => setActiveScreen('sprint'),
      style: {
        background: t.cardBg,
        border: `1px solid ${hoveredSnippet === snippet.id ? t.cta : t.border}`,
        borderRadius: 16,
        padding: '14px 16px',
        marginBottom: 10,
        cursor: 'pointer',
        transition: 'all 0.25s ease',
        boxShadow: hoveredSnippet === snippet.id
          ? `0 8px 24px rgba(34,197,94,0.12)`
          : '0 1px 4px rgba(0,0,0,0.06)',
        animation: `slideUp 0.3s ease ${i * 0.05}s both`,
      }
    },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 } },
        React.createElement('div', { style: { flex: 1 } },
          React.createElement('div', {
            style: { fontFamily: '"JetBrains Mono", monospace', fontSize: 13, fontWeight: 700, color: t.text, marginBottom: 4 }
          }, snippet.title),
          React.createElement('div', { style: { fontSize: 11, color: t.textSecondary, lineHeight: 1.4 } }, snippet.description)
        ),
        React.createElement('div', {
          style: {
            width: 40, height: 40, borderRadius: 10, flexShrink: 0, marginLeft: 12,
            background: `${difficultyColor(snippet.difficulty)}18`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }
        },
          React.createElement(window.lucide.Code2, { size: 20, color: difficultyColor(snippet.difficulty) })
        )
      ),
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
        React.createElement('div', { style: { display: 'flex', gap: 6 } },
          snippet.tags.slice(0, 2).map(tag => React.createElement('span', {
            key: tag,
            style: {
              fontSize: 9, fontWeight: 700, padding: '2px 7px',
              background: t.accentLight, color: t.accent,
              borderRadius: 6, letterSpacing: '0.04em',
            }
          }, tag))
        ),
        React.createElement('div', { style: { display: 'flex', gap: 12, alignItems: 'center' } },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 3 } },
            React.createElement(window.lucide.Clock, { size: 10, color: t.textMuted }),
            React.createElement('span', { style: { fontSize: 10, color: t.textMuted } }, snippet.time)
          ),
          React.createElement('div', {
            style: {
              fontSize: 10, fontWeight: 700,
              color: difficultyColor(snippet.difficulty),
              background: `${difficultyColor(snippet.difficulty)}15`,
              padding: '2px 8px', borderRadius: 6,
            }
          }, snippet.difficulty),
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 3 } },
            React.createElement(window.lucide.Star, { size: 10, color: '#F59E0B' }),
            React.createElement('span', { style: { fontSize: 10, fontWeight: 700, color: '#F59E0B' } }, `+${snippet.xp}`)
          )
        )
      )
    ))
  );
}

function SprintScreen({ ctx }) {
  const { t, theme, setTheme, timerActive, setTimerActive, timerSeconds, setTimerSeconds, formatTime, xp, setXp, completedToday, setCompletedToday } = ctx;
  const [tab, setTab] = useState('challenge');
  const [submitted, setSubmitted] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const snippet = SNIPPETS[0];
  const timerPct = (timerSeconds / 720) * 100;

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => {
      setShowSuccess(true);
      setXp(x => x + snippet.xp);
      setCompletedToday(c => c + 1);
      setTimerActive(false);
    }, 800);
  };

  return React.createElement('div', { style: { animation: 'fadeIn 0.3s ease' } },
    React.createElement('div', {
      style: {
        background: 'linear-gradient(180deg, #1E293B 0%, #0F172A 100%)',
        padding: '20px 16px 24px',
        position: 'relative',
        overflow: 'hidden',
      }
    },
      React.createElement('div', {
        style: {
          position: 'absolute', top: -40, right: -40,
          width: 120, height: 120, borderRadius: '50%',
          background: 'rgba(34,197,94,0.1)',
        }
      }),
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, position: 'relative' } },
        React.createElement('div', null,
          React.createElement('div', {
            style: { fontSize: 10, fontWeight: 600, color: '#64748B', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 2 }
          }, 'Active Sprint'),
          React.createElement('div', {
            style: { fontFamily: '"JetBrains Mono", monospace', fontSize: 16, fontWeight: 800, color: '#F8FAFC' }
          }, snippet.title)
        ),
        React.createElement('button', {
          className: 'btn-press',
          onClick: () => setTheme(theme === 'light' ? 'dark' : 'light'),
          style: {
            width: 36, height: 36, borderRadius: 10,
            background: 'rgba(255,255,255,0.1)', border: 'none',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }
        },
          React.createElement(window.lucide[theme === 'light' ? 'Moon' : 'Sun'], { size: 16, color: '#94A3B8' })
        )
      ),

      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 16, position: 'relative' } },
        React.createElement('div', {
          style: {
            position: 'relative', width: 72, height: 72,
          }
        },
          React.createElement('svg', { width: 72, height: 72, viewBox: '0 0 72 72' },
            React.createElement('circle', { cx: 36, cy: 36, r: 30, fill: 'none', stroke: '#334155', strokeWidth: 6 }),
            React.createElement('circle', {
              cx: 36, cy: 36, r: 30, fill: 'none',
              stroke: timerSeconds < 120 ? '#EF4444' : '#22C55E',
              strokeWidth: 6,
              strokeDasharray: `${2 * Math.PI * 30}`,
              strokeDashoffset: `${2 * Math.PI * 30 * (1 - timerPct / 100)}`,
              strokeLinecap: 'round',
              transform: 'rotate(-90 36 36)',
              style: { transition: 'stroke-dashoffset 1s linear, stroke 0.3s ease' }
            })
          ),
          React.createElement('div', {
            style: {
              position: 'absolute', inset: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }
          },
            React.createElement('div', {
              style: {
                fontFamily: '"JetBrains Mono", monospace', fontSize: 13, fontWeight: 700,
                color: timerSeconds < 120 ? '#EF4444' : '#F8FAFC',
              }
            }, formatTime(timerSeconds))
          )
        ),

        React.createElement('div', { style: { flex: 1 } },
          React.createElement('div', { style: { display: 'flex', gap: 8, marginBottom: 10 } },
            React.createElement('button', {
              className: 'btn-press',
              onClick: () => setTimerActive(a => !a),
              style: {
                flex: 1, padding: '8px', borderRadius: 10,
                background: timerActive ? 'rgba(239,68,68,0.15)' : 'rgba(34,197,94,0.15)',
                border: `1px solid ${timerActive ? 'rgba(239,68,68,0.3)' : 'rgba(34,197,94,0.3)'}`,
                color: timerActive ? '#EF4444' : '#22C55E',
                fontSize: 11, fontWeight: 700, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4,
                transition: 'all 0.2s ease',
                animation: timerActive ? 'timerPulse 2s infinite' : 'none',
              }
            },
              React.createElement(window.lucide[timerActive ? 'Pause' : 'Play'], { size: 12 }),
              timerActive ? 'Pause' : 'Start'
            ),
            React.createElement('button', {
              className: 'btn-press',
              onClick: () => setTimerSeconds(720),
              style: {
                padding: '8px 12px', borderRadius: 10,
                background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)',
                color: '#94A3B8', fontSize: 11, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }
            },
              React.createElement(window.lucide.RotateCcw, { size: 12 })
            )
          ),
          React.createElement('div', { style: { display: 'flex', gap: 6 } },
            [
              { label: 'Diff', value: 'Medium', color: '#F59E0B' },
              { label: 'XP', value: `+${snippet.xp}`, color: '#22C55E' },
            ].map(s => React.createElement('div', {
              key: s.label,
              style: {
                fontSize: 10, fontWeight: 700, padding: '3px 8px',
                background: 'rgba(255,255,255,0.06)', borderRadius: 6,
                color: s.color,
              }
            }, `${s.label}: ${s.value}`))
          )
        )
      )
    ),

    React.createElement('div', { style: { display: 'flex', borderBottom: `1px solid ${t.border}`, background: t.cardBg } },
      ['challenge', 'code', 'hints'].map(tab_ => React.createElement('button', {
        key: tab_,
        onClick: () => setTab(tab_),
        style: {
          flex: 1, padding: '12px 0',
          background: 'none', border: 'none', cursor: 'pointer',
          fontSize: 11, fontWeight: 700,
          color: tab === tab_ ? t.cta : t.textMuted,
          borderBottom: `2px solid ${tab === tab_ ? t.cta : 'transparent'}`,
          textTransform: 'capitalize', letterSpacing: '0.04em',
          transition: 'all 0.2s ease',
        }
      }, tab_))
    ),

    React.createElement('div', { style: { padding: '16px' } },
      tab === 'challenge' && React.createElement('div', { style: { animation: 'fadeIn 0.2s ease' } },
        React.createElement('div', {
          style: {
            background: t.cardBg, border: `1px solid ${t.border}`,
            borderRadius: 16, padding: '14px', marginBottom: 12,
          }
        },
          React.createElement('div', {
            style: { fontSize: 11, fontWeight: 700, color: t.cta, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }
          }, 'Objective'),
          React.createElement('div', { style: { fontSize: 12, color: t.textSecondary, lineHeight: 1.6 } },
            'Implement a custom React hook ', React.createElement('code', {
              style: { fontFamily: '"JetBrains Mono", monospace', background: t.surface, padding: '1px 5px', borderRadius: 4, fontSize: 11 }
            }, 'useDebounce<T>'), ' that takes a value and delay parameter, returning the debounced value. Clean up the timeout on unmount.'
          )
        ),
        React.createElement('div', {
          style: {
            background: t.cardBg, border: `1px solid ${t.border}`,
            borderRadius: 16, padding: '14px', marginBottom: 12,
          }
        },
          React.createElement('div', {
            style: { fontSize: 11, fontWeight: 700, color: t.accent, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }
          }, 'Requirements'),
          ['Generic type parameter <T>', 'value: T + delay: number args', 'Returns debounced T', 'Cleans up on unmount', 'Resets timer on value change'].map((r, i) => React.createElement('div', {
            key: i, style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }
          },
            React.createElement(window.lucide.CheckCircle, { size: 12, color: t.cta }),
            React.createElement('span', { style: { fontSize: 11, color: t.textSecondary } }, r)
          ))
        ),
        React.createElement('div', {
          style: {
            background: t.cardBg, border: `1px solid ${t.border}`,
            borderRadius: 16, padding: '12px 14px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }
        },
          React.createElement('div', null,
            React.createElement('div', { style: { fontSize: 11, color: t.textMuted, marginBottom: 2 } }, 'Skill Shard Reward'),
            React.createElement('div', { style: { fontSize: 13, fontWeight: 700, color: t.text } }, snippet.shard)
          ),
          React.createElement('div', {
            style: {
              width: 36, height: 36, borderRadius: 10,
              background: 'linear-gradient(135deg, #6366F1, #8B5CF6)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }
          },
            React.createElement(window.lucide.Gem, { size: 18, color: '#fff' })
          )
        )
      ),

      tab === 'code' && React.createElement('div', { style: { animation: 'fadeIn 0.2s ease' } },
        React.createElement('div', {
          style: {
            background: '#0F172A', borderRadius: 14,
            padding: '14px', marginBottom: 12,
            border: '1px solid #334155',
          }
        },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 } },
            React.createElement('div', { style: { display: 'flex', gap: 5 } },
              ['#EF4444', '#F59E0B', '#22C55E'].map(c => React.createElement('div', {
                key: c, style: { width: 8, height: 8, borderRadius: '50%', background: c }
              }))
            ),
            React.createElement('div', {
              style: { fontSize: 10, fontFamily: '"JetBrains Mono", monospace', color: '#475569' }
            }, 'useDebounce.ts')
          ),
          React.createElement('pre', {
            style: {
              margin: 0, fontFamily: '"JetBrains Mono", monospace',
              fontSize: 11, lineHeight: 1.6, color: '#E2E8F0',
              overflowX: 'auto', whiteSpace: 'pre',
            }
          }, CODE_SAMPLE)
        ),
        showSuccess
          ? React.createElement('div', {
            style: {
              background: 'linear-gradient(135deg, #14532D, #166534)',
              border: '1px solid rgba(34,197,94,0.4)',
              borderRadius: 16, padding: '20px',
              textAlign: 'center', animation: 'slideUp 0.4s ease',
            }
          },
            React.createElement(window.lucide.PartyPopper, { size: 32, color: '#22C55E', style: { margin: '0 auto 10px' } }),
            React.createElement('div', {
              style: { fontFamily: '"JetBrains Mono", monospace', fontSize: 18, fontWeight: 800, color: '#22C55E', marginBottom: 4 }
            }, 'Sprint Complete!'),
            React.createElement('div', { style: { fontSize: 12, color: '#86EFAC', marginBottom: 12 } }, `+${snippet.xp} XP earned • React Hooks Shard +1`),
            React.createElement('div', {
              style: {
                display: 'inline-block', padding: '8px 20px', borderRadius: 10,
                background: 'rgba(34,197,94,0.2)', border: '1px solid rgba(34,197,94,0.4)',
                fontSize: 11, fontWeight: 700, color: '#22C55E',
              }
            }, '🏅 React Hooks Mastery • Level 3')
          )
          : React.createElement('button', {
            className: 'btn-press',
            onClick: handleSubmit,
            disabled: submitted,
            style: {
              width: '100%', padding: '14px',
              background: submitted ? t.surface : 'linear-gradient(135deg, #22C55E, #16A34A)',
              border: 'none', borderRadius: 14,
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: 14, fontWeight: 800, color: '#fff',
              cursor: submitted ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              transition: 'all 0.2s ease',
              boxShadow: submitted ? 'none' : '0 4px 16px rgba(34,197,94,0.35)',
            }
          },
            submitted
              ? React.createElement(window.lucide.Loader, { size: 16, style: { animation: 'spin 1s linear infinite' } })
              : React.createElement(window.lucide.Send, { size: 16 }),
            submitted ? 'Evaluating...' : 'Submit Solution'
          )
      ),

      tab === 'hints' && React.createElement('div', { style: { animation: 'fadeIn 0.2s ease' } },
        [
          { title: 'Use useState', body: 'Store the debounced value in a useState hook initialized with the input value.', cost: 10 },
          { title: 'useEffect cleanup', body: 'Return a cleanup function from useEffect that calls clearTimeout on the handler.', cost: 25 },
          { title: 'Dependency array', body: 'Include both value and delay in the useEffect dependency array to reset on changes.', cost: 40 },
        ].map((hint, i) => React.createElement('div', {
          key: i,
          style: {
            background: t.cardBg, border: `1px solid ${t.border}`,
            borderRadius: 14, padding: '12px 14px', marginBottom: 10,
            display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
          }
        },
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', { style: { fontSize: 12, fontWeight: 700, color: t.text, marginBottom: 4 } }, `Hint ${i + 1}: ${hint.title}`),
            React.createElement('div', { style: { fontSize: 11, color: t.textSecondary, lineHeight: 1.5 } }, hint.body)
          ),
          React.createElement('div', {
            style: {
              fontSize: 10, fontWeight: 700, padding: '3px 8px',
              background: t.warningLight, color: t.warning,
              borderRadius: 6, marginLeft: 10, flexShrink: 0,
            }
          }, `-${hint.cost} XP`)
        ))
      )
    )
  );
}

function SquadScreen({ ctx }) {
  const { t, theme, setTheme, activeSquad, setActiveSquad } = ctx;
  const squad = SQUADS[activeSquad];

  return React.createElement('div', { style: { padding: '20px 16px 0', animation: 'fadeIn 0.3s ease' } },
    React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 } },
      React.createElement('div', {
        style: { fontFamily: '"JetBrains Mono", monospace', fontSize: 20, fontWeight: 800, color: t.text }
      }, 'Dev Squads'),
      React.createElement('div', { style: { display: 'flex', gap: 8 } },
        React.createElement('button', {
          className: 'btn-press',
          onClick: () => setTheme(theme === 'light' ? 'dark' : 'light'),
          style: {
            width: 36, height: 36, borderRadius: 10, background: t.surface,
            border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }
        },
          React.createElement(window.lucide[theme === 'light' ? 'Moon' : 'Sun'], { size: 16, color: t.textSecondary })
        ),
        React.createElement('button', {
          className: 'btn-press',
          style: {
            padding: '0 12px', height: 36, borderRadius: 10,
            background: 'linear-gradient(135deg, #22C55E, #16A34A)',
            border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5,
            boxShadow: '0 2px 8px rgba(34,197,94,0.3)',
          }
        },
          React.createElement(window.lucide.Plus, { size: 14, color: '#fff' }),
          React.createElement('span', { style: { fontSize: 11, fontWeight: 700, color: '#fff' } }, 'New Squad')
        )
      )
    ),

    SQUADS.map((s, i) => React.createElement('div', {
      key: s.id,
      className: 'squad-card btn-press',
      onClick: () => setActiveSquad(i),
      style: {
        background: activeSquad === i
          ? 'linear-gradient(135deg, #1E293B 0%, #334155 100%)'
          : t.cardBg,
        border: `1px solid ${activeSquad === i ? '#22C55E' : t.border}`,
        borderRadius: 18, padding: '16px',
        marginBottom: 12, cursor: 'pointer',
        transition: 'all 0.25s ease',
        boxShadow: activeSquad === i ? '0 8px 24px rgba(34,197,94,0.15)' : '0 1px 4px rgba(0,0,0,0.06)',
        animation: `slideUp 0.3s ease ${i * 0.1}s both`,
      }
    },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 } },
        React.createElement('div', null,
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 } },
            React.createElement('div', {
              style: { fontFamily: '"JetBrains Mono", monospace', fontSize: 14, fontWeight: 800, color: activeSquad === i ? '#F8FAFC' : t.text }
            }, s.name),
            s.active && React.createElement('div', {
              style: {
                fontSize: 9, fontWeight: 700, padding: '2px 6px',
                background: 'rgba(34,197,94,0.2)', color: '#22C55E',
                borderRadius: 5, border: '1px solid rgba(34,197,94,0.3)',
                animation: 'pulse 2s infinite',
              }
            }, 'LIVE')
          ),
          React.createElement('div', { style: { fontSize: 11, color: activeSquad === i ? '#94A3B8' : t.textSecondary } }, s.goal)
        ),
        React.createElement('div', { style: { display: 'flex', gap: 4 } },
          s.members.map((m, mi) => React.createElement('div', {
            key: mi,
            style: {
              width: 26, height: 26, borderRadius: '50%',
              background: ['#6366F1', '#22C55E', '#F59E0B', '#EC4899'][mi % 4],
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 9, fontWeight: 800, color: '#fff',
              marginLeft: mi > 0 ? -8 : 0,
              border: `2px solid ${activeSquad === i ? '#1E293B' : t.cardBg}`,
            }
          }, m.substring(0, 2)))
        )
      ),

      React.createElement('div', { style: { marginBottom: 8 } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: 4 } },
          React.createElement('span', { style: { fontSize: 10, color: activeSquad === i ? '#64748B' : t.textMuted } }, 'Project Progress'),
          React.createElement('span', {
            style: { fontSize: 10, fontWeight: 700, color: '#22C55E', fontFamily: '"JetBrains Mono", monospace' }
          }, `${s.progress}%`)
        ),
        React.createElement('div', { style: { height: 6, background: activeSquad === i ? 'rgba(255,255,255,0.1)' : t.surface, borderRadius: 3 } },
          React.createElement('div', {
            style: {
              height: '100%', width: `${s.progress}%`,
              background: 'linear-gradient(90deg, #22C55E, #16A34A)',
              borderRadius: 3, transition: 'width 0.6s ease',
            }
          })
        )
      ),

      React.createElement('div', { style: { display: 'flex', gap: 12 } },
        [
          { icon: 'Code2', label: `${s.snippetsDone}/${s.snippetsTotal} snippets`, color: '#6366F1' },
          { icon: 'Star', label: `${s.xpPool.toLocaleString()} XP pool`, color: '#F59E0B' },
          { icon: 'Clock', label: s.timeLeft + ' left', color: '#06B6D4' },
        ].map(stat => React.createElement('div', {
          key: stat.label, style: { display: 'flex', alignItems: 'center', gap: 4 }
        },
          React.createElement(window.lucide[stat.icon], { size: 10, color: stat.color }),
          React.createElement('span', { style: { fontSize: 10, color: activeSquad === i ? '#94A3B8' : t.textMuted } }, stat.label)
        ))
      )
    )),

    React.createElement('div', {
      style: {
        fontFamily: '"JetBrains Mono", monospace', fontSize: 13, fontWeight: 700,
        color: t.text, marginBottom: 12, marginTop: 4,
      }
    }, `${squad.name} — Snippets`),

    React.createElement('div', {
      style: {
        background: t.cardBg, border: `1px solid ${t.border}`,
        borderRadius: 16, overflow: 'hidden',
      }
    },
      [
        { title: 'WebSocket handshake', assignee: 'AJ', done: true, xp: 80 },
        { title: 'State sync protocol', assignee: 'SK', done: true, xp: 120 },
        { title: 'Conflict resolution', assignee: 'MR', done: false, xp: 160 },
        { title: 'OT algorithm impl', assignee: 'You', done: false, xp: 200 },
      ].map((item, i, arr) => React.createElement('div', {
        key: i,
        style: {
          display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px',
          borderBottom: i < arr.length - 1 ? `1px solid ${t.border}` : 'none',
        }
      },
        React.createElement('div', {
          style: {
            width: 20, height: 20, borderRadius: 6, flexShrink: 0,
            background: item.done ? '#22C55E' : t.surface,
            border: `1.5px solid ${item.done ? '#22C55E' : t.border}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }
        },
          item.done && React.createElement(window.lucide.Check, { size: 11, color: '#fff', strokeWidth: 3 })
        ),
        React.createElement('div', { style: { flex: 1 } },
          React.createElement('div', {
            style: {
              fontSize: 11, fontWeight: 600, color: item.done ? t.textMuted : t.text,
              textDecoration: item.done ? 'line-through' : 'none',
            }
          }, item.title),
          React.createElement('div', { style: { fontSize: 10, color: t.textMuted } }, `@${item.assignee}`)
        ),
        React.createElement('div', {
          style: { fontSize: 10, fontWeight: 700, color: item.done ? t.textMuted : '#F59E0B' }
        }, `+${item.xp}`)
      ))
    )
  );
}

function ProfileScreen({ ctx }) {
  const { t, theme, setTheme, streak, xp, completedToday } = ctx;
  const level = 24;
  const levelXP = xp % 500;
  const levelPct = (levelXP / 500) * 100;

  return React.createElement('div', { style: { animation: 'fadeIn 0.3s ease' } },
    React.createElement('div', {
      style: {
        background: 'linear-gradient(180deg, #0F172A 0%, #1E293B 100%)',
        padding: '20px 16px 30px',
        position: 'relative',
        overflow: 'hidden',
      }
    },
      React.createElement('div', {
        style: {
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: 'radial-gradient(ellipse at 80% 20%, rgba(99,102,241,0.2) 0%, transparent 50%), radial-gradient(ellipse at 20% 80%, rgba(34,197,94,0.15) 0%, transparent 50%)',
        }
      }),
      React.createElement('div', { style: { display: 'flex', justifyContent: 'flex-end', marginBottom: 20, position: 'relative' } },
        React.createElement('button', {
          className: 'btn-press',
          onClick: () => setTheme(theme === 'light' ? 'dark' : 'light'),
          style: {
            width: 36, height: 36, borderRadius: 10,
            background: 'rgba(255,255,255,0.1)', border: 'none',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }
        },
          React.createElement(window.lucide[theme === 'light' ? 'Moon' : 'Sun'], { size: 16, color: '#94A3B8' })
        )
      ),

      React.createElement('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' } },
        React.createElement('div', {
          style: {
            width: 72, height: 72, borderRadius: '50%',
            background: 'linear-gradient(135deg, #22C55E, #16A34A)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: 10, fontSize: 28, fontWeight: 800, color: '#fff',
            boxShadow: '0 0 0 3px rgba(34,197,94,0.3), 0 0 0 6px rgba(34,197,94,0.1)',
            fontFamily: '"JetBrains Mono", monospace',
          }
        }, 'JS'),
        React.createElement('div', {
          style: { fontFamily: '"JetBrains Mono", monospace', fontSize: 18, fontWeight: 800, color: '#F8FAFC', marginBottom: 2 }
        }, 'Jamie Stokes'),
        React.createElement('div', { style: { fontSize: 11, color: '#64748B', marginBottom: 14 } }, '@jstokes_dev • Full-Stack Engineer'),

        React.createElement('div', { style: { display: 'flex', gap: 20, marginBottom: 16 } },
          [
            { label: 'Total XP', value: xp.toLocaleString(), color: '#22C55E' },
            { label: 'Streak', value: `${streak}d`, color: '#F59E0B' },
            { label: 'Level', value: level, color: '#6366F1' },
          ].map(s => React.createElement('div', { key: s.label, style: { textAlign: 'center' } },
            React.createElement('div', {
              style: { fontFamily: '"JetBrains Mono", monospace', fontSize: 20, fontWeight: 800, color: s.color }
            }, s.value),
            React.createElement('div', { style: { fontSize: 10, color: '#64748B' } }, s.label)
          ))
        ),

        React.createElement('div', { style: { width: '100%' } },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: 6 } },
            React.createElement('span', { style: { fontSize: 10, color: '#64748B' } }, `Level ${level}`),
            React.createElement('span', {
              style: { fontSize: 10, fontFamily: '"JetBrains Mono", monospace', color: '#94A3B8' }
            }, `${levelXP}/500 XP`)
          ),
          React.createElement('div', { style: { height: 8, background: 'rgba(255,255,255,0.1)', borderRadius: 4 } },
            React.createElement('div', {
              style: {
                height: '100%', width: `${levelPct}%`,
                background: 'linear-gradient(90deg, #6366F1, #22C55E)',
                borderRadius: 4, transition: 'width 0.6s ease',
              }
            })
          )
        )
      )
    ),

    React.createElement('div', { style: { padding: '16px 16px 0' } },
      React.createElement('div', {
        style: { fontFamily: '"JetBrains Mono", monospace', fontSize: 13, fontWeight: 800, color: t.text, marginBottom: 12 }
      }, 'Skill Shards'),

      SHARDS.map((shard, i) => React.createElement('div', {
        key: i,
        className: 'shard-row',
        style: {
          display: 'flex', alignItems: 'center', gap: 12,
          padding: '10px 12px', borderRadius: 12, marginBottom: 6,
          background: t.cardBg, border: `1px solid ${t.border}`,
          transition: 'all 0.2s ease',
          animation: `slideUp 0.3s ease ${i * 0.06}s both`,
        }
      },
        React.createElement('div', {
          style: {
            width: 36, height: 36, borderRadius: 10, flexShrink: 0,
            background: `${shard.color}20`,
            border: `2px solid ${shard.color}40`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }
        },
          React.createElement(window.lucide.Gem, { size: 16, color: shard.color })
        ),
        React.createElement('div', { style: { flex: 1 } },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 } },
            React.createElement('div', { style: { fontSize: 11, fontWeight: 700, color: t.text } }, shard.name),
            React.createElement('div', {
              style: { fontSize: 9, fontWeight: 800, color: shard.color, background: `${shard.color}18`, padding: '2px 6px', borderRadius: 5 }
            }, `Lv.${shard.level}`)
          ),
          React.createElement('div', { style: { height: 4, background: t.surface, borderRadius: 2 } },
            React.createElement('div', {
              style: {
                height: '100%', width: `${shard.progress}%`,
                background: shard.color,
                borderRadius: 2, transition: 'width 0.6s ease',
              }
            })
          )
        )
      )),

      React.createElement('div', {
        style: { fontFamily: '"JetBrains Mono", monospace', fontSize: 13, fontWeight: 800, color: t.text, margin: '16px 0 12px' }
      }, 'This Week'),
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', gap: 4, marginBottom: 16 } },
        ['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => {
          const done = i < 5;
          const today = i === 4;
          return React.createElement('div', {
            key: i,
            style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }
          },
            React.createElement('div', {
              style: {
                width: 32, height: 32, borderRadius: 8,
                background: done ? (today ? '#22C55E' : `${t.cta}30`) : t.surface,
                border: `1.5px solid ${done ? (today ? '#22C55E' : `${t.cta}50`) : t.border}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                animation: today ? 'pulse 2s infinite' : 'none',
              }
            },
              done && React.createElement(window.lucide.Zap, { size: 14, color: today ? '#fff' : t.cta })
            ),
            React.createElement('div', { style: { fontSize: 9, color: t.textMuted, fontWeight: 600 } }, day)
          );
        })
      ),

      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 } },
        [
          { label: 'Sprints Done', value: 47, icon: 'Code2', color: '#6366F1' },
          { label: 'Squads Joined', value: 8, icon: 'Users', color: '#22C55E' },
          { label: 'Snippets Forged', value: 3, icon: 'Hammer', color: '#F59E0B' },
          { label: 'Top 3%', value: 'Global', icon: 'Trophy', color: '#EC4899' },
        ].map((s, i) => React.createElement('div', {
          key: i,
          style: {
            background: t.cardBg, border: `1px solid ${t.border}`,
            borderRadius: 14, padding: '12px',
            display: 'flex', alignItems: 'center', gap: 10,
          }
        },
          React.createElement('div', {
            style: {
              width: 36, height: 36, borderRadius: 10, flexShrink: 0,
              background: `${s.color}15`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }
          },
            React.createElement(window.lucide[s.icon], { size: 18, color: s.color })
          ),
          React.createElement('div', null,
            React.createElement('div', {
              style: { fontFamily: '"JetBrains Mono", monospace', fontSize: 16, fontWeight: 800, color: s.color }
            }, s.value),
            React.createElement('div', { style: { fontSize: 10, color: t.textMuted } }, s.label)
          )
        ))
      )
    )
  );
}
