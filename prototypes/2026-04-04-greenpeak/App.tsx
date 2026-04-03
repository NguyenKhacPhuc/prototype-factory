const { useState, useEffect, useRef } = React;

const themes = {
  light: {
    bg: '#F5EFE6',
    surface: '#FEFCF8',
    card: '#FFFFFF',
    primary: '#2D6A4F',
    primaryLight: '#52B788',
    secondary: '#52796F',
    accent: '#F4A261',
    accentLight: '#FEF0E0',
    text: '#1A2E22',
    textSecondary: '#52796F',
    textMuted: '#8FAF9B',
    border: '#D8E8DE',
    navBg: '#FFFFFF',
    statusBar: '#1A2E22',
    shadow: 'rgba(45,106,79,0.15)',
    heroStart: '#1B4332',
    heroEnd: '#2D6A4F',
  },
  dark: {
    bg: '#0D1F15',
    surface: '#152519',
    card: '#1A2E22',
    primary: '#52B788',
    primaryLight: '#74C69D',
    secondary: '#74C69D',
    accent: '#F4A261',
    accentLight: '#2A1A08',
    text: '#D8F3DC',
    textSecondary: '#95D5B2',
    textMuted: '#52796F',
    border: '#1F3D2A',
    navBg: '#0D1F15',
    statusBar: '#D8F3DC',
    shadow: 'rgba(0,0,0,0.4)',
    heroStart: '#071810',
    heroEnd: '#0D2818',
  }
};

