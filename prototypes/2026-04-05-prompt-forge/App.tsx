const { useState, useEffect, useRef } = React;

const themes = {
  dark: {
    bg: '#1a0a14',
    surface: '#2d1225',
    surfaceAlt: '#3d1a35',
    card: '#2a1020',
    border: '#5c2048',
    primary: '#EC4899',
    secondary: '#F472B6',
    cta: '#06B6D4',
    text: '#fdf2f8',
    textMuted: '#c084ac',
    textDim: '#9b5f8a',
    navBg: '#1a0a14',
    shimmer: 'rgba(236,72,153,0.08)',
  },
  light: {
    bg: '#FDF2F8',
    surface: '#fff0f6',
    surfaceAlt: '#fce7f3',
    card: '#ffffff',
    border: '#f9a8d4',
    primary: '#EC4899',
    secondary: '#F472B6',
    cta: '#06B6D4',
    text: '#1a0a14',
    textMuted: '#9b5f8a',
    textDim: '#c084ac',
    navBg: '#ffffff',
    shimmer: 'rgba(236,72,153,0.05)',
  },
};

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Nunito:wght@400;500;600;700&display=swap');

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(16px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes slideUp {
    from { opacity: 0; transform: translateY(40px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.06); }
  }

  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }

  @keyframes sparkle {
    0%, 100% { opacity: 1; transform: scale(1) rotate(0deg); }
    33% { opacity: 0.7; transform: scale(1.2) rotate(10deg); }
    66% { opacity: 0.9; transform: scale(0.9) rotate(-5deg); }
  }

  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-6px); }
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }
  ::-webkit-scrollbar { display: none; }

  .screen-enter { animation: fadeIn 0.3s ease forwards; }
  .card-hover { transition: all 0.2s ease; }
  .card-hover:hover { transform: translateY(-2px); }
  .btn-press:active { transform: scale(0.96); }
  .tab-item { transition: all 0.2s ease; }
`;

const challenges = [
  {
    id: 1,
    title: 'Limited Palette: Urban Decay',
    creator: 'Maya Chen',
    creatorAvatar: 'MC',
    category: 'Art',
    price: 4.99,
    participants: 847,
    deadline: '6 days',
    prize: 127.50,
    level: 'Intermediate',
    color: '#EC4899',
    tags: ['painting', 'urban', 'constraint'],
    description: 'Create a painting using only 3 colors. Capture the beauty in urban decay.',
    completions: 234,
  },
  {
    id: 2,
    title: "Six-Word Story: Dog's Perspective",
    creator: 'James Wright',
    creatorAvatar: 'JW',
    category: 'Writing',
    price: 2.99,
    participants: 1204,
    deadline: '3 days',
    prize: 89.70,
    level: 'Beginner',
    color: '#06B6D4',
    tags: ['micro-fiction', 'animals', 'perspective'],
    description: 'Tell a complete story in exactly six words, narrated by a dog.',
    completions: 567,
  },
  {
    id: 3,
    title: '60-Second Ambient Loop',
    creator: 'Sofia Reyes',
    creatorAvatar: 'SR',
    category: 'Music',
    price: 6.99,
    participants: 412,
    deadline: '9 days',
    prize: 210.30,
    level: 'Advanced',
    color: '#8B5CF6',
    tags: ['ambient', 'loop', 'sound design'],
    description: 'Compose a perfect 60-second ambient loop using only found sounds.',
    completions: 89,
  },
  {
    id: 4,
    title: 'Golden Hour Portrait',
    creator: 'Alex Kim',
    creatorAvatar: 'AK',
    category: 'Photography',
    price: 3.99,
    participants: 2103,
    deadline: '2 days',
    prize: 315.00,
    level: 'Beginner',
    color: '#F59E0B',
    tags: ['portrait', 'light', 'golden hour'],
    description: 'Capture a portrait during golden hour that tells a story without words.',
    completions: 891,
  },
];

const activeProjects = [
  { id: 1, title: 'Limited Palette: Urban Decay', progress: 65, deadline: '6 days', category: 'Art', color: '#EC4899', milestones: ['Sketch', 'Base Colors', 'Details', 'Final'], currentMilestone: 2 },
  { id: 2, title: "Six-Word Story: Dog's Perspective", progress: 30, deadline: '3 days', category: 'Writing', color: '#06B6D4', milestones: ['Draft', 'Refine', 'Polish', 'Submit'], currentMilestone: 1 },
];

const circleMembers = [
  { name: 'Maya Chen', avatar: 'MC', status: 'active', progress: 80 },
  { name: 'James Wright', avatar: 'JW', status: 'active', progress: 45 },
  { name: 'Sofia Reyes', avatar: 'SR', status: 'idle', progress: 20 },
  { name: 'Alex Kim', avatar: 'AK', status: 'active', progress: 60 },
];

function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [theme, setTheme] = useState('dark');
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const t = themes[theme];

  const screens = {
    home: HomeScreen,
    explore: ExploreScreen,
    vault: VaultScreen,
    profile: ProfileScreen,
  };

  const screenProps = {
    t,
    theme,
    setTheme,
    setActiveScreen,
    selectedChallenge,
    setSelectedChallenge,
    challenges,
    activeProjects,
    circleMembers,
  };

  const ActiveScreen = screens[activeScreen] || HomeScreen;

  return React.createElement('div', {
    style: {
      minHeight: '100vh',
      background: '#f0f0f0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Nunito, sans-serif',
      padding: '20px',
    }
  },
    React.createElement('style', null, globalStyles),
    React.createElement('div', {
      style: {
        width: 375,
        height: 812,
        background: t.bg,
        borderRadius: 44,
        overflow: 'hidden',
        position: 'relative',
        boxShadow: '0 40px 100px rgba(0,0,0,0.4), 0 0 0 10px #1a1a1a, inset 0 0 0 1px rgba(255,255,255,0.1)',
        display: 'flex',
        flexDirection: 'column',
      }
    },
      React.createElement(ActiveScreen, { key: activeScreen, ...screenProps }),
      React.createElement(BottomNav, { activeScreen, setActiveScreen, t })
    )
  );
}

function BottomNav({ activeScreen, setActiveScreen, t }) {
  const Icon = window.lucide;
  const tabs = [
    { id: 'home', icon: Icon.Home, label: 'Home' },
    { id: 'explore', icon: Icon.Compass, label: 'Explore' },
    { id: 'vault', icon: Icon.Archive, label: 'Vault' },
    { id: 'profile', icon: Icon.User, label: 'Profile' },
  ];

  return React.createElement('div', {
    style: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: 72,
      background: t.navBg,
      borderTop: `1px solid ${t.border}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      paddingBottom: 8,
      zIndex: 100,
    }
  },
    tabs.map(tab => {
      const active = activeScreen === tab.id;
      return React.createElement('button', {
        key: tab.id,
        className: 'tab-item btn-press',
        onClick: () => setActiveScreen(tab.id),
        style: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 3,
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '8px 16px',
          borderRadius: 16,
          minWidth: 60,
          minHeight: 44,
        }
      },
        React.createElement(tab.icon, {
          size: 22,
          color: active ? t.primary : t.textDim,
          strokeWidth: active ? 2.5 : 1.8,
          style: active ? { filter: `drop-shadow(0 0 6px ${t.primary}80)` } : {},
        }),
        React.createElement('span', {
          style: {
            fontSize: 10,
            fontWeight: active ? 700 : 500,
            color: active ? t.primary : t.textDim,
            fontFamily: 'Nunito, sans-serif',
          }
        }, tab.label)
      );
    })
  );
}

