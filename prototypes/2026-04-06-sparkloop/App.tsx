const { useState, useEffect, useRef, useCallback } = React;

const themes = {
  dark: {
    bg: '#0F0A1A',
    surface: '#1A1128',
    surfaceElevated: '#251C35',
    card: '#1E1530',
    cardHover: '#2A1F3D',
    primary: '#EC4899',
    secondary: '#F472B6',
    cta: '#06B6D4',
    text: '#F8F4FC',
    textSecondary: '#B8A8CC',
    textMuted: '#7A6B8A',
    border: '#2E2440',
    overlay: 'rgba(15, 10, 26, 0.85)',
    tabBg: '#160E24',
    badgeBg: 'rgba(236, 72, 153, 0.15)',
    badgeText: '#F472B6',
    progressBg: '#2E2440',
    inputBg: '#1A1128',
  },
  light: {
    bg: '#FDF2F8',
    surface: '#FFFFFF',
    surfaceElevated: '#FFF5F9',
    card: '#FFFFFF',
    cardHover: '#FFF0F6',
    primary: '#EC4899',
    secondary: '#F472B6',
    cta: '#06B6D4',
    text: '#1A1128',
    textSecondary: '#6B5580',
    textMuted: '#9B8AAE',
    border: '#F0D4E4',
    overlay: 'rgba(253, 242, 248, 0.9)',
    tabBg: '#FFFFFF',
    badgeBg: 'rgba(236, 72, 153, 0.1)',
    badgeText: '#EC4899',
    progressBg: '#F0D4E4',
    inputBg: '#FDF2F8',
  },
};

const fontStack = "-apple-system, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif";

