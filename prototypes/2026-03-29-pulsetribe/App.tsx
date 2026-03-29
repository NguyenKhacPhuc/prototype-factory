const { useState, useEffect, useRef } = React;

const themes = {
  dark: {
    bg: '#08080F', surface: '#10101E', surface2: '#181830',
    primary: '#7C3AFF', primaryLight: '#9B5FFF', accent: '#00E5FF', accentDim: '#00B8CC',
    text: '#F0F0FF', textSec: '#8888AA', textDim: '#505068',
    border: '#20203A', navBg: '#0C0C1A',
    green: '#00FF88', orange: '#FF8800', red: '#FF3366',
  },
  light: {
    bg: '#F2F2FF', surface: '#FFFFFF', surface2: '#EAEAFF',
    primary: '#6020EE', primaryLight: '#8040FF', accent: '#0090BB', accentDim: '#007090',
    text: '#080818', textSec: '#505070', textDim: '#9090A8',
    border: '#D8D8F0', navBg: '#FFFFFF',
    green: '#00AA55', orange: '#CC7700', red: '#CC1133',
  }
};

function StatusBar({ theme }) {
  return React.createElement('div', {
    style: { display:'flex', justifyContent:'space-between', alignItems:'center', padding:'8px 24px 2px', fontFamily:"'Inter',sans-serif" }
  },
    React.createElement('span', { style:{ fontSize:11, fontWeight:600, color:theme.text } }, '9:41'),
    React.createElement('div', { style:{ display:'flex', gap:5, alignItems:'center' } },
      React.createElement(window.lucide.Wifi, { size:12, color:theme.text }),
      React.createElement(window.lucide.Signal, { size:12, color:theme.text }),
      React.createElement(window.lucide.Battery, { size:14, color:theme.text })
    )
  );
}

function DynamicIsland({ theme, active }) {
  return React.createElement('div', { style:{ display:'flex', justifyContent:'center', marginBottom:2 } },
    React.createElement('div', {
      style:{
        background:'#000', borderRadius:20,
        padding: active ? '5px 16px' : '8px 28px',
        display:'flex', alignItems:'center', gap:6,
        minWidth: active ? 110 : 80, height:30,
        transition:'all 0.3s ease',
      }
    },
      active && React.createElement('div', {
        style:{ width:7, height:7, borderRadius:'50%', background:theme.accent, animation:'pulseAnim 1.2s infinite' }
      }),
      active && React.createElement('span', { style:{ color:theme.accent, fontSize:9, fontFamily:"'Righteous',sans-serif", letterSpacing:1 } }, 'WAVE ACTIVE')
    )
  );
}

