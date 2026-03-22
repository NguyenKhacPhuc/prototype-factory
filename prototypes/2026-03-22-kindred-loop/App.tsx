
const { useState, useEffect, useRef } = React;

const themes = {
  dark: {
    bg: '#0C0E14',
    surface: '#141720',
    card: '#1C2030',
    cardAlt: '#222639',
    border: '#2A2F45',
    text: '#F0F2F8',
    textSub: '#7B87A6',
    textMuted: '#4A5270',
    primary: '#FF6B47',
    primaryLight: '#FF8C6E',
    primaryDim: 'rgba(255,107,71,0.15)',
    secondary: '#FFB547',
    secondaryDim: 'rgba(255,181,71,0.15)',
    teal: '#40D9C0',
    tealDim: 'rgba(64,217,192,0.15)',
    purple: '#9B7FFF',
    purpleDim: 'rgba(155,127,255,0.15)',
    navBg: '#141720',
    navBorder: '#2A2F45',
    statusBar: '#F0F2F8',
    pill: '#2A2F45',
    pillText: '#A0ABCC',
    inputBg: '#1C2030',
    inputBorder: '#2A2F45',
    shadow: 'rgba(0,0,0,0.4)',
    gradient1: 'linear-gradient(135deg, #FF6B47 0%, #FF8C6E 100%)',
    gradient2: 'linear-gradient(135deg, #FFB547 0%, #FF6B47 100%)',
    gradient3: 'linear-gradient(135deg, #40D9C0 0%, #9B7FFF 100%)',
    mapBg: '#161B2E',
  },
  light: {
    bg: '#F2F4F9',
    surface: '#FFFFFF',
    card: '#FFFFFF',
    cardAlt: '#F7F9FC',
    border: '#E4E8F0',
    text: '#1A1E2E',
    textSub: '#5A6380',
    textMuted: '#9BA3BC',
    primary: '#FF5A30',
    primaryLight: '#FF7A5A',
    primaryDim: 'rgba(255,90,48,0.1)',
    secondary: '#FF9C20',
    secondaryDim: 'rgba(255,156,32,0.1)',
    teal: '#1BBFA6',
    tealDim: 'rgba(27,191,166,0.1)',
    purple: '#7B5FE8',
    purpleDim: 'rgba(123,95,232,0.1)',
    navBg: '#FFFFFF',
    navBorder: '#E4E8F0',
    statusBar: '#1A1E2E',
    pill: '#EDF0F7',
    pillText: '#5A6380',
    inputBg: '#F2F4F9',
    inputBorder: '#E4E8F0',
    shadow: 'rgba(0,0,0,0.08)',
    gradient1: 'linear-gradient(135deg, #FF5A30 0%, #FF7A5A 100%)',
    gradient2: 'linear-gradient(135deg, #FF9C20 0%, #FF5A30 100%)',
    gradient3: 'linear-gradient(135deg, #1BBFA6 0%, #7B5FE8 100%)',
    mapBg: '#E8EDF5',
  }
};

const requests = [
  {
    id: 1,
    user: 'Maya R.',
    avatar: 'MR',
    avatarColor: '#FF6B47',
    time: '3 min ago',
    expires: '25 min left',
    category: 'Tools',
    categoryColor: '#FFB547',
    title: 'Borrow a step ladder for 20 min',
    desc: 'Need to change a ceiling bulb. Can return immediately after.',
    distance: '0.2 mi',
    trust: 'Shared: Park & Ride Co-op',
    trustIcon: '🏘',
    urgent: true,
    tags: ['Quick', 'Tools'],
    offers: 2,
  },
  {
    id: 2,
    user: 'Daniel K.',
    avatar: 'DK',
    avatarColor: '#40D9C0',
    time: '12 min ago',
    expires: '1h 48 min left',
    category: 'Childcare',
    categoryColor: '#9B7FFF',
    title: 'Stroller watch swap — 30 minutes',
    desc: 'Doctor appt at 2pm. Any parent near Riverside Park? Happy to return the favor anytime.',
    distance: '0.4 mi',
    trust: 'Shared: Lincoln Elementary Parents',
    trustIcon: '🎒',
    urgent: false,
    tags: ['Parents', 'Swap'],
    offers: 1,
  },
  {
    id: 3,
    user: 'Priya N.',
    avatar: 'PN',
    avatarColor: '#FF6B47',
    time: '28 min ago',
    expires: '3h 32 min left',
    category: 'Co-work',
    categoryColor: '#40D9C0',
    title: 'Co-work partner for focused afternoon',
    desc: 'Remote dev, looking for a quiet cafe partner Tue afternoon near Midtown. Pomodoro-friendly.',
    distance: '0.7 mi',
    trust: 'Verified: Remote Workers Guild',
    trustIcon: '💻',
    urgent: false,
    tags: ['Work', 'Focus'],
    offers: 4,
  },
  {
    id: 4,
    user: 'Tom B.',
    avatar: 'TB',
    avatarColor: '#9B7FFF',
    time: '45 min ago',
    expires: '2h 15 min left',
    category: 'Plants',
    categoryColor: '#40D9C0',
    title: 'Water my tomatoes this weekend',
    desc: 'Away Sat–Sun. Small balcony garden, 5 mins max. Happy to trade homegrown tomatoes next harvest!',
    distance: '0.3 mi',
    trust: 'Shared: Elmwood Building',
    trustIcon: '🌿',
    urgent: false,
    tags: ['Garden', 'Weekend'],
    offers: 3,
  },
  {
    id: 5,
    user: 'Lena H.',
    avatar: 'LH',
    avatarColor: '#FFB547',
    time: '1h ago',
    expires: '4h left',
    category: 'Social',
    categoryColor: '#FF6B47',
    title: 'Dinner companion tonight — just moved here',
    desc: 'New to the city, looking for someone to grab ramen with around 7pm. Anywhere near Hayes Valley.',
    distance: '1.1 mi',
    trust: 'Verified: Neighbor',
    trustIcon: '🏙',
    urgent: false,
    tags: ['Social', 'Dinner'],
    offers: 2,
  }
];

const pulseData = [
  { label: 'Tool sharing', pct: 68, color: '#FFB547', icon: '🔧' },
  { label: 'Co-working', pct: 54, color: '#40D9C0', icon: '💻' },
  { label: 'Plant/pet care', pct: 47, color: '#9B7FFF', icon: '🌱' },
  { label: 'Social meetups', pct: 39, color: '#FF6B47', icon: '☕' },
];

const nearbyPeople = [
  { name: 'Aisha M.', role: 'Designer · 0.1 mi', avatar: 'AM', color: '#9B7FFF', skills: ['Design', 'Plants'], free: 'Free now' },
  { name: 'James L.', role: 'Teacher · 0.3 mi', avatar: 'JL', color: '#40D9C0', skills: ['Kids', 'Cooking'], free: 'Free in 2h' },
  { name: 'Sofia T.', role: 'Nurse · 0.4 mi', avatar: 'ST', color: '#FFB547', skills: ['First Aid', 'Pets'], free: 'Free Sat' },
  { name: 'Kai W.', role: 'Engineer · 0.5 mi', avatar: 'KW', color: '#FF6B47', skills: ['Tech', 'Moving'], free: 'Free now' },
  { name: 'Nadia R.', role: 'Chef · 0.6 mi', avatar: 'NR', color: '#FF6B47', skills: ['Cooking', 'Baking'], free: 'Free Sun' },
  { name: 'Omar P.', role: 'Dev · 0.8 mi', avatar: 'OP', color: '#9B7FFF', skills: ['Tech', 'Co-work'], free: 'Free now' },
];

