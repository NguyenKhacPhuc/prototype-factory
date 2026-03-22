function App() {
  const { useState, useEffect, useRef } = React;

  const [activeTab, setActiveTab] = useState('home');
  const [darkMode, setDarkMode] = useState(true);
  const [errandFilter, setErrandFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [orbitStarted, setOrbitStarted] = useState(false);
  const [dismissedAlerts, setDismissedAlerts] = useState([]);

  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&display=swap';
    document.head.appendChild(link);
    const style = document.createElement('style');
    style.textContent = `
      * { font-family: 'Plus Jakarta Sans', sans-serif !important; box-sizing: border-box; }
      ::-webkit-scrollbar { display: none; }
      body { margin: 0; background: #f0f0f0; }
      @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
      @keyframes slideIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
    `;
    document.head.appendChild(style);
  }, []);

  const themes = {
    dark: {
      bg: '#0C0C14',
      surface: '#161622',
      surfaceHigh: '#1E1E2E',
      surfaceHigher: '#26263A',
      border: '#2A2A40',
      text: '#EEEEF8',
      textSec: '#7070A0',
      textMuted: '#44445A',
      primary: '#FF7A2F',
      primaryDim: 'rgba(255,122,47,0.14)',
      primaryDimmer: 'rgba(255,122,47,0.07)',
      green: '#34D399',
      greenDim: 'rgba(52,211,153,0.12)',
      amber: '#FBBF24',
      amberDim: 'rgba(251,191,36,0.13)',
      red: '#F87171',
      redDim: 'rgba(248,113,113,0.12)',
      blue: '#60A5FA',
      blueDim: 'rgba(96,165,250,0.12)',
      purple: '#C084FC',
      purpleDim: 'rgba(192,132,252,0.12)',
      navBg: '#10101A',
      shadow: '0 20px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.06)',
    },
    light: {
      bg: '#F3F3FA',
      surface: '#FFFFFF',
      surfaceHigh: '#EBEBF5',
      surfaceHigher: '#E2E2EE',
      border: '#DCDCEA',
      text: '#0C0C20',
      textSec: '#50507A',
      textMuted: '#9090B8',
      primary: '#E8650E',
      primaryDim: 'rgba(232,101,14,0.12)',
      primaryDimmer: 'rgba(232,101,14,0.06)',
      green: '#059669',
      greenDim: 'rgba(5,150,105,0.11)',
      amber: '#B45309',
      amberDim: 'rgba(180,83,9,0.11)',
      red: '#DC2626',
      redDim: 'rgba(220,38,38,0.1)',
      blue: '#2563EB',
      blueDim: 'rgba(37,99,235,0.11)',
      purple: '#7C3AED',
      purpleDim: 'rgba(124,58,237,0.11)',
      navBg: '#FFFFFF',
      shadow: '0 20px 80px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.08)',
    },
  };

  const th = themes[darkMode ? 'dark' : 'light'];

  const errands = [
    { id: 1, name: 'CVS Pharmacy', type: 'Pickup', address: '1240 Oak Ave', deadline: '11:00 AM', duration: 15, window: '9 AM – 11 AM', urgent: true, parking: 'Easy', wait: '~5 min', category: 'Health', note: 'Rx #847291 ready for pickup' },
    { id: 2, name: 'Whole Foods Market', type: 'Purchase', address: '890 Market St', deadline: null, duration: 30, window: '7 AM – 10 PM', urgent: false, parking: 'Moderate', wait: '~10 min', category: 'Groceries', note: 'Milk, eggs, sourdough, sharp cheddar' },
    { id: 3, name: 'Cleaners Plus', type: 'Drop-off', address: '432 Maple Blvd', deadline: '12:00 PM', duration: 10, window: '8 AM – 6 PM', urgent: false, parking: 'Easy', wait: '~2 min', category: 'Laundry', note: null },
    { id: 4, name: 'Lincoln Elementary', type: 'Pickup', address: '200 School Lane', deadline: '3:15 PM', duration: 20, window: '3:00 – 3:15 PM', urgent: true, parking: 'Hard', wait: '~15 min', category: 'School', note: 'Fixed time — cannot be delayed', fixed: true },
    { id: 5, name: 'USPS Post Office', type: 'Return', address: '55 Federal Plaza', deadline: 'This week', duration: 15, window: '9 AM – 5 PM', urgent: false, parking: 'Moderate', wait: '~8 min', category: 'Errands', note: null },
  ];

  const alerts = [
    { id: 1, icon: 'RefreshCw', color: 'blue', title: 'Reroute Suggested', msg: 'Heavy traffic on Oak Ave. Swapping CVS to stop #3 saves you 14 min.', time: '2 min ago', actions: ['Reroute Now', 'Dismiss'] },
    { id: 2, icon: 'AlertTriangle', color: 'amber', title: 'Hours Changed', msg: 'Cleaners Plus closes at 5:30 PM today, not 6 PM. Route adjusted.', time: '18 min ago', actions: ['Adjust Route', 'OK'] },
    { id: 3, icon: 'CheckCircle', color: 'green', title: 'Pickup Ready', msg: 'CVS Pharmacy: Rx #847291 is ready now. Best time: before 10:30 AM.', time: '32 min ago', actions: ['Go Now', 'Later'] },
    { id: 4, icon: 'Zap', color: 'purple', title: 'Nearby Add-on', msg: 'Target is 0.4 mi off your current route. Add a quick stop?', time: '1 hr ago', actions: ['Add Stop', 'Skip'] },
  ];

  const typeColors = {
    Pickup:   { bg: th.greenDim,  text: th.green },
    Purchase: { bg: th.blueDim,   text: th.blue },
    'Drop-off': { bg: th.purpleDim, text: th.purple },
    Return:   { bg: th.amberDim,  text: th.amber },
  };

  const alertPalette = {
    blue:   { bg: th.blueDim,   text: th.blue,   line: th.blue },
    amber:  { bg: th.amberDim,  text: th.amber,  line: th.amber },
    green:  { bg: th.greenDim,  text: th.green,  line: th.green },
    purple: { bg: th.purpleDim, text: th.purple, line: th.purple },
  };

  // ── Shared helpers ───────────────────────────────────────────────────────
  const card = (extra = {}) => ({
    background: th.surface,
    borderRadius: 16,
    padding: '14px',
    border: `1px solid ${th.border}`,
    ...extra,
  });

  const badge = (col) => ({
    background: col.bg,
    color: col.text,
    borderRadius: 7,
    padding: '3px 8px',
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: '0.03em',
    whiteSpace: 'nowrap',
  });

  const btn = (bg, col, extra = {}) => ({
    background: bg,
    color: col,
    border: 'none',
    borderRadius: 13,
    padding: '12px 18px',
    fontWeight: 700,
    fontSize: 14,
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
    ...extra,
  });

  const btnSm = (bg, col) => ({
    background: bg,
    color: col,
    border: 'none',
    borderRadius: 9,
    padding: '7px 14px',
    fontWeight: 600,
    fontSize: 12,
    cursor: 'pointer',
    flex: 1,
  });

  const iconBox = (col, size = 34) => ({
    width: size,
    height: size,
    borderRadius: Math.round(size * 0.32),
    background: col.bg,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  });

  // ── Screen: Home ─────────────────────────────────────────────────────────
  function HomeScreen() {
    return (
      <div style={{ overflowY: 'auto', height: '100%', padding: '14px 16px 0' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 18 }}>
          <div>
            <div style={{ fontSize: 12, color: th.textSec, fontWeight: 500, marginBottom: 2 }}>Monday, March 23</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: th.text, lineHeight: 1.1 }}>Today's Orbit</div>
          </div>
          <div style={{ ...iconBox({ bg: th.primaryDim }, 42), cursor: 'pointer' }}>
            {React.createElement(window.lucide.Navigation2 || window.lucide.Navigation, { size: 20, color: th.primary })}
          </div>
        </div>

        {/* Hero orbit card */}
        <div style={{
          background: darkMode
            ? `linear-gradient(135deg, rgba(255,122,47,0.18) 0%, rgba(255,122,47,0.04) 100%)`
            : `linear-gradient(135deg, rgba(232,101,14,0.14) 0%, rgba(232,101,14,0.03) 100%)`,
          border: `1px solid ${th.primary}38`,
          borderRadius: 22,
          padding: '18px 18px 16px',
          marginBottom: 14,
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', right: -28, top: -28, width: 120, height: 120, borderRadius: '50%', background: `${th.primary}0C` }} />
          <div style={{ position: 'absolute', right: 20, bottom: -40, width: 90, height: 90, borderRadius: '50%', background: `${th.primary}08` }} />

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
            <div>
              <div style={{ fontSize: 12, color: th.primary, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 4 }}>Optimized Route</div>
              <div style={{ fontSize: 32, fontWeight: 800, color: th.text, lineHeight: 1 }}>5 Stops</div>
            </div>
            <div style={{ background: th.primaryDim, borderRadius: 14, padding: '8px 14px', textAlign: 'center', border: `1px solid ${th.primary}30` }}>
              <div style={{ fontSize: 11, color: th.primary, fontWeight: 700 }}>Efficiency</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: th.primary }}>94%</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 0, marginBottom: 16 }}>
            {[
              { label: 'Distance', val: '7.4 mi' },
              { label: 'Est. Time', val: '~1h 50m' },
              { label: 'Time Saved', val: '38 min' },
            ].map((item, i) => (
              <div key={item.label} style={{ flex: 1, borderLeft: i > 0 ? `1px solid ${th.primary}25` : 'none', paddingLeft: i > 0 ? 14 : 0 }}>
                <div style={{ fontSize: 17, fontWeight: 800, color: th.text }}>{item.val}</div>
                <div style={{ fontSize: 11, color: th.textSec, fontWeight: 500 }}>{item.label}</div>
              </div>
            ))}
          </div>

          <button
            onClick={() => setOrbitStarted(!orbitStarted)}
            style={{ ...btn(orbitStarted ? th.green : th.primary, '#fff', { width: '100%', position: 'relative', zIndex: 1 }) }}
          >
            {React.createElement(orbitStarted ? (window.lucide.CheckCircle || window.lucide.Check) : window.lucide.Play, { size: 15 })}
            {orbitStarted ? 'Orbit Active — Tap to Pause' : 'Start Orbit'}
          </button>
        </div>

        {/* Next Up */}
        <div style={{ marginBottom: 2 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: th.text, marginBottom: 10 }}>Next Up</div>
          {errands.slice(0, 3).map((e, i) => (
            <div key={e.id} style={{ ...card({ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8, cursor: 'pointer' }) }}>
              <div style={{
                width: 34,
                height: 34,
                borderRadius: 11,
                background: i === 0 ? th.primary : th.primaryDim,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: i === 0 ? '#fff' : th.primary,
                fontSize: 15,
                fontWeight: 800,
                flexShrink: 0,
              }}>
                {i + 1}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: th.text, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginBottom: 2 }}>{e.name}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: th.textSec, fontSize: 12 }}>
                  {React.createElement(window.lucide.Clock, { size: 11 })}
                  <span>{e.window}</span>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 5 }}>
                <span style={badge(typeColors[e.type])}>{e.type}</span>
                {e.urgent && <span style={{ fontSize: 10, color: th.red, fontWeight: 700, letterSpacing: '0.04em' }}>URGENT</span>}
              </div>
            </div>
          ))}

          <div
            onClick={() => setActiveTab('errands')}
            style={{ textAlign: 'center', padding: '10px 0', color: th.primary, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
          >
            View all 5 stops →
          </div>
        </div>

        {/* Tip */}
        <div style={{ ...card({ background: th.surfaceHigh, display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 20 }) }}>
          {React.createElement(window.lucide.Lightbulb || window.lucide.Zap, { size: 16, color: th.amber })}
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: th.text, marginBottom: 2 }}>Orbit Tip</div>
            <div style={{ fontSize: 12, color: th.textSec, lineHeight: 1.55 }}>CVS has the tightest deadline. Hit it first before traffic builds on Oak Ave — you'll save 14 min over the afternoon.</div>
          </div>
        </div>

        {/* Friction summary */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: th.text, marginBottom: 10 }}>Friction Overview</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {[
              { label: 'Avg Wait Time', val: '8 min', icon: 'Timer', col: th.blue },
              { label: 'Hard Parking', val: '1 stop', icon: 'Car', col: th.red },
              { label: 'Perishables', val: '1 stop', icon: 'ShoppingCart', col: th.amber },
              { label: 'Fixed Times', val: '1 stop', icon: 'Lock', col: th.purple },
            ].map(item => {
              const Icon = window.lucide[item.icon] || window.lucide.Circle;
              return (
                <div key={item.label} style={{ ...card({ background: th.surfaceHigh, display: 'flex', gap: 10, alignItems: 'center' }) }}>
                  <Icon size={16} color={item.col} />
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: th.text }}>{item.val}</div>
                    <div style={{ fontSize: 11, color: th.textSec }}>{item.label}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // ── Screen: Errands ──────────────────────────────────────────────────────
  function ErrandsScreen() {
    const filters = [
      { id: 'all', label: 'All' },
      { id: 'urgent', label: 'Urgent' },
      { id: 'today', label: 'Today' },
    ];

    const filtered = errandFilter === 'urgent'
      ? errands.filter(e => e.urgent)
      : errands;

    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* Header */}
        <div style={{ padding: '14px 16px 8px', flexShrink: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <div>
              <div style={{ fontSize: 12, color: th.textSec, fontWeight: 500, marginBottom: 2 }}>{errands.length} errands queued</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: th.text }}>My Errands</div>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              style={{ width: 40, height: 40, borderRadius: 13, background: th.primary, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              {React.createElement(window.lucide.Plus, { size: 20, color: '#fff' })}
            </button>
          </div>
          <div style={{ display: 'flex', gap: 7 }}>
            {filters.map(f => (
              <button
                key={f.id}
                onClick={() => setErrandFilter(f.id)}
                style={{
                  padding: '6px 14px',
                  borderRadius: 20,
                  border: `1px solid ${errandFilter === f.id ? th.primary : th.border}`,
                  background: errandFilter === f.id ? th.primaryDim : 'transparent',
                  color: errandFilter === f.id ? th.primary : th.textSec,
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '8px 16px 0' }}>
          {filtered.map(e => (
            <div key={e.id} style={{ ...card({ marginBottom: 10 }) }}>
              {/* Row 1 */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                <div style={{ flex: 1, minWidth: 0, marginRight: 10 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                    {e.urgent && <div style={{ width: 6, height: 6, borderRadius: '50%', background: th.red, flexShrink: 0, animation: 'pulse 2s infinite' }} />}
                    <div style={{ fontSize: 15, fontWeight: 700, color: th.text, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{e.name}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: th.textSec, fontSize: 12 }}>
                    {React.createElement(window.lucide.MapPin, { size: 11 })}
                    <span>{e.address}</span>
                  </div>
                </div>
                <span style={badge(typeColors[e.type])}>{e.type}</span>
              </div>

              {/* Grid stats */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 7, marginBottom: e.note || e.fixed ? 10 : 0 }}>
                {[
                  { label: 'Window', val: e.window },
                  { label: 'Duration', val: `~${e.duration} min` },
                  {
                    label: 'Parking',
                    val: e.parking,
                    col: e.parking === 'Hard' ? th.red : e.parking === 'Moderate' ? th.amber : th.green,
                  },
                ].map(item => (
                  <div key={item.label} style={{ background: th.surfaceHigh, borderRadius: 10, padding: '8px 10px' }}>
                    <div style={{ fontSize: 10, color: th.textMuted, fontWeight: 600, marginBottom: 2, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{item.label}</div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: item.col || th.text }}>{item.val}</div>
                  </div>
                ))}
              </div>

              {e.note && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '8px 10px', background: th.surfaceHigh, borderRadius: 10, marginBottom: e.fixed ? 7 : 0 }}>
                  {React.createElement(window.lucide.Info, { size: 12, color: th.textSec })}
                  <div style={{ fontSize: 12, color: th.textSec, lineHeight: 1.4 }}>{e.note}</div>
                </div>
              )}

              {e.fixed && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 10px', background: th.redDim, borderRadius: 9 }}>
                  {React.createElement(window.lucide.Lock, { size: 11, color: th.red })}
                  <div style={{ fontSize: 11, color: th.red, fontWeight: 700 }}>Fixed constraint — cannot be rescheduled</div>
                </div>
              )}

              {e.deadline && (
                <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: e.urgent ? th.red : th.textSec, fontWeight: 600 }}>
                  {React.createElement(window.lucide.Clock, { size: 11 })}
                  Deadline: {e.deadline}
                </div>
              )}
            </div>
          ))}
          <div style={{ height: 16 }} />
        </div>

        {/* Add Errand Modal */}
        {showAddModal && (
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(0,0,0,0.6)',
            display: 'flex',
            alignItems: 'flex-end',
            zIndex: 200,
            borderRadius: 52,
            overflow: 'hidden',
          }}>
            <div style={{ background: th.surface, borderRadius: '24px 24px 0 0', padding: '20px 20px 32px', width: '100%', animation: 'slideIn 0.2s ease' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
                <div style={{ fontSize: 18, fontWeight: 800, color: th.text }}>Add Errand</div>
                <button onClick={() => setShowAddModal(false)} style={{ background: th.surfaceHigh, border: 'none', borderRadius: 10, width: 32, height: 32, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {React.createElement(window.lucide.X, { size: 16, color: th.textSec })}
                </button>
              </div>
              {['Location name', 'Address', 'Time window'].map(ph => (
                <div key={ph} style={{ background: th.surfaceHigh, border: `1px solid ${th.border}`, borderRadius: 12, padding: '12px 14px', marginBottom: 10, fontSize: 14, color: th.textMuted }}>
                  {ph}
                </div>
              ))}
              <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
                {['Pickup', 'Purchase', 'Drop-off', 'Return'].map(t => (
                  <div key={t} style={{ ...badge(typeColors[t]), padding: '6px 10px', cursor: 'pointer', fontSize: 11 }}>{t}</div>
                ))}
              </div>
              <button style={{ ...btn(th.primary, '#fff', { width: '100%' }) }}>
                {React.createElement(window.lucide.Plus, { size: 15 })}
                Add to Orbit
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ── Screen: Route ────────────────────────────────────────────────────────
  function RouteScreen() {
    const stops = [
      { ...errands[0], stopTime: '9:45 AM', leg: '1.2 mi · 6 min' },
      { ...errands[2], stopTime: '10:08 AM', leg: '2.1 mi · 9 min' },
      { ...errands[1], stopTime: '10:30 AM', leg: '0.8 mi · 4 min' },
      { ...errands[4], stopTime: '11:12 AM', leg: '3.2 mi · 14 min' },
      { ...errands[3], stopTime: '3:00 PM', leg: null },
    ];

    const iconFor = (icon) => window.lucide[icon] || window.lucide.Circle;

    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* Header */}
        <div style={{ padding: '14px 16px 10px', flexShrink: 0 }}>
          <div style={{ fontSize: 12, color: th.textSec, fontWeight: 500, marginBottom: 2 }}>Optimized for today</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: th.text, marginBottom: 12 }}>Route Plan</div>

          {/* Summary pills */}
          <div style={{ ...card({ background: th.surfaceHigh, display: 'flex', padding: '10px 14px' }) }}>
            {[
              { label: '5 stops', icon: 'MapPin', col: th.primary },
              { label: '7.4 mi', icon: 'Route', col: th.blue },
              { label: '1h 50m', icon: 'Clock', col: th.green },
              { label: '94% eff.', icon: 'Zap', col: th.amber },
            ].map((item, i) => {
              const Icon = iconFor(item.icon);
              return (
                <div key={item.label} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, borderLeft: i > 0 ? `1px solid ${th.border}` : 'none' }}>
                  <div style={{ width: 28, height: 28, borderRadius: 8, background: `${item.col}18`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon size={13} color={item.col} />
                  </div>
                  <div style={{ fontSize: 10, fontWeight: 700, color: th.textSec }}>{item.label}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Timeline */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '4px 16px' }}>
          {/* Origin */}
          <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 0 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 28 }}>
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: th.green, border: `2px solid ${th.bg}` }} />
              <div style={{ width: 2, height: 18, background: `linear-gradient(${th.green}60, ${th.primary}40)` }} />
            </div>
            <div style={{ fontSize: 13, fontWeight: 600, color: th.textSec, paddingBottom: 12 }}>Home — Starting point (9:30 AM)</div>
          </div>

          {stops.map((stop, i) => (
            <div key={stop.id}>
              <div style={{ display: 'flex', gap: 14 }}>
                {/* Timeline spine */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 28, flexShrink: 0 }}>
                  <div style={{
                    width: 28,
                    height: 28,
                    borderRadius: '50%',
                    background: th.primaryDim,
                    border: `2px solid ${th.primary}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: th.primary,
                    fontSize: 12,
                    fontWeight: 800,
                  }}>
                    {i + 1}
                  </div>
                  {i < stops.length - 1 && (
                    <div style={{ width: 2, flex: 1, minHeight: 56, background: `linear-gradient(${th.primary}50, ${th.primary}15)` }} />
                  )}
                </div>

                {/* Stop card */}
                <div style={{ flex: 1, ...card({ marginBottom: 6 }) }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: th.text, marginBottom: 2 }}>{stop.name}</div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: th.primary }}>{stop.stopTime}</div>
                    </div>
                    <span style={badge(typeColors[stop.type])}>{stop.type}</span>
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                    {[
                      { icon: 'Timer', text: stop.wait, col: th.textSec },
                      {
                        icon: 'Car',
                        text: `Parking: ${stop.parking}`,
                        col: stop.parking === 'Hard' ? th.red : stop.parking === 'Moderate' ? th.amber : th.green,
                      },
                      { icon: 'Clock', text: `~${stop.duration} min`, col: th.textSec },
                    ].map(item => {
                      const Icon = iconFor(item.icon);
                      return (
                        <div key={item.icon} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: item.col, fontWeight: 500 }}>
                          <Icon size={11} />
                          {item.text}
                        </div>
                      );
                    })}
                  </div>

                  {stop.fixed && (
                    <div style={{ marginTop: 7, display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: th.red, fontWeight: 700 }}>
                      {React.createElement(window.lucide.Lock, { size: 11 })}
                      Fixed constraint
                    </div>
                  )}
                </div>
              </div>

              {/* Leg label */}
              {stop.leg && (
                <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 0 }}>
                  <div style={{ width: 28, display: 'flex', justifyContent: 'center' }}>
                    <div style={{ width: 2, height: 14, background: th.border }} />
                  </div>
                  <div style={{ fontSize: 11, color: th.textMuted, fontWeight: 500, paddingBottom: 4 }}>{stop.leg}</div>
                </div>
              )}
            </div>
          ))}

          {/* Destination */}
          <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginTop: 4 }}>
            <div style={{ width: 28, display: 'flex', justifyContent: 'center' }}>
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: th.surfaceHigher, border: `2px solid ${th.border}` }} />
            </div>
            <div style={{ fontSize: 13, fontWeight: 600, color: th.textSec }}>Back Home — est. 3:45 PM</div>
          </div>

          {/* Navigate CTA */}
          <div style={{ padding: '16px 0 4px' }}>
            <button style={{ ...btn(th.primary, '#fff', { width: '100%' }) }}>
              {React.createElement(window.lucide.Navigation2 || window.lucide.Navigation, { size: 15 })}
              Start Navigation
            </button>
          </div>
          <div style={{ height: 16 }} />
        </div>
      </div>
    );
  }

  // ── Screen: Alerts ───────────────────────────────────────────────────────
  function AlertsScreen() {
    const visible = alerts.filter(a => !dismissedAlerts.includes(a.id));

    const dismiss = (id) => setDismissedAlerts(d => [...d, id]);
    const dismissAll = () => setDismissedAlerts(alerts.map(a => a.id));

    return (
      <div style={{ overflowY: 'auto', height: '100%', padding: '14px 16px 0' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div>
            <div style={{ fontSize: 12, color: th.textSec, fontWeight: 500, marginBottom: 2 }}>
              {visible.length} active · {alerts.length - visible.length} cleared
            </div>
            <div style={{ fontSize: 22, fontWeight: 800, color: th.text }}>Smart Alerts</div>
          </div>
          {visible.length > 0 && (
            <button onClick={dismissAll} style={{ fontSize: 12, color: th.primary, fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer' }}>
              Clear all
            </button>
          )}
        </div>

        {/* Empty state */}
        {visible.length === 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, paddingTop: 60 }}>
            {React.createElement(window.lucide.CheckCircle || window.lucide.Check, { size: 52, color: th.green })}
            <div style={{ fontSize: 17, fontWeight: 800, color: th.text }}>All clear!</div>
            <div style={{ fontSize: 13, color: th.textSec, textAlign: 'center', maxWidth: 200, lineHeight: 1.6 }}>No active alerts. Your orbit is running smoothly.</div>
          </div>
        )}

        {/* Alert cards */}
        {visible.map(alert => {
          const pal = alertPalette[alert.color];
          const Icon = window.lucide[alert.icon] || window.lucide.Bell;
          return (
            <div key={alert.id} style={{
              background: th.surface,
              border: `1px solid ${pal.line}28`,
              borderLeft: `3px solid ${pal.line}`,
              borderRadius: 16,
              padding: 14,
              marginBottom: 10,
              animation: 'slideIn 0.2s ease',
            }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 12 }}>
                <div style={{ ...iconBox({ bg: pal.bg }, 34) }}>
                  <Icon size={15} color={pal.text} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 3 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: th.text }}>{alert.title}</div>
                    <div style={{ fontSize: 11, color: th.textMuted, marginLeft: 8 }}>{alert.time}</div>
                  </div>
                  <div style={{ fontSize: 12, color: th.textSec, lineHeight: 1.55 }}>{alert.msg}</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8, paddingLeft: 44 }}>
                <button style={btnSm(pal.bg, pal.text)}>{alert.actions[0]}</button>
                <button onClick={() => dismiss(alert.id)} style={btnSm(th.surfaceHigh, th.textSec)}>{alert.actions[1]}</button>
              </div>
            </div>
          );
        })}

        {/* How it works */}
        <div style={{ ...card({ background: th.surfaceHigh, marginTop: 4, marginBottom: 24 }) }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: th.text, marginBottom: 12 }}>How Smart Alerts Work</div>
          {[
            { icon: 'RefreshCw', text: 'Reroutes automatically when traffic or closures affect stops' },
            { icon: 'AlertTriangle', text: 'Notifies you when store hours change on the day of' },
            { icon: 'Bell', text: 'Alerts when a pickup or order is ready ahead of schedule' },
            { icon: 'Zap', text: 'Suggests nearby add-ons that won\'t derail your route' },
          ].map((item, i) => {
            const Icon = window.lucide[item.icon] || window.lucide.Circle;
            return (
              <div key={i} style={{
                display: 'flex', gap: 10, alignItems: 'center',
                paddingBottom: i < 3 ? 10 : 0,
                borderBottom: i < 3 ? `1px solid ${th.border}` : 'none',
                marginBottom: i < 3 ? 10 : 0,
              }}>
                <Icon size={14} color={th.primary} />
                <div style={{ fontSize: 12, color: th.textSec, lineHeight: 1.5 }}>{item.text}</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // ── Screen: Settings ─────────────────────────────────────────────────────
  function SettingsScreen() {
    const preferences = [
      { icon: 'Bell', label: 'Smart Alerts', val: 'On', col: th.green },
      { icon: 'Navigation2', label: 'Auto-Reroute', val: 'Enabled', col: th.green },
      { icon: 'Timer', label: 'Wait Time Estimates', val: 'Enabled', col: th.green },
      { icon: 'Car', label: 'Parking Difficulty', val: 'Shown', col: th.green },
      { icon: 'Leaf', label: 'Eco Route Mode', val: 'Off', col: th.textSec },
    ];

    return (
      <div style={{ overflowY: 'auto', height: '100%', padding: '14px 16px 0' }}>
        <div style={{ fontSize: 22, fontWeight: 800, color: th.text, marginBottom: 16 }}>Settings</div>

        {/* Profile card */}
        <div style={{ ...card({ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20, cursor: 'pointer' }) }}>
          <div style={{
            width: 52, height: 52, borderRadius: 17,
            background: `linear-gradient(135deg, ${th.primary}, #E040FB)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 20, fontWeight: 800, color: '#fff', flexShrink: 0,
          }}>
            S
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: th.text }}>Sarah M.</div>
            <div style={{ fontSize: 12, color: th.textSec }}>sarah@email.com · Pro Plan</div>
          </div>
          {React.createElement(window.lucide.ChevronRight, { size: 18, color: th.textMuted })}
        </div>

        {/* Theme toggle */}
        <div style={{ fontSize: 11, fontWeight: 700, color: th.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8, paddingLeft: 2 }}>Appearance</div>
        <div style={{ ...card({ marginBottom: 20 }) }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ ...iconBox({ bg: th.primaryDim }, 36) }}>
                {React.createElement(darkMode ? window.lucide.Moon : window.lucide.Sun, { size: 16, color: th.primary })}
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: th.text }}>{darkMode ? 'Dark Mode' : 'Light Mode'}</div>
                <div style={{ fontSize: 12, color: th.textSec }}>Currently {darkMode ? 'dark' : 'light'}</div>
              </div>
            </div>
            <div
              onClick={() => setDarkMode(!darkMode)}
              style={{
                width: 48, height: 28, borderRadius: 14,
                background: darkMode ? th.primary : th.border,
                position: 'relative', cursor: 'pointer',
                transition: 'background 0.25s',
                flexShrink: 0,
              }}
            >
              <div style={{
                position: 'absolute', top: 4,
                left: darkMode ? 24 : 4,
                width: 20, height: 20, borderRadius: '50%',
                background: '#fff',
                transition: 'left 0.25s',
                boxShadow: '0 1px 5px rgba(0,0,0,0.35)',
              }} />
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div style={{ fontSize: 11, fontWeight: 700, color: th.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8, paddingLeft: 2 }}>Preferences</div>
        <div style={{ ...card({ marginBottom: 20 }) }}>
          {preferences.map((item, i) => {
            const Icon = window.lucide[item.icon] || window.lucide.Settings;
            return (
              <div key={i} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                paddingBottom: i < preferences.length - 1 ? 12 : 0,
                borderBottom: i < preferences.length - 1 ? `1px solid ${th.border}` : 'none',
                marginBottom: i < preferences.length - 1 ? 12 : 0,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Icon size={15} color={th.textSec} />
                  <div style={{ fontSize: 14, fontWeight: 500, color: th.text }}>{item.label}</div>
                </div>
                <div style={{ fontSize: 12, fontWeight: 700, color: item.col }}>{item.val}</div>
              </div>
            );
          })}
        </div>

        {/* About */}
        <div style={{ fontSize: 11, fontWeight: 700, color: th.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8, paddingLeft: 2 }}>About</div>
        <div style={{ ...card({ textAlign: 'center', padding: '20px 16px', marginBottom: 24 }) }}>
          <div style={{
            width: 56, height: 56, borderRadius: 18,
            background: `linear-gradient(135deg, ${th.primary}, #FF4F8A)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 24, margin: '0 auto 10px',
          }}>
            {React.createElement(window.lucide.Navigation2 || window.lucide.Navigation, { size: 26, color: '#fff' })}
          </div>
          <div style={{ fontSize: 18, fontWeight: 800, color: th.text, marginBottom: 3 }}>Errand Orbit</div>
          <div style={{ fontSize: 12, color: th.textSec, marginBottom: 8, fontStyle: 'italic' }}>Batch life into one smart route.</div>
          <div style={{ fontSize: 11, color: th.textMuted }}>Version 1.0.0 · Build 2026.03.23</div>
        </div>
      </div>
    );
  }

  // ── Navigation ───────────────────────────────────────────────────────────
  const tabs = [
    { id: 'home',     label: 'Home',    icon: window.lucide.Home },
    { id: 'errands',  label: 'Errands', icon: window.lucide.ClipboardList || window.lucide.List },
    { id: 'route',    label: 'Route',   icon: window.lucide.Route || window.lucide.Map },
    { id: 'alerts',   label: 'Alerts',  icon: window.lucide.Bell },
    { id: 'settings', label: 'Settings', icon: window.lucide.Settings2 || window.lucide.Settings },
  ];

  const screens = {
    home:     HomeScreen,
    errands:  ErrandsScreen,
    route:    RouteScreen,
    alerts:   AlertsScreen,
    settings: SettingsScreen,
  };

  const ActiveScreen = screens[activeTab];

  const now = new Date();
  const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });

  return (
    <div style={{
      background: '#f0f0f0',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
    }}>
      <div style={{
        width: 375,
        height: 812,
        background: th.bg,
        borderRadius: 52,
        overflow: 'hidden',
        boxShadow: th.shadow,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        transition: 'background 0.3s ease',
      }}>
        {/* Dynamic Island */}
        <div style={{
          position: 'absolute',
          top: 12,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 118,
          height: 34,
          background: '#000',
          borderRadius: 20,
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
        }}>
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#1c1c1c', border: '1.5px solid #2a2a2a' }} />
        </div>

        {/* Status Bar */}
        <div style={{
          height: 52,
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          padding: '0 26px 8px',
          flexShrink: 0,
        }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: th.text, letterSpacing: '-0.01em' }}>{timeStr}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            {React.createElement(window.lucide.Signal, { size: 13, color: th.text })}
            {React.createElement(window.lucide.Wifi, { size: 13, color: th.text })}
            {React.createElement(window.lucide.Battery, { size: 16, color: th.text })}
          </div>
        </div>

        {/* Screen Content */}
        <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
          <ActiveScreen />
        </div>

        {/* Bottom Nav */}
        <div style={{
          height: 82,
          background: th.navBg,
          borderTop: `1px solid ${th.border}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          padding: '0 4px 16px',
          flexShrink: 0,
          transition: 'background 0.3s ease',
        }}>
          {tabs.map(tab => {
            const active = activeTab === tab.id;
            const navItemStyle = {
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 4,
              padding: '8px 10px 6px',
              borderRadius: 14,
              background: active ? th.primaryDim : 'transparent',
              cursor: 'pointer',
              minWidth: 56,
              transition: 'background 0.15s',
              position: 'relative',
            };
            const labelStyle = {
              fontSize: 10,
              fontWeight: active ? 700 : 500,
              color: active ? th.primary : th.textSec,
              transition: 'color 0.15s',
            };
            return React.createElement(
              'div',
              {
                key: tab.id,
                onClick: () => setActiveTab(tab.id),
                style: navItemStyle,
              },
              React.createElement(tab.icon, { size: 21, color: active ? th.primary : th.textSec }),
              React.createElement('span', { style: labelStyle }, tab.label),
            );
          })}
        </div>
      </div>
    </div>
  );
}
