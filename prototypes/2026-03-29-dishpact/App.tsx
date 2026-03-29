const { useState, useEffect, useRef } = React;

const themes = {
  light: {
    bg: '#F5E6C8',
    surface: '#FDF3E0',
    card: '#FFFFFF',
    primary: '#C0392B',
    primaryDark: '#922B21',
    secondary: '#3D2314',
    accent: '#E67E22',
    accentLight: '#F39C12',
    text: '#2C1810',
    textMuted: '#7D5A50',
    textLight: '#A0785A',
    border: '#3D2314',
    navBg: '#2C1810',
    navText: '#F5E6C8',
    navActive: '#C0392B',
    tagBg: '#C0392B',
    tagText: '#FDF3E0',
    streakBg: '#E67E22',
    cardAlt: '#F0D9B5',
  },
  dark: {
    bg: '#1A0F0A',
    surface: '#2C1810',
    card: '#3D2314',
    primary: '#E74C3C',
    primaryDark: '#C0392B',
    secondary: '#F5E6C8',
    accent: '#F39C12',
    accentLight: '#E67E22',
    text: '#FDF3E0',
    textMuted: '#C4956A',
    textLight: '#A0785A',
    border: '#7D5A50',
    navBg: '#0F0905',
    navText: '#C4956A',
    navActive: '#E74C3C',
    tagBg: '#E74C3C',
    tagText: '#FDF3E0',
    streakBg: '#E67E22',
    cardAlt: '#4A2C1A',
  }
};

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isDark, setIsDark] = useState(false);
  const t = isDark ? themes.dark : themes.light;

  const fontStyle = `
    @import url('https://fonts.googleapis.com/css2?family=Archivo+Black&family=Archivo:wght@400;600;700&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    ::-webkit-scrollbar { display: none; }
  `;

  const tabs = [
    { id: 'home', label: 'Home', icon: window.lucide.Home },
    { id: 'circles', label: 'Circles', icon: window.lucide.Users },
    { id: 'challenges', label: 'Cook', icon: window.lucide.Flame },
    { id: 'basket', label: 'Basket', icon: window.lucide.ShoppingBasket },
    { id: 'profile', label: 'Me', icon: window.lucide.User },
  ];

  const screens = {
    home: HomeScreen,
    circles: CirclesScreen,
    challenges: ChallengesScreen,
    basket: BasketScreen,
    profile: ProfileScreen,
  };

  const ActiveScreen = screens[activeTab];

  return React.createElement('div', {
    style: { minHeight: '100vh', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Archivo', sans-serif" }
  },
    React.createElement('style', null, fontStyle),
    React.createElement('div', {
      style: {
        width: 375,
        height: 812,
        background: t.bg,
        borderRadius: 44,
        overflow: 'hidden',
        position: 'relative',
        boxShadow: '0 40px 80px rgba(0,0,0,0.35)',
        display: 'flex',
        flexDirection: 'column',
        border: `3px solid ${t.border}`,
      }
    },
      // Dynamic Island
      React.createElement('div', {
        style: {
          position: 'absolute',
          top: 12,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 120,
          height: 34,
          background: '#0a0a0a',
          borderRadius: 20,
          zIndex: 100,
        }
      }),
      // Status Bar
      React.createElement('div', {
        style: {
          height: 54,
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          paddingBottom: 6,
          paddingLeft: 20,
          paddingRight: 20,
          background: t.bg,
          flexShrink: 0,
        }
      },
        React.createElement('span', { style: { fontSize: 13, fontWeight: 700, color: t.text, fontFamily: "'Archivo Black', sans-serif" } }, '9:41'),
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 5 } },
          React.createElement(window.lucide.Wifi, { size: 15, color: t.text }),
          React.createElement(window.lucide.Signal, { size: 15, color: t.text }),
          React.createElement(window.lucide.Battery, { size: 18, color: t.text }),
        )
      ),
      // Screen content
      React.createElement('div', {
        style: { flex: 1, overflowY: 'auto', overflowX: 'hidden' }
      },
        React.createElement(ActiveScreen, { t, isDark, setIsDark })
      ),
      // Bottom Nav
      React.createElement('div', {
        style: {
          height: 76,
          background: t.navBg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          paddingBottom: 12,
          paddingTop: 8,
          flexShrink: 0,
          borderTop: `3px solid ${t.primary}`,
        }
      },
        tabs.map(tab => React.createElement('div', {
          key: tab.id,
          onClick: () => setActiveTab(tab.id),
          style: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 3,
            cursor: 'pointer',
            opacity: activeTab === tab.id ? 1 : 0.55,
            transition: 'opacity 0.15s',
            minWidth: 52,
          }
        },
          React.createElement(tab.icon, {
            size: 22,
            color: activeTab === tab.id ? t.navActive : t.navText,
            strokeWidth: activeTab === tab.id ? 2.5 : 1.8,
          }),
          React.createElement('span', {
            style: {
              fontSize: 10,
              fontWeight: 700,
              color: activeTab === tab.id ? t.navActive : t.navText,
              fontFamily: "'Archivo Black', sans-serif",
              letterSpacing: 0.3,
              textTransform: 'uppercase',
            }
          }, tab.label)
        ))
      )
    )
  );
}