function HomeScreen({ t }) {
  const recentBadges = [
    { id: 1, emoji: '🌿', name: 'Forest Keeper', rarity: 'rare', earned: true },
    { id: 2, emoji: '☀️', name: 'Solar Scout', rarity: 'common', earned: true },
    { id: 3, emoji: '🌊', name: 'Ocean Guard', rarity: 'epic', earned: false },
  ];
  const ecoItems = [
    { emoji: '🌲', size: 26, y: -10, rot: -3, delay: '0s' },
    { emoji: '🌿', size: 20, y: -5, rot: 2, delay: '0.4s' },
    { emoji: '🌺', size: 22, y: -14, rot: -1, delay: '0.7s' },
    { emoji: '🦋', size: 16, y: -6, rot: 5, delay: '1s' },
    { emoji: '🌱', size: 30, y: -18, rot: -2, delay: '0.2s' },
    { emoji: '🌳', size: 18, y: -3, rot: 3, delay: '0.8s' },
    { emoji: '☀️', size: 20, y: -11, rot: 0, delay: '0.5s' },
  ];
  return React.createElement('div', { style: { height: '100%', overflowY: 'auto', background: t.bg } },
    React.createElement('div', {
      style: { background: 'linear-gradient(155deg, ' + t.heroStart + ' 0%, ' + t.heroEnd + ' 100%)', padding: '10px 20px 28px', position: 'relative', overflow: 'hidden' }
    },
      React.createElement('div', { style: { position: 'absolute', top: 45, right: -15, width: 110, height: 110, background: 'rgba(82,183,136,0.22)', borderRadius: '60% 40% 70% 30% / 50% 60% 40% 50%' } }),
      React.createElement('div', { style: { position: 'absolute', bottom: -18, left: -8, width: 85, height: 85, background: 'rgba(244,162,97,0.15)', borderRadius: '40% 60% 30% 70% / 60% 40% 70% 30%' } }),
      React.createElement('div', { style: { position: 'absolute', top: 25, left: 90, width: 55, height: 55, background: 'rgba(116,198,157,0.12)', borderRadius: '70% 30% 50% 50% / 30% 70% 50% 50%' } }),
      React.createElement('div', { style: { position: 'relative', zIndex: 2 } },
        React.createElement('p', { style: { color: 'rgba(255,255,255,0.62)', fontSize: 12, margin: '0 0 2px', fontFamily: 'Lora, serif', fontStyle: 'italic' } }, 'Good morning, EcoRanger'),
        React.createElement('h1', { style: { color: '#fff', fontSize: 22, fontWeight: 700, margin: '0 0 8px', fontFamily: 'Lora, serif' } }, "Alex's Ecosystem 🌿"),
        React.createElement('div', { style: { display: 'flex', gap: 8, flexWrap: 'wrap' } },
          React.createElement('span', { style: { background: t.accent, color: '#fff', borderRadius: 20, padding: '3px 10px', fontSize: 11, fontWeight: 700, fontFamily: 'Lora, serif' } }, '🔥 23 Day Streak'),
          React.createElement('span', { style: { background: 'rgba(255,255,255,0.15)', color: '#fff', borderRadius: 20, padding: '3px 10px', fontSize: 11, fontFamily: 'Lora, serif' } }, 'Level 12 EcoRanger')
        )
      ),
      React.createElement('div', { style: { height: 90, display: 'flex', alignItems: 'flex-end', gap: 5, paddingLeft: 2, marginTop: 14, position: 'relative', zIndex: 2 } },
        ecoItems.map(function(item, i) {
          return React.createElement('div', { key: i, style: { animation: 'ecoBounce 3.5s ease-in-out ' + item.delay + ' infinite alternate' } },
            React.createElement('div', { style: { fontSize: item.size, transform: 'translateY(' + item.y + 'px) rotate(' + item.rot + 'deg)', filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.3))' } }, item.emoji)
          );
        })
      )
    ),
    React.createElement('div', { style: { padding: '0 15px', marginTop: -16, position: 'relative', zIndex: 5 } },
      React.createElement('div', {
        style: { background: t.card, borderRadius: '20px 20px 20px 5px', padding: '15px 16px', marginBottom: -16, marginRight: 18, position: 'relative', zIndex: 2, boxShadow: '0 6px 20px ' + t.shadow, border: '2px solid ' + t.border, transform: 'rotate(-0.7deg)' }
      },
        React.createElement('span', { style: { fontSize: 9, color: t.accent, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.2, fontFamily: 'Lora, serif' } }, "🗺️ Today's Quest"),
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 5 } },
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('h3', { style: { color: t.text, fontSize: 14, fontWeight: 700, margin: '0 0 3px', fontFamily: 'Lora, serif' } }, '🚴 Pedal Power Challenge'),
            React.createElement('p', { style: { color: t.textSecondary, fontSize: 11, margin: 0, fontFamily: 'Lora, serif' } }, 'Bike 5km instead of driving')
          ),
          React.createElement('div', { style: { width: 40, height: 40, background: t.primary, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, marginLeft: 8, flexShrink: 0 } }, '🌿')
        ),
        React.createElement('div', { style: { marginTop: 10, background: t.border, borderRadius: 10, height: 5 } },
          React.createElement('div', { style: { width: '60%', background: 'linear-gradient(90deg, ' + t.primary + ', ' + t.accent + ')', borderRadius: 10, height: 5 } })
        ),
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginTop: 4 } },
          React.createElement('span', { style: { fontSize: 10, color: t.textMuted, fontFamily: 'Lora, serif' } }, '3 of 5km done'),
          React.createElement('span', { style: { fontSize: 10, color: t.primary, fontWeight: 700, fontFamily: 'Lora, serif' } }, '60%')
        )
      ),
      React.createElement('div', {
        style: { background: t.accent, borderRadius: '5px 20px 20px 20px', padding: '14px 16px', marginLeft: 18, position: 'relative', zIndex: 3, boxShadow: '0 10px 28px rgba(244,162,97,0.38)', transform: 'rotate(0.6deg)' }
      },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 11 } },
          React.createElement('div', { style: { fontSize: 36, filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' } }, '🦋'),
          React.createElement('div', null,
            React.createElement('p', { style: { fontSize: 9, color: 'rgba(255,255,255,0.78)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, margin: '0 0 3px', fontFamily: 'Lora, serif' } }, '✨ New Badge Earned!'),
            React.createElement('h3', { style: { color: '#fff', fontSize: 14, fontWeight: 700, margin: '0 0 5px', fontFamily: 'Lora, serif' } }, 'Meadow Butterfly'),
            React.createElement('span', { style: { background: 'rgba(255,255,255,0.28)', color: '#fff', borderRadius: 10, padding: '2px 8px', fontSize: 10, fontFamily: 'Lora, serif' } }, '⭐ Rare Collection')
          )
        )
      )
    ),
    React.createElement('div', { style: { padding: '22px 15px 0' } },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 11 } },
        React.createElement('h2', { style: { color: t.text, fontSize: 15, fontWeight: 700, margin: 0, fontFamily: 'Lora, serif' } }, 'My EcoBadges'),
        React.createElement('span', { style: { color: t.primary, fontSize: 12, fontWeight: 700, fontFamily: 'Lora, serif' } }, 'See All →')
      ),
      React.createElement('div', { style: { display: 'flex', gap: 9 } },
        recentBadges.map(function(badge, i) {
          return React.createElement('div', {
            key: badge.id,
            style: { flex: 1, background: badge.earned ? t.surface : t.border, borderRadius: i === 0 ? '14px 14px 14px 4px' : i === 1 ? '14px' : '4px 14px 14px 14px', padding: '12px 8px', textAlign: 'center', border: '2px solid ' + (badge.earned ? t.primary + '55' : 'transparent'), opacity: badge.earned ? 1 : 0.5, transform: 'rotate(' + [-0.4, 0, 0.4][i] + 'deg)' }
          },
            React.createElement('div', { style: { fontSize: 28, marginBottom: 5, filter: badge.earned ? 'none' : 'grayscale(1)' } }, badge.earned ? badge.emoji : '🔒'),
            React.createElement('div', { style: { color: t.text, fontSize: 10, fontWeight: 600, fontFamily: 'Lora, serif' } }, badge.name),
            React.createElement('div', { style: { color: badge.rarity === 'epic' ? '#8B5CF6' : badge.rarity === 'rare' ? t.accent : t.textMuted, fontSize: 9, fontWeight: 700, fontFamily: 'Lora, serif', marginTop: 2 } }, badge.rarity.toUpperCase())
          );
        })
      )
    ),
    React.createElement('div', {
      style: { margin: '20px 15px 24px', background: 'linear-gradient(140deg, ' + t.primary + ' 0%, #1B4332 100%)', borderRadius: '20px 20px 20px 5px', padding: 16 }
    },
      React.createElement('h3', { style: { color: '#fff', fontSize: 13, fontWeight: 700, margin: '0 0 12px', fontFamily: 'Lora, serif' } }, "🌍 This Week's Impact"),
      React.createElement('div', { style: { display: 'flex', gap: 8 } },
        [{ label: 'CO₂ Saved', value: '4.2kg', emoji: '💨' }, { label: 'Trees', value: '2', emoji: '🌳' }, { label: 'Points', value: '840', emoji: '⚡' }].map(function(s, i) {
          return React.createElement('div', { key: i, style: { flex: 1, background: 'rgba(255,255,255,0.13)', borderRadius: 11, padding: '9px 5px', textAlign: 'center' } },
            React.createElement('div', { style: { fontSize: 18 } }, s.emoji),
            React.createElement('div', { style: { color: '#fff', fontSize: 15, fontWeight: 700, fontFamily: 'Lora, serif' } }, s.value),
            React.createElement('div', { style: { color: 'rgba(255,255,255,0.68)', fontSize: 9, fontFamily: 'Lora, serif' } }, s.label)
          );
        })
      )
    )
  );
}

