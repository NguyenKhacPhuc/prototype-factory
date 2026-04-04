const { useState, useEffect, useRef } = React;

const themes = {
  dark: {
    bg: '#1a1f14',
    surface: '#232b1a',
    surface2: '#2d3822',
    card: '#2a3420',
    cardBorder: '#3d4f2c',
    text: '#f0ead6',
    textSecondary: '#b8c9a0',
    textMuted: '#7a9060',
    primary: '#4a7c3f',
    primaryLight: '#6aaa5a',
    accent: '#c0392b',
    accentLight: '#e74c3c',
    soil: '#7a5230',
    soilLight: '#a06840',
    linen: '#f0ead6',
    tag: '#3d4f2c',
    tagText: '#b8c9a0',
  },
  light: {
    bg: '#f5f0e8',
    surface: '#ede8dc',
    surface2: '#e4ddd0',
    card: '#faf6ee',
    cardBorder: '#c8b99a',
    text: '#2a1f0e',
    textSecondary: '#4a3822',
    textMuted: '#7a6050',
    primary: '#2d6e22',
    primaryLight: '#4a9a3a',
    accent: '#c0392b',
    accentLight: '#e74c3c',
    soil: '#7a5230',
    soilLight: '#a06840',
    linen: '#f5f0e8',
    tag: '#ddd0ba',
    tagText: '#4a3822',
  }
};

const creatures = [
  { id: 1, name: 'Mosswing', type: 'Forest Sprite', level: 4, xp: 720, maxXp: 1000, emoji: '🌿', rarity: 'Common', ecoImpact: { resilience: 72, carbonOffset: 48, waterPurity: 61 }, color: '#4a7c3f', habit: 'Steps' },
  { id: 2, name: 'Dewmoth', type: 'Meadow Drifter', level: 2, xp: 310, maxXp: 500, emoji: '🦋', rarity: 'Uncommon', ecoImpact: { resilience: 45, carbonOffset: 38, waterPurity: 82 }, color: '#2980b9', habit: 'Mindfulness' },
  { id: 3, name: 'Thornback', type: 'Soil Guardian', level: 6, xp: 1800, maxXp: 2000, emoji: '🦔', rarity: 'Rare', ecoImpact: { resilience: 91, carbonOffset: 74, waterPurity: 55 }, color: '#7a5230', habit: 'Sleep' },
  { id: 4, name: 'Sunvine', type: 'Solar Bloom', level: 1, xp: 80, maxXp: 200, emoji: '🌻', rarity: 'Common', ecoImpact: { resilience: 28, carbonOffset: 52, waterPurity: 34 }, color: '#d4a017', habit: 'Nutrition' },
  { id: 5, name: 'Tidecrawler', type: 'Deep Ocean', level: 3, xp: 490, maxXp: 750, emoji: '🦀', rarity: 'Rare', ecoImpact: { resilience: 60, carbonOffset: 44, waterPurity: 95 }, color: '#1a5276', habit: 'Swimming' },
  { id: 6, name: 'Glowcap', type: 'Night Fungi', level: 2, xp: 220, maxXp: 500, emoji: '🍄', rarity: 'Uncommon', ecoImpact: { resilience: 38, carbonOffset: 29, waterPurity: 47 }, color: '#8e44ad', habit: 'Meditation' },
];

const quests = [
  { id: 1, title: 'Morning Harvest', desc: 'Collect 7,000 steps before noon', reward: '🌱 Bio-Seed', progress: 5200, goal: 7000, xp: 120, timeLeft: '4h 22m', creature: 'Mosswing' },
  { id: 2, title: 'Hydration Ritual', desc: 'Log 8 glasses of water today', reward: '💧 Water Rune', progress: 5, goal: 8, xp: 80, timeLeft: '11h 08m', creature: 'Dewmoth' },
  { id: 3, title: 'Deep Roots Sleep', desc: 'Achieve 7+ hours of sleep', reward: '🌙 Night Bloom Seed', progress: 0, goal: 7, xp: 200, timeLeft: 'Tonight', creature: 'Thornback' },
  { id: 4, title: 'Solar Peak Climb', desc: 'Complete 20 minutes of cardio', reward: '⚡ Solar Fertilizer', progress: 12, goal: 20, xp: 150, timeLeft: '8h 00m', creature: 'Sunvine' },
];

const biomes = [
  { name: 'Whispering Forest', creatures: 3, level: 'Flourishing', color: '#2d5a1b', emoji: '🌲' },
  { name: 'Deep Ocean Grove', creatures: 1, level: 'Growing', color: '#1a3a5c', emoji: '🌊' },
  { name: 'Solar Peak Meadow', creatures: 2, level: 'Budding', color: '#7a5500', emoji: '☀️' },
];

function useAnimatedValue(target, duration = 800) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let start = null;
    const animate = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * ease));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [target]);
  return value;
}