// ─── HOME SCREEN ────────────────────────────────────────────────────────────
function HomeScreen({ t }) {
  const [pressed, setPressed] = useState(null);

  const challenges = [
    { id: 1, title: 'Saffron Risotto Night', circle: 'East Side Flavors', due: 'Today', streak: 7, icon: '🌾' },
    { id: 2, title: 'Heirloom Tomato Salad', circle: 'Mission District Cooks', due: 'Tomorrow', streak: 12, icon: '🍅' },
  ];

  const activity = [
    { user: 'Maria R.', action: 'completed', dish: 'Mole Negro', time: '2h ago', avatar: 'MR' },
    { user: 'Kenji T.', action: 'shared story', dish: 'Tonkotsu Ramen', time: '4h ago', avatar: 'KT' },
    { user: 'Sofia P.', action: 'earned badge', dish: 'Olive Oil Cake', time: '5h ago', avatar: 'SP' },
  ];

  return React.createElement('div', { style: { paddingBottom: 16 } },
    // Header
    React.createElement('div', {
      style: {
        background: t.primary,
        padding: '16px 20px 20px',
        position: 'relative',
        overflow: 'hidden',
      }
    },
      React.createElement('div', {
        style: {
          position: 'absolute',
          top: -20,
          right: -20,
          width: 120,
          height: 120,
          background: t.primaryDark,
          transform: 'rotate(30deg)',
          opacity: 0.4,
        }
      }),
      React.createElement('div', {
        style: {
          position: 'absolute',
          bottom: -30,
          left: 40,
          width: 80,
          height: 80,
          background: t.accent,
          transform: 'rotate(15deg)',
          opacity: 0.3,
        }
      }),
      React.createElement('p', {
        style: {
          fontSize: 12,
          fontWeight: 700,
          color: 'rgba(255,255,255,0.7)',
          textTransform: 'uppercase',
          letterSpacing: 2,
          marginBottom: 4,
        }
      }, 'Sunday · March 29'),
      React.createElement('h1', {
        style: {
          fontFamily: "'Archivo Black', sans-serif",
          fontSize: 28,
          color: '#FFFFFF',
          lineHeight: 1.1,
          marginBottom: 12,
        }
      }, "Today's\nFeast Awaits"),
      // Streak Bar
      React.createElement('div', {
        style: {
          display: 'flex',
          gap: 8,
          alignItems: 'center',
          background: 'rgba(0,0,0,0.25)',
          borderRadius: 8,
          padding: '8px 12px',
          width: 'fit-content',
        }
      },
        React.createElement(window.lucide.Flame, { size: 18, color: '#F39C12' }),
        React.createElement('span', {
          style: { fontFamily: "'Archivo Black', sans-serif", fontSize: 20, color: '#F39C12' }
        }, '12'),
        React.createElement('span', {
          style: { fontSize: 12, color: 'rgba(255,255,255,0.8)', fontWeight: 600 }
        }, 'day streak · Keep it burning!')
      )
    ),

    // Active Challenges — stacked angular cards
    React.createElement('div', { style: { padding: '20px 20px 0' } },
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 } },
        React.createElement('h2', {
          style: { fontFamily: "'Archivo Black', sans-serif", fontSize: 16, color: t.text, textTransform: 'uppercase', letterSpacing: 1 }
        }, 'Active Challenges'),
        React.createElement('span', { style: { fontSize: 12, color: t.primary, fontWeight: 700 } }, 'See all →')
      ),

      // Stacked angular card container
      React.createElement('div', { style: { position: 'relative', height: 160 } },
        // Back card
        React.createElement('div', {
          style: {
            position: 'absolute',
            top: 8,
            left: 8,
            right: -4,
            bottom: -6,
            background: t.accent,
            borderRadius: 4,
            transform: 'rotate(2deg)',
            border: `2px solid ${t.border}`,
          }
        }),
        // Front card
        React.createElement('div', {
          style: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 4,
            bottom: 0,
            background: t.card,
            borderRadius: 4,
            border: `2px solid ${t.border}`,
            padding: 14,
            display: 'flex',
            gap: 12,
            alignItems: 'flex-start',
          }
        },
          React.createElement('div', {
            style: {
              width: 52,
              height: 52,
              background: t.primary,
              borderRadius: 4,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 24,
              flexShrink: 0,
              border: `2px solid ${t.border}`,
            }
          }, '🌾'),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' } },
              React.createElement('h3', {
                style: { fontFamily: "'Archivo Black', sans-serif", fontSize: 15, color: t.text, lineHeight: 1.2 }
              }, 'Saffron Risotto Night'),
              React.createElement('span', {
                style: {
                  background: t.primary,
                  color: '#fff',
                  fontSize: 10,
                  fontWeight: 700,
                  padding: '2px 6px',
                  borderRadius: 2,
                  textTransform: 'uppercase',
                }
              }, 'Today')
            ),
            React.createElement('p', { style: { fontSize: 12, color: t.textMuted, marginTop: 4 } }, 'East Side Flavors Circle'),
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12, marginTop: 10 } },
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
                React.createElement(window.lucide.Flame, { size: 13, color: t.accent }),
                React.createElement('span', { style: { fontSize: 12, fontWeight: 700, color: t.accent } }, '7 streak')
              ),
              React.createElement('div', {
                style: {
                  flex: 1,
                  height: 6,
                  background: t.cardAlt,
                  borderRadius: 3,
                  overflow: 'hidden',
                  border: `1px solid ${t.border}`,
                }
              },
                React.createElement('div', { style: { width: '65%', height: '100%', background: t.primary } })
              ),
              React.createElement('span', { style: { fontSize: 11, color: t.textMuted, fontWeight: 600 } }, '65%')
            )
          )
        )
      )
    ),

    // Circle Activity Feed
    React.createElement('div', { style: { padding: '20px 20px 0' } },
      React.createElement('h2', {
        style: {
          fontFamily: "'Archivo Black', sans-serif",
          fontSize: 16,
          color: t.text,
          textTransform: 'uppercase',
          letterSpacing: 1,
          marginBottom: 14,
          borderLeft: `4px solid ${t.primary}`,
          paddingLeft: 10,
        }
      }, 'Circle Buzz'),
      activity.map((item, i) => React.createElement('div', {
        key: i,
        style: {
          display: 'flex',
          gap: 12,
          alignItems: 'flex-start',
          marginBottom: 14,
          padding: '10px 12px',
          background: t.surface,
          borderRadius: 4,
          borderLeft: `3px solid ${i === 0 ? t.primary : t.accent}`,
        }
      },
        React.createElement('div', {
          style: {
            width: 36,
            height: 36,
            background: i === 0 ? t.primary : t.accent,
            borderRadius: 4,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 11,
            fontWeight: 700,
            color: '#fff',
            flexShrink: 0,
            fontFamily: "'Archivo Black', sans-serif",
          }
        }, item.avatar),
        React.createElement('div', { style: { flex: 1 } },
          React.createElement('p', { style: { fontSize: 13, color: t.text } },
            React.createElement('strong', null, item.user), ` ${item.action} `,
            React.createElement('strong', { style: { color: t.primary } }, item.dish)
          ),
          React.createElement('span', { style: { fontSize: 11, color: t.textLight, marginTop: 2, display: 'block' } }, item.time)
        )
      ))
    ),

    // Local Maker Spotlight
    React.createElement('div', { style: { padding: '0 20px 20px' } },
      React.createElement('div', {
        style: {
          background: t.secondary,
          borderRadius: 4,
          padding: 16,
          border: `2px solid ${t.border}`,
          position: 'relative',
          overflow: 'hidden',
        }
      },
        React.createElement('div', {
          style: {
            position: 'absolute',
            top: -15,
            right: -15,
            width: 60,
            height: 60,
            background: t.accent,
            transform: 'rotate(30deg)',
            opacity: 0.3,
          }
        }),
        React.createElement('p', {
          style: {
            fontSize: 10,
            fontWeight: 700,
            color: t.accent,
            textTransform: 'uppercase',
            letterSpacing: 2,
            marginBottom: 6,
          }
        }, '★ Maker Spotlight'),
        React.createElement('h3', {
          style: { fontFamily: "'Archivo Black', sans-serif", fontSize: 16, color: '#FDF3E0', marginBottom: 4 }
        }, "Rivera's Saffron Farm"),
        React.createElement('p', { style: { fontSize: 12, color: 'rgba(253,243,224,0.7)', lineHeight: 1.5 } },
          'Family-grown Spanish saffron, 3rd generation. Featured in this week\'s risotto challenge.'
        ),
        React.createElement('div', {
          style: {
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            marginTop: 10,
            background: t.primary,
            width: 'fit-content',
            padding: '5px 12px',
            borderRadius: 2,
            cursor: 'pointer',
          }
        },
          React.createElement(window.lucide.MapPin, { size: 13, color: '#fff' }),
          React.createElement('span', { style: { fontSize: 12, fontWeight: 700, color: '#fff' } }, 'Visit Farm')
        )
      )
    )
  );
}

