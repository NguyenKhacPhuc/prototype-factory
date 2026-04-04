const { useState, useEffect, useRef } = React;

const SPRITES = [
  { id: 1, name: 'Fernwhisker', type: 'Flora-Feline', emoji: '🌿🐱', level: 4, xp: 340, maxXp: 500, mood: 'Thriving', nutrient: 78, color: '#52B788', rarity: 'Uncommon', trait: 'Night Bloomer' },
  { id: 2, name: 'Bloomdancer', type: 'Flora-Lepid', emoji: '🌸🦋', level: 2, xp: 120, maxXp: 200, mood: 'Content', nutrient: 55, color: '#FF85A1', rarity: 'Rare', trait: 'Pollen Walker' },
  { id: 3, name: 'Mossrock', type: 'Flora-Lapine', emoji: '🍀🦔', level: 1, xp: 45, maxXp: 100, mood: 'Sleepy', nutrient: 30, color: '#74B472', rarity: 'Common', trait: 'Stone Singer' },
  { id: 4, name: 'Sundrift', type: 'Flora-Avian', emoji: '🌻🐦', level: 3, xp: 280, maxXp: 350, mood: 'Joyful', nutrient: 88, color: '#FFD166', rarity: 'Rare', trait: 'Solar Dancer' },
];

const QUESTS = [
  { id: 1, title: 'Morning Wanderer', desc: 'Reach 8,000 steps today', progress: 6248, max: 8000, reward: 50, type: 'daily', icon: '👟', done: false },
  { id: 2, title: 'Zero-Waste Lunch', desc: 'Use a reusable container for your meal', progress: 0, max: 1, reward: 80, type: 'daily', icon: '🥡', done: false },
  { id: 3, title: 'Mindful Pause', desc: '10 min of mindfulness or breathwork', progress: 1, max: 1, reward: 60, type: 'daily', icon: '🧘', done: true },
  { id: 4, title: 'Green Commuter', desc: 'Use public transport or bike 5x this week', progress: 3, max: 5, reward: 200, type: 'weekly', icon: '🚲', done: false },
  { id: 5, title: 'Eco Shopper', desc: 'Make 3 sustainable product swaps this week', progress: 1, max: 3, reward: 150, type: 'weekly', icon: '♻️', done: false },
];

const MESSAGES = [
  { id: 1, sprite: 'Fernwhisker', emoji: '🌿🐱', text: "Those 6,000 steps today? I felt every single one — two new tendrils sprouted! 🌱 You're SO close to my moonpetal form.", time: '3m ago', isSprite: true },
  { id: 2, text: "What exactly do I need to unlock moonpetal form? Tell me everything 👀", time: '2m ago', isSprite: false },
  { id: 3, sprite: 'Fernwhisker', emoji: '🌿🐱', text: "Complete your Morning Walker quest AND one eco-action before sunset. I can sense something extraordinary... brewing in my petals. ✨🌙", time: '1m ago', isSprite: true },
  { id: 4, sprite: 'Sundrift', emoji: '🌻🐦', text: "Chirping in — don't forget your water bottle! Hydration = sunshine for ALL of us in the TerraScape. 🌞", time: 'just now', isSprite: true },
];

const themes = {
  light: {
    bg: '#FAFAFA', surface: '#FFFFFF', primary: '#FF6B6B', navy: '#1A1A40',
    text: '#1A1A40', textMuted: '#666677', border: '#1A1A40',
    green: '#52B788', yellow: '#FFD166', pink: '#FF85A1',
    shadow: '4px 4px 0px #1A1A40', shadowSm: '2px 2px 0px #1A1A40',
    terrainBg: '#D8EFD3', terrainGround: '#52B788', inputBg: '#F0F0F0',
    navBg: '#1A1A40', questDone: '#E8F5EE',
  },
  dark: {
    bg: '#0D0D28', surface: '#1A1A40', primary: '#FF6B6B', navy: '#FAFAFA',
    text: '#FAFAFA', textMuted: '#8888AA', border: '#FAFAFA',
    green: '#74C69D', yellow: '#FFE066', pink: '#FF9AB8',
    shadow: '4px 4px 0px #FF6B6B', shadowSm: '2px 2px 0px #FF6B6B',
    terrainBg: '#0A1628', terrainGround: '#1B3A2A', inputBg: '#252555',
    navBg: '#0D0D28', questDone: '#1A2E22',
  }
};

