const { useState, useEffect, useRef } = React;

const themes = {
  light: {
    bg: '#F0FDF8',
    surface: '#FFFFFF',
    surfaceAlt: '#F0FDF4',
    card: '#FFFFFF',
    border: '#D1FAE5',
    text: '#0F172A',
    textSecondary: '#374151',
    textMuted: '#6B7280',
    primary: '#00C46A',
    primaryDark: '#00A858',
    primaryLight: '#DCFCE7',
    primaryGlow: 'rgba(0,196,106,0.15)',
    accent: '#0EA5E9',
    accentLight: '#E0F2FE',
    warning: '#F59E0B',
    warningLight: '#FEF3C7',
    danger: '#EF4444',
    dangerLight: '#FEE2E2',
    success: '#22C55E',
    navBg: '#FFFFFF',
    navBorder: '#E5E7EB',
    statusText: '#0F172A',
    shadow: 'rgba(0,0,0,0.08)',
    scanOverlay: 'rgba(0,196,106,0.2)',
  },
  dark: {
    bg: '#09130E',
    surface: '#101F17',
    surfaceAlt: '#162419',
    card: '#1A2E24',
    border: '#1E3D2F',
    text: '#F0FDF4',
    textSecondary: '#BBF7D0',
    textMuted: '#6EE7B7',
    primary: '#00D984',
    primaryDark: '#00BA70',
    primaryLight: '#064E3B',
    primaryGlow: 'rgba(0,217,132,0.2)',
    accent: '#38BDF8',
    accentLight: '#0C4A6E',
    warning: '#FCD34D',
    warningLight: '#451A03',
    danger: '#FCA5A5',
    dangerLight: '#450A0A',
    success: '#4ADE80',
    navBg: '#101F17',
    navBorder: '#1E3D2F',
    statusText: '#F0FDF4',
    shadow: 'rgba(0,0,0,0.4)',
    scanOverlay: 'rgba(0,217,132,0.15)',
  }
};

const sampleProduct = {
  name: 'Method Foaming Hand Soap',
  brand: 'Method',
  barcode: '817939019817',
  score: 82,
  category: 'Personal Care',
  image: '🧴',
  grades: {
    packaging: { score: 90, label: 'Packaging', detail: 'Post-consumer recycled plastic, minimal secondary packaging' },
    repairability: { score: 45, label: 'Repairability', detail: 'Single-use pump; not designed for repair' },
    recyclability: { score: 85, label: 'Recyclability', detail: '#2 HDPE accepted at your local MRF (94108)' },
    refill: { score: 88, label: 'Refill Access', detail: '3 refill stations within 0.8 mi of your ZIP' },
  },
  endOfLife: [
    { icon: '♻️', action: 'Recycle empty bottle', where: 'Curbside bin — accepted in SF', type: 'recycle' },
    { icon: '🔄', action: 'Refill at Loop Station', where: 'Rainbow Grocery, 0.4 mi', type: 'refill' },
    { icon: '🏪', action: 'Brand take-back', where: 'Method.com mail-in program', type: 'takeback' },
  ],
  alternatives: [
    { name: 'Blueland Foam Soap', score: 94, reason: 'Tablet refills, zero plastic', price: '$14' },
    { name: 'Grove Refill Pump', score: 89, reason: 'Stainless pump, concentrate refills', price: '$18' },
  ],
  claims: [
    { label: 'Plant-based formula', verified: true },
    { label: 'Cruelty-free', verified: true },
    { label: '"Natural"', verified: false, note: 'Vague — no certification' },
  ]
};

const mapLocations = [
  { id: 1, type: 'refill', name: 'Rainbow Grocery Refill Bar', dist: '0.4 mi', icon: '🔄', address: '1745 Folsom St', hours: 'Mon–Sun 9am–9pm', items: 'Soaps, cleaning, oils' },
  { id: 2, type: 'repair', name: 'SoMa Fix-It Café', dist: '0.7 mi', icon: '🔧', address: '101 Howard St', hours: 'Sat 10am–2pm', items: 'Electronics, clothing, appliances' },
  { id: 3, type: 'resale', name: 'ThredUp Drop-Off Kiosk', dist: '1.1 mi', icon: '👕', address: 'Westfield Mall', hours: 'Daily 10am–8pm', items: 'Clothing, accessories' },
  { id: 4, type: 'takeback', name: 'Best Buy E-Waste Kiosk', dist: '1.3 mi', icon: '💻', address: '1717 Harrison St', hours: 'Daily 9am–9pm', items: 'Electronics, batteries, cables' },
  { id: 5, type: 'refill', name: 'The Refillery SF', dist: '1.8 mi', icon: '🔄', address: '890 Valencia St', hours: 'Tue–Sun 11am–7pm', items: 'Personal care, household' },
  { id: 6, type: 'compost', name: 'SF Compost Drop-Off', dist: '2.1 mi', icon: '🌱', address: 'Alemany Farmers Market', hours: 'Sat 6am–1pm', items: 'Food scraps, yard waste' },
];

const recentScans = [
  { name: 'Oatly Oat Milk', score: 78, icon: '🥛', time: '2h ago' },
  { name: 'Seventh Gen Dish Soap', score: 85, icon: '🍶', time: 'Yesterday' },
  { name: 'Ziploc Bags (40ct)', score: 22, icon: '🛍️', time: '2 days ago' },
  { name: 'Hydro Flask 32oz', score: 96, icon: '🍶', time: '3 days ago' },
];

function ScoreRing({ score, size = 72, t }) {
  const radius = (size - 10) / 2;
  const circ = 2 * Math.PI * radius;
  const pct = (score / 100) * circ;
  const color = score >= 75 ? t.primary : score >= 50 ? t.warning : t.danger;
  return React.createElement('svg', { width: size, height: size, style: { transform: 'rotate(-90deg)' } },
    React.createElement('circle', { cx: size/2, cy: size/2, r: radius, fill: 'none', stroke: t.border, strokeWidth: 7 }),
    React.createElement('circle', { cx: size/2, cy: size/2, r: radius, fill: 'none', stroke: color, strokeWidth: 7, strokeDasharray: circ, strokeDashoffset: circ - pct, strokeLinecap: 'round', style: { transition: 'stroke-dashoffset 0.6s ease' } }),
    React.createElement('text', { x: size/2, y: size/2 + 1, textAnchor: 'middle', dominantBaseline: 'middle', fill: color, fontSize: size < 50 ? 13 : 18, fontWeight: 700, style: { transform: 'rotate(90deg)', transformOrigin: `${size/2}px ${size/2}px`, fontFamily: 'Plus Jakarta Sans' } }, score)
  );
}

