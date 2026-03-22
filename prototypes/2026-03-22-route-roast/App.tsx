function App() {
  const { useState, useEffect, useRef } = React;

  const [isDark, setIsDark] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationProgress, setSimulationProgress] = useState(0);
  const [simulationComplete, setSimulationComplete] = useState(false);
  const [selectedRouteIdx, setSelectedRouteIdx] = useState(1);
  const [activeEvents, setActiveEvents] = useState(['rain', 'delay']);
  const [pressedBtn, setPressedBtn] = useState(null);
  const [currentTime, setCurrentTime] = useState('9:41');
  const [streak, setStreak] = useState(7);
  const [expandedInsight, setExpandedInsight] = useState(null);
  const [simResult, setSimResult] = useState(null);
  const intervalRef = useRef(null);

  const themes = {
    light: {
      bg: '#FDF4EC',
      surface: '#FFFFFF',
      surfaceAlt: '#FFF0E5',
      text: '#1A1A2E',
      textSec: '#6B7280',
      textTert: '#B0B8C4',
      primary: '#F97316',
      primaryDark: '#EA6B0A',
      primaryLight: '#FFEDD5',
      secondary: '#6366F1',
      secondaryLight: '#EEF2FF',
      border: '#EDE4DA',
      success: '#10B981',
      successLight: '#D1FAE5',
      warning: '#F59E0B',
      warningLight: '#FEF3C7',
      danger: '#EF4444',
      dangerLight: '#FEE2E2',
      card: '#FFFFFF',
      navBg: '#FFFFFF',
      navBorder: '#F0E8E0',
      chip: '#F3F0EB',
    },
    dark: {
      bg: '#0C0C18',
      surface: '#161624',
      surfaceAlt: '#1E1C30',
      text: '#F0EEFF',
      textSec: '#A09BB5',
      textTert: '#524F6A',
      primary: '#FB923C',
      primaryDark: '#F97316',
      primaryLight: '#431407',
      secondary: '#818CF8',
      secondaryLight: '#1E1B4B',
      border: '#252340',
      success: '#34D399',
      successLight: '#064E3B',
      warning: '#FBBF24',
      warningLight: '#451A03',
      danger: '#F87171',
      dangerLight: '#450A0A',
      card: '#161624',
      navBg: '#0F0F1C',
      navBorder: '#1E1C30',
      chip: '#1E1C30',
    },
  };

  const c = isDark ? themes.dark : themes.light;

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.boxSizing = 'border-box';
  }, []);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: false }));
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  const routes = [
    { name: 'Drive Solo', icon: 'Car', time: 42, cost: 8.50, stress: 85, reliability: 60, co2: 4.2, color: '#EF4444', badge: 'Fastest', desc: 'Direct route via I-278, avoids downtown' },
    { name: 'Bus + Walk', icon: 'Bus', time: 58, cost: 2.75, stress: 30, reliability: 88, co2: 0.8, color: '#10B981', badge: 'Recommended', desc: 'M15 to Fulton St, 6 min walk to office' },
    { name: 'Bike Route', icon: 'Bike', time: 35, cost: 0, stress: 50, reliability: 42, co2: 0, color: '#F59E0B', badge: 'Cheapest', desc: 'Greenway path, 7.2 miles via riverside' },
    { name: 'Rideshare', icon: 'Car', time: 28, cost: 14.50, stress: 20, reliability: 78, co2: 2.1, color: '#6366F1', badge: 'Least Stress', desc: 'Pool estimated, dynamic pricing active' },
  ];

  const lifeEvents = [
    { id: 'rain', icon: 'CloudRain', label: 'Rainy Morning', desc: 'Affects bike & walk', impact: 'high', color: '#6366F1' },
    { id: 'delay', icon: 'Clock', label: 'Transit Delay', desc: 'Line 3 +15 min', impact: 'medium', color: '#F59E0B' },
    { id: 'school', icon: 'GraduationCap', label: 'School Pickup', desc: 'Add stop at 3:30 PM', impact: 'medium', color: '#10B981' },
    { id: 'meeting', icon: 'Users', label: 'Late Meeting', desc: 'Runs over by 30 min', impact: 'high', color: '#EF4444' },
    { id: 'construction', icon: 'HardHat', label: 'Road Work', desc: 'Main St closed noon', impact: 'high', color: '#F97316' },
    { id: 'gym', icon: 'Dumbbell', label: 'Gym Stop', desc: 'Add 45 min pre-work', impact: 'low', color: '#8B5CF6' },
    { id: 'groceries', icon: 'ShoppingCart', label: 'Grocery Run', desc: 'Combine with commute', impact: 'low', color: '#06B6D4' },
    { id: 'childcare', icon: 'Heart', label: 'Sick Kid Pickup', desc: 'Emergency: leave 2 PM', impact: 'high', color: '#EC4899' },
  ];

  const weekData = [
    { day: 'Mon', minutes: 42, cost: 8.50, label: 'Today' },
    { day: 'Tue', minutes: 58, cost: 2.75, label: '' },
    { day: 'Wed', minutes: 35, cost: 0, label: '' },
    { day: 'Thu', minutes: 71, cost: 8.50, label: '' },
    { day: 'Fri', minutes: 48, cost: 5.50, label: '' },
  ];

  const insights = [
    {
      title: 'Leave 15 min earlier on Thursdays',
      desc: 'Traffic peaks at 8:15 AM. Leaving at 7:45 AM cuts stress by 38% and saves 12 minutes on average.',
      icon: 'Clock',
      saving: '12 min saved',
      tag: 'Time',
      tagColor: c.primary,
    },
    {
      title: 'Batch Tuesday errands with commute',
      desc: 'Your gym is 0.4 mi from your bus stop. Combining the gym with Tuesday transit saves one separate trip each week.',
      icon: 'Route',
      saving: '$3.20 saved/wk',
      tag: 'Efficiency',
      tagColor: c.success,
    },
    {
      title: 'Bike on dry Wednesdays',
      desc: 'Wednesdays have the lowest rain probability. Biking saves $8.50 vs driving with no added stress on clear days.',
      icon: 'Bike',
      saving: '$8.50 saved',
      tag: 'Cost',
      tagColor: '#F59E0B',
    },
    {
      title: 'Adjust drop-off order on Fridays',
      desc: 'Dropping at daycare before school saves 8 minutes on Friday mornings due to traffic patterns near PS 42.',
      icon: 'Navigation',
      saving: '8 min saved',
      tag: 'Routing',
      tagColor: c.secondary,
    },
  ];

  const runSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setSimulationComplete(false);
    setSimulationProgress(0);
    setSimResult(null);
    let prog = 0;
    intervalRef.current = setInterval(() => {
      prog += Math.random() * 7 + 2;
      if (prog >= 100) {
        prog = 100;
        clearInterval(intervalRef.current);
        setTimeout(() => {
          setIsSimulating(false);
          setSimulationComplete(true);
          const r = routes[selectedRouteIdx];
          const eventPenalty = activeEvents.length * 3;
          setSimResult({
            arrive: `9:${String(13 + Math.floor(r.time / 10) + Math.floor(eventPenalty / 2)).padStart(2, '0')} AM`,
            cost: r.cost,
            stress: Math.min(r.stress + eventPenalty, 99),
            score: Math.round(100 - r.stress / 2 - eventPenalty + r.reliability / 4),
          });
        }, 400);
      }
      setSimulationProgress(Math.min(prog, 100));
    }, 140);
  };

  const toggleEvent = (id) => {
    setActiveEvents((prev) => prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]);
  };

  const handlePress = (id) => {
    setPressedBtn(id);
    setTimeout(() => setPressedBtn(null), 150);
  };

  const Icon = ({ name, size = 20, color, strokeWidth = 2 }) => {
    const LucideIcon = window.lucide && window.lucide[name];
    if (!LucideIcon) return React.createElement('span', { style: { width: size, height: size, display: 'inline-block' } });
    return React.createElement(LucideIcon, { size, color: color || c.text, strokeWidth });
  };

  const MetricBar = ({ value, max = 100, color }) =>
    React.createElement('div', {
      style: { height: 5, borderRadius: 3, background: c.border, overflow: 'hidden', flex: 1 },
    },
      React.createElement('div', {
        style: { height: '100%', width: `${(value / max) * 100}%`, background: color, borderRadius: 3, transition: 'width 0.6s ease' },
      })
    );

  const Pill = ({ children, bg, color }) =>
    React.createElement('div', {
      style: { display: 'inline-flex', alignItems: 'center', background: bg, color, fontSize: 10, fontWeight: 700, padding: '2px 7px', borderRadius: 5, letterSpacing: 0.3 },
    }, children);

  const StatusBar = () =>
    React.createElement('div', {
      style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 24px 0', height: 44, flexShrink: 0 },
    },
      React.createElement('span', { style: { fontSize: 15, fontWeight: 600, color: c.text } }, currentTime),
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 5 } },
        React.createElement(Icon, { name: 'Wifi', size: 14, color: c.text }),
        React.createElement('div', { style: { display: 'flex', gap: 1.5, alignItems: 'flex-end' } },
          ...[0, 1, 2, 3].map((i) =>
            React.createElement('div', {
              key: i,
              style: { width: 2.5, height: 5 + i * 3, borderRadius: 1.5, background: i < 3 ? c.text : c.border },
            })
          )
        ),
        React.createElement('div', {
          style: { width: 22, height: 11, border: `1.5px solid ${c.text}`, borderRadius: 3, display: 'flex', alignItems: 'center', padding: '1.5px 1.5px', position: 'relative' },
        },
          React.createElement('div', { style: { width: '70%', height: '100%', background: c.success, borderRadius: 1.5 } }),
          React.createElement('div', { style: { position: 'absolute', right: -4, width: 2, height: 5, background: c.text, borderRadius: '0 1px 1px 0' } })
        )
      )
    );

  const DynamicIsland = () =>
    React.createElement('div', {
      style: { width: 120, height: 34, background: '#000', borderRadius: 20, margin: '4px auto 0', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, flexShrink: 0 },
    },
      React.createElement('div', { style: { width: 10, height: 10, borderRadius: '50%', background: '#222', border: '1px solid #333' } }),
      React.createElement('div', { style: { width: 36, height: 5, borderRadius: 3, background: '#1a1a1a' } })
    );

  // ─── HOME SCREEN ───────────────────────────────────────────────────────────
  const HomeScreen = () => {
    const maxMin = Math.max(...weekData.map((d) => d.minutes));
    return React.createElement('div', { style: { padding: '0 20px 24px', overflowY: 'auto', flex: 1 } },
      React.createElement('div', { style: { marginTop: 22, marginBottom: 20 } },
        React.createElement('div', { style: { fontSize: 12, color: c.textSec, fontWeight: 500, letterSpacing: 0.3, textTransform: 'uppercase', marginBottom: 4 } }, 'Sunday, March 22 • Week 12'),
        React.createElement('div', { style: { fontSize: 26, fontWeight: 700, color: c.text, lineHeight: 1.2 } }, 'Good morning, Alex'),
        React.createElement('div', { style: { fontSize: 13, color: c.textSec, marginTop: 6 } }, '🌧 Rain expected 7–10 AM. Simulation updated.')
      ),

      // Streak + savings banner
      React.createElement('div', {
        style: {
          background: `linear-gradient(135deg, ${c.primary} 0%, ${c.secondary} 100%)`,
          borderRadius: 20,
          padding: '18px 20px',
          marginBottom: 16,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxShadow: `0 8px 28px ${c.primary}35`,
        },
      },
        React.createElement('div', null,
          React.createElement('div', { style: { fontSize: 12, color: 'rgba(255,255,255,0.75)', fontWeight: 500, marginBottom: 2 } }, '🔥 Simulation Streak'),
          React.createElement('div', { style: { fontSize: 38, fontWeight: 700, color: '#fff', lineHeight: 1 } }, streak),
          React.createElement('div', { style: { fontSize: 11, color: 'rgba(255,255,255,0.65)', marginTop: 2 } }, 'days in a row')
        ),
        React.createElement('div', { style: { width: 1, height: 50, background: 'rgba(255,255,255,0.2)' } }),
        React.createElement('div', { style: { textAlign: 'right' } },
          React.createElement('div', { style: { fontSize: 12, color: 'rgba(255,255,255,0.75)', marginBottom: 2 } }, 'This week saved'),
          React.createElement('div', { style: { fontSize: 28, fontWeight: 700, color: '#fff', lineHeight: 1 } }, '$23.50'),
          React.createElement('div', { style: { fontSize: 11, color: 'rgba(255,255,255,0.65)', marginTop: 2 } }, 'vs all driving')
        )
      ),

      // Today's best route
      React.createElement('div', {
        style: { background: c.card, borderRadius: 18, padding: 16, marginBottom: 14, border: `1px solid ${c.border}` },
      },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 } },
          React.createElement('div', { style: { fontWeight: 700, fontSize: 14, color: c.text } }, "Today's Best Route"),
          React.createElement(Pill, { bg: c.successLight, color: c.success }, '✓ ACTIVE')
        ),
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12 } },
          React.createElement('div', {
            style: { width: 50, height: 50, borderRadius: 14, background: c.successLight, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
          },
            React.createElement(Icon, { name: 'Bus', size: 26, color: c.success })
          ),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', { style: { fontWeight: 700, fontSize: 17, color: c.text } }, 'Bus + Walk'),
            React.createElement('div', { style: { fontSize: 12, color: c.textSec, marginTop: 2 } }, 'Home → M15 Stop → Downtown → Office')
          ),
          React.createElement('div', { style: { textAlign: 'right', flexShrink: 0 } },
            React.createElement('div', { style: { fontWeight: 700, fontSize: 22, color: c.text } }, '58 min'),
            React.createElement('div', { style: { fontSize: 13, color: c.success, fontWeight: 600 } }, '$2.75')
          )
        ),
        React.createElement('div', {
          style: { display: 'flex', gap: 6, marginTop: 12, paddingTop: 12, borderTop: `1px solid ${c.border}`, flexWrap: 'wrap' },
        },
          ...['⏰ Leave 8:15 AM', '🌧 Rain gear', '📍 3 stops', '88% reliable'].map((tag, i) =>
            React.createElement('div', {
              key: i,
              style: { fontSize: 11, color: c.textSec, background: c.chip, padding: '4px 9px', borderRadius: 6, fontWeight: 500 },
            }, tag)
          )
        )
      ),

      // This week bar chart
      React.createElement('div', {
        style: { background: c.card, borderRadius: 18, padding: 16, marginBottom: 14, border: `1px solid ${c.border}` },
      },
        React.createElement('div', { style: { fontWeight: 700, fontSize: 14, color: c.text, marginBottom: 14 } }, 'This Week'),
        React.createElement('div', { style: { display: 'flex', alignItems: 'flex-end', gap: 6, height: 80, marginBottom: 8 } },
          ...weekData.map((d, i) => {
            const h = (d.minutes / maxMin) * 64;
            const isToday = i === 0;
            return React.createElement('div', {
              key: d.day,
              style: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 },
            },
              React.createElement('div', {
                style: {
                  width: '100%',
                  height: h,
                  background: isToday ? c.primary : c.primaryLight,
                  borderRadius: '6px 6px 2px 2px',
                  transition: 'height 0.5s ease',
                  position: 'relative',
                },
              }),
              React.createElement('div', {
                style: { fontSize: 11, color: isToday ? c.primary : c.textSec, fontWeight: isToday ? 700 : 400 },
              }, d.day)
            );
          })
        ),
        React.createElement('div', {
          style: { display: 'flex', justifyContent: 'space-around', paddingTop: 12, borderTop: `1px solid ${c.border}` },
        },
          ...[
            { label: 'Avg Time', value: '51 min' },
            { label: 'Total Cost', value: '$25.25' },
            { label: 'Stress Avg', value: '58%' },
          ].map((s, i) =>
            React.createElement('div', { key: i, style: { textAlign: 'center' } },
              React.createElement('div', { style: { fontSize: 17, fontWeight: 700, color: c.text } }, s.value),
              React.createElement('div', { style: { fontSize: 11, color: c.textSec, marginTop: 1 } }, s.label)
            )
          )
        )
      ),

      // Active disruptions
      React.createElement('div', {
        style: {
          background: c.warningLight,
          border: `1px solid ${c.warning}40`,
          borderRadius: 14,
          padding: '12px 14px',
        },
      },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 } },
          React.createElement(Icon, { name: 'AlertTriangle', size: 15, color: c.warning }),
          React.createElement('div', { style: { fontWeight: 700, fontSize: 13, color: c.text } }, 'Active Disruptions')
        ),
        React.createElement('div', { style: { fontSize: 12, color: c.textSec, lineHeight: 1.6 } },
          '🌧 Rain 7–10 AM  •  🚌 Line 3 delay +15 min  •  🚧 Main St partial closure'
        )
      )
    );
  };

  // ─── SIMULATE SCREEN ───────────────────────────────────────────────────────
  const SimulateScreen = () =>
    React.createElement('div', { style: { padding: '0 20px 24px', overflowY: 'auto', flex: 1 } },
      React.createElement('div', { style: { marginTop: 22, marginBottom: 6 } },
        React.createElement('div', { style: { fontSize: 24, fontWeight: 700, color: c.text } }, 'Route Simulator'),
        React.createElement('div', { style: { fontSize: 13, color: c.textSec, marginTop: 4, marginBottom: 16 } },
          `${activeEvents.length} event${activeEvents.length !== 1 ? 's' : ''} active · Tap a route, then simulate`
        )
      ),

      // Active event chips
      activeEvents.length > 0 && React.createElement('div', {
        style: { display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 14 },
      },
        ...activeEvents.map((eid) => {
          const ev = lifeEvents.find((e) => e.id === eid);
          if (!ev) return null;
          return React.createElement('div', {
            key: eid,
            style: { fontSize: 11, fontWeight: 600, color: ev.color, background: `${ev.color}18`, padding: '4px 9px', borderRadius: 6, display: 'flex', alignItems: 'center', gap: 4 },
          },
            React.createElement(Icon, { name: ev.icon, size: 12, color: ev.color }),
            ev.label
          );
        })
      ),

      // Route option cards
      ...routes.map((route, i) =>
        React.createElement('div', {
          key: i,
          onClick: () => { handlePress(`route-${i}`); setSelectedRouteIdx(i); setSimulationComplete(false); setSimResult(null); },
          style: {
            background: c.card,
            borderRadius: 18,
            padding: 16,
            marginBottom: 10,
            border: `2px solid ${selectedRouteIdx === i ? c.primary : c.border}`,
            cursor: 'pointer',
            transition: 'all 0.18s ease',
            transform: pressedBtn === `route-${i}` ? 'scale(0.975)' : 'scale(1)',
            boxShadow: selectedRouteIdx === i ? `0 4px 20px ${c.primary}20` : 'none',
          },
        },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 } },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10 } },
              React.createElement('div', {
                style: { width: 42, height: 42, borderRadius: 12, background: `${route.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center' },
              },
                React.createElement(Icon, { name: route.icon, size: 22, color: route.color })
              ),
              React.createElement('div', null,
                React.createElement('div', { style: { fontWeight: 700, fontSize: 15, color: c.text } }, route.name),
                React.createElement('div', { style: { fontSize: 11, color: route.color, fontWeight: 600, marginTop: 1 } }, route.badge)
              )
            ),
            React.createElement('div', { style: { textAlign: 'right' } },
              React.createElement('div', { style: { fontWeight: 700, fontSize: 19, color: c.text } }, `${route.time} min`),
              React.createElement('div', { style: { fontSize: 12, color: c.textSec, marginTop: 1 } }, route.cost === 0 ? 'Free' : `$${route.cost.toFixed(2)}`)
            )
          ),
          React.createElement('div', { style: { fontSize: 12, color: c.textSec, marginBottom: 10 } }, route.desc),
          React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 7 } },
            ...[
              { label: 'Stress', value: route.stress, color: route.stress > 70 ? c.danger : route.stress > 40 ? c.warning : c.success },
              { label: 'Reliability', value: route.reliability, color: c.secondary },
            ].map((m, j) =>
              React.createElement('div', { key: j, style: { display: 'flex', alignItems: 'center', gap: 8 } },
                React.createElement('div', { style: { fontSize: 11, color: c.textSec, width: 62, flexShrink: 0 } }, m.label),
                React.createElement(MetricBar, { value: m.value, color: m.color }),
                React.createElement('div', { style: { fontSize: 11, color: c.textSec, width: 30, textAlign: 'right', flexShrink: 0 } }, `${m.value}%`)
              )
            )
          )
        )
      ),

      // Run simulation area
      React.createElement('div', { style: { marginTop: 6 } },
        isSimulating
          ? React.createElement('div', {
              style: { background: c.card, borderRadius: 18, padding: 20, border: `1px solid ${c.border}`, textAlign: 'center' },
            },
              React.createElement('div', { style: { fontSize: 13, color: c.textSec, marginBottom: 12 } }, `Simulating ${routes[selectedRouteIdx].name}…`),
              React.createElement('div', { style: { height: 8, borderRadius: 4, background: c.border, overflow: 'hidden', marginBottom: 10 } },
                React.createElement('div', {
                  style: {
                    height: '100%',
                    width: `${simulationProgress}%`,
                    background: `linear-gradient(90deg, ${c.primary}, ${c.secondary})`,
                    borderRadius: 4,
                    transition: 'width 0.15s ease',
                  },
                })
              ),
              React.createElement('div', { style: { fontSize: 13, fontWeight: 700, color: c.primary } }, `${Math.round(simulationProgress)}%`)
            )
          : simulationComplete && simResult
          ? React.createElement('div', {
              style: {
                background: c.card,
                borderRadius: 18,
                padding: 18,
                border: `2px solid ${c.success}60`,
                boxShadow: `0 4px 20px ${c.success}15`,
              },
            },
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 } },
                React.createElement(Icon, { name: 'CheckCircle', size: 18, color: c.success }),
                React.createElement('div', { style: { fontWeight: 700, fontSize: 15, color: c.text } }, 'Simulation Complete')
              ),
              React.createElement('div', { style: { display: 'flex', justifyContent: 'space-around', marginBottom: 14 } },
                ...[
                  { label: 'Arrive', value: simResult.arrive, color: c.text },
                  { label: 'Cost', value: `$${simResult.cost.toFixed(2)}`, color: c.success },
                  { label: 'Stress', value: `${simResult.stress}%`, color: simResult.stress > 70 ? c.danger : c.warning },
                  { label: 'Score', value: `${simResult.score}`, color: c.primary },
                ].map((s, i) =>
                  React.createElement('div', { key: i, style: { textAlign: 'center' } },
                    React.createElement('div', { style: { fontWeight: 700, fontSize: 18, color: s.color } }, s.value),
                    React.createElement('div', { style: { fontSize: 11, color: c.textSec, marginTop: 2 } }, s.label)
                  )
                )
              ),
              React.createElement('div', {
                onClick: runSimulation,
                style: {
                  textAlign: 'center',
                  padding: '10px',
                  borderRadius: 10,
                  border: `1px solid ${c.border}`,
                  color: c.primary,
                  fontWeight: 600,
                  fontSize: 13,
                  cursor: 'pointer',
                  fontFamily: 'Space Grotesk, sans-serif',
                },
              }, '↺  Run Again')
            )
          : React.createElement('div', {
              onClick: runSimulation,
              onMouseDown: () => handlePress('sim-btn'),
              style: {
                width: '100%',
                padding: '17px',
                borderRadius: 18,
                border: 'none',
                background: `linear-gradient(135deg, ${c.primary}, ${c.secondary})`,
                color: '#fff',
                fontWeight: 700,
                fontSize: 16,
                cursor: 'pointer',
                fontFamily: 'Space Grotesk, sans-serif',
                boxShadow: `0 8px 28px ${c.primary}40`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                transform: pressedBtn === 'sim-btn' ? 'scale(0.97)' : 'scale(1)',
                transition: 'transform 0.1s ease',
                boxSizing: 'border-box',
              },
            },
              React.createElement(Icon, { name: 'Play', size: 18, color: '#fff' }),
              'Run Simulation'
            )
      )
    );

  // ─── EVENTS SCREEN ─────────────────────────────────────────────────────────
  const EventsScreen = () =>
    React.createElement('div', { style: { padding: '0 20px 24px', overflowY: 'auto', flex: 1 } },
      React.createElement('div', { style: { marginTop: 22, marginBottom: 6 } },
        React.createElement('div', { style: { fontSize: 24, fontWeight: 700, color: c.text } }, 'Life Events'),
        React.createElement('div', { style: { fontSize: 13, color: c.textSec, marginTop: 4, marginBottom: 14 } },
          'Toggle events to inject into your simulation'
        )
      ),

      React.createElement('div', {
        style: {
          background: `${c.primary}12`,
          border: `1px solid ${c.primary}30`,
          borderRadius: 12,
          padding: '10px 14px',
          marginBottom: 16,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        },
      },
        React.createElement(Icon, { name: 'Zap', size: 15, color: c.primary }),
        React.createElement('div', { style: { fontSize: 13, color: c.text } },
          React.createElement('span', { style: { fontWeight: 700 } }, `${activeEvents.length} event${activeEvents.length !== 1 ? 's' : ''} active`),
          ' — will affect your next simulation'
        )
      ),

      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 } },
        ...lifeEvents.map((ev) => {
          const isActive = activeEvents.includes(ev.id);
          return React.createElement('div', {
            key: ev.id,
            onClick: () => toggleEvent(ev.id),
            style: {
              background: isActive ? `${ev.color}14` : c.card,
              borderRadius: 16,
              padding: 14,
              border: `2px solid ${isActive ? ev.color : c.border}`,
              cursor: 'pointer',
              transition: 'all 0.18s ease',
            },
          },
            React.createElement('div', {
              style: {
                width: 36, height: 36,
                borderRadius: 10,
                background: isActive ? `${ev.color}25` : c.chip,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 8,
              },
            },
              React.createElement(Icon, { name: ev.icon, size: 18, color: isActive ? ev.color : c.textSec })
            ),
            React.createElement('div', { style: { fontWeight: 700, fontSize: 13, color: c.text, marginBottom: 2 } }, ev.label),
            React.createElement('div', { style: { fontSize: 11, color: c.textSec, lineHeight: 1.4, marginBottom: 8 } }, ev.desc),
            React.createElement(Pill, {
              bg: ev.impact === 'high' ? `${c.danger}18` : ev.impact === 'medium' ? `${c.warning}18` : `${c.success}18`,
              color: ev.impact === 'high' ? c.danger : ev.impact === 'medium' ? c.warning : c.success,
            }, ev.impact.toUpperCase())
          );
        })
      )
    );

  // ─── INSIGHTS SCREEN ───────────────────────────────────────────────────────
  const InsightsScreen = () =>
    React.createElement('div', { style: { padding: '0 20px 24px', overflowY: 'auto', flex: 1 } },
      React.createElement('div', { style: { marginTop: 22, marginBottom: 16 } },
        React.createElement('div', { style: { fontSize: 24, fontWeight: 700, color: c.text } }, 'Weekly Insights'),
        React.createElement('div', { style: { fontSize: 13, color: c.textSec, marginTop: 4 } }, 'Mar 16–22, 2026')
      ),

      // Summary stat grid
      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 } },
        ...[
          { icon: 'Clock', label: 'Time Saved', value: '47 min', iconColor: c.primary, iconBg: c.primaryLight },
          { icon: 'DollarSign', label: 'Money Saved', value: '$23.50', iconColor: c.success, iconBg: c.successLight },
          { icon: 'Brain', label: 'Stress Reduction', value: '32%', iconColor: c.secondary, iconBg: c.secondaryLight },
          { icon: 'Leaf', label: 'CO₂ Avoided', value: '8.2 kg', iconColor: '#10B981', iconBg: isDark ? '#064E3B' : '#D1FAE5' },
        ].map((s, i) =>
          React.createElement('div', {
            key: i,
            style: { background: c.card, borderRadius: 16, padding: 14, border: `1px solid ${c.border}` },
          },
            React.createElement('div', {
              style: { width: 38, height: 38, borderRadius: 10, background: s.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
            },
              React.createElement(Icon, { name: s.icon, size: 18, color: s.iconColor })
            ),
            React.createElement('div', { style: { fontWeight: 700, fontSize: 21, color: c.text } }, s.value),
            React.createElement('div', { style: { fontSize: 11, color: c.textSec, marginTop: 2 } }, s.label)
          )
        )
      ),

      // Route performance
      React.createElement('div', {
        style: { background: c.card, borderRadius: 18, padding: 16, marginBottom: 14, border: `1px solid ${c.border}` },
      },
        React.createElement('div', { style: { fontWeight: 700, fontSize: 14, color: c.text, marginBottom: 14 } }, 'Route Performance This Week'),
        ...routes.slice(0, 3).map((r, i) =>
          React.createElement('div', {
            key: i,
            style: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: i < 2 ? 12 : 0 },
          },
            React.createElement('div', {
              style: { width: 34, height: 34, borderRadius: 9, background: `${r.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
            },
              React.createElement(Icon, { name: r.icon, size: 16, color: r.color })
            ),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: 5 } },
                React.createElement('div', { style: { fontSize: 13, fontWeight: 600, color: c.text } }, r.name),
                React.createElement('div', { style: { fontSize: 11, color: c.textSec } }, `Used ${[3, 2, 1][i]}×`)
              ),
              React.createElement(MetricBar, { value: r.reliability, color: r.color })
            )
          )
        )
      ),

      // Smart recommendations
      React.createElement('div', { style: { fontWeight: 700, fontSize: 14, color: c.text, marginBottom: 10 } }, 'Smart Recommendations'),
      ...insights.map((ins, i) =>
        React.createElement('div', {
          key: i,
          onClick: () => setExpandedInsight(expandedInsight === i ? null : i),
          style: {
            background: c.card,
            borderRadius: 16,
            padding: 14,
            marginBottom: 10,
            border: `1px solid ${expandedInsight === i ? c.primary : c.border}`,
            cursor: 'pointer',
            transition: 'border-color 0.2s ease',
          },
        },
          React.createElement('div', { style: { display: 'flex', alignItems: 'flex-start', gap: 10 } },
            React.createElement('div', {
              style: { width: 36, height: 36, borderRadius: 10, background: c.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
            },
              React.createElement(Icon, { name: ins.icon, size: 17, color: c.primary })
            ),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 } },
                React.createElement(Pill, { bg: `${ins.tagColor}18`, color: ins.tagColor }, ins.tag),
              ),
              React.createElement('div', { style: { fontWeight: 600, fontSize: 13, color: c.text } }, ins.title),
              React.createElement('div', { style: { fontSize: 11, color: c.success, fontWeight: 700, marginTop: 2 } }, ins.saving),
              expandedInsight === i && React.createElement('div', {
                style: { fontSize: 12, color: c.textSec, marginTop: 8, lineHeight: 1.6 },
              }, ins.desc)
            ),
            React.createElement(Icon, { name: expandedInsight === i ? 'ChevronUp' : 'ChevronDown', size: 15, color: c.textSec })
          )
        )
      )
    );

  // ─── SETTINGS SCREEN ───────────────────────────────────────────────────────
  const SettingsScreen = () =>
    React.createElement('div', { style: { padding: '0 20px 24px', overflowY: 'auto', flex: 1 } },
      React.createElement('div', { style: { marginTop: 22, marginBottom: 20 } },
        React.createElement('div', { style: { fontSize: 24, fontWeight: 700, color: c.text } }, 'Settings')
      ),

      // Profile card
      React.createElement('div', {
        style: { background: c.card, borderRadius: 18, padding: 16, marginBottom: 16, border: `1px solid ${c.border}`, display: 'flex', alignItems: 'center', gap: 14 },
      },
        React.createElement('div', {
          style: {
            width: 56, height: 56, borderRadius: '50%',
            background: `linear-gradient(135deg, ${c.primary}, ${c.secondary})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 26, flexShrink: 0,
          },
        }, '👤'),
        React.createElement('div', { style: { flex: 1 } },
          React.createElement('div', { style: { fontWeight: 700, fontSize: 16, color: c.text } }, 'Alex Chen'),
          React.createElement('div', { style: { fontSize: 12, color: c.textSec } }, 'alex.chen@email.com'),
          React.createElement('div', { style: { fontSize: 11, color: c.primary, fontWeight: 600, marginTop: 3 } }, '⭐ Premium Simulator')
        ),
        React.createElement(Icon, { name: 'ChevronRight', size: 17, color: c.textTert })
      ),

      // My Routine section
      React.createElement('div', { style: { fontSize: 11, fontWeight: 700, color: c.textSec, letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 8, marginLeft: 4 } }, 'My Routine'),
      React.createElement('div', {
        style: { background: c.card, borderRadius: 18, marginBottom: 16, border: `1px solid ${c.border}`, overflow: 'hidden' },
      },
        ...[
          { icon: 'Home', label: 'Home Address', value: '123 Oak St, Brooklyn', iconBg: c.primaryLight, iconColor: c.primary },
          { icon: 'Briefcase', label: 'Work Address', value: 'Downtown Financial District', iconBg: c.secondaryLight, iconColor: c.secondary },
          { icon: 'GraduationCap', label: 'School Pickup', value: 'PS 42 · 3:30 PM daily', iconBg: c.successLight, iconColor: c.success },
          { icon: 'MapPin', label: 'Frequent Places', value: '4 locations saved', iconBg: c.warningLight, iconColor: c.warning },
        ].map((item, i, arr) =>
          React.createElement('div', {
            key: i,
            style: { display: 'flex', alignItems: 'center', gap: 12, padding: '13px 16px', borderBottom: i < arr.length - 1 ? `1px solid ${c.border}` : 'none' },
          },
            React.createElement('div', {
              style: { width: 34, height: 34, borderRadius: 9, background: item.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
            },
              React.createElement(Icon, { name: item.icon, size: 16, color: item.iconColor })
            ),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', { style: { fontSize: 13, fontWeight: 600, color: c.text } }, item.label),
              React.createElement('div', { style: { fontSize: 12, color: c.textSec, marginTop: 1 } }, item.value)
            ),
            React.createElement(Icon, { name: 'ChevronRight', size: 15, color: c.textTert })
          )
        )
      ),

      // Preferences section
      React.createElement('div', { style: { fontSize: 11, fontWeight: 700, color: c.textSec, letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 8, marginLeft: 4 } }, 'Preferences'),
      React.createElement('div', {
        style: { background: c.card, borderRadius: 18, marginBottom: 16, border: `1px solid ${c.border}`, overflow: 'hidden' },
      },
        // Dark mode toggle
        React.createElement('div', {
          style: { display: 'flex', alignItems: 'center', gap: 12, padding: '13px 16px', borderBottom: `1px solid ${c.border}` },
        },
          React.createElement('div', {
            style: { width: 34, height: 34, borderRadius: 9, background: isDark ? '#1E1B4B' : '#FEF3C7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
          },
            React.createElement(Icon, { name: isDark ? 'Moon' : 'Sun', size: 16, color: isDark ? '#818CF8' : '#F59E0B' })
          ),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', { style: { fontSize: 13, fontWeight: 600, color: c.text } }, 'Dark Mode'),
            React.createElement('div', { style: { fontSize: 12, color: c.textSec, marginTop: 1 } }, isDark ? 'Dark theme active' : 'Light theme active')
          ),
          React.createElement('div', {
            onClick: () => setIsDark(!isDark),
            style: {
              width: 46, height: 26, borderRadius: 13,
              background: isDark ? c.primary : c.border,
              cursor: 'pointer',
              position: 'relative',
              transition: 'background 0.22s ease',
              flexShrink: 0,
            },
          },
            React.createElement('div', {
              style: {
                position: 'absolute',
                top: 3, left: isDark ? 23 : 3,
                width: 20, height: 20,
                borderRadius: '50%',
                background: '#fff',
                transition: 'left 0.22s ease',
                boxShadow: '0 1px 4px rgba(0,0,0,0.25)',
              },
            })
          )
        ),
        ...[
          { icon: 'Bell', label: 'Notifications', value: 'Push & Daily digest', iconBg: c.successLight, iconColor: c.success },
          { icon: 'Navigation', label: 'Priority', value: 'Balance cost + time', iconBg: c.primaryLight, iconColor: c.primary },
          { icon: 'BarChart2', label: 'Simulation Detail', value: 'High accuracy', iconBg: c.secondaryLight, iconColor: c.secondary },
        ].map((item, i, arr) =>
          React.createElement('div', {
            key: i,
            style: { display: 'flex', alignItems: 'center', gap: 12, padding: '13px 16px', borderBottom: i < arr.length - 1 ? `1px solid ${c.border}` : 'none' },
          },
            React.createElement('div', {
              style: { width: 34, height: 34, borderRadius: 9, background: item.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
            },
              React.createElement(Icon, { name: item.icon, size: 16, color: item.iconColor })
            ),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', { style: { fontSize: 13, fontWeight: 600, color: c.text } }, item.label),
              React.createElement('div', { style: { fontSize: 12, color: c.textSec, marginTop: 1 } }, item.value)
            ),
            React.createElement(Icon, { name: 'ChevronRight', size: 15, color: c.textTert })
          )
        )
      ),

      React.createElement('div', { style: { textAlign: 'center', fontSize: 12, color: c.textTert, paddingBottom: 4 } },
        'Route Roast v1.0 · Simulate better commutes, daily.'
      )
    );

  // ─── NAVIGATION ────────────────────────────────────────────────────────────
  const tabs = [
    { id: 'home', icon: 'Home', label: 'Home' },
    { id: 'simulate', icon: 'Play', label: 'Simulate' },
    { id: 'events', icon: 'Zap', label: 'Events' },
    { id: 'insights', icon: 'BarChart2', label: 'Insights' },
    { id: 'settings', icon: 'Settings', label: 'Settings' },
  ];

  const screenMap = {
    home: HomeScreen,
    simulate: SimulateScreen,
    events: EventsScreen,
    insights: InsightsScreen,
    settings: SettingsScreen,
  };

  const CurrentScreen = screenMap[activeTab] || HomeScreen;

  return React.createElement('div', {
    style: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      background: '#E8E4DF',
      fontFamily: 'Space Grotesk, sans-serif',
    },
  },
    // Phone frame
    React.createElement('div', {
      style: {
        width: 375,
        height: 812,
        background: c.bg,
        borderRadius: 52,
        boxShadow: '0 0 0 10px #1c1c1e, 0 0 0 12px #2c2c2e, 0 40px 80px rgba(0,0,0,0.35)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        transition: 'background 0.25s ease',
      },
    },
      React.createElement(StatusBar),
      React.createElement(DynamicIsland),

      // Screen content area
      React.createElement('div', {
        style: { flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' },
      },
        React.createElement(CurrentScreen)
      ),

      // Bottom navigation
      React.createElement('div', {
        style: {
          background: c.navBg,
          borderTop: `1px solid ${c.navBorder}`,
          display: 'flex',
          justifyContent: 'space-around',
          padding: '8px 0 24px',
          flexShrink: 0,
          transition: 'background 0.25s ease',
        },
      },
        ...tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return React.createElement('div', {
            key: tab.id,
            onClick: () => setActiveTab(tab.id),
            style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, cursor: 'pointer', padding: '4px 10px' },
          },
            React.createElement('div', {
              style: {
                width: 34, height: 34,
                borderRadius: 10,
                background: isActive ? c.primaryLight : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'background 0.2s ease',
              },
            },
              React.createElement(Icon, { name: tab.icon, size: 20, color: isActive ? c.primary : c.textSec })
            ),
            React.createElement('div', {
              style: { fontSize: 10, fontWeight: isActive ? 700 : 400, color: isActive ? c.primary : c.textSec, transition: 'color 0.2s ease' },
            }, tab.label)
          );
        })
      )
    )
  );
}
