const { useState, useEffect, useRef } = React;

const themes = {
  light: {
    bg: '#FAFAFA',
    surface: '#FFFFFF',
    surfaceAlt: '#F5F0EB',
    primary: '#FF6B6B',
    primaryDark: '#E05555',
    secondary: '#1A1A40',
    text: '#1A1A40',
    textMuted: '#6B6B8A',
    textLight: '#A0A0B8',
    border: '#1A1A40',
    cardShadow: '4px 4px 0px #1A1A40',
    cardShadowHeavy: '6px 6px 0px #1A1A40',
    accent: '#FFE66D',
    accentGreen: '#4ECDC4',
    navBg: '#FAFAFA',
    navBorder: '#1A1A40',
    inputBg: '#FFFFFF',
    tagBg: '#1A1A40',
    tagText: '#FAFAFA',
    liveDot: '#FF6B6B',
  },
  dark: {
    bg: '#0D0D20',
    surface: '#1A1A40',
    surfaceAlt: '#252550',
    primary: '#FF6B6B',
    primaryDark: '#E05555',
    secondary: '#FAFAFA',
    text: '#FAFAFA',
    textMuted: '#A0A0C8',
    textLight: '#6B6B8A',
    border: '#FF6B6B',
    cardShadow: '4px 4px 0px #FF6B6B',
    cardShadowHeavy: '6px 6px 0px #FF6B6B',
    accent: '#FFE66D',
    accentGreen: '#4ECDC4',
    navBg: '#1A1A40',
    navBorder: '#FF6B6B',
    inputBg: '#252550',
    tagBg: '#FF6B6B',
    tagText: '#FAFAFA',
    liveDot: '#4ECDC4',
  }
};

function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [isDark, setIsDark] = useState(false);
  const [pressedBtn, setPressedBtn] = useState(null);
  const t = isDark ? themes.dark : themes.light;

  const fontStyle = `
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400;1,600&family=Space+Grotesk:wght@300;400;500;600&display=swap');
    * { box-sizing: border-box; }
    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: #FF6B6B; border-radius: 2px; }
    @keyframes pulse-dot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.6;transform:scale(1.4)} }
    @keyframes float { 0%,100%{transform:translateY(0px) rotate(-3deg)} 50%{transform:translateY(-6px) rotate(-3deg)} }
    @keyframes float2 { 0%,100%{transform:translateY(0px) rotate(2deg)} 50%{transform:translateY(-8px) rotate(2deg)} }
    @keyframes spin-slow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
    @keyframes progress-fill { from{width:0%} to{width:var(--target-width)} }
    @keyframes fade-in { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
    @keyframes shimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
  `;

  const handlePress = (id) => {
    setPressedBtn(id);
    setTimeout(() => setPressedBtn(null), 150);
  };

  const btnStyle = (id, base) => ({
    ...base,
    transform: pressedBtn === id ? 'translate(2px, 2px)' : 'translate(0,0)',
    boxShadow: pressedBtn === id ? '2px 2px 0px ' + t.border : t.cardShadow,
    transition: 'transform 0.1s, box-shadow 0.1s',
    cursor: 'pointer',
  });

  const screens = {
    home: HomeScreen,
    flux: FluxScreen,
    guilds: GuildsScreen,
    gallery: GalleryScreen,
    muse: MuseScreen,
  };

  const ScreenComp = screens[activeScreen];

  const navItems = [
    { id: 'home', label: 'Home', icon: 'Home' },
    { id: 'flux', label: 'Flux', icon: 'Zap' },
    { id: 'guilds', label: 'Guilds', icon: 'Users' },
    { id: 'gallery', label: 'Gallery', icon: 'Image' },
    { id: 'muse', label: 'Muse', icon: 'Sparkles' },
  ];

  return React.createElement('div', {
    style: { minHeight: '100vh', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', fontFamily: "'Space Grotesk', sans-serif" }
  },
    React.createElement('style', null, fontStyle),
    React.createElement('div', {
      style: {
        width: '375px',
        height: '812px',
        background: t.bg,
        borderRadius: '40px',
        overflow: 'hidden',
        border: '3px solid ' + t.border,
        boxShadow: '12px 12px 0px #1A1A40',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        transition: 'background 0.3s',
      }
    },
      React.createElement('div', {
        style: { flex: 1, overflowY: 'auto', overflowX: 'hidden', position: 'relative' }
      },
        React.createElement(ScreenComp, { t, isDark, setIsDark, setActiveScreen, handlePress, btnStyle, pressedBtn })
      ),
      // Bottom Nav
      React.createElement('div', {
        style: {
          background: t.navBg,
          borderTop: '3px solid ' + t.navBorder,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          padding: '10px 8px 16px',
          flexShrink: 0,
          transition: 'background 0.3s',
        }
      },
        navItems.map(item => {
          const IconComp = window.lucide[item.icon];
          const isActive = activeScreen === item.id;
          return React.createElement('button', {
            key: item.id,
            onClick: () => setActiveScreen(item.id),
            style: {
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '2px',
              background: isActive ? t.primary : 'transparent',
              border: isActive ? '2px solid ' + t.border : '2px solid transparent',
              borderRadius: '12px',
              padding: '6px 12px',
              cursor: 'pointer',
              boxShadow: isActive ? '3px 3px 0px ' + t.border : 'none',
              transform: isActive ? 'translate(-1px, -1px)' : 'none',
              transition: 'all 0.15s',
            }
          },
            IconComp ? React.createElement(IconComp, { size: 18, color: isActive ? '#FAFAFA' : t.textMuted, strokeWidth: 2 }) : null,
            React.createElement('span', {
              style: {
                fontSize: '9px',
                fontWeight: '600',
                color: isActive ? '#FAFAFA' : t.textMuted,
                letterSpacing: '0.5px',
                textTransform: 'uppercase',
              }
            }, item.label)
          );
        })
      )
    )
  );
}