function QuestsScreen({ t }) {
  const [filter, setFilter] = useState('active');
  const quests = [
    { id: 1, emoji: '🚴', title: 'Pedal Power Challenge', desc: 'Bike 5km instead of driving today', progress: 60, reward: '🌿 Forest Badge', xp: 150, done: false },
    { id: 2, emoji: '🥦', title: 'Plant-Based Food Day', desc: 'Eat only plant-based meals for a day', progress: 100, reward: '🌱 Sprout Badge', xp: 100, done: true },
    { id: 3, emoji: '🏃', title: 'Morning Sun Quest', desc: 'Run 3km before 9am for 5 days', progress: 33, reward: '☀️ Solar Badge', xp: 120, done: false },
    { id: 4, emoji: '🌊', title: 'Beach Cleanup Hero', desc: 'Join a local beach cleanup event', progress: 0, reward: '🌊 Ocean Guard', xp: 300, done: false },
    { id: 5, emoji: '♻️', title: 'Zero Waste Wednesday', desc: 'Generate less than 100g of trash today', progress: 75, reward: '🔮 Cycle Badge', xp: 200, done: false },
  ];
  var filtered = quests.filter(function(q) {
    return filter === 'all' ? true : filter === 'active' ? !q.done && q.progress < 100 : q.done || q.progress === 100;
  });
  return React.createElement('div', { style: { height: '100%', overflowY: 'auto', background: t.bg, paddingBottom: 24 } },
    React.createElement('div', { style: { padding: '10px 16px 0' } },
      React.createElement('h1', { style: { color: t.text, fontSize: 22, fontWeight: 700, margin: '0 0 2px', fontFamily: 'Lora, serif' } }, 'GreenQuests'),
      React.createElement('p', { style: { color: t.textSecondary, fontSize: 12, margin: '0 0 14px', fontFamily: 'Lora, serif', fontStyle: 'italic' } }, 'Complete challenges · Earn EcoBadges')
    ),
    React.createElement('div', {
      style: { margin: '0 16px 18px', background: 'linear-gradient(130deg, #1B4332 0%, ' + t.primary + ' 100%)', borderRadius: '20px 20px 20px 5px', padding: '16px 18px', position: 'relative', overflow: 'hidden', transform: 'rotate(-0.4deg)' }
    },
      React.createElement('div', { style: { position: 'absolute', right: -15, top: -15, width: 80, height: 80, background: 'rgba(244,162,97,0.18)', borderRadius: '50%' } }),
      React.createElement('div', { style: { position: 'absolute', left: 50, bottom: -25, width: 60, height: 60, background: 'rgba(116,198,157,0.1)', borderRadius: '40% 60% 30% 70%' } }),
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 1 } },
        React.createElement('div', null,
          React.createElement('span', { style: { background: t.accent, color: '#fff', borderRadius: 10, padding: '2px 8px', fontSize: 9, fontWeight: 700, fontFamily: 'Lora, serif', letterSpacing: 0.5 } }, '🌍 SEASONAL EVENT'),
          React.createElement('h3', { style: { color: '#fff', fontSize: 15, fontWeight: 700, margin: '5px 0 3px', fontFamily: 'Lora, serif' } }, 'Earth Day Festival'),
          React.createElement('p', { style: { color: 'rgba(255,255,255,0.72)', fontSize: 11, margin: 0, fontFamily: 'Lora, serif' } }, 'Limited quests until April 22nd')
        ),
        React.createElement('div', { style: { textAlign: 'center', paddingRight: 4 } },
          React.createElement('div', { style: { fontSize: 40 } }, '🦋'),
          React.createElement('div', { style: { color: t.accent, fontSize: 11, fontWeight: 700, fontFamily: 'Lora, serif' } }, '18 days left')
        )
      )
    ),
    React.createElement('div', { style: { display: 'flex', gap: 7, padding: '0 16px', marginBottom: 14 } },
      ['active', 'completed', 'all'].map(function(f) {
        return React.createElement('button', {
          key: f, onClick: function() { setFilter(f); },
          style: { padding: '5px 13px', borderRadius: 20, border: '2px solid ' + (filter === f ? t.primary : t.border), background: filter === f ? t.primary : 'transparent', color: filter === f ? '#fff' : t.textSecondary, fontSize: 11, fontWeight: 600, cursor: 'pointer', fontFamily: 'Lora, serif' }
        }, f.charAt(0).toUpperCase() + f.slice(1));
      })
    ),
    React.createElement('div', { style: { padding: '0 16px', display: 'flex', flexDirection: 'column' } },
      filtered.map(function(quest, i) {
        return React.createElement('div', {
          key: quest.id,
          style: { background: quest.done ? t.primary + '18' : t.card, borderRadius: i % 2 === 0 ? '18px 18px 18px 5px' : '18px 18px 5px 18px', padding: 14, marginBottom: i < filtered.length - 1 ? -7 : 0, marginLeft: i % 2 === 0 ? 0 : 12, marginRight: i % 2 === 0 ? 12 : 0, position: 'relative', zIndex: filtered.length - i, boxShadow: '0 4px 14px ' + t.shadow, border: '2px solid ' + (quest.done ? t.primary + '45' : t.border), transform: 'rotate(' + (i % 2 === 0 ? '-0.4deg' : '0.4deg') + ')' }
        },
          React.createElement('div', { style: { display: 'flex', gap: 10, alignItems: 'flex-start' } },
            React.createElement('div', { style: { width: 42, height: 42, background: quest.done ? t.primary : t.accentLight, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 19, flexShrink: 0 } }, quest.emoji),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between' } },
                React.createElement('h3', { style: { color: t.text, fontSize: 12, fontWeight: 700, margin: 0, fontFamily: 'Lora, serif', flex: 1, paddingRight: 6 } }, quest.title),
                React.createElement('span', { style: { color: t.accent, fontSize: 10, fontWeight: 700, fontFamily: 'Lora, serif', whiteSpace: 'nowrap' } }, '+' + quest.xp + 'XP')
              ),
              React.createElement('p', { style: { color: t.textSecondary, fontSize: 10, margin: '3px 0 6px', fontFamily: 'Lora, serif' } }, quest.desc),
              React.createElement('div', { style: { background: t.border, borderRadius: 10, height: 4 } },
                React.createElement('div', { style: { width: quest.progress + '%', background: quest.done ? t.primary : 'linear-gradient(90deg, ' + t.primary + ', ' + t.accent + ')', borderRadius: 10, height: 4 } })
              ),
              React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginTop: 4 } },
                React.createElement('span', { style: { fontSize: 9, color: t.textMuted, fontFamily: 'Lora, serif' } }, quest.reward),
                React.createElement('span', { style: { fontSize: 9, color: quest.done ? t.primary : t.textMuted, fontWeight: quest.done ? 700 : 400, fontFamily: 'Lora, serif' } }, quest.done ? '✓ Complete!' : quest.progress + '%')
              )
            )
          )
        );
      })
    )
  );
}

