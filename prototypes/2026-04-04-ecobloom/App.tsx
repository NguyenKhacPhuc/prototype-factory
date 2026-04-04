const { useState, useEffect, useRef } = React;

const themes = {
  light: {
    bg: '#F5F0E8',
    surface: '#EDE8DC',
    card: '#FFFBF0',
    primary: '#2D5016',
    primaryLight: '#4A7C2F',
    primaryLighter: '#6B9E50',
    copper: '#B87333',
    copperLight: '#C9964B',
    marigold: '#F5A623',
    text: '#1A2E0A',
    textSecondary: '#4A6030',
    textMuted: '#7A8E65',
    border: '#C5BBA8',
    navBg: '#EDE8DC',
    navBorder: '#C5BBA8',
    gardenBg: '#C8DFB0',
    gardenSky: 'linear-gradient(180deg, #B8D4F8 0%, #C8DFB0 100%)',
    gardenGround: '#8B6914',
  },
  dark: {
    bg: '#0F1A08',
    surface: '#1A2E0F',
    card: '#243818',
    primary: '#6B9E50',
    primaryLight: '#4A7C2F',
    primaryLighter: '#2D5016',
    copper: '#C9964B',
    copperLight: '#D4A85C',
    marigold: '#F5A623',
    text: '#E8F0DA',
    textSecondary: '#B0C490',
    textMuted: '#7A9060',
    border: '#2D4A1F',
    navBg: '#1A2E0F',
    navBorder: '#2D4A1F',
    gardenBg: '#1A3010',
    gardenSky: 'linear-gradient(180deg, #0A1A05 0%, #1A3010 100%)',
    gardenGround: '#243818',
  }
};

const ecoItems = [
  { id: 1, emoji: '🌻', name: 'Solar Sunflower', x: 12, y: 22, size: 46 },
  { id: 2, emoji: '🍄', name: 'Forest Mycelium', x: 64, y: 38, size: 34 },
  { id: 3, emoji: '🦋', name: 'Morpho Butterfly', x: 44, y: 12, size: 30 },
  { id: 4, emoji: '🌿', name: 'Herb Cluster', x: 78, y: 58, size: 38 },
  { id: 5, emoji: '🌸', name: 'Cherry Blossom', x: 24, y: 54, size: 42 },
  { id: 6, emoji: '🦔', name: 'Forest Hedgehog', x: 54, y: 68, size: 34 },
  { id: 7, emoji: '🌱', name: 'Mystery Sprout', x: 8, y: 72, size: 26 },
  { id: 8, emoji: '🍀', name: 'Lucky Clover', x: 68, y: 18, size: 28 },
];

const actionCategories = [
  {
    id: 'transport', icon: '🚌', label: 'Transport', color: '#4A7C2F',
    actions: [
      { id: 't1', name: 'Took public transit', points: 15, seed: '🌿' },
      { id: 't2', name: 'Cycled instead of drove', points: 20, seed: '🌱' },
      { id: 't3', name: 'Walked for errands', points: 10, seed: '🍀' },
    ]
  },
  {
    id: 'waste', icon: '♻️', label: 'Waste', color: '#B87333',
    actions: [
      { id: 'w1', name: 'Used reusable cup', points: 10, seed: '🌸' },
      { id: 'w2', name: 'Fixed broken item', points: 25, seed: '🌻' },
      { id: 'w3', name: 'Composted food waste', points: 15, seed: '🍄' },
    ]
  },
  {
    id: 'food', icon: '🥦', label: 'Food', color: '#2D5016',
    actions: [
      { id: 'f1', name: 'Ate plant-based meal', points: 15, seed: '🌺' },
      { id: 'f2', name: 'Bought local produce', points: 12, seed: '🌿' },
    ]
  },
  {
    id: 'energy', icon: '⚡', label: 'Energy', color: '#F5A623',
    actions: [
      { id: 'e1', name: 'Turned off lights', points: 8, seed: '✨' },
      { id: 'e2', name: 'Hung laundry to dry', points: 12, seed: '🌬️' },
    ]
  },
];

const codexEntries = [
  { id: 1, emoji: '🌻', name: 'Solar Sunflower', unlocked: true, rarity: 'Common', category: 'Flora', fact: 'Sunflowers absorb radiation and heavy metals from soil, used in real bioremediation projects near Chernobyl.' },
  { id: 2, emoji: '🦋', name: 'Morpho Butterfly', unlocked: true, rarity: 'Rare', category: 'Fauna', fact: 'Butterflies are crucial pollinators. Their presence is a reliable indicator of a healthy, balanced ecosystem.' },
  { id: 3, emoji: '🍄', name: 'Forest Mycelium', unlocked: true, rarity: 'Common', category: 'Fungi', fact: 'Mycelium networks connect trees underground, sharing nutrients and chemical signals across entire forests.' },
  { id: 4, emoji: '🌸', name: 'Cherry Blossom', unlocked: true, rarity: 'Uncommon', category: 'Flora', fact: 'A single cherry tree provides habitat for over 100 species of insects and the birds that feed on them.' },
  { id: 5, emoji: '🦔', name: 'Forest Hedgehog', unlocked: true, rarity: 'Uncommon', category: 'Fauna', fact: 'Hedgehogs consume garden pests naturally, reducing the need for harmful pesticides by up to 40%.' },
  { id: 6, emoji: '?', name: '???', unlocked: false, rarity: 'Rare', category: 'Fauna', fact: '' },
  { id: 7, emoji: '?', name: '???', unlocked: false, rarity: 'Legendary', category: 'Flora', fact: '' },
  { id: 8, emoji: '?', name: '???', unlocked: false, rarity: 'Common', category: 'Fungi', fact: '' },
];