function ScoreBar({ score, t }) {
  const color = score >= 75 ? t.primary : score >= 50 ? t.warning : t.danger;
  return React.createElement('div', { style: { height: 6, background: t.border, borderRadius: 99, overflow: 'hidden' } },
    React.createElement('div', { style: { height: '100%', width: `${score}%`, background: color, borderRadius: 99, transition: 'width 0.6s ease' } })
  );
}

function HomeScreen({ t, setActiveTab, setScannedProduct }) {
  const [pressed, setPressed] = useState(null);
  return React.createElement('div', { style: { flex: 1, overflowY: 'auto', background: t.bg } },
    // Header
    React.createElement('div', { style: { padding: '16px 20px 12px', background: t.surface, borderBottom: `1px solid ${t.border}` } },
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' } },
        React.createElement('div', null,
          React.createElement('div', { style: { fontSize: 13, color: t.textMuted, fontWeight: 500 } }, 'Good morning'),
          React.createElement('div', { style: { fontSize: 20, fontWeight: 700, color: t.text } }, 'Alex in SF 94108 📍')
        ),
        React.createElement('div', { style: { width: 40, height: 40, borderRadius: 20, background: `linear-gradient(135deg, ${t.primary}, ${t.accent})`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 16 } }, 'A')
      )
    ),
    // Scan CTA
    React.createElement('div', { style: { margin: '16px 20px', padding: '20px', background: `linear-gradient(135deg, ${t.primary} 0%, ${t.primaryDark} 100%)`, borderRadius: 20, position: 'relative', overflow: 'hidden', cursor: 'pointer', transform: pressed === 'scan' ? 'scale(0.97)' : 'scale(1)', transition: 'transform 0.15s ease' }, onMouseDown: () => setPressed('scan'), onMouseUp: () => { setPressed(null); setActiveTab('scan'); }, onMouseLeave: () => setPressed(null) },
      React.createElement('div', { style: { position: 'absolute', right: -10, top: -10, width: 120, height: 120, borderRadius: 60, background: 'rgba(255,255,255,0.1)' } }),
      React.createElement('div', { style: { position: 'absolute', right: 30, bottom: -20, width: 80, height: 80, borderRadius: 40, background: 'rgba(255,255,255,0.07)' } }),
      React.createElement('div', { style: { fontSize: 13, color: 'rgba(255,255,255,0.8)', fontWeight: 600, marginBottom: 6 } }, 'SCAN A PRODUCT'),
      React.createElement('div', { style: { fontSize: 22, fontWeight: 700, color: '#fff', marginBottom: 4 } }, 'See waste before you buy'),
      React.createElement('div', { style: { fontSize: 13, color: 'rgba(255,255,255,0.75)' } }, 'Tap to scan barcode or search by name'),
      React.createElement('div', { style: { marginTop: 16, display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.2)', borderRadius: 20, padding: '6px 14px' } },
        React.createElement(window.lucide.ScanLine, { size: 16, color: '#fff' }),
        React.createElement('span', { style: { color: '#fff', fontSize: 13, fontWeight: 600 } }, 'Open Scanner')
      )
    ),
    // Quick Stats
    React.createElement('div', { style: { margin: '0 20px 16px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 } },
      [
        { label: 'Items Scanned', value: '47', icon: window.lucide.ScanLine, color: t.primary },
        { label: 'Waste Avoided', value: '2.3kg', icon: window.lucide.Leaf, color: t.success },
        { label: 'CO₂ Saved', value: '18kg', icon: window.lucide.Wind, color: t.accent },
      ].map((stat, i) =>
        React.createElement('div', { key: i, style: { background: t.card, borderRadius: 16, padding: '14px 12px', border: `1px solid ${t.border}`, boxShadow: `0 2px 8px ${t.shadow}` } },
          React.createElement('div', { style: { marginBottom: 8 } }, React.createElement(stat.icon, { size: 18, color: stat.color })),
          React.createElement('div', { style: { fontSize: 18, fontWeight: 700, color: t.text } }, stat.value),
          React.createElement('div', { style: { fontSize: 11, color: t.textMuted, fontWeight: 500 } }, stat.label)
        )
      )
    ),
    // Recent Scans
    React.createElement('div', { style: { margin: '0 20px 16px' } },
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 } },
        React.createElement('div', { style: { fontSize: 15, fontWeight: 700, color: t.text } }, 'Recent Scans'),
        React.createElement('div', { style: { fontSize: 12, color: t.primary, fontWeight: 600 } }, 'See all')
      ),
      React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 8 } },
        recentScans.map((item, i) => {
          const color = item.score >= 75 ? t.primary : item.score >= 50 ? t.warning : t.danger;
          return React.createElement('div', { key: i, style: { background: t.card, borderRadius: 14, padding: '12px 14px', border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }, onClick: () => { setScannedProduct(sampleProduct); setActiveTab('scan'); } },
            React.createElement('div', { style: { fontSize: 28 } }, item.icon),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', { style: { fontSize: 14, fontWeight: 600, color: t.text } }, item.name),
              React.createElement('div', { style: { fontSize: 11, color: t.textMuted } }, item.time)
            ),
            React.createElement('div', { style: { textAlign: 'center' } },
              React.createElement('div', { style: { fontSize: 18, fontWeight: 700, color } }, item.score),
              React.createElement('div', { style: { fontSize: 10, color: t.textMuted } }, '/100')
            )
          );
        })
      )
    ),
    // Nearby Programs
    React.createElement('div', { style: { margin: '0 20px 20px' } },
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 } },
        React.createElement('div', { style: { fontSize: 15, fontWeight: 700, color: t.text } }, 'Your Loop Network'),
        React.createElement('div', { style: { fontSize: 12, color: t.primary, fontWeight: 600 } }, 'Map')
      ),
      React.createElement('div', { style: { display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 4 } },
        mapLocations.slice(0, 4).map((loc, i) =>
          React.createElement('div', { key: i, style: { background: t.card, borderRadius: 16, padding: '14px', border: `1px solid ${t.border}`, minWidth: 140, flex: 'none' } },
            React.createElement('div', { style: { fontSize: 24, marginBottom: 6 } }, loc.icon),
            React.createElement('div', { style: { fontSize: 12, fontWeight: 700, color: t.text, marginBottom: 2 } }, loc.name),
            React.createElement('div', { style: { fontSize: 11, color: t.primary, fontWeight: 600 } }, loc.dist)
          )
        )
      )
    )
  );
}