function CollectionScreen({ t }) {
  const [category, setCategory] = useState('all');
  const [selectedBadge, setSelectedBadge] = useState(null);
  var badges = [
    { id: 1, emoji: '🌿', name: 'Forest Keeper', rarity: 'rare', earned: true, cat: 'nature', desc: 'Completed 10 forest walks', project: 'Amazon Reforestation' },
    { id: 2, emoji: '☀️', name: 'Solar Scout', rarity: 'common', earned: true, cat: 'energy', desc: 'Used solar energy 7 days', project: 'Solar Village Africa' },
    { id: 3, emoji: '🌊', name: 'Ocean Guardian', rarity: 'epic', earned: false, cat: 'water', desc: 'Join 3 ocean cleanup events', project: 'Pacific Cleanup' },
    { id: 4, emoji: '🦋', name: 'Meadow Butterfly', rarity: 'rare', earned: true, cat: 'nature', desc: 'Completed the wildflower trail', project: 'Pollinator Pathways' },
    { id: 5, emoji: '🌱', name: 'Seedling Scout', rarity: 'common', earned: true, cat: 'nature', desc: 'Planted 5 community seeds', project: 'Urban Greening' },
    { id: 6, emoji: '⚡', name: 'Energy Saver', rarity: 'uncommon', earned: true, cat: 'energy', desc: 'Reduced energy use by 20%', project: 'Clean Grid Initiative' },
    { id: 7, emoji: '🌍', name: 'Earth Champion', rarity: 'legendary', earned: false, cat: 'special', desc: 'Complete all Earth Day challenges', project: 'Global Climate Fund' },
    { id: 8, emoji: '🦅', name: 'Sky Watcher', rarity: 'uncommon', earned: false, cat: 'nature', desc: 'Document 20 bird species', project: 'Bird Migration Atlas' },
    { id: 9, emoji: '🌺', name: 'Garden Master', rarity: 'rare', earned: true, cat: 'nature', desc: 'Grew 10 types of plants', project: 'Community Gardens' },
  ];
  var rarityColor = { common: '#8FAF9B', uncommon: '#52796F', rare: '#F4A261', epic: '#8B5CF6', legendary: '#F39C12' };
  var cats = ['all', 'nature', 'energy', 'water', 'special'];
  var filtered = category === 'all' ? badges : badges.filter(function(b) { return b.cat === category; });
  var earned = badges.filter(function(b) { return b.earned; }).length;
  return React.createElement('div', { style: { height: '100%', overflowY: 'auto', background: t.bg, paddingBottom: 24 } },
    React.createElement('div', { style: { padding: '10px 16px 0' } },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 } },
        React.createElement('div', null,
          React.createElement('h1', { style: { color: t.text, fontSize: 22, fontWeight: 700, margin: '0 0 2px', fontFamily: 'Lora, serif' } }, 'EcoBadges'),
          React.createElement('p', { style: { color: t.textSecondary, fontSize: 12, margin: 0, fontFamily: 'Lora, serif', fontStyle: 'italic' } }, earned + ' of ' + badges.length + ' collected')
        ),
        React.createElement('div', { style: { background: t.primary, borderRadius: 18, padding: '8px 14px', textAlign: 'center' } },
          React.createElement('div', { style: { color: '#fff', fontSize: 17, fontWeight: 700, fontFamily: 'Lora, serif' } }, Math.round(earned / badges.length * 100) + '%'),
          React.createElement('div', { style: { color: 'rgba(255,255,255,0.75)', fontSize: 9, fontFamily: 'Lora, serif' } }, 'Complete')
        )
      ),
      React.createElement('div', { style: { background: t.border, borderRadius: 10, height: 5, marginBottom: 14 } },
        React.createElement('div', { style: { width: (earned / badges.length * 100) + '%', background: 'linear-gradient(90deg, ' + t.primary + ', ' + t.accent + ')', borderRadius: 10, height: 5 } })
      )
    ),
    React.createElement('div', { style: { display: 'flex', gap: 6, padding: '0 16px', marginBottom: 14, overflowX: 'auto' } },
      cats.map(function(cat) {
        return React.createElement('button', {
          key: cat, onClick: function() { setCategory(cat); },
          style: { padding: '5px 12px', borderRadius: 20, border: '2px solid ' + (category === cat ? t.primary : t.border), background: category === cat ? t.primary : 'transparent', color: category === cat ? '#fff' : t.textSecondary, fontSize: 11, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap', fontFamily: 'Lora, serif' }
        }, cat.charAt(0).toUpperCase() + cat.slice(1));
      })
    ),
    selectedBadge ? React.createElement('div', {
      style: { margin: '0 16px 14px', background: t.card, borderRadius: 18, padding: 16, border: '3px solid ' + rarityColor[selectedBadge.rarity], boxShadow: '0 6px 20px ' + t.shadow }
    },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' } },
        React.createElement('div', { style: { display: 'flex', gap: 12, alignItems: 'center' } },
          React.createElement('div', { style: { fontSize: 44 } }, selectedBadge.emoji),
          React.createElement('div', null,
            React.createElement('h3', { style: { color: t.text, fontSize: 15, fontWeight: 700, margin: '0 0 4px', fontFamily: 'Lora, serif' } }, selectedBadge.name),
            React.createElement('span', { style: { background: rarityColor[selectedBadge.rarity] + '28', color: rarityColor[selectedBadge.rarity], borderRadius: 10, padding: '2px 8px', fontSize: 10, fontWeight: 700, fontFamily: 'Lora, serif' } }, selectedBadge.rarity.toUpperCase())
          )
        ),
        React.createElement('button', {
          onClick: function() { setSelectedBadge(null); },
          style: { background: t.border, border: 'none', borderRadius: '50%', width: 26, height: 26, cursor: 'pointer', color: t.text, fontSize: 15, display: 'flex', alignItems: 'center', justifyContent: 'center' }
        }, '×')
      ),
      React.createElement('p', { style: { color: t.textSecondary, fontSize: 12, margin: '10px 0 4px', fontFamily: 'Lora, serif' } }, selectedBadge.desc),
      React.createElement('p', { style: { color: t.primary, fontSize: 11, fontWeight: 600, margin: 0, fontFamily: 'Lora, serif' } }, '🌍 Linked to: ' + selectedBadge.project)
    ) : null,
    React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, padding: '0 16px' } },
      filtered.map(function(badge, i) {
        return React.createElement('div', {
          key: badge.id,
          onClick: function() { setSelectedBadge(badge.earned ? badge : null); },
          style: { background: badge.earned ? t.card : t.surface, borderRadius: i % 3 === 0 ? '16px 16px 16px 4px' : i % 3 === 1 ? '16px' : '4px 16px 16px 16px', padding: '13px 8px', textAlign: 'center', cursor: badge.earned ? 'pointer' : 'default', border: '2px solid ' + (badge.earned ? rarityColor[badge.rarity] + '60' : t.border), opacity: badge.earned ? 1 : 0.5, transform: 'rotate(' + [-0.4, 0, 0.4][i % 3] + 'deg)' }
        },
          React.createElement('div', { style: { fontSize: 30, marginBottom: 6, filter: badge.earned ? 'none' : 'grayscale(1) opacity(0.5)' } }, badge.earned ? badge.emoji : '🔒'),
          React.createElement('div', { style: { color: t.text, fontSize: 9, fontWeight: 600, lineHeight: 1.3, fontFamily: 'Lora, serif' } }, badge.name),
          React.createElement('div', { style: { color: rarityColor[badge.rarity], fontSize: 8, fontWeight: 700, marginTop: 2, fontFamily: 'Lora, serif' } }, badge.rarity.toUpperCase())
        );
      })
    )
  );
}

