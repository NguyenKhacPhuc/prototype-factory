const { useState, useEffect, useRef } = React;

function App() {
  const {
    Home, Search, PlusCircle, Users, User, Bell, Wifi, Battery,
    MapPin, Clock, Heart, Zap, Check, CheckCircle, MessageCircle,
    TrendingUp, Award, ArrowRight, ChevronRight, Plus, Moon, Sun,
    RefreshCw, Wrench, Leaf, Car, Droplets, ShoppingCart, Gift,
    Eye, MessageSquare, HelpCircle, Star, Settings, Shield,
  } = window.lucide;

  const themes = {
    dark: {
      bg: '#0D0F1A',
      surface: '#161928',
      card: '#1E2235',
      text: '#EEEDF5',
      textSub: '#7880A6',
      textMuted: '#4A5070',
      primary: '#FF6B47',
      primaryGlow: 'rgba(255,107,71,0.18)',
      teal: '#3ECFBF',
      tealGlow: 'rgba(62,207,191,0.15)',
      amber: '#F5C842',
      amberGlow: 'rgba(245,200,66,0.13)',
      purple: '#9B72FF',
      purpleGlow: 'rgba(155,114,255,0.15)',
      border: 'rgba(255,255,255,0.07)',
      nav: '#111324',
      navBorder: 'rgba(255,255,255,0.09)',
      pill: 'rgba(255,255,255,0.08)',
    },
    light: {
      bg: '#EEE9E3',
      surface: '#FFFFFF',
      card: '#F8F6F2',
      text: '#1A1C2E',
      textSub: '#6870A0',
      textMuted: '#9BA3C8',
      primary: '#E85530',
      primaryGlow: 'rgba(232,85,48,0.12)',
      teal: '#1AB8A8',
      tealGlow: 'rgba(26,184,168,0.12)',
      amber: '#D4A800',
      amberGlow: 'rgba(212,168,0,0.12)',
      purple: '#7C52E8',
      purpleGlow: 'rgba(124,82,232,0.12)',
      border: 'rgba(0,0,0,0.08)',
      nav: '#FFFFFF',
      navBorder: 'rgba(0,0,0,0.1)',
      pill: 'rgba(0,0,0,0.07)',
    },
  };

  const [themeKey, setThemeKey] = useState('dark');
  const [tab, setTab] = useState('feed');
  const [feedFilter, setFeedFilter] = useState('all');
  const [pressed, setPressed] = useState(null);
  const [liked, setLiked] = useState(new Set([1, 4]));
  const [postStep, setPostStep] = useState(0);
  const [postType, setPostType] = useState('need');
  const [postCategory, setPostCategory] = useState(null);
  const [timeWindow, setTimeWindow] = useState('Today');
  const [postDone, setPostDone] = useState(false);
  const [time, setTime] = useState('');

  const t = themes[themeKey];

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(`${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`);
    };
    update();
    const interval = setInterval(update, 30000);
    return () => clearInterval(interval);
  }, []);

  const press = (id) => {
    setPressed(id);
    setTimeout(() => setPressed(null), 130);
  };

  const btnS = (id, base = {}) => ({
    ...base,
    transform: pressed === id ? 'scale(0.93)' : 'scale(1)',
    transition: 'all 0.12s cubic-bezier(0.34,1.56,0.64,1)',
    cursor: 'pointer',
    userSelect: 'none',
  });

  const Tag = ({ label, color }) => (
    <span style={{
      display: 'inline-block', padding: '2px 8px', borderRadius: 100,
      fontSize: 10, fontWeight: 700, letterSpacing: '0.02em',
      background: color + '22', color,
    }}>{label}</span>
  );

  const needCards = [
    {
      id: 1, user: 'Maya R.', avatar: '👩‍🦱', distance: '0.1 mi', type: 'need',
      category: 'Borrow', color: t.teal, icon: Wrench, title: 'Step ladder for 30 mins',
      desc: 'Changing a lightbulb in my hallway. Super quick, nothing major!',
      timeLeft: '2h window', tags: ['Quick', 'Today'], score: 94,
    },
    {
      id: 2, user: 'Carlos M.', avatar: '👨‍🍳', distance: '0.2 mi', type: 'offer',
      category: 'Share', color: t.amber, icon: Leaf, title: 'Fresh basil & tomatoes',
      desc: 'Garden overflow — totally free. Just come grab before they wilt!',
      timeLeft: 'Expires tonight', tags: ['Free', 'Garden'], score: 87,
    },
    {
      id: 3, user: 'Priya K.', avatar: '👩‍💻', distance: '0.3 mi', type: 'trade',
      category: 'Trade', color: t.purple, icon: RefreshCw, title: 'Printer ink ↔ Coffee pods',
      desc: 'Have HP 65 cartridges I don\'t need. Would love some Nespresso pods.',
      timeLeft: 'Flexible', tags: ['Trade', 'Office'], score: 91,
    },
    {
      id: 4, user: 'Jordan L.', avatar: '🧑‍🎤', distance: '0.1 mi', type: 'need',
      category: 'Help', color: t.primary, icon: Car, title: 'School pickup Tue & Wed',
      desc: 'Work conflict — can any nearby parent help with 3pm pickup this week?',
      timeLeft: '48h urgent', tags: ['Urgent', 'Kids'], score: 78,
    },
    {
      id: 5, user: 'Sam T.', avatar: '🧑‍🌾', distance: '0.4 mi', type: 'offer',
      category: 'Watch', color: t.teal, icon: Droplets, title: 'Plant watering Fri–Sun',
      desc: 'Free this weekend and happy to help. No pets, just plants!',
      timeLeft: 'This weekend', tags: ['Weekend', 'Plants'], score: 99,
    },
    {
      id: 6, user: 'Anika B.', avatar: '👩‍🏫', distance: '0.2 mi', type: 'trade',
      category: 'Split', color: t.amber, icon: ShoppingCart, title: 'Split Costco run Sunday',
      desc: 'Heading there Sunday 9am, room for 2 more orders. Split the trip!',
      timeLeft: 'Sunday 9am', tags: ['Bulk', 'Savings'], score: 83,
    },
  ];

  const matches = [
    {
      id: 1, user: 'Sam T.', avatar: '🧑‍🌾', distance: '0.4 mi',
      reason: 'You need plants watered • Sam offers it', pct: 98,
      tags: ['Plants', 'Weekend'], mutual: 0,
    },
    {
      id: 2, user: 'Carlos M.', avatar: '👨‍🍳', distance: '0.2 mi',
      reason: 'You offered tomatoes • Carlos has basil', pct: 91,
      tags: ['Garden', 'Food'], mutual: 1,
    },
    {
      id: 3, user: 'Priya K.', avatar: '👩‍💻', distance: '0.3 mi',
      reason: 'Printer ↔ Coffee pods trade match', pct: 87,
      tags: ['Office', 'Trade'], mutual: 2,
    },
    {
      id: 4, user: 'Lee W.', avatar: '🧑‍🔧', distance: '0.1 mi',
      reason: 'Both in Maple St. Circle • 3 shared interests', pct: 79,
      tags: ['DIY', 'Neighbors'], mutual: 5,
    },
  ];

  const circles = [
    { id: 1, icon: '🏢', name: 'Maple St. Building', members: 24, active: 8, recent: 'Maya just posted a need' },
    { id: 2, icon: '🌳', name: 'Riverside Block', members: 67, active: 19, recent: '3 trades completed today' },
    { id: 3, icon: '👨‍👩‍👧', name: 'Friday Parents', members: 12, active: 5, recent: 'School pickup coordination' },
    { id: 4, icon: '🌱', name: 'Garden Swap Club', members: 31, active: 11, recent: 'Carlos shared surplus basil' },
  ];

  const catOptions = [
    { label: 'Borrow', icon: Wrench, color: t.teal },
    { label: 'Share', icon: Gift, color: t.amber },
    { label: 'Trade', icon: RefreshCw, color: t.purple },
    { label: 'Help', icon: Heart, color: t.primary },
    { label: 'Watch', icon: Eye, color: t.teal },
    { label: 'Split', icon: ShoppingCart, color: t.amber },
  ];

  const exchanges = [
    { type: 'gave', desc: 'Helped Maya with ladder', date: 'Mar 19', pts: 10 },
    { type: 'received', desc: 'Carlos shared tomatoes', date: 'Mar 17', pts: 8 },
    { type: 'traded', desc: 'Printer ink ↔ Priya', date: 'Mar 14', pts: 12 },
    { type: 'gave', desc: 'School pickup for Jordan', date: 'Mar 12', pts: 15 },
  ];

  // ── Feed ──────────────────────────────────────────────────────
  const renderFeed = () => {
    const filtered = feedFilter === 'all'
      ? needCards
      : needCards.filter(c => c.type === feedFilter);

    return (
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 16px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: t.textSub, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Good morning</div>
            <div style={{ fontSize: 24, fontWeight: 900, color: t.text, lineHeight: 1.15 }}>Your Block</div>
          </div>
          <div
            onMouseDown={() => setPressed('bell')} onMouseUp={() => setPressed(null)}
            style={btnS('bell', {
              width: 38, height: 38, borderRadius: 12, background: t.card,
              border: `1px solid ${t.border}`, display: 'flex',
              alignItems: 'center', justifyContent: 'center', position: 'relative',
            })}
          >
            <Bell size={16} color={t.text} />
            <div style={{
              position: 'absolute', top: 7, right: 7, width: 8, height: 8,
              borderRadius: '50%', background: t.primary, border: `2px solid ${t.bg}`,
            }} />
          </div>
        </div>

        <div style={{
          display: 'flex', alignItems: 'center', gap: 10, background: t.card,
          border: `1px solid ${t.border}`, borderRadius: 14, padding: '10px 14px', marginBottom: 14,
        }}>
          <Search size={16} color={t.textSub} />
          <span style={{ fontSize: 14, color: t.textMuted }}>Search needs nearby…</span>
        </div>

        <div style={{ display: 'flex', gap: 7, marginBottom: 16, overflowX: 'auto', paddingBottom: 2 }}>
          {['All', 'Need', 'Offer', 'Trade'].map(f => {
            const key = f.toLowerCase();
            const active = feedFilter === key;
            return (
              <div key={f}
                onMouseDown={() => setPressed(`ff-${f}`)} onMouseUp={() => { setPressed(null); setFeedFilter(key); }}
                style={btnS(`ff-${f}`, {
                  padding: '6px 14px', borderRadius: 100, whiteSpace: 'nowrap',
                  background: active ? t.primary : t.pill,
                  fontSize: 12, fontWeight: 700,
                  color: active ? '#fff' : t.textSub,
                })}
              >{f}</div>
            );
          })}
        </div>

        <div style={{
          background: t.card, borderRadius: 13, padding: '10px 14px',
          marginBottom: 16, border: `1px solid ${t.border}`,
          display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <div style={{
            width: 8, height: 8, borderRadius: '50%', background: t.teal,
            boxShadow: `0 0 0 4px ${t.tealGlow}`,
          }} />
          <span style={{ fontSize: 12, color: t.textSub, flex: 1 }}>
            <span style={{ color: t.teal, fontWeight: 800 }}>8 neighbors</span> active on your block right now
          </span>
          <Zap size={13} color={t.amber} />
        </div>

        {filtered.map(card => {
          const isLiked = liked.has(card.id);
          const CardIcon = card.icon;
          return (
            <div key={card.id} style={{
              background: t.card, borderRadius: 16, padding: '14px 16px',
              marginBottom: 12, border: `1px solid ${t.border}`,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <div style={{ position: 'relative', flexShrink: 0 }}>
                  <div style={{
                    width: 38, height: 38, borderRadius: '50%', background: t.surface,
                    border: `2px solid ${t.border}`, display: 'flex',
                    alignItems: 'center', justifyContent: 'center', fontSize: 18,
                  }}>{card.avatar}</div>
                  <div style={{
                    position: 'absolute', bottom: -2, right: -2, width: 14, height: 14,
                    borderRadius: '50%',
                    background: card.score >= 90 ? t.teal : card.score >= 80 ? t.amber : t.textSub,
                    border: `2px solid ${t.card}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Check size={7} color={t.card} strokeWidth={3} />
                  </div>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 13, fontWeight: 800, color: t.text }}>{card.user}</span>
                    <span style={{
                      fontSize: 9, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em',
                      padding: '1px 6px', borderRadius: 100,
                      background: card.type === 'need' ? t.primaryGlow : card.type === 'offer' ? t.tealGlow : t.purpleGlow,
                      color: card.type === 'need' ? t.primary : card.type === 'offer' ? t.teal : t.purple,
                    }}>{card.type}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 1 }}>
                    <MapPin size={10} color={t.textMuted} />
                    <span style={{ fontSize: 11, color: t.textSub }}>{card.distance}</span>
                    <span style={{ fontSize: 11, color: t.textMuted }}>·</span>
                    <Clock size={10} color={t.textMuted} />
                    <span style={{ fontSize: 11, color: t.textSub }}>{card.timeLeft}</span>
                  </div>
                </div>
                <div style={{
                  width: 32, height: 32, borderRadius: 10,
                  background: card.color + '18',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <CardIcon size={15} color={card.color} />
                </div>
              </div>

              <div style={{ marginBottom: 10 }}>
                <div style={{ fontSize: 15, fontWeight: 800, color: t.text, marginBottom: 3, lineHeight: 1.3 }}>{card.title}</div>
                <div style={{ fontSize: 12, color: t.textSub, lineHeight: 1.5 }}>{card.desc}</div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', gap: 5 }}>
                  {card.tags.map(tag => <Tag key={tag} label={tag} color={card.color} />)}
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <div
                    onMouseDown={() => setPressed(`lk-${card.id}`)}
                    onMouseUp={() => {
                      setPressed(null);
                      const next = new Set(liked);
                      next.has(card.id) ? next.delete(card.id) : next.add(card.id);
                      setLiked(next);
                    }}
                    style={btnS(`lk-${card.id}`, {
                      width: 32, height: 32, borderRadius: 10,
                      background: isLiked ? t.primaryGlow : t.pill,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    })}
                  >
                    <Heart size={14} color={isLiked ? t.primary : t.textSub} fill={isLiked ? t.primary : 'none'} />
                  </div>
                  <div
                    onMouseDown={() => setPressed(`hp-${card.id}`)} onMouseUp={() => setPressed(null)}
                    style={btnS(`hp-${card.id}`, {
                      height: 32, padding: '0 14px', borderRadius: 10,
                      background: t.primary,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    })}
                  >
                    <span style={{ fontSize: 12, fontWeight: 800, color: '#fff' }}>
                      {card.type === 'offer' ? 'Claim' : 'Help'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <div style={{ height: 20 }} />
      </div>
    );
  };

  // ── Matches ───────────────────────────────────────────────────
  const renderMatch = () => (
    <div style={{ flex: 1, overflowY: 'auto', padding: '16px 16px 0' }}>
      <div style={{ marginBottom: 18 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: t.textSub, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 4 }}>Based on your activity</div>
        <div style={{ fontSize: 24, fontWeight: 900, color: t.text }}>Perfect Matches</div>
      </div>

      <div style={{
        background: `linear-gradient(135deg, ${t.primaryGlow}, ${t.purpleGlow})`,
        border: `1px solid ${t.primary}44`,
        borderRadius: 18, padding: '16px 18px', marginBottom: 20,
        display: 'flex', alignItems: 'center', gap: 16,
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 36, fontWeight: 900, color: t.primary, lineHeight: 1 }}>4</div>
          <div style={{ fontSize: 10, fontWeight: 700, color: t.textSub, marginTop: 2 }}>Matches</div>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: t.text, marginBottom: 4 }}>Strong week ahead</div>
          <div style={{ fontSize: 12, color: t.textSub, lineHeight: 1.5 }}>
            Your reciprocity score is unlocking higher-quality connections.
          </div>
        </div>
        <TrendingUp size={26} color={t.primary} />
      </div>

      {matches.map(m => (
        <div key={m.id} style={{
          background: t.card, borderRadius: 16, padding: '14px 16px',
          marginBottom: 12, border: `1px solid ${t.border}`,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <div style={{
                width: 50, height: 50, borderRadius: '50%', background: t.surface,
                border: `2px solid ${t.border}`, display: 'flex',
                alignItems: 'center', justifyContent: 'center', fontSize: 22,
              }}>{m.avatar}</div>
              <div style={{
                position: 'absolute', bottom: -3, right: -3,
                background: m.pct >= 90 ? t.teal : m.pct >= 80 ? t.amber : t.textSub,
                borderRadius: 100, padding: '1px 5px',
                border: `2px solid ${t.card}`,
                fontSize: 8, fontWeight: 900, color: '#fff',
              }}>{m.pct}%</div>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                <span style={{ fontSize: 14, fontWeight: 800, color: t.text }}>{m.user}</span>
                {m.mutual > 0 && (
                  <span style={{
                    fontSize: 9, padding: '1px 6px', borderRadius: 100,
                    background: t.amberGlow, color: t.amber, fontWeight: 700,
                  }}>{m.mutual} mutual helps</span>
                )}
              </div>
              <div style={{ fontSize: 12, color: t.textSub, lineHeight: 1.4, marginBottom: 6 }}>{m.reason}</div>
              <div style={{ display: 'flex', gap: 4 }}>
                {m.tags.map(tag => <Tag key={tag} label={tag} color={t.teal} />)}
              </div>
            </div>
            <div
              onMouseDown={() => setPressed(`mc-${m.id}`)} onMouseUp={() => setPressed(null)}
              style={btnS(`mc-${m.id}`, {
                width: 36, height: 36, borderRadius: 11, background: t.primary,
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              })}
            >
              <MessageCircle size={15} color="#fff" />
            </div>
          </div>
        </div>
      ))}

      <div style={{ marginTop: 8, marginBottom: 20 }}>
        <div style={{ fontSize: 14, fontWeight: 800, color: t.text, marginBottom: 12 }}>Recent Connections</div>
        <div style={{ display: 'flex', gap: 14, overflowX: 'auto', paddingBottom: 4 }}>
          {['Maya R.', 'Jordan L.', 'Anika B.', 'Lee W.'].map((name, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, flexShrink: 0 }}>
              <div style={{
                width: 54, height: 54, borderRadius: '50%', background: t.card,
                border: `2px solid ${t.border}`, display: 'flex',
                alignItems: 'center', justifyContent: 'center', fontSize: 22,
              }}>{['👩‍🦱', '🧑‍🎤', '👩‍🏫', '🧑‍🔧'][i]}</div>
              <span style={{ fontSize: 10, fontWeight: 700, color: t.textSub }}>{name.split(' ')[0]}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ height: 20 }} />
    </div>
  );

  // ── Post ──────────────────────────────────────────────────────
  const renderPost = () => {
    const steps = ['Type', 'Category', 'Details'];
    return (
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 16px 0' }}>
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 24, fontWeight: 900, color: t.text, marginBottom: 4 }}>Post a Need Card</div>
          <div style={{ fontSize: 13, color: t.textSub }}>Takes less than 30 seconds</div>
        </div>

        <div style={{ display: 'flex', gap: 6, marginBottom: 24 }}>
          {steps.map((step, i) => (
            <div key={step} style={{ flex: 1 }}>
              <div style={{
                height: 4, borderRadius: 100, marginBottom: 4,
                background: i <= postStep ? t.primary : t.pill,
                transition: 'background 0.3s ease',
              }} />
              <span style={{ fontSize: 10, fontWeight: 700, color: i <= postStep ? t.primary : t.textMuted }}>{step}</span>
            </div>
          ))}
        </div>

        {postStep === 0 && (
          <div>
            <div style={{ fontSize: 15, fontWeight: 800, color: t.text, marginBottom: 14 }}>What are you posting?</div>
            {[
              { key: 'need', label: 'I need something', desc: 'Ask neighbors for help or a borrow', Icon: HelpCircle, color: t.primary },
              { key: 'offer', label: 'I\'m offering something', desc: 'Share surplus or free services', Icon: Gift, color: t.teal },
              { key: 'trade', label: 'Let\'s make a trade', desc: 'Swap something useful with a neighbor', Icon: RefreshCw, color: t.purple },
            ].map(opt => {
              const active = postType === opt.key;
              return (
                <div key={opt.key}
                  onMouseDown={() => setPressed(`pt-${opt.key}`)}
                  onMouseUp={() => { setPressed(null); setPostType(opt.key); }}
                  style={btnS(`pt-${opt.key}`, {
                    background: active ? opt.color + '18' : t.card,
                    border: `2px solid ${active ? opt.color : t.border}`,
                    borderRadius: 14, padding: '14px 16px', marginBottom: 10,
                    display: 'flex', alignItems: 'center', gap: 14,
                    transition: 'all 0.15s ease',
                  })}
                >
                  <div style={{
                    width: 44, height: 44, borderRadius: 13, background: opt.color + '22',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    <opt.Icon size={20} color={opt.color} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 800, color: t.text }}>{opt.label}</div>
                    <div style={{ fontSize: 12, color: t.textSub, marginTop: 1 }}>{opt.desc}</div>
                  </div>
                  {active && <CheckCircle size={18} color={opt.color} />}
                </div>
              );
            })}
            <div
              onMouseDown={() => setPressed('n0')} onMouseUp={() => { setPressed(null); setPostStep(1); }}
              style={btnS('n0', {
                background: t.primary, borderRadius: 14, padding: '14px',
                textAlign: 'center', fontSize: 15, fontWeight: 800, color: '#fff', marginTop: 8,
              })}
            >Continue</div>
          </div>
        )}

        {postStep === 1 && (
          <div>
            <div style={{ fontSize: 15, fontWeight: 800, color: t.text, marginBottom: 14 }}>Pick a category</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
              {catOptions.map(cat => {
                const active = postCategory === cat.label;
                return (
                  <div key={cat.label}
                    onMouseDown={() => setPressed(`cat-${cat.label}`)}
                    onMouseUp={() => { setPressed(null); setPostCategory(cat.label); }}
                    style={btnS(`cat-${cat.label}`, {
                      background: active ? cat.color + '22' : t.card,
                      border: `2px solid ${active ? cat.color : t.border}`,
                      borderRadius: 14, padding: '16px 12px',
                      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
                    })}
                  >
                    <div style={{
                      width: 38, height: 38, borderRadius: 10, background: cat.color + '22',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <cat.icon size={18} color={cat.color} />
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 800, color: active ? cat.color : t.text }}>{cat.label}</span>
                  </div>
                );
              })}
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <div
                onMouseDown={() => setPressed('b1')} onMouseUp={() => { setPressed(null); setPostStep(0); }}
                style={btnS('b1', {
                  flex: 1, background: t.pill, borderRadius: 14, padding: '14px',
                  textAlign: 'center', fontSize: 15, fontWeight: 800, color: t.textSub,
                })}
              >Back</div>
              <div
                onMouseDown={() => setPressed('n1')}
                onMouseUp={() => { setPressed(null); if (postCategory) setPostStep(2); }}
                style={btnS('n1', {
                  flex: 2, borderRadius: 14, padding: '14px', textAlign: 'center',
                  fontSize: 15, fontWeight: 800,
                  background: postCategory ? t.primary : t.pill,
                  color: postCategory ? '#fff' : t.textMuted,
                })}
              >Continue</div>
            </div>
          </div>
        )}

        {postStep === 2 && (
          <div>
            <div style={{ fontSize: 15, fontWeight: 800, color: t.text, marginBottom: 14 }}>Describe your need</div>
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: t.textSub, marginBottom: 6, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Title</div>
              <div style={{
                background: t.card, border: `1px solid ${t.border}`,
                borderRadius: 12, padding: '12px 14px',
                fontSize: 14, color: t.textMuted,
              }}>e.g. Need a step ladder for 30 mins</div>
            </div>
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: t.textSub, marginBottom: 6, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Short description</div>
              <div style={{
                background: t.card, border: `1px solid ${t.border}`,
                borderRadius: 12, padding: '12px 14px',
                fontSize: 14, color: t.textMuted, minHeight: 68,
              }}>Add some context — what's the situation?</div>
            </div>
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: t.textSub, marginBottom: 8, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Time window</div>
              <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
                {['1 hour', 'Today', '2 days', 'Flexible'].map(tw => (
                  <div key={tw}
                    onMouseDown={() => setPressed(`tw-${tw}`)} onMouseUp={() => { setPressed(null); setTimeWindow(tw); }}
                    style={btnS(`tw-${tw}`, {
                      padding: '6px 12px', borderRadius: 100,
                      background: timeWindow === tw ? t.primary : t.pill,
                      fontSize: 12, fontWeight: 700,
                      color: timeWindow === tw ? '#fff' : t.textSub,
                    })}
                  >{tw}</div>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <div
                onMouseDown={() => setPressed('b2')} onMouseUp={() => { setPressed(null); setPostStep(1); }}
                style={btnS('b2', {
                  flex: 1, background: t.pill, borderRadius: 14, padding: '14px',
                  textAlign: 'center', fontSize: 15, fontWeight: 800, color: t.textSub,
                })}
              >Back</div>
              <div
                onMouseDown={() => setPressed('pub')}
                onMouseUp={() => {
                  setPressed(null);
                  setPostDone(true);
                  setTimeout(() => {
                    setPostDone(false);
                    setPostStep(0);
                    setPostCategory(null);
                    setTab('feed');
                  }, 1400);
                }}
                style={btnS('pub', {
                  flex: 2, borderRadius: 14, padding: '14px',
                  background: postDone ? t.teal : t.primary,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                  transition: 'background 0.3s ease',
                })}
              >
                {postDone
                  ? <><Check size={16} color="#fff" /><span style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>Posted!</span></>
                  : <><Zap size={16} color="#fff" /><span style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>Post to Block</span></>
                }
              </div>
            </div>
          </div>
        )}
        <div style={{ height: 20 }} />
      </div>
    );
  };

  // ── Circles ───────────────────────────────────────────────────
  const renderCircles = () => (
    <div style={{ flex: 1, overflowY: 'auto', padding: '16px 16px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 24, fontWeight: 900, color: t.text }}>Your Circles</div>
          <div style={{ fontSize: 13, color: t.textSub, marginTop: 2 }}>Local support networks</div>
        </div>
        <div
          onMouseDown={() => setPressed('ac')} onMouseUp={() => setPressed(null)}
          style={btnS('ac', {
            width: 36, height: 36, borderRadius: 11, background: t.primary,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          })}
        >
          <Plus size={18} color="#fff" />
        </div>
      </div>

      <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
        {[
          { label: 'Circles', val: '4', Icon: Users, color: t.teal },
          { label: 'Neighbors', val: '134', Icon: User, color: t.amber },
          { label: 'Active', val: '43', Icon: Zap, color: t.primary },
        ].map(s => (
          <div key={s.label} style={{
            flex: 1, background: t.card, border: `1px solid ${t.border}`,
            borderRadius: 14, padding: '12px 8px', textAlign: 'center',
          }}>
            <s.Icon size={15} color={s.color} />
            <div style={{ fontSize: 20, fontWeight: 900, color: t.text, marginTop: 4 }}>{s.val}</div>
            <div style={{ fontSize: 10, fontWeight: 700, color: t.textSub }}>{s.label}</div>
          </div>
        ))}
      </div>

      {circles.map(c => (
        <div key={c.id} style={{
          background: t.card, border: `1px solid ${t.border}`,
          borderRadius: 16, padding: '16px', marginBottom: 12,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 48, height: 48, borderRadius: 14, background: t.surface,
              border: `1px solid ${t.border}`, display: 'flex',
              alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0,
            }}>{c.icon}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 15, fontWeight: 800, color: t.text, marginBottom: 3 }}>{c.name}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 11, color: t.textSub }}>{c.members} members</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 11, color: t.teal, fontWeight: 700 }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: t.teal }} />
                  {c.active} active
                </span>
              </div>
            </div>
            <ChevronRight size={16} color={t.textMuted} flexShrink={0} />
          </div>
          <div style={{
            marginTop: 10, paddingTop: 10, borderTop: `1px solid ${t.border}`,
            display: 'flex', alignItems: 'center', gap: 6,
          }}>
            <MessageSquare size={11} color={t.textMuted} />
            <span style={{ fontSize: 12, color: t.textSub }}>{c.recent}</span>
          </div>
        </div>
      ))}

      <div style={{ marginBottom: 8 }}>
        <div style={{ fontSize: 14, fontWeight: 800, color: t.text, marginBottom: 12 }}>Discover Circles</div>
        {[
          { name: 'Weekend Hikers', icon: '🥾', members: 18, type: 'Activity' },
          { name: 'Night Owls Café Run', icon: '☕', members: 9, type: 'Routine' },
        ].map((d, i) => (
          <div key={i} style={{
            background: t.card, border: `1px dashed ${t.border}`,
            borderRadius: 14, padding: '12px 16px', marginBottom: 8,
            display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <span style={{ fontSize: 20 }}>{d.icon}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: t.text }}>{d.name}</div>
              <div style={{ fontSize: 11, color: t.textSub }}>{d.members} members · {d.type}</div>
            </div>
            <div style={{
              padding: '5px 12px', borderRadius: 100,
              border: `1.5px solid ${t.primary}`,
              fontSize: 11, fontWeight: 800, color: t.primary,
            }}>Join</div>
          </div>
        ))}
      </div>
      <div style={{ height: 20 }} />
    </div>
  );

  // ── Profile ───────────────────────────────────────────────────
  const renderProfile = () => (
    <div style={{ flex: 1, overflowY: 'auto', padding: '16px 16px 0' }}>
      <div style={{
        background: t.card, border: `1px solid ${t.border}`,
        borderRadius: 20, padding: '20px', marginBottom: 16, textAlign: 'center',
      }}>
        <div style={{
          width: 76, height: 76, borderRadius: '50%', background: t.surface,
          border: `3px solid ${t.primary}`, display: 'flex',
          alignItems: 'center', justifyContent: 'center',
          fontSize: 34, margin: '0 auto 12px',
        }}>🧑‍💻</div>
        <div style={{ fontSize: 20, fontWeight: 900, color: t.text }}>Alex Rivera</div>
        <div style={{ fontSize: 13, color: t.textSub, marginBottom: 14 }}>Maple St. Building · Member since 2024</div>

        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 10,
          background: t.primaryGlow, border: `1px solid ${t.primary}44`,
          borderRadius: 14, padding: '10px 18px', marginBottom: 14,
        }}>
          <Award size={20} color={t.primary} />
          <div>
            <div style={{ fontSize: 26, fontWeight: 900, color: t.primary, lineHeight: 1 }}>87</div>
            <div style={{ fontSize: 10, fontWeight: 700, color: t.textSub }}>Reciprocity Score</div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 7, justifyContent: 'center' }}>
          {[
            { label: 'Reliable', color: t.teal, Icon: Shield },
            { label: 'Generous', color: t.amber, Icon: Gift },
            { label: 'Quick Reply', color: t.purple, Icon: Zap },
          ].map(b => (
            <div key={b.label} style={{
              display: 'flex', alignItems: 'center', gap: 4,
              padding: '4px 10px', borderRadius: 100,
              background: b.color + '18', border: `1px solid ${b.color}44`,
            }}>
              <b.Icon size={10} color={b.color} />
              <span style={{ fontSize: 10, fontWeight: 700, color: b.color }}>{b.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
        {[
          { label: 'Helped', val: '23', Icon: Heart, color: t.primary },
          { label: 'Trades', val: '11', Icon: RefreshCw, color: t.purple },
          { label: 'Streak', val: '14d', Icon: Zap, color: t.amber },
        ].map(s => (
          <div key={s.label} style={{
            flex: 1, background: t.card, border: `1px solid ${t.border}`,
            borderRadius: 14, padding: '12px 8px', textAlign: 'center',
          }}>
            <s.Icon size={15} color={s.color} />
            <div style={{ fontSize: 20, fontWeight: 900, color: t.text, marginTop: 4 }}>{s.val}</div>
            <div style={{ fontSize: 10, fontWeight: 700, color: t.textSub }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 14, fontWeight: 800, color: t.text, marginBottom: 12 }}>Recent Exchanges</div>
        {exchanges.map((ex, i) => {
          const exColor = ex.type === 'gave' ? t.teal : ex.type === 'received' ? t.amber : t.purple;
          return (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0',
              borderBottom: i < exchanges.length - 1 ? `1px solid ${t.border}` : 'none',
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: exColor + '22',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <ArrowRight size={14} color={exColor}
                  style={{ transform: ex.type === 'received' ? 'rotate(180deg)' : 'none' }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: t.text }}>{ex.desc}</div>
                <div style={{ fontSize: 11, color: t.textSub }}>{ex.date}</div>
              </div>
              <span style={{ fontSize: 13, fontWeight: 900, color: t.teal }}>+{ex.pts}pts</span>
            </div>
          );
        })}
      </div>

      <div style={{
        background: t.card, border: `1px solid ${t.border}`,
        borderRadius: 16, overflow: 'hidden', marginBottom: 12,
      }}>
        {[
          { label: 'Notification preferences', Icon: Bell },
          { label: 'Privacy & visibility', Icon: Eye },
          { label: 'My Circles', Icon: Users },
        ].map((item, i) => (
          <div key={item.label} style={{
            display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px',
            borderBottom: i < 2 ? `1px solid ${t.border}` : 'none',
          }}>
            <div style={{
              width: 32, height: 32, borderRadius: 10, background: t.pill,
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <item.Icon size={14} color={t.textSub} />
            </div>
            <span style={{ flex: 1, fontSize: 14, fontWeight: 600, color: t.text }}>{item.label}</span>
            <ChevronRight size={14} color={t.textMuted} />
          </div>
        ))}
      </div>

      {/* Theme toggle */}
      <div style={{
        background: t.card, border: `1px solid ${t.border}`,
        borderRadius: 16, padding: '14px 16px',
        display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20,
      }}>
        <div style={{
          width: 32, height: 32, borderRadius: 10, background: t.pill,
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          {themeKey === 'dark' ? <Moon size={14} color={t.purple} /> : <Sun size={14} color={t.amber} />}
        </div>
        <span style={{ flex: 1, fontSize: 14, fontWeight: 700, color: t.text }}>
          {themeKey === 'dark' ? 'Dark Mode' : 'Light Mode'}
        </span>
        <div
          onClick={() => setThemeKey(themeKey === 'dark' ? 'light' : 'dark')}
          style={{
            width: 50, height: 28, borderRadius: 100, position: 'relative', cursor: 'pointer',
            background: themeKey === 'dark' ? t.purple : t.textMuted,
            transition: 'background 0.3s ease',
          }}
        >
          <div style={{
            position: 'absolute', top: 4, left: themeKey === 'dark' ? 26 : 4,
            width: 20, height: 20, borderRadius: '50%', background: '#fff',
            boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
            transition: 'left 0.28s cubic-bezier(0.34,1.56,0.64,1)',
          }} />
        </div>
      </div>

      <div style={{ height: 20 }} />
    </div>
  );

  // ── Nav ────────────────────────────────────────────────────────
  const navItems = [
    { key: 'feed', Icon: Home, label: 'Feed' },
    { key: 'match', Icon: Zap, label: 'Match' },
    { key: 'post', Icon: PlusCircle, label: 'Post' },
    { key: 'circles', Icon: Users, label: 'Circles' },
    { key: 'profile', Icon: User, label: 'You' },
  ];

  return (
    <div style={{
      minHeight: '100vh', background: '#E2DDD7',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900&display=swap');
        * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
        ::-webkit-scrollbar { display: none; }
      `}</style>

      <div style={{
        width: 375, height: 812, background: t.bg,
        borderRadius: 50, overflow: 'hidden', position: 'relative',
        boxShadow: '0 50px 100px rgba(0,0,0,0.45), 0 0 0 10px #1a1a1a, 0 0 0 13px #282828',
        display: 'flex', flexDirection: 'column',
      }}>

        {/* Status bar */}
        <div style={{
          height: 52, background: t.bg, display: 'flex', alignItems: 'flex-end',
          padding: '0 28px 9px', justifyContent: 'space-between', flexShrink: 0,
          position: 'relative',
        }}>
          <span style={{ fontSize: 13, fontWeight: 800, color: t.text }}>{time}</span>
          {/* Dynamic Island */}
          <div style={{
            position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)',
            width: 122, height: 32, background: '#000', borderRadius: 100,
          }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Wifi size={13} color={t.text} />
            <Battery size={16} color={t.text} />
          </div>
        </div>

        {/* Screen */}
        <div style={{ flex: 1, background: t.bg, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          {tab === 'feed' && renderFeed()}
          {tab === 'match' && renderMatch()}
          {tab === 'post' && renderPost()}
          {tab === 'circles' && renderCircles()}
          {tab === 'profile' && renderProfile()}
        </div>

        {/* Bottom Nav */}
        <div style={{
          height: 76, background: t.nav, borderTop: `1px solid ${t.navBorder}`,
          display: 'flex', alignItems: 'center', padding: '0 4px 8px', flexShrink: 0,
        }}>
          {navItems.map(item => {
            const active = tab === item.key;
            const isPost = item.key === 'post';
            return (
              <div key={item.key}
                onMouseDown={() => setPressed(`nav-${item.key}`)}
                onMouseUp={() => { setPressed(null); if (isPost) setPostStep(0); setTab(item.key); }}
                style={btnS(`nav-${item.key}`, {
                  flex: 1, display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center',
                  gap: 3, paddingTop: 8,
                })}
              >
                {isPost ? (
                  <div style={{
                    width: 48, height: 48, borderRadius: 16, background: t.primary,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: `0 6px 18px ${t.primaryGlow}`,
                    marginTop: -20,
                  }}>
                    <item.Icon size={22} color="#fff" />
                  </div>
                ) : (
                  <>
                    <item.Icon
                      size={21}
                      color={active ? t.primary : t.textMuted}
                      strokeWidth={active ? 2.5 : 2}
                    />
                    <span style={{
                      fontSize: 9, fontWeight: active ? 800 : 600,
                      color: active ? t.primary : t.textMuted,
                      letterSpacing: '0.02em',
                    }}>{item.label}</span>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
