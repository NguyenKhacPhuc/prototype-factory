
const { useState, useEffect, useRef } = React;

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isDark, setIsDark] = useState(false);
  const [pressedBtn, setPressedBtn] = useState(null);
  const [collectedItem, setCollectedItem] = useState(null);
  const [showUnlock, setShowUnlock] = useState(false);

  const themes = {
    light: {
      bg: '#FAF8F4',
      surface: '#FFFFFF',
      surfaceAlt: '#F5F1EB',
      primary: '#D85C3A',
      primaryLight: '#F0896B',
      primaryPale: '#FDE8E0',
      text: '#1C1A18',
      textMuted: '#6B6560',
      textLight: '#A09A94',
      border: '#E8E2DA',
      navBg: '#FFFFFF',
      cardShadow: '4px 6px 20px rgba(0,0,0,0.10)',
      accent: '#3A7D44',
      accentLight: '#E8F5E9',
      gold: '#C47F3A',
      goldLight: '#FDF3E3',
    },
    dark: {
      bg: '#1A1714',
      surface: '#252220',
      surfaceAlt: '#2E2B28',
      primary: '#E8714F',
      primaryLight: '#F5A07A',
      primaryPale: '#3D2218',
      text: '#F5F0EA',
      textMuted: '#A09890',
      textLight: '#6B6560',
      border: '#3A3530',
      navBg: '#1E1C19',
      cardShadow: '4px 6px 24px rgba(0,0,0,0.40)',
      accent: '#5BA968',
      accentLight: '#1A2E1C',
      gold: '#D4963A',
      goldLight: '#2D2010',
    }
  };

  const t = isDark ? themes.dark : themes.light;

  React.useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,600&family=Inter:wght@300;400;500;600&display=swap');
      * { box-sizing: border-box; margin: 0; padding: 0; }
      ::-webkit-scrollbar { width: 0px; }
      @keyframes floatIn {
        from { opacity: 0; transform: translateY(20px) rotate(-2deg); }
        to { opacity: 1; transform: translateY(0) rotate(0deg); }
      }
      @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
      }
      @keyframes shimmer {
        0% { opacity: 0.6; }
        50% { opacity: 1; }
        100% { opacity: 0.6; }
      }
      @keyframes slideUp {
        from { opacity: 0; transform: translateY(30px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes popIn {
        0% { transform: scale(0.5) rotate(-10deg); opacity: 0; }
        70% { transform: scale(1.1) rotate(3deg); opacity: 1; }
        100% { transform: scale(1) rotate(0deg); opacity: 1; }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const handlePress = (id, fn) => {
    setPressedBtn(id);
    setTimeout(() => setPressedBtn(null), 150);
    if (fn) fn();
  };

  const btnStyle = (id, base = {}) => ({
    ...base,
    transform: pressedBtn === id ? 'scale(0.96)' : 'scale(1)',
    transition: 'transform 0.12s ease',
    cursor: 'pointer',
  });

  // --- HOME SCREEN ---
  const HomeScreen = () => {
    const [challengeDone, setChallengeDone] = useState([false, false, false]);

    const challenges = [
      { icon: '🚴', label: 'Bike to work', pts: 120, tag: 'TRANSPORT' },
      { icon: '🗑️', label: 'Trail cleanup 10 min', pts: 80, tag: 'ECO ACT' },
      { icon: '🌱', label: 'Water garden', pts: 50, tag: 'HOME' },
    ];

    return React.createElement('div', {
      style: { flex: 1, overflowY: 'auto', paddingBottom: 80 }
    },
      // Header
      React.createElement('div', {
        style: { padding: '20px 24px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }
      },
        React.createElement('div', null,
          React.createElement('p', { style: { fontFamily: 'Inter', fontSize: 11, fontWeight: 600, letterSpacing: 2, color: t.primary, textTransform: 'uppercase' } }, 'Sunday Morning'),
          React.createElement('h1', { style: { fontFamily: 'Playfair Display', fontSize: 30, fontWeight: 800, color: t.text, lineHeight: 1.1, marginTop: 2 } }, 'Your Eco\nQuest'),
        ),
        React.createElement('div', {
          style: { display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }
        },
          React.createElement('div', { style: { background: t.primaryPale, borderRadius: 20, padding: '5px 12px', display: 'flex', alignItems: 'center', gap: 6 } },
            React.createElement('span', { style: { fontSize: 14 } }, '🌿'),
            React.createElement('span', { style: { fontFamily: 'Inter', fontWeight: 700, fontSize: 14, color: t.primary } }, '2,840')
          ),
          React.createElement('p', { style: { fontFamily: 'Inter', fontSize: 10, color: t.textLight, letterSpacing: 0.5 } }, 'eco points')
        )
      ),

      // Hero Feature Card — angled overlap
      React.createElement('div', { style: { position: 'relative', margin: '24px 24px 0', height: 200 } },
        // Back card (angled)
        React.createElement('div', {
          style: {
            position: 'absolute', top: 0, left: 8, right: -8,
            background: t.accent, borderRadius: 20, height: 170,
            transform: 'rotate(2.5deg)',
            boxShadow: t.cardShadow,
          }
        }),
        // Front card
        React.createElement('div', {
          style: {
            position: 'absolute', top: 8, left: 0, right: 0,
            background: `linear-gradient(135deg, ${t.primary}, ${t.primaryLight})`,
            borderRadius: 20, padding: '20px 22px', height: 170,
            boxShadow: t.cardShadow,
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          }
        },
          React.createElement('div', null,
            React.createElement('p', { style: { fontFamily: 'Inter', fontSize: 10, fontWeight: 700, letterSpacing: 2, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase' } }, 'Featured Collectible'),
            React.createElement('h2', { style: { fontFamily: 'Playfair Display', fontSize: 22, fontWeight: 700, color: '#FFF', marginTop: 4, fontStyle: 'italic' } }, '"The Ember Seed"'),
            React.createElement('p', { style: { fontFamily: 'Inter', fontSize: 12, color: 'rgba(255,255,255,0.8)', marginTop: 4, lineHeight: 1.5 } }, 'A rare artifact forged from\ncleaned river shores & 5 bike rides.')
          ),
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
            React.createElement('div', { style: { display: 'flex', gap: 6 } },
              ['🌾', '🔥', '💧'].map((e, i) => React.createElement('span', { key: i, style: { fontSize: 18 } }, e))
            ),
            React.createElement('div', {
              onClick: () => { setShowUnlock(true); setTimeout(() => setShowUnlock(false), 2500); },
              style: btnStyle('unlock', {
                background: 'rgba(255,255,255,0.25)', borderRadius: 30, padding: '7px 16px',
                fontFamily: 'Inter', fontWeight: 600, fontSize: 12, color: '#FFF',
                border: '1px solid rgba(255,255,255,0.4)',
              })
            }, showUnlock ? '✨ Unlocked!' : 'Unlock Story →')
          )
        )
      ),

      // Streak bar
      React.createElement('div', {
        style: { margin: '24px 24px 0', background: t.surface, borderRadius: 16, padding: '14px 18px', boxShadow: t.cardShadow, display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: `1px solid ${t.border}` }
      },
        React.createElement('div', null,
          React.createElement('p', { style: { fontFamily: 'Inter', fontSize: 10, fontWeight: 700, letterSpacing: 1.5, color: t.textLight, textTransform: 'uppercase' } }, 'Current Streak'),
          React.createElement('p', { style: { fontFamily: 'Playfair Display', fontSize: 26, fontWeight: 800, color: t.gold } }, '12 Days 🔥')
        ),
        React.createElement('div', { style: { display: 'flex', gap: 4 } },
          [1,2,3,4,5,6,7].map((d, i) =>
            React.createElement('div', {
              key: d,
              style: {
                width: 26, height: 26, borderRadius: 8,
                background: i < 5 ? t.primary : t.border,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 10,
              }
            }, i < 5 ? '✓' : '')
          )
        )
      ),

      // Today's Challenges
      React.createElement('div', { style: { margin: '24px 24px 0' } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 } },
          React.createElement('h3', { style: { fontFamily: 'Playfair Display', fontSize: 20, fontWeight: 700, color: t.text } }, "Today's Missions"),
          React.createElement('p', { style: { fontFamily: 'Inter', fontSize: 12, color: t.primary, fontWeight: 600 } }, 'See all →')
        ),
        challenges.map((c, i) =>
          React.createElement('div', {
            key: i,
            onClick: () => {
              const newDone = [...challengeDone];
              newDone[i] = !newDone[i];
              setChallengeDone(newDone);
              if (!newDone[i]) return;
              setCollectedItem(c.icon);
              setTimeout(() => setCollectedItem(null), 2000);
            },
            style: btnStyle(`ch${i}`, {
              background: challengeDone[i] ? t.accentLight : t.surface,
              border: `1px solid ${challengeDone[i] ? t.accent : t.border}`,
              borderRadius: 14, padding: '14px 16px', marginBottom: 10,
              display: 'flex', alignItems: 'center', gap: 14,
              boxShadow: '2px 3px 10px rgba(0,0,0,0.06)',
            })
          },
            React.createElement('div', { style: { width: 42, height: 42, borderRadius: 12, background: t.surfaceAlt, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 } }, c.icon),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('p', { style: { fontFamily: 'Inter', fontSize: 10, fontWeight: 700, letterSpacing: 1.5, color: challengeDone[i] ? t.accent : t.textLight, textTransform: 'uppercase' } }, c.tag),
              React.createElement('p', { style: { fontFamily: 'Playfair Display', fontSize: 16, fontWeight: 600, color: t.text, marginTop: 2 } }, c.label)
            ),
            React.createElement('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 } },
              React.createElement('div', { style: { width: 24, height: 24, borderRadius: 8, background: challengeDone[i] ? t.accent : t.border, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, color: '#FFF', fontWeight: 700 } }, challengeDone[i] ? '✓' : ''),
              React.createElement('p', { style: { fontFamily: 'Inter', fontSize: 11, fontWeight: 700, color: t.gold } }, `+${c.pts}`)
            )
          )
        )
      ),

      // Collect toast
      collectedItem && React.createElement('div', {
        style: {
          position: 'fixed', top: 100, left: '50%', transform: 'translateX(-50%)',
          background: t.text, color: t.bg, borderRadius: 30, padding: '10px 24px',
          fontFamily: 'Inter', fontWeight: 600, fontSize: 13,
          animation: 'popIn 0.4s ease forwards',
          zIndex: 100, display: 'flex', alignItems: 'center', gap: 8,
        }
      }, React.createElement('span', { style: { fontSize: 18 } }, collectedItem), '  Collectible earned!')
    );
  };

  // --- COLLECT SCREEN ---
  const CollectScreen = () => {
    const [selectedItem, setSelectedItem] = useState(null);

    const items = [
      { id: 1, name: 'Ember Seed', rarity: 'LEGENDARY', emoji: '🌾', pts: 500, story: 'Born from 5 consecutive bike commutes during a rainstorm. It whispers of rivers reclaimed.', color: '#C47F3A' },
      { id: 2, name: 'River Pearl', rarity: 'RARE', emoji: '💧', pts: 300, story: 'Formed when three friends cleaned 2km of riverside trail together on a foggy morning.', color: '#4A90B8' },
      { id: 3, name: 'Solar Crest', rarity: 'EPIC', emoji: '☀️', pts: 420, story: 'Crystallized from 30 days of solar-powered choices. It hums with warmth.', color: '#D4963A' },
      { id: 4, name: 'Forest Totem', rarity: 'COMMON', emoji: '🌲', pts: 80, story: 'A humble guardian of small parks, earned by tending a home plant for 7 days.', color: '#3A7D44' },
      { id: 5, name: 'Wind Artifact', rarity: 'RARE', emoji: '🌀', pts: 280, story: 'Swirls with energy from 10 zero-waste lunches. It carries the scent of possibility.', color: '#6B5AB8' },
      { id: 6, name: 'Puzzle Shard', rarity: 'EPIC', emoji: '🧩', pts: 350, story: 'One piece of a greater mystery — only revealed when 5 community members combine theirs.', color: '#B85A6B' },
      { id: 7, name: 'Moss Stone', rarity: 'COMMON', emoji: '🪨', pts: 60, story: 'Ancient and patient. Grows slowly like the ecosystems you protect daily.', color: '#7A8C6E' },
      { id: 8, name: '???', rarity: 'LOCKED', emoji: '🔒', pts: 0, story: '', color: '#999' },
    ];

    const rarityColors = {
      LEGENDARY: '#C47F3A', EPIC: '#7B5CB8', RARE: '#4A90B8', COMMON: '#6B8C6E', LOCKED: '#999'
    };

    return React.createElement('div', { style: { flex: 1, overflowY: 'auto', paddingBottom: 80 } },
      React.createElement('div', { style: { padding: '20px 24px 0', marginBottom: 16 } },
        React.createElement('p', { style: { fontFamily: 'Inter', fontSize: 11, fontWeight: 600, letterSpacing: 2, color: t.primary, textTransform: 'uppercase' } }, '7 of 24 Found'),
        React.createElement('h1', { style: { fontFamily: 'Playfair Display', fontSize: 30, fontWeight: 800, color: t.text, lineHeight: 1.15 } }, 'My Eco\nWorld'),
      ),

      // Angled stack of 3 showcase cards
      React.createElement('div', { style: { position: 'relative', margin: '0 24px 32px', height: 160 } },
        React.createElement('div', { style: { position: 'absolute', top: 14, left: 20, right: -6, height: 130, background: t.accentLight, borderRadius: 20, border: `2px solid ${t.accent}`, transform: 'rotate(3deg)' } }),
        React.createElement('div', { style: { position: 'absolute', top: 7, left: 10, right: 2, height: 130, background: t.goldLight, borderRadius: 20, border: `2px solid ${t.gold}`, transform: 'rotate(-1.5deg)' } }),
        React.createElement('div', {
          style: {
            position: 'absolute', top: 0, left: 0, right: 0, height: 130,
            background: `linear-gradient(135deg, ${t.primary} 0%, ${t.gold} 100%)`,
            borderRadius: 20, padding: '18px 22px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            boxShadow: t.cardShadow,
          }
        },
          React.createElement('div', null,
            React.createElement('p', { style: { fontFamily: 'Inter', fontSize: 10, fontWeight: 700, letterSpacing: 2, color: 'rgba(255,255,255,0.75)', textTransform: 'uppercase' } }, 'Collection Power'),
            React.createElement('p', { style: { fontFamily: 'Playfair Display', fontSize: 36, fontWeight: 800, color: '#FFF', lineHeight: 1 } }, '2,840'),
            React.createElement('p', { style: { fontFamily: 'Inter', fontSize: 12, color: 'rgba(255,255,255,0.85)', marginTop: 4 } }, 'Eco Points Stored')
          ),
          React.createElement('div', { style: { fontSize: 48 } }, '🌿')
        )
      ),

      // Grid of collectibles
      React.createElement('div', { style: { padding: '0 24px' } },
        React.createElement('h3', { style: { fontFamily: 'Playfair Display', fontSize: 18, fontWeight: 700, color: t.text, marginBottom: 14 } }, 'Your Collection'),
        React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 } },
          items.map(item =>
            React.createElement('div', {
              key: item.id,
              onClick: () => setSelectedItem(selectedItem?.id === item.id ? null : item),
              style: btnStyle(`item${item.id}`, {
                background: t.surface, borderRadius: 18, padding: '16px 14px',
                border: `2px solid ${selectedItem?.id === item.id ? item.color : t.border}`,
                boxShadow: selectedItem?.id === item.id ? `0 4px 20px ${item.color}40` : t.cardShadow,
                cursor: item.rarity === 'LOCKED' ? 'not-allowed' : 'pointer',
                opacity: item.rarity === 'LOCKED' ? 0.5 : 1,
              })
            },
              React.createElement('div', { style: { fontSize: 32, marginBottom: 8, textAlign: 'center' } }, item.emoji),
              React.createElement('div', { style: { display: 'inline-block', background: item.color + '20', borderRadius: 6, padding: '2px 7px', marginBottom: 6 } },
                React.createElement('p', { style: { fontFamily: 'Inter', fontSize: 9, fontWeight: 800, letterSpacing: 1.5, color: item.color } }, item.rarity)
              ),
              React.createElement('p', { style: { fontFamily: 'Playfair Display', fontSize: 14, fontWeight: 700, color: t.text, lineHeight: 1.2 } }, item.name),
              item.pts > 0 && React.createElement('p', { style: { fontFamily: 'Inter', fontSize: 11, color: t.textMuted, marginTop: 3 } }, `${item.pts} pts`)
            )
          )
        ),

        // Selected item story
        selectedItem && React.createElement('div', {
          style: {
            marginTop: 16, background: t.primaryPale, borderRadius: 18, padding: '18px 18px',
            border: `1px solid ${t.primary}40`, animation: 'slideUp 0.3s ease',
          }
        },
          React.createElement('p', { style: { fontFamily: 'Inter', fontSize: 10, fontWeight: 700, letterSpacing: 2, color: t.primary, textTransform: 'uppercase', marginBottom: 6 } }, '✦ Eco Story'),
          React.createElement('p', { style: { fontFamily: 'Playfair Display', fontSize: 15, fontStyle: 'italic', color: t.text, lineHeight: 1.6 } }, `"${selectedItem.story}"`)
        )
      )
    );
  };

  // --- COMMUNITY SCREEN ---
  const CommunityScreen = () => {
    const [joined, setJoined] = useState([true, false, false]);

    const quests = [
      {
        name: 'River Rescue Collective',
        members: 47, goal: 200, current: 167,
        badge: '💧', deadline: '3 days left',
        reward: 'Glacier Heart',
        description: 'Clean 200km of waterways as a city to unlock the legendary Glacier Heart collectible.',
        color: '#4A90B8',
      },
      {
        name: 'Green Commute Squad',
        members: 124, goal: 1000, current: 640,
        badge: '🚴', deadline: '1 week left',
        reward: 'Wind Veil',
        description: 'Log 1,000 car-free commutes across the group to unlock the Wind Veil artifact.',
        color: '#3A7D44',
      },
      {
        name: 'Harvest Moon Growers',
        members: 18, goal: 50, current: 22,
        badge: '🌱', deadline: '2 weeks left',
        reward: 'Seed Crown',
        description: 'Plant 50 community gardens. A special spring edition quest available now.',
        color: '#C47F3A',
      },
    ];

    const nearbyUsers = [
      { name: 'Maya R.', streak: 21, emoji: '🌿', level: 'Eco Guardian' },
      { name: 'Jin T.', streak: 14, emoji: '🔥', level: 'Trail Blazer' },
      { name: 'Sara M.', streak: 8, emoji: '💧', level: 'River Walker' },
    ];

    return React.createElement('div', { style: { flex: 1, overflowY: 'auto', paddingBottom: 80 } },
      React.createElement('div', { style: { padding: '20px 24px 0', marginBottom: 20 } },
        React.createElement('p', { style: { fontFamily: 'Inter', fontSize: 11, fontWeight: 600, letterSpacing: 2, color: t.primary, textTransform: 'uppercase' } }, '3 Active Quests'),
        React.createElement('h1', { style: { fontFamily: 'Playfair Display', fontSize: 30, fontWeight: 800, color: t.text, lineHeight: 1.15 } }, 'Community\nEco-Quests'),
      ),

      quests.map((q, i) =>
        React.createElement('div', {
          key: i,
          style: { margin: '0 24px 16px', background: t.surface, borderRadius: 20, padding: '18px 20px', boxShadow: t.cardShadow, border: `1px solid ${t.border}` }
        },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 } },
            React.createElement('div', { style: { display: 'flex', gap: 10, alignItems: 'center' } },
              React.createElement('div', { style: { width: 40, height: 40, borderRadius: 12, background: q.color + '20', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 } }, q.badge),
              React.createElement('div', null,
                React.createElement('p', { style: { fontFamily: 'Playfair Display', fontSize: 16, fontWeight: 700, color: t.text } }, q.name),
                React.createElement('p', { style: { fontFamily: 'Inter', fontSize: 11, color: t.textMuted } }, `${q.members} members · ${q.deadline}`)
              )
            ),
            React.createElement('div', {
              onClick: () => {
                const newJoined = [...joined];
                newJoined[i] = !newJoined[i];
                setJoined(newJoined);
              },
              style: btnStyle(`join${i}`, {
                background: joined[i] ? t.accentLight : t.primary,
                color: joined[i] ? t.accent : '#FFF',
                border: joined[i] ? `1px solid ${t.accent}` : 'none',
                borderRadius: 20, padding: '6px 14px',
                fontFamily: 'Inter', fontWeight: 700, fontSize: 11,
              })
            }, joined[i] ? 'Joined ✓' : 'Join')
          ),
          React.createElement('p', { style: { fontFamily: 'Inter', fontSize: 12, color: t.textMuted, marginBottom: 12, lineHeight: 1.5 } }, q.description),
          // Progress bar
          React.createElement('div', { style: { background: t.surfaceAlt, borderRadius: 8, height: 8, overflow: 'hidden', marginBottom: 8 } },
            React.createElement('div', { style: { height: '100%', width: `${(q.current / q.goal) * 100}%`, background: `linear-gradient(90deg, ${q.color}, ${q.color}CC)`, borderRadius: 8, transition: 'width 0.5s' } })
          ),
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between' } },
            React.createElement('p', { style: { fontFamily: 'Inter', fontSize: 11, color: t.textMuted } }, `${q.current} / ${q.goal} completed`),
            React.createElement('p', { style: { fontFamily: 'Inter', fontSize: 11, fontWeight: 700, color: q.color } }, `🏆 Unlock: ${q.reward}`)
          )
        )
      ),

      // Nearby Eco-Heroes
      React.createElement('div', { style: { padding: '4px 24px 0' } },
        React.createElement('h3', { style: { fontFamily: 'Playfair Display', fontSize: 18, fontWeight: 700, color: t.text, marginBottom: 14 } }, 'Nearby Eco-Heroes'),
        nearbyUsers.map((u, i) =>
          React.createElement('div', {
            key: i,
            style: { display: 'flex', alignItems: 'center', gap: 14, marginBottom: 12, background: t.surface, borderRadius: 14, padding: '12px 16px', border: `1px solid ${t.border}` }
          },
            React.createElement('div', { style: { width: 44, height: 44, borderRadius: 14, background: t.primaryPale, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 } }, u.emoji),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('p', { style: { fontFamily: 'Playfair Display', fontSize: 15, fontWeight: 700, color: t.text } }, u.name),
              React.createElement('p', { style: { fontFamily: 'Inter', fontSize: 11, color: t.textMuted } }, u.level)
            ),
            React.createElement('div', { style: { textAlign: 'right' } },
              React.createElement('p', { style: { fontFamily: 'Inter', fontSize: 13, fontWeight: 700, color: t.gold } }, `🔥 ${u.streak}`),
              React.createElement('p', { style: { fontFamily: 'Inter', fontSize: 10, color: t.textLight } }, 'day streak')
            )
          )
        )
      )
    );
  };

  // --- CHALLENGES SCREEN ---
  const ChallengesScreen = () => {
    const [filter, setFilter] = useState('all');

    const allChallenges = [
      { id: 1, cat: 'transport', icon: '🚴', title: 'Pedal Pioneer', desc: 'Bike or walk instead of driving for one full day', pts: 150, difficulty: 'Easy', time: '1 day', terrain: 'Urban' },
      { id: 2, cat: 'cleanup', icon: '🗑️', title: 'Trail Guardian', desc: 'Pick up 20 pieces of litter on your walking route', pts: 100, difficulty: 'Easy', time: '30 min', terrain: 'Park' },
      { id: 3, cat: 'garden', icon: '🌿', title: 'Seedling Whisperer', desc: 'Start a windowsill herb garden from seeds', pts: 200, difficulty: 'Medium', time: '2 days', terrain: 'Home' },
      { id: 4, cat: 'fitness', icon: '🏃', title: 'Dawn Runner', desc: 'Complete a 5km run before 7am three times this week', pts: 250, difficulty: 'Hard', time: '3 days', terrain: 'Any' },
      { id: 5, cat: 'transport', icon: '🚌', title: 'Transit Hero', desc: 'Use public transport for 5 consecutive days', pts: 180, difficulty: 'Medium', time: '5 days', terrain: 'Urban' },
      { id: 6, cat: 'cleanup', icon: '♻️', title: 'Zero Waste Week', desc: 'Produce zero non-recyclable waste for 7 days straight', pts: 400, difficulty: 'Hard', time: '1 week', terrain: 'Home' },
    ];

    const cats = [
      { id: 'all', label: 'All' },
      { id: 'transport', label: '🚴 Transport' },
      { id: 'cleanup', label: '🗑️ Cleanup' },
      { id: 'garden', label: '🌿 Garden' },
      { id: 'fitness', label: '🏃 Fitness' },
    ];

    const filtered = filter === 'all' ? allChallenges : allChallenges.filter(c => c.cat === filter);

    const diffColor = { Easy: t.accent, Medium: t.gold, Hard: t.primary };

    return React.createElement('div', { style: { flex: 1, overflowY: 'auto', paddingBottom: 80 } },
      React.createElement('div', { style: { padding: '20px 24px 0' } },
        React.createElement('p', { style: { fontFamily: 'Inter', fontSize: 11, fontWeight: 600, letterSpacing: 2, color: t.primary, textTransform: 'uppercase' } }, 'Adaptive to You'),
        React.createElement('h1', { style: { fontFamily: 'Playfair Display', fontSize: 30, fontWeight: 800, color: t.text, lineHeight: 1.15, marginBottom: 18 } }, 'Daily\nMissions'),

        // Filter pills
        React.createElement('div', { style: { display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4, marginBottom: 20 } },
          cats.map(c =>
            React.createElement('div', {
              key: c.id,
              onClick: () => setFilter(c.id),
              style: btnStyle(`f${c.id}`, {
                background: filter === c.id ? t.primary : t.surface,
                color: filter === c.id ? '#FFF' : t.text,
                border: `1px solid ${filter === c.id ? t.primary : t.border}`,
                borderRadius: 20, padding: '7px 14px', whiteSpace: 'nowrap',
                fontFamily: 'Inter', fontWeight: 600, fontSize: 12,
              })
            }, c.label)
          )
        )
      ),

      React.createElement('div', { style: { padding: '0 24px' } },
        filtered.map((c, i) =>
          React.createElement('div', {
            key: c.id,
            style: btnStyle(`ch${c.id}`, {
              background: t.surface, borderRadius: 20, padding: '16px 18px', marginBottom: 12,
              boxShadow: t.cardShadow, border: `1px solid ${t.border}`,
              display: 'flex', gap: 14, alignItems: 'flex-start',
              animation: `slideUp 0.3s ease ${i * 0.05}s both`,
            })
          },
            React.createElement('div', { style: { width: 48, height: 48, borderRadius: 14, background: t.surfaceAlt, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0 } }, c.icon),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 } },
                React.createElement('p', { style: { fontFamily: 'Playfair Display', fontSize: 16, fontWeight: 700, color: t.text } }, c.title),
                React.createElement('p', { style: { fontFamily: 'Inter', fontSize: 12, fontWeight: 700, color: t.gold } }, `+${c.pts}`)
              ),
              React.createElement('p', { style: { fontFamily: 'Inter', fontSize: 12, color: t.textMuted, lineHeight: 1.5, marginBottom: 10 } }, c.desc),
              React.createElement('div', { style: { display: 'flex', gap: 8, flexWrap: 'wrap' } },
                [
                  { label: c.difficulty, color: diffColor[c.difficulty] },
                  { label: `⏱ ${c.time}`, color: t.textMuted },
                  { label: `📍 ${c.terrain}`, color: t.textMuted },
                ].map((tag, ti) =>
                  React.createElement('div', {
                    key: ti,
                    style: { background: tag.color + '18', borderRadius: 8, padding: '3px 9px', border: `1px solid ${tag.color}30` }
                  },
                    React.createElement('p', { style: { fontFamily: 'Inter', fontSize: 10, fontWeight: 700, color: tag.color } }, tag.label)
                  )
                )
              )
            )
          )
        )
      )
    );
  };

  // --- PROFILE SCREEN ---
  const ProfileScreen = () => {
    const stats = [
      { label: 'Collectibles', value: '7', icon: '🌿' },
      { label: 'Eco Points', value: '2.8k', icon: '⚡' },
      { label: 'Day Streak', value: '12', icon: '🔥' },
      { label: 'CO₂ Saved', value: '18kg', icon: '🌍' },
    ];

    const achievements = [
      { name: 'First Pedal', desc: 'Bike commuted for the first time', icon: '🚴', done: true },
      { name: 'River Keeper', desc: 'Participated in 3 cleanups', icon: '💧', done: true },
      { name: 'Community Root', desc: 'Joined your first group quest', icon: '🤝', done: true },
      { name: 'Zero Waste', desc: 'Complete a full zero-waste week', icon: '♻️', done: false },
      { name: 'Legend Seeds', desc: 'Collect 3 legendary items', icon: '🏆', done: false },
    ];

    return React.createElement('div', { style: { flex: 1, overflowY: 'auto', paddingBottom: 80 } },
      // Profile Header
      React.createElement('div', {
        style: { background: `linear-gradient(160deg, ${t.primary} 0%, ${t.primaryLight} 100%)`, padding: '32px 24px 28px', position: 'relative', overflow: 'hidden' }
      },
        React.createElement('div', { style: { position: 'absolute', top: -30, right: -30, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' } }),
        React.createElement('div', { style: { position: 'absolute', bottom: -20, left: 40, width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' } }),
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 16, position: 'relative' } },
          React.createElement('div', { style: { width: 68, height: 68, borderRadius: 20, background: 'rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, border: '2px solid rgba(255,255,255,0.5)' } }, '🌿'),
          React.createElement('div', null,
            React.createElement('h2', { style: { fontFamily: 'Playfair Display', fontSize: 24, fontWeight: 800, color: '#FFF' } }, 'Alex Rivera'),
            React.createElement('p', { style: { fontFamily: 'Inter', fontSize: 13, color: 'rgba(255,255,255,0.85)', marginTop: 2 } }, 'Eco Guardian · Level 8'),
            React.createElement('p', { style: { fontFamily: 'Inter', fontSize: 11, color: 'rgba(255,255,255,0.7)', marginTop: 2 } }, 'Member since Jan 2025')
          )
        )
      ),

      // Stats grid
      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, margin: '20px 24px 0' } },
        stats.map((s, i) =>
          React.createElement('div', {
            key: i,
            style: { background: t.surface, borderRadius: 16, padding: '14px 16px', border: `1px solid ${t.border}`, boxShadow: t.cardShadow }
          },
            React.createElement('p', { style: { fontSize: 22 } }, s.icon),
            React.createElement('p', { style: { fontFamily: 'Playfair Display', fontSize: 24, fontWeight: 800, color: t.text, marginTop: 6 } }, s.value),
            React.createElement('p', { style: { fontFamily: 'Inter', fontSize: 11, color: t.textMuted, marginTop: 2 } }, s.label)
          )
        )
      ),

      // Achievements
      React.createElement('div', { style: { margin: '24px 24px 0' } },
        React.createElement('h3', { style: { fontFamily: 'Playfair Display', fontSize: 18, fontWeight: 700, color: t.text, marginBottom: 12 } }, 'Achievements'),
        achievements.map((a, i) =>
          React.createElement('div', {
            key: i,
            style: { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10, background: t.surface, borderRadius: 14, padding: '12px 14px', border: `1px solid ${t.border}`, opacity: a.done ? 1 : 0.5 }
          },
            React.createElement('div', { style: { width: 38, height: 38, borderRadius: 12, background: a.done ? t.goldLight : t.surfaceAlt, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 } }, a.done ? a.icon : '🔒'),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('p', { style: { fontFamily: 'Playfair Display', fontSize: 14, fontWeight: 700, color: t.text } }, a.name),
              React.createElement('p', { style: { fontFamily: 'Inter', fontSize: 11, color: t.textMuted } }, a.desc)
            ),
            a.done && React.createElement('div', { style: { width: 22, height: 22, borderRadius: 8, background: t.gold, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF', fontSize: 12, fontWeight: 700 } }, '✓')
          )
        )
      ),

      // Settings
      React.createElement('div', { style: { margin: '20px 24px 0' } },
        React.createElement('h3', { style: { fontFamily: 'Playfair Display', fontSize: 18, fontWeight: 700, color: t.text, marginBottom: 12 } }, 'Settings'),
        React.createElement('div', {
          style: { background: t.surface, borderRadius: 16, border: `1px solid ${t.border}`, overflow: 'hidden' }
        },
          [
            { label: 'Dark Mode', action: () => setIsDark(!isDark), toggle: true, value: isDark },
            { label: 'Push Notifications', action: null, toggle: true, value: true },
            { label: 'Location Services', action: null, toggle: true, value: true },
            { label: 'Share Progress', action: null, toggle: false, value: null },
            { label: 'Sign Out', action: null, toggle: false, danger: true },
          ].map((item, i, arr) =>
            React.createElement('div', {
              key: i,
              onClick: item.action || null,
              style: {
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '14px 18px',
                borderBottom: i < arr.length - 1 ? `1px solid ${t.border}` : 'none',
                cursor: 'pointer',
              }
            },
              React.createElement('p', { style: { fontFamily: 'Inter', fontSize: 14, fontWeight: 500, color: item.danger ? t.primary : t.text } }, item.label),
              item.toggle
                ? React.createElement('div', {
                    style: {
                      width: 46, height: 26, borderRadius: 13,
                      background: item.value ? t.primary : t.border,
                      position: 'relative', transition: 'background 0.25s',
                    }
                  },
                    React.createElement('div', { style: { position: 'absolute', top: 3, left: item.value ? 23 : 3, width: 20, height: 20, borderRadius: '50%', background: '#FFF', transition: 'left 0.25s', boxShadow: '0 1px 4px rgba(0,0,0,0.2)' } })
                  )
                : React.createElement('p', { style: { fontFamily: 'Inter', fontSize: 18, color: t.textLight } }, '›')
            )
          )
        )
      )
    );
  };

  const tabs = [
    { id: 'home', label: 'Home', icon: window.lucide.Home },
    { id: 'collect', label: 'Collect', icon: window.lucide.Leaf },
    { id: 'community', label: 'Together', icon: window.lucide.Users },
    { id: 'challenges', label: 'Missions', icon: window.lucide.Zap },
    { id: 'profile', label: 'Profile', icon: window.lucide.User },
  ];

  const screens = {
    home: HomeScreen,
    collect: CollectScreen,
    community: CommunityScreen,
    challenges: ChallengesScreen,
    profile: ProfileScreen,
  };

  const CurrentScreen = screens[activeTab];

  return React.createElement('div', {
    style: {
      minHeight: '100vh', background: '#f0f0f0',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'Inter, sans-serif',
    }
  },
    // Phone frame
    React.createElement('div', {
      style: {
        width: 375, height: 812, background: t.bg,
        borderRadius: 50, overflow: 'hidden',
        boxShadow: '0 32px 80px rgba(0,0,0,0.30), 0 0 0 2px rgba(0,0,0,0.15)',
        display: 'flex', flexDirection: 'column',
        position: 'relative',
      }
    },
      // Status bar
      React.createElement('div', {
        style: { background: t.bg, padding: '14px 28px 6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }
      },
        React.createElement('span', { style: { fontFamily: 'Inter', fontWeight: 700, fontSize: 13, color: t.text } }, '9:41'),
        // Dynamic island
        React.createElement('div', { style: { width: 120, height: 32, background: '#000', borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 } },
          React.createElement('div', { style: { width: 8, height: 8, borderRadius: '50%', background: '#1a1a1a', border: '2px solid #333' } }),
          React.createElement('div', { style: { width: 4, height: 4, borderRadius: '50%', background: '#2a2a2a' } })
        ),
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 5 } },
          React.createElement('div', { style: { display: 'flex', gap: 2, alignItems: 'flex-end' } },
            [3, 4, 5, 6].map(h => React.createElement('div', { key: h, style: { width: 3, height: h, background: t.text, borderRadius: 1, opacity: 0.7 } }))
          ),
          React.createElement(window.lucide.Wifi, { size: 14, color: t.text }),
          React.createElement('div', { style: { width: 22, height: 12, border: `1.5px solid ${t.text}`, borderRadius: 3, display: 'flex', alignItems: 'center', padding: 1.5, opacity: 0.8 } },
            React.createElement('div', { style: { width: '80%', height: '100%', background: t.text, borderRadius: 2 } })
          )
        )
      ),

      // Screen content
      React.createElement('div', { style: { flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' } },
        React.createElement(CurrentScreen)
      ),

      // Bottom nav
      React.createElement('div', {
        style: {
          background: t.navBg, borderTop: `1px solid ${t.border}`,
          display: 'flex', paddingBottom: 16, paddingTop: 10,
          flexShrink: 0,
        }
      },
        tabs.map(tab =>
          React.createElement('div', {
            key: tab.id,
            onClick: () => setActiveTab(tab.id),
            style: btnStyle(`nav_${tab.id}`, {
              flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
              cursor: 'pointer',
            })
          },
            React.createElement(tab.icon, {
              size: 22,
              color: activeTab === tab.id ? t.primary : t.textLight,
              strokeWidth: activeTab === tab.id ? 2.5 : 1.8,
            }),
            React.createElement('span', {
              style: {
                fontFamily: 'Inter', fontSize: 9.5, fontWeight: activeTab === tab.id ? 700 : 500,
                color: activeTab === tab.id ? t.primary : t.textLight,
                letterSpacing: 0.3,
              }
            }, tab.label)
          )
        )
      )
    )
  );
}