function ImpactScreen({ t }) {
  var stats = [
    { label: 'CO₂ Avoided', value: '48.3kg', emoji: '💨', change: '+4.2kg this week' },
    { label: 'Active Days', value: '87', emoji: '📅', change: '23 day streak 🔥' },
    { label: 'Trees Planted', value: '12', emoji: '🌳', change: '+2 this week' },
    { label: 'Km Cycled', value: '234', emoji: '🚴', change: '+18km this week' },
  ];
  var projects = [
    { emoji: '🌳', title: 'Amazon Reforestation', org: 'TreeCorp Brazil', mine: '12 trees', total: '4,847 trees', prog: 72, color: '#2D6A4F' },
    { emoji: '🌊', title: 'Pacific Cleanup Initiative', org: 'OceanFirst NGO', mine: '2.3kg plastic', total: '18.7 tonnes', prog: 45, color: '#1E6091' },
    { emoji: '⚡', title: 'Solar Village Project', org: 'SunPower Africa', mine: '8.4 kWh', total: '12,000 kWh', prog: 28, color: '#F4A261' },
  ];
  var corners = ['18px 18px 18px 5px', '18px 18px 5px 18px', '18px 5px 18px 18px', '5px 18px 18px 18px'];
  var rotations = [-0.5, 0.5, 0.3, -0.3];
  return React.createElement('div', { style: { height: '100%', overflowY: 'auto', background: t.bg, paddingBottom: 24 } },
    React.createElement('div', { style: { padding: '10px 16px 16px' } },
      React.createElement('h1', { style: { color: t.text, fontSize: 22, fontWeight: 700, margin: '0 0 2px', fontFamily: 'Lora, serif' } }, 'Your Impact'),
      React.createElement('p', { style: { color: t.textSecondary, fontSize: 12, margin: 0, fontFamily: 'Lora, serif', fontStyle: 'italic' } }, 'Your choices are changing the world')
    ),
    React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, padding: '0 16px', marginBottom: 22 } },
      stats.map(function(s, i) {
        return React.createElement('div', {
          key: i,
          style: { background: t.card, borderRadius: corners[i], padding: '14px 12px', border: '2px solid ' + t.border, transform: 'rotate(' + rotations[i] + 'deg)', boxShadow: '0 3px 12px ' + t.shadow }
        },
          React.createElement('div', { style: { fontSize: 22, marginBottom: 5 } }, s.emoji),
          React.createElement('div', { style: { color: t.text, fontSize: 22, fontWeight: 700, fontFamily: 'Lora, serif' } }, s.value),
          React.createElement('div', { style: { color: t.textSecondary, fontSize: 11, margin: '2px 0', fontFamily: 'Lora, serif' } }, s.label),
          React.createElement('div', { style: { color: t.primary, fontSize: 10, fontWeight: 600, fontFamily: 'Lora, serif' } }, s.change)
        );
      })
    ),
    React.createElement('div', { style: { padding: '0 16px' } },
      React.createElement('h2', { style: { color: t.text, fontSize: 16, fontWeight: 700, margin: '0 0 12px', fontFamily: 'Lora, serif' } }, 'Partnered Projects'),
      projects.map(function(p, i) {
        return React.createElement('div', {
          key: p.title,
          style: { background: t.card, borderRadius: i % 2 === 0 ? '18px 18px 18px 5px' : '18px 5px 18px 18px', padding: 15, marginBottom: 11, border: '2px solid ' + t.border, boxShadow: '0 4px 12px ' + t.shadow }
        },
          React.createElement('div', { style: { display: 'flex', gap: 11, alignItems: 'center', marginBottom: 10 } },
            React.createElement('div', { style: { width: 44, height: 44, background: p.color + '20', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 } }, p.emoji),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('h3', { style: { color: t.text, fontSize: 13, fontWeight: 700, margin: '0 0 2px', fontFamily: 'Lora, serif' } }, p.title),
              React.createElement('p', { style: { color: t.textSecondary, fontSize: 11, margin: 0, fontFamily: 'Lora, serif' } }, p.org)
            )
          ),
          React.createElement('div', { style: { background: t.border, borderRadius: 10, height: 5, marginBottom: 7 } },
            React.createElement('div', { style: { width: p.prog + '%', background: p.color, borderRadius: 10, height: 5 } })
          ),
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between' } },
            React.createElement('span', { style: { fontSize: 11, color: t.primary, fontWeight: 600, fontFamily: 'Lora, serif' } }, 'My: ' + p.mine),
            React.createElement('span', { style: { fontSize: 11, color: t.textMuted, fontFamily: 'Lora, serif' } }, 'Total: ' + p.total)
          )
        );
      })
    )
  );
}

