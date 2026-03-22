
const { useState, useEffect, useRef } = React;

const themes = {
  dark: {
    bg: '#0A0E1A',
    surface: '#111827',
    surfaceAlt: '#1A2235',
    surfaceHover: '#1E2D45',
    card: '#141E30',
    cardBorder: '#1E2D45',
    text: '#F0F4FF',
    textSub: '#8B9EC7',
    textMuted: '#4A5A7A',
    primary: '#00D4AA',
    primaryDim: '#00D4AA22',
    primaryGlow: '#00D4AA44',
    secondary: '#6C63FF',
    danger: '#FF5470',
    dangerDim: '#FF547022',
    warning: '#FFB547',
    warningDim: '#FFB54722',
    success: '#00D4AA',
    successDim: '#00D4AA22',
    navBg: '#0D1526',
    navBorder: '#1E2D45',
    statusBar: '#0A0E1A',
    divider: '#1E2D45',
    chartLine: '#00D4AA',
    chartFill: '#00D4AA15',
    dangerZone: '#FF547018',
    safeZone: '#00D4AA12',
  },
  light: {
    bg: '#F0F4FF',
    surface: '#FFFFFF',
    surfaceAlt: '#F5F8FF',
    surfaceHover: '#EBF0FF',
    card: '#FFFFFF',
    cardBorder: '#E2E8F8',
    text: '#0F172A',
    textSub: '#4A5568',
    textMuted: '#9CA3B8',
    primary: '#00A888',
    primaryDim: '#00A88815',
    primaryGlow: '#00A88830',
    secondary: '#5A52D5',
    danger: '#E53E3E',
    dangerDim: '#E53E3E12',
    warning: '#D97706',
    warningDim: '#D9770612',
    success: '#00A888',
    successDim: '#00A88815',
    navBg: '#FFFFFF',
    navBorder: '#E2E8F8',
    statusBar: '#F0F4FF',
    divider: '#E2E8F8',
    chartLine: '#00A888',
    chartFill: '#00A88812',
    dangerZone: '#E53E3E10',
    safeZone: '#00A88810',
  }
};

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isDark, setIsDark] = useState(true);
  const [pressedTab, setPressedTab] = useState(null);

  const theme = isDark ? themes.dark : themes.light;

  const tabs = [
    { id: 'home', label: 'Home', icon: window.lucide.Home },
    { id: 'timeline', label: 'Timeline', icon: window.lucide.TrendingUp },
    { id: 'alerts', label: 'Alerts', icon: window.lucide.Bell },
    { id: 'insights', label: 'Insights', icon: window.lucide.BarChart2 },
    { id: 'settings', label: 'Settings', icon: window.lucide.Settings },
  ];

  const fontStyle = React.createElement('style', null, `
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    ::-webkit-scrollbar { width: 0px; }
    .tab-transition { transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1); }
    @keyframes pulse-ring {
      0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(0,212,170,0.4); }
      70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(0,212,170,0); }
      100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(0,212,170,0); }
    }
    @keyframes shimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(8px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .screen-enter { animation: fadeIn 0.3s ease forwards; }
  `);

  const phoneContainer = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    background: '#e8ecf0',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  };

  const phoneFrame = {
    width: '375px',
    height: '812px',
    background: theme.bg,
    borderRadius: '48px',
    overflow: 'hidden',
    position: 'relative',
    boxShadow: '0 30px 80px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.08)',
    display: 'flex',
    flexDirection: 'column',
    transition: 'background 0.3s ease',
  };

  // Status bar
  const StatusBar = () => React.createElement('div', {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '14px 28px 0',
      background: theme.statusBar,
      transition: 'background 0.3s ease',
      zIndex: 10,
      position: 'relative',
    }
  },
    React.createElement('span', { style: { fontSize: '13px', fontWeight: '700', color: theme.text, letterSpacing: '0.02em' } }, '9:41'),
    React.createElement('div', {
      style: {
        width: '120px', height: '34px',
        background: '#000',
        borderRadius: '20px',
        position: 'absolute',
        top: '0',
        left: '50%',
        transform: 'translateX(-50%)',
      }
    }),
    React.createElement('div', { style: { display: 'flex', gap: '6px', alignItems: 'center' } },
      React.createElement(window.lucide.Wifi, { size: 15, color: theme.text }),
      React.createElement(window.lucide.Battery, { size: 16, color: theme.text }),
    )
  );

  // Nav bar
  const NavBar = () => React.createElement('div', {
    style: {
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      padding: '8px 0 20px',
      background: theme.navBg,
      borderTop: `1px solid ${theme.navBorder}`,
      transition: 'background 0.3s ease',
      zIndex: 10,
    }
  },
    tabs.map(tab => {
      const isActive = activeTab === tab.id;
      const isPressed = pressedTab === tab.id;
      const navItemStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '3px',
        padding: '6px 10px',
        borderRadius: '14px',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        transform: isPressed ? 'scale(0.9)' : 'scale(1)',
        background: isActive ? theme.primaryDim : 'transparent',
      };
      const labelStyle = {
        fontSize: '10px',
        fontWeight: isActive ? '700' : '500',
        color: isActive ? theme.primary : theme.textMuted,
        transition: 'color 0.2s ease',
        letterSpacing: '0.02em',
      };
      return React.createElement('div', {
        key: tab.id,
        onClick: () => setActiveTab(tab.id),
        onMouseDown: () => setPressedTab(tab.id),
        onMouseUp: () => setPressedTab(null),
        style: navItemStyle,
      },
        React.createElement(tab.icon, { size: 22, color: isActive ? theme.primary : theme.textMuted, strokeWidth: isActive ? 2.5 : 1.8 }),
        React.createElement('span', { style: labelStyle }, tab.label)
      );
    })
  );

  const screens = {
    home: () => React.createElement(HomeScreen, { theme, isDark }),
    timeline: () => React.createElement(TimelineScreen, { theme }),
    alerts: () => React.createElement(AlertsScreen, { theme }),
    insights: () => React.createElement(InsightsScreen, { theme }),
    settings: () => React.createElement(SettingsScreen, { theme, isDark, setIsDark }),
  };

  return React.createElement('div', { style: phoneContainer },
    fontStyle,
    React.createElement('div', { style: phoneFrame },
      React.createElement(StatusBar),
      React.createElement('div', {
        key: activeTab,
        className: 'screen-enter',
        style: { flex: 1, overflowY: 'auto', overflowX: 'hidden' }
      },
        React.createElement(screens[activeTab])
      ),
      React.createElement(NavBar)
    )
  );
}

