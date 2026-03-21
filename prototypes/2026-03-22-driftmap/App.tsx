const { useState, useEffect, useRef } = React;

// ─── Theme System ─────────────────────────────────────────────────────────────
const themes = {
  light: {
    bg: '#EFF6FF', surface: '#FFFFFF', surface2: '#F0F9FF',
    primary: '#0EA5E9', primaryGlow: 'rgba(14,165,233,0.18)', accent: '#06B6D4',
    text: '#0C1A2E', textSec: '#475569', textMuted: '#94A3B8',
    border: '#E2E8F0', card: '#FFFFFF', shadow: '0 2px 14px rgba(0,0,0,0.07)',
    navBg: '#FFFFFF', navBorder: '#E2E8F0',
    mapBg: '#DBEAFE', mapGrid: '#BFDBFE',
    pill: '#EFF6FF', pillText: '#0EA5E9',
    inputBg: '#F0F9FF',
  },
  dark: {
    bg: '#060E1C', surface: '#0F1825', surface2: '#14203A',
    primary: '#38BDF8', primaryGlow: 'rgba(56,189,248,0.18)', accent: '#22D3EE',
    text: '#F1F5F9', textSec: '#94A3B8', textMuted: '#475569',
    border: '#1E2D42', card: '#121D2F', shadow: '0 2px 14px rgba(0,0,0,0.4)',
    navBg: '#0F1825', navBorder: '#1E2D42',
    mapBg: '#0A1628', mapGrid: '#0F1E35',
    pill: '#0F1E35', pillText: '#38BDF8',
    inputBg: '#0F1E35',
  }
};

// ─── Data ─────────────────────────────────────────────────────────────────────
const ZONE_COLORS = { sun:'#F59E0B', wind:'#8B5CF6', rain:'#3B82F6', drizzle:'#60A5FA', shade:'#10B981', clear:'#94A3B8', ice:'#06B6D4' };

const ROUTE_BLOCKS = [
  { name:'Home (Start)', cross:'32nd & Park Ave', dist:0,    cond:'clear',   temp:72, wind:7,  icon:'MapPin',      color:'#10B981', label:'Clear Start'     },
  { name:'Park Ave',     cross:'Near 31st St',   dist:200,  cond:'sun',     temp:75, wind:6,  icon:'Sun',         color:'#F59E0B', label:'Full Sun Exposure'},
  { name:'Broadway',     cross:'Near 29th St',   dist:480,  cond:'shade',   temp:71, wind:5,  icon:'Leaf',        color:'#10B981', label:'Building Shade'  },
  { name:'6th Ave',      cross:'Wind Tunnel',    dist:680,  cond:'wind',    temp:69, wind:26, icon:'Wind',        color:'#8B5CF6', label:'Wind Tunnel ⚠️'  },
  { name:'Flatiron Plz', cross:'Near 23rd St',   dist:900,  cond:'rain',    temp:66, wind:14, icon:'CloudRain',   color:'#3B82F6', label:'Rain Pocket'     },
  { name:'Madison Sq',   cross:'Near 22nd St',   dist:1100, cond:'drizzle', temp:65, wind:10, icon:'CloudDrizzle',color:'#60A5FA', label:'Light Drizzle'   },
  { name:'Destination',  cross:'20th & 5th Ave', dist:1340, cond:'clear',   temp:70, wind:6,  icon:'Navigation',  color:'#10B981', label:'Clear Arrival'   },
];

const COMPARE_ROUTES = [
  { id:'A', name:'Via Park Ave',    dist:'0.83 mi', time:'17 min', score:71, grade:'B',  rain:40, wind:'High',     sunExp:'High', tags:['💨 Wind tunnel at 6th Ave','🌧 Rain pocket near Flatiron'],   accent:'#F59E0B' },
  { id:'B', name:'Via 5th Ave',     dist:'0.91 mi', time:'19 min', score:89, grade:'A',  rain:8,  wind:'Low',      sunExp:'Med',  tags:['🌳 Shaded most of route','✅ Avoids rain & wind zones'], accent:'#10B981', recommended:true },
  { id:'C', name:'Via Lexington',   dist:'0.79 mi', time:'16 min', score:53, grade:'C-', rain:72, wind:'Very High', sunExp:'Low',  tags:['⛈ Heavy rain exposure','💨 Severe headwinds all route'], accent:'#EF4444' },
];

const ALERTS = [
  { id:1, icon:'Droplets',    accent:'#3B82F6', title:'Flooded Crosswalk',  loc:'6th Ave & 28th St',        ago:'3m ago',  detail:'SE corner completely flooded — use north side ramp',  by:'Maria S.',        helpful:14 },
  { id:2, icon:'Wind',        accent:'#8B5CF6', title:'Brutal Headwind',    loc:'Broadway at 29th St',      ago:'9m ago',  detail:'Sustained 28mph gusts, tunnel effect, very strong',   by:'Cyclist @jkim',   helpful:9  },
  { id:3, icon:'Snowflake',   accent:'#06B6D4', title:'Icy Patch',          loc:'Flatiron North Entrance',  ago:'18m ago', detail:'Shaded marble steps still icy from overnight cold',   by:'Building Staff',  helpful:23 },
  { id:4, icon:'CloudDrizzle',accent:'#60A5FA', title:'Surprise Drizzle',   loc:'Madison Sq Park Area',     ago:'31m ago', detail:'Radar missed this pocket — bring hood not umbrella',  by:'RunnerPete',      helpful:7  },
  { id:5, icon:'Thermometer', accent:'#F59E0B', title:'Sun Trap Zone',      loc:'Park Ave at 31st St',      ago:'42m ago', detail:'Glass towers reflecting heat, feels 10°F hotter',     by:'Office Worker',   helpful:11 },
];