function SettingsScreen({ t, isDark, setIsDark }) {
  const [notifications, setNotifications] = useState(true);
  const [weeklyGoal, setWeeklyGoal] = useState(true);
  const [socialShare, setSocialShare] = useState(false);

  function Toggle(props) {
    return React.createElement('div', {
      onClick: props.onToggle,
      style: { width: 42, height: 23, background: props.value ? t.primary : t.border, borderRadius: 12, position: 'relative', cursor: 'pointer', transition: 'background 0.25s', flexShrink: 0 }
    },
      React.createElement('div', {
        style: { position: 'absolute', top: 2, left: props.value ? 21 : 2, width: 19, height: 19, background: '#fff', borderRadius: '50%', transition: 'left 0.25s', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }
      })
    );
  }

  function SettingsSection(props) {
    return React.createElement('div', { style: { marginBottom: 20 } },
      React.createElement('p', { style: { color: t.textMuted, fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.2, margin: '0 0 8px 4px', fontFamily: 'Lora, serif' } }, props.title),
      React.createElement('div', { style: { background: t.card, borderRadius: 16, overflow: 'hidden', border: '2px solid ' + t.border } },
        props.items.map(function(item, ii) {
          return React.createElement('div', {
            key: ii,
            style: { padding: '13px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: ii < props.items.length - 1 ? '1px solid ' + t.border : 'none' }
          },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10 } },
              React.createElement('span', { style: { fontSize: 16 } }, item.icon),
              React.createElement('span', { style: { color: t.text, fontSize: 14, fontFamily: 'Lora, serif' } }, item.label)
            ),
            item.toggle ? React.createElement(Toggle, { value: item.value, onToggle: item.toggle }) :
              React.createElement('span', { style: { color: t.textMuted, fontSize: 18 } }, '›')
          );
        })
      )
    );
  }

  return React.createElement('div', { style: { height: '100%', overflowY: 'auto', background: t.bg, paddingBottom: 24 } },
    React.createElement('div', {
      style: { margin: '10px 16px 20px', background: 'linear-gradient(140deg, ' + t.primary + ' 0%, #1B4332 100%)', borderRadius: '20px 20px 20px 5px', padding: '18px 20px', display: 'flex', gap: 14, alignItems: 'center' }
    },
      React.createElement('div', { style: { width: 58, height: 58, background: 'rgba(255,255,255,0.18)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 30 } }, '🌿'),
      React.createElement('div', null,
        React.createElement('h2', { style: { color: '#fff', fontSize: 17, fontWeight: 700, margin: '0 0 2px', fontFamily: 'Lora, serif' } }, 'Alex Green'),
        React.createElement('p', { style: { color: 'rgba(255,255,255,0.75)', fontSize: 12, margin: '0 0 7px', fontFamily: 'Lora, serif' } }, 'Level 12 EcoRanger'),
        React.createElement('div', { style: { display: 'flex', gap: 6 } },
          React.createElement('span', { style: { background: 'rgba(255,255,255,0.18)', color: '#fff', borderRadius: 10, padding: '2px 8px', fontSize: 10, fontFamily: 'Lora, serif' } }, '🔥 23 Day Streak'),
          React.createElement('span', { style: { background: 'rgba(255,255,255,0.18)', color: '#fff', borderRadius: 10, padding: '2px 8px', fontSize: 10, fontFamily: 'Lora, serif' } }, '6 Badges')
        )
      )
    ),
    React.createElement('div', { style: { padding: '0 16px' } },
      React.createElement(SettingsSection, {
        title: 'Appearance',
        items: [{ icon: '🌙', label: 'Dark Mode', value: isDark, toggle: function() { setIsDark(!isDark); } }]
      }),
      React.createElement(SettingsSection, {
        title: 'Notifications',
        items: [
          { icon: '🔔', label: 'Quest Reminders', value: notifications, toggle: function() { setNotifications(!notifications); } },
          { icon: '🎯', label: 'Weekly Goals', value: weeklyGoal, toggle: function() { setWeeklyGoal(!weeklyGoal); } },
          { icon: '👥', label: 'Social Sharing', value: socialShare, toggle: function() { setSocialShare(!socialShare); } },
        ]
      }),
      React.createElement(SettingsSection, {
        title: 'Account',
        items: [
          { icon: '✏️', label: 'Edit Profile' },
          { icon: '🔗', label: 'Connected Apps' },
          { icon: '🔒', label: 'Privacy Settings' },
          { icon: '🌿', label: 'Linked Projects' },
        ]
      }),
      React.createElement('div', { style: { textAlign: 'center', padding: '8px 0' } },
        React.createElement('p', { style: { color: t.textMuted, fontSize: 11, fontFamily: 'Lora, serif', fontStyle: 'italic' } }, 'GreenPeak v1.0.0'),
        React.createElement('p', { style: { color: t.textMuted, fontSize: 10, fontFamily: 'Lora, serif' } }, 'Play, Collect, and Grow a Healthier Planet')
      )
    )
  );
}

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isDark, setIsDark] = useState(false);

  var t = isDark ? themes.dark : themes.light;

  var fontStyle = [
    "@import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap');",
    '@keyframes ecoBounce { 0% { transform: translateY(0); } 100% { transform: translateY(-9px); } }',
    '* { box-sizing: border-box; }',
    '::-webkit-scrollbar { display: none; }',
    'button { outline: none; }'
  ].join('\n');

  const tabs = [
    { id: 'home', label: 'Home', icon: window.lucide.Home },
    { id: 'quests', label: 'Quests', icon: window.lucide.Map },
    { id: 'collection', label: 'Badges', icon: window.lucide.Award },
    { id: 'impact', label: 'Impact', icon: window.lucide.Globe },
    { id: 'settings', label: 'Profile', icon: window.lucide.User },
  ];

  const screens = {
    home: HomeScreen,
    quests: QuestsScreen,
    collection: CollectionScreen,
    impact: ImpactScreen,
    settings: SettingsScreen,
  };

  return React.createElement('div', {
    style: { minHeight: '100vh', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Lora, serif' }
  },
    React.createElement('style', null, fontStyle),
    React.createElement('div', {
      style: { width: 375, height: 812, background: t.bg, borderRadius: 44, overflow: 'hidden', position: 'relative', boxShadow: '0 40px 80px rgba(0,0,0,0.28), 0 0 0 1px rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'column' }
    },
      React.createElement('div', {
        style: { position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)', width: 120, height: 34, background: '#000', borderRadius: 20, zIndex: 100 }
      }),
      React.createElement('div', {
        style: { height: 54, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', paddingLeft: 24, paddingRight: 20, paddingBottom: 8, flexShrink: 0, zIndex: 10, position: 'relative' }
      },
        React.createElement('span', { style: { fontSize: 13, fontWeight: 600, color: t.statusBar, fontFamily: 'Lora, serif' } }, '9:41'),
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 5 } },
          React.createElement(window.lucide.Wifi, { size: 14, color: t.statusBar }),
          React.createElement(window.lucide.Signal, { size: 14, color: t.statusBar }),
          React.createElement(window.lucide.Battery, { size: 18, color: t.statusBar })
        )
      ),
      React.createElement('div', { style: { flex: 1, overflow: 'hidden', position: 'relative' } },
        React.createElement(screens[activeTab], { t: t, isDark: isDark, setIsDark: setIsDark })
      ),
      React.createElement('div', {
        style: { height: 80, background: t.navBg, borderTop: '1px solid ' + t.border, display: 'flex', alignItems: 'center', justifyContent: 'space-around', paddingBottom: 12, paddingTop: 8, flexShrink: 0 }
      },
        tabs.map(function(tab) {
          return React.createElement('div', {
            key: tab.id,
            onClick: function() { setActiveTab(tab.id); },
            style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, cursor: 'pointer', padding: '4px 10px', borderRadius: 12 }
          },
            React.createElement(tab.icon, { size: 22, color: activeTab === tab.id ? t.primary : t.textMuted, strokeWidth: activeTab === tab.id ? 2.5 : 1.8 }),
            React.createElement('span', { style: { fontSize: 10, fontWeight: activeTab === tab.id ? 700 : 400, color: activeTab === tab.id ? t.primary : t.textMuted, fontFamily: 'Lora, serif' } }, tab.label)
          );
        })
      )
    )
  );
}