function ScanScreen({ t, scannedProduct, setScannedProduct }) {
  const [scanning, setScanning] = useState(!scannedProduct);
  const [scanProgress, setScanProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('overview');

  useEffect(() => {
    if (scannedProduct) { setScanning(false); return; }
    const timer = setInterval(() => {
      setScanProgress(p => {
        if (p >= 100) {
          clearInterval(timer);
          setTimeout(() => { setScannedProduct(sampleProduct); setScanning(false); }, 300);
          return 100;
        }
        return p + 4;
      });
    }, 80);
    return () => clearInterval(timer);
  }, [scannedProduct]);

  const product = scannedProduct || sampleProduct;

  if (scanning) {
    return React.createElement('div', { style: { flex: 1, background: '#000', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' } },
      React.createElement('div', { style: { position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.6) 100%)' } }),
      React.createElement('div', { style: { position: 'absolute', top: 16, left: 16, right: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
        React.createElement('div', { style: { color: '#fff', fontSize: 16, fontWeight: 700 } }, 'LoopLens Scanner'),
        React.createElement('div', { style: { display: 'flex', gap: 16 } },
          React.createElement(window.lucide.Flashlight, { size: 22, color: '#fff' }),
          React.createElement(window.lucide.X, { size: 22, color: '#fff' })
        )
      ),
      // Scan frame
      React.createElement('div', { style: { width: 240, height: 160, position: 'relative' } },
        // Corners
        ...['topleft','topright','bottomleft','bottomright'].map(corner =>
          React.createElement('div', { key: corner, style: { position: 'absolute', width: 28, height: 28, borderColor: t.primary, borderStyle: 'solid', borderWidth: 0, ...(corner.includes('top') ? { top: 0, borderTopWidth: 3 } : { bottom: 0, borderBottomWidth: 3 }), ...(corner.includes('left') ? { left: 0, borderLeftWidth: 3 } : { right: 0, borderRightWidth: 3 }), borderRadius: corner.includes('top') ? (corner.includes('left') ? '4px 0 0 0' : '0 4px 0 0') : (corner.includes('left') ? '0 0 0 4px' : '0 0 4px 0') } })
        ),
        // Scan line
        React.createElement('div', { style: { position: 'absolute', left: 0, right: 0, height: 2, background: `linear-gradient(to right, transparent, ${t.primary}, transparent)`, top: `${(scanProgress / 100) * 100}%`, transition: 'top 0.08s linear', boxShadow: `0 0 8px ${t.primary}` } })
      ),
      React.createElement('div', { style: { color: 'rgba(255,255,255,0.8)', fontSize: 14, marginTop: 24, fontWeight: 500 } }, scanProgress < 100 ? 'Point at a barcode or product label' : 'Analyzing product data...'),
      React.createElement('div', { style: { marginTop: 32, background: 'rgba(255,255,255,0.1)', borderRadius: 20, padding: '10px 20px', color: '#fff', fontSize: 13, fontWeight: 600 } }, 'Or search by product name')
    );
  }

  return React.createElement('div', { style: { flex: 1, overflowY: 'auto', background: t.bg } },
    // Product Header
    React.createElement('div', { style: { background: t.surface, padding: '16px 20px', borderBottom: `1px solid ${t.border}` } },
      React.createElement('div', { style: { display: 'flex', alignItems: 'flex-start', gap: 14 } },
        React.createElement('div', { style: { width: 64, height: 64, borderRadius: 16, background: t.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32 } }, product.image),
        React.createElement('div', { style: { flex: 1 } },
          React.createElement('div', { style: { fontSize: 11, color: t.textMuted, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 } }, product.brand + ' · ' + product.category),
          React.createElement('div', { style: { fontSize: 17, fontWeight: 700, color: t.text, marginBottom: 4 } }, product.name),
          React.createElement('div', { style: { fontSize: 11, color: t.textMuted } }, 'Barcode: ' + product.barcode)
        ),
        React.createElement('div', { style: { textAlign: 'center' } },
          React.createElement(ScoreRing, { score: product.score, size: 64, t }),
          React.createElement('div', { style: { fontSize: 10, color: t.textMuted, marginTop: 2 } }, 'Loop Score')
        )
      ),
      // Section tabs
      React.createElement('div', { style: { display: 'flex', gap: 8, marginTop: 14, overflowX: 'auto' } },
        ['overview', 'details', 'alternatives', 'lifecycle'].map(sec =>
          React.createElement('div', { key: sec, onClick: () => setActiveSection(sec), style: { padding: '6px 14px', borderRadius: 20, fontSize: 12, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap', background: activeSection === sec ? t.primary : t.surfaceAlt, color: activeSection === sec ? '#fff' : t.textMuted, transition: 'all 0.2s' } }, sec.charAt(0).toUpperCase() + sec.slice(1))
        )
      )
    ),
    // Content
    React.createElement('div', { style: { padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 14 } },
      // Overview section
      activeSection === 'overview' && React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 12 } },
        // Grade cards
        Object.values(product.grades).map((grade, i) => {
          const color = grade.score >= 75 ? t.primary : grade.score >= 50 ? t.warning : t.danger;
          return React.createElement('div', { key: i, style: { background: t.card, borderRadius: 16, padding: '14px 16px', border: `1px solid ${t.border}` } },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 } },
              React.createElement('div', { style: { fontSize: 13, fontWeight: 700, color: t.text } }, grade.label),
              React.createElement('div', { style: { fontSize: 15, fontWeight: 700, color } }, grade.score + '/100')
            ),
            React.createElement(ScoreBar, { score: grade.score, t }),
            React.createElement('div', { style: { fontSize: 12, color: t.textSecondary, marginTop: 8 } }, grade.detail)
          );
        }),
        // Marketing Claims
        React.createElement('div', { style: { background: t.card, borderRadius: 16, padding: '14px 16px', border: `1px solid ${t.border}` } },
          React.createElement('div', { style: { fontSize: 13, fontWeight: 700, color: t.text, marginBottom: 10 } }, 'Marketing Claims Check'),
          product.claims.map((claim, i) =>
            React.createElement('div', { key: i, style: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 } },
              React.createElement('div', { style: { width: 20, height: 20, borderRadius: 10, background: claim.verified ? t.primaryLight : t.dangerLight, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
                React.createElement(claim.verified ? window.lucide.Check : window.lucide.AlertTriangle, { size: 12, color: claim.verified ? t.primary : t.danger })
              ),
              React.createElement('div', { style: { flex: 1 } },
                React.createElement('span', { style: { fontSize: 12, fontWeight: 600, color: t.text } }, claim.label),
                claim.note && React.createElement('span', { style: { fontSize: 11, color: t.danger, marginLeft: 6 } }, '— ' + claim.note)
              )
            )
          )
        )
      ),
      // Details section
      activeSection === 'details' && React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 12 } },
        React.createElement('div', { style: { background: t.card, borderRadius: 16, padding: '16px', border: `1px solid ${t.border}` } },
          React.createElement('div', { style: { fontSize: 14, fontWeight: 700, color: t.text, marginBottom: 12 } }, 'Packaging Breakdown'),
          [
            { label: 'Primary container', value: 'HDPE #2 Plastic', status: 'good' },
            { label: 'Label', value: 'Paper, removable', status: 'good' },
            { label: 'Pump mechanism', value: 'Mixed plastic/metal', status: 'warn' },
            { label: 'Secondary packaging', value: 'None', status: 'good' },
            { label: 'Recycled content', value: '30% PCR plastic', status: 'good' },
          ].map((row, i) =>
            React.createElement('div', { key: i, style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 10, borderBottom: i < 4 ? `1px solid ${t.border}` : 'none', marginBottom: i < 4 ? 10 : 0 } },
              React.createElement('span', { style: { fontSize: 12, color: t.textMuted } }, row.label),
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6 } },
                React.createElement('div', { style: { width: 6, height: 6, borderRadius: 3, background: row.status === 'good' ? t.success : t.warning } }),
                React.createElement('span', { style: { fontSize: 12, fontWeight: 600, color: t.text } }, row.value)
              )
            )
          )
        ),
        React.createElement('div', { style: { background: t.card, borderRadius: 16, padding: '16px', border: `1px solid ${t.border}` } },
          React.createElement('div', { style: { fontSize: 14, fontWeight: 700, color: t.text, marginBottom: 12 } }, 'Your Local Recycling (ZIP 94108)'),
          React.createElement('div', { style: { background: t.primaryLight, borderRadius: 12, padding: '12px', marginBottom: 10 } },
            React.createElement('div', { style: { fontSize: 13, fontWeight: 700, color: t.primary } }, '✓ Accepted curbside'),
            React.createElement('div', { style: { fontSize: 12, color: t.textSecondary, marginTop: 4 } }, 'Empty and rinse the bottle. Remove pump and place in landfill bin. Label is ok to leave on.')
          ),
          React.createElement('div', { style: { fontSize: 12, color: t.textMuted } }, 'Source: SF Recology guidelines · Updated March 2026')
        )
      ),
      // Alternatives section
      activeSection === 'alternatives' && React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 12 } },
        React.createElement('div', { style: { background: t.warningLight, borderRadius: 12, padding: '12px 14px', border: `1px solid ${t.warning}30` } },
          React.createElement('div', { style: { fontSize: 12, fontWeight: 600, color: t.warning } }, 'Lower-waste alternatives near you'),
          React.createElement('div', { style: { fontSize: 11, color: t.textSecondary, marginTop: 2 } }, 'Available at Rainbow Grocery & Rainbow Refill, 0.4 mi')
        ),
        product.alternatives.map((alt, i) =>
          React.createElement('div', { key: i, style: { background: t.card, borderRadius: 16, padding: '14px 16px', border: `2px solid ${t.primary}`, display: 'flex', alignItems: 'center', gap: 12 } },
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', { style: { fontSize: 14, fontWeight: 700, color: t.text } }, alt.name),
              React.createElement('div', { style: { fontSize: 12, color: t.textSecondary, marginTop: 2 } }, alt.reason),
              React.createElement('div', { style: { fontSize: 12, color: t.textMuted, marginTop: 4 } }, alt.price + ' · In stock nearby')
            ),
            React.createElement('div', { style: { textAlign: 'center' } },
              React.createElement(ScoreRing, { score: alt.score, size: 50, t }),
            )
          )
        ),
        React.createElement('div', { style: { background: t.card, borderRadius: 16, padding: '14px 16px', border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', gap: 12 } },
          React.createElement('div', { style: { fontSize: 24 } }, '🔄'),
          React.createElement('div', null,
            React.createElement('div', { style: { fontSize: 13, fontWeight: 700, color: t.text } }, 'Refill this brand at Loop Station'),
            React.createElement('div', { style: { fontSize: 12, color: t.textSecondary } }, 'Rainbow Grocery · Aisle 3 · 0.4 mi'),
            React.createElement('div', { style: { fontSize: 11, color: t.primary, fontWeight: 600, marginTop: 4 } }, 'Save $2.80 vs. buying new')
          )
        )
      ),
      // Lifecycle section
      activeSection === 'lifecycle' && React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 12 } },
        React.createElement('div', { style: { background: t.card, borderRadius: 16, padding: '16px', border: `1px solid ${t.border}` } },
          React.createElement('div', { style: { fontSize: 14, fontWeight: 700, color: t.text, marginBottom: 14 } }, 'End of Life Options'),
          product.endOfLife.map((eol, i) =>
            React.createElement('div', { key: i, style: { display: 'flex', alignItems: 'flex-start', gap: 12, paddingBottom: i < 2 ? 14 : 0, borderBottom: i < 2 ? `1px solid ${t.border}` : 'none', marginBottom: i < 2 ? 14 : 0 } },
              React.createElement('div', { style: { width: 40, height: 40, borderRadius: 12, background: t.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 } }, eol.icon),
              React.createElement('div', { style: { flex: 1 } },
                React.createElement('div', { style: { fontSize: 13, fontWeight: 700, color: t.text } }, eol.action),
                React.createElement('div', { style: { fontSize: 12, color: t.primary, fontWeight: 500, marginTop: 2 } }, eol.where)
              ),
              React.createElement(window.lucide.ChevronRight, { size: 16, color: t.textMuted })
            )
          )
        ),
        React.createElement('div', { style: { background: t.card, borderRadius: 16, padding: '16px', border: `1px solid ${t.border}` } },
          React.createElement('div', { style: { fontSize: 14, fontWeight: 700, color: t.text, marginBottom: 12 } }, 'Product Lifecycle Score'),
          [
            { stage: 'Production', score: 72, label: 'Plant-based, US manufactured' },
            { stage: 'Packaging', score: 90, label: '30% recycled HDPE' },
            { stage: 'Use Phase', score: 88, label: 'Concentrated formula, water efficient' },
            { stage: 'Disposal', score: 82, label: 'Recyclable + refill available' },
          ].map((stage, i) =>
            React.createElement('div', { key: i, style: { marginBottom: i < 3 ? 10 : 0 } },
              React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: 4 } },
                React.createElement('span', { style: { fontSize: 12, color: t.textSecondary, fontWeight: 500 } }, stage.stage),
                React.createElement('span', { style: { fontSize: 12, fontWeight: 700, color: stage.score >= 75 ? t.primary : t.warning } }, stage.score + '%')
              ),
              React.createElement(ScoreBar, { score: stage.score, t }),
              React.createElement('div', { style: { fontSize: 11, color: t.textMuted, marginTop: 3 } }, stage.label)
            )
          )
        ),
        React.createElement('div', { style: { display: 'flex', gap: 10 } },
          React.createElement('div', { style: { flex: 1, background: t.primary, borderRadius: 14, padding: '12px', textAlign: 'center', cursor: 'pointer' } },
            React.createElement('div', { style: { fontSize: 13, fontWeight: 700, color: '#fff' } }, 'Find Refill Station'),
            React.createElement('div', { style: { fontSize: 11, color: 'rgba(255,255,255,0.8)' } }, '3 nearby')
          ),
          React.createElement('div', { style: { flex: 1, background: t.surfaceAlt, borderRadius: 14, padding: '12px', textAlign: 'center', cursor: 'pointer', border: `1px solid ${t.border}` } },
            React.createElement('div', { style: { fontSize: 13, fontWeight: 700, color: t.text } }, 'Save to List'),
            React.createElement('div', { style: { fontSize: 11, color: t.textMuted } }, 'Track this item')
          )
        )
      )
    )
  );
}

