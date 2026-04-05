const { useState, useEffect, useRef } = React;

function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [darkMode, setDarkMode] = useState(true);
  const [activeChallenge, setActiveChallenge] = useState(null);
  const [likedItems, setLikedItems] = useState({});
  const [joinedCrew, setJoinedCrew] = useState(null);

  const themes = {
    dark: {
      bg: '#0A1628',
      surface: '#111F35',
      card: '#162540',
      border: '#1E3050',
      textPrimary: '#F0FDFA',
      textSecondary: '#94A3B8',
      textMuted: '#64748B',
      primary: '#0D9488',
      secondary: '#14B8A6',
      cta: '#F97316',
      navBg: '#0A1628',
      inputBg: '#162540',
      badge: '#1E3A5F',
    },
    light: {
      bg: '#F0FDFA',
      surface: '#FFFFFF',
      card: '#FFFFFF',
      border: '#CCFBF1',
      textPrimary: '#0F172A',
      textSecondary: '#475569',
      textMuted: '#94A3B8',
      primary: '#0D9488',
      secondary: '#14B8A6',
      cta: '#F97316',
      navBg: '#FFFFFF',
      inputBg: '#F0FDFA',
      badge: '#CCFBF1',
    }
  };

  const t = themes[darkMode ? 'dark' : 'light'];

  const fontStyle = `
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
    @keyframes fadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.06); } }
    @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
    @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    @keyframes popIn { 0% { transform: scale(0.8); opacity: 0; } 70% { transform: scale(1.1); } 100% { transform: scale(1); opacity: 1; } }
    @keyframes gradientFlow { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
    * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
    ::-webkit-scrollbar { width: 0px; }
    .screen-fade { animation: fadeIn 0.3s ease forwards; }
    .card-hover { transition: transform 0.2s ease, box-shadow 0.2s ease; }
    .card-hover:hover { transform: translateY(-2px); }
    .card-hover:active { transform: scale(0.97); }
    .btn-press:active { transform: scale(0.94); }
    .shimmer-bg {
      background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 50%, transparent 100%);
      background-size: 200% 100%;
      animation: shimmer 2s infinite;
    }
  `;

  const screens = { home: HomeScreen, crews: CrewsScreen, feed: FeedScreen, profile: ProfileScreen };
  const ActiveScreen = screens[activeScreen];

  const navItems = [
    { id: 'home', label: 'Home', icon: 'Home' },
    { id: 'crews', label: 'Crews', icon: 'Users' },
    { id: 'feed', label: 'Feed', icon: 'Compass' },
    { id: 'profile', label: 'Profile', icon: 'User' },
  ];

  const sharedProps = { t, darkMode, setDarkMode, setActiveScreen, likedItems, setLikedItems, activeChallenge, setActiveChallenge, joinedCrew, setJoinedCrew };

  return React.createElement('div', {
    style: { minHeight: '100vh', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Plus Jakarta Sans', sans-serif" }
  },
    React.createElement('style', null, fontStyle),
    React.createElement('div', {
      style: {
        width: 375, height: 812, background: t.bg, borderRadius: 40, overflow: 'hidden', position: 'relative',
        boxShadow: '0 40px 80px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.08)',
        display: 'flex', flexDirection: 'column',
      }
    },
      React.createElement('div', {
        style: { flex: 1, overflow: 'hidden', position: 'relative' }
      },
        React.createElement(ActiveScreen, { ...sharedProps, key: activeScreen })
      ),
      React.createElement('div', {
        style: {
          display: 'flex', background: t.navBg, borderTop: `1px solid ${t.border}`,
          paddingBottom: 8, paddingTop: 4,
          boxShadow: darkMode ? '0 -8px 24px rgba(0,0,0,0.3)' : '0 -4px 12px rgba(0,0,0,0.06)',
        }
      },
        navItems.map(item => {
          const Icon = window.lucide[item.icon];
          const isActive = activeScreen === item.id;
          return React.createElement('button', {
            key: item.id,
            onClick: () => setActiveScreen(item.id),
            className: 'btn-press',
            style: {
              flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              gap: 3, padding: '8px 4px', background: 'none', border: 'none', cursor: 'pointer',
              color: isActive ? t.primary : t.textMuted, minHeight: 52,
            }
          },
            Icon && React.createElement(Icon, { size: 20, strokeWidth: isActive ? 2.5 : 1.8 }),
            React.createElement('span', {
              style: { fontSize: 10, fontWeight: isActive ? 700 : 500, letterSpacing: 0.2 }
            }, item.label)
          );
        })
      )
    )
  );
}

