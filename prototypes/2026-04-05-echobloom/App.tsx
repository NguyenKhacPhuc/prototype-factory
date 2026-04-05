const { useState, useEffect, useRef } = React;

function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [isDark, setIsDark] = useState(false);
  const [playingSeeds, setPlayingSeeds] = useState({});

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Righteous&family=Poppins:wght@300;400;500;600;700&display=swap');
      @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes pulse { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.08); opacity: 0.85; } }
      @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
      @keyframes wave { 0%, 100% { transform: scaleY(0.4); } 50% { transform: scaleY(1.6); } }
      @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-7px); } }
      @keyframes glow { 0%, 100% { box-shadow: 0 0 10px rgba(34,197,94,0.35); } 50% { box-shadow: 0 0 28px rgba(34,197,94,0.75); } }
      @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      @keyframes orbitPulse { 0%, 100% { opacity: 0.15; } 50% { opacity: 0.35; } }
      * { box-sizing: border-box; margin: 0; padding: 0; }
      ::-webkit-scrollbar { width: 0; height: 0; }
      input[type=range] { -webkit-appearance: none; appearance: none; height: 4px; border-radius: 2px; outline: none; }
      input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 14px; height: 14px; border-radius: 50%; cursor: pointer; }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const themes = {
    light: {
      bg: '#F0F4FF', cardBg: '#FFFFFF', cardBg2: '#EEF2FF', text: '#1E1B4B',
      textMuted: '#6366F1', textLight: '#A5B4FC', accent: '#4338CA', cta: '#22C55E',
      ctaLight: '#DCFCE7', ctaText: '#15803D', navBg: '#FFFFFF', border: '#E0E7FF',
      biomeGrad: 'linear-gradient(145deg, #1E1B4B 0%, #3730A3 60%, #1D4ED8 100%)',
      waveTrack: '#E0E7FF', seedTrack: '#EEF2FF',
    },
    dark: {
      bg: '#0F0F23', cardBg: '#1E1B4B', cardBg2: '#2D2B5A', text: '#F0F4FF',
      textMuted: '#A5B4FC', textLight: '#818CF8', accent: '#818CF8', cta: '#22C55E',
      ctaLight: '#14532D', ctaText: '#4ADE80', navBg: '#1A1840', border: '#3730A3',
      biomeGrad: 'linear-gradient(145deg, #0F0F23 0%, #1E1B4B 60%, #2D3A8C 100%)',
      waveTrack: '#2D2B5A', seedTrack: '#2D2B5A',
    },
  };
  const t = isDark ? themes.dark : themes.light;

  const seeds = [
    { id: 1, name: 'Snowy Owl Call', rarity: 'rare', collected: true, color: '#8B5CF6', icon: 'Bird' },
    { id: 2, name: 'Pine Needle Wind', rarity: 'common', collected: true, color: '#22C55E', icon: 'Wind' },
    { id: 3, name: 'Arctic Fox Yip', rarity: 'epic', collected: true, color: '#EC4899', icon: 'Star' },
    { id: 4, name: 'Frozen Creek', rarity: 'common', collected: true, color: '#3B82F6', icon: 'Droplets' },
    { id: 5, name: 'Wolf Howl', rarity: 'legendary', collected: false, color: '#F59E0B', icon: 'Moon' },
    { id: 6, name: 'Aurora Hum', rarity: 'legendary', collected: false, color: '#A78BFA', icon: 'Zap' },
  ];

  const quests = [
    { id: 1, title: 'Identify 3 Boreal Bird Calls', progress: 2, total: 3, xp: 50, done: false },
    { id: 2, title: 'Learn about Wolf Pack Communication', progress: 1, total: 1, xp: 30, done: true },
    { id: 3, title: 'Record Your Local Morning Soundscape', progress: 0, total: 1, xp: 75, done: false },
    { id: 4, title: 'Explore Indigenous Drum Rhythms', progress: 0, total: 3, xp: 60, done: false },
  ];

  const blooms = [
    { id: 1, user: 'SylviaM', title: 'Arctic Dawn', seeds: 5, likes: 234, avatar: 'S', color: '#8B5CF6' },
    { id: 2, user: 'NatureWatcher42', title: 'Boreal Whispers', seeds: 7, likes: 189, avatar: 'N', color: '#22C55E' },
    { id: 3, user: 'TundraSound', title: 'Midnight Forest', seeds: 4, likes: 312, avatar: 'T', color: '#EC4899' },
    { id: 4, user: 'EcoHarmonist', title: 'Wolf Moon Ritual', seeds: 8, likes: 445, avatar: 'E', color: '#F59E0B' },
  ];

  // Deterministic wave heights
  const waveHeights = [14,22,18,30,12,26,20,16,28,10,24,18,32,14,20,28,16,22,12,26,18,30,24,16];
  const bloomWaveBase = [
    [16,28,14,32,20,18,26,12,30,22,16,28,10,24,18,32,14,20,28,16,22,12,26,18,30,24,16,20,14,28,22,18],
    [20,14,26,18,30,24,16,22,12,28,18,32,14,20,28,16,22,12,26,18,30,24,16,20,14,28,22,18,26,14,30,20],
    [12,26,18,30,24,16,22,12,28,18,32,14,20,28,16,22,12,26,18,30,24,16,20,14,28,22,18,26,14,30,20,16],
    [28,16,22,12,26,18,30,24,16,20,14,28,22,18,26,14,30,20,16,28,14,22,18,30,12,26,20,18,26,12,24,28],
  ];

  function Icon({ name, size = 20, color, style: extraStyle = {} }) {
    const LucideIcon = window.lucide && window.lucide[name];
    if (!LucideIcon) return React.createElement('span', { style: { width: size, height: size, display: 'inline-block' } });
    return React.createElement(LucideIcon, { size, color: color || t.text, style: extraStyle });
  }

  function RarityBadge({ rarity, color }) {
    return React.createElement('span', {
      style: {
        fontFamily: 'Poppins, sans-serif', fontSize: 9, color, fontWeight: 700,
        textTransform: 'uppercase', letterSpacing: '0.8px',
        background: color + '20', border: `1px solid ${color}40`,
        borderRadius: 6, padding: '2px 6px',
      }
    }, rarity);
  }

  function NavBar() {
    const navItems = [
      { id: 'home', icon: 'Home', label: 'Home' },
      { id: 'explore', icon: 'Compass', label: 'Explore' },
      { id: 'alchemy', icon: 'Music', label: 'Alchemy' },
      { id: 'grove', icon: 'Globe', label: 'Grove' },
    ];
    return React.createElement('div', {
      style: {
        position: 'absolute', bottom: 0, left: 0, right: 0, background: t.navBg,
        borderTop: `1px solid ${t.border}`, display: 'flex', justifyContent: 'space-around',
        alignItems: 'center', padding: '10px 0 18px', zIndex: 100,
        boxShadow: isDark ? '0 -4px 24px rgba(0,0,0,0.5)' : '0 -4px 24px rgba(30,27,75,0.1)',
      }
    },
      navItems.map(item =>
        React.createElement('button', {
          key: item.id, onClick: () => setActiveScreen(item.id),
          style: {
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
            background: activeScreen === item.id ? (isDark ? '#22C55E18' : '#DCFCE7') : 'none',
            border: 'none', cursor: 'pointer', padding: '8px 18px', borderRadius: 14,
            transition: 'all 0.2s ease', minWidth: 44, minHeight: 44,
          }
        },
          React.createElement(Icon, { name: item.icon, size: 22, color: activeScreen === item.id ? '#22C55E' : t.textMuted }),
          React.createElement('span', {
            style: {
              fontSize: 10, fontFamily: 'Poppins, sans-serif',
              fontWeight: activeScreen === item.id ? 700 : 400,
              color: activeScreen === item.id ? '#22C55E' : t.textMuted,
            }
          }, item.label)
        )
      )
    );
  }

  // ───────────────────────────────────────── HOME SCREEN
  function HomeScreen() {
    const [sprigExpanded, setSprigExpanded] = useState(false);
    const collectedCount = seeds.filter(s => s.collected).length;

    return React.createElement('div', {
      style: { height: '100%', overflowY: 'auto', background: t.bg, paddingBottom: 88, animation: 'fadeIn 0.35s ease' }
    },
      // ── Header
      React.createElement('div', {
        style: { padding: '22px 20px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }
      },
        React.createElement('div', null,
          React.createElement('p', { style: { fontFamily: 'Poppins, sans-serif', fontSize: 12, color: t.textMuted, marginBottom: 2 } }, 'Winter Bloom Season · Week 4'),
          React.createElement('h1', { style: { fontFamily: 'Righteous, cursive', fontSize: 26, color: t.text, lineHeight: 1.1 } }, 'Welcome back, Aria ✦'),
        ),
        React.createElement('div', { style: { display: 'flex', gap: 8, alignItems: 'center' } },
          React.createElement('button', {
            onClick: () => setIsDark(!isDark),
            style: {
              width: 44, height: 44, borderRadius: 22, background: t.cardBg,
              border: `1.5px solid ${t.border}`, display: 'flex', alignItems: 'center',
              justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s',
            }
          }, React.createElement(Icon, { name: isDark ? 'Sun' : 'Moon', size: 18, color: t.accent })),
          React.createElement('div', {
            style: {
              width: 44, height: 44, borderRadius: 22,
              background: 'linear-gradient(135deg, #4338CA, #22C55E)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'Righteous, cursive', color: '#fff', fontSize: 18,
              boxShadow: '0 3px 12px rgba(67,56,202,0.35)',
            }
          }, 'A')
        )
      ),

      // ── XP Bar
      React.createElement('div', { style: { padding: '0 20px 20px' } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: 6 } },
          React.createElement('span', { style: { fontFamily: 'Poppins, sans-serif', fontSize: 12, color: t.textMuted, fontWeight: 500 } }, 'Cultivator Level 7'),
          React.createElement('span', { style: { fontFamily: 'Poppins, sans-serif', fontSize: 12, color: '#22C55E', fontWeight: 600 } }, '2,340 / 3,000 XP')
        ),
        React.createElement('div', { style: { height: 8, background: t.border, borderRadius: 4, overflow: 'hidden' } },
          React.createElement('div', {
            style: {
              height: '100%', width: '78%',
              background: 'linear-gradient(90deg, #4338CA, #22C55E)',
              borderRadius: 4, transition: 'width 0.6s ease',
            }
          })
        )
      ),

      // ── Biome Hero Card
      React.createElement('div', {
        style: {
          margin: '0 16px 22px', borderRadius: 26, background: t.biomeGrad,
          padding: '22px 20px', position: 'relative', overflow: 'hidden',
          boxShadow: '0 10px 36px rgba(30,27,75,0.38)', animation: 'slideUp 0.4s ease',
        }
      },
        React.createElement('div', { style: { position: 'absolute', top: -40, right: -40, width: 160, height: 160, borderRadius: '50%', background: 'rgba(255,255,255,0.04)' } }),
        React.createElement('div', { style: { position: 'absolute', bottom: -24, right: 30, width: 90, height: 90, borderRadius: '50%', background: 'rgba(34,197,94,0.08)' } }),
        React.createElement('div', { style: { position: 'absolute', top: 20, right: 20 } },
          React.createElement('div', {
            style: {
              width: 68, height: 68, borderRadius: '50%',
              border: '3px solid rgba(255,255,255,0.15)',
              borderTop: '3px solid #22C55E',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'rgba(255,255,255,0.06)',
              animation: 'spin 8s linear infinite',
            }
          }),
          React.createElement('div', {
            style: {
              position: 'absolute', top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              fontFamily: 'Righteous, cursive', fontSize: 15, color: '#fff',
            }
          }, '67%')
        ),
        React.createElement('span', {
          style: {
            display: 'inline-block', background: 'rgba(34,197,94,0.2)', border: '1px solid rgba(34,197,94,0.4)',
            borderRadius: 20, padding: '4px 12px', fontFamily: 'Poppins, sans-serif', fontSize: 10,
            color: '#22C55E', fontWeight: 700, letterSpacing: '0.8px', marginBottom: 10,
          }
        }, 'SEASON 1 · BOREAL FOREST'),
        React.createElement('h2', { style: { fontFamily: 'Righteous, cursive', fontSize: 30, color: '#FFFFFF', marginBottom: 8, lineHeight: 1.1 } }, 'Boreal Bloom'),
        React.createElement('p', { style: { fontFamily: 'Poppins, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.68)', marginBottom: 18, lineHeight: 1.55, maxWidth: 220 } },
          'A vast northern wilderness calling through its haunting soundscape. 4 seeds remain.'),
        React.createElement('button', {
          onClick: () => setActiveScreen('explore'),
          style: {
            background: '#22C55E', border: 'none', borderRadius: 14, padding: '12px 20px',
            fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 14, color: '#fff',
            cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8,
            boxShadow: '0 4px 16px rgba(34,197,94,0.4)', transition: 'transform 0.15s, box-shadow 0.15s',
          }
        },
          React.createElement(Icon, { name: 'Compass', size: 16, color: '#fff' }),
          React.createElement('span', null, 'Continue Bloom')
        )
      ),

      // ── Sound Seeds Row
      React.createElement('div', { style: { marginBottom: 22 } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px', marginBottom: 12 } },
          React.createElement('h3', { style: { fontFamily: 'Righteous, cursive', fontSize: 18, color: t.text } }, 'Sound Seeds'),
          React.createElement('span', { style: { fontFamily: 'Poppins, sans-serif', fontSize: 12, color: t.accent, fontWeight: 600 } }, `${collectedCount}/${seeds.length} collected`)
        ),
        React.createElement('div', { style: { display: 'flex', gap: 12, paddingLeft: 20, overflowX: 'auto', paddingBottom: 4 } },
          seeds.map(seed =>
            React.createElement('div', {
              key: seed.id,
              style: {
                minWidth: 88, background: t.cardBg, borderRadius: 22, padding: '14px 10px',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7,
                cursor: 'pointer', border: `1.5px solid ${seed.collected ? seed.color + '45' : t.border}`,
                opacity: seed.collected ? 1 : 0.48,
                boxShadow: seed.collected ? `0 4px 16px ${seed.color}22` : 'none',
                transition: 'transform 0.15s, box-shadow 0.15s',
              }
            },
              React.createElement('div', {
                style: {
                  width: 46, height: 46, borderRadius: '50%',
                  background: seed.collected ? `linear-gradient(145deg, ${seed.color}, ${seed.color}99)` : t.border,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: seed.collected ? `0 0 14px ${seed.color}44` : 'none',
                  animation: seed.collected ? `float ${2.5 + seed.id * 0.3}s ease-in-out infinite` : 'none',
                }
              }, React.createElement(Icon, { name: seed.icon, size: 20, color: seed.collected ? '#fff' : t.textLight })),
              React.createElement('span', { style: { fontFamily: 'Poppins, sans-serif', fontSize: 10, color: t.text, fontWeight: 500, textAlign: 'center', lineHeight: 1.3 } }, seed.name),
              React.createElement(RarityBadge, { rarity: seed.rarity, color: seed.color })
            )
          )
        )
      ),

      // ── Today's Quests
      React.createElement('div', { style: { padding: '0 16px 20px' } },
        React.createElement('h3', { style: { fontFamily: 'Righteous, cursive', fontSize: 18, color: t.text, marginBottom: 12 } }, "Today's Quests"),
        quests.slice(0, 2).map(quest =>
          React.createElement('div', {
            key: quest.id,
            style: {
              background: t.cardBg, borderRadius: 18, padding: '14px 16px', marginBottom: 10,
              border: `1.5px solid ${quest.done ? '#22C55E44' : t.border}`,
              boxShadow: quest.done ? '0 2px 12px rgba(34,197,94,0.1)' : '0 2px 10px rgba(0,0,0,0.04)',
            }
          },
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 } },
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, flex: 1 } },
                React.createElement(Icon, { name: quest.done ? 'CheckCircle' : 'Circle', size: 18, color: quest.done ? '#22C55E' : t.textLight }),
                React.createElement('span', { style: { fontFamily: 'Poppins, sans-serif', fontSize: 13, color: t.text, fontWeight: 500, lineHeight: 1.3 } }, quest.title)
              ),
              React.createElement('span', { style: { fontFamily: 'Poppins, sans-serif', fontSize: 11, color: t.ctaText, background: t.ctaLight, padding: '3px 10px', borderRadius: 8, fontWeight: 700, marginLeft: 8, whiteSpace: 'nowrap' } }, `+${quest.xp} XP`)
            ),
            React.createElement('div', { style: { height: 6, background: t.border, borderRadius: 3, overflow: 'hidden' } },
              React.createElement('div', { style: { height: '100%', width: `${(quest.progress / quest.total) * 100}%`, background: quest.done ? '#22C55E' : 'linear-gradient(90deg, #4338CA, #818CF8)', borderRadius: 3, transition: 'width 0.5s ease' } })
            ),
            React.createElement('span', { style: { fontFamily: 'Poppins, sans-serif', fontSize: 11, color: t.textMuted, marginTop: 4, display: 'block' } }, `${quest.progress} of ${quest.total} complete`)
          )
        )
      ),

      // ── Sprig AI Widget
      React.createElement('div', {
        style: { margin: '0 16px', cursor: 'pointer' },
        onClick: () => setSprigExpanded(!sprigExpanded)
      },
        React.createElement('div', {
          style: {
            background: 'linear-gradient(145deg, #1E1B4B, #3730A3)',
            borderRadius: 22, padding: '16px 18px',
            boxShadow: '0 8px 24px rgba(30,27,75,0.35)',
            border: '1px solid rgba(129,140,248,0.2)',
          }
        },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12 } },
            React.createElement('div', {
              style: {
                width: 46, height: 46, borderRadius: '50%', background: 'rgba(34,197,94,0.18)',
                border: '1.5px solid rgba(34,197,94,0.45)', display: 'flex', alignItems: 'center',
                justifyContent: 'center', animation: 'pulse 2.4s ease-in-out infinite', flexShrink: 0,
              }
            }, React.createElement(Icon, { name: 'Sparkles', size: 20, color: '#22C55E' })),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('p', { style: { fontFamily: 'Righteous, cursive', fontSize: 15, color: '#fff', marginBottom: 2 } }, 'Sprig · Your Botanical Guide'),
              React.createElement('p', { style: { fontFamily: 'Poppins, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.65)', lineHeight: 1.4 } },
                sprigExpanded ? '"The Boreal Forest holds 30% of Earth\'s land-based carbon — every pine needle tells a climate story!"' : '"Tap to discover today\'s sonic secret from the Boreal biome..."')
            ),
            React.createElement(Icon, { name: sprigExpanded ? 'ChevronDown' : 'ChevronRight', size: 18, color: 'rgba(255,255,255,0.45)' })
          ),
          sprigExpanded && React.createElement('div', { style: { marginTop: 14, paddingTop: 14, borderTop: '1px solid rgba(255,255,255,0.1)', animation: 'slideUp 0.2s ease' } },
            React.createElement('button', {
              onClick: (e) => { e.stopPropagation(); setActiveScreen('explore'); },
              style: { width: '100%', background: 'rgba(34,197,94,0.2)', border: '1px solid rgba(34,197,94,0.4)', borderRadius: 14, padding: '10px', color: '#22C55E', fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 13, cursor: 'pointer' }
            }, 'Start a Discovery with Sprig →')
          )
        )
      )
    );
  }

  // ───────────────────────────────────────── EXPLORE SCREEN
  function ExploreScreen() {
    const [openQuestId, setOpenQuestId] = useState(null);
    const [chatStep, setChatStep] = useState(0);
    const chatMessages = [
      { from: 'sprig', text: 'Welcome to the Boreal Bloom! Did you know that some boreal birds can locate buried food under 60cm of snow?' },
      { from: 'user', text: 'Whoa! How do they find it?' },
      { from: 'sprig', text: 'They use spatial memory — essentially, they make a mental map. The Black-capped Chickadee can remember thousands of cache locations!' },
      { from: 'user', text: 'That\'s incredible. What sound does it make?' },
    ];

    return React.createElement('div', {
      style: { height: '100%', overflowY: 'auto', background: t.bg, paddingBottom: 88, animation: 'fadeIn 0.35s ease' }
    },
      // ── Biome Header Banner
      React.createElement('div', {
        style: { background: t.biomeGrad, padding: '22px 20px 30px', borderBottomLeftRadius: 36, borderBottomRightRadius: 36, position: 'relative', overflow: 'hidden' }
      },
        React.createElement('div', { style: { position: 'absolute', bottom: 8, left: 0, right: 0, display: 'flex', justifyContent: 'center', alignItems: 'flex-end', gap: 3, height: 44, opacity: 0.18 } },
          waveHeights.map((h, i) =>
            React.createElement('div', { key: i, style: { width: 4, height: h, background: '#22C55E', borderRadius: 2, animation: `wave ${0.6 + (i % 5) * 0.12}s ease-in-out infinite`, animationDelay: `${i * 0.05}s` } })
          )
        ),
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' } },
          React.createElement('div', null,
            React.createElement('span', { style: { display: 'inline-block', background: 'rgba(34,197,94,0.2)', border: '1px solid rgba(34,197,94,0.4)', borderRadius: 20, padding: '4px 12px', fontFamily: 'Poppins, sans-serif', fontSize: 10, color: '#22C55E', fontWeight: 700, letterSpacing: '0.8px', marginBottom: 8 } }, 'ACTIVE BIOME'),
            React.createElement('h2', { style: { fontFamily: 'Righteous, cursive', fontSize: 28, color: '#fff', marginBottom: 6 } }, 'Boreal Forest'),
            React.createElement('p', { style: { fontFamily: 'Poppins, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.68)', maxWidth: 220, lineHeight: 1.5 } }, 'Explore the vast northern wilderness through its haunting, ancient soundscape.')
          ),
          React.createElement('div', { style: { background: 'rgba(255,255,255,0.1)', borderRadius: 16, padding: '10px 14px', border: '1px solid rgba(255,255,255,0.15)', textAlign: 'center' } },
            React.createElement(Icon, { name: 'Calendar', size: 16, color: '#A5B4FC' }),
            React.createElement('p', { style: { fontFamily: 'Righteous, cursive', fontSize: 18, color: '#fff', marginTop: 4 } }, '23'),
            React.createElement('p', { style: { fontFamily: 'Poppins, sans-serif', fontSize: 10, color: 'rgba(255,255,255,0.55)' } }, 'days left')
          )
        )
      ),

      // ── Bloom Quests
      React.createElement('div', { style: { padding: '20px 16px 0' } },
        React.createElement('h3', { style: { fontFamily: 'Righteous, cursive', fontSize: 18, color: t.text, marginBottom: 14 } }, 'Bloom Quests'),
        quests.map(quest =>
          React.createElement('div', {
            key: quest.id,
            onClick: () => setOpenQuestId(openQuestId === quest.id ? null : quest.id),
            style: {
              background: t.cardBg, borderRadius: 18, padding: '14px 16px', marginBottom: 10,
              border: `1.5px solid ${quest.done ? '#22C55E44' : t.border}`,
              cursor: 'pointer', transition: 'all 0.2s ease',
              boxShadow: quest.done ? '0 2px 14px rgba(34,197,94,0.1)' : '0 2px 8px rgba(0,0,0,0.04)',
            }
          },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12 } },
              React.createElement('div', { style: { width: 42, height: 42, borderRadius: '50%', background: quest.done ? '#22C55E' : t.cardBg2, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: quest.done ? '0 2px 8px rgba(34,197,94,0.35)' : 'none' } },
                React.createElement(Icon, { name: quest.done ? 'CheckCircle' : 'Clock', size: 20, color: quest.done ? '#fff' : t.textMuted })
              ),
              React.createElement('div', { style: { flex: 1 } },
                React.createElement('p', { style: { fontFamily: 'Poppins, sans-serif', fontSize: 13, color: t.text, fontWeight: 600, marginBottom: 5 } }, quest.title),
                React.createElement('div', { style: { height: 5, background: t.border, borderRadius: 3, overflow: 'hidden' } },
                  React.createElement('div', { style: { height: '100%', width: `${(quest.progress / quest.total) * 100}%`, background: quest.done ? '#22C55E' : 'linear-gradient(90deg, #4338CA, #818CF8)', borderRadius: 3 } })
                )
              ),
              React.createElement('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 } },
                React.createElement('span', { style: { fontFamily: 'Poppins, sans-serif', fontSize: 12, color: t.ctaText, background: t.ctaLight, padding: '3px 10px', borderRadius: 8, fontWeight: 700 } }, `+${quest.xp}`),
                React.createElement('span', { style: { fontFamily: 'Poppins, sans-serif', fontSize: 11, color: t.textMuted } }, `${quest.progress}/${quest.total}`)
              )
            ),
            openQuestId === quest.id && React.createElement('div', { style: { marginTop: 12, paddingTop: 12, borderTop: `1px solid ${t.border}`, animation: 'slideUp 0.2s ease' } },
              React.createElement('p', { style: { fontFamily: 'Poppins, sans-serif', fontSize: 12, color: t.textMuted, marginBottom: 10 } },
                quest.done ? 'Quest complete! You earned a sound seed.' : `Complete this quest to unlock a rare sound seed for your Boreal collection.`
              ),
              React.createElement('button', {
                onClick: (e) => e.stopPropagation(),
                style: { width: '100%', background: quest.done ? t.cardBg2 : 'linear-gradient(135deg, #4338CA, #1E1B4B)', border: `1px solid ${t.border}`, borderRadius: 12, padding: '10px', color: quest.done ? t.textMuted : '#fff', fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 13, cursor: quest.done ? 'default' : 'pointer' }
              }, quest.done ? '✓ Seed Collected' : 'Begin Quest')
            )
          )
        ),

        // ── Conversational Discoveries (Sprig)
        React.createElement('h3', { style: { fontFamily: 'Righteous, cursive', fontSize: 18, color: t.text, margin: '22px 0 14px' } }, 'Conversational Discovery'),
        React.createElement('div', { style: { background: t.cardBg, borderRadius: 22, padding: '16px', border: `1.5px solid ${t.border}`, boxShadow: '0 4px 14px rgba(0,0,0,0.05)' } },
          chatMessages.slice(0, chatStep + 1).map((msg, i) =>
            React.createElement('div', { key: i, style: { display: 'flex', gap: 8, marginBottom: 12, flexDirection: msg.from === 'user' ? 'row-reverse' : 'row', animation: 'slideUp 0.2s ease' } },
              React.createElement('div', {
                style: {
                  width: 32, height: 32, borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: msg.from === 'sprig' ? 'linear-gradient(135deg, #4338CA, #1E1B4B)' : 'linear-gradient(135deg, #22C55E, #16A34A)',
                  fontFamily: msg.from === 'user' ? 'Righteous, cursive' : 'none', color: '#fff', fontSize: 13,
                }
              }, msg.from === 'sprig' ? React.createElement(Icon, { name: 'Sparkles', size: 14, color: '#fff' }) : 'A'),
              React.createElement('div', {
                style: {
                  background: msg.from === 'sprig' ? (isDark ? '#2D2B5A' : '#EEF2FF') : (isDark ? '#14532D' : '#DCFCE7'),
                  borderRadius: 14, borderTopLeftRadius: msg.from === 'sprig' ? 2 : 14, borderTopRightRadius: msg.from === 'user' ? 2 : 14,
                  padding: '10px 12px', maxWidth: '75%',
                  border: `1px solid ${msg.from === 'sprig' ? t.border : '#22C55E33'}`,
                }
              },
                msg.from === 'sprig' && React.createElement('p', { style: { fontFamily: 'Poppins, sans-serif', fontSize: 10, color: t.accent, fontWeight: 700, marginBottom: 3, textTransform: 'uppercase', letterSpacing: '0.5px' } }, 'Sprig'),
                React.createElement('p', { style: { fontFamily: 'Poppins, sans-serif', fontSize: 13, color: t.text, lineHeight: 1.5 } }, msg.text)
              )
            )
          ),
          chatStep < chatMessages.length - 1 && React.createElement('button', {
            onClick: () => setChatStep(prev => prev + 1),
            style: {
              width: '100%', background: 'linear-gradient(135deg, #4338CA, #1E1B4B)', border: 'none',
              borderRadius: 14, padding: '11px', color: '#fff', fontFamily: 'Poppins, sans-serif',
              fontWeight: 600, fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            }
          },
            React.createElement(Icon, { name: 'MessageCircle', size: 15, color: '#fff' }),
            React.createElement('span', null, chatStep === 0 ? 'Start Discovery' : 'Continue →')
          ),
          chatStep >= chatMessages.length - 1 && React.createElement('div', { style: { marginTop: 8, background: isDark ? '#14532D' : '#DCFCE7', borderRadius: 12, padding: '10px 12px', border: '1px solid #22C55E44', display: 'flex', alignItems: 'center', gap: 8 } },
            React.createElement(Icon, { name: 'Star', size: 16, color: '#22C55E' }),
            React.createElement('span', { style: { fontFamily: 'Poppins, sans-serif', fontSize: 12, color: t.ctaText, fontWeight: 600 } }, 'Discovery complete! +30 XP earned')
          )
        )
      )
    );
  }

  // ───────────────────────────────────────── ALCHEMY SCREEN
  function AlchemyScreen() {
    const [activeSeedIds, setActiveSeedIds] = useState([1, 2, 3]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volumes, setVolumes] = useState({ 1: 72, 2: 50, 3: 85, 4: 60 });
    const [reverb, setReverb] = useState(35);
    const collectedSeeds = seeds.filter(s => s.collected);

    const orbPositions = [
      { angle: 330, dist: 0.42, seed: collectedSeeds[0] },
      { angle: 90, dist: 0.38, seed: collectedSeeds[1] },
      { angle: 210, dist: 0.44, seed: collectedSeeds[2] },
      { angle: 30, dist: 0.36, seed: collectedSeeds[3] },
    ].filter(p => p.seed);

    return React.createElement('div', {
      style: { height: '100%', overflowY: 'auto', background: t.bg, paddingBottom: 88, animation: 'fadeIn 0.35s ease' }
    },
      // Header
      React.createElement('div', { style: { padding: '22px 20px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
        React.createElement('div', null,
          React.createElement('h2', { style: { fontFamily: 'Righteous, cursive', fontSize: 26, color: t.text } }, 'Sound Alchemy'),
          React.createElement('p', { style: { fontFamily: 'Poppins, sans-serif', fontSize: 13, color: t.textMuted } }, 'Blend seeds into your ambient bloom')
        ),
        React.createElement('button', {
          style: { background: 'linear-gradient(135deg, #1E1B4B, #4338CA)', border: 'none', borderRadius: 14, padding: '10px 16px', color: '#fff', fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, boxShadow: '0 4px 14px rgba(30,27,75,0.3)' }
        },
          React.createElement(Icon, { name: 'Save', size: 14, color: '#fff' }),
          React.createElement('span', null, 'Save Bloom')
        )
      ),

      // Spatial Mix Canvas
      React.createElement('div', { style: { margin: '0 16px 22px' } },
        React.createElement('div', {
          style: {
            background: 'linear-gradient(150deg, #1E1B4B 0%, #0F0F23 70%, #1D2A5C 100%)',
            borderRadius: 28, position: 'relative', overflow: 'hidden',
            aspectRatio: '1', boxShadow: '0 10px 40px rgba(15,15,35,0.5)',
            border: '1px solid rgba(129,140,248,0.2)',
          }
        },
          // Grid
          React.createElement('div', { style: { position: 'absolute', inset: 0, opacity: 0.06, backgroundImage: 'linear-gradient(rgba(165,180,252,1) 1px, transparent 1px), linear-gradient(90deg, rgba(165,180,252,1) 1px, transparent 1px)', backgroundSize: '28px 28px' } }),
          // Orbit rings
          ...[160, 210, 268].map((size, i) =>
            React.createElement('div', { key: i, style: { position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: size, height: size, borderRadius: '50%', border: `1px ${i === 1 ? 'dashed' : 'solid'} rgba(129,140,248,${0.08 + i * 0.03})`, animation: 'orbitPulse 4s ease-in-out infinite', animationDelay: `${i * 1.2}s` } })
          ),
          // Center glow
          React.createElement('div', { style: { position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 80, height: 80, borderRadius: '50%', background: isPlaying ? 'radial-gradient(circle, rgba(34,197,94,0.4) 0%, transparent 70%)' : 'radial-gradient(circle, rgba(67,56,202,0.3) 0%, transparent 70%)', transition: 'all 0.4s ease', animation: isPlaying ? 'pulse 1.8s ease-in-out infinite' : 'none' } }),
          // Play button
          React.createElement('button', {
            onClick: () => setIsPlaying(!isPlaying),
            style: {
              position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
              width: 58, height: 58, borderRadius: '50%',
              background: isPlaying ? '#22C55E' : 'rgba(34,197,94,0.18)',
              border: `2px solid ${isPlaying ? '#22C55E' : 'rgba(34,197,94,0.5)'}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', transition: 'all 0.25s ease',
              animation: isPlaying ? 'glow 2.2s ease-in-out infinite' : 'none',
            }
          }, React.createElement(Icon, { name: isPlaying ? 'Pause' : 'Play', size: 24, color: isPlaying ? '#fff' : '#22C55E' })),
          // Seed orbs
          ...orbPositions.map((pos, i) => {
            const rad = (pos.angle * Math.PI) / 180;
            const containerSize = 343 - 32;
            const cx = 50 + Math.cos(rad) * pos.dist * 100;
            const cy = 50 + Math.sin(rad) * pos.dist * 100;
            const isActive = activeSeedIds.includes(pos.seed.id);
            return React.createElement('div', {
              key: pos.seed.id,
              onClick: () => setActiveSeedIds(prev => isActive ? prev.filter(id => id !== pos.seed.id) : [...prev, pos.seed.id]),
              style: {
                position: 'absolute', top: `${cy}%`, left: `${cx}%`, transform: 'translate(-50%, -50%)',
                width: 50, height: 50, borderRadius: '50%',
                background: isActive ? `linear-gradient(145deg, ${pos.seed.color}, ${pos.seed.color}99)` : 'rgba(255,255,255,0.08)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', border: `2px solid ${isActive ? pos.seed.color : 'rgba(255,255,255,0.15)'}`,
                boxShadow: isActive ? `0 0 20px ${pos.seed.color}55` : 'none',
                transition: 'all 0.25s ease',
                animation: isActive && isPlaying ? `float ${2.2 + i * 0.4}s ease-in-out infinite` : 'none',
              }
            }, React.createElement(Icon, { name: pos.seed.icon, size: 20, color: isActive ? '#fff' : 'rgba(255,255,255,0.35)' }));
          }),
          // Label
          React.createElement('div', { style: { position: 'absolute', bottom: 12, left: 0, right: 0, textAlign: 'center' } },
            React.createElement('span', { style: { fontFamily: 'Poppins, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.4)' } }, 'Tap seeds to toggle · Spatial mix visualization')
          )
        )
      ),

      // Layer controls
      React.createElement('div', { style: { padding: '0 16px' } },
        React.createElement('h3', { style: { fontFamily: 'Righteous, cursive', fontSize: 18, color: t.text, marginBottom: 12 } }, 'Mix Layers'),
        // Reverb global
        React.createElement('div', { style: { background: t.cardBg, borderRadius: 16, padding: '12px 14px', marginBottom: 10, border: `1.5px solid ${t.border}`, display: 'flex', alignItems: 'center', gap: 12 } },
          React.createElement('div', { style: { width: 38, height: 38, borderRadius: '50%', background: 'linear-gradient(135deg, #4338CA, #818CF8)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 } },
            React.createElement(Icon, { name: 'Waves', size: 16, color: '#fff' })
          ),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('p', { style: { fontFamily: 'Poppins, sans-serif', fontSize: 12, color: t.text, fontWeight: 600, marginBottom: 5 } }, 'Global Reverb & Space'),
            React.createElement('input', { type: 'range', min: 0, max: 100, value: reverb, onChange: e => setReverb(parseInt(e.target.value)), style: { width: '100%', accentColor: '#4338CA', height: 4 } })
          ),
          React.createElement('span', { style: { fontFamily: 'Poppins, sans-serif', fontSize: 12, color: t.textMuted, minWidth: 30, textAlign: 'right' } }, `${reverb}%`)
        ),
        // Per-seed volume
        collectedSeeds.filter(s => activeSeedIds.includes(s.id)).map(seed =>
          React.createElement('div', { key: seed.id, style: { background: t.cardBg, borderRadius: 14, padding: '12px 14px', marginBottom: 8, border: `1.5px solid ${seed.color}30`, display: 'flex', alignItems: 'center', gap: 12 } },
            React.createElement('div', { style: { width: 38, height: 38, borderRadius: '50%', background: `linear-gradient(145deg, ${seed.color}, ${seed.color}88)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: `0 0 10px ${seed.color}33` } },
              React.createElement(Icon, { name: seed.icon, size: 16, color: '#fff' })
            ),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('p', { style: { fontFamily: 'Poppins, sans-serif', fontSize: 12, color: t.text, fontWeight: 600, marginBottom: 5 } }, seed.name),
              React.createElement('input', { type: 'range', min: 0, max: 100, value: volumes[seed.id] || 50, onChange: e => setVolumes(prev => ({ ...prev, [seed.id]: parseInt(e.target.value) })), style: { width: '100%', accentColor: seed.color, height: 4 } })
            ),
            React.createElement('span', { style: { fontFamily: 'Poppins, sans-serif', fontSize: 12, color: t.textMuted, minWidth: 30, textAlign: 'right' } }, `${volumes[seed.id] || 50}%`)
          )
        ),
        React.createElement('button', {
          onClick: () => setActiveScreen('grove'),
          style: {
            width: '100%', background: '#22C55E', border: 'none', borderRadius: 18, padding: '15px',
            color: '#fff', fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 15, cursor: 'pointer',
            marginTop: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            boxShadow: '0 6px 20px rgba(34,197,94,0.4)',
          }
        },
          React.createElement(Icon, { name: 'Globe', size: 18, color: '#fff' }),
          React.createElement('span', null, 'Share to Global Grove')
        )
      )
    );
  }

  // ───────────────────────────────────────── GROVE SCREEN
  function GroveScreen() {
    const [likedBlooms, setLikedBlooms] = useState([3]);
    const [activeFilter, setActiveFilter] = useState('trending');
    const filters = ['trending', 'newest', 'friends', 'featured'];

    return React.createElement('div', {
      style: { height: '100%', overflowY: 'auto', background: t.bg, paddingBottom: 88, animation: 'fadeIn 0.35s ease' }
    },
      // Header
      React.createElement('div', { style: { background: t.biomeGrad, padding: '22px 20px 24px', borderBottomLeftRadius: 36, borderBottomRightRadius: 36 } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 } },
          React.createElement('div', null,
            React.createElement('h2', { style: { fontFamily: 'Righteous, cursive', fontSize: 28, color: '#fff', marginBottom: 4 } }, 'Global Grove'),
            React.createElement('p', { style: { fontFamily: 'Poppins, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.65)' } }, 'A living tapestry of shared soundscapes')
          ),
          React.createElement('button', { style: { background: 'rgba(34,197,94,0.2)', border: '1px solid rgba(34,197,94,0.4)', borderRadius: 14, padding: '8px 14px', color: '#22C55E', fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 } },
            React.createElement(Icon, { name: 'Plus', size: 14, color: '#22C55E' }),
            React.createElement('span', null, 'Share Bloom')
          )
        ),
        React.createElement('div', { style: { display: 'flex', gap: 10 } },
          [{ icon: 'Music2', label: 'Blooms', value: '12.8K' }, { icon: 'Users', label: 'Cultivators', value: '3.4K' }, { icon: 'Sparkles', label: 'Seeds', value: '46.2K' }].map(stat =>
            React.createElement('div', { key: stat.label, style: { flex: 1, background: 'rgba(255,255,255,0.09)', borderRadius: 14, padding: '10px 8px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.12)' } },
              React.createElement(Icon, { name: stat.icon, size: 16, color: '#22C55E' }),
              React.createElement('p', { style: { fontFamily: 'Righteous, cursive', fontSize: 17, color: '#fff', marginTop: 4 } }, stat.value),
              React.createElement('p', { style: { fontFamily: 'Poppins, sans-serif', fontSize: 10, color: 'rgba(255,255,255,0.55)' } }, stat.label)
            )
          )
        )
      ),

      // Filter tabs
      React.createElement('div', { style: { display: 'flex', gap: 8, padding: '16px 16px 0', overflowX: 'auto' } },
        filters.map(f =>
          React.createElement('button', {
            key: f, onClick: () => setActiveFilter(f),
            style: {
              background: activeFilter === f ? '#4338CA' : t.cardBg,
              border: `1.5px solid ${activeFilter === f ? '#4338CA' : t.border}`,
              borderRadius: 20, padding: '7px 16px', color: activeFilter === f ? '#fff' : t.textMuted,
              fontFamily: 'Poppins, sans-serif', fontWeight: activeFilter === f ? 700 : 400,
              fontSize: 12, cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.2s',
            }
          }, f.charAt(0).toUpperCase() + f.slice(1))
        )
      ),

      // Bloom cards
      React.createElement('div', { style: { padding: '16px 16px 0' } },
        blooms.map((bloom, bi) =>
          React.createElement('div', {
            key: bloom.id,
            style: { background: t.cardBg, borderRadius: 22, marginBottom: 14, border: `1.5px solid ${t.border}`, overflow: 'hidden', boxShadow: '0 4px 14px rgba(0,0,0,0.05)', transition: 'transform 0.15s', animation: 'slideUp 0.3s ease', animationDelay: `${bi * 0.08}s` }
          },
            // Card header
            React.createElement('div', { style: { padding: '16px 16px 0', display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 } },
              React.createElement('div', { style: { width: 42, height: 42, borderRadius: '50%', background: `linear-gradient(145deg, ${bloom.color}, ${bloom.color}88)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Righteous, cursive', color: '#fff', fontSize: 18, flexShrink: 0, boxShadow: `0 3px 10px ${bloom.color}44` } }, bloom.avatar),
              React.createElement('div', { style: { flex: 1 } },
                React.createElement('p', { style: { fontFamily: 'Poppins, sans-serif', fontSize: 14, color: t.text, fontWeight: 700, marginBottom: 1 } }, bloom.title),
                React.createElement('p', { style: { fontFamily: 'Poppins, sans-serif', fontSize: 12, color: t.textMuted } }, `by ${bloom.user}`)
              ),
              React.createElement('div', { style: { background: t.cardBg2, borderRadius: 10, padding: '5px 10px', display: 'flex', alignItems: 'center', gap: 5 } },
                React.createElement(Icon, { name: 'Layers', size: 12, color: t.textMuted }),
                React.createElement('span', { style: { fontFamily: 'Poppins, sans-serif', fontSize: 11, color: t.textMuted, fontWeight: 600 } }, `${bloom.seeds} seeds`)
              )
            ),
            // Waveform
            React.createElement('div', { style: { margin: '0 16px 14px', background: isDark ? '#0F0F23' : '#F0F4FF', borderRadius: 14, padding: '12px 10px', display: 'flex', alignItems: 'center', gap: 2, overflow: 'hidden', height: 58 } },
              bloomWaveBase[bi % bloomWaveBase.length].map((h, i) =>
                React.createElement('div', { key: i, style: { flex: 1, height: Math.min(h, 36), background: `linear-gradient(180deg, ${bloom.color}, ${bloom.color}44)`, borderRadius: 2, animation: `wave ${0.8 + (i % 5) * 0.15}s ease-in-out infinite`, animationDelay: `${i * 0.04}s` } })
              )
            ),
            // Actions
            React.createElement('div', { style: { padding: '0 16px 14px', display: 'flex', gap: 8 } },
              React.createElement('button', {
                style: { flex: 1, background: `linear-gradient(135deg, ${bloom.color}20, ${bloom.color}10)`, border: `1.5px solid ${bloom.color}40`, borderRadius: 14, padding: '10px', color: bloom.color, fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }
              },
                React.createElement(Icon, { name: 'Play', size: 15, color: bloom.color }),
                React.createElement('span', null, 'Listen')
              ),
              React.createElement('button', {
                onClick: () => setLikedBlooms(prev => prev.includes(bloom.id) ? prev.filter(id => id !== bloom.id) : [...prev, bloom.id]),
                style: { background: likedBlooms.includes(bloom.id) ? '#EC489920' : t.cardBg2, border: `1.5px solid ${likedBlooms.includes(bloom.id) ? '#EC4899' : t.border}`, borderRadius: 14, padding: '10px 16px', color: likedBlooms.includes(bloom.id) ? '#EC4899' : t.textMuted, fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, transition: 'all 0.2s' }
              },
                React.createElement(Icon, { name: 'Heart', size: 15, color: likedBlooms.includes(bloom.id) ? '#EC4899' : t.textMuted }),
                React.createElement('span', null, likedBlooms.includes(bloom.id) ? bloom.likes + 1 : bloom.likes)
              ),
              React.createElement('button', { style: { background: t.cardBg2, border: `1.5px solid ${t.border}`, borderRadius: 14, padding: '10px 14px', color: t.textMuted, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' } },
                React.createElement(Icon, { name: 'Share2', size: 15, color: t.textMuted })
              )
            )
          )
        )
      )
    );
  }

  // ── Screen map & root render
  const screens = { home: HomeScreen, explore: ExploreScreen, alchemy: AlchemyScreen, grove: GroveScreen };

  return React.createElement('div', {
    style: {
      minHeight: '100vh', background: '#f0f0f0', display: 'flex', alignItems: 'center',
      justifyContent: 'center', padding: '20px', fontFamily: 'Poppins, sans-serif',
    }
  },
    React.createElement('div', {
      style: {
        width: 375, height: 812, borderRadius: 52, overflow: 'hidden', position: 'relative',
        boxShadow: '0 40px 80px rgba(0,0,0,0.28), 0 0 0 1.5px rgba(200,200,220,0.6), inset 0 0 0 1px rgba(255,255,255,0.3)',
        background: t.bg,
      }
    },
      React.createElement(screens[activeScreen]),
      React.createElement(NavBar)
    )
  );
}