// ─── HOME SCREEN ──────────────────────────────────────────────────────────────
function HomeScreen({ t, isDark, setIsDark, setActiveScreen, handlePress, btnStyle }) {
  const [seedVisible, setSeedVisible] = useState(false);
  const [seedText, setSeedText] = useState('');

  const seeds = [
    '"A melody born from static and rain"',
    '"Fractured geometry meets organic growth"',
    '"The silence between two notes speaking"',
    '"Neon rust bleeding into morning fog"',
  ];

  useEffect(() => {
    const timer = setTimeout(() => setSeedVisible(true), 600);
    return () => clearTimeout(timer);
  }, []);

  const generateSeed = () => {
    setSeedText(seeds[Math.floor(Math.random() * seeds.length)]);
  };

  const MoonSunIcon = isDark ? window.lucide.Sun : window.lucide.Moon;
  const BellIcon = window.lucide.Bell;
  const ZapIcon = window.lucide.Zap;
  const ArrowRightIcon = window.lucide.ArrowRight;
  const SparklesIcon = window.lucide.Sparkles;
  const ClockIcon = window.lucide.Clock;

  return React.createElement('div', {
    style: { padding: '24px 20px', paddingBottom: '8px', animation: 'fade-in 0.4s ease-out' }
  },
    // Header
    React.createElement('div', {
      style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }
    },
      React.createElement('div', null,
        React.createElement('p', {
          style: { fontSize: '11px', fontWeight: '600', color: t.textMuted, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '4px' }
        }, 'Good evening, Lyra'),
        React.createElement('h1', {
          style: { fontFamily: "'Playfair Display', serif", fontSize: '28px', fontWeight: '900', color: t.text, lineHeight: '1.1', margin: 0 }
        }, 'Your Creative\nPortal Awaits')
      ),
      React.createElement('div', { style: { display: 'flex', gap: '8px', marginTop: '4px' } },
        React.createElement('button', {
          onClick: () => setIsDark(!isDark),
          style: {
            width: '38px', height: '38px', border: '2px solid ' + t.border,
            borderRadius: '10px', background: t.surface, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '3px 3px 0px ' + t.border,
          }
        },
          MoonSunIcon ? React.createElement(MoonSunIcon, { size: 16, color: t.text }) : null
        ),
        React.createElement('button', {
          style: {
            width: '38px', height: '38px', border: '2px solid ' + t.border,
            borderRadius: '10px', background: t.primary, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '3px 3px 0px ' + t.border, position: 'relative',
          }
        },
          BellIcon ? React.createElement(BellIcon, { size: 16, color: '#fff' }) : null,
          React.createElement('div', {
            style: {
              position: 'absolute', top: '6px', right: '6px', width: '8px', height: '8px',
              background: t.accent, borderRadius: '50%', border: '2px solid ' + t.surface,
              animation: 'pulse-dot 2s infinite',
            }
          })
        )
      )
    ),

    // Live Now Banner
    React.createElement('div', {
      onClick: () => setActiveScreen('flux'),
      style: {
        background: t.primary,
        border: '3px solid ' + t.border,
        borderRadius: '16px',
        padding: '16px',
        marginBottom: '20px',
        boxShadow: t.cardShadowHeavy,
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
      }
    },
      React.createElement('div', {
        style: {
          position: 'absolute', top: '-20px', right: '-20px',
          width: '100px', height: '100px',
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '50%',
        }
      }),
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
        React.createElement('div', null,
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' } },
            React.createElement('div', {
              style: {
                width: '8px', height: '8px', background: t.accent,
                borderRadius: '50%', animation: 'pulse-dot 1.5s infinite',
              }
            }),
            React.createElement('span', {
              style: { fontSize: '10px', fontWeight: '700', color: '#FAFAFA', letterSpacing: '2px', textTransform: 'uppercase' }
            }, 'Live Now')
          ),
          React.createElement('p', {
            style: { fontFamily: "'Playfair Display', serif", fontSize: '18px', fontWeight: '700', color: '#FAFAFA', margin: '0 0 4px', lineHeight: '1.2' }
          }, 'Sonic Textures #47'),
          React.createElement('p', { style: { fontSize: '12px', color: 'rgba(255,255,255,0.8)', margin: 0 } }, '234 creators weaving • 18 min left')
        ),
        React.createElement('div', {
          style: {
            width: '44px', height: '44px', background: '#FAFAFA',
            border: '2px solid ' + t.border, borderRadius: '12px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '3px 3px 0px ' + t.border,
          }
        },
          ArrowRightIcon ? React.createElement(ArrowRightIcon, { size: 20, color: t.primary, strokeWidth: 2.5 }) : null
        )
      )
    ),

    // Aether Muse Seed — Angled Overlapping Card
    React.createElement('div', { style: { position: 'relative', marginBottom: '24px', height: '130px' } },
      // Background card (angled)
      React.createElement('div', {
        style: {
          position: 'absolute',
          top: '8px', left: '4px',
          right: '0px',
          height: '110px',
          background: t.accent,
          border: '3px solid ' + t.border,
          borderRadius: '16px',
          transform: 'rotate(2deg)',
          zIndex: 1,
        }
      }),
      // Foreground card
      React.createElement('div', {
        style: {
          position: 'absolute',
          top: '0', left: '0', right: '8px',
          height: '110px',
          background: t.secondary,
          border: '3px solid ' + t.border,
          borderRadius: '16px',
          padding: '14px 16px',
          transform: 'rotate(-1deg)',
          zIndex: 2,
          boxShadow: '4px 4px 0px ' + t.border,
        }
      },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' } },
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' } },
              SparklesIcon ? React.createElement(SparklesIcon, { size: 14, color: t.primary, strokeWidth: 2 }) : null,
              React.createElement('span', {
                style: { fontSize: '10px', fontWeight: '700', color: t.primary, letterSpacing: '2px', textTransform: 'uppercase' }
              }, 'Aether Muse Seed')
            ),
            React.createElement('p', {
              style: {
                fontFamily: "'Playfair Display', serif",
                fontSize: '14px', fontStyle: 'italic',
                color: isDark ? '#FAFAFA' : '#FAFAFA',
                lineHeight: '1.4', margin: 0,
                opacity: seedVisible ? 1 : 0,
                transition: 'opacity 0.8s ease',
              }
            }, seedText || '"Crystalline structures dissolving at dusk"')
          ),
          React.createElement('button', {
            onClick: generateSeed,
            style: {
              background: t.primary, border: '2px solid ' + (isDark ? '#FF6B6B' : '#FAFAFA'),
              borderRadius: '8px', padding: '4px 8px',
              fontSize: '9px', fontWeight: '700',
              color: '#FAFAFA', cursor: 'pointer',
              letterSpacing: '1px', textTransform: 'uppercase',
              flexShrink: 0,
            }
          }, 'New')
        )
      )
    ),

    // Upcoming Sessions
    React.createElement('div', { style: { marginBottom: '20px' } },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' } },
        React.createElement('h2', {
          style: { fontFamily: "'Playfair Display', serif", fontSize: '18px', fontWeight: '700', color: t.text, margin: 0 }
        }, 'Next Flux Sessions'),
        React.createElement('button', {
          onClick: () => setActiveScreen('flux'),
          style: { fontSize: '11px', fontWeight: '600', color: t.primary, background: 'none', border: 'none', cursor: 'pointer', letterSpacing: '0.5px' }
        }, 'View all →')
      ),

      [
        { title: 'Visual Motif Storm', time: 'In 2 hours', guild: 'Surrealist Poets', count: 89, color: t.accentGreen },
        { title: 'Ambient Driftspace', time: 'Tomorrow 9PM', guild: 'Soundscapers', count: 156, color: '#FFB347' },
      ].map((session, i) =>
        React.createElement('div', {
          key: i,
          onClick: () => setActiveScreen('flux'),
          style: {
            background: t.surface,
            border: '2px solid ' + t.border,
            borderRadius: '14px',
            padding: '12px 14px',
            marginBottom: '8px',
            boxShadow: '3px 3px 0px ' + t.border,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }
        },
          React.createElement('div', {
            style: {
              width: '42px', height: '42px', flexShrink: 0,
              background: session.color,
              border: '2px solid ' + t.border,
              borderRadius: '10px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }
          },
            ZapIcon ? React.createElement(ZapIcon, { size: 18, color: '#1A1A40', strokeWidth: 2.5 }) : null
          ),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('p', { style: { fontSize: '13px', fontWeight: '700', color: t.text, margin: '0 0 2px' } }, session.title),
            React.createElement('p', { style: { fontSize: '11px', color: t.textMuted, margin: 0 } }, session.guild + ' • ' + session.count + ' joining')
          ),
          React.createElement('div', {
            style: {
              display: 'flex', alignItems: 'center', gap: '4px',
              background: t.surfaceAlt, border: '1.5px solid ' + t.border,
              borderRadius: '8px', padding: '4px 8px',
            }
          },
            ClockIcon ? React.createElement(ClockIcon, { size: 12, color: t.textMuted }) : null,
            React.createElement('span', { style: { fontSize: '10px', fontWeight: '600', color: t.textMuted } }, session.time)
          )
        )
      )
    ),

    // Stats Row
    React.createElement('div', { style: { display: 'flex', gap: '8px', marginBottom: '8px' } },
      [
        { label: 'Sessions', value: '47', unit: 'total' },
        { label: 'Creations', value: '312', unit: 'pieces' },
        { label: 'Streak', value: '14', unit: 'days' },
      ].map((stat, i) =>
        React.createElement('div', {
          key: i,
          style: {
            flex: 1, background: t.surface,
            border: '2px solid ' + t.border,
            borderRadius: '12px', padding: '10px 8px',
            textAlign: 'center',
            boxShadow: '2px 2px 0px ' + t.border,
          }
        },
          React.createElement('p', { style: { fontFamily: "'Playfair Display', serif", fontSize: '22px', fontWeight: '900', color: t.primary, margin: '0 0 2px' } }, stat.value),
          React.createElement('p', { style: { fontSize: '9px', fontWeight: '600', color: t.textMuted, margin: 0, textTransform: 'uppercase', letterSpacing: '1px' } }, stat.label)
        )
      )
    )
  );
}