function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [isDark, setIsDark] = useState(true);
  const [pressedBtn, setPressedBtn] = useState(null);
  const [selectedCreature, setSelectedCreature] = useState(null);
  const [activeQuest, setActiveQuest] = useState(null);

  const t = isDark ? themes.dark : themes.light;

  const handlePress = (id, cb) => {
    setPressedBtn(id);
    setTimeout(() => { setPressedBtn(null); if (cb) cb(); }, 150);
  };

  const screens = { home: HomeScreen, biome: BiomeScreen, quests: QuestsScreen, ecodash: EcoDashScreen };
  const ActiveScreen = screens[activeScreen] || HomeScreen;

  const fontStyle = `
    @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;0,700;1,400;1,600&display=swap');
    * { box-sizing: border-box; }
    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: ${t.cardBorder}; border-radius: 2px; }
    @keyframes float { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-6px); } }
    @keyframes pulse-glow { 0%,100% { opacity: 0.6; } 50% { opacity: 1; } }
    @keyframes grow { from { transform: scaleX(0); } to { transform: scaleX(1); } }
    @keyframes sway { 0%,100% { transform: rotate(-2deg); } 50% { transform: rotate(2deg); } }
    @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
  `;

  return React.createElement('div', {
    style: { minHeight: '100vh', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Lora', Georgia, serif", padding: '20px' }
  },
    React.createElement('style', null, fontStyle),
    React.createElement('div', {
      style: {
        width: '375px', height: '812px', background: t.bg, borderRadius: '40px',
        overflow: 'hidden', position: 'relative', display: 'flex', flexDirection: 'column',
        boxShadow: '0 30px 80px rgba(0,0,0,0.35), 0 0 0 8px #1a1a1a',
        transition: 'background 0.3s ease'
      }
    },
      React.createElement(ActiveScreen, {
        t, isDark, setIsDark, activeScreen, setActiveScreen, handlePress, pressedBtn,
        selectedCreature, setSelectedCreature, activeQuest, setActiveQuest
      })
    )
  );
}

