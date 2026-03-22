
const { useState, useEffect, useRef } = React;

const themes = {
  dark: {
    bg: '#0D0F14',
    surface: '#161A24',
    surfaceAlt: '#1E2433',
    card: '#1A1F2E',
    cardBorder: '#252B3B',
    primary: '#00E5A0',
    primaryDim: '#00C488',
    primaryMuted: 'rgba(0,229,160,0.12)',
    primaryGlow: 'rgba(0,229,160,0.25)',
    secondary: '#7C6FFF',
    secondaryMuted: 'rgba(124,111,255,0.15)',
    accent: '#FF6B6B',
    accentMuted: 'rgba(255,107,107,0.15)',
    amber: '#FFB347',
    amberMuted: 'rgba(255,179,71,0.15)',
    text: '#F0F4FF',
    textSecondary: '#8B95B0',
    textMuted: '#4A5168',
    border: '#252B3B',
    navBg: '#111520',
    statusBar: '#0D0F14',
    tag: '#1E2433',
    tagText: '#8B95B0',
    inputBg: '#161A24',
    inputBorder: '#252B3B',
    shadow: 'rgba(0,0,0,0.6)',
    gradient1: 'linear-gradient(135deg, #00E5A0 0%, #00C488 100%)',
    gradient2: 'linear-gradient(135deg, #7C6FFF 0%, #5B4FFF 100%)',
    gradient3: 'linear-gradient(135deg, #0D0F14 0%, #161A24 100%)',
    heroBg: 'linear-gradient(160deg, #101828 0%, #0D0F14 100%)',
  },
  light: {
    bg: '#F5F7FA',
    surface: '#FFFFFF',
    surfaceAlt: '#F0F3F9',
    card: '#FFFFFF',
    cardBorder: '#E4E9F2',
    primary: '#00B37D',
    primaryDim: '#009B6A',
    primaryMuted: 'rgba(0,179,125,0.1)',
    primaryGlow: 'rgba(0,179,125,0.2)',
    secondary: '#6355EE',
    secondaryMuted: 'rgba(99,85,238,0.1)',
    accent: '#E85555',
    accentMuted: 'rgba(232,85,85,0.1)',
    amber: '#E8960A',
    amberMuted: 'rgba(232,150,10,0.1)',
    text: '#111827',
    textSecondary: '#4B5563',
    textMuted: '#9CA3AF',
    border: '#E4E9F2',
    navBg: '#FFFFFF',
    statusBar: '#F5F7FA',
    tag: '#F0F3F9',
    tagText: '#4B5563',
    inputBg: '#F5F7FA',
    inputBorder: '#E4E9F2',
    shadow: 'rgba(0,0,0,0.08)',
    gradient1: 'linear-gradient(135deg, #00B37D 0%, #009B6A 100%)',
    gradient2: 'linear-gradient(135deg, #6355EE 0%, #4B3FDD 100%)',
    gradient3: 'linear-gradient(135deg, #F5F7FA 0%, #FFFFFF 100%)',
    heroBg: 'linear-gradient(160deg, #EEF2FC 0%, #F5F7FA 100%)',
  }
};

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isDark, setIsDark] = useState(true);
  const [pressedTab, setPressedTab] = useState(null);

  const t = isDark ? themes.dark : themes.light;

  const tabs = [
    { id: 'home', label: 'Home', icon: window.lucide.Home },
    { id: 'search', label: 'Search', icon: window.lucide.Search },
    { id: 'library', label: 'Library', icon: window.lucide.BookOpen },
    { id: 'map', label: 'Map', icon: window.lucide.GitBranch },
    { id: 'settings', label: 'Settings', icon: window.lucide.Settings },
  ];

  const screens = {
    home: HomeScreen,
    search: SearchScreen,
    library: LibraryScreen,
    map: MapScreen,
    settings: SettingsScreen,
  };

  const fontLink = `@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');`;

  return React.createElement('div', {
    style: {
      minHeight: '100vh',
      backgroundColor: '#1A1A1A',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
    }
  },
    React.createElement('style', null, fontLink + `
      * { box-sizing: border-box; margin: 0; padding: 0; }
      ::-webkit-scrollbar { display: none; }
      input, textarea { outline: none; border: none; background: none; }
      .phone-screen { scrollbar-width: none; }
    `),
    React.createElement('div', {
      style: {
        width: 375,
        height: 812,
        backgroundColor: t.bg,
        borderRadius: 50,
        overflow: 'hidden',
        position: 'relative',
        boxShadow: `0 40px 100px rgba(0,0,0,0.8), 0 0 0 2px #2A2A2A, 0 0 0 4px #1A1A1A`,
        display: 'flex',
        flexDirection: 'column',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }
    },
      // Status bar
      React.createElement('div', {
        style: {
          backgroundColor: t.statusBar,
          padding: '14px 28px 8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexShrink: 0,
          zIndex: 10,
        }
      },
        React.createElement('span', { style: { color: t.text, fontSize: 13, fontWeight: 600 } }, '9:41'),
        React.createElement('div', {
          style: {
            width: 120, height: 30,
            backgroundColor: '#000',
            borderRadius: 20,
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            top: 8,
          }
        }),
        React.createElement('div', {
          style: { display: 'flex', alignItems: 'center', gap: 5 }
        },
          React.createElement(window.lucide.Wifi, { size: 15, color: t.text }),
          React.createElement(window.lucide.Signal, { size: 15, color: t.text }),
          React.createElement(window.lucide.Battery, { size: 17, color: t.text }),
        )
      ),
      // Screen content
      React.createElement('div', {
        className: 'phone-screen',
        style: {
          flex: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
          backgroundColor: t.bg,
        }
      },
        React.createElement(screens[activeTab], { t, isDark, setIsDark })
      ),
      // Bottom nav
      React.createElement('div', {
        style: {
          backgroundColor: t.navBg,
          borderTop: `1px solid ${t.border}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          padding: '10px 8px 20px',
          flexShrink: 0,
          zIndex: 10,
        }
      },
        tabs.map(tab =>
          React.createElement('div', {
            key: tab.id,
            onClick: () => setActiveTab(tab.id),
            style: {
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 4,
              padding: '6px 14px',
              borderRadius: 14,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              backgroundColor: activeTab === tab.id ? t.primaryMuted : 'transparent',
              transform: pressedTab === tab.id ? 'scale(0.9)' : 'scale(1)',
            },
            onMouseDown: () => setPressedTab(tab.id),
            onMouseUp: () => setPressedTab(null),
          },
            React.createElement(tab.icon, {
              size: 22,
              color: activeTab === tab.id ? t.primary : t.textMuted,
              strokeWidth: activeTab === tab.id ? 2.5 : 1.8,
            }),
            React.createElement('span', {
              style: {
                fontSize: 10,
                fontWeight: activeTab === tab.id ? 700 : 500,
                color: activeTab === tab.id ? t.primary : t.textMuted,
                letterSpacing: '0.3px',
              }
            }, tab.label)
          )
        )
      )
    )
  );
}

function HomeScreen({ t, isDark }) {
  const [pressedCard, setPressedCard] = useState(null);

  const dailyPrompt = {
    situation: 'Difficult Conversation',
    book: 'Never Split the Difference',
    quote: '"The most dangerous negotiation is the one you don\'t know you\'re in."',
    author: 'Chris Voss',
    relatedCount: 8,
  };

  const recentClips = [
    { id: 1, situation: 'Budget Crisis', book: 'The Psychology of Money', quote: 'Wealth is what you don\'t spend. Its value lies in giving you options.', author: 'Morgan Housel', color: t.primary, muted: t.primaryMuted },
    { id: 2, situation: 'Sleep Training', book: 'The Happiest Baby on the Block', quote: 'All babies need the 5 S\'s: Swaddle, Side/Stomach, Shush, Swing, Suck.', author: 'Harvey Karp', color: t.secondary, muted: t.secondaryMuted },
    { id: 3, situation: 'Job Interview', book: 'Thinking Fast and Slow', quote: 'Nothing in life is as important as you think it is while you\'re thinking about it.', author: 'Daniel Kahneman', color: t.amber, muted: t.amberMuted },
  ];

  const situationFolders = [
    { label: 'First day at work', count: 12, icon: window.lucide.Briefcase, color: t.secondary },
    { label: 'Parenting meltdown', count: 7, icon: window.lucide.Heart, color: t.accent },
    { label: 'Budget crisis', count: 9, icon: window.lucide.TrendingUp, color: t.primary },
    { label: 'Difficult conversation', count: 14, icon: window.lucide.MessageCircle, color: t.amber },
  ];

  return React.createElement('div', { style: { padding: '0 0 16px' } },
    // Header
    React.createElement('div', {
      style: {
        padding: '16px 20px 20px',
        background: t.heroBg,
      }
    },
      React.createElement('div', {
        style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }
      },
        React.createElement('div', null,
          React.createElement('p', { style: { color: t.textSecondary, fontSize: 12, fontWeight: 500, letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: 3 } }, 'Good morning'),
          React.createElement('h1', { style: { color: t.text, fontSize: 22, fontWeight: 800 } }, 'Your Knowledge Hub'),
        ),
        React.createElement('div', {
          style: {
            width: 40, height: 40, borderRadius: 20,
            background: t.gradient1,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }
        },
          React.createElement(window.lucide.BookMarked, { size: 18, color: '#000' })
        )
      ),
      // Stats row
      React.createElement('div', {
        style: { display: 'flex', gap: 10 }
      },
        [
          { label: 'Books', value: '23', icon: window.lucide.BookOpen, color: t.primary },
          { label: 'Clips', value: '184', icon: window.lucide.Scissors, color: t.secondary },
          { label: 'Situations', value: '17', icon: window.lucide.Tag, color: t.amber },
        ].map((stat, i) =>
          React.createElement('div', {
            key: i,
            style: {
              flex: 1,
              backgroundColor: t.card,
              borderRadius: 14,
              padding: '12px 10px',
              border: `1px solid ${t.cardBorder}`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 4,
            }
          },
            React.createElement(stat.icon, { size: 16, color: stat.color }),
            React.createElement('span', { style: { color: t.text, fontSize: 18, fontWeight: 800 } }, stat.value),
            React.createElement('span', { style: { color: t.textSecondary, fontSize: 10, fontWeight: 500 } }, stat.label),
          )
        )
      )
    ),

    // Daily Prompt
    React.createElement('div', { style: { padding: '0 16px', marginTop: 16 } },
      React.createElement('div', {
        style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }
      },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6 } },
          React.createElement(window.lucide.Sparkles, { size: 14, color: t.primary }),
          React.createElement('span', { style: { color: t.text, fontSize: 13, fontWeight: 700 } }, "Today's Prompt"),
        ),
        React.createElement('span', { style: { color: t.primary, fontSize: 12, fontWeight: 600 } }, 'Refresh')
      ),
      React.createElement('div', {
        style: {
          backgroundColor: t.card,
          borderRadius: 18,
          padding: 16,
          border: `1px solid ${t.cardBorder}`,
          position: 'relative',
          overflow: 'hidden',
        }
      },
        React.createElement('div', {
          style: {
            position: 'absolute', top: 0, left: 0, right: 0, height: 3,
            background: t.gradient1,
          }
        }),
        React.createElement('div', {
          style: {
            display: 'inline-flex', alignItems: 'center', gap: 6,
            backgroundColor: t.primaryMuted,
            borderRadius: 8, padding: '4px 10px', marginBottom: 10,
          }
        },
          React.createElement(window.lucide.Calendar, { size: 11, color: t.primary }),
          React.createElement('span', { style: { color: t.primary, fontSize: 11, fontWeight: 600 } }, dailyPrompt.situation),
        ),
        React.createElement('p', {
          style: { color: t.text, fontSize: 14, fontWeight: 500, lineHeight: 1.6, marginBottom: 10, fontStyle: 'italic' }
        }, dailyPrompt.quote),
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' } },
          React.createElement('div', null,
            React.createElement('p', { style: { color: t.textSecondary, fontSize: 11, fontWeight: 500 } }, dailyPrompt.author),
            React.createElement('p', { style: { color: t.textMuted, fontSize: 11 } }, dailyPrompt.book),
          ),
          React.createElement('div', {
            style: {
              backgroundColor: t.primaryMuted, borderRadius: 10, padding: '5px 10px',
              display: 'flex', alignItems: 'center', gap: 4,
            }
          },
            React.createElement(window.lucide.Link2, { size: 11, color: t.primary }),
            React.createElement('span', { style: { color: t.primary, fontSize: 11, fontWeight: 600 } }, `${dailyPrompt.relatedCount} related`)
          )
        )
      )
    ),

    // Situation folders
    React.createElement('div', { style: { padding: '16px 16px 0' } },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 } },
        React.createElement('span', { style: { color: t.text, fontSize: 13, fontWeight: 700 } }, 'Situation Folders'),
        React.createElement('span', { style: { color: t.primary, fontSize: 12, fontWeight: 600 } }, 'See all'),
      ),
      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 } },
        situationFolders.map((folder, i) =>
          React.createElement('div', {
            key: i,
            style: {
              backgroundColor: t.card,
              borderRadius: 16,
              padding: '14px 14px',
              border: `1px solid ${t.cardBorder}`,
              cursor: 'pointer',
              transform: pressedCard === i ? 'scale(0.96)' : 'scale(1)',
              transition: 'transform 0.15s ease',
            },
            onMouseDown: () => setPressedCard(i),
            onMouseUp: () => setPressedCard(null),
          },
            React.createElement('div', {
              style: {
                width: 34, height: 34, borderRadius: 10,
                backgroundColor: folder.color === t.primary ? t.primaryMuted :
                  folder.color === t.secondary ? t.secondaryMuted :
                  folder.color === t.accent ? t.accentMuted : t.amberMuted,
                display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10,
              }
            },
              React.createElement(folder.icon, { size: 16, color: folder.color })
            ),
            React.createElement('p', { style: { color: t.text, fontSize: 12, fontWeight: 600, marginBottom: 4 } }, folder.label),
            React.createElement('p', { style: { color: t.textSecondary, fontSize: 11 } }, `${folder.count} clips`),
          )
        )
      )
    ),

    // Recent Clips
    React.createElement('div', { style: { padding: '16px 16px 0' } },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 } },
        React.createElement('span', { style: { color: t.text, fontSize: 13, fontWeight: 700 } }, 'Recent Clips'),
        React.createElement('span', { style: { color: t.primary, fontSize: 12, fontWeight: 600 } }, 'See all'),
      ),
      React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 10 } },
        recentClips.map((clip) =>
          React.createElement('div', {
            key: clip.id,
            style: {
              backgroundColor: t.card,
              borderRadius: 16,
              padding: '14px 16px',
              border: `1px solid ${t.cardBorder}`,
              display: 'flex', gap: 12, alignItems: 'flex-start',
            }
          },
            React.createElement('div', {
              style: {
                width: 4, borderRadius: 4, flexShrink: 0,
                alignSelf: 'stretch', backgroundColor: clip.color,
              }
            }),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', {
                style: {
                  display: 'inline-flex', alignItems: 'center', gap: 5,
                  backgroundColor: clip.muted, borderRadius: 6, padding: '2px 8px', marginBottom: 6,
                }
              },
                React.createElement('span', { style: { color: clip.color, fontSize: 10, fontWeight: 700 } }, clip.situation),
              ),
              React.createElement('p', { style: { color: t.text, fontSize: 12, lineHeight: 1.55, marginBottom: 6, fontStyle: 'italic' } }, `"${clip.quote}"`),
              React.createElement('p', { style: { color: t.textSecondary, fontSize: 11, fontWeight: 500 } }, `${clip.author} · ${clip.book}`),
            )
          )
        )
      )
    )
  );
}

function SearchScreen({ t }) {
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [focused, setFocused] = useState(false);

  const filters = ['All', 'Emotion', 'Goal', 'Problem', 'Person'];

  const results = [
    {
      id: 1, type: 'Problem', situation: 'Feeling Overwhelmed',
      quote: 'You don\'t have to see the whole staircase, just take the first step.',
      book: 'Strength to Love', author: 'Martin Luther King Jr.',
      tags: ['anxiety', 'motivation'], color: t.secondary, muted: t.secondaryMuted,
      matches: 5,
    },
    {
      id: 2, type: 'Goal', situation: 'Deep Focus',
      quote: 'Clarity about what matters provides clarity about what does not.',
      book: 'Essentialism', author: 'Greg McKeown',
      tags: ['productivity', 'clarity'], color: t.primary, muted: t.primaryMuted,
      matches: 9,
    },
    {
      id: 3, type: 'Emotion', situation: 'Fear of Failure',
      quote: 'Vulnerability is not weakness. It\'s the birthplace of innovation and creativity.',
      book: 'Daring Greatly', author: 'Brené Brown',
      tags: ['courage', 'resilience'], color: t.accent, muted: t.accentMuted,
      matches: 3,
    },
    {
      id: 4, type: 'Problem', situation: 'Difficult Conversation',
      quote: 'The most important thing in communication is hearing what isn\'t said.',
      book: 'The 7 Habits', author: 'Stephen Covey',
      tags: ['communication', 'empathy'], color: t.amber, muted: t.amberMuted,
      matches: 12,
    },
  ];

  const suggestions = ['feeling stuck', 'job interview prep', 'money stress', 'parenting tips', 'building habits'];

  return React.createElement('div', { style: { padding: '12px 0 16px' } },
    // Search header
    React.createElement('div', { style: { padding: '0 16px 16px' } },
      React.createElement('h2', { style: { color: t.text, fontSize: 20, fontWeight: 800, marginBottom: 4 } }, 'Smart Search'),
      React.createElement('p', { style: { color: t.textSecondary, fontSize: 13 } }, 'Find advice by problem, emotion or goal'),
    ),
    // Search input
    React.createElement('div', { style: { padding: '0 16px 14px' } },
      React.createElement('div', {
        style: {
          backgroundColor: t.inputBg,
          borderRadius: 16,
          border: `1.5px solid ${focused ? t.primary : t.inputBorder}`,
          display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px',
          transition: 'border-color 0.2s',
        }
      },
        React.createElement(window.lucide.Search, { size: 18, color: focused ? t.primary : t.textMuted }),
        React.createElement('input', {
          type: 'text',
          placeholder: 'e.g. "feeling burned out"...',
          value: query,
          onChange: e => setQuery(e.target.value),
          onFocus: () => setFocused(true),
          onBlur: () => setFocused(false),
          style: {
            flex: 1, color: t.text, fontSize: 14, fontWeight: 500,
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            backgroundColor: 'transparent',
          }
        }),
        query && React.createElement(window.lucide.X, {
          size: 16, color: t.textMuted,
          onClick: () => setQuery(''),
          style: { cursor: 'pointer' },
        })
      )
    ),
    // Filters
    React.createElement('div', {
      style: {
        display: 'flex', gap: 8, padding: '0 16px 16px',
        overflowX: 'auto',
      }
    },
      filters.map(f =>
        React.createElement('div', {
          key: f,
          onClick: () => setActiveFilter(f),
          style: {
            flexShrink: 0,
            padding: '6px 14px', borderRadius: 20,
            backgroundColor: activeFilter === f ? t.primary : t.card,
            border: `1px solid ${activeFilter === f ? t.primary : t.cardBorder}`,
            cursor: 'pointer',
          }
        },
          React.createElement('span', {
            style: {
              color: activeFilter === f ? '#000' : t.textSecondary,
              fontSize: 12, fontWeight: 600,
            }
          }, f)
        )
      )
    ),
    // Suggestions (if no query)
    !query && React.createElement('div', { style: { padding: '0 16px 16px' } },
      React.createElement('p', { style: { color: t.textMuted, fontSize: 11, fontWeight: 600, marginBottom: 8, letterSpacing: '0.5px', textTransform: 'uppercase' } }, 'Try searching for'),
      React.createElement('div', { style: { display: 'flex', flexWrap: 'wrap', gap: 8 } },
        suggestions.map((s, i) =>
          React.createElement('div', {
            key: i,
            onClick: () => setQuery(s),
            style: {
              padding: '6px 12px', borderRadius: 12,
              backgroundColor: t.card,
              border: `1px solid ${t.cardBorder}`,
              cursor: 'pointer',
            }
          },
            React.createElement('span', { style: { color: t.textSecondary, fontSize: 12 } }, s)
          )
        )
      )
    ),
    // Results
    React.createElement('div', { style: { padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 12 } },
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 } },
        React.createElement(window.lucide.Layers, { size: 13, color: t.textMuted }),
        React.createElement('span', { style: { color: t.textMuted, fontSize: 11, fontWeight: 600 } }, `${results.length} results found`),
      ),
      results.map(result =>
        React.createElement('div', {
          key: result.id,
          style: {
            backgroundColor: t.card, borderRadius: 18, padding: 16,
            border: `1px solid ${t.cardBorder}`,
          }
        },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 } },
            React.createElement('div', {
              style: {
                display: 'inline-flex', alignItems: 'center', gap: 5,
                backgroundColor: result.muted, borderRadius: 8, padding: '4px 10px',
              }
            },
              React.createElement('span', { style: { color: result.color, fontSize: 10, fontWeight: 700 } }, `${result.type}: ${result.situation}`),
            ),
            React.createElement('div', {
              style: {
                backgroundColor: t.surfaceAlt, borderRadius: 8, padding: '4px 8px',
                display: 'flex', alignItems: 'center', gap: 4,
              }
            },
              React.createElement(window.lucide.Link2, { size: 10, color: t.textMuted }),
              React.createElement('span', { style: { color: t.textMuted, fontSize: 10, fontWeight: 600 } }, `${result.matches} clips`),
            )
          ),
          React.createElement('p', {
            style: { color: t.text, fontSize: 13, lineHeight: 1.6, marginBottom: 10, fontStyle: 'italic' }
          }, `"${result.quote}"`),
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
            React.createElement('div', null,
              React.createElement('p', { style: { color: t.textSecondary, fontSize: 11, fontWeight: 600 } }, result.author),
              React.createElement('p', { style: { color: t.textMuted, fontSize: 11 } }, result.book),
            ),
            React.createElement('div', { style: { display: 'flex', gap: 6 } },
              result.tags.map((tag, i) =>
                React.createElement('span', {
                  key: i,
                  style: {
                    backgroundColor: t.tag, color: t.tagText,
                    fontSize: 10, fontWeight: 500, padding: '3px 8px', borderRadius: 6,
                  }
                }, tag)
              )
            )
          )
        )
      )
    )
  );
}

function LibraryScreen({ t }) {
  const [view, setView] = useState('situations');

  const books = [
    { title: 'Never Split the Difference', author: 'Chris Voss', clips: 24, color: t.primary, genre: 'Negotiation', progress: 85 },
    { title: 'The Psychology of Money', author: 'Morgan Housel', clips: 31, color: t.amber, genre: 'Finance', progress: 100 },
    { title: 'Daring Greatly', author: 'Brené Brown', clips: 18, color: t.accent, genre: 'Psychology', progress: 60 },
    { title: 'Essentialism', author: 'Greg McKeown', clips: 14, color: t.secondary, genre: 'Productivity', progress: 100 },
    { title: 'Thinking Fast and Slow', author: 'Daniel Kahneman', clips: 29, color: t.primary, genre: 'Cognitive Science', progress: 45 },
  ];

  const situations = [
    { name: 'Job Interview', clips: 22, books: 5, icon: window.lucide.Briefcase, color: t.secondary },
    { name: 'Budget Crisis', clips: 17, books: 4, icon: window.lucide.TrendingUp, color: t.primary },
    { name: 'Parenting Meltdown', clips: 12, books: 3, icon: window.lucide.Heart, color: t.accent },
    { name: 'Sleep Training', clips: 8, books: 2, icon: window.lucide.Moon, color: t.secondary },
    { name: 'First Day at Work', clips: 19, books: 5, icon: window.lucide.Star, color: t.amber },
    { name: 'Difficult Conversation', clips: 26, books: 6, icon: window.lucide.MessageCircle, color: t.primary },
  ];

  return React.createElement('div', { style: { padding: '12px 0 16px' } },
    React.createElement('div', { style: { padding: '0 16px 16px' } },
      React.createElement('h2', { style: { color: t.text, fontSize: 20, fontWeight: 800, marginBottom: 4 } }, 'Your Library'),
      React.createElement('p', { style: { color: t.textSecondary, fontSize: 13 } }, 'Books & situational folders'),
    ),
    // View toggle
    React.createElement('div', {
      style: {
        display: 'flex', margin: '0 16px 16px',
        backgroundColor: t.surfaceAlt, borderRadius: 14, padding: 4,
      }
    },
      ['situations', 'books'].map(v =>
        React.createElement('div', {
          key: v,
          onClick: () => setView(v),
          style: {
            flex: 1, textAlign: 'center', padding: '8px',
            borderRadius: 10, cursor: 'pointer',
            backgroundColor: view === v ? t.primary : 'transparent',
            transition: 'all 0.2s ease',
          }
        },
          React.createElement('span', {
            style: {
              color: view === v ? '#000' : t.textSecondary,
              fontSize: 12, fontWeight: 700,
              textTransform: 'capitalize',
            }
          }, v)
        )
      )
    ),
    view === 'books' ? React.createElement('div', { style: { padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 10 } },
      books.map((book, i) =>
        React.createElement('div', {
          key: i,
          style: {
            backgroundColor: t.card, borderRadius: 18, padding: 16,
            border: `1px solid ${t.cardBorder}`,
            display: 'flex', gap: 12,
          }
        },
          React.createElement('div', {
            style: {
              width: 48, height: 64, borderRadius: 8,
              background: book.color === t.primary ? t.gradient1 :
                book.color === t.amber ? `linear-gradient(135deg, ${t.amber}, #E8960A)` :
                book.color === t.accent ? `linear-gradient(135deg, ${t.accent}, #C44)` :
                t.gradient2,
              flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
            }
          },
            React.createElement(window.lucide.BookOpen, { size: 20, color: '#fff' })
          ),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('p', { style: { color: t.text, fontSize: 13, fontWeight: 700, marginBottom: 2 } }, book.title),
            React.createElement('p', { style: { color: t.textSecondary, fontSize: 11, marginBottom: 6 } }, book.author),
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 } },
              React.createElement('span', {
                style: {
                  backgroundColor: t.surfaceAlt, color: t.textSecondary,
                  fontSize: 10, fontWeight: 600, padding: '2px 8px', borderRadius: 6,
                }
              }, book.genre),
              React.createElement('span', { style: { color: t.textMuted, fontSize: 11 } }, `${book.clips} clips`),
            ),
            React.createElement('div', {
              style: {
                height: 4, backgroundColor: t.surfaceAlt, borderRadius: 4, overflow: 'hidden',
              }
            },
              React.createElement('div', {
                style: {
                  height: '100%', width: `${book.progress}%`,
                  backgroundColor: book.color, borderRadius: 4,
                }
              })
            ),
          )
        )
      )
    ) :
    React.createElement('div', { style: { padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 10 } },
      situations.map((sit, i) =>
        React.createElement('div', {
          key: i,
          style: {
            backgroundColor: t.card, borderRadius: 18, padding: 16,
            border: `1px solid ${t.cardBorder}`,
            display: 'flex', alignItems: 'center', gap: 14,
          }
        },
          React.createElement('div', {
            style: {
              width: 44, height: 44, borderRadius: 12,
              backgroundColor: sit.color === t.primary ? t.primaryMuted :
                sit.color === t.secondary ? t.secondaryMuted :
                sit.color === t.accent ? t.accentMuted : t.amberMuted,
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }
          },
            React.createElement(sit.icon, { size: 20, color: sit.color })
          ),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('p', { style: { color: t.text, fontSize: 13, fontWeight: 700, marginBottom: 3 } }, sit.name),
            React.createElement('p', { style: { color: t.textSecondary, fontSize: 11 } }, `${sit.clips} clips · ${sit.books} books`),
          ),
          React.createElement(window.lucide.ChevronRight, { size: 16, color: t.textMuted })
        )
      )
    )
  );
}