const guildData = {
  name: 'Forest Guardians',
  rank: 3,
  members: 12,
  biodiversityScore: 847,
  challenge: {
    name: 'Zero-Waste Week',
    description: 'Collectively log 100 zero-waste actions this week to unlock a rare Guild reward.',
    progress: 67,
    target: 100,
    daysLeft: 3,
    reward: '🌲 Ancient Oak Tree',
  },
  leaderboard: [
    { rank: 1, name: 'Terra Collective', score: 1240, isYou: false },
    { rank: 2, name: 'Green Phoenix', score: 1180, isYou: false },
    { rank: 3, name: 'Forest Guardians', score: 847, isYou: true },
    { rank: 4, name: 'Ocean Keepers', score: 720, isYou: false },
    { rank: 5, name: 'Sky Watchers', score: 650, isYou: false },
  ]
};

function HomeScreen({ theme, isDark }) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [animatingItem, setAnimatingItem] = useState(null);

  const handleItemClick = (item) => {
    setAnimatingItem(item.id);
    setSelectedItem(prev => prev && prev.id === item.id ? null : item);
    setTimeout(() => setAnimatingItem(null), 300);
  };

  return React.createElement('div', {
    style: { height: '100%', display: 'flex', flexDirection: 'column', background: theme.bg, overflow: 'hidden' }
  },
    // Header — asymmetric layout
    React.createElement('div', {
      style: { padding: '12px 20px 8px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }
    },
      React.createElement('div', null,
        React.createElement('div', {
          style: { fontSize: '11px', color: theme.textMuted, fontFamily: 'Rubik, sans-serif', letterSpacing: '0.8px', textTransform: 'uppercase' }
        }, 'Saturday · April 4'),
        React.createElement('h1', {
          style: { fontSize: '24px', fontWeight: '700', color: theme.primary, fontFamily: 'Rubik, sans-serif', margin: '2px 0 0', lineHeight: 1.1 }
        }, 'Your Eco-Haven'),
        React.createElement('p', {
          style: { fontSize: '12px', color: theme.textSecondary, fontFamily: 'Rubik, sans-serif', margin: '3px 0 0' }
        }, '8 life forms · 3 seeds growing 🌱'),
      ),
      React.createElement('div', {
        style: { background: theme.marigold, borderRadius: '14px 6px 14px 6px', padding: '7px 12px', display: 'flex', alignItems: 'center', gap: '4px' }
      },
        React.createElement('span', { style: { fontSize: '14px' } }, '💎'),
        React.createElement('span', { style: { fontSize: '15px', fontWeight: '700', color: '#1A2E0A', fontFamily: 'Rubik, sans-serif' } }, '240'),
      ),
    ),

    // Garden canvas
    React.createElement('div', {
      style: {
        position: 'relative', margin: '4px 16px 8px', background: theme.gardenBg,
        borderRadius: '22px 8px 22px 8px', overflow: 'hidden', height: '220px',
        border: `2px solid ${isDark ? '#2D4A1F' : '#A8C890'}`,
      }
    },
      React.createElement('div', {
        style: { position: 'absolute', top: 0, left: 0, right: 0, height: '55%', background: theme.gardenSky, borderRadius: '20px 6px 0 0' }
      }),
      React.createElement('div', {
        style: { position: 'absolute', bottom: 0, left: 0, right: 0, height: '35%', background: theme.gardenGround, opacity: 0.25, borderRadius: '0 0 20px 6px' }
      }),
      ...ecoItems.map(item =>
        React.createElement('div', {
          key: item.id,
          onClick: () => handleItemClick(item),
          style: {
            position: 'absolute', left: `${item.x}%`, top: `${item.y}%`,
            fontSize: `${item.size}px`, cursor: 'pointer', zIndex: 2,
            transition: 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
            transform: animatingItem === item.id ? 'scale(1.4) rotate(-5deg)' : selectedItem && selectedItem.id === item.id ? 'scale(1.15)' : 'scale(1)',
            filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.25))',
          }
        }, item.emoji)
      ),
      selectedItem && React.createElement('div', {
        style: {
          position: 'absolute', bottom: '10px', left: '10px', right: '10px',
          background: isDark ? 'rgba(26,46,15,0.96)' : 'rgba(255,251,240,0.96)',
          borderRadius: '14px', padding: '10px 12px', display: 'flex', alignItems: 'center',
          gap: '10px', zIndex: 10, border: `1px solid ${theme.border}`,
        }
      },
        React.createElement('span', { style: { fontSize: '28px' } }, selectedItem.emoji),
        React.createElement('div', null,
          React.createElement('div', { style: { fontSize: '13px', fontWeight: '600', color: theme.text, fontFamily: 'Rubik, sans-serif' } }, selectedItem.name),
          React.createElement('div', { style: { fontSize: '10px', color: theme.textMuted, fontFamily: 'Rubik, sans-serif' } }, 'Tap Codex to learn more'),
        ),
        React.createElement('div', {
          onClick: (e) => { e.stopPropagation(); setSelectedItem(null); },
          style: { marginLeft: 'auto', color: theme.textMuted, fontSize: '20px', cursor: 'pointer', lineHeight: 1, fontFamily: 'Rubik, sans-serif' }
        }, '×'),
      ),
    ),

    // Asymmetric stats row — key layout twist
    React.createElement('div', {
      style: { display: 'grid', gridTemplateColumns: '1.4fr 0.9fr 0.9fr', gap: '8px', padding: '0 16px 8px' }
    },
      React.createElement('div', {
        style: { background: theme.primary, borderRadius: '18px 8px 18px 8px', padding: '14px' }
      },
        React.createElement('div', { style: { fontSize: '22px' } }, '🔥'),
        React.createElement('div', { style: { fontSize: '24px', fontWeight: '700', color: '#FFFBF0', fontFamily: 'Rubik, sans-serif', lineHeight: 1, marginTop: '2px' } }, '14'),
        React.createElement('div', { style: { fontSize: '10px', color: 'rgba(255,251,240,0.65)', fontFamily: 'Rubik, sans-serif', marginTop: '3px' } }, 'Day Streak'),
      ),
      React.createElement('div', {
        style: { background: theme.surface, borderRadius: '8px 18px 8px 18px', padding: '14px', border: `1px solid ${theme.border}` }
      },
        React.createElement('div', { style: { fontSize: '22px' } }, '🌱'),
        React.createElement('div', { style: { fontSize: '24px', fontWeight: '700', color: theme.text, fontFamily: 'Rubik, sans-serif', lineHeight: 1, marginTop: '2px' } }, '47'),
        React.createElement('div', { style: { fontSize: '10px', color: theme.textMuted, fontFamily: 'Rubik, sans-serif', marginTop: '3px' } }, 'Seeds'),
      ),
      React.createElement('div', {
        style: { background: theme.copper, borderRadius: '8px 18px 8px 18px', padding: '14px' }
      },
        React.createElement('div', { style: { fontSize: '22px' } }, '🦋'),
        React.createElement('div', { style: { fontSize: '24px', fontWeight: '700', color: '#FFFBF0', fontFamily: 'Rubik, sans-serif', lineHeight: 1, marginTop: '2px' } }, '3'),
        React.createElement('div', { style: { fontSize: '10px', color: 'rgba(255,251,240,0.65)', fontFamily: 'Rubik, sans-serif', marginTop: '3px' } }, 'Rare'),
      ),
    ),

    // Growing seeds
    React.createElement('div', { style: { padding: '0 16px 8px' } },
      React.createElement('div', {
        style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }
      },
        React.createElement('span', { style: { fontSize: '14px', fontWeight: '600', color: theme.text, fontFamily: 'Rubik, sans-serif' } }, 'Growing Now'),
        React.createElement('span', { style: { fontSize: '12px', color: theme.copper, fontFamily: 'Rubik, sans-serif', fontWeight: '500' } }, 'See all →'),
      ),
      React.createElement('div', { style: { display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' } },
        [
          { label: 'Mystery Seed', progress: 75, daysLeft: 1 },
          { label: 'Mystery Seed', progress: 30, daysLeft: 4 },
          { label: 'Mystery Seed', progress: 10, daysLeft: 7 },
        ].map((seed, i) =>
          React.createElement('div', {
            key: i,
            style: {
              minWidth: '96px', background: theme.card, borderRadius: '14px 6px 14px 6px',
              padding: '10px', border: `1px solid ${theme.border}`, flexShrink: 0,
            }
          },
            React.createElement('div', { style: { fontSize: '26px', textAlign: 'center' } }, '❓'),
            React.createElement('div', {
              style: { height: '5px', background: theme.border, borderRadius: '3px', margin: '6px 0 4px' }
            },
              React.createElement('div', {
                style: { height: '100%', width: `${seed.progress}%`, background: theme.primaryLight, borderRadius: '3px' }
              }),
            ),
            React.createElement('div', {
              style: { fontSize: '9px', color: theme.textMuted, fontFamily: 'Rubik, sans-serif', textAlign: 'center' }
            }, `${seed.daysLeft}d left`),
          )
        ),
      ),
    ),
  );
}

