const { useState, useEffect, useRef } = React;

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [themeMode, setThemeMode] = useState('light');
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeRealm, setActiveRealm] = useState('forest');

  const themes = {
    light: {
      bg: '#EDF7EF',
      surface: '#FFFFFF',
      surface2: '#F4FBF5',
      elevated: '#FFFFFF',
      primary: '#22C55E',
      primaryGrad: 'linear-gradient(135deg, #22C55E, #16A34A)',
      heroGrad: 'linear-gradient(160deg, #14532D 0%, #15803D 45%, #16A34A 75%, #22C55E 100%)',
      primaryLight: '#DCFCE7',
      primaryDark: '#15803D',
      accent: '#F59E0B',
      accentGrad: 'linear-gradient(135deg, #F59E0B, #D97706)',
      accentLight: '#FEF3C7',
      text: '#0F172A',
      textSec: '#334155',
      textTer: '#94A3B8',
      border: '#E2E8F0',
      navBg: '#FFFFFF',
      navBorder: 'rgba(0,0,0,0.06)',
      shadow: '0 8px 32px rgba(0,0,0,0.10)',
      cardShadow: '0 2px 10px rgba(0,0,0,0.06)',
      teal: '#0D9488', tealLight: '#CCFBF1',
      blue: '#3B82F6', blueLight: '#DBEAFE',
      purple: '#7C3AED', purpleLight: '#EDE9FE',
      orange: '#EA580C', orangeLight: '#FFEDD5',
    },
    dark: {
      bg: '#051008',
      surface: '#091610',
      surface2: '#0E2016',
      elevated: '#122818',
      primary: '#4ADE80',
      primaryGrad: 'linear-gradient(135deg, #4ADE80, #22C55E)',
      heroGrad: 'linear-gradient(160deg, #052E16 0%, #064E24 45%, #0A6930 75%, #15803D 100%)',
      primaryLight: '#052E16',
      primaryDark: '#86EFAC',
      accent: '#FCD34D',
      accentGrad: 'linear-gradient(135deg, #FCD34D, #F59E0B)',
      accentLight: '#1C1300',
      text: '#F0FDF4',
      textSec: '#BBF7D0',
      textTer: '#4ADE80',
      border: '#1A3D22',
      navBg: '#051008',
      navBorder: 'rgba(255,255,255,0.05)',
      shadow: '0 8px 32px rgba(0,0,0,0.60)',
      cardShadow: '0 2px 10px rgba(0,0,0,0.40)',
      teal: '#2DD4BF', tealLight: '#042F2E',
      blue: '#60A5FA', blueLight: '#1E3A5F',
      purple: '#A78BFA', purpleLight: '#2E1065',
      orange: '#FB923C', orangeLight: '#431407',
    }
  };

  const t = themes[themeMode];
  const isDark = themeMode === 'dark';

  // ── Data ──────────────────────────────────────────────────────────────────

  const speciesData = [
    { id: 1, name: 'Snow Leopard', cat: 'arctic',  emoji: '🐆', rarity: 'Legendary', evo: 3, xp: 100, color: '#8B5CF6', colorLight: '#EDE9FE', owned: true },
    { id: 2, name: 'Sea Turtle',   cat: 'ocean',   emoji: '🐢', rarity: 'Rare',      evo: 2, xp: 65,  color: '#0D9488', colorLight: '#CCFBF1', owned: true },
    { id: 3, name: 'Red Panda',    cat: 'forest',  emoji: '🦊', rarity: 'Uncommon',  evo: 1, xp: 35,  color: '#EA580C', colorLight: '#FFEDD5', owned: true },
    { id: 4, name: 'Blue Whale',   cat: 'ocean',   emoji: '🐋', rarity: 'Epic',      evo: 2, xp: 80,  color: '#3B82F6', colorLight: '#DBEAFE', owned: true },
    { id: 5, name: 'Elephant',     cat: 'savanna', emoji: '🐘', rarity: 'Rare',      evo: 1, xp: 40,  color: '#78716C', colorLight: '#F5F5F4', owned: true },
    { id: 6, name: 'Giant Panda',  cat: 'forest',  emoji: '🐼', rarity: 'Uncommon',  evo: 2, xp: 70,  color: '#22C55E', colorLight: '#DCFCE7', owned: true },
    { id: 7, name: 'Arctic Fox',   cat: 'arctic',  emoji: '🦊', rarity: 'Common',    evo: 1, xp: 25,  color: '#60A5FA', colorLight: '#DBEAFE', owned: true },
    { id: 8, name: 'Tiger',        cat: 'forest',  emoji: '🐯', rarity: 'Epic',      evo: 0, xp: 10,  color: '#F59E0B', colorLight: '#FEF3C7', owned: true },
    { id: 9, name: 'Narwhal',      cat: 'ocean',   emoji: '🦄', rarity: 'Legendary', evo: 0, xp: 0,   color: '#94A3B8', colorLight: '#F1F5F9', owned: false },
  ];

  const rarityColors = { Common: '#94A3B8', Uncommon: '#22C55E', Rare: '#3B82F6', Epic: '#8B5CF6', Legendary: '#F59E0B' };

  const challenges = [
    { id: 1, title: 'Morning Nature Walk', desc: 'Complete 3,000 steps outdoors', emoji: '🌿', prog: 65,  reward: 'Red Panda +20 XP',    color: '#22C55E', bg: '#DCFCE7', darkBg: '#052E16', done: false },
    { id: 2, title: 'Bike Commute',        desc: 'Cycle 5 km instead of driving', emoji: '🚲', prog: 30,  reward: 'Sea Turtle +35 XP',   color: '#0D9488', bg: '#CCFBF1', darkBg: '#042F2E', done: false },
    { id: 3, title: 'Forest Meditation',   desc: '15-min outdoor mindfulness',     emoji: '🧘', prog: 100, reward: 'Giant Panda +15 XP ✓', color: '#8B5CF6', bg: '#EDE9FE', darkBg: '#2E1065', done: true  },
  ];

  const leaderboard = [
    { rank: 1, name: 'Ocean Defenders',   emoji: '🌊', score: 8420, members: 24, color: '#3B82F6', myTeam: false },
    { rank: 2, name: 'Forest Guardians',  emoji: '🌲', score: 7890, members: 31, color: '#22C55E', myTeam: true  },
    { rank: 3, name: 'Prairie Protectors',emoji: '🌾', score: 6540, members: 18, color: '#F59E0B', myTeam: false },
    { rank: 4, name: 'Mountain Keepers',  emoji: '⛰️', score: 5980, members: 22, color: '#8B5CF6', myTeam: false },
    { rank: 5, name: 'Arctic Alliance',   emoji: '❄️', score: 4720, members: 15, color: '#0D9488', myTeam: false },
  ];

  const realmData = {
    forest:  { name: 'Forest Realm',  gradient: 'linear-gradient(180deg,#064E24 0%,#15803D 40%,#4ADE80 100%)', health: 82, biodiv: 74, species: [{ name:'Giant Panda',emoji:'🐼',color:'#22C55E',colorLight:'#DCFCE7',evo:2 },{ name:'Red Panda',emoji:'🦊',color:'#EA580C',colorLight:'#FFEDD5',evo:1 },{ name:'Tiger',emoji:'🐯',color:'#F59E0B',colorLight:'#FEF3C7',evo:0 }] },
    ocean:   { name: 'Ocean Realm',   gradient: 'linear-gradient(180deg,#1D4ED8 0%,#0D9488 50%,#2DD4BF 100%)', health: 68, biodiv: 60, species: [{ name:'Sea Turtle',emoji:'🐢',color:'#0D9488',colorLight:'#CCFBF1',evo:2 },{ name:'Blue Whale',emoji:'🐋',color:'#3B82F6',colorLight:'#DBEAFE',evo:2 }] },
    arctic:  { name: 'Arctic Realm',  gradient: 'linear-gradient(180deg,#1E3A5F 0%,#3B82F6 50%,#DBEAFE 100%)', health: 91, biodiv: 85, species: [{ name:'Snow Leopard',emoji:'🐆',color:'#8B5CF6',colorLight:'#EDE9FE',evo:3 },{ name:'Arctic Fox',emoji:'🦊',color:'#60A5FA',colorLight:'#DBEAFE',evo:1 }] },
    savanna: { name: 'Savanna Realm', gradient: 'linear-gradient(180deg,#854D0E 0%,#D97706 50%,#FCD34D 100%)', health: 45, biodiv: 30, species: [{ name:'Elephant',emoji:'🐘',color:'#78716C',colorLight:'#F5F5F4',evo:1 }] },
  };

  const achievements = [
    { name: 'First Steps', emoji: '👣', unlocked: true  },
    { name: 'Eco Warrior', emoji: '🌱', unlocked: true  },
    { name: 'Collector',   emoji: '🏆', unlocked: true  },
    { name: 'Team Player', emoji: '🤝', unlocked: true  },
    { name: 'Carbon Hero', emoji: '⚡', unlocked: false },
    { name: 'Legend',      emoji: '⭐', unlocked: false },
  ];

  // ── Shared helpers ─────────────────────────────────────────────────────────

  const ProgressBar = ({ value, color, height, bgColor }) => {
    const h = height || 6;
    const bg = bgColor || t.border;
    const c = color || t.primary;
    return React.createElement('div', { style: { background: bg, borderRadius: h, height: h, overflow: 'hidden', width: '100%' } },
      React.createElement('div', { style: { background: c, width: `${Math.min(100, value)}%`, height: '100%', borderRadius: h, transition: 'width 0.6s ease' } })
    );
  };

  // ── Screens ────────────────────────────────────────────────────────────────

  const HomeScreen = () => (
    React.createElement('div', { style: { height: '100%', overflowY: 'auto', background: t.bg, fontFamily: 'Outfit, sans-serif' } },

      // Header
      React.createElement('div', { style: { padding: '14px 20px 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
        React.createElement('div', null,
          React.createElement('p', { style: { fontSize: 13, color: t.textSec, fontWeight: 400 } }, 'Good Morning 🌿'),
          React.createElement('h2', { style: { fontSize: 22, fontWeight: 800, color: t.text, lineHeight: 1.2 } }, 'Alex Chen')
        ),
        React.createElement('div', { style: { display: 'flex', gap: 10, alignItems: 'center' } },
          React.createElement('div', { style: { background: t.accentLight, borderRadius: 20, padding: '5px 10px', display: 'flex', alignItems: 'center', gap: 5 } },
            React.createElement(window.lucide.Flame, { size: 14, color: t.accent }),
            React.createElement('span', { style: { fontSize: 13, fontWeight: 700, color: t.accent } }, '12')
          ),
          React.createElement('div', { style: { width: 40, height: 40, borderRadius: 20, background: t.primaryGrad, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 } }, '🌿')
        )
      ),

      // Eco Score Banner
      React.createElement('div', { style: { margin: '0 16px 16px', borderRadius: 20, background: t.heroGrad, padding: '18px', position: 'relative', overflow: 'hidden' } },
        React.createElement('div', { style: { position: 'absolute', top: -20, right: -10, fontSize: 100, opacity: 0.12, lineHeight: 1 } }, '🌍'),
        React.createElement('p', { style: { fontSize: 12, color: 'rgba(255,255,255,0.75)', fontWeight: 500, marginBottom: 4 } }, 'Your Eco Score'),
        React.createElement('div', { style: { display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 10 } },
          React.createElement('span', { style: { fontSize: 38, fontWeight: 800, color: '#fff', lineHeight: 1 } }, '2,840'),
          React.createElement('span', { style: { fontSize: 13, color: '#86EFAC', fontWeight: 600 } }, '+125 today')
        ),
        React.createElement(ProgressBar, { value: 71, color: 'rgba(255,255,255,0.9)', bgColor: 'rgba(255,255,255,0.2)', height: 7 }),
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginTop: 6 } },
          React.createElement('span', { style: { fontSize: 11, color: 'rgba(255,255,255,0.65)' } }, 'Level 12'),
          React.createElement('span', { style: { fontSize: 11, color: 'rgba(255,255,255,0.65)' } }, '160 pts to Level 13 →')
        )
      ),

      // Quick Stats
      React.createElement('div', { style: { display: 'flex', gap: 10, margin: '0 16px 18px' } },
        [
          { label: 'Steps',    value: '6,240',  icon: window.lucide.Activity,    color: t.primary },
          { label: 'CO₂ Saved',value: '2.4 kg', icon: window.lucide.Wind,        color: t.teal    },
          { label: 'Species',  value: '8 / 9',  icon: window.lucide.Leaf,        color: t.accent  },
        ].map((s, i) =>
          React.createElement('div', { key: i, style: { flex: 1, background: t.surface, borderRadius: 14, padding: '12px 8px', textAlign: 'center', boxShadow: t.cardShadow } },
            React.createElement(s.icon, { size: 18, color: s.color }),
            React.createElement('p', { style: { fontSize: 16, fontWeight: 700, color: t.text, marginTop: 4, lineHeight: 1 } }, s.value),
            React.createElement('p', { style: { fontSize: 11, color: t.textTer, marginTop: 3 } }, s.label)
          )
        )
      ),

      // Daily Quests
      React.createElement('div', { style: { padding: '0 16px' } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 } },
          React.createElement('h3', { style: { fontSize: 16, fontWeight: 700, color: t.text } }, "Today's Quests"),
          React.createElement('span', { style: { fontSize: 12, color: t.primary, fontWeight: 700 } }, '1/3 done')
        ),
        React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 10 } },
          challenges.map(c =>
            React.createElement('div', { key: c.id, style: { background: t.surface, borderRadius: 16, padding: '14px', boxShadow: t.cardShadow } },
              React.createElement('div', { style: { display: 'flex', alignItems: 'flex-start', gap: 12 } },
                React.createElement('div', { style: { width: 44, height: 44, borderRadius: 13, background: isDark ? c.darkBg : c.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 } }, c.emoji),
                React.createElement('div', { style: { flex: 1, minWidth: 0 } },
                  React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 } },
                    React.createElement('p', { style: { fontSize: 14, fontWeight: 700, color: t.text } }, c.title),
                    c.done && React.createElement(window.lucide.CheckCircle, { size: 18, color: t.primary, fill: t.primary })
                  ),
                  React.createElement('p', { style: { fontSize: 12, color: t.textSec, marginBottom: 8 } }, c.desc),
                  React.createElement(ProgressBar, { value: c.prog, color: c.color, bgColor: isDark ? c.darkBg : c.bg }),
                  React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginTop: 6 } },
                    React.createElement('span', { style: { fontSize: 11, color: t.textTer } }, `${c.prog}% complete`),
                    React.createElement('span', { style: { fontSize: 11, color: c.color, fontWeight: 700 } }, c.reward)
                  )
                )
              )
            )
          )
        )
      ),

      // Recently Unlocked
      React.createElement('div', { style: { margin: '18px 16px 24px' } },
        React.createElement('h3', { style: { fontSize: 16, fontWeight: 700, color: t.text, marginBottom: 12 } }, 'Recently Unlocked'),
        React.createElement('div', { style: { background: 'linear-gradient(135deg,#2E1065,#4C1D95,#5B21B6)', borderRadius: 18, padding: '16px', display: 'flex', alignItems: 'center', gap: 14, boxShadow: '0 4px 20px rgba(124,58,237,0.35)' } },
          React.createElement('div', { style: { width: 60, height: 60, borderRadius: 16, background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 34, border: '1.5px solid rgba(255,255,255,0.2)' } }, '🐆'),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 7, marginBottom: 3 } },
              React.createElement('p', { style: { fontSize: 16, fontWeight: 700, color: '#fff' } }, 'Snow Leopard'),
              React.createElement('span', { style: { fontSize: 9, fontWeight: 800, color: '#FCD34D', background: 'rgba(252,211,77,0.2)', padding: '2px 6px', borderRadius: 6, letterSpacing: '0.05em' } }, 'LEGENDARY')
            ),
            React.createElement('p', { style: { fontSize: 12, color: 'rgba(255,255,255,0.7)', marginBottom: 8 } }, 'Fully evolved! Arctic guardian achieved.'),
            React.createElement('div', { style: { display: 'flex', gap: 4 } }, [1,2,3].map(s => React.createElement('span', { key: s, style: { fontSize: 15 } }, '⭐')))
          )
        )
      )
    )
  );

  // ── Collect Screen ──────────────────────────────────────────────────────────

  const CollectScreen = () => {
    const filters = ['all','forest','ocean','arctic','savanna'];
    const filtered = activeFilter === 'all' ? speciesData : speciesData.filter(s => s.cat === activeFilter);

    return React.createElement('div', { style: { height: '100%', overflowY: 'auto', background: t.bg, fontFamily: 'Outfit, sans-serif' } },

      // Header
      React.createElement('div', { style: { padding: '14px 20px 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
        React.createElement('div', null,
          React.createElement('h2', { style: { fontSize: 22, fontWeight: 800, color: t.text } }, 'Collection'),
          React.createElement('p', { style: { fontSize: 13, color: t.textSec } }, '8 of 9 species discovered')
        ),
        React.createElement('div', { style: { background: t.surface, borderRadius: 12, padding: 9, boxShadow: t.cardShadow } },
          React.createElement(window.lucide.Filter, { size: 18, color: t.textSec })
        )
      ),

      // Collection Progress Card
      React.createElement('div', { style: { margin: '0 16px 14px', background: t.surface, borderRadius: 16, padding: '14px', boxShadow: t.cardShadow } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: 8 } },
          React.createElement('span', { style: { fontSize: 13, color: t.textSec, fontWeight: 500 } }, 'Overall Progress'),
          React.createElement('span', { style: { fontSize: 13, color: t.primary, fontWeight: 700 } }, '89%')
        ),
        React.createElement(ProgressBar, { value: 89 }),
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-around', marginTop: 12 } },
          [
            { label: 'Common',    count: 1, color: '#94A3B8' },
            { label: 'Rare',      count: 2, color: '#3B82F6' },
            { label: 'Epic',      count: 2, color: '#8B5CF6' },
            { label: 'Legendary', count: 2, color: '#F59E0B' },
          ].map((r, i) =>
            React.createElement('div', { key: i, style: { textAlign: 'center' } },
              React.createElement('p', { style: { fontSize: 17, fontWeight: 800, color: r.color, lineHeight: 1 } }, r.count),
              React.createElement('p', { style: { fontSize: 10, color: t.textTer, marginTop: 3 } }, r.label)
            )
          )
        )
      ),

      // Filter Pills
      React.createElement('div', { style: { padding: '0 16px', display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4, marginBottom: 14 } },
        filters.map(f =>
          React.createElement('button', {
            key: f,
            onClick: () => setActiveFilter(f),
            style: {
              padding: '7px 16px', borderRadius: 20, border: 'none', cursor: 'pointer',
              fontSize: 12, fontWeight: 600, whiteSpace: 'nowrap',
              background: activeFilter === f ? t.primary : t.surface,
              color: activeFilter === f ? '#fff' : t.textSec,
              boxShadow: activeFilter === f ? `0 3px 10px ${t.primary}50` : t.cardShadow,
              transition: 'all 0.2s', fontFamily: 'Outfit, sans-serif',
            }
          }, f.charAt(0).toUpperCase() + f.slice(1))
        )
      ),

      // Species Grid
      React.createElement('div', { style: { padding: '0 16px 24px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 } },
        filtered.map(s =>
          React.createElement('div', {
            key: s.id,
            style: {
              background: t.surface, borderRadius: 16, padding: '12px 8px', textAlign: 'center',
              boxShadow: t.cardShadow, position: 'relative',
              border: s.evo === 3 ? `2px solid ${s.color}` : `1px solid ${t.border}`,
              opacity: s.owned ? 1 : 0.6,
            }
          },
            !s.owned && React.createElement('div', {
              style: { position: 'absolute', inset: 0, borderRadius: 16, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1 }
            }, React.createElement(window.lucide.Lock, { size: 22, color: '#fff' })),
            s.evo === 3 && React.createElement('div', { style: { position: 'absolute', top: 6, right: 6, width: 8, height: 8, borderRadius: 4, background: s.color, boxShadow: `0 0 6px ${s.color}` } }),
            React.createElement('div', { style: { fontSize: 34, lineHeight: 1, marginBottom: 5 } }, s.emoji),
            React.createElement('p', { style: { fontSize: 11, fontWeight: 700, color: t.text, lineHeight: 1.2, marginBottom: 3 } }, s.name),
            React.createElement('span', { style: { fontSize: 9, fontWeight: 800, color: rarityColors[s.rarity], letterSpacing: '0.03em' } }, s.rarity.toUpperCase()),
            React.createElement('div', { style: { display: 'flex', justifyContent: 'center', gap: 3, marginTop: 7 } },
              [1,2,3].map(star => React.createElement('div', { key: star, style: { width: 8, height: 8, borderRadius: 4, background: star <= s.evo ? s.color : t.border, transition: 'background 0.3s' } }))
            )
          )
        )
      )
    );
  };

  // ── Realm Screen ────────────────────────────────────────────────────────────

  const RealmScreen = () => {
    const realm = realmData[activeRealm];
    return React.createElement('div', { style: { height: '100%', overflowY: 'auto', background: t.bg, fontFamily: 'Outfit, sans-serif' } },

      // Header
      React.createElement('div', { style: { padding: '14px 20px 10px' } },
        React.createElement('h2', { style: { fontSize: 22, fontWeight: 800, color: t.text } }, 'Eco Realm'),
        React.createElement('p', { style: { fontSize: 13, color: t.textSec } }, 'Your virtual ecosystem sanctuary')
      ),

      // Realm Selector
      React.createElement('div', { style: { padding: '0 16px', display: 'flex', gap: 8, overflowX: 'auto', marginBottom: 14 } },
        Object.keys(realmData).map(r =>
          React.createElement('button', {
            key: r, onClick: () => setActiveRealm(r),
            style: {
              padding: '7px 16px', borderRadius: 20, border: 'none', cursor: 'pointer',
              fontSize: 12, fontWeight: 600, whiteSpace: 'nowrap',
              background: activeRealm === r ? t.primary : t.surface,
              color: activeRealm === r ? '#fff' : t.textSec,
              boxShadow: activeRealm === r ? `0 3px 10px ${t.primary}50` : t.cardShadow,
              transition: 'all 0.2s', fontFamily: 'Outfit, sans-serif',
            }
          }, realmData[r].name.replace(' Realm',''))
        )
      ),

      // Realm Visual
      React.createElement('div', { style: { margin: '0 16px 14px', borderRadius: 22, overflow: 'hidden', height: 196, background: realm.gradient, position: 'relative', boxShadow: t.shadow } },
        React.createElement('div', { style: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 55, background: 'rgba(0,0,0,0.18)', borderRadius: '60% 60% 0 0' } }),
        React.createElement('div', { style: { position: 'absolute', top: 14, right: 14, background: 'rgba(255,255,255,0.18)', borderRadius: 10, padding: '5px 10px', display: 'flex', alignItems: 'center', gap: 5, backdropFilter: 'blur(4px)' } },
          React.createElement('span', { style: { fontSize: 10, color: '#fff', fontWeight: 700 } }, '✦ AR VIEW'),
        ),
        React.createElement('p', { style: { position: 'absolute', top: 14, left: 16, fontSize: 16, fontWeight: 800, color: '#fff', textShadow: '0 1px 6px rgba(0,0,0,0.3)' } }, realm.name),
        realm.species.map((sp, i) =>
          React.createElement('div', {
            key: i,
            style: { position: 'absolute', bottom: 28 + (i % 2) * 22, left: `${18 + i * 28}%`, fontSize: 30 + (i === 0 ? 8 : 0), filter: 'drop-shadow(0 2px 5px rgba(0,0,0,0.35))' }
          }, sp.emoji)
        ),
        React.createElement('div', { style: { position: 'absolute', bottom: 10, left: '6%', fontSize: 16 } }, '🌿'),
        React.createElement('div', { style: { position: 'absolute', bottom: 12, right: '8%', fontSize: 18 } }, '🌱'),
        React.createElement('div', { style: { position: 'absolute', bottom: 7, left: '38%', fontSize: 13 } }, '🍃')
      ),

      // Realm Stats
      React.createElement('div', { style: { display: 'flex', gap: 10, margin: '0 16px 16px' } },
        [
          { label: 'Biodiversity', value: realm.biodiv, color: t.primary },
          { label: 'Realm Health', value: realm.health, color: t.teal  },
        ].map((stat, i) =>
          React.createElement('div', { key: i, style: { flex: 1, background: t.surface, borderRadius: 14, padding: '12px', boxShadow: t.cardShadow } },
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: 8 } },
              React.createElement('span', { style: { fontSize: 13, color: t.textSec, fontWeight: 500 } }, stat.label),
              React.createElement('span', { style: { fontSize: 14, fontWeight: 800, color: stat.color } }, `${stat.value}%`)
            ),
            React.createElement(ProgressBar, { value: stat.value, color: stat.color })
          )
        )
      ),

      // Planted Species
      React.createElement('div', { style: { padding: '0 16px 28px' } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 } },
          React.createElement('h3', { style: { fontSize: 16, fontWeight: 700, color: t.text } }, `Planted Species (${realm.species.length})`),
          React.createElement('div', { style: { background: t.primaryGrad, borderRadius: 10, padding: '7px 13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 } },
            React.createElement(window.lucide.Plus, { size: 14, color: '#fff' }),
            React.createElement('span', { style: { fontSize: 12, fontWeight: 700, color: '#fff', fontFamily: 'Outfit, sans-serif' } }, 'Plant')
          )
        ),
        realm.species.map((sp, i) =>
          React.createElement('div', { key: i, style: { background: t.surface, borderRadius: 13, padding: '12px 14px', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 12, boxShadow: t.cardShadow } },
            React.createElement('div', { style: { width: 42, height: 42, borderRadius: 12, background: isDark ? sp.color + '25' : sp.colorLight, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 } }, sp.emoji),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('p', { style: { fontSize: 14, fontWeight: 700, color: t.text } }, sp.name),
              React.createElement('p', { style: { fontSize: 12, color: t.textSec } }, `Evolution ${sp.evo} / 3`)
            ),
            React.createElement('div', { style: { display: 'flex', gap: 3 } },
              [1,2,3].map(s => React.createElement('div', { key: s, style: { width: 9, height: 9, borderRadius: 5, background: s <= sp.evo ? sp.color : t.border } }))
            )
          )
        )
      )
    );
  };

  // ── Community Screen ────────────────────────────────────────────────────────

  const CommunityScreen = () => React.createElement('div', { style: { height: '100%', overflowY: 'auto', background: t.bg, fontFamily: 'Outfit, sans-serif' } },

    // Header
    React.createElement('div', { style: { padding: '14px 20px 10px' } },
      React.createElement('h2', { style: { fontSize: 22, fontWeight: 800, color: t.text } }, 'Community'),
      React.createElement('p', { style: { fontSize: 13, color: t.textSec } }, 'Compete for the planet 🌍')
    ),

    // Season Event Banner
    React.createElement('div', { style: { margin: '0 16px 16px', borderRadius: 18, background: 'linear-gradient(135deg,#D97706,#F59E0B,#FCD34D)', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12, boxShadow: '0 4px 18px rgba(245,158,11,0.35)' } },
      React.createElement('span', { style: { fontSize: 34 } }, '🌸'),
      React.createElement('div', { style: { flex: 1 } },
        React.createElement('p', { style: { fontSize: 11, color: 'rgba(255,255,255,0.85)', fontWeight: 700, letterSpacing: '0.05em' } }, 'SEASONAL EVENT'),
        React.createElement('p', { style: { fontSize: 15, fontWeight: 800, color: '#fff' } }, 'Spring Awakening 2026'),
        React.createElement('p', { style: { fontSize: 12, color: 'rgba(255,255,255,0.8)' } }, '14 days remaining · 2× XP active')
      ),
      React.createElement('div', { style: { background: 'rgba(255,255,255,0.25)', borderRadius: 10, padding: '5px 9px' } },
        React.createElement('span', { style: { fontSize: 11, fontWeight: 800, color: '#fff' } }, '● LIVE')
      )
    ),

    // My Team Card
    React.createElement('div', { style: { margin: '0 16px 6px' } },
      React.createElement('p', { style: { fontSize: 12, fontWeight: 700, color: t.textTer, marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' } }, 'Your Team'),
      React.createElement('div', { style: { background: t.surface, borderRadius: 16, padding: '14px', boxShadow: t.cardShadow, border: `2px solid ${t.primary}` } },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 } },
          React.createElement('div', { style: { width: 50, height: 50, borderRadius: 14, background: t.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 } }, '🌲'),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 7, marginBottom: 3 } },
              React.createElement('p', { style: { fontSize: 16, fontWeight: 800, color: t.text } }, 'Forest Guardians'),
              React.createElement('span', { style: { fontSize: 9, fontWeight: 800, color: t.primary, background: t.primaryLight, padding: '2px 6px', borderRadius: 6 } }, 'YOUR TEAM')
            ),
            React.createElement('p', { style: { fontSize: 12, color: t.textSec } }, '31 members · Rank #2 globally')
          )
        ),
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-around', borderTop: `1px solid ${t.border}`, paddingTop: 12 } },
          [
            { label: 'Team Score', value: '7,890', color: t.primary },
            { label: 'Your Contrib.', value: '+530', color: t.text },
            { label: 'Global Rank', value: '2nd 🥈', color: t.accent },
          ].map((s, i) =>
            React.createElement('div', { key: i, style: { textAlign: 'center' } },
              React.createElement('p', { style: { fontSize: 17, fontWeight: 800, color: s.color, lineHeight: 1 } }, s.value),
              React.createElement('p', { style: { fontSize: 11, color: t.textTer, marginTop: 3 } }, s.label)
            )
          )
        )
      )
    ),

    // Leaderboard
    React.createElement('div', { style: { padding: '14px 16px 0' } },
      React.createElement('p', { style: { fontSize: 12, fontWeight: 700, color: t.textTer, marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' } }, 'Global Leaderboard'),
      React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 8 } },
        leaderboard.map(team =>
          React.createElement('div', { key: team.rank, style: { background: team.myTeam ? (isDark ? t.primaryLight : '#F0FDF4') : t.surface, borderRadius: 14, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 11, boxShadow: t.cardShadow, border: team.myTeam ? `1.5px solid ${t.primary}` : `1px solid ${t.border}` } },
            React.createElement('div', { style: { width: 28, textAlign: 'center', flexShrink: 0 } },
              team.rank <= 3
                ? React.createElement('span', { style: { fontSize: 20 } }, ['🥇','🥈','🥉'][team.rank-1])
                : React.createElement('span', { style: { fontSize: 13, fontWeight: 700, color: t.textTer } }, `#${team.rank}`)
            ),
            React.createElement('div', { style: { width: 38, height: 38, borderRadius: 11, background: team.color + '22', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 } }, team.emoji),
            React.createElement('div', { style: { flex: 1, minWidth: 0 } },
              React.createElement('p', { style: { fontSize: 14, fontWeight: 700, color: t.text } }, team.name),
              React.createElement('p', { style: { fontSize: 11, color: t.textSec } }, `${team.members} members`)
            ),
            React.createElement('p', { style: { fontSize: 15, fontWeight: 800, color: team.color } }, team.score.toLocaleString())
          )
        )
      )
    ),

    // CTA
    React.createElement('div', { style: { margin: '14px 16px 28px' } },
      React.createElement('div', { style: { background: t.surface, borderRadius: 16, padding: '14px', boxShadow: t.cardShadow, textAlign: 'center' } },
        React.createElement('p', { style: { fontSize: 14, fontWeight: 700, color: t.text, marginBottom: 3 } }, 'Help your team climb to #1!'),
        React.createElement('p', { style: { fontSize: 12, color: t.textSec, marginBottom: 12 } }, "Complete today's quests to earn team points"),
        React.createElement('div', { style: { background: t.primaryGrad, borderRadius: 13, padding: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: `0 4px 14px ${t.primary}50` } },
          React.createElement(window.lucide.Zap, { size: 16, color: '#fff' }),
          React.createElement('span', { style: { fontSize: 14, fontWeight: 800, color: '#fff', fontFamily: 'Outfit, sans-serif' } }, 'Do Team Quests Now')
        )
      )
    )
  );

  // ── Profile Screen ──────────────────────────────────────────────────────────

  const ProfileScreen = () => React.createElement('div', { style: { height: '100%', overflowY: 'auto', background: t.bg, fontFamily: 'Outfit, sans-serif' } },

    // Hero
    React.createElement('div', { style: { background: t.heroGrad, padding: '22px 20px 36px', textAlign: 'center', position: 'relative', overflow: 'hidden' } },
      React.createElement('div', { style: { position: 'absolute', top: -20, right: -20, fontSize: 110, opacity: 0.08 } }, '🌍'),
      React.createElement('div', { style: { width: 76, height: 76, borderRadius: 38, background: 'rgba(255,255,255,0.2)', border: '3px solid rgba(255,255,255,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 38, margin: '0 auto 10px' } }, '🌿'),
      React.createElement('h2', { style: { fontSize: 21, fontWeight: 800, color: '#fff', marginBottom: 3 } }, 'Alex Chen'),
      React.createElement('p', { style: { fontSize: 13, color: 'rgba(255,255,255,0.8)' } }, 'Level 12 · Eco Champion'),
      React.createElement('div', { style: { display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 4, marginTop: 8 } },
        React.createElement('span', { style: { background: 'rgba(255,255,255,0.2)', color: '#fff', fontSize: 12, fontWeight: 700, padding: '4px 12px', borderRadius: 20, backdropFilter: 'blur(4px)' } }, '🏆 Forest Guardian Rank 2')
      )
    ),

    // Stats Grid
    React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, margin: '-18px 16px 16px', position: 'relative', zIndex: 1 } },
      [
        { label: 'Total Steps',  value: '124,830', icon: window.lucide.Activity,    color: t.primary  },
        { label: 'CO₂ Saved',    value: '18.4 kg', icon: window.lucide.Wind,        color: t.teal     },
        { label: 'Species',      value: '8 / 9',   icon: window.lucide.Leaf,        color: t.accent   },
        { label: 'Challenges',   value: '47 done',  icon: window.lucide.CheckCircle, color: t.purple   },
      ].map((s, i) =>
        React.createElement('div', { key: i, style: { background: t.surface, borderRadius: 14, padding: '14px 12px', boxShadow: t.shadow, display: 'flex', alignItems: 'center', gap: 10 } },
          React.createElement('div', { style: { width: 38, height: 38, borderRadius: 11, background: s.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 } },
            React.createElement(s.icon, { size: 18, color: s.color })
          ),
          React.createElement('div', null,
            React.createElement('p', { style: { fontSize: 16, fontWeight: 800, color: t.text, lineHeight: 1 } }, s.value),
            React.createElement('p', { style: { fontSize: 11, color: t.textTer, marginTop: 3 } }, s.label)
          )
        )
      )
    ),

    // Carbon Impact
    React.createElement('div', { style: { margin: '0 16px 16px', background: t.surface, borderRadius: 16, padding: '14px', boxShadow: t.cardShadow } },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 } },
        React.createElement('p', { style: { fontSize: 14, fontWeight: 700, color: t.text } }, 'Carbon Impact This Month'),
        React.createElement('span', { style: { fontSize: 13, color: t.teal, fontWeight: 700 } }, '18.4 kg saved')
      ),
      React.createElement(ProgressBar, { value: 74, color: t.teal }),
      React.createElement('p', { style: { fontSize: 12, color: t.textSec, marginTop: 8 } }, '74% toward your 25 kg monthly goal 🌱')
    ),

    // Achievements
    React.createElement('div', { style: { padding: '0 16px 16px' } },
      React.createElement('h3', { style: { fontSize: 16, fontWeight: 700, color: t.text, marginBottom: 12 } }, 'Achievements'),
      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 9 } },
        achievements.map((a, i) =>
          React.createElement('div', { key: i, style: { background: a.unlocked ? t.surface : t.surface2, borderRadius: 14, padding: '13px 8px', textAlign: 'center', boxShadow: t.cardShadow, opacity: a.unlocked ? 1 : 0.45, border: a.unlocked ? `1px solid ${t.border}` : 'none' } },
            React.createElement('div', { style: { fontSize: 28, filter: a.unlocked ? 'none' : 'grayscale(100%)', marginBottom: 5, lineHeight: 1 } }, a.emoji),
            React.createElement('p', { style: { fontSize: 10, fontWeight: 700, color: a.unlocked ? t.text : t.textTer, lineHeight: 1.2 } }, a.name)
          )
        )
      )
    ),

    // Settings
    React.createElement('div', { style: { padding: '0 16px 32px' } },
      React.createElement('h3', { style: { fontSize: 16, fontWeight: 700, color: t.text, marginBottom: 12 } }, 'Settings'),
      React.createElement('div', { style: { background: t.surface, borderRadius: 18, overflow: 'hidden', boxShadow: t.cardShadow } },
        [
          {
            label: 'Dark Mode',
            icon: isDark ? window.lucide.Moon : window.lucide.Sun,
            color: t.purple,
            onClick: () => setThemeMode(isDark ? 'light' : 'dark'),
            action: React.createElement('div', {
              onClick: () => setThemeMode(isDark ? 'light' : 'dark'),
              style: { width: 46, height: 27, borderRadius: 14, background: isDark ? t.primary : t.border, cursor: 'pointer', position: 'relative', display: 'flex', alignItems: 'center', padding: '0 3px', transition: 'background 0.3s' }
            },
              React.createElement('div', { style: { width: 21, height: 21, borderRadius: 11, background: '#fff', transition: 'transform 0.3s', transform: `translateX(${isDark ? 19 : 0}px)`, boxShadow: '0 1px 4px rgba(0,0,0,0.25)' } })
            )
          },
          {
            label: 'Notifications', icon: window.lucide.Bell, color: t.accent, onClick: null,
            action: React.createElement('div', { style: { width: 46, height: 27, borderRadius: 14, background: t.primary, cursor: 'pointer', position: 'relative', display: 'flex', alignItems: 'center', padding: '0 3px' } },
              React.createElement('div', { style: { width: 21, height: 21, borderRadius: 11, background: '#fff', transform: 'translateX(19px)', boxShadow: '0 1px 4px rgba(0,0,0,0.25)' } })
            )
          },
          { label: 'Privacy',       icon: window.lucide.Shield,      color: t.blue,   onClick: null, action: React.createElement(window.lucide.ChevronRight, { size: 18, color: t.textTer }) },
          { label: 'Help & Support',icon: window.lucide.HelpCircle,  color: t.teal,   onClick: null, action: React.createElement(window.lucide.ChevronRight, { size: 18, color: t.textTer }) },
        ].map((s, i, arr) =>
          React.createElement('div', { key: i, onClick: s.onClick || undefined, style: { display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', borderBottom: i < arr.length - 1 ? `1px solid ${t.border}` : 'none', cursor: s.onClick ? 'pointer' : 'default' } },
            React.createElement('div', { style: { width: 36, height: 36, borderRadius: 11, background: s.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center' } },
              React.createElement(s.icon, { size: 17, color: s.color })
            ),
            React.createElement('p', { style: { flex: 1, fontSize: 14, fontWeight: 500, color: t.text } }, s.label),
            s.action
          )
        )
      )
    )
  );

  // ── Navigation ──────────────────────────────────────────────────────────────

  const tabs = [
    { id: 'home',      label: 'Home',      icon: window.lucide.Home  },
    { id: 'collect',   label: 'Collect',   icon: window.lucide.Leaf  },
    { id: 'realm',     label: 'Realm',     icon: window.lucide.Globe },
    { id: 'community', label: 'Community', icon: window.lucide.Users },
    { id: 'profile',   label: 'Profile',   icon: window.lucide.User  },
  ];

  const screens = {
    home:      HomeScreen,
    collect:   CollectScreen,
    realm:     RealmScreen,
    community: CommunityScreen,
    profile:   ProfileScreen,
  };

  // ── Render ──────────────────────────────────────────────────────────────────

  return React.createElement('div', {
    style: { background: '#D1EDD6', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Outfit, sans-serif' }
  },
    React.createElement('style', null, `
      @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');
      * { box-sizing: border-box; margin: 0; padding: 0; }
      ::-webkit-scrollbar { display: none; }
      button { font-family: 'Outfit', sans-serif; }
    `),

    // Phone Frame
    React.createElement('div', {
      style: {
        width: 375, height: 812,
        background: t.bg,
        borderRadius: 52,
        overflow: 'hidden',
        boxShadow: '0 35px 90px rgba(0,0,0,0.30), inset 0 1px 0 rgba(255,255,255,0.4)',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        border: '8px solid #1C1C1E',
      }
    },

      // Dynamic Island
      React.createElement('div', { style: { position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)', width: 122, height: 36, background: '#000', borderRadius: 22, zIndex: 100 } }),

      // Status Bar
      React.createElement('div', {
        style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '54px 22px 0', paddingBottom: 0, fontSize: 12, fontWeight: 700, color: t.text, flexShrink: 0, paddingTop: 54 }
      },
        React.createElement('span', null, '9:41'),
        React.createElement('div', { style: { display: 'flex', gap: 5, alignItems: 'center' } },
          React.createElement(window.lucide.Wifi, { size: 14, color: t.text }),
          React.createElement(window.lucide.Battery, { size: 15, color: t.text })
        )
      ),

      // Screen Content
      React.createElement('div', { style: { flex: 1, overflow: 'hidden', minHeight: 0 } },
        React.createElement(screens[activeTab])
      ),

      // Bottom Navigation
      React.createElement('div', {
        style: { background: t.navBg, borderTop: `1px solid ${t.navBorder}`, display: 'flex', paddingBottom: 18, paddingTop: 8, flexShrink: 0 }
      },
        tabs.map(tab => {
          const isActive = activeTab === tab.id;
          const navItemStyle = {
            flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
            gap: 3, cursor: 'pointer', padding: '4px 0', transition: 'all 0.2s',
          };
          const labelStyle = {
            fontSize: 10, fontWeight: isActive ? 700 : 400,
            color: isActive ? t.primary : t.textTer,
            fontFamily: 'Outfit, sans-serif',
          };
          return React.createElement('div', {
            key: tab.id,
            onClick: () => setActiveTab(tab.id),
            style: navItemStyle,
          },
            React.createElement(tab.icon, { size: 22, color: isActive ? t.primary : t.textTer, strokeWidth: isActive ? 2.5 : 1.5 }),
            React.createElement('span', { style: labelStyle }, tab.label)
          );
        })
      )
    )
  );
}