// ─── FLUX SESSION SCREEN ──────────────────────────────────────────────────────
function FluxScreen({ t, setActiveScreen, handlePress, btnStyle }) {
  const [phase, setPhase] = useState('active'); // 'lobby', 'active', 'share'
  const [progress, setProgress] = useState(62);
  const [selectedSeed, setSelectedSeed] = useState(null);
  const [reactions, setReactions] = useState({ fire: 47, heart: 82, star: 31 });

  const ZapIcon = window.lucide.Zap;
  const SparklesIcon = window.lucide.Sparkles;
  const SendIcon = window.lucide.Send;
  const HeartIcon = window.lucide.Heart;
  const StarIcon = window.lucide.Star;
  const FlameIcon = window.lucide.Flame;
  const UsersIcon = window.lucide.Users;
  const TimerIcon = window.lucide.Timer;

  const seeds = [
    { id: 1, text: 'Corroded chrome surface catching violet light', tag: 'Visual' },
    { id: 2, text: 'A chord resolving into dust particles', tag: 'Sonic' },
    { id: 3, text: 'The blueprint of a forgotten machine', tag: 'Narrative' },
  ];

  const contributions = [
    { user: 'nova_rift', content: 'Static waves breaking on glass shores', time: '2m', guild: 'Soundscaper' },
    { user: 'px_bloom', content: 'Geometry that breathes between blinks', time: '4m', guild: 'Visualist' },
    { user: 'drift_echo', content: 'The sound of memory oxidizing', time: '6m', guild: 'Poet' },
  ];

  return React.createElement('div', {
    style: { display: 'flex', flexDirection: 'column', height: '100%' }
  },
    // Session Header
    React.createElement('div', {
      style: {
        background: t.secondary,
        padding: '20px 20px 16px',
        borderBottom: '3px solid ' + t.border,
        flexShrink: 0,
      }
    },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' } },
        React.createElement('div', null,
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' } },
            React.createElement('div', {
              style: { width: '8px', height: '8px', background: t.liveDot, borderRadius: '50%', animation: 'pulse-dot 1.5s infinite' }
            }),
            React.createElement('span', { style: { fontSize: '10px', fontWeight: '700', color: t.liveDot, letterSpacing: '2px', textTransform: 'uppercase' } }, 'Flux Session #47')
          ),
          React.createElement('h2', {
            style: { fontFamily: "'Playfair Display', serif", fontSize: '22px', fontWeight: '900', color: '#FAFAFA', margin: 0, lineHeight: '1.1' }
          }, 'Sonic Textures')
        ),
        React.createElement('div', {
          style: {
            background: t.primary, border: '2px solid #FF6B6B',
            borderRadius: '12px', padding: '8px 12px',
            textAlign: 'center',
            boxShadow: '3px 3px 0px rgba(255,255,255,0.2)',
          }
        },
          TimerIcon ? React.createElement(TimerIcon, { size: 16, color: '#FAFAFA', strokeWidth: 2 }) : null,
          React.createElement('p', { style: { fontSize: '16px', fontWeight: '900', color: '#FAFAFA', margin: '2px 0 0', fontFamily: "'Playfair Display', serif" } }, '18:32')
        )
      ),

      // Progress bar
      React.createElement('div', {
        style: {
          height: '8px', background: 'rgba(255,255,255,0.15)',
          borderRadius: '4px', border: '1.5px solid rgba(255,255,255,0.2)',
          overflow: 'hidden', marginBottom: '10px',
        }
      },
        React.createElement('div', {
          style: {
            height: '100%', width: progress + '%',
            background: t.primary, borderRadius: '4px',
            transition: 'width 1s ease',
          }
        })
      ),

      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '4px' } },
          UsersIcon ? React.createElement(UsersIcon, { size: 13, color: 'rgba(255,255,255,0.6)' }) : null,
          React.createElement('span', { style: { fontSize: '11px', color: 'rgba(255,255,255,0.6)', fontWeight: '500' } }, '234 active creators')
        ),
        React.createElement('span', { style: { fontSize: '11px', color: 'rgba(255,255,255,0.6)', fontWeight: '500' } }, '62% complete')
      )
    ),

    // Content Area
    React.createElement('div', { style: { flex: 1, overflowY: 'auto', padding: '16px 20px' } },

      // Prompt Card
      React.createElement('div', {
        style: {
          background: t.accent,
          border: '3px solid ' + t.border,
          borderRadius: '16px',
          padding: '16px',
          marginBottom: '16px',
          boxShadow: t.cardShadowHeavy,
          position: 'relative',
          overflow: 'hidden',
        }
      },
        React.createElement('div', {
          style: {
            position: 'absolute', top: '-15px', right: '-15px',
            width: '80px', height: '80px',
            background: 'rgba(26,26,64,0.08)',
            borderRadius: '50%',
          }
        }),
        React.createElement('p', { style: { fontSize: '10px', fontWeight: '700', color: '#1A1A40', letterSpacing: '2px', textTransform: 'uppercase', margin: '0 0 8px' } }, 'Session Prompt'),
        React.createElement('p', {
          style: { fontFamily: "'Playfair Display', serif", fontSize: '17px', fontWeight: '700', color: '#1A1A40', margin: 0, lineHeight: '1.4' }
        }, '"Create a sonic or visual piece that captures the feeling of data becoming memory — fleeting, layered, inevitable."')
      ),

      // Muse Seeds — Angled Overlapping Cards
      React.createElement('div', { style: { marginBottom: '16px' } },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' } },
          SparklesIcon ? React.createElement(SparklesIcon, { size: 14, color: t.primary }) : null,
          React.createElement('h3', { style: { fontSize: '13px', fontWeight: '700', color: t.text, margin: 0, letterSpacing: '1px', textTransform: 'uppercase' } }, 'Your Muse Seeds')
        ),

        // Overlapping angled seed cards
        React.createElement('div', { style: { position: 'relative', height: '160px' } },
          seeds.map((seed, i) => {
            const rotations = [-2, 1, -1];
            const offsets = [{ top: 0, left: 0, zIndex: 3 }, { top: 10, left: 8, zIndex: 2 }, { top: 20, left: 16, zIndex: 1 }];
            const isSelected = selectedSeed === seed.id;
            return React.createElement('div', {
              key: seed.id,
              onClick: () => setSelectedSeed(isSelected ? null : seed.id),
              style: {
                position: 'absolute',
                top: offsets[i].top + 'px',
                left: offsets[i].left + 'px',
                right: (16 - offsets[i].left) + 'px',
                background: isSelected ? t.primary : t.surface,
                border: '2.5px solid ' + t.border,
                borderRadius: '14px',
                padding: '12px 14px',
                transform: 'rotate(' + rotations[i] + 'deg)',
                zIndex: offsets[i].zIndex,
                boxShadow: isSelected ? '4px 4px 0px ' + t.border : '3px 3px 0px ' + t.border,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }
            },
              React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' } },
                React.createElement('p', {
                  style: {
                    fontFamily: "'Playfair Display', serif",
                    fontSize: '13px', fontStyle: 'italic',
                    color: isSelected ? '#FAFAFA' : t.text,
                    margin: 0, lineHeight: '1.4', flex: 1,
                  }
                }, seed.text),
                React.createElement('span', {
                  style: {
                    fontSize: '9px', fontWeight: '700',
                    background: isSelected ? 'rgba(255,255,255,0.2)' : t.tagBg,
                    color: isSelected ? '#FAFAFA' : t.tagText,
                    padding: '2px 8px', borderRadius: '6px',
                    marginLeft: '8px', flexShrink: 0,
                    border: isSelected ? '1px solid rgba(255,255,255,0.3)' : 'none',
                    letterSpacing: '0.5px',
                  }
                }, seed.tag)
              )
            );
          })
        )
      ),

      // Live Feed
      React.createElement('div', null,
        React.createElement('h3', { style: { fontSize: '13px', fontWeight: '700', color: t.text, margin: '0 0 10px', letterSpacing: '1px', textTransform: 'uppercase' } }, 'Live Weave Feed'),
        contributions.map((c, i) =>
          React.createElement('div', {
            key: i,
            style: {
              background: t.surface,
              border: '2px solid ' + t.border,
              borderRadius: '12px',
              padding: '10px 12px',
              marginBottom: '8px',
              boxShadow: '2px 2px 0px ' + t.border,
            }
          },
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' } },
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '6px' } },
                React.createElement('div', {
                  style: {
                    width: '24px', height: '24px',
                    background: ['#FF6B6B', '#4ECDC4', '#FFE66D'][i],
                    border: '2px solid ' + t.border,
                    borderRadius: '6px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '10px', fontWeight: '900', color: '#1A1A40',
                  }
                }, c.user[0].toUpperCase()),
                React.createElement('span', { style: { fontSize: '12px', fontWeight: '700', color: t.text } }, c.user),
                React.createElement('span', {
                  style: {
                    fontSize: '9px', fontWeight: '600',
                    background: t.surfaceAlt, color: t.textMuted,
                    padding: '1px 6px', borderRadius: '4px',
                    border: '1px solid ' + t.border,
                  }
                }, c.guild)
              ),
              React.createElement('span', { style: { fontSize: '10px', color: t.textLight } }, c.time + ' ago')
            ),
            React.createElement('p', {
              style: { fontFamily: "'Playfair Display', serif", fontSize: '13px', fontStyle: 'italic', color: t.textMuted, margin: 0, lineHeight: '1.4' }
            }, '"' + c.content + '"')
          )
        )
      )
    ),

    // Input Bar
    React.createElement('div', {
      style: {
        borderTop: '3px solid ' + t.border,
        padding: '12px 16px',
        background: t.surface,
        flexShrink: 0,
        display: 'flex', gap: '8px', alignItems: 'center',
      }
    },
      React.createElement('input', {
        placeholder: 'Share your creation...',
        style: {
          flex: 1, border: '2px solid ' + t.border,
          borderRadius: '12px', padding: '10px 14px',
          fontSize: '13px', fontFamily: "'Space Grotesk', sans-serif",
          background: t.inputBg, color: t.text,
          outline: 'none',
        }
      }),
      React.createElement('button', {
        style: {
          width: '42px', height: '42px',
          background: t.primary, border: '2px solid ' + t.border,
          borderRadius: '12px', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '3px 3px 0px ' + t.border,
          flexShrink: 0,
        }
      },
        SendIcon ? React.createElement(SendIcon, { size: 16, color: '#FAFAFA', strokeWidth: 2.5 }) : null
      )
    )
  );
}