function LedgerScreen({ theme }) {
  const [selectedCategory, setSelectedCategory] = useState('transport');
  const [loggedActions, setLoggedActions] = useState([
    { id: 1, name: 'Took public transit', time: '9:30 AM', points: 15, seed: '🌿' },
    { id: 2, name: 'Used reusable cup', time: 'Yesterday', points: 10, seed: '🌸' },
    { id: 3, name: 'Cycled to work', time: 'Yesterday', points: 20, seed: '🌱' },
  ]);
  const [planting, setPlanting] = useState(null);
  const [justPlanted, setJustPlanted] = useState(null);

  const selectedCat = actionCategories.find(c => c.id === selectedCategory);

  const handlePlantSeed = (action) => {
    setPlanting(action.id);
    setTimeout(() => {
      setPlanting(null);
      setJustPlanted(action.id);
      setLoggedActions(prev => [{ id: Date.now(), name: action.name, time: 'Just now', points: action.points, seed: action.seed }, ...prev]);
      setTimeout(() => setJustPlanted(null), 2000);
    }, 700);
  };

  return React.createElement('div', {
    style: { height: '100%', display: 'flex', flexDirection: 'column', background: theme.bg, overflow: 'hidden' }
  },
    React.createElement('div', {
      style: { padding: '14px 20px 10px', borderBottom: `1px solid ${theme.border}` }
    },
      React.createElement('h1', {
        style: { fontSize: '24px', fontWeight: '700', color: theme.primary, fontFamily: 'Rubik, sans-serif', margin: '0 0 2px' }
      }, 'Seed Ledger'),
      React.createElement('p', {
        style: { fontSize: '12px', color: theme.textMuted, fontFamily: 'Rubik, sans-serif', margin: 0 }
      }, 'Log actions · plant seeds · grow your haven'),
    ),

    // Category chips
    React.createElement('div', { style: { display: 'flex', gap: '6px', padding: '10px 16px', overflowX: 'auto' } },
      actionCategories.map(cat =>
        React.createElement('button', {
          key: cat.id,
          onClick: () => setSelectedCategory(cat.id),
          style: {
            display: 'flex', alignItems: 'center', gap: '4px', padding: '6px 12px',
            borderRadius: '20px', border: 'none', cursor: 'pointer',
            fontFamily: 'Rubik, sans-serif', fontSize: '12px', fontWeight: '500', flexShrink: 0,
            transition: 'all 0.15s ease',
            background: selectedCategory === cat.id ? theme.primary : theme.surface,
            color: selectedCategory === cat.id ? '#FFFBF0' : theme.text,
          }
        },
          React.createElement('span', null, cat.icon),
          React.createElement('span', null, cat.label),
        )
      ),
    ),

    React.createElement('div', { style: { flex: 1, overflowY: 'auto', padding: '0 16px 16px' } },
      // Actions to log
      React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' } },
        selectedCat && selectedCat.actions.map(action =>
          React.createElement('div', {
            key: action.id,
            style: {
              display: 'flex', alignItems: 'center', gap: '12px', background: theme.card,
              borderRadius: '16px 6px 16px 6px', padding: '12px 14px', border: `1px solid ${theme.border}`,
            }
          },
            React.createElement('span', { style: { fontSize: '30px' } }, action.seed),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', { style: { fontSize: '14px', fontWeight: '500', color: theme.text, fontFamily: 'Rubik, sans-serif' } }, action.name),
              React.createElement('div', { style: { fontSize: '11px', color: theme.textMuted, fontFamily: 'Rubik, sans-serif' } }, `+${action.points} pts · Mystery seed`),
            ),
            React.createElement('button', {
              onClick: () => handlePlantSeed(action),
              style: {
                background: justPlanted === action.id ? theme.marigold : planting === action.id ? theme.primaryLighter : theme.primary,
                color: '#FFFBF0', border: 'none', borderRadius: '10px', padding: '8px 12px',
                fontSize: '12px', fontWeight: '600', fontFamily: 'Rubik, sans-serif', cursor: 'pointer',
                transition: 'all 0.2s ease', transform: planting === action.id ? 'scale(0.94)' : 'scale(1)',
                minWidth: '82px',
              }
            }, planting === action.id ? '🌱 ...' : justPlanted === action.id ? '✨ Done!' : 'Plant'),
          )
        ),
      ),

      // Recent activity
      React.createElement('div', null,
        React.createElement('div', {
          style: { fontSize: '12px', fontWeight: '600', color: theme.textMuted, fontFamily: 'Rubik, sans-serif', letterSpacing: '0.8px', textTransform: 'uppercase', marginBottom: '10px' }
        }, 'Recent Activity'),
        loggedActions.slice(0, 6).map((log, i) =>
          React.createElement('div', {
            key: log.id,
            style: {
              display: 'flex', alignItems: 'center', gap: '10px', padding: '9px 0',
              borderBottom: i < 5 ? `1px solid ${theme.border}` : 'none',
            }
          },
            React.createElement('span', { style: { fontSize: '22px' } }, log.seed),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', { style: { fontSize: '13px', color: theme.text, fontFamily: 'Rubik, sans-serif' } }, log.name),
              React.createElement('div', { style: { fontSize: '11px', color: theme.textMuted, fontFamily: 'Rubik, sans-serif' } }, log.time),
            ),
            React.createElement('span', {
              style: { fontSize: '12px', color: theme.primaryLight, fontFamily: 'Rubik, sans-serif', fontWeight: '600' }
            }, `+${log.points}`),
          )
        ),
      ),
    ),
  );
}

