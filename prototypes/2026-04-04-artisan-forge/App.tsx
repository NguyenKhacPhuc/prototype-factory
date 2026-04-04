const { useState, useEffect, useRef } = React;

const themes = {
  light: {
    bg: '#F5F0E8',
    bgAlt: '#EDE8DC',
    surface: '#FFFFFF',
    surfaceAlt: '#FAF7F2',
    border: '#1a1a1a',
    text: '#1a1a1a',
    textMuted: '#5a5248',
    textLight: '#8a8278',
    primary: '#B84A2E',
    primaryLight: '#D4614A',
    accent: '#0047FF',
    accentLight: '#2962FF',
    success: '#2D6A4F',
    warning: '#D4A017',
    navBg: '#1a1a1a',
    navText: '#F5F0E8',
    navActive: '#B84A2E',
    tag: '#1a1a1a',
    tagText: '#F5F0E8',
  },
  dark: {
    bg: '#141210',
    bgAlt: '#1E1B18',
    surface: '#252220',
    surfaceAlt: '#2E2B28',
    border: '#F5F0E8',
    text: '#F5F0E8',
    textMuted: '#B8B0A5',
    textLight: '#7a7268',
    primary: '#D4614A',
    primaryLight: '#E07060',
    accent: '#4477FF',
    accentLight: '#5588FF',
    success: '#4CAF77',
    warning: '#F0B429',
    navBg: '#0D0B09',
    navText: '#F5F0E8',
    navActive: '#D4614A',
    tag: '#F5F0E8',
    tagText: '#1a1a1a',
  }
};

const fontStyle = `
  @import url('https://fonts.googleapis.com/css2?family=Archivo+Black&family=Archivo:wght@400;500;600;700&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  ::-webkit-scrollbar { width: 0; background: transparent; }
`;

const challenges = [
  {
    id: 'c1',
    title: 'Retro-Futuristic Vending Machine',
    guild: 'Pixel Art Foundry',
    guildIcon: '⚙️',
    stake: 50,
    participants: 34,
    deadline: '3d 14h',
    category: 'Visual Art',
    difficulty: 'MEDIUM',
    joined: false,
    hot: true,
    color: '#B84A2E',
  },
  {
    id: 'c2',
    title: 'Hidden Forest Glade Soundscape',
    guild: 'Sonic Smiths',
    guildIcon: '🎵',
    stake: 75,
    participants: 18,
    deadline: '1d 6h',
    category: 'Audio',
    difficulty: 'HARD',
    joined: true,
    hot: false,
    color: '#0047FF',
  },
  {
    id: 'c3',
    title: 'Write a Villain\'s Grocery List',
    guild: 'Poetry Anvil',
    guildIcon: '✍️',
    stake: 25,
    participants: 67,
    deadline: '5d 2h',
    category: 'Writing',
    difficulty: 'EASY',
    joined: false,
    hot: true,
    color: '#2D6A4F',
  },
  {
    id: 'c4',
    title: 'Brand Identity: Underground Bakery',
    guild: 'Design Crucible',
    guildIcon: '🔨',
    stake: 100,
    participants: 12,
    deadline: '2d 9h',
    category: 'Branding',
    difficulty: 'HARD',
    joined: false,
    hot: false,
    color: '#7B3F8C',
  },
  {
    id: 'c5',
    title: '60-Second Typeface Study',
    guild: 'Typography Forge',
    guildIcon: 'T',
    stake: 40,
    participants: 29,
    deadline: '4d 18h',
    category: 'Typography',
    difficulty: 'MEDIUM',
    joined: false,
    hot: false,
    color: '#D4A017',
  },
];

const guilds = [
  { id: 'g1', name: 'Pixel Art Foundry', members: 2840, active: 7, icon: '⚙️', joined: true },
  { id: 'g2', name: 'Poetry Anvil', members: 1620, active: 12, icon: '✍️', joined: true },
  { id: 'g3', name: 'Design Crucible', members: 3100, active: 5, icon: '🔨', joined: false },
  { id: 'g4', name: 'Sonic Smiths', members: 980, active: 4, icon: '🎵', joined: false },
  { id: 'g5', name: 'Typography Forge', members: 1450, active: 8, icon: 'T', joined: false },
  { id: 'g6', name: 'Motion Molten', members: 2100, active: 3, icon: '▶', joined: false },
];

const prompts = [
  { id: 'p1', text: 'Illustrate the inside of a cloud, if it were a living organism', tag: 'DAILY FORGE', stake: 30 },
  { id: 'p2', text: 'Write a letter from a retired superhero to their replacement', tag: 'TRENDING', stake: 45 },
  { id: 'p3', text: 'Design a wayfinding system for an underwater library', tag: 'AI PICK', stake: 60 },
];

const badges = [
  { name: 'First Stake', icon: '⚡', earned: true, desc: 'Completed your first challenge' },
  { name: 'Iron Will', icon: '🔩', earned: true, desc: '5 challenges in a row' },
  { name: 'Guild Master', icon: '🔨', earned: true, desc: 'Led a guild challenge' },
  { name: 'The Forge', icon: '🔥', earned: false, desc: '30 day streak — keep going' },
  { name: 'Grand Artisan', icon: '⭐', earned: false, desc: 'Complete 50 challenges' },
  { name: 'Critic\'s Eye', icon: '👁', earned: false, desc: 'Review 20 submissions' },
];

