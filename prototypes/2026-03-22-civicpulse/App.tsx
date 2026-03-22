const { useState, useEffect, useRef } = React;

function App() {
  const [activeTab, setActiveTab] = useState('briefing');
  const [isDark, setIsDark] = useState(true);
  const [expandedCard, setExpandedCard] = useState(null);
  const [selectedPin, setSelectedPin] = useState(null);
  const [completedActions, setCompletedActions] = useState(new Set());
  const [activeFilter, setActiveFilter] = useState('all');
  const [mapFilter, setMapFilter] = useState('All');
  const [currentTime, setCurrentTime] = useState('09:41');
  const [pressedItem, setPressedItem] = useState(null);
  const [notifs, setNotifs] = useState({ morning: true, critical: true, civic: false, weekly: true });

  useEffect(() => {
    const upd = () => {
      const n = new Date();
      setCurrentTime(`${String(n.getHours()).padStart(2,'0')}:${String(n.getMinutes()).padStart(2,'0')}`);
    };
    upd();
    const t = setInterval(upd, 30000);
    return () => clearInterval(t);
  }, []);

  const themes = {
    dark: {
      bg: '#06101E', surface: '#0C1829', card: '#102035', cardB: '#1A3050',
      text: '#EDF2FF', textSub: '#5A7898', textMuted: '#2E4460',
      primary: '#00D4AA', primarySoft: 'rgba(0,212,170,0.13)', primaryGlow: 'rgba(0,212,170,0.22)',
      secondary: '#5B7FFF', secondarySoft: 'rgba(91,127,255,0.13)',
      amber: '#FFB020', amberSoft: 'rgba(255,176,32,0.13)',
      red: '#FF4D63', redSoft: 'rgba(255,77,99,0.13)',
      purple: '#A259FF', purpleSoft: 'rgba(162,89,255,0.13)',
      navBg: 'rgba(6,16,30,0.96)', navB: '#1A3050',
      mapBg: '#081528', mapStreet: '#102035', mapBlock: '#0C1D35',
    },
    light: {
      bg: '#F0F5FF', surface: '#FFFFFF', card: '#FFFFFF', cardB: '#D8E4F8',
      text: '#0A1628', textSub: '#4A618A', textMuted: '#9AACC4',
      primary: '#009E7E', primarySoft: 'rgba(0,158,126,0.10)', primaryGlow: 'rgba(0,158,126,0.20)',
      secondary: '#3D67EE', secondarySoft: 'rgba(61,103,238,0.10)',
      amber: '#C4830A', amberSoft: 'rgba(196,131,10,0.10)',
      red: '#D93040', redSoft: 'rgba(217,48,64,0.10)',
      purple: '#7B32CC', purpleSoft: 'rgba(123,50,204,0.10)',
      navBg: 'rgba(255,255,255,0.96)', navB: '#D8E4F8',
      mapBg: '#D8E4F8', mapStreet: '#C2D0E8', mapBlock: '#E4ECFA',
    },
  };

  const T = themes[isDark ? 'dark' : 'light'];

  const I = {
    Home: window.lucide.Home, Map: window.lucide.Map, Zap: window.lucide.Zap,
    Users: window.lucide.Users, Settings: window.lucide.Settings,
    Sun: window.lucide.Sun, Moon: window.lucide.Moon, Bell: window.lucide.Bell,
    AlertTriangle: window.lucide.AlertTriangle, CheckCircle: window.lucide.CheckCircle,
    ChevronRight: window.lucide.ChevronRight, MapPin: window.lucide.MapPin,
    Clock: window.lucide.Clock, Navigation: window.lucide.Navigation,
    Calendar: window.lucide.Calendar, Shield: window.lucide.Shield,
    ArrowRight: window.lucide.ArrowRight, X: window.lucide.X, Info: window.lucide.Info,
    TrendingUp: window.lucide.TrendingUp, ThumbsUp: window.lucide.ThumbsUp,
    MessageSquare: window.lucide.MessageSquare, User: window.lucide.User,
    Wifi: window.lucide.Wifi, Battery: window.lucide.Battery,
    AlertCircle: window.lucide.AlertCircle, Droplets: window.lucide.Droplets || window.lucide.Droplet || window.lucide.Cloud,
    Train: window.lucide.Train || window.lucide.Navigation,
    RefreshCw: window.lucide.RefreshCw, Filter: window.lucide.Filter,
  };
  const ic = (name) => I[name] || I.Info;

  const briefings = [
    { id: 'transit', sev: 'high', cat: 'Transit', icon: 'Train', title: 'MTA Bus M15 Suspended', impact: 'Adds ~28 min to your commute', detail: 'Transit workers on the M15 line began a work stoppage at 6 AM. Limited shuttle service deployed, but delays of 25–40 min expected. Your normal 8:15 AM departure must shift to 7:47 AM to arrive on time.', tags: ['Commute', 'Schedule'], time: '6:02 AM', action: 'See Alternate Routes' },
    { id: 'water', sev: 'high', cat: 'Safety', icon: 'Droplets', title: 'Boil Water Notice — Riverside Dr', impact: 'Affects PS 165, your kids\' school', detail: 'NYC DEP issued a boil water advisory for zip 10024–10025 following emergency pipe repairs overnight. PS 165 confirmed water fountains are off. Pack bottled water for kids. Advisory expected to lift by 6 PM.', tags: ['Health', 'Family'], time: '5:30 AM', action: 'See Affected Zone' },
    { id: 'zoning', sev: 'medium', cat: 'Civic', icon: 'TrendingUp', title: 'Zoning Vote Tonight — UWS', impact: 'Could raise rents 8–15% in your area', detail: 'City Council votes tonight on Upzoning Proposal UD-2026-14, allowing 12-story towers on W72–W86. Housing analysts estimate 8–15% rent increase over 18 months. Meeting at 7 PM, Community Board 7, 250 W 87th St.', tags: ['Housing', 'Finance'], time: '7:15 AM', action: 'Register to Attend' },
    { id: 'closure', sev: 'medium', cat: 'Traffic', icon: 'Navigation', title: 'Fifth Ave Closed — 42nd to 50th', impact: 'Blocks your regular delivery route', detail: 'Marathon prep closes 5th Ave 7 AM–3 PM. Use Madison Ave or 6th Ave. Google Maps is already routing around this closure. Expect +8–12 min on cross-town trips.', tags: ['Commute', 'Errands'], time: '6:45 AM', action: 'View Detour Map' },
    { id: 'market', sev: 'low', cat: 'Local', icon: 'MapPin', title: 'Farmers Market Relocated', impact: 'Union Square → Columbus Circle today', detail: 'Due to a permitted event at Union Square, the Saturday market moves to Central Park South. Hours 8 AM–5 PM. 40 vendors confirmed. Parking available on W 59th.', tags: ['Weekend', 'Shopping'], time: '8:10 AM', action: 'See New Location' },
  ];

  const mapPins = [
    { id: 'transit', x: 112, y: 145, color: '#FF4D63', emoji: '🚌', label: 'M15 Bus Suspension Zone', desc: 'M15 route suspended since 6 AM — use M4 or M104' },
    { id: 'water', x: 75, y: 205, color: '#5B7FFF', emoji: '💧', label: 'Boil Water Advisory', desc: 'Zip 10024–10025 — advisory through 6 PM today' },
    { id: 'zoning', x: 205, y: 95, color: '#FFB020', emoji: '🏛', label: 'Zoning Vote Area', desc: 'W72–W86 St blocks — CB7 meeting tonight 7 PM' },
    { id: 'closure', x: 255, y: 225, color: '#FF4D63', emoji: '🚧', label: '5th Ave Road Closure', desc: 'Closed 42nd–50th St, 7 AM–3 PM for marathon' },
    { id: 'user', x: 152, y: 172, color: '#00D4AA', emoji: '📍', label: 'Your Location', desc: 'W 75th St, Upper West Side, Manhattan' },
  ];

  const actions = [
    { id: 'alarm', pri: 'high', title: 'Leave 28 minutes earlier', sub: 'Beat M15 delays — depart by 7:47 AM', icon: 'Clock', col: 'red', btn: 'Set Alarm' },
    { id: 'water', pri: 'high', title: 'Pack water for school', sub: 'Boil notice affects PS 165 fountains today', icon: 'Droplets', col: 'secondary', btn: 'Remind Me' },
    { id: 'route', pri: 'medium', title: 'Use Madison Ave instead of 5th', sub: '5th Ave closed 7 AM–3 PM, use alternate', icon: 'Navigation', col: 'amber', btn: 'Open Maps' },
    { id: 'meeting', pri: 'medium', title: 'Attend tonight\'s zoning hearing', sub: 'Community Board 7 — 7 PM, W 87th St', icon: 'Calendar', col: 'purple', btn: 'Register' },
    { id: 'pickup', pri: 'medium', title: 'Plan early school pickup', sub: 'PS 165 may dismiss early — check 10 AM email', icon: 'Shield', col: 'amber', btn: 'Set Reminder' },
  ];

  const community = [
    { id: 'transit-why', cat: 'Transit', title: 'Why are MTA workers striking?', summary: 'The Transport Workers Union Local 100 paused contract talks after MTA offered a 2.1% raise — far below 6.4% inflation.', full: 'TWU Local 100 represents ~42,000 workers. Talks broke down Thursday when MTA rejected cost-of-living adjustments. Prior strikes in 2005 and 2011 lasted 3 and 2 days. The Mayor called for emergency mediation starting at 10 AM. Service on M1, M2, M3, M4, and M104 is unaffected.', votes: 847, comments: 34, read: '2 min', ts: '3h ago' },
    { id: 'zoning-why', cat: 'Housing', title: 'What\'s at stake in the UWS rezoning?', summary: 'Proposal UD-2026-14 would allow 12-story towers on 14 UWS blocks, targeting 100,000 new city units by 2028.', full: 'Supporters cite transit proximity and underused air rights. The W72–86 Block Association warns it accelerates luxury development. 3,200 rent-stabilized units currently sit in the affected zone. Housing analysts project 8–15% market rent increases within 18 months if passed.', votes: 1204, comments: 88, read: '3 min', ts: '5h ago' },
    { id: 'water-why', cat: 'Infrastructure', title: 'History of water main breaks — District 7', summary: 'The Riverside Dr main has broken 4 times in 3 years. A $12M replacement is approved but not scheduled until Q3 2026.', full: 'The 96-inch cast iron main was installed in 1921 and serves 18,000 households. DEP rated it "at risk" in 2022. A 2023 break flooded two apartment buildings. Last night\'s freeze at 18°F triggered the current break. DEP crews have been on-site since 3 AM.', votes: 523, comments: 19, read: '2 min', ts: '4h ago' },
    { id: 'marathon', cat: 'Events', title: 'NYC Half Marathon — Full Closure Map', summary: '30,000 runners close 5th Ave and the 59th–42nd corridor from 7 AM–2 PM across Manhattan.', full: 'Route starts at Central Park South, south on 5th Ave to 42nd, north on 1st Ave, return via 59th St approach. NYPD deploys 200 officers. Express bus routes on 5th Ave reroute via 3rd Ave through the afternoon. Expect 15–30 min delays on crosstown buses until 3 PM.', votes: 392, comments: 12, read: '1 min', ts: '6h ago' },
  ];

  const sevStyle = (sev) => ({
    high: { color: T.red, bg: T.redSoft },
    medium: { color: T.amber, bg: T.amberSoft },
    low: { color: T.primary, bg: T.primarySoft },
  }[sev] || { color: T.primary, bg: T.primarySoft });

  const colMap = { red: [T.red, T.redSoft], amber: [T.amber, T.amberSoft], secondary: [T.secondary, T.secondarySoft], purple: [T.purple, T.purpleSoft] };

  const press = (id) => ({ onMouseDown: () => setPressedItem(id), onMouseUp: () => setPressedItem(null), onTouchStart: () => setPressedItem(id), onTouchEnd: () => setPressedItem(null) });

  // ── BRIEFING ──────────────────────────────────────────────────────────────
  const BriefingScreen = () => {
    const filters = ['all', 'transit', 'safety', 'civic', 'traffic', 'local'];
    const filtered = activeFilter === 'all' ? briefings : briefings.filter(b => b.cat.toLowerCase() === activeFilter);
    return (
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 20 }}>
        <div style={{ padding: '14px 20px 10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <p style={{ color: T.textSub, fontSize: 12, margin: 0, fontWeight: 600, letterSpacing: '0.4px', textTransform: 'uppercase' }}>Sun, Mar 22 · Morning Brief</p>
              <h1 style={{ color: T.text, fontSize: 26, fontWeight: 800, margin: '4px 0 0', letterSpacing: '-0.6px', lineHeight: 1.1 }}>Good morning,{'\n'}Alex</h1>
            </div>
            <div style={{ background: T.redSoft, borderRadius: 14, padding: '10px 14px', textAlign: 'center', border: `1px solid ${T.red}35`, marginTop: 4 }}>
              <p style={{ color: T.red, fontSize: 22, fontWeight: 800, margin: 0, lineHeight: 1 }}>4</p>
              <p style={{ color: T.red, fontSize: 9, margin: '2px 0 0', fontWeight: 700, letterSpacing: '0.8px' }}>ALERTS</p>
            </div>
          </div>
          <div style={{ marginTop: 14, background: T.card, borderRadius: 16, padding: '12px 0', border: `1px solid ${T.cardB}`, display: 'flex' }}>
            {[['2', 'Urgent', T.red], ['2', 'Medium', T.amber], ['1', 'Info', T.primary]].map(([n, label, c], i) => (
              <div key={label} style={{ flex: 1, textAlign: 'center', borderRight: i < 2 ? `1px solid ${T.cardB}` : 'none' }}>
                <p style={{ color: c, fontSize: 18, fontWeight: 800, margin: 0 }}>{n}</p>
                <p style={{ color: T.textSub, fontSize: 11, margin: '2px 0 0', fontWeight: 500 }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 7, padding: '0 20px 12px', overflowX: 'auto' }}>
          {filters.map(f => (
            <div key={f} onClick={() => setActiveFilter(f)} style={{ padding: '5px 13px', borderRadius: 20, background: activeFilter === f ? T.primary : T.card, color: activeFilter === f ? (isDark ? '#000' : '#fff') : T.textSub, fontSize: 12, fontWeight: 600, border: `1px solid ${activeFilter === f ? T.primary : T.cardB}`, cursor: 'pointer', whiteSpace: 'nowrap', textTransform: 'capitalize', flexShrink: 0, transition: 'all 0.18s' }}>{f}</div>
          ))}
        </div>
        <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 11 }}>
          {filtered.map(item => {
            const s = sevStyle(item.sev);
            const isExp = expandedCard === item.id;
            const Icon = ic(item.icon);
            return (
              <div key={item.id} onClick={() => setExpandedCard(isExp ? null : item.id)} {...press(item.id)} style={{ background: T.card, borderRadius: 20, border: `1px solid ${isExp ? s.color + '45' : T.cardB}`, overflow: 'hidden', cursor: 'pointer', transition: 'transform 0.14s, box-shadow 0.14s', transform: pressedItem === item.id ? 'scale(0.975)' : 'scale(1)', boxShadow: isExp ? `0 8px 28px ${s.color}20` : `0 2px 10px rgba(0,0,0,0.1)` }}>
                <div style={{ height: 3, background: `linear-gradient(90deg, ${s.color}, ${s.color}55)` }} />
                <div style={{ padding: '13px 15px' }}>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <div style={{ background: s.bg, borderRadius: 12, padding: 9, flexShrink: 0, border: `1px solid ${s.color}30` }}>
                      <Icon size={17} color={s.color} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
                        <div style={{ display: 'flex', gap: 5 }}>
                          <span style={{ background: s.bg, color: s.color, fontSize: 9, fontWeight: 800, padding: '2px 7px', borderRadius: 5, letterSpacing: '0.6px', textTransform: 'uppercase' }}>{item.sev}</span>
                          <span style={{ background: T.surface, color: T.textSub, fontSize: 9, fontWeight: 700, padding: '2px 7px', borderRadius: 5, letterSpacing: '0.3px' }}>{item.cat}</span>
                        </div>
                        <span style={{ color: T.textMuted, fontSize: 11 }}>{item.time}</span>
                      </div>
                      <p style={{ color: T.text, fontSize: 14, fontWeight: 700, margin: '0 0 4px', letterSpacing: '-0.2px', lineHeight: 1.3 }}>{item.title}</p>
                      <p style={{ color: T.primary, fontSize: 12, margin: 0, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
                        <I.Zap size={11} color={T.primary} />{item.impact}
                      </p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 6, marginTop: 10, flexWrap: 'wrap' }}>
                    {item.tags.map(tag => <span key={tag} style={{ background: T.secondarySoft, color: T.secondary, fontSize: 11, fontWeight: 600, padding: '3px 9px', borderRadius: 7 }}>{tag}</span>)}
                  </div>
                  {isExp && (
                    <div style={{ marginTop: 13, borderTop: `1px solid ${T.cardB}`, paddingTop: 13 }}>
                      <p style={{ color: T.textSub, fontSize: 13, lineHeight: 1.65, margin: '0 0 13px' }}>{item.detail}</p>
                      <div onClick={e => { e.stopPropagation(); setActiveTab('actions'); }} style={{ background: T.primarySoft, border: `1px solid ${T.primary}35`, borderRadius: 11, padding: '9px 13px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
                        <span style={{ color: T.primary, fontSize: 13, fontWeight: 700 }}>{item.action}</span>
                        <I.ArrowRight size={15} color={T.primary} />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <div style={{ height: 80 }} />
      </div>
    );
  };

  // ── MAP ───────────────────────────────────────────────────────────────────
  const MapScreen = () => {
    const filters = ['All', 'Transit', 'Safety', 'Traffic', 'Civic'];
    return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ padding: '12px 20px 10px' }}>
          <h2 style={{ color: T.text, fontSize: 22, fontWeight: 800, margin: '0 0 10px', letterSpacing: '-0.4px' }}>Impact Map</h2>
          <div style={{ display: 'flex', gap: 7, overflowX: 'auto' }}>
            {filters.map(f => <div key={f} onClick={() => setMapFilter(f)} style={{ padding: '5px 12px', borderRadius: 16, background: mapFilter === f ? T.primary : T.card, color: mapFilter === f ? (isDark ? '#000' : '#fff') : T.textSub, fontSize: 12, fontWeight: 600, border: `1px solid ${mapFilter === f ? T.primary : T.cardB}`, cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0, transition: 'all 0.15s' }}>{f}</div>)}
          </div>
        </div>
        <div style={{ flex: 1, margin: '0 16px', borderRadius: 20, overflow: 'hidden', border: `1px solid ${T.cardB}`, position: 'relative' }}>
          <svg width="100%" height="100%" viewBox="0 0 343 310" style={{ background: T.mapBg, display: 'block' }}>
            {/* Blocks */}
            {[...Array(7)].map((_, i) => [...Array(6)].map((_, j) => <rect key={`b${i}${j}`} x={i*52+8} y={j*50+8} width={40} height={38} rx={4} fill={T.mapBlock} />))}
            {/* Streets */}
            {[0,1,2,3,4,5,6].map(i => <line key={`h${i}`} x1={0} y1={i*50+2} x2={343} y2={i*50+2} stroke={T.mapStreet} strokeWidth={7} />)}
            {[0,1,2,3,4,5,6,7].map(i => <line key={`v${i}`} x1={i*52+2} y1={0} x2={i*52+2} y2={310} stroke={T.mapStreet} strokeWidth={6} />)}
            {/* Park */}
            <rect x={150} y={8} width={72} height={108} rx={8} fill={isDark ? '#081E0F' : '#BDD8B4'} opacity={0.7} />
            <text x={186} y={65} textAnchor="middle" fill={isDark ? '#1A5028' : '#3A6B30'} fontSize={8} fontWeight={700}>Central Park</text>
            {/* Alert zones */}
            <circle cx={112} cy={145} r={52} fill="rgba(255,77,99,0.10)" stroke="rgba(255,77,99,0.35)" strokeWidth={1.5} strokeDasharray="5,3" />
            <circle cx={75} cy={205} r={42} fill="rgba(91,127,255,0.10)" stroke="rgba(91,127,255,0.35)" strokeWidth={1.5} strokeDasharray="5,3" />
            <circle cx={205} cy={95} r={38} fill="rgba(255,176,32,0.10)" stroke="rgba(255,176,32,0.35)" strokeWidth={1.5} strokeDasharray="5,3" />
            <circle cx={255} cy={225} r={32} fill="rgba(255,77,99,0.10)" stroke="rgba(255,77,99,0.35)" strokeWidth={1.5} strokeDasharray="5,3" />
            {/* Street labels */}
            {[['W 86 St',10,48],['W 79 St',10,98],['W 72 St',10,148],['W 65 St',10,198],['W 58 St',10,248]].map(([label, x, y]) => (
              <text key={label} x={x} y={y} fill={isDark ? '#1E3A5A' : '#7A92B2'} fontSize={7} fontWeight={600}>{label}</text>
            ))}
            {/* Pins */}
            {mapPins.map(pin => {
              const active = selectedPin?.id === pin.id;
              return (
                <g key={pin.id} onClick={() => setSelectedPin(active ? null : pin)} style={{ cursor: 'pointer' }}>
                  {active && <circle cx={pin.x} cy={pin.y} r={26} fill={pin.color} fillOpacity={0.15} />}
                  <circle cx={pin.x} cy={pin.y} r={active ? 14 : 11} fill={pin.color} fillOpacity={0.25} stroke={pin.color} strokeWidth={1.5} />
                  <circle cx={pin.x} cy={pin.y} r={active ? 8 : 6} fill={pin.color} />
                  {pin.id === 'user' && <>
                    <circle cx={pin.x} cy={pin.y} r={20} fill="none" stroke={pin.color} strokeWidth={1.2} strokeOpacity={0.4} />
                    <circle cx={pin.x} cy={pin.y} r={28} fill="none" stroke={pin.color} strokeWidth={0.8} strokeOpacity={0.2} />
                  </>}
                  <text x={pin.x} y={pin.y + 4} textAnchor="middle" fontSize={9}>{pin.emoji}</text>
                </g>
              );
            })}
          </svg>
          {selectedPin && (
            <div style={{ position: 'absolute', bottom: 12, left: 12, right: 12, background: isDark ? 'rgba(10,20,38,0.96)' : 'rgba(255,255,255,0.96)', borderRadius: 16, padding: 15, border: `1px solid ${selectedPin.color}50`, backdropFilter: 'blur(16px)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 5 }}>
                    <div style={{ width: 9, height: 9, borderRadius: '50%', background: selectedPin.color, flexShrink: 0 }} />
                    <span style={{ color: T.text, fontSize: 14, fontWeight: 700 }}>{selectedPin.label}</span>
                  </div>
                  <p style={{ color: T.textSub, fontSize: 12, margin: 0, lineHeight: 1.5 }}>{selectedPin.desc}</p>
                </div>
                <div onClick={() => setSelectedPin(null)} style={{ padding: 4, cursor: 'pointer', marginLeft: 8 }}>
                  <I.X size={15} color={T.textSub} />
                </div>
              </div>
              <div onClick={() => { setActiveTab('briefing'); setSelectedPin(null); }} style={{ marginTop: 10, background: `${selectedPin.color}18`, border: `1px solid ${selectedPin.color}35`, borderRadius: 10, padding: '8px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
                <span style={{ color: selectedPin.color, fontSize: 12, fontWeight: 700 }}>View full briefing</span>
                <I.ArrowRight size={13} color={selectedPin.color} />
              </div>
            </div>
          )}
        </div>
        <div style={{ padding: '10px 20px 8px', display: 'flex', gap: 14, justifyContent: 'center' }}>
          {[[T.red,'Critical'],[T.amber,'Medium'],[T.secondary,'Safety'],[T.primary,'You']].map(([c, l]) => (
            <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: c }} />
              <span style={{ color: T.textSub, fontSize: 11, fontWeight: 500 }}>{l}</span>
            </div>
          ))}
        </div>
        <div style={{ height: 68 }} />
      </div>
    );
  };

  // ── ACTIONS ───────────────────────────────────────────────────────────────
  const ActionsScreen = () => (
    <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 20 }}>
      <div style={{ padding: '14px 20px 14px' }}>
        <p style={{ color: T.textSub, fontSize: 12, margin: '0 0 2px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.4px' }}>Based on today's alerts</p>
        <h2 style={{ color: T.text, fontSize: 24, fontWeight: 800, margin: '0 0 14px', letterSpacing: '-0.4px' }}>Recommended Actions</h2>
        <div style={{ background: T.card, borderRadius: 16, padding: '13px 16px', border: `1px solid ${T.cardB}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 9 }}>
            <span style={{ color: T.text, fontSize: 13, fontWeight: 600 }}>Preparedness today</span>
            <span style={{ color: T.primary, fontSize: 13, fontWeight: 700 }}>{completedActions.size}/{actions.length} done</span>
          </div>
          <div style={{ background: T.cardB, borderRadius: 6, height: 7, overflow: 'hidden' }}>
            <div style={{ background: `linear-gradient(90deg, ${T.primary}, ${T.secondary})`, height: '100%', width: `${(completedActions.size / actions.length) * 100}%`, borderRadius: 6, transition: 'width 0.4s ease' }} />
          </div>
        </div>
      </div>
      <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {actions.map(action => {
          const done = completedActions.has(action.id);
          const Icon = ic(action.icon);
          const [ac, as] = colMap[action.col] || [T.primary, T.primarySoft];
          return (
            <div key={action.id} {...press(action.id)} style={{ background: done ? T.primarySoft : T.card, borderRadius: 17, border: `1px solid ${done ? T.primary + '35' : T.cardB}`, padding: '13px 15px', display: 'flex', alignItems: 'center', gap: 13, transition: 'all 0.18s', opacity: done ? 0.65 : 1, transform: pressedItem === action.id ? 'scale(0.975)' : 'scale(1)' }}>
              <div style={{ background: done ? T.primarySoft : as, borderRadius: 12, padding: 10, flexShrink: 0, border: `1px solid ${done ? T.primary + '30' : ac + '25'}` }}>
                <Icon size={17} color={done ? T.primary : ac} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ color: T.text, fontSize: 14, fontWeight: 700, margin: '0 0 3px', textDecoration: done ? 'line-through' : 'none', textDecorationColor: T.textSub }}>{action.title}</p>
                <p style={{ color: T.textSub, fontSize: 12, margin: 0, lineHeight: 1.4 }}>{action.sub}</p>
              </div>
              <div onClick={() => setCompletedActions(p => { const n = new Set(p); n.has(action.id) ? n.delete(action.id) : n.add(action.id); return n; })} style={{ background: done ? T.primary : as, borderRadius: 9, padding: done ? '6px 7px' : '6px 11px', cursor: 'pointer', border: `1px solid ${done ? T.primary : ac + '35'}`, flexShrink: 0, transition: 'all 0.2s' }}>
                {done ? <I.CheckCircle size={14} color={isDark ? '#000' : '#fff'} /> : <span style={{ color: ac, fontSize: 11, fontWeight: 700 }}>{action.btn}</span>}
              </div>
            </div>
          );
        })}
      </div>
      <div style={{ margin: '14px 16px 0', background: T.primarySoft, borderRadius: 14, padding: '13px 15px', border: `1px solid ${T.primary}28` }}>
        <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
          <I.Info size={15} color={T.primary} style={{ flexShrink: 0, marginTop: 2 }} />
          <p style={{ color: T.textSub, fontSize: 13, margin: 0, lineHeight: 1.55 }}><span style={{ color: T.primary, fontWeight: 700 }}>Tip: </span>Completing actions before 8 AM gives you the most lead time for today's disruptions.</p>
        </div>
      </div>
      <div style={{ height: 80 }} />
    </div>
  );

  // ── COMMUNITY ─────────────────────────────────────────────────────────────
  const CommunityScreen = () => {
    const catColor = { Transit: T.red, Housing: T.amber, Infrastructure: T.secondary, Events: T.purple };
    return (
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 20 }}>
        <div style={{ padding: '14px 20px 14px' }}>
          <p style={{ color: T.textSub, fontSize: 12, margin: '0 0 2px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.4px' }}>Understand the full picture</p>
          <h2 style={{ color: T.text, fontSize: 24, fontWeight: 800, margin: 0, letterSpacing: '-0.4px' }}>Community Context</h2>
        </div>
        <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {community.map(art => {
            const isExp = expandedCard === art.id;
            const cc = catColor[art.cat] || T.primary;
            return (
              <div key={art.id} onClick={() => setExpandedCard(isExp ? null : art.id)} {...press(art.id)} style={{ background: T.card, borderRadius: 20, border: `1px solid ${isExp ? cc + '40' : T.cardB}`, overflow: 'hidden', cursor: 'pointer', boxShadow: isExp ? `0 6px 22px ${cc}18` : 'none', transition: 'box-shadow 0.2s, transform 0.14s', transform: pressedItem === art.id ? 'scale(0.975)' : 'scale(1)' }}>
                <div style={{ padding: '14px 15px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <span style={{ background: `${cc}20`, color: cc, fontSize: 10, fontWeight: 800, padding: '3px 9px', borderRadius: 7, letterSpacing: '0.3px' }}>{art.cat}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <I.Clock size={10} color={T.textMuted} />
                      <span style={{ color: T.textMuted, fontSize: 11 }}>{art.read} read</span>
                    </div>
                  </div>
                  <h3 style={{ color: T.text, fontSize: 15, fontWeight: 700, margin: '0 0 7px', letterSpacing: '-0.2px', lineHeight: 1.35 }}>{art.title}</h3>
                  <p style={{ color: T.textSub, fontSize: 13, margin: 0, lineHeight: 1.55 }}>{art.summary}</p>
                  {isExp && (
                    <div style={{ marginTop: 11, borderTop: `1px solid ${T.cardB}`, paddingTop: 11 }}>
                      <p style={{ color: T.textSub, fontSize: 13, lineHeight: 1.65, margin: 0 }}>{art.full}</p>
                    </div>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 11, paddingTop: 11, borderTop: `1px solid ${T.cardB}` }}>
                    <div style={{ display: 'flex', gap: 14 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                        <I.ThumbsUp size={12} color={T.textMuted} />
                        <span style={{ color: T.textMuted, fontSize: 12, fontWeight: 500 }}>{art.votes.toLocaleString()}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                        <I.MessageSquare size={12} color={T.textMuted} />
                        <span style={{ color: T.textMuted, fontSize: 12, fontWeight: 500 }}>{art.comments}</span>
                      </div>
                    </div>
                    <span style={{ color: T.textMuted, fontSize: 11 }}>{art.ts}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div style={{ height: 80 }} />
      </div>
    );
  };

  // ── SETTINGS ──────────────────────────────────────────────────────────────
  const SettingsScreen = () => {
    const SectionLabel = ({ label }) => <p style={{ color: T.textSub, fontSize: 10, fontWeight: 800, padding: '14px 16px 6px', margin: 0, letterSpacing: '1.2px', textTransform: 'uppercase' }}>{label}</p>;
    const Row = ({ icon, label, sub, color, children, last }) => {
      const Icon = ic(icon);
      return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 13, padding: '12px 16px', borderTop: last ? 'none' : `1px solid ${T.cardB}` }}>
          <div style={{ background: `${color || T.primary}18`, borderRadius: 10, padding: 8, flexShrink: 0 }}>
            <Icon size={16} color={color || T.primary} />
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ color: T.text, fontSize: 13, fontWeight: 600, margin: 0 }}>{label}</p>
            {sub && <p style={{ color: T.textSub, fontSize: 12, margin: '2px 0 0' }}>{sub}</p>}
          </div>
          {children}
        </div>
      );
    };
    const Toggle = ({ val, onToggle }) => (
      <div onClick={onToggle} style={{ width: 44, height: 26, borderRadius: 13, background: val ? T.primary : T.textMuted, position: 'relative', cursor: 'pointer', transition: 'background 0.25s', flexShrink: 0 }}>
        <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#fff', position: 'absolute', top: 3, left: val ? 21 : 3, transition: 'left 0.25s', boxShadow: '0 1px 4px rgba(0,0,0,0.25)' }} />
      </div>
    );
    const zones = [['Home', 'W 75th St, Upper West Side', T.primary], ['Navigation', 'Midtown East, New York', T.secondary], ['Shield', 'PS 165, Riverside Dr', T.amber]];
    const sources = ['NYC OpenData', 'MTA Real-Time', 'NYC DEP Alerts', 'Community Board 7', 'Gothamist', 'NY1 Local'];
    return (
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 20 }}>
        <div style={{ padding: '14px 20px 18px', background: `linear-gradient(180deg, ${T.primarySoft} 0%, transparent 100%)` }}>
          <h2 style={{ color: T.text, fontSize: 24, fontWeight: 800, margin: '0 0 16px', letterSpacing: '-0.4px' }}>Settings</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 54, height: 54, borderRadius: 17, background: `linear-gradient(135deg, ${T.primary}, ${T.secondary})`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 4px 16px ${T.primary}40` }}>
              <I.User size={24} color="#fff" />
            </div>
            <div>
              <p style={{ color: T.text, fontSize: 17, fontWeight: 700, margin: 0 }}>Alex Rivera</p>
              <p style={{ color: T.textSub, fontSize: 13, margin: '2px 0 0' }}>Upper West Side · Manhattan</p>
            </div>
          </div>
        </div>
        <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 11 }}>
          <div style={{ background: T.card, borderRadius: 16, border: `1px solid ${T.cardB}`, overflow: 'hidden' }}>
            <SectionLabel label="Appearance" />
            <Row icon={isDark ? 'Moon' : 'Sun'} label={isDark ? 'Dark Mode' : 'Light Mode'} sub={`Switch to ${isDark ? 'light' : 'dark'} theme`} color={isDark ? T.amber : T.secondary} last>
              <Toggle val={isDark} onToggle={() => setIsDark(!isDark)} />
            </Row>
          </div>
          <div style={{ background: T.card, borderRadius: 16, border: `1px solid ${T.cardB}`, overflow: 'hidden' }}>
            <SectionLabel label="Your Zones" />
            {zones.map(([icon, val, color], i) => (
              <Row key={icon} icon={icon} label={['Home', 'Work', 'School Zone'][i]} sub={val} color={color}>
                <I.ChevronRight size={15} color={T.textMuted} />
              </Row>
            ))}
          </div>
          <div style={{ background: T.card, borderRadius: 16, border: `1px solid ${T.cardB}`, overflow: 'hidden' }}>
            <SectionLabel label="Notifications" />
            {[['Bell','Morning Brief','Daily digest at 7:00 AM','morning'],['AlertTriangle','Critical Alerts','Urgent safety & transit','critical'],['Calendar','Civic Events','Meetings & votes nearby','civic'],['RefreshCw','Weekly Summary','Every Sunday evening','weekly']].map(([icon, label, sub, key], i) => (
              <Row key={key} icon={icon} label={label} sub={sub} color={T.primary}>
                <Toggle val={notifs[key]} onToggle={() => setNotifs(p => ({ ...p, [key]: !p[key] }))} />
              </Row>
            ))}
          </div>
          <div style={{ background: T.card, borderRadius: 16, border: `1px solid ${T.cardB}`, overflow: 'hidden' }}>
            <SectionLabel label="Trusted Sources" />
            {sources.map((s, i) => (
              <div key={s} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '11px 16px', borderTop: i === 0 ? 'none' : `1px solid ${T.cardB}` }}>
                <span style={{ color: T.text, fontSize: 13, fontWeight: 500 }}>{s}</span>
                <div style={{ width: 7, height: 7, borderRadius: '50%', background: T.primary }} />
              </div>
            ))}
          </div>
          <div style={{ background: T.primarySoft, borderRadius: 16, border: `1px solid ${T.primary}30`, padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ color: T.text, fontSize: 15, fontWeight: 700, margin: 0 }}>CivicPulse</p>
              <p style={{ color: T.textSub, fontSize: 12, margin: '2px 0 0' }}>v1.0.0 · News that affects your day now.</p>
            </div>
            <span style={{ color: T.primary, fontSize: 12, fontWeight: 800, background: T.card, padding: '4px 10px', borderRadius: 8, border: `1px solid ${T.primary}30` }}>v1.0</span>
          </div>
        </div>
        <div style={{ height: 80 }} />
      </div>
    );
  };

  // ── NAV & SHELL ───────────────────────────────────────────────────────────
  const tabs = [
    { id: 'briefing', icon: 'Home', label: 'Brief', badge: true },
    { id: 'map', icon: 'Map', label: 'Map' },
    { id: 'actions', icon: 'Zap', label: 'Act' },
    { id: 'community', icon: 'Users', label: 'Context' },
    { id: 'settings', icon: 'Settings', label: 'More' },
  ];

  const Screen = { briefing: BriefingScreen, map: MapScreen, actions: ActionsScreen, community: CommunityScreen, settings: SettingsScreen };
  const ActiveScreen = Screen[activeTab] || BriefingScreen;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Plus Jakarta Sans', sans-serif; -webkit-font-smoothing: antialiased; }
        ::-webkit-scrollbar { display: none; }
        body { background: #e4e8f0; }
      `}} />
      <div style={{ background: 'linear-gradient(135deg, #d8dde8, #e8ecf5)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px 0' }}>
        <div style={{ width: 375, height: 812, background: T.bg, borderRadius: 52, overflow: 'hidden', position: 'relative', boxShadow: '0 45px 90px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.08)', display: 'flex', flexDirection: 'column', transition: 'background 0.28s ease' }}>
          {/* Dynamic Island */}
          <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 13, paddingBottom: 2, background: T.bg, flexShrink: 0 }}>
            <div style={{ width: 124, height: 35, background: '#000', borderRadius: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
              <div style={{ width: 13, height: 13, borderRadius: '50%', background: '#0A0A0A', border: '2px solid #222' }} />
              <div style={{ width: 9, height: 9, borderRadius: '50%', background: '#0A0A0A', border: '1.5px solid #222' }} />
            </div>
          </div>
          {/* Status bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 28px 6px', background: T.bg, flexShrink: 0 }}>
            <span style={{ color: T.text, fontSize: 15, fontWeight: 700, letterSpacing: '-0.3px' }}>{currentTime}</span>
            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              <I.Wifi size={13} color={T.text} />
              <I.Battery size={16} color={T.text} />
            </div>
          </div>
          {/* Content */}
          <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <ActiveScreen />
          </div>
          {/* Bottom nav */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: T.navBg, borderTop: `1px solid ${T.navB}`, backdropFilter: 'blur(20px)', padding: '8px 4px 22px', display: 'flex', justifyContent: 'space-around', transition: 'background 0.28s ease' }}>
            {tabs.map(tab => {
              const active = activeTab === tab.id;
              const TabIcon = ic(tab.icon);
              return (
                <div key={tab.id} onClick={() => { setActiveTab(tab.id); setExpandedCard(null); setSelectedPin(null); }} {...press(`nav-${tab.id}`)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, cursor: 'pointer', padding: '5px 14px', borderRadius: 14, transition: 'transform 0.14s', transform: pressedItem === `nav-${tab.id}` ? 'scale(0.88)' : 'scale(1)' }}>
                  <div style={{ position: 'relative' }}>
                    {active && <div style={{ position: 'absolute', inset: -7, background: T.primarySoft, borderRadius: 12 }} />}
                    <TabIcon size={22} color={active ? T.primary : T.textMuted} style={{ position: 'relative', zIndex: 1, transition: 'color 0.2s' }} />
                    {tab.badge && (
                      <div style={{ position: 'absolute', top: -2, right: -3, width: 8, height: 8, borderRadius: '50%', background: T.red, border: `2px solid ${T.navBg}`, zIndex: 2 }} />
                    )}
                  </div>
                  <span style={{ color: active ? T.primary : T.textMuted, fontSize: 10, fontWeight: active ? 700 : 500, transition: 'color 0.2s' }}>{tab.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