function MapScreen({ t }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedLoc, setSelectedLoc] = useState(null);
  const filters = ['all', 'refill', 'repair', 'resale', 'takeback', 'compost'];
  const filteredLocs = activeFilter === 'all' ? mapLocations : mapLocations.filter(l => l.type === activeFilter);
  const typeColors = { refill: '#00C46A', repair: '#0EA5E9', resale: '#8B5CF6', takeback: '#F59E0B', compost: '#84CC16' };

  return React.createElement('div', { style: { flex: 1, display: 'flex', flexDirection: 'column', background: t.bg } },
    // Header
    React.createElement('div', { style: { padding: '16px 20px 12px', background: t.surface, borderBottom: `1px solid ${t.border}` } },
      React.createElement('div', { style: { fontSize: 18, fontWeight: 700, color: t.text, marginBottom: 4 } }, 'Loop Network Map'),
      React.createElement('div', { style: { fontSize: 12, color: t.textMuted } }, 'San Francisco · 94108 · 12 locations found'),
      // Search bar
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10, background: t.surfaceAlt, borderRadius: 12, padding: '10px 14px', marginTop: 12, border: `1px solid ${t.border}` } },
        React.createElement(window.lucide.Search, { size: 16, color: t.textMuted }),
        React.createElement('span', { style: { fontSize: 13, color: t.textMuted } }, 'Search locations or ZIP code...')
      )
    ),
    // Filter chips
    React.createElement('div', { style: { padding: '12px 20px', background: t.surface, borderBottom: `1px solid ${t.border}`, display: 'flex', gap: 8, overflowX: 'auto' } },
      filters.map(f =>
        React.createElement('div', { key: f, onClick: () => setActiveFilter(f), style: { padding: '5px 14px', borderRadius: 20, fontSize: 12, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap', background: activeFilter === f ? (typeColors[f] || t.primary) : t.surfaceAlt, color: activeFilter === f ? '#fff' : t.textMuted, transition: 'all 0.2s' } }, f === 'all' ? 'All Types' : f.charAt(0).toUpperCase() + f.slice(1))
      )
    ),
    // Map placeholder
    React.createElement('div', { style: { height: 220, background: `linear-gradient(135deg, ${t.primaryLight} 0%, ${t.accentLight} 100%)`, position: 'relative', overflow: 'hidden' } },
      // Grid lines to simulate map
      React.createElement('svg', { style: { position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.3 } },
        ...Array.from({ length: 10 }, (_, i) =>
          React.createElement('line', { key: 'h' + i, x1: 0, y1: i * 25, x2: 500, y2: i * 25, stroke: t.primary, strokeWidth: 0.5 })
        ),
        ...Array.from({ length: 20 }, (_, i) =>
          React.createElement('line', { key: 'v' + i, x1: i * 25, y1: 0, x2: i * 25, y2: 250, stroke: t.primary, strokeWidth: 0.5 })
        ),
        // Streets
        React.createElement('line', { x1: 0, y1: 80, x2: 375, y2: 80, stroke: t.primary, strokeWidth: 2 }),
        React.createElement('line', { x1: 0, y1: 150, x2: 375, y2: 150, stroke: t.primary, strokeWidth: 2 }),
        React.createElement('line', { x1: 100, y1: 0, x2: 100, y2: 220, stroke: t.primary, strokeWidth: 2 }),
        React.createElement('line', { x1: 240, y1: 0, x2: 240, y2: 220, stroke: t.primary, strokeWidth: 2 }),
      ),
      // Location pins
      ...[
        { x: 80, y: 60, type: 'refill' }, { x: 160, y: 130, type: 'repair' }, { x: 270, y: 70, type: 'resale' },
        { x: 310, y: 160, type: 'takeback' }, { x: 50, y: 170, type: 'compost' }, { x: 200, y: 50, type: 'refill' }
      ].map((pin, i) =>
        React.createElement('div', { key: i, style: { position: 'absolute', left: pin.x, top: pin.y, transform: 'translate(-50%, -50%)' } },
          React.createElement('div', { style: { width: 30, height: 30, borderRadius: 15, background: typeColors[pin.type], border: '2px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, boxShadow: '0 2px 8px rgba(0,0,0,0.2)', cursor: 'pointer' } },
            { refill: '🔄', repair: '🔧', resale: '👕', takeback: '💻', compost: '🌱' }[pin.type]
          )
        )
      ),
      // User location
      React.createElement('div', { style: { position: 'absolute', left: 187, top: 110, transform: 'translate(-50%, -50%)' } },
        React.createElement('div', { style: { width: 16, height: 16, borderRadius: 8, background: '#3B82F6', border: '3px solid #fff', boxShadow: '0 0 0 6px rgba(59,130,246,0.25)' } })
      ),
      React.createElement('div', { style: { position: 'absolute', bottom: 10, right: 10, background: t.surface, borderRadius: 8, padding: '4px 10px', fontSize: 11, fontWeight: 600, color: t.text } }, '● You')
    ),
    // Location list
    React.createElement('div', { style: { flex: 1, overflowY: 'auto', padding: '12px 20px', display: 'flex', flexDirection: 'column', gap: 10 } },
      filteredLocs.map((loc, i) =>
        React.createElement('div', { key: loc.id, onClick: () => setSelectedLoc(selectedLoc === loc.id ? null : loc.id), style: { background: t.card, borderRadius: 16, padding: '14px 16px', border: `1px solid ${selectedLoc === loc.id ? typeColors[loc.type] : t.border}`, cursor: 'pointer', transition: 'all 0.2s' } },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12 } },
            React.createElement('div', { style: { width: 42, height: 42, borderRadius: 12, background: (typeColors[loc.type] || t.primary) + '20', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 } }, loc.icon),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', { style: { fontSize: 13, fontWeight: 700, color: t.text } }, loc.name),
              React.createElement('div', { style: { fontSize: 11, color: t.textMuted } }, loc.address)
            ),
            React.createElement('div', { style: { textAlign: 'right' } },
              React.createElement('div', { style: { fontSize: 13, fontWeight: 700, color: typeColors[loc.type] || t.primary } }, loc.dist),
              React.createElement('div', { style: { fontSize: 10, color: t.textMuted } }, loc.type)
            )
          ),
          selectedLoc === loc.id && React.createElement('div', { style: { marginTop: 12, paddingTop: 12, borderTop: `1px solid ${t.border}` } },
            React.createElement('div', { style: { display: 'flex', gap: 8, marginBottom: 8 } },
              React.createElement(window.lucide.Clock, { size: 13, color: t.textMuted }),
              React.createElement('span', { style: { fontSize: 12, color: t.textSecondary } }, loc.hours)
            ),
            React.createElement('div', { style: { display: 'flex', gap: 8, marginBottom: 12 } },
              React.createElement(window.lucide.Tag, { size: 13, color: t.textMuted }),
              React.createElement('span', { style: { fontSize: 12, color: t.textSecondary } }, loc.items)
            ),
            React.createElement('div', { style: { display: 'flex', gap: 8 } },
              React.createElement('div', { style: { flex: 1, background: typeColors[loc.type] || t.primary, borderRadius: 10, padding: '8px', textAlign: 'center', fontSize: 12, fontWeight: 700, color: '#fff' } }, 'Get Directions'),
              React.createElement('div', { style: { width: 36, height: 36, borderRadius: 10, background: t.surfaceAlt, border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
                React.createElement(window.lucide.BookmarkPlus, { size: 16, color: t.textMuted })
              )
            )
          )
        )
      )
    )
  );
}

function ImpactScreen({ t }) {
  const [timeRange, setTimeRange] = useState('month');
  const bars = [
    { label: 'W1', value: 65 }, { label: 'W2', value: 40 }, { label: 'W3', value: 80 },
    { label: 'W4', value: 55 }, { label: 'W5', value: 90 }, { label: 'Now', value: 70 },
  ];
  const maxBar = Math.max(...bars.map(b => b.value));

  return React.createElement('div', { style: { flex: 1, overflowY: 'auto', background: t.bg } },
    // Header
    React.createElement('div', { style: { padding: '16px 20px', background: t.surface, borderBottom: `1px solid ${t.border}` } },
      React.createElement('div', { style: { fontSize: 18, fontWeight: 700, color: t.text } }, 'Your Impact'),
      React.createElement('div', { style: { display: 'flex', gap: 6, marginTop: 10 } },
        ['week', 'month', 'year'].map(r =>
          React.createElement('div', { key: r, onClick: () => setTimeRange(r), style: { padding: '5px 14px', borderRadius: 20, fontSize: 12, fontWeight: 600, cursor: 'pointer', background: timeRange === r ? t.primary : t.surfaceAlt, color: timeRange === r ? '#fff' : t.textMuted, transition: 'all 0.2s' } }, r.charAt(0).toUpperCase() + r.slice(1))
        )
      )
    ),
    React.createElement('div', { style: { padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 14 } },
      // Hero stats
      React.createElement('div', { style: { background: `linear-gradient(135deg, ${t.primary} 0%, ${t.primaryDark} 100%)`, borderRadius: 20, padding: '20px', color: '#fff' } },
        React.createElement('div', { style: { fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.8)', marginBottom: 4 } }, 'TOTAL IMPACT THIS MONTH'),
        React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 } },
          [
            { label: 'Packaging Avoided', value: '2.3 kg', icon: '📦' },
            { label: 'CO₂ Saved', value: '18 kg', icon: '🌿' },
            { label: 'Landfill Diverted', value: '1.8 kg', icon: '♻️' },
          ].map((s, i) =>
            React.createElement('div', { key: i, style: { textAlign: 'center' } },
              React.createElement('div', { style: { fontSize: 20 } }, s.icon),
              React.createElement('div', { style: { fontSize: 18, fontWeight: 800, marginTop: 4 } }, s.value),
              React.createElement('div', { style: { fontSize: 10, color: 'rgba(255,255,255,0.7)', marginTop: 2 } }, s.label)
            )
          )
        )
      ),
      // Chart
      React.createElement('div', { style: { background: t.card, borderRadius: 20, padding: '16px', border: `1px solid ${t.border}` } },
        React.createElement('div', { style: { fontSize: 14, fontWeight: 700, color: t.text, marginBottom: 14 } }, 'Weekly Choices Score'),
        React.createElement('div', { style: { display: 'flex', alignItems: 'flex-end', gap: 8, height: 100 } },
          bars.map((bar, i) =>
            React.createElement('div', { key: i, style: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 } },
              React.createElement('div', { style: { width: '100%', height: (bar.value / maxBar) * 90, background: i === bars.length - 1 ? t.primary : t.primaryLight, borderRadius: '6px 6px 0 0', transition: 'height 0.4s ease' } }),
              React.createElement('span', { style: { fontSize: 10, color: t.textMuted, fontWeight: 500 } }, bar.label)
            )
          )
        )
      ),
      // Badges
      React.createElement('div', { style: { background: t.card, borderRadius: 20, padding: '16px', border: `1px solid ${t.border}` } },
        React.createElement('div', { style: { fontSize: 14, fontWeight: 700, color: t.text, marginBottom: 12 } }, 'Badges Earned'),
        React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 } },
          [
            { emoji: '🌿', name: 'Green Start', desc: 'First scan', earned: true },
            { emoji: '🔄', name: 'Loop Hero', desc: '10 refills', earned: true },
            { emoji: '🔧', name: 'Fixer', desc: '1st repair', earned: true },
            { emoji: '🚫', name: 'Greenwash Guard', desc: 'Flagged 5 claims', earned: true },
            { emoji: '🏆', name: 'Zero Waster', desc: '30-day streak', earned: false },
            { emoji: '🌍', name: 'Climate Keeper', desc: '100kg CO₂', earned: false },
          ].map((b, i) =>
            React.createElement('div', { key: i, style: { textAlign: 'center', padding: '12px 8px', borderRadius: 14, background: b.earned ? t.primaryLight : t.surfaceAlt, opacity: b.earned ? 1 : 0.5 } },
              React.createElement('div', { style: { fontSize: 24, filter: b.earned ? 'none' : 'grayscale(1)' } }, b.emoji),
              React.createElement('div', { style: { fontSize: 11, fontWeight: 700, color: t.text, marginTop: 4 } }, b.name),
              React.createElement('div', { style: { fontSize: 10, color: t.textMuted } }, b.desc)
            )
          )
        )
      ),
      // Category breakdown
      React.createElement('div', { style: { background: t.card, borderRadius: 20, padding: '16px', border: `1px solid ${t.border}` } },
        React.createElement('div', { style: { fontSize: 14, fontWeight: 700, color: t.text, marginBottom: 12 } }, 'Impact by Category'),
        [
          { label: 'Personal Care', pct: 42, icon: '🧴', val: '0.9 kg' },
          { label: 'Food & Beverage', pct: 30, icon: '🥛', val: '0.7 kg' },
          { label: 'Household', pct: 18, icon: '🧹', val: '0.4 kg' },
          { label: 'Electronics', pct: 10, icon: '📱', val: '0.3 kg' },
        ].map((cat, i) =>
          React.createElement('div', { key: i, style: { marginBottom: i < 3 ? 12 : 0 } },
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: 4 } },
              React.createElement('div', { style: { display: 'flex', gap: 6, alignItems: 'center' } },
                React.createElement('span', null, cat.icon),
                React.createElement('span', { style: { fontSize: 12, color: t.textSecondary, fontWeight: 500 } }, cat.label)
              ),
              React.createElement('span', { style: { fontSize: 12, fontWeight: 700, color: t.primary } }, cat.val)
            ),
            React.createElement(ScoreBar, { score: cat.pct, t })
          )
        )
      ),
      // Streak
      React.createElement('div', { style: { background: `linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)`, borderRadius: 20, padding: '16px', display: 'flex', alignItems: 'center', gap: 14 } },
        React.createElement('div', { style: { fontSize: 40 } }, '🔥'),
        React.createElement('div', null,
          React.createElement('div', { style: { fontSize: 24, fontWeight: 800, color: '#fff' } }, '14-Day Streak'),
          React.createElement('div', { style: { fontSize: 13, color: 'rgba(255,255,255,0.8)' } }, 'Scanning & making better choices every day'),
          React.createElement('div', { style: { fontSize: 12, color: 'rgba(255,255,255,0.6)', marginTop: 4 } }, '16 more days to earn Zero Waster badge')
        )
      )
    )
  );
}