// ─── HOME SCREEN ───────────────────────────────────────────────────────────────
function HomeScreen({ theme, isDark }) {
  const [safeSpend, setSafeSpend] = useState(247);
  const [pressed, setPressed] = useState(null);

  const cardStyle = {
    background: theme.card,
    border: `1px solid ${theme.cardBorder}`,
    borderRadius: '20px',
    padding: '18px',
    transition: 'all 0.3s ease',
  };

  const dangerItems = [
    { day: 'Mar 24', event: 'Netflix + Spotify hit', amount: -28, type: 'warning' },
    { day: 'Mar 27', event: 'Rent due ($1,450)', amount: -1450, type: 'danger' },
    { day: 'Mar 29', event: 'Paycheck arrives', amount: 2400, type: 'success' },
  ];

  const upcomingBills = [
    { name: 'Rent', amount: 1450, due: 'Mar 27', icon: window.lucide.Home, daysLeft: 5 },
    { name: 'Electric', amount: 89, due: 'Mar 30', icon: window.lucide.Zap, daysLeft: 8 },
    { name: 'Netflix', amount: 16, due: 'Mar 24', icon: window.lucide.Tv, daysLeft: 2 },
    { name: 'Gym', amount: 45, due: 'Apr 1', icon: window.lucide.Activity, daysLeft: 10 },
  ];

  // Mini chart data
  const chartDays = 14;
  const balances = [1840, 1790, 1820, 1760, 1680, 1410, 1390, 1355, 1290, 890, 2350, 2280, 2200, 2140];
  const minB = Math.min(...balances);
  const maxB = Math.max(...balances);
  const chartH = 60;
  const chartW = 295;
  const pts = balances.map((b, i) => {
    const x = (i / (chartDays - 1)) * chartW;
    const y = chartH - ((b - minB) / (maxB - minB)) * chartH;
    return `${x},${y}`;
  }).join(' ');

  const dangerX = (9 / (chartDays - 1)) * chartW;

  return React.createElement('div', {
    style: {
      padding: '20px 20px 16px',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      background: theme.bg,
      minHeight: '100%',
      transition: 'background 0.3s ease',
    }
  },
    // Header
    React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' } },
      React.createElement('div', null,
        React.createElement('p', { style: { fontSize: '13px', color: theme.textSub, fontWeight: '500', marginBottom: '2px' } }, 'Good morning, Alex'),
        React.createElement('h1', { style: { fontSize: '22px', fontWeight: '800', color: theme.text, letterSpacing: '-0.5px' } }, 'BufferBloom'),
      ),
      React.createElement('div', {
        style: {
          width: '38px', height: '38px',
          borderRadius: '50%',
          background: isDark ? '#1A2235' : '#EBF0FF',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          border: `2px solid ${theme.primary}`,
        }
      },
        React.createElement(window.lucide.User, { size: 18, color: theme.primary })
      )
    ),

    // Balance card
    React.createElement('div', {
      style: {
        background: isDark
          ? 'linear-gradient(135deg, #0F1F35 0%, #1A2E4A 50%, #0F2040 100%)'
          : 'linear-gradient(135deg, #0A2A3A 0%, #0D3B52 100%)',
        borderRadius: '24px',
        padding: '22px',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: `0 8px 32px ${theme.primaryGlow}`,
      }
    },
      React.createElement('div', {
        style: {
          position: 'absolute', top: '-30px', right: '-30px',
          width: '120px', height: '120px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,212,170,0.15) 0%, transparent 70%)',
        }
      }),
      React.createElement('p', { style: { fontSize: '12px', color: 'rgba(255,255,255,0.5)', fontWeight: '600', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '6px' } }, 'Checking Balance'),
      React.createElement('h2', { style: { fontSize: '38px', fontWeight: '800', color: '#FFFFFF', letterSpacing: '-1px', marginBottom: '16px' } }, '$1,840.22'),
      React.createElement('div', { style: { display: 'flex', gap: '12px' } },
        React.createElement('div', {
          style: {
            flex: 1,
            background: 'rgba(0,212,170,0.15)',
            borderRadius: '14px',
            padding: '12px',
            border: '1px solid rgba(0,212,170,0.2)',
          }
        },
          React.createElement('p', { style: { fontSize: '11px', color: 'rgba(255,255,255,0.5)', fontWeight: '600', marginBottom: '4px', letterSpacing: '0.06em' } }, 'SAFE TO SPEND'),
          React.createElement('p', { style: { fontSize: '22px', fontWeight: '800', color: '#00D4AA', letterSpacing: '-0.5px' } }, `$${safeSpend}`),
          React.createElement('p', { style: { fontSize: '10px', color: 'rgba(0,212,170,0.6)', marginTop: '2px' } }, 'after essentials')
        ),
        React.createElement('div', {
          style: {
            flex: 1,
            background: 'rgba(255,84,112,0.15)',
            borderRadius: '14px',
            padding: '12px',
            border: '1px solid rgba(255,84,112,0.2)',
          }
        },
          React.createElement('p', { style: { fontSize: '11px', color: 'rgba(255,255,255,0.5)', fontWeight: '600', marginBottom: '4px', letterSpacing: '0.06em' } }, 'DANGER IN'),
          React.createElement('p', { style: { fontSize: '22px', fontWeight: '800', color: '#FF5470', letterSpacing: '-0.5px' } }, '5 days'),
          React.createElement('p', { style: { fontSize: '10px', color: 'rgba(255,84,112,0.6)', marginTop: '2px' } }, 'rent due Mar 27')
        ),
      )
    ),

    // Mini forecast
    React.createElement('div', { style: { ...cardStyle } },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' } },
        React.createElement('p', { style: { fontSize: '14px', fontWeight: '700', color: theme.text } }, '14-Day Forecast'),
        React.createElement('span', {
          style: {
            fontSize: '11px', fontWeight: '600',
            color: '#FF5470',
            background: theme.dangerDim,
            padding: '3px 8px',
            borderRadius: '20px',
          }
        }, '1 danger zone')
      ),
      React.createElement('svg', {
        width: chartW, height: chartH + 10,
        style: { overflow: 'visible' }
      },
        // Danger zone shading
        React.createElement('rect', {
          x: dangerX - 20, y: 0,
          width: 50, height: chartH,
          fill: '#FF547015',
          rx: 4,
        }),
        // Fill
        React.createElement('polyline', {
          points: `0,${chartH} ${pts} ${chartW},${chartH}`,
          fill: theme.chartFill,
          stroke: 'none',
        }),
        // Line
        React.createElement('polyline', {
          points: pts,
          fill: 'none',
          stroke: theme.chartLine,
          strokeWidth: '2',
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
        }),
        // Danger dot
        React.createElement('circle', {
          cx: dangerX, cy: chartH - ((balances[9] - minB) / (maxB - minB)) * chartH,
          r: 5, fill: '#FF5470',
          stroke: theme.card, strokeWidth: 2,
        }),
        // Labels
        React.createElement('text', { x: 0, y: chartH + 10, fontSize: '9', fill: theme.textMuted, fontFamily: 'Plus Jakarta Sans' }, 'Today'),
        React.createElement('text', { x: dangerX - 8, y: chartH + 10, fontSize: '9', fill: '#FF5470', fontFamily: 'Plus Jakarta Sans' }, 'Mar 27'),
        React.createElement('text', { x: chartW - 20, y: chartH + 10, fontSize: '9', fill: theme.textMuted, fontFamily: 'Plus Jakarta Sans' }, 'Apr 5'),
      )
    ),

    // Upcoming events
    React.createElement('div', null,
      React.createElement('p', { style: { fontSize: '14px', fontWeight: '700', color: theme.text, marginBottom: '10px' } }, 'Upcoming Cash Events'),
      React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: '8px' } },
        dangerItems.map((item, i) => {
          const colors = { warning: theme.warning, danger: theme.danger, success: theme.primary };
          const bgs = { warning: theme.warningDim, danger: theme.dangerDim, success: theme.successDim };
          return React.createElement('div', {
            key: i,
            style: {
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: theme.surfaceAlt,
              border: `1px solid ${theme.cardBorder}`,
              borderRadius: '14px',
              padding: '12px 14px',
              borderLeft: `3px solid ${colors[item.type]}`,
            }
          },
            React.createElement('div', null,
              React.createElement('p', { style: { fontSize: '13px', fontWeight: '600', color: theme.text } }, item.event),
              React.createElement('p', { style: { fontSize: '11px', color: theme.textSub, marginTop: '2px' } }, item.day),
            ),
            React.createElement('span', {
              style: {
                fontSize: '14px', fontWeight: '700',
                color: colors[item.type],
                background: bgs[item.type],
                padding: '4px 10px',
                borderRadius: '20px',
              }
            }, item.amount > 0 ? `+$${item.amount}` : `-$${Math.abs(item.amount)}`)
          );
        })
      )
    ),

    // Bills due
    React.createElement('div', null,
      React.createElement('p', { style: { fontSize: '14px', fontWeight: '700', color: theme.text, marginBottom: '10px' } }, 'Bills Coming Up'),
      React.createElement('div', { style: { display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '4px' } },
        upcomingBills.map((bill, i) => React.createElement('div', {
          key: i,
          style: {
            minWidth: '90px',
            background: theme.surfaceAlt,
            border: `1px solid ${bill.daysLeft <= 3 ? theme.danger : theme.cardBorder}`,
            borderRadius: '16px',
            padding: '12px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '6px',
          }
        },
          React.createElement('div', {
            style: {
              width: '36px', height: '36px',
              borderRadius: '12px',
              background: bill.daysLeft <= 3 ? theme.dangerDim : theme.primaryDim,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }
          },
            React.createElement(bill.icon, { size: 16, color: bill.daysLeft <= 3 ? theme.danger : theme.primary })
          ),
          React.createElement('p', { style: { fontSize: '11px', fontWeight: '700', color: theme.text } }, bill.name),
          React.createElement('p', { style: { fontSize: '13px', fontWeight: '800', color: bill.daysLeft <= 3 ? theme.danger : theme.text } }, `$${bill.amount}`),
          React.createElement('p', { style: { fontSize: '10px', color: theme.textSub } }, bill.due),
        ))
      )
    )
  );
}

