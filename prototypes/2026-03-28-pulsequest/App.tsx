const { useState, useEffect, useRef } = React;

// ── THEMES ──────────────────────────────────────────────────────────────────
const themes = {
  dark: {
    bg: '#07070F',
    surface: '#0F0F1E',
    card: '#141426',
    cardAlt: '#1A1A30',
    text: '#F0F0FF',
    textSec: '#7575A0',
    textTert: '#45456A',
    primary: '#8B5CF6',
    primaryDim: 'rgba(139,92,246,0.18)',
    primaryGlow: 'rgba(139,92,246,0.35)',
    pink: '#EC4899',
    pinkDim: 'rgba(236,72,153,0.15)',
    cyan: '#22D3EE',
    cyanDim: 'rgba(34,211,238,0.12)',
    green: '#10B981',
    greenDim: 'rgba(16,185,129,0.15)',
    orange: '#F59E0B',
    orangeDim: 'rgba(245,158,11,0.15)',
    red: '#EF4444',
    border: '#1C1C32',
    borderMid: '#28284A',
    nav: '#0A0A17',
    pill: '#181830',
    grad1: 'linear-gradient(135deg, #4C1D95 0%, #7C3AED 55%, #DB2777 100%)',
    grad2: 'linear-gradient(135deg, #0A1A2E 0%, #0F1A30 100%)',
    gradProfile: 'linear-gradient(180deg, #170B30 0%, #07070F 100%)',
  },
  light: {
    bg: '#EEEEF8',
    surface: '#FFFFFF',
    card: '#F8F8FF',
    cardAlt: '#F0F0FF',
    text: '#0A0A1F',
    textSec: '#60608A',
    textTert: '#9090BB',
    primary: '#7C3AED',
    primaryDim: 'rgba(124,58,237,0.10)',
    primaryGlow: 'rgba(124,58,237,0.22)',
    pink: '#DB2777',
    pinkDim: 'rgba(219,39,119,0.09)',
    cyan: '#0891B2',
    cyanDim: 'rgba(8,145,178,0.09)',
    green: '#059669',
    greenDim: 'rgba(5,150,105,0.09)',
    orange: '#D97706',
    orangeDim: 'rgba(217,119,6,0.09)',
    red: '#DC2626',
    border: '#E2E2F4',
    borderMid: '#D4D4EE',
    nav: '#FFFFFF',
    pill: '#EEE8FF',
    grad1: 'linear-gradient(135deg, #6D28D9 0%, #7C3AED 55%, #DB2777 100%)',
    grad2: 'linear-gradient(135deg, #EEF0FF 0%, #F5F0FF 100%)',
    gradProfile: 'linear-gradient(180deg, #EDE8FF 0%, #EEEEF8 100%)',
  },
};

// ── SHARED COMPONENTS ────────────────────────────────────────────────────────
const Avatar = ({ name, color, size = 36 }) => (
  <div style={{
    width: size, height: size, borderRadius: '50%', background: color,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: size * 0.38, fontWeight: 700, color: '#FFF', flexShrink: 0,
  }}>{name[0].toUpperCase()}</div>
);

const Bar = ({ value, color, bg, h = 6 }) => (
  <div style={{ background: bg, borderRadius: h, height: h, overflow: 'hidden' }}>
    <div style={{ width: `${value}%`, height: '100%', background: color, borderRadius: h }} />
  </div>
);

const Pill = ({ label, color, bg }) => (
  <span style={{
    fontSize: 10, fontWeight: 700, color, background: bg,
    padding: '3px 8px', borderRadius: 20, letterSpacing: '0.2px', textTransform: 'uppercase',
  }}>{label}</span>
);