function SettingsScreen({ t, theme, setTheme }) {
  const [notifications, setNotifications] = useState(true);
  const [locationShare, setLocationShare] = useState(true);
  const [weeklyReport, setWeeklyReport] = useState(false);

  const Toggle = ({ value, onChange }) =>
    React.createElement('div', { onClick: () => onChange(!value), style: { width: 44, height: 26, borderRadius: 13, background: value ? t.primary : t.border, position: 'relative', cursor: 'pointer', transition: 'background 0.2s', flexShrink: 0 } },
      React.createElement('div', { style: { width: 20, height: 20, borderRadius: 10, background: '#fff', position: 'absolute', top: 3, left: value ? 21 : 3, transition: 'left 0.2s', boxShadow: '0 1px 4px rgba(0,0,0,0.2)' } })
    );

  const SettingRow = ({ icon, label, sub, right }) =>
    React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12, paddingBottom: 14, borderBottom: `1px solid ${t.border}`, marginBottom: 14 } },
      React.createElement('div', { style: { width: 36, height: 36, borderRadius: 10, background: t.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
        React.createElement(icon, { size: 18, color: t.primary })
      ),
      React.createElement('div', { style: { flex: 1 } },
        React.createElement('div', { style: { fontSize: 14, fontWeight: 600, color: t.text } }, label),
        sub && React.createElement('div', { style: { fontSize: 12, color: t.textMuted } }, sub)
      ),
      right
    );

  return React.createElement('div', { style: { flex: 1, overflowY: 'auto', background: t.bg } },
    // Profile header
    React.createElement('div', { style: { background: `linear-gradient(135deg, ${t.primary} 0%, ${t.primaryDark} 100%)`, padding: '20px 20px 28px' } },
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 14 } },
        React.createElement('div', { style: { width: 60, height: 60, borderRadius: 30, background: 'rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 } }, '👤'),
        React.createElement('div', null,
          React.createElement('div', { style: { fontSize: 18, fontWeight: 700, color: '#fff' } }, 'Alex Chen'),
          React.createElement('div', { style: { fontSize: 13, color: 'rgba(255,255,255,0.8)' } }, 'San Francisco, 94108'),
          React.createElement('div', { style: { fontSize: 12, color: 'rgba(255,255,255,0.7)', marginTop: 2 } }, 'Member since Jan 2026')
        )
      )
    ),
    React.createElement('div', { style: { padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 14 } },
      // Appearance
      React.createElement('div', { style: { background: t.card, borderRadius: 20, padding: '16px', border: `1px solid ${t.border}` } },
        React.createElement('div', { style: { fontSize: 12, fontWeight: 700, color: t.textMuted, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 14 } }, 'Appearance'),
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12 } },
          React.createElement('div', { style: { width: 36, height: 36, borderRadius: 10, background: t.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
            React.createElement(theme === 'dark' ? window.lucide.Moon : window.lucide.Sun, { size: 18, color: t.primary })
          ),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', { style: { fontSize: 14, fontWeight: 600, color: t.text } }, 'Theme'),
            React.createElement('div', { style: { fontSize: 12, color: t.textMuted } }, theme === 'dark' ? 'Dark mode is on' : 'Light mode is on')
          ),
          React.createElement('div', { style: { display: 'flex', background: t.surfaceAlt, borderRadius: 10, overflow: 'hidden', border: `1px solid ${t.border}` } },
            ['light', 'dark'].map(m =>
              React.createElement('div', { key: m, onClick: () => setTheme(m), style: { padding: '6px 12px', fontSize: 12, fontWeight: 600, cursor: 'pointer', background: theme === m ? t.primary : 'transparent', color: theme === m ? '#fff' : t.textMuted, transition: 'all 0.2s' } }, m.charAt(0).toUpperCase() + m.slice(1))
            )
          )
        )
      ),
      // Location & data
      React.createElement('div', { style: { background: t.card, borderRadius: 20, padding: '16px', border: `1px solid ${t.border}` } },
        React.createElement('div', { style: { fontSize: 12, fontWeight: 700, color: t.textMuted, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 14 } }, 'Location & Data'),
        React.createElement(SettingRow, { icon: window.lucide.MapPin, label: 'Home ZIP Code', sub: '94108 — SoMa, San Francisco', right: React.createElement(window.lucide.ChevronRight, { size: 16, color: t.textMuted }) }),
        React.createElement(SettingRow, { icon: window.lucide.Navigation, label: 'Share Location', sub: 'Used to find nearby loops', right: React.createElement(Toggle, { value: locationShare, onChange: setLocationShare }) }),
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12 } },
          React.createElement('div', { style: { width: 36, height: 36, borderRadius: 10, background: t.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
            React.createElement(window.lucide.Bell, { size: 18, color: t.primary })
          ),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', { style: { fontSize: 14, fontWeight: 600, color: t.text } }, 'Notifications'),
            React.createElement('div', { style: { fontSize: 12, color: t.textMuted } }, 'Refill reminders & new stations')
          ),
          React.createElement(Toggle, { value: notifications, onChange: setNotifications })
        )
      ),
      // Reports
      React.createElement('div', { style: { background: t.card, borderRadius: 20, padding: '16px', border: `1px solid ${t.border}` } },
        React.createElement('div', { style: { fontSize: 12, fontWeight: 700, color: t.textMuted, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 14 } }, 'Reports & Privacy'),
        React.createElement(SettingRow, { icon: window.lucide.Mail, label: 'Weekly Impact Report', sub: 'Email summary of your loops', right: React.createElement(Toggle, { value: weeklyReport, onChange: setWeeklyReport }) }),
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12 } },
          React.createElement('div', { style: { width: 36, height: 36, borderRadius: 10, background: t.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
            React.createElement(window.lucide.Database, { size: 18, color: t.primary })
          ),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', { style: { fontSize: 14, fontWeight: 600, color: t.text } }, 'My Data'),
            React.createElement('div', { style: { fontSize: 12, color: t.textMuted } }, 'Download or delete your history')
          ),
          React.createElement(window.lucide.ChevronRight, { size: 16, color: t.textMuted })
        )
      ),
      // About
      React.createElement('div', { style: { background: t.card, borderRadius: 20, padding: '16px', border: `1px solid ${t.border}` } },
        React.createElement('div', { style: { fontSize: 12, fontWeight: 700, color: t.textMuted, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 12 } }, 'About'),
        [
          { label: 'Data Sources', icon: window.lucide.BookOpen },
          { label: 'Rate LoopLens', icon: window.lucide.Star },
          { label: 'Feedback & Bugs', icon: window.lucide.MessageSquare },
          { label: 'Privacy Policy', icon: window.lucide.Shield },
        ].map((item, i) =>
          React.createElement('div', { key: i, style: { display: 'flex', alignItems: 'center', gap: 12, paddingBottom: i < 3 ? 12 : 0, borderBottom: i < 3 ? `1px solid ${t.border}` : 'none', marginBottom: i < 3 ? 12 : 0, cursor: 'pointer' } },
            React.createElement(item.icon, { size: 16, color: t.textMuted }),
            React.createElement('span', { style: { flex: 1, fontSize: 14, color: t.text } }, item.label),
            React.createElement(window.lucide.ChevronRight, { size: 14, color: t.textMuted })
          )
        )
      ),
      React.createElement('div', { style: { textAlign: 'center', fontSize: 12, color: t.textMuted, paddingBottom: 8 } }, 'LoopLens v1.0.0 · Made with 🌿 for the planet')
    )
  );
}

