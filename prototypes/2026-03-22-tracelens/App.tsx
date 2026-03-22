const { useState, useEffect, useRef } = React;

const themes = {
  light: {
    bg: '#F5F3FF',
    surface: '#FFFFFF',
    surfaceAlt: '#EDE9FE',
    card: '#FFFFFF',
    cardBorder: '#E8E3FC',
    text: '#1A1033',
    textSec: '#6B5FA6',
    textMuted: '#9B8FCB',
    primary: '#7C3AED',
    primaryLight: '#A78BFA',
    primaryGrad: 'linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)',
    accent: '#F59E0B',
    accentRose: '#F43F5E',
    accentTeal: '#0EA5E9',
    navBg: '#FFFFFF',
    navBorder: '#EDE9FE',
    inputBg: '#F5F3FF',
    inputBorder: '#DDD6FE',
    statusBar: '#7C3AED',
    tagBg: '#EDE9FE',
    tagText: '#7C3AED',
    overlay: 'rgba(124, 58, 237, 0.08)',
    shadow: '0 4px 24px rgba(124,58,237,0.10)',
  },
  dark: {
    bg: '#0F0A1E',
    surface: '#1A1033',
    surfaceAlt: '#231844',
    card: '#1E1240',
    cardBorder: '#2D1F5E',
    text: '#F0EAFF',
    textSec: '#A78BFA',
    textMuted: '#6B5FA6',
    primary: '#A78BFA',
    primaryLight: '#C4B5FD',
    primaryGrad: 'linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)',
    accent: '#FBBF24',
    accentRose: '#FB7185',
    accentTeal: '#38BDF8',
    navBg: '#1A1033',
    navBorder: '#2D1F5E',
    inputBg: '#231844',
    inputBorder: '#3B2A78',
    statusBar: '#A78BFA',
    tagBg: '#2D1F5E',
    tagText: '#A78BFA',
    overlay: 'rgba(167, 139, 250, 0.08)',
    shadow: '0 4px 24px rgba(0,0,0,0.40)',
  }
};

