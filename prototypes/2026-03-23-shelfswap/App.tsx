const { useState, useEffect, useRef } = React;

const themes = {
  dark: {
    bg: '#0A0F0D',
    surface: '#141A17',
    surface2: '#1C2520',
    surface3: '#243029',
    primary: '#00E5B4',
    primaryDim: 'rgba(0, 229, 180, 0.12)',
    primaryGlow: 'rgba(0, 229, 180, 0.25)',
    secondary: '#8B5CF6',
    secondaryDim: 'rgba(139, 92, 246, 0.15)',
    text: '#E8F0EC',
    textSecondary: '#7A9E8E',
    textMuted: '#3A5445',
    border: '#1E2E28',
    danger: '#FF6B6B',
    dangerDim: 'rgba(255, 107, 107, 0.14)',
    warning: '#FFB347',
    warningDim: 'rgba(255, 179, 71, 0.14)',
    navBg: '#0F1512',
  },
  light: {
    bg: '#EDF6F1',
    surface: '#FFFFFF',
    surface2: '#F4FAF7',
    surface3: '#E6F5ED',
    primary: '#00B894',
    primaryDim: 'rgba(0, 184, 148, 0.12)',
    primaryGlow: 'rgba(0, 184, 148, 0.2)',
    secondary: '#7C3AED',
    secondaryDim: 'rgba(124, 58, 237, 0.12)',
    text: '#0D2018',
    textSecondary: '#4A7A64',
    textMuted: '#9AB8AC',
    border: '#C8E6D6',
    danger: '#EF4444',
    dangerDim: 'rgba(239, 68, 68, 0.12)',
    warning: '#D97706',
    warningDim: 'rgba(217, 119, 6, 0.12)',
    navBg: '#FFFFFF',
  }
};

function SpaceScore({ score, theme, size = 96 }) {
  const r = size / 2 - 8;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  const color = score >= 80 ? theme.primary : score >= 60 ? theme.warning : theme.danger;
  return (
    <div style={{ position: 'relative', width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)', position: 'absolute' }}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={theme.border} strokeWidth="7" />
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth="7"
          strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round" />
      </svg>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: size === 96 ? 22 : 18, fontWeight: 800, color, lineHeight: 1 }}>{score}</div>
        <div style={{ fontSize: 8, color: theme.textSecondary, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.4px', marginTop: 2 }}>Fit Score</div>
      </div>
    </div>
  );
}

function FitBar({ pct, theme }) {
  const c = pct >= 90 ? theme.primary : pct >= 70 ? theme.warning : theme.danger;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
      <div style={{ width: 52, height: 4, borderRadius: 2, background: theme.border, overflow: 'hidden' }}>
        <div style={{ width: `${pct}%`, height: '100%', background: c, borderRadius: 2 }} />
      </div>
      <span style={{ fontSize: 11, fontWeight: 700, color: c }}>{pct}%</span>
    </div>
  );
}