function BottomNav({ t, active, navigate }) {
  const tabs = [
    { id: 'home', emoji: '🏡', label: 'TerraScape' },
    { id: 'nursery', emoji: '🌿', label: 'Nursery' },
    { id: 'quests', emoji: '🎯', label: 'Quests' },
    { id: 'coach', emoji: '💬', label: 'Coach' },
  ];
  return React.createElement('div', {
    style: { backgroundColor: t.navBg, borderTop: `3px solid ${t.border}`, display: 'flex', flexShrink: 0 }
  },
    tabs.map(tab =>
      React.createElement('button', {
        key: tab.id,
        onClick: () => navigate(tab.id),
        style: { flex: 1, background: 'none', border: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', cursor: 'pointer', padding: '8px 4px 12px', opacity: active === tab.id ? 1 : 0.45 }
      },
        React.createElement('div', {
          style: { fontSize: '19px', backgroundColor: active === tab.id ? t.primary : 'transparent', border: active === tab.id ? `2px solid ${t.border}` : '2px solid transparent', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: active === tab.id ? t.shadowSm : 'none' }
        }, tab.emoji),
        React.createElement('span', {
          style: { fontSize: '8px', fontWeight: '700', color: active === tab.id ? t.primary : t.bg, letterSpacing: '0.5px', textTransform: 'uppercase', fontFamily: "'Playfair Display', serif" }
        }, tab.label)
      )
    )
  );
}

function HomeScreen({ t, isDark, toggleTheme, navigate }) {
  const [seedOpen, setSeedOpen] = useState(false);
  const [claimed, setClaimed] = useState(false);

  const bc = (rotate, extra = {}) => ({
    backgroundColor: t.surface, border: `2px solid ${t.border}`, boxShadow: t.shadow,
    padding: '12px 14px', transform: `rotate(${rotate}deg)`, ...extra,
  });

  return React.createElement('div', { style: { height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: t.bg, fontFamily: "'Playfair Display', serif", overflow: 'hidden' } },
    // Header
    React.createElement('div', { style: { backgroundColor: t.primary, padding: '14px 18px 12px', borderBottom: `3px solid ${t.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexShrink: 0 } },
      React.createElement('div', null,
        React.createElement('p', { style: { margin: 0, fontSize: '9px', fontWeight: '700', letterSpacing: '3px', color: t.navy, textTransform: 'uppercase' } }, 'Your Living World'),
        React.createElement('h1', { style: { margin: 0, fontSize: '22px', fontWeight: '900', color: t.navy, lineHeight: 1 } }, 'TerraScape'),
      ),
      React.createElement('div', { style: { display: 'flex', gap: '8px', alignItems: 'center' } },
        React.createElement('div', { style: { backgroundColor: t.navy, border: `2px solid ${t.border}`, padding: '5px 11px', display: 'flex', alignItems: 'center', gap: '5px', boxShadow: t.shadowSm } },
          React.createElement('span', { style: { fontSize: '13px' } }, '💎'),
          React.createElement('span', { style: { fontSize: '14px', fontWeight: '900', color: t.primary, fontFamily: "'Playfair Display', serif" } }, '840'),
        ),
        React.createElement('button', { onClick: toggleTheme, style: { backgroundColor: t.navy, border: `2px solid ${t.border}`, boxShadow: t.shadowSm, width: '34px', height: '34px', cursor: 'pointer', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' } }, isDark ? '☀️' : '🌙')
      )
    ),

    // TerraScape Viewport
    React.createElement('div', { style: { backgroundColor: t.terrainBg, borderBottom: `3px solid ${t.border}`, position: 'relative', height: '155px', overflow: 'hidden', flexShrink: 0 } },
      React.createElement('div', { style: { position: 'absolute', top: '10px', right: '24px', fontSize: '24px' } }, '☀️'),
      React.createElement('div', { style: { position: 'absolute', top: '18px', left: '40px', fontSize: '16px', opacity: 0.55 } }, '☁️'),
      React.createElement('div', { style: { position: 'absolute', top: '24px', left: '130px', fontSize: '11px', opacity: 0.4 } }, '☁️'),
      React.createElement('div', { style: { position: 'absolute', bottom: '28px', left: 0, right: 0, display: 'flex', justifyContent: 'space-evenly', alignItems: 'flex-end', cursor: 'pointer' } },
        SPRITES.map((s, i) =>
          React.createElement('div', { key: s.id, onClick: () => navigate('nursery'), style: { textAlign: 'center' } },
            React.createElement('div', { style: { fontSize: i % 2 === 0 ? '32px' : '26px', filter: 'drop-shadow(1px 2px 0 rgba(0,0,0,0.25))' } }, s.emoji),
            React.createElement('div', { style: { fontSize: '8px', fontWeight: '700', color: s.color } }, s.name.slice(0,6)),
          )
        )
      ),
      React.createElement('div', { style: { position: 'absolute', bottom: 0, left: 0, right: 0, height: '28px', backgroundColor: t.terrainGround, borderTop: `2px solid ${t.border}`, display: 'flex', alignItems: 'center', paddingLeft: '12px', gap: '6px' } },
        React.createElement('span', { style: { fontSize: '9px', fontWeight: '700', letterSpacing: '2px', color: '#fff', textTransform: 'uppercase' } }, '🌱 TerraScape — Level 4')
      )
    ),

    // Scrollable Content
    React.createElement('div', { style: { flex: 1, overflowY: 'auto', padding: '14px 16px' } },
      React.createElement('p', { style: { margin: '0 0 10px', fontSize: '10px', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase', color: t.textMuted } }, "Today's Nutrients"),

      // OVERLAPPING STAT CARDS
      React.createElement('div', { style: { position: 'relative', height: '130px', marginBottom: '18px' } },
        React.createElement('div', { style: { position: 'absolute', left: 0, top: 0, width: '155px', ...bc(-2), zIndex: 1 } },
          React.createElement('p', { style: { margin: '0 0 2px', fontSize: '9px', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase', color: t.textMuted } }, '👟 Steps'),
          React.createElement('div', { style: { fontSize: '30px', fontWeight: '900', color: t.primary, lineHeight: 1 } }, '6,248'),
          React.createElement('div', { style: { height: '5px', backgroundColor: isDark ? '#2A2A4A' : '#EEE', border: `1px solid ${t.border}`, marginTop: '8px' } },
            React.createElement('div', { style: { height: '100%', width: '62%', backgroundColor: t.green } })
          ),
          React.createElement('p', { style: { margin: '3px 0 0', fontSize: '9px', color: t.textMuted } }, '6,248 / 10,000')
        ),
        React.createElement('div', { style: { position: 'absolute', right: 0, top: '8px', width: '128px', ...bc(2.5), backgroundColor: t.navy, zIndex: 2 } },
          React.createElement('p', { style: { margin: '0 0 2px', fontSize: '9px', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase', color: isDark ? t.textMuted : '#9999BB' } }, '⚡ Active'),
          React.createElement('div', { style: { fontSize: '30px', fontWeight: '900', color: t.primary, lineHeight: 1 } }, '42'),
          React.createElement('p', { style: { margin: '6px 0 0', fontSize: '9px', color: isDark ? t.textMuted : '#9999BB' } }, 'Goal: 60 min')
        ),
        React.createElement('div', { style: { position: 'absolute', left: '50%', bottom: '4px', width: '120px', transform: 'translateX(-50%) rotate(-1.5deg)', backgroundColor: t.green, border: `2px solid ${t.border}`, boxShadow: t.shadow, padding: '10px 12px', zIndex: 3 } },
          React.createElement('p', { style: { margin: '0 0 2px', fontSize: '9px', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase', color: '#1A1A40' } }, '♻️ Eco Acts'),
          React.createElement('div', { style: { fontSize: '30px', fontWeight: '900', color: '#1A1A40', lineHeight: 1 } }, '3'),
          React.createElement('p', { style: { margin: '4px 0 0', fontSize: '9px', color: '#1A1A40' } }, 'quests complete')
        )
      ),

      // Seed Pod
      React.createElement('div', { onClick: () => !claimed && setSeedOpen(!seedOpen), style: { backgroundColor: t.yellow, border: `3px solid ${t.border}`, boxShadow: t.shadow, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: '12px', cursor: claimed ? 'default' : 'pointer', marginBottom: '10px', transform: 'rotate(-0.5deg)' } },
        React.createElement('span', { style: { fontSize: '28px' } }, claimed ? '✨' : '🌱'),
        React.createElement('div', { style: { flex: 1 } },
          React.createElement('p', { style: { margin: 0, fontSize: '13px', fontWeight: '900', color: '#1A1A40' } }, claimed ? 'Petalwing Joined Your Nursery!' : 'Surprise Seed Pod Discovered!'),
          React.createElement('p', { style: { margin: 0, fontSize: '11px', color: '#444' } }, claimed ? 'Ultra-rare Flora-Peacock hybrid added' : 'A mysterious seed is calling to you...'),
        ),
        !claimed && React.createElement('span', { style: { fontSize: '18px', fontWeight: '900', color: '#1A1A40' } }, seedOpen ? '▼' : '→')
      ),

      seedOpen && !claimed && React.createElement('div', { style: { backgroundColor: t.surface, border: `3px solid ${t.primary}`, boxShadow: `6px 6px 0px ${t.primary}`, padding: '18px', textAlign: 'center', marginBottom: '12px', transform: 'rotate(0.5deg)' } },
        React.createElement('div', { style: { fontSize: '52px', marginBottom: '6px' } }, '🌺🦚'),
        React.createElement('div', { style: { fontSize: '17px', fontWeight: '900', color: t.text } }, 'Petalwing Discovered!'),
        React.createElement('div', { style: { display: 'inline-block', backgroundColor: t.pink, border: `2px solid ${t.border}`, padding: '2px 10px', fontSize: '10px', fontWeight: '700', color: '#1A1A40', margin: '6px 0 10px', letterSpacing: '1px' } }, 'ULTRA-RARE'),
        React.createElement('p', { style: { margin: '0 0 12px', fontSize: '12px', color: t.textMuted } }, 'Flora-Peacock Hybrid • Trait: Aurora Wing'),
        React.createElement('button', { onClick: () => { setClaimed(true); setSeedOpen(false); }, style: { backgroundColor: t.primary, border: `2px solid ${t.border}`, boxShadow: t.shadowSm, padding: '10px 28px', fontSize: '13px', fontWeight: '700', cursor: 'pointer', color: '#1A1A40', fontFamily: "'Playfair Display', serif" } }, '✨ Add to Nursery')
      ),

      // Quick stats
      React.createElement('div', { style: { display: 'flex', gap: '8px' } },
        [{ label: 'Sprites', val: claimed ? '5' : '4', icon: '🐾' }, { label: 'Level', val: '7', icon: '⭐' }, { label: 'Streak', val: '12d', icon: '🔥' }].map(item =>
          React.createElement('div', { key: item.label, style: { flex: 1, backgroundColor: t.surface, border: `2px solid ${t.border}`, boxShadow: t.shadowSm, padding: '10px 8px', textAlign: 'center' } },
            React.createElement('div', { style: { fontSize: '18px' } }, item.icon),
            React.createElement('div', { style: { fontSize: '16px', fontWeight: '900', color: t.text } }, item.val),
            React.createElement('div', { style: { fontSize: '9px', color: t.textMuted, textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '700' } }, item.label),
          )
        )
      )
    ),

    React.createElement(BottomNav, { t, active: 'home', navigate })
  );
}

function NurseryScreen({ t, isDark, toggleTheme, navigate }) {
  const [selected, setSelected] = useState(SPRITES[0]);
  const [fed, setFed] = useState(false);

  const moodColor = { Thriving: t.green, Content: t.yellow, Sleepy: t.textMuted, Joyful: t.pink };
  const rarityColor = { 'Common': '#888', 'Uncommon': t.green, 'Rare': t.primary, 'Ultra-Rare': t.pink };

  return React.createElement('div', { style: { height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: t.bg, fontFamily: "'Playfair Display', serif", overflow: 'hidden' } },
    // Header
    React.createElement('div', { style: { backgroundColor: t.navy, padding: '14px 18px 12px', borderBottom: `3px solid ${t.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 } },
      React.createElement('div', null,
        React.createElement('p', { style: { margin: 0, fontSize: '9px', fontWeight: '700', letterSpacing: '3px', color: t.textMuted, textTransform: 'uppercase' } }, 'Your Collection'),
        React.createElement('h1', { style: { margin: 0, fontSize: '22px', fontWeight: '900', color: t.primary, lineHeight: 1 } }, 'Sprite Nursery'),
      ),
      React.createElement('div', { style: { display: 'flex', gap: '6px', alignItems: 'center' } },
        React.createElement('div', { style: { backgroundColor: t.primary, border: `2px solid ${t.border}`, padding: '4px 10px', fontSize: '11px', fontWeight: '900', color: '#1A1A40' } }, `${SPRITES.length} Sprites`),
        React.createElement('button', { onClick: toggleTheme, style: { backgroundColor: t.surface, border: `2px solid ${t.border}`, width: '32px', height: '32px', cursor: 'pointer', fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' } }, isDark ? '☀️' : '🌙')
      )
    ),

    React.createElement('div', { style: { flex: 1, overflowY: 'auto', padding: '14px 16px' } },
      // Featured Sprite - big card
      React.createElement('div', { style: { backgroundColor: t.surface, border: `3px solid ${t.border}`, boxShadow: t.shadow, marginBottom: '20px', transform: 'rotate(-0.5deg)' } },
        React.createElement('div', { style: { backgroundColor: selected.color, padding: '20px', textAlign: 'center', borderBottom: `3px solid ${t.border}`, position: 'relative' } },
          React.createElement('div', { style: { position: 'absolute', top: '10px', left: '12px', backgroundColor: '#1A1A40', border: `2px solid ${t.border}`, padding: '2px 8px', fontSize: '9px', fontWeight: '700', color: rarityColor[selected.rarity] || t.primary, letterSpacing: '1px' } }, selected.rarity.toUpperCase()),
          React.createElement('div', { style: { fontSize: '64px', marginBottom: '6px', filter: 'drop-shadow(2px 4px 0 rgba(0,0,0,0.2))' } }, selected.emoji),
          React.createElement('div', { style: { fontSize: '20px', fontWeight: '900', color: '#1A1A40' } }, selected.name),
          React.createElement('div', { style: { fontSize: '11px', fontWeight: '700', color: '#1A1A40', opacity: 0.7, letterSpacing: '1px' } }, selected.type),
        ),
        React.createElement('div', { style: { padding: '14px' } },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: '10px' } },
            React.createElement('div', { style: { textAlign: 'center' } },
              React.createElement('div', { style: { fontSize: '18px', fontWeight: '900', color: t.primary } }, `Lv.${selected.level}`),
              React.createElement('div', { style: { fontSize: '9px', color: t.textMuted, textTransform: 'uppercase', letterSpacing: '1px' } }, 'Level'),
            ),
            React.createElement('div', { style: { textAlign: 'center' } },
              React.createElement('div', { style: { fontSize: '18px', fontWeight: '900', color: moodColor[selected.mood] || t.text } }, selected.mood),
              React.createElement('div', { style: { fontSize: '9px', color: t.textMuted, textTransform: 'uppercase', letterSpacing: '1px' } }, 'Mood'),
            ),
            React.createElement('div', { style: { textAlign: 'center' } },
              React.createElement('div', { style: { fontSize: '18px', fontWeight: '900', color: t.green } }, `${selected.nutrient}%`),
              React.createElement('div', { style: { fontSize: '9px', color: t.textMuted, textTransform: 'uppercase', letterSpacing: '1px' } }, 'Nutrients'),
            ),
          ),
          // XP Bar
          React.createElement('p', { style: { margin: '0 0 4px', fontSize: '9px', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase', color: t.textMuted } }, `XP • ${selected.xp} / ${selected.maxXp}`),
          React.createElement('div', { style: { height: '8px', backgroundColor: isDark ? '#2A2A4A' : '#EEE', border: `2px solid ${t.border}`, marginBottom: '12px' } },
            React.createElement('div', { style: { height: '100%', width: `${(selected.xp / selected.maxXp) * 100}%`, backgroundColor: selected.color } })
          ),
          // Trait badge
          React.createElement('div', { style: { display: 'flex', gap: '8px', alignItems: 'center' } },
            React.createElement('div', { style: { backgroundColor: t.navy, border: `2px solid ${t.border}`, padding: '4px 10px', fontSize: '10px', fontWeight: '700', color: t.primary } }, `✨ ${selected.trait}`),
            React.createElement('button', {
              onClick: () => setFed(true),
              style: { flex: 1, backgroundColor: fed ? t.green : t.primary, border: `2px solid ${t.border}`, boxShadow: t.shadowSm, padding: '8px', fontSize: '12px', fontWeight: '700', cursor: 'pointer', color: '#1A1A40', fontFamily: "'Playfair Display', serif", transition: 'all 0.15s' }
            }, fed ? '✓ Nutrients Fed!' : '🌿 Feed Nutrients')
          )
        )
      ),

      // OVERLAPPING SPRITE CARDS GRID
      React.createElement('p', { style: { margin: '0 0 12px', fontSize: '10px', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase', color: t.textMuted } }, 'All Sprites'),
      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', position: 'relative' } },
        SPRITES.map((s, i) => {
          const rotations = [-2, 1.5, -1, 2];
          const isSelected = selected.id === s.id;
          return React.createElement('div', {
            key: s.id,
            onClick: () => { setSelected(s); setFed(false); },
            style: {
              backgroundColor: isSelected ? s.color : t.surface,
              border: `2px solid ${t.border}`,
              boxShadow: isSelected ? `5px 5px 0px ${t.primary}` : t.shadowSm,
              padding: '12px',
              cursor: 'pointer',
              transform: `rotate(${rotations[i]}deg)`,
              transition: 'all 0.15s',
            }
          },
            React.createElement('div', { style: { fontSize: '32px', textAlign: 'center', marginBottom: '4px' } }, s.emoji),
            React.createElement('div', { style: { fontSize: '12px', fontWeight: '900', color: isSelected ? '#1A1A40' : t.text, textAlign: 'center' } }, s.name),
            React.createElement('div', { style: { fontSize: '9px', color: isSelected ? '#1A1A40' : t.textMuted, textAlign: 'center', marginBottom: '6px' } }, `Lv.${s.level} • ${s.mood}`),
            React.createElement('div', { style: { height: '4px', backgroundColor: 'rgba(0,0,0,0.15)', border: `1px solid ${t.border}` } },
              React.createElement('div', { style: { height: '100%', width: `${s.nutrient}%`, backgroundColor: '#1A1A40' } })
            )
          );
        })
      )
    ),

    React.createElement(BottomNav, { t, active: 'nursery', navigate })
  );
}

function QuestsScreen({ t, isDark, toggleTheme, navigate }) {
  const [completed, setCompleted] = useState([3]);
  const [gems, setGems] = useState(840);

  const completeQuest = (id, reward) => {
    if (!completed.includes(id)) {
      setCompleted([...completed, id]);
      setGems(g => g + reward);
    }
  };

  const daily = QUESTS.filter(q => q.type === 'daily');
  const weekly = QUESTS.filter(q => q.type === 'weekly');

  return React.createElement('div', { style: { height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: t.bg, fontFamily: "'Playfair Display', serif", overflow: 'hidden' } },
    // Header
    React.createElement('div', { style: { backgroundColor: t.primary, padding: '14px 18px 12px', borderBottom: `3px solid ${t.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 } },
      React.createElement('div', null,
        React.createElement('p', { style: { margin: 0, fontSize: '9px', fontWeight: '700', letterSpacing: '3px', color: t.navy, textTransform: 'uppercase' } }, 'Save the World'),
        React.createElement('h1', { style: { margin: 0, fontSize: '22px', fontWeight: '900', color: t.navy, lineHeight: 1 } }, 'Eco-Quests'),
      ),
      React.createElement('div', { style: { display: 'flex', gap: '8px', alignItems: 'center' } },
        React.createElement('div', { style: { backgroundColor: t.navy, border: `2px solid ${t.border}`, padding: '5px 12px', display: 'flex', alignItems: 'center', gap: '5px', boxShadow: t.shadowSm } },
          React.createElement('span', { style: { fontSize: '14px' } }, '💎'),
          React.createElement('span', { style: { fontSize: '14px', fontWeight: '900', color: t.primary, fontFamily: "'Playfair Display', serif" } }, gems),
        ),
        React.createElement('button', { onClick: toggleTheme, style: { backgroundColor: t.navy, border: `2px solid ${t.border}`, width: '32px', height: '32px', cursor: 'pointer', fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' } }, isDark ? '☀️' : '🌙')
      )
    ),

    React.createElement('div', { style: { flex: 1, overflowY: 'auto', padding: '14px 16px' } },

      // Weekly challenge banner (angled)
      React.createElement('div', { style: { backgroundColor: t.navy, border: `3px solid ${t.border}`, boxShadow: t.shadow, padding: '14px 16px', marginBottom: '20px', transform: 'rotate(-1deg)', position: 'relative', overflow: 'hidden' } },
        React.createElement('div', { style: { position: 'absolute', top: '-10px', right: '-10px', width: '80px', height: '80px', backgroundColor: t.primary, opacity: 0.15, borderRadius: '50%' } }),
        React.createElement('p', { style: { margin: '0 0 2px', fontSize: '9px', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase', color: t.textMuted } }, '⚡ THIS WEEK\'S BIG CHALLENGE'),
        React.createElement('div', { style: { fontSize: '17px', fontWeight: '900', color: t.primary } }, 'Plastic-Free Challenge'),
        React.createElement('p', { style: { margin: '4px 0 10px', fontSize: '11px', color: t.textMuted } }, 'Avoid single-use plastic for 7 full days and unlock the legendary Crystalvine sprite'),
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
          React.createElement('div', { style: { flex: 1, height: '8px', backgroundColor: isDark ? '#2A2A4A' : '#333', border: `1px solid ${t.border}`, marginRight: '12px' } },
            React.createElement('div', { style: { height: '100%', width: '57%', backgroundColor: t.green } })
          ),
          React.createElement('span', { style: { fontSize: '11px', fontWeight: '900', color: t.primary } }, '4 / 7 days'),
          React.createElement('div', { style: { backgroundColor: t.primary, border: `2px solid ${t.border}`, padding: '3px 10px', marginLeft: '12px', fontSize: '11px', fontWeight: '900', color: '#1A1A40' } }, '💎 500'),
        )
      ),

      // Daily Quests
      React.createElement('p', { style: { margin: '0 0 10px', fontSize: '10px', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase', color: t.textMuted } }, 'Daily Quests — Apr 5'),
      ...daily.map((q, i) => {
        const isDone = completed.includes(q.id);
        const pct = Math.min((q.progress / q.max) * 100, 100);
        return React.createElement('div', {
          key: q.id,
          style: { backgroundColor: isDone ? t.questDone : t.surface, border: `2px solid ${isDone ? t.green : t.border}`, boxShadow: isDone ? 'none' : t.shadowSm, padding: '12px 14px', marginBottom: '10px', display: 'flex', gap: '12px', alignItems: 'flex-start', transform: `rotate(${i % 2 === 0 ? '-0.5' : '0.5'}deg)` }
        },
          React.createElement('div', { style: { fontSize: '24px', flexShrink: 0, marginTop: '2px' } }, q.icon),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' } },
              React.createElement('div', { style: { fontSize: '14px', fontWeight: '900', color: t.text, textDecoration: isDone ? 'line-through' : 'none' } }, q.title),
              React.createElement('div', { style: { backgroundColor: isDone ? t.green : t.yellow, border: `2px solid ${t.border}`, padding: '2px 8px', fontSize: '10px', fontWeight: '700', color: '#1A1A40', flexShrink: 0, marginLeft: '8px' } }, `💎 ${q.reward}`)
            ),
            React.createElement('p', { style: { margin: '2px 0 8px', fontSize: '11px', color: t.textMuted } }, q.desc),
            q.max > 1 && React.createElement('div', null,
              React.createElement('div', { style: { height: '5px', backgroundColor: isDark ? '#2A2A4A' : '#EEE', border: `1px solid ${t.border}`, marginBottom: '4px' } },
                React.createElement('div', { style: { height: '100%', width: `${pct}%`, backgroundColor: isDone ? t.green : t.primary } })
              ),
              React.createElement('p', { style: { margin: 0, fontSize: '9px', color: t.textMuted } }, `${q.progress.toLocaleString()} / ${q.max.toLocaleString()}`)
            ),
            !isDone && q.max === 1 && React.createElement('button', {
              onClick: () => completeQuest(q.id, q.reward),
              style: { backgroundColor: t.primary, border: `2px solid ${t.border}`, boxShadow: t.shadowSm, padding: '6px 14px', fontSize: '11px', fontWeight: '700', cursor: 'pointer', color: '#1A1A40', fontFamily: "'Playfair Display', serif", marginTop: '4px' }
            }, 'Mark Complete'),
            isDone && React.createElement('p', { style: { margin: '4px 0 0', fontSize: '11px', fontWeight: '700', color: t.green } }, '✓ Quest Completed!')
          )
        );
      }),

      // Weekly Quests
      React.createElement('p', { style: { margin: '10px 0 10px', fontSize: '10px', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase', color: t.textMuted } }, 'Weekly Quests'),
      ...weekly.map((q, i) => {
        const isDone = completed.includes(q.id);
        const pct = Math.min((q.progress / q.max) * 100, 100);
        return React.createElement('div', {
          key: q.id,
          style: { backgroundColor: t.surface, border: `2px solid ${t.border}`, boxShadow: t.shadowSm, padding: '12px 14px', marginBottom: '10px', display: 'flex', gap: '12px', alignItems: 'flex-start' }
        },
          React.createElement('div', { style: { fontSize: '24px', flexShrink: 0, marginTop: '2px' } }, q.icon),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' } },
              React.createElement('div', { style: { fontSize: '14px', fontWeight: '900', color: t.text } }, q.title),
              React.createElement('div', { style: { backgroundColor: t.navy, border: `2px solid ${t.border}`, padding: '2px 8px', fontSize: '10px', fontWeight: '700', color: t.primary, flexShrink: 0, marginLeft: '8px' } }, `💎 ${q.reward}`)
            ),
            React.createElement('p', { style: { margin: '2px 0 8px', fontSize: '11px', color: t.textMuted } }, q.desc),
            React.createElement('div', { style: { height: '5px', backgroundColor: isDark ? '#2A2A4A' : '#EEE', border: `1px solid ${t.border}`, marginBottom: '4px' } },
              React.createElement('div', { style: { height: '100%', width: `${pct}%`, backgroundColor: t.green } })
            ),
            React.createElement('p', { style: { margin: 0, fontSize: '9px', color: t.textMuted } }, `${q.progress} / ${q.max} completed`)
          )
        );
      })
    ),

    React.createElement(BottomNav, { t, active: 'quests', navigate })
  );
}

function CoachScreen({ t, isDark, toggleTheme, navigate }) {
  const [messages, setMessages] = useState(MESSAGES);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef(null);

  const replies = [
    { sprite: 'Fernwhisker', emoji: '🌿🐱', text: "I sense great determination in you today! Take a deep breath — your steps are building my deepest roots. 🌿" },
    { sprite: 'Sundrift', emoji: '🌻🐦', text: "Every choice you make ripples through the TerraScape. Even small actions matter enormously! 🌞" },
    { sprite: 'Bloomdancer', emoji: '🌸🦋', text: "Oh! I felt that eco-action all the way in my wing patterns. You're shaping something beautiful here. 🦋" },
  ];

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg = { id: messages.length + 1, text: input, time: 'just now', isSprite: false };
    setMessages(m => [...m, userMsg]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      const reply = replies[Math.floor(Math.random() * replies.length)];
      setMessages(m => [...m, { id: m.length + 1, ...reply, time: 'just now', isSprite: true }]);
      setTyping(false);
    }, 1400);
  };

  const needs = [
    { label: 'Nutrients', val: 78, icon: '🌿', color: t.green },
    { label: 'Activity', val: 62, icon: '⚡', color: t.primary },
    { label: 'Eco Score', val: 88, icon: '♻️', color: t.yellow },
  ];

  return React.createElement('div', { style: { height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: t.bg, fontFamily: "'Playfair Display', serif", overflow: 'hidden' } },
    // Header
    React.createElement('div', { style: { backgroundColor: t.green, padding: '14px 18px 12px', borderBottom: `3px solid ${t.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 } },
      React.createElement('div', null,
        React.createElement('p', { style: { margin: 0, fontSize: '9px', fontWeight: '700', letterSpacing: '3px', color: '#1A1A40', textTransform: 'uppercase' } }, 'Your Companions Speak'),
        React.createElement('h1', { style: { margin: 0, fontSize: '22px', fontWeight: '900', color: '#1A1A40', lineHeight: 1 } }, 'Sprite Coach'),
      ),
      React.createElement('div', { style: { display: 'flex', gap: '8px', alignItems: 'center' } },
        React.createElement('div', { style: { fontSize: '28px' } }, '🌿🐱'),
        React.createElement('button', { onClick: toggleTheme, style: { backgroundColor: '#1A1A40', border: `2px solid ${t.border}`, width: '32px', height: '32px', cursor: 'pointer', fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' } }, isDark ? '☀️' : '🌙')
      )
    ),

    // Sprite Needs Strip
    React.createElement('div', { style: { backgroundColor: t.surface, borderBottom: `3px solid ${t.border}`, padding: '10px 16px', display: 'flex', gap: '10px', flexShrink: 0 } },
      needs.map(n =>
        React.createElement('div', { key: n.label, style: { flex: 1, textAlign: 'center' } },
          React.createElement('div', { style: { fontSize: '14px' } }, n.icon),
          React.createElement('div', { style: { height: '5px', backgroundColor: isDark ? '#2A2A4A' : '#EEE', border: `1px solid ${t.border}`, margin: '4px 0 2px' } },
            React.createElement('div', { style: { height: '100%', width: `${n.val}%`, backgroundColor: n.color } })
          ),
          React.createElement('div', { style: { fontSize: '8px', fontWeight: '700', color: t.textMuted, letterSpacing: '1px', textTransform: 'uppercase' } }, n.label)
        )
      )
    ),

    // Messages
    React.createElement('div', { ref: scrollRef, style: { flex: 1, overflowY: 'auto', padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: '12px' } },
      messages.map(msg =>
        React.createElement('div', { key: msg.id, style: { display: 'flex', flexDirection: msg.isSprite ? 'row' : 'row-reverse', gap: '10px', alignItems: 'flex-end' } },
          msg.isSprite && React.createElement('div', { style: { backgroundColor: t.navy, border: `2px solid ${t.border}`, width: '36px', height: '36px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', boxShadow: t.shadowSm } }, msg.emoji),
          React.createElement('div', { style: { maxWidth: '72%' } },
            msg.isSprite && React.createElement('p', { style: { margin: '0 0 3px', fontSize: '9px', fontWeight: '700', color: t.green, letterSpacing: '1px', textTransform: 'uppercase' } }, msg.sprite),
            React.createElement('div', {
              style: {
                backgroundColor: msg.isSprite ? t.surface : t.primary,
                border: `2px solid ${t.border}`,
                boxShadow: t.shadowSm,
                padding: '10px 13px',
                fontSize: '12px',
                color: msg.isSprite ? t.text : '#1A1A40',
                lineHeight: 1.5,
                transform: `rotate(${msg.isSprite ? '-0.5' : '0.5'}deg)`
              }
            }, msg.text),
            React.createElement('p', { style: { margin: '3px 0 0', fontSize: '9px', color: t.textMuted, textAlign: msg.isSprite ? 'left' : 'right' } }, msg.time)
          )
        )
      ),
      typing && React.createElement('div', { style: { display: 'flex', gap: '10px', alignItems: 'flex-end' } },
        React.createElement('div', { style: { backgroundColor: t.navy, border: `2px solid ${t.border}`, width: '36px', height: '36px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' } }, '🌿🐱'),
        React.createElement('div', { style: { backgroundColor: t.surface, border: `2px solid ${t.border}`, boxShadow: t.shadowSm, padding: '12px 16px', fontSize: '18px', letterSpacing: '4px' } }, '···')
      )
    ),

    // Input
    React.createElement('div', { style: { backgroundColor: t.surface, borderTop: `3px solid ${t.border}`, padding: '10px 14px', display: 'flex', gap: '10px', flexShrink: 0 } },
      React.createElement('input', {
        value: input,
        onChange: e => setInput(e.target.value),
        onKeyDown: e => e.key === 'Enter' && sendMessage(),
        placeholder: 'Talk to your sprites...',
        style: { flex: 1, backgroundColor: t.inputBg, border: `2px solid ${t.border}`, padding: '10px 14px', fontSize: '13px', fontFamily: "'Playfair Display', serif", color: t.text, outline: 'none' }
      }),
      React.createElement('button', {
        onClick: sendMessage,
        style: { backgroundColor: t.primary, border: `2px solid ${t.border}`, boxShadow: t.shadowSm, padding: '10px 16px', fontSize: '16px', cursor: 'pointer', fontWeight: '900', color: '#1A1A40', flexShrink: 0 }
      }, '→')
    ),

    React.createElement(BottomNav, { t, active: 'coach', navigate })
  );
}

function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&display=swap';
    document.head.appendChild(link);
  }, []);

  const t = isDark ? themes.dark : themes.light;
  const screens = { home: HomeScreen, nursery: NurseryScreen, quests: QuestsScreen, coach: CoachScreen };

  return React.createElement('div', {
    style: { minHeight: '100vh', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', fontFamily: "'Playfair Display', serif" }
  },
    React.createElement('div', {
      style: { width: '375px', height: '812px', borderRadius: '40px', overflow: 'hidden', border: `3px solid #1A1A40`, boxShadow: '8px 8px 0px #1A1A40', position: 'relative', display: 'flex', flexDirection: 'column' }
    },
      React.createElement(screens[activeScreen], {
        t,
        isDark,
        toggleTheme: () => setIsDark(d => !d),
        navigate: setActiveScreen,
        // legacy compat
        theme: t,
      })
    )
  );
}