function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [isDark, setIsDark] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [selectedKit, setSelectedKit] = useState(null);
  const [pledgedKits, setPledgedKits] = useState([]);
  const [activeTab, setActiveTab] = useState('featured');

  const t = isDark ? themes.dark : themes.light;

  useEffect(() => { setMounted(true); }, []);

  const styleTag = React.createElement('style', null, `
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(24px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes slideInRight {
      from { opacity: 0; transform: translateX(30px); }
      to { opacity: 1; transform: translateX(0); }
    }
    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.05); }
    }
    @keyframes shimmer {
      0% { background-position: -200% center; }
      100% { background-position: 200% center; }
    }
    @keyframes floatUp {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-6px); }
    }
    @keyframes glowPulse {
      0%, 100% { box-shadow: 0 0 20px rgba(236,72,153,0.3); }
      50% { box-shadow: 0 0 35px rgba(236,72,153,0.6); }
    }
    @keyframes ripple {
      to { transform: scale(4); opacity: 0; }
    }
    * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
    *::-webkit-scrollbar { width: 0; display: none; }
  `);

  const kits = [
    { id: 1, title: 'Botanical Beasts', desc: 'Design a mythological creature using only pre-1950s botanical illustrations and a limited 4-color palette.', price: '$4.99', category: 'Illustration', difficulty: 'Advanced', time: '7 days', pledges: 342, completions: 189, assets: 24, color: '#EC4899' },
    { id: 2, title: 'Mono-Type Revival', desc: 'Create an entire typeface family using a single geometric shape as the foundation for every letterform.', price: '$3.99', category: 'Typography', difficulty: 'Intermediate', time: '5 days', pledges: 218, completions: 94, assets: 12, color: '#8B5CF6' },
    { id: 3, title: 'Sound to Shape', desc: 'Transform a 30-second audio clip into a series of abstract compositions using only straight lines and primary colors.', price: '$2.99', category: 'Abstract', difficulty: 'Beginner', time: '3 days', pledges: 567, completions: 401, assets: 8, color: '#06B6D4' },
    { id: 4, title: 'Retro-Futurism UI', desc: 'Design a mobile banking app interface using only 1980s retrofuturistic aesthetics and neon color schemes.', price: '$5.99', category: 'UI Design', difficulty: 'Advanced', time: '10 days', pledges: 156, completions: 72, assets: 36, color: '#F59E0B' },
    { id: 5, title: 'Paper Cut Worlds', desc: 'Build a miniature diorama scene using only layered paper cuts. Photograph from 3 angles for your submission.', price: '$3.49', category: 'Mixed Media', difficulty: 'Intermediate', time: '5 days', pledges: 289, completions: 133, assets: 16, color: '#10B981' },
    { id: 6, title: 'Emotion Mapping', desc: 'Create a data visualization of your emotional states over one week using hand-drawn elements and watercolor.', price: 'Free', category: 'Data Art', difficulty: 'Beginner', time: '7 days', pledges: 891, completions: 620, assets: 6, color: '#EF4444' },
  ];

  const showcases = [
    { id: 1, user: 'Maya Chen', avatar: 'MC', kit: 'Botanical Beasts', likes: 234, comments: 18, image: '#EC4899' },
    { id: 2, user: 'Alex Rivera', avatar: 'AR', kit: 'Sound to Shape', likes: 187, comments: 24, image: '#06B6D4' },
    { id: 3, user: 'Sam Okafor', avatar: 'SO', kit: 'Paper Cut Worlds', likes: 312, comments: 31, image: '#10B981' },
    { id: 4, user: 'Lena Park', avatar: 'LP', kit: 'Retro-Futurism UI', likes: 145, comments: 12, image: '#F59E0B' },
  ];

  const AnimatedCard = ({ children, delay = 0, style = {} }) => {
    return React.createElement('div', {
      style: {
        animation: `fadeInUp 0.5s ease ${delay}s both`,
        ...style,
      }
    }, children);
  };

  const Icon = ({ name, size = 20, color = t.text, style = {} }) => {
    const IconComponent = window.lucide && window.lucide[name];
    if (!IconComponent) return null;
    return React.createElement(IconComponent, { size, color, style, strokeWidth: 1.8 });
  };

  const Badge = ({ text, color = t.primary }) => {
    return React.createElement('span', {
      style: {
        display: 'inline-block',
        padding: '4px 10px',
        borderRadius: 20,
        fontSize: 11,
        fontWeight: 600,
        fontFamily: fontStack,
        background: `${color}22`,
        color: color,
        letterSpacing: '0.3px',
      }
    }, text);
  };

  // HOME SCREEN
  const HomeScreen = () => {
    return React.createElement('div', {
      style: { padding: '0 0 20px 0', animation: 'fadeInUp 0.4s ease both' }
    },
      // Header
      React.createElement('div', {
        style: {
          padding: '16px 20px 12px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }
      },
        React.createElement('div', null,
          React.createElement('h1', {
            style: { fontSize: 28, fontWeight: 800, color: t.text, fontFamily: fontStack, letterSpacing: '-0.5px', margin: 0 }
          }, 'SparkLoop'),
          React.createElement('p', {
            style: { fontSize: 13, color: t.textMuted, fontFamily: fontStack, margin: '2px 0 0' }
          }, 'Your next creative challenge awaits')
        ),
        React.createElement('div', { style: { display: 'flex', gap: 12, alignItems: 'center' } },
          React.createElement('button', {
            onClick: () => setIsDark(!isDark),
            style: {
              width: 40, height: 40, borderRadius: 20, border: 'none',
              background: t.surfaceElevated, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s ease',
            }
          }, React.createElement(Icon, { name: isDark ? 'Sun' : 'Moon', size: 18, color: t.textSecondary })),
          React.createElement('button', {
            style: {
              width: 40, height: 40, borderRadius: 20, border: 'none',
              background: t.surfaceElevated, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              position: 'relative',
            }
          },
            React.createElement(Icon, { name: 'Bell', size: 18, color: t.textSecondary }),
            React.createElement('div', {
              style: {
                position: 'absolute', top: 8, right: 8, width: 8, height: 8,
                borderRadius: 4, background: t.primary,
              }
            })
          )
        )
      ),

      // Active Pledge Banner
      pledgedKits.length > 0 && React.createElement('div', {
        style: {
          margin: '4px 20px 16px',
          padding: '14px 16px',
          borderRadius: 16,
          background: `linear-gradient(135deg, ${t.primary}20, ${t.cta}15)`,
          border: `1px solid ${t.primary}30`,
          animation: 'glowPulse 3s ease infinite',
        }
      },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 } },
          React.createElement(Icon, { name: 'Flame', size: 16, color: t.primary }),
          React.createElement('span', { style: { fontSize: 13, fontWeight: 700, color: t.primary, fontFamily: fontStack } },
            `${pledgedKits.length} Active Pledge${pledgedKits.length > 1 ? 's' : ''}`)
        ),
        React.createElement('div', {
          style: { height: 4, borderRadius: 2, background: t.progressBg, overflow: 'hidden' }
        },
          React.createElement('div', {
            style: {
              width: '35%', height: '100%', borderRadius: 2,
              background: `linear-gradient(90deg, ${t.primary}, ${t.cta})`,
              transition: 'width 0.5s ease',
            }
          })
        ),
        React.createElement('p', { style: { fontSize: 12, color: t.textMuted, fontFamily: fontStack, margin: '6px 0 0' } },
          '35% complete — 4 days remaining')
      ),

      // Weekly Drops
      React.createElement('div', { style: { padding: '0 20px', marginBottom: 20 } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 } },
          React.createElement('h2', {
            style: { fontSize: 20, fontWeight: 700, color: t.text, fontFamily: fontStack, letterSpacing: '-0.3px', margin: 0 }
          }, 'Fresh Drops This Week'),
          React.createElement('span', { style: { fontSize: 13, color: t.cta, fontWeight: 600, fontFamily: fontStack, cursor: 'pointer' } }, 'See All')
        ),
        React.createElement('div', {
          style: { display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 4, margin: '0 -20px', padding: '0 20px 4px' }
        },
          kits.slice(0, 3).map((kit, i) =>
            React.createElement(AnimatedCard, { key: kit.id, delay: i * 0.1, style: { minWidth: 260, flexShrink: 0 } },
              React.createElement('div', {
                onClick: () => { setSelectedKit(kit); setActiveScreen('detail'); },
                style: {
                  borderRadius: 20,
                  overflow: 'hidden',
                  background: t.card,
                  border: `1px solid ${t.border}`,
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                }
              },
                React.createElement('div', {
                  style: {
                    height: 130,
                    background: `linear-gradient(135deg, ${kit.color}40, ${kit.color}15)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                  }
                },
                  React.createElement(Icon, { name: 'Sparkles', size: 40, color: kit.color }),
                  React.createElement('div', {
                    style: {
                      position: 'absolute', top: 10, right: 10,
                      padding: '4px 10px', borderRadius: 12,
                      background: isDark ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.8)',
                      fontSize: 12, fontWeight: 700, color: kit.color, fontFamily: fontStack,
                      backdropFilter: 'blur(8px)',
                    }
                  }, kit.price)
                ),
                React.createElement('div', { style: { padding: '14px 16px' } },
                  React.createElement('h3', {
                    style: { fontSize: 16, fontWeight: 700, color: t.text, fontFamily: fontStack, margin: '0 0 4px', letterSpacing: '-0.2px' }
                  }, kit.title),
                  React.createElement('p', {
                    style: { fontSize: 13, color: t.textSecondary, fontFamily: fontStack, margin: 0, lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }
                  }, kit.desc),
                  React.createElement('div', {
                    style: { display: 'flex', gap: 6, marginTop: 10, flexWrap: 'wrap' }
                  },
                    React.createElement(Badge, { text: kit.category, color: kit.color }),
                    React.createElement(Badge, { text: kit.difficulty }),
                  )
                )
              )
            )
          )
        )
      ),

      // Stats
      React.createElement(AnimatedCard, { delay: 0.2, style: { padding: '0 20px', marginBottom: 20 } },
        React.createElement('div', {
          style: {
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: 10,
          }
        },
          [
            { label: 'Kits Completed', value: '12', icon: 'Trophy', color: t.primary },
            { label: 'Active Streak', value: '8 wk', icon: 'Flame', color: '#F59E0B' },
            { label: 'Community Rank', value: '#47', icon: 'TrendingUp', color: t.cta },
          ].map((stat, i) =>
            React.createElement('div', {
              key: i,
              style: {
                padding: '14px 12px',
                borderRadius: 16,
                background: t.card,
                border: `1px solid ${t.border}`,
                textAlign: 'center',
              }
            },
              React.createElement('div', {
                style: { width: 36, height: 36, borderRadius: 12, margin: '0 auto 8px',
                  background: `${stat.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center' }
              }, React.createElement(Icon, { name: stat.icon, size: 18, color: stat.color })),
              React.createElement('div', { style: { fontSize: 20, fontWeight: 800, color: t.text, fontFamily: fontStack } }, stat.value),
              React.createElement('div', { style: { fontSize: 11, color: t.textMuted, fontFamily: fontStack, marginTop: 2 } }, stat.label)
            )
          )
        )
      ),

      // Trending Showcases
      React.createElement('div', { style: { padding: '0 20px' } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 } },
          React.createElement('h2', {
            style: { fontSize: 20, fontWeight: 700, color: t.text, fontFamily: fontStack, letterSpacing: '-0.3px', margin: 0 }
          }, 'Trending Creations'),
          React.createElement('span', {
            onClick: () => setActiveScreen('community'),
            style: { fontSize: 13, color: t.cta, fontWeight: 600, fontFamily: fontStack, cursor: 'pointer' }
          }, 'View All')
        ),
        showcases.slice(0, 2).map((item, i) =>
          React.createElement(AnimatedCard, { key: item.id, delay: 0.3 + i * 0.1, style: { marginBottom: 12 } },
            React.createElement('div', {
              style: {
                borderRadius: 20,
                overflow: 'hidden',
                background: t.card,
                border: `1px solid ${t.border}`,
              }
            },
              React.createElement('div', {
                style: {
                  height: 160,
                  background: `linear-gradient(135deg, ${item.image}30, ${item.image}10)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }
              },
                React.createElement(Icon, { name: 'Image', size: 48, color: `${item.image}80` })
              ),
              React.createElement('div', {
                style: { padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }
              },
                React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10 } },
                  React.createElement('div', {
                    style: {
                      width: 32, height: 32, borderRadius: 16,
                      background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 12, fontWeight: 700, color: '#fff', fontFamily: fontStack,
                    }
                  }, item.avatar),
                  React.createElement('div', null,
                    React.createElement('div', { style: { fontSize: 14, fontWeight: 600, color: t.text, fontFamily: fontStack } }, item.user),
                    React.createElement('div', { style: { fontSize: 12, color: t.textMuted, fontFamily: fontStack } }, item.kit)
                  )
                ),
                React.createElement('div', { style: { display: 'flex', gap: 14, alignItems: 'center' } },
                  React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
                    React.createElement(Icon, { name: 'Heart', size: 16, color: t.textMuted }),
                    React.createElement('span', { style: { fontSize: 13, color: t.textMuted, fontFamily: fontStack } }, item.likes)
                  ),
                  React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
                    React.createElement(Icon, { name: 'MessageCircle', size: 16, color: t.textMuted }),
                    React.createElement('span', { style: { fontSize: 13, color: t.textMuted, fontFamily: fontStack } }, item.comments)
                  )
                )
              )
            )
          )
        )
      )
    );
  };

  // EXPLORE SCREEN
  const ExploreScreen = () => {
    const categories = ['All', 'Illustration', 'Typography', 'Abstract', 'UI Design', 'Mixed Media', 'Data Art'];
    const [selectedCat, setSelectedCat] = useState('All');
    const filtered = selectedCat === 'All' ? kits : kits.filter(k => k.category === selectedCat);

    return React.createElement('div', {
      style: { padding: '0 0 20px 0', animation: 'fadeInUp 0.4s ease both' }
    },
      React.createElement('div', { style: { padding: '16px 20px 12px' } },
        React.createElement('h1', {
          style: { fontSize: 28, fontWeight: 800, color: t.text, fontFamily: fontStack, letterSpacing: '-0.5px', margin: '0 0 14px' }
        }, 'Explore Kits'),
        // Search
        React.createElement('div', {
          style: {
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '12px 16px', borderRadius: 14,
            background: t.inputBg, border: `1px solid ${t.border}`,
          }
        },
          React.createElement(Icon, { name: 'Search', size: 18, color: t.textMuted }),
          React.createElement('input', {
            placeholder: 'Search constraint kits...',
            style: {
              border: 'none', outline: 'none', background: 'transparent',
              fontSize: 15, color: t.text, fontFamily: fontStack, width: '100%',
            }
          })
        )
      ),

      // Tabs
      React.createElement('div', {
        style: { display: 'flex', gap: 6, overflowX: 'auto', padding: '0 20px 14px', margin: '0' }
      },
        ['featured', 'popular', 'new', 'free'].map(tab =>
          React.createElement('button', {
            key: tab,
            onClick: () => setActiveTab(tab),
            style: {
              padding: '8px 16px', borderRadius: 20, border: 'none',
              background: activeTab === tab ? t.primary : t.surfaceElevated,
              color: activeTab === tab ? '#fff' : t.textSecondary,
              fontSize: 13, fontWeight: 600, fontFamily: fontStack,
              cursor: 'pointer', whiteSpace: 'nowrap',
              transition: 'all 0.2s ease',
            }
          }, tab.charAt(0).toUpperCase() + tab.slice(1))
        )
      ),

      // Categories
      React.createElement('div', {
        style: { display: 'flex', gap: 8, overflowX: 'auto', padding: '0 20px 16px' }
      },
        categories.map(cat =>
          React.createElement('button', {
            key: cat,
            onClick: () => setSelectedCat(cat),
            style: {
              padding: '6px 14px', borderRadius: 10,
              border: selectedCat === cat ? `1.5px solid ${t.cta}` : `1px solid ${t.border}`,
              background: selectedCat === cat ? `${t.cta}15` : 'transparent',
              color: selectedCat === cat ? t.cta : t.textMuted,
              fontSize: 12, fontWeight: 600, fontFamily: fontStack,
              cursor: 'pointer', whiteSpace: 'nowrap',
              transition: 'all 0.2s ease',
            }
          }, cat)
        )
      ),

      // Kit Grid
      React.createElement('div', { style: { padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 12 } },
        filtered.map((kit, i) =>
          React.createElement(AnimatedCard, { key: kit.id, delay: i * 0.08 },
            React.createElement('div', {
              onClick: () => { setSelectedKit(kit); setActiveScreen('detail'); },
              style: {
                display: 'flex', gap: 14, padding: 14,
                borderRadius: 18, background: t.card,
                border: `1px solid ${t.border}`,
                cursor: 'pointer', transition: 'all 0.2s ease',
              }
            },
              React.createElement('div', {
                style: {
                  width: 80, height: 80, borderRadius: 14, flexShrink: 0,
                  background: `linear-gradient(135deg, ${kit.color}35, ${kit.color}10)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }
              }, React.createElement(Icon, { name: 'Sparkles', size: 28, color: kit.color })),
              React.createElement('div', { style: { flex: 1, minWidth: 0 } },
                React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' } },
                  React.createElement('h3', {
                    style: { fontSize: 15, fontWeight: 700, color: t.text, fontFamily: fontStack, margin: 0 }
                  }, kit.title),
                  React.createElement('span', {
                    style: { fontSize: 13, fontWeight: 700, color: kit.price === 'Free' ? t.cta : t.primary, fontFamily: fontStack, flexShrink: 0 }
                  }, kit.price)
                ),
                React.createElement('p', {
                  style: { fontSize: 13, color: t.textSecondary, fontFamily: fontStack, margin: '4px 0 8px', lineHeight: 1.35, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }
                }, kit.desc),
                React.createElement('div', { style: { display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' } },
                  React.createElement(Badge, { text: kit.difficulty, color: kit.color }),
                  React.createElement('span', { style: { fontSize: 11, color: t.textMuted, fontFamily: fontStack, display: 'flex', alignItems: 'center', gap: 3 } },
                    React.createElement(Icon, { name: 'Clock', size: 12, color: t.textMuted }),
                    kit.time
                  ),
                  React.createElement('span', { style: { fontSize: 11, color: t.textMuted, fontFamily: fontStack, display: 'flex', alignItems: 'center', gap: 3 } },
                    React.createElement(Icon, { name: 'Users', size: 12, color: t.textMuted }),
                    `${kit.pledges} pledged`
                  )
                )
              )
            )
          )
        )
      )
    );
  };

  // KIT DETAIL SCREEN
  const DetailScreen = () => {
    const kit = selectedKit || kits[0];
    const isPledged = pledgedKits.includes(kit.id);

    return React.createElement('div', {
      style: { animation: 'fadeInUp 0.35s ease both' }
    },
      // Hero
      React.createElement('div', {
        style: {
          height: 220, position: 'relative',
          background: `linear-gradient(135deg, ${kit.color}40, ${kit.color}10)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }
      },
        React.createElement('button', {
          onClick: () => setActiveScreen('explore'),
          style: {
            position: 'absolute', top: 16, left: 16,
            width: 40, height: 40, borderRadius: 20, border: 'none',
            background: isDark ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.7)',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(8px)',
          }
        }, React.createElement(Icon, { name: 'ArrowLeft', size: 20, color: t.text })),
        React.createElement('div', {
          style: { animation: 'floatUp 3s ease infinite' }
        }, React.createElement(Icon, { name: 'Sparkles', size: 64, color: kit.color })),
        React.createElement('div', {
          style: {
            position: 'absolute', top: 16, right: 16,
            display: 'flex', gap: 8,
          }
        },
          React.createElement('button', {
            style: {
              width: 40, height: 40, borderRadius: 20, border: 'none',
              background: isDark ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.7)',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              backdropFilter: 'blur(8px)',
            }
          }, React.createElement(Icon, { name: 'Share2', size: 18, color: t.text })),
          React.createElement('button', {
            style: {
              width: 40, height: 40, borderRadius: 20, border: 'none',
              background: isDark ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.7)',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              backdropFilter: 'blur(8px)',
            }
          }, React.createElement(Icon, { name: 'Bookmark', size: 18, color: t.text }))
        )
      ),

      React.createElement('div', { style: { padding: '20px', marginTop: -20, borderRadius: '20px 20px 0 0', background: t.bg, position: 'relative' } },
        React.createElement('div', { style: { display: 'flex', gap: 8, marginBottom: 12 } },
          React.createElement(Badge, { text: kit.category, color: kit.color }),
          React.createElement(Badge, { text: kit.difficulty }),
          React.createElement(Badge, { text: kit.time, color: t.cta }),
        ),
        React.createElement('h1', {
          style: { fontSize: 26, fontWeight: 800, color: t.text, fontFamily: fontStack, letterSpacing: '-0.5px', margin: '0 0 8px' }
        }, kit.title),
        React.createElement('p', {
          style: { fontSize: 15, color: t.textSecondary, fontFamily: fontStack, lineHeight: 1.5, margin: '0 0 20px' }
        }, kit.desc),

        // Stats row
        React.createElement('div', {
          style: { display: 'flex', gap: 16, marginBottom: 20, padding: '14px 0', borderTop: `1px solid ${t.border}`, borderBottom: `1px solid ${t.border}` }
        },
          [
            { label: 'Pledges', value: kit.pledges, icon: 'Users' },
            { label: 'Completed', value: kit.completions, icon: 'CheckCircle' },
            { label: 'Assets', value: kit.assets, icon: 'Package' },
          ].map((s, i) =>
            React.createElement('div', { key: i, style: { flex: 1, textAlign: 'center' } },
              React.createElement('div', { style: { fontSize: 18, fontWeight: 800, color: t.text, fontFamily: fontStack } }, s.value),
              React.createElement('div', { style: { fontSize: 11, color: t.textMuted, fontFamily: fontStack, marginTop: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 } },
                React.createElement(Icon, { name: s.icon, size: 12, color: t.textMuted }),
                s.label
              )
            )
          )
        ),

        // What's Inside
        React.createElement('h3', {
          style: { fontSize: 17, fontWeight: 700, color: t.text, fontFamily: fontStack, margin: '0 0 12px' }
        }, "What's Inside"),
        [
          { icon: 'FileText', label: 'Detailed creative brief with constraints' },
          { icon: 'Image', label: `${kit.assets} curated reference assets` },
          { icon: 'Wand2', label: 'AI prompt guidance for ideation' },
          { icon: 'Target', label: 'Clear completion criteria' },
        ].map((item, i) =>
          React.createElement('div', {
            key: i,
            style: {
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '10px 0',
              borderBottom: i < 3 ? `1px solid ${t.border}` : 'none',
            }
          },
            React.createElement('div', {
              style: {
                width: 36, height: 36, borderRadius: 10,
                background: `${kit.color}15`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }
            }, React.createElement(Icon, { name: item.icon, size: 18, color: kit.color })),
            React.createElement('span', { style: { fontSize: 14, color: t.textSecondary, fontFamily: fontStack } }, item.label)
          )
        ),

        // CTA
        React.createElement('button', {
          onClick: () => {
            if (!isPledged) {
              setPledgedKits([...pledgedKits, kit.id]);
            }
          },
          style: {
            width: '100%', marginTop: 24, padding: '16px',
            borderRadius: 16, border: 'none',
            background: isPledged
              ? `linear-gradient(135deg, ${t.cta}, #0891B2)`
              : `linear-gradient(135deg, ${t.primary}, ${t.secondary})`,
            color: '#fff', fontSize: 17, fontWeight: 700,
            fontFamily: fontStack, cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: isPledged ? `0 4px 20px ${t.cta}40` : `0 4px 20px ${t.primary}40`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }
        },
          React.createElement(Icon, { name: isPledged ? 'CheckCircle' : 'Zap', size: 20, color: '#fff' }),
          isPledged ? 'Pledged — Open Canvas' : `Pledge & Start — ${kit.price}`
        ),
      )
    );
  };

  // CANVAS SCREEN
  const CanvasScreen = () => {
    const [progress, setProgress] = useState(35);
    const [notes, setNotes] = useState([
      { id: 1, text: 'Initial sketch complete — exploring color palette options', time: '2h ago' },
      { id: 2, text: 'Found great botanical reference from 1920s archive', time: '5h ago' },
      { id: 3, text: 'Composition layout finalized, starting detailed work', time: '1d ago' },
    ]);

    return React.createElement('div', {
      style: { padding: '0 0 20px', animation: 'fadeInUp 0.4s ease both' }
    },
      React.createElement('div', { style: { padding: '16px 20px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
        React.createElement('h1', {
          style: { fontSize: 28, fontWeight: 800, color: t.text, fontFamily: fontStack, letterSpacing: '-0.5px', margin: 0 }
        }, 'My Canvas'),
        React.createElement('button', {
          style: {
            padding: '8px 16px', borderRadius: 12, border: 'none',
            background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})`,
            color: '#fff', fontSize: 13, fontWeight: 600, fontFamily: fontStack, cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 6,
          }
        },
          React.createElement(Icon, { name: 'Plus', size: 16, color: '#fff' }),
          'New Entry'
        )
      ),

      // Active Kit Card
      pledgedKits.length > 0 ? React.createElement(AnimatedCard, { delay: 0.1, style: { padding: '0 20px', marginBottom: 16 } },
        React.createElement('div', {
          style: {
            borderRadius: 20, overflow: 'hidden',
            background: t.card, border: `1px solid ${t.border}`,
          }
        },
          React.createElement('div', {
            style: {
              height: 120,
              background: `linear-gradient(135deg, ${t.primary}30, ${t.cta}15)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              position: 'relative',
            }
          },
            React.createElement(Icon, { name: 'Palette', size: 40, color: t.primary }),
            React.createElement('div', {
              style: {
                position: 'absolute', bottom: 10, right: 14,
                padding: '4px 12px', borderRadius: 12,
                background: isDark ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.8)',
                backdropFilter: 'blur(8px)',
              }
            },
              React.createElement('span', { style: { fontSize: 13, fontWeight: 700, color: t.primary, fontFamily: fontStack } }, '4 days left')
            )
          ),
          React.createElement('div', { style: { padding: 16 } },
            React.createElement('h3', { style: { fontSize: 17, fontWeight: 700, color: t.text, fontFamily: fontStack, margin: '0 0 4px' } },
              (selectedKit || kits[0]).title),
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 } },
              React.createElement('span', { style: { fontSize: 13, color: t.textMuted, fontFamily: fontStack } }, `${progress}% complete`),
              React.createElement('span', { style: { fontSize: 13, fontWeight: 600, color: t.cta, fontFamily: fontStack } }, 'On Track')
            ),
            React.createElement('div', {
              style: { height: 6, borderRadius: 3, background: t.progressBg, overflow: 'hidden', marginTop: 8 }
            },
              React.createElement('div', {
                style: {
                  width: `${progress}%`, height: '100%', borderRadius: 3,
                  background: `linear-gradient(90deg, ${t.primary}, ${t.cta})`,
                  transition: 'width 0.5s ease',
                }
              })
            ),
            // Milestones
            React.createElement('div', { style: { marginTop: 16, display: 'flex', flexDirection: 'column', gap: 10 } },
              [
                { label: 'Research & Ideation', done: true },
                { label: 'Initial Sketch', done: true },
                { label: 'Detailed Composition', done: false },
                { label: 'Color & Polish', done: false },
                { label: 'Final Submission', done: false },
              ].map((m, i) =>
                React.createElement('div', { key: i, style: { display: 'flex', alignItems: 'center', gap: 10 } },
                  React.createElement('div', {
                    style: {
                      width: 22, height: 22, borderRadius: 11,
                      background: m.done ? t.primary : 'transparent',
                      border: m.done ? 'none' : `2px solid ${t.border}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }
                  }, m.done && React.createElement(Icon, { name: 'Check', size: 14, color: '#fff' })),
                  React.createElement('span', {
                    style: {
                      fontSize: 14, fontFamily: fontStack,
                      color: m.done ? t.text : t.textMuted,
                      textDecoration: m.done ? 'line-through' : 'none',
                    }
                  }, m.label)
                )
              )
            )
          )
        )
      ) : React.createElement('div', {
        style: {
          margin: '20px', padding: '40px 20px', borderRadius: 20,
          background: t.card, border: `1px solid ${t.border}`,
          textAlign: 'center',
        }
      },
        React.createElement(Icon, { name: 'Palette', size: 48, color: t.textMuted }),
        React.createElement('h3', { style: { fontSize: 17, fontWeight: 700, color: t.text, fontFamily: fontStack, margin: '16px 0 6px' } }, 'No Active Projects'),
        React.createElement('p', { style: { fontSize: 14, color: t.textMuted, fontFamily: fontStack, margin: '0 0 16px' } },
          'Pledge to a Constraint Kit to start your creative journey'),
        React.createElement('button', {
          onClick: () => setActiveScreen('explore'),
          style: {
            padding: '12px 24px', borderRadius: 14, border: 'none',
            background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})`,
            color: '#fff', fontSize: 15, fontWeight: 600, fontFamily: fontStack, cursor: 'pointer',
          }
        }, 'Browse Kits')
      ),

      // Progress Journal
      React.createElement('div', { style: { padding: '0 20px' } },
        React.createElement('h3', { style: { fontSize: 17, fontWeight: 700, color: t.text, fontFamily: fontStack, margin: '0 0 14px' } }, 'Progress Journal'),
        notes.map((note, i) =>
          React.createElement(AnimatedCard, { key: note.id, delay: 0.15 + i * 0.08, style: { marginBottom: 10 } },
            React.createElement('div', {
              style: {
                padding: '14px 16px', borderRadius: 14,
                background: t.card, border: `1px solid ${t.border}`,
                display: 'flex', gap: 12,
              }
            },
              React.createElement('div', {
                style: {
                  width: 8, borderRadius: 4, flexShrink: 0,
                  background: `linear-gradient(${t.primary}, ${t.cta})`,
                }
              }),
              React.createElement('div', { style: { flex: 1 } },
                React.createElement('p', { style: { fontSize: 14, color: t.text, fontFamily: fontStack, margin: '0 0 4px', lineHeight: 1.4 } }, note.text),
                React.createElement('span', { style: { fontSize: 12, color: t.textMuted, fontFamily: fontStack } }, note.time)
              )
            )
          )
        )
      )
    );
  };

  // COMMUNITY SCREEN
  const CommunityScreen = () => {
    const [communityTab, setCommunityTab] = useState('showcase');

    const competitions = [
      { title: 'Spring Creative Sprint', participants: 1240, daysLeft: 3, prize: '$500 Kit Credit' },
      { title: 'Monochrome Mastery', participants: 856, daysLeft: 7, prize: 'Featured Creator' },
    ];

    return React.createElement('div', {
      style: { padding: '0 0 20px 0', animation: 'fadeInUp 0.4s ease both' }
    },
      React.createElement('div', { style: { padding: '16px 20px 12px' } },
        React.createElement('h1', {
          style: { fontSize: 28, fontWeight: 800, color: t.text, fontFamily: fontStack, letterSpacing: '-0.5px', margin: '0 0 14px' }
        }, 'Community'),
      ),

      // Tabs
      React.createElement('div', {
        style: { display: 'flex', gap: 0, margin: '0 20px 16px', borderRadius: 14, overflow: 'hidden', background: t.surfaceElevated }
      },
        ['showcase', 'competitions', 'leaderboard'].map(tab =>
          React.createElement('button', {
            key: tab,
            onClick: () => setCommunityTab(tab),
            style: {
              flex: 1, padding: '10px 0', border: 'none',
              background: communityTab === tab ? t.primary : 'transparent',
              color: communityTab === tab ? '#fff' : t.textMuted,
              fontSize: 13, fontWeight: 600, fontFamily: fontStack,
              cursor: 'pointer', transition: 'all 0.25s ease',
            }
          }, tab.charAt(0).toUpperCase() + tab.slice(1))
        )
      ),

      // Showcase
      communityTab === 'showcase' && React.createElement('div', { style: { padding: '0 20px' } },
        showcases.map((item, i) =>
          React.createElement(AnimatedCard, { key: item.id, delay: i * 0.1, style: { marginBottom: 14 } },
            React.createElement('div', {
              style: { borderRadius: 20, overflow: 'hidden', background: t.card, border: `1px solid ${t.border}` }
            },
              React.createElement('div', {
                style: {
                  height: 180,
                  background: `linear-gradient(135deg, ${item.image}25, ${item.image}08)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }
              }, React.createElement(Icon, { name: 'Image', size: 56, color: `${item.image}60` })),
              React.createElement('div', { style: { padding: '14px 16px' } },
                React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
                  React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10 } },
                    React.createElement('div', {
                      style: {
                        width: 36, height: 36, borderRadius: 18,
                        background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 13, fontWeight: 700, color: '#fff', fontFamily: fontStack,
                      }
                    }, item.avatar),
                    React.createElement('div', null,
                      React.createElement('div', { style: { fontSize: 15, fontWeight: 600, color: t.text, fontFamily: fontStack } }, item.user),
                      React.createElement('div', { style: { fontSize: 12, color: t.textMuted, fontFamily: fontStack } }, `Completed: ${item.kit}`)
                    )
                  ),
                  React.createElement('div', { style: { display: 'flex', gap: 12 } },
                    React.createElement('button', {
                      style: {
                        display: 'flex', alignItems: 'center', gap: 4, padding: '6px 12px',
                        borderRadius: 10, border: `1px solid ${t.border}`, background: 'transparent',
                        cursor: 'pointer', transition: 'all 0.2s ease',
                      }
                    },
                      React.createElement(Icon, { name: 'Heart', size: 16, color: t.primary }),
                      React.createElement('span', { style: { fontSize: 13, color: t.textSecondary, fontFamily: fontStack } }, item.likes)
                    )
                  )
                ),
                React.createElement('div', { style: { display: 'flex', gap: 8, marginTop: 12 } },
                  React.createElement('button', {
                    style: {
                      flex: 1, padding: '10px', borderRadius: 12, border: 'none',
                      background: `${t.cta}15`, color: t.cta,
                      fontSize: 13, fontWeight: 600, fontFamily: fontStack, cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                    }
                  },
                    React.createElement(Icon, { name: 'MessageCircle', size: 16, color: t.cta }),
                    `${item.comments} Comments`
                  ),
                  React.createElement('button', {
                    style: {
                      padding: '10px 14px', borderRadius: 12, border: 'none',
                      background: t.surfaceElevated, cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }
                  }, React.createElement(Icon, { name: 'Share2', size: 16, color: t.textSecondary }))
                )
              )
            )
          )
        )
      ),

      // Competitions
      communityTab === 'competitions' && React.createElement('div', { style: { padding: '0 20px' } },
        competitions.map((comp, i) =>
          React.createElement(AnimatedCard, { key: i, delay: i * 0.1, style: { marginBottom: 14 } },
            React.createElement('div', {
              style: {
                borderRadius: 20, padding: 18,
                background: `linear-gradient(135deg, ${t.primary}15, ${t.cta}10)`,
                border: `1px solid ${t.primary}25`,
              }
            },
              React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 } },
                React.createElement('h3', { style: { fontSize: 17, fontWeight: 700, color: t.text, fontFamily: fontStack, margin: 0 } }, comp.title),
                React.createElement(Badge, { text: `${comp.daysLeft}d left`, color: '#F59E0B' })
              ),
              React.createElement('div', { style: { display: 'flex', gap: 16, marginBottom: 14 } },
                React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6 } },
                  React.createElement(Icon, { name: 'Users', size: 14, color: t.textMuted }),
                  React.createElement('span', { style: { fontSize: 13, color: t.textSecondary, fontFamily: fontStack } }, `${comp.participants} joined`)
                ),
                React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6 } },
                  React.createElement(Icon, { name: 'Award', size: 14, color: '#F59E0B' }),
                  React.createElement('span', { style: { fontSize: 13, color: t.textSecondary, fontFamily: fontStack } }, comp.prize)
                )
              ),
              React.createElement('button', {
                style: {
                  width: '100%', padding: '12px', borderRadius: 14, border: 'none',
                  background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})`,
                  color: '#fff', fontSize: 15, fontWeight: 600, fontFamily: fontStack, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                }
              },
                React.createElement(Icon, { name: 'Zap', size: 18, color: '#fff' }),
                'Join Competition'
              )
            )
          )
        )
      ),

      // Leaderboard
      communityTab === 'leaderboard' && React.createElement('div', { style: { padding: '0 20px' } },
        [
          { rank: 1, name: 'Maya Chen', kits: 47, streak: '24 wk', medal: '#FFD700' },
          { rank: 2, name: 'Jordan Smith', kits: 42, streak: '18 wk', medal: '#C0C0C0' },
          { rank: 3, name: 'Priya Patel', kits: 39, streak: '21 wk', medal: '#CD7F32' },
          { rank: 4, name: 'Alex Rivera', kits: 35, streak: '15 wk', medal: null },
          { rank: 5, name: 'Sam Okafor', kits: 33, streak: '12 wk', medal: null },
          { rank: 6, name: 'Lena Park', kits: 31, streak: '10 wk', medal: null },
        ].map((user, i) =>
          React.createElement(AnimatedCard, { key: i, delay: i * 0.06, style: { marginBottom: 8 } },
            React.createElement('div', {
              style: {
                display: 'flex', alignItems: 'center', gap: 14, padding: '12px 16px',
                borderRadius: 16, background: i < 3 ? `${[t.primary, t.cta, '#F59E0B'][i]}10` : t.card,
                border: `1px solid ${i < 3 ? `${[t.primary, t.cta, '#F59E0B'][i]}25` : t.border}`,
              }
            },
              React.createElement('div', {
                style: {
                  width: 32, fontFamily: fontStack, fontSize: 16, fontWeight: 800,
                  color: user.medal || t.textMuted, textAlign: 'center',
                }
              }, `#${user.rank}`),
              React.createElement('div', {
                style: {
                  width: 40, height: 40, borderRadius: 20,
                  background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 14, fontWeight: 700, color: '#fff', fontFamily: fontStack,
                }
              }, user.name.split(' ').map(n => n[0]).join('')),
              React.createElement('div', { style: { flex: 1 } },
                React.createElement('div', { style: { fontSize: 15, fontWeight: 600, color: t.text, fontFamily: fontStack } }, user.name),
                React.createElement('div', { style: { fontSize: 12, color: t.textMuted, fontFamily: fontStack, display: 'flex', gap: 10, marginTop: 2 } },
                  React.createElement('span', null, `${user.kits} kits`),
                  React.createElement('span', null, `${user.streak} streak`)
                )
              ),
              user.medal && React.createElement(Icon, { name: 'Award', size: 22, color: user.medal })
            )
          )
        )
      )
    );
  };

  // STUDIO SCREEN
  const StudioScreen = () => {
    const myKits = [
      { title: 'Pixel Wilderness', sales: 89, revenue: '$356', status: 'Published', rating: 4.8 },
      { title: 'Chromatic Limits', sales: 23, revenue: '$92', status: 'Draft', rating: null },
    ];

    return React.createElement('div', {
      style: { padding: '0 0 20px 0', animation: 'fadeInUp 0.4s ease both' }
    },
      React.createElement('div', { style: { padding: '16px 20px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
        React.createElement('h1', {
          style: { fontSize: 28, fontWeight: 800, color: t.text, fontFamily: fontStack, letterSpacing: '-0.5px', margin: 0 }
        }, 'Creator Studio'),
        React.createElement('button', {
          style: {
            padding: '8px 16px', borderRadius: 12, border: 'none',
            background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})`,
            color: '#fff', fontSize: 13, fontWeight: 600, fontFamily: fontStack, cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 6,
          }
        },
          React.createElement(Icon, { name: 'Plus', size: 16, color: '#fff' }),
          'New Kit'
        )
      ),

      // Revenue Card
      React.createElement(AnimatedCard, { delay: 0.1, style: { padding: '0 20px', marginBottom: 20 } },
        React.createElement('div', {
          style: {
            borderRadius: 20, padding: 20,
            background: `linear-gradient(135deg, ${t.primary}20, ${t.cta}10)`,
            border: `1px solid ${t.primary}25`,
          }
        },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' } },
            React.createElement('div', null,
              React.createElement('p', { style: { fontSize: 13, color: t.textMuted, fontFamily: fontStack, margin: '0 0 4px' } }, 'Total Earnings'),
              React.createElement('h2', { style: { fontSize: 34, fontWeight: 800, color: t.text, fontFamily: fontStack, margin: 0, letterSpacing: '-0.5px' } }, '$448'),
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4, marginTop: 6 } },
                React.createElement(Icon, { name: 'TrendingUp', size: 14, color: '#10B981' }),
                React.createElement('span', { style: { fontSize: 13, fontWeight: 600, color: '#10B981', fontFamily: fontStack } }, '+32% this month')
              )
            ),
            React.createElement('div', {
              style: {
                width: 56, height: 56, borderRadius: 16,
                background: `${t.primary}20`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }
            }, React.createElement(Icon, { name: 'DollarSign', size: 28, color: t.primary }))
          ),
          React.createElement('div', {
            style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 16 }
          },
            React.createElement('div', {
              style: { padding: '12px', borderRadius: 12, background: isDark ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.6)', textAlign: 'center' }
            },
              React.createElement('div', { style: { fontSize: 20, fontWeight: 800, color: t.text, fontFamily: fontStack } }, '112'),
              React.createElement('div', { style: { fontSize: 11, color: t.textMuted, fontFamily: fontStack } }, 'Total Sales')
            ),
            React.createElement('div', {
              style: { padding: '12px', borderRadius: 12, background: isDark ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.6)', textAlign: 'center' }
            },
              React.createElement('div', { style: { fontSize: 20, fontWeight: 800, color: t.text, fontFamily: fontStack } }, '4.7'),
              React.createElement('div', { style: { fontSize: 11, color: t.textMuted, fontFamily: fontStack } }, 'Avg Rating')
            )
          )
        )
      ),

      // My Kits
      React.createElement('div', { style: { padding: '0 20px' } },
        React.createElement('h3', { style: { fontSize: 17, fontWeight: 700, color: t.text, fontFamily: fontStack, margin: '0 0 14px' } }, 'My Kits'),
        myKits.map((kit, i) =>
          React.createElement(AnimatedCard, { key: i, delay: 0.2 + i * 0.1, style: { marginBottom: 12 } },
            React.createElement('div', {
              style: {
                padding: 16, borderRadius: 18,
                background: t.card, border: `1px solid ${t.border}`,
              }
            },
              React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 } },
                React.createElement('div', null,
                  React.createElement('h4', { style: { fontSize: 16, fontWeight: 700, color: t.text, fontFamily: fontStack, margin: 0 } }, kit.title),
                  React.createElement(Badge, { text: kit.status, color: kit.status === 'Published' ? '#10B981' : t.textMuted })
                ),
                React.createElement('button', {
                  style: {
                    width: 36, height: 36, borderRadius: 10, border: `1px solid ${t.border}`,
                    background: 'transparent', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }
                }, React.createElement(Icon, { name: 'MoreHorizontal', size: 18, color: t.textMuted }))
              ),
              React.createElement('div', { style: { display: 'flex', gap: 20 } },
                React.createElement('div', null,
                  React.createElement('div', { style: { fontSize: 18, fontWeight: 800, color: t.text, fontFamily: fontStack } }, kit.sales),
                  React.createElement('div', { style: { fontSize: 11, color: t.textMuted, fontFamily: fontStack } }, 'Sales')
                ),
                React.createElement('div', null,
                  React.createElement('div', { style: { fontSize: 18, fontWeight: 800, color: t.text, fontFamily: fontStack } }, kit.revenue),
                  React.createElement('div', { style: { fontSize: 11, color: t.textMuted, fontFamily: fontStack } }, 'Revenue')
                ),
                kit.rating && React.createElement('div', null,
                  React.createElement('div', { style: { fontSize: 18, fontWeight: 800, color: '#F59E0B', fontFamily: fontStack, display: 'flex', alignItems: 'center', gap: 4 } },
                    React.createElement(Icon, { name: 'Star', size: 14, color: '#F59E0B' }),
                    kit.rating
                  ),
                  React.createElement('div', { style: { fontSize: 11, color: t.textMuted, fontFamily: fontStack } }, 'Rating')
                )
              )
            )
          )
        ),

        // Kit Builder CTA
        React.createElement(AnimatedCard, { delay: 0.4 },
          React.createElement('div', {
            style: {
              marginTop: 8, padding: '24px 20px', borderRadius: 20,
              border: `2px dashed ${t.border}`, textAlign: 'center',
              cursor: 'pointer', transition: 'all 0.2s ease',
            }
          },
            React.createElement(Icon, { name: 'PenTool', size: 32, color: t.textMuted, style: { margin: '0 auto 10px' } }),
            React.createElement('h4', { style: { fontSize: 15, fontWeight: 700, color: t.text, fontFamily: fontStack, margin: '0 0 4px' } },
              'Create a New Kit'),
            React.createElement('p', { style: { fontSize: 13, color: t.textMuted, fontFamily: fontStack, margin: 0 } },
              'Package your creative wisdom and monetize it')
          )
        )
      )
    );
  };

  const screens = {
    home: HomeScreen,
    explore: ExploreScreen,
    detail: DetailScreen,
    canvas: CanvasScreen,
    community: CommunityScreen,
    studio: StudioScreen,
  };

  const tabs = [
    { id: 'home', label: 'Home', icon: 'Home' },
    { id: 'explore', label: 'Explore', icon: 'Compass' },
    { id: 'canvas', label: 'Canvas', icon: 'Palette' },
    { id: 'community', label: 'Community', icon: 'Users' },
    { id: 'studio', label: 'Studio', icon: 'Wand2' },
  ];

  const currentScreen = activeScreen === 'detail' ? 'detail' : activeScreen;
  const ScreenComponent = screens[currentScreen] || screens.home;

  return React.createElement('div', {
    style: {
      minHeight: '100vh',
      background: '#f0f0f0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px 0',
      fontFamily: fontStack,
    }
  },
    styleTag,
    React.createElement('div', {
      style: {
        width: 375,
        height: 812,
        borderRadius: 40,
        overflow: 'hidden',
        background: t.bg,
        position: 'relative',
        boxShadow: '0 25px 80px rgba(0,0,0,0.3)',
        display: 'flex',
        flexDirection: 'column',
      }
    },
      // Scrollable content
      React.createElement('div', {
        style: {
          flex: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
          paddingTop: 8,
          paddingBottom: 80,
        }
      },
        React.createElement(ScreenComponent)
      ),

      // Bottom Tab Bar
      activeScreen !== 'detail' && React.createElement('div', {
        style: {
          position: 'absolute',
          bottom: 0, left: 0, right: 0,
          padding: '8px 8px 24px',
          background: t.tabBg,
          borderTop: `1px solid ${t.border}`,
          display: 'flex',
          justifyContent: 'space-around',
          backdropFilter: 'blur(20px)',
        }
      },
        tabs.map(tab =>
          React.createElement('button', {
            key: tab.id,
            onClick: () => setActiveScreen(tab.id),
            style: {
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 3,
              padding: '6px 0',
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              minWidth: 56,
              minHeight: 44,
              transition: 'all 0.2s ease',
            }
          },
            React.createElement('div', {
              style: {
                padding: '4px 16px',
                borderRadius: 14,
                background: activeScreen === tab.id ? `${t.primary}20` : 'transparent',
                transition: 'all 0.25s ease',
              }
            },
              React.createElement(Icon, {
                name: tab.icon,
                size: 22,
                color: activeScreen === tab.id ? t.primary : t.textMuted,
              })
            ),
            React.createElement('span', {
              style: {
                fontSize: 10,
                fontWeight: activeScreen === tab.id ? 700 : 500,
                color: activeScreen === tab.id ? t.primary : t.textMuted,
                fontFamily: fontStack,
              }
            }, tab.label)
          )
        )
      )
    )
  );
}
