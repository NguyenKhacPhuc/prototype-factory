const { useState, useEffect, useRef } = React;

function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [darkMode, setDarkMode] = useState(false);
  const [activeChallenge, setActiveChallenge] = useState(null);

  const themes = {
    light: {
      bg: '#FDF2F8',
      card: '#FFFFFF',
      cardAlt: '#FEF9FB',
      text: '#1A0A12',
      textSec: '#6B4C5E',
      textMuted: '#9B7A8A',
      border: '#F9D5EA',
      navBg: '#FFFFFF',
      primary: '#EC4899',
      secondary: '#F472B6',
      cta: '#06B6D4',
      tag: '#FDE7F3',
      tagText: '#C2185B',
      inputBg: '#FEF4FB',
      shimmer: 'rgba(236,72,153,0.08)',
    },
    dark: {
      bg: '#1A0A12',
      card: '#2A1020',
      cardAlt: '#230E1A',
      text: '#FDF2F8',
      textSec: '#F9A8D4',
      textMuted: '#C084A0',
      border: '#4A1A30',
      navBg: '#1A0A12',
      primary: '#EC4899',
      secondary: '#F472B6',
      cta: '#06B6D4',
      tag: '#3D0B28',
      tagText: '#F472B6',
      inputBg: '#2A0F1E',
      shimmer: 'rgba(236,72,153,0.12)',
    }
  };
  const t = darkMode ? themes.dark : themes.light;

  const styles = `
    @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Nunito:wght@400;500;600;700&display=swap');

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(12px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes pulse {
      0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(236,72,153,0.4); }
      50% { transform: scale(1.04); box-shadow: 0 0 0 8px rgba(236,72,153,0); }
    }
    @keyframes shimmer {
      0% { background-position: -200% center; }
      100% { background-position: 200% center; }
    }
    @keyframes spinIn {
      from { opacity: 0; transform: rotate(-20deg) scale(0.8); }
      to { opacity: 1; transform: rotate(0deg) scale(1); }
    }
    @keyframes floatBadge {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-4px); }
    }
    .screen-enter { animation: fadeIn 0.3s ease forwards; }
    .card-hover { transition: transform 0.2s ease, box-shadow 0.2s ease; }
    .card-hover:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(236,72,153,0.18); }
    .btn-press:active { transform: scale(0.96); }
    .tab-active { animation: spinIn 0.25s ease forwards; }
    .float-badge { animation: floatBadge 3s ease-in-out infinite; }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: rgba(236,72,153,0.3); border-radius: 2px; }
  `;

  const challenges = [
    {
      id: 1,
      title: 'Cyberpunk Cityscape Illustration',
      creator: 'Nova_Ren',
      avatar: 'NR',
      category: 'Visual Art',
      progress: 68,
      igniters: 4,
      daysLeft: 5,
      points: 320,
      needs: ['Color palette feedback', 'Background detail help'],
      description: 'Creating a full-spread cyberpunk city at dusk for my graphic novel. Need help with neon lighting techniques and background crowd density.',
      contributions: [
        { user: 'ArtSpark_V', type: 'Concept Sketch', time: '2h ago' },
        { user: 'ChromaWave', type: 'Color Reference', time: '5h ago' },
      ]
    },
    {
      id: 2,
      title: 'Lo-fi Jazz EP — First Track',
      creator: 'MellowKeys',
      avatar: 'MK',
      category: 'Music',
      progress: 42,
      igniters: 2,
      daysLeft: 11,
      points: 280,
      needs: ['Bass line ideas', 'Mix feedback'],
      description: 'Producing a 4-track lo-fi jazz EP inspired by late-night Tokyo streets. Looking for bass riff contributions and EQ advice.',
      contributions: [
        { user: 'BassDrifter', type: 'MIDI Riff', time: '1d ago' },
      ]
    },
    {
      id: 3,
      title: 'Chapter 3 — The Hollow Garden',
      creator: 'PenWanderer',
      avatar: 'PW',
      category: 'Writing',
      progress: 85,
      igniters: 7,
      daysLeft: 2,
      points: 450,
      needs: ['Prose polish', 'Plot hole review'],
      description: 'Third chapter of my fantasy novel. The protagonist discovers the garden hides a sentient root network. Need critique on pacing and dialogue.',
      contributions: [
        { user: 'EditWitch', type: 'Prose Edit', time: '3h ago' },
        { user: 'PlotSmith', type: 'Outline Note', time: '8h ago' },
        { user: 'WordAlch', type: 'Dialogue Rework', time: '1d ago' },
      ]
    },
  ];

  const screens = {
    home: () => HomeScreen({ t, challenges, setActiveScreen, setActiveChallenge, darkMode, setDarkMode }),
    explore: () => ExploreScreen({ t, challenges, setActiveScreen, setActiveChallenge }),
    create: () => CreateScreen({ t, setActiveScreen }),
    challenge: () => ChallengeScreen({ t, challenge: activeChallenge || challenges[0], setActiveScreen }),
    profile: () => ProfileScreen({ t, darkMode, setDarkMode }),
  };

  const navItems = [
    { id: 'home', label: 'Home', icon: 'Home' },
    { id: 'explore', label: 'Explore', icon: 'Compass' },
    { id: 'create', label: 'Create', icon: 'Plus' },
    { id: 'profile', label: 'Profile', icon: 'User' },
  ];

  return React.createElement('div', {
    style: { minHeight: '100vh', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Nunito, sans-serif', padding: '24px 16px' }
  },
    React.createElement('style', null, styles),
    React.createElement('div', {
      style: {
        width: 375,
        height: 812,
        background: t.bg,
        borderRadius: 40,
        overflow: 'hidden',
        boxShadow: '0 32px 80px rgba(0,0,0,0.28), 0 0 0 8px rgba(0,0,0,0.06)',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        transition: 'background 0.3s ease',
      }
    },
      React.createElement('div', {
        style: { flex: 1, overflowY: 'auto', overflowX: 'hidden' }
      },
        React.createElement('div', { className: 'screen-enter', key: activeScreen },
          screens[activeScreen] ? screens[activeScreen]() : screens.home()
        )
      ),
      React.createElement('div', {
        style: {
          display: 'flex',
          borderTop: `1.5px solid ${t.border}`,
          background: t.navBg,
          paddingBottom: 8,
          transition: 'background 0.3s ease',
        }
      },
        navItems.map(item => {
          const Icon = window.lucide[item.icon];
          const isActive = activeScreen === item.id || (activeScreen === 'challenge' && item.id === 'explore');
          return React.createElement('button', {
            key: item.id,
            onClick: () => setActiveScreen(item.id),
            className: 'btn-press',
            style: {
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '10px 4px 4px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              gap: 3,
              minHeight: 56,
            }
          },
            item.id === 'create'
              ? React.createElement('div', {
                  style: {
                    width: 44, height: 44,
                    borderRadius: 16,
                    background: isActive ? t.primary : `linear-gradient(135deg, ${t.primary}, ${t.cta})`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: `0 4px 14px rgba(236,72,153,0.4)`,
                    animation: 'pulse 2.5s ease-in-out infinite',
                    marginTop: -18,
                  }
                },
                  Icon && React.createElement(Icon, { size: 22, color: '#FFFFFF', strokeWidth: 2.5 })
                )
              : React.createElement(React.Fragment, null,
                  Icon && React.createElement(Icon, {
                    size: 22,
                    color: isActive ? t.primary : t.textMuted,
                    strokeWidth: isActive ? 2.5 : 1.8,
                  }),
                  React.createElement('span', {
                    style: {
                      fontSize: 10,
                      fontFamily: 'Nunito, sans-serif',
                      fontWeight: isActive ? 700 : 500,
                      color: isActive ? t.primary : t.textMuted,
                      transition: 'color 0.2s',
                    }
                  }, item.label)
                )
          );
        })
      )
    )
  );
}

