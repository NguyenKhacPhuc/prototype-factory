const { useState, useEffect } = React;

const themes = {
  dark: {
    bg: '#08090F',
    surface: '#111420',
    card: '#181D2E',
    cardBorder: '#242B40',
    accent: '#FF5533',
    accentSoft: 'rgba(255,85,51,0.12)',
    secondary: '#00D4AA',
    secondarySoft: 'rgba(0,212,170,0.12)',
    warning: '#FFB020',
    warningSoft: 'rgba(255,176,32,0.12)',
    success: '#34D399',
    text: '#EEF2FF',
    textSub: '#8B9AB8',
    textMuted: '#4A5568',
    nav: '#0D1121',
    navBorder: '#1E2640',
    divider: '#1E2640',
    pill: '#1E2640',
  },
  light: {
    bg: '#EEF2FF',
    surface: '#FFFFFF',
    card: '#FFFFFF',
    cardBorder: '#DDE3F0',
    accent: '#E8401F',
    accentSoft: 'rgba(232,64,31,0.08)',
    secondary: '#009E80',
    secondarySoft: 'rgba(0,158,128,0.08)',
    warning: '#C47C00',
    warningSoft: 'rgba(196,124,0,0.08)',
    success: '#059669',
    text: '#0F172A',
    textSub: '#475569',
    textMuted: '#94A3B8',
    nav: '#FFFFFF',
    navBorder: '#DDE3F0',
    divider: '#EEF2FF',
    pill: '#EEF2FF',
  },
};

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isDark, setIsDark] = useState(true);
  const [time, setTime] = useState('9:41');
  const [expandedAlert, setExpandedAlert] = useState(null);
  const [activePlanDay, setActivePlanDay] = useState('today');
  const [activeNearbyCat, setActiveNearbyCat] = useState('all');
  const [notifs, setNotifs] = useState(true);
  const [smartRoutes, setSmartRoutes] = useState(true);
  const [autoAlert, setAutoAlert] = useState(false);
  const [pressedId, setPressedId] = useState(null);

  useEffect(() => {
    if (!document.getElementById('gp-font')) {
      const s = document.createElement('style');
      s.id = 'gp-font';
      s.textContent = "@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');";
      document.head.appendChild(s);
    }
  }, []);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(`${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`);
    };
    update();
    const iv = setInterval(update, 30000);
    return () => clearInterval(iv);
  }, []);

  const t = isDark ? themes.dark : themes.light;
  const font = { fontFamily: "'Plus Jakarta Sans', sans-serif" };

  const press = (id) => {
    setPressedId(id);
    setTimeout(() => setPressedId(null), 180);
  };
  const scaled = (id) => ({ transform: pressedId === id ? 'scale(0.95)' : 'scale(1)', transition: 'transform 0.15s ease' });

  const icons = window.lucide || {};
  const { Home, Bell, MapPin, Calendar, Settings, AlertTriangle, Zap, Clock,
    Navigation, Moon, Sun, ChevronRight, ChevronDown, Plane, Train,
    ArrowRight, Search, Battery, Wifi } = icons;

  // ─── DYNAMIC ISLAND ───────────────────────────────────────────────────────
  const DynamicIsland = () => (
    <div style={{ position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)', width: 120, height: 32, background: '#000', borderRadius: 20, zIndex: 100 }} />
  );

  // ─── STATUS BAR ───────────────────────────────────────────────────────────
  const StatusBar = () => (
    <div style={{ height: 44, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 24px 0', ...font }}>
      <span style={{ fontSize: 13, fontWeight: 700, color: t.text }}>{time}</span>
      <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
        {Wifi && <Wifi size={13} color={t.text} />}
        {Battery && <Battery size={13} color={t.text} />}
      </div>
    </div>
  );

  // ─── APP HEADER ───────────────────────────────────────────────────────────
  const AppHeader = () => (
    <div style={{ padding: '10px 20px 4px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ width: 28, height: 28, borderRadius: 8, background: t.accent, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {Zap && <Zap size={14} color="#fff" fill="#fff" />}
        </div>
        <span style={{ fontSize: 17, fontWeight: 800, color: t.text, letterSpacing: '-0.3px' }}>GatePatch</span>
      </div>
      <div onClick={() => { press('theme-toggle'); setIsDark(!isDark); }}
        style={{ width: 34, height: 34, borderRadius: 10, background: t.card, border: `1px solid ${t.cardBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', ...scaled('theme-toggle') }}>
        {isDark ? (Sun && <Sun size={15} color={t.warning} />) : (Moon && <Moon size={15} color={t.accent} />)}
      </div>
    </div>
  );

  // ─── BOTTOM NAV ───────────────────────────────────────────────────────────
  const navItems = [
    { id: 'home', label: 'Home', Icon: Home },
    { id: 'alerts', label: 'Alerts', Icon: Bell, badge: true },
    { id: 'plan', label: 'Plan', Icon: Calendar },
    { id: 'nearby', label: 'Nearby', Icon: MapPin },
    { id: 'settings', label: 'More', Icon: Settings },
  ];

  const BottomNav = () => (
    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 72, background: t.nav, borderTop: `1px solid ${t.navBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'space-around', paddingBottom: 8, ...font }}>
      {navItems.map(({ id, label, Icon, badge }) => {
        const isActive = activeTab === id;
        return (
          <div key={id} onClick={() => { press(`nav-${id}`); setActiveTab(id); }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, padding: '4px 12px', cursor: 'pointer', position: 'relative', ...scaled(`nav-${id}`) }}>
            {badge && <div style={{ position: 'absolute', top: 0, right: 8, width: 8, height: 8, background: t.accent, borderRadius: '50%', border: `2px solid ${t.nav}` }} />}
            {Icon && <Icon size={22} color={isActive ? t.accent : t.textMuted} strokeWidth={isActive ? 2.5 : 1.8} />}
            <span style={{ fontSize: 10, fontWeight: isActive ? 700 : 500, color: isActive ? t.accent : t.textMuted }}>{label}</span>
          </div>
        );
      })}
    </div>
  );

  // ─── HOME SCREEN ──────────────────────────────────────────────────────────
  const renderHome = () => {
    const alerts = [
      { id: 1, Icon: Plane, color: t.accent, soft: t.accentSoft, title: 'Flight UA847 delayed 2h 15m', impact: 'Affects hotel check-in & dinner at 20:00', time: '14:35 → 16:50', tag: 'ACT NOW' },
      { id: 2, Icon: Train, color: t.warning, soft: t.warningSoft, title: 'Tube strike confirmed — Sat 22', impact: 'Affects museum trip & airport transfer', time: 'Tomorrow · All Day', tag: 'PLAN AHEAD' },
      { id: 3, Icon: AlertTriangle, color: t.secondary, soft: t.secondarySoft, title: 'Heavy rain forecast at LHR', impact: 'Outdoor tour at 15:00 may be affected', time: 'Sat 22, 13:00–18:00', tag: 'HEADS UP' },
    ];
    return (
      <div>
        {/* Trip card */}
        <div style={{ margin: '0 20px 16px' }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: t.secondary, letterSpacing: '0.1em', marginBottom: 4 }}>ACTIVE TRIP</div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <span style={{ fontSize: 24, fontWeight: 800, color: t.text }}>JFK → LHR</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, background: t.accentSoft, border: `1px solid ${t.accent}40`, borderRadius: 20, padding: '5px 12px' }}>
              {Zap && <Zap size={12} color={t.accent} fill={t.accent} />}
              <span style={{ fontSize: 11, fontWeight: 800, color: t.accent }}>3 ALERTS</span>
            </div>
          </div>
          <div style={{ background: `linear-gradient(135deg, ${t.accent}18 0%, ${t.secondary}18 100%)`, border: `1px solid ${t.cardBorder}`, borderRadius: 20, padding: 18 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 28, fontWeight: 800, color: t.text }}>JFK</div>
                <div style={{ fontSize: 11, color: t.textSub }}>New York</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: t.textSub, marginTop: 2, textDecoration: 'line-through' }}>14:35</div>
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, padding: '0 10px' }}>
                <span style={{ fontSize: 10, color: t.textMuted, fontWeight: 600 }}>UA847 · 7h 10m</span>
                <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                  <div style={{ flex: 1, height: 1, background: t.cardBorder }} />
                  {Plane && <Plane size={16} color={t.accent} style={{ transform: 'rotate(45deg)' }} />}
                  <div style={{ flex: 1, height: 1, background: t.cardBorder }} />
                </div>
                <div style={{ background: t.accent, borderRadius: 10, padding: '3px 10px' }}>
                  <span style={{ fontSize: 10, fontWeight: 800, color: '#fff' }}>DELAYED +2h15</span>
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 28, fontWeight: 800, color: t.text }}>LHR</div>
                <div style={{ fontSize: 11, color: t.textSub }}>London</div>
                <div style={{ fontSize: 13, fontWeight: 800, color: t.accent, marginTop: 2 }}>16:50</div>
              </div>
            </div>
            <div style={{ background: isDark ? 'rgba(0,0,0,0.25)' : 'rgba(255,255,255,0.6)', borderRadius: 12, padding: '10px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                {Clock && <Clock size={13} color={t.warning} />}
                <span style={{ fontSize: 12, color: t.textSub }}>Boarding in</span>
              </div>
              <div style={{ display: 'flex', gap: 2, alignItems: 'baseline' }}>
                <span style={{ fontSize: 22, fontWeight: 800, color: t.text }}>02</span>
                <span style={{ fontSize: 10, color: t.textMuted, marginRight: 4 }}>HR</span>
                <span style={{ fontSize: 22, fontWeight: 800, color: t.text }}>42</span>
                <span style={{ fontSize: 10, color: t.textMuted }}>MIN</span>
              </div>
              <div style={{ background: `${t.warning}25`, borderRadius: 8, padding: '4px 10px' }}>
                <span style={{ fontSize: 11, fontWeight: 800, color: t.warning }}>Gate C8</span>
              </div>
            </div>
          </div>
        </div>

        {/* Micro-tip */}
        <div style={{ margin: '0 20px 18px' }}>
          <div style={{ background: t.secondarySoft, border: `1px solid ${t.secondary}40`, borderRadius: 14, padding: '12px 14px', display: 'flex', gap: 10 }}>
            {Zap && <Zap size={15} color={t.secondary} style={{ flexShrink: 0, marginTop: 1 }} />}
            <div>
              <div style={{ fontSize: 10, fontWeight: 800, color: t.secondary, marginBottom: 3, letterSpacing: '0.05em' }}>YOU HAVE 42 MINUTES</div>
              <div style={{ fontSize: 12, color: t.text, lineHeight: 1.5 }}>Go to Gate C8 · Fill water at fountain B2 · Grab food from Pret (8-min line estimated)</div>
            </div>
          </div>
        </div>

        {/* Disruptions */}
        <div style={{ padding: '0 20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <span style={{ fontSize: 15, fontWeight: 700, color: t.text }}>Active Disruptions</span>
            <span onClick={() => setActiveTab('alerts')} style={{ fontSize: 12, color: t.accent, fontWeight: 600, cursor: 'pointer' }}>See all</span>
          </div>
          {alerts.map(({ id, Icon, color, soft, title, impact, time: atime, tag }) => (
            <div key={id} onClick={() => press(`home-alert-${id}`)}
              style={{ background: t.card, border: `1px solid ${t.cardBorder}`, borderRadius: 16, marginBottom: 10, overflow: 'hidden', cursor: 'pointer', ...scaled(`home-alert-${id}`) }}>
              <div style={{ borderLeft: `3px solid ${color}`, padding: '12px 14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 5 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 30, height: 30, borderRadius: 8, background: soft, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {Icon && <Icon size={14} color={color} />}
                    </div>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: t.text }}>{title}</div>
                      <div style={{ fontSize: 10, color: t.textSub, marginTop: 1 }}>{atime}</div>
                    </div>
                  </div>
                  <div style={{ background: soft, borderRadius: 6, padding: '2px 7px', flexShrink: 0 }}>
                    <span style={{ fontSize: 9, fontWeight: 800, color: color }}>{tag}</span>
                  </div>
                </div>
                <div style={{ fontSize: 11, color: t.textSub, marginLeft: 38 }}>↳ {impact}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ─── ALERTS SCREEN ────────────────────────────────────────────────────────
  const renderAlerts = () => {
    const disruptions = [
      {
        id: 1, color: t.accent, soft: t.accentSoft, Icon: Plane, tag: 'HIGH IMPACT',
        title: 'Flight UA847 — 2h 15m Delay', sub: 'New departure: 16:50 · Gate C8',
        time: 'Today · Immediate',
        impacts: [{ e: '🏨', text: 'Hotel check-in window reduced by 2h' }, { e: '🍽️', text: 'Dinner reservation at 20:00 is now very tight' }, { e: '💳', text: 'Late check-in fee may apply (£30)' }],
        actions: [{ label: 'Alert Hotel', sub: 'Send automated message', color: t.secondary, primary: true }, { label: 'Rebook Flight', sub: 'Next: UA849 at 18:10', color: t.text, primary: false }, { label: 'Rebuild Day Plan', sub: 'Regenerate micro-itinerary', color: t.warning, primary: false }],
      },
      {
        id: 2, color: t.warning, soft: t.warningSoft, Icon: Train, tag: 'PLAN AHEAD',
        title: 'London Tube Strike — All Lines', sub: 'Saturday 22 March, full day',
        time: 'Tomorrow · All Day',
        impacts: [{ e: '🎨', text: 'British Museum requires alternate route' }, { e: '✈️', text: 'Airport transfer needs rebooking (+45 min)' }, { e: '💷', text: 'Extra cost estimated: £22–£38' }],
        actions: [{ label: 'Find Transit Routes', sub: 'Bus, Uber, Overground options', color: t.secondary, primary: true }, { label: 'Rebook Transfer', sub: 'Update Heathrow Express booking', color: t.text, primary: false }],
      },
      {
        id: 3, color: t.secondary, soft: t.secondarySoft, Icon: AlertTriangle, tag: 'HEADS UP',
        title: 'Heavy Rain — 70% Forecast', sub: 'Saturday afternoon',
        time: 'Sat 22 Mar, 13:00–18:00',
        impacts: [{ e: '🌿', text: 'Hyde Park walk may be uncomfortable' }, { e: '📷', text: 'Outdoor photography tour at 15:00 affected' }],
        actions: [{ label: 'Indoor Alternatives', sub: 'V&A Museum, National Gallery nearby', color: t.secondary, primary: true }, { label: 'Check Tour Policy', sub: 'Free cancellation until 12:00', color: t.text, primary: false }],
      },
    ];
    return (
      <div>
        <div style={{ padding: '0 20px 14px' }}>
          <div style={{ fontSize: 22, fontWeight: 800, color: t.text }}>Disruptions</div>
          <div style={{ fontSize: 13, color: t.textSub, marginTop: 2 }}>Ranked by impact on your schedule</div>
        </div>
        <div style={{ margin: '0 20px 18px', display: 'flex', gap: 8 }}>
          {[{ label: '1 Critical', color: t.accent }, { label: '1 High', color: t.warning }, { label: '1 Low', color: t.secondary }].map(p => (
            <div key={p.label} style={{ flex: 1, background: `${p.color}18`, borderRadius: 10, padding: 8, textAlign: 'center', border: `1px solid ${p.color}30` }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: p.color }}>{p.label}</div>
            </div>
          ))}
        </div>
        {disruptions.map(d => {
          const isExp = expandedAlert === d.id;
          return (
            <div key={d.id} style={{ margin: '0 20px 12px' }}>
              <div style={{ background: t.card, border: `1px solid ${isExp ? d.color + '55' : t.cardBorder}`, borderRadius: 18, overflow: 'hidden', transition: 'border-color 0.2s' }}>
                <div onClick={() => setExpandedAlert(isExp ? null : d.id)}
                  style={{ borderLeft: `3px solid ${d.color}`, padding: 14, cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ display: 'flex', gap: 10, flex: 1 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: d.soft, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      {d.Icon && <d.Icon size={16} color={d.color} />}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: t.text, marginBottom: 2 }}>{d.title}</div>
                      <div style={{ fontSize: 11, color: t.textSub }}>{d.sub}</div>
                      <div style={{ fontSize: 10, color: t.textMuted, marginTop: 2 }}>{d.time}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
                    <div style={{ background: d.soft, borderRadius: 6, padding: '2px 8px' }}>
                      <span style={{ fontSize: 9, fontWeight: 800, color: d.color }}>{d.tag}</span>
                    </div>
                    {ChevronDown && <ChevronDown size={15} color={t.textMuted} style={{ transform: isExp ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />}
                  </div>
                </div>
                {isExp && (
                  <div style={{ padding: '0 14px 14px', borderTop: `1px solid ${t.divider}` }}>
                    <div style={{ marginTop: 12, marginBottom: 12 }}>
                      <div style={{ fontSize: 9, fontWeight: 800, color: t.textMuted, letterSpacing: '0.1em', marginBottom: 8 }}>IMPACT CASCADE</div>
                      {d.impacts.map((imp, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0', borderBottom: i < d.impacts.length - 1 ? `1px solid ${t.divider}` : 'none' }}>
                          <span style={{ fontSize: 15 }}>{imp.e}</span>
                          <span style={{ fontSize: 12, color: t.textSub }}>{imp.text}</span>
                        </div>
                      ))}
                    </div>
                    <div style={{ fontSize: 9, fontWeight: 800, color: t.textMuted, letterSpacing: '0.1em', marginBottom: 8 }}>RECOVERY OPTIONS</div>
                    {d.actions.map((act, i) => (
                      <div key={i} onClick={() => press(`act-${d.id}-${i}`)}
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', background: act.primary ? `${act.color}18` : t.surface, border: `1px solid ${act.primary ? act.color + '40' : t.cardBorder}`, borderRadius: 12, marginBottom: 8, cursor: 'pointer', ...scaled(`act-${d.id}-${i}`) }}>
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 600, color: act.primary ? act.color : t.text }}>{act.label}</div>
                          <div style={{ fontSize: 11, color: t.textMuted, marginTop: 1 }}>{act.sub}</div>
                        </div>
                        {ArrowRight && <ArrowRight size={14} color={act.primary ? act.color : t.textMuted} />}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  // ─── PLAN SCREEN ──────────────────────────────────────────────────────────
  const renderPlan = () => {
    const todayPlan = [
      { time: '09:15', dur: '30m', done: true, title: 'Hotel checkout', sub: 'Luggage stored at front desk', type: 'done' },
      { time: '09:45', dur: '45m', done: true, title: 'Breakfast at Dishoom', sub: '22 Carnaby St · Confirmed reservation', type: 'done' },
      { time: '10:30', dur: '2h', done: true, title: 'British Museum', sub: '⚠️ Tube strike: take Bus 24 instead', type: 'warning', color: t.warning },
      { time: '12:30', dur: '1h', done: false, title: 'Lunch near museum', sub: 'Suggested: Abeno — 10 min walk', type: 'active', color: t.accent },
      { time: '13:30', dur: '45m', done: false, title: 'Covent Garden walk', sub: 'Optional · can skip if running late', type: 'normal', color: t.textMuted },
      { time: '14:30', dur: '1h', done: false, title: 'Transfer to JFK 🚗', sub: 'Booked · Uber XL · Pickup: 52nd St', type: 'critical', color: t.accent },
      { time: '16:50', dur: '', done: false, title: 'UA847 Departs ✈️', sub: 'New time · Was 14:35 · Gate C8', type: 'critical', color: t.accent },
    ];
    const tomorrowPlan = [
      { time: '07:05', dur: '', done: false, title: 'Arrive at LHR', sub: 'Terminal 3 · UA847', type: 'normal', color: t.secondary },
      { time: '08:30', dur: '45m', done: false, title: 'Customs & Immigration', sub: 'Electronic passport gate (usually fast)', type: 'normal', color: t.textMuted },
      { time: '09:15', dur: '1h', done: false, title: 'Transfer to Hotel', sub: '⚠️ Tube strike — Book Heathrow Express', type: 'warning', color: t.warning },
      { time: '10:30', dur: 'TBD', done: false, title: 'Hotel Check-in', sub: 'The Hoxton, Shoreditch · Early check-in requested', type: 'normal', color: t.textMuted },
      { time: '12:00', dur: '3h', done: false, title: 'Borough Market & lunch', sub: 'Outdoor market · Check rain forecast', type: 'warning', color: t.warning },
      { time: '15:30', dur: '2h', done: false, title: 'Tate Modern', sub: 'Free entry · Free wifi · Good shelter option', type: 'normal', color: t.textMuted },
    ];
    const plan = activePlanDay === 'today' ? todayPlan : tomorrowPlan;
    return (
      <div>
        <div style={{ padding: '0 20px 14px' }}>
          <div style={{ fontSize: 22, fontWeight: 800, color: t.text }}>Your Plan</div>
          <div style={{ fontSize: 13, color: t.textSub }}>Rebuilt after flight delay</div>
        </div>
        <div style={{ margin: '0 20px 16px', display: 'flex', gap: 8 }}>
          {[{ id: 'today', label: 'Today · Fri 21' }, { id: 'tomorrow', label: 'Sat 22' }].map(d => (
            <div key={d.id} onClick={() => { press(`day-${d.id}`); setActivePlanDay(d.id); }}
              style={{ flex: 1, padding: '8px 14px', borderRadius: 12, textAlign: 'center', background: activePlanDay === d.id ? t.accent : t.card, border: `1px solid ${activePlanDay === d.id ? t.accent : t.cardBorder}`, cursor: 'pointer', ...scaled(`day-${d.id}`) }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: activePlanDay === d.id ? '#fff' : t.textSub }}>{d.label}</span>
            </div>
          ))}
        </div>
        {activePlanDay === 'today' && (
          <div style={{ margin: '0 20px 16px' }}>
            <div style={{ background: `linear-gradient(135deg, ${t.accent}18, ${t.warning}12)`, border: `1px solid ${t.accent}30`, borderRadius: 14, padding: '12px 14px' }}>
              <div style={{ fontSize: 10, fontWeight: 800, color: t.accent, marginBottom: 6, letterSpacing: '0.05em' }}>CURRENT MICRO-PLAN · 42 MIN LEFT</div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {['Gate C8', '💧 Fill water', '🥪 Pret (8 min)'].map(tip => (
                  <div key={tip} style={{ background: isDark ? 'rgba(0,0,0,0.25)' : 'rgba(255,255,255,0.6)', borderRadius: 8, padding: '4px 10px', fontSize: 11, fontWeight: 600, color: t.text }}>{tip}</div>
                ))}
              </div>
            </div>
          </div>
        )}
        <div style={{ padding: '0 20px' }}>
          {plan.map((item, idx) => {
            const itemColor = item.done ? t.textMuted : (item.color || t.textMuted);
            const bg = item.type === 'active' ? t.accentSoft : item.type === 'warning' ? t.warningSoft : item.type === 'critical' ? t.accentSoft : t.card;
            const bdr = item.type === 'active' ? `${t.accent}40` : item.type === 'warning' ? `${t.warning}40` : item.type === 'critical' ? `${t.accent}40` : t.cardBorder;
            return (
              <div key={idx} style={{ display: 'flex', gap: 10, marginBottom: 6 }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', width: 42 }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: item.done ? t.textMuted : t.text, paddingTop: 12 }}>{item.time}</span>
                  {idx < plan.length - 1 && <div style={{ flex: 1, width: 1, background: `${t.cardBorder}`, margin: '4px auto 0', minHeight: 16 }} />}
                </div>
                <div style={{ paddingTop: 8, flexShrink: 0 }}>
                  <div style={{ width: 11, height: 11, borderRadius: '50%', background: item.done ? t.textMuted : itemColor, border: `2px solid ${item.done ? t.divider : itemColor}`, position: 'relative' }}>
                    {item.type === 'active' && <div style={{ position: 'absolute', inset: -3, borderRadius: '50%', border: `2px solid ${t.accent}40` }} />}
                  </div>
                </div>
                <div style={{ flex: 1, background: bg, border: `1px solid ${bdr}`, borderRadius: 14, padding: '10px 12px', marginBottom: 6, opacity: item.done ? 0.55 : 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: item.done ? t.textMuted : t.text, textDecoration: item.done ? 'line-through' : 'none' }}>{item.title}</div>
                      <div style={{ fontSize: 11, color: t.textSub, marginTop: 2 }}>{item.sub}</div>
                    </div>
                    {item.dur && <div style={{ background: isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.06)', borderRadius: 6, padding: '2px 8px', marginLeft: 8, flexShrink: 0 }}>
                      <span style={{ fontSize: 10, fontWeight: 700, color: t.textMuted }}>{item.dur}</span>
                    </div>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // ─── NEARBY SCREEN ────────────────────────────────────────────────────────
  const renderNearby = () => {
    const cats = [{ id: 'all', label: 'All' }, { id: 'storage', label: '🧳 Storage' }, { id: 'work', label: '💻 Work' }, { id: 'food', label: '🥗 Food' }, { id: 'pharmacy', label: '💊 Pharmacy' }];
    const places = [
      { id: 1, cat: 'storage', e: '🧳', name: 'Stasher — Terminal 4', dist: '3 min walk', rating: 4.8, price: '£7/day', tag: 'RECOMMENDED', tagColor: t.secondary, detail: 'Airport luggage storage · Open 24h' },
      { id: 2, cat: 'work', e: '💻', name: 'British Airways Lounge', dist: '5 min walk', rating: 4.6, price: 'Free (Priority)', tag: 'QUIET', tagColor: t.secondary, detail: 'Power outlets · Fast WiFi · Free food' },
      { id: 3, cat: 'food', e: '🥪', name: 'Pret A Manger — Gate B', dist: '2 min walk', rating: 4.2, price: '~£8', tag: '8 MIN LINE', tagColor: t.warning, detail: 'Sandwiches, coffee, snacks · Contactless' },
      { id: 4, cat: 'food', e: '🍜', name: 'Wagamama — Terminal 3', dist: '8 min walk', rating: 4.5, price: '~£18', tag: 'SIT-DOWN', tagColor: t.textMuted, detail: 'Full meals · 20–30 min wait time' },
      { id: 5, cat: 'pharmacy', e: '💊', name: 'Boots Pharmacy', dist: '4 min walk', rating: 4.0, price: 'Varies', tag: 'OPEN', tagColor: t.secondary, detail: 'Travel essentials · Open until 21:00' },
      { id: 6, cat: 'storage', e: '🔒', name: 'Left Luggage — T3 Arrivals', dist: '6 min walk', rating: 4.3, price: '£6/bag', tag: 'OFFICIAL', tagColor: t.textMuted, detail: 'BAA managed · Insurance included' },
      { id: 7, cat: 'work', e: '🛏️', name: 'YoTel Pod — T3', dist: '7 min walk', rating: 4.4, price: '£15/hr', tag: 'PRIVATE', tagColor: t.warning, detail: 'Private cabin · Full bed · Shower available' },
    ];
    const filtered = activeNearbyCat === 'all' ? places : places.filter(p => p.cat === activeNearbyCat);
    return (
      <div>
        <div style={{ padding: '0 20px 14px' }}>
          <div style={{ fontSize: 22, fontWeight: 800, color: t.text }}>Nearby</div>
          <div style={{ fontSize: 13, color: t.textSub }}>Terminal 3 · JFK Airport</div>
        </div>
        <div style={{ margin: '0 20px 14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: t.card, border: `1px solid ${t.cardBorder}`, borderRadius: 12, padding: '10px 14px' }}>
            {Search && <Search size={15} color={t.textMuted} />}
            <span style={{ fontSize: 13, color: t.textMuted }}>Search services...</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', padding: '0 20px 14px', scrollbarWidth: 'none' }}>
          {cats.map(c => (
            <div key={c.id} onClick={() => { press(`cat-${c.id}`); setActiveNearbyCat(c.id); }}
              style={{ padding: '6px 14px', borderRadius: 20, background: activeNearbyCat === c.id ? t.accent : t.card, border: `1px solid ${activeNearbyCat === c.id ? t.accent : t.cardBorder}`, cursor: 'pointer', whiteSpace: 'nowrap', ...scaled(`cat-${c.id}`) }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: activeNearbyCat === c.id ? '#fff' : t.textSub }}>{c.label}</span>
            </div>
          ))}
        </div>
        <div style={{ padding: '0 20px' }}>
          {filtered.map(p => (
            <div key={p.id} onClick={() => press(`place-${p.id}`)}
              style={{ background: t.card, border: `1px solid ${t.cardBorder}`, borderRadius: 16, padding: 14, marginBottom: 10, cursor: 'pointer', ...scaled(`place-${p.id}`) }}>
              <div style={{ display: 'flex', gap: 12 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>{p.e}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 3 }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: t.text }}>{p.name}</span>
                    <div style={{ background: `${p.tagColor}20`, borderRadius: 6, padding: '2px 8px', flexShrink: 0, marginLeft: 6 }}>
                      <span style={{ fontSize: 9, fontWeight: 800, color: p.tagColor }}>{p.tag}</span>
                    </div>
                  </div>
                  <div style={{ fontSize: 11, color: t.textSub, marginBottom: 6 }}>{p.detail}</div>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                      {Navigation && <Navigation size={10} color={t.textMuted} />}
                      <span style={{ fontSize: 11, color: t.textMuted }}>{p.dist}</span>
                    </div>
                    <span style={{ fontSize: 11, color: t.warning }}>★ <span style={{ color: t.textMuted }}>{p.rating}</span></span>
                    <span style={{ fontSize: 11, fontWeight: 700, color: t.secondary }}>{p.price}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ─── SETTINGS SCREEN ──────────────────────────────────────────────────────
  const renderSettings = () => {
    const Toggle = ({ value, onChange }) => (
      <div onClick={() => onChange(!value)} style={{ width: 44, height: 26, borderRadius: 13, background: value ? t.secondary : isDark ? '#2A3550' : '#D0D8E8', position: 'relative', cursor: 'pointer', transition: 'background 0.2s', flexShrink: 0 }}>
        <div style={{ position: 'absolute', top: 3, left: value ? 21 : 3, width: 20, height: 20, borderRadius: '50%', background: '#fff', transition: 'left 0.2s', boxShadow: '0 1px 4px rgba(0,0,0,0.3)' }} />
      </div>
    );
    const Row = ({ label, sub, right, onPress }) => (
      <div onClick={onPress} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '13px 0', borderBottom: `1px solid ${t.divider}`, cursor: onPress ? 'pointer' : 'default' }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 600, color: t.text }}>{label}</div>
          {sub && <div style={{ fontSize: 11, color: t.textMuted, marginTop: 2 }}>{sub}</div>}
        </div>
        {right}
      </div>
    );
    const Section = ({ title, children }) => (
      <div style={{ margin: '0 20px 16px' }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: t.textMuted, letterSpacing: '0.1em', marginBottom: 8 }}>{title}</div>
        <div style={{ background: t.card, border: `1px solid ${t.cardBorder}`, borderRadius: 18, padding: '0 16px' }}>{children}</div>
      </div>
    );
    return (
      <div>
        <div style={{ padding: '0 20px 16px' }}>
          <div style={{ fontSize: 22, fontWeight: 800, color: t.text }}>Settings</div>
        </div>
        <div style={{ margin: '0 20px 20px' }}>
          <div style={{ background: t.card, border: `1px solid ${t.cardBorder}`, borderRadius: 18, padding: 16, display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 52, height: 52, borderRadius: 16, background: `linear-gradient(135deg, ${t.accent}, ${t.secondary})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0 }}>✈️</div>
            <div>
              <div style={{ fontSize: 16, fontWeight: 800, color: t.text }}>Alex Chen</div>
              <div style={{ fontSize: 12, color: t.textSub }}>Premium Traveler · 47 trips</div>
              <div style={{ fontSize: 11, color: t.secondary, marginTop: 2 }}>Style: Business + Efficiency</div>
            </div>
          </div>
        </div>
        <Section title="APPEARANCE">
          <Row label="Theme" sub={`Currently: ${isDark ? 'Dark' : 'Light'} mode`} right={
            <div onClick={() => setIsDark(!isDark)} style={{ display: 'flex', alignItems: 'center', gap: 6, background: isDark ? t.pill : '#EEF2FF', borderRadius: 20, padding: '6px 12px', cursor: 'pointer' }}>
              {isDark ? (Moon && <Moon size={13} color={t.accent} fill={t.accent} />) : (Sun && <Sun size={13} color={t.warning} fill={t.warning} />)}
              <span style={{ fontSize: 12, fontWeight: 700, color: isDark ? t.accent : t.warning }}>{isDark ? 'Dark' : 'Light'}</span>
            </div>
          } />
        </Section>
        <Section title="ALERTS & AUTOMATION">
          <Row label="Push Notifications" sub="Flights, hotels & transit alerts" right={<Toggle value={notifs} onChange={setNotifs} />} />
          <Row label="Smart Rerouting" sub="Auto-suggest alternate paths" right={<Toggle value={smartRoutes} onChange={setSmartRoutes} />} />
          <Row label="Auto-Alert Hotels" sub="Notify hotels of delays automatically" right={<Toggle value={autoAlert} onChange={setAutoAlert} />} />
        </Section>
        <Section title="MY PRIORITIES">
          {[{ label: 'Save Time', pct: 90, color: t.accent }, { label: 'Comfort', pct: 70, color: t.warning }, { label: 'Save Money', pct: 60, color: t.secondary }].map(p => (
            <div key={p.label} style={{ padding: '12px 0', borderBottom: `1px solid ${t.divider}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: t.text }}>{p.label}</span>
                <span style={{ fontSize: 12, fontWeight: 800, color: p.color }}>{p.pct}%</span>
              </div>
              <div style={{ height: 5, background: isDark ? '#1E2640' : '#DDE3F0', borderRadius: 3, overflow: 'hidden' }}>
                <div style={{ width: `${p.pct}%`, height: '100%', background: p.color, borderRadius: 3 }} />
              </div>
            </div>
          ))}
        </Section>
        <Section title="ACCOUNT">
          <Row label="Connected Bookings" sub="3 bookings synced · Last: 2 min ago" right={ChevronRight && <ChevronRight size={16} color={t.textMuted} />} onPress={() => press('bk')} />
          <Row label="Travel History" sub="47 trips · 12 countries" right={ChevronRight && <ChevronRight size={16} color={t.textMuted} />} onPress={() => press('th')} />
          <Row label="GatePatch Premium" sub="Active · Renews March 2027" right={<div style={{ background: t.accentSoft, borderRadius: 8, padding: '3px 10px' }}><span style={{ fontSize: 11, fontWeight: 800, color: t.accent }}>ACTIVE</span></div>} />
        </Section>
      </div>
    );
  };

  // ─── MAIN RENDER ──────────────────────────────────────────────────────────
  const screenMap = { home: renderHome, alerts: renderAlerts, plan: renderPlan, nearby: renderNearby, settings: renderSettings };
  const renderScreen = (screenMap[activeTab] || renderHome)();

  return (
    <div style={{ minHeight: '100vh', background: '#0A0A0A', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, ...font }}>
      <div style={{ width: 375, height: 812, background: t.bg, borderRadius: 52, overflow: 'hidden', position: 'relative', boxShadow: '0 40px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.08), inset 0 1px 0 rgba(255,255,255,0.06)', ...font }}>
        <DynamicIsland />
        <StatusBar />
        <AppHeader />
        <div style={{ position: 'absolute', top: 118, left: 0, right: 0, bottom: 72, overflowY: 'auto', scrollbarWidth: 'none' }}>
          <div style={{ ...font }}>{renderScreen}</div>
        </div>
        <BottomNav />
      </div>
    </div>
  );
}
