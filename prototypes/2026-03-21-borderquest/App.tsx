const { useState, useEffect, useRef } = React;

function App() {
  // ── Lucide icons ──────────────────────────────────────────────────────────
  const MapIcon       = window.lucide?.Map        || (() => React.createElement('span', null, '🗺'));
  const ZapIcon       = window.lucide?.Zap        || (() => React.createElement('span', null, '⚡'));
  const UsersIcon     = window.lucide?.Users      || (() => React.createElement('span', null, '👥'));
  const BookOpenIcon  = window.lucide?.BookOpen   || (() => React.createElement('span', null, '📖'));
  const UserIcon      = window.lucide?.User       || (() => React.createElement('span', null, '👤'));
  const SunIcon       = window.lucide?.Sun        || (() => React.createElement('span', null, '☀'));
  const MoonIcon      = window.lucide?.Moon       || (() => React.createElement('span', null, '🌙'));
  const ChevronRight  = window.lucide?.ChevronRight || (() => React.createElement('span', null, '›'));
  const Shield        = window.lucide?.Shield     || (() => React.createElement('span', null, '🛡'));
  const Compass       = window.lucide?.Compass    || (() => React.createElement('span', null, '🧭'));
  const WifiIcon      = window.lucide?.Wifi       || (() => React.createElement('span', null, '▲'));

  // ── Theme ─────────────────────────────────────────────────────────────────
  const themes = {
    dark: {
      bg:           '#07091A',
      surface:      '#0E1528',
      surface2:     '#141F38',
      surface3:     '#192644',
      primary:      '#00D4FF',
      primaryLight: '#44E0FF',
      primaryGlow:  'rgba(0,212,255,0.18)',
      secondary:    '#8B5CF6',
      secGlow:      'rgba(139,92,246,0.18)',
      accent:       '#FF6B2B',
      text:         '#E8F4FF',
      textMuted:    '#5A7399',
      textDim:      '#243450',
      border:       '#182840',
      success:      '#00E87A',
      warning:      '#FFB347',
      danger:       '#FF3D5E',
      card:         '#0C1526',
      navBg:        '#060815',
      zonePlayer:   '#00D4FF',
      zoneAlly:     '#00C87A',
      zoneEnemy:    '#FF3D5E',
      zoneNeutral:  '#182840',
      zoneResource: '#FFB347',
      zoneLandmark: '#8B5CF6',
    },
    light: {
      bg:           '#EEF4FB',
      surface:      '#FFFFFF',
      surface2:     '#F2F8FF',
      surface3:     '#E8F2FF',
      primary:      '#0088BB',
      primaryLight: '#0099CC',
      primaryGlow:  'rgba(0,136,187,0.14)',
      secondary:    '#6D28D9',
      secGlow:      'rgba(109,40,217,0.14)',
      accent:       '#D9560A',
      text:         '#0A1628',
      textMuted:    '#4A6482',
      textDim:      '#B0C4D8',
      border:       '#C6D8EE',
      success:      '#00965A',
      warning:      '#B87A00',
      danger:       '#CC2244',
      card:         '#FFFFFF',
      navBg:        '#FFFFFF',
      zonePlayer:   '#0088BB',
      zoneAlly:     '#00875A',
      zoneEnemy:    '#CC2244',
      zoneNeutral:  '#C6D8EE',
      zoneResource: '#B87A00',
      zoneLandmark: '#6D28D9',
    },
  };

  const [isDark, setIsDark]     = useState(true);
  const [activeTab, setActiveTab] = useState('map');
  const [selectedZone, setSelectedZone] = useState(null);
  const [pressedNav, setPressedNav]     = useState(null);
  const [claimedZones, setClaimedZones] = useState({});
  const [missionExpand, setMissionExpand] = useState(null);

  const t = isDark ? themes.dark : themes.light;
  const ff = { fontFamily: "'Space Grotesk', sans-serif" };

  // ── Font injection ────────────────────────────────────────────────────────
  useEffect(() => {
    if (!document.getElementById('bq-font')) {
      const s = document.createElement('style');
      s.id = 'bq-font';
      s.textContent = `
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
        ::-webkit-scrollbar { width: 0; }
      `;
      document.head.appendChild(s);
    }
  }, []);

  // ── Map Data ──────────────────────────────────────────────────────────────
  // grid[row][col] → type
  const baseGrid = [
    ['e','e','n','n','a','a','p','p'],
    ['e','n','n','r','a','p','p','p'],
    ['n','n','L','n','n','a','p','n'],
    ['n','r','n','n','n','n','a','n'],
    ['n','n','n','p','p','n','n','n'],
    ['e','e','n','p','p','a','n','n'],
    ['e','n','n','n','n','n','n','n'],
    ['L','n','e','e','n','r','n','n'],
    ['n','n','e','n','n','n','n','n'],
  ];

  const zoneColor = (type) => {
    const key = claimedZones[type] || type;
    const map = { p: t.zonePlayer, a: t.zoneAlly, e: t.zoneEnemy, n: t.zoneNeutral, r: t.zoneResource, L: t.zoneLandmark };
    return map[type] || t.zoneNeutral;
  };

  const zoneOpacity = (type) => {
    if (type === 'n') return isDark ? 0.45 : 0.38;
    return isDark ? 0.8 : 0.7;
  };

  const zoneLabel = (type) => {
    const m = { p: 'Your Zone', a: 'Allied Zone', e: 'Enemy Zone', n: 'Free Zone', r: 'Resource Node', L: 'Landmark' };
    return m[type] || 'Zone';
  };

  // ── Mission Data ──────────────────────────────────────────────────────────
  const missions = [
    { id:1, icon:'🎨', title:'Claim the Arts District', desc:'Visit 3 murals on Valencia St to secure this creative hub for Iron Eagles.', xp:250, diff:'Medium', prog:2, total:3, time:'4h 20m', type:'claim',  limited:true  },
    { id:2, icon:'🌅', title:'Morning Scout Run',        desc:'Check in at 5 new zones before 10 AM and earn dawn bonus multiplier.',      xp:150, diff:'Easy',   prog:3, total:5, time:'2h 15m', type:'explore', limited:false },
    { id:3, icon:'🛡️', title:'Hold Market Square',      desc:'Defend Market Square against enemy captures — check in every 2 hours.',    xp:300, diff:'Hard',   prog:1, total:4, time:'6h',     type:'defend',  limited:false },
    { id:4, icon:'🌧️', title:'Rainy Day: Indoor Quest', desc:'Weather adapted — discover 2 hidden indoor checkpoints near your current location.', xp:180, diff:'Easy', prog:0, total:2, time:'12h', type:'special', limited:true },
    { id:5, icon:'⚡', title:'Guild Supply Run',         desc:'Collect resources at 4 waypoints across Mission District for the guild.', xp:400, diff:'Medium', prog:0, total:4, time:'24h', type:'guild',   limited:false },
  ];

  const diffColor = (d) => ({ Easy: t.success, Medium: t.warning, Hard: t.danger }[d] || t.primary);
  const typeColor = (type) => ({ claim: t.primary, explore: t.success, defend: t.danger, special: t.secondary, guild: t.warning }[type] || t.textMuted);

  // ── Guild Data ────────────────────────────────────────────────────────────
  const members = [
    { name:'You',       role:'Captain',  zones:12, online:true,  avatar:'⚔️' },
    { name:'Sarah K.',  role:'Scout',    zones:8,  online:true,  avatar:'🏃' },
    { name:'Marcus L.', role:'Defender', zones:15, online:false, avatar:'🛡️' },
    { name:'Yuki T.',   role:'Explorer', zones:6,  online:true,  avatar:'🗺️' },
    { name:'Dev P.',    role:'Trader',   zones:9,  online:false, avatar:'💎' },
  ];

  const activityFeed = [
    { user:'Sarah K.',  action:'claimed',    target:'Sunset Terrace',  time:'5m ago',  dot: t.primary  },
    { user:'Marcus L.', action:'defended',   target:'East Harbor',     time:'22m ago', dot: t.warning  },
    { user:'Yuki T.',   action:'discovered', target:'Hidden Garden',   time:'1h ago',  dot: t.success  },
    { user:'You',       action:'claimed',    target:'City Hall Plaza', time:'2h ago',  dot: t.primary  },
  ];

  // ── Journal Data ──────────────────────────────────────────────────────────
  const discoveries = [
    { name:'City Hall Plaza',    date:'Today',     icon:'🏛️', xp:120, type:'landmark' },
    { name:'Valencia Mural Walk',date:'Today',     icon:'🎨', xp:85,  type:'explore'  },
    { name:'Coffee Row',         date:'Yesterday', icon:'☕', xp:60,  type:'resource' },
    { name:'Sunset Terrace',     date:'Yesterday', icon:'🌅', xp:200, type:'claim'    },
    { name:'Central Market',     date:'Mon',       icon:'🏪', xp:75,  type:'explore'  },
    { name:'Transit Hub',        date:'Mon',       icon:'🚇', xp:90,  type:'resource' },
    { name:'Hidden Garden',      date:'Sun',       icon:'🌿', xp:150, type:'landmark' },
    { name:'Coit Tower View',    date:'Sat',       icon:'🗼', xp:180, type:'landmark' },
  ];

  // ── Helpers ───────────────────────────────────────────────────────────────
  const pill = (label, color, bg) => ({
    display:'inline-flex', alignItems:'center',
    background: bg || `${color}22`,
    border:`1px solid ${color}44`,
    borderRadius:'5px', padding:'2px 7px',
    fontSize:'9px', color, fontWeight:700, letterSpacing:'0.04em',
    ...ff,
  });

  const card = (extra={}) => ({
    background: t.card,
    border:`1px solid ${t.border}`,
    borderRadius:'14px',
    ...extra,
  });

  // ── NOW ───────────────────────────────────────────────────────────────────
  const now = new Date();
  const timeStr = now.toLocaleTimeString([], { hour:'2-digit', minute:'2-digit' });

  // ──────────────────────────────────────────────────────────────────────────
  // SCREEN: MAP
  // ──────────────────────────────────────────────────────────────────────────
  const renderMap = () => {
    const sel = selectedZone;
    const selType = sel ? baseGrid[sel[0]][sel[1]] : null;

    return (
      <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' }}>
        {/* Header bar */}
        <div style={{ padding:'10px 16px', background:t.surface, borderBottom:`1px solid ${t.border}`, display:'flex', justifyContent:'space-between', alignItems:'center', flexShrink:0 }}>
          <div>
            <div style={{ fontSize:'10px', fontWeight:700, color:t.textMuted, letterSpacing:'0.06em', ...ff }}>ACTIVE ZONE</div>
            <div style={{ fontSize:'17px', fontWeight:700, color:t.text, ...ff }}>Mission District</div>
          </div>
          <div style={{ display:'flex', gap:'6px' }}>
            <div style={{ background:t.primaryGlow, border:`1px solid ${t.primary}`, borderRadius:'20px', padding:'4px 11px', fontSize:'11px', color:t.primary, fontWeight:700, ...ff }}>⚡ 2,840 XP</div>
            <div style={{ background:t.surface2, border:`1px solid ${t.border}`, borderRadius:'20px', padding:'4px 11px', fontSize:'11px', color:t.textMuted, fontWeight:600, ...ff }}>🏆 #14</div>
          </div>
        </div>

        {/* Map area */}
        <div style={{ flex:1, position:'relative', background: isDark ? '#040710' : '#D8EAF8', overflow:'hidden' }}>
          {/* Grid pattern overlay */}
          <div style={{
            position:'absolute', inset:0,
            backgroundImage:`linear-gradient(${isDark?'rgba(0,212,255,0.035)':'rgba(0,80,160,0.04)'} 1px, transparent 1px),
              linear-gradient(90deg, ${isDark?'rgba(0,212,255,0.035)':'rgba(0,80,160,0.04)'} 1px, transparent 1px)`,
            backgroundSize:'22px 22px',
          }} />

          {/* Territory grid */}
          <div style={{ padding:'14px 12px', display:'flex', flexDirection:'column', gap:'3px', height:'100%' }}>
            {baseGrid.map((row, ri) => (
              <div key={ri} style={{ display:'flex', gap:'3px', flex:1 }}>
                {row.map((zone, ci) => {
                  const key = `${ri}-${ci}`;
                  const isSel = sel && sel[0]===ri && sel[1]===ci;
                  const isP = zone === 'p';
                  const isL = zone === 'L';
                  const isR = zone === 'r';
                  return (
                    <div
                      key={ci}
                      onClick={() => setSelectedZone(isSel ? null : [ri, ci])}
                      style={{
                        flex:1, borderRadius:'4px',
                        background: zoneColor(zone),
                        opacity: isSel ? 1 : zoneOpacity(zone),
                        border: isSel ? `2px solid ${t.text}` : isP ? `1px solid ${t.primaryLight}` : '1px solid transparent',
                        display:'flex', alignItems:'center', justifyContent:'center',
                        fontSize:'11px', cursor:'pointer',
                        transition:'opacity 0.15s, transform 0.1s',
                        transform: isSel ? 'scale(1.05)' : 'scale(1)',
                        boxShadow: isP && isDark ? `0 0 8px ${t.primary}50` : 'none',
                      }}
                    >
                      {isL && <span style={{ fontSize:'13px' }}>🏛️</span>}
                      {isR && <span style={{ fontSize:'11px' }}>💎</span>}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Zone tooltip */}
          {sel && (
            <div style={{
              position:'absolute', top:10, left:10, right:10,
              background: isDark ? 'rgba(8,12,28,0.94)' : 'rgba(255,255,255,0.96)',
              backdropFilter:'blur(12px)',
              borderRadius:'14px', padding:'12px 14px',
              border:`1px solid ${t.border}`,
              display:'flex', alignItems:'center', justifyContent:'space-between',
              ...ff,
            }}>
              <div>
                <div style={{ fontSize:'13px', fontWeight:700, color:t.text }}>Zone [{sel[0]},{sel[1]}]</div>
                <div style={{ fontSize:'11px', color:t.textMuted, marginTop:'2px' }}>{zoneLabel(selType)}</div>
                {selType === 'n' && <div style={{ fontSize:'10px', color:t.success, marginTop:'4px', fontWeight:600 }}>✓ Claimable</div>}
                {selType === 'e' && <div style={{ fontSize:'10px', color:t.danger,  marginTop:'4px', fontWeight:600 }}>⚠ Enemy territory</div>}
              </div>
              <div style={{ display:'flex', gap:'8px' }}>
                {selType === 'n' && (
                  <button
                    onClick={() => { setClaimedZones(prev => ({...prev, [`${sel[0]}-${sel[1]}`]:'p'})); setSelectedZone(null); }}
                    style={{ background:`linear-gradient(135deg,${t.primary},${t.secondary})`, color:'#fff', border:'none', borderRadius:'9px', padding:'8px 14px', fontSize:'12px', fontWeight:700, cursor:'pointer', ...ff }}
                  >Claim</button>
                )}
                <button onClick={() => setSelectedZone(null)} style={{ background:t.surface2, color:t.textMuted, border:`1px solid ${t.border}`, borderRadius:'9px', padding:'8px 12px', fontSize:'12px', cursor:'pointer', ...ff }}>✕</button>
              </div>
            </div>
          )}

          {/* Legend */}
          <div style={{
            position:'absolute', bottom:8, left:'50%', transform:'translateX(-50%)',
            display:'flex', gap:'10px', alignItems:'center',
            background: isDark ? 'rgba(6,9,22,0.88)' : 'rgba(238,244,251,0.92)',
            backdropFilter:'blur(10px)',
            borderRadius:'20px', padding:'6px 14px',
            border:`1px solid ${t.border}`,
            ...ff,
          }}>
            {[{c:t.zonePlayer,l:'Yours'},{c:t.zoneAlly,l:'Ally'},{c:t.zoneEnemy,l:'Enemy'},{c:t.zoneNeutral,l:'Free'}].map(x => (
              <div key={x.l} style={{ display:'flex', alignItems:'center', gap:'4px' }}>
                <div style={{ width:'8px', height:'8px', borderRadius:'2px', background:x.c }} />
                <span style={{ fontSize:'10px', color:t.textMuted, fontWeight:500 }}>{x.l}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom stats */}
        <div style={{ padding:'10px 16px', background:t.surface, borderTop:`1px solid ${t.border}`, display:'flex', justifyContent:'space-between', flexShrink:0, ...ff }}>
          {[{l:'Your Zones',v:'12',c:t.primary},{l:'Guild',v:'34',c:t.zoneAlly},{l:'Enemy',v:'18',c:t.zoneEnemy},{l:'Control',v:'42%',c:t.secondary}].map(s => (
            <div key={s.l} style={{ textAlign:'center' }}>
              <div style={{ fontSize:'16px', fontWeight:700, color:s.c }}>{s.v}</div>
              <div style={{ fontSize:'9px', color:t.textMuted, fontWeight:600, letterSpacing:'0.04em' }}>{s.l.toUpperCase()}</div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ──────────────────────────────────────────────────────────────────────────
  // SCREEN: MISSIONS
  // ──────────────────────────────────────────────────────────────────────────
  const renderMissions = () => (
    <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' }}>
      <div style={{ padding:'12px 16px 14px', background:t.surface, borderBottom:`1px solid ${t.border}`, flexShrink:0 }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
          <div>
            <div style={{ fontSize:'20px', fontWeight:700, color:t.text, ...ff }}>Daily Missions</div>
            <div style={{ fontSize:'12px', color:t.textMuted, marginTop:'2px', ...ff }}>
              Resets in <span style={{ color:t.primary, fontWeight:700 }}>8h 42m</span>&nbsp;·&nbsp;2 of 5 complete
            </div>
          </div>
          <div style={{ background:t.surface3, border:`1px solid ${t.border}`, borderRadius:'10px', padding:'6px 10px', textAlign:'center' }}>
            <div style={{ fontSize:'16px', fontWeight:700, color:t.warning, ...ff }}>🔥 7</div>
            <div style={{ fontSize:'9px', color:t.textMuted, fontWeight:600, ...ff }}>DAY STREAK</div>
          </div>
        </div>
        <div style={{ height:'4px', background:t.border, borderRadius:'2px', marginTop:'10px' }}>
          <div style={{ width:'40%', height:'100%', background:`linear-gradient(90deg,${t.primary},${t.secondary})`, borderRadius:'2px' }} />
        </div>
      </div>

      <div style={{ flex:1, overflowY:'auto', padding:'12px' }}>
        {missions.map(m => {
          const open = missionExpand === m.id;
          return (
            <div
              key={m.id}
              onClick={() => setMissionExpand(open ? null : m.id)}
              style={{ ...card({ padding:'14px', marginBottom:'10px', cursor:'pointer', transition:'border-color 0.2s', borderColor: open ? t.primary : t.border }) }}
            >
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
                <div style={{ display:'flex', gap:'10px', alignItems:'center', flex:1 }}>
                  <div style={{ width:'40px', height:'40px', background:t.surface2, borderRadius:'11px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'20px', flexShrink:0 }}>
                    {m.icon}
                  </div>
                  <div style={{ flex:1 }}>
                    <div style={{ display:'flex', alignItems:'center', gap:'6px', flexWrap:'wrap' }}>
                      <span style={{ fontSize:'13px', fontWeight:700, color:t.text, ...ff }}>{m.title}</span>
                      {m.limited && <span style={pill('LIMITED', t.danger)}>LIMITED</span>}
                    </div>
                    <div style={{ display:'flex', gap:'6px', marginTop:'4px', alignItems:'center' }}>
                      <span style={pill(m.diff, diffColor(m.diff))}>{m.diff.toUpperCase()}</span>
                      <span style={{ fontSize:'10px', color:t.textMuted, ...ff }}>⏱ {m.time}</span>
                    </div>
                  </div>
                </div>
                <div style={{ textAlign:'right', flexShrink:0, paddingLeft:'10px' }}>
                  <div style={{ fontSize:'14px', fontWeight:700, color:t.primary, ...ff }}>+{m.xp} XP</div>
                  <div style={{ fontSize:'10px', color:t.textMuted, ...ff }}>{m.prog}/{m.total} done</div>
                </div>
              </div>

              {/* Progress bar */}
              <div style={{ display:'flex', alignItems:'center', gap:'8px', marginTop:'12px' }}>
                <div style={{ flex:1, height:'5px', background:t.surface2, borderRadius:'3px' }}>
                  <div style={{ width:`${m.total > 0 ? (m.prog/m.total)*100 : 0}%`, height:'100%', background:typeColor(m.type), borderRadius:'3px', transition:'width 0.4s' }} />
                </div>
              </div>

              {/* Expanded detail */}
              {open && (
                <div style={{ marginTop:'10px', padding:'10px', background:t.surface2, borderRadius:'10px', border:`1px solid ${t.border}` }}>
                  <div style={{ fontSize:'12px', color:t.textMuted, lineHeight:1.55, ...ff }}>{m.desc}</div>
                  <button
                    onClick={e => { e.stopPropagation(); }}
                    style={{ marginTop:'10px', width:'100%', background:`linear-gradient(135deg,${t.primary},${t.secondary})`, color:'#fff', border:'none', borderRadius:'9px', padding:'9px', fontSize:'12px', fontWeight:700, cursor:'pointer', ...ff }}
                  >
                    Navigate to Mission →
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  // ──────────────────────────────────────────────────────────────────────────
  // SCREEN: GUILD
  // ──────────────────────────────────────────────────────────────────────────
  const renderGuild = () => (
    <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' }}>
      {/* Guild banner */}
      <div style={{
        padding:'16px',
        background: isDark
          ? `linear-gradient(160deg, rgba(0,212,255,0.12) 0%, ${t.surface} 60%)`
          : `linear-gradient(160deg, rgba(0,136,187,0.10) 0%, ${t.surface} 60%)`,
        borderBottom:`1px solid ${t.border}`,
        flexShrink:0,
      }}>
        <div style={{ display:'flex', alignItems:'center', gap:'14px', marginBottom:'16px' }}>
          <div style={{ width:'58px', height:'58px', background:`linear-gradient(135deg,${t.primary},${t.secondary})`, borderRadius:'18px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'28px', boxShadow:`0 0 24px ${t.primaryGlow}` }}>
            🦅
          </div>
          <div>
            <div style={{ fontSize:'21px', fontWeight:700, color:t.text, ...ff }}>Iron Eagles</div>
            <div style={{ fontSize:'12px', color:t.textMuted, marginTop:'2px', ...ff }}>Mission District  ·  Level 7 Guild</div>
            <div style={{ fontSize:'11px', color:t.primary, fontWeight:600, marginTop:'3px', ...ff }}>⚡ 1,240 Guild XP this week</div>
          </div>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'8px' }}>
          {[{l:'Territories',v:'34'},{l:'Members',v:'5'},{l:'Alliance',v:'Silver'},{l:'Rank',v:'#3'}].map(s => (
            <div key={s.l} style={{ background:t.surface3, border:`1px solid ${t.border}`, borderRadius:'10px', padding:'9px 6px', textAlign:'center' }}>
              <div style={{ fontSize:'15px', fontWeight:700, color:t.primary, ...ff }}>{s.v}</div>
              <div style={{ fontSize:'9px', color:t.textMuted, fontWeight:600, letterSpacing:'0.04em', ...ff }}>{s.l.toUpperCase()}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ flex:1, overflowY:'auto', padding:'12px' }}>
        {/* Members */}
        <div style={{ fontSize:'11px', fontWeight:700, color:t.textMuted, marginBottom:'8px', letterSpacing:'0.06em', ...ff }}>MEMBERS</div>
        {members.map((m, i) => (
          <div key={i} style={{ ...card({ padding:'12px', marginBottom:'7px', display:'flex', alignItems:'center', gap:'12px' }) }}>
            <div style={{ width:'40px', height:'40px', background:t.surface2, borderRadius:'12px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'20px', flexShrink:0, position:'relative' }}>
              {m.avatar}
              <div style={{ position:'absolute', bottom:'-2px', right:'-2px', width:'10px', height:'10px', borderRadius:'50%', background: m.online ? t.success : t.textDim, border:`2px solid ${t.card}` }} />
            </div>
            <div style={{ flex:1 }}>
              <div style={{ display:'flex', alignItems:'center', gap:'6px' }}>
                <span style={{ fontSize:'13px', fontWeight:700, color:t.text, ...ff }}>{m.name}</span>
                {m.name === 'You' && <span style={pill('YOU', t.primary)}>YOU</span>}
              </div>
              <div style={{ fontSize:'11px', color:t.textMuted, ...ff }}>{m.role}</div>
            </div>
            <div style={{ textAlign:'right' }}>
              <div style={{ fontSize:'14px', fontWeight:700, color:t.text, ...ff }}>{m.zones}</div>
              <div style={{ fontSize:'10px', color:t.textMuted, ...ff }}>zones</div>
            </div>
          </div>
        ))}

        {/* Territory map mini */}
        <div style={{ ...card({ padding:'12px', marginBottom:'14px', marginTop:'4px' }) }}>
          <div style={{ fontSize:'11px', fontWeight:700, color:t.textMuted, marginBottom:'10px', letterSpacing:'0.06em', ...ff }}>TERRITORY CONTROL</div>
          <div style={{ display:'flex', gap:'4px', height:'40px' }}>
            {[{w:'34%',c:t.zonePlayer,l:'Yours 34%'},{w:'20%',c:t.zoneAlly,l:'Ally 20%'},{w:'18%',c:t.zoneEnemy,l:'Enemy 18%'},{w:'28%',c:t.zoneNeutral,l:'Free 28%'}].map((s,i) => (
              <div key={i} style={{ width:s.w, background:s.c, borderRadius:'6px', display:'flex', alignItems:'flex-end', padding:'4px', opacity:0.85 }}>
                <span style={{ fontSize:'9px', color:'#fff', fontWeight:700, ...ff }}>{s.l}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Activity feed */}
        <div style={{ fontSize:'11px', fontWeight:700, color:t.textMuted, marginBottom:'8px', letterSpacing:'0.06em', ...ff }}>RECENT ACTIVITY</div>
        <div style={{ ...card({ padding:'10px 14px' }) }}>
          {activityFeed.map((a, i) => (
            <div key={i} style={{ display:'flex', alignItems:'center', gap:'10px', padding:'8px 0', borderBottom: i < activityFeed.length-1 ? `1px solid ${t.border}` : 'none' }}>
              <div style={{ width:'7px', height:'7px', borderRadius:'50%', background:a.dot, flexShrink:0 }} />
              <div style={{ flex:1, fontSize:'12px', color:t.text, ...ff }}>
                <span style={{ fontWeight:700 }}>{a.user}</span>
                <span style={{ color:t.textMuted }}> {a.action} </span>
                <span style={{ fontWeight:600 }}>{a.target}</span>
              </div>
              <span style={{ fontSize:'10px', color:t.textMuted, whiteSpace:'nowrap', ...ff }}>{a.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ──────────────────────────────────────────────────────────────────────────
  // SCREEN: JOURNAL
  // ──────────────────────────────────────────────────────────────────────────
  const renderJournal = () => (
    <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' }}>
      <div style={{ padding:'12px 16px', background:t.surface, borderBottom:`1px solid ${t.border}`, flexShrink:0 }}>
        <div style={{ fontSize:'20px', fontWeight:700, color:t.text, ...ff }}>My Journey</div>
        <div style={{ fontSize:'12px', color:t.textMuted, marginTop:'2px', ...ff }}>Every place you've ever been, remembered</div>
      </div>

      <div style={{ flex:1, overflowY:'auto', padding:'12px' }}>
        {/* Stats grid */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'8px', marginBottom:'16px' }}>
          {[{icon:'🗺️',l:'Zones Claimed',v:'47'},{icon:'🚶',l:'km Walked',v:'123.4'},{icon:'🏆',l:'Achievements',v:'12'},{icon:'⚡',l:'Total XP',v:'8,420'}].map(s => (
            <div key={s.l} style={{ ...card({ padding:'12px', display:'flex', alignItems:'center', gap:'10px' }) }}>
              <span style={{ fontSize:'22px' }}>{s.icon}</span>
              <div>
                <div style={{ fontSize:'17px', fontWeight:700, color:t.primary, ...ff }}>{s.v}</div>
                <div style={{ fontSize:'10px', color:t.textMuted, ...ff }}>{s.l}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Achievement badges */}
        <div style={{ fontSize:'11px', fontWeight:700, color:t.textMuted, marginBottom:'8px', letterSpacing:'0.06em', ...ff }}>ACHIEVEMENTS</div>
        <div style={{ display:'flex', gap:'8px', overflowX:'auto', paddingBottom:'8px', marginBottom:'14px' }}>
          {[
            {icon:'🔥',name:'Week Warrior',earned:true},{icon:'🌆',name:'City Mapper',earned:true},{icon:'🏛️',name:'Historian',earned:true},
            {icon:'🌙',name:'Night Scout',earned:false},{icon:'🤝',name:'Alliance',earned:false},{icon:'⚡',name:'Speed Runner',earned:false},
          ].map((a,i) => (
            <div key={i} style={{ flexShrink:0, width:'72px', textAlign:'center' }}>
              <div style={{ width:'56px', height:'56px', background: a.earned ? `linear-gradient(135deg,${t.primary}22,${t.secondary}22)` : t.surface3, border:`1px solid ${a.earned ? t.primary : t.border}`, borderRadius:'14px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'24px', margin:'0 auto 4px', opacity: a.earned ? 1 : 0.4 }}>
                {a.icon}
              </div>
              <div style={{ fontSize:'9px', color: a.earned ? t.text : t.textMuted, fontWeight: a.earned ? 600 : 400, ...ff }}>{a.name}</div>
            </div>
          ))}
        </div>

        {/* Discovery log */}
        <div style={{ fontSize:'11px', fontWeight:700, color:t.textMuted, marginBottom:'8px', letterSpacing:'0.06em', ...ff }}>DISCOVERIES</div>
        {discoveries.map((d,i) => (
          <div key={i} style={{ ...card({ padding:'10px 12px', marginBottom:'6px', display:'flex', alignItems:'center', gap:'12px' }) }}>
            <div style={{ width:'38px', height:'38px', background:t.surface2, borderRadius:'10px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'18px', flexShrink:0 }}>
              {d.icon}
            </div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:'13px', fontWeight:600, color:t.text, ...ff }}>{d.name}</div>
              <div style={{ fontSize:'11px', color:t.textMuted, ...ff }}>{d.date}</div>
            </div>
            <div style={{ fontSize:'12px', fontWeight:700, color:t.success, ...ff }}>+{d.xp} XP</div>
          </div>
        ))}
      </div>
    </div>
  );

  // ──────────────────────────────────────────────────────────────────────────
  // SCREEN: PROFILE
  // ──────────────────────────────────────────────────────────────────────────
  const renderProfile = () => (
    <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' }}>
      {/* Profile hero */}
      <div style={{
        padding:'20px 16px 16px',
        background: isDark
          ? `linear-gradient(160deg, rgba(0,212,255,0.14) 0%, ${t.surface} 55%)`
          : `linear-gradient(160deg, rgba(0,136,187,0.12) 0%, ${t.surface} 55%)`,
        borderBottom:`1px solid ${t.border}`,
        textAlign:'center',
        flexShrink:0,
      }}>
        <div style={{ width:'72px', height:'72px', background:`linear-gradient(135deg,${t.primary},${t.secondary})`, borderRadius:'22px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'32px', margin:'0 auto 12px', boxShadow:`0 0 32px ${t.primaryGlow}` }}>
          ⚔️
        </div>
        <div style={{ fontSize:'20px', fontWeight:700, color:t.text, ...ff }}>Commander Alex</div>
        <div style={{ fontSize:'13px', color:t.primary, fontWeight:600, marginTop:'2px', ...ff }}>Iron Eagles  ·  Rank 14  ·  Level 14</div>
        <div style={{ padding:'12px 24px 0', ...ff }}>
          <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'5px' }}>
            <span style={{ fontSize:'11px', color:t.textMuted }}>Level 14</span>
            <span style={{ fontSize:'11px', color:t.textMuted }}>2,840 / 3,500 XP</span>
          </div>
          <div style={{ height:'7px', background:t.border, borderRadius:'4px' }}>
            <div style={{ width:'81%', height:'100%', background:`linear-gradient(90deg,${t.primary},${t.secondary})`, borderRadius:'4px', boxShadow:`0 0 10px ${t.primaryGlow}` }} />
          </div>
        </div>
      </div>

      <div style={{ flex:1, overflowY:'auto', padding:'12px' }}>
        {/* Theme toggle */}
        <div style={{ ...card({ padding:'14px', marginBottom:'10px', display:'flex', alignItems:'center', justifyContent:'space-between' }) }}>
          <div style={{ display:'flex', alignItems:'center', gap:'12px' }}>
            <div style={{ width:'38px', height:'38px', background:t.surface2, borderRadius:'10px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'18px' }}>
              {isDark ? '🌙' : '☀️'}
            </div>
            <div>
              <div style={{ fontSize:'14px', fontWeight:600, color:t.text, ...ff }}>{isDark ? 'Dark Mode' : 'Light Mode'}</div>
              <div style={{ fontSize:'11px', color:t.textMuted, ...ff }}>Tactical display theme</div>
            </div>
          </div>
          <div
            onClick={() => setIsDark(d => !d)}
            style={{ width:'50px', height:'28px', background: isDark ? t.primary : t.border, borderRadius:'14px', position:'relative', cursor:'pointer', transition:'background 0.25s', flexShrink:0 }}
          >
            <div style={{ width:'22px', height:'22px', background:'#fff', borderRadius:'50%', position:'absolute', top:'3px', left: isDark ? '25px' : '3px', transition:'left 0.25s', boxShadow:'0 1px 4px rgba(0,0,0,0.3)' }} />
          </div>
        </div>

        {/* Season pass */}
        <div style={{ ...card({ padding:'14px', marginBottom:'10px', background: isDark ? 'rgba(139,92,246,0.1)' : 'rgba(109,40,217,0.07)', borderColor: `${t.secondary}55` }) }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'8px' }}>
            <div style={{ fontSize:'14px', fontWeight:700, color:t.text, ...ff }}>🌸 Spring Season Pass</div>
            <span style={pill('ACTIVE', t.secondary)}>ACTIVE</span>
          </div>
          <div style={{ fontSize:'12px', color:t.textMuted, marginBottom:'8px', ...ff }}>23 days remaining · 14/30 tiers claimed</div>
          <div style={{ height:'5px', background:t.surface3, borderRadius:'3px' }}>
            <div style={{ width:'47%', height:'100%', background:`linear-gradient(90deg,${t.secondary},${t.primary})`, borderRadius:'3px' }} />
          </div>
        </div>

        {/* Settings list */}
        {[
          {icon:'🔔', l:'Notifications',   sub:'Mission alerts, zone battles'},
          {icon:'🗺️', l:'Map Style',       sub:'Satellite, Tactical, Classic'},
          {icon:'👥', l:'Privacy',          sub:'Location sharing settings'},
          {icon:'🎮', l:'Game Settings',    sub:'Difficulty, auto-claim zones'},
          {icon:'📡', l:'Offline Mode',     sub:'Download area for offline play'},
          {icon:'❓', l:'Help & Tutorial',  sub:'Learn BorderQuest basics'},
        ].map((item, i) => (
          <div key={i} style={{ ...card({ padding:'12px 14px', marginBottom:'6px', display:'flex', alignItems:'center', gap:'12px', cursor:'pointer' }) }}>
            <span style={{ fontSize:'20px' }}>{item.icon}</span>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:'13px', fontWeight:600, color:t.text, ...ff }}>{item.l}</div>
              <div style={{ fontSize:'11px', color:t.textMuted, ...ff }}>{item.sub}</div>
            </div>
            <span style={{ color:t.textDim, fontSize:'18px', fontWeight:300 }}>›</span>
          </div>
        ))}

        <div style={{ height:'8px' }} />
      </div>
    </div>
  );

  // ── Nav tabs ──────────────────────────────────────────────────────────────
  const tabs = [
    { id:'map',      label:'Map',      Icon: MapIcon      },
    { id:'missions', label:'Missions', Icon: ZapIcon      },
    { id:'guild',    label:'Guild',    Icon: UsersIcon    },
    { id:'journal',  label:'Journal',  Icon: BookOpenIcon },
    { id:'profile',  label:'Profile',  Icon: UserIcon     },
  ];

  const renderContent = () => {
    switch(activeTab) {
      case 'map':      return renderMap();
      case 'missions': return renderMissions();
      case 'guild':    return renderGuild();
      case 'journal':  return renderJournal();
      case 'profile':  return renderProfile();
      default:         return renderMap();
    }
  };

  // ── Root render ───────────────────────────────────────────────────────────
  return (
    <div style={{ minHeight:'100vh', background:'#0a0a0a', display:'flex', alignItems:'center', justifyContent:'center', padding:'20px', ...ff }}>
      {/* Phone frame */}
      <div style={{
        width:'375px', height:'812px',
        background: t.bg,
        borderRadius:'50px',
        overflow:'hidden',
        fontFamily:"'Space Grotesk', sans-serif",
        position:'relative',
        display:'flex', flexDirection:'column',
        boxShadow: isDark
          ? '0 0 0 1.5px #182840, 0 0 80px rgba(0,212,255,0.07), 0 40px 100px rgba(0,0,0,0.9)'
          : '0 0 0 1.5px #C6D8EE, 0 40px 100px rgba(0,0,0,0.25)',
      }}>
        {/* Dynamic Island */}
        <div style={{ position:'absolute', top:'12px', left:'50%', transform:'translateX(-50%)', width:'120px', height:'34px', background:'#000', borderRadius:'20px', zIndex:50 }} />

        {/* Status bar */}
        <div style={{ height:'50px', background:t.surface, display:'flex', alignItems:'flex-end', justifyContent:'space-between', padding:'0 22px 9px', flexShrink:0, borderBottom:`1px solid ${t.border}` }}>
          <span style={{ fontSize:'12px', fontWeight:700, color:t.text }}>{timeStr}</span>
          <div style={{ display:'flex', gap:'5px', alignItems:'center' }}>
            {/* WiFi bars */}
            <div style={{ display:'flex', alignItems:'flex-end', gap:'2px', height:'12px' }}>
              {[4,7,10,13].map((h,i) => (
                <div key={i} style={{ width:'3px', height:`${h}px`, background: i < 3 ? t.text : t.textDim, borderRadius:'1px' }} />
              ))}
            </div>
            {/* Battery */}
            <div style={{ display:'flex', alignItems:'center', gap:'1px' }}>
              <div style={{ width:'23px', height:'11px', border:`1.5px solid ${t.text}`, borderRadius:'3px', padding:'1.5px', display:'flex' }}>
                <div style={{ flex:1, background:t.success, borderRadius:'1px' }} />
              </div>
              <div style={{ width:'3px', height:'5px', background:t.text, borderRadius:'0 1.5px 1.5px 0' }} />
            </div>
          </div>
        </div>

        {/* Screen content */}
        <div style={{ flex:1, overflow:'hidden', display:'flex', flexDirection:'column' }}>
          {renderContent()}
        </div>

        {/* Bottom nav */}
        <div style={{ background:t.navBg, borderTop:`1px solid ${t.border}`, display:'flex', paddingBottom:'22px', paddingTop:'8px', flexShrink:0 }}>
          {tabs.map(({ id, label, Icon }) => {
            const active = activeTab === id;
            return (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                onMouseDown={() => setPressedNav(id)}
                onMouseUp={() => setPressedNav(null)}
                style={{
                  flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:'3px',
                  background:'transparent', border:'none', cursor:'pointer', padding:'4px 0',
                  transform: pressedNav === id ? 'scale(0.90)' : 'scale(1)',
                  transition:'transform 0.1s',
                }}
              >
                <div style={{
                  width:'28px', height:'28px',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  background: active ? t.primaryGlow : 'transparent',
                  borderRadius:'8px',
                  transition:'background 0.2s',
                }}>
                  <Icon size={18} color={active ? t.primary : t.textMuted} strokeWidth={active ? 2.2 : 1.8} />
                </div>
                <span style={{
                  fontSize:'9px',
                  fontWeight: active ? 700 : 500,
                  color: active ? t.primary : t.textMuted,
                  fontFamily:"'Space Grotesk', sans-serif",
                  transition:'color 0.15s',
                }}>{label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