const myLoop = [
  { name: 'Elmwood Building', members: 12, icon: '🏢', type: 'Home', color: '#40D9C0' },
  { name: 'Lincoln Elementary Parents', members: 47, icon: '🎒', type: 'School', color: '#9B7FFF' },
  { name: 'Remote Workers Guild', members: 89, icon: '💻', type: 'Work', color: '#FFB547' },
  { name: 'Park & Ride Co-op', members: 23, icon: '🚲', type: 'Community', color: '#FF6B47' },
];

const loopActivity = [
  { user: 'Aisha M.', action: 'helped you with', thing: 'package pickup', time: '2 days ago', avatar: 'AM', color: '#9B7FFF', type: 'received' },
  { user: 'You', action: 'helped', target: 'James L.', thing: 'move a bookshelf', time: '4 days ago', avatar: 'JL', color: '#40D9C0', type: 'gave' },
  { user: 'You', action: 'helped', target: 'Sofia T.', thing: 'water plants', time: '1 week ago', avatar: 'ST', color: '#FFB547', type: 'gave' },
  { user: 'Omar P.', action: 'helped you with', thing: 'WiFi troubleshooting', time: '1 week ago', avatar: 'OP', color: '#9B7FFF', type: 'received' },
];

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [theme, setTheme] = useState('dark');
  const [pressedBtn, setPressedBtn] = useState(null);
  const [likedIds, setLikedIds] = useState([]);
  const [offeredIds, setOfferedIds] = useState([]);
  const [filterActive, setFilterActive] = useState('All');
  const [postStep, setPostStep] = useState(0);
  const [postData, setPostData] = useState({ category: '', title: '', desc: '', duration: '30 min', expires: '2 hours' });
  const [postSuccess, setPostSuccess] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mapSelected, setMapSelected] = useState(null);
  const [notifCount, setNotifCount] = useState(3);
  const [reciprocity, setReciprocity] = useState({ gave: 7, received: 5 });

  const t = themes[theme];

  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap';
    document.head.appendChild(link);
  }, []);

  const handlePress = (id) => {
    setPressedBtn(id);
    setTimeout(() => setPressedBtn(null), 150);
  };

  const toggleLike = (id) => {
    setLikedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const handleOffer = (id) => {
    if (!offeredIds.includes(id)) {
      setOfferedIds(prev => [...prev, id]);
      setReciprocity(prev => ({ ...prev, gave: prev.gave + 1 }));
    }
  };

  const tabs = [
    { id: 'home', label: 'Home', icon: window.lucide.Home },
    { id: 'discover', label: 'Discover', icon: window.lucide.Compass },
    { id: 'post', label: 'Post', icon: window.lucide.PlusCircle },
    { id: 'loop', label: 'Loop', icon: window.lucide.Users },
    { id: 'profile', label: 'Profile', icon: window.lucide.User },
  ];

  // ---- SCREENS ----

  function HomeScreen() {
    const filters = ['All', 'Tools', 'Childcare', 'Co-work', 'Social', 'Plants'];
    const filtered = filterActive === 'All' ? requests : requests.filter(r => r.category === filterActive);

    return React.createElement('div', {
      style: { flex: 1, overflowY: 'auto', background: t.bg, paddingBottom: 80 }
    },
      // Header
      React.createElement('div', {
        style: {
          padding: '16px 20px 12px',
          background: t.surface,
          borderBottom: `1px solid ${t.border}`,
        }
      },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' } },
          React.createElement('div', null,
            React.createElement('div', { style: { fontSize: 20, fontWeight: 800, color: t.text, letterSpacing: '-0.5px' } }, 'Kindred Loop'),
            React.createElement('div', { style: { fontSize: 13, color: t.textSub, marginTop: 2 } }, '📍 Hayes Valley · 11 active nearby'),
          ),
          React.createElement('div', { style: { display: 'flex', gap: 8, alignItems: 'center' } },
            React.createElement('div', {
              style: {
                width: 36, height: 36, borderRadius: '50%', background: t.primaryDim,
                display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', cursor: 'pointer'
              }
            },
              React.createElement(window.lucide.Bell, { size: 18, color: t.primary }),
              notifCount > 0 && React.createElement('div', {
                style: {
                  position: 'absolute', top: -2, right: -2, width: 16, height: 16,
                  background: t.primary, borderRadius: '50%', fontSize: 9,
                  color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700
                }
              }, notifCount)
            ),
          )
        ),
        // Filters
        React.createElement('div', {
          style: { display: 'flex', gap: 8, marginTop: 14, overflowX: 'auto', paddingBottom: 2 }
        },
          filters.map(f =>
            React.createElement('div', {
              key: f,
              onClick: () => setFilterActive(f),
              style: {
                padding: '6px 14px', borderRadius: 20, fontSize: 13, fontWeight: 600,
                whiteSpace: 'nowrap', cursor: 'pointer', flexShrink: 0,
                background: filterActive === f ? t.primary : t.pill,
                color: filterActive === f ? '#fff' : t.pillText,
                transition: 'all 0.15s ease',
              }
            }, f)
          )
        )
      ),

      // Pulse Banner
      React.createElement('div', {
        style: { margin: '16px 16px 0', borderRadius: 16, background: t.card, border: `1px solid ${t.border}`, overflow: 'hidden' }
      },
        React.createElement('div', {
          style: { padding: '14px 16px', background: `linear-gradient(135deg, ${t.primary}22 0%, ${t.teal}11 100%)` }
        },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 } },
            React.createElement('div', null,
              React.createElement('div', { style: { fontSize: 13, fontWeight: 700, color: t.text } }, 'Neighborhood Pulse'),
              React.createElement('div', { style: { fontSize: 12, color: t.textSub } }, 'Top needs this week in your area'),
            ),
            React.createElement(window.lucide.TrendingUp, { size: 18, color: t.primary })
          ),
          React.createElement('div', { style: { display: 'flex', gap: 8 } },
            pulseData.slice(0, 2).map(p =>
              React.createElement('div', {
                key: p.label,
                style: { flex: 1, background: t.card, borderRadius: 12, padding: '10px 12px' }
              },
                React.createElement('div', { style: { fontSize: 16, marginBottom: 4 } }, p.icon),
                React.createElement('div', { style: { fontSize: 12, fontWeight: 600, color: t.text, marginBottom: 4 } }, p.label),
                React.createElement('div', { style: { height: 4, borderRadius: 2, background: t.border, overflow: 'hidden' } },
                  React.createElement('div', {
                    style: { height: '100%', width: `${p.pct}%`, background: p.color, borderRadius: 2, transition: 'width 0.5s ease' }
                  })
                ),
                React.createElement('div', { style: { fontSize: 11, color: t.textSub, marginTop: 3 } }, `${p.pct}% match`)
              )
            )
          )
        )
      ),

      // Feed header
      React.createElement('div', {
        style: { padding: '16px 20px 8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }
      },
        React.createElement('div', { style: { fontSize: 15, fontWeight: 700, color: t.text } }, `${filtered.length} nearby requests`),
        React.createElement('div', { style: { fontSize: 13, color: t.primary, fontWeight: 600, cursor: 'pointer' } }, 'Sort ▾')
      ),

      // Cards
      React.createElement('div', { style: { padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 12 } },
        filtered.map(req =>
          React.createElement('div', {
            key: req.id,
            style: {
              background: t.card, borderRadius: 18, border: `1px solid ${t.border}`,
              overflow: 'hidden', boxShadow: `0 2px 12px ${t.shadow}`,
              transform: pressedBtn === `card-${req.id}` ? 'scale(0.98)' : 'scale(1)',
              transition: 'transform 0.15s ease'
            }
          },
            // Card top
            React.createElement('div', { style: { padding: '14px 16px 12px' } },
              // Row 1: Avatar + name + time + expire
              React.createElement('div', { style: { display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 10 } },
                React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10 } },
                  React.createElement('div', {
                    style: {
                      width: 36, height: 36, borderRadius: '50%', background: req.avatarColor + '33',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 12, fontWeight: 700, color: req.avatarColor,
                      border: `2px solid ${req.avatarColor}44`
                    }
                  }, req.avatar),
                  React.createElement('div', null,
                    React.createElement('div', { style: { fontSize: 14, fontWeight: 700, color: t.text } }, req.user),
                    React.createElement('div', { style: { fontSize: 12, color: t.textSub } }, `${req.distance} · ${req.time}`)
                  )
                ),
                React.createElement('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 } },
                  req.urgent && React.createElement('div', {
                    style: {
                      padding: '3px 8px', borderRadius: 8, background: t.primary + '22',
                      fontSize: 10, fontWeight: 700, color: t.primary
                    }
                  }, '⚡ URGENT'),
                  React.createElement('div', {
                    style: {
                      padding: '3px 8px', borderRadius: 8, background: t.cardAlt,
                      fontSize: 10, fontWeight: 600, color: t.textSub, display: 'flex', alignItems: 'center', gap: 3
                    }
                  },
                    React.createElement(window.lucide.Clock, { size: 10, color: t.textMuted }),
                    React.createElement('span', null, req.expires)
                  )
                )
              ),
              // Category badge
              React.createElement('div', {
                style: {
                  display: 'inline-flex', alignItems: 'center', gap: 4,
                  padding: '4px 10px', borderRadius: 10, marginBottom: 8,
                  background: req.categoryColor + '22', fontSize: 11, fontWeight: 700, color: req.categoryColor
                }
              }, req.category),
              // Title
              React.createElement('div', { style: { fontSize: 15, fontWeight: 700, color: t.text, lineHeight: 1.4, marginBottom: 6 } }, req.title),
              // Desc
              React.createElement('div', { style: { fontSize: 13, color: t.textSub, lineHeight: 1.5, marginBottom: 10 } }, req.desc),
              // Trust badge
              React.createElement('div', {
                style: {
                  display: 'flex', alignItems: 'center', gap: 6, padding: '6px 10px',
                  borderRadius: 10, background: t.cardAlt, marginBottom: 10
                }
              },
                React.createElement('span', { style: { fontSize: 14 } }, req.trustIcon),
                React.createElement('span', { style: { fontSize: 12, color: t.textSub, fontWeight: 500 } }, req.trust),
                React.createElement(window.lucide.ShieldCheck, { size: 12, color: t.teal, style: { marginLeft: 'auto' } })
              ),
              // Actions
              React.createElement('div', { style: { display: 'flex', gap: 8 } },
                React.createElement('div', {
                  onClick: () => { handlePress(`offer-${req.id}`); handleOffer(req.id); },
                  style: {
                    flex: 1, padding: '10px', borderRadius: 12, textAlign: 'center',
                    cursor: 'pointer', fontSize: 13, fontWeight: 700,
                    background: offeredIds.includes(req.id) ? t.tealDim : t.primary,
                    color: offeredIds.includes(req.id) ? t.teal : '#fff',
                    border: offeredIds.includes(req.id) ? `1.5px solid ${t.teal}` : 'none',
                    transform: pressedBtn === `offer-${req.id}` ? 'scale(0.96)' : 'scale(1)',
                    transition: 'all 0.15s ease',
                  }
                }, offeredIds.includes(req.id) ? '✓ Offered' : 'I can help'),
                React.createElement('div', {
                  onClick: () => { handlePress(`like-${req.id}`); toggleLike(req.id); },
                  style: {
                    width: 42, height: 42, borderRadius: 12, display: 'flex',
                    alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                    background: likedIds.includes(req.id) ? '#FF6B4722' : t.cardAlt,
                    border: likedIds.includes(req.id) ? `1.5px solid ${t.primary}` : `1px solid ${t.border}`,
                    transform: pressedBtn === `like-${req.id}` ? 'scale(0.9)' : 'scale(1)',
                    transition: 'all 0.15s ease',
                  }
                },
                  React.createElement(window.lucide.Heart, {
                    size: 18,
                    color: likedIds.includes(req.id) ? t.primary : t.textMuted,
                    fill: likedIds.includes(req.id) ? t.primary : 'none'
                  })
                ),
                React.createElement('div', {
                  style: {
                    width: 42, height: 42, borderRadius: 12, display: 'flex',
                    alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                    background: t.cardAlt, border: `1px solid ${t.border}`
                  }
                },
                  React.createElement(window.lucide.MessageCircle, { size: 18, color: t.textMuted })
                )
              )
            ),
            // Offers count bar
            React.createElement('div', {
              style: {
                padding: '8px 16px', background: t.cardAlt,
                borderTop: `1px solid ${t.border}`,
                display: 'flex', alignItems: 'center', gap: 6
              }
            },
              React.createElement(window.lucide.Users, { size: 13, color: t.textMuted }),
              React.createElement('span', { style: { fontSize: 12, color: t.textSub } },
                `${req.offers + (offeredIds.includes(req.id) ? 1 : 0)} people offered to help`
              ),
              React.createElement('div', { style: { marginLeft: 'auto', display: 'flex', gap: 4 } },
                req.tags.map(tag =>
                  React.createElement('span', {
                    key: tag,
                    style: { fontSize: 10, padding: '2px 8px', borderRadius: 6, background: t.pill, color: t.pillText, fontWeight: 600 }
                  }, tag)
                )
              )
            )
          )
        )
      )
    );
  }

  function DiscoverScreen() {
    const mapPins = [
      { id: 1, x: 60, y: 80, color: '#FFB547', label: 'Ladder', emoji: '🔧' },
      { id: 2, x: 130, y: 130, color: '#9B7FFF', label: 'Stroller', emoji: '👶' },
      { id: 3, x: 220, y: 90, color: '#40D9C0', label: 'Co-work', emoji: '💻' },
      { id: 4, x: 85, y: 180, color: '#FF6B47', label: 'Plants', emoji: '🌱' },
      { id: 5, x: 260, y: 170, color: '#FF6B47', label: 'Dinner', emoji: '🍜' },
    ];

    return React.createElement('div', {
      style: { flex: 1, overflowY: 'auto', background: t.bg, paddingBottom: 80 }
    },
      // Header
      React.createElement('div', { style: { padding: '16px 20px 12px', background: t.surface, borderBottom: `1px solid ${t.border}` } },
        React.createElement('div', { style: { fontSize: 18, fontWeight: 800, color: t.text, marginBottom: 12 } }, 'Discover'),
        React.createElement('div', {
          style: {
            display: 'flex', alignItems: 'center', gap: 10,
            background: t.inputBg, borderRadius: 14, padding: '10px 14px',
            border: `1.5px solid ${t.inputBorder}`
          }
        },
          React.createElement(window.lucide.Search, { size: 16, color: t.textMuted }),
          React.createElement('input', {
            placeholder: 'Search skills, needs, names...',
            value: searchQuery,
            onChange: e => setSearchQuery(e.target.value),
            style: {
              border: 'none', background: 'transparent', outline: 'none',
              fontSize: 14, color: t.text, flex: 1, fontFamily: 'Plus Jakarta Sans, sans-serif'
            }
          })
        )
      ),

      // Map view
      React.createElement('div', {
        style: {
          margin: '16px 16px 0', borderRadius: 18, overflow: 'hidden',
          height: 230, position: 'relative', background: t.mapBg,
          border: `1px solid ${t.border}`
        }
      },
        // Grid lines
        React.createElement('svg', { width: '100%', height: '100%', style: { position: 'absolute', top: 0, left: 0 } },
          React.createElement('defs', null,
            React.createElement('pattern', { id: 'grid', width: 30, height: 30, patternUnits: 'userSpaceOnUse' },
              React.createElement('path', { d: 'M 30 0 L 0 0 0 30', fill: 'none', stroke: t.border, strokeWidth: 0.8, opacity: 0.6 })
            )
          ),
          React.createElement('rect', { width: '100%', height: '100%', fill: 'url(#grid)' }),
          // "Roads"
          React.createElement('line', { x1: '0', y1: '115', x2: '100%', y2: '115', stroke: t.border, strokeWidth: 2, opacity: 0.8 }),
          React.createElement('line', { x1: '165', y1: '0', x2: '165', y2: '100%', stroke: t.border, strokeWidth: 2, opacity: 0.8 }),
          React.createElement('line', { x1: '0', y1: '165', x2: '100%', y2: '165', stroke: t.border, strokeWidth: 1.2, opacity: 0.5 }),
        ),
        // You marker
        React.createElement('div', {
          style: {
            position: 'absolute', left: '47%', top: '47%', transform: 'translate(-50%,-50%)',
            width: 40, height: 40, borderRadius: '50%', background: `${t.primary}33`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: `3px solid ${t.primary}`,
          }
        },
          React.createElement('div', { style: { width: 14, height: 14, borderRadius: '50%', background: t.primary } })
        ),
        React.createElement('div', {
          style: {
            position: 'absolute', left: '47%', top: '47%',
            transform: 'translate(6px, -28px)',
            fontSize: 10, fontWeight: 700, color: t.primary,
            background: t.surface, padding: '2px 6px', borderRadius: 6, border: `1px solid ${t.primary}44`
          }
        }, 'You'),
        // Pulse ring
        React.createElement('div', {
          style: {
            position: 'absolute', left: '47%', top: '47%',
            transform: 'translate(-50%,-50%)',
            width: 110, height: 110, borderRadius: '50%',
            border: `1.5px dashed ${t.primary}44`,
          }
        }),
        // Pins
        mapPins.map(pin =>
          React.createElement('div', {
            key: pin.id,
            onClick: () => setMapSelected(mapSelected === pin.id ? null : pin.id),
            style: {
              position: 'absolute', left: pin.x, top: pin.y,
              transform: 'translate(-50%,-50%)',
              cursor: 'pointer',
              zIndex: mapSelected === pin.id ? 10 : 1
            }
          },
            React.createElement('div', {
              style: {
                width: 36, height: 36, borderRadius: '50%',
                background: pin.color, display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: 16,
                boxShadow: `0 2px 12px ${pin.color}66`,
                border: `2px solid ${t.surface}`,
                transform: mapSelected === pin.id ? 'scale(1.3)' : 'scale(1)',
                transition: 'transform 0.2s ease'
              }
            }, pin.emoji),
            mapSelected === pin.id && React.createElement('div', {
              style: {
                position: 'absolute', bottom: '110%', left: '50%', transform: 'translateX(-50%)',
                background: t.surface, borderRadius: 10, padding: '6px 12px',
                fontSize: 12, fontWeight: 700, color: t.text, whiteSpace: 'nowrap',
                boxShadow: `0 4px 16px ${t.shadow}`, border: `1px solid ${t.border}`
              }
            }, pin.label)
          )
        ),
        // Map controls
        React.createElement('div', {
          style: {
            position: 'absolute', right: 12, top: 12, display: 'flex', flexDirection: 'column', gap: 4
          }
        },
          ['＋', '－'].map(s =>
            React.createElement('div', {
              key: s,
              style: {
                width: 30, height: 30, borderRadius: 8, background: t.surface,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 16, cursor: 'pointer', border: `1px solid ${t.border}`,
                color: t.text, fontWeight: 700
              }
            }, s)
          )
        ),
        React.createElement('div', {
          style: {
            position: 'absolute', left: 12, bottom: 12,
            background: t.surface, borderRadius: 8, padding: '5px 10px',
            fontSize: 11, color: t.textSub, border: `1px solid ${t.border}`
          }
        }, '5 requests in range')
      ),

      // Nearby people
      React.createElement('div', { style: { padding: '20px 20px 8px' } },
        React.createElement('div', { style: { fontSize: 15, fontWeight: 700, color: t.text, marginBottom: 14 } }, 'People nearby'),
        React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 10 } },
          nearbyPeople.filter(p =>
            searchQuery === '' || p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
          ).map(person =>
            React.createElement('div', {
              key: person.name,
              style: {
                background: t.card, borderRadius: 14, padding: '12px 14px',
                border: `1px solid ${t.border}`,
                display: 'flex', alignItems: 'center', gap: 12
              }
            },
              React.createElement('div', {
                style: {
                  width: 42, height: 42, borderRadius: '50%', background: person.color + '33',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 13, fontWeight: 700, color: person.color, flexShrink: 0,
                  border: `2px solid ${person.color}55`
                }
              }, person.avatar),
              React.createElement('div', { style: { flex: 1, minWidth: 0 } },
                React.createElement('div', { style: { fontSize: 14, fontWeight: 700, color: t.text } }, person.name),
                React.createElement('div', { style: { fontSize: 12, color: t.textSub } }, person.role),
                React.createElement('div', { style: { display: 'flex', gap: 5, marginTop: 5 } },
                  person.skills.map(s =>
                    React.createElement('span', {
                      key: s,
                      style: { fontSize: 10, padding: '2px 8px', borderRadius: 6, background: t.pill, color: t.pillText, fontWeight: 600 }
                    }, s)
                  )
                )
              ),
              React.createElement('div', {
                style: {
                  fontSize: 11, padding: '4px 8px', borderRadius: 8, fontWeight: 700,
                  background: person.free === 'Free now' ? t.tealDim : t.pill,
                  color: person.free === 'Free now' ? t.teal : t.textSub,
                  border: person.free === 'Free now' ? `1px solid ${t.teal}55` : 'none',
                  whiteSpace: 'nowrap'
                }
              }, person.free)
            )
          )
        )
      )
    );
  }

  function PostScreen() {
    const categories = [
      { label: 'Tools', icon: '🔧', color: '#FFB547' },
      { label: 'Childcare', icon: '👶', color: '#9B7FFF' },
      { label: 'Co-work', icon: '💻', color: '#40D9C0' },
      { label: 'Plants', icon: '🌱', color: '#40D9C0' },
      { label: 'Social', icon: '☕', color: '#FF6B47' },
      { label: 'Moving', icon: '📦', color: '#FFB547' },
      { label: 'Pets', icon: '🐾', color: '#9B7FFF' },
      { label: 'Other', icon: '✦', color: '#7B87A6' },
    ];
    const durations = ['15 min', '30 min', '1 hour', '2 hours', 'Half day'];
    const expires = ['30 min', '1 hour', '2 hours', '4 hours', 'Tomorrow'];

    if (postSuccess) {
      return React.createElement('div', {
        style: {
          flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', background: t.bg, paddingBottom: 80, padding: '40px 24px'
        }
      },
        React.createElement('div', {
          style: {
            width: 80, height: 80, borderRadius: '50%', background: t.tealDim,
            display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20,
            border: `2px solid ${t.teal}`
          }
        }, React.createElement(window.lucide.Check, { size: 36, color: t.teal })),
        React.createElement('div', { style: { fontSize: 22, fontWeight: 800, color: t.text, marginBottom: 8, textAlign: 'center' } }, 'Request Posted!'),
        React.createElement('div', { style: { fontSize: 14, color: t.textSub, textAlign: 'center', lineHeight: 1.6, marginBottom: 28 } },
          `Your request is live. ${Math.floor(Math.random() * 4) + 2} neighbors nearby may be a match.`
        ),
        React.createElement('div', {
          onClick: () => { setPostSuccess(false); setPostStep(0); setPostData({ category: '', title: '', desc: '', duration: '30 min', expires: '2 hours' }); setActiveTab('home'); },
          style: {
            padding: '14px 32px', borderRadius: 14, background: t.primary,
            color: '#fff', fontWeight: 700, fontSize: 15, cursor: 'pointer'
          }
        }, 'Back to Feed'),
        React.createElement('div', {
          onClick: () => { setPostSuccess(false); setPostStep(0); setPostData({ category: '', title: '', desc: '', duration: '30 min', expires: '2 hours' }); },
          style: { marginTop: 12, fontSize: 14, color: t.primary, fontWeight: 600, cursor: 'pointer' }
        }, 'Post another')
      );
    }

    return React.createElement('div', {
      style: { flex: 1, overflowY: 'auto', background: t.bg, paddingBottom: 80 }
    },
      React.createElement('div', { style: { padding: '16px 20px', background: t.surface, borderBottom: `1px solid ${t.border}` } },
        React.createElement('div', { style: { fontSize: 18, fontWeight: 800, color: t.text } }, 'New Request'),
        React.createElement('div', { style: { fontSize: 13, color: t.textSub, marginTop: 2 } }, 'Small, specific, and time-boxed'),
        // Progress
        React.createElement('div', { style: { display: 'flex', gap: 6, marginTop: 16 } },
          [0, 1, 2].map(i =>
            React.createElement('div', {
              key: i,
              style: {
                flex: 1, height: 4, borderRadius: 2,
                background: i <= postStep ? t.primary : t.border,
                transition: 'background 0.3s ease'
              }
            })
          )
        )
      ),
      React.createElement('div', { style: { padding: '20px 20px' } },
        // Step 0: Category
        postStep === 0 && React.createElement('div', null,
          React.createElement('div', { style: { fontSize: 17, fontWeight: 700, color: t.text, marginBottom: 6 } }, 'What do you need?'),
          React.createElement('div', { style: { fontSize: 13, color: t.textSub, marginBottom: 20 } }, 'Choose the type that fits best'),
          React.createElement('div', {
            style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }
          },
            categories.map(cat =>
              React.createElement('div', {
                key: cat.label,
                onClick: () => { setPostData(p => ({ ...p, category: cat.label })); },
                style: {
                  padding: '16px', borderRadius: 16, cursor: 'pointer',
                  background: postData.category === cat.label ? cat.color + '22' : t.card,
                  border: `2px solid ${postData.category === cat.label ? cat.color : t.border}`,
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
                  transition: 'all 0.15s ease'
                }
              },
                React.createElement('span', { style: { fontSize: 26 } }, cat.icon),
                React.createElement('span', { style: { fontSize: 13, fontWeight: 600, color: postData.category === cat.label ? cat.color : t.text } }, cat.label)
              )
            )
          ),
          React.createElement('div', {
            onClick: () => postData.category && setPostStep(1),
            style: {
              marginTop: 24, padding: '14px', borderRadius: 14, textAlign: 'center',
              background: postData.category ? t.primary : t.border,
              color: postData.category ? '#fff' : t.textMuted,
              fontWeight: 700, fontSize: 15, cursor: postData.category ? 'pointer' : 'default',
              transition: 'all 0.2s ease'
            }
          }, 'Continue →')
        ),

        // Step 1: Details
        postStep === 1 && React.createElement('div', null,
          React.createElement('div', { style: { fontSize: 17, fontWeight: 700, color: t.text, marginBottom: 6 } }, 'Describe your request'),
          React.createElement('div', { style: { fontSize: 13, color: t.textSub, marginBottom: 20 } }, 'Be specific — it helps with matching'),
          React.createElement('div', { style: { marginBottom: 16 } },
            React.createElement('label', { style: { fontSize: 13, fontWeight: 600, color: t.textSub, marginBottom: 8, display: 'block' } }, 'Title'),
            React.createElement('input', {
              placeholder: 'e.g. Borrow a step ladder for 20 min',
              value: postData.title,
              onChange: e => setPostData(p => ({ ...p, title: e.target.value })),
              style: {
                width: '100%', padding: '12px 14px', borderRadius: 12,
                background: t.inputBg, border: `1.5px solid ${t.inputBorder}`,
                fontSize: 14, color: t.text, outline: 'none',
                fontFamily: 'Plus Jakarta Sans, sans-serif', boxSizing: 'border-box'
              }
            })
          ),
          React.createElement('div', { style: { marginBottom: 16 } },
            React.createElement('label', { style: { fontSize: 13, fontWeight: 600, color: t.textSub, marginBottom: 8, display: 'block' } }, 'Details (optional)'),
            React.createElement('textarea', {
              placeholder: 'Any extra context that helps people respond...',
              value: postData.desc,
              onChange: e => setPostData(p => ({ ...p, desc: e.target.value })),
              rows: 3,
              style: {
                width: '100%', padding: '12px 14px', borderRadius: 12,
                background: t.inputBg, border: `1.5px solid ${t.inputBorder}`,
                fontSize: 14, color: t.text, outline: 'none', resize: 'none',
                fontFamily: 'Plus Jakarta Sans, sans-serif', boxSizing: 'border-box'
              }
            })
          ),
          React.createElement('div', { style: { marginBottom: 20 } },
            React.createElement('label', { style: { fontSize: 13, fontWeight: 600, color: t.textSub, marginBottom: 10, display: 'block' } }, 'Duration needed'),
            React.createElement('div', { style: { display: 'flex', flexWrap: 'wrap', gap: 8 } },
              durations.map(d =>
                React.createElement('div', {
                  key: d,
                  onClick: () => setPostData(p => ({ ...p, duration: d })),
                  style: {
                    padding: '8px 14px', borderRadius: 10, cursor: 'pointer',
                    background: postData.duration === d ? t.primary : t.pill,
                    color: postData.duration === d ? '#fff' : t.pillText,
                    fontSize: 13, fontWeight: 600, transition: 'all 0.15s ease'
                  }
                }, d)
              )
            )
          ),
          React.createElement('div', { style: { display: 'flex', gap: 10 } },
            React.createElement('div', {
              onClick: () => setPostStep(0),
              style: {
                flex: 1, padding: '14px', borderRadius: 14, textAlign: 'center',
                background: t.pill, color: t.pillText, fontWeight: 700, fontSize: 15, cursor: 'pointer'
              }
            }, '← Back'),
            React.createElement('div', {
              onClick: () => postData.title && setPostStep(2),
              style: {
                flex: 2, padding: '14px', borderRadius: 14, textAlign: 'center',
                background: postData.title ? t.primary : t.border,
                color: postData.title ? '#fff' : t.textMuted,
                fontWeight: 700, fontSize: 15, cursor: postData.title ? 'pointer' : 'default',
                transition: 'all 0.2s ease'
              }
            }, 'Continue →')
          )
        ),

        // Step 2: Timing & Trust
        postStep === 2 && React.createElement('div', null,
          React.createElement('div', { style: { fontSize: 17, fontWeight: 700, color: t.text, marginBottom: 6 } }, 'Timing & visibility'),
          React.createElement('div', { style: { fontSize: 13, color: t.textSub, marginBottom: 20 } }, 'When should this expire?'),
          React.createElement('div', { style: { marginBottom: 20 } },
            React.createElement('label', { style: { fontSize: 13, fontWeight: 600, color: t.textSub, marginBottom: 10, display: 'block' } }, 'Expires in'),
            React.createElement('div', { style: { display: 'flex', flexWrap: 'wrap', gap: 8 } },
              expires.map(e =>
                React.createElement('div', {
                  key: e,
                  onClick: () => setPostData(p => ({ ...p, expires: e })),
                  style: {
                    padding: '8px 14px', borderRadius: 10, cursor: 'pointer',
                    background: postData.expires === e ? t.primary : t.pill,
                    color: postData.expires === e ? '#fff' : t.pillText,
                    fontSize: 13, fontWeight: 600, transition: 'all 0.15s ease'
                  }
                }, e)
              )
            )
          ),
          // Trust preview card
          React.createElement('div', {
            style: {
              background: t.card, borderRadius: 16, padding: '16px',
              border: `1px solid ${t.border}`, marginBottom: 24
            }
          },
            React.createElement('div', { style: { fontSize: 13, fontWeight: 700, color: t.text, marginBottom: 12 } }, 'Preview'),
            React.createElement('div', {
              style: {
                display: 'inline-flex', alignItems: 'center', gap: 4,
                padding: '4px 10px', borderRadius: 10, marginBottom: 8,
                background: '#FFB54722', fontSize: 11, fontWeight: 700, color: '#FFB547'
              }
            }, postData.category || 'Category'),
            React.createElement('div', { style: { fontSize: 15, fontWeight: 700, color: t.text, marginBottom: 4 } },
              postData.title || 'Your request title...'
            ),
            React.createElement('div', { style: { fontSize: 13, color: t.textSub } },
              `⏱ ${postData.duration} · Expires in ${postData.expires}`
            ),
            React.createElement('div', {
              style: {
                marginTop: 10, padding: '8px 12px', borderRadius: 10,
                background: t.cardAlt, fontSize: 12, color: t.textSub,
                display: 'flex', alignItems: 'center', gap: 6
              }
            },
              React.createElement(window.lucide.MapPin, { size: 12, color: t.textMuted }),
              'Visible to people within 1.5 mi'
            )
          ),
          React.createElement('div', { style: { display: 'flex', gap: 10 } },
            React.createElement('div', {
              onClick: () => setPostStep(1),
              style: {
                flex: 1, padding: '14px', borderRadius: 14, textAlign: 'center',
                background: t.pill, color: t.pillText, fontWeight: 700, fontSize: 15, cursor: 'pointer'
              }
            }, '← Back'),
            React.createElement('div', {
              onClick: () => setPostSuccess(true),
              style: {
                flex: 2, padding: '14px', borderRadius: 14, textAlign: 'center',
                background: t.primary, color: '#fff', fontWeight: 700, fontSize: 15, cursor: 'pointer'
              }
            }, 'Post Request')
          )
        )
      )
    );
  }

  function LoopScreen() {
    const total = reciprocity.gave + reciprocity.received;
    const gaveRatio = total > 0 ? Math.round((reciprocity.gave / total) * 100) : 50;
    const score = Math.round((reciprocity.gave + reciprocity.received) * 10 / 2);

    return React.createElement('div', {
      style: { flex: 1, overflowY: 'auto', background: t.bg, paddingBottom: 80 }
    },
      React.createElement('div', { style: { padding: '16px 20px 12px', background: t.surface, borderBottom: `1px solid ${t.border}` } },
        React.createElement('div', { style: { fontSize: 18, fontWeight: 800, color: t.text } }, 'Your Loop'),
        React.createElement('div', { style: { fontSize: 13, color: t.textSub, marginTop: 2 } }, 'Trust circles & reciprocity')
      ),

      // Reciprocity card
      React.createElement('div', { style: { margin: '16px 16px 0' } },
        React.createElement('div', {
          style: {
            borderRadius: 20, padding: '20px',
            background: `linear-gradient(135deg, ${t.primary}22 0%, ${t.purple}11 100%)`,
            border: `1px solid ${t.border}`
          }
        },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 18 } },
            React.createElement('div', null,
              React.createElement('div', { style: { fontSize: 13, fontWeight: 600, color: t.textSub } }, 'Reciprocity Score'),
              React.createElement('div', { style: { fontSize: 32, fontWeight: 800, color: t.text, marginTop: 2 } }, score),
              React.createElement('div', { style: { fontSize: 12, color: t.textSub } }, 'Balanced & growing'),
            ),
            React.createElement('div', {
              style: {
                width: 56, height: 56, borderRadius: '50%',
                background: t.primary, display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: `0 4px 20px ${t.primary}66`
              }
            }, React.createElement(window.lucide.RefreshCw, { size: 26, color: '#fff' }))
          ),
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: 8 } },
            React.createElement('div', { style: { textAlign: 'center' } },
              React.createElement('div', { style: { fontSize: 24, fontWeight: 800, color: t.teal } }, reciprocity.gave),
              React.createElement('div', { style: { fontSize: 12, color: t.textSub, marginTop: 2 } }, 'Times helped')
            ),
            React.createElement('div', { style: { textAlign: 'center' } },
              React.createElement('div', { style: { fontSize: 24, fontWeight: 800, color: t.secondary } }, reciprocity.received),
              React.createElement('div', { style: { fontSize: 12, color: t.textSub, marginTop: 2 } }, 'Times received')
            ),
            React.createElement('div', { style: { textAlign: 'center' } },
              React.createElement('div', { style: { fontSize: 24, fontWeight: 800, color: t.primary } }, `${gaveRatio}%`),
              React.createElement('div', { style: { fontSize: 12, color: t.textSub, marginTop: 2 } }, 'Give ratio')
            )
          ),
          // Bar
          React.createElement('div', {
            style: { height: 8, borderRadius: 4, background: t.border, overflow: 'hidden', marginTop: 12 }
          },
            React.createElement('div', {
              style: {
                height: '100%', width: `${gaveRatio}%`, borderRadius: 4,
                background: `linear-gradient(90deg, ${t.teal}, ${t.primary})`,
                transition: 'width 0.5s ease'
              }
            })
          ),
          React.createElement('div', {
            style: { display: 'flex', justifyContent: 'space-between', marginTop: 6 }
          },
            React.createElement('span', { style: { fontSize: 10, color: t.teal, fontWeight: 600 } }, 'Helped others'),
            React.createElement('span', { style: { fontSize: 10, color: t.secondary, fontWeight: 600 } }, 'Received help')
          )
        )
      ),

      // My circles
      React.createElement('div', { style: { padding: '20px 20px 10px' } },
        React.createElement('div', { style: { fontSize: 15, fontWeight: 700, color: t.text, marginBottom: 14 } }, 'My Trust Circles'),
        React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 10 } },
          myLoop.map(circle =>
            React.createElement('div', {
              key: circle.name,
              style: {
                background: t.card, borderRadius: 14, padding: '14px 16px',
                border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', gap: 12
              }
            },
              React.createElement('div', {
                style: {
                  width: 44, height: 44, borderRadius: 12, background: circle.color + '22',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 22, border: `1.5px solid ${circle.color}44`
                }
              }, circle.icon),
              React.createElement('div', { style: { flex: 1 } },
                React.createElement('div', { style: { fontSize: 14, fontWeight: 700, color: t.text } }, circle.name),
                React.createElement('div', { style: { fontSize: 12, color: t.textSub, marginTop: 2 } }, `${circle.members} members · ${circle.type}`)
              ),
              React.createElement(window.lucide.ChevronRight, { size: 18, color: t.textMuted })
            )
          )
        )
      ),

      // Activity
      React.createElement('div', { style: { padding: '0 20px 20px' } },
        React.createElement('div', { style: { fontSize: 15, fontWeight: 700, color: t.text, marginBottom: 14 } }, 'Recent Activity'),
        React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 10 } },
          loopActivity.map((act, i) =>
            React.createElement('div', {
              key: i,
              style: {
                background: t.card, borderRadius: 14, padding: '12px 14px',
                border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', gap: 12
              }
            },
              React.createElement('div', {
                style: {
                  width: 38, height: 38, borderRadius: '50%', background: act.color + '33',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 12, fontWeight: 700, color: act.color, flexShrink: 0
                }
              }, act.avatar),
              React.createElement('div', { style: { flex: 1, minWidth: 0 } },
                React.createElement('div', { style: { fontSize: 13, fontWeight: 600, color: t.text } },
                  act.type === 'gave'
                    ? `You helped ${act.target} · ${act.thing}`
                    : `${act.user} · ${act.thing}`
                ),
                React.createElement('div', { style: { fontSize: 11, color: t.textSub, marginTop: 2 } }, act.time)
              ),
              React.createElement('div', {
                style: {
                  padding: '4px 8px', borderRadius: 8, fontSize: 11, fontWeight: 700,
                  background: act.type === 'gave' ? t.tealDim : t.secondaryDim,
                  color: act.type === 'gave' ? t.teal : t.secondary
                }
              }, act.type === 'gave' ? 'Gave' : 'Got')
            )
          )
        )
      )
    );
  }

  function ProfileScreen() {
    const [activeSection, setActiveSection] = useState('activity');
    const skills = ['Moving help', 'Tech support', 'Co-working', 'Dog walking', 'Cooking'];

    return React.createElement('div', {
      style: { flex: 1, overflowY: 'auto', background: t.bg, paddingBottom: 80 }
    },
      // Header gradient
      React.createElement('div', {
        style: {
          background: `linear-gradient(160deg, ${t.primary}44 0%, ${t.purple}22 100%)`,
          padding: '20px 20px 60px', position: 'relative', borderBottom: `1px solid ${t.border}`
        }
      },
        // Theme toggle + settings
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 } },
          React.createElement('div', { style: { fontSize: 18, fontWeight: 800, color: t.text } }, 'Profile'),
          React.createElement('div', { style: { display: 'flex', gap: 8 } },
            React.createElement('div', {
              onClick: () => setTheme(theme === 'dark' ? 'light' : 'dark'),
              style: {
                width: 36, height: 36, borderRadius: '50%', background: t.card,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', border: `1px solid ${t.border}`,
                boxShadow: `0 2px 8px ${t.shadow}`
              }
            },
              theme === 'dark'
                ? React.createElement(window.lucide.Sun, { size: 18, color: t.secondary })
                : React.createElement(window.lucide.Moon, { size: 18, color: t.purple })
            ),
            React.createElement('div', {
              style: {
                width: 36, height: 36, borderRadius: '50%', background: t.card,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', border: `1px solid ${t.border}`
              }
            },
              React.createElement(window.lucide.Settings, { size: 18, color: t.textSub })
            )
          )
        ),
        // Avatar
        React.createElement('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'center' } },
          React.createElement('div', {
            style: {
              width: 72, height: 72, borderRadius: '50%',
              background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 28, fontWeight: 800, color: '#fff',
              border: `3px solid ${t.surface}`,
              boxShadow: `0 4px 20px ${t.primary}55`
            }
          }, 'SC'),
          React.createElement('div', { style: { fontSize: 18, fontWeight: 800, color: t.text, marginTop: 10 } }, 'Sarah Chen'),
          React.createElement('div', { style: { fontSize: 13, color: t.textSub } }, '📍 Hayes Valley · Member since Jan 2025'),
        )
      ),

      // Stats row
      React.createElement('div', {
        style: {
          margin: '-30px 20px 0', background: t.card, borderRadius: 18,
          padding: '16px', border: `1px solid ${t.border}`,
          boxShadow: `0 4px 16px ${t.shadow}`, display: 'flex'
        }
      },
        [
          { label: 'Helped', val: reciprocity.gave, color: t.teal },
          { label: 'Received', val: reciprocity.received, color: t.secondary },
          { label: 'Circles', val: 4, color: t.purple },
          { label: 'Score', val: score => reciprocity.gave * 10, color: t.primary },
        ].map((stat, i) =>
          React.createElement('div', {
            key: stat.label,
            style: {
              flex: 1, textAlign: 'center',
              borderRight: i < 3 ? `1px solid ${t.border}` : 'none'
            }
          },
            React.createElement('div', { style: { fontSize: 20, fontWeight: 800, color: stat.color } },
              typeof stat.val === 'function' ? stat.val() : stat.val
            ),
            React.createElement('div', { style: { fontSize: 11, color: t.textSub, marginTop: 2 } }, stat.label)
          )
        )
      ),

      React.createElement('div', { style: { padding: '20px 20px 0' } },
        // Skills
        React.createElement('div', { style: { marginBottom: 20 } },
          React.createElement('div', { style: { fontSize: 15, fontWeight: 700, color: t.text, marginBottom: 12 } }, 'My Skills'),
          React.createElement('div', { style: { display: 'flex', flexWrap: 'wrap', gap: 8 } },
            skills.map(s =>
              React.createElement('div', {
                key: s,
                style: {
                  padding: '8px 14px', borderRadius: 12, background: t.primaryDim,
                  color: t.primary, fontSize: 13, fontWeight: 600,
                  border: `1.5px solid ${t.primary}44`
                }
              }, s)
            ),
            React.createElement('div', {
              style: {
                padding: '8px 14px', borderRadius: 12, background: t.pill,
                color: t.textSub, fontSize: 13, fontWeight: 600,
                border: `1.5px dashed ${t.border}`, cursor: 'pointer'
              }
            }, '+ Add skill')
          )
        ),

        // Availability
        React.createElement('div', { style: { marginBottom: 20 } },
          React.createElement('div', { style: { fontSize: 15, fontWeight: 700, color: t.text, marginBottom: 12 } }, 'Availability'),
          React.createElement('div', {
            style: {
              background: t.card, borderRadius: 14, padding: '14px',
              border: `1px solid ${t.border}`
            }
          },
            React.createElement('div', { style: { display: 'flex', gap: 6, marginBottom: 10 } },
              ['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) =>
                React.createElement('div', {
                  key: i,
                  style: {
                    flex: 1, height: 36, borderRadius: 8,
                    background: [0, 2, 4].includes(i) ? t.tealDim : t.cardAlt,
                    border: [0, 2, 4].includes(i) ? `1.5px solid ${t.teal}55` : `1px solid ${t.border}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 11, fontWeight: 700,
                    color: [0, 2, 4].includes(i) ? t.teal : t.textMuted,
                    cursor: 'pointer'
                  }
                }, day)
              )
            ),
            React.createElement('div', { style: { fontSize: 12, color: t.textSub } }, '⏰ Usually free mornings on available days')
          )
        ),

        // Settings
        React.createElement('div', { style: { marginBottom: 20 } },
          React.createElement('div', { style: { fontSize: 15, fontWeight: 700, color: t.text, marginBottom: 12 } }, 'Settings'),
          React.createElement('div', { style: { background: t.card, borderRadius: 16, border: `1px solid ${t.border}`, overflow: 'hidden' } },
            [
              { icon: window.lucide.Bell, label: 'Notifications', val: 'On', color: t.primary },
              { icon: window.lucide.MapPin, label: 'Location radius', val: '1.5 mi', color: t.teal },
              { icon: window.lucide.ShieldCheck, label: 'Trust level', val: 'Verified', color: t.secondary },
              { icon: window.lucide.Eye, label: 'Visibility', val: 'Circles + nearby', color: t.purple },
            ].map((item, i) =>
              React.createElement('div', {
                key: item.label,
                style: {
                  padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12,
                  borderBottom: i < 3 ? `1px solid ${t.border}` : 'none',
                  cursor: 'pointer'
                }
              },
                React.createElement('div', {
                  style: {
                    width: 32, height: 32, borderRadius: 8,
                    background: item.color + '22',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }
                }, React.createElement(item.icon, { size: 16, color: item.color })),
                React.createElement('span', { style: { fontSize: 14, fontWeight: 500, color: t.text, flex: 1 } }, item.label),
                React.createElement('span', { style: { fontSize: 13, color: t.textSub } }, item.val),
                React.createElement(window.lucide.ChevronRight, { size: 16, color: t.textMuted })
              )
            )
          )
        )
      )
    );
  }

  const screens = {
    home: HomeScreen,
    discover: DiscoverScreen,
    post: PostScreen,
    loop: LoopScreen,
    profile: ProfileScreen,
  };

  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const timeStr = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return React.createElement('div', {
    style: {
      minHeight: '100vh', background: '#e0e0e8',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'Plus Jakarta Sans, sans-serif',
      padding: '20px'
    }
  },
    React.createElement('div', {
      style: {
        width: 375, height: 812, borderRadius: 52,
        background: t.bg, overflow: 'hidden',
        boxShadow: '0 30px 80px rgba(0,0,0,0.4), 0 0 0 2px rgba(255,255,255,0.08)',
        display: 'flex', flexDirection: 'column', position: 'relative',
        border: `1px solid ${t.border}`,
        fontFamily: 'Plus Jakarta Sans, sans-serif'
      }
    },
      // Status bar
      React.createElement('div', {
        style: {
          height: 48, background: t.surface, paddingInline: 28,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          position: 'relative', zIndex: 10, flexShrink: 0
        }
      },
        React.createElement('span', { style: { fontSize: 13, fontWeight: 700, color: t.statusBar } }, timeStr),
        // Dynamic Island
        React.createElement('div', {
          style: {
            position: 'absolute', left: '50%', top: 10, transform: 'translateX(-50%)',
            width: 110, height: 28, background: '#000',
            borderRadius: 20, zIndex: 20
          }
        }),
        React.createElement('div', { style: { display: 'flex', gap: 6, alignItems: 'center' } },
          React.createElement(window.lucide.Wifi, { size: 14, color: t.statusBar }),
          React.createElement(window.lucide.Battery, { size: 16, color: t.statusBar })
        )
      ),

      // Screen content
      React.createElement('div', {
        style: { flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }
      },
        React.createElement(screens[activeTab])
      ),

      // Bottom nav
      React.createElement('div', {
        style: {
          height: 80, background: t.navBg, borderTop: `1px solid ${t.navBorder}`,
          display: 'flex', alignItems: 'center', justifyContent: 'space-around',
          padding: '0 8px 12px', flexShrink: 0,
          boxShadow: `0 -4px 16px ${t.shadow}`
        }
      },
        tabs.map(tab => React.createElement('div', {
          key: tab.id,
          onClick: () => setActiveTab(tab.id),
          style: {
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
            cursor: 'pointer', flex: 1, padding: '8px 0',
            transition: 'all 0.15s ease',
            opacity: activeTab === tab.id ? 1 : 0.5,
          }
        },
          tab.id === 'post'
            ? React.createElement('div', {
                style: {
                  width: 44, height: 44, borderRadius: '50%',
                  background: activeTab === 'post' ? t.primary : `linear-gradient(135deg, ${t.primary}, ${t.secondary})`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: activeTab === 'post' ? 'none' : `0 4px 16px ${t.primary}66`,
                  marginTop: -16, border: `2px solid ${t.navBg}`
                }
              }, React.createElement(tab.icon, { size: 22, color: '#fff' }))
            : React.createElement(tab.icon, { size: 22, color: activeTab === tab.id ? t.primary : t.textMuted }),
          React.createElement('span', {
            style: {
              fontSize: 10, fontWeight: 600,
              color: activeTab === tab.id ? t.primary : t.textMuted
            }
          }, tab.label)
        ))
      )
    )
  );
}
