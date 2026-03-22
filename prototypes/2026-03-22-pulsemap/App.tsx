function App() {
  const { useState, useEffect, useRef } = React;

  const themes = {
    dark: {
      bg: '#080C18',
      surface: '#0E1628',
      card: '#111E35',
      cardAlt: '#162545',
      cardBorder: '#1E3055',
      text: '#EEF4FF',
      textSec: '#7A96BE',
      textMuted: '#3D5270',
      primary: '#00D4FF',
      primaryGlow: 'rgba(0,212,255,0.12)',
      primaryDeep: 'rgba(0,212,255,0.08)',
      secondary: '#8B5CF6',
      accent: '#FF5C8A',
      success: '#00D4A0',
      warning: '#FFB347',
      navBg: '#070B16',
      navBorder: '#111E35',
    },
    light: {
      bg: '#EDF2FF',
      surface: '#FFFFFF',
      card: '#FFFFFF',
      cardAlt: '#F4F7FF',
      cardBorder: '#D4E0FF',
      text: '#0A1530',
      textSec: '#4A6280',
      textMuted: '#8FA3C8',
      primary: '#0095CC',
      primaryGlow: 'rgba(0,149,204,0.10)',
      primaryDeep: 'rgba(0,149,204,0.06)',
      secondary: '#7C3AED',
      accent: '#E8335A',
      success: '#00A878',
      warning: '#CC7000',
      navBg: '#FFFFFF',
      navBorder: '#E0EAFF',
    },
  };

  const [activeTab, setActiveTab] = useState('home');
  const [isDark, setIsDark] = useState(true);
  const t = isDark ? themes.dark : themes.light;

  const newsItems = [
    {
      id: 1, category: 'Transit', categoryColor: '#FF5C8A', icon: 'Train',
      relevance: 96, time: '7 min ago',
      headline: 'MTA Strike: Lines 2, 3 & B suspended until further notice',
      brief: 'Your morning commute via Line 2 is directly affected. Alternative: Line 1 running on reduced schedule. Expect 35–40 min added travel time.',
      action: 'Reroute Now', tag: 'YOUR COMMUTE', distance: '0.3 mi from your route',
    },
    {
      id: 2, category: 'Weather', categoryColor: '#00D4FF', icon: 'CloudRain',
      relevance: 88, time: '12 min ago',
      headline: 'Severe storm warning: Downtown through Midtown until 3 PM',
      brief: 'Storm approaching your neighborhood from the south. Peak intensity 9–11 AM near Chelsea. Your evening commute home should be clear by 6 PM.',
      action: 'Track Storm', tag: 'YOUR AREA', distance: '1.2 mi from home',
    },
    {
      id: 3, category: 'Education', categoryColor: '#8B5CF6', icon: 'School',
      relevance: 74, time: '2 hr ago',
      headline: 'School board cuts lunch subsidies at 14 district schools',
      brief: "Riverside Elementary (your child's school) is on the affected list. New policy starts April 1. Forms required by March 28 to maintain eligibility.",
      action: 'Learn More', tag: "YOUR SCHOOL", distance: 'Riverside Elementary',
    },
    {
      id: 4, category: 'Traffic', categoryColor: '#FFB347', icon: 'Car',
      relevance: 61, time: '34 min ago',
      headline: 'Highway 101 N closure at Exit 42B through Friday 6 PM',
      brief: 'Your saved route uses this exit. Add 18 min via alternate route or use Hwy 280 detour through South San Francisco.',
      action: 'Detour Map', tag: 'YOUR ROUTE', distance: '2.1 mi from exit',
    },
  ];

  const alertsData = [
    { id: 1, icon: 'Train', color: '#FF5C8A', title: 'Transit Strike Active', desc: 'Lines 2, 3, B suspended. Your 8:15 AM commute is affected.', time: '7 min ago', active: true },
    { id: 2, icon: 'CloudRain', color: '#00D4FF', title: 'Storm Warning — Your Area', desc: 'Severe weather approaching Chelsea. Peak 9–11 AM.', time: '12 min ago', active: true },
    { id: 3, icon: 'School', color: '#8B5CF6', title: 'School Policy Change', desc: 'Riverside Elementary lunch subsidy ends April 1.', time: '2 hr ago', active: false },
    { id: 4, icon: 'TrendingUp', color: '#00D4A0', title: 'Federal Reserve Rate Decision', desc: 'Rates unchanged. Your variable mortgage stays the same this month.', time: '4 hr ago', active: false },
  ];

  const trackedStories = [
    {
      id: 1, title: 'MTA Transit Workers Strike', category: 'Transit', color: '#FF5C8A',
      started: 'Mar 20', lastUpdate: '7 min ago', status: 'ongoing', relevance: 'HIGH',
      milestones: [
        { date: 'Mar 20 6:00 PM', text: 'Strike vote passed 87% of members', done: true },
        { date: 'Mar 21 8:00 AM', text: 'Service suspended on Lines 2, 3, B', done: true },
        { date: 'Mar 21 4:00 PM', text: 'Emergency negotiations began', done: true },
        { date: 'Mar 22 7:00 AM', text: 'Talks continuing — no agreement yet', done: true },
        { date: 'Today 10:00 AM', text: 'New negotiation session scheduled', done: false },
        { date: 'TBD', text: 'Resolution or extended strike decision', done: false },
      ],
    },
    {
      id: 2, title: 'Downtown Storm System', category: 'Weather', color: '#00D4FF',
      started: 'Mar 22', lastUpdate: '12 min ago', status: 'developing', relevance: 'HIGH',
      milestones: [
        { date: 'Mar 22 6:15 AM', text: 'System formed 40 miles offshore', done: true },
        { date: 'Mar 22 7:00 AM', text: 'Warning issued for metro area', done: true },
        { date: 'Mar 22 9:00 AM', text: 'Peak intensity expected downtown', done: false },
        { date: 'Mar 22 3:00 PM', text: 'System exits region — all clear', done: false },
      ],
    },
    {
      id: 3, title: 'School District Budget Cuts', category: 'Education', color: '#8B5CF6',
      started: 'Mar 15', lastUpdate: '2 hr ago', status: 'resolved', relevance: 'MEDIUM',
      milestones: [
        { date: 'Mar 15', text: 'Proposed cuts announced publicly', done: true },
        { date: 'Mar 18', text: 'Public comment period opened', done: true },
        { date: 'Mar 21', text: 'Board vote: cuts approved 5–2', done: true },
        { date: 'Apr 1', text: 'New lunch policy takes effect', done: false },
      ],
    },
  ];

  // ── StatusBar ──────────────────────────────────────────────────────────────
  const StatusBar = () => (
    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'14px 22px 0', color: t.text, fontSize:12, fontWeight:600 }}>
      <span>9:41</span>
      <div style={{ display:'flex', gap:5, alignItems:'center' }}>
        {React.createElement(window.lucide.Signal, { size:14, color: t.text })}
        {React.createElement(window.lucide.Wifi, { size:14, color: t.text })}
        {React.createElement(window.lucide.Battery, { size:14, color: t.text })}
      </div>
    </div>
  );

  // ── RelevanceBar ───────────────────────────────────────────────────────────
  const RelevanceBar = ({ score, color }) => (
    <div style={{ display:'flex', alignItems:'center', gap:5 }}>
      <div style={{ width:56, height:4, background: isDark ? '#1E3055' : '#D4E0FF', borderRadius:2, overflow:'hidden' }}>
        <div style={{ width:`${score}%`, height:'100%', background: color, borderRadius:2 }} />
      </div>
      <span style={{ fontSize:11, color: color, fontWeight:700 }}>{score}%</span>
    </div>
  );

  // ── Toggle ────────────────────────────────────────────────────────────────
  const Toggle = ({ on, onToggle }) => (
    <button onClick={onToggle} style={{ width:44, height:24, borderRadius:12, background: on ? t.primary : (isDark ? '#1E3055' : '#C8D8F0'), border:'none', cursor:'pointer', position:'relative', transition:'background 0.25s', flexShrink:0 }}>
      <div style={{ width:18, height:18, borderRadius:'50%', background:'#fff', position:'absolute', top:3, left: on ? 23 : 3, transition:'left 0.25s', boxShadow:'0 1px 3px rgba(0,0,0,0.3)' }} />
    </button>
  );

  // ── HomeScreen ────────────────────────────────────────────────────────────
  const HomeScreen = () => {
    const [expandedId, setExpandedId] = useState(null);
    return (
      <div style={{ flex:1, overflowY:'auto', paddingBottom:8 }}>
        {/* Header */}
        <div style={{ padding:'10px 20px 14px' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
            <div>
              <div style={{ fontSize:11, color: t.textMuted, fontWeight:600, letterSpacing:'0.08em', marginBottom:3 }}>MONDAY, MARCH 22</div>
              <div style={{ fontSize:22, fontWeight:700, color: t.text, lineHeight:1.2 }}>Good morning, Sarah</div>
            </div>
            <div style={{ width:38, height:38, borderRadius:'50%', background:`linear-gradient(135deg, ${t.primary}, ${t.secondary})`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:16, fontWeight:700, color:'#fff', flexShrink:0 }}>S</div>
          </div>
          {/* Pulse score banner */}
          <div style={{ marginTop:14, padding:'11px 14px', background: t.primaryDeep, borderRadius:12, border:`1px solid ${t.primary}33`, display:'flex', alignItems:'center', gap:10 }}>
            {React.createElement(window.lucide.Activity, { size:18, color: t.primary })}
            <div>
              <div style={{ fontSize:13, fontWeight:600, color: t.primary }}>4 stories affect your day right now</div>
              <div style={{ fontSize:11, color: t.textSec, marginTop:1 }}>Commute impacted · Storm approaching · 2 more</div>
            </div>
          </div>
        </div>

        <div style={{ padding:'0 20px 8px', fontSize:11, fontWeight:700, color: t.textMuted, letterSpacing:'0.08em' }}>YOUR PULSE FEED</div>

        {/* News cards */}
        <div style={{ padding:'0 14px', display:'flex', flexDirection:'column', gap:10 }}>
          {newsItems.map(item => (
            <div key={item.id} onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
              style={{ background: t.card, border:`1px solid ${t.cardBorder}`, borderRadius:16, padding:'13px 14px', cursor:'pointer', borderLeft:`3px solid ${item.categoryColor}`, transition:'transform 0.15s', transform: expandedId === item.id ? 'scale(1.005)' : 'scale(1)' }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:8 }}>
                <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                  <div style={{ width:32, height:32, borderRadius:8, background:`${item.categoryColor}20`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                    {React.createElement(window.lucide[item.icon] || window.lucide.FileText, { size:16, color: item.categoryColor })}
                  </div>
                  <div>
                    <div style={{ fontSize:10, fontWeight:700, color: item.categoryColor, letterSpacing:'0.05em' }}>{item.tag}</div>
                    <div style={{ fontSize:10, color: t.textMuted }}>{item.distance}</div>
                  </div>
                </div>
                <div style={{ textAlign:'right', flexShrink:0 }}>
                  <RelevanceBar score={item.relevance} color={item.categoryColor} />
                  <div style={{ fontSize:10, color: t.textMuted, marginTop:2 }}>{item.time}</div>
                </div>
              </div>
              <div style={{ fontSize:14, fontWeight:600, color: t.text, lineHeight:1.4, marginBottom: expandedId === item.id ? 10 : 0 }}>{item.headline}</div>

              {expandedId === item.id && (
                <div>
                  <div style={{ fontSize:12, color: t.textSec, lineHeight:1.5, padding:'10px 12px', background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)', borderRadius:10, marginBottom:10, borderLeft:`2px solid ${item.categoryColor}66` }}>
                    <strong style={{ display:'block', fontSize:10, fontWeight:700, color: t.textMuted, letterSpacing:'0.07em', marginBottom:4 }}>WHAT THIS MEANS FOR YOU</strong>
                    {item.brief}
                  </div>
                  <button style={{ background:`${item.categoryColor}18`, border:`1px solid ${item.categoryColor}55`, borderRadius:8, padding:'7px 14px', fontSize:12, fontWeight:600, color: item.categoryColor, cursor:'pointer', fontFamily:'Space Grotesk, sans-serif' }}>
                    {item.action} →
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Lower relevance divider */}
        <div style={{ padding:'14px 20px 8px', display:'flex', alignItems:'center', gap:8 }}>
          <div style={{ flex:1, height:1, background: t.cardBorder }} />
          <span style={{ fontSize:11, color: t.textMuted, fontWeight:500, whiteSpace:'nowrap' }}>Lower relevance</span>
          <div style={{ flex:1, height:1, background: t.cardBorder }} />
        </div>
        <div style={{ padding:'0 14px', display:'flex', flexDirection:'column', gap:8 }}>
          {[
            { headline:'City council approves $4M new bike lane expansion', time:'1 hr ago', cat:'City', color:'#00D4A0' },
            { headline:'Regional unemployment holds at 3.8%, near record low', time:'3 hr ago', cat:'Economy', color:'#FFB347' },
            { headline:'FDA approves new flu vaccine formula for fall season', time:'5 hr ago', cat:'Health', color:'#FF8C69' },
          ].map((item, i) => (
            <div key={i} style={{ padding:'10px 14px', background: t.card, border:`1px solid ${t.cardBorder}`, borderRadius:12, display:'flex', alignItems:'center', gap:8, justifyContent:'space-between' }}>
              <div style={{ flex:1 }}>
                <span style={{ fontSize:10, fontWeight:700, color: item.color, marginRight:6 }}>{item.cat}</span>
                <span style={{ fontSize:12, color: t.textSec }}>{item.headline}</span>
              </div>
              <span style={{ fontSize:10, color: t.textMuted, flexShrink:0 }}>{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ── MapScreen ─────────────────────────────────────────────────────────────
  const MapScreen = () => {
    const [selectedPin, setSelectedPin] = useState(null);
    const mapEvents = [
      { id:1, x:50, y:36, color:'#FF5C8A', label:'Transit Strike', icon:'Train', detail:'Lines 2, 3, B suspended' },
      { id:2, x:65, y:52, color:'#00D4FF', label:'Storm Warning', icon:'CloudRain', detail:'Approaching from south' },
      { id:3, x:33, y:67, color:'#8B5CF6', label:'School Board', icon:'School', detail:'Riverside Elementary' },
      { id:4, x:78, y:43, color:'#FFB347', label:'Hwy 101 Closure', icon:'Car', detail:'Exit 42B blocked until Fri' },
    ];
    const userX = 188, userY = 162;

    return (
      <div style={{ flex:1, overflowY:'auto' }}>
        <div style={{ padding:'10px 20px 12px' }}>
          <div style={{ fontSize:20, fontWeight:700, color: t.text }}>News Map</div>
          <div style={{ fontSize:13, color: t.textSec, marginTop:2 }}>Stories near your daily routes</div>
        </div>

        {/* Map */}
        <div style={{ margin:'0 14px', borderRadius:16, overflow:'hidden', border:`1px solid ${t.cardBorder}`, position:'relative', height:280, background: isDark ? '#09122A' : '#E4EEFF' }}>
          <svg width="100%" height="100%" viewBox="0 0 375 280" style={{ position:'absolute', top:0, left:0 }}>
            <defs>
              <pattern id="citygrid" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
                <line x1="30" y1="0" x2="30" y2="30" stroke={isDark ? '#162040' : '#C8D8F8'} strokeWidth="0.5"/>
                <line x1="0" y1="30" x2="30" y2="30" stroke={isDark ? '#162040' : '#C8D8F8'} strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="375" height="280" fill="url(#citygrid)"/>

            {/* City blocks */}
            {[[18,18,75,55],[115,12,85,48],[230,18,80,52],[18,98,95,48],[148,88,78,58],[258,82,88,52],[18,176,115,68],[162,168,88,58],[285,172,68,68]].map(([x,y,w,h],i) => (
              <rect key={i} x={x} y={y} width={w} height={h} fill={isDark ? '#0D1A30' : '#D0E0FF'} rx="3"/>
            ))}

            {/* Roads */}
            <line x1="0" y1="92" x2="375" y2="92" stroke={isDark ? '#1A2E50' : '#A8C0E8'} strokeWidth="3"/>
            <line x1="0" y1="162" x2="375" y2="162" stroke={isDark ? '#1A2E50' : '#A8C0E8'} strokeWidth="3"/>
            <line x1="110" y1="0" x2="110" y2="280" stroke={isDark ? '#1A2E50' : '#A8C0E8'} strokeWidth="3"/>
            <line x1="228" y1="0" x2="228" y2="280" stroke={isDark ? '#1A2E50' : '#A8C0E8'} strokeWidth="3"/>

            {/* Highway */}
            <line x1="0" y1="127" x2="375" y2="127" stroke={isDark ? '#2A4570' : '#8AAAE0'} strokeWidth="7"/>
            <line x1="0" y1="127" x2="375" y2="127" stroke={isDark ? '#0E1C38' : '#B0C8F0'} strokeWidth="3" strokeDasharray="22,12"/>

            {/* Storm radius */}
            <ellipse cx="244" cy="146" rx="65" ry="48" fill="#00D4FF0D" stroke="#00D4FF33" strokeWidth="1.5" strokeDasharray="5,4"/>
            <ellipse cx="244" cy="146" rx="38" ry="28" fill="#00D4FF08" stroke="#00D4FF22" strokeWidth="1"/>

            {/* Your route highlight */}
            <line x1="0" y1="162" x2="188" y2="162" stroke="#FF5C8A" strokeWidth="2.5" strokeDasharray="8,5" opacity="0.6"/>

            {/* Event pins */}
            {mapEvents.map(ev => {
              const px = ev.x * 3.75, py = ev.y * 2.8;
              return (
                <g key={ev.id} onClick={() => setSelectedPin(selectedPin === ev.id ? null : ev.id)} style={{ cursor:'pointer' }}>
                  {selectedPin === ev.id && <circle cx={px} cy={py} r="22" fill={`${ev.color}18`}/>}
                  <circle cx={px} cy={py} r="11" fill={`${ev.color}CC`} stroke={ev.color} strokeWidth="1.5"/>
                  <text x={px} y={py+4} textAnchor="middle" fontSize="9" fill="white" fontWeight="700" fontFamily="Space Grotesk">{ev.id}</text>
                </g>
              );
            })}

            {/* User pin */}
            <circle cx={userX} cy={userY} r="16" fill="#00D4FF18"/>
            <circle cx={userX} cy={userY} r="8" fill="#00D4FF"/>
            <circle cx={userX} cy={userY} r="4" fill="#fff"/>
            <text x={userX} y={userY - 20} textAnchor="middle" fontSize="9" fill="#00D4FF" fontWeight="700" fontFamily="Space Grotesk">YOU</text>
          </svg>

          {/* Legend chips */}
          <div style={{ position:'absolute', top:8, left:8, display:'flex', gap:5, flexWrap:'wrap', maxWidth:'90%' }}>
            {mapEvents.map(ev => (
              <div key={ev.id} onClick={() => setSelectedPin(selectedPin === ev.id ? null : ev.id)} style={{ background: isDark ? 'rgba(7,11,22,0.85)' : 'rgba(240,247,255,0.9)', border:`1px solid ${ev.color}55`, borderRadius:20, padding:'3px 8px', fontSize:10, fontWeight:600, color: ev.color, display:'flex', alignItems:'center', gap:4, cursor:'pointer', backdropFilter:'blur(4px)' }}>
                <span style={{ width:14, height:14, borderRadius:'50%', background: ev.color, display:'inline-flex', alignItems:'center', justifyContent:'center', color:'#fff', fontSize:9, fontWeight:700 }}>{ev.id}</span>
                {ev.label}
              </div>
            ))}
          </div>

          {/* Popup */}
          {selectedPin && (() => {
            const ev = mapEvents.find(e => e.id === selectedPin);
            return (
              <div style={{ position:'absolute', bottom:8, left:8, right:8, background: isDark ? 'rgba(8,12,24,0.93)' : 'rgba(255,255,255,0.95)', borderRadius:12, padding:'10px 13px', border:`1px solid ${ev.color}55`, backdropFilter:'blur(12px)', display:'flex', alignItems:'center', gap:10 }}>
                <div style={{ width:36, height:36, borderRadius:10, background:`${ev.color}20`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                  {React.createElement(window.lucide[ev.icon] || window.lucide.MapPin, { size:18, color: ev.color })}
                </div>
                <div>
                  <div style={{ fontSize:13, fontWeight:600, color: t.text }}>{ev.label}</div>
                  <div style={{ fontSize:11, color: t.textSec }}>{ev.detail}</div>
                </div>
                <button onClick={(e) => { e.stopPropagation(); setSelectedPin(null); }} style={{ marginLeft:'auto', background:'none', border:'none', cursor:'pointer', color: t.textMuted, padding:4 }}>
                  {React.createElement(window.lucide.X, { size:16, color: t.textMuted })}
                </button>
              </div>
            );
          })()}
        </div>

        {/* Nearby list */}
        <div style={{ padding:'14px 14px 8px' }}>
          <div style={{ fontSize:11, fontWeight:700, color: t.textMuted, letterSpacing:'0.08em', marginBottom:10 }}>EVENTS NEAR YOUR ROUTES</div>
          {mapEvents.map(ev => (
            <div key={ev.id} onClick={() => setSelectedPin(ev.id)} style={{ display:'flex', alignItems:'center', gap:12, padding:'10px 13px', background: t.card, border:`1px solid ${t.cardBorder}`, borderRadius:12, marginBottom:8, cursor:'pointer' }}>
              <div style={{ width:30, height:30, borderRadius:8, background:`${ev.color}20`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                {React.createElement(window.lucide[ev.icon] || window.lucide.MapPin, { size:15, color: ev.color })}
              </div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:13, fontWeight:600, color: t.text }}>{ev.label}</div>
                <div style={{ fontSize:11, color: t.textSec }}>{ev.detail}</div>
              </div>
              {React.createElement(window.lucide.ChevronRight, { size:16, color: t.textMuted })}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ── AlertsScreen ──────────────────────────────────────────────────────────
  const AlertsScreen = () => {
    const [toggles, setToggles] = useState({ transit:true, weather:true, education:true, traffic:true, economy:false });
    const toggle = (k) => setToggles(p => ({ ...p, [k]: !p[k] }));

    return (
      <div style={{ flex:1, overflowY:'auto' }}>
        <div style={{ padding:'10px 20px 14px' }}>
          <div style={{ fontSize:20, fontWeight:700, color: t.text }}>Alerts</div>
          <div style={{ fontSize:13, color: t.textSec, marginTop:2 }}>Time-sensitive updates for your life</div>
        </div>

        {/* Active */}
        <div style={{ padding:'0 14px 14px' }}>
          <div style={{ fontSize:11, fontWeight:700, color: t.textMuted, letterSpacing:'0.08em', marginBottom:10 }}>ACTIVE NOW</div>
          {alertsData.filter(a => a.active).map(al => (
            <div key={al.id} style={{ background: t.card, border:`1px solid ${al.color}44`, borderLeft:`3px solid ${al.color}`, borderRadius:12, padding:'12px 13px', marginBottom:10, display:'flex', gap:12, alignItems:'flex-start' }}>
              <div style={{ width:36, height:36, borderRadius:10, background:`${al.color}20`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                {React.createElement(window.lucide[al.icon] || window.lucide.Bell, { size:18, color: al.color })}
              </div>
              <div style={{ flex:1 }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:3 }}>
                  <div style={{ fontSize:13, fontWeight:600, color: t.text }}>{al.title}</div>
                  <span style={{ fontSize:9, fontWeight:700, color: al.color, background:`${al.color}20`, padding:'2px 7px', borderRadius:20, letterSpacing:'0.06em' }}>● LIVE</span>
                </div>
                <div style={{ fontSize:12, color: t.textSec, lineHeight:1.4 }}>{al.desc}</div>
                <div style={{ fontSize:10, color: t.textMuted, marginTop:5 }}>{al.time}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent */}
        <div style={{ padding:'0 14px 14px' }}>
          <div style={{ fontSize:11, fontWeight:700, color: t.textMuted, letterSpacing:'0.08em', marginBottom:10 }}>RECENT</div>
          {alertsData.filter(a => !a.active).map(al => (
            <div key={al.id} style={{ background: t.card, border:`1px solid ${t.cardBorder}`, borderRadius:12, padding:'10px 13px', marginBottom:8, display:'flex', gap:10, alignItems:'center', opacity:0.65 }}>
              <div style={{ width:30, height:30, borderRadius:8, background:`${al.color}15`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                {React.createElement(window.lucide[al.icon] || window.lucide.Bell, { size:14, color: al.color })}
              </div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:12, fontWeight:600, color: t.textSec }}>{al.title}</div>
                <div style={{ fontSize:11, color: t.textMuted, marginTop:1 }}>{al.time}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Categories */}
        <div style={{ padding:'0 14px 16px' }}>
          <div style={{ fontSize:11, fontWeight:700, color: t.textMuted, letterSpacing:'0.08em', marginBottom:10 }}>ALERT CATEGORIES</div>
          {[
            { key:'transit', label:'Transit & Commute', icon:'Train', color:'#FF5C8A' },
            { key:'weather', label:'Weather & Environment', icon:'CloudRain', color:'#00D4FF' },
            { key:'education', label:'Education & Schools', icon:'School', color:'#8B5CF6' },
            { key:'traffic', label:'Traffic & Roads', icon:'Car', color:'#FFB347' },
            { key:'economy', label:'Economy & Finance', icon:'TrendingUp', color:'#00D4A0' },
          ].map(cat => (
            <div key={cat.key} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'11px 13px', background: t.card, border:`1px solid ${t.cardBorder}`, borderRadius:12, marginBottom:8 }}>
              <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                <div style={{ width:30, height:30, borderRadius:8, background:`${cat.color}20`, display:'flex', alignItems:'center', justifyContent:'center' }}>
                  {React.createElement(window.lucide[cat.icon] || window.lucide.Bell, { size:14, color: cat.color })}
                </div>
                <span style={{ fontSize:13, fontWeight:500, color: t.text }}>{cat.label}</span>
              </div>
              <Toggle on={toggles[cat.key]} onToggle={() => toggle(cat.key)} />
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ── TrackerScreen ──────────────────────────────────────────────────────────
  const TrackerScreen = () => {
    const [expanded, setExpanded] = useState(1);
    return (
      <div style={{ flex:1, overflowY:'auto' }}>
        <div style={{ padding:'10px 20px 14px' }}>
          <div style={{ fontSize:20, fontWeight:700, color: t.text }}>Story Tracker</div>
          <div style={{ fontSize:13, color: t.textSec, marginTop:2 }}>Stay updated without rereading</div>
        </div>
        <div style={{ padding:'0 14px 16px' }}>
          {trackedStories.map(story => {
            const isOpen = expanded === story.id;
            const doneMilestones = story.milestones.filter(m => m.done).length;
            const progress = Math.round(doneMilestones / story.milestones.length * 100);
            return (
              <div key={story.id} style={{ background: t.card, border:`1px solid ${t.cardBorder}`, borderRadius:16, marginBottom:14, overflow:'hidden' }}>
                <div onClick={() => setExpanded(isOpen ? null : story.id)} style={{ padding:'13px 15px', cursor:'pointer', borderLeft:`3px solid ${story.color}` }}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
                    <div style={{ flex:1 }}>
                      <div style={{ display:'flex', gap:6, marginBottom:6, flexWrap:'wrap' }}>
                        <span style={{ fontSize:10, fontWeight:700, color: story.color, background:`${story.color}20`, padding:'2px 8px', borderRadius:20, letterSpacing:'0.05em' }}>{story.category.toUpperCase()}</span>
                        <span style={{ fontSize:10, fontWeight:700, color: story.relevance === 'HIGH' ? t.accent : t.warning, background: story.relevance === 'HIGH' ? `${t.accent}20` : `${t.warning}20`, padding:'2px 8px', borderRadius:20 }}>{story.relevance}</span>
                        {story.status === 'ongoing' && <span style={{ fontSize:9, fontWeight:700, color:'#FF5C8A', background:'#FF5C8A20', padding:'2px 8px', borderRadius:20 }}>● LIVE</span>}
                        {story.status === 'resolved' && <span style={{ fontSize:9, fontWeight:700, color:'#00D4A0', background:'#00D4A020', padding:'2px 8px', borderRadius:20 }}>RESOLVED</span>}
                      </div>
                      <div style={{ fontSize:14, fontWeight:600, color: t.text, lineHeight:1.3 }}>{story.title}</div>
                      <div style={{ marginTop:8, display:'flex', alignItems:'center', gap:8 }}>
                        <div style={{ flex:1, height:3, background: isDark ? '#1E3055' : '#D4E0FF', borderRadius:2, overflow:'hidden' }}>
                          <div style={{ width:`${progress}%`, height:'100%', background: story.color, borderRadius:2 }} />
                        </div>
                        <span style={{ fontSize:10, color: t.textMuted, flexShrink:0 }}>{doneMilestones}/{story.milestones.length} updates</span>
                      </div>
                      <div style={{ fontSize:10, color: t.textMuted, marginTop:4 }}>Started {story.started} · Updated {story.lastUpdate}</div>
                    </div>
                    <div style={{ transform: isOpen ? 'rotate(90deg)' : 'none', transition:'transform 0.2s', marginLeft:8 }}>
                      {React.createElement(window.lucide.ChevronRight, { size:18, color: t.textMuted })}
                    </div>
                  </div>
                </div>

                {isOpen && (
                  <div style={{ padding:'4px 16px 16px', borderTop:`1px solid ${t.cardBorder}` }}>
                    <div style={{ paddingTop:12, borderLeft:`2px solid ${t.cardBorder}`, marginLeft:8, paddingLeft:18 }}>
                      {story.milestones.map((m, i) => (
                        <div key={i} style={{ position:'relative', marginBottom: i < story.milestones.length - 1 ? 14 : 0 }}>
                          <div style={{ position:'absolute', left:-26, top:3, width:12, height:12, borderRadius:'50%', background: m.done ? story.color : (isDark ? '#1E3055' : '#C8D8F0'), border: m.done ? 'none' : `2px solid ${isDark ? '#2A4070' : '#A8C0E0'}`, display:'flex', alignItems:'center', justifyContent:'center' }}>
                            {m.done && <div style={{ width:5, height:5, borderRadius:'50%', background:'#fff' }}/>}
                          </div>
                          <div style={{ fontSize:10, color: t.textMuted, fontWeight:500, marginBottom:2 }}>{m.date}</div>
                          <div style={{ fontSize:13, color: m.done ? t.text : t.textSec, fontWeight: m.done ? 500 : 400, opacity: m.done ? 1 : 0.55 }}>{m.text}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {/* Add story prompt */}
          <div style={{ padding:'14px', background: t.primaryDeep, border:`1px dashed ${t.primary}44`, borderRadius:14, display:'flex', alignItems:'center', gap:10, cursor:'pointer' }}>
            {React.createElement(window.lucide.Plus, { size:18, color: t.primary })}
            <div>
              <div style={{ fontSize:13, fontWeight:600, color: t.primary }}>Track a new story</div>
              <div style={{ fontSize:11, color: t.textSec, marginTop:1 }}>Search for any ongoing news story</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ── SettingsScreen ─────────────────────────────────────────────────────────
  const SettingsScreen = () => {
    const [topicsActive, setTopicsActive] = useState({ Transit:true, Weather:true, Education:true, Traffic:true, Economy:false, Health:false, Politics:false, Crime:false });
    const toggleTopic = (k) => setTopicsActive(p => ({ ...p, [k]: !p[k] }));
    const topicColors = { Transit:'#FF5C8A', Weather:'#00D4FF', Education:'#8B5CF6', Traffic:'#FFB347', Economy:'#00D4A0', Health:'#FF8C69', Politics:'#6B9FFF', Crime:'#FF6060' };

    return (
      <div style={{ flex:1, overflowY:'auto' }}>
        <div style={{ padding:'10px 20px 16px' }}>
          <div style={{ fontSize:20, fontWeight:700, color: t.text }}>Settings</div>

          {/* Profile */}
          <div style={{ marginTop:14, padding:'14px', background: t.card, border:`1px solid ${t.cardBorder}`, borderRadius:16, display:'flex', alignItems:'center', gap:14 }}>
            <div style={{ width:48, height:48, borderRadius:'50%', background:`linear-gradient(135deg, ${t.primary}, ${t.secondary})`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:20, fontWeight:700, color:'#fff', flexShrink:0 }}>S</div>
            <div>
              <div style={{ fontSize:16, fontWeight:700, color: t.text }}>Sarah Chen</div>
              <div style={{ fontSize:12, color: t.textSec }}>sarah.chen@email.com</div>
              <div style={{ fontSize:11, color: t.primary, marginTop:2, fontWeight:600 }}>● Premium Member</div>
            </div>
            {React.createElement(window.lucide.ChevronRight, { size:18, color: t.textMuted, style:{ marginLeft:'auto' } })}
          </div>

          {/* Appearance */}
          <div style={{ marginTop:16 }}>
            <div style={{ fontSize:11, fontWeight:700, color: t.textMuted, letterSpacing:'0.08em', marginBottom:10 }}>APPEARANCE</div>
            <div style={{ padding:'13px 14px', background: t.card, border:`1px solid ${t.cardBorder}`, borderRadius:12, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
              <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                {React.createElement(isDark ? window.lucide.Moon : window.lucide.Sun, { size:18, color: t.primary })}
                <div>
                  <div style={{ fontSize:14, fontWeight:500, color: t.text }}>{isDark ? 'Dark Mode' : 'Light Mode'}</div>
                  <div style={{ fontSize:11, color: t.textMuted }}>{isDark ? 'Easy on the eyes at night' : 'Bright and clear'}</div>
                </div>
              </div>
              <Toggle on={isDark} onToggle={() => setIsDark(!isDark)} />
            </div>
          </div>

          {/* Context */}
          <div style={{ marginTop:16 }}>
            <div style={{ fontSize:11, fontWeight:700, color: t.textMuted, letterSpacing:'0.08em', marginBottom:10 }}>YOUR CONTEXT</div>
            {[
              { icon:'MapPin', label:'Home', value:'Chelsea, Manhattan', color:'#FF5C8A' },
              { icon:'Briefcase', label:'Work', value:'Midtown East, NYC', color:'#00D4FF' },
              { icon:'Train', label:'Commute', value:'Line 2 · Departs 8:15 AM', color:'#8B5CF6' },
              { icon:'School', label:"Child's School", value:'Riverside Elementary', color:'#FFB347' },
            ].map((item, i) => (
              <div key={i} style={{ padding:'11px 14px', background: t.card, border:`1px solid ${t.cardBorder}`, borderRadius:12, marginBottom:8, display:'flex', alignItems:'center', gap:10, justifyContent:'space-between' }}>
                <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                  <div style={{ width:30, height:30, borderRadius:8, background:`${item.color}20`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                    {React.createElement(window.lucide[item.icon] || window.lucide.MapPin, { size:14, color: item.color })}
                  </div>
                  <div>
                    <div style={{ fontSize:10, color: t.textMuted, fontWeight:500 }}>{item.label}</div>
                    <div style={{ fontSize:13, fontWeight:500, color: t.text }}>{item.value}</div>
                  </div>
                </div>
                {React.createElement(window.lucide.ChevronRight, { size:16, color: t.textMuted })}
              </div>
            ))}
          </div>

          {/* Topics */}
          <div style={{ marginTop:16 }}>
            <div style={{ fontSize:11, fontWeight:700, color: t.textMuted, letterSpacing:'0.08em', marginBottom:10 }}>TOPIC INTERESTS</div>
            <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
              {Object.keys(topicColors).map(topic => {
                const color = topicColors[topic];
                const active = topicsActive[topic];
                return (
                  <button key={topic} onClick={() => toggleTopic(topic)} style={{ padding:'7px 14px', borderRadius:20, border:`1px solid ${active ? color : t.cardBorder}`, background: active ? `${color}20` : 'transparent', fontSize:12, fontWeight:600, color: active ? color : t.textMuted, cursor:'pointer', fontFamily:'Space Grotesk, sans-serif', transition:'all 0.2s' }}>
                    {topic}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Relevance calibration */}
          <div style={{ marginTop:16, padding:'14px', background: t.primaryDeep, border:`1px solid ${t.primary}33`, borderRadius:14 }}>
            <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:6 }}>
              {React.createElement(window.lucide.Zap, { size:16, color: t.primary })}
              <div style={{ fontSize:13, fontWeight:600, color: t.primary }}>Relevance Engine</div>
            </div>
            <div style={{ fontSize:12, color: t.textSec, lineHeight:1.5 }}>PulseMap has learned from 47 interactions. Your feed is 3× more accurate than when you started.</div>
          </div>

          <div style={{ height:16 }}/>
        </div>
      </div>
    );
  };

  // ── Main render ────────────────────────────────────────────────────────────
  return (
    <div style={{ minHeight:'100vh', background:'#0A0D18', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'Space Grotesk, sans-serif' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { display: none; }
        body { background: #0A0D18; }
      `}</style>

      {/* Phone frame */}
      <div style={{ width:375, height:812, background: t.bg, borderRadius:50, overflow:'hidden', boxShadow:'0 40px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.08), inset 0 0 0 1px rgba(255,255,255,0.04)', display:'flex', flexDirection:'column', position:'relative', fontFamily:'Space Grotesk, sans-serif' }}>

        {/* Dynamic Island */}
        <div style={{ position:'absolute', top:12, left:'50%', transform:'translateX(-50%)', width:126, height:36, background:'#000', borderRadius:18, zIndex:20 }}/>

        <StatusBar />

        {/* Screen content */}
        <div style={{ flex:1, overflow:'hidden', display:'flex', flexDirection:'column', marginTop:8 }}>
          {activeTab === 'home' && <HomeScreen />}
          {activeTab === 'map' && <MapScreen />}
          {activeTab === 'alerts' && <AlertsScreen />}
          {activeTab === 'tracker' && <TrackerScreen />}
          {activeTab === 'settings' && <SettingsScreen />}
        </div>

        {/* Bottom nav */}
        <div style={{ display:'flex', flexDirection:'row', justifyContent:'space-around', alignItems:'center', padding:'8px 0 22px', borderTop:`1px solid ${t.navBorder}`, background: t.navBg }}>
          <button onClick={() => setActiveTab('home')} style={{ background:'none', border:'none', display:'flex', flexDirection:'column', alignItems:'center', gap:3, cursor:'pointer', padding:'4px 10px' }}>
            {React.createElement(window.lucide.Home, { size:22, color: activeTab === 'home' ? t.primary : t.textMuted })}
            <span style={{ fontSize:10, fontWeight:600, color: activeTab === 'home' ? t.primary : t.textMuted, fontFamily:'Space Grotesk, sans-serif' }}>Home</span>
          </button>
          <button onClick={() => setActiveTab('map')} style={{ background:'none', border:'none', display:'flex', flexDirection:'column', alignItems:'center', gap:3, cursor:'pointer', padding:'4px 10px' }}>
            {React.createElement(window.lucide.Map, { size:22, color: activeTab === 'map' ? t.primary : t.textMuted })}
            <span style={{ fontSize:10, fontWeight:600, color: activeTab === 'map' ? t.primary : t.textMuted, fontFamily:'Space Grotesk, sans-serif' }}>Map</span>
          </button>
          <button onClick={() => setActiveTab('alerts')} style={{ background:'none', border:'none', display:'flex', flexDirection:'column', alignItems:'center', gap:3, cursor:'pointer', padding:'4px 10px', position:'relative' }}>
            <div style={{ position:'relative' }}>
              {React.createElement(window.lucide.Bell, { size:22, color: activeTab === 'alerts' ? t.primary : t.textMuted })}
              <div style={{ position:'absolute', top:-3, right:-4, width:8, height:8, borderRadius:'50%', background:'#FF5C8A', border:`1.5px solid ${t.navBg}` }}/>
            </div>
            <span style={{ fontSize:10, fontWeight:600, color: activeTab === 'alerts' ? t.primary : t.textMuted, fontFamily:'Space Grotesk, sans-serif' }}>Alerts</span>
          </button>
          <button onClick={() => setActiveTab('tracker')} style={{ background:'none', border:'none', display:'flex', flexDirection:'column', alignItems:'center', gap:3, cursor:'pointer', padding:'4px 10px' }}>
            {React.createElement(window.lucide.BookMarked, { size:22, color: activeTab === 'tracker' ? t.primary : t.textMuted })}
            <span style={{ fontSize:10, fontWeight:600, color: activeTab === 'tracker' ? t.primary : t.textMuted, fontFamily:'Space Grotesk, sans-serif' }}>Tracker</span>
          </button>
          <button onClick={() => setActiveTab('settings')} style={{ background:'none', border:'none', display:'flex', flexDirection:'column', alignItems:'center', gap:3, cursor:'pointer', padding:'4px 10px' }}>
            {React.createElement(window.lucide.Settings, { size:22, color: activeTab === 'settings' ? t.primary : t.textMuted })}
            <span style={{ fontSize:10, fontWeight:600, color: activeTab === 'settings' ? t.primary : t.textMuted, fontFamily:'Space Grotesk, sans-serif' }}>Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
}
