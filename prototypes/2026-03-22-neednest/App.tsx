const { useState, useEffect } = React;

const themes = {
  dark: {
    bg: '#0B0E1A',
    surface: '#141826',
    surfaceAlt: '#1B2135',
    surfaceHigh: '#222A42',
    accent: '#10E5B1',
    accentDim: 'rgba(16,229,177,0.12)',
    text: '#EEF2FF',
    textSub: '#8892B3',
    textMuted: '#4D5475',
    border: '#1E2540',
    warning: '#FFB347',
    warningLight: 'rgba(255,179,71,0.12)',
    danger: '#FF6868',
    dangerLight: 'rgba(255,104,104,0.12)',
    success: '#10E5B1',
    successLight: 'rgba(16,229,177,0.12)',
    info: '#5BA3FF',
    infoLight: 'rgba(91,163,255,0.12)',
  },
  light: {
    bg: '#EDF1FA',
    surface: '#FFFFFF',
    surfaceAlt: '#F4F7FF',
    surfaceHigh: '#EBF0FF',
    accent: '#00A87A',
    accentDim: 'rgba(0,168,122,0.1)',
    text: '#0F1117',
    textSub: '#4E5678',
    textMuted: '#9AA0C0',
    border: '#DDE4F5',
    warning: '#D97706',
    warningLight: 'rgba(217,119,6,0.1)',
    danger: '#DC2626',
    dangerLight: 'rgba(220,38,38,0.1)',
    success: '#00A87A',
    successLight: 'rgba(0,168,122,0.1)',
    info: '#2070CC',
    infoLight: 'rgba(32,112,204,0.1)',
  },
};

const itemsData = [
  { id: 1, name: 'Coffee Beans', cat: 'Kitchen', emoji: '☕', daysLeft: 1, pct: 8, remaining: '~120g left', urgency: 'critical', avgUsage: '2 cups/day', nextBuy: 'Tomorrow', lastBought: '3 wks ago' },
  { id: 2, name: 'Toothpaste', cat: 'Bathroom', emoji: '🦷', daysLeft: 2, pct: 12, remaining: '~15% tube', urgency: 'critical', avgUsage: 'Daily', nextBuy: 'Wed', lastBought: '6 wks ago' },
  { id: 3, name: 'Laundry Detergent', cat: 'Cleaning', emoji: '🧺', daysLeft: 3, pct: 15, remaining: '6 loads', urgency: 'high', avgUsage: '2 loads/wk', nextBuy: 'Thu', lastBought: '2 mos ago' },
  { id: 4, name: 'Greek Yogurt', cat: 'Kitchen', emoji: '🥛', daysLeft: 4, pct: 28, remaining: '1.5 cups', urgency: 'medium', avgUsage: '½ cup/day', nextBuy: 'Fri', lastBought: '1 wk ago' },
  { id: 5, name: 'Dish Soap', cat: 'Cleaning', emoji: '🫧', daysLeft: 5, pct: 25, remaining: '~25% bottle', urgency: 'medium', avgUsage: 'Daily', nextBuy: 'Sat', lastBought: '5 wks ago' },
  { id: 6, name: 'Paper Towels', cat: 'Cleaning', emoji: '🧻', daysLeft: 8, pct: 40, remaining: '1 roll', urgency: 'medium', avgUsage: '½ roll/wk', nextBuy: 'Mar 30', lastBought: '1 mo ago' },
  { id: 7, name: 'Hand Soap', cat: 'Bathroom', emoji: '🫱', daysLeft: 9, pct: 45, remaining: '45%', urgency: 'low', avgUsage: 'Daily', nextBuy: 'Apr 1', lastBought: '6 wks ago' },
  { id: 8, name: 'Shampoo', cat: 'Bathroom', emoji: '🧴', daysLeft: 12, pct: 55, remaining: '55%', urgency: 'low', avgUsage: 'Every other day', nextBuy: 'Apr 3', lastBought: '2 mos ago' },
  { id: 9, name: 'Olive Oil', cat: 'Kitchen', emoji: '🫙', daysLeft: 14, pct: 60, remaining: '60%', urgency: 'low', avgUsage: '2 tbsp/day', nextBuy: 'Apr 5', lastBought: '6 wks ago' },
  { id: 10, name: 'White Rice', cat: 'Kitchen', emoji: '🍚', daysLeft: 20, pct: 72, remaining: '2 lbs', urgency: 'low', avgUsage: '½ cup/day', nextBuy: 'Apr 10', lastBought: '3 wks ago' },
];