const fontStyle = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  ::-webkit-scrollbar { display: none; }
  body { background: #e8e8e8; }
`;

const stories = [
  {
    id: 1,
    title: "Liam's First Steps",
    date: "Today, 2:14 PM",
    clips: 12,
    duration: "4m 32s",
    tags: ["Milestone", "Family"],
    color: "#F43F5E",
    emoji: "👶",
    frames: ["👶","🚶","🎉"],
    caption: "He took 6 steps unassisted across the living room — caught from 3 angles",
    highlight: "Best moment at 1:42",
  },
  {
    id: 2,
    title: "Kitchen Shelf Repair",
    date: "Yesterday",
    clips: 8,
    duration: "6m 18s",
    tags: ["DIY", "How-to"],
    color: "#0EA5E9",
    emoji: "🔧",
    frames: ["🔧","🪛","✅"],
    caption: "Full repair documented — toggle bolts, stud finder, final load test",
    highlight: "Step 3 is key",
  },
  {
    id: 3,
    title: "Birthday Surprise Setup",
    date: "Mar 19",
    clips: 21,
    duration: "11m 04s",
    tags: ["Celebration", "Family"],
    color: "#F59E0B",
    emoji: "🎂",
    frames: ["🎂","🎈","😲"],
    caption: "Decoration sequence + reaction — shareable family reel ready",
    highlight: "Reaction at 8:22",
  },
  {
    id: 4,
    title: "Sourdough Starter Guide",
    date: "Mar 17",
    clips: 15,
    duration: "9m 50s",
    tags: ["Recipe", "Tutorial"],
    color: "#10B981",
    emoji: "🍞",
    frames: ["🥣","⏰","🍞"],
    caption: "Day 1–5 feeding schedule + texture checkpoints captured daily",
    highlight: "Day 3 tip",
  },
];

const libraryItems = [
  { id: 1, label: "Liam walking", dur: "0:08", group: "Liam's First Steps", color: "#F43F5E", emoji: "👶" },
  { id: 2, label: "Wide angle take", dur: "0:12", group: "Liam's First Steps", color: "#F43F5E", emoji: "📹" },
  { id: 3, label: "Close-up feet", dur: "0:06", group: "Liam's First Steps", color: "#F43F5E", emoji: "👣" },
  { id: 4, label: "Stud finder demo", dur: "0:22", group: "Kitchen Shelf", color: "#0EA5E9", emoji: "🔧" },
  { id: 5, label: "Drilling holes", dur: "0:45", group: "Kitchen Shelf", color: "#0EA5E9", emoji: "🪛" },
  { id: 6, label: "Final shelf test", dur: "0:18", group: "Kitchen Shelf", color: "#0EA5E9", emoji: "✅" },
  { id: 7, label: "Balloon setup", dur: "1:02", group: "Birthday", color: "#F59E0B", emoji: "🎈" },
  { id: 8, label: "Cake reveal", dur: "0:34", group: "Birthday", color: "#F59E0B", emoji: "🎂" },
  { id: 9, label: "Starter mix day1", dur: "0:55", group: "Sourdough", color: "#10B981", emoji: "🥣" },
];

const searchResults = [
  { q: "first steps", icon: "👶", label: "Liam's First Steps", sub: "3 clips · Today" },
  { q: "drill", icon: "🔧", label: "Kitchen Shelf Repair", sub: "Step 2: drilling" },
  { q: "birthday", icon: "🎂", label: "Birthday Surprise", sub: "Reaction highlight" },
  { q: "recipe", icon: "🍞", label: "Sourdough Guide", sub: "Day 3 tip" },
];

const builderSteps = [
  { n: 1, label: "Gather materials", note: "Toggle bolts, drill, stud finder, level", emoji: "📦", dur: "0:12" },
  { n: 2, label: "Locate wall studs", note: "Scan horizontally — mark with tape", emoji: "🔍", dur: "0:22" },
  { n: 3, label: "Drill pilot holes", note: "Use 3/16\" bit for toggle bolts", emoji: "🪛", dur: "0:45" },
  { n: 4, label: "Insert toggle bolts", note: "Fold wings back, push through hole", emoji: "🔩", dur: "0:18" },
  { n: 5, label: "Mount bracket", note: "Tighten until snug — don't overtighten", emoji: "🔧", dur: "0:30" },
  { n: 6, label: "Load test shelf", note: "Apply 20 lbs pressure, check level", emoji: "✅", dur: "0:16" },
];

function StatusBar({ t }) {
  return (
    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'12px 20px 4px', position:'relative', zIndex:10 }}>
      <span style={{ fontSize:13, fontWeight:600, color: t.text, fontFamily:'Space Grotesk' }}>9:41</span>
      <div style={{ width:120, height:34, background:'#000', borderRadius:20, position:'absolute', left:'50%', transform:'translateX(-50%)', top:8, display:'flex', alignItems:'center', justifyContent:'center', gap:6 }}>
        <div style={{ width:10, height:10, background:'#222', borderRadius:'50%' }}/>
        <div style={{ width:28, height:10, background:'#222', borderRadius:6 }}/>
      </div>
      <div style={{ display:'flex', gap:6, alignItems:'center' }}>
        {React.createElement(window.lucide.Wifi, { size:14, color: t.text })}
        {React.createElement(window.lucide.Battery, { size:16, color: t.text })}
      </div>
    </div>
  );
}

function HomeScreen({ t, isDark }) {
  const [pressed, setPressed] = useState(null);
  return (
    <div style={{ flex:1, overflowY:'auto', background: t.bg }}>
      <div style={{ padding:'8px 20px 12px', background: t.surface, borderBottom: `1px solid ${t.cardBorder}` }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <div>
            <div style={{ fontSize:11, color: t.textMuted, fontWeight:500, letterSpacing:1, textTransform:'uppercase' }}>Good afternoon</div>
            <div style={{ fontSize:22, fontWeight:700, color: t.text, lineHeight:1.2, marginTop:2 }}>Sarah's Moments</div>
          </div>
          <div style={{ width:40, height:40, borderRadius:'50%', background: t.primaryGrad, display:'flex', alignItems:'center', justifyContent:'center', fontSize:18 }}>S</div>
        </div>
        <div style={{ display:'flex', gap:10, marginTop:14 }}>
          {[['🎬','12 Clips'], ['✨','4 Stories'], ['📤','2 Exports']].map(([icon,label], i) => (
            <div key={i} style={{ flex:1, background: t.surfaceAlt, borderRadius:12, padding:'10px 8px', textAlign:'center', border:`1px solid ${t.cardBorder}` }}>
              <div style={{ fontSize:18 }}>{icon}</div>
              <div style={{ fontSize:11, color: t.textSec, fontWeight:600, marginTop:3 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding:'16px 20px 8px' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12 }}>
          <div style={{ fontSize:16, fontWeight:700, color: t.text }}>Recent Stories</div>
          <div style={{ fontSize:12, color: t.primary, fontWeight:600 }}>See all</div>
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
          {stories.map(s => (
            <div key={s.id}
              onMouseDown={() => setPressed(s.id)} onMouseUp={() => setPressed(null)} onMouseLeave={() => setPressed(null)}
              style={{ background: t.card, borderRadius:16, border:`1px solid ${t.cardBorder}`, overflow:'hidden', boxShadow: t.shadow, transform: pressed===s.id ? 'scale(0.98)' : 'scale(1)', transition:'transform 0.12s ease', cursor:'pointer' }}>
              <div style={{ height:6, background: s.color, width:'100%' }}/>
              <div style={{ padding:'12px 14px' }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
                  <div style={{ flex:1 }}>
                    <div style={{ display:'flex', gap:8, alignItems:'center', marginBottom:4 }}>
                      <span style={{ fontSize:20 }}>{s.emoji}</span>
                      <div>
                        <div style={{ fontSize:15, fontWeight:700, color: t.text }}>{s.title}</div>
                        <div style={{ fontSize:11, color: t.textMuted }}>{s.date} · {s.clips} clips · {s.duration}</div>
                      </div>
                    </div>
                    <div style={{ fontSize:12, color: t.textSec, lineHeight:1.5, marginTop:6 }}>{s.caption}</div>
                  </div>
                  <div style={{ width:36, height:36, borderRadius:10, background: t.surfaceAlt, display:'flex', alignItems:'center', justifyContent:'center', marginLeft:10, flexShrink:0 }}>
                    {React.createElement(window.lucide.ChevronRight, { size:16, color: t.primary })}
                  </div>
                </div>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:10 }}>
                  <div style={{ display:'flex', gap:6 }}>
                    {s.tags.map((tag,i) => (
                      <span key={i} style={{ fontSize:10, background: t.tagBg, color: t.tagText, padding:'3px 8px', borderRadius:20, fontWeight:600 }}>{tag}</span>
                    ))}
                  </div>
                  <div style={{ fontSize:11, color: s.color, fontWeight:600, background: isDark ? 'rgba(255,255,255,0.05)' : `${s.color}18`, padding:'3px 8px', borderRadius:20 }}>★ {s.highlight}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ height:20 }}/>
    </div>
  );
}

function LibraryScreen({ t }) {
  const [filter, setFilter] = useState('All');
  const filters = ['All','People','Tasks','Moments'];
  const grouped = {};
  libraryItems.forEach(item => {
    if (!grouped[item.group]) grouped[item.group] = [];
    grouped[item.group].push(item);
  });
  return (
    <div style={{ flex:1, overflowY:'auto', background: t.bg }}>
      <div style={{ padding:'8px 20px 12px', background: t.surface, borderBottom:`1px solid ${t.cardBorder}` }}>
        <div style={{ fontSize:22, fontWeight:700, color: t.text, marginBottom:12 }}>Clip Library</div>
        <div style={{ display:'flex', gap:8 }}>
          {filters.map(f => (
            <button key={f} onClick={() => setFilter(f)}
              style={{ padding:'6px 14px', borderRadius:20, border:'none', cursor:'pointer', fontSize:12, fontWeight:600, fontFamily:'Space Grotesk',
                background: filter===f ? t.primary : t.surfaceAlt,
                color: filter===f ? '#fff' : t.textSec,
                transition:'all 0.15s' }}>
              {f}
            </button>
          ))}
        </div>
      </div>
      <div style={{ padding:'14px 20px' }}>
        {Object.entries(grouped).map(([group, items]) => (
          <div key={group} style={{ marginBottom:20 }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10 }}>
              <div style={{ fontSize:13, fontWeight:700, color: t.text }}>{group}</div>
              <div style={{ fontSize:11, color: t.primary, fontWeight:600 }}>{items.length} clips</div>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:8 }}>
              {items.map(item => (
                <div key={item.id} style={{ borderRadius:12, overflow:'hidden', border:`1px solid ${t.cardBorder}`, background: t.card, cursor:'pointer', boxShadow: t.shadow }}>
                  <div style={{ height:72, background: `linear-gradient(135deg, ${item.color}33, ${item.color}88)`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:26 }}>{item.emoji}</div>
                  <div style={{ padding:'6px 8px' }}>
                    <div style={{ fontSize:10, fontWeight:600, color: t.text, lineHeight:1.3 }}>{item.label}</div>
                    <div style={{ fontSize:9, color: t.textMuted, marginTop:2 }}>{item.dur}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div style={{ height:20 }}/>
    </div>
  );
}

function BuilderScreen({ t }) {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  return (
    <div style={{ flex:1, overflowY:'auto', background: t.bg }}>
      <div style={{ padding:'8px 20px 12px', background: t.surface, borderBottom:`1px solid ${t.cardBorder}` }}>
        <div style={{ fontSize:11, color: t.textMuted, fontWeight:500, letterSpacing:1, textTransform:'uppercase' }}>Step Builder</div>
        <div style={{ fontSize:22, fontWeight:700, color: t.text, marginTop:2 }}>Kitchen Shelf Repair</div>
        <div style={{ fontSize:12, color: t.textSec, marginTop:2 }}>6 steps · 2m 23s total</div>
      </div>

      <div style={{ margin:'16px 20px 0', borderRadius:16, overflow:'hidden', border:`1px solid ${t.cardBorder}`, background: t.card, boxShadow: t.shadow }}>
        <div style={{ height:160, background:`linear-gradient(135deg, #0EA5E933, #0EA5E966)`, display:'flex', alignItems:'center', justifyContent:'center', position:'relative' }}>
          <div style={{ fontSize:52 }}>{builderSteps[active].emoji}</div>
          <div style={{ position:'absolute', bottom:10, left:12, background:'rgba(0,0,0,0.5)', borderRadius:8, padding:'3px 8px' }}>
            <span style={{ fontSize:10, color:'#fff', fontWeight:600 }}>Step {active+1}/{builderSteps.length} · {builderSteps[active].dur}</span>
          </div>
          <div onClick={() => setPlaying(!playing)} style={{ position:'absolute', bottom:10, right:12, width:32, height:32, borderRadius:'50%', background: t.primary, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}>
            {playing ? React.createElement(window.lucide.Pause, { size:14, color:'#fff' }) : React.createElement(window.lucide.Play, { size:14, color:'#fff' })}
          </div>
        </div>
        <div style={{ padding:'14px' }}>
          <div style={{ fontSize:16, fontWeight:700, color: t.text }}>{builderSteps[active].label}</div>
          <div style={{ fontSize:13, color: t.textSec, marginTop:4, lineHeight:1.5 }}>{builderSteps[active].note}</div>
          <div style={{ display:'flex', gap:10, marginTop:12 }}>
            <button onClick={() => setActive(Math.max(0,active-1))} disabled={active===0}
              style={{ flex:1, padding:'10px', borderRadius:10, border:`1px solid ${t.cardBorder}`, background: t.surfaceAlt, color: t.textSec, fontFamily:'Space Grotesk', fontWeight:600, fontSize:13, cursor: active===0?'default':'pointer', opacity: active===0?0.4:1 }}>
              ← Prev
            </button>
            <button onClick={() => setActive(Math.min(builderSteps.length-1,active+1))} disabled={active===builderSteps.length-1}
              style={{ flex:1, padding:'10px', borderRadius:10, border:'none', background: active===builderSteps.length-1 ? t.surfaceAlt : t.primary, color: active===builderSteps.length-1 ? t.textSec : '#fff', fontFamily:'Space Grotesk', fontWeight:600, fontSize:13, cursor: active===builderSteps.length-1?'default':'pointer', opacity: active===builderSteps.length-1?0.4:1 }}>
              Next →
            </button>
          </div>
        </div>
      </div>

      <div style={{ padding:'16px 20px' }}>
        <div style={{ fontSize:14, fontWeight:700, color: t.text, marginBottom:10 }}>All Steps</div>
        <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
          {builderSteps.map((step, i) => (
            <div key={i} onClick={() => setActive(i)}
              style={{ display:'flex', alignItems:'center', gap:12, padding:'12px 14px', borderRadius:12, border:`1px solid ${active===i ? t.primary : t.cardBorder}`, background: active===i ? t.overlay : t.card, cursor:'pointer', transition:'all 0.15s', boxShadow: active===i ? `0 0 0 1px ${t.primary}40` : 'none' }}>
              <div style={{ width:36, height:36, borderRadius:10, background: active===i ? t.primary : t.surfaceAlt, display:'flex', alignItems:'center', justifyContent:'center', fontSize:18, flexShrink:0 }}>
                {active > i ? '✓' : step.emoji}
              </div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:13, fontWeight:600, color: t.text }}>Step {step.n}: {step.label}</div>
                <div style={{ fontSize:11, color: t.textMuted, marginTop:1 }}>{step.note}</div>
              </div>
              <div style={{ fontSize:10, color: t.textMuted, fontWeight:600 }}>{step.dur}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ height:20 }}/>
    </div>
  );
}

