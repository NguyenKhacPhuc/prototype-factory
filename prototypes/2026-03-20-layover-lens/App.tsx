function App() {
  const { useState, useEffect, useRef } = React;

  // Load Google Fonts
  const fontStyle = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Syne:wght@700;800&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    ::-webkit-scrollbar { display: none; }
    @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
    @keyframes slideUp { from{transform:translateY(20px);opacity:0} to{transform:translateY(0);opacity:1} }
    @keyframes fadeIn { from{opacity:0} to{opacity:1} }
    @keyframes ping { 0%{transform:scale(1);opacity:1} 75%,100%{transform:scale(1.8);opacity:0} }
    @keyframes shimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
    .anim-slide { animation: slideUp 0.3s ease forwards; }
    .anim-fade { animation: fadeIn 0.3s ease forwards; }
  `;

  const [activeTab, setActiveTab] = useState('home');
  const [stressMode, setStressMode] = useState(false);
  const [luggageType, setLuggageType] = useState('carry-on');
  const [timeLeft, setTimeLeft] = useState(8100); // seconds: 2h15m
  const [planStep, setPlanStep] = useState(0);
  const [pressedBtn, setPressedBtn] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }));
    };
    update();
    const iv = setInterval(update, 1000);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    const iv = setInterval(() => setTimeLeft(t => Math.max(0, t - 1)), 1000);
    return () => clearInterval(iv);
  }, []);

  const fmtTime = (s) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    return h > 0 ? `${h}h ${m}m` : `${m}m`;
  };

  const btnPress = (id) => {
    setPressedBtn(id);
    setTimeout(() => setPressedBtn(null), 150);
  };

  // Color system
  const c = {
    bg: '#080D1A',
    surface: '#0F1629',
    card: '#141C35',
    cardAlt: '#1A2340',
    border: '#1E2D50',
    primary: '#3B82F6',
    primaryDim: '#1D4ED8',
    accent: '#F59E0B',
    accentDim: '#D97706',
    green: '#10B981',
    red: '#EF4444',
    purple: '#8B5CF6',
    teal: '#14B8A6',
    text: '#F1F5F9',
    textMid: '#94A3B8',
    textDim: '#475569',
    glass: 'rgba(255,255,255,0.05)',
  };

  const plan = stressMode ? [
    { time: '14:20', dur: '15m', title: 'Coffee & Rest', sub: 'The Coffee Bean, T3 Departure', icon: 'Coffee', tag: 'Chill', color: c.teal, dist: '3 min walk' },
    { time: '14:35', dur: '45m', title: 'Butterfly Garden', sub: 'Changi Jewel, B2', icon: 'Leaf', tag: 'Calm', color: c.green, dist: '8 min walk' },
    { time: '15:20', dur: '20m', title: 'Return to Gate', sub: 'Gate C31 via Skytrain', icon: 'Navigation', tag: 'Buffer', color: c.primary, dist: '12 min' },
  ] : [
    { time: '14:20', dur: '20m', title: 'Lau Pa Sat Hawker', sub: '18 Raffles Quay — #01-12', icon: 'UtensilsCrossed', tag: 'Food', color: c.accent, dist: '6 min MRT' },
    { time: '14:40', dur: '35m', title: 'Marina Bay Skyline', sub: 'The Float @ Marina Bay', icon: 'Eye', tag: 'View', color: c.purple, dist: '4 min walk' },
    { time: '15:15', dur: '15m', title: 'Raffles MRT → Changi', sub: 'EW Line Direct — 29 min', icon: 'Train', tag: 'Transit', color: c.primary, dist: '' },
    { time: '15:45', dur: '30m', title: 'Security Buffer', sub: 'T3 Check-in Hall B', icon: 'Shield', tag: 'Buffer', color: c.green, dist: '' },
  ];

  const nearbyPlaces = [
    { name: 'Jewel Rain Vortex', cat: 'Attraction', time: '12 min', rating: '4.9', open: true, img: '🌊', tags: ['Free', 'Indoor'], price: 'Free' },
    { name: 'Wak Wak Café', cat: 'Food & Drink', time: '4 min', rating: '4.6', open: true, img: '☕', tags: ['No luggage issue', 'Wifi'], price: '$' },
    { name: 'Terminal 4 Rooftop', cat: 'View', time: '18 min', rating: '4.7', open: true, img: '🌆', tags: ['Scenic', 'Free'], price: 'Free' },
    { name: 'Peranakan Museum', cat: 'Culture', time: '35 min', rating: '4.5', open: false, img: '🏛️', tags: ['Opens 10am'], price: '$$' },
    { name: 'Changi Beach Park', cat: 'Outdoor', time: '22 min', rating: '4.4', open: true, img: '🏖️', tags: ['Carry-on ok'], price: 'Free' },
    { name: 'Food Republic T2', cat: 'Food & Drink', time: '8 min', rating: '4.3', open: true, img: '🍜', tags: ['Fast', 'Cheap'], price: '$' },
  ];

  const s = {
    phone: { width: 375, height: 812, background: c.bg, borderRadius: 44, overflow: 'hidden', position: 'relative', fontFamily: "'Inter', sans-serif", color: c.text, display: 'flex', flexDirection: 'column', flexShrink: 0, boxShadow: '0 40px 100px rgba(0,0,0,0.8), inset 0 0 0 1px rgba(255,255,255,0.1)' },
    outerWrap: { minHeight: '100vh', background: 'radial-gradient(ellipse at 30% 20%, #0D1B3E 0%, #030610 60%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 },
    statusBar: { height: 54, display: 'flex', alignItems: 'flex-end', paddingBottom: 8, paddingLeft: 28, paddingRight: 20, justifyContent: 'space-between', flexShrink: 0 },
    dynamicIsland: { position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)', width: 120, height: 34, background: '#000', borderRadius: 20, zIndex: 100 },
    content: { flex: 1, overflowY: 'auto', overflowX: 'hidden' },
    bottomNav: { height: 80, background: c.surface, borderTop: `1px solid ${c.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-around', paddingBottom: 16, flexShrink: 0 },
    navItem: (active) => ({ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, cursor: 'pointer', opacity: active ? 1 : 0.4, transition: 'all 0.2s', transform: active ? 'scale(1.05)' : 'scale(1)' }),
    navDot: (active) => ({ width: 4, height: 4, borderRadius: 2, background: c.primary, opacity: active ? 1 : 0, marginTop: 1, transition: 'opacity 0.2s' }),
    card: (extra) => ({ background: c.card, borderRadius: 16, border: `1px solid ${c.border}`, ...extra }),
    pill: (color) => ({ background: color + '20', color: color, borderRadius: 20, padding: '3px 10px', fontSize: 11, fontWeight: 600, letterSpacing: 0.3 }),
    btn: (id, bg, extra) => ({ background: bg, borderRadius: 14, padding: '14px 20px', cursor: 'pointer', transition: 'all 0.15s', transform: pressedBtn === id ? 'scale(0.96)' : 'scale(1)', opacity: pressedBtn === id ? 0.85 : 1, ...extra }),
  };

  const Icon = ({ name, size = 18, color = c.text, strokeWidth = 1.8 }) => {
    const LucideIcon = window.lucide?.[name];
    if (!LucideIcon) return null;
    return React.createElement(LucideIcon, { size, color, strokeWidth });
  };

  // ── SCREENS ──────────────────────────────────────────────

  const HomeScreen = () => (
    <div style={{ padding: '16px 16px 0', animation: 'slideUp 0.3s ease' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 12, color: c.textMid, fontWeight: 500, letterSpacing: 1, textTransform: 'uppercase' }}>Active Layover</div>
          <div style={{ fontSize: 22, fontWeight: 800, fontFamily: "'Syne', sans-serif", letterSpacing: -0.5 }}>Singapore SIN</div>
        </div>
        <div style={{ width: 40, height: 40, borderRadius: 20, background: c.glass, border: `1px solid ${c.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <Icon name="Bell" size={18} color={c.accent} />
        </div>
      </div>

      {/* Time Card */}
      <div style={{ background: `linear-gradient(135deg, ${c.primaryDim} 0%, #0F2A6B 100%)`, borderRadius: 24, padding: 20, marginBottom: 16, position: 'relative', overflow: 'hidden', border: `1px solid ${c.primary}40` }}>
        <div style={{ position: 'absolute', top: -30, right: -30, width: 120, height: 120, background: c.primary + '15', borderRadius: 60 }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontSize: 11, color: c.primary + 'CC', fontWeight: 600, letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 6 }}>Time Remaining</div>
            <div style={{ fontSize: 48, fontWeight: 800, fontFamily: "'Syne', sans-serif", lineHeight: 1, letterSpacing: -2 }}>{fmtTime(timeLeft)}</div>
            <div style={{ fontSize: 12, color: c.textMid, marginTop: 6 }}>Gate closes at 16:15 • T3 Gate C31</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ background: c.green + '20', border: `1px solid ${c.green}40`, borderRadius: 10, padding: '6px 10px', marginBottom: 8 }}>
              <div style={{ fontSize: 10, color: c.green, fontWeight: 600 }}>FLIGHT OK</div>
              <div style={{ fontSize: 12, fontWeight: 700 }}>SQ 321</div>
            </div>
            <div style={{ fontSize: 10, color: c.textDim }}>→ NRT 18:40</div>
          </div>
        </div>
        {/* Progress bar */}
        <div style={{ marginTop: 16, background: 'rgba(255,255,255,0.1)', borderRadius: 4, height: 4 }}>
          <div style={{ background: c.primary, borderRadius: 4, height: 4, width: `${Math.min(100, (8100 - timeLeft) / 81)}%`, transition: 'width 1s linear' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
          <div style={{ fontSize: 10, color: c.textDim }}>Landed 13:55</div>
          <div style={{ fontSize: 10, color: c.textDim }}>Departs 16:40</div>
        </div>
      </div>

      {/* Status Row */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        {[
          { icon: 'Luggage', label: luggageType === 'carry-on' ? 'Carry-on' : 'Checked bag', color: c.teal },
          { icon: 'Globe', label: 'Visa Free', color: c.green },
          { icon: 'CloudSun', label: '29°C Clear', color: c.accent },
        ].map((item, i) => (
          <div key={i} style={{ flex: 1, background: c.card, borderRadius: 12, padding: '10px 8px', border: `1px solid ${c.border}`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <Icon name={item.icon} size={16} color={item.color} />
            <div style={{ fontSize: 10, color: c.textMid, fontWeight: 500, textAlign: 'center' }}>{item.label}</div>
          </div>
        ))}
      </div>

      {/* Stress Mode Toggle */}
      <div style={{ background: stressMode ? '#1A0A30' : c.card, border: `1px solid ${stressMode ? c.purple + '60' : c.border}`, borderRadius: 16, padding: 14, marginBottom: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', transition: 'all 0.3s' }} onClick={() => setStressMode(!stressMode)}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: 18, background: stressMode ? c.purple + '30' : c.glass, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="Wind" size={18} color={stressMode ? c.purple : c.textMid} />
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: stressMode ? c.purple : c.text }}>Stress Mode</div>
            <div style={{ fontSize: 11, color: c.textDim }}>{stressMode ? 'Simple, low-decision routing' : 'Full experience mode'}</div>
          </div>
        </div>
        <div style={{ width: 44, height: 26, background: stressMode ? c.purple : c.border, borderRadius: 13, padding: 3, transition: 'background 0.3s', position: 'relative' }}>
          <div style={{ width: 20, height: 20, background: '#fff', borderRadius: 10, transition: 'transform 0.3s', transform: stressMode ? 'translateX(18px)' : 'translateX(0)' }} />
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{ marginBottom: 8 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: c.textMid, letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 10 }}>Quick Plan</div>
        <div style={{ display: 'flex', gap: 8 }}>
          <div style={s.btn('q1', `linear-gradient(135deg, ${c.primary}, ${c.primaryDim})`, { flex: 1, borderRadius: 14, padding: 14, cursor: 'pointer', textAlign: 'center' })} onClick={() => { btnPress('q1'); setActiveTab('plan'); }}>
            <Icon name="Map" size={20} color="#fff" />
            <div style={{ fontSize: 13, fontWeight: 600, marginTop: 6 }}>View Plan</div>
          </div>
          <div style={s.btn('q2', c.card, { flex: 1, borderRadius: 14, padding: 14, cursor: 'pointer', textAlign: 'center', border: `1px solid ${c.border}` })} onClick={() => { btnPress('q2'); setActiveTab('explore'); }}>
            <Icon name="Compass" size={20} color={c.accent} />
            <div style={{ fontSize: 13, fontWeight: 600, marginTop: 6, color: c.accent }}>Explore</div>
          </div>
          <div style={s.btn('q3', c.card, { flex: 1, borderRadius: 14, padding: 14, cursor: 'pointer', textAlign: 'center', border: `1px solid ${c.border}` })} onClick={() => { btnPress('q3'); setShowAlert(true); setTimeout(() => setShowAlert(false), 3000); }}>
            <Icon name="Zap" size={20} color={c.teal} />
            <div style={{ fontSize: 13, fontWeight: 600, marginTop: 6, color: c.teal }}>Re-plan</div>
          </div>
        </div>
      </div>

      {/* Alert */}
      {showAlert && (
        <div style={{ background: c.teal + '20', border: `1px solid ${c.teal}40`, borderRadius: 12, padding: 12, marginTop: 12, animation: 'slideUp 0.3s ease', display: 'flex', alignItems: 'center', gap: 8 }}>
          <Icon name="RefreshCw" size={16} color={c.teal} />
          <div style={{ fontSize: 12, color: c.teal, fontWeight: 500 }}>Rebuilding plan with live traffic data...</div>
        </div>
      )}

      {/* Condition Banner */}
      <div style={{ marginTop: 14, background: c.accent + '15', border: `1px solid ${c.accent}30`, borderRadius: 12, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
        <div style={{ position: 'relative' }}>
          <div style={{ width: 8, height: 8, borderRadius: 4, background: c.accent }} />
          <div style={{ position: 'absolute', top: 0, left: 0, width: 8, height: 8, borderRadius: 4, background: c.accent, animation: 'ping 1.5s ease infinite' }} />
        </div>
        <div style={{ fontSize: 12, color: c.accent, fontWeight: 500 }}>Security wait: 8 min • MRT running normally</div>
      </div>
    </div>
  );

  const PlanScreen = () => (
    <div style={{ padding: '16px 16px 0', animation: 'slideUp 0.3s ease' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
        <div>
          <div style={{ fontSize: 12, color: c.textMid, fontWeight: 500, letterSpacing: 1, textTransform: 'uppercase' }}>{stressMode ? 'Stress Mode' : 'Full Experience'}</div>
          <div style={{ fontSize: 22, fontWeight: 800, fontFamily: "'Syne', sans-serif", letterSpacing: -0.5 }}>Your Plan</div>
        </div>
        <div style={{ ...s.pill(stressMode ? c.purple : c.primary), fontSize: 12 }}>{fmtTime(timeLeft)} left</div>
      </div>

      <div style={{ fontSize: 12, color: c.textDim, marginBottom: 20 }}>Departs Gate C31 at 16:15 • {plan.length} stops</div>

      {/* Timeline */}
      <div style={{ position: 'relative' }}>
        {plan.map((step, i) => {
          const done = i < planStep;
          const active = i === planStep;
          return (
            <div key={i} style={{ display: 'flex', gap: 12, marginBottom: i < plan.length - 1 ? 0 : 0 }}>
              {/* Timeline line */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                <div onClick={() => setPlanStep(i)} style={{ width: 36, height: 36, borderRadius: 18, background: done ? c.green + '20' : active ? step.color + '30' : c.card, border: `2px solid ${done ? c.green : active ? step.color : c.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s', flexShrink: 0 }}>
                  {done ? <Icon name="Check" size={16} color={c.green} strokeWidth={2.5} /> : <Icon name={step.icon} size={16} color={active ? step.color : c.textDim} />}
                </div>
                {i < plan.length - 1 && <div style={{ width: 2, height: 40, background: done ? c.green + '40' : c.border, margin: '4px 0', borderRadius: 1 }} />}
              </div>
              {/* Step card */}
              <div style={{ flex: 1, marginBottom: 12, background: active ? step.color + '10' : c.card, border: `1px solid ${active ? step.color + '40' : c.border}`, borderRadius: 14, padding: 14, transition: 'all 0.2s', cursor: 'pointer', opacity: done ? 0.6 : 1 }} onClick={() => setPlanStep(i)}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: done ? c.textDim : c.text }}>{step.title}</div>
                      {active && <div style={{ fontSize: 9, fontWeight: 700, background: step.color, color: '#000', borderRadius: 6, padding: '2px 6px', letterSpacing: 0.5 }}>NOW</div>}
                    </div>
                    <div style={{ fontSize: 11, color: c.textMid }}>{step.sub}</div>
                    {step.dist && <div style={{ fontSize: 11, color: c.textDim, marginTop: 4 }}>📍 {step.dist}</div>}
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: 8 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: active ? step.color : c.textMid }}>{step.time}</div>
                    <div style={{ fontSize: 11, color: c.textDim }}>{step.dur}</div>
                    <div style={{ ...s.pill(step.color), marginTop: 4, display: 'inline-block' }}>{step.tag}</div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Departure warning */}
      <div style={{ background: c.red + '10', border: `1px solid ${c.red}30`, borderRadius: 14, padding: 14, marginTop: 4, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
        <Icon name="AlertTriangle" size={18} color={c.red} />
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: c.red }}>Return Buffer: 30 min</div>
          <div style={{ fontSize: 11, color: c.textMid }}>Leave last stop by 15:45 — already in your plan</div>
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        <div style={{ ...s.btn('nav', `linear-gradient(135deg, ${c.primary}, ${c.primaryDim})`, { flex: 2, borderRadius: 14, padding: '14px 0', textAlign: 'center', cursor: 'pointer' }) }} onClick={() => btnPress('nav')}>
          <div style={{ fontSize: 13, fontWeight: 700 }}>Start Navigation</div>
        </div>
        <div style={{ ...s.btn('share', c.card, { flex: 1, borderRadius: 14, padding: '14px 0', textAlign: 'center', cursor: 'pointer', border: `1px solid ${c.border}` }) }} onClick={() => btnPress('share')}>
          <Icon name="Share2" size={16} color={c.textMid} />
        </div>
      </div>
    </div>
  );

  const ExploreScreen = () => {
    const [filter, setFilter] = useState('All');
    const filters = ['All', 'Food', 'View', 'Culture', 'Outdoor', 'Chill'];
    const filtered = filter === 'All' ? nearbyPlaces : nearbyPlaces.filter(p => p.cat.includes(filter) || p.tags.some(t => t.toLowerCase().includes(filter.toLowerCase())));

    return (
      <div style={{ padding: '16px 16px 0', animation: 'slideUp 0.3s ease' }}>
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 12, color: c.textMid, fontWeight: 500, letterSpacing: 1, textTransform: 'uppercase' }}>Singapore, SIN</div>
          <div style={{ fontSize: 22, fontWeight: 800, fontFamily: "'Syne', sans-serif", letterSpacing: -0.5 }}>Nearby</div>
        </div>

        {/* Search bar */}
        <div style={{ background: c.card, borderRadius: 14, border: `1px solid ${c.border}`, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
          <Icon name="Search" size={16} color={c.textDim} />
          <div style={{ fontSize: 13, color: c.textDim }}>Search places, cafes, views...</div>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4, marginBottom: 16 }}>
          {filters.map(f => (
            <div key={f} onClick={() => setFilter(f)} style={{ flexShrink: 0, background: filter === f ? c.primary : c.card, border: `1px solid ${filter === f ? c.primary : c.border}`, borderRadius: 20, padding: '6px 14px', fontSize: 12, fontWeight: 600, cursor: 'pointer', color: filter === f ? '#fff' : c.textMid, transition: 'all 0.2s' }}>{f}</div>
          ))}
        </div>

        {/* Time constraint */}
        <div style={{ background: c.accent + '15', borderRadius: 12, padding: '10px 14px', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Icon name="Clock" size={14} color={c.accent} />
          <div style={{ fontSize: 12, color: c.accent, fontWeight: 500 }}>Showing places reachable within {fmtTime(timeLeft - 3600)}</div>
        </div>

        {/* Places */}
        {filtered.map((place, i) => (
          <div key={i} style={{ ...s.card({ padding: 14, marginBottom: 10, cursor: 'pointer', transition: 'all 0.2s', opacity: place.open ? 1 : 0.6 }), position: 'relative', overflow: 'hidden' }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <div style={{ width: 52, height: 52, borderRadius: 14, background: c.cardAlt, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0 }}>{place.img}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{place.name}</div>
                    <div style={{ fontSize: 11, color: c.textMid, marginTop: 2 }}>{place.cat} • {place.price}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: c.accent }}>⭐ {place.rating}</div>
                    <div style={{ fontSize: 11, color: c.textDim, marginTop: 2 }}>{place.time}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 8 }}>
                  {place.tags.map((t, j) => <div key={j} style={{ background: c.glass, border: `1px solid ${c.border}`, borderRadius: 8, padding: '2px 8px', fontSize: 10, color: c.textMid }}>{t}</div>)}
                  {!place.open && <div style={{ background: c.red + '20', border: `1px solid ${c.red}30`, borderRadius: 8, padding: '2px 8px', fontSize: 10, color: c.red }}>Closed</div>}
                  {place.open && <div style={{ background: c.green + '20', border: `1px solid ${c.green}30`, borderRadius: 8, padding: '2px 8px', fontSize: 10, color: c.green }}>Open</div>}
                </div>
              </div>
            </div>
          </div>
        ))}
        <div style={{ height: 20 }} />
      </div>
    );
  };

  const SettingsScreen = () => (
    <div style={{ padding: '16px 16px 0', animation: 'slideUp 0.3s ease' }}>
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 12, color: c.textMid, fontWeight: 500, letterSpacing: 1, textTransform: 'uppercase' }}>Preferences</div>
        <div style={{ fontSize: 22, fontWeight: 800, fontFamily: "'Syne', sans-serif", letterSpacing: -0.5 }}>Profile</div>
      </div>

      {/* Profile card */}
      <div style={{ background: `linear-gradient(135deg, #1a1040 0%, #0F1629 100%)`, borderRadius: 20, padding: 20, border: `1px solid ${c.purple}30`, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{ width: 56, height: 56, borderRadius: 28, background: `linear-gradient(135deg, ${c.purple}, ${c.primary})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>✈️</div>
        <div>
          <div style={{ fontSize: 17, fontWeight: 700 }}>Frequent Traveler</div>
          <div style={{ fontSize: 12, color: c.textMid }}>47 layovers completed</div>
          <div style={{ fontSize: 11, color: c.purple, marginTop: 4 }}>⬡ Premium Explorer</div>
        </div>
      </div>

      {/* Luggage Type */}
      <div style={{ ...s.card({ padding: 16, marginBottom: 12 }) }}>
        <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Icon name="Luggage" size={16} color={c.teal} />
          <span>Luggage Type</span>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {['carry-on', 'checked', 'none'].map(type => (
            <div key={type} onClick={() => setLuggageType(type)} style={{ flex: 1, background: luggageType === type ? c.teal + '20' : c.cardAlt, border: `1px solid ${luggageType === type ? c.teal : c.border}`, borderRadius: 10, padding: '10px 6px', textAlign: 'center', cursor: 'pointer', transition: 'all 0.2s' }}>
              <div style={{ fontSize: 16 }}>{type === 'carry-on' ? '🎒' : type === 'checked' ? '🧳' : '👤'}</div>
              <div style={{ fontSize: 10, color: luggageType === type ? c.teal : c.textMid, fontWeight: 600, marginTop: 4, textTransform: 'capitalize' }}>{type}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Preferences */}
      {[
        { icon: 'Wind', label: 'Stress Mode', sub: 'Simpler, calmer recommendations', color: c.purple, state: stressMode, toggle: () => setStressMode(!stressMode) },
        { icon: 'Bell', label: 'Return Alerts', sub: 'Notify 30min before departure', color: c.accent, state: true, toggle: () => {} },
        { icon: 'MapPin', label: 'Transit Instructions', sub: 'Step-by-step directions included', color: c.green, state: true, toggle: () => {} },
        { icon: 'CloudRain', label: 'Weather Swaps', sub: 'Auto-swap outdoor plans if rain', color: c.primary, state: true, toggle: () => {} },
      ].map((pref, i) => (
        <div key={i} style={{ ...s.card({ padding: 14, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }) }} onClick={pref.toggle}>
          <div style={{ width: 36, height: 36, borderRadius: 18, background: pref.color + '20', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Icon name={pref.icon} size={16} color={pref.color} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 600 }}>{pref.label}</div>
            <div style={{ fontSize: 11, color: c.textDim, marginTop: 2 }}>{pref.sub}</div>
          </div>
          <div style={{ width: 44, height: 26, background: pref.state ? pref.color : c.border, borderRadius: 13, padding: 3, transition: 'background 0.3s', flexShrink: 0 }}>
            <div style={{ width: 20, height: 20, background: '#fff', borderRadius: 10, transition: 'transform 0.3s', transform: pref.state ? 'translateX(18px)' : 'translateX(0)' }} />
          </div>
        </div>
      ))}

      {/* Past Trips */}
      <div style={{ marginTop: 16, marginBottom: 8 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: c.textMid, letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 10 }}>Recent Layovers</div>
        {[
          { city: 'Dubai DXB', flag: '🇦🇪', time: '3h layover', date: 'Mar 12', rating: '4.8', note: 'Gold Souk + Desert View' },
          { city: 'Tokyo NRT', flag: '🇯🇵', time: '2h layover', date: 'Feb 28', rating: '4.9', note: 'Ramen + Tsukiji Quick' },
          { city: 'London LHR', flag: '🇬🇧', time: '90m layover', date: 'Feb 14', rating: '4.5', note: 'Stress Mode: Victoria pub' },
        ].map((trip, i) => (
          <div key={i} style={{ ...s.card({ padding: 12, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 12 }) }}>
            <div style={{ fontSize: 24 }}>{trip.flag}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600 }}>{trip.city}</div>
              <div style={{ fontSize: 11, color: c.textDim }}>{trip.note}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: c.accent }}>⭐ {trip.rating}</div>
              <div style={{ fontSize: 10, color: c.textDim }}>{trip.date}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ height: 20 }} />
    </div>
  );

  const tabs = [
    { id: 'home', icon: 'Home', label: 'Now' },
    { id: 'plan', icon: 'Map', label: 'Plan' },
    { id: 'explore', icon: 'Compass', label: 'Explore' },
    { id: 'settings', icon: 'User', label: 'Profile' },
  ];

  const screens = { home: HomeScreen, plan: PlanScreen, explore: ExploreScreen, settings: SettingsScreen };
  const Screen = screens[activeTab];

  return (
    <div style={s.outerWrap}>
      <style>{fontStyle}</style>
      <div style={s.phone}>
        {/* Dynamic Island */}
        <div style={s.dynamicIsland} />

        {/* Status Bar */}
        <div style={s.statusBar}>
          <div style={{ fontSize: 13, fontWeight: 700, paddingTop: 18 }}>{currentTime}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, paddingTop: 18 }}>
            <Icon name="Wifi" size={13} color={c.textMid} />
            <Icon name="Signal" size={13} color={c.textMid} />
            <div style={{ fontSize: 12, fontWeight: 600, color: c.textMid }}>87%</div>
          </div>
        </div>

        {/* Screen content */}
        <div style={s.content}>
          <Screen key={activeTab} />
        </div>

        {/* Bottom Nav */}
        <div style={s.bottomNav}>
          {tabs.map(tab => (
            <div key={tab.id} style={s.navItem(activeTab === tab.id)} onClick={() => setActiveTab(tab.id)}>
              <Icon name={tab.icon} size={22} color={activeTab === tab.id ? c.primary : c.textDim} strokeWidth={activeTab === tab.id ? 2.2 : 1.6} />
              <div style={{ fontSize: 10, fontWeight: 600, color: activeTab === tab.id ? c.primary : c.textDim }}>{tab.label}</div>
              <div style={s.navDot(activeTab === tab.id)} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