function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [theme, setTheme] = useState('light');
  const [stakeModal, setStakeModal] = useState(null);
  const [joined, setJoined] = useState({ c2: true });
  const [credits, setCredits] = useState(320);
  const [pressedBtn, setPressedBtn] = useState(null);
  const t = themes[theme];

  const handlePress = (id) => {
    setPressedBtn(id);
    setTimeout(() => setPressedBtn(null), 150);
  };

  const joinChallenge = (challenge) => {
    if (joined[challenge.id]) return;
    setStakeModal(challenge);
  };

  const confirmStake = () => {
    if (!stakeModal) return;
    setJoined(prev => ({ ...prev, [stakeModal.id]: true }));
    setCredits(prev => prev - stakeModal.stake);
    setStakeModal(null);
  };

  const screens = {
    home: HomeScreen,
    explore: ExploreScreen,
    forge: ForgeScreen,
    profile: ProfileScreen,
  };

  const ActiveScreen = screens[activeScreen];

  const navItems = [
    { id: 'home', label: 'Home', icon: 'House' },
    { id: 'explore', label: 'Explore', icon: 'Compass' },
    { id: 'forge', label: 'Forge', icon: 'Flame' },
    { id: 'profile', label: 'Ledger', icon: 'BookOpen' },
  ];

  const sharedProps = { t, theme, setTheme, activeScreen, setActiveScreen, joined, joinChallenge, stakeModal, setStakeModal, confirmStake, credits, setCredits, handlePress, pressedBtn };

  return (
    React.createElement('div', {
      style: {
        minHeight: '100vh',
        background: '#f0f0f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: '"Archivo", sans-serif',
        padding: '20px',
      }
    },
      React.createElement('style', null, fontStyle),

      // Phone frame
      React.createElement('div', {
        style: {
          width: 375,
          height: 812,
          background: t.bg,
          borderRadius: 40,
          border: `3px solid ${t.border}`,
          boxShadow: `8px 8px 0px ${t.border}`,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
        }
      },

        // Main content
        React.createElement('div', {
          style: {
            flex: 1,
            overflowY: 'auto',
            overflowX: 'hidden',
          }
        },
          React.createElement(ActiveScreen, sharedProps)
        ),

        // Bottom Navigation
        React.createElement('div', {
          style: {
            background: t.navBg,
            borderTop: `3px solid ${t.border}`,
            display: 'flex',
            alignItems: 'stretch',
            height: 68,
            flexShrink: 0,
          }
        },
          navItems.map((item, i) => {
            const Icon = window.lucide[item.icon];
            const isActive = activeScreen === item.id;
            return React.createElement('button', {
              key: item.id,
              onClick: () => setActiveScreen(item.id),
              style: {
                flex: 1,
                background: isActive ? t.navActive : 'transparent',
                border: 'none',
                borderRight: i < navItems.length - 1 ? `2px solid rgba(245,240,232,0.15)` : 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                gap: 3,
                padding: '8px 0',
                transition: 'background 0.15s',
              }
            },
              Icon && React.createElement(Icon, { size: 20, color: isActive ? '#FFFFFF' : 'rgba(245,240,232,0.5)', strokeWidth: isActive ? 2.5 : 1.5 }),
              React.createElement('span', {
                style: {
                  fontSize: 10,
                  fontFamily: '"Archivo Black", sans-serif',
                  color: isActive ? '#FFFFFF' : 'rgba(245,240,232,0.5)',
                  letterSpacing: 0.5,
                  textTransform: 'uppercase',
                }
              }, item.label)
            );
          })
        ),

        // Stake Modal
        stakeModal && React.createElement('div', {
          style: {
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(20,18,16,0.85)',
            display: 'flex', alignItems: 'flex-end',
            zIndex: 100,
          },
          onClick: () => setStakeModal(null),
        },
          React.createElement('div', {
            style: {
              background: t.bg,
              width: '100%',
              borderTop: `4px solid ${t.primary}`,
              padding: 24,
              paddingBottom: 36,
            },
            onClick: e => e.stopPropagation(),
          },
            React.createElement('div', {
              style: {
                display: 'inline-block',
                background: t.primary,
                color: '#fff',
                fontFamily: '"Archivo Black", sans-serif',
                fontSize: 10,
                letterSpacing: 2,
                padding: '4px 10px',
                marginBottom: 12,
              }
            }, 'STAKE YOUR CRAFT'),
            React.createElement('p', {
              style: {
                fontFamily: '"Archivo Black", sans-serif',
                fontSize: 20,
                color: t.text,
                marginBottom: 8,
                lineHeight: 1.2,
              }
            }, stakeModal.title),
            React.createElement('p', {
              style: { fontSize: 13, color: t.textMuted, marginBottom: 24 }
            }, `Join ${stakeModal.participants} creators. Stake ${stakeModal.stake} credits. Miss the deadline — lose your stake.`),
            React.createElement('div', {
              style: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: t.bgAlt,
                border: `2px solid ${t.border}`,
                padding: '12px 16px',
                marginBottom: 20,
              }
            },
              React.createElement('span', { style: { fontSize: 13, color: t.textMuted } }, 'Your balance'),
              React.createElement('span', { style: { fontFamily: '"Archivo Black", sans-serif', fontSize: 18, color: t.text } }, `${credits} CR`),
            ),
            React.createElement('div', {
              style: {
                display: 'flex', gap: 12,
              }
            },
              React.createElement('button', {
                onClick: () => setStakeModal(null),
                style: {
                  flex: 1,
                  padding: '14px',
                  border: `2px solid ${t.border}`,
                  background: 'transparent',
                  color: t.text,
                  fontFamily: '"Archivo Black", sans-serif',
                  fontSize: 13,
                  cursor: 'pointer',
                  letterSpacing: 1,
                }
              }, 'CANCEL'),
              React.createElement('button', {
                onClick: confirmStake,
                style: {
                  flex: 2,
                  padding: '14px',
                  border: `2px solid ${t.border}`,
                  background: t.primary,
                  color: '#FFFFFF',
                  fontFamily: '"Archivo Black", sans-serif',
                  fontSize: 13,
                  cursor: 'pointer',
                  letterSpacing: 1,
                  boxShadow: `3px 3px 0 ${t.border}`,
                }
              }, `STAKE ${stakeModal.stake} CR & JOIN`)
            )
          )
        )
      )
    )
  );
}