function SearchScreen({ t }) {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const recent = ['first steps', 'birthday reaction', 'shelf repair', 'sourdough day 3'];
  const filtered = searchResults.filter(r => !query || r.q.includes(query.toLowerCase()) || r.label.toLowerCase().includes(query.toLowerCase()));
  return (
    <div style={{ flex:1, overflowY:'auto', background: t.bg }}>
      <div style={{ padding:'8px 20px 12px', background: t.surface, borderBottom:`1px solid ${t.cardBorder}` }}>
        <div style={{ fontSize:22, fontWeight:700, color: t.text, marginBottom:12 }}>Search</div>
        <div style={{ display:'flex', alignItems:'center', gap:10, background: t.inputBg, border:`1.5px solid ${focused ? t.primary : t.inputBorder}`, borderRadius:14, padding:'10px 14px', transition:'border 0.15s' }}>
          {React.createElement(window.lucide.Search, { size:16, color: t.textMuted })}
          <input value={query} onChange={e => setQuery(e.target.value)} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
            placeholder="Search memories, moments, steps..."
            style={{ flex:1, border:'none', background:'transparent', outline:'none', fontSize:14, color: t.text, fontFamily:'Space Grotesk' }}/>
          {query && <span onClick={() => setQuery('')} style={{ cursor:'pointer', color: t.textMuted }}>✕</span>}
        </div>
      </div>

      <div style={{ padding:'16px 20px' }}>
        {!query && (
          <div style={{ marginBottom:20 }}>
            <div style={{ fontSize:13, fontWeight:700, color: t.text, marginBottom:10 }}>Recent Searches</div>
            <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
              {recent.map((r,i) => (
                <span key={i} onClick={() => setQuery(r)} style={{ fontSize:12, background: t.tagBg, color: t.tagText, padding:'6px 12px', borderRadius:20, fontWeight:600, cursor:'pointer' }}>🕐 {r}</span>
              ))}
            </div>
          </div>
        )}

        <div>
          <div style={{ fontSize:13, fontWeight:700, color: t.text, marginBottom:10 }}>{query ? 'Results' : 'Quick Finds'}</div>
          <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
            {filtered.map((r,i) => (
              <div key={i} style={{ display:'flex', alignItems:'center', gap:12, padding:'12px 14px', borderRadius:14, background: t.card, border:`1px solid ${t.cardBorder}`, cursor:'pointer', boxShadow: t.shadow }}>
                <div style={{ width:42, height:42, borderRadius:12, background: t.surfaceAlt, display:'flex', alignItems:'center', justifyContent:'center', fontSize:22, flexShrink:0 }}>{r.icon}</div>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:14, fontWeight:600, color: t.text }}>{r.label}</div>
                  <div style={{ fontSize:12, color: t.textMuted, marginTop:2 }}>{r.sub}</div>
                </div>
                {React.createElement(window.lucide.ChevronRight, { size:16, color: t.textMuted })}
              </div>
            ))}
          </div>
        </div>

        {!query && (
          <div style={{ marginTop:20, padding:'14px', borderRadius:16, background: t.primaryGrad, boxShadow: t.shadow }}>
            <div style={{ fontSize:13, fontWeight:700, color:'#fff', marginBottom:4 }}>Try Natural Language</div>
            <div style={{ fontSize:12, color:'rgba(255,255,255,0.8)', lineHeight:1.5 }}>
              "Show me all clips with Liam laughing" or "How did I fix the shelf last month?"
            </div>
            <div style={{ marginTop:10, display:'flex', gap:6 }}>
              {['👶 milestones','🔧 repairs','🎂 celebrations'].map((s,i) => (
                <span key={i} style={{ fontSize:10, background:'rgba(255,255,255,0.2)', color:'#fff', padding:'4px 8px', borderRadius:12, fontWeight:600 }}>{s}</span>
              ))}
            </div>
          </div>
        )}
      </div>
      <div style={{ height:20 }}/>
    </div>
  );
}

