function App() {
  const { useState, useEffect, useRef } = React;

  // Load Google Fonts
  const fontStyle = `
    @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&family=Quicksand:wght@400;500;600;700&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    ::-webkit-scrollbar { display: none; }
    body { background: #1a1a2e; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes pulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.05); } }
    @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
    .animate-in { animation: fadeIn 0.3s ease forwards; }
    .card-hover:active { transform: scale(0.97); transition: transform 0.1s; }
  `;

  const colors = {
    bg: '#FFF5EE',
    amber: '#F6A623',
    pink: '#FFB6C1',
    plum: '#6B3A5B',
    plumLight: '#8B5070',
    plumDark: '#4A2540',
    warmGray: '#F0E6DC',
    warmGray2: '#E8D5C8',
    textDark: '#2D1B25',
    textMid: '#7A5566',
    textLight: '#B88FA0',
    white: '#FFFFFF',
    success: '#52C17A',
    danger: '#E86868',
  };

  const gradients = {
    primary: 'linear-gradient(135deg, #F6A623 0%, #E8748A 50%, #6B3A5B 100%)',
    soft: 'linear-gradient(135deg, #FFB6C1 0%, #F6A623 100%)',
    card: 'linear-gradient(145deg, #FFFFFF 0%, #FFF0E8 100%)',
    plum: 'linear-gradient(135deg, #6B3A5B 0%, #4A2540 100%)',
    eco: 'linear-gradient(135deg, #52C17A 0%, #2E8B57 100%)',
  };

  const fonts = {
    heading: "'Sora', sans-serif",
    body: "'Quicksand', sans-serif",
  };

  const [activeTab, setActiveTab] = useState('home');
  const [pressedTab, setPressedTab] = useState(null);
  const [showTradeModal, setShowTradeModal] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [likedItems, setLikedItems] = useState(new Set([2, 5]));
  const [ecoPoints, setEcoPoints] = useState(1240);
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeBadge, setActiveBadge] = useState(null);
  const [redeemPressedId, setRedeemPressedId] = useState(null);
  const [joinedEvents, setJoinedEvents] = useState(new Set([1]));
  const [notification, setNotification] = useState(null);

  const showNotif = (msg, type = 'success') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 2500);
  };

  const currentTime = '9:41';

  // ─── DATA ────────────────────────────────────────────────────────────────
  const tradeItems = [
    { id: 1, title: 'Glass Jars (12 pack)', user: 'Maya K.', avatar: '🌿', category: 'Glass', points: 180, distance: '0.3 mi', tags: ['Clean', 'Various sizes'], img: '🫙', urgency: 'Popular' },
    { id: 2, title: 'Fabric Scraps Bundle', user: 'Lena O.', avatar: '🧶', category: 'Fabric', points: 120, distance: '0.8 mi', tags: ['Cotton', 'Mixed colors'], img: '🧵', urgency: 'New' },
    { id: 3, title: 'Cardboard Sheets', user: 'Tom R.', avatar: '📦', category: 'Paper', points: 60, distance: '1.2 mi', tags: ['Flat', 'Large'], img: '📋', urgency: null },
    { id: 4, title: 'Wine Bottles x6', user: 'Sara M.', avatar: '🍷', category: 'Glass', points: 90, distance: '2.1 mi', tags: ['Clean', 'Green'], img: '🍾', urgency: null },
    { id: 5, title: 'Plastic Containers', user: 'Kai P.', avatar: '♻️', category: 'Plastic', points: 75, distance: '0.5 mi', tags: ['Food grade', 'Lids included'], img: '🥡', urgency: 'Expiring' },
    { id: 6, title: 'Old Newspapers x50', user: 'Beth L.', avatar: '📰', category: 'Paper', points: 45, distance: '1.7 mi', tags: ['Dry', 'Bundled'], img: '🗞️', urgency: null },
  ];

  const categories = ['All', 'Glass', 'Fabric', 'Paper', 'Plastic', 'Metal'];

  const shops = [
    { id: 1, name: 'Green Leaf Market', desc: '10% off organic produce', points: 500, icon: '🌱', color: '#52C17A', tag: 'Food' },
    { id: 2, name: 'EcoWear Studio', desc: 'Free alterations service', points: 800, icon: '👗', color: '#F6A623', tag: 'Fashion' },
    { id: 3, name: 'Terra Coffee', desc: 'Free drink upgrade', points: 300, icon: '☕', color: '#8B6914', tag: 'Cafe' },
    { id: 4, name: 'Solar Goods Co.', desc: '$15 store credit', points: 1200, icon: '☀️', color: '#E8B84B', tag: 'Home' },
    { id: 5, name: 'Bike & Bloom', desc: 'Free bike tune-up', points: 950, icon: '🚲', color: '#6B3A5B', tag: 'Services' },
  ];

  const events = [
    { id: 1, title: 'Community Swap Meet', date: 'Mar 22', time: '10am–2pm', location: 'Riverside Park', attendees: 47, img: '🔄', pts: '+200 pts', category: 'Trade' },
    { id: 2, title: 'Zero Waste Workshop', date: 'Mar 25', time: '6pm–8pm', location: 'EcoHub Center', attendees: 23, img: '🌍', pts: '+150 pts', category: 'Learn' },
    { id: 3, title: 'Upcycling Craft Day', date: 'Apr 1', time: '11am–3pm', location: 'Maker Space', attendees: 31, img: '✂️', pts: '+175 pts', category: 'Create' },
    { id: 4, title: 'Repair Café', date: 'Apr 5', time: '9am–12pm', location: 'Library Hall', attendees: 18, img: '🔧', pts: '+100 pts', category: 'Fix' },
  ];

  const badges = [
    { id: 1, icon: '🌱', label: 'Seedling', desc: 'First trade completed', earned: true },
    { id: 2, icon: '♻️', label: 'Recycler', desc: '10 items traded', earned: true },
    { id: 3, icon: '🌍', label: 'Eco Warrior', desc: '50 items traded', earned: false },
    { id: 4, icon: '⭐', label: 'Star Trader', desc: 'Top rated trader', earned: true },
    { id: 5, icon: '🔥', label: 'Streak', desc: '7-day login streak', earned: false },
    { id: 6, icon: '🏆', label: 'Champion', desc: '100 eco-points earned', earned: true },
  ];

  const myTrades = [
    { id: 1, item: 'Glass Jar Set', type: 'Given', pts: '+180', date: 'Mar 16', partner: 'Maya K.' },
    { id: 2, item: 'Fabric Bundle', type: 'Received', pts: '-120', date: 'Mar 14', partner: 'Lena O.' },
    { id: 3, item: 'Cardboard Lot', type: 'Given', pts: '+60', date: 'Mar 10', partner: 'Tom R.' },
  ];

  const filteredItems = activeCategory === 'All' ? tradeItems : tradeItems.filter(i => i.category === activeCategory);

  // ─── STATUS BAR ──────────────────────────────────────────────────────────
  const StatusBar = () => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 20px 4px', background: 'transparent' }}>
      <span style={{ fontFamily: fonts.heading, fontSize: 15, fontWeight: 600, color: colors.textDark }}>{currentTime}</span>
      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        {/* WiFi */}
        <svg width="16" height="12" viewBox="0 0 24 18" fill="none">
          <path d="M12 14a2 2 0 100 4 2 2 0 000-4z" fill={colors.plum}/>
          <path d="M7.5 10.5C8.9 9.1 10.4 8.5 12 8.5s3.1.6 4.5 2" stroke={colors.plum} strokeWidth="2" strokeLinecap="round" fill="none"/>
          <path d="M4 7C6.4 4.6 9 3.5 12 3.5s5.6 1.1 8 3.5" stroke={colors.plum} strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.5"/>
        </svg>
        {/* Battery */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <div style={{ width: 22, height: 11, border: `1.5px solid ${colors.plum}`, borderRadius: 3, padding: 1.5, display: 'flex', alignItems: 'center' }}>
            <div style={{ width: '80%', height: '100%', background: colors.plum, borderRadius: 1.5 }}/>
          </div>
          <div style={{ width: 2.5, height: 5, background: colors.plum, borderRadius: '0 1px 1px 0' }}/>
        </div>
      </div>
    </div>
  );

  // ─── DYNAMIC ISLAND ──────────────────────────────────────────────────────
  const DynamicIsland = () => (
    <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 8, paddingBottom: 4 }}>
      <div style={{ width: 120, height: 34, background: '#1a1a1a', borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#2a2a2a', border: '1px solid #333' }}/>
        <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#333' }}/>
      </div>
    </div>
  );

  // ─── BOTTOM NAV ──────────────────────────────────────────────────────────
  const BottomNav = () => {
    const tabs = [
      { id: 'home', icon: 'Home', label: 'Explore' },
      { id: 'trade', icon: 'ArrowLeftRight', label: 'Trade' },
      { id: 'points', icon: 'Leaf', label: 'Eco Points' },
      { id: 'community', icon: 'Users', label: 'Community' },
      { id: 'profile', icon: 'User', label: 'Profile' },
    ];
    return (
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: colors.white, borderTop: `1px solid ${colors.warmGray2}`, display: 'flex', justifyContent: 'space-around', padding: '8px 4px 20px', boxShadow: '0 -4px 20px rgba(107,58,91,0.08)' }}>
        {tabs.map(tab => {
          const Icon = window.lucide[tab.icon];
          const isActive = activeTab === tab.id;
          const isPressed = pressedTab === tab.id;
          return (
            <button
              key={tab.id}
              onMouseDown={() => setPressedTab(tab.id)}
              onMouseUp={() => { setPressedTab(null); setActiveTab(tab.id); }}
              onTouchStart={() => setPressedTab(tab.id)}
              onTouchEnd={() => { setPressedTab(null); setActiveTab(tab.id); }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, border: 'none', background: 'transparent', cursor: 'pointer', padding: '4px 8px', transform: isPressed ? 'scale(0.88)' : 'scale(1)', transition: 'transform 0.1s' }}
            >
              <div style={{ width: 40, height: 28, borderRadius: 14, background: isActive ? `${colors.plum}15` : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}>
                {Icon && <Icon size={20} color={isActive ? colors.plum : colors.textLight} strokeWidth={isActive ? 2.5 : 1.8}/>}
              </div>
              <span style={{ fontFamily: fonts.body, fontSize: 10, fontWeight: isActive ? 700 : 500, color: isActive ? colors.plum : colors.textLight }}>{tab.label}</span>
              {isActive && <div style={{ width: 4, height: 4, borderRadius: '50%', background: colors.amber, marginTop: -2 }}/>}
            </button>
          );
        })}
      </div>
    );
  };

  // ─── NOTIFICATION TOAST ──────────────────────────────────────────────────
  const NotificationToast = () => {
    if (!notification) return null;
    return (
      <div style={{ position: 'absolute', top: 90, left: 16, right: 16, zIndex: 999, background: notification.type === 'success' ? colors.success : colors.danger, borderRadius: 16, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 8, boxShadow: '0 8px 24px rgba(0,0,0,0.15)', animation: 'slideUp 0.3s ease' }}>
        <span style={{ fontSize: 18 }}>{notification.type === 'success' ? '✓' : '!'}</span>
        <span style={{ fontFamily: fonts.body, fontSize: 14, fontWeight: 600, color: '#fff' }}>{notification.msg}</span>
      </div>
    );
  };

  // ─── ITEM CARD ───────────────────────────────────────────────────────────
  const ItemCard = ({ item }) => {
    const isLiked = likedItems.has(item.id);
    const [pressed, setPressed] = useState(false);
    const urgencyColors = { Popular: { bg: '#FFE8D0', text: '#C4621A' }, New: { bg: '#D0F0E0', text: '#1A7A45' }, Expiring: { bg: '#FFE0E0', text: '#C41A1A' } };
    return (
      <div
        className="card-hover"
        onMouseDown={() => setPressed(true)}
        onMouseUp={() => { setPressed(false); setSelectedItem(item); setShowTradeModal(true); }}
        onTouchStart={() => setPressed(true)}
        onTouchEnd={() => { setPressed(false); setSelectedItem(item); setShowTradeModal(true); }}
        style={{ background: colors.white, borderRadius: 20, padding: 14, marginBottom: 12, boxShadow: '0 2px 12px rgba(107,58,91,0.08)', transform: pressed ? 'scale(0.97)' : 'scale(1)', transition: 'transform 0.1s', cursor: 'pointer', border: `1px solid ${colors.warmGray}` }}
      >
        <div style={{ display: 'flex', gap: 12 }}>
          <div style={{ width: 68, height: 68, borderRadius: 16, background: `linear-gradient(135deg, ${colors.warmGray} 0%, ${colors.pink}40 100%)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 30, flexShrink: 0 }}>{item.img}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 3 }}>
              <span style={{ fontFamily: fonts.heading, fontSize: 14, fontWeight: 600, color: colors.textDark, lineHeight: 1.3, flex: 1, marginRight: 6 }}>{item.title}</span>
              {item.urgency && (
                <span style={{ fontFamily: fonts.body, fontSize: 10, fontWeight: 700, padding: '2px 7px', borderRadius: 8, background: urgencyColors[item.urgency].bg, color: urgencyColors[item.urgency].text, flexShrink: 0 }}>{item.urgency}</span>
              )}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 6 }}>
              <span style={{ fontSize: 12 }}>{item.avatar}</span>
              <span style={{ fontFamily: fonts.body, fontSize: 12, color: colors.textMid }}>{item.user}</span>
              <span style={{ color: colors.warmGray2 }}>·</span>
              <span style={{ fontFamily: fonts.body, fontSize: 12, color: colors.textLight }}>{item.distance}</span>
            </div>
            <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
              {item.tags.map(tag => (
                <span key={tag} style={{ fontFamily: fonts.body, fontSize: 10, padding: '2px 7px', borderRadius: 8, background: `${colors.plum}12`, color: colors.plumLight, fontWeight: 600 }}>{tag}</span>
              ))}
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10, paddingTop: 10, borderTop: `1px solid ${colors.warmGray}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ fontSize: 14 }}>🌿</span>
            <span style={{ fontFamily: fonts.heading, fontSize: 15, fontWeight: 700, color: colors.plum }}>{item.points}</span>
            <span style={{ fontFamily: fonts.body, fontSize: 12, color: colors.textMid }}>eco-pts</span>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onMouseDown={e => e.stopPropagation()}
              onClick={e => { e.stopPropagation(); setLikedItems(prev => { const n = new Set(prev); n.has(item.id) ? n.delete(item.id) : n.add(item.id); return n; }); }}
              style={{ width: 34, height: 34, borderRadius: 10, border: `1px solid ${isLiked ? colors.pink : colors.warmGray2}`, background: isLiked ? `${colors.pink}30` : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
            >
              {window.lucide.Heart && <window.lucide.Heart size={16} color={isLiked ? '#E87A8E' : colors.textLight} fill={isLiked ? '#E87A8E' : 'none'}/>}
            </button>
            <button
              onMouseDown={e => e.stopPropagation()}
              onClick={e => { e.stopPropagation(); showNotif('Message sent to ' + item.user); }}
              style={{ width: 34, height: 34, borderRadius: 10, border: `1px solid ${colors.warmGray2}`, background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
            >
              {window.lucide.MessageCircle && <window.lucide.MessageCircle size={16} color={colors.textLight}/>}
            </button>
          </div>
        </div>
      </div>
    );
  };

  // ─── TRADE MODAL ─────────────────────────────────────────────────────────
  const TradeModal = () => {
    if (!showTradeModal || !selectedItem) return null;
    return (
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(45,27,37,0.5)', zIndex: 500, display: 'flex', alignItems: 'flex-end', backdropFilter: 'blur(4px)' }}
        onClick={() => setShowTradeModal(false)}>
        <div style={{ background: colors.bg, borderRadius: '28px 28px 0 0', padding: '24px 20px 36px', width: '100%', animation: 'slideUp 0.3s ease' }} onClick={e => e.stopPropagation()}>
          <div style={{ width: 36, height: 4, borderRadius: 2, background: colors.warmGray2, margin: '0 auto 20px' }}/>
          <div style={{ display: 'flex', gap: 14, marginBottom: 20 }}>
            <div style={{ width: 80, height: 80, borderRadius: 20, background: `linear-gradient(135deg, ${colors.warmGray} 0%, ${colors.pink}40 100%)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36 }}>{selectedItem.img}</div>
            <div>
              <h3 style={{ fontFamily: fonts.heading, fontSize: 18, fontWeight: 700, color: colors.textDark, marginBottom: 4 }}>{selectedItem.title}</h3>
              <p style={{ fontFamily: fonts.body, fontSize: 13, color: colors.textMid, marginBottom: 8 }}>Listed by {selectedItem.user} · {selectedItem.distance}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: `${colors.plum}10`, padding: '4px 10px', borderRadius: 10, display: 'inline-flex' }}>
                <span style={{ fontSize: 14 }}>🌿</span>
                <span style={{ fontFamily: fonts.heading, fontSize: 16, fontWeight: 700, color: colors.plum }}>{selectedItem.points} eco-points</span>
              </div>
            </div>
          </div>
          <div style={{ background: colors.white, borderRadius: 16, padding: '12px 14px', marginBottom: 16 }}>
            <p style={{ fontFamily: fonts.body, fontSize: 13, color: colors.textMid, lineHeight: 1.6 }}>This item earns you <strong style={{ color: colors.plum }}>{selectedItem.points} eco-points</strong> upon successful trade. Points can be redeemed at participating sustainable businesses.</p>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={() => { setShowQRModal(true); setShowTradeModal(false); }} style={{ flex: 1, padding: '13px 0', borderRadius: 16, border: `2px solid ${colors.plum}`, background: 'transparent', fontFamily: fonts.heading, fontSize: 14, fontWeight: 600, color: colors.plum, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
              {window.lucide.QrCode && <window.lucide.QrCode size={16}/>} Scan QR
            </button>
            <button onClick={() => { setEcoPoints(p => p + selectedItem.points); showNotif(`Trade confirmed! +${selectedItem.points} eco-pts`); setShowTradeModal(false); }} style={{ flex: 2, padding: '13px 0', borderRadius: 16, border: 'none', background: gradients.primary, fontFamily: fonts.heading, fontSize: 14, fontWeight: 700, color: '#fff', cursor: 'pointer', boxShadow: '0 4px 16px rgba(107,58,91,0.3)' }}>
              Confirm Trade
            </button>
          </div>
        </div>
      </div>
    );
  };

  // ─── QR MODAL ────────────────────────────────────────────────────────────
  const QRModal = () => {
    if (!showQRModal) return null;
    return (
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(45,27,37,0.85)', zIndex: 600, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(6px)' }}
        onClick={() => setShowQRModal(false)}>
        <div style={{ background: colors.white, borderRadius: 28, padding: 28, textAlign: 'center', width: 280, animation: 'fadeIn 0.3s ease' }} onClick={e => e.stopPropagation()}>
          <h3 style={{ fontFamily: fonts.heading, fontSize: 18, fontWeight: 700, color: colors.textDark, marginBottom: 6 }}>Scan to Trade</h3>
          <p style={{ fontFamily: fonts.body, fontSize: 13, color: colors.textMid, marginBottom: 20 }}>Show this code to your trader</p>
          {/* QR Code SVG */}
          <div style={{ width: 180, height: 180, margin: '0 auto 20px', background: '#fff', padding: 12, borderRadius: 16, border: `2px solid ${colors.warmGray2}` }}>
            <svg viewBox="0 0 37 37" style={{ width: '100%', height: '100%' }} fill="none">
              {/* QR pattern */}
              {[0,1,2,3,4,5,6].map(r => [0,1,2,3,4,5,6].map(c => {
                const corner = (r<7 && c<7) || (r<7 && c>29) || (r>29 && c<7);
                const val = ((r*7+c)*1234567 % 3) !== 2;
                return val ? <rect key={`${r}-${c}`} x={c+0.1} y={r+0.1} width={0.8} height={0.8} fill={colors.plum}/> : null;
              }))}
              {[[0,0,7,7],[0,30,7,7],[30,0,7,7]].map(([y,x,h,w],i) => (
                <g key={i}>
                  <rect x={x} y={y} width={w} height={h} rx={1} stroke={colors.plum} strokeWidth={1.5} fill="none"/>
                  <rect x={x+2} y={y+2} width={w-4} height={h-4} rx={0.5} fill={colors.plum}/>
                </g>
              ))}
              {/* Center pattern */}
              {Array.from({length:8},(_,r)=>Array.from({length:8},(_,c)=>(
                ((r+c)*31%5!==0) ? <rect key={`m${r}-${c}`} x={c*1.5+8} y={r*1.5+8} width={1} height={1} fill={colors.plum} opacity={0.7}/> : null
              )))}
            </svg>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 6, background: `${colors.plum}10`, padding: '8px 16px', borderRadius: 12, marginBottom: 16 }}>
            <span style={{ fontFamily: fonts.heading, fontSize: 13, fontWeight: 700, color: colors.plum, letterSpacing: 2 }}>TT-84729-KX</span>
          </div>
          <button onClick={() => { setShowQRModal(false); showNotif('Trade completed! +150 eco-pts'); }} style={{ width: '100%', padding: '12px 0', borderRadius: 14, border: 'none', background: gradients.primary, fontFamily: fonts.heading, fontSize: 14, fontWeight: 700, color: '#fff', cursor: 'pointer' }}>
            Trade Complete
          </button>
        </div>
      </div>
    );
  };

  // ─── HOME SCREEN ─────────────────────────────────────────────────────────
  const HomeScreen = () => (
    <div style={{ flex: 1, overflow: 'auto', padding: '0 16px 80px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, paddingTop: 4 }}>
        <div>
          <p style={{ fontFamily: fonts.body, fontSize: 13, color: colors.textMid, marginBottom: 2 }}>Good morning 🌿</p>
          <h1 style={{ fontFamily: fonts.heading, fontSize: 22, fontWeight: 700, color: colors.textDark }}>Explore Trades</h1>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => setShowQRModal(true)} style={{ width: 40, height: 40, borderRadius: 13, background: gradients.primary, border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 3px 12px rgba(107,58,91,0.25)' }}>
            {window.lucide.QrCode && <window.lucide.QrCode size={18} color="#fff"/>}
          </button>
          <button style={{ width: 40, height: 40, borderRadius: 13, background: colors.white, border: `1px solid ${colors.warmGray2}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            {window.lucide.Bell && <window.lucide.Bell size={18} color={colors.textMid}/>}
            <div style={{ position: 'absolute', width: 8, height: 8, borderRadius: '50%', background: colors.amber, top: 8, right: 8, border: `2px solid ${colors.bg}` }}/>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: colors.white, borderRadius: 16, padding: '10px 14px', marginBottom: 16, border: `1px solid ${colors.warmGray2}`, boxShadow: '0 2px 8px rgba(107,58,91,0.05)' }}>
        {window.lucide.Search && <window.lucide.Search size={16} color={colors.textLight}/>}
        <span style={{ fontFamily: fonts.body, fontSize: 14, color: colors.textLight }}>Search items, materials...</span>
      </div>

      {/* Stats Banner */}
      <div style={{ background: gradients.primary, borderRadius: 20, padding: '16px 18px', marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <p style={{ fontFamily: fonts.body, fontSize: 12, color: 'rgba(255,255,255,0.8)', marginBottom: 2 }}>Your Eco-Points</p>
          <p style={{ fontFamily: fonts.heading, fontSize: 28, fontWeight: 700, color: '#fff' }}>{ecoPoints.toLocaleString()}</p>
          <p style={{ fontFamily: fonts.body, fontSize: 11, color: 'rgba(255,255,255,0.7)' }}>+180 this week 🔥</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ width: 56, height: 56, borderRadius: 18, background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>🌿</div>
          <p style={{ fontFamily: fonts.body, fontSize: 10, color: 'rgba(255,255,255,0.8)', marginTop: 4 }}>Level 4 Trader</p>
        </div>
      </div>

      {/* Categories */}
      <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 8, marginBottom: 14 }}>
        {categories.map(cat => (
          <button key={cat} onClick={() => setActiveCategory(cat)} style={{ flexShrink: 0, padding: '6px 14px', borderRadius: 20, border: activeCategory === cat ? 'none' : `1px solid ${colors.warmGray2}`, background: activeCategory === cat ? gradients.plum : colors.white, fontFamily: fonts.body, fontSize: 12, fontWeight: 600, color: activeCategory === cat ? '#fff' : colors.textMid, cursor: 'pointer', transition: 'all 0.2s' }}>
            {cat}
          </button>
        ))}
      </div>

      {/* Nearby section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <h2 style={{ fontFamily: fonts.heading, fontSize: 16, fontWeight: 700, color: colors.textDark }}>Near You</h2>
        <span style={{ fontFamily: fonts.body, fontSize: 12, color: colors.plumLight, fontWeight: 600 }}>{filteredItems.length} items</span>
      </div>

      {filteredItems.map(item => <ItemCard key={item.id} item={item}/>)}
    </div>
  );

  // ─── TRADE SCREEN ─────────────────────────────────────────────────────────
  const TradeScreen = () => {
    const [activeTab2, setActiveTab2] = useState('post');
    const [selectedCategory, setSelectedCategory] = useState('Glass');
    const [itemName, setItemName] = useState('');
    const [qty, setQty] = useState(1);
    const [postPressed, setPostPressed] = useState(false);

    const wasteCategories = [
      { id: 'Glass', icon: '🫙', color: '#4A90D9', desc: 'Bottles, jars, containers' },
      { id: 'Fabric', icon: '🧵', color: '#E87A8E', desc: 'Clothes, scraps, yarn' },
      { id: 'Paper', icon: '📄', color: '#52C17A', desc: 'Cardboard, newspapers' },
      { id: 'Plastic', icon: '♻️', color: '#F6A623', desc: 'Containers, bags, film' },
      { id: 'Metal', icon: '🔩', color: '#8B7355', desc: 'Cans, wire, foil' },
      { id: 'Wood', icon: '🪵', color: '#A0522D', desc: 'Scraps, pallets, sawdust' },
    ];

    return (
      <div style={{ flex: 1, overflow: 'auto', padding: '0 16px 80px' }}>
        <h1 style={{ fontFamily: fonts.heading, fontSize: 22, fontWeight: 700, color: colors.textDark, marginBottom: 4, paddingTop: 4 }}>Trade Hub</h1>
        <p style={{ fontFamily: fonts.body, fontSize: 13, color: colors.textMid, marginBottom: 16 }}>Post items or track your waste</p>

        {/* Tab Toggle */}
        <div style={{ display: 'flex', background: colors.warmGray, borderRadius: 16, padding: 3, marginBottom: 20 }}>
          {['post', 'track'].map(t => (
            <button key={t} onClick={() => setActiveTab2(t)} style={{ flex: 1, padding: '9px 0', borderRadius: 13, border: 'none', background: activeTab2 === t ? colors.white : 'transparent', fontFamily: fonts.heading, fontSize: 13, fontWeight: 700, color: activeTab2 === t ? colors.plum : colors.textMid, cursor: 'pointer', transition: 'all 0.2s', boxShadow: activeTab2 === t ? '0 2px 8px rgba(107,58,91,0.12)' : 'none' }}>
              {t === 'post' ? '📤 Post Item' : '📊 Track Waste'}
            </button>
          ))}
        </div>

        {activeTab2 === 'post' ? (
          <div style={{ animation: 'fadeIn 0.3s ease' }}>
            {/* QR Quick Trade */}
            <button onClick={() => setShowQRModal(true)} style={{ width: '100%', padding: '14px 18px', borderRadius: 18, border: `2px dashed ${colors.plumLight}`, background: `${colors.plum}06`, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
              <div style={{ width: 44, height: 44, borderRadius: 14, background: gradients.plum, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {window.lucide.QrCode && <window.lucide.QrCode size={22} color="#fff"/>}
              </div>
              <div style={{ textAlign: 'left' }}>
                <p style={{ fontFamily: fonts.heading, fontSize: 14, fontWeight: 700, color: colors.plum }}>Quick QR Trade</p>
                <p style={{ fontFamily: fonts.body, fontSize: 12, color: colors.textMid }}>Scan to trade instantly in person</p>
              </div>
              {window.lucide.ChevronRight && <window.lucide.ChevronRight size={18} color={colors.plumLight} style={{ marginLeft: 'auto' }}/>}
            </button>

            {/* Post Form */}
            <div style={{ background: colors.white, borderRadius: 20, padding: 16, marginBottom: 14, boxShadow: '0 2px 12px rgba(107,58,91,0.06)' }}>
              <h3 style={{ fontFamily: fonts.heading, fontSize: 15, fontWeight: 700, color: colors.textDark, marginBottom: 14 }}>Post New Item</h3>
              <div style={{ marginBottom: 12 }}>
                <label style={{ fontFamily: fonts.body, fontSize: 12, fontWeight: 600, color: colors.textMid, display: 'block', marginBottom: 6 }}>ITEM NAME</label>
                <input value={itemName} onChange={e => setItemName(e.target.value)} placeholder="e.g. Glass mason jars" style={{ width: '100%', padding: '11px 14px', borderRadius: 12, border: `1.5px solid ${colors.warmGray2}`, fontFamily: fonts.body, fontSize: 14, color: colors.textDark, background: colors.bg, outline: 'none' }}/>
              </div>
              <div style={{ marginBottom: 12 }}>
                <label style={{ fontFamily: fonts.body, fontSize: 12, fontWeight: 600, color: colors.textMid, display: 'block', marginBottom: 6 }}>CATEGORY</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
                  {wasteCategories.map(cat => (
                    <button key={cat.id} onClick={() => setSelectedCategory(cat.id)} style={{ padding: '10px 4px', borderRadius: 12, border: `2px solid ${selectedCategory === cat.id ? cat.color : colors.warmGray2}`, background: selectedCategory === cat.id ? `${cat.color}15` : 'transparent', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, cursor: 'pointer', transition: 'all 0.15s' }}>
                      <span style={{ fontSize: 20 }}>{cat.icon}</span>
                      <span style={{ fontFamily: fonts.body, fontSize: 10, fontWeight: 700, color: selectedCategory === cat.id ? cat.color : colors.textMid }}>{cat.id}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div style={{ marginBottom: 14 }}>
                <label style={{ fontFamily: fonts.body, fontSize: 12, fontWeight: 600, color: colors.textMid, display: 'block', marginBottom: 6 }}>QUANTITY</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <button onClick={() => setQty(q => Math.max(1,q-1))} style={{ width: 34, height: 34, borderRadius: 10, border: `1.5px solid ${colors.warmGray2}`, background: 'transparent', fontFamily: fonts.heading, fontSize: 18, color: colors.plum, cursor: 'pointer' }}>−</button>
                  <span style={{ fontFamily: fonts.heading, fontSize: 18, fontWeight: 700, color: colors.textDark, minWidth: 30, textAlign: 'center' }}>{qty}</span>
                  <button onClick={() => setQty(q => q+1)} style={{ width: 34, height: 34, borderRadius: 10, border: `1.5px solid ${colors.warmGray2}`, background: 'transparent', fontFamily: fonts.heading, fontSize: 18, color: colors.plum, cursor: 'pointer' }}>+</button>
                  <span style={{ fontFamily: fonts.body, fontSize: 13, color: colors.textMid }}>items</span>
                </div>
              </div>
              <button
                onMouseDown={() => setPostPressed(true)}
                onMouseUp={() => { setPostPressed(false); showNotif('Item posted! 🎉'); setItemName(''); setQty(1); }}
                style={{ width: '100%', padding: '13px 0', borderRadius: 16, border: 'none', background: gradients.primary, fontFamily: fonts.heading, fontSize: 15, fontWeight: 700, color: '#fff', cursor: 'pointer', transform: postPressed ? 'scale(0.97)' : 'scale(1)', transition: 'transform 0.1s', boxShadow: '0 4px 16px rgba(107,58,91,0.3)' }}>
                Post Item ✨
              </button>
            </div>
          </div>
        ) : (
          <div style={{ animation: 'fadeIn 0.3s ease' }}>
            <div style={{ background: colors.white, borderRadius: 20, padding: 16, marginBottom: 14, boxShadow: '0 2px 12px rgba(107,58,91,0.06)' }}>
              <h3 style={{ fontFamily: fonts.heading, fontSize: 15, fontWeight: 700, color: colors.textDark, marginBottom: 14 }}>Waste Categories This Month</h3>
              {[{ cat: 'Glass', n: 12, kg: 3.4, color: '#4A90D9', icon: '🫙' }, { cat: 'Fabric', n: 7, kg: 1.8, color: '#E87A8E', icon: '🧵' }, { cat: 'Paper', n: 23, kg: 8.2, color: '#52C17A', icon: '📄' }, { cat: 'Plastic', n: 5, kg: 1.2, color: '#F6A623', icon: '♻️' }].map(d => (
                <div key={d.cat} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                  <span style={{ fontSize: 20, width: 28 }}>{d.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <span style={{ fontFamily: fonts.body, fontSize: 13, fontWeight: 600, color: colors.textDark }}>{d.cat}</span>
                      <span style={{ fontFamily: fonts.body, fontSize: 12, color: colors.textMid }}>{d.n} items · {d.kg}kg</span>
                    </div>
                    <div style={{ height: 8, background: colors.warmGray, borderRadius: 4, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${Math.min(100, d.n*3)}%`, background: d.color, borderRadius: 4, transition: 'width 0.8s ease' }}/>
                    </div>
                  </div>
                </div>
              ))}
              <div style={{ background: `linear-gradient(135deg, ${colors.warmGray} 0%, ${colors.pink}20 100%)`, borderRadius: 14, padding: '12px 14px', marginTop: 4 }}>
                <p style={{ fontFamily: fonts.heading, fontSize: 13, fontWeight: 700, color: colors.plum, marginBottom: 2 }}>🌍 Environmental Impact</p>
                <p style={{ fontFamily: fonts.body, fontSize: 12, color: colors.textMid }}>You've prevented <strong>14.6 kg</strong> of waste from landfill this month!</p>
              </div>
            </div>

            <h3 style={{ fontFamily: fonts.heading, fontSize: 15, fontWeight: 700, color: colors.textDark, marginBottom: 10 }}>My Trade History</h3>
            {myTrades.map(t => (
              <div key={t.id} style={{ background: colors.white, borderRadius: 16, padding: '12px 14px', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 12, boxShadow: '0 2px 8px rgba(107,58,91,0.05)' }}>
                <div style={{ width: 42, height: 42, borderRadius: 13, background: t.type === 'Given' ? `${colors.amber}20` : `${colors.plum}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {window.lucide.ArrowLeftRight && <window.lucide.ArrowLeftRight size={18} color={t.type === 'Given' ? colors.amber : colors.plum}/>}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontFamily: fonts.body, fontSize: 13, fontWeight: 600, color: colors.textDark }}>{t.item}</p>
                  <p style={{ fontFamily: fonts.body, fontSize: 11, color: colors.textLight }}>{t.type} · {t.partner} · {t.date}</p>
                </div>
                <span style={{ fontFamily: fonts.heading, fontSize: 14, fontWeight: 700, color: t.type === 'Given' ? colors.success : colors.danger }}>{t.pts} pts</span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  // ─── ECO POINTS SCREEN ───────────────────────────────────────────────────
  const PointsScreen = () => (
    <div style={{ flex: 1, overflow: 'auto', padding: '0 16px 80px' }}>
      <h1 style={{ fontFamily: fonts.heading, fontSize: 22, fontWeight: 700, color: colors.textDark, marginBottom: 4, paddingTop: 4 }}>Eco-Points</h1>
      <p style={{ fontFamily: fonts.body, fontSize: 13, color: colors.textMid, marginBottom: 16 }}>Redeem your green rewards</p>

      {/* Balance Card */}
      <div style={{ background: gradients.primary, borderRadius: 24, padding: '20px 22px', marginBottom: 20, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -20, right: -20, width: 100, height: 100, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }}/>
        <div style={{ position: 'absolute', bottom: -30, left: -15, width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }}/>
        <p style={{ fontFamily: fonts.body, fontSize: 13, color: 'rgba(255,255,255,0.8)', marginBottom: 4 }}>Total Balance</p>
        <p style={{ fontFamily: fonts.heading, fontSize: 40, fontWeight: 700, color: '#fff', marginBottom: 8, lineHeight: 1 }}>{ecoPoints.toLocaleString()}</p>
        <p style={{ fontFamily: fonts.body, fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>🌿 eco-points</p>
        <div style={{ display: 'flex', gap: 16, marginTop: 16 }}>
          {[{ label: 'Earned', val: '2,140' }, { label: 'Spent', val: '900' }, { label: 'This month', val: '+180' }].map(s => (
            <div key={s.label} style={{ flex: 1, background: 'rgba(255,255,255,0.15)', borderRadius: 12, padding: '8px 10px' }}>
              <p style={{ fontFamily: fonts.heading, fontSize: 15, fontWeight: 700, color: '#fff' }}>{s.val}</p>
              <p style={{ fontFamily: fonts.body, fontSize: 10, color: 'rgba(255,255,255,0.7)' }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Progress to next level */}
      <div style={{ background: colors.white, borderRadius: 20, padding: '14px 16px', marginBottom: 16, boxShadow: '0 2px 12px rgba(107,58,91,0.06)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <p style={{ fontFamily: fonts.heading, fontSize: 14, fontWeight: 700, color: colors.textDark }}>Level 4 → Level 5</p>
          <p style={{ fontFamily: fonts.body, fontSize: 12, color: colors.textMid }}>760 pts to go</p>
        </div>
        <div style={{ height: 10, background: colors.warmGray, borderRadius: 5, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: '62%', background: gradients.primary, borderRadius: 5 }}/>
        </div>
        <p style={{ fontFamily: fonts.body, fontSize: 11, color: colors.textLight, marginTop: 6 }}>🏆 Reach Level 5 for exclusive partner deals</p>
      </div>

      {/* Redeem at shops */}
      <h2 style={{ fontFamily: fonts.heading, fontSize: 16, fontWeight: 700, color: colors.textDark, marginBottom: 12 }}>Redeem at Local Shops</h2>
      {shops.map(shop => {
        const canAfford = ecoPoints >= shop.points;
        const isPressed = redeemPressedId === shop.id;
        return (
          <div key={shop.id} style={{ background: colors.white, borderRadius: 18, padding: '12px 14px', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 12, boxShadow: '0 2px 10px rgba(107,58,91,0.06)', border: `1px solid ${colors.warmGray}` }}>
            <div style={{ width: 48, height: 48, borderRadius: 15, background: `${shop.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0 }}>{shop.icon}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontFamily: fonts.heading, fontSize: 14, fontWeight: 700, color: colors.textDark }}>{shop.name}</p>
              <p style={{ fontFamily: fonts.body, fontSize: 12, color: colors.textMid, marginBottom: 2 }}>{shop.desc}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ fontFamily: fonts.heading, fontSize: 12, fontWeight: 700, color: canAfford ? colors.success : colors.textLight }}>🌿 {shop.points}</span>
                <span style={{ fontFamily: fonts.body, fontSize: 11, color: colors.textLight }}>pts</span>
              </div>
            </div>
            <button
              onMouseDown={() => setRedeemPressedId(shop.id)}
              onMouseUp={() => {
                setRedeemPressedId(null);
                if (canAfford) { setEcoPoints(p => p - shop.points); showNotif(`Redeemed at ${shop.name}! 🎉`); }
                else showNotif('Not enough eco-points', 'error');
              }}
              style={{ padding: '8px 14px', borderRadius: 12, border: 'none', background: canAfford ? gradients.plum : colors.warmGray2, fontFamily: fonts.heading, fontSize: 12, fontWeight: 700, color: canAfford ? '#fff' : colors.textLight, cursor: canAfford ? 'pointer' : 'default', transform: isPressed ? 'scale(0.95)' : 'scale(1)', transition: 'transform 0.1s', flexShrink: 0 }}>
              {canAfford ? 'Redeem' : 'Need pts'}
            </button>
          </div>
        );
      })}
    </div>
  );

  // ─── COMMUNITY SCREEN ─────────────────────────────────────────────────────
  const CommunityScreen = () => (
    <div style={{ flex: 1, overflow: 'auto', padding: '0 16px 80px' }}>
      <h1 style={{ fontFamily: fonts.heading, fontSize: 22, fontWeight: 700, color: colors.textDark, marginBottom: 4, paddingTop: 4 }}>Community</h1>
      <p style={{ fontFamily: fonts.body, fontSize: 13, color: colors.textMid, marginBottom: 16 }}>Connect, learn, and make a difference</p>

      {/* Community Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 20 }}>
        {[{ val: '2.4k', label: 'Traders', icon: '👥' }, { val: '847', label: 'Trades Today', icon: '🔄' }, { val: '12.6t', label: 'Waste Saved', icon: '🌍' }].map(s => (
          <div key={s.label} style={{ background: colors.white, borderRadius: 16, padding: '12px 8px', textAlign: 'center', boxShadow: '0 2px 8px rgba(107,58,91,0.06)' }}>
            <p style={{ fontSize: 22, marginBottom: 2 }}>{s.icon}</p>
            <p style={{ fontFamily: fonts.heading, fontSize: 16, fontWeight: 700, color: colors.plum }}>{s.val}</p>
            <p style={{ fontFamily: fonts.body, fontSize: 10, color: colors.textLight }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Events */}
      <h2 style={{ fontFamily: fonts.heading, fontSize: 16, fontWeight: 700, color: colors.textDark, marginBottom: 12 }}>Upcoming Events</h2>
      {events.map(ev => {
        const isJoined = joinedEvents.has(ev.id);
        const catColors = { Trade: '#F6A623', Learn: '#4A90D9', Create: '#E87A8E', Fix: '#52C17A' };
        return (
          <div key={ev.id} style={{ background: colors.white, borderRadius: 20, padding: '14px 16px', marginBottom: 12, boxShadow: '0 2px 12px rgba(107,58,91,0.07)', border: `1px solid ${colors.warmGray}` }}>
            <div style={{ display: 'flex', gap: 12 }}>
              <div style={{ width: 54, height: 54, borderRadius: 16, background: `linear-gradient(135deg, ${catColors[ev.category]}20 0%, ${catColors[ev.category]}40 100%)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, flexShrink: 0 }}>{ev.img}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 3 }}>
                  <h3 style={{ fontFamily: fonts.heading, fontSize: 14, fontWeight: 700, color: colors.textDark, flex: 1, marginRight: 6 }}>{ev.title}</h3>
                  <span style={{ fontFamily: fonts.body, fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 8, background: `${catColors[ev.category]}20`, color: catColors[ev.category], flexShrink: 0 }}>{ev.category}</span>
                </div>
                <p style={{ fontFamily: fonts.body, fontSize: 12, color: colors.textMid, marginBottom: 4 }}>📅 {ev.date} · ⏰ {ev.time}</p>
                <p style={{ fontFamily: fonts.body, fontSize: 12, color: colors.textMid, marginBottom: 8 }}>📍 {ev.location}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div style={{ display: 'flex' }}>
                      {['🧑','👩','👨'].map((a,i) => (
                        <span key={i} style={{ fontSize: 14, marginLeft: i > 0 ? -4 : 0 }}>{a}</span>
                      ))}
                    </div>
                    <span style={{ fontFamily: fonts.body, fontSize: 11, color: colors.textMid }}>{ev.attendees} going</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontFamily: fonts.body, fontSize: 11, fontWeight: 600, color: colors.success }}>{ev.pts}</span>
                    <button onClick={() => { setJoinedEvents(prev => { const n = new Set(prev); n.has(ev.id) ? n.delete(ev.id) : n.add(ev.id); return n; }); if (!isJoined) showNotif(`Joined ${ev.title}! ${ev.pts}`); }} style={{ padding: '6px 14px', borderRadius: 10, border: isJoined ? `1.5px solid ${colors.plum}` : 'none', background: isJoined ? 'transparent' : gradients.plum, fontFamily: fonts.heading, fontSize: 12, fontWeight: 700, color: isJoined ? colors.plum : '#fff', cursor: 'pointer', transition: 'all 0.2s' }}>
                      {isJoined ? 'Joined ✓' : 'Join'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Tips */}
      <h2 style={{ fontFamily: fonts.heading, fontSize: 16, fontWeight: 700, color: colors.textDark, marginBottom: 12, marginTop: 4 }}>Eco Tips</h2>
      {[{ icon: '💡', title: 'Clean before trading', body: 'Always clean items before posting — it helps traders repurpose them faster.' }, { icon: '📦', title: 'Bundle similar items', body: 'Grouping items earns 20% more eco-points and finds matches quicker.' }].map((tip, i) => (
        <div key={i} style={{ background: `linear-gradient(135deg, ${colors.white} 0%, ${i===0?colors.pink:colors.warmGray}30 100%)`, borderRadius: 16, padding: '12px 14px', marginBottom: 10, border: `1px solid ${colors.warmGray2}`, display: 'flex', gap: 10 }}>
          <span style={{ fontSize: 22 }}>{tip.icon}</span>
          <div>
            <p style={{ fontFamily: fonts.heading, fontSize: 13, fontWeight: 700, color: colors.textDark, marginBottom: 3 }}>{tip.title}</p>
            <p style={{ fontFamily: fonts.body, fontSize: 12, color: colors.textMid, lineHeight: 1.5 }}>{tip.body}</p>
          </div>
        </div>
      ))}
    </div>
  );

  // ─── PROFILE SCREEN ───────────────────────────────────────────────────────
  const ProfileScreen = () => (
    <div style={{ flex: 1, overflow: 'auto', padding: '0 0 80px' }}>
      {/* Header */}
      <div style={{ background: gradients.primary, padding: '16px 20px 28px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -30, right: -30, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }}/>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 68, height: 68, borderRadius: 22, background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, border: '2px solid rgba(255,255,255,0.4)' }}>🌿</div>
          <div>
            <h2 style={{ fontFamily: fonts.heading, fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 2 }}>Alex Chen</h2>
            <p style={{ fontFamily: fonts.body, fontSize: 12, color: 'rgba(255,255,255,0.8)' }}>@alexchen · Level 4 Eco Trader</p>
            <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
              <span style={{ fontFamily: fonts.body, fontSize: 10, padding: '2px 8px', borderRadius: 8, background: 'rgba(255,255,255,0.2)', color: '#fff', fontWeight: 600 }}>⭐ 4.9 rating</span>
              <span style={{ fontFamily: fonts.body, fontSize: 10, padding: '2px 8px', borderRadius: 8, background: 'rgba(255,255,255,0.2)', color: '#fff', fontWeight: 600 }}>🔄 47 trades</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div style={{ padding: '0 16px', marginTop: -16, marginBottom: 16 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
          {[{ val: '47', label: 'Trades', icon: '🔄' }, { val: `${ecoPoints.toLocaleString()}`, label: 'Eco-pts', icon: '🌿' }, { val: '14.6kg', label: 'Saved', icon: '♻️' }].map(s => (
            <div key={s.label} style={{ background: colors.white, borderRadius: 16, padding: '12px 8px', textAlign: 'center', boxShadow: '0 4px 14px rgba(107,58,91,0.1)' }}>
              <p style={{ fontSize: 20, marginBottom: 2 }}>{s.icon}</p>
              <p style={{ fontFamily: fonts.heading, fontSize: 15, fontWeight: 700, color: colors.plum }}>{s.val}</p>
              <p style={{ fontFamily: fonts.body, fontSize: 10, color: colors.textLight }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Badges */}
      <div style={{ padding: '0 16px', marginBottom: 16 }}>
        <h3 style={{ fontFamily: fonts.heading, fontSize: 16, fontWeight: 700, color: colors.textDark, marginBottom: 12 }}>Badges</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
          {badges.map(b => (
            <div key={b.id} onClick={() => setActiveBadge(activeBadge === b.id ? null : b.id)} style={{ background: colors.white, borderRadius: 16, padding: '12px 8px', textAlign: 'center', cursor: 'pointer', opacity: b.earned ? 1 : 0.4, border: activeBadge === b.id ? `2px solid ${colors.amber}` : `2px solid transparent`, boxShadow: '0 2px 8px rgba(107,58,91,0.06)', transition: 'all 0.2s' }}>
              <p style={{ fontSize: 26, marginBottom: 4 }}>{b.icon}</p>
              <p style={{ fontFamily: fonts.heading, fontSize: 11, fontWeight: 700, color: colors.textDark, marginBottom: 2 }}>{b.label}</p>
              {activeBadge === b.id && <p style={{ fontFamily: fonts.body, fontSize: 9, color: colors.textMid, lineHeight: 1.3 }}>{b.desc}</p>}
              {!b.earned && !activeBadge && <p style={{ fontFamily: fonts.body, fontSize: 9, color: colors.textLight }}>Locked</p>}
            </div>
          ))}
        </div>
      </div>

      {/* Settings */}
      <div style={{ padding: '0 16px' }}>
        <h3 style={{ fontFamily: fonts.heading, fontSize: 16, fontWeight: 700, color: colors.textDark, marginBottom: 10 }}>Settings</h3>
        {[
          { icon: '🔔', label: 'Notifications', desc: 'Trade alerts & reminders' },
          { icon: '📍', label: 'Location', desc: 'Set trading radius' },
          { icon: '🔒', label: 'Privacy', desc: 'Profile visibility' },
          { icon: '🌱', label: 'Sustainability Goals', desc: 'Monthly targets' },
          { icon: '❓', label: 'Help & Support', desc: 'FAQs and contact' },
        ].map((s, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '13px 0', borderBottom: i < 4 ? `1px solid ${colors.warmGray}` : 'none' }}>
            <div style={{ width: 38, height: 38, borderRadius: 12, background: `${colors.warmGray}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>{s.icon}</div>
            <div style={{ flex: 1 }}>
              <p style={{ fontFamily: fonts.body, fontSize: 14, fontWeight: 600, color: colors.textDark }}>{s.label}</p>
              <p style={{ fontFamily: fonts.body, fontSize: 11, color: colors.textLight }}>{s.desc}</p>
            </div>
            {window.lucide.ChevronRight && <window.lucide.ChevronRight size={16} color={colors.textLight}/>}
          </div>
        ))}
      </div>
    </div>
  );

  const screens = { home: HomeScreen, trade: TradeScreen, points: PointsScreen, community: CommunityScreen, profile: ProfileScreen };
  const ActiveScreen = screens[activeTab];

  return (
    <>
      <style>{fontStyle}</style>
      {/* Page background */}
      <div style={{ minHeight: '100vh', background: 'radial-gradient(ellipse at 30% 20%, #2D1B4E 0%, #1a1a2e 40%, #0d0d1a 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', fontFamily: fonts.body }}>
        {/* Phone frame */}
        <div style={{ width: 375, height: 812, background: colors.bg, borderRadius: 50, boxShadow: '0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.08), inset 0 0 0 1px rgba(255,255,255,0.12)', overflow: 'hidden', display: 'flex', flexDirection: 'column', position: 'relative', flexShrink: 0 }}>
          {/* Notch area */}
          <div style={{ background: colors.bg, flexShrink: 0 }}>
            <DynamicIsland/>
            <StatusBar/>
          </div>

          {/* Screen content */}
          <div key={activeTab} style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', animation: 'fadeIn 0.25s ease' }}>
            <ActiveScreen/>
          </div>

          {/* Modals */}
          <TradeModal/>
          <QRModal/>
          <NotificationToast/>

          {/* Bottom nav */}
          <BottomNav/>
        </div>
      </div>
    </>
  );
}
