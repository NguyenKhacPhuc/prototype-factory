function App() {
  const { useState, useEffect, useRef } = React;

  // Load Google Fonts
  const fontStyle = `@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&display=swap');`;

  const [activeTab, setActiveTab] = useState('home');
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [pressedBtn, setPressedBtn] = useState(null);
  const [activeChat, setActiveChat] = useState(null);
  const [likedRequests, setLikedRequests] = useState({});
  const [chatMessage, setChatMessage] = useState('');
  const [chatMessages, setChatMessages] = useState({});
  const [requestStep, setRequestStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showTrustModal, setShowTrustModal] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const h = now.getHours();
      const m = String(now.getMinutes()).padStart(2, '0');
      setCurrentTime(`${h}:${m}`);
    };
    update();
    const t = setInterval(update, 30000);
    return () => clearInterval(t);
  }, []);

  const colors = {
    primary: '#FF8C42',
    yellow: '#FFD166',
    lime: '#06D6A0',
    bg: '#FFFFFF',
    dark: '#1A1A2E',
    mid: '#F7F7F9',
    text: '#1A1A2E',
    muted: '#8A8A9A',
    border: '#EEEEF2',
    orange2: '#FFB347',
    softOrange: '#FFF0E6',
    softYellow: '#FFFBE6',
    softLime: '#E6FBF5',
    softBlue: '#E8F4FD',
  };

  const btnPress = (id) => {
    setPressedBtn(id);
    setTimeout(() => setPressedBtn(null), 180);
  };

  const nearbyRequests = [
    { id: 1, user: 'Maria S.', avatar: 'MS', avatarBg: '#FF8C42', distance: '0.2 mi', time: '15 min', title: 'Need a drill for 20 mins', category: 'Tools', categoryIcon: '🔧', urgency: 'urgent', trust: 4.8, reviews: 12, description: 'Hanging a shelf in my hallway, need a power drill just briefly!', timeWindow: 'Next 30 min', verified: true },
    { id: 2, user: 'James K.', avatar: 'JK', avatarBg: '#FFD166', distance: '0.4 mi', time: '5 min ago', title: 'Quick ride to Walgreens', category: 'Rides', categoryIcon: '🚗', urgency: 'soon', trust: 4.6, reviews: 8, description: 'Picking up a prescription, back in 15 min. Split gas?', timeWindow: 'Next 45 min', verified: true },
    { id: 3, user: 'Priya M.', avatar: 'PM', avatarBg: '#06D6A0', distance: '0.1 mi', time: '2 min ago', title: 'Watch my package? UPS coming', category: 'Package', categoryIcon: '📦', urgency: 'urgent', trust: 5.0, reviews: 22, description: 'I\'m in a meeting until 3pm. UPS arriving between 2-3. Can someone receive it?', timeWindow: '2pm - 3pm', verified: true },
    { id: 4, user: 'Devon A.', avatar: 'DA', avatarBg: '#a78bfa', distance: '0.6 mi', time: '10 min ago', title: 'Best pizza spot near Oak St?', category: 'Advice', categoryIcon: '💡', urgency: 'low', trust: 4.3, reviews: 5, description: 'New to the neighborhood! Looking for authentic Neapolitan pizza nearby.', timeWindow: 'Flexible', verified: false },
    { id: 5, user: 'Lin C.', avatar: 'LC', avatarBg: '#f472b6', distance: '0.3 mi', time: '8 min ago', title: 'Borrow measuring cups?', category: 'Tools', categoryIcon: '🔧', urgency: 'soon', trust: 4.9, reviews: 17, description: 'Baking right now and realized I only have one measuring cup. Need ¼ and ½ cup.', timeWindow: 'Next 20 min', verified: true },
  ];

  const matches = [
    { id: 1, user: 'Maria S.', avatar: 'MS', avatarBg: '#FF8C42', status: 'active', task: 'Lent drill', rating: null, time: '10 min ago', unread: 2 },
    { id: 2, user: 'Priya M.', avatar: 'PM', avatarBg: '#06D6A0', status: 'completed', task: 'Watched package', rating: 5, time: 'Yesterday', unread: 0 },
    { id: 3, user: 'James K.', avatar: 'JK', avatarBg: '#FFD166', status: 'completed', task: 'Gave a ride', rating: 4, time: '2 days ago', unread: 0 },
  ];

  const defaultMessages = {
    1: [
      { from: 'them', text: 'Hi! Are you able to lend the drill? I live at 142 Oak St, Apt 3B', time: '10:32 AM' },
      { from: 'me', text: 'Hey! Sure, I can bring it over in 5 minutes', time: '10:33 AM' },
      { from: 'them', text: 'Amazing, thank you so much! 🙏', time: '10:33 AM' },
    ]
  };

  const categories = [
    { id: 'tools', label: 'Tools', icon: '🔧', color: colors.softOrange },
    { id: 'rides', label: 'Rides', icon: '🚗', color: colors.softYellow },
    { id: 'package', label: 'Package', icon: '📦', color: colors.softLime },
    { id: 'advice', label: 'Advice', icon: '💡', color: colors.softBlue },
    { id: 'food', label: 'Food', icon: '🍕', color: '#FFF0F6' },
    { id: 'skills', label: 'Skills', icon: '⚡', color: '#F0F0FF' },
  ];

  const urgencyBadge = (u) => {
    if (u === 'urgent') return { bg: '#FFEBE8', color: '#D93025', label: 'Urgent' };
    if (u === 'soon') return { bg: '#FFF3E0', color: '#E65100', label: 'Soon' };
    return { bg: '#E8F5E9', color: '#2E7D32', label: 'Flexible' };
  };

  const s = {
    wrapper: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1A1A2E 0%, #16213E 50%, #0F3460 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Space Grotesk', sans-serif",
      padding: '24px 0',
    },
    phone: {
      width: 375,
      height: 812,
      background: colors.bg,
      borderRadius: 44,
      overflow: 'hidden',
      position: 'relative',
      boxShadow: '0 40px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.1)',
      display: 'flex',
      flexDirection: 'column',
    },
    statusBar: {
      height: 44,
      background: colors.bg,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px',
      flexShrink: 0,
      zIndex: 10,
    },
    dynamicIsland: {
      width: 120,
      height: 34,
      background: '#000',
      borderRadius: 20,
      position: 'absolute',
      top: 10,
      left: '50%',
      transform: 'translateX(-50%)',
    },
    content: {
      flex: 1,
      overflowY: 'auto',
      overflowX: 'hidden',
    },
    bottomNav: {
      height: 84,
      background: colors.bg,
      borderTop: `1px solid ${colors.border}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      padding: '0 8px 16px',
      flexShrink: 0,
    },
    navTab: (active) => ({
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 3,
      padding: '6px 16px',
      borderRadius: 16,
      cursor: 'pointer',
      background: active ? colors.softOrange : 'transparent',
      transition: 'all 0.2s',
    }),
    navLabel: (active) => ({
      fontSize: 11,
      fontWeight: 600,
      color: active ? colors.primary : colors.muted,
    }),
    fabBtn: (pressed) => ({
      width: 56,
      height: 56,
      borderRadius: 18,
      background: pressed ? '#e6731e' : `linear-gradient(135deg, ${colors.primary}, ${colors.orange2})`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      transform: pressed ? 'scale(0.93)' : 'scale(1)',
      transition: 'all 0.15s',
      boxShadow: pressed ? '0 2px 8px rgba(255,140,66,0.3)' : '0 6px 20px rgba(255,140,66,0.5)',
    }),
  };

  // ---- HOME SCREEN ----
  const HomeScreen = () => {
    const filters = ['all', 'tools', 'rides', 'package', 'advice'];
    return (
      <div style={{ paddingBottom: 16 }}>
        {/* Header */}
        <div style={{ padding: '20px 20px 0', background: colors.bg }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
            <div>
              <div style={{ fontSize: 22, fontWeight: 800, color: colors.text }}>Neighbor Loop</div>
              <div style={{ fontSize: 13, color: colors.muted, fontWeight: 500 }}>📍 Oak Street area · 8 active now</div>
            </div>
            <div style={{ position: 'relative', cursor: 'pointer' }}>
              <div style={{ width: 42, height: 42, borderRadius: 14, background: colors.softOrange, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🔔</div>
              <div style={{ position: 'absolute', top: -2, right: -2, width: 12, height: 12, borderRadius: 6, background: colors.primary, border: '2px solid white' }} />
            </div>
          </div>
        </div>

        {/* Quick Pulse Banner */}
        <div style={{ margin: '16px 20px', padding: '16px', background: `linear-gradient(135deg, ${colors.primary}, ${colors.orange2})`, borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: 'white', marginBottom: 2 }}>Need something fast?</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.85)', fontWeight: 500 }}>Match in under 2 min</div>
          </div>
          <div
            onClick={() => { btnPress('pulse'); setShowRequestModal(true); setRequestStep(1); }}
            style={{ ...s.fabBtn(pressedBtn === 'pulse'), width: 44, height: 44 }}
          >
            <span style={{ fontSize: 20 }}>⚡</span>
          </div>
        </div>

        {/* Categories */}
        <div style={{ padding: '0 20px', marginBottom: 16 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: colors.text, marginBottom: 10 }}>Categories</div>
          <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
            {categories.map(c => (
              <div
                key={c.id}
                onClick={() => setActiveFilter(c.id)}
                style={{
                  flexShrink: 0,
                  padding: '8px 14px',
                  borderRadius: 14,
                  background: activeFilter === c.id ? colors.primary : c.color,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  transition: 'all 0.2s',
                  border: activeFilter === c.id ? 'none' : `1px solid ${colors.border}`,
                }}
              >
                <span style={{ fontSize: 14 }}>{c.icon}</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: activeFilter === c.id ? 'white' : colors.text }}>{c.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Nearby Requests */}
        <div style={{ padding: '0 20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: colors.text }}>Nearby Requests</div>
            <div style={{ fontSize: 12, color: colors.primary, fontWeight: 600, cursor: 'pointer' }}>See all</div>
          </div>
          {nearbyRequests
            .filter(r => activeFilter === 'all' || r.category.toLowerCase() === activeFilter)
            .map(req => {
              const badge = urgencyBadge(req.urgency);
              return (
                <div
                  key={req.id}
                  onClick={() => btnPress(`req${req.id}`)}
                  style={{
                    background: colors.bg,
                    borderRadius: 20,
                    padding: '16px',
                    marginBottom: 12,
                    border: `1px solid ${colors.border}`,
                    transform: pressedBtn === `req${req.id}` ? 'scale(0.98)' : 'scale(1)',
                    transition: 'all 0.15s',
                    cursor: 'pointer',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 40, height: 40, borderRadius: 13, background: req.avatarBg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: 'white' }}>{req.avatar}</div>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                          <span style={{ fontSize: 13, fontWeight: 700, color: colors.text }}>{req.user}</span>
                          {req.verified && <span style={{ fontSize: 10, background: colors.softLime, color: '#06D6A0', borderRadius: 6, padding: '1px 5px', fontWeight: 600 }}>✓</span>}
                        </div>
                        <div style={{ fontSize: 11, color: colors.muted, fontWeight: 500 }}>⭐ {req.trust} · {req.distance} away</div>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: 11, color: badge.color, fontWeight: 600, background: badge.bg, padding: '3px 8px', borderRadius: 8, marginBottom: 2 }}>{badge.label}</div>
                      <div style={{ fontSize: 10, color: colors.muted }}>{req.time}</div>
                    </div>
                  </div>
                  <div style={{ marginBottom: 8 }}>
                    <div style={{ fontSize: 15, fontWeight: 700, color: colors.text, marginBottom: 3 }}>{req.title}</div>
                    <div style={{ fontSize: 12, color: colors.muted, lineHeight: 1.5 }}>{req.description}</div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <span style={{ fontSize: 11, background: colors.softOrange, color: colors.primary, padding: '4px 9px', borderRadius: 8, fontWeight: 600 }}>{req.categoryIcon} {req.category}</span>
                      <span style={{ fontSize: 11, background: colors.mid, color: colors.muted, padding: '4px 9px', borderRadius: 8, fontWeight: 500 }}>🕐 {req.timeWindow}</span>
                    </div>
                    <div
                      onClick={(e) => { e.stopPropagation(); setLikedRequests(prev => ({...prev, [req.id]: !prev[req.id]})); }}
                      style={{ width: 32, height: 32, borderRadius: 10, background: likedRequests[req.id] ? colors.softOrange : colors.mid, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s', transform: likedRequests[req.id] ? 'scale(1.2)' : 'scale(1)' }}
                    >
                      <span style={{ fontSize: 14 }}>{likedRequests[req.id] ? '🧡' : '🤍'}</span>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    );
  };

  // ---- REQUEST SCREEN ----
  const RequestScreen = () => {
    const [reqTitle, setReqTitle] = useState('');
    const [reqDesc, setReqDesc] = useState('');
    const [timeOpt, setTimeOpt] = useState('now');
    const [submitted, setSubmitted] = useState(false);

    return (
      <div style={{ padding: '20px', paddingBottom: 24 }}>
        <div style={{ fontSize: 22, fontWeight: 800, color: colors.text, marginBottom: 4 }}>Post a Request</div>
        <div style={{ fontSize: 13, color: colors.muted, marginBottom: 20, fontWeight: 500 }}>Get matched with a neighbor in minutes</div>

        {submitted ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 40, textAlign: 'center' }}>
            <div style={{ width: 80, height: 80, borderRadius: 24, background: `linear-gradient(135deg, ${colors.lime}, #04b589)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, marginBottom: 20, boxShadow: '0 12px 30px rgba(6,214,160,0.35)' }}>✓</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: colors.text, marginBottom: 8 }}>Request Posted!</div>
            <div style={{ fontSize: 14, color: colors.muted, marginBottom: 24, lineHeight: 1.6 }}>Notifying 6 neighbors nearby.<br />You'll hear back shortly.</div>
            <div style={{ width: '100%', padding: '16px', background: colors.softLime, borderRadius: 16, marginBottom: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#06D6A0', marginBottom: 4 }}>Live matching...</div>
              <div style={{ height: 6, background: '#C8F7EE', borderRadius: 3, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: '60%', background: colors.lime, borderRadius: 3, animation: 'none' }} />
              </div>
            </div>
            <div
              onClick={() => setSubmitted(false)}
              style={{ padding: '14px 32px', background: `linear-gradient(135deg, ${colors.primary}, ${colors.orange2})`, borderRadius: 14, color: 'white', fontWeight: 700, fontSize: 15, cursor: 'pointer', boxShadow: '0 6px 20px rgba(255,140,66,0.4)' }}
            >Post Another</div>
          </div>
        ) : (
          <>
            {/* Category Select */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: colors.text, marginBottom: 10 }}>Category</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8 }}>
                {categories.map(c => (
                  <div
                    key={c.id}
                    onClick={() => setSelectedCategory(c.id)}
                    style={{
                      padding: '12px 8px',
                      borderRadius: 14,
                      background: selectedCategory === c.id ? colors.softOrange : c.color,
                      border: selectedCategory === c.id ? `2px solid ${colors.primary}` : `2px solid transparent`,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 4,
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                  >
                    <span style={{ fontSize: 22 }}>{c.icon}</span>
                    <span style={{ fontSize: 11, fontWeight: 700, color: selectedCategory === c.id ? colors.primary : colors.text }}>{c.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Title Input */}
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: colors.text, marginBottom: 8 }}>What do you need?</div>
              <input
                value={reqTitle}
                onChange={e => setReqTitle(e.target.value)}
                placeholder="e.g. Need a power drill for 20 min"
                style={{ width: '100%', padding: '14px', borderRadius: 14, border: `1.5px solid ${colors.border}`, fontSize: 14, fontFamily: "'Space Grotesk', sans-serif", color: colors.text, outline: 'none', boxSizing: 'border-box', background: colors.mid }}
              />
            </div>

            {/* Description */}
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: colors.text, marginBottom: 8 }}>Details</div>
              <textarea
                value={reqDesc}
                onChange={e => setReqDesc(e.target.value)}
                placeholder="Add more details to help neighbors understand..."
                rows={3}
                style={{ width: '100%', padding: '14px', borderRadius: 14, border: `1.5px solid ${colors.border}`, fontSize: 14, fontFamily: "'Space Grotesk', sans-serif", color: colors.text, outline: 'none', resize: 'none', boxSizing: 'border-box', background: colors.mid }}
              />
            </div>

            {/* Time Window */}
            <div style={{ marginBottom: 22 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: colors.text, marginBottom: 10 }}>Time Window</div>
              <div style={{ display: 'flex', gap: 8 }}>
                {[{ id: 'now', label: 'Right Now', icon: '⚡' }, { id: '1h', label: 'Next Hour', icon: '🕐' }, { id: 'today', label: 'Today', icon: '📅' }].map(t => (
                  <div
                    key={t.id}
                    onClick={() => setTimeOpt(t.id)}
                    style={{
                      flex: 1,
                      padding: '12px 8px',
                      borderRadius: 14,
                      background: timeOpt === t.id ? colors.primary : colors.mid,
                      color: timeOpt === t.id ? 'white' : colors.text,
                      textAlign: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      fontWeight: 600,
                    }}
                  >
                    <div style={{ fontSize: 18, marginBottom: 3 }}>{t.icon}</div>
                    <div style={{ fontSize: 11, fontWeight: 700 }}>{t.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Radius info */}
            <div style={{ background: colors.softYellow, borderRadius: 14, padding: '12px 16px', marginBottom: 22, display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 20 }}>📍</span>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: colors.text }}>Visible to neighbors within 0.5 miles</div>
                <div style={{ fontSize: 11, color: colors.muted }}>Your exact address is never shared</div>
              </div>
            </div>

            <div
              onClick={() => { if (reqTitle || selectedCategory) setSubmitted(true); }}
              style={{ width: '100%', padding: '16px', background: reqTitle || selectedCategory ? `linear-gradient(135deg, ${colors.primary}, ${colors.orange2})` : colors.border, borderRadius: 16, color: reqTitle || selectedCategory ? 'white' : colors.muted, fontWeight: 800, fontSize: 16, cursor: 'pointer', textAlign: 'center', boxShadow: reqTitle || selectedCategory ? '0 8px 24px rgba(255,140,66,0.4)' : 'none', transition: 'all 0.2s' }}
            >Post Request ⚡</div>
          </>
        )}
      </div>
    );
  };

  // ---- MATCHES SCREEN ----
  const MatchesScreen = () => {
    if (activeChat !== null) {
      const match = matches.find(m => m.id === activeChat);
      const msgs = chatMessages[activeChat] || defaultMessages[activeChat] || [];
      return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          {/* Chat header */}
          <div style={{ padding: '16px 20px', background: colors.bg, borderBottom: `1px solid ${colors.border}`, display: 'flex', alignItems: 'center', gap: 12 }}>
            <div onClick={() => setActiveChat(null)} style={{ fontSize: 20, cursor: 'pointer' }}>←</div>
            <div style={{ width: 40, height: 40, borderRadius: 13, background: match.avatarBg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: 'white' }}>{match.avatar}</div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: colors.text }}>{match.user}</div>
              <div style={{ fontSize: 11, color: colors.lime, fontWeight: 600 }}>● Online nearby</div>
            </div>
            <div style={{ marginLeft: 'auto', fontSize: 20, cursor: 'pointer' }}>⋯</div>
          </div>

          {/* Anon notice */}
          <div style={{ margin: '10px 16px', padding: '10px 14px', background: colors.softYellow, borderRadius: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 14 }}>🔒</span>
            <span style={{ fontSize: 11, fontWeight: 600, color: '#8B6914' }}>Anonymous until you both agree to connect</span>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '8px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {msgs.map((msg, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: msg.from === 'me' ? 'flex-end' : 'flex-start' }}>
                <div style={{
                  maxWidth: '75%',
                  padding: '10px 14px',
                  borderRadius: msg.from === 'me' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                  background: msg.from === 'me' ? `linear-gradient(135deg, ${colors.primary}, ${colors.orange2})` : colors.mid,
                  color: msg.from === 'me' ? 'white' : colors.text,
                  fontSize: 14,
                  fontWeight: 500,
                  lineHeight: 1.5,
                }}>
                  <div>{msg.text}</div>
                  <div style={{ fontSize: 10, opacity: 0.7, marginTop: 3, textAlign: 'right' }}>{msg.time}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div style={{ padding: '12px 16px', borderTop: `1px solid ${colors.border}`, display: 'flex', gap: 10, alignItems: 'center', background: colors.bg }}>
            <input
              value={chatMessage}
              onChange={e => setChatMessage(e.target.value)}
              placeholder="Message..."
              style={{ flex: 1, padding: '12px 16px', borderRadius: 20, border: `1.5px solid ${colors.border}`, fontSize: 14, fontFamily: "'Space Grotesk', sans-serif", outline: 'none', background: colors.mid }}
            />
            <div
              onClick={() => {
                if (!chatMessage.trim()) return;
                const newMsg = { from: 'me', text: chatMessage, time: 'now' };
                setChatMessages(prev => ({ ...prev, [activeChat]: [...(prev[activeChat] || defaultMessages[activeChat] || []), newMsg] }));
                setChatMessage('');
              }}
              style={{ width: 44, height: 44, borderRadius: 14, background: `linear-gradient(135deg, ${colors.primary}, ${colors.orange2})`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 12px rgba(255,140,66,0.4)' }}
            >
              <span style={{ color: 'white', fontSize: 18 }}>↑</span>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div style={{ padding: '20px', paddingBottom: 24 }}>
        <div style={{ fontSize: 22, fontWeight: 800, color: colors.text, marginBottom: 4 }}>My Matches</div>
        <div style={{ fontSize: 13, color: colors.muted, marginBottom: 20, fontWeight: 500 }}>Active connections & history</div>

        {/* Stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, marginBottom: 22 }}>
          {[{ label: 'Helped', val: '7', icon: '🤝', col: colors.softOrange }, { label: 'Requested', val: '5', icon: '📋', col: colors.softYellow }, { label: 'Trust ⭐', val: '4.9', icon: '🏅', col: colors.softLime }].map(st => (
            <div key={st.label} style={{ background: st.col, borderRadius: 16, padding: '14px 10px', textAlign: 'center' }}>
              <div style={{ fontSize: 20, marginBottom: 4 }}>{st.icon}</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: colors.text }}>{st.val}</div>
              <div style={{ fontSize: 11, color: colors.muted, fontWeight: 600 }}>{st.label}</div>
            </div>
          ))}
        </div>

        {/* Active match */}
        <div style={{ fontSize: 13, fontWeight: 700, color: colors.text, marginBottom: 10 }}>Active Now</div>
        {matches.filter(m => m.status === 'active').map(m => (
          <div
            key={m.id}
            onClick={() => setActiveChat(m.id)}
            style={{ background: colors.bg, borderRadius: 18, padding: '14px', marginBottom: 10, border: `2px solid ${colors.primary}`, cursor: 'pointer', boxShadow: '0 4px 16px rgba(255,140,66,0.15)', display: 'flex', alignItems: 'center', gap: 12 }}
          >
            <div style={{ position: 'relative' }}>
              <div style={{ width: 46, height: 46, borderRadius: 14, background: m.avatarBg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, color: 'white' }}>{m.avatar}</div>
              <div style={{ position: 'absolute', bottom: -2, right: -2, width: 13, height: 13, borderRadius: 6, background: colors.lime, border: '2px solid white' }} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: colors.text }}>{m.user}</div>
              <div style={{ fontSize: 12, color: colors.muted }}>{m.task} · {m.time}</div>
            </div>
            {m.unread > 0 && <div style={{ width: 22, height: 22, borderRadius: 11, background: colors.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: 'white' }}>{m.unread}</div>}
          </div>
        ))}

        {/* Completed */}
        <div style={{ fontSize: 13, fontWeight: 700, color: colors.text, marginBottom: 10, marginTop: 6 }}>Past Connections</div>
        {matches.filter(m => m.status === 'completed').map(m => (
          <div
            key={m.id}
            onClick={() => setActiveChat(m.id)}
            style={{ background: colors.mid, borderRadius: 18, padding: '14px', marginBottom: 10, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12 }}
          >
            <div style={{ width: 46, height: 46, borderRadius: 14, background: m.avatarBg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, color: 'white', opacity: 0.8 }}>{m.avatar}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: colors.text }}>{m.user}</div>
              <div style={{ fontSize: 11, color: colors.muted }}>{m.task} · {m.time}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: colors.yellow }}>{'★'.repeat(m.rating)}</div>
              <div style={{ fontSize: 10, color: colors.muted }}>Rated</div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  // ---- PROFILE SCREEN ----
  const ProfileScreen = () => {
    const skills = [
      { label: 'Carpentry', icon: '🪚', count: 4 },
      { label: 'Tech Help', icon: '💻', count: 3 },
      { label: 'Cooking Tips', icon: '👨‍🍳', count: 2 },
      { label: 'Local Expert', icon: '🗺️', count: 6 },
    ];
    const badges = [
      { label: 'Helpful Helper', icon: '🤝', desc: '5+ assists', unlocked: true },
      { label: 'Speed Match', icon: '⚡', desc: 'Matched in <2min', unlocked: true },
      { label: 'Verified Neighbor', icon: '✅', desc: 'ID verified', unlocked: true },
      { label: 'Super Helper', icon: '🦸', desc: '20+ assists', unlocked: false },
    ];
    return (
      <div style={{ paddingBottom: 24 }}>
        {/* Header */}
        <div style={{ background: `linear-gradient(160deg, ${colors.primary} 0%, ${colors.orange2} 100%)`, padding: '28px 20px 36px', position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 66, height: 66, borderRadius: 22, background: 'rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 800, color: 'white', border: '3px solid rgba(255,255,255,0.5)' }}>AS</div>
              <div>
                <div style={{ fontSize: 20, fontWeight: 800, color: 'white' }}>Alex Sandoval</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.85)', fontWeight: 500 }}>📍 Oak Street · Member 4 months</div>
                <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
                  <span style={{ fontSize: 11, background: 'rgba(255,255,255,0.25)', color: 'white', padding: '3px 8px', borderRadius: 8, fontWeight: 600 }}>✅ Verified</span>
                  <span style={{ fontSize: 11, background: 'rgba(255,255,255,0.25)', color: 'white', padding: '3px 8px', borderRadius: 8, fontWeight: 600 }}>⭐ 4.9</span>
                </div>
              </div>
            </div>
            <div style={{ width: 36, height: 36, borderRadius: 11, background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <span style={{ fontSize: 16, color: 'white' }}>✏️</span>
            </div>
          </div>
        </div>

        <div style={{ padding: '0 20px', marginTop: -16 }}>
          {/* Trust Score Card */}
          <div
            onClick={() => setShowTrustModal(true)}
            style={{ background: colors.bg, borderRadius: 20, padding: '16px', marginBottom: 16, boxShadow: '0 4px 20px rgba(0,0,0,0.08)', cursor: 'pointer', border: `1px solid ${colors.border}` }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: colors.text }}>Trust Score</div>
              <span style={{ fontSize: 11, color: colors.primary, fontWeight: 600 }}>View details →</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ fontSize: 36, fontWeight: 800, color: colors.primary }}>4.9</div>
              <div style={{ flex: 1 }}>
                {[5, 4, 3].map(n => (
                  <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                    <span style={{ fontSize: 10, color: colors.muted, width: 8 }}>{n}</span>
                    <div style={{ flex: 1, height: 5, background: colors.border, borderRadius: 3, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: n === 5 ? '80%' : n === 4 ? '15%' : '5%', background: colors.primary, borderRadius: 3 }} />
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: colors.text }}>12 reviews</div>
                <div style={{ fontSize: 11, color: colors.muted }}>from neighbors</div>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: colors.text, marginBottom: 10 }}>My Skills & Items</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {skills.map(sk => (
                <div key={sk.label} style={{ padding: '8px 14px', background: colors.softOrange, borderRadius: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontSize: 14 }}>{sk.icon}</span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: colors.text }}>{sk.label}</span>
                  <span style={{ fontSize: 10, background: colors.primary, color: 'white', borderRadius: 6, padding: '1px 5px', fontWeight: 700 }}>{sk.count}x</span>
                </div>
              ))}
              <div style={{ padding: '8px 14px', background: colors.mid, borderRadius: 12, fontSize: 12, fontWeight: 600, color: colors.muted, cursor: 'pointer' }}>+ Add skill</div>
            </div>
          </div>

          {/* Badges */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: colors.text, marginBottom: 10 }}>Trust Badges</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
              {badges.map(b => (
                <div key={b.label} style={{ background: b.unlocked ? colors.softLime : colors.mid, borderRadius: 16, padding: '14px', opacity: b.unlocked ? 1 : 0.5, display: 'flex', gap: 10, alignItems: 'center' }}>
                  <span style={{ fontSize: 24 }}>{b.icon}</span>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: colors.text }}>{b.label}</div>
                    <div style={{ fontSize: 10, color: colors.muted }}>{b.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Availability toggle */}
          <div style={{ background: colors.softOrange, borderRadius: 18, padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: colors.text }}>Available to Help</div>
              <div style={{ fontSize: 11, color: colors.muted }}>Neighbors can see you're nearby</div>
            </div>
            <div
              onClick={() => {}}
              style={{ width: 52, height: 30, borderRadius: 15, background: `linear-gradient(135deg, ${colors.primary}, ${colors.orange2})`, position: 'relative', cursor: 'pointer' }}
            >
              <div style={{ position: 'absolute', right: 3, top: 3, width: 24, height: 24, borderRadius: 12, background: 'white', boxShadow: '0 2px 5px rgba(0,0,0,0.2)' }} />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const navItems = [
    { id: 'home', label: 'Nearby', icon: '🏘️' },
    { id: 'request', label: 'Request', icon: '⚡' },
    { id: 'matches', label: 'Matches', icon: '🤝' },
    { id: 'profile', label: 'Profile', icon: '👤' },
  ];

  const renderScreen = () => {
    if (activeTab === 'home') return <HomeScreen />;
    if (activeTab === 'request') return <RequestScreen />;
    if (activeTab === 'matches') return <MatchesScreen />;
    if (activeTab === 'profile') return <ProfileScreen />;
    return null;
  };

  return (
    <div style={s.wrapper}>
      <style>{fontStyle}</style>
      <style>{`
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { display: none; }
        input, textarea { font-family: 'Space Grotesk', sans-serif !important; }
      `}</style>

      <div style={s.phone}>
        {/* Status Bar */}
        <div style={s.statusBar}>
          <div style={{ fontSize: 13, fontWeight: 700, color: colors.text, zIndex: 2 }}>{currentTime || '9:41'}</div>
          <div style={s.dynamicIsland} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, zIndex: 2 }}>
            <span style={{ fontSize: 12 }}>▲▲▲</span>
            <span style={{ fontSize: 12 }}>📶</span>
            <span style={{ fontSize: 12 }}>🔋</span>
          </div>
        </div>

        {/* Screen Content */}
        <div style={s.content}>
          {renderScreen()}
        </div>

        {/* Bottom Nav */}
        {!(activeTab === 'matches' && activeChat !== null) && (
          <div style={s.bottomNav}>
            {navItems.map(item => (
              <div
                key={item.id}
                onClick={() => { setActiveTab(item.id); if (item.id !== 'matches') setActiveChat(null); }}
                style={s.navTab(activeTab === item.id)}
              >
                <span style={{ fontSize: activeTab === item.id ? 22 : 20, transition: 'font-size 0.15s' }}>{item.icon}</span>
                <span style={s.navLabel(activeTab === item.id)}>{item.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