function TopBar({ t, title, subtitle, isDark, setIsDark, handlePress }) {
  return React.createElement('div', {
    style: { padding: '20px 22px 10px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }
  },
    React.createElement('div', null,
      React.createElement('div', { style: { fontSize: '22px', fontWeight: '700', color: t.text, lineHeight: 1.2 } }, title),
      subtitle && React.createElement('div', { style: { fontSize: '13px', color: t.textMuted, fontStyle: 'italic', marginTop: '2px' } }, subtitle)
    ),
    React.createElement('button', {
      onClick: () => handlePress('theme', () => setIsDark(!isDark)),
      style: {
        background: pressedBtn === 'theme' ? t.primary : t.surface2,
        border: `1.5px solid ${t.cardBorder}`, borderRadius: '20px',
        padding: '6px 12px', cursor: 'pointer', fontSize: '14px',
        transform: 'rotate(-1deg)', transition: 'all 0.2s'
      }
    }, isDark ? '☀️' : '🌙')
  );
}

function NavBar({ t, activeScreen, setActiveScreen, handlePress }) {
  const navItems = [
    { id: 'home', label: 'Biome', icon: '🌿' },
    { id: 'biome', label: 'Creatures', icon: '🦋' },
    { id: 'quests', label: 'Quests', icon: '⚡' },
    { id: 'ecodash', label: 'Eco Dash', icon: '🌍' },
  ];
  return React.createElement('div', {
    style: {
      display: 'flex', background: t.surface, borderTop: `1.5px solid ${t.cardBorder}`,
      padding: '8px 4px 10px'
    }
  },
    navItems.map(item =>
      React.createElement('button', {
        key: item.id,
        onClick: () => handlePress(`nav-${item.id}`, () => setActiveScreen(item.id)),
        style: {
          flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
          gap: '3px', background: 'none', border: 'none', cursor: 'pointer',
          padding: '6px 4px',
          transform: activeScreen === item.id ? 'translateY(-2px)' : 'none',
          transition: 'transform 0.2s'
        }
      },
        React.createElement('span', { style: { fontSize: '20px', lineHeight: 1 } }, item.icon),
        React.createElement('span', {
          style: {
            fontSize: '10px', fontFamily: "'Lora', serif",
            color: activeScreen === item.id ? t.primaryLight : t.textMuted,
            fontWeight: activeScreen === item.id ? '600' : '400'
          }
        }, item.label)
      )
    )
  );
}

function StatBar({ value, max, color, t }) {
  const pct = Math.round((value / max) * 100);
  return React.createElement('div', { style: { background: t.surface2, borderRadius: '4px', height: '8px', overflow: 'hidden' } },
    React.createElement('div', {
      style: {
        width: `${pct}%`, height: '100%', background: color,
        borderRadius: '4px', animation: 'grow 0.8s ease-out',
        transformOrigin: 'left'
      }
    })
  );
}

function HomeScreen({ t, isDark, setIsDark, activeScreen, setActiveScreen, handlePress, pressedBtn }) {
  const steps = useAnimatedValue(6842);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setPulse(p => !p), 2000);
    return () => clearInterval(interval);
  }, []);

  const today = { steps: 6842, mindful: 15, water: 5, sleep: 7.2 };

  return React.createElement('div', { style: { flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' } },
    // Header
    React.createElement('div', {
      style: { padding: '22px 22px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }
    },
      React.createElement('div', null,
        React.createElement('div', { style: { fontSize: '11px', color: t.textMuted, letterSpacing: '1.5px', textTransform: 'uppercase', fontStyle: 'italic' } }, 'Your Living World'),
        React.createElement('div', { style: { fontSize: '26px', fontWeight: '700', color: t.text, lineHeight: 1.1 } }, 'Eco Thrive')
      ),
      React.createElement('button', {
        onClick: () => handlePress('theme', () => setIsDark(!isDark)),
        style: {
          background: t.surface2, border: `1.5px solid ${t.cardBorder}`,
          borderRadius: '50%', width: '36px', height: '36px',
          cursor: 'pointer', fontSize: '16px', transform: 'rotate(3deg)'
        }
      }, isDark ? '☀️' : '🌙')
    ),

    React.createElement('div', { style: { flex: 1, overflowY: 'auto', padding: '16px 22px' } },

      // Biome hero — angled block
      React.createElement('div', {
        style: {
          background: `linear-gradient(135deg, ${t.primary}22, ${t.soil}33)`,
          border: `2px solid ${t.primary}44`, borderRadius: '18px 18px 24px 12px',
          padding: '18px', marginBottom: '16px', position: 'relative',
          transform: 'rotate(-0.8deg)'
        }
      },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' } },
          React.createElement('div', null,
            React.createElement('div', { style: { fontSize: '12px', color: t.textMuted, fontStyle: 'italic' } }, 'Active Biome'),
            React.createElement('div', { style: { fontSize: '18px', fontWeight: '700', color: t.primaryLight, marginBottom: '4px' } }, 'Whispering Forest'),
            React.createElement('div', { style: { display: 'flex', gap: '6px', flexWrap: 'wrap' } },
              ['3 Creatures', 'Flourishing', 'Lv.4 Avg'].map(tag =>
                React.createElement('span', {
                  key: tag,
                  style: {
                    background: t.tag, color: t.tagText, fontSize: '10px',
                    padding: '2px 8px', borderRadius: '10px', fontFamily: "'Lora', serif"
                  }
                }, tag)
              )
            )
          ),
          React.createElement('div', {
            style: {
              fontSize: '48px', lineHeight: 1,
              animation: 'float 3s ease-in-out infinite',
              display: 'inline-block'
            }
          }, '🌲')
        ),
        React.createElement('div', {
          style: { marginTop: '12px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }
        },
          [['Resilience', 72, t.primaryLight], ['Carbon', 58, '#27ae60'], ['Water', 74, '#2980b9']].map(([label, val, color]) =>
            React.createElement('div', { key: label },
              React.createElement('div', { style: { fontSize: '10px', color: t.textMuted, marginBottom: '3px' } }, label),
              React.createElement(StatBar, { value: val, max: 100, color, t }),
              React.createElement('div', { style: { fontSize: '11px', color: t.textSecondary, marginTop: '2px', fontWeight: '600' } }, `${val}%`)
            )
          )
        )
      ),

      // Today's harvest — steps highlight
      React.createElement('div', {
        style: {
          background: t.card, border: `1.5px solid ${t.cardBorder}`,
          borderRadius: '14px 20px 14px 20px', padding: '16px', marginBottom: '16px',
          transform: 'rotate(0.5deg)'
        }
      },
        React.createElement('div', { style: { fontSize: '11px', color: t.textMuted, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px' } }, 'Today\'s Harvest'),
        React.createElement('div', { style: { display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '12px' } },
          React.createElement('span', { style: { fontSize: '42px', fontWeight: '700', color: t.primaryLight, lineHeight: 1 } }, steps.toLocaleString()),
          React.createElement('span', { style: { fontSize: '14px', color: t.textMuted } }, 'steps')
        ),
        React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' } },
          [
            { icon: '🧘', label: 'Mindful', value: `${today.mindful}min` },
            { icon: '💧', label: 'Water', value: `${today.water}/8` },
            { icon: '🌙', label: 'Sleep', value: `${today.sleep}h` }
          ].map(item =>
            React.createElement('div', {
              key: item.label,
              style: {
                background: t.surface2, borderRadius: '10px', padding: '10px 8px',
                textAlign: 'center', border: `1px solid ${t.cardBorder}`
              }
            },
              React.createElement('div', { style: { fontSize: '20px', marginBottom: '2px' } }, item.icon),
              React.createElement('div', { style: { fontSize: '13px', fontWeight: '600', color: t.text } }, item.value),
              React.createElement('div', { style: { fontSize: '10px', color: t.textMuted } }, item.label)
            )
          )
        )
      ),

      // Featured creature
      React.createElement('div', { style: { fontSize: '11px', color: t.textMuted, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px' } }, 'Active Companion'),
      React.createElement('button', {
        onClick: () => handlePress('mosswing', () => setActiveScreen('biome')),
        style: {
          width: '100%', background: t.card, border: `2px solid ${t.primary}55`,
          borderRadius: '16px', padding: '14px', cursor: 'pointer', textAlign: 'left',
          transform: pressedBtn === 'mosswing' ? 'scale(0.97)' : 'scale(1)',
          transition: 'transform 0.15s', display: 'flex', gap: '14px', alignItems: 'center'
        }
      },
        React.createElement('div', {
          style: {
            width: '64px', height: '64px', background: `${t.primary}22`,
            borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '36px', flexShrink: 0, animation: 'float 4s ease-in-out infinite',
            border: `2px solid ${t.primary}44`
          }
        }, '🌿'),
        React.createElement('div', { style: { flex: 1 } },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' } },
            React.createElement('span', { style: { fontWeight: '700', color: t.text, fontSize: '16px' } }, 'Mosswing'),
            React.createElement('span', { style: { fontSize: '11px', color: t.primaryLight, fontStyle: 'italic' } }, 'Lv.4 Forest Sprite')
          ),
          React.createElement('div', { style: { margin: '6px 0' } },
            React.createElement(StatBar, { value: 720, max: 1000, color: t.primaryLight, t })
          ),
          React.createElement('div', { style: { fontSize: '11px', color: t.textMuted } }, '720 / 1000 XP • Next evolution near!')
        )
      ),

      // Quick hub links
      React.createElement('div', {
        style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '14px' }
      },
        [
          { id: 'quests', label: 'Active Quests', icon: '⚡', count: '4 pending', color: t.soil },
          { id: 'ecodash', label: 'Eco Dash', icon: '🌍', count: 'Global +2.3%', color: '#1a5276' }
        ].map(item =>
          React.createElement('button', {
            key: item.id,
            onClick: () => handlePress(`hub-${item.id}`, () => setActiveScreen(item.id)),
            style: {
              background: t.card, border: `1.5px solid ${t.cardBorder}`,
              borderRadius: '14px', padding: '14px', cursor: 'pointer', textAlign: 'left',
              transform: pressedBtn === `hub-${item.id}` ? 'scale(0.96)' : 'none',
              transition: 'transform 0.15s'
            }
          },
            React.createElement('div', { style: { fontSize: '24px', marginBottom: '6px' } }, item.icon),
            React.createElement('div', { style: { fontSize: '13px', fontWeight: '600', color: t.text } }, item.label),
            React.createElement('div', { style: { fontSize: '11px', color: t.textMuted, marginTop: '2px' } }, item.count)
          )
        )
      )
    ),

    React.createElement(NavBar, { t, activeScreen, setActiveScreen, handlePress })
  );
}

function BiomeScreen({ t, isDark, setIsDark, activeScreen, setActiveScreen, handlePress, pressedBtn, selectedCreature, setSelectedCreature }) {
  const [filter, setFilter] = useState('All');
  const filters = ['All', 'Forest', 'Ocean', 'Meadow', 'Night'];

  if (selectedCreature) {
    const c = creatures.find(cr => cr.id === selectedCreature);
    return React.createElement('div', { style: { flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' } },
      React.createElement('div', { style: { padding: '20px 20px 10px', display: 'flex', alignItems: 'center', gap: '12px' } },
        React.createElement('button', {
          onClick: () => setSelectedCreature(null),
          style: { background: t.surface2, border: `1px solid ${t.cardBorder}`, borderRadius: '10px', padding: '6px 10px', cursor: 'pointer', fontSize: '14px', color: t.text }
        }, '← Back'),
        React.createElement('span', { style: { fontWeight: '700', fontSize: '18px', color: t.text } }, c.name)
      ),
      React.createElement('div', { style: { flex: 1, overflowY: 'auto', padding: '0 20px 16px' } },
        // Creature hero
        React.createElement('div', {
          style: {
            background: `linear-gradient(135deg, ${c.color}22, ${c.color}11)`,
            border: `2px solid ${c.color}55`, borderRadius: '20px', padding: '28px',
            textAlign: 'center', marginBottom: '16px', transform: 'rotate(-0.5deg)'
          }
        },
          React.createElement('div', { style: { fontSize: '72px', marginBottom: '12px', display: 'block', animation: 'float 3s ease-in-out infinite' } }, c.emoji),
          React.createElement('div', { style: { fontSize: '24px', fontWeight: '700', color: t.text } }, c.name),
          React.createElement('div', { style: { fontSize: '14px', color: t.textMuted, fontStyle: 'italic', marginBottom: '8px' } }, c.type),
          React.createElement('div', { style: { display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' } },
            React.createElement('span', { style: { background: c.color + '33', color: c.color === '#1a5276' ? '#5dade2' : t.primaryLight, padding: '4px 12px', borderRadius: '12px', fontSize: '12px', fontWeight: '600' } }, `Lv.${c.level}`),
            React.createElement('span', { style: { background: t.tag, color: t.tagText, padding: '4px 12px', borderRadius: '12px', fontSize: '12px' } }, c.rarity),
            React.createElement('span', { style: { background: t.tag, color: t.tagText, padding: '4px 12px', borderRadius: '12px', fontSize: '12px' } }, c.habit)
          )
        ),
        // XP
        React.createElement('div', { style: { background: t.card, border: `1.5px solid ${t.cardBorder}`, borderRadius: '16px', padding: '16px', marginBottom: '12px' } },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: '8px' } },
            React.createElement('span', { style: { fontSize: '13px', fontWeight: '600', color: t.text } }, 'Experience'),
            React.createElement('span', { style: { fontSize: '13px', color: t.textMuted } }, `${c.xp} / ${c.maxXp} XP`)
          ),
          React.createElement(StatBar, { value: c.xp, max: c.maxXp, color: c.color, t }),
          React.createElement('div', { style: { fontSize: '11px', color: t.textMuted, marginTop: '6px', fontStyle: 'italic' } }, `${c.maxXp - c.xp} XP until next evolution`)
        ),
        // Eco Impact
        React.createElement('div', { style: { background: t.card, border: `1.5px solid ${t.cardBorder}`, borderRadius: '16px', padding: '16px', marginBottom: '12px' } },
          React.createElement('div', { style: { fontSize: '13px', fontWeight: '700', color: t.text, marginBottom: '12px' } }, 'Eco Impact Stats'),
          [
            ['🛡️ Resilience', c.ecoImpact.resilience, t.primaryLight],
            ['🌱 Carbon Offset', c.ecoImpact.carbonOffset, '#27ae60'],
            ['💧 Water Purity', c.ecoImpact.waterPurity, '#2980b9'],
          ].map(([label, val, color]) =>
            React.createElement('div', { key: label, style: { marginBottom: '10px' } },
              React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: '4px' } },
                React.createElement('span', { style: { fontSize: '12px', color: t.textSecondary } }, label),
                React.createElement('span', { style: { fontSize: '12px', fontWeight: '600', color } }, `${val}%`)
              ),
              React.createElement(StatBar, { value: val, max: 100, color, t })
            )
          )
        ),
        // Feed button
        React.createElement('button', {
          onClick: () => handlePress('feed', null),
          style: {
            width: '100%', background: t.primary, color: t.linen,
            border: 'none', borderRadius: '16px', padding: '16px',
            fontSize: '15px', fontWeight: '700', cursor: 'pointer',
            fontFamily: "'Lora', serif",
            transform: pressedBtn === 'feed' ? 'scale(0.97)' : 'scale(1)',
            transition: 'transform 0.15s',
            boxShadow: `0 4px 16px ${t.primary}44`
          }
        }, '🌱 Feed with Today\'s Activity')
      ),
      React.createElement(NavBar, { t, activeScreen, setActiveScreen, handlePress })
    );
  }

  return React.createElement('div', { style: { flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' } },
    React.createElement('div', { style: { padding: '20px 22px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' } },
      React.createElement('div', null,
        React.createElement('div', { style: { fontSize: '11px', color: t.textMuted, letterSpacing: '1.5px', textTransform: 'uppercase', fontStyle: 'italic' } }, 'Your Collection'),
        React.createElement('div', { style: { fontSize: '24px', fontWeight: '700', color: t.text } }, 'Bio-Creatures')
      ),
      React.createElement('button', {
        onClick: () => handlePress('theme', () => setIsDark(!isDark)),
        style: { background: t.surface2, border: `1.5px solid ${t.cardBorder}`, borderRadius: '50%', width: '36px', height: '36px', cursor: 'pointer', fontSize: '16px' }
      }, isDark ? '☀️' : '🌙')
    ),
    // Biomes strip
    React.createElement('div', {
      style: { padding: '12px 22px 0', display: 'flex', gap: '8px', overflowX: 'auto' }
    },
      biomes.map(biome =>
        React.createElement('div', {
          key: biome.name,
          style: {
            background: biome.color + '33', border: `1.5px solid ${biome.color}55`,
            borderRadius: '12px', padding: '8px 12px', flexShrink: 0, textAlign: 'center'
          }
        },
          React.createElement('div', { style: { fontSize: '18px' } }, biome.emoji),
          React.createElement('div', { style: { fontSize: '10px', fontWeight: '600', color: t.text, marginTop: '2px' } }, biome.name),
          React.createElement('div', { style: { fontSize: '9px', color: t.textMuted } }, biome.level)
        )
      )
    ),
    // Filter tabs
    React.createElement('div', { style: { padding: '10px 22px 0', display: 'flex', gap: '6px', overflowX: 'auto' } },
      filters.map(f =>
        React.createElement('button', {
          key: f,
          onClick: () => setFilter(f),
          style: {
            background: filter === f ? t.primary : t.surface2,
            color: filter === f ? t.linen : t.textMuted,
            border: `1px solid ${filter === f ? t.primary : t.cardBorder}`,
            borderRadius: '20px', padding: '5px 14px', fontSize: '11px',
            cursor: 'pointer', fontFamily: "'Lora', serif", flexShrink: 0,
            fontWeight: filter === f ? '600' : '400'
          }
        }, f)
      )
    ),
    React.createElement('div', { style: { flex: 1, overflowY: 'auto', padding: '10px 22px 16px' } },
      // Angled header
      React.createElement('div', {
        style: {
          background: t.surface2, borderRadius: '10px', padding: '8px 12px',
          marginBottom: '10px', transform: 'rotate(0.6deg)',
          border: `1px solid ${t.cardBorder}`
        }
      },
        React.createElement('span', { style: { fontSize: '12px', color: t.textMuted, fontStyle: 'italic' } }, `${creatures.length} creatures discovered • 3 seeds ready to hatch`)
      ),
      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' } },
        creatures.map(c =>
          React.createElement('button', {
            key: c.id,
            onClick: () => handlePress(`c-${c.id}`, () => setSelectedCreature(c.id)),
            style: {
              background: t.card, border: `1.5px solid ${c.color}44`,
              borderRadius: pressedBtn === `c-${c.id}` ? '12px' : '14px 14px 18px 12px',
              padding: '14px 12px', cursor: 'pointer', textAlign: 'left',
              transform: pressedBtn === `c-${c.id}` ? 'scale(0.95)' : 'none',
              transition: 'all 0.15s'
            }
          },
            React.createElement('div', { style: { fontSize: '36px', marginBottom: '6px', display: 'block', textAlign: 'center' } }, c.emoji),
            React.createElement('div', { style: { fontWeight: '700', fontSize: '13px', color: t.text, marginBottom: '2px' } }, c.name),
            React.createElement('div', { style: { fontSize: '10px', color: t.textMuted, fontStyle: 'italic', marginBottom: '6px' } }, c.type),
            React.createElement(StatBar, { value: c.xp, max: c.maxXp, color: c.color, t }),
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginTop: '4px' } },
              React.createElement('span', { style: { fontSize: '10px', color: t.textMuted } }, `Lv.${c.level}`),
              React.createElement('span', { style: { fontSize: '10px', fontStyle: 'italic', color: c.rarity === 'Rare' ? t.accentLight : t.textMuted } }, c.rarity)
            )
          )
        )
      )
    ),
    React.createElement(NavBar, { t, activeScreen, setActiveScreen, handlePress })
  );
}