function SettingsScreen({ t, isDark, setIsDark }) {
  const [notifs, setNotifs] = useState(true);
  const [autoGroup, setAutoGroup] = useState(true);
  const [faceTag, setFaceTag] = useState(false);

  function Toggle({ val, onChange }) {
    return (
      <div onClick={() => onChange(!val)} style={{ width:44, height:26, borderRadius:13, background: val ? t.primary : t.surfaceAlt, border:`1px solid ${val ? t.primary : t.cardBorder}`, position:'relative', cursor:'pointer', transition:'background 0.2s' }}>
        <div style={{ width:20, height:20, borderRadius:'50%', background:'#fff', position:'absolute', top:2, left: val ? 21 : 2, transition:'left 0.2s', boxShadow:'0 1px 4px rgba(0,0,0,0.2)' }}/>
      </div>
    );
  }

  const sections = [
    {
      title: 'Appearance',
      items: [
        {
          icon: isDark ? window.lucide.Moon : window.lucide.Sun,
          label: 'Dark Mode',
          sub: isDark ? 'Switch to light' : 'Switch to dark',
          control: <Toggle val={isDark} onChange={setIsDark} />
        }
      ]
    },
    {
      title: 'Intelligence',
      items: [
        { icon: window.lucide.Layers, label: 'Auto-Group Clips', sub: 'Detect storylines automatically', control: <Toggle val={autoGroup} onChange={setAutoGroup} /> },
        { icon: window.lucide.User, label: 'Face Recognition', sub: 'Tag people in your moments', control: <Toggle val={faceTag} onChange={setFaceTag} /> },
        { icon: window.lucide.Bell, label: 'Smart Reminders', sub: 'Alert when stories are ready', control: <Toggle val={notifs} onChange={setNotifs} /> },
      ]
    },
    {
      title: 'Privacy & Export',
      items: [
        { icon: window.lucide.Lock, label: 'Private by Default', sub: 'All memories are local-first', control: React.createElement(window.lucide.ChevronRight, { size:16, color: t.textMuted }) },
        { icon: window.lucide.Share2, label: 'Export Formats', sub: 'Album, Reel, How-to Guide', control: React.createElement(window.lucide.ChevronRight, { size:16, color: t.textMuted }) },
        { icon: window.lucide.Download, label: 'Backup to iCloud', sub: 'Last backed up: Today', control: React.createElement(window.lucide.ChevronRight, { size:16, color: t.textMuted }) },
      ]
    }
  ];

  return (
    <div style={{ flex:1, overflowY:'auto', background: t.bg }}>
      <div style={{ padding:'8px 20px 16px', background: t.surface, borderBottom:`1px solid ${t.cardBorder}` }}>
        <div style={{ display:'flex', alignItems:'center', gap:14, marginTop:4 }}>
          <div style={{ width:60, height:60, borderRadius:'50%', background: t.primaryGrad, display:'flex', alignItems:'center', justifyContent:'center', fontSize:26 }}>S</div>
          <div>
            <div style={{ fontSize:18, fontWeight:700, color: t.text }}>Sarah Mitchell</div>
            <div style={{ fontSize:12, color: t.textSec }}>sarah@example.com</div>
            <div style={{ fontSize:11, color: t.primary, fontWeight:600, marginTop:3 }}>Pro Plan · 4 stories this week</div>
          </div>
        </div>
      </div>

      <div style={{ padding:'16px 20px' }}>
        {sections.map((sec, si) => (
          <div key={si} style={{ marginBottom:20 }}>
            <div style={{ fontSize:11, color: t.textMuted, fontWeight:700, letterSpacing:1, textTransform:'uppercase', marginBottom:8 }}>{sec.title}</div>
            <div style={{ borderRadius:16, overflow:'hidden', border:`1px solid ${t.cardBorder}`, background: t.card }}>
              {sec.items.map((item, ii) => (
                <div key={ii} style={{ display:'flex', alignItems:'center', gap:12, padding:'13px 14px', borderBottom: ii<sec.items.length-1 ? `1px solid ${t.cardBorder}` : 'none' }}>
                  <div style={{ width:36, height:36, borderRadius:10, background: t.surfaceAlt, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                    {React.createElement(item.icon, { size:16, color: t.primary })}
                  </div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:14, fontWeight:600, color: t.text }}>{item.label}</div>
                    <div style={{ fontSize:11, color: t.textMuted, marginTop:1 }}>{item.sub}</div>
                  </div>
                  {item.control}
                </div>
              ))}
            </div>
          </div>
        ))}

        <div style={{ padding:'14px', borderRadius:16, background: t.primaryGrad, textAlign:'center', marginBottom:16 }}>
          <div style={{ fontSize:14, fontWeight:700, color:'#fff' }}>TraceLens Pro</div>
          <div style={{ fontSize:12, color:'rgba(255,255,255,0.85)', marginTop:4 }}>Unlimited stories · AI captions · Priority processing</div>
          <div style={{ marginTop:10, padding:'8px 20px', background:'rgba(255,255,255,0.2)', borderRadius:20, display:'inline-block', fontSize:12, color:'#fff', fontWeight:700 }}>Active ✓</div>
        </div>

        <div style={{ textAlign:'center', fontSize:11, color: t.textMuted }}>TraceLens v2.1.4 · Made with ♥</div>
      </div>
      <div style={{ height:20 }}/>
    </div>
  );
}

