const { useState, useEffect, useRef } = React;

const themes = {
  dark: {
    bg: '#07100d', surface: '#0f1912', surfaceEl: '#162219', surfaceHigh: '#1e2e24',
    primary: '#22c55e', primaryDim: '#166534', primaryGlow: 'rgba(34,197,94,0.15)',
    secondary: '#86efac', text: '#f0fdf4', textSec: '#94a3b8', textMuted: '#4b5563',
    border: '#1e2e24', borderLight: '#243328', warning: '#f59e0b', danger: '#ef4444',
    card: '#0f1912', pill: '#1e2e24',
  },
  light: {
    bg: '#f0fdf4', surface: '#ffffff', surfaceEl: '#f7fef9', surfaceHigh: '#dcfce7',
    primary: '#16a34a', primaryDim: '#dcfce7', primaryGlow: 'rgba(22,163,74,0.12)',
    secondary: '#4ade80', text: '#0f172a', textSec: '#475569', textMuted: '#94a3b8',
    border: '#e2f5e8', borderLight: '#d1fae5', warning: '#d97706', danger: '#dc2626',
    card: '#ffffff', pill: '#f0fdf4',
  }
};

const pantryData = [
  { id:1, name:'Baby Spinach', cat:'Fridge', emoji:'🥬', days:2, amt:'200g', urg:'critical', cal:23 },
  { id:2, name:'Chicken Thighs', cat:'Fridge', emoji:'🍗', days:1, amt:'600g', urg:'critical', cal:209 },
  { id:3, name:'Cherry Tomatoes', cat:'Fridge', emoji:'🍅', days:4, amt:'1 pint', urg:'warn', cal:18 },
  { id:4, name:'Salsa (open)', cat:'Fridge', emoji:'🥫', days:6, amt:'¼ jar', urg:'warn', cal:36 },
  { id:5, name:'Greek Yogurt', cat:'Fridge', emoji:'🫙', days:5, amt:'500ml', urg:'warn', cal:59 },
  { id:6, name:'Sourdough Bread', cat:'Pantry', emoji:'🍞', days:3, amt:'½ loaf', urg:'warn', cal:289 },
  { id:7, name:'Cheddar Block', cat:'Fridge', emoji:'🧀', days:12, amt:'250g', urg:'ok', cal:403 },
  { id:8, name:'Pasta', cat:'Pantry', emoji:'🍝', days:90, amt:'500g', urg:'ok', cal:131 },
  { id:9, name:'Canned Chickpeas', cat:'Pantry', emoji:'🫘', days:180, amt:'2 cans', urg:'ok', cal:164 },
  { id:10, name:'Frozen Peas', cat:'Freezer', emoji:'🫛', days:60, amt:'400g', urg:'ok', cal:81 },
  { id:11, name:'Garlic', cat:'Pantry', emoji:'🧄', days:21, amt:'1 bulb', urg:'ok', cal:149 },
  { id:12, name:'Olive Oil', cat:'Pantry', emoji:'🫒', days:365, amt:'¾ bottle', urg:'ok', cal:884 },
];

const recipeData = [
  {
    id:1, name:'Spinach & Tomato Pasta', time:'15 min', diff:'Easy', match:95,
    tags:['Quick','Vegetarian'], uses:['Baby Spinach','Cherry Tomatoes','Pasta','Garlic'],
    rescue:false, emoji:'🍝', servings:2, cal:420,
    desc:'Wilted spinach, blistered cherry tomatoes, and garlic in a simple olive oil pasta. Uses your most urgent items.',
    steps:['Boil pasta al dente','Sauté garlic in olive oil','Add tomatoes until blistered','Wilt spinach in','Toss everything together'],
  },
  {
    id:2, name:'Salsa Chicken Thighs', time:'25 min', diff:'Easy', match:88,
    tags:['High Protein','Use Soon'], uses:['Chicken Thighs','Salsa (open)','Frozen Peas'],
    rescue:false, emoji:'🍗', servings:3, cal:510,
    desc:'Stovetop chicken thighs braised in leftover salsa with peas. Clears your most urgent protein and that open jar.',
    steps:['Season and sear chicken thighs','Pour salsa over chicken','Cover and simmer 18 min','Add frozen peas last 3 min','Rest and serve'],
  },
  {
    id:3, name:'Yogurt Chickpea Curry', time:'20 min', diff:'Medium', match:82,
    tags:['Vegetarian','Rescue'], uses:['Greek Yogurt','Canned Chickpeas','Cherry Tomatoes'],
    rescue:true, emoji:'🍛', servings:2, cal:390,
    desc:'Rescue recipe — transforms open yogurt and pantry chickpeas into a creamy, warming curry with fresh tomatoes.',
    steps:['Toast spices in oil','Add tomatoes and cook down','Stir in chickpeas','Add yogurt off-heat (don\'t boil)','Serve with bread'],
  },
  {
    id:4, name:'Cheesy Spinach Toast', time:'10 min', diff:'Easy', match:79,
    tags:['Breakfast','Rescue'], uses:['Sourdough Bread','Baby Spinach','Cheddar Block'],
    rescue:true, emoji:'🥪', servings:1, cal:340,
    desc:'Quick rescue for staling sourdough and wilting spinach. Topped with melted cheddar — works as breakfast or a light lunch.',
    steps:['Toast sourdough until golden','Wilt spinach in pan with butter','Pile spinach on toast','Cover with grated cheddar','Grill 2 min until melted'],
  },
];