function HomeScreen({ theme, setActiveTab }) {
  const [pressedQuick, setPressedQuick] = useState(null);

  const conflicts = [
    { item: 'Ninja Air Fryer XL', issue: 'Too wide — counter gap is 12", unit needs 14.5"', severity: 'high' },
    { item: 'IKEA KALLAX 4×4', issue: 'Doorway conflict — 30" unit, 28.5" opening', severity: 'high' },
  ];

  const recs = [
    { name: 'Cosori Air Fryer 5.8QT', fit: 98, price: '$89', reason: 'Fits your 13" counter gap perfectly', tag: 'Best Fit', icon: '🍳' },
    { name: 'mDesign Stackable Bins ×3', fit: 95, price: '$34', reason: 'Compatible with 12" shelf depth', tag: 'System Match', icon: '📦' },
    { name: 'Nespresso Vertuo Pop', fit: 91, price: '$99', reason: 'Replaces your current conflicted unit', tag: 'Upgrade', icon: '☕' },
  ];

  const quickActions = [
    { label: 'Scan Room', icon: window.lucide.Camera, tab: 'scan', color: '#00E5B4' },
    { label: 'Add Item', icon: window.lucide.Plus, tab: 'inventory', color: '#8B5CF6' },
    { label: 'New List', icon: window.lucide.ShoppingCart, tab: 'lists', color: '#FF6B6B' },
  ];

  return (
    <div style={{ paddingTop: 58, paddingBottom: 16, minHeight: '100%', background: theme.bg }}>
      <div style={{ padding: '16px 20px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ fontSize: 12, color: theme.textSecondary, fontWeight: 600, marginBottom: 2 }}>Good morning,</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: theme.text }}>Sarah's Home</div>
        </div>
        <div style={{ width: 42, height: 42, borderRadius: 21, background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>👩</div>
      </div>

      {/* Space Health Card */}
      <div style={{ margin: '16px 20px 0', padding: '18px 20px', borderRadius: 22, background: theme.surface2, border: `1px solid ${theme.border}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ flex: 1, paddingRight: 12 }}>
            <div style={{ fontSize: 11, color: theme.textSecondary, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 6 }}>Space Health</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: theme.text, marginBottom: 6 }}>Well organized — 2 conflicts to resolve</div>
            <div style={{ fontSize: 11, color: theme.textSecondary, marginBottom: 10 }}>3 rooms scanned · 47 items · last sync today</div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {[['Kitchen', true], ['Bedroom', false], ['Living Room', true]].map(([room, ok]) => (
                <div key={room} style={{ padding: '3px 10px', borderRadius: 20, background: ok ? theme.primaryDim : theme.dangerDim, color: ok ? theme.primary : theme.danger, fontSize: 10, fontWeight: 700 }}>
                  {room} {ok ? '✓' : '!'}
                </div>
              ))}
            </div>
          </div>
          <SpaceScore score={78} theme={theme} />
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{ padding: '16px 20px 0' }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: theme.text, marginBottom: 10 }}>Quick Actions</div>
        <div style={{ display: 'flex', gap: 10 }}>
          {quickActions.map((a, i) => (
            <div key={i} onClick={() => setActiveTab(a.tab)}
              onMouseDown={() => setPressedQuick(i)} onMouseUp={() => setPressedQuick(null)}
              style={{ flex: 1, padding: '14px 8px', borderRadius: 18, background: pressedQuick === i ? theme.surface3 : theme.surface, border: `1px solid ${theme.border}`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, cursor: 'pointer', transform: pressedQuick === i ? 'scale(0.96)' : 'scale(1)', transition: 'all 0.15s' }}>
              <div style={{ width: 38, height: 38, borderRadius: 13, background: `${a.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {React.createElement(a.icon, { size: 18, color: a.color, strokeWidth: 2.5 })}
              </div>
              <span style={{ fontSize: 11, fontWeight: 700, color: theme.text }}>{a.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Conflicts */}
      <div style={{ padding: '16px 20px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: theme.text }}>Conflicts Detected</div>
          <div style={{ fontSize: 11, color: theme.primary, fontWeight: 600, cursor: 'pointer' }}>See all</div>
        </div>
        {conflicts.map((c, i) => (
          <div key={i} style={{ marginBottom: 10, padding: '14px', borderRadius: 16, background: theme.dangerDim, border: `1px solid ${theme.danger}33` }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
              <div style={{ width: 28, height: 28, borderRadius: 9, background: `${theme.danger}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                {React.createElement(window.lucide.AlertTriangle, { size: 14, color: theme.danger })}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: theme.text, marginBottom: 3 }}>{c.item}</div>
                <div style={{ fontSize: 11, color: theme.textSecondary, lineHeight: 1.4, marginBottom: 8 }}>{c.issue}</div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <div style={{ padding: '4px 12px', borderRadius: 20, background: theme.danger, color: '#fff', fontSize: 10, fontWeight: 700, cursor: 'pointer' }}>Find Alternatives</div>
                  <div style={{ padding: '4px 12px', borderRadius: 20, background: theme.surface3, color: theme.textSecondary, fontSize: 10, fontWeight: 700, cursor: 'pointer' }}>Dismiss</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recommendations */}
      <div style={{ padding: '16px 20px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: theme.text }}>Recommended for You</div>
          <div style={{ fontSize: 11, color: theme.primary, fontWeight: 600, cursor: 'pointer' }}>Browse all</div>
        </div>
        {recs.map((rec, i) => (
          <div key={i} style={{ marginBottom: 10, padding: '14px', borderRadius: 16, background: theme.surface, border: `1px solid ${theme.border}` }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <div style={{ width: 46, height: 46, borderRadius: 14, background: theme.surface2, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>{rec.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: theme.text }}>{rec.name}</span>
                  <div style={{ padding: '2px 7px', borderRadius: 8, background: theme.primaryDim, color: theme.primary, fontSize: 9, fontWeight: 800, flexShrink: 0 }}>{rec.tag}</div>
                </div>
                <div style={{ fontSize: 11, color: theme.textSecondary, marginBottom: 7, lineHeight: 1.4 }}>{rec.reason}</div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <FitBar pct={rec.fit} theme={theme} />
                    <span style={{ fontSize: 14, fontWeight: 800, color: theme.text }}>{rec.price}</span>
                  </div>
                  <div style={{ width: 30, height: 30, borderRadius: 10, background: theme.primaryDim, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                    {React.createElement(window.lucide.ShoppingCart, { size: 14, color: theme.primary })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ScanScreen({ theme }) {
  const [scanMode, setScanMode] = useState('room');
  const [phase, setPhase] = useState('idle');

  const handleScan = () => {
    if (phase !== 'idle' && phase !== 'done') return;
    setPhase('scanning');
    setTimeout(() => setPhase('done'), 2200);
  };

  const modes = [
    { id: 'room', label: 'Room', icon: window.lucide.Home },
    { id: 'item', label: 'Item', icon: window.lucide.Package },
    { id: 'measure', label: 'Measure', icon: window.lucide.Ruler },
  ];

  const tips = {
    room: 'Slowly pan the camera around the room. Hold steady at corners for accurate depth mapping.',
    item: 'Place item on a flat surface with even lighting. Keep 10"+ clearance on all sides.',
    measure: 'Tap two points on the screen to measure the distance between them in real-time.',
  };

  const recentScans = [
    { room: 'Kitchen', date: 'Today, 9:14 AM', items: 12, dims: '14.2" × 22.8" counter gap', status: 'complete' },
    { room: 'Living Room', date: 'Yesterday', items: 8, dims: '94" × 128" floor plan', status: 'complete' },
    { room: 'Master Bedroom', date: '2 days ago', items: 5, dims: 'Scan incomplete', status: 'partial' },
  ];

  return (
    <div style={{ paddingTop: 58, paddingBottom: 16, minHeight: '100%', background: theme.bg }}>
      <div style={{ padding: '16px 20px 12px' }}>
        <div style={{ fontSize: 22, fontWeight: 800, color: theme.text }}>Scan & Measure</div>
        <div style={{ fontSize: 13, color: theme.textSecondary, marginTop: 2 }}>Map your space to shop smarter</div>
      </div>

      {/* Mode Selector */}
      <div style={{ padding: '0 20px 14px', display: 'flex', gap: 8 }}>
        {modes.map(m => (
          <div key={m.id} onClick={() => { setScanMode(m.id); setPhase('idle'); }}
            style={{ flex: 1, padding: '10px 6px', borderRadius: 14, background: scanMode === m.id ? theme.primary : theme.surface2, border: `1px solid ${scanMode === m.id ? theme.primary : theme.border}`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, cursor: 'pointer', transition: 'all 0.2s' }}>
            {React.createElement(m.icon, { size: 17, color: scanMode === m.id ? '#fff' : theme.textSecondary, strokeWidth: 2 })}
            <span style={{ fontSize: 11, fontWeight: 700, color: scanMode === m.id ? '#fff' : theme.textSecondary }}>{m.label}</span>
          </div>
        ))}
      </div>

      {/* Viewfinder */}
      <div style={{ margin: '0 20px', height: 248, borderRadius: 22, overflow: 'hidden', position: 'relative', background: '#070F0A', border: `1.5px solid ${theme.border}` }}>
        {/* Simulated scene */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg, #0F1E14 0%, #081209 100%)' }}>
          {/* grid overlay */}
          <svg width="100%" height="100%" style={{ position: 'absolute', opacity: 0.15 }}>
            <defs>
              <pattern id="sgrid" width="36" height="36" patternUnits="userSpaceOnUse">
                <path d="M 36 0 L 0 0 0 36" fill="none" stroke={theme.primary} strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#sgrid)" />
          </svg>
          {/* Corner brackets */}
          {[{top:14,left:14,br:'tl'},{top:14,right:14,br:'tr'},{bottom:14,left:14,br:'bl'},{bottom:14,right:14,br:'br'}].map((pos, i) => {
            const bStyle = {
              position: 'absolute', ...pos, width: 22, height: 22,
              borderColor: theme.primary, borderStyle: 'solid', borderWidth: 0,
              borderTopWidth: (pos.br === 'tl' || pos.br === 'tr') ? 3 : 0,
              borderBottomWidth: (pos.br === 'bl' || pos.br === 'br') ? 3 : 0,
              borderLeftWidth: (pos.br === 'tl' || pos.br === 'bl') ? 3 : 0,
              borderRightWidth: (pos.br === 'tr' || pos.br === 'br') ? 3 : 0,
              borderTopLeftRadius: pos.br === 'tl' ? 5 : 0,
              borderTopRightRadius: pos.br === 'tr' ? 5 : 0,
              borderBottomLeftRadius: pos.br === 'bl' ? 5 : 0,
              borderBottomRightRadius: pos.br === 'br' ? 5 : 0,
            };
            return <div key={i} style={bStyle} />;
          })}
          {/* Center content */}
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 10 }}>
            {phase === 'scanning' && (
              <>
                <div style={{ width: 52, height: 52, borderRadius: 26, border: `3px solid ${theme.primary}`, borderTopColor: 'transparent', animation: 'sspin 0.9s linear infinite' }} />
                <div style={{ fontSize: 13, fontWeight: 700, color: theme.primary }}>Analyzing space...</div>
                <div style={{ fontSize: 11, color: theme.textSecondary }}>Detecting surfaces & depths</div>
              </>
            )}
            {phase === 'done' && (
              <>
                <div style={{ width: 52, height: 52, borderRadius: 26, background: theme.primaryDim, border: `2px solid ${theme.primary}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {React.createElement(window.lucide.Check, { size: 26, color: theme.primary })}
                </div>
                <div style={{ fontSize: 14, fontWeight: 800, color: theme.primary }}>Scan Complete!</div>
                <div style={{ fontSize: 11, color: theme.textSecondary, textAlign: 'center', lineHeight: 1.5 }}>Kitchen counter: 13.1" wide<br/>Depth: 22.4" · Height clear: 16.2"</div>
                {/* dim labels */}
                <div style={{ position: 'absolute', top: '28%', left: '50%', transform: 'translateX(-50%)', background: `${theme.primary}DD`, padding: '3px 9px', borderRadius: 6 }}>
                  <span style={{ fontSize: 10, fontWeight: 800, color: '#fff' }}>22.4 in</span>
                </div>
                <div style={{ position: 'absolute', left: 18, top: '50%', transform: 'translateY(-50%)', background: `${theme.primary}DD`, padding: '3px 9px', borderRadius: 6 }}>
                  <span style={{ fontSize: 10, fontWeight: 800, color: '#fff' }}>13.1 in</span>
                </div>
              </>
            )}
            {phase === 'idle' && (
              <>
                {React.createElement(window.lucide.Camera, { size: 36, color: theme.textMuted })}
                <div style={{ fontSize: 13, color: theme.textSecondary, marginTop: 4, textAlign: 'center', lineHeight: 1.5 }}>
                  {scanMode === 'room' ? 'Point at your room' : scanMode === 'item' ? 'Point at the item' : 'Tap two points to measure'}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <style>{`@keyframes sspin { to { transform: rotate(360deg); } }`}</style>

      {/* Scan Button */}
      <div style={{ padding: '14px 20px 0' }}>
        <div onClick={handleScan} style={{ height: 50, borderRadius: 16, background: phase === 'scanning' ? theme.surface2 : `linear-gradient(135deg, ${theme.primary} 0%, #00C49A 100%)`, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, cursor: phase === 'scanning' ? 'default' : 'pointer', transition: 'all 0.2s', boxShadow: phase === 'scanning' ? 'none' : `0 8px 24px ${theme.primaryGlow}` }}>
          {React.createElement(phase === 'scanning' ? window.lucide.Loader : window.lucide.ScanLine, { size: 20, color: phase === 'scanning' ? theme.textSecondary : '#fff' })}
          <span style={{ fontSize: 15, fontWeight: 700, color: phase === 'scanning' ? theme.textSecondary : '#fff' }}>
            {phase === 'scanning' ? 'Scanning...' : phase === 'done' ? 'Scan Again' : `Start ${modes.find(m => m.id === scanMode)?.label} Scan`}
          </span>
        </div>
      </div>

      {/* Tip */}
      <div style={{ margin: '12px 20px 0', padding: '12px 14px', borderRadius: 14, background: theme.surface, border: `1px solid ${theme.border}` }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
          {React.createElement(window.lucide.Lightbulb, { size: 14, color: theme.primary, style: { marginTop: 1, flexShrink: 0 } })}
          <span style={{ fontSize: 11, color: theme.textSecondary, lineHeight: 1.5 }}>{tips[scanMode]}</span>
        </div>
      </div>

      {/* Recent */}
      <div style={{ padding: '14px 20px 0' }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: theme.text, marginBottom: 10 }}>Recent Scans</div>
        {recentScans.map((s, i) => (
          <div key={i} style={{ marginBottom: 8, padding: '12px 14px', borderRadius: 14, background: theme.surface, border: `1px solid ${theme.border}`, display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 38, height: 38, borderRadius: 12, background: theme.primaryDim, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              {React.createElement(window.lucide.Home, { size: 17, color: theme.primary })}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: theme.text }}>{s.room}</div>
              <div style={{ fontSize: 10, color: theme.textSecondary }}>{s.dims}</div>
            </div>
            <div>
              <div style={{ padding: '3px 9px', borderRadius: 10, background: s.status === 'complete' ? theme.primaryDim : theme.warningDim, color: s.status === 'complete' ? theme.primary : theme.warning, fontSize: 9, fontWeight: 800, textAlign: 'center' }}>
                {s.status === 'complete' ? 'Done' : 'Partial'}
              </div>
              <div style={{ fontSize: 9, color: theme.textMuted, marginTop: 3, textAlign: 'center' }}>{s.date}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function InventoryScreen({ theme }) {
  const [activeRoom, setActiveRoom] = useState('kitchen');
  const [expandedItem, setExpandedItem] = useState(null);

  const rooms = [
    { id: 'kitchen', label: 'Kitchen', emoji: '🍳', items: 12, pct: 85 },
    { id: 'bedroom', label: 'Bedroom', emoji: '🛏', items: 8, pct: 65 },
    { id: 'living', label: 'Living', emoji: '🛋', items: 15, pct: 72 },
    { id: 'bath', label: 'Bathroom', emoji: '🚿', items: 9, pct: 55 },
  ];

  const allItems = {
    kitchen: [
      { name: 'Instant Pot Duo 6qt', dims: '13.3 × 12.3 × 12.3"', loc: 'Lower cabinet L', status: 'ok', since: 'Mar 2024' },
      { name: 'KitchenAid Stand Mixer', dims: '14 × 8.7 × 13.9"', loc: 'Counter left', status: 'ok', since: 'Jan 2023' },
      { name: 'Nespresso Vertuo Next', dims: '5.5 × 12.8 × 11"', loc: 'Counter right', status: 'conflict', since: 'Feb 2025' },
      { name: 'Vitamix E310', dims: '8.5 × 7.3 × 17.5"', loc: 'Counter right', status: 'conflict', since: 'Aug 2024' },
      { name: 'IKEA VARIERA Shelf Insert', dims: '11.8 × 7.9 × 4.7"', loc: 'Upper cabinet', status: 'ok', since: 'Jun 2024' },
      { name: 'OXO Pop Canister Set ×6', dims: '4.5 × 4.5 × 7"', loc: 'Pantry shelf 2', status: 'ok', since: 'Oct 2024' },
    ],
    bedroom: [
      { name: 'MALM 6-Drawer Dresser', dims: '62.6 × 18.9 × 48.4"', loc: 'East wall', status: 'ok', since: 'Mar 2022' },
      { name: 'TARVA Bed Frame (Queen)', dims: '62.6 × 82.7"', loc: 'Center', status: 'ok', since: 'Mar 2022' },
      { name: 'BRIMNES Wardrobe 2-door', dims: '30.7 × 18.9 × 74.8"', loc: 'North wall', status: 'ok', since: 'Apr 2022' },
    ],
    living: [
      { name: 'KIVIK 3-Seat Sofa', dims: '90.5 × 33.5 × 32.6"', loc: 'Center', status: 'ok', since: 'Jun 2022' },
      { name: 'LACK Coffee Table', dims: '35.4 × 21.7 × 17.7"', loc: 'Front of sofa', status: 'ok', since: 'Jun 2022' },
      { name: 'BESTÅ TV Unit', dims: '47.2 × 15.7 × 20.1"', loc: 'West wall', status: 'ok', since: 'Jul 2022' },
    ],
    bath: [
      { name: 'mDesign Over-toilet Shelf', dims: '23.6 × 8.7 × 56"', loc: 'Over toilet', status: 'ok', since: 'Jan 2024' },
      { name: 'ALGOT Wall Organizer', dims: '25.6 × 5.5 × 31.5"', loc: 'North wall', status: 'ok', since: 'Jan 2024' },
    ],
  };

  const current = allItems[activeRoom] || [];
  const room = rooms.find(r => r.id === activeRoom);

  return (
    <div style={{ paddingTop: 58, paddingBottom: 16, minHeight: '100%', background: theme.bg }}>
      <div style={{ padding: '16px 20px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: 22, fontWeight: 800, color: theme.text }}>My Inventory</div>
          <div style={{ fontSize: 13, color: theme.textSecondary }}>47 items across 4 rooms</div>
        </div>
        <div style={{ width: 40, height: 40, borderRadius: 13, background: theme.primaryDim, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          {React.createElement(window.lucide.Plus, { size: 20, color: theme.primary })}
        </div>
      </div>

      {/* Room Tabs */}
      <div style={{ padding: '0 20px 14px', display: 'flex', gap: 8, overflowX: 'auto' }}>
        {rooms.map(r => (
          <div key={r.id} onClick={() => setActiveRoom(r.id)} style={{ flexShrink: 0, padding: '9px 14px', borderRadius: 16, background: activeRoom === r.id ? theme.primary : theme.surface, border: `1px solid ${activeRoom === r.id ? theme.primary : theme.border}`, cursor: 'pointer', transition: 'all 0.2s' }}>
            <div style={{ fontSize: 17, marginBottom: 2 }}>{r.emoji}</div>
            <div style={{ fontSize: 11, fontWeight: 700, color: activeRoom === r.id ? '#fff' : theme.text }}>{r.label}</div>
            <div style={{ fontSize: 9, color: activeRoom === r.id ? 'rgba(255,255,255,0.65)' : theme.textSecondary }}>{r.items} items</div>
          </div>
        ))}
      </div>

      {/* Room Stats */}
      <div style={{ margin: '0 20px 14px', padding: '14px 16px', borderRadius: 16, background: theme.surface, border: `1px solid ${theme.border}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 7 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: theme.text }}>{room?.emoji} {room?.label} — Space Used</span>
          <span style={{ fontSize: 13, fontWeight: 800, color: room?.pct > 80 ? theme.warning : theme.primary }}>{room?.pct}%</span>
        </div>
        <div style={{ height: 6, borderRadius: 3, background: theme.border, overflow: 'hidden' }}>
          <div style={{ width: `${room?.pct}%`, height: '100%', background: room?.pct > 80 ? theme.warning : theme.primary, borderRadius: 3, transition: 'width 0.5s ease' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 5 }}>
          <span style={{ fontSize: 10, color: theme.textSecondary }}>{room?.items} items tracked</span>
          <span style={{ fontSize: 10, color: room?.pct > 80 ? theme.warning : theme.textSecondary }}>{room?.pct > 80 ? '⚠️ Near capacity' : 'Good capacity'}</span>
        </div>
      </div>

      {/* Items */}
      <div style={{ padding: '0 20px' }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: theme.textSecondary, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 8 }}>Items</div>
        {current.map((item, i) => (
          <div key={i} onClick={() => setExpandedItem(expandedItem === i ? null : i)}
            style={{ marginBottom: 8, padding: '13px 14px', borderRadius: 16, background: theme.surface, border: `1px solid ${item.status === 'conflict' ? theme.danger + '44' : theme.border}`, cursor: 'pointer', transition: 'all 0.15s' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 3 }}>
                  <div style={{ width: 7, height: 7, borderRadius: 3.5, background: item.status === 'conflict' ? theme.danger : theme.primary, flexShrink: 0 }} />
                  <span style={{ fontSize: 13, fontWeight: 700, color: theme.text }}>{item.name}</span>
                  {item.status === 'conflict' && <div style={{ padding: '1px 6px', borderRadius: 6, background: theme.dangerDim, color: theme.danger, fontSize: 9, fontWeight: 800, flexShrink: 0 }}>CONFLICT</div>}
                </div>
                <div style={{ fontSize: 11, color: theme.textSecondary, marginBottom: 1 }}>📐 {item.dims}</div>
                <div style={{ fontSize: 11, color: theme.textMuted }}>📍 {item.loc}</div>
              </div>
              <div style={{ transform: expandedItem === i ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }}>
                {React.createElement(window.lucide.ChevronDown, { size: 16, color: theme.textMuted })}
              </div>
            </div>
            {expandedItem === i && (
              <div style={{ marginTop: 10, paddingTop: 10, borderTop: `1px solid ${theme.border}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontSize: 11, color: theme.textSecondary }}>Added</span>
                  <span style={{ fontSize: 11, fontWeight: 600, color: theme.text }}>{item.since}</span>
                </div>
                {item.status === 'conflict' && (
                  <div style={{ padding: '8px 10px', borderRadius: 10, background: theme.dangerDim, marginBottom: 8 }}>
                    <span style={{ fontSize: 11, color: theme.danger, lineHeight: 1.4 }}>⚠️ This item conflicts with available counter space. Consider finding a slimmer alternative.</span>
                  </div>
                )}
                <div style={{ display: 'flex', gap: 8 }}>
                  <div style={{ flex: 1, padding: '7px', borderRadius: 10, background: theme.primaryDim, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5, cursor: 'pointer' }}>
                    {React.createElement(window.lucide.Search, { size: 12, color: theme.primary })}
                    <span style={{ fontSize: 10, fontWeight: 700, color: theme.primary }}>Find Compatible</span>
                  </div>
                  <div style={{ flex: 1, padding: '7px', borderRadius: 10, background: theme.surface2, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5, cursor: 'pointer' }}>
                    {React.createElement(window.lucide.Trash2, { size: 12, color: theme.textSecondary })}
                    <span style={{ fontSize: 10, fontWeight: 700, color: theme.textSecondary }}>Remove</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
        <div style={{ padding: '13px 14px', borderRadius: 16, background: theme.surface2, border: `2px dashed ${theme.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, cursor: 'pointer' }}>
          {React.createElement(window.lucide.Plus, { size: 17, color: theme.textSecondary })}
          <span style={{ fontSize: 12, fontWeight: 600, color: theme.textSecondary }}>Add item to {room?.label}</span>
        </div>
      </div>
    </div>
  );
}

function ListsScreen({ theme }) {
  const [activeList, setActiveList] = useState(0);
  const [checkedItems, setCheckedItems] = useState({});

  const lists = [
    {
      name: 'Kitchen Upgrade',
      goal: 'Upgrade small appliances for 2025',
      items: [
        { name: 'Cosori Air Fryer 5.8QT', price: '$89', fit: 98, status: 'ready', note: 'Fits your 13.1" counter gap perfectly' },
        { name: 'Joseph Joseph DrawerStore', price: '$42', fit: 94, status: 'ready', note: 'Compatible with standard 21" deep drawer' },
        { name: 'OXO Steel Canister Set ×6', price: '$89', fit: 87, status: 'warning', note: 'Verify shelf depth — 6.9" required, yours is 7.2"' },
        { name: 'Instant Pot Duo Crisp 8qt', price: '$149', fit: 38, status: 'conflict', note: 'Conflicts with existing Instant Pot — will not fit cabinet' },
        { name: 'Nespresso Vertuo Pop', price: '$99', fit: 91, status: 'ready', note: 'Replaces current unit, saves 3.2" of counter depth' },
      ]
    },
    {
      name: 'Nursery Setup',
      goal: 'Prepare the small bedroom as a nursery',
      items: [
        { name: 'Delta Children Convertible Crib', price: '$229', fit: 92, status: 'ready', note: 'Fits east wall, 4" clearance for door swing' },
        { name: 'Graco Pack n Play Playard', price: '$79', fit: 88, status: 'ready', note: 'Folds flat — storable in closet (22" depth)' },
        { name: 'Munchkin Sprout Changing Pad', price: '$149', fit: 72, status: 'warning', note: 'Check door swing — needs 22" from east wall edge' },
        { name: 'Skip Hop 3-Shelf Bookcase', price: '$119', fit: 95, status: 'ready', note: 'Matches 14" closet nook width exactly' },
      ]
    },
  ];

  const list = lists[activeList];
  const fitColor = (f) => f >= 90 ? theme.primary : f >= 70 ? theme.warning : theme.danger;
  const readyCount = list.items.filter(i => i.status === 'ready').length;

  const toggleCheck = (i) => setCheckedItems(prev => ({ ...prev, [`${activeList}-${i}`]: !prev[`${activeList}-${i}`] }));

  return (
    <div style={{ paddingTop: 58, paddingBottom: 16, minHeight: '100%', background: theme.bg }}>
      <div style={{ padding: '16px 20px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: 22, fontWeight: 800, color: theme.text }}>Shopping Lists</div>
          <div style={{ fontSize: 13, color: theme.textSecondary }}>Space-aware & conflict-checked</div>
        </div>
        <div style={{ width: 40, height: 40, borderRadius: 13, background: theme.primaryDim, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          {React.createElement(window.lucide.Plus, { size: 20, color: theme.primary })}
        </div>
      </div>

      {/* List Tabs */}
      <div style={{ padding: '0 20px 14px', display: 'flex', gap: 10 }}>
        {lists.map((l, i) => {
          const ready = l.items.filter(x => x.status === 'ready').length;
          const conflicts = l.items.filter(x => x.status === 'conflict').length;
          return (
            <div key={i} onClick={() => setActiveList(i)} style={{ flex: 1, padding: '12px 14px', borderRadius: 18, background: activeList === i ? theme.primary : theme.surface, border: `1px solid ${activeList === i ? theme.primary : theme.border}`, cursor: 'pointer', transition: 'all 0.2s' }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: activeList === i ? '#fff' : theme.text, marginBottom: 4 }}>{l.name}</div>
              <div style={{ fontSize: 10, color: activeList === i ? 'rgba(255,255,255,0.65)' : theme.textSecondary, marginBottom: 8 }}>{l.items.length} items</div>
              <div style={{ height: 3, borderRadius: 2, background: activeList === i ? 'rgba(255,255,255,0.25)' : theme.border }}>
                <div style={{ width: `${(ready / l.items.length) * 100}%`, height: '100%', background: activeList === i ? '#fff' : theme.primary, borderRadius: 2 }} />
              </div>
              <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
                <span style={{ fontSize: 9, fontWeight: 700, color: activeList === i ? 'rgba(255,255,255,0.8)' : theme.primary }}>{ready} ready</span>
                {conflicts > 0 && <span style={{ fontSize: 9, fontWeight: 700, color: activeList === i ? 'rgba(255,100,100,0.9)' : theme.danger }}>{conflicts} conflict</span>}
              </div>
            </div>
          );
        })}
      </div>

      {/* Goal banner */}
      <div style={{ margin: '0 20px 12px', padding: '10px 14px', borderRadius: 13, background: theme.primaryDim, border: `1px solid ${theme.primary}33`, display: 'flex', alignItems: 'center', gap: 8 }}>
        {React.createElement(window.lucide.Target, { size: 14, color: theme.primary })}
        <span style={{ fontSize: 12, color: theme.primary, fontWeight: 700 }}>Goal: {list.goal}</span>
      </div>

      {/* Summary */}
      <div style={{ margin: '0 20px 14px', padding: '14px 16px', borderRadius: 16, background: theme.surface, border: `1px solid ${theme.border}` }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: theme.textSecondary, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 10 }}>Compatibility Summary</div>
        <div style={{ display: 'flex', gap: 10 }}>
          {[
            { label: 'Ready to Buy', count: list.items.filter(i => i.status === 'ready').length, color: theme.primary },
            { label: 'Check Size', count: list.items.filter(i => i.status === 'warning').length, color: theme.warning },
            { label: 'Conflicts', count: list.items.filter(i => i.status === 'conflict').length, color: theme.danger },
          ].map((s, i) => (
            <div key={i} style={{ flex: 1, textAlign: 'center', padding: '10px 4px', borderRadius: 12, background: `${s.color}14` }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: s.color, lineHeight: 1 }}>{s.count}</div>
              <div style={{ fontSize: 9, fontWeight: 700, color: s.color, marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Items */}
      <div style={{ padding: '0 20px' }}>
        {list.items.map((item, i) => {
          const checked = checkedItems[`${activeList}-${i}`];
          const fc = fitColor(item.fit);
          return (
            <div key={i} style={{ marginBottom: 10, padding: '13px 14px', borderRadius: 16, background: theme.surface, border: `1px solid ${item.status === 'conflict' ? theme.danger + '44' : item.status === 'warning' ? theme.warning + '33' : theme.border}`, opacity: checked ? 0.55 : 1, transition: 'opacity 0.2s' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                <div onClick={() => toggleCheck(i)} style={{ width: 20, height: 20, borderRadius: 6, border: `2px solid ${checked ? theme.primary : theme.border}`, background: checked ? theme.primary : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0, marginTop: 1, transition: 'all 0.2s' }}>
                  {checked && React.createElement(window.lucide.Check, { size: 12, color: '#fff', strokeWidth: 3 })}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 5 }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: theme.text, textDecoration: checked ? 'line-through' : 'none' }}>{item.name}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 7 }}>
                    <span style={{ fontSize: 14, fontWeight: 800, color: theme.text }}>{item.price}</span>
                    <FitBar pct={item.fit} theme={theme} />
                  </div>
                  {item.note && (
                    <div style={{ padding: '7px 10px', borderRadius: 9, background: item.status === 'conflict' ? theme.dangerDim : item.status === 'warning' ? theme.warningDim : theme.primaryDim, display: 'flex', gap: 6, alignItems: 'flex-start' }}>
                      {React.createElement(
                        item.status === 'conflict' ? window.lucide.XCircle : item.status === 'warning' ? window.lucide.AlertTriangle : window.lucide.CheckCircle,
                        { size: 11, color: fc, style: { marginTop: 1, flexShrink: 0 } }
                      )}
                      <span style={{ fontSize: 10, color: fc, lineHeight: 1.4 }}>{item.note}</span>
                    </div>
                  )}
                </div>
                <div style={{ width: 30, height: 30, borderRadius: 10, background: theme.primaryDim, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}>
                  {React.createElement(window.lucide.ExternalLink, { size: 13, color: theme.primary })}
                </div>
              </div>
            </div>
          );
        })}
        <div style={{ height: 50, borderRadius: 16, background: `linear-gradient(135deg, ${theme.primary} 0%, #00C49A 100%)`, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, cursor: 'pointer', boxShadow: `0 8px 24px ${theme.primaryGlow}` }}>
          {React.createElement(window.lucide.ShoppingBag, { size: 18, color: '#fff' })}
          <span style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>Buy {readyCount} Ready Items</span>
        </div>
      </div>
    </div>
  );
}

function SettingsScreen({ theme, isDark, setIsDark }) {
  const [notifications, setNotifications] = useState(true);
  const [autoScan, setAutoScan] = useState(false);
  const [conflictAlerts, setConflictAlerts] = useState(true);

  const Toggle = ({ value, onChange }) => (
    <div onClick={() => onChange(!value)} style={{ width: 42, height: 24, borderRadius: 12, background: value ? theme.primary : theme.border, position: 'relative', cursor: 'pointer', transition: 'background 0.25s', flexShrink: 0 }}>
      <div style={{ position: 'absolute', top: 3, left: value ? 21 : 3, width: 18, height: 18, borderRadius: 9, background: '#fff', transition: 'left 0.25s', boxShadow: '0 1px 4px rgba(0,0,0,0.25)' }} />
    </div>
  );

  const Row = ({ icon, label, sub, right, danger }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 13, padding: '13px 0', borderBottom: `1px solid ${theme.border}` }}>
      <div style={{ width: 34, height: 34, borderRadius: 11, background: danger ? theme.dangerDim : theme.surface2, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        {React.createElement(icon, { size: 15, color: danger ? theme.danger : theme.primary })}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: danger ? theme.danger : theme.text }}>{label}</div>
        {sub && <div style={{ fontSize: 11, color: theme.textSecondary, marginTop: 1 }}>{sub}</div>}
      </div>
      {right}
    </div>
  );

  return (
    <div style={{ paddingTop: 58, paddingBottom: 20, minHeight: '100%', background: theme.bg }}>
      <div style={{ padding: '16px 20px 16px' }}>
        <div style={{ fontSize: 22, fontWeight: 800, color: theme.text }}>Settings</div>
      </div>

      {/* Profile */}
      <div style={{ margin: '0 20px 18px', padding: '18px', borderRadius: 22, background: `linear-gradient(135deg, ${theme.primaryDim}, ${theme.secondaryDim})`, border: `1px solid ${theme.border}` }}>
        <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 14 }}>
          <div style={{ width: 54, height: 54, borderRadius: 27, background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0 }}>👩</div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 800, color: theme.text }}>Sarah Johnson</div>
            <div style={{ fontSize: 12, color: theme.textSecondary, marginBottom: 5 }}>sarah@email.com</div>
            <div style={{ display: 'inline-flex', padding: '2px 10px', borderRadius: 10, background: theme.primaryDim }}>
              <span style={{ fontSize: 10, fontWeight: 800, color: theme.primary }}>PRO MEMBER</span>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          {[{ label: 'Rooms', value: '4' }, { label: 'Items', value: '47' }, { label: 'Lists', value: '3' }, { label: 'Scans', value: '12' }].map((s, i) => (
            <div key={i} style={{ flex: 1, textAlign: 'center', padding: '9px 4px', borderRadius: 12, background: theme.surface }}>
              <div style={{ fontSize: 17, fontWeight: 800, color: theme.primary }}>{s.value}</div>
              <div style={{ fontSize: 9, color: theme.textSecondary, fontWeight: 600, marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: '0 20px' }}>
        {/* Appearance */}
        <div style={{ fontSize: 10, fontWeight: 800, color: theme.textSecondary, textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 4 }}>Appearance</div>
        <div style={{ background: theme.surface, borderRadius: 18, padding: '0 14px', border: `1px solid ${theme.border}`, marginBottom: 18 }}>
          <Row icon={isDark ? window.lucide.Moon : window.lucide.Sun} label="Theme" sub={isDark ? 'Dark mode active' : 'Light mode active'} right={<Toggle value={isDark} onChange={setIsDark} />} />
          <Row icon={window.lucide.Bell} label="Notifications" sub="Deals, restocks & recommendations" right={<Toggle value={notifications} onChange={setNotifications} />} />
          <div style={{ borderBottom: 'none' }}>
            <Row icon={window.lucide.AlertTriangle} label="Conflict Alerts" sub="Warn before adding incompatible items" right={<Toggle value={conflictAlerts} onChange={setConflictAlerts} />} />
          </div>
        </div>

        {/* Your Space */}
        <div style={{ fontSize: 10, fontWeight: 800, color: theme.textSecondary, textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 4 }}>Your Space</div>
        <div style={{ background: theme.surface, borderRadius: 18, padding: '0 14px', border: `1px solid ${theme.border}`, marginBottom: 18 }}>
          <Row icon={window.lucide.Home} label="Home Profile" sub="Apartment · 850 sq ft · Renter" right={React.createElement(window.lucide.ChevronRight, { size: 15, color: theme.textMuted })} />
          <Row icon={window.lucide.Ruler} label="Default Units" sub="Imperial (inches & feet)" right={React.createElement(window.lucide.ChevronRight, { size: 15, color: theme.textMuted })} />
          <div style={{ borderBottom: 'none' }}>
            <Row icon={window.lucide.Zap} label="Auto-Scan Items" sub="Detect items from receipt photos" right={<Toggle value={autoScan} onChange={setAutoScan} />} />
          </div>
        </div>

        {/* Shopping */}
        <div style={{ fontSize: 10, fontWeight: 800, color: theme.textSecondary, textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 4 }}>Shopping</div>
        <div style={{ background: theme.surface, borderRadius: 18, padding: '0 14px', border: `1px solid ${theme.border}`, marginBottom: 18 }}>
          <Row icon={window.lucide.ShoppingBag} label="Connected Stores" sub="Amazon, Target, IKEA linked" right={React.createElement(window.lucide.ChevronRight, { size: 15, color: theme.textMuted })} />
          <div style={{ borderBottom: 'none' }}>
            <Row icon={window.lucide.Receipt} label="Import Receipts" sub="Scan to add purchased items" right={React.createElement(window.lucide.ChevronRight, { size: 15, color: theme.textMuted })} />
          </div>
        </div>

        {/* Account */}
        <div style={{ background: theme.surface, borderRadius: 18, padding: '0 14px', border: `1px solid ${theme.border}` }}>
          <Row icon={window.lucide.Info} label="About ShelfSwap" sub="Version 1.2.0 · Privacy Policy" right={React.createElement(window.lucide.ChevronRight, { size: 15, color: theme.textMuted })} />
          <div style={{ borderBottom: 'none', paddingBottom: 2 }}>
            <Row icon={window.lucide.LogOut} label="Sign Out" sub={null} right={null} danger={true} />
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isDark, setIsDark] = useState(true);
  const theme = isDark ? themes.dark : themes.light;

  const tabs = [
    { id: 'home', label: 'Home', icon: window.lucide.Home },
    { id: 'scan', label: 'Scan', icon: window.lucide.Camera },
    { id: 'inventory', label: 'Inventory', icon: window.lucide.Package },
    { id: 'lists', label: 'Lists', icon: window.lucide.ShoppingCart },
    { id: 'settings', label: 'Settings', icon: window.lucide.Settings },
  ];

  const screens = {
    home: HomeScreen,
    scan: ScanScreen,
    inventory: InventoryScreen,
    lists: ListsScreen,
    settings: SettingsScreen,
  };

  return (
    <div style={{ minHeight: '100vh', background: '#e8e8e8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { display: none; }
        * { scrollbar-width: none; }
      `}</style>

      <div style={{ width: 375, height: 812, background: theme.bg, borderRadius: 52, overflow: 'hidden', position: 'relative', boxShadow: '0 60px 120px rgba(0,0,0,0.45), 0 0 0 10px #1a1a1a, 0 0 0 11px #333', transition: 'background 0.3s ease' }}>

        {/* Dynamic Island */}
        <div style={{ position: 'absolute', top: 13, left: '50%', transform: 'translateX(-50%)', width: 122, height: 36, background: '#000', borderRadius: 20, zIndex: 100 }} />

        {/* Status Bar */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 54, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', padding: '17px 28px 0', zIndex: 98, pointerEvents: 'none' }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: theme.text }}>9:41</span>
          <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
            {React.createElement(window.lucide.Wifi, { size: 13, color: theme.text, strokeWidth: 2 })}
            {React.createElement(window.lucide.Signal, { size: 13, color: theme.text, strokeWidth: 2 })}
            {React.createElement(window.lucide.Battery, { size: 15, color: theme.text, strokeWidth: 2 })}
          </div>
        </div>

        {/* Screen Content */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 68, overflowY: 'auto' }}>
          {React.createElement(screens[activeTab], { theme, setActiveTab, isDark, setIsDark })}
        </div>

        {/* Bottom Nav */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 68, background: theme.navBg, borderTop: `1px solid ${theme.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-around', padding: '0 4px 6px', transition: 'background 0.3s ease' }}>
          {tabs.map(tab => (
            <div key={tab.id} onClick={() => setActiveTab(tab.id)}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, cursor: 'pointer', padding: '6px 10px', borderRadius: 14, background: activeTab === tab.id ? theme.primaryDim : 'transparent', transition: 'all 0.2s' }}>
              {React.createElement(tab.icon, { size: 22, color: activeTab === tab.id ? theme.primary : theme.textSecondary, strokeWidth: activeTab === tab.id ? 2.5 : 1.8 })}
              <span style={{ fontSize: 10, fontWeight: activeTab === tab.id ? 700 : 500, color: activeTab === tab.id ? theme.primary : theme.textSecondary }}>{tab.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