// ─── TIMELINE SCREEN ──────────────────────────────────────────────────────────
function TimelineScreen({ theme }) {
  const [selectedDay, setSelectedDay] = useState(6);

  const days = Array.from({ length: 30 }, (_, i) => {
    const date = new Date(2026, 2, 22 + i);
    const label = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const balances = [1840,1790,1810,1770,1680,1640,1390,1355,1300,890,2350,2300,2230,2180,2100,2050,1980,1950,1880,1830,1760,1700,1640,4040,3980,3900,3820,3740,3660,3580];
    const events = {
      2: [{ name: 'Netflix', amount: -16, type: 'bill' }, { name: 'Spotify', amount: -12, type: 'bill' }],
      5: [{ name: 'Rent', amount: -1450, type: 'bill' }],
      7: [{ name: 'Paycheck', amount: 2400, type: 'income' }],
      11: [{ name: 'Electric', amount: -89, type: 'bill' }],
      21: [{ name: 'Paycheck', amount: 2400, type: 'income' }],
    };
    const isDanger = balances[i] < 1000;
    return { label, balance: balances[i], events: events[i] || [], isDanger, index: i };
  });

  const maxBal = Math.max(...days.map(d => d.balance));
  const minBal = Math.min(...days.map(d => d.balance));

  const selected = days[selectedDay];

  const barH = 80;
  const barW = 8;
  const barGap = 4;

  return React.createElement('div', {
    style: {
      padding: '20px 20px 16px',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      background: theme.bg,
      minHeight: '100%',
    }
  },
    // Header
    React.createElement('div', null,
      React.createElement('h2', { style: { fontSize: '22px', fontWeight: '800', color: theme.text, letterSpacing: '-0.5px' } }, '30-Day Runway'),
      React.createElement('p', { style: { fontSize: '13px', color: theme.textSub, marginTop: '2px' } }, 'Tap any day to see details'),
    ),

    // Summary pills
    React.createElement('div', { style: { display: 'flex', gap: '8px' } },
      [
        { label: 'Lowest', value: `$${minBal}`, color: theme.danger },
        { label: 'Paydays', value: '2 ahead', color: theme.primary },
        { label: 'Bills', value: '$1,567', color: theme.warning },
      ].map((pill, i) => React.createElement('div', {
        key: i,
        style: {
          flex: 1,
          background: theme.surfaceAlt,
          border: `1px solid ${theme.cardBorder}`,
          borderRadius: '14px',
          padding: '10px',
          textAlign: 'center',
        }
      },
        React.createElement('p', { style: { fontSize: '10px', color: theme.textMuted, fontWeight: '600', letterSpacing: '0.06em', textTransform: 'uppercase' } }, pill.label),
        React.createElement('p', { style: { fontSize: '16px', fontWeight: '800', color: pill.color, marginTop: '3px' } }, pill.value),
      ))
    ),

    // Bar chart
    React.createElement('div', {
      style: {
        background: theme.card,
        border: `1px solid ${theme.cardBorder}`,
        borderRadius: '20px',
        padding: '16px',
        overflowX: 'auto',
      }
    },
      React.createElement('div', { style: { display: 'flex', alignItems: 'flex-end', gap: `${barGap}px`, minWidth: `${days.length * (barW + barGap)}px` } },
        days.map((day, i) => {
          const h = Math.max(4, ((day.balance - minBal) / (maxBal - minBal)) * barH);
          const isSelected = selectedDay === i;
          return React.createElement('div', {
            key: i,
            onClick: () => setSelectedDay(i),
            style: {
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              cursor: 'pointer',
            }
          },
            React.createElement('div', {
              style: {
                width: `${barW}px`,
                height: `${h}px`,
                borderRadius: '4px',
                background: isSelected
                  ? theme.primary
                  : day.isDanger
                    ? theme.danger
                    : day.events.some(e => e.type === 'income') ? theme.primary + '99' : theme.textMuted + '40',
                transition: 'all 0.2s ease',
                transform: isSelected ? 'scaleX(1.3)' : 'scaleX(1)',
              }
            }),
            i % 5 === 0 ? React.createElement('span', { style: { fontSize: '8px', color: theme.textMuted, transform: 'rotate(-45deg)', display: 'block' } }, day.label.split(' ')[1]) : React.createElement('span', { style: { fontSize: '8px', color: 'transparent' } }, '.'),
          );
        })
      )
    ),

    // Selected day detail
    React.createElement('div', {
      style: {
        background: theme.card,
        border: `1px solid ${selected.isDanger ? theme.danger : theme.cardBorder}`,
        borderRadius: '20px',
        padding: '18px',
      }
    },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' } },
        React.createElement('div', null,
          React.createElement('p', { style: { fontSize: '12px', fontWeight: '600', color: theme.textSub, letterSpacing: '0.06em', textTransform: 'uppercase' } }, selected.label),
          React.createElement('p', { style: { fontSize: '28px', fontWeight: '800', color: selected.isDanger ? theme.danger : theme.text, letterSpacing: '-1px', marginTop: '2px' } }, `$${selected.balance.toLocaleString()}`),
        ),
        selected.isDanger && React.createElement('div', {
          style: {
            background: theme.dangerDim,
            border: `1px solid ${theme.danger}`,
            borderRadius: '10px',
            padding: '6px 10px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }
        },
          React.createElement(window.lucide.AlertTriangle, { size: 13, color: theme.danger }),
          React.createElement('span', { style: { fontSize: '11px', fontWeight: '700', color: theme.danger } }, 'DANGER')
        )
      ),
      selected.events.length > 0
        ? React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: '8px' } },
            selected.events.map((ev, i) => React.createElement('div', {
              key: i,
              style: {
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px 12px',
                background: theme.surfaceAlt,
                borderRadius: '12px',
              }
            },
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '8px' } },
                React.createElement('div', {
                  style: {
                    width: '8px', height: '8px', borderRadius: '50%',
                    background: ev.type === 'income' ? theme.primary : ev.amount < -500 ? theme.danger : theme.warning,
                  }
                }),
                React.createElement('p', { style: { fontSize: '13px', fontWeight: '600', color: theme.text } }, ev.name)
              ),
              React.createElement('p', {
                style: {
                  fontSize: '14px', fontWeight: '700',
                  color: ev.type === 'income' ? theme.primary : ev.amount < -500 ? theme.danger : theme.warning,
                }
              }, ev.amount > 0 ? `+$${ev.amount}` : `-$${Math.abs(ev.amount)}`)
            ))
          )
        : React.createElement('p', { style: { fontSize: '13px', color: theme.textMuted, fontStyle: 'italic' } }, 'No scheduled events on this day'),
    ),

    // Legend
    React.createElement('div', { style: { display: 'flex', gap: '16px', justifyContent: 'center' } },
      [
        { color: theme.primary, label: 'Safe / Payday' },
        { color: theme.danger, label: 'Danger Zone' },
        { color: theme.textMuted + '60', label: 'Normal' },
      ].map((l, i) => React.createElement('div', { key: i, style: { display: 'flex', alignItems: 'center', gap: '6px' } },
        React.createElement('div', { style: { width: '10px', height: '10px', borderRadius: '3px', background: l.color } }),
        React.createElement('span', { style: { fontSize: '11px', color: theme.textSub } }, l.label)
      ))
    )
  );
}

