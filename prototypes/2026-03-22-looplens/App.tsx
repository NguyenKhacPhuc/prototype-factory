
const { useState, useEffect, useRef } = React;

// ═══════════════════════════════════════════
// THEME SYSTEM
// ═══════════════════════════════════════════
const themes = {
  light: {
    bg: '#EDF8F3',
    surface: '#FFFFFF',
    surface2: '#F3FAF6',
    surface3: '#E5F5EC',
    card: '#FFFFFF',
    text: '#0B1F13',
    textSec: '#4A7060',
    textTer: '#8EADA0',
    primary: '#1A9E5C',
    primaryAlt: '#22C55E',
    primaryBg: '#DCFCE7',
    accent: '#0EA5E9',
    accentBg: '#E0F2FE',
    warn: '#F59E0B',
    warnBg: '#FEF3C7',
    error: '#EF4444',
    border: '#D0EAD8',
    shadow: 'rgba(26,158,92,0.10)',
    navBg: '#FFFFFF',
  },
  dark: {
    bg: '#060E09',
    surface: '#0C1E12',
    surface2: '#132A1B',
    surface3: '#1A3524',
    card: '#0C1E12',
    text: '#E4F5EC',
    textSec: '#6CA882',
    textTer: '#3B6550',
    primary: '#22C55E',
    primaryAlt: '#4ADE80',
    primaryBg: '#0D3020',
    accent: '#38BDF8',
    accentBg: '#0A2030',
    warn: '#FBBF24',
    warnBg: '#2D1F05',
    error: '#FC8181',
    border: '#183022',
    shadow: 'rgba(34,197,94,0.12)',
    navBg: '#0C1E12',
  }
};

// ═══════════════════════════════════════════
// SAMPLE DATA
// ═══════════════════════════════════════════
const scannedItems = [
  {
    id: 1, name: 'Philips USB-C Charger', brand: 'Philips', category: 'Electronics', image: '🔌',
    wasteScore: 72, co2: '1.4 kg', bestAction: 'repair',
    actions: [
      { type: 'repair', label: 'Repair Cable', desc: '2 repair shops nearby · Est. $8–12', icon: 'Wrench', color: '#F59E0B' },
      { type: 'recycle', label: 'E-Waste Drop-off', desc: 'Best Buy · 0.4 mi', icon: 'Recycle', color: '#0EA5E9' },
      { type: 'resell', label: 'Sell for Parts', desc: 'iFixit Marketplace · Est. $5', icon: 'Tag', color: '#8B5CF6' },
    ],
    lifespan: '3–5 yrs', owned: '2 years',
    tip: 'Cable sheathing failure is the #1 issue. A $3 sleeve fix prevents e-waste and extends life by 2+ years.',
  },
  {
    id: 2, name: 'Method Dish Soap 500ml', brand: 'Method', category: 'Household', image: '🧴',
    wasteScore: 28, co2: '0.18 kg', bestAction: 'refill',
    actions: [
      { type: 'refill', label: 'Refill Station', desc: 'Grove Co. · 0.8 mi · Saves $4/refill', icon: 'Droplets', color: '#22C55E' },
      { type: 'recycle', label: 'Recycle Bottle', desc: 'Rinse & place in blue bin · #2 HDPE', icon: 'Recycle', color: '#0EA5E9' },
      { type: 'buy', label: 'Switch to Tabs', desc: 'Blueland Tabs — 90% less plastic', icon: 'ShoppingBag', color: '#EC4899' },
    ],
    lifespan: 'Single use', owned: '~3 weeks',
    tip: 'This bottle is #2 HDPE — fully recyclable. A refill subscription eliminates 6 plastic bottles per year.',
  },
  {
    id: 3, name: 'Cuisinart Blender', brand: 'Cuisinart', category: 'Appliances', image: '🫙',
    wasteScore: 85, co2: '12.6 kg', bestAction: 'repair',
    actions: [
      { type: 'repair', label: 'Replace Coupling', desc: 'Common $6 fix on Amazon — 10 min install', icon: 'Wrench', color: '#F59E0B' },
      { type: 'repair', label: 'FabLab Austin', desc: 'Free repair nights every Tuesday 6–9pm', icon: 'Hammer', color: '#F59E0B' },
      { type: 'donate', label: 'Donate for Parts', desc: 'Habitat ReStore accepts small appliances', icon: 'Heart', color: '#EF4444' },
    ],
    lifespan: '8–12 yrs', owned: '4 years',
    tip: 'The rubber drive coupling is the #1 failure point in Cuisinart blenders. A $6 part fix extends life by years.',
  },
];

