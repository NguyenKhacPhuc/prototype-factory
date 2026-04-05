const { useState, useEffect, useRef } = React;

function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [theme, setTheme] = useState('dark');

  const themes = {
    dark: {
      bg: '#0D0F1A',
      surface: '#161928',
      surfaceAlt: '#1E2236',
      card: '#1A1E30',
      cardHover: '#222640',
      primary: '#2979FF',
      secondary: '#FF5252',
      cta: '#EC4899',
      text: '#F0F2FF',
      textMuted: '#8B93B8',
      textDim: '#525A7A',
      border: '#252A45',
      navBg: '#10131F',
    },
    light: {
      bg: '#FAFAFA',
      surface: '#FFFFFF',
      surfaceAlt: '#F4F5FB',
      card: '#FFFFFF',
      cardHover: '#F0F3FF',
      primary: '#2979FF',
      secondary: '#FF5252',
      cta: '#EC4899',
      text: '#0D0F1A',
      textMuted: '#525A7A',
      textDim: '#8B93B8',
      border: '#E2E5F0',
      navBg: '#FFFFFF',
    }
  };

  const t = themes[theme];

  const fontStyle = `
    @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Nunito:wght@400;500;600;700&display=swap');

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(12px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(24px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
    @keyframes shimmer {
      0% { background-position: -200% center; }
      100% { background-position: 200% center; }
    }
    @keyframes floatUp {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-6px); }
      100% { transform: translateY(0px); }
    }
    @keyframes glow {
      0%, 100% { box-shadow: 0 0 8px rgba(41,121,255,0.4); }
      50% { box-shadow: 0 0 24px rgba(41,121,255,0.8); }
    }
    @keyframes branchGrow {
      from { stroke-dashoffset: 200; }
      to { stroke-dashoffset: 0; }
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    ::-webkit-scrollbar { width: 0px; }
  `;

  const screens = {
    home: HomeScreen,
    explore: ExploreScreen,
    forge: ForgeScreen,
    map: MapScreen,
    profile: ProfileScreen,
  };

  const ScreenComponent = screens[activeScreen];

  return React.createElement('div', {
    style: {
      minHeight: '100vh',
      background: '#f0f0f0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Nunito', sans-serif",
    }
  },
    React.createElement('style', null, fontStyle),
    React.createElement('div', {
      style: {
        width: '375px',
        height: '812px',
        background: t.bg,
        borderRadius: '44px',
        overflow: 'hidden',
        position: 'relative',
        boxShadow: '0 32px 80px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.06)',
        display: 'flex',
        flexDirection: 'column',
      }
    },
      React.createElement(ScreenComponent, { t, theme, setTheme, setActiveScreen }),
      React.createElement(BottomNav, { activeScreen, setActiveScreen, t })
    )
  );
}

// ─── Bottom Navigation ───────────────────────────────────────────────────────