// ─── CIRCLES SCREEN ─────────────────────────────────────────────────────────
function CirclesScreen({ t }) {
  const [activeCircleTab, setActiveCircleTab] = useState('mine');

  const myCircles = [
    { name: 'East Side Flavors', members: 8, streak: 7, cuisine: 'Mediterranean', emoji: '🫒', color: '#C0392B', active: true },
    { name: 'Mission District Cooks', members: 12, streak: 12, cuisine: 'Mexican Fusion', emoji: '🌮', color: '#E67E22', active: true },
    { name: 'Chinatown Heritage', members: 6, streak: 3, cuisine: 'Cantonese', emoji: '🥟', color: '#922B21', active: false },
  ];

  const discover = [
    { name: 'Bayview Bakehouse', members: 5, cuisine: 'Sourdough & Pastry', emoji: '🍞', distance: '1.2mi' },
    { name: 'SOMA Spice Route', members: 9, cuisine: 'South Asian', emoji: '🌶️', distance: '0.8mi' },
    { name: 'Nopa Farm Table', members: 7, cuisine: 'Farm to Fork', emoji: '🥬', distance: '2.1mi' },
  ];

  return React.createElement('div', { style: { paddingBottom: 16 } },
    // Header
    React.createElement('div', {
      style: { padding: '16px 20px 12px', background: t.secondary, borderBottom: `3px solid ${t.primary}` }
    },
      React.createElement('h1', {
        style: { fontFamily: "'Archivo Black', sans-serif", fontSize: 26, color: '#FDF3E0', letterSpacing: -0.5 }
      }, 'Flavor Circles'),
      React.createElement('p', { style: { fontSize: 13, color: 'rgba(253,243,224,0.65)', marginTop: 4 } },
        'Your cooking communities'
      )
    ),

    // Tab switcher
    React.createElement('div', {
      style: { display: 'flex', background: t.surface, borderBottom: `2px solid ${t.border}` }
    },
      ['mine', 'discover'].map(tab => React.createElement('div', {
        key: tab,
        onClick: () => setActiveCircleTab(tab),
        style: {
          flex: 1,
          textAlign: 'center',
          padding: '12px 0',
          fontFamily: "'Archivo Black', sans-serif",
          fontSize: 13,
          textTransform: 'uppercase',
          letterSpacing: 1,
          color: activeCircleTab === tab ? t.primary : t.textMuted,
          borderBottom: activeCircleTab === tab ? `3px solid ${t.primary}` : '3px solid transparent',
          cursor: 'pointer',
        }
      }, tab === 'mine' ? 'My Circles' : 'Discover'))
    ),

    React.createElement('div', { style: { padding: '16px 20px' } },
      activeCircleTab === 'mine'
        ? React.createElement('div', null,
            myCircles.map((circle, i) => React.createElement('div', {
              key: i,
              style: {
                position: 'relative',
                marginBottom: 20,
              }
            },
              // Shadow card (angular stack effect)
              React.createElement('div', {
                style: {
                  position: 'absolute',
                  top: 5,
                  left: 5,
                  right: -3,
                  bottom: -3,
                  background: circle.color,
                  borderRadius: 4,
                  transform: 'rotate(1.5deg)',
                }
              }),
              // Main card
              React.createElement('div', {
                style: {
                  position: 'relative',
                  background: t.card,
                  borderRadius: 4,
                  padding: 14,
                  border: `2px solid ${t.border}`,
                }
              },
                React.createElement('div', { style: { display: 'flex', alignItems: 'flex-start', gap: 12 } },
                  React.createElement('div', {
                    style: {
                      width: 48,
                      height: 48,
                      background: circle.color,
                      borderRadius: 4,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 22,
                      flexShrink: 0,
                    }
                  }, circle.emoji),
                  React.createElement('div', { style: { flex: 1 } },
                    React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between' } },
                      React.createElement('h3', {
                        style: { fontFamily: "'Archivo Black', sans-serif", fontSize: 15, color: t.text }
                      }, circle.name),
                      circle.active && React.createElement('span', {
                        style: {
                          background: '#27AE60',
                          color: '#fff',
                          fontSize: 9,
                          fontWeight: 700,
                          padding: '2px 6px',
                          borderRadius: 2,
                          textTransform: 'uppercase',
                        }
                      }, 'Active')
                    ),
                    React.createElement('p', { style: { fontSize: 12, color: t.textMuted, marginTop: 2 } }, circle.cuisine),
                    React.createElement('div', { style: { display: 'flex', gap: 14, marginTop: 8 } },
                      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
                        React.createElement(window.lucide.Users, { size: 12, color: t.textMuted }),
                        React.createElement('span', { style: { fontSize: 11, color: t.textMuted, fontWeight: 600 } }, `${circle.members} members`)
                      ),
                      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
                        React.createElement(window.lucide.Flame, { size: 12, color: t.accent }),
                        React.createElement('span', { style: { fontSize: 11, color: t.accent, fontWeight: 700 } }, `${circle.streak} day streak`)
                      )
                    )
                  )
                )
              )
            )),
            // Add Circle CTA
            React.createElement('div', {
              style: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                padding: '14px 0',
                border: `2px dashed ${t.primary}`,
                borderRadius: 4,
                cursor: 'pointer',
                color: t.primary,
              }
            },
              React.createElement(window.lucide.PlusCircle, { size: 18, color: t.primary }),
              React.createElement('span', {
                style: { fontFamily: "'Archivo Black', sans-serif", fontSize: 14, textTransform: 'uppercase', letterSpacing: 1 }
              }, 'Start a New Circle')
            )
          )
        : React.createElement('div', null,
            React.createElement('p', {
              style: { fontSize: 13, color: t.textMuted, marginBottom: 14, lineHeight: 1.5 }
            }, 'Circles near you or matching your cuisine interests:'),
            discover.map((c, i) => React.createElement('div', {
              key: i,
              style: {
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '12px 14px',
                background: t.surface,
                borderRadius: 4,
                border: `2px solid ${t.border}`,
                marginBottom: 10,
              }
            },
              React.createElement('div', {
                style: {
                  width: 44,
                  height: 44,
                  background: t.accent,
                  borderRadius: 4,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 20,
                }
              }, c.emoji),
              React.createElement('div', { style: { flex: 1 } },
                React.createElement('h3', {
                  style: { fontFamily: "'Archivo Black', sans-serif", fontSize: 14, color: t.text }
                }, c.name),
                React.createElement('p', { style: { fontSize: 11, color: t.textMuted } }, `${c.cuisine} · ${c.members} members · ${c.distance}`)
              ),
              React.createElement('div', {
                style: {
                  background: t.primary,
                  color: '#fff',
                  fontSize: 11,
                  fontWeight: 700,
                  padding: '5px 10px',
                  borderRadius: 2,
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                }
              }, 'Join')
            ))
          )
    )
  );
}