const nearbyPlaces = [
  { id: 1, name: 'iFixit Repair Bar', type: 'repair', dist: '0.3 mi', rating: 4.8, reviews: 142, accepts: ['Electronics', 'Phones', 'Laptops'], hours: 'Open · Closes 7pm', icon: '🔧' },
  { id: 2, name: 'Grove Refill Station', type: 'refill', dist: '0.8 mi', rating: 4.9, reviews: 87, accepts: ['Cleaning', 'Personal Care', 'Laundry'], hours: 'Open · Closes 6pm', icon: '💧' },
  { id: 3, name: 'Habitat ReStore', type: 'donate', dist: '1.2 mi', rating: 4.6, reviews: 312, accepts: ['Furniture', 'Appliances', 'Tools'], hours: 'Open · Closes 5pm', icon: '🏠' },
  { id: 4, name: 'Best Buy E-Waste', type: 'recycle', dist: '1.5 mi', rating: 4.3, reviews: 56, accepts: ['Electronics', 'Batteries', 'Cables'], hours: 'Open · Closes 9pm', icon: '♻️' },
  { id: 5, name: 'Buffalo Exchange', type: 'thrift', dist: '0.6 mi', rating: 4.5, reviews: 203, accepts: ['Clothing', 'Accessories', 'Shoes'], hours: 'Open · Closes 8pm', icon: '👕' },
  { id: 6, name: 'FabLab Austin', type: 'repair', dist: '2.1 mi', rating: 4.9, reviews: 44, accepts: ['DIY Repair', 'Electronics', 'Sewing', '3D Print'], hours: 'Repair Night Tue 6–9pm', icon: '⚙️' },
  { id: 7, name: 'Whole Foods Bulk', type: 'refill', dist: '0.9 mi', rating: 4.4, reviews: 178, accepts: ['Bulk Food', 'Nuts', 'Grains', 'Oils'], hours: 'Open · Closes 9pm', icon: '🌿' },
  { id: 8, name: 'City Recycling Ctr', type: 'recycle', dist: '3.2 mi', rating: 4.1, reviews: 89, accepts: ['All Recyclables', 'Hazardous Waste', 'Paint'], hours: 'Open · Closes 4pm', icon: '🏭' },
];

const impactData = {
  totalItems: 47, co2Saved: '38.4 kg', moneySaved: '$124', plasticAvoided: '2.3 kg', streak: 14,
  monthlyGoal: 20, monthlyProgress: 15,
  recentActivity: [
    { date: 'Today', item: 'Dish Soap Bottle', action: 'Refilled', saved: '$4.20', co2: '0.18 kg', icon: '🧴' },
    { date: 'Yesterday', item: 'Denim Jacket', action: 'Donated', saved: '$28', co2: '5.2 kg', icon: '👔' },
    { date: 'Mar 20', item: 'AA Batteries ×8', action: 'Recycled', saved: '$0', co2: '0.4 kg', icon: '🔋' },
    { date: 'Mar 19', item: 'Ceramic Mug', action: 'Repaired', saved: '$18', co2: '1.2 kg', icon: '☕' },
    { date: 'Mar 18', item: 'Phone Charger', action: 'Repaired', saved: '$25', co2: '1.4 kg', icon: '🔌' },
  ],
  weeklyData: [12, 8, 15, 6, 18, 10, 14],
};

const ACTION_COLORS = { repair: '#F59E0B', refill: '#22C55E', recycle: '#0EA5E9', donate: '#EF4444', thrift: '#8B5CF6', resell: '#8B5CF6', buy: '#EC4899' };
const ACTION_ICONS_MAP = { repair: '🔧', refill: '💧', recycle: '♻️', donate: '❤️', thrift: '👕', resell: '🏷️', buy: '🛍️' };
const TYPE_COLORS = { repair: '#F59E0B', refill: '#22C55E', recycle: '#0EA5E9', donate: '#EF4444', thrift: '#8B5CF6' };

