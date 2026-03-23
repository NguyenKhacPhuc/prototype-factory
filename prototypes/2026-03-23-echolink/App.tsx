const { useState, useEffect, useRef } = React;

const themes = {
  dark: {
    bg: '#080C1A', surface: '#111826', card: '#16203A', surfaceHigh: '#1E2C4A',
    primary: '#FF4D8D', primaryDim: 'rgba(255,77,141,0.14)',
    secondary: '#00D4AA', secondaryDim: 'rgba(0,212,170,0.14)',
    accent: '#FFA94D', accentDim: 'rgba(255,169,77,0.14)',
    purple: '#B47FFF', purpleDim: 'rgba(180,127,255,0.14)',
    teal: '#00D4AA', coral: '#FF6B6B', coralDim: 'rgba(255,107,107,0.14)',
    text: '#EFF3FF', textSub: '#7D8FAB', textMuted: '#3D4F6E',
    border: '#1E2E4A', borderMid: '#263348',
    success: '#22D3A0', warning: '#F59E0B', error: '#FF5C7A',
  },
  light: {
    bg: '#F0F4FF', surface: '#FFFFFF', card: '#FFFFFF', surfaceHigh: '#E8EEFF',
    primary: '#E0186A', primaryDim: 'rgba(224,24,106,0.10)',
    secondary: '#00956E', secondaryDim: 'rgba(0,149,110,0.10)',
    accent: '#E8720C', accentDim: 'rgba(232,114,12,0.10)',
    purple: '#7C3AED', purpleDim: 'rgba(124,58,237,0.10)',
    teal: '#009B7D', coral: '#E85050', coralDim: 'rgba(232,80,80,0.10)',
    text: '#0C1228', textSub: '#5A6A88', textMuted: '#A0AEBE',
    border: '#DDE4F4', borderMid: '#EAEFFC',
    success: '#059669', warning: '#D97706', error: '#DC2626',
  },
};

const momentsData = [
  { id: 1, icon: 'Plane', title: 'Delayed — AA Flight 847', sub: 'SFO → JFK • Gate B22 • 3hr delay', people: 14, timeLeft: '3h', dist: '0.1mi', tag: 'Transit', col: '#00D4AA', tagBg: 'rgba(0,212,170,0.14)' },
  { id: 2, icon: 'UtensilsCrossed', title: 'Solo Dinner — Union Square', sub: 'Looking for table-share buddies', people: 6, timeLeft: '2h', dist: '0.3mi', tag: 'Dining', col: '#FFA94D', tagBg: 'rgba(255,169,77,0.14)' },
  { id: 3, icon: 'Mic2', title: 'SXC Conference — Day 1', sub: 'Talks + networking kick off 2pm', people: 89, timeLeft: '6h', dist: '0.5mi', tag: 'Events', col: '#FF4D8D', tagBg: 'rgba(255,77,141,0.14)' },
  { id: 4, icon: 'Home', title: 'New to Mission District', sub: 'Just moved — comparing gyms & cafés', people: 8, timeLeft: '24h', dist: '0.8mi', tag: 'Moving', col: '#B47FFF', tagBg: 'rgba(180,127,255,0.14)' },
  { id: 5, icon: 'HeartPulse', title: 'UCSF ER Waiting Room', sub: 'Long wait — tips & support welcome', people: 12, timeLeft: '4h', dist: '1.2mi', tag: 'Medical', col: '#FF6B6B', tagBg: 'rgba(255,107,107,0.14)' },
];

const circlesData = [
  { id: 1, title: 'Delayed — AA 847', last: 'Anyone splitting a Lyft to SFO hotel?', time: '2m ago', people: 14, col: '#00D4AA', unread: 3, msgs: [
    { u: 'Marcus R.', t: 'Anyone know the updated gate?', time: '4:12 PM', self: false },
    { u: 'You', t: 'Heard B22 confirmed, just changed back', time: '4:14 PM', self: true },
    { u: 'Priya M.', t: 'I\'m at the lounge — confirmed B22. Also splitting Lyft to Marriott anyone?', time: '4:17 PM', self: false },
  ]},
  { id: 2, title: 'SXC Conference Day 1', last: 'Panel room B is packed, try room D', time: '5m ago', people: 89, col: '#FF4D8D', unread: 7, msgs: [
    { u: 'Dana K.', t: 'Room B is standing room only already', time: '2:01 PM', self: false },
    { u: 'Sam T.', t: 'Room D has the same panel streamed live btw', time: '2:04 PM', self: false },
    { u: 'You', t: 'Thanks! Heading to D now', time: '2:05 PM', self: true },
  ]},
];