function HomeScreen({ t, challenges, setActiveScreen, setActiveChallenge, darkMode, setDarkMode }) {
  const MoonIcon = window.lucide.Moon;
  const SunIcon = window.lucide.Sun;
  const FlameIcon = window.lucide.Flame;
  const TrendingUpIcon = window.lucide.TrendingUp;
  const ZapIcon = window.lucide.Zap;
  const StarIcon = window.lucide.Star;

  const stats = [
    { label: 'Forge Points', value: '1,240', icon: 'Zap', color: '#EC4899' },
    { label: 'Challenges', value: '8', icon: 'Flame', color: '#06B6D4' },
    { label: 'Ignitions', value: '23', icon: 'Star', color: '#F472B6' },
  ];

  return React.createElement('div', { style: { paddingBottom: 16 } },
    React.createElement('div', {
      style: {
        background: `linear-gradient(145deg, #EC4899 0%, #F472B6 50%, #06B6D4 100%)`,
        padding: '28px 20px 24px',
        position: 'relative',
        overflow: 'hidden',
      }
    },
      React.createElement('div', {
        style: {
          position: 'absolute', top: -30, right: -30, width: 140, height: 140,
          borderRadius: '50%', background: 'rgba(255,255,255,0.1)',
        }
      }),
      React.createElement('div', {
        style: {
          position: 'absolute', bottom: -20, left: 40, width: 80, height: 80,
          borderRadius: '50%', background: 'rgba(255,255,255,0.08)',
        }
      }),
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' } },
        React.createElement('div', null,
          React.createElement('p', {
            style: { color: 'rgba(255,255,255,0.85)', fontSize: 13, fontFamily: 'Nunito', fontWeight: 600, marginBottom: 4 }
          }, 'Good evening,'),
          React.createElement('h1', {
            style: { color: '#FFFFFF', fontSize: 26, fontFamily: 'Fredoka', fontWeight: 700, lineHeight: 1.1 }
          }, 'Aria Nova ✨'),
          React.createElement('p', {
            style: { color: 'rgba(255,255,255,0.8)', fontSize: 12, fontFamily: 'Nunito', marginTop: 4 }
          }, '3 challenges need your spark today')
        ),
        React.createElement('button', {
          onClick: () => setDarkMode(!darkMode),
          className: 'btn-press',
          style: {
            width: 40, height: 40, borderRadius: 12,
            background: 'rgba(255,255,255,0.2)',
            border: '1px solid rgba(255,255,255,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', backdropFilter: 'blur(8px)',
          }
        },
          darkMode
            ? SunIcon && React.createElement(SunIcon, { size: 18, color: '#FFF' })
            : MoonIcon && React.createElement(MoonIcon, { size: 18, color: '#FFF' })
        )
      ),
      React.createElement('div', {
        style: { display: 'flex', gap: 10, marginTop: 20 }
      },
        stats.map(s => {
          const Icon = window.lucide[s.icon];
          return React.createElement('div', {
            key: s.label,
            style: {
              flex: 1, background: 'rgba(255,255,255,0.18)',
              borderRadius: 14, padding: '10px 10px 8px',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.25)',
              textAlign: 'center',
            }
          },
            Icon && React.createElement(Icon, { size: 16, color: '#FFF', style: { marginBottom: 2 } }),
            React.createElement('div', {
              style: { color: '#FFF', fontSize: 18, fontFamily: 'Fredoka', fontWeight: 700, lineHeight: 1.1 }
            }, s.value),
            React.createElement('div', {
              style: { color: 'rgba(255,255,255,0.8)', fontSize: 10, fontFamily: 'Nunito', fontWeight: 600 }
            }, s.label)
          );
        })
      )
    ),

    React.createElement('div', { style: { padding: '20px 16px 0' } },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 } },
        React.createElement('h2', {
          style: { fontFamily: 'Fredoka', fontSize: 20, fontWeight: 700, color: t.text }
        }, 'Active Sparks'),
        React.createElement('button', {
          onClick: () => setActiveScreen('explore'),
          className: 'btn-press',
          style: { background: 'none', border: 'none', cursor: 'pointer', color: t.primary, fontSize: 13, fontFamily: 'Nunito', fontWeight: 700 }
        }, 'See all')
      ),

      challenges.map((ch, i) => {
        const FlameIcon2 = window.lucide.Flame;
        const ClockIcon = window.lucide.Clock;
        const UsersIcon = window.lucide.Users;
        return React.createElement('div', {
          key: ch.id,
          className: 'card-hover',
          onClick: () => { setActiveChallenge(ch); setActiveScreen('challenge'); },
          style: {
            background: t.card,
            borderRadius: 20,
            padding: 16,
            marginBottom: 12,
            border: `1.5px solid ${t.border}`,
            cursor: 'pointer',
            animation: `slideUp ${0.2 + i * 0.08}s ease forwards`,
            boxShadow: `0 2px 12px rgba(236,72,153,0.07)`,
          }
        },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 } },
            React.createElement('div', { style: { flex: 1, marginRight: 10 } },
              React.createElement('span', {
                style: {
                  display: 'inline-block', background: t.tag, color: t.tagText,
                  fontSize: 10, fontFamily: 'Nunito', fontWeight: 700,
                  padding: '2px 8px', borderRadius: 20, marginBottom: 5,
                }
              }, ch.category),
              React.createElement('h3', {
                style: { fontFamily: 'Fredoka', fontSize: 16, fontWeight: 600, color: t.text, lineHeight: 1.2 }
              }, ch.title)
            ),
            React.createElement('div', {
              style: {
                width: 36, height: 36, borderRadius: 12,
                background: `linear-gradient(135deg, ${t.primary}, ${t.cta})`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 11, fontFamily: 'Fredoka', fontWeight: 700, color: '#FFF',
                flexShrink: 0,
              }
            }, ch.avatar)
          ),
          React.createElement('div', { style: { marginBottom: 10 } },
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: 5 } },
              React.createElement('span', { style: { fontSize: 11, fontFamily: 'Nunito', color: t.textMuted, fontWeight: 600 } }, 'Progress'),
              React.createElement('span', { style: { fontSize: 11, fontFamily: 'Nunito', color: t.primary, fontWeight: 700 } }, `${ch.progress}%`)
            ),
            React.createElement('div', {
              style: { height: 6, background: t.border, borderRadius: 3, overflow: 'hidden' }
            },
              React.createElement('div', {
                style: {
                  height: '100%', width: `${ch.progress}%`,
                  background: `linear-gradient(90deg, ${t.primary}, ${t.cta})`,
                  borderRadius: 3,
                  transition: 'width 0.8s ease',
                }
              })
            )
          ),
          React.createElement('div', { style: { display: 'flex', gap: 12 } },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
              FlameIcon2 && React.createElement(FlameIcon2, { size: 13, color: t.primary }),
              React.createElement('span', { style: { fontSize: 11, color: t.textMuted, fontFamily: 'Nunito', fontWeight: 600 } }, `${ch.igniters} igniters`)
            ),
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
              ClockIcon && React.createElement(ClockIcon, { size: 13, color: t.cta }),
              React.createElement('span', { style: { fontSize: 11, color: t.textMuted, fontFamily: 'Nunito', fontWeight: 600 } }, `${ch.daysLeft}d left`)
            ),
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
              window.lucide.Zap && React.createElement(window.lucide.Zap, { size: 13, color: '#F472B6' }),
              React.createElement('span', { style: { fontSize: 11, color: t.textMuted, fontFamily: 'Nunito', fontWeight: 600 } }, `${ch.points} pts`)
            ),
          )
        );
      }),

      React.createElement('div', {
        style: {
          background: `linear-gradient(135deg, ${t.tag}, rgba(6,182,212,0.1))`,
          border: `1.5px solid ${t.border}`,
          borderRadius: 20,
          padding: 16,
          marginTop: 4,
          marginBottom: 8,
        }
      },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10 } },
          React.createElement('div', {
            style: {
              width: 44, height: 44, borderRadius: 14,
              background: `linear-gradient(135deg, ${t.cta}, #7C3AED)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
              boxShadow: `0 4px 12px rgba(6,182,212,0.35)`,
            }
          },
            window.lucide.Sparkles && React.createElement(window.lucide.Sparkles, { size: 20, color: '#FFF' })
          ),
          React.createElement('div', null,
            React.createElement('h4', {
              style: { fontFamily: 'Fredoka', fontSize: 15, fontWeight: 700, color: t.text, marginBottom: 2 }
            }, 'AI Muse has 3 ideas for you'),
            React.createElement('p', {
              style: { fontSize: 11, fontFamily: 'Nunito', color: t.textSec, lineHeight: 1.4 }
            }, 'Based on your cyberpunk illustration challenge')
          )
        )
      )
    )
  );
}

function ExploreScreen({ t, challenges, setActiveScreen, setActiveChallenge }) {
  const [filter, setFilter] = useState('All');
  const filters = ['All', 'Visual Art', 'Music', 'Writing', 'Film'];
  const SearchIcon = window.lucide.Search;
  const FilterIcon = window.lucide.SlidersHorizontal;

  const allChallenges = [
    ...challenges,
    {
      id: 4,
      title: 'Short Film Score — Sci-Fi Drama',
      creator: 'CosmicFrame',
      avatar: 'CF',
      category: 'Film',
      progress: 30,
      igniters: 1,
      daysLeft: 14,
      points: 200,
      needs: ['Ambient soundscapes', 'Tension music'],
      description: 'Scoring a 12-minute sci-fi short. Need eerie, atmospheric tracks that build tension without overwhelming dialogue.',
      contributions: []
    },
    {
      id: 5,
      title: '3D Character Concept — Bioluminescent Elf',
      creator: 'ZaraMesh',
      avatar: 'ZM',
      category: 'Visual Art',
      progress: 55,
      igniters: 5,
      daysLeft: 7,
      points: 390,
      needs: ['Anatomy reference', 'Texture feedback'],
      description: 'Designing a 3D character for an indie game. A forest elf with bioluminescent skin patterns. Need anatomy notes and surface detail advice.',
      contributions: []
    },
  ];

  const filtered = filter === 'All' ? allChallenges : allChallenges.filter(c => c.category === filter);

  return React.createElement('div', { style: { paddingBottom: 16 } },
    React.createElement('div', { style: { padding: '24px 16px 12px' } },
      React.createElement('h1', {
        style: { fontFamily: 'Fredoka', fontSize: 26, fontWeight: 700, color: t.text, marginBottom: 4 }
      }, 'Ignition Marketplace'),
      React.createElement('p', {
        style: { fontSize: 13, fontFamily: 'Nunito', color: t.textSec, marginBottom: 16 }
      }, 'Find sparks to ignite today'),

      React.createElement('div', {
        style: {
          display: 'flex', alignItems: 'center', gap: 10,
          background: t.inputBg, borderRadius: 14,
          border: `1.5px solid ${t.border}`,
          padding: '10px 14px',
          marginBottom: 14,
        }
      },
        SearchIcon && React.createElement(SearchIcon, { size: 18, color: t.textMuted }),
        React.createElement('span', {
          style: { fontSize: 14, fontFamily: 'Nunito', color: t.textMuted, flex: 1 }
        }, 'Search challenges…')
      ),

      React.createElement('div', { style: { display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 } },
        filters.map(f =>
          React.createElement('button', {
            key: f,
            onClick: () => setFilter(f),
            className: 'btn-press',
            style: {
              flexShrink: 0,
              padding: '7px 16px',
              borderRadius: 20,
              border: filter === f ? 'none' : `1.5px solid ${t.border}`,
              background: filter === f ? `linear-gradient(135deg, ${t.primary}, ${t.secondary})` : t.card,
              color: filter === f ? '#FFF' : t.textMuted,
              fontSize: 12, fontFamily: 'Nunito', fontWeight: 700,
              cursor: 'pointer',
              boxShadow: filter === f ? `0 3px 10px rgba(236,72,153,0.35)` : 'none',
              transition: 'all 0.2s',
            }
          }, f)
        )
      )
    ),

    React.createElement('div', { style: { padding: '0 16px' } },
      filtered.map((ch, i) => {
        const ClockIcon = window.lucide.Clock;
        const ZapIcon = window.lucide.Zap;
        const FlameIcon = window.lucide.Flame;
        const ChevronRight = window.lucide.ChevronRight;
        return React.createElement('div', {
          key: ch.id,
          className: 'card-hover',
          onClick: () => { setActiveChallenge(ch); setActiveScreen('challenge'); },
          style: {
            background: t.card,
            borderRadius: 20,
            padding: 16,
            marginBottom: 12,
            border: `1.5px solid ${t.border}`,
            cursor: 'pointer',
            animation: `slideUp ${0.15 + i * 0.06}s ease forwards`,
            boxShadow: `0 2px 12px rgba(236,72,153,0.06)`,
          }
        },
          React.createElement('div', { style: { display: 'flex', gap: 12, alignItems: 'flex-start' } },
            React.createElement('div', {
              style: {
                width: 44, height: 44, borderRadius: 14,
                background: `linear-gradient(135deg, ${t.primary}, ${t.cta})`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 13, fontFamily: 'Fredoka', fontWeight: 700, color: '#FFF',
                flexShrink: 0,
              }
            }, ch.avatar),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' } },
                React.createElement('div', null,
                  React.createElement('span', {
                    style: {
                      display: 'inline-block', background: t.tag, color: t.tagText,
                      fontSize: 9, fontFamily: 'Nunito', fontWeight: 700,
                      padding: '2px 7px', borderRadius: 20, marginBottom: 4,
                    }
                  }, ch.category),
                  React.createElement('h3', {
                    style: { fontFamily: 'Fredoka', fontSize: 15, fontWeight: 600, color: t.text, lineHeight: 1.2 }
                  }, ch.title),
                  React.createElement('p', {
                    style: { fontSize: 11, color: t.textMuted, fontFamily: 'Nunito', marginTop: 2 }
                  }, `by ${ch.creator}`)
                ),
                ChevronRight && React.createElement(ChevronRight, { size: 16, color: t.textMuted })
              ),
              React.createElement('div', { style: { display: 'flex', gap: 10, marginTop: 8 } },
                React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 3 } },
                  ClockIcon && React.createElement(ClockIcon, { size: 12, color: t.cta }),
                  React.createElement('span', { style: { fontSize: 11, color: t.textMuted, fontFamily: 'Nunito', fontWeight: 600 } }, `${ch.daysLeft}d`)
                ),
                React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 3 } },
                  FlameIcon && React.createElement(FlameIcon, { size: 12, color: t.primary }),
                  React.createElement('span', { style: { fontSize: 11, color: t.textMuted, fontFamily: 'Nunito', fontWeight: 600 } }, `${ch.igniters}`)
                ),
                React.createElement('div', { style: { flex: 1, display: 'flex', alignItems: 'center', gap: 6 } },
                  React.createElement('div', { style: { flex: 1, height: 5, background: t.border, borderRadius: 3, overflow: 'hidden' } },
                    React.createElement('div', {
                      style: {
                        height: '100%', width: `${ch.progress}%`,
                        background: `linear-gradient(90deg, ${t.primary}, ${t.cta})`,
                        borderRadius: 3,
                      }
                    })
                  ),
                  React.createElement('span', { style: { fontSize: 10, color: t.primary, fontFamily: 'Nunito', fontWeight: 700 } }, `${ch.progress}%`)
                )
              )
            )
          )
        );
      })
    )
  );
}

function CreateScreen({ t, setActiveScreen }) {
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const categories = ['Visual Art', 'Music', 'Writing', 'Film', 'Design', 'Code'];

  const CheckCircle = window.lucide.CheckCircle2;
  const ArrowRight = window.lucide.ArrowRight;
  const Sparkles = window.lucide.Sparkles;

  const inputStyle = {
    width: '100%', padding: '12px 14px',
    background: t.inputBg, border: `1.5px solid ${t.border}`,
    borderRadius: 14, fontSize: 14, fontFamily: 'Nunito', fontWeight: 500,
    color: t.text, outline: 'none',
    transition: 'border-color 0.2s',
  };

  return React.createElement('div', { style: { padding: '24px 16px 16px' } },
    React.createElement('h1', {
      style: { fontFamily: 'Fredoka', fontSize: 26, fontWeight: 700, color: t.text, marginBottom: 4 }
    }, 'New Spark Challenge'),
    React.createElement('p', {
      style: { fontSize: 13, fontFamily: 'Nunito', color: t.textSec, marginBottom: 20 }
    }, 'Define your creative goal and invite the community'),

    React.createElement('div', { style: { display: 'flex', gap: 8, marginBottom: 24 } },
      [1, 2, 3].map(s =>
        React.createElement('div', { key: s, style: { flex: 1, display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'center' } },
          React.createElement('div', {
            style: {
              width: 28, height: 28, borderRadius: '50%',
              background: step >= s ? `linear-gradient(135deg, ${t.primary}, ${t.cta})` : t.border,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 12, fontFamily: 'Fredoka', fontWeight: 700,
              color: step >= s ? '#FFF' : t.textMuted,
              transition: 'all 0.3s',
            }
          }, step > s ? (CheckCircle ? React.createElement(CheckCircle, { size: 14, color: '#FFF' }) : '✓') : s),
          React.createElement('div', { style: { height: 3, width: '100%', background: step > s ? t.primary : t.border, borderRadius: 2, transition: 'background 0.3s' } })
        )
      )
    ),

    step === 1 && React.createElement('div', { style: { animation: 'fadeIn 0.25s ease' } },
      React.createElement('label', { style: { display: 'block', fontSize: 13, fontFamily: 'Nunito', fontWeight: 700, color: t.text, marginBottom: 8 } }, 'Challenge Title'),
      React.createElement('input', {
        style: inputStyle,
        placeholder: 'e.g. Cyberpunk Novel Cover Art',
        value: title,
        onChange: e => setTitle(e.target.value),
      }),
      React.createElement('label', { style: { display: 'block', fontSize: 13, fontFamily: 'Nunito', fontWeight: 700, color: t.text, margin: '16px 0 8px' } }, 'Category'),
      React.createElement('div', { style: { display: 'flex', flexWrap: 'wrap', gap: 8 } },
        categories.map(c =>
          React.createElement('button', {
            key: c,
            onClick: () => setCategory(c),
            className: 'btn-press',
            style: {
              padding: '8px 14px', borderRadius: 20,
              border: category === c ? 'none' : `1.5px solid ${t.border}`,
              background: category === c ? `linear-gradient(135deg, ${t.primary}, ${t.secondary})` : t.card,
              color: category === c ? '#FFF' : t.textSec,
              fontSize: 12, fontFamily: 'Nunito', fontWeight: 700, cursor: 'pointer',
              transition: 'all 0.2s',
            }
          }, c)
        )
      )
    ),

    step === 2 && React.createElement('div', { style: { animation: 'fadeIn 0.25s ease' } },
      React.createElement('label', { style: { display: 'block', fontSize: 13, fontFamily: 'Nunito', fontWeight: 700, color: t.text, marginBottom: 8 } }, 'Describe your challenge'),
      React.createElement('textarea', {
        style: { ...inputStyle, minHeight: 100, resize: 'none', lineHeight: 1.6 },
        placeholder: 'What are you creating? What specific help do you need from the community?',
        value: description,
        onChange: e => setDescription(e.target.value),
      }),
      React.createElement('label', { style: { display: 'block', fontSize: 13, fontFamily: 'Nunito', fontWeight: 700, color: t.text, margin: '16px 0 8px' } }, 'Deadline'),
      React.createElement('div', { style: { display: 'flex', gap: 8 } },
        ['3 days', '1 week', '2 weeks', '1 month'].map(d =>
          React.createElement('button', {
            key: d, className: 'btn-press',
            style: {
              flex: 1, padding: '9px 4px',
              borderRadius: 12, border: `1.5px solid ${t.border}`,
              background: t.card, color: t.textSec,
              fontSize: 11, fontFamily: 'Nunito', fontWeight: 700, cursor: 'pointer',
            }
          }, d)
        )
      )
    ),

    step === 3 && React.createElement('div', { style: { animation: 'fadeIn 0.25s ease' } },
      React.createElement('div', {
        style: {
          background: t.cardAlt, border: `1.5px solid ${t.border}`,
          borderRadius: 20, padding: 16, marginBottom: 16,
        }
      },
        React.createElement('h3', { style: { fontFamily: 'Fredoka', fontSize: 18, fontWeight: 700, color: t.text, marginBottom: 6 } }, title || 'Your Challenge Title'),
        React.createElement('span', {
          style: {
            display: 'inline-block', background: t.tag, color: t.tagText,
            fontSize: 10, fontFamily: 'Nunito', fontWeight: 700,
            padding: '2px 8px', borderRadius: 20, marginBottom: 8,
          }
        }, category || 'Category'),
        React.createElement('p', { style: { fontSize: 13, fontFamily: 'Nunito', color: t.textSec, lineHeight: 1.6 } }, description || 'Your challenge description will appear here.')
      ),
      React.createElement('div', {
        style: {
          background: `linear-gradient(135deg, rgba(6,182,212,0.1), rgba(236,72,153,0.1))`,
          border: `1.5px solid ${t.border}`,
          borderRadius: 20, padding: 14, marginBottom: 16,
          display: 'flex', alignItems: 'center', gap: 10,
        }
      },
        Sparkles && React.createElement(Sparkles, { size: 20, color: t.cta }),
        React.createElement('p', { style: { fontSize: 12, fontFamily: 'Nunito', color: t.textSec, lineHeight: 1.5 } },
          'AI Muse will suggest relevant contributors and resources once your challenge is live.'
        )
      )
    ),

    React.createElement('div', { style: { display: 'flex', gap: 10, marginTop: 24 } },
      step > 1 && React.createElement('button', {
        onClick: () => setStep(step - 1),
        className: 'btn-press',
        style: {
          flex: 1, padding: '14px', borderRadius: 16,
          border: `1.5px solid ${t.border}`, background: t.card,
          color: t.textSec, fontSize: 15, fontFamily: 'Fredoka', fontWeight: 600,
          cursor: 'pointer',
        }
      }, 'Back'),
      React.createElement('button', {
        onClick: () => step < 3 ? setStep(step + 1) : setActiveScreen('home'),
        className: 'btn-press',
        style: {
          flex: 2, padding: '14px',
          borderRadius: 16, border: 'none',
          background: `linear-gradient(135deg, ${t.primary}, ${t.cta})`,
          color: '#FFF', fontSize: 15, fontFamily: 'Fredoka', fontWeight: 700,
          cursor: 'pointer',
          boxShadow: `0 4px 16px rgba(236,72,153,0.4)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        }
      },
        step < 3 ? 'Continue' : 'Launch Spark',
        ArrowRight && React.createElement(ArrowRight, { size: 17, color: '#FFF' })
      )
    )
  );
}

