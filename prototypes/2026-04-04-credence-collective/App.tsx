function App() {
  const { useState, useEffect, useRef } = React;

  const themes = {
    dark: {
      bg: '#1A1A1A',
      surface: '#2C2C2C',
      surfaceAlt: '#333333',
      border: '#3A3A3A',
      text: '#F5F5F5',
      textMuted: '#999999',
      textFaint: '#666666',
      accent: '#E91E63',
      accentLight: '#FF4081',
      accentDark: '#C2185B',
      blush: '#3A2030',
      cardBg: '#242424',
      overlay: 'rgba(0,0,0,0.7)',
    },
    light: {
      bg: '#FFF0F0',
      surface: '#FFFFFF',
      surfaceAlt: '#FAE8E8',
      border: '#F0D0D0',
      text: '#2C2C2C',
      textMuted: '#666666',
      textFaint: '#AAAAAA',
      accent: '#E91E63',
      accentLight: '#FF4081',
      accentDark: '#C2185B',
      blush: '#FFF0F0',
      cardBg: '#FFFFFF',
      overlay: 'rgba(0,0,0,0.5)',
    }
  };

  const [activeScreen, setActiveScreen] = useState('home');
  const [isDark, setIsDark] = useState(true);
  const theme = isDark ? themes.dark : themes.light;

  const fontStyle = `
    @import url('https://fonts.googleapis.com/css2?family=Archivo+Black&family=Archivo:wght@400;500;600&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    ::-webkit-scrollbar { width: 0; }
    .press-effect:active { transform: scale(0.96); }
  `;

  const expeditions = [
    { id: 1, name: 'Zero-Debt Ascent', members: 1284, progress: 67, tag: 'Debt Freedom', color: '#E91E63', emoji: '⛰️', artifacts: 342 },
    { id: 2, name: 'Passive Income Playground', members: 892, progress: 43, tag: 'Income Growth', color: '#FF6B35', emoji: '🌱', artifacts: 218 },
    { id: 3, name: 'First Home Summit', members: 2103, progress: 81, tag: 'Real Estate', color: '#7C3AED', emoji: '🏡', artifacts: 671 },
    { id: 4, name: 'Emergency Fund Forge', members: 743, progress: 55, tag: 'Safety Net', color: '#0EA5E9', emoji: '🔐', artifacts: 156 },
  ];

  const artifacts = [
    { id: 1, user: 'Maya R.', badge: 'Budget Beacon', expedition: 'Zero-Debt Ascent', time: '2h ago', text: 'Paid off my car loan using the avalanche method. 3 months ahead of schedule! Here\'s my full breakdown...', likes: 47, replies: 12, type: 'Win' },
    { id: 2, user: 'Theo K.', badge: 'Equity Alchemist', expedition: 'First Home Summit', time: '5h ago', text: 'Down payment hit 85% of target. Used this spreadsheet template to track biweekly contributions — sharing it here.', likes: 83, replies: 24, type: 'Resource' },
    { id: 3, user: 'Priya S.', badge: 'Dividend Scout', expedition: 'Passive Income Playground', time: '1d ago', text: 'Month 4 dividend update: $312 generated. Small but real. The compounding is starting to show.', likes: 61, replies: 8, type: 'Update' },
  ];

  const badges = [
    { name: 'Budget Beacon', desc: 'Master of monthly tracking', color: '#E91E63', icon: '💡', earned: true },
    { name: 'Equity Alchemist', desc: 'Real estate milestone reached', color: '#7C3AED', icon: '⚗️', earned: true },
    { name: 'Debt Slayer', desc: 'First debt fully cleared', color: '#E91E63', icon: '⚔️', earned: false },
    { name: 'Stream Architect', desc: '3+ income sources active', color: '#FF6B35', icon: '🏗️', earned: false },
  ];

  // HOME SCREEN
  function HomeScreen() {
    const [pressed, setPressed] = useState(null);

    return React.createElement('div', {
      style: { background: theme.bg, minHeight: '812px', fontFamily: "'Archivo', sans-serif", overflowY: 'auto', overflowX: 'hidden' }
    },
      // Full-bleed header
      React.createElement('div', {
        style: {
          background: `linear-gradient(160deg, ${theme.accent} 0%, #C2185B 100%)`,
          padding: '28px 20px 32px',
          position: 'relative',
          overflow: 'hidden',
        }
      },
        React.createElement('div', {
          style: {
            position: 'absolute', top: -40, right: -40,
            width: 180, height: 180,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.08)',
          }
        }),
        React.createElement('div', {
          style: {
            position: 'absolute', bottom: -20, left: '30%',
            width: 100, height: 100,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.06)',
          }
        }),
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' } },
          React.createElement('div', null,
            React.createElement('div', { style: { fontSize: 11, letterSpacing: 3, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', marginBottom: 4 } }, 'Good morning'),
            React.createElement('div', { style: { fontFamily: "'Archivo Black', sans-serif", fontSize: 26, color: '#FFFFFF', lineHeight: 1.1 } }, 'Sofia M.'),
          ),
          React.createElement('button', {
            onClick: () => setIsDark(!isDark),
            style: { background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: 20, padding: '6px 12px', color: '#fff', fontSize: 18, cursor: 'pointer' }
          }, isDark ? '☀️' : '🌙')
        ),
        React.createElement('div', { style: { marginTop: 20, display: 'flex', gap: 12 } },
          React.createElement('div', { style: { background: 'rgba(255,255,255,0.15)', borderRadius: 12, padding: '12px 16px', flex: 1 } },
            React.createElement('div', { style: { fontSize: 11, color: 'rgba(255,255,255,0.7)', letterSpacing: 1, textTransform: 'uppercase' } }, 'Expeditions'),
            React.createElement('div', { style: { fontFamily: "'Archivo Black', sans-serif", fontSize: 28, color: '#fff', lineHeight: 1 } }, '3'),
          ),
          React.createElement('div', { style: { background: 'rgba(255,255,255,0.15)', borderRadius: 12, padding: '12px 16px', flex: 1 } },
            React.createElement('div', { style: { fontSize: 11, color: 'rgba(255,255,255,0.7)', letterSpacing: 1, textTransform: 'uppercase' } }, 'Artifacts'),
            React.createElement('div', { style: { fontFamily: "'Archivo Black', sans-serif", fontSize: 28, color: '#fff', lineHeight: 1 } }, '12'),
          ),
          React.createElement('div', { style: { background: 'rgba(255,255,255,0.15)', borderRadius: 12, padding: '12px 16px', flex: 1 } },
            React.createElement('div', { style: { fontSize: 11, color: 'rgba(255,255,255,0.7)', letterSpacing: 1, textTransform: 'uppercase' } }, 'Badges'),
            React.createElement('div', { style: { fontFamily: "'Archivo Black', sans-serif", fontSize: 28, color: '#fff', lineHeight: 1 } }, '2'),
          ),
        )
      ),

      // My Expeditions
      React.createElement('div', { style: { padding: '24px 20px 0' } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 } },
          React.createElement('div', { style: { fontFamily: "'Archivo Black', sans-serif", fontSize: 18, color: theme.text } }, 'My Expeditions'),
          React.createElement('button', {
            onClick: () => setActiveScreen('explore'),
            style: { fontSize: 12, color: theme.accent, background: 'none', border: `1px solid ${theme.accent}`, borderRadius: 20, padding: '4px 12px', cursor: 'pointer', fontFamily: "'Archivo', sans-serif" }
          }, React.createElement('span', null, 'See all'))
        ),
        expeditions.slice(0, 2).map(exp =>
          React.createElement('div', {
            key: exp.id,
            onClick: () => setActiveScreen('expedition'),
            className: 'press-effect',
            style: {
              background: theme.cardBg, border: `1px solid ${theme.border}`,
              borderRadius: 16, padding: '16px', marginBottom: 12, cursor: 'pointer',
              borderLeft: `4px solid ${exp.color}`,
            }
          },
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 } },
              React.createElement('div', null,
                React.createElement('div', { style: { fontSize: 20 } }, exp.emoji),
                React.createElement('div', { style: { fontFamily: "'Archivo Black', sans-serif", fontSize: 15, color: theme.text, marginTop: 4 } }, exp.name),
                React.createElement('div', { style: { fontSize: 11, color: theme.textMuted, marginTop: 2 } }, `${exp.members.toLocaleString()} members · ${exp.artifacts} artifacts`),
              ),
              React.createElement('div', {
                style: {
                  background: theme.blush, borderRadius: 8, padding: '4px 10px',
                  fontSize: 11, color: theme.accent, fontWeight: 600
                }
              }, exp.tag)
            ),
            React.createElement('div', { style: { height: 6, background: theme.surfaceAlt, borderRadius: 3, overflow: 'hidden' } },
              React.createElement('div', { style: { height: '100%', width: `${exp.progress}%`, background: exp.color, borderRadius: 3, transition: 'width 0.5s ease' } })
            ),
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginTop: 6 } },
              React.createElement('div', { style: { fontSize: 11, color: theme.textMuted } }, 'Collective progress'),
              React.createElement('div', { style: { fontSize: 11, color: exp.color, fontWeight: 600 } }, `${exp.progress}%`),
            )
          )
        )
      ),

      // Recent Artifacts
      React.createElement('div', { style: { padding: '20px 20px 0' } },
        React.createElement('div', { style: { fontFamily: "'Archivo Black', sans-serif", fontSize: 18, color: theme.text, marginBottom: 16 } }, 'Recent Artifacts'),
        artifacts.slice(0, 2).map(art =>
          React.createElement('div', {
            key: art.id,
            style: { background: theme.cardBg, border: `1px solid ${theme.border}`, borderRadius: 16, padding: '16px', marginBottom: 12 }
          },
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: 8 } },
              React.createElement('div', null,
                React.createElement('div', { style: { fontFamily: "'Archivo Black', sans-serif", fontSize: 13, color: theme.text } }, art.user),
                React.createElement('div', { style: { fontSize: 11, color: theme.accent, marginTop: 2 } }, `🏅 ${art.badge}`),
              ),
              React.createElement('div', { style: { fontSize: 11, color: theme.textFaint } }, art.time)
            ),
            React.createElement('div', { style: { fontSize: 13, color: theme.textMuted, lineHeight: 1.5, marginBottom: 10 } }, art.text.slice(0, 100) + '...'),
            React.createElement('div', { style: { display: 'flex', gap: 12 } },
              React.createElement('span', { style: { fontSize: 12, color: theme.textFaint } }, `♥ ${art.likes}`),
              React.createElement('span', { style: { fontSize: 12, color: theme.textFaint } }, `💬 ${art.replies}`),
              React.createElement('span', {
                style: { fontSize: 11, background: theme.blush, color: theme.accent, borderRadius: 4, padding: '2px 8px', marginLeft: 'auto' }
              }, art.type)
            )
          )
        )
      ),

      React.createElement('div', { style: { height: 80 } })
    );
  }

  // EXPLORE SCREEN
  function ExploreScreen() {
    const [filter, setFilter] = useState('All');
    const filters = ['All', 'Debt', 'Real Estate', 'Income', 'Savings'];

    return React.createElement('div', {
      style: { background: theme.bg, minHeight: '812px', fontFamily: "'Archivo', sans-serif", overflowY: 'auto' }
    },
      // Full-bleed editorial header
      React.createElement('div', {
        style: {
          background: theme.surface,
          borderBottom: `3px solid ${theme.accent}`,
          padding: '24px 20px 20px',
          position: 'relative',
        }
      },
        React.createElement('div', { style: { fontSize: 11, letterSpacing: 3, color: theme.accent, textTransform: 'uppercase', marginBottom: 6 } }, 'Discover'),
        React.createElement('div', { style: { fontFamily: "'Archivo Black', sans-serif", fontSize: 30, color: theme.text, lineHeight: 1 } }, 'Financial\nExpeditions'),
        React.createElement('div', { style: { fontSize: 13, color: theme.textMuted, marginTop: 8 } }, '4,200+ members on shared journeys'),
        // Search
        React.createElement('div', {
          style: {
            marginTop: 16, background: theme.surfaceAlt, borderRadius: 10, padding: '10px 14px',
            display: 'flex', alignItems: 'center', gap: 8, border: `1px solid ${theme.border}`
          }
        },
          React.createElement('span', { style: { fontSize: 16 } }, '🔍'),
          React.createElement('input', {
            placeholder: 'Search expeditions...',
            style: {
              border: 'none', background: 'none', outline: 'none', flex: 1,
              fontSize: 14, color: theme.text, fontFamily: "'Archivo', sans-serif"
            }
          })
        )
      ),

      // Filter chips
      React.createElement('div', { style: { padding: '16px 20px', display: 'flex', gap: 8, overflowX: 'auto' } },
        filters.map(f => React.createElement('button', {
          key: f,
          onClick: () => setFilter(f),
          className: 'press-effect',
          style: {
            padding: '7px 16px', borderRadius: 20, border: 'none', cursor: 'pointer',
            fontFamily: "'Archivo', sans-serif", fontSize: 12, fontWeight: 600, whiteSpace: 'nowrap',
            background: filter === f ? theme.accent : theme.surface,
            color: filter === f ? '#fff' : theme.textMuted,
            border: `1px solid ${filter === f ? theme.accent : theme.border}`,
          }
        }, f))
      ),

      // Expedition list
      React.createElement('div', { style: { padding: '0 20px' } },
        expeditions.map(exp =>
          React.createElement('div', {
            key: exp.id,
            onClick: () => setActiveScreen('expedition'),
            className: 'press-effect',
            style: {
              background: theme.cardBg, border: `1px solid ${theme.border}`,
              borderRadius: 20, marginBottom: 16, overflow: 'hidden', cursor: 'pointer',
            }
          },
            // Mini photo-style header
            React.createElement('div', {
              style: {
                background: `linear-gradient(135deg, ${exp.color}22, ${exp.color}44)`,
                borderBottom: `1px solid ${exp.color}33`,
                padding: '20px 20px 16px',
                position: 'relative',
              }
            },
              React.createElement('div', { style: { fontSize: 32 } }, exp.emoji),
              React.createElement('div', { style: { fontFamily: "'Archivo Black', sans-serif", fontSize: 18, color: theme.text, marginTop: 8, lineHeight: 1.2 } }, exp.name),
              React.createElement('div', {
                style: {
                  position: 'absolute', top: 16, right: 16,
                  background: exp.color, color: '#fff',
                  borderRadius: 6, padding: '3px 10px', fontSize: 11, fontWeight: 700
                }
              }, exp.tag)
            ),
            React.createElement('div', { style: { padding: '14px 20px 16px' } },
              React.createElement('div', { style: { display: 'flex', gap: 20, marginBottom: 12 } },
                React.createElement('div', null,
                  React.createElement('div', { style: { fontFamily: "'Archivo Black', sans-serif", fontSize: 20, color: theme.text } }, exp.members.toLocaleString()),
                  React.createElement('div', { style: { fontSize: 11, color: theme.textFaint } }, 'Members'),
                ),
                React.createElement('div', null,
                  React.createElement('div', { style: { fontFamily: "'Archivo Black', sans-serif", fontSize: 20, color: theme.text } }, exp.artifacts),
                  React.createElement('div', { style: { fontSize: 11, color: theme.textFaint } }, 'Artifacts'),
                ),
                React.createElement('div', null,
                  React.createElement('div', { style: { fontFamily: "'Archivo Black', sans-serif", fontSize: 20, color: exp.color } }, `${exp.progress}%`),
                  React.createElement('div', { style: { fontSize: 11, color: theme.textFaint } }, 'Progress'),
                ),
              ),
              React.createElement('div', { style: { height: 4, background: theme.surfaceAlt, borderRadius: 2, overflow: 'hidden' } },
                React.createElement('div', { style: { height: '100%', width: `${exp.progress}%`, background: exp.color, borderRadius: 2 } })
              ),
              React.createElement('button', {
                style: {
                  marginTop: 14, width: '100%', background: exp.color,
                  color: '#fff', border: 'none', borderRadius: 10, padding: '10px',
                  fontFamily: "'Archivo Black', sans-serif", fontSize: 13, cursor: 'pointer'
                }
              }, 'Join Expedition →')
            )
          )
        )
      ),
      React.createElement('div', { style: { height: 80 } })
    );
  }

  // EXPEDITION DETAIL SCREEN
  function ExpeditionScreen() {
    const [tab, setTab] = useState('artifacts');
    const exp = expeditions[0];

    return React.createElement('div', {
      style: { background: theme.bg, minHeight: '812px', fontFamily: "'Archivo', sans-serif", overflowY: 'auto' }
    },
      // Full-bleed photo header
      React.createElement('div', {
        style: {
          background: `linear-gradient(170deg, #C2185B 0%, #880E4F 100%)`,
          padding: '28px 20px 28px',
          position: 'relative',
          overflow: 'hidden',
        }
      },
        React.createElement('div', {
          style: {
            position: 'absolute', top: -60, right: -60,
            width: 200, height: 200, borderRadius: '50%',
            background: 'rgba(255,255,255,0.05)'
          }
        }),
        React.createElement('button', {
          onClick: () => setActiveScreen('home'),
          style: { background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: 8, padding: '6px 12px', color: '#fff', fontSize: 13, cursor: 'pointer', marginBottom: 20, fontFamily: "'Archivo', sans-serif" }
        }, '← Back'),
        React.createElement('div', { style: { fontSize: 40 } }, '⛰️'),
        React.createElement('div', { style: { fontFamily: "'Archivo Black', sans-serif", fontSize: 26, color: '#fff', marginTop: 8, lineHeight: 1.1 } }, 'Zero-Debt\nAscent'),
        React.createElement('div', { style: { fontSize: 13, color: 'rgba(255,255,255,0.75)', marginTop: 8 } }, '1,284 members climbing together'),
        // Stats row
        React.createElement('div', { style: { display: 'flex', gap: 10, marginTop: 20 } },
          [['67%', 'Progress'], ['342', 'Artifacts'], ['1.2K', 'Members']].map(([val, label]) =>
            React.createElement('div', {
              key: label,
              style: { background: 'rgba(255,255,255,0.12)', borderRadius: 10, padding: '10px 14px', flex: 1, textAlign: 'center' }
            },
              React.createElement('div', { style: { fontFamily: "'Archivo Black', sans-serif", fontSize: 20, color: '#fff' } }, val),
              React.createElement('div', { style: { fontSize: 10, color: 'rgba(255,255,255,0.6)', marginTop: 2 } }, label)
            )
          )
        )
      ),

      // Tab nav
      React.createElement('div', {
        style: { display: 'flex', background: theme.surface, borderBottom: `1px solid ${theme.border}` }
      },
        [['artifacts', 'Artifacts'], ['strategy', 'Strategy'], ['canvas', 'Canvas']].map(([id, label]) =>
          React.createElement('button', {
            key: id,
            onClick: () => setTab(id),
            style: {
              flex: 1, padding: '14px 0', border: 'none', background: 'none', cursor: 'pointer',
              fontFamily: "'Archivo', sans-serif", fontSize: 13, fontWeight: tab === id ? 700 : 400,
              color: tab === id ? theme.accent : theme.textMuted,
              borderBottom: tab === id ? `2px solid ${theme.accent}` : '2px solid transparent',
            }
          }, React.createElement('span', null, label))
        )
      ),

      // Artifacts tab
      tab === 'artifacts' && React.createElement('div', { style: { padding: '16px 20px' } },
        // Post artifact CTA
        React.createElement('button', {
          style: {
            width: '100%', background: theme.blush, border: `1.5px dashed ${theme.accent}`,
            borderRadius: 12, padding: '14px', marginBottom: 16, cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 10, fontFamily: "'Archivo', sans-serif"
          }
        },
          React.createElement('span', { style: { fontSize: 20 } }, '✍️'),
          React.createElement('span', { style: { fontSize: 13, color: theme.accent, fontWeight: 600 } }, 'Share a Milestone Artifact')
        ),
        artifacts.map(art =>
          React.createElement('div', {
            key: art.id,
            style: { background: theme.cardBg, border: `1px solid ${theme.border}`, borderRadius: 16, padding: '16px', marginBottom: 12 }
          },
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: 10 } },
              React.createElement('div', { style: { display: 'flex', gap: 10, alignItems: 'center' } },
                React.createElement('div', {
                  style: {
                    width: 36, height: 36, borderRadius: '50%', background: theme.accent,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#fff', fontFamily: "'Archivo Black', sans-serif", fontSize: 14
                  }
                }, art.user[0]),
                React.createElement('div', null,
                  React.createElement('div', { style: { fontFamily: "'Archivo Black', sans-serif", fontSize: 13, color: theme.text } }, art.user),
                  React.createElement('div', { style: { fontSize: 11, color: theme.accent } }, `🏅 ${art.badge}`),
                )
              ),
              React.createElement('div', null,
                React.createElement('div', { style: { fontSize: 10, color: theme.textFaint, textAlign: 'right' } }, art.time),
                React.createElement('div', {
                  style: { fontSize: 10, background: `${theme.accent}22`, color: theme.accent, borderRadius: 4, padding: '2px 7px', marginTop: 3, textAlign: 'center' }
                }, art.type)
              )
            ),
            React.createElement('div', { style: { fontSize: 13, color: theme.textMuted, lineHeight: 1.6, marginBottom: 12 } }, art.text),
            React.createElement('div', { style: { display: 'flex', gap: 16, paddingTop: 10, borderTop: `1px solid ${theme.border}` } },
              React.createElement('button', { style: { background: 'none', border: 'none', fontSize: 13, color: theme.textFaint, cursor: 'pointer', fontFamily: "'Archivo', sans-serif" } }, `♥ ${art.likes}`),
              React.createElement('button', { style: { background: 'none', border: 'none', fontSize: 13, color: theme.textFaint, cursor: 'pointer', fontFamily: "'Archivo', sans-serif" } }, `💬 ${art.replies}`),
              React.createElement('button', { style: { background: 'none', border: 'none', fontSize: 13, color: theme.textFaint, cursor: 'pointer', fontFamily: "'Archivo', sans-serif", marginLeft: 'auto' } }, '↗ Share'),
            )
          )
        )
      ),

      // Strategy tab
      tab === 'strategy' && React.createElement('div', { style: { padding: '16px 20px' } },
        [
          { title: 'Avalanche vs. Snowball Methods', replies: 34, hot: true },
          { title: 'Credit score recovery timeline', replies: 19, hot: false },
          { title: 'Negotiating interest rates — scripts that worked', replies: 52, hot: true },
          { title: 'Monthly check-in: April debt totals', replies: 8, hot: false },
        ].map((thread, i) =>
          React.createElement('div', {
            key: i,
            style: { background: theme.cardBg, border: `1px solid ${theme.border}`, borderRadius: 14, padding: '14px 16px', marginBottom: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }
          },
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', { style: { fontFamily: "'Archivo', sans-serif", fontWeight: 600, fontSize: 13, color: theme.text } }, thread.title),
              React.createElement('div', { style: { fontSize: 11, color: theme.textFaint, marginTop: 4 } }, `${thread.replies} replies`),
            ),
            thread.hot && React.createElement('div', { style: { fontSize: 11, background: '#FF6B3522', color: '#FF6B35', borderRadius: 6, padding: '3px 8px', marginLeft: 10, fontWeight: 700 } }, '🔥 Hot')
          )
        )
      ),

      // Canvas tab
      tab === 'canvas' && React.createElement('div', { style: { padding: '16px 20px' } },
        React.createElement('div', { style: { fontFamily: "'Archivo Black', sans-serif", fontSize: 16, color: theme.text, marginBottom: 12 } }, 'Expedition Canvas'),
        React.createElement('div', { style: { fontSize: 13, color: theme.textMuted, marginBottom: 16 } }, 'The living map of collective progress'),
        // Canvas cards layered
        [
          { label: 'Kickoff', date: 'Jan 2024', complete: true, artifacts: 42 },
          { label: 'Milestone 1: $10K Cleared', date: 'Mar 2024', complete: true, artifacts: 91 },
          { label: 'Milestone 2: $25K Cleared', date: 'Jun 2024', complete: false, artifacts: 67, active: true },
          { label: 'Summit: Total Freedom', date: 'Dec 2024', complete: false, artifacts: 3 },
        ].map((node, i) =>
          React.createElement('div', {
            key: i,
            style: {
              background: node.active ? `${theme.accent}15` : theme.cardBg,
              border: `1.5px solid ${node.active ? theme.accent : node.complete ? '#4CAF50' : theme.border}`,
              borderRadius: 14, padding: '14px 16px', marginBottom: 10,
              display: 'flex', alignItems: 'center', gap: 14
            }
          },
            React.createElement('div', {
              style: {
                width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
                background: node.complete ? '#4CAF50' : node.active ? theme.accent : theme.surfaceAlt,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 14, color: '#fff', fontWeight: 700
              }
            }, node.complete ? '✓' : node.active ? '→' : String(i + 1)),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', { style: { fontFamily: "'Archivo', sans-serif", fontWeight: 700, fontSize: 13, color: theme.text } }, node.label),
              React.createElement('div', { style: { fontSize: 11, color: theme.textFaint, marginTop: 2 } }, `${node.date} · ${node.artifacts} artifacts`),
            ),
            node.active && React.createElement('div', { style: { fontSize: 10, background: theme.accent, color: '#fff', borderRadius: 5, padding: '2px 8px' } }, 'ACTIVE')
          )
        )
      ),

      React.createElement('div', { style: { height: 80 } })
    );
  }

  // BADGES / PROFILE SCREEN
  function ProfileScreen() {
    return React.createElement('div', {
      style: { background: theme.bg, minHeight: '812px', fontFamily: "'Archivo', sans-serif", overflowY: 'auto' }
    },
      // Full-bleed profile header
      React.createElement('div', {
        style: {
          background: `linear-gradient(160deg, #2C2C2C 0%, #1A1A1A 100%)`,
          padding: '32px 20px 28px',
          borderBottom: `3px solid ${theme.accent}`,
          position: 'relative',
          overflow: 'hidden',
        }
      },
        React.createElement('div', {
          style: {
            position: 'absolute', bottom: -30, right: -30,
            width: 120, height: 120, borderRadius: '50%',
            border: `2px solid ${theme.accent}33`
          }
        }),
        React.createElement('div', {
          style: {
            width: 72, height: 72, borderRadius: '50%',
            background: theme.accent, display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            fontFamily: "'Archivo Black', sans-serif", fontSize: 28, color: '#fff',
            marginBottom: 14, border: `3px solid rgba(255,255,255,0.2)`
          }
        }, 'S'),
        React.createElement('div', { style: { fontFamily: "'Archivo Black', sans-serif", fontSize: 24, color: '#FFFFFF' } }, 'Sofia M.'),
        React.createElement('div', { style: { fontSize: 12, color: 'rgba(255,255,255,0.6)', marginTop: 4 } }, 'Member since January 2024'),
        React.createElement('div', { style: { fontSize: 13, color: theme.accent, marginTop: 6, fontWeight: 600 } }, '"Debt freedom is not a number, it\'s a practice."'),
        // Stats
        React.createElement('div', { style: { display: 'flex', gap: 0, marginTop: 20 } },
          [['3', 'Expeditions'], ['12', 'Artifacts'], ['2', 'Badges'], ['847', 'Likes']].map(([val, label], i) =>
            React.createElement('div', {
              key: label,
              style: {
                flex: 1, textAlign: 'center', padding: '12px 0',
                borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.1)' : 'none'
              }
            },
              React.createElement('div', { style: { fontFamily: "'Archivo Black', sans-serif", fontSize: 22, color: '#fff' } }, val),
              React.createElement('div', { style: { fontSize: 10, color: 'rgba(255,255,255,0.5)', marginTop: 2 } }, label)
            )
          )
        )
      ),

      // Guild Badges
      React.createElement('div', { style: { padding: '24px 20px 0' } },
        React.createElement('div', { style: { fontFamily: "'Archivo Black', sans-serif", fontSize: 18, color: theme.text, marginBottom: 6 } }, 'Guild Badges'),
        React.createElement('div', { style: { fontSize: 12, color: theme.textMuted, marginBottom: 16 } }, 'Earned through contributions & milestones'),
        React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 } },
          badges.map((badge, i) =>
            React.createElement('div', {
              key: i,
              style: {
                background: badge.earned ? theme.cardBg : theme.surfaceAlt,
                border: `1.5px solid ${badge.earned ? badge.color : theme.border}`,
                borderRadius: 16, padding: '16px', opacity: badge.earned ? 1 : 0.6,
                position: 'relative', overflow: 'hidden'
              }
            },
              !badge.earned && React.createElement('div', {
                style: {
                  position: 'absolute', top: 8, right: 8,
                  fontSize: 12
                }
              }, '🔒'),
              React.createElement('div', { style: { fontSize: 28, marginBottom: 8 } }, badge.icon),
              React.createElement('div', { style: { fontFamily: "'Archivo Black', sans-serif", fontSize: 12, color: badge.earned ? badge.color : theme.textFaint, lineHeight: 1.2 } }, badge.name),
              React.createElement('div', { style: { fontSize: 11, color: theme.textFaint, marginTop: 4 } }, badge.desc),
              badge.earned && React.createElement('div', {
                style: {
                  marginTop: 8, fontSize: 10, background: `${badge.color}20`,
                  color: badge.color, borderRadius: 4, padding: '2px 8px', display: 'inline-block'
                }
              }, '✓ Earned')
            )
          )
        )
      ),

      // Recent Activity
      React.createElement('div', { style: { padding: '24px 20px' } },
        React.createElement('div', { style: { fontFamily: "'Archivo Black', sans-serif", fontSize: 18, color: theme.text, marginBottom: 16 } }, 'Recent Contributions'),
        artifacts.slice(0, 2).map((art, i) =>
          React.createElement('div', {
            key: i,
            style: { display: 'flex', gap: 12, marginBottom: 14, paddingBottom: 14, borderBottom: `1px solid ${theme.border}` }
          },
            React.createElement('div', {
              style: {
                width: 8, height: 8, borderRadius: '50%', background: theme.accent,
                flexShrink: 0, marginTop: 4
              }
            }),
            React.createElement('div', null,
              React.createElement('div', { style: { fontSize: 12, color: theme.text, lineHeight: 1.5 } }, art.text.slice(0, 80) + '...'),
              React.createElement('div', { style: { fontSize: 11, color: theme.textFaint, marginTop: 4 } }, `${art.expedition} · ${art.time}`)
            )
          )
        )
      ),

      React.createElement('div', { style: { height: 80 } })
    );
  }

  const screens = {
    home: HomeScreen,
    explore: ExploreScreen,
    expedition: ExpeditionScreen,
    profile: ProfileScreen,
  };

  const navItems = [
    { id: 'home', label: 'Home', icon: '⌂' },
    { id: 'explore', label: 'Explore', icon: '◎' },
    { id: 'expedition', label: 'Canvas', icon: '✦' },
    { id: 'profile', label: 'Profile', icon: '◉' },
  ];

  const ActiveScreen = screens[activeScreen] || HomeScreen;

  return React.createElement('div', {
    style: { minHeight: '100vh', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }
  },
    React.createElement('style', null, fontStyle),
    React.createElement('div', {
      style: {
        width: 375, height: 812, background: theme.bg, borderRadius: 44,
        overflow: 'hidden', position: 'relative',
        boxShadow: '0 30px 80px rgba(0,0,0,0.35), 0 0 0 1px rgba(0,0,0,0.1)',
        display: 'flex', flexDirection: 'column',
      }
    },
      // Screen content
      React.createElement('div', { style: { flex: 1, overflowY: 'auto', overflowX: 'hidden' } },
        React.createElement(ActiveScreen)
      ),

      // Top tab navigation - editorial style
      React.createElement('div', {
        style: {
          background: theme.surface,
          borderTop: `2px solid ${theme.accent}`,
          display: 'flex',
          paddingBottom: 8,
          paddingTop: 4,
        }
      },
        navItems.map(item =>
          React.createElement('button', {
            key: item.id,
            onClick: () => setActiveScreen(item.id),
            className: 'press-effect',
            style: {
              flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
              gap: 3, padding: '8px 0', border: 'none', background: 'none', cursor: 'pointer',
            }
          },
            React.createElement('span', {
              style: {
                fontSize: 18,
                opacity: activeScreen === item.id ? 1 : 0.4,
                filter: activeScreen === item.id ? 'none' : 'grayscale(1)',
              }
            }, item.icon),
            React.createElement('span', {
              style: {
                fontSize: 10, fontFamily: "'Archivo', sans-serif",
                color: activeScreen === item.id ? theme.accent : theme.textFaint,
                fontWeight: activeScreen === item.id ? 700 : 400,
                letterSpacing: activeScreen === item.id ? 0.5 : 0,
              }
            }, item.label)
          )
        )
      )
    )
  );
}