// ─── ALERTS SCREEN ────────────────────────────────────────────────────────────
function AlertsScreen({ theme }) {
  const [dismissed, setDismissed] = useState([]);
  const [actioned, setActioned] = useState([]);

  const alerts = [
    {
      id: 1, priority: 'urgent', icon: window.lucide.AlertTriangle,
      title: 'Rent hits in 5 days',
      message: 'Your balance will be $390 when rent clears Mar 27. You\'re cutting it close.',
      action: 'Move $200 to buffer now',
      actionIcon: window.lucide.ArrowRight,
      time: 'Just now',
    },
    {
      id: 2, priority: 'warning', icon: window.lucide.Clock,
      title: 'Netflix + Spotify overlap',
      message: 'Both subscriptions hit Mar 24, two days before rent. Total: $28.',
      action: 'Understood',
      actionIcon: window.lucide.Check,
      time: '2 min ago',
    },
    {
      id: 3, priority: 'tip', icon: window.lucide.Lightbulb,
      title: 'Wait 2 days before dining out',
      message: 'Your safe-to-spend drops to $82 this weekend. Best to wait until after payday.',
      action: 'Set spending cap',
      actionIcon: window.lucide.Shield,
      time: '1 hr ago',
    },
    {
      id: 4, priority: 'info', icon: window.lucide.TrendingUp,
      title: 'Paycheck predicted Mar 29',
      message: 'Based on your pattern, your $2,400 deposit should arrive Friday.',
      action: 'View forecast',
      actionIcon: window.lucide.ArrowRight,
      time: '3 hrs ago',
    },
    {
      id: 5, priority: 'tip', icon: window.lucide.Zap,
      title: 'Car insurance renews Apr 3',
      message: 'Annual charge of $580 detected. Your balance will be $3,460 that day — fully covered.',
      action: 'Good to know',
      actionIcon: window.lucide.ThumbsUp,
      time: 'Yesterday',
    },
  ];

  const priorityColors = {
    urgent: theme.danger,
    warning: theme.warning,
    tip: theme.primary,
    info: theme.secondary,
  };
  const priorityBgs = {
    urgent: theme.dangerDim,
    warning: theme.warningDim,
    tip: theme.primaryDim,
    info: theme.primaryDim,
  };

  const activeAlerts = alerts.filter(a => !dismissed.includes(a.id));

  return React.createElement('div', {
    style: {
      padding: '20px 20px 16px',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      background: theme.bg,
      minHeight: '100%',
    }
  },
    // Header
    React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
      React.createElement('div', null,
        React.createElement('h2', { style: { fontSize: '22px', fontWeight: '800', color: theme.text, letterSpacing: '-0.5px' } }, 'Smart Alerts'),
        React.createElement('p', { style: { fontSize: '13px', color: theme.textSub, marginTop: '2px' } }, `${activeAlerts.length} active notifications`),
      ),
      React.createElement('div', {
        style: {
          background: theme.dangerDim,
          border: `1px solid ${theme.danger}`,
          borderRadius: '20px',
          padding: '4px 12px',
          fontSize: '12px',
          fontWeight: '700',
          color: theme.danger,
        }
      }, '1 urgent')
    ),

    // Alert cards
    activeAlerts.length === 0
      ? React.createElement('div', {
          style: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            padding: '60px 20px',
            color: theme.textMuted,
          }
        },
          React.createElement(window.lucide.CheckCircle, { size: 48, color: theme.primary }),
          React.createElement('p', { style: { fontSize: '16px', fontWeight: '700', color: theme.text } }, 'All clear!'),
          React.createElement('p', { style: { fontSize: '13px', textAlign: 'center' } }, 'No upcoming cash flow risks detected.')
        )
      : React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: '10px' } },
          activeAlerts.map(alert => {
            const isActioned = actioned.includes(alert.id);
            const color = priorityColors[alert.priority];
            const bg = priorityBgs[alert.priority];
            return React.createElement('div', {
              key: alert.id,
              style: {
                background: theme.card,
                border: `1px solid ${alert.priority === 'urgent' ? theme.danger : theme.cardBorder}`,
                borderRadius: '18px',
                padding: '16px',
                position: 'relative',
                overflow: 'hidden',
                opacity: isActioned ? 0.6 : 1,
                transition: 'opacity 0.3s ease',
              }
            },
              alert.priority === 'urgent' && React.createElement('div', {
                style: {
                  position: 'absolute', top: 0, left: 0, right: 0,
                  height: '3px',
                  background: 'linear-gradient(90deg, #FF5470, #FF8FA3)',
                }
              }),
              React.createElement('div', { style: { display: 'flex', gap: '12px' } },
                React.createElement('div', {
                  style: {
                    width: '40px', height: '40px',
                    borderRadius: '14px',
                    background: bg,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }
                },
                  React.createElement(alert.icon, { size: 18, color: color })
                ),
                React.createElement('div', { style: { flex: 1 } },
                  React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: '4px' } },
                    React.createElement('p', { style: { fontSize: '14px', fontWeight: '700', color: theme.text } }, alert.title),
                    React.createElement('p', { style: { fontSize: '10px', color: theme.textMuted } }, alert.time),
                  ),
                  React.createElement('p', { style: { fontSize: '12px', color: theme.textSub, lineHeight: '1.5', marginBottom: '12px' } }, alert.message),
                  React.createElement('div', { style: { display: 'flex', gap: '8px' } },
                    React.createElement('button', {
                      onClick: () => setActioned(prev => [...prev, alert.id]),
                      style: {
                        flex: 1,
                        background: isActioned ? theme.primaryDim : color,
                        color: isActioned ? color : '#FFF',
                        border: `1px solid ${color}`,
                        borderRadius: '12px',
                        padding: '8px 12px',
                        fontSize: '12px',
                        fontWeight: '700',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        transition: 'all 0.2s ease',
                      }
                    },
                      React.createElement(alert.actionIcon, { size: 13 }),
                      alert.action
                    ),
                    React.createElement('button', {
                      onClick: () => setDismissed(prev => [...prev, alert.id]),
                      style: {
                        width: '36px', height: '36px',
                        background: 'transparent',
                        border: `1px solid ${theme.cardBorder}`,
                        borderRadius: '12px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: theme.textMuted,
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                      }
                    },
                      React.createElement(window.lucide.X, { size: 14, color: theme.textMuted })
                    )
                  )
                )
              )
            );
          })
        )
  );
}