function App() {
  const [theme, setTheme] = useState('light');
  const [activeTab, setActiveTab] = useState('home');
  const [scannedProduct, setScannedProduct] = useState(null);
  const t = themes[theme];

  // Inject font
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap'); * { font-family: 'Plus Jakarta Sans', sans-serif; box-sizing: border-box; }`;
    document.head.appendChild(style);
    document.body.style.background = '#E5E7EB';
    document.body.style.margin = '0';
    document.body.style.display = 'flex';
    document.body.style.justifyContent = 'center';
    document.body.style.alignItems = 'flex-start';
    document.body.style.minHeight = '100vh';
    document.body.style.padding = '24px 0 48px';
  }, []);

  const tabs = [
    { id: 'home', label: 'Home', icon: window.lucide.Home },
    { id: 'scan', label: 'Scan', icon: window.lucide.ScanLine },
    { id: 'map', label: 'Map', icon: window.lucide.MapPin },
    { id: 'impact', label: 'Impact', icon: window.lucide.BarChart3 },
    { id: 'settings', label: 'Settings', icon: window.lucide.Settings },
  ];

  const screens = {
    home: () => React.createElement(HomeScreen, { t, setActiveTab, setScannedProduct }),
    scan: () => React.createElement(ScanScreen, { t, scannedProduct, setScannedProduct }),
    map: () => React.createElement(MapScreen, { t }),
    impact: () => React.createElement(ImpactScreen, { t }),
    settings: () => React.createElement(SettingsScreen, { t, theme, setTheme }),
  };

  return React.createElement('div', { style: { width: 375, minHeight: 812, background: t.bg, borderRadius: 44, overflow: 'hidden', boxShadow: '0 24px 80px rgba(0,0,0,0.25)', display: 'flex', flexDirection: 'column', position: 'relative', border: '8px solid #1A1A1A' } },
    // Dynamic Island
    React.createElement('div', { style: { position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)', width: 120, height: 34, background: '#000', borderRadius: 20, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 12, gap: 8 } },
      React.createElement('div', { style: { width: 10, height: 10, borderRadius: 5, background: '#1C1C1E', border: '2px solid #2C2C2E' } }),
      React.createElement('div', { style: { width: 14, height: 14, borderRadius: 7, background: '#1C1C1E', border: '2px solid #2C2C2E' } })
    ),
    // Status bar
    React.createElement('div', { style: { height: 54, paddingTop: 14, paddingLeft: 20, paddingRight: 20, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', background: t.surface, flexShrink: 0 } },
      React.createElement('span', { style: { fontSize: 13, fontWeight: 700, color: t.statusText } }, '9:41'),
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 5 } },
        React.createElement(window.lucide.Wifi, { size: 14, color: t.statusText }),
        React.createElement(window.lucide.Signal, { size: 14, color: t.statusText }),
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 2 } },
          React.createElement('div', { style: { width: 22, height: 11, borderRadius: 3, border: `1.5px solid ${t.statusText}`, position: 'relative', display: 'flex', alignItems: 'center', padding: '1px 2px' } },
            React.createElement('div', { style: { width: '75%', height: '100%', background: t.primary, borderRadius: 1 } })
          )
        )
      )
    ),
    // Screen content
    React.createElement('div', { style: { flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' } },
      screens[activeTab]()
    ),
    // Bottom Nav
    React.createElement('div', { style: { height: 72, background: t.navBg, borderTop: `1px solid ${t.navBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'space-around', paddingBottom: 8, flexShrink: 0 } },
      tabs.map(tab => {
        const isActive = activeTab === tab.id;
        const navItemStyle = { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, cursor: 'pointer', padding: '6px 12px', borderRadius: 12, background: isActive ? t.primaryGlow : 'transparent', transition: 'all 0.2s' };
        const labelStyle = { fontSize: 10, fontWeight: isActive ? 700 : 500, color: isActive ? t.primary : t.textMuted, transition: 'color 0.2s' };
        return React.createElement('div', { key: tab.id, onClick: () => setActiveTab(tab.id), style: navItemStyle },
          React.createElement(tab.icon, { size: 22, color: isActive ? t.primary : t.textMuted }),
          React.createElement('span', { style: labelStyle }, tab.label)
        );
      })
    )
  );
}