function MapScreen({ t }) {
  const [selectedTopic, setSelectedTopic] = useState('resilience');

  const topics = [
    { id: 'resilience', label: 'Resilience', color: t.primary },
    { id: 'money', label: 'Money Mindset', color: t.amber },
    { id: 'communication', label: 'Communication', color: t.secondary },
  ];

  const connections = {
    resilience: [
      {
        theme: 'Failure as teacher',
        books: [
          { title: 'Daring Greatly', author: 'Brené Brown', quote: 'Vulnerability is the birthplace of innovation.' },
          { title: 'Mindset', author: 'Carol Dweck', quote: 'In a growth mindset, challenges are exciting.' },
          { title: 'Man\'s Search for Meaning', author: 'Viktor Frankl', quote: 'Between stimulus and response there is a space.' },
        ],
        color: t.primary,
      },
      {
        theme: 'Consistency over intensity',
        books: [
          { title: 'Atomic Habits', author: 'James Clear', quote: 'Small habits make a big difference over time.' },
          { title: 'The Dip', author: 'Seth Godin', quote: 'Successful people quit the wrong stuff fast.' },
        ],
        color: t.secondary,
      },
    ],
    money: [
      {
        theme: 'Delayed gratification',
        books: [
          { title: 'The Psychology of Money', author: 'Morgan Housel', quote: 'Wealth is what you don\'t spend.' },
          { title: 'Rich Dad Poor Dad', author: 'Robert Kiyosaki', quote: 'Don\'t work for money, let money work for you.' },
        ],
        color: t.amber,
      },
    ],
    communication: [
      {
        theme: 'Listening first',
        books: [
          { title: 'Never Split the Difference', author: 'Chris Voss', quote: 'The most dangerous negotiation is the one you don\'t know you\'re in.' },
          { title: 'How to Win Friends', author: 'Dale Carnegie', quote: 'You can make more friends in two months by being interested in others.' },
          { title: 'The 7 Habits', author: 'Stephen Covey', quote: 'Seek first to understand, then to be understood.' },
        ],
        color: t.secondary,
      },
    ],
  };

  const active = connections[selectedTopic] || [];

  return React.createElement('div', { style: { padding: '12px 0 16px' } },
    React.createElement('div', { style: { padding: '0 16px 16px' } },
      React.createElement('h2', { style: { color: t.text, fontSize: 20, fontWeight: 800, marginBottom: 4 } }, 'Cross-Book Map'),
      React.createElement('p', { style: { color: t.textSecondary, fontSize: 13 } }, 'Discover patterns across your books'),
    ),
    // Topic tabs
    React.createElement('div', {
      style: { display: 'flex', gap: 8, padding: '0 16px 16px', overflowX: 'auto' }
    },
      topics.map(topic =>
        React.createElement('div', {
          key: topic.id,
          onClick: () => setSelectedTopic(topic.id),
          style: {
            flexShrink: 0, padding: '8px 16px', borderRadius: 20, cursor: 'pointer',
            backgroundColor: selectedTopic === topic.id ? topic.color : t.card,
            border: `1.5px solid ${selectedTopic === topic.id ? topic.color : t.cardBorder}`,
            transition: 'all 0.2s ease',
          }
        },
          React.createElement('span', {
            style: {
              color: selectedTopic === topic.id ? '#000' : t.textSecondary,
              fontSize: 12, fontWeight: 700,
            }
          }, topic.label)
        )
      )
    ),
    // Insight cluster visual
    React.createElement('div', {
      style: {
        margin: '0 16px 16px',
        backgroundColor: t.card, borderRadius: 20, padding: 16,
        border: `1px solid ${t.cardBorder}`,
      }
    },
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 } },
        React.createElement(window.lucide.GitBranch, { size: 16, color: t.primary }),
        React.createElement('span', { style: { color: t.text, fontSize: 13, fontWeight: 700 } }, 'Theme Clusters'),
        React.createElement('span', {
          style: {
            marginLeft: 'auto', backgroundColor: t.primaryMuted, color: t.primary,
            fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 6,
          }
        }, `${active.reduce((a, c) => a + c.books.length, 0)} books linked`)
      ),
      active.map((cluster, ci) =>
        React.createElement('div', {
          key: ci, style: { marginBottom: ci < active.length - 1 ? 14 : 0 }
        },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 } },
            React.createElement('div', { style: { width: 3, height: 14, backgroundColor: cluster.color, borderRadius: 4 } }),
            React.createElement('span', { style: { color: t.text, fontSize: 12, fontWeight: 700 } }, cluster.theme),
          ),
          React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 8, paddingLeft: 9 } },
            cluster.books.map((book, bi) =>
              React.createElement('div', {
                key: bi,
                style: {
                  backgroundColor: t.surfaceAlt, borderRadius: 12, padding: '10px 12px',
                  borderLeft: `3px solid ${cluster.color}`,
                }
              },
                React.createElement('p', { style: { color: t.text, fontSize: 11, fontWeight: 600, marginBottom: 3 } }, `${book.title} · ${book.author}`),
                React.createElement('p', { style: { color: t.textSecondary, fontSize: 11, fontStyle: 'italic', lineHeight: 1.5 } }, `"${book.quote}"`),
              )
            )
          )
        )
      )
    ),
    // Insight summary card
    React.createElement('div', { style: { padding: '0 16px' } },
      React.createElement('div', {
        style: {
          background: t.gradient1,
          borderRadius: 18, padding: 16,
          display: 'flex', alignItems: 'center', gap: 12,
        }
      },
        React.createElement('div', {
          style: {
            width: 40, height: 40, borderRadius: 12,
            backgroundColor: 'rgba(0,0,0,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }
        },
          React.createElement(window.lucide.Lightbulb, { size: 20, color: '#fff' })
        ),
        React.createElement('div', null,
          React.createElement('p', { style: { color: '#000', fontSize: 13, fontWeight: 800, marginBottom: 2 } }, 'Pattern found'),
          React.createElement('p', { style: { color: 'rgba(0,0,0,0.7)', fontSize: 12, lineHeight: 1.5 } },
            `${active.reduce((a, c) => a + c.books.length, 0)} books share themes about ${topics.find(t2 => t2.id === selectedTopic)?.label.toLowerCase()}`
          )
        )
      )
    )
  );
}