// ==================== HOME SCREEN ====================
function HomeScreen({ t, theme, setTheme, setActiveScreen, joined, joinChallenge, credits, handlePress, pressedBtn }) {
  const BellIcon = window.lucide.Bell;
  const SunIcon = window.lucide.Sun;
  const MoonIcon = window.lucide.Moon;
  const ZapIcon = window.lucide.Zap;
  const ClockIcon = window.lucide.Clock;
  const UsersIcon = window.lucide.Users;
  const ChevronRightIcon = window.lucide.ChevronRight;
  const TrendingUpIcon = window.lucide.TrendingUp;
  const ShieldIcon = window.lucide.Shield;

  const [filter, setFilter] = useState('ALL');
  const filters = ['ALL', 'VISUAL', 'WRITING', 'AUDIO', 'DESIGN'];

  return (
    React.createElement('div', { style: { background: t.bg, minHeight: '100%' } },

      // Header
      React.createElement('div', {
        style: {
          background: t.navBg,
          padding: '20px 20px 16px',
          borderBottom: `3px solid ${t.border}`,
        }
      },
        React.createElement('div', {
          style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }
        },
          React.createElement('div', null,
            React.createElement('p', {
              style: { fontSize: 11, color: 'rgba(245,240,232,0.5)', letterSpacing: 2, fontFamily: '"Archivo Black", sans-serif', marginBottom: 2 }
            }, 'ARTISAN FORGE'),
            React.createElement('h1', {
              style: { fontFamily: '"Archivo Black", sans-serif', fontSize: 26, color: '#F5F0E8', lineHeight: 1.1 }
            }, 'The Forge\nIs Hot.')
          ),
          React.createElement('div', { style: { display: 'flex', gap: 10, alignItems: 'center' } },
            React.createElement('button', {
              onClick: () => setTheme(theme === 'light' ? 'dark' : 'light'),
              style: {
                background: 'rgba(245,240,232,0.1)',
                border: '1.5px solid rgba(245,240,232,0.2)',
                width: 36,
                height: 36,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                borderRadius: 4,
              }
            },
              theme === 'light'
                ? React.createElement(MoonIcon, { size: 16, color: '#F5F0E8' })
                : React.createElement(SunIcon, { size: 16, color: '#F5F0E8' })
            ),
            React.createElement('button', {
              style: {
                background: 'rgba(245,240,232,0.1)',
                border: '1.5px solid rgba(245,240,232,0.2)',
                width: 36, height: 36,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', borderRadius: 4,
                position: 'relative',
              }
            },
              React.createElement(BellIcon, { size: 16, color: '#F5F0E8' }),
              React.createElement('div', {
                style: {
                  position: 'absolute', top: 6, right: 6,
                  width: 7, height: 7,
                  background: '#B84A2E',
                  borderRadius: '50%',
                  border: '1.5px solid #1a1a1a',
                }
              })
            )
          )
        ),
        // Credits strip
        React.createElement('div', {
          style: {
            display: 'flex',
            gap: 12,
          }
        },
          React.createElement('div', {
            style: {
              flex: 1,
              background: 'rgba(245,240,232,0.08)',
              border: '1.5px solid rgba(245,240,232,0.15)',
              padding: '10px 12px',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }
          },
            React.createElement(ZapIcon, { size: 14, color: '#D4A017' }),
            React.createElement('div', null,
              React.createElement('p', { style: { fontSize: 9, color: 'rgba(245,240,232,0.5)', letterSpacing: 1.5 } }, 'CREDITS'),
              React.createElement('p', { style: { fontFamily: '"Archivo Black", sans-serif', fontSize: 18, color: '#F5F0E8' } }, `${credits}`)
            )
          ),
          React.createElement('div', {
            style: {
              flex: 1,
              background: 'rgba(184,74,46,0.2)',
              border: '1.5px solid #B84A2E',
              padding: '10px 12px',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }
          },
            React.createElement(ShieldIcon, { size: 14, color: '#B84A2E' }),
            React.createElement('div', null,
              React.createElement('p', { style: { fontSize: 9, color: 'rgba(245,240,232,0.5)', letterSpacing: 1.5 } }, 'STAKED'),
              React.createElement('p', { style: { fontFamily: '"Archivo Black", sans-serif', fontSize: 18, color: '#B84A2E' } }, '75 CR')
            )
          )
        )
      ),

      // Filters
      React.createElement('div', {
        style: {
          display: 'flex',
          gap: 0,
          overflowX: 'auto',
          padding: '0',
          borderBottom: `2px solid ${t.border}`,
        }
      },
        filters.map(f =>
          React.createElement('button', {
            key: f,
            onClick: () => setFilter(f),
            style: {
              padding: '10px 16px',
              background: filter === f ? t.primary : 'transparent',
              border: 'none',
              borderRight: `1.5px solid ${t.border}`,
              color: filter === f ? '#FFFFFF' : t.textMuted,
              fontFamily: '"Archivo Black", sans-serif',
              fontSize: 10,
              letterSpacing: 1.5,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }
          }, f)
        )
      ),

      // Challenges
      React.createElement('div', { style: { padding: '16px 16px 100px' } },

        // Section label
        React.createElement('div', {
          style: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 12,
          }
        },
          React.createElement('p', {
            style: { fontFamily: '"Archivo Black", sans-serif', fontSize: 11, color: t.textMuted, letterSpacing: 2 }
          }, 'LIVE CHALLENGES'),
          React.createElement('div', {
            style: { display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }
          },
            React.createElement('span', { style: { fontSize: 11, color: t.accent, fontFamily: '"Archivo Black", sans-serif' } }, 'SEE ALL'),
            React.createElement(ChevronRightIcon, { size: 12, color: t.accent })
          )
        ),

        challenges.map((ch, i) => {
          const isJoined = joined[ch.id];
          const isOdd = i % 2 !== 0;

          return React.createElement('div', {
            key: ch.id,
            style: {
              background: t.surface,
              border: `2.5px solid ${t.border}`,
              marginBottom: 12,
              boxShadow: `4px 4px 0 ${t.border}`,
              // Asymmetric twist: alternate indent
              marginLeft: isOdd ? 12 : 0,
              marginRight: isOdd ? 0 : 12,
            }
          },
            // Top color bar
            React.createElement('div', {
              style: { height: 5, background: ch.color }
            }),
            React.createElement('div', { style: { padding: '12px 14px' } },
              // Guild + tags row
              React.createElement('div', {
                style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }
              },
                React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6 } },
                  React.createElement('span', { style: { fontSize: 14 } }, ch.guildIcon),
                  React.createElement('span', { style: { fontSize: 11, color: t.textMuted, fontFamily: '"Archivo Black", sans-serif' } }, ch.guild)
                ),
                React.createElement('div', { style: { display: 'flex', gap: 5 } },
                  ch.hot && React.createElement('span', {
                    style: {
                      background: '#B84A2E',
                      color: '#fff',
                      fontSize: 8,
                      padding: '2px 6px',
                      fontFamily: '"Archivo Black", sans-serif',
                      letterSpacing: 1,
                    }
                  }, '🔥 HOT'),
                  React.createElement('span', {
                    style: {
                      background: ch.difficulty === 'HARD' ? t.primary : ch.difficulty === 'EASY' ? t.success : t.warning,
                      color: '#fff',
                      fontSize: 8,
                      padding: '2px 6px',
                      fontFamily: '"Archivo Black", sans-serif',
                      letterSpacing: 1,
                    }
                  }, ch.difficulty)
                )
              ),

              React.createElement('h3', {
                style: {
                  fontFamily: '"Archivo Black", sans-serif',
                  fontSize: 16,
                  color: t.text,
                  lineHeight: 1.2,
                  marginBottom: 12,
                }
              }, ch.title),

              // Stats row
              React.createElement('div', {
                style: { display: 'flex', gap: 16, marginBottom: 12 }
              },
                React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
                  React.createElement(UsersIcon, { size: 12, color: t.textLight }),
                  React.createElement('span', { style: { fontSize: 11, color: t.textMuted } }, `${ch.participants} creators`)
                ),
                React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
                  React.createElement(ClockIcon, { size: 12, color: t.textLight }),
                  React.createElement('span', { style: { fontSize: 11, color: t.textMuted } }, ch.deadline)
                ),
              ),

              // Stake + Join row
              React.createElement('div', {
                style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' }
              },
                React.createElement('div', {
                  style: {
                    background: t.bgAlt,
                    border: `1.5px solid ${t.border}`,
                    padding: '6px 10px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 5,
                  }
                },
                  React.createElement(ZapIcon, { size: 12, color: '#D4A017' }),
                  React.createElement('span', {
                    style: { fontFamily: '"Archivo Black", sans-serif', fontSize: 14, color: t.text }
                  }, `${ch.stake} CR`),
                  React.createElement('span', { style: { fontSize: 10, color: t.textMuted } }, 'stake')
                ),
                React.createElement('button', {
                  onClick: () => joinChallenge(ch),
                  style: {
                    background: isJoined ? t.success : t.primary,
                    color: '#FFFFFF',
                    border: `2px solid ${t.border}`,
                    padding: '8px 16px',
                    fontFamily: '"Archivo Black", sans-serif',
                    fontSize: 11,
                    letterSpacing: 1.5,
                    cursor: 'pointer',
                    boxShadow: `2px 2px 0 ${t.border}`,
                    transform: pressedBtn === ch.id ? 'translate(2px, 2px)' : 'none',
                    transition: 'all 0.1s',
                  },
                  onMouseDown: () => handlePress(ch.id),
                }, isJoined ? '✓ JOINED' : 'STAKE & JOIN')
              )
            )
          );
        })
      )
    )
  );
}