function QuestsScreen({ t, isDark, setIsDark, activeScreen, setActiveScreen, handlePress, pressedBtn }) {
  const [completedQuests, setCompletedQuests] = useState([]);

  return React.createElement('div', { style: { flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' } },
    React.createElement('div', {
      style: { padding: '20px 22px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }
    },
      React.createElement('div', null,
        React.createElement('div', { style: { fontSize: '11px', color: t.textMuted, letterSpacing: '1.5px', textTransform: 'uppercase', fontStyle: 'italic' } }, 'Daily Missions'),
        React.createElement('div', { style: { fontSize: '24px', fontWeight: '700', color: t.text } }, 'Biome Blessings')
      ),
      React.createElement('button', {
        onClick: () => handlePress('theme', () => setIsDark(!isDark)),
        style: { background: t.surface2, border: `1.5px solid ${t.cardBorder}`, borderRadius: '50%', width: '36px', height: '36px', cursor: 'pointer', fontSize: '16px' }
      }, isDark ? '☀️' : '🌙')
    ),

    React.createElement('div', { style: { flex: 1, overflowY: 'auto', padding: '14px 22px 16px' } },

      // Streak card — angled
      React.createElement('div', {
        style: {
          background: `linear-gradient(135deg, ${t.soil}33, ${t.primary}22)`,
          border: `2px solid ${t.soil}44`, borderRadius: '16px 20px 16px 12px',
          padding: '16px', marginBottom: '16px', transform: 'rotate(-0.6deg)'
        }
      },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
          React.createElement('div', null,
            React.createElement('div', { style: { fontSize: '12px', color: t.textMuted, fontStyle: 'italic' } }, 'Current Streak'),
            React.createElement('div', { style: { fontSize: '32px', fontWeight: '700', color: t.text } }, '🔥 14 days'),
            React.createElement('div', { style: { fontSize: '12px', color: t.textMuted } }, '3 more days to unlock Tidecrawler Egg')
          ),
          React.createElement('div', {
            style: { textAlign: 'center', background: t.card, borderRadius: '12px', padding: '10px 14px', border: `1px solid ${t.cardBorder}` }
          },
            React.createElement('div', { style: { fontSize: '11px', color: t.textMuted } }, 'Today\'s Seeds'),
            React.createElement('div', { style: { fontSize: '22px', fontWeight: '700', color: t.primaryLight } }, '+3'),
            React.createElement('div', { style: { fontSize: '10px', color: t.textMuted } }, 'collected')
          )
        )
      ),

      React.createElement('div', { style: { fontSize: '13px', fontWeight: '600', color: t.textSecondary, marginBottom: '10px' } }, 'Active Quests'),

      quests.map((quest, i) => {
        const done = completedQuests.includes(quest.id);
        const pct = Math.round((quest.progress / quest.goal) * 100);
        return React.createElement('div', {
          key: quest.id,
          style: {
            background: done ? t.primary + '22' : t.card,
            border: `1.5px solid ${done ? t.primary : t.cardBorder}`,
            borderRadius: i % 2 === 0 ? '16px 12px 18px 14px' : '12px 18px 14px 16px',
            padding: '14px', marginBottom: '10px',
            transform: i % 2 === 0 ? 'rotate(0.3deg)' : 'rotate(-0.3deg)',
            transition: 'all 0.3s'
          }
        },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' } },
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' } },
                React.createElement('span', { style: { fontSize: '14px', fontWeight: '700', color: done ? t.primaryLight : t.text } }, quest.title),
                done && React.createElement('span', { style: { fontSize: '12px' } }, '✅')
              ),
              React.createElement('div', { style: { fontSize: '12px', color: t.textMuted, fontStyle: 'italic' } }, quest.desc)
            ),
            React.createElement('div', {
              style: { background: t.tag, borderRadius: '8px', padding: '4px 8px', textAlign: 'center', flexShrink: 0, marginLeft: '8px' }
            },
              React.createElement('div', { style: { fontSize: '10px', color: t.textMuted } }, 'XP'),
              React.createElement('div', { style: { fontSize: '14px', fontWeight: '700', color: t.primaryLight } }, `+${quest.xp}`)
            )
          ),
          !done && React.createElement('div', { style: { marginBottom: '8px' } },
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: '4px' } },
              React.createElement('span', { style: { fontSize: '11px', color: t.textMuted } }, `${quest.progress} / ${quest.goal}`),
              React.createElement('span', { style: { fontSize: '11px', color: t.textMuted } }, `⏰ ${quest.timeLeft}`)
            ),
            React.createElement(StatBar, { value: quest.progress, max: quest.goal, color: t.primaryLight, t })
          ),
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '6px' } },
              React.createElement('span', { style: { fontSize: '16px' } }, quest.reward.split(' ')[0]),
              React.createElement('span', { style: { fontSize: '11px', color: t.textMuted } }, quest.reward.slice(2))
            ),
            !done && React.createElement('button', {
              onClick: () => handlePress(`q-${quest.id}`, () => setCompletedQuests(prev => [...prev, quest.id])),
              style: {
                background: pct >= 100 ? t.primary : t.surface2,
                color: pct >= 100 ? t.linen : t.textMuted,
                border: `1px solid ${pct >= 100 ? t.primary : t.cardBorder}`,
                borderRadius: '10px', padding: '6px 12px', fontSize: '11px',
                cursor: pct >= 100 ? 'pointer' : 'default',
                fontFamily: "'Lora', serif", fontWeight: '600',
                transform: pressedBtn === `q-${quest.id}` ? 'scale(0.94)' : 'scale(1)',
                transition: 'transform 0.15s'
              }
            }, pct >= 100 ? 'Claim!' : `${pct}%`)
          )
        );
      }),

      // Upcoming seed unlock
      React.createElement('div', {
        style: {
          background: t.surface2, border: `1px dashed ${t.cardBorder}`,
          borderRadius: '14px', padding: '14px', marginTop: '6px', textAlign: 'center'
        }
      },
        React.createElement('div', { style: { fontSize: '24px', marginBottom: '6px', animation: 'pulse-glow 2s ease-in-out infinite', display: 'block' } }, '🥚'),
        React.createElement('div', { style: { fontSize: '13px', fontWeight: '600', color: t.text } }, 'Tidecrawler Egg'),
        React.createElement('div', { style: { fontSize: '11px', color: t.textMuted, fontStyle: 'italic' } }, '3 more streak days to unlock • Rare Ocean species')
      )
    ),

    React.createElement(NavBar, { t, activeScreen, setActiveScreen, handlePress })
  );
}

