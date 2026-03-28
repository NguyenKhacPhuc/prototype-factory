const { useState, useEffect, useRef } = React;

const themes = {
  light: {
    bg: '#FAF8F5',
    surface: '#FFFFFF',
    surfaceAlt: '#F5F0EB',
    primary: '#D4522A',
    primaryLight: '#E8866A',
    primaryPale: '#FDF0EB',
    text: '#1A1208',
    textSub: '#6B5B4E',
    textMuted: '#A89585',
    border: '#E8DDD5',
    navBg: '#FFFFFF',
    cardShadow: '0 4px 20px rgba(100,50,20,0.10)',
    accent: '#4A7C59',
    accentLight: '#7AAE8A',
  },
  dark: {
    bg: '#1A1208',
    surface: '#2A1E14',
    surfaceAlt: '#341F10',
    primary: '#E8866A',
    primaryLight: '#F0A888',
    primaryPale: '#2A1A10',
    text: '#FAF8F5',
    textSub: '#C8B5A5',
    textMuted: '#8A7060',
    border: '#3A2A1C',
    navBg: '#1E1208',
    cardShadow: '0 4px 20px rgba(0,0,0,0.4)',
    accent: '#7AAE8A',
    accentLight: '#9AC8AA',
  }
};

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isDark, setIsDark] = useState(false);
  const [pressedTab, setPressedTab] = useState(null);
  const t = isDark ? themes.dark : themes.light;

  const fontStyle = `
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400;1,600&family=Inter:wght@300;400;500;600&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    ::-webkit-scrollbar { width: 0px; }
  `;

  const tabs = [
    { id: 'home', label: 'Home', icon: window.lucide.Home },
    { id: 'collection', label: 'Collection', icon: window.lucide.Sparkles },
    { id: 'quests', label: 'Quests', icon: window.lucide.Zap },
    { id: 'impact', label: 'Impact', icon: window.lucide.Globe },
    { id: 'profile', label: 'Profile', icon: window.lucide.User },
  ];

  const screens = {
    home: HomeScreen,
    collection: CollectionScreen,
    quests: QuestsScreen,
    impact: ImpactScreen,
    profile: ProfileScreen,
  };

  const ActiveScreen = screens[activeTab];

  return React.createElement('div', {
    style: { minHeight: '100vh', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', fontFamily: "'Inter', sans-serif" }
  },
    React.createElement('style', null, fontStyle),
    React.createElement('div', {
      style: { width: 375, height: 812, background: t.bg, borderRadius: 44, overflow: 'hidden', position: 'relative', boxShadow: '0 30px 80px rgba(0,0,0,0.25), 0 0 0 1px rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'column' }
    },
      // Dynamic Island
      React.createElement('div', { style: { position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)', width: 120, height: 34, background: '#000', borderRadius: 20, zIndex: 50 } }),

      // Status Bar
      React.createElement('div', { style: { height: 54, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', paddingLeft: 24, paddingRight: 20, paddingBottom: 8, flexShrink: 0, zIndex: 10 } },
        React.createElement('span', { style: { fontSize: 14, fontWeight: 600, color: t.text, fontFamily: "'Inter', sans-serif" } }, '9:41'),
        React.createElement('div', { style: { display: 'flex', gap: 6, alignItems: 'center' } },
          React.createElement(window.lucide.Wifi, { size: 14, color: t.text }),
          React.createElement(window.lucide.Signal, { size: 14, color: t.text }),
          React.createElement(window.lucide.Battery, { size: 16, color: t.text })
        )
      ),

      // Screen Content
      React.createElement('div', { style: { flex: 1, overflow: 'hidden' } },
        React.createElement(ActiveScreen, { t, isDark, setIsDark })
      ),

      // Bottom Nav
      React.createElement('div', { style: { height: 80, background: t.navBg, borderTop: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-around', paddingBottom: 16, paddingTop: 8, flexShrink: 0 } },
        tabs.map(tab =>
          React.createElement('div', {
            key: tab.id,
            onClick: () => setActiveTab(tab.id),
            onMouseDown: () => setPressedTab(tab.id),
            onMouseUp: () => setPressedTab(null),
            style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, cursor: 'pointer', padding: '6px 12px', borderRadius: 12, transition: 'all 0.15s ease', transform: pressedTab === tab.id ? 'scale(0.92)' : 'scale(1)', background: activeTab === tab.id ? t.primaryPale : 'transparent' }
          },
            React.createElement(tab.icon, { size: 22, color: activeTab === tab.id ? t.primary : t.textMuted, strokeWidth: activeTab === tab.id ? 2.5 : 1.8 }),
            React.createElement('span', { style: { fontSize: 10, fontWeight: activeTab === tab.id ? 600 : 400, color: activeTab === tab.id ? t.primary : t.textMuted, fontFamily: "'Inter', sans-serif", letterSpacing: '0.02em' } }, tab.label)
          )
        )
      )
    )
  );
}

// ─── HOME SCREEN ─────────────────────────────────────────────────────────────

function HomeScreen({ t }) {
  const [liked, setLiked] = useState({});

  const recentTokens = [
    { name: 'Amur Leopard', rarity: 'LEGENDARY', xp: 320, color: '#E8866A', emoji: '🐆', category: 'Run 10km' },
    { name: 'Blue Macaw', rarity: 'RARE', xp: 180, color: '#4A7C59', emoji: '🦜', category: 'Yoga 30min' },
    { name: 'Sea Turtle', rarity: 'COMMON', xp: 80, color: '#6B8CAE', emoji: '🐢', category: 'Bike 5km' },
  ];

  return React.createElement('div', { style: { height: '100%', overflowY: 'auto', background: t.bg } },
    // Header Editorial Banner
    React.createElement('div', { style: { padding: '12px 24px 0', position: 'relative' } },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 } },
        React.createElement('div', null,
          React.createElement('p', { style: { fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', color: t.primary, fontFamily: "'Inter', sans-serif", textTransform: 'uppercase' } }, 'Sunday, March 29'),
          React.createElement('h1', { style: { fontSize: 28, fontWeight: 900, color: t.text, fontFamily: "'Playfair Display', serif", lineHeight: 1.1, marginTop: 2 } }, 'Good morning,\nAlex')
        ),
        React.createElement('div', { style: { width: 44, height: 44, borderRadius: '50%', background: t.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 } }, '🌿')
      ),

      // XP Progress Bar
      React.createElement('div', { style: { background: t.surfaceAlt, borderRadius: 12, padding: '12px 14px', marginTop: 14, border: `1px solid ${t.border}` } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 } },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6 } },
            React.createElement(window.lucide.Leaf, { size: 14, color: t.accent }),
            React.createElement('span', { style: { fontSize: 12, fontWeight: 600, color: t.text, fontFamily: "'Inter', sans-serif" } }, 'Eco Level 12'),
          ),
          React.createElement('span', { style: { fontSize: 12, color: t.textMuted, fontFamily: "'Inter', sans-serif" } }, '2,840 / 3,500 XP')
        ),
        React.createElement('div', { style: { height: 6, background: t.border, borderRadius: 4, overflow: 'hidden' } },
          React.createElement('div', { style: { height: '100%', width: '81%', background: `linear-gradient(90deg, ${t.primary}, ${t.accent})`, borderRadius: 4, transition: 'width 0.8s ease' } })
        )
      )
    ),

    // Featured — Overlapping angled cards
    React.createElement('div', { style: { padding: '20px 24px 8px' } },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 } },
        React.createElement('h2', { style: { fontSize: 20, fontWeight: 700, color: t.text, fontFamily: "'Playfair Display', serif" } }, 'Today\'s Quest'),
        React.createElement('span', { style: { fontSize: 11, color: t.primary, fontWeight: 600, letterSpacing: '0.05em', fontFamily: "'Inter', sans-serif" } }, 'VIEW ALL →')
      ),

      // Featured Quest Card — angled
      React.createElement('div', { style: { position: 'relative', height: 180, marginBottom: 8 } },
        // Back card (rotated)
        React.createElement('div', { style: { position: 'absolute', top: 8, left: 8, right: -8, bottom: -4, background: t.accent, borderRadius: 18, transform: 'rotate(2.5deg)', opacity: 0.5 } }),
        // Front card
        React.createElement('div', { style: { position: 'absolute', inset: 0, background: `linear-gradient(135deg, ${t.primary} 0%, #A83820 100%)`, borderRadius: 18, padding: '18px 20px', overflow: 'hidden' } },
          React.createElement('div', { style: { position: 'absolute', top: -20, right: -20, fontSize: 100, opacity: 0.15 } }, '🌿'),
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' } },
            React.createElement('div', null,
              React.createElement('span', { style: { fontSize: 10, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.7)', fontFamily: "'Inter', sans-serif", textTransform: 'uppercase', fontWeight: 600 } }, 'Daily Challenge'),
              React.createElement('h3', { style: { fontSize: 22, fontWeight: 900, color: '#fff', fontFamily: "'Playfair Display', serif", lineHeight: 1.2, marginTop: 4, maxWidth: 200 } }, 'Plogging\nSunrise Run')
            ),
            React.createElement('div', { style: { background: 'rgba(255,255,255,0.2)', borderRadius: 10, padding: '6px 10px', textAlign: 'center' } },
              React.createElement('div', { style: { fontSize: 20, fontWeight: 900, color: '#fff', fontFamily: "'Playfair Display', serif" } }, '3.2'),
              React.createElement('div', { style: { fontSize: 10, color: 'rgba(255,255,255,0.7)', fontFamily: "'Inter', sans-serif" } }, 'km goal')
            )
          ),
          React.createElement('div', { style: { marginTop: 16, display: 'flex', gap: 8 } },
            React.createElement('div', { style: { background: 'rgba(255,255,255,0.15)', borderRadius: 20, padding: '5px 12px', display: 'flex', alignItems: 'center', gap: 5 } },
              React.createElement(window.lucide.Timer, { size: 12, color: '#fff' }),
              React.createElement('span', { style: { fontSize: 11, color: '#fff', fontFamily: "'Inter', sans-serif", fontWeight: 500 } }, '45 min left')
            ),
            React.createElement('div', { style: { background: 'rgba(255,255,255,0.15)', borderRadius: 20, padding: '5px 12px', display: 'flex', alignItems: 'center', gap: 5 } },
              React.createElement(window.lucide.Award, { size: 12, color: '#fff' }),
              React.createElement('span', { style: { fontSize: 11, color: '#fff', fontFamily: "'Inter', sans-serif", fontWeight: 500 } }, '+280 XP')
            )
          )
        )
      )
    ),

    // Stats Row
    React.createElement('div', { style: { padding: '4px 24px 12px', display: 'flex', gap: 10 } },
      [
        { icon: window.lucide.Footprints, label: 'Steps', value: '8,420', unit: 'today' },
        { icon: window.lucide.Flame, label: 'Streak', value: '14', unit: 'days' },
        { icon: window.lucide.TreePine, label: 'Trees', value: '3', unit: 'planted' },
      ].map(stat =>
        React.createElement('div', { key: stat.label, style: { flex: 1, background: t.surface, borderRadius: 14, padding: '12px 10px', border: `1px solid ${t.border}`, textAlign: 'center' } },
          React.createElement(stat.icon, { size: 18, color: t.primary, style: { margin: '0 auto 4px' } }),
          React.createElement('div', { style: { fontSize: 18, fontWeight: 700, color: t.text, fontFamily: "'Playfair Display', serif" } }, stat.value),
          React.createElement('div', { style: { fontSize: 10, color: t.textMuted, fontFamily: "'Inter', sans-serif" } }, stat.unit)
        )
      )
    ),

    // Recent Unlocks
    React.createElement('div', { style: { padding: '0 24px 24px' } },
      React.createElement('h2', { style: { fontSize: 18, fontWeight: 700, color: t.text, fontFamily: "'Playfair Display', serif", marginBottom: 12 } }, 'Recent Unlocks'),
      recentTokens.map(token =>
        React.createElement('div', { key: token.name, style: { display: 'flex', alignItems: 'center', gap: 12, background: t.surface, borderRadius: 14, padding: '12px 14px', marginBottom: 8, border: `1px solid ${t.border}` } },
          React.createElement('div', { style: { width: 44, height: 44, borderRadius: 12, background: token.color + '22', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, border: `2px solid ${token.color}33` } }, token.emoji),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', { style: { fontSize: 14, fontWeight: 600, color: t.text, fontFamily: "'Inter', sans-serif" } }, token.name),
            React.createElement('div', { style: { fontSize: 11, color: t.textMuted, fontFamily: "'Inter', sans-serif", marginTop: 1 } }, `via ${token.category}`)
          ),
          React.createElement('div', { style: { textAlign: 'right' } },
            React.createElement('div', { style: { fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', color: token.color, fontFamily: "'Inter', sans-serif" } }, token.rarity),
            React.createElement('div', { style: { fontSize: 12, color: t.textSub, fontFamily: "'Inter', sans-serif", fontWeight: 600 } }, `+${token.xp} XP`)
          )
        )
      )
    )
  );
}

// ─── COLLECTION SCREEN ────────────────────────────────────────────────────────

function CollectionScreen({ t }) {
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState(null);

  const tokens = [
    { id: 1, name: 'Amur Leopard', rarity: 'LEGENDARY', emoji: '🐆', color: '#D4522A', owned: true, count: 1, habitat: 'Temperate Forest', status: 'Critically Endangered', fact: 'Fewer than 100 remain in the wild.' },
    { id: 2, name: 'Blue Macaw', rarity: 'RARE', emoji: '🦜', color: '#4A7C59', owned: true, count: 2, habitat: 'Tropical Rainforest', status: 'Endangered', fact: 'Inspired the Pixar film Rio.' },
    { id: 3, name: 'Sea Turtle', rarity: 'COMMON', emoji: '🐢', color: '#6B8CAE', owned: true, count: 5, habitat: 'Coral Reefs', status: 'Vulnerable', fact: 'They navigate by the Earth\'s magnetic field.' },
    { id: 4, name: 'Snow Leopard', rarity: 'EPIC', emoji: '🐈', color: '#8B6CAE', owned: true, count: 1, habitat: 'Mountain Ranges', status: 'Vulnerable', fact: 'Can leap up to 50 feet in one bound.' },
    { id: 5, name: 'Giant Panda', rarity: 'RARE', emoji: '🐼', color: '#4A7C59', owned: false, count: 0, habitat: 'Bamboo Forests', status: 'Vulnerable', fact: 'They spend 12 hours a day eating.' },
    { id: 6, name: 'Narwhal', rarity: 'EPIC', emoji: '🦄', color: '#5A8CAE', owned: false, count: 0, habitat: 'Arctic Ocean', status: 'Near Threatened', fact: 'The "unicorn of the sea".' },
    { id: 7, name: 'Axolotl', rarity: 'LEGENDARY', emoji: '🦎', color: '#E8726A', owned: false, count: 0, habitat: 'Lakes', status: 'Critically Endangered', fact: 'Can regenerate entire limbs.' },
    { id: 8, name: 'Firefly Squid', rarity: 'RARE', emoji: '🦑', color: '#7A6CAE', owned: true, count: 3, habitat: 'Deep Ocean', status: 'Least Concern', fact: 'Bioluminescent displays attract mates.' },
  ];

  const filters = ['all', 'owned', 'rare', 'legendary'];
  const filtered = tokens.filter(t => {
    if (filter === 'all') return true;
    if (filter === 'owned') return t.owned;
    if (filter === 'rare') return t.rarity === 'RARE' || t.rarity === 'EPIC';
    if (filter === 'legendary') return t.rarity === 'LEGENDARY';
    return true;
  });

  const rarityColors = { COMMON: '#8A9A7A', RARE: '#4A7C59', EPIC: '#8B6CAE', LEGENDARY: '#D4522A' };

  return React.createElement('div', { style: { height: '100%', overflowY: 'auto', background: t.bg } },
    // Header
    React.createElement('div', { style: { padding: '12px 24px 0' } },
      React.createElement('h1', { style: { fontSize: 28, fontWeight: 900, color: t.text, fontFamily: "'Playfair Display', serif", lineHeight: 1.1 } }, 'My Eco\nCollection'),
      React.createElement('p', { style: { fontSize: 13, color: t.textMuted, fontFamily: "'Inter', sans-serif", marginTop: 4 } }, `${tokens.filter(t => t.owned).length} of ${tokens.length} species discovered`),

      // Progress bar
      React.createElement('div', { style: { height: 4, background: t.border, borderRadius: 2, marginTop: 10, overflow: 'hidden' } },
        React.createElement('div', { style: { height: '100%', width: `${(tokens.filter(t => t.owned).length / tokens.length) * 100}%`, background: t.primary, borderRadius: 2 } })
      )
    ),

    // Filter Pills
    React.createElement('div', { style: { display: 'flex', gap: 8, padding: '14px 24px', overflowX: 'auto' } },
      filters.map(f =>
        React.createElement('button', {
          key: f,
          onClick: () => setFilter(f),
          style: { flexShrink: 0, padding: '6px 16px', borderRadius: 20, border: `1.5px solid ${filter === f ? t.primary : t.border}`, background: filter === f ? t.primary : 'transparent', color: filter === f ? '#fff' : t.textSub, fontSize: 12, fontWeight: 600, fontFamily: "'Inter', sans-serif", cursor: 'pointer', textTransform: 'capitalize', letterSpacing: '0.05em' }
        }, f)
      )
    ),

    // Token Grid — angled overlapping card for selected
    selected ? React.createElement('div', { style: { padding: '0 24px 16px', position: 'relative' } },
      React.createElement('div', { style: { position: 'absolute', top: 6, left: 20, right: 20, bottom: -2, background: t.surfaceAlt, borderRadius: 20, transform: 'rotate(-1.5deg)' } }),
      React.createElement('div', { style: { position: 'relative', background: t.surface, borderRadius: 20, padding: '20px', border: `1px solid ${t.border}` } },
        React.createElement('button', { onClick: () => setSelected(null), style: { position: 'absolute', top: 12, right: 12, background: 'none', border: 'none', cursor: 'pointer', color: t.textMuted } },
          React.createElement(window.lucide.X, { size: 18, color: t.textMuted })
        ),
        React.createElement('div', { style: { display: 'flex', gap: 14, alignItems: 'flex-start' } },
          React.createElement('div', { style: { width: 64, height: 64, borderRadius: 16, background: selected.color + '22', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, border: `2px solid ${selected.color}44`, flexShrink: 0 } }, selected.emoji),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', { style: { fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', color: rarityColors[selected.rarity], fontFamily: "'Inter', sans-serif", marginBottom: 2 } }, selected.rarity),
            React.createElement('h3', { style: { fontSize: 18, fontWeight: 700, color: t.text, fontFamily: "'Playfair Display', serif" } }, selected.name),
            React.createElement('p', { style: { fontSize: 12, color: t.primary, fontFamily: "'Inter', sans-serif", fontStyle: 'italic', marginTop: 1 } }, selected.status),
          )
        ),
        React.createElement('div', { style: { background: t.primaryPale, borderRadius: 12, padding: '10px 12px', marginTop: 12 } },
          React.createElement('p', { style: { fontSize: 12, color: t.textSub, fontFamily: "'Inter', sans-serif", lineHeight: 1.6, fontStyle: 'italic' } }, `"${selected.fact}"`)
        ),
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginTop: 12 } },
          React.createElement('div', null,
            React.createElement('div', { style: { fontSize: 10, color: t.textMuted, fontFamily: "'Inter', sans-serif" } }, 'Habitat'),
            React.createElement('div', { style: { fontSize: 13, fontWeight: 600, color: t.text, fontFamily: "'Inter', sans-serif", marginTop: 1 } }, selected.habitat)
          ),
          selected.owned ? React.createElement('div', { style: { textAlign: 'right' } },
            React.createElement('div', { style: { fontSize: 10, color: t.textMuted, fontFamily: "'Inter', sans-serif" } }, 'Copies owned'),
            React.createElement('div', { style: { fontSize: 22, fontWeight: 900, color: t.primary, fontFamily: "'Playfair Display', serif" } }, `×${selected.count}`)
          ) : React.createElement('div', { style: { background: t.primary, borderRadius: 10, padding: '6px 14px', display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' } },
            React.createElement(window.lucide.Lock, { size: 12, color: '#fff' }),
            React.createElement('span', { style: { fontSize: 11, color: '#fff', fontFamily: "'Inter', sans-serif", fontWeight: 600 } }, 'Not yet found')
          )
        )
      )
    ) : null,

    // Grid
    React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, padding: '0 24px 24px' } },
      filtered.map(token =>
        React.createElement('div', {
          key: token.id,
          onClick: () => setSelected(token),
          style: { background: token.owned ? t.surface : t.surfaceAlt, borderRadius: 16, padding: '12px 8px', textAlign: 'center', border: `1.5px solid ${token.owned ? rarityColors[token.rarity] + '44' : t.border}`, cursor: 'pointer', opacity: token.owned ? 1 : 0.5, transition: 'transform 0.15s', position: 'relative' }
        },
          token.owned && React.createElement('div', { style: { position: 'absolute', top: 6, right: 6, width: 16, height: 16, background: rarityColors[token.rarity], borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
            React.createElement(window.lucide.Check, { size: 9, color: '#fff' })
          ),
          React.createElement('div', { style: { fontSize: 30, marginBottom: 6 } }, token.owned ? token.emoji : '?'),
          React.createElement('div', { style: { fontSize: 10, fontWeight: 600, color: t.text, fontFamily: "'Inter', sans-serif", lineHeight: 1.2 } }, token.owned ? token.name : '???'),
          React.createElement('div', { style: { fontSize: 9, color: rarityColors[token.rarity], fontWeight: 700, letterSpacing: '0.08em', fontFamily: "'Inter', sans-serif", marginTop: 2 } }, token.rarity)
        )
      )
    )
  );
}

