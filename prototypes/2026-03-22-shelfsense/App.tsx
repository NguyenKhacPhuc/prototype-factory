const { useState, useEffect, useRef } = React;

function App() {
  const themes = {
    dark: {
      bg: '#07090F', surface: '#0F1420', card: '#161E30', cardAlt: '#1C2540',
      primary: '#2DD4BF', primaryDim: 'rgba(45,212,191,0.12)',
      primaryGrad: 'linear-gradient(135deg, #2DD4BF 0%, #22A8FF 100%)',
      secondary: '#818CF8', secondaryDim: 'rgba(129,140,248,0.12)',
      text: '#F0F5FF', textSecondary: '#8892B0', textTertiary: '#445069',
      border: '#1A2540', borderLight: '#222E4A',
      success: '#34D399', successDim: 'rgba(52,211,153,0.12)',
      warning: '#FBBF24', warningDim: 'rgba(251,191,36,0.12)',
      danger: '#FB7185', dangerDim: 'rgba(251,113,133,0.12)',
      navBg: '#0C1220',
    },
    light: {
      bg: '#EEF2FF', surface: '#FFFFFF', card: '#FFFFFF', cardAlt: '#F5F8FF',
      primary: '#0D9488', primaryDim: 'rgba(13,148,136,0.10)',
      primaryGrad: 'linear-gradient(135deg, #0D9488 0%, #0EA5E9 100%)',
      secondary: '#6366F1', secondaryDim: 'rgba(99,102,241,0.10)',
      text: '#0F172A', textSecondary: '#475569', textTertiary: '#94A3B8',
      border: '#E1E9F5', borderLight: '#EEF2FF',
      success: '#059669', successDim: 'rgba(5,150,105,0.10)',
      warning: '#D97706', warningDim: 'rgba(217,119,6,0.10)',
      danger: '#E11D48', dangerDim: 'rgba(225,29,72,0.10)',
      navBg: '#FFFFFF',
    },
  };

  const [theme, setTheme] = useState('dark');
  const [tab, setTab] = useState('home');
  const [invCat, setInvCat] = useState('All');
  const [searchQ, setSearchQ] = useState('');
  const [expandedList, setExpandedList] = useState(1);
  const [checked, setChecked] = useState({});
  const [scanMode, setScanMode] = useState('photo');
  const [scanning, setScanning] = useState(false);
  const [scanDone, setScanDone] = useState(false);
  const [notifOn, setNotifOn] = useState(true);
  const [bundleOn, setBundleOn] = useState(true);
  const [time, setTime] = useState('9:41 AM');

  const c = themes[theme];

  useEffect(() => {
    const upd = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }));
    };
    upd();
    const iv = setInterval(upd, 30000);
    return () => clearInterval(iv);
  }, []);

  const inventory = [
    { id:1,  name:'Oatmeal',           cat:'Pantry',   qty:1, max:3,  days:3,  emoji:'🥣', brand:"Bob's Red Mill" },
    { id:2,  name:'Coffee Beans',      cat:'Pantry',   qty:1, max:4,  days:5,  emoji:'☕', brand:'Stumptown' },
    { id:3,  name:'Olive Oil',         cat:'Pantry',   qty:1, max:2,  days:18, emoji:'🫙', brand:'California Olive Ranch' },
    { id:4,  name:'Brown Rice',        cat:'Pantry',   qty:2, max:4,  days:22, emoji:'🍚', brand:'Lundberg' },
    { id:5,  name:'Pasta',             cat:'Pantry',   qty:3, max:6,  days:28, emoji:'🍝', brand:'Barilla' },
    { id:6,  name:'Cat Food',          cat:'Pantry',   qty:2, max:8,  days:2,  emoji:'🐱', brand:'Fancy Feast' },
    { id:7,  name:'Milk',              cat:'Fridge',   qty:1, max:2,  days:2,  emoji:'🥛', brand:'Organic Valley' },
    { id:8,  name:'Greek Yogurt',      cat:'Fridge',   qty:1, max:4,  days:4,  emoji:'🫙', brand:'Chobani' },
    { id:9,  name:'Eggs',              cat:'Fridge',   qty:6, max:12, days:5,  emoji:'🥚', brand:'Vital Farms' },
    { id:10, name:'Orange Juice',      cat:'Fridge',   qty:1, max:2,  days:3,  emoji:'🧃', brand:'Tropicana' },
    { id:11, name:'Toothpaste',        cat:'Bathroom', qty:1, max:3,  days:6,  emoji:'🪥', brand:'Sensodyne' },
    { id:12, name:'Shampoo',           cat:'Bathroom', qty:1, max:2,  days:12, emoji:'🧴', brand:'Olaplex' },
    { id:13, name:'Body Wash',         cat:'Bathroom', qty:2, max:3,  days:19, emoji:'🫧', brand:'Dove' },
    { id:14, name:'Dish Soap',         cat:'Cleaning', qty:1, max:3,  days:4,  emoji:'🧼', brand:'Dawn' },
    { id:15, name:'Laundry Detergent', cat:'Cleaning', qty:1, max:2,  days:7,  emoji:'🧺', brand:'Tide' },
    { id:16, name:'Paper Towels',      cat:'Cleaning', qty:2, max:6,  days:10, emoji:'🧻', brand:'Bounty' },
    { id:17, name:'Ibuprofen',         cat:'Medicine', qty:1, max:2,  days:60, emoji:'💊', brand:'Advil' },
    { id:18, name:'Vitamin D',         cat:'Medicine', qty:1, max:2,  days:25, emoji:'🌟', brand:'Nature Made' },
  ];

  const lists = [
    { id:1, store:'Whole Foods', emoji:'🌿', urgency:'high',
      items:[
        { name:'Oatmeal',       qty:'2 boxes',   price:6.99 },
        { name:'Coffee Beans',  qty:'2 bags',    price:14.99 },
        { name:'Milk',          qty:'2 cartons', price:5.49 },
        { name:'Greek Yogurt',  qty:'4-pack',    price:7.99 },
        { name:'Eggs',          qty:'12-pack',   price:6.49 },
        { name:'Orange Juice',  qty:'2 cartons', price:8.99 },
      ]},
    { id:2, store:'CVS Pharmacy', emoji:'💊', urgency:'medium',
      items:[
        { name:'Toothpaste',    qty:'2 tubes',   price:9.99 },
        { name:'Ibuprofen',     qty:'1 bottle',  price:11.49 },
      ]},
    { id:3, store:'Target', emoji:'🎯', urgency:'medium',
      items:[
        { name:'Dish Soap',          qty:'2 bottles', price:5.99 },
        { name:'Laundry Detergent',  qty:'1 large',   price:13.99 },
        { name:'Paper Towels',       qty:'6-pack',    price:12.99 },
        { name:'Cat Food',           qty:'12-pack',   price:14.99 },
      ]},
  ];

  const members = [
    { name:'You (Sarah)', role:'Admin', emoji:'👩‍💼', activity:'Added 3 items',    time:'Just now' },
    { name:'Alex',        role:'Member', emoji:'🧑',  activity:'Checked off milk', time:'2h ago' },
    { name:'Jordan',      role:'Member', emoji:'👦',  activity:'Scanned receipt',  time:'1d ago' },
  ];

  const cats = ['All','Pantry','Fridge','Bathroom','Cleaning','Medicine'];
  const filtered = inventory.filter(i =>
    (invCat === 'All' || i.cat === invCat) &&
    i.name.toLowerCase().includes(searchQ.toLowerCase())
  );
  const critical = inventory.filter(i => i.days <= 3);

  const stockColor = (days) => days <= 3 ? c.danger : days <= 7 ? c.warning : c.success;
  const stockPct   = (qty, max) => Math.min((qty / max) * 100, 100);
  const handleCheck = (lid, idx) => {
    const k = `${lid}-${idx}`;
    setChecked(p => ({ ...p, [k]: !p[k] }));
  };
  const handleScan = () => {
    setScanning(true); setScanDone(false);
    setTimeout(() => { setScanning(false); setScanDone(true); }, 2200);
  };

  const Icon = ({ name, size=20, color, strokeWidth=2, style: s }) => {
    const L = window.lucide;
    if (!L || !L[name]) return null;
    const LI = L[name];
    return React.createElement(LI, { size, color: color || c.text, strokeWidth, style: s });
  };

  // ── STATUS BAR ───────────────────────────────────────────────────────────────
  const renderStatusBar = () => (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'14px 22px 0', height:50, flexShrink:0 }}>
      <span style={{ fontSize:14, fontWeight:700, color:c.text }}>{time}</span>
      <div style={{ display:'flex', gap:6, alignItems:'center' }}>
        <Icon name="Wifi" size={14} color={c.textSecondary} />
        <Icon name="Signal" size={14} color={c.textSecondary} />
        <Icon name="Battery" size={16} color={c.textSecondary} />
      </div>
    </div>
  );

  // ── BOTTOM NAV ───────────────────────────────────────────────────────────────
  const renderNav = () => {
    const navItems = [
      { id:'home',      icon:'Home',         label:'Home' },
      { id:'inventory', icon:'Package',      label:'Stock' },
      { id:'scan',      icon:'ScanLine',     label:'Scan' },
      { id:'lists',     icon:'ShoppingCart', label:'Lists' },
      { id:'settings',  icon:'Settings',     label:'Settings' },
    ];
    return (
      <div style={{ background:c.navBg, borderTop:`1px solid ${c.border}`, display:'flex', paddingBottom:18, paddingTop:8, flexShrink:0 }}>
        {navItems.map(n => (
          <div key={n.id} onClick={() => setTab(n.id)}
            style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:3, cursor:'pointer' }}>
            {n.id === 'scan' ? (
              <div style={{ width:50, height:50, borderRadius:17, background:c.primaryGrad,
                display:'flex', alignItems:'center', justifyContent:'center',
                marginTop:-18, boxShadow:`0 6px 24px ${c.primary}50`,
                transform: tab==='scan' ? 'scale(1.07)' : 'scale(1)', transition:'transform 0.2s' }}>
                <Icon name="ScanLine" size={22} color="#fff" />
              </div>
            ) : (
              <Icon name={n.icon} size={22}
                color={tab===n.id ? c.primary : c.textTertiary}
                strokeWidth={tab===n.id ? 2.5 : 1.5} />
            )}
            {n.id !== 'scan' && (
              <span style={{ fontSize:10, color:tab===n.id ? c.primary : c.textTertiary,
                fontWeight:tab===n.id ? 700 : 400 }}>{n.label}</span>
            )}
          </div>
        ))}
      </div>
    );
  };

  // ── HOME SCREEN ──────────────────────────────────────────────────────────────
  const renderHome = () => {
    const h = new Date().getHours();
    const greeting = h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening';
    const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    const todayName = days[new Date().getDay()];
    const rooms = ['Pantry','Fridge','Bathroom','Cleaning'];
    const roomEmoji = { Pantry:'🗄️', Fridge:'🧊', Bathroom:'🚿', Cleaning:'🧹' };
    return (
      <div style={{ flex:1, overflowY:'auto' }}>
        {/* Header */}
        <div style={{ padding:'4px 20px 12px' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
            <div>
              <p style={{ color:c.textSecondary, fontSize:12, margin:0, fontWeight:500 }}>{todayName}, Mar 22 · 18 tracked</p>
              <h1 style={{ color:c.text, fontSize:23, fontWeight:800, margin:'2px 0 0', lineHeight:1.2 }}>{greeting}, Sarah 👋</h1>
            </div>
            <div style={{ width:40, height:40, borderRadius:13, background:c.primaryDim,
              display:'flex', alignItems:'center', justifyContent:'center', border:`1px solid ${c.primary}30`, cursor:'pointer' }}>
              <Icon name="Bell" size={18} color={c.primary} />
            </div>
          </div>
        </div>

        {/* Home Rhythm Card */}
        <div style={{ margin:'0 16px 16px', borderRadius:22, background:c.primaryGrad, padding:'20px', position:'relative', overflow:'hidden' }}>
          <div style={{ position:'absolute', top:-25, right:-25, width:110, height:110, borderRadius:'50%', background:'rgba(255,255,255,0.08)' }} />
          <div style={{ position:'absolute', bottom:-20, right:40, width:70, height:70, borderRadius:'50%', background:'rgba(255,255,255,0.05)' }} />
          <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:10 }}>
            <Icon name="Zap" size={14} color="rgba(255,255,255,0.95)" strokeWidth={2.5} />
            <span style={{ color:'rgba(255,255,255,0.9)', fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:1.2 }}>Home Rhythm</span>
          </div>
          <p style={{ color:'white', fontSize:19, fontWeight:800, margin:'0 0 3px', lineHeight:1.25 }}>Restock before the weekend</p>
          <p style={{ color:'rgba(255,255,255,0.8)', fontSize:13, margin:'0 0 14px' }}>Best run: <strong>Thursday evening</strong> · 9 items across 3 stops</p>
          <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
            {['🏪 3 stores','📦 9 items','~$99 est.'].map((tag,i) => (
              <div key={i} style={{ background:'rgba(255,255,255,0.18)', borderRadius:9, padding:'5px 11px', backdropFilter:'blur(10px)' }}>
                <span style={{ color:'white', fontSize:12, fontWeight:600 }}>{tag}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Critical Alerts */}
        {critical.length > 0 && (
          <div style={{ margin:'0 16px 16px' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:9 }}>
              <span style={{ color:c.text, fontSize:14, fontWeight:800 }}>Running Out Soon</span>
              <span style={{ color:c.danger, fontSize:11, fontWeight:700, background:c.dangerDim, padding:'2px 8px', borderRadius:6 }}>{critical.length} critical</span>
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:7 }}>
              {critical.map(item => (
                <div key={item.id} style={{ background:c.card, borderRadius:15, padding:'12px 14px',
                  border:`1px solid ${c.border}`, display:'flex', alignItems:'center', gap:12 }}>
                  <div style={{ width:42, height:42, borderRadius:13, background:c.dangerDim,
                    display:'flex', alignItems:'center', justifyContent:'center', fontSize:22 }}>{item.emoji}</div>
                  <div style={{ flex:1 }}>
                    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                      <div>
                        <div style={{ color:c.text, fontSize:14, fontWeight:700 }}>{item.name}</div>
                        <div style={{ color:c.textTertiary, fontSize:11 }}>{item.brand}</div>
                      </div>
                      <span style={{ color:c.danger, fontSize:11, fontWeight:700, background:c.dangerDim, padding:'3px 8px', borderRadius:7 }}>{item.days}d left</span>
                    </div>
                    <div style={{ marginTop:7, height:4, borderRadius:3, background:c.border, overflow:'hidden' }}>
                      <div style={{ height:'100%', width:`${stockPct(item.qty,item.max)}%`, background:c.danger, borderRadius:3 }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* By Room */}
        <div style={{ margin:'0 16px 16px' }}>
          <span style={{ color:c.text, fontSize:14, fontWeight:800 }}>By Room</span>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:9, marginTop:9 }}>
            {rooms.map(room => {
              const items = inventory.filter(i => i.cat === room);
              const low   = items.filter(i => i.days <= 7).length;
              return (
                <div key={room} onClick={() => { setInvCat(room); setTab('inventory'); }}
                  style={{ background:c.card, borderRadius:16, padding:'14px', border:`1px solid ${c.border}`, cursor:'pointer' }}>
                  <div style={{ fontSize:26, marginBottom:7 }}>{roomEmoji[room]}</div>
                  <div style={{ color:c.text, fontSize:14, fontWeight:700 }}>{room}</div>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:4 }}>
                    <span style={{ color:c.textSecondary, fontSize:11 }}>{items.length} items</span>
                    {low > 0 && <span style={{ color:c.warning, fontSize:10, fontWeight:700, background:c.warningDim, padding:'1px 7px', borderRadius:5 }}>{low} low</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Activity */}
        <div style={{ margin:'0 16px 20px' }}>
          <span style={{ color:c.text, fontSize:14, fontWeight:800 }}>Recent Activity</span>
          <div style={{ marginTop:9, display:'flex', flexDirection:'column', gap:6 }}>
            {[
              { who:'Alex',   act:'marked Milk as low',              time:'2h ago',  emoji:'🥛' },
              { who:'You',    act:'scanned pantry shelf — 6 items',  time:'5h ago',  emoji:'📸' },
              { who:'Jordan', act:'added Cat Food to shopping list', time:'1d ago',  emoji:'🐱' },
              { who:'System', act:'predicted Coffee restock Thu eve', time:'2d ago', emoji:'☕' },
            ].map((a, i) => (
              <div key={i} style={{ display:'flex', alignItems:'center', gap:11, padding:'10px 13px',
                background:c.card, borderRadius:13, border:`1px solid ${c.border}` }}>
                <span style={{ fontSize:18 }}>{a.emoji}</span>
                <span style={{ flex:1, color:c.text, fontSize:12 }}><strong>{a.who}</strong> {a.act}</span>
                <span style={{ color:c.textTertiary, fontSize:10 }}>{a.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // ── INVENTORY SCREEN ─────────────────────────────────────────────────────────
  const renderInventory = () => (
    <div style={{ flex:1, overflowY:'auto' }}>
      <div style={{ padding:'4px 16px 12px' }}>
        <h2 style={{ color:c.text, fontSize:22, fontWeight:800, margin:'0 0 12px' }}>Inventory</h2>
        <div style={{ display:'flex', alignItems:'center', gap:10, background:c.card, borderRadius:14,
          padding:'10px 14px', border:`1px solid ${c.border}`, marginBottom:11 }}>
          <Icon name="Search" size={17} color={c.textTertiary} />
          <input value={searchQ} onChange={e => setSearchQ(e.target.value)} placeholder="Search items..."
            style={{ flex:1, background:'none', border:'none', outline:'none', color:c.text,
              fontSize:13, fontFamily:"'Plus Jakarta Sans', sans-serif" }} />
          {searchQ && <div onClick={() => setSearchQ('')} style={{ cursor:'pointer' }}>
            <Icon name="X" size={16} color={c.textTertiary} />
          </div>}
        </div>
        <div style={{ display:'flex', gap:7, overflowX:'auto', paddingBottom:2 }}>
          {cats.map(cat => (
            <div key={cat} onClick={() => setInvCat(cat)} style={{
              padding:'6px 13px', borderRadius:20, cursor:'pointer', whiteSpace:'nowrap',
              background: invCat===cat ? c.primary : c.card,
              color: invCat===cat ? '#fff' : c.textSecondary,
              fontSize:12, fontWeight:600,
              border:`1px solid ${invCat===cat ? c.primary : c.border}`,
              transition:'all 0.2s', flexShrink:0,
            }}>{cat}</div>
          ))}
        </div>
      </div>

      <div style={{ padding:'0 16px 20px', display:'flex', flexDirection:'column', gap:7 }}>
        {filtered.map(item => (
          <div key={item.id} style={{ background:c.card, borderRadius:16, padding:'13px 14px', border:`1px solid ${c.border}` }}>
            <div style={{ display:'flex', alignItems:'center', gap:11 }}>
              <div style={{ width:44, height:44, borderRadius:13, background:`${stockColor(item.days)}18`,
                display:'flex', alignItems:'center', justifyContent:'center', fontSize:22, flexShrink:0 }}>{item.emoji}</div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
                  <div>
                    <div style={{ color:c.text, fontSize:14, fontWeight:700 }}>{item.name}</div>
                    <div style={{ color:c.textTertiary, fontSize:11 }}>{item.brand}</div>
                  </div>
                  <span style={{ color:stockColor(item.days), fontSize:11, fontWeight:700,
                    background:`${stockColor(item.days)}18`, padding:'3px 8px', borderRadius:7, flexShrink:0, marginLeft:8 }}>
                    {item.days <= 3 ? '🔴' : item.days <= 7 ? '🟡' : '🟢'} {item.days}d
                  </span>
                </div>
                <div style={{ marginTop:8, display:'flex', alignItems:'center', gap:9 }}>
                  <div style={{ flex:1, height:5, borderRadius:3, background:c.border, overflow:'hidden' }}>
                    <div style={{ height:'100%', width:`${stockPct(item.qty,item.max)}%`,
                      background:stockColor(item.days), borderRadius:3, transition:'width 0.4s' }} />
                  </div>
                  <span style={{ color:c.textSecondary, fontSize:11, fontWeight:600, minWidth:38 }}>{item.qty}/{item.max}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div style={{ textAlign:'center', padding:'40px 0', color:c.textTertiary }}>
            <div style={{ fontSize:40, marginBottom:8 }}>🔍</div>
            <div style={{ fontSize:14 }}>No items found</div>
          </div>
        )}
      </div>
    </div>
  );

  // ── SCAN SCREEN ──────────────────────────────────────────────────────────────
  const renderScan = () => (
    <div style={{ flex:1, overflowY:'auto' }}>
      <div style={{ padding:'4px 20px 14px' }}>
        <h2 style={{ color:c.text, fontSize:22, fontWeight:800, margin:'0 0 3px' }}>Add Items</h2>
        <p style={{ color:c.textSecondary, fontSize:13, margin:0 }}>Scan shelves, receipts, or use voice</p>
      </div>

      {/* Mode tabs */}
      <div style={{ margin:'0 16px 18px', background:c.card, borderRadius:16, padding:4,
        border:`1px solid ${c.border}`, display:'flex' }}>
        {[{ id:'photo', label:'Photo', icon:'Camera' },{ id:'receipt', label:'Receipt', icon:'FileText' },{ id:'voice', label:'Voice', icon:'Mic' }]
          .map(m => (
          <div key={m.id} onClick={() => { setScanMode(m.id); setScanDone(false); setScanning(false); }}
            style={{ flex:1, padding:'10px 6px', borderRadius:12, cursor:'pointer', textAlign:'center',
              background: scanMode===m.id ? c.primary : 'transparent', transition:'all 0.25s' }}>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:5 }}>
              <Icon name={m.icon} size={14} color={scanMode===m.id ? '#fff' : c.textSecondary} />
              <span style={{ color:scanMode===m.id ? '#fff' : c.textSecondary, fontSize:12, fontWeight:600 }}>{m.label}</span>
            </div>
          </div>
        ))}
      </div>

      {scanMode === 'photo' && (
        <div style={{ margin:'0 16px' }}>
          <div style={{ borderRadius:22, overflow:'hidden', position:'relative',
            background: theme==='dark' ? '#0a1020' : '#1a2035', height:230,
            display:'flex', alignItems:'center', justifyContent:'center',
            border:`2px solid ${scanning ? c.primary : c.border}`, transition:'border-color 0.3s' }}>
            <div style={{ position:'absolute', inset:0, background:`linear-gradient(180deg, ${c.primary}08 0%, transparent 100%)` }} />
            {/* Corner markers */}
            {[{top:14,left:14},{top:14,right:14},{bottom:14,left:14},{bottom:14,right:14}].map((pos,i) => (
              <div key={i} style={{ position:'absolute', width:22, height:22,
                borderTop: i<2 ? `3px solid ${c.primary}` : 'none',
                borderBottom: i>=2 ? `3px solid ${c.primary}` : 'none',
                borderLeft: i%2===0 ? `3px solid ${c.primary}` : 'none',
                borderRight: i%2===1 ? `3px solid ${c.primary}` : 'none', ...pos }} />
            ))}
            {scanning && (
              <div style={{ position:'absolute', left:0, right:0, height:2,
                background:`linear-gradient(90deg, transparent, ${c.primary}, transparent)`,
                animation:'scanLine 1.4s ease-in-out infinite' }} />
            )}
            {scanDone ? (
              <div style={{ textAlign:'center' }}>
                <div style={{ fontSize:46, marginBottom:6 }}>✅</div>
                <div style={{ color:c.primary, fontWeight:700, fontSize:16 }}>5 items detected!</div>
                <div style={{ color:c.textSecondary, fontSize:12, marginTop:3 }}>Tap to confirm below</div>
              </div>
            ) : scanning ? (
              <div style={{ textAlign:'center' }}>
                <div style={{ color:c.primary, fontWeight:700, fontSize:14, animation:'pulse 1s infinite' }}>Analyzing shelf...</div>
                <div style={{ color:c.textSecondary, fontSize:12, marginTop:4 }}>AI identifying products</div>
              </div>
            ) : (
              <div style={{ textAlign:'center' }}>
                <div style={{ fontSize:38, marginBottom:7 }}>📸</div>
                <div style={{ color:c.textSecondary, fontSize:13 }}>Point camera at your shelf</div>
              </div>
            )}
          </div>

          <div style={{ display:'flex', justifyContent:'center', margin:'16px 0' }}>
            <div onClick={handleScan} style={{ width:68, height:68, borderRadius:'50%',
              background: scanning ? c.border : c.primaryGrad,
              display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer',
              boxShadow: scanning ? 'none' : `0 8px 28px ${c.primary}55`,
              transition:'all 0.3s', border:`4px solid ${c.surface}` }}>
              <Icon name="Camera" size={26} color="#fff" />
            </div>
          </div>

          {scanDone && (
            <div style={{ background:c.card, borderRadius:16, padding:'13px', border:`1px solid ${c.primary}40`, marginBottom:14 }}>
              <div style={{ color:c.primary, fontWeight:700, fontSize:13, marginBottom:9 }}>Detected Items — Pantry Shelf</div>
              {['Quaker Oats (large)','Stumptown Coffee','Barilla Pasta × 2','Lundberg Brown Rice','Fancy Feast Cat Food × 6'].map((item,i) => (
                <div key={i} style={{ display:'flex', alignItems:'center', gap:9, padding:'7px 0',
                  borderBottom: i<4 ? `1px solid ${c.border}` : 'none' }}>
                  <Icon name="Check" size={15} color={c.success} strokeWidth={2.5} />
                  <span style={{ flex:1, color:c.text, fontSize:13 }}>{item}</span>
                  <span style={{ color:c.success, fontSize:11, fontWeight:600, background:c.successDim, padding:'2px 7px', borderRadius:6 }}>Added</span>
                </div>
              ))}
            </div>
          )}

          <div style={{ background:c.card, borderRadius:14, padding:'12px 14px', border:`1px solid ${c.border}` }}>
            <div style={{ color:c.textSecondary, fontSize:11, fontWeight:700, marginBottom:6, textTransform:'uppercase', letterSpacing:0.8 }}>💡 Tips</div>
            {['Good lighting gives better results','Include product labels in frame','Hold steady for 1–2 seconds'].map((tip,i) => (
              <div key={i} style={{ color:c.textSecondary, fontSize:12, padding:'2px 0' }}>• {tip}</div>
            ))}
          </div>
        </div>
      )}

      {scanMode === 'receipt' && (
        <div style={{ margin:'0 16px' }}>
          <div style={{ borderRadius:20, border:`2px dashed ${c.border}`, padding:'36px 20px', textAlign:'center', marginBottom:14 }}>
            <div style={{ fontSize:46, marginBottom:10 }}>🧾</div>
            <div style={{ color:c.text, fontWeight:700, fontSize:16, marginBottom:4 }}>Import Receipt</div>
            <div style={{ color:c.textSecondary, fontSize:13, marginBottom:18 }}>ShelfSense auto-parses item names & quantities</div>
            <div style={{ display:'flex', gap:10, justifyContent:'center' }}>
              <div onClick={handleScan} style={{ padding:'10px 20px', borderRadius:12, background:c.primaryGrad,
                color:'#fff', fontSize:13, fontWeight:600, cursor:'pointer', boxShadow:`0 4px 16px ${c.primary}40` }}>📷 Camera</div>
              <div style={{ padding:'10px 20px', borderRadius:12, background:c.card,
                color:c.text, fontSize:13, fontWeight:600, cursor:'pointer', border:`1px solid ${c.border}` }}>🖼️ Gallery</div>
            </div>
          </div>
          {scanDone && (
            <div style={{ background:c.card, borderRadius:16, padding:'13px', border:`1px solid ${c.primary}40` }}>
              <div style={{ color:c.primary, fontWeight:700, fontSize:13, marginBottom:9 }}>✅ Trader Joe's — Mar 20</div>
              {['Organic Milk × 2','Sourdough Bread','Frozen Berries (2 bags)','Almond Butter','Greek Yogurt 4-pack'].map((item,i) => (
                <div key={i} style={{ display:'flex', alignItems:'center', gap:9, padding:'7px 0',
                  borderBottom: i<4 ? `1px solid ${c.border}` : 'none' }}>
                  <Icon name="Check" size={15} color={c.success} strokeWidth={2.5} />
                  <span style={{ flex:1, color:c.text, fontSize:13 }}>{item}</span>
                  <span style={{ color:c.success, fontSize:11, fontWeight:600, background:c.successDim, padding:'2px 7px', borderRadius:6 }}>Added</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {scanMode === 'voice' && (
        <div style={{ margin:'0 16px', textAlign:'center' }}>
          <div onClick={handleScan} style={{ width:120, height:120, borderRadius:'50%', margin:'0 auto 18px', cursor:'pointer',
            background: scanning ? `${c.primary}18` : c.card,
            border:`3px solid ${scanning ? c.primary : c.border}`,
            display:'flex', alignItems:'center', justifyContent:'center',
            transition:'all 0.3s', boxShadow: scanning ? `0 0 40px ${c.primary}40` : 'none' }}>
            <Icon name="Mic" size={46} color={scanning ? c.primary : c.textTertiary} />
          </div>
          <div style={{ color:c.text, fontWeight:800, fontSize:17, marginBottom:6 }}>
            {scanning ? 'Listening...' : scanDone ? 'Got it!' : 'Tap to speak'}
          </div>
          <div style={{ color:c.textSecondary, fontSize:13, marginBottom:22 }}>
            Try: "I'm out of milk" or "Low on oatmeal"
          </div>
          {scanDone && (
            <div style={{ background:c.card, borderRadius:16, padding:'14px', border:`1px solid ${c.successDim}`, textAlign:'left' }}>
              <div style={{ color:c.success, fontWeight:700, fontSize:13, marginBottom:8 }}>Understood:</div>
              <div style={{ color:c.text, fontSize:13, fontStyle:'italic', marginBottom:10 }}>"Out of dish soap and almost out of oatmeal"</div>
              <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
                {['Dish Soap → Added to Target list','Oatmeal → Marked low (3 days left)'].map((a,i) => (
                  <div key={i} style={{ color:c.text, fontSize:12, background:c.successDim, padding:'5px 11px', borderRadius:8 }}>✓ {a}</div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <div style={{ margin:'20px 16px 20px' }}>
        <div style={{ color:c.text, fontSize:13, fontWeight:700, marginBottom:9 }}>Recently Added</div>
        {[
          { name:'Cat Food × 6', method:'Photo Scan', time:'1h ago', emoji:'🐱' },
          { name:'Laundry Detergent', method:'Receipt', time:'3h ago', emoji:'🧺' },
          { name:'Coffee Beans', method:'Voice', time:'1d ago', emoji:'☕' },
        ].map((r,i) => (
          <div key={i} style={{ display:'flex', alignItems:'center', gap:11, padding:'9px 0',
            borderBottom: i<2 ? `1px solid ${c.border}` : 'none' }}>
            <span style={{ fontSize:20 }}>{r.emoji}</span>
            <div style={{ flex:1 }}>
              <div style={{ color:c.text, fontSize:13, fontWeight:600 }}>{r.name}</div>
              <div style={{ color:c.textTertiary, fontSize:11 }}>via {r.method}</div>
            </div>
            <span style={{ color:c.textTertiary, fontSize:11 }}>{r.time}</span>
          </div>
        ))}
      </div>
    </div>
  );

  // ── LISTS SCREEN ─────────────────────────────────────────────────────────────
  const renderLists = () => {
    const grandTotal = lists.reduce((s, l) => s + l.items.reduce((a, i) => a + i.price, 0), 0);
    return (
      <div style={{ flex:1, overflowY:'auto' }}>
        <div style={{ padding:'4px 16px 12px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <div>
            <h2 style={{ color:c.text, fontSize:22, fontWeight:800, margin:'0 0 2px' }}>Smart Lists</h2>
            <p style={{ color:c.textSecondary, fontSize:12, margin:0 }}>Bundled for your next run</p>
          </div>
          <div style={{ background:c.primaryDim, borderRadius:12, padding:'7px 13px', border:`1px solid ${c.primary}30` }}>
            <span style={{ color:c.primary, fontSize:13, fontWeight:800 }}>${grandTotal.toFixed(2)}</span>
          </div>
        </div>

        <div style={{ margin:'0 16px 14px', background:c.dangerDim, borderRadius:14, padding:'11px 13px',
          border:`1px solid ${c.danger}30`, display:'flex', alignItems:'center', gap:9 }}>
          <Icon name="AlertTriangle" size={17} color={c.danger} />
          <div>
            <div style={{ color:c.danger, fontWeight:700, fontSize:13 }}>5 items needed by Thursday</div>
            <div style={{ color:c.textSecondary, fontSize:12 }}>Milk, Coffee, Cat Food, OJ + Oatmeal</div>
          </div>
        </div>

        <div style={{ padding:'0 16px 20px', display:'flex', flexDirection:'column', gap:11 }}>
          {lists.map(list => {
            const isOpen = expandedList === list.id;
            const total = list.items.reduce((s,i) => s+i.price, 0);
            const doneCount = list.items.filter((_,idx) => checked[`${list.id}-${idx}`]).length;
            return (
              <div key={list.id} style={{ background:c.card, borderRadius:18, border:`1px solid ${c.border}`, overflow:'hidden' }}>
                <div onClick={() => setExpandedList(isOpen ? null : list.id)}
                  style={{ padding:'14px 16px', cursor:'pointer', display:'flex', alignItems:'center', gap:11 }}>
                  <span style={{ fontSize:28 }}>{list.emoji}</span>
                  <div style={{ flex:1 }}>
                    <div style={{ color:c.text, fontWeight:700, fontSize:15 }}>{list.store}</div>
                    <div style={{ color:c.textSecondary, fontSize:12, marginTop:1 }}>{list.items.length} items · ${total.toFixed(2)}</div>
                  </div>
                  <div style={{ display:'flex', alignItems:'center', gap:7 }}>
                    {list.urgency === 'high' && (
                      <span style={{ color:c.danger, fontSize:10, fontWeight:700, background:c.dangerDim, padding:'2px 8px', borderRadius:6 }}>Urgent</span>
                    )}
                    {doneCount > 0 && (
                      <span style={{ color:c.success, fontSize:12, fontWeight:600 }}>{doneCount}/{list.items.length}</span>
                    )}
                    <div style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition:'transform 0.3s' }}>
                      <Icon name="ChevronDown" size={18} color={c.textTertiary} />
                    </div>
                  </div>
                </div>
                {doneCount > 0 && (
                  <div style={{ margin:'0 16px 8px', height:3, borderRadius:2, background:c.border }}>
                    <div style={{ height:'100%', width:`${(doneCount/list.items.length)*100}%`,
                      background:c.success, borderRadius:2, transition:'width 0.3s' }} />
                  </div>
                )}
                {isOpen && (
                  <div style={{ borderTop:`1px solid ${c.border}` }}>
                    {list.items.map((item, idx) => {
                      const k = `${list.id}-${idx}`;
                      const done = !!checked[k];
                      return (
                        <div key={idx} onClick={() => handleCheck(list.id, idx)}
                          style={{ display:'flex', alignItems:'center', gap:11, padding:'11px 16px',
                            borderBottom: idx < list.items.length-1 ? `1px solid ${c.border}` : 'none',
                            cursor:'pointer', background: done ? c.successDim : 'transparent',
                            transition:'background 0.2s' }}>
                          <div style={{ width:22, height:22, borderRadius:7, flexShrink:0,
                            border:`2px solid ${done ? c.success : c.border}`,
                            background: done ? c.success : 'transparent',
                            display:'flex', alignItems:'center', justifyContent:'center',
                            transition:'all 0.2s' }}>
                            {done && <Icon name="Check" size={13} color="#fff" strokeWidth={3} />}
                          </div>
                          <span style={{ flex:1, color: done ? c.textTertiary : c.text, fontSize:14,
                            textDecoration: done ? 'line-through' : 'none', transition:'all 0.2s' }}>{item.name}</span>
                          <span style={{ color:c.textSecondary, fontSize:12, marginRight:6 }}>{item.qty}</span>
                          <span style={{ color:c.text, fontSize:13, fontWeight:700, minWidth:42, textAlign:'right' }}>${item.price.toFixed(2)}</span>
                        </div>
                      );
                    })}
                    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center',
                      padding:'12px 16px', background:c.cardAlt }}>
                      <span style={{ color:c.textSecondary, fontSize:13 }}>Subtotal</span>
                      <span style={{ color:c.text, fontWeight:800, fontSize:16 }}>${total.toFixed(2)}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
          <div style={{ borderRadius:14, border:`2px dashed ${c.border}`, padding:'14px 16px',
            display:'flex', alignItems:'center', gap:11, cursor:'pointer' }}>
            <div style={{ width:36, height:36, borderRadius:10, background:c.primaryDim,
              display:'flex', alignItems:'center', justifyContent:'center' }}>
              <Icon name="Plus" size={18} color={c.primary} />
            </div>
            <span style={{ color:c.textSecondary, fontSize:14 }}>Add custom store list</span>
          </div>
        </div>
      </div>
    );
  };

  // ── SETTINGS SCREEN ──────────────────────────────────────────────────────────
  const renderSettings = () => (
    <div style={{ flex:1, overflowY:'auto' }}>
      <div style={{ padding:'4px 20px 16px' }}>
        <h2 style={{ color:c.text, fontSize:22, fontWeight:800, margin:0 }}>Settings</h2>
      </div>

      {/* Profile card */}
      <div style={{ margin:'0 16px 18px', background:c.primaryGrad, borderRadius:22, padding:'20px', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', top:-20, right:-20, width:100, height:100, borderRadius:'50%', background:'rgba(255,255,255,0.08)' }} />
        <div style={{ display:'flex', alignItems:'center', gap:14 }}>
          <div style={{ width:54, height:54, borderRadius:18, background:'rgba(255,255,255,0.22)',
            display:'flex', alignItems:'center', justifyContent:'center', fontSize:28 }}>👩‍💼</div>
          <div>
            <div style={{ color:'white', fontWeight:800, fontSize:17 }}>Sarah Miller</div>
            <div style={{ color:'rgba(255,255,255,0.8)', fontSize:13 }}>sarah@miller.com</div>
            <div style={{ color:'rgba(255,255,255,0.65)', fontSize:11, marginTop:2 }}>Admin · Household of 3</div>
          </div>
          <div style={{ marginLeft:'auto', background:'rgba(255,255,255,0.18)', borderRadius:10, padding:'6px 10px', cursor:'pointer' }}>
            <Icon name="Edit2" size={15} color="white" />
          </div>
        </div>
      </div>

      {/* Appearance */}
      <div style={{ margin:'0 16px 14px' }}>
        <div style={{ color:c.textTertiary, fontSize:10, fontWeight:700, textTransform:'uppercase', letterSpacing:1.2, marginBottom:7 }}>Appearance</div>
        <div style={{ background:c.card, borderRadius:16, border:`1px solid ${c.border}`, overflow:'hidden' }}>
          <div style={{ display:'flex', alignItems:'center', padding:'14px 16px' }}>
            <div style={{ width:34, height:34, borderRadius:10, background:c.secondaryDim,
              display:'flex', alignItems:'center', justifyContent:'center', marginRight:12 }}>
              <Icon name={theme==='dark' ? 'Moon' : 'Sun'} size={17} color={c.secondary} />
            </div>
            <div style={{ flex:1 }}>
              <div style={{ color:c.text, fontSize:14, fontWeight:600 }}>Dark Mode</div>
              <div style={{ color:c.textSecondary, fontSize:12 }}>{theme==='dark' ? 'Active — tap to switch to light' : 'Inactive — tap to switch to dark'}</div>
            </div>
            <div onClick={() => setTheme(theme==='dark' ? 'light' : 'dark')}
              style={{ width:48, height:28, borderRadius:14, cursor:'pointer',
                background: theme==='dark' ? c.primary : c.border,
                position:'relative', transition:'background 0.3s' }}>
              <div style={{ position:'absolute', top:3, left: theme==='dark' ? 23 : 3, width:22, height:22,
                borderRadius:'50%', background:'#fff', transition:'left 0.3s', boxShadow:'0 2px 5px rgba(0,0,0,0.3)' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Household */}
      <div style={{ margin:'0 16px 14px' }}>
        <div style={{ color:c.textTertiary, fontSize:10, fontWeight:700, textTransform:'uppercase', letterSpacing:1.2, marginBottom:7 }}>Household</div>
        <div style={{ background:c.card, borderRadius:16, border:`1px solid ${c.border}`, overflow:'hidden' }}>
          {members.map((m, i) => (
            <div key={i} style={{ display:'flex', alignItems:'center', padding:'12px 16px',
              borderBottom: i < members.length-1 ? `1px solid ${c.border}` : 'none', gap:11 }}>
              <div style={{ width:38, height:38, borderRadius:12, background:c.cardAlt,
                display:'flex', alignItems:'center', justifyContent:'center', fontSize:22 }}>{m.emoji}</div>
              <div style={{ flex:1 }}>
                <div style={{ color:c.text, fontSize:14, fontWeight:600 }}>{m.name}</div>
                <div style={{ color:c.textTertiary, fontSize:11 }}>{m.activity} · {m.time}</div>
              </div>
              <span style={{ color: m.role==='Admin' ? c.primary : c.textTertiary, fontSize:10, fontWeight:700,
                background: m.role==='Admin' ? c.primaryDim : c.cardAlt, padding:'3px 8px', borderRadius:6 }}>{m.role}</span>
            </div>
          ))}
          <div style={{ padding:'12px 16px', display:'flex', alignItems:'center', gap:11, cursor:'pointer' }}>
            <div style={{ width:38, height:38, borderRadius:12, border:`2px dashed ${c.border}`,
              display:'flex', alignItems:'center', justifyContent:'center' }}>
              <Icon name="UserPlus" size={17} color={c.textTertiary} />
            </div>
            <span style={{ color:c.textSecondary, fontSize:14 }}>Invite member</span>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div style={{ margin:'0 16px 14px' }}>
        <div style={{ color:c.textTertiary, fontSize:10, fontWeight:700, textTransform:'uppercase', letterSpacing:1.2, marginBottom:7 }}>Notifications</div>
        <div style={{ background:c.card, borderRadius:16, border:`1px solid ${c.border}`, overflow:'hidden' }}>
          {[
            { label:'Low stock alerts', sub:'When items reach 3 days left', val:notifOn, set:setNotifOn },
            { label:'Smart bundle suggestions', sub:'Weekly replenishment prompts', val:bundleOn, set:setBundleOn },
          ].map((s, i) => (
            <div key={i} style={{ display:'flex', alignItems:'center', padding:'14px 16px',
              borderBottom: i===0 ? `1px solid ${c.border}` : 'none' }}>
              <div style={{ flex:1 }}>
                <div style={{ color:c.text, fontSize:14, fontWeight:600 }}>{s.label}</div>
                <div style={{ color:c.textSecondary, fontSize:12 }}>{s.sub}</div>
              </div>
              <div onClick={() => s.set(!s.val)}
                style={{ width:48, height:28, borderRadius:14, cursor:'pointer',
                  background: s.val ? c.primary : c.border, position:'relative', transition:'background 0.3s' }}>
                <div style={{ position:'absolute', top:3, left: s.val ? 23 : 3, width:22, height:22,
                  borderRadius:'50%', background:'#fff', transition:'left 0.3s' }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* About */}
      <div style={{ margin:'0 16px 0' }}>
        <div style={{ background:c.card, borderRadius:16, border:`1px solid ${c.border}`, overflow:'hidden' }}>
          {[
            { label:'Privacy Policy', icon:'Shield' },
            { label:'Help & Support', icon:'HelpCircle' },
            { label:'Rate ShelfSense', icon:'Star' },
          ].map((item, i) => (
            <div key={i} style={{ display:'flex', alignItems:'center', padding:'14px 16px',
              borderBottom: i<2 ? `1px solid ${c.border}` : 'none', cursor:'pointer' }}>
              <div style={{ width:34, height:34, borderRadius:10, background:c.cardAlt,
                display:'flex', alignItems:'center', justifyContent:'center', marginRight:12 }}>
                <Icon name={item.icon} size={17} color={c.textSecondary} />
              </div>
              <span style={{ flex:1, color:c.text, fontSize:14 }}>{item.label}</span>
              <Icon name="ChevronRight" size={17} color={c.textTertiary} />
            </div>
          ))}
        </div>
        <div style={{ textAlign:'center', padding:'16px 0 20px', color:c.textTertiary, fontSize:11 }}>
          ShelfSense v1.0.0 · Know what to buy before you run out.
        </div>
      </div>
    </div>
  );

  // ── MAIN RENDER ──────────────────────────────────────────────────────────────
  return (
    <div style={{ minHeight:'100vh', background:'#0D1117',
      display:'flex', alignItems:'center', justifyContent:'center',
      fontFamily:"'Plus Jakarta Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { display: none; }
        input { font-family: 'Plus Jakarta Sans', sans-serif; }
        @keyframes scanLine {
          0%   { top: 15%; opacity: 1; }
          48%  { top: 82%; opacity: 1; }
          50%  { top: 82%; opacity: 0; }
          52%  { top: 15%; opacity: 0; }
          54%  { top: 15%; opacity: 1; }
          100% { top: 15%; opacity: 1; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.55; }
        }
      `}</style>

      {/* Phone frame */}
      <div style={{ width:375, height:812, borderRadius:50, background:c.bg,
        overflow:'hidden', position:'relative', flexShrink:0,
        boxShadow:'0 50px 120px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.07)',
        display:'flex', flexDirection:'column', transition:'background 0.3s' }}>

        {/* Dynamic Island */}
        <div style={{ position:'absolute', top:12, left:'50%', transform:'translateX(-50%)',
          width:122, height:36, background:'#000', borderRadius:22, zIndex:100,
          display:'flex', alignItems:'center', justifyContent:'center', gap:9 }}>
          <div style={{ width:10, height:10, borderRadius:'50%', background:'#222', border:'2px solid #333' }} />
          <div style={{ width:14, height:14, borderRadius:'50%', background:'#1a1a1a' }} />
        </div>

        {/* Status bar */}
        {renderStatusBar()}

        {/* Content */}
        <div style={{ flex:1, overflow:'hidden', display:'flex', flexDirection:'column' }}>
          {tab === 'home'      && renderHome()}
          {tab === 'inventory' && renderInventory()}
          {tab === 'scan'      && renderScan()}
          {tab === 'lists'     && renderLists()}
          {tab === 'settings'  && renderSettings()}
        </div>

        {/* Bottom nav */}
        {renderNav()}
      </div>
    </div>
  );
}
