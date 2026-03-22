const { useState, useEffect, useRef } = React;

function App() {
  const themes = {
    dark: {
      bg: '#070D1A',
      surface: '#0E1628',
      surface2: '#152038',
      surface3: '#1C2D4E',
      border: '#243351',
      primary: '#00E5B0',
      primaryDim: 'rgba(0,229,176,0.12)',
      primaryGlow: 'rgba(0,229,176,0.25)',
      secondary: '#7B6EF6',
      secondaryDim: 'rgba(123,110,246,0.15)',
      danger: '#FF5C87',
      dangerDim: 'rgba(255,92,135,0.15)',
      warning: '#FFB340',
      warningDim: 'rgba(255,179,64,0.15)',
      text: '#EDF2FF',
      textMuted: '#607B9F',
      textSub: '#8BA0C2',
      card: '#0E1628',
      cardAlt: '#152038',
    },
    light: {
      bg: '#EDF2FF',
      surface: '#FFFFFF',
      surface2: '#F4F7FF',
      surface3: '#E6EDFF',
      border: '#D0DAFB',
      primary: '#009E7A',
      primaryDim: 'rgba(0,158,122,0.10)',
      primaryGlow: 'rgba(0,158,122,0.22)',
      secondary: '#5E4FE0',
      secondaryDim: 'rgba(94,79,224,0.10)',
      danger: '#D63B6A',
      dangerDim: 'rgba(214,59,106,0.10)',
      warning: '#C07A00',
      warningDim: 'rgba(192,122,0,0.10)',
      text: '#0B1730',
      textMuted: '#7B90B8',
      textSub: '#5A6E94',
      card: '#FFFFFF',
      cardAlt: '#F4F7FF',
    },
  };

  const [themeName, setThemeName] = useState('dark');
  const [activeTab, setActiveTab] = useState('home');
  const [pressedBtn, setPressedBtn] = useState(null);
  const [calendarMonth, setCalendarMonth] = useState(2); // March = 2
  const [billsFilter, setBillsFilter] = useState('all');
  const [showAddReserve, setShowAddReserve] = useState(false);
  const [safeSpendPulse, setSafeSpendPulse] = useState(false);

  const t = themes[themeName];

  useEffect(() => {
    const timer = setInterval(() => setSafeSpendPulse(p => !p), 2000);
    return () => clearInterval(timer);
  }, []);

  const bills = [
    { id: 1, name: 'Rent', amount: 1450, due: 1, category: 'housing', icon: 'Home', freq: 'monthly', predicted: false, status: 'upcoming', daysLeft: 10 },
    { id: 2, name: 'Car Insurance', amount: 187, due: 8, category: 'insurance', icon: 'Car', freq: 'monthly', predicted: false, status: 'upcoming', daysLeft: 17 },
    { id: 3, name: 'Netflix', amount: 22, due: 12, category: 'subscriptions', icon: 'Tv', freq: 'monthly', predicted: false, status: 'upcoming', daysLeft: 21 },
    { id: 4, name: 'Spotify', amount: 11, due: 12, category: 'subscriptions', icon: 'Music', freq: 'monthly', predicted: false, status: 'cluster', daysLeft: 21 },
    { id: 5, name: 'Electric Bill', amount: 134, due: 15, category: 'utilities', icon: 'Zap', freq: 'monthly', predicted: true, status: 'upcoming', daysLeft: 24 },
    { id: 6, name: 'Car Maintenance', amount: 320, due: 20, category: 'auto', icon: 'Wrench', freq: 'irregular', predicted: true, status: 'predicted', daysLeft: 29 },
    { id: 7, name: 'Annual Health Check', amount: 210, due: 28, category: 'medical', icon: 'Heart', freq: 'annual', predicted: true, status: 'predicted', daysLeft: 37 },
    { id: 8, name: 'Amazon Prime', amount: 139, due: 15, category: 'subscriptions', icon: 'Package', freq: 'annual', predicted: false, status: 'cluster', daysLeft: 24 },
  ];

  const reserves = [
    { id: 1, name: 'Car Insurance Premium', target: 600, saved: 348, icon: 'Car', color: '#7B6EF6', weeklyGoal: 42, dueDate: 'Jun 2026' },
    { id: 2, name: 'Holiday Spending', target: 800, saved: 120, icon: 'Gift', color: '#FF5C87', weeklyGoal: 30, dueDate: 'Dec 2026' },
    { id: 3, name: 'Annual Taxes (Q2)', target: 1200, saved: 900, icon: 'FileText', color: '#FFB340', weeklyGoal: 75, dueDate: 'Apr 2026' },
    { id: 4, name: 'Home Maintenance', target: 500, saved: 210, icon: 'Hammer', color: '#00E5B0', weeklyGoal: 25, dueDate: 'Jun 2026' },
  ];

  const calendarData = {
    2: {
      income: [1, 15],
      bills: [1, 8, 12, 15, 20, 28],
      pressure: { 1: 'high', 8: 'low', 12: 'medium', 15: 'high', 20: 'medium', 28: 'low' },
      daysInMonth: 31,
      startDay: 0,
    }
  };

  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const Icon = ({ name, size = 20, color, style = {} }) => {
    const LucideIcon = window.lucide ? window.lucide[name] : null;
    if (!LucideIcon) return React.createElement('span', { style: { width: size, height: size, display: 'inline-block', ...style } });
    return React.createElement(LucideIcon, { size, color: color || t.text, style, strokeWidth: 1.8 });
  };

  const press = (id) => {
    setPressedBtn(id);
    setTimeout(() => setPressedBtn(null), 150);
  };

  const formatCurrency = (n) => n >= 1000 ? `$${(n/1000).toFixed(1)}k` : `$${n}`;

  // ─── STATUS BAR ──────────────────────────────────────────────────────────────
  const StatusBar = () => (
    React.createElement('div', {
      style: {
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '12px 20px 6px', fontSize: 12, fontWeight: 600,
        color: t.textMuted, letterSpacing: 0.3,
      }
    },
      React.createElement('span', null, '9:41'),
      React.createElement('div', { style: { width: 120, height: 32, background: '#000', borderRadius: 20, position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: 0 } }),
      React.createElement('div', { style: { display: 'flex', gap: 6, alignItems: 'center' } },
        React.createElement(Icon, { name: 'Wifi', size: 14, color: t.textMuted }),
        React.createElement(Icon, { name: 'Battery', size: 14, color: t.textMuted }),
      )
    )
  );

  // ─── BOTTOM NAV ──────────────────────────────────────────────────────────────
  const navItems = [
    { id: 'home', icon: 'LayoutDashboard', label: 'Dashboard' },
    { id: 'calendar', icon: 'CalendarDays', label: 'Flow' },
    { id: 'bills', icon: 'Receipt', label: 'Bills' },
    { id: 'reserves', icon: 'PiggyBank', label: 'Reserves' },
    { id: 'settings', icon: 'Settings2', label: 'Settings' },
  ];

  const BottomNav = () => (
    React.createElement('div', {
      style: {
        display: 'flex', justifyContent: 'space-around', alignItems: 'center',
        padding: '10px 8px 20px',
        background: t.surface,
        borderTop: `1px solid ${t.border}`,
        flexShrink: 0,
      }
    },
      navItems.map(item =>
        React.createElement('button', {
          key: item.id,
          onClick: () => { press(item.id); setActiveTab(item.id); },
          style: {
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
            background: 'none', border: 'none', cursor: 'pointer', padding: '6px 10px',
            borderRadius: 14,
            transform: pressedBtn === item.id ? 'scale(0.88)' : 'scale(1)',
            transition: 'all 0.15s ease',
            background: activeTab === item.id ? t.primaryDim : 'transparent',
          }
        },
          React.createElement(Icon, {
            name: item.icon, size: 22,
            color: activeTab === item.id ? t.primary : t.textMuted
          }),
          React.createElement('span', {
            style: {
              fontSize: 10, fontWeight: 600,
              color: activeTab === item.id ? t.primary : t.textMuted,
              fontFamily: 'Plus Jakarta Sans, sans-serif',
            }
          }, item.label)
        )
      )
    )
  );

  // ─── HOME SCREEN ─────────────────────────────────────────────────────────────
  const HomeScreen = () => {
    const safeAmount = 127;
    const safeMax = 400;
    const safePercent = safeAmount / safeMax;
    const radius = 72;
    const circ = 2 * Math.PI * radius;
    const dashOffset = circ * (1 - safePercent * 0.75);

    return React.createElement('div', { style: { flex: 1, overflowY: 'auto', overflowX: 'hidden' } },
      // Header
      React.createElement('div', {
        style: { padding: '8px 20px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }
      },
        React.createElement('div', null,
          React.createElement('p', { style: { fontSize: 13, color: t.textMuted, margin: 0, fontWeight: 500 } }, 'Good morning,'),
          React.createElement('h2', { style: { fontSize: 22, color: t.text, margin: 0, fontWeight: 700 } }, 'Alex Chen'),
        ),
        React.createElement('div', {
          style: {
            width: 42, height: 42, borderRadius: '50%',
            background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 16, fontWeight: 700, color: '#fff',
          }
        }, 'AC')
      ),

      // Safe-spend meter card
      React.createElement('div', {
        style: {
          margin: '0 16px 16px',
          background: themeName === 'dark'
            ? `linear-gradient(135deg, #0E1628 0%, #152038 100%)`
            : `linear-gradient(135deg, #fff 0%, #f4f7ff 100%)`,
          borderRadius: 24, padding: '20px 20px 16px',
          border: `1px solid ${t.border}`,
          boxShadow: `0 0 32px ${t.primaryGlow}`,
          position: 'relative', overflow: 'hidden',
        }
      },
        React.createElement('div', {
          style: {
            position: 'absolute', top: -30, right: -30,
            width: 140, height: 140, borderRadius: '50%',
            background: t.primaryGlow, filter: 'blur(40px)',
          }
        }),
        React.createElement('p', { style: { fontSize: 12, color: t.textMuted, fontWeight: 600, margin: '0 0 12px', letterSpacing: 0.8, textTransform: 'uppercase' } }, 'Safe to Spend Today'),
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 24 } },
          // SVG gauge
          React.createElement('div', { style: { position: 'relative', width: 160, height: 100, flexShrink: 0 } },
            React.createElement('svg', { width: 160, height: 160, style: { position: 'absolute', top: -30, left: 0 } },
              React.createElement('circle', {
                cx: 80, cy: 100, r: radius,
                fill: 'none', stroke: t.border, strokeWidth: 10,
                strokeDasharray: `${circ * 0.75} ${circ}`,
                strokeDashoffset: -circ * 0.125,
                strokeLinecap: 'round',
              }),
              React.createElement('circle', {
                cx: 80, cy: 100, r: radius,
                fill: 'none', stroke: t.primary, strokeWidth: 10,
                strokeDasharray: `${circ * 0.75 * safePercent} ${circ}`,
                strokeDashoffset: -circ * 0.125,
                strokeLinecap: 'round',
                style: { transition: 'stroke-dasharray 1s ease', filter: `drop-shadow(0 0 6px ${t.primary})` }
              }),
            ),
            React.createElement('div', {
              style: {
                position: 'absolute', bottom: 0, left: 0, right: 0,
                display: 'flex', flexDirection: 'column', alignItems: 'center',
              }
            },
              React.createElement('span', { style: { fontSize: 30, fontWeight: 800, color: t.primary, lineHeight: 1 } }, '$127'),
              React.createElement('span', { style: { fontSize: 11, color: t.textMuted, fontWeight: 500 } }, 'of $400 weekly')
            )
          ),
          // Breakdown
          React.createElement('div', { style: { flex: 1 } },
            [
              { label: 'Income in', val: '$3,200', color: t.primary, icon: 'TrendingUp' },
              { label: 'Bills due', val: '$1,804', color: t.warning, icon: 'AlertCircle' },
              { label: 'Reserved', val: '$450', color: t.secondary, icon: 'Shield' },
            ].map((row, i) =>
              React.createElement('div', { key: i, style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 } },
                React.createElement('div', {
                  style: {
                    width: 28, height: 28, borderRadius: 8,
                    background: row.color + '22',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }
                },
                  React.createElement(Icon, { name: row.icon, size: 14, color: row.color })
                ),
                React.createElement('div', null,
                  React.createElement('p', { style: { fontSize: 10, color: t.textMuted, margin: 0, fontWeight: 500 } }, row.label),
                  React.createElement('p', { style: { fontSize: 14, color: t.text, margin: 0, fontWeight: 700 } }, row.val),
                )
              )
            )
          )
        )
      ),

      // Alert banner
      React.createElement('div', {
        style: {
          margin: '0 16px 16px',
          background: t.warningDim,
          border: `1px solid ${t.warning}40`,
          borderRadius: 16, padding: '12px 16px',
          display: 'flex', gap: 12, alignItems: 'flex-start',
        }
      },
        React.createElement(Icon, { name: 'AlertTriangle', size: 18, color: t.warning }),
        React.createElement('div', null,
          React.createElement('p', { style: { fontSize: 13, fontWeight: 700, color: t.warning, margin: '0 0 2px' } }, 'Bill cluster detected'),
          React.createElement('p', { style: { fontSize: 12, color: t.textSub, margin: 0 } }, 'Netflix & Spotify both renew on Apr 12. Consider moving Spotify to Apr 20 — after payday.')
        )
      ),

      // Upcoming pressure section
      React.createElement('div', { style: { padding: '0 20px 8px' } },
        React.createElement('h3', { style: { fontSize: 14, fontWeight: 700, color: t.text, margin: '0 0 12px' } }, 'Upcoming Pressure Points')
      ),

      bills.slice(0, 5).map(bill =>
        React.createElement('div', {
          key: bill.id,
          style: {
            margin: '0 16px 8px',
            background: t.surface,
            borderRadius: 16, padding: '12px 16px',
            border: `1px solid ${bill.status === 'cluster' ? t.warning + '60' : t.border}`,
            display: 'flex', alignItems: 'center', gap: 12,
          }
        },
          React.createElement('div', {
            style: {
              width: 40, height: 40, borderRadius: 12, flexShrink: 0,
              background: bill.status === 'cluster' ? t.warningDim : bill.predicted ? t.secondaryDim : t.primaryDim,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }
          },
            React.createElement(Icon, {
              name: bill.icon, size: 18,
              color: bill.status === 'cluster' ? t.warning : bill.predicted ? t.secondary : t.primary
            })
          ),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('p', { style: { fontSize: 14, fontWeight: 700, color: t.text, margin: 0 } }, bill.name),
            React.createElement('p', { style: { fontSize: 12, color: t.textMuted, margin: 0 } },
              bill.predicted ? `Predicted · ${bill.freq}` : `${bill.freq} · due Apr ${bill.due}`
            )
          ),
          React.createElement('div', { style: { textAlign: 'right' } },
            React.createElement('p', { style: { fontSize: 15, fontWeight: 800, color: t.text, margin: 0 } }, `$${bill.amount}`),
            React.createElement('span', {
              style: {
                fontSize: 10, fontWeight: 600, borderRadius: 6, padding: '2px 6px',
                background: bill.daysLeft <= 14 ? t.dangerDim : t.primaryDim,
                color: bill.daysLeft <= 14 ? t.danger : t.primary,
              }
            }, `${bill.daysLeft}d`)
          )
        )
      ),
      React.createElement('div', { style: { height: 16 } })
    );
  };

  // ─── CALENDAR SCREEN ─────────────────────────────────────────────────────────
  const CalendarScreen = () => {
    const data = calendarData[2];
    const days = [];
    for (let i = 0; i < data.startDay; i++) days.push(null);
    for (let i = 1; i <= data.daysInMonth; i++) days.push(i);

    const pressureColor = (level) => {
      if (level === 'high') return t.danger;
      if (level === 'medium') return t.warning;
      return t.primary;
    };

    return React.createElement('div', { style: { flex: 1, overflowY: 'auto' } },
      React.createElement('div', { style: { padding: '8px 20px 16px' } },
        React.createElement('h2', { style: { fontSize: 22, fontWeight: 700, color: t.text, margin: '0 0 4px' } }, 'Cash Flow'),
        React.createElement('p', { style: { fontSize: 13, color: t.textMuted, margin: 0 } }, 'See your financial pressure points'),
      ),

      // Month navigation
      React.createElement('div', {
        style: {
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '0 20px 16px',
        }
      },
        React.createElement('button', {
          onClick: () => setCalendarMonth(m => Math.max(0, m - 1)),
          style: { background: t.surface2, border: 'none', borderRadius: 10, padding: '8px 12px', cursor: 'pointer' }
        }, React.createElement(Icon, { name: 'ChevronLeft', size: 18, color: t.textMuted })),
        React.createElement('span', { style: { fontSize: 16, fontWeight: 700, color: t.text } }, `${monthNames[calendarMonth]} 2026`),
        React.createElement('button', {
          onClick: () => setCalendarMonth(m => Math.min(11, m + 1)),
          style: { background: t.surface2, border: 'none', borderRadius: 10, padding: '8px 12px', cursor: 'pointer' }
        }, React.createElement(Icon, { name: 'ChevronRight', size: 18, color: t.textMuted }))
      ),

      // Income summary bar
      React.createElement('div', {
        style: {
          margin: '0 16px 16px',
          background: t.primaryDim,
          border: `1px solid ${t.primary}40`,
          borderRadius: 16, padding: '12px 16px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }
      },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8 } },
          React.createElement(Icon, { name: 'TrendingUp', size: 16, color: t.primary }),
          React.createElement('span', { style: { fontSize: 13, fontWeight: 600, color: t.primary } }, 'Apr 1 & 15 — Payday')
        ),
        React.createElement('span', { style: { fontSize: 14, fontWeight: 800, color: t.primary } }, '+$3,200')
      ),

      // Calendar grid
      React.createElement('div', { style: { padding: '0 16px 16px' } },
        // Day headers
        React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, marginBottom: 8 } },
          ['S','M','T','W','T','F','S'].map((d, i) =>
            React.createElement('div', { key: i, style: { textAlign: 'center', fontSize: 11, fontWeight: 700, color: t.textMuted } }, d)
          )
        ),
        // Day cells
        React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4 } },
          days.map((day, i) => {
            const isIncome = data.income.includes(day);
            const isBill = data.bills.includes(day);
            const pressure = data.pressure[day];
            const isToday = day === 22;

            return React.createElement('div', {
              key: i,
              style: {
                aspectRatio: '1',
                borderRadius: 10,
                background: isToday ? t.primary :
                  isIncome ? t.primaryDim :
                  isBill ? pressureColor(pressure) + '22' :
                  'transparent',
                border: isToday ? 'none' : isIncome ? `1px solid ${t.primary}60` :
                  isBill ? `1px solid ${pressureColor(pressure)}60` : '1px solid transparent',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                cursor: day ? 'pointer' : 'default',
                position: 'relative',
              }
            },
              day && React.createElement('span', {
                style: {
                  fontSize: 12, fontWeight: isToday || isBill || isIncome ? 700 : 500,
                  color: isToday ? '#fff' : isBill ? pressureColor(pressure) : isIncome ? t.primary : t.textMuted,
                }
              }, day),
              isBill && !isToday && React.createElement('div', {
                style: {
                  width: 4, height: 4, borderRadius: '50%',
                  background: pressureColor(pressure),
                  position: 'absolute', bottom: 3,
                }
              })
            );
          })
        )
      ),

      // Legend
      React.createElement('div', {
        style: { display: 'flex', gap: 16, padding: '0 20px 16px', flexWrap: 'wrap' }
      },
        [
          { color: t.primary, label: 'Income' },
          { color: t.danger, label: 'High pressure' },
          { color: t.warning, label: 'Medium' },
          { color: t.primary, label: 'Low pressure', dim: true },
        ].map((item, i) =>
          React.createElement('div', { key: i, style: { display: 'flex', alignItems: 'center', gap: 6 } },
            React.createElement('div', {
              style: {
                width: 8, height: 8, borderRadius: '50%',
                background: item.dim ? t.primaryDim : item.color,
                border: `1px solid ${item.color}`,
              }
            }),
            React.createElement('span', { style: { fontSize: 11, color: t.textMuted, fontWeight: 500 } }, item.label)
          )
        )
      ),

      // Pressure events
      React.createElement('div', { style: { padding: '0 20px 8px' } },
        React.createElement('h3', { style: { fontSize: 14, fontWeight: 700, color: t.text, margin: '0 0 12px' } }, 'Pressure Events')
      ),
      [
        { day: 'Apr 1', label: 'Rent due', amount: '$1,450', level: 'high', sub: 'Payday — safe to pay' },
        { day: 'Apr 8', label: 'Car Insurance', amount: '$187', level: 'low', sub: 'Low pressure week' },
        { day: 'Apr 12', label: 'Netflix + Spotify cluster', amount: '$33', level: 'medium', sub: '3 days before payday' },
        { day: 'Apr 15', label: 'Electric + Amazon Prime', amount: '$273', level: 'high', sub: 'Payday — reserve $139 today' },
      ].map((ev, i) =>
        React.createElement('div', {
          key: i,
          style: {
            margin: '0 16px 8px',
            background: t.surface, borderRadius: 14, padding: '12px 16px',
            border: `1px solid ${t.border}`,
            display: 'flex', gap: 12, alignItems: 'center',
          }
        },
          React.createElement('div', {
            style: {
              width: 8, borderRadius: 4,
              alignSelf: 'stretch', flexShrink: 0,
              background: ev.level === 'high' ? t.danger : ev.level === 'medium' ? t.warning : t.primary,
            }
          }),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between' } },
              React.createElement('span', { style: { fontSize: 13, fontWeight: 700, color: t.text } }, ev.label),
              React.createElement('span', { style: { fontSize: 13, fontWeight: 800, color: t.text } }, ev.amount),
            ),
            React.createElement('p', { style: { fontSize: 11, color: t.textMuted, margin: '2px 0 0' } }, `${ev.day} · ${ev.sub}`)
          )
        )
      ),
      React.createElement('div', { style: { height: 16 } })
    );
  };

  // ─── BILLS SCREEN ─────────────────────────────────────────────────────────────
  const BillsScreen = () => {
    const filters = ['all', 'predicted', 'clusters'];
    const filtered = bills.filter(b => {
      if (billsFilter === 'all') return true;
      if (billsFilter === 'predicted') return b.predicted;
      if (billsFilter === 'clusters') return b.status === 'cluster';
      return true;
    });

    const categoryColors = {
      housing: t.primary, insurance: t.secondary, subscriptions: t.warning,
      utilities: '#22D3EE', auto: '#F97316', medical: t.danger,
    };

    return React.createElement('div', { style: { flex: 1, overflowY: 'auto' } },
      React.createElement('div', {
        style: { padding: '8px 20px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }
      },
        React.createElement('div', null,
          React.createElement('h2', { style: { fontSize: 22, fontWeight: 700, color: t.text, margin: '0 0 2px' } }, 'Bills'),
          React.createElement('p', { style: { fontSize: 13, color: t.textMuted, margin: 0 } }, 'Apr 2026 · $2,473 total'),
        ),
        React.createElement('button', {
          style: {
            background: t.primaryDim, border: `1px solid ${t.primary}40`,
            borderRadius: 12, padding: '8px 12px', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 6,
          }
        },
          React.createElement(Icon, { name: 'Plus', size: 16, color: t.primary }),
          React.createElement('span', { style: { fontSize: 12, fontWeight: 700, color: t.primary } }, 'Add')
        )
      ),

      // Filter tabs
      React.createElement('div', {
        style: { display: 'flex', gap: 8, padding: '0 20px 16px' }
      },
        filters.map(f =>
          React.createElement('button', {
            key: f, onClick: () => setBillsFilter(f),
            style: {
              padding: '7px 16px', borderRadius: 20, border: 'none', cursor: 'pointer', fontFamily: 'Plus Jakarta Sans, sans-serif',
              fontSize: 12, fontWeight: 700, textTransform: 'capitalize',
              background: billsFilter === f ? t.primary : t.surface2,
              color: billsFilter === f ? (themeName === 'dark' ? '#0A0F1A' : '#fff') : t.textMuted,
              transition: 'all 0.15s ease',
            }
          },
            f === 'clusters' ? '⚡ Clusters' : f === 'predicted' ? '🔮 Predicted' : 'All Bills'
          )
        )
      ),

      // Bills list
      filtered.map(bill => {
        const catColor = categoryColors[bill.category] || t.primary;
        return React.createElement('div', {
          key: bill.id,
          style: {
            margin: '0 16px 8px', background: t.surface, borderRadius: 16,
            padding: '14px 16px', border: `1px solid ${bill.status === 'cluster' ? t.warning + '50' : t.border}`,
          }
        },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12 } },
            React.createElement('div', {
              style: {
                width: 44, height: 44, borderRadius: 14, flexShrink: 0,
                background: catColor + '20',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }
            }, React.createElement(Icon, { name: bill.icon, size: 20, color: catColor })),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: 2 } },
                React.createElement('span', { style: { fontSize: 15, fontWeight: 700, color: t.text } }, bill.name),
                React.createElement('span', { style: { fontSize: 16, fontWeight: 800, color: t.text } }, `$${bill.amount}`)
              ),
              React.createElement('div', { style: { display: 'flex', gap: 6, alignItems: 'center' } },
                bill.predicted && React.createElement('span', {
                  style: {
                    fontSize: 10, fontWeight: 600, padding: '2px 6px', borderRadius: 6,
                    background: t.secondaryDim, color: t.secondary,
                  }
                }, 'Predicted'),
                bill.status === 'cluster' && React.createElement('span', {
                  style: {
                    fontSize: 10, fontWeight: 600, padding: '2px 6px', borderRadius: 6,
                    background: t.warningDim, color: t.warning,
                  }
                }, '⚡ Cluster'),
                React.createElement('span', { style: { fontSize: 12, color: t.textMuted } },
                  bill.freq === 'monthly' ? `Monthly · Apr ${bill.due}` :
                  bill.freq === 'annual' ? `Annual · Apr ${bill.due}` :
                  `Irregular · ~Apr ${bill.due}`
                )
              )
            )
          )
        );
      }),
      React.createElement('div', { style: { height: 16 } })
    );
  };

  // ─── RESERVES SCREEN ─────────────────────────────────────────────────────────
  const ReservesScreen = () => {
    const totalSaved = reserves.reduce((a, r) => a + r.saved, 0);
    const totalTarget = reserves.reduce((a, r) => a + r.target, 0);

    return React.createElement('div', { style: { flex: 1, overflowY: 'auto' } },
      React.createElement('div', { style: { padding: '8px 20px 16px' } },
        React.createElement('h2', { style: { fontSize: 22, fontWeight: 700, color: t.text, margin: '0 0 2px' } }, 'Reserves'),
        React.createElement('p', { style: { fontSize: 13, color: t.textMuted, margin: 0 } }, 'Auto set-asides for future bills'),
      ),

      // Summary card
      React.createElement('div', {
        style: {
          margin: '0 16px 20px',
          background: `linear-gradient(135deg, ${t.secondary}22, ${t.primary}22)`,
          border: `1px solid ${t.secondary}40`,
          borderRadius: 20, padding: '18px 20px',
        }
      },
        React.createElement('p', { style: { fontSize: 12, fontWeight: 600, color: t.textMuted, margin: '0 0 8px', letterSpacing: 0.8, textTransform: 'uppercase' } }, 'Total Reserved'),
        React.createElement('div', { style: { display: 'flex', alignItems: 'flex-end', gap: 8, marginBottom: 12 } },
          React.createElement('span', { style: { fontSize: 32, fontWeight: 800, color: t.text } }, `$${totalSaved}`),
          React.createElement('span', { style: { fontSize: 14, color: t.textMuted, marginBottom: 4 } }, `of $${totalTarget}`),
        ),
        React.createElement('div', {
          style: { height: 8, background: t.border, borderRadius: 8, overflow: 'hidden' }
        },
          React.createElement('div', {
            style: {
              height: '100%', borderRadius: 8,
              width: `${(totalSaved / totalTarget) * 100}%`,
              background: `linear-gradient(90deg, ${t.secondary}, ${t.primary})`,
              transition: 'width 1s ease',
            }
          })
        ),
        React.createElement('p', { style: { fontSize: 11, color: t.textMuted, margin: '8px 0 0' } },
          `${Math.round((totalSaved / totalTarget) * 100)}% funded across ${reserves.length} goals`
        )
      ),

      // Reserve buckets
      reserves.map(r => {
        const pct = r.saved / r.target;
        return React.createElement('div', {
          key: r.id,
          style: {
            margin: '0 16px 12px', background: t.surface,
            borderRadius: 20, padding: '16px',
            border: `1px solid ${t.border}`,
          }
        },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 } },
            React.createElement('div', {
              style: {
                width: 44, height: 44, borderRadius: 14, flexShrink: 0,
                background: r.color + '22',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }
            }, React.createElement(Icon, { name: r.icon, size: 20, color: r.color })),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('span', { style: { fontSize: 15, fontWeight: 700, color: t.text, display: 'block' } }, r.name),
              React.createElement('span', { style: { fontSize: 12, color: t.textMuted } }, `Due ${r.dueDate}`)
            ),
            React.createElement('div', { style: { textAlign: 'right' } },
              React.createElement('span', { style: { fontSize: 16, fontWeight: 800, color: r.color, display: 'block' } }, `$${r.saved}`),
              React.createElement('span', { style: { fontSize: 11, color: t.textMuted } }, `of $${r.target}`)
            )
          ),
          React.createElement('div', { style: { height: 6, background: t.border, borderRadius: 6, overflow: 'hidden', marginBottom: 8 } },
            React.createElement('div', {
              style: {
                height: '100%', borderRadius: 6,
                width: `${pct * 100}%`,
                background: r.color,
                transition: 'width 0.8s ease',
              }
            })
          ),
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
            React.createElement('span', { style: { fontSize: 11, color: t.textMuted } },
              `$${r.weeklyGoal}/week · ${Math.round(pct * 100)}% funded`
            ),
            React.createElement('button', {
              style: {
                background: r.color + '22', border: 'none',
                borderRadius: 10, padding: '5px 12px', cursor: 'pointer',
                fontSize: 11, fontWeight: 700, color: r.color, fontFamily: 'Plus Jakarta Sans, sans-serif',
              }
            }, '+ Add funds')
          )
        );
      }),

      // Add reserve button
      React.createElement('button', {
        onClick: () => setShowAddReserve(!showAddReserve),
        style: {
          display: 'flex', alignItems: 'center', gap: 8,
          margin: '4px auto 16px',
          background: t.primaryDim, border: `1px dashed ${t.primary}60`,
          borderRadius: 16, padding: '12px 24px', cursor: 'pointer',
          fontSize: 13, fontWeight: 700, color: t.primary,
          fontFamily: 'Plus Jakarta Sans, sans-serif',
        }
      },
        React.createElement(Icon, { name: 'Plus', size: 16, color: t.primary }),
        'New reserve goal'
      ),
      React.createElement('div', { style: { height: 8 } })
    );
  };

  // ─── SETTINGS SCREEN ─────────────────────────────────────────────────────────
  const SettingsScreen = () => {
    const [payCycle, setPayCycle] = useState('biweekly');
    const [notifEnabled, setNotifEnabled] = useState(true);
    const [stressMode, setStressMode] = useState(true);

    const Toggle = ({ value, onChange }) =>
      React.createElement('button', {
        onClick: () => onChange(!value),
        style: {
          width: 46, height: 26, borderRadius: 13,
          background: value ? t.primary : t.border,
          border: 'none', cursor: 'pointer', position: 'relative',
          transition: 'background 0.3s ease', flexShrink: 0,
        }
      },
        React.createElement('div', {
          style: {
            position: 'absolute', top: 3,
            left: value ? 23 : 3,
            width: 20, height: 20, borderRadius: '50%',
            background: '#fff',
            transition: 'left 0.3s ease',
            boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
          }
        })
      );

    const Section = ({ title, children }) =>
      React.createElement('div', { style: { margin: '0 0 8px' } },
        React.createElement('p', {
          style: { fontSize: 11, fontWeight: 700, color: t.textMuted, letterSpacing: 1, textTransform: 'uppercase', padding: '0 20px', margin: '16px 0 6px' }
        }, title),
        React.createElement('div', {
          style: { margin: '0 16px', background: t.surface, borderRadius: 18, border: `1px solid ${t.border}`, overflow: 'hidden' }
        }, children)
      );

    const Row = ({ icon, label, right, bottomBorder = true }) =>
      React.createElement('div', {
        style: {
          display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px',
          borderBottom: bottomBorder ? `1px solid ${t.border}` : 'none',
        }
      },
        React.createElement('div', {
          style: { width: 32, height: 32, borderRadius: 10, background: t.surface2, display: 'flex', alignItems: 'center', justifyContent: 'center' }
        }, React.createElement(Icon, { name: icon, size: 16, color: t.textSub })),
        React.createElement('span', { style: { flex: 1, fontSize: 14, fontWeight: 600, color: t.text } }, label),
        right
      );

    return React.createElement('div', { style: { flex: 1, overflowY: 'auto' } },
      React.createElement('div', { style: { padding: '8px 20px 16px' } },
        React.createElement('h2', { style: { fontSize: 22, fontWeight: 700, color: t.text, margin: 0 } }, 'Settings'),
      ),

      // Theme toggle — prominent card
      React.createElement('div', {
        style: {
          margin: '0 16px 8px',
          background: t.surface,
          border: `1px solid ${t.border}`,
          borderRadius: 20, padding: '16px 20px',
        }
      },
        React.createElement('p', { style: { fontSize: 12, fontWeight: 700, color: t.textMuted, letterSpacing: 0.8, textTransform: 'uppercase', margin: '0 0 12px' } }, 'Appearance'),
        React.createElement('div', { style: { display: 'flex', gap: 10 } },
          ['dark', 'light'].map(th =>
            React.createElement('button', {
              key: th, onClick: () => setThemeName(th),
              style: {
                flex: 1, padding: '12px', borderRadius: 14, border: 'none', cursor: 'pointer',
                background: themeName === th ? t.primaryDim : t.surface2,
                border: `2px solid ${themeName === th ? t.primary : 'transparent'}`,
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                transition: 'all 0.2s ease',
                fontFamily: 'Plus Jakarta Sans, sans-serif',
              }
            },
              React.createElement(Icon, { name: th === 'dark' ? 'Moon' : 'Sun', size: 20, color: themeName === th ? t.primary : t.textMuted }),
              React.createElement('span', {
                style: { fontSize: 12, fontWeight: 700, color: themeName === th ? t.primary : t.textMuted, textTransform: 'capitalize' }
              }, th + ' Mode')
            )
          )
        )
      ),

      Section('Pay Cycle',
        React.createElement(Row, {
          icon: 'Calendar', label: 'Pay frequency', bottomBorder: false,
          right: React.createElement('select', {
            value: payCycle, onChange: e => setPayCycle(e.target.value),
            style: {
              background: t.primaryDim, border: `1px solid ${t.primary}40`, borderRadius: 8,
              color: t.primary, fontSize: 12, fontWeight: 700, padding: '4px 8px',
              fontFamily: 'Plus Jakarta Sans, sans-serif', cursor: 'pointer',
            }
          },
            React.createElement('option', { value: 'weekly' }, 'Weekly'),
            React.createElement('option', { value: 'biweekly' }, 'Bi-weekly'),
            React.createElement('option', { value: 'monthly' }, 'Monthly'),
            React.createElement('option', { value: 'irregular' }, 'Irregular')
          )
        })
      ),

      Section('Smart Features',
        React.createElement(Row, {
          icon: 'Bell', label: 'Bill reminders', bottomBorder: true,
          right: React.createElement(Toggle, { value: notifEnabled, onChange: setNotifEnabled })
        }),
        React.createElement(Row, {
          icon: 'Brain', label: 'Stress-aware nudges', bottomBorder: true,
          right: React.createElement(Toggle, { value: stressMode, onChange: setStressMode })
        }),
        React.createElement(Row, {
          icon: 'Zap', label: 'Cluster detection', bottomBorder: false,
          right: React.createElement(Toggle, { value: true, onChange: () => {} })
        })
      ),

      Section('Account',
        React.createElement(Row, { icon: 'User', label: 'Alex Chen', bottomBorder: true, right: React.createElement(Icon, { name: 'ChevronRight', size: 16, color: t.textMuted }) }),
        React.createElement(Row, { icon: 'CreditCard', label: 'Connected accounts', bottomBorder: true, right: React.createElement(Icon, { name: 'ChevronRight', size: 16, color: t.textMuted }) }),
        React.createElement(Row, { icon: 'Shield', label: 'Privacy & data', bottomBorder: false, right: React.createElement(Icon, { name: 'ChevronRight', size: 16, color: t.textMuted }) })
      ),

      React.createElement('div', { style: { padding: '16px 20px', textAlign: 'center' } },
        React.createElement('p', { style: { fontSize: 11, color: t.textMuted } }, 'Bill Bloom v1.0.0 · Turn messy expenses into calmer cash flow.')
      ),
      React.createElement('div', { style: { height: 8 } })
    );
  };

  const screenMap = {
    home: React.createElement(HomeScreen),
    calendar: React.createElement(CalendarScreen),
    bills: React.createElement(BillsScreen),
    reserves: React.createElement(ReservesScreen),
    settings: React.createElement(SettingsScreen),
  };

  return React.createElement('div', {
    style: {
      minHeight: '100vh', background: '#1a1a2e',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'Plus Jakarta Sans, sans-serif',
      padding: '20px',
    }
  },
    React.createElement('style', null, `
      @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
      * { box-sizing: border-box; }
      ::-webkit-scrollbar { width: 0; background: transparent; }
      button { font-family: 'Plus Jakarta Sans', sans-serif; }
      select { outline: none; }
    `),
    React.createElement('div', {
      style: {
        width: 375, height: 812,
        background: t.bg,
        borderRadius: 50,
        overflow: 'hidden',
        display: 'flex', flexDirection: 'column',
        boxShadow: '0 40px 120px rgba(0,0,0,0.7), inset 0 0 0 1px rgba(255,255,255,0.08)',
        position: 'relative',
        border: '10px solid #111',
        transition: 'background 0.4s ease',
      }
    },
      React.createElement(StatusBar),
      React.createElement('div', { style: { flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' } },
        screenMap[activeTab]
      ),
      React.createElement(BottomNav)
    )
  );
}
