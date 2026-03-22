function App() {
  const { useState, useEffect, useRef } = React;

  const themes = {
    dark: {
      bg: '#070B12',
      surface: '#0E1520',
      surface2: '#141E2E',
      surface3: '#1C2A3E',
      text: '#E8F4FF',
      textSub: '#6B8BAE',
      textMuted: '#3A5070',
      primary: '#00D4AA',
      primaryLight: '#33DFB9',
      primaryDark: '#00A884',
      accent: '#4F9EFF',
      accentDark: '#2B7FE0',
      warning: '#FFB830',
      danger: '#FF5A5A',
      success: '#00D4AA',
      purple: '#A78BFA',
      border: '#1C2E42',
      borderLight: '#243650',
      card: '#0E1520',
      navBg: 'rgba(7,11,18,0.97)',
      mapBg: '#0A1525',
    },
    light: {
      bg: '#EFF6FF',
      surface: '#FFFFFF',
      surface2: '#F0F9FF',
      surface3: '#E0F2FE',
      text: '#0F2845',
      textSub: '#4A7399',
      textMuted: '#8BACC8',
      primary: '#00A884',
      primaryLight: '#00C49A',
      primaryDark: '#007A62',
      accent: '#2B7FE0',
      accentDark: '#1A5FC0',
      warning: '#E08800',
      danger: '#D93A3A',
      success: '#00A884',
      purple: '#7C3AED',
      border: '#C8E0F4',
      borderLight: '#D8EAF7',
      card: '#FFFFFF',
      navBg: 'rgba(239,246,255,0.97)',
      mapBg: '#DBE9F8',
    },
  };

  const [theme, setTheme] = useState('dark');
  const [activeTab, setActiveTab] = useState('today');
  const [pressed, setPressed] = useState(null);
  const [activeRoute, setActiveRoute] = useState(false);
  const [currentStop, setCurrentStop] = useState(0);
  const [completedStops, setCompletedStops] = useState([]);
  const [showAddErrand, setShowAddErrand] = useState(false);
  const [addErrandName, setAddErrandName] = useState('');
  const [addErrandCat, setAddErrandCat] = useState('Shopping');
  const [expandedInsight, setExpandedInsight] = useState(null);
  const [routeRecalculating, setRouteRecalculating] = useState(false);
  const [notifVisible, setNotifVisible] = useState(false);
  const [notifMsg, setNotifMsg] = useState('');
  const [habitTab, setHabitTab] = useState('week');
  const [settingsExpanded, setSettingsExpanded] = useState(null);

  const t = themes[theme];

  const errands = [
    { id: 1, name: 'Dry Cleaning Pickup', store: 'Fresh Press Cleaners', address: '142 Oak Ave', cat: 'Services', icon: '👔', urgency: 'today', time: '~10 min', dist: '0.4 mi', open: '7am–7pm', status: 'pending', lat: 37.785, lng: -122.408 },
    { id: 2, name: 'Buy Batteries (AA)', store: 'Target', address: '850 Market St', cat: 'Shopping', icon: '🔋', urgency: 'today', time: '~8 min', dist: '0.6 mi', open: '8am–10pm', status: 'pending', lat: 37.783, lng: -122.411 },
    { id: 3, name: 'Pharmacy – Prescription', store: 'Walgreens', address: '900 Powell St', cat: 'Health', icon: '💊', urgency: 'today', time: '~12 min', dist: '0.8 mi', open: '24 hrs', status: 'pending', lat: 37.786, lng: -122.414 },
    { id: 4, name: 'Mail Utility Bill', store: 'USPS Post Office', address: '101 Hyde St', cat: 'Errands', icon: '✉️', urgency: 'today', time: '~5 min', dist: '0.3 mi', open: '9am–5pm', status: 'pending', lat: 37.782, lng: -122.412 },
    { id: 5, name: 'Return Library Book', store: 'SF Public Library', address: '100 Larkin St', cat: 'Errands', icon: '📚', urgency: 'flexible', time: '~7 min', dist: '0.5 mi', open: '10am–6pm', status: 'pending', lat: 37.779, lng: -122.415 },
    { id: 6, name: 'Grocery Top-Up', store: 'Trader Joe\'s', address: '401 Bay St', cat: 'Shopping', icon: '🛒', urgency: 'flexible', time: '~20 min', dist: '1.2 mi', open: '8am–9pm', status: 'pending', lat: 37.788, lng: -122.416 },
    { id: 7, name: 'Pick Up Dinner', store: 'Doordash Pickup – Noodle Bar', address: '200 Columbus Ave', cat: 'Food', icon: '🍜', urgency: 'tonight', time: '~15 min', dist: '0.9 mi', open: 'until 10pm', status: 'pending', lat: 37.797, lng: -122.407 },
  ];

  const [errandList, setErrandList] = useState(errands);
  const optimizedRoute = [0, 3, 1, 2, 4, 5, 6]; // indices into errandList

  const showNotif = (msg) => {
    setNotifMsg(msg);
    setNotifVisible(true);
    setTimeout(() => setNotifVisible(false), 3000);
  };

  const handleCompleteStop = (idx) => {
    const newCompleted = [...completedStops, idx];
    setCompletedStops(newCompleted);
    if (idx + 1 < optimizedRoute.length) {
      setCurrentStop(idx + 1);
      const next = errandList[optimizedRoute[idx + 1]];
      showNotif(`Next: ${next.name} at ${next.store}`);
    } else {
      setActiveRoute(false);
      showNotif('All errands complete! Great job.');
    }
  };

  const handleRecalculate = () => {
    setRouteRecalculating(true);
    setTimeout(() => {
      setRouteRecalculating(false);
      showNotif('Route updated – saved 4 min');
    }, 1800);
  };

  const catColors = {
    Shopping: t.accent,
    Services: t.purple,
    Health: t.danger,
    Errands: t.warning,
    Food: '#FF8C42',
  };

  const press = (id) => {
    setPressed(id);
    setTimeout(() => setPressed(null), 150);
  };

  // Styles
  const phoneStyle = {
    width: 375,
    height: 812,
    background: t.bg,
    borderRadius: 52,
    overflow: 'hidden',
    position: 'relative',
    boxShadow: theme === 'dark'
      ? '0 40px 120px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.08)'
      : '0 40px 120px rgba(0,0,0,0.25), 0 0 0 1px rgba(0,0,0,0.06)',
    fontFamily: '"Space Grotesk", sans-serif',
    display: 'flex',
    flexDirection: 'column',
  };

  const StatusBar = () => (
    <div style={{ height: 50, background: t.surface, display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingLeft: 28, paddingRight: 20, paddingTop: 14, flexShrink: 0, zIndex: 10 }}>
      <span style={{ fontSize: 13, fontWeight: 700, color: t.text, letterSpacing: -0.3 }}>9:41</span>
      <div style={{ width: 120, height: 28, background: '#000', borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: 10 }}>
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#1A1A2E' }} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
        {React.createElement(window.lucide.Wifi, { size: 14, color: t.text })}
        {React.createElement(window.lucide.Battery, { size: 16, color: t.text })}
      </div>
    </div>
  );

  const BottomNav = () => {
    const tabs = [
      { id: 'today', icon: window.lucide.Zap, label: 'Today' },
      { id: 'route', icon: window.lucide.Navigation2, label: 'Route' },
      { id: 'errands', icon: window.lucide.CheckSquare, label: 'Errands' },
      { id: 'insights', icon: window.lucide.BarChart2, label: 'Insights' },
      { id: 'settings', icon: window.lucide.Settings2, label: 'Settings' },
    ];
    return (
      <div style={{ background: t.navBg, borderTop: `1px solid ${t.border}`, display: 'flex', justifyContent: 'space-around', padding: '8px 0 16px', flexShrink: 0, backdropFilter: 'blur(20px)', zIndex: 20 }}>
        {tabs.map(tab => {
          const active = activeTab === tab.id;
          return (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ background: 'none', border: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, cursor: 'pointer', padding: '4px 12px', position: 'relative' }}>
              {active && <div style={{ position: 'absolute', top: -1, width: 24, height: 3, background: t.primary, borderRadius: 2 }} />}
              {React.createElement(tab.icon, { size: 20, color: active ? t.primary : t.textMuted, strokeWidth: active ? 2.5 : 1.8 })}
              <span style={{ fontSize: 10, fontWeight: active ? 700 : 500, color: active ? t.primary : t.textMuted, letterSpacing: 0.2 }}>{tab.label}</span>
            </button>
          );
        })}
      </div>
    );
  };

  // TODAY SCREEN
  const TodayScreen = () => {
    const pending = errandList.filter(e => !completedStops.includes(errandList.indexOf(e)));
    const todayCount = errandList.filter(e => e.urgency === 'today').length;
    const totalDist = 3.2;
    const savedMin = 28;

    return (
      <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
        {/* Header */}
        <div style={{ background: t.surface, padding: '16px 20px 20px', borderBottom: `1px solid ${t.border}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: 12, color: t.textSub, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4 }}>Sunday, Mar 22</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: t.text, letterSpacing: -0.5 }}>Your Smart Route</div>
              <div style={{ fontSize: 13, color: t.textSub, marginTop: 2 }}>3 urgent · 4 flexible</div>
            </div>
            <div style={{ width: 44, height: 44, borderRadius: 14, background: `linear-gradient(135deg, ${t.primary}, ${t.primaryDark})`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {React.createElement(window.lucide.Zap, { size: 22, color: '#fff' })}
            </div>
          </div>

          {/* Stats row */}
          <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
            {[
              { label: 'Stops', val: '7', icon: window.lucide.MapPin, color: t.primary },
              { label: 'Distance', val: '3.2 mi', icon: window.lucide.Navigation2, color: t.accent },
              { label: 'Time saved', val: '28 min', icon: window.lucide.Clock, color: t.warning },
            ].map(s => (
              <div key={s.label} style={{ flex: 1, background: t.surface2, borderRadius: 12, padding: '10px 12px', border: `1px solid ${t.border}` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 4 }}>
                  {React.createElement(s.icon, { size: 12, color: s.color })}
                  <span style={{ fontSize: 10, color: t.textSub, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>{s.label}</span>
                </div>
                <div style={{ fontSize: 16, fontWeight: 800, color: t.text }}>{s.val}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Smart suggestion banner */}
        <div style={{ margin: '16px 16px 0', background: `linear-gradient(135deg, ${t.primary}22, ${t.accent}15)`, border: `1px solid ${t.primary}40`, borderRadius: 14, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: `${t.primary}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            {React.createElement(window.lucide.Lightbulb, { size: 18, color: t.primary })}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: t.primary, marginBottom: 2 }}>Smart Suggestion</div>
            <div style={{ fontSize: 12, color: t.textSub, lineHeight: 1.4 }}>Post Office closes at 5pm — start before 3:30pm to hit it first</div>
          </div>
        </div>

        {/* Optimized route list */}
        <div style={{ padding: '16px 16px 0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: t.text }}>Optimized Order</div>
            <button onClick={() => setActiveTab('route')} style={{ background: 'none', border: 'none', fontSize: 12, color: t.primary, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 4 }}>
              View Map {React.createElement(window.lucide.ChevronRight, { size: 14 })}
            </button>
          </div>

          {optimizedRoute.map((eIdx, routeIdx) => {
            const e = errandList[eIdx];
            const done = completedStops.includes(eIdx);
            const isCurrent = activeRoute && routeIdx === currentStop;
            const catColor = catColors[e.cat] || t.primary;

            return (
              <div key={e.id} style={{ display: 'flex', gap: 0, marginBottom: 4, opacity: done ? 0.45 : 1 }}>
                {/* Timeline */}
                <div style={{ width: 36, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0, flexShrink: 0 }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: done ? t.surface3 : isCurrent ? t.primary : `${catColor}25`, border: `2px solid ${done ? t.border : isCurrent ? t.primary : catColor}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: done ? 12 : 11, color: done ? t.textMuted : isCurrent ? '#fff' : catColor, fontWeight: 800, zIndex: 1 }}>
                    {done ? '✓' : routeIdx + 1}
                  </div>
                  {routeIdx < optimizedRoute.length - 1 && (
                    <div style={{ width: 2, flex: 1, minHeight: 12, background: done ? t.border : `${catColor}30`, borderRadius: 1 }} />
                  )}
                </div>

                {/* Card */}
                <div style={{ flex: 1, background: isCurrent ? `${t.primary}12` : t.surface, borderRadius: 12, padding: '10px 12px', marginBottom: 6, marginLeft: 8, border: `1px solid ${isCurrent ? t.primary + '50' : t.border}`, cursor: 'pointer', transform: pressed === `stop-${e.id}` ? 'scale(0.98)' : 'scale(1)', transition: 'transform 0.1s' }}
                  onMouseDown={() => press(`stop-${e.id}`)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: 18 }}>{e.icon}</span>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: done ? t.textMuted : t.text, textDecoration: done ? 'line-through' : 'none' }}>{e.name}</div>
                        <div style={{ fontSize: 11, color: t.textSub, marginTop: 1 }}>{e.store} · {e.dist}</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 3 }}>
                      <div style={{ fontSize: 10, background: `${catColor}22`, color: catColor, borderRadius: 6, padding: '2px 6px', fontWeight: 700 }}>{e.cat}</div>
                      {e.urgency === 'today' && !done && (
                        <div style={{ fontSize: 10, color: t.warning, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 2 }}>
                          {React.createElement(window.lucide.AlertCircle, { size: 10 })} Today
                        </div>
                      )}
                    </div>
                  </div>
                  {isCurrent && (
                    <div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
                      <button onClick={() => handleCompleteStop(routeIdx)} style={{ flex: 1, background: t.primary, border: 'none', borderRadius: 8, padding: '6px', fontSize: 12, fontWeight: 700, color: '#fff', cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
                        {React.createElement(window.lucide.CheckCircle, { size: 13 })} Done
                      </button>
                      <button style={{ flex: 1, background: t.surface3, border: 'none', borderRadius: 8, padding: '6px', fontSize: 12, fontWeight: 600, color: t.textSub, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
                        {React.createElement(window.lucide.Navigation, { size: 13 })} Navigate
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Start Route button */}
        {!activeRoute && completedStops.length === 0 && (
          <div style={{ padding: '16px' }}>
            <button onClick={() => { setActiveRoute(true); setCurrentStop(0); showNotif('Route started! First stop: USPS Post Office'); }} style={{ width: '100%', background: `linear-gradient(135deg, ${t.primary}, ${t.primaryDark})`, border: 'none', borderRadius: 14, padding: '15px', fontSize: 16, fontWeight: 800, color: '#fff', cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: `0 8px 24px ${t.primary}50`, letterSpacing: -0.3 }}>
              {React.createElement(window.lucide.Play, { size: 18 })} Start Smart Route
            </button>
          </div>
        )}
        {activeRoute && (
          <div style={{ padding: '16px', display: 'flex', gap: 10 }}>
            <button onClick={() => { setActiveRoute(false); setCurrentStop(0); setCompletedStops([]); }} style={{ flex: 1, background: t.surface3, border: `1px solid ${t.border}`, borderRadius: 14, padding: '12px', fontSize: 14, fontWeight: 700, color: t.textSub, cursor: 'pointer', fontFamily: 'inherit' }}>
              End Route
            </button>
            <button onClick={handleRecalculate} style={{ flex: 2, background: `linear-gradient(135deg, ${t.primary}, ${t.primaryDark})`, border: 'none', borderRadius: 14, padding: '12px', fontSize: 14, fontWeight: 700, color: '#fff', cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
              {routeRecalculating ? React.createElement(window.lucide.RefreshCw, { size: 15 }) : React.createElement(window.lucide.Zap, { size: 15 })}
              {routeRecalculating ? 'Recalculating...' : 'Recalculate'}
            </button>
          </div>
        )}
        <div style={{ height: 20 }} />
      </div>
    );
  };

  // ROUTE SCREEN
  const RouteScreen = () => {
    const mapDots = [
      { x: 80, y: 280, idx: 3, label: 'USPS' },
      { x: 160, y: 220, idx: 0, label: 'Cleaners' },
      { x: 215, y: 260, idx: 1, label: 'Target' },
      { x: 270, y: 200, idx: 2, label: 'Walgreens' },
      { x: 200, y: 310, idx: 4, label: 'Library' },
      { x: 140, y: 350, idx: 5, label: 'Trader Joe\'s' },
      { x: 290, y: 140, idx: 6, label: 'Noodle Bar' },
    ];
    const connections = [
      [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6]
    ];
    const routeCoords = mapDots.sort((a, b) => {
      const ai = optimizedRoute.indexOf(a.idx);
      const bi = optimizedRoute.indexOf(b.idx);
      return ai - bi;
    });

    return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Map area */}
        <div style={{ flex: 1, background: t.mapBg, position: 'relative', overflow: 'hidden' }}>
          {/* Grid lines */}
          {[0,1,2,3,4].map(i => (
            <div key={`h${i}`} style={{ position: 'absolute', left: 0, right: 0, top: `${i * 25}%`, height: 1, background: `${t.border}60` }} />
          ))}
          {[0,1,2,3,4,5].map(i => (
            <div key={`v${i}`} style={{ position: 'absolute', top: 0, bottom: 0, left: `${i * 20}%`, width: 1, background: `${t.border}60` }} />
          ))}

          {/* Route line SVG */}
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
            {routeCoords.slice(0, -1).map((dot, i) => {
              const next = routeCoords[i + 1];
              const done = completedStops.includes(dot.idx);
              return (
                <line key={i} x1={dot.x} y1={dot.y} x2={next.x} y2={next.y}
                  stroke={done ? t.textMuted : t.primary} strokeWidth={2.5} strokeDasharray={done ? '0' : '6,4'} opacity={0.8} />
              );
            })}
          </svg>

          {/* Map dots */}
          {mapDots.map((dot, i) => {
            const routePos = optimizedRoute.indexOf(dot.idx);
            const done = completedStops.includes(dot.idx);
            const isCurr = activeRoute && routePos === currentStop;
            const e = errandList[dot.idx];
            const catColor = catColors[e.cat] || t.primary;
            return (
              <div key={dot.idx} style={{ position: 'absolute', left: dot.x - 16, top: dot.y - 16, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: done ? t.surface3 : isCurr ? t.primary : t.surface, border: `2.5px solid ${done ? t.border : isCurr ? t.primary : catColor}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, boxShadow: isCurr ? `0 0 20px ${t.primary}80` : '0 2px 8px rgba(0,0,0,0.4)' }}>
                  {done ? '✓' : <span style={{ fontSize: 10, fontWeight: 800, color: isCurr ? '#fff' : catColor }}>{routePos + 1}</span>}
                </div>
                <div style={{ fontSize: 9, fontWeight: 700, color: isCurr ? t.primary : t.textSub, background: t.surface, borderRadius: 6, padding: '2px 5px', marginTop: 2, border: `1px solid ${t.border}`, whiteSpace: 'nowrap' }}>{dot.label}</div>
              </div>
            );
          })}

          {/* Header overlay */}
          <div style={{ position: 'absolute', top: 14, left: 14, right: 14 }}>
            <div style={{ background: theme === 'dark' ? 'rgba(14,21,32,0.92)' : 'rgba(255,255,255,0.92)', borderRadius: 14, padding: '10px 14px', border: `1px solid ${t.border}`, backdropFilter: 'blur(12px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: t.text }}>Live Route</div>
                <div style={{ fontSize: 11, color: t.textSub }}>7 stops · 3.2 mi · ~55 min total</div>
              </div>
              <button onClick={handleRecalculate} style={{ background: `${t.primary}20`, border: `1px solid ${t.primary}50`, borderRadius: 8, padding: '6px 10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
                {React.createElement(window.lucide.RefreshCw, { size: 13, color: t.primary })}
                <span style={{ fontSize: 11, color: t.primary, fontWeight: 700, fontFamily: 'inherit' }}>Refresh</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stop list drawer */}
        <div style={{ background: t.surface, borderTop: `1px solid ${t.border}`, maxHeight: 280, overflowY: 'auto' }}>
          <div style={{ padding: '12px 16px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: t.text }}>Stop Sequence</div>
            <div style={{ fontSize: 11, color: t.textSub }}>{completedStops.length}/{optimizedRoute.length} done</div>
          </div>
          {optimizedRoute.map((eIdx, rIdx) => {
            const e = errandList[eIdx];
            const done = completedStops.includes(eIdx);
            const isCurr = activeRoute && rIdx === currentStop;
            const catColor = catColors[e.cat] || t.primary;
            return (
              <div key={e.id} style={{ display: 'flex', alignItems: 'center', padding: '10px 16px', borderBottom: `1px solid ${t.border}`, opacity: done ? 0.5 : 1, background: isCurr ? `${t.primary}08` : 'transparent' }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: done ? t.surface3 : `${catColor}20`, border: `1.5px solid ${done ? t.border : catColor}`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 10, flexShrink: 0 }}>
                  <span style={{ fontSize: 9, fontWeight: 800, color: done ? t.textMuted : catColor }}>{done ? '✓' : rIdx + 1}</span>
                </div>
                <span style={{ fontSize: 13, fontWeight: 600, color: t.text, flex: 1, textDecoration: done ? 'line-through' : 'none' }}>{e.name}</span>
                <span style={{ fontSize: 11, color: t.textSub }}>{e.dist}</span>
                {isCurr && <div style={{ width: 6, height: 6, borderRadius: '50%', background: t.primary, marginLeft: 8 }} />}
              </div>
            );
          })}
          <div style={{ height: 8 }} />
        </div>
      </div>
    );
  };

  // ERRANDS SCREEN
  const ErrandsScreen = () => {
    const cats = ['All', 'Shopping', 'Services', 'Health', 'Errands', 'Food'];
    const [filterCat, setFilterCat] = useState('All');
    const filtered = filterCat === 'All' ? errandList : errandList.filter(e => e.cat === filterCat);

    return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ background: t.surface, padding: '16px 16px 0', borderBottom: `1px solid ${t.border}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <div>
              <div style={{ fontSize: 20, fontWeight: 800, color: t.text }}>Errands</div>
              <div style={{ fontSize: 12, color: t.textSub }}>{errandList.length} total · {errandList.filter(e => e.urgency === 'today').length} today</div>
            </div>
            <button onClick={() => setShowAddErrand(true)} style={{ width: 38, height: 38, borderRadius: 12, background: t.primary, border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              {React.createElement(window.lucide.Plus, { size: 20, color: '#fff' })}
            </button>
          </div>

          {/* Category filter */}
          <div style={{ display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 14, scrollbarWidth: 'none' }}>
            {cats.map(c => (
              <button key={c} onClick={() => setFilterCat(c)} style={{ flexShrink: 0, background: filterCat === c ? t.primary : t.surface2, border: `1px solid ${filterCat === c ? t.primary : t.border}`, borderRadius: 20, padding: '5px 12px', fontSize: 12, fontWeight: 700, color: filterCat === c ? '#fff' : t.textSub, cursor: 'pointer', fontFamily: 'inherit' }}>
                {c}
              </button>
            ))}
          </div>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '12px 16px' }}>
          {filtered.map(e => {
            const catColor = catColors[e.cat] || t.primary;
            const done = completedStops.includes(errandList.indexOf(e));
            return (
              <div key={e.id} style={{ background: t.surface, borderRadius: 14, padding: '14px', marginBottom: 10, border: `1px solid ${t.border}`, opacity: done ? 0.5 : 1, transform: pressed === `errand-${e.id}` ? 'scale(0.98)' : 'scale(1)', transition: 'transform 0.1s', cursor: 'pointer' }}
                onMouseDown={() => press(`errand-${e.id}`)}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 42, height: 42, borderRadius: 12, background: `${catColor}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>
                      {e.icon}
                    </div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: t.text, textDecoration: done ? 'line-through' : 'none' }}>{e.name}</div>
                      <div style={{ fontSize: 11, color: t.textSub, marginTop: 2 }}>{e.store}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
                    <div style={{ fontSize: 10, background: `${catColor}20`, color: catColor, borderRadius: 6, padding: '2px 8px', fontWeight: 700 }}>{e.cat}</div>
                    <div style={{ fontSize: 10, color: e.urgency === 'today' ? t.warning : t.textSub, fontWeight: 600 }}>{e.urgency === 'tonight' ? '🌙 Tonight' : e.urgency === 'today' ? '⚡ Today' : '📅 Flexible'}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 12, marginTop: 10, paddingTop: 10, borderTop: `1px solid ${t.border}` }}>
                  {[
                    { icon: window.lucide.Navigation2, val: e.dist },
                    { icon: window.lucide.Clock, val: e.time },
                    { icon: window.lucide.Store, val: e.open },
                  ].map((info, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      {React.createElement(info.icon, { size: 11, color: t.textMuted })}
                      <span style={{ fontSize: 11, color: t.textSub }}>{info.val}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
          <div style={{ height: 8 }} />
        </div>

        {/* Add Errand Modal */}
        {showAddErrand && (
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'flex-end', zIndex: 100, backdropFilter: 'blur(4px)' }}>
            <div style={{ width: '100%', background: t.surface, borderRadius: '24px 24px 0 0', padding: '20px 20px 40px', border: `1px solid ${t.border}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <div style={{ fontSize: 18, fontWeight: 800, color: t.text }}>Add Errand</div>
                <button onClick={() => setShowAddErrand(false)} style={{ background: t.surface3, border: 'none', borderRadius: 10, width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                  {React.createElement(window.lucide.X, { size: 16, color: t.textSub })}
                </button>
              </div>
              <div style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: t.textSub, marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.5 }}>Task Name</div>
                <div style={{ background: t.surface2, border: `1px solid ${t.border}`, borderRadius: 12, padding: '11px 14px', fontSize: 14, color: t.text, fontWeight: 500 }}>
                  Return library book
                </div>
              </div>
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: t.textSub, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 }}>Category</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {['Shopping', 'Services', 'Health', 'Errands', 'Food'].map(c => (
                    <button key={c} onClick={() => setAddErrandCat(c)} style={{ background: addErrandCat === c ? t.primary : t.surface2, border: `1px solid ${addErrandCat === c ? t.primary : t.border}`, borderRadius: 20, padding: '6px 14px', fontSize: 12, fontWeight: 700, color: addErrandCat === c ? '#fff' : t.textSub, cursor: 'pointer', fontFamily: 'inherit' }}>
                      {c}
                    </button>
                  ))}
                </div>
              </div>
              <button onClick={() => { setShowAddErrand(false); showNotif('Errand added to your route!'); }} style={{ width: '100%', background: `linear-gradient(135deg, ${t.primary}, ${t.primaryDark})`, border: 'none', borderRadius: 14, padding: '14px', fontSize: 15, fontWeight: 800, color: '#fff', cursor: 'pointer', fontFamily: 'inherit' }}>
                Add to Route
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  // INSIGHTS SCREEN
  const InsightsScreen = () => {
    const weekData = [42, 67, 28, 55, 80, 35, 62];
    const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
    const maxBar = Math.max(...weekData);

    const habits = [
      { label: 'Preferred Stores', val: 'Trader Joe\'s, Walgreens, Target', icon: '🏪' },
      { label: 'Best Errand Window', val: 'Weekdays 11am–2pm', icon: '⏰' },
      { label: 'Traffic Tolerance', val: 'Low – prefer backroads', icon: '🚗' },
      { label: 'Avg Errands/Week', val: '9.4 tasks', icon: '📋' },
    ];

    return (
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 16px 20px' }}>
        <div style={{ fontSize: 20, fontWeight: 800, color: t.text, marginBottom: 4 }}>Your Insights</div>
        <div style={{ fontSize: 12, color: t.textSub, marginBottom: 20 }}>How Errand Echo is learning your patterns</div>

        {/* Summary cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
          {[
            { label: 'Time Saved', val: '4.2 hrs', sub: 'this month', icon: window.lucide.Clock, color: t.primary },
            { label: 'Trips Reduced', val: '11', sub: 'batched runs', icon: window.lucide.Navigation2, color: t.accent },
            { label: 'Fuel Saved', val: '$18.40', sub: 'est. savings', icon: window.lucide.Fuel, color: t.warning },
            { label: 'Tasks Done', val: '67', sub: '92% on-time', icon: window.lucide.CheckCircle, color: t.success },
          ].map((c, i) => (
            <div key={i} style={{ background: t.surface, borderRadius: 14, padding: '14px', border: `1px solid ${t.border}` }}>
              <div style={{ width: 34, height: 34, borderRadius: 10, background: `${c.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
                {React.createElement(c.icon, { size: 16, color: c.color })}
              </div>
              <div style={{ fontSize: 20, fontWeight: 800, color: t.text, letterSpacing: -0.5 }}>{c.val}</div>
              <div style={{ fontSize: 11, color: t.textSub, marginTop: 2 }}>{c.label}</div>
              <div style={{ fontSize: 10, color: t.textMuted }}>{c.sub}</div>
            </div>
          ))}
        </div>

        {/* Weekly activity chart */}
        <div style={{ background: t.surface, borderRadius: 16, padding: '16px', marginBottom: 16, border: `1px solid ${t.border}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: t.text }}>Weekly Activity</div>
            <div style={{ display: 'flex', gap: 0, background: t.surface2, borderRadius: 8, padding: 2 }}>
              {['week', 'month'].map(tb => (
                <button key={tb} onClick={() => setHabitTab(tb)} style={{ background: habitTab === tb ? t.primary : 'transparent', border: 'none', borderRadius: 6, padding: '4px 10px', fontSize: 11, fontWeight: 700, color: habitTab === tb ? '#fff' : t.textSub, cursor: 'pointer', fontFamily: 'inherit', textTransform: 'capitalize' }}>
                  {tb}
                </button>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end', height: 80 }}>
            {weekData.map((v, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <div style={{ width: '100%', height: `${(v / maxBar) * 68}px`, background: i === 4 ? `linear-gradient(to top, ${t.primary}, ${t.primaryLight})` : t.surface3, borderRadius: 6, border: i === 4 ? `1px solid ${t.primary}60` : `1px solid ${t.border}` }} />
                <span style={{ fontSize: 10, color: i === 4 ? t.primary : t.textMuted, fontWeight: 700 }}>{days[i]}</span>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 8, gap: 4 }}>
            {React.createElement(window.lucide.TrendingUp, { size: 12, color: t.primary })}
            <span style={{ fontSize: 11, color: t.primary, fontWeight: 700 }}>+14% vs last week</span>
          </div>
        </div>

        {/* Learned habits */}
        <div style={{ background: t.surface, borderRadius: 16, padding: '16px', marginBottom: 16, border: `1px solid ${t.border}` }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: t.text, marginBottom: 14, display: 'flex', alignItems: 'center', gap: 6 }}>
            {React.createElement(window.lucide.Brain, { size: 15, color: t.purple })}
            Learned About You
          </div>
          {habits.map((h, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: i < habits.length - 1 ? `1px solid ${t.border}` : 'none' }}>
              <div style={{ fontSize: 20 }}>{h.icon}</div>
              <div>
                <div style={{ fontSize: 11, color: t.textSub, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>{h.label}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: t.text, marginTop: 2 }}>{h.val}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Nearby suggestion */}
        <div style={{ background: `linear-gradient(135deg, ${t.accent}15, ${t.primary}10)`, border: `1px solid ${t.accent}40`, borderRadius: 14, padding: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            {React.createElement(window.lucide.MapPin, { size: 16, color: t.accent })}
            <div style={{ fontSize: 13, fontWeight: 700, color: t.text }}>Nearby Right Now</div>
          </div>
          <div style={{ fontSize: 12, color: t.textSub, lineHeight: 1.5 }}>You\'re 0.3 miles from the Post Office and your library book is 2 days overdue. Add both to tomorrow\'s route?</div>
          <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
            <button onClick={() => showNotif('Added to tomorrow\'s route!')} style={{ flex: 1, background: t.accent, border: 'none', borderRadius: 10, padding: '8px', fontSize: 12, fontWeight: 700, color: '#fff', cursor: 'pointer', fontFamily: 'inherit' }}>Add to Route</button>
            <button style={{ flex: 1, background: t.surface3, border: `1px solid ${t.border}`, borderRadius: 10, padding: '8px', fontSize: 12, fontWeight: 600, color: t.textSub, cursor: 'pointer', fontFamily: 'inherit' }}>Dismiss</button>
          </div>
        </div>
        <div style={{ height: 8 }} />
      </div>
    );
  };

  // SETTINGS SCREEN
  const SettingsScreen = () => {
    const sections = [
      {
        title: 'Preferences',
        items: [
          { label: 'Theme', sub: theme === 'dark' ? 'Dark mode' : 'Light mode', icon: theme === 'dark' ? window.lucide.Moon : window.lucide.Sun, action: () => setTheme(theme === 'dark' ? 'light' : 'dark'), toggle: true, val: theme === 'dark' },
          { label: 'Smart Suggestions', sub: 'Context-aware add-ons', icon: window.lucide.Lightbulb, toggle: true, val: true },
          { label: 'Live Recalculation', sub: 'Auto-adjust when plans change', icon: window.lucide.RefreshCw, toggle: true, val: true },
        ],
      },
      {
        title: 'Sync',
        items: [
          { label: 'Calendar', sub: 'Google Calendar connected', icon: window.lucide.Calendar, badge: '●', badgeColor: t.success },
          { label: 'Reminders', sub: 'Apple Reminders synced', icon: window.lucide.Bell, badge: '●', badgeColor: t.success },
          { label: 'Maps', sub: 'Apple Maps & Google Maps', icon: window.lucide.Map, badge: '●', badgeColor: t.success },
        ],
      },
      {
        title: 'Learning',
        items: [
          { label: 'Traffic Tolerance', sub: 'Low – prefer backroads', icon: window.lucide.AlertTriangle },
          { label: 'Favorite Stores', sub: '6 stores saved', icon: window.lucide.Store },
          { label: 'Errand Windows', sub: 'Weekdays 11am–2pm', icon: window.lucide.Clock },
        ],
      },
    ];

    const [toggles, setToggles] = useState({ 0: true, 1: true, 2: true });

    return (
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 16px 24px' }}>
        {/* Profile header */}
        <div style={{ background: t.surface, borderRadius: 16, padding: '18px', marginBottom: 16, border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 56, height: 56, borderRadius: 18, background: `linear-gradient(135deg, ${t.primary}, ${t.accent})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>
            👤
          </div>
          <div>
            <div style={{ fontSize: 17, fontWeight: 800, color: t.text }}>Alex Rivera</div>
            <div style={{ fontSize: 12, color: t.textSub, marginTop: 2 }}>alex@email.com</div>
            <div style={{ fontSize: 11, color: t.primary, fontWeight: 600, marginTop: 4 }}>Pro · 23 day streak 🔥</div>
          </div>
        </div>

        {/* Theme toggle highlight */}
        <div style={{ background: `linear-gradient(135deg, ${t.primary}20, ${t.accent}10)`, border: `1px solid ${t.primary}40`, borderRadius: 14, padding: '14px 16px', marginBottom: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {React.createElement(theme === 'dark' ? window.lucide.Moon : window.lucide.Sun, { size: 20, color: t.primary })}
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: t.text }}>{theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</div>
              <div style={{ fontSize: 11, color: t.textSub }}>Switch appearance</div>
            </div>
          </div>
          <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} style={{ width: 50, height: 28, borderRadius: 20, background: theme === 'dark' ? t.primary : t.surface3, border: `1px solid ${t.border}`, cursor: 'pointer', position: 'relative', transition: 'background 0.2s' }}>
            <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#fff', position: 'absolute', top: 2, left: theme === 'dark' ? 26 : 2, transition: 'left 0.2s', boxShadow: '0 2px 4px rgba(0,0,0,0.3)' }} />
          </button>
        </div>

        {sections.map((section, si) => (
          <div key={si} style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: t.textMuted, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>{section.title}</div>
            <div style={{ background: t.surface, borderRadius: 14, overflow: 'hidden', border: `1px solid ${t.border}` }}>
              {section.items.map((item, ii) => (
                <div key={ii} style={{ display: 'flex', alignItems: 'center', padding: '13px 16px', borderBottom: ii < section.items.length - 1 ? `1px solid ${t.border}` : 'none', cursor: 'pointer', gap: 12 }}
                  onClick={item.action}>
                  <div style={{ width: 34, height: 34, borderRadius: 10, background: t.surface2, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {React.createElement(item.icon, { size: 16, color: t.primary })}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: t.text }}>{item.label}</div>
                    <div style={{ fontSize: 11, color: t.textSub, marginTop: 1 }}>{item.sub}</div>
                  </div>
                  {item.toggle !== undefined ? (
                    <div onClick={(e) => { e.stopPropagation(); if (item.action) item.action(); }} style={{ width: 44, height: 26, borderRadius: 16, background: (item.label === 'Theme' ? theme === 'dark' : (toggles[ii] ?? item.val)) ? t.primary : t.surface3, border: `1px solid ${t.border}`, cursor: 'pointer', position: 'relative', transition: 'background 0.2s', flexShrink: 0 }}>
                      <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#fff', position: 'absolute', top: 2, left: (item.label === 'Theme' ? theme === 'dark' : (toggles[ii] ?? item.val)) ? 22 : 2, transition: 'left 0.2s' }} />
                    </div>
                  ) : item.badge ? (
                    <span style={{ fontSize: 14, color: item.badgeColor }}>●</span>
                  ) : (
                    React.createElement(window.lucide.ChevronRight, { size: 16, color: t.textMuted })
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        <div style={{ background: t.surface, borderRadius: 14, overflow: 'hidden', border: `1px solid ${t.border}`, marginBottom: 16 }}>
          {[
            { label: 'Privacy & Data', icon: window.lucide.Shield },
            { label: 'Notifications', icon: window.lucide.Bell },
            { label: 'Rate Errand Echo', icon: window.lucide.Star },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', padding: '13px 16px', borderBottom: i < 2 ? `1px solid ${t.border}` : 'none', cursor: 'pointer', gap: 12 }}>
              <div style={{ width: 34, height: 34, borderRadius: 10, background: t.surface2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {React.createElement(item.icon, { size: 16, color: t.textSub })}
              </div>
              <div style={{ flex: 1, fontSize: 14, fontWeight: 600, color: t.text }}>{item.label}</div>
              {React.createElement(window.lucide.ChevronRight, { size: 16, color: t.textMuted })}
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', fontSize: 11, color: t.textMuted }}>Errand Echo v2.1.0 · Made with 🗺️</div>
        <div style={{ height: 8 }} />
      </div>
    );
  };

  const renderScreen = () => {
    switch (activeTab) {
      case 'today': return <TodayScreen />;
      case 'route': return <RouteScreen />;
      case 'errands': return <ErrandsScreen />;
      case 'insights': return <InsightsScreen />;
      case 'settings': return <SettingsScreen />;
      default: return <TodayScreen />;
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { display: none; }
        button { -webkit-tap-highlight-color: transparent; }
      `}</style>
      <div style={{ minHeight: '100vh', background: '#0A0A14', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
        <div style={phoneStyle}>
          <StatusBar />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>
            {renderScreen()}
          </div>
          <BottomNav />

          {/* Toast notification */}
          <div style={{ position: 'absolute', top: 70, left: 16, right: 16, background: theme === 'dark' ? 'rgba(14,21,32,0.96)' : 'rgba(255,255,255,0.96)', borderRadius: 14, padding: '12px 16px', border: `1px solid ${t.primary}50`, boxShadow: `0 8px 32px rgba(0,0,0,0.4)`, backdropFilter: 'blur(16px)', display: 'flex', alignItems: 'center', gap: 10, zIndex: 200, transform: notifVisible ? 'translateY(0)' : 'translateY(-80px)', opacity: notifVisible ? 1 : 0, transition: 'all 0.35s cubic-bezier(0.34,1.56,0.64,1)' }}>
            {React.createElement(window.lucide.Zap, { size: 16, color: t.primary })}
            <span style={{ fontSize: 13, fontWeight: 600, color: t.text }}>{notifMsg}</span>
          </div>
        </div>
      </div>
    </>
  );
}