// ─── GUILDS SCREEN ────────────────────────────────────────────────────────────
function GuildsScreen({ t, setActiveScreen }) {
  const [activeTab, setActiveTab] = useState('discover');
  const [joined, setJoined] = useState([0, 2]);

  const UsersIcon = window.lucide.Users;
  const ZapIcon = window.lucide.Zap;
  const CheckIcon = window.lucide.Check;
  const PlusIcon = window.lucide.Plus;
  const TrendingUpIcon = window.lucide.TrendingUp;

  const guilds = [
    { name: 'Synthwave Architects', desc: 'Retrofuturist sound design & visual synthesis', members: 1240, sessions: 89, active: true, color: '#FF6B6B', letter: 'S' },
    { name: 'Surrealist Poets', desc: 'Language as dreamscape and disruption', members: 876, sessions: 67, active: false, color: '#4ECDC4', letter: 'P' },
    { name: 'Ambient Soundscapers', desc: 'Texture, space, and sonic architecture', members: 2103, sessions: 134, active: true, color: '#FFE66D', letter: 'A' },
    { name: 'Glitch Visualists', desc: 'Digital artifacts and corrupted beauty', members: 654, sessions: 45, active: false, color: '#B8FF47', letter: 'G' },
    { name: 'Neo-Brutalist Makers', desc: 'Raw, confident, confrontational craft', members: 432, sessions: 28, active: false, color: '#FFB347', letter: 'N' },
  ];

  const myGuilds = guilds.filter((_, i) => joined.includes(i));

  const displayGuilds = activeTab === 'mine' ? myGuilds : guilds;

  return React.createElement('div', {
    style: { padding: '24px 20px', paddingBottom: '8px', animation: 'fade-in 0.4s ease-out' }
  },
    React.createElement('div', { style: { marginBottom: '20px' } },
      React.createElement('h1', {
        style: { fontFamily: "'Playfair Display', serif", fontSize: '28px', fontWeight: '900', color: t.text, margin: '0 0 4px' }
      }, 'Weave Guilds'),
      React.createElement('p', { style: { fontSize: '12px', color: t.textMuted, margin: 0 } }, 'Find your creative tribe')
    ),

    // Tabs
    React.createElement('div', {
      style: {
        display: 'flex', background: t.surface,
        border: '2px solid ' + t.border, borderRadius: '12px',
        padding: '4px', marginBottom: '20px',
        boxShadow: '3px 3px 0px ' + t.border,
      }
    },
      ['discover', 'mine'].map(tab =>
        React.createElement('button', {
          key: tab,
          onClick: () => setActiveTab(tab),
          style: {
            flex: 1, padding: '8px', borderRadius: '8px',
            border: activeTab === tab ? '2px solid ' + t.border : '2px solid transparent',
            background: activeTab === tab ? t.primary : 'transparent',
            color: activeTab === tab ? '#FAFAFA' : t.textMuted,
            fontSize: '12px', fontWeight: '700', cursor: 'pointer',
            textTransform: 'capitalize', letterSpacing: '0.5px',
            boxShadow: activeTab === tab ? '2px 2px 0px ' + t.border : 'none',
            transition: 'all 0.15s',
          }
        }, tab === 'discover' ? 'Discover' : 'My Guilds (' + myGuilds.length + ')')
      )
    ),

    // Trending banner
    activeTab === 'discover' && React.createElement('div', {
      style: {
        display: 'flex', alignItems: 'center', gap: '8px',
        background: t.accent, border: '2px solid ' + t.border,
        borderRadius: '10px', padding: '8px 12px',
        marginBottom: '14px',
        boxShadow: '2px 2px 0px ' + t.border,
      }
    },
      TrendingUpIcon ? React.createElement(TrendingUpIcon, { size: 14, color: '#1A1A40', strokeWidth: 2.5 }) : null,
      React.createElement('span', { style: { fontSize: '11px', fontWeight: '700', color: '#1A1A40' } }, 'Ambient Soundscapers is trending — 156 new members this week')
    ),

    // Guild List
    React.createElement('div', null,
      displayGuilds.map((guild, i) =>
        React.createElement('div', {
          key: i,
          style: {
            background: t.surface,
            border: '2.5px solid ' + t.border,
            borderRadius: '16px',
            padding: '14px',
            marginBottom: '10px',
            boxShadow: '3px 3px 0px ' + t.border,
            position: 'relative',
            overflow: 'hidden',
          }
        },
          // Accent stripe
          React.createElement('div', {
            style: {
              position: 'absolute', left: 0, top: 0, bottom: 0,
              width: '5px', background: guild.color,
              borderRadius: '14px 0 0 14px',
            }
          }),
          React.createElement('div', { style: { paddingLeft: '12px' } },
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' } },
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '8px' } },
                React.createElement('div', {
                  style: {
                    width: '36px', height: '36px',
                    background: guild.color, border: '2px solid ' + t.border,
                    borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '16px', fontWeight: '900', color: '#1A1A40',
                    fontFamily: "'Playfair Display', serif",
                  }
                }, guild.letter),
                React.createElement('div', null,
                  React.createElement('p', { style: { fontSize: '14px', fontWeight: '700', color: t.text, margin: '0 0 2px' } }, guild.name),
                  guild.active && React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '4px' } },
                    React.createElement('div', { style: { width: '6px', height: '6px', background: t.primary, borderRadius: '50%', animation: 'pulse-dot 2s infinite' } }),
                    React.createElement('span', { style: { fontSize: '9px', color: t.primary, fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase' } }, 'Session Live')
                  )
                )
              ),
              React.createElement('button', {
                onClick: () => {
                  const realIndex = guilds.indexOf(guild);
                  if (joined.includes(realIndex)) {
                    setJoined(joined.filter(j => j !== realIndex));
                  } else {
                    setJoined([...joined, realIndex]);
                  }
                },
                style: {
                  padding: '6px 12px',
                  background: joined.includes(guilds.indexOf(guild)) ? t.accentGreen : t.primary,
                  border: '2px solid ' + t.border,
                  borderRadius: '8px', cursor: 'pointer',
                  fontSize: '11px', fontWeight: '700', color: '#1A1A40',
                  boxShadow: '2px 2px 0px ' + t.border,
                  display: 'flex', alignItems: 'center', gap: '4px',
                  transition: 'all 0.15s',
                }
              },
                joined.includes(guilds.indexOf(guild))
                  ? React.createElement(React.Fragment, null, CheckIcon ? React.createElement(CheckIcon, { size: 11, color: '#1A1A40', strokeWidth: 3 }) : null, ' Joined')
                  : React.createElement(React.Fragment, null, PlusIcon ? React.createElement(PlusIcon, { size: 11, color: '#FAFAFA', strokeWidth: 3 }) : null, ' Join')
              )
            ),
            React.createElement('p', { style: { fontSize: '11px', color: t.textMuted, margin: '0 0 8px', lineHeight: '1.4' } }, guild.desc),
            React.createElement('div', { style: { display: 'flex', gap: '12px' } },
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '4px' } },
                UsersIcon ? React.createElement(UsersIcon, { size: 11, color: t.textLight }) : null,
                React.createElement('span', { style: { fontSize: '11px', color: t.textLight, fontWeight: '500' } }, guild.members.toLocaleString() + ' members')
              ),
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '4px' } },
                ZapIcon ? React.createElement(ZapIcon, { size: 11, color: t.textLight }) : null,
                React.createElement('span', { style: { fontSize: '11px', color: t.textLight, fontWeight: '500' } }, guild.sessions + ' sessions/mo')
              )
            )
          )
        )
      )
    )
  );
}

