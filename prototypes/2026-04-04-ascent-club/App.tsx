const { useState, useEffect, useRef } = React;

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [darkMode, setDarkMode] = useState(false);
  const [activeAscent, setActiveAscent] = useState(null);
  const [spotModal, setSpotModal] = useState(null);

  const themes = {
    light: {
      bg: '#F8F6F1',
      surface: '#FFFFFF',
      surfaceAlt: '#F0EDE6',
      text: '#1A1A1A',
      textSecondary: '#5C5C5C',
      textMuted: '#9A9A9A',
      primary: '#1E4D2B',
      primaryLight: '#2A6B3C',
      accent: '#B87333',
      accentLight: '#D4946A',
      border: '#E0DBD0',
      navBg: '#FFFFFF',
      cardShadow: '0 2px 12px rgba(0,0,0,0.08)',
    },
    dark: {
      bg: '#0F1A12',
      surface: '#1A2E1F',
      surfaceAlt: '#243429',
      text: '#F0EDE6',
      textSecondary: '#A8B8AC',
      textMuted: '#6A7D6F',
      primary: '#4A9E63',
      primaryLight: '#5DB876',
      accent: '#C8854A',
      accentLight: '#D4946A',
      border: '#2E4533',
      navBg: '#1A2E1F',
      cardShadow: '0 2px 12px rgba(0,0,0,0.3)',
    }
  };

  const t = darkMode ? themes.dark : themes.light;

  const fontStyle = `
    @import url('https://fonts.googleapis.com/css2?family=Archivo+Black&family=Archivo:wght@300;400;500;600&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    ::-webkit-scrollbar { display: none; }
  `;

  const tabs = [
    { id: 'home', label: 'Home', icon: window.lucide.Home },
    { id: 'discover', label: 'Discover', icon: window.lucide.Compass },
    { id: 'community', label: 'Crews', icon: window.lucide.Users },
    { id: 'dashboard', label: 'Peaks', icon: window.lucide.BarChart2 },
    { id: 'settings', label: 'Profile', icon: window.lucide.User },
  ];

  // ─── HOME SCREEN ──────────────────────────────────────────────
  function HomeScreen() {
    const [pressed, setPressed] = useState(null);

    const ascents = [
      {
        id: 1,
        title: 'Debt-Free Summit',
        emoji: '🏔',
        progress: 62,
        target: 24000,
        current: 14880,
        milestones: [
          { id: 1, label: 'Emergency Fund Built', done: true, spots: 4 },
          { id: 2, label: 'Credit Card #1 Cleared', done: true, spots: 7 },
          { id: 3, label: 'Student Loan Phase 1', done: false, spots: 12, active: true },
          { id: 4, label: 'Car Loan Payoff', done: false, spots: 2 },
          { id: 5, label: 'Final Summit — Zero Debt', done: false, spots: 0 },
        ]
      },
      {
        id: 2,
        title: 'Dream Home Deposit',
        emoji: '🏡',
        progress: 31,
        target: 60000,
        current: 18600,
        milestones: [
          { id: 1, label: 'Save First $5k', done: true, spots: 3 },
          { id: 2, label: 'Open HYSA Account', done: true, spots: 1 },
          { id: 3, label: 'Reach $20k Milestone', done: false, spots: 5, active: true },
          { id: 4, label: 'Halfway There — $30k', done: false, spots: 0 },
        ]
      }
    ];

    return React.createElement('div', { style: { flex: 1, overflowY: 'auto', background: t.bg } },

      // Full-bleed header
      React.createElement('div', {
        style: {
          background: `linear-gradient(180deg, ${t.primary} 0%, ${t.primaryLight} 100%)`,
          padding: '20px 20px 32px',
          position: 'relative',
          overflow: 'hidden',
        }
      },
        // Topographic texture lines
        React.createElement('div', {
          style: {
            position: 'absolute', inset: 0, opacity: 0.08,
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 18px, rgba(255,255,255,0.4) 18px, rgba(255,255,255,0.4) 19px)`,
          }
        }),
        React.createElement('div', { style: { position: 'relative' } },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 } },
            React.createElement('div', null,
              React.createElement('p', { style: { color: 'rgba(255,255,255,0.65)', fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', fontFamily: 'Archivo, sans-serif', fontWeight: 500 } }, 'Saturday, April 4'),
              React.createElement('h1', { style: { color: '#FFFFFF', fontFamily: 'Archivo Black, sans-serif', fontSize: 22, marginTop: 2 } }, 'Your Ascents'),
            ),
            React.createElement('div', {
              style: {
                width: 40, height: 40, borderRadius: '50%',
                background: t.accent, display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: '2px solid rgba(255,255,255,0.3)',
                fontFamily: 'Archivo Black, sans-serif', color: '#fff', fontSize: 15,
              }
            }, 'JM'),
          ),

          // Quick stats row
          React.createElement('div', { style: { display: 'flex', gap: 10 } },
            [
              { label: 'Active Ascents', val: '2' },
              { label: 'Milestones Done', val: '4' },
              { label: 'Spots Received', val: '27' },
            ].map((stat, i) =>
              React.createElement('div', {
                key: i,
                style: {
                  flex: 1, background: 'rgba(255,255,255,0.12)',
                  borderRadius: 10, padding: '10px 8px', textAlign: 'center',
                  border: '1px solid rgba(255,255,255,0.15)',
                }
              },
                React.createElement('div', { style: { color: '#FFFFFF', fontFamily: 'Archivo Black, sans-serif', fontSize: 18 } }, stat.val),
                React.createElement('div', { style: { color: 'rgba(255,255,255,0.6)', fontSize: 10, letterSpacing: 1, textTransform: 'uppercase', fontFamily: 'Archivo, sans-serif', marginTop: 2 } }, stat.label),
              )
            )
          ),
        )
      ),

      // Ascent cards
      React.createElement('div', { style: { padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: 16 } },

        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 } },
          React.createElement('h2', { style: { fontFamily: 'Archivo Black, sans-serif', fontSize: 16, color: t.text } }, 'Current Climbs'),
          React.createElement('button', {
            style: {
              background: t.accent, color: '#fff', border: 'none',
              borderRadius: 20, padding: '6px 14px',
              fontFamily: 'Archivo Black, sans-serif', fontSize: 11,
              letterSpacing: 1, cursor: 'pointer',
            }
          }, '+ NEW'),
        ),

        ...ascents.map(ascent =>
          React.createElement('div', {
            key: ascent.id,
            style: {
              background: t.surface, borderRadius: 16,
              overflow: 'hidden', boxShadow: t.cardShadow,
              border: `1px solid ${t.border}`,
              cursor: 'pointer',
              transform: pressed === ascent.id ? 'scale(0.98)' : 'scale(1)',
              transition: 'transform 0.1s ease',
            },
            onMouseDown: () => setPressed(ascent.id),
            onMouseUp: () => { setPressed(null); setActiveAscent(ascent); setActiveTab('detail'); },
            onTouchStart: () => setPressed(ascent.id),
            onTouchEnd: () => { setPressed(null); setActiveAscent(ascent); setActiveTab('detail'); },
          },
            // Top stripe
            React.createElement('div', {
              style: {
                background: `linear-gradient(135deg, ${t.primary}, ${t.primaryLight})`,
                padding: '14px 16px 14px',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              }
            },
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10 } },
                React.createElement('span', { style: { fontSize: 22 } }, ascent.emoji),
                React.createElement('div', null,
                  React.createElement('h3', { style: { color: '#fff', fontFamily: 'Archivo Black, sans-serif', fontSize: 15 } }, ascent.title),
                  React.createElement('p', { style: { color: 'rgba(255,255,255,0.65)', fontSize: 11, fontFamily: 'Archivo, sans-serif' } },
                    `$${ascent.current.toLocaleString()} of $${ascent.target.toLocaleString()}`
                  ),
                ),
              ),
              React.createElement('div', {
                style: {
                  width: 44, height: 44, borderRadius: '50%',
                  border: '3px solid rgba(255,255,255,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'rgba(255,255,255,0.12)',
                }
              },
                React.createElement('span', { style: { color: '#fff', fontFamily: 'Archivo Black, sans-serif', fontSize: 13 } }, `${ascent.progress}%`),
              ),
            ),

            // Progress bar
            React.createElement('div', { style: { height: 4, background: t.border } },
              React.createElement('div', { style: { height: '100%', width: `${ascent.progress}%`, background: t.accent, transition: 'width 0.4s ease' } })
            ),

            // Milestones
            React.createElement('div', { style: { padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 8 } },
              ascent.milestones.slice(0, 3).map(m =>
                React.createElement('div', {
                  key: m.id,
                  style: {
                    display: 'flex', alignItems: 'center', gap: 10,
                    opacity: m.done ? 0.5 : 1,
                  }
                },
                  React.createElement('div', {
                    style: {
                      width: 20, height: 20, borderRadius: '50%', flexShrink: 0,
                      background: m.done ? t.primary : m.active ? t.accent : t.border,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }
                  },
                    m.done
                      ? React.createElement(window.lucide.Check, { size: 11, color: '#fff', strokeWidth: 3 })
                      : m.active
                        ? React.createElement('div', { style: { width: 7, height: 7, borderRadius: '50%', background: '#fff' } })
                        : null
                  ),
                  React.createElement('span', {
                    style: {
                      flex: 1, fontFamily: 'Archivo, sans-serif', fontSize: 13,
                      color: t.text, fontWeight: m.active ? 600 : 400,
                      textDecoration: m.done ? 'line-through' : 'none',
                    }
                  }, m.label),
                  m.spots > 0 && React.createElement('div', {
                    style: {
                      display: 'flex', alignItems: 'center', gap: 3,
                      color: t.accent, fontSize: 11, fontFamily: 'Archivo, sans-serif',
                    }
                  },
                    React.createElement(window.lucide.MessageCircle, { size: 11, color: t.accent }),
                    m.spots,
                  ),
                )
              ),
              ascent.milestones.length > 3 && React.createElement('p', {
                style: { color: t.textMuted, fontSize: 11, fontFamily: 'Archivo, sans-serif', marginTop: 2 }
              }, `+${ascent.milestones.length - 3} more milestones`),
            ),
          )
        ),

        // Recent activity feed
        React.createElement('div', { style: { marginTop: 8 } },
          React.createElement('h2', { style: { fontFamily: 'Archivo Black, sans-serif', fontSize: 16, color: t.text, marginBottom: 12 } }, 'Recent Spots'),
          ...[
            { user: 'Priya M.', action: 'spotted your Student Loan milestone', time: '2h ago', avatar: 'PM', color: '#7B5EA7' },
            { user: 'Carlos T.', action: 'shared a strategy on your Debt-Free Summit', time: '5h ago', avatar: 'CT', color: '#2A6B8A' },
            { user: 'Asha K.', action: 'mirrored your Debt-Free plan', time: '1d ago', avatar: 'AK', color: '#6B8A2A' },
          ].map((item, i) =>
            React.createElement('div', {
              key: i,
              style: {
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '10px 0',
                borderBottom: i < 2 ? `1px solid ${t.border}` : 'none',
              }
            },
              React.createElement('div', {
                style: {
                  width: 36, height: 36, borderRadius: '50%',
                  background: item.color, color: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'Archivo Black, sans-serif', fontSize: 12, flexShrink: 0,
                }
              }, item.avatar),
              React.createElement('div', { style: { flex: 1 } },
                React.createElement('p', { style: { fontFamily: 'Archivo, sans-serif', fontSize: 13, color: t.text } },
                  React.createElement('strong', null, item.user), ` ${item.action}`
                ),
              ),
              React.createElement('span', { style: { color: t.textMuted, fontSize: 11, fontFamily: 'Archivo, sans-serif', flexShrink: 0 } }, item.time),
            )
          ),
        ),

      )
    );
  }

  // ─── ASCENT DETAIL SCREEN ─────────────────────────────────────
  function DetailScreen() {
    const ascent = activeAscent || {
      id: 1, title: 'Debt-Free Summit', emoji: '🏔', progress: 62,
      target: 24000, current: 14880,
      milestones: [
        { id: 1, label: 'Emergency Fund Built', done: true, spots: 4 },
        { id: 2, label: 'Credit Card #1 Cleared', done: true, spots: 7 },
        { id: 3, label: 'Student Loan Phase 1', done: false, spots: 12, active: true },
        { id: 4, label: 'Car Loan Payoff', done: false, spots: 2 },
        { id: 5, label: 'Final Summit — Zero Debt', done: false, spots: 0 },
      ]
    };

    const spotDetails = {
      user: 'Priya M.', avatar: 'PM', color: '#7B5EA7', time: '2h ago',
      text: 'Try the avalanche method — I knocked out $8k in 6 months attacking the highest interest rate first. Changed everything for me!',
    };

    return React.createElement('div', { style: { flex: 1, overflowY: 'auto', background: t.bg } },

      // Full-bleed hero
      React.createElement('div', {
        style: {
          background: `linear-gradient(160deg, #0D3320 0%, ${t.primary} 60%, ${t.accent} 100%)`,
          padding: '16px 16px 40px',
          position: 'relative', overflow: 'hidden',
        }
      },
        React.createElement('div', {
          style: {
            position: 'absolute', bottom: -30, right: -20, fontSize: 120, opacity: 0.12,
            fontFamily: 'sans-serif', lineHeight: 1,
          }
        }, '🏔'),
        React.createElement('div', { style: { position: 'relative' } },
          React.createElement('button', {
            onClick: () => setActiveTab('home'),
            style: {
              background: 'rgba(255,255,255,0.15)', border: 'none',
              borderRadius: 20, padding: '6px 12px', color: '#fff',
              display: 'flex', alignItems: 'center', gap: 6,
              fontFamily: 'Archivo, sans-serif', fontSize: 13, cursor: 'pointer',
              marginBottom: 20,
            }
          },
            React.createElement(window.lucide.ChevronLeft, { size: 16, color: '#fff' }),
            'Back',
          ),
          React.createElement('h1', { style: { color: '#fff', fontFamily: 'Archivo Black, sans-serif', fontSize: 26, lineHeight: 1.1, marginBottom: 6 } }, ascent.title),
          React.createElement('p', { style: { color: 'rgba(255,255,255,0.6)', fontFamily: 'Archivo, sans-serif', fontSize: 13 } }, 'Personal Ascent · Started Jan 2025'),

          React.createElement('div', { style: { display: 'flex', gap: 12, marginTop: 20 } },
            React.createElement('div', {
              style: {
                flex: 1, background: 'rgba(255,255,255,0.12)',
                borderRadius: 12, padding: 14,
                border: '1px solid rgba(255,255,255,0.15)',
              }
            },
              React.createElement('div', { style: { color: '#fff', fontFamily: 'Archivo Black, sans-serif', fontSize: 22 } }, `$${ascent.current.toLocaleString()}`),
              React.createElement('div', { style: { color: 'rgba(255,255,255,0.55)', fontSize: 11, fontFamily: 'Archivo, sans-serif', marginTop: 2 } }, 'CLEARED'),
            ),
            React.createElement('div', {
              style: {
                flex: 1, background: 'rgba(255,255,255,0.12)',
                borderRadius: 12, padding: 14,
                border: '1px solid rgba(255,255,255,0.15)',
              }
            },
              React.createElement('div', { style: { color: '#fff', fontFamily: 'Archivo Black, sans-serif', fontSize: 22 } }, `$${(ascent.target - ascent.current).toLocaleString()}`),
              React.createElement('div', { style: { color: 'rgba(255,255,255,0.55)', fontSize: 11, fontFamily: 'Archivo, sans-serif', marginTop: 2 } }, 'REMAINING'),
            ),
            React.createElement('div', {
              style: {
                flex: 1, background: 'rgba(255,255,255,0.12)',
                borderRadius: 12, padding: 14,
                border: '1px solid rgba(255,255,255,0.15)',
              }
            },
              React.createElement('div', { style: { color: '#fff', fontFamily: 'Archivo Black, sans-serif', fontSize: 22 } }, `${ascent.progress}%`),
              React.createElement('div', { style: { color: 'rgba(255,255,255,0.55)', fontSize: 11, fontFamily: 'Archivo, sans-serif', marginTop: 2 } }, 'COMPLETE'),
            ),
          ),
        )
      ),

      React.createElement('div', { style: { padding: '20px 16px' } },

        // Milestones
        React.createElement('h2', { style: { fontFamily: 'Archivo Black, sans-serif', fontSize: 16, color: t.text, marginBottom: 16 } }, 'Milestone Path'),

        React.createElement('div', { style: { position: 'relative' } },
          // Vertical line
          React.createElement('div', {
            style: {
              position: 'absolute', left: 17, top: 20, bottom: 20, width: 2,
              background: `linear-gradient(${t.primary}, ${t.border})`,
            }
          }),

          React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 0 } },
            ascent.milestones.map((m, i) =>
              React.createElement('div', {
                key: m.id,
                style: { display: 'flex', gap: 14, marginBottom: 16, position: 'relative' }
              },
                // Node
                React.createElement('div', {
                  style: {
                    width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
                    background: m.done ? t.primary : m.active ? t.accent : t.surfaceAlt,
                    border: m.active ? `3px solid ${t.accent}` : `2px solid ${m.done ? t.primary : t.border}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    zIndex: 1,
                    boxShadow: m.active ? `0 0 0 4px ${t.accent}22` : 'none',
                  }
                },
                  m.done
                    ? React.createElement(window.lucide.Check, { size: 16, color: '#fff', strokeWidth: 3 })
                    : React.createElement('span', { style: { color: m.active ? '#fff' : t.textMuted, fontFamily: 'Archivo Black, sans-serif', fontSize: 11 } }, i + 1),
                ),

                // Content
                React.createElement('div', {
                  style: {
                    flex: 1, background: t.surface, borderRadius: 12,
                    padding: '12px 14px', border: m.active ? `1px solid ${t.accent}55` : `1px solid ${t.border}`,
                    boxShadow: m.active ? `0 4px 16px ${t.accent}22` : t.cardShadow,
                  }
                },
                  React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' } },
                    React.createElement('h4', {
                      style: {
                        fontFamily: 'Archivo, sans-serif', fontWeight: 600, fontSize: 14, color: t.text,
                        textDecoration: m.done ? 'line-through' : 'none',
                        opacity: m.done ? 0.5 : 1,
                      }
                    }, m.label),
                    m.active && React.createElement('span', {
                      style: {
                        background: t.accent, color: '#fff', fontSize: 10,
                        fontFamily: 'Archivo Black, sans-serif', letterSpacing: 1,
                        padding: '2px 8px', borderRadius: 10,
                      }
                    }, 'ACTIVE'),
                  ),
                  React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12, marginTop: 8 } },
                    m.spots > 0 && React.createElement('button', {
                      onClick: () => setSpotModal(m),
                      style: {
                        display: 'flex', alignItems: 'center', gap: 5,
                        color: t.accent, fontSize: 12, fontFamily: 'Archivo, sans-serif',
                        background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                      }
                    },
                      React.createElement(window.lucide.MessageCircle, { size: 13, color: t.accent }),
                      `${m.spots} spots`,
                    ),
                    m.active && React.createElement('button', {
                      style: {
                        display: 'flex', alignItems: 'center', gap: 5,
                        color: t.primary, fontSize: 12, fontFamily: 'Archivo, sans-serif',
                        background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                        fontWeight: 600,
                      }
                    },
                      React.createElement(window.lucide.Plus, { size: 13, color: t.primary }),
                      'Update progress',
                    ),
                  ),
                ),
              )
            )
          ),
        ),
      ),

      // Spot modal
      spotModal && React.createElement('div', {
        style: {
          position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)',
          display: 'flex', alignItems: 'flex-end', zIndex: 100,
        },
        onClick: () => setSpotModal(null),
      },
        React.createElement('div', {
          style: {
            background: t.surface, borderRadius: '20px 20px 0 0',
            padding: 20, width: '100%',
          },
          onClick: e => e.stopPropagation(),
        },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 } },
            React.createElement('h3', { style: { fontFamily: 'Archivo Black, sans-serif', fontSize: 16, color: t.text } }, 'Spots'),
            React.createElement('button', {
              onClick: () => setSpotModal(null),
              style: { background: 'none', border: 'none', cursor: 'pointer' }
            }, React.createElement(window.lucide.X, { size: 20, color: t.textMuted })),
          ),
          React.createElement('div', { style: { fontFamily: 'Archivo, sans-serif', fontSize: 13, color: t.textSecondary, marginBottom: 16 } },
            `${spotModal.spots} climbers spotted this milestone`
          ),
          React.createElement('div', {
            style: {
              background: t.surfaceAlt, borderRadius: 12, padding: 14,
              borderLeft: `3px solid ${t.accent}`,
            }
          },
            React.createElement('div', { style: { display: 'flex', gap: 10, marginBottom: 8 } },
              React.createElement('div', {
                style: {
                  width: 32, height: 32, borderRadius: '50%',
                  background: spotDetails.color, color: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'Archivo Black, sans-serif', fontSize: 11, flexShrink: 0,
                }
              }, spotDetails.avatar),
              React.createElement('div', null,
                React.createElement('div', { style: { fontFamily: 'Archivo, sans-serif', fontWeight: 600, fontSize: 13, color: t.text } }, spotDetails.user),
                React.createElement('div', { style: { color: t.textMuted, fontSize: 11 } }, spotDetails.time),
              ),
            ),
            React.createElement('p', { style: { fontFamily: 'Archivo, sans-serif', fontSize: 13, color: t.text, lineHeight: 1.5 } }, spotDetails.text),
          ),
          React.createElement('button', {
            style: {
              width: '100%', background: t.primary, border: 'none',
              borderRadius: 12, padding: 14, color: '#fff',
              fontFamily: 'Archivo Black, sans-serif', fontSize: 14,
              letterSpacing: 1, cursor: 'pointer', marginTop: 14,
            }
          }, 'SPOT THIS MILESTONE'),
        )
      ),
    );
  }

  // ─── DISCOVER SCREEN ──────────────────────────────────────────
  function DiscoverScreen() {
    const [filter, setFilter] = useState('All');
    const filters = ['All', 'Debt', 'Savings', 'Investing', 'Housing'];

    const ascents = [
      { id: 1, user: 'Nadia R.', avatar: 'NR', color: '#8A4F2A', title: 'First Investment Portfolio', tag: 'Investing', progress: 78, mirrors: 234, emoji: '📈' },
      { id: 2, user: 'Tom & Sarah K.', avatar: 'TK', color: '#2A5F8A', title: 'Down Payment by Dec 2025', tag: 'Housing', progress: 55, mirrors: 412, emoji: '🏠' },
      { id: 3, user: 'Devin L.', avatar: 'DL', color: '#4A2A8A', title: '6-Month Emergency Buffer', tag: 'Savings', progress: 91, mirrors: 187, emoji: '🛡' },
      { id: 4, user: 'Rosa M.', avatar: 'RM', color: '#8A2A4A', title: 'Debt Avalanche Comeback', tag: 'Debt', progress: 44, mirrors: 89, emoji: '🌊' },
      { id: 5, user: 'Kwame A.', avatar: 'KA', color: '#2A8A5F', title: 'FIRE at 40 Journey', tag: 'Investing', progress: 23, mirrors: 671, emoji: '🔥' },
    ];

    return React.createElement('div', { style: { flex: 1, overflowY: 'auto', background: t.bg } },

      React.createElement('div', { style: { padding: '16px 16px 12px', background: t.surface, borderBottom: `1px solid ${t.border}` } },
        React.createElement('h1', { style: { fontFamily: 'Archivo Black, sans-serif', fontSize: 22, color: t.text, marginBottom: 12 } }, 'Discover Ascents'),
        // Search
        React.createElement('div', {
          style: {
            display: 'flex', alignItems: 'center', gap: 10,
            background: t.surfaceAlt, borderRadius: 10, padding: '10px 14px',
            border: `1px solid ${t.border}`,
          }
        },
          React.createElement(window.lucide.Search, { size: 16, color: t.textMuted }),
          React.createElement('span', { style: { fontFamily: 'Archivo, sans-serif', fontSize: 14, color: t.textMuted } }, 'Search ascents, strategies…'),
        ),
      ),

      // Filters
      React.createElement('div', {
        style: {
          display: 'flex', gap: 8, padding: '12px 16px',
          overflowX: 'auto', background: t.surface, borderBottom: `1px solid ${t.border}`,
        }
      },
        filters.map(f =>
          React.createElement('button', {
            key: f,
            onClick: () => setFilter(f),
            style: {
              flexShrink: 0, padding: '6px 14px', borderRadius: 20,
              border: `1px solid ${filter === f ? t.primary : t.border}`,
              background: filter === f ? t.primary : 'transparent',
              color: filter === f ? '#fff' : t.textSecondary,
              fontFamily: 'Archivo, sans-serif', fontWeight: filter === f ? 600 : 400,
              fontSize: 13, cursor: 'pointer',
            }
          }, f)
        )
      ),

      React.createElement('div', { style: { padding: '16px' } },
        React.createElement('p', { style: { fontFamily: 'Archivo, sans-serif', fontSize: 12, color: t.textMuted, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 14 } },
          'Trending This Week'
        ),

        React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 12 } },
          ascents.map(a =>
            React.createElement('div', {
              key: a.id,
              style: {
                background: t.surface, borderRadius: 14,
                border: `1px solid ${t.border}`,
                overflow: 'hidden', boxShadow: t.cardShadow,
              }
            },
              React.createElement('div', { style: { padding: '14px 14px 12px', display: 'flex', gap: 12 } },
                React.createElement('div', {
                  style: {
                    width: 44, height: 44, borderRadius: 12,
                    background: `${t.primary}18`, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 22, flexShrink: 0,
                  }
                }, a.emoji),
                React.createElement('div', { style: { flex: 1 } },
                  React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' } },
                    React.createElement('div', null,
                      React.createElement('h3', { style: { fontFamily: 'Archivo Black, sans-serif', fontSize: 14, color: t.text } }, a.title),
                      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 } },
                        React.createElement('div', {
                          style: {
                            width: 20, height: 20, borderRadius: '50%',
                            background: a.color, color: '#fff',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontFamily: 'Archivo Black, sans-serif', fontSize: 8,
                          }
                        }, a.avatar),
                        React.createElement('span', { style: { fontFamily: 'Archivo, sans-serif', fontSize: 12, color: t.textSecondary } }, a.user),
                      ),
                    ),
                    React.createElement('span', {
                      style: {
                        background: `${t.primary}18`, color: t.primary,
                        fontSize: 10, fontFamily: 'Archivo Black, sans-serif',
                        letterSpacing: 0.5, padding: '3px 8px', borderRadius: 10,
                      }
                    }, a.tag),
                  ),
                ),
              ),
              React.createElement('div', { style: { padding: '0 14px 14px' } },
                React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 } },
                  React.createElement('span', { style: { fontFamily: 'Archivo, sans-serif', fontSize: 12, color: t.textMuted } }, `${a.progress}% complete`),
                  React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4, color: t.textSecondary, fontSize: 12 } },
                    React.createElement(window.lucide.Copy, { size: 12, color: t.textMuted }),
                    React.createElement('span', { style: { fontFamily: 'Archivo, sans-serif' } }, `${a.mirrors} mirrored`),
                  ),
                ),
                React.createElement('div', { style: { height: 4, background: t.border, borderRadius: 4 } },
                  React.createElement('div', { style: { height: '100%', width: `${a.progress}%`, background: t.accent, borderRadius: 4 } })
                ),
                React.createElement('button', {
                  style: {
                    width: '100%', marginTop: 12, padding: '10px',
                    border: `1.5px solid ${t.primary}`, borderRadius: 10,
                    background: 'transparent', color: t.primary,
                    fontFamily: 'Archivo Black, sans-serif', fontSize: 12,
                    letterSpacing: 1, cursor: 'pointer',
                  }
                }, 'MIRROR THIS ASCENT'),
              ),
            )
          )
        ),
      ),
    );
  }

  // ─── COMMUNITY SCREEN ─────────────────────────────────────────
  function CommunityScreen() {
    const [activeCrew, setActiveCrew] = useState(null);

    const crews = [
      { id: 1, name: 'First-Time Home Buyers', members: 1247, active: 89, tag: 'Housing', emoji: '🏠', joined: true },
      { id: 2, name: 'Debt Destroyers', members: 3412, active: 214, tag: 'Debt', emoji: '⚔️', joined: true },
      { id: 3, name: 'Investment Peak Pioneers', members: 892, active: 67, tag: 'Investing', emoji: '📊', joined: false },
      { id: 4, name: '6-Figure Savings Crew', members: 2105, active: 134, tag: 'Savings', emoji: '💰', joined: false },
      { id: 5, name: 'FIRE Movement Base Camp', members: 4891, active: 302, tag: 'FIRE', emoji: '🔥', joined: false },
    ];

    const posts = [
      { user: 'Maya T.', avatar: 'MT', color: '#7B4EA0', time: '1h ago', crew: 'First-Time Home Buyers', text: 'Locked in our rate at 6.4%! After 18 months of saving, we actually did it. The milestone spotting from this crew was everything 🙏', likes: 48, spots: 12 },
      { user: 'Raj S.', avatar: 'RS', color: '#2A7B6F', time: '3h ago', crew: 'Debt Destroyers', text: 'Month 4 update: knocked out $3,200 this month using the avalanche method. Sharing my spreadsheet template in the milestone comments.', likes: 31, spots: 9 },
      { user: 'Lisa C.', avatar: 'LC', color: '#9A4F2E', time: '6h ago', crew: 'First-Time Home Buyers', text: 'PSA: Check your credit score NOW if you\'re planning to buy. I waited too long and had to delay my timeline by 3 months. Don\'t be me!', likes: 87, spots: 23 },
    ];

    if (activeCrew) {
      const crew = crews.find(c => c.id === activeCrew);
      return React.createElement('div', { style: { flex: 1, overflowY: 'auto', background: t.bg } },
        React.createElement('div', {
          style: {
            background: `linear-gradient(135deg, ${t.primary} 0%, ${t.primaryLight} 100%)`,
            padding: '16px 16px 28px', position: 'relative', overflow: 'hidden',
          }
        },
          React.createElement('div', { style: { position: 'absolute', right: -10, top: -10, fontSize: 80, opacity: 0.15 } }, crew.emoji),
          React.createElement('button', {
            onClick: () => setActiveCrew(null),
            style: { background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: 20, padding: '6px 12px', color: '#fff', display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'Archivo, sans-serif', fontSize: 13, cursor: 'pointer', marginBottom: 16 }
          },
            React.createElement(window.lucide.ChevronLeft, { size: 16, color: '#fff' }), 'Crews',
          ),
          React.createElement('h1', { style: { color: '#fff', fontFamily: 'Archivo Black, sans-serif', fontSize: 22, lineHeight: 1.2, marginBottom: 10 } }, crew.name),
          React.createElement('div', { style: { display: 'flex', gap: 16 } },
            React.createElement('span', { style: { color: 'rgba(255,255,255,0.7)', fontFamily: 'Archivo, sans-serif', fontSize: 13 } }, `${crew.members.toLocaleString()} members`),
            React.createElement('span', { style: { color: 'rgba(255,255,255,0.7)', fontFamily: 'Archivo, sans-serif', fontSize: 13 } }, `${crew.active} active today`),
          ),
        ),
        React.createElement('div', { style: { padding: 16 } },
          posts.filter(p => p.crew === crew.name || true).slice(0, 3).map((post, i) =>
            React.createElement('div', {
              key: i,
              style: { background: t.surface, borderRadius: 14, padding: 14, marginBottom: 12, border: `1px solid ${t.border}`, boxShadow: t.cardShadow }
            },
              React.createElement('div', { style: { display: 'flex', gap: 10, marginBottom: 10 } },
                React.createElement('div', { style: { width: 36, height: 36, borderRadius: '50%', background: post.color, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Archivo Black, sans-serif', fontSize: 11, flexShrink: 0 } }, post.avatar),
                React.createElement('div', null,
                  React.createElement('div', { style: { fontFamily: 'Archivo, sans-serif', fontWeight: 600, fontSize: 13, color: t.text } }, post.user),
                  React.createElement('div', { style: { color: t.textMuted, fontSize: 11 } }, post.time),
                ),
              ),
              React.createElement('p', { style: { fontFamily: 'Archivo, sans-serif', fontSize: 13, color: t.text, lineHeight: 1.55 } }, post.text),
              React.createElement('div', { style: { display: 'flex', gap: 16, marginTop: 12 } },
                React.createElement('button', { style: { display: 'flex', alignItems: 'center', gap: 5, color: t.textSecondary, fontSize: 12, fontFamily: 'Archivo, sans-serif', background: 'none', border: 'none', cursor: 'pointer', padding: 0 } },
                  React.createElement(window.lucide.Heart, { size: 13 }), post.likes,
                ),
                React.createElement('button', { style: { display: 'flex', alignItems: 'center', gap: 5, color: t.accent, fontSize: 12, fontFamily: 'Archivo, sans-serif', background: 'none', border: 'none', cursor: 'pointer', padding: 0 } },
                  React.createElement(window.lucide.Zap, { size: 13, color: t.accent }), `${post.spots} spots`,
                ),
              ),
            )
          ),
        ),
      );
    }

    return React.createElement('div', { style: { flex: 1, overflowY: 'auto', background: t.bg } },
      React.createElement('div', { style: { padding: '16px 16px 12px', background: t.surface, borderBottom: `1px solid ${t.border}` } },
        React.createElement('h1', { style: { fontFamily: 'Archivo Black, sans-serif', fontSize: 22, color: t.text, marginBottom: 4 } }, 'Climber Crews'),
        React.createElement('p', { style: { fontFamily: 'Archivo, sans-serif', fontSize: 13, color: t.textSecondary } }, 'Find your people. Climb together.'),
      ),

      React.createElement('div', { style: { padding: 16 } },
        React.createElement('p', { style: { fontFamily: 'Archivo, sans-serif', fontSize: 12, color: t.textMuted, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 12 } }, 'Your Crews'),

        React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 } },
          crews.filter(c => c.joined).map(crew =>
            React.createElement('div', {
              key: crew.id,
              onClick: () => setActiveCrew(crew.id),
              style: { background: t.surface, borderRadius: 14, padding: 14, display: 'flex', gap: 12, alignItems: 'center', border: `1px solid ${t.border}`, cursor: 'pointer', boxShadow: t.cardShadow }
            },
              React.createElement('div', { style: { width: 44, height: 44, borderRadius: 12, background: `${t.primary}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 } }, crew.emoji),
              React.createElement('div', { style: { flex: 1 } },
                React.createElement('h3', { style: { fontFamily: 'Archivo Black, sans-serif', fontSize: 14, color: t.text } }, crew.name),
                React.createElement('p', { style: { fontFamily: 'Archivo, sans-serif', fontSize: 12, color: t.textSecondary, marginTop: 2 } }, `${crew.members.toLocaleString()} members · ${crew.active} active`),
              ),
              React.createElement(window.lucide.ChevronRight, { size: 18, color: t.textMuted }),
            )
          )
        ),

        React.createElement('p', { style: { fontFamily: 'Archivo, sans-serif', fontSize: 12, color: t.textMuted, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 12 } }, 'Discover More'),

        React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 10 } },
          crews.filter(c => !c.joined).map(crew =>
            React.createElement('div', {
              key: crew.id,
              style: { background: t.surface, borderRadius: 14, padding: 14, display: 'flex', gap: 12, alignItems: 'center', border: `1px solid ${t.border}` }
            },
              React.createElement('div', { style: { width: 44, height: 44, borderRadius: 12, background: t.surfaceAlt, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 } }, crew.emoji),
              React.createElement('div', { style: { flex: 1 } },
                React.createElement('h3', { style: { fontFamily: 'Archivo Black, sans-serif', fontSize: 14, color: t.text } }, crew.name),
                React.createElement('p', { style: { fontFamily: 'Archivo, sans-serif', fontSize: 12, color: t.textSecondary, marginTop: 2 } }, `${crew.members.toLocaleString()} members`),
              ),
              React.createElement('button', {
                style: {
                  background: t.primary, color: '#fff', border: 'none',
                  borderRadius: 20, padding: '6px 14px',
                  fontFamily: 'Archivo Black, sans-serif', fontSize: 11, cursor: 'pointer',
                }
              }, 'JOIN'),
            )
          )
        ),

        React.createElement('div', { style: { marginTop: 24 } },
          React.createElement('p', { style: { fontFamily: 'Archivo, sans-serif', fontSize: 12, color: t.textMuted, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 12 } }, 'Crew Feed'),
          posts.map((post, i) =>
            React.createElement('div', {
              key: i,
              style: { background: t.surface, borderRadius: 14, padding: 14, marginBottom: 12, border: `1px solid ${t.border}`, boxShadow: t.cardShadow }
            },
              React.createElement('div', { style: { display: 'flex', gap: 10, marginBottom: 10 } },
                React.createElement('div', { style: { width: 36, height: 36, borderRadius: '50%', background: post.color, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Archivo Black, sans-serif', fontSize: 11, flexShrink: 0 } }, post.avatar),
                React.createElement('div', null,
                  React.createElement('div', { style: { fontFamily: 'Archivo, sans-serif', fontWeight: 600, fontSize: 13, color: t.text } }, post.user),
                  React.createElement('div', { style: { color: t.textMuted, fontSize: 11 } },
                    React.createElement('span', { style: { color: t.accent } }, post.crew), ` · ${post.time}`
                  ),
                ),
              ),
              React.createElement('p', { style: { fontFamily: 'Archivo, sans-serif', fontSize: 13, color: t.text, lineHeight: 1.55 } }, post.text),
              React.createElement('div', { style: { display: 'flex', gap: 16, marginTop: 12 } },
                React.createElement('button', { style: { display: 'flex', alignItems: 'center', gap: 5, color: t.textSecondary, fontSize: 12, fontFamily: 'Archivo, sans-serif', background: 'none', border: 'none', cursor: 'pointer', padding: 0 } },
                  React.createElement(window.lucide.Heart, { size: 13 }), post.likes,
                ),
                React.createElement('button', { style: { display: 'flex', alignItems: 'center', gap: 5, color: t.accent, fontSize: 12, fontFamily: 'Archivo, sans-serif', background: 'none', border: 'none', cursor: 'pointer', padding: 0 } },
                  React.createElement(window.lucide.Zap, { size: 13, color: t.accent }), `${post.spots} spots`,
                ),
              ),
            )
          ),
        ),
      ),
    );
  }

  // ─── DASHBOARD SCREEN ─────────────────────────────────────────
  function DashboardScreen() {
    const badges = [
      { label: 'First Milestone', icon: '⛰', earned: true },
      { label: 'Community Spotter', icon: '🤝', earned: true },
      { label: 'Debt Slayer I', icon: '⚔️', earned: true },
      { label: 'Halfway Peak', icon: '🏅', earned: false },
      { label: 'Summit Reached', icon: '🏔', earned: false },
      { label: 'Crew Leader', icon: '👑', earned: false },
    ];

    const monthlyData = [
      { month: 'Oct', amount: 800 },
      { month: 'Nov', amount: 1200 },
      { month: 'Dec', amount: 950 },
      { month: 'Jan', amount: 1800 },
      { month: 'Feb', amount: 2100 },
      { month: 'Mar', amount: 1650 },
    ];

    const maxAmount = Math.max(...monthlyData.map(d => d.amount));

    return React.createElement('div', { style: { flex: 1, overflowY: 'auto', background: t.bg } },

      React.createElement('div', { style: { padding: '20px 16px 14px', background: t.surface, borderBottom: `1px solid ${t.border}` } },
        React.createElement('h1', { style: { fontFamily: 'Archivo Black, sans-serif', fontSize: 22, color: t.text } }, 'Progress Peaks'),
        React.createElement('p', { style: { fontFamily: 'Archivo, sans-serif', fontSize: 13, color: t.textSecondary, marginTop: 4 } }, 'Your financial altitude at a glance'),
      ),

      React.createElement('div', { style: { padding: 16 } },

        // Overall progress card
        React.createElement('div', {
          style: {
            background: `linear-gradient(135deg, ${t.primary} 0%, ${t.primaryLight} 100%)`,
            borderRadius: 16, padding: 20, marginBottom: 16,
            position: 'relative', overflow: 'hidden',
          }
        },
          React.createElement('div', { style: { position: 'absolute', right: -15, bottom: -15, fontSize: 90, opacity: 0.1 } }, '📈'),
          React.createElement('p', { style: { color: 'rgba(255,255,255,0.65)', fontFamily: 'Archivo, sans-serif', fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 6 } }, 'Total Progress'),
          React.createElement('h2', { style: { color: '#fff', fontFamily: 'Archivo Black, sans-serif', fontSize: 34 } }, '$33,480'),
          React.createElement('p', { style: { color: 'rgba(255,255,255,0.7)', fontFamily: 'Archivo, sans-serif', fontSize: 13, marginTop: 4 } }, 'cleared across 2 active ascents'),

          React.createElement('div', { style: { height: 1, background: 'rgba(255,255,255,0.2)', margin: '16px 0' } }),

          React.createElement('div', { style: { display: 'flex', gap: 20 } },
            React.createElement('div', null,
              React.createElement('div', { style: { color: '#fff', fontFamily: 'Archivo Black, sans-serif', fontSize: 18 } }, '27'),
              React.createElement('div', { style: { color: 'rgba(255,255,255,0.6)', fontSize: 11, fontFamily: 'Archivo, sans-serif' } }, 'Spots received'),
            ),
            React.createElement('div', null,
              React.createElement('div', { style: { color: '#fff', fontFamily: 'Archivo Black, sans-serif', fontSize: 18 } }, '4'),
              React.createElement('div', { style: { color: 'rgba(255,255,255,0.6)', fontSize: 11, fontFamily: 'Archivo, sans-serif' } }, 'Milestones done'),
            ),
            React.createElement('div', null,
              React.createElement('div', { style: { color: '#fff', fontFamily: 'Archivo Black, sans-serif', fontSize: 18 } }, '3'),
              React.createElement('div', { style: { color: 'rgba(255,255,255,0.6)', fontSize: 11, fontFamily: 'Archivo, sans-serif' } }, 'Peak badges'),
            ),
          ),
        ),

        // Bar chart
        React.createElement('div', {
          style: { background: t.surface, borderRadius: 16, padding: 16, marginBottom: 16, border: `1px solid ${t.border}`, boxShadow: t.cardShadow }
        },
          React.createElement('h3', { style: { fontFamily: 'Archivo Black, sans-serif', fontSize: 15, color: t.text, marginBottom: 16 } }, 'Monthly Progress'),
          React.createElement('div', { style: { display: 'flex', alignItems: 'flex-end', gap: 8, height: 100 } },
            monthlyData.map((d, i) =>
              React.createElement('div', {
                key: i,
                style: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }
              },
                React.createElement('div', {
                  style: {
                    width: '100%', borderRadius: '4px 4px 0 0',
                    height: `${(d.amount / maxAmount) * 80}px`,
                    background: i === 4 ? t.accent : `${t.primary}80`,
                    transition: 'height 0.3s ease',
                  }
                }),
                React.createElement('span', { style: { fontFamily: 'Archivo, sans-serif', fontSize: 10, color: t.textMuted } }, d.month),
              )
            )
          ),
        ),

        // Ascent progress rings
        React.createElement('div', {
          style: { background: t.surface, borderRadius: 16, padding: 16, marginBottom: 16, border: `1px solid ${t.border}`, boxShadow: t.cardShadow }
        },
          React.createElement('h3', { style: { fontFamily: 'Archivo Black, sans-serif', fontSize: 15, color: t.text, marginBottom: 14 } }, 'Ascent Progress'),
          ...[
            { title: 'Debt-Free Summit', progress: 62, color: t.accent },
            { title: 'Dream Home Deposit', progress: 31, color: t.primary },
          ].map((a, i) =>
            React.createElement('div', {
              key: i,
              style: { marginBottom: i === 0 ? 14 : 0 }
            },
              React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: 6 } },
                React.createElement('span', { style: { fontFamily: 'Archivo, sans-serif', fontWeight: 500, fontSize: 13, color: t.text } }, a.title),
                React.createElement('span', { style: { fontFamily: 'Archivo Black, sans-serif', fontSize: 13, color: a.color } }, `${a.progress}%`),
              ),
              React.createElement('div', { style: { height: 8, background: t.border, borderRadius: 8 } },
                React.createElement('div', { style: { height: '100%', width: `${a.progress}%`, background: a.color, borderRadius: 8 } })
              ),
            )
          ),
        ),

        // Badges
        React.createElement('h3', { style: { fontFamily: 'Archivo Black, sans-serif', fontSize: 15, color: t.text, marginBottom: 12 } }, 'Peak Badges'),
        React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 } },
          badges.map((b, i) =>
            React.createElement('div', {
              key: i,
              style: {
                background: b.earned ? t.surface : t.surfaceAlt,
                borderRadius: 12, padding: '14px 10px', textAlign: 'center',
                border: b.earned ? `1px solid ${t.accent}55` : `1px solid ${t.border}`,
                opacity: b.earned ? 1 : 0.5,
                boxShadow: b.earned ? `0 2px 8px ${t.accent}22` : 'none',
              }
            },
              React.createElement('div', { style: { fontSize: 26, marginBottom: 6, filter: b.earned ? 'none' : 'grayscale(1)' } }, b.icon),
              React.createElement('div', { style: { fontFamily: 'Archivo, sans-serif', fontSize: 10, color: t.textSecondary, fontWeight: 600 } }, b.label),
              b.earned && React.createElement('div', {
                style: {
                  marginTop: 6, fontFamily: 'Archivo Black, sans-serif', fontSize: 9,
                  color: t.accent, letterSpacing: 1,
                }
              }, 'EARNED'),
            )
          )
        ),
      ),
    );
  }

  // ─── SETTINGS SCREEN ──────────────────────────────────────────
  function SettingsScreen() {
    return React.createElement('div', { style: { flex: 1, overflowY: 'auto', background: t.bg } },

      // Profile hero — full bleed
      React.createElement('div', {
        style: {
          background: `linear-gradient(160deg, #0D3320, ${t.primary})`,
          padding: '32px 20px 36px',
          position: 'relative', overflow: 'hidden',
        }
      },
        React.createElement('div', {
          style: {
            position: 'absolute', inset: 0, opacity: 0.05,
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255,255,255,0.4) 20px, rgba(255,255,255,0.4) 21px)`,
          }
        }),
        React.createElement('div', { style: { position: 'relative', textAlign: 'center' } },
          React.createElement('div', {
            style: {
              width: 72, height: 72, borderRadius: '50%',
              background: t.accent, margin: '0 auto 12px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'Archivo Black, sans-serif', color: '#fff', fontSize: 26,
              border: '3px solid rgba(255,255,255,0.3)',
            }
          }, 'JM'),
          React.createElement('h2', { style: { color: '#fff', fontFamily: 'Archivo Black, sans-serif', fontSize: 20 } }, 'Jordan Mills'),
          React.createElement('p', { style: { color: 'rgba(255,255,255,0.6)', fontFamily: 'Archivo, sans-serif', fontSize: 13, marginTop: 4 } }, '@jordanmills · Climber since Jan 2025'),

          React.createElement('div', { style: { display: 'flex', justifyContent: 'center', gap: 24, marginTop: 18 } },
            [['2', 'Ascents'], ['4', 'Milestones'], ['27', 'Spots Rec.']].map(([val, label]) =>
              React.createElement('div', { key: label, style: { textAlign: 'center' } },
                React.createElement('div', { style: { color: '#fff', fontFamily: 'Archivo Black, sans-serif', fontSize: 20 } }, val),
                React.createElement('div', { style: { color: 'rgba(255,255,255,0.55)', fontSize: 11, fontFamily: 'Archivo, sans-serif' } }, label),
              )
            )
          ),
        ),
      ),

      React.createElement('div', { style: { padding: 16 } },

        // Dark mode toggle
        React.createElement('div', {
          style: {
            background: t.surface, borderRadius: 14, padding: '14px 16px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            border: `1px solid ${t.border}`, marginBottom: 16, boxShadow: t.cardShadow,
          }
        },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12 } },
            React.createElement(window.lucide.Moon, { size: 18, color: t.primary }),
            React.createElement('div', null,
              React.createElement('div', { style: { fontFamily: 'Archivo, sans-serif', fontWeight: 600, fontSize: 14, color: t.text } }, 'Dark Mode'),
              React.createElement('div', { style: { fontFamily: 'Archivo, sans-serif', fontSize: 12, color: t.textMuted } }, darkMode ? 'On' : 'Off'),
            ),
          ),
          React.createElement('div', {
            onClick: () => setDarkMode(!darkMode),
            style: {
              width: 50, height: 28, borderRadius: 14,
              background: darkMode ? t.primary : t.border,
              position: 'relative', cursor: 'pointer',
              transition: 'background 0.2s ease',
            }
          },
            React.createElement('div', {
              style: {
                position: 'absolute', top: 3,
                left: darkMode ? 25 : 3,
                width: 22, height: 22, borderRadius: '50%',
                background: '#fff', transition: 'left 0.2s ease',
                boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
              }
            }),
          ),
        ),

        ...([
          { icon: window.lucide.Bell, label: 'Notifications', sub: 'Spot alerts, crew updates' },
          { icon: window.lucide.Lock, label: 'Privacy', sub: 'Control what others see' },
          { icon: window.lucide.Target, label: 'Goal Settings', sub: 'Update your ascents' },
          { icon: window.lucide.Users, label: 'My Crews', sub: '2 crews joined' },
          { icon: window.lucide.Share2, label: 'Invite Friends', sub: 'Build your crew' },
          { icon: window.lucide.HelpCircle, label: 'Help & Support', sub: 'FAQs, contact us' },
        ]).map((item, i, arr) =>
          React.createElement('div', {
            key: i,
            style: {
              display: 'flex', alignItems: 'center', gap: 14,
              padding: '14px 0',
              borderBottom: i < arr.length - 1 ? `1px solid ${t.border}` : 'none',
            }
          },
            React.createElement('div', {
              style: {
                width: 36, height: 36, borderRadius: 10,
                background: `${t.primary}15`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }
            },
              React.createElement(item.icon, { size: 17, color: t.primary }),
            ),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', { style: { fontFamily: 'Archivo, sans-serif', fontWeight: 600, fontSize: 14, color: t.text } }, item.label),
              React.createElement('div', { style: { fontFamily: 'Archivo, sans-serif', fontSize: 12, color: t.textMuted } }, item.sub),
            ),
            React.createElement(window.lucide.ChevronRight, { size: 16, color: t.textMuted }),
          )
        ),

        React.createElement('button', {
          style: {
            width: '100%', marginTop: 24, padding: 14,
            border: `1.5px solid #E05252`, borderRadius: 12,
            background: 'transparent', color: '#E05252',
            fontFamily: 'Archivo Black, sans-serif', fontSize: 14,
            letterSpacing: 1, cursor: 'pointer',
          }
        }, 'SIGN OUT'),
      ),
    );
  }

  const screens = {
    home: HomeScreen,
    discover: DiscoverScreen,
    community: CommunityScreen,
    dashboard: DashboardScreen,
    settings: SettingsScreen,
    detail: DetailScreen,
  };

  const ActiveScreen = screens[activeTab] || HomeScreen;

  return React.createElement('div', {
    style: {
      minHeight: '100vh', background: '#f0f0f0',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'Archivo, sans-serif',
    }
  },
    React.createElement('style', null, fontStyle),

    React.createElement('div', {
      style: {
        width: 375, height: 812,
        background: t.bg,
        borderRadius: 44,
        overflow: 'hidden',
        display: 'flex', flexDirection: 'column',
        boxShadow: '0 40px 80px rgba(0,0,0,0.25), 0 0 0 10px #1a1a1a, 0 0 0 12px #333',
        position: 'relative',
      }
    },

      // Status bar
      React.createElement('div', {
        style: {
          height: 44, background: t.primary,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 24px', flexShrink: 0,
        }
      },
        React.createElement('span', { style: { color: '#fff', fontSize: 12, fontFamily: 'Archivo Black, sans-serif' } }, '9:41'),
        // Dynamic Island
        React.createElement('div', {
          style: {
            width: 110, height: 28, background: '#000',
            borderRadius: 20, position: 'absolute', left: '50%',
            transform: 'translateX(-50%) translateY(-2px)',
          }
        }),
        React.createElement('div', { style: { display: 'flex', gap: 5, alignItems: 'center' } },
          React.createElement(window.lucide.Wifi, { size: 14, color: 'rgba(255,255,255,0.85)' }),
          React.createElement(window.lucide.Battery, { size: 14, color: 'rgba(255,255,255,0.85)' }),
        ),
      ),

      // Screen content
      React.createElement('div', { style: { flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', position: 'relative' } },
        React.createElement(ActiveScreen),
      ),

      // Bottom nav
      React.createElement('div', {
        style: {
          background: t.navBg, borderTop: `1px solid ${t.border}`,
          display: 'flex', alignItems: 'center', justifyContent: 'space-around',
          padding: '10px 4px 18px', flexShrink: 0,
          boxShadow: `0 -2px 12px rgba(0,0,0,0.06)`,
        }
      },
        tabs.map(tab =>
          React.createElement('div', {
            key: tab.id,
            onClick: () => setActiveTab(tab.id),
            style: {
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
              cursor: 'pointer', padding: '4px 12px', borderRadius: 10,
              transition: 'all 0.15s ease',
              opacity: (activeTab === tab.id || (activeTab === 'detail' && tab.id === 'home')) ? 1 : 0.45,
            }
          },
            React.createElement(tab.icon, {
              size: 22,
              color: (activeTab === tab.id || (activeTab === 'detail' && tab.id === 'home')) ? t.primary : t.textMuted,
              strokeWidth: (activeTab === tab.id) ? 2.5 : 1.8,
            }),
            React.createElement('span', {
              style: {
                fontSize: 10, fontFamily: 'Archivo Black, sans-serif',
                color: (activeTab === tab.id || (activeTab === 'detail' && tab.id === 'home')) ? t.primary : t.textMuted,
                letterSpacing: 0.5,
              }
            }, tab.label),
          )
        ),
      ),
    )
  );
}