// ─── QUESTS SCREEN ───────────────────────────────────────────────────────────

function QuestsScreen({ t }) {
  const [completed, setCompleted] = useState({ q1: false, q2: false });

  const weeklyQuests = [
    { id: 'weekly1', title: 'The Plogging Pioneer', desc: 'Run 5km while picking up litter along your route', xp: 400, reward: 'Rare Amur Leopard Token', icon: '🏃', progress: 2.1, total: 5, unit: 'km', active: true },
    { id: 'weekly2', title: 'Plant Power Week', desc: '7 consecutive days of plant-based post-workout meals', xp: 350, reward: 'Epic Snow Leopard Token', icon: '🥗', progress: 3, total: 7, unit: 'days', active: true },
    { id: 'weekly3', title: 'Sun Salutation Sprint', desc: '10 outdoor yoga sessions this week at sunrise', xp: 280, reward: 'Rare Blue Macaw Token', icon: '🧘', progress: 6, total: 10, unit: 'sessions', active: true },
  ];

  const dailyQuests = [
    { id: 'q1', title: 'Zero-Waste Workout', desc: 'Complete a 30-min session using only bodyweight or reused gear', xp: 120, icon: '♻️' },
    { id: 'q2', title: 'Eco Commute Challenge', desc: 'Bike or walk your daily commute instead of driving', xp: 90, icon: '🚲' },
    { id: 'q3', title: 'Hydration Hero', desc: 'Use a reusable bottle for all workouts today', xp: 40, icon: '💧' },
  ];

  return React.createElement('div', { style: { height: '100%', overflowY: 'auto', background: t.bg } },
    React.createElement('div', { style: { padding: '12px 24px 24px' } },
      React.createElement('h1', { style: { fontSize: 28, fontWeight: 900, color: t.text, fontFamily: "'Playfair Display', serif", lineHeight: 1.1, marginBottom: 4 } }, 'Quests &\nChallenges'),
      React.createElement('p', { style: { fontSize: 13, color: t.textMuted, fontFamily: "'Inter', sans-serif" } }, 'Week 13 · 3 days remaining'),

      // Surprise Quest Banner — angled
      React.createElement('div', { style: { position: 'relative', marginTop: 16, marginBottom: 6 } },
        React.createElement('div', { style: { position: 'absolute', inset: 0, background: t.accent, borderRadius: 18, transform: 'rotate(-1deg)', opacity: 0.6 } }),
        React.createElement('div', { style: { position: 'relative', background: t.accent, borderRadius: 18, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12 } },
          React.createElement('div', { style: { width: 44, height: 44, background: 'rgba(255,255,255,0.2)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 } }, '⚡'),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', { style: { fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.8)', fontFamily: "'Inter', sans-serif', textTransform: 'uppercase" } }, 'SURPRISE QUEST UNLOCKED'),
            React.createElement('h3', { style: { fontSize: 15, fontWeight: 700, color: '#fff', fontFamily: "'Playfair Display', serif", marginTop: 2 } }, 'The Midnight Mudrunner'),
          ),
          React.createElement(window.lucide.ChevronRight, { size: 18, color: 'rgba(255,255,255,0.8)' })
        )
      ),

      // Weekly Quests
      React.createElement('h2', { style: { fontSize: 16, fontWeight: 700, color: t.text, fontFamily: "'Playfair Display', serif", marginTop: 18, marginBottom: 12, letterSpacing: '-0.01em' } }, 'Weekly Challenges'),
      weeklyQuests.map(quest =>
        React.createElement('div', { key: quest.id, style: { background: t.surface, borderRadius: 16, padding: '14px', marginBottom: 10, border: `1px solid ${t.border}` } },
          React.createElement('div', { style: { display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 10 } },
            React.createElement('div', { style: { width: 40, height: 40, background: t.primaryPale, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 } }, quest.icon),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('h4', { style: { fontSize: 14, fontWeight: 700, color: t.text, fontFamily: "'Inter', sans-serif", marginBottom: 2 } }, quest.title),
              React.createElement('p', { style: { fontSize: 11, color: t.textMuted, fontFamily: "'Inter', sans-serif", lineHeight: 1.4 } }, quest.desc)
            ),
            React.createElement('div', { style: { textAlign: 'right', flexShrink: 0 } },
              React.createElement('div', { style: { fontSize: 14, fontWeight: 700, color: t.primary, fontFamily: "'Playfair Display', serif" } }, `+${quest.xp}`),
              React.createElement('div', { style: { fontSize: 9, color: t.textMuted, fontFamily: "'Inter', sans-serif" } }, 'XP')
            )
          ),
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: 6, alignItems: 'center' } },
            React.createElement('span', { style: { fontSize: 11, color: t.textSub, fontFamily: "'Inter', sans-serif" } }, `${quest.progress} / ${quest.total} ${quest.unit}`),
            React.createElement('span', { style: { fontSize: 11, color: t.accent, fontWeight: 600, fontFamily: "'Inter', sans-serif" } }, `${Math.round((quest.progress / quest.total) * 100)}%`)
          ),
          React.createElement('div', { style: { height: 6, background: t.border, borderRadius: 4, overflow: 'hidden' } },
            React.createElement('div', { style: { height: '100%', width: `${(quest.progress / quest.total) * 100}%`, background: `linear-gradient(90deg, ${t.accent}, ${t.accentLight})`, borderRadius: 4 } })
          ),
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 5, marginTop: 8 } },
            React.createElement(window.lucide.Gift, { size: 12, color: t.primary }),
            React.createElement('span', { style: { fontSize: 11, color: t.primary, fontFamily: "'Inter', sans-serif", fontStyle: 'italic' } }, quest.reward)
          )
        )
      ),

      // Daily Quests
      React.createElement('h2', { style: { fontSize: 16, fontWeight: 700, color: t.text, fontFamily: "'Playfair Display', serif", marginTop: 6, marginBottom: 12 } }, 'Daily Tasks'),
      dailyQuests.map(quest =>
        React.createElement('div', {
          key: quest.id,
          onClick: () => setCompleted(prev => ({ ...prev, [quest.id]: !prev[quest.id] })),
          style: { display: 'flex', alignItems: 'center', gap: 12, background: completed[quest.id] ? t.primaryPale : t.surface, borderRadius: 14, padding: '12px 14px', marginBottom: 8, border: `1px solid ${completed[quest.id] ? t.primary + '44' : t.border}`, cursor: 'pointer', transition: 'all 0.2s' }
        },
          React.createElement('div', { style: { width: 36, height: 36, background: completed[quest.id] ? t.primary : t.surfaceAlt, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0, transition: 'all 0.2s' } },
            completed[quest.id] ? React.createElement(window.lucide.Check, { size: 16, color: '#fff' }) : quest.icon
          ),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('h4', { style: { fontSize: 13, fontWeight: 600, color: completed[quest.id] ? t.textMuted : t.text, fontFamily: "'Inter', sans-serif", textDecoration: completed[quest.id] ? 'line-through' : 'none' } }, quest.title),
            React.createElement('p', { style: { fontSize: 11, color: t.textMuted, fontFamily: "'Inter', sans-serif" } }, quest.desc)
          ),
          React.createElement('span', { style: { fontSize: 13, fontWeight: 700, color: completed[quest.id] ? t.textMuted : t.primary, fontFamily: "'Inter', sans-serif" } }, `+${quest.xp}`)
        )
      )
    )
  );
}

