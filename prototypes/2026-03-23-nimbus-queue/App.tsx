// Nimbus Queue — Smart Queue Companion
// Single-file React prototype (Babel standalone, no imports)

function App() {
  const { useState, useEffect, useRef } = React;

  // ─── Theme System ────────────────────────────────────────────────────────────
  const themes = {
    light: {
      bg: '#F2F5FF',
      surface: '#FFFFFF',
      surfaceAlt: '#F6F8FF',
      card: '#FFFFFF',
      cardBorder: '#E4EAFF',
      text: '#0D1336',
      textSecondary: '#5A6482',
      textTertiary: '#9BA3C2',
      primary: '#4B7BF5',
      primaryDark: '#3566E8',
      primaryLight: '#EDF1FF',
      secondary: '#7C5CF5',
      accent: '#00C9B1',
      success: '#10C98A',
      warning: '#F5A623',
      danger: '#F5455C',
      navBg: '#FFFFFF',
      navBorder: '#E4EAFF',
      statusBar: '#0D1336',
      divider: '#E4EAFF',
      shadow: 'rgba(75, 123, 245, 0.14)',
      gradient: 'linear-gradient(135deg, #4B7BF5 0%, #7C5CF5 100%)',
      gradientWarm: 'linear-gradient(135deg, #00C9B1 0%, #4B7BF5 100%)',
    },
    dark: {
      bg: '#080D1F',
      surface: '#10172E',
      surfaceAlt: '#161E38',
      card: '#161E38',
      cardBorder: '#1F2C4F',
      text: '#EEF2FF',
      textSecondary: '#7B88B5',
      textTertiary: '#3D4D78',
      primary: '#6690FF',
      primaryDark: '#4B7BF5',
      primaryLight: '#141E40',
      secondary: '#9B7DFF',
      accent: '#00E2C8',
      success: '#1ADBA0',
      warning: '#FFB830',
      danger: '#FF5A70',
      navBg: '#10172E',
      navBorder: '#1F2C4F',
      statusBar: '#EEF2FF',
      divider: '#1F2C4F',
      shadow: 'rgba(0,0,0,0.5)',
      gradient: 'linear-gradient(135deg, #6690FF 0%, #9B7DFF 100%)',
      gradientWarm: 'linear-gradient(135deg, #00E2C8 0%, #6690FF 100%)',
    },
  };

  // ─── State ───────────────────────────────────────────────────────────────────
  const [activeTab, setActiveTab] = useState('home');
  const [isDark, setIsDark] = useState(false);
  const theme = isDark ? themes.dark : themes.light;

  // ─── Font Loading ─────────────────────────────────────────────────────────────
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
      * { box-sizing: border-box; margin: 0; padding: 0; }
      *::-webkit-scrollbar { width: 0; height: 0; }
      button { font-family: 'Plus Jakarta Sans', sans-serif; }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  // ─── Navigation Tabs ─────────────────────────────────────────────────────────
  const tabs = [
    { id: 'home',     label: 'Home',     icon: window.lucide.Home },
    { id: 'explore',  label: 'Explore',  icon: window.lucide.Search },
    { id: 'queue',    label: 'My Queue', icon: window.lucide.Clock },
    { id: 'insights', label: 'Insights', icon: window.lucide.BarChart2 },
    { id: 'settings', label: 'Settings', icon: window.lucide.Settings },
  ];

  // ─── Helpers ─────────────────────────────────────────────────────────────────
  const waitColor = (min) => {
    if (min <= 15) return theme.success;
    if (min <= 35) return theme.warning;
    return theme.danger;
  };
  const waitLabel = (min) => {
    if (min <= 15) return 'Low';
    if (min <= 35) return 'Medium';
    return 'High';
  };
  const chip = (label, color, bg) =>
    React.createElement('span', {
      style: {
        display: 'inline-block',
        padding: '3px 9px', borderRadius: 20,
        background: bg || color + '1A',
        color, fontSize: 11, fontWeight: 700,
        letterSpacing: 0.2,
      },
    }, label);

  const card = (children, extra = {}) =>
    React.createElement('div', {
      style: {
        background: theme.card,
        border: `1px solid ${theme.cardBorder}`,
        borderRadius: 18,
        ...extra,
      },
    }, children);

  // ─────────────────────────────────────────────────────────────────────────────
  // SCREEN: HOME
  // ─────────────────────────────────────────────────────────────────────────────
  function HomeScreen() {
    const nearby = [
      { name: 'CVS Pharmacy',     cat: 'Pharmacy',    wait: 8,  trend: 'down',   dist: '0.3 mi', icon: '💊' },
      { name: 'DMV – Main St',    cat: 'Government',  wait: 47, trend: 'up',     dist: '1.2 mi', icon: '🏛️' },
      { name: 'Chase Bank',       cat: 'Banking',     wait: 12, trend: 'stable', dist: '0.5 mi', icon: '🏦' },
      { name: 'Urgent Care Plus', cat: 'Medical',     wait: 34, trend: 'up',     dist: '0.8 mi', icon: '🏥' },
    ];
    const actions = [
      { label: 'Join',    icon: window.lucide.PlusCircle, color: theme.primary    },
      { label: 'Best Time', icon: window.lucide.Zap,       color: theme.secondary  },
      { label: 'Share',   icon: window.lucide.Share2,     color: theme.accent     },
      { label: 'Alerts',  icon: window.lucide.Bell,       color: theme.warning    },
    ];

    return React.createElement('div', {
      style: { height: '100%', overflowY: 'auto', background: theme.bg, fontFamily: "'Plus Jakarta Sans', sans-serif" },
    },
      // ── Header
      React.createElement('div', {
        style: { padding: '14px 20px 12px', background: theme.surface, borderBottom: `1px solid ${theme.divider}` },
      },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
          React.createElement('div', null,
            React.createElement('p', { style: { fontSize: 12, color: theme.textSecondary, fontWeight: 500 } }, '☁️ Monday, March 23'),
            React.createElement('h1', { style: { fontSize: 22, fontWeight: 800, color: theme.text, marginTop: 2 } }, 'Good morning, Sarah'),
          ),
          React.createElement('div', {
            style: {
              width: 42, height: 42, borderRadius: '50%',
              background: theme.gradient,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontSize: 15, fontWeight: 800,
            },
          }, 'SC'),
        ),
        React.createElement('div', {
          style: {
            marginTop: 12, background: theme.surfaceAlt,
            border: `1px solid ${theme.cardBorder}`, borderRadius: 12,
            padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 8,
          },
        },
          React.createElement(window.lucide.Search, { size: 15, color: theme.textTertiary }),
          React.createElement('span', { style: { fontSize: 14, color: theme.textTertiary } }, 'Search locations, services…'),
        ),
      ),

      React.createElement('div', { style: { padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 14 } },

        // ── Active Queue Banner
        React.createElement('div', {
          style: {
            background: theme.gradient,
            borderRadius: 20, padding: '18px',
            position: 'relative', overflow: 'hidden',
          },
        },
          React.createElement('div', {
            style: {
              position: 'absolute', width: 120, height: 120, borderRadius: '50%',
              background: 'rgba(255,255,255,0.08)', top: -30, right: -30,
            },
          }),
          React.createElement('div', {
            style: {
              position: 'absolute', width: 70, height: 70, borderRadius: '50%',
              background: 'rgba(255,255,255,0.06)', bottom: -10, left: 100,
            },
          }),
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' } },
            React.createElement('div', null,
              chip('● ACTIVE QUEUE', '#fff', 'rgba(255,255,255,0.22)'),
              React.createElement('h3', { style: { color: '#fff', fontSize: 16, fontWeight: 800, marginTop: 8 } }, 'Walgreens Pharmacy'),
              React.createElement('p', { style: { color: 'rgba(255,255,255,0.75)', fontSize: 12, marginTop: 3 } }, 'Prescription pickup · Queue #47'),
            ),
            React.createElement('div', { style: { textAlign: 'right' } },
              React.createElement('div', { style: { color: '#fff', fontSize: 38, fontWeight: 900, lineHeight: 1 } }, '~8'),
              React.createElement('div', { style: { color: 'rgba(255,255,255,0.7)', fontSize: 12, marginTop: 2 } }, 'min left'),
            ),
          ),
          React.createElement('div', {
            style: {
              marginTop: 14, background: 'rgba(255,255,255,0.15)',
              borderRadius: 10, padding: '9px 12px',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            },
          },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6 } },
              React.createElement(window.lucide.Navigation, { size: 13, color: 'rgba(255,255,255,0.9)' }),
              React.createElement('span', { style: { color: 'rgba(255,255,255,0.9)', fontSize: 12 } }, 'Leave by 2:45 PM'),
            ),
            React.createElement('span', { style: { color: '#fff', fontSize: 12, fontWeight: 700 } }, 'View Details →'),
          ),
          // Progress
          React.createElement('div', { style: { marginTop: 12 } },
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: 5 } },
              React.createElement('span', { style: { fontSize: 11, color: 'rgba(255,255,255,0.7)' } }, 'Position 3 of 11'),
              React.createElement('span', { style: { fontSize: 11, color: 'rgba(255,255,255,0.7)' } }, '73% done'),
            ),
            React.createElement('div', { style: { height: 5, background: 'rgba(255,255,255,0.2)', borderRadius: 3 } },
              React.createElement('div', { style: { height: '100%', width: '73%', background: '#fff', borderRadius: 3, opacity: 0.9 } }),
            ),
          ),
        ),

        // ── Quick Actions
        React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 } },
          actions.map(a =>
            React.createElement('div', {
              key: a.label,
              style: {
                background: theme.surface, border: `1px solid ${theme.cardBorder}`,
                borderRadius: 14, padding: '12px 6px', textAlign: 'center', cursor: 'pointer',
              },
            },
              React.createElement('div', {
                style: {
                  width: 38, height: 38, borderRadius: 11,
                  background: a.color + '18',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 7px',
                },
              },
                React.createElement(a.icon, { size: 18, color: a.color }),
              ),
              React.createElement('p', { style: { fontSize: 10, fontWeight: 700, color: theme.textSecondary } }, a.label),
            )
          ),
        ),

        // ── Nearby Queues
        React.createElement('div', null,
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 } },
            React.createElement('h2', { style: { fontSize: 15, fontWeight: 800, color: theme.text } }, 'Nearby Queues'),
            React.createElement('span', { style: { fontSize: 12, color: theme.primary, fontWeight: 700 } }, 'See all'),
          ),
          nearby.map(p =>
            React.createElement('div', {
              key: p.name,
              style: {
                background: theme.surface, border: `1px solid ${theme.cardBorder}`,
                borderRadius: 16, padding: '13px 14px', marginBottom: 9,
                display: 'flex', alignItems: 'center', gap: 12,
              },
            },
              React.createElement('div', {
                style: {
                  width: 46, height: 46, borderRadius: 13, background: theme.surfaceAlt,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 22, flexShrink: 0,
                },
              }, p.icon),
              React.createElement('div', { style: { flex: 1, minWidth: 0 } },
                React.createElement('h4', { style: { fontSize: 14, fontWeight: 700, color: theme.text, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' } }, p.name),
                React.createElement('p', { style: { fontSize: 12, color: theme.textSecondary, marginTop: 2 } }, `${p.cat} · ${p.dist}`),
              ),
              React.createElement('div', { style: { textAlign: 'right', flexShrink: 0 } },
                React.createElement('div', { style: { fontSize: 20, fontWeight: 900, color: waitColor(p.wait) } }, `${p.wait}m`),
                React.createElement('div', { style: { fontSize: 10, color: theme.textTertiary, marginTop: 1 } },
                  p.trend === 'up' ? '↑ rising' : p.trend === 'down' ? '↓ falling' : '→ steady'
                ),
              ),
            )
          ),
        ),

        // ── Smart Tip
        React.createElement('div', {
          style: {
            background: theme.accent + '12',
            border: `1px solid ${theme.accent}30`,
            borderRadius: 16, padding: '14px 16px',
            display: 'flex', gap: 12, alignItems: 'center',
          },
        },
          React.createElement('div', {
            style: { width: 36, height: 36, borderRadius: 10, background: theme.accent + '22', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
          },
            React.createElement(window.lucide.Zap, { size: 18, color: theme.accent }),
          ),
          React.createElement('div', null,
            React.createElement('p', { style: { fontSize: 12, fontWeight: 800, color: theme.accent } }, '💡 Smart Tip'),
            React.createElement('p', { style: { fontSize: 12, color: theme.textSecondary, marginTop: 2 } }, 'DMV wait spikes after 3 PM — best to go tomorrow before 10 AM'),
          ),
        ),
      ),
    );
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // SCREEN: EXPLORE
  // ─────────────────────────────────────────────────────────────────────────────
  function ExploreScreen() {
    const [filter, setFilter] = useState('all');
    const filters = [
      { id: 'all',      label: 'All' },
      { id: 'pharmacy', label: 'Pharmacy' },
      { id: 'gov',      label: "Gov't" },
      { id: 'medical',  label: 'Medical' },
      { id: 'bank',     label: 'Bank' },
      { id: 'retail',   label: 'Retail' },
    ];
    const locs = [
      { name: 'CVS Pharmacy',    addr: '123 Main St',    wait: 8,  cat: 'pharmacy', icon: '💊', rating: 4.2 },
      { name: 'US Post Office',  addr: '456 Oak Ave',    wait: 22, cat: 'gov',      icon: '📮', rating: 3.8 },
      { name: 'Kaiser Urgent Care', addr: '789 Pine Blvd', wait: 41, cat: 'medical', icon: '🏥', rating: 4.5 },
      { name: 'DMV – Downtown',  addr: '321 Elm St',     wait: 65, cat: 'gov',      icon: '🏛️', rating: 2.9 },
      { name: 'Wells Fargo',     addr: '555 Market St',  wait: 6,  cat: 'bank',     icon: '🏦', rating: 4.1 },
      { name: "Trader Joe's",    addr: '888 Vine Rd',    wait: 15, cat: 'retail',   icon: '🛒', rating: 4.6 },
      { name: 'Walgreens',       addr: '200 Central Ave', wait: 19, cat: 'pharmacy', icon: '💊', rating: 3.9 },
    ];
    const visible = filter === 'all' ? locs : locs.filter(l => l.cat === filter);

    return React.createElement('div', {
      style: { height: '100%', overflowY: 'auto', background: theme.bg, fontFamily: "'Plus Jakarta Sans', sans-serif" },
    },
      // Header
      React.createElement('div', {
        style: { padding: '14px 20px 0', background: theme.surface, borderBottom: `1px solid ${theme.divider}` },
      },
        React.createElement('h1', { style: { fontSize: 22, fontWeight: 800, color: theme.text, marginBottom: 12 } }, 'Explore'),
        React.createElement('div', {
          style: {
            background: theme.surfaceAlt, border: `1px solid ${theme.cardBorder}`,
            borderRadius: 12, padding: '10px 14px',
            display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12,
          },
        },
          React.createElement(window.lucide.Search, { size: 15, color: theme.textTertiary }),
          React.createElement('span', { style: { fontSize: 14, color: theme.textTertiary } }, 'Search any location or service…'),
        ),
        React.createElement('div', { style: { display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 12 } },
          filters.map(f =>
            React.createElement('button', {
              key: f.id,
              onClick: () => setFilter(f.id),
              style: {
                flexShrink: 0, padding: '6px 14px', borderRadius: 20, border: 'none',
                background: filter === f.id ? theme.primary : theme.surfaceAlt,
                color: filter === f.id ? '#fff' : theme.textSecondary,
                fontSize: 12, fontWeight: 700, cursor: 'pointer',
              },
            }, f.label)
          ),
        ),
      ),

      // Map placeholder
      React.createElement('div', { style: { padding: '14px 20px 0' } },
        React.createElement('div', {
          style: {
            height: 140, background: isDark ? '#141E38' : '#DDE8FF',
            borderRadius: 18, border: `1px solid ${theme.cardBorder}`,
            position: 'relative', overflow: 'hidden',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          },
        },
          // Grid lines
          React.createElement('div', {
            style: {
              position: 'absolute', inset: 0,
              backgroundImage: `linear-gradient(${theme.cardBorder} 1px, transparent 1px), linear-gradient(90deg, ${theme.cardBorder} 1px, transparent 1px)`,
              backgroundSize: '30px 30px', opacity: 0.5,
            },
          }),
          React.createElement('div', { style: { textAlign: 'center', position: 'relative' } },
            React.createElement(window.lucide.MapPin, { size: 22, color: theme.primary }),
            React.createElement('p', { style: { fontSize: 13, color: theme.textSecondary, marginTop: 5, fontWeight: 600 } }, 'Live Map View'),
            React.createElement('p', { style: { fontSize: 11, color: theme.textTertiary } }, `${visible.length} locations near you`),
          ),
          // Pin badges
          ...[
            { top: '22%', left: '18%', wait: 8,  color: theme.success },
            { top: '55%', left: '58%', wait: 47, color: theme.danger },
            { top: '18%', left: '72%', wait: 15, color: theme.warning },
            { top: '68%', left: '35%', wait: 6,  color: theme.success },
            { top: '40%', left: '82%', wait: 65, color: theme.danger },
          ].map((pin, i) =>
            React.createElement('div', {
              key: i,
              style: {
                position: 'absolute', top: pin.top, left: pin.left,
                background: pin.color, color: '#fff',
                borderRadius: 8, padding: '2px 6px',
                fontSize: 10, fontWeight: 800,
                boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
              },
            }, `${pin.wait}m`)
          ),
        ),
      ),

      // Results
      React.createElement('div', { style: { padding: '14px 20px 20px' } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: 10, alignItems: 'center' } },
          React.createElement('h3', { style: { fontSize: 14, fontWeight: 800, color: theme.text } }, `${visible.length} Results`),
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 5 } },
            React.createElement(window.lucide.Sliders, { size: 14, color: theme.primary }),
            React.createElement('span', { style: { fontSize: 12, color: theme.primary, fontWeight: 700 } }, 'Sort'),
          ),
        ),
        visible.map(loc =>
          React.createElement('div', {
            key: loc.name,
            style: {
              background: theme.surface, border: `1px solid ${theme.cardBorder}`,
              borderRadius: 16, padding: '14px', marginBottom: 10,
            },
          },
            React.createElement('div', { style: { display: 'flex', gap: 12, alignItems: 'flex-start' } },
              React.createElement('div', {
                style: { width: 46, height: 46, borderRadius: 13, background: theme.surfaceAlt, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 },
              }, loc.icon),
              React.createElement('div', { style: { flex: 1 } },
                React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' } },
                  React.createElement('h4', { style: { fontSize: 14, fontWeight: 700, color: theme.text } }, loc.name),
                  React.createElement('span', { style: { fontSize: 22, fontWeight: 900, color: waitColor(loc.wait) } }, `${loc.wait}m`),
                ),
                React.createElement('p', { style: { fontSize: 12, color: theme.textSecondary, marginTop: 2 } }, loc.addr),
                React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginTop: 9 } },
                  chip(waitLabel(loc.wait), waitColor(loc.wait)),
                  React.createElement('span', { style: { fontSize: 12, color: theme.textTertiary } }, `⭐ ${loc.rating}`),
                  React.createElement('div', { style: { flex: 1 } }),
                  React.createElement('button', {
                    style: {
                      background: theme.primary, color: '#fff', border: 'none',
                      borderRadius: 9, padding: '5px 13px', fontSize: 12, fontWeight: 700, cursor: 'pointer',
                    },
                  }, 'Join Queue'),
                ),
              ),
            ),
          )
        ),
      ),
    );
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // SCREEN: MY QUEUE
  // ─────────────────────────────────────────────────────────────────────────────
  function QueueScreen() {
    const [tab, setTab] = useState('active');

    const active = [
      { name: 'Walgreens Pharmacy', type: 'Prescription Pickup', pos: 3, total: 11, wait: 8, leaveBy: '2:45 PM', icon: '💊' },
    ];
    const upcoming = [
      { name: 'DMV – Main Street', type: 'License Renewal',   when: 'Wed, Mar 26 · 9:30 AM', wait: 22, icon: '🏛️', alert: true },
      { name: 'Kaiser Urgent Care', type: 'Walk-in Checkup', when: 'Thu, Mar 27 · 2:00 PM',  wait: 35, icon: '🏥', alert: false },
    ];
    const history = [
      { name: 'CVS Pharmacy',  date: 'Mar 20', predicted: 10, actual: 12, icon: '💊' },
      { name: 'Post Office',   date: 'Mar 18', predicted: 20, actual: 28, icon: '📮' },
      { name: 'DMV – Main St', date: 'Mar 15', predicted: 45, actual: 54, icon: '🏛️' },
    ];

    return React.createElement('div', {
      style: { height: '100%', overflowY: 'auto', background: theme.bg, fontFamily: "'Plus Jakarta Sans', sans-serif" },
    },
      // Header + Sub-tabs
      React.createElement('div', {
        style: { background: theme.surface, borderBottom: `1px solid ${theme.divider}` },
      },
        React.createElement('div', { style: { padding: '14px 20px 0' } },
          React.createElement('h1', { style: { fontSize: 22, fontWeight: 800, color: theme.text, marginBottom: 12 } }, 'My Queue'),
        ),
        React.createElement('div', { style: { display: 'flex' } },
          ['active', 'upcoming', 'history'].map(t =>
            React.createElement('button', {
              key: t, onClick: () => setTab(t),
              style: {
                flex: 1, padding: '9px 0 12px',
                background: 'none', border: 'none',
                borderBottom: tab === t ? `2.5px solid ${theme.primary}` : '2.5px solid transparent',
                color: tab === t ? theme.primary : theme.textSecondary,
                fontSize: 13, fontWeight: tab === t ? 800 : 500,
                cursor: 'pointer', textTransform: 'capitalize',
              },
            }, t)
          ),
        ),
      ),

      React.createElement('div', { style: { padding: '16px 20px' } },

        // ACTIVE
        tab === 'active' && (
          active.length === 0
            ? React.createElement('div', { style: { textAlign: 'center', padding: '50px 20px', color: theme.textTertiary } },
                React.createElement(window.lucide.Clock, { size: 44, color: theme.textTertiary }),
                React.createElement('p', { style: { marginTop: 12, fontWeight: 700, color: theme.textSecondary } }, 'No active queues'),
                React.createElement('p', { style: { fontSize: 13, marginTop: 4 } }, 'Join a queue from Explore'),
              )
            : active.map(q =>
                React.createElement('div', {
                  key: q.name,
                  style: {
                    background: theme.surface, border: `1px solid ${theme.cardBorder}`,
                    borderRadius: 20, padding: '18px',
                    position: 'relative', overflow: 'hidden',
                  },
                },
                  React.createElement('div', { style: { position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: theme.gradient } }),
                  React.createElement('div', { style: { display: 'flex', gap: 12, alignItems: 'flex-start' } },
                    React.createElement('div', { style: { width: 48, height: 48, borderRadius: 14, background: theme.surfaceAlt, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 } }, q.icon),
                    React.createElement('div', { style: { flex: 1 } },
                      chip('● Live', theme.success),
                      React.createElement('h3', { style: { fontSize: 15, fontWeight: 800, color: theme.text, marginTop: 6 } }, q.name),
                      React.createElement('p', { style: { fontSize: 12, color: theme.textSecondary } }, q.type),
                    ),
                    React.createElement('div', { style: { textAlign: 'right' } },
                      React.createElement('div', { style: { fontSize: 34, fontWeight: 900, color: theme.primary, lineHeight: 1 } }, `~${q.wait}`),
                      React.createElement('div', { style: { fontSize: 11, color: theme.textSecondary } }, 'min left'),
                    ),
                  ),
                  // Progress
                  React.createElement('div', { style: { marginTop: 16 } },
                    React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: 6 } },
                      React.createElement('span', { style: { fontSize: 12, color: theme.textSecondary } }, `Position ${q.pos} of ${q.total}`),
                      React.createElement('span', { style: { fontSize: 12, color: theme.textSecondary, fontWeight: 600 } }, `${Math.round((1 - q.pos / q.total) * 100)}% done`),
                    ),
                    React.createElement('div', { style: { height: 7, background: theme.surfaceAlt, borderRadius: 4 } },
                      React.createElement('div', {
                        style: {
                          height: '100%', borderRadius: 4,
                          width: `${(1 - q.pos / q.total) * 100}%`,
                          background: theme.gradient,
                        },
                      }),
                    ),
                  ),
                  // Leave-by banner
                  React.createElement('div', {
                    style: {
                      marginTop: 14, background: theme.primaryLight,
                      border: `1px solid ${theme.primary}30`, borderRadius: 11, padding: '9px 12px',
                      display: 'flex', alignItems: 'center', gap: 7,
                    },
                  },
                    React.createElement(window.lucide.Bell, { size: 14, color: theme.primary }),
                    React.createElement('span', { style: { fontSize: 12, color: theme.primary, fontWeight: 700 } }, `Leave by ${q.leaveBy} for on-time arrival`),
                  ),
                  // Buttons
                  React.createElement('div', { style: { display: 'flex', gap: 8, marginTop: 12 } },
                    React.createElement('button', {
                      style: {
                        flex: 1, padding: '9px', border: `1px solid ${theme.cardBorder}`,
                        background: theme.surface, borderRadius: 10,
                        color: theme.textSecondary, fontSize: 12, fontWeight: 600, cursor: 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5,
                      },
                    },
                      React.createElement(window.lucide.Share2, { size: 14 }),
                      'Share Spot',
                    ),
                    React.createElement('button', {
                      style: {
                        flex: 1, padding: '9px', border: 'none',
                        background: theme.danger + '18', borderRadius: 10,
                        color: theme.danger, fontSize: 12, fontWeight: 700, cursor: 'pointer',
                      },
                    }, 'Leave Queue'),
                  ),
                )
              )
        ),

        // UPCOMING
        tab === 'upcoming' && React.createElement('div', null,
          React.createElement('div', {
            style: {
              background: theme.primaryLight, border: `1px solid ${theme.primary}25`,
              borderRadius: 14, padding: '12px 14px', marginBottom: 14,
              display: 'flex', gap: 10, alignItems: 'center',
            },
          },
            React.createElement(window.lucide.Bell, { size: 16, color: theme.primary }),
            React.createElement('p', { style: { fontSize: 12, color: theme.primary, fontWeight: 600 } }, 'Reminders active — we\'ll alert you when to leave'),
          ),
          upcoming.map(q =>
            React.createElement('div', {
              key: q.name,
              style: {
                background: theme.surface, border: `1px solid ${theme.cardBorder}`,
                borderRadius: 16, padding: '14px', marginBottom: 10,
              },
            },
              React.createElement('div', { style: { display: 'flex', gap: 12, alignItems: 'center' } },
                React.createElement('div', { style: { width: 46, height: 46, borderRadius: 13, background: theme.surfaceAlt, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 } }, q.icon),
                React.createElement('div', { style: { flex: 1 } },
                  React.createElement('h4', { style: { fontSize: 14, fontWeight: 700, color: theme.text } }, q.name),
                  React.createElement('p', { style: { fontSize: 12, color: theme.textSecondary } }, q.type),
                  React.createElement('p', { style: { fontSize: 11, color: theme.primary, fontWeight: 700, marginTop: 3 } }, q.when),
                ),
                React.createElement('div', { style: { textAlign: 'right' } },
                  React.createElement('div', { style: { fontSize: 18, fontWeight: 900, color: waitColor(q.wait) } }, `~${q.wait}m`),
                  React.createElement('div', { style: { fontSize: 10, color: theme.textTertiary } }, 'est. wait'),
                ),
              ),
            )
          ),
        ),

        // HISTORY
        tab === 'history' && React.createElement('div', null,
          history.map(h => {
            const diff = h.actual - h.predicted;
            return React.createElement('div', {
              key: h.name,
              style: {
                background: theme.surface, border: `1px solid ${theme.cardBorder}`,
                borderRadius: 16, padding: '14px', marginBottom: 10,
                display: 'flex', gap: 12, alignItems: 'center',
              },
            },
              React.createElement('div', { style: { width: 46, height: 46, borderRadius: 13, background: theme.surfaceAlt, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 } }, h.icon),
              React.createElement('div', { style: { flex: 1 } },
                React.createElement('h4', { style: { fontSize: 14, fontWeight: 700, color: theme.text } }, h.name),
                React.createElement('p', { style: { fontSize: 12, color: theme.textSecondary } }, h.date),
                React.createElement('div', { style: { display: 'flex', gap: 10, marginTop: 5 } },
                  React.createElement('span', { style: { fontSize: 11, color: theme.textTertiary } }, `Predicted: ${h.predicted}m`),
                  React.createElement('span', { style: { fontSize: 11, fontWeight: 700, color: theme.text } }, `Actual: ${h.actual}m`),
                ),
              ),
              chip(diff > 0 ? `+${diff}m over` : `${diff}m under`, diff > 3 ? theme.danger : theme.success),
            );
          }),
        ),
      ),
    );
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // SCREEN: INSIGHTS
  // ─────────────────────────────────────────────────────────────────────────────
  function InsightsScreen() {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const waits = [22, 14, 18, 32, 48, 58, 36];
    const maxW = Math.max(...waits);
    const busyTimes = [
      { time: '8–10 AM',  pct: 18, label: 'Low',      best: true  },
      { time: '10–12 PM', pct: 44, label: 'Moderate', best: false },
      { time: '12–2 PM',  pct: 80, label: 'Busy',     best: false },
      { time: '2–4 PM',   pct: 52, label: 'Moderate', best: false },
      { time: '4–6 PM',   pct: 96, label: 'Very Busy',best: false },
      { time: '6–8 PM',   pct: 62, label: 'Busy',     best: false },
    ];
    const insights = [
      { icon: '💡', title: 'Best time this week', body: 'Tuesday 8–10 AM at CVS: avg wait only 8 min', color: theme.success },
      { icon: '⚠️', title: 'Avoid Friday 5 PM',  body: 'Grocery service desks spike 3× on Friday evenings', color: theme.warning },
      { icon: '🎯', title: '2.4 hrs saved this month', body: 'Smart arrivals beat the crowd 12 times already', color: theme.primary },
    ];

    return React.createElement('div', {
      style: { height: '100%', overflowY: 'auto', background: theme.bg, fontFamily: "'Plus Jakarta Sans', sans-serif" },
    },
      React.createElement('div', {
        style: { padding: '14px 20px', background: theme.surface, borderBottom: `1px solid ${theme.divider}` },
      },
        React.createElement('h1', { style: { fontSize: 22, fontWeight: 800, color: theme.text } }, 'Wait Insights'),
      ),

      React.createElement('div', { style: { padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 14 } },

        // Stats
        React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 } },
          [
            { val: '18m',  label: 'Avg Wait',    sub: 'this week' },
            { val: '12',   label: 'Trips Saved', sub: 'this month' },
            { val: '2.4h', label: 'Hrs Saved',   sub: 'this month' },
          ].map(s =>
            React.createElement('div', {
              key: s.label,
              style: { background: theme.surface, border: `1px solid ${theme.cardBorder}`, borderRadius: 14, padding: '14px 10px', textAlign: 'center' },
            },
              React.createElement('div', { style: { fontSize: 22, fontWeight: 900, color: theme.primary } }, s.val),
              React.createElement('div', { style: { fontSize: 11, fontWeight: 700, color: theme.text, marginTop: 3 } }, s.label),
              React.createElement('div', { style: { fontSize: 10, color: theme.textTertiary } }, s.sub),
            )
          ),
        ),

        // Weekly chart
        React.createElement('div', {
          style: { background: theme.surface, border: `1px solid ${theme.cardBorder}`, borderRadius: 18, padding: '16px' },
        },
          React.createElement('h3', { style: { fontSize: 13, fontWeight: 800, color: theme.text, marginBottom: 16 } }, 'Average Wait by Day'),
          React.createElement('div', { style: { display: 'flex', alignItems: 'flex-end', gap: 6, height: 90 } },
            days.map((d, i) =>
              React.createElement('div', {
                key: d,
                style: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 },
              },
                React.createElement('div', { style: { position: 'relative', width: '100%', display: 'flex', justifyContent: 'center' } },
                  i === 1 && React.createElement('span', {
                    style: {
                      position: 'absolute', bottom: '100%', marginBottom: 2,
                      background: theme.success, color: '#fff',
                      borderRadius: 4, padding: '1px 5px', fontSize: 9, fontWeight: 800, whiteSpace: 'nowrap',
                    },
                  }, '✓ Best'),
                  React.createElement('div', {
                    style: {
                      width: '80%',
                      height: `${(waits[i] / maxW) * 75}px`,
                      borderRadius: '4px 4px 0 0', minHeight: 5,
                      background: i === 4 ? theme.danger : i === 1 ? theme.success : theme.primary + '88',
                    },
                  }),
                ),
                React.createElement('span', { style: { fontSize: 10, color: theme.textSecondary, fontWeight: 600 } }, d),
              )
            ),
          ),
        ),

        // Busy times
        React.createElement('div', {
          style: { background: theme.surface, border: `1px solid ${theme.cardBorder}`, borderRadius: 18, padding: '16px' },
        },
          React.createElement('h3', { style: { fontSize: 13, fontWeight: 800, color: theme.text, marginBottom: 14 } }, 'Busy Times — Today'),
          busyTimes.map(bt =>
            React.createElement('div', {
              key: bt.time,
              style: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 },
            },
              React.createElement('span', { style: { fontSize: 11, color: theme.textSecondary, width: 58, flexShrink: 0 } }, bt.time),
              React.createElement('div', { style: { flex: 1, height: 8, background: theme.surfaceAlt, borderRadius: 4 } },
                React.createElement('div', {
                  style: { height: '100%', width: `${bt.pct}%`, borderRadius: 4, background: waitColor(bt.pct * 0.65) },
                }),
              ),
              React.createElement('span', {
                style: { fontSize: 11, fontWeight: 700, color: bt.best ? theme.success : waitColor(bt.pct * 0.65), width: 58, textAlign: 'right', flexShrink: 0 },
              }, bt.best ? '⭐ ' + bt.label : bt.label),
            )
          ),
        ),

        // Smart insights
        React.createElement('div', null,
          React.createElement('h3', { style: { fontSize: 13, fontWeight: 800, color: theme.text, marginBottom: 10 } }, '✨ Smart Insights'),
          insights.map(ins =>
            React.createElement('div', {
              key: ins.title,
              style: {
                background: theme.surface, border: `1px solid ${theme.cardBorder}`,
                borderRadius: 14, padding: '13px', marginBottom: 9,
                display: 'flex', gap: 12, alignItems: 'center',
              },
            },
              React.createElement('div', {
                style: { width: 38, height: 38, borderRadius: 11, background: ins.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 },
              }, ins.icon),
              React.createElement('div', null,
                React.createElement('h4', { style: { fontSize: 13, fontWeight: 800, color: theme.text } }, ins.title),
                React.createElement('p', { style: { fontSize: 12, color: theme.textSecondary, marginTop: 3 } }, ins.body),
              ),
            )
          ),
        ),
      ),
    );
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // SCREEN: SETTINGS
  // ─────────────────────────────────────────────────────────────────────────────
  function SettingsScreen() {
    const sections = [
      {
        title: 'Preferences',
        items: [
          { icon: window.lucide.Bell,        label: 'Notifications',    value: 'All Alerts' },
          { icon: window.lucide.MapPin,       label: 'Location Access',  value: 'Always On'  },
          { icon: window.lucide.Clock,        label: 'Departure Buffer', value: '10 min early' },
          { icon: window.lucide.RefreshCw,    label: 'Auto-Refresh Rate',value: 'Every 5 min' },
        ],
      },
      {
        title: 'Account',
        items: [
          { icon: window.lucide.User,         label: 'Profile',          value: '' },
          { icon: window.lucide.Share2,       label: 'Invite Friends',   value: '' },
          { icon: window.lucide.Star,         label: 'Rate the App',     value: '' },
        ],
      },
      {
        title: 'Support',
        items: [
          { icon: window.lucide.HelpCircle,   label: 'Help Center',      value: '' },
          { icon: window.lucide.MessageSquare,label: 'Send Feedback',    value: '' },
        ],
      },
    ];

    return React.createElement('div', {
      style: { height: '100%', overflowY: 'auto', background: theme.bg, fontFamily: "'Plus Jakarta Sans', sans-serif" },
    },
      React.createElement('div', {
        style: { padding: '14px 20px', background: theme.surface, borderBottom: `1px solid ${theme.divider}` },
      },
        React.createElement('h1', { style: { fontSize: 22, fontWeight: 800, color: theme.text } }, 'Settings'),
      ),

      React.createElement('div', { style: { padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 12 } },

        // Profile
        React.createElement('div', {
          style: {
            background: theme.surface, border: `1px solid ${theme.cardBorder}`,
            borderRadius: 20, padding: '16px', display: 'flex', gap: 14, alignItems: 'center',
          },
        },
          React.createElement('div', {
            style: {
              width: 58, height: 58, borderRadius: '50%', background: theme.gradient,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontSize: 22, fontWeight: 800,
            },
          }, 'SC'),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('h3', { style: { fontSize: 17, fontWeight: 800, color: theme.text } }, 'Sarah Chen'),
            React.createElement('p', { style: { fontSize: 13, color: theme.textSecondary } }, 'sarah.chen@email.com'),
            React.createElement('div', { style: { marginTop: 6 } },
              chip('⭐ Pro Member', theme.primary),
            ),
          ),
          React.createElement(window.lucide.ChevronRight, { size: 18, color: theme.textTertiary }),
        ),

        // Stats strip
        React.createElement('div', {
          style: {
            background: theme.gradient,
            borderRadius: 16, padding: '14px',
            display: 'flex', justifyContent: 'space-around',
          },
        },
          [
            { val: '47', label: 'Queues joined' },
            { val: '12h', label: 'Time saved' },
            { val: '94%', label: 'Accuracy' },
          ].map(s =>
            React.createElement('div', { key: s.label, style: { textAlign: 'center' } },
              React.createElement('div', { style: { fontSize: 22, fontWeight: 900, color: '#fff' } }, s.val),
              React.createElement('div', { style: { fontSize: 10, color: 'rgba(255,255,255,0.75)', marginTop: 2, fontWeight: 600 } }, s.label),
            )
          ),
        ),

        // Appearance / theme toggle
        React.createElement('div', {
          style: {
            background: theme.surface, border: `1px solid ${theme.cardBorder}`,
            borderRadius: 16, padding: '14px',
            display: 'flex', alignItems: 'center', gap: 12,
          },
        },
          React.createElement('div', {
            style: { width: 36, height: 36, borderRadius: 10, background: theme.primary + '18', display: 'flex', alignItems: 'center', justifyContent: 'center' },
          },
            React.createElement(isDark ? window.lucide.Sun : window.lucide.Moon, { size: 17, color: theme.primary }),
          ),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('p', { style: { fontSize: 14, fontWeight: 700, color: theme.text } }, isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'),
            React.createElement('p', { style: { fontSize: 11, color: theme.textSecondary } }, 'Current: ' + (isDark ? 'Dark' : 'Light')),
          ),
          React.createElement('div', {
            onClick: () => setIsDark(!isDark),
            style: {
              width: 46, height: 26, borderRadius: 13,
              background: isDark ? theme.primary : theme.surfaceAlt,
              border: `1px solid ${theme.cardBorder}`,
              cursor: 'pointer', position: 'relative', transition: 'background 0.2s',
            },
          },
            React.createElement('div', {
              style: {
                position: 'absolute', top: 3,
                left: isDark ? 23 : 3,
                width: 18, height: 18, borderRadius: '50%',
                background: '#fff', boxShadow: '0 1px 4px rgba(0,0,0,0.25)',
                transition: 'left 0.2s',
              },
            }),
          ),
        ),

        // Setting sections
        sections.map(sec =>
          React.createElement('div', { key: sec.title },
            React.createElement('p', {
              style: { fontSize: 11, fontWeight: 800, color: theme.textTertiary, marginBottom: 8, letterSpacing: 0.8, textTransform: 'uppercase' },
            }, sec.title),
            React.createElement('div', {
              style: { background: theme.surface, border: `1px solid ${theme.cardBorder}`, borderRadius: 16, overflow: 'hidden' },
            },
              sec.items.map((item, i) =>
                React.createElement('div', {
                  key: item.label,
                  style: {
                    display: 'flex', alignItems: 'center', gap: 12,
                    padding: '13px 14px',
                    borderBottom: i < sec.items.length - 1 ? `1px solid ${theme.divider}` : 'none',
                    cursor: 'pointer',
                  },
                },
                  React.createElement('div', {
                    style: { width: 32, height: 32, borderRadius: 9, background: theme.primary + '14', display: 'flex', alignItems: 'center', justifyContent: 'center' },
                  },
                    React.createElement(item.icon, { size: 15, color: theme.primary }),
                  ),
                  React.createElement('span', { style: { flex: 1, fontSize: 14, fontWeight: 600, color: theme.text } }, item.label),
                  item.value && React.createElement('span', { style: { fontSize: 12, color: theme.textTertiary } }, item.value),
                  React.createElement(window.lucide.ChevronRight, { size: 15, color: theme.textTertiary }),
                )
              ),
            ),
          )
        ),

        // Version
        React.createElement('p', {
          style: { textAlign: 'center', fontSize: 11, color: theme.textTertiary, paddingBottom: 4 },
        }, 'Nimbus Queue v1.0.0 · ☁️ Made with care'),
      ),
    );
  }

  // ─── Screen Registry ──────────────────────────────────────────────────────────
  const screens = {
    home:     HomeScreen,
    explore:  ExploreScreen,
    queue:    QueueScreen,
    insights: InsightsScreen,
    settings: SettingsScreen,
  };

  // ─── Status Bar Time ──────────────────────────────────────────────────────────
  const [time, setTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  useEffect(() => {
    const t = setInterval(() => setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })), 30000);
    return () => clearInterval(t);
  }, []);

  // ─────────────────────────────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────────────────────────────
  return React.createElement('div', {
    style: {
      minHeight: '100vh',
      background: '#D8DADF',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
    },
  },
    React.createElement('div', {
      style: {
        width: 375, height: 812,
        borderRadius: 52,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        background: theme.bg,
        boxShadow: '0 40px 100px rgba(0,0,0,0.4), 0 0 0 11px #1C1C1E, 0 0 0 13px #3A3A3C, 0 0 0 14px #1C1C1E',
        transition: 'background 0.3s',
      },
    },
      // ── Status Bar
      React.createElement('div', {
        style: {
          height: 48, flexShrink: 0, position: 'relative',
          background: theme.surface,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 26px', zIndex: 20,
          transition: 'background 0.3s',
        },
      },
        React.createElement('span', { style: { fontSize: 13, fontWeight: 800, color: theme.statusBar } }, time),
        // Dynamic Island
        React.createElement('div', {
          style: {
            position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)',
            width: 122, height: 34, background: '#000', borderRadius: 20,
          },
        }),
        // Right status icons
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 5 } },
          React.createElement(window.lucide.Wifi, { size: 14, color: theme.statusBar }),
          React.createElement('span', { style: { fontSize: 12, fontWeight: 700, color: theme.statusBar } }, '87%'),
          React.createElement(window.lucide.BatteryMedium, { size: 18, color: theme.statusBar }),
        ),
      ),

      // ── Content
      React.createElement('div', {
        style: { flex: 1, overflow: 'hidden', position: 'relative', transition: 'background 0.3s' },
      },
        React.createElement(screens[activeTab]),
      ),

      // ── Bottom Nav
      React.createElement('div', {
        style: {
          flexShrink: 0, height: 82,
          background: theme.navBg,
          borderTop: `1px solid ${theme.navBorder}`,
          display: 'flex', alignItems: 'flex-start',
          padding: '6px 4px 0',
          transition: 'background 0.3s',
        },
      },
        tabs.map(tab =>
          React.createElement('div', {
            key: tab.id,
            onClick: () => setActiveTab(tab.id),
            style: {
              flex: 1,
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', gap: 3,
              padding: '8px 2px',
              cursor: 'pointer',
              borderRadius: 14,
              background: activeTab === tab.id ? theme.primaryLight : 'transparent',
              transition: 'all 0.15s',
            },
          },
            React.createElement(tab.icon, {
              size: 21,
              color: activeTab === tab.id ? theme.primary : theme.textTertiary,
              strokeWidth: activeTab === tab.id ? 2.5 : 1.8,
            }),
            React.createElement('span', {
              style: {
                fontSize: 10,
                fontWeight: activeTab === tab.id ? 800 : 500,
                color: activeTab === tab.id ? theme.primary : theme.textTertiary,
              },
            }, tab.label),
          )
        ),
      ),
    ),
  );
}