function HomeScreen({ theme, setActiveTab }) {
  const [sec, setSec] = useState(272);
  useEffect(() => {
    const t = setInterval(() => setSec(s => s > 0 ? s-1 : 0), 1000);
    return () => clearInterval(t);
  }, []);
  const m = Math.floor(sec/60), s = sec % 60;

  const tribes = [
    { name:'Ubuntu Circle', members:847, color:'#7C3AFF', symbol:'◆' },
    { name:'Zen Collective', members:1203, color:'#00E5FF', symbol:'○' },
    { name:'Iron Vow', members:521, color:'#FF8800', symbol:'▲' },
    { name:'Sacred Root', members:934, color:'#00FF88', symbol:'✦' },
  ];
  const affirmations = [
    { user:'Maya K.', tribe:'Ubuntu Circle', text:'Felt the collective energy! That gratitude wave hit different 🔥', time:'2m', color:'#7C3AFF' },
    { user:'Ravi S.', tribe:'Zen Collective', text:'Three weeks streak. My mind is crystal clear right now.', time:'5m', color:'#00E5FF' },
    { user:'Alicia T.', tribe:'Iron Vow', text:'We held the line together. No one broke the vow this week!', time:'8m', color:'#FF8800' },
  ];

  return React.createElement('div', { style:{ paddingBottom:8 } },
    React.createElement('div', { style:{ padding:'6px 20px 12px', display:'flex', justifyContent:'space-between', alignItems:'center' } },
      React.createElement('div', null,
        React.createElement('div', { style:{ fontSize:11, color:theme.textSec, fontFamily:"'Righteous',sans-serif", letterSpacing:3 } }, 'GOOD MORNING'),
        React.createElement('div', { style:{ fontSize:22, color:theme.text, fontFamily:"'Righteous',sans-serif" } }, 'Zara Osei')
      ),
      React.createElement('div', {
        style:{
          width:40, height:40,
          background:`linear-gradient(135deg,${theme.primary},${theme.accent})`,
          borderRadius:3, display:'flex', alignItems:'center', justifyContent:'center',
          color:'#fff', fontSize:14, fontFamily:"'Righteous',sans-serif", transform:'rotate(4deg)',
        }
      }, 'ZO')
    ),

    // Live Banner — asymmetric diagonal layout
    React.createElement('div', { style:{ position:'relative', overflow:'hidden', height:185 } },
      React.createElement('div', { style:{ position:'absolute', inset:0, background:`linear-gradient(135deg, ${theme.primary} 0%, #1A0050 55%, ${theme.bg} 100%)` } }),
      React.createElement('div', { style:{ position:'absolute', top:-25, right:-25, width:180, height:200, background:theme.accent, opacity:0.07, transform:'rotate(18deg) skewX(-8deg)' } }),
      React.createElement('div', { style:{ position:'absolute', bottom:-15, left:-15, width:140, height:100, background:theme.primary, opacity:0.25, transform:'rotate(-10deg)' } }),
      React.createElement('div', { style:{ position:'absolute', bottom:0, left:0, right:0, height:32, background:theme.bg, clipPath:'polygon(0 100%, 100% 0, 100% 100%)' } }),
      React.createElement('div', { style:{ position:'relative', padding:'14px 20px', zIndex:1 } },
        React.createElement('div', { style:{ display:'flex', alignItems:'center', gap:7, marginBottom:8 } },
          React.createElement('div', { style:{ width:7, height:7, borderRadius:'50%', background:theme.accent, animation:'pulseAnim 1s infinite' } }),
          React.createElement('span', { style:{ fontSize:10, color:theme.accent, fontFamily:"'Righteous',sans-serif", letterSpacing:3 } }, 'LIVE NOW')
        ),
        React.createElement('div', { style:{ fontSize:22, fontWeight:700, color:'#FFF', fontFamily:"'Righteous',sans-serif", lineHeight:1.2, marginBottom:10 } }, 'Ubuntu Gratitude\nRitual Wave'),
        React.createElement('div', { style:{ display:'flex', alignItems:'center', gap:8, flexWrap:'wrap' } },
          React.createElement('div', { style:{ background:'rgba(0,0,0,0.45)', padding:'4px 10px', borderRadius:2 } },
            React.createElement('span', { style:{ fontSize:13, color:'#FFF', fontFamily:"'Righteous',sans-serif" } }, `${m}:${String(s).padStart(2,'0')} left`)
          ),
          React.createElement('span', { style:{ fontSize:11, color:'rgba(255,255,255,0.6)' } }, '1,247 in wave'),
          React.createElement('button', {
            onClick:() => setActiveTab('rituals'),
            style:{ background:theme.accent, color:'#000', border:'none', padding:'5px 14px', borderRadius:2, fontSize:11, fontFamily:"'Righteous',sans-serif", cursor:'pointer', fontWeight:700, marginLeft:'auto' }
          }, 'JOIN →')
        )
      )
    ),

    // Tribes
    React.createElement('div', { style:{ padding:'14px 20px 8px' } },
      React.createElement('div', { style:{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10 } },
        React.createElement('span', { style:{ fontSize:13, fontFamily:"'Righteous',sans-serif", color:theme.text, letterSpacing:1 } }, 'MY TRIBES'),
        React.createElement('span', { style:{ fontSize:10, color:theme.accent, cursor:'pointer' } }, 'ALL →')
      ),
      React.createElement('div', { style:{ display:'flex', gap:8, overflowX:'auto', paddingBottom:4, scrollbarWidth:'none' } },
        ...tribes.map((tr,i) => React.createElement('div', {
          key:i,
          style:{ flexShrink:0, width:76, background:theme.surface, border:`2px solid ${tr.color}`, borderRadius:4, padding:'10px 6px', textAlign:'center', cursor:'pointer' }
        },
          React.createElement('div', { style:{ width:34, height:34, background:tr.color, borderRadius:2, display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 6px', fontSize:16, transform:'rotate(5deg)' } }, tr.symbol),
          React.createElement('div', { style:{ fontSize:8, color:theme.text, fontFamily:"'Righteous',sans-serif", marginBottom:2, lineHeight:1.2 } }, tr.name),
          React.createElement('div', { style:{ fontSize:7, color:tr.color } }, `${tr.members.toLocaleString()}`)
        ))
      )
    ),

    // Affirmations
    React.createElement('div', { style:{ padding:'4px 20px' } },
      React.createElement('div', { style:{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10 } },
        React.createElement('span', { style:{ fontSize:13, fontFamily:"'Righteous',sans-serif", color:theme.text, letterSpacing:1 } }, 'AFFIRMATIONS'),
        React.createElement('div', { style:{ display:'flex', alignItems:'center', gap:4 } },
          React.createElement('div', { style:{ width:6, height:6, borderRadius:'50%', background:theme.green } }),
          React.createElement('span', { style:{ fontSize:9, color:theme.green } }, 'LIVE FEED')
        )
      ),
      ...affirmations.map((a,i) => React.createElement('div', {
        key:i,
        style:{ background:theme.surface, borderLeft:`3px solid ${a.color}`, padding:'10px 12px', marginBottom:8, borderRadius:'0 4px 4px 0' }
      },
        React.createElement('div', { style:{ display:'flex', justifyContent:'space-between', marginBottom:3 } },
          React.createElement('span', { style:{ fontSize:11, fontFamily:"'Righteous',sans-serif", color:theme.text } }, a.user),
          React.createElement('span', { style:{ fontSize:9, color:theme.textDim } }, a.time+' ago')
        ),
        React.createElement('div', { style:{ fontSize:11, color:theme.textSec, fontFamily:"'Inter',sans-serif", marginBottom:5, lineHeight:1.4 } }, a.text),
        React.createElement('span', { style:{ fontSize:8, background:a.color+'22', color:a.color, padding:'2px 6px', borderRadius:2, fontFamily:"'Righteous',sans-serif" } }, a.tribe)
      ))
    )
  );
}

function RitualsScreen({ theme }) {
  const [filter, setFilter] = useState('ALL');
  const [joined, setJoined] = useState(null);
  const filters = ['ALL','LIVE','UPCOMING','DONE'];
  const rituals = [
    { id:1, name:'Ubuntu Gratitude Wave', tribe:'Ubuntu Circle', status:'LIVE', time:'4:32', participants:1247, slots:2000, color:'#7C3AFF', tier:3, icon:'◆', desc:'Share 3 gratitude moments with your Ubuntu family' },
    { id:2, name:'Breath of the Collective', tribe:'Zen Collective', status:'UPCOMING', time:'In 2h 15m', participants:892, slots:1500, color:'#00E5FF', tier:2, icon:'○', desc:'Guided breathing synchronization ritual for inner stillness' },
    { id:3, name:'Iron Pledge Renewal', tribe:'Iron Vow', status:'UPCOMING', time:'In 5h', participants:334, slots:500, color:'#FF8800', tier:4, icon:'▲', desc:'Renew your weekly iron commitment to the vow' },
    { id:4, name:'Sacred Root Ceremony', tribe:'Sacred Root', status:'DONE', time:'Yesterday', participants:756, slots:1000, color:'#00FF88', tier:2, icon:'✦', desc:'Ancestral connection visualization exercise' },
    { id:5, name:'Creative Surge Ritual', tribe:'Makers Guild', status:'UPCOMING', time:'Tomorrow 10AM', participants:412, slots:800, color:'#FF3366', tier:1, icon:'★', desc:'15-min creative sprint with full community accountability' },
  ];
  const list = filter === 'ALL' ? rituals : rituals.filter(r => r.status === filter);

  return React.createElement('div', { style:{ paddingBottom:8 } },
    // Asymmetric header
    React.createElement('div', { style:{ padding:'8px 20px 12px', position:'relative', overflow:'hidden' } },
      React.createElement('div', { style:{ position:'absolute', top:-10, right:-20, width:90, height:90, background:theme.primary, opacity:0.12, transform:'rotate(45deg)' } }),
      React.createElement('div', { style:{ position:'absolute', top:20, right:30, width:40, height:40, background:theme.accent, opacity:0.08, transform:'rotate(20deg)' } }),
      React.createElement('div', { style:{ fontSize:24, fontFamily:"'Righteous',sans-serif", color:theme.text, letterSpacing:2, position:'relative' } }, 'RITUAL WAVES'),
      React.createElement('div', { style:{ fontSize:11, color:theme.textSec, fontFamily:"'Inter',sans-serif", marginTop:2 } }, 'Synchronize with your tribe')
    ),

    // Filters
    React.createElement('div', { style:{ display:'flex', margin:'0 20px 14px', border:`1px solid ${theme.border}`, borderRadius:3, overflow:'hidden' } },
      ...filters.map(f => React.createElement('button', {
        key:f, onClick:() => setFilter(f),
        style:{ flex:1, padding:'8px 2px', background: filter===f ? theme.primary : theme.surface, color: filter===f ? '#FFF' : theme.textSec, border:'none', fontSize:9, fontFamily:"'Righteous',sans-serif", cursor:'pointer', letterSpacing:1 }
      }, f))
    ),

    React.createElement('div', { style:{ padding:'0 20px' } },
      ...list.map((r,i) => React.createElement('div', {
        key:r.id,
        style:{ background:theme.surface, border:`1px solid ${theme.border}`, borderTop:`3px solid ${r.color}`, borderRadius:'0 0 4px 4px', marginBottom:12, overflow:'hidden', position:'relative' }
      },
        React.createElement('div', { style:{ position:'absolute', top:0, right:0, width:50, height:50, background:r.color, opacity:0.07, transform:'rotate(45deg) translate(15px,-25px)' } }),
        React.createElement('div', { style:{ padding:'12px 14px', position:'relative', zIndex:1 } },
          React.createElement('div', { style:{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:5 } },
            React.createElement('div', null,
              React.createElement('div', { style:{ fontSize:13, fontFamily:"'Righteous',sans-serif", color:theme.text, marginBottom:3 } }, r.name),
              React.createElement('div', { style:{ display:'flex', alignItems:'center', gap:5 } },
                React.createElement('div', { style:{ width:14, height:14, background:r.color, borderRadius:1, display:'flex', alignItems:'center', justifyContent:'center', fontSize:7 } }, r.icon),
                React.createElement('span', { style:{ fontSize:9, color:r.color, fontFamily:"'Righteous',sans-serif" } }, r.tribe)
              )
            ),
            React.createElement('div', {
              style:{ padding:'3px 8px', background: r.status==='LIVE' ? '#FF336622' : r.status==='UPCOMING' ? theme.primary+'22' : theme.border, color: r.status==='LIVE' ? theme.red : r.status==='UPCOMING' ? theme.primaryLight : theme.textDim, fontSize:8, fontFamily:"'Righteous',sans-serif", borderRadius:2, letterSpacing:1, whiteSpace:'nowrap' }
            }, r.status==='LIVE' ? `● ${r.time}` : r.time)
          ),
          React.createElement('div', { style:{ fontSize:10, color:theme.textSec, fontFamily:"'Inter',sans-serif", marginBottom:10, lineHeight:1.4 } }, r.desc),
          React.createElement('div', { style:{ display:'flex', justifyContent:'space-between', alignItems:'center' } },
            React.createElement('div', { style:{ flex:1, marginRight:10 } },
              React.createElement('div', { style:{ display:'flex', justifyContent:'space-between', marginBottom:3 } },
                React.createElement('span', { style:{ fontSize:8, color:theme.textDim } }, `${r.participants.toLocaleString()} / ${r.slots.toLocaleString()}`),
                React.createElement('span', { style:{ fontSize:8, color:r.color, fontFamily:"'Righteous',sans-serif" } }, `TIER ${r.tier}`)
              ),
              React.createElement('div', { style:{ height:3, background:theme.surface2, borderRadius:2, overflow:'hidden' } },
                React.createElement('div', { style:{ height:'100%', width:`${(r.participants/r.slots)*100}%`, background:r.color, borderRadius:2 } })
              )
            ),
            r.status !== 'DONE' && React.createElement('button', {
              onClick: () => setJoined(r.id),
              style:{ background: joined===r.id ? r.color : r.status==='LIVE' ? r.color : 'transparent', color: joined===r.id ? '#000' : r.status==='LIVE' ? '#000' : r.color, border:`1.5px solid ${r.color}`, padding:'5px 10px', borderRadius:2, fontSize:9, fontFamily:"'Righteous',sans-serif", cursor:'pointer', whiteSpace:'nowrap' }
            }, joined===r.id ? '✓ JOINED' : r.status==='LIVE' ? 'JOIN NOW' : 'REMIND ME')
          )
        )
      ))
    )
  );
}

function TribeScreen({ theme }) {
  const [sel, setSel] = useState(0);
  const tribes = [
    { name:'Ubuntu Circle', members:847, tier:3, symbol:'◆', color:'#7C3AFF', rituals:24, streak:7, points:1840, identity:['African Heritage','Ubuntu Philosophy','Communal Growth'], desc:"Rooted in 'I am because we are'. Ubuntu Circle strengthens bonds through rhythmic gratitude." },
    { name:'Zen Collective', members:1203, tier:2, symbol:'○', color:'#00E5FF', rituals:18, streak:4, points:920, identity:['Mindfulness','Eastern Philosophy','Inner Peace'], desc:'Finding stillness together. Synchronized mindfulness rituals for collective calm.' },
    { name:'Iron Vow', members:521, tier:4, symbol:'▲', color:'#FF8800', rituals:31, streak:12, points:3200, identity:['Discipline','Physical Mastery','Accountability'], desc:'For those who commit without compromise. Iron Vow holds each other to the highest standards.' },
  ];
  const discover = [
    { name:'Makers Guild', members:2103, color:'#FF3366', symbol:'★', tier:1, identity:'Creativity & Innovation' },
    { name:'Sacred Root', members:934, color:'#00FF88', symbol:'✦', tier:2, identity:'Ancestral Wisdom' },
    { name:'Code Monks', members:445, color:'#FFB800', symbol:'⬡', tier:1, identity:'Tech & Mindfulness' },
  ];
  const t = tribes[sel];

  return React.createElement('div', { style:{ paddingBottom:8 } },
    // Asymmetric colored header with diagonal shards
    React.createElement('div', { style:{ position:'relative', overflow:'hidden', background:t.color, padding:'14px 20px 50px' } },
      React.createElement('div', { style:{ position:'absolute', top:-30, right:-30, width:130, height:130, background:'rgba(255,255,255,0.12)', transform:'rotate(22deg)' } }),
      React.createElement('div', { style:{ position:'absolute', top:10, right:60, width:50, height:50, background:'rgba(0,0,0,0.15)', transform:'rotate(-12deg)' } }),
      React.createElement('div', { style:{ position:'absolute', bottom:0, left:0, right:0, height:35, background:theme.bg, clipPath:'polygon(0 100%, 100% 15%, 100% 100%)' } }),
      React.createElement('div', { style:{ position:'relative', zIndex:1 } },
        React.createElement('div', { style:{ fontSize:10, color:'rgba(255,255,255,0.7)', fontFamily:"'Righteous',sans-serif", letterSpacing:3, marginBottom:4 } }, 'IDENTITY CAPSULE'),
        React.createElement('div', { style:{ fontSize:26, fontFamily:"'Righteous',sans-serif", color:'#FFF', fontWeight:700 } }, t.name),
        React.createElement('div', { style:{ display:'flex', gap:5, marginTop:6, flexWrap:'wrap' } },
          ...t.identity.map((tag,i) => React.createElement('span', { key:i, style:{ fontSize:8, background:'rgba(0,0,0,0.3)', color:'#FFF', padding:'2px 6px', borderRadius:2, fontFamily:"'Righteous',sans-serif" } }, tag))
        )
      )
    ),

    // Tribe selector tabs
    React.createElement('div', { style:{ display:'flex', gap:6, padding:'0 20px', marginTop:-18, position:'relative', zIndex:2, marginBottom:14 } },
      ...tribes.map((tr,i) => React.createElement('button', {
        key:i, onClick:() => setSel(i),
        style:{ flex:1, padding:'8px 3px', background: sel===i ? tr.color : theme.surface, border:`2px solid ${tr.color}`, borderRadius:3, color: sel===i ? '#000' : tr.color, fontSize:8, fontFamily:"'Righteous',sans-serif", cursor:'pointer', transition:'all 0.2s' }
      },
        React.createElement('div', { style:{ fontSize:14, marginBottom:2 } }, tr.symbol),
        tr.name.split(' ')[0]
      ))
    ),

    // Stats
    React.createElement('div', { style:{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:6, padding:'0 20px', marginBottom:14 } },
      [{ l:'RITUALS', v:t.rituals },{ l:'STREAK', v:`${t.streak}W` },{ l:'POINTS', v:t.points.toLocaleString() }].map((s,i) =>
        React.createElement('div', { key:i, style:{ background:theme.surface, border:`1px solid ${theme.border}`, borderTop:`2px solid ${t.color}`, padding:'10px 6px', textAlign:'center', borderRadius:'0 0 4px 4px' } },
          React.createElement('div', { style:{ fontSize:20, fontFamily:"'Righteous',sans-serif", color:t.color } }, s.v),
          React.createElement('div', { style:{ fontSize:8, color:theme.textSec, letterSpacing:1, marginTop:2 } }, s.l)
        )
      )
    ),

    // Description
    React.createElement('div', { style:{ padding:'0 20px', marginBottom:14 } },
      React.createElement('div', { style:{ background:theme.surface, borderLeft:`3px solid ${t.color}`, padding:'10px 12px', borderRadius:'0 4px 4px 0' } },
        React.createElement('div', { style:{ fontSize:10, color:theme.textSec, fontFamily:"'Inter',sans-serif", lineHeight:1.6 } }, t.desc),
        React.createElement('div', { style:{ marginTop:8, display:'flex', alignItems:'center', gap:5 } },
          React.createElement(window.lucide.Zap, { size:12, color:t.color }),
          React.createElement('span', { style:{ fontSize:10, color:t.color, fontFamily:"'Righteous',sans-serif" } }, 'Next ritual in 4h 32m')
        )
      )
    ),

    // Discover
    React.createElement('div', { style:{ padding:'0 20px' } },
      React.createElement('div', { style:{ fontSize:12, fontFamily:"'Righteous',sans-serif", color:theme.text, letterSpacing:1, marginBottom:10 } }, 'DISCOVER TRIBES'),
      ...discover.map((d,i) => React.createElement('div', {
        key:i,
        style:{ display:'flex', alignItems:'center', gap:10, background:theme.surface, border:`1px solid ${theme.border}`, padding:'10px 12px', borderRadius:4, marginBottom:8 }
      },
        React.createElement('div', { style:{ width:34, height:34, background:d.color+'22', border:`2px solid ${d.color}`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:14, transform:'rotate(-5deg)', flexShrink:0 } }, d.symbol),
        React.createElement('div', { style:{ flex:1 } },
          React.createElement('div', { style:{ fontSize:12, fontFamily:"'Righteous',sans-serif", color:theme.text, marginBottom:2 } }, d.name),
          React.createElement('div', { style:{ fontSize:9, color:theme.textSec } }, d.identity),
          React.createElement('div', { style:{ fontSize:8, color:d.color, marginTop:1 } }, `${d.members.toLocaleString()} members · TIER ${d.tier}`)
        ),
        React.createElement('button', {
          style:{ background:'transparent', color:d.color, border:`1.5px solid ${d.color}`, padding:'4px 10px', borderRadius:2, fontSize:9, fontFamily:"'Righteous',sans-serif", cursor:'pointer' }
        }, 'JOIN')
      ))
    )
  );
}

function PulseScreen({ theme }) {
  const bars = [60,80,45,95,70,88,75];
  const mx = Math.max(...bars);
  const days = ['M','T','W','T','F','S','S'];
  const achievements = [
    { name:'Ritual Devotee', desc:'30-day streak completed', color:'#7C3AFF', unlocked:true, icon:'◆' },
    { name:'Wave Rider', desc:'Joined 10 live ritual waves', color:'#00E5FF', unlocked:true, icon:'~' },
    { name:'Tier Ascendant', desc:'Reached Tier 3 status', color:'#FF8800', unlocked:true, icon:'▲' },
    { name:'Story Keeper', desc:'Complete 5 story rituals', color:'#00FF88', unlocked:false, icon:'✦' },
    { name:'Tribal Elder', desc:'Lead 3 community rituals', color:'#FF3366', unlocked:false, icon:'★' },
  ];

  return React.createElement('div', { style:{ paddingBottom:8 } },
    React.createElement('div', { style:{ padding:'6px 20px 12px' } },
      React.createElement('div', { style:{ fontSize:24, fontFamily:"'Righteous',sans-serif", color:theme.text, letterSpacing:2 } }, 'PULSE POINTS'),
      React.createElement('div', { style:{ fontSize:11, color:theme.textSec } }, 'Your energy. Tracked. Celebrated.')
    ),

    // Big score card
    React.createElement('div', { style:{ margin:'0 20px 14px', background:theme.surface, border:`1px solid ${theme.border}`, borderRadius:4, padding:18, position:'relative', overflow:'hidden' } },
      React.createElement('div', { style:{ position:'absolute', right:-20, top:-20, width:110, height:110, background:theme.primary, opacity:0.08, transform:'rotate(30deg)' } }),
      React.createElement('div', { style:{ position:'absolute', left:0, bottom:0, width:80, height:80, background:theme.accent, opacity:0.04, transform:'rotate(-15deg)' } }),
      React.createElement('div', { style:{ display:'flex', alignItems:'flex-end', gap:4, position:'relative', zIndex:1 } },
        React.createElement('div', { style:{ fontSize:54, fontFamily:"'Righteous',sans-serif", color:theme.primary, lineHeight:1 } }, '3,240'),
        React.createElement('div', { style:{ fontSize:14, color:theme.accent, marginBottom:8, fontFamily:"'Righteous',sans-serif" } }, 'PTS')
      ),
      React.createElement('div', { style:{ marginTop:12, position:'relative', zIndex:1 } },
        React.createElement('div', { style:{ display:'flex', justifyContent:'space-between', marginBottom:4 } },
          React.createElement('span', { style:{ fontSize:9, color:theme.accent, fontFamily:"'Righteous',sans-serif" } }, '● TIER 3'),
          React.createElement('span', { style:{ fontSize:9, color:theme.textSec } }, '760 pts to Tier 4'),
          React.createElement('span', { style:{ fontSize:9, color:theme.primary, fontFamily:"'Righteous',sans-serif" } }, 'TIER 4 ●')
        ),
        React.createElement('div', { style:{ height:8, background:theme.surface2, borderRadius:2, overflow:'hidden' } },
          React.createElement('div', { style:{ height:'100%', width:'81%', background:`linear-gradient(90deg, ${theme.primary}, ${theme.accent})`, borderRadius:2 } })
        )
      )
    ),

    // Weekly chart
    React.createElement('div', { style:{ padding:'0 20px 14px' } },
      React.createElement('div', { style:{ fontSize:12, fontFamily:"'Righteous',sans-serif", color:theme.text, letterSpacing:1, marginBottom:10 } }, 'THIS WEEK'),
      React.createElement('div', { style:{ background:theme.surface, border:`1px solid ${theme.border}`, borderRadius:4, padding:'14px 12px' } },
        React.createElement('div', { style:{ display:'flex', alignItems:'flex-end', gap:6, height:80, marginBottom:8 } },
          ...bars.map((v,i) => React.createElement('div', { key:i, style:{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:3 } },
            React.createElement('div', { style:{ width:'100%', height:`${(v/mx)*66}px`, background: i===6 ? theme.accent : i===5 ? theme.primary : theme.primary+'55', borderRadius:'2px 2px 0 0' } }),
            React.createElement('span', { style:{ fontSize:8, color:theme.textSec } }, days[i])
          ))
        ),
        React.createElement('div', { style:{ display:'flex', justifyContent:'space-around', borderTop:`1px solid ${theme.border}`, paddingTop:10 } },
          [{ l:'RITUALS', v:'7' },{ l:'STREAK', v:'7d' },{ l:'+POINTS', v:'580' }].map((s,i) =>
            React.createElement('div', { key:i, style:{ textAlign:'center' } },
              React.createElement('div', { style:{ fontSize:18, fontFamily:"'Righteous',sans-serif", color:theme.accent } }, s.v),
              React.createElement('div', { style:{ fontSize:7, color:theme.textSec, letterSpacing:1, marginTop:2 } }, s.l)
            )
          )
        )
      )
    ),

    // Achievements
    React.createElement('div', { style:{ padding:'0 20px' } },
      React.createElement('div', { style:{ fontSize:12, fontFamily:"'Righteous',sans-serif", color:theme.text, letterSpacing:1, marginBottom:10 } }, 'ACHIEVEMENTS'),
      ...achievements.map((a,i) => React.createElement('div', {
        key:i,
        style:{ display:'flex', alignItems:'center', gap:10, background:theme.surface, border:`1px solid ${a.unlocked ? a.color : theme.border}`, padding:'10px 12px', borderRadius:4, marginBottom:6, opacity: a.unlocked ? 1 : 0.5 }
      },
        React.createElement('div', { style:{ width:30, height:30, flexShrink:0, background: a.unlocked ? a.color : theme.surface2, display:'flex', alignItems:'center', justifyContent:'center', borderRadius:2, fontSize:13, transform:'rotate(8deg)' } },
          a.unlocked ? a.icon : React.createElement(window.lucide.Lock, { size:11, color:theme.textDim })
        ),
        React.createElement('div', { style:{ flex:1 } },
          React.createElement('div', { style:{ fontSize:11, fontFamily:"'Righteous',sans-serif", color: a.unlocked ? theme.text : theme.textSec } }, a.name),
          React.createElement('div', { style:{ fontSize:9, color:theme.textDim, marginTop:1 } }, a.desc)
        ),
        a.unlocked && React.createElement(window.lucide.CheckCircle, { size:14, color:a.color })
      ))
    )
  );
}

function ProfileScreen({ theme, isDark, setIsDark }) {
  const [notifs, setNotifs] = useState(true);
  const groups = [
    { title:'APPEARANCE', items:[
      { label:'Dark Mode', icon:window.lucide.Moon, toggle:true, val:isDark, fn:() => setIsDark(!isDark) },
      { label:'Notifications', icon:window.lucide.Bell, toggle:true, val:notifs, fn:() => setNotifs(!notifs) },
    ]},
    { title:'ACCOUNT', items:[
      { label:'Identity Profile', icon:window.lucide.User, toggle:false },
      { label:'Tribe Invites', icon:window.lucide.Users, toggle:false },
      { label:'Privacy Settings', icon:window.lucide.Shield, toggle:false },
    ]},
    { title:'RITUAL PREFS', items:[
      { label:'Ritual Reminders', icon:window.lucide.Clock, toggle:false },
      { label:'Language & Region', icon:window.lucide.Globe, toggle:false },
    ]},
  ];

  return React.createElement('div', { style:{ paddingBottom:8 } },
    // Asymmetric profile header
    React.createElement('div', { style:{ position:'relative', overflow:'hidden', background:theme.surface, padding:'16px 20px 18px', borderBottom:`1px solid ${theme.border}` } },
      React.createElement('div', { style:{ position:'absolute', top:-40, right:-40, width:150, height:150, background:theme.primary, opacity:0.1, transform:'rotate(20deg)' } }),
      React.createElement('div', { style:{ position:'absolute', bottom:-15, left:100, width:80, height:50, background:theme.accent, opacity:0.06, transform:'rotate(-18deg)' } }),
      React.createElement('div', { style:{ display:'flex', gap:14, alignItems:'flex-start', position:'relative', zIndex:1 } },
        React.createElement('div', {
          style:{ width:62, height:62, background:`linear-gradient(135deg,${theme.primary},${theme.accent})`, borderRadius:4, display:'flex', alignItems:'center', justifyContent:'center', fontSize:20, fontFamily:"'Righteous',sans-serif", color:'#FFF', transform:'rotate(-3deg)', flexShrink:0, border:`2px solid ${theme.primary}` }
        }, 'ZO'),
        React.createElement('div', { style:{ flex:1 } },
          React.createElement('div', { style:{ fontSize:20, fontFamily:"'Righteous',sans-serif", color:theme.text } }, 'Zara Osei'),
          React.createElement('div', { style:{ fontSize:11, color:theme.textSec, marginBottom:7 } }, '@zara.ubuntu'),
          React.createElement('div', { style:{ display:'flex', gap:5, flexWrap:'wrap' } },
            [['Ubuntu','#7C3AFF'],['Zen','#00E5FF'],['Iron Vow','#FF8800']].map(([tag,c],i) =>
              React.createElement('span', { key:i, style:{ fontSize:8, background:c+'22', color:c, padding:'2px 6px', borderRadius:2, fontFamily:"'Righteous',sans-serif" } }, tag)
            )
          )
        )
      ),
      React.createElement('div', { style:{ display:'flex', marginTop:14, background:theme.surface2, borderRadius:4, overflow:'hidden', position:'relative', zIndex:1 } },
        [{ l:'TRIBES', v:'3' },{ l:'RITUALS', v:'73' },{ l:'PULSE PTS', v:'3.2K' },{ l:'STREAK', v:'7d' }].map((s,i) =>
          React.createElement('div', { key:i, style:{ flex:1, textAlign:'center', padding:'8px 3px', borderRight: i<3 ? `1px solid ${theme.border}` : 'none' } },
            React.createElement('div', { style:{ fontSize:15, fontFamily:"'Righteous',sans-serif", color:theme.primary } }, s.v),
            React.createElement('div', { style:{ fontSize:7, color:theme.textSec, letterSpacing:1, marginTop:1 } }, s.l)
          )
        )
      )
    ),

    // Settings
    React.createElement('div', { style:{ padding:'12px 20px' } },
      ...groups.map((g,gi) => React.createElement('div', { key:gi, style:{ marginBottom:14 } },
        React.createElement('div', { style:{ fontSize:9, color:theme.textSec, fontFamily:"'Righteous',sans-serif", letterSpacing:2, marginBottom:6 } }, g.title),
        React.createElement('div', { style:{ background:theme.surface, border:`1px solid ${theme.border}`, borderRadius:4, overflow:'hidden' } },
          ...g.items.map((item,ii) => React.createElement('div', {
            key:ii, onClick: item.fn,
            style:{ display:'flex', alignItems:'center', gap:10, padding:'12px 14px', borderBottom: ii < g.items.length-1 ? `1px solid ${theme.border}` : 'none', cursor:'pointer' }
          },
            React.createElement(item.icon, { size:15, color:theme.textSec }),
            React.createElement('span', { style:{ flex:1, fontSize:13, color:theme.text, fontFamily:"'Inter',sans-serif" } }, item.label),
            item.toggle
              ? React.createElement('div', { style:{ width:34, height:19, background: item.val ? theme.primary : theme.border, borderRadius:10, position:'relative', transition:'background 0.2s' } },
                  React.createElement('div', { style:{ position:'absolute', top:2, left: item.val ? 17 : 2, width:15, height:15, background:'#FFF', borderRadius:'50%', transition:'left 0.2s' } })
                )
              : React.createElement(window.lucide.ChevronRight, { size:14, color:theme.textDim })
          ))
        )
      ))
    ),

    React.createElement('div', { style:{ padding:'0 20px' } },
      React.createElement('button', { style:{ width:'100%', padding:'12px', background:'transparent', border:`1.5px solid ${theme.red}`, color:theme.red, borderRadius:4, fontSize:12, fontFamily:"'Righteous',sans-serif", cursor:'pointer', letterSpacing:1 } }, 'SIGN OUT')
    )
  );
}

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isDark, setIsDark] = useState(true);
  const theme = isDark ? themes.dark : themes.light;

  const tabs = [
    { id:'home', label:'Home', icon:window.lucide.Home },
    { id:'rituals', label:'Rituals', icon:window.lucide.Zap },
    { id:'tribe', label:'Tribe', icon:window.lucide.Users },
    { id:'pulse', label:'Pulse', icon:window.lucide.Activity },
    { id:'profile', label:'Me', icon:window.lucide.User },
  ];

  const screens = { home:HomeScreen, rituals:RitualsScreen, tribe:TribeScreen, pulse:PulseScreen, profile:ProfileScreen };

  const navItemStyle = (isActive, c) => ({
    display:'flex', flexDirection:'column', alignItems:'center', gap:3,
    padding:'8px 6px 4px',
    cursor:'pointer', flex:1,
    color: isActive ? theme.primary : theme.textDim,
    transition:'color 0.15s',
  });
  const labelStyle = { fontSize:9, fontFamily:"'Righteous',sans-serif", letterSpacing:0.5 };

  return React.createElement('div', {
    style:{ minHeight:'100vh', background:'#f0f0f0', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'Righteous',sans-serif" }
  },
    React.createElement('style', null, `
      @import url('https://fonts.googleapis.com/css2?family=Righteous&family=Inter:wght@300;400;500;600&display=swap');
      @keyframes pulseAnim { 0%,100% { opacity:1; } 50% { opacity:0.3; } }
      ::-webkit-scrollbar { display: none; }
    `),
    React.createElement('div', {
      style:{ width:375, height:812, background:theme.bg, borderRadius:44, overflow:'hidden', position:'relative', display:'flex', flexDirection:'column', boxShadow:'0 40px 100px rgba(0,0,0,0.45)', border:`1px solid ${theme.border}`, transition:'background 0.3s' }
    },
      React.createElement(StatusBar, { theme }),
      React.createElement(DynamicIsland, { theme, active: activeTab === 'rituals' }),

      React.createElement('div', { style:{ flex:1, overflowY:'auto', overflowX:'hidden' } },
        React.createElement(screens[activeTab], { theme, isDark, setIsDark, setActiveTab })
      ),

      // Bottom nav
      React.createElement('div', {
        style:{ display:'flex', background:theme.navBg, borderTop:`1px solid ${theme.border}`, paddingBottom:8 }
      },
        tabs.map(tab => React.createElement('div', {
          key: tab.id,
          onClick: () => setActiveTab(tab.id),
          style: navItemStyle(activeTab === tab.id),
        },
          React.createElement(tab.icon, { size:22 }),
          React.createElement('span', { style: labelStyle }, tab.label)
        ))
      )
    )
  );
}
