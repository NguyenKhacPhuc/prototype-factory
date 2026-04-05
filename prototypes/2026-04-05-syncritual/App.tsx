// SyncRitual - Live focus. Shared flow.
// Interactive mobile prototype

function App() {
  const { useState, useEffect, useRef } = React;

  // ── Theme System ──────────────────────────────────────────────
  const themes = {
    dark: {
      bg: '#0F0A1E',
      surface: '#1A1130',
      surfaceAlt: '#221845',
      card: '#1E1538',
      cardHover: '#261D45',
      border: '#2E2050',
      primary: '#7C3AED',
      primaryLight: '#9D5CF0',
      secondary: '#A78BFA',
      cta: '#22C55E',
      ctaHover: '#16A34A',
      text: '#F5F0FF',
      textMuted: '#9B8EC4',
      textSubtle: '#6B5E8A',
      overlay: 'rgba(15,10,30,0.85)',
    },
    light: {
      bg: '#FAF5FF',
      surface: '#FFFFFF',
      surfaceAlt: '#F3E8FF',
      card: '#FFFFFF',
      cardHover: '#F3E8FF',
      border: '#E9D5FF',
      primary: '#7C3AED',
      primaryLight: '#9D5CF0',
      secondary: '#A78BFA',
      cta: '#22C55E',
      ctaHover: '#16A34A',
      text: '#1A0A3E',
      textMuted: '#6B5E8A',
      textSubtle: '#9B8EC4',
      overlay: 'rgba(250,245,255,0.92)',
    },
  };

  const [isDark, setIsDark] = useState(true);
  const t = isDark ? themes.dark : themes.light;

  const [activeScreen, setActiveScreen] = useState('home');
  const [activeChamber, setActiveChamber] = useState(null);
  const [sessionActive, setSessionActive] = useState(false);
  const [sessionSeconds, setSessionSeconds] = useState(0);
  const [intentionText, setIntentionText] = useState('');
  const [showIntention, setShowIntention] = useState(false);
  const [showReflection, setShowReflection] = useState(false);
  const [reflectionText, setReflectionText] = useState('');
  const timerRef = useRef(null);

  useEffect(() => {
    if (sessionActive) {
      timerRef.current = setInterval(() => setSessionSeconds(s => s + 1), 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [sessionActive]);

  const fmt = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}`;
  };

  // ── Data ─────────────────────────────────────────────────────
  const identityPaths = [
    { id: 'writer', label: 'The Writer', icon: 'PenLine', color: '#7C3AED', level: 4, xp: 820, maxXp: 1000, streak: 12, desc: 'Daily writing sprints, story arcs & craft mastery' },
    { id: 'meditator', label: 'The Meditator', icon: 'Brain', color: '#06B6D4', level: 2, xp: 340, maxXp: 500, streak: 7, desc: 'Mindful presence, breathwork & inner stillness' },
    { id: 'athlete', label: 'The Athlete', icon: 'Dumbbell', color: '#F59E0B', level: 3, xp: 610, maxXp: 800, streak: 5, desc: 'Movement, endurance & peak physical performance' },
    { id: 'coder', label: 'The Builder', icon: 'Code2', color: '#22C55E', level: 5, xp: 980, maxXp: 1200, streak: 21, desc: 'Deep work sessions, systems thinking & creation' },
  ];

  const chambers = [
    { id: 'morning-write', name: 'Dawn Writing Sprint', path: 'writer', pathLabel: 'The Writer', time: 'Live Now', participants: 47, maxParticipants: 60, duration: 25, color: '#7C3AED', icon: 'PenLine', mood: 'Focused Flow', isLive: true, host: 'Maya R.' },
    { id: 'deep-work', name: 'Deep Work Forge', path: 'coder', pathLabel: 'The Builder', time: 'Starts in 8 min', participants: 31, maxParticipants: 50, duration: 90, color: '#22C55E', icon: 'Code2', mood: 'Power Mode', isLive: false, host: 'Alex T.' },
    { id: 'midday-mind', name: 'Midday Mind Reset', path: 'meditator', pathLabel: 'The Meditator', time: '2:00 PM', participants: 18, maxParticipants: 40, duration: 15, color: '#06B6D4', icon: 'Brain', mood: 'Still Waters', isLive: false, host: 'Priya M.' },
    { id: 'evening-run', name: 'Sunset Endurance', path: 'athlete', pathLabel: 'The Athlete', time: '6:30 PM', participants: 24, maxParticipants: 35, duration: 45, color: '#F59E0B', icon: 'Zap', mood: 'Fire Up', isLive: false, host: 'Jordan K.' },
    { id: 'night-write', name: 'Midnight Ink Session', path: 'writer', pathLabel: 'The Writer', time: '10:00 PM', participants: 9, maxParticipants: 25, duration: 30, color: '#7C3AED', icon: 'PenLine', mood: 'Quiet Depth', isLive: false, host: 'Sam L.' },
  ];

  const badges = [
    { id: 1, name: 'First Ritual', icon: 'Flame', color: '#F59E0B', earned: true, desc: 'Complete your first live session' },
    { id: 2, name: '7-Day Streak', icon: 'Zap', color: '#22C55E', earned: true, desc: 'Seven consecutive days' },
    { id: 3, name: 'Dawn Keeper', icon: 'Sunrise', color: '#F97316', earned: true, desc: '10 morning sessions before 8am' },
    { id: 4, name: 'Word Weaver', icon: 'PenLine', color: '#7C3AED', earned: true, desc: '50 writing chamber completions' },
    { id: 5, name: 'Silent Giant', icon: 'Volume2', color: '#06B6D4', earned: false, desc: 'Complete 25 meditation sessions' },
    { id: 6, name: 'Iron Mind', icon: 'Trophy', color: '#A78BFA', earned: false, desc: 'Reach Level 10 in any path' },
  ];

  const userIdentity = identityPaths[0];

  // ── Lucide helper ─────────────────────────────────────────────
  const Icon = ({ name, size = 20, color = 'currentColor', strokeWidth = 1.8 }) => {
    const LIcon = window.lucide && window.lucide[name];
    if (!LIcon) return null;
    return React.createElement(LIcon, { size, color, strokeWidth });
  };

  // ── Animations (injected once) ────────────────────────────────
  const styleTag = React.createElement('style', { key: 'anim' }, `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; -webkit-tap-highlight-color: transparent; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.7; transform: scale(0.97); } }
    @keyframes shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
    @keyframes livePulse { 0%, 100% { box-shadow: 0 0 0 0 rgba(34,197,94,0.5); } 50% { box-shadow: 0 0 0 8px rgba(34,197,94,0); } }
    @keyframes orbFloat { 0%, 100% { transform: translateY(0) scale(1); } 50% { transform: translateY(-12px) scale(1.04); } }
    @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    @keyframes countUp { from { transform: scale(0.8); opacity: 0; } to { transform: scale(1); opacity: 1; } }
    .ritual-card:hover { transform: translateY(-2px); transition: all 0.2s ease; }
    .chamber-btn:active { transform: scale(0.97); }
    ::-webkit-scrollbar { width: 0px; }
    input, textarea { outline: none; font-family: 'Inter', sans-serif; }
    textarea::placeholder, input::placeholder { opacity: 0.5; }
  `);

  // ── Screens ───────────────────────────────────────────────────

  // HOME SCREEN
  const HomeScreen = () => {
    const [hovered, setHovered] = useState(null);
    const liveChamber = chambers.find(c => c.isLive);
    const upcomingChambers = chambers.filter(c => !c.isLive).slice(0, 2);

    return React.createElement('div', {
      style: { animation: 'fadeIn 0.3s ease', overflowY: 'auto', height: '100%', paddingBottom: 80 }
    },
      // Header
      React.createElement('div', {
        style: {
          padding: '24px 20px 16px',
          background: `linear-gradient(180deg, ${t.surface} 0%, transparent 100%)`,
          position: 'sticky', top: 0, zIndex: 10,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between'
        }
      },
        React.createElement('div', null,
          React.createElement('p', { style: { fontSize: 12, color: t.textMuted, fontWeight: 500, letterSpacing: 1.5, textTransform: 'uppercase' } }, 'Good Morning'),
          React.createElement('h1', { style: { fontSize: 22, fontWeight: 800, color: t.text, fontFamily: 'Inter' } }, 'The Writer ✦')
        ),
        React.createElement('div', {
          style: { display: 'flex', alignItems: 'center', gap: 10 }
        },
          React.createElement('div', {
            onClick: () => setIsDark(!isDark),
            style: {
              width: 36, height: 36, borderRadius: '50%',
              background: t.surfaceAlt, border: `1px solid ${t.border}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', transition: 'all 0.2s'
            }
          }, React.createElement(Icon, { name: isDark ? 'Sun' : 'Moon', size: 16, color: t.secondary })),
          React.createElement('div', {
            style: {
              width: 38, height: 38, borderRadius: '50%',
              background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
            },
            onClick: () => setActiveScreen('profile')
          }, React.createElement(Icon, { name: 'User', size: 18, color: '#fff' }))
        )
      ),

      // Identity Card
      React.createElement('div', { style: { padding: '0 20px 20px' } },
        React.createElement('div', {
          style: {
            background: `linear-gradient(135deg, ${t.primary}CC, #4C1D95CC)`,
            borderRadius: 20, padding: 20,
            border: `1px solid ${t.primary}40`,
            position: 'relative', overflow: 'hidden'
          }
        },
          React.createElement('div', {
            style: {
              position: 'absolute', width: 120, height: 120, borderRadius: '50%',
              background: t.secondary + '20', top: -30, right: -30,
              animation: 'orbFloat 4s ease-in-out infinite'
            }
          }),
          React.createElement('div', {
            style: {
              position: 'absolute', width: 60, height: 60, borderRadius: '50%',
              background: t.primary + '40', bottom: -10, left: 120,
              animation: 'orbFloat 6s ease-in-out infinite'
            }
          }),
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 } },
            React.createElement('div', null,
              React.createElement('span', { style: { fontSize: 11, color: 'rgba(255,255,255,0.7)', fontWeight: 600, letterSpacing: 1.2, textTransform: 'uppercase' } }, 'Your Ritual Path'),
              React.createElement('h2', { style: { fontSize: 24, fontWeight: 900, color: '#fff', marginTop: 4 } }, 'The Writer'),
              React.createElement('p', { style: { fontSize: 13, color: 'rgba(255,255,255,0.7)', marginTop: 2 } }, 'Level 4 · 820 / 1000 XP')
            ),
            React.createElement('div', {
              style: {
                width: 50, height: 50, borderRadius: 14,
                background: 'rgba(255,255,255,0.15)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backdropFilter: 'blur(8px)'
              }
            }, React.createElement(Icon, { name: 'PenLine', size: 24, color: '#fff' }))
          ),
          React.createElement('div', {
            style: { height: 6, background: 'rgba(255,255,255,0.2)', borderRadius: 3, overflow: 'hidden' }
          },
            React.createElement('div', {
              style: {
                width: '82%', height: '100%',
                background: 'linear-gradient(90deg, #fff, rgba(255,255,255,0.8))',
                borderRadius: 3,
                backgroundSize: '200% 100%',
                animation: 'shimmer 2s linear infinite'
              }
            })
          ),
          React.createElement('div', { style: { display: 'flex', gap: 16, marginTop: 14 } },
            [{ icon: 'Flame', val: '12', label: 'Day Streak' }, { icon: 'Users', val: '47', label: 'Co-Rituals' }, { icon: 'Star', val: '4', label: 'Badges' }].map(stat =>
              React.createElement('div', { key: stat.label, style: { display: 'flex', alignItems: 'center', gap: 6 } },
                React.createElement(Icon, { name: stat.icon, size: 14, color: 'rgba(255,255,255,0.8)' }),
                React.createElement('span', { style: { fontSize: 13, color: '#fff', fontWeight: 600 } }, stat.val),
                React.createElement('span', { style: { fontSize: 11, color: 'rgba(255,255,255,0.6)' } }, stat.label)
              )
            )
          )
        )
      ),

      // Live Now
      liveChamber && React.createElement('div', { style: { padding: '0 20px 20px' } },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 } },
          React.createElement('div', { style: { width: 8, height: 8, borderRadius: '50%', background: t.cta, animation: 'livePulse 2s infinite' } }),
          React.createElement('span', { style: { fontSize: 13, fontWeight: 700, color: t.cta, letterSpacing: 0.5 } }, 'LIVE NOW'),
        ),
        React.createElement('div', {
          className: 'ritual-card',
          onClick: () => { setActiveChamber(liveChamber); setActiveScreen('chamber'); }
          , style: {
            background: `linear-gradient(135deg, ${t.card}, ${t.surfaceAlt})`,
            borderRadius: 18, padding: 18,
            border: `1px solid ${t.cta}40`,
            cursor: 'pointer', transition: 'all 0.25s',
            boxShadow: `0 0 24px ${t.cta}25`
          }
        },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' } },
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('h3', { style: { fontSize: 17, fontWeight: 800, color: t.text, marginBottom: 4 } }, liveChamber.name),
              React.createElement('p', { style: { fontSize: 12, color: t.textMuted, marginBottom: 12 } }, `Hosted by ${liveChamber.host} · ${liveChamber.duration} min`),
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12 } },
                React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6, background: t.cta + '20', borderRadius: 20, padding: '5px 12px' } },
                  React.createElement(Icon, { name: 'Users', size: 14, color: t.cta }),
                  React.createElement('span', { style: { fontSize: 12, fontWeight: 600, color: t.cta } }, `${liveChamber.participants} present`)
                ),
                React.createElement('span', { style: { fontSize: 12, color: t.textMuted } }, liveChamber.mood)
              )
            ),
            React.createElement('div', {
              style: {
                width: 48, height: 48, borderRadius: 14,
                background: `${liveChamber.color}30`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: `1px solid ${liveChamber.color}50`
              }
            }, React.createElement(Icon, { name: liveChamber.icon, size: 22, color: liveChamber.color }))
          ),
          React.createElement('div', {
            style: {
              marginTop: 14, padding: '10px 16px', borderRadius: 10,
              background: `linear-gradient(90deg, ${t.cta}, #16A34A)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              cursor: 'pointer'
            }
          },
            React.createElement(Icon, { name: 'Zap', size: 16, color: '#fff' }),
            React.createElement('span', { style: { fontSize: 14, fontWeight: 700, color: '#fff' } }, 'Join the Chamber')
          )
        )
      ),

      // Upcoming
      React.createElement('div', { style: { padding: '0 20px' } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 } },
          React.createElement('h3', { style: { fontSize: 16, fontWeight: 700, color: t.text } }, 'Upcoming Chambers'),
          React.createElement('span', { style: { fontSize: 12, color: t.primary, fontWeight: 600, cursor: 'pointer' }, onClick: () => setActiveScreen('explore') }, 'See all →')
        ),
        upcomingChambers.map(ch =>
          React.createElement('div', {
            key: ch.id, className: 'ritual-card',
            onClick: () => { setActiveChamber(ch); setActiveScreen('chamber'); }
            , style: {
              background: t.card, borderRadius: 14, padding: '14px 16px',
              border: `1px solid ${t.border}`, marginBottom: 10,
              cursor: 'pointer', transition: 'all 0.2s',
              display: 'flex', alignItems: 'center', gap: 14
            }
          },
            React.createElement('div', {
              style: {
                width: 42, height: 42, borderRadius: 12, flexShrink: 0,
                background: `${ch.color}25`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: `1px solid ${ch.color}40`
              }
            }, React.createElement(Icon, { name: ch.icon, size: 20, color: ch.color })),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('p', { style: { fontSize: 14, fontWeight: 700, color: t.text, marginBottom: 2 } }, ch.name),
              React.createElement('p', { style: { fontSize: 12, color: t.textMuted } }, `${ch.time} · ${ch.duration} min · ${ch.participants} joining`)
            ),
            React.createElement(Icon, { name: 'ChevronRight', size: 16, color: t.textSubtle })
          )
        )
      )
    );
  };

  // EXPLORE SCREEN
  const ExploreScreen = () => {
    const [activeFilter, setActiveFilter] = useState('all');
    const filters = ['all', 'writer', 'meditator', 'coder', 'athlete'];

    const filtered = activeFilter === 'all' ? chambers : chambers.filter(c => c.path === activeFilter);

    return React.createElement('div', {
      style: { animation: 'fadeIn 0.3s ease', overflowY: 'auto', height: '100%', paddingBottom: 80 }
    },
      React.createElement('div', { style: { padding: '24px 20px 16px', position: 'sticky', top: 0, zIndex: 10, background: t.bg } },
        React.createElement('h2', { style: { fontSize: 22, fontWeight: 800, color: t.text, marginBottom: 14 } }, 'Explore Chambers'),
        React.createElement('div', {
          style: { display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }
        },
          filters.map(f =>
            React.createElement('button', {
              key: f, onClick: () => setActiveFilter(f),
              style: {
                padding: '7px 16px', borderRadius: 20, border: 'none', cursor: 'pointer',
                fontSize: 12, fontWeight: 600, whiteSpace: 'nowrap', transition: 'all 0.2s',
                background: activeFilter === f ? t.primary : t.surfaceAlt,
                color: activeFilter === f ? '#fff' : t.textMuted,
                fontFamily: 'Inter'
              }
            }, f === 'all' ? 'All Paths' : identityPaths.find(p => p.id === f)?.label || f)
          )
        )
      ),

      React.createElement('div', { style: { padding: '0 20px' } },
        filtered.map((ch, i) =>
          React.createElement('div', {
            key: ch.id, className: 'ritual-card',
            onClick: () => { setActiveChamber(ch); setActiveScreen('chamber'); }
            , style: {
              background: t.card, borderRadius: 18, padding: 18, marginBottom: 14,
              border: `1px solid ${ch.isLive ? ch.color + '50' : t.border}`,
              cursor: 'pointer', transition: 'all 0.25s',
              animation: `slideUp 0.3s ease ${i * 0.07}s both`,
              boxShadow: ch.isLive ? `0 4px 20px ${ch.color}20` : 'none'
            }
          },
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 } },
              React.createElement('div', { style: { flex: 1, paddingRight: 12 } },
                React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 } },
                  ch.isLive && React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 5, background: t.cta + '20', borderRadius: 12, padding: '3px 10px' } },
                    React.createElement('div', { style: { width: 6, height: 6, borderRadius: '50%', background: t.cta, animation: 'livePulse 2s infinite' } }),
                    React.createElement('span', { style: { fontSize: 10, fontWeight: 700, color: t.cta } }, 'LIVE')
                  ),
                  !ch.isLive && React.createElement('span', { style: { fontSize: 11, color: t.textMuted, fontWeight: 500 } }, ch.time)
                ),
                React.createElement('h3', { style: { fontSize: 16, fontWeight: 800, color: t.text, marginBottom: 3 } }, ch.name),
                React.createElement('p', { style: { fontSize: 12, color: t.textMuted } }, `${ch.pathLabel} · ${ch.mood}`)
              ),
              React.createElement('div', {
                style: {
                  width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                  background: `${ch.color}22`, border: `1px solid ${ch.color}40`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }
              }, React.createElement(Icon, { name: ch.icon, size: 20, color: ch.color }))
            ),
            React.createElement('div', { style: { height: 1, background: t.border, marginBottom: 12 } }),
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
              React.createElement('div', { style: { display: 'flex', gap: 14 } },
                React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 5 } },
                  React.createElement(Icon, { name: 'Users', size: 13, color: t.textMuted }),
                  React.createElement('span', { style: { fontSize: 12, color: t.textMuted } }, `${ch.participants}/${ch.maxParticipants}`)
                ),
                React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 5 } },
                  React.createElement(Icon, { name: 'Clock', size: 13, color: t.textMuted }),
                  React.createElement('span', { style: { fontSize: 12, color: t.textMuted } }, `${ch.duration} min`)
                ),
                React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 5 } },
                  React.createElement(Icon, { name: 'User', size: 13, color: t.textMuted }),
                  React.createElement('span', { style: { fontSize: 12, color: t.textMuted } }, ch.host)
                )
              ),
              React.createElement('div', {
                style: {
                  padding: '6px 14px', borderRadius: 10,
                  background: ch.isLive ? `linear-gradient(90deg, ${t.cta}, #16A34A)` : t.primary,
                  fontSize: 12, fontWeight: 700, color: '#fff', cursor: 'pointer'
                }
              }, ch.isLive ? 'Join Now' : 'RSVP')
            ),
            // Participants bar
            React.createElement('div', { style: { marginTop: 12 } },
              React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: 5 } },
                React.createElement('span', { style: { fontSize: 10, color: t.textSubtle } }, 'Capacity'),
                React.createElement('span', { style: { fontSize: 10, color: t.textSubtle } }, `${Math.round(ch.participants / ch.maxParticipants * 100)}% filled`)
              ),
              React.createElement('div', { style: { height: 4, background: t.border, borderRadius: 2, overflow: 'hidden' } },
                React.createElement('div', {
                  style: {
                    width: `${ch.participants / ch.maxParticipants * 100}%`,
                    height: '100%', borderRadius: 2,
                    background: ch.isLive ? t.cta : ch.color
                  }
                })
              )
            )
          )
        )
      ),

      // Identity Paths Section
      React.createElement('div', { style: { padding: '10px 20px 20px' } },
        React.createElement('h3', { style: { fontSize: 16, fontWeight: 700, color: t.text, marginBottom: 14 } }, 'Choose a Ritual Path'),
        React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 } },
          identityPaths.map(path =>
            React.createElement('div', {
              key: path.id, className: 'ritual-card',
              style: {
                background: `linear-gradient(145deg, ${path.color}20, ${t.card})`,
                borderRadius: 16, padding: 16,
                border: `1px solid ${path.color}35`,
                cursor: 'pointer', transition: 'all 0.2s',
                boxShadow: path.id === 'writer' ? `0 0 20px ${path.color}30` : 'none'
              }
            },
              React.createElement('div', {
                style: {
                  width: 38, height: 38, borderRadius: 10,
                  background: `${path.color}25`, border: `1px solid ${path.color}50`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10
                }
              }, React.createElement(Icon, { name: path.icon, size: 18, color: path.color })),
              React.createElement('p', { style: { fontSize: 13, fontWeight: 700, color: t.text, marginBottom: 4 } }, path.label),
              React.createElement('p', { style: { fontSize: 10, color: t.textMuted, lineHeight: 1.4 } }, path.desc),
              path.id === 'writer' && React.createElement('div', {
                style: { marginTop: 8, display: 'flex', alignItems: 'center', gap: 4 }
              },
                React.createElement(Icon, { name: 'CheckCircle2', size: 12, color: t.cta }),
                React.createElement('span', { style: { fontSize: 10, color: t.cta, fontWeight: 600 } }, 'Active Path')
              )
            )
          )
        )
      )
    );
  };

  // CHAMBER SCREEN
  const ChamberScreen = () => {
    const ch = activeChamber || chambers[0];
    const [joined, setJoined] = useState(false);
    const [presenceCount, setPresenceCount] = useState(ch.participants);

    useEffect(() => {
      if (joined && sessionActive) {
        const iv = setInterval(() => {
          setPresenceCount(p => p + Math.floor(Math.random() * 2));
        }, 8000);
        return () => clearInterval(iv);
      }
    }, [joined, sessionActive]);

    if (showIntention) {
      return React.createElement('div', {
        style: {
          height: '100%', display: 'flex', flexDirection: 'column',
          padding: 24, animation: 'slideUp 0.3s ease', background: t.bg
        }
      },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 } },
          React.createElement('div', {
            onClick: () => setShowIntention(false),
            style: { cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, color: t.textMuted }
          },
            React.createElement(Icon, { name: 'ArrowLeft', size: 18, color: t.textMuted }),
            React.createElement('span', { style: { fontSize: 14 } }, 'Back')
          )
        ),
        React.createElement('div', {
          style: {
            flex: 1, display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center'
          }
        },
          React.createElement('div', {
            style: {
              width: 64, height: 64, borderRadius: 20, marginBottom: 20,
              background: `${ch.color}25`, border: `2px solid ${ch.color}50`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              animation: 'orbFloat 3s ease-in-out infinite'
            }
          }, React.createElement(Icon, { name: 'Sparkles', size: 28, color: ch.color })),
          React.createElement('h2', { style: { fontSize: 22, fontWeight: 800, color: t.text, textAlign: 'center', marginBottom: 8 } }, 'Set Your Intention'),
          React.createElement('p', { style: { fontSize: 14, color: t.textMuted, textAlign: 'center', lineHeight: 1.6, marginBottom: 28, maxWidth: 280 } },
            'Before entering the chamber, clarify your purpose. What do you want to accomplish in this session?'
          ),
          React.createElement('div', {
            style: {
              width: '100%', background: t.surface, borderRadius: 16,
              border: `1px solid ${t.border}`, padding: 4, marginBottom: 20
            }
          },
            React.createElement('textarea', {
              value: intentionText,
              onChange: e => setIntentionText(e.target.value),
              placeholder: 'e.g. Write the opening scene of chapter 3, focusing on atmosphere and tension…',
              style: {
                width: '100%', minHeight: 120, background: 'transparent',
                border: 'none', borderRadius: 12, padding: '14px 16px',
                color: t.text, fontSize: 14, lineHeight: 1.6, resize: 'none',
              }
            })
          ),
          React.createElement('div', {
            onClick: () => {
              setShowIntention(false);
              setJoined(true);
              setSessionActive(true);
              setSessionSeconds(0);
            },
            style: {
              width: '100%', padding: '16px', borderRadius: 14,
              background: `linear-gradient(90deg, ${t.primary}, ${t.primaryLight})`,
              color: '#fff', fontWeight: 700, fontSize: 16,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              cursor: 'pointer', boxShadow: `0 8px 24px ${t.primary}50`
            }
          },
            React.createElement(Icon, { name: 'Zap', size: 18, color: '#fff' }),
            React.createElement('span', null, 'Enter the Chamber')
          )
        )
      );
    }

    if (showReflection) {
      return React.createElement('div', {
        style: {
          height: '100%', display: 'flex', flexDirection: 'column',
          padding: 24, animation: 'slideUp 0.3s ease'
        }
      },
        React.createElement('h2', { style: { fontSize: 22, fontWeight: 800, color: t.text, textAlign: 'center', marginBottom: 6 } }, 'Session Complete'),
        React.createElement('p', { style: { fontSize: 13, color: t.textMuted, textAlign: 'center', marginBottom: 24 } }, `You focused for ${fmt(sessionSeconds)}`),
        React.createElement('div', {
          style: {
            background: `linear-gradient(135deg, ${t.primary}20, ${t.surfaceAlt})`,
            borderRadius: 20, padding: 20, marginBottom: 20,
            border: `1px solid ${t.border}`, textAlign: 'center'
          }
        },
          React.createElement('p', { style: { fontSize: 12, color: t.secondary, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 } }, 'Your Intention Was'),
          React.createElement('p', { style: { fontSize: 14, color: t.text, lineHeight: 1.6, fontStyle: 'italic' } }, intentionText || 'No intention set')
        ),
        React.createElement('p', { style: { fontSize: 14, color: t.text, fontWeight: 600, marginBottom: 10 } }, 'Reflect on your session:'),
        React.createElement('textarea', {
          value: reflectionText,
          onChange: e => setReflectionText(e.target.value),
          placeholder: 'What did you accomplish? What surprised you? What will you carry forward?',
          style: {
            width: '100%', minHeight: 110, background: t.surface,
            border: `1px solid ${t.border}`, borderRadius: 14, padding: '14px 16px',
            color: t.text, fontSize: 14, lineHeight: 1.6, resize: 'none', marginBottom: 20
          }
        }),
        React.createElement('div', {
          onClick: () => {
            setShowReflection(false);
            setJoined(false);
            setSessionActive(false);
            setActiveScreen('home');
          },
          style: {
            width: '100%', padding: 16, borderRadius: 14,
            background: `linear-gradient(90deg, ${t.cta}, #16A34A)`,
            color: '#fff', fontWeight: 700, fontSize: 16,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            cursor: 'pointer'
          }
        },
          React.createElement(Icon, { name: 'CheckCircle2', size: 18, color: '#fff' }),
          React.createElement('span', null, 'Complete Ritual (+80 XP)')
        )
      );
    }

    return React.createElement('div', {
      style: { height: '100%', display: 'flex', flexDirection: 'column', animation: 'fadeIn 0.3s ease' }
    },
      // Chamber Header
      React.createElement('div', {
        style: {
          padding: '20px 20px 16px',
          background: `linear-gradient(180deg, ${ch.color}30 0%, transparent 100%)`
        }
      },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 } },
          React.createElement('div', {
            onClick: () => setActiveScreen('explore'),
            style: { cursor: 'pointer', color: t.textMuted }
          }, React.createElement(Icon, { name: 'ArrowLeft', size: 20, color: t.textMuted })),
          React.createElement('h2', { style: { fontSize: 18, fontWeight: 800, color: t.text, flex: 1 } }, ch.name),
          ch.isLive && React.createElement('div', {
            style: { display: 'flex', alignItems: 'center', gap: 5, background: t.cta + '25', borderRadius: 12, padding: '4px 10px' }
          },
            React.createElement('div', { style: { width: 6, height: 6, borderRadius: '50%', background: t.cta, animation: 'livePulse 2s infinite' } }),
            React.createElement('span', { style: { fontSize: 11, fontWeight: 700, color: t.cta } }, 'LIVE')
          )
        ),
        React.createElement('div', { style: { display: 'flex', gap: 10 } },
          [
            { icon: 'Clock', val: `${ch.duration} min` },
            { icon: 'Users', val: `${presenceCount} present` },
            { icon: 'Wind', val: ch.mood }
          ].map(s =>
            React.createElement('div', {
              key: s.val,
              style: {
                display: 'flex', alignItems: 'center', gap: 5,
                background: t.surfaceAlt, borderRadius: 8, padding: '5px 10px'
              }
            },
              React.createElement(Icon, { name: s.icon, size: 12, color: t.secondary }),
              React.createElement('span', { style: { fontSize: 11, color: t.textMuted, fontWeight: 500 } }, s.val)
            )
          )
        )
      ),

      // Main chamber area
      React.createElement('div', { style: { flex: 1, padding: '0 20px', overflowY: 'auto' } },
        // Chamber orb visualization
        React.createElement('div', {
          style: {
            height: 200, borderRadius: 20, marginBottom: 20,
            background: `radial-gradient(ellipse at center, ${ch.color}35 0%, ${ch.color}10 50%, transparent 80%)`,
            border: `1px solid ${ch.color}30`,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            position: 'relative', overflow: 'hidden'
          }
        },
          React.createElement('div', {
            style: {
              width: 90, height: 90, borderRadius: '50%',
              background: `radial-gradient(circle, ${ch.color}80, ${ch.color}30)`,
              border: `2px solid ${ch.color}60`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              animation: joined && sessionActive ? 'pulse 2s ease-in-out infinite' : 'orbFloat 4s ease-in-out infinite',
              boxShadow: `0 0 40px ${ch.color}50`
            }
          },
            React.createElement(Icon, { name: ch.icon, size: 36, color: '#fff' })
          ),
          joined && sessionActive && React.createElement('div', {
            style: {
              position: 'absolute', bottom: 16,
              fontSize: 28, fontWeight: 900, color: '#fff', fontFamily: 'Inter',
              textShadow: `0 0 20px ${ch.color}`,
              animation: 'countUp 0.3s ease'
            }
          }, fmt(sessionSeconds)),
          !joined && React.createElement('p', {
            style: { position: 'absolute', bottom: 16, fontSize: 12, color: t.textMuted }
          }, 'Enter the chamber to begin')
        ),

        // Presence Field
        React.createElement('div', {
          style: {
            background: t.card, borderRadius: 16, padding: 16, marginBottom: 16,
            border: `1px solid ${t.border}`
          }
        },
          React.createElement('p', { style: { fontSize: 12, color: t.secondary, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 12 } }, 'Presence Field'),
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 } },
            React.createElement('div', {
              style: {
                fontSize: 32, fontWeight: 900, color: t.text, fontFamily: 'Inter',
                animation: 'countUp 0.5s ease'
              }
            }, presenceCount),
            React.createElement('div', null,
              React.createElement('p', { style: { fontSize: 13, fontWeight: 600, color: t.text } }, 'Souls in the chamber'),
              React.createElement('p', { style: { fontSize: 11, color: t.textMuted } }, `of ${ch.maxParticipants} maximum`)
            )
          ),
          React.createElement('div', { style: { display: 'flex', gap: 4, flexWrap: 'wrap' } },
            Array.from({ length: Math.min(presenceCount, 20) }).map((_, i) =>
              React.createElement('div', {
                key: i,
                style: {
                  width: 8, height: 8, borderRadius: '50%',
                  background: ch.color,
                  opacity: 0.4 + (i / 20) * 0.6,
                  animation: `pulse ${1.5 + i * 0.1}s ease-in-out infinite`
                }
              })
            ),
            presenceCount > 20 && React.createElement('span', { style: { fontSize: 10, color: t.textMuted, alignSelf: 'center' } }, `+${presenceCount - 20} more`)
          )
        ),

        // Intention reminder
        joined && intentionText && React.createElement('div', {
          style: {
            background: `${t.primary}15`, borderRadius: 14, padding: '12px 14px', marginBottom: 16,
            border: `1px solid ${t.primary}25`
          }
        },
          React.createElement('p', { style: { fontSize: 10, color: t.secondary, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 6 } }, 'Your Intention'),
          React.createElement('p', { style: { fontSize: 13, color: t.text, lineHeight: 1.6, fontStyle: 'italic' } }, `"${intentionText}"`)
        )
      ),

      // Action Button
      React.createElement('div', { style: { padding: '14px 20px 20px' } },
        !joined
          ? React.createElement('div', {
            onClick: () => setShowIntention(true),
            className: 'chamber-btn',
            style: {
              padding: 16, borderRadius: 14, cursor: 'pointer',
              background: `linear-gradient(90deg, ${ch.color}, ${ch.color}CC)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
              boxShadow: `0 8px 28px ${ch.color}50`, transition: 'all 0.2s'
            }
          },
            React.createElement(Icon, { name: 'Zap', size: 20, color: '#fff' }),
            React.createElement('span', { style: { fontSize: 16, fontWeight: 700, color: '#fff' } }, 'Set Intention & Enter')
          )
          : React.createElement('div', {
            onClick: () => {
              setSessionActive(false);
              setShowReflection(true);
            },
            className: 'chamber-btn',
            style: {
              padding: 16, borderRadius: 14, cursor: 'pointer',
              background: `linear-gradient(90deg, ${t.cta}, #16A34A)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
              transition: 'all 0.2s'
            }
          },
            React.createElement(Icon, { name: 'CheckCircle2', size: 20, color: '#fff' }),
            React.createElement('span', { style: { fontSize: 16, fontWeight: 700, color: '#fff' } }, 'Complete Session')
          )
      )
    );
  };

  // PROFILE SCREEN
  const ProfileScreen = () => {
    const [activeTab, setActiveTab] = useState('identity');

    return React.createElement('div', {
      style: { animation: 'fadeIn 0.3s ease', overflowY: 'auto', height: '100%', paddingBottom: 80 }
    },
      // Header banner
      React.createElement('div', {
        style: {
          padding: '24px 20px 28px',
          background: `linear-gradient(165deg, ${t.primary}50, ${t.surface})`,
          position: 'relative', overflow: 'hidden'
        }
      },
        React.createElement('div', {
          style: {
            position: 'absolute', width: 200, height: 200, borderRadius: '50%',
            background: t.primary + '15', top: -80, right: -60,
            animation: 'orbFloat 5s ease-in-out infinite'
          }
        }),
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' } },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 14 } },
            React.createElement('div', {
              style: {
                width: 60, height: 60, borderRadius: 18,
                background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: `0 8px 20px ${t.primary}50`
              }
            }, React.createElement(Icon, { name: 'PenLine', size: 28, color: '#fff' })),
            React.createElement('div', null,
              React.createElement('h2', { style: { fontSize: 20, fontWeight: 900, color: t.text } }, 'Maya Reeve'),
              React.createElement('p', { style: { fontSize: 13, color: t.textMuted } }, '@the_writer_maya'),
              React.createElement('div', {
                style: { display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }
              },
                React.createElement(Icon, { name: 'PenLine', size: 13, color: t.secondary }),
                React.createElement('span', { style: { fontSize: 12, color: t.secondary, fontWeight: 600 } }, 'The Writer · Level 4')
              )
            )
          ),
          React.createElement('div', {
            onClick: () => setIsDark(!isDark),
            style: {
              width: 36, height: 36, borderRadius: '50%',
              background: t.surfaceAlt, border: `1px solid ${t.border}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
            }
          }, React.createElement(Icon, { name: isDark ? 'Sun' : 'Moon', size: 16, color: t.secondary }))
        ),
        // Stats row
        React.createElement('div', {
          style: {
            display: 'flex', gap: 0, marginTop: 20,
            background: t.surface, borderRadius: 14, overflow: 'hidden',
            border: `1px solid ${t.border}`
          }
        },
          [{ val: '21', label: 'Day Streak' }, { val: '94', label: 'Sessions' }, { val: '4', label: 'Badges' }].map((s, i) =>
            React.createElement('div', {
              key: s.label,
              style: {
                flex: 1, padding: '12px 8px', textAlign: 'center',
                borderRight: i < 2 ? `1px solid ${t.border}` : 'none'
              }
            },
              React.createElement('p', { style: { fontSize: 20, fontWeight: 900, color: t.text, fontFamily: 'Inter' } }, s.val),
              React.createElement('p', { style: { fontSize: 10, color: t.textMuted, fontWeight: 500 } }, s.label)
            )
          )
        )
      ),

      // Tabs
      React.createElement('div', {
        style: {
          display: 'flex', background: t.surface,
          borderBottom: `1px solid ${t.border}`, position: 'sticky', top: 0, zIndex: 5
        }
      },
        ['identity', 'badges', 'paths'].map(tab =>
          React.createElement('button', {
            key: tab, onClick: () => setActiveTab(tab),
            style: {
              flex: 1, padding: '13px 8px', border: 'none', cursor: 'pointer',
              background: 'transparent', fontFamily: 'Inter', fontWeight: 600,
              fontSize: 13, color: activeTab === tab ? t.primary : t.textMuted,
              borderBottom: `2px solid ${activeTab === tab ? t.primary : 'transparent'}`,
              transition: 'all 0.2s', textTransform: 'capitalize'
            }
          }, tab)
        )
      ),

      // Tab Content
      React.createElement('div', { style: { padding: '20px 20px' } },
        activeTab === 'identity' && React.createElement('div', { style: { animation: 'fadeIn 0.25s ease' } },
          React.createElement('h3', { style: { fontSize: 16, fontWeight: 700, color: t.text, marginBottom: 14 } }, 'Identity Path — The Writer'),
          React.createElement('div', {
            style: {
              background: `linear-gradient(135deg, ${t.primary}20, ${t.card})`,
              borderRadius: 18, padding: 18, marginBottom: 16,
              border: `1px solid ${t.primary}30`
            }
          },
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: 10 } },
              React.createElement('span', { style: { fontSize: 14, fontWeight: 700, color: t.text } }, 'Level 4'),
              React.createElement('span', { style: { fontSize: 13, color: t.secondary } }, '820 / 1000 XP')
            ),
            React.createElement('div', { style: { height: 8, background: t.border, borderRadius: 4, overflow: 'hidden', marginBottom: 14 } },
              React.createElement('div', {
                style: {
                  width: '82%', height: '100%', borderRadius: 4,
                  background: `linear-gradient(90deg, ${t.primary}, ${t.secondary})`,
                  backgroundSize: '200% 100%', animation: 'shimmer 2.5s linear infinite'
                }
              })
            ),
            ['Poetic Prose', 'Scene Crafting', 'Dialogue Mastery'].map((skill, i) =>
              React.createElement('div', { key: skill, style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 } },
                React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8 } },
                  React.createElement(Icon, { name: 'ChevronRight', size: 12, color: t.secondary }),
                  React.createElement('span', { style: { fontSize: 13, color: t.text } }, skill)
                ),
                React.createElement('div', { style: { display: 'flex', gap: 4 } },
                  Array.from({ length: 5 }).map((_, j) =>
                    React.createElement('div', {
                      key: j,
                      style: {
                        width: 8, height: 8, borderRadius: 2,
                        background: j <= i + 1 ? t.primary : t.border
                      }
                    })
                  )
                )
              )
            )
          ),

          // Next milestone
          React.createElement('div', {
            style: {
              background: t.card, borderRadius: 14, padding: 16,
              border: `1px solid ${t.border}`, display: 'flex', gap: 12, alignItems: 'center'
            }
          },
            React.createElement('div', {
              style: {
                width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                background: `${t.secondary}20`,
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }
            }, React.createElement(Icon, { name: 'Target', size: 20, color: t.secondary })),
            React.createElement('div', null,
              React.createElement('p', { style: { fontSize: 13, fontWeight: 700, color: t.text, marginBottom: 3 } }, 'Next Milestone: Wordsmith'),
              React.createElement('p', { style: { fontSize: 12, color: t.textMuted } }, '180 XP away · Complete 5 more live sessions')
            )
          )
        ),

        activeTab === 'badges' && React.createElement('div', { style: { animation: 'fadeIn 0.25s ease' } },
          React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 } },
            badges.map((b, i) =>
              React.createElement('div', {
                key: b.id,
                style: {
                  background: b.earned ? `linear-gradient(145deg, ${b.color}20, ${t.card})` : t.card,
                  borderRadius: 16, padding: '16px 14px', textAlign: 'center',
                  border: `1px solid ${b.earned ? b.color + '40' : t.border}`,
                  opacity: b.earned ? 1 : 0.5,
                  animation: `slideUp 0.3s ease ${i * 0.06}s both`
                }
              },
                React.createElement('div', {
                  style: {
                    width: 52, height: 52, borderRadius: 16, margin: '0 auto 10px',
                    background: b.earned ? `${b.color}25` : t.surfaceAlt,
                    border: `2px solid ${b.earned ? b.color + '60' : t.border}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: b.earned ? `0 4px 16px ${b.color}30` : 'none'
                  }
                }, React.createElement(Icon, { name: b.icon, size: 22, color: b.earned ? b.color : t.textSubtle })),
                React.createElement('p', { style: { fontSize: 12, fontWeight: 700, color: t.text, marginBottom: 4 } }, b.name),
                React.createElement('p', { style: { fontSize: 10, color: t.textMuted, lineHeight: 1.4 } }, b.desc),
                b.earned && React.createElement('div', {
                  style: { marginTop: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }
                },
                  React.createElement(Icon, { name: 'CheckCircle2', size: 11, color: t.cta }),
                  React.createElement('span', { style: { fontSize: 10, color: t.cta, fontWeight: 600 } }, 'Earned')
                )
              )
            )
          )
        ),

        activeTab === 'paths' && React.createElement('div', { style: { animation: 'fadeIn 0.25s ease' } },
          identityPaths.map((path, i) =>
            React.createElement('div', {
              key: path.id,
              style: {
                background: t.card, borderRadius: 16, padding: 16, marginBottom: 14,
                border: `1px solid ${path.id === 'writer' ? path.color + '50' : t.border}`,
                animation: `slideUp 0.3s ease ${i * 0.07}s both`,
                boxShadow: path.id === 'writer' ? `0 4px 16px ${path.color}20` : 'none'
              }
            },
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 } },
                React.createElement('div', {
                  style: {
                    width: 44, height: 44, borderRadius: 12,
                    background: `${path.color}25`, border: `1px solid ${path.color}50`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                  }
                }, React.createElement(Icon, { name: path.icon, size: 20, color: path.color })),
                React.createElement('div', { style: { flex: 1 } },
                  React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
                    React.createElement('p', { style: { fontSize: 14, fontWeight: 700, color: t.text } }, path.label),
                    React.createElement('span', { style: { fontSize: 12, color: path.color, fontWeight: 600 } }, `Lvl ${path.level}`)
                  ),
                  React.createElement('p', { style: { fontSize: 11, color: t.textMuted, marginTop: 2 } }, `Streak: ${path.streak} days · ${path.xp}/${path.maxXp} XP`)
                )
              ),
              React.createElement('div', { style: { height: 5, background: t.border, borderRadius: 3, overflow: 'hidden' } },
                React.createElement('div', {
                  style: {
                    width: `${path.xp / path.maxXp * 100}%`, height: '100%',
                    background: `linear-gradient(90deg, ${path.color}, ${path.color}90)`, borderRadius: 3
                  }
                })
              )
            )
          )
        )
      )
    );
  };

  // ── Navigation ────────────────────────────────────────────────
  const navItems = [
    { id: 'home', icon: 'Home', label: 'Home' },
    { id: 'explore', icon: 'Compass', label: 'Explore' },
    { id: 'chamber', icon: 'Zap', label: 'Chamber' },
    { id: 'profile', icon: 'User', label: 'Profile' },
  ];

  const screens = {
    home: HomeScreen,
    explore: ExploreScreen,
    chamber: ChamberScreen,
    profile: ProfileScreen,
  };

  const ActiveScreen = screens[activeScreen] || HomeScreen;

  return React.createElement('div', {
    style: {
      minHeight: '100vh', background: '#f0f0f0',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'Inter, sans-serif', padding: '20px 0'
    }
  },
    styleTag,
    React.createElement('div', {
      style: {
        width: 375, height: 812,
        background: t.bg, borderRadius: 44,
        boxShadow: '0 40px 80px rgba(0,0,0,0.35), 0 0 0 1px rgba(0,0,0,0.1)',
        overflow: 'hidden', position: 'relative',
        display: 'flex', flexDirection: 'column'
      }
    },
      // Screen content
      React.createElement('div', { style: { flex: 1, overflow: 'hidden' } },
        React.createElement(ActiveScreen)
      ),

      // Bottom Navigation
      React.createElement('div', {
        style: {
          height: 70, background: t.surface,
          borderTop: `1px solid ${t.border}`,
          display: 'flex', alignItems: 'center',
          backdropFilter: 'blur(20px)',
          flexShrink: 0
        }
      },
        navItems.map(item =>
          React.createElement('button', {
            key: item.id,
            onClick: () => {
              if (item.id === 'chamber' && !activeChamber) {
                setActiveChamber(chambers[0]);
              }
              setActiveScreen(item.id);
            },
            style: {
              flex: 1, height: '100%', border: 'none',
              background: 'transparent', cursor: 'pointer',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', gap: 5,
              fontFamily: 'Inter', transition: 'all 0.2s',
              position: 'relative'
            }
          },
            item.id === 'chamber'
              ? React.createElement('div', {
                style: {
                  width: 44, height: 44, borderRadius: 14,
                  background: activeScreen === item.id
                    ? `linear-gradient(135deg, ${t.primary}, ${t.primaryLight})`
                    : t.surfaceAlt,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: activeScreen === item.id ? `0 4px 14px ${t.primary}60` : 'none',
                  transition: 'all 0.2s', marginBottom: -4
                }
              }, React.createElement(Icon, { name: item.icon, size: 20, color: activeScreen === item.id ? '#fff' : t.textMuted }))
              : React.createElement(Icon, {
                name: item.icon, size: 22,
                color: activeScreen === item.id ? t.primary : t.textMuted
              }),
            React.createElement('span', {
              style: {
                fontSize: 10, fontWeight: 600,
                color: activeScreen === item.id ? t.primary : t.textMuted,
                transition: 'color 0.2s'
              }
            }, item.label),
            activeScreen === item.id && item.id !== 'chamber' && React.createElement('div', {
              style: {
                position: 'absolute', top: 8, width: 4, height: 4, borderRadius: '50%',
                background: t.primary
              }
            })
          )
        )
      )
    )
  );
}