function SettingsScreen({ t, isDark, setIsDark }) {
  const [offlineMode, setOfflineMode] = useState(true);
  const [dailyPrompts, setDailyPrompts] = useState(true);
  const [calendarSync, setCalendarSync] = useState(false);
  const [pressed, setPressed] = useState(null);

  const Toggle = ({ value, onChange }) => React.createElement('div', {
    onClick: () => onChange(!value),
    style: {
      width: 44, height: 26, borderRadius: 13, cursor: 'pointer',
      backgroundColor: value ? t.primary : t.surfaceAlt,
      position: 'relative', transition: 'background-color 0.2s',
      border: `1px solid ${value ? t.primary : t.border}`,
    }
  },
    React.createElement('div', {
      style: {
        position: 'absolute', top: 3, width: 18, height: 18, borderRadius: 9,
        backgroundColor: value ? '#000' : t.textMuted,
        left: value ? 23 : 3,
        transition: 'left 0.2s, background-color 0.2s',
      }
    })
  );

  const settingRows = [
    { label: 'Offline Reference Mode', sub: 'Store key excerpts locally', value: offlineMode, onChange: setOfflineMode, icon: window.lucide.WifiOff },
    { label: 'Daily Prompts', sub: 'Resurface notes each morning', value: dailyPrompts, onChange: setDailyPrompts, icon: window.lucide.Bell },
    { label: 'Calendar Sync', sub: 'Get prompts before events', value: calendarSync, onChange: setCalendarSync, icon: window.lucide.Calendar },
  ];

  const menuItems = [
    { label: 'Manage Books', icon: window.lucide.BookOpen, color: t.primary },
    { label: 'Export Clips', icon: window.lucide.Download, color: t.secondary },
    { label: 'Import Highlights', icon: window.lucide.Upload, color: t.amber },
    { label: 'Sync & Backup', icon: window.lucide.Cloud, color: t.primary },
    { label: 'About MarginMap', icon: window.lucide.Info, color: t.textMuted },
  ];

  return React.createElement('div', { style: { padding: '12px 0 16px' } },
    // Header
    React.createElement('div', { style: { padding: '0 16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
      React.createElement('div', null,
        React.createElement('h2', { style: { color: t.text, fontSize: 20, fontWeight: 800 } }, 'Settings'),
        React.createElement('p', { style: { color: t.textSecondary, fontSize: 13 } }, 'Preferences & account'),
      ),
    ),
    // Profile card
    React.createElement('div', { style: { padding: '0 16px 16px' } },
      React.createElement('div', {
        style: {
          background: t.gradient1,
          borderRadius: 20, padding: '16px 18px',
          display: 'flex', alignItems: 'center', gap: 14,
        }
      },
        React.createElement('div', {
          style: {
            width: 50, height: 50, borderRadius: 25,
            backgroundColor: 'rgba(0,0,0,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: '2px solid rgba(255,255,255,0.3)',
          }
        },
          React.createElement(window.lucide.User, { size: 24, color: '#fff' })
        ),
        React.createElement('div', null,
          React.createElement('p', { style: { color: '#000', fontSize: 15, fontWeight: 800 } }, 'Alex Morgan'),
          React.createElement('p', { style: { color: 'rgba(0,0,0,0.65)', fontSize: 12 } }, 'alex@example.com'),
          React.createElement('div', {
            style: {
              display: 'inline-flex', alignItems: 'center', gap: 4, marginTop: 4,
              backgroundColor: 'rgba(0,0,0,0.15)', borderRadius: 6, padding: '2px 8px',
            }
          },
            React.createElement(window.lucide.Crown, { size: 10, color: '#000' }),
            React.createElement('span', { style: { color: '#000', fontSize: 10, fontWeight: 700 } }, 'Pro Member'),
          )
        )
      )
    ),
    // Theme toggle
    React.createElement('div', { style: { padding: '0 16px 16px' } },
      React.createElement('div', {
        style: {
          backgroundColor: t.card, borderRadius: 18, padding: '14px 16px',
          border: `1px solid ${t.cardBorder}`,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }
      },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12 } },
          React.createElement('div', {
            style: {
              width: 36, height: 36, borderRadius: 10,
              backgroundColor: isDark ? t.secondaryMuted : t.amberMuted,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }
          },
            React.createElement(isDark ? window.lucide.Moon : window.lucide.Sun, { size: 18, color: isDark ? t.secondary : t.amber })
          ),
          React.createElement('div', null,
            React.createElement('p', { style: { color: t.text, fontSize: 13, fontWeight: 700 } }, 'Appearance'),
            React.createElement('p', { style: { color: t.textSecondary, fontSize: 11 } }, isDark ? 'Dark mode' : 'Light mode'),
          )
        ),
        React.createElement('div', {
          onClick: () => setIsDark(!isDark),
          style: {
            display: 'flex', alignItems: 'center', gap: 6,
            backgroundColor: isDark ? t.primaryMuted : t.amberMuted,
            borderRadius: 12, padding: '8px 14px', cursor: 'pointer',
          }
        },
          React.createElement(isDark ? window.lucide.Sun : window.lucide.Moon, { size: 14, color: isDark ? t.primary : t.amber }),
          React.createElement('span', { style: { color: isDark ? t.primary : t.amber, fontSize: 12, fontWeight: 700 } }, isDark ? 'Light' : 'Dark'),
        )
      )
    ),
    // Toggles
    React.createElement('div', { style: { padding: '0 16px 16px' } },
      React.createElement('p', { style: { color: t.textMuted, fontSize: 11, fontWeight: 700, marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.5px' } }, 'Features'),
      React.createElement('div', {
        style: { backgroundColor: t.card, borderRadius: 18, border: `1px solid ${t.cardBorder}`, overflow: 'hidden' }
      },
        settingRows.map((row, i) =>
          React.createElement('div', {
            key: i,
            style: {
              display: 'flex', alignItems: 'center', padding: '14px 16px', gap: 12,
              borderBottom: i < settingRows.length - 1 ? `1px solid ${t.border}` : 'none',
            }
          },
            React.createElement('div', {
              style: {
                width: 34, height: 34, borderRadius: 10,
                backgroundColor: t.primaryMuted,
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }
            },
              React.createElement(row.icon, { size: 16, color: t.primary })
            ),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('p', { style: { color: t.text, fontSize: 13, fontWeight: 600 } }, row.label),
              React.createElement('p', { style: { color: t.textSecondary, fontSize: 11 } }, row.sub),
            ),
            React.createElement(Toggle, { value: row.value, onChange: row.onChange })
          )
        )
      )
    ),
    // Menu items
    React.createElement('div', { style: { padding: '0 16px' } },
      React.createElement('p', { style: { color: t.textMuted, fontSize: 11, fontWeight: 700, marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.5px' } }, 'Account'),
      React.createElement('div', {
        style: { backgroundColor: t.card, borderRadius: 18, border: `1px solid ${t.cardBorder}`, overflow: 'hidden' }
      },
        menuItems.map((item, i) =>
          React.createElement('div', {
            key: i,
            style: {
              display: 'flex', alignItems: 'center', padding: '13px 16px', gap: 12, cursor: 'pointer',
              borderBottom: i < menuItems.length - 1 ? `1px solid ${t.border}` : 'none',
              backgroundColor: pressed === i ? t.surfaceAlt : 'transparent',
              transition: 'background-color 0.15s',
            },
            onMouseDown: () => setPressed(i),
            onMouseUp: () => setPressed(null),
          },
            React.createElement(item.icon, { size: 18, color: item.color }),
            React.createElement('span', { style: { flex: 1, color: t.text, fontSize: 13, fontWeight: 600 } }, item.label),
            React.createElement(window.lucide.ChevronRight, { size: 15, color: t.textMuted })
          )
        )
      )
    )
  );
}