function HomeScreen({ t, theme, setTheme, setActiveScreen, setSelectedChallenge, challenges }) {
  const Icon = window.lucide;
  const [pressedCard, setPressedCard] = useState(null);

  return React.createElement('div', {
    className: 'screen-enter',
    style: {
      flex: 1,
      overflowY: 'auto',
      paddingBottom: 80,
    }
  },
    // Header
    React.createElement('div', {
      style: {
        padding: '20px 20px 16px',
        background: `linear-gradient(135deg, ${t.bg} 0%, ${t.surface} 100%)`,
      }
    },
      React.createElement('div', {
        style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }
      },
        React.createElement('div', null,
          React.createElement('h1', {
            style: {
              fontFamily: 'Fredoka, sans-serif',
              fontSize: 26,
              fontWeight: 700,
              color: t.text,
              lineHeight: 1.1,
            }
          },
            React.createElement('span', { style: { color: t.primary } }, 'Prompt'),
            ' Forge'
          ),
          React.createElement('p', {
            style: { fontSize: 12, color: t.textMuted, fontWeight: 500, marginTop: 2 }
          }, 'Craft. Challenge. Create.')
        ),
        React.createElement('div', {
          style: { display: 'flex', gap: 8, alignItems: 'center' }
        },
          React.createElement('button', {
            onClick: () => setTheme(theme === 'dark' ? 'light' : 'dark'),
            className: 'btn-press',
            style: {
              width: 36,
              height: 36,
              borderRadius: 12,
              background: t.surface,
              border: `1px solid ${t.border}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }
          },
            theme === 'dark'
              ? React.createElement(Icon.Sun, { size: 16, color: t.secondary })
              : React.createElement(Icon.Moon, { size: 16, color: t.primary })
          ),
          React.createElement('div', {
            style: {
              width: 36,
              height: 36,
              borderRadius: 12,
              background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 14,
              fontWeight: 700,
              color: '#fff',
              fontFamily: 'Fredoka, sans-serif',
            }
          }, 'AK')
        )
      ),
      // Sparks bar
      React.createElement('div', {
        style: {
          background: t.surface,
          borderRadius: 16,
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          border: `1px solid ${t.border}`,
        }
      },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8 } },
          React.createElement(Icon.Zap, { size: 18, color: '#F59E0B', style: { animation: 'sparkle 2s ease infinite' } }),
          React.createElement('div', null,
            React.createElement('div', { style: { fontSize: 11, color: t.textMuted, fontWeight: 500 } }, 'YOUR SPARKS'),
            React.createElement('div', {
              style: { fontSize: 18, fontWeight: 700, color: t.text, fontFamily: 'Fredoka, sans-serif' }
            }, '2,847')
          )
        ),
        React.createElement('div', {
          style: {
            background: `linear-gradient(90deg, ${t.primary}, ${t.secondary})`,
            backgroundSize: '200% 100%',
            animation: 'gradientShift 3s ease infinite',
            borderRadius: 20,
            padding: '6px 14px',
            fontSize: 11,
            fontWeight: 700,
            color: '#fff',
          }
        }, '✦ PRESTIGE III')
      )
    ),

    // Featured Challenge
    React.createElement('div', { style: { padding: '0 20px 16px' } },
      React.createElement('div', {
        style: {
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 12,
        }
      },
        React.createElement('h2', {
          style: { fontFamily: 'Fredoka, sans-serif', fontSize: 18, fontWeight: 600, color: t.text }
        }, 'Featured Challenge'),
        React.createElement('button', {
          onClick: () => setActiveScreen('explore'),
          style: { fontSize: 12, color: t.primary, fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }
        }, React.createElement('span', null, 'See All'))
      ),
      React.createElement('div', {
        className: 'btn-press',
        onClick: () => { setSelectedChallenge(challenges[0]); setActiveScreen('explore'); },
        style: {
          borderRadius: 24,
          overflow: 'hidden',
          cursor: 'pointer',
          background: `linear-gradient(135deg, #1a0a14 0%, #2d0a20 50%, #1a0a2e 100%)`,
          border: `1px solid ${t.border}`,
          position: 'relative',
        }
      },
        React.createElement('div', {
          style: {
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
            background: `radial-gradient(circle at 80% 20%, ${challenges[0].color}30 0%, transparent 60%)`,
          }
        }),
        React.createElement('div', { style: { padding: 20, position: 'relative', zIndex: 1 } },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 } },
            React.createElement('span', {
              style: {
                background: `${challenges[0].color}30`,
                color: challenges[0].color,
                fontSize: 11,
                fontWeight: 700,
                padding: '4px 10px',
                borderRadius: 20,
                border: `1px solid ${challenges[0].color}50`,
              }
            }, challenges[0].category.toUpperCase()),
            React.createElement('span', {
              style: { fontSize: 11, color: t.textMuted, display: 'flex', alignItems: 'center', gap: 4 }
            },
              React.createElement(Icon.Clock, { size: 12, color: t.textMuted }),
              ' ', challenges[0].deadline, ' left'
            )
          ),
          React.createElement('h3', {
            style: { fontFamily: 'Fredoka, sans-serif', fontSize: 22, fontWeight: 700, color: '#fff', marginBottom: 8, lineHeight: 1.2 }
          }, challenges[0].title),
          React.createElement('p', {
            style: { fontSize: 13, color: 'rgba(255,255,255,0.7)', marginBottom: 16, lineHeight: 1.5 }
          }, challenges[0].description),
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
            React.createElement('div', { style: { display: 'flex', gap: 16 } },
              React.createElement('div', null,
                React.createElement('div', { style: { fontSize: 11, color: 'rgba(255,255,255,0.5)', fontWeight: 500 } }, 'PARTICIPANTS'),
                React.createElement('div', { style: { fontSize: 16, fontWeight: 700, color: '#fff', fontFamily: 'Fredoka, sans-serif' } }, challenges[0].participants.toLocaleString())
              ),
              React.createElement('div', null,
                React.createElement('div', { style: { fontSize: 11, color: 'rgba(255,255,255,0.5)', fontWeight: 500 } }, 'PRIZE POOL'),
                React.createElement('div', { style: { fontSize: 16, fontWeight: 700, color: '#F59E0B', fontFamily: 'Fredoka, sans-serif' } }, `$${challenges[0].prize}`)
              )
            ),
            React.createElement('div', {
              style: {
                background: challenges[0].color,
                color: '#fff',
                fontSize: 14,
                fontWeight: 700,
                padding: '10px 18px',
                borderRadius: 16,
                fontFamily: 'Fredoka, sans-serif',
                boxShadow: `0 4px 16px ${challenges[0].color}60`,
              }
            }, `Join $${challenges[0].price}`)
          )
        )
      )
    ),

    // Trending
    React.createElement('div', { style: { padding: '0 20px' } },
      React.createElement('h2', {
        style: { fontFamily: 'Fredoka, sans-serif', fontSize: 18, fontWeight: 600, color: t.text, marginBottom: 12 }
      }, 'Trending Now'),
      React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 10 } },
        challenges.slice(1).map((ch, i) =>
          React.createElement('div', {
            key: ch.id,
            className: 'card-hover btn-press',
            onClick: () => { setSelectedChallenge(ch); setActiveScreen('explore'); },
            style: {
              background: t.card,
              borderRadius: 18,
              padding: '14px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              border: `1px solid ${t.border}`,
              cursor: 'pointer',
              animation: `slideUp 0.3s ease ${i * 0.08}s both`,
            }
          },
            React.createElement('div', {
              style: {
                width: 44,
                height: 44,
                borderRadius: 14,
                background: `linear-gradient(135deg, ${ch.color}40, ${ch.color}20)`,
                border: `2px solid ${ch.color}60`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }
            },
              React.createElement(Icon.Flame, { size: 20, color: ch.color })
            ),
            React.createElement('div', { style: { flex: 1, minWidth: 0 } },
              React.createElement('div', {
                style: { fontSize: 14, fontWeight: 700, color: t.text, marginBottom: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }
              }, ch.title),
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8 } },
                React.createElement('span', { style: { fontSize: 11, color: t.textMuted } }, `by ${ch.creator}`),
                React.createElement('span', { style: { fontSize: 10, color: t.textDim } }, '·'),
                React.createElement('span', { style: { fontSize: 11, color: ch.color, fontWeight: 600 } }, ch.category)
              )
            ),
            React.createElement('div', { style: { textAlign: 'right', flexShrink: 0 } },
              React.createElement('div', {
                style: { fontSize: 14, fontWeight: 700, color: t.primary, fontFamily: 'Fredoka, sans-serif' }
              }, `$${ch.price}`),
              React.createElement('div', { style: { fontSize: 10, color: t.textMuted } }, `${ch.participants} joined`)
            )
          )
        )
      )
    )
  );
}

