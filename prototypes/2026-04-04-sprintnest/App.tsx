const { useState, useEffect, useRef } = React;

function App() {
  const themes = {
    dark: {
      bg: '#0A1628', surface: '#132240', card: '#1A2D48', cardAlt: '#1F3456',
      accent: '#FF6B35', accentSoft: 'rgba(255,107,53,0.12)', accentBorder: 'rgba(255,107,53,0.32)',
      text: '#FFFFFF', textSub: '#6E88A8', textMuted: '#3D5470',
      border: 'rgba(255,255,255,0.07)', borderMed: 'rgba(255,255,255,0.13)',
      navBg: '#0D1B35', success: '#00C896', successSoft: 'rgba(0,200,150,0.12)',
      warning: '#FFB030', danger: '#FF3D57', slate: '#243657', islandBg: '#060D1A',
    },
    light: {
      bg: '#EDF1F8', surface: '#FFFFFF', card: '#FFFFFF', cardAlt: '#F4F7FF',
      accent: '#FF6B35', accentSoft: 'rgba(255,107,53,0.08)', accentBorder: 'rgba(255,107,53,0.25)',
      text: '#0A1628', textSub: '#4A6280', textMuted: '#8A9DB5',
      border: 'rgba(0,0,0,0.07)', borderMed: 'rgba(0,0,0,0.13)',
      navBg: '#FFFFFF', success: '#00A87A', successSoft: 'rgba(0,168,122,0.09)',
      warning: '#D4960A', danger: '#E02040', slate: '#C8D4E4', islandBg: '#0D1B35',
    },
  };

  const [isDark, setIsDark] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const [timer, setTimer] = useState(347);
  const [pulse, setPulse] = useState(false);
  const [activeSprint, setActiveSprint] = useState(0);
  const [notifs, setNotifs] = useState(true);
  const [remix, setRemix] = useState(true);
  const [sound, setSound] = useState(false);
  const T = isDark ? themes.dark : themes.light;

  useEffect(() => {
    const t = setInterval(() => setTimer(p => (p > 0 ? p - 1 : 600)), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const p = setInterval(() => {
      setPulse(true);
      setTimeout(() => setPulse(false), 900);
    }, 4800);
    return () => clearInterval(p);
  }, []);

  const fmt = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

  const sprints = [
    { id: 0, title: 'INBOX ZERO BLITZ', desc: 'Archive 10 emails as a team', twist: '⚡ Reply-only mode activated', team: 'Alpha Squad', color: '#FF6B35', diff: 'EASY', dur: '5 MIN', joined: 847, progress: 68 },
    { id: 1, title: 'IDEA PITCH RUSH', desc: 'Generate 3 product concepts', twist: '🎲 Must include the word "space"', team: 'Beta Crew', color: '#00C896', diff: 'MED', dur: '7 MIN', joined: 523, progress: 31 },
    { id: 2, title: 'DEEP RESEARCH DIVE', desc: 'Find 5 key competitor insights', twist: '🔥 Sources must be < 48hrs old', team: 'Gamma Force', color: '#FFB030', diff: 'HARD', dur: '10 MIN', joined: 312, progress: 84 },
  ];

  const myTeams = [
    { name: 'Alpha Squad', size: 4, streak: 12, emoji: '⚡', rank: 1, active: true, wins: 18, activity: ['Inbox Zero: 4min 12sec', 'Twist bonus: Idea Pitch', 'Remix triggered for 3 squads'] },
    { name: 'Beta Crew', size: 3, streak: 7, emoji: '🔥', rank: 3, active: false, wins: 11, activity: ['Research Quest completed', 'Streak extended to 7 days', 'New member invited'] },
    { name: 'Gamma Force', size: 5, streak: 9, emoji: '🎯', rank: 2, active: true, wins: 15, activity: ['Focus Marathon: zero breaks', 'Won speed writing twist', 'Led remix for Nexus Team'] },
  ];

  const feed = [
    { team: 'Storm Crew', challenge: 'Inbox Zero', result: 'Cleared 47 emails — CRUSHED IT', time: '2m', likes: 38, emoji: '🌪️', remix: true },
    { team: 'Alpha Squad', challenge: 'Idea Pitch', result: '6 startup ideas, 4min 12sec flat', time: '7m', likes: 52, emoji: '⚡', remix: false },
    { team: 'Nexus Team', challenge: 'Research Quest', result: 'Found viral TikTok competitor data', time: '14m', likes: 24, emoji: '🔮', remix: true },
    { team: 'Pixel Force', challenge: 'Focus Sprint', result: 'Zero app switches for 8 minutes!', time: '21m', likes: 41, emoji: '🎮', remix: false },
    { team: 'Void Squad', challenge: 'Speed Write', result: '500 words in 2m 55sec', time: '29m', likes: 31, emoji: '✦', remix: true },
  ];

  const badges = [
    { name: 'SPRINT MASTER', emoji: '⚡', earned: true, desc: '10 sprints completed' },
    { name: 'TEAM CAPTAIN', emoji: '🏆', earned: true, desc: 'Led 5 team wins' },
    { name: 'TWIST HUNTER', emoji: '🌀', earned: true, desc: 'Conquered all twist types' },
    { name: 'REMIX KING', emoji: '🎲', earned: false, desc: 'Influence 10 remixes' },
    { name: 'STREAK LEGEND', emoji: '🔥', earned: false, desc: '30-day sprint streak' },
    { name: 'DISCOVERY ACE', emoji: '🔭', earned: false, desc: 'Browse 100 feed items' },
  ];

  const tag = (color) => ({
    display: 'inline-flex', alignItems: 'center', padding: '2px 7px',
    background: color ? `${color}18` : T.accentSoft,
    border: `1px solid ${color ? `${color}40` : T.accentBorder}`,
    borderRadius: '2px', fontSize: '9px',
    fontFamily: "'Archivo Black', sans-serif", letterSpacing: '1px',
    color: color || T.accent,
  });

  const card = (borderColor) => ({
    background: T.card, border: `2px solid ${borderColor || T.border}`, borderRadius: '3px',
  });

  const hd = (size, spacing) => ({
    fontFamily: "'Archivo Black', sans-serif", fontSize: size || 14,
    letterSpacing: spacing !== undefined ? spacing : '-0.3px', color: T.text,
  });

  const btn = (color, ghost) => ({
    padding: '10px 14px', background: ghost ? 'transparent' : `${color || T.accent}18`,
    border: `2px solid ${color || T.accent}`, borderRadius: '3px',
    color: color || T.accent, fontFamily: "'Archivo Black', sans-serif",
    fontSize: '11px', letterSpacing: '1.5px', cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', transition: 'all 0.15s',
  });

  // === FLOATING ISLAND ===
  const FloatingIsland = () => {
    const s = sprints[activeSprint];
    return React.createElement('div', {
      style: {
        position: 'absolute', top: '52px', left: '14px', right: '14px',
        background: T.islandBg, border: `2px solid ${s.color}`,
        borderRadius: '6px', padding: '11px 14px', zIndex: 60,
        display: 'flex', alignItems: 'center', gap: '12px',
        boxShadow: pulse
          ? `0 0 0 4px ${s.color}28, 0 10px 36px rgba(0,0,0,0.55)`
          : `0 4px 28px rgba(0,0,0,0.45)`,
        transition: 'box-shadow 0.5s ease',
      }
    },
      React.createElement('div', {
        style: {
          width: '40px', height: '40px', flexShrink: 0,
          background: `${s.color}20`, border: `2px solid ${s.color}55`,
          borderRadius: '3px', display: 'flex', alignItems: 'center', justifyContent: 'center',
        }
      }, React.createElement(window.lucide.Zap, { size: 18, color: s.color })),
      React.createElement('div', { style: { flex: 1, minWidth: 0 } },
        React.createElement('div', {
          style: { fontSize: '9px', color: s.color, fontFamily: "'Archivo Black', sans-serif", letterSpacing: '1.5px', marginBottom: '3px' }
        }, '● SPRINT IN PROGRESS'),
        React.createElement('div', {
          style: { fontFamily: "'Archivo Black', sans-serif", fontSize: '12px', color: '#FFFFFF', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', letterSpacing: '0.3px' }
        }, s.title),
        React.createElement('div', {
          style: { fontSize: '10px', color: '#5A7898', marginTop: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }
        }, s.twist),
      ),
      React.createElement('div', { style: { textAlign: 'center', flexShrink: 0 } },
        React.createElement('div', {
          style: { fontFamily: "'Archivo Black', sans-serif", fontSize: '20px', color: timer < 60 ? '#FF3D57' : s.color, lineHeight: 1, fontVariantNumeric: 'tabular-nums' }
        }, fmt(timer)),
        React.createElement('div', { style: { fontSize: '8px', color: '#5A7898', letterSpacing: '1.5px', marginTop: '3px' } }, 'LEFT'),
      ),
    );
  };

  // === HOME SCREEN ===
  const HomeScreen = () => {
    const [pressedIdx, setPressedIdx] = useState(-1);
    return React.createElement('div', {
      style: { height: '100%', overflowY: 'auto', background: T.bg, fontFamily: "'Archivo', sans-serif" }
    },
      React.createElement(FloatingIsland),
      React.createElement('div', { style: { padding: '120px 14px 24px' } },

        // Sprint selector track
        React.createElement('div', { style: { display: 'flex', gap: '6px', marginBottom: '16px' } },
          sprints.map((s, i) =>
            React.createElement('div', {
              key: i, onClick: () => setActiveSprint(i),
              style: { flex: 1, height: '3px', background: i === activeSprint ? s.color : T.border, cursor: 'pointer', transition: 'background 0.2s', borderRadius: '2px' }
            })
          ),
        ),

        // Section header
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' } },
          React.createElement('div', { style: hd(15, '1.5px') }, 'ACTIVE SPRINTS'),
          React.createElement('div', { style: tag() }, '3 LIVE'),
        ),

        // Sprint cards
        ...sprints.map((s, i) =>
          React.createElement('div', {
            key: i,
            style: {
              ...card(i === activeSprint ? s.color : T.border),
              marginBottom: '10px', padding: '14px 14px 14px 0',
              cursor: 'pointer', display: 'flex', overflow: 'hidden', transition: 'border-color 0.2s',
            },
            onClick: () => setActiveSprint(i),
          },
            React.createElement('div', { style: { width: '4px', background: s.color, flexShrink: 0, marginRight: '14px' } }),
            React.createElement('div', { style: { flex: 1, minWidth: 0 } },
              React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px', gap: '8px' } },
                React.createElement('div', { style: hd(13, '0.3px') }, s.title),
                React.createElement('div', { style: tag(s.color) }, s.team),
              ),
              React.createElement('div', { style: { fontSize: '12px', color: T.textSub, marginBottom: '8px' } }, s.desc),
              React.createElement('div', { style: { height: '3px', background: T.border, marginBottom: '8px', overflow: 'hidden' } },
                React.createElement('div', { style: { height: '100%', width: `${s.progress}%`, background: s.color } }),
              ),
              React.createElement('div', { style: { display: 'flex', gap: '6px', flexWrap: 'wrap', alignItems: 'center' } },
                React.createElement('div', { style: tag(s.color) }, s.diff),
                React.createElement('div', { style: tag() }, s.dur),
                React.createElement('div', { style: { ...tag(), color: T.textSub, borderColor: T.border } }, `${s.joined.toLocaleString()} in`),
              ),
            ),
          )
        ),

        // Action buttons
        React.createElement('div', { style: { display: 'flex', gap: '10px', marginTop: '6px', marginBottom: '22px' } },
          React.createElement('button', {
            style: { ...btn(), flex: 1, transform: pressedIdx === 0 ? 'scale(0.97)' : 'scale(1)' },
            onMouseDown: () => setPressedIdx(0), onMouseUp: () => setPressedIdx(-1),
            onTouchStart: () => setPressedIdx(0), onTouchEnd: () => setPressedIdx(-1),
          }, React.createElement(window.lucide.Shuffle, { size: 15 }), 'RANDOM JOIN'),
          React.createElement('button', {
            style: { ...btn(T.success), flex: 1, transform: pressedIdx === 1 ? 'scale(0.97)' : 'scale(1)' },
            onMouseDown: () => setPressedIdx(1), onMouseUp: () => setPressedIdx(-1),
            onTouchStart: () => setPressedIdx(1), onTouchEnd: () => setPressedIdx(-1),
          }, React.createElement(window.lucide.Plus, { size: 15 }), 'CREATE'),
        ),

        // Remix Engine section
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' } },
          React.createElement('div', { style: hd(14, '1.5px') }, 'REMIX ENGINE'),
          React.createElement('div', { style: { ...tag(T.success), animation: 'sprintPulse 2s infinite' } }, '● LIVE'),
        ),
        React.createElement('div', {
          style: { ...card(`${T.success}45`), padding: '14px', background: T.successSoft }
        },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' } },
            React.createElement('div', {
              style: { width: '36px', height: '36px', flexShrink: 0, background: `${T.success}20`, border: `2px solid ${T.success}55`, borderRadius: '3px', display: 'flex', alignItems: 'center', justifyContent: 'center' }
            }, React.createElement(window.lucide.GitBranch, { size: 16, color: T.success })),
            React.createElement('div', {},
              React.createElement('div', { style: { ...hd(12, '0.5px'), color: T.success } }, 'REMIX PROPAGATION'),
              React.createElement('div', { style: { fontSize: '11px', color: T.textSub, marginTop: '2px' } }, "Alpha Squad influenced 3 teams' next sprints"),
            ),
          ),
          React.createElement('div', { style: { display: 'flex', gap: '8px' } },
            ['Beta Crew', 'Storm Team', 'Nexus'].map((team, i) =>
              React.createElement('div', {
                key: i,
                style: { flex: 1, background: T.card, border: `1px solid ${T.border}`, borderRadius: '2px', padding: '8px 4px', textAlign: 'center', fontSize: '10px', color: T.textSub }
              },
                React.createElement('div', { style: { color: T.success, fontSize: '14px', marginBottom: '2px' } }, '→'),
                team,
              )
            ),
          ),
        ),
      ),
    );
  };

  // === EXPLORE SCREEN ===
  const ExploreScreen = () => {
    const [filter, setFilter] = useState('all');
    const [liked, setLiked] = useState({});
    const filters = ['ALL', 'TRENDING', 'REMIXED'];
    const filtered = filter === 'all' ? feed : filter === 'trending' ? feed.filter((_, i) => i % 2 === 0) : feed.filter(f => f.remix);

    return React.createElement('div', {
      style: { height: '100%', overflowY: 'auto', background: T.bg, fontFamily: "'Archivo', sans-serif" }
    },
      React.createElement(FloatingIsland),
      React.createElement('div', { style: { padding: '118px 14px 24px' } },

        React.createElement('div', { style: { ...hd(22, '1px'), marginBottom: '4px' } }, 'DISCOVERY FEED'),
        React.createElement('div', { style: { fontSize: '12px', color: T.textSub, marginBottom: '16px' } }, 'Sprint outcomes shaping tomorrow\'s challenges'),

        React.createElement('div', { style: { display: 'flex', gap: '8px', marginBottom: '16px' } },
          filters.map(f =>
            React.createElement('button', {
              key: f, onClick: () => setFilter(f.toLowerCase()),
              style: {
                padding: '7px 14px',
                background: filter === f.toLowerCase() ? T.accent : 'transparent',
                border: `2px solid ${filter === f.toLowerCase() ? T.accent : T.borderMed}`,
                borderRadius: '2px', color: filter === f.toLowerCase() ? '#fff' : T.textSub,
                fontFamily: "'Archivo Black', sans-serif", fontSize: '10px', letterSpacing: '1.5px',
                cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.15s',
              }
            }, f)
          ),
        ),

        ...filtered.map((item, i) =>
          React.createElement('div', {
            key: i, style: { ...card(), marginBottom: '10px', padding: '14px' }
          },
            React.createElement('div', { style: { display: 'flex', gap: '12px', alignItems: 'flex-start' } },
              React.createElement('div', {
                style: { width: '44px', height: '44px', flexShrink: 0, background: T.accentSoft, border: `2px solid ${T.borderMed}`, borderRadius: '3px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px' }
              }, item.emoji),
              React.createElement('div', { style: { flex: 1, minWidth: 0 } },
                React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '3px' } },
                  React.createElement('div', { style: hd(13, '0.3px') }, item.team),
                  React.createElement('div', { style: { fontSize: '10px', color: T.textMuted } }, item.time + ' ago'),
                ),
                React.createElement('div', { style: { fontSize: '10px', color: T.textSub, marginBottom: '5px', letterSpacing: '1px', fontFamily: "'Archivo Black', sans-serif" } }, item.challenge),
                React.createElement('div', { style: { fontSize: '13px', color: T.text, marginBottom: '10px', lineHeight: 1.4 } }, item.result),
                React.createElement('div', { style: { display: 'flex', gap: '10px', alignItems: 'center' } },
                  React.createElement('div', {
                    onClick: () => setLiked(prev => ({ ...prev, [i]: !prev[i] })),
                    style: { display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', color: liked[i] ? T.accent : T.textSub, cursor: 'pointer', userSelect: 'none' }
                  },
                    React.createElement(window.lucide.Heart, { size: 13, color: liked[i] ? T.accent : T.textSub, fill: liked[i] ? T.accent : 'none' }),
                    item.likes + (liked[i] ? 1 : 0),
                  ),
                  item.remix && React.createElement('div', { style: tag(T.success) }, '↺ REMIXED'),
                  React.createElement('div', { style: { ...tag(), marginLeft: 'auto', cursor: 'pointer' } }, 'INSPIRE →'),
                ),
              ),
            ),
          )
        ),
      ),
    );
  };

  // === TEAMS SCREEN ===
  const TeamsScreen = () => {
    const [expanded, setExpanded] = useState(null);

    return React.createElement('div', {
      style: { height: '100%', overflowY: 'auto', background: T.bg, padding: '14px 14px 24px', fontFamily: "'Archivo', sans-serif" }
    },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px', marginTop: '8px' } },
        React.createElement('div', { style: hd(22, '1px') }, 'YOUR TEAMS'),
        React.createElement('div', { style: tag() }, '3 SQUADS'),
      ),
      React.createElement('div', { style: { fontSize: '12px', color: T.textSub, marginBottom: '20px' } }, 'Co-op sprint collectives'),

      ...myTeams.map((team, i) =>
        React.createElement('div', {
          key: i,
          style: { ...card(team.active ? `${T.accent}60` : T.border), marginBottom: '12px', overflow: 'hidden' }
        },
          React.createElement('div', { style: { padding: '14px', cursor: 'pointer' }, onClick: () => setExpanded(expanded === i ? null : i) },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '14px' } },
              React.createElement('div', {
                style: { width: '54px', height: '54px', flexShrink: 0, background: team.active ? `${T.accent}18` : T.accentSoft, border: `2px solid ${team.active ? T.accent : T.border}`, borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px' }
              }, team.emoji),
              React.createElement('div', { style: { flex: 1 } },
                React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' } },
                  React.createElement('div', { style: hd(15, '0.3px') }, team.name),
                  React.createElement('div', { style: { ...hd(13, '0px'), color: team.rank === 1 ? T.warning : T.textSub } }, `#${team.rank}`),
                ),
                React.createElement('div', { style: { display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' } },
                  React.createElement('div', { style: { fontSize: '12px', color: T.textSub } }, `${team.size} members`),
                  React.createElement('div', { style: { fontSize: '12px', color: T.warning } }, `🔥 ${team.streak}d`),
                  React.createElement('div', { style: { fontSize: '12px', color: T.textSub } }, `${team.wins} wins`),
                  team.active && React.createElement('div', { style: { ...tag(), marginLeft: 'auto' } }, 'ACTIVE'),
                ),
              ),
            ),
            expanded === i && React.createElement('div', {
              style: { marginTop: '14px', paddingTop: '14px', borderTop: `1px solid ${T.border}` }
            },
              React.createElement('div', { style: { fontSize: '10px', color: T.textSub, fontFamily: "'Archivo Black', sans-serif", letterSpacing: '1.5px', marginBottom: '8px' } }, 'RECENT WINS'),
              team.activity.map((a, j) =>
                React.createElement('div', { key: j, style: { display: 'flex', gap: '8px', alignItems: 'flex-start', marginBottom: '6px' } },
                  React.createElement('div', { style: { width: '5px', height: '5px', background: T.accent, borderRadius: '1px', flexShrink: 0, marginTop: '5px' } }),
                  React.createElement('div', { style: { fontSize: '12px', color: T.textSub } }, a),
                )
              ),
              React.createElement('div', { style: { display: 'flex', gap: '8px', marginTop: '12px' } },
                React.createElement('button', { style: { ...btn(T.accent), flex: 1, padding: '9px' } },
                  React.createElement(window.lucide.UserPlus, { size: 14 }), 'INVITE',
                ),
                React.createElement('button', { style: { ...btn(T.danger, true), flex: 1, padding: '9px' } }, 'LEAVE'),
              ),
            ),
          ),
        )
      ),

      React.createElement('button', {
        style: { width: '100%', padding: '18px', background: 'transparent', border: `2px dashed ${T.borderMed}`, borderRadius: '4px', color: T.textSub, fontFamily: "'Archivo Black', sans-serif", fontSize: '11px', letterSpacing: '1.5px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }
      }, React.createElement(window.lucide.Plus, { size: 16 }), 'CREATE NEW TEAM'),
    );
  };

  // === REWARDS SCREEN ===
  const RewardsScreen = () =>
    React.createElement('div', {
      style: { height: '100%', overflowY: 'auto', background: T.bg, padding: '14px 14px 24px', fontFamily: "'Archivo', sans-serif" }
    },
      // Streak card
      React.createElement('div', {
        style: { ...card(T.accent), padding: '20px', marginBottom: '20px', marginTop: '8px', background: `${T.accent}10`, display: 'flex', alignItems: 'center', gap: '18px' }
      },
        React.createElement('div', {
          style: { width: '80px', height: '80px', flexShrink: 0, background: `${T.accent}18`, border: `3px solid ${T.accent}`, borderRadius: '4px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }
        },
          React.createElement('div', { style: { ...hd(36, '0px'), color: T.accent, lineHeight: 1 } }, '12'),
          React.createElement('div', { style: { fontSize: '9px', color: T.accent, letterSpacing: '2px', marginTop: '4px' } }, 'STREAK'),
        ),
        React.createElement('div', { style: { flex: 1 } },
          React.createElement('div', { style: { ...hd(18, '0.5px'), marginBottom: '4px' } }, 'SPRINT LEGEND'),
          React.createElement('div', { style: { fontSize: '12px', color: T.textSub, marginBottom: '10px' } }, '3 more sprints to Platinum tier'),
          React.createElement('div', { style: { background: T.border, height: '5px', overflow: 'hidden', marginBottom: '5px' } },
            React.createElement('div', { style: { height: '100%', width: '80%', background: `linear-gradient(90deg, ${T.accent} 0%, #FF9560 100%)` } }),
          ),
          React.createElement('div', { style: { fontSize: '10px', color: T.textMuted, letterSpacing: '1px' } }, '12 / 15 → PLATINUM'),
        ),
      ),

      // Badges
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' } },
        React.createElement('div', { style: hd(14, '1.5px') }, 'BADGES'),
        React.createElement('div', { style: tag() }, '3 / 6'),
      ),
      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '20px' } },
        badges.map((b, i) =>
          React.createElement('div', {
            key: i,
            style: { ...card(b.earned ? `${T.accent}60` : T.border), padding: '16px 12px', textAlign: 'center', opacity: b.earned ? 1 : 0.45 }
          },
            React.createElement('div', { style: { fontSize: '32px', marginBottom: '8px', filter: b.earned ? 'none' : 'grayscale(1)' } }, b.emoji),
            React.createElement('div', { style: { ...hd(10, '1px'), marginBottom: '4px', color: b.earned ? T.accent : T.text } }, b.name),
            React.createElement('div', { style: { fontSize: '10px', color: T.textMuted, lineHeight: 1.4 } }, b.desc),
            b.earned && React.createElement('div', { style: { ...tag(), marginTop: '10px', fontSize: '8px' } }, '✓ EARNED'),
          )
        ),
      ),

      // Next unlock
      React.createElement('div', { style: { ...hd(13, '1.5px'), marginBottom: '10px' } }, 'NEXT UNLOCK'),
      React.createElement('div', { style: { ...card(), padding: '14px', display: 'flex', gap: '12px', alignItems: 'center' } },
        React.createElement('div', {
          style: { width: '46px', height: '46px', flexShrink: 0, background: `${T.warning}18`, border: `2px solid ${T.warning}50`, borderRadius: '3px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px' }
        }, '🎨'),
        React.createElement('div', { style: { flex: 1 } },
          React.createElement('div', { style: { ...hd(13, '0.3px'), marginBottom: '3px' } }, 'CUSTOM ISLAND SKIN'),
          React.createElement('div', { style: { fontSize: '11px', color: T.textSub, marginBottom: '8px' } }, 'Personalize your floating challenge island'),
          React.createElement('div', { style: { background: T.border, height: '4px', overflow: 'hidden', marginBottom: '4px' } },
            React.createElement('div', { style: { height: '100%', width: '60%', background: T.warning } }),
          ),
          React.createElement('div', { style: { fontSize: '10px', color: T.textMuted } }, '9 / 15 sprints'),
        ),
      ),
    );

  // === PROFILE SCREEN ===
  const ProfileScreen = () => {
    const Toggle = ({ val, set }) =>
      React.createElement('div', {
        onClick: () => set(!val),
        style: { width: '46px', height: '25px', background: val ? T.accent : T.slate, border: `2px solid ${val ? T.accent : T.border}`, borderRadius: '13px', position: 'relative', cursor: 'pointer', transition: 'background 0.2s, border-color 0.2s', flexShrink: 0 }
      },
        React.createElement('div', {
          style: { position: 'absolute', top: '2.5px', left: val ? '22px' : '2.5px', width: '16px', height: '16px', background: '#FFFFFF', borderRadius: '50%', transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.25)' }
        }),
      );

    const settingRows = [
      { label: 'Dark Mode', sub: 'Toggle app theme', icon: window.lucide.Moon, val: isDark, set: setIsDark },
      { label: 'Sprint Alerts', sub: 'New challenge notifications', icon: window.lucide.Bell, val: notifs, set: setNotifs },
      { label: 'Remix Sharing', sub: "Let results influence others' sprints", icon: window.lucide.Share2, val: remix, set: setRemix },
      { label: 'Sound Effects', sub: 'Sprint completion sounds', icon: window.lucide.Volume2, val: sound, set: setSound },
    ];

    return React.createElement('div', {
      style: { height: '100%', overflowY: 'auto', background: T.bg, padding: '14px 14px 24px', fontFamily: "'Archivo', sans-serif" }
    },
      // Profile header
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px', marginTop: '8px' } },
        React.createElement('div', {
          style: { width: '76px', height: '76px', flexShrink: 0, background: `${T.accent}18`, border: `3px solid ${T.accent}`, borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '36px' }
        }, '⚡'),
        React.createElement('div', {},
          React.createElement('div', { style: { ...hd(20, '0.5px'), marginBottom: '4px' } }, 'sprint_user_01'),
          React.createElement('div', { style: { ...tag(), marginBottom: '10px' } }, 'SPRINT MASTER'),
          React.createElement('div', { style: { display: 'flex', gap: '18px' } },
            [['47', 'SPRINTS', T.accent], ['12', 'STREAK', T.warning], ['3', 'BADGES', T.success]].map(([v, l, c], i) =>
              React.createElement('div', { key: i, style: { textAlign: 'center' } },
                React.createElement('div', { style: { ...hd(18, '0px'), color: c } }, v),
                React.createElement('div', { style: { fontSize: '9px', color: T.textMuted, letterSpacing: '1px' } }, l),
              )
            ),
          ),
        ),
      ),

      // Geometric divider
      React.createElement('div', { style: { height: '2px', background: `linear-gradient(90deg, ${T.accent} 0%, transparent 100%)`, marginBottom: '20px' } }),

      React.createElement('div', { style: { fontSize: '10px', color: T.textSub, fontFamily: "'Archivo Black', sans-serif", letterSpacing: '2px', marginBottom: '12px' } }, 'PREFERENCES'),

      settingRows.map((row, i) =>
        React.createElement('div', {
          key: i,
          style: { ...card(), padding: '13px 14px', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '12px' }
        },
          React.createElement('div', {
            style: { width: '36px', height: '36px', flexShrink: 0, background: T.accentSoft, border: `1px solid ${T.border}`, borderRadius: '3px', display: 'flex', alignItems: 'center', justifyContent: 'center' }
          }, React.createElement(row.icon, { size: 16, color: T.accent })),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', { style: { fontSize: '14px', color: T.text, marginBottom: '2px', fontWeight: 500 } }, row.label),
            React.createElement('div', { style: { fontSize: '11px', color: T.textMuted } }, row.sub),
          ),
          React.createElement(Toggle, { val: row.val, set: row.set }),
        )
      ),

      // Geometric divider
      React.createElement('div', { style: { height: '2px', background: `linear-gradient(90deg, ${T.danger}60 0%, transparent 100%)`, margin: '16px 0 12px' } }),

      React.createElement('button', {
        style: { ...btn(T.danger, true), width: '100%', padding: '14px' }
      }, React.createElement(window.lucide.LogOut, { size: 16 }), 'SIGN OUT'),
    );
  };

  // === NAV CONFIG ===
  const tabs = [
    { id: 'home', label: 'Home', icon: window.lucide.Home },
    { id: 'explore', label: 'Explore', icon: window.lucide.Compass },
    { id: 'teams', label: 'Teams', icon: window.lucide.Users },
    { id: 'rewards', label: 'Rewards', icon: window.lucide.Trophy },
    { id: 'profile', label: 'Profile', icon: window.lucide.User },
  ];

  const screens = {
    home: HomeScreen,
    explore: ExploreScreen,
    teams: TeamsScreen,
    rewards: RewardsScreen,
    profile: ProfileScreen,
  };

  const ActiveScreen = screens[activeTab] || HomeScreen;

  return React.createElement('div', {
    style: { minHeight: '100vh', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }
  },
    React.createElement('style', {
      dangerouslySetInnerHTML: {
        __html: `
          @import url('https://fonts.googleapis.com/css2?family=Archivo+Black&family=Archivo:wght@400;500;600;700&display=swap');
          * { box-sizing: border-box; }
          ::-webkit-scrollbar { display: none; }
          @keyframes sprintPulse { 0%,100%{opacity:1} 50%{opacity:0.55} }
          @keyframes fadeUp { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
        `
      }
    }),

    // Phone frame
    React.createElement('div', {
      style: {
        width: '375px', height: '812px', background: T.bg, borderRadius: '48px',
        overflow: 'hidden', position: 'relative',
        boxShadow: '0 50px 150px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.1) inset',
        display: 'flex', flexDirection: 'column', transition: 'background 0.3s',
      }
    },
      // Status bar
      React.createElement('div', {
        style: {
          height: '50px', background: T.bg, display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', padding: '12px 28px 0',
          flexShrink: 0, position: 'relative', zIndex: 80, transition: 'background 0.3s',
        }
      },
        React.createElement('div', { style: { fontSize: '13px', fontWeight: '700', color: T.text, fontFamily: "'Archivo', sans-serif" } }, '9:41'),
        // Dynamic Island
        React.createElement('div', {
          style: { width: '130px', height: '36px', background: '#000', borderRadius: '20px', position: 'absolute', left: '50%', top: '6px', transform: 'translateX(-50%)', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '0 14px', gap: '7px', zIndex: 90 }
        },
          React.createElement('div', { style: { width: '8px', height: '8px', borderRadius: '50%', background: sprints[activeSprint].color, animation: 'sprintPulse 2s infinite' } }),
          React.createElement('div', {
            style: { width: '26px', height: '13px', borderRadius: '4px', background: '#1a1a1a', border: '1px solid #333', overflow: 'hidden', display: 'flex', alignItems: 'stretch' }
          },
            React.createElement('div', { style: { width: '72%', background: '#4CAF50' } }),
          ),
        ),
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '5px' } },
          React.createElement(window.lucide.Wifi, { size: 14, color: T.text }),
          React.createElement(window.lucide.Battery, { size: 16, color: T.text }),
        ),
      ),

      // Screen area
      React.createElement('div', { style: { flex: 1, overflow: 'hidden', position: 'relative' } },
        React.createElement(ActiveScreen),
      ),

      // Bottom nav
      React.createElement('div', {
        style: { height: '82px', background: T.navBg, borderTop: `2px solid ${T.border}`, display: 'flex', alignItems: 'flex-start', padding: '10px 0 0', flexShrink: 0, transition: 'background 0.3s' }
      },
        tabs.map(tab =>
          React.createElement('div', {
            key: tab.id,
            onClick: () => setActiveTab(tab.id),
            style: {
              flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              gap: '4px', cursor: 'pointer', paddingTop: '8px',
              borderTop: `3px solid ${activeTab === tab.id ? T.accent : 'transparent'}`,
              marginTop: '-10px', transition: 'all 0.2s',
            }
          },
            React.createElement(tab.icon, {
              size: 22,
              color: activeTab === tab.id ? T.accent : T.textSub,
              strokeWidth: activeTab === tab.id ? 2.5 : 1.5,
            }),
            React.createElement('span', {
              style: {
                fontSize: '8px', fontFamily: "'Archivo Black', sans-serif",
                letterSpacing: '0.8px', color: activeTab === tab.id ? T.accent : T.textSub, marginTop: '1px',
              }
            }, tab.label),
          )
        ),
      ),
    ),
  );
}