const alertData = [
  { id:1, item:'Chicken Thighs', msg:'Use by tomorrow — cook or freeze tonight.', urg:'critical', emoji:'🍗', recipe:'Salsa Chicken Thighs', tip:'Freeze raw in individual portions if not cooking tonight.' },
  { id:2, item:'Baby Spinach', msg:'2 days left, wilting fast.', urg:'critical', emoji:'🥬', recipe:'Spinach & Tomato Pasta', tip:'Add to eggs, pasta, or smoothies to use quickly.' },
  { id:3, item:'Sourdough Bread', msg:'Getting stale — best in 3 days.', urg:'warn', emoji:'🍞', recipe:'Cheesy Spinach Toast', tip:'Slice and freeze it now if you won\'t eat it this week.' },
  { id:4, item:'Salsa (open)', msg:'Open jar — use within the week.', urg:'warn', emoji:'🥫', recipe:'Salsa Chicken Thighs', tip:'Great as a pizza sauce or mixed into scrambled eggs.' },
  { id:5, item:'Greek Yogurt', msg:'5 days. Ideal for curry or breakfast.', urg:'warn', emoji:'🫙', recipe:'Yogurt Chickpea Curry', tip:'Use in marinades too — yogurt tenderizes chicken beautifully.' },
  { id:6, item:'Cherry Tomatoes', msg:'4 days. Add to tonight\'s pasta.', urg:'warn', emoji:'🍅', recipe:'Spinach & Tomato Pasta', tip:'Roast a tray at 200°C for 25 min to concentrate flavor and extend life.' },
];

function UrgencyBar({ days, t }) {
  const pct = days <= 1 ? 10 : days <= 3 ? 35 : days <= 7 ? 65 : 90;
  const color = days <= 1 ? t.danger : days <= 3 ? t.warning : days <= 7 ? '#f59e0b' : t.primary;
  return (
    <div style={{ height:3, borderRadius:2, background: t.borderLight, overflow:'hidden', marginTop:4 }}>
      <div style={{ width:`${pct}%`, height:'100%', background:color, borderRadius:2, transition:'width 0.4s ease' }} />
    </div>
  );
}

function StatusBar({ t, isDark, setIsDark }) {
  const { Sun, Moon } = window.lucide;
  return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'12px 20px 4px', zIndex:10 }}>
      <span style={{ fontSize:13, fontWeight:600, color:t.text, fontFamily:'inherit' }}>9:41</span>
      <div style={{ width:120, height:32, background:'#000', borderRadius:16, display:'flex', alignItems:'center', justifyContent:'center' }}>
        <div style={{ width:10, height:10, borderRadius:5, background:'#1a1a1a' }} />
      </div>
      <div style={{ display:'flex', alignItems:'center', gap:6 }}>
        <button onClick={() => setIsDark(!isDark)} style={{ background:'none', border:'none', cursor:'pointer', padding:2, display:'flex', alignItems:'center', color:t.textSec }}>
          {isDark ? React.createElement(Sun, { size:14 }) : React.createElement(Moon, { size:14 })}
        </button>
        <svg width="16" height="12" viewBox="0 0 16 12" fill={t.textSec}><rect x="0" y="4" width="3" height="8" rx="1"/><rect x="4.5" y="2" width="3" height="10" rx="1"/><rect x="9" y="0" width="3" height="12" rx="1"/><rect x="13.5" y="0" width="2.5" height="12" rx="1" opacity="0.3"/></svg>
        <svg width="22" height="12" viewBox="0 0 22 12" fill="none"><rect x="0.5" y="0.5" width="18" height="11" rx="3.5" stroke={t.textSec}/><rect x="2" y="2" width="13" height="8" rx="2" fill={t.primary}/><path d="M20 4v4a2 2 0 000-4z" fill={t.textMuted}/></svg>
      </div>
    </div>
  );
}