const shopData = [
  {
    id: 1, name: 'Coffee Beans', emoji: '☕', daysLeft: 1, urgency: 'critical',
    options: [
      { size: '12 oz bag', price: 10.99, unitPrice: 0.92, store: 'Amazon', badge: 'Subscribe & Save', delivery: 'Same-day delivery', recommended: false, storeEmoji: '📦' },
      { size: '2 lb bag', price: 17.49, unitPrice: 0.55, store: 'Costco', badge: 'Best Unit Price', delivery: 'Tomorrow', recommended: true, storeEmoji: '🏪' },
      { size: '8 oz bag', price: 7.99, unitPrice: 1.00, store: 'Kroger', badge: 'Pickup in 1hr', delivery: 'Pickup', recommended: false, storeEmoji: '🛒' },
    ],
  },
  {
    id: 2, name: 'Laundry Detergent', emoji: '🧺', daysLeft: 3, urgency: 'high',
    options: [
      { size: '32 pods', price: 12.99, unitPrice: 0.41, store: 'Target', badge: 'Best Value', delivery: 'Tomorrow', recommended: true, storeEmoji: '🎯' },
      { size: '57 pods', price: 19.99, unitPrice: 0.35, store: 'Costco', badge: 'Best Unit Price', delivery: '2 days', recommended: false, storeEmoji: '🏪' },
      { size: '16 pods', price: 8.49, unitPrice: 0.53, store: 'CVS', badge: 'Pickup Now', delivery: 'In-store', recommended: false, storeEmoji: '💊' },
    ],
  },
  {
    id: 3, name: 'Toothpaste', emoji: '🦷', daysLeft: 2, urgency: 'critical',
    options: [
      { size: '2-pack 6.4oz', price: 8.49, unitPrice: 0.66, store: 'Amazon', badge: 'Best Value', delivery: 'Tomorrow', recommended: true, storeEmoji: '📦' },
      { size: '1x 6.4oz', price: 4.49, unitPrice: 0.70, store: 'CVS', badge: 'Pickup Today', delivery: 'Pickup 30 min', recommended: false, storeEmoji: '💊' },
      { size: '3-pack', price: 10.99, unitPrice: 0.57, store: 'Walmart', badge: 'Best Unit Price', delivery: '2 days', recommended: false, storeEmoji: '🛒' },
    ],
  },
];

const alertsData = [
  { id: 1, type: 'critical', emoji: '☕', title: 'Coffee runs out tomorrow!', body: "At current usage (2 cups/day), you'll run out by Tuesday morning. Order tonight for same-day delivery or schedule a store pickup.", time: '30 min ago', action: 'Order Now' },
  { id: 2, type: 'critical', emoji: '🦷', title: 'Toothpaste — 2 days left', body: "You usually buy Colgate Total. It's $4.49 at CVS now (pickup today) or $8.49 for a 2-pack on Amazon — better value per oz.", time: '2 hrs ago', action: 'Add to Cart' },
  { id: 3, type: 'warning', emoji: '🧺', title: 'Order detergent before Thursday', body: "You do laundry Mon & Thu. With only 6 loads left, you need a refill by Thursday morning — today is the last day for guaranteed delivery.", time: '4 hrs ago', action: 'View Options' },
  { id: 4, type: 'tip', emoji: '📸', title: 'Scan your latest receipt', body: "You made a Target purchase yesterday. Import the receipt to update your inventory and improve depletion predictions automatically.", time: 'Yesterday', action: 'Scan Receipt' },
  { id: 5, type: 'info', emoji: '✈️', title: 'Vacation mode available', body: "Heading somewhere Mar 29–Apr 5? Enable vacation mode to pause all reminders and recalculate timelines around your absence.", time: 'Yesterday', action: 'Set Schedule' },
];