const TIMELINE = [
  { time:'Now',   label:'Now',  score:56, comfort:'Poor',  zones:['sun','wind','rain','shade','clear'],   temp:68, tip:'Headwind + rain pocket mid-route' },
  { time:'9:56',  label:'+15m', score:67, comfort:'Fair',  zones:['sun','shade','drizzle','shade','clear'],temp:67, tip:'Rain lightening, wind still present' },
  { time:'10:11', label:'+30m', score:82, comfort:'Good',  zones:['shade','shade','clear','shade','clear'],temp:67, tip:'Rain passes, mostly shaded route' },
  { time:'10:26', label:'+45m', score:94, comfort:'Great', zones:['shade','shade','clear','clear','sun'],  temp:69, tip:'Best window — dry, cool, low wind', best:true },
  { time:'10:41', label:'+60m', score:87, comfort:'Good',  zones:['clear','shade','clear','sun','sun'],    temp:70, tip:'More sun exposure but still dry' },
  { time:'11:11', label:'+90m', score:73, comfort:'Fair',  zones:['sun','sun','wind','clear','sun'],       temp:73, tip:'Winds returning, temps rising' },
];

// ─── Shared Helpers ───────────────────────────────────────────────────────────
function ZoneDot({ zone, size }) {
  const s = size || 8;
  return React.createElement('div', { style:{ width:s, height:s, borderRadius:'50%', background:ZONE_COLORS[zone]||'#999', flexShrink:0 } });
}