// ─── INSIGHTS SCREEN ──────────────────────────────────────────────────────────
function InsightsScreen({ theme }) {
  const [activeMonth, setActiveMonth] = useState(1);
  const months = ['Jan', 'Feb', 'Mar'];

  const spendingCategories = [
    { name: 'Housing', amount: 1450, pct: 47, color: theme.secondary },
    { name: 'Food & Dining', amount: 380, pct: 12, color: theme.warning },
    { name: 'Subscriptions', amount: 118, pct: 4, color: theme.danger },
    { name: 'Transport', amount: 210, pct: 7, color: '#A78BFA' },
    { name: 'Utilities', amount: 159, pct: 5, color: '#34D399' },
    { name: 'Other', amount: 780, pct: 25, color: theme.textMuted },
  ];

  const insights = [
    { icon: window.lucide.TrendingDown, text: 'Dining out increased 23% vs last month — consider a $120 weekend cap', type: 'warning' },
    { icon: window.lucide.RefreshCw, text: '3 subscriptions you haven\'t used in 30+ days total $43/mo', type: 'tip' },
    { icon: window.lucide.Calendar, text: 'Paycheck timing matches perfectly with your fixed bills this month', type: 'success' },
    { icon: window.lucide.Target, text: 'You avoided 2 potential overdraft fees this month by acting on alerts', type: 'success' },
  ];

  const insightColors = {
    warning: theme.warning,
    tip: theme.primary,
    success: theme.primary,
  };
  const insightBgs = {
    warning: theme.warningDim,
    tip: theme.primaryDim,
    success: theme.primaryDim,
  };

  const monthlyFlow = [
    { label: 'Income', amount: 2400, prev: 2400 },
    { label: 'Fixed Bills', amount: 1617, prev: 1612 },
    { label: 'Variable', amount: 590, prev: 510 },
    { label: 'Remaining', amount: 193, prev: 278 },
  ];

  return React.createElement('div', {
    style: {
      padding: '20px 20px 16px',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      background: theme.bg,
      minHeight: '100%',
    }
  },
    // Header
    React.createElement('div', null,
      React.createElement('h2', { style: { fontSize: '22px', fontWeight: '800', color: theme.text, letterSpacing: '-0.5px' } }, 'Insights'),
      React.createElement('p', { style: { fontSize: '13px', color: theme.textSub, marginTop: '2px' } }, 'Your cash flow patterns'),
    ),

    // Month selector
    React.createElement('div', {
      style: {
        display: 'flex',
        gap: '8px',
        background: theme.surfaceAlt,
        borderRadius: '14px',
        padding: '4px',
      }
    },
      months.map((m, i) => React.createElement('div', {
        key: i,
        onClick: () => setActiveMonth(i),
        style: {
          flex: 1,
          textAlign: 'center',
          padding: '8px',
          borderRadius: '10px',
          fontSize: '13px',
          fontWeight: '700',
          cursor: 'pointer',
          background: activeMonth === i ? theme.primary : 'transparent',
          color: activeMonth === i ? '#000' : theme.textSub,
          transition: 'all 0.2s ease',
        }
      }, m))
    ),

    // Cash flow breakdown
    React.createElement('div', {
      style: {
        background: theme.card,
        border: `1px solid ${theme.cardBorder}`,
        borderRadius: '20px',
        padding: '18px',
      }
    },
      React.createElement('p', { style: { fontSize: '14px', fontWeight: '700', color: theme.text, marginBottom: '14px' } }, 'Monthly Cash Flow'),
      React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: '10px' } },
        monthlyFlow.map((item, i) => {
          const isRemaining = item.label === 'Remaining';
          const pct = (item.amount / 2400) * 100;
          const diff = item.amount - item.prev;
          return React.createElement('div', { key: i },
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: '5px' } },
              React.createElement('span', { style: { fontSize: '12px', fontWeight: '600', color: theme.textSub } }, item.label),
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '8px' } },
                React.createElement('span', {
                  style: {
                    fontSize: '10px', fontWeight: '600',
                    color: diff > 0 ? theme.danger : theme.primary,
                  }
                }, diff > 0 ? `+$${diff}` : `-$${Math.abs(diff)}`),
                React.createElement('span', { style: { fontSize: '13px', fontWeight: '700', color: isRemaining ? theme.primary : theme.text } }, `$${item.amount}`)
              )
            ),
            React.createElement('div', {
              style: {
                height: '6px',
                background: theme.surfaceAlt,
                borderRadius: '3px',
                overflow: 'hidden',
              }
            },
              React.createElement('div', {
                style: {
                  height: '100%',
                  width: `${Math.min(100, pct)}%`,
                  borderRadius: '3px',
                  background: isRemaining ? theme.primary : i === 0 ? theme.secondary : i === 1 ? theme.danger : theme.warning,
                  transition: 'width 0.5s ease',
                }
              })
            )
          );
        })
      )
    ),

    // Spending categories
    React.createElement('div', {
      style: {
        background: theme.card,
        border: `1px solid ${theme.cardBorder}`,
        borderRadius: '20px',
        padding: '18px',
      }
    },
      React.createElement('p', { style: { fontSize: '14px', fontWeight: '700', color: theme.text, marginBottom: '14px' } }, 'Spending Breakdown'),
      React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: '10px' } },
        spendingCategories.map((cat, i) => React.createElement('div', { key: i, style: { display: 'flex', alignItems: 'center', gap: '10px' } },
          React.createElement('div', { style: { width: '10px', height: '10px', borderRadius: '50%', background: cat.color, flexShrink: 0 } }),
          React.createElement('span', { style: { fontSize: '12px', color: theme.textSub, width: '95px', flexShrink: 0 } }, cat.name),
          React.createElement('div', {
            style: {
              flex: 1,
              height: '6px',
              background: theme.surfaceAlt,
              borderRadius: '3px',
              overflow: 'hidden',
            }
          },
            React.createElement('div', { style: { height: '100%', width: `${cat.pct}%`, background: cat.color, borderRadius: '3px' } })
          ),
          React.createElement('span', { style: { fontSize: '12px', fontWeight: '700', color: theme.text, width: '44px', textAlign: 'right', flexShrink: 0 } }, `$${cat.amount}`)
        ))
      )
    ),

    // Smart insights
    React.createElement('div', null,
      React.createElement('p', { style: { fontSize: '14px', fontWeight: '700', color: theme.text, marginBottom: '10px' } }, 'AI Observations'),
      React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: '8px' } },
        insights.map((ins, i) => React.createElement('div', {
          key: i,
          style: {
            display: 'flex',
            gap: '10px',
            alignItems: 'flex-start',
            background: insightBgs[ins.type],
            border: `1px solid ${insightColors[ins.type]}22`,
            borderRadius: '14px',
            padding: '12px',
          }
        },
          React.createElement(ins.icon, { size: 16, color: insightColors[ins.type], style: { flexShrink: 0, marginTop: '1px' } }),
          React.createElement('p', { style: { fontSize: '12px', color: theme.textSub, lineHeight: '1.5' } }, ins.text)
        ))
      )
    )
  );
}