function ExploreScreen({ t, setActiveScreen, selectedChallenge, setSelectedChallenge, challenges }) {
  const Icon = window.lucide;
  const [activeFilter, setActiveFilter] = useState('All');
  const [viewChallenge, setViewChallenge] = useState(selectedChallenge);
  const filters = ['All', 'Art', 'Writing', 'Music', 'Photography'];

  const filtered = activeFilter === 'All' ? challenges : challenges.filter(c => c.category === activeFilter);

  if (viewChallenge) {
    return React.createElement(ChallengeDetail, {
      challenge: viewChallenge,
      t,
      onBack: () => { setViewChallenge(null); setSelectedChallenge(null); }
    });
  }

  return React.createElement('div', {
    className: 'screen-enter',
    style: { flex: 1, overflowY: 'auto', paddingBottom: 80 }
  },
    React.createElement('div', { style: { padding: '20px 20px 12px' } },
      React.createElement('h1', {
        style: { fontFamily: 'Fredoka, sans-serif', fontSize: 24, fontWeight: 700, color: t.text, marginBottom: 4 }
      }, 'Challenge Nexus'),
      React.createElement('p', { style: { fontSize: 13, color: t.textMuted } }, 'Discover community-crafted challenges'),

      React.createElement('div', {
        style: {
          marginTop: 14,
          background: t.surface,
          borderRadius: 16,
          padding: '10px 14px',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          border: `1px solid ${t.border}`,
        }
      },
        React.createElement(Icon.Search, { size: 16, color: t.textDim }),
        React.createElement('span', { style: { fontSize: 14, color: t.textDim } }, 'Search challenges...')
      ),

      React.createElement('div', {
        style: { display: 'flex', gap: 8, marginTop: 14, overflowX: 'auto', paddingBottom: 4 }
      },
        filters.map(f =>
          React.createElement('button', {
            key: f,
            className: 'btn-press',
            onClick: () => setActiveFilter(f),
            style: {
              padding: '7px 16px',
              borderRadius: 20,
              border: activeFilter === f ? 'none' : `1px solid ${t.border}`,
              background: activeFilter === f
                ? `linear-gradient(90deg, ${t.primary}, ${t.secondary})`
                : t.surface,
              color: activeFilter === f ? '#fff' : t.textMuted,
              fontSize: 12,
              fontWeight: 700,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s ease',
              boxShadow: activeFilter === f ? `0 4px 12px ${t.primary}40` : 'none',
            }
          }, f)
        )
      )
    ),

    React.createElement('div', { style: { padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 14 } },
      filtered.map((ch, i) =>
        React.createElement('div', {
          key: ch.id,
          className: 'card-hover btn-press',
          onClick: () => setViewChallenge(ch),
          style: {
            background: t.card,
            borderRadius: 22,
            overflow: 'hidden',
            border: `1px solid ${t.border}`,
            cursor: 'pointer',
            animation: `slideUp 0.3s ease ${i * 0.06}s both`,
            position: 'relative',
          }
        },
          React.createElement('div', {
            style: {
              height: 4,
              background: `linear-gradient(90deg, ${ch.color}, ${ch.color}60)`,
            }
          }),
          React.createElement('div', { style: { padding: '16px 16px 14px' } },
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 } },
              React.createElement('div', { style: { flex: 1 } },
                React.createElement('div', { style: { display: 'flex', gap: 6, marginBottom: 6 } },
                  React.createElement('span', {
                    style: {
                      fontSize: 10,
                      fontWeight: 700,
                      color: ch.color,
                      background: `${ch.color}20`,
                      padding: '3px 8px',
                      borderRadius: 10,
                    }
                  }, ch.category.toUpperCase()),
                  React.createElement('span', {
                    style: {
                      fontSize: 10,
                      fontWeight: 700,
                      color: t.textMuted,
                      background: t.surfaceAlt,
                      padding: '3px 8px',
                      borderRadius: 10,
                    }
                  }, ch.level.toUpperCase())
                ),
                React.createElement('h3', {
                  style: { fontSize: 16, fontWeight: 700, color: t.text, fontFamily: 'Fredoka, sans-serif', lineHeight: 1.2 }
                }, ch.title)
              )
            ),

            React.createElement('p', {
              style: { fontSize: 12, color: t.textMuted, lineHeight: 1.5, marginBottom: 12 }
            }, ch.description),

            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 } },
              React.createElement('div', {
                style: {
                  width: 26,
                  height: 26,
                  borderRadius: 8,
                  background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 9,
                  fontWeight: 700,
                  color: '#fff',
                }
              }, ch.creatorAvatar),
              React.createElement('span', { style: { fontSize: 12, color: t.textMuted, fontWeight: 600 } }, ch.creator),
              React.createElement(Icon.BadgeCheck, { size: 13, color: t.cta })
            ),

            React.createElement('div', {
              style: {
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px 14px',
                background: t.surface,
                borderRadius: 14,
              }
            },
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 5 } },
                React.createElement(Icon.Users, { size: 13, color: t.textMuted }),
                React.createElement('span', { style: { fontSize: 12, color: t.textMuted, fontWeight: 600 } }, `${ch.participants.toLocaleString()} joined`)
              ),
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 5 } },
                React.createElement(Icon.Clock, { size: 13, color: t.textMuted }),
                React.createElement('span', { style: { fontSize: 12, color: t.textMuted, fontWeight: 600 } }, `${ch.deadline} left`)
              ),
              React.createElement('div', {
                style: {
                  background: `linear-gradient(90deg, ${t.primary}, ${t.secondary})`,
                  color: '#fff',
                  fontSize: 13,
                  fontWeight: 700,
                  padding: '7px 14px',
                  borderRadius: 12,
                  fontFamily: 'Fredoka, sans-serif',
                  boxShadow: `0 3px 10px ${t.primary}40`,
                }
              }, `$${ch.price}`)
            )
          )
        )
      )
    )
  );
}

