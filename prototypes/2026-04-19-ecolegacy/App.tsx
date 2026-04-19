const { useState, useEffect, useRef, useCallback } = React;

const themes = {
  dark: {
    bg: '#0F1117',
    surface: '#1A1D27',
    surfaceAlt: '#232736',
    card: '#1E2130',
    cardHover: '#252940',
    primary: '#4F46E5',
    primaryLight: '#6366F1',
    secondary: '#818CF8',
    cta: '#22C55E',
    ctaLight: '#34D399',
    text: '#F1F5F9',
    textSecondary: '#94A3B8',
    textMuted: '#64748B',
    border: '#2D3148',
    accent: '#A78BFA',
    warning: '#F59E0B',
    danger: '#EF4444',
    overlay: 'rgba(15,17,23,0.85)',
  },
  light: {
    bg: '#EEF2FF',
    surface: '#FFFFFF',
    surfaceAlt: '#F8FAFC',
    card: '#FFFFFF',
    cardHover: '#F1F5F9',
    primary: '#4F46E5',
    primaryLight: '#6366F1',
    secondary: '#818CF8',
    cta: '#22C55E',
    ctaLight: '#16A34A',
    text: '#1E293B',
    textSecondary: '#475569',
    textMuted: '#94A3B8',
    border: '#E2E8F0',
    accent: '#7C3AED',
    warning: '#F59E0B',
    danger: '#EF4444',
    overlay: 'rgba(0,0,0,0.5)',
  }
};

const font = "-apple-system, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif";

