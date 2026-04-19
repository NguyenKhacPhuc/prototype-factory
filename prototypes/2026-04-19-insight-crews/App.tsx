const { useState, useEffect, useRef, useCallback } = React;

function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [isDark, setIsDark] = useState(true);
  const [joinedExpedition, setJoinedExpedition] = useState(null);
  const [selectedCrew, setSelectedCrew] = useState(null);
  const [animateIn, setAnimateIn] = useState(true);

  const themes = {
    dark: {
      bg: '#0A1A18',
      surface: '#0F2623',
      surfaceAlt: '#143330',
      card: '#173B37',
      cardHover: '#1A4540',
      text: '#E8FAF7',
      textSecondary: '#8ABAB3',
      textMuted: '#5A8F88',
      border: '#1E4A45',
      primary: '#0D9488',
      secondary: '#14B8A6',
      cta: '#F97316',
      ctaHover: '#FB923C',
      accent: '#2DD4BF',
      overlay: 'rgba(10, 26, 24, 0.85)',
      tabBg: '#0D201E',
      tabBorder: '#1A3D39',
      inputBg: '#0F2623',
      badge: '#F97316',
      success: '#22C55E',
      warning: '#FBBF24',
    },
    light: {
      bg: '#F0FDFA',
      surface: '#FFFFFF',
      surfaceAlt: '#E6F7F4',
      card: '#FFFFFF',
      cardHover: '#F0FDFA',
      text: '#0F2623',
      textSecondary: '#4A7A73',
      textMuted: '#7DA8A1',
      border: '#C8E8E3',
      primary: '#0D9488',
      secondary: '#14B8A6',
      cta: '#F97316',
      ctaHover: '#EA580C',
      accent: '#0D9488',
      overlay: 'rgba(240, 253, 250, 0.9)',
      tabBg: '#FFFFFF',
      tabBorder: '#D4ECE8',
      inputBg: '#F0FDFA',
      badge: '#F97316',
      success: '#16A34A',
      warning: '#EAB308',
    }
  };

  const t = isDark ? themes.dark : themes.light;
  const font = "-apple-system, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif";

  useEffect(() => {
    setAnimateIn(false);
    const timer = setTimeout(() => setAnimateIn(true), 30);
    return () => clearTimeout(timer);
  }, [activeScreen]);

  const styleTag = React.createElement('style', null, `
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
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }
    @keyframes glow {
      0%, 100% { box-shadow: 0 0 8px rgba(13,148,136,0.3); }
      50% { box-shadow: 0 0 20px rgba(13,148,136,0.6); }
    }
    @keyframes ripple {
      to { transform: scale(2.5); opacity: 0; }
    }
    * { -webkit-tap-highlight-color: transparent; }
    ::-webkit-scrollbar { width: 0; height: 0; }
  `);

  // Icons helper
  const Icon = ({ name, size = 20, color = t.text, style = {} }) => {
    const IconComponent = window.lucide && window.lucide[name];
    if (!IconComponent) return null;
    return React.createElement(IconComponent, { size, color, style, strokeWidth: 1.8 });
  };

  // Shared components
  const TabBar = () => {
    const tabs = [
      { id: 'home', label: 'Expeditions', icon: 'Compass' },
      { id: 'discover', label: 'Stream', icon: 'Zap' },
      { id: 'crew', label: 'Crew', icon: 'Users' },
      { id: 'atlas', label: 'Atlas', icon: 'Globe' },
      { id: 'profile', label: 'Profile', icon: 'User' },
    ];
    return React.createElement('div', {
      style: {
        display: 'flex', justifyContent: 'space-around', alignItems: 'center',
        padding: '8px 4px 28px', background: t.tabBg,
        borderTop: `1px solid ${t.tabBorder}`,
        position: 'absolute', bottom: 0, left: 0, right: 0,
        backdropFilter: 'blur(20px)', zIndex: 100,
      }
    }, tabs.map(tab =>
      React.createElement('button', {
        key: tab.id,
        onClick: () => setActiveScreen(tab.id),
        style: {
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
          background: 'none', border: 'none', cursor: 'pointer',
          padding: '6px 12px', minWidth: 52, minHeight: 44,
          transition: 'transform 150ms ease',
          transform: activeScreen === tab.id ? 'scale(1.08)' : 'scale(1)',
        }
      },
        React.createElement(Icon, {
          name: tab.icon, size: 22,
          color: activeScreen === tab.id ? t.primary : t.textMuted,
        }),
        React.createElement('span', {
          style: {
            fontFamily: font, fontSize: 11, fontWeight: activeScreen === tab.id ? 600 : 400,
            color: activeScreen === tab.id ? t.primary : t.textMuted,
            letterSpacing: 0.1,
          }
        }, tab.label)
      )
    ));
  };

  // HOME SCREEN - Expedition Board
  const HomeScreen = () => {
    const [activeCategory, setActiveCategory] = useState('all');
    const categories = ['all', 'tech', 'science', 'culture', 'business'];

    const expeditions = [
      {
        id: 1, category: 'tech', difficulty: 'Intermediate', time: '45 min',
        title: 'AI Ethics in Healthcare', crews: 12, spots: 3,
        desc: 'Explore the ethical implications of AI-driven diagnostics and how bias in training data affects patient outcomes across demographics.',
        gradient: 'linear-gradient(135deg, #0D9488, #065F46)',
        icon: 'Brain',
      },
      {
        id: 2, category: 'science', difficulty: 'Beginner', time: '30 min',
        title: 'Ocean Microplastics Mapping', crews: 8, spots: 5,
        desc: 'Collectively analyze satellite data patterns to identify microplastic concentration zones in the Pacific.',
        gradient: 'linear-gradient(135deg, #0284C7, #0D9488)',
        icon: 'Waves',
      },
      {
        id: 3, category: 'business', difficulty: 'Advanced', time: '60 min',
        title: 'Decentralized Supply Chains', crews: 6, spots: 2,
        desc: 'Investigate how blockchain-verified supply chains could transform small-scale agriculture in Southeast Asia.',
        gradient: 'linear-gradient(135deg, #7C3AED, #0D9488)',
        icon: 'Network',
      },
      {
        id: 4, category: 'culture', difficulty: 'Beginner', time: '25 min',
        title: 'Urban Sound Ecology', crews: 15, spots: 4,
        desc: 'Map the soundscape of cities to understand how ambient noise affects creativity, focus, and mental health.',
        gradient: 'linear-gradient(135deg, #E11D48, #F97316)',
        icon: 'AudioLines',
      },
    ];

    const filtered = activeCategory === 'all' ? expeditions : expeditions.filter(e => e.category === activeCategory);

    return React.createElement('div', {
      style: { padding: '16px 20px 100px', animation: animateIn ? 'fadeIn 0.4s ease' : 'none' }
    },
      // Header
      React.createElement('div', {
        style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }
      },
        React.createElement('div', null,
          React.createElement('h1', {
            style: { fontFamily: font, fontSize: 34, fontWeight: 800, color: t.text, margin: 0, letterSpacing: -0.5 }
          }, 'Expeditions'),
          React.createElement('p', {
            style: { fontFamily: font, fontSize: 15, color: t.textSecondary, margin: '4px 0 0' }
          }, '4 new challenges today')
        ),
        React.createElement('button', {
          onClick: () => setIsDark(!isDark),
          style: {
            width: 44, height: 44, borderRadius: 22, border: 'none',
            background: t.surface, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: `0 2px 8px ${isDark ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.08)'}`,
          }
        }, React.createElement(Icon, { name: isDark ? 'Sun' : 'Moon', size: 20, color: t.primary }))
      ),

      // Daily streak banner
      React.createElement('div', {
        style: {
          background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})`,
          borderRadius: 16, padding: '16px 20px', marginBottom: 20,
          display: 'flex', alignItems: 'center', gap: 14,
          animation: 'slideUp 0.5s ease',
        }
      },
        React.createElement('div', {
          style: {
            width: 48, height: 48, borderRadius: 14, background: 'rgba(255,255,255,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }
        }, React.createElement(Icon, { name: 'Flame', size: 26, color: '#FFFFFF' })),
        React.createElement('div', { style: { flex: 1 } },
          React.createElement('p', {
            style: { fontFamily: font, fontSize: 17, fontWeight: 700, color: '#FFFFFF', margin: 0 }
          }, '7-Day Discovery Streak!'),
          React.createElement('p', {
            style: { fontFamily: font, fontSize: 13, color: 'rgba(255,255,255,0.8)', margin: '2px 0 0' }
          }, 'Complete today\'s expedition to keep it going')
        ),
        React.createElement(Icon, { name: 'ChevronRight', size: 20, color: 'rgba(255,255,255,0.7)' })
      ),

      // Categories
      React.createElement('div', {
        style: { display: 'flex', gap: 8, marginBottom: 20, overflowX: 'auto', paddingBottom: 4 }
      }, categories.map(cat =>
        React.createElement('button', {
          key: cat, onClick: () => setActiveCategory(cat),
          style: {
            padding: '8px 16px', borderRadius: 20, border: 'none', cursor: 'pointer',
            fontFamily: font, fontSize: 14, fontWeight: 600, whiteSpace: 'nowrap',
            background: activeCategory === cat ? t.primary : t.surfaceAlt,
            color: activeCategory === cat ? '#FFFFFF' : t.textSecondary,
            transition: 'all 200ms ease', minHeight: 44,
          }
        }, cat.charAt(0).toUpperCase() + cat.slice(1))
      )),

      // Expedition cards
      filtered.map((exp, i) =>
        React.createElement('div', {
          key: exp.id,
          onClick: () => { setJoinedExpedition(exp); setActiveScreen('crew'); },
          style: {
            background: t.card, borderRadius: 20, marginBottom: 16,
            overflow: 'hidden', cursor: 'pointer',
            border: `1px solid ${t.border}`,
            transition: 'transform 200ms ease, box-shadow 200ms ease',
            animation: `slideUp ${0.4 + i * 0.1}s ease`,
            boxShadow: `0 4px 16px ${isDark ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.06)'}`,
          },
          onMouseEnter: e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 8px 24px ${isDark ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.1)'}` },
          onMouseLeave: e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = `0 4px 16px ${isDark ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.06)'}` },
        },
          // Card gradient header
          React.createElement('div', {
            style: {
              background: exp.gradient, padding: '20px 20px 16px',
              display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
            }
          },
            React.createElement('div', {
              style: {
                width: 44, height: 44, borderRadius: 12, background: 'rgba(255,255,255,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }
            }, React.createElement(Icon, { name: exp.icon, size: 24, color: '#FFFFFF' })),
            React.createElement('div', {
              style: {
                display: 'flex', gap: 6,
              }
            },
              React.createElement('span', {
                style: {
                  padding: '4px 10px', borderRadius: 12, background: 'rgba(255,255,255,0.2)',
                  fontFamily: font, fontSize: 12, fontWeight: 600, color: '#FFFFFF',
                }
              }, exp.difficulty),
              React.createElement('span', {
                style: {
                  padding: '4px 10px', borderRadius: 12, background: 'rgba(255,255,255,0.2)',
                  fontFamily: font, fontSize: 12, fontWeight: 600, color: '#FFFFFF',
                  display: 'flex', alignItems: 'center', gap: 4,
                }
              }, React.createElement(Icon, { name: 'Clock', size: 12, color: '#FFFFFF' }), exp.time)
            )
          ),
          // Card body
          React.createElement('div', { style: { padding: '16px 20px 20px' } },
            React.createElement('h3', {
              style: { fontFamily: font, fontSize: 20, fontWeight: 700, color: t.text, margin: '0 0 8px', letterSpacing: -0.3 }
            }, exp.title),
            React.createElement('p', {
              style: { fontFamily: font, fontSize: 14, color: t.textSecondary, margin: '0 0 14px', lineHeight: 1.5 }
            }, exp.desc),
            React.createElement('div', {
              style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' }
            },
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6 } },
                React.createElement(Icon, { name: 'Users', size: 16, color: t.textMuted }),
                React.createElement('span', {
                  style: { fontFamily: font, fontSize: 13, color: t.textMuted }
                }, `${exp.crews} crews active`),
              ),
              React.createElement('div', {
                style: {
                  padding: '8px 16px', borderRadius: 12, background: t.cta,
                  fontFamily: font, fontSize: 14, fontWeight: 600, color: '#FFFFFF',
                  display: 'flex', alignItems: 'center', gap: 4,
                }
              },
                React.createElement('span', null, 'Join'),
                React.createElement(Icon, { name: 'ArrowRight', size: 14, color: '#FFFFFF' })
              )
            )
          )
        )
      )
    );
  };

  // DISCOVER SCREEN - Discovery Stream
  const DiscoverScreen = () => {
    const [activeTab, setActiveTab] = useState('feed');
    const streamItems = [
      {
        id: 1, type: 'insight', user: 'Maya Chen', role: 'Researcher', time: '5m ago',
        avatar: '🔬', content: 'Found a 2024 WHO study linking AI diagnostic accuracy to training data diversity. Key finding: models trained on diverse datasets showed 34% fewer misdiagnoses.',
        likes: 14, replies: 3, icon: 'FileText',
      },
      {
        id: 2, type: 'audio', user: 'James Park', role: 'Synthesizer', time: '12m ago',
        avatar: '🎧', content: 'Quick voice note summarizing the three main ethical frameworks we should consider: Utilitarian, Deontological, and Virtue Ethics approaches to AI healthcare.',
        likes: 8, replies: 1, icon: 'Mic',
      },
      {
        id: 3, type: 'visual', user: 'Aisha Kumar', role: 'Illustrator', time: '18m ago',
        avatar: '🎨', content: 'Created an infographic mapping the patient journey through AI-assisted diagnosis. Shows 5 critical decision points where human oversight is essential.',
        likes: 22, replies: 7, icon: 'Image',
      },
      {
        id: 4, type: 'question', user: 'Liam Torres', role: 'Challenger', time: '25m ago',
        avatar: '❓', content: 'Should we consider the economic incentive structures that drive hospitals to adopt AI diagnostics without adequate validation? This seems underexplored.',
        likes: 11, replies: 5, icon: 'HelpCircle',
      },
    ];

    const typeColors = { insight: '#0D9488', audio: '#7C3AED', visual: '#E11D48', question: '#F97316' };
    const typeLabels = { insight: 'Research', audio: 'Audio Note', visual: 'Visual Card', question: 'Question' };

    return React.createElement('div', {
      style: { padding: '16px 20px 100px', animation: animateIn ? 'fadeIn 0.4s ease' : 'none' }
    },
      React.createElement('div', {
        style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }
      },
        React.createElement('div', null,
          React.createElement('h1', {
            style: { fontFamily: font, fontSize: 34, fontWeight: 800, color: t.text, margin: 0, letterSpacing: -0.5 }
          }, 'Stream'),
          React.createElement('p', {
            style: { fontFamily: font, fontSize: 15, color: t.textSecondary, margin: '4px 0 0' }
          }, 'AI Ethics Expedition')
        ),
        React.createElement('button', {
          style: {
            width: 44, height: 44, borderRadius: 22, border: `1px solid ${t.border}`,
            background: t.surface, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }
        }, React.createElement(Icon, { name: 'Filter', size: 18, color: t.textSecondary }))
      ),

      // Tabs
      React.createElement('div', {
        style: { display: 'flex', gap: 0, marginBottom: 20, background: t.surfaceAlt, borderRadius: 12, padding: 3 }
      },
        ['feed', 'pinned', 'mine'].map(tab =>
          React.createElement('button', {
            key: tab, onClick: () => setActiveTab(tab),
            style: {
              flex: 1, padding: '10px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
              fontFamily: font, fontSize: 14, fontWeight: 600, minHeight: 44,
              background: activeTab === tab ? t.card : 'transparent',
              color: activeTab === tab ? t.text : t.textMuted,
              boxShadow: activeTab === tab ? `0 2px 8px ${isDark ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.05)'}` : 'none',
              transition: 'all 200ms ease',
            }
          }, tab.charAt(0).toUpperCase() + tab.slice(1))
        )
      ),

      // Crew progress
      React.createElement('div', {
        style: {
          background: t.card, borderRadius: 16, padding: 16, marginBottom: 20,
          border: `1px solid ${t.border}`,
        }
      },
        React.createElement('div', {
          style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }
        },
          React.createElement('span', {
            style: { fontFamily: font, fontSize: 14, fontWeight: 600, color: t.text }
          }, 'Crew Progress'),
          React.createElement('span', {
            style: { fontFamily: font, fontSize: 13, fontWeight: 700, color: t.primary }
          }, '68%'),
        ),
        React.createElement('div', {
          style: { height: 6, background: t.surfaceAlt, borderRadius: 3, overflow: 'hidden' }
        },
          React.createElement('div', {
            style: {
              width: '68%', height: '100%', borderRadius: 3,
              background: `linear-gradient(90deg, ${t.primary}, ${t.secondary})`,
              transition: 'width 500ms ease',
            }
          })
        ),
        React.createElement('div', {
          style: { display: 'flex', justifyContent: 'space-between', marginTop: 8 }
        },
          React.createElement('span', { style: { fontFamily: font, fontSize: 12, color: t.textMuted } }, '12 insights shared'),
          React.createElement('span', { style: { fontFamily: font, fontSize: 12, color: t.textMuted } }, '2h 15m remaining'),
        )
      ),

      // Stream items
      streamItems.map((item, i) =>
        React.createElement('div', {
          key: item.id,
          style: {
            background: t.card, borderRadius: 16, padding: 16, marginBottom: 12,
            border: `1px solid ${t.border}`,
            animation: `slideUp ${0.3 + i * 0.1}s ease`,
            transition: 'transform 150ms ease',
            cursor: 'pointer',
          },
          onMouseEnter: e => { e.currentTarget.style.transform = 'translateY(-1px)' },
          onMouseLeave: e => { e.currentTarget.style.transform = 'translateY(0)' },
        },
          // Header
          React.createElement('div', {
            style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }
          },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10 } },
              React.createElement('div', {
                style: {
                  width: 36, height: 36, borderRadius: 18, background: t.surfaceAlt,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: `2px solid ${typeColors[item.type]}`,
                }
              }, React.createElement(Icon, { name: item.icon, size: 16, color: typeColors[item.type] })),
              React.createElement('div', null,
                React.createElement('p', {
                  style: { fontFamily: font, fontSize: 15, fontWeight: 600, color: t.text, margin: 0 }
                }, item.user),
                React.createElement('p', {
                  style: { fontFamily: font, fontSize: 12, color: t.textMuted, margin: 0 }
                }, `${item.role} \u00B7 ${item.time}`)
              )
            ),
            React.createElement('span', {
              style: {
                padding: '3px 8px', borderRadius: 6, fontSize: 11, fontWeight: 600,
                fontFamily: font, color: typeColors[item.type],
                background: `${typeColors[item.type]}15`,
              }
            }, typeLabels[item.type])
          ),
          // Content
          React.createElement('p', {
            style: { fontFamily: font, fontSize: 15, color: t.text, margin: '0 0 12px', lineHeight: 1.55 }
          }, item.content),
          // Actions
          React.createElement('div', {
            style: { display: 'flex', gap: 16, alignItems: 'center' }
          },
            React.createElement('button', {
              style: {
                display: 'flex', alignItems: 'center', gap: 5, background: 'none',
                border: 'none', cursor: 'pointer', padding: '4px 0', minHeight: 44,
              }
            },
              React.createElement(Icon, { name: 'ThumbsUp', size: 16, color: t.textMuted }),
              React.createElement('span', { style: { fontFamily: font, fontSize: 13, color: t.textMuted } }, item.likes),
            ),
            React.createElement('button', {
              style: {
                display: 'flex', alignItems: 'center', gap: 5, background: 'none',
                border: 'none', cursor: 'pointer', padding: '4px 0', minHeight: 44,
              }
            },
              React.createElement(Icon, { name: 'MessageCircle', size: 16, color: t.textMuted }),
              React.createElement('span', { style: { fontFamily: font, fontSize: 13, color: t.textMuted } }, item.replies),
            ),
            React.createElement('button', {
              style: {
                display: 'flex', alignItems: 'center', gap: 5, background: 'none',
                border: 'none', cursor: 'pointer', padding: '4px 0', minHeight: 44,
              }
            },
              React.createElement(Icon, { name: 'Bookmark', size: 16, color: t.textMuted }),
            ),
          )
        )
      ),

      // Add contribution FAB
      React.createElement('button', {
        style: {
          position: 'fixed', bottom: 100, right: 'calc(50% - 187px + 20px)',
          width: 56, height: 56, borderRadius: 28,
          background: `linear-gradient(135deg, ${t.cta}, ${t.ctaHover})`,
          border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: `0 4px 16px rgba(249,115,22,0.4)`,
          animation: 'pulse 2s infinite',
          zIndex: 50,
        }
      }, React.createElement(Icon, { name: 'Plus', size: 26, color: '#FFFFFF' }))
    );
  };

  // CREW SCREEN
  const CrewScreen = () => {
    const [selectedRole, setSelectedRole] = useState(null);
    const roles = [
      { id: 'synthesizer', name: 'Synthesizer', icon: 'Layers', desc: 'Combines ideas into coherent narratives', color: '#0D9488' },
      { id: 'researcher', name: 'Researcher', icon: 'Search', desc: 'Digs deep into sources and evidence', color: '#7C3AED' },
      { id: 'illustrator', name: 'Illustrator', icon: 'Palette', desc: 'Creates visual explanations and diagrams', color: '#E11D48' },
      { id: 'challenger', name: 'Challenger', icon: 'Shield', desc: 'Questions assumptions and plays devil\'s advocate', color: '#F97316' },
      { id: 'curator', name: 'Curator', icon: 'Library', desc: 'Organizes and structures the final output', color: '#0EA5E9' },
    ];

    const crewMembers = [
      { name: 'Maya Chen', role: 'Researcher', status: 'active', contributions: 5 },
      { name: 'James Park', role: 'Synthesizer', status: 'active', contributions: 3 },
      { name: 'Aisha Kumar', role: 'Illustrator', status: 'idle', contributions: 4 },
    ];

    return React.createElement('div', {
      style: { padding: '16px 20px 100px', animation: animateIn ? 'fadeIn 0.4s ease' : 'none' }
    },
      React.createElement('h1', {
        style: { fontFamily: font, fontSize: 34, fontWeight: 800, color: t.text, margin: '0 0 4px', letterSpacing: -0.5 }
      }, 'Your Crew'),
      React.createElement('p', {
        style: { fontFamily: font, fontSize: 15, color: t.textSecondary, margin: '0 0 24px' }
      }, joinedExpedition ? joinedExpedition.title : 'Join an expedition to form a crew'),

      // Crew members
      React.createElement('div', {
        style: {
          background: t.card, borderRadius: 20, padding: 20, marginBottom: 20,
          border: `1px solid ${t.border}`,
        }
      },
        React.createElement('div', {
          style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }
        },
          React.createElement('h2', {
            style: { fontFamily: font, fontSize: 18, fontWeight: 700, color: t.text, margin: 0 }
          }, 'Crew Members'),
          React.createElement('span', {
            style: {
              padding: '4px 10px', borderRadius: 10, background: `${t.primary}20`,
              fontFamily: font, fontSize: 13, fontWeight: 600, color: t.primary,
            }
          }, '3/5')
        ),

        crewMembers.map((member, i) =>
          React.createElement('div', {
            key: i,
            style: {
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '12px 0',
              borderBottom: i < crewMembers.length - 1 ? `1px solid ${t.border}` : 'none',
            }
          },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12 } },
              React.createElement('div', {
                style: {
                  width: 40, height: 40, borderRadius: 20, background: t.surfaceAlt,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  position: 'relative',
                }
              },
                React.createElement(Icon, { name: 'User', size: 18, color: t.textSecondary }),
                React.createElement('div', {
                  style: {
                    position: 'absolute', bottom: 0, right: 0,
                    width: 10, height: 10, borderRadius: 5,
                    background: member.status === 'active' ? t.success : t.warning,
                    border: `2px solid ${t.card}`,
                  }
                })
              ),
              React.createElement('div', null,
                React.createElement('p', {
                  style: { fontFamily: font, fontSize: 15, fontWeight: 600, color: t.text, margin: 0 }
                }, member.name),
                React.createElement('p', {
                  style: { fontFamily: font, fontSize: 13, color: t.textMuted, margin: 0 }
                }, member.role)
              )
            ),
            React.createElement('span', {
              style: { fontFamily: font, fontSize: 13, color: t.textSecondary }
            }, `${member.contributions} insights`)
          )
        ),

        // Invite button
        React.createElement('button', {
          style: {
            width: '100%', padding: '14px', marginTop: 16, borderRadius: 14,
            border: `1px dashed ${t.border}`, background: t.surfaceAlt,
            cursor: 'pointer', display: 'flex', alignItems: 'center',
            justifyContent: 'center', gap: 8, minHeight: 48,
          }
        },
          React.createElement(Icon, { name: 'UserPlus', size: 18, color: t.primary }),
          React.createElement('span', {
            style: { fontFamily: font, fontSize: 15, fontWeight: 600, color: t.primary }
          }, 'Invite Crew Member')
        )
      ),

      // Pick a role
      React.createElement('h2', {
        style: { fontFamily: font, fontSize: 22, fontWeight: 700, color: t.text, margin: '0 0 14px', letterSpacing: -0.3 }
      }, 'Pick Your Role'),

      roles.map((role, i) =>
        React.createElement('button', {
          key: role.id,
          onClick: () => setSelectedRole(role.id === selectedRole ? null : role.id),
          style: {
            width: '100%', display: 'flex', alignItems: 'center', gap: 14,
            padding: 16, marginBottom: 10, borderRadius: 16,
            background: selectedRole === role.id ? `${role.color}15` : t.card,
            border: `1.5px solid ${selectedRole === role.id ? role.color : t.border}`,
            cursor: 'pointer', textAlign: 'left',
            transition: 'all 200ms ease',
            animation: `slideUp ${0.3 + i * 0.08}s ease`,
            minHeight: 48,
          }
        },
          React.createElement('div', {
            style: {
              width: 44, height: 44, borderRadius: 12,
              background: `${role.color}20`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }
          }, React.createElement(Icon, { name: role.icon, size: 22, color: role.color })),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('p', {
              style: { fontFamily: font, fontSize: 16, fontWeight: 600, color: t.text, margin: 0 }
            }, role.name),
            React.createElement('p', {
              style: { fontFamily: font, fontSize: 13, color: t.textMuted, margin: '2px 0 0' }
            }, role.desc),
          ),
          selectedRole === role.id && React.createElement(Icon, { name: 'CheckCircle', size: 22, color: role.color })
        )
      ),

      // Start button
      selectedRole && React.createElement('button', {
        onClick: () => setActiveScreen('discover'),
        style: {
          width: '100%', padding: '16px', marginTop: 10, borderRadius: 16,
          background: `linear-gradient(135deg, ${t.cta}, ${t.ctaHover})`,
          border: 'none', cursor: 'pointer',
          fontFamily: font, fontSize: 17, fontWeight: 700, color: '#FFFFFF',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          boxShadow: '0 4px 16px rgba(249,115,22,0.35)',
          animation: 'slideUp 0.3s ease', minHeight: 52,
        }
      },
        React.createElement('span', null, 'Start Expedition'),
        React.createElement(Icon, { name: 'Rocket', size: 20, color: '#FFFFFF' })
      )
    );
  };

  // ATLAS SCREEN - Knowledge Atlas
  const AtlasScreen = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const nuggets = [
      {
        id: 1, title: 'The Paradox of AI Transparency',
        topic: 'AI Ethics', crew: 'Neural Navigators', quality: 4.8,
        desc: 'More transparent AI systems can paradoxically reduce trust when users misinterpret explanation complexity as system uncertainty.',
        views: 342, saves: 89,
      },
      {
        id: 2, title: 'Coral Reef Recovery Patterns',
        topic: 'Marine Biology', crew: 'Ocean Scouts', quality: 4.6,
        desc: 'Coral reefs near urban areas show unexpected recovery when paired with specific algae species that act as natural biofilters.',
        views: 567, saves: 134,
      },
      {
        id: 3, title: 'Micro-Community Economics',
        topic: 'Urban Planning', crew: 'City Thinkers', quality: 4.9,
        desc: 'Neighborhoods with 3+ communal micro-businesses within walking distance show 40% higher social cohesion metrics.',
        views: 891, saves: 201,
      },
      {
        id: 4, title: 'Sound and Productivity Mapping',
        topic: 'Neuroscience', crew: 'Sound Explorers', quality: 4.7,
        desc: 'Ambient noise between 50-70dB with natural elements boosts creative output by 23% compared to silence or music.',
        views: 445, saves: 156,
      },
    ];

    const filtered = searchQuery
      ? nuggets.filter(n => n.title.toLowerCase().includes(searchQuery.toLowerCase()) || n.topic.toLowerCase().includes(searchQuery.toLowerCase()))
      : nuggets;

    return React.createElement('div', {
      style: { padding: '16px 20px 100px', animation: animateIn ? 'fadeIn 0.4s ease' : 'none' }
    },
      React.createElement('h1', {
        style: { fontFamily: font, fontSize: 34, fontWeight: 800, color: t.text, margin: '0 0 4px', letterSpacing: -0.5 }
      }, 'Knowledge Atlas'),
      React.createElement('p', {
        style: { fontFamily: font, fontSize: 15, color: t.textSecondary, margin: '0 0 20px' }
      }, 'Collective wisdom from past expeditions'),

      // Search
      React.createElement('div', {
        style: {
          display: 'flex', alignItems: 'center', gap: 10,
          background: t.surfaceAlt, borderRadius: 14, padding: '0 14px',
          marginBottom: 20, border: `1px solid ${t.border}`,
        }
      },
        React.createElement(Icon, { name: 'Search', size: 18, color: t.textMuted }),
        React.createElement('input', {
          value: searchQuery,
          onChange: (e) => setSearchQuery(e.target.value),
          placeholder: 'Search insights...',
          style: {
            flex: 1, padding: '14px 0', border: 'none', outline: 'none',
            background: 'transparent', fontFamily: font, fontSize: 16,
            color: t.text, minHeight: 44,
          }
        })
      ),

      // Stats bar
      React.createElement('div', {
        style: {
          display: 'flex', gap: 10, marginBottom: 20,
        }
      },
        [
          { label: 'Nuggets', value: '2.4K', icon: 'Sparkles' },
          { label: 'Topics', value: '186', icon: 'Hash' },
          { label: 'Crews', value: '512', icon: 'Users' },
        ].map((stat, i) =>
          React.createElement('div', {
            key: i,
            style: {
              flex: 1, background: t.card, borderRadius: 14, padding: '14px 12px',
              border: `1px solid ${t.border}`, textAlign: 'center',
            }
          },
            React.createElement(Icon, { name: stat.icon, size: 18, color: t.primary, style: { marginBottom: 4 } }),
            React.createElement('p', {
              style: { fontFamily: font, fontSize: 20, fontWeight: 800, color: t.text, margin: '2px 0 0' }
            }, stat.value),
            React.createElement('p', {
              style: { fontFamily: font, fontSize: 12, color: t.textMuted, margin: '2px 0 0' }
            }, stat.label)
          )
        )
      ),

      // Nugget cards
      filtered.map((nugget, i) =>
        React.createElement('div', {
          key: nugget.id,
          style: {
            background: t.card, borderRadius: 18, padding: 18, marginBottom: 14,
            border: `1px solid ${t.border}`,
            animation: `slideUp ${0.3 + i * 0.1}s ease`,
            cursor: 'pointer', transition: 'transform 150ms ease',
          },
          onMouseEnter: e => { e.currentTarget.style.transform = 'translateY(-1px)' },
          onMouseLeave: e => { e.currentTarget.style.transform = 'translateY(0)' },
        },
          React.createElement('div', {
            style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }
          },
            React.createElement('span', {
              style: {
                padding: '4px 10px', borderRadius: 8, fontSize: 12, fontWeight: 600,
                fontFamily: font, color: t.primary, background: `${t.primary}15`,
              }
            }, nugget.topic),
            React.createElement('div', {
              style: { display: 'flex', alignItems: 'center', gap: 3 }
            },
              React.createElement(Icon, { name: 'Star', size: 14, color: '#FBBF24' }),
              React.createElement('span', {
                style: { fontFamily: font, fontSize: 13, fontWeight: 700, color: t.text }
              }, nugget.quality)
            )
          ),
          React.createElement('h3', {
            style: { fontFamily: font, fontSize: 18, fontWeight: 700, color: t.text, margin: '0 0 6px', letterSpacing: -0.2 }
          }, nugget.title),
          React.createElement('p', {
            style: { fontFamily: font, fontSize: 14, color: t.textSecondary, margin: '0 0 12px', lineHeight: 1.5 }
          }, nugget.desc),
          React.createElement('div', {
            style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' }
          },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
              React.createElement(Icon, { name: 'Users', size: 14, color: t.textMuted }),
              React.createElement('span', {
                style: { fontFamily: font, fontSize: 12, color: t.textMuted }
              }, nugget.crew)
            ),
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12 } },
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
                React.createElement(Icon, { name: 'Eye', size: 14, color: t.textMuted }),
                React.createElement('span', { style: { fontFamily: font, fontSize: 12, color: t.textMuted } }, nugget.views),
              ),
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
                React.createElement(Icon, { name: 'Bookmark', size: 14, color: t.textMuted }),
                React.createElement('span', { style: { fontFamily: font, fontSize: 12, color: t.textMuted } }, nugget.saves),
              ),
            )
          )
        )
      )
    );
  };

  // PROFILE SCREEN
  const ProfileScreen = () => {
    const stats = [
      { label: 'Expeditions', value: '23', icon: 'Compass' },
      { label: 'Insights', value: '87', icon: 'Lightbulb' },
      { label: 'Reputation', value: '1.2K', icon: 'Trophy' },
    ];
    const badges = [
      { name: 'Early Explorer', icon: 'Rocket', color: '#F97316', earned: true },
      { name: 'Team Player', icon: 'Heart', color: '#E11D48', earned: true },
      { name: 'Deep Diver', icon: 'ArrowDown', color: '#0D9488', earned: true },
      { name: 'Visionary', icon: 'Eye', color: '#7C3AED', earned: false },
      { name: 'Mentor', icon: 'GraduationCap', color: '#0EA5E9', earned: false },
    ];
    const recentActivity = [
      { action: 'Completed', target: 'AI Ethics Expedition', time: '2h ago', icon: 'CheckCircle' },
      { action: 'Earned badge', target: 'Deep Diver', time: '1d ago', icon: 'Award' },
      { action: 'Joined crew', target: 'Neural Navigators', time: '2d ago', icon: 'Users' },
      { action: 'Published nugget', target: 'Sound Ecology Findings', time: '3d ago', icon: 'FileText' },
    ];

    return React.createElement('div', {
      style: { padding: '16px 20px 100px', animation: animateIn ? 'fadeIn 0.4s ease' : 'none' }
    },
      // Profile header
      React.createElement('div', {
        style: {
          textAlign: 'center', marginBottom: 24, paddingTop: 8,
        }
      },
        React.createElement('div', {
          style: {
            width: 80, height: 80, borderRadius: 40, margin: '0 auto 12px',
            background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: `0 4px 20px ${t.primary}40`,
          }
        }, React.createElement(Icon, { name: 'User', size: 36, color: '#FFFFFF' })),
        React.createElement('h1', {
          style: { fontFamily: font, fontSize: 24, fontWeight: 800, color: t.text, margin: '0 0 2px', letterSpacing: -0.3 }
        }, 'Alex Rivera'),
        React.createElement('p', {
          style: { fontFamily: font, fontSize: 15, color: t.textSecondary, margin: 0 }
        }, 'Curious mind, serial collaborator'),
        React.createElement('div', {
          style: {
            display: 'inline-flex', alignItems: 'center', gap: 4,
            padding: '4px 12px', borderRadius: 12, marginTop: 8,
            background: `${t.primary}15`,
          }
        },
          React.createElement(Icon, { name: 'Zap', size: 14, color: t.primary }),
          React.createElement('span', {
            style: { fontFamily: font, fontSize: 13, fontWeight: 600, color: t.primary }
          }, 'Level 12 Explorer')
        )
      ),

      // Stats
      React.createElement('div', {
        style: { display: 'flex', gap: 10, marginBottom: 24 }
      },
        stats.map((stat, i) =>
          React.createElement('div', {
            key: i,
            style: {
              flex: 1, background: t.card, borderRadius: 16, padding: '16px 12px',
              border: `1px solid ${t.border}`, textAlign: 'center',
              animation: `slideUp ${0.3 + i * 0.1}s ease`,
            }
          },
            React.createElement(Icon, { name: stat.icon, size: 20, color: t.primary, style: { marginBottom: 6 } }),
            React.createElement('p', {
              style: { fontFamily: font, fontSize: 22, fontWeight: 800, color: t.text, margin: '0 0 2px' }
            }, stat.value),
            React.createElement('p', {
              style: { fontFamily: font, fontSize: 12, color: t.textMuted, margin: 0 }
            }, stat.label)
          )
        )
      ),

      // Badges
      React.createElement('h2', {
        style: { fontFamily: font, fontSize: 22, fontWeight: 700, color: t.text, margin: '0 0 14px', letterSpacing: -0.3 }
      }, 'Badges'),
      React.createElement('div', {
        style: { display: 'flex', gap: 10, marginBottom: 24, overflowX: 'auto', paddingBottom: 4 }
      },
        badges.map((badge, i) =>
          React.createElement('div', {
            key: i,
            style: {
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
              minWidth: 72, opacity: badge.earned ? 1 : 0.4,
            }
          },
            React.createElement('div', {
              style: {
                width: 52, height: 52, borderRadius: 16,
                background: badge.earned ? `${badge.color}20` : t.surfaceAlt,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: badge.earned ? `2px solid ${badge.color}` : `1px solid ${t.border}`,
              }
            }, React.createElement(Icon, { name: badge.icon, size: 24, color: badge.earned ? badge.color : t.textMuted })),
            React.createElement('span', {
              style: { fontFamily: font, fontSize: 11, color: badge.earned ? t.text : t.textMuted, textAlign: 'center', fontWeight: 500 }
            }, badge.name)
          )
        )
      ),

      // Recent Activity
      React.createElement('h2', {
        style: { fontFamily: font, fontSize: 22, fontWeight: 700, color: t.text, margin: '0 0 14px', letterSpacing: -0.3 }
      }, 'Recent Activity'),
      React.createElement('div', {
        style: {
          background: t.card, borderRadius: 18, overflow: 'hidden',
          border: `1px solid ${t.border}`,
        }
      },
        recentActivity.map((item, i) =>
          React.createElement('div', {
            key: i,
            style: {
              display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px',
              borderBottom: i < recentActivity.length - 1 ? `1px solid ${t.border}` : 'none',
            }
          },
            React.createElement('div', {
              style: {
                width: 36, height: 36, borderRadius: 10, background: `${t.primary}15`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }
            }, React.createElement(Icon, { name: item.icon, size: 18, color: t.primary })),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('p', {
                style: { fontFamily: font, fontSize: 15, color: t.text, margin: 0 }
              }, `${item.action} `, React.createElement('span', { style: { fontWeight: 600 } }, item.target)),
              React.createElement('p', {
                style: { fontFamily: font, fontSize: 12, color: t.textMuted, margin: '2px 0 0' }
              }, item.time)
            ),
            React.createElement(Icon, { name: 'ChevronRight', size: 16, color: t.textMuted })
          )
        )
      ),

      // Settings / Theme toggle
      React.createElement('button', {
        onClick: () => setIsDark(!isDark),
        style: {
          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '16px 18px', marginTop: 20, borderRadius: 16,
          background: t.card, border: `1px solid ${t.border}`,
          cursor: 'pointer', minHeight: 52,
        }
      },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12 } },
          React.createElement(Icon, { name: isDark ? 'Moon' : 'Sun', size: 20, color: t.primary }),
          React.createElement('span', {
            style: { fontFamily: font, fontSize: 16, fontWeight: 600, color: t.text }
          }, isDark ? 'Dark Mode' : 'Light Mode')
        ),
        React.createElement('div', {
          style: {
            width: 48, height: 28, borderRadius: 14, padding: 2,
            background: isDark ? t.primary : t.border,
            transition: 'background 200ms ease',
          }
        },
          React.createElement('div', {
            style: {
              width: 24, height: 24, borderRadius: 12, background: '#FFFFFF',
              transform: isDark ? 'translateX(20px)' : 'translateX(0)',
              transition: 'transform 200ms ease',
              boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
            }
          })
        )
      )
    );
  };

  // Screen router
  const screens = {
    home: HomeScreen,
    discover: DiscoverScreen,
    crew: CrewScreen,
    atlas: AtlasScreen,
    profile: ProfileScreen,
  };

  const ActiveScreen = screens[activeScreen] || HomeScreen;

  return React.createElement('div', {
    style: {
      minHeight: '100vh', background: '#f0f0f0',
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      padding: '20px 0', fontFamily: font,
    }
  },
    styleTag,
    React.createElement('div', {
      style: {
        width: 375, height: 812, borderRadius: 40,
        background: t.bg, position: 'relative', overflow: 'hidden',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        display: 'flex', flexDirection: 'column',
      }
    },
      // Scrollable content
      React.createElement('div', {
        style: {
          flex: 1, overflowY: 'auto', overflowX: 'hidden',
          paddingTop: 12,
        }
      }, React.createElement(ActiveScreen)),
      // Tab bar
      React.createElement(TabBar)
    )
  );
}