function ChallengeDetail({ challenge: ch, t, onBack }) {
  const Icon = window.lucide;
  const [joined, setJoined] = useState(false);

  return React.createElement('div', {
    className: 'screen-enter',
    style: { flex: 1, overflowY: 'auto', paddingBottom: 80 }
  },
    React.createElement('div', {
      style: {
        background: `linear-gradient(160deg, ${ch.color}30, ${t.bg} 60%)`,
        padding: '20px 20px 24px',
        position: 'relative',
      }
    },
      React.createElement('button', {
        className: 'btn-press',
        onClick: onBack,
        style: {
          width: 36,
          height: 36,
          borderRadius: 12,
          background: t.surface,
          border: `1px solid ${t.border}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          marginBottom: 16,
        }
      }, React.createElement(Icon.ArrowLeft, { size: 18, color: t.text })),

      React.createElement('span', {
        style: {
          fontSize: 11, fontWeight: 700, color: ch.color,
          background: `${ch.color}20`, padding: '4px 12px',
          borderRadius: 20, border: `1px solid ${ch.color}40`,
        }
      }, ch.category.toUpperCase()),

      React.createElement('h1', {
        style: {
          fontFamily: 'Fredoka, sans-serif', fontSize: 26, fontWeight: 700,
          color: t.text, marginTop: 10, marginBottom: 8, lineHeight: 1.2
        }
      }, ch.title),

      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10 } },
        React.createElement('div', {
          style: {
            width: 32, height: 32, borderRadius: 10,
            background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 11, fontWeight: 700, color: '#fff',
          }
        }, ch.creatorAvatar),
        React.createElement('div', null,
          React.createElement('div', { style: { fontSize: 13, color: t.text, fontWeight: 600 } }, ch.creator),
          React.createElement('div', { style: { fontSize: 11, color: t.textMuted } }, 'Challenge Creator')
        ),
        React.createElement(Icon.BadgeCheck, { size: 16, color: t.cta })
      )
    ),

    React.createElement('div', { style: { padding: '0 20px' } },
      // Stats row
      React.createElement('div', {
        style: {
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: 10,
          marginBottom: 20,
        }
      },
        [
          { label: 'Entry Fee', value: `$${ch.price}`, icon: Icon.DollarSign, color: t.primary },
          { label: 'Prize Pool', value: `$${ch.prize}`, icon: Icon.Trophy, color: '#F59E0B' },
          { label: 'Days Left', value: ch.deadline.split(' ')[0], icon: Icon.Clock, color: t.cta },
        ].map(stat =>
          React.createElement('div', {
            key: stat.label,
            style: {
              background: t.card,
              borderRadius: 16,
              padding: '12px 10px',
              textAlign: 'center',
              border: `1px solid ${t.border}`,
            }
          },
            React.createElement(stat.icon, { size: 16, color: stat.color, style: { margin: '0 auto 4px' } }),
            React.createElement('div', { style: { fontSize: 16, fontWeight: 700, color: t.text, fontFamily: 'Fredoka, sans-serif' } }, stat.value),
            React.createElement('div', { style: { fontSize: 10, color: t.textMuted } }, stat.label)
          )
        )
      ),

      React.createElement('div', { style: { background: t.card, borderRadius: 18, padding: 16, marginBottom: 14, border: `1px solid ${t.border}` } },
        React.createElement('h3', { style: { fontFamily: 'Fredoka, sans-serif', fontSize: 16, fontWeight: 700, color: t.text, marginBottom: 8 } }, 'The Challenge'),
        React.createElement('p', { style: { fontSize: 13, color: t.textMuted, lineHeight: 1.6 } }, ch.description),
      ),

      React.createElement('div', { style: { background: t.card, borderRadius: 18, padding: 16, marginBottom: 14, border: `1px solid ${t.border}` } },
        React.createElement('h3', { style: { fontFamily: 'Fredoka, sans-serif', fontSize: 16, fontWeight: 700, color: t.text, marginBottom: 12 } }, 'Rules & Structure'),
        ['Submit daily progress updates', 'Final submission by deadline', 'Community votes decide the winner', 'Collaborate in Accountability Circles'].map((rule, i) =>
          React.createElement('div', {
            key: i,
            style: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }
          },
            React.createElement('div', {
              style: {
                width: 22, height: 22, borderRadius: 8,
                background: `${ch.color}20`, border: `1px solid ${ch.color}40`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }
            }, React.createElement(Icon.Check, { size: 12, color: ch.color })),
            React.createElement('span', { style: { fontSize: 13, color: t.textMuted } }, rule)
          )
        )
      ),

      React.createElement('button', {
        className: 'btn-press',
        onClick: () => setJoined(!joined),
        style: {
          width: '100%',
          padding: '16px',
          borderRadius: 18,
          border: 'none',
          background: joined
            ? t.surface
            : `linear-gradient(135deg, ${t.primary}, ${t.secondary})`,
          color: joined ? t.primary : '#fff',
          fontSize: 16,
          fontWeight: 700,
          fontFamily: 'Fredoka, sans-serif',
          cursor: 'pointer',
          boxShadow: joined ? 'none' : `0 8px 24px ${t.primary}50`,
          border: joined ? `2px solid ${t.primary}` : 'none',
          transition: 'all 0.3s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
        }
      },
        joined
          ? [React.createElement(Icon.Check, { key: 'i', size: 18, color: t.primary }), React.createElement('span', { key: 't' }, 'Joined! View in Vault')]
          : [React.createElement(Icon.Zap, { key: 'i', size: 18, color: '#fff' }), React.createElement('span', { key: 't' }, `Join for $${ch.price}`)]
      )
    )
  );
}

function VaultScreen({ t, activeProjects, circleMembers }) {
  const Icon = window.lucide;
  const [activeTab, setActiveTab] = useState('progress');

  return React.createElement('div', {
    className: 'screen-enter',
    style: { flex: 1, overflowY: 'auto', paddingBottom: 80 }
  },
    React.createElement('div', { style: { padding: '20px 20px 12px' } },
      React.createElement('h1', {
        style: { fontFamily: 'Fredoka, sans-serif', fontSize: 24, fontWeight: 700, color: t.text, marginBottom: 4 }
      }, 'Progress Vault'),
      React.createElement('p', { style: { fontSize: 13, color: t.textMuted } }, 'Track your creative journey'),

      React.createElement('div', {
        style: {
          display: 'flex',
          gap: 0,
          marginTop: 16,
          background: t.surface,
          borderRadius: 16,
          padding: 4,
          border: `1px solid ${t.border}`,
        }
      },
        [
          { id: 'progress', label: 'My Progress' },
          { id: 'circles', label: 'Circles' },
        ].map(tab =>
          React.createElement('button', {
            key: tab.id,
            onClick: () => setActiveTab(tab.id),
            style: {
              flex: 1,
              padding: '9px',
              borderRadius: 12,
              border: 'none',
              background: activeTab === tab.id
                ? `linear-gradient(90deg, ${t.primary}, ${t.secondary})`
                : 'transparent',
              color: activeTab === tab.id ? '#fff' : t.textMuted,
              fontSize: 13,
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: activeTab === tab.id ? `0 3px 10px ${t.primary}40` : 'none',
            }
          }, tab.label)
        )
      )
    ),

    activeTab === 'progress'
      ? React.createElement('div', { style: { padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 14 } },
          activeProjects.map((proj, i) =>
            React.createElement('div', {
              key: proj.id,
              style: {
                background: t.card,
                borderRadius: 22,
                padding: 18,
                border: `1px solid ${t.border}`,
                animation: `slideUp 0.3s ease ${i * 0.1}s both`,
              }
            },
              React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 } },
                React.createElement('div', null,
                  React.createElement('span', {
                    style: { fontSize: 10, fontWeight: 700, color: proj.color, background: `${proj.color}20`, padding: '3px 8px', borderRadius: 10 }
                  }, proj.category.toUpperCase()),
                  React.createElement('h3', {
                    style: { fontFamily: 'Fredoka, sans-serif', fontSize: 16, fontWeight: 700, color: t.text, marginTop: 6, lineHeight: 1.2 }
                  }, proj.title)
                ),
                React.createElement('div', {
                  style: {
                    display: 'flex', alignItems: 'center', gap: 4, background: t.surface,
                    padding: '6px 10px', borderRadius: 12, border: `1px solid ${t.border}`,
                  }
                },
                  React.createElement(Icon.Clock, { size: 12, color: t.textMuted }),
                  React.createElement('span', { style: { fontSize: 11, color: t.textMuted, fontWeight: 600 } }, proj.deadline)
                )
              ),

              React.createElement('div', { style: { marginBottom: 14 } },
                React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: 8 } },
                  React.createElement('span', { style: { fontSize: 12, color: t.textMuted, fontWeight: 600 } }, 'Overall Progress'),
                  React.createElement('span', { style: { fontSize: 12, fontWeight: 700, color: proj.color } }, `${proj.progress}%`)
                ),
                React.createElement('div', {
                  style: { height: 8, background: t.surfaceAlt, borderRadius: 4, overflow: 'hidden' }
                },
                  React.createElement('div', {
                    style: {
                      height: '100%',
                      width: `${proj.progress}%`,
                      background: `linear-gradient(90deg, ${proj.color}, ${proj.color}aa)`,
                      borderRadius: 4,
                      transition: 'width 1s ease',
                      boxShadow: `0 0 8px ${proj.color}60`,
                    }
                  })
                )
              ),

              React.createElement('div', null,
                React.createElement('div', { style: { fontSize: 11, color: t.textDim, fontWeight: 600, marginBottom: 8 } }, 'MILESTONES'),
                React.createElement('div', { style: { display: 'flex', gap: 6 } },
                  proj.milestones.map((m, mi) =>
                    React.createElement('div', {
                      key: mi,
                      style: {
                        flex: 1,
                        padding: '6px 4px',
                        borderRadius: 10,
                        background: mi < proj.currentMilestone ? `${proj.color}20` : mi === proj.currentMilestone ? `${proj.color}30` : t.surface,
                        border: mi <= proj.currentMilestone ? `1px solid ${proj.color}50` : `1px solid ${t.border}`,
                        textAlign: 'center',
                        fontSize: 9,
                        fontWeight: 700,
                        color: mi <= proj.currentMilestone ? proj.color : t.textDim,
                      }
                    },
                      mi < proj.currentMilestone
                        ? React.createElement(Icon.Check, { size: 10, color: proj.color, style: { margin: '0 auto' } })
                        : m
                    )
                  )
                )
              ),

              React.createElement('button', {
                className: 'btn-press',
                style: {
                  marginTop: 14,
                  width: '100%',
                  padding: '12px',
                  borderRadius: 14,
                  border: `2px solid ${proj.color}50`,
                  background: 'transparent',
                  color: proj.color,
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  transition: 'all 0.2s ease',
                }
              },
                React.createElement(Icon.Upload, { size: 15, color: proj.color }),
                React.createElement('span', null, 'Upload Progress')
              )
            )
          )
        )
      : React.createElement('div', { style: { padding: '0 20px' } },
          React.createElement('div', {
            style: {
              background: `linear-gradient(135deg, ${t.primary}20, ${t.secondary}10)`,
              borderRadius: 22,
              padding: 18,
              border: `1px solid ${t.border}`,
              marginBottom: 16,
            }
          },
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 } },
              React.createElement('div', null,
                React.createElement('h3', { style: { fontFamily: 'Fredoka, sans-serif', fontSize: 18, fontWeight: 700, color: t.text } }, 'Urban Creators Circle'),
                React.createElement('p', { style: { fontSize: 12, color: t.textMuted } }, '4 members • 2 active challenges')
              ),
              React.createElement('div', {
                style: {
                  width: 36, height: 36, borderRadius: 12,
                  background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }
              }, React.createElement(Icon.Users, { size: 18, color: '#fff' }))
            ),

            circleMembers.map((member, i) =>
              React.createElement('div', {
                key: i,
                style: {
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '10px 0',
                  borderTop: i > 0 ? `1px solid ${t.border}` : 'none',
                }
              },
                React.createElement('div', {
                  style: {
                    width: 36, height: 36, borderRadius: 12,
                    background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 11, fontWeight: 700, color: '#fff',
                    position: 'relative',
                  }
                },
                  member.avatar,
                  React.createElement('div', {
                    style: {
                      position: 'absolute', bottom: -2, right: -2,
                      width: 10, height: 10, borderRadius: '50%',
                      background: member.status === 'active' ? '#10B981' : '#6B7280',
                      border: `2px solid ${t.card}`,
                    }
                  })
                ),
                React.createElement('div', { style: { flex: 1 } },
                  React.createElement('div', { style: { fontSize: 13, fontWeight: 700, color: t.text, marginBottom: 4 } }, member.name),
                  React.createElement('div', { style: { height: 4, background: t.surfaceAlt, borderRadius: 2, overflow: 'hidden' } },
                    React.createElement('div', {
                      style: {
                        height: '100%', width: `${member.progress}%`,
                        background: `linear-gradient(90deg, ${t.primary}, ${t.secondary})`,
                        borderRadius: 2,
                      }
                    })
                  )
                ),
                React.createElement('span', { style: { fontSize: 12, fontWeight: 700, color: t.primary } }, `${member.progress}%`)
              )
            )
          ),

          React.createElement('button', {
            className: 'btn-press',
            style: {
              width: '100%',
              padding: '14px',
              borderRadius: 18,
              border: `2px dashed ${t.border}`,
              background: 'transparent',
              color: t.textMuted,
              fontSize: 14,
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
            }
          },
            React.createElement(Icon.Plus, { size: 18, color: t.textMuted }),
            React.createElement('span', null, 'Create New Circle')
          )
        )
  );
}

function ProfileScreen({ t, theme, setTheme }) {
  const Icon = window.lucide;

  const stats = [
    { label: 'Completed', value: '47', icon: Icon.Trophy, color: '#F59E0B' },
    { label: 'Created', value: '12', icon: Icon.Sparkles, color: t.primary },
    { label: 'Inspired', value: '2.1K', icon: Icon.Heart, color: '#EF4444' },
  ];

  const badges = [
    { name: 'Spark Starter', color: '#F59E0B', icon: Icon.Zap },
    { name: 'Word Weaver', color: '#06B6D4', icon: Icon.PenLine },
    { name: 'Visual Vanguard', color: '#EC4899', icon: Icon.Palette },
    { name: 'Circle Leader', color: '#8B5CF6', icon: Icon.Users },
  ];

  return React.createElement('div', {
    className: 'screen-enter',
    style: { flex: 1, overflowY: 'auto', paddingBottom: 80 }
  },
    // Hero profile section
    React.createElement('div', {
      style: {
        background: `linear-gradient(160deg, ${t.primary}30 0%, ${t.bg} 70%)`,
        padding: '24px 20px 20px',
        position: 'relative',
        overflow: 'hidden',
      }
    },
      React.createElement('div', {
        style: {
          position: 'absolute', top: -30, right: -30,
          width: 140, height: 140, borderRadius: '50%',
          background: `radial-gradient(circle, ${t.primary}20, transparent)`,
          animation: 'float 4s ease-in-out infinite',
        }
      }),
      React.createElement('div', { style: { display: 'flex', justifyContent: 'flex-end', marginBottom: 16 } },
        React.createElement('button', {
          onClick: () => setTheme(theme === 'dark' ? 'light' : 'dark'),
          className: 'btn-press',
          style: {
            width: 36, height: 36, borderRadius: 12,
            background: t.surface, border: `1px solid ${t.border}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
          }
        },
          theme === 'dark'
            ? React.createElement(Icon.Sun, { size: 16, color: t.secondary })
            : React.createElement(Icon.Moon, { size: 16, color: t.primary })
        )
      ),
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 } },
        React.createElement('div', {
          style: {
            width: 72, height: 72, borderRadius: 22,
            background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 26, fontWeight: 700, color: '#fff',
            fontFamily: 'Fredoka, sans-serif',
            boxShadow: `0 8px 24px ${t.primary}50`,
            animation: 'float 3s ease-in-out infinite',
          }
        }, 'AK'),
        React.createElement('div', null,
          React.createElement('h2', {
            style: { fontFamily: 'Fredoka, sans-serif', fontSize: 22, fontWeight: 700, color: t.text }
          }, 'Alex Kim'),
          React.createElement('p', { style: { fontSize: 13, color: t.textMuted, marginTop: 2 } }, '@alexcreates'),
          React.createElement('div', {
            style: {
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              marginTop: 6,
              background: `linear-gradient(90deg, ${t.primary}20, ${t.secondary}20)`,
              border: `1px solid ${t.primary}40`,
              borderRadius: 20,
              padding: '4px 12px',
            }
          },
            React.createElement(Icon.Zap, { size: 12, color: '#F59E0B', style: { animation: 'sparkle 2s ease infinite' } }),
            React.createElement('span', { style: { fontSize: 11, fontWeight: 700, color: t.primary } }, 'PRESTIGE III · 2,847 Sparks')
          )
        )
      ),

      // Prestige progress
      React.createElement('div', {
        style: {
          background: t.surface, borderRadius: 16, padding: '12px 14px',
          border: `1px solid ${t.border}`,
        }
      },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: 8 } },
          React.createElement('span', { style: { fontSize: 12, color: t.textMuted, fontWeight: 600 } }, 'Progress to Prestige IV'),
          React.createElement('span', { style: { fontSize: 12, fontWeight: 700, color: t.primary } }, '2,847 / 5,000')
        ),
        React.createElement('div', { style: { height: 8, background: t.surfaceAlt, borderRadius: 4, overflow: 'hidden' } },
          React.createElement('div', {
            style: {
              height: '100%', width: '57%',
              background: `linear-gradient(90deg, ${t.primary}, ${t.secondary})`,
              borderRadius: 4,
              boxShadow: `0 0 10px ${t.primary}60`,
              animation: 'shimmer 2s linear infinite',
            }
          })
        )
      )
    ),

    React.createElement('div', { style: { padding: '0 20px' } },
      // Stats
      React.createElement('div', {
        style: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 16 }
      },
        stats.map(stat =>
          React.createElement('div', {
            key: stat.label,
            style: {
              background: t.card, borderRadius: 18, padding: '16px 12px',
              textAlign: 'center', border: `1px solid ${t.border}`,
            }
          },
            React.createElement(stat.icon, { size: 18, color: stat.color, style: { margin: '0 auto 6px' } }),
            React.createElement('div', {
              style: { fontSize: 22, fontWeight: 700, color: t.text, fontFamily: 'Fredoka, sans-serif' }
            }, stat.value),
            React.createElement('div', { style: { fontSize: 10, color: t.textMuted, fontWeight: 600 } }, stat.label.toUpperCase())
          )
        )
      ),

      // Badges
      React.createElement('div', {
        style: {
          background: t.card, borderRadius: 22, padding: '16px',
          border: `1px solid ${t.border}`, marginBottom: 16,
        }
      },
        React.createElement('h3', {
          style: { fontFamily: 'Fredoka, sans-serif', fontSize: 16, fontWeight: 700, color: t.text, marginBottom: 14 }
        }, 'Earned Badges'),
        React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 } },
          badges.map((badge, i) =>
            React.createElement('div', {
              key: i,
              style: {
                background: `${badge.color}15`,
                border: `1px solid ${badge.color}40`,
                borderRadius: 14,
                padding: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
              }
            },
              React.createElement('div', {
                style: {
                  width: 34, height: 34, borderRadius: 10,
                  background: `${badge.color}25`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }
              }, React.createElement(badge.icon, { size: 16, color: badge.color })),
              React.createElement('span', { style: { fontSize: 11, fontWeight: 700, color: t.text, lineHeight: 1.3 } }, badge.name)
            )
          )
        )
      ),

      // Create Challenge CTA
      React.createElement('div', {
        className: 'btn-press',
        style: {
          background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})`,
          borderRadius: 22,
          padding: 20,
          cursor: 'pointer',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: `0 8px 30px ${t.primary}50`,
        }
      },
        React.createElement('div', {
          style: {
            position: 'absolute', top: -20, right: -20,
            width: 100, height: 100, borderRadius: '50%',
            background: 'rgba(255,255,255,0.1)',
          }
        }),
        React.createElement('div', { style: { position: 'relative', zIndex: 1 } },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 } },
            React.createElement(Icon.Flame, { size: 20, color: '#fff' }),
            React.createElement('h3', {
              style: { fontFamily: 'Fredoka, sans-serif', fontSize: 18, fontWeight: 700, color: '#fff' }
            }, "The Curator's Forge")
          ),
          React.createElement('p', { style: { fontSize: 12, color: 'rgba(255,255,255,0.85)', marginBottom: 14, lineHeight: 1.5 } },
            'Design and publish your own creative challenge. Earn Sparks and monetize your creative thinking.'
          ),
          React.createElement('div', {
            style: {
              background: 'rgba(255,255,255,0.2)',
              borderRadius: 12,
              padding: '10px 16px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              fontSize: 13,
              fontWeight: 700,
              color: '#fff',
              backdropFilter: 'blur(4px)',
            }
          },
            React.createElement(Icon.Plus, { size: 16, color: '#fff' }),
            'Create a Challenge'
          )
        )
      )
    )
  );
}