function GuildsScreen({ theme }) {
  const [activeView, setActiveView] = useState('challenge');

  const rankMedals = ['🥇', '🥈', '🥉'];

  return React.createElement('div', {
    style: { height: '100%', display: 'flex', flexDirection: 'column', background: theme.bg, overflow: 'hidden' }
  },
    React.createElement('div', { style: { padding: '14px 20px 0' } },
      React.createElement('h1', {
        style: { fontSize: '24px', fontWeight: '700', color: theme.primary, fontFamily: 'Rubik, sans-serif', margin: '0 0 10px' }
      }, 'Eco-Guilds'),
      // Guild banner
      React.createElement('div', {
        style: {
          background: theme.primary, borderRadius: '20px 6px 20px 6px',
          padding: '14px 16px', display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px',
        }
      },
        React.createElement('div', {
          style: {
            background: 'rgba(255,251,240,0.15)', borderRadius: '14px', width: '50px', height: '50px',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', flexShrink: 0,
          }
        }, '🌲'),
        React.createElement('div', { style: { flex: 1 } },
          React.createElement('div', { style: { fontSize: '16px', fontWeight: '700', color: '#FFFBF0', fontFamily: 'Rubik, sans-serif' } }, guildData.name),
          React.createElement('div', { style: { fontSize: '12px', color: 'rgba(255,251,240,0.65)', fontFamily: 'Rubik, sans-serif', marginTop: '1px' } }, `${guildData.members} members · Rank #${guildData.rank}`),
        ),
        React.createElement('div', { style: { textAlign: 'right' } },
          React.createElement('div', { style: { fontSize: '22px', fontWeight: '700', color: theme.marigold, fontFamily: 'Rubik, sans-serif', lineHeight: 1 } }, guildData.biodiversityScore),
          React.createElement('div', { style: { fontSize: '9px', color: 'rgba(255,251,240,0.5)', fontFamily: 'Rubik, sans-serif', letterSpacing: '0.5px' } }, 'BIODIVERSITY'),
        ),
      ),

      // Toggle
      React.createElement('div', {
        style: { display: 'flex', background: theme.surface, borderRadius: '12px', padding: '3px', gap: '2px' }
      },
        ['challenge', 'leaderboard'].map(v =>
          React.createElement('button', {
            key: v,
            onClick: () => setActiveView(v),
            style: {
              flex: 1, padding: '8px', borderRadius: '10px', border: 'none', cursor: 'pointer',
              fontFamily: 'Rubik, sans-serif', fontSize: '13px', fontWeight: '500',
              background: activeView === v ? theme.primary : 'transparent',
              color: activeView === v ? '#FFFBF0' : theme.textMuted,
              transition: 'all 0.2s ease', textTransform: 'capitalize',
            }
          }, v)
        ),
      ),
    ),

    React.createElement('div', { style: { flex: 1, overflowY: 'auto', padding: '14px 20px' } },
      activeView === 'challenge'
        ? React.createElement('div', null,
            React.createElement('div', {
              style: {
                background: theme.card, borderRadius: '20px 6px 20px 6px', padding: '18px',
                border: `2px solid ${theme.copper}`, marginBottom: '12px',
              }
            },
              React.createElement('div', {
                style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }
              },
                React.createElement('div', null,
                  React.createElement('div', {
                    style: { fontSize: '10px', color: theme.copper, fontFamily: 'Rubik, sans-serif', fontWeight: '600', letterSpacing: '0.8px', textTransform: 'uppercase' }
                  }, '🏅 Active Challenge'),
                  React.createElement('div', {
                    style: { fontSize: '18px', fontWeight: '700', color: theme.text, fontFamily: 'Rubik, sans-serif', marginTop: '3px' }
                  }, guildData.challenge.name),
                ),
                React.createElement('div', {
                  style: {
                    background: theme.marigold, borderRadius: '8px', padding: '4px 8px',
                    fontSize: '11px', fontWeight: '600', color: '#1A2E0A', fontFamily: 'Rubik, sans-serif', flexShrink: 0,
                  }
                }, `${guildData.challenge.daysLeft}d left`),
              ),
              React.createElement('p', {
                style: { fontSize: '13px', color: theme.textSecondary, fontFamily: 'Rubik, sans-serif', margin: '0 0 14px', lineHeight: 1.5 }
              }, guildData.challenge.description),
              React.createElement('div', {
                style: { background: theme.border, borderRadius: '8px', height: '10px', marginBottom: '6px' }
              },
                React.createElement('div', {
                  style: {
                    height: '100%', width: `${(guildData.challenge.progress / guildData.challenge.target) * 100}%`,
                    background: theme.primaryLight, borderRadius: '8px', transition: 'width 0.6s ease',
                  }
                }),
              ),
              React.createElement('div', {
                style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }
              },
                React.createElement('span', { style: { fontSize: '12px', color: theme.textMuted, fontFamily: 'Rubik, sans-serif' } }, `${guildData.challenge.progress} / ${guildData.challenge.target} actions`),
                React.createElement('span', { style: { fontSize: '12px', color: theme.primaryLight, fontFamily: 'Rubik, sans-serif', fontWeight: '600' } }, `${Math.round((guildData.challenge.progress / guildData.challenge.target) * 100)}%`),
              ),
              React.createElement('div', {
                style: {
                  background: theme.surface, borderRadius: '12px', padding: '10px 14px',
                  display: 'flex', alignItems: 'center', gap: '10px',
                }
              },
                React.createElement('span', { style: { fontSize: '28px' } }, '🌲'),
                React.createElement('div', null,
                  React.createElement('div', { style: { fontSize: '10px', color: theme.textMuted, fontFamily: 'Rubik, sans-serif' } }, 'Guild Reward'),
                  React.createElement('div', { style: { fontSize: '14px', fontWeight: '600', color: theme.text, fontFamily: 'Rubik, sans-serif' } }, 'Ancient Oak Tree'),
                ),
                React.createElement('div', {
                  style: {
                    marginLeft: 'auto', background: theme.primary, color: '#FFFBF0',
                    borderRadius: '10px', padding: '6px 12px', fontSize: '12px',
                    fontWeight: '600', fontFamily: 'Rubik, sans-serif', cursor: 'pointer',
                  }
                }, 'Contribute'),
              ),
            ),
          )
        : React.createElement('div', null,
            React.createElement('div', {
              style: { fontSize: '11px', fontWeight: '600', color: theme.textMuted, fontFamily: 'Rubik, sans-serif', marginBottom: '10px', letterSpacing: '0.8px', textTransform: 'uppercase' }
            }, 'Biodiversity Rankings'),
            guildData.leaderboard.map(entry =>
              React.createElement('div', {
                key: entry.rank,
                style: {
                  display: 'flex', alignItems: 'center', gap: '12px', padding: '11px 14px',
                  borderRadius: entry.isYou ? '16px 6px 16px 6px' : '12px',
                  marginBottom: '6px',
                  background: entry.isYou ? theme.primary : theme.surface,
                  border: `1px solid ${entry.isYou ? theme.primary : theme.border}`,
                }
              },
                React.createElement('div', {
                  style: {
                    width: '30px', height: '30px', borderRadius: '50%',
                    background: entry.rank <= 3 ? theme.marigold : theme.border,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: entry.rank <= 3 ? '16px' : '13px',
                    fontWeight: '700',
                    color: entry.rank <= 3 ? '#1A2E0A' : theme.textMuted,
                    fontFamily: 'Rubik, sans-serif', flexShrink: 0,
                  }
                }, entry.rank <= 3 ? rankMedals[entry.rank - 1] : entry.rank),
                React.createElement('div', { style: { flex: 1 } },
                  React.createElement('div', {
                    style: { fontSize: '14px', fontWeight: '500', color: entry.isYou ? '#FFFBF0' : theme.text, fontFamily: 'Rubik, sans-serif' }
                  }, entry.name + (entry.isYou ? ' · You' : '')),
                ),
                React.createElement('div', {
                  style: { fontSize: '16px', fontWeight: '700', color: entry.isYou ? theme.marigold : theme.primaryLight, fontFamily: 'Rubik, sans-serif' }
                }, entry.score),
              )
            ),
          ),
    ),
  );
}