// ─── GALLERY SCREEN ───────────────────────────────────────────────────────────
function GalleryScreen({ t }) {
  const [activeTab, setActiveTab] = useState('gallery');
  const [liked, setLiked] = useState([]);

  const ImageIcon = window.lucide.Image;
  const HeartIcon = window.lucide.Heart;
  const SparklesIcon = window.lucide.Sparkles;
  const ShareIcon = window.lucide.Share2;
  const TrendingUpIcon = window.lucide.TrendingUp;

  const pieces = [
    { id: 1, title: 'Entropy at Dawn', session: 'Sonic Textures #31', guild: 'Soundscaper', likes: 89, color: '#FF6B6B', tag: 'Sonic', featured: true },
    { id: 2, title: 'Glass Memory', session: 'Visual Motif #18', guild: 'Visualist', likes: 134, color: '#4ECDC4', tag: 'Visual', featured: false },
    { id: 3, title: 'The Void Breathes', session: 'Narrative Sprint #9', guild: 'Poet', likes: 56, color: '#FFE66D', tag: 'Text', featured: false },
    { id: 4, title: 'Lattice Reverie', session: 'Sonic Textures #44', guild: 'Soundscaper', likes: 212, color: '#B8FF47', tag: 'Sonic', featured: true },
  ];

  const museHistory = [
    { date: 'Week 1', insight: 'Prefers harmonic dissonance over clean resolution', growth: 30 },
    { date: 'Week 4', insight: 'Strong visual-sonic synesthesia tendency emerging', growth: 58 },
    { date: 'Week 8', insight: 'Dark textural aesthetics with hopeful undertones', growth: 74 },
    { date: 'Week 12', insight: 'Fully calibrated to your creative fingerprint', growth: 92 },
  ];

  return React.createElement('div', {
    style: { padding: '24px 20px', paddingBottom: '8px', animation: 'fade-in 0.4s ease-out' }
  },
    React.createElement('h1', {
      style: { fontFamily: "'Playfair Display', serif", fontSize: '28px', fontWeight: '900', color: t.text, margin: '0 0 4px' }
    }, 'Echo Gallery'),
    React.createElement('p', { style: { fontSize: '12px', color: t.textMuted, margin: '0 0 20px' } }, 'Your creative archive & Muse evolution'),

    // Tabs
    React.createElement('div', {
      style: {
        display: 'flex', background: t.surface,
        border: '2px solid ' + t.border, borderRadius: '12px',
        padding: '4px', marginBottom: '20px',
        boxShadow: '3px 3px 0px ' + t.border,
      }
    },
      ['gallery', 'muse evolution'].map(tab =>
        React.createElement('button', {
          key: tab,
          onClick: () => setActiveTab(tab),
          style: {
            flex: 1, padding: '8px', borderRadius: '8px',
            border: activeTab === tab ? '2px solid ' + t.border : '2px solid transparent',
            background: activeTab === tab ? t.secondary : 'transparent',
            color: activeTab === tab ? '#FAFAFA' : t.textMuted,
            fontSize: '11px', fontWeight: '700', cursor: 'pointer',
            textTransform: 'capitalize', letterSpacing: '0.5px',
            boxShadow: activeTab === tab ? '2px 2px 0px ' + t.border : 'none',
            transition: 'all 0.15s',
          }
        }, tab === 'gallery' ? 'Gallery' : 'Muse Journey')
      )
    ),

    activeTab === 'gallery' && React.createElement('div', null,
      // Featured piece — angled overlapping cards
      React.createElement('div', { style: { position: 'relative', marginBottom: '32px', height: '170px' } },
        React.createElement('p', { style: { fontSize: '10px', fontWeight: '700', color: t.textMuted, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '10px' } }, 'Featured Work'),
        // Shadow card
        React.createElement('div', {
          style: {
            position: 'absolute', top: '22px', left: '6px', right: '0',
            height: '130px', background: t.accentGreen,
            border: '3px solid ' + t.border, borderRadius: '16px',
            transform: 'rotate(3deg)', zIndex: 1,
          }
        }),
        // Main featured card
        React.createElement('div', {
          style: {
            position: 'absolute', top: '16px', left: '0', right: '8px',
            height: '130px', background: pieces[3].color,
            border: '3px solid ' + t.border, borderRadius: '16px',
            padding: '16px', transform: 'rotate(-1.5deg)',
            zIndex: 2, boxShadow: '5px 5px 0px ' + t.border,
            overflow: 'hidden',
          }
        },
          React.createElement('div', {
            style: {
              position: 'absolute', top: '-20px', right: '-20px',
              width: '80px', height: '80px',
              background: 'rgba(26,26,64,0.1)', borderRadius: '50%',
            }
          }),
          React.createElement('span', {
            style: {
              display: 'inline-block', fontSize: '9px', fontWeight: '700',
              background: '#1A1A40', color: '#FAFAFA',
              padding: '2px 8px', borderRadius: '6px',
              letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px',
            }
          }, 'Most Liked'),
          React.createElement('h3', {
            style: { fontFamily: "'Playfair Display', serif", fontSize: '22px', fontWeight: '900', color: '#1A1A40', margin: '0 0 4px' }
          }, pieces[3].title),
          React.createElement('p', { style: { fontSize: '11px', color: 'rgba(26,26,64,0.7)', margin: '0 0 10px' } }, pieces[3].session),
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '6px' } },
            HeartIcon ? React.createElement(HeartIcon, { size: 14, color: '#1A1A40', fill: '#1A1A40' }) : null,
            React.createElement('span', { style: { fontSize: '13px', fontWeight: '700', color: '#1A1A40' } }, pieces[3].likes + ' likes')
          )
        )
      ),

      // Piece Grid
      pieces.slice(0, 3).map((piece, i) =>
        React.createElement('div', {
          key: piece.id,
          style: {
            background: t.surface, border: '2.5px solid ' + t.border,
            borderRadius: '14px', padding: '14px',
            marginBottom: '10px', boxShadow: '3px 3px 0px ' + t.border,
            display: 'flex', alignItems: 'center', gap: '12px',
          }
        },
          React.createElement('div', {
            style: {
              width: '56px', height: '56px', flexShrink: 0,
              background: piece.color, border: '2px solid ' + t.border,
              borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }
          },
            ImageIcon ? React.createElement(ImageIcon, { size: 22, color: '#1A1A40', strokeWidth: 2 }) : null
          ),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('p', { style: { fontSize: '14px', fontWeight: '700', color: t.text, margin: '0 0 2px' } }, piece.title),
            React.createElement('p', { style: { fontSize: '11px', color: t.textMuted, margin: '0 0 6px' } }, piece.session),
            React.createElement('span', {
              style: {
                fontSize: '9px', fontWeight: '700',
                background: t.tagBg, color: t.tagText,
                padding: '2px 8px', borderRadius: '6px',
                letterSpacing: '0.5px',
              }
            }, piece.tag)
          ),
          React.createElement('button', {
            onClick: () => setLiked(liked.includes(piece.id) ? liked.filter(l => l !== piece.id) : [...liked, piece.id]),
            style: {
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px',
              background: 'none', border: 'none', cursor: 'pointer', padding: '4px',
            }
          },
            HeartIcon ? React.createElement(HeartIcon, {
              size: 20, color: liked.includes(piece.id) ? t.primary : t.textLight,
              fill: liked.includes(piece.id) ? t.primary : 'none',
              strokeWidth: 2,
            }) : null,
            React.createElement('span', { style: { fontSize: '10px', fontWeight: '600', color: t.textLight } },
              piece.likes + (liked.includes(piece.id) ? 1 : 0)
            )
          )
        )
      )
    ),

    activeTab === 'muse evolution' && React.createElement('div', null,
      // Muse evolution header
      React.createElement('div', {
        style: {
          background: t.secondary, border: '3px solid ' + t.border,
          borderRadius: '16px', padding: '16px',
          marginBottom: '16px', boxShadow: t.cardShadowHeavy,
          textAlign: 'center',
        }
      },
        React.createElement('div', {
          style: {
            width: '56px', height: '56px', margin: '0 auto 10px',
            background: t.primary, border: '3px solid ' + (isDark ? '#FF6B6B' : '#FAFAFA'),
            borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
            animation: 'spin-slow 10s linear infinite',
          }
        },
          SparklesIcon ? React.createElement(SparklesIcon, { size: 24, color: '#FAFAFA', strokeWidth: 2 }) : null
        ),
        React.createElement('h3', {
          style: { fontFamily: "'Playfair Display', serif", fontSize: '20px', fontWeight: '900', color: '#FAFAFA', margin: '0 0 4px' }
        }, 'Aether Muse Level 12'),
        React.createElement('p', { style: { fontSize: '11px', color: 'rgba(255,255,255,0.6)', margin: '0 0 12px' } }, '92% style calibration achieved'),
        React.createElement('div', {
          style: {
            height: '8px', background: 'rgba(255,255,255,0.15)',
            borderRadius: '4px', overflow: 'hidden',
          }
        },
          React.createElement('div', {
            style: { height: '100%', width: '92%', background: t.primary, borderRadius: '4px' }
          })
        )
      ),

      museHistory.map((item, i) =>
        React.createElement('div', {
          key: i,
          style: {
            background: t.surface, border: '2px solid ' + t.border,
            borderRadius: '12px', padding: '12px 14px',
            marginBottom: '8px', boxShadow: '2px 2px 0px ' + t.border,
            display: 'flex', gap: '12px', alignItems: 'center',
          }
        },
          React.createElement('div', {
            style: {
              width: '40px', flexShrink: 0, textAlign: 'center',
            }
          },
            React.createElement('div', {
              style: {
                width: '36px', height: '36px',
                background: i === museHistory.length - 1 ? t.primary : t.surfaceAlt,
                border: '2px solid ' + t.border,
                borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto',
              }
            },
              React.createElement('span', {
                style: { fontSize: '11px', fontWeight: '900', color: i === museHistory.length - 1 ? '#FAFAFA' : t.textMuted }
              }, item.growth + '%')
            )
          ),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('p', { style: { fontSize: '10px', fontWeight: '700', color: t.primary, margin: '0 0 2px', letterSpacing: '1px', textTransform: 'uppercase' } }, item.date),
            React.createElement('p', { style: { fontFamily: "'Playfair Display', serif", fontSize: '13px', fontStyle: 'italic', color: t.text, margin: 0, lineHeight: '1.4' } }, '"' + item.insight + '"')
          )
        )
      )
    )
  );
}