// ==================== EXPLORE SCREEN ====================
function ExploreScreen({ t, theme, setTheme, setActiveScreen, joined, joinChallenge }) {
  const SearchIcon = window.lucide.Search;
  const TrendingUpIcon = window.lucide.TrendingUp;
  const UsersIcon = window.lucide.Users;
  const ZapIcon = window.lucide.Zap;
  const SparklesIcon = window.lucide.Sparkles;
  const ChevronRightIcon = window.lucide.ChevronRight;
  const SunIcon = window.lucide.Sun;
  const MoonIcon = window.lucide.Moon;
  const [query, setQuery] = useState('');
  const [joinedGuilds, setJoinedGuilds] = useState({ g1: true, g2: true });

  return (
    React.createElement('div', { style: { background: t.bg, minHeight: '100%', paddingBottom: 100 } },

      // Header
      React.createElement('div', {
        style: {
          padding: '20px 16px 0',
          borderBottom: `2px solid ${t.border}`,
        }
      },
        React.createElement('div', {
          style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }
        },
          React.createElement('h2', {
            style: { fontFamily: '"Archivo Black", sans-serif', fontSize: 24, color: t.text }
          }, 'EXPLORE'),
          React.createElement('button', {
            onClick: () => setTheme(theme === 'light' ? 'dark' : 'light'),
            style: {
              background: 'transparent', border: `1.5px solid ${t.border}`,
              width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
            }
          },
            theme === 'light' ? React.createElement(MoonIcon, { size: 14, color: t.text }) : React.createElement(SunIcon, { size: 14, color: t.text })
          )
        ),
        React.createElement('div', {
          style: {
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            background: t.surface,
            border: `2px solid ${t.border}`,
            padding: '10px 12px',
            marginBottom: 16,
          }
        },
          React.createElement(SearchIcon, { size: 16, color: t.textMuted }),
          React.createElement('input', {
            value: query,
            onChange: e => setQuery(e.target.value),
            placeholder: 'Search challenges, guilds...',
            style: {
              background: 'transparent',
              border: 'none',
              outline: 'none',
              fontSize: 13,
              color: t.text,
              flex: 1,
              fontFamily: '"Archivo", sans-serif',
            }
          })
        )
      ),

      // AI Prompts Section
      React.createElement('div', { style: { padding: '16px 16px 0' } },
        React.createElement('div', {
          style: {
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            marginBottom: 12,
          }
        },
          React.createElement('div', {
            style: {
              background: t.accent,
              padding: '2px 8px',
              display: 'flex',
              alignItems: 'center',
              gap: 5,
            }
          },
            React.createElement(SparklesIcon, { size: 10, color: '#fff' }),
            React.createElement('span', {
              style: { fontFamily: '"Archivo Black", sans-serif', fontSize: 9, color: '#fff', letterSpacing: 1.5 }
            }, 'AI PROMPT FORGE')
          ),
          React.createElement('span', { style: { fontSize: 10, color: t.textMuted } }, 'Fresh for you today')
        ),
        prompts.map(p =>
          React.createElement('div', {
            key: p.id,
            style: {
              background: t.surface,
              border: `2px solid ${t.border}`,
              padding: '14px',
              marginBottom: 10,
              boxShadow: `3px 3px 0 ${t.accent}`,
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden',
            }
          },
            React.createElement('div', {
              style: {
                position: 'absolute',
                top: 0,
                right: 0,
                background: p.tag === 'AI PICK' ? t.accent : p.tag === 'TRENDING' ? t.primary : t.success,
                padding: '3px 8px',
              }
            },
              React.createElement('span', {
                style: { fontFamily: '"Archivo Black", sans-serif', fontSize: 8, color: '#fff', letterSpacing: 1 }
              }, p.tag)
            ),
            React.createElement('p', {
              style: {
                fontFamily: '"Archivo Black", sans-serif',
                fontSize: 14,
                color: t.text,
                lineHeight: 1.35,
                marginBottom: 10,
                marginRight: 60,
              }
            }, p.text),
            React.createElement('div', {
              style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' }
            },
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
                React.createElement(ZapIcon, { size: 11, color: '#D4A017' }),
                React.createElement('span', { style: { fontSize: 11, color: t.textMuted } }, `${p.stake} CR stake`)
              ),
              React.createElement('span', {
                style: {
                  fontSize: 10,
                  color: t.accent,
                  fontFamily: '"Archivo Black", sans-serif',
                  letterSpacing: 1,
                }
              }, 'START CHALLENGE →')
            )
          )
        )
      ),

      // Guilds
      React.createElement('div', { style: { padding: '16px' } },
        React.createElement('div', {
          style: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 12,
          }
        },
          React.createElement('h3', {
            style: { fontFamily: '"Archivo Black", sans-serif', fontSize: 13, color: t.text, letterSpacing: 1 }
          }, 'GUILDS'),
          React.createElement('span', { style: { fontSize: 10, color: t.accent, fontFamily: '"Archivo Black", sans-serif' } }, 'SEE ALL →')
        ),
        React.createElement('div', {
          style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }
        },
          guilds.map(g =>
            React.createElement('div', {
              key: g.id,
              style: {
                background: joinedGuilds[g.id] ? t.primary : t.surface,
                border: `2px solid ${t.border}`,
                padding: '14px 12px',
                cursor: 'pointer',
                boxShadow: `3px 3px 0 ${t.border}`,
                position: 'relative',
              },
              onClick: () => setJoinedGuilds(prev => ({ ...prev, [g.id]: !prev[g.id] }))
            },
              joinedGuilds[g.id] && React.createElement('div', {
                style: {
                  position: 'absolute',
                  top: 8, right: 8,
                  width: 8, height: 8,
                  background: '#4CAF77',
                  borderRadius: '50%',
                }
              }),
              React.createElement('div', {
                style: {
                  fontSize: 22,
                  marginBottom: 6,
                  fontFamily: g.icon === 'T' ? '"Archivo Black", sans-serif' : 'inherit',
                  color: joinedGuilds[g.id] ? '#fff' : t.text,
                }
              }, g.icon),
              React.createElement('p', {
                style: {
                  fontFamily: '"Archivo Black", sans-serif',
                  fontSize: 11,
                  color: joinedGuilds[g.id] ? '#fff' : t.text,
                  lineHeight: 1.2,
                  marginBottom: 6,
                }
              }, g.name),
              React.createElement('div', { style: { display: 'flex', gap: 8 } },
                React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 3 } },
                  React.createElement(UsersIcon, { size: 9, color: joinedGuilds[g.id] ? 'rgba(255,255,255,0.7)' : t.textLight }),
                  React.createElement('span', { style: { fontSize: 9, color: joinedGuilds[g.id] ? 'rgba(255,255,255,0.7)' : t.textMuted } }, `${(g.members/1000).toFixed(1)}k`)
                ),
                React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 3 } },
                  React.createElement(ZapIcon, { size: 9, color: joinedGuilds[g.id] ? 'rgba(255,255,255,0.7)' : t.textLight }),
                  React.createElement('span', { style: { fontSize: 9, color: joinedGuilds[g.id] ? 'rgba(255,255,255,0.7)' : t.textMuted } }, `${g.active} live`)
                )
              )
            )
          )
        )
      )
    )
  );
}