function CodexScreen({ theme }) {
  const [selectedEntry, setSelectedEntry] = useState(null);
  const rarityColors = { 'Common': theme.textMuted, 'Uncommon': theme.copper, 'Rare': '#7C5CBF', 'Legendary': theme.marigold };

  // Asymmetric grid: vary border-radius and some spans
  const cardShapes = [
    '20px 8px 20px 8px', '8px 20px 8px 20px', '14px',
    '20px 8px 20px 8px', '8px 20px 8px 20px', '14px',
    '20px 8px 20px 8px', '14px',
  ];

  return React.createElement('div', {
    style: { height: '100%', display: 'flex', flexDirection: 'column', background: theme.bg, overflow: 'hidden', position: 'relative' }
  },
    React.createElement('div', { style: { padding: '14px 20px 10px' } },
      React.createElement('h1', {
        style: { fontSize: '24px', fontWeight: '700', color: theme.primary, fontFamily: 'Rubik, sans-serif', margin: '0 0 2px' }
      }, 'Discovery Codex'),
      React.createElement('p', {
        style: { fontSize: '12px', color: theme.textMuted, fontFamily: 'Rubik, sans-serif', margin: 0 }
      }, `${codexEntries.filter(e => e.unlocked).length} of ${codexEntries.length} life forms discovered`),
    ),

    // Category filter row
    React.createElement('div', { style: { display: 'flex', gap: '6px', padding: '0 20px 10px', overflowX: 'auto' } },
      ['All', 'Flora', 'Fauna', 'Fungi'].map(cat =>
        React.createElement('div', {
          key: cat,
          style: {
            padding: '4px 12px', borderRadius: '20px', background: cat === 'All' ? theme.primary : theme.surface,
            color: cat === 'All' ? '#FFFBF0' : theme.textMuted, fontSize: '12px', fontFamily: 'Rubik, sans-serif',
            fontWeight: '500', cursor: 'pointer', flexShrink: 0, border: `1px solid ${theme.border}`,
          }
        }, cat)
      ),
    ),

    // Asymmetric grid
    React.createElement('div', { style: { flex: 1, overflowY: 'auto', padding: '0 16px 16px' } },
      React.createElement('div', {
        style: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }
      },
        codexEntries.map((entry, i) =>
          React.createElement('div', {
            key: entry.id,
            onClick: () => entry.unlocked && setSelectedEntry(entry),
            style: {
              background: entry.unlocked ? theme.card : theme.surface,
              borderRadius: cardShapes[i] || '14px',
              padding: '18px 14px', border: `1px solid ${entry.unlocked ? theme.border : theme.border}`,
              cursor: entry.unlocked ? 'pointer' : 'default', opacity: entry.unlocked ? 1 : 0.55,
              position: 'relative',
            }
          },
            entry.unlocked && React.createElement('div', {
              style: {
                position: 'absolute', top: '8px', right: '8px', background: theme.primaryLighter,
                borderRadius: '6px', padding: '2px 6px', fontSize: '9px', color: '#FFFBF0', fontFamily: 'Rubik, sans-serif',
              }
            }, entry.category),
            React.createElement('div', {
              style: { fontSize: '44px', textAlign: 'center', marginBottom: '8px', filter: entry.unlocked ? 'none' : 'blur(6px)' }
            }, entry.emoji),
            React.createElement('div', {
              style: { fontSize: '13px', fontWeight: '600', color: theme.text, fontFamily: 'Rubik, sans-serif', textAlign: 'center' }
            }, entry.unlocked ? entry.name : '???'),
            React.createElement('div', {
              style: { fontSize: '10px', color: rarityColors[entry.rarity] || theme.textMuted, fontFamily: 'Rubik, sans-serif', textAlign: 'center', fontWeight: '500', marginTop: '3px' }
            }, entry.rarity),
          )
        ),
      ),
    ),

    // Detail sheet
    selectedEntry && React.createElement('div', {
      style: { position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.55)', display: 'flex', alignItems: 'flex-end', zIndex: 100 },
      onClick: () => setSelectedEntry(null),
    },
      React.createElement('div', {
        style: { background: theme.card, borderRadius: '24px 24px 0 0', padding: '24px 20px', width: '100%' },
        onClick: e => e.stopPropagation(),
      },
        React.createElement('div', { style: { textAlign: 'center', fontSize: '64px', marginBottom: '6px' } }, selectedEntry.emoji),
        React.createElement('h2', {
          style: { fontSize: '20px', fontWeight: '700', color: theme.text, fontFamily: 'Rubik, sans-serif', textAlign: 'center', margin: '0 0 4px' }
        }, selectedEntry.name),
        React.createElement('div', {
          style: { textAlign: 'center', fontSize: '12px', color: rarityColors[selectedEntry.rarity], fontFamily: 'Rubik, sans-serif', fontWeight: '600', marginBottom: '16px' }
        }, `${selectedEntry.rarity} ${selectedEntry.category}`),
        React.createElement('div', {
          style: { background: theme.surface, borderRadius: '16px', padding: '14px', marginBottom: '16px', borderLeft: `3px solid ${theme.primaryLight}` }
        },
          React.createElement('div', { style: { fontSize: '10px', color: theme.copper, fontFamily: 'Rubik, sans-serif', fontWeight: '600', letterSpacing: '0.8px', textTransform: 'uppercase', marginBottom: '6px' } }, 'Eco Fact'),
          React.createElement('p', { style: { fontSize: '13px', color: theme.textSecondary, fontFamily: 'Rubik, sans-serif', margin: 0, lineHeight: 1.6 } }, selectedEntry.fact),
        ),
        React.createElement('button', {
          onClick: () => setSelectedEntry(null),
          style: {
            width: '100%', padding: '13px', background: theme.primary, color: '#FFFBF0',
            border: 'none', borderRadius: '14px', fontSize: '15px', fontWeight: '600',
            fontFamily: 'Rubik, sans-serif', cursor: 'pointer',
          }
        }, 'Close'),
      ),
    ),
  );
}

