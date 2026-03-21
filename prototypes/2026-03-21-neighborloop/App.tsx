// NeighborLoop - Local help, without awkwardness.
// Interactive mobile prototype

function App() {
  const { useState, useEffect, useRef } = React;

  // Inject Google Fonts
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
      * { box-sizing: border-box; margin: 0; padding: 0; }
      ::-webkit-scrollbar { display: none; }
      body { background: #080D1A; }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const [activeTab, setActiveTab] = useState('home');
  const [showPostModal, setShowPostModal] = useState(false);
  const [pressedBtn, setPressedBtn] = useState(null);
  const [likedItems, setLikedItems] = useState({});
  const [respondedItems, setRespondedItems] = useState({});
  const [activeCircle, setActiveCircle] = useState(null);
  const [showMatchDetail, setShowMatchDetail] = useState(null);
  const [postStep, setPostStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [notifDot, setNotifDot] = useState(true);
  const [credits, setCredits] = useState(47);
  const [toast, setToast] = useState(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2200);
  };

  const handleRespond = (id) => {
    setRespondedItems(p => ({ ...p, [id]: true }));
    setCredits(c => c + 5);
    showToast('+5 reciprocity credits earned!');
  };

  const handlePress = (id) => {
    setPressedBtn(id);
    setTimeout(() => setPressedBtn(null), 150);
  };

  // ── Design tokens ─────────────────────────────────────────
  const colors = {
    bg: '#080D1A',
    surface: '#0F1729',
    card: '#152035',
    cardHover: '#1A2845',
    border: '#1E3050',
    primary: '#4ADE80',
    primaryDim: 'rgba(74,222,128,0.15)',
    primaryDimBorder: 'rgba(74,222,128,0.3)',
    amber: '#FBBF24',
    amberDim: 'rgba(251,191,36,0.15)',
    teal: '#38BDF8',
    tealDim: 'rgba(56,189,248,0.12)',
    rose: '#FB7185',
    roseDim: 'rgba(251,113,133,0.15)',
    violet: '#A78BFA',
    violetDim: 'rgba(167,139,250,0.15)',
    text: '#F0F4FF',
    textMuted: '#8899BB',
    textDim: '#4A6080',
  };

  const font = "'Plus Jakarta Sans', sans-serif";

  // ── Data ──────────────────────────────────────────────────
  const needs = [
    {
      id: 1,
      user: 'Mia T.',
      avatar: '👩',
      unit: 'Unit 4B · 2 min ago',
      title: 'Can someone hold my package?',
      desc: 'FedEx is coming between 2–4pm, I have a dentist appt. Happy to return the favor!',
      tags: ['📦 Package', '⏱ 2 hrs', '🏠 Same building'],
      urgency: 'Today',
      urgencyColor: colors.amber,
      category: 'package',
      responses: 2,
    },
    {
      id: 2,
      user: 'Carlos R.',
      avatar: '👨',
      unit: 'Block B · 8 min ago',
      title: 'Borrowing a hand drill for 30 mins',
      desc: 'Just need to hang a shelf, will return it clean. I have my own bits.',
      tags: ['🔧 Tool', '⏱ 30 min', '✅ Verified resident'],
      urgency: 'This week',
      urgencyColor: colors.teal,
      category: 'tool',
      responses: 1,
    },
    {
      id: 3,
      user: 'Priya S.',
      avatar: '👩‍🦱',
      unit: 'Unit 7A · 22 min ago',
      title: 'Quick grocery run to Trader Joe\'s',
      desc: 'Heading to TJ\'s around 6pm — can grab a few items for neighbors. Max 5 items, no heavy stuff.',
      tags: ['🛒 Errands', '🚗 Car available', '⏱ Today 6pm'],
      urgency: 'Today',
      urgencyColor: colors.amber,
      category: 'errand',
      responses: 4,
      isOffer: true,
    },
    {
      id: 4,
      user: 'James K.',
      avatar: '🧔',
      unit: 'Floor 2 · 1 hr ago',
      title: 'Need someone to watch sleeping toddler',
      desc: '15 mins while I run downstairs to pick up food delivery. She\'ll be asleep, just need someone nearby.',
      tags: ['👶 Childcare', '⏱ 15 min', '🏠 Same floor', '🔍 Background checked'],
      urgency: 'Now',
      urgencyColor: colors.rose,
      category: 'childcare',
      responses: 0,
    },
    {
      id: 5,
      user: 'Sofia L.',
      avatar: '👩‍🦰',
      unit: 'Unit 2C · 3 hrs ago',
      title: 'Air pump for bike tires',
      desc: 'Need to inflate before my morning commute. Can return tomorrow, or you can come grab it anytime.',
      tags: ['🚲 Bike', '⏱ Overnight', '✅ Frequent lender'],
      urgency: 'Tomorrow AM',
      urgencyColor: colors.teal,
      category: 'tool',
      responses: 1,
    },
  ];

  const matches = [
    {
      id: 1,
      name: 'Rachel M.',
      avatar: '👩',
      distance: '12 ft · Floor 5',
      match: 98,
      skills: ['Package holding', 'Plant watering', 'Mail pickup'],
      available: 'Available now',
      credits: 89,
      helpedCount: 23,
      badge: 'Super Helper',
      badgeColor: colors.amber,
    },
    {
      id: 2,
      name: 'Tom B.',
      avatar: '👨‍🦳',
      distance: '30 ft · Unit 3D',
      match: 94,
      skills: ['Power tools', 'Handyman', 'Furniture assembly'],
      available: 'After 5pm',
      credits: 134,
      helpedCount: 41,
      badge: 'Trusted Lender',
      badgeColor: colors.teal,
    },
    {
      id: 3,
      name: 'Amara O.',
      avatar: '👩‍🦱',
      distance: '200 ft · Block C',
      match: 87,
      skills: ['Childcare', 'Dog walking', 'Errands'],
      available: 'Weekends',
      credits: 62,
      helpedCount: 18,
      badge: 'Verified Caregiver',
      badgeColor: colors.violet,
    },
    {
      id: 4,
      name: 'Diego F.',
      avatar: '🧑',
      distance: '400 ft · Unit 1A',
      match: 81,
      skills: ['Car rides', 'Airport pickup', 'Grocery runs'],
      available: 'Flexible',
      credits: 205,
      helpedCount: 67,
      badge: 'Community Star',
      badgeColor: colors.primary,
    },
  ];

  const circles = [
    { id: 1, name: 'The Meridian (Building)', icon: '🏢', members: 84, active: 12, color: colors.primary, recent: '3 new needs' },
    { id: 2, name: 'Elm Street Block', icon: '🌳', members: 31, active: 5, color: colors.teal, recent: '1 offer posted' },
    { id: 3, name: 'Meridian Parents', icon: '👶', members: 19, active: 8, color: colors.violet, recent: 'New caregiver added' },
    { id: 4, name: 'Dog Owners Club', icon: '🐾', members: 14, active: 3, color: colors.amber, recent: 'Walk at 7am tomorrow' },
  ];

  const history = [
    { id: 1, type: 'gave', desc: 'Held package for Mia T.', credits: '+10', date: 'Mar 18', icon: '📦' },
    { id: 2, type: 'got', desc: 'Carlos loaned me a drill', credits: '-5', date: 'Mar 15', icon: '🔧' },
    { id: 3, type: 'gave', desc: 'Grocery run for 3 neighbors', credits: '+15', date: 'Mar 12', icon: '🛒' },
    { id: 4, type: 'gave', desc: 'Dog walk for Sofia', credits: '+10', date: 'Mar 9', icon: '🐾' },
    { id: 5, type: 'got', desc: 'Rachel watched my cat', credits: '-10', date: 'Mar 5', icon: '🐱' },
  ];

  // ── Styles ────────────────────────────────────────────────
  const s = {
    phone: {
      width: 375,
      height: 812,
      background: colors.bg,
      borderRadius: 48,
      overflow: 'hidden',
      position: 'relative',
      fontFamily: font,
      boxShadow: '0 40px 120px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.08), inset 0 0 0 1px rgba(255,255,255,0.04)',
      display: 'flex',
      flexDirection: 'column',
    },
    statusBar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '14px 24px 8px',
      flexShrink: 0,
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
      zIndex: 100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    scroll: {
      flex: 1,
      overflowY: 'auto',
      padding: '0 16px 16px',
    },
    navBar: {
      display: 'flex',
      background: colors.surface,
      borderTop: `1px solid ${colors.border}`,
      paddingBottom: 20,
      paddingTop: 8,
      flexShrink: 0,
    },
    navItem: (active) => ({
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 3,
      cursor: 'pointer',
      opacity: active ? 1 : 0.45,
      transition: 'opacity 0.15s',
    }),
    navLabel: (active) => ({
      fontSize: 10,
      fontWeight: active ? 700 : 500,
      color: active ? colors.primary : colors.textMuted,
      letterSpacing: 0.2,
    }),
    card: {
      background: colors.card,
      borderRadius: 16,
      padding: '14px 16px',
      border: `1px solid ${colors.border}`,
      marginBottom: 10,
    },
    tag: (color) => ({
      fontSize: 11,
      fontWeight: 600,
      color: color || colors.textMuted,
      background: color ? `${color}18` : 'rgba(255,255,255,0.06)',
      border: `1px solid ${color ? `${color}30` : 'transparent'}`,
      borderRadius: 20,
      padding: '3px 8px',
      display: 'inline-block',
    }),
    btn: (variant, pressed) => ({
      borderRadius: 12,
      fontFamily: font,
      fontWeight: 700,
      fontSize: 13,
      cursor: 'pointer',
      border: 'none',
      transition: 'transform 0.1s, opacity 0.1s',
      transform: pressed ? 'scale(0.95)' : 'scale(1)',
      ...(variant === 'primary' ? {
        background: colors.primary,
        color: '#0A1A10',
        padding: '10px 18px',
      } : variant === 'ghost' ? {
        background: 'rgba(255,255,255,0.06)',
        color: colors.text,
        padding: '10px 18px',
      } : variant === 'outline' ? {
        background: 'transparent',
        color: colors.primary,
        border: `1.5px solid ${colors.primaryDimBorder}`,
        padding: '9px 16px',
      } : {
        background: colors.card,
        color: colors.textMuted,
        padding: '9px 14px',
      }),
    }),
    sectionTitle: {
      fontSize: 13,
      fontWeight: 700,
      color: colors.textMuted,
      letterSpacing: 0.8,
      textTransform: 'uppercase',
      marginBottom: 10,
      marginTop: 18,
    },
    avatar: (size = 36) => ({
      width: size,
      height: size,
      borderRadius: size / 2,
      background: colors.cardHover,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: size * 0.5,
      flexShrink: 0,
    }),
  };

  // ── Status Bar ────────────────────────────────────────────
  const StatusBar = () => {
    const [time, setTime] = useState(() => {
      const d = new Date();
      return `${d.getHours()}:${String(d.getMinutes()).padStart(2,'0')}`;
    });
    return (
      <div style={s.statusBar}>
        <span style={{ fontSize: 14, fontWeight: 700, color: colors.text, letterSpacing: 0.3 }}>{time}</span>
        <div style={{ width: 130 }} />
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          <svg width="15" height="12" viewBox="0 0 15 12" fill={colors.text}>
            <rect x="0" y="8" width="3" height="4" rx="0.5" opacity="0.4"/>
            <rect x="4" y="5" width="3" height="7" rx="0.5" opacity="0.6"/>
            <rect x="8" y="2" width="3" height="10" rx="0.5" opacity="0.8"/>
            <rect x="12" y="0" width="3" height="12" rx="0.5"/>
          </svg>
          <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
            <path d="M8 3C9.8 3 11.4 3.7 12.6 4.9L14 3.5C12.4 1.9 10.3 1 8 1S3.6 1.9 2 3.5L3.4 4.9C4.6 3.7 6.2 3 8 3Z" fill={colors.text}/>
            <path d="M8 6C9.1 6 10 6.4 10.7 7.1L12.1 5.7C11 4.6 9.6 4 8 4S5 4.6 3.9 5.7L5.3 7.1C6 6.4 6.9 6 8 6Z" fill={colors.text} opacity="0.7"/>
            <circle cx="8" cy="10" r="1.5" fill={colors.text}/>
          </svg>
          <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <div style={{ width: 22, height: 11, borderRadius: 3, border: `1.5px solid ${colors.text}`, padding: 1.5, display: 'flex', alignItems: 'center' }}>
              <div style={{ width: '80%', height: '100%', background: colors.primary, borderRadius: 1 }} />
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ── Toast ─────────────────────────────────────────────────
  const Toast = () => toast ? (
    <div style={{
      position: 'absolute', bottom: 90, left: '50%', transform: 'translateX(-50%)',
      background: colors.primary, color: '#0A1A10', padding: '10px 18px',
      borderRadius: 20, fontSize: 13, fontWeight: 700, zIndex: 999,
      whiteSpace: 'nowrap', boxShadow: `0 8px 24px rgba(74,222,128,0.4)`,
      animation: 'fadeIn 0.2s ease',
    }}>
      {toast}
    </div>
  ) : null;

  // ── HOME SCREEN ───────────────────────────────────────────
  const HomeScreen = () => {
    const [filter, setFilter] = useState('all');
    const filters = [
      { id: 'all', label: 'All' },
      { id: 'now', label: '🔴 Urgent' },
      { id: 'package', label: '📦 Package' },
      { id: 'tool', label: '🔧 Tools' },
      { id: 'errand', label: '🛒 Errands' },
    ];
    const filtered = filter === 'all' ? needs : needs.filter(n => {
      if (filter === 'now') return n.urgency === 'Now';
      return n.category === filter;
    });

    return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Header */}
        <div style={{ padding: '4px 16px 12px', flexShrink: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <div>
              <div style={{ fontSize: 11, color: colors.primary, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 2 }}>
                📍 The Meridian
              </div>
              <div style={{ fontSize: 22, fontWeight: 800, color: colors.text }}>Neighborhood Feed</div>
            </div>
            <div style={{ position: 'relative' }}>
              <div style={{
                width: 40, height: 40, borderRadius: 12,
                background: colors.card, border: `1px solid ${colors.border}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
              }} onClick={() => setNotifDot(false)}>
                {React.createElement(window.lucide.Bell, { size: 18, color: colors.text })}
                {notifDot && <div style={{
                  position: 'absolute', top: 7, right: 8, width: 8, height: 8,
                  background: colors.rose, borderRadius: 4, border: `2px solid ${colors.bg}`
                }} />}
              </div>
            </div>
          </div>

          {/* Post need bar */}
          <div
            onClick={() => setShowPostModal(true)}
            style={{
              display: 'flex', alignItems: 'center', gap: 10,
              background: colors.card, borderRadius: 14,
              border: `1px solid ${colors.border}`, padding: '11px 14px',
              cursor: 'pointer', marginBottom: 14,
            }}
          >
            <div style={s.avatar(30)}>🧑</div>
            <span style={{ color: colors.textDim, fontSize: 14, flex: 1 }}>What do you need from a neighbor?</span>
            <div style={{
              background: colors.primary, color: '#0A1A10', borderRadius: 8,
              padding: '5px 10px', fontSize: 12, fontWeight: 700,
            }}>Post</div>
          </div>

          {/* Filter chips */}
          <div style={{ display: 'flex', gap: 7, overflowX: 'auto', paddingBottom: 2 }}>
            {filters.map(f => (
              <div
                key={f.id}
                onClick={() => setFilter(f.id)}
                style={{
                  padding: '6px 13px', borderRadius: 20, fontSize: 12, fontWeight: 600,
                  cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0,
                  background: filter === f.id ? colors.primaryDim : colors.card,
                  color: filter === f.id ? colors.primary : colors.textMuted,
                  border: `1px solid ${filter === f.id ? colors.primaryDimBorder : colors.border}`,
                  transition: 'all 0.15s',
                }}
              >{f.label}</div>
            ))}
          </div>
        </div>

        {/* Feed */}
        <div style={s.scroll}>
          {filtered.map(need => (
            <div key={need.id} style={{ ...s.card, position: 'relative' }}>
              {need.isOffer && (
                <div style={{
                  position: 'absolute', top: 12, right: 12,
                  background: colors.tealDim, color: colors.teal,
                  border: `1px solid rgba(56,189,248,0.3)`,
                  fontSize: 10, fontWeight: 700, borderRadius: 8, padding: '2px 7px',
                }}>OFFERING</div>
              )}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <div style={s.avatar(36)}>{need.avatar}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: colors.text }}>{need.user}</div>
                  <div style={{ fontSize: 11, color: colors.textDim }}>{need.unit}</div>
                </div>
                <div style={{
                  fontSize: 11, fontWeight: 700, borderRadius: 8, padding: '3px 8px',
                  background: need.urgencyColor === colors.rose ? colors.roseDim : need.urgencyColor === colors.amber ? colors.amberDim : colors.tealDim,
                  color: need.urgencyColor,
                  border: `1px solid ${need.urgencyColor}30`,
                }}>{need.urgency}</div>
              </div>

              <div style={{ fontSize: 15, fontWeight: 700, color: colors.text, marginBottom: 6 }}>{need.title}</div>
              <div style={{ fontSize: 13, color: colors.textMuted, marginBottom: 10, lineHeight: 1.5 }}>{need.desc}</div>

              <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginBottom: 12 }}>
                {need.tags.map(t => (
                  <span key={t} style={s.tag()}>{t}</span>
                ))}
              </div>

              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                {!respondedItems[need.id] ? (
                  <button
                    style={{ ...s.btn('primary', pressedBtn === `help${need.id}`), flex: 1 }}
                    onMouseDown={() => handlePress(`help${need.id}`)}
                    onClick={() => handleRespond(need.id)}
                  >
                    {need.isOffer ? '✋ Request this' : '🤝 I can help'}
                  </button>
                ) : (
                  <div style={{ flex: 1, background: colors.primaryDim, borderRadius: 12, padding: '10px', textAlign: 'center', fontSize: 13, fontWeight: 700, color: colors.primary, border: `1px solid ${colors.primaryDimBorder}` }}>
                    ✓ Offer sent!
                  </div>
                )}
                <button
                  style={{ ...s.btn('ghost', pressedBtn === `like${need.id}`), padding: '10px 12px' }}
                  onMouseDown={() => handlePress(`like${need.id}`)}
                  onClick={() => setLikedItems(p => ({ ...p, [need.id]: !p[need.id] }))}
                >
                  {likedItems[need.id] ? '❤️' : '🤍'} {need.responses + (likedItems[need.id] ? 1 : 0)}
                </button>
              </div>
            </div>
          ))}

          <div style={{ height: 8 }} />
        </div>
      </div>
    );
  };

  // ── MATCHES SCREEN ────────────────────────────────────────
  const MatchesScreen = () => {
    if (showMatchDetail) {
      const m = matches.find(x => x.id === showMatchDetail);
      return (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ padding: '4px 16px 12px', flexShrink: 0, display: 'flex', alignItems: 'center', gap: 12 }}>
            <button onClick={() => setShowMatchDetail(null)} style={{ ...s.btn('ghost'), padding: '8px 10px', borderRadius: 10 }}>
              {React.createElement(window.lucide.ChevronLeft, { size: 18, color: colors.text })}
            </button>
            <div style={{ fontSize: 18, fontWeight: 800, color: colors.text }}>Match Profile</div>
          </div>
          <div style={s.scroll}>
            <div style={{ textAlign: 'center', padding: '24px 0 20px' }}>
              <div style={{ fontSize: 64, marginBottom: 10 }}>{m.avatar}</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: colors.text }}>{m.name}</div>
              <div style={{ fontSize: 13, color: colors.textMuted, marginBottom: 10 }}>{m.distance}</div>
              <span style={{ ...s.tag(m.badgeColor) }}>{m.badge}</span>
            </div>

            <div style={{ display: 'flex', gap: 10, marginBottom: 14 }}>
              {[
                { label: 'Match', value: `${m.match}%`, color: colors.primary },
                { label: 'Helped', value: m.helpedCount, color: colors.teal },
                { label: 'Credits', value: m.credits, color: colors.amber },
              ].map(stat => (
                <div key={stat.label} style={{ flex: 1, background: colors.card, borderRadius: 14, padding: 14, textAlign: 'center', border: `1px solid ${colors.border}` }}>
                  <div style={{ fontSize: 22, fontWeight: 800, color: stat.color }}>{stat.value}</div>
                  <div style={{ fontSize: 11, color: colors.textMuted, marginTop: 2 }}>{stat.label}</div>
                </div>
              ))}
            </div>

            <div style={s.card}>
              <div style={{ fontSize: 13, fontWeight: 700, color: colors.textMuted, marginBottom: 10, textTransform: 'uppercase', letterSpacing: 0.5 }}>Good At</div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {m.skills.map(sk => (
                  <span key={sk} style={{ background: colors.primaryDim, color: colors.primary, borderRadius: 20, padding: '5px 10px', fontSize: 12, fontWeight: 600 }}>{sk}</span>
                ))}
              </div>
            </div>

            <div style={s.card}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: colors.text }}>Availability</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: colors.primary }}>{m.available}</span>
              </div>
              <div style={{ fontSize: 12, color: colors.textMuted }}>Responds within ~10 minutes usually</div>
            </div>

            <button
              style={{ ...s.btn('primary'), width: '100%', padding: '14px', fontSize: 15, borderRadius: 14, marginTop: 4 }}
              onClick={() => { showToast('Request sent to ' + m.name); setShowMatchDetail(null); }}
            >
              Send Match Request
            </button>
          </div>
        </div>
      );
    }

    return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ padding: '4px 16px 14px', flexShrink: 0 }}>
          <div style={{ fontSize: 22, fontWeight: 800, color: colors.text, marginBottom: 4 }}>Silent Matches</div>
          <div style={{ fontSize: 13, color: colors.textMuted }}>Neighbors likely to help · updated hourly</div>

          <div style={{
            background: colors.primaryDim, border: `1px solid ${colors.primaryDimBorder}`,
            borderRadius: 14, padding: '12px 14px', marginTop: 14,
            display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <span style={{ fontSize: 20 }}>🎯</span>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: colors.primary }}>4 neighbors ready to help</div>
              <div style={{ fontSize: 11, color: colors.textMuted }}>Based on your active needs & location</div>
            </div>
          </div>
        </div>

        <div style={s.scroll}>
          {matches.map((m, i) => (
            <div
              key={m.id}
              style={{ ...s.card, cursor: 'pointer' }}
              onClick={() => setShowMatchDetail(m.id)}
            >
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{ position: 'relative' }}>
                  <div style={s.avatar(48)}>{m.avatar}</div>
                  <div style={{
                    position: 'absolute', bottom: -2, right: -2,
                    background: colors.primary, borderRadius: 10, width: 20, height: 20,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 10, fontWeight: 800, color: '#0A1A10',
                    border: `2px solid ${colors.bg}`,
                  }}>{i + 1}</div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 }}>
                    <div style={{ fontSize: 15, fontWeight: 700, color: colors.text }}>{m.name}</div>
                    <div style={{
                      fontSize: 14, fontWeight: 800,
                      color: m.match >= 95 ? colors.primary : m.match >= 85 ? colors.teal : colors.amber,
                    }}>{m.match}% match</div>
                  </div>
                  <div style={{ fontSize: 12, color: colors.textDim, marginBottom: 6 }}>{m.distance}</div>
                  <span style={s.tag(m.badgeColor)}>{m.badge}</span>
                </div>
              </div>

              <div style={{ marginTop: 10, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {m.skills.slice(0, 2).map(sk => (
                  <span key={sk} style={s.tag()}>{sk}</span>
                ))}
                <span style={s.tag()}>{m.available}</span>
              </div>

              <div style={{ marginTop: 10, display: 'flex', gap: 8 }}>
                <button
                  style={{ ...s.btn('primary', pressedBtn === `req${m.id}`), flex: 1 }}
                  onMouseDown={() => handlePress(`req${m.id}`)}
                  onClick={(e) => { e.stopPropagation(); showToast(`Request sent to ${m.name}!`); }}
                >Connect</button>
                <button
                  style={{ ...s.btn('ghost'), padding: '10px 14px' }}
                  onClick={(e) => { e.stopPropagation(); setShowMatchDetail(m.id); }}
                >View</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ── CIRCLES SCREEN ────────────────────────────────────────
  const CirclesScreen = () => {
    if (activeCircle) {
      const c = circles.find(x => x.id === activeCircle);
      const circleNeeds = needs.slice(0, 3);
      return (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ padding: '4px 16px 12px', flexShrink: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
              <button onClick={() => setActiveCircle(null)} style={{ ...s.btn('ghost'), padding: '8px 10px', borderRadius: 10 }}>
                {React.createElement(window.lucide.ChevronLeft, { size: 18, color: colors.text })}
              </button>
              <div style={{ fontSize: 18, fontWeight: 800, color: colors.text }}>{c.icon} {c.name}</div>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              {[
                { label: 'Members', value: c.members },
                { label: 'Active', value: c.active },
                { label: 'My role', value: 'Member' },
              ].map(stat => (
                <div key={stat.label} style={{ flex: 1, background: colors.card, borderRadius: 12, padding: 10, textAlign: 'center', border: `1px solid ${colors.border}` }}>
                  <div style={{ fontSize: 18, fontWeight: 800, color: c.color }}>{stat.value}</div>
                  <div style={{ fontSize: 10, color: colors.textMuted }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={s.scroll}>
            <div style={s.sectionTitle}>Active Needs in This Circle</div>
            {circleNeeds.map(need => (
              <div key={need.id} style={s.card}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                  <div style={s.avatar(30)}>{need.avatar}</div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: colors.text }}>{need.title}</div>
                    <div style={{ fontSize: 11, color: colors.textDim }}>{need.user} · {need.unit}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button
                    style={{ ...s.btn('primary', pressedBtn === `ch${need.id}`), flex: 1 }}
                    onMouseDown={() => handlePress(`ch${need.id}`)}
                    onClick={() => handleRespond(need.id + 100)}
                  >
                    {respondedItems[need.id + 100] ? '✓ Offered' : 'I can help'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ padding: '4px 16px 14px', flexShrink: 0 }}>
          <div style={{ fontSize: 22, fontWeight: 800, color: colors.text, marginBottom: 4 }}>My Circles</div>
          <div style={{ fontSize: 13, color: colors.textMuted }}>Smaller communities, stronger trust</div>
        </div>

        <div style={s.scroll}>
          {circles.map(circle => (
            <div
              key={circle.id}
              style={{ ...s.card, cursor: 'pointer' }}
              onClick={() => setActiveCircle(circle.id)}
            >
              <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                <div style={{
                  width: 50, height: 50, borderRadius: 16, flexShrink: 0,
                  background: `${circle.color}18`, border: `1px solid ${circle.color}30`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24,
                }}>{circle.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: colors.text, marginBottom: 3 }}>{circle.name}</div>
                  <div style={{ display: 'flex', gap: 10 }}>
                    <span style={{ fontSize: 12, color: colors.textMuted }}>{circle.members} members</span>
                    <span style={{ fontSize: 12, color: circle.color }}>{circle.active} active</span>
                  </div>
                </div>
                {React.createElement(window.lucide.ChevronRight, { size: 16, color: colors.textDim })}
              </div>
              <div style={{
                marginTop: 10, background: `${circle.color}10`, borderRadius: 8, padding: '7px 10px',
                fontSize: 12, color: circle.color, fontWeight: 600,
              }}>
                🔔 {circle.recent}
              </div>
            </div>
          ))}

          <button
            style={{ ...s.btn('outline'), width: '100%', padding: 14, borderRadius: 14, marginTop: 8 }}
            onClick={() => showToast('Circle creation coming soon!')}
          >
            + Create a new circle
          </button>
        </div>
      </div>
    );
  };

  // ── PROFILE SCREEN ────────────────────────────────────────
  const ProfileScreen = () => {
    const [showHistory, setShowHistory] = useState(false);
    const pct = Math.min(100, Math.round((credits / 200) * 100));

    return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ padding: '4px 16px 14px', flexShrink: 0 }}>
          <div style={{ fontSize: 22, fontWeight: 800, color: colors.text }}>My Profile</div>
        </div>

        <div style={s.scroll}>
          {/* Profile card */}
          <div style={{ ...s.card, textAlign: 'center', padding: '20px 16px' }}>
            <div style={{ fontSize: 56, marginBottom: 8 }}>🧑</div>
            <div style={{ fontSize: 18, fontWeight: 800, color: colors.text }}>Alex Chen</div>
            <div style={{ fontSize: 13, color: colors.textMuted, marginBottom: 6 }}>Unit 5C · The Meridian</div>
            <div style={{ display: 'flex', gap: 6, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 14 }}>
              <span style={s.tag(colors.primary)}>✅ Verified Resident</span>
              <span style={s.tag(colors.teal)}>🔧 Frequent Lender</span>
            </div>
            <div style={{ fontSize: 12, color: colors.textMuted, lineHeight: 1.5 }}>
              Newcomer since Jan 2026 · Love helping neighbors. Good with tools & errands.
            </div>
          </div>

          {/* Credits */}
          <div style={{ ...s.card, marginTop: 4 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: colors.textMuted, textTransform: 'uppercase', letterSpacing: 0.5 }}>Reciprocity Credits</div>
                <div style={{ fontSize: 30, fontWeight: 800, color: colors.amber, marginTop: 2 }}>{credits} pts</div>
              </div>
              <div style={{ fontSize: 32 }}>🪙</div>
            </div>
            <div style={{ background: colors.border, borderRadius: 4, height: 6, overflow: 'hidden', marginBottom: 6 }}>
              <div style={{ width: `${pct}%`, height: '100%', background: `linear-gradient(90deg, ${colors.amber}, ${colors.primary})`, borderRadius: 4, transition: 'width 0.5s ease' }} />
            </div>
            <div style={{ fontSize: 11, color: colors.textDim }}>{pct}% to next trust level · {200 - credits} credits needed</div>
          </div>

          {/* Stats */}
          <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
            {[
              { label: 'Helped', value: 7, icon: '🤝' },
              { label: 'Received', value: 3, icon: '💛' },
              { label: 'Circles', value: 4, icon: '🔗' },
            ].map(stat => (
              <div key={stat.label} style={{ flex: 1, ...s.card, margin: 0, textAlign: 'center', padding: '12px 8px' }}>
                <div style={{ fontSize: 22, marginBottom: 3 }}>{stat.icon}</div>
                <div style={{ fontSize: 20, fontWeight: 800, color: colors.text }}>{stat.value}</div>
                <div style={{ fontSize: 10, color: colors.textMuted }}>{stat.label}</div>
              </div>
            ))}
          </div>

          {/* History toggle */}
          <div style={{ ...s.card, marginTop: 4 }}>
            <div
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
              onClick={() => setShowHistory(h => !h)}
            >
              <div style={{ fontSize: 15, fontWeight: 700, color: colors.text }}>Exchange History</div>
              {React.createElement(showHistory ? window.lucide.ChevronUp : window.lucide.ChevronDown, { size: 16, color: colors.textMuted })}
            </div>

            {showHistory && (
              <div style={{ marginTop: 12 }}>
                {history.map(h => (
                  <div key={h.id} style={{ display: 'flex', alignItems: 'center', gap: 10, paddingBottom: 10, marginBottom: 10, borderBottom: `1px solid ${colors.border}` }}>
                    <div style={{ width: 34, height: 34, borderRadius: 10, background: h.type === 'gave' ? colors.primaryDim : colors.amberDim, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>{h.icon}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: colors.text }}>{h.desc}</div>
                      <div style={{ fontSize: 11, color: colors.textDim }}>{h.date}</div>
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 800, color: h.type === 'gave' ? colors.primary : colors.amber }}>{h.credits}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={{ height: 8 }} />
        </div>
      </div>
    );
  };

  // ── POST MODAL ────────────────────────────────────────────
  const PostModal = () => {
    const categories = [
      { id: 'package', icon: '📦', label: 'Package / Mail' },
      { id: 'tool', icon: '🔧', label: 'Borrow a Tool' },
      { id: 'errand', icon: '🛒', label: 'Errand Help' },
      { id: 'childcare', icon: '👶', label: 'Childcare' },
      { id: 'ride', icon: '🚗', label: 'Quick Ride' },
      { id: 'other', icon: '💬', label: 'Something Else' },
    ];

    return (
      <div style={{
        position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.7)',
        zIndex: 200, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
      }}>
        <div style={{
          background: colors.surface, borderRadius: '24px 24px 0 0',
          border: `1px solid ${colors.border}`, padding: '20px 16px 36px',
          maxHeight: '82%', overflow: 'hidden', display: 'flex', flexDirection: 'column',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <div style={{ fontSize: 18, fontWeight: 800, color: colors.text }}>
              {postStep === 1 ? 'What do you need?' : postStep === 2 ? 'Add details' : '🎉 Almost done!'}
            </div>
            <button
              onClick={() => { setShowPostModal(false); setPostStep(1); setSelectedCategory(null); }}
              style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 4 }}
            >
              {React.createElement(window.lucide.X, { size: 20, color: colors.textMuted })}
            </button>
          </div>

          {/* Step indicator */}
          <div style={{ display: 'flex', gap: 4, marginBottom: 20 }}>
            {[1,2,3].map(n => (
              <div key={n} style={{ flex: 1, height: 3, borderRadius: 2, background: n <= postStep ? colors.primary : colors.border, transition: 'background 0.3s' }} />
            ))}
          </div>

          {postStep === 1 && (
            <div style={{ overflowY: 'auto' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {categories.map(cat => (
                  <div
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    style={{
                      background: selectedCategory === cat.id ? colors.primaryDim : colors.card,
                      border: `1.5px solid ${selectedCategory === cat.id ? colors.primaryDimBorder : colors.border}`,
                      borderRadius: 14, padding: '14px 12px', textAlign: 'center',
                      cursor: 'pointer', transition: 'all 0.15s',
                    }}
                  >
                    <div style={{ fontSize: 28, marginBottom: 6 }}>{cat.icon}</div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: selectedCategory === cat.id ? colors.primary : colors.text }}>{cat.label}</div>
                  </div>
                ))}
              </div>
              <button
                disabled={!selectedCategory}
                onClick={() => setPostStep(2)}
                style={{ ...s.btn('primary'), width: '100%', padding: 14, borderRadius: 14, marginTop: 16, opacity: selectedCategory ? 1 : 0.4 }}
              >Continue</button>
            </div>
          )}

          {postStep === 2 && (
            <div style={{ overflowY: 'auto' }}>
              <div style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 12, color: colors.textMuted, marginBottom: 6, fontWeight: 600 }}>Describe what you need (short is fine)</div>
                <div style={{
                  background: colors.card, border: `1.5px solid ${colors.border}`,
                  borderRadius: 12, padding: '10px 12px', fontSize: 14, color: colors.textDim, minHeight: 70,
                }}>
                  Can someone help me with…
                </div>
              </div>
              <div style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 12, color: colors.textMuted, marginBottom: 6, fontWeight: 600 }}>How urgent?</div>
                <div style={{ display: 'flex', gap: 8 }}>
                  {['Right now', 'Today', 'This week'].map(u => (
                    <div key={u} style={{
                      flex: 1, background: colors.card, border: `1px solid ${colors.border}`,
                      borderRadius: 10, padding: '8px 4px', textAlign: 'center',
                      fontSize: 12, fontWeight: 600, color: colors.textMuted, cursor: 'pointer',
                    }}>{u}</div>
                  ))}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <button onClick={() => setPostStep(1)} style={{ ...s.btn('ghost'), flex: 0, padding: '12px 16px', borderRadius: 12 }}>Back</button>
                <button onClick={() => setPostStep(3)} style={{ ...s.btn('primary'), flex: 1, padding: 14, borderRadius: 12 }}>Next</button>
              </div>
            </div>
          )}

          {postStep === 3 && (
            <div style={{ overflowY: 'auto', textAlign: 'center' }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>🏘️</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: colors.text, marginBottom: 8 }}>Who can see this?</div>
              {[
                { label: 'Same building only', desc: 'Most private · 84 neighbors', icon: '🏢', recommended: true },
                { label: 'Block radius (~200ft)', desc: 'Good for most needs · ~120 neighbors', icon: '🌳', recommended: false },
                { label: 'Full neighborhood', desc: 'Largest reach · ~450 neighbors', icon: '📡', recommended: false },
              ].map(opt => (
                <div key={opt.label} style={{
                  ...s.card, cursor: 'pointer', marginBottom: 8, textAlign: 'left',
                  display: 'flex', alignItems: 'center', gap: 12,
                  border: opt.recommended ? `1.5px solid ${colors.primaryDimBorder}` : `1px solid ${colors.border}`,
                  background: opt.recommended ? colors.primaryDim : colors.card,
                }}>
                  <span style={{ fontSize: 24 }}>{opt.icon}</span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: opt.recommended ? colors.primary : colors.text }}>{opt.label} {opt.recommended && '✓'}</div>
                    <div style={{ fontSize: 11, color: colors.textMuted }}>{opt.desc}</div>
                  </div>
                </div>
              ))}
              <button
                style={{ ...s.btn('primary'), width: '100%', padding: 14, borderRadius: 14, marginTop: 8, fontSize: 15 }}
                onClick={() => {
                  setShowPostModal(false);
                  setPostStep(1);
                  setSelectedCategory(null);
                  showToast('Need posted to your building!');
                }}
              >Post My Need 🚀</button>
            </div>
          )}
        </div>
      </div>
    );
  };

  // ── Bottom Nav ────────────────────────────────────────────
  const tabs = [
    { id: 'home', icon: window.lucide.Home, label: 'Feed' },
    { id: 'matches', icon: window.lucide.Zap, label: 'Matches' },
    { id: 'post', icon: window.lucide.Plus, label: '' },
    { id: 'circles', icon: window.lucide.Users, label: 'Circles' },
    { id: 'profile', icon: window.lucide.User, label: 'You' },
  ];

  // ── Render ────────────────────────────────────────────────
  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'radial-gradient(ellipse at center, #0D1830 0%, #050810 100%)',
      padding: 20,
    }}>
      <div style={s.phone}>
        <div style={s.dynamicIsland}>
          <div style={{ width: 8, height: 8, borderRadius: 4, background: '#1A1A1A', marginRight: 20 }} />
          <div style={{ width: 10, height: 10, borderRadius: 5, background: '#1A1A1A', border: '1px solid #333' }} />
        </div>

        <StatusBar />

        {/* Screen content */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {activeTab === 'home' && <HomeScreen />}
          {activeTab === 'matches' && <MatchesScreen />}
          {activeTab === 'circles' && <CirclesScreen />}
          {activeTab === 'profile' && <ProfileScreen />}
        </div>

        {/* Bottom Nav */}
        <div style={s.navBar}>
          {tabs.map(tab => {
            if (tab.id === 'post') return (
              <div key="post" style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div
                  onClick={() => setShowPostModal(true)}
                  style={{
                    width: 50, height: 50, borderRadius: 16,
                    background: `linear-gradient(135deg, ${colors.primary}, #22C55E)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', boxShadow: `0 4px 20px rgba(74,222,128,0.4)`,
                    transition: 'transform 0.1s',
                    transform: pressedBtn === 'post' ? 'scale(0.92)' : 'scale(1)',
                  }}
                  onMouseDown={() => handlePress('post')}
                >
                  {React.createElement(window.lucide.Plus, { size: 24, color: '#0A1A10', strokeWidth: 2.5 })}
                </div>
              </div>
            );

            const isActive = activeTab === tab.id;
            return (
              <div
                key={tab.id}
                style={s.navItem(isActive)}
                onClick={() => {
                  setActiveTab(tab.id);
                  setShowMatchDetail(null);
                  setActiveCircle(null);
                }}
              >
                {React.createElement(tab.icon, {
                  size: 22,
                  color: isActive ? colors.primary : colors.textDim,
                  strokeWidth: isActive ? 2.5 : 1.8,
                })}
                <span style={s.navLabel(isActive)}>{tab.label}</span>
              </div>
            );
          })}
        </div>

        {showPostModal && <PostModal />}
        <Toast />
      </div>
    </div>
  );
}
