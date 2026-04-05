function App() {
  const { useState, useEffect, useRef } = React;

  const themes = {
    light: {
      bg: '#FAFAFA',
      surface: '#FFFFFF',
      surfaceAlt: '#F4F4F5',
      primary: '#18181B',
      secondary: '#3F3F46',
      muted: '#71717A',
      cta: '#2563EB',
      ctaLight: '#DBEAFE',
      border: '#E4E4E7',
      cardShadow: '0 2px 12px rgba(0,0,0,0.08)',
      gold: '#D97706',
      goldLight: '#FEF3C7',
      green: '#059669',
      greenLight: '#D1FAE5',
    },
    dark: {
      bg: '#09090B',
      surface: '#18181B',
      surfaceAlt: '#27272A',
      primary: '#FAFAFA',
      secondary: '#D4D4D8',
      muted: '#71717A',
      cta: '#3B82F6',
      ctaLight: '#1E3A5F',
      border: '#3F3F46',
      cardShadow: '0 2px 12px rgba(0,0,0,0.4)',
      gold: '#F59E0B',
      goldLight: '#2D1F00',
      green: '#10B981',
      greenLight: '#064E3B',
    },
  };

  const [activeScreen, setActiveScreen] = useState('home');
  const [isDark, setIsDark] = useState(false);
  const [pressedBtn, setPressedBtn] = useState(null);

  const t = isDark ? themes.dark : themes.light;

  const styleTag = `
    @import url('https://fonts.googleapis.com/css2?family=Amatic+SC:wght@400;700&family=Cabin:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    ::-webkit-scrollbar { width: 0px; }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(12px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(24px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes pulse {
      0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(37,99,235,0.4); }
      50% { transform: scale(1.03); box-shadow: 0 0 0 8px rgba(37,99,235,0); }
    }
    @keyframes shimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }
    @keyframes badgePop {
      0% { transform: scale(0.5) rotate(-10deg); opacity: 0; }
      70% { transform: scale(1.15) rotate(3deg); opacity: 1; }
      100% { transform: scale(1) rotate(0deg); opacity: 1; }
    }
    @keyframes progressFill {
      from { width: 0%; }
      to { width: var(--target-width); }
    }
    @keyframes floatUp {
      0% { opacity: 1; transform: translateY(0); }
      100% { opacity: 0; transform: translateY(-30px); }
    }
    .screen-enter { animation: fadeIn 0.3s ease forwards; }
    .card-hover { transition: transform 0.15s ease, box-shadow 0.15s ease; }
    .card-hover:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.12) !important; }
    .tab-item { transition: all 0.2s ease; cursor: pointer; }
    .tab-item:active { transform: scale(0.92); }
    .btn-press:active { transform: scale(0.96); }
    .badge-anim { animation: badgePop 0.5s cubic-bezier(0.175,0.885,0.32,1.275) forwards; }
    .shimmer-bg {
      background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%);
      background-size: 200% 100%;
      animation: shimmer 1.8s infinite;
    }
  `;

  const handleBtn = (id, fn) => {
    setPressedBtn(id);
    setTimeout(() => setPressedBtn(null), 200);
    if (fn) fn();
  };

  // ---- SHARED COMPONENTS ----

  const Avatar = ({ size = 36, initials = 'JD', color = '#2563EB' }) => (
    React.createElement('div', {
      style: {
        width: size, height: size, borderRadius: '50%',
        background: color, display: 'flex', alignItems: 'center',
        justifyContent: 'center', color: '#fff',
        fontFamily: 'Cabin, sans-serif', fontWeight: 700,
        fontSize: size * 0.35, flexShrink: 0,
      }
    }, initials)
  );

  const ProgressBar = ({ value, color = '#2563EB', height = 8 }) => (
    React.createElement('div', {
      style: {
        width: '100%', height, borderRadius: height,
        background: isDark ? '#3F3F46' : '#E4E4E7', overflow: 'hidden',
      }
    },
      React.createElement('div', {
        style: {
          height: '100%', borderRadius: height,
          background: color, width: `${value}%`,
          transition: 'width 0.8s cubic-bezier(0.4,0,0.2,1)',
        }
      })
    )
  );

  const Badge = ({ icon, label, color, bg, small }) => {
    const Icon = window.lucide[icon];
    return React.createElement('div', {
      style: {
        display: 'inline-flex', alignItems: 'center', gap: small ? 3 : 5,
        background: bg, color: color,
        padding: small ? '3px 8px' : '5px 10px',
        borderRadius: 20, fontSize: small ? 11 : 12,
        fontFamily: 'Cabin, sans-serif', fontWeight: 600,
      }
    },
      Icon && React.createElement(Icon, { size: small ? 10 : 13, strokeWidth: 2.5 }),
      label
    );
  };

  // ---- HOME SCREEN ----
  const HomeScreen = () => {
    const [expandedCard, setExpandedCard] = useState(null);

    const activePlaybooks = [
      {
        id: 1, title: 'Crush Subscription Overload',
        author: 'CashWise_Mara', progress: 68, daysLeft: 4,
        color: '#7C3AED', steps: 5, completedSteps: 3,
        badge: 'Subscription Slayer',
      },
      {
        id: 2, title: 'Weekend Getaway in 30 Days',
        author: 'TravelSmart_Leo', progress: 35, daysLeft: 19,
        color: '#059669', steps: 8, completedSteps: 3,
        badge: 'Wanderlust Saver',
      },
    ];

    const recentBadges = [
      { icon: 'Award', label: 'First Playbook', color: '#D97706', bg: isDark ? '#2D1F00' : '#FEF3C7' },
      { icon: 'Flame', label: '7-Day Streak', color: '#DC2626', bg: isDark ? '#2D0707' : '#FEE2E2' },
      { icon: 'Star', label: 'Top Reviewer', color: '#7C3AED', bg: isDark ? '#2D1358' : '#EDE9FE' },
    ];

    return React.createElement('div', { className: 'screen-enter', style: { flex: 1, overflow: 'auto', paddingBottom: 80 } },
      // Header
      React.createElement('div', {
        style: {
          padding: '20px 20px 0',
          background: `linear-gradient(160deg, #18181B 0%, #2563EB 100%)`,
          paddingBottom: 28,
        }
      },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 } },
          React.createElement('div', null,
            React.createElement('p', { style: { color: 'rgba(255,255,255,0.6)', fontSize: 12, fontFamily: 'Cabin, sans-serif', fontWeight: 500, letterSpacing: 0.5 } }, 'GOOD MORNING'),
            React.createElement('h1', { style: { color: '#fff', fontSize: 28, fontFamily: 'Amatic SC, cursive', fontWeight: 700, lineHeight: 1.1 } }, 'Jordan 👋'),
          ),
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10 } },
            React.createElement('div', {
              style: {
                background: 'rgba(255,255,255,0.15)', borderRadius: 20,
                padding: '4px 12px', display: 'flex', alignItems: 'center', gap: 6,
              }
            },
              React.createElement(window.lucide.Zap, { size: 14, color: '#FCD34D', strokeWidth: 2.5 }),
              React.createElement('span', { style: { color: '#fff', fontSize: 13, fontFamily: 'Cabin, sans-serif', fontWeight: 700 } }, '2,340 CP'),
            ),
            React.createElement(Avatar, { size: 36, initials: 'JD', color: '#7C3AED' }),
          ),
        ),
        // Stats row
        React.createElement('div', { style: { display: 'flex', gap: 10 } },
          [
            { label: 'Active', value: '2', icon: 'BookOpen', color: '#60A5FA' },
            { label: 'Completed', value: '7', icon: 'CheckCircle', color: '#34D399' },
            { label: 'Streak', value: '12d', icon: 'Flame', color: '#FB923C' },
          ].map((s, i) => {
            const Icon = window.lucide[s.icon];
            return React.createElement('div', {
              key: i,
              style: {
                flex: 1, background: 'rgba(255,255,255,0.1)', borderRadius: 14,
                padding: '10px 8px', textAlign: 'center', backdropFilter: 'blur(10px)',
              }
            },
              React.createElement(Icon, { size: 16, color: s.color, strokeWidth: 2.5 }),
              React.createElement('div', { style: { color: '#fff', fontSize: 18, fontFamily: 'Amatic SC, cursive', fontWeight: 700, marginTop: 2 } }, s.value),
              React.createElement('div', { style: { color: 'rgba(255,255,255,0.55)', fontSize: 10, fontFamily: 'Cabin, sans-serif', fontWeight: 500 } }, s.label),
            );
          })
        ),
      ),

      // Main content
      React.createElement('div', { style: { padding: '20px 20px 0' } },

        // Daily Quest Banner
        React.createElement('div', {
          className: 'card-hover',
          style: {
            background: `linear-gradient(135deg, ${t.cta} 0%, #7C3AED 100%)`,
            borderRadius: 18, padding: '16px 18px', marginBottom: 22,
            cursor: 'pointer', position: 'relative', overflow: 'hidden',
            animation: 'pulse 3s ease-in-out infinite',
          }
        },
          React.createElement('div', {
            style: {
              position: 'absolute', right: -20, top: -20,
              width: 80, height: 80, borderRadius: '50%',
              background: 'rgba(255,255,255,0.08)',
            }
          }),
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
            React.createElement('div', null,
              React.createElement('div', { style: { color: 'rgba(255,255,255,0.7)', fontSize: 10, fontFamily: 'Cabin, sans-serif', fontWeight: 600, letterSpacing: 1 } }, 'DAILY QUEST'),
              React.createElement('p', { style: { color: '#fff', fontSize: 15, fontFamily: 'Cabin, sans-serif', fontWeight: 700, marginTop: 2 } }, 'Cancel 1 unused subscription'),
              React.createElement('p', { style: { color: 'rgba(255,255,255,0.65)', fontSize: 12, fontFamily: 'Cabin, sans-serif', marginTop: 2 } }, '+150 Credibility Points'),
            ),
            React.createElement('div', {
              style: {
                background: 'rgba(255,255,255,0.2)', borderRadius: 12,
                padding: 10, cursor: 'pointer',
              }
            },
              React.createElement(window.lucide.ChevronRight, { size: 18, color: '#fff' }),
            ),
          ),
        ),

        // Active Playbooks
        React.createElement('div', { style: { marginBottom: 22 } },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 } },
            React.createElement('h2', { style: { fontSize: 24, fontFamily: 'Amatic SC, cursive', fontWeight: 700, color: t.primary } }, 'My Crafting Bench'),
            React.createElement('span', {
              onClick: () => setActiveScreen('explore'),
              style: { color: t.cta, fontSize: 13, fontFamily: 'Cabin, sans-serif', fontWeight: 600, cursor: 'pointer' }
            }, 'View All'),
          ),

          activePlaybooks.map((pb, i) => (
            React.createElement('div', {
              key: pb.id,
              className: 'card-hover',
              onClick: () => setExpandedCard(expandedCard === pb.id ? null : pb.id),
              style: {
                background: t.surface, borderRadius: 18, padding: '16px',
                marginBottom: 12, boxShadow: t.cardShadow,
                border: `1px solid ${t.border}`, cursor: 'pointer',
                animation: `slideUp 0.4s ease ${i * 0.1}s both`,
              }
            },
              React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 } },
                React.createElement('div', { style: { flex: 1 } },
                  React.createElement('h3', { style: { fontSize: 15, fontFamily: 'Cabin, sans-serif', fontWeight: 700, color: t.primary, marginBottom: 3 } }, pb.title),
                  React.createElement('p', { style: { fontSize: 12, fontFamily: 'Cabin, sans-serif', color: t.muted } }, `by ${pb.author}`),
                ),
                React.createElement('div', {
                  style: {
                    background: pb.color + '22', color: pb.color,
                    borderRadius: 10, padding: '4px 10px',
                    fontSize: 12, fontFamily: 'Cabin, sans-serif', fontWeight: 700,
                  }
                }, `${pb.daysLeft}d left`),
              ),
              React.createElement('div', { style: { marginBottom: 8 } },
                React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: 5 } },
                  React.createElement('span', { style: { fontSize: 12, fontFamily: 'Cabin, sans-serif', color: t.muted } }, `${pb.completedSteps}/${pb.steps} steps`),
                  React.createElement('span', { style: { fontSize: 12, fontFamily: 'Cabin, sans-serif', fontWeight: 700, color: pb.color } }, `${pb.progress}%`),
                ),
                React.createElement(ProgressBar, { value: pb.progress, color: pb.color }),
              ),
              expandedCard === pb.id && React.createElement('div', {
                style: { marginTop: 12, paddingTop: 12, borderTop: `1px solid ${t.border}`, animation: 'fadeIn 0.2s ease' }
              },
                React.createElement('p', { style: { fontSize: 12, fontFamily: 'Cabin, sans-serif', color: t.muted, marginBottom: 8 } }, 'Next step:'),
                React.createElement('div', {
                  style: {
                    background: t.ctaLight, borderRadius: 10, padding: '10px 12px',
                    display: 'flex', alignItems: 'center', gap: 8,
                  }
                },
                  React.createElement(window.lucide.ArrowRight, { size: 14, color: t.cta }),
                  React.createElement('span', { style: { fontSize: 13, fontFamily: 'Cabin, sans-serif', fontWeight: 600, color: t.cta } },
                    pb.id === 1 ? 'Review Netflix & Hulu plans' : 'Set up auto-transfer of $25',
                  ),
                ),
                React.createElement('div', {
                  className: 'btn-press',
                  onClick: (e) => { e.stopPropagation(); },
                  style: {
                    marginTop: 10, background: pb.color, borderRadius: 12,
                    padding: '10px', textAlign: 'center', cursor: 'pointer',
                    color: '#fff', fontSize: 13, fontFamily: 'Cabin, sans-serif', fontWeight: 700,
                  }
                }, 'Continue Playbook →'),
              ),
            )
          )),
        ),

        // Recent Badges
        React.createElement('div', { style: { marginBottom: 20 } },
          React.createElement('h2', { style: { fontSize: 24, fontFamily: 'Amatic SC, cursive', fontWeight: 700, color: t.primary, marginBottom: 14 } }, 'Recent Badges'),
          React.createElement('div', { style: { display: 'flex', gap: 8, flexWrap: 'wrap' } },
            recentBadges.map((b, i) => (
              React.createElement('div', {
                key: i, className: 'badge-anim',
                style: { animationDelay: `${i * 0.15}s` }
              },
                React.createElement(Badge, b),
              )
            )),
          ),
        ),
      ),
    );
  };

  // ---- VAULT SCREEN ----
  const VaultScreen = () => {
    const [activeCategory, setActiveCategory] = useState('All');
    const [savedPbs, setSavedPbs] = useState([2, 4]);

    const categories = ['All', 'Savings', 'Debt', 'Budgeting', 'Investing', 'Side Hustle'];

    const playbooks = [
      {
        id: 1, title: 'Zero-Based Budget Reset',
        author: 'BudgetNerd_Sam', category: 'Budgeting',
        duration: '14 days', steps: 6, credPoints: 300,
        completions: 1842, rating: 4.8,
        color: '#2563EB', icon: 'Calculator',
        description: 'Rebuild your monthly budget from zero, assigning every dollar a job.',
        tags: ['beginner', 'monthly'],
      },
      {
        id: 2, title: 'Emergency Fund in 90 Days',
        author: 'SafetyNet_Priya', category: 'Savings',
        duration: '90 days', steps: 12, credPoints: 600,
        completions: 3210, rating: 4.9,
        color: '#059669', icon: 'Shield',
        description: 'Build a $1,000 emergency cushion through micro-saving habits.',
        tags: ['popular', 'savings'],
      },
      {
        id: 3, title: 'Debt Avalanche Attack',
        author: 'DebtDestroyer_KC', category: 'Debt',
        duration: '60 days', steps: 9, credPoints: 450,
        completions: 924, rating: 4.6,
        color: '#DC2626', icon: 'TrendingDown',
        description: 'Systematically eliminate high-interest debt using the avalanche method.',
        tags: ['intermediate', 'debt'],
      },
      {
        id: 4, title: 'Weekend Getaway in 30 Days',
        author: 'TravelSmart_Leo', category: 'Savings',
        duration: '30 days', steps: 8, credPoints: 250,
        completions: 2108, rating: 4.7,
        color: '#7C3AED', icon: 'Map',
        description: 'Save for a fun weekend trip without touching your main savings.',
        tags: ['fun', 'short-term'],
      },
      {
        id: 5, title: 'First $500 Invested',
        author: 'InvestEasy_Nour', category: 'Investing',
        duration: '45 days', steps: 7, credPoints: 400,
        completions: 1455, rating: 4.8,
        color: '#D97706', icon: 'TrendingUp',
        description: 'Navigate your first index fund investment step by step.',
        tags: ['beginner', 'investing'],
      },
    ];

    const filtered = activeCategory === 'All' ? playbooks : playbooks.filter(p => p.category === activeCategory);

    return React.createElement('div', { className: 'screen-enter', style: { flex: 1, overflow: 'auto', paddingBottom: 80 } },
      // Header
      React.createElement('div', { style: { padding: '20px 20px 16px', background: t.surface, borderBottom: `1px solid ${t.border}` } },
        React.createElement('h1', { style: { fontSize: 32, fontFamily: 'Amatic SC, cursive', fontWeight: 700, color: t.primary, marginBottom: 12 } }, 'Playbook Vault'),
        React.createElement('div', {
          style: {
            display: 'flex', alignItems: 'center', gap: 8,
            background: t.surfaceAlt, borderRadius: 12, padding: '10px 14px',
          }
        },
          React.createElement(window.lucide.Search, { size: 16, color: t.muted }),
          React.createElement('span', { style: { fontSize: 14, fontFamily: 'Cabin, sans-serif', color: t.muted } }, 'Search 400+ playbooks…'),
        ),
      ),

      // Categories
      React.createElement('div', { style: { padding: '14px 0 14px 20px', display: 'flex', gap: 8, overflowX: 'auto' } },
        categories.map(cat => (
          React.createElement('button', {
            key: cat,
            onClick: () => setActiveCategory(cat),
            style: {
              flexShrink: 0, padding: '7px 16px', borderRadius: 20, border: 'none',
              fontFamily: 'Cabin, sans-serif', fontSize: 13, fontWeight: 600, cursor: 'pointer',
              background: activeCategory === cat ? t.cta : t.surfaceAlt,
              color: activeCategory === cat ? '#fff' : t.secondary,
              transition: 'all 0.2s ease',
            }
          }, cat)
        )),
        React.createElement('div', { style: { width: 20, flexShrink: 0 } }),
      ),

      // Playbook Cards
      React.createElement('div', { style: { padding: '0 20px' } },
        filtered.map((pb, i) => {
          const Icon = window.lucide[pb.icon];
          const isSaved = savedPbs.includes(pb.id);
          return React.createElement('div', {
            key: pb.id,
            className: 'card-hover',
            style: {
              background: t.surface, borderRadius: 18, marginBottom: 14,
              boxShadow: t.cardShadow, border: `1px solid ${t.border}`,
              overflow: 'hidden', animation: `slideUp 0.3s ease ${i * 0.08}s both`,
            }
          },
            React.createElement('div', { style: { height: 6, background: pb.color } }),
            React.createElement('div', { style: { padding: '14px 16px' } },
              React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 } },
                React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10 } },
                  React.createElement('div', {
                    style: {
                      width: 40, height: 40, borderRadius: 12,
                      background: pb.color + '22', display: 'flex',
                      alignItems: 'center', justifyContent: 'center',
                    }
                  },
                    Icon && React.createElement(Icon, { size: 20, color: pb.color, strokeWidth: 2 }),
                  ),
                  React.createElement('div', null,
                    React.createElement('h3', { style: { fontSize: 14, fontFamily: 'Cabin, sans-serif', fontWeight: 700, color: t.primary } }, pb.title),
                    React.createElement('p', { style: { fontSize: 11, fontFamily: 'Cabin, sans-serif', color: t.muted, marginTop: 1 } }, `by ${pb.author}`),
                  ),
                ),
                React.createElement('button', {
                  onClick: (e) => {
                    e.stopPropagation();
                    setSavedPbs(prev => isSaved ? prev.filter(id => id !== pb.id) : [...prev, pb.id]);
                  },
                  style: {
                    background: 'none', border: 'none', cursor: 'pointer',
                    padding: 4, borderRadius: 8,
                  }
                },
                  React.createElement(window.lucide.Bookmark, {
                    size: 18, color: isSaved ? t.cta : t.muted,
                    fill: isSaved ? t.cta : 'none',
                    strokeWidth: 2,
                  }),
                ),
              ),
              React.createElement('p', { style: { fontSize: 13, fontFamily: 'Cabin, sans-serif', color: t.secondary, marginBottom: 10, lineHeight: 1.5 } }, pb.description),
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 } },
                React.createElement('span', { style: { display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, fontFamily: 'Cabin, sans-serif', color: t.muted } },
                  React.createElement(window.lucide.Clock, { size: 12 }), pb.duration,
                ),
                React.createElement('span', { style: { display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, fontFamily: 'Cabin, sans-serif', color: t.muted } },
                  React.createElement(window.lucide.List, { size: 12 }), `${pb.steps} steps`,
                ),
                React.createElement('span', { style: { display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, fontFamily: 'Cabin, sans-serif', color: t.gold } },
                  React.createElement(window.lucide.Star, { size: 12, fill: t.gold }), pb.rating,
                ),
                React.createElement('span', { style: { display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, fontFamily: 'Cabin, sans-serif', color: t.muted } },
                  React.createElement(window.lucide.Users, { size: 12 }), pb.completions.toLocaleString(),
                ),
              ),
              React.createElement('div', { style: { display: 'flex', gap: 8 } },
                pb.tags.map(tag => (
                  React.createElement('span', {
                    key: tag,
                    style: {
                      background: t.surfaceAlt, color: t.secondary,
                      borderRadius: 6, padding: '2px 8px', fontSize: 11,
                      fontFamily: 'Cabin, sans-serif', fontWeight: 500,
                    }
                  }, `#${tag}`)
                )),
                React.createElement('div', { style: { flex: 1 } }),
                React.createElement('button', {
                  className: 'btn-press',
                  style: {
                    background: t.cta, color: '#fff', border: 'none',
                    borderRadius: 10, padding: '6px 16px',
                    fontSize: 12, fontFamily: 'Cabin, sans-serif', fontWeight: 700,
                    cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5,
                    transition: 'all 0.15s ease',
                  }
                },
                  React.createElement(window.lucide.Play, { size: 12, fill: '#fff' }),
                  'Start',
                ),
              ),
            ),
          );
        }),
      ),
    );
  };

  // ---- FORGE SCREEN ----
  const ForgeScreen = () => {
    const [forgeTab, setForgeTab] = useState('review');
    const [votes, setVotes] = useState({ 1: null, 2: null, 3: null });

    const pendingReviews = [
      {
        id: 1, title: 'No-Spend November Challenge',
        author: 'FrugalFinn_88', category: 'Savings',
        submittedAt: '2 hours ago', upvotes: 24, downvotes: 3,
        preview: 'A month-long challenge to eliminate all discretionary spending and discover your true baseline expenses.',
        steps: ['Audit last 3 months of spending', 'Set daily check-in reminder', 'Identify 5 want vs. need categories', 'Track daily with the app log', 'Share wins in community thread'],
        color: '#059669',
      },
      {
        id: 2, title: 'Negotiate Your Bills Playbook',
        author: 'HagglePro_Dana', category: 'Budgeting',
        submittedAt: '1 day ago', upvotes: 61, downvotes: 7,
        preview: 'Scripts and strategies to lower your phone, internet, and insurance bills in one weekend.',
        steps: ['List all recurring bills', 'Research competitor rates', 'Call provider with script', 'Track savings outcome', 'Repeat quarterly'],
        color: '#D97706',
      },
      {
        id: 3, title: 'Grocery Savings Mastery',
        author: 'MealPlan_Rita', category: 'Budgeting',
        submittedAt: '3 days ago', upvotes: 89, downvotes: 11,
        preview: 'Cut grocery spending by 30% without sacrificing nutrition through smart planning and store strategy.',
        steps: ['Meal plan for the week', 'Shop with list only', 'Use cashback apps', 'Batch cook on Sunday', 'Track weekly savings'],
        color: '#2563EB',
      },
    ];

    const handleVote = (id, dir) => {
      setVotes(prev => ({ ...prev, [id]: prev[id] === dir ? null : dir }));
    };

    return React.createElement('div', { className: 'screen-enter', style: { flex: 1, overflow: 'auto', paddingBottom: 80 } },
      // Header
      React.createElement('div', { style: { padding: '20px 20px 0', background: t.surface, borderBottom: `1px solid ${t.border}`, paddingBottom: 0 } },
        React.createElement('h1', { style: { fontSize: 32, fontFamily: 'Amatic SC, cursive', fontWeight: 700, color: t.primary, marginBottom: 14 } }, 'Playbook Forge'),
        React.createElement('div', { style: { display: 'flex', gap: 0 } },
          ['review', 'create'].map(tab => (
            React.createElement('button', {
              key: tab, onClick: () => setForgeTab(tab),
              style: {
                flex: 1, padding: '10px', border: 'none', background: 'none',
                fontFamily: 'Cabin, sans-serif', fontSize: 14, fontWeight: 600,
                color: forgeTab === tab ? t.cta : t.muted, cursor: 'pointer',
                borderBottom: `2.5px solid ${forgeTab === tab ? t.cta : 'transparent'}`,
                transition: 'all 0.2s ease',
              }
            }, tab === 'review' ? 'Peer Review' : '+ Create Playbook')
          )),
        ),
      ),

      forgeTab === 'review' ? (
        React.createElement('div', { style: { padding: '16px 20px' } },
          React.createElement('div', {
            style: {
              background: t.goldLight, borderRadius: 12, padding: '10px 14px',
              marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8,
            }
          },
            React.createElement(window.lucide.Info, { size: 14, color: t.gold }),
            React.createElement('p', { style: { fontSize: 12, fontFamily: 'Cabin, sans-serif', color: isDark ? t.gold : '#92400E' } },
              'Review earns you +25 Credibility Points per vote',
            ),
          ),

          pendingReviews.map((pr, i) => (
            React.createElement('div', {
              key: pr.id,
              className: 'card-hover',
              style: {
                background: t.surface, borderRadius: 18, marginBottom: 14,
                boxShadow: t.cardShadow, border: `1px solid ${t.border}`,
                padding: '16px', animation: `slideUp 0.3s ease ${i * 0.1}s both`,
              }
            },
              React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: 8 } },
                React.createElement('div', null,
                  React.createElement('span', {
                    style: {
                      background: pr.color + '22', color: pr.color,
                      borderRadius: 6, padding: '2px 8px', fontSize: 11,
                      fontFamily: 'Cabin, sans-serif', fontWeight: 600,
                    }
                  }, pr.category),
                ),
                React.createElement('span', { style: { fontSize: 11, fontFamily: 'Cabin, sans-serif', color: t.muted } }, pr.submittedAt),
              ),
              React.createElement('h3', { style: { fontSize: 16, fontFamily: 'Cabin, sans-serif', fontWeight: 700, color: t.primary, marginBottom: 4 } }, pr.title),
              React.createElement('p', { style: { fontSize: 11, fontFamily: 'Cabin, sans-serif', color: t.muted, marginBottom: 8 } }, `by ${pr.author}`),
              React.createElement('p', { style: { fontSize: 13, fontFamily: 'Cabin, sans-serif', color: t.secondary, marginBottom: 10, lineHeight: 1.5 } }, pr.preview),

              React.createElement('div', { style: { marginBottom: 12 } },
                React.createElement('p', { style: { fontSize: 11, fontFamily: 'Cabin, sans-serif', fontWeight: 600, color: t.muted, marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.5 } }, 'Steps Preview'),
                pr.steps.slice(0, 3).map((step, si) => (
                  React.createElement('div', {
                    key: si,
                    style: { display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 4 }
                  },
                    React.createElement('span', {
                      style: {
                        width: 18, height: 18, borderRadius: '50%', flexShrink: 0,
                        background: pr.color + '22', color: pr.color,
                        fontSize: 10, fontFamily: 'Cabin, sans-serif', fontWeight: 700,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        marginTop: 1,
                      }
                    }, si + 1),
                    React.createElement('span', { style: { fontSize: 12, fontFamily: 'Cabin, sans-serif', color: t.secondary } }, step),
                  )
                )),
              ),

              React.createElement('div', { style: { display: 'flex', gap: 8 } },
                React.createElement('button', {
                  className: 'btn-press',
                  onClick: () => handleVote(pr.id, 'up'),
                  style: {
                    flex: 1, padding: '9px', borderRadius: 12, border: `1.5px solid`,
                    borderColor: votes[pr.id] === 'up' ? t.green : t.border,
                    background: votes[pr.id] === 'up' ? t.greenLight : 'transparent',
                    color: votes[pr.id] === 'up' ? t.green : t.muted,
                    cursor: 'pointer', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', gap: 6, fontFamily: 'Cabin, sans-serif',
                    fontSize: 13, fontWeight: 600, transition: 'all 0.2s ease',
                  }
                },
                  React.createElement(window.lucide.ThumbsUp, { size: 14, strokeWidth: 2.5 }),
                  `Approve (${pr.upvotes + (votes[pr.id] === 'up' ? 1 : 0)})`,
                ),
                React.createElement('button', {
                  className: 'btn-press',
                  onClick: () => handleVote(pr.id, 'down'),
                  style: {
                    flex: 1, padding: '9px', borderRadius: 12, border: `1.5px solid`,
                    borderColor: votes[pr.id] === 'down' ? '#DC2626' : t.border,
                    background: votes[pr.id] === 'down' ? '#FEE2E2' : 'transparent',
                    color: votes[pr.id] === 'down' ? '#DC2626' : t.muted,
                    cursor: 'pointer', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', gap: 6, fontFamily: 'Cabin, sans-serif',
                    fontSize: 13, fontWeight: 600, transition: 'all 0.2s ease',
                  }
                },
                  React.createElement(window.lucide.ThumbsDown, { size: 14, strokeWidth: 2.5 }),
                  `Revise (${pr.downvotes + (votes[pr.id] === 'down' ? 1 : 0)})`,
                ),
              ),
            )
          )),
        )
      ) : (
        React.createElement('div', { style: { padding: '20px 20px' } },
          React.createElement('div', {
            style: {
              background: `linear-gradient(135deg, ${t.cta}15 0%, #7C3AED15 100%)`,
              border: `1.5px dashed ${t.cta}`,
              borderRadius: 18, padding: '24px 20px', textAlign: 'center', marginBottom: 20,
            }
          },
            React.createElement('div', {
              style: {
                width: 56, height: 56, borderRadius: 18,
                background: `linear-gradient(135deg, ${t.cta} 0%, #7C3AED 100%)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 12px',
              }
            },
              React.createElement(window.lucide.PenTool, { size: 24, color: '#fff', strokeWidth: 2 }),
            ),
            React.createElement('h2', { style: { fontSize: 24, fontFamily: 'Amatic SC, cursive', fontWeight: 700, color: t.primary, marginBottom: 6 } }, 'Share Your Wisdom'),
            React.createElement('p', { style: { fontSize: 13, fontFamily: 'Cabin, sans-serif', color: t.muted, lineHeight: 1.6 } },
              'Turn your financial insights into a playbook. Help thousands of members level up their money game.',
            ),
          ),

          ['Give your playbook a title', 'Choose a category', 'Set a duration', 'Write your steps (3–12)', 'Add difficulty & tags', 'Submit for peer review'].map((step, i) => (
            React.createElement('div', {
              key: i,
              style: {
                display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px',
                background: t.surface, borderRadius: 14, marginBottom: 8,
                border: `1px solid ${t.border}`, boxShadow: t.cardShadow,
              }
            },
              React.createElement('div', {
                style: {
                  width: 32, height: 32, borderRadius: 10, flexShrink: 0,
                  background: `linear-gradient(135deg, ${t.cta} 0%, #7C3AED 100%)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', fontSize: 13, fontFamily: 'Cabin, sans-serif', fontWeight: 700,
                }
              }, i + 1),
              React.createElement('span', { style: { fontSize: 14, fontFamily: 'Cabin, sans-serif', color: t.primary } }, step),
              React.createElement('div', { style: { flex: 1 } }),
              React.createElement(window.lucide.ChevronRight, { size: 16, color: t.muted }),
            )
          )),

          React.createElement('button', {
            className: 'btn-press',
            style: {
              width: '100%', marginTop: 12, padding: '15px',
              background: `linear-gradient(135deg, ${t.cta} 0%, #7C3AED 100%)`,
              border: 'none', borderRadius: 16, cursor: 'pointer',
              color: '#fff', fontSize: 16, fontFamily: 'Cabin, sans-serif', fontWeight: 700,
              boxShadow: `0 4px 20px ${t.cta}55`,
            }
          }, 'Start Building Your Playbook'),
        )
      ),
    );
  };

  // ---- PROFILE SCREEN ----
  const ProfileScreen = () => {
    const [showAllBadges, setShowAllBadges] = useState(false);

    const allBadges = [
      { icon: 'Award', label: 'First Playbook', earned: true, color: '#D97706' },
      { icon: 'Flame', label: '7-Day Streak', earned: true, color: '#DC2626' },
      { icon: 'Star', label: 'Top Reviewer', earned: true, color: '#7C3AED' },
      { icon: 'TrendingUp', label: 'Debt Destroyer', earned: true, color: '#059669' },
      { icon: 'Users', label: 'Community Builder', earned: true, color: '#2563EB' },
      { icon: 'Zap', label: 'Speed Crafter', earned: false, color: '#D97706' },
      { icon: 'Crown', label: 'Playbook Legend', earned: false, color: '#D97706' },
      { icon: 'Target', label: 'Goal Crusher', earned: false, color: '#059669' },
    ];

    const leaderboard = [
      { rank: 1, name: 'CashWise_Mara', points: 8420, initials: 'CM', color: '#D97706' },
      { rank: 2, name: 'BudgetNerd_Sam', points: 7850, initials: 'BS', color: '#7C3AED' },
      { rank: 3, name: 'TravelSmart_Leo', points: 6930, initials: 'TL', color: '#059669' },
      { rank: 4, name: 'Jordan (You)', points: 2340, initials: 'JD', color: '#2563EB', isYou: true },
      { rank: 5, name: 'InvestEasy_Nour', points: 1980, initials: 'IN', color: '#DC2626' },
    ];

    const displayBadges = showAllBadges ? allBadges : allBadges.slice(0, 5);

    return React.createElement('div', { className: 'screen-enter', style: { flex: 1, overflow: 'auto', paddingBottom: 80 } },
      // Profile Header
      React.createElement('div', {
        style: {
          background: `linear-gradient(160deg, #7C3AED 0%, #18181B 100%)`,
          padding: '24px 20px 32px',
        }
      },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'flex-end', marginBottom: 16 } },
          React.createElement('div', {
            onClick: () => setIsDark(!isDark),
            style: {
              background: 'rgba(255,255,255,0.15)', borderRadius: 20,
              padding: '6px 12px', display: 'flex', alignItems: 'center', gap: 6,
              cursor: 'pointer',
            }
          },
            React.createElement(isDark ? window.lucide.Sun : window.lucide.Moon, { size: 14, color: '#fff' }),
            React.createElement('span', { style: { color: '#fff', fontSize: 12, fontFamily: 'Cabin, sans-serif', fontWeight: 600 } }, isDark ? 'Light' : 'Dark'),
          ),
        ),
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 } },
          React.createElement('div', {
            style: {
              width: 72, height: 72, borderRadius: '50%',
              background: 'linear-gradient(135deg, #2563EB, #7C3AED)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: '3px solid rgba(255,255,255,0.4)',
              color: '#fff', fontSize: 28, fontFamily: 'Amatic SC, cursive', fontWeight: 700,
            }
          }, 'JD'),
          React.createElement('div', null,
            React.createElement('h2', { style: { color: '#fff', fontSize: 26, fontFamily: 'Amatic SC, cursive', fontWeight: 700 } }, 'Jordan Davis'),
            React.createElement('p', { style: { color: 'rgba(255,255,255,0.65)', fontSize: 12, fontFamily: 'Cabin, sans-serif' } }, '@jordan_crafts • Member since Jan 2025'),
          ),
        ),
        React.createElement('div', { style: { display: 'flex', gap: 10 } },
          [
            { label: 'Credibility Points', value: '2,340', icon: 'Zap', color: '#FCD34D' },
            { label: 'Craft Rank', value: '#4 Local', icon: 'Trophy', color: '#FB923C' },
            { label: 'Contributions', value: '3', icon: 'PenTool', color: '#34D399' },
          ].map((s, i) => {
            const Icon = window.lucide[s.icon];
            return React.createElement('div', {
              key: i,
              style: {
                flex: 1, background: 'rgba(255,255,255,0.1)', borderRadius: 14,
                padding: '10px 8px', textAlign: 'center',
              }
            },
              React.createElement(Icon, { size: 14, color: s.color }),
              React.createElement('div', { style: { color: '#fff', fontSize: 15, fontFamily: 'Amatic SC, cursive', fontWeight: 700, marginTop: 3, lineHeight: 1.1 } }, s.value),
              React.createElement('div', { style: { color: 'rgba(255,255,255,0.5)', fontSize: 9, fontFamily: 'Cabin, sans-serif', fontWeight: 500, marginTop: 1 } }, s.label),
            );
          })
        ),
      ),

      React.createElement('div', { style: { padding: '20px 20px 0' } },
        // Badges
        React.createElement('div', { style: { marginBottom: 22 } },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 } },
            React.createElement('h2', { style: { fontSize: 24, fontFamily: 'Amatic SC, cursive', fontWeight: 700, color: t.primary } }, 'Craft Badges'),
            React.createElement('span', {
              onClick: () => setShowAllBadges(!showAllBadges),
              style: { color: t.cta, fontSize: 13, fontFamily: 'Cabin, sans-serif', fontWeight: 600, cursor: 'pointer' }
            }, showAllBadges ? 'Show Less' : 'See All'),
          ),
          React.createElement('div', { style: { display: 'flex', flexWrap: 'wrap', gap: 8 } },
            displayBadges.map((b, i) => {
              const Icon = window.lucide[b.icon];
              return React.createElement('div', {
                key: i,
                style: {
                  display: 'flex', flexDirection: 'column', alignItems: 'center',
                  width: 68, gap: 5,
                  opacity: b.earned ? 1 : 0.3,
                  animation: b.earned ? `badgePop 0.5s ease ${i * 0.08}s both` : 'none',
                }
              },
                React.createElement('div', {
                  style: {
                    width: 52, height: 52, borderRadius: 16,
                    background: b.earned
                      ? `linear-gradient(135deg, ${b.color}33 0%, ${b.color}11 100%)`
                      : t.surfaceAlt,
                    border: `2px solid ${b.earned ? b.color + '55' : t.border}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }
                },
                  Icon && React.createElement(Icon, { size: 22, color: b.earned ? b.color : t.muted, strokeWidth: 2 }),
                ),
                React.createElement('span', { style: { fontSize: 9, fontFamily: 'Cabin, sans-serif', fontWeight: 600, color: t.secondary, textAlign: 'center', lineHeight: 1.2 } }, b.label),
              );
            }),
          ),
        ),

        // Leaderboard
        React.createElement('div', { style: { marginBottom: 22 } },
          React.createElement('h2', { style: { fontSize: 24, fontFamily: 'Amatic SC, cursive', fontWeight: 700, color: t.primary, marginBottom: 12 } }, 'Community Leaderboard'),
          leaderboard.map((member, i) => (
            React.createElement('div', {
              key: i,
              style: {
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '12px 14px', background: member.isYou ? t.ctaLight : t.surface,
                borderRadius: 14, marginBottom: 8,
                border: `${member.isYou ? '2px' : '1px'} solid ${member.isYou ? t.cta : t.border}`,
                boxShadow: t.cardShadow,
                animation: `slideUp 0.3s ease ${i * 0.08}s both`,
              }
            },
              React.createElement('span', {
                style: {
                  width: 28, textAlign: 'center',
                  fontSize: member.rank <= 3 ? 18 : 14,
                  fontFamily: 'Cabin, sans-serif', fontWeight: 700,
                  color: member.rank === 1 ? '#D97706' : member.rank === 2 ? '#71717A' : member.rank === 3 ? '#92400E' : t.muted,
                }
              }, member.rank <= 3 ? ['🥇', '🥈', '🥉'][member.rank - 1] : `#${member.rank}`),
              React.createElement(Avatar, { size: 34, initials: member.initials, color: member.color }),
              React.createElement('div', { style: { flex: 1 } },
                React.createElement('p', { style: { fontSize: 13, fontFamily: 'Cabin, sans-serif', fontWeight: member.isYou ? 700 : 600, color: t.primary } }, member.name),
              ),
              React.createElement('div', { style: { textAlign: 'right' } },
                React.createElement('p', { style: { fontSize: 14, fontFamily: 'Cabin, sans-serif', fontWeight: 700, color: member.isYou ? t.cta : t.primary } },
                  member.points.toLocaleString(),
                ),
                React.createElement('p', { style: { fontSize: 10, fontFamily: 'Cabin, sans-serif', color: t.muted } }, 'CP'),
              ),
            )
          )),
        ),

        // Community Quest
        React.createElement('div', {
          style: {
            background: `linear-gradient(135deg, #D97706 0%, #DC2626 100%)`,
            borderRadius: 18, padding: '18px',
            marginBottom: 20,
          }
        },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 } },
            React.createElement('div', null,
              React.createElement('p', { style: { color: 'rgba(255,255,255,0.7)', fontSize: 10, fontFamily: 'Cabin, sans-serif', fontWeight: 600, letterSpacing: 1 } }, 'COMMUNITY QUEST'),
              React.createElement('h3', { style: { color: '#fff', fontSize: 18, fontFamily: 'Amatic SC, cursive', fontWeight: 700 } }, 'Save $50 This Week Challenge'),
            ),
            React.createElement('div', {
              style: {
                background: 'rgba(255,255,255,0.2)', borderRadius: 10,
                padding: '5px 10px', color: '#fff',
                fontSize: 11, fontFamily: 'Cabin, sans-serif', fontWeight: 700,
              }
            }, '1,204 joined'),
          ),
          React.createElement(ProgressBar, { value: 72, color: 'rgba(255,255,255,0.9)', height: 6 }),
          React.createElement('p', { style: { color: 'rgba(255,255,255,0.65)', fontSize: 11, fontFamily: 'Cabin, sans-serif', marginTop: 6 } }, '3 days remaining • +400 CP reward'),
          React.createElement('button', {
            className: 'btn-press',
            style: {
              marginTop: 12, width: '100%', padding: '10px',
              background: 'rgba(255,255,255,0.2)', border: '1.5px solid rgba(255,255,255,0.4)',
              borderRadius: 12, color: '#fff', fontSize: 14, fontFamily: 'Cabin, sans-serif',
              fontWeight: 700, cursor: 'pointer', backdropFilter: 'blur(10px)',
            }
          }, 'Join Quest'),
        ),
      ),
    );
  };

  // ---- BOTTOM NAV ----
  const tabs = [
    { id: 'home', label: 'Home', icon: 'Home' },
    { id: 'explore', label: 'Vault', icon: 'BookOpen' },
    { id: 'forge', label: 'Forge', icon: 'Hammer' },
    { id: 'profile', label: 'Profile', icon: 'User' },
  ];

  const screens = {
    home: HomeScreen,
    explore: VaultScreen,
    forge: ForgeScreen,
    profile: ProfileScreen,
  };

  return React.createElement('div', null,
    React.createElement('style', null, styleTag),
    React.createElement('div', {
      style: {
        minHeight: '100vh', background: '#f0f0f0',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'Cabin, sans-serif',
        padding: '20px 0',
      }
    },
      React.createElement('div', {
        style: {
          width: 375, height: 812,
          background: t.bg,
          borderRadius: 44, overflow: 'hidden',
          boxShadow: '0 40px 120px rgba(0,0,0,0.25), 0 0 0 10px #1a1a1a, 0 0 0 12px #333',
          display: 'flex', flexDirection: 'column',
          position: 'relative',
          transition: 'background 0.3s ease',
        }
      },
        // Screen content
        React.createElement('div', { style: { flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' } },
          React.createElement(screens[activeScreen], { key: activeScreen }),
        ),

        // Bottom Nav
        React.createElement('div', {
          style: {
            height: 70, background: t.surface,
            borderTop: `1px solid ${t.border}`,
            display: 'flex', alignItems: 'center',
            paddingBottom: 8,
            boxShadow: `0 -4px 20px rgba(0,0,0,0.06)`,
            flexShrink: 0,
            position: 'relative', zIndex: 100,
          }
        },
          tabs.map(tab => {
            const Icon = window.lucide[tab.icon];
            const isActive = activeScreen === tab.id;
            return React.createElement('div', {
              key: tab.id,
              className: 'tab-item',
              onClick: () => setActiveScreen(tab.id),
              style: {
                flex: 1, display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center', gap: 3,
                paddingTop: 8, cursor: 'pointer', minHeight: 44,
              }
            },
              React.createElement('div', {
                style: {
                  width: 40, height: 28, borderRadius: 14,
                  background: isActive ? t.ctaLight : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.2s ease',
                }
              },
                Icon && React.createElement(Icon, {
                  size: 20,
                  color: isActive ? t.cta : t.muted,
                  strokeWidth: isActive ? 2.5 : 2,
                }),
              ),
              React.createElement('span', {
                style: {
                  fontSize: 10, fontFamily: 'Cabin, sans-serif',
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? t.cta : t.muted,
                  transition: 'color 0.2s ease',
                }
              }, tab.label),
            );
          }),
        ),
      ),
    ),
  );
}
