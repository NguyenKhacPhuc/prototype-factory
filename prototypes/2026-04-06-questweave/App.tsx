const { useState, useEffect, useRef, useCallback } = React;

function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [isDark, setIsDark] = useState(false);
  const [selectedQuest, setSelectedQuest] = useState(null);
  const [selectedClub, setSelectedClub] = useState(null);
  const [showQuestDetail, setShowQuestDetail] = useState(false);
  const [showClubDetail, setShowClubDetail] = useState(false);
  const [showNewLogEntry, setShowNewLogEntry] = useState(false);
  const [animateIn, setAnimateIn] = useState(true);

  const themes = {
    light: {
      primary: '#18181B',
      secondary: '#3F3F46',
      cta: '#2563EB',
      bg: '#FAFAFA',
      card: '#FFFFFF',
      cardBorder: '#E4E4E7',
      subtle: '#F4F4F5',
      textPrimary: '#18181B',
      textSecondary: '#71717A',
      textTertiary: '#A1A1AA',
      tabBg: '#FFFFFF',
      tabBorder: '#E4E4E7',
      progressBg: '#E4E4E7',
      badgeBg: '#EFF6FF',
      badgeText: '#2563EB',
      dangerBg: '#FEF2F2',
      dangerText: '#DC2626',
      successBg: '#F0FDF4',
      successText: '#16A34A',
      overlay: 'rgba(0,0,0,0.5)',
    },
    dark: {
      primary: '#FAFAFA',
      secondary: '#D4D4D8',
      cta: '#3B82F6',
      bg: '#09090B',
      card: '#18181B',
      cardBorder: '#27272A',
      subtle: '#27272A',
      textPrimary: '#FAFAFA',
      textSecondary: '#A1A1AA',
      textTertiary: '#71717A',
      tabBg: '#18181B',
      tabBorder: '#27272A',
      progressBg: '#27272A',
      badgeBg: '#172554',
      badgeText: '#60A5FA',
      dangerBg: '#450A0A',
      dangerText: '#FCA5A5',
      successBg: '#052E16',
      successText: '#86EFAC',
      overlay: 'rgba(0,0,0,0.7)',
    },
  };

  const t = isDark ? themes.dark : themes.light;
  const font = "-apple-system, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif";

  useEffect(() => {
    setAnimateIn(true);
    const timer = setTimeout(() => setAnimateIn(false), 400);
    return () => clearTimeout(timer);
  }, [activeScreen]);

  const styleTag = React.createElement('style', null, `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(12px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(100%); }
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
    @keyframes progressFill {
      from { width: 0%; }
      to { width: var(--target-width); }
    }
    @keyframes scaleIn {
      from { opacity: 0; transform: scale(0.9); }
      to { opacity: 1; transform: scale(1); }
    }
    * { -webkit-tap-highlight-color: transparent; }
    *::-webkit-scrollbar { width: 0; height: 0; }
  `);

  // Icon helper
  const Icon = ({ name, size = 24, color = t.primary, strokeWidth = 2 }) => {
    const IconComponent = window.lucide && window.lucide[name];
    if (!IconComponent) return null;
    return React.createElement(IconComponent, { size, color, strokeWidth });
  };

  // Data
  const quests = [
    {
      id: 1,
      title: 'The Dream Home Haven',
      description: 'Building towards our forever home with a garden and studio space.',
      progress: 67,
      target: '$85,000',
      current: '$56,950',
      color: '#2563EB',
      gradient: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
      members: 4,
      milestones: 8,
      completedMilestones: 5,
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=200&fit=crop',
      logEntries: [
        { author: 'Sarah M.', text: 'Just hit our emergency fund target! Moving all extra savings to the house fund now.', time: '2h ago', reactions: 12 },
        { author: 'You', text: 'Found an amazing neighborhood with great schools. Scheduled 3 viewings for next weekend!', time: '1d ago', reactions: 8 },
      ],
    },
    {
      id: 2,
      title: 'Legacy Builder Journey',
      description: 'Creating generational wealth through diversified investments.',
      progress: 34,
      target: '$250,000',
      current: '$85,000',
      color: '#16A34A',
      gradient: 'linear-gradient(135deg, #16A34A 0%, #059669 100%)',
      members: 3,
      milestones: 12,
      completedMilestones: 4,
      image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400&h=200&fit=crop',
      logEntries: [
        { author: 'Marcus T.', text: 'Portfolio rebalanced this quarter. Index funds are performing above expectations.', time: '5h ago', reactions: 6 },
      ],
    },
    {
      id: 3,
      title: 'Freedom Fund Sprint',
      description: 'Achieving financial independence by 45 through aggressive saving.',
      progress: 52,
      target: '$500,000',
      current: '$260,000',
      color: '#DC2626',
      gradient: 'linear-gradient(135deg, #DC2626 0%, #EA580C 100%)',
      members: 5,
      milestones: 10,
      completedMilestones: 5,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=200&fit=crop',
      logEntries: [],
    },
  ];

  const clubs = [
    { id: 1, name: 'First-Time Homebuyers', members: 4, activity: 'Very Active', theme: 'Housing', icon: 'Home', color: '#2563EB' },
    { id: 2, name: 'Early Retirement Sprints', members: 3, activity: 'Active', theme: 'FIRE', icon: 'Flame', color: '#DC2626' },
    { id: 3, name: 'Side Hustle Savers', members: 5, activity: 'Active', theme: 'Income', icon: 'TrendingUp', color: '#16A34A' },
    { id: 4, name: 'Debt-Free Warriors', members: 4, activity: 'Moderate', theme: 'Debt', icon: 'Shield', color: '#7C3AED' },
  ];

  const achievements = [
    { id: 1, title: 'First Milestone', description: 'Reached your first quest milestone', icon: 'Star', unlocked: true, color: '#EAB308' },
    { id: 2, title: 'Club Founder', description: 'Created your first Quest Club', icon: 'Users', unlocked: true, color: '#2563EB' },
    { id: 3, title: '10K Saved', description: 'Saved your first $10,000', icon: 'Banknote', unlocked: true, color: '#16A34A' },
    { id: 4, title: 'Streak Master', description: '30-day logging streak', icon: 'Zap', unlocked: false, color: '#A1A1AA' },
    { id: 5, title: 'Quest Completer', description: 'Complete your first quest', icon: 'Trophy', unlocked: false, color: '#A1A1AA' },
    { id: 6, title: 'Mentor Badge', description: 'Help 5 club members', icon: 'Heart', unlocked: false, color: '#A1A1AA' },
  ];

  const feedItems = [
    { id: 1, author: 'Sarah M.', club: 'First-Time Homebuyers', text: 'Just toured the most amazing house in Maplewood! The backyard is perfect for our dogs. Saving momentum is real!', time: '2h ago', reactions: 12, comments: 4, type: 'logbook' },
    { id: 2, author: 'Marcus T.', club: 'Early Retirement Sprints', text: 'Hit a huge milestone today — crossed $100K in my investment portfolio! Started from $0 just 3 years ago.', time: '5h ago', reactions: 24, comments: 8, type: 'achievement' },
    { id: 3, author: 'Priya K.', club: 'Side Hustle Savers', text: 'My freelance design work brought in an extra $2,400 this month. All going straight to the freedom fund.', time: '1d ago', reactions: 18, comments: 6, type: 'logbook' },
  ];

  // Shared styles
  const cardStyle = {
    background: t.card,
    borderRadius: 16,
    border: `1px solid ${t.cardBorder}`,
    overflow: 'hidden',
    transition: 'transform 150ms ease, box-shadow 200ms ease',
  };

  const buttonStyle = {
    background: t.cta,
    color: '#FFFFFF',
    border: 'none',
    borderRadius: 12,
    padding: '14px 24px',
    fontFamily: font,
    fontSize: 17,
    fontWeight: 600,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    minHeight: 48,
    transition: 'transform 150ms ease, opacity 150ms ease',
    width: '100%',
  };

  const sectionTitle = {
    fontFamily: font,
    fontSize: 22,
    fontWeight: 700,
    color: t.textPrimary,
    letterSpacing: -0.5,
    margin: 0,
  };

  // Progress Bar Component
  const ProgressBar = ({ progress, color, height = 8 }) => {
    return React.createElement('div', {
      style: { background: t.progressBg, borderRadius: height / 2, height, width: '100%', overflow: 'hidden' },
    },
      React.createElement('div', {
        style: {
          height: '100%',
          width: `${progress}%`,
          background: color || t.cta,
          borderRadius: height / 2,
          transition: 'width 600ms ease',
        },
      })
    );
  };

  // Avatar Component
  const Avatar = ({ name, size = 32, color = t.cta }) => {
    const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2);
    return React.createElement('div', {
      style: {
        width: size,
        height: size,
        borderRadius: size / 2,
        background: color,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#FFFFFF',
        fontSize: size * 0.4,
        fontWeight: 600,
        fontFamily: font,
        flexShrink: 0,
      },
    }, initials);
  };

  // HOME SCREEN
  const HomeScreen = () => {
    const activeQuest = quests[0];
    return React.createElement('div', {
      style: { padding: '20px 20px 24px', animation: 'fadeIn 400ms ease' },
    },
      // Header
      React.createElement('div', {
        style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 },
      },
        React.createElement('div', null,
          React.createElement('p', {
            style: { fontFamily: font, fontSize: 15, color: t.textSecondary, margin: '0 0 4px', fontWeight: 400 },
          }, 'Good morning'),
          React.createElement('h1', {
            style: { fontFamily: font, fontSize: 34, fontWeight: 800, color: t.textPrimary, margin: 0, letterSpacing: -0.5 },
          }, 'Your Quests')
        ),
        React.createElement('div', { style: { display: 'flex', gap: 12, alignItems: 'center' } },
          React.createElement('button', {
            onClick: () => setIsDark(!isDark),
            style: {
              background: t.subtle,
              border: 'none',
              borderRadius: 12,
              width: 44,
              height: 44,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            },
          }, React.createElement(Icon, { name: isDark ? 'Sun' : 'Moon', size: 20, color: t.textSecondary })),
          React.createElement('button', {
            style: {
              background: t.subtle,
              border: 'none',
              borderRadius: 12,
              width: 44,
              height: 44,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              position: 'relative',
            },
          },
            React.createElement(Icon, { name: 'Bell', size: 20, color: t.textSecondary }),
            React.createElement('div', {
              style: {
                position: 'absolute',
                top: 10,
                right: 10,
                width: 8,
                height: 8,
                borderRadius: 4,
                background: '#DC2626',
              },
            })
          )
        )
      ),

      // Active Quest Card (Hero)
      React.createElement('div', {
        style: {
          ...cardStyle,
          marginBottom: 24,
          cursor: 'pointer',
          position: 'relative',
        },
        onClick: () => {
          setSelectedQuest(activeQuest);
          setShowQuestDetail(true);
        },
      },
        React.createElement('div', {
          style: {
            height: 140,
            background: activeQuest.gradient,
            position: 'relative',
            display: 'flex',
            alignItems: 'flex-end',
            padding: 20,
          },
        },
          React.createElement('div', {
            style: {
              position: 'absolute',
              top: 12,
              right: 12,
              background: 'rgba(255,255,255,0.2)',
              backdropFilter: 'blur(10px)',
              borderRadius: 8,
              padding: '6px 12px',
              display: 'flex',
              alignItems: 'center',
              gap: 4,
            },
          },
            React.createElement(Icon, { name: 'Users', size: 14, color: '#FFFFFF' }),
            React.createElement('span', {
              style: { fontFamily: font, fontSize: 13, color: '#FFFFFF', fontWeight: 600 },
            }, `${activeQuest.members} members`)
          ),
          React.createElement('h2', {
            style: { fontFamily: font, fontSize: 22, fontWeight: 700, color: '#FFFFFF', margin: 0, letterSpacing: -0.3 },
          }, activeQuest.title)
        ),
        React.createElement('div', { style: { padding: 20 } },
          React.createElement('p', {
            style: { fontFamily: font, fontSize: 15, color: t.textSecondary, margin: '0 0 16px', lineHeight: 1.4 },
          }, activeQuest.description),
          React.createElement('div', {
            style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
          },
            React.createElement('span', {
              style: { fontFamily: font, fontSize: 13, fontWeight: 600, color: t.textSecondary },
            }, `${activeQuest.current} of ${activeQuest.target}`),
            React.createElement('span', {
              style: { fontFamily: font, fontSize: 15, fontWeight: 700, color: activeQuest.color },
            }, `${activeQuest.progress}%`)
          ),
          React.createElement(ProgressBar, { progress: activeQuest.progress, color: activeQuest.color, height: 10 }),
          React.createElement('div', {
            style: { display: 'flex', gap: 12, marginTop: 16 },
          },
            React.createElement('div', {
              style: { display: 'flex', alignItems: 'center', gap: 6 },
            },
              React.createElement(Icon, { name: 'Flag', size: 14, color: t.textTertiary }),
              React.createElement('span', {
                style: { fontFamily: font, fontSize: 13, color: t.textSecondary },
              }, `${activeQuest.completedMilestones}/${activeQuest.milestones} milestones`)
            ),
            React.createElement('div', {
              style: { display: 'flex', alignItems: 'center', gap: 6 },
            },
              React.createElement(Icon, { name: 'BookOpen', size: 14, color: t.textTertiary }),
              React.createElement('span', {
                style: { fontFamily: font, fontSize: 13, color: t.textSecondary },
              }, `${activeQuest.logEntries.length} log entries`)
            )
          )
        )
      ),

      // Other Quests
      React.createElement('div', {
        style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
      },
        React.createElement('h3', { style: sectionTitle }, 'All Quests'),
        React.createElement('button', {
          style: {
            background: t.cta,
            border: 'none',
            borderRadius: 10,
            padding: '8px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            cursor: 'pointer',
            minHeight: 44,
          },
        },
          React.createElement(Icon, { name: 'Plus', size: 16, color: '#FFFFFF' }),
          React.createElement('span', {
            style: { fontFamily: font, fontSize: 15, fontWeight: 600, color: '#FFFFFF' },
          }, 'New Quest')
        )
      ),

      ...quests.slice(1).map((quest, i) =>
        React.createElement('div', {
          key: quest.id,
          style: {
            ...cardStyle,
            marginBottom: 12,
            padding: 16,
            display: 'flex',
            gap: 16,
            alignItems: 'center',
            cursor: 'pointer',
            animation: `fadeIn ${300 + i * 100}ms ease`,
          },
          onClick: () => {
            setSelectedQuest(quest);
            setShowQuestDetail(true);
          },
        },
          React.createElement('div', {
            style: {
              width: 56,
              height: 56,
              borderRadius: 14,
              background: quest.gradient,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            },
          }, React.createElement(Icon, { name: 'Target', size: 24, color: '#FFFFFF' })),
          React.createElement('div', { style: { flex: 1, minWidth: 0 } },
            React.createElement('h4', {
              style: { fontFamily: font, fontSize: 17, fontWeight: 600, color: t.textPrimary, margin: '0 0 4px' },
            }, quest.title),
            React.createElement('p', {
              style: { fontFamily: font, fontSize: 13, color: t.textSecondary, margin: '0 0 8px' },
            }, `${quest.current} of ${quest.target}`),
            React.createElement(ProgressBar, { progress: quest.progress, color: quest.color })
          ),
          React.createElement('span', {
            style: { fontFamily: font, fontSize: 17, fontWeight: 700, color: quest.color, flexShrink: 0 },
          }, `${quest.progress}%`)
        )
      ),

      // Quick Stats
      React.createElement('div', {
        style: { display: 'flex', gap: 12, marginTop: 20 },
      },
        ...[
          { label: 'Total Saved', value: '$401,950', icon: 'Wallet', color: '#2563EB' },
          { label: 'Active Clubs', value: '3', icon: 'Users', color: '#16A34A' },
        ].map((stat, i) =>
          React.createElement('div', {
            key: i,
            style: {
              ...cardStyle,
              flex: 1,
              padding: 16,
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
            },
          },
            React.createElement('div', {
              style: {
                width: 40,
                height: 40,
                borderRadius: 10,
                background: isDark ? `${stat.color}22` : `${stat.color}11`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              },
            }, React.createElement(Icon, { name: stat.icon, size: 20, color: stat.color })),
            React.createElement('div', null,
              React.createElement('p', {
                style: { fontFamily: font, fontSize: 13, color: t.textSecondary, margin: '0 0 2px' },
              }, stat.label),
              React.createElement('p', {
                style: { fontFamily: font, fontSize: 22, fontWeight: 700, color: t.textPrimary, margin: 0, letterSpacing: -0.5 },
              }, stat.value)
            )
          )
        )
      )
    );
  };

  // CLUBS SCREEN
  const ClubsScreen = () => {
    return React.createElement('div', {
      style: { padding: '20px 20px 24px', animation: 'fadeIn 400ms ease' },
    },
      React.createElement('div', {
        style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
      },
        React.createElement('h1', {
          style: { fontFamily: font, fontSize: 34, fontWeight: 800, color: t.textPrimary, margin: 0, letterSpacing: -0.5 },
        }, 'Quest Clubs'),
        React.createElement('button', {
          style: {
            background: t.cta,
            border: 'none',
            borderRadius: 10,
            padding: '8px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            cursor: 'pointer',
            minHeight: 44,
          },
        },
          React.createElement(Icon, { name: 'Plus', size: 16, color: '#FFFFFF' }),
          React.createElement('span', {
            style: { fontFamily: font, fontSize: 15, fontWeight: 600, color: '#FFFFFF' },
          }, 'Create')
        )
      ),

      // Search
      React.createElement('div', {
        style: {
          background: t.subtle,
          borderRadius: 12,
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          marginBottom: 24,
        },
      },
        React.createElement(Icon, { name: 'Search', size: 18, color: t.textTertiary }),
        React.createElement('span', {
          style: { fontFamily: font, fontSize: 17, color: t.textTertiary },
        }, 'Search clubs...')
      ),

      // My Clubs
      React.createElement('h3', {
        style: { ...sectionTitle, fontSize: 17, marginBottom: 16 },
      }, 'My Clubs'),

      ...clubs.slice(0, 3).map((club, i) =>
        React.createElement('div', {
          key: club.id,
          style: {
            ...cardStyle,
            padding: 16,
            marginBottom: 12,
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            cursor: 'pointer',
            animation: `fadeIn ${300 + i * 100}ms ease`,
          },
          onClick: () => {
            setSelectedClub(club);
            setShowClubDetail(true);
          },
        },
          React.createElement('div', {
            style: {
              width: 52,
              height: 52,
              borderRadius: 14,
              background: `${club.color}15`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            },
          }, React.createElement(Icon, { name: club.icon, size: 24, color: club.color })),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('h4', {
              style: { fontFamily: font, fontSize: 17, fontWeight: 600, color: t.textPrimary, margin: '0 0 4px' },
            }, club.name),
            React.createElement('div', {
              style: { display: 'flex', alignItems: 'center', gap: 8 },
            },
              React.createElement('span', {
                style: { fontFamily: font, fontSize: 13, color: t.textSecondary },
              }, `${club.members} members`),
              React.createElement('div', {
                style: { width: 4, height: 4, borderRadius: 2, background: t.textTertiary },
              }),
              React.createElement('span', {
                style: {
                  fontFamily: font,
                  fontSize: 13,
                  color: club.activity === 'Very Active' ? t.successText : t.textSecondary,
                  fontWeight: club.activity === 'Very Active' ? 600 : 400,
                },
              }, club.activity)
            )
          ),
          React.createElement(Icon, { name: 'ChevronRight', size: 20, color: t.textTertiary })
        )
      ),

      // Discover
      React.createElement('h3', {
        style: { ...sectionTitle, fontSize: 17, marginTop: 28, marginBottom: 16 },
      }, 'Discover Clubs'),

      React.createElement('div', {
        style: {
          ...cardStyle,
          padding: 16,
          marginBottom: 12,
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          cursor: 'pointer',
        },
      },
        React.createElement('div', {
          style: {
            width: 52,
            height: 52,
            borderRadius: 14,
            background: `${clubs[3].color}15`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          },
        }, React.createElement(Icon, { name: clubs[3].icon, size: 24, color: clubs[3].color })),
        React.createElement('div', { style: { flex: 1 } },
          React.createElement('h4', {
            style: { fontFamily: font, fontSize: 17, fontWeight: 600, color: t.textPrimary, margin: '0 0 4px' },
          }, clubs[3].name),
          React.createElement('div', {
            style: { display: 'flex', alignItems: 'center', gap: 8 },
          },
            React.createElement('span', {
              style: { fontFamily: font, fontSize: 13, color: t.textSecondary },
            }, `${clubs[3].members} members`),
            React.createElement('div', {
              style: { width: 4, height: 4, borderRadius: 2, background: t.textTertiary },
            }),
            React.createElement('span', {
              style: { fontFamily: font, fontSize: 13, color: t.textSecondary },
            }, clubs[3].theme)
          )
        ),
        React.createElement('button', {
          style: {
            background: `${t.cta}15`,
            border: 'none',
            borderRadius: 10,
            padding: '8px 16px',
            cursor: 'pointer',
            minHeight: 44,
          },
        },
          React.createElement('span', {
            style: { fontFamily: font, fontSize: 15, fontWeight: 600, color: t.cta },
          }, 'Join')
        )
      ),

      // Club Stats
      React.createElement('div', {
        style: {
          ...cardStyle,
          padding: 20,
          marginTop: 20,
          background: isDark ? '#18181B' : '#F8FAFC',
        },
      },
        React.createElement('h4', {
          style: { fontFamily: font, fontSize: 17, fontWeight: 600, color: t.textPrimary, margin: '0 0 16px' },
        }, 'Your Club Activity'),
        ...[
          { label: 'Logbook entries this week', value: '7', icon: 'BookOpen' },
          { label: 'Comments given', value: '14', icon: 'MessageCircle' },
          { label: 'Reactions received', value: '42', icon: 'Heart' },
        ].map((item, i) =>
          React.createElement('div', {
            key: i,
            style: {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 0',
              borderBottom: i < 2 ? `1px solid ${t.cardBorder}` : 'none',
            },
          },
            React.createElement('div', {
              style: { display: 'flex', alignItems: 'center', gap: 10 },
            },
              React.createElement(Icon, { name: item.icon, size: 18, color: t.textSecondary }),
              React.createElement('span', {
                style: { fontFamily: font, fontSize: 15, color: t.textSecondary },
              }, item.label)
            ),
            React.createElement('span', {
              style: { fontFamily: font, fontSize: 17, fontWeight: 700, color: t.textPrimary },
            }, item.value)
          )
        )
      )
    );
  };

  // FEED SCREEN
  const FeedScreen = () => {
    const [activeTab, setActiveTab] = useState('all');

    return React.createElement('div', {
      style: { padding: '20px 20px 24px', animation: 'fadeIn 400ms ease' },
    },
      React.createElement('h1', {
        style: { fontFamily: font, fontSize: 34, fontWeight: 800, color: t.textPrimary, margin: '0 0 20px', letterSpacing: -0.5 },
      }, 'Logbook'),

      // Tabs
      React.createElement('div', {
        style: {
          display: 'flex',
          gap: 8,
          marginBottom: 24,
        },
      },
        ...['all', 'logbook', 'achievements'].map(tab =>
          React.createElement('button', {
            key: tab,
            onClick: () => setActiveTab(tab),
            style: {
              background: activeTab === tab ? t.cta : t.subtle,
              color: activeTab === tab ? '#FFFFFF' : t.textSecondary,
              border: 'none',
              borderRadius: 10,
              padding: '10px 18px',
              fontFamily: font,
              fontSize: 15,
              fontWeight: 600,
              cursor: 'pointer',
              minHeight: 44,
              transition: 'all 200ms ease',
              textTransform: 'capitalize',
            },
          }, tab)
        )
      ),

      // New Entry Button
      React.createElement('button', {
        onClick: () => setShowNewLogEntry(true),
        style: {
          ...buttonStyle,
          marginBottom: 20,
          background: 'transparent',
          border: `2px dashed ${t.cardBorder}`,
          color: t.textSecondary,
        },
      },
        React.createElement(Icon, { name: 'PenLine', size: 18, color: t.textSecondary }),
        'Write a logbook entry'
      ),

      // Feed Items
      ...feedItems
        .filter(item => activeTab === 'all' || item.type === activeTab)
        .map((item, i) =>
          React.createElement('div', {
            key: item.id,
            style: {
              ...cardStyle,
              padding: 20,
              marginBottom: 16,
              animation: `fadeIn ${300 + i * 100}ms ease`,
            },
          },
            // Header
            React.createElement('div', {
              style: { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 },
            },
              React.createElement(Avatar, { name: item.author, size: 40, color: item.type === 'achievement' ? '#EAB308' : t.cta }),
              React.createElement('div', { style: { flex: 1 } },
                React.createElement('div', {
                  style: { display: 'flex', alignItems: 'center', gap: 8 },
                },
                  React.createElement('span', {
                    style: { fontFamily: font, fontSize: 17, fontWeight: 600, color: t.textPrimary },
                  }, item.author),
                  item.type === 'achievement' && React.createElement('div', {
                    style: {
                      background: '#FEF9C3',
                      borderRadius: 6,
                      padding: '2px 8px',
                    },
                  },
                    React.createElement('span', {
                      style: { fontFamily: font, fontSize: 11, fontWeight: 700, color: '#A16207' },
                    }, 'MILESTONE')
                  )
                ),
                React.createElement('span', {
                  style: { fontFamily: font, fontSize: 13, color: t.textTertiary },
                }, `${item.club} · ${item.time}`)
              )
            ),

            // Content
            React.createElement('p', {
              style: { fontFamily: font, fontSize: 17, color: t.textPrimary, margin: '0 0 16px', lineHeight: 1.5 },
            }, item.text),

            // Actions
            React.createElement('div', {
              style: { display: 'flex', gap: 24, alignItems: 'center' },
            },
              React.createElement('button', {
                style: {
                  background: 'none',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  cursor: 'pointer',
                  padding: '8px 0',
                  minHeight: 44,
                },
              },
                React.createElement(Icon, { name: 'Heart', size: 18, color: t.textTertiary }),
                React.createElement('span', {
                  style: { fontFamily: font, fontSize: 13, color: t.textSecondary },
                }, item.reactions)
              ),
              React.createElement('button', {
                style: {
                  background: 'none',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  cursor: 'pointer',
                  padding: '8px 0',
                  minHeight: 44,
                },
              },
                React.createElement(Icon, { name: 'MessageCircle', size: 18, color: t.textTertiary }),
                React.createElement('span', {
                  style: { fontFamily: font, fontSize: 13, color: t.textSecondary },
                }, item.comments)
              ),
              React.createElement('button', {
                style: {
                  background: 'none',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  cursor: 'pointer',
                  padding: '8px 0',
                  minHeight: 44,
                  marginLeft: 'auto',
                },
              },
                React.createElement(Icon, { name: 'Bookmark', size: 18, color: t.textTertiary })
              )
            )
          )
        )
    );
  };

  // MAP SCREEN
  const MapScreen = () => {
    const quest = quests[0];
    const milestones = [
      { id: 1, title: 'Emergency Fund', amount: '$5,000', complete: true, y: 0 },
      { id: 2, title: 'Debt Cleared', amount: '$12,000', complete: true, y: 1 },
      { id: 3, title: 'Down Payment 25%', amount: '$21,250', complete: true, y: 2 },
      { id: 4, title: 'Pre-Approval', amount: '$35,000', complete: true, y: 3 },
      { id: 5, title: 'House Hunting', amount: '$42,500', complete: true, y: 4 },
      { id: 6, title: 'Offer Ready', amount: '$56,950', complete: false, y: 5, current: true },
      { id: 7, title: 'Closing Costs', amount: '$70,000', complete: false, y: 6 },
      { id: 8, title: 'Dream Home!', amount: '$85,000', complete: false, y: 7 },
    ];

    return React.createElement('div', {
      style: { padding: '20px 20px 24px', animation: 'fadeIn 400ms ease' },
    },
      React.createElement('h1', {
        style: { fontFamily: font, fontSize: 34, fontWeight: 800, color: t.textPrimary, margin: '0 0 8px', letterSpacing: -0.5 },
      }, 'Quest Map'),
      React.createElement('p', {
        style: { fontFamily: font, fontSize: 15, color: t.textSecondary, margin: '0 0 24px' },
      }, quest.title),

      // Progress Summary
      React.createElement('div', {
        style: {
          ...cardStyle,
          padding: 20,
          marginBottom: 24,
          background: quest.gradient,
        },
      },
        React.createElement('div', {
          style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
        },
          React.createElement('span', {
            style: { fontFamily: font, fontSize: 15, color: 'rgba(255,255,255,0.8)', fontWeight: 500 },
          }, 'Overall Progress'),
          React.createElement('span', {
            style: { fontFamily: font, fontSize: 34, fontWeight: 800, color: '#FFFFFF', letterSpacing: -0.5 },
          }, `${quest.progress}%`)
        ),
        React.createElement('div', {
          style: { background: 'rgba(255,255,255,0.3)', borderRadius: 5, height: 10, overflow: 'hidden' },
        },
          React.createElement('div', {
            style: {
              height: '100%',
              width: `${quest.progress}%`,
              background: '#FFFFFF',
              borderRadius: 5,
              transition: 'width 600ms ease',
            },
          })
        ),
        React.createElement('div', {
          style: { display: 'flex', justifyContent: 'space-between', marginTop: 12 },
        },
          React.createElement('span', {
            style: { fontFamily: font, fontSize: 13, color: 'rgba(255,255,255,0.8)' },
          }, quest.current),
          React.createElement('span', {
            style: { fontFamily: font, fontSize: 13, color: 'rgba(255,255,255,0.8)' },
          }, quest.target)
        )
      ),

      // Milestones Path
      React.createElement('h3', {
        style: { ...sectionTitle, fontSize: 17, marginBottom: 20 },
      }, 'Milestones'),

      ...milestones.map((ms, i) =>
        React.createElement('div', {
          key: ms.id,
          style: {
            display: 'flex',
            gap: 16,
            marginBottom: i < milestones.length - 1 ? 0 : 0,
            animation: `fadeIn ${300 + i * 80}ms ease`,
          },
        },
          // Line and dot
          React.createElement('div', {
            style: {
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: 32,
              flexShrink: 0,
            },
          },
            React.createElement('div', {
              style: {
                width: ms.current ? 20 : 16,
                height: ms.current ? 20 : 16,
                borderRadius: '50%',
                background: ms.complete ? quest.color : ms.current ? quest.color : t.progressBg,
                border: ms.current ? `3px solid ${quest.color}` : 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: ms.current ? `0 0 0 4px ${quest.color}33` : 'none',
                animation: ms.current ? 'pulse 2s infinite' : 'none',
                flexShrink: 0,
              },
            },
              ms.complete && React.createElement(Icon, { name: 'Check', size: 10, color: '#FFFFFF', strokeWidth: 3 })
            ),
            i < milestones.length - 1 && React.createElement('div', {
              style: {
                width: 2,
                flex: 1,
                minHeight: 40,
                background: ms.complete ? quest.color : t.progressBg,
              },
            })
          ),

          // Content
          React.createElement('div', {
            style: {
              flex: 1,
              paddingBottom: i < milestones.length - 1 ? 20 : 0,
            },
          },
            React.createElement('div', {
              style: {
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              },
            },
              React.createElement('span', {
                style: {
                  fontFamily: font,
                  fontSize: 17,
                  fontWeight: ms.current ? 700 : ms.complete ? 600 : 400,
                  color: ms.complete || ms.current ? t.textPrimary : t.textTertiary,
                },
              }, ms.title),
              React.createElement('span', {
                style: {
                  fontFamily: font,
                  fontSize: 15,
                  fontWeight: 600,
                  color: ms.complete ? quest.color : ms.current ? quest.color : t.textTertiary,
                },
              }, ms.amount)
            ),
            ms.current && React.createElement('div', {
              style: {
                marginTop: 8,
                background: `${quest.color}10`,
                borderRadius: 10,
                padding: '10px 14px',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              },
            },
              React.createElement(Icon, { name: 'MapPin', size: 14, color: quest.color }),
              React.createElement('span', {
                style: { fontFamily: font, fontSize: 13, color: quest.color, fontWeight: 600 },
              }, 'You are here')
            )
          )
        )
      )
    );
  };

  // PROFILE SCREEN
  const ProfileScreen = () => {
    return React.createElement('div', {
      style: { padding: '20px 20px 24px', animation: 'fadeIn 400ms ease' },
    },
      // Header
      React.createElement('div', {
        style: { display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28 },
      },
        React.createElement('div', {
          style: {
            width: 72,
            height: 72,
            borderRadius: 20,
            background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          },
        },
          React.createElement('span', {
            style: { fontFamily: font, fontSize: 28, fontWeight: 700, color: '#FFFFFF' },
          }, 'AJ')
        ),
        React.createElement('div', null,
          React.createElement('h1', {
            style: { fontFamily: font, fontSize: 22, fontWeight: 700, color: t.textPrimary, margin: '0 0 4px', letterSpacing: -0.3 },
          }, 'Alex Johnson'),
          React.createElement('p', {
            style: { fontFamily: font, fontSize: 15, color: t.textSecondary, margin: 0 },
          }, 'Quest Weaver since Jan 2026')
        )
      ),

      // Stats Row
      React.createElement('div', {
        style: { display: 'flex', gap: 12, marginBottom: 28 },
      },
        ...[
          { value: '3', label: 'Quests' },
          { value: '3', label: 'Clubs' },
          { value: '5', label: 'Artefacts' },
          { value: '42', label: 'Streak' },
        ].map((stat, i) =>
          React.createElement('div', {
            key: i,
            style: {
              flex: 1,
              textAlign: 'center',
              padding: '14px 8px',
              background: t.subtle,
              borderRadius: 14,
            },
          },
            React.createElement('p', {
              style: { fontFamily: font, fontSize: 22, fontWeight: 700, color: t.textPrimary, margin: '0 0 2px', letterSpacing: -0.5 },
            }, stat.value),
            React.createElement('p', {
              style: { fontFamily: font, fontSize: 11, color: t.textTertiary, margin: 0, fontWeight: 500 },
            }, stat.label)
          )
        )
      ),

      // Achievement Artefacts
      React.createElement('h3', {
        style: { ...sectionTitle, marginBottom: 16 },
      }, 'Achievement Artefacts'),

      React.createElement('div', {
        style: {
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 12,
          marginBottom: 28,
        },
      },
        ...achievements.map((ach, i) =>
          React.createElement('div', {
            key: ach.id,
            style: {
              ...cardStyle,
              padding: 16,
              textAlign: 'center',
              opacity: ach.unlocked ? 1 : 0.4,
              animation: `scaleIn ${300 + i * 80}ms ease`,
            },
          },
            React.createElement('div', {
              style: {
                width: 48,
                height: 48,
                borderRadius: 14,
                background: ach.unlocked ? `${ach.color}18` : t.subtle,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 10px',
              },
            }, React.createElement(Icon, { name: ach.icon, size: 22, color: ach.unlocked ? ach.color : t.textTertiary })),
            React.createElement('p', {
              style: { fontFamily: font, fontSize: 13, fontWeight: 600, color: t.textPrimary, margin: '0 0 2px' },
            }, ach.title),
            React.createElement('p', {
              style: { fontFamily: font, fontSize: 11, color: t.textTertiary, margin: 0, lineHeight: 1.3 },
            }, ach.description)
          )
        )
      ),

      // Settings Links
      React.createElement('h3', {
        style: { ...sectionTitle, fontSize: 17, marginBottom: 12 },
      }, 'Settings'),

      ...[
        { icon: 'User', label: 'Edit Profile' },
        { icon: 'Bell', label: 'Notifications' },
        { icon: 'Lock', label: 'Privacy & Security' },
        { icon: 'HelpCircle', label: 'Help & Support' },
      ].map((item, i) =>
        React.createElement('div', {
          key: i,
          style: {
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            padding: '14px 0',
            borderBottom: i < 3 ? `1px solid ${t.cardBorder}` : 'none',
            cursor: 'pointer',
            minHeight: 48,
          },
        },
          React.createElement('div', {
            style: {
              width: 40,
              height: 40,
              borderRadius: 10,
              background: t.subtle,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            },
          }, React.createElement(Icon, { name: item.icon, size: 18, color: t.textSecondary })),
          React.createElement('span', {
            style: { fontFamily: font, fontSize: 17, color: t.textPrimary, flex: 1 },
          }, item.label),
          React.createElement(Icon, { name: 'ChevronRight', size: 18, color: t.textTertiary })
        )
      ),

      // Theme Toggle
      React.createElement('div', {
        style: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 20,
          padding: '14px 16px',
          background: t.subtle,
          borderRadius: 14,
          minHeight: 48,
        },
      },
        React.createElement('div', {
          style: { display: 'flex', alignItems: 'center', gap: 12 },
        },
          React.createElement(Icon, { name: isDark ? 'Moon' : 'Sun', size: 18, color: t.textSecondary }),
          React.createElement('span', {
            style: { fontFamily: font, fontSize: 17, color: t.textPrimary },
          }, 'Dark Mode')
        ),
        React.createElement('button', {
          onClick: () => setIsDark(!isDark),
          style: {
            width: 52,
            height: 32,
            borderRadius: 16,
            background: isDark ? t.cta : t.progressBg,
            border: 'none',
            cursor: 'pointer',
            position: 'relative',
            transition: 'background 200ms ease',
            padding: 0,
          },
        },
          React.createElement('div', {
            style: {
              width: 26,
              height: 26,
              borderRadius: 13,
              background: '#FFFFFF',
              position: 'absolute',
              top: 3,
              left: isDark ? 23 : 3,
              transition: 'left 200ms ease',
              boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
            },
          })
        )
      )
    );
  };

  // Quest Detail Modal
  const QuestDetailModal = () => {
    if (!showQuestDetail || !selectedQuest) return null;
    const quest = selectedQuest;

    return React.createElement('div', {
      style: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: t.bg,
        zIndex: 100,
        overflowY: 'auto',
        animation: 'slideUp 300ms ease',
      },
    },
      // Hero
      React.createElement('div', {
        style: {
          height: 200,
          background: quest.gradient,
          position: 'relative',
          display: 'flex',
          alignItems: 'flex-end',
          padding: 20,
        },
      },
        React.createElement('button', {
          onClick: () => setShowQuestDetail(false),
          style: {
            position: 'absolute',
            top: 12,
            left: 12,
            background: 'rgba(255,255,255,0.2)',
            backdropFilter: 'blur(10px)',
            border: 'none',
            borderRadius: 12,
            width: 44,
            height: 44,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          },
        }, React.createElement(Icon, { name: 'ArrowLeft', size: 20, color: '#FFFFFF' })),
        React.createElement('h2', {
          style: { fontFamily: font, fontSize: 28, fontWeight: 800, color: '#FFFFFF', margin: 0, letterSpacing: -0.5 },
        }, quest.title)
      ),

      React.createElement('div', { style: { padding: 20 } },
        React.createElement('p', {
          style: { fontFamily: font, fontSize: 17, color: t.textSecondary, lineHeight: 1.5, margin: '0 0 20px' },
        }, quest.description),

        // Progress
        React.createElement('div', {
          style: { ...cardStyle, padding: 20, marginBottom: 20 },
        },
          React.createElement('div', {
            style: { display: 'flex', justifyContent: 'space-between', marginBottom: 12 },
          },
            React.createElement('span', {
              style: { fontFamily: font, fontSize: 15, fontWeight: 600, color: t.textSecondary },
            }, 'Progress'),
            React.createElement('span', {
              style: { fontFamily: font, fontSize: 22, fontWeight: 800, color: quest.color, letterSpacing: -0.5 },
            }, `${quest.progress}%`)
          ),
          React.createElement(ProgressBar, { progress: quest.progress, color: quest.color, height: 12 }),
          React.createElement('div', {
            style: { display: 'flex', justifyContent: 'space-between', marginTop: 8 },
          },
            React.createElement('span', { style: { fontFamily: font, fontSize: 13, color: t.textTertiary } }, quest.current),
            React.createElement('span', { style: { fontFamily: font, fontSize: 13, color: t.textTertiary } }, quest.target)
          )
        ),

        // Stats
        React.createElement('div', {
          style: { display: 'flex', gap: 12, marginBottom: 20 },
        },
          ...[
            { value: quest.members, label: 'Members', icon: 'Users' },
            { value: `${quest.completedMilestones}/${quest.milestones}`, label: 'Milestones', icon: 'Flag' },
            { value: quest.logEntries.length, label: 'Entries', icon: 'BookOpen' },
          ].map((s, i) =>
            React.createElement('div', {
              key: i,
              style: { ...cardStyle, flex: 1, padding: 14, textAlign: 'center' },
            },
              React.createElement(Icon, { name: s.icon, size: 18, color: quest.color }),
              React.createElement('p', {
                style: { fontFamily: font, fontSize: 17, fontWeight: 700, color: t.textPrimary, margin: '6px 0 2px' },
              }, s.value),
              React.createElement('p', {
                style: { fontFamily: font, fontSize: 11, color: t.textTertiary, margin: 0 },
              }, s.label)
            )
          )
        ),

        // Recent Logbook
        React.createElement('h3', {
          style: { ...sectionTitle, fontSize: 17, marginBottom: 14 },
        }, 'Recent Logbook'),

        quest.logEntries.length > 0
          ? quest.logEntries.map((entry, i) =>
              React.createElement('div', {
                key: i,
                style: { ...cardStyle, padding: 16, marginBottom: 12 },
              },
                React.createElement('div', {
                  style: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 },
                },
                  React.createElement(Avatar, { name: entry.author, size: 32, color: quest.color }),
                  React.createElement('div', null,
                    React.createElement('span', {
                      style: { fontFamily: font, fontSize: 15, fontWeight: 600, color: t.textPrimary },
                    }, entry.author),
                    React.createElement('span', {
                      style: { fontFamily: font, fontSize: 13, color: t.textTertiary, marginLeft: 8 },
                    }, entry.time)
                  )
                ),
                React.createElement('p', {
                  style: { fontFamily: font, fontSize: 15, color: t.textSecondary, margin: 0, lineHeight: 1.4 },
                }, entry.text)
              )
            )
          : React.createElement('div', {
              style: { textAlign: 'center', padding: '32px 0' },
            },
              React.createElement(Icon, { name: 'BookOpen', size: 32, color: t.textTertiary }),
              React.createElement('p', {
                style: { fontFamily: font, fontSize: 15, color: t.textTertiary, marginTop: 8 },
              }, 'No logbook entries yet. Start documenting your journey!')
            ),

        // Action Buttons
        React.createElement('div', {
          style: { display: 'flex', gap: 12, marginTop: 8 },
        },
          React.createElement('button', {
            style: { ...buttonStyle, flex: 1 },
          },
            React.createElement(Icon, { name: 'PenLine', size: 18, color: '#FFFFFF' }),
            'Add Entry'
          ),
          React.createElement('button', {
            onClick: () => {
              setShowQuestDetail(false);
              setActiveScreen('map');
            },
            style: {
              ...buttonStyle,
              flex: 1,
              background: t.subtle,
              color: t.textPrimary,
            },
          },
            React.createElement(Icon, { name: 'Map', size: 18, color: t.textPrimary }),
            'View Map'
          )
        )
      )
    );
  };

  // Screen mapping
  const screens = {
    home: HomeScreen,
    clubs: ClubsScreen,
    feed: FeedScreen,
    map: MapScreen,
    profile: ProfileScreen,
  };

  const tabs = [
    { id: 'home', label: 'Home', icon: 'Compass' },
    { id: 'clubs', label: 'Clubs', icon: 'Users' },
    { id: 'feed', label: 'Logbook', icon: 'BookOpen' },
    { id: 'map', label: 'Map', icon: 'Map' },
    { id: 'profile', label: 'Profile', icon: 'User' },
  ];

  const CurrentScreen = screens[activeScreen] || HomeScreen;

  return React.createElement('div', {
    style: {
      minHeight: '100vh',
      background: '#f0f0f0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px 0',
      fontFamily: font,
    },
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
        boxShadow: '0 25px 60px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.08)',
        display: 'flex',
        flexDirection: 'column',
      },
    },
      // Content Area
      React.createElement('div', {
        style: {
          flex: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
          paddingTop: 8,
          paddingBottom: 80,
        },
      },
        React.createElement(CurrentScreen)
      ),

      // Quest Detail Modal
      React.createElement(QuestDetailModal),

      // Bottom Tab Bar
      React.createElement('div', {
        style: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          background: t.tabBg,
          borderTop: `1px solid ${t.tabBorder}`,
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          paddingTop: 8,
          paddingBottom: 24,
          zIndex: 50,
        },
      },
        ...tabs.map(tab =>
          React.createElement('button', {
            key: tab.id,
            onClick: () => {
              setShowQuestDetail(false);
              setActiveScreen(tab.id);
            },
            style: {
              background: 'none',
              border: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 4,
              cursor: 'pointer',
              padding: '4px 12px',
              minWidth: 48,
              minHeight: 44,
            },
          },
            React.createElement(Icon, {
              name: tab.icon,
              size: 22,
              color: activeScreen === tab.id ? t.cta : t.textTertiary,
              strokeWidth: activeScreen === tab.id ? 2.5 : 1.5,
            }),
            React.createElement('span', {
              style: {
                fontFamily: font,
                fontSize: 11,
                fontWeight: activeScreen === tab.id ? 600 : 400,
                color: activeScreen === tab.id ? t.cta : t.textTertiary,
              },
            }, tab.label)
          )
        )
      )
    )
  );
}