function App() {
  const [dark, setDark] = useState(true);
  const T = dark ? themes.dark : themes.light;

  const [tab, setTab] = useState('home');
  const [catFilter, setCatFilter] = useState('All');
  const [searchQ, setSearchQ] = useState('');
  const [expandedShop, setExpandedShop] = useState(null);
  const [addedToCart, setAddedToCart] = useState({});
  const [routineMode, setRoutineMode] = useState('normal');
  const [notifs, setNotifs] = useState({ push: true, email: false, sms: true });
  const [dismissed, setDismissed] = useState([]);
  const [scanning, setScanning] = useState(false);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    if (!document.getElementById('nn-font')) {
      const link = document.createElement('link');
      link.id = 'nn-font';
      link.href = 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap';
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }
  }, []);

  const ic = (name, props = {}) => {
    const Icon = window.lucide && window.lucide[name];
    if (!Icon) return null;
    return React.createElement(Icon, { size: 20, strokeWidth: 2, ...props });
  };

  const urgColor = (u) => u === 'critical' ? T.danger : u === 'high' ? T.warning : u === 'medium' ? T.info : T.textSub;
  const urgBg = (u) => u === 'critical' ? T.dangerLight : u === 'high' ? T.warningLight : u === 'medium' ? T.infoLight : T.accentDim;
  const depColor = (p) => p < 20 ? T.danger : p < 40 ? T.warning : p < 60 ? T.info : T.success;

  const cartCount = Object.values(addedToCart).filter(Boolean).length;
  const addToCart = (id) => setAddedToCart(c => ({ ...c, [id]: true }));
  const activeAlerts = alertsData.filter(a => !dismissed.includes(a.id));

  const handleScan = () => {
    setScanning(true);
    setScanned(false);
    setTimeout(() => { setScanning(false); setScanned(true); }, 2400);
  };

  // ── STATUS BAR
  const StatusBar = () => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 24px 6px', flexShrink: 0, position: 'relative' }}>
      <span style={{ fontSize: 14, fontWeight: 700, color: T.text }}>9:41</span>
      <div style={{ width: 126, height: 37, background: '#000', borderRadius: 20, position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: 6, zIndex: 10 }} />
      <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
        <svg width="15" height="11" viewBox="0 0 15 11" fill="none">
          <rect x="0" y="5" width="2.5" height="6" rx="1" fill={T.text} opacity="0.35"/>
          <rect x="4" y="3" width="2.5" height="8" rx="1" fill={T.text} opacity="0.6"/>
          <rect x="8" y="1" width="2.5" height="10" rx="1" fill={T.text} opacity="0.85"/>
          <rect x="12" y="0" width="2.5" height="11" rx="1" fill={T.text}/>
        </svg>
        <svg width="16" height="12" viewBox="0 0 16 12">
          <path d="M8 2.4C5.3 2.4 2.9 3.5 1.2 5.3L0 4C2.1 1.5 5.1 0 8 0s5.9 1.5 8 4l-1.2 1.3C13.1 3.5 10.7 2.4 8 2.4z" fill={T.text} opacity="0.4"/>
          <path d="M8 5.5c-1.8 0-3.4.8-4.5 2L2.3 6.2C3.7 4.5 5.7 3.5 8 3.5s4.3 1 5.7 2.7L12.5 7.5C11.4 6.3 9.8 5.5 8 5.5z" fill={T.text} opacity="0.7"/>
          <circle cx="8" cy="10.5" r="1.5" fill={T.text}/>
        </svg>
        <div style={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <div style={{ width: 23, height: 11, borderRadius: 3, border: `1.5px solid ${T.text}`, padding: 1.5, display: 'flex', alignItems: 'center' }}>
            <div style={{ width: '78%', height: '100%', borderRadius: 1.5, background: T.success }} />
          </div>
          <div style={{ width: 2, height: 5, borderRadius: 1, background: T.text, opacity: 0.7 }} />
        </div>
      </div>
    </div>
  );

  // ── HOME SCREEN
  const HomeScreen = () => {
    const urgentItems = itemsData.filter(i => i.urgency === 'critical' || i.urgency === 'high');
    const soonItems = itemsData.filter(i => i.daysLeft <= 8).slice(0, 3);
    const estCart = shopData.reduce((s, i) => s + (i.options.find(o => o.recommended)?.price || 0), 0);

    return (
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 16 }}>
        {/* Header */}
        <div style={{ padding: '4px 20px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontSize: 12, color: T.textSub, fontWeight: 500, marginBottom: 2 }}>Sunday, Mar 22</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: T.text, lineHeight: 1.25 }}>
              Good morning,{' '}
              <span style={{ color: T.accent }}>Sarah 👋</span>
            </div>
          </div>
          <div style={{ position: 'relative', marginTop: 6 }}>
            {ic('Bell', { size: 22, color: T.textSub })}
            {activeAlerts.length > 0 && (
              <div style={{ position: 'absolute', top: -2, right: -2, width: 8, height: 8, borderRadius: 4, background: T.danger }} />
            )}
          </div>
        </div>

        {/* Stat strip */}
        <div style={{ margin: '0 16px 14px', display: 'flex', gap: 8 }}>
          {[
            { val: urgentItems.length, label: 'Need Soon', color: T.danger, bg: T.dangerLight },
            { val: `$${estCart.toFixed(0)}`, label: 'Est. Cart', color: T.accent, bg: T.accentDim },
            { val: itemsData.length, label: 'Tracked', color: T.info, bg: T.infoLight },
          ].map(s => (
            <div key={s.label} style={{ flex: 1, background: s.bg, borderRadius: 14, padding: '10px 8px', textAlign: 'center', border: `1px solid ${s.color}22` }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: s.color }}>{s.val}</div>
              <div style={{ fontSize: 10, color: T.textSub, fontWeight: 600, marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Running low */}
        <div style={{ padding: '0 16px', marginBottom: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: T.text, display: 'flex', alignItems: 'center', gap: 6 }}>
              {ic('AlertTriangle', { size: 15, color: T.danger })}
              Running Low
            </div>
            <div onClick={() => setTab('pantry')} style={{ fontSize: 12, color: T.accent, fontWeight: 600, cursor: 'pointer' }}>See all →</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {urgentItems.map(item => (
              <div key={item.id} style={{ background: T.surface, borderRadius: 14, padding: '11px 13px', border: `1px solid ${T.border}`, display: 'flex', alignItems: 'center', gap: 11 }}>
                <div style={{ fontSize: 20, width: 38, height: 38, background: urgBg(item.urgency), borderRadius: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{item.emoji}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: T.text }}>{item.name}</div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: urgColor(item.urgency) }}>
                      {item.daysLeft === 1 ? 'Tomorrow!' : `${item.daysLeft}d left`}
                    </div>
                  </div>
                  <div style={{ height: 4, borderRadius: 2, background: T.surfaceHigh, overflow: 'hidden' }}>
                    <div style={{ width: `${item.pct}%`, height: '100%', borderRadius: 2, background: depColor(item.pct) }} />
                  </div>
                  <div style={{ fontSize: 10, color: T.textSub, marginTop: 4 }}>{item.remaining} · {item.avgUsage}</div>
                </div>
                <div
                  onClick={() => addToCart(item.id)}
                  style={{ width: 32, height: 32, borderRadius: 10, background: addedToCart[item.id] ? T.success : T.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0, transition: 'background 0.2s' }}
                >
                  {ic(addedToCart[item.id] ? 'Check' : 'Plus', { size: 15, color: dark ? '#0B0E1A' : '#fff' })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick actions */}
        <div style={{ padding: '0 16px', marginBottom: 14 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: T.text, marginBottom: 10 }}>Quick Actions</div>
          <div style={{ display: 'flex', gap: 8 }}>
            {[
              { icon: 'Camera', label: 'Scan Shelf', cb: () => { setTab('pantry'); handleScan(); } },
              { icon: 'Receipt', label: 'Import Receipt', cb: () => {} },
              { icon: 'Plus', label: 'Add Item', cb: () => setTab('pantry') },
            ].map(btn => (
              <div
                key={btn.label}
                onClick={btn.cb}
                style={{ flex: 1, background: T.surface, border: `1px solid ${T.border}`, borderRadius: 14, padding: '12px 6px', textAlign: 'center', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7 }}
              >
                {ic(btn.icon, { size: 18, color: T.accent })}
                <div style={{ fontSize: 11, fontWeight: 600, color: T.text }}>{btn.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Coming this week */}
        <div style={{ padding: '0 16px' }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: T.text, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
            {ic('Calendar', { size: 15, color: T.textSub })}
            Coming This Week
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {soonItems.map(item => (
              <div key={item.id} style={{ flex: 1, background: T.surface, border: `1px solid ${T.border}`, borderRadius: 14, padding: '10px 8px', textAlign: 'center' }}>
                <div style={{ fontSize: 22, marginBottom: 5 }}>{item.emoji}</div>
                <div style={{ fontSize: 11, fontWeight: 700, color: T.text, lineHeight: 1.3 }}>{item.name}</div>
                <div style={{ fontSize: 10, color: urgColor(item.urgency), fontWeight: 600, marginTop: 3 }}>by {item.nextBuy}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // ── PANTRY SCREEN
  const PantryScreen = () => {
    const cats = ['All', 'Kitchen', 'Cleaning', 'Bathroom'];
    const filtered = itemsData.filter(i =>
      (catFilter === 'All' || i.cat === catFilter) &&
      (searchQ === '' || i.name.toLowerCase().includes(searchQ.toLowerCase()))
    );
    return (
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 16 }}>
        <div style={{ padding: '4px 20px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: 20, fontWeight: 800, color: T.text }}>My Pantry</div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            {scanning && <div style={{ fontSize: 11, color: T.accent, fontWeight: 600 }}>Scanning…</div>}
            {!scanning && scanned && (
              <div style={{ fontSize: 11, color: T.success, fontWeight: 600, display: 'flex', gap: 4, alignItems: 'center' }}>
                {ic('Check', { size: 13, color: T.success })} Imported
              </div>
            )}
            <div onClick={handleScan} style={{ width: 34, height: 34, borderRadius: 10, background: T.accentDim, border: `1px solid ${T.accent}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              {ic('ScanLine', { size: 16, color: T.accent })}
            </div>
            <div style={{ width: 34, height: 34, borderRadius: 10, background: T.accentDim, border: `1px solid ${T.accent}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              {ic('Plus', { size: 16, color: T.accent })}
            </div>
          </div>
        </div>

        {/* Search */}
        <div style={{ margin: '0 16px 10px', background: T.surface, border: `1px solid ${T.border}`, borderRadius: 12, display: 'flex', alignItems: 'center', gap: 8, padding: '9px 12px' }}>
          {ic('Search', { size: 15, color: T.textSub })}
          <input
            value={searchQ}
            onChange={e => setSearchQ(e.target.value)}
            placeholder="Search pantry…"
            style={{ flex: 1, background: 'none', border: 'none', outline: 'none', fontSize: 13, color: T.text, fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          />
        </div>

        {/* Category pills */}
        <div style={{ display: 'flex', gap: 6, padding: '0 16px', marginBottom: 12, overflowX: 'auto' }}>
          {cats.map(cat => (
            <div
              key={cat}
              onClick={() => setCatFilter(cat)}
              style={{
                padding: '6px 14px', borderRadius: 20, fontSize: 12, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap',
                background: catFilter === cat ? T.accent : T.surface,
                color: catFilter === cat ? (dark ? '#0B0E1A' : '#fff') : T.textSub,
                border: `1px solid ${catFilter === cat ? T.accent : T.border}`,
                transition: 'all 0.2s',
              }}
            >{cat}</div>
          ))}
        </div>

        {/* Items */}
        <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          {filtered.map(item => (
            <div key={item.id} style={{ background: T.surface, borderRadius: 14, padding: '11px 13px', border: `1px solid ${T.border}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ fontSize: 20, width: 38, height: 38, background: urgBg(item.urgency), borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{item.emoji}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: T.text }}>{item.name}</div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: urgColor(item.urgency) }}>
                      {item.daysLeft === 1 ? '1 day' : `${item.daysLeft} days`}
                    </div>
                  </div>
                  <div style={{ height: 5, borderRadius: 3, background: T.surfaceHigh, overflow: 'hidden', marginBottom: 5 }}>
                    <div style={{ width: `${item.pct}%`, height: '100%', borderRadius: 3, background: depColor(item.pct) }} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ fontSize: 10, color: T.textSub }}>{item.remaining}</div>
                    <div style={{ fontSize: 10, color: T.textMuted }}>{item.cat} · {item.lastBought}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '32px 16px', color: T.textSub }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>🔍</div>
              <div style={{ fontSize: 13, fontWeight: 600 }}>No items found</div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // ── SHOP SCREEN
  const ShopScreen = () => {
    const estTotal = shopData.reduce((s, i) => s + (i.options.find(o => o.recommended)?.price || 0), 0);
    return (
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 16 }}>
        <div style={{ padding: '4px 20px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 20, fontWeight: 800, color: T.text }}>Smart Cart</div>
            <div style={{ fontSize: 12, color: T.textSub, marginTop: 1 }}>Best buys for your usage</div>
          </div>
          <div style={{ position: 'relative' }}>
            <div style={{ width: 38, height: 38, borderRadius: 12, background: T.accentDim, border: `1px solid ${T.accent}40`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {ic('ShoppingCart', { size: 17, color: T.accent })}
            </div>
            {cartCount > 0 && (
              <div style={{ position: 'absolute', top: -4, right: -4, minWidth: 16, height: 16, borderRadius: 8, background: T.danger, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 800, color: '#fff', padding: '0 3px' }}>{cartCount}</div>
            )}
          </div>
        </div>

        {/* Add-all banner */}
        <div style={{ margin: '0 16px 14px', background: `linear-gradient(135deg, ${T.accentDim}, ${T.infoLight})`, border: `1px solid ${T.accent}40`, borderRadius: 14, padding: '13px 15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: T.text }}>Add all recommended items</div>
            <div style={{ fontSize: 11, color: T.textSub, marginTop: 2 }}>Est. total: <b style={{ color: T.accent }}>${estTotal.toFixed(2)}</b></div>
          </div>
          <div
            onClick={() => shopData.forEach(i => addToCart(i.id))}
            style={{ background: T.accent, borderRadius: 10, padding: '8px 14px', fontSize: 12, fontWeight: 700, color: dark ? '#0B0E1A' : '#fff', cursor: 'pointer', flexShrink: 0 }}
          >
            Add All
          </div>
        </div>

        {/* Shop items */}
        <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {shopData.map(item => (
            <div key={item.id} style={{ background: T.surface, borderRadius: 16, border: `1px solid ${T.border}`, overflow: 'hidden' }}>
              <div
                onClick={() => setExpandedShop(expandedShop === item.id ? null : item.id)}
                style={{ padding: '12px 13px', display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}
              >
                <div style={{ fontSize: 20, width: 38, height: 38, background: urgBg(item.urgency), borderRadius: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{item.emoji}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: T.text }}>{item.name}</div>
                  <div style={{ fontSize: 11, color: urgColor(item.urgency), fontWeight: 600, marginTop: 1 }}>
                    {item.daysLeft === 1 ? 'Runs out tomorrow!' : `Runs out in ${item.daysLeft} days`}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <div
                    onClick={(e) => { e.stopPropagation(); addToCart(item.id); }}
                    style={{ background: addedToCart[item.id] ? T.success : T.accent, borderRadius: 10, padding: '6px 12px', fontSize: 11, fontWeight: 700, color: dark ? '#0B0E1A' : '#fff', cursor: 'pointer', transition: 'background 0.2s', flexShrink: 0 }}
                  >
                    {addedToCart[item.id] ? '✓ Added' : 'Add'}
                  </div>
                  {ic(expandedShop === item.id ? 'ChevronUp' : 'ChevronDown', { size: 16, color: T.textSub })}
                </div>
              </div>
              {expandedShop === item.id && (
                <div style={{ borderTop: `1px solid ${T.border}`, padding: '10px 13px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {item.options.map((opt, i) => (
                    <div key={i} style={{ background: opt.recommended ? T.accentDim : T.surfaceAlt, borderRadius: 12, padding: '10px 12px', border: `1px solid ${opt.recommended ? T.accent + '44' : T.border}`, display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ fontSize: 18, flexShrink: 0 }}>{opt.storeEmoji}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 3, flexWrap: 'wrap' }}>
                          <div style={{ fontSize: 12, fontWeight: 700, color: T.text }}>{opt.size}</div>
                          <div style={{ fontSize: 10, fontWeight: 600, padding: '2px 7px', borderRadius: 8, background: opt.recommended ? T.accent : T.surfaceHigh, color: opt.recommended ? (dark ? '#0B0E1A' : '#fff') : T.textSub }}>{opt.badge}</div>
                        </div>
                        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                          <div style={{ fontSize: 13, fontWeight: 800, color: T.text }}>${opt.price}</div>
                          <div style={{ fontSize: 10, color: T.textSub }}>${opt.unitPrice.toFixed(2)}/unit</div>
                          <div style={{ fontSize: 10, color: T.textMuted }}>· {opt.store}</div>
                        </div>
                        <div style={{ fontSize: 10, color: T.info, marginTop: 2, fontWeight: 500 }}>{opt.delivery}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ── ALERTS SCREEN
  const AlertsScreen = () => {
    const typeColor = (t) => t === 'critical' ? T.danger : t === 'warning' ? T.warning : t === 'tip' ? T.accent : T.info;
    const typeBg = (t) => t === 'critical' ? T.dangerLight : t === 'warning' ? T.warningLight : t === 'tip' ? T.accentDim : T.infoLight;
    return (
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 16 }}>
        <div style={{ padding: '4px 20px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: 20, fontWeight: 800, color: T.text }}>Smart Alerts</div>
          <div style={{ fontSize: 12, fontWeight: 700, color: T.accent }}>{activeAlerts.length} active</div>
        </div>

        {/* Routine mode */}
        <div style={{ margin: '0 16px 14px', background: T.surface, borderRadius: 14, padding: '13px 14px', border: `1px solid ${T.border}` }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: T.textSub, marginBottom: 9 }}>Routine Mode</div>
          <div style={{ display: 'flex', gap: 6 }}>
            {[
              { key: 'normal', label: '🏠 Normal', sub: 'Full alerts' },
              { key: 'vacation', label: '✈️ Vacation', sub: 'Paused' },
              { key: 'reduced', label: '🏃 Away', sub: 'Reduced' },
            ].map(m => (
              <div
                key={m.key}
                onClick={() => setRoutineMode(m.key)}
                style={{ flex: 1, background: routineMode === m.key ? T.accentDim : T.surfaceAlt, border: `1px solid ${routineMode === m.key ? T.accent : T.border}`, borderRadius: 10, padding: '8px 5px', textAlign: 'center', cursor: 'pointer', transition: 'all 0.2s' }}
              >
                <div style={{ fontSize: 11, fontWeight: 700, color: routineMode === m.key ? T.accent : T.text }}>{m.label}</div>
                <div style={{ fontSize: 9, color: T.textSub, marginTop: 2 }}>{m.sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Alerts */}
        <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {activeAlerts.map(alert => (
            <div key={alert.id} style={{ background: T.surface, borderRadius: 16, border: `1px solid ${T.border}`, overflow: 'hidden' }}>
              <div style={{ display: 'flex' }}>
                <div style={{ width: 4, background: typeColor(alert.type), borderRadius: '4px 0 0 4px', flexShrink: 0 }} />
                <div style={{ flex: 1, padding: '12px 12px 12px 10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start', flex: 1, marginRight: 8 }}>
                      <div style={{ fontSize: 18, width: 32, height: 32, background: typeBg(alert.type), borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{alert.emoji}</div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: T.text, lineHeight: 1.35, flex: 1 }}>{alert.title}</div>
                    </div>
                    <div onClick={() => setDismissed(d => [...d, alert.id])} style={{ cursor: 'pointer', padding: 4, flexShrink: 0 }}>
                      {ic('X', { size: 14, color: T.textMuted })}
                    </div>
                  </div>
                  <div style={{ fontSize: 11, color: T.textSub, lineHeight: 1.55, marginBottom: 10, paddingLeft: 40 }}>{alert.body}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingLeft: 40 }}>
                    <div style={{ fontSize: 10, color: T.textMuted }}>{alert.time}</div>
                    <div style={{ background: typeColor(alert.type), borderRadius: 8, padding: '5px 12px', fontSize: 11, fontWeight: 700, color: '#fff', cursor: 'pointer' }}>{alert.action}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {activeAlerts.length === 0 && (
            <div style={{ textAlign: 'center', padding: '44px 20px', color: T.textSub }}>
              <div style={{ fontSize: 38, marginBottom: 10 }}>✅</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: T.text }}>All caught up!</div>
              <div style={{ fontSize: 12, marginTop: 5 }}>No active alerts right now.</div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // ── SETTINGS SCREEN
  const SettingsScreen = () => (
    <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 16 }}>
      <div style={{ padding: '4px 20px 14px' }}>
        <div style={{ fontSize: 20, fontWeight: 800, color: T.text }}>Settings</div>
      </div>

      {/* Profile */}
      <div style={{ margin: '0 16px 12px', background: T.surface, borderRadius: 16, padding: '15px', border: `1px solid ${T.border}` }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <div style={{ width: 52, height: 52, borderRadius: 16, background: `linear-gradient(135deg, ${T.accent}, ${T.info})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>👩</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: T.text }}>Sarah & Alex</div>
            <div style={{ fontSize: 12, color: T.textSub, marginTop: 2 }}>2-person household · San Francisco</div>
            <div style={{ fontSize: 11, color: T.accent, marginTop: 3, fontWeight: 600 }}>Edit Household →</div>
          </div>
        </div>
      </div>

      {/* Theme */}
      <div style={{ margin: '0 16px 12px', background: T.surface, borderRadius: 16, padding: '14px 16px', border: `1px solid ${T.border}` }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: T.textSub, marginBottom: 12 }}>Appearance</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: T.accentDim, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {ic(dark ? 'Moon' : 'Sun', { size: 17, color: T.accent })}
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: T.text }}>{dark ? 'Dark Mode' : 'Light Mode'}</div>
              <div style={{ fontSize: 11, color: T.textSub }}>Currently active</div>
            </div>
          </div>
          <div onClick={() => setDark(d => !d)} style={{ width: 50, height: 29, borderRadius: 15, background: dark ? T.accent : T.border, position: 'relative', cursor: 'pointer', transition: 'background 0.3s', flexShrink: 0 }}>
            <div style={{ width: 23, height: 23, borderRadius: 12, background: '#fff', position: 'absolute', top: 3, left: dark ? 24 : 3, transition: 'left 0.3s', boxShadow: '0 1px 4px rgba(0,0,0,0.22)' }} />
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div style={{ margin: '0 16px 12px', background: T.surface, borderRadius: 16, padding: '14px 16px', border: `1px solid ${T.border}` }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: T.textSub, marginBottom: 12 }}>Notifications</div>
        {[
          { key: 'push', label: 'Push Notifications', sub: 'Depletion alerts & reminders', icon: 'Bell' },
          { key: 'email', label: 'Weekly Digest', sub: 'Summary of upcoming needs', icon: 'Mail' },
          { key: 'sms', label: 'SMS Reminders', sub: 'Urgent-only text alerts', icon: 'MessageSquare' },
        ].map((item, idx) => (
          <div key={item.key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: idx < 2 ? 12 : 0 }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              {ic(item.icon, { size: 16, color: T.textSub })}
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: T.text }}>{item.label}</div>
                <div style={{ fontSize: 10, color: T.textSub }}>{item.sub}</div>
              </div>
            </div>
            <div onClick={() => setNotifs(n => ({ ...n, [item.key]: !n[item.key] }))} style={{ width: 42, height: 24, borderRadius: 12, background: notifs[item.key] ? T.accent : T.border, position: 'relative', cursor: 'pointer', transition: 'background 0.3s', flexShrink: 0 }}>
              <div style={{ width: 18, height: 18, borderRadius: 9, background: '#fff', position: 'absolute', top: 3, left: notifs[item.key] ? 21 : 3, transition: 'left 0.3s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
            </div>
          </div>
        ))}
      </div>

      {/* Connected Stores */}
      <div style={{ margin: '0 16px 12px', background: T.surface, borderRadius: 16, padding: '14px 16px', border: `1px solid ${T.border}` }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: T.textSub, marginBottom: 12 }}>Connected Stores</div>
        {[
          { store: 'Amazon', emoji: '📦', connected: true },
          { store: 'Target', emoji: '🎯', connected: true },
          { store: 'Costco', emoji: '🏪', connected: false },
          { store: 'Instacart', emoji: '🛒', connected: false },
        ].map((s, idx) => (
          <div key={s.store} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: idx < 3 ? 11 : 0 }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <div style={{ fontSize: 20 }}>{s.emoji}</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: T.text }}>{s.store}</div>
            </div>
            <div style={{ fontSize: 12, fontWeight: 700, color: s.connected ? T.success : T.textMuted }}>{s.connected ? '● Connected' : '+ Connect'}</div>
          </div>
        ))}
      </div>

      {/* Monthly impact */}
      <div style={{ margin: '0 16px', background: T.surfaceAlt, borderRadius: 16, padding: '14px 16px', border: `1px solid ${T.border}` }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: T.textSub, marginBottom: 12 }}>Monthly Impact</div>
        <div style={{ display: 'flex', gap: 8 }}>
          {[
            { val: '$43', label: 'Saved', emoji: '💰' },
            { val: '0', label: 'Emergency Runs', emoji: '🏃' },
            { val: '18', label: 'Items Tracked', emoji: '📦' },
          ].map(stat => (
            <div key={stat.label} style={{ flex: 1, background: T.surface, borderRadius: 12, padding: '10px 6px', textAlign: 'center', border: `1px solid ${T.border}` }}>
              <div style={{ fontSize: 20 }}>{stat.emoji}</div>
              <div style={{ fontSize: 16, fontWeight: 800, color: T.accent, marginTop: 4 }}>{stat.val}</div>
              <div style={{ fontSize: 9, color: T.textSub, fontWeight: 600, marginTop: 2, lineHeight: 1.35 }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ── BOTTOM NAV
  const BottomNav = () => {
    const navTabs = [
      { key: 'home', icon: 'Home', label: 'Home' },
      { key: 'pantry', icon: 'Package', label: 'Pantry' },
      { key: 'shop', icon: 'ShoppingCart', label: 'Shop' },
      { key: 'alerts', icon: 'Bell', label: 'Alerts' },
      { key: 'settings', icon: 'Settings', label: 'Settings' },
    ];
    return (
      <div style={{ display: 'flex', background: T.surface, borderTop: `1px solid ${T.border}`, padding: '8px 0 20px', flexShrink: 0 }}>
        {navTabs.map(nt => (
          <div key={nt.key} onClick={() => setTab(nt.key)} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, cursor: 'pointer', padding: '4px 0' }}>
            <div style={{ position: 'relative' }}>
              {ic(nt.icon, { size: 22, color: tab === nt.key ? T.accent : T.textMuted })}
              {nt.key === 'alerts' && activeAlerts.length > 0 && (
                <div style={{ position: 'absolute', top: -2, right: -2, width: 7, height: 7, borderRadius: 4, background: T.danger }} />
              )}
              {nt.key === 'shop' && cartCount > 0 && (
                <div style={{ position: 'absolute', top: -3, right: -5, minWidth: 14, height: 14, borderRadius: 7, background: T.danger, fontSize: 8, fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 3px' }}>{cartCount}</div>
              )}
            </div>
            <div style={{ fontSize: 9, fontWeight: tab === nt.key ? 700 : 500, color: tab === nt.key ? T.accent : T.textMuted, letterSpacing: '0.2px' }}>{nt.label}</div>
            {tab === nt.key && <div style={{ width: 4, height: 4, borderRadius: 2, background: T.accent }} />}
          </div>
        ))}
      </div>
    );
  };

  // ── RENDER
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#E2E7F2', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { display: none; }
        body { background: #E2E7F2; }
        input { color-scheme: ${dark ? 'dark' : 'light'}; }
      `}</style>
      <div style={{
        width: 375,
        height: 812,
        background: T.bg,
        borderRadius: 50,
        overflow: 'hidden',
        position: 'relative',
        boxShadow: '0 40px 100px rgba(0,0,0,0.3), 0 0 0 1px rgba(0,0,0,0.08), inset 0 0 0 1px rgba(255,255,255,0.08)',
        display: 'flex',
        flexDirection: 'column',
        transition: 'background 0.3s',
      }}>
        <StatusBar />
        {tab === 'home' && <HomeScreen />}
        {tab === 'pantry' && <PantryScreen />}
        {tab === 'shop' && <ShopScreen />}
        {tab === 'alerts' && <AlertsScreen />}
        {tab === 'settings' && <SettingsScreen />}
        <BottomNav />
      </div>
    </div>
  );
}