// ─── CHALLENGES SCREEN ───────────────────────────────────────────────────────
function ChallengesScreen({ t }) {
  const [completed, setCompleted] = useState({});

  const tasks = [
    { id: 1, title: 'Cook with saffron', desc: 'Use saffron as the star ingredient in any dish', xp: 150, difficulty: 'Medium', tag: 'Featured' },
    { id: 2, title: 'Source locally', desc: 'Buy 3+ ingredients from independent producers this week', xp: 100, difficulty: 'Easy', tag: 'Weekly' },
    { id: 3, title: 'Recipe story', desc: 'Share a 30-second video about the story behind your dish', xp: 200, difficulty: 'Hard', tag: 'Bonus' },
    { id: 4, title: 'Circle cook-along', desc: 'Cook the same dish simultaneously with 2+ circle members', xp: 250, difficulty: 'Hard', tag: 'Social' },
  ];

  const tagColors = {
    Featured: t.primary,
    Weekly: t.accent,
    Bonus: '#8B4513',
    Social: '#1A5276',
  };

  return React.createElement('div', { style: { paddingBottom: 16 } },
    // Header with streak
    React.createElement('div', {
      style: {
        background: t.secondary,
        padding: '16px 20px 16px',
        borderBottom: `3px solid ${t.primary}`,
      }
    },
      React.createElement('h1', {
        style: { fontFamily: "'Archivo Black', sans-serif", fontSize: 26, color: '#FDF3E0' }
      }, 'Cook Challenges'),
      React.createElement('div', {
        style: {
          display: 'flex',
          gap: 16,
          marginTop: 10,
        }
      },
        [['🔥', '12', 'Streak'], ['⚡', '1,240', 'XP'], ['🏆', '4', 'Badges']].map(([emoji, val, label], i) => React.createElement('div', {
          key: i,
          style: {
            background: 'rgba(255,255,255,0.1)',
            borderRadius: 4,
            padding: '6px 12px',
            textAlign: 'center',
          }
        },
          React.createElement('div', {
            style: { fontFamily: "'Archivo Black', sans-serif", fontSize: 16, color: '#FDF3E0' }
          }, `${emoji} ${val}`),
          React.createElement('div', { style: { fontSize: 10, color: 'rgba(253,243,224,0.6)', textTransform: 'uppercase', letterSpacing: 1 } }, label)
        ))
      )
    ),

    // Weekly progress bar
    React.createElement('div', {
      style: {
        margin: '16px 20px',
        background: t.surface,
        borderRadius: 4,
        padding: 14,
        border: `2px solid ${t.border}`,
      }
    },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 } },
        React.createElement('span', {
          style: { fontFamily: "'Archivo Black', sans-serif", fontSize: 13, color: t.text, textTransform: 'uppercase', letterSpacing: 0.5 }
        }, 'Weekly Progress'),
        React.createElement('span', { style: { fontSize: 13, fontWeight: 700, color: t.primary } }, '2/4 done')
      ),
      React.createElement('div', {
        style: { height: 10, background: t.cardAlt, borderRadius: 2, overflow: 'hidden', border: `1px solid ${t.border}` }
      },
        React.createElement('div', {
          style: {
            width: '50%',
            height: '100%',
            background: `linear-gradient(90deg, ${t.primary}, ${t.accent})`,
          }
        })
      )
    ),

    // Task list
    React.createElement('div', { style: { padding: '0 20px' } },
      tasks.map((task, i) => {
        const done = completed[task.id];
        return React.createElement('div', {
          key: task.id,
          style: {
            position: 'relative',
            marginBottom: 16,
          }
        },
          // Stacked effect
          !done && React.createElement('div', {
            style: {
              position: 'absolute',
              top: 4,
              left: -3,
              right: 4,
              bottom: -3,
              background: tagColors[task.tag] || t.accent,
              borderRadius: 4,
              transform: 'rotate(-1deg)',
            }
          }),
          React.createElement('div', {
            style: {
              position: 'relative',
              background: done ? t.cardAlt : t.card,
              borderRadius: 4,
              padding: 14,
              border: `2px solid ${done ? t.textLight : t.border}`,
              opacity: done ? 0.7 : 1,
            }
          },
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 } },
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8 } },
                React.createElement('span', {
                  style: {
                    background: tagColors[task.tag] || t.accent,
                    color: '#fff',
                    fontSize: 9,
                    fontWeight: 700,
                    padding: '2px 7px',
                    borderRadius: 2,
                    textTransform: 'uppercase',
                    letterSpacing: 0.5,
                  }
                }, task.tag),
                React.createElement('span', {
                  style: {
                    fontSize: 10,
                    color: t.textMuted,
                    fontWeight: 600,
                    textTransform: 'uppercase',
                  }
                }, task.difficulty)
              ),
              React.createElement('span', {
                style: {
                  fontFamily: "'Archivo Black', sans-serif",
                  fontSize: 14,
                  color: t.accent,
                }
              }, `+${task.xp} XP`)
            ),
            React.createElement('h3', {
              style: {
                fontFamily: "'Archivo Black', sans-serif",
                fontSize: 15,
                color: done ? t.textMuted : t.text,
                textDecoration: done ? 'line-through' : 'none',
                marginBottom: 4,
              }
            }, task.title),
            React.createElement('p', { style: { fontSize: 12, color: t.textMuted, lineHeight: 1.5 } }, task.desc),
            React.createElement('button', {
              onClick: () => setCompleted(prev => ({ ...prev, [task.id]: !prev[task.id] })),
              style: {
                marginTop: 10,
                background: done ? t.surface : t.primary,
                color: done ? t.textMuted : '#fff',
                border: `2px solid ${done ? t.textLight : t.primary}`,
                borderRadius: 2,
                padding: '7px 16px',
                fontSize: 12,
                fontWeight: 700,
                fontFamily: "'Archivo Black', sans-serif",
                textTransform: 'uppercase',
                letterSpacing: 0.5,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }
            },
              done ? React.createElement(window.lucide.Check, { size: 13 }) : null,
              done ? 'Completed!' : 'Mark Complete'
            )
          )
        );
      })
    )
  );
}