// ─── HOME SCREEN ────────────────────────────────────────────────────────────
function HomeScreen({ t, darkMode, setDarkMode, setActiveScreen, likedItems, setLikedItems, setActiveChallenge }) {
  const [pressedBite, setPressedBite] = useState(null);
  const [completedBite, setCompletedBite] = useState(null);

  const dailyBite = {
    id: 'bite1',
    title: 'Perfect Poached Egg',
    subtitle: 'Master the swirl in 90 seconds',
    difficulty: 'Beginner',
    duration: '90s',
    crew: 'Kitchen Rebels',
    crewSize: 3,
    points: 120,
    tags: ['Eggs', 'Technique'],
    gradient: ['#0D9488', '#0891B2'],
  };

  const upcomingBites = [
    { id: 'bite2', title: 'Chocolate Avocado Mousse', duration: '3 min', difficulty: 'Easy', points: 85, icon: 'Cookie' },
    { id: 'bite3', title: 'Miso Butter Noodles', duration: '5 min', difficulty: 'Medium', points: 140, icon: 'ChefHat' },
    { id: 'bite4', title: 'Crispy Smash Burger', duration: '4 min', difficulty: 'Medium', points: 160, icon: 'Flame' },
  ];

  const stats = [
    { label: 'Discovery Score', value: '2,840', icon: 'Star', color: '#F59E0B' },
    { label: 'Trails Unlocked', value: '12', icon: 'Map', color: t.primary },
    { label: 'Crew Wins', value: '7', icon: 'Trophy', color: '#F97316' },
  ];

  return React.createElement('div', {
    className: 'screen-fade',
    style: { height: '100%', overflowY: 'auto', background: t.bg }
  },
    // Header
    React.createElement('div', {
      style: {
        padding: '20px 20px 12px',
        background: t.bg,
        position: 'sticky', top: 0, zIndex: 10,
        backdropFilter: 'blur(12px)',
      }
    },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
        React.createElement('div', null,
          React.createElement('p', { style: { color: t.textMuted, fontSize: 12, fontWeight: 500, margin: 0, letterSpacing: 0.5 } }, "SUNDAY, APR 5"),
          React.createElement('h1', { style: { color: t.textPrimary, fontSize: 22, fontWeight: 800, margin: '2px 0 0' } }, "Today's Quest 🔥")
        ),
        React.createElement('div', { style: { display: 'flex', gap: 8, alignItems: 'center' } },
          React.createElement('button', {
            onClick: () => setDarkMode(!darkMode),
            className: 'btn-press',
            style: {
              width: 36, height: 36, borderRadius: 10, background: t.card, border: `1px solid ${t.border}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: t.textSecondary
            }
          }, React.createElement(darkMode ? window.lucide.Sun : window.lucide.Moon, { size: 16 })),
          React.createElement('button', {
            style: {
              width: 36, height: 36, borderRadius: 10, background: t.card, border: `1px solid ${t.border}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: t.textSecondary
            }
          }, React.createElement(window.lucide.Bell, { size: 16 }))
        )
      )
    ),

    React.createElement('div', { style: { padding: '0 16px 100px' } },

      // Stats row
      React.createElement('div', { style: { display: 'flex', gap: 8, marginBottom: 20 } },
        stats.map((s, i) =>
          React.createElement('div', {
            key: i,
            style: {
              flex: 1, background: t.card, borderRadius: 14, padding: '10px 8px',
              border: `1px solid ${t.border}`, textAlign: 'center',
              animation: `fadeIn 0.4s ease ${i * 0.1}s both`
            }
          },
            React.createElement('div', {
              style: { width: 28, height: 28, borderRadius: 8, background: s.color + '22', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 4px', color: s.color }
            }, React.createElement(window.lucide[s.icon], { size: 14 })),
            React.createElement('div', { style: { color: t.textPrimary, fontSize: 14, fontWeight: 800 } }, s.value),
            React.createElement('div', { style: { color: t.textMuted, fontSize: 9, fontWeight: 600, letterSpacing: 0.3 } }, s.label.toUpperCase())
          )
        )
      ),

      // Daily Featured Bite
      React.createElement('div', { style: { marginBottom: 20, animation: 'slideUp 0.4s ease 0.1s both' } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 } },
          React.createElement('h2', { style: { color: t.textPrimary, fontSize: 15, fontWeight: 700, margin: 0 } }, "⚡ Daily Flavor Bite"),
          React.createElement('span', {
            style: {
              background: t.cta + '22', color: t.cta, fontSize: 10, fontWeight: 700,
              padding: '3px 8px', borderRadius: 20, border: `1px solid ${t.cta}44`
            }
          }, "LIVE NOW")
        ),

        React.createElement('div', {
          className: 'card-hover',
          onClick: () => { setActiveChallenge(dailyBite); setActiveScreen('crews'); },
          style: {
            borderRadius: 20, overflow: 'hidden', cursor: 'pointer', position: 'relative',
            background: `linear-gradient(135deg, ${dailyBite.gradient[0]}, ${dailyBite.gradient[1]})`,
            padding: 20,
            boxShadow: `0 8px 32px ${dailyBite.gradient[0]}44`,
          }
        },
          React.createElement('div', {
            style: {
              position: 'absolute', top: 0, right: 0, width: 160, height: 160, borderRadius: '0 20px 0 160px',
              background: 'rgba(255,255,255,0.06)'
            }
          }),
          React.createElement('div', {
            style: {
              position: 'absolute', bottom: -20, left: -20, width: 100, height: 100, borderRadius: '50%',
              background: 'rgba(0,0,0,0.1)'
            }
          }),

          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative', zIndex: 1 } },
            React.createElement('div', null,
              React.createElement('div', { style: { display: 'flex', gap: 6, marginBottom: 8 } },
                React.createElement('span', {
                  style: { background: 'rgba(255,255,255,0.2)', color: '#fff', fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 20 }
                }, dailyBite.difficulty),
                React.createElement('span', {
                  style: { background: 'rgba(255,255,255,0.15)', color: '#fff', fontSize: 10, fontWeight: 600, padding: '3px 8px', borderRadius: 20, display: 'flex', alignItems: 'center', gap: 3 }
                }, React.createElement(window.lucide.Clock, { size: 10 }), ' ', dailyBite.duration)
              ),
              React.createElement('h3', { style: { color: '#fff', fontSize: 20, fontWeight: 800, margin: '0 0 4px', lineHeight: 1.2 } }, dailyBite.title),
              React.createElement('p', { style: { color: 'rgba(255,255,255,0.8)', fontSize: 12, margin: '0 0 14px' } }, dailyBite.subtitle),
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8 } },
                React.createElement('div', {
                  style: { display: 'flex', alignItems: 'center', gap: 4, color: 'rgba(255,255,255,0.9)', fontSize: 11 }
                },
                  React.createElement(window.lucide.Users, { size: 12 }),
                  React.createElement('span', { style: { fontWeight: 600 } }, dailyBite.crew)
                ),
                React.createElement('span', { style: { color: 'rgba(255,255,255,0.5)', fontSize: 11 } }, '·'),
                React.createElement('span', { style: { color: '#FFD700', fontSize: 12, fontWeight: 700 } }, `+${dailyBite.points} pts`)
              )
            ),
            React.createElement('div', {
              style: {
                width: 52, height: 52, borderRadius: 16, background: 'rgba(255,255,255,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff',
                backdropFilter: 'blur(4px)', animation: 'pulse 2.5s ease infinite'
              }
            }, React.createElement(window.lucide.PlayCircle, { size: 26 }))
          ),

          React.createElement('div', {
            style: { marginTop: 16, paddingTop: 14, borderTop: '1px solid rgba(255,255,255,0.15)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 1 }
          },
            React.createElement('div', { style: { display: 'flex', gap: -6, alignItems: 'center' } },
              ['A', 'B', 'C'].map((l, i) =>
                React.createElement('div', {
                  key: i,
                  style: {
                    width: 26, height: 26, borderRadius: '50%', background: ['#F97316', '#8B5CF6', '#EC4899'][i],
                    border: '2px solid rgba(255,255,255,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#fff', fontSize: 10, fontWeight: 700, marginLeft: i > 0 ? -8 : 0, zIndex: 3 - i,
                  }
                }, l)
              ),
              React.createElement('span', { style: { color: 'rgba(255,255,255,0.7)', fontSize: 11, marginLeft: 6 } }, "3 crew members")
            ),
            React.createElement('button', {
              className: 'btn-press',
              style: {
                background: '#fff', color: dailyBite.gradient[0], fontSize: 12, fontWeight: 800,
                padding: '8px 16px', borderRadius: 20, border: 'none', cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)', minHeight: 36,
              }
            }, "Join Quest →")
          )
        )
      ),

      // Upcoming Bites
      React.createElement('div', { style: { marginBottom: 20 } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 } },
          React.createElement('h2', { style: { color: t.textPrimary, fontSize: 15, fontWeight: 700, margin: 0 } }, "Upcoming Bites"),
          React.createElement('button', {
            style: { background: 'none', border: 'none', color: t.primary, fontSize: 12, fontWeight: 600, cursor: 'pointer', padding: 0 }
          }, "See all")
        ),
        upcomingBites.map((bite, i) =>
          React.createElement('div', {
            key: bite.id,
            className: 'card-hover',
            style: {
              background: t.card, borderRadius: 16, padding: '12px 14px', marginBottom: 8,
              border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer',
              animation: `fadeIn 0.4s ease ${0.2 + i * 0.08}s both`
            }
          },
            React.createElement('div', {
              style: {
                width: 44, height: 44, borderRadius: 12, background: [t.primary + '22', '#F97316' + '22', '#8B5CF6' + '22'][i],
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: [t.primary, '#F97316', '#8B5CF6'][i], flexShrink: 0,
              }
            }, React.createElement(window.lucide[bite.icon], { size: 20 })),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', { style: { color: t.textPrimary, fontSize: 13, fontWeight: 700 } }, bite.title),
              React.createElement('div', { style: { color: t.textMuted, fontSize: 11, marginTop: 2, display: 'flex', gap: 8 } },
                bite.difficulty, '·', bite.duration
              )
            ),
            React.createElement('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 } },
              React.createElement('span', { style: { color: '#FFD700', fontSize: 11, fontWeight: 700 } }, `+${bite.points}`),
              React.createElement(window.lucide.ChevronRight, { size: 14, color: t.textMuted })
            )
          )
        )
      ),

      // Technique Trail Progress
      React.createElement('div', {
        style: {
          background: t.card, borderRadius: 20, padding: 16, border: `1px solid ${t.border}`,
          animation: 'fadeIn 0.5s ease 0.3s both'
        }
      },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 } },
          React.createElement('div', null,
            React.createElement('div', { style: { color: t.textPrimary, fontSize: 14, fontWeight: 700 } }, "🗺 Egg Mastery Trail"),
            React.createElement('div', { style: { color: t.textMuted, fontSize: 11, marginTop: 2 } }, "3 of 6 techniques unlocked")
          ),
          React.createElement('span', { style: { color: t.primary, fontSize: 12, fontWeight: 700 } }, "50%")
        ),
        React.createElement('div', { style: { background: t.border, borderRadius: 100, height: 8, overflow: 'hidden' } },
          React.createElement('div', {
            style: {
              width: '50%', height: '100%', borderRadius: 100,
              background: `linear-gradient(90deg, ${t.primary}, ${t.secondary})`,
              boxShadow: `0 0 12px ${t.primary}66`,
            }
          })
        ),
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginTop: 10 } },
          ['Boil', 'Poach', 'Fry', 'Scramble', 'Bake', 'Cure'].map((tech, i) =>
            React.createElement('div', { key: i, style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 } },
              React.createElement('div', {
                style: {
                  width: 28, height: 28, borderRadius: '50%',
                  background: i < 3 ? `linear-gradient(135deg, ${t.primary}, ${t.secondary})` : t.border,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: i < 3 ? `0 0 10px ${t.primary}55` : 'none',
                }
              }, i < 3 ? React.createElement(window.lucide.Check, { size: 12, color: '#fff', strokeWidth: 3 }) : null),
              React.createElement('span', { style: { color: i < 3 ? t.textSecondary : t.textMuted, fontSize: 8, fontWeight: 600 } }, tech)
            )
          )
        )
      )
    )
  );
}

