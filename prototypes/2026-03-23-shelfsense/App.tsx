
function App() {
  const { useState, useEffect, useRef } = React;

  const [activeTab, setActiveTab] = useState('home');
  const [isDark, setIsDark] = useState(false);
  const [scanActive, setScanActive] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanComplete, setScanComplete] = useState(false);
  const [pressedItem, setPressedItem] = useState(null);
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Olive Oil (500ml)', qty: 1, price: 8.99, fits: true },
    { id: 2, name: 'Jasmine Rice (2kg)', qty: 1, price: 5.49, fits: true },
    { id: 3, name: 'Paper Towels (6-pack)', qty: 1, price: 11.99, fits: false },
  ]);
  const [alerts, setAlerts] = useState([
    { id: 1, item: 'Dish Soap', level: 15, read: false },
    { id: 2, item: 'Coffee Pods', level: 8, read: false },
    { id: 3, item: 'Shampoo', level: 22, read: true },
  ]);

  const themes = {
    light: {
      bg: '#F5F6FA',
      surface: '#FFFFFF',
      surface2: '#F0F2F8',
      text: '#1A1D2E',
      textSub: '#6B7280',
      textMuted: '#9CA3AF',
      primary: '#4F8EF7',
      primaryDark: '#2563EB',
      primaryLight: '#EEF4FF',
      accent: '#10D9A0',
      accentLight: '#E6FBF5',
      danger: '#F97316',
      dangerLight: '#FFF3EC',
      border: '#E5E9F2',
      navBg: '#FFFFFF',
      cardShadow: '0 2px 12px rgba(79,142,247,0.08)',
      scanBg: '#0A0F2E',
    },
    dark: {
      bg: '#0D1117',
      surface: '#161B27',
      surface2: '#1E2535',
      text: '#E8ECFA',
      textSub: '#8B95B0',
      textMuted: '#4A5568',
      primary: '#4F8EF7',
      primaryDark: '#3B82F6',
      primaryLight: '#1E2D4A',
      accent: '#10D9A0',
      accentLight: '#0D2E26',
      danger: '#F97316',
      dangerLight: '#2A1A0A',
      border: '#242B3D',
      navBg: '#161B27',
      cardShadow: '0 2px 12px rgba(0,0,0,0.4)',
      scanBg: '#060B1E',
    }
  };

  const t = isDark ? themes.dark : themes.light;

  const fontLink = `@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');`;

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = fontLink + `
      * { box-sizing: border-box; margin: 0; padding: 0; }
      ::-webkit-scrollbar { width: 0px; }
      @keyframes scanLine {
        0% { top: 60px; }
        100% { top: calc(100% - 40px); }
      }
      @keyframes pulse {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.6; transform: scale(1.05); }
      }
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(8px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes slideUp {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      @keyframes progressFill {
        from { width: 0%; }
        to { width: var(--target-width); }
      }
      .screen-content { animation: fadeIn 0.25s ease; }
      .nav-item:active { transform: scale(0.9); }
      .card-press:active { transform: scale(0.97); }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const tabs = [
    { id: 'home', label: 'Home', icon: window.lucide.Home },
    { id: 'scan', label: 'Scan', icon: window.lucide.ScanLine },
    { id: 'lists', label: 'Lists', icon: window.lucide.ShoppingCart },
    { id: 'spaces', label: 'Spaces', icon: window.lucide.Box },
    { id: 'settings', label: 'Settings', icon: window.lucide.Settings2 },
  ];

  const spaces = [
    { id: 1, name: 'Kitchen Pantry', capacity: 68, icon: '🥫', items: 14, color: '#4F8EF7' },
    { id: 2, name: 'Fridge', capacity: 45, icon: '🧊', items: 9, color: '#10D9A0' },
    { id: 3, name: 'Under Sink', capacity: 82, icon: '🧴', items: 6, color: '#F97316' },
    { id: 4, name: 'Laundry Cabinet', capacity: 30, icon: '🧺', items: 4, color: '#A78BFA' },
  ];

  const recommendations = [
    { id: 1, name: 'Dish Soap (500ml)', reason: 'Fits shelf gap exactly', size: '500ml', savings: '$3.20', score: 98, category: 'Cleaning' },
    { id: 2, name: 'Oat Milk (1L × 2)', reason: 'Fridge top shelf space', size: '2×1L', savings: '$1.10', score: 94, category: 'Dairy Alt' },
    { id: 3, name: 'Pasta (500g)', reason: 'Pantry lower shelf', size: '500g', savings: '$0.80', score: 91, category: 'Dry Goods' },
    { id: 4, name: 'Coffee Beans (250g)', reason: 'Counter canister fit', size: '250g', savings: '$2.50', score: 88, category: 'Beverages' },
  ];

  function startScan() {
    setScanActive(true);
    setScanProgress(0);
    setScanComplete(false);
    let prog = 0;
    const interval = setInterval(() => {
      prog += Math.random() * 8 + 3;
      if (prog >= 100) {
        prog = 100;
        clearInterval(interval);
        setTimeout(() => {
          setScanComplete(true);
          setScanActive(false);
        }, 400);
      }
      setScanProgress(Math.min(prog, 100));
    }, 120);
  }

  function HomeScreen() {
    const unreadAlerts = alerts.filter(a => !a.read).length;
    return React.createElement('div', { className: 'screen-content', style: { padding: '0 0 8px' } },
      React.createElement('div', { style: { padding: '20px 20px 0', background: `linear-gradient(160deg, ${t.primary}18, ${t.bg})` } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 } },
          React.createElement('div', null,
            React.createElement('p', { style: { fontSize: 13, color: t.textSub, fontWeight: 500 } }, 'Good morning,'),
            React.createElement('h2', { style: { fontSize: 22, fontWeight: 800, color: t.text, lineHeight: 1.2 } }, 'Alex Chen 👋')
          ),
          React.createElement('div', { style: { position: 'relative', cursor: 'pointer' } },
            React.createElement('div', { style: { width: 40, height: 40, borderRadius: 12, background: t.surface, border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: t.cardShadow } },
              React.createElement(window.lucide.Bell, { size: 18, color: t.textSub })
            ),
            unreadAlerts > 0 && React.createElement('div', { style: { position: 'absolute', top: -4, right: -4, width: 16, height: 16, borderRadius: 8, background: t.danger, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, color: '#fff', fontWeight: 700 } }, unreadAlerts)
          )
        ),
        React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 20 } },
          [
            { label: 'Spaces', value: '4', icon: window.lucide.Box, color: t.primary },
            { label: 'Items', value: '33', icon: window.lucide.Package, color: t.accent },
            { label: 'Saved', value: '$18', icon: window.lucide.TrendingDown, color: '#A78BFA' },
          ].map((stat, i) =>
            React.createElement('div', { key: i, style: { background: t.surface, borderRadius: 14, padding: '12px 10px', textAlign: 'center', boxShadow: t.cardShadow, border: `1px solid ${t.border}` } },
              React.createElement('div', { style: { width: 32, height: 32, borderRadius: 10, background: stat.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 6px' } },
                React.createElement(stat.icon, { size: 16, color: stat.color })
              ),
              React.createElement('div', { style: { fontSize: 18, fontWeight: 800, color: t.text } }, stat.value),
              React.createElement('div', { style: { fontSize: 11, color: t.textSub, fontWeight: 500 } }, stat.label)
            )
          )
        )
      ),
      React.createElement('div', { style: { padding: '0 20px' } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 } },
          React.createElement('h3', { style: { fontSize: 15, fontWeight: 700, color: t.text } }, 'Restock Alerts'),
          React.createElement('span', { style: { fontSize: 12, color: t.primary, fontWeight: 600 } }, 'View all')
        ),
        alerts.slice(0, 2).map(alert =>
          React.createElement('div', { key: alert.id, style: { background: alert.read ? t.surface : t.dangerLight, border: `1px solid ${alert.read ? t.border : t.danger + '30'}`, borderRadius: 14, padding: '12px 14px', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 12 } },
            React.createElement('div', { style: { width: 36, height: 36, borderRadius: 10, background: alert.read ? t.surface2 : t.danger + '20', display: 'flex', alignItems: 'center', justifyContent: 'center' } },
              React.createElement(window.lucide.AlertTriangle, { size: 16, color: alert.read ? t.textSub : t.danger })
            ),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', { style: { fontSize: 13, fontWeight: 700, color: t.text } }, alert.item),
              React.createElement('div', { style: { fontSize: 11, color: t.textSub } }, `${alert.level}% remaining · Restock soon`)
            ),
            React.createElement('div', { style: { width: 32, height: 32, borderRadius: 10, background: t.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' } },
              React.createElement(window.lucide.Plus, { size: 14, color: '#fff' })
            )
          )
        ),
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '18px 0 12px' } },
          React.createElement('h3', { style: { fontSize: 15, fontWeight: 700, color: t.text } }, 'Smart Picks'),
          React.createElement('span', { style: { fontSize: 12, color: t.primary, fontWeight: 600 } }, 'See all')
        ),
        React.createElement('div', { style: { display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 4 } },
          recommendations.slice(0, 3).map(rec =>
            React.createElement('div', { key: rec.id, style: { minWidth: 140, background: t.surface, borderRadius: 16, padding: 14, border: `1px solid ${t.border}`, boxShadow: t.cardShadow, flexShrink: 0 } },
              React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 } },
                React.createElement('span', { style: { fontSize: 10, fontWeight: 600, background: t.primaryLight, color: t.primary, padding: '2px 7px', borderRadius: 6 } }, rec.category),
                React.createElement('span', { style: { fontSize: 10, fontWeight: 700, color: t.accent } }, `${rec.score}%`)
              ),
              React.createElement('div', { style: { fontSize: 13, fontWeight: 700, color: t.text, marginBottom: 4, lineHeight: 1.3 } }, rec.name),
              React.createElement('div', { style: { fontSize: 11, color: t.textSub, marginBottom: 8 } }, rec.reason),
              React.createElement('div', { style: { fontSize: 12, fontWeight: 700, color: '#22C55E' } }, `Save ${rec.savings}`)
            )
          )
        )
      )
    );
  }

  function ScanScreen() {
    return React.createElement('div', { className: 'screen-content', style: { flex: 1, display: 'flex', flexDirection: 'column', background: scanComplete ? t.bg : t.scanBg } },
      !scanComplete && !scanActive && React.createElement('div', { style: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 28 } },
        React.createElement('div', { style: { width: 120, height: 120, borderRadius: 30, background: 'rgba(79,142,247,0.15)', border: '2px solid rgba(79,142,247,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24, animation: 'pulse 2s infinite' } },
          React.createElement(window.lucide.ScanLine, { size: 52, color: t.primary })
        ),
        React.createElement('h2', { style: { fontSize: 22, fontWeight: 800, color: '#E8ECFA', textAlign: 'center', marginBottom: 10 } }, 'Space Scanner'),
        React.createElement('p', { style: { fontSize: 14, color: '#8B95B0', textAlign: 'center', lineHeight: 1.6, marginBottom: 28 } }, 'Point your camera at a shelf, cabinet, or fridge to measure available space and inventory.'),
        React.createElement('div', { style: { width: '100%', marginBottom: 20 } },
          ['Kitchen Pantry', 'Fridge', 'Under Sink', 'Laundry Cabinet'].map((space, i) =>
            React.createElement('div', { key: i, onClick: startScan, className: 'card-press', style: { background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 14, padding: '14px 16px', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' } },
              React.createElement('div', { style: { width: 36, height: 36, borderRadius: 10, background: 'rgba(79,142,247,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' } },
                React.createElement(window.lucide.Camera, { size: 16, color: t.primary })
              ),
              React.createElement('span', { style: { fontSize: 14, fontWeight: 600, color: '#E8ECFA', flex: 1 } }, space),
              React.createElement(window.lucide.ChevronRight, { size: 16, color: '#8B95B0' })
            )
          )
        ),
        React.createElement('button', { onClick: startScan, style: { width: '100%', padding: '16px', background: `linear-gradient(135deg, ${t.primary}, ${t.primaryDark})`, border: 'none', borderRadius: 16, fontSize: 15, fontWeight: 700, color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 } },
          React.createElement(window.lucide.ScanLine, { size: 18 }),
          'Start Scanning'
        )
      ),
      scanActive && React.createElement('div', { style: { flex: 1, position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' } },
        React.createElement('div', { style: { width: '100%', maxWidth: 320, aspectRatio: '4/3', background: 'rgba(255,255,255,0.04)', border: '2px solid rgba(79,142,247,0.6)', borderRadius: 20, position: 'relative', overflow: 'hidden', marginBottom: 24 } },
          React.createElement('div', { style: { position: 'absolute', left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${t.primary}, transparent)`, animation: 'scanLine 1.5s linear infinite', boxShadow: `0 0 20px ${t.primary}` } }),
          React.createElement('div', { style: { position: 'absolute', top: 12, left: 12, width: 24, height: 24, borderTop: `3px solid ${t.primary}`, borderLeft: `3px solid ${t.primary}`, borderRadius: '4px 0 0 0' } }),
          React.createElement('div', { style: { position: 'absolute', top: 12, right: 12, width: 24, height: 24, borderTop: `3px solid ${t.primary}`, borderRight: `3px solid ${t.primary}`, borderRadius: '0 4px 0 0' } }),
          React.createElement('div', { style: { position: 'absolute', bottom: 12, left: 12, width: 24, height: 24, borderBottom: `3px solid ${t.primary}`, borderLeft: `3px solid ${t.primary}`, borderRadius: '0 0 0 4px' } }),
          React.createElement('div', { style: { position: 'absolute', bottom: 12, right: 12, width: 24, height: 24, borderBottom: `3px solid ${t.primary}`, borderRight: `3px solid ${t.primary}`, borderRadius: '0 0 4px 0' } }),
          React.createElement('div', { style: { position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
            React.createElement('div', { style: { textAlign: 'center' } },
              React.createElement('div', { style: { fontSize: 40, marginBottom: 8 } }, '🥫'),
              React.createElement('div', { style: { fontSize: 12, color: t.primary, fontWeight: 600 } }, 'Detecting items...')
            )
          )
        ),
        React.createElement('div', { style: { width: '85%', marginBottom: 12 } },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: 6 } },
            React.createElement('span', { style: { fontSize: 13, color: '#8B95B0', fontWeight: 500 } }, 'Analyzing space...'),
            React.createElement('span', { style: { fontSize: 13, color: t.primary, fontWeight: 700 } }, `${Math.round(scanProgress)}%`)
          ),
          React.createElement('div', { style: { height: 6, background: 'rgba(255,255,255,0.1)', borderRadius: 3, overflow: 'hidden' } },
            React.createElement('div', { style: { height: '100%', width: `${scanProgress}%`, background: `linear-gradient(90deg, ${t.primary}, ${t.accent})`, borderRadius: 3, transition: 'width 0.1s' } })
          )
        ),
        React.createElement('p', { style: { fontSize: 12, color: '#8B95B0', textAlign: 'center' } }, 'Keep camera steady for best results')
      ),
      scanComplete && React.createElement('div', { className: 'screen-content', style: { padding: 20 } },
        React.createElement('div', { style: { background: t.accentLight, border: `1px solid ${t.accent}40`, borderRadius: 20, padding: 20, marginBottom: 20, textAlign: 'center' } },
          React.createElement('div', { style: { fontSize: 36, marginBottom: 8 } }, '✅'),
          React.createElement('h3', { style: { fontSize: 16, fontWeight: 800, color: t.text, marginBottom: 4 } }, 'Scan Complete!'),
          React.createElement('p', { style: { fontSize: 13, color: t.textSub } }, 'Kitchen Pantry analyzed')
        ),
        [
          { label: 'Available Space', value: '68%', icon: window.lucide.Box, color: t.primary },
          { label: 'Items Detected', value: '14', icon: window.lucide.Package, color: t.accent },
          { label: 'Expiring Soon', value: '3', icon: window.lucide.Clock, color: t.danger },
          { label: 'Space Wasted', value: '12%', icon: window.lucide.AlertTriangle, color: '#A78BFA' },
        ].map((item, i) =>
          React.createElement('div', { key: i, style: { background: t.surface, borderRadius: 14, padding: '14px 16px', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 14, border: `1px solid ${t.border}` } },
            React.createElement('div', { style: { width: 38, height: 38, borderRadius: 11, background: item.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center' } },
              React.createElement(item.icon, { size: 18, color: item.color })
            ),
            React.createElement('span', { style: { fontSize: 14, color: t.text, fontWeight: 600, flex: 1 } }, item.label),
            React.createElement('span', { style: { fontSize: 16, fontWeight: 800, color: item.color } }, item.value)
          )
        ),
        React.createElement('button', { onClick: () => { setScanComplete(false); setActiveTab('lists'); }, style: { width: '100%', padding: 16, background: `linear-gradient(135deg, ${t.primary}, ${t.primaryDark})`, border: 'none', borderRadius: 16, fontSize: 15, fontWeight: 700, color: '#fff', cursor: 'pointer', marginTop: 6 } },
          'View Smart Shopping List →'
        )
      )
    );
  }

  function ListsScreen() {
    return React.createElement('div', { className: 'screen-content', style: { padding: '20px 20px 8px' } },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 } },
        React.createElement('h2', { style: { fontSize: 20, fontWeight: 800, color: t.text } }, 'Shopping Lists'),
        React.createElement('div', { style: { width: 36, height: 36, borderRadius: 11, background: t.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' } },
          React.createElement(window.lucide.Plus, { size: 18, color: '#fff' })
        )
      ),
      React.createElement('div', { style: { background: t.surface, borderRadius: 18, padding: 16, marginBottom: 16, border: `1px solid ${t.border}`, boxShadow: t.cardShadow } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 } },
          React.createElement('div', null,
            React.createElement('h3', { style: { fontSize: 15, fontWeight: 700, color: t.text } }, 'This Week\'s List'),
            React.createElement('p', { style: { fontSize: 12, color: t.textSub } }, '3 items · Space-optimized')
          ),
          React.createElement('span', { style: { fontSize: 12, fontWeight: 700, background: t.accentLight, color: t.accent, padding: '4px 10px', borderRadius: 8 } }, 'Active')
        ),
        cartItems.map((item) =>
          React.createElement('div', { key: item.id, style: { display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: `1px solid ${t.border}` } },
            React.createElement('div', { style: { width: 20, height: 20, borderRadius: 6, border: `2px solid ${item.fits ? t.accent : t.danger}`, background: item.fits ? t.accentLight : t.dangerLight, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 } },
              item.fits && React.createElement(window.lucide.Check, { size: 11, color: t.accent })
            ),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', { style: { fontSize: 13, fontWeight: 600, color: t.text } }, item.name),
              React.createElement('div', { style: { fontSize: 11, color: item.fits ? t.textSub : t.danger } }, item.fits ? '✓ Fits your space' : '⚠ May not fit — see alternatives')
            ),
            React.createElement('div', { style: { textAlign: 'right' } },
              React.createElement('div', { style: { fontSize: 13, fontWeight: 700, color: t.text } }, `$${item.price}`),
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
                React.createElement('div', { onClick: () => setCartItems(prev => prev.map(c => c.id === item.id ? { ...c, qty: Math.max(1, c.qty - 1) } : c)), style: { width: 20, height: 20, borderRadius: 5, background: t.surface2, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' } },
                  React.createElement(window.lucide.Minus, { size: 10, color: t.textSub })
                ),
                React.createElement('span', { style: { fontSize: 12, fontWeight: 700, color: t.text, minWidth: 14, textAlign: 'center' } }, item.qty),
                React.createElement('div', { onClick: () => setCartItems(prev => prev.map(c => c.id === item.id ? { ...c, qty: c.qty + 1 } : c)), style: { width: 20, height: 20, borderRadius: 5, background: t.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' } },
                  React.createElement(window.lucide.Plus, { size: 10, color: '#fff' })
                )
              )
            )
          )
        ),
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 14 } },
          React.createElement('span', { style: { fontSize: 13, color: t.textSub, fontWeight: 500 } }, 'Total estimate'),
          React.createElement('span', { style: { fontSize: 17, fontWeight: 800, color: t.text } }, `$${cartItems.reduce((s, i) => s + i.price * i.qty, 0).toFixed(2)}`)
        )
      ),
      React.createElement('h3', { style: { fontSize: 15, fontWeight: 700, color: t.text, marginBottom: 12 } }, 'Smart Recommendations'),
      recommendations.map(rec =>
        React.createElement('div', { key: rec.id, style: { background: t.surface, borderRadius: 14, padding: '14px 16px', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 12, border: `1px solid ${t.border}` } },
          React.createElement('div', { style: { width: 42, height: 42, borderRadius: 12, background: t.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 } },
            React.createElement(window.lucide.Package, { size: 18, color: t.primary })
          ),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', { style: { fontSize: 13, fontWeight: 700, color: t.text } }, rec.name),
            React.createElement('div', { style: { fontSize: 11, color: t.textSub, marginTop: 2 } }, rec.reason),
            React.createElement('div', { style: { fontSize: 11, fontWeight: 700, color: '#22C55E', marginTop: 2 } }, `Save ${rec.savings}`)
          ),
          React.createElement('div', { style: { width: 32, height: 32, borderRadius: 10, background: t.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' } },
            React.createElement(window.lucide.Plus, { size: 16, color: t.primary })
          )
        )
      )
    );
  }

  function SpacesScreen() {
    return React.createElement('div', { className: 'screen-content', style: { padding: '20px 20px 8px' } },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 } },
        React.createElement('h2', { style: { fontSize: 20, fontWeight: 800, color: t.text } }, 'My Spaces'),
        React.createElement('div', { onClick: () => setActiveTab('scan'), style: { display: 'flex', alignItems: 'center', gap: 6, background: t.primary, padding: '8px 14px', borderRadius: 10, cursor: 'pointer' } },
          React.createElement(window.lucide.Plus, { size: 14, color: '#fff' }),
          React.createElement('span', { style: { fontSize: 12, fontWeight: 700, color: '#fff' } }, 'Add Space')
        )
      ),
      React.createElement('p', { style: { fontSize: 13, color: t.textSub, marginBottom: 18 } }, 'Track your storage capacity in real time'),
      spaces.map(space =>
        React.createElement('div', { key: space.id, style: { background: t.surface, borderRadius: 18, padding: 18, marginBottom: 14, border: `1px solid ${t.border}`, boxShadow: t.cardShadow } },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 } },
            React.createElement('div', { style: { width: 50, height: 50, borderRadius: 15, background: space.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 } }, space.icon),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('h3', { style: { fontSize: 15, fontWeight: 700, color: t.text } }, space.name),
              React.createElement('p', { style: { fontSize: 12, color: t.textSub } }, `${space.items} items tracked`)
            ),
            React.createElement('div', { style: { textAlign: 'right' } },
              React.createElement('div', { style: { fontSize: 20, fontWeight: 800, color: space.color } }, `${space.capacity}%`),
              React.createElement('div', { style: { fontSize: 11, color: t.textSub } }, 'used')
            )
          ),
          React.createElement('div', { style: { marginBottom: 10 } },
            React.createElement('div', { style: { height: 8, background: t.surface2, borderRadius: 4, overflow: 'hidden' } },
              React.createElement('div', { style: { height: '100%', width: `${space.capacity}%`, background: `linear-gradient(90deg, ${space.color}, ${space.color}BB)`, borderRadius: 4, transition: 'width 0.5s ease' } })
            )
          ),
          React.createElement('div', { style: { display: 'flex', gap: 8 } },
            React.createElement('button', { onClick: () => setActiveTab('scan'), style: { flex: 1, padding: '8px 0', background: t.primaryLight, border: 'none', borderRadius: 10, fontSize: 12, fontWeight: 600, color: t.primary, cursor: 'pointer' } }, 'Re-scan'),
            React.createElement('button', { style: { flex: 1, padding: '8px 0', background: t.surface2, border: 'none', borderRadius: 10, fontSize: 12, fontWeight: 600, color: t.textSub, cursor: 'pointer' } }, 'View Items')
          )
        )
      )
    );
  }

  function SettingsScreen() {
    const settingGroups = [
      {
        title: 'Preferences',
        items: [
          { label: 'Budget Limit', value: '$200/week', icon: window.lucide.Wallet, color: '#22C55E' },
          { label: 'Household Size', value: '2 people', icon: window.lucide.Users, color: t.primary },
          { label: 'Shopping Cadence', value: 'Weekly', icon: window.lucide.Calendar, color: '#A78BFA' },
        ]
      },
      {
        title: 'Notifications',
        items: [
          { label: 'Restock Alerts', value: 'On', icon: window.lucide.Bell, color: t.danger },
          { label: 'Expiry Reminders', value: '3 days', icon: window.lucide.Clock, color: '#F59E0B' },
          { label: 'Space Warnings', value: 'On', icon: window.lucide.AlertTriangle, color: t.accent },
        ]
      }
    ];
    return React.createElement('div', { className: 'screen-content', style: { padding: '20px 20px 8px' } },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 } },
        React.createElement('h2', { style: { fontSize: 20, fontWeight: 800, color: t.text } }, 'Settings'),
        React.createElement('div', { onClick: () => setIsDark(!isDark), style: { width: 40, height: 40, borderRadius: 12, background: isDark ? t.primary : t.surface2, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: `1px solid ${t.border}`, transition: 'all 0.3s' } },
          React.createElement(isDark ? window.lucide.Sun : window.lucide.Moon, { size: 18, color: isDark ? '#fff' : t.textSub })
        )
      ),
      React.createElement('div', { style: { background: `linear-gradient(135deg, ${t.primary}, ${t.primaryDark})`, borderRadius: 20, padding: 20, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 16 } },
        React.createElement('div', { style: { width: 56, height: 56, borderRadius: 17, background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 } }, '👤'),
        React.createElement('div', null,
          React.createElement('h3', { style: { fontSize: 16, fontWeight: 800, color: '#fff' } }, 'Alex Chen'),
          React.createElement('p', { style: { fontSize: 12, color: 'rgba(255,255,255,0.8)' } }, 'alex@email.com'),
          React.createElement('span', { style: { fontSize: 11, fontWeight: 600, background: 'rgba(255,255,255,0.2)', color: '#fff', padding: '3px 10px', borderRadius: 6, display: 'inline-block', marginTop: 4 } }, 'Pro Member')
        )
      ),
      settingGroups.map(group =>
        React.createElement('div', { key: group.title, style: { marginBottom: 16 } },
          React.createElement('h3', { style: { fontSize: 13, fontWeight: 700, color: t.textSub, letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 8 } }, group.title),
          React.createElement('div', { style: { background: t.surface, borderRadius: 16, border: `1px solid ${t.border}`, overflow: 'hidden' } },
            group.items.map((item, i) =>
              React.createElement('div', { key: i, style: { display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', borderBottom: i < group.items.length - 1 ? `1px solid ${t.border}` : 'none' } },
                React.createElement('div', { style: { width: 34, height: 34, borderRadius: 10, background: item.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center' } },
                  React.createElement(item.icon, { size: 16, color: item.color })
                ),
                React.createElement('span', { style: { fontSize: 14, fontWeight: 600, color: t.text, flex: 1 } }, item.label),
                React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6 } },
                  React.createElement('span', { style: { fontSize: 13, color: t.textSub } }, item.value),
                  React.createElement(window.lucide.ChevronRight, { size: 14, color: t.textMuted })
                )
              )
            )
          )
        )
      ),
      React.createElement('div', { style: { marginTop: 8, background: t.surface, borderRadius: 16, border: `1px solid ${t.border}`, overflow: 'hidden' } },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', borderBottom: `1px solid ${t.border}` } },
          React.createElement(window.lucide.HelpCircle, { size: 18, color: t.primary }),
          React.createElement('span', { style: { fontSize: 14, fontWeight: 600, color: t.text, flex: 1 } }, 'Help & Support'),
          React.createElement(window.lucide.ChevronRight, { size: 14, color: t.textMuted })
        ),
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px' } },
          React.createElement(window.lucide.LogOut, { size: 18, color: t.danger }),
          React.createElement('span', { style: { fontSize: 14, fontWeight: 600, color: t.danger, flex: 1 } }, 'Sign Out'),
          React.createElement(window.lucide.ChevronRight, { size: 14, color: t.textMuted })
        )
      )
    );
  }

  const screens = { home: HomeScreen, scan: ScanScreen, lists: ListsScreen, spaces: SpacesScreen, settings: SettingsScreen };
  const ActiveScreen = screens[activeTab];

  const now = new Date();
  const timeStr = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;

  return React.createElement('div', {
    style: {
      minHeight: '100vh',
      background: '#e8eaf0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
    }
  },
    React.createElement('div', {
      style: {
        width: 375,
        height: 812,
        background: t.bg,
        borderRadius: 50,
        overflow: 'hidden',
        position: 'relative',
        boxShadow: '0 40px 80px rgba(0,0,0,0.3), 0 0 0 1px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
        transition: 'background 0.3s',
      }
    },
      React.createElement('div', {
        style: {
          position: 'absolute',
          top: 14,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 120,
          height: 34,
          background: '#000',
          borderRadius: 20,
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
        }
      },
        React.createElement('div', { style: { width: 12, height: 12, borderRadius: '50%', background: '#1a1a1a', border: '2px solid #333' } }),
        React.createElement('div', { style: { width: 6, height: 6, borderRadius: '50%', background: '#1a1a1a' } })
      ),
      React.createElement('div', {
        style: {
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '58px 24px 10px',
          background: activeTab === 'scan' && !scanComplete ? 'transparent' : t.bg,
          position: 'relative',
          zIndex: 10,
          transition: 'background 0.3s',
        }
      },
        React.createElement('span', { style: { fontSize: 14, fontWeight: 700, color: activeTab === 'scan' && !scanComplete ? '#E8ECFA' : t.text } }, timeStr),
        React.createElement('div', { style: { display: 'flex', gap: 6, alignItems: 'center' } },
          React.createElement(window.lucide.Wifi, { size: 14, color: activeTab === 'scan' && !scanComplete ? '#8B95B0' : t.textSub }),
          React.createElement(window.lucide.Battery, { size: 16, color: activeTab === 'scan' && !scanComplete ? '#8B95B0' : t.textSub })
        )
      ),
      React.createElement('div', {
        style: {
          flex: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
          background: activeTab === 'scan' && !scanComplete ? t.scanBg : t.bg,
          transition: 'background 0.3s',
        }
      },
        React.createElement(ActiveScreen)
      ),
      React.createElement('div', {
        style: {
          background: t.navBg,
          borderTop: `1px solid ${t.border}`,
          display: 'flex',
          justifyContent: 'space-around',
          padding: '10px 0 20px',
          transition: 'background 0.3s',
        }
      },
        tabs.map(tab =>
          React.createElement('div', {
            key: tab.id,
            onClick: () => setActiveTab(tab.id),
            className: 'nav-item',
            style: {
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 4,
              cursor: 'pointer',
              padding: '4px 10px',
              borderRadius: 12,
              transition: 'all 0.2s',
              background: activeTab === tab.id ? t.primaryLight : 'transparent',
            }
          },
            React.createElement(tab.icon, {
              size: 22,
              color: activeTab === tab.id ? t.primary : t.textSub,
              strokeWidth: activeTab === tab.id ? 2.5 : 1.8,
            }),
            React.createElement('span', {
              style: {
                fontSize: 10,
                fontWeight: activeTab === tab.id ? 700 : 500,
                color: activeTab === tab.id ? t.primary : t.textSub,
              }
            }, tab.label)
          )
        )
      )
    )
  );
}