// ─── IMPACT SCREEN ────────────────────────────────────────────────────────────

function ImpactScreen({ t }) {
  const [activeRegion, setActiveRegion] = useState(null);

  const regions = [
    { id: 'amazon', name: 'Amazon Rainforest', country: 'Brazil', trees: 142, users: '2.4k', species: 8, x: 28, y: 58 },
    { id: 'borneo', name: 'Borneo Jungle', country: 'Malaysia', trees: 89, users: '1.1k', species: 5, x: 72, y: 52 },
    { id: 'congo', name: 'Congo Basin', country: 'DRC', trees: 67, users: '890', species: 6, x: 52, y: 55 },
    { id: 'mekong', name: 'Mekong Delta', country: 'Vietnam', trees: 45, users: '620', species: 4, x: 75, y: 45 },
    { id: 'rocky', name: 'Rocky Mountains', country: 'USA', trees: 38, users: '3.2k', species: 3, x: 18, y: 35 },
  ];

  const globalStats = [
    { label: 'Trees Planted', value: '48,291', icon: window.lucide.TreePine, color: t.accent },
    { label: 'CO₂ Offset', value: '12.4t', icon: window.lucide.Wind, color: '#5A8CAE' },
    { label: 'Habitats', value: '23', icon: window.lucide.MapPin, color: t.primary },
    { label: 'Partners', value: '7', icon: window.lucide.Globe, color: '#8B6CAE' },
  ];

  return React.createElement('div', { style: { height: '100%', overflowY: 'auto', background: t.bg } },
    React.createElement('div', { style: { padding: '12px 24px 24px' } },
      React.createElement('h1', { style: { fontSize: 28, fontWeight: 900, color: t.text, fontFamily: "'Playfair Display', serif", lineHeight: 1.1 } }, 'Global\nImpact Map'),
      React.createElement('p', { style: { fontSize: 13, color: t.textMuted, fontFamily: "'Inter', sans-serif", marginTop: 4 } }, 'Your collective footprint with 48K athletes'),

      // Fake Map
      React.createElement('div', { style: { marginTop: 16, background: t.surface, borderRadius: 20, overflow: 'hidden', border: `1px solid ${t.border}`, position: 'relative', height: 200 } },
        // Map grid lines
        React.createElement('div', { style: { position: 'absolute', inset: 0, background: `repeating-linear-gradient(0deg, ${t.border}33 0px, ${t.border}33 1px, transparent 1px, transparent 24px), repeating-linear-gradient(90deg, ${t.border}33 0px, ${t.border}33 1px, transparent 1px, transparent 24px)` } }),
        // Continent shapes (simplified)
        React.createElement('div', { style: { position: 'absolute', left: '10%', top: '25%', width: '25%', height: '50%', background: t.accent + '30', borderRadius: '40% 20% 30% 50%', border: `1px solid ${t.accent}44` } }),
        React.createElement('div', { style: { position: 'absolute', left: '42%', top: '20%', width: '18%', height: '55%', background: t.accent + '25', borderRadius: '20% 30% 40% 20%', border: `1px solid ${t.accent}33` } }),
        React.createElement('div', { style: { position: 'absolute', left: '62%', top: '22%', width: '22%', height: '45%', background: t.accent + '28', borderRadius: '30% 20% 35% 25%', border: `1px solid ${t.accent}33` } }),
        // Region pins
        ...regions.map(r =>
          React.createElement('div', {
            key: r.id,
            onClick: () => setActiveRegion(activeRegion?.id === r.id ? null : r),
            style: { position: 'absolute', left: `${r.x}%`, top: `${r.y}%`, cursor: 'pointer', transform: 'translate(-50%, -50%)', zIndex: 2 }
          },
            React.createElement('div', { style: { width: activeRegion?.id === r.id ? 16 : 10, height: activeRegion?.id === r.id ? 16 : 10, background: t.primary, borderRadius: '50%', border: `2px solid ${t.surface}`, boxShadow: `0 0 0 3px ${t.primary}44`, transition: 'all 0.2s' } }),
            React.createElement('div', { style: { position: 'absolute', bottom: '100%', left: '50%', transform: 'translateX(-50%)', background: t.primary, color: '#fff', fontSize: 9, fontFamily: "'Inter', sans-serif", fontWeight: 700, padding: '2px 6px', borderRadius: 6, whiteSpace: 'nowrap', marginBottom: 4, display: activeRegion?.id === r.id ? 'block' : 'none' } }, r.name)
          )
        ),
        // Scale bar
        React.createElement('div', { style: { position: 'absolute', bottom: 10, right: 12, display: 'flex', alignItems: 'center', gap: 4 } },
          React.createElement('div', { style: { width: 30, height: 2, background: t.textMuted } }),
          React.createElement('span', { style: { fontSize: 9, color: t.textMuted, fontFamily: "'Inter', sans-serif" } }, '5000km')
        )
      ),

      // Active Region Detail
      activeRegion && React.createElement('div', { style: { background: t.surface, borderRadius: 14, padding: '14px', marginTop: 10, border: `1px solid ${t.border}` } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' } },
          React.createElement('div', null,
            React.createElement('h4', { style: { fontSize: 15, fontWeight: 700, color: t.text, fontFamily: "'Playfair Display', serif" } }, activeRegion.name),
            React.createElement('p', { style: { fontSize: 12, color: t.textMuted, fontFamily: "'Inter', sans-serif" } }, activeRegion.country)
          ),
          React.createElement('div', { style: { textAlign: 'right' } },
            React.createElement('div', { style: { fontSize: 20, fontWeight: 900, color: t.primary, fontFamily: "'Playfair Display', serif" } }, activeRegion.trees),
            React.createElement('div', { style: { fontSize: 10, color: t.textMuted, fontFamily: "'Inter', sans-serif" } }, 'trees planted')
          )
        ),
        React.createElement('div', { style: { display: 'flex', gap: 10, marginTop: 10 } },
          React.createElement('div', { style: { flex: 1, background: t.primaryPale, borderRadius: 10, padding: '8px', textAlign: 'center' } },
            React.createElement('div', { style: { fontSize: 14, fontWeight: 700, color: t.text, fontFamily: "'Inter', sans-serif" } }, activeRegion.users),
            React.createElement('div', { style: { fontSize: 10, color: t.textMuted, fontFamily: "'Inter', sans-serif" } }, 'contributors')
          ),
          React.createElement('div', { style: { flex: 1, background: t.primaryPale, borderRadius: 10, padding: '8px', textAlign: 'center' } },
            React.createElement('div', { style: { fontSize: 14, fontWeight: 700, color: t.text, fontFamily: "'Inter', sans-serif" } }, activeRegion.species),
            React.createElement('div', { style: { fontSize: 10, color: t.textMuted, fontFamily: "'Inter', sans-serif" } }, 'species helped')
          )
        )
      ),

      // Global Stats
      React.createElement('h2', { style: { fontSize: 18, fontWeight: 700, color: t.text, fontFamily: "'Playfair Display', serif", marginTop: 20, marginBottom: 12 } }, 'Global Stats'),
      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 } },
        globalStats.map(stat =>
          React.createElement('div', { key: stat.label, style: { background: t.surface, borderRadius: 16, padding: '16px 14px', border: `1px solid ${t.border}` } },
            React.createElement(stat.icon, { size: 20, color: stat.color }),
            React.createElement('div', { style: { fontSize: 22, fontWeight: 900, color: t.text, fontFamily: "'Playfair Display', serif", marginTop: 6 } }, stat.value),
            React.createElement('div', { style: { fontSize: 11, color: t.textMuted, fontFamily: "'Inter', sans-serif", marginTop: 2 } }, stat.label)
          )
        )
      ),

      // Partners
      React.createElement('div', { style: { background: t.surface, borderRadius: 16, padding: '14px', marginTop: 14, border: `1px solid ${t.border}` } },
        React.createElement('h4', { style: { fontSize: 14, fontWeight: 700, color: t.text, fontFamily: "'Playfair Display', serif", marginBottom: 10 } }, 'Conservation Partners'),
        ['WWF', 'One Tree Planted', 'Rainforest Alliance', 'Sea Shepherd', 'Re:wild', 'Cool Earth', 'Ecosia'].map((p, i) =>
          React.createElement('div', { key: p, style: { display: 'inline-block', background: t.surfaceAlt, borderRadius: 20, padding: '4px 10px', margin: '3px 3px 3px 0', fontSize: 11, color: t.textSub, fontFamily: "'Inter', sans-serif", fontWeight: 500, border: `1px solid ${t.border}` } }, p)
        )
      )
    )
  );
}