const exploreCategories = [
  { label: 'All', active: true },
  { label: 'Transit', active: false },
  { label: 'Dining', active: false },
  { label: 'Events', active: false },
  { label: 'Moving', active: false },
  { label: 'Medical', active: false },
];

const onboardSlides = [
  { icon: 'Radio', title: 'Your moment, shared.', body: 'EchoLink finds people living the same real-world moment nearby — turning everyday friction into instant community.', col: '#FF4D8D' },
  { icon: 'Zap', title: 'Find your circle instantly', body: 'From delayed flights to solo city dinners, tap into situation-based circles when you need them most.', col: '#00D4AA' },
  { icon: 'ShieldCheck', title: 'Private & ephemeral', body: 'Every circle vanishes when the moment passes. No feeds, no followers — just real help, right now.', col: '#B47FFF' },
];

function App() {
  const [isDark, setIsDark] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const [onboarded, setOnboarded] = useState(false);
  const [slideIdx, setSlideIdx] = useState(0);

  const t = isDark ? themes.dark : themes.light;
  const font = "'Sora', sans-serif";

  const tabs = [
    { id: 'home', label: 'Home', icon: window.lucide.Home },
    { id: 'explore', label: 'Explore', icon: window.lucide.Compass },
    { id: 'circles', label: 'Circles', icon: window.lucide.Users },
    { id: 'profile', label: 'Profile', icon: window.lucide.User },
  ];

  function OnboardingScreen() {
    const s = onboardSlides[slideIdx];
    const Icon = window.lucide[s.icon];
    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: t.bg, padding: '0 24px 32px', fontFamily: font }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: 12 }}>
          <button onClick={() => setOnboarded(true)} style={{ background: 'none', border: 'none', color: t.textSub, fontSize: 14, fontFamily: font, cursor: 'pointer', padding: '4px 8px' }}>Skip</button>
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 28 }}>
          <div style={{ width: 130, height: 130, borderRadius: 44, background: `${s.col}18`, border: `1.5px solid ${s.col}35`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 0 60px ${s.col}25` }}>
            <Icon size={54} color={s.col} strokeWidth={1.5} />
          </div>
          <div style={{ textAlign: 'center', maxWidth: 290 }}>
            <h1 style={{ fontSize: 30, fontWeight: 800, color: t.text, fontFamily: font, margin: '0 0 14px', lineHeight: 1.15 }}>{s.title}</h1>
            <p style={{ fontSize: 15, color: t.textSub, fontFamily: font, lineHeight: 1.65, margin: 0 }}>{s.body}</p>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 28 }}>
          {onboardSlides.map((_, i) => (
            <div key={i} onClick={() => setSlideIdx(i)} style={{ width: i === slideIdx ? 28 : 8, height: 8, borderRadius: 4, background: i === slideIdx ? s.col : t.border, transition: 'all 0.3s ease', cursor: 'pointer' }} />
          ))}
        </div>
        <button onClick={() => slideIdx < onboardSlides.length - 1 ? setSlideIdx(slideIdx + 1) : setOnboarded(true)}
          style={{ width: '100%', padding: '17px', borderRadius: 18, border: 'none', background: `linear-gradient(135deg, ${s.col}, ${s.col}cc)`, color: '#fff', fontSize: 16, fontWeight: 700, fontFamily: font, cursor: 'pointer', boxShadow: `0 10px 28px ${s.col}40`, transition: 'transform 0.15s ease' }}
          onMouseDown={e => e.currentTarget.style.transform = 'scale(0.97)'}
          onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          {slideIdx < onboardSlides.length - 1 ? 'Continue' : 'Get Started'}
        </button>
      </div>
    );
  }

  function HomeScreen() {
    const [joined, setJoined] = useState([1]);
    const [pressedId, setPressedId] = useState(null);
    const prompts = ['Anyone splitting a Lyft?', 'Best coffee nearby?', 'Open seating?', 'Anyone have a charger?'];
    return (
      <div style={{ padding: '4px 16px 16px', fontFamily: font }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 18, padding: '10px 14px', borderRadius: 14, background: t.surface, border: `1px solid ${t.border}` }}>
          {React.createElement(window.lucide.MapPin, { size: 13, color: t.primary, strokeWidth: 2.5 })}
          <span style={{ fontSize: 12, color: t.textSub, fontWeight: 500, flex: 1 }}>SFO International Airport</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: t.success, boxShadow: `0 0 7px ${t.success}` }} />
            <span style={{ fontSize: 11, color: t.success, fontWeight: 700 }}>LIVE</span>
          </div>
        </div>
        <div style={{ borderRadius: 20, padding: '18px', marginBottom: 20, background: `linear-gradient(145deg, ${t.primary}18, ${t.secondary}10)`, border: `1px solid ${t.primary}25` }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: t.primary, textTransform: 'uppercase', letterSpacing: 1.2, margin: '0 0 5px' }}>What's your moment?</p>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: t.text, margin: '0 0 14px', lineHeight: 1.15 }}>5 circles active<br />within 1.5 miles</h2>
          <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
            {['Delayed Flight', 'Conference', 'New to Area'].map(tag => (
              <span key={tag} style={{ fontSize: 11, fontWeight: 600, color: t.primary, background: t.primaryDim, padding: '4px 10px', borderRadius: 99, border: `1px solid ${t.primary}25` }}>{tag}</span>
            ))}
          </div>
        </div>
        <p style={{ fontSize: 10, fontWeight: 700, color: t.textMuted, textTransform: 'uppercase', letterSpacing: 1.4, margin: '0 0 10px' }}>Smart Prompts</p>
        <div style={{ display: 'flex', gap: 7, overflowX: 'auto', paddingBottom: 4, marginBottom: 20, scrollbarWidth: 'none' }}>
          {prompts.map(p => (
            <div key={p} style={{ flexShrink: 0, padding: '8px 13px', borderRadius: 99, background: t.surface, border: `1px solid ${t.border}`, fontSize: 12, color: t.textSub, cursor: 'pointer', fontFamily: font, whiteSpace: 'nowrap' }}>{p}</div>
          ))}
        </div>
        <p style={{ fontSize: 10, fontWeight: 700, color: t.textMuted, textTransform: 'uppercase', letterSpacing: 1.4, margin: '0 0 12px' }}>Active Near You</p>
        {momentsData.map(m => {
          const Icon = window.lucide[m.icon] || window.lucide.Circle;
          const isIn = joined.includes(m.id);
          return (
            <div key={m.id} style={{ background: t.card, borderRadius: 18, padding: '14px', marginBottom: 10, border: `1px solid ${isIn ? m.col + '40' : t.border}`, transition: 'all 0.25s ease', boxShadow: isIn ? `0 6px 20px ${m.col}18` : 'none' }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{ width: 46, height: 46, borderRadius: 14, background: m.tagBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon size={21} color={m.col} strokeWidth={1.8} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 14, fontWeight: 700, color: t.text, margin: '0 0 3px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{m.title}</p>
                  <p style={{ fontSize: 12, color: t.textSub, margin: '0 0 9px', lineHeight: 1.4 }}>{m.sub}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontSize: 10, color: m.col, fontWeight: 700, background: m.tagBg, padding: '2px 8px', borderRadius: 99 }}>{m.tag}</span>
                    <span style={{ fontSize: 11, color: t.textMuted, display: 'flex', alignItems: 'center', gap: 3 }}>
                      {React.createElement(window.lucide.Users, { size: 11, strokeWidth: 2 })} {m.people}
                    </span>
                    <span style={{ fontSize: 11, color: t.textMuted }}>· {m.timeLeft}</span>
                    <span style={{ fontSize: 11, color: t.textMuted }}>· {m.dist}</span>
                  </div>
                </div>
                <button onClick={() => setJoined(j => isIn ? j.filter(x => x !== m.id) : [...j, m.id])}
                  style={{ flexShrink: 0, padding: '8px 13px', borderRadius: 99, background: isIn ? m.col : 'transparent', border: `1.5px solid ${m.col}`, color: isIn ? '#fff' : m.col, fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: font, transition: 'all 0.2s ease' }}
                  onMouseDown={e => e.currentTarget.style.transform = 'scale(0.93)'}
                  onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
                >
                  {isIn ? 'In ✓' : 'Join'}
                </button>
              </div>
            </div>
          );
        })}
        <div style={{ height: 12 }} />
      </div>
    );
  }

  function ExploreScreen() {
    const [activeCat, setActiveCat] = useState('All');
    const [query, setQuery] = useState('');
    const cats = ['All', 'Transit', 'Dining', 'Events', 'Moving', 'Medical', 'Work'];
    const catColors = { Transit: '#00D4AA', Dining: '#FFA94D', Events: '#FF4D8D', Moving: '#B47FFF', Medical: '#FF6B6B', Work: '#60A5FA', All: '#FF4D8D' };
    const filtered = momentsData.filter(m => (activeCat === 'All' || m.tag === activeCat) && (query === '' || m.title.toLowerCase().includes(query.toLowerCase())));
    return (
      <div style={{ padding: '4px 16px 16px', fontFamily: font }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, padding: '11px 14px', borderRadius: 14, background: t.surface, border: `1px solid ${t.border}` }}>
          {React.createElement(window.lucide.Search, { size: 15, color: t.textMuted, strokeWidth: 2.5 })}
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search moments..." style={{ flex: 1, border: 'none', background: 'transparent', fontSize: 14, color: t.text, fontFamily: font, outline: 'none' }} />
          {query && <button onClick={() => setQuery('')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>{React.createElement(window.lucide.X, { size: 14, color: t.textMuted })}</button>}
        </div>
        <div style={{ display: 'flex', gap: 7, overflowX: 'auto', paddingBottom: 4, marginBottom: 20, scrollbarWidth: 'none' }}>
          {cats.map(c => (
            <button key={c} onClick={() => setActiveCat(c)} style={{ flexShrink: 0, padding: '8px 16px', borderRadius: 99, background: activeCat === c ? (catColors[c] || t.primary) : t.surface, border: `1.5px solid ${activeCat === c ? (catColors[c] || t.primary) : t.border}`, color: activeCat === c ? '#fff' : t.textSub, fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: font, transition: 'all 0.2s ease' }}>{c}</button>
          ))}
        </div>
        <div style={{ marginBottom: 20, borderRadius: 18, overflow: 'hidden', border: `1px solid ${t.border}`, background: t.surface }}>
          <div style={{ padding: '12px 14px', borderBottom: `1px solid ${t.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p style={{ margin: 0, fontSize: 12, fontWeight: 600, color: t.textSub }}>Moment Density Map</p>
            <span style={{ fontSize: 10, fontWeight: 700, color: t.success, background: t.secondaryDim, padding: '3px 8px', borderRadius: 99 }}>LIVE</span>
          </div>
          <div style={{ height: 130, background: `linear-gradient(135deg, ${t.bg}, ${t.surfaceHigh})`, position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {[{x:60,y:50,r:28,c:'#FF4D8D'},{x:180,y:40,r:18,c:'#00D4AA'},{x:120,y:85,r:22,c:'#FFA94D'},{x:280,y:65,r:14,c:'#B47FFF'},{x:50,y:100,r:10,c:'#FF6B6B'}].map((dot, i) => (
              <div key={i} style={{ position: 'absolute', left: dot.x, top: dot.y, width: dot.r * 2, height: dot.r * 2, borderRadius: '50%', background: `${dot.c}30`, border: `2px solid ${dot.c}60`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: dot.c }} />
              </div>
            ))}
            <span style={{ fontSize: 11, color: t.textMuted, position: 'relative', zIndex: 2 }}>Tap a circle to explore</span>
          </div>
        </div>
        <p style={{ fontSize: 10, fontWeight: 700, color: t.textMuted, textTransform: 'uppercase', letterSpacing: 1.4, margin: '0 0 12px' }}>{filtered.length} Moment{filtered.length !== 1 ? 's' : ''} Found</p>
        {filtered.map(m => {
          const Icon = window.lucide[m.icon] || window.lucide.Circle;
          return (
            <div key={m.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '13px', borderRadius: 16, background: t.card, border: `1px solid ${t.border}`, marginBottom: 9 }}>
              <div style={{ width: 42, height: 42, borderRadius: 13, background: m.tagBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon size={19} color={m.col} strokeWidth={1.8} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: t.text, margin: '0 0 2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{m.title}</p>
                <p style={{ fontSize: 11, color: t.textSub, margin: 0 }}>{m.people} people · {m.dist} · expires in {m.timeLeft}</p>
              </div>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: m.col, boxShadow: `0 0 8px ${m.col}`, flexShrink: 0 }} />
            </div>
          );
        })}
        <div style={{ height: 12 }} />
      </div>
    );
  }

  function CirclesScreen() {
    const [activeCircle, setActiveCircle] = useState(null);
    const [msg, setMsg] = useState('');
    const [messages, setMessages] = useState(circlesData.reduce((acc, c) => ({ ...acc, [c.id]: c.msgs }), {}));
    if (activeCircle) {
      const circle = circlesData.find(c => c.id === activeCircle);
      const msgs = messages[activeCircle] || [];
      return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: t.bg, fontFamily: font }}>
          <div style={{ padding: '12px 16px', borderBottom: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', gap: 12, background: t.surface }}>
            <button onClick={() => setActiveCircle(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, display: 'flex', alignItems: 'center' }}>
              {React.createElement(window.lucide.ChevronLeft, { size: 22, color: t.text })}
            </button>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: circle.col, boxShadow: `0 0 8px ${circle.col}` }} />
            <div style={{ flex: 1 }}>
              <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: t.text }}>{circle.title}</p>
              <p style={{ margin: 0, fontSize: 11, color: t.textSub }}>{circle.people} people · Expires in 3h</p>
            </div>
            {React.createElement(window.lucide.MoreHorizontal, { size: 20, color: t.textSub })}
          </div>
          <div style={{ flex: 1, overflowY: 'auto', padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ textAlign: 'center', padding: '8px 16px', background: t.surface, borderRadius: 99, fontSize: 11, color: t.textMuted, alignSelf: 'center', border: `1px solid ${t.border}` }}>Circle created 47 min ago · Ephemeral</div>
            {msgs.map((m, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: m.self ? 'flex-end' : 'flex-start', gap: 4 }}>
                {!m.self && <span style={{ fontSize: 11, color: t.textMuted, paddingLeft: 4 }}>{m.u}</span>}
                <div style={{ maxWidth: '78%', padding: '10px 14px', borderRadius: m.self ? '18px 18px 4px 18px' : '18px 18px 18px 4px', background: m.self ? `linear-gradient(135deg, ${circle.col}, ${circle.col}cc)` : t.card, border: m.self ? 'none' : `1px solid ${t.border}`, fontSize: 13, color: m.self ? '#fff' : t.text, lineHeight: 1.5, fontFamily: font }}>
                  {m.t}
                </div>
                <span style={{ fontSize: 10, color: t.textMuted }}>{m.time}</span>
              </div>
            ))}
          </div>
          <div style={{ padding: '10px 14px 14px', borderTop: `1px solid ${t.border}`, background: t.surface, display: 'flex', gap: 10, alignItems: 'center' }}>
            <input value={msg} onChange={e => setMsg(e.target.value)} placeholder="Say something helpful..." style={{ flex: 1, padding: '11px 14px', borderRadius: 99, background: t.bg, border: `1px solid ${t.border}`, fontSize: 13, color: t.text, fontFamily: font, outline: 'none' }} />
            <button onClick={() => { if (msg.trim()) { setMessages(prev => ({ ...prev, [activeCircle]: [...(prev[activeCircle] || []), { u: 'You', t: msg, time: 'Now', self: true }] })); setMsg(''); } }} style={{ width: 40, height: 40, borderRadius: '50%', background: circle.col, border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}>
              {React.createElement(window.lucide.Send, { size: 16, color: '#fff', strokeWidth: 2.5 })}
            </button>
          </div>
        </div>
      );
    }
    return (
      <div style={{ padding: '4px 16px 16px', fontFamily: font }}>
        <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
          <div style={{ flex: 1, padding: '14px', borderRadius: 16, background: t.primary + '18', border: `1px solid ${t.primary}30`, textAlign: 'center' }}>
            <p style={{ margin: '0 0 2px', fontSize: 22, fontWeight: 800, color: t.primary }}>{circlesData.length}</p>
            <p style={{ margin: 0, fontSize: 11, color: t.textSub }}>Active Circles</p>
          </div>
          <div style={{ flex: 1, padding: '14px', borderRadius: 16, background: t.secondaryDim, border: `1px solid ${t.secondary}30`, textAlign: 'center' }}>
            <p style={{ margin: '0 0 2px', fontSize: 22, fontWeight: 800, color: t.secondary }}>103</p>
            <p style={{ margin: 0, fontSize: 11, color: t.textSub }}>People Met</p>
          </div>
        </div>
        <p style={{ fontSize: 10, fontWeight: 700, color: t.textMuted, textTransform: 'uppercase', letterSpacing: 1.4, margin: '0 0 12px' }}>My Circles</p>
        {circlesData.map(c => (
          <button key={c.id} onClick={() => setActiveCircle(c.id)} style={{ width: '100%', display: 'flex', gap: 12, alignItems: 'center', padding: '14px', borderRadius: 18, background: t.card, border: `1px solid ${t.border}`, marginBottom: 10, cursor: 'pointer', textAlign: 'left', fontFamily: font, transition: 'all 0.2s ease' }}
            onMouseDown={e => e.currentTarget.style.transform = 'scale(0.98)'}
            onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            <div style={{ width: 46, height: 46, borderRadius: 14, background: `${c.col}20`, border: `1.5px solid ${c.col}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              {React.createElement(window.lucide.Radio, { size: 20, color: c.col, strokeWidth: 1.8 })}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: t.text, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 160 }}>{c.title}</p>
                <span style={{ fontSize: 11, color: t.textMuted, flexShrink: 0 }}>{c.time}</span>
              </div>
              <p style={{ margin: 0, fontSize: 12, color: t.textSub, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.last}</p>
            </div>
            {c.unread > 0 && <div style={{ width: 22, height: 22, borderRadius: '50%', background: c.col, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><span style={{ fontSize: 10, fontWeight: 700, color: '#fff' }}>{c.unread}</span></div>}
          </button>
        ))}
        <div style={{ marginTop: 8, padding: '16px', borderRadius: 18, background: t.surface, border: `1px dashed ${t.border}`, textAlign: 'center', cursor: 'pointer' }}>
          {React.createElement(window.lucide.Plus, { size: 20, color: t.primary })}
          <p style={{ margin: '6px 0 0', fontSize: 13, color: t.primary, fontWeight: 600 }}>Create a new circle</p>
          <p style={{ margin: '3px 0 0', fontSize: 11, color: t.textMuted }}>Share your moment with nearby people</p>
        </div>
        <div style={{ height: 12 }} />
      </div>
    );
  }

  function ProfileScreen() {
    const [notif, setNotif] = useState(true);
    const [loc, setLoc] = useState(true);
    const [anon, setAnon] = useState(false);
    const Toggle = ({ on, onToggle, col }) => (
      <div onClick={onToggle} style={{ width: 46, height: 26, borderRadius: 99, background: on ? (col || t.primary) : t.border, cursor: 'pointer', position: 'relative', transition: 'background 0.25s ease', flexShrink: 0 }}>
        <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#fff', position: 'absolute', top: 3, left: on ? 23 : 3, transition: 'left 0.25s ease', boxShadow: '0 1px 4px rgba(0,0,0,0.25)' }} />
      </div>
    );
    const Row = ({ icon, label, sub, right }) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: 13, padding: '14px 16px', borderBottom: `1px solid ${t.borderMid}` }}>
        <div style={{ width: 36, height: 36, borderRadius: 11, background: t.surfaceHigh, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          {React.createElement(window.lucide[icon], { size: 17, color: t.textSub, strokeWidth: 1.8 })}
        </div>
        <div style={{ flex: 1 }}><p style={{ margin: 0, fontSize: 14, color: t.text, fontWeight: 500 }}>{label}</p>{sub && <p style={{ margin: '2px 0 0', fontSize: 11, color: t.textMuted }}>{sub}</p>}</div>
        {right}
      </div>
    );
    return (
      <div style={{ fontFamily: font, paddingBottom: 16 }}>
        <div style={{ padding: '20px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, background: `linear-gradient(180deg, ${t.primary}15, transparent)`, borderBottom: `1px solid ${t.border}` }}>
          <div style={{ position: 'relative' }}>
            <div style={{ width: 76, height: 76, borderRadius: '50%', background: `linear-gradient(135deg, ${t.primary}, ${t.purple})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, fontWeight: 800, color: '#fff' }}>M</div>
            <div style={{ position: 'absolute', bottom: 2, right: 2, width: 16, height: 16, borderRadius: '50%', background: t.success, border: `2px solid ${t.bg}` }} />
          </div>
          <div style={{ textAlign: 'center' }}>
            <h3 style={{ margin: '0 0 3px', fontSize: 18, fontWeight: 800, color: t.text }}>Marcus Reid</h3>
            <p style={{ margin: 0, fontSize: 12, color: t.textSub }}>@marcusreid · SFO Airport</p>
          </div>
          <div style={{ display: 'flex', gap: 20 }}>
            {[['12', 'Circles'], ['48', 'Connections'], ['3', 'Helped']].map(([n, l]) => (
              <div key={l} style={{ textAlign: 'center' }}>
                <p style={{ margin: 0, fontSize: 18, fontWeight: 800, color: t.text }}>{n}</p>
                <p style={{ margin: 0, fontSize: 10, color: t.textMuted }}>{l}</p>
              </div>
            ))}
          </div>
        </div>
        <div style={{ margin: '16px 16px 0', borderRadius: 18, overflow: 'hidden', background: t.card, border: `1px solid ${t.border}` }}>
          <p style={{ margin: 0, padding: '12px 16px 8px', fontSize: 10, fontWeight: 700, color: t.textMuted, textTransform: 'uppercase', letterSpacing: 1.4 }}>Appearance</p>
          <Row icon={isDark ? 'Moon' : 'Sun'} label="Theme" sub={isDark ? 'Dark mode' : 'Light mode'} right={<Toggle on={isDark} onToggle={() => setIsDark(d => !d)} col={t.purple} />} />
        </div>
        <div style={{ margin: '12px 16px 0', borderRadius: 18, overflow: 'hidden', background: t.card, border: `1px solid ${t.border}` }}>
          <p style={{ margin: 0, padding: '12px 16px 8px', fontSize: 10, fontWeight: 700, color: t.textMuted, textTransform: 'uppercase', letterSpacing: 1.4 }}>Privacy & Safety</p>
          <Row icon="Bell" label="Notifications" sub="Moment alerts & messages" right={<Toggle on={notif} onToggle={() => setNotif(n => !n)} />} />
          <Row icon="MapPin" label="Location Access" sub="Required for circle matching" right={<Toggle on={loc} onToggle={() => setLoc(l => !l)} />} />
          <Row icon="EyeOff" label="Anonymous Mode" sub="Hide your name in circles" right={<Toggle on={anon} onToggle={() => setAnon(a => !a)} col={t.accent} />} />
        </div>
        <div style={{ margin: '12px 16px 0', borderRadius: 18, overflow: 'hidden', background: t.card, border: `1px solid ${t.border}` }}>
          <p style={{ margin: 0, padding: '12px 16px 8px', fontSize: 10, fontWeight: 700, color: t.textMuted, textTransform: 'uppercase', letterSpacing: 1.4 }}>Account</p>
          <Row icon="Shield" label="Safety Center" sub="Report & block tools" right={React.createElement(window.lucide.ChevronRight, { size: 16, color: t.textMuted })} />
          <Row icon="HelpCircle" label="How It Works" sub="Learn about ephemeral circles" right={React.createElement(window.lucide.ChevronRight, { size: 16, color: t.textMuted })} />
          <Row icon="LogOut" label="Sign Out" right={React.createElement(window.lucide.ChevronRight, { size: 16, color: t.error })} />
        </div>
        <div style={{ height: 20 }} />
      </div>
    );
  }

  const screens = { home: HomeScreen, explore: ExploreScreen, circles: CirclesScreen, profile: ProfileScreen };

  const navItemStyle = (id) => ({ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, flex: 1, paddingTop: 10, cursor: 'pointer', transition: 'opacity 0.15s ease' });
  const labelStyle = (id) => ({ fontSize: 10, fontWeight: activeTab === id ? 700 : 500, color: activeTab === id ? t.primary : t.textMuted, fontFamily: font });

  if (!onboarded) {
    return (
      <>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&display=swap'); * { box-sizing: border-box; margin: 0; padding: 0; } ::-webkit-scrollbar { display: none; }`}</style>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#0A0C16', fontFamily: font }}>
          <div style={{ width: 375, height: 812, borderRadius: 50, border: '9px solid #1A1A2E', overflow: 'hidden', position: 'relative', boxShadow: '0 30px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06) inset', background: t.bg }}>
            <div style={{ position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)', width: 118, height: 34, borderRadius: 20, background: '#000', zIndex: 100 }} />
            <div style={{ height: 56, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '0 22px 8px', background: t.bg }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: t.text, fontFamily: font }}>9:41</span>
              <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
                {React.createElement(window.lucide.Signal, { size: 14, color: t.text })}
                {React.createElement(window.lucide.Wifi, { size: 14, color: t.text })}
                {React.createElement(window.lucide.Battery, { size: 16, color: t.text })}
              </div>
            </div>
            <div style={{ height: 'calc(100% - 56px)', overflowY: 'auto', overflowX: 'hidden' }}>
              <OnboardingScreen />
            </div>
          </div>
        </div>
      </>
    );
  }

  const ActiveScreen = screens[activeTab];

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&display=swap'); * { box-sizing: border-box; margin: 0; padding: 0; } ::-webkit-scrollbar { display: none; } input::placeholder { color: ${t.textMuted}; }`}</style>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: isDark ? '#0A0C16' : '#C8D0E8', fontFamily: font, transition: 'background 0.4s ease' }}>
        <div style={{ width: 375, height: 812, borderRadius: 50, border: `9px solid ${isDark ? '#1A1A2E' : '#8090B0'}`, overflow: 'hidden', position: 'relative', boxShadow: isDark ? '0 30px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06) inset' : '0 30px 80px rgba(0,0,0,0.25)', background: t.bg, transition: 'all 0.4s ease' }}>
          {/* Dynamic Island */}
          <div style={{ position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)', width: 118, height: 34, borderRadius: 20, background: '#000', zIndex: 100 }} />
          {/* Status Bar */}
          <div style={{ height: 56, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '0 22px 8px', background: t.bg, position: 'sticky', top: 0, zIndex: 50, transition: 'background 0.4s ease' }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: t.text, fontFamily: font }}>9:41</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              {React.createElement(window.lucide.Signal, { size: 14, color: t.text })}
              {React.createElement(window.lucide.Wifi, { size: 14, color: t.text })}
              {React.createElement(window.lucide.Battery, { size: 16, color: t.text })}
            </div>
          </div>
          {/* Screen header */}
          <div style={{ padding: '8px 20px 10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: t.bg, borderBottom: `1px solid ${t.border}`, transition: 'all 0.4s ease' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 26, height: 26, borderRadius: 8, background: `linear-gradient(135deg, ${t.primary}, ${t.purple})`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {React.createElement(window.lucide.Radio, { size: 13, color: '#fff', strokeWidth: 2.5 })}
              </div>
              <span style={{ fontSize: 17, fontWeight: 800, color: t.text, fontFamily: font }}>EchoLink</span>
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              {React.createElement(window.lucide.Bell, { size: 20, color: t.textSub, strokeWidth: 1.8 })}
            </div>
          </div>
          {/* Content */}
          <div style={{ height: 'calc(100% - 56px - 53px - 90px)', overflowY: 'auto', overflowX: 'hidden', background: t.bg, transition: 'background 0.4s ease' }}>
            <ActiveScreen />
          </div>
          {/* Bottom Nav */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 90, background: t.surface, borderTop: `1px solid ${t.border}`, display: 'flex', justifyContent: 'space-around', alignItems: 'flex-start', transition: 'all 0.4s ease' }}>
            {tabs.map(tab => React.createElement('div', {
              key: tab.id,
              onClick: () => setActiveTab(tab.id),
              style: navItemStyle(tab.id),
            },
              React.createElement('div', { style: { width: 40, height: 28, borderRadius: 12, background: activeTab === tab.id ? t.primaryDim : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s ease' } },
                React.createElement(tab.icon, { size: 20, color: activeTab === tab.id ? t.primary : t.textMuted, strokeWidth: activeTab === tab.id ? 2.5 : 1.8 })
              ),
              React.createElement('span', { style: labelStyle(tab.id) }, tab.label)
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