function PantryScreen({ t }) {
  const { Plus, Camera, Receipt, Mic, Search, Filter, Refrigerator } = window.lucide;
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQ, setSearchQ] = useState('');
  const filters = ['All', 'Fridge', 'Pantry', 'Freezer'];
  const filtered = pantryData.filter(i =>
    (activeFilter === 'All' || i.cat === activeFilter) &&
    (searchQ === '' || i.name.toLowerCase().includes(searchQ.toLowerCase()))
  );
  const critical = pantryData.filter(i => i.urg === 'critical').length;

  return (
    <div style={{ flex:1, overflowY:'auto', paddingBottom:80 }}>
      {/* Header */}
      <div style={{ padding:'16px 20px 12px' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:16 }}>
          <div>
            <h1 style={{ fontSize:24, fontWeight:700, color:t.text, margin:0, letterSpacing:-0.5 }}>My Pantry</h1>
            <p style={{ fontSize:13, color:t.textSec, margin:'2px 0 0', fontWeight:400 }}>{pantryData.length} items · {critical} need attention</p>
          </div>
          <div style={{ width:40, height:40, borderRadius:20, background:t.primaryGlow, border:`1.5px solid ${t.primary}`, display:'flex', alignItems:'center', justifyContent:'center', color:t.primary }}>
            {React.createElement(Refrigerator, { size:18 })}
          </div>
        </div>
        {/* Search */}
        <div style={{ display:'flex', gap:8, marginBottom:12 }}>
          <div style={{ flex:1, display:'flex', alignItems:'center', gap:8, background:t.surfaceEl, border:`1px solid ${t.border}`, borderRadius:12, padding:'9px 12px' }}>
            {React.createElement(Search, { size:15, color:t.textMuted })}
            <input
              value={searchQ} onChange={e => setSearchQ(e.target.value)}
              placeholder="Search ingredients..."
              style={{ background:'none', border:'none', outline:'none', color:t.text, fontSize:14, fontFamily:'inherit', flex:1 }}
            />
          </div>
          <div style={{ width:40, height:40, borderRadius:12, background:t.surfaceEl, border:`1px solid ${t.border}`, display:'flex', alignItems:'center', justifyContent:'center', color:t.textSec, cursor:'pointer' }}>
            {React.createElement(Filter, { size:16 })}
          </div>
        </div>
        {/* Add strip */}
        <div style={{ display:'flex', gap:8, marginBottom:4 }}>
          {[{icon:Camera,label:'Photo'},{icon:Receipt,label:'Receipt'},{icon:Mic,label:'Voice'},{icon:Plus,label:'Manual'}].map(({ icon:Icon, label }) => (
            <button key={label} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:4, padding:'10px 4px', background:t.surfaceEl, border:`1px solid ${t.border}`, borderRadius:12, cursor:'pointer', color:t.primary }}>
              {React.createElement(Icon, { size:16 })}
              <span style={{ fontSize:10, color:t.textSec, fontFamily:'inherit', fontWeight:500 }}>{label}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Filters */}
      <div style={{ display:'flex', gap:8, padding:'0 20px 12px', overflowX:'auto' }}>
        {filters.map(f => (
          <button key={f} onClick={() => setActiveFilter(f)} style={{
            padding:'6px 14px', borderRadius:20, border:'none', cursor:'pointer', fontFamily:'inherit',
            fontSize:13, fontWeight:500, whiteSpace:'nowrap',
            background: activeFilter === f ? t.primary : t.surfaceEl,
            color: activeFilter === f ? '#fff' : t.textSec,
          }}>{f}</button>
        ))}
      </div>
      {/* Urgency banner */}
      {critical > 0 && (
        <div style={{ margin:'0 20px 12px', padding:'10px 14px', background:'rgba(239,68,68,0.1)', border:'1px solid rgba(239,68,68,0.25)', borderRadius:12, display:'flex', alignItems:'center', gap:8 }}>
          <span style={{ fontSize:14 }}>⚠️</span>
          <span style={{ fontSize:13, color:'#fca5a5', fontWeight:500 }}>{critical} item{critical>1?'s':''} expiring very soon</span>
        </div>
      )}
      {/* Items */}
      <div style={{ padding:'0 20px', display:'flex', flexDirection:'column', gap:8 }}>
        {filtered.map(item => {
          const urgColor = item.urg === 'critical' ? t.danger : item.urg === 'warn' ? t.warning : t.primary;
          return (
            <div key={item.id} style={{ display:'flex', alignItems:'center', gap:12, padding:'12px 14px', background:t.card, border:`1px solid ${t.border}`, borderRadius:14 }}>
              <div style={{ width:44, height:44, borderRadius:12, background:t.surfaceEl, display:'flex', alignItems:'center', justifyContent:'center', fontSize:22 }}>{item.emoji}</div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                  <span style={{ fontSize:14, fontWeight:600, color:t.text }}>{item.name}</span>
                  <span style={{ fontSize:11, fontWeight:600, color:urgColor }}>{item.days === 1 ? 'Tomorrow' : `${item.days}d`}</span>
                </div>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:2 }}>
                  <span style={{ fontSize:12, color:t.textSec }}>{item.amt} · {item.cat}</span>
                  <span style={{ fontSize:10, color:t.textMuted }}>{item.cal} kcal/100g</span>
                </div>
                <UrgencyBar days={item.days} t={t} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function RecipesScreen({ t }) {
  const { Clock, Zap, Star, BookOpen, ChevronRight, Recycle } = window.lucide;
  const [selected, setSelected] = useState(null);
  const [tab, setTab] = useState('suggested');

  if (selected) {
    const r = recipeData.find(x => x.id === selected);
    return (
      <div style={{ flex:1, overflowY:'auto', paddingBottom:80 }}>
        <div style={{ padding:'16px 20px', display:'flex', alignItems:'center', gap:12 }}>
          <button onClick={() => setSelected(null)} style={{ width:36, height:36, borderRadius:10, background:t.surfaceEl, border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', color:t.text, fontSize:18 }}>←</button>
          <span style={{ fontSize:16, fontWeight:600, color:t.text }}>Recipe</span>
        </div>
        <div style={{ padding:'0 20px 20px' }}>
          <div style={{ fontSize:52, textAlign:'center', marginBottom:12 }}>{r.emoji}</div>
          <h2 style={{ fontSize:22, fontWeight:700, color:t.text, margin:'0 0 6px', letterSpacing:-0.5 }}>{r.name}</h2>
          <p style={{ fontSize:14, color:t.textSec, lineHeight:1.6, margin:'0 0 16px' }}>{r.desc}</p>
          <div style={{ display:'flex', gap:8, marginBottom:16, flexWrap:'wrap' }}>
            <div style={{ display:'flex', alignItems:'center', gap:4, padding:'5px 10px', background:t.surfaceEl, borderRadius:20 }}>
              {React.createElement(Clock, { size:12, color:t.textSec })}
              <span style={{ fontSize:12, color:t.textSec }}>{r.time}</span>
            </div>
            <div style={{ display:'flex', alignItems:'center', gap:4, padding:'5px 10px', background:t.surfaceEl, borderRadius:20 }}>
              {React.createElement(Zap, { size:12, color:t.textSec })}
              <span style={{ fontSize:12, color:t.textSec }}>{r.diff}</span>
            </div>
            <div style={{ display:'flex', alignItems:'center', gap:4, padding:'5px 10px', background:t.primaryGlow, borderRadius:20 }}>
              <span style={{ fontSize:12, color:t.primary, fontWeight:600 }}>{r.match}% match</span>
            </div>
            <div style={{ padding:'5px 10px', background:t.surfaceEl, borderRadius:20 }}>
              <span style={{ fontSize:12, color:t.textSec }}>{r.cal} kcal · {r.servings} servings</span>
            </div>
          </div>
          <div style={{ marginBottom:16 }}>
            <h3 style={{ fontSize:14, fontWeight:600, color:t.text, marginBottom:8 }}>Ingredients you have</h3>
            {r.uses.map(u => (
              <div key={u} style={{ display:'flex', alignItems:'center', gap:8, padding:'6px 0', borderBottom:`1px solid ${t.border}` }}>
                <div style={{ width:6, height:6, borderRadius:3, background:t.primary }} />
                <span style={{ fontSize:14, color:t.text }}>{u}</span>
                <span style={{ marginLeft:'auto', fontSize:11, color:t.primary, fontWeight:500 }}>In pantry ✓</span>
              </div>
            ))}
          </div>
          <div style={{ marginBottom:16 }}>
            <h3 style={{ fontSize:14, fontWeight:600, color:t.text, marginBottom:8 }}>Steps</h3>
            {r.steps.map((s, i) => (
              <div key={i} style={{ display:'flex', gap:10, padding:'8px 0', borderBottom:`1px solid ${t.border}` }}>
                <div style={{ width:22, height:22, borderRadius:11, background:t.primaryGlow, border:`1px solid ${t.primary}`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                  <span style={{ fontSize:11, color:t.primary, fontWeight:700 }}>{i+1}</span>
                </div>
                <span style={{ fontSize:14, color:t.textSec, lineHeight:1.5 }}>{s}</span>
              </div>
            ))}
          </div>
          <button style={{ width:'100%', padding:'14px', background:t.primary, border:'none', borderRadius:14, color:'#fff', fontSize:15, fontWeight:700, cursor:'pointer', fontFamily:'inherit' }}>
            Start Cooking →
          </button>
        </div>
      </div>
    );
  }

  const suggested = recipeData.filter(r => !r.rescue);
  const rescue = recipeData.filter(r => r.rescue);
  const displayList = tab === 'suggested' ? suggested : rescue;

  return (
    <div style={{ flex:1, overflowY:'auto', paddingBottom:80 }}>
      <div style={{ padding:'16px 20px 12px' }}>
        <h1 style={{ fontSize:24, fontWeight:700, color:t.text, margin:'0 0 4px', letterSpacing:-0.5 }}>Recipes for You</h1>
        <p style={{ fontSize:13, color:t.textSec, margin:'0 0 16px' }}>Based on what's in your kitchen right now</p>
        <div style={{ display:'flex', gap:4, padding:4, background:t.surfaceEl, borderRadius:12, marginBottom:16 }}>
          {[['suggested','Suggested'],['rescue','Rescue Recipes 🚨']].map(([k,l]) => (
            <button key={k} onClick={() => setTab(k)} style={{
              flex:1, padding:'8px', borderRadius:10, border:'none', cursor:'pointer', fontFamily:'inherit',
              fontSize:13, fontWeight:500,
              background: tab === k ? t.primary : 'transparent',
              color: tab === k ? '#fff' : t.textSec,
            }}>{l}</button>
          ))}
        </div>
      </div>
      {tab === 'rescue' && (
        <div style={{ margin:'0 20px 12px', padding:'10px 14px', background:'rgba(245,158,11,0.1)', border:'1px solid rgba(245,158,11,0.25)', borderRadius:12 }}>
          <p style={{ margin:0, fontSize:13, color:'#fbbf24', lineHeight:1.5 }}>Rescue recipes use awkward leftovers and near-expiry items before they go to waste.</p>
        </div>
      )}
      <div style={{ padding:'0 20px', display:'flex', flexDirection:'column', gap:12 }}>
        {displayList.map(r => (
          <div key={r.id} onClick={() => setSelected(r.id)} style={{ background:t.card, border:`1px solid ${t.border}`, borderRadius:16, overflow:'hidden', cursor:'pointer' }}>
            <div style={{ padding:'16px' }}>
              <div style={{ display:'flex', alignItems:'flex-start', gap:12 }}>
                <div style={{ width:52, height:52, borderRadius:14, background:t.surfaceEl, display:'flex', alignItems:'center', justifyContent:'center', fontSize:26, flexShrink:0 }}>{r.emoji}</div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                    <span style={{ fontSize:15, fontWeight:700, color:t.text }}>{r.name}</span>
                    <span style={{ fontSize:13, fontWeight:700, color:t.primary }}>{r.match}%</span>
                  </div>
                  <p style={{ fontSize:12, color:t.textSec, margin:'3px 0 8px', lineHeight:1.4 }}>{r.desc}</p>
                  <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
                    <span style={{ fontSize:11, color:t.textSec, display:'flex', alignItems:'center', gap:3 }}>
                      {React.createElement(Clock, { size:11, color:t.textMuted })} {r.time}
                    </span>
                    <span style={{ fontSize:11, color:t.textSec }}>· {r.diff}</span>
                    {r.tags.map(tg => (
                      <span key={tg} style={{ fontSize:10, padding:'2px 7px', background:t.primaryGlow, color:t.primary, borderRadius:20, fontWeight:600 }}>{tg}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div style={{ marginTop:12, padding:'8px 10px', background:t.surfaceEl, borderRadius:10 }}>
                <span style={{ fontSize:11, color:t.textMuted }}>Uses: </span>
                <span style={{ fontSize:11, color:t.textSec }}>{r.uses.join(' · ')}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AlertsScreen({ t }) {
  const { Bell, AlertTriangle, Check, ChefHat, ArrowRight, TrendingDown } = window.lucide;
  const [dismissed, setDismissed] = useState([]);
  const visible = alertData.filter(a => !dismissed.includes(a.id));
  const critical = visible.filter(a => a.urg === 'critical');
  const warn = visible.filter(a => a.urg === 'warn');
  const wasteScore = Math.round((1 - dismissed.length / alertData.length) * 78);

  return (
    <div style={{ flex:1, overflowY:'auto', paddingBottom:80 }}>
      <div style={{ padding:'16px 20px 12px' }}>
        <h1 style={{ fontSize:24, fontWeight:700, color:t.text, margin:'0 0 4px', letterSpacing:-0.5 }}>Smart Alerts</h1>
        <p style={{ fontSize:13, color:t.textSec, margin:'0 0 16px' }}>{visible.length} item{visible.length !== 1 ? 's' : ''} needing attention</p>
        {/* Waste score card */}
        <div style={{ padding:'16px', background:`linear-gradient(135deg, ${t.primaryGlow}, ${t.surfaceEl})`, border:`1px solid ${t.border}`, borderRadius:16, marginBottom:16 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <div>
              <div style={{ fontSize:12, color:t.textSec, marginBottom:4 }}>Waste Prevention Score</div>
              <div style={{ fontSize:32, fontWeight:800, color:t.primary, letterSpacing:-1 }}>{wasteScore}<span style={{ fontSize:16, fontWeight:500 }}>/100</span></div>
              <div style={{ fontSize:11, color:t.textSec, marginTop:2 }}>You've saved ~3.2kg food this month</div>
            </div>
            <div style={{ width:64, height:64, borderRadius:32, background:t.primaryGlow, border:`2px solid ${t.primary}`, display:'flex', alignItems:'center', justifyContent:'center' }}>
              {React.createElement(TrendingDown, { size:24, color:t.primary })}
            </div>
          </div>
          <div style={{ marginTop:10, height:5, background:t.border, borderRadius:3 }}>
            <div style={{ width:`${wasteScore}%`, height:'100%', background:t.primary, borderRadius:3, transition:'width 0.5s' }} />
          </div>
        </div>
      </div>

      {critical.length > 0 && (
        <div style={{ padding:'0 20px 8px' }}>
          <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:8 }}>
            {React.createElement(AlertTriangle, { size:14, color:t.danger })}
            <span style={{ fontSize:12, fontWeight:700, color:t.danger, letterSpacing:0.5, textTransform:'uppercase' }}>Act Today</span>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
            {critical.map(a => (
              <div key={a.id} style={{ background:t.card, border:`1.5px solid rgba(239,68,68,0.3)`, borderRadius:14, overflow:'hidden' }}>
                <div style={{ height:2, background:'linear-gradient(90deg, #ef4444, #f97316)' }} />
                <div style={{ padding:'12px 14px' }}>
                  <div style={{ display:'flex', alignItems:'flex-start', gap:10 }}>
                    <span style={{ fontSize:24 }}>{a.emoji}</span>
                    <div style={{ flex:1 }}>
                      <div style={{ display:'flex', justifyContent:'space-between' }}>
                        <span style={{ fontSize:14, fontWeight:700, color:t.text }}>{a.item}</span>
                        <button onClick={() => setDismissed(d => [...d, a.id])} style={{ width:24, height:24, borderRadius:12, background:'rgba(239,68,68,0.15)', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', color:t.danger }}>
                          {React.createElement(Check, { size:12 })}
                        </button>
                      </div>
                      <p style={{ fontSize:13, color:'#fca5a5', margin:'3px 0 6px' }}>{a.msg}</p>
                      <p style={{ fontSize:11, color:t.textMuted, margin:'0 0 8px', lineHeight:1.4 }}>{a.tip}</p>
                      <div style={{ display:'flex', alignItems:'center', gap:4, padding:'6px 10px', background:'rgba(239,68,68,0.1)', borderRadius:8 }}>
                        {React.createElement(ChefHat, { size:12, color:t.danger })}
                        <span style={{ fontSize:11, color:t.danger, fontWeight:500 }}>Try: {a.recipe}</span>
                        {React.createElement(ArrowRight, { size:11, color:t.danger })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {warn.length > 0 && (
        <div style={{ padding:'12px 20px 0' }}>
          <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:8 }}>
            {React.createElement(Bell, { size:14, color:t.warning })}
            <span style={{ fontSize:12, fontWeight:700, color:t.warning, letterSpacing:0.5, textTransform:'uppercase' }}>Use This Week</span>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
            {warn.map(a => (
              <div key={a.id} style={{ background:t.card, border:`1px solid rgba(245,158,11,0.2)`, borderRadius:14, padding:'12px 14px' }}>
                <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                  <span style={{ fontSize:22 }}>{a.emoji}</span>
                  <div style={{ flex:1 }}>
                    <div style={{ display:'flex', justifyContent:'space-between' }}>
                      <span style={{ fontSize:14, fontWeight:600, color:t.text }}>{a.item}</span>
                      <button onClick={() => setDismissed(d => [...d, a.id])} style={{ width:22, height:22, borderRadius:11, background:'rgba(245,158,11,0.15)', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', color:t.warning }}>
                        {React.createElement(Check, { size:11 })}
                      </button>
                    </div>
                    <p style={{ fontSize:12, color:'#fcd34d', margin:'2px 0 6px' }}>{a.msg}</p>
                    <span style={{ fontSize:11, padding:'3px 8px', background:'rgba(245,158,11,0.1)', color:t.warning, borderRadius:20, fontWeight:500 }}>→ {a.recipe}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {visible.length === 0 && (
        <div style={{ padding:'40px 20px', textAlign:'center' }}>
          <div style={{ fontSize:48, marginBottom:12 }}>✨</div>
          <div style={{ fontSize:16, fontWeight:600, color:t.text, marginBottom:6 }}>All caught up!</div>
          <div style={{ fontSize:13, color:t.textSec }}>No urgent items right now. Your pantry is in great shape.</div>
        </div>
      )}
    </div>
  );
}

function PlanScreen({ t }) {
  const { ShoppingCart, Plus, X, Check, Users, Zap, Star } = window.lucide;
  const [mealPlan, setMealPlan] = useState({
    Mon: 'Spinach & Tomato Pasta', Tue: 'Salsa Chicken Thighs',
    Wed: null, Thu: 'Yogurt Chickpea Curry', Fri: 'Cheesy Spinach Toast',
  });
  const days = ['Mon','Tue','Wed','Thu','Fri'];
  const shopList = [
    { item:'Garlic', qty:'1 bulb', checked:false },
    { item:'Olive Oil', qty:'500ml', checked:false },
    { item:'Cumin', qty:'Small jar', checked:true },
    { item:'Onion', qty:'2 medium', checked:false },
    { item:'Lemon', qty:'2', checked:false },
  ];
  const [checked, setChecked] = useState([2]);

  return (
    <div style={{ flex:1, overflowY:'auto', paddingBottom:80 }}>
      <div style={{ padding:'16px 20px 12px' }}>
        <h1 style={{ fontSize:24, fontWeight:700, color:t.text, margin:'0 0 4px', letterSpacing:-0.5 }}>Meal Plan</h1>
        <p style={{ fontSize:13, color:t.textSec, margin:'0 0 16px' }}>This week · 4 of 5 days planned</p>

        <div style={{ display:'flex', flexDirection:'column', gap:8, marginBottom:20 }}>
          {days.map(day => (
            <div key={day} style={{ display:'flex', alignItems:'center', gap:10, padding:'11px 14px', background:t.card, border:`1px solid ${t.border}`, borderRadius:12 }}>
              <span style={{ fontSize:12, fontWeight:700, color:t.textMuted, width:28 }}>{day}</span>
              {mealPlan[day] ? (
                <>
                  <span style={{ fontSize:14, color:t.text, fontWeight:500, flex:1 }}>{mealPlan[day]}</span>
                  <button onClick={() => setMealPlan(p => ({...p, [day]:null}))} style={{ width:22, height:22, borderRadius:11, background:t.surfaceEl, border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', color:t.textMuted }}>
                    {React.createElement(X, { size:11 })}
                  </button>
                </>
              ) : (
                <>
                  <span style={{ fontSize:13, color:t.textMuted, flex:1, fontStyle:'italic' }}>Not planned</span>
                  <div style={{ width:22, height:22, borderRadius:11, background:t.primaryGlow, display:'flex', alignItems:'center', justifyContent:'center', color:t.primary }}>
                    {React.createElement(Plus, { size:11 })}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        {/* Smart prediction */}
        <div style={{ padding:'14px', background:t.surfaceEl, border:`1px solid ${t.border}`, borderRadius:14, marginBottom:16 }}>
          <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:8 }}>
            {React.createElement(Zap, { size:14, color:t.primary })}
            <span style={{ fontSize:12, fontWeight:700, color:t.primary, letterSpacing:0.3 }}>PREDICTED RUN-OUTS</span>
          </div>
          {[['Olive Oil','~4 days',true],['Pasta','~9 days',false],['Eggs','~2 days',true]].map(([item,time,urgent]) => (
            <div key={item} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'5px 0', borderBottom:`1px solid ${t.border}` }}>
              <span style={{ fontSize:13, color:t.text }}>{item}</span>
              <span style={{ fontSize:12, color: urgent ? t.warning : t.textSec, fontWeight: urgent ? 600 : 400 }}>{time}</span>
            </div>
          ))}
        </div>

        {/* Shopping list */}
        <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:10 }}>
          {React.createElement(ShoppingCart, { size:16, color:t.textSec })}
          <h2 style={{ fontSize:16, fontWeight:700, color:t.text, margin:0 }}>Shopping List</h2>
          <span style={{ marginLeft:'auto', fontSize:11, color:t.textMuted }}>{shopList.length - checked.length} items needed</span>
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
          {shopList.map((s, i) => (
            <div key={i} onClick={() => setChecked(c => c.includes(i) ? c.filter(x => x !== i) : [...c, i])} style={{ display:'flex', alignItems:'center', gap:10, padding:'10px 14px', background:t.card, border:`1px solid ${t.border}`, borderRadius:12, cursor:'pointer', opacity: checked.includes(i) ? 0.5 : 1 }}>
              <div style={{ width:20, height:20, borderRadius:6, border:`1.5px solid ${checked.includes(i) ? t.primary : t.border}`, background: checked.includes(i) ? t.primary : 'transparent', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                {checked.includes(i) && React.createElement(Check, { size:11, color:'#fff' })}
              </div>
              <span style={{ flex:1, fontSize:14, color:t.text, textDecoration: checked.includes(i) ? 'line-through' : 'none' }}>{s.item}</span>
              <span style={{ fontSize:12, color:t.textSec }}>{s.qty}</span>
            </div>
          ))}
        </div>
        {/* Household */}
        <div style={{ marginTop:16, padding:'12px 14px', background:t.surfaceEl, border:`1px solid ${t.border}`, borderRadius:14 }}>
          <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:8 }}>
            {React.createElement(Users, { size:13, color:t.textSec })}
            <span style={{ fontSize:13, fontWeight:600, color:t.text }}>Household · 2 members</span>
          </div>
          {[['You','Vegetarian friendly','🧑'],['Alex','No nuts · eats meat','👩']].map(([name,pref,em]) => (
            <div key={name} style={{ display:'flex', alignItems:'center', gap:8, padding:'6px 0' }}>
              <span style={{ fontSize:16 }}>{em}</span>
              <div><div style={{ fontSize:13, color:t.text, fontWeight:500 }}>{name}</div><div style={{ fontSize:11, color:t.textSec }}>{pref}</div></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SettingsScreen({ t, isDark, setIsDark }) {
  const { Sun, Moon, Bell, Users, ChevronRight, Leaf, Star, Zap, ShoppingCart } = window.lucide;
  const [notifs, setNotifs] = useState(true);
  const [smartSuggest, setSmartSuggest] = useState(true);
  const [metric, setMetric] = useState(true);

  const Toggle = ({ val, onToggle }) => (
    <div onClick={onToggle} style={{ width:44, height:24, borderRadius:12, background: val ? t.primary : t.surfaceHigh, cursor:'pointer', position:'relative', transition:'background 0.25s', flexShrink:0 }}>
      <div style={{ position:'absolute', top:2, left: val ? 22 : 2, width:20, height:20, borderRadius:10, background:'#fff', boxShadow:'0 1px 3px rgba(0,0,0,0.2)', transition:'left 0.25s' }} />
    </div>
  );

  const Row = ({ icon: Icon, label, sub, action }) => (
    <div style={{ display:'flex', alignItems:'center', gap:12, padding:'12px 16px', borderBottom:`1px solid ${t.border}` }}>
      <div style={{ width:32, height:32, borderRadius:8, background:t.surfaceEl, display:'flex', alignItems:'center', justifyContent:'center', color:t.primary, flexShrink:0 }}>
        {React.createElement(Icon, { size:15 })}
      </div>
      <div style={{ flex:1 }}>
        <div style={{ fontSize:14, fontWeight:500, color:t.text }}>{label}</div>
        {sub && <div style={{ fontSize:11, color:t.textSec, marginTop:1 }}>{sub}</div>}
      </div>
      {action}
    </div>
  );

  return (
    <div style={{ flex:1, overflowY:'auto', paddingBottom:80 }}>
      <div style={{ padding:'16px 20px 12px' }}>
        <h1 style={{ fontSize:24, fontWeight:700, color:t.text, margin:'0 0 4px', letterSpacing:-0.5 }}>Settings</h1>
        <p style={{ fontSize:13, color:t.textSec, margin:'0 0 16px' }}>Pantry Pulse v1.0.0</p>
        {/* Profile card */}
        <div style={{ display:'flex', alignItems:'center', gap:12, padding:'16px', background:t.card, border:`1px solid ${t.border}`, borderRadius:16, marginBottom:20 }}>
          <div style={{ width:52, height:52, borderRadius:26, background:`linear-gradient(135deg, ${t.primary}, ${t.secondary})`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:22 }}>🧑</div>
          <div>
            <div style={{ fontSize:16, fontWeight:700, color:t.text }}>Alex Johnson</div>
            <div style={{ fontSize:12, color:t.textSec }}>2-person household · Mostly vegetarian</div>
          </div>
          <div style={{ marginLeft:'auto', color:t.textMuted }}>{React.createElement(ChevronRight, { size:16 })}</div>
        </div>
      </div>

      <div style={{ margin:'0 20px', background:t.card, border:`1px solid ${t.border}`, borderRadius:16, overflow:'hidden', marginBottom:16 }}>
        <div style={{ padding:'10px 16px', fontSize:11, fontWeight:700, color:t.textMuted, letterSpacing:0.8, textTransform:'uppercase', borderBottom:`1px solid ${t.border}` }}>Appearance</div>
        <Row icon={isDark ? Moon : Sun} label="Theme" sub={isDark ? 'Dark mode' : 'Light mode'} action={
          <div style={{ display:'flex', gap:6 }}>
            {[['Dark','🌙'],['Light','☀️']].map(([k,em]) => (
              <button key={k} onClick={() => setIsDark(k === 'Dark')} style={{ padding:'4px 10px', borderRadius:20, border:'none', cursor:'pointer', fontFamily:'inherit', fontSize:11, fontWeight:500, background: (isDark ? k === 'Dark' : k === 'Light') ? t.primary : t.surfaceEl, color: (isDark ? k === 'Dark' : k === 'Light') ? '#fff' : t.textSec }}>{em} {k}</button>
            ))}
          </div>
        } />
      </div>

      <div style={{ margin:'0 20px', background:t.card, border:`1px solid ${t.border}`, borderRadius:16, overflow:'hidden', marginBottom:16 }}>
        <div style={{ padding:'10px 16px', fontSize:11, fontWeight:700, color:t.textMuted, letterSpacing:0.8, textTransform:'uppercase', borderBottom:`1px solid ${t.border}` }}>Preferences</div>
        <Row icon={Bell} label="Expiry Alerts" sub="Get notified before items expire" action={<Toggle val={notifs} onToggle={() => setNotifs(!notifs)} />} />
        <Row icon={Zap} label="Smart Suggestions" sub="AI meal ideas based on your pantry" action={<Toggle val={smartSuggest} onToggle={() => setSmartSuggest(!smartSuggest)} />} />
        <Row icon={Leaf} label="Units" sub={metric ? 'Metric (g, ml, kg)' : 'Imperial (oz, lbs)'} action={<Toggle val={metric} onToggle={() => setMetric(!metric)} />} />
      </div>

      <div style={{ margin:'0 20px', background:t.card, border:`1px solid ${t.border}`, borderRadius:16, overflow:'hidden', marginBottom:16 }}>
        <div style={{ padding:'10px 16px', fontSize:11, fontWeight:700, color:t.textMuted, letterSpacing:0.8, textTransform:'uppercase', borderBottom:`1px solid ${t.border}` }}>Household</div>
        <Row icon={Users} label="Manage Members" sub="2 members · dietary preferences" action={React.createElement(ChevronRight, { size:14, color:t.textMuted })} />
        <Row icon={ShoppingCart} label="Sync Shopping List" sub="Share with household" action={React.createElement(ChevronRight, { size:14, color:t.textMuted })} />
      </div>

      <div style={{ margin:'0 20px 20px', padding:'14px', background:t.primaryGlow, border:`1px solid ${t.primary}`, borderRadius:14 }}>
        <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:6 }}>
          {React.createElement(Star, { size:14, color:t.primary })}
          <span style={{ fontSize:12, fontWeight:700, color:t.primary }}>Your impact this month</span>
        </div>
        {[['🥬','3.2 kg food saved from waste'],['💰','~$24 saved on groceries'],['🌍','1.8 kg CO₂ emissions avoided']].map(([em,l]) => (
          <div key={l} style={{ display:'flex', gap:8, padding:'4px 0', fontSize:13, color:t.textSec }}><span>{em}</span><span>{l}</span></div>
        ))}
      </div>
    </div>
  );
}

function App() {
  const [isDark, setIsDark] = useState(true);
  const [activeTab, setActiveTab] = useState('pantry');

  const t = isDark ? themes.dark : themes.light;

  const { ShoppingCart, ChefHat, Bell, Settings, Refrigerator } = window.lucide;

  const tabs = [
    { id:'pantry', label:'Pantry', icon:Refrigerator },
    { id:'recipes', label:'Recipes', icon:ChefHat },
    { id:'alerts', label:'Alerts', icon:Bell, badge:2 },
    { id:'plan', label:'Plan', icon:ShoppingCart },
    { id:'settings', label:'Settings', icon:Settings },
  ];

  const fontLink = `@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');`;

  return (
    <div style={{ minHeight:'100vh', background:'#1a1a1a', display:'flex', alignItems:'center', justifyContent:'center', padding:'20px', fontFamily:'Plus Jakarta Sans, sans-serif' }}>
      <style>{fontLink}{`* { box-sizing: border-box; } ::-webkit-scrollbar { display: none; } body { margin: 0; }`}</style>
      {/* Phone frame */}
      <div style={{ width:375, height:812, background:t.bg, borderRadius:50, overflow:'hidden', boxShadow:'0 40px 120px rgba(0,0,0,0.6), 0 0 0 2px #2a2a2a, inset 0 0 0 1px rgba(255,255,255,0.05)', display:'flex', flexDirection:'column', position:'relative', fontFamily:'Plus Jakarta Sans, sans-serif' }}>
        <StatusBar t={t} isDark={isDark} setIsDark={setIsDark} />
        {/* Screen */}
        <div style={{ flex:1, overflowY:'auto', display:'flex', flexDirection:'column', position:'relative' }}>
          {activeTab === 'pantry' && <PantryScreen t={t} />}
          {activeTab === 'recipes' && <RecipesScreen t={t} />}
          {activeTab === 'alerts' && <AlertsScreen t={t} />}
          {activeTab === 'plan' && <PlanScreen t={t} />}
          {activeTab === 'settings' && <SettingsScreen t={t} isDark={isDark} setIsDark={setIsDark} />}
        </div>
        {/* Bottom nav */}
        <div style={{ position:'absolute', bottom:0, left:0, right:0, background:t.surface, borderTop:`1px solid ${t.border}`, padding:'8px 0 20px', display:'flex', backdropFilter:'blur(20px)', zIndex:50 }}>
          {tabs.map(({ id, label, icon:Icon, badge }) => {
            const active = activeTab === id;
            return (
              <button key={id} onClick={() => setActiveTab(id)} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:3, background:'none', border:'none', cursor:'pointer', padding:'4px 0', position:'relative' }}>
                <div style={{ position:'relative' }}>
                  <div style={{ width:32, height:28, borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center', background: active ? t.primaryGlow : 'transparent', transition:'background 0.2s' }}>
                    {React.createElement(Icon, { size:18, color: active ? t.primary : t.textMuted, strokeWidth: active ? 2.5 : 1.8 })}
                  </div>
                  {badge && !active && <div style={{ position:'absolute', top:-2, right:-2, width:14, height:14, borderRadius:7, background:t.danger, display:'flex', alignItems:'center', justifyContent:'center' }}><span style={{ fontSize:8, color:'#fff', fontWeight:700 }}>{badge}</span></div>}
                </div>
                <span style={{ fontSize:10, color: active ? t.primary : t.textMuted, fontWeight: active ? 700 : 500, fontFamily:'Plus Jakarta Sans, sans-serif' }}>{label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
