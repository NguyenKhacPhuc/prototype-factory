const { useState, useEffect, useRef } = React;

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [pressedBtn, setPressedBtn] = useState(null);
  const [likedItems, setLikedItems] = useState({});
  const [showAddModal, setShowAddModal] = useState(false);
  const [chatOpen, setChatOpen] = useState(null);
  const [chatMessage, setChatMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [currentTime, setCurrentTime] = useState('');
  const [ecoScore, setEcoScore] = useState(247);
  const [notifCount, setNotifCount] = useState(3);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }));
    };
    update();
    const t = setInterval(update, 30000);
    return () => clearInterval(t);
  }, []);

  // Google Fonts
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');`;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const colors = {
    bg: '#F0F4F8',
    teal: '#5BA4A4',
    tealLight: '#7BBFBF',
    tealDark: '#3D8080',
    coral: '#F08080',
    coralLight: '#F5A0A0',
    sand: '#F4E1C1',
    sandDark: '#E8C99A',
    white: '#FFFFFF',
    gray50: '#F8FAFB',
    gray100: '#EDF1F4',
    gray200: '#D9E2EC',
    gray400: '#9EB3C2',
    gray600: '#627D8A',
    gray800: '#2D4A58',
    green: '#6BB88B',
    greenLight: '#E8F5EE',
  };

  const font = { fontFamily: "'Outfit', sans-serif" };

  const pressStyle = (id) => ({
    transform: pressedBtn === id ? 'scale(0.95)' : 'scale(1)',
    transition: 'transform 0.1s ease',
  });

  const handlePress = (id, fn) => {
    setPressedBtn(id);
    setTimeout(() => setPressedBtn(null), 150);
    if (fn) fn();
  };

  const toggleLike = (id) => {
    setLikedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Data
  const items = [
    { id: 1, title: 'Vintage Wooden Chair', category: 'Furniture', condition: 'Good', user: 'Maya K.', avatar: '🌿', distance: '0.8 mi', image: '🪑', wants: 'Books or plants', time: '2h ago', views: 34 },
    { id: 2, title: 'Kids Bike 20"', category: 'Sports', condition: 'Great', user: 'Tom R.', avatar: '🚴', distance: '1.2 mi', image: '🚲', wants: 'Anything useful', time: '4h ago', views: 56 },
    { id: 3, title: 'Sourdough Starter', category: 'Food', condition: 'Fresh', user: 'Priya S.', avatar: '🍞', distance: '0.3 mi', image: '🫙', wants: 'Other ferments', time: '1h ago', views: 89 },
    { id: 4, title: 'DSLR Camera Bag', category: 'Electronics', condition: 'Like New', user: 'James L.', avatar: '📷', distance: '2.1 mi', image: '🎒', wants: 'Camera accessories', time: '6h ago', views: 41 },
    { id: 5, title: 'Herb Garden Kit', category: 'Garden', condition: 'New', user: 'Sara M.', avatar: '🌱', distance: '0.5 mi', image: '🌿', wants: 'Seeds or spices', time: '3h ago', views: 72 },
    { id: 6, title: 'Yoga Mat & Blocks', category: 'Sports', condition: 'Good', user: 'Nina T.', avatar: '🧘', distance: '1.8 mi', image: '🧘', wants: 'Fitness gear', time: '8h ago', views: 28 },
    { id: 7, title: 'Vintage Record Player', category: 'Electronics', condition: 'Good', user: 'Alex P.', avatar: '🎵', distance: '3.2 mi', image: '📻', wants: 'Vinyl records', time: '1d ago', views: 115 },
    { id: 8, title: 'Handmade Quilts x2', category: 'Home', condition: 'Great', user: 'Carol B.', avatar: '🪡', distance: '0.9 mi', image: '🛏', wants: 'Craft supplies', time: '5h ago', views: 44 },
  ];

  const categories = ['All', 'Furniture', 'Electronics', 'Garden', 'Sports', 'Food', 'Home'];

  const tips = [
    { id: 1, icon: '♻️', title: 'Repair Before Replace', desc: 'Fixing items reduces 73% more waste than recycling them.', tag: 'Reduce Waste', color: colors.greenLight },
    { id: 2, icon: '🌊', title: 'Ocean Plastic Stats', desc: '8 million metric tons of plastic enter oceans yearly. Every swap helps.', tag: 'Ocean Health', color: '#E8F0F8' },
    { id: 3, icon: '🌱', title: 'Carbon Footprint', desc: 'One swap prevents avg. 2.3kg CO₂ vs buying new.', tag: 'Climate', color: '#F0F8EC' },
    { id: 4, icon: '💡', title: 'Circular Economy', desc: 'Communities with active swapping cut household waste by 40%.', tag: 'Community', color: '#FFF8EC' },
  ];

  const rewards = [
    { id: 1, title: 'First Swap!', desc: 'Completed your first swap', icon: '🌱', earned: true, points: 50 },
    { id: 2, title: 'Eco Warrior', desc: '10 successful swaps', icon: '⚡', earned: true, points: 100 },
    { id: 3, title: 'Community Star', desc: 'Helped 5 neighbors', icon: '⭐', earned: true, points: 75 },
    { id: 4, title: 'Green Champion', desc: '25 swaps completed', icon: '🏆', earned: false, points: 200 },
    { id: 5, title: 'Zero Waster', desc: 'Listed 20 items', icon: '♻️', earned: false, points: 150 },
    { id: 6, title: 'Neighborhood Hero', desc: '50 community interactions', icon: '🦸', earned: false, points: 300 },
  ];

  const chats = [
    { id: 1, user: 'Maya K.', avatar: '🌿', item: 'Vintage Wooden Chair', last: 'Is it still available?', time: '2m', unread: 2, messages: [
      { from: 'them', text: 'Hi! Is the chair still available?' },
      { from: 'them', text: 'I can offer some gardening books!' },
    ]},
    { id: 2, user: 'Tom R.', avatar: '🚴', item: "Kids Bike 20\"", last: 'Sounds good to me!', time: '1h', unread: 0, messages: [
      { from: 'me', text: 'Would you swap for a skateboard?' },
      { from: 'them', text: 'Sounds good to me! Let\'s meet at the park.' },
    ]},
    { id: 3, user: 'Priya S.', avatar: '🍞', item: 'Sourdough Starter', last: 'Can I pick up tomorrow?', time: '3h', unread: 1, messages: [
      { from: 'them', text: 'I have some kombucha to trade!' },
      { from: 'me', text: 'Perfect, I love kombucha!' },
      { from: 'them', text: 'Can I pick up tomorrow?' },
    ]},
  ];

  const filteredItems = items.filter(item =>
    (activeCategory === 'All' || item.category === activeCategory) &&
    (searchQuery === '' || item.title.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Icons via window.lucide
  const Icon = ({ name, size = 20, color = 'currentColor', strokeWidth = 2 }) => {
    const LucideIcon = window.lucide && window.lucide[name];
    if (!LucideIcon) return null;
    return React.createElement(LucideIcon, { size, color, strokeWidth });
  };

  // ── Status Bar ──
  const StatusBar = () => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 24px 0', height: 44 }}>
      <span style={{ ...font, fontSize: 15, fontWeight: 600, color: colors.gray800 }}>{currentTime || '09:41'}</span>
      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        <Icon name="Wifi" size={14} color={colors.gray600} />
        <Icon name="Signal" size={14} color={colors.gray600} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <div style={{ width: 22, height: 11, borderRadius: 3, border: `1.5px solid ${colors.gray600}`, padding: 1.5, display: 'flex', alignItems: 'center' }}>
            <div style={{ width: '75%', height: '100%', backgroundColor: colors.teal, borderRadius: 1.5 }} />
          </div>
        </div>
      </div>
    </div>
  );

  // ── Dynamic Island ──
  const DynamicIsland = () => (
    <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 4 }}>
      <div style={{ width: 120, height: 34, backgroundColor: '#0A0A0A', borderRadius: 20 }} />
    </div>
  );

  // ── Item Card ──
  const ItemCard = ({ item, compact = false }) => (
    <div
      onClick={() => {}}
      style={{
        backgroundColor: colors.white,
        borderRadius: 16,
        overflow: 'hidden',
        boxShadow: '0 2px 12px rgba(91,164,164,0.1)',
        width: compact ? 160 : '100%',
        flexShrink: compact ? 0 : 1,
        cursor: 'pointer',
        transition: 'transform 0.15s ease',
      }}
    >
      <div style={{
        height: compact ? 100 : 120,
        background: `linear-gradient(135deg, ${colors.sand} 0%, ${colors.sandDark} 100%)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: compact ? 40 : 48,
        position: 'relative',
      }}>
        {item.image}
        <button
          onClick={(e) => { e.stopPropagation(); toggleLike(item.id); }}
          style={{
            position: 'absolute', top: 8, right: 8,
            width: 30, height: 30, borderRadius: '50%',
            backgroundColor: 'rgba(255,255,255,0.9)',
            border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            ...pressStyle(`like-${item.id}`),
          }}
          onMouseDown={() => setPressedBtn(`like-${item.id}`)}
        >
          <Icon name="Heart" size={14} color={likedItems[item.id] ? colors.coral : colors.gray400} strokeWidth={likedItems[item.id] ? 0 : 2} />
        </button>
        <div style={{
          position: 'absolute', bottom: 8, left: 8,
          backgroundColor: colors.teal, color: colors.white,
          borderRadius: 8, padding: '2px 8px', fontSize: 10, fontWeight: 600, ...font,
        }}>
          {item.condition}
        </div>
      </div>
      <div style={{ padding: compact ? '10px 10px' : '12px 14px' }}>
        <p style={{ ...font, fontWeight: 600, fontSize: compact ? 12 : 14, color: colors.gray800, margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.title}</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 4 }}>
          <span style={{ fontSize: 12 }}>{item.avatar}</span>
          <span style={{ ...font, fontSize: 11, color: colors.gray600 }}>{item.user}</span>
          <span style={{ ...font, fontSize: 11, color: colors.gray400, marginLeft: 'auto' }}>📍 {item.distance}</span>
        </div>
        {!compact && (
          <div style={{
            marginTop: 8, padding: '6px 10px', backgroundColor: colors.greenLight,
            borderRadius: 8, display: 'flex', alignItems: 'center', gap: 6,
          }}>
            <Icon name="ArrowLeftRight" size={12} color={colors.green} />
            <span style={{ ...font, fontSize: 11, color: colors.green, fontWeight: 500 }}>Wants: {item.wants}</span>
          </div>
        )}
      </div>
    </div>
  );

  // ══════════════════════════════════════════
  // SCREEN: HOME
  // ══════════════════════════════════════════
  const HomeScreen = () => (
    <div style={{ flex: 1, overflowY: 'auto', backgroundColor: colors.bg }}>
      {/* Header */}
      <div style={{ padding: '16px 20px 0', background: `linear-gradient(180deg, ${colors.white} 0%, ${colors.bg} 100%)` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <p style={{ ...font, fontSize: 13, color: colors.gray600, margin: 0 }}>📍 San Francisco, CA</p>
            <h1 style={{ ...font, fontSize: 24, fontWeight: 700, color: colors.gray800, margin: '4px 0 0' }}>
              Hey, Sam! 👋
            </h1>
          </div>
          <div style={{ position: 'relative' }}>
            <button
              style={{
                width: 44, height: 44, borderRadius: '50%',
                backgroundColor: colors.white,
                border: 'none', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                ...pressStyle('notif'),
              }}
              onMouseDown={() => setPressedBtn('notif')}
            >
              <Icon name="Bell" size={20} color={colors.teal} />
            </button>
            {notifCount > 0 && (
              <div style={{
                position: 'absolute', top: -2, right: -2,
                width: 18, height: 18, borderRadius: '50%',
                backgroundColor: colors.coral, display: 'flex',
                alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ ...font, fontSize: 10, color: colors.white, fontWeight: 700 }}>{notifCount}</span>
              </div>
            )}
          </div>
        </div>

        {/* Eco Score Banner */}
        <div style={{
          marginTop: 16, padding: '14px 16px',
          background: `linear-gradient(135deg, ${colors.teal} 0%, ${colors.tealDark} 100%)`,
          borderRadius: 16, display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <div style={{
            width: 48, height: 48, borderRadius: '50%',
            backgroundColor: 'rgba(255,255,255,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22,
          }}>🌍</div>
          <div style={{ flex: 1 }}>
            <p style={{ ...font, fontSize: 12, color: 'rgba(255,255,255,0.8)', margin: 0 }}>Your Eco Score</p>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
              <span style={{ ...font, fontSize: 28, fontWeight: 800, color: colors.white }}>{ecoScore}</span>
              <span style={{ ...font, fontSize: 12, color: 'rgba(255,255,255,0.8)' }}>pts · Level 4 Swapper</span>
            </div>
            <div style={{ marginTop: 4, height: 4, backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: 2 }}>
              <div style={{ width: '62%', height: '100%', backgroundColor: colors.white, borderRadius: 2 }} />
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <span style={{ ...font, fontSize: 11, color: 'rgba(255,255,255,0.8)' }}>Next</span>
            <p style={{ ...font, fontSize: 13, fontWeight: 700, color: colors.white, margin: 0 }}>53 pts</p>
          </div>
        </div>

        {/* Quick Stats */}
        <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
          {[
            { icon: '🔄', val: '12', label: 'Swaps' },
            { icon: '♻️', val: '34kg', label: 'Saved' },
            { icon: '🤝', val: '28', label: 'Helped' },
          ].map((s, i) => (
            <div key={i} style={{
              flex: 1, backgroundColor: colors.white, borderRadius: 12, padding: '10px 8px', textAlign: 'center',
              boxShadow: '0 1px 6px rgba(91,164,164,0.08)',
            }}>
              <div style={{ fontSize: 18 }}>{s.icon}</div>
              <p style={{ ...font, fontSize: 16, fontWeight: 700, color: colors.gray800, margin: '2px 0 0' }}>{s.val}</p>
              <p style={{ ...font, fontSize: 10, color: colors.gray400, margin: 0 }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: '20px 20px 0' }}>
        {/* Near You */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <h2 style={{ ...font, fontSize: 17, fontWeight: 700, color: colors.gray800, margin: 0 }}>Near You</h2>
          <button
            onClick={() => setActiveTab('browse')}
            style={{ ...font, fontSize: 13, color: colors.teal, fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}
          >See all →</button>
        </div>

        <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 4, scrollbarWidth: 'none' }}>
          {items.slice(0, 5).map(item => (
            <ItemCard key={item.id} item={item} compact />
          ))}
        </div>

        {/* Recently Added */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '20px 0 12px' }}>
          <h2 style={{ ...font, fontSize: 17, fontWeight: 700, color: colors.gray800, margin: 0 }}>Recently Added</h2>
          <span style={{ ...font, fontSize: 12, color: colors.gray400 }}>{items.length} items</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingBottom: 20 }}>
          {items.slice(0, 4).map(item => (
            <div key={item.id} style={{
              backgroundColor: colors.white, borderRadius: 14, padding: '12px 14px',
              display: 'flex', gap: 12, alignItems: 'center',
              boxShadow: '0 2px 8px rgba(91,164,164,0.08)',
            }}>
              <div style={{
                width: 60, height: 60, borderRadius: 12, flexShrink: 0,
                background: `linear-gradient(135deg, ${colors.sand} 0%, ${colors.sandDark} 100%)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28,
              }}>{item.image}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ ...font, fontSize: 14, fontWeight: 600, color: colors.gray800, margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.title}</p>
                <p style={{ ...font, fontSize: 12, color: colors.gray600, margin: '2px 0' }}>{item.avatar} {item.user} · {item.distance}</p>
                <div style={{ display: 'flex', gap: 6, marginTop: 4 }}>
                  <span style={{
                    ...font, fontSize: 10, fontWeight: 600,
                    backgroundColor: colors.teal + '20', color: colors.teal,
                    borderRadius: 6, padding: '2px 7px',
                  }}>{item.category}</span>
                  <span style={{
                    ...font, fontSize: 10, color: colors.gray400,
                  }}>{item.time} · {item.views} views</span>
                </div>
              </div>
              <button
                onClick={() => handlePress(`chat-${item.id}`, () => { setActiveTab('community'); setChatOpen(chats[0]); })}
                style={{
                  width: 34, height: 34, borderRadius: '50%',
                  backgroundColor: colors.teal + '15', border: 'none', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  ...pressStyle(`chat-${item.id}`),
                }}
              >
                <Icon name="MessageCircle" size={16} color={colors.teal} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ══════════════════════════════════════════
  // SCREEN: BROWSE
  // ══════════════════════════════════════════
  const BrowseScreen = () => (
    <div style={{ flex: 1, overflowY: 'auto', backgroundColor: colors.bg }}>
      <div style={{ padding: '16px 20px 0', backgroundColor: colors.white }}>
        <h1 style={{ ...font, fontSize: 22, fontWeight: 700, color: colors.gray800, margin: '0 0 14px' }}>Discover Items</h1>
        {/* Search */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          backgroundColor: colors.bg, borderRadius: 14, padding: '10px 14px',
          border: `1.5px solid ${colors.gray200}`,
        }}>
          <Icon name="Search" size={18} color={colors.gray400} />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search items, categories..."
            style={{
              ...font, flex: 1, border: 'none', background: 'none', outline: 'none',
              fontSize: 14, color: colors.gray800,
            }}
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 0 }}>
              <Icon name="X" size={16} color={colors.gray400} />
            </button>
          )}
        </div>

        {/* Categories */}
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', padding: '14px 0', scrollbarWidth: 'none' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                ...font, fontSize: 13, fontWeight: 500, flexShrink: 0,
                padding: '6px 14px', borderRadius: 20, border: 'none', cursor: 'pointer',
                backgroundColor: activeCategory === cat ? colors.teal : colors.white,
                color: activeCategory === cat ? colors.white : colors.gray600,
                boxShadow: activeCategory === cat ? `0 2px 8px ${colors.teal}40` : '0 1px 4px rgba(0,0,0,0.08)',
                transition: 'all 0.2s ease',
              }}
            >{cat}</button>
          ))}
        </div>
      </div>

      <div style={{ padding: '14px 20px' }}>
        {/* Results header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <span style={{ ...font, fontSize: 13, color: colors.gray600 }}>
            {filteredItems.length} items found
            {activeCategory !== 'All' ? ` in ${activeCategory}` : ''}
          </span>
          <button style={{
            ...font, fontSize: 13, color: colors.gray600, fontWeight: 500,
            backgroundColor: colors.white, border: `1px solid ${colors.gray200}`,
            borderRadius: 8, padding: '5px 10px', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 4,
          }}>
            <Icon name="SlidersHorizontal" size={13} color={colors.gray600} />
            Filter
          </button>
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {filteredItems.map(item => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px 20px' }}>
            <div style={{ fontSize: 48 }}>🔍</div>
            <p style={{ ...font, fontSize: 16, fontWeight: 600, color: colors.gray600, marginTop: 12 }}>No items found</p>
            <p style={{ ...font, fontSize: 13, color: colors.gray400 }}>Try a different search or category</p>
          </div>
        )}
        <div style={{ height: 20 }} />
      </div>
    </div>
  );

  // ══════════════════════════════════════════
  // SCREEN: LIST ITEM (Add)
  // ══════════════════════════════════════════
  const ListScreen = () => {
    const [step, setStep] = useState(1);
    const [selectedCat, setSelectedCat] = useState('');
    const [condition, setCondition] = useState('');

    return (
      <div style={{ flex: 1, overflowY: 'auto', backgroundColor: colors.bg }}>
        <div style={{ padding: '16px 20px 0', backgroundColor: colors.white, paddingBottom: 16 }}>
          <h1 style={{ ...font, fontSize: 22, fontWeight: 700, color: colors.gray800, margin: 0 }}>List an Item</h1>
          <p style={{ ...font, fontSize: 13, color: colors.gray600, margin: '4px 0 16px' }}>Share something you no longer need</p>

          {/* Steps indicator */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
            {['Photos', 'Details', 'Exchange', 'Preview'].map((s, i) => (
              <React.Fragment key={s}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: '50%',
                    backgroundColor: step > i + 1 ? colors.teal : step === i + 1 ? colors.teal : colors.gray200,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    {step > i + 1
                      ? <Icon name="Check" size={14} color={colors.white} />
                      : <span style={{ ...font, fontSize: 12, fontWeight: 700, color: step === i + 1 ? colors.white : colors.gray400 }}>{i + 1}</span>
                    }
                  </div>
                  <span style={{ ...font, fontSize: 9, color: step === i + 1 ? colors.teal : colors.gray400, marginTop: 3, fontWeight: step === i + 1 ? 600 : 400 }}>{s}</span>
                </div>
                {i < 3 && <div style={{ flex: 2, height: 2, backgroundColor: step > i + 1 ? colors.teal : colors.gray200, marginBottom: 16 }} />}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div style={{ padding: '20px 20px' }}>
          {/* Upload area */}
          <div style={{
            backgroundColor: colors.white, borderRadius: 16,
            border: `2px dashed ${colors.teal}60`,
            padding: 24, textAlign: 'center', marginBottom: 16,
          }}>
            <div style={{ fontSize: 40 }}>📸</div>
            <p style={{ ...font, fontSize: 14, fontWeight: 600, color: colors.gray800, margin: '8px 0 4px' }}>Add Photos</p>
            <p style={{ ...font, fontSize: 12, color: colors.gray400, margin: 0 }}>Up to 6 photos · Tap to upload</p>
            <button style={{
              ...font, marginTop: 12, backgroundColor: colors.teal, color: colors.white,
              border: 'none', borderRadius: 10, padding: '8px 20px', fontSize: 13,
              fontWeight: 600, cursor: 'pointer',
            }}>Choose Photos</button>
          </div>

          {/* Form fields */}
          {[
            { label: 'Item Title', placeholder: 'e.g. Vintage Wooden Chair', icon: 'Tag' },
            { label: 'Description', placeholder: 'Describe your item, any flaws, history...', icon: 'FileText' },
          ].map(field => (
            <div key={field.label} style={{ marginBottom: 14 }}>
              <label style={{ ...font, fontSize: 13, fontWeight: 600, color: colors.gray700, display: 'block', marginBottom: 6 }}>{field.label}</label>
              <div style={{
                backgroundColor: colors.white, borderRadius: 12, padding: '10px 14px',
                border: `1.5px solid ${colors.gray200}`, display: 'flex', alignItems: 'center', gap: 10,
              }}>
                <Icon name={field.icon} size={16} color={colors.gray400} />
                <input placeholder={field.placeholder} style={{
                  ...font, flex: 1, border: 'none', outline: 'none', fontSize: 14, color: colors.gray800,
                }} />
              </div>
            </div>
          ))}

          {/* Category */}
          <div style={{ marginBottom: 14 }}>
            <label style={{ ...font, fontSize: 13, fontWeight: 600, color: colors.gray700, display: 'block', marginBottom: 6 }}>Category</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {categories.filter(c => c !== 'All').map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCat(cat)}
                  style={{
                    ...font, fontSize: 12, fontWeight: 500, padding: '6px 12px',
                    borderRadius: 20, border: `1.5px solid ${selectedCat === cat ? colors.teal : colors.gray200}`,
                    backgroundColor: selectedCat === cat ? colors.teal + '15' : colors.white,
                    color: selectedCat === cat ? colors.teal : colors.gray600, cursor: 'pointer',
                  }}
                >{cat}</button>
              ))}
            </div>
          </div>

          {/* Condition */}
          <div style={{ marginBottom: 14 }}>
            <label style={{ ...font, fontSize: 13, fontWeight: 600, color: colors.gray700, display: 'block', marginBottom: 6 }}>Condition</label>
            <div style={{ display: 'flex', gap: 8 }}>
              {['New', 'Like New', 'Good', 'Fair'].map(c => (
                <button
                  key={c}
                  onClick={() => setCondition(c)}
                  style={{
                    ...font, fontSize: 11, fontWeight: 500, flex: 1,
                    padding: '8px 4px', borderRadius: 10,
                    border: `1.5px solid ${condition === c ? colors.teal : colors.gray200}`,
                    backgroundColor: condition === c ? colors.teal : colors.white,
                    color: condition === c ? colors.white : colors.gray600, cursor: 'pointer',
                  }}
                >{c}</button>
              ))}
            </div>
          </div>

          {/* Exchange preference */}
          <div style={{ marginBottom: 20 }}>
            <label style={{ ...font, fontSize: 13, fontWeight: 600, color: colors.gray700, display: 'block', marginBottom: 6 }}>Exchange Preference</label>
            <div style={{
              backgroundColor: colors.white, borderRadius: 12, padding: '10px 14px',
              border: `1.5px solid ${colors.gray200}`,
            }}>
              <input placeholder="e.g. Books, plants, or any food items" style={{
                ...font, width: '100%', border: 'none', outline: 'none', fontSize: 14, color: colors.gray800,
              }} />
            </div>
          </div>

          {/* List button */}
          <button
            style={{
              ...font, width: '100%', backgroundColor: colors.teal,
              color: colors.white, border: 'none', borderRadius: 14,
              padding: '15px', fontSize: 16, fontWeight: 700, cursor: 'pointer',
              boxShadow: `0 4px 16px ${colors.teal}50`,
              ...pressStyle('list-btn'),
            }}
            onMouseDown={() => setPressedBtn('list-btn')}
            onMouseUp={() => setPressedBtn(null)}
          >
            Publish Listing ✨
          </button>

          <p style={{ ...font, fontSize: 11, color: colors.gray400, textAlign: 'center', marginTop: 10 }}>
            By listing, you earn 10 eco points 🌱
          </p>
        </div>
      </div>
    );
  };

  // ══════════════════════════════════════════
  // SCREEN: COMMUNITY
  // ══════════════════════════════════════════
  const CommunityScreen = () => {
    const [chatMessages, setChatMessages] = useState(chatOpen ? chatOpen.messages : []);

    const sendMsg = () => {
      if (!chatMessage.trim()) return;
      setChatMessages(prev => [...prev, { from: 'me', text: chatMessage }]);
      setChatMessage('');
    };

    if (chatOpen) {
      return (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: colors.bg }}>
          {/* Chat header */}
          <div style={{
            backgroundColor: colors.white, padding: '12px 16px',
            display: 'flex', alignItems: 'center', gap: 12,
            boxShadow: '0 1px 6px rgba(0,0,0,0.06)',
          }}>
            <button onClick={() => setChatOpen(null)} style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 4 }}>
              <Icon name="ArrowLeft" size={20} color={colors.gray800} />
            </button>
            <div style={{ fontSize: 32 }}>{chatOpen.avatar}</div>
            <div>
              <p style={{ ...font, fontSize: 14, fontWeight: 700, color: colors.gray800, margin: 0 }}>{chatOpen.user}</p>
              <p style={{ ...font, fontSize: 11, color: colors.gray400, margin: 0 }}>Re: {chatOpen.item}</p>
            </div>
            <div style={{ marginLeft: 'auto' }}>
              <Icon name="MoreVertical" size={20} color={colors.gray400} />
            </div>
          </div>

          {/* Item preview in chat */}
          <div style={{
            margin: '12px 16px', backgroundColor: colors.white, borderRadius: 12, padding: '10px 14px',
            display: 'flex', gap: 10, alignItems: 'center',
            border: `1px solid ${colors.gray200}`,
          }}>
            <div style={{
              width: 40, height: 40, borderRadius: 8, backgroundColor: colors.sand,
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0,
            }}>🪑</div>
            <div>
              <p style={{ ...font, fontSize: 13, fontWeight: 600, color: colors.gray800, margin: 0 }}>{chatOpen.item}</p>
              <p style={{ ...font, fontSize: 11, color: colors.teal, margin: 0, fontWeight: 500 }}>View Item →</p>
            </div>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {chatMessages.map((msg, i) => (
              <div key={i} style={{
                display: 'flex', justifyContent: msg.from === 'me' ? 'flex-end' : 'flex-start',
              }}>
                <div style={{
                  maxWidth: '72%', padding: '10px 14px', borderRadius: 16,
                  backgroundColor: msg.from === 'me' ? colors.teal : colors.white,
                  color: msg.from === 'me' ? colors.white : colors.gray800,
                  borderBottomRightRadius: msg.from === 'me' ? 4 : 16,
                  borderBottomLeftRadius: msg.from === 'me' ? 16 : 4,
                  boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
                }}>
                  <p style={{ ...font, fontSize: 13, margin: 0, lineHeight: 1.4 }}>{msg.text}</p>
                </div>
              </div>
            ))}
            <div style={{ height: 4 }} />
          </div>

          {/* Quick replies */}
          <div style={{ padding: '8px 16px', display: 'flex', gap: 6, overflowX: 'auto', scrollbarWidth: 'none' }}>
            {["Is it still available?", "Can we meet tomorrow?", "Sounds great! 🌱"].map(r => (
              <button
                key={r}
                onClick={() => setChatMessage(r)}
                style={{
                  ...font, fontSize: 11, fontWeight: 500, flexShrink: 0,
                  padding: '5px 10px', borderRadius: 12,
                  backgroundColor: colors.teal + '12', border: `1px solid ${colors.teal}30`,
                  color: colors.teal, cursor: 'pointer',
                }}
              >{r}</button>
            ))}
          </div>

          {/* Input */}
          <div style={{
            padding: '8px 16px 12px', display: 'flex', gap: 10, alignItems: 'center',
            backgroundColor: colors.white, borderTop: `1px solid ${colors.gray100}`,
          }}>
            <div style={{
              flex: 1, backgroundColor: colors.bg, borderRadius: 24, padding: '9px 16px',
              border: `1.5px solid ${colors.gray200}`, display: 'flex', alignItems: 'center',
            }}>
              <input
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMsg()}
                placeholder="Type a message..."
                style={{ ...font, flex: 1, border: 'none', outline: 'none', fontSize: 13, background: 'none', color: colors.gray800 }}
              />
            </div>
            <button
              onClick={sendMsg}
              style={{
                width: 40, height: 40, borderRadius: '50%', backgroundColor: colors.teal,
                border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, boxShadow: `0 2px 8px ${colors.teal}40`,
                ...pressStyle('send'),
              }}
              onMouseDown={() => setPressedBtn('send')}
            >
              <Icon name="Send" size={16} color={colors.white} />
            </button>
          </div>
        </div>
      );
    }

    return (
      <div style={{ flex: 1, overflowY: 'auto', backgroundColor: colors.bg }}>
        <div style={{ padding: '16px 20px 12px', backgroundColor: colors.white }}>
          <h1 style={{ ...font, fontSize: 22, fontWeight: 700, color: colors.gray800, margin: 0 }}>Community</h1>
          <p style={{ ...font, fontSize: 13, color: colors.gray600, margin: '4px 0 0' }}>Your swaps in progress</p>
        </div>

        <div style={{ padding: '16px 20px' }}>
          {/* Active Chats */}
          <h2 style={{ ...font, fontSize: 16, fontWeight: 700, color: colors.gray800, margin: '0 0 10px' }}>Messages</h2>
          {chats.map(chat => (
            <button
              key={chat.id}
              onClick={() => setChatOpen(chat)}
              style={{
                width: '100%', backgroundColor: colors.white, borderRadius: 14,
                padding: '14px', border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10,
                boxShadow: '0 2px 8px rgba(91,164,164,0.08)', textAlign: 'left',
                ...pressStyle(`chat-${chat.id}`),
              }}
              onMouseDown={() => setPressedBtn(`chat-${chat.id}`)}
            >
              <div style={{
                width: 50, height: 50, borderRadius: '50%',
                backgroundColor: colors.sand, display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: 24, flexShrink: 0, position: 'relative',
              }}>
                {chat.avatar}
                {chat.unread > 0 && (
                  <div style={{
                    position: 'absolute', top: -2, right: -2,
                    width: 18, height: 18, borderRadius: '50%',
                    backgroundColor: colors.coral, display: 'flex',
                    alignItems: 'center', justifyContent: 'center',
                  }}>
                    <span style={{ ...font, fontSize: 10, color: colors.white, fontWeight: 700 }}>{chat.unread}</span>
                  </div>
                )}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                  <span style={{ ...font, fontSize: 14, fontWeight: 700, color: colors.gray800 }}>{chat.user}</span>
                  <span style={{ ...font, fontSize: 11, color: colors.gray400 }}>{chat.time}</span>
                </div>
                <p style={{ ...font, fontSize: 12, color: colors.gray400, margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  📦 {chat.item}
                </p>
                <p style={{ ...font, fontSize: 12, color: chat.unread > 0 ? colors.gray700 : colors.gray400, margin: '2px 0 0', fontWeight: chat.unread > 0 ? 600 : 400, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {chat.last}
                </p>
              </div>
            </button>
          ))}

          {/* Community Activity */}
          <h2 style={{ ...font, fontSize: 16, fontWeight: 700, color: colors.gray800, margin: '20px 0 10px' }}>Community Feed</h2>
          {[
            { user: 'Emma W.', avatar: '🌸', action: 'completed a swap', item: 'Vintage Lamp ↔ Yoga Mat', time: '5m ago', eco: '+4.2kg saved' },
            { user: 'Carlos M.', avatar: '🌵', action: 'listed a new item', item: 'Mountain Bike', time: '12m ago', eco: '+10 pts' },
            { user: 'Aisha K.', avatar: '🦋', action: 'earned a badge', item: '⭐ Community Star', time: '1h ago', eco: '+75 pts' },
          ].map((activity, i) => (
            <div key={i} style={{
              backgroundColor: colors.white, borderRadius: 14, padding: '12px 14px',
              marginBottom: 10, display: 'flex', gap: 12, alignItems: 'center',
              boxShadow: '0 1px 6px rgba(91,164,164,0.07)',
            }}>
              <div style={{ fontSize: 28 }}>{activity.avatar}</div>
              <div style={{ flex: 1 }}>
                <p style={{ ...font, fontSize: 13, color: colors.gray800, margin: 0 }}>
                  <strong>{activity.user}</strong> {activity.action}
                </p>
                <p style={{ ...font, fontSize: 12, color: colors.gray600, margin: '2px 0' }}>{activity.item}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ ...font, fontSize: 11, color: colors.gray400 }}>{activity.time}</span>
                  <span style={{ ...font, fontSize: 11, color: colors.green, fontWeight: 600 }}>{activity.eco}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ══════════════════════════════════════════
  // SCREEN: ECO TIPS
  // ══════════════════════════════════════════
  const EcoScreen = () => (
    <div style={{ flex: 1, overflowY: 'auto', backgroundColor: colors.bg }}>
      <div style={{ padding: '16px 20px 16px', backgroundColor: colors.white }}>
        <h1 style={{ ...font, fontSize: 22, fontWeight: 700, color: colors.gray800, margin: 0 }}>Eco Insights</h1>
        <p style={{ ...font, fontSize: 13, color: colors.gray600, margin: '4px 0 0' }}>Your impact & sustainability tips</p>
      </div>

      <div style={{ padding: '16px 20px' }}>
        {/* Impact stats */}
        <div style={{
          background: `linear-gradient(135deg, ${colors.tealDark} 0%, ${colors.teal} 100%)`,
          borderRadius: 20, padding: '20px', marginBottom: 20, color: colors.white,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <span style={{ fontSize: 20 }}>🌍</span>
            <span style={{ ...font, fontSize: 14, fontWeight: 700, color: 'rgba(255,255,255,0.9)' }}>Your Environmental Impact</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { label: 'CO₂ Prevented', value: '28.4 kg', icon: '💨' },
              { label: 'Items Saved', value: '12', icon: '♻️' },
              { label: 'Water Saved', value: '1,240 L', icon: '💧' },
              { label: 'Trees Equivalent', value: '1.2', icon: '🌳' },
            ].map(stat => (
              <div key={stat.label} style={{
                backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 12, padding: '10px 12px',
              }}>
                <span style={{ fontSize: 18 }}>{stat.icon}</span>
                <p style={{ ...font, fontSize: 18, fontWeight: 800, color: colors.white, margin: '4px 0 0' }}>{stat.value}</p>
                <p style={{ ...font, fontSize: 10, color: 'rgba(255,255,255,0.75)', margin: 0 }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly challenge */}
        <div style={{
          backgroundColor: colors.white, borderRadius: 16, padding: '16px',
          marginBottom: 20, border: `2px solid ${colors.coral}30`,
          boxShadow: '0 2px 10px rgba(240,128,128,0.1)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                <span style={{ fontSize: 16 }}>🎯</span>
                <span style={{ ...font, fontSize: 11, fontWeight: 700, color: colors.coral, textTransform: 'uppercase', letterSpacing: 0.5 }}>Weekly Challenge</span>
              </div>
              <p style={{ ...font, fontSize: 15, fontWeight: 700, color: colors.gray800, margin: 0 }}>List 3 items this week</p>
              <p style={{ ...font, fontSize: 12, color: colors.gray600, margin: '4px 0 0' }}>2 of 3 completed · Ends Friday</p>
            </div>
            <div style={{
              width: 52, height: 52, position: 'relative',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="52" height="52" style={{ transform: 'rotate(-90deg)', position: 'absolute' }}>
                <circle cx="26" cy="26" r="22" fill="none" stroke={colors.gray200} strokeWidth="4" />
                <circle cx="26" cy="26" r="22" fill="none" stroke={colors.coral} strokeWidth="4"
                  strokeDasharray={`${(2/3) * 2 * Math.PI * 22} ${2 * Math.PI * 22}`} strokeLinecap="round" />
              </svg>
              <span style={{ ...font, fontSize: 12, fontWeight: 700, color: colors.coral, position: 'relative', zIndex: 1 }}>2/3</span>
            </div>
          </div>
          <div style={{
            marginTop: 12, backgroundColor: colors.coral + '15', borderRadius: 8,
            padding: '6px 12px', display: 'flex', justifyContent: 'space-between',
          }}>
            <span style={{ ...font, fontSize: 12, color: colors.coral }}>🏆 Reward: 100 eco points</span>
            <span style={{ ...font, fontSize: 12, color: colors.coral, fontWeight: 600 }}>+1 badge</span>
          </div>
        </div>

        {/* Tips */}
        <h2 style={{ ...font, fontSize: 16, fontWeight: 700, color: colors.gray800, margin: '0 0 12px' }}>Sustainability Tips</h2>
        {tips.map(tip => (
          <div key={tip.id} style={{
            backgroundColor: tip.color, borderRadius: 16, padding: '14px 16px', marginBottom: 12,
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
              <span style={{ fontSize: 28, flexShrink: 0 }}>{tip.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <p style={{ ...font, fontSize: 14, fontWeight: 700, color: colors.gray800, margin: 0 }}>{tip.title}</p>
                  <span style={{
                    ...font, fontSize: 10, fontWeight: 600,
                    backgroundColor: colors.white, color: colors.teal,
                    borderRadius: 6, padding: '2px 8px', flexShrink: 0, marginLeft: 8,
                  }}>{tip.tag}</span>
                </div>
                <p style={{ ...font, fontSize: 13, color: colors.gray600, margin: '6px 0 0', lineHeight: 1.5 }}>{tip.desc}</p>
              </div>
            </div>
          </div>
        ))}

        {/* Leaderboard */}
        <h2 style={{ ...font, fontSize: 16, fontWeight: 700, color: colors.gray800, margin: '20px 0 12px' }}>Neighborhood Leaders</h2>
        {[
          { rank: 1, name: 'Emma Wilson', pts: 892, avatar: '🌸', badge: '🥇' },
          { rank: 2, name: 'Carlos M.', pts: 734, avatar: '🌵', badge: '🥈' },
          { rank: 3, name: 'Aisha K.', pts: 681, avatar: '🦋', badge: '🥉' },
          { rank: 4, name: 'You (Sam)', pts: 247, avatar: '🌿', badge: '4️⃣', highlight: true },
        ].map(leader => (
          <div key={leader.rank} style={{
            backgroundColor: leader.highlight ? colors.teal + '15' : colors.white,
            borderRadius: 12, padding: '10px 14px', marginBottom: 8,
            display: 'flex', alignItems: 'center', gap: 12,
            border: leader.highlight ? `1.5px solid ${colors.teal}40` : '1.5px solid transparent',
          }}>
            <span style={{ fontSize: 20 }}>{leader.badge}</span>
            <span style={{ fontSize: 24 }}>{leader.avatar}</span>
            <div style={{ flex: 1 }}>
              <p style={{ ...font, fontSize: 13, fontWeight: leader.highlight ? 700 : 600, color: leader.highlight ? colors.teal : colors.gray800, margin: 0 }}>{leader.name}</p>
            </div>
            <span style={{ ...font, fontSize: 14, fontWeight: 700, color: leader.highlight ? colors.teal : colors.gray700 }}>{leader.pts.toLocaleString()} pts</span>
          </div>
        ))}
        <div style={{ height: 16 }} />
      </div>
    </div>
  );

  // ══════════════════════════════════════════
  // SCREEN: PROFILE
  // ══════════════════════════════════════════
  const ProfileScreen = () => (
    <div style={{ flex: 1, overflowY: 'auto', backgroundColor: colors.bg }}>
      {/* Profile header */}
      <div style={{
        background: `linear-gradient(180deg, ${colors.teal} 0%, ${colors.tealLight} 100%)`,
        padding: '16px 20px 24px',
      }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button style={{ border: 'none', background: 'rgba(255,255,255,0.2)', borderRadius: 8, padding: '6px 10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
            <Icon name="Settings" size={16} color={colors.white} />
          </button>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: 80, height: 80, borderRadius: '50%',
            backgroundColor: colors.sand, border: `3px solid ${colors.white}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 40, margin: '0 auto 12px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
          }}>🌿</div>
          <h1 style={{ ...font, fontSize: 22, fontWeight: 800, color: colors.white, margin: '0 0 4px' }}>Sam Chen</h1>
          <p style={{ ...font, fontSize: 13, color: 'rgba(255,255,255,0.85)', margin: 0 }}>📍 San Francisco · Joined March 2024</p>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 10,
            backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 20, padding: '5px 14px',
          }}>
            <span style={{ fontSize: 14 }}>⚡</span>
            <span style={{ ...font, fontSize: 13, fontWeight: 700, color: colors.white }}>Level 4 Eco Swapper</span>
          </div>
        </div>
      </div>

      <div style={{ padding: '20px 20px' }}>
        {/* Stats row */}
        <div style={{ display: 'flex', gap: 0, backgroundColor: colors.white, borderRadius: 16, overflow: 'hidden', marginBottom: 20, boxShadow: '0 2px 10px rgba(91,164,164,0.1)' }}>
          {[
            { val: '12', label: 'Swaps' },
            { val: '8', label: 'Listed' },
            { val: '247', label: 'Eco Points' },
          ].map((s, i) => (
            <div key={s.label} style={{
              flex: 1, textAlign: 'center', padding: '16px 8px',
              borderRight: i < 2 ? `1px solid ${colors.gray100}` : 'none',
            }}>
              <p style={{ ...font, fontSize: 22, fontWeight: 800, color: colors.teal, margin: 0 }}>{s.val}</p>
              <p style={{ ...font, fontSize: 11, color: colors.gray400, margin: '2px 0 0' }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Badges */}
        <h2 style={{ ...font, fontSize: 16, fontWeight: 700, color: colors.gray800, margin: '0 0 12px' }}>Achievements</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 24 }}>
          {rewards.map(reward => (
            <div key={reward.id} style={{
              backgroundColor: reward.earned ? colors.white : colors.gray100,
              borderRadius: 14, padding: '14px 10px', textAlign: 'center',
              opacity: reward.earned ? 1 : 0.6,
              boxShadow: reward.earned ? '0 2px 8px rgba(91,164,164,0.1)' : 'none',
              border: reward.earned ? `1.5px solid ${colors.teal}20` : '1.5px solid transparent',
            }}>
              <div style={{
                fontSize: 28, filter: reward.earned ? 'none' : 'grayscale(100%)',
                marginBottom: 6,
              }}>{reward.icon}</div>
              <p style={{ ...font, fontSize: 11, fontWeight: 700, color: reward.earned ? colors.gray800 : colors.gray400, margin: 0 }}>{reward.title}</p>
              <p style={{ ...font, fontSize: 9, color: reward.earned ? colors.teal : colors.gray400, margin: '2px 0 0' }}>+{reward.points} pts</p>
            </div>
          ))}
        </div>

        {/* Recent activity */}
        <h2 style={{ ...font, fontSize: 16, fontWeight: 700, color: colors.gray800, margin: '0 0 12px' }}>Recent Activity</h2>
        {[
          { icon: '🔄', action: 'Swapped Vintage Chair', partner: 'with Maya K.', time: '2 days ago', pts: '+25 pts' },
          { icon: '📝', action: 'Listed Sourdough Starter', partner: '4 interested', time: '3 days ago', pts: '+10 pts' },
          { icon: '⭐', action: 'Earned Community Star', partner: 'badge unlocked', time: '1 week ago', pts: '+75 pts' },
          { icon: '🔄', action: 'Swapped Kids Books', partner: 'with Tom R.', time: '2 weeks ago', pts: '+25 pts' },
        ].map((act, i) => (
          <div key={i} style={{
            backgroundColor: colors.white, borderRadius: 12, padding: '12px 14px',
            marginBottom: 8, display: 'flex', alignItems: 'center', gap: 12,
            boxShadow: '0 1px 6px rgba(91,164,164,0.06)',
          }}>
            <span style={{ fontSize: 24 }}>{act.icon}</span>
            <div style={{ flex: 1 }}>
              <p style={{ ...font, fontSize: 13, fontWeight: 600, color: colors.gray800, margin: 0 }}>{act.action}</p>
              <p style={{ ...font, fontSize: 11, color: colors.gray400, margin: '2px 0 0' }}>{act.partner} · {act.time}</p>
            </div>
            <span style={{ ...font, fontSize: 12, fontWeight: 700, color: colors.green }}>{act.pts}</span>
          </div>
        ))}

        {/* Sign out */}
        <button style={{
          ...font, width: '100%', marginTop: 16, padding: '13px',
          backgroundColor: colors.white, border: `1.5px solid ${colors.gray200}`,
          borderRadius: 12, fontSize: 14, fontWeight: 600, color: colors.gray600, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        }}>
          <Icon name="LogOut" size={16} color={colors.gray600} />
          Sign Out
        </button>
        <div style={{ height: 20 }} />
      </div>
    </div>
  );

  // ── Bottom Nav ──
  const tabs = [
    { id: 'home', icon: 'Home', label: 'Home' },
    { id: 'browse', icon: 'Search', label: 'Browse' },
    { id: 'list', icon: 'PlusCircle', label: 'List' },
    { id: 'community', icon: 'MessageCircle', label: 'Chat' },
    { id: 'eco', icon: 'Leaf', label: 'Eco' },
    { id: 'profile', icon: 'User', label: 'Profile' },
  ];

  const renderScreen = () => {
    switch (activeTab) {
      case 'home': return <HomeScreen />;
      case 'browse': return <BrowseScreen />;
      case 'list': return <ListScreen />;
      case 'community': return <CommunityScreen />;
      case 'eco': return <EcoScreen />;
      case 'profile': return <ProfileScreen />;
      default: return <HomeScreen />;
    }
  };

  return (
    <div style={{
      minHeight: '100vh', backgroundColor: '#1A1A2E',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '20px',
      background: 'radial-gradient(ellipse at center, #1a2744 0%, #0d1117 100%)',
    }}>
      {/* Phone frame */}
      <div style={{
        width: 375, height: 812,
        backgroundColor: colors.bg,
        borderRadius: 48,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex', flexDirection: 'column',
        boxShadow: '0 0 0 1px rgba(255,255,255,0.15), 0 30px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.2)',
        fontFamily: "'Outfit', sans-serif",
      }}>
        {/* Status + Dynamic Island */}
        <div style={{ backgroundColor: colors.white, flexShrink: 0 }}>
          <StatusBar />
          <DynamicIsland />
        </div>

        {/* Screen content */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {renderScreen()}
        </div>

        {/* Bottom nav */}
        <div style={{
          backgroundColor: colors.white,
          borderTop: `1px solid ${colors.gray100}`,
          display: 'flex', alignItems: 'center',
          paddingBottom: 8, flexShrink: 0,
          boxShadow: '0 -2px 12px rgba(91,164,164,0.08)',
        }}>
          {tabs.map(tab => {
            const isActive = activeTab === tab.id;
            const isCenter = tab.id === 'list';
            return (
              <button
                key={tab.id}
                onClick={() => { setChatOpen(null); setActiveTab(tab.id); }}
                style={{
                  flex: 1, display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center',
                  padding: isCenter ? '0' : '8px 0 4px',
                  border: 'none', background: 'none', cursor: 'pointer',
                  ...pressStyle(`nav-${tab.id}`),
                }}
                onMouseDown={() => setPressedBtn(`nav-${tab.id}`)}
              >
                {isCenter ? (
                  <div style={{
                    width: 48, height: 48, borderRadius: '50%',
                    background: `linear-gradient(135deg, ${colors.teal} 0%, ${colors.tealDark} 100%)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: 4, marginTop: -12,
                    boxShadow: `0 4px 16px ${colors.teal}60`,
                  }}>
                    <Icon name={tab.icon} size={22} color={colors.white} strokeWidth={2.5} />
                  </div>
                ) : (
                  <div style={{
                    width: 36, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    borderRadius: 10, backgroundColor: isActive ? colors.teal + '15' : 'transparent',
                    transition: 'background-color 0.2s ease', marginBottom: 2,
                    position: 'relative',
                  }}>
                    <Icon name={tab.icon} size={20} color={isActive ? colors.teal : colors.gray400} strokeWidth={isActive ? 2.5 : 2} />
                    {tab.id === 'community' && notifCount > 0 && (
                      <div style={{
                        position: 'absolute', top: 2, right: 4,
                        width: 8, height: 8, borderRadius: '50%', backgroundColor: colors.coral,
                      }} />
                    )}
                  </div>
                )}
                <span style={{
                  ...font, fontSize: 10, fontWeight: isActive ? 700 : 500,
                  color: isActive ? colors.teal : colors.gray400,
                }}>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
