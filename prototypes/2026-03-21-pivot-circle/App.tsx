function App() {
  const { useState, useEffect, useRef } = React;

  // ─── Font & Global Styles ─────────────────────────────────
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
      * { box-sizing: border-box; margin: 0; padding: 0; }
      ::-webkit-scrollbar { display: none; }
      body { background: #e8e4f0; }
      @keyframes fadeSlideUp {
        from { opacity: 0; transform: translateY(12px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
      }
      @keyframes ripple {
        from { transform: scale(0.8); opacity: 0.6; }
        to { transform: scale(1.6); opacity: 0; }
      }
      @keyframes slideInRight {
        from { opacity: 0; transform: translateX(20px); }
        to { opacity: 1; transform: translateX(0); }
      }
      @keyframes countDown {
        from { stroke-dashoffset: 0; }
        to { stroke-dashoffset: 126; }
      }
      .fade-slide { animation: fadeSlideUp 0.35s ease forwards; }
      .slide-right { animation: slideInRight 0.3s ease forwards; }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  // ─── Theme System ──────────────────────────────────────────
  const [isDark, setIsDark] = useState(false);

  const themes = {
    light: {
      bg: '#F7F4FB',
      surface: '#FFFFFF',
      surfaceAlt: '#F0EDF8',
      surfaceCard: '#FAFAFE',
      border: '#E8E2F5',
      borderLight: '#F0EBF8',
      primary: '#7C4DFF',
      primaryLight: '#9B71FF',
      primaryDim: 'rgba(124,77,255,0.12)',
      primaryGrad: 'linear-gradient(135deg, #7C4DFF 0%, #B84DFF 100%)',
      coral: '#FF5C6E',
      coralDim: 'rgba(255,92,110,0.12)',
      teal: '#00C9A7',
      tealDim: 'rgba(0,201,167,0.12)',
      amber: '#FFAB4C',
      amberDim: 'rgba(255,171,76,0.12)',
      blue: '#4D8BFF',
      blueDim: 'rgba(77,139,255,0.12)',
      text: '#1A1030',
      textSec: '#6B5E8A',
      textMuted: '#A89CC5',
      shadow: 'rgba(124,77,255,0.10)',
      shadowCard: 'rgba(30,10,60,0.07)',
      navBg: '#FFFFFF',
      statusBar: '#1A1030',
      overlay: 'rgba(10,5,25,0.45)',
      success: '#00C9A7',
      danger: '#FF5C6E',
      pill: '#EDE8F8',
      pillText: '#7C4DFF',
    },
    dark: {
      bg: '#0D0918',
      surface: '#18102A',
      surfaceAlt: '#1F1535',
      surfaceCard: '#221840',
      border: '#2E1F50',
      borderLight: '#261A42',
      primary: '#9B71FF',
      primaryLight: '#B89AFF',
      primaryDim: 'rgba(155,113,255,0.15)',
      primaryGrad: 'linear-gradient(135deg, #9B71FF 0%, #C84DFF 100%)',
      coral: '#FF7080',
      coralDim: 'rgba(255,112,128,0.15)',
      teal: '#2DDDBA',
      tealDim: 'rgba(45,221,186,0.12)',
      amber: '#FFB84C',
      amberDim: 'rgba(255,184,76,0.12)',
      blue: '#6AA3FF',
      blueDim: 'rgba(106,163,255,0.12)',
      text: '#F0EAFF',
      textSec: '#9B8CC5',
      textMuted: '#4D3D72',
      shadow: 'rgba(155,113,255,0.15)',
      shadowCard: 'rgba(0,0,0,0.35)',
      navBg: '#18102A',
      statusBar: '#C5B8E8',
      overlay: 'rgba(0,0,0,0.65)',
      success: '#2DDDBA',
      danger: '#FF7080',
      pill: '#2E1F50',
      pillText: '#B89AFF',
    },
  };

  const C = isDark ? themes.dark : themes.light;

  // ─── App State ─────────────────────────────────────────────
  const [activeTab, setActiveTab] = useState('discover');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [pressedBtn, setPressedBtn] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createStep, setCreateStep] = useState(1);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [selectedEnergy, setSelectedEnergy] = useState(null);
  const [pivotDuration, setPivotDuration] = useState(30);
  const [likedPivots, setLikedPivots] = useState(new Set());
  const [showMatchAlert, setShowMatchAlert] = useState(false);
  const [activeChat, setActiveChat] = useState(null);
  const [chatMsg, setChatMsg] = useState('');
  const [filterTag, setFilterTag] = useState('All');
  const [showProfileDetail, setShowProfileDetail] = useState(null);

  useEffect(() => {
    const t = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(t);
  }, []);

  // ─── Data ──────────────────────────────────────────────────
  const pivots = [
    {
      id: 1,
      name: 'Maya Chen',
      age: 29,
      avatar: '👩🏻',
      activity: 'Coffee chat',
      icon: '☕',
      mood: 'Decompressing',
      distance: '0.3 mi',
      expiresIn: 28,
      tags: ['Post-meeting', 'Calm chat'],
      energy: 'Low',
      energyColor: C.teal,
      verified: true,
      bio: 'UX designer, moved here 4 months ago',
      mutualTags: ['Design', 'Coffee'],
      color: C.teal,
      colorDim: C.tealDim,
      meetZone: 'Blue Bottle Coffee, Market St',
    },
    {
      id: 2,
      name: 'Jordan Park',
      age: 33,
      avatar: '🧑🏽',
      activity: 'Park walk',
      icon: '🌿',
      mood: 'Fresh air needed',
      distance: '0.6 mi',
      expiresIn: 45,
      tags: ['Nature', 'Low-key'],
      energy: 'Medium',
      energyColor: C.amber,
      verified: true,
      bio: 'Remote dev, new to the neighborhood',
      mutualTags: ['Tech', 'Outdoors'],
      color: C.amber,
      colorDim: C.amberDim,
      meetZone: 'Dolores Park, Main Entrance',
    },
    {
      id: 3,
      name: 'Sasha Rivera',
      age: 26,
      avatar: '👩🏾',
      activity: 'Coworking',
      icon: '💻',
      mood: 'Focus mode',
      distance: '0.4 mi',
      expiresIn: 60,
      tags: ['Quiet', 'Work nearby'],
      energy: 'Low',
      energyColor: C.blue,
      verified: false,
      bio: 'Freelance writer + strategist',
      mutualTags: ['Writing', 'Remote work'],
      color: C.blue,
      colorDim: C.blueDim,
      meetZone: 'Sightglass Coffee, 7th St',
    },
    {
      id: 4,
      name: 'Tom Halsey',
      age: 31,
      avatar: '🧑🏼',
      activity: 'Lunch spot',
      icon: '🍜',
      mood: 'Hungry + chatty',
      distance: '0.2 mi',
      expiresIn: 18,
      tags: ['Spontaneous', 'Good convo'],
      energy: 'High',
      energyColor: C.coral,
      verified: true,
      bio: 'Startup founder, loves talking ideas',
      mutualTags: ['Startups', 'Food'],
      color: C.coral,
      colorDim: C.coralDim,
      meetZone: 'Brenda\'s French Soul Food',
    },
    {
      id: 5,
      name: 'Priya Nair',
      age: 34,
      avatar: '👩🏽',
      activity: 'Stroller walk',
      icon: '👶',
      mood: 'Parent mode',
      distance: '0.8 mi',
      expiresIn: 50,
      tags: ['Parents', 'Outdoor'],
      energy: 'Medium',
      energyColor: C.primary,
      verified: true,
      bio: 'New mom, toddler in tow',
      mutualTags: ['Parenting', 'Parks'],
      color: C.primary,
      colorDim: C.primaryDim,
      meetZone: 'Alamo Square Park',
    },
  ];

  const matches = [
    {
      id: 1,
      name: 'Maya Chen',
      avatar: '👩🏻',
      activity: 'Coffee chat',
      icon: '☕',
      time: '14 min ago',
      preview: 'Hey! I\'m heading to Blue Bottle now 😊',
      unread: 2,
      expiry: '22 min left',
      color: C.teal,
      msgs: [
        { from: 'them', text: 'Hey! I\'m heading to Blue Bottle now 😊', time: '2:14 PM' },
        { from: 'them', text: 'Should be there in about 5 min', time: '2:14 PM' },
      ],
    },
    {
      id: 2,
      name: 'Jordan Park',
      avatar: '🧑🏽',
      activity: 'Park walk',
      icon: '🌿',
      time: '32 min ago',
      preview: 'Sounds good! Main entrance at 3pm?',
      unread: 0,
      expiry: '48 min left',
      color: C.amber,
      msgs: [
        { from: 'me', text: 'Hey Jordan! Down for that walk?', time: '1:58 PM' },
        { from: 'them', text: 'Sounds good! Main entrance at 3pm?', time: '2:01 PM' },
      ],
    },
  ];

  const communities = [
    { name: 'Downtown Lunch Crew', members: 6, icon: '🍜', streak: 4, color: C.coral },
    { name: 'Park Walk Regulars', members: 9, icon: '🌿', streak: 7, color: C.teal },
    { name: 'Remote Work Café', members: 12, icon: '💻', streak: 2, color: C.blue },
  ];

  const myPivot = {
    activity: 'Coffee chat',
    icon: '☕',
    expiresIn: 38,
    energy: 'Low',
    tags: ['Decompressing', 'Quick catch-up'],
    meetZone: 'Hayes Valley area',
  };

  const activities = [
    { label: 'Coffee', icon: '☕', color: C.teal },
    { label: 'Walk', icon: '🚶', color: C.amber },
    { label: 'Lunch', icon: '🍜', color: C.coral },
    { label: 'Cowork', icon: '💻', color: C.blue },
    { label: 'Stroll', icon: '🌿', color: C.teal },
    { label: 'Chat', icon: '💬', color: C.primary },
  ];

  const energyLevels = [
    { label: 'Low-key', sub: 'Quiet, chill', icon: '🌙', color: C.blue },
    { label: 'Medium', sub: 'Easy conversation', icon: '☁️', color: C.amber },
    { label: 'Social', sub: 'Lively & fun', icon: '⚡', color: C.coral },
  ];

  const filterTags = ['All', 'Coffee', 'Walk', 'Cowork', 'Lunch', 'Parents'];

  // ─── Helpers ───────────────────────────────────────────────
  const timeStr = () => {
    const h = currentTime.getHours();
    const m = currentTime.getMinutes().toString().padStart(2, '0');
    const ampm = h >= 12 ? 'PM' : 'AM';
    return `${h > 12 ? h - 12 : h || 12}:${m} ${ampm}`;
  };

  const press = (id, cb) => {
    setPressedBtn(id);
    setTimeout(() => { setPressedBtn(null); if (cb) cb(); }, 150);
  };

  const toggleLike = (id) => {
    setLikedPivots(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
    if (!likedPivots.has(id)) {
      setTimeout(() => setShowMatchAlert(true), 600);
      setTimeout(() => setShowMatchAlert(false), 3500);
    }
  };

  const filteredPivots = filterTag === 'All' ? pivots : pivots.filter(p =>
    p.activity.toLowerCase().includes(filterTag.toLowerCase()) ||
    p.tags.some(t => t.toLowerCase().includes(filterTag.toLowerCase()))
  );

  // ─── Status Bar ────────────────────────────────────────────
  const StatusBar = () => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 20px 4px', position: 'relative', zIndex: 10 }}>
      <span style={{ fontSize: 13, fontWeight: 700, color: C.statusBar, fontFamily: 'Plus Jakarta Sans' }}>{timeStr()}</span>
      <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
        {React.createElement(window.lucide.Wifi, { size: 14, color: C.statusBar, strokeWidth: 2.5 })}
        {React.createElement(window.lucide.Signal, { size: 14, color: C.statusBar, strokeWidth: 2.5 })}
        {React.createElement(window.lucide.Battery, { size: 16, color: C.statusBar, strokeWidth: 2.5 })}
      </div>
    </div>
  );

  // ─── Dynamic Island ────────────────────────────────────────
  const DynamicIsland = () => (
    <div style={{ position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)', width: 120, height: 34, background: '#000', borderRadius: 20, zIndex: 20 }} />
  );

  // ─── Bottom Nav ────────────────────────────────────────────
  const BottomNav = () => {
    const tabs = [
      { id: 'discover', label: 'Discover', icon: window.lucide.Compass },
      { id: 'create', label: 'Pivot', icon: window.lucide.PlusCircle, special: true },
      { id: 'matches', label: 'Matches', icon: window.lucide.MessageCircle, badge: 2 },
      { id: 'profile', label: 'Profile', icon: window.lucide.User },
    ];
    return (
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 80,
        background: C.navBg, borderTop: `1px solid ${C.border}`,
        display: 'flex', alignItems: 'center', justifyContent: 'space-around',
        padding: '0 8px 16px', zIndex: 50,
        boxShadow: `0 -4px 24px ${C.shadowCard}`,
      }}>
        {tabs.map(tab => {
          const isActive = activeTab === tab.id;
          const isPressed = pressedBtn === `nav-${tab.id}`;
          if (tab.special) {
            return (
              <button key={tab.id} onClick={() => { press(`nav-${tab.id}`); setShowCreateModal(true); setCreateStep(1); }}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, background: 'none', border: 'none', cursor: 'pointer', transform: isPressed ? 'scale(0.88)' : 'scale(1)', transition: 'transform 0.15s', flex: 1 }}>
                <div style={{
                  width: 52, height: 52, borderRadius: '50%',
                  background: C.primaryGrad,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: `0 6px 20px ${C.shadow}`,
                  marginBottom: -4,
                }}>
                  {React.createElement(tab.icon, { size: 24, color: '#fff', strokeWidth: 2.5 })}
                </div>
                <span style={{ fontSize: 10, fontWeight: 600, color: C.primary, fontFamily: 'Plus Jakarta Sans' }}>{tab.label}</span>
              </button>
            );
          }
          return (
            <button key={tab.id} onClick={() => press(`nav-${tab.id}`, () => setActiveTab(tab.id))}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, background: 'none', border: 'none', cursor: 'pointer', flex: 1, position: 'relative', transform: isPressed ? 'scale(0.88)' : 'scale(1)', transition: 'transform 0.15s' }}>
              <div style={{ position: 'relative' }}>
                {React.createElement(tab.icon, { size: 22, color: isActive ? C.primary : C.textMuted, strokeWidth: isActive ? 2.5 : 2 })}
                {tab.badge && !isActive && (
                  <div style={{ position: 'absolute', top: -3, right: -4, width: 14, height: 14, background: C.coral, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: `2px solid ${C.navBg}` }}>
                    <span style={{ fontSize: 8, color: '#fff', fontWeight: 700 }}>{tab.badge}</span>
                  </div>
                )}
              </div>
              <span style={{ fontSize: 10, fontWeight: isActive ? 700 : 500, color: isActive ? C.primary : C.textMuted, fontFamily: 'Plus Jakarta Sans' }}>{tab.label}</span>
              {isActive && <div style={{ position: 'absolute', bottom: -2, width: 18, height: 3, background: C.primary, borderRadius: 2 }} />}
            </button>
          );
        })}
      </div>
    );
  };

  // ─── Pivot Card ────────────────────────────────────────────
  const PivotCard = ({ pivot, index }) => {
    const isLiked = likedPivots.has(pivot.id);
    const isPressed = pressedBtn === `like-${pivot.id}`;
    const urgent = pivot.expiresIn < 20;

    return (
      <div className="fade-slide" style={{
        background: C.surface, borderRadius: 20, padding: '16px',
        boxShadow: `0 2px 16px ${C.shadowCard}`, border: `1px solid ${C.border}`,
        marginBottom: 12, animationDelay: `${index * 0.06}s`,
        cursor: 'pointer',
      }} onClick={() => setShowProfileDetail(pivot)}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 12 }}>
          <div style={{ position: 'relative' }}>
            <div style={{ width: 48, height: 48, borderRadius: 16, background: pivot.colorDim, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>
              {pivot.avatar}
            </div>
            {pivot.verified && (
              <div style={{ position: 'absolute', bottom: -2, right: -2, width: 16, height: 16, background: C.success, borderRadius: '50%', border: `2px solid ${C.surface}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {React.createElement(window.lucide.Check, { size: 8, color: '#fff', strokeWidth: 3 })}
              </div>
            )}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
              <span style={{ fontSize: 15, fontWeight: 700, color: C.text, fontFamily: 'Plus Jakarta Sans' }}>{pivot.name}</span>
              <span style={{ fontSize: 12, color: C.textMuted, fontWeight: 500 }}>{pivot.age}</span>
            </div>
            <span style={{ fontSize: 12, color: C.textSec, fontFamily: 'Plus Jakarta Sans' }}>{pivot.bio}</span>
          </div>
          {/* Expiry badge */}
          <div style={{
            background: urgent ? C.coralDim : C.primaryDim,
            borderRadius: 10, padding: '4px 8px', display: 'flex', flexDirection: 'column', alignItems: 'center',
          }}>
            <span style={{ fontSize: 14, fontWeight: 800, color: urgent ? C.coral : C.primary, fontFamily: 'Plus Jakarta Sans', lineHeight: 1 }}>{pivot.expiresIn}</span>
            <span style={{ fontSize: 9, color: urgent ? C.coral : C.primary, fontWeight: 600, opacity: 0.8 }}>min</span>
          </div>
        </div>

        {/* Activity Banner */}
        <div style={{ background: pivot.colorDim, borderRadius: 14, padding: '10px 14px', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 22 }}>{pivot.icon}</span>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: pivot.color, fontFamily: 'Plus Jakarta Sans' }}>{pivot.activity}</div>
            <div style={{ fontSize: 12, color: C.textSec }}>{pivot.mood}</div>
          </div>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 4, background: C.surface, borderRadius: 10, padding: '4px 8px' }}>
            {React.createElement(window.lucide.MapPin, { size: 11, color: C.textMuted, strokeWidth: 2.5 })}
            <span style={{ fontSize: 11, color: C.textMuted, fontWeight: 600 }}>{pivot.distance}</span>
          </div>
        </div>

        {/* Tags */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
          {pivot.tags.map(tag => (
            <span key={tag} style={{ fontSize: 11, fontWeight: 600, color: C.pillText, background: C.pill, borderRadius: 8, padding: '3px 8px', fontFamily: 'Plus Jakarta Sans' }}>
              {tag}
            </span>
          ))}
          <span style={{ fontSize: 11, fontWeight: 600, color: C.textMuted, background: C.surfaceAlt, borderRadius: 8, padding: '3px 8px' }}>
            ⚡ {pivot.energy} energy
          </span>
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 5 }}>
            {React.createElement(window.lucide.MapPin, { size: 12, color: C.textMuted, strokeWidth: 2 })}
            <span style={{ fontSize: 11, color: C.textMuted, fontFamily: 'Plus Jakarta Sans', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{pivot.meetZone}</span>
          </div>
          <button onClick={(e) => { e.stopPropagation(); press(`like-${pivot.id}`, () => toggleLike(pivot.id)); }}
            style={{
              width: 38, height: 38, borderRadius: 12, border: `1.5px solid ${isLiked ? C.coral : C.border}`,
              background: isLiked ? C.coralDim : C.surface, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transform: isPressed ? 'scale(0.85)' : 'scale(1)', transition: 'all 0.15s',
            }}>
            {React.createElement(window.lucide.Heart, { size: 16, color: isLiked ? C.coral : C.textMuted, fill: isLiked ? C.coral : 'none', strokeWidth: 2 })}
          </button>
          <button onClick={(e) => { e.stopPropagation(); press(`connect-${pivot.id}`, () => { setActiveChat(matches[0]); setActiveTab('matches'); }); }}
            style={{
              height: 38, borderRadius: 12, border: 'none',
              background: pivot.colorDim, cursor: 'pointer', padding: '0 14px',
              display: 'flex', alignItems: 'center', gap: 6,
              transform: pressedBtn === `connect-${pivot.id}` ? 'scale(0.93)' : 'scale(1)', transition: 'transform 0.15s',
            }}>
            {React.createElement(window.lucide.Zap, { size: 14, color: pivot.color, strokeWidth: 2.5 })}
            <span style={{ fontSize: 12, fontWeight: 700, color: pivot.color, fontFamily: 'Plus Jakarta Sans' }}>Connect</span>
          </button>
        </div>
      </div>
    );
  };

  // ─── Match Alert ───────────────────────────────────────────
  const MatchAlert = () => showMatchAlert ? (
    <div style={{
      position: 'absolute', top: 70, left: 16, right: 16, zIndex: 200,
      background: C.primaryGrad, borderRadius: 16, padding: '12px 16px',
      display: 'flex', alignItems: 'center', gap: 10,
      boxShadow: `0 8px 32px ${C.shadow}`,
      animation: 'fadeSlideUp 0.35s ease',
    }}>
      <span style={{ fontSize: 24 }}>✨</span>
      <div>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', fontFamily: 'Plus Jakarta Sans' }}>It's a Pivot Match!</div>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.8)' }}>They're interested too — say hi!</div>
      </div>
      {React.createElement(window.lucide.ChevronRight, { size: 18, color: 'rgba(255,255,255,0.7)' })}
    </div>
  ) : null;

  // ─── SCREEN: Discover ─────────────────────────────────────
  const DiscoverScreen = () => (
    <div style={{ flex: 1, overflowY: 'auto', padding: '0 16px 16px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '8px 0 16px' }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, color: C.textMuted, letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 4 }}>Near you now</div>
          <div style={{ fontSize: 24, fontWeight: 800, color: C.text, fontFamily: 'Plus Jakarta Sans', lineHeight: 1.1 }}>5 Pivots<br />
            <span style={{ fontSize: 16, fontWeight: 500, color: C.textSec }}>within 1 mile</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => press('map-btn')} style={{
            width: 40, height: 40, borderRadius: 12, border: `1.5px solid ${C.border}`,
            background: C.surface, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            transform: pressedBtn === 'map-btn' ? 'scale(0.88)' : 'scale(1)', transition: 'transform 0.15s',
          }}>
            {React.createElement(window.lucide.Map, { size: 18, color: C.textSec, strokeWidth: 2 })}
          </button>
          <button onClick={() => press('filter-btn')} style={{
            width: 40, height: 40, borderRadius: 12, border: `1.5px solid ${C.border}`,
            background: C.surface, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            transform: pressedBtn === 'filter-btn' ? 'scale(0.88)' : 'scale(1)', transition: 'transform 0.15s',
          }}>
            {React.createElement(window.lucide.SlidersHorizontal, { size: 18, color: C.textSec, strokeWidth: 2 })}
          </button>
        </div>
      </div>

      {/* My Active Pivot Banner */}
      <div style={{
        background: C.primaryGrad, borderRadius: 18, padding: '14px 16px', marginBottom: 16,
        display: 'flex', alignItems: 'center', gap: 12,
      }}>
        <div style={{ width: 44, height: 44, borderRadius: 14, background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>
          {myPivot.icon}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', fontFamily: 'Plus Jakarta Sans' }}>Your Pivot is Active</div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.75)' }}>{myPivot.activity} · {myPivot.expiresIn} min left</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'rgba(255,255,255,0.2)', borderRadius: 10, padding: '5px 10px' }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#fff', animation: 'pulse 1.5s infinite' }} />
          <span style={{ fontSize: 11, color: '#fff', fontWeight: 700 }}>LIVE</span>
        </div>
      </div>

      {/* Filter Pills */}
      <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 2, marginBottom: 14 }}>
        {filterTags.map(tag => (
          <button key={tag} onClick={() => setFilterTag(tag)} style={{
            whiteSpace: 'nowrap', padding: '7px 14px', borderRadius: 12,
            border: `1.5px solid ${filterTag === tag ? C.primary : C.border}`,
            background: filterTag === tag ? C.primaryDim : C.surface,
            color: filterTag === tag ? C.primary : C.textSec,
            fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'Plus Jakarta Sans',
            transition: 'all 0.2s',
          }}>
            {tag}
          </button>
        ))}
      </div>

      {/* Pivot Cards */}
      {filteredPivots.map((pivot, i) => <PivotCard key={pivot.id} pivot={pivot} index={i} />)}

      <MatchAlert />
    </div>
  );

  // ─── SCREEN: Create Pivot ──────────────────────────────────
  const CreateModal = () => {
    if (!showCreateModal) return null;
    return (
      <div style={{
        position: 'absolute', inset: 0, background: C.overlay, zIndex: 150,
        display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
        animation: 'fadeSlideUp 0.25s ease',
      }} onClick={(e) => { if (e.target === e.currentTarget) setShowCreateModal(false); }}>
        <div style={{
          background: C.surface, borderRadius: '24px 24px 0 0',
          padding: '20px 20px 40px', maxHeight: '78%', overflowY: 'auto',
        }}>
          {/* Handle */}
          <div style={{ width: 40, height: 4, background: C.border, borderRadius: 2, margin: '0 auto 20px' }} />

          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <div>
              <div style={{ fontSize: 11, color: C.textMuted, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>Step {createStep} of 3</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: C.text, fontFamily: 'Plus Jakarta Sans' }}>
                {createStep === 1 ? 'What are you up for?' : createStep === 2 ? 'Your social energy?' : 'Set your window'}
              </div>
            </div>
            <button onClick={() => setShowCreateModal(false)} style={{ width: 36, height: 36, borderRadius: 12, border: `1.5px solid ${C.border}`, background: C.surfaceAlt, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {React.createElement(window.lucide.X, { size: 16, color: C.textSec, strokeWidth: 2.5 })}
            </button>
          </div>

          {/* Progress */}
          <div style={{ display: 'flex', gap: 4, marginBottom: 24 }}>
            {[1, 2, 3].map(s => (
              <div key={s} style={{ flex: 1, height: 4, borderRadius: 2, background: s <= createStep ? C.primary : C.border, transition: 'background 0.3s' }} />
            ))}
          </div>

          {/* Step 1: Activity */}
          {createStep === 1 && (
            <div className="fade-slide">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {activities.map(act => (
                  <button key={act.label} onClick={() => setSelectedActivity(act.label)} style={{
                    padding: '16px', borderRadius: 16,
                    border: `2px solid ${selectedActivity === act.label ? act.color : C.border}`,
                    background: selectedActivity === act.label ? act.color + '20' : C.surfaceAlt,
                    cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10,
                    transition: 'all 0.2s',
                  }}>
                    <span style={{ fontSize: 24 }}>{act.icon}</span>
                    <span style={{ fontSize: 14, fontWeight: 700, color: selectedActivity === act.label ? act.color : C.textSec, fontFamily: 'Plus Jakarta Sans' }}>{act.label}</span>
                    {selectedActivity === act.label && React.createElement(window.lucide.CheckCircle2, { size: 16, color: act.color, style: { marginLeft: 'auto' }, strokeWidth: 2.5 })}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Energy */}
          {createStep === 2 && (
            <div className="fade-slide" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {energyLevels.map(e => (
                <button key={e.label} onClick={() => setSelectedEnergy(e.label)} style={{
                  padding: '16px 18px', borderRadius: 16,
                  border: `2px solid ${selectedEnergy === e.label ? e.color : C.border}`,
                  background: selectedEnergy === e.label ? e.color + '15' : C.surfaceAlt,
                  cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 14,
                  transition: 'all 0.2s',
                }}>
                  <span style={{ fontSize: 28 }}>{e.icon}</span>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontSize: 15, fontWeight: 700, color: selectedEnergy === e.label ? e.color : C.text, fontFamily: 'Plus Jakarta Sans' }}>{e.label}</div>
                    <div style={{ fontSize: 12, color: C.textMuted }}>{e.sub}</div>
                  </div>
                  {selectedEnergy === e.label && React.createElement(window.lucide.CheckCircle2, { size: 18, color: e.color, style: { marginLeft: 'auto' }, strokeWidth: 2.5 })}
                </button>
              ))}
            </div>
          )}

          {/* Step 3: Duration */}
          {createStep === 3 && (
            <div className="fade-slide">
              <div style={{ textAlign: 'center', marginBottom: 24 }}>
                <div style={{ fontSize: 56, fontWeight: 800, color: C.primary, fontFamily: 'Plus Jakarta Sans', lineHeight: 1 }}>{pivotDuration}</div>
                <div style={{ fontSize: 15, color: C.textSec, marginTop: 4 }}>minutes available</div>
              </div>
              <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 20 }}>
                {[15, 30, 45, 60, 90].map(d => (
                  <button key={d} onClick={() => setPivotDuration(d)} style={{
                    width: 52, height: 52, borderRadius: 14, border: `2px solid ${pivotDuration === d ? C.primary : C.border}`,
                    background: pivotDuration === d ? C.primaryDim : C.surfaceAlt,
                    color: pivotDuration === d ? C.primary : C.textSec,
                    fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'Plus Jakarta Sans',
                    transition: 'all 0.2s',
                  }}>{d}</button>
                ))}
              </div>

              <div style={{ background: C.surfaceAlt, borderRadius: 16, padding: '14px 16px', marginBottom: 4 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: C.textMuted, marginBottom: 10 }}>Your Pivot Summary</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {[
                    { label: 'Activity', val: selectedActivity || 'Coffee', icon: '☕' },
                    { label: 'Energy', val: selectedEnergy || 'Low-key', icon: '🌙' },
                    { label: 'Duration', val: `${pivotDuration} min`, icon: '⏱' },
                    { label: 'Meet Zone', val: 'Near you (auto)', icon: '📍' },
                  ].map(row => (
                    <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: 13, color: C.textSec }}>{row.icon} {row.label}</span>
                      <span style={{ fontSize: 13, fontWeight: 700, color: C.text, fontFamily: 'Plus Jakarta Sans' }}>{row.val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
            {createStep > 1 && (
              <button onClick={() => setCreateStep(s => s - 1)} style={{
                flex: 1, height: 50, borderRadius: 16, border: `1.5px solid ${C.border}`,
                background: C.surfaceAlt, color: C.textSec, fontSize: 14, fontWeight: 700,
                cursor: 'pointer', fontFamily: 'Plus Jakarta Sans',
              }}>Back</button>
            )}
            <button onClick={() => {
              press('create-next', () => {
                if (createStep < 3) { setCreateStep(s => s + 1); }
                else { setShowCreateModal(false); setCreateStep(1); setActiveTab('discover'); }
              });
            }} style={{
              flex: 3, height: 50, borderRadius: 16, border: 'none',
              background: C.primaryGrad, color: '#fff', fontSize: 15, fontWeight: 700,
              cursor: 'pointer', fontFamily: 'Plus Jakarta Sans',
              transform: pressedBtn === 'create-next' ? 'scale(0.97)' : 'scale(1)',
              transition: 'transform 0.15s',
              boxShadow: `0 6px 20px ${C.shadow}`,
            }}>
              {createStep === 3 ? '🚀 Post Pivot' : 'Continue'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  // ─── SCREEN: Matches ───────────────────────────────────────
  const MatchesScreen = () => {
    if (activeChat) {
      const chat = activeChat;
      return (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {/* Chat Header */}
          <div style={{ padding: '8px 16px 12px', display: 'flex', alignItems: 'center', gap: 12, borderBottom: `1px solid ${C.border}` }}>
            <button onClick={() => setActiveChat(null)} style={{ width: 36, height: 36, borderRadius: 12, border: `1.5px solid ${C.border}`, background: C.surfaceAlt, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {React.createElement(window.lucide.ChevronLeft, { size: 18, color: C.textSec, strokeWidth: 2.5 })}
            </button>
            <div style={{ fontSize: 24 }}>{chat.avatar}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: C.text, fontFamily: 'Plus Jakarta Sans' }}>{chat.name}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: 11 }}>{chat.icon}</span>
                <span style={{ fontSize: 11, color: C.textMuted }}>{chat.activity}</span>
                <span style={{ fontSize: 11, color: C.coral, fontWeight: 600 }}>· {chat.expiry}</span>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: C.tealDim, borderRadius: 10, padding: '5px 10px' }}>
              {React.createElement(window.lucide.Shield, { size: 12, color: C.teal, strokeWidth: 2.5 })}
              <span style={{ fontSize: 10, color: C.teal, fontWeight: 700 }}>Safe Zone</span>
            </div>
          </div>

          {/* Meet Zone Banner */}
          <div style={{ background: C.primaryDim, padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
            {React.createElement(window.lucide.MapPin, { size: 13, color: C.primary, strokeWidth: 2.5 })}
            <span style={{ fontSize: 12, color: C.primary, fontWeight: 600 }}>Meet at: Blue Bottle Coffee, Market St</span>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {chat.msgs.map((msg, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: msg.from === 'me' ? 'flex-end' : 'flex-start' }}>
                <div style={{
                  maxWidth: '72%', padding: '10px 14px', borderRadius: msg.from === 'me' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                  background: msg.from === 'me' ? C.primaryGrad : C.surfaceAlt,
                }}>
                  <div style={{ fontSize: 14, color: msg.from === 'me' ? '#fff' : C.text, fontFamily: 'Plus Jakarta Sans', lineHeight: 1.4 }}>{msg.text}</div>
                  <div style={{ fontSize: 10, color: msg.from === 'me' ? 'rgba(255,255,255,0.6)' : C.textMuted, marginTop: 4, textAlign: 'right' }}>{msg.time}</div>
                </div>
              </div>
            ))}
            <div style={{ textAlign: 'center', padding: '8px 0' }}>
              <span style={{ fontSize: 11, color: C.textMuted, background: C.surfaceAlt, borderRadius: 8, padding: '4px 10px' }}>Chat auto-expires when pivot ends</span>
            </div>
          </div>

          {/* Input */}
          <div style={{ padding: '12px 16px', borderTop: `1px solid ${C.border}`, display: 'flex', gap: 8 }}>
            <input
              type="text" value={chatMsg} onChange={e => setChatMsg(e.target.value)}
              placeholder="Type a message..."
              style={{
                flex: 1, height: 44, borderRadius: 14, border: `1.5px solid ${C.border}`,
                background: C.surfaceAlt, color: C.text, fontSize: 14, padding: '0 14px',
                outline: 'none', fontFamily: 'Plus Jakarta Sans',
              }}
            />
            <button onClick={() => { if (chatMsg.trim()) { press('send', () => setChatMsg('')); } }} style={{
              width: 44, height: 44, borderRadius: 14, border: 'none',
              background: C.primaryGrad, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              transform: pressedBtn === 'send' ? 'scale(0.88)' : 'scale(1)', transition: 'transform 0.15s',
              boxShadow: `0 4px 16px ${C.shadow}`,
            }}>
              {React.createElement(window.lucide.Send, { size: 18, color: '#fff', strokeWidth: 2.5 })}
            </button>
          </div>
        </div>
      );
    }

    return (
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 16px 16px' }}>
        <div style={{ padding: '8px 0 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: 22, fontWeight: 800, color: C.text, fontFamily: 'Plus Jakarta Sans' }}>Your Matches</div>
          <div style={{ background: C.primaryDim, borderRadius: 10, padding: '4px 10px' }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: C.primary }}>{matches.length} active</span>
          </div>
        </div>

        {/* Active chats */}
        {matches.map((m, i) => (
          <div key={m.id} className="fade-slide" onClick={() => setActiveChat(m)} style={{
            background: C.surface, borderRadius: 18, padding: '14px', marginBottom: 10,
            border: `1px solid ${C.border}`, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12,
            animationDelay: `${i * 0.08}s`, boxShadow: `0 2px 12px ${C.shadowCard}`,
          }}>
            <div style={{ position: 'relative' }}>
              <div style={{ width: 48, height: 48, borderRadius: 16, background: m.color + '25', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>{m.avatar}</div>
              {m.unread > 0 && (
                <div style={{ position: 'absolute', top: -3, right: -3, width: 18, height: 18, background: C.coral, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: `2px solid ${C.surface}` }}>
                  <span style={{ fontSize: 9, color: '#fff', fontWeight: 800 }}>{m.unread}</span>
                </div>
              )}
            </div>
            <div style={{ flex: 1, overflow: 'hidden' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: C.text, fontFamily: 'Plus Jakarta Sans' }}>{m.name}</span>
                <span style={{ fontSize: 11, color: C.textMuted }}>{m.time}</span>
              </div>
              <div style={{ fontSize: 12, color: C.textSec, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginBottom: 4 }}>{m.preview}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: 12 }}>{m.icon}</span>
                <span style={{ fontSize: 11, color: m.color, fontWeight: 600 }}>{m.activity}</span>
                <span style={{ fontSize: 11, color: C.textMuted }}>·</span>
                <span style={{ fontSize: 11, color: C.coral, fontWeight: 600 }}>{m.expiry}</span>
              </div>
            </div>
            {React.createElement(window.lucide.ChevronRight, { size: 16, color: C.textMuted })}
          </div>
        ))}

        {/* Communities */}
        <div style={{ marginTop: 24 }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: C.text, fontFamily: 'Plus Jakarta Sans', marginBottom: 12 }}>Micro-Communities</div>
          <div style={{ fontSize: 12, color: C.textSec, marginBottom: 14 }}>Grown from your repeated pivots</div>
          {communities.map((c, i) => (
            <div key={c.name} className="fade-slide" style={{
              background: C.surface, borderRadius: 16, padding: '14px', marginBottom: 10,
              border: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', gap: 12,
              animationDelay: `${i * 0.1 + 0.2}s`,
            }}>
              <div style={{ width: 44, height: 44, borderRadius: 14, background: c.color + '20', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>{c.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: C.text, fontFamily: 'Plus Jakarta Sans', marginBottom: 2 }}>{c.name}</div>
                <div style={{ fontSize: 11, color: C.textMuted }}>{c.members} members</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, background: c.color + '20', borderRadius: 10, padding: '5px 10px' }}>
                <span style={{ fontSize: 12 }}>🔥</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: c.color }}>{c.streak}x</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ─── SCREEN: Profile ───────────────────────────────────────
  const ProfileScreen = () => {
    const stats = [
      { label: 'Pivots', val: '24', icon: '⚡' },
      { label: 'Connections', val: '11', icon: '🤝' },
      { label: 'Communities', val: '3', icon: '👥' },
    ];

    const recentActivity = [
      { text: 'Coffee with Maya', icon: '☕', time: 'Today', color: C.teal },
      { text: 'Park walk with Jordan', icon: '🌿', time: 'Yesterday', color: C.amber },
      { text: 'Joined Remote Work Café', icon: '💻', time: '3 days ago', color: C.blue },
    ];

    return (
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 16px 16px' }}>
        {/* Profile Header */}
        <div style={{ padding: '12px 0 20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: C.text, fontFamily: 'Plus Jakarta Sans' }}>My Profile</div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => setIsDark(d => !d)} style={{
                width: 40, height: 40, borderRadius: 12, border: `1.5px solid ${C.border}`,
                background: C.surfaceAlt, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {isDark
                  ? React.createElement(window.lucide.Sun, { size: 18, color: C.amber, strokeWidth: 2 })
                  : React.createElement(window.lucide.Moon, { size: 18, color: C.primary, strokeWidth: 2 })
                }
              </button>
              <button onClick={() => press('settings-btn')} style={{
                width: 40, height: 40, borderRadius: 12, border: `1.5px solid ${C.border}`,
                background: C.surfaceAlt, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                transform: pressedBtn === 'settings-btn' ? 'scale(0.88)' : 'scale(1)', transition: 'transform 0.15s',
              }}>
                {React.createElement(window.lucide.Settings, { size: 18, color: C.textSec, strokeWidth: 2 })}
              </button>
            </div>
          </div>

          {/* Avatar & Bio */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
            <div style={{ position: 'relative' }}>
              <div style={{
                width: 72, height: 72, borderRadius: 22, background: C.primaryGrad,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36,
              }}>👤</div>
              <div style={{ position: 'absolute', bottom: -2, right: -2, width: 20, height: 20, background: C.success, borderRadius: '50%', border: `2px solid ${C.bg}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {React.createElement(window.lucide.Check, { size: 10, color: '#fff', strokeWidth: 3 })}
              </div>
            </div>
            <div>
              <div style={{ fontSize: 20, fontWeight: 800, color: C.text, fontFamily: 'Plus Jakarta Sans' }}>Alex Kim</div>
              <div style={{ fontSize: 13, color: C.textSec }}>Product designer · SF, CA</div>
              <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
                {['Design', 'Coffee', 'Walks'].map(t => (
                  <span key={t} style={{ fontSize: 10, fontWeight: 600, color: C.pillText, background: C.pill, borderRadius: 6, padding: '3px 8px', fontFamily: 'Plus Jakarta Sans' }}>{t}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
            {stats.map(s => (
              <div key={s.label} style={{ flex: 1, background: C.surface, borderRadius: 14, padding: '12px 8px', textAlign: 'center', border: `1px solid ${C.border}` }}>
                <div style={{ fontSize: 20, marginBottom: 2 }}>{s.icon}</div>
                <div style={{ fontSize: 18, fontWeight: 800, color: C.text, fontFamily: 'Plus Jakarta Sans' }}>{s.val}</div>
                <div style={{ fontSize: 11, color: C.textMuted }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: C.text, fontFamily: 'Plus Jakarta Sans', marginBottom: 12 }}>Recent Activity</div>
          {recentActivity.map((a, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', background: C.surface, borderRadius: 14, marginBottom: 8, border: `1px solid ${C.border}` }}>
              <div style={{ width: 36, height: 36, borderRadius: 12, background: a.color + '20', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>{a.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: C.text, fontFamily: 'Plus Jakarta Sans' }}>{a.text}</div>
                <div style={{ fontSize: 11, color: C.textMuted }}>{a.time}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Settings Options */}
        <div style={{ background: C.surface, borderRadius: 18, overflow: 'hidden', border: `1px solid ${C.border}`, marginBottom: 12 }}>
          {[
            { icon: window.lucide.Shield, label: 'Safety & Verification', color: C.teal },
            { icon: window.lucide.Bell, label: 'Notifications', color: C.amber },
            { icon: window.lucide.MapPin, label: 'Location Preferences', color: C.coral },
            { icon: window.lucide.Users, label: 'Community Settings', color: C.primary },
          ].map((item, i) => (
            <div key={item.label} style={{
              display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px',
              borderBottom: i < 3 ? `1px solid ${C.border}` : 'none', cursor: 'pointer',
            }}>
              <div style={{ width: 36, height: 36, borderRadius: 12, background: item.color + '20', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {React.createElement(item.icon, { size: 16, color: item.color, strokeWidth: 2 })}
              </div>
              <span style={{ flex: 1, fontSize: 14, fontWeight: 500, color: C.text, fontFamily: 'Plus Jakarta Sans' }}>{item.label}</span>
              {React.createElement(window.lucide.ChevronRight, { size: 16, color: C.textMuted })}
            </div>
          ))}
        </div>

        {/* Theme label */}
        <div style={{ textAlign: 'center', padding: '8px 0' }}>
          <span style={{ fontSize: 11, color: C.textMuted }}>Tap the {isDark ? '☀️' : '🌙'} above to switch to {isDark ? 'light' : 'dark'} mode</span>
        </div>
      </div>
    );
  };

  // ─── Profile Detail Modal ──────────────────────────────────
  const ProfileDetailModal = () => {
    if (!showProfileDetail) return null;
    const p = showProfileDetail;
    return (
      <div style={{
        position: 'absolute', inset: 0, background: C.overlay, zIndex: 150,
        display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
        animation: 'fadeSlideUp 0.25s ease',
      }} onClick={(e) => { if (e.target === e.currentTarget) setShowProfileDetail(null); }}>
        <div style={{ background: C.surface, borderRadius: '24px 24px 0 0', padding: '20px 20px 40px', maxHeight: '75%', overflowY: 'auto' }}>
          <div style={{ width: 40, height: 4, background: C.border, borderRadius: 2, margin: '0 auto 20px' }} />

          {/* Avatar */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
            <div style={{ position: 'relative' }}>
              <div style={{ width: 80, height: 80, borderRadius: 24, background: p.colorDim, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 44 }}>{p.avatar}</div>
              {p.verified && (
                <div style={{ position: 'absolute', bottom: -4, right: -4, width: 24, height: 24, background: C.success, borderRadius: '50%', border: `3px solid ${C.surface}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {React.createElement(window.lucide.Check, { size: 11, color: '#fff', strokeWidth: 3 })}
                </div>
              )}
            </div>
          </div>

          <div style={{ textAlign: 'center', marginBottom: 20 }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: C.text, fontFamily: 'Plus Jakarta Sans' }}>{p.name}, {p.age}</div>
            <div style={{ fontSize: 14, color: C.textSec, marginTop: 4 }}>{p.bio}</div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 8 }}>
              {p.mutualTags.map(t => (
                <span key={t} style={{ fontSize: 11, fontWeight: 600, color: C.pillText, background: C.pill, borderRadius: 8, padding: '4px 10px' }}>{t}</span>
              ))}
            </div>
          </div>

          {/* Pivot Info */}
          <div style={{ background: p.colorDim, borderRadius: 16, padding: '14px 16px', marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <span style={{ fontSize: 22 }}>{p.icon}</span>
              <div style={{ fontSize: 16, fontWeight: 700, color: p.color }}>{p.activity}</div>
            </div>
            {[
              { label: 'Mood', val: p.mood },
              { label: 'Energy', val: `${p.energy} energy` },
              { label: 'Distance', val: p.distance },
              { label: 'Expires in', val: `${p.expiresIn} min` },
              { label: 'Meet Zone', val: p.meetZone },
            ].map(row => (
              <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontSize: 13, color: C.textSec }}>{row.label}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{row.val}</span>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={() => setShowProfileDetail(null)} style={{
              flex: 1, height: 50, borderRadius: 16, border: `1.5px solid ${C.border}`,
              background: C.surfaceAlt, color: C.textSec, fontSize: 14, fontWeight: 700,
              cursor: 'pointer', fontFamily: 'Plus Jakarta Sans',
            }}>Not now</button>
            <button onClick={() => { press('connect-modal', () => { setShowProfileDetail(null); setActiveChat(matches[0]); setActiveTab('matches'); }); }} style={{
              flex: 2, height: 50, borderRadius: 16, border: 'none',
              background: C.primaryGrad, color: '#fff', fontSize: 15, fontWeight: 700,
              cursor: 'pointer', fontFamily: 'Plus Jakarta Sans',
              boxShadow: `0 6px 20px ${C.shadow}`,
              transform: pressedBtn === 'connect-modal' ? 'scale(0.97)' : 'scale(1)', transition: 'transform 0.15s',
            }}>⚡ Send Pivot Request</button>
          </div>
        </div>
      </div>
    );
  };

  // ─── Render ────────────────────────────────────────────────
  const renderScreen = () => {
    switch (activeTab) {
      case 'discover': return <DiscoverScreen />;
      case 'matches': return <MatchesScreen />;
      case 'profile': return <ProfileScreen />;
      default: return <DiscoverScreen />;
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: isDark ? '#150E22' : '#e8e4f0', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
      {/* Phone Frame */}
      <div style={{
        width: 375, height: 812, borderRadius: 52, overflow: 'hidden', position: 'relative',
        background: C.bg, display: 'flex', flexDirection: 'column',
        boxShadow: `0 40px 100px rgba(0,0,0,0.3), 0 0 0 1.5px ${isDark ? '#2a1f45' : '#d4c8f0'}, inset 0 0 0 1px ${isDark ? '#1a1030' : '#ede6ff'}`,
      }}>
        <DynamicIsland />

        {/* Status Bar */}
        <StatusBar />

        {/* Screen Content */}
        <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          {renderScreen()}
        </div>

        {/* Bottom Nav */}
        <BottomNav />

        {/* Modals */}
        <CreateModal />
        <ProfileDetailModal />
      </div>
    </div>
  );
}