// ═══════════════════════════════════════════
// APP
// ═══════════════════════════════════════════
function App() {
  const [isDark, setIsDark] = useState(false);
  const [activeTab, setActiveTab] = useState('scan');
  const [scanState, setScanState] = useState('idle'); // idle | scanning | result
  const [currentItem, setCurrentItem] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [scanProgress, setScanProgress] = useState(0);
  const [pressedBtn, setPressedBtn] = useState(null);
  const [scanLinePos, setScanLinePos] = useState(20);
  const [scanLineDir, setScanLineDir] = useState(1);

  const t = isDark ? themes.dark : themes.light;

  // Scan line animation
  useEffect(() => {
    if (scanState !== 'scanning') return;
    const interval = setInterval(() => {
      setScanLinePos(prev => {
        const next = prev + scanLineDir * 3;
        if (next >= 80) { setScanLineDir(-1); return 80; }
        if (next <= 20) { setScanLineDir(1); return 20; }
        return next;
      });
    }, 30);
    return () => clearInterval(interval);
  }, [scanState, scanLineDir]);

  const startScan = () => {
    setScanState('scanning');
    setScanProgress(0);
    setScanLinePos(20);
    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 12 + 5;
      setScanProgress(Math.min(p, 100));
      if (p >= 100) {
        clearInterval(interval);
        const item = scannedItems[Math.floor(Math.random() * scannedItems.length)];
        setCurrentItem(item);
        setScanState('result');
      }
    }, 160);
  };

  const resetScan = () => { setScanState('idle'); setCurrentItem(null); setScanProgress(0); };

  const press = (id, cb) => {
    setPressedBtn(id);
    setTimeout(() => { setPressedBtn(null); if (cb) cb(); }, 180);
  };

  const isScanDark = activeTab === 'scan' && scanState !== 'result';

  // ─────────────────────────────────
  // SCAN SCREEN
  // ─────────────────────────────────
  const ScanIdle = () => (
    <div style={{ height: 641, display: 'flex', flexDirection: 'column', background: '#050e07' }}>
      {/* Camera viewfinder */}
      <div style={{ height: 430, position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
        {/* BG */}
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 40% 50%, #0d2918 0%, #050e07 70%)' }} />
        {/* Subtle grid */}
        <div style={{ position: 'absolute', inset: 0, opacity: 0.08, backgroundImage: 'linear-gradient(rgba(34,197,94,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,0.5) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        {/* Viewfinder corners */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -52%)', width: 230, height: 175 }}>
          {[['top','left'],['top','right'],['bottom','left'],['bottom','right']].map(([v,h], i) => (
            <div key={i} style={{ position: 'absolute', [v]: 0, [h]: 0, width: 26, height: 26,
              borderTop: v === 'top' ? '3px solid #22C55E' : 'none',
              borderBottom: v === 'bottom' ? '3px solid #22C55E' : 'none',
              borderLeft: h === 'left' ? '3px solid #22C55E' : 'none',
              borderRight: h === 'right' ? '3px solid #22C55E' : 'none',
              borderTopLeftRadius: v==='top'&&h==='left' ? 5 : 0,
              borderTopRightRadius: v==='top'&&h==='right' ? 5 : 0,
              borderBottomLeftRadius: v==='bottom'&&h==='left' ? 5 : 0,
              borderBottomRightRadius: v==='bottom'&&h==='right' ? 5 : 0,
            }} />
          ))}
          <div style={{ position: 'absolute', bottom: -28, left: '50%', transform: 'translateX(-50%)', whiteSpace: 'nowrap', fontSize: 11, color: 'rgba(255,255,255,0.4)', letterSpacing: 1.5, fontWeight: 600 }}>
            POINT AT ITEM OR BARCODE
          </div>
        </div>
        {/* Bottom gradient */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '55%', background: 'linear-gradient(transparent, rgba(5,14,7,0.95))' }} />
        {/* Instruction text */}
        <div style={{ position: 'absolute', bottom: 100, left: 0, right: 0, textAlign: 'center', padding: '0 36px' }}>
          <div style={{ color: 'rgba(255,255,255,0.92)', fontSize: 16, fontWeight: 700, marginBottom: 5 }}>See what to do with this item</div>
          <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: 12 }}>Scan a product, barcode, or worn item</div>
        </div>
        {/* Scan button */}
        <div style={{ position: 'absolute', bottom: 24, left: '50%', transform: 'translateX(-50%)' }}>
          <div onClick={() => press('scan-btn', startScan)} style={{
            width: 70, height: 70, borderRadius: 35,
            background: pressedBtn === 'scan-btn' ? '#16A34A' : '#22C55E',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 0 7px rgba(34,197,94,0.18), 0 0 0 14px rgba(34,197,94,0.07), 0 8px 28px rgba(34,197,94,0.5)',
            cursor: 'pointer', transform: pressedBtn === 'scan-btn' ? 'scale(0.93)' : 'scale(1)', transition: 'all 0.15s',
          }}>
            {React.createElement(window.lucide.Camera, { size: 27, color: '#fff' })}
          </div>
        </div>
        {/* Top actions */}
        <div style={{ position: 'absolute', top: 14, right: 18, display: 'flex', gap: 10 }}>
          {['⚡', '🕐'].map((icon, i) => (
            <div key={i} style={{ width: 36, height: 36, borderRadius: 18, background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, cursor: 'pointer' }}>{icon}</div>
          ))}
        </div>
        {/* LoopLens wordmark */}
        <div style={{ position: 'absolute', top: 18, left: 20 }}>
          <div style={{ fontSize: 16, fontWeight: 900, color: '#22C55E', letterSpacing: -0.5 }}>LoopLens</div>
        </div>
      </div>
      {/* Recent scans panel */}
      <div style={{ flex: 1, background: t.surface, borderTopLeftRadius: 22, borderTopRightRadius: 22, padding: '16px 20px', marginTop: -12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: t.text }}>Recent Scans</div>
          <div style={{ fontSize: 12, color: t.primary, fontWeight: 600 }}>See all</div>
        </div>
        <div style={{ display: 'flex', gap: 10, overflowX: 'auto', scrollbarWidth: 'none', paddingBottom: 4 }}>
          {scannedItems.map(item => (
            <div key={item.id} onClick={() => { setCurrentItem(item); setScanState('result'); }}
              style={{ minWidth: 88, padding: '10px 8px', background: t.surface2, borderRadius: 14, cursor: 'pointer', textAlign: 'center', border: `1px solid ${t.border}`, flexShrink: 0 }}>
              <div style={{ fontSize: 26, marginBottom: 5 }}>{item.image}</div>
              <div style={{ fontSize: 10, fontWeight: 700, color: t.text, marginBottom: 4, lineHeight: 1.2 }}>{item.name.split(' ').slice(0,2).join(' ')}</div>
              <div style={{ fontSize: 9, fontWeight: 800, color: '#fff', background: ACTION_COLORS[item.bestAction] || t.primary, borderRadius: 6, padding: '2px 6px', display: 'inline-block' }}>
                {item.bestAction.toUpperCase()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const ScanScanning = () => (
    <div style={{ height: 641, background: '#050e07', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 28, padding: '0 36px' }}>
      {/* Scanning animation */}
      <div style={{ position: 'relative', width: 180, height: 180 }}>
        {[0,1,2].map(i => (
          <div key={i} style={{
            position: 'absolute', inset: i * 22, borderRadius: '50%',
            border: `2px solid rgba(34,197,94,${0.75 - i * 0.22})`,
            animation: `loopPulse ${1.1 + i * 0.35}s ease-in-out infinite`,
          }} />
        ))}
        <div style={{ position: 'absolute', inset: 66, borderRadius: '50%', background: 'linear-gradient(135deg,#22C55E,#0EA5E9)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {React.createElement(window.lucide.Scan, { size: 26, color: '#fff' })}
        </div>
      </div>
      {/* Viewfinder with scan line */}
      <div style={{ width: 220, height: 120, position: 'relative', border: '1px solid rgba(34,197,94,0.3)', borderRadius: 8 }}>
        <div style={{ position: 'absolute', left: 0, right: 0, top: `${scanLinePos}%`, height: 2, background: 'linear-gradient(90deg, transparent, #22C55E, transparent)', boxShadow: '0 0 8px #22C55E', transition: 'top 0.03s linear' }} />
        {[['top','left'],['top','right'],['bottom','left'],['bottom','right']].map(([v,h], i) => (
          <div key={i} style={{ position: 'absolute', [v]: -1, [h]: -1, width: 14, height: 14,
            borderTop: v==='top' ? '2px solid #22C55E' : 'none', borderBottom: v==='bottom' ? '2px solid #22C55E' : 'none',
            borderLeft: h==='left' ? '2px solid #22C55E' : 'none', borderRight: h==='right' ? '2px solid #22C55E' : 'none',
          }} />
        ))}
      </div>
      <div>
        <div style={{ color: '#fff', fontSize: 17, fontWeight: 700, textAlign: 'center', marginBottom: 6 }}>Analyzing item...</div>
        <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: 12, textAlign: 'center' }}>
          {scanProgress < 30 ? 'Detecting item type...' : scanProgress < 60 ? 'Checking local services...' : scanProgress < 85 ? 'Finding repair options...' : 'Almost done...'}
        </div>
      </div>
      {/* Progress bar */}
      <div style={{ width: '100%', height: 3, background: 'rgba(255,255,255,0.08)', borderRadius: 2, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${scanProgress}%`, background: 'linear-gradient(90deg,#22C55E,#0EA5E9)', borderRadius: 2, transition: 'width 0.16s' }} />
      </div>
    </div>
  );

  const ScanResult = () => {
    const item = currentItem;
    if (!item) return null;
    const scoreColor = item.wasteScore > 60 ? '#EF4444' : item.wasteScore > 35 ? '#F59E0B' : '#22C55E';
    return (
      <div style={{ height: 641, display: 'flex', flexDirection: 'column' }}>
        {/* Camera zone with item preview */}
        <div style={{ height: 190, flexShrink: 0, position: 'relative', background: 'radial-gradient(ellipse at 50% 40%, #0f2e1a 0%, #050e07 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ fontSize: 72, filter: 'drop-shadow(0 8px 20px rgba(34,197,94,0.3))' }}>{item.image}</div>
          <div onClick={resetScan} style={{ position: 'absolute', top: 14, left: 16, width: 34, height: 34, borderRadius: 17, background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            {React.createElement(window.lucide.X, { size: 17, color: '#fff' })}
          </div>
          <div style={{ position: 'absolute', top: 14, right: 16, background: '#22C55E', borderRadius: 20, padding: '4px 10px', fontSize: 10, fontWeight: 800, color: '#fff', letterSpacing: 0.5 }}>✓ IDENTIFIED</div>
        </div>
        {/* Result sheet */}
        <div style={{ flex: 1, background: t.surface, borderTopLeftRadius: 24, borderTopRightRadius: 24, overflowY: 'auto', scrollbarWidth: 'none', marginTop: -18 }}>
          <div style={{ padding: '18px 18px 20px' }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
              <div>
                <div style={{ fontSize: 17, fontWeight: 800, color: t.text, lineHeight: 1.2 }}>{item.name}</div>
                <div style={{ fontSize: 11, color: t.textSec, marginTop: 2 }}>{item.brand} · {item.category} · Owned {item.owned}</div>
              </div>
              <div style={{ textAlign: 'center', background: t.surface2, borderRadius: 12, padding: '6px 10px', border: `1px solid ${t.border}` }}>
                <div style={{ fontSize: 20, fontWeight: 900, color: scoreColor, lineHeight: 1 }}>{item.wasteScore}</div>
                <div style={{ fontSize: 8, color: t.textSec, fontWeight: 700, letterSpacing: 0.5 }}>IMPACT</div>
              </div>
            </div>
            {/* Tip */}
            <div style={{ background: isDark ? '#0D2A18' : '#F0FDF4', borderRadius: 12, padding: '10px 12px', marginBottom: 14, border: `1px solid ${isDark ? '#1A4025' : '#BBDDC8'}` }}>
              <div style={{ fontSize: 11, color: t.textSec, lineHeight: 1.55 }}>💡 {item.tip}</div>
            </div>
            {/* Quick stats */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
              {[
                { label: 'CO₂ Avoided', value: item.co2, color: '#22C55E' },
                { label: 'Est. Lifespan', value: item.lifespan, color: '#0EA5E9' },
                { label: 'Best Action', value: item.bestAction, color: ACTION_COLORS[item.bestAction] || t.primary },
              ].map((stat, i) => (
                <div key={i} style={{ flex: 1, background: t.surface2, borderRadius: 10, padding: '8px 4px', textAlign: 'center', border: `1px solid ${t.border}` }}>
                  <div style={{ fontSize: 11, fontWeight: 800, color: stat.color, marginBottom: 1 }}>{stat.value}</div>
                  <div style={{ fontSize: 9, color: t.textTer, fontWeight: 600 }}>{stat.label}</div>
                </div>
              ))}
            </div>
            {/* Actions */}
            <div style={{ fontSize: 12, fontWeight: 700, color: t.textSec, letterSpacing: 0.5, marginBottom: 8 }}>RECOMMENDED ACTIONS</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {item.actions.map((action, i) => (
                <div key={i} onClick={() => press(`ra-${i}`)} style={{
                  background: pressedBtn === `ra-${i}` ? t.surface2 : t.surface,
                  border: `1px solid ${i === 0 ? action.color + '55' : t.border}`,
                  borderRadius: 14, padding: '12px 13px',
                  display: 'flex', alignItems: 'center', gap: 11, cursor: 'pointer',
                  transform: pressedBtn === `ra-${i}` ? 'scale(0.97)' : 'scale(1)',
                  transition: 'all 0.14s',
                  boxShadow: i === 0 ? `0 3px 10px ${action.color}22` : 'none',
                }}>
                  <div style={{ width: 38, height: 38, borderRadius: 10, background: action.color + '1A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 19, flexShrink: 0 }}>
                    {ACTION_ICONS_MAP[action.type] || '♻️'}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: t.text }}>{action.label}</div>
                    <div style={{ fontSize: 11, color: t.textSec }}>{action.desc}</div>
                  </div>
                  {i === 0 && <div style={{ fontSize: 9, fontWeight: 800, color: '#fff', background: action.color, borderRadius: 6, padding: '2px 7px', flexShrink: 0 }}>BEST</div>}
                  {React.createElement(window.lucide.ChevronRight, { size: 15, color: t.textTer })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ─────────────────────────────────
  // NEARBY SCREEN
  // ─────────────────────────────────
  const NearbyScreen = () => {
    const filters = [
      { id: 'all', label: 'All', icon: '🌍' },
      { id: 'repair', label: 'Repair', icon: '🔧' },
      { id: 'refill', label: 'Refill', icon: '💧' },
      { id: 'recycle', label: 'Recycle', icon: '♻️' },
      { id: 'donate', label: 'Donate', icon: '❤️' },
      { id: 'thrift', label: 'Thrift', icon: '👕' },
    ];
    const filtered = activeFilter === 'all' ? nearbyPlaces : nearbyPlaces.filter(p => p.type === activeFilter);

    return (
      <div style={{ background: t.bg, minHeight: '100%', paddingBottom: 20 }}>
        {/* Header */}
        <div style={{ background: t.surface, padding: '20px 20px 14px', borderBottom: `1px solid ${t.border}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
            <div>
              <div style={{ fontSize: 22, fontWeight: 800, color: t.text }}>Nearby</div>
              <div style={{ fontSize: 12, color: t.textSec }}>Austin, TX · {filtered.length} places found</div>
            </div>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: t.surface2, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${t.border}`, cursor: 'pointer' }}>
              {React.createElement(window.lucide.SlidersHorizontal, { size: 16, color: t.textSec })}
            </div>
          </div>
          {/* Search bar */}
          <div style={{ background: t.surface2, border: `1px solid ${t.border}`, borderRadius: 12, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
            {React.createElement(window.lucide.Search, { size: 15, color: t.textTer })}
            <span style={{ fontSize: 13, color: t.textTer }}>Search repair shops, refill stations...</span>
          </div>
        </div>
        {/* Filter chips */}
        <div style={{ overflowX: 'auto', scrollbarWidth: 'none' }}>
          <div style={{ display: 'flex', gap: 8, padding: '12px 20px 8px', minWidth: 'max-content' }}>
            {filters.map(f => (
              <div key={f.id} onClick={() => setActiveFilter(f.id)} style={{
                display: 'flex', alignItems: 'center', gap: 5,
                padding: '6px 13px', borderRadius: 20, cursor: 'pointer', whiteSpace: 'nowrap',
                background: activeFilter === f.id ? t.primary : t.surface,
                color: activeFilter === f.id ? '#fff' : t.textSec,
                fontSize: 12, fontWeight: 600,
                border: `1px solid ${activeFilter === f.id ? t.primary : t.border}`,
                transition: 'all 0.18s',
                boxShadow: activeFilter === f.id ? `0 2px 8px ${t.primary}40` : 'none',
              }}>
                <span style={{ fontSize: 13 }}>{f.icon}</span>{f.label}
              </div>
            ))}
          </div>
        </div>
        {/* List */}
        <div style={{ padding: '4px 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {filtered.map(place => (
            <div key={place.id} onClick={() => press(`pl-${place.id}`)} style={{
              background: t.card, borderRadius: 16, padding: '14px',
              border: `1px solid ${t.border}`,
              transform: pressedBtn === `pl-${place.id}` ? 'scale(0.975)' : 'scale(1)',
              transition: 'all 0.14s', cursor: 'pointer',
              boxShadow: `0 2px 10px ${t.shadow}`,
            }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{ width: 46, height: 46, borderRadius: 13, background: (TYPE_COLORS[place.type] || t.primary) + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>
                  {place.icon}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: t.text, flex: 1 }}>{place.name}</div>
                    <div style={{ fontSize: 12, color: t.textSec, flexShrink: 0, marginLeft: 8 }}>{place.dist}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, margin: '4px 0' }}>
                    <div style={{ fontSize: 10, fontWeight: 800, color: TYPE_COLORS[place.type] || t.primary, background: (TYPE_COLORS[place.type] || t.primary) + '18', borderRadius: 6, padding: '2px 7px' }}>
                      {place.type.toUpperCase()}
                    </div>
                    <div style={{ fontSize: 11, color: '#F59E0B', fontWeight: 700 }}>★ {place.rating}</div>
                    <div style={{ fontSize: 10, color: t.textTer }}>({place.reviews})</div>
                  </div>
                  <div style={{ fontSize: 11, color: t.textSec, marginBottom: 7 }}>{place.hours}</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                    {place.accepts.slice(0, 3).map((a, i) => (
                      <div key={i} style={{ fontSize: 10, color: t.textSec, background: t.surface2, borderRadius: 6, padding: '2px 7px', border: `1px solid ${t.border}` }}>{a}</div>
                    ))}
                    {place.accepts.length > 3 && <div style={{ fontSize: 10, color: t.textTer, alignSelf: 'center' }}>+{place.accepts.length - 3}</div>}
                  </div>
                </div>
              </div>
              {/* CTA */}
              <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                <div style={{ flex: 1, height: 32, borderRadius: 8, background: t.surface2, border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 600, color: t.textSec, cursor: 'pointer', gap: 5 }}>
                  {React.createElement(window.lucide.Navigation, { size: 12 })} Directions
                </div>
                <div style={{ flex: 1, height: 32, borderRadius: 8, background: t.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#fff', cursor: 'pointer', gap: 5 }}>
                  {React.createElement(window.lucide.Phone, { size: 12 })} Contact
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ─────────────────────────────────
  // IMPACT SCREEN
  // ─────────────────────────────────
  const ImpactScreen = () => {
    const weekDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
    const maxVal = Math.max(...impactData.weeklyData);
    return (
      <div style={{ background: t.bg, minHeight: '100%', paddingBottom: 20 }}>
        {/* Gradient header */}
        <div style={{ background: `linear-gradient(135deg, ${t.primary} 0%, #0EA5E9 100%)`, padding: '22px 20px 36px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -30, right: -30, width: 140, height: 140, borderRadius: '50%', background: 'rgba(255,255,255,0.07)' }} />
          <div style={{ position: 'absolute', bottom: -20, left: 10, width: 90, height: 90, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 18 }}>
            <div>
              <div style={{ fontSize: 22, fontWeight: 800, color: '#fff' }}>Your Impact</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)', marginTop: 2 }}>March 2026 · 🔥 {impactData.streak}-day streak</div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.15)', borderRadius: 10, padding: '6px 10px', backdropFilter: 'blur(10px)' }}>
              <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.7)', fontWeight: 700, marginBottom: 1 }}>RANK</div>
              <div style={{ fontSize: 14, fontWeight: 900, color: '#fff' }}>🥇 Top 8%</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            {[
              { val: impactData.co2Saved, label: 'CO₂ Avoided', icon: '🌿' },
              { val: impactData.moneySaved, label: 'Money Saved', icon: '💰' },
              { val: impactData.totalItems, label: 'Items Rescued', icon: '♻️' },
            ].map((stat, i) => (
              <div key={i} style={{ flex: 1, background: 'rgba(255,255,255,0.14)', borderRadius: 14, padding: '10px 8px', backdropFilter: 'blur(10px)' }}>
                <div style={{ fontSize: 11, marginBottom: 4 }}>{stat.icon}</div>
                <div style={{ fontSize: 17, fontWeight: 900, color: '#fff', lineHeight: 1 }}>{stat.val}</div>
                <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.65)', fontWeight: 600, marginTop: 3 }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ padding: '16px 20px', marginTop: -20 }}>
          {/* Weekly chart */}
          <div style={{ background: t.card, borderRadius: 20, padding: '16px', marginBottom: 14, border: `1px solid ${t.border}`, boxShadow: `0 4px 18px ${t.shadow}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: t.text }}>This Week</div>
              <div style={{ fontSize: 11, color: t.textSec }}>CO₂ saved · grams</div>
            </div>
            <div style={{ display: 'flex', gap: 7, alignItems: 'flex-end', height: 64 }}>
              {impactData.weeklyData.map((val, i) => (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
                  <div style={{ width: '100%', borderRadius: '4px 4px 3px 3px', height: `${Math.max((val / maxVal) * 52, 6)}px`, background: i === 6 ? `linear-gradient(180deg, ${t.primaryAlt}, ${t.primary})` : isDark ? '#1A3525' : '#DCFCE7', transition: 'height 0.4s' }} />
                  <div style={{ fontSize: 9, color: t.textTer, fontWeight: 600 }}>{weekDays[i]}</div>
                </div>
              ))}
            </div>
          </div>
          {/* Monthly goal */}
          <div style={{ background: t.card, borderRadius: 20, padding: '16px', marginBottom: 14, border: `1px solid ${t.border}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: t.text }}>Monthly Goal</div>
              <div style={{ fontSize: 13, fontWeight: 800, color: t.primary }}>{impactData.monthlyProgress} / {impactData.monthlyGoal} items</div>
            </div>
            <div style={{ height: 8, background: t.surface2, borderRadius: 4, overflow: 'hidden', marginBottom: 8 }}>
              <div style={{ height: '100%', width: `${(impactData.monthlyProgress / impactData.monthlyGoal) * 100}%`, background: `linear-gradient(90deg, ${t.primary}, #0EA5E9)`, borderRadius: 4, transition: 'width 0.6s' }} />
            </div>
            <div style={{ fontSize: 11, color: t.textSec }}>{impactData.monthlyGoal - impactData.monthlyProgress} more items to reach your March goal 🎉</div>
          </div>
          {/* Recent activity */}
          <div style={{ fontSize: 13, fontWeight: 700, color: t.text, marginBottom: 10 }}>Recent Activity</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
            {impactData.recentActivity.map((activity, i) => (
              <div key={i} style={{ background: t.card, borderRadius: 14, padding: '12px 13px', display: 'flex', alignItems: 'center', gap: 12, border: `1px solid ${t.border}` }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: t.surface2, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>
                  {activity.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: t.text }}>{activity.item}</div>
                  <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                    <div style={{ fontSize: 11, color: t.primary, fontWeight: 600 }}>{activity.action}</div>
                    <div style={{ fontSize: 10, color: t.textTer }}>· {activity.date}</div>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: activity.saved !== '$0' ? '#22C55E' : t.textTer }}>{activity.saved}</div>
                  <div style={{ fontSize: 10, color: t.textTer }}>-{activity.co2}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // ─────────────────────────────────
  // PROFILE / SETTINGS SCREEN
  // ─────────────────────────────────
  const ProfileScreen = () => (
    <div style={{ background: t.bg, minHeight: '100%', paddingBottom: 24 }}>
      {/* User header */}
      <div style={{ background: t.surface, padding: '24px 20px 20px', borderBottom: `1px solid ${t.border}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
          <div style={{ width: 58, height: 58, borderRadius: 29, background: `linear-gradient(135deg, ${t.primary}, #0EA5E9)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 900, color: '#fff', boxShadow: `0 4px 14px ${t.primary}50` }}>S</div>
          <div>
            <div style={{ fontSize: 18, fontWeight: 800, color: t.text }}>Steve M.</div>
            <div style={{ fontSize: 12, color: t.textSec }}>Member since Jan 2025 · Austin, TX</div>
            <div style={{ fontSize: 11, color: t.primary, fontWeight: 700, marginTop: 2 }}>🔥 {impactData.streak}-day streak · 🌍 Top 8%</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          {[{ val: impactData.totalItems, label: 'Items' }, { val: impactData.co2Saved, label: 'CO₂ Saved' }, { val: impactData.moneySaved, label: 'Saved' }].map((stat, i) => (
            <div key={i} style={{ flex: 1, textAlign: 'center', padding: '10px 4px', background: t.surface2, borderRadius: 12, border: `1px solid ${t.border}` }}>
              <div style={{ fontSize: 16, fontWeight: 900, color: t.primary }}>{stat.val}</div>
              <div style={{ fontSize: 10, color: t.textSec, fontWeight: 600 }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: '16px 20px' }}>
        {/* Theme toggle card */}
        <div style={{ background: t.card, borderRadius: 18, padding: '16px', marginBottom: 14, border: `1px solid ${t.border}`, boxShadow: `0 2px 10px ${t.shadow}` }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: t.textTer, letterSpacing: 0.7, marginBottom: 13 }}>APPEARANCE</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 38, height: 38, borderRadius: 11, background: isDark ? '#0D2438' : '#FEF3C7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {isDark ? React.createElement(window.lucide.Moon, { size: 19, color: '#60A5FA' }) : React.createElement(window.lucide.Sun, { size: 19, color: '#F59E0B' })}
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: t.text }}>Dark Mode</div>
                <div style={{ fontSize: 11, color: t.textSec }}>{isDark ? 'Dark theme active' : 'Light theme active'}</div>
              </div>
            </div>
            <div onClick={() => setIsDark(!isDark)} style={{ width: 52, height: 30, borderRadius: 15, cursor: 'pointer', background: isDark ? t.primary : '#D1D5DB', position: 'relative', transition: 'background 0.3s' }}>
              <div style={{ position: 'absolute', top: 4, left: isDark ? 26 : 4, width: 22, height: 22, borderRadius: 11, background: '#fff', boxShadow: '0 2px 6px rgba(0,0,0,0.2)', transition: 'left 0.28s' }} />
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div style={{ background: t.card, borderRadius: 18, padding: '16px', marginBottom: 14, border: `1px solid ${t.border}` }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: t.textTer, letterSpacing: 0.7, marginBottom: 13 }}>PREFERENCES</div>
          {[
            { icon: '📍', label: 'Location', value: 'Austin, TX', color: '#0EA5E9' },
            { icon: '🔔', label: 'Notifications', value: 'On · Weekly digest', color: '#22C55E' },
            { icon: '🏙️', label: 'City Waste Rules', value: 'Updated Mar 2026', color: '#8B5CF6' },
            { icon: '🌐', label: 'Language', value: 'English', color: '#F59E0B' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: i < 3 ? `1px solid ${t.border}` : 'none' }}>
              <div style={{ width: 34, height: 34, borderRadius: 9, background: t.surface2, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17 }}>{item.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: t.text }}>{item.label}</div>
                <div style={{ fontSize: 11, color: t.textSec }}>{item.value}</div>
              </div>
              {React.createElement(window.lucide.ChevronRight, { size: 15, color: t.textTer })}
            </div>
          ))}
        </div>

        {/* About */}
        <div style={{ background: t.card, borderRadius: 18, padding: '16px', border: `1px solid ${t.border}` }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: t.textTer, letterSpacing: 0.7, marginBottom: 13 }}>ABOUT</div>
          {[
            { icon: '📖', label: 'How LoopLens Works' },
            { icon: '🤝', label: 'Partner a Location' },
            { icon: '⭐', label: 'Rate the App' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: i < 2 ? `1px solid ${t.border}` : 'none' }}>
              <div style={{ width: 34, height: 34, borderRadius: 9, background: t.surface2, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17 }}>{item.icon}</div>
              <div style={{ flex: 1, fontSize: 13, fontWeight: 600, color: t.text }}>{item.label}</div>
              {React.createElement(window.lucide.ChevronRight, { size: 15, color: t.textTer })}
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 22, fontSize: 11, color: t.textTer }}>LoopLens v1.0 · See waste before you make it 🌍</div>
      </div>
    </div>
  );

  // ─────────────────────────────────
  // TABS
  // ─────────────────────────────────
  const tabs = [
    { id: 'scan', label: 'Scan', icon: 'Camera' },
    { id: 'nearby', label: 'Nearby', icon: 'MapPin' },
    { id: 'impact', label: 'Impact', icon: 'BarChart2' },
    { id: 'profile', label: 'Profile', icon: 'User' },
  ];

  const renderScreen = () => {
    switch (activeTab) {
      case 'scan': return scanState === 'idle' ? <ScanIdle /> : scanState === 'scanning' ? <ScanScanning /> : <ScanResult />;
      case 'nearby': return <NearbyScreen />;
      case 'impact': return <ImpactScreen />;
      case 'profile': return <ProfileScreen />;
    }
  };

  const isScanStatusDark = activeTab === 'scan' && scanState !== 'result';

  return (
    <div style={{ minHeight: '100vh', background: '#e0e0e0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { display: none; }
        @keyframes loopPulse {
          0%, 100% { opacity: 0.35; transform: scale(1); }
          50% { opacity: 0.75; transform: scale(1.03); }
        }
      `}</style>

      <div style={{
        width: 375, height: 812, background: t.bg, borderRadius: 50, overflow: 'hidden', position: 'relative',
        boxShadow: '0 40px 80px rgba(0,0,0,0.38), 0 0 0 1px rgba(255,255,255,0.08)',
        display: 'flex', flexDirection: 'column',
      }}>
        {/* Dynamic Island */}
        <div style={{ width: 124, height: 34, background: '#000', borderRadius: 20, position: 'absolute', top: 5, left: '50%', transform: 'translateX(-50%)', zIndex: 100 }} />

        {/* Status Bar */}
        <div style={{ height: 44, flexShrink: 0, background: isScanStatusDark ? '#000' : t.surface, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px 0 20px' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: isScanStatusDark ? '#fff' : t.text }}>9:41</div>
          <div style={{ width: 128 }} />
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            {React.createElement(window.lucide.Wifi, { size: 14, color: isScanStatusDark ? '#fff' : t.text })}
            {React.createElement(window.lucide.Battery, { size: 16, color: isScanStatusDark ? '#fff' : t.text })}
          </div>
        </div>

        {/* Screen */}
        <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', scrollbarWidth: 'none' }}>
          {renderScreen()}
        </div>

        {/* Bottom Nav */}
        <div style={{ height: 83, background: t.navBg, borderTop: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-around', paddingBottom: 20, flexShrink: 0 }}>
          {tabs.map(tab => {
            const isActive = activeTab === tab.id;
            const IconComp = window.lucide[tab.icon];
            return (
              <div key={tab.id} onClick={() => { setActiveTab(tab.id); if (tab.id !== 'scan') setScanState('idle'); }}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, cursor: 'pointer', padding: '4px 14px', position: 'relative' }}>
                {isActive && <div style={{ position: 'absolute', top: -4, width: 4, height: 4, borderRadius: 2, background: t.primary }} />}
                {React.createElement(IconComp, { size: 22, color: isActive ? t.primary : t.textTer, strokeWidth: isActive ? 2.5 : 1.75 })}
                <div style={{ fontSize: 10, fontWeight: isActive ? 700 : 500, color: isActive ? t.primary : t.textTer }}>{tab.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