// ─── CREWS SCREEN ────────────────────────────────────────────────────────────
function CrewsScreen({ t, setActiveScreen, activeChallenge, joinedCrew, setJoinedCrew }) {
  const [activeTab, setActiveTab] = useState('my');
  const [showInvite, setShowInvite] = useState(false);

  const myCrews = [
    {
      id: 'crew1', name: 'Kitchen Rebels', members: 3, score: 2840, status: 'active', challenge: 'Perfect Poached Egg',
      avatars: ['#F97316', '#8B5CF6', '#0D9488'], level: 14, streak: 5
    },
    {
      id: 'crew2', name: 'Spice Syndicate', members: 4, score: 1920, status: 'idle', challenge: 'Miso Butter Noodles',
      avatars: ['#EC4899', '#F59E0B', '#06B6D4', '#84CC16'], level: 9, streak: 2
    },
  ];

  const matchCrew = [
    { id: 'mc1', name: 'Umami Hunters', members: 2, lookingFor: 2, cuisine: 'Asian Fusion', score: 3100 },
    { id: 'mc2', name: 'The Fermenters', members: 1, lookingFor: 3, cuisine: 'Fermentation', score: 780 },
    { id: 'mc3', name: 'Zero Waste Chefs', members: 3, lookingFor: 1, cuisine: 'Sustainable', score: 1560 },
  ];

  return React.createElement('div', {
    className: 'screen-fade',
    style: { height: '100%', overflowY: 'auto', background: t.bg }
  },
    React.createElement('div', {
      style: { padding: '20px 20px 12px', position: 'sticky', top: 0, background: t.bg, zIndex: 10 }
    },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 } },
        React.createElement('h1', { style: { color: t.textPrimary, fontSize: 22, fontWeight: 800, margin: 0 } }, "Culinary Crews"),
        React.createElement('button', {
          className: 'btn-press',
          onClick: () => setShowInvite(true),
          style: {
            background: t.primary, color: '#fff', border: 'none', borderRadius: 10, padding: '8px 14px',
            fontSize: 12, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5
          }
        }, React.createElement(window.lucide.Plus, { size: 14 }), "New Crew")
      ),
      React.createElement('div', { style: { display: 'flex', gap: 8 } },
        ['my', 'discover'].map(tab =>
          React.createElement('button', {
            key: tab, onClick: () => setActiveTab(tab),
            className: 'btn-press',
            style: {
              flex: 1, padding: '9px', borderRadius: 10, border: 'none', cursor: 'pointer', fontWeight: 700,
              fontSize: 13, fontFamily: "'Plus Jakarta Sans', sans-serif",
              background: activeTab === tab ? t.primary : t.card,
              color: activeTab === tab ? '#fff' : t.textMuted,
              transition: 'all 0.2s ease',
            }
          }, tab === 'my' ? 'My Crews' : 'Discover')
        )
      )
    ),

    React.createElement('div', { style: { padding: '8px 16px 100px' } },

      activeTab === 'my' ? React.createElement('div', null,
        // Active challenge banner
        React.createElement('div', {
          style: {
            background: `linear-gradient(135deg, ${t.primary}33, ${t.secondary}22)`,
            border: `1px solid ${t.primary}44`, borderRadius: 16, padding: 14, marginBottom: 16,
            display: 'flex', alignItems: 'center', gap: 10
          }
        },
          React.createElement('div', {
            style: { width: 40, height: 40, borderRadius: 12, background: t.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', animation: 'pulse 2s ease infinite', flexShrink: 0 }
          }, React.createElement(window.lucide.Zap, { size: 18 })),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', { style: { color: t.textPrimary, fontSize: 13, fontWeight: 700 } }, "Active Challenge"),
            React.createElement('div', { style: { color: t.textMuted, fontSize: 11, marginTop: 2 } }, "Perfect Poached Egg · 42 min left")
          ),
          React.createElement('button', {
            className: 'btn-press',
            style: { background: t.cta, color: '#fff', border: 'none', borderRadius: 10, padding: '8px 12px', fontSize: 11, fontWeight: 700, cursor: 'pointer' }
          }, "Resume")
        ),

        myCrews.map((crew, i) =>
          React.createElement('div', {
            key: crew.id,
            className: 'card-hover',
            style: {
              background: t.card, borderRadius: 20, padding: 16, marginBottom: 12,
              border: `1px solid ${crew.status === 'active' ? t.primary + '44' : t.border}`,
              boxShadow: crew.status === 'active' ? `0 0 0 1px ${t.primary}22, 0 8px 24px rgba(0,0,0,0.15)` : 'none',
              animation: `slideUp 0.4s ease ${i * 0.1}s both`
            }
          },
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 } },
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10 } },
                React.createElement('div', { style: { position: 'relative' } },
                  React.createElement('div', {
                    style: { display: 'flex' }
                  },
                    crew.avatars.map((color, j) =>
                      React.createElement('div', {
                        key: j,
                        style: {
                          width: 28, height: 28, borderRadius: '50%', background: color,
                          border: `2px solid ${t.card}`, marginLeft: j > 0 ? -10 : 0, zIndex: crew.avatars.length - j,
                          display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 10, fontWeight: 700,
                        }
                      }, ['A', 'B', 'C', 'D'][j])
                    )
                  ),
                  crew.status === 'active' && React.createElement('div', {
                    style: { position: 'absolute', bottom: -1, right: -1, width: 10, height: 10, borderRadius: '50%', background: '#22C55E', border: `2px solid ${t.card}` }
                  })
                ),
                React.createElement('div', null,
                  React.createElement('div', { style: { color: t.textPrimary, fontSize: 14, fontWeight: 700 } }, crew.name),
                  React.createElement('div', { style: { color: t.textMuted, fontSize: 11, marginTop: 1 } }, `${crew.members} members · Level ${crew.level}`)
                )
              ),
              React.createElement('div', { style: { textAlign: 'right' } },
                React.createElement('div', { style: { color: '#FFD700', fontSize: 13, fontWeight: 800 } }, crew.score.toLocaleString()),
                React.createElement('div', { style: { color: t.textMuted, fontSize: 9, fontWeight: 600, letterSpacing: 0.3 } }, "DISCOVERY SCORE")
              )
            ),
            React.createElement('div', {
              style: { background: t.inputBg, borderRadius: 10, padding: '8px 10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }
            },
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6 } },
                React.createElement(window.lucide.ChefHat, { size: 13, color: t.primary }),
                React.createElement('span', { style: { color: t.textSecondary, fontSize: 11, fontWeight: 600 } }, crew.challenge)
              ),
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4, color: t.cta } },
                React.createElement(window.lucide.Flame, { size: 12 }),
                React.createElement('span', { style: { fontSize: 11, fontWeight: 700 } }, `${crew.streak} streak`)
              )
            )
          )
        )
      ) : React.createElement('div', null,
        React.createElement('p', { style: { color: t.textMuted, fontSize: 13, marginBottom: 14 } }, "Find crews looking for a culinary co-op partner"),
        matchCrew.map((c, i) =>
          React.createElement('div', {
            key: c.id,
            className: 'card-hover',
            style: {
              background: t.card, borderRadius: 20, padding: 16, marginBottom: 12,
              border: `1px solid ${t.border}`, cursor: 'pointer',
              animation: `slideUp 0.3s ease ${i * 0.1}s both`
            }
          },
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 } },
              React.createElement('div', null,
                React.createElement('div', { style: { color: t.textPrimary, fontSize: 14, fontWeight: 700 } }, c.name),
                React.createElement('div', { style: { display: 'flex', gap: 6, alignItems: 'center', marginTop: 3 } },
                  React.createElement('span', {
                    style: { background: t.primary + '22', color: t.primary, fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 10 }
                  }, c.cuisine),
                  React.createElement('span', { style: { color: t.textMuted, fontSize: 11 } }, `${c.members}/4 members`)
                )
              ),
              React.createElement('div', { style: { textAlign: 'right' } },
                React.createElement('div', { style: { color: '#FFD700', fontSize: 13, fontWeight: 700 } }, c.score.toLocaleString()),
                React.createElement('div', {
                  style: { background: '#22C55E' + '22', color: '#22C55E', fontSize: 10, fontWeight: 700, padding: '2px 6px', borderRadius: 6, marginTop: 2 }
                }, `${c.lookingFor} spots open`)
              )
            ),
            React.createElement('button', {
              className: 'btn-press',
              onClick: () => setJoinedCrew(c.id),
              style: {
                width: '100%', padding: 10, borderRadius: 10, border: `1px solid ${joinedCrew === c.id ? '#22C55E' : t.primary}`,
                background: joinedCrew === c.id ? '#22C55E' + '22' : t.primary + '15',
                color: joinedCrew === c.id ? '#22C55E' : t.primary,
                fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: "'Plus Jakarta Sans', sans-serif",
                transition: 'all 0.2s ease',
              }
            }, joinedCrew === c.id ? '✓ Joined!' : 'Request to Join')
          )
        )
      )
    )
  );
}