function BottomNav({ activeScreen, setActiveScreen, t }) {
  const tabs = [
    { id: 'home', icon: 'Newspaper', label: 'Feed' },
    { id: 'explore', icon: 'Compass', label: 'Enclaves' },
    { id: 'forge', icon: 'Feather', label: 'Forge' },
    { id: 'map', icon: 'GitBranch', label: 'Saga Map' },
    { id: 'profile', icon: 'User', label: 'Profile' },
  ];

  return React.createElement('div', {
    style: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: '72px',
      background: t.navBg,
      borderTop: `1px solid ${t.border}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      paddingBottom: '8px',
      zIndex: 100,
    }
  },
    tabs.map(tab => {
      const isActive = activeScreen === tab.id;
      const Icon = window.lucide[tab.icon];
      return React.createElement('button', {
        key: tab.id,
        onClick: () => setActiveScreen(tab.id),
        style: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '3px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '8px 12px',
          borderRadius: '12px',
          transition: 'all 0.2s',
          minWidth: '44px',
          minHeight: '44px',
          justifyContent: 'center',
        }
      },
        tab.id === 'forge'
          ? React.createElement('div', {
              style: {
                width: '44px',
                height: '44px',
                borderRadius: '14px',
                background: `linear-gradient(135deg, ${t.primary}, ${t.cta})`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: isActive ? `0 4px 16px rgba(41,121,255,0.5)` : 'none',
                transform: isActive ? 'scale(1.05)' : 'scale(1)',
                transition: 'all 0.2s',
                marginTop: '-12px',
              }
            },
              Icon && React.createElement(Icon, { size: 20, color: '#FFFFFF', strokeWidth: 2.5 })
            )
          : React.createElement(React.Fragment, null,
              Icon && React.createElement(Icon, {
                size: 22,
                color: isActive ? t.primary : t.textDim,
                strokeWidth: isActive ? 2.5 : 1.8,
              }),
              React.createElement('span', {
                style: {
                  fontSize: '10px',
                  color: isActive ? t.primary : t.textDim,
                  fontWeight: isActive ? 700 : 500,
                  fontFamily: "'Nunito', sans-serif",
                  lineHeight: 1,
                }
              }, tab.label)
            )
      );
    })
  );
}

// ─── Home Screen (Novelty Feed) ────────────────────────────────────────────

function HomeScreen({ t, theme, setTheme, setActiveScreen }) {
  const [activeFilter, setActiveFilter] = useState('trending');

  const filters = ['trending', 'forked', 'new', 'challenges'];

  const stories = [
    {
      id: 1,
      title: 'The Last Signal',
      enclave: 'Cosmic Horror',
      enclaveColor: '#7C3AED',
      excerpt: 'In the silence between stars, Dr. Mira Voss heard it — a repeating prime sequence from a dead sun. Her hands trembled as she calibrated the array...',
      forks: 7,
      contributors: 14,
      chapters: 23,
      trending: true,
      author: 'NebulaPen',
      timeAgo: '2h ago',
    },
    {
      id: 2,
      title: 'Neon Requiem',
      enclave: 'Cyberpunk Noir',
      enclaveColor: '#0891B2',
      excerpt: 'The rain never stopped in New Meridian. Detective Kael scrolled through the ghost-feed — memories of the dead, sold to the highest bidder...',
      forks: 12,
      contributors: 28,
      chapters: 41,
      trending: true,
      author: 'CipherDusk',
      timeAgo: '5h ago',
    },
    {
      id: 3,
      title: 'The Mushroom Throne',
      enclave: 'Whimsical Fantasy',
      enclaveColor: '#D97706',
      excerpt: 'Queen Mosswick had ruled the undergarden for three hundred years, but when the first iron boot crushed her sacred grove, she finally learned how to scream...',
      forks: 4,
      contributors: 9,
      chapters: 11,
      trending: false,
      author: 'FernQuill',
      timeAgo: '1d ago',
    },
    {
      id: 4,
      title: 'Echo Protocol',
      enclave: 'Cosmic Horror',
      enclaveColor: '#7C3AED',
      excerpt: 'They said the station had been dark for eleven years. But when Juno cracked the airlock, she heard children laughing inside...',
      forks: 19,
      contributors: 37,
      chapters: 58,
      trending: true,
      author: 'VoidWatcher',
      timeAgo: '30m ago',
    },
  ];

  return React.createElement('div', {
    style: {
      flex: 1,
      overflowY: 'auto',
      paddingBottom: '80px',
      animation: 'fadeIn 0.3s ease',
    }
  },
    // Header
    React.createElement('div', {
      style: {
        padding: '20px 20px 0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }
    },
      React.createElement('div', null,
        React.createElement('h1', {
          style: {
            fontFamily: "'Fredoka', sans-serif",
            fontSize: '26px',
            fontWeight: 700,
            color: t.text,
            lineHeight: 1.1,
          }
        }, 'EchoForge'),
        React.createElement('p', {
          style: { fontSize: '12px', color: t.textMuted, marginTop: '2px' }
        }, 'Craft evolving sagas, collaboratively.')
      ),
      React.createElement('div', { style: { display: 'flex', gap: '10px', alignItems: 'center' } },
        React.createElement('button', {
          onClick: () => setTheme(theme === 'dark' ? 'light' : 'dark'),
          style: {
            width: '36px', height: '36px',
            borderRadius: '10px',
            background: t.surfaceAlt,
            border: `1px solid ${t.border}`,
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }
        },
          React.createElement(theme === 'dark' ? window.lucide.Sun : window.lucide.Moon, {
            size: 16, color: t.textMuted
          })
        ),
        React.createElement('div', {
          style: {
            width: '36px', height: '36px',
            borderRadius: '10px',
            background: `linear-gradient(135deg, ${t.primary}, ${t.cta})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }
        },
          React.createElement(window.lucide.Bell, { size: 16, color: '#fff' })
        )
      )
    ),

    // Filter Tabs
    React.createElement('div', {
      style: {
        display: 'flex',
        gap: '8px',
        padding: '16px 20px',
        overflowX: 'auto',
      }
    },
      filters.map(f => React.createElement('button', {
        key: f,
        onClick: () => setActiveFilter(f),
        style: {
          padding: '7px 14px',
          borderRadius: '20px',
          border: 'none',
          cursor: 'pointer',
          fontSize: '12px',
          fontWeight: 700,
          fontFamily: "'Nunito', sans-serif",
          whiteSpace: 'nowrap',
          transition: 'all 0.2s',
          background: activeFilter === f ? t.primary : t.surfaceAlt,
          color: activeFilter === f ? '#fff' : t.textMuted,
          boxShadow: activeFilter === f ? `0 4px 12px rgba(41,121,255,0.4)` : 'none',
        }
      }, f.charAt(0).toUpperCase() + f.slice(1)))
    ),

    // AI Muse Banner
    React.createElement('div', {
      style: {
        margin: '0 20px 16px',
        padding: '14px 16px',
        borderRadius: '16px',
        background: `linear-gradient(135deg, rgba(41,121,255,0.15), rgba(236,72,153,0.15))`,
        border: `1px solid rgba(41,121,255,0.3)`,
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        cursor: 'pointer',
      }
    },
      React.createElement('div', {
        style: {
          width: '40px', height: '40px',
          borderRadius: '12px',
          background: `linear-gradient(135deg, ${t.primary}, ${t.cta})`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
          animation: 'glow 2s ease-in-out infinite',
        }
      },
        React.createElement(window.lucide.Sparkles, { size: 20, color: '#fff' })
      ),
      React.createElement('div', null,
        React.createElement('p', {
          style: {
            fontSize: '13px',
            fontWeight: 700,
            color: t.text,
            fontFamily: "'Fredoka', sans-serif",
          }
        }, 'AI Muse has a new prompt for you'),
        React.createElement('p', {
          style: { fontSize: '11px', color: t.textMuted }
        }, '"A stranger knocks on a door that shouldn\'t exist..."')
      ),
      React.createElement(window.lucide.ChevronRight, { size: 16, color: t.textMuted })
    ),

    // Story Cards
    ...stories.map((story, i) =>
      React.createElement('div', {
        key: story.id,
        onClick: () => setActiveScreen('map'),
        style: {
          margin: '0 20px 14px',
          padding: '16px',
          borderRadius: '18px',
          background: t.card,
          border: `1px solid ${t.border}`,
          cursor: 'pointer',
          transition: 'all 0.2s',
          animation: `slideUp 0.3s ease ${i * 0.05}s both`,
        }
      },
        // Enclave badge + trending
        React.createElement('div', {
          style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }
        },
          React.createElement('span', {
            style: {
              fontSize: '10px',
              fontWeight: 700,
              padding: '3px 10px',
              borderRadius: '20px',
              background: story.enclaveColor + '25',
              color: story.enclaveColor,
              border: `1px solid ${story.enclaveColor}40`,
            }
          }, story.enclave),
          story.trending && React.createElement('div', {
            style: { display: 'flex', alignItems: 'center', gap: '4px' }
          },
            React.createElement(window.lucide.TrendingUp, { size: 12, color: t.secondary }),
            React.createElement('span', { style: { fontSize: '10px', color: t.secondary, fontWeight: 700 } }, 'Trending')
          )
        ),

        // Title
        React.createElement('h3', {
          style: {
            fontFamily: "'Fredoka', sans-serif",
            fontSize: '18px',
            fontWeight: 700,
            color: t.text,
            marginBottom: '8px',
          }
        }, story.title),

        // Excerpt
        React.createElement('p', {
          style: {
            fontSize: '13px',
            color: t.textMuted,
            lineHeight: 1.6,
            marginBottom: '12px',
          }
        }, story.excerpt),

        // Stats
        React.createElement('div', {
          style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' }
        },
          React.createElement('div', { style: { display: 'flex', gap: '12px' } },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '4px' } },
              React.createElement(window.lucide.GitFork, { size: 12, color: t.primary }),
              React.createElement('span', { style: { fontSize: '11px', color: t.textMuted, fontWeight: 600 } }, `${story.forks} forks`)
            ),
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '4px' } },
              React.createElement(window.lucide.Users, { size: 12, color: t.cta }),
              React.createElement('span', { style: { fontSize: '11px', color: t.textMuted, fontWeight: 600 } }, `${story.contributors}`)
            ),
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '4px' } },
              React.createElement(window.lucide.BookOpen, { size: 12, color: t.textDim }),
              React.createElement('span', { style: { fontSize: '11px', color: t.textMuted, fontWeight: 600 } }, `${story.chapters} ch.`)
            )
          ),
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '6px' } },
            React.createElement('div', {
              style: {
                width: '20px', height: '20px',
                borderRadius: '6px',
                background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})`,
              }
            }),
            React.createElement('span', { style: { fontSize: '11px', color: t.textDim } }, story.timeAgo)
          )
        )
      )
    )
  );
}

// ─── Explore Screen (Enclaves) ─────────────────────────────────────────────

function ExploreScreen({ t, setActiveScreen }) {
  const [joined, setJoined] = useState([0, 2]);

  const enclaves = [
    {
      name: 'Cosmic Horror',
      icon: 'Telescope',
      color: '#7C3AED',
      gradient: 'linear-gradient(135deg, #7C3AED, #4C1D95)',
      members: '4.2k',
      stories: 318,
      description: 'Where the void stares back and ancient things dream.',
      tags: ['Lovecraftian', 'Sci-Fi Horror', 'Psychological'],
    },
    {
      name: 'Cyberpunk Noir',
      icon: 'Zap',
      color: '#0891B2',
      gradient: 'linear-gradient(135deg, #0891B2, #164E63)',
      members: '6.8k',
      stories: 527,
      description: 'Rain-slicked streets, neon ghosts, and corporate sins.',
      tags: ['Dystopia', 'Detective', 'Transhumanism'],
    },
    {
      name: 'Whimsical Fantasy',
      icon: 'Wand',
      color: '#D97706',
      gradient: 'linear-gradient(135deg, #D97706, #92400E)',
      members: '3.1k',
      stories: 204,
      description: 'Impossible gardens, forgotten spells, and talking rivers.',
      tags: ['Magic', 'Adventure', 'Folklore'],
    },
    {
      name: 'Gothic Romance',
      icon: 'Heart',
      color: '#BE185D',
      gradient: 'linear-gradient(135deg, #BE185D, #831843)',
      members: '2.9k',
      stories: 176,
      description: 'Love and dread intertwined in crumbling manors.',
      tags: ['Romance', 'Gothic', 'Mystery'],
    },
    {
      name: 'Solarpunk',
      icon: 'Leaf',
      color: '#16A34A',
      gradient: 'linear-gradient(135deg, #16A34A, #14532D)',
      members: '1.8k',
      stories: 93,
      description: 'Futures where humanity and nature flourish together.',
      tags: ['Utopia', 'Ecology', 'Community'],
    },
    {
      name: 'Weird West',
      icon: 'Mountain',
      color: '#B45309',
      gradient: 'linear-gradient(135deg, #B45309, #78350F)',
      members: '1.4k',
      stories: 88,
      description: 'Six-shooters and sorcery on the supernatural frontier.',
      tags: ['Western', 'Occult', 'Survival'],
    },
  ];

  return React.createElement('div', {
    style: {
      flex: 1,
      overflowY: 'auto',
      paddingBottom: '80px',
      animation: 'fadeIn 0.3s ease',
    }
  },
    React.createElement('div', {
      style: { padding: '20px 20px 0' }
    },
      React.createElement('h1', {
        style: {
          fontFamily: "'Fredoka', sans-serif",
          fontSize: '26px',
          fontWeight: 700,
          color: t.text,
          marginBottom: '4px',
        }
      }, 'Enclaves'),
      React.createElement('p', {
        style: { fontSize: '13px', color: t.textMuted, marginBottom: '16px' }
      }, 'Find your tribe. Shape your worlds.')
    ),

    // Search bar
    React.createElement('div', {
      style: {
        margin: '0 20px 20px',
        padding: '10px 14px',
        borderRadius: '14px',
        background: t.surfaceAlt,
        border: `1px solid ${t.border}`,
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
      }
    },
      React.createElement(window.lucide.Search, { size: 16, color: t.textDim }),
      React.createElement('span', { style: { fontSize: '13px', color: t.textDim } }, 'Search enclaves...')
    ),

    // Featured challenge
    React.createElement('div', {
      style: {
        margin: '0 20px 20px',
        padding: '18px',
        borderRadius: '20px',
        background: 'linear-gradient(135deg, #1a1440, #0f172a)',
        border: '1px solid rgba(124,58,237,0.4)',
        position: 'relative',
        overflow: 'hidden',
      }
    },
      React.createElement('div', {
        style: {
          position: 'absolute',
          top: '-20px', right: '-20px',
          width: '100px', height: '100px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124,58,237,0.3) 0%, transparent 70%)',
        }
      }),
      React.createElement('div', {
        style: { display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }
      },
        React.createElement(window.lucide.Trophy, { size: 14, color: '#F59E0B' }),
        React.createElement('span', { style: { fontSize: '11px', color: '#F59E0B', fontWeight: 700 } }, 'WEEKLY CHALLENGE')
      ),
      React.createElement('h3', {
        style: {
          fontFamily: "'Fredoka', sans-serif",
          fontSize: '17px',
          color: '#F0F2FF',
          fontWeight: 700,
          marginBottom: '6px',
        }
      }, 'The Liminal Door'),
      React.createElement('p', {
        style: { fontSize: '12px', color: '#8B93B8', lineHeight: 1.5, marginBottom: '12px' }
      }, 'Write a story that begins and ends in the exact same moment, but everything in between changes the meaning.'),
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' } },
        React.createElement('span', { style: { fontSize: '11px', color: '#8B93B8' } }, '3 days remaining • 47 entries'),
        React.createElement('button', {
          style: {
            padding: '7px 16px',
            borderRadius: '20px',
            border: 'none',
            background: '#7C3AED',
            color: '#fff',
            fontSize: '12px',
            fontWeight: 700,
            cursor: 'pointer',
            fontFamily: "'Nunito', sans-serif",
          }
        }, 'Enter')
      )
    ),

    // Enclaves grid
    React.createElement('div', { style: { padding: '0 20px' } },
      React.createElement('h2', {
        style: {
          fontFamily: "'Fredoka', sans-serif",
          fontSize: '16px',
          fontWeight: 700,
          color: t.text,
          marginBottom: '12px',
        }
      }, 'All Enclaves'),
      enclaves.map((enc, i) => {
        const Icon = window.lucide[enc.icon] || window.lucide.Star;
        const isJoined = joined.includes(i);
        return React.createElement('div', {
          key: i,
          style: {
            marginBottom: '12px',
            padding: '16px',
            borderRadius: '18px',
            background: t.card,
            border: `1px solid ${t.border}`,
            animation: `slideUp 0.3s ease ${i * 0.05}s both`,
          }
        },
          React.createElement('div', {
            style: { display: 'flex', alignItems: 'flex-start', gap: '12px' }
          },
            React.createElement('div', {
              style: {
                width: '48px', height: '48px',
                borderRadius: '14px',
                background: enc.gradient,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }
            },
              React.createElement(Icon, { size: 22, color: '#fff' })
            ),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', {
                style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }
              },
                React.createElement('h3', {
                  style: {
                    fontFamily: "'Fredoka', sans-serif",
                    fontSize: '16px',
                    fontWeight: 700,
                    color: t.text,
                  }
                }, enc.name),
                React.createElement('button', {
                  onClick: () => setJoined(isJoined ? joined.filter(j => j !== i) : [...joined, i]),
                  style: {
                    padding: '5px 12px',
                    borderRadius: '20px',
                    border: isJoined ? `1px solid ${enc.color}` : 'none',
                    background: isJoined ? 'transparent' : enc.color,
                    color: isJoined ? enc.color : '#fff',
                    fontSize: '11px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    fontFamily: "'Nunito', sans-serif",
                    transition: 'all 0.2s',
                    minWidth: '44px', minHeight: '44px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }
                }, isJoined ? 'Joined' : 'Join')
              ),
              React.createElement('p', {
                style: { fontSize: '12px', color: t.textMuted, marginBottom: '8px', lineHeight: 1.4 }
              }, enc.description),
              React.createElement('div', { style: { display: 'flex', gap: '10px', marginBottom: '8px' } },
                React.createElement('span', { style: { fontSize: '11px', color: t.textDim } }, `${enc.members} members`),
                React.createElement('span', { style: { fontSize: '11px', color: t.textDim } }, '•'),
                React.createElement('span', { style: { fontSize: '11px', color: t.textDim } }, `${enc.stories} stories`)
              ),
              React.createElement('div', { style: { display: 'flex', gap: '6px', flexWrap: 'wrap' } },
                enc.tags.map(tag => React.createElement('span', {
                  key: tag,
                  style: {
                    fontSize: '10px',
                    padding: '2px 8px',
                    borderRadius: '20px',
                    background: enc.color + '20',
                    color: enc.color,
                    fontWeight: 600,
                  }
                }, tag))
              )
            )
          )
        );
      })
    )
  );
}

// ─── Forge Screen (Create/Contribute) ─────────────────────────────────────

function ForgeScreen({ t }) {
  const [activeTab, setActiveTab] = useState('create');
  const [storyText, setStoryText] = useState('');
  const [showMuse, setShowMuse] = useState(false);
  const [selectedEnclave, setSelectedEnclave] = useState('Cosmic Horror');

  const musePrompts = [
    'The door had no handle on the inside.',
    'She remembered tomorrow before it happened.',
    'The last human alive answered a phone call.',
    'The map showed a room that didn\'t exist yet.',
  ];

  return React.createElement('div', {
    style: {
      flex: 1,
      overflowY: 'auto',
      paddingBottom: '80px',
      animation: 'fadeIn 0.3s ease',
    }
  },
    React.createElement('div', { style: { padding: '20px' } },
      React.createElement('h1', {
        style: {
          fontFamily: "'Fredoka', sans-serif",
          fontSize: '26px',
          fontWeight: 700,
          color: t.text,
          marginBottom: '4px',
        }
      }, 'Forge a Story'),
      React.createElement('p', {
        style: { fontSize: '13px', color: t.textMuted, marginBottom: '20px' }
      }, 'Ignite a new saga or stoke an existing flame.')
    ),

    // Tabs
    React.createElement('div', {
      style: {
        display: 'flex',
        margin: '0 20px 20px',
        background: t.surfaceAlt,
        borderRadius: '14px',
        padding: '4px',
      }
    },
      ['create', 'contribute'].map(tab => React.createElement('button', {
        key: tab,
        onClick: () => setActiveTab(tab),
        style: {
          flex: 1,
          padding: '10px',
          borderRadius: '10px',
          border: 'none',
          cursor: 'pointer',
          fontSize: '13px',
          fontWeight: 700,
          fontFamily: "'Nunito', sans-serif",
          transition: 'all 0.2s',
          background: activeTab === tab ? t.primary : 'transparent',
          color: activeTab === tab ? '#fff' : t.textMuted,
          boxShadow: activeTab === tab ? `0 2px 8px rgba(41,121,255,0.4)` : 'none',
        }
      }, tab === 'create' ? 'New Saga' : 'Contribute'))
    ),

    activeTab === 'create'
      ? React.createElement('div', { style: { padding: '0 20px' } },

          // Enclave selector
          React.createElement('label', {
            style: { fontSize: '12px', fontWeight: 700, color: t.textMuted, display: 'block', marginBottom: '8px' }
          }, 'ENCLAVE'),
          React.createElement('div', {
            style: {
              display: 'flex',
              gap: '8px',
              marginBottom: '16px',
              flexWrap: 'wrap',
            }
          },
            ['Cosmic Horror', 'Cyberpunk Noir', 'Whimsical Fantasy'].map(enc => React.createElement('button', {
              key: enc,
              onClick: () => setSelectedEnclave(enc),
              style: {
                padding: '7px 14px',
                borderRadius: '20px',
                border: `1px solid ${selectedEnclave === enc ? t.primary : t.border}`,
                background: selectedEnclave === enc ? `rgba(41,121,255,0.15)` : 'transparent',
                color: selectedEnclave === enc ? t.primary : t.textMuted,
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
                fontFamily: "'Nunito', sans-serif",
                transition: 'all 0.2s',
                minHeight: '44px',
              }
            }, enc))
          ),

          // Title input
          React.createElement('label', {
            style: { fontSize: '12px', fontWeight: 700, color: t.textMuted, display: 'block', marginBottom: '8px' }
          }, 'SAGA TITLE'),
          React.createElement('div', {
            style: {
              padding: '12px 14px',
              borderRadius: '14px',
              background: t.surfaceAlt,
              border: `1px solid ${t.border}`,
              marginBottom: '16px',
              fontSize: '14px',
              color: t.textDim,
              fontFamily: "'Fredoka', sans-serif",
            }
          }, 'Untitled Saga...'),

          // Opening paragraph
          React.createElement('div', {
            style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }
          },
            React.createElement('label', {
              style: { fontSize: '12px', fontWeight: 700, color: t.textMuted }
            }, 'OPENING PARAGRAPH'),
            React.createElement('button', {
              onClick: () => setShowMuse(!showMuse),
              style: {
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '5px 10px',
                borderRadius: '20px',
                border: 'none',
                background: `linear-gradient(135deg, rgba(41,121,255,0.2), rgba(236,72,153,0.2))`,
                color: t.primary,
                fontSize: '11px',
                fontWeight: 700,
                cursor: 'pointer',
                fontFamily: "'Nunito', sans-serif",
                minHeight: '44px',
              }
            },
              React.createElement(window.lucide.Sparkles, { size: 12, color: t.primary }),
              'AI Muse'
            )
          ),

          // Muse suggestions
          showMuse && React.createElement('div', {
            style: {
              padding: '12px',
              borderRadius: '14px',
              background: `linear-gradient(135deg, rgba(41,121,255,0.08), rgba(236,72,153,0.08))`,
              border: `1px solid rgba(41,121,255,0.2)`,
              marginBottom: '12px',
              animation: 'slideUp 0.2s ease',
            }
          },
            React.createElement('p', {
              style: { fontSize: '11px', fontWeight: 700, color: t.primary, marginBottom: '8px' }
            }, 'MUSE SUGGESTIONS'),
            musePrompts.map((p, i) => React.createElement('div', {
              key: i,
              style: {
                padding: '8px 10px',
                borderRadius: '10px',
                marginBottom: '6px',
                background: t.surfaceAlt,
                cursor: 'pointer',
                transition: 'all 0.15s',
              }
            },
              React.createElement('p', { style: { fontSize: '12px', color: t.text, lineHeight: 1.4 } }, `"${p}"`)
            ))
          ),

          React.createElement('div', {
            style: {
              padding: '14px',
              borderRadius: '14px',
              background: t.surfaceAlt,
              border: `1px solid ${t.border}`,
              minHeight: '120px',
              marginBottom: '16px',
              fontSize: '13px',
              color: t.textDim,
              lineHeight: 1.6,
            }
          }, 'Begin your saga here... the void awaits.'),

          // Settings row
          React.createElement('div', {
            style: {
              display: 'flex',
              gap: '10px',
              marginBottom: '20px',
            }
          },
            React.createElement('div', {
              style: {
                flex: 1,
                padding: '12px',
                borderRadius: '14px',
                background: t.surfaceAlt,
                border: `1px solid ${t.border}`,
              }
            },
              React.createElement('p', { style: { fontSize: '10px', color: t.textDim, fontWeight: 700, marginBottom: '4px' } }, 'FORKS'),
              React.createElement('p', { style: { fontSize: '13px', color: t.text, fontWeight: 600 } }, 'Enabled')
            ),
            React.createElement('div', {
              style: {
                flex: 1,
                padding: '12px',
                borderRadius: '14px',
                background: t.surfaceAlt,
                border: `1px solid ${t.border}`,
              }
            },
              React.createElement('p', { style: { fontSize: '10px', color: t.textDim, fontWeight: 700, marginBottom: '4px' } }, 'AI MUSE'),
              React.createElement('p', { style: { fontSize: '13px', color: t.text, fontWeight: 600 } }, 'Active')
            ),
            React.createElement('div', {
              style: {
                flex: 1,
                padding: '12px',
                borderRadius: '14px',
                background: t.surfaceAlt,
                border: `1px solid ${t.border}`,
              }
            },
              React.createElement('p', { style: { fontSize: '10px', color: t.textDim, fontWeight: 700, marginBottom: '4px' } }, 'OPEN TO'),
              React.createElement('p', { style: { fontSize: '13px', color: t.text, fontWeight: 600 } }, 'All')
            )
          ),

          // CTA
          React.createElement('button', {
            style: {
              width: '100%',
              padding: '16px',
              borderRadius: '16px',
              border: 'none',
              background: `linear-gradient(135deg, ${t.primary}, ${t.cta})`,
              color: '#fff',
              fontSize: '16px',
              fontWeight: 700,
              cursor: 'pointer',
              fontFamily: "'Fredoka', sans-serif",
              letterSpacing: '0.5px',
              boxShadow: `0 8px 24px rgba(41,121,255,0.4)`,
              transition: 'all 0.2s',
              minHeight: '44px',
            }
          }, 'Ignite the Saga')
        )

      // Contribute tab
      : React.createElement('div', { style: { padding: '0 20px' } },
          React.createElement('p', {
            style: { fontSize: '13px', color: t.textMuted, marginBottom: '16px' }
          }, 'Choose a saga to continue'),

          [
            { title: 'The Last Signal', chapter: 23, fork: 'Main' },
            { title: 'Neon Requiem', chapter: 41, fork: 'Branch: The Detective' },
            { title: 'Echo Protocol', chapter: 58, fork: 'Branch: Children' },
          ].map((s, i) => React.createElement('div', {
            key: i,
            style: {
              padding: '14px',
              borderRadius: '16px',
              background: t.card,
              border: `1px solid ${t.border}`,
              marginBottom: '10px',
              cursor: 'pointer',
              transition: 'all 0.2s',
              animation: `slideUp 0.3s ease ${i * 0.07}s both`,
            }
          },
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' } },
              React.createElement('h3', {
                style: { fontFamily: "'Fredoka', sans-serif", fontSize: '16px', fontWeight: 700, color: t.text }
              }, s.title),
              React.createElement('span', {
                style: {
                  fontSize: '10px',
                  padding: '3px 8px',
                  borderRadius: '20px',
                  background: `rgba(41,121,255,0.15)`,
                  color: t.primary,
                  fontWeight: 700,
                }
              }, `Ch. ${s.chapter}`)
            ),
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '6px' } },
              React.createElement(window.lucide.GitBranch, { size: 12, color: t.textDim }),
              React.createElement('span', { style: { fontSize: '12px', color: t.textMuted } }, s.fork)
            )
          ))
        )
  );
}

// ─── Map Screen (Spatial Narrative Map) ────────────────────────────────────

function MapScreen({ t }) {
  const [selectedNode, setSelectedNode] = useState(null);

  const nodes = [
    { id: 'root', x: 175, y: 60, label: 'Ch.1\nOrigin', type: 'root', chapter: 1 },
    { id: 'n1', x: 175, y: 130, label: 'Ch.2', type: 'main', chapter: 2 },
    { id: 'n2', x: 175, y: 200, label: 'Ch.3', type: 'main', chapter: 3 },
    { id: 'fork1a', x: 100, y: 280, label: 'F1\nDetective', type: 'fork', chapter: 4 },
    { id: 'fork1b', x: 250, y: 280, label: 'F1\nGhost', type: 'fork', chapter: 4 },
    { id: 'n3a', x: 100, y: 355, label: 'Ch.5', type: 'branch', chapter: 5 },
    { id: 'n3b', x: 250, y: 355, label: 'Ch.5', type: 'branch', chapter: 5 },
    { id: 'fork2a', x: 55, y: 430, label: 'F2', type: 'fork', chapter: 6 },
    { id: 'fork2b', x: 145, y: 430, label: 'F2', type: 'fork', chapter: 6 },
    { id: 'n4', x: 250, y: 430, label: 'Ch.6', type: 'branch', chapter: 6 },
    { id: 'leaf1', x: 55, y: 500, label: 'Ch.7', type: 'leaf', chapter: 7 },
    { id: 'leaf2', x: 145, y: 500, label: 'Ch.7', type: 'leaf', chapter: 7 },
    { id: 'leaf3', x: 210, y: 500, label: 'Ch.7', type: 'leaf', chapter: 7 },
    { id: 'leaf4', x: 290, y: 500, label: 'Ch.7', type: 'leaf', chapter: 7 },
  ];

  const edges = [
    ['root', 'n1'], ['n1', 'n2'], ['n2', 'fork1a'], ['n2', 'fork1b'],
    ['fork1a', 'n3a'], ['fork1b', 'n3b'],
    ['n3a', 'fork2a'], ['n3a', 'fork2b'], ['n3b', 'n4'],
    ['fork2a', 'leaf1'], ['fork2b', 'leaf2'],
    ['n4', 'leaf3'], ['n4', 'leaf4'],
  ];

  const getNodeStyle = (type) => {
    switch(type) {
      case 'root': return { fill: t.primary, size: 30, glow: t.primary };
      case 'main': return { fill: t.primary, size: 22, glow: t.primary };
      case 'fork': return { fill: t.secondary, size: 22, glow: t.secondary };
      case 'branch': return { fill: '#7C3AED', size: 20, glow: '#7C3AED' };
      case 'leaf': return { fill: t.cta, size: 18, glow: t.cta };
      default: return { fill: t.textDim, size: 18, glow: t.textDim };
    }
  };

  const getNodeById = (id) => nodes.find(n => n.id === id);

  const chapterDetails = {
    root: { author: 'VoidWatcher', text: 'In the silence between stars, Dr. Mira Voss heard it — a repeating prime sequence from a dead sun.' },
    n1: { author: 'NebulaPen', text: 'She calibrated the array for the third night running, her coffee cold, her certainty absolute.' },
    n2: { author: 'CipherDusk', text: 'Command wanted silence. Mira broadcast anyway. The signal was not random — it was a name.' },
    fork1a: { author: 'GhostFreq', text: 'Branch: Detective Route — The signal matched a 1997 cold case file. Someone had been here before.' },
    fork1b: { author: 'StarVeil', text: 'Branch: Ghost Route — The frequency spectrum matched human brainwave patterns. Someone was still transmitting.' },
  };

  return React.createElement('div', {
    style: {
      flex: 1,
      overflowY: 'auto',
      paddingBottom: '80px',
      animation: 'fadeIn 0.3s ease',
    }
  },
    // Header
    React.createElement('div', {
      style: {
        padding: '20px 20px 12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }
    },
      React.createElement('div', null,
        React.createElement('h1', {
          style: {
            fontFamily: "'Fredoka', sans-serif",
            fontSize: '22px',
            fontWeight: 700,
            color: t.text,
          }
        }, 'Saga Map'),
        React.createElement('p', {
          style: { fontSize: '12px', color: t.textMuted }
        }, 'The Last Signal • 19 forks • 37 contributors')
      ),
      React.createElement('div', {
        style: {
          padding: '7px 12px',
          borderRadius: '20px',
          background: `rgba(41,121,255,0.15)`,
          border: `1px solid rgba(41,121,255,0.3)`,
          fontSize: '11px',
          fontWeight: 700,
          color: t.primary,
        }
      }, '58 chapters')
    ),

    // Legend
    React.createElement('div', {
      style: {
        display: 'flex',
        gap: '12px',
        padding: '0 20px 12px',
        flexWrap: 'wrap',
      }
    },
      [
        { label: 'Main', color: t.primary },
        { label: 'Fork', color: t.secondary },
        { label: 'Branch', color: '#7C3AED' },
        { label: 'Leaf', color: t.cta },
      ].map(item => React.createElement('div', {
        key: item.label,
        style: { display: 'flex', alignItems: 'center', gap: '5px' }
      },
        React.createElement('div', {
          style: {
            width: '8px', height: '8px', borderRadius: '50%',
            background: item.color,
            boxShadow: `0 0 6px ${item.color}`,
          }
        }),
        React.createElement('span', { style: { fontSize: '10px', color: t.textMuted, fontWeight: 600 } }, item.label)
      ))
    ),

    // SVG Map
    React.createElement('div', {
      style: {
        margin: '0 12px',
        borderRadius: '20px',
        background: t.surface,
        border: `1px solid ${t.border}`,
        overflow: 'hidden',
      }
    },
      React.createElement('svg', {
        width: '351',
        height: '560',
        viewBox: '0 0 351 560',
      },
        // Background grid
        React.createElement('defs', null,
          React.createElement('pattern', {
            id: 'grid', width: '30', height: '30', patternUnits: 'userSpaceOnUse'
          },
            React.createElement('path', {
              d: 'M 30 0 L 0 0 0 30',
              fill: 'none',
              stroke: t.border,
              strokeWidth: '0.5',
            })
          )
        ),
        React.createElement('rect', { width: '100%', height: '100%', fill: 'url(#grid)', opacity: '0.5' }),

        // Edges
        ...edges.map(([fromId, toId]) => {
          const from = getNodeById(fromId);
          const to = getNodeById(toId);
          const isForkEdge = getNodeById(toId).type === 'fork' || getNodeById(fromId).type === 'fork';
          return React.createElement('line', {
            key: `${fromId}-${toId}`,
            x1: from.x, y1: from.y,
            x2: to.x, y2: to.y,
            stroke: isForkEdge ? t.secondary + '60' : t.primary + '40',
            strokeWidth: isForkEdge ? '1.5' : '2',
            strokeDasharray: isForkEdge ? '4 3' : 'none',
          });
        }),

        // Nodes
        ...nodes.map(node => {
          const style = getNodeStyle(node.type);
          const isSelected = selectedNode === node.id;
          return React.createElement('g', {
            key: node.id,
            onClick: () => setSelectedNode(isSelected ? null : node.id),
            style: { cursor: 'pointer' }
          },
            // Glow ring for selected
            isSelected && React.createElement('circle', {
              cx: node.x, cy: node.y,
              r: style.size / 2 + 8,
              fill: 'none',
              stroke: style.glow,
              strokeWidth: '2',
              opacity: '0.6',
            }),
            React.createElement('circle', {
              cx: node.x, cy: node.y,
              r: style.size / 2,
              fill: style.fill + (isSelected ? 'FF' : 'CC'),
              stroke: '#fff',
              strokeWidth: isSelected ? '2' : '1',
            }),
            React.createElement('text', {
              x: node.x, y: node.y + 4,
              textAnchor: 'middle',
              fontSize: '8',
              fontWeight: '700',
              fill: '#fff',
              fontFamily: 'Nunito, sans-serif',
            }, node.label.split('\n')[0])
          );
        })
      )
    ),

    // Selected node detail
    selectedNode && chapterDetails[selectedNode] && React.createElement('div', {
      style: {
        margin: '12px 12px 0',
        padding: '14px',
        borderRadius: '16px',
        background: t.card,
        border: `1px solid ${t.border}`,
        animation: 'slideUp 0.2s ease',
      }
    },
      React.createElement('div', {
        style: { display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }
      },
        React.createElement('div', {
          style: {
            width: '24px', height: '24px',
            borderRadius: '6px',
            background: `linear-gradient(135deg, ${t.primary}, ${t.cta})`,
          }
        }),
        React.createElement('span', {
          style: { fontSize: '13px', fontWeight: 700, color: t.text, fontFamily: "'Fredoka', sans-serif" }
        }, chapterDetails[selectedNode].author),
        React.createElement('span', { style: { fontSize: '11px', color: t.textDim } }, '• contributed')
      ),
      React.createElement('p', {
        style: { fontSize: '13px', color: t.textMuted, lineHeight: 1.6, fontStyle: 'italic' }
      }, `"${chapterDetails[selectedNode].text}"`)
    )
  );
}

// ─── Profile Screen ────────────────────────────────────────────────────────

function ProfileScreen({ t, theme, setTheme }) {
  const stats = [
    { label: 'Sagas', value: '12', icon: 'BookOpen', color: t.primary },
    { label: 'Chapters', value: '89', icon: 'FileText', color: t.cta },
    { label: 'Forks', value: '34', icon: 'GitFork', color: t.secondary },
    { label: 'Enclaves', value: '3', icon: 'Users', color: '#7C3AED' },
  ];

  const activity = [
    { action: 'Contributed to', story: 'The Last Signal', time: '2h ago', icon: 'Feather', color: t.primary },
    { action: 'Forked', story: 'Neon Requiem → New Branch', time: '1d ago', icon: 'GitFork', color: t.secondary },
    { action: 'Joined', story: 'Cosmic Horror Enclave', time: '3d ago', icon: 'Users', color: '#7C3AED' },
    { action: 'Started', story: 'Echoes in the Dark', time: '5d ago', icon: 'BookOpen', color: t.cta },
  ];

  return React.createElement('div', {
    style: {
      flex: 1,
      overflowY: 'auto',
      paddingBottom: '80px',
      animation: 'fadeIn 0.3s ease',
    }
  },
    // Header / Avatar
    React.createElement('div', {
      style: {
        padding: '24px 20px 0',
        textAlign: 'center',
      }
    },
      React.createElement('div', {
        style: {
          width: '80px', height: '80px',
          borderRadius: '24px',
          background: `linear-gradient(135deg, ${t.primary}, ${t.cta})`,
          margin: '0 auto 12px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: `0 8px 24px rgba(41,121,255,0.4)`,
          animation: 'floatUp 3s ease-in-out infinite',
        }
      },
        React.createElement(window.lucide.User, { size: 36, color: '#fff', strokeWidth: 1.5 })
      ),
      React.createElement('h2', {
        style: {
          fontFamily: "'Fredoka', sans-serif",
          fontSize: '22px',
          fontWeight: 700,
          color: t.text,
          marginBottom: '4px',
        }
      }, 'VoidWatcher'),
      React.createElement('p', {
        style: { fontSize: '13px', color: t.textMuted, marginBottom: '6px' }
      }, 'Chronicler of impossible things.'),
      React.createElement('div', {
        style: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }
      },
        React.createElement('div', {
          style: {
            width: '8px', height: '8px',
            borderRadius: '50%',
            background: '#22C55E',
            boxShadow: '0 0 6px rgba(34,197,94,0.8)',
          }
        }),
        React.createElement('span', { style: { fontSize: '11px', color: t.textMuted } }, 'Active in 3 enclaves')
      )
    ),

    // Stats
    React.createElement('div', {
      style: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '10px',
        padding: '20px',
      }
    },
      stats.map(stat => {
        const Icon = window.lucide[stat.icon];
        return React.createElement('div', {
          key: stat.label,
          style: {
            padding: '16px',
            borderRadius: '16px',
            background: t.card,
            border: `1px solid ${t.border}`,
            textAlign: 'center',
          }
        },
          React.createElement('div', {
            style: {
              width: '36px', height: '36px',
              borderRadius: '10px',
              background: stat.color + '20',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 8px',
            }
          },
            Icon && React.createElement(Icon, { size: 18, color: stat.color })
          ),
          React.createElement('p', {
            style: {
              fontFamily: "'Fredoka', sans-serif",
              fontSize: '22px',
              fontWeight: 700,
              color: t.text,
              lineHeight: 1,
              marginBottom: '4px',
            }
          }, stat.value),
          React.createElement('p', {
            style: { fontSize: '11px', color: t.textMuted, fontWeight: 600 }
          }, stat.label)
        );
      })
    ),

    // AI Muse Style
    React.createElement('div', {
      style: {
        margin: '0 20px 20px',
        padding: '14px',
        borderRadius: '16px',
        background: `linear-gradient(135deg, rgba(41,121,255,0.1), rgba(236,72,153,0.1))`,
        border: `1px solid rgba(41,121,255,0.2)`,
      }
    },
      React.createElement('div', {
        style: { display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }
      },
        React.createElement(window.lucide.Sparkles, { size: 14, color: t.primary }),
        React.createElement('span', {
          style: { fontSize: '12px', fontWeight: 700, color: t.primary, fontFamily: "'Fredoka', sans-serif" }
        }, 'Your Muse Profile')
      ),
      React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: '8px' } },
        [
          { label: 'Writing Style', value: 'Atmospheric', pct: 78 },
          { label: 'Preferred Tone', value: 'Dread & Wonder', pct: 92 },
          { label: 'Narrative Depth', value: 'High', pct: 85 },
        ].map(item => React.createElement('div', { key: item.label },
          React.createElement('div', {
            style: { display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }
          },
            React.createElement('span', { style: { fontSize: '11px', color: t.textMuted } }, item.label),
            React.createElement('span', { style: { fontSize: '11px', color: t.text, fontWeight: 700 } }, item.value)
          ),
          React.createElement('div', {
            style: {
              height: '4px',
              borderRadius: '2px',
              background: t.border,
              overflow: 'hidden',
            }
          },
            React.createElement('div', {
              style: {
                width: `${item.pct}%`,
                height: '100%',
                borderRadius: '2px',
                background: `linear-gradient(90deg, ${t.primary}, ${t.cta})`,
              }
            })
          )
        ))
      )
    ),

    // Recent activity
    React.createElement('div', { style: { padding: '0 20px' } },
      React.createElement('h3', {
        style: {
          fontFamily: "'Fredoka', sans-serif",
          fontSize: '16px',
          fontWeight: 700,
          color: t.text,
          marginBottom: '12px',
        }
      }, 'Recent Activity'),
      activity.map((item, i) => {
        const Icon = window.lucide[item.icon];
        return React.createElement('div', {
          key: i,
          style: {
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px 0',
            borderBottom: i < activity.length - 1 ? `1px solid ${t.border}` : 'none',
            animation: `slideUp 0.3s ease ${i * 0.05}s both`,
          }
        },
          React.createElement('div', {
            style: {
              width: '36px', height: '36px',
              borderRadius: '10px',
              background: item.color + '20',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }
          },
            Icon && React.createElement(Icon, { size: 16, color: item.color })
          ),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('p', {
              style: { fontSize: '13px', color: t.text, fontWeight: 600, lineHeight: 1.3 }
            }, `${item.action} `, React.createElement('span', { style: { color: item.color } }, item.story)),
            React.createElement('p', { style: { fontSize: '11px', color: t.textDim, marginTop: '2px' } }, item.time)
          )
        );
      })
    )
  );
}
