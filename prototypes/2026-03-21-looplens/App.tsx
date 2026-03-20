function App() {
  const { useState } = React;

  const Icons = window.lucide || {};
  const Camera = Icons.Camera || (() => null);
  const MapPin = Icons.MapPin || (() => null);
  const Clock = Icons.Clock || (() => null);
  const User = Icons.User || (() => null);
  const Leaf = Icons.Leaf || (() => null);
  const Recycle = Icons.Recycle || (() => null);
  const Wrench = Icons.Wrench || (() => null);
  const ArrowLeft = Icons.ArrowLeft || (() => null);
  const Zap = Icons.Zap || (() => null);
  const Search = Icons.Search || (() => null);
  const Heart = Icons.Heart || (() => null);
  const CheckCircle = Icons.CheckCircle || (() => null);
  const TrendingUp = Icons.TrendingUp || (() => null);
  const Award = Icons.Award || (() => null);
  const Settings = Icons.Settings || (() => null);
  const Navigation = Icons.Navigation || (() => null);
  const ShoppingBag = Icons.ShoppingBag || (() => null);

  const [tab, setTab] = useState('scan');
  const [selectedItem, setSelectedItem] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [scanPct, setScanPct] = useState(0);
  const [pressed, setPressed] = useState(null);

  const C = {
    bg: '#0B170B',
    card: '#121F12',
    card2: '#192819',
    primary: '#4EBF72',
    primaryDark: '#2E7D32',
    teal: '#26C6DA',
    amber: '#FFB74D',
    red: '#EF5350',
    text: '#E8F5E9',
    muted: '#81C784',
    dim: '#3D6B3D',
    border: '#1E341E',
    nav: '#080E08',
  };

  const items = [
    {
      id: 1, name: "Levi's 501 Jeans", cat: 'Clothing', icon: '👖',
      score: 72, bestAction: 'Repair or Donate', resale: '$35–55',
      co2: '12kg CO₂ saved', repairability: 85,
      materials: ['78% Cotton', '22% Polyester'],
      recyclable: '78% recyclable',
      landfill: 'Medium impact',
      tips: ['Patch worn knees', 'Replace zipper ($8)', 'Hem adjustment ($15)'],
      lifespan: '8–12 years if maintained',
    },
    {
      id: 2, name: 'Vitamix Blender', cat: 'Kitchen', icon: '🍹',
      score: 88, bestAction: 'Repair', resale: '$80–120',
      co2: '45kg CO₂ saved', repairability: 92,
      materials: ['Polycarbonate', 'Steel', 'Copper'],
      recyclable: 'Motor as e-waste',
      landfill: 'Very high impact',
      tips: ['Replace blade assembly ($25)', 'New gasket seal ($12)', 'Motor service ($40)'],
      lifespan: '15–20 years if serviced',
    },
    {
      id: 3, name: 'Phone Case (Cracked)', cat: 'Electronics', icon: '📱',
      score: 22, bestAction: 'E-Waste Bin', resale: '$0–2',
      co2: '0.5kg CO₂ saved', repairability: 15,
      materials: ['TPU Silicone', 'Polycarbonate'],
      recyclable: 'Limited recycling',
      landfill: 'Medium impact',
      tips: ['Drop at e-waste bin', 'Not economically viable to repair'],
      lifespan: 'End of life',
    },
    {
      id: 4, name: 'North Face Jacket', cat: 'Outerwear', icon: '🧥',
      score: 81, bestAction: 'Repair or Resell', resale: '$65–95',
      co2: '28kg CO₂ saved', repairability: 78,
      materials: ['100% Nylon Shell', 'Duck Down Fill'],
      recyclable: 'Down fill recyclable',
      landfill: 'High impact',
      tips: ['Patch tears ($10)', 'Re-waterproof spray ($20)', 'Zipper replacement ($18)'],
      lifespan: '10–15 years',
    },
  ];

  const locations = [
    { id: 1, name: 'The Repair Cafe', type: 'Repair', dist: '0.3 mi', rating: 4.8, icon: '🔧', hours: 'Sat 10am–4pm', tags: 'Electronics · Clothing' },
    { id: 2, name: 'GreenCycle Hub', type: 'Recycle', dist: '0.7 mi', rating: 4.5, icon: '♻️', hours: 'Mon–Sat 8am–6pm', tags: 'Electronics · Batteries' },
    { id: 3, name: 'ThredUp Drop-off', type: 'Donate', dist: '1.1 mi', rating: 4.6, icon: '👕', hours: 'Daily 9am–8pm', tags: 'Clothing · Shoes' },
    { id: 4, name: 'EcoFill Station', type: 'Refill', dist: '0.5 mi', rating: 4.9, icon: '🫙', hours: 'Daily 7am–9pm', tags: 'Cleaning · Personal care' },
    { id: 5, name: 'Community Reuse', type: 'Resell', dist: '1.4 mi', rating: 4.3, icon: '🏪', hours: 'Tue–Sun 10am–5pm', tags: 'Furniture · Books' },
  ];

  const history = [
    { id: 1, name: 'Nike Air Max', date: '2 hours ago', action: 'Donated', score: 75, icon: '👟' },
    { id: 2, name: 'Bosch Drill', date: 'Yesterday', action: 'Repaired', score: 91, icon: '🔨' },
    { id: 3, name: 'Glass Bottle', date: '3 days ago', action: 'Recycled', score: 95, icon: '🫙' },
    { id: 4, name: 'H&M T-Shirt', date: '1 week ago', action: 'Donated', score: 55, icon: '👕' },
    { id: 5, name: 'Laptop Charger', date: '2 weeks ago', action: 'E-Waste', score: 82, icon: '🔌' },
  ];

  const startScan = (item) => {
    setScanning(true);
    setScanPct(0);
    let p = 0;
    const iv = setInterval(() => {
      p += 14;
      setScanPct(Math.min(p, 100));
      if (p >= 100) {
        clearInterval(iv);
        setTimeout(() => {
          setScanning(false);
          setSelectedItem(item);
          setTab('result');
        }, 300);
      }
    }, 80);
  };

  const press = (id) => {
    setPressed(id);
    setTimeout(() => setPressed(null), 160);
  };

  const scoreColor = (s) => s >= 75 ? C.primary : s >= 50 ? C.amber : C.red;
  const scoreLabel = (s) => s >= 75 ? 'Great Choice' : s >= 50 ? 'Caution' : 'Avoid';

  const now = new Date();
  const timeStr = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;

  // ─── SCAN SCREEN ────────────────────────────────────────────────────────────
  const ScanScreen = () => (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Viewfinder */}
      <div style={{
        height: '300px', flexShrink: 0, position: 'relative',
        background: 'linear-gradient(160deg, #0a1f0a 0%, #122212 100%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden',
      }}>
        {/* Ambient glow */}
        <div style={{ position: 'absolute', width: '200px', height: '200px', borderRadius: '50%', background: `radial-gradient(circle, ${C.primary}15 0%, transparent 70%)`, pointerEvents: 'none' }} />

        {/* Corner brackets */}
        {[
          { top: '50%', left: '50%', mt: '-90px', ml: '-90px', bt: 1, bl: 1 },
          { top: '50%', left: '50%', mt: '-90px', ml: '62px', bt: 1, br: 1 },
          { top: '50%', left: '50%', mt: '62px', ml: '-90px', bb: 1, bl: 1 },
          { top: '50%', left: '50%', mt: '62px', ml: '62px', bb: 1, br: 1 },
        ].map((b, i) => (
          <div key={i} style={{
            position: 'absolute', width: '28px', height: '28px',
            top: b.top, left: b.left,
            marginTop: b.mt, marginLeft: b.ml,
            borderTop: b.bt ? `2px solid ${C.primary}` : 'none',
            borderLeft: b.bl ? `2px solid ${C.primary}` : 'none',
            borderRight: b.br ? `2px solid ${C.primary}` : 'none',
            borderBottom: b.bb ? `2px solid ${C.primary}` : 'none',
          }} />
        ))}

        {/* Inner content */}
        {scanning ? (
          <div style={{ textAlign: 'center', zIndex: 2 }}>
            <div style={{ fontSize: '42px', marginBottom: '12px' }}>🔍</div>
            <div style={{ color: C.primary, fontSize: '13px', fontWeight: 600, marginBottom: '12px', letterSpacing: '0.5px' }}>
              Analyzing sustainability...
            </div>
            <div style={{ width: '140px', height: '4px', background: C.dim, borderRadius: '2px', overflow: 'hidden' }}>
              <div style={{ width: `${scanPct}%`, height: '100%', background: `linear-gradient(90deg, ${C.primaryDark}, ${C.primary})`, borderRadius: '2px', transition: 'width 0.08s linear' }} />
            </div>
            <div style={{ color: C.dim, fontSize: '11px', marginTop: '8px' }}>{scanPct}%</div>
          </div>
        ) : (
          <div style={{ textAlign: 'center', zIndex: 2 }}>
            <div style={{ color: C.dim, fontSize: '36px', marginBottom: '8px' }}>📷</div>
            <div style={{ color: C.muted, fontSize: '12px' }}>Point camera at any item</div>
          </div>
        )}

        {/* Scan sweep line */}
        {scanning && (
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            width: '180px', height: '2px',
            background: `linear-gradient(90deg, transparent, ${C.primary}88, ${C.primary}, ${C.primary}88, transparent)`,
            boxShadow: `0 0 10px ${C.primary}66`,
            animation: 'looplenscan 1.2s ease-in-out infinite',
            transform: 'translate(-50%, -50%)',
          }} />
        )}

        {/* Header overlay */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, padding: '16px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ color: C.text, fontSize: '20px', fontWeight: 800, letterSpacing: '-0.5px' }}>LoopLens</div>
            <div style={{ color: C.dim, fontSize: '10px', letterSpacing: '0.3px' }}>SEE WASTE BEFORE IT HAPPENS</div>
          </div>
          <div style={{ width: '34px', height: '34px', borderRadius: '17px', background: `${C.card}cc`, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${C.border}` }}>
            <Search size={15} color={C.muted} />
          </div>
        </div>

        {/* Bottom fade */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '60px', background: `linear-gradient(to bottom, transparent, ${C.bg})` }} />
      </div>

      {/* Demo tap items */}
      <div style={{ flex: 1, overflowY: 'auto', scrollbarWidth: 'none', padding: '12px 16px 0' }}>
        <div style={{ color: C.dim, fontSize: '11px', fontWeight: 700, letterSpacing: '0.8px', textTransform: 'uppercase', marginBottom: '10px' }}>
          Tap to demo scan →
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          {items.map(item => (
            <div
              key={item.id}
              onClick={() => { press(item.id); if (!scanning) startScan(item); }}
              style={{
                background: pressed === item.id ? C.card2 : C.card,
                borderRadius: '18px', padding: '14px',
                border: `1px solid ${C.border}`,
                cursor: 'pointer',
                transform: pressed === item.id ? 'scale(0.96)' : 'scale(1)',
                transition: 'all 0.15s ease',
              }}
            >
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>{item.icon}</div>
              <div style={{ color: C.text, fontSize: '12px', fontWeight: 700, lineHeight: 1.3, marginBottom: '4px' }}>{item.name}</div>
              <div style={{ color: C.dim, fontSize: '10px', marginBottom: '8px' }}>{item.cat}</div>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '3px',
                background: `${scoreColor(item.score)}20`, borderRadius: '8px', padding: '3px 8px',
              }}>
                <Leaf size={9} color={scoreColor(item.score)} />
                <span style={{ color: scoreColor(item.score), fontSize: '11px', fontWeight: 700 }}>{item.score}</span>
              </div>
            </div>
          ))}
        </div>
        <div style={{ height: '12px' }} />
      </div>
    </div>
  );

  // ─── RESULT SCREEN ───────────────────────────────────────────────────────────
  const ResultScreen = () => {
    if (!selectedItem) return null;
    const item = selectedItem;
    const sc = scoreColor(item.score);
    const [saved, setSaved] = useState(false);

    return (
      <div style={{ height: '100%', overflowY: 'auto', scrollbarWidth: 'none' }}>
        {/* Back header */}
        <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '12px', position: 'sticky', top: 0, background: C.bg, zIndex: 10, borderBottom: `1px solid ${C.border}` }}>
          <div
            onClick={() => { setTab('scan'); setSelectedItem(null); }}
            style={{ width: '34px', height: '34px', borderRadius: '17px', background: C.card2, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: `1px solid ${C.border}` }}
          >
            <ArrowLeft size={16} color={C.muted} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ color: C.text, fontSize: '16px', fontWeight: 700 }}>{item.name}</div>
            <div style={{ color: C.dim, fontSize: '11px' }}>{item.cat}</div>
          </div>
          <div style={{ fontSize: '30px' }}>{item.icon}</div>
        </div>

        <div style={{ padding: '16px' }}>
          {/* Score card */}
          <div style={{
            background: `linear-gradient(135deg, ${C.card} 0%, ${C.card2} 100%)`,
            borderRadius: '22px', padding: '22px',
            border: `1px solid ${C.border}`, marginBottom: '14px',
            textAlign: 'center',
          }}>
            <div style={{ color: C.dim, fontSize: '11px', fontWeight: 700, letterSpacing: '0.8px', textTransform: 'uppercase', marginBottom: '10px' }}>
              Green Decision Score
            </div>
            <div style={{ fontSize: '72px', fontWeight: 800, color: sc, lineHeight: 1, marginBottom: '6px', fontVariantNumeric: 'tabular-nums' }}>
              {item.score}
            </div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              background: `${sc}20`, borderRadius: '12px', padding: '5px 14px', marginBottom: '10px',
            }}>
              <Leaf size={12} color={sc} />
              <span style={{ color: sc, fontSize: '13px', fontWeight: 700 }}>{item.bestAction}</span>
            </div>
            <div style={{ color: C.muted, fontSize: '12px', marginBottom: '16px' }}>{item.co2}</div>

            {/* Bar */}
            <div style={{ height: '6px', background: C.border, borderRadius: '3px', overflow: 'hidden', marginBottom: '6px' }}>
              <div style={{ width: `${item.score}%`, height: '100%', background: `linear-gradient(90deg, ${C.primaryDark}, ${sc})`, borderRadius: '3px', transition: 'width 0.6s ease' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: C.dim, fontSize: '10px' }}>Landfill risk</span>
              <span style={{ color: C.dim, fontSize: '10px' }}>Perfect loop ♻️</span>
            </div>
          </div>

          {/* Stat pills */}
          <div style={{ display: 'flex', gap: '10px', marginBottom: '14px' }}>
            {[
              { label: 'Repairability', value: `${item.repairability}%`, icon: Wrench, color: C.teal },
              { label: 'Resale Value', value: item.resale, icon: TrendingUp, color: C.amber },
              { label: 'Recyclable', value: item.recyclable, icon: Recycle, color: C.primary },
            ].map((s, i) => (
              <div key={i} style={{ flex: 1, background: C.card, borderRadius: '14px', padding: '12px 6px', textAlign: 'center', border: `1px solid ${C.border}` }}>
                <s.icon size={16} color={s.color} />
                <div style={{ color: s.color, fontSize: '11px', fontWeight: 700, marginTop: '5px', marginBottom: '2px', lineHeight: 1.2 }}>{s.value}</div>
                <div style={{ color: C.dim, fontSize: '9px' }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Repair tips */}
          <div style={{ marginBottom: '14px' }}>
            <div style={{ color: C.text, fontSize: '14px', fontWeight: 700, marginBottom: '10px' }}>Repair Pathways</div>
            {item.tips.map((tip, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '11px 12px', background: C.card, borderRadius: '12px', marginBottom: '7px', border: `1px solid ${C.border}` }}>
                <CheckCircle size={15} color={C.primary} />
                <span style={{ color: C.text, fontSize: '13px' }}>{tip}</span>
              </div>
            ))}
          </div>

          {/* Materials */}
          <div style={{ marginBottom: '14px' }}>
            <div style={{ color: C.text, fontSize: '14px', fontWeight: 700, marginBottom: '8px' }}>Materials</div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {item.materials.map((m, i) => (
                <span key={i} style={{ background: C.card2, color: C.muted, borderRadius: '20px', padding: '5px 12px', fontSize: '12px', border: `1px solid ${C.border}` }}>{m}</span>
              ))}
            </div>
          </div>

          {/* Lifespan banner */}
          <div style={{
            padding: '14px', background: `${C.primary}14`, borderRadius: '14px',
            border: `1px solid ${C.primary}33`, display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '14px',
          }}>
            <Zap size={20} color={C.primary} />
            <div>
              <div style={{ color: C.primary, fontSize: '12px', fontWeight: 600 }}>Expected Lifespan</div>
              <div style={{ color: C.text, fontSize: '13px', marginTop: '2px' }}>{item.lifespan}</div>
            </div>
          </div>

          {/* Nearby */}
          <div style={{ marginBottom: '14px' }}>
            <div style={{ color: C.text, fontSize: '14px', fontWeight: 700, marginBottom: '10px' }}>Nearby Options</div>
            {locations.slice(0, 2).map(loc => (
              <div key={loc.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: C.card, borderRadius: '12px', marginBottom: '8px', border: `1px solid ${C.border}` }}>
                <span style={{ fontSize: '22px' }}>{loc.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ color: C.text, fontSize: '13px', fontWeight: 600 }}>{loc.name}</div>
                  <div style={{ color: C.dim, fontSize: '11px', marginTop: '2px' }}>{loc.dist} · {loc.hours}</div>
                </div>
                <div style={{ background: `${C.primary}20`, borderRadius: '8px', padding: '3px 8px' }}>
                  <span style={{ color: C.primary, fontSize: '11px', fontWeight: 700 }}>{loc.type}</span>
                </div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: '10px', marginBottom: '8px' }}>
            <div
              onClick={() => setTab('map')}
              style={{ flex: 1, padding: '14px', background: C.primary, borderRadius: '14px', textAlign: 'center', cursor: 'pointer' }}
            >
              <span style={{ color: '#fff', fontSize: '14px', fontWeight: 700 }}>Find Nearby Spots</span>
            </div>
            <div
              onClick={() => setSaved(!saved)}
              style={{
                width: '48px', height: '48px', background: C.card2, borderRadius: '14px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', border: `1px solid ${saved ? C.red : C.border}`,
                transition: 'all 0.2s ease',
              }}
            >
              <Heart size={20} color={saved ? C.red : C.muted} fill={saved ? C.red : 'none'} />
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ─── MAP SCREEN ──────────────────────────────────────────────────────────────
  const MapScreen = () => {
    const [filter, setFilter] = useState('All');
    const filters = ['All', 'Repair', 'Recycle', 'Donate', 'Refill', 'Resell'];
    const filtered = filter === 'All' ? locations : locations.filter(l => l.type === filter);
    const typeColors = { Repair: C.teal, Recycle: C.primary, Donate: C.amber, Refill: '#B39DDB', Resell: '#80DEEA' };

    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '16px 16px 10px', flexShrink: 0 }}>
          <div style={{ color: C.text, fontSize: '22px', fontWeight: 800, marginBottom: '2px' }}>Local Action Map</div>
          <div style={{ color: C.muted, fontSize: '12px' }}>Near you · San Francisco, CA</div>
        </div>

        {/* Map visual */}
        <div style={{
          margin: '0 16px 12px', height: '148px', borderRadius: '18px',
          background: 'linear-gradient(135deg, #0d250d 0%, #142a14 100%)',
          position: 'relative', overflow: 'hidden', flexShrink: 0,
          border: `1px solid ${C.border}`,
        }}>
          {/* Grid */}
          {[20, 40, 60, 80].map(p => (
            <div key={p} style={{ position: 'absolute', left: `${p}%`, top: 0, bottom: 0, borderLeft: `1px solid ${C.border}`, opacity: 0.6 }} />
          ))}
          {[33, 66].map(p => (
            <div key={p} style={{ position: 'absolute', top: `${p}%`, left: 0, right: 0, borderTop: `1px solid ${C.border}`, opacity: 0.6 }} />
          ))}

          {/* Pins */}
          {[
            { x: '18%', y: '38%', c: C.teal }, { x: '62%', y: '55%', c: C.primary },
            { x: '75%', y: '22%', c: C.amber }, { x: '38%', y: '72%', c: C.primary },
            { x: '82%', y: '60%', c: '#B39DDB' }
          ].map((p, i) => (
            <div key={i} style={{ position: 'absolute', left: p.x, top: p.y, transform: 'translate(-50%,-50%)' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '5px', background: p.c, boxShadow: `0 0 8px ${p.c}88` }} />
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '18px', height: '18px', borderRadius: '9px', border: `1px solid ${p.c}44` }} />
            </div>
          ))}

          {/* You */}
          <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', zIndex: 2 }}>
            <div style={{ width: '14px', height: '14px', borderRadius: '7px', background: '#fff', border: `3px solid ${C.primary}`, boxShadow: `0 0 14px ${C.primary}88` }} />
          </div>

          <div style={{ position: 'absolute', bottom: '8px', left: '10px', background: `${C.bg}cc`, borderRadius: '8px', padding: '3px 8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Navigation size={10} color={C.muted} />
            <span style={{ color: C.muted, fontSize: '10px' }}>{locations.length} spots nearby</span>
          </div>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: '7px', padding: '0 16px 10px', overflowX: 'auto', scrollbarWidth: 'none', flexShrink: 0 }}>
          {filters.map(f => (
            <div
              key={f}
              onClick={() => setFilter(f)}
              style={{
                whiteSpace: 'nowrap', padding: '6px 13px', borderRadius: '20px',
                background: filter === f ? (typeColors[f] || C.primary) : C.card2,
                color: filter === f ? '#fff' : C.muted,
                fontSize: '12px', fontWeight: filter === f ? 700 : 400,
                cursor: 'pointer', border: `1px solid ${filter === f ? (typeColors[f] || C.primary) : C.border}`,
                transition: 'all 0.15s ease', flexShrink: 0,
              }}
            >
              {f}
            </div>
          ))}
        </div>

        {/* List */}
        <div style={{ flex: 1, overflowY: 'auto', scrollbarWidth: 'none', padding: '0 16px 8px' }}>
          {filtered.map(loc => {
            const tc = typeColors[loc.type] || C.primary;
            return (
              <div key={loc.id} style={{ background: C.card, borderRadius: '16px', padding: '14px', marginBottom: '10px', border: `1px solid ${C.border}`, cursor: 'pointer' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: `${tc}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', border: `1px solid ${tc}30` }}>
                    {loc.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ color: C.text, fontSize: '14px', fontWeight: 700 }}>{loc.name}</div>
                    <div style={{ color: C.muted, fontSize: '11px', marginTop: '2px' }}>{loc.dist} away · ⭐ {loc.rating}</div>
                  </div>
                  <div style={{ background: `${tc}20`, borderRadius: '8px', padding: '4px 10px', border: `1px solid ${tc}30` }}>
                    <span style={{ color: tc, fontSize: '11px', fontWeight: 700 }}>{loc.type}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: C.dim, fontSize: '11px' }}>{loc.tags}</span>
                  <span style={{ color: C.dim, fontSize: '11px' }}>{loc.hours}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // ─── HISTORY SCREEN ──────────────────────────────────────────────────────────
  const HistoryScreen = () => (
    <div style={{ height: '100%', overflowY: 'auto', scrollbarWidth: 'none', padding: '16px' }}>
      <div style={{ color: C.text, fontSize: '22px', fontWeight: 800, marginBottom: '2px' }}>Your Loop Journal</div>
      <div style={{ color: C.muted, fontSize: '12px', marginBottom: '18px' }}>5 items scanned this month</div>

      {/* Impact stats */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '20px' }}>
        {[
          { label: 'CO₂ Saved', value: '87kg', icon: '🌿', color: C.primary },
          { label: 'Items Looped', value: '5', icon: '♻️', color: C.teal },
          { label: 'Saved', value: '$142', icon: '💰', color: C.amber },
        ].map((s, i) => (
          <div key={i} style={{ background: C.card, borderRadius: '14px', padding: '14px 8px', textAlign: 'center', border: `1px solid ${C.border}` }}>
            <div style={{ fontSize: '20px', marginBottom: '4px' }}>{s.icon}</div>
            <div style={{ color: s.color, fontSize: '18px', fontWeight: 800 }}>{s.value}</div>
            <div style={{ color: C.dim, fontSize: '9px', marginTop: '2px' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Weekly progress */}
      <div style={{ background: C.card, borderRadius: '16px', padding: '14px', marginBottom: '18px', border: `1px solid ${C.border}` }}>
        <div style={{ color: C.text, fontSize: '13px', fontWeight: 700, marginBottom: '12px' }}>This Week</div>
        <div style={{ display: 'flex', gap: '6px', alignItems: 'flex-end', height: '50px' }}>
          {[
            { day: 'M', h: 30, active: false }, { day: 'T', h: 60, active: false },
            { day: 'W', h: 40, active: false }, { day: 'T', h: 80, active: false },
            { day: 'F', h: 100, active: false }, { day: 'S', h: 55, active: true },
            { day: 'S', h: 0, active: false },
          ].map((d, i) => (
            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
              <div style={{
                width: '100%', height: `${d.h * 0.4 + 4}px`,
                background: d.active ? C.primary : d.h > 0 ? `${C.primary}55` : C.border,
                borderRadius: '4px', transition: 'height 0.3s ease',
              }} />
              <span style={{ color: d.active ? C.primary : C.dim, fontSize: '9px' }}>{d.day}</span>
            </div>
          ))}
        </div>
      </div>

      {/* History list */}
      <div style={{ color: C.dim, fontSize: '11px', fontWeight: 700, letterSpacing: '0.8px', textTransform: 'uppercase', marginBottom: '10px' }}>
        Recent Scans
      </div>
      {history.map(h => {
        const sc = scoreColor(h.score);
        return (
          <div key={h.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '13px', background: C.card, borderRadius: '14px', marginBottom: '8px', border: `1px solid ${C.border}`, cursor: 'pointer' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: C.card2, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', border: `1px solid ${C.border}` }}>
              {h.icon}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ color: C.text, fontSize: '13px', fontWeight: 600 }}>{h.name}</div>
              <div style={{ color: C.dim, fontSize: '11px', marginTop: '2px' }}>{h.date}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ background: `${C.primary}20`, borderRadius: '8px', padding: '3px 8px', marginBottom: '4px' }}>
                <span style={{ color: C.primary, fontSize: '11px', fontWeight: 700 }}>{h.action}</span>
              </div>
              <div style={{ color: sc, fontSize: '12px', fontWeight: 700 }}>{h.score}/100</div>
            </div>
          </div>
        );
      })}
    </div>
  );

  // ─── PROFILE SCREEN ──────────────────────────────────────────────────────────
  const ProfileScreen = () => {
    const [toggles, setToggles] = useState([true, true, false, true]);
    return (
      <div style={{ height: '100%', overflowY: 'auto', scrollbarWidth: 'none', padding: '16px' }}>
        {/* Avatar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '22px' }}>
          <div style={{
            width: '64px', height: '64px', borderRadius: '32px',
            background: `linear-gradient(135deg, ${C.primary}, ${C.teal})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '30px', flexShrink: 0,
          }}>
            🌿
          </div>
          <div>
            <div style={{ color: C.text, fontSize: '18px', fontWeight: 800 }}>Alex Green</div>
            <div style={{ color: C.muted, fontSize: '12px', marginTop: '2px' }}>Eco Warrior · Level 3</div>
            <div style={{ display: 'flex', gap: '3px', marginTop: '5px' }}>
              {[...Array(5)].map((_, i) => (
                <span key={i} style={{ color: i < 3 ? C.amber : C.border, fontSize: '12px' }}>★</span>
              ))}
            </div>
          </div>
          <div style={{ marginLeft: 'auto', width: '34px', height: '34px', borderRadius: '17px', background: C.card2, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${C.border}`, cursor: 'pointer' }}>
            <Settings size={15} color={C.muted} />
          </div>
        </div>

        {/* Impact summary */}
        <div style={{
          background: `linear-gradient(135deg, ${C.primaryDark}44, ${C.card} 70%)`,
          borderRadius: '20px', padding: '18px', marginBottom: '20px',
          border: `1px solid ${C.primary}33`,
        }}>
          <div style={{ color: C.primary, fontSize: '12px', fontWeight: 700, marginBottom: '14px', letterSpacing: '0.3px' }}>Your Impact This Month</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            {[
              { val: '87 kg', label: 'CO₂ Saved', sub: '= 3 trees planted' },
              { val: '5 items', label: 'Items Looped', sub: 'vs landfill' },
              { val: '340 L', label: 'Water Saved', sub: '= 68 showers' },
              { val: '$142', label: 'Money Saved', sub: 'repair vs replace' },
            ].map((s, i) => (
              <div key={i}>
                <div style={{ color: C.text, fontSize: '20px', fontWeight: 800 }}>{s.val}</div>
                <div style={{ color: C.primary, fontSize: '11px', fontWeight: 600, marginTop: '2px' }}>{s.label}</div>
                <div style={{ color: C.dim, fontSize: '10px', marginTop: '1px' }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div style={{ color: C.text, fontSize: '14px', fontWeight: 700, marginBottom: '12px' }}>Achievements</div>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '22px', overflowX: 'auto', scrollbarWidth: 'none' }}>
          {[
            { name: 'First Scan', icon: '🔍', done: true },
            { name: 'Repair Hero', icon: '🔧', done: true },
            { name: 'Zero Waster', icon: '♻️', done: true },
            { name: 'Eco Veteran', icon: '🌳', done: false },
            { name: 'Loop Master', icon: '🏆', done: false },
          ].map((a, i) => (
            <div key={i} style={{ textAlign: 'center', flexShrink: 0, width: '58px' }}>
              <div style={{
                width: '50px', height: '50px', borderRadius: '25px', margin: '0 auto 6px',
                background: a.done ? `${C.primary}28` : C.card,
                border: `2px solid ${a.done ? C.primary : C.border}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '22px', opacity: a.done ? 1 : 0.35,
              }}>
                {a.icon}
              </div>
              <div style={{ color: a.done ? C.muted : C.dim, fontSize: '9px', lineHeight: 1.3 }}>{a.name}</div>
            </div>
          ))}
        </div>

        {/* Settings */}
        <div style={{ color: C.text, fontSize: '14px', fontWeight: 700, marginBottom: '12px' }}>Preferences</div>
        {[
          { label: 'Location Services', sub: 'For nearby recommendations' },
          { label: 'Scan History', sub: 'Save all scanned items' },
          { label: 'Repair Notifications', sub: 'Tips and local events' },
          { label: 'Local Recycling Rules', sub: 'Updated for San Francisco' },
        ].map((s, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', padding: '13px', background: C.card, borderRadius: '12px', marginBottom: '8px', border: `1px solid ${C.border}` }}>
            <div style={{ flex: 1 }}>
              <div style={{ color: C.text, fontSize: '13px', fontWeight: 600 }}>{s.label}</div>
              <div style={{ color: C.dim, fontSize: '11px', marginTop: '2px' }}>{s.sub}</div>
            </div>
            <div
              onClick={() => setToggles(t => t.map((v, j) => j === i ? !v : v))}
              style={{
                width: '42px', height: '24px', borderRadius: '12px',
                background: toggles[i] ? C.primary : C.border,
                position: 'relative', cursor: 'pointer', transition: 'background 0.2s ease', flexShrink: 0,
              }}
            >
              <div style={{
                position: 'absolute', top: '3px',
                left: toggles[i] ? '21px' : '3px',
                width: '18px', height: '18px', borderRadius: '9px',
                background: '#fff', transition: 'left 0.2s ease',
                boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
              }} />
            </div>
          </div>
        ))}
        <div style={{ height: '8px' }} />
      </div>
    );
  };

  // ─── LAYOUT ──────────────────────────────────────────────────────────────────
  const navTabs = [
    { id: 'scan', label: 'Scan', Icon: Camera },
    { id: 'map', label: 'Map', Icon: MapPin },
    { id: 'history', label: 'History', Icon: Clock },
    { id: 'profile', label: 'Profile', Icon: User },
  ];

  const renderScreen = () => {
    if (tab === 'result') return <ResultScreen />;
    if (tab === 'map') return <MapScreen />;
    if (tab === 'history') return <HistoryScreen />;
    if (tab === 'profile') return <ProfileScreen />;
    return <ScanScreen />;
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'radial-gradient(ellipse at 50% 0%, #0d2b0d 0%, #050b05 60%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
      padding: '20px',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
        ::-webkit-scrollbar { display: none; }
        @keyframes looplenscan {
          0% { transform: translate(-50%, -70px); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translate(-50%, 70px); opacity: 0; }
        }
        @keyframes fadein {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Phone */}
      <div style={{
        width: '375px', height: '812px',
        background: C.bg, borderRadius: '52px',
        overflow: 'hidden', position: 'relative',
        boxShadow: '0 50px 120px rgba(0,0,0,0.95), 0 0 0 1px #1c2e1c, inset 0 0 0 1px #243824',
        display: 'flex', flexDirection: 'column',
      }}>
        {/* Dynamic Island */}
        <div style={{
          position: 'absolute', top: '14px', left: '50%',
          transform: 'translateX(-50%)',
          width: '126px', height: '37px',
          background: '#000', borderRadius: '20px', zIndex: 100,
        }} />

        {/* Status bar */}
        <div style={{
          height: '52px', flexShrink: 0,
          display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
          paddingLeft: '28px', paddingRight: '24px', paddingBottom: '6px',
        }}>
          <span style={{ color: C.text, fontSize: '15px', fontWeight: 700 }}>{timeStr}</span>
          <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '2px', alignItems: 'flex-end' }}>
              {[5, 8, 11, 13].map((h, i) => (
                <div key={i} style={{ width: '3px', height: `${h}px`, background: i < 3 ? C.text : C.dim, borderRadius: '1px' }} />
              ))}
            </div>
            <svg width="16" height="11" viewBox="0 0 16 11" fill="none">
              <path d="M8 2C10.5 2 12.7 3 14.3 4.6L16 2.9C13.9 0.9 11.1 0 8 0C4.9 0 2.1 0.9 0 2.9L1.7 4.6C3.3 3 5.5 2 8 2Z" fill={C.text} fillOpacity="0.5"/>
              <path d="M8 5C9.7 5 11.3 5.7 12.5 6.8L14.2 5.1C12.5 3.5 10.4 2.6 8 2.6C5.6 2.6 3.5 3.5 1.8 5.1L3.5 6.8C4.7 5.7 6.3 5 8 5Z" fill={C.text} fillOpacity="0.7"/>
              <path d="M8 8C9 8 9.9 8.4 10.6 9L8 11.7L5.4 9C6.1 8.4 7 8 8 8Z" fill={C.text}/>
            </svg>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1px' }}>
              <div style={{ width: '23px', height: '11px', border: `1.5px solid ${C.text}88`, borderRadius: '3px', padding: '1.5px' }}>
                <div style={{ width: '75%', height: '100%', background: C.primary, borderRadius: '1px' }} />
              </div>
              <div style={{ width: '2px', height: '5px', background: `${C.text}88`, borderRadius: '0 1px 1px 0' }} />
            </div>
          </div>
        </div>

        {/* Screen content */}
        <div style={{ flex: 1, overflow: 'hidden', animation: 'fadein 0.25s ease' }} key={tab}>
          {renderScreen()}
        </div>

        {/* Nav bar */}
        <div style={{
          height: '82px', flexShrink: 0,
          background: C.nav, borderTop: `1px solid ${C.border}`,
          display: 'flex', alignItems: 'center', paddingBottom: '12px',
        }}>
          {navTabs.map(t => {
            const active = tab === t.id || (tab === 'result' && t.id === 'scan');
            return (
              <div
                key={t.id}
                onClick={() => { setTab(t.id); if (t.id === 'scan') setSelectedItem(null); }}
                style={{
                  flex: 1, display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center', gap: '4px',
                  cursor: 'pointer', paddingTop: t.id === 'scan' ? '0' : '10px',
                  transition: 'opacity 0.15s ease',
                }}
              >
                {t.id === 'scan' ? (
                  <div style={{
                    width: '52px', height: '52px', borderRadius: '26px',
                    background: active ? C.primary : C.card2,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginTop: '-18px',
                    boxShadow: active ? `0 4px 20px ${C.primary}66` : `0 2px 8px rgba(0,0,0,0.5)`,
                    border: `2px solid ${active ? C.primary : C.border}`,
                    transition: 'all 0.2s ease',
                  }}>
                    <t.Icon size={22} color={active ? '#fff' : C.dim} />
                  </div>
                ) : (
                  <>
                    <t.Icon size={20} color={active ? C.primary : C.dim} />
                    <span style={{ color: active ? C.primary : C.dim, fontSize: '10px', fontWeight: active ? 700 : 400, transition: 'color 0.15s ease' }}>{t.label}</span>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