function EcoDashScreen({ t, isDark, setIsDark, activeScreen, setActiveScreen, handlePress, pressedBtn }) {
  const globalSteps = useAnimatedValue(2847392, 1200);
  const [selectedStat, setSelectedStat] = useState(0);

  const globalStats = [
    { label: 'Total Steps', value: globalSteps.toLocaleString(), icon: '👣', delta: '+2.3%', color: t.primaryLight },
    { label: 'Carbon Offset', value: '47.2 tons', icon: '🌿', delta: '+8.1%', color: '#27ae60' },
    { label: 'Virtual Trees', value: '12,847', icon: '🌲', delta: '+156 today', color: t.primary },
    { label: 'Water Purified', value: '8.4M L', icon: '💧', delta: '+320K today', color: '#2980b9' },
  ];

  const communityBiomes = [
    { name: 'Amazon Restoration', pct: 68, color: '#27ae60', users: '43.2K', icon: '🌳' },
    { name: 'Pacific Ocean Grove', pct: 41, color: '#2980b9', users: '28.7K', icon: '🌊' },
    { name: 'Alpine Meadow Shield', pct: 22, color: '#d4a017', users: '15.1K', icon: '⛰️' },
    { name: 'Coral Reef Garden', pct: 13, color: '#e74c3c', users: '9.8K', icon: '🐠' },
  ];

  return React.createElement('div', { style: { flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' } },
    React.createElement('div', {
      style: { padding: '20px 22px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }
    },
      React.createElement('div', null,
        React.createElement('div', { style: { fontSize: '11px', color: t.textMuted, letterSpacing: '1.5px', textTransform: 'uppercase', fontStyle: 'italic' } }, 'Collective Impact'),
        React.createElement('div', { style: { fontSize: '24px', fontWeight: '700', color: t.text } }, 'Eco Dashboard')
      ),
      React.createElement('button', {
        onClick: () => handlePress('theme', () => setIsDark(!isDark)),
        style: { background: t.surface2, border: `1.5px solid ${t.cardBorder}`, borderRadius: '50%', width: '36px', height: '36px', cursor: 'pointer', fontSize: '16px' }
      }, isDark ? '☀️' : '🌙')
    ),

    React.createElement('div', { style: { flex: 1, overflowY: 'auto', padding: '14px 22px 16px' } },

      // Global impact hero — angled
      React.createElement('div', {
        style: {
          background: `linear-gradient(135deg, ${t.primary}33, #27ae6022)`,
          border: `2px solid ${t.primary}44`,
          borderRadius: '20px 16px 20px 14px', padding: '18px',
          marginBottom: '14px', transform: 'rotate(-0.5deg)'
        }
      },
        React.createElement('div', { style: { fontSize: '12px', color: t.textMuted, fontStyle: 'italic', marginBottom: '4px' } }, 'Digital Rewilding Progress'),
        React.createElement('div', { style: { fontSize: '28px', fontWeight: '700', color: t.primaryLight, marginBottom: '6px' } }, '🌍 Planet Bloom'),
        React.createElement('div', { style: { marginBottom: '8px' } },
          React.createElement(StatBar, { value: 54, max: 100, color: t.primaryLight, t })
        ),
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between' } },
          React.createElement('span', { style: { fontSize: '12px', color: t.textMuted } }, '54% to full bloom'),
          React.createElement('span', { style: { fontSize: '12px', color: t.primaryLight, fontWeight: '600' } }, '283K active users')
        )
      ),

      // Stats grid
      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '16px' } },
        globalStats.map((stat, i) =>
          React.createElement('button', {
            key: stat.label,
            onClick: () => setSelectedStat(i),
            style: {
              background: selectedStat === i ? stat.color + '22' : t.card,
              border: `1.5px solid ${selectedStat === i ? stat.color : t.cardBorder}`,
              borderRadius: i % 2 === 0 ? '14px 12px 16px 12px' : '12px 16px 12px 14px',
              padding: '12px', cursor: 'pointer', textAlign: 'left',
              transition: 'all 0.2s'
            }
          },
            React.createElement('div', { style: { fontSize: '22px', marginBottom: '4px' } }, stat.icon),
            React.createElement('div', { style: { fontSize: '15px', fontWeight: '700', color: stat.color } }, stat.value),
            React.createElement('div', { style: { fontSize: '10px', color: t.textMuted } }, stat.label),
            React.createElement('div', { style: { fontSize: '10px', color: '#27ae60', fontWeight: '600', marginTop: '2px' } }, stat.delta)
          )
        )
      ),

      // Community biomes
      React.createElement('div', { style: { fontSize: '13px', fontWeight: '600', color: t.textSecondary, marginBottom: '10px' } }, 'Community Biome Restoration'),
      communityBiomes.map((biome, i) =>
        React.createElement('div', {
          key: biome.name,
          style: {
            background: t.card, border: `1.5px solid ${t.cardBorder}`,
            borderRadius: i % 2 === 0 ? '14px 10px 16px 10px' : '10px 16px 10px 14px',
            padding: '12px 14px', marginBottom: '8px',
            transform: i % 2 === 0 ? 'rotate(0.3deg)' : 'rotate(-0.3deg)'
          }
        },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' } },
            React.createElement('div', { style: { display: 'flex', gap: '8px', alignItems: 'center' } },
              React.createElement('span', { style: { fontSize: '18px' } }, biome.icon),
              React.createElement('span', { style: { fontWeight: '600', fontSize: '13px', color: t.text } }, biome.name)
            ),
            React.createElement('span', { style: { fontSize: '11px', color: t.textMuted } }, `${biome.users} users`)
          ),
          React.createElement(StatBar, { value: biome.pct, max: 100, color: biome.color, t }),
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginTop: '4px' } },
            React.createElement('span', { style: { fontSize: '10px', color: t.textMuted } }, `${biome.pct}% restored`),
            biome.pct < 50 && React.createElement('span', { style: { fontSize: '10px', color: t.textMuted, fontStyle: 'italic' } }, `${100 - biome.pct}% to unlock rewards`)
          )
        )
      ),

      // My contribution
      React.createElement('div', {
        style: {
          background: `${t.primary}22`, border: `2px solid ${t.primary}44`,
          borderRadius: '16px', padding: '14px', marginTop: '8px',
          transform: 'rotate(-0.4deg)'
        }
      },
        React.createElement('div', { style: { fontSize: '13px', fontWeight: '700', color: t.text, marginBottom: '8px' } }, '🌱 My Contribution'),
        React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' } },
          [['Steps', '6,842', '👣'], ['XP Given', '320', '⚡'], ['Rank', '#1,204', '🏆']].map(([label, val, icon]) =>
            React.createElement('div', { key: label, style: { textAlign: 'center' } },
              React.createElement('div', { style: { fontSize: '16px' } }, icon),
              React.createElement('div', { style: { fontSize: '14px', fontWeight: '700', color: t.primaryLight } }, val),
              React.createElement('div', { style: { fontSize: '10px', color: t.textMuted } }, label)
            )
          )
        )
      )
    ),

    React.createElement(NavBar, { t, activeScreen, setActiveScreen, handlePress })
  );
}