function ChallengeScreen({ t, challenge, setActiveScreen }) {
  const [ignited, setIgnited] = useState(false);
  const [message, setMessage] = useState('');
  const ArrowLeft = window.lucide.ArrowLeft;
  const Flame = window.lucide.Flame;
  const MessageCircle = window.lucide.MessageCircle;
  const Zap = window.lucide.Zap;
  const Send = window.lucide.Send;
  const Sparkles = window.lucide.Sparkles;

  const messages = [
    { user: 'EditWitch', text: 'The pacing in the second act slows a bit — maybe cut the garden description to two paragraphs max?', time: '3h ago', isAI: false },
    { user: 'PlotSmith', text: 'Love the sentient root idea! Could tie it to a foreshadowing element in Chapter 1.', time: '8h ago', isAI: false },
    { user: 'AI Muse', text: 'Based on your writing style, you might explore "The Buried Giant" by Ishiguro for pacing inspiration in dual-timeline narratives.', time: '1d ago', isAI: true },
  ];

  return React.createElement('div', { style: { paddingBottom: 16 } },
    React.createElement('div', {
      style: {
        background: `linear-gradient(145deg, ${t.primary}22, ${t.cta}15)`,
        padding: '20px 16px 16px',
        borderBottom: `1.5px solid ${t.border}`,
      }
    },
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 } },
        React.createElement('button', {
          onClick: () => setActiveScreen('explore'),
          className: 'btn-press',
          style: {
            width: 36, height: 36, borderRadius: 12,
            background: t.card, border: `1.5px solid ${t.border}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
          }
        },
          ArrowLeft && React.createElement(ArrowLeft, { size: 18, color: t.text })
        ),
        React.createElement('span', { style: { fontSize: 13, fontFamily: 'Nunito', color: t.textSec, fontWeight: 600 } }, 'Challenge Detail')
      ),
      React.createElement('span', {
        style: {
          display: 'inline-block', background: t.tag, color: t.tagText,
          fontSize: 10, fontFamily: 'Nunito', fontWeight: 700,
          padding: '2px 8px', borderRadius: 20, marginBottom: 6,
        }
      }, challenge.category),
      React.createElement('h1', {
        style: { fontFamily: 'Fredoka', fontSize: 22, fontWeight: 700, color: t.text, lineHeight: 1.2, marginBottom: 6 }
      }, challenge.title),
      React.createElement('p', {
        style: { fontSize: 13, fontFamily: 'Nunito', color: t.textSec, lineHeight: 1.6, marginBottom: 12 }
      }, challenge.description),

      React.createElement('div', { style: { marginBottom: 12 } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: 6 } },
          React.createElement('span', { style: { fontSize: 12, fontFamily: 'Nunito', fontWeight: 700, color: t.text } }, 'Forge Progress'),
          React.createElement('span', { style: { fontSize: 12, fontFamily: 'Nunito', fontWeight: 700, color: t.primary } }, `${challenge.progress}%`)
        ),
        React.createElement('div', { style: { height: 8, background: t.border, borderRadius: 4, overflow: 'hidden' } },
          React.createElement('div', {
            style: {
              height: '100%', width: `${challenge.progress}%`,
              background: `linear-gradient(90deg, ${t.primary}, ${t.cta})`,
              borderRadius: 4,
            }
          })
        )
      ),

      React.createElement('div', { style: { display: 'flex', gap: 8 } },
        challenge.needs.map(n =>
          React.createElement('span', {
            key: n,
            style: {
              flex: 1, textAlign: 'center',
              background: `rgba(6,182,212,0.12)`, color: t.cta,
              fontSize: 10, fontFamily: 'Nunito', fontWeight: 700,
              padding: '5px 8px', borderRadius: 10,
              border: `1px solid rgba(6,182,212,0.25)`,
            }
          }, n)
        )
      )
    ),

    React.createElement('div', { style: { padding: '16px 16px 8px' } },
      React.createElement('h3', {
        style: { fontFamily: 'Fredoka', fontSize: 16, fontWeight: 700, color: t.text, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }
      },
        MessageCircle && React.createElement(MessageCircle, { size: 16, color: t.primary }),
        'Critique Chamber'
      ),
      messages.map((m, i) =>
        React.createElement('div', {
          key: i,
          style: {
            background: m.isAI ? `linear-gradient(135deg, rgba(6,182,212,0.08), rgba(124,58,237,0.08))` : t.card,
            border: `1.5px solid ${m.isAI ? 'rgba(6,182,212,0.25)' : t.border}`,
            borderRadius: 16, padding: 12, marginBottom: 8,
          }
        },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 } },
            m.isAI
              ? React.createElement('div', {
                  style: {
                    width: 24, height: 24, borderRadius: 8,
                    background: `linear-gradient(135deg, ${t.cta}, #7C3AED)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }
                }, Sparkles && React.createElement(Sparkles, { size: 12, color: '#FFF' }))
              : React.createElement('div', {
                  style: {
                    width: 24, height: 24, borderRadius: 8,
                    background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 9, fontFamily: 'Fredoka', fontWeight: 700, color: '#FFF',
                  }
                }, m.user.slice(0, 2).toUpperCase()),
            React.createElement('span', { style: { fontSize: 12, fontFamily: 'Nunito', fontWeight: 700, color: m.isAI ? t.cta : t.text } }, m.user),
            React.createElement('span', { style: { fontSize: 10, color: t.textMuted, fontFamily: 'Nunito', marginLeft: 'auto' } }, m.time)
          ),
          React.createElement('p', { style: { fontSize: 12, fontFamily: 'Nunito', color: t.textSec, lineHeight: 1.6 } }, m.text)
        )
      ),

      React.createElement('div', {
        style: {
          display: 'flex', gap: 8, alignItems: 'center',
          background: t.inputBg, borderRadius: 14,
          border: `1.5px solid ${t.border}`,
          padding: '8px 8px 8px 14px',
          marginTop: 8,
        }
      },
        React.createElement('input', {
          style: {
            flex: 1, background: 'none', border: 'none', outline: 'none',
            fontSize: 13, fontFamily: 'Nunito', color: t.text,
          },
          placeholder: 'Share feedback or a resource…',
          value: message,
          onChange: e => setMessage(e.target.value),
        }),
        React.createElement('button', {
          className: 'btn-press',
          style: {
            width: 36, height: 36, borderRadius: 10,
            background: `linear-gradient(135deg, ${t.primary}, ${t.cta})`,
            border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }
        }, Send && React.createElement(Send, { size: 15, color: '#FFF' }))
      )
    ),

    React.createElement('div', { style: { padding: '0 16px 8px' } },
      React.createElement('button', {
        onClick: () => setIgnited(!ignited),
        className: 'btn-press',
        style: {
          width: '100%', padding: '15px',
          borderRadius: 18, border: 'none',
          background: ignited
            ? `linear-gradient(135deg, #10B981, #059669)`
            : `linear-gradient(135deg, ${t.primary}, ${t.cta})`,
          color: '#FFF', fontSize: 16, fontFamily: 'Fredoka', fontWeight: 700,
          cursor: 'pointer',
          boxShadow: ignited
            ? `0 4px 16px rgba(16,185,129,0.4)`
            : `0 4px 16px rgba(236,72,153,0.4)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          transition: 'all 0.3s',
        }
      },
        Flame && React.createElement(Flame, { size: 18, color: '#FFF' }),
        ignited ? 'Ignited! +' + challenge.points + ' pts pending' : 'Ignite This Challenge'
      )
    )
  );
}

function ProfileScreen({ t, darkMode, setDarkMode }) {
  const achievements = [
    { label: 'First Spark', icon: 'Flame', color: '#EC4899', earned: true },
    { label: 'Igniter x5', icon: 'Zap', color: '#06B6D4', earned: true },
    { label: 'Forge Master', icon: 'Award', color: '#F472B6', earned: false },
    { label: 'AI Whisperer', icon: 'Sparkles', color: '#7C3AED', earned: false },
  ];

  const skills = [
    { name: 'Illustration', level: 82 },
    { name: 'Storytelling', level: 67 },
    { name: 'Music Theory', level: 44 },
  ];

  const Settings = window.lucide.Settings;
  const Award = window.lucide.Award;
  const TrendingUp = window.lucide.TrendingUp;
  const Bell = window.lucide.Bell;
  const Moon = window.lucide.Moon;
  const Sun = window.lucide.Sun;
  const ChevronRight = window.lucide.ChevronRight;

  return React.createElement('div', { style: { paddingBottom: 16 } },
    React.createElement('div', {
      style: {
        background: `linear-gradient(145deg, #EC4899 0%, #F472B6 60%, #06B6D4 100%)`,
        padding: '28px 20px 32px',
        position: 'relative', overflow: 'hidden',
        textAlign: 'center',
      }
    },
      React.createElement('div', { style: { position: 'absolute', top: -40, right: -40, width: 160, height: 160, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' } }),
      React.createElement('div', {
        style: {
          width: 72, height: 72, borderRadius: 24,
          background: 'rgba(255,255,255,0.25)',
          border: '3px solid rgba(255,255,255,0.5)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 26, fontFamily: 'Fredoka', fontWeight: 700, color: '#FFF',
          margin: '0 auto 10px',
          backdropFilter: 'blur(8px)',
        }
      }, 'AN'),
      React.createElement('h2', { style: { fontFamily: 'Fredoka', fontSize: 22, fontWeight: 700, color: '#FFF' } }, 'Aria Nova'),
      React.createElement('p', { style: { fontSize: 12, fontFamily: 'Nunito', color: 'rgba(255,255,255,0.85)', marginTop: 2 } }, '@aria.nova · Creative Director'),
      React.createElement('div', {
        style: {
          display: 'inline-flex', alignItems: 'center', gap: 6,
          background: 'rgba(255,255,255,0.2)', borderRadius: 20,
          padding: '5px 14px', marginTop: 10,
          backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.3)',
        }
      },
        window.lucide.Zap && React.createElement(window.lucide.Zap, { size: 14, color: '#FFF' }),
        React.createElement('span', { style: { fontSize: 13, fontFamily: 'Fredoka', fontWeight: 700, color: '#FFF' } }, '1,240 Forge Points')
      )
    ),

    React.createElement('div', { style: { padding: '16px 16px 0' } },
      React.createElement('div', { style: { display: 'flex', gap: 10, marginBottom: 20 } },
        [['8', 'Challenges'], ['23', 'Ignitions'], ['94%', 'Success']].map(([v, l]) =>
          React.createElement('div', {
            key: l,
            style: {
              flex: 1, textAlign: 'center', background: t.card,
              borderRadius: 16, padding: '12px 8px',
              border: `1.5px solid ${t.border}`,
              boxShadow: `0 2px 8px rgba(236,72,153,0.07)`,
            }
          },
            React.createElement('div', { style: { fontFamily: 'Fredoka', fontSize: 22, fontWeight: 700, color: t.primary } }, v),
            React.createElement('div', { style: { fontSize: 11, fontFamily: 'Nunito', color: t.textMuted, fontWeight: 600 } }, l)
          )
        )
      ),

      React.createElement('h3', { style: { fontFamily: 'Fredoka', fontSize: 16, fontWeight: 700, color: t.text, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 } },
        Award && React.createElement(Award, { size: 16, color: t.primary }), 'Achievements'
      ),
      React.createElement('div', { style: { display: 'flex', gap: 10, marginBottom: 20 } },
        achievements.map(a => {
          const Icon = window.lucide[a.icon];
          return React.createElement('div', {
            key: a.label,
            className: 'float-badge',
            style: {
              flex: 1, textAlign: 'center',
              background: a.earned ? t.card : t.cardAlt,
              borderRadius: 16, padding: '12px 6px',
              border: `1.5px solid ${a.earned ? a.color + '40' : t.border}`,
              opacity: a.earned ? 1 : 0.5,
            }
          },
            React.createElement('div', {
              style: {
                width: 36, height: 36, borderRadius: 12,
                background: a.earned ? `${a.color}22` : t.border,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 6px',
              }
            },
              Icon && React.createElement(Icon, { size: 18, color: a.earned ? a.color : t.textMuted })
            ),
            React.createElement('div', { style: { fontSize: 9, fontFamily: 'Nunito', fontWeight: 700, color: a.earned ? t.text : t.textMuted, lineHeight: 1.3 } }, a.label)
          );
        })
      ),

      React.createElement('h3', { style: { fontFamily: 'Fredoka', fontSize: 16, fontWeight: 700, color: t.text, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 } },
        TrendingUp && React.createElement(TrendingUp, { size: 16, color: t.primary }), 'Creative Skills'
      ),
      skills.map(s =>
        React.createElement('div', { key: s.name, style: { marginBottom: 12 } },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: 5 } },
            React.createElement('span', { style: { fontSize: 12, fontFamily: 'Nunito', fontWeight: 700, color: t.text } }, s.name),
            React.createElement('span', { style: { fontSize: 12, fontFamily: 'Nunito', fontWeight: 700, color: t.primary } }, `${s.level}%`)
          ),
          React.createElement('div', { style: { height: 7, background: t.border, borderRadius: 4, overflow: 'hidden' } },
            React.createElement('div', {
              style: {
                height: '100%', width: `${s.level}%`,
                background: `linear-gradient(90deg, ${t.primary}, ${t.secondary})`,
                borderRadius: 4,
              }
            })
          )
        )
      ),

      React.createElement('div', {
        style: {
          background: t.card, borderRadius: 20,
          border: `1.5px solid ${t.border}`,
          overflow: 'hidden', marginTop: 8,
        }
      },
        [
          { icon: 'Bell', label: 'Notifications', sub: 'Push & email alerts' },
          { icon: darkMode ? 'Sun' : 'Moon', label: darkMode ? 'Light Mode' : 'Dark Mode', sub: 'Toggle appearance', onClick: () => setDarkMode(!darkMode) },
          { icon: 'Settings', label: 'Settings', sub: 'Account & privacy' },
        ].map((item, i, arr) => {
          const Icon = window.lucide[item.icon];
          return React.createElement('button', {
            key: item.label,
            onClick: item.onClick || (() => {}),
            className: 'btn-press',
            style: {
              width: '100%', display: 'flex', alignItems: 'center', gap: 12,
              padding: '13px 16px',
              background: 'none', border: 'none', cursor: 'pointer',
              borderBottom: i < arr.length - 1 ? `1px solid ${t.border}` : 'none',
              textAlign: 'left',
            }
          },
            React.createElement('div', {
              style: {
                width: 36, height: 36, borderRadius: 12,
                background: t.tag,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }
            },
              Icon && React.createElement(Icon, { size: 18, color: t.primary })
            ),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', { style: { fontSize: 13, fontFamily: 'Nunito', fontWeight: 700, color: t.text } }, item.label),
              React.createElement('div', { style: { fontSize: 11, fontFamily: 'Nunito', color: t.textMuted } }, item.sub)
            ),
            ChevronRight && React.createElement(ChevronRight, { size: 16, color: t.textMuted })
          );
        })
      )
    )
  );
}