// ── HOME SCREEN ──────────────────────────────────────────────────────────────
const HomeScreen = ({ theme, isDark }) => {
  const missions = [
    { title: 'Deep Focus Sprint', desc: '3 uninterrupted work blocks · 2h left', pct: 67, color: theme.primary, icon: '🧠' },
    { title: 'Creative Surge', desc: 'Share a breakthrough clip · 18h left', pct: 33, color: theme.pink, icon: '✨' },
  ];
  const activity = [
    { user: 'Maya', action: 'uploaded a Pulse Clip', time: '2m ago', color: theme.pink },
    { user: 'Kai', action: 'completed Deep Focus +340 pts', time: '15m ago', color: theme.green },
    { user: 'Sam', action: 'unlocked ✦ Zen Realm', time: '1h ago', color: theme.cyan },
  ];
  return (
    <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 20 }}>
      {/* Greeting */}
      <div style={{ padding: '14px 16px 0' }}>
        <div style={{ fontSize: 11, color: theme.textTert, fontWeight: 600, letterSpacing: '0.4px', textTransform: 'uppercase' }}>Saturday · Mar 28</div>
        <div style={{ fontSize: 22, fontWeight: 800, color: theme.text, marginTop: 2, lineHeight: 1.2 }}>Morning, Alex 👋</div>
        <div style={{ fontSize: 12, color: theme.textSec, marginTop: 3 }}>Flow Squad is crushing it today</div>
      </div>

      {/* Squad Score Card */}
      <div style={{ padding: '14px 16px 0' }}>
        <div style={{ background: theme.grad1, borderRadius: 22, padding: '20px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -35, right: -35, width: 140, height: 140, borderRadius: '50%', background: 'rgba(255,255,255,0.07)' }} />
          <div style={{ position: 'absolute', bottom: -25, left: 20, width: 90, height: 90, borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.6)', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }}>Squad Pulse Score</div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10, marginTop: 4 }}>
            <div style={{ fontSize: 46, fontWeight: 900, color: '#FFF', letterSpacing: '-2px', lineHeight: 1 }}>2,847</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', marginBottom: 7 }}>↑ +342 this week</div>
          </div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)', marginTop: 2 }}>#3 globally · Top 5% of squads</div>
          <div style={{ display: 'flex', alignItems: 'center', marginTop: 18 }}>
            {[['M','#FF6B6B'],['K','#10B981'],['S','#22D3EE'],['A','#8B5CF6']].map(([n,c],i) => (
              <div key={i} style={{
                width: 28, height: 28, borderRadius: '50%', background: c,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 10, fontWeight: 700, color: '#FFF',
                border: '2px solid rgba(255,255,255,0.35)', marginLeft: i > 0 ? -7 : 0, zIndex: 4 - i,
              }}>{n}</div>
            ))}
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.75)', fontWeight: 600, marginLeft: 10 }}>Flow Squad</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{ padding: '12px 16px 0', display: 'flex', gap: 10 }}>
        {[
          { label: '+ Pulse Clip', color: theme.primary, bg: theme.primaryDim, border: theme.primary, icon: '📹' },
          { label: '✦ Mystery Box', color: theme.orange, bg: theme.orangeDim, border: theme.orange, icon: '🎁' },
        ].map((b, i) => (
          <div key={i} style={{
            flex: 1, background: b.bg, border: `1px solid ${b.border}35`,
            borderRadius: 14, padding: '13px 8px', textAlign: 'center', cursor: 'pointer',
          }}>
            <div style={{ fontSize: 18, marginBottom: 4 }}>{b.icon}</div>
            <div style={{ fontSize: 12, fontWeight: 700, color: b.color }}>{b.label}</div>
          </div>
        ))}
      </div>

      {/* Active Missions */}
      <div style={{ padding: '16px 16px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: theme.text }}>Active Missions</div>
          <div style={{ fontSize: 12, color: theme.primary, fontWeight: 700 }}>View all →</div>
        </div>
        {missions.map((m, i) => (
          <div key={i} style={{
            background: theme.card, borderRadius: 16, padding: '14px',
            border: `1px solid ${theme.border}`, marginBottom: 10,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: theme.text, marginBottom: 3 }}>{m.icon} {m.title}</div>
                <div style={{ fontSize: 11, color: theme.textSec }}>{m.desc}</div>
              </div>
              <div style={{ fontSize: 20, fontWeight: 900, color: m.color, marginLeft: 10 }}>{m.pct}%</div>
            </div>
            <Bar value={m.pct} color={m.color} bg={theme.border} />
          </div>
        ))}
      </div>

      {/* Squad Activity */}
      <div style={{ padding: '4px 16px 0' }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: theme.text, marginBottom: 10 }}>Squad Activity</div>
        {activity.map((a, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 11, padding: '10px 0',
            borderBottom: i < activity.length - 1 ? `1px solid ${theme.border}` : 'none',
          }}>
            <Avatar name={a.user} color={a.color} size={33} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, color: theme.text }}>
                <span style={{ fontWeight: 700 }}>{a.user}</span>
                <span style={{ color: theme.textSec }}> {a.action}</span>
              </div>
              <div style={{ fontSize: 10, color: theme.textTert, marginTop: 2 }}>{a.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ── MISSIONS SCREEN ──────────────────────────────────────────────────────────
const MissionsScreen = ({ theme, isDark }) => {
  const [filter, setFilter] = useState('all');
  const filters = ['all', 'active', 'mystery', 'done'];
  const list = [
    { id:1, tag:'active',  emoji:'🧘', title:'Zen Flow State',       cat:'Deep Work',  desc:'Enter 4 deep focus blocks without switching apps. Track thoughts between each.',      xp:500, diff:'Hard',    dur:'48h', progress:50, color:theme.primary, members:3 },
    { id:2, tag:'mystery', emoji:'🎁', title:'⚡ MYSTERY MISSION',   cat:'???',        desc:'Requirements evolve as your squad submits clips. Adaptability is the entire point.',  xp:'???',diff:'Unknown',dur:'24h', progress:0,  color:theme.orange,  members:4 },
    { id:3, tag:'active',  emoji:'🎨', title:'Creative Cascade',     cat:'Creativity', desc:'Share 3 clips showing real idea pivots — the messier the pivot, the higher the score.',xp:350, diff:'Medium',  dur:'36h', progress:33, color:theme.pink,    members:2 },
    { id:4, tag:'active',  emoji:'🗺️', title:'Discovery Walk',       cat:'Exploration',desc:'Complete 2 tasks in a completely different environment. Document the vibe shift.',     xp:280, diff:'Easy',    dur:'72h', progress:0,  color:theme.cyan,    members:4 },
    { id:5, tag:'done',    emoji:'🦉', title:'Night Owl Sprint',      cat:'Deep Work',  desc:'Two focused sessions after 9pm. Squad discovered 3 new workflows from this one.',     xp:420, diff:'Medium',  dur:'Done', progress:100,color:theme.green,   members:4 },
  ];
  const shown = filter === 'all' ? list : list.filter(m => m.tag === filter);
  const dc = { Easy: theme.green, Medium: theme.orange, Hard: theme.red, Unknown: theme.orange };

  return (
    <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 20 }}>
      <div style={{ padding: '14px 16px 0' }}>
        <div style={{ fontSize: 22, fontWeight: 800, color: theme.text }}>Mystery Missions</div>
        <div style={{ fontSize: 12, color: theme.textSec, marginTop: 3, marginBottom: 14 }}>Shape your squad's challenge landscape</div>
        <div style={{ display: 'flex', gap: 8, marginBottom: 14, overflowX: 'auto', paddingBottom: 2 }}>
          {filters.map(f => (
            <div key={f} onClick={() => setFilter(f)} style={{
              padding: '7px 16px', borderRadius: 20, fontSize: 11, fontWeight: 700,
              background: filter === f ? theme.primary : theme.pill,
              color: filter === f ? '#FFF' : theme.textSec,
              cursor: 'pointer', flexShrink: 0, textTransform: 'capitalize',
            }}>{f === 'done' ? 'Completed' : f}</div>
          ))}
        </div>
      </div>
      <div style={{ padding: '0 16px' }}>
        {shown.map(m => (
          <div key={m.id} style={{
            background: m.tag === 'mystery'
              ? (isDark ? 'linear-gradient(135deg,#130A20,#1E0E35)' : 'linear-gradient(135deg,#F5EEFF,#FFF0FA)')
              : theme.card,
            borderRadius: 18, padding: '16px',
            border: `1px solid ${m.tag === 'mystery' ? m.color + '40' : theme.border}`,
            marginBottom: 12, position: 'relative', overflow: 'hidden',
          }}>
            {m.tag === 'done' && (
              <div style={{ position:'absolute', top:12, right:12, background:theme.green, color:'#FFF', fontSize:9, fontWeight:700, padding:'3px 8px', borderRadius:10 }}>✓ DONE</div>
            )}
            <div style={{ display:'flex', gap:12, marginBottom:10 }}>
              <div style={{ width:44, height:44, borderRadius:12, background:`${m.color}20`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:22, flexShrink:0 }}>{m.emoji}</div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:14, fontWeight:800, color: m.tag === 'mystery' ? m.color : theme.text, marginBottom:5 }}>{m.title}</div>
                <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
                  <Pill label={m.cat} color={m.color} bg={`${m.color}20`} />
                  <Pill label={m.diff} color={dc[m.diff]||theme.textSec} bg={`${dc[m.diff]||theme.textSec}15`} />
                </div>
              </div>
            </div>
            <div style={{ fontSize:12, color:theme.textSec, lineHeight:1.55, marginBottom:12 }}>{m.desc}</div>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              <div style={{ display:'flex', gap:12 }}>
                <span style={{ fontSize:11, color:theme.textTert }}>⏱ {m.dur}</span>
                <span style={{ fontSize:11, color:theme.textTert }}>👥 {m.members}/4</span>
                <span style={{ fontSize:11, color:m.color, fontWeight:700 }}>+{m.xp} XP</span>
              </div>
              {m.tag !== 'done' && (
                <div style={{ background:m.color, color:'#FFF', fontSize:11, fontWeight:700, padding:'6px 13px', borderRadius:10, cursor:'pointer' }}>
                  {m.tag === 'mystery' ? '🎁 Reveal' : 'Join →'}
                </div>
              )}
            </div>
            {m.progress > 0 && m.tag !== 'done' && (
              <div style={{ marginTop:12 }}><Bar value={m.progress} color={m.color} bg={theme.border} /></div>
            )}
            {m.tag === 'done' && (
              <div style={{ marginTop:12 }}><Bar value={100} color={theme.green} bg={theme.border} /></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// ── PULSE SCREEN ─────────────────────────────────────────────────────────────
const PulseScreen = ({ theme, isDark }) => {
  const [liked, setLiked] = useState({});

  const clips = [
    { id:1, user:'Maya Chen', handle:'@mayac', avatar:'M', aColor:'#FF6B6B', time:'12 min ago', dur:'0:15',
      caption:'Had a HUGE breakthrough organizing research notes with color-coding. Productivity jumped 40% 🧠✨',
      tags:['#ZenFlow','#DeepWork'], mission:'Zen Flow State', likes:24, comments:8,
      bg: isDark ? '#1A0A22' : '#FFF0F8', accent:'#FF6B6B' },
    { id:2, user:'Kai Torres', handle:'@kaitor', avatar:'K', aColor:'#10B981', time:'43 min ago', dur:'0:14',
      caption:'Tried working from the rooftop terrace today. The environment shift completely rewired my focus 🏙️🌿',
      tags:['#DiscoveryWalk','#Exploration'], mission:'Discovery Walk', likes:31, comments:12,
      bg: isDark ? '#0A1A14' : '#F0FFF6', accent:'#10B981' },
    { id:3, user:'Sam Rivera', handle:'@samriv', avatar:'S', aColor:'#22D3EE', time:'2h ago', dur:'0:15',
      caption:'We just remixed the Night Owl mission into a new 4-day challenge using our clips 🦉🔥 This is genius.',
      tags:['#ChallengeRemix','#NightOwl'], mission:'Night Owl Sprint', likes:47, comments:19,
      bg: isDark ? '#0A1622' : '#F0F5FF', accent:'#22D3EE' },
  ];

  return (
    <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 20 }}>
      <div style={{ padding:'14px 16px 12px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <div>
          <div style={{ fontSize:22, fontWeight:800, color:theme.text }}>Pulse Clips</div>
          <div style={{ fontSize:12, color:theme.textSec, marginTop:2 }}>Real work moments · 15 sec</div>
        </div>
        <div style={{ background:theme.primary, color:'#FFF', padding:'9px 14px', borderRadius:12, fontSize:12, fontWeight:700, cursor:'pointer', display:'flex', alignItems:'center', gap:6 }}>
          📹 Record
        </div>
      </div>

      <div style={{ padding:'0 16px' }}>
        {clips.map(clip => (
          <div key={clip.id} style={{ background:theme.card, borderRadius:20, border:`1px solid ${theme.border}`, marginBottom:16, overflow:'hidden' }}>
            {/* Video preview */}
            <div style={{ background:clip.bg, height:165, position:'relative', display:'flex', alignItems:'center', justifyContent:'center', borderBottom:`1px solid ${theme.border}` }}>
              {/* Waveform decoration */}
              <div style={{ position:'absolute', bottom:0, left:0, right:0, height:40, display:'flex', alignItems:'flex-end', padding:'0 12px', gap:3, opacity:0.35 }}>
                {[18,26,14,32,22,28,12,36,20,24,16,30,22,18,34,14,28,20,16,24].map((h,i) => (
                  <div key={i} style={{ flex:1, height:`${h}px`, background:clip.accent, borderRadius:2 }} />
                ))}
              </div>
              <div style={{ width:54, height:54, borderRadius:'50%', background:clip.accent, display:'flex', alignItems:'center', justifyContent:'center', boxShadow:`0 0 24px ${clip.accent}55` }}>
                <span style={{ fontSize:20, marginLeft:3 }}>▶</span>
              </div>
              <div style={{ position:'absolute', bottom:10, right:10, background:'rgba(0,0,0,0.55)', color:'#FFF', fontSize:10, fontWeight:700, padding:'3px 8px', borderRadius:6 }}>{clip.dur}</div>
              <div style={{ position:'absolute', top:10, left:10, background:`${clip.accent}CC`, color:'#FFF', fontSize:10, fontWeight:700, padding:'3px 9px', borderRadius:8 }}>⚡ {clip.mission}</div>
            </div>
            {/* Info */}
            <div style={{ padding:'13px' }}>
              <div style={{ display:'flex', gap:10, marginBottom:9 }}>
                <Avatar name={clip.user} color={clip.aColor} size={32} />
                <div>
                  <div style={{ fontSize:13, fontWeight:700, color:theme.text }}>{clip.user}</div>
                  <div style={{ fontSize:10, color:theme.textTert }}>{clip.handle} · {clip.time}</div>
                </div>
              </div>
              <div style={{ fontSize:13, color:theme.text, lineHeight:1.55, marginBottom:9 }}>{clip.caption}</div>
              <div style={{ display:'flex', gap:8, marginBottom:11, flexWrap:'wrap' }}>
                {clip.tags.map((t,i) => <span key={i} style={{ fontSize:11, color:clip.accent, fontWeight:700 }}>{t}</span>)}
              </div>
              <div style={{ display:'flex', gap:18, borderTop:`1px solid ${theme.border}`, paddingTop:10 }}>
                <div onClick={() => setLiked(p => ({...p,[clip.id]:!p[clip.id]}))} style={{ display:'flex', alignItems:'center', gap:5, cursor:'pointer' }}>
                  <span style={{ fontSize:15 }}>{liked[clip.id] ? '❤️' : '🤍'}</span>
                  <span style={{ fontSize:12, color:liked[clip.id] ? '#EF4444' : theme.textSec, fontWeight:600 }}>{liked[clip.id] ? clip.likes+1 : clip.likes}</span>
                </div>
                <div style={{ display:'flex', alignItems:'center', gap:5 }}>
                  <span style={{ fontSize:14 }}>💬</span>
                  <span style={{ fontSize:12, color:theme.textSec, fontWeight:600 }}>{clip.comments}</span>
                </div>
                <div style={{ display:'flex', alignItems:'center', gap:5, cursor:'pointer' }}>
                  <span style={{ fontSize:14 }}>🔄</span>
                  <span style={{ fontSize:12, color:theme.textSec, fontWeight:600 }}>Remix</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ── SQUAD SCREEN ─────────────────────────────────────────────────────────────
const SquadScreen = ({ theme, isDark }) => {
  const members = [
    { name:'Alex (You)', avatar:'A', color:theme.primary, score:1240, clips:8,  streak:5, rank:1 },
    { name:'Maya Chen',  avatar:'M', color:'#FF6B6B',      score:980,  clips:12, streak:7, rank:2 },
    { name:'Kai Torres', avatar:'K', color:'#10B981',       score:760,  clips:6,  streak:3, rank:3 },
    { name:'Sam Rivera', avatar:'S', color:'#22D3EE',       score:630,  clips:9,  streak:4, rank:4 },
  ];
  const total = members.reduce((a,m) => a + m.score, 0);
  const realms = [
    { name:'Focus Forest', emoji:'🌲', color:theme.green,  unlocked:true },
    { name:'Zen Peaks',    emoji:'🏔️', color:theme.cyan,   unlocked:true },
    { name:'Night Lab',    emoji:'🌙', color:theme.primary,unlocked:false },
  ];

  return (
    <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 20 }}>
      <div style={{ padding:'14px 16px 0' }}>
        <div style={{ fontSize:22, fontWeight:800, color:theme.text }}>Flow Squad</div>
        <div style={{ fontSize:12, color:theme.textSec, marginTop:2, marginBottom:14 }}>Co-op scoreboard · Week 12</div>

        {/* Combined Score */}
        <div style={{
          background: isDark ? theme.grad2 : 'linear-gradient(135deg,#F0EEFF,#FFF0F8)',
          border:`1px solid ${theme.primary}35`, borderRadius:20, padding:'18px', marginBottom:14,
        }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:16 }}>
            <div>
              <div style={{ fontSize:10, color:theme.textSec, fontWeight:700, letterSpacing:'0.5px', textTransform:'uppercase', marginBottom:4 }}>Combined Score</div>
              <div style={{ fontSize:38, fontWeight:900, color:theme.primary, letterSpacing:'-1.5px', lineHeight:1 }}>{total.toLocaleString()}</div>
              <div style={{ fontSize:11, color:theme.textSec, marginTop:5 }}>🔥 5-day squad streak active</div>
            </div>
            <div style={{ textAlign:'right' }}>
              <div style={{ fontSize:30 }}>🏆</div>
              <div style={{ fontSize:12, color:theme.text, fontWeight:700, marginTop:4 }}>Rank #3</div>
              <div style={{ fontSize:10, color:theme.green, fontWeight:700, marginTop:2 }}>↑ +2 this week</div>
            </div>
          </div>
          <div style={{ fontSize:10, color:theme.textTert, fontWeight:700, letterSpacing:'0.4px', textTransform:'uppercase', marginBottom:8 }}>Contribution</div>
          {members.map((m,i) => (
            <div key={i} style={{ display:'flex', alignItems:'center', gap:8, marginBottom:6 }}>
              <div style={{ width:18, height:18, borderRadius:'50%', background:m.color, fontSize:8, fontWeight:700, color:'#FFF', display:'flex', alignItems:'center', justifyContent:'center' }}>{m.avatar}</div>
              <div style={{ flex:1 }}><Bar value={(m.score/total)*100} color={m.color} bg={theme.border} h={5} /></div>
              <div style={{ fontSize:10, color:theme.textSec, minWidth:28, textAlign:'right' }}>{Math.round((m.score/total)*100)}%</div>
            </div>
          ))}
        </div>

        {/* Members */}
        <div style={{ fontSize:15, fontWeight:700, color:theme.text, marginBottom:10 }}>Members</div>
        {members.map((m,i) => (
          <div key={i} style={{
            background: i === 0 ? (isDark ? '#100820' : '#F5EEFF') : theme.card,
            border: i === 0 ? `1px solid ${theme.primary}40` : `1px solid ${theme.border}`,
            borderRadius:15, padding:'13px', marginBottom:9,
            display:'flex', alignItems:'center', gap:12,
          }}>
            <div style={{ fontSize:14, fontWeight:900, color:theme.textTert, minWidth:22, textAlign:'center' }}>#{m.rank}</div>
            <Avatar name={m.name} color={m.color} size={38} />
            <div style={{ flex:1 }}>
              <div style={{ fontSize:13, fontWeight:700, color:theme.text }}>{m.name}</div>
              <div style={{ display:'flex', gap:10, marginTop:3 }}>
                <span style={{ fontSize:10, color:theme.textSec }}>📹 {m.clips} clips</span>
                <span style={{ fontSize:10, color:theme.orange }}>🔥 {m.streak}d</span>
              </div>
            </div>
            <div style={{ textAlign:'right' }}>
              <div style={{ fontSize:17, fontWeight:800, color:m.color }}>{m.score.toLocaleString()}</div>
              <div style={{ fontSize:10, color:theme.textTert }}>pts</div>
            </div>
          </div>
        ))}

        {/* Realms */}
        <div style={{ fontSize:15, fontWeight:700, color:theme.text, marginBottom:10, marginTop:4 }}>✦ Unlocked Realms</div>
        <div style={{ display:'flex', gap:10, marginBottom:4 }}>
          {realms.map((r,i) => (
            <div key={i} style={{
              flex:1, borderRadius:14, padding:'14px 8px', textAlign:'center',
              background: r.unlocked ? `${r.color}12` : theme.card,
              border:`1px solid ${r.unlocked ? r.color+'35' : theme.border}`,
              opacity: r.unlocked ? 1 : 0.5,
            }}>
              <div style={{ fontSize:26, marginBottom:6 }}>{r.emoji}</div>
              <div style={{ fontSize:10, fontWeight:700, color: r.unlocked ? r.color : theme.textTert, lineHeight:1.3 }}>{r.name}</div>
              {!r.unlocked && <div style={{ fontSize:9, color:theme.textTert, marginTop:3 }}>🔒 Locked</div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ── PROFILE SCREEN ───────────────────────────────────────────────────────────
const ProfileScreen = ({ theme, isDark, toggleTheme }) => {
  const stats = [
    { label:'XP Total', value:'4,280', color:theme.primary },
    { label:'Clips',    value:'23',    color:theme.pink    },
    { label:'Streak',   value:'12d',   color:theme.orange  },
  ];
  const badges = [
    { emoji:'🧠', name:'Focus Master',  desc:'10 deep sessions' },
    { emoji:'⚡', name:'Early Adopter', desc:'Beta pioneer'     },
    { emoji:'🎨', name:'Clip Creator',  desc:'20 clips posted'  },
    { emoji:'🔥', name:'On Fire',       desc:'7-day streak'     },
  ];
  const settingsItems = [
    { label:'Notifications',    icon:'🔔', val:'On'         },
    { label:'Privacy',          icon:'🔒', val:'Squad Only' },
    { label:'Clip Quality',     icon:'📹', val:'HD'         },
    { label:'Challenge Alerts', icon:'⚡', val:'30 min'     },
    { label:'Haptics',          icon:'📳', val:'On'         },
  ];

  return (
    <div style={{ flex:1, overflowY:'auto', paddingBottom:20 }}>
      {/* Header */}
      <div style={{ background:theme.gradProfile, padding:'20px 16px 18px' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:20 }}>
          <div style={{ display:'flex', gap:14, alignItems:'center' }}>
            <div style={{ position:'relative' }}>
              <Avatar name="Alex" color={theme.primary} size={62} />
              <div style={{ position:'absolute', bottom:2, right:2, width:15, height:15, borderRadius:'50%', background:theme.green, border:`2px solid ${isDark?'#07070F':'#EEEEF8'}` }} />
            </div>
            <div>
              <div style={{ fontSize:18, fontWeight:800, color:theme.text }}>Alex Johnson</div>
              <div style={{ fontSize:11, color:theme.textSec }}>@alexj · Flow Squad</div>
              <div style={{ fontSize:11, color:theme.primary, fontWeight:700, marginTop:4 }}>⚡ Level 8 · Pulse Pioneer</div>
            </div>
          </div>
          <div onClick={toggleTheme} style={{
            width:40, height:40, borderRadius:'50%', background:theme.card,
            border:`1px solid ${theme.border}`, display:'flex', alignItems:'center',
            justifyContent:'center', cursor:'pointer', fontSize:18,
          }}>{isDark ? '☀️' : '🌙'}</div>
        </div>
        {/* Stats */}
        <div style={{ display:'flex', gap:10 }}>
          {stats.map((s,i) => (
            <div key={i} style={{
              flex:1, background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.75)',
              borderRadius:13, padding:'12px 8px', textAlign:'center', border:`1px solid ${theme.border}`,
            }}>
              <div style={{ fontSize:19, fontWeight:900, color:s.color }}>{s.value}</div>
              <div style={{ fontSize:10, color:theme.textSec, marginTop:3 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding:'16px 16px 0' }}>
        {/* Achievements */}
        <div style={{ marginBottom:18 }}>
          <div style={{ fontSize:15, fontWeight:700, color:theme.text, marginBottom:10 }}>Achievements</div>
          <div style={{ display:'flex', gap:9 }}>
            {badges.map((b,i) => (
              <div key={i} style={{
                flex:1, background:theme.card, borderRadius:13,
                border:`1px solid ${theme.border}`, padding:'12px 6px', textAlign:'center',
              }}>
                <div style={{ fontSize:22, marginBottom:5 }}>{b.emoji}</div>
                <div style={{ fontSize:10, fontWeight:700, color:theme.text, lineHeight:1.2 }}>{b.name}</div>
                <div style={{ fontSize:9, color:theme.textTert, marginTop:3 }}>{b.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* XP Bar */}
        <div style={{ background:theme.card, borderRadius:15, padding:'14px', border:`1px solid ${theme.border}`, marginBottom:16 }}>
          <div style={{ display:'flex', justifyContent:'space-between', marginBottom:8 }}>
            <div style={{ fontSize:12, fontWeight:700, color:theme.text }}>Level 8 → Level 9</div>
            <div style={{ fontSize:12, color:theme.primary, fontWeight:700 }}>4,280 / 5,000 XP</div>
          </div>
          <Bar value={86} color={theme.primary} bg={theme.border} h={8} />
          <div style={{ fontSize:10, color:theme.textTert, marginTop:6 }}>720 XP to unlock new challenges</div>
        </div>

        {/* Settings */}
        <div style={{ fontSize:15, fontWeight:700, color:theme.text, marginBottom:10 }}>Settings</div>
        {settingsItems.map((s,i) => (
          <div key={i} style={{
            display:'flex', justifyContent:'space-between', alignItems:'center',
            background:theme.card, borderRadius:12, padding:'13px 14px',
            border:`1px solid ${theme.border}`, marginBottom:8,
          }}>
            <div style={{ display:'flex', alignItems:'center', gap:10 }}>
              <span style={{ fontSize:15 }}>{s.icon}</span>
              <span style={{ fontSize:13, color:theme.text, fontWeight:600 }}>{s.label}</span>
            </div>
            <div style={{ display:'flex', alignItems:'center', gap:6 }}>
              <span style={{ fontSize:12, color:theme.textSec }}>{s.val}</span>
              <span style={{ fontSize:14, color:theme.textTert }}>›</span>
            </div>
          </div>
        ))}

        <div style={{ textAlign:'center', padding:'20px 0 0' }}>
          <div style={{ fontSize:11, color:theme.textTert }}>PulseQuest v1.0.0</div>
          <div style={{ fontSize:10, color:theme.textTert, marginTop:2 }}>Co-challenge your flow ⚡</div>
        </div>
      </div>
    </div>
  );
};

// ── APP ROOT ─────────────────────────────────────────────────────────────────
function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isDark, setIsDark] = useState(true);

  const theme = isDark ? themes.dark : themes.light;
  const toggleTheme = () => setIsDark(d => !d);

  const tabs = [
    { id: 'home',     label: 'Home',     icon: window.lucide.Home  },
    { id: 'missions', label: 'Missions', icon: window.lucide.Zap   },
    { id: 'pulse',    label: 'Pulse',    icon: window.lucide.Play  },
    { id: 'squad',    label: 'Squad',    icon: window.lucide.Users },
    { id: 'profile',  label: 'Profile',  icon: window.lucide.User  },
  ];

  const screens = {
    home:     HomeScreen,
    missions: MissionsScreen,
    pulse:    PulseScreen,
    squad:    SquadScreen,
    profile:  ProfileScreen,
  };

  const CurrentScreen = screens[activeTab];

  return (
    <div style={{
      minHeight: '100vh', background: '#f0f0f0',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'Sora, sans-serif',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800;900&display=swap');
        * { font-family: 'Sora', sans-serif; box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 0; height: 0; }
      `}</style>

      {/* Phone Frame */}
      <div style={{
        width: 375, height: 812, background: theme.bg,
        borderRadius: 50, overflow: 'hidden', position: 'relative',
        display: 'flex', flexDirection: 'column',
        boxShadow: '0 50px 120px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.12)',
      }}>
        {/* Dynamic Island */}
        <div style={{
          position: 'absolute', top: 13, left: '50%', transform: 'translateX(-50%)',
          width: 118, height: 34, background: '#000', borderRadius: 20, zIndex: 100,
        }} />

        {/* Status Bar */}
        <div style={{
          height: 52, display: 'flex', alignItems: 'flex-end', paddingBottom: 8,
          paddingLeft: 26, paddingRight: 22, background: theme.bg, flexShrink: 0, zIndex: 10,
        }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: theme.text }}>9:41</div>
          <div style={{ flex: 1 }} />
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            {React.createElement(window.lucide.Signal,  { size: 13, color: theme.text })}
            {React.createElement(window.lucide.Wifi,    { size: 13, color: theme.text })}
            {React.createElement(window.lucide.Battery, { size: 14, color: theme.text })}
          </div>
        </div>

        {/* Screen */}
        <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <CurrentScreen theme={theme} isDark={isDark} toggleTheme={toggleTheme} />
        </div>

        {/* Bottom Nav */}
        <div style={{
          height: 80, background: theme.nav,
          borderTop: `1px solid ${theme.border}`,
          display: 'flex', alignItems: 'center',
          paddingBottom: 12, flexShrink: 0,
        }}>
          {tabs.map(tab => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;
            return (
              <div
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
                  gap: 3, cursor: 'pointer', paddingTop: 6,
                }}
              >
                <div style={{
                  padding: '5px 11px', borderRadius: 12,
                  background: isActive ? theme.primaryDim : 'transparent',
                  transition: 'background 0.18s ease',
                }}>
                  {React.createElement(Icon, {
                    size: 20,
                    color: isActive ? theme.primary : theme.textSec,
                    strokeWidth: isActive ? 2.5 : 1.8,
                  })}
                </div>
                <span style={{
                  fontSize: 10, fontWeight: isActive ? 700 : 500,
                  color: isActive ? theme.primary : theme.textSec,
                }}>{tab.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
