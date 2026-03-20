
const { useState, useEffect, useRef } = React;

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [scanStep, setScanStep] = useState(0);
  const [scanAnimating, setScanAnimating] = useState(false);
  const [pressedBtn, setPressedBtn] = useState(null);
  const [likedItems, setLikedItems] = useState({});
  const [impactTab, setImpactTab] = useState('week');
  const [showMatchModal, setShowMatchModal] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [scanProgress, setScanProgress] = useState(0);
  const [notifVisible, setNotifVisible] = useState(true);
  const [time, setTime] = useState('9:41');

  useEffect(() => {
    const now = new Date();
    setTime(`${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`);
  }, []);

  const handlePress = (id) => {
    setPressedBtn(id);
    setTimeout(() => setPressedBtn(null), 150);
  };

  const startScan = () => {
    setScanStep(1);
    setScanAnimating(true);
    setScanProgress(0);
    let p = 0;
    const interval = setInterval(() => {
      p += 4;
      setScanProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        setScanAnimating(false);
        setScanStep(2);
      }
    }, 60);
  };

  const colors = {
    primary: '#3A9E5C',
    primaryDark: '#2D7D46',
    primaryLight: '#6FCF97',
    secondary: '#F4A623',
    bg: '#0C1810',
    surface: '#162519',
    surfaceHigh: '#1E3324',
    card: '#1A2E1E',
    border: '#2A4030',
    textPrimary: '#E8F5E9',
    textSecondary: '#8DB897',
    textMuted: '#5A7A62',
    amber: '#F4A623',
    red: '#E05454',
    blue: '#5B9CF6',
    teal: '#4ECDC4',
  };

  const fontStyle = `
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
    * { box-sizing: border-box; }
    ::-webkit-scrollbar { display: none; }
  `;

  const phoneStyle = {
    width: '375px',
    height: '812px',
    background: colors.bg,
    borderRadius: '50px',
    overflow: 'hidden',
    position: 'relative',
    boxShadow: '0 0 0 10px #0a0f0b, 0 0 0 12px #1a2a1e, 0 50px 100px rgba(0,0,0,0.8)',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    display: 'flex',
    flexDirection: 'column',
  };

  const StatusBar = () => (
    <div style={{ height: '50px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '0 28px 8px', flexShrink: 0, background: 'transparent', zIndex: 10, position: 'relative' }}>
      <span style={{ fontSize: '15px', fontWeight: '700', color: colors.textPrimary, letterSpacing: '-0.3px' }}>{time}</span>
      <div style={{ position: 'absolute', top: '10px', left: '50%', transform: 'translateX(-50%)', width: '120px', height: '34px', background: '#000', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#111' }} />
        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#222' }} />
      </div>
      <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
        {React.createElement(window.lucide.Wifi, { size: 14, color: colors.textPrimary, strokeWidth: 2 })}
        {React.createElement(window.lucide.Signal, { size: 14, color: colors.textPrimary, strokeWidth: 2 })}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
          <div style={{ width: '22px', height: '11px', border: `1.5px solid ${colors.textPrimary}`, borderRadius: '3px', padding: '1.5px', display: 'flex', alignItems: 'center' }}>
            <div style={{ width: '70%', height: '100%', background: colors.textPrimary, borderRadius: '1px' }} />
          </div>
        </div>
      </div>
    </div>
  );

  const BottomNav = () => {
    const tabs = [
      { id: 'home', icon: window.lucide.Home, label: 'Home' },
      { id: 'nearby', icon: window.lucide.MapPin, label: 'Nearby' },
      { id: 'scan', icon: window.lucide.Camera, label: 'List Item' },
      { id: 'impact', icon: window.lucide.BarChart2, label: 'Impact' },
      { id: 'profile', icon: window.lucide.User, label: 'Profile' },
    ];
    return (
      <div style={{ height: '80px', background: colors.surface, borderTop: `1px solid ${colors.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-around', paddingBottom: '12px', flexShrink: 0 }}>
        {tabs.map(tab => {
          const isActive = activeTab === tab.id;
          const isCenter = tab.id === 'scan';
          return (
            <button key={tab.id} onClick={() => { setActiveTab(tab.id); if (tab.id === 'scan') setScanStep(0); }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', background: 'none', border: 'none', cursor: 'pointer', padding: '4px 8px', position: 'relative', transform: pressedBtn === `nav-${tab.id}` ? 'scale(0.92)' : 'scale(1)', transition: 'transform 0.1s' }} onMouseDown={() => handlePress(`nav-${tab.id}`)}>
              {isCenter ? (
                <div style={{ width: '50px', height: '50px', borderRadius: '16px', background: isActive ? colors.primaryDark : `linear-gradient(135deg, ${colors.primary}, ${colors.primaryDark})`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 4px 16px rgba(58,158,92,0.5)`, marginTop: '-18px' }}>
                  {React.createElement(tab.icon, { size: 22, color: '#fff', strokeWidth: 2 })}
                </div>
              ) : (
                <div style={{ padding: '6px', borderRadius: '10px', background: isActive ? `${colors.primary}22` : 'transparent' }}>
                  {React.createElement(tab.icon, { size: 20, color: isActive ? colors.primary : colors.textMuted, strokeWidth: isActive ? 2.5 : 1.8 })}
                </div>
              )}
              <span style={{ fontSize: '10px', fontWeight: isActive ? '700' : '500', color: isActive ? colors.primary : colors.textMuted }}>{tab.label}</span>
            </button>
          );
        })}
      </div>
    );
  };

  // ── HOME SCREEN ──
  const HomeScreen = () => {
    const feedItems = [
      { id: 1, user: 'Maya K.', avatar: '🌿', item: 'Half-gallon Sage Green paint', qty: '~600ml left', condition: 'Excellent', distance: '0.2 mi', time: '4 min ago', tag: 'Paint', color: colors.primary, icon: window.lucide.Droplets, matches: 3 },
      { id: 2, user: 'Diego R.', avatar: '🔧', item: 'IKEA hardware mixed bag', qty: 'Screws, dowels, brackets', condition: 'Good', distance: '0.4 mi', time: '11 min ago', tag: 'Hardware', color: '#B07C4A', icon: window.lucide.Wrench, matches: 5 },
      { id: 3, user: 'Priya S.', avatar: '🫙', item: 'Glass mason jars (x12)', qty: '12 × 500ml, clean', condition: 'Like New', distance: '0.6 mi', time: '23 min ago', tag: 'Containers', color: colors.teal, icon: window.lucide.Package, matches: 7 },
      { id: 4, user: 'Tom H.', avatar: '📦', item: 'Moving boxes (flattened)', qty: '8 large, 4 medium', condition: 'Good', distance: '0.8 mi', time: '35 min ago', tag: 'Packaging', color: colors.amber, icon: window.lucide.Box, matches: 2 },
    ];

    const dropWindows = [
      { name: 'Riverside Tool Library', open: 'Open until 7 PM', items: 12, icon: '🔨', urgent: true },
      { name: 'Green St. Zero-Waste Pantry', open: 'Open until 6 PM', items: 8, icon: '🌾', urgent: false },
      { name: 'Maker Space Collective', open: 'Open until 9 PM', items: 5, icon: '⚙️', urgent: false },
    ];

    return (
      <div style={{ flex: 1, overflowY: 'scroll', overflowX: 'hidden' }}>
        {/* Header */}
        <div style={{ padding: '8px 20px 0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
            <div>
              <div style={{ fontSize: '13px', color: colors.textSecondary, fontWeight: '500' }}>Good morning 👋</div>
              <div style={{ fontSize: '22px', fontWeight: '800', color: colors.textPrimary, letterSpacing: '-0.5px' }}>LoopLedger</div>
            </div>
            <div style={{ position: 'relative' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '13px', background: colors.surfaceHigh, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${colors.border}` }}>
                {React.createElement(window.lucide.Bell, { size: 18, color: colors.textSecondary })}
              </div>
              <div style={{ position: 'absolute', top: '-2px', right: '-2px', width: '10px', height: '10px', borderRadius: '50%', background: colors.secondary, border: `2px solid ${colors.bg}` }} />
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div style={{ display: 'flex', gap: '10px', padding: '12px 20px', overflowX: 'scroll' }}>
          {[
            { label: 'Diverted', value: '18.4 kg', icon: window.lucide.Recycle, color: colors.primary },
            { label: 'CO₂ Saved', value: '6.2 kg', icon: window.lucide.Wind, color: colors.teal },
            { label: 'Items Listed', value: '24', icon: window.lucide.Package, color: colors.amber },
          ].map((s, i) => (
            <div key={i} style={{ flexShrink: 0, background: colors.card, border: `1px solid ${colors.border}`, borderRadius: '16px', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '10px', minWidth: '130px' }}>
              <div style={{ width: '34px', height: '34px', borderRadius: '10px', background: `${s.color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {React.createElement(s.icon, { size: 16, color: s.color, strokeWidth: 2 })}
              </div>
              <div>
                <div style={{ fontSize: '17px', fontWeight: '800', color: colors.textPrimary, letterSpacing: '-0.4px' }}>{s.value}</div>
                <div style={{ fontSize: '11px', color: colors.textMuted, fontWeight: '500' }}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Drop Windows Alert */}
        {notifVisible && (
          <div style={{ margin: '0 20px 14px', background: `linear-gradient(135deg, #1E3D2A, #162E20)`, border: `1px solid ${colors.primary}44`, borderRadius: '16px', padding: '12px 14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: colors.primary, boxShadow: `0 0 6px ${colors.primary}` }} />
                <span style={{ fontSize: '12px', fontWeight: '700', color: colors.primaryLight, textTransform: 'uppercase', letterSpacing: '0.5px' }}>3 Drop Windows Open Nearby</span>
              </div>
              <button onClick={() => setNotifVisible(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: colors.textMuted }}>
                {React.createElement(window.lucide.X, { size: 14, color: colors.textMuted })}
              </button>
            </div>
            {dropWindows.map((d, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '8px' }}>
                <span style={{ fontSize: '16px' }}>{d.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '12px', fontWeight: '600', color: colors.textPrimary }}>{d.name}</div>
                  <div style={{ fontSize: '11px', color: d.urgent ? colors.amber : colors.textMuted }}>{d.open} · {d.items} items needed</div>
                </div>
                {d.urgent && <div style={{ fontSize: '9px', fontWeight: '700', color: colors.amber, background: `${colors.amber}22`, borderRadius: '6px', padding: '2px 6px', border: `1px solid ${colors.amber}44` }}>URGENT</div>}
              </div>
            ))}
          </div>
        )}

        {/* Feed Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px 12px' }}>
          <div style={{ fontSize: '16px', fontWeight: '700', color: colors.textPrimary }}>Local Feed</div>
          <button style={{ fontSize: '12px', fontWeight: '600', color: colors.primary, background: 'none', border: 'none', cursor: 'pointer' }}>See all →</button>
        </div>

        {/* Feed Cards */}
        <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: '10px', paddingBottom: '20px' }}>
          {feedItems.map((item) => (
            <div key={item.id} style={{ background: colors.card, border: `1px solid ${colors.border}`, borderRadius: '18px', padding: '14px 16px', position: 'relative', overflow: 'hidden' }} onClick={() => { setSelectedMatch(item); setShowMatchModal(true); }}>
              <div style={{ position: 'absolute', top: 0, right: 0, width: '80px', height: '80px', borderRadius: '0 18px 0 80px', background: `${item.color}15` }} />
              <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '13px', background: `${item.color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0 }}>
                  {item.avatar}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
                    <span style={{ fontSize: '13px', fontWeight: '700', color: colors.textPrimary }}>{item.user}</span>
                    <span style={{ fontSize: '11px', color: colors.textMuted }}>{item.time}</span>
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: '600', color: colors.textPrimary, marginBottom: '4px' }}>{item.item}</div>
                  <div style={{ fontSize: '12px', color: colors.textSecondary, marginBottom: '8px' }}>{item.qty} · {item.condition}</div>
                  <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' }}>
                    <div style={{ fontSize: '11px', fontWeight: '600', color: item.color, background: `${item.color}18`, borderRadius: '8px', padding: '2px 8px', border: `1px solid ${item.color}30` }}>{item.tag}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                      {React.createElement(window.lucide.MapPin, { size: 11, color: colors.textMuted })}
                      <span style={{ fontSize: '11px', color: colors.textMuted }}>{item.distance}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                      {React.createElement(window.lucide.Users, { size: 11, color: colors.primary })}
                      <span style={{ fontSize: '11px', color: colors.primary, fontWeight: '600' }}>{item.matches} matches</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ── NEARBY SCREEN ──
  const NearbyScreen = () => {
    const [nearbyFilter, setNearbyFilter] = useState('all');
    const locations = [
      { name: 'Riverside Tool Library', type: 'tool-library', distance: '0.3 mi', walk: '6 min', open: true, closeTime: '7:00 PM', needs: ['Hardware', 'Tools', 'Wire'], accepts: 14, emoji: '🔨', coords: { x: 155, y: 180 } },
      { name: 'Green Street Pantry', type: 'food-sharing', distance: '0.5 mi', walk: '10 min', open: true, closeTime: '6:00 PM', needs: ['Containers', 'Packaging'], accepts: 8, emoji: '🌾', coords: { x: 230, y: 240 } },
      { name: 'Maker Space Collective', type: 'makerspace', distance: '0.7 mi', walk: '14 min', open: true, closeTime: '9:00 PM', needs: ['Wire', 'Hardware', 'Fabric'], accepts: 22, emoji: '⚙️', coords: { x: 110, y: 280 } },
      { name: 'Elm Ave Repair Café', type: 'repair-cafe', distance: '0.9 mi', walk: '18 min', open: false, closeTime: 'Opens Sat 10 AM', needs: ['Electronics', 'Textiles', 'Hardware'], accepts: 0, emoji: '🛠️', coords: { x: 270, y: 160 } },
      { name: 'Community Garden Hub', type: 'community', distance: '1.1 mi', walk: '22 min', open: true, closeTime: '5:00 PM', needs: ['Pots', 'Soil bags', 'Seeds'], accepts: 6, emoji: '🌱', coords: { x: 180, y: 310 } },
    ];

    const filters = ['all', 'tool-library', 'makerspace', 'food-sharing', 'repair-cafe'];
    const filterColors = { 'all': colors.primary, 'tool-library': '#B07C4A', 'makerspace': '#8B5CF6', 'food-sharing': colors.teal, 'repair-cafe': colors.amber };
    const filterLabels = { 'all': 'All', 'tool-library': 'Tool Libs', 'makerspace': 'Maker Spaces', 'food-sharing': 'Food Share', 'repair-cafe': 'Repair Café' };

    const filtered = nearbyFilter === 'all' ? locations : locations.filter(l => l.type === nearbyFilter);

    return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ padding: '8px 20px 0', flexShrink: 0 }}>
          <div style={{ fontSize: '22px', fontWeight: '800', color: colors.textPrimary, letterSpacing: '-0.5px', marginBottom: '4px' }}>Nearby</div>
          <div style={{ fontSize: '13px', color: colors.textSecondary, marginBottom: '10px' }}>Reuse hubs in your neighborhood</div>
        </div>

        {/* Map Preview */}
        <div style={{ margin: '0 20px 10px', height: '180px', borderRadius: '20px', background: `linear-gradient(135deg, #0F2A18, #162E1E)`, border: `1px solid ${colors.border}`, position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
          {/* Grid lines */}
          {[...Array(6)].map((_, i) => (
            <div key={`h${i}`} style={{ position: 'absolute', left: 0, right: 0, top: `${i * 30}px`, height: '1px', background: `${colors.border}60` }} />
          ))}
          {[...Array(8)].map((_, i) => (
            <div key={`v${i}`} style={{ position: 'absolute', top: 0, bottom: 0, left: `${i * 47}px`, width: '1px', background: `${colors.border}60` }} />
          ))}
          {/* Streets */}
          <div style={{ position: 'absolute', top: '70px', left: '0', right: '0', height: '3px', background: `${colors.border}80`, borderRadius: '2px' }} />
          <div style={{ position: 'absolute', top: '130px', left: '0', right: '0', height: '3px', background: `${colors.border}80`, borderRadius: '2px' }} />
          <div style={{ position: 'absolute', left: '120px', top: '0', bottom: '0', width: '3px', background: `${colors.border}80`, borderRadius: '2px' }} />
          <div style={{ position: 'absolute', left: '240px', top: '0', bottom: '0', width: '3px', background: `${colors.border}80`, borderRadius: '2px' }} />

          {/* Location pins */}
          {locations.map((loc, i) => (
            <div key={i} style={{ position: 'absolute', left: `${loc.coords.x}px`, top: `${loc.coords.y - 160}px` }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: loc.open ? filterColors[loc.type] : '#444', border: '2px solid #0C1810', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', boxShadow: loc.open ? `0 0 10px ${filterColors[loc.type]}80` : 'none', cursor: 'pointer' }}>
                {loc.emoji}
              </div>
            </div>
          ))}
          {/* User pin */}
          <div style={{ position: 'absolute', left: '175px', top: '10px', width: '14px', height: '14px', borderRadius: '50%', background: colors.blue, border: '2px solid #fff', boxShadow: `0 0 12px ${colors.blue}` }} />
          <div style={{ position: 'absolute', left: '165px', top: '0px', width: '34px', height: '34px', borderRadius: '50%', background: `${colors.blue}20`, border: `1px solid ${colors.blue}40` }} />

          <div style={{ position: 'absolute', bottom: '10px', left: '12px', fontSize: '11px', fontWeight: '600', color: colors.textSecondary, background: `${colors.bg}CC`, borderRadius: '6px', padding: '3px 8px' }}>
            📍 Your neighborhood
          </div>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: '8px', padding: '0 20px 10px', overflowX: 'scroll', flexShrink: 0 }}>
          {filters.map(f => (
            <button key={f} onClick={() => setNearbyFilter(f)} style={{ flexShrink: 0, fontSize: '12px', fontWeight: '600', padding: '6px 12px', borderRadius: '20px', background: nearbyFilter === f ? filterColors[f] : colors.surfaceHigh, color: nearbyFilter === f ? '#fff' : colors.textSecondary, border: `1px solid ${nearbyFilter === f ? filterColors[f] : colors.border}`, cursor: 'pointer' }}>
              {filterLabels[f]}
            </button>
          ))}
        </div>

        {/* Location List */}
        <div style={{ flex: 1, overflowY: 'scroll', padding: '0 20px', display: 'flex', flexDirection: 'column', gap: '10px', paddingBottom: '12px' }}>
          {filtered.map((loc, i) => (
            <div key={i} style={{ background: colors.card, border: `1px solid ${loc.open ? colors.border : colors.border + '80'}`, borderRadius: '18px', padding: '14px 16px', opacity: loc.open ? 1 : 0.65 }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: `${filterColors[loc.type]}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0 }}>
                  {loc.emoji}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ fontSize: '14px', fontWeight: '700', color: colors.textPrimary, flex: 1, paddingRight: '8px' }}>{loc.name}</div>
                    <div style={{ fontSize: '11px', fontWeight: '700', padding: '2px 8px', borderRadius: '8px', background: loc.open ? `${colors.primary}22` : `${colors.red}22`, color: loc.open ? colors.primary : colors.red, border: `1px solid ${loc.open ? colors.primary : colors.red}33`, flexShrink: 0 }}>
                      {loc.open ? 'Open' : 'Closed'}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '4px', marginBottom: '8px' }}>
                    <span style={{ fontSize: '12px', color: colors.textMuted }}>{loc.distance}</span>
                    <span style={{ fontSize: '12px', color: colors.textMuted }}>·</span>
                    <span style={{ fontSize: '12px', color: colors.textMuted }}>{loc.walk} walk</span>
                    <span style={{ fontSize: '12px', color: colors.textMuted }}>·</span>
                    <span style={{ fontSize: '12px', color: loc.open ? colors.amber : colors.textMuted }}>{loc.closeTime}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                    {loc.needs.map((n, j) => (
                      <span key={j} style={{ fontSize: '10px', fontWeight: '600', color: filterColors[loc.type], background: `${filterColors[loc.type]}15`, borderRadius: '6px', padding: '2px 7px' }}>{n}</span>
                    ))}
                    {loc.open && loc.accepts > 0 && (
                      <span style={{ fontSize: '10px', fontWeight: '700', color: colors.primary, marginLeft: '4px' }}>+{loc.accepts} items needed</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ── SCAN SCREEN ──
  const ScanScreen = () => {
    const [category, setCategory] = useState(null);
    const [quantity, setQuantity] = useState('');
    const suggestions = [
      { title: 'Offer to Riverside Tool Library', subtitle: 'They accept hardware donations — 0.3 mi away, open until 7 PM', match: '98%', icon: '🔨', color: colors.primary, urgent: true },
      { title: 'Post to neighborhood feed', subtitle: '3 neighbors have recently asked for similar hardware', match: '87%', icon: '📢', color: colors.blue, urgent: false },
      { title: 'Bundle with Maker Space pickup', subtitle: 'They do weekly pickups — next one tomorrow 10 AM', match: '74%', icon: '⚙️', color: '#8B5CF6', urgent: false },
    ];

    return (
      <div style={{ flex: 1, overflowY: 'scroll', padding: '0 20px 20px' }}>
        <div style={{ fontSize: '22px', fontWeight: '800', color: colors.textPrimary, letterSpacing: '-0.5px', marginBottom: '4px', marginTop: '8px' }}>List an Item</div>
        <div style={{ fontSize: '13px', color: colors.textSecondary, marginBottom: '16px' }}>Turn your surplus into someone's resource</div>

        {scanStep === 0 && (
          <>
            {/* Camera Area */}
            <div onClick={startScan} style={{ height: '200px', borderRadius: '24px', background: colors.surfaceHigh, border: `2px dashed ${colors.border}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '16px', cursor: 'pointer', position: 'relative', overflow: 'hidden' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: `${colors.primary}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `2px solid ${colors.primary}44` }}>
                {React.createElement(window.lucide.Camera, { size: 26, color: colors.primary })}
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '15px', fontWeight: '700', color: colors.textPrimary }}>Tap to scan item</div>
                <div style={{ fontSize: '12px', color: colors.textMuted, marginTop: '2px' }}>or tap below to enter manually</div>
              </div>
              <div style={{ position: 'absolute', bottom: '10px', right: '10px', fontSize: '11px', fontWeight: '600', color: colors.primary, background: `${colors.primary}22`, borderRadius: '8px', padding: '3px 8px' }}>
                AI-powered ✨
              </div>
            </div>

            {/* Quick Categories */}
            <div style={{ fontSize: '13px', fontWeight: '700', color: colors.textSecondary, marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Quick Select</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '16px' }}>
              {[
                { label: 'Paint & Materials', emoji: '🎨', color: colors.primary },
                { label: 'Hardware', emoji: '🔧', color: '#B07C4A' },
                { label: 'Containers', emoji: '🫙', color: colors.teal },
                { label: 'Electronics', emoji: '💡', color: colors.amber },
                { label: 'Fabric & Textiles', emoji: '🧵', color: '#E879F9' },
                { label: 'Garden', emoji: '🌱', color: '#84CC16' },
              ].map((cat, i) => (
                <button key={i} onClick={() => { setCategory(cat.label); setScanStep(2); }} style={{ background: category === cat.label ? `${cat.color}30` : colors.card, border: `1px solid ${category === cat.label ? cat.color : colors.border}`, borderRadius: '14px', padding: '12px 6px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                  <span style={{ fontSize: '22px' }}>{cat.emoji}</span>
                  <span style={{ fontSize: '10px', fontWeight: '600', color: colors.textSecondary, textAlign: 'center', lineHeight: '1.2' }}>{cat.label}</span>
                </button>
              ))}
            </div>
          </>
        )}

        {scanStep === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', padding: '20px 0' }}>
            <div style={{ width: '120px', height: '120px', borderRadius: '24px', background: colors.surfaceHigh, border: `2px solid ${colors.primary}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
              {React.createElement(window.lucide.Camera, { size: 36, color: colors.primary })}
              <div style={{ position: 'absolute', inset: 0, borderRadius: '24px', border: `3px solid ${colors.primary}`, clipPath: `inset(0 ${100 - scanProgress}% 0 0 round 22px)`, transition: 'clip-path 0.1s' }} />
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '16px', fontWeight: '700', color: colors.textPrimary }}>Analyzing item...</div>
              <div style={{ fontSize: '13px', color: colors.textSecondary, marginTop: '4px' }}>AI identifying material & condition</div>
            </div>
            <div style={{ width: '200px', height: '4px', background: colors.surfaceHigh, borderRadius: '2px', overflow: 'hidden' }}>
              <div style={{ width: `${scanProgress}%`, height: '100%', background: `linear-gradient(90deg, ${colors.primary}, ${colors.primaryLight})`, borderRadius: '2px', transition: 'width 0.06s' }} />
            </div>
            <div style={{ fontSize: '12px', color: colors.textMuted }}>{scanProgress}% complete</div>
          </div>
        )}

        {scanStep === 2 && (
          <>
            {/* Detected Item */}
            <div style={{ background: `linear-gradient(135deg, #1A3525, #162B1E)`, border: `1px solid ${colors.primary}44`, borderRadius: '20px', padding: '16px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '10px' }}>
                <div style={{ fontSize: '28px' }}>🔩</div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: '700', color: colors.primaryLight }}>Item Identified ✓</div>
                  <div style={{ fontSize: '16px', fontWeight: '800', color: colors.textPrimary }}>Mixed Hardware Bag</div>
                </div>
                <div style={{ marginLeft: 'auto', fontSize: '11px', fontWeight: '700', color: colors.primary, background: `${colors.primary}22`, borderRadius: '8px', padding: '3px 8px' }}>96% confident</div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                {[
                  { label: 'Category', value: 'Hardware' },
                  { label: 'Condition', value: 'Good' },
                  { label: 'Est. weight', value: '~0.4 kg' },
                  { label: 'Reuse score', value: '★★★★☆' },
                ].map((f, i) => (
                  <div key={i} style={{ background: `${colors.bg}80`, borderRadius: '10px', padding: '8px 10px' }}>
                    <div style={{ fontSize: '10px', color: colors.textMuted, fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.3px' }}>{f.label}</div>
                    <div style={{ fontSize: '13px', fontWeight: '700', color: colors.textPrimary, marginTop: '2px' }}>{f.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Suggestions */}
            <div style={{ fontSize: '13px', fontWeight: '700', color: colors.textSecondary, marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Best Reuse Options</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
              {suggestions.map((s, i) => (
                <div key={i} style={{ background: colors.card, border: `1px solid ${i === 0 ? s.color + '44' : colors.border}`, borderRadius: '16px', padding: '14px', position: 'relative', overflow: 'hidden' }}>
                  {i === 0 && <div style={{ position: 'absolute', top: '8px', right: '8px', fontSize: '9px', fontWeight: '700', color: s.color, background: `${s.color}22`, borderRadius: '6px', padding: '2px 6px', border: `1px solid ${s.color}44` }}>BEST MATCH</div>}
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <div style={{ fontSize: '22px', flexShrink: 0 }}>{s.icon}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '13px', fontWeight: '700', color: colors.textPrimary, paddingRight: '50px', marginBottom: '2px' }}>{s.title}</div>
                      <div style={{ fontSize: '11px', color: colors.textSecondary }}>{s.subtitle}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                    <div style={{ fontSize: '12px', fontWeight: '700', color: s.color }}>{s.match} match</div>
                    <button style={{ fontSize: '12px', fontWeight: '700', color: '#fff', background: s.color, border: 'none', borderRadius: '10px', padding: '5px 14px', cursor: 'pointer' }}>Choose →</button>
                  </div>
                </div>
              ))}
            </div>

            <button onClick={() => setScanStep(0)} style={{ width: '100%', padding: '14px', borderRadius: '16px', background: colors.surfaceHigh, border: `1px solid ${colors.border}`, color: colors.textSecondary, fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>
              Start Over
            </button>
          </>
        )}
      </div>
    );
  };

  // ── IMPACT SCREEN ──
  const ImpactScreen = () => {
    const weekData = [40, 65, 30, 80, 55, 90, 70];
    const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
    const maxVal = 100;

    const achievements = [
      { title: 'Loop Starter', desc: 'Listed your first 5 items', earned: true, emoji: '🌱', color: colors.primary },
      { title: 'Paint Saver', desc: 'Diverted 3 paint containers', earned: true, emoji: '🎨', color: colors.blue },
      { title: 'Hardware Hero', desc: 'Donated to 2 repair cafés', earned: true, emoji: '🔧', color: '#B07C4A' },
      { title: 'Zero Waste Week', desc: 'Diverted items 7 days in a row', earned: false, emoji: '♻️', color: colors.amber },
      { title: 'Community Builder', desc: 'Help 20 neighbors find items', earned: false, emoji: '🤝', color: '#E879F9' },
    ];

    const stats = [
      { label: 'kg Diverted', value: '18.4', trend: '+2.1', icon: window.lucide.Package, color: colors.primary },
      { label: 'CO₂ Avoided', value: '6.2 kg', trend: '+0.8', icon: window.lucide.Wind, color: colors.teal },
      { label: 'Items Listed', value: '24', trend: '+4', icon: window.lucide.List, color: colors.amber },
      { label: 'Miles Saved', value: '9.4', trend: '+1.2', icon: window.lucide.Navigation, color: colors.blue },
    ];

    return (
      <div style={{ flex: 1, overflowY: 'scroll', padding: '0 20px 20px' }}>
        <div style={{ fontSize: '22px', fontWeight: '800', color: colors.textPrimary, letterSpacing: '-0.5px', marginBottom: '4px', marginTop: '8px' }}>Impact Ledger</div>
        <div style={{ fontSize: '13px', color: colors.textSecondary, marginBottom: '16px' }}>Your environmental contribution</div>

        {/* Period Toggle */}
        <div style={{ display: 'flex', background: colors.surfaceHigh, borderRadius: '14px', padding: '4px', marginBottom: '16px', border: `1px solid ${colors.border}` }}>
          {['week', 'month', 'all'].map(p => (
            <button key={p} onClick={() => setImpactTab(p)} style={{ flex: 1, padding: '8px', borderRadius: '10px', background: impactTab === p ? colors.primary : 'transparent', color: impactTab === p ? '#fff' : colors.textMuted, fontSize: '13px', fontWeight: '700', border: 'none', cursor: 'pointer', transition: 'background 0.2s', textTransform: 'capitalize' }}>
              {p === 'all' ? 'All Time' : `This ${p.charAt(0).toUpperCase() + p.slice(1)}`}
            </button>
          ))}
        </div>

        {/* Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '16px' }}>
          {stats.map((s, i) => (
            <div key={i} style={{ background: colors.card, border: `1px solid ${colors.border}`, borderRadius: '18px', padding: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '10px', background: `${s.color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {React.createElement(s.icon, { size: 15, color: s.color })}
                </div>
                <span style={{ fontSize: '11px', fontWeight: '700', color: colors.primary, background: `${colors.primary}20`, borderRadius: '6px', padding: '2px 6px' }}>↑ {s.trend}</span>
              </div>
              <div style={{ fontSize: '22px', fontWeight: '800', color: colors.textPrimary, letterSpacing: '-0.5px' }}>{s.value}</div>
              <div style={{ fontSize: '11px', color: colors.textMuted, fontWeight: '500', marginTop: '2px' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Bar Chart */}
        <div style={{ background: colors.card, border: `1px solid ${colors.border}`, borderRadius: '20px', padding: '16px', marginBottom: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ fontSize: '14px', fontWeight: '700', color: colors.textPrimary }}>Daily Activity</div>
            <div style={{ fontSize: '12px', color: colors.primary, fontWeight: '600' }}>grams diverted</div>
          </div>
          <div style={{ display: 'flex', gap: '6px', alignItems: 'flex-end', height: '80px' }}>
            {weekData.map((v, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                <div style={{ width: '100%', height: `${(v / maxVal) * 70}px`, background: i === 5 ? `linear-gradient(180deg, ${colors.primaryLight}, ${colors.primary})` : `${colors.primary}60`, borderRadius: '6px 6px 4px 4px', minHeight: '4px' }} />
                <span style={{ fontSize: '10px', color: i === 5 ? colors.primary : colors.textMuted, fontWeight: i === 5 ? '700' : '500' }}>{days[i]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div style={{ fontSize: '13px', fontWeight: '700', color: colors.textSecondary, marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Achievements</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {achievements.map((a, i) => (
            <div key={i} style={{ background: colors.card, border: `1px solid ${a.earned ? a.color + '33' : colors.border}`, borderRadius: '16px', padding: '12px 14px', display: 'flex', gap: '12px', alignItems: 'center', opacity: a.earned ? 1 : 0.5 }}>
              <div style={{ fontSize: '24px', filter: a.earned ? 'none' : 'grayscale(1)' }}>{a.emoji}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '13px', fontWeight: '700', color: colors.textPrimary }}>{a.title}</div>
                <div style={{ fontSize: '11px', color: colors.textSecondary, marginTop: '2px' }}>{a.desc}</div>
              </div>
              {a.earned ? (
                <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: `${a.color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1.5px solid ${a.color}` }}>
                  {React.createElement(window.lucide.Check, { size: 12, color: a.color })}
                </div>
              ) : (
                <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: colors.surfaceHigh, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {React.createElement(window.lucide.Lock, { size: 12, color: colors.textMuted })}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ── PROFILE SCREEN ──
  const ProfileScreen = () => {
    const listings = [
      { item: 'Sage Green Paint (600ml)', status: 'matched', time: '2h ago', emoji: '🎨' },
      { item: 'IKEA Hardware Bag', status: 'pending', time: '5h ago', emoji: '🔩' },
      { item: 'Glass Jars × 12', status: 'completed', time: 'Yesterday', emoji: '🫙' },
      { item: 'Moving Boxes × 8', status: 'completed', time: '2 days ago', emoji: '📦' },
    ];
    const statusColor = { matched: colors.amber, pending: colors.blue, completed: colors.primary };
    const statusLabel = { matched: '● Matched', pending: '○ Pending', completed: '✓ Completed' };

    return (
      <div style={{ flex: 1, overflowY: 'scroll', padding: '0 20px 20px' }}>
        {/* Profile Header */}
        <div style={{ background: `linear-gradient(135deg, ${colors.surfaceHigh}, ${colors.card})`, borderRadius: '24px', padding: '20px', marginTop: '8px', marginBottom: '16px', border: `1px solid ${colors.border}`, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -20, right: -20, width: '100px', height: '100px', borderRadius: '50%', background: `${colors.primary}15` }} />
          <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '20px', background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryDark})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>🌿</div>
            <div>
              <div style={{ fontSize: '18px', fontWeight: '800', color: colors.textPrimary }}>Alex M.</div>
              <div style={{ fontSize: '13px', color: colors.textSecondary }}>Brooklyn, NY · Member since Jan 2025</div>
              <div style={{ display: 'flex', gap: '6px', alignItems: 'center', marginTop: '4px' }}>
                <div style={{ fontSize: '11px', fontWeight: '700', color: colors.primary, background: `${colors.primary}22`, borderRadius: '8px', padding: '2px 8px' }}>Level 4 Looper</div>
                <div style={{ fontSize: '11px', color: colors.textMuted }}>🏆 3 badges</div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0', marginTop: '16px', background: `${colors.bg}80`, borderRadius: '14px', overflow: 'hidden' }}>
            {[
              { label: 'Listed', value: '24' },
              { label: 'Matched', value: '19' },
              { label: 'Neighbors', value: '38' },
            ].map((s, i) => (
              <div key={i} style={{ flex: 1, padding: '10px 0', textAlign: 'center', borderRight: i < 2 ? `1px solid ${colors.border}` : 'none' }}>
                <div style={{ fontSize: '18px', fontWeight: '800', color: colors.textPrimary }}>{s.value}</div>
                <div style={{ fontSize: '11px', color: colors.textMuted, fontWeight: '500' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Listings */}
        <div style={{ fontSize: '13px', fontWeight: '700', color: colors.textSecondary, marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>My Listings</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
          {listings.map((l, i) => (
            <div key={i} style={{ background: colors.card, border: `1px solid ${colors.border}`, borderRadius: '14px', padding: '12px 14px', display: 'flex', gap: '10px', alignItems: 'center' }}>
              <span style={{ fontSize: '20px' }}>{l.emoji}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '13px', fontWeight: '600', color: colors.textPrimary }}>{l.item}</div>
                <div style={{ fontSize: '11px', color: colors.textMuted, marginTop: '1px' }}>{l.time}</div>
              </div>
              <div style={{ fontSize: '11px', fontWeight: '700', color: statusColor[l.status] }}>{statusLabel[l.status]}</div>
            </div>
          ))}
        </div>

        {/* Settings */}
        <div style={{ fontSize: '13px', fontWeight: '700', color: colors.textSecondary, marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Settings</div>
        <div style={{ background: colors.card, border: `1px solid ${colors.border}`, borderRadius: '18px', overflow: 'hidden' }}>
          {[
            { label: 'Notification Preferences', icon: window.lucide.Bell },
            { label: 'Drop Zone Radius', icon: window.lucide.MapPin, value: '1.0 mi' },
            { label: 'Item Categories', icon: window.lucide.Tag },
            { label: 'Privacy Settings', icon: window.lucide.Shield },
            { label: 'Community Groups', icon: window.lucide.Users },
          ].map((s, i, arr) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 16px', borderBottom: i < arr.length - 1 ? `1px solid ${colors.border}` : 'none' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '10px', background: colors.surfaceHigh, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {React.createElement(s.icon, { size: 15, color: colors.textSecondary })}
              </div>
              <span style={{ flex: 1, fontSize: '13px', fontWeight: '600', color: colors.textPrimary }}>{s.label}</span>
              {s.value && <span style={{ fontSize: '12px', color: colors.primary, fontWeight: '600' }}>{s.value}</span>}
              {React.createElement(window.lucide.ChevronRight, { size: 16, color: colors.textMuted })}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ── MATCH MODAL ──
  const MatchModal = () => {
    if (!showMatchModal || !selectedMatch) return null;
    return (
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'flex-end', zIndex: 100, backdropFilter: 'blur(4px)' }} onClick={() => setShowMatchModal(false)}>
        <div style={{ background: colors.surface, borderRadius: '28px 28px 0 0', padding: '20px', width: '100%', border: `1px solid ${colors.border}` }} onClick={e => e.stopPropagation()}>
          <div style={{ width: '40px', height: '4px', background: colors.border, borderRadius: '2px', margin: '0 auto 16px' }} />
          <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', marginBottom: '16px' }}>
            <div style={{ fontSize: '36px' }}>{selectedMatch.avatar}</div>
            <div>
              <div style={{ fontSize: '17px', fontWeight: '800', color: colors.textPrimary }}>{selectedMatch.item}</div>
              <div style={{ fontSize: '13px', color: colors.textSecondary }}>Listed by {selectedMatch.user} · {selectedMatch.distance}</div>
            </div>
          </div>
          <div style={{ background: `${colors.primary}15`, border: `1px solid ${colors.primary}33`, borderRadius: '14px', padding: '12px 14px', marginBottom: '16px' }}>
            <div style={{ fontSize: '12px', fontWeight: '700', color: colors.primaryLight, marginBottom: '6px' }}>🤖 Suggested Action</div>
            <div style={{ fontSize: '13px', color: colors.textPrimary }}>Claim this item for free pickup — the lister is available tonight. Walk 8 min or grab during your evening commute.</div>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={() => setShowMatchModal(false)} style={{ flex: 1, padding: '14px', borderRadius: '14px', background: colors.surfaceHigh, border: `1px solid ${colors.border}`, color: colors.textSecondary, fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>Pass</button>
            <button onClick={() => setShowMatchModal(false)} style={{ flex: 2, padding: '14px', borderRadius: '14px', background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryDark})`, border: 'none', color: '#fff', fontSize: '14px', fontWeight: '700', cursor: 'pointer', boxShadow: `0 4px 14px ${colors.primary}60` }}>Claim Item ↗</button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={{ minHeight: '100vh', background: '#060C08', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <style>{fontStyle}</style>
      <div style={phoneStyle}>
        <StatusBar />
        {activeTab === 'home' && <HomeScreen />}
        {activeTab === 'nearby' && <NearbyScreen />}
        {activeTab === 'scan' && <ScanScreen />}
        {activeTab === 'impact' && <ImpactScreen />}
        {activeTab === 'profile' && <ProfileScreen />}
        <BottomNav />
        <MatchModal />
      </div>
    </div>
  );
}