// ─── PROFILE SCREEN ───────────────────────────────────────────────────────────

function ProfileScreen({ t, isDark, setIsDark }) {
  const [coachExpanded, setCoachExpanded] = useState(true);

  const achievements = [
    { icon: '🏆', label: 'First Ploggger', unlocked: true },
    { icon: '🌿', label: 'Eco Warrior', unlocked: true },
    { icon: '🔥', label: '30-Day Streak', unlocked: true },
    { icon: '🌍', label: 'Globe Trotter', unlocked: false },
    { icon: '🦁', label: 'Apex Collector', unlocked: false },
    { icon: '⚡', label: 'Quest Master', unlocked: false },
  ];

  return React.createElement('div', { style: { height: '100%', overflowY: 'auto', background: t.bg } },
    // Profile Header — angled card
    React.createElement('div', { style: { padding: '12px 24px 0', position: 'relative' } },
      React.createElement('div', { style: { position: 'relative', marginBottom: 8 } },
        React.createElement('div', { style: { position: 'absolute', inset: 0, background: t.primaryLight, borderRadius: 22, transform: 'rotate(1.5deg)', opacity: 0.3 } }),
        React.createElement('div', { style: { position: 'relative', background: `linear-gradient(135deg, ${t.primary}, #A83820)`, borderRadius: 22, padding: '20px 20px 16px' } },
          React.createElement('div', { style: { display: 'flex', gap: 14, alignItems: 'center' } },
            React.createElement('div', { style: { width: 60, height: 60, borderRadius: 18, background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 30, border: '2px solid rgba(255,255,255,0.4)' } }, '🧑'),
            React.createElement('div', null,
              React.createElement('h2', { style: { fontSize: 20, fontWeight: 900, color: '#fff', fontFamily: "'Playfair Display', serif" } }, 'Alex Rivera'),
              React.createElement('p', { style: { fontSize: 12, color: 'rgba(255,255,255,0.75)', fontFamily: "'Inter', sans-serif" } }, '@eco_athlete · Level 12'),
              React.createElement('div', { style: { display: 'flex', gap: 12, marginTop: 6 } },
                React.createElement('div', null,
                  React.createElement('span', { style: { fontSize: 15, fontWeight: 700, color: '#fff', fontFamily: "'Playfair Display', serif" } }, '32 '),
                  React.createElement('span', { style: { fontSize: 11, color: 'rgba(255,255,255,0.7)', fontFamily: "'Inter', sans-serif" } }, 'tokens')
                ),
                React.createElement('div', null,
                  React.createElement('span', { style: { fontSize: 15, fontWeight: 700, color: '#fff', fontFamily: "'Playfair Display', serif" } }, '218 '),
                  React.createElement('span', { style: { fontSize: 11, color: 'rgba(255,255,255,0.7)', fontFamily: "'Inter', sans-serif" } }, 'followers')
                ),
                React.createElement('div', null,
                  React.createElement('span', { style: { fontSize: 15, fontWeight: 700, color: '#fff', fontFamily: "'Playfair Display', serif" } }, '3 '),
                  React.createElement('span', { style: { fontSize: 11, color: 'rgba(255,255,255,0.7)', fontFamily: "'Inter', sans-serif" } }, 'trees')
                )
              )
            )
          )
        )
      ),

      // Coach Message
      React.createElement('div', {
        onClick: () => setCoachExpanded(!coachExpanded),
        style: { background: t.surface, borderRadius: 16, padding: '12px 14px', border: `1px solid ${t.border}`, cursor: 'pointer', marginBottom: 16 }
      },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: coachExpanded ? 8 : 0 } },
          React.createElement('div', { style: { width: 32, height: 32, borderRadius: 10, background: t.accent + '33', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 } }, '🌱'),
          React.createElement('span', { style: { fontSize: 13, fontWeight: 700, color: t.text, fontFamily: "'Inter', sans-serif", flex: 1 } }, 'Coach Terra'),
          React.createElement(coachExpanded ? window.lucide.ChevronUp : window.lucide.ChevronDown, { size: 16, color: t.textMuted })
        ),
        coachExpanded && React.createElement('p', { style: { fontSize: 12, color: t.textSub, fontFamily: "'Inter', sans-serif", lineHeight: 1.6, fontStyle: 'italic', paddingLeft: 42 } },
          '"You\'re 660 XP away from Level 13! Did you know that 14-day streaks boost habit formation by 47%? Also, did you know narwhals use their horn to detect ocean temperatures? You\'re doing amazing — keep spinning that ecosystem! 🌍"'
        )
      ),

      // Achievements
      React.createElement('h2', { style: { fontSize: 18, fontWeight: 700, color: t.text, fontFamily: "'Playfair Display', serif", marginBottom: 12 } }, 'Achievements'),
      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 20 } },
        achievements.map(a =>
          React.createElement('div', { key: a.label, style: { background: a.unlocked ? t.surface : t.surfaceAlt, borderRadius: 14, padding: '12px 8px', textAlign: 'center', border: `1px solid ${a.unlocked ? t.border : t.border}`, opacity: a.unlocked ? 1 : 0.45 } },
            React.createElement('div', { style: { fontSize: 24, marginBottom: 4 } }, a.icon),
            React.createElement('div', { style: { fontSize: 9, fontWeight: 600, color: a.unlocked ? t.text : t.textMuted, fontFamily: "'Inter', sans-serif", lineHeight: 1.2 } }, a.label)
          )
        )
      ),

      // Settings
      React.createElement('h2', { style: { fontSize: 18, fontWeight: 700, color: t.text, fontFamily: "'Playfair Display', serif", marginBottom: 12 } }, 'Settings'),
      [
        { label: 'Dark Mode', action: () => setIsDark(!isDark), toggle: true, value: isDark },
        { label: 'Eco Notifications', action: () => {}, toggle: true, value: true },
        { label: 'Weekly Digest Email', action: () => {}, toggle: true, value: false },
        { label: 'Share Impact Publicly', action: () => {}, toggle: true, value: true },
      ].map(setting =>
        React.createElement('div', { key: setting.label, onClick: setting.action, style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '13px 0', borderBottom: `1px solid ${t.border}`, cursor: 'pointer' } },
          React.createElement('span', { style: { fontSize: 14, color: t.text, fontFamily: "'Inter', sans-serif" } }, setting.label),
          setting.toggle ? React.createElement('div', { style: { width: 42, height: 24, background: setting.value ? t.primary : t.border, borderRadius: 12, position: 'relative', transition: 'background 0.2s' } },
            React.createElement('div', { style: { position: 'absolute', top: 3, left: setting.value ? 21 : 3, width: 18, height: 18, background: '#fff', borderRadius: '50%', transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' } })
          ) : React.createElement(window.lucide.ChevronRight, { size: 16, color: t.textMuted })
        )
      ),

      React.createElement('div', { style: { height: 20 } })
    )
  );
}