function ProfileScreen({ theme, isDark, toggleTheme }) {
  const achievements = [
    { emoji: '🌱', name: 'First Seed', unlocked: true },
    { emoji: '🔥', name: 'Week Streak', unlocked: true },
    { emoji: '♻️', name: 'Zero Waster', unlocked: true },
    { emoji: '🦋', name: 'Rare Find', unlocked: true },
    { emoji: '🏆', name: 'Guild Champ', unlocked: false },
    { emoji: '🌍', name: 'World Saver', unlocked: false },
  ];

  const marketplaceItems = [
    { emoji: '🌈', name: 'Rainbow Path', cost: 50 },
    { emoji: '💎', name: 'Crystal Pool', cost: 120 },
    { emoji: '🌟', name: 'Star Seed', cost: 80 },
  ];

  return React.createElement('div', {
    style: { height: '100%', display: 'flex', flexDirection: 'column', background: theme.bg, overflow: 'hidden' }
  },
    React.createElement('div', { style: { flex: 1, overflowY: 'auto' } },
      // Profile header
      React.createElement('div', {
        style: { background: theme.primary, borderRadius: '0 0 28px 28px', padding: '16px 20px 20px' }
      },
        React.createElement('div', {
          style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }
        },
          React.createElement('div', null,
            React.createElement('h1', {
              style: { fontSize: '22px', fontWeight: '700', color: '#FFFBF0', fontFamily: 'Rubik, sans-serif', margin: '0 0 2px' }
            }, 'Alex Green'),
            React.createElement('div', {
              style: { fontSize: '13px', color: 'rgba(255,251,240,0.65)', fontFamily: 'Rubik, sans-serif' }
            }, 'Eco Guardian · Level 7'),
          ),
          React.createElement('div', {
            style: {
              width: '54px', height: '54px', borderRadius: '50%',
              background: 'rgba(255,251,240,0.15)', border: '2px solid rgba(255,251,240,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '30px',
            }
          }, '🧑‍🌾'),
        ),
        React.createElement('div', {
          style: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }
        },
          [
            { label: 'Actions', value: '147', emoji: '✅' },
            { label: 'Eco-Gems', value: '240', emoji: '💎' },
            { label: 'CO₂ Saved', value: '28kg', emoji: '🌍' },
          ].map((s, i) =>
            React.createElement('div', {
              key: i,
              style: { background: 'rgba(255,251,240,0.12)', borderRadius: '12px', padding: '10px', textAlign: 'center' }
            },
              React.createElement('div', { style: { fontSize: '18px' } }, s.emoji),
              React.createElement('div', { style: { fontSize: '18px', fontWeight: '700', color: '#FFFBF0', fontFamily: 'Rubik, sans-serif', lineHeight: 1.1 } }, s.value),
              React.createElement('div', { style: { fontSize: '9px', color: 'rgba(255,251,240,0.55)', fontFamily: 'Rubik, sans-serif', marginTop: '2px' } }, s.label),
            )
          ),
        ),
      ),

      // Achievements
      React.createElement('div', { style: { padding: '16px 20px 0' } },
        React.createElement('div', { style: { fontSize: '16px', fontWeight: '700', color: theme.text, fontFamily: 'Rubik, sans-serif', marginBottom: '10px' } }, 'Achievements'),
        React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' } },
          achievements.map((ach, i) =>
            React.createElement('div', {
              key: i,
              style: {
                background: ach.unlocked ? theme.card : theme.surface,
                borderRadius: i % 2 === 0 ? '14px 6px 14px 6px' : '6px 14px 6px 14px',
                padding: '12px 8px', textAlign: 'center',
                opacity: ach.unlocked ? 1 : 0.45,
                border: `1px solid ${ach.unlocked ? theme.copper : theme.border}`,
              }
            },
              React.createElement('div', { style: { fontSize: '28px', filter: ach.unlocked ? 'none' : 'grayscale(1)' } }, ach.emoji),
              React.createElement('div', { style: { fontSize: '10px', fontWeight: '600', color: theme.text, fontFamily: 'Rubik, sans-serif', marginTop: '5px' } }, ach.name),
            )
          ),
        ),
      ),

      // Marketplace
      React.createElement('div', { style: { padding: '16px 20px 0' } },
        React.createElement('div', {
          style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }
        },
          React.createElement('div', { style: { fontSize: '16px', fontWeight: '700', color: theme.text, fontFamily: 'Rubik, sans-serif' } }, 'Eco-Marketplace'),
          React.createElement('div', {
            style: { background: theme.marigold, borderRadius: '10px', padding: '4px 10px', fontSize: '12px', fontWeight: '600', color: '#1A2E0A', fontFamily: 'Rubik, sans-serif', display: 'flex', alignItems: 'center', gap: '4px' }
          }, '💎 240'),
        ),
        React.createElement('div', { style: { display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '8px' } },
          marketplaceItems.map((item, i) =>
            React.createElement('div', {
              key: i,
              style: {
                minWidth: '100px', background: theme.card, borderRadius: '16px 6px 16px 6px',
                padding: '14px 10px', border: `1px solid ${theme.border}`, flexShrink: 0, textAlign: 'center',
              }
            },
              React.createElement('div', { style: { fontSize: '34px' } }, item.emoji),
              React.createElement('div', { style: { fontSize: '12px', fontWeight: '600', color: theme.text, fontFamily: 'Rubik, sans-serif', margin: '6px 0 3px' } }, item.name),
              React.createElement('div', { style: { fontSize: '11px', color: theme.copper, fontFamily: 'Rubik, sans-serif', fontWeight: '500' } }, `💎 ${item.cost}`),
            )
          ),
        ),
      ),

      // Settings
      React.createElement('div', { style: { padding: '16px 20px 80px' } },
        React.createElement('div', { style: { fontSize: '16px', fontWeight: '700', color: theme.text, fontFamily: 'Rubik, sans-serif', marginBottom: '10px' } }, 'Settings'),
        React.createElement('div', {
          style: { background: theme.card, borderRadius: '18px', overflow: 'hidden', border: `1px solid ${theme.border}` }
        },
          // Theme toggle
          React.createElement('div', {
            style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', borderBottom: `1px solid ${theme.border}` }
          },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '10px' } },
              React.createElement('span', { style: { fontSize: '18px' } }, isDark ? '🌙' : '☀️'),
              React.createElement('span', { style: { fontSize: '14px', color: theme.text, fontFamily: 'Rubik, sans-serif' } }, isDark ? 'Dark Mode' : 'Light Mode'),
            ),
            React.createElement('div', {
              onClick: toggleTheme,
              style: {
                width: '46px', height: '26px', borderRadius: '13px',
                background: isDark ? theme.primaryLighter : theme.border,
                position: 'relative', cursor: 'pointer', transition: 'background 0.25s ease',
              }
            },
              React.createElement('div', {
                style: {
                  position: 'absolute', top: '4px',
                  left: isDark ? '24px' : '4px',
                  width: '18px', height: '18px', borderRadius: '50%',
                  background: '#FFFBF0', transition: 'left 0.25s ease',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
                }
              }),
            ),
          ),
          ...['Notifications', 'Privacy & Data', 'About EcoBloom'].map((s, i) =>
            React.createElement('div', {
              key: i,
              style: {
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '14px 16px', borderBottom: i < 2 ? `1px solid ${theme.border}` : 'none',
                cursor: 'pointer',
              }
            },
              React.createElement('span', { style: { fontSize: '14px', color: theme.text, fontFamily: 'Rubik, sans-serif' } }, s),
              React.createElement('span', { style: { color: theme.textMuted, fontSize: '18px' } }, '›'),
            )
          ),
        ),
      ),
    ),
  );
}

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isDark, setIsDark] = useState(false);
  const theme = isDark ? themes.dark : themes.light;
  const toggleTheme = () => setIsDark(d => !d);

  const tabs = [
    { id: 'home', label: 'Haven', icon: window.lucide.Leaf },
    { id: 'ledger', label: 'Ledger', icon: window.lucide.BookOpen },
    { id: 'guilds', label: 'Guilds', icon: window.lucide.Users },
    { id: 'codex', label: 'Codex', icon: window.lucide.BookMarked },
    { id: 'profile', label: 'Profile', icon: window.lucide.User },
  ];

  const screens = {
    home: HomeScreen,
    ledger: LedgerScreen,
    guilds: GuildsScreen,
    codex: CodexScreen,
    profile: ProfileScreen,
  };

  const CurrentScreen = screens[activeTab];
  const profileActive = activeTab === 'profile';

  return React.createElement('div', {
    style: {
      minHeight: '100vh', background: '#f0f0f0',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'Rubik, sans-serif',
    }
  },
    React.createElement('style', null, `
      @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;600;700;800&display=swap');
      * { box-sizing: border-box; }
      ::-webkit-scrollbar { display: none; }
    `),

    React.createElement('div', {
      style: {
        width: '375px', height: '812px', background: theme.bg,
        borderRadius: '50px', overflow: 'hidden', position: 'relative',
        boxShadow: '0 50px 100px rgba(0,0,0,0.35), 0 0 0 2px rgba(0,0,0,0.08)',
        display: 'flex', flexDirection: 'column', transition: 'background 0.3s ease',
      }
    },
      // Status bar
      React.createElement('div', {
        style: {
          background: profileActive ? theme.primary : theme.bg,
          padding: '14px 28px 6px', display: 'flex',
          justifyContent: 'space-between', alignItems: 'center',
          flexShrink: 0, transition: 'background 0.3s ease',
        }
      },
        React.createElement('span', {
          style: { fontSize: '13px', fontWeight: '600', color: profileActive ? '#FFFBF0' : theme.text, fontFamily: 'Rubik, sans-serif' }
        }, '9:41'),
        React.createElement('div', {
          style: { background: '#000', borderRadius: '20px', width: '126px', height: '32px', flexShrink: 0 }
        }),
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '5px' } },
          React.createElement(window.lucide.Wifi, { size: 15, color: profileActive ? '#FFFBF0' : theme.text }),
          React.createElement(window.lucide.Battery, { size: 18, color: profileActive ? '#FFFBF0' : theme.text }),
        ),
      ),

      // Screen content
      React.createElement('div', { style: { flex: 1, overflow: 'hidden', position: 'relative' } },
        React.createElement(CurrentScreen, { theme, isDark, toggleTheme }),
      ),

      // Bottom nav
      React.createElement('div', {
        style: {
          background: theme.navBg, borderTop: `1px solid ${theme.navBorder}`,
          padding: '10px 0 24px', flexShrink: 0, transition: 'background 0.3s ease',
        }
      },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-around' } },
          tabs.map(tab =>
            React.createElement('div', {
              key: tab.id,
              onClick: () => setActiveTab(tab.id),
              style: {
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px',
                padding: '4px 14px', cursor: 'pointer',
                transition: 'transform 0.1s ease',
                transform: activeTab === tab.id ? 'scale(1.05)' : 'scale(1)',
              }
            },
              React.createElement(tab.icon, {
                size: 22,
                color: activeTab === tab.id ? theme.primary : theme.textMuted,
                strokeWidth: activeTab === tab.id ? 2.5 : 1.5,
              }),
              React.createElement('span', {
                style: {
                  fontSize: '10px', fontFamily: 'Rubik, sans-serif',
                  color: activeTab === tab.id ? theme.primary : theme.textMuted,
                  fontWeight: activeTab === tab.id ? '600' : '400',
                }
              }, tab.label),
            )
          ),
        ),
      ),
    ),
  );
}