// ─── FEED SCREEN ────────────────────────────────────────────────────────────
function FeedScreen({ t, likedItems, setLikedItems }) {
  const [activeFilter, setActiveFilter] = useState('trending');
  const [showScore, setShowScore] = useState(null);

  const posts = [
    {
      id: 'p1', user: 'Alex R.', crew: 'Kitchen Rebels', challenge: 'Perfect Poached Egg',
      image: '#0D9488', time: '8 min ago', likes: 42, comments: 7,
      description: "Nailed the swirl technique! The yolk was perfectly runny 🥚",
      scores: { aroma: 88, taste: 94, visual: 91 },
      tags: ['Eggs', 'Technique'],
    },
    {
      id: 'p2', user: 'Maria T.', crew: 'Spice Syndicate', challenge: 'Chocolate Avocado Mousse',
      image: '#8B5CF6', time: '23 min ago', likes: 67, comments: 12,
      description: "The avocado gives it such a velvety texture, honestly surprised how good this is",
      scores: { aroma: 76, taste: 95, visual: 88 },
      tags: ['Dessert', 'Healthy'],
    },
    {
      id: 'p3', user: 'Sam L.', crew: 'Umami Hunters', challenge: 'Miso Butter Noodles',
      image: '#F97316', time: '1 hr ago', likes: 128, comments: 31,
      description: "Added a soft boiled egg and crispy shallots. The miso butter combo is INSANE.",
      scores: { aroma: 97, taste: 99, visual: 93 },
      tags: ['Noodles', 'Umami'],
    },
  ];

  const filters = ['trending', 'my crew', 'following'];

  return React.createElement('div', {
    className: 'screen-fade',
    style: { height: '100%', overflowY: 'auto', background: t.bg }
  },
    React.createElement('div', {
      style: { padding: '20px 20px 12px', position: 'sticky', top: 0, background: t.bg, zIndex: 10 }
    },
      React.createElement('h1', { style: { color: t.textPrimary, fontSize: 22, fontWeight: 800, margin: '0 0 14px' } }, "Discovery Feed"),
      React.createElement('div', { style: { display: 'flex', gap: 6 } },
        filters.map(f =>
          React.createElement('button', {
            key: f, onClick: () => setActiveFilter(f),
            className: 'btn-press',
            style: {
              padding: '7px 14px', borderRadius: 20, border: `1px solid ${activeFilter === f ? t.primary : t.border}`,
              background: activeFilter === f ? t.primary : 'transparent',
              color: activeFilter === f ? '#fff' : t.textMuted,
              fontSize: 11, fontWeight: 600, cursor: 'pointer', fontFamily: "'Plus Jakarta Sans', sans-serif",
              transition: 'all 0.2s ease', textTransform: 'capitalize',
            }
          }, f)
        )
      )
    ),

    React.createElement('div', { style: { padding: '4px 16px 100px' } },
      posts.map((post, i) =>
        React.createElement('div', {
          key: post.id,
          className: 'card-hover',
          style: {
            background: t.card, borderRadius: 20, marginBottom: 16,
            border: `1px solid ${t.border}`,
            overflow: 'hidden',
            animation: `slideUp 0.4s ease ${i * 0.12}s both`,
            boxShadow: '0 4px 20px rgba(0,0,0,0.12)'
          }
        },
          // Post image area
          React.createElement('div', {
            style: {
              height: 180, background: `linear-gradient(135deg, ${post.image}33, ${post.image}66)`,
              position: 'relative', overflow: 'hidden',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }
          },
            React.createElement('div', {
              className: 'shimmer-bg',
              style: { position: 'absolute', inset: 0 }
            }),
            React.createElement('div', {
              style: {
                width: 64, height: 64, borderRadius: 20, background: post.image + '44',
                backdropFilter: 'blur(8px)', border: `1px solid ${post.image}66`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: post.image
              }
            }, React.createElement(window.lucide.Camera, { size: 28 })),
            React.createElement('div', {
              style: {
                position: 'absolute', top: 10, left: 10, background: 'rgba(0,0,0,0.5)',
                backdropFilter: 'blur(4px)', borderRadius: 10, padding: '4px 10px',
                color: '#fff', fontSize: 10, fontWeight: 700,
              }
            }, post.challenge),
            React.createElement('div', {
              style: {
                position: 'absolute', top: 10, right: 10,
                background: post.image, borderRadius: 10, padding: '4px 8px',
                color: '#fff', fontSize: 10, fontWeight: 700,
              }
            }, post.crew),
            // Sensory Scorecard overlay button
            React.createElement('button', {
              className: 'btn-press',
              onClick: () => setShowScore(showScore === post.id ? null : post.id),
              style: {
                position: 'absolute', bottom: 10, right: 10, background: 'rgba(0,0,0,0.6)',
                backdropFilter: 'blur(4px)', border: `1px solid rgba(255,255,255,0.2)`, borderRadius: 10,
                padding: '5px 10px', color: '#fff', fontSize: 10, fontWeight: 700, cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 4,
              }
            }, React.createElement(window.lucide.BarChart2, { size: 12 }), "Scorecard")
          ),

          // Scorecard expansion
          showScore === post.id && React.createElement('div', {
            style: {
              background: t.inputBg, padding: '12px 16px', borderBottom: `1px solid ${t.border}`,
              animation: 'fadeIn 0.2s ease'
            }
          },
            React.createElement('div', { style: { color: t.textPrimary, fontSize: 12, fontWeight: 700, marginBottom: 10 } }, "✨ Sensory Scorecard"),
            React.createElement('div', { style: { display: 'flex', gap: 8 } },
              Object.entries(post.scores).map(([key, val]) =>
                React.createElement('div', {
                  key, style: { flex: 1, textAlign: 'center' }
                },
                  React.createElement('div', {
                    style: { color: val >= 90 ? t.cta : t.primary, fontSize: 18, fontWeight: 800 }
                  }, val),
                  React.createElement('div', { style: { color: t.textMuted, fontSize: 9, fontWeight: 600, letterSpacing: 0.3, textTransform: 'uppercase' } },
                    key === 'aroma' ? 'Aroma Art' : key === 'taste' ? 'Taste Trek' : 'Visual Vibe'
                  ),
                  React.createElement('div', { style: { height: 3, background: t.border, borderRadius: 10, marginTop: 4, overflow: 'hidden' } },
                    React.createElement('div', {
                      style: { width: `${val}%`, height: '100%', background: val >= 90 ? t.cta : t.primary, borderRadius: 10 }
                    })
                  )
                )
              )
            )
          ),

          // Post content
          React.createElement('div', { style: { padding: '12px 14px 14px' } },
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 } },
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8 } },
                React.createElement('div', {
                  style: {
                    width: 32, height: 32, borderRadius: '50%', background: post.image,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 12, fontWeight: 700,
                  }
                }, post.user[0]),
                React.createElement('div', null,
                  React.createElement('div', { style: { color: t.textPrimary, fontSize: 13, fontWeight: 700 } }, post.user),
                  React.createElement('div', { style: { color: t.textMuted, fontSize: 10 } }, post.time)
                )
              ),
              React.createElement('div', { style: { display: 'flex', gap: 4 } },
                post.tags.map(tag =>
                  React.createElement('span', {
                    key: tag,
                    style: {
                      background: t.badge, color: t.textSecondary, fontSize: 9, fontWeight: 600,
                      padding: '2px 7px', borderRadius: 10,
                    }
                  }, tag)
                )
              )
            ),
            React.createElement('p', { style: { color: t.textSecondary, fontSize: 12, lineHeight: 1.5, margin: '0 0 12px' } }, post.description),
            React.createElement('div', { style: { display: 'flex', gap: 14 } },
              React.createElement('button', {
                className: 'btn-press',
                onClick: () => setLikedItems(prev => ({ ...prev, [post.id]: !prev[post.id] })),
                style: {
                  background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                  display: 'flex', alignItems: 'center', gap: 5,
                  color: likedItems[post.id] ? '#F43F5E' : t.textMuted,
                  transition: 'color 0.2s ease',
                }
              },
                React.createElement(window.lucide.Heart, { size: 16, fill: likedItems[post.id] ? '#F43F5E' : 'none' }),
                React.createElement('span', { style: { fontSize: 12, fontWeight: 600 } }, post.likes + (likedItems[post.id] ? 1 : 0))
              ),
              React.createElement('button', {
                style: { background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', gap: 5, color: t.textMuted }
              },
                React.createElement(window.lucide.MessageCircle, { size: 16 }),
                React.createElement('span', { style: { fontSize: 12, fontWeight: 600 } }, post.comments)
              ),
              React.createElement('button', {
                style: { background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', gap: 5, color: t.textMuted, marginLeft: 'auto' }
              },
                React.createElement(window.lucide.Share2, { size: 16 }),
                React.createElement('span', { style: { fontSize: 12, fontWeight: 600 } }, "Share")
              )
            )
          )
        )
      )
    )
  );
}

