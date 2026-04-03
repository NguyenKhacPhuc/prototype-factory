
const { useState, useEffect, useRef } = React;

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [theme, setTheme] = useState('dark');

  const themes = {
    dark: {
      bg: '#111111',
      surface: '#1C1C1C',
      surface2: '#252525',
      surface3: '#2E2E2E',
      primary: '#059669',
      primaryLight: '#10B981',
      accent: '#EA580C',
      accentLight: '#F97316',
      text: '#F1F5F9',
      textSecondary: '#94A3B8',
      textMuted: '#64748B',
      border: '#2E2E2E',
      navBg: '#161616',
    },
    light: {
      bg: '#F8F9FA',
      surface: '#FFFFFF',
      surface2: '#F1F5F9',
      surface3: '#E2E8F0',
      primary: '#059669',
      primaryLight: '#10B981',
      accent: '#EA580C',
      accentLight: '#F97316',
      text: '#0F172A',
      textSecondary: '#475569',
      textMuted: '#94A3B8',
      border: '#E2E8F0',
      navBg: '#FFFFFF',
    }
  };

  const c = themes[theme];

  const styleTag = `
    @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Inter:wght@400;500;600&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    ::-webkit-scrollbar { display: none; }
    * { scrollbar-width: none; }
  `;

  const tabs = [
    { id: 'home', label: 'Home', icon: window.lucide.Home },
    { id: 'challenges', label: 'Challenges', icon: window.lucide.Target },
    { id: 'stories', label: 'Stories', icon: window.lucide.BookOpen },
    { id: 'treasury', label: 'Treasury', icon: window.lucide.Coins },
    { id: 'profile', label: 'Profile', icon: window.lucide.User },
  ];

  // ─── Circular Progress Dial ───────────────────────────────────────────────
  function ProgressDial({ percent, size = 80, color, label, sublabel, thickness = 7 }) {
    const r = (size - thickness * 2) / 2;
    const circ = 2 * Math.PI * r;
    const dash = (percent / 100) * circ;
    return React.createElement('div', {
      style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }
    },
      React.createElement('div', { style: { position: 'relative', width: size, height: size } },
        React.createElement('svg', { width: size, height: size, style: { transform: 'rotate(-90deg)' } },
          React.createElement('circle', {
            cx: size / 2, cy: size / 2, r,
            fill: 'none', stroke: c.surface3, strokeWidth: thickness
          }),
          React.createElement('circle', {
            cx: size / 2, cy: size / 2, r,
            fill: 'none', stroke: color, strokeWidth: thickness,
            strokeDasharray: `${dash} ${circ - dash}`,
            strokeLinecap: 'round',
            style: { transition: 'stroke-dasharray 0.6s ease' }
          })
        ),
        React.createElement('div', {
          style: {
            position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center'
          }
        },
          React.createElement('span', {
            style: { fontFamily: 'Orbitron', fontSize: size < 70 ? 10 : 12, fontWeight: 700, color: c.text }
          }, `${percent}%`),
          sublabel && React.createElement('span', {
            style: { fontFamily: 'Inter', fontSize: 8, color: c.textMuted, marginTop: 1 }
          }, sublabel)
        )
      ),
      label && React.createElement('span', {
        style: { fontFamily: 'Inter', fontSize: 10, color: c.textSecondary, textAlign: 'center', maxWidth: size }
      }, label)
    );
  }

  // ─── HOME SCREEN ─────────────────────────────────────────────────────────
  function HomeScreen() {
    const [pulseActive, setPulseActive] = useState(false);
    useEffect(() => {
      const t = setInterval(() => setPulseActive(p => !p), 2000);
      return () => clearInterval(t);
    }, []);

    const clubs = [
      { name: 'House Hunters', goal: 'Down Payment', progress: 67, members: 8, pot: '$3,240', color: c.primary },
      { name: 'Debt Slayers', goal: 'Zero Debt 2026', progress: 44, members: 5, pot: '$1,890', color: c.accent },
      { name: 'Side Hustle Crew', goal: 'Income Growth', progress: 82, members: 12, pot: '$6,100', color: '#8B5E3C' },
    ];

    const activeChallenges = [
      { title: 'Cash-Free Week', daysLeft: 3, participants: 6, unlockAt: 80, current: 72 },
      { title: 'Monthly Spike', daysLeft: 11, participants: 8, unlockAt: 100, current: 44 },
    ];

    return React.createElement('div', { style: { flex: 1, overflowY: 'auto', background: c.bg } },
      // Header
      React.createElement('div', {
        style: {
          padding: '20px 20px 16px',
          borderBottom: `1px solid ${c.border}`,
          background: c.surface,
        }
      },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' } },
          React.createElement('div', null,
            React.createElement('p', {
              style: { fontFamily: 'Inter', fontSize: 12, color: c.accent, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase' }
            }, 'Guild Treasury'),
            React.createElement('h1', {
              style: { fontFamily: 'Orbitron', fontSize: 22, fontWeight: 800, color: c.text, marginTop: 2, lineHeight: 1.2 }
            }, 'Welcome back,\nAlex ⚔️')
          ),
          React.createElement('div', {
            style: {
              width: 44, height: 44, borderRadius: 12,
              background: `linear-gradient(135deg, ${c.primary}, ${c.accent})`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: `2px solid ${c.primaryLight}`,
            }
          },
            React.createElement('span', { style: { fontFamily: 'Orbitron', fontSize: 16, fontWeight: 800, color: '#fff' } }, 'A')
          )
        ),
        // Quick stats bar
        React.createElement('div', {
          style: {
            display: 'flex', gap: 12, marginTop: 16,
            background: c.surface2, borderRadius: 12, padding: '10px 14px'
          }
        },
          [
            { label: 'Total Saved', value: '$11,230' },
            { label: 'Active Clubs', value: '3' },
            { label: 'Badges', value: '14' },
          ].map((stat, i) => React.createElement('div', {
            key: i,
            style: {
              flex: 1, textAlign: 'center',
              borderRight: i < 2 ? `1px solid ${c.border}` : 'none'
            }
          },
            React.createElement('div', {
              style: { fontFamily: 'Orbitron', fontSize: 14, fontWeight: 700, color: c.primary }
            }, stat.value),
            React.createElement('div', {
              style: { fontFamily: 'Inter', fontSize: 10, color: c.textMuted, marginTop: 2 }
            }, stat.label)
          ))
        )
      ),

      // My Clubs — horizontal scroll with progress dials
      React.createElement('div', { style: { padding: '20px 0 8px' } },
        React.createElement('div', { style: { paddingInline: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 } },
          React.createElement('h2', { style: { fontFamily: 'Orbitron', fontSize: 14, fontWeight: 700, color: c.text, letterSpacing: 1 } }, 'MY CLUBS'),
          React.createElement('span', { style: { fontFamily: 'Inter', fontSize: 12, color: c.accent, fontWeight: 600 } }, '+ Join Club')
        ),
        React.createElement('div', {
          style: { display: 'flex', gap: 14, paddingInline: 20, overflowX: 'auto', paddingBottom: 8 }
        },
          clubs.map((club, i) => React.createElement('div', {
            key: i,
            style: {
              minWidth: 160, background: c.surface,
              borderRadius: 16, padding: '16px 14px',
              border: `1px solid ${c.border}`,
              borderTop: `3px solid ${club.color}`,
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
            }
          },
            React.createElement(ProgressDial, { percent: club.progress, size: 80, color: club.color, thickness: 7 }),
            React.createElement('div', { style: { textAlign: 'center' } },
              React.createElement('div', { style: { fontFamily: 'Orbitron', fontSize: 11, fontWeight: 700, color: c.text } }, club.name),
              React.createElement('div', { style: { fontFamily: 'Inter', fontSize: 10, color: c.textMuted, marginTop: 2 } }, club.goal),
              React.createElement('div', {
                style: {
                  marginTop: 8, fontFamily: 'Orbitron', fontSize: 13, fontWeight: 800, color: club.color
                }
              }, club.pot),
              React.createElement('div', { style: { fontFamily: 'Inter', fontSize: 10, color: c.textSecondary } }, `${club.members} members`)
            )
          ))
        )
      ),

      // Active Challenges
      React.createElement('div', { style: { padding: '8px 20px 20px' } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 } },
          React.createElement('h2', { style: { fontFamily: 'Orbitron', fontSize: 14, fontWeight: 700, color: c.text, letterSpacing: 1 } }, 'LIVE CHALLENGES'),
          React.createElement('span', { style: { fontFamily: 'Inter', fontSize: 12, color: c.textMuted } }, 'See all →')
        ),
        activeChallenges.map((ch, i) => React.createElement('div', {
          key: i,
          style: {
            background: c.surface, borderRadius: 14, padding: '14px 16px',
            marginBottom: 12, border: `1px solid ${c.border}`,
            display: 'flex', alignItems: 'center', gap: 14,
          }
        },
          React.createElement(ProgressDial, {
            percent: ch.current, size: 62, color: ch.current >= ch.unlockAt ? c.primaryLight : c.accent,
            thickness: 6, sublabel: `/${ch.unlockAt}%`
          }),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', { style: { fontFamily: 'Orbitron', fontSize: 12, fontWeight: 700, color: c.text } }, ch.title),
            React.createElement('div', {
              style: { fontFamily: 'Inter', fontSize: 11, color: c.textSecondary, marginTop: 4 }
            }, `${ch.participants} members · ${ch.daysLeft} days left`),
            React.createElement('div', {
              style: {
                marginTop: 8, height: 4, background: c.surface3, borderRadius: 2, overflow: 'hidden'
              }
            },
              React.createElement('div', {
                style: {
                  height: '100%', width: `${ch.current}%`,
                  background: `linear-gradient(90deg, ${c.primary}, ${c.accent})`,
                  borderRadius: 2, transition: 'width 0.6s ease'
                }
              })
            )
          )
        ))
      ),

      // Recent Activity
      React.createElement('div', { style: { padding: '0 20px 24px' } },
        React.createElement('h2', { style: { fontFamily: 'Orbitron', fontSize: 14, fontWeight: 700, color: c.text, letterSpacing: 1, marginBottom: 14 } }, 'RECENT WINS'),
        [
          { user: 'Maya R.', action: 'Saved $200 extra', club: 'House Hunters', time: '2h ago', emoji: '🏡' },
          { user: 'Carlos T.', action: 'Completed Cash-Free Day 4', club: 'Debt Slayers', time: '5h ago', emoji: '💪' },
          { user: 'Priya K.', action: 'Hit $500 milestone!', club: 'Side Hustle Crew', time: '1d ago', emoji: '🚀' },
        ].map((item, i) => React.createElement('div', {
          key: i,
          style: {
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '12px 0',
            borderBottom: i < 2 ? `1px solid ${c.border}` : 'none'
          }
        },
          React.createElement('div', {
            style: {
              width: 36, height: 36, borderRadius: 10,
              background: c.surface2, display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 18, flexShrink: 0
            }
          }, item.emoji),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', {
              style: { fontFamily: 'Inter', fontSize: 13, fontWeight: 600, color: c.text }
            }, `${item.user} — ${item.action}`),
            React.createElement('div', {
              style: { fontFamily: 'Inter', fontSize: 11, color: c.textMuted, marginTop: 2 }
            }, `${item.club} · ${item.time}`)
          )
        ))
      )
    );
  }

  // ─── CHALLENGES SCREEN ───────────────────────────────────────────────────
  function ChallengesScreen() {
    const [selected, setSelected] = useState(0);
    const categories = ['Active', 'Upcoming', 'Completed'];

    const challenges = [
      {
        title: 'Cash-Free Week',
        club: 'Debt Slayers',
        type: 'Spending Freeze',
        daysLeft: 3,
        progress: 72,
        unlockReward: '$150 pot bonus',
        participants: 5,
        joined: true,
        color: c.accent,
        desc: 'No non-essential spending for 7 days. Track your wins daily!'
      },
      {
        title: 'Monthly Spike',
        club: 'House Hunters',
        type: 'Savings Boost',
        daysLeft: 11,
        progress: 44,
        unlockReward: '2x match from sponsor',
        participants: 8,
        joined: true,
        color: c.primary,
        desc: 'Double your savings rate for the month. Every dollar counts!'
      },
      {
        title: 'Side Income Sprint',
        club: 'Side Hustle Crew',
        type: 'Income Challenge',
        daysLeft: 7,
        progress: 88,
        unlockReward: 'Group dinner fund',
        participants: 10,
        joined: false,
        color: '#F59E0B',
        desc: 'Generate $100 in side income this week. Share your methods!'
      },
    ];

    return React.createElement('div', { style: { flex: 1, overflowY: 'auto', background: c.bg } },
      // Header
      React.createElement('div', {
        style: { padding: '20px 20px 0', background: c.surface, borderBottom: `1px solid ${c.border}` }
      },
        React.createElement('h1', {
          style: { fontFamily: 'Orbitron', fontSize: 20, fontWeight: 800, color: c.text, marginBottom: 16 }
        }, 'POT CHALLENGES'),
        React.createElement('div', { style: { display: 'flex', gap: 0, marginBottom: 0 } },
          categories.map((cat, i) => React.createElement('button', {
            key: i,
            onClick: () => setSelected(i),
            style: {
              flex: 1, padding: '10px 0', border: 'none', background: 'transparent', cursor: 'pointer',
              fontFamily: 'Orbitron', fontSize: 11, fontWeight: 700,
              color: selected === i ? c.primary : c.textMuted,
              borderBottom: selected === i ? `2px solid ${c.primary}` : `2px solid transparent`,
              transition: 'all 0.2s',
              letterSpacing: 0.5
            }
          }, cat))
        )
      ),

      // Club dial overview - horizontal scroll
      React.createElement('div', { style: { padding: '20px 0 8px', borderBottom: `1px solid ${c.border}` } },
        React.createElement('div', { style: { paddingInline: 20, marginBottom: 12 } },
          React.createElement('span', { style: { fontFamily: 'Orbitron', fontSize: 11, color: c.textMuted, letterSpacing: 1 } }, 'CLUB PROGRESS OVERVIEW')
        ),
        React.createElement('div', {
          style: { display: 'flex', gap: 20, paddingInline: 20, overflowX: 'auto' }
        },
          [
            { name: 'House\nHunters', p: 67, color: c.primary },
            { name: 'Debt\nSlayers', p: 44, color: c.accent },
            { name: 'Side Hustle\nCrew', p: 82, color: '#F59E0B' },
          ].map((club, i) => React.createElement(ProgressDial, {
            key: i, percent: club.p, size: 72, color: club.color, label: club.name, thickness: 6
          }))
        )
      ),

      // Challenge cards
      React.createElement('div', { style: { padding: '20px' } },
        challenges.map((ch, i) => React.createElement('div', {
          key: i,
          style: {
            background: c.surface, borderRadius: 16, marginBottom: 16, overflow: 'hidden',
            border: `1px solid ${c.border}`, borderLeft: `4px solid ${ch.color}`,
          }
        },
          // Top section
          React.createElement('div', { style: { padding: '16px 16px 12px', display: 'flex', gap: 14 } },
            React.createElement(ProgressDial, {
              percent: ch.progress, size: 76, color: ch.color, thickness: 7,
              sublabel: `${ch.daysLeft}d`
            }),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', {
                style: {
                  display: 'inline-block', fontFamily: 'Inter', fontSize: 10, fontWeight: 600,
                  color: ch.color, background: `${ch.color}22`,
                  padding: '2px 8px', borderRadius: 4, marginBottom: 6, letterSpacing: 0.5
                }
              }, ch.type.toUpperCase()),
              React.createElement('h3', {
                style: { fontFamily: 'Orbitron', fontSize: 15, fontWeight: 700, color: c.text, lineHeight: 1.2 }
              }, ch.title),
              React.createElement('div', {
                style: { fontFamily: 'Inter', fontSize: 11, color: c.textSecondary, marginTop: 4 }
              }, ch.club + ' · ' + ch.participants + ' members'),
              React.createElement('div', {
                style: { fontFamily: 'Inter', fontSize: 11, color: c.textMuted, marginTop: 6 }
              }, ch.desc)
            )
          ),
          // Reward bar
          React.createElement('div', {
            style: {
              padding: '10px 16px', background: c.surface2,
              display: 'flex', alignItems: 'center', justifyContent: 'space-between'
            }
          },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6 } },
              React.createElement(window.lucide.Gift, { size: 14, color: ch.color }),
              React.createElement('span', {
                style: { fontFamily: 'Inter', fontSize: 11, color: c.textSecondary }
              }, 'Unlock: '),
              React.createElement('span', {
                style: { fontFamily: 'Orbitron', fontSize: 11, fontWeight: 700, color: ch.color }
              }, ch.unlockReward)
            ),
            React.createElement('button', {
              style: {
                padding: '6px 14px', borderRadius: 8, border: 'none', cursor: 'pointer',
                background: ch.joined ? c.surface3 : ch.color,
                color: ch.joined ? c.textMuted : '#fff',
                fontFamily: 'Orbitron', fontSize: 10, fontWeight: 700,
                transition: 'all 0.2s'
              }
            }, ch.joined ? 'JOINED ✓' : 'JOIN')
          )
        ))
      )
    );
  }

  // ─── STORIES SCREEN ──────────────────────────────────────────────────────
  function StoriesScreen() {
    const [liked, setLiked] = useState({});

    const stories = [
      {
        user: 'Maya Rodriguez',
        avatar: 'MR',
        club: 'House Hunters',
        time: '2 hours ago',
        type: 'win',
        title: 'Week 12 Win: Emergency Fund Overflow!',
        body: 'Y\'all — I had a car repair hit me out of nowhere this week, $340. BUT guess what? I had $400 sitting in my emergency sub-fund. First time in years I didn\'t panic. The club challenges literally rewired my money brain. 🙌',
        likes: 24,
        comments: 8,
        emoji: '🏡',
        badge: 'Resilience Star'
      },
      {
        user: 'Carlos Tran',
        avatar: 'CT',
        club: 'Debt Slayers',
        time: '5 hours ago',
        type: 'setback',
        title: 'Real Talk: I Broke the Cash-Free Streak',
        body: 'Day 4 and I bought coffee. I know, I know. But here\'s the thing — I immediately logged it and the app showed it only set our group back 2%. Sometimes the transparency of this group is the accountability I need. Resetting tomorrow.',
        likes: 31,
        comments: 15,
        emoji: '💪',
        badge: null
      },
      {
        user: 'Priya Kapoor',
        avatar: 'PK',
        club: 'Side Hustle Crew',
        time: '1 day ago',
        type: 'milestone',
        title: '🚀 $500 Freelance Milestone UNLOCKED!',
        body: 'I posted about my Notion template side project last month because this group challenged me to just start. Well. $547 in 30 days. This is not me flexing — this is me saying the group\'s energy made me ship. Challenge mode is real.',
        likes: 67,
        comments: 29,
        emoji: '🚀',
        badge: 'Trailblazer'
      },
      {
        user: 'James Okoye',
        avatar: 'JO',
        club: 'House Hunters',
        time: '2 days ago',
        type: 'win',
        title: 'Month 6 Savings Check-in',
        body: 'Crossed 60% of our down payment goal as a club this month. At current pace we\'re on track for Q3 target. Shoutout to everyone who crushed the Monthly Spike challenge — that collective push moved us 8% faster!',
        likes: 43,
        comments: 11,
        emoji: '📊',
        badge: 'Consistency King'
      },
    ];

    const typeColors = { win: c.primary, setback: c.accent, milestone: '#F59E0B' };
    const typeLabels = { win: 'WIN', setback: 'SETBACK', milestone: 'MILESTONE' };

    return React.createElement('div', { style: { flex: 1, overflowY: 'auto', background: c.bg } },
      // Header
      React.createElement('div', {
        style: { padding: '20px 20px 14px', background: c.surface, borderBottom: `1px solid ${c.border}` }
      },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
          React.createElement('h1', { style: { fontFamily: 'Orbitron', fontSize: 20, fontWeight: 800, color: c.text } }, 'STORIES'),
          React.createElement('button', {
            style: {
              padding: '8px 14px', borderRadius: 10, border: 'none', cursor: 'pointer',
              background: c.primary, color: '#fff',
              fontFamily: 'Orbitron', fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6
            }
          },
            React.createElement(window.lucide.PenLine, { size: 12 }),
            'POST'
          )
        )
      ),

      // Story cards
      React.createElement('div', { style: { padding: '16px 20px' } },
        stories.map((story, i) => React.createElement('div', {
          key: i,
          style: {
            background: c.surface, borderRadius: 16, marginBottom: 16,
            border: `1px solid ${c.border}`, overflow: 'hidden'
          }
        },
          // Author row
          React.createElement('div', {
            style: { padding: '14px 16px 0', display: 'flex', alignItems: 'center', gap: 10 }
          },
            React.createElement('div', {
              style: {
                width: 38, height: 38, borderRadius: 10, flexShrink: 0,
                background: `linear-gradient(135deg, ${typeColors[story.type]}88, ${typeColors[story.type]})`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'Orbitron', fontSize: 12, fontWeight: 700, color: '#fff'
              }
            }, story.avatar),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', { style: { fontFamily: 'Inter', fontSize: 13, fontWeight: 600, color: c.text } }, story.user),
              React.createElement('div', { style: { fontFamily: 'Inter', fontSize: 11, color: c.textMuted } }, `${story.club} · ${story.time}`)
            ),
            React.createElement('span', {
              style: {
                fontFamily: 'Orbitron', fontSize: 9, fontWeight: 700, letterSpacing: 0.5,
                color: typeColors[story.type], background: `${typeColors[story.type]}22`,
                padding: '3px 8px', borderRadius: 4
              }
            }, typeLabels[story.type])
          ),
          // Content
          React.createElement('div', { style: { padding: '12px 16px' } },
            React.createElement('h3', {
              style: { fontFamily: 'Orbitron', fontSize: 12, fontWeight: 700, color: c.text, marginBottom: 8, lineHeight: 1.4 }
            }, story.title),
            React.createElement('p', {
              style: { fontFamily: 'Inter', fontSize: 13, color: c.textSecondary, lineHeight: 1.6 }
            }, story.body)
          ),
          // Badge
          story.badge && React.createElement('div', {
            style: {
              marginInline: 16, marginBottom: 10, padding: '6px 12px',
              background: c.surface2, borderRadius: 8,
              display: 'flex', alignItems: 'center', gap: 6
            }
          },
            React.createElement(window.lucide.Award, { size: 13, color: '#F59E0B' }),
            React.createElement('span', { style: { fontFamily: 'Inter', fontSize: 11, color: c.textSecondary } }, 'Badge earned: '),
            React.createElement('span', { style: { fontFamily: 'Orbitron', fontSize: 11, fontWeight: 700, color: '#F59E0B' } }, story.badge)
          ),
          // Actions
          React.createElement('div', {
            style: {
              padding: '10px 16px', background: c.surface2,
              display: 'flex', gap: 20
            }
          },
            React.createElement('button', {
              onClick: () => setLiked(l => ({ ...l, [i]: !l[i] })),
              style: {
                display: 'flex', alignItems: 'center', gap: 6, border: 'none', background: 'none',
                cursor: 'pointer', color: liked[i] ? c.accent : c.textMuted,
                fontFamily: 'Inter', fontSize: 12, fontWeight: 600, transition: 'color 0.2s'
              }
            },
              React.createElement(window.lucide.Heart, { size: 15, fill: liked[i] ? c.accent : 'none' }),
              story.likes + (liked[i] ? 1 : 0)
            ),
            React.createElement('button', {
              style: {
                display: 'flex', alignItems: 'center', gap: 6, border: 'none', background: 'none',
                cursor: 'pointer', color: c.textMuted, fontFamily: 'Inter', fontSize: 12, fontWeight: 600
              }
            },
              React.createElement(window.lucide.MessageCircle, { size: 15 }),
              story.comments
            ),
            React.createElement('button', {
              style: {
                display: 'flex', alignItems: 'center', gap: 6, border: 'none', background: 'none',
                cursor: 'pointer', color: c.textMuted, fontFamily: 'Inter', fontSize: 12, fontWeight: 600,
                marginLeft: 'auto'
              }
            },
              React.createElement(window.lucide.Share2, { size: 15 }),
              'Share'
            )
          )
        ))
      )
    );
  }

  // ─── TREASURY SCREEN ─────────────────────────────────────────────────────
  function TreasuryScreen() {
    const badges = [
      { name: 'First Save', icon: '🌱', earned: true, desc: 'Made first contribution' },
      { name: 'Streak King', icon: '🔥', earned: true, desc: '30-day saving streak' },
      { name: 'Trailblazer', icon: '🚀', earned: true, desc: 'Hit $500 milestone' },
      { name: 'Resilience Star', icon: '⭐', earned: true, desc: 'Overcame emergency' },
      { name: 'Cash-Free Hero', icon: '🏆', earned: false, desc: 'Complete a cash-free week' },
      { name: 'Pot Unlocked', icon: '🔓', earned: false, desc: 'Unlock a group reward' },
      { name: 'Challenge Maker', icon: '⚡', earned: false, desc: 'Design a club challenge' },
      { name: 'Century Club', icon: '💯', earned: false, desc: 'Save $1,000 in a month' },
    ];

    const leaderboard = [
      { rank: 1, name: 'Priya K.', saved: '$2,140', club: 'Side Hustle Crew', avatar: 'PK' },
      { rank: 2, name: 'Alex M.', saved: '$1,890', club: 'House Hunters', avatar: 'AM', isMe: true },
      { rank: 3, name: 'James O.', saved: '$1,650', club: 'House Hunters', avatar: 'JO' },
      { rank: 4, name: 'Maya R.', saved: '$1,320', club: 'Debt Slayers', avatar: 'MR' },
      { rank: 5, name: 'Carlos T.', saved: '$980', club: 'Debt Slayers', avatar: 'CT' },
    ];

    const rankColors = ['#F59E0B', '#94A3B8', '#B45309'];

    return React.createElement('div', { style: { flex: 1, overflowY: 'auto', background: c.bg } },
      // Header with total pot
      React.createElement('div', {
        style: {
          padding: '20px', background: c.surface,
          borderBottom: `1px solid ${c.border}`
        }
      },
        React.createElement('h1', { style: { fontFamily: 'Orbitron', fontSize: 20, fontWeight: 800, color: c.text, marginBottom: 16 } }, 'TREASURY'),
        React.createElement('div', {
          style: {
            background: `linear-gradient(135deg, ${c.primary}22, ${c.accent}22)`,
            border: `1px solid ${c.primary}44`,
            borderRadius: 16, padding: '20px',
            textAlign: 'center'
          }
        },
          React.createElement('div', { style: { fontFamily: 'Inter', fontSize: 12, color: c.textMuted, letterSpacing: 1 } }, 'TOTAL POT VALUE'),
          React.createElement('div', {
            style: { fontFamily: 'Orbitron', fontSize: 36, fontWeight: 900, color: c.primary, marginBlock: 4 }
          }, '$11,230'),
          React.createElement('div', { style: { fontFamily: 'Inter', fontSize: 12, color: c.textSecondary } }, 'Across 3 active clubs · Updated 2h ago'),
          React.createElement('div', {
            style: { display: 'flex', justifyContent: 'center', gap: 20, marginTop: 14 }
          },
            [
              { label: 'My Savings', val: '$3,820', color: c.primary },
              { label: 'Pending Rewards', val: '$640', color: c.accent },
            ].map((s, i) => React.createElement('div', { key: i, style: { textAlign: 'center' } },
              React.createElement('div', { style: { fontFamily: 'Orbitron', fontSize: 15, fontWeight: 700, color: s.color } }, s.val),
              React.createElement('div', { style: { fontFamily: 'Inter', fontSize: 10, color: c.textMuted } }, s.label)
            ))
          )
        )
      ),

      // Leaderboard — horizontal scroll dials
      React.createElement('div', { style: { padding: '20px 0 8px', borderBottom: `1px solid ${c.border}` } },
        React.createElement('div', { style: { paddingInline: 20, marginBottom: 14 } },
          React.createElement('span', { style: { fontFamily: 'Orbitron', fontSize: 12, fontWeight: 700, color: c.text, letterSpacing: 1 } }, 'CLUB LEADERBOARD')
        ),
        // Top 3 dials
        React.createElement('div', {
          style: { display: 'flex', gap: 20, paddingInline: 20, overflowX: 'auto', marginBottom: 12 }
        },
          leaderboard.slice(0, 3).map((member, i) => React.createElement('div', {
            key: i,
            style: {
              minWidth: 90, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
              padding: '12px 8px',
              background: member.isMe ? `${c.primary}22` : c.surface,
              borderRadius: 14, border: `1px solid ${member.isMe ? c.primary : c.border}`
            }
          },
            React.createElement('div', {
              style: {
                fontFamily: 'Orbitron', fontSize: 16, fontWeight: 900,
                color: rankColors[i] || c.textMuted
              }
            }, `#${member.rank}`),
            React.createElement('div', {
              style: {
                width: 40, height: 40, borderRadius: 12,
                background: member.isMe ? c.primary : c.surface3,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'Orbitron', fontSize: 12, fontWeight: 700,
                color: member.isMe ? '#fff' : c.textSecondary
              }
            }, member.avatar),
            React.createElement('div', { style: { fontFamily: 'Orbitron', fontSize: 10, fontWeight: 700, color: c.text, textAlign: 'center' } }, member.name),
            React.createElement('div', { style: { fontFamily: 'Orbitron', fontSize: 11, fontWeight: 800, color: c.primary } }, member.saved)
          ))
        ),
        // Rest of list
        React.createElement('div', { style: { paddingInline: 20 } },
          leaderboard.slice(3).map((member, i) => React.createElement('div', {
            key: i,
            style: {
              display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0',
              borderBottom: `1px solid ${c.border}`
            }
          },
            React.createElement('div', { style: { fontFamily: 'Orbitron', fontSize: 13, fontWeight: 700, color: c.textMuted, width: 24 } }, `#${member.rank}`),
            React.createElement('div', {
              style: {
                width: 32, height: 32, borderRadius: 8,
                background: c.surface2, display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'Orbitron', fontSize: 10, fontWeight: 700, color: c.textSecondary
              }
            }, member.avatar),
            React.createElement('div', { style: { flex: 1, fontFamily: 'Inter', fontSize: 13, color: c.text } }, member.name),
            React.createElement('div', { style: { fontFamily: 'Orbitron', fontSize: 12, fontWeight: 700, color: c.primary } }, member.saved)
          ))
        )
      ),

      // Badges
      React.createElement('div', { style: { padding: '20px' } },
        React.createElement('h2', { style: { fontFamily: 'Orbitron', fontSize: 12, fontWeight: 700, color: c.text, letterSpacing: 1, marginBottom: 14 } }, 'ACHIEVEMENT BADGES'),
        React.createElement('div', {
          style: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }
        },
          badges.map((badge, i) => React.createElement('div', {
            key: i,
            style: {
              background: badge.earned ? c.surface : c.surface,
              borderRadius: 12, padding: '12px 8px', textAlign: 'center',
              border: `1px solid ${badge.earned ? c.primary + '66' : c.border}`,
              opacity: badge.earned ? 1 : 0.4,
            }
          },
            React.createElement('div', { style: { fontSize: 24, marginBottom: 6 } }, badge.icon),
            React.createElement('div', {
              style: { fontFamily: 'Orbitron', fontSize: 8, fontWeight: 700, color: badge.earned ? c.text : c.textMuted, lineHeight: 1.3 }
            }, badge.name)
          ))
        )
      )
    );
  }

  // ─── PROFILE SCREEN ──────────────────────────────────────────────────────
  function ProfileScreen() {
    const [notifications, setNotifications] = useState(true);
    const [weeklyDigest, setWeeklyDigest] = useState(true);

    function Toggle({ value, onChange }) {
      return React.createElement('div', {
        onClick: () => onChange(!value),
        style: {
          width: 44, height: 24, borderRadius: 12, cursor: 'pointer', position: 'relative',
          background: value ? c.primary : c.surface3, transition: 'background 0.2s',
          flexShrink: 0
        }
      },
        React.createElement('div', {
          style: {
            position: 'absolute', top: 3, left: value ? 23 : 3,
            width: 18, height: 18, borderRadius: '50%', background: '#fff',
            transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.3)'
          }
        })
      );
    }

    function SettingRow({ label, sublabel, children }) {
      return React.createElement('div', {
        style: {
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '14px 0', borderBottom: `1px solid ${c.border}`
        }
      },
        React.createElement('div', null,
          React.createElement('div', { style: { fontFamily: 'Inter', fontSize: 14, color: c.text, fontWeight: 500 } }, label),
          sublabel && React.createElement('div', { style: { fontFamily: 'Inter', fontSize: 11, color: c.textMuted, marginTop: 2 } }, sublabel)
        ),
        children
      );
    }

    return React.createElement('div', { style: { flex: 1, overflowY: 'auto', background: c.bg } },
      // Profile hero
      React.createElement('div', {
        style: { padding: '24px 20px 20px', background: c.surface, borderBottom: `1px solid ${c.border}` }
      },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 16 } },
          React.createElement('div', {
            style: {
              width: 72, height: 72, borderRadius: 20,
              background: `linear-gradient(135deg, ${c.primary}, ${c.accent})`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'Orbitron', fontSize: 28, fontWeight: 900, color: '#fff',
              border: `3px solid ${c.primaryLight}`,
            }
          }, 'A'),
          React.createElement('div', null,
            React.createElement('h2', {
              style: { fontFamily: 'Orbitron', fontSize: 18, fontWeight: 800, color: c.text }
            }, 'Alex Mercer'),
            React.createElement('div', { style: { fontFamily: 'Inter', fontSize: 12, color: c.accent, fontWeight: 600, marginTop: 4 } }, 'Challenge Coordinator'),
            React.createElement('div', { style: { fontFamily: 'Inter', fontSize: 12, color: c.textMuted, marginTop: 2 } }, 'Member since Jan 2025 · Level 7')
          )
        ),
        // Stats row
        React.createElement('div', {
          style: { display: 'flex', gap: 12, marginTop: 20 }
        },
          [
            { val: '3', label: 'Clubs' },
            { val: '14', label: 'Badges' },
            { val: '89', label: 'Day Streak' },
            { val: '$3.8K', label: 'Saved' },
          ].map((s, i) => React.createElement('div', {
            key: i,
            style: {
              flex: 1, textAlign: 'center', background: c.surface2,
              borderRadius: 10, padding: '10px 4px'
            }
          },
            React.createElement('div', { style: { fontFamily: 'Orbitron', fontSize: 13, fontWeight: 800, color: c.primary } }, s.val),
            React.createElement('div', { style: { fontFamily: 'Inter', fontSize: 10, color: c.textMuted, marginTop: 2 } }, s.label)
          ))
        )
      ),

      // Settings
      React.createElement('div', { style: { padding: '20px' } },
        React.createElement('h2', { style: { fontFamily: 'Orbitron', fontSize: 12, fontWeight: 700, color: c.textMuted, letterSpacing: 1, marginBottom: 4 } }, 'PREFERENCES'),
        React.createElement(SettingRow, { label: 'Dark Mode', sublabel: 'Toggle app theme' },
          React.createElement(Toggle, { value: theme === 'dark', onChange: (v) => setTheme(v ? 'dark' : 'light') })
        ),
        React.createElement(SettingRow, { label: 'Push Notifications', sublabel: 'Challenge updates & wins' },
          React.createElement(Toggle, { value: notifications, onChange: setNotifications })
        ),
        React.createElement(SettingRow, { label: 'Weekly Digest', sublabel: 'Every Monday morning' },
          React.createElement(Toggle, { value: weeklyDigest, onChange: setWeeklyDigest })
        ),
        React.createElement('h2', {
          style: { fontFamily: 'Orbitron', fontSize: 12, fontWeight: 700, color: c.textMuted, letterSpacing: 1, marginTop: 20, marginBottom: 4 }
        }, 'ACCOUNT'),
        [
          { label: 'Edit Profile', icon: window.lucide.Pencil },
          { label: 'Linked Bank Accounts', icon: window.lucide.Landmark },
          { label: 'Privacy Settings', icon: window.lucide.Shield },
          { label: 'Help & Support', icon: window.lucide.HelpCircle },
          { label: 'Invite Friends', icon: window.lucide.UserPlus },
        ].map((item, i) => React.createElement('div', {
          key: i,
          style: {
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '14px 0', borderBottom: `1px solid ${c.border}`, cursor: 'pointer'
          }
        },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12 } },
            React.createElement(item.icon, { size: 16, color: c.textSecondary }),
            React.createElement('span', { style: { fontFamily: 'Inter', fontSize: 14, color: c.text } }, item.label)
          ),
          React.createElement(window.lucide.ChevronRight, { size: 16, color: c.textMuted })
        )),
        React.createElement('button', {
          style: {
            marginTop: 24, width: '100%', padding: '14px',
            background: 'transparent', border: `1px solid ${c.accent}44`,
            borderRadius: 12, cursor: 'pointer', fontFamily: 'Orbitron', fontSize: 12,
            fontWeight: 700, color: c.accent, letterSpacing: 1
          }
        }, 'SIGN OUT')
      )
    );
  }

  const screens = {
    home: HomeScreen,
    challenges: ChallengesScreen,
    stories: StoriesScreen,
    treasury: TreasuryScreen,
    profile: ProfileScreen,
  };

  const ActiveScreen = screens[activeTab];

  return React.createElement('div', {
    style: { minHeight: '100vh', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }
  },
    React.createElement('style', null, styleTag),
    // Phone frame
    React.createElement('div', {
      style: {
        width: 375, height: 812, background: c.bg,
        borderRadius: 48, overflow: 'hidden', position: 'relative',
        boxShadow: '0 40px 80px rgba(0,0,0,0.4), 0 0 0 8px #1a1a1a, 0 0 0 9px #333',
        display: 'flex', flexDirection: 'column',
      }
    },
      // Status bar
      React.createElement('div', {
        style: {
          height: 44, background: c.surface, display: 'flex',
          alignItems: 'center', justifyContent: 'space-between',
          paddingInline: 28, paddingTop: 8, flexShrink: 0, zIndex: 10
        }
      },
        React.createElement('span', { style: { fontFamily: 'Orbitron', fontSize: 11, fontWeight: 700, color: c.text } }, '9:41'),
        // Dynamic Island
        React.createElement('div', {
          style: {
            width: 120, height: 34, background: '#000', borderRadius: 20,
            position: 'absolute', left: '50%', transform: 'translateX(-50%)',
            top: 0
          }
        }),
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 5 } },
          React.createElement(window.lucide.Wifi, { size: 13, color: c.text }),
          React.createElement(window.lucide.Battery, { size: 16, color: c.text })
        )
      ),

      // Screen content
      React.createElement('div', { style: { flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' } },
        React.createElement(ActiveScreen)
      ),

      // Bottom nav
      React.createElement('div', {
        style: {
          height: 72, background: c.navBg,
          borderTop: `1px solid ${c.border}`,
          display: 'flex', alignItems: 'center',
          paddingBottom: 8, flexShrink: 0,
          boxShadow: `0 -4px 20px rgba(0,0,0,0.15)`
        }
      },
        tabs.map(tab => React.createElement('div', {
          key: tab.id,
          onClick: () => setActiveTab(tab.id),
          style: {
            flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center', gap: 4, cursor: 'pointer', paddingTop: 6,
            transition: 'all 0.2s'
          }
        },
          React.createElement('div', {
            style: {
              width: 36, height: 28, borderRadius: 10,
              background: activeTab === tab.id ? `${c.primary}33` : 'transparent',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s'
            }
          },
            React.createElement(tab.icon, {
              size: 20,
              color: activeTab === tab.id ? c.primary : c.textMuted,
            })
          ),
          React.createElement('span', {
            style: {
              fontFamily: 'Orbitron', fontSize: 8, fontWeight: 600,
              color: activeTab === tab.id ? c.primary : c.textMuted,
              letterSpacing: 0.3
            }
          }, tab.label)
        ))
      )
    )
  );
}