// ==================== FORGE SCREEN ====================
function ForgeScreen({ t, theme, setTheme }) {
  const ZapIcon = window.lucide.Zap;
  const ImageIcon = window.lucide.Image;
  const MusicIcon = window.lucide.Music;
  const TypeIcon = window.lucide.Type;
  const PaletteIcon = window.lucide.Palette;
  const SunIcon = window.lucide.Sun;
  const MoonIcon = window.lucide.Moon;
  const StarIcon = window.lucide.Star;
  const HeartIcon = window.lucide.Heart;

  const [activeTab, setActiveTab] = useState('trending');
  const [liked, setLiked] = useState({});

  const galleries = [
    {
      id: 'gal1',
      title: 'Retro Space Diner',
      author: 'axiom.px',
      guild: 'Pixel Art Foundry',
      challenge: 'Retro-Futuristic Spaces',
      likes: 284,
      color: '#B84A2E',
      accentColor: '#0047FF',
      emoji: '🚀',
    },
    {
      id: 'gal2',
      title: 'The Weight of Forgotten Maps',
      author: 'marlowe.writes',
      guild: 'Poetry Anvil',
      challenge: 'Objects That Remember',
      likes: 142,
      color: '#2D6A4F',
      accentColor: '#D4A017',
      emoji: '📜',
    },
    {
      id: 'gal3',
      title: 'Phantom Market Brand',
      author: 'voidstudio',
      guild: 'Design Crucible',
      challenge: 'Underground Brands',
      likes: 391,
      color: '#7B3F8C',
      accentColor: '#B84A2E',
      emoji: '👁',
    },
  ];

  return (
    React.createElement('div', { style: { background: t.bg, minHeight: '100%', paddingBottom: 100 } },

      // Header block — full-bleed asymmetric
      React.createElement('div', {
        style: {
          background: t.primary,
          padding: '20px 16px 0',
          position: 'relative',
          overflow: 'hidden',
          borderBottom: `3px solid ${t.border}`,
        }
      },
        // Decorative lines
        React.createElement('div', {
          style: {
            position: 'absolute',
            top: 10, right: -20,
            width: 120, height: 120,
            border: '2px solid rgba(255,255,255,0.15)',
            transform: 'rotate(15deg)',
          }
        }),
        React.createElement('div', {
          style: {
            position: 'absolute',
            top: -10, right: 20,
            width: 80, height: 80,
            border: '2px solid rgba(255,255,255,0.1)',
            transform: 'rotate(30deg)',
          }
        }),
        React.createElement('div', {
          style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16, position: 'relative' }
        },
          React.createElement('div', null,
            React.createElement('p', {
              style: { fontSize: 10, color: 'rgba(255,255,255,0.7)', letterSpacing: 2, fontFamily: '"Archivo Black", sans-serif', marginBottom: 4 }
            }, 'SHOWCASE GALLERY'),
            React.createElement('h2', {
              style: { fontFamily: '"Archivo Black", sans-serif', fontSize: 26, color: '#FFFFFF', lineHeight: 1.1 }
            }, 'What the\nForge Made.')
          ),
          React.createElement('button', {
            onClick: () => setTheme(theme === 'light' ? 'dark' : 'light'),
            style: {
              background: 'rgba(255,255,255,0.15)', border: '1.5px solid rgba(255,255,255,0.3)',
              width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
            }
          },
            theme === 'light' ? React.createElement(MoonIcon, { size: 14, color: '#fff' }) : React.createElement(SunIcon, { size: 14, color: '#fff' })
          )
        ),

        // Tabs
        React.createElement('div', {
          style: { display: 'flex', gap: 0, marginBottom: -1 }
        },
          ['trending', 'fresh', 'top-rated'].map(tab =>
            React.createElement('button', {
              key: tab,
              onClick: () => setActiveTab(tab),
              style: {
                padding: '10px 14px',
                background: activeTab === tab ? t.bg : 'transparent',
                border: `1.5px solid ${t.border}`,
                borderBottom: activeTab === tab ? `1.5px solid ${t.bg}` : `1.5px solid ${t.border}`,
                borderRight: 'none',
                color: activeTab === tab ? t.text : 'rgba(255,255,255,0.7)',
                fontFamily: '"Archivo Black", sans-serif',
                fontSize: 10,
                letterSpacing: 1.5,
                cursor: 'pointer',
                textTransform: 'uppercase',
              }
            }, tab.replace('-', ' '))
          )
        )
      ),

      // Gallery items — full-bleed cards with asymmetric offset
      React.createElement('div', { style: { padding: '16px 16px 20px' } },
        galleries.map((g, i) =>
          React.createElement('div', {
            key: g.id,
            style: {
              background: t.surface,
              border: `2.5px solid ${t.border}`,
              marginBottom: 14,
              boxShadow: `5px 5px 0 ${t.border}`,
              overflow: 'hidden',
              marginLeft: i === 1 ? 20 : 0,
              marginRight: i === 1 ? 0 : 0,
            }
          },
            // Big artwork placeholder
            React.createElement('div', {
              style: {
                height: 160,
                background: `linear-gradient(135deg, ${g.color} 0%, ${g.accentColor} 100%)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                borderBottom: `2px solid ${t.border}`,
              }
            },
              React.createElement('span', { style: { fontSize: 60 } }, g.emoji),
              React.createElement('div', {
                style: {
                  position: 'absolute',
                  bottom: 10, left: 10,
                  background: 'rgba(20,18,16,0.7)',
                  padding: '4px 10px',
                }
              },
                React.createElement('span', {
                  style: { fontFamily: '"Archivo Black", sans-serif', fontSize: 9, color: '#fff', letterSpacing: 1 }
                }, g.challenge.toUpperCase())
              )
            ),
            React.createElement('div', { style: { padding: '12px 14px' } },
              React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 } },
                React.createElement('div', null,
                  React.createElement('h3', {
                    style: { fontFamily: '"Archivo Black", sans-serif', fontSize: 16, color: t.text, marginBottom: 2 }
                  }, g.title),
                  React.createElement('p', { style: { fontSize: 11, color: t.textMuted } }, `by ${g.author} · ${g.guild}`)
                ),
                React.createElement('button', {
                  onClick: () => setLiked(prev => ({ ...prev, [g.id]: !prev[g.id] })),
                  style: {
                    background: liked[g.id] ? t.primary : 'transparent',
                    border: `1.5px solid ${liked[g.id] ? t.primary : t.border}`,
                    width: 36, height: 36,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer',
                    flexShrink: 0,
                  }
                },
                  React.createElement(HeartIcon, {
                    size: 14,
                    color: liked[g.id] ? '#fff' : t.textMuted,
                    fill: liked[g.id] ? '#fff' : 'none',
                  }),
                )
              ),
              React.createElement('div', {
                style: { display: 'flex', alignItems: 'center', gap: 4, marginTop: 6 }
              },
                React.createElement(StarIcon, { size: 11, color: '#D4A017', fill: '#D4A017' }),
                React.createElement('span', { style: { fontSize: 11, color: t.textMuted } }, `${g.likes + (liked[g.id] ? 1 : 0)} likes`)
              )
            )
          )
        )
      )
    )
  );
}

// ==================== PROFILE / LEDGER SCREEN ====================
function ProfileScreen({ t, theme, setTheme, credits }) {
  const TrendingUpIcon = window.lucide.TrendingUp;
  const ZapIcon = window.lucide.Zap;
  const AwardIcon = window.lucide.Award;
  const SunIcon = window.lucide.Sun;
  const MoonIcon = window.lucide.Moon;
  const ShieldIcon = window.lucide.Shield;
  const TargetIcon = window.lucide.Target;
  const CheckIcon = window.lucide.Check;

  const stats = [
    { label: 'COMPLETED', value: '23', icon: 'Check', color: '#2D6A4F' },
    { label: 'SUCCESS RATE', value: '79%', icon: 'TrendingUp', color: '#0047FF' },
    { label: 'CREDITS WON', value: '840', icon: 'Zap', color: '#D4A017' },
    { label: 'STREAK', value: '7d', icon: 'Shield', color: '#B84A2E' },
  ];

  const history = [
    { title: 'Retro Space Poster', guild: 'Pixel Art Foundry', result: 'WIN', earned: '+65', date: '2d ago' },
    { title: 'Haiku for Rain', guild: 'Poetry Anvil', result: 'WIN', earned: '+30', date: '5d ago' },
    { title: 'Midnight Brand Kit', guild: 'Design Crucible', result: 'LOSS', earned: '-100', date: '8d ago' },
    { title: 'Ambient Forest Loop', guild: 'Sonic Smiths', result: 'WIN', earned: '+90', date: '11d ago' },
  ];

  return (
    React.createElement('div', { style: { background: t.bg, minHeight: '100%', paddingBottom: 100 } },

      // Header — dark bg with profile info
      React.createElement('div', {
        style: {
          background: t.navBg,
          padding: '20px 16px 20px',
          borderBottom: `3px solid ${t.border}`,
          position: 'relative',
          overflow: 'hidden',
        }
      },
        // Background texture lines
        [0,1,2,3].map(i =>
          React.createElement('div', {
            key: i,
            style: {
              position: 'absolute',
              top: 0, bottom: 0,
              left: `${20 + i * 25}%`,
              width: 1,
              background: 'rgba(245,240,232,0.05)',
            }
          })
        ),
        React.createElement('div', {
          style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16, position: 'relative' }
        },
          React.createElement('div', { style: { display: 'flex', gap: 12, alignItems: 'flex-start' } },
            React.createElement('div', {
              style: {
                width: 52, height: 52,
                background: t.primary,
                border: '2px solid rgba(245,240,232,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: '"Archivo Black", sans-serif',
                fontSize: 20,
                color: '#fff',
                flexShrink: 0,
              }
            }, 'MR'),
            React.createElement('div', null,
              React.createElement('h2', {
                style: { fontFamily: '"Archivo Black", sans-serif', fontSize: 18, color: '#F5F0E8', marginBottom: 2 }
              }, 'm.rawlins'),
              React.createElement('p', { style: { fontSize: 11, color: 'rgba(245,240,232,0.55)', marginBottom: 6 } }, 'Joined Pixel Art Foundry · Poetry Anvil'),
              React.createElement('div', {
                style: {
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 5,
                  background: '#B84A2E',
                  padding: '3px 10px',
                }
              },
                React.createElement('span', { style: { fontSize: 9, color: '#fff', fontFamily: '"Archivo Black", sans-serif', letterSpacing: 1 } }, '⚔ IRON ARTISAN')
              )
            )
          ),
          React.createElement('button', {
            onClick: () => setTheme(theme === 'light' ? 'dark' : 'light'),
            style: {
              background: 'rgba(245,240,232,0.1)', border: '1.5px solid rgba(245,240,232,0.2)',
              width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
            }
          },
            theme === 'light' ? React.createElement(MoonIcon, { size: 14, color: '#F5F0E8' }) : React.createElement(SunIcon, { size: 14, color: '#F5F0E8' })
          )
        ),

        // Credits balance
        React.createElement('div', {
          style: {
            background: 'rgba(245,240,232,0.06)',
            border: '1.5px solid rgba(245,240,232,0.15)',
            padding: '10px 14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'relative',
          }
        },
          React.createElement('div', null,
            React.createElement('p', { style: { fontSize: 10, color: 'rgba(245,240,232,0.45)', letterSpacing: 2, fontFamily: '"Archivo Black", sans-serif' } }, 'CREATOR BALANCE'),
            React.createElement('p', { style: { fontFamily: '"Archivo Black", sans-serif', fontSize: 28, color: '#F5F0E8', lineHeight: 1.1 } }, `${credits} CR`)
          ),
          React.createElement('div', {
            style: {
              background: t.accent,
              padding: '8px 14px',
              cursor: 'pointer',
            }
          },
            React.createElement('span', {
              style: { fontFamily: '"Archivo Black", sans-serif', fontSize: 10, color: '#fff', letterSpacing: 1 }
            }, 'TOP UP')
          )
        )
      ),

      // Stats grid — asymmetric 2x2
      React.createElement('div', {
        style: {
          padding: '16px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 10,
        }
      },
        stats.map((s, i) =>
          React.createElement('div', {
            key: s.label,
            style: {
              background: t.surface,
              border: `2px solid ${t.border}`,
              padding: '14px 12px',
              boxShadow: `3px 3px 0 ${t.border}`,
              // Asymmetric: first and last shifted
              marginTop: (i === 0 || i === 3) ? 0 : 8,
            }
          },
            React.createElement('div', {
              style: {
                width: 8, height: 8,
                background: s.color,
                marginBottom: 8,
              }
            }),
            React.createElement('p', {
              style: { fontFamily: '"Archivo Black", sans-serif', fontSize: 24, color: t.text, marginBottom: 2 }
            }, s.value),
            React.createElement('p', {
              style: { fontSize: 9, color: t.textMuted, letterSpacing: 1.5, fontFamily: '"Archivo Black", sans-serif' }
            }, s.label)
          )
        )
      ),

      // Badges
      React.createElement('div', { style: { padding: '0 16px 16px' } },
        React.createElement('p', {
          style: { fontFamily: '"Archivo Black", sans-serif', fontSize: 11, color: t.textMuted, letterSpacing: 2, marginBottom: 12 }
        }, 'BADGES & HONORS'),
        React.createElement('div', {
          style: { display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 4 }
        },
          badges.map(b =>
            React.createElement('div', {
              key: b.name,
              style: {
                flexShrink: 0,
                width: 80,
                background: b.earned ? t.primary : t.surface,
                border: `2px solid ${b.earned ? t.primary : t.border}`,
                padding: '12px 8px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 4,
                opacity: b.earned ? 1 : 0.5,
              }
            },
              React.createElement('span', { style: { fontSize: 22 } }, b.icon),
              React.createElement('p', {
                style: {
                  fontFamily: '"Archivo Black", sans-serif',
                  fontSize: 9,
                  color: b.earned ? '#fff' : t.textMuted,
                  textAlign: 'center',
                  lineHeight: 1.2,
                  letterSpacing: 0.5,
                }
              }, b.name)
            )
          )
        )
      ),

      // Challenge history
      React.createElement('div', { style: { padding: '0 16px' } },
        React.createElement('p', {
          style: { fontFamily: '"Archivo Black", sans-serif', fontSize: 11, color: t.textMuted, letterSpacing: 2, marginBottom: 12 }
        }, 'CHALLENGE HISTORY'),
        history.map((h, i) =>
          React.createElement('div', {
            key: i,
            style: {
              background: t.surface,
              border: `1.5px solid ${t.border}`,
              borderLeft: `4px solid ${h.result === 'WIN' ? '#2D6A4F' : '#B84A2E'}`,
              padding: '10px 12px',
              marginBottom: 8,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }
          },
            React.createElement('div', null,
              React.createElement('p', {
                style: { fontFamily: '"Archivo Black", sans-serif', fontSize: 13, color: t.text, marginBottom: 2 }
              }, h.title),
              React.createElement('p', { style: { fontSize: 10, color: t.textMuted } }, `${h.guild} · ${h.date}`)
            ),
            React.createElement('div', { style: { textAlign: 'right' } },
              React.createElement('span', {
                style: {
                  fontFamily: '"Archivo Black", sans-serif',
                  fontSize: 15,
                  color: h.result === 'WIN' ? '#2D6A4F' : '#B84A2E',
                }
              }, h.earned),
              React.createElement('p', {
                style: {
                  fontSize: 8,
                  color: h.result === 'WIN' ? '#2D6A4F' : '#B84A2E',
                  letterSpacing: 1.5,
                  fontFamily: '"Archivo Black", sans-serif',
                }
              }, h.result)
            )
          )
        )
      )
    )
  );
}
