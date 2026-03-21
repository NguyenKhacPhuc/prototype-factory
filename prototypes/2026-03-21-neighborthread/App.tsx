function App() {
  const { useState, useEffect, useRef } = React;

  // Load Google Fonts
  const fontStyle = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Nunito:wght@400;600;700;800&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    ::-webkit-scrollbar { display: none; }
    body { background: #050D1A; }
  `;

  const [activeTab, setActiveTab] = useState('feed');
  const [activeRequest, setActiveRequest] = useState(null);
  const [showPostModal, setShowPostModal] = useState(false);
  const [pressedBtn, setPressedBtn] = useState(null);
  const [likedItems, setLikedItems] = useState({});
  const [newPostStep, setNewPostStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [postText, setPostText] = useState('');
  const [selectedRadius, setSelectedRadius] = useState('500m');
  const [notifications, setNotifications] = useState(2);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [filterCategory, setFilterCategory] = useState('All');

  const colors = {
    bg: '#080F1E',
    card: '#0E1929',
    cardBorder: '#162035',
    primary: '#3ECFB2',
    primaryDark: '#2BA88F',
    secondary: '#F5A623',
    accent: '#7C6AF0',
    danger: '#EF5E6A',
    text: '#EEF2FF',
    textMuted: '#7A8BA8',
    textDim: '#4A5A72',
    surface: '#111D30',
    surfaceHover: '#162035',
    green: '#34D399',
    blue: '#60A5FA',
    purple: '#A78BFA',
    pink: '#F472B6',
    orange: '#FB923C',
  };

  const requests = [
    {
      id: 1,
      user: 'Maya K.',
      avatar: '👩‍💼',
      time: '8 min ago',
      category: 'Tools',
      categoryColor: colors.blue,
      icon: '🔧',
      title: 'Anyone have a drill I can borrow?',
      body: 'Need to mount a curtain rod in my apartment. Will only take 20 mins!',
      radius: '3rd floor, Apt 12',
      replies: 3,
      distance: '200ft away',
      urgent: false,
      badge: 'Trusted Neighbor',
      badgeColor: colors.green,
      expires: '2h left',
    },
    {
      id: 2,
      user: 'James T.',
      avatar: '👨‍🍳',
      time: '22 min ago',
      category: 'Childcare',
      categoryColor: colors.pink,
      icon: '👶',
      title: 'Last-minute babysitter rec needed',
      body: 'Work emergency came up. Anyone know a reliable sitter in the building or nearby? Ages 4 & 7.',
      radius: '0.3 miles',
      replies: 7,
      distance: '1 block',
      urgent: true,
      badge: 'Super Helper',
      badgeColor: colors.secondary,
      expires: '45min left',
    },
    {
      id: 3,
      user: 'Priya N.',
      avatar: '👩‍🔬',
      time: '1h ago',
      category: 'Info',
      categoryColor: colors.primary,
      icon: '🏪',
      title: 'Which grocery store is open past midnight?',
      body: 'Just moved to the area last week. Need to grab stuff late tonight — Google maps info seems outdated.',
      radius: '0.5 miles',
      replies: 12,
      distance: '0.1 miles',
      urgent: false,
      badge: 'New Neighbor',
      badgeColor: colors.accent,
      expires: '5h left',
    },
    {
      id: 4,
      user: 'Carlos M.',
      avatar: '👨‍🦱',
      time: '2h ago',
      category: 'Delivery',
      categoryColor: colors.orange,
      icon: '📦',
      title: 'Help carrying groceries up stairs?',
      body: 'Recovering from knee surgery. Have 4 bags from the store. Can someone help bring them up? Happy to tip!',
      radius: 'Building B',
      replies: 2,
      distance: '400ft away',
      urgent: false,
      badge: 'Verified Resident',
      badgeColor: colors.blue,
      expires: '30min left',
    },
    {
      id: 5,
      user: 'Sofia L.',
      avatar: '👩‍🎨',
      time: '3h ago',
      category: 'Translation',
      categoryColor: colors.purple,
      icon: '🌍',
      title: 'Spanish speaker needed for 10 mins',
      body: 'My elderly neighbor needs help understanding a letter from her landlord. Spanish fluent preferred.',
      radius: '6th floor',
      replies: 5,
      distance: '150ft away',
      urgent: false,
      badge: 'Community Star',
      badgeColor: colors.primary,
      expires: '1h left',
    },
  ];

  const skills = [
    { name: 'Tech Help', icon: '💻', count: 8, color: colors.blue, people: ['A', 'B', 'C'] },
    { name: 'Child Care', icon: '👶', count: 5, color: colors.pink, people: ['D', 'E'] },
    { name: 'Language', icon: '🌍', count: 11, color: colors.purple, people: ['F', 'G', 'H'] },
    { name: 'Tools & DIY', icon: '🔧', count: 14, color: colors.orange, people: ['I', 'J', 'K', 'L'] },
    { name: 'Pet Care', icon: '🐾', count: 6, color: colors.green, people: ['M', 'N'] },
    { name: 'Cooking', icon: '🍳', count: 9, color: colors.secondary, people: ['O', 'P', 'Q'] },
    { name: 'Bike Repair', icon: '🚲', count: 4, color: colors.primary, people: ['R', 'S'] },
    { name: 'Medical', icon: '🏥', count: 3, color: colors.danger, people: ['T'] },
  ];

  const helpers = [
    { name: 'Arun P.', avatar: '👨‍💻', skills: ['Tech Help', 'DIY'], badges: 23, rating: 4.9, distance: '2nd floor' },
    { name: 'Lena S.', avatar: '👩‍🍳', skills: ['Cooking', 'Child Care'], badges: 18, rating: 5.0, distance: '0.1 miles' },
    { name: 'Omar K.', avatar: '👨‍🔧', skills: ['Tools & DIY', 'Bike Repair'], badges: 31, rating: 4.8, distance: '4th floor' },
    { name: 'Yuki M.', avatar: '👩‍🎓', skills: ['Language', 'Tech Help'], badges: 15, rating: 4.9, distance: '0.2 miles' },
  ];

  const myBadges = [
    { label: 'Tool Lender', icon: '🔧', count: 4, color: colors.orange },
    { label: 'Quick Responder', icon: '⚡', count: 12, color: colors.secondary },
    { label: 'Neighbor Guide', icon: '🗺️', count: 7, color: colors.primary },
    { label: 'Problem Solver', icon: '🧩', count: 3, color: colors.accent },
  ];

  const categories = ['Tools', 'Childcare', 'Info', 'Delivery', 'Translation', 'Tech', 'Pet Care', 'Other'];
  const filterCategories = ['All', 'Urgent', 'Tools', 'Childcare', 'Info', 'Delivery'];

  const handleTabPress = (tab) => {
    setPressedBtn(tab);
    setTimeout(() => setPressedBtn(null), 150);
    setActiveTab(tab);
    setActiveRequest(null);
  };

  const handleLike = (id) => {
    setLikedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handlePost = () => {
    setShowSuccessToast(true);
    setShowPostModal(false);
    setNewPostStep(1);
    setPostText('');
    setSelectedCategory(null);
    setTimeout(() => setShowSuccessToast(false), 3000);
  };

  const styles = {
    wrapper: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: 'radial-gradient(ellipse at 30% 20%, #0A1628 0%, #050D1A 60%)',
      fontFamily: "'Inter', sans-serif",
      padding: '20px',
    },
    phone: {
      width: 375,
      height: 812,
      background: colors.bg,
      borderRadius: 52,
      overflow: 'hidden',
      position: 'relative',
      boxShadow: '0 0 0 2px #1A2840, 0 0 0 4px #0D1A2B, 0 40px 80px rgba(0,0,0,0.8), 0 0 120px rgba(62,207,178,0.06)',
      display: 'flex',
      flexDirection: 'column',
    },
    statusBar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '14px 28px 0',
      height: 44,
    },
    dynamicIsland: {
      position: 'absolute',
      top: 10,
      left: '50%',
      transform: 'translateX(-50%)',
      width: 126,
      height: 34,
      background: '#000',
      borderRadius: 20,
      zIndex: 50,
    },
    statusTime: { fontSize: 15, fontWeight: 700, color: colors.text },
    statusIcons: { display: 'flex', alignItems: 'center', gap: 6 },
    content: {
      flex: 1,
      overflowY: 'auto',
      overflowX: 'hidden',
    },
    bottomNav: {
      height: 80,
      background: colors.card,
      borderTop: `1px solid ${colors.cardBorder}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      paddingBottom: 16,
      flexShrink: 0,
    },
    navItem: (tab) => ({
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 4,
      padding: '8px 12px',
      borderRadius: 16,
      cursor: 'pointer',
      transition: 'all 0.15s ease',
      transform: pressedBtn === tab ? 'scale(0.88)' : 'scale(1)',
      background: activeTab === tab ? `${colors.primary}18` : 'transparent',
    }),
    navIcon: (tab) => ({
      width: 22,
      height: 22,
      color: activeTab === tab ? colors.primary : colors.textDim,
    }),
    navLabel: (tab) => ({
      fontSize: 10,
      fontWeight: activeTab === tab ? 700 : 500,
      color: activeTab === tab ? colors.primary : colors.textDim,
    }),
    // FAB
    fab: {
      position: 'absolute',
      bottom: 88,
      right: 20,
      width: 52,
      height: 52,
      borderRadius: 18,
      background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryDark})`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      boxShadow: `0 8px 24px ${colors.primary}50`,
      zIndex: 40,
    },
    // Cards
    card: {
      background: colors.card,
      borderRadius: 20,
      border: `1px solid ${colors.cardBorder}`,
      padding: '16px',
      marginBottom: 12,
    },
  };

  // Screen: Feed
  const FeedScreen = () => {
    if (activeRequest !== null) {
      const req = requests.find(r => r.id === activeRequest);
      return <RequestDetail req={req} />;
    }
    return (
      <div style={{ padding: '0 0 12px' }}>
        {/* Header */}
        <div style={{ padding: '12px 20px 0', marginBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <div>
              <div style={{ fontSize: 11, color: colors.textMuted, fontWeight: 500, letterSpacing: 1 }}>YOUR NEIGHBORHOOD</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: colors.text, fontFamily: 'Nunito' }}>Maple District <span style={{ fontSize: 16 }}>📍</span></div>
            </div>
            <div style={{ position: 'relative', cursor: 'pointer' }}>
              <div style={{
                width: 42, height: 42, borderRadius: 14,
                background: colors.surface, border: `1px solid ${colors.cardBorder}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                {React.createElement(window.lucide.Bell, { size: 20, color: colors.textMuted })}
              </div>
              {notifications > 0 && (
                <div style={{
                  position: 'absolute', top: -4, right: -4,
                  width: 18, height: 18, borderRadius: 9,
                  background: colors.danger, display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  fontSize: 10, fontWeight: 700, color: '#fff'
                }}>{notifications}</div>
              )}
            </div>
          </div>

          {/* Search bar */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10,
            background: colors.surface, borderRadius: 14,
            padding: '10px 14px', border: `1px solid ${colors.cardBorder}`,
            marginBottom: 14,
          }}>
            {React.createElement(window.lucide.Search, { size: 16, color: colors.textDim })}
            <span style={{ fontSize: 14, color: colors.textDim }}>Search nearby requests...</span>
          </div>

          {/* Filter chips */}
          <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
            {filterCategories.map(cat => (
              <div key={cat} onClick={() => setFilterCategory(cat)} style={{
                padding: '6px 14px', borderRadius: 20, whiteSpace: 'nowrap',
                background: filterCategory === cat ? colors.primary : colors.surface,
                color: filterCategory === cat ? colors.bg : colors.textMuted,
                fontSize: 12, fontWeight: 600, cursor: 'pointer',
                border: `1px solid ${filterCategory === cat ? colors.primary : colors.cardBorder}`,
                transition: 'all 0.2s',
              }}>
                {cat === 'Urgent' && '🔥 '}{cat}
              </div>
            ))}
          </div>
        </div>

        {/* Stats strip */}
        <div style={{
          display: 'flex', gap: 8, padding: '0 20px', marginBottom: 16,
        }}>
          {[
            { label: 'Active', value: '23', icon: '📡' },
            { label: 'Helpers online', value: '47', icon: '👥' },
            { label: 'Solved today', value: '12', icon: '✅' },
          ].map(s => (
            <div key={s.label} style={{
              flex: 1, background: colors.surface, borderRadius: 12,
              padding: '10px 8px', textAlign: 'center',
              border: `1px solid ${colors.cardBorder}`,
            }}>
              <div style={{ fontSize: 16, marginBottom: 2 }}>{s.icon}</div>
              <div style={{ fontSize: 15, fontWeight: 800, color: colors.text }}>{s.value}</div>
              <div style={{ fontSize: 10, color: colors.textDim }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Request cards */}
        <div style={{ padding: '0 20px' }}>
          {requests.map(req => (
            <div key={req.id} style={{ ...styles.card, cursor: 'pointer', marginBottom: 12 }}
              onClick={() => setActiveRequest(req.id)}>
              {/* Urgent banner */}
              {req.urgent && (
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  background: `${colors.danger}18`, borderRadius: 8,
                  padding: '5px 10px', marginBottom: 10,
                  border: `1px solid ${colors.danger}30`,
                }}>
                  {React.createElement(window.lucide.Zap, { size: 12, color: colors.danger })}
                  <span style={{ fontSize: 11, fontWeight: 700, color: colors.danger }}>URGENT REQUEST</span>
                </div>
              )}

              {/* Top row */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 10 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 14,
                  background: colors.surface, display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  fontSize: 18, flexShrink: 0, border: `1px solid ${colors.cardBorder}`,
                }}>{req.avatar}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: colors.text }}>{req.user}</span>
                    <span style={{
                      fontSize: 10, fontWeight: 600, color: req.badgeColor,
                      background: `${req.badgeColor}20`, padding: '2px 7px', borderRadius: 8,
                    }}>{req.badge}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 11, color: colors.textDim }}>{req.time}</span>
                    <span style={{ fontSize: 10, color: colors.textDim }}>·</span>
                    <span style={{ fontSize: 11, color: colors.primary }}>📍 {req.distance}</span>
                  </div>
                </div>
                <div style={{
                  padding: '4px 9px', borderRadius: 10,
                  background: `${req.categoryColor}20`,
                  fontSize: 11, fontWeight: 600, color: req.categoryColor,
                  border: `1px solid ${req.categoryColor}30`,
                }}>
                  {req.icon} {req.category}
                </div>
              </div>

              <div style={{ fontSize: 15, fontWeight: 700, color: colors.text, marginBottom: 6, lineHeight: 1.3 }}>
                {req.title}
              </div>
              <div style={{ fontSize: 13, color: colors.textMuted, lineHeight: 1.5, marginBottom: 12 }}>
                {req.body}
              </div>

              {/* Bottom row */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', gap: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5, cursor: 'pointer' }}
                    onClick={(e) => { e.stopPropagation(); handleLike(req.id); }}>
                    {React.createElement(likedItems[req.id] ? window.lucide.Heart : window.lucide.Heart, {
                      size: 15,
                      color: likedItems[req.id] ? colors.danger : colors.textDim,
                      fill: likedItems[req.id] ? colors.danger : 'none',
                    })}
                    <span style={{ fontSize: 12, color: colors.textDim }}>Help</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                    {React.createElement(window.lucide.MessageCircle, { size: 15, color: colors.textDim })}
                    <span style={{ fontSize: 12, color: colors.textDim }}>{req.replies}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  {React.createElement(window.lucide.Clock, { size: 12, color: colors.textDim })}
                  <span style={{ fontSize: 11, color: colors.textDim }}>{req.expires}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Request Detail
  const RequestDetail = ({ req }) => {
    const [replyText, setReplyText] = useState('');
    const [sent, setSent] = useState(false);
    const replies = [
      { user: 'Arun P.', avatar: '👨‍💻', text: 'I can help! I have one in my apartment. Just message me.', time: '6 min ago', badge: 'Super Helper' },
      { user: 'Lena S.', avatar: '👩‍🍳', text: 'Check apt 8B too, they mentioned having one last week.', time: '4 min ago', badge: 'Trusted Neighbor' },
      { user: 'Omar K.', avatar: '👨‍🔧', text: 'I can bring mine over in 10 minutes!', time: '2 min ago', badge: 'Tool Expert' },
    ];
    return (
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 20px 16px', borderBottom: `1px solid ${colors.cardBorder}` }}>
          <div onClick={() => setActiveRequest(null)} style={{ cursor: 'pointer', padding: 6 }}>
            {React.createElement(window.lucide.ArrowLeft, { size: 20, color: colors.text })}
          </div>
          <div style={{ fontSize: 16, fontWeight: 700, color: colors.text }}>Request Thread</div>
          <div style={{ marginLeft: 'auto', padding: '4px 12px', borderRadius: 20, background: `${colors.primary}20`, fontSize: 12, fontWeight: 600, color: colors.primary }}>
            {req.replies} replies
          </div>
        </div>
        <div style={{ padding: '16px 20px' }}>
          <div style={{ ...styles.card, marginBottom: 16 }}>
            <div style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
              <div style={{ fontSize: 24 }}>{req.avatar}</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: colors.text }}>{req.user}</div>
                <div style={{ fontSize: 11, color: colors.textDim }}>{req.time} · 📍 {req.distance}</div>
              </div>
            </div>
            <div style={{ fontSize: 16, fontWeight: 700, color: colors.text, marginBottom: 8 }}>{req.title}</div>
            <div style={{ fontSize: 14, color: colors.textMuted, lineHeight: 1.5, marginBottom: 12 }}>{req.body}</div>
            <div style={{ display: 'flex', gap: 8 }}>
              <div style={{ padding: '6px 14px', borderRadius: 20, background: `${colors.primary}`, color: colors.bg, fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>
                ✋ Offer Help
              </div>
              <div style={{ padding: '6px 14px', borderRadius: 20, background: colors.surface, color: colors.textMuted, fontSize: 12, fontWeight: 600, cursor: 'pointer', border: `1px solid ${colors.cardBorder}` }}>
                💬 Message
              </div>
            </div>
          </div>
          {replies.map((r, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 14 }}>
              <div style={{ fontSize: 20, width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', background: colors.surface, borderRadius: 12, flexShrink: 0 }}>{r.avatar}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 4 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: colors.text }}>{r.user}</span>
                  <span style={{ fontSize: 10, color: colors.primary, background: `${colors.primary}20`, padding: '2px 8px', borderRadius: 8, fontWeight: 600 }}>{r.badge}</span>
                </div>
                <div style={{ background: colors.surface, borderRadius: '4px 14px 14px 14px', padding: '10px 12px', fontSize: 13, color: colors.textMuted, border: `1px solid ${colors.cardBorder}` }}>
                  {r.text}
                </div>
                <div style={{ fontSize: 11, color: colors.textDim, marginTop: 4 }}>{r.time}</div>
              </div>
            </div>
          ))}
          {/* Reply input */}
          <div style={{ display: 'flex', gap: 8, marginTop: 8, padding: '12px 0', borderTop: `1px solid ${colors.cardBorder}` }}>
            <div style={{ flex: 1, background: colors.surface, borderRadius: 14, padding: '10px 14px', border: `1px solid ${colors.cardBorder}`, fontSize: 13, color: sent ? colors.primary : colors.textDim }}>
              {sent ? '✓ Reply sent!' : 'Add a reply...'}
            </div>
            <div onClick={() => setSent(true)} style={{
              width: 42, height: 42, borderRadius: 14, background: colors.primary,
              display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
            }}>
              {React.createElement(window.lucide.Send, { size: 18, color: colors.bg })}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Screen: Map/Skills
  const MapScreen = () => (
    <div>
      <div style={{ padding: '12px 20px 0' }}>
        <div style={{ fontSize: 11, color: colors.textMuted, fontWeight: 500, letterSpacing: 1, marginBottom: 4 }}>NEIGHBORHOOD SKILLS</div>
        <div style={{ fontSize: 20, fontWeight: 800, color: colors.text, fontFamily: 'Nunito', marginBottom: 4 }}>Skill Map</div>
        <div style={{ fontSize: 13, color: colors.textMuted, marginBottom: 16 }}>Find who can help with what nearby</div>

        {/* Visual map placeholder */}
        <div style={{
          borderRadius: 20, overflow: 'hidden', marginBottom: 16,
          height: 180, background: `linear-gradient(135deg, #0A1628, #0E1F38)`,
          border: `1px solid ${colors.cardBorder}`, position: 'relative',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {/* Map dots */}
          {[
            { x: '30%', y: '40%', color: colors.blue, emoji: '💻' },
            { x: '60%', y: '30%', color: colors.pink, emoji: '👶' },
            { x: '45%', y: '60%', color: colors.green, emoji: '🔧' },
            { x: '70%', y: '65%', color: colors.purple, emoji: '🌍' },
            { x: '20%', y: '70%', color: colors.orange, emoji: '🐾' },
            { x: '80%', y: '45%', color: colors.primary, emoji: '🚲' },
          ].map((dot, i) => (
            <div key={i} style={{
              position: 'absolute', left: dot.x, top: dot.y,
              transform: 'translate(-50%, -50%)',
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: 12,
                background: `${dot.color}30`,
                border: `2px solid ${dot.color}60`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 16, boxShadow: `0 0 16px ${dot.color}40`,
              }}>{dot.emoji}</div>
            </div>
          ))}
          {/* Center pulse */}
          <div style={{
            position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)',
            width: 20, height: 20, borderRadius: 10,
            background: colors.primary, boxShadow: `0 0 0 8px ${colors.primary}30, 0 0 0 16px ${colors.primary}15`,
          }} />
          <div style={{
            position: 'absolute', bottom: 10, right: 12,
            fontSize: 11, color: colors.textDim,
            background: `${colors.bg}cc`, padding: '4px 8px', borderRadius: 8,
          }}>📍 Your location</div>
        </div>

        {/* Skill grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
          {skills.map((skill) => (
            <div key={skill.name} style={{
              ...styles.card, padding: '14px', cursor: 'pointer',
              border: `1px solid ${skill.color}30`,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <div style={{
                  width: 34, height: 34, borderRadius: 10,
                  background: `${skill.color}20`, display: 'flex',
                  alignItems: 'center', justifyContent: 'center', fontSize: 17,
                }}>{skill.icon}</div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: colors.text }}>{skill.name}</div>
                  <div style={{ fontSize: 11, color: skill.color }}>{skill.count} people</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: -4 }}>
                {skill.people.slice(0, 3).map((p, i) => (
                  <div key={i} style={{
                    width: 22, height: 22, borderRadius: 8, background: `${skill.color}40`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 10, fontWeight: 700, color: skill.color,
                    marginLeft: i > 0 ? -4 : 0, border: `2px solid ${colors.card}`,
                  }}>{p}</div>
                ))}
                {skill.count > 3 && (
                  <div style={{
                    width: 22, height: 22, borderRadius: 8, background: colors.surface,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 9, color: colors.textDim, marginLeft: -4,
                    border: `2px solid ${colors.card}`,
                  }}>+{skill.count - 3}</div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Top helpers */}
        <div style={{ fontSize: 14, fontWeight: 700, color: colors.text, marginBottom: 12 }}>⭐ Top Helpers Nearby</div>
        {helpers.map((h, i) => (
          <div key={i} style={{ ...styles.card, display: 'flex', gap: 12, alignItems: 'center' }}>
            <div style={{
              width: 44, height: 44, borderRadius: 14, background: colors.surface,
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22,
              border: `1px solid ${colors.cardBorder}`,
            }}>{h.avatar}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: colors.text, marginBottom: 3 }}>{h.name}</div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {h.skills.map(s => (
                  <span key={s} style={{ fontSize: 10, color: colors.textMuted, background: colors.surface, padding: '2px 7px', borderRadius: 6 }}>{s}</span>
                ))}
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: colors.secondary }}>⭐ {h.rating}</div>
              <div style={{ fontSize: 10, color: colors.textDim }}>{h.distance}</div>
              <div style={{ fontSize: 10, color: colors.primary }}>{h.badges} helps</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Screen: Post/Request
  const PostScreen = () => (
    <div style={{ padding: '12px 20px' }}>
      <div style={{ fontSize: 11, color: colors.textMuted, fontWeight: 500, letterSpacing: 1, marginBottom: 4 }}>CREATE</div>
      <div style={{ fontSize: 20, fontWeight: 800, color: colors.text, fontFamily: 'Nunito', marginBottom: 4 }}>New Request</div>
      <div style={{ fontSize: 13, color: colors.textMuted, marginBottom: 20 }}>Ask your neighbors for help</div>

      {/* Steps */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
        {[1, 2, 3].map(s => (
          <div key={s} style={{ flex: 1, height: 4, borderRadius: 4, background: s <= newPostStep ? colors.primary : colors.surface }} />
        ))}
      </div>

      {newPostStep === 1 && (
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: colors.textMuted, marginBottom: 12 }}>What do you need help with?</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
            {categories.map(cat => (
              <div key={cat} onClick={() => setSelectedCategory(cat)} style={{
                padding: '14px', borderRadius: 16, cursor: 'pointer',
                background: selectedCategory === cat ? `${colors.primary}20` : colors.surface,
                border: `1px solid ${selectedCategory === cat ? colors.primary : colors.cardBorder}`,
                textAlign: 'center', transition: 'all 0.2s',
              }}>
                <div style={{ fontSize: 22, marginBottom: 6 }}>
                  {cat === 'Tools' ? '🔧' : cat === 'Childcare' ? '👶' : cat === 'Info' ? 'ℹ️' : cat === 'Delivery' ? '📦' : cat === 'Translation' ? '🌍' : cat === 'Tech' ? '💻' : cat === 'Pet Care' ? '🐾' : '❓'}
                </div>
                <div style={{ fontSize: 12, fontWeight: 600, color: selectedCategory === cat ? colors.primary : colors.textMuted }}>{cat}</div>
              </div>
            ))}
          </div>
          <div onClick={() => selectedCategory && setNewPostStep(2)} style={{
            padding: '14px', borderRadius: 16, textAlign: 'center', cursor: 'pointer',
            background: selectedCategory ? colors.primary : colors.surface,
            color: selectedCategory ? colors.bg : colors.textDim,
            fontWeight: 700, fontSize: 15,
            opacity: selectedCategory ? 1 : 0.5,
          }}>Continue →</div>
        </div>
      )}

      {newPostStep === 2 && (
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: colors.textMuted, marginBottom: 12 }}>Describe your request</div>
          <div style={{
            background: colors.surface, borderRadius: 16, padding: '14px',
            border: `1px solid ${colors.cardBorder}`, marginBottom: 14,
          }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: colors.text, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
              <span>{selectedCategory === 'Tools' ? '🔧' : '❓'}</span>
              <span style={{ color: colors.primary }}>{selectedCategory}</span>
            </div>
            <div style={{
              fontSize: 14, color: postText ? colors.text : colors.textDim,
              minHeight: 80, lineHeight: 1.5,
            }}>{postText || 'Tap to type your request...'}</div>
          </div>
          {/* Quick fill suggestions */}
          <div style={{ fontSize: 12, fontWeight: 600, color: colors.textDim, marginBottom: 8 }}>Quick templates:</div>
          {[
            'Can I borrow a drill for 20 mins?',
            'Need help moving a heavy item',
            'Looking for a recommendation for...',
          ].map((t, i) => (
            <div key={i} onClick={() => setPostText(t)} style={{
              padding: '10px 14px', borderRadius: 12, cursor: 'pointer',
              background: colors.surface, border: `1px solid ${colors.cardBorder}`,
              fontSize: 13, color: colors.textMuted, marginBottom: 8,
            }}>{t}</div>
          ))}
          <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
            <div onClick={() => setNewPostStep(1)} style={{ flex: 1, padding: '13px', borderRadius: 16, textAlign: 'center', cursor: 'pointer', background: colors.surface, color: colors.textMuted, fontWeight: 600, fontSize: 14, border: `1px solid ${colors.cardBorder}` }}>← Back</div>
            <div onClick={() => postText && setNewPostStep(3)} style={{ flex: 2, padding: '13px', borderRadius: 16, textAlign: 'center', cursor: 'pointer', background: postText ? colors.primary : colors.surface, color: postText ? colors.bg : colors.textDim, fontWeight: 700, fontSize: 15, opacity: postText ? 1 : 0.5 }}>Continue →</div>
          </div>
        </div>
      )}

      {newPostStep === 3 && (
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: colors.textMuted, marginBottom: 12 }}>Set radius & options</div>
          <div style={{ ...styles.card, marginBottom: 14 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: colors.textDim, marginBottom: 10 }}>HOW FAR TO REACH</div>
            <div style={{ display: 'flex', gap: 8 }}>
              {['500m', '1km', '2km'].map(r => (
                <div key={r} onClick={() => setSelectedRadius(r)} style={{
                  flex: 1, padding: '10px', borderRadius: 12, textAlign: 'center', cursor: 'pointer',
                  background: selectedRadius === r ? `${colors.primary}20` : colors.surface,
                  border: `1px solid ${selectedRadius === r ? colors.primary : colors.cardBorder}`,
                  fontSize: 13, fontWeight: 600,
                  color: selectedRadius === r ? colors.primary : colors.textMuted,
                }}>{r}</div>
              ))}
            </div>
          </div>
          <div style={{ ...styles.card, marginBottom: 14 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: colors.textDim, marginBottom: 10 }}>EXPIRES IN</div>
            <div style={{ display: 'flex', gap: 8 }}>
              {['1h', '3h', '24h'].map(t => (
                <div key={t} style={{
                  flex: 1, padding: '10px', borderRadius: 12, textAlign: 'center', cursor: 'pointer',
                  background: t === '3h' ? `${colors.primary}20` : colors.surface,
                  border: `1px solid ${t === '3h' ? colors.primary : colors.cardBorder}`,
                  fontSize: 13, fontWeight: 600,
                  color: t === '3h' ? colors.primary : colors.textMuted,
                }}>{t}</div>
              ))}
            </div>
          </div>
          <div style={{ ...styles.card, display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: colors.text }}>Anonymous mode</div>
              <div style={{ fontSize: 11, color: colors.textDim }}>Your name hidden until you confirm</div>
            </div>
            <div style={{
              width: 44, height: 24, borderRadius: 12, background: `${colors.primary}60`,
              position: 'relative', cursor: 'pointer',
            }}>
              <div style={{ position: 'absolute', right: 2, top: 2, width: 20, height: 20, borderRadius: 10, background: colors.primary }} />
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <div onClick={() => setNewPostStep(2)} style={{ flex: 1, padding: '13px', borderRadius: 16, textAlign: 'center', cursor: 'pointer', background: colors.surface, color: colors.textMuted, fontWeight: 600, fontSize: 14, border: `1px solid ${colors.cardBorder}` }}>← Back</div>
            <div onClick={handlePost} style={{ flex: 2, padding: '13px', borderRadius: 16, textAlign: 'center', cursor: 'pointer', background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryDark})`, color: colors.bg, fontWeight: 700, fontSize: 15, boxShadow: `0 6px 20px ${colors.primary}40` }}>🚀 Post Request</div>
          </div>
        </div>
      )}
    </div>
  );

  // Screen: Profile
  const ProfileScreen = () => (
    <div>
      {/* Hero */}
      <div style={{
        background: `linear-gradient(180deg, ${colors.primary}15, ${colors.bg})`,
        padding: '20px 20px 24px', marginBottom: 0,
        borderBottom: `1px solid ${colors.cardBorder}`,
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 20 }}>
          <div style={{
            width: 70, height: 70, borderRadius: 24, background: colors.surface,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 32, border: `3px solid ${colors.primary}50`,
            boxShadow: `0 0 24px ${colors.primary}30`,
          }}>👤</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 20, fontWeight: 800, color: colors.text, fontFamily: 'Nunito' }}>Alex Chen</div>
            <div style={{ fontSize: 12, color: colors.textMuted, marginBottom: 8 }}>Building C, 4th Floor · Member since Jan 2026</div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 5,
              background: `${colors.primary}20`, border: `1px solid ${colors.primary}40`,
              padding: '4px 12px', borderRadius: 20,
            }}>
              {React.createElement(window.lucide.Star, { size: 12, color: colors.primary, fill: colors.primary })}
              <span style={{ fontSize: 12, fontWeight: 700, color: colors.primary }}>4.9 · Trusted Neighbor</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', gap: 0, background: colors.surface, borderRadius: 16, overflow: 'hidden', border: `1px solid ${colors.cardBorder}` }}>
          {[
            { label: 'Helped', value: 26, icon: '🤝' },
            { label: 'Requests', value: 8, icon: '📋' },
            { label: 'Rating', value: '4.9', icon: '⭐' },
          ].map((s, i) => (
            <div key={s.label} style={{
              flex: 1, padding: '12px 8px', textAlign: 'center',
              borderRight: i < 2 ? `1px solid ${colors.cardBorder}` : 'none',
            }}>
              <div style={{ fontSize: 16, marginBottom: 2 }}>{s.icon}</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: colors.text }}>{s.value}</div>
              <div style={{ fontSize: 11, color: colors.textDim }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: '16px 20px' }}>
        {/* Trust badges */}
        <div style={{ fontSize: 14, fontWeight: 700, color: colors.text, marginBottom: 12 }}>🏅 Trust Badges</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
          {myBadges.map((b) => (
            <div key={b.label} style={{
              ...styles.card, textAlign: 'center', padding: '16px 12px',
              border: `1px solid ${b.color}30`,
            }}>
              <div style={{ fontSize: 28, marginBottom: 6 }}>{b.icon}</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: colors.text, marginBottom: 3 }}>{b.label}</div>
              <div style={{ fontSize: 11, color: b.color, fontWeight: 600 }}>{b.count}x completed</div>
            </div>
          ))}
        </div>

        {/* My skills */}
        <div style={{ fontSize: 14, fontWeight: 700, color: colors.text, marginBottom: 12 }}>🛠 My Skills</div>
        <div style={{ ...styles.card, marginBottom: 16 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {['Tech Help', 'Tools & DIY', 'Moving Help', 'Translation (Mandarin)', 'Cooking'].map(s => (
              <span key={s} style={{
                padding: '6px 12px', borderRadius: 20,
                background: `${colors.primary}15`,
                border: `1px solid ${colors.primary}30`,
                fontSize: 12, fontWeight: 600, color: colors.primary,
              }}>{s}</span>
            ))}
            <span style={{
              padding: '6px 12px', borderRadius: 20,
              background: colors.surface, border: `1px dashed ${colors.cardBorder}`,
              fontSize: 12, color: colors.textDim, cursor: 'pointer',
            }}>+ Add skill</span>
          </div>
        </div>

        {/* Recent activity */}
        <div style={{ fontSize: 14, fontWeight: 700, color: colors.text, marginBottom: 12 }}>📌 Recent Activity</div>
        {[
          { action: 'Helped', text: 'Lent a ladder to Maya K.', time: '2 days ago', icon: '🔧', color: colors.orange },
          { action: 'Posted', text: 'Asked about parking rules', time: '5 days ago', icon: '📋', color: colors.blue },
          { action: 'Helped', text: 'Carried groceries for Carlos M.', time: '1 week ago', icon: '📦', color: colors.green },
        ].map((a, i) => (
          <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 12 }}>
            <div style={{
              width: 38, height: 38, borderRadius: 12, background: `${a.color}20`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0,
            }}>{a.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: a.color, background: `${a.color}20`, padding: '2px 7px', borderRadius: 6 }}>{a.action}</span>
                <span style={{ fontSize: 12, color: colors.text }}>{a.text}</span>
              </div>
              <div style={{ fontSize: 11, color: colors.textDim, marginTop: 2 }}>{a.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Screen: Notifications/Messages
  const MessagesScreen = () => {
    const threads = [
      { user: 'Maya K.', avatar: '👩‍💼', msg: 'Thank you so much! Drill worked perfectly 🙌', time: '5m', unread: 2, req: 'Drill borrowing', color: colors.blue },
      { user: 'Carlos M.', avatar: '👨‍🦱', msg: 'Are you still available to help with groceries?', time: '1h', unread: 1, req: 'Grocery help', color: colors.orange },
      { user: 'Neighborhood Update', avatar: '📡', msg: '3 new requests in your area this morning', time: '2h', unread: 0, req: 'Community', color: colors.primary },
      { user: 'Priya N.', avatar: '👩‍🔬', msg: 'Thanks for the store rec! Harris Teeter was open late!', time: '3h', unread: 0, req: 'Store hours', color: colors.green },
      { user: 'Trust Update', avatar: '🏅', msg: 'You earned the Quick Responder badge!', time: '1d', unread: 0, req: 'Badge earned', color: colors.secondary },
    ];
    return (
      <div style={{ padding: '12px 20px' }}>
        <div style={{ fontSize: 11, color: colors.textMuted, fontWeight: 500, letterSpacing: 1, marginBottom: 4 }}>INBOX</div>
        <div style={{ fontSize: 20, fontWeight: 800, color: colors.text, fontFamily: 'Nunito', marginBottom: 16 }}>Messages</div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 0, background: colors.surface, borderRadius: 14, padding: 4, marginBottom: 16, border: `1px solid ${colors.cardBorder}` }}>
          {['Direct', 'Threads', 'Updates'].map((tab, i) => (
            <div key={tab} style={{
              flex: 1, padding: '8px', borderRadius: 10, textAlign: 'center', cursor: 'pointer',
              background: i === 0 ? colors.primary : 'transparent',
              fontSize: 12, fontWeight: 600,
              color: i === 0 ? colors.bg : colors.textMuted,
            }}>{tab}</div>
          ))}
        </div>

        {threads.map((t, i) => (
          <div key={i} style={{
            display: 'flex', gap: 12, padding: '14px',
            background: t.unread > 0 ? `${t.color}08` : colors.card,
            borderRadius: 18, marginBottom: 10, cursor: 'pointer',
            border: `1px solid ${t.unread > 0 ? `${t.color}30` : colors.cardBorder}`,
          }}>
            <div style={{
              width: 46, height: 46, borderRadius: 16, background: colors.surface,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 22, position: 'relative', flexShrink: 0,
            }}>
              {t.avatar}
              {t.unread > 0 && (
                <div style={{
                  position: 'absolute', top: -4, right: -4,
                  width: 18, height: 18, borderRadius: 9, background: t.color,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 10, fontWeight: 700, color: '#fff',
                }}>{t.unread}</div>
              )}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: colors.text }}>{t.user}</span>
                <span style={{ fontSize: 11, color: colors.textDim }}>{t.time}</span>
              </div>
              <div style={{ fontSize: 11, color: t.color, marginBottom: 3, fontWeight: 600 }}>Re: {t.req}</div>
              <div style={{ fontSize: 12, color: colors.textMuted, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t.msg}</div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderScreen = () => {
    switch (activeTab) {
      case 'feed': return <FeedScreen />;
      case 'map': return <MapScreen />;
      case 'post': return <PostScreen />;
      case 'messages': return <MessagesScreen />;
      case 'profile': return <ProfileScreen />;
      default: return <FeedScreen />;
    }
  };

  const navItems = [
    { id: 'feed', label: 'Feed', icon: window.lucide.Home },
    { id: 'map', label: 'Skills', icon: window.lucide.Map },
    { id: 'post', label: 'Request', icon: window.lucide.PlusCircle },
    { id: 'messages', label: 'Messages', icon: window.lucide.MessageCircle },
    { id: 'profile', label: 'Profile', icon: window.lucide.User },
  ];

  return (
    <div style={styles.wrapper}>
      <style>{fontStyle}</style>
      <div style={styles.phone}>
        {/* Status bar */}
        <div style={styles.statusBar}>
          <span style={styles.statusTime}>9:41</span>
          <div style={styles.dynamicIsland} />
          <div style={styles.statusIcons}>
            {React.createElement(window.lucide.Wifi, { size: 14, color: colors.text })}
            {React.createElement(window.lucide.Signal, { size: 14, color: colors.text })}
            {React.createElement(window.lucide.Battery, { size: 16, color: colors.text })}
          </div>
        </div>

        {/* Scrollable content */}
        <div style={styles.content}>
          {renderScreen()}
        </div>

        {/* Success toast */}
        {showSuccessToast && (
          <div style={{
            position: 'absolute', top: 60, left: 20, right: 20,
            background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryDark})`,
            borderRadius: 16, padding: '14px 18px',
            display: 'flex', alignItems: 'center', gap: 10,
            zIndex: 100, boxShadow: `0 8px 32px ${colors.primary}50`,
          }}>
            {React.createElement(window.lucide.CheckCircle, { size: 20, color: colors.bg })}
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: colors.bg }}>Request posted!</div>
              <div style={{ fontSize: 11, color: `${colors.bg}cc` }}>47 neighbors can see it now</div>
            </div>
          </div>
        )}

        {/* Bottom nav */}
        <div style={styles.bottomNav}>
          {navItems.map(item => (
            <div key={item.id} style={styles.navItem(item.id)} onClick={() => handleTabPress(item.id)}>
              <div style={{ position: 'relative' }}>
                {React.createElement(item.icon, { style: styles.navIcon(item.id) })}
                {item.id === 'messages' && notifications > 0 && (
                  <div style={{
                    position: 'absolute', top: -4, right: -4,
                    width: 14, height: 14, borderRadius: 7, background: colors.danger,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 8, fontWeight: 700, color: '#fff',
                  }}>{notifications}</div>
                )}
                {item.id === 'post' && (
                  <div style={{
                    position: 'absolute', top: -4, right: -4,
                    width: 14, height: 14, borderRadius: 7,
                    background: colors.secondary,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    {React.createElement(window.lucide.Plus, { size: 10, color: colors.bg, strokeWidth: 3 })}
                  </div>
                )}
              </div>
              <span style={styles.navLabel(item.id)}>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