// ─── BASKET SCREEN ────────────────────────────────────────────────────────────
function BasketScreen({ t }) {
  const [votes, setVotes] = useState({ saffron: 5, chilies: 3, fennel: 4, miso: 2 });
  const [myVotes, setMyVotes] = useState({});
  const [reveal, setReveal] = useState(false);

  const ingredients = [
    { id: 'saffron', name: 'Saffron Threads', source: "Rivera's Farm", icon: '🌾', desc: 'Hand-harvested Spanish saffron' },
    { id: 'chilies', name: 'Smoked Chilies', source: 'Oaxacan Market Co.', icon: '🌶️', desc: 'Pasilla & ancho blend' },
    { id: 'fennel', name: 'Wild Fennel', source: 'Coastal Forage Co.', icon: '🌿', desc: 'Foraged from coastal headlands' },
    { id: 'miso', name: 'Barley Miso', source: 'Koji Craft SF', icon: '🍶', desc: '18-month aged artisan miso' },
  ];

  const totalVotes = Object.values(votes).reduce((a, b) => a + b, 0);

  const castVote = (id) => {
    if (myVotes[id]) return;
    setVotes(prev => ({ ...prev, [id]: prev[id] + 1 }));
    setMyVotes(prev => ({ ...prev, [id]: true }));
  };

  return React.createElement('div', { style: { paddingBottom: 16 } },
    // Header
    React.createElement('div', {
      style: {
        background: t.secondary,
        padding: '16px 20px 20px',
        borderBottom: `3px solid ${t.accent}`,
        position: 'relative',
        overflow: 'hidden',
      }
    },
      React.createElement('div', {
        style: {
          position: 'absolute', right: -10, top: -10, width: 80, height: 80,
          background: t.accent, borderRadius: 4, transform: 'rotate(25deg)', opacity: 0.25,
        }
      }),
      React.createElement('p', {
        style: { fontSize: 10, fontWeight: 700, color: t.accent, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 4 }
      }, '✦ Mystery Basket'),
      React.createElement('h1', {
        style: { fontFamily: "'Archivo Black', sans-serif", fontSize: 26, color: '#FDF3E0', lineHeight: 1.1 }
      }, 'Design Next\nWeek\'s Basket'),
      React.createElement('p', {
        style: { fontSize: 12, color: 'rgba(253,243,224,0.7)', marginTop: 8, lineHeight: 1.5 }
      }, 'Vote on ingredients to include. Your circle decides together — the winner unlocks on Sunday.')
    ),

    // Countdown
    React.createElement('div', {
      style: {
        margin: '14px 20px',
        background: t.primary,
        borderRadius: 4,
        padding: '10px 14px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        border: `2px solid ${t.border}`,
      }
    },
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8 } },
        React.createElement(window.lucide.Clock, { size: 16, color: '#fff' }),
        React.createElement('span', { style: { fontSize: 13, fontWeight: 700, color: '#fff' } }, 'Voting closes in')
      ),
      React.createElement('span', {
        style: { fontFamily: "'Archivo Black', sans-serif", fontSize: 18, color: '#F5E6C8' }
      }, '2d 14h 32m')
    ),

    // Ingredient voting
    React.createElement('div', { style: { padding: '0 20px' } },
      React.createElement('h2', {
        style: {
          fontFamily: "'Archivo Black', sans-serif",
          fontSize: 14,
          color: t.text,
          textTransform: 'uppercase',
          letterSpacing: 1,
          marginBottom: 12,
        }
      }, `${totalVotes} Total Votes Cast`),
      ingredients.map((item, i) => {
        const pct = Math.round((votes[item.id] / totalVotes) * 100);
        const isLeading = votes[item.id] === Math.max(...Object.values(votes));
        return React.createElement('div', {
          key: item.id,
          style: {
            background: t.card,
            borderRadius: 4,
            padding: 14,
            marginBottom: 12,
            border: `2px solid ${isLeading ? t.primary : t.border}`,
            position: 'relative',
            overflow: 'hidden',
          }
        },
          isLeading && React.createElement('div', {
            style: {
              position: 'absolute',
              top: 0, right: 0,
              background: t.primary,
              padding: '2px 8px',
              fontSize: 9,
              fontWeight: 700,
              color: '#fff',
              textTransform: 'uppercase',
              letterSpacing: 0.5,
              borderBottomLeftRadius: 4,
            }
          }, '⭐ Leading'),
          React.createElement('div', { style: { display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 10 } },
            React.createElement('div', {
              style: {
                width: 44,
                height: 44,
                background: isLeading ? t.primary : t.surface,
                borderRadius: 4,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 22,
                flexShrink: 0,
                border: `2px solid ${t.border}`,
              }
            }, item.icon),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('h3', {
                style: { fontFamily: "'Archivo Black', sans-serif", fontSize: 14, color: t.text }
              }, item.name),
              React.createElement('p', { style: { fontSize: 11, color: t.textMuted } }, `${item.source} · ${item.desc}`)
            )
          ),
          // Vote bar
          React.createElement('div', {
            style: { height: 8, background: t.cardAlt, borderRadius: 2, marginBottom: 8, overflow: 'hidden', border: `1px solid ${t.border}` }
          },
            React.createElement('div', {
              style: { width: `${pct}%`, height: '100%', background: isLeading ? t.primary : t.accent, transition: 'width 0.4s' }
            })
          ),
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
            React.createElement('span', { style: { fontSize: 12, fontWeight: 700, color: isLeading ? t.primary : t.textMuted } },
              `${votes[item.id]} votes · ${pct}%`
            ),
            React.createElement('button', {
              onClick: () => castVote(item.id),
              style: {
                background: myVotes[item.id] ? t.surface : t.primary,
                color: myVotes[item.id] ? t.textMuted : '#fff',
                border: `2px solid ${myVotes[item.id] ? t.textLight : t.primary}`,
                borderRadius: 2,
                padding: '5px 12px',
                fontSize: 11,
                fontWeight: 700,
                fontFamily: "'Archivo Black', sans-serif",
                textTransform: 'uppercase',
                cursor: myVotes[item.id] ? 'default' : 'pointer',
              }
            }, myVotes[item.id] ? '✓ Voted' : 'Vote')
          )
        );
      }),

      // Suggest button
      React.createElement('div', {
        style: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          padding: '12px 0',
          border: `2px dashed ${t.accent}`,
          borderRadius: 4,
          cursor: 'pointer',
          color: t.accent,
          marginTop: 4,
        }
      },
        React.createElement(window.lucide.PlusCircle, { size: 16, color: t.accent }),
        React.createElement('span', {
          style: { fontFamily: "'Archivo Black', sans-serif", fontSize: 13, textTransform: 'uppercase', letterSpacing: 0.5 }
        }, 'Suggest an Ingredient')
      )
    )
  );
}