function ScoreRing({ score, size, theme }) {
  const sz = size || 52;
  const color = score >= 80 ? '#10B981' : score >= 60 ? '#F59E0B' : '#EF4444';
  const r = sz/2 - 4;
  const circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;
  return React.createElement('div', { style:{ position:'relative', width:sz, height:sz } },
    React.createElement('svg', { width:sz, height:sz, style:{ transform:'rotate(-90deg)' } },
      React.createElement('circle', { cx:sz/2, cy:sz/2, r, fill:'none', stroke:theme.border, strokeWidth:3.5 }),
      React.createElement('circle', { cx:sz/2, cy:sz/2, r, fill:'none', stroke:color, strokeWidth:3.5, strokeDasharray:circ, strokeDashoffset:circ-dash, strokeLinecap:'round' })
    ),
    React.createElement('div', { style:{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', fontSize:sz>48?14:12, fontWeight:700, color:theme.text } }, score)
  );
}

// ─── Route Screen ─────────────────────────────────────────────────────────────
function RouteScreen({ theme }) {
  const [active, setActive] = useState(3);
  const block = ROUTE_BLOCKS[active];
  const pts = [[28,155],[80,138],[118,100],[165,80],[220,95],[270,72],[318,52]];
  const condColors = ROUTE_BLOCKS.map(b => ZONE_COLORS[b.cond]||'#aaa');

  return React.createElement('div', { style:{ flex:1, overflowY:'auto', paddingBottom:8 } },
    // Search bar
    React.createElement('div', { style:{ padding:'0 16px 12px', background:theme.surface } },
      React.createElement('div', { style:{ display:'flex', gap:10, alignItems:'center' } },
        React.createElement('div', { style:{ flex:1, background:theme.inputBg, borderRadius:14, padding:'10px 14px', display:'flex', alignItems:'center', gap:8, border:`1px solid ${theme.border}` } },
          React.createElement(window.lucide.Search, { size:15, color:theme.textMuted }),
          React.createElement('span', { style:{ fontSize:14, color:theme.textMuted } }, '20th & 5th Ave, NYC')
        ),
        React.createElement('div', { style:{ width:40, height:40, borderRadius:12, background:theme.primary, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', flexShrink:0 } },
          React.createElement(window.lucide.Navigation, { size:18, color:'#fff' })
        )
      )
    ),
    // Quick stats strip
    React.createElement('div', { style:{ display:'flex', gap:8, padding:'0 16px 10px', overflowX:'auto', scrollbarWidth:'none' } },
      [{ icon:'Thermometer', val:'72°F', lbl:'Feels 69°' },{ icon:'Wind', val:'14 mph', lbl:'NW Wind' },{ icon:'CloudRain', val:'55%', lbl:'Rain chance' },{ icon:'Eye', val:'8.2 mi', lbl:'Visibility' }]
        .map(item => React.createElement('div', { key:item.lbl, style:{ minWidth:78, background:theme.card, border:`1px solid ${theme.border}`, borderRadius:14, padding:'10px 12px', textAlign:'center', flexShrink:0, boxShadow:theme.shadow } },
          React.createElement(window.lucide[item.icon], { size:16, color:theme.primary, style:{ display:'block', margin:'0 auto 4px' } }),
          React.createElement('div', { style:{ fontSize:13, fontWeight:700, color:theme.text } }, item.val),
          React.createElement('div', { style:{ fontSize:10, color:theme.textMuted, marginTop:1 } }, item.lbl)
        ))
    ),
    // SVG Map
    React.createElement('div', { style:{ margin:'0 16px 10px', borderRadius:18, overflow:'hidden', background:theme.mapBg, border:`1px solid ${theme.border}`, position:'relative' } },
      React.createElement('svg', { width:343, height:180, viewBox:'0 0 343 180' },
        ...[30,70,110,150].map(y => React.createElement('line', { key:`h${y}`, x1:0, y1:y, x2:343, y2:y, stroke:theme.mapGrid, strokeWidth:0.6 })),
        ...[60,120,180,240,300].map(x => React.createElement('line', { key:`v${x}`, x1:x, y1:0, x2:x, y2:180, stroke:theme.mapGrid, strokeWidth:0.6 })),
        pts.slice(0,-1).map((p,i) => React.createElement('line', { key:`seg${i}`, x1:p[0], y1:p[1], x2:pts[i+1][0], y2:pts[i+1][1], stroke:condColors[i], strokeWidth:5.5, strokeLinecap:'round', opacity:active===i||active===i+1?1:0.6 })),
        pts.map((p,i) => React.createElement('g', { key:`wp${i}`, style:{cursor:'pointer'}, onClick:()=>setActive(i) },
          React.createElement('circle', { cx:p[0], cy:p[1], r:i===active?10:6, fill:condColors[i], stroke:'#fff', strokeWidth:2 }),
          i===active && React.createElement('circle', { cx:p[0], cy:p[1], r:16, fill:'none', stroke:condColors[i], strokeWidth:1.5, opacity:0.4 })
        ))
      ),
      React.createElement('div', { style:{ position:'absolute', top:8, right:8, background:`${theme.surface}DD`, backdropFilter:'blur(8px)', borderRadius:10, padding:'6px 8px' } },
        [['sun','Sun'],['rain','Rain'],['wind','Wind'],['shade','Shade']].map(([z,l]) =>
          React.createElement('div', { key:z, style:{ display:'flex', alignItems:'center', gap:5, marginBottom:3 } },
            React.createElement(ZoneDot, { zone:z }),
            React.createElement('span', { style:{ fontSize:9, color:theme.textSec, fontWeight:600 } }, l)
          )
        )
      ),
      React.createElement('div', { style:{ position:'absolute', bottom:8, left:10, background:`${theme.surface}CC`, backdropFilter:'blur(6px)', borderRadius:8, padding:'4px 8px' } },
        React.createElement('span', { style:{ fontSize:10, fontWeight:600, color:theme.textSec } }, 'Tap a waypoint to inspect')
      )
    ),
    // Block detail card
    React.createElement('div', { style:{ margin:'0 16px 10px', background:theme.card, borderRadius:18, padding:'14px 16px', border:`1.5px solid ${block.color}44`, boxShadow:theme.shadow } },
      React.createElement('div', { style:{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:10 } },
        React.createElement('div', {},
          React.createElement('div', { style:{ fontSize:11, color:theme.textMuted, marginBottom:2 } }, `📍 ${block.dist}m along route`),
          React.createElement('div', { style:{ fontSize:16, fontWeight:700, color:theme.text } }, block.name),
          React.createElement('div', { style:{ fontSize:12, color:theme.textSec } }, block.cross)
        ),
        React.createElement('div', { style:{ background:`${block.color}1A`, borderRadius:12, padding:'8px 12px', textAlign:'center' } },
          React.createElement(window.lucide[block.icon]||window.lucide.Cloud, { size:22, color:block.color }),
          React.createElement('div', { style:{ fontSize:10, color:block.color, fontWeight:700, marginTop:3 } }, block.label)
        )
      ),
      React.createElement('div', { style:{ display:'flex', gap:8 } },
        [['Temp', `${block.temp}°F`],['Wind', `${block.wind} mph`],['Block', `${active+1}/${ROUTE_BLOCKS.length}`]].map(([lbl,val],i) =>
          React.createElement('div', { key:i, style:{ flex:1, background:theme.surface2, borderRadius:10, padding:'8px 10px', textAlign:'center' } },
            React.createElement('div', { style:{ fontSize:17, fontWeight:700, color:i===2?block.color:theme.text } }, val),
            React.createElement('div', { style:{ fontSize:10, color:theme.textMuted, marginTop:1 } }, lbl)
          )
        )
      )
    ),
    // Smart shortcuts
    React.createElement('div', { style:{ margin:'0 16px 12px' } },
      React.createElement('div', { style:{ fontSize:13, fontWeight:700, color:theme.text, marginBottom:8 } }, '⚡ Weather Smart Shortcuts'),
      [{ e:'🕐', t:'Leave in 45 min for the driest window' },{ e:'🧥', t:'Bring a hood, not an umbrella' },{ e:'🚪', t:'Use the east entrance at Flatiron Plaza' }]
        .map((s,i) => React.createElement('div', { key:i, style:{ background:theme.card, border:`1px solid ${theme.border}`, borderRadius:14, padding:'10px 14px', display:'flex', alignItems:'center', gap:10, marginBottom:6, cursor:'pointer' } },
          React.createElement('span', { style:{ fontSize:18 } }, s.e),
          React.createElement('span', { style:{ fontSize:13, color:theme.textSec, flex:1, lineHeight:1.4 } }, s.t),
          React.createElement(window.lucide.ChevronRight, { size:14, color:theme.textMuted })
        ))
    )
  );
}

// ─── Compare Screen ───────────────────────────────────────────────────────────
function CompareScreen({ theme }) {
  const [sel, setSel] = useState('B');
  return React.createElement('div', { style:{ flex:1, overflowY:'auto', paddingBottom:8 } },
    React.createElement('div', { style:{ padding:'0 16px 14px' } },
      React.createElement('div', { style:{ fontSize:20, fontWeight:700, color:theme.text } }, 'Route Compare'),
      React.createElement('div', { style:{ fontSize:13, color:theme.textSec, marginTop:2 } }, 'Pick the most comfortable path')
    ),
    ...COMPARE_ROUTES.map(r =>
      React.createElement('button', {
        key:r.id, onClick:()=>setSel(r.id),
        style:{ display:'block', width:'calc(100% - 32px)', margin:'0 16px 10px', border:sel===r.id?`2px solid ${r.accent}`:`1.5px solid ${theme.border}`, borderRadius:18, padding:14, background:sel===r.id?`${r.accent}0E`:theme.card, cursor:'pointer', textAlign:'left', boxShadow:sel===r.id?`0 6px 20px ${r.accent}22`:theme.shadow }
      },
        React.createElement('div', { style:{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10 } },
          React.createElement('div', {},
            React.createElement('div', { style:{ display:'flex', alignItems:'center', gap:8, marginBottom:2 } },
              React.createElement('div', { style:{ fontSize:15, fontWeight:700, color:theme.text } }, r.name),
              r.recommended && React.createElement('span', { style:{ fontSize:10, fontWeight:700, color:'#10B981', background:'#10B98118', borderRadius:8, padding:'2px 7px' } }, '✓ BEST')
            ),
            React.createElement('div', { style:{ fontSize:12, color:theme.textMuted } }, `${r.dist} · ${r.time} walk`)
          ),
          React.createElement(ScoreRing, { score:r.score, size:50, theme })
        ),
        React.createElement('div', { style:{ display:'flex', gap:8, marginBottom:10 } },
          [['Rain Exp', `${r.rain}%`, r.rain>50?'#EF4444':r.rain>20?'#F59E0B':'#10B981'],
           ['Wind', r.wind, r.wind==='Low'?'#10B981':r.wind.includes('High')?'#EF4444':'#F59E0B'],
           ['Sun', r.sunExp, theme.textSec]].map(([lbl,val,col]) =>
            React.createElement('div', { key:lbl, style:{ flex:1, background:theme.surface2, borderRadius:10, padding:'7px 6px', textAlign:'center' } },
              React.createElement('div', { style:{ fontSize:12, fontWeight:700, color:col } }, val),
              React.createElement('div', { style:{ fontSize:10, color:theme.textMuted } }, lbl)
            )
          )
        ),
        React.createElement('div', { style:{ display:'flex', flexDirection:'column', gap:4 } },
          r.tags.map((tag,i) => React.createElement('div', { key:i, style:{ fontSize:12, color:theme.textSec, lineHeight:1.4 } }, tag))
        )
      )
    ),
    // Rain comparison bars
    React.createElement('div', { style:{ margin:'4px 16px 12px', background:theme.card, borderRadius:18, padding:16, border:`1px solid ${theme.border}` } },
      React.createElement('div', { style:{ fontSize:13, fontWeight:700, color:theme.text, marginBottom:12 } }, 'Rain Exposure Breakdown'),
      ...COMPARE_ROUTES.map(r =>
        React.createElement('div', { key:r.id, style:{ display:'flex', alignItems:'center', gap:10, marginBottom:10 } },
          React.createElement('div', { style:{ width:58, fontSize:11, color:theme.textSec, fontWeight:600, flexShrink:0 } }, r.name.replace('Via ','')),
          React.createElement('div', { style:{ flex:1, background:theme.surface2, borderRadius:6, height:14, overflow:'hidden' } },
            React.createElement('div', { style:{ width:`${r.rain}%`, height:'100%', borderRadius:6, background:r.accent, transition:'width 0.4s ease' } })
          ),
          React.createElement('div', { style:{ width:30, fontSize:12, fontWeight:700, color:r.accent, textAlign:'right', flexShrink:0 } }, `${r.rain}%`)
        )
      ),
      React.createElement('div', { style:{ marginTop:12, paddingTop:12, borderTop:`1px solid ${theme.border}` } },
        React.createElement('div', { style:{ fontSize:12, color:theme.textSec, lineHeight:1.5 } },
          '💡 ', React.createElement('strong', { style:{ color:theme.text } }, 'Recommended:'), ' Via 5th Ave saves ~32% rain exposure vs. Park Ave, adding only 2 min.'
        )
      )
    )
  );
}

// ─── Timeline Screen ──────────────────────────────────────────────────────────
function TimelineScreen({ theme }) {
  const [sel, setSel] = useState(3);
  const slot = TIMELINE[sel];
  const zoneNames = ['Main St','6th Ave','Broadway','Flatiron','Madison'];
  return React.createElement('div', { style:{ flex:1, overflowY:'auto', paddingBottom:8 } },
    React.createElement('div', { style:{ padding:'0 16px 14px' } },
      React.createElement('div', { style:{ fontSize:20, fontWeight:700, color:theme.text } }, 'Exposure Timeline'),
      React.createElement('div', { style:{ fontSize:13, color:theme.textSec, marginTop:2 } }, 'Best departure time for your route')
    ),
    // Time slot picker
    React.createElement('div', { style:{ display:'flex', gap:7, padding:'0 16px 12px', overflowX:'auto', scrollbarWidth:'none' } },
      TIMELINE.map((t,i) =>
        React.createElement('button', {
          key:i, onClick:()=>setSel(i),
          style:{ minWidth:62, padding:'10px 6px', borderRadius:16, border:sel===i?`2px solid ${theme.primary}`:`1.5px solid ${theme.border}`, background:sel===i?theme.primary:theme.card, cursor:'pointer', display:'flex', flexDirection:'column', alignItems:'center', gap:3, flexShrink:0, boxShadow:sel===i?`0 4px 14px ${theme.primary}44`:'none' }
        },
          t.best && React.createElement('div', { style:{ fontSize:7, fontWeight:800, color:sel===i?'#fff':'#10B981', letterSpacing:0.5 } }, '★ BEST'),
          React.createElement('div', { style:{ fontSize:13, fontWeight:700, color:sel===i?'#fff':theme.text } }, t.label),
          React.createElement('div', { style:{ fontSize:10, color:sel===i?'rgba(255,255,255,0.75)':theme.textMuted } }, t.time),
          React.createElement('div', { style:{ fontSize:12, fontWeight:700, color:sel===i?'#fff':(t.score>=80?'#10B981':t.score>=60?'#F59E0B':'#EF4444') } }, t.score)
        )
      )
    ),
    // Detail card
    React.createElement('div', { style:{ margin:'0 16px 12px', background:slot.best?'#10B98110':theme.card, border:`1.5px solid ${slot.best?'#10B981':theme.border}`, borderRadius:18, padding:'14px 16px' } },
      React.createElement('div', { style:{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12 } },
        React.createElement('div', {},
          React.createElement('div', { style:{ fontSize:17, fontWeight:700, color:theme.text } }, `Leave at ${slot.time}`),
          React.createElement('div', { style:{ fontSize:13, color:theme.textSec, marginTop:3, lineHeight:1.4 } }, slot.tip)
        ),
        React.createElement('div', { style:{ background:slot.score>=80?'#10B98120':slot.score>=60?'#F59E0B20':'#EF444420', borderRadius:12, padding:'8px 14px', textAlign:'center' } },
          React.createElement('div', { style:{ fontSize:17, fontWeight:800, color:slot.score>=80?'#10B981':slot.score>=60?'#F59E0B':'#EF4444' } }, slot.comfort),
          React.createElement('div', { style:{ fontSize:10, color:theme.textMuted, marginTop:2 } }, `Score: ${slot.score}/100`)
        )
      ),
      React.createElement('div', { style:{ fontSize:11, fontWeight:600, color:theme.textMuted, marginBottom:7 } }, 'BLOCK-BY-BLOCK FORECAST'),
      React.createElement('div', { style:{ display:'flex', gap:5 } },
        slot.zones.map((z,i) =>
          React.createElement('div', { key:i, style:{ flex:1, background:`${ZONE_COLORS[z]}1E`, borderRadius:10, padding:'10px 4px', textAlign:'center', border:`1px solid ${ZONE_COLORS[z]}33` } },
            React.createElement(ZoneDot, { zone:z, size:9 }),
            React.createElement('div', { style:{ fontSize:8, color:ZONE_COLORS[z], fontWeight:700, marginTop:4 } }, z.charAt(0).toUpperCase()+z.slice(1)),
            React.createElement('div', { style:{ fontSize:7, color:theme.textMuted, marginTop:2, lineHeight:1.3 } }, zoneNames[i])
          )
        )
      )
    ),
    // Overview heat-map
    React.createElement('div', { style:{ margin:'0 16px 12px', background:theme.card, borderRadius:18, padding:16, border:`1px solid ${theme.border}` } },
      React.createElement('div', { style:{ fontSize:13, fontWeight:700, color:theme.text, marginBottom:10 } }, 'All Departure Windows'),
      TIMELINE.map((t,ti) =>
        React.createElement('div', { key:ti, style:{ display:'flex', alignItems:'center', gap:8, marginBottom:7, opacity:sel===ti?1:0.6 } },
          React.createElement('div', { style:{ width:38, fontSize:11, fontWeight:600, color:theme.textSec, flexShrink:0 } }, t.label),
          React.createElement('div', { style:{ display:'flex', gap:2, flex:1 } },
            t.zones.map((z,i) =>
              React.createElement('div', { key:i, style:{ flex:1, height:18, borderRadius:5, background:ZONE_COLORS[z], opacity:0.85 } })
            )
          ),
          React.createElement('div', { style:{ width:26, fontSize:11, fontWeight:700, color:t.score>=80?'#10B981':t.score>=60?'#F59E0B':'#EF4444', textAlign:'right', flexShrink:0 } }, t.score),
          t.best && React.createElement('span', { style:{ fontSize:10, color:'#10B981', fontWeight:800 } }, '★')
        )
      )
    )
  );
}

// ─── Alerts Screen ────────────────────────────────────────────────────────────
function AlertsScreen({ theme }) {
  const [helped, setHelped] = useState([]);
  const toggle = id => setHelped(p => p.includes(id)?p.filter(x=>x!==id):[...p,id]);
  return React.createElement('div', { style:{ flex:1, overflowY:'auto', paddingBottom:8 } },
    React.createElement('div', { style:{ padding:'0 16px 12px', display:'flex', justifyContent:'space-between', alignItems:'flex-end' } },
      React.createElement('div', {},
        React.createElement('div', { style:{ fontSize:20, fontWeight:700, color:theme.text } }, 'Live Alerts'),
        React.createElement('div', { style:{ fontSize:13, color:theme.textSec, marginTop:2 } }, '5 crowd reports on your route')
      ),
      React.createElement('button', { style:{ background:theme.primary, border:'none', borderRadius:12, padding:'8px 14px', display:'flex', alignItems:'center', gap:6, cursor:'pointer' } },
        React.createElement(window.lucide.Plus, { size:14, color:'#fff' }),
        React.createElement('span', { style:{ fontSize:12, fontWeight:700, color:'#fff' } }, 'Report')
      )
    ),
    // Active condition banner
    React.createElement('div', { style:{ margin:'0 16px 12px', background:'linear-gradient(135deg,#3B82F6,#06B6D4)', borderRadius:18, padding:'14px 16px', display:'flex', gap:12, alignItems:'center' } },
      React.createElement('div', { style:{ fontSize:32, flexShrink:0 } }, '🌧'),
      React.createElement('div', {},
        React.createElement('div', { style:{ fontSize:15, fontWeight:700, color:'#fff' } }, 'Rain developing on your route'),
        React.createElement('div', { style:{ fontSize:12, color:'rgba(255,255,255,0.85)', marginTop:3, lineHeight:1.4 } }, '3 users confirmed drizzle near 6th Ave — leave in 30min to avoid it')
      )
    ),
    // Alert cards
    ...ALERTS.map(a =>
      React.createElement('div', { key:a.id, style:{ margin:'0 16px 10px', background:theme.card, border:`1px solid ${theme.border}`, borderRadius:18, padding:'14px 16px', boxShadow:theme.shadow } },
        React.createElement('div', { style:{ display:'flex', gap:10, alignItems:'flex-start', marginBottom:8 } },
          React.createElement('div', { style:{ width:40, height:40, borderRadius:12, background:`${a.accent}1E`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 } },
            React.createElement(window.lucide[a.icon]||window.lucide.AlertCircle, { size:20, color:a.accent })
          ),
          React.createElement('div', { style:{ flex:1 } },
            React.createElement('div', { style:{ display:'flex', justifyContent:'space-between', alignItems:'center' } },
              React.createElement('div', { style:{ fontSize:14, fontWeight:700, color:theme.text } }, a.title),
              React.createElement('div', { style:{ fontSize:11, color:theme.textMuted } }, a.ago)
            ),
            React.createElement('div', { style:{ fontSize:12, color:theme.textSec, marginTop:2 } }, `📍 ${a.loc}`)
          )
        ),
        React.createElement('div', { style:{ fontSize:12, color:theme.textSec, lineHeight:1.5, marginBottom:10, background:theme.surface2, borderRadius:10, padding:'8px 12px' } }, a.detail),
        React.createElement('div', { style:{ display:'flex', justifyContent:'space-between', alignItems:'center' } },
          React.createElement('div', { style:{ fontSize:11, color:theme.textMuted } }, `by ${a.by}`),
          React.createElement('button', {
            onClick:()=>toggle(a.id),
            style:{ display:'flex', alignItems:'center', gap:5, background:helped.includes(a.id)?`${a.accent}18`:theme.surface2, border:helped.includes(a.id)?`1px solid ${a.accent}`:`1px solid ${theme.border}`, borderRadius:20, padding:'5px 12px', cursor:'pointer' }
          },
            React.createElement(window.lucide.ThumbsUp, { size:12, color:helped.includes(a.id)?a.accent:theme.textMuted }),
            React.createElement('span', { style:{ fontSize:12, color:helped.includes(a.id)?a.accent:theme.textMuted, fontWeight:600 } }, helped.includes(a.id)?a.helpful+1:a.helpful)
          )
        )
      )
    )
  );
}

// ─── Settings Screen ──────────────────────────────────────────────────────────
function SettingsScreen({ theme, isDark, setIsDark }) {
  const [notifs, setNotifs] = useState(true);
  const [crowd, setCrowd] = useState(true);
  const [bike, setBike] = useState(false);
  const [units, setUnits] = useState(true);

  function Toggle({ val, onToggle, accent }) {
    return React.createElement('div', {
      onClick:onToggle,
      style:{ width:44, height:24, borderRadius:12, background:val?(accent||theme.primary):theme.border, position:'relative', cursor:'pointer', transition:'background 0.25s', flexShrink:0 }
    },
      React.createElement('div', { style:{ width:18, height:18, borderRadius:'50%', background:'#fff', position:'absolute', top:3, left:val?23:3, transition:'left 0.25s', boxShadow:'0 1px 4px rgba(0,0,0,0.2)' } })
    );
  }

  function Row({ iconName, label, sub, right }) {
    return React.createElement('div', { style:{ display:'flex', alignItems:'center', gap:12, padding:'11px 0', borderBottom:`1px solid ${theme.border}` } },
      React.createElement('div', { style:{ width:36, height:36, borderRadius:10, background:theme.surface2, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 } },
        React.createElement(window.lucide[iconName]||window.lucide.Circle, { size:18, color:theme.primary })
      ),
      React.createElement('div', { style:{ flex:1 } },
        React.createElement('div', { style:{ fontSize:14, fontWeight:600, color:theme.text } }, label),
        sub && React.createElement('div', { style:{ fontSize:11, color:theme.textMuted, marginTop:1 } }, sub)
      ),
      right
    );
  }

  function Section({ title, children }) {
    return React.createElement('div', { style:{ margin:'0 16px 12px', background:theme.card, borderRadius:18, padding:'2px 16px', border:`1px solid ${theme.border}` } },
      React.createElement('div', { style:{ fontSize:10, fontWeight:800, color:theme.textMuted, letterSpacing:1.2, padding:'12px 0 4px' } }, title),
      children
    );
  }

  return React.createElement('div', { style:{ flex:1, overflowY:'auto', paddingBottom:8 } },
    // Profile card
    React.createElement('div', { style:{ margin:'0 16px 14px', background:`linear-gradient(135deg,${theme.primary}1A,${theme.accent}0E)`, border:`1px solid ${theme.primary}2A`, borderRadius:18, padding:16, display:'flex', gap:14, alignItems:'center' } },
      React.createElement('div', { style:{ width:52, height:52, borderRadius:16, background:`linear-gradient(135deg,${theme.primary},${theme.accent})`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:24, flexShrink:0 } }, '🧭'),
      React.createElement('div', {},
        React.createElement('div', { style:{ fontSize:16, fontWeight:700, color:theme.text } }, 'Alex Chen'),
        React.createElement('div', { style:{ fontSize:13, color:theme.textSec } }, 'Daily Commuter · NYC'),
        React.createElement('div', { style:{ fontSize:11, color:theme.primary, marginTop:3, fontWeight:600 } }, '142 routes planned this month')
      )
    ),
    React.createElement(Section, { title:'APPEARANCE' },
      React.createElement(Row, { iconName:'Moon', label:'Dark Mode', sub:isDark?'Currently enabled':'Currently disabled', right:React.createElement(Toggle, { val:isDark, onToggle:()=>setIsDark(!isDark), accent:'#8B5CF6' }) })
    ),
    React.createElement(Section, { title:'NOTIFICATIONS' },
      React.createElement(Row, { iconName:'Bell', label:'Route Weather Alerts', sub:'Notify me before conditions change', right:React.createElement(Toggle, { val:notifs, onToggle:()=>setNotifs(!notifs) }) }),
      React.createElement(Row, { iconName:'Radio', label:'Live Crowd Data', sub:'Use nearby user condition reports', right:React.createElement(Toggle, { val:crowd, onToggle:()=>setCrowd(!crowd) }) })
    ),
    React.createElement(Section, { title:'ROUTE PREFERENCES' },
      React.createElement(Row, { iconName:'Bike', label:'Cyclist Mode', sub:'Optimize for bike commutes', right:React.createElement(Toggle, { val:bike, onToggle:()=>setBike(!bike) }) }),
      React.createElement(Row, { iconName:'Thermometer', label:'Temperature Units', sub:units?'Fahrenheit (°F)':'Celsius (°C)', right:React.createElement(Toggle, { val:units, onToggle:()=>setUnits(!units), accent:'#F59E0B' }) })
    ),
    React.createElement(Section, { title:'ABOUT' },
      React.createElement(Row, { iconName:'Zap', label:'DriftMap', sub:'v1.0 — Weather routes around your life', right:null }),
      React.createElement(Row, { iconName:'Globe', label:'Data Sources', sub:'NOAA · OpenWeather · User Reports', right:React.createElement(window.lucide.ChevronRight, { size:16, color:theme.textMuted }) }),
      React.createElement('div', { style:{ padding:'12px 0' } })
    )
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
function App() {
  const [activeTab, setActiveTab] = useState('route');
  const [isDark, setIsDark] = useState(false);
  const theme = isDark ? themes.dark : themes.light;

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700;800&display=swap');
      * { box-sizing: border-box; margin: 0; padding: 0; }
      ::-webkit-scrollbar { display: none; }
      body { background: #1a1a2e; }
    `;
    document.head.appendChild(style);
  }, []);

  const TABS = [
    { id:'route',    icon:'Navigation',    label:'Route'    },
    { id:'compare',  icon:'ArrowLeftRight', label:'Compare'  },
    { id:'timeline', icon:'Clock',         label:'Timeline' },
    { id:'alerts',   icon:'AlertTriangle', label:'Alerts'   },
    { id:'settings', icon:'Settings2',     label:'Settings' },
  ];

  return React.createElement('div', { style:{ minHeight:'100vh', background:'#0d1117', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'Space Grotesk', sans-serif" } },
    React.createElement('div', { style:{ width:375, height:812, background:theme.bg, borderRadius:52, overflow:'hidden', boxShadow:'0 40px 120px rgba(0,0,0,0.6), 0 0 0 10px #222, inset 0 0 0 2px rgba(255,255,255,0.08)', position:'relative', display:'flex', flexDirection:'column' } },
      // Dynamic Island
      React.createElement('div', { style:{ position:'absolute', top:12, left:'50%', transform:'translateX(-50%)', width:124, height:34, background:'#000', borderRadius:20, zIndex:100 } }),
      // Status bar
      React.createElement('div', { style:{ padding:'52px 22px 6px', display:'flex', justifyContent:'space-between', alignItems:'center', background:theme.surface } },
        React.createElement('span', { style:{ fontSize:12, fontWeight:700, color:theme.text } }, '9:41'),
        React.createElement('div', { style:{ display:'flex', gap:5, alignItems:'center' } },
          React.createElement(window.lucide.Signal, { size:13, color:theme.text }),
          React.createElement(window.lucide.Wifi, { size:13, color:theme.text }),
          React.createElement(window.lucide.Battery, { size:13, color:theme.text })
        )
      ),
      // App header
      React.createElement('div', { style:{ padding:'8px 18px 10px', display:'flex', justifyContent:'space-between', alignItems:'center', background:theme.surface, borderBottom:`1px solid ${theme.border}` } },
        React.createElement('div', { style:{ display:'flex', alignItems:'center', gap:9 } },
          React.createElement('div', { style:{ width:32, height:32, borderRadius:10, background:`linear-gradient(135deg,${theme.primary},${theme.accent})`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 } },
            React.createElement(window.lucide.Wind, { size:16, color:'#fff' })
          ),
          React.createElement('span', { style:{ fontSize:18, fontWeight:800, color:theme.text, letterSpacing:-0.5 } }, 'DriftMap')
        ),
        React.createElement('div', { style:{ display:'flex', gap:8, alignItems:'center' } },
          React.createElement('div', { style:{ background:'#10B98118', borderRadius:8, padding:'3px 9px', display:'flex', alignItems:'center', gap:4 } },
            React.createElement('div', { style:{ width:6, height:6, borderRadius:'50%', background:'#10B981' } }),
            React.createElement('span', { style:{ fontSize:11, color:'#10B981', fontWeight:700 } }, 'LIVE')
          ),
          React.createElement('button', { onClick:()=>setIsDark(!isDark), style:{ background:'none', border:'none', cursor:'pointer', padding:4, display:'flex', alignItems:'center' } },
            React.createElement(window.lucide[isDark?'Sun':'Moon'], { size:18, color:theme.textSec })
          )
        )
      ),
      // Screen content
      React.createElement('div', { style:{ flex:1, overflowY:'auto', display:'flex', flexDirection:'column', minHeight:0 } },
        activeTab === 'route'    && React.createElement(RouteScreen,    { theme }),
        activeTab === 'compare'  && React.createElement(CompareScreen,  { theme }),
        activeTab === 'timeline' && React.createElement(TimelineScreen, { theme }),
        activeTab === 'alerts'   && React.createElement(AlertsScreen,   { theme }),
        activeTab === 'settings' && React.createElement(SettingsScreen, { theme, isDark, setIsDark })
      ),
      // Bottom Navigation
      React.createElement('div', { style:{ display:'flex', flexDirection:'row', justifyContent:'space-around', alignItems:'center', padding:'8px 0 18px', background:theme.navBg, borderTop:`1px solid ${theme.navBorder}` } },
        React.createElement('button', { onClick:()=>setActiveTab('route'), style:{ background:'none', border:'none', display:'flex', flexDirection:'column', alignItems:'center', gap:3, cursor:'pointer', padding:'4px 8px', borderRadius:12 } },
          React.createElement('div', { style:{ width:34, height:28, borderRadius:9, background:activeTab==='route'?`${theme.primary}1E`:'transparent', display:'flex', alignItems:'center', justifyContent:'center' } },
            React.createElement(window.lucide.Navigation, { size:19, color:activeTab==='route'?theme.primary:theme.textMuted })
          ),
          React.createElement('span', { style:{ fontSize:10, color:activeTab==='route'?theme.primary:theme.textMuted, fontWeight:activeTab==='route'?700:400 } }, 'Route')
        ),
        React.createElement('button', { onClick:()=>setActiveTab('compare'), style:{ background:'none', border:'none', display:'flex', flexDirection:'column', alignItems:'center', gap:3, cursor:'pointer', padding:'4px 8px', borderRadius:12 } },
          React.createElement('div', { style:{ width:34, height:28, borderRadius:9, background:activeTab==='compare'?`${theme.primary}1E`:'transparent', display:'flex', alignItems:'center', justifyContent:'center' } },
            React.createElement(window.lucide.ArrowLeftRight, { size:19, color:activeTab==='compare'?theme.primary:theme.textMuted })
          ),
          React.createElement('span', { style:{ fontSize:10, color:activeTab==='compare'?theme.primary:theme.textMuted, fontWeight:activeTab==='compare'?700:400 } }, 'Compare')
        ),
        React.createElement('button', { onClick:()=>setActiveTab('timeline'), style:{ background:'none', border:'none', display:'flex', flexDirection:'column', alignItems:'center', gap:3, cursor:'pointer', padding:'4px 8px', borderRadius:12 } },
          React.createElement('div', { style:{ width:34, height:28, borderRadius:9, background:activeTab==='timeline'?`${theme.primary}1E`:'transparent', display:'flex', alignItems:'center', justifyContent:'center' } },
            React.createElement(window.lucide.Clock, { size:19, color:activeTab==='timeline'?theme.primary:theme.textMuted })
          ),
          React.createElement('span', { style:{ fontSize:10, color:activeTab==='timeline'?theme.primary:theme.textMuted, fontWeight:activeTab==='timeline'?700:400 } }, 'Timeline')
        ),
        React.createElement('button', { onClick:()=>setActiveTab('alerts'), style:{ background:'none', border:'none', display:'flex', flexDirection:'column', alignItems:'center', gap:3, cursor:'pointer', padding:'4px 8px', borderRadius:12 } },
          React.createElement('div', { style:{ width:34, height:28, borderRadius:9, background:activeTab==='alerts'?`${theme.primary}1E`:'transparent', display:'flex', alignItems:'center', justifyContent:'center' } },
            React.createElement(window.lucide.AlertTriangle, { size:19, color:activeTab==='alerts'?theme.primary:theme.textMuted })
          ),
          React.createElement('span', { style:{ fontSize:10, color:activeTab==='alerts'?theme.primary:theme.textMuted, fontWeight:activeTab==='alerts'?700:400 } }, 'Alerts')
        ),
        React.createElement('button', { onClick:()=>setActiveTab('settings'), style:{ background:'none', border:'none', display:'flex', flexDirection:'column', alignItems:'center', gap:3, cursor:'pointer', padding:'4px 8px', borderRadius:12 } },
          React.createElement('div', { style:{ width:34, height:28, borderRadius:9, background:activeTab==='settings'?`${theme.primary}1E`:'transparent', display:'flex', alignItems:'center', justifyContent:'center' } },
            React.createElement(window.lucide.Settings, { size:19, color:activeTab==='settings'?theme.primary:theme.textMuted })
          ),
          React.createElement('span', { style:{ fontSize:10, color:activeTab==='settings'?theme.primary:theme.textMuted, fontWeight:activeTab==='settings'?700:400 } }, 'Settings')
        )
      )
    )
  );
}