// ─── PROFILE SCREEN ────────────────────────────────────────────────────────
function ProfileScreen({ t, darkMode, setDarkMode }) {
  const [activeTab, setActiveTab] = useState('trails');

  const trails = [
    { name: 'Egg Mastery', progress: 50, unlocked: 3, total: 6, color: t.primary, icon: 'ChefHat' },
    { name: 'Sauce Sorcery', progress: 80, unlocked: 4, total: 5, color: '#F97316', icon: 'Sparkles' },
    { name: 'Fermentation', progress: 20, unlocked: 1, total: 8, color: '#8B5CF6', icon: 'FlaskConical' },
    { name: 'Fire & Smoke', progress: 60, unlocked: 3, total: 5, color: '#EF4444', icon: 'Flame' },
  ];

  const achievements = [
    { icon: 'Trophy', label: 'First Crew Win', date: 'Mar 28', color: '#F59E0B' },
    { icon: 'Star', label: '5-Day Streak', date: 'Apr 1', color: '#F97316' },
    { icon: 'Zap', label: 'Speed Poacher', date: 'Apr 3', color: t.primary },
    { icon: 'Heart', label: '50 Likes', date: 'Apr 4', color: '#EC4899' },
    { icon: 'Map', label: 'Trail Blazer', date: 'Apr 4', color: '#8B5CF6' },
    { icon: 'Users', label: '3 Crews Joined', date: 'Apr 5', color: '#06B6D4' },
  ];

  const recentIngredients = ['Miso', 'Avocado', 'Truffle Oil', 'Sumac', 'Mirin', 'Tahini'];

  return React.createElement('div', {
    className: 'screen-fade',
    style: { height: '100%', overflowY: 'auto', background: t.bg }
  },
    // Profile header
    React.createElement('div', {
      style: {
        background: `linear-gradient(160deg, ${t.primary}33 0%, transparent 60%)`,
        padding: '24px 20px 16px', position: 'relative',
      }
    },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' } },
        React.createElement('div', { style: { display: 'flex', gap: 14, alignItems: 'center' } },
          React.createElement('div', { style: { position: 'relative' } },
            React.createElement('div', {
              style: {
                width: 72, height: 72, borderRadius: 22, background: `linear-gradient(135deg, ${t.primary}, #8B5CF6)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 26, fontWeight: 800,
                boxShadow: `0 8px 20px ${t.primary}44`,
              }
            }, "J"),
            React.createElement('div', {
              style: {
                position: 'absolute', bottom: -2, right: -2, width: 22, height: 22, borderRadius: '50%',
                background: t.cta, border: `2px solid ${t.bg}`, display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontSize: 11, fontWeight: 800
              }
            }, "14")
          ),
          React.createElement('div', null,
            React.createElement('h2', { style: { color: t.textPrimary, fontSize: 18, fontWeight: 800, margin: 0 } }, "Jamie Chen"),
            React.createElement('div', { style: { color: t.textMuted, fontSize: 12, marginTop: 2 } }, "@jamie_flavorquest"),
            React.createElement('div', {
              style: { display: 'flex', gap: 6, marginTop: 6, flexWrap: 'wrap' }
            },
              React.createElement('span', {
                style: { background: t.primary + '22', color: t.primary, fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 10 }
              }, "Level 14"),
              React.createElement('span', {
                style: { background: t.cta + '22', color: t.cta, fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 10 }
              }, "⚡ 5-day streak"),
            )
          )
        ),
        React.createElement('button', {
          onClick: () => setDarkMode(!darkMode),
          className: 'btn-press',
          style: { background: t.card, border: `1px solid ${t.border}`, borderRadius: 10, padding: 8, cursor: 'pointer', color: t.textSecondary }
        }, React.createElement(darkMode ? window.lucide.Sun : window.lucide.Moon, { size: 18 }))
      ),

      // Stats
      React.createElement('div', {
        style: {
          display: 'flex', gap: 0, marginTop: 18, background: t.card, borderRadius: 14,
          border: `1px solid ${t.border}`, overflow: 'hidden'
        }
      },
        [
          { value: '2,840', label: 'Discovery Score', color: '#FFD700' },
          { value: '12', label: 'Trails Done', color: t.primary },
          { value: '47', label: 'Recipes', color: '#F97316' },
        ].map((s, i) =>
          React.createElement('div', {
            key: i,
            style: {
              flex: 1, padding: '10px 8px', textAlign: 'center',
              borderRight: i < 2 ? `1px solid ${t.border}` : 'none',
            }
          },
            React.createElement('div', { style: { color: s.color, fontSize: 16, fontWeight: 800 } }, s.value),
            React.createElement('div', { style: { color: t.textMuted, fontSize: 9, fontWeight: 600, letterSpacing: 0.3, marginTop: 1 } }, s.label.toUpperCase())
          )
        )
      )
    ),

    React.createElement('div', { style: { padding: '8px 16px 100px' } },
      // Tabs
      React.createElement('div', { style: { display: 'flex', gap: 6, marginBottom: 16 } },
        [
          { id: 'trails', label: 'Trails', icon: 'Map' },
          { id: 'achievements', label: 'Awards', icon: 'Trophy' },
          { id: 'pantry', label: 'Pantry', icon: 'Package' },
        ].map(tab =>
          React.createElement('button', {
            key: tab.id, onClick: () => setActiveTab(tab.id),
            className: 'btn-press',
            style: {
              flex: 1, padding: '9px 6px', borderRadius: 10, border: `1px solid ${activeTab === tab.id ? t.primary : t.border}`,
              background: activeTab === tab.id ? t.primary : 'transparent',
              color: activeTab === tab.id ? '#fff' : t.textMuted,
              fontSize: 11, fontWeight: 700, cursor: 'pointer', fontFamily: "'Plus Jakarta Sans', sans-serif",
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4,
              transition: 'all 0.2s ease',
            }
          },
            React.createElement(window.lucide[tab.icon], { size: 12 }),
            tab.label
          )
        )
      ),

      activeTab === 'trails' && React.createElement('div', null,
        trails.map((trail, i) =>
          React.createElement('div', {
            key: trail.name,
            className: 'card-hover',
            style: {
              background: t.card, borderRadius: 16, padding: '14px', marginBottom: 10,
              border: `1px solid ${t.border}`, animation: `fadeIn 0.3s ease ${i * 0.08}s both`
            }
          },
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 } },
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10 } },
                React.createElement('div', {
                  style: {
                    width: 36, height: 36, borderRadius: 10, background: trail.color + '22',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: trail.color,
                  }
                }, React.createElement(window.lucide[trail.icon], { size: 16 })),
                React.createElement('div', null,
                  React.createElement('div', { style: { color: t.textPrimary, fontSize: 13, fontWeight: 700 } }, trail.name),
                  React.createElement('div', { style: { color: t.textMuted, fontSize: 11, marginTop: 1 } }, `${trail.unlocked}/${trail.total} techniques`)
                )
              ),
              React.createElement('span', { style: { color: trail.color, fontSize: 14, fontWeight: 800 } }, `${trail.progress}%`)
            ),
            React.createElement('div', { style: { background: t.border, borderRadius: 100, height: 6, overflow: 'hidden' } },
              React.createElement('div', {
                style: {
                  width: `${trail.progress}%`, height: '100%', borderRadius: 100,
                  background: `linear-gradient(90deg, ${trail.color}, ${trail.color}88)`,
                  boxShadow: `0 0 8px ${trail.color}55`,
                  transition: 'width 0.6s ease',
                }
              })
            )
          )
        )
      ),

      activeTab === 'achievements' && React.createElement('div', {
        style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }
      },
        achievements.map((a, i) =>
          React.createElement('div', {
            key: i,
            className: 'card-hover',
            style: {
              background: t.card, borderRadius: 16, padding: 14, border: `1px solid ${t.border}`,
              textAlign: 'center', animation: `popIn 0.4s ease ${i * 0.07}s both`
            }
          },
            React.createElement('div', {
              style: {
                width: 44, height: 44, borderRadius: 14, background: a.color + '22',
                display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px', color: a.color,
              }
            }, React.createElement(window.lucide[a.icon], { size: 20 })),
            React.createElement('div', { style: { color: t.textPrimary, fontSize: 11, fontWeight: 700 } }, a.label),
            React.createElement('div', { style: { color: t.textMuted, fontSize: 9, marginTop: 3 } }, a.date)
          )
        )
      ),

      activeTab === 'pantry' && React.createElement('div', null,
        React.createElement('div', {
          style: { background: t.card, borderRadius: 16, padding: 16, marginBottom: 12, border: `1px solid ${t.border}` }
        },
          React.createElement('div', { style: { color: t.textPrimary, fontSize: 14, fontWeight: 700, marginBottom: 10 } }, "🔓 Unlocked Ingredients"),
          React.createElement('div', { style: { display: 'flex', flexWrap: 'wrap', gap: 8 } },
            recentIngredients.map((ing, i) =>
              React.createElement('span', {
                key: i,
                style: {
                  background: `linear-gradient(135deg, ${t.primary}22, ${t.secondary}11)`,
                  border: `1px solid ${t.primary}44`, color: t.primary,
                  fontSize: 12, fontWeight: 600, padding: '6px 12px', borderRadius: 20,
                  animation: `popIn 0.3s ease ${i * 0.06}s both`
                }
              }, ing)
            )
          )
        ),
        React.createElement('div', {
          style: {
            background: `linear-gradient(135deg, ${t.cta}22, #F43F5E11)`,
            border: `1px solid ${t.cta}33`, borderRadius: 16, padding: 16
          }
        },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 } },
            React.createElement(window.lucide.Lock, { size: 16, color: t.cta }),
            React.createElement('span', { style: { color: t.textPrimary, fontSize: 13, fontWeight: 700 } }, "Next Unlock: Koji"),
          ),
          React.createElement('p', { style: { color: t.textMuted, fontSize: 11, margin: '0 0 10px', lineHeight: 1.5 } },
            "Complete 2 more Fermentation Trail challenges to unlock Koji — a secret umami powerhouse."
          ),
          React.createElement('div', { style: { background: t.border, borderRadius: 100, height: 6, overflow: 'hidden' } },
            React.createElement('div', { style: { width: '40%', height: '100%', background: t.cta, borderRadius: 100 } })
          ),
          React.createElement('div', { style: { color: t.textMuted, fontSize: 10, marginTop: 5 } }, "2 of 5 challenges done")
        )
      )
    )
  );
}