function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [themeMode, setThemeMode] = useState('dark');
  const [scanOverlay, setScanOverlay] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [ecoScore, setEcoScore] = useState(742);
  const [animateScore, setAnimateScore] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const t = themes[themeMode];

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 2200);
  };

  const addScore = (pts) => {
    setAnimateScore(true);
    setEcoScore(prev => prev + pts);
    setTimeout(() => setAnimateScore(false), 600);
    showToast(`+${pts} EcoLegacy points!`);
  };

  const styleTag = React.createElement('style', null, `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(12px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(40px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.08); }
    }
    @keyframes shimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }
    @keyframes scorePop {
      0% { transform: scale(1); }
      40% { transform: scale(1.2); }
      100% { transform: scale(1); }
    }
    @keyframes scanLine {
      0% { top: 10%; }
      50% { top: 85%; }
      100% { top: 10%; }
    }
    @keyframes ripple {
      0% { transform: scale(0.8); opacity: 0.6; }
      100% { transform: scale(2.5); opacity: 0; }
    }
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-6px); }
    }
    * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
    ::-webkit-scrollbar { display: none; }
  `);

  // --- DATA ---
  const myItems = [
    { id: 1, name: 'Denim Jacket', category: 'Clothing', footprint: 33.4, score: 'C', materials: ['Cotton 78%', 'Polyester 15%', 'Elastane 7%'], icon: 'Shirt', color: '#6366F1', actions: ['Repair zipper', 'Donate locally', 'Upcycle into bag'] },
    { id: 2, name: 'iPhone 13', category: 'Electronics', footprint: 64.0, score: 'D', materials: ['Aluminum', 'Glass', 'Lithium battery', 'Rare earth metals'], icon: 'Smartphone', color: '#818CF8', actions: ['Trade-in program', 'Certified recycler', 'Sell on marketplace'] },
    { id: 3, name: 'IKEA Bookshelf', category: 'Furniture', footprint: 47.2, score: 'C', materials: ['Particleboard 60%', 'Veneer 25%', 'Steel hardware 15%'], icon: 'BookOpen', color: '#22C55E', actions: ['Repaint & refresh', 'List on marketplace', 'Donate to shelter'] },
    { id: 4, name: 'Running Shoes', category: 'Footwear', footprint: 14.0, score: 'B', materials: ['EVA foam 40%', 'Mesh polyester 35%', 'Rubber sole 25%'], icon: 'Footprints', color: '#F59E0B', actions: ['Shoe recycling program', 'Donate if wearable', 'Garden use'] },
    { id: 5, name: 'Wool Sweater', category: 'Clothing', footprint: 26.8, score: 'B', materials: ['Merino wool 85%', 'Nylon 15%'], icon: 'Shirt', color: '#A78BFA', actions: ['Moth-proof storage', 'Mend holes', 'Consignment shop'] },
  ];

  const challenges = [
    { id: 1, title: 'Textile Transformation', desc: 'Give 5 clothing items a second life this week', progress: 3, total: 5, pts: 150, icon: 'Scissors', deadline: '3 days left', color: '#818CF8' },
    { id: 2, title: 'Tech Reuseathon', desc: 'Recycle or repurpose 3 electronics', progress: 1, total: 3, pts: 200, icon: 'Cpu', deadline: '5 days left', color: '#4F46E5' },
    { id: 3, title: 'Furniture Flip', desc: 'Upcycle or donate 2 furniture pieces', progress: 0, total: 2, pts: 120, icon: 'Armchair', deadline: '1 week left', color: '#22C55E' },
    { id: 4, title: 'Zero Waste Week', desc: 'Take action on 10 items in 7 days', progress: 6, total: 10, pts: 300, icon: 'Leaf', deadline: '4 days left', color: '#F59E0B' },
  ];

  const leaderboard = [
    { rank: 1, name: 'Maya Chen', score: 2450, avatar: '🌿', badge: 'Eco Champion' },
    { rank: 2, name: 'Alex Rivera', score: 2180, avatar: '🌱', badge: 'Green Guardian' },
    { rank: 3, name: 'Sam Patel', score: 1920, avatar: '🍃', badge: 'Earth Keeper' },
    { rank: 4, name: 'You', score: ecoScore, avatar: '🌍', badge: 'Rising Star', isUser: true },
    { rank: 5, name: 'Jordan Lee', score: 680, avatar: '🌻', badge: 'Seedling' },
  ];

  const Icon = ({ name, size = 20, color = t.text, style = {} }) => {
    const IconComp = window.lucide && window.lucide[name];
    if (!IconComp) return null;
    return React.createElement(IconComp, { size, color, style, strokeWidth: 1.8 });
  };

  // --- SCREENS ---

  function HomeScreen() {
    return React.createElement('div', { style: { padding: '20px 16px 24px', animation: 'fadeIn 0.4s ease' } },
      // Header
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 } },
        React.createElement('div', null,
          React.createElement('div', { style: { fontSize: 15, color: t.textSecondary, fontFamily: font, fontWeight: 500, marginBottom: 2 } }, 'Good morning'),
          React.createElement('div', { style: { fontSize: 28, fontWeight: 700, color: t.text, fontFamily: font, letterSpacing: -0.5 } }, 'EcoLegacy')
        ),
        React.createElement('div', { style: { display: 'flex', gap: 10, alignItems: 'center' } },
          React.createElement('button', {
            onClick: () => setThemeMode(themeMode === 'dark' ? 'light' : 'dark'),
            style: { width: 40, height: 40, borderRadius: 20, background: t.surfaceAlt, border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }
          }, React.createElement(Icon, { name: themeMode === 'dark' ? 'Sun' : 'Moon', size: 18, color: t.textSecondary })),
          React.createElement('button', {
            onClick: () => setActiveScreen('profile'),
            style: { width: 40, height: 40, borderRadius: 20, background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})`, border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }
          }, React.createElement(Icon, { name: 'User', size: 18, color: '#fff' }))
        )
      ),

      // Score Card
      React.createElement('div', {
        style: {
          background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})`,
          borderRadius: 20, padding: '24px 20px', marginBottom: 20, position: 'relative', overflow: 'hidden',
          boxShadow: `0 8px 32px ${t.primary}40`
        }
      },
        React.createElement('div', { style: { position: 'absolute', top: -30, right: -30, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' } }),
        React.createElement('div', { style: { position: 'absolute', bottom: -20, left: -20, width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' } }),
        React.createElement('div', { style: { fontSize: 13, color: 'rgba(255,255,255,0.75)', fontFamily: font, fontWeight: 500, marginBottom: 6 } }, 'YOUR ECOLEGACY SCORE'),
        React.createElement('div', { style: { display: 'flex', alignItems: 'baseline', gap: 8 } },
          React.createElement('span', { style: { fontSize: 48, fontWeight: 800, color: '#fff', fontFamily: font, letterSpacing: -1, animation: animateScore ? 'scorePop 0.5s ease' : 'none' } }, ecoScore),
          React.createElement('span', { style: { fontSize: 15, color: 'rgba(255,255,255,0.7)', fontFamily: font } }, 'points')
        ),
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6, marginTop: 8 } },
          React.createElement(Icon, { name: 'TrendingUp', size: 14, color: '#34D399' }),
          React.createElement('span', { style: { fontSize: 13, color: '#34D399', fontFamily: font, fontWeight: 600 } }, '+48 this week')
        ),
        React.createElement('div', { style: { marginTop: 16, background: 'rgba(255,255,255,0.15)', borderRadius: 10, height: 6, overflow: 'hidden' } },
          React.createElement('div', { style: { width: '74%', height: '100%', background: '#34D399', borderRadius: 10, transition: 'width 0.6s ease' } })
        ),
        React.createElement('div', { style: { fontSize: 12, color: 'rgba(255,255,255,0.6)', fontFamily: font, marginTop: 6 } }, '258 pts to Green Guardian rank')
      ),

      // Quick Actions
      React.createElement('div', { style: { display: 'flex', gap: 10, marginBottom: 24 } },
        React.createElement('button', {
          onClick: () => setScanOverlay(true),
          style: {
            flex: 1, padding: '14px 16px', borderRadius: 14, background: t.cta, border: 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, cursor: 'pointer',
            boxShadow: `0 4px 16px ${t.cta}50`, transition: 'transform 0.15s ease'
          },
          onMouseDown: (e) => e.currentTarget.style.transform = 'scale(0.96)',
          onMouseUp: (e) => e.currentTarget.style.transform = 'scale(1)',
          onMouseLeave: (e) => e.currentTarget.style.transform = 'scale(1)',
        },
          React.createElement(Icon, { name: 'Camera', size: 18, color: '#fff' }),
          React.createElement('span', { style: { fontSize: 15, fontWeight: 600, color: '#fff', fontFamily: font } }, 'Scan Item')
        ),
        React.createElement('button', {
          onClick: () => setActiveScreen('challenges'),
          style: {
            flex: 1, padding: '14px 16px', borderRadius: 14, background: t.surfaceAlt, border: `1px solid ${t.border}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, cursor: 'pointer',
            transition: 'transform 0.15s ease'
          },
          onMouseDown: (e) => e.currentTarget.style.transform = 'scale(0.96)',
          onMouseUp: (e) => e.currentTarget.style.transform = 'scale(1)',
          onMouseLeave: (e) => e.currentTarget.style.transform = 'scale(1)',
        },
          React.createElement(Icon, { name: 'Trophy', size: 18, color: t.warning }),
          React.createElement('span', { style: { fontSize: 15, fontWeight: 600, color: t.text, fontFamily: font } }, 'Challenges')
        )
      ),

      // Active Challenge
      React.createElement('div', { style: { marginBottom: 24 } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 } },
          React.createElement('span', { style: { fontSize: 17, fontWeight: 700, color: t.text, fontFamily: font } }, 'Active Challenge'),
          React.createElement('button', {
            onClick: () => setActiveScreen('challenges'),
            style: { background: 'none', border: 'none', fontSize: 13, color: t.secondary, fontFamily: font, cursor: 'pointer', fontWeight: 600 }
          }, 'See all')
        ),
        React.createElement('div', {
          style: {
            background: t.card, borderRadius: 16, padding: 16, border: `1px solid ${t.border}`,
            transition: 'background 0.2s ease', cursor: 'pointer'
          },
          onClick: () => setActiveScreen('challenges')
        },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 } },
            React.createElement('div', { style: { width: 44, height: 44, borderRadius: 12, background: `${challenges[3].color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
              React.createElement(Icon, { name: challenges[3].icon, size: 22, color: challenges[3].color })
            ),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', { style: { fontSize: 15, fontWeight: 600, color: t.text, fontFamily: font } }, challenges[3].title),
              React.createElement('div', { style: { fontSize: 13, color: t.textSecondary, fontFamily: font } }, challenges[3].desc)
            ),
            React.createElement('div', { style: { fontSize: 12, color: t.warning, fontWeight: 600, fontFamily: font } }, challenges[3].deadline)
          ),
          React.createElement('div', { style: { background: t.surfaceAlt, borderRadius: 8, height: 8, overflow: 'hidden' } },
            React.createElement('div', { style: { width: `${(challenges[3].progress / challenges[3].total) * 100}%`, height: '100%', background: `linear-gradient(90deg, ${challenges[3].color}, ${t.cta})`, borderRadius: 8, transition: 'width 0.4s ease' } })
          ),
          React.createElement('div', { style: { fontSize: 12, color: t.textMuted, fontFamily: font, marginTop: 6 } }, `${challenges[3].progress}/${challenges[3].total} completed · ${challenges[3].pts} pts reward`)
        )
      ),

      // Recent Items
      React.createElement('div', null,
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 } },
          React.createElement('span', { style: { fontSize: 17, fontWeight: 700, color: t.text, fontFamily: font } }, 'My Items'),
          React.createElement('button', {
            onClick: () => setActiveScreen('items'),
            style: { background: 'none', border: 'none', fontSize: 13, color: t.secondary, fontFamily: font, cursor: 'pointer', fontWeight: 600 }
          }, 'View all')
        ),
        React.createElement('div', { style: { display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 4 } },
          myItems.slice(0, 3).map(item =>
            React.createElement('div', {
              key: item.id,
              onClick: () => { setSelectedItem(item); setActiveScreen('itemDetail'); },
              style: {
                minWidth: 140, background: t.card, borderRadius: 16, padding: 16, border: `1px solid ${t.border}`,
                cursor: 'pointer', transition: 'transform 0.15s ease, box-shadow 0.2s ease',
                animation: `fadeIn 0.4s ease ${item.id * 0.1}s both`
              },
              onMouseDown: (e) => { e.currentTarget.style.transform = 'scale(0.96)'; },
              onMouseUp: (e) => { e.currentTarget.style.transform = 'scale(1)'; },
              onMouseLeave: (e) => { e.currentTarget.style.transform = 'scale(1)'; }
            },
              React.createElement('div', { style: { width: 48, height: 48, borderRadius: 14, background: `${item.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 } },
                React.createElement(Icon, { name: item.icon, size: 24, color: item.color })
              ),
              React.createElement('div', { style: { fontSize: 14, fontWeight: 600, color: t.text, fontFamily: font, marginBottom: 4 } }, item.name),
              React.createElement('div', { style: { fontSize: 12, color: t.textSecondary, fontFamily: font, marginBottom: 8 } }, item.category),
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
                React.createElement('div', {
                  style: {
                    fontSize: 11, fontWeight: 700, color: '#fff', fontFamily: font,
                    background: item.score === 'A' ? '#22C55E' : item.score === 'B' ? '#84CC16' : item.score === 'C' ? '#F59E0B' : '#EF4444',
                    borderRadius: 6, padding: '2px 7px'
                  }
                }, `Grade ${item.score}`),
              )
            )
          )
        )
      )
    );
  }

  function ItemsScreen() {
    return React.createElement('div', { style: { padding: '20px 16px 24px', animation: 'fadeIn 0.4s ease' } },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 } },
        React.createElement('span', { style: { fontSize: 28, fontWeight: 700, color: t.text, fontFamily: font, letterSpacing: -0.5 } }, 'My Items'),
        React.createElement('div', { style: { fontSize: 13, color: t.textSecondary, fontFamily: font, background: t.surfaceAlt, padding: '6px 12px', borderRadius: 10 } }, `${myItems.length} items tracked`)
      ),

      // Stats row
      React.createElement('div', { style: { display: 'flex', gap: 10, marginBottom: 20 } },
        [
          { label: 'Total CO₂', value: '185 kg', icon: 'CloudRain', c: t.danger },
          { label: 'Saved', value: '42 kg', icon: 'Leaf', c: t.cta },
          { label: 'Actions', value: '12', icon: 'Zap', c: t.warning },
        ].map((s, i) =>
          React.createElement('div', { key: i, style: { flex: 1, background: t.card, borderRadius: 14, padding: '14px 12px', border: `1px solid ${t.border}`, textAlign: 'center' } },
            React.createElement('div', { style: { width: 32, height: 32, borderRadius: 10, background: `${s.c}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px' } },
              React.createElement(Icon, { name: s.icon, size: 16, color: s.c })
            ),
            React.createElement('div', { style: { fontSize: 17, fontWeight: 700, color: t.text, fontFamily: font } }, s.value),
            React.createElement('div', { style: { fontSize: 11, color: t.textMuted, fontFamily: font, marginTop: 2 } }, s.label)
          )
        )
      ),

      // Item list
      myItems.map((item, i) =>
        React.createElement('div', {
          key: item.id,
          onClick: () => { setSelectedItem(item); setActiveScreen('itemDetail'); },
          style: {
            background: t.card, borderRadius: 16, padding: 16, marginBottom: 10, border: `1px solid ${t.border}`,
            display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer',
            transition: 'transform 0.15s ease, background 0.2s ease',
            animation: `slideUp 0.4s ease ${i * 0.08}s both`
          },
          onMouseDown: (e) => e.currentTarget.style.transform = 'scale(0.98)',
          onMouseUp: (e) => e.currentTarget.style.transform = 'scale(1)',
          onMouseLeave: (e) => e.currentTarget.style.transform = 'scale(1)',
        },
          React.createElement('div', { style: { width: 52, height: 52, borderRadius: 14, background: `${item.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 } },
            React.createElement(Icon, { name: item.icon, size: 24, color: item.color })
          ),
          React.createElement('div', { style: { flex: 1, minWidth: 0 } },
            React.createElement('div', { style: { fontSize: 15, fontWeight: 600, color: t.text, fontFamily: font } }, item.name),
            React.createElement('div', { style: { fontSize: 13, color: t.textSecondary, fontFamily: font, marginTop: 2 } }, `${item.footprint} kg CO₂ · ${item.category}`),
          ),
          React.createElement('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 } },
            React.createElement('div', {
              style: {
                fontSize: 12, fontWeight: 700, color: '#fff', fontFamily: font,
                background: item.score === 'A' ? '#22C55E' : item.score === 'B' ? '#84CC16' : item.score === 'C' ? '#F59E0B' : '#EF4444',
                borderRadius: 8, padding: '3px 10px'
              }
            }, item.score),
            React.createElement(Icon, { name: 'ChevronRight', size: 16, color: t.textMuted })
          )
        )
      ),

      // Scan button
      React.createElement('button', {
        onClick: () => setScanOverlay(true),
        style: {
          width: '100%', padding: 16, borderRadius: 14, background: t.cta, border: 'none', marginTop: 8,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, cursor: 'pointer',
          boxShadow: `0 4px 16px ${t.cta}40`, transition: 'transform 0.15s ease'
        },
        onMouseDown: (e) => e.currentTarget.style.transform = 'scale(0.97)',
        onMouseUp: (e) => e.currentTarget.style.transform = 'scale(1)',
      },
        React.createElement(Icon, { name: 'Plus', size: 18, color: '#fff' }),
        React.createElement('span', { style: { fontSize: 15, fontWeight: 600, color: '#fff', fontFamily: font } }, 'Add New Item')
      )
    );
  }

  function ItemDetailScreen() {
    const item = selectedItem || myItems[0];
    return React.createElement('div', { style: { padding: '16px', animation: 'slideUp 0.35s ease' } },
      // Back
      React.createElement('button', {
        onClick: () => setActiveScreen('items'),
        style: { background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', marginBottom: 16, padding: 0 }
      },
        React.createElement(Icon, { name: 'ArrowLeft', size: 20, color: t.secondary }),
        React.createElement('span', { style: { fontSize: 15, color: t.secondary, fontFamily: font, fontWeight: 500 } }, 'Back')
      ),

      // Hero
      React.createElement('div', {
        style: {
          background: `linear-gradient(135deg, ${item.color}25, ${item.color}08)`,
          borderRadius: 20, padding: 28, textAlign: 'center', marginBottom: 20, border: `1px solid ${item.color}30`
        }
      },
        React.createElement('div', { style: { width: 72, height: 72, borderRadius: 20, background: `${item.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', animation: 'float 3s ease infinite' } },
          React.createElement(Icon, { name: item.icon, size: 36, color: item.color })
        ),
        React.createElement('div', { style: { fontSize: 22, fontWeight: 700, color: t.text, fontFamily: font, letterSpacing: -0.5 } }, item.name),
        React.createElement('div', { style: { fontSize: 15, color: t.textSecondary, fontFamily: font, marginTop: 4 } }, item.category)
      ),

      // Footprint card
      React.createElement('div', { style: { background: t.card, borderRadius: 16, padding: 18, marginBottom: 14, border: `1px solid ${t.border}` } },
        React.createElement('div', { style: { fontSize: 13, fontWeight: 600, color: t.textMuted, fontFamily: font, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 10 } }, 'Environmental Footprint'),
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 } },
          React.createElement('div', null,
            React.createElement('span', { style: { fontSize: 34, fontWeight: 800, color: t.text, fontFamily: font, letterSpacing: -1 } }, item.footprint),
            React.createElement('span', { style: { fontSize: 15, color: t.textSecondary, fontFamily: font, marginLeft: 4 } }, 'kg CO₂')
          ),
          React.createElement('div', {
            style: {
              fontSize: 20, fontWeight: 800, color: '#fff', fontFamily: font,
              background: item.score === 'A' ? '#22C55E' : item.score === 'B' ? '#84CC16' : item.score === 'C' ? '#F59E0B' : '#EF4444',
              borderRadius: 12, width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center'
            }
          }, item.score)
        ),
        React.createElement('div', { style: { background: t.surfaceAlt, borderRadius: 8, height: 6, overflow: 'hidden' } },
          React.createElement('div', { style: { width: `${Math.min(item.footprint / 80 * 100, 100)}%`, height: '100%', background: `linear-gradient(90deg, ${t.cta}, ${t.warning}, ${t.danger})`, borderRadius: 8 } })
        )
      ),

      // Materials
      React.createElement('div', { style: { background: t.card, borderRadius: 16, padding: 18, marginBottom: 14, border: `1px solid ${t.border}` } },
        React.createElement('div', { style: { fontSize: 13, fontWeight: 600, color: t.textMuted, fontFamily: font, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 12 } }, 'Material Breakdown'),
        item.materials.map((mat, i) =>
          React.createElement('div', { key: i, style: { display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: i < item.materials.length - 1 ? `1px solid ${t.border}` : 'none' } },
            React.createElement('div', { style: { width: 8, height: 8, borderRadius: 4, background: [t.primary, t.secondary, t.cta, t.warning][i % 4] } }),
            React.createElement('span', { style: { fontSize: 15, color: t.text, fontFamily: font } }, mat)
          )
        )
      ),

      // Legacy Actions
      React.createElement('div', { style: { background: t.card, borderRadius: 16, padding: 18, marginBottom: 14, border: `1px solid ${t.border}` } },
        React.createElement('div', { style: { fontSize: 13, fontWeight: 600, color: t.textMuted, fontFamily: font, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 12 } }, 'Legacy Actions'),
        item.actions.map((action, i) =>
          React.createElement('button', {
            key: i,
            onClick: (e) => { e.stopPropagation(); addScore(15 + i * 5); },
            style: {
              width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px',
              background: t.surfaceAlt, borderRadius: 12, border: `1px solid ${t.border}`, cursor: 'pointer', marginBottom: 8,
              transition: 'all 0.2s ease'
            },
            onMouseDown: (e) => e.currentTarget.style.background = t.cardHover,
            onMouseUp: (e) => e.currentTarget.style.background = t.surfaceAlt,
            onMouseLeave: (e) => e.currentTarget.style.background = t.surfaceAlt,
          },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10 } },
              React.createElement('div', { style: { width: 36, height: 36, borderRadius: 10, background: `${t.cta}18`, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
                React.createElement(Icon, { name: ['Wrench', 'Heart', 'Recycle'][i % 3], size: 16, color: t.cta })
              ),
              React.createElement('span', { style: { fontSize: 15, color: t.text, fontFamily: font, fontWeight: 500 } }, action)
            ),
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
              React.createElement('span', { style: { fontSize: 13, color: t.cta, fontFamily: font, fontWeight: 600 } }, `+${15 + i * 5}`),
              React.createElement(Icon, { name: 'ChevronRight', size: 14, color: t.textMuted })
            )
          )
        )
      )
    );
  }

  function ChallengesScreen() {
    return React.createElement('div', { style: { padding: '20px 16px 24px', animation: 'fadeIn 0.4s ease' } },
      React.createElement('div', { style: { fontSize: 28, fontWeight: 700, color: t.text, fontFamily: font, letterSpacing: -0.5, marginBottom: 6 } }, 'Challenges'),
      React.createElement('div', { style: { fontSize: 15, color: t.textSecondary, fontFamily: font, marginBottom: 24 } }, 'Complete challenges to earn bonus EcoLegacy points'),

      // Featured
      React.createElement('div', {
        style: {
          background: `linear-gradient(135deg, ${t.primary}20, ${t.cta}15)`,
          borderRadius: 20, padding: 20, marginBottom: 20, border: `1px solid ${t.primary}30`,
          position: 'relative', overflow: 'hidden'
        }
      },
        React.createElement('div', { style: { position: 'absolute', top: -20, right: -20, width: 100, height: 100, borderRadius: '50%', background: `${t.cta}10` } }),
        React.createElement('div', { style: { fontSize: 11, fontWeight: 700, color: t.cta, fontFamily: font, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 } }, 'Featured Challenge'),
        React.createElement('div', { style: { fontSize: 20, fontWeight: 700, color: t.text, fontFamily: font, marginBottom: 6, letterSpacing: -0.3 } }, 'Earth Day Special'),
        React.createElement('div', { style: { fontSize: 14, color: t.textSecondary, fontFamily: font, marginBottom: 16 } }, 'Take sustainable action on 15 items before Earth Day and earn a rare badge'),
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12 } },
          React.createElement('div', { style: { flex: 1, background: 'rgba(255,255,255,0.1)', borderRadius: 8, height: 8, overflow: 'hidden' } },
            React.createElement('div', { style: { width: '40%', height: '100%', background: `linear-gradient(90deg, ${t.cta}, ${t.ctaLight})`, borderRadius: 8 } })
          ),
          React.createElement('span', { style: { fontSize: 13, color: t.cta, fontFamily: font, fontWeight: 600 } }, '6/15'),
          React.createElement('span', { style: { fontSize: 13, color: t.warning, fontFamily: font, fontWeight: 600 } }, '500 pts')
        )
      ),

      // All challenges
      challenges.map((ch, i) =>
        React.createElement('div', {
          key: ch.id,
          style: {
            background: t.card, borderRadius: 16, padding: 16, marginBottom: 10, border: `1px solid ${t.border}`,
            cursor: 'pointer', transition: 'transform 0.15s ease',
            animation: `slideUp 0.4s ease ${i * 0.08}s both`
          },
          onMouseDown: (e) => e.currentTarget.style.transform = 'scale(0.98)',
          onMouseUp: (e) => e.currentTarget.style.transform = 'scale(1)',
          onMouseLeave: (e) => e.currentTarget.style.transform = 'scale(1)',
        },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 } },
            React.createElement('div', { style: { width: 48, height: 48, borderRadius: 14, background: `${ch.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
              React.createElement(Icon, { name: ch.icon, size: 22, color: ch.color })
            ),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', { style: { fontSize: 15, fontWeight: 600, color: t.text, fontFamily: font } }, ch.title),
              React.createElement('div', { style: { fontSize: 13, color: t.textSecondary, fontFamily: font, marginTop: 2 } }, ch.desc)
            )
          ),
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 } },
            React.createElement('div', { style: { flex: 1, background: t.surfaceAlt, borderRadius: 6, height: 6, overflow: 'hidden' } },
              React.createElement('div', { style: { width: `${(ch.progress / ch.total) * 100}%`, height: '100%', background: `linear-gradient(90deg, ${ch.color}, ${t.cta})`, borderRadius: 6, transition: 'width 0.4s ease' } })
            ),
            React.createElement('span', { style: { fontSize: 13, fontWeight: 600, color: t.text, fontFamily: font, minWidth: 32, textAlign: 'right' } }, `${ch.progress}/${ch.total}`)
          ),
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between' } },
            React.createElement('span', { style: { fontSize: 12, color: t.textMuted, fontFamily: font } }, ch.deadline),
            React.createElement('span', { style: { fontSize: 12, color: t.cta, fontWeight: 600, fontFamily: font } }, `${ch.pts} pts reward`)
          )
        )
      )
    );
  }

  function CommunityScreen() {
    const sorted = [...leaderboard].sort((a, b) => b.score - a.score);
    return React.createElement('div', { style: { padding: '20px 16px 24px', animation: 'fadeIn 0.4s ease' } },
      React.createElement('div', { style: { fontSize: 28, fontWeight: 700, color: t.text, fontFamily: font, letterSpacing: -0.5, marginBottom: 6 } }, 'Community'),
      React.createElement('div', { style: { fontSize: 15, color: t.textSecondary, fontFamily: font, marginBottom: 24 } }, 'See how you stack up against fellow eco-warriors'),

      // Top 3 podium
      React.createElement('div', { style: { display: 'flex', justifyContent: 'center', alignItems: 'flex-end', gap: 8, marginBottom: 28 } },
        [sorted[1], sorted[0], sorted[2]].map((user, i) => {
          const isFirst = i === 1;
          const heights = [100, 130, 85];
          const colors = ['#C0C0C0', '#FFD700', '#CD7F32'];
          return React.createElement('div', {
            key: i,
            style: { textAlign: 'center', animation: `slideUp 0.5s ease ${i * 0.1}s both` }
          },
            React.createElement('div', {
              style: {
                width: isFirst ? 56 : 48, height: isFirst ? 56 : 48, borderRadius: '50%',
                background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px',
                border: `3px solid ${colors[i]}`, fontSize: isFirst ? 24 : 20,
                boxShadow: isFirst ? `0 4px 20px ${t.primary}50` : 'none'
              }
            }, user.avatar),
            React.createElement('div', { style: { fontSize: 13, fontWeight: 600, color: t.text, fontFamily: font, marginBottom: 2 } }, user.name.split(' ')[0]),
            React.createElement('div', { style: { fontSize: 12, color: t.textSecondary, fontFamily: font, marginBottom: 6 } }, user.score.toLocaleString()),
            React.createElement('div', {
              style: {
                width: isFirst ? 80 : 70, height: heights[i], borderRadius: '12px 12px 0 0',
                background: `linear-gradient(180deg, ${colors[i]}40, ${colors[i]}15)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }
            },
              React.createElement('span', { style: { fontSize: 22, fontWeight: 800, color: colors[i], fontFamily: font } }, [2, 1, 3][i])
            )
          );
        })
      ),

      // Full list
      React.createElement('div', { style: { fontSize: 15, fontWeight: 600, color: t.text, fontFamily: font, marginBottom: 12 } }, 'Global Leaderboard'),
      sorted.map((user, i) =>
        React.createElement('div', {
          key: i,
          style: {
            display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', marginBottom: 8,
            background: user.isUser ? `${t.primary}15` : t.card,
            borderRadius: 14, border: `1px solid ${user.isUser ? t.primary + '40' : t.border}`,
            animation: `fadeIn 0.3s ease ${i * 0.06}s both`
          }
        },
          React.createElement('span', { style: { fontSize: 15, fontWeight: 700, color: t.textMuted, fontFamily: font, width: 28 } }, `#${i + 1}`),
          React.createElement('div', {
            style: {
              width: 40, height: 40, borderRadius: '50%',
              background: user.isUser ? `linear-gradient(135deg, ${t.primary}, ${t.cta})` : t.surfaceAlt,
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18
            }
          }, user.avatar),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', { style: { fontSize: 15, fontWeight: user.isUser ? 700 : 500, color: t.text, fontFamily: font } }, user.name),
            React.createElement('div', { style: { fontSize: 12, color: t.secondary, fontFamily: font } }, user.badge)
          ),
          React.createElement('span', { style: { fontSize: 15, fontWeight: 700, color: user.isUser ? t.primary : t.text, fontFamily: font } }, user.score.toLocaleString())
        )
      ),

      // Groups section
      React.createElement('div', { style: { marginTop: 20 } },
        React.createElement('div', { style: { fontSize: 15, fontWeight: 600, color: t.text, fontFamily: font, marginBottom: 12 } }, 'My Groups'),
        React.createElement('div', {
          style: {
            background: t.card, borderRadius: 16, padding: 20, border: `1px solid ${t.border}`, textAlign: 'center'
          }
        },
          React.createElement('div', { style: { width: 48, height: 48, borderRadius: 14, background: `${t.primary}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' } },
            React.createElement(Icon, { name: 'Users', size: 22, color: t.primary })
          ),
          React.createElement('div', { style: { fontSize: 15, fontWeight: 600, color: t.text, fontFamily: font, marginBottom: 4 } }, 'Create a Group'),
          React.createElement('div', { style: { fontSize: 13, color: t.textSecondary, fontFamily: font, marginBottom: 14 } }, 'Challenge friends and track group impact'),
          React.createElement('button', {
            style: {
              padding: '10px 24px', borderRadius: 12, background: t.primary, border: 'none',
              fontSize: 14, fontWeight: 600, color: '#fff', fontFamily: font, cursor: 'pointer'
            }
          }, 'Create Group')
        )
      )
    );
  }

  function ProfileScreen() {
    const badges = [
      { name: 'First Scan', icon: 'Camera', earned: true },
      { name: '10 Actions', icon: 'Zap', earned: true },
      { name: 'Textile Hero', icon: 'Scissors', earned: true },
      { name: 'Tech Saver', icon: 'Cpu', earned: false },
      { name: 'Community Lead', icon: 'Users', earned: false },
      { name: 'Zero Waste', icon: 'Leaf', earned: false },
    ];

    return React.createElement('div', { style: { padding: '20px 16px 24px', animation: 'fadeIn 0.4s ease' } },
      // Header
      React.createElement('div', { style: { textAlign: 'center', marginBottom: 28 } },
        React.createElement('div', {
          style: {
            width: 80, height: 80, borderRadius: '50%', margin: '0 auto 14px',
            background: `linear-gradient(135deg, ${t.primary}, ${t.cta})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: `0 8px 24px ${t.primary}40`
          }
        },
          React.createElement(Icon, { name: 'User', size: 36, color: '#fff' })
        ),
        React.createElement('div', { style: { fontSize: 22, fontWeight: 700, color: t.text, fontFamily: font, letterSpacing: -0.3 } }, 'Alex Morgan'),
        React.createElement('div', { style: { fontSize: 14, color: t.textSecondary, fontFamily: font, marginTop: 4 } }, 'Eco warrior since March 2026'),
        React.createElement('div', { style: { display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 10, padding: '6px 14px', borderRadius: 20, background: `${t.cta}18` } },
          React.createElement(Icon, { name: 'Award', size: 14, color: t.cta }),
          React.createElement('span', { style: { fontSize: 13, fontWeight: 600, color: t.cta, fontFamily: font } }, 'Rising Star')
        )
      ),

      // Stats grid
      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 24 } },
        [
          { label: 'Items Scanned', value: myItems.length, icon: 'Package', c: t.primary },
          { label: 'Actions Taken', value: 12, icon: 'Zap', c: t.warning },
          { label: 'CO₂ Saved', value: '42 kg', icon: 'Leaf', c: t.cta },
          { label: 'EcoScore', value: ecoScore, icon: 'Star', c: t.accent },
        ].map((s, i) =>
          React.createElement('div', {
            key: i,
            style: {
              background: t.card, borderRadius: 16, padding: 16, border: `1px solid ${t.border}`,
              animation: `fadeIn 0.3s ease ${i * 0.08}s both`
            }
          },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 } },
              React.createElement('div', { style: { width: 32, height: 32, borderRadius: 10, background: `${s.c}18`, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
                React.createElement(Icon, { name: s.icon, size: 16, color: s.c })
              )
            ),
            React.createElement('div', { style: { fontSize: 22, fontWeight: 700, color: t.text, fontFamily: font, letterSpacing: -0.3 } }, s.value),
            React.createElement('div', { style: { fontSize: 12, color: t.textMuted, fontFamily: font, marginTop: 2 } }, s.label)
          )
        )
      ),

      // Badges
      React.createElement('div', { style: { marginBottom: 24 } },
        React.createElement('div', { style: { fontSize: 17, fontWeight: 700, color: t.text, fontFamily: font, marginBottom: 14 } }, 'Badges'),
        React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 } },
          badges.map((badge, i) =>
            React.createElement('div', {
              key: i,
              style: {
                textAlign: 'center', padding: '16px 8px', borderRadius: 16,
                background: badge.earned ? `${t.primary}12` : t.surfaceAlt,
                border: `1px solid ${badge.earned ? t.primary + '30' : t.border}`,
                opacity: badge.earned ? 1 : 0.5,
                animation: `fadeIn 0.3s ease ${i * 0.06}s both`
              }
            },
              React.createElement('div', {
                style: {
                  width: 44, height: 44, borderRadius: 14,
                  background: badge.earned ? `linear-gradient(135deg, ${t.primary}, ${t.secondary})` : t.surfaceAlt,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px'
                }
              },
                React.createElement(Icon, { name: badge.icon, size: 20, color: badge.earned ? '#fff' : t.textMuted })
              ),
              React.createElement('div', { style: { fontSize: 12, fontWeight: 600, color: badge.earned ? t.text : t.textMuted, fontFamily: font } }, badge.name)
            )
          )
        )
      ),

      // Settings shortcuts
      React.createElement('div', null,
        [
          { label: 'Notification Settings', icon: 'Bell' },
          { label: 'Privacy & Data', icon: 'Shield' },
          { label: 'Help & Support', icon: 'HelpCircle' },
        ].map((item, i) =>
          React.createElement('div', {
            key: i,
            style: {
              display: 'flex', alignItems: 'center', gap: 12, padding: '14px 0',
              borderBottom: i < 2 ? `1px solid ${t.border}` : 'none', cursor: 'pointer'
            }
          },
            React.createElement('div', { style: { width: 36, height: 36, borderRadius: 10, background: t.surfaceAlt, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
              React.createElement(Icon, { name: item.icon, size: 18, color: t.textSecondary })
            ),
            React.createElement('span', { style: { fontSize: 15, color: t.text, fontFamily: font, flex: 1 } }, item.label),
            React.createElement(Icon, { name: 'ChevronRight', size: 16, color: t.textMuted })
          )
        )
      )
    );
  }

  // --- SCAN OVERLAY ---
  function ScanOverlay() {
    const [scanning, setScanning] = useState(true);
    const [found, setFound] = useState(false);

    useEffect(() => {
      const timer = setTimeout(() => { setScanning(false); setFound(true); }, 2500);
      return () => clearTimeout(timer);
    }, []);

    return React.createElement('div', {
      style: {
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        background: t.overlay, zIndex: 100, display: 'flex', flexDirection: 'column',
        animation: 'fadeIn 0.3s ease'
      }
    },
      // Close button
      React.createElement('button', {
        onClick: () => setScanOverlay(false),
        style: {
          position: 'absolute', top: 16, right: 16, zIndex: 101,
          width: 40, height: 40, borderRadius: 20, background: 'rgba(0,0,0,0.5)',
          border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
        }
      }, React.createElement(Icon, { name: 'X', size: 20, color: '#fff' })),

      scanning ? React.createElement('div', { style: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' } },
        // Scan area
        React.createElement('div', {
          style: {
            width: 240, height: 240, borderRadius: 24, position: 'relative',
            border: `3px solid ${t.cta}`, marginBottom: 32
          }
        },
          // Corner markers
          ...['topLeft', 'topRight', 'bottomLeft', 'bottomRight'].map((pos, i) =>
            React.createElement('div', {
              key: pos,
              style: {
                position: 'absolute', width: 32, height: 32,
                [pos.includes('top') ? 'top' : 'bottom']: -2,
                [pos.includes('Left') ? 'left' : 'right']: -2,
                borderTop: pos.includes('top') ? `4px solid ${t.cta}` : 'none',
                borderBottom: pos.includes('bottom') ? `4px solid ${t.cta}` : 'none',
                borderLeft: pos.includes('Left') ? `4px solid ${t.cta}` : 'none',
                borderRight: pos.includes('Right') ? `4px solid ${t.cta}` : 'none',
                borderRadius: pos === 'topLeft' ? '12px 0 0 0' : pos === 'topRight' ? '0 12px 0 0' : pos === 'bottomLeft' ? '0 0 0 12px' : '0 0 12px 0'
              }
            })
          ),
          // Scanning line
          React.createElement('div', {
            style: {
              position: 'absolute', left: 8, right: 8, height: 2,
              background: `linear-gradient(90deg, transparent, ${t.cta}, transparent)`,
              animation: 'scanLine 2s ease-in-out infinite', boxShadow: `0 0 12px ${t.cta}`
            }
          })
        ),
        React.createElement('div', { style: { fontSize: 17, fontWeight: 600, color: '#fff', fontFamily: font } }, 'Scanning item...'),
        React.createElement('div', { style: { fontSize: 13, color: 'rgba(255,255,255,0.6)', fontFamily: font, marginTop: 6 } }, 'Point your camera at the item or barcode')
      ) :
      // Found result
      React.createElement('div', { style: { flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 16 } },
        React.createElement('div', {
          style: {
            background: t.surface, borderRadius: 24, padding: 24, animation: 'slideUp 0.4s ease'
          }
        },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6, marginBottom: 16 } },
            React.createElement(Icon, { name: 'CheckCircle', size: 20, color: t.cta }),
            React.createElement('span', { style: { fontSize: 15, fontWeight: 600, color: t.cta, fontFamily: font } }, 'Item Identified!')
          ),
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 } },
            React.createElement('div', { style: { width: 56, height: 56, borderRadius: 16, background: `${t.primary}18`, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
              React.createElement(Icon, { name: 'Shirt', size: 28, color: t.primary })
            ),
            React.createElement('div', null,
              React.createElement('div', { style: { fontSize: 18, fontWeight: 700, color: t.text, fontFamily: font } }, 'Cotton T-Shirt'),
              React.createElement('div', { style: { fontSize: 14, color: t.textSecondary, fontFamily: font } }, 'Fast Fashion Brand · Clothing')
            )
          ),
          React.createElement('div', { style: { display: 'flex', gap: 10, marginBottom: 18 } },
            React.createElement('div', { style: { flex: 1, background: t.surfaceAlt, borderRadius: 12, padding: 12, textAlign: 'center' } },
              React.createElement('div', { style: { fontSize: 20, fontWeight: 700, color: t.danger, fontFamily: font } }, '8.1'),
              React.createElement('div', { style: { fontSize: 11, color: t.textMuted, fontFamily: font, marginTop: 2 } }, 'kg CO₂')
            ),
            React.createElement('div', { style: { flex: 1, background: t.surfaceAlt, borderRadius: 12, padding: 12, textAlign: 'center' } },
              React.createElement('div', {
                style: { fontSize: 20, fontWeight: 700, color: '#F59E0B', fontFamily: font }
              }, 'C'),
              React.createElement('div', { style: { fontSize: 11, color: t.textMuted, fontFamily: font, marginTop: 2 } }, 'Eco Grade')
            ),
            React.createElement('div', { style: { flex: 1, background: t.surfaceAlt, borderRadius: 12, padding: 12, textAlign: 'center' } },
              React.createElement('div', { style: { fontSize: 20, fontWeight: 700, color: t.primary, fontFamily: font } }, '3'),
              React.createElement('div', { style: { fontSize: 11, color: t.textMuted, fontFamily: font, marginTop: 2 } }, 'Actions')
            )
          ),
          React.createElement('button', {
            onClick: () => {
              setScanOverlay(false);
              setSelectedItem({ id: 99, name: 'Cotton T-Shirt', category: 'Clothing', footprint: 8.1, score: 'C', materials: ['Cotton 95%', 'Elastane 5%'], icon: 'Shirt', color: '#6366F1', actions: ['Donate to charity', 'Upcycle into tote', 'Textile recycling'] });
              setActiveScreen('itemDetail');
              addScore(10);
            },
            style: {
              width: '100%', padding: 16, borderRadius: 14, background: t.cta, border: 'none',
              fontSize: 15, fontWeight: 600, color: '#fff', fontFamily: font, cursor: 'pointer',
              boxShadow: `0 4px 16px ${t.cta}40`
            }
          }, 'View Full Eco Story'),
          React.createElement('button', {
            onClick: () => setScanOverlay(false),
            style: {
              width: '100%', padding: 14, borderRadius: 14, background: 'transparent', border: 'none',
              fontSize: 15, fontWeight: 500, color: t.textSecondary, fontFamily: font, cursor: 'pointer', marginTop: 4
            }
          }, 'Scan Another Item')
        )
      )
    );
  }

  // --- NAVIGATION ---
  const tabs = [
    { id: 'home', label: 'Home', icon: 'Home' },
    { id: 'items', label: 'Items', icon: 'Package' },
    { id: 'challenges', label: 'Challenges', icon: 'Trophy' },
    { id: 'community', label: 'Community', icon: 'Users' },
    { id: 'profile', label: 'Profile', icon: 'User' },
  ];

  const screens = {
    home: HomeScreen,
    items: ItemsScreen,
    itemDetail: ItemDetailScreen,
    challenges: ChallengesScreen,
    community: CommunityScreen,
    profile: ProfileScreen,
  };

  const ActiveScreenComponent = screens[activeScreen] || HomeScreen;

  return React.createElement('div', {
    style: { minHeight: '100vh', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: font, padding: '20px 0' }
  },
    styleTag,

    // Phone frame
    React.createElement('div', {
      style: {
        width: 375, height: 812, borderRadius: 40, background: t.bg,
        position: 'relative', overflow: 'hidden',
        boxShadow: '0 25px 80px rgba(0,0,0,0.3), 0 0 0 1px rgba(0,0,0,0.1)',
        display: 'flex', flexDirection: 'column',
        transition: 'background 0.3s ease'
      }
    },
      // Content area
      React.createElement('div', {
        style: { flex: 1, overflowY: 'auto', overflowX: 'hidden', paddingTop: 8, paddingBottom: 80 }
      },
        React.createElement(ActiveScreenComponent)
      ),

      // Scan overlay
      scanOverlay && React.createElement(ScanOverlay),

      // Toast
      toastMsg && React.createElement('div', {
        style: {
          position: 'absolute', top: 20, left: 16, right: 16, zIndex: 200,
          background: t.cta, borderRadius: 14, padding: '14px 20px',
          display: 'flex', alignItems: 'center', gap: 10, animation: 'slideUp 0.3s ease',
          boxShadow: `0 8px 24px ${t.cta}50`
        }
      },
        React.createElement(Icon, { name: 'Sparkles', size: 18, color: '#fff' }),
        React.createElement('span', { style: { fontSize: 15, fontWeight: 600, color: '#fff', fontFamily: font } }, toastMsg)
      ),

      // Bottom Navigation
      React.createElement('div', {
        style: {
          position: 'absolute', bottom: 0, left: 0, right: 0,
          background: themeMode === 'dark' ? 'rgba(26,29,39,0.92)' : 'rgba(255,255,255,0.92)',
          backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
          borderTop: `1px solid ${t.border}`,
          display: 'flex', justifyContent: 'space-around', alignItems: 'center',
          padding: '8px 0 24px', zIndex: 50
        }
      },
        tabs.map(tab => {
          const isActive = activeScreen === tab.id || (tab.id === 'items' && activeScreen === 'itemDetail');
          return React.createElement('button', {
            key: tab.id,
            onClick: () => setActiveScreen(tab.id),
            style: {
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
              background: 'none', border: 'none', cursor: 'pointer', padding: '4px 12px',
              minWidth: 52, minHeight: 44, transition: 'transform 0.15s ease'
            },
            onMouseDown: (e) => e.currentTarget.style.transform = 'scale(0.9)',
            onMouseUp: (e) => e.currentTarget.style.transform = 'scale(1)',
            onMouseLeave: (e) => e.currentTarget.style.transform = 'scale(1)',
          },
            React.createElement(Icon, { name: tab.icon, size: 22, color: isActive ? t.primary : t.textMuted }),
            React.createElement('span', {
              style: { fontSize: 10, fontWeight: isActive ? 600 : 400, color: isActive ? t.primary : t.textMuted, fontFamily: font }
            }, tab.label)
          );
        })
      )
    )
  );
}
