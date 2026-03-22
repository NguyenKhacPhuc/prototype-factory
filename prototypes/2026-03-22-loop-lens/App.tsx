const { useState, useEffect, useRef } = React;

function App() {
  // ─── THEME SYSTEM ────────────────────────────────────────────────────────────
  const themes = {
    light: {
      phoneBg:      '#FFFFFF',
      bg:           '#F0FDF9',
      surface:      '#FFFFFF',
      card:         '#FFFFFF',
      cardAlt:      '#F0FDF9',
      text:         '#0D2B22',
      textSec:      '#3D7A68',
      textMuted:    '#8DBDAA',
      primary:      '#10B981',
      primaryDark:  '#059669',
      primaryLight: '#ECFDF5',
      accent:       '#06D6A0',
      accentLight:  '#CCFBF1',
      warning:      '#F59E0B',
      warningLight: '#FEF3C7',
      danger:       '#EF4444',
      dangerLight:  '#FEE2E2',
      purple:       '#8B5CF6',
      navBg:        '#FFFFFF',
      border:       '#D1FAE5',
      shadow:       '0 2px 16px rgba(16,185,129,0.14)',
      mapGrad:      'linear-gradient(135deg, #bbf7d0, #6ee7b7)',
    },
    dark: {
      phoneBg:      '#0F1F18',
      bg:           '#0A1512',
      surface:      '#152018',
      card:         '#1A2E22',
      cardAlt:      '#152018',
      text:         '#E2FFF4',
      textSec:      '#6BB89D',
      textMuted:    '#3D7A62',
      primary:      '#10B981',
      primaryDark:  '#059669',
      primaryLight: '#064E3B',
      accent:       '#06D6A0',
      accentLight:  '#022C22',
      warning:      '#F59E0B',
      warningLight: '#3D2C00',
      danger:       '#EF4444',
      dangerLight:  '#3D0A0A',
      purple:       '#A78BFA',
      navBg:        '#0F1F18',
      border:       '#1E3D2C',
      shadow:       '0 2px 16px rgba(0,0,0,0.5)',
      mapGrad:      'linear-gradient(135deg, #14532d, #166534)',
    },
  };

  const [theme, setTheme] = useState('light');
  const [tab, setTab]     = useState('scan');
  // scan: 'idle' | 'scanning' | 'result'
  const [scanPhase, setScanPhase]     = useState('idle');
  const [scanY, setScanY]             = useState(0);
  const [scannedIndex, setScannedIndex] = useState(0);
  const [mapFilter, setMapFilter]     = useState('all');
  const [pressedBtn, setPressedBtn]   = useState(null);
  const [swapTab, setSwapTab]         = useState('nearby');
  const [timerSet, setTimerSet]       = useState(false);
  const [notifOn, setNotifOn]         = useState(true);
  const [reportOn, setReportOn]       = useState(false);

  const scanAnimRef  = useRef(null);
  const scanTimerRef = useRef(null);

  const C = themes[theme];

  // ─── FONT LOAD ───────────────────────────────────────────────────────────────
  useEffect(() => {
    const s = document.createElement('style');
    s.textContent = "@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');";
    document.head.appendChild(s);
  }, []);

  // ─── SCAN ANIMATION ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (scanPhase === 'scanning') {
      let y   = 0;
      let dir = 1;
      scanAnimRef.current = setInterval(() => {
        y += dir * 4;
        if (y >= 180) dir = -1;
        if (y <= 0)   dir =  1;
        setScanY(y);
      }, 16);
      scanTimerRef.current = setTimeout(() => {
        clearInterval(scanAnimRef.current);
        setScannedIndex(prev => (prev + 1) % SCAN_ITEMS.length);
        setScanPhase('result');
      }, 2600);
    }
    return () => {
      clearInterval(scanAnimRef.current);
      clearTimeout(scanTimerRef.current);
    };
  }, [scanPhase]);

  // ─── PRESS EFFECT ────────────────────────────────────────────────────────────
  const press = (id) => {
    setPressedBtn(id);
    setTimeout(() => setPressedBtn(null), 140);
  };
  const btnStyle = (id) => ({
    transform:  pressedBtn === id ? 'scale(0.95)' : 'scale(1)',
    transition: 'transform 0.12s ease',
  });

  // ─── DATA ─────────────────────────────────────────────────────────────────────
  const TYPE_COLORS = { repair:'#8B5CF6', recycle:'#10B981', reuse:'#F59E0B', swap:'#06D6A0', compost:'#84CC16' };
  const TYPE_ICONS  = { repair:'🔧', recycle:'♻️', reuse:'🔄', swap:'🤝', compost:'🌱' };
  const TYPE_LABELS = { repair:'Repair', recycle:'Recycle', reuse:'Reuse', swap:'Swap', compost:'Compost' };

  const SCAN_ITEMS = [
    {
      name: 'Glass Blender Jar', emoji: '🫙',
      material: 'Borosilicate Glass', condition: 'Cracked base — intact walls',
      score: 85, badgeColor: '#06D6A0', action: 'Repair or Donate',
      steps: [
        { label:'Fix & Fix Repair',    desc:'Appliance repair · 0.8 mi', type:'repair'  },
        { label:'Brew & Co Cafe',      desc:'Accepts clean glass jars',   type:'reuse'   },
        { label:'City Glass Drop-off', desc:'Every Friday · Free',        type:'recycle' },
      ],
    },
    {
      name: 'Running Shoe (Single)', emoji: '👟',
      material: 'Synthetic Fabric + Rubber', condition: 'Worn sole, intact upper',
      score: 62, badgeColor: '#F59E0B', action: 'Donate for Parts',
      steps: [
        { label:'MakerSpace PDX',   desc:'Fabric + sole for art projects', type:'reuse'   },
        { label:'Nike Grind Drop',  desc:'Accepts worn athletic shoes',    type:'recycle' },
        { label:'Swap Alert',       desc:'2 neighbors searching nearby',   type:'swap'    },
      ],
    },
    {
      name: 'Moving Boxes (×6)', emoji: '📦',
      material: 'Corrugated Cardboard', condition: 'Good — minor edge wear',
      score: 96, badgeColor: '#10B981', action: 'Swap Immediately',
      steps: [
        { label:'Instant Swap',       desc:'3 people need boxes right now', type:'swap'    },
        { label:'Moving Co Pickup',   desc:'Free donation pick-up service', type:'reuse'   },
        { label:'Compost Drop-off',   desc:'Remove tape then shred',        type:'compost' },
      ],
    },
    {
      name: 'Broken Laptop', emoji: '💻',
      material: 'Circuit Board + Plastic + Metal', condition: 'Non-functional',
      score: 44, badgeColor: '#8B5CF6', action: 'Parts Donation',
      steps: [
        { label:'MakerSpace PDX',   desc:'PCB components always wanted', type:'reuse'   },
        { label:'Repair Café',      desc:'Sunday 2–5 pm · Free fix help', type:'repair'  },
        { label:'E-Waste Day',      desc:'City collection · Apr 5',       type:'recycle' },
      ],
    },
  ];

  const MAP_LOCATIONS = [
    { name:'Fix & Fix Repair',   type:'repair',  dist:'0.8 mi', open:true,  items:['electronics','appliances','bikes'] },
    { name:'Brew & Co Cafe',     type:'reuse',   dist:'0.4 mi', open:true,  items:['glass jars','containers'] },
    { name:'Community Shed',     type:'swap',    dist:'0.6 mi', open:false, items:['tools','garden','outdoor'] },
    { name:'Green Cycle Hub',    type:'recycle', dist:'1.1 mi', open:true,  items:['glass','metal','paper'] },
    { name:'City Compost Drop',  type:'compost', dist:'1.4 mi', open:true,  items:['food waste','cardboard'] },
    { name:'MakerSpace PDX',     type:'reuse',   dist:'2.1 mi', open:true,  items:['electronics','wood','fabric'] },
    { name:'TerraCycle Point',   type:'recycle', dist:'0.9 mi', open:true,  items:['plastics','bags','packaging'] },
    { name:'Repair Café',        type:'repair',  dist:'1.7 mi', open:false, items:['clothing','electronics'] },
  ];

  const COACH_PATTERNS = [
    { item:'Plastic Packaging', count:12, trend:'up',   tip:'Switch to 5th Ave Refill Station — saves ~8 items/mo' },
    { item:'Food Containers',   count:8,  trend:'down', tip:'Great work! Down 30% vs last month. Keep it up.' },
    { item:'Paper & Cardboard', count:7,  trend:'same', tip:'A backyard compost bin could handle most of this.' },
    { item:'Glass Bottles',     count:5,  trend:'up',   tip:'Brew & Co buys back clean glass — earn store credit.' },
    { item:'Electronics',       count:2,  trend:'same', tip:'Repair Café on Sundays fixes small electronics free.' },
  ];

  const SWAP_ITEMS = [
    { name:'Moving boxes (×4)',        user:'Maya R.',  dist:'0.3 mi', time:'2h ago',  type:'offer', emoji:'📦' },
    { name:'Single Adidas shoe L9',    user:'Tom K.',   dist:'0.7 mi', time:'4h ago',  type:'want',  emoji:'👟' },
    { name:'Glass storage jars (×8)',  user:'Priya S.', dist:'1.1 mi', time:'1d ago',  type:'offer', emoji:'🫙' },
    { name:'Old blender body',         user:'James L.', dist:'0.5 mi', time:'3h ago',  type:'want',  emoji:'🧃' },
    { name:'Fabric scraps bundle',     user:'Ana M.',   dist:'0.9 mi', time:'6h ago',  type:'offer', emoji:'🧵' },
    { name:'Bike chain + derailleur',  user:'Dev P.',   dist:'1.4 mi', time:'2d ago',  type:'want',  emoji:'🚲' },
  ];

  // ─── STATUS BAR ──────────────────────────────────────────────────────────────
  const StatusBar = () => (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'14px 24px 4px', background:C.phoneBg }}>
      <span style={{ fontSize:13, fontWeight:700, color:C.text, letterSpacing:0.2 }}>9:41</span>
      <div style={{ display:'flex', gap:5, alignItems:'center' }}>
        {React.createElement(window.lucide.Wifi,    { size:13, color:C.textSec })}
        {React.createElement(window.lucide.Signal,  { size:13, color:C.textSec })}
        {React.createElement(window.lucide.Battery, { size:16, color:C.textSec })}
      </div>
    </div>
  );

  // ─── DYNAMIC ISLAND ──────────────────────────────────────────────────────────
  const DynamicIsland = () => (
    <div style={{ display:'flex', justifyContent:'center', paddingBottom:6, background:C.phoneBg }}>
      <div style={{ width:118, height:32, background:'#000', borderRadius:20, display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 14px' }}>
        <div style={{ width:9, height:9, borderRadius:'50%', background:'#1c1c1e' }} />
        <div style={{ width:9, height:9, borderRadius:'50%', background:'#1c1c1e', border:'1px solid #2a2a2e' }} />
      </div>
    </div>
  );

  // ─── BOTTOM NAV ──────────────────────────────────────────────────────────────
  const BottomNav = () => {
    const TABS = [
      { id:'scan',     icon:'ScanLine',        label:'Scan'  },
      { id:'map',      icon:'MapPin',          label:'Map'   },
      { id:'coach',    icon:'TrendingUp',      label:'Coach' },
      { id:'swap',     icon:'ArrowLeftRight',  label:'Swap'  },
      { id:'settings', icon:'Settings',        label:'More'  },
    ];
    return (
      <div style={{ display:'flex', background:C.navBg, borderTop:`1px solid ${C.border}`, padding:'10px 0 22px' }}>
        {TABS.map(nt => {
          const active = tab === nt.id;
          const Ic = window.lucide[nt.icon];
          return (
            <div
              key={nt.id}
              onClick={() => { setTab(nt.id); press('nav_' + nt.id); }}
              style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:3, cursor:'pointer', ...btnStyle('nav_' + nt.id) }}
            >
              {Ic && React.createElement(Ic, { size:21, color: active ? C.primary : C.textMuted, strokeWidth: active ? 2.5 : 1.8 })}
              <span style={{ fontSize:10, fontWeight: active ? 700 : 400, color: active ? C.primary : C.textMuted }}>
                {nt.label}
              </span>
              {active && <div style={{ width:4, height:4, borderRadius:'50%', background:C.primary, marginTop:-1 }} />}
            </div>
          );
        })}
      </div>
    );
  };

  // ─── SCAN SCREEN ─────────────────────────────────────────────────────────────
  const ScanScreen = () => {
    const item = SCAN_ITEMS[scannedIndex];

    if (scanPhase === 'result') {
      return (
        <div style={{ flex:1, overflowY:'auto', background:C.bg }}>
          {/* Result hero */}
          <div style={{ background:`linear-gradient(160deg, ${item.badgeColor}28, ${C.primaryLight})`, padding:'16px 20px 20px' }}>
            <div style={{ display:'flex', alignItems:'center', gap:14, marginBottom:14 }}>
              <div style={{ width:56, height:56, borderRadius:18, background:C.surface, display:'flex', alignItems:'center', justifyContent:'center', fontSize:30, boxShadow:C.shadow }}>
                {item.emoji}
              </div>
              <div>
                <div style={{ fontSize:18, fontWeight:800, color:C.text, lineHeight:1.2 }}>{item.name}</div>
                <div style={{ fontSize:12, color:C.textSec, marginTop:3 }}>{item.material}</div>
              </div>
            </div>
            {/* Reuse score card */}
            <div style={{ background:C.surface, borderRadius:14, padding:'14px 16px', boxShadow:C.shadow }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8 }}>
                <span style={{ fontSize:12, fontWeight:600, color:C.textSec }}>Reuse Potential</span>
                <span style={{ fontSize:14, fontWeight:800, color:item.badgeColor }}>{item.score}%</span>
              </div>
              <div style={{ height:7, background:C.border, borderRadius:4, overflow:'hidden' }}>
                <div style={{ height:'100%', width:`${item.score}%`, background:`linear-gradient(90deg, ${item.badgeColor}CC, ${item.badgeColor})`, borderRadius:4 }} />
              </div>
              <div style={{ fontSize:12, color:C.textSec, marginTop:8 }}>📋 {item.condition}</div>
            </div>
          </div>

          {/* Steps */}
          <div style={{ padding:'16px 20px' }}>
            <div style={{ fontSize:11, fontWeight:700, color:C.textMuted, marginBottom:10, textTransform:'uppercase', letterSpacing:1 }}>
              Recommended Steps
            </div>
            {item.steps.map((s, i) => (
              <div
                key={i}
                onClick={() => press('step_' + i)}
                style={{ display:'flex', alignItems:'center', gap:12, background:C.card, borderRadius:14, padding:'14px 16px', marginBottom:10, cursor:'pointer', border:`1px solid ${C.border}`, ...btnStyle('step_' + i) }}
              >
                <div style={{ width:40, height:40, borderRadius:12, background:`${TYPE_COLORS[s.type]}22`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:18, flexShrink:0 }}>
                  {TYPE_ICONS[s.type]}
                </div>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:14, fontWeight:700, color:C.text }}>{s.label}</div>
                  <div style={{ fontSize:12, color:C.textSec, marginTop:2 }}>{s.desc}</div>
                </div>
                <span style={{ fontSize:11, fontWeight:700, color:TYPE_COLORS[s.type], background:`${TYPE_COLORS[s.type]}1A`, padding:'4px 9px', borderRadius:20, whiteSpace:'nowrap' }}>
                  {TYPE_LABELS[s.type]}
                </span>
              </div>
            ))}

            {/* CTA row */}
            <div style={{ display:'flex', gap:10, marginTop:4 }}>
              <div
                onClick={() => { press('scan_again'); setScanPhase('idle'); }}
                style={{ flex:1, background:C.primaryLight, borderRadius:14, padding:'14px', textAlign:'center', cursor:'pointer', border:`1px solid ${C.border}`, ...btnStyle('scan_again') }}
              >
                <span style={{ fontSize:14, fontWeight:700, color:C.primary }}>Scan Again</span>
              </div>
              <div
                onClick={() => { press('schedule'); setTab('settings'); }}
                style={{ flex:2, background:`linear-gradient(135deg, ${C.primary}, ${C.accent})`, borderRadius:14, padding:'14px', textAlign:'center', cursor:'pointer', ...btnStyle('schedule') }}
              >
                <span style={{ fontSize:14, fontWeight:700, color:'#fff' }}>Schedule Drop-off</span>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Idle / Scanning view
    return (
      <div style={{ flex:1, display:'flex', flexDirection:'column', background:C.bg }}>
        {/* Header */}
        <div style={{ padding:'8px 20px 14px', background:C.phoneBg, borderBottom:`1px solid ${C.border}` }}>
          <div style={{ fontSize:22, fontWeight:800, color:C.text }}>Loop Lens</div>
          <div style={{ fontSize:13, color:C.textSec }}>Point at any item to find a better option</div>
        </div>

        {/* Viewfinder */}
        <div
          style={{ margin:'16px 20px 0', borderRadius:22, overflow:'hidden', position:'relative', height:230, background:'#101c16', cursor:'pointer' }}
          onClick={() => { if (scanPhase === 'idle') { press('vf'); setScanPhase('scanning'); } }}
        >
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg, #0d1f16, #07130d 60%, #0d1f16)' }} />
          {/* Bracket corners */}
          {[
            { top:14, left:14,   borderTop:3, borderLeft:3,   borderTopLeftRadius:7  },
            { top:14, right:14,  borderTop:3, borderRight:3,  borderTopRightRadius:7 },
            { bottom:14, left:14,  borderBottom:3, borderLeft:3,   borderBottomLeftRadius:7  },
            { bottom:14, right:14, borderBottom:3, borderRight:3,  borderBottomRightRadius:7 },
          ].map((corners, i) => (
            <div key={i} style={{ position:'absolute', width:26, height:26, borderColor:C.primary, borderStyle:'solid', borderWidth:0, ...corners }} />
          ))}
          {/* Scan line */}
          {scanPhase === 'scanning' && (
            <div style={{ position:'absolute', left:18, right:18, top:14 + scanY, height:2, background:`linear-gradient(90deg, transparent 0%, ${C.primary} 30%, ${C.accent} 70%, transparent 100%)`, boxShadow:`0 0 10px ${C.primary}` }} />
          )}
          {/* Center state */}
          <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:10 }}>
            {scanPhase === 'idle' ? (
              <>
                {React.createElement(window.lucide.Camera, { size:34, color:C.primary })}
                <span style={{ color:'rgba(255,255,255,0.65)', fontSize:13, fontWeight:500 }}>Tap to scan an item</span>
              </>
            ) : (
              <>
                <div style={{ width:36, height:36, borderRadius:'50%', border:`3px solid ${C.primary}`, borderTopColor:'transparent', animation:'spin 0.75s linear infinite' }} />
                <span style={{ color:'rgba(255,255,255,0.9)', fontSize:13, fontWeight:700, letterSpacing:1 }}>ANALYZING...</span>
              </>
            )}
          </div>
        </div>

        {/* Big scan button */}
        <div style={{ display:'flex', justifyContent:'center', marginTop:18 }}>
          <div
            onClick={() => { press('big_scan'); if (scanPhase === 'idle') setScanPhase('scanning'); }}
            style={{ width:70, height:70, borderRadius:'50%', background:`linear-gradient(135deg, ${C.primary}, ${C.accent})`, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', boxShadow:`0 8px 28px ${C.primary}55`, ...btnStyle('big_scan') }}
          >
            {React.createElement(window.lucide.ScanLine, { size:28, color:'#fff' })}
          </div>
        </div>

        {/* Recent scans */}
        <div style={{ flex:1, padding:'16px 20px', overflowY:'auto' }}>
          <div style={{ fontSize:11, fontWeight:700, color:C.textMuted, marginBottom:10, textTransform:'uppercase', letterSpacing:1 }}>
            Recent Scans
          </div>
          {SCAN_ITEMS.slice(0, 3).map((r, i) => (
            <div
              key={i}
              onClick={() => { press('recent_' + i); setScannedIndex(i); setScanPhase('result'); }}
              style={{ display:'flex', alignItems:'center', gap:12, background:C.card, borderRadius:14, padding:'12px 14px', marginBottom:8, border:`1px solid ${C.border}`, cursor:'pointer', ...btnStyle('recent_' + i) }}
            >
              <div style={{ fontSize:24 }}>{r.emoji}</div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:13, fontWeight:700, color:C.text }}>{r.name}</div>
                <div style={{ fontSize:11, color:C.textSec, marginTop:2 }}>{r.action}</div>
              </div>
              <span style={{ fontSize:11, fontWeight:700, color:'#fff', background:r.badgeColor, padding:'4px 10px', borderRadius:20 }}>
                {r.score}%
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ─── MAP SCREEN ──────────────────────────────────────────────────────────────
  const MapScreen = () => {
    const FILTERS = ['all', 'repair', 'recycle', 'reuse', 'swap', 'compost'];
    const filtered = mapFilter === 'all' ? MAP_LOCATIONS : MAP_LOCATIONS.filter(l => l.type === mapFilter);
    const PIN_POSITIONS = [
      { x:'22%', y:'38%', type:'repair'  },
      { x:'52%', y:'26%', type:'reuse'   },
      { x:'68%', y:'50%', type:'recycle' },
      { x:'38%', y:'60%', type:'swap'    },
      { x:'60%', y:'72%', type:'compost' },
    ];

    return (
      <div style={{ flex:1, display:'flex', flexDirection:'column', background:C.bg }}>
        <div style={{ padding:'8px 20px 14px', background:C.phoneBg, borderBottom:`1px solid ${C.border}` }}>
          <div style={{ fontSize:22, fontWeight:800, color:C.text }}>Circular Map</div>
          <div style={{ fontSize:13, color:C.textSec }}>Drop-offs, swaps & repair spots near you</div>
        </div>

        {/* Mini map */}
        <div style={{ margin:'14px 20px 0', height:148, borderRadius:20, overflow:'hidden', position:'relative', background:C.mapGrad, border:`1.5px solid ${C.border}` }}>
          {[0,1,2,3,4].map(i => (
            <div key={i} style={{ position:'absolute', top:`${i*25}%`, left:0, right:0, height:1, background:'rgba(255,255,255,0.3)' }} />
          ))}
          {[0,1,2,3,4,5].map(i => (
            <div key={i} style={{ position:'absolute', left:`${i*20}%`, top:0, bottom:0, width:1, background:'rgba(255,255,255,0.3)' }} />
          ))}
          {PIN_POSITIONS.map((p, i) => (
            <div key={i} style={{ position:'absolute', left:p.x, top:p.y, transform:'translate(-50%,-50%)' }}>
              <div style={{ width:22, height:22, borderRadius:'50%', background:TYPE_COLORS[p.type], border:'2.5px solid white', boxShadow:'0 2px 8px rgba(0,0,0,0.3)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:10 }}>
                {TYPE_ICONS[p.type]}
              </div>
            </div>
          ))}
          {/* You are here */}
          <div style={{ position:'absolute', left:'50%', top:'50%', transform:'translate(-50%,-50%)' }}>
            <div style={{ width:18, height:18, borderRadius:'50%', background:C.primary, border:'3px solid white', boxShadow:`0 0 0 7px ${C.primary}33` }} />
          </div>
          <div style={{ position:'absolute', bottom:8, right:10, fontSize:10, fontWeight:700, color:'rgba(255,255,255,0.8)', background:'rgba(0,0,0,0.2)', padding:'3px 7px', borderRadius:8 }}>
            Within 2 mi
          </div>
        </div>

        {/* Filter pills */}
        <div style={{ padding:'10px 20px 0', display:'flex', gap:6, overflowX:'auto' }}>
          {FILTERS.map(f => (
            <div
              key={f}
              onClick={() => setMapFilter(f)}
              style={{ flexShrink:0, padding:'6px 14px', borderRadius:20, background: mapFilter === f ? C.primary : C.card, color: mapFilter === f ? '#fff' : C.textSec, fontSize:12, fontWeight:600, cursor:'pointer', border:`1px solid ${mapFilter === f ? C.primary : C.border}`, transition:'all 0.2s' }}
            >
              {f === 'all' ? 'All' : `${TYPE_ICONS[f]} ${TYPE_LABELS[f]}`}
            </div>
          ))}
        </div>

        {/* Location list */}
        <div style={{ flex:1, overflowY:'auto', padding:'12px 20px' }}>
          {filtered.map((loc, i) => (
            <div
              key={i}
              onClick={() => press('loc_' + i)}
              style={{ display:'flex', alignItems:'center', gap:12, background:C.card, borderRadius:14, padding:'14px', marginBottom:10, cursor:'pointer', border:`1px solid ${C.border}`, ...btnStyle('loc_' + i) }}
            >
              <div style={{ width:46, height:46, borderRadius:13, background:`${TYPE_COLORS[loc.type]}1A`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:20, flexShrink:0 }}>
                {TYPE_ICONS[loc.type]}
              </div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:14, fontWeight:700, color:C.text }}>{loc.name}</div>
                <div style={{ fontSize:11, color:C.textMuted, marginTop:3 }}>{loc.items.join(' · ')}</div>
              </div>
              <div style={{ textAlign:'right', flexShrink:0 }}>
                <div style={{ fontSize:12, fontWeight:700, color:C.textSec }}>{loc.dist}</div>
                <div style={{ fontSize:11, fontWeight:700, color: loc.open ? C.primary : C.textMuted, marginTop:3 }}>
                  {loc.open ? '● Open' : '○ Closed'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ─── COACH SCREEN ────────────────────────────────────────────────────────────
  const CoachScreen = () => {
    const total = COACH_PATTERNS.reduce((s, p) => s + p.count, 0);
    const STATS = [
      { value:`${total}`,    sub:'items diverted',  color:C.primary },
      { value:'4.2 kg',      sub:'CO₂ saved',       color:C.purple  },
      { value:'$23',         sub:'saved via swaps', color:C.warning },
    ];
    const trendColor = (t) => t === 'up' ? C.danger : t === 'down' ? C.primary : C.textMuted;
    const trendIcon  = (t) => t === 'up' ? '▲' : t === 'down' ? '▼' : '→';

    return (
      <div style={{ flex:1, display:'flex', flexDirection:'column', background:C.bg }}>
        <div style={{ padding:'8px 20px 14px', background:C.phoneBg, borderBottom:`1px solid ${C.border}` }}>
          <div style={{ fontSize:22, fontWeight:800, color:C.text }}>Waste Coach</div>
          <div style={{ fontSize:13, color:C.textSec }}>Patterns, insights & upstream fixes</div>
        </div>

        <div style={{ flex:1, overflowY:'auto', padding:'14px 20px' }}>
          {/* Stats row */}
          <div style={{ display:'flex', gap:8, marginBottom:18 }}>
            {STATS.map((st, i) => (
              <div key={i} style={{ flex:1, background:C.card, borderRadius:14, padding:'14px 10px', border:`1px solid ${C.border}`, textAlign:'center' }}>
                <div style={{ fontSize:18, fontWeight:800, color:st.color }}>{st.value}</div>
                <div style={{ fontSize:10, color:C.textMuted, marginTop:3, lineHeight:1.4 }}>{st.sub}</div>
              </div>
            ))}
          </div>

          {/* This month badge */}
          <div style={{ background:`linear-gradient(135deg, ${C.primary}22, ${C.accent}15)`, border:`1px solid ${C.primary}33`, borderRadius:14, padding:'12px 14px', marginBottom:16, display:'flex', gap:10, alignItems:'center' }}>
            {React.createElement(window.lucide.Leaf, { size:18, color:C.primary })}
            <div>
              <div style={{ fontSize:13, fontWeight:700, color:C.text }}>March is your best month yet!</div>
              <div style={{ fontSize:11, color:C.textSec }}>You're on track to divert 40+ items. Keep going.</div>
            </div>
          </div>

          {/* Patterns */}
          <div style={{ fontSize:11, fontWeight:700, color:C.textMuted, marginBottom:10, textTransform:'uppercase', letterSpacing:1 }}>
            Recurring Waste
          </div>
          {COACH_PATTERNS.map((p, i) => (
            <div key={i} style={{ background:C.card, borderRadius:14, padding:'14px', marginBottom:10, border:`1px solid ${C.border}` }}>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:8 }}>
                <span style={{ fontSize:14, fontWeight:700, color:C.text }}>{p.item}</span>
                <span style={{ fontSize:12, fontWeight:700, color:trendColor(p.trend) }}>
                  {trendIcon(p.trend)} {p.count}×
                </span>
              </div>
              <div style={{ height:6, background:C.border, borderRadius:3, overflow:'hidden', marginBottom:9 }}>
                <div style={{ height:'100%', width:`${(p.count / 12) * 100}%`, background: p.trend === 'up' ? C.danger : C.primary, borderRadius:3 }} />
              </div>
              <div style={{ fontSize:12, color:C.textSec, background:C.cardAlt, borderRadius:9, padding:'8px 10px' }}>
                💡 {p.tip}
              </div>
            </div>
          ))}

          {/* Upstream suggestions */}
          <div style={{ fontSize:11, fontWeight:700, color:C.textMuted, marginBottom:10, textTransform:'uppercase', letterSpacing:1, marginTop:6 }}>
            Upstream Changes
          </div>
          {[
            { emoji:'🏪', title:'Switch to Refill Store',     desc:'5th Ave Refill · saves ~8 plastic items/mo', cta:'Directions' },
            { emoji:'🔧', title:'Repair Subscription Plan',   desc:'Fix & Fix Monthly · $12/mo, unlimited fixes',  cta:'Details'    },
            { emoji:'📦', title:'Buy Sturdier Alternatives',  desc:'Durable glass containers vs single-use plastic', cta:'Browse'   },
          ].map((s, i) => (
            <div
              key={i}
              onClick={() => press('upstream_' + i)}
              style={{ display:'flex', gap:12, alignItems:'center', background:`${C.primary}14`, borderRadius:14, padding:'14px', marginBottom:10, cursor:'pointer', border:`1px solid ${C.primary}28`, ...btnStyle('upstream_' + i) }}
            >
              <div style={{ fontSize:24, flexShrink:0 }}>{s.emoji}</div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:14, fontWeight:700, color:C.text }}>{s.title}</div>
                <div style={{ fontSize:11, color:C.textSec, marginTop:2 }}>{s.desc}</div>
              </div>
              <span style={{ fontSize:11, fontWeight:700, color:C.primary, whiteSpace:'nowrap' }}>{s.cta} →</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ─── SWAP SCREEN ─────────────────────────────────────────────────────────────
  const SwapScreen = () => {
    const displayed = swapTab === 'nearby'
      ? SWAP_ITEMS
      : SWAP_ITEMS.filter(s => s.type === 'want');

    return (
      <div style={{ flex:1, display:'flex', flexDirection:'column', background:C.bg }}>
        <div style={{ padding:'8px 20px 14px', background:C.phoneBg, borderBottom:`1px solid ${C.border}` }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
            <div>
              <div style={{ fontSize:22, fontWeight:800, color:C.text }}>Swap & Share</div>
              <div style={{ fontSize:13, color:C.textSec }}>Keep goods circulating locally</div>
            </div>
            <div
              onClick={() => press('post_btn')}
              style={{ background:`linear-gradient(135deg, ${C.primary}, ${C.accent})`, borderRadius:12, padding:'9px 16px', cursor:'pointer', ...btnStyle('post_btn') }}
            >
              <span style={{ fontSize:13, fontWeight:700, color:'#fff' }}>+ Post</span>
            </div>
          </div>
        </div>

        {/* Alert banner */}
        <div style={{ margin:'12px 20px 0', background:`${C.accent}1A`, borderRadius:14, padding:'12px 14px', border:`1px solid ${C.accent}44`, display:'flex', gap:10, alignItems:'center' }}>
          {React.createElement(window.lucide.Bell, { size:17, color:C.primary })}
          <div style={{ flex:1 }}>
            <div style={{ fontSize:13, fontWeight:700, color:C.text }}>3 new swap alerts near you</div>
            <div style={{ fontSize:11, color:C.textSec }}>Someone needs the moving boxes you just scanned</div>
          </div>
          <span style={{ fontSize:11, fontWeight:700, color:'#fff', background:C.danger, padding:'3px 8px', borderRadius:20 }}>3</span>
        </div>

        {/* Tabs */}
        <div style={{ padding:'12px 20px', display:'flex', gap:8 }}>
          {[
            { id:'nearby', label:'📍 Nearby' },
            { id:'wanted', label:'🔍 Wanted' },
          ].map(st => (
            <div
              key={st.id}
              onClick={() => setSwapTab(st.id)}
              style={{ flex:1, textAlign:'center', padding:'9px', borderRadius:11, background: swapTab === st.id ? C.primary : C.card, color: swapTab === st.id ? '#fff' : C.textSec, fontSize:13, fontWeight:600, cursor:'pointer', border:`1px solid ${swapTab === st.id ? C.primary : C.border}`, transition:'all 0.2s' }}
            >
              {st.label}
            </div>
          ))}
        </div>

        {/* Swap cards */}
        <div style={{ flex:1, overflowY:'auto', padding:'0 20px 12px' }}>
          {displayed.map((item, i) => (
            <div
              key={i}
              onClick={() => press('swap_' + i)}
              style={{ display:'flex', gap:12, background:C.card, borderRadius:14, padding:'14px', marginBottom:10, cursor:'pointer', border:`1px solid ${C.border}`, ...btnStyle('swap_' + i) }}
            >
              <div style={{ width:50, height:50, borderRadius:14, background: item.type === 'offer' ? `${C.accent}1A` : `${C.warning}1A`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:24, flexShrink:0 }}>
                {item.emoji}
              </div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:14, fontWeight:700, color:C.text }}>{item.name}</div>
                <div style={{ fontSize:12, color:C.textSec, marginTop:2 }}>{item.user} · {item.dist}</div>
                <div style={{ display:'flex', gap:6, marginTop:7, alignItems:'center' }}>
                  <span style={{ fontSize:11, fontWeight:700, color: item.type === 'offer' ? C.accent : C.warning, background: item.type === 'offer' ? `${C.accent}1A` : `${C.warning}1A`, padding:'3px 9px', borderRadius:20 }}>
                    {item.type === 'offer' ? '✓ Offering' : '↑ Wanted'}
                  </span>
                  <span style={{ fontSize:11, color:C.textMuted }}>{item.time}</span>
                </div>
              </div>
              {React.createElement(window.lucide.ChevronRight, { size:16, color:C.textMuted })}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ─── SETTINGS SCREEN ─────────────────────────────────────────────────────────
  const SettingsScreen = () => {
    const REMINDERS = [
      { emoji:'🗓️', title:'City Glass Pickup',    date:'Every Friday'      },
      { emoji:'📅', title:'Large Item Day',        date:'Apr 15 · 8 am'    },
      { emoji:'⚡', title:'E-Waste Collection',    date:'Apr 5 · 10 am'    },
    ];
    const PREFS = [
      { emoji:'📍', label:'Location Radius',     value:'2 miles'     },
      { emoji:'📊', label:'Weekly Report',        value:'Email digest' },
      { emoji:'🔒', label:'Data Privacy',         value:'Local only'  },
      { emoji:'♻️', label:'Default Sort',          value:'Distance'    },
    ];

    return (
      <div style={{ flex:1, display:'flex', flexDirection:'column', background:C.bg }}>
        <div style={{ padding:'8px 20px 14px', background:C.phoneBg, borderBottom:`1px solid ${C.border}` }}>
          <div style={{ fontSize:22, fontWeight:800, color:C.text }}>Settings</div>
          <div style={{ fontSize:13, color:C.textSec }}>Preferences, reminders & profile</div>
        </div>

        <div style={{ flex:1, overflowY:'auto', padding:'14px 20px' }}>
          {/* Profile card */}
          <div style={{ background:C.card, borderRadius:18, padding:'16px', marginBottom:18, border:`1px solid ${C.border}`, display:'flex', gap:14, alignItems:'center', boxShadow:C.shadow }}>
            <div style={{ width:58, height:58, borderRadius:18, background:`linear-gradient(135deg, ${C.primary}, ${C.accent})`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:26 }}>
              🌿
            </div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:16, fontWeight:800, color:C.text }}>Alex Chen</div>
              <div style={{ fontSize:12, color:C.textSec }}>San Francisco, CA</div>
              <div style={{ display:'flex', gap:8, marginTop:6 }}>
                <span style={{ fontSize:11, fontWeight:700, color:C.primary, background:C.primaryLight, padding:'3px 9px', borderRadius:20 }}>34 items diverted</span>
                <span style={{ fontSize:11, fontWeight:700, color:C.purple, background:`${C.purple}1A`, padding:'3px 9px', borderRadius:20 }}>Level 4 🌱</span>
              </div>
            </div>
          </div>

          {/* Appearance */}
          <div style={{ fontSize:11, fontWeight:700, color:C.textMuted, marginBottom:10, textTransform:'uppercase', letterSpacing:1 }}>Appearance</div>
          <div style={{ background:C.card, borderRadius:14, padding:'14px 16px', marginBottom:18, border:`1px solid ${C.border}`, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
            <div style={{ display:'flex', alignItems:'center', gap:10 }}>
              {React.createElement(theme === 'light' ? window.lucide.Sun : window.lucide.Moon, { size:18, color:C.primary })}
              <span style={{ fontSize:14, fontWeight:600, color:C.text }}>{theme === 'light' ? 'Light Mode' : 'Dark Mode'}</span>
            </div>
            {/* Toggle */}
            <div
              onClick={() => { press('theme_toggle'); setTheme(prev => prev === 'light' ? 'dark' : 'light'); }}
              style={{ width:50, height:28, borderRadius:14, background: theme === 'dark' ? C.primary : C.border, position:'relative', cursor:'pointer', transition:'background 0.3s', ...btnStyle('theme_toggle') }}
            >
              <div style={{ position:'absolute', top:3, left: theme === 'dark' ? 23 : 3, width:22, height:22, borderRadius:'50%', background:'#fff', transition:'left 0.3s ease', boxShadow:'0 1px 5px rgba(0,0,0,0.25)' }} />
            </div>
          </div>

          {/* Notifications */}
          <div style={{ fontSize:11, fontWeight:700, color:C.textMuted, marginBottom:10, textTransform:'uppercase', letterSpacing:1 }}>Notifications</div>
          {[
            { label:'Swap Alerts', state:notifOn, toggle:() => setNotifOn(p => !p), id:'notif_tog' },
            { label:'Weekly Report', state:reportOn, toggle:() => setReportOn(p => !p), id:'report_tog' },
          ].map((row, i) => (
            <div key={i} style={{ background:C.card, borderRadius:14, padding:'14px 16px', marginBottom:8, border:`1px solid ${C.border}`, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
              <span style={{ fontSize:14, fontWeight:600, color:C.text }}>{row.label}</span>
              <div
                onClick={() => { press(row.id); row.toggle(); }}
                style={{ width:50, height:28, borderRadius:14, background: row.state ? C.primary : C.border, position:'relative', cursor:'pointer', transition:'background 0.3s', ...btnStyle(row.id) }}
              >
                <div style={{ position:'absolute', top:3, left: row.state ? 23 : 3, width:22, height:22, borderRadius:'50%', background:'#fff', transition:'left 0.3s ease', boxShadow:'0 1px 5px rgba(0,0,0,0.25)' }} />
              </div>
            </div>
          ))}

          {/* Disposal Timer */}
          <div style={{ fontSize:11, fontWeight:700, color:C.textMuted, marginBottom:10, textTransform:'uppercase', letterSpacing:1, marginTop:10 }}>Disposal Timer</div>
          <div style={{ background:C.card, borderRadius:14, padding:'14px', marginBottom:8, border:`1px solid ${C.border}` }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12 }}>
              <span style={{ fontSize:14, fontWeight:700, color:C.text }}>Scheduled Drop-offs</span>
              <div
                onClick={() => { press('timer_btn'); setTimerSet(p => !p); }}
                style={{ fontSize:12, fontWeight:700, color: timerSet ? '#fff' : C.primary, background: timerSet ? C.primary : C.primaryLight, padding:'6px 13px', borderRadius:20, cursor:'pointer', ...btnStyle('timer_btn') }}
              >
                {timerSet ? '✓ Active' : '+ Enable'}
              </div>
            </div>
            {REMINDERS.map((r, i) => (
              <div key={i} style={{ display:'flex', gap:10, alignItems:'center', padding:'10px 0', borderTop: i > 0 ? `1px solid ${C.border}` : 'none' }}>
                <div style={{ fontSize:18 }}>{r.emoji}</div>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:13, fontWeight:600, color:C.text }}>{r.title}</div>
                  <div style={{ fontSize:11, color:C.textSec }}>{r.date}</div>
                </div>
                {React.createElement(window.lucide.Bell, { size:14, color: timerSet ? C.primary : C.textMuted })}
              </div>
            ))}
          </div>

          {/* Other prefs */}
          <div style={{ fontSize:11, fontWeight:700, color:C.textMuted, marginBottom:10, textTransform:'uppercase', letterSpacing:1, marginTop:10 }}>Preferences</div>
          {PREFS.map((p, i) => (
            <div key={i} style={{ display:'flex', gap:12, alignItems:'center', background:C.card, borderRadius:12, padding:'14px 16px', marginBottom:8, border:`1px solid ${C.border}` }}>
              <span style={{ fontSize:18 }}>{p.emoji}</span>
              <span style={{ flex:1, fontSize:14, fontWeight:600, color:C.text }}>{p.label}</span>
              <span style={{ fontSize:13, color:C.textSec }}>{p.value}</span>
              {React.createElement(window.lucide.ChevronRight, { size:14, color:C.textMuted })}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ─── ROOT RENDER ─────────────────────────────────────────────────────────────
  return (
    <div style={{ minHeight:'100vh', background:'#e0e0e0', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'Plus Jakarta Sans', sans-serif" }}>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { display: none; }
      `}</style>

      {/* Phone frame */}
      <div style={{ width:375, height:812, background:C.phoneBg, borderRadius:54, overflow:'hidden', boxShadow:'0 40px 100px rgba(0,0,0,0.38), 0 0 0 1px rgba(0,0,0,0.08)', display:'flex', flexDirection:'column', position:'relative' }}>
        <StatusBar />
        <DynamicIsland />

        <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' }}>
          {tab === 'scan'     && <ScanScreen />}
          {tab === 'map'      && <MapScreen />}
          {tab === 'coach'    && <CoachScreen />}
          {tab === 'swap'     && <SwapScreen />}
          {tab === 'settings' && <SettingsScreen />}
        </div>

        <BottomNav />
      </div>
    </div>
  );
}