// ─── PROFILE SCREEN ──────────────────────────────────────────────────────────
function ProfileScreen({ t, isDark, setIsDark }) {
  const badges = [
    { icon: '🌾', label: 'Grain Master' },
    { icon: '🔥', label: '7-Day Streak' },
    { icon: '🤝', label: 'Circle Founder' },
    { icon: '📖', label: 'Story Teller' },
  ];

  const stats = [
    { label: 'Streak', value: '12 days', icon: window.lucide.Flame },
    { label: 'Dishes', value: '47', icon: window.lucide.UtensilsCrossed },
    { label: 'XP Total', value: '2,840', icon: window.lucide.Zap },
    { label: 'Circles', value: '3', icon: window.lucide.Users },
  ];

  const recentDishes = [
    { name: 'Saffron Paella', date: 'Mar 27', emoji: '🍲' },
    { name: 'Mole Enchiladas', date: 'Mar 24', emoji: '🫔' },
    { name: 'Fennel Soup', date: 'Mar 21', emoji: '🍵' },
  ];

  return React.createElement('div', { style: { paddingBottom: 16 } },
    // Profile header
    React.createElement('div', {
      style: {
        background: t.secondary,
        padding: '16px 20px 20px',
        borderBottom: `3px solid ${t.primary}`,
      }
    },
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 14 } },
        React.createElement('div', {
          style: {
            width: 64,
            height: 64,
            background: t.primary,
            borderRadius: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: "'Archivo Black', sans-serif",
            fontSize: 24,
            color: '#fff',
            border: `3px solid ${t.accent}`,
            flexShrink: 0,
          }
        }, 'JS'),
        React.createElement('div', null,
          React.createElement('h1', {
            style: { fontFamily: "'Archivo Black', sans-serif", fontSize: 22, color: '#FDF3E0' }
          }, 'Jamie Santos'),
          React.createElement('p', { style: { fontSize: 12, color: 'rgba(253,243,224,0.65)', marginTop: 3 } },
            '🌍 Mission District, SF · Food lover'
          ),
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6, marginTop: 6 } },
            React.createElement(window.lucide.Flame, { size: 14, color: '#F39C12' }),
            React.createElement('span', {
              style: { fontSize: 13, fontWeight: 700, color: '#F39C12', fontFamily: "'Archivo Black', sans-serif" }
            }, '12 day streak')
          )
        )
      )
    ),

    // Stats row
    React.createElement('div', {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 0,
        borderBottom: `2px solid ${t.border}`,
        background: t.surface,
      }
    },
      stats.map((stat, i) => React.createElement('div', {
        key: i,
        style: {
          textAlign: 'center',
          padding: '12px 4px',
          borderRight: i < 3 ? `2px solid ${t.border}` : 'none',
        }
      },
        React.createElement('div', {
          style: { fontFamily: "'Archivo Black', sans-serif", fontSize: 15, color: t.primary, marginBottom: 2 }
        }, stat.value),
        React.createElement('div', { style: { fontSize: 9, color: t.textMuted, textTransform: 'uppercase', letterSpacing: 0.5 } }, stat.label)
      ))
    ),

    React.createElement('div', { style: { padding: '16px 20px 0' } },
      // Badges
      React.createElement('h2', {
        style: {
          fontFamily: "'Archivo Black', sans-serif",
          fontSize: 14,
          color: t.text,
          textTransform: 'uppercase',
          letterSpacing: 1,
          marginBottom: 10,
          borderLeft: `4px solid ${t.accent}`,
          paddingLeft: 10,
        }
      }, 'Earned Badges'),
      React.createElement('div', { style: { display: 'flex', gap: 10, marginBottom: 20 } },
        badges.map((badge, i) => React.createElement('div', {
          key: i,
          style: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 4,
            background: t.card,
            border: `2px solid ${t.border}`,
            borderRadius: 4,
            padding: '8px 6px',
            minWidth: 70,
          }
        },
          React.createElement('span', { style: { fontSize: 22 } }, badge.icon),
          React.createElement('span', { style: { fontSize: 9, fontWeight: 700, color: t.textMuted, textAlign: 'center', textTransform: 'uppercase', letterSpacing: 0.3 } }, badge.label)
        ))
      ),

      // Recent dishes
      React.createElement('h2', {
        style: {
          fontFamily: "'Archivo Black', sans-serif",
          fontSize: 14,
          color: t.text,
          textTransform: 'uppercase',
          letterSpacing: 1,
          marginBottom: 10,
          borderLeft: `4px solid ${t.primary}`,
          paddingLeft: 10,
        }
      }, 'Recent Dishes'),
      recentDishes.map((dish, i) => React.createElement('div', {
        key: i,
        style: {
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '10px 12px',
          background: t.surface,
          borderRadius: 4,
          marginBottom: 8,
          border: `2px solid ${t.border}`,
        }
      },
        React.createElement('span', { style: { fontSize: 20 } }, dish.emoji),
        React.createElement('div', { style: { flex: 1 } },
          React.createElement('p', {
            style: { fontFamily: "'Archivo Black', sans-serif", fontSize: 13, color: t.text }
          }, dish.name),
          React.createElement('p', { style: { fontSize: 11, color: t.textMuted } }, dish.date)
        ),
        React.createElement(window.lucide.ChevronRight, { size: 16, color: t.textLight })
      )),

      // Settings
      React.createElement('div', {
        style: {
          marginTop: 14,
          background: t.surface,
          borderRadius: 4,
          border: `2px solid ${t.border}`,
          overflow: 'hidden',
        }
      },
        [
          { label: 'Dark Mode', action: () => setIsDark(d => !d), isToggle: true, value: isDark },
          { label: 'Notification Prefs', action: null, isToggle: false },
          { label: 'Privacy Settings', action: null, isToggle: false },
          { label: 'Sign Out', action: null, isToggle: false, danger: true },
        ].map((item, i, arr) => React.createElement('div', {
          key: i,
          onClick: item.action,
          style: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 14px',
            borderBottom: i < arr.length - 1 ? `1px solid ${t.border}` : 'none',
            cursor: item.action ? 'pointer' : 'default',
          }
        },
          React.createElement('span', {
            style: {
              fontSize: 13,
              fontWeight: 600,
              color: item.danger ? t.primary : t.text,
            }
          }, item.label),
          item.isToggle
            ? React.createElement('div', {
                style: {
                  width: 44,
                  height: 24,
                  background: item.value ? t.primary : t.textLight,
                  borderRadius: 12,
                  position: 'relative',
                  transition: 'background 0.2s',
                  cursor: 'pointer',
                  border: `2px solid ${t.border}`,
                }
              },
                React.createElement('div', {
                  style: {
                    position: 'absolute',
                    top: 2,
                    left: item.value ? 22 : 2,
                    width: 16,
                    height: 16,
                    background: '#fff',
                    borderRadius: 8,
                    transition: 'left 0.2s',
                  }
                })
              )
            : React.createElement(window.lucide.ChevronRight, { size: 16, color: t.textLight })
        ))
      )
    )
  );
}