// ─── MUSE SCREEN ──────────────────────────────────────────────────────────────
function MuseScreen({ t, setActiveScreen }) {
  const [intensity, setIntensity] = useState(3);
  const [toggles, setToggles] = useState({ sonic: true, visual: true, narrative: false, experimental: true });
  const [museLevel] = useState(12);

  const SparklesIcon = window.lucide.Sparkles;
  const BrainIcon = window.lucide.Brain;
  const SlidersIcon = window.lucide.Sliders;
  const RefreshCwIcon = window.lucide.RefreshCw;
  const ZapIcon = window.lucide.Zap;

  const toggle = (key) => setToggles({ ...toggles, [key]: !toggles[key] });

  const traits = [
    { label: 'Harmonic Dissonance', value: 78 },
    { label: 'Dark Textures', value: 91 },
    { label: 'Spatial Ambience', value: 65 },
    { label: 'Lyrical Density', value: 44 },
    { label: 'Experimental Edges', value: 83 },
  ];

  return React.createElement('div', {
    style: { padding: '24px 20px', paddingBottom: '8px', animation: 'fade-in 0.4s ease-out' }
  },
    // Header
    React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' } },
      React.createElement('div', null,
        React.createElement('h1', {
          style: { fontFamily: "'Playfair Display', serif", fontSize: '28px', fontWeight: '900', color: t.text, margin: '0 0 4px' }
        }, 'Aether Muse'),
        React.createElement('p', { style: { fontSize: '12px', color: t.textMuted, margin: 0 } }, 'Your personal creative intelligence')
      ),
      React.createElement('div', {
        style: {
          width: '52px', height: '52px',
          background: t.primary, border: '3px solid ' + t.border,
          borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: t.cardShadow, animation: 'spin-slow 12s linear infinite',
        }
      },
        SparklesIcon ? React.createElement(SparklesIcon, { size: 22, color: '#FAFAFA', strokeWidth: 2 }) : null
      )
    ),

    // Muse Status Card
    React.createElement('div', {
      style: {
        background: t.secondary, border: '3px solid ' + t.border,
        borderRadius: '16px', padding: '16px',
        marginBottom: '16px', boxShadow: t.cardShadowHeavy,
      }
    },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' } },
        React.createElement('div', null,
          React.createElement('p', { style: { fontSize: '10px', fontWeight: '700', color: 'rgba(255,255,255,0.5)', letterSpacing: '2px', textTransform: 'uppercase', margin: '0 0 2px' } }, 'Intelligence Level'),
          React.createElement('p', { style: { fontFamily: "'Playfair Display', serif", fontSize: '32px', fontWeight: '900', color: t.primary, margin: 0, lineHeight: '1' } }, museLevel),
        ),
        React.createElement('div', { style: { textAlign: 'right' } },
          React.createElement('p', { style: { fontSize: '10px', color: 'rgba(255,255,255,0.5)', margin: '0 0 2px', letterSpacing: '1px', textTransform: 'uppercase' } }, 'Style Match'),
          React.createElement('p', { style: { fontFamily: "'Playfair Display', serif", fontSize: '24px', fontWeight: '900', color: t.accentGreen, margin: 0 } }, '92%')
        )
      ),
      React.createElement('div', { style: { height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden', marginBottom: '8px' } },
        React.createElement('div', { style: { height: '100%', width: '72%', background: t.primary, borderRadius: '3px' } })
      ),
      React.createElement('p', { style: { fontSize: '11px', color: 'rgba(255,255,255,0.5)', margin: 0 } }, '1,240 XP to Level 13 • 312 pieces analyzed')
    ),

    // Creative Traits
    React.createElement('div', {
      style: {
        background: t.surface, border: '2.5px solid ' + t.border,
        borderRadius: '16px', padding: '16px',
        marginBottom: '14px', boxShadow: '3px 3px 0px ' + t.border,
      }
    },
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '14px' } },
        BrainIcon ? React.createElement(BrainIcon, { size: 14, color: t.primary, strokeWidth: 2 }) : null,
        React.createElement('h3', { style: { fontSize: '12px', fontWeight: '700', color: t.text, margin: 0, letterSpacing: '1px', textTransform: 'uppercase' } }, 'Your Creative DNA')
      ),
      traits.map((trait, i) =>
        React.createElement('div', { key: i, style: { marginBottom: '10px' } },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: '4px' } },
            React.createElement('span', { style: { fontSize: '12px', fontWeight: '600', color: t.text } }, trait.label),
            React.createElement('span', { style: { fontSize: '11px', fontWeight: '700', color: t.primary } }, trait.value + '%')
          ),
          React.createElement('div', { style: { height: '6px', background: t.surfaceAlt, borderRadius: '3px', border: '1px solid ' + t.border, overflow: 'hidden' } },
            React.createElement('div', {
              style: {
                height: '100%', width: trait.value + '%',
                background: i % 2 === 0 ? t.primary : t.accentGreen,
                borderRadius: '3px', transition: 'width 1s ease',
              }
            })
          )
        )
      )
    ),

    // Seed Preferences
    React.createElement('div', {
      style: {
        background: t.surface, border: '2.5px solid ' + t.border,
        borderRadius: '16px', padding: '16px',
        marginBottom: '14px', boxShadow: '3px 3px 0px ' + t.border,
      }
    },
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '14px' } },
        SlidersIcon ? React.createElement(SlidersIcon, { size: 14, color: t.primary, strokeWidth: 2 }) : null,
        React.createElement('h3', { style: { fontSize: '12px', fontWeight: '700', color: t.text, margin: 0, letterSpacing: '1px', textTransform: 'uppercase' } }, 'Seed Type Preferences')
      ),
      Object.entries(toggles).map(([key, val]) =>
        React.createElement('div', {
          key,
          style: {
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '8px 0', borderBottom: '1.5px dashed ' + t.border,
          }
        },
          React.createElement('span', { style: { fontSize: '13px', fontWeight: '600', color: t.text, textTransform: 'capitalize' } }, key + ' seeds'),
          React.createElement('div', {
            onClick: () => toggle(key),
            style: {
              width: '44px', height: '24px',
              background: val ? t.primary : t.surfaceAlt,
              border: '2px solid ' + t.border,
              borderRadius: '12px', cursor: 'pointer',
              position: 'relative', transition: 'background 0.2s',
              boxShadow: '2px 2px 0px ' + t.border,
            }
          },
            React.createElement('div', {
              style: {
                position: 'absolute', top: '2px',
                left: val ? '20px' : '2px',
                width: '16px', height: '16px',
                background: '#FAFAFA', border: '2px solid ' + t.border,
                borderRadius: '50%', transition: 'left 0.2s',
              }
            })
          )
        )
      ),

      // Seed Intensity
      React.createElement('div', { style: { marginTop: '12px' } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: '8px' } },
          React.createElement('span', { style: { fontSize: '13px', fontWeight: '600', color: t.text } }, 'Seed Intensity'),
          React.createElement('span', { style: { fontSize: '12px', fontWeight: '700', color: t.primary } }, ['Whisper', 'Subtle', 'Balanced', 'Bold', 'Overwhelming'][intensity - 1])
        ),
        React.createElement('div', { style: { display: 'flex', gap: '6px' } },
          [1, 2, 3, 4, 5].map(n =>
            React.createElement('button', {
              key: n,
              onClick: () => setIntensity(n),
              style: {
                flex: 1, height: '32px',
                background: n <= intensity ? t.primary : t.surfaceAlt,
                border: '2px solid ' + t.border, borderRadius: '8px',
                cursor: 'pointer',
                boxShadow: n <= intensity ? '2px 2px 0px ' + t.border : 'none',
                transition: 'all 0.15s',
              }
            })
          )
        )
      )
    ),

    // Retrain Button
    React.createElement('button', {
      style: {
        width: '100%', padding: '14px',
        background: t.secondary, border: '3px solid ' + t.border,
        borderRadius: '14px', cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
        boxShadow: t.cardShadowHeavy,
        marginBottom: '8px',
        transition: 'transform 0.1s, box-shadow 0.1s',
      }
    },
      RefreshCwIcon ? React.createElement(RefreshCwIcon, { size: 16, color: t.primary, strokeWidth: 2.5 }) : null,
      React.createElement('span', {
        style: { fontFamily: "'Playfair Display', serif", fontSize: '16px', fontWeight: '700', color: '#FAFAFA' }
      }, 'Deep Retrain Muse')
    )
  );
}