// ─── SETTINGS SCREEN ──────────────────────────────────────────────────────────
function SettingsScreen({ theme, isDark, setIsDark }) {
  const [notifs, setNotifs] = useState(true);
  const [biometric, setBiometric] = useState(true);
  const [autoSync, setAutoSync] = useState(true);
  const [weeklyReport, setWeeklyReport] = useState(false);

  const Toggle = ({ value, onChange }) => React.createElement('div', {
    onClick: () => onChange(!value),
    style: {
      width: '46px', height: '26px',
      borderRadius: '13px',
      background: value ? theme.primary : theme.surfaceAlt,
      border: `2px solid ${value ? theme.primary : theme.cardBorder}`,
      position: 'relative',
      cursor: 'pointer',
      transition: 'all 0.25s ease',
    }
  },
    React.createElement('div', {
      style: {
        width: '18px', height: '18px',
        borderRadius: '50%',
        background: '#FFF',
        position: 'absolute',
        top: '2px',
        left: value ? '22px' : '2px',
        transition: 'left 0.25s cubic-bezier(0.4,0,0.2,1)',
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
      }
    })
  );

  const SettingRow = ({ icon: Icon, label, sub, right }) => React.createElement('div', {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '14px 0',
      borderBottom: `1px solid ${theme.divider}`,
    }
  },
    React.createElement('div', {
      style: {
        width: '36px', height: '36px',
        borderRadius: '10px',
        background: theme.surfaceAlt,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
      }
    },
      React.createElement(Icon, { size: 16, color: theme.primary })
    ),
    React.createElement('div', { style: { flex: 1 } },
      React.createElement('p', { style: { fontSize: '13px', fontWeight: '600', color: theme.text } }, label),
      sub && React.createElement('p', { style: { fontSize: '11px', color: theme.textMuted, marginTop: '1px' } }, sub),
    ),
    right
  );

  const Section = ({ title, children }) => React.createElement('div', {
    style: {
      background: theme.card,
      border: `1px solid ${theme.cardBorder}`,
      borderRadius: '20px',
      padding: '4px 16px',
      transition: 'background 0.3s ease',
    }
  },
    React.createElement('p', {
      style: {
        fontSize: '11px', fontWeight: '700',
        color: theme.textMuted,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        padding: '12px 0 8px',
        borderBottom: `1px solid ${theme.divider}`,
      }
    }, title),
    children
  );

  return React.createElement('div', {
    style: {
      padding: '20px 20px 16px',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      background: theme.bg,
      minHeight: '100%',
    }
  },
    // Header
    React.createElement('h2', { style: { fontSize: '22px', fontWeight: '800', color: theme.text, letterSpacing: '-0.5px' } }, 'Settings'),

    // Profile card
    React.createElement('div', {
      style: {
        background: isDark
          ? 'linear-gradient(135deg, #0F1F35 0%, #1A2E4A 100%)'
          : 'linear-gradient(135deg, #0A2A3A 0%, #0D3B52 100%)',
        borderRadius: '20px',
        padding: '18px',
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
      }
    },
      React.createElement('div', {
        style: {
          width: '54px', height: '54px',
          borderRadius: '18px',
          background: theme.primaryDim,
          border: `2px solid ${theme.primary}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }
      },
        React.createElement(window.lucide.User, { size: 24, color: theme.primary })
      ),
      React.createElement('div', null,
        React.createElement('p', { style: { fontSize: '16px', fontWeight: '800', color: '#FFF' } }, 'Alex Johnson'),
        React.createElement('p', { style: { fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginTop: '2px' } }, 'Chase checking •• 4821'),
        React.createElement('div', {
          style: {
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            background: 'rgba(0,212,170,0.2)',
            border: '1px solid rgba(0,212,170,0.3)',
            borderRadius: '20px',
            padding: '3px 8px',
            marginTop: '6px',
          }
        },
          React.createElement('div', { style: { width: '6px', height: '6px', borderRadius: '50%', background: theme.primary } }),
          React.createElement('span', { style: { fontSize: '10px', fontWeight: '700', color: theme.primary } }, 'SYNCED')
        )
      )
    ),

    // Appearance
    React.createElement(Section, { title: 'Appearance' },
      React.createElement(SettingRow, {
        icon: isDark ? window.lucide.Moon : window.lucide.Sun,
        label: 'Dark Mode',
        sub: isDark ? 'Currently dark' : 'Currently light',
        right: React.createElement(Toggle, { value: isDark, onChange: setIsDark }),
      })
    ),

    // Notifications
    React.createElement(Section, { title: 'Notifications' },
      React.createElement(SettingRow, {
        icon: window.lucide.Bell,
        label: 'Smart Alerts',
        sub: 'Danger zones & tips',
        right: React.createElement(Toggle, { value: notifs, onChange: setNotifs }),
      }),
      React.createElement(SettingRow, {
        icon: window.lucide.FileText,
        label: 'Weekly Report',
        sub: 'Every Sunday morning',
        right: React.createElement(Toggle, { value: weeklyReport, onChange: setWeeklyReport }),
      })
    ),

    // Security
    React.createElement(Section, { title: 'Security' },
      React.createElement(SettingRow, {
        icon: window.lucide.Fingerprint,
        label: 'Biometric Login',
        sub: 'Face ID / Touch ID',
        right: React.createElement(Toggle, { value: biometric, onChange: setBiometric }),
      }),
      React.createElement(SettingRow, {
        icon: window.lucide.RefreshCw,
        label: 'Auto Sync',
        sub: 'Refresh every 30 min',
        right: React.createElement(Toggle, { value: autoSync, onChange: setAutoSync }),
      })
    ),

    // About
    React.createElement(Section, { title: 'About' },
      React.createElement(SettingRow, {
        icon: window.lucide.Info,
        label: 'Version',
        sub: 'BufferBloom v1.0.0',
        right: React.createElement('span', { style: { fontSize: '11px', color: theme.textMuted } }, 'Latest'),
      }),
      React.createElement(SettingRow, {
        icon: window.lucide.Shield,
        label: 'Privacy Policy',
        right: React.createElement(window.lucide.ChevronRight, { size: 16, color: theme.textMuted }),
      })
    )
  );
}