function App() {
  const [tab, setTab] = useState(0);
  const [isDark, setIsDark] = useState(false);
  const t = isDark ? themes.dark : themes.light;

  const tabs = [
    { icon: window.lucide.Home, label: 'Home' },
    { icon: window.lucide.Film, label: 'Library' },
    { icon: window.lucide.Layers, label: 'Build' },
    { icon: window.lucide.Search, label: 'Search' },
    { icon: window.lucide.Settings, label: 'Settings' },
  ];

  return (
    <div style={{ minHeight:'100vh', background:'#e8e8e8', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'Space Grotesk, sans-serif' }}>
      <style>{fontStyle}</style>
      <div style={{ width:375, height:812, background: t.surface, borderRadius:48, overflow:'hidden', boxShadow:'0 40px 80px rgba(0,0,0,0.25), 0 0 0 10px #1a1a1a, 0 0 0 12px #333', display:'flex', flexDirection:'column', position:'relative' }}>
        <StatusBar t={t} />

        <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' }}>
          {tab === 0 && <HomeScreen t={t} isDark={isDark} />}
          {tab === 1 && <LibraryScreen t={t} />}
          {tab === 2 && <BuilderScreen t={t} />}
          {tab === 3 && <SearchScreen t={t} />}
          {tab === 4 && <SettingsScreen t={t} isDark={isDark} setIsDark={setIsDark} />}
        </div>

        <div style={{ background: t.navBg, borderTop:`1px solid ${t.navBorder}`, display:'flex', paddingBottom:16, paddingTop:8, boxShadow:`0 -4px 20px rgba(0,0,0,0.06)` }}>
          {tabs.map((tb, i) => {
            const active = tab === i;
            return (
              <div key={i} onClick={() => setTab(i)} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:3, cursor:'pointer', padding:'4px 0', transition:'all 0.15s' }}>
                <div style={{ width:36, height:36, borderRadius:10, background: active ? t.overlay : 'transparent', display:'flex', alignItems:'center', justifyContent:'center', transition:'all 0.15s' }}>
                  {React.createElement(tb.icon, { size:20, color: active ? t.primary : t.textMuted, strokeWidth: active ? 2.5 : 1.8 })}
                </div>
                <span style={{ fontSize:10, fontWeight: active ? 700 : 500, color: active ? t.primary : t.textMuted, letterSpacing:0.3 }}>{tb.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
