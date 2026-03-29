const { useState, useEffect, useRef } = React;

const themes = {
  dark: {
    bg: '#0f1923',
    surface: '#1a2a38',
    surfaceAlt: '#16222e',
    card: '#1e3045',
    border: '#2a4060',
    primary: '#e8682a',
    primaryLight: '#f07840',
    secondary: '#1e3c5a',
    accent: '#c9a84c',
    accentLight: '#e0bc6a',
    lavender: '#b8a5d4',
    text: '#f0e8dc',
    textSub: '#9ab0c4',
    textMuted: '#5a7a94',
    navBg: '#0d1720',
    tabActive: '#e8682a',
    tabInactive: '#4a6680',
    statusBar: '#0d1720',
    spiritGlow: 'rgba(232,104,42,0.3)',
    questBg: '#172535',
    badgeBg: '#1a2f45',
  },
  light: {
    bg: '#fdf4ec',
    surface: '#fff8f0',
    surfaceAlt: '#fef0e0',
    card: '#ffffff',
    border: '#f0d8c0',
    primary: '#d4551a',
    primaryLight: '#e8682a',
    secondary: '#2a4d70',
    accent: '#b8860b',
    accentLight: '#c9a84c',
    lavender: '#7c6a9e',
    text: '#1a2a38',
    textSub: '#4a6680',
    textMuted: '#8aaa c4',
    navBg: '#fff8f0',
    tabActive: '#d4551a',
    tabInactive: '#8aaac0',
    statusBar: '#fdf4ec',
    spiritGlow: 'rgba(212,85,26,0.2)',
    questBg: '#fff0e0',
    badgeBg: '#fde8d0',
  }
};

const seasonMotifs = {
  autumn: { emoji: '🍂', color: '#e8682a', bg: '#2a1a0a', name: 'Autumn Embers', spirit: 'Ember Fox' },
  winter: { emoji: '❄️', color: '#7ab8e8', bg: '#0a1a2a', name: 'Winter Solstice', spirit: 'Frost Owl' },
  spring: { emoji: '🌸', color: '#e87ab8', bg: '#1a0a18', name: 'Spring Bloom', spirit: 'Petal Sprite' },
  monsoon: { emoji: '🌧️', color: '#78b8a0', bg: '#0a1e18', name: 'Monsoon Gardens', spirit: 'Rain Serpent' },
};

function StatusBar({ t }) {
  return React.createElement('div', {
    style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 20px 4px', background: t.statusBar }
  },
    React.createElement('span', { style: { fontSize: 13, fontWeight: '700', color: t.text, fontFamily: 'Fredoka, sans-serif' } }, '9:41'),
    React.createElement('div', { style: { display: 'flex', gap: 6, alignItems: 'center' } },
      React.createElement(window.lucide.Wifi, { size: 14, color: t.text }),
      React.createElement(window.lucide.Battery, { size: 14, color: t.text })
    )
  );
}

function DynamicIsland() {
  return React.createElement('div', {
    style: { width: 126, height: 34, background: '#000', borderRadius: 20, margin: '0 auto 6px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }
  },
    React.createElement('div', { style: { width: 12, height: 12, borderRadius: '50%', background: '#1a1a1a', border: '1px solid #333' } }),
    React.createElement('div', { style: { width: 8, height: 8, borderRadius: '50%', background: '#1a1a1a' } })
  );
}

function QuestCard({ quest, t, onPress }) {
  const [pressed, setPressed] = useState(false);
  return React.createElement('div', {
    onMouseDown: () => setPressed(true),
    onMouseUp: () => { setPressed(false); onPress && onPress(); },
    onMouseLeave: () => setPressed(false),
    style: {
      background: t.card,
      border: `2px solid ${quest.completed ? t.primary : t.border}`,
      borderRadius: 20,
      padding: '16px 18px',
      marginBottom: 12,
      transform: pressed ? 'scale(0.97)' : 'scale(1)',
      transition: 'all 0.15s ease',
      cursor: 'pointer',
      position: 'relative',
      overflow: 'hidden',
    }
  },
    React.createElement('div', { style: { position: 'absolute', top: -10, right: -10, fontSize: 48, opacity: 0.08 } }, quest.emoji),
    React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 } },
      React.createElement('div', null,
        React.createElement('div', { style: { fontSize: 11, color: t.accent, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 3, fontFamily: 'Fredoka, sans-serif' } }, quest.type),
        React.createElement('div', { style: { fontSize: 17, fontWeight: '700', color: t.text, fontFamily: 'Fredoka, sans-serif' } }, quest.title)
      ),
      quest.completed
        ? React.createElement('div', { style: { background: t.primary, borderRadius: 12, padding: '4px 10px', display: 'flex', alignItems: 'center', gap: 4 } },
            React.createElement(window.lucide.CheckCircle, { size: 13, color: '#fff' }),
            React.createElement('span', { style: { fontSize: 11, color: '#fff', fontWeight: '700', fontFamily: 'Fredoka, sans-serif' } }, 'Done')
          )
        : React.createElement('div', { style: { background: t.accent + '22', borderRadius: 12, padding: '4px 10px' } },
            React.createElement('span', { style: { fontSize: 11, color: t.accent, fontWeight: '700', fontFamily: 'Fredoka, sans-serif' } }, quest.xp + ' XP')
          )
    ),
    React.createElement('p', { style: { fontSize: 13, color: t.textSub, margin: '0 0 10px', lineHeight: 1.5, fontFamily: 'Fredoka, sans-serif' } }, quest.desc),
    !quest.completed && React.createElement('div', null,
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: 4 } },
        React.createElement('span', { style: { fontSize: 11, color: t.textMuted, fontFamily: 'Fredoka, sans-serif' } }, 'Progress'),
        React.createElement('span', { style: { fontSize: 11, color: t.accent, fontFamily: 'Fredoka, sans-serif' } }, quest.progress + '%')
      ),
      React.createElement('div', { style: { height: 6, background: t.border, borderRadius: 3, overflow: 'hidden' } },
        React.createElement('div', { style: { height: '100%', width: quest.progress + '%', background: `linear-gradient(90deg, ${t.primary}, ${t.accent})`, borderRadius: 3, transition: 'width 0.5s ease' } })
      )
    )
  );
}

function HomeScreen({ t, season, onQuestDone }) {
  const [quests, setQuests] = useState([
    { id: 1, title: 'Ember Haiku', type: 'Creative Writing', desc: 'Compose a 5-7-5 haiku capturing the scent of autumn leaves burning at dusk.', xp: 80, progress: 60, completed: false, emoji: '🍂' },
    { id: 2, title: 'Golden Hour Palette', type: 'Visual Art', desc: 'Select 5 colors that define this week\'s autumn mood from our swatches.', xp: 50, progress: 100, completed: true, emoji: '🎨' },
    { id: 3, title: 'Forest Whispers', type: 'Sound Remix', desc: 'Remix natural sounds — wind, crackle, rain — into a 30-second ambient loop.', xp: 120, progress: 30, completed: false, emoji: '🎵' },
    { id: 4, title: 'Leaf Memory', type: 'Micro Story', desc: 'Share a 3-sentence story about your favorite childhood autumn memory.', xp: 60, progress: 0, completed: false, emoji: '📖' },
  ]);

  const handlePress = (id) => {
    setQuests(q => q.map(x => x.id === id ? { ...x, progress: Math.min(100, x.progress + 20) } : x));
  };

  const completed = quests.filter(q => q.completed).length;

  return React.createElement('div', { style: { flex: 1, overflowY: 'auto', paddingBottom: 20 } },
    React.createElement('div', { style: { padding: '12px 20px 0' } },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 } },
        React.createElement('div', null,
          React.createElement('div', { style: { fontSize: 13, color: t.textSub, fontFamily: 'Fredoka, sans-serif' } }, 'Week 12 · Autumn Season'),
          React.createElement('h1', { style: { fontSize: 28, fontWeight: '700', color: t.text, margin: 0, fontFamily: 'Fredoka, sans-serif' } }, 'Your Quests ✨')
        ),
        React.createElement('div', { style: { width: 44, height: 44, borderRadius: 14, background: t.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 } }, season.emoji)
      ),
      React.createElement('div', { style: { background: t.card, borderRadius: 18, padding: '14px 16px', marginBottom: 18, display: 'flex', alignItems: 'center', gap: 14, border: `1px solid ${t.border}` } },
        React.createElement('div', { style: { flex: 1 } },
          React.createElement('div', { style: { fontSize: 12, color: t.textSub, marginBottom: 4, fontFamily: 'Fredoka, sans-serif' } }, 'Weekly Progress'),
          React.createElement('div', { style: { height: 8, background: t.border, borderRadius: 4, overflow: 'hidden' } },
            React.createElement('div', { style: { height: '100%', width: (completed / quests.length * 100) + '%', background: `linear-gradient(90deg, ${t.primary}, ${t.accent})`, borderRadius: 4, transition: 'width 0.5s' } })
          ),
          React.createElement('div', { style: { fontSize: 12, color: t.textMuted, marginTop: 4, fontFamily: 'Fredoka, sans-serif' } }, completed + ' of ' + quests.length + ' complete')
        ),
        React.createElement('div', { style: { textAlign: 'center' } },
          React.createElement('div', { style: { fontSize: 24, fontWeight: '700', color: t.accent, fontFamily: 'Fredoka, sans-serif' } }, '310'),
          React.createElement('div', { style: { fontSize: 11, color: t.textMuted, fontFamily: 'Fredoka, sans-serif' } }, 'XP this week')
        )
      )
    ),
    React.createElement('div', { style: { padding: '0 20px' } },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 } },
        React.createElement('h2', { style: { fontSize: 17, fontWeight: '700', color: t.text, margin: 0, fontFamily: 'Fredoka, sans-serif' } }, 'Active Quests'),
        React.createElement('span', { style: { fontSize: 12, color: t.primary, fontFamily: 'Fredoka, sans-serif' } }, 'See all →')
      ),
      quests.map(q => React.createElement(QuestCard, { key: q.id, quest: q, t, onPress: () => handlePress(q.id) }))
    )
  );
}

function SpiritsScreen({ t }) {
  const [activeSpirit, setActiveSpirit] = useState('autumn');
  const [unlocked, setUnlocked] = useState(['autumn', 'winter']);
  const [animating, setAnimating] = useState(false);

  const handleActivate = (id) => {
    if (!unlocked.includes(id)) return;
    setAnimating(true);
    setTimeout(() => { setActiveSpirit(id); setAnimating(false); }, 300);
  };

  const spirits = [
    { id: 'autumn', name: 'Ember Fox', emoji: '🦊', desc: 'Born from harvest fires, this spirit wraps your world in warm amber and the scent of woodsmoke.', color: '#e8682a', traits: ['Warmth', 'Creativity', 'Harvest'], level: 4, maxLevel: 5 },
    { id: 'winter', name: 'Frost Owl', emoji: '🦉', desc: 'Gliding through silent snowfall, the Frost Owl brings clarity and introspective calm.', color: '#7ab8e8', traits: ['Clarity', 'Wisdom', 'Stillness'], level: 2, maxLevel: 5 },
    { id: 'spring', name: 'Petal Sprite', emoji: '🧚', desc: 'Darting between blossoms, this sprite transforms everything it touches into vibrant new life.', color: '#e87ab8', traits: ['Joy', 'Growth', 'Whimsy'], level: 0, maxLevel: 5 },
    { id: 'monsoon', name: 'Rain Serpent', emoji: '🐍', desc: 'Rising with the first rains, its coils carry the earthy wisdom of monsoon gardens.', color: '#78b8a0', traits: ['Flow', 'Renewal', 'Mystery'], level: 0, maxLevel: 5 },
  ];

  const current = spirits.find(s => s.id === activeSpirit);

  return React.createElement('div', { style: { flex: 1, overflowY: 'auto', paddingBottom: 20 } },
    React.createElement('div', { style: { padding: '12px 20px 0', marginBottom: 16 } },
      React.createElement('h1', { style: { fontSize: 28, fontWeight: '700', color: t.text, margin: 0, fontFamily: 'Fredoka, sans-serif' } }, 'Season Spirits 🌀')
    ),
    React.createElement('div', {
      style: {
        margin: '0 20px 20px',
        background: `linear-gradient(135deg, ${current.color}22, ${t.card})`,
        border: `2px solid ${current.color}55`,
        borderRadius: 24,
        padding: 20,
        textAlign: 'center',
        transform: animating ? 'scale(0.95)' : 'scale(1)',
        transition: 'all 0.3s ease',
      }
    },
      React.createElement('div', { style: { fontSize: 64, marginBottom: 8, filter: `drop-shadow(0 0 20px ${current.color})` } }, current.emoji),
      React.createElement('div', { style: { fontSize: 22, fontWeight: '700', color: t.text, fontFamily: 'Fredoka, sans-serif' } }, current.name),
      React.createElement('div', { style: { fontSize: 11, color: current.color, fontWeight: '600', letterSpacing: 1, textTransform: 'uppercase', margin: '4px 0 10px', fontFamily: 'Fredoka, sans-serif' } }, 'ACTIVE SPIRIT'),
      React.createElement('p', { style: { fontSize: 13, color: t.textSub, lineHeight: 1.6, margin: '0 0 14px', fontFamily: 'Fredoka, sans-serif' } }, current.desc),
      React.createElement('div', { style: { display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 14 } },
        current.traits.map(trait => React.createElement('div', { key: trait, style: { background: current.color + '33', border: `1px solid ${current.color}55`, borderRadius: 20, padding: '4px 12px', fontSize: 12, color: current.color, fontFamily: 'Fredoka, sans-serif' } }, trait))
      ),
      React.createElement('div', null,
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', fontSize: 12, color: t.textMuted, marginBottom: 6, fontFamily: 'Fredoka, sans-serif' } },
          React.createElement('span', null, 'Spirit Level'),
          React.createElement('span', null, current.level + ' / ' + current.maxLevel)
        ),
        React.createElement('div', { style: { height: 8, background: t.border, borderRadius: 4, overflow: 'hidden' } },
          React.createElement('div', { style: { height: '100%', width: (current.level / current.maxLevel * 100) + '%', background: `linear-gradient(90deg, ${current.color}, ${current.color}aa)`, borderRadius: 4 } })
        )
      )
    ),
    React.createElement('div', { style: { padding: '0 20px' } },
      React.createElement('h2', { style: { fontSize: 17, fontWeight: '700', color: t.text, marginBottom: 12, fontFamily: 'Fredoka, sans-serif' } }, 'All Spirits'),
      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 } },
        spirits.map(spirit => {
          const isUnlocked = unlocked.includes(spirit.id);
          const isActive = activeSpirit === spirit.id;
          return React.createElement('div', {
            key: spirit.id,
            onClick: () => handleActivate(spirit.id),
            style: {
              background: isActive ? spirit.color + '22' : t.card,
              border: `2px solid ${isActive ? spirit.color : isUnlocked ? t.border : t.border + '66'}`,
              borderRadius: 18,
              padding: '14px 12px',
              textAlign: 'center',
              cursor: isUnlocked ? 'pointer' : 'not-allowed',
              opacity: isUnlocked ? 1 : 0.5,
              transition: 'all 0.2s',
            }
          },
            React.createElement('div', { style: { fontSize: 32, marginBottom: 6 } }, isUnlocked ? spirit.emoji : '🔒'),
            React.createElement('div', { style: { fontSize: 14, fontWeight: '700', color: isActive ? spirit.color : t.text, fontFamily: 'Fredoka, sans-serif' } }, spirit.name),
            React.createElement('div', { style: { fontSize: 11, color: t.textMuted, fontFamily: 'Fredoka, sans-serif' } }, isUnlocked ? 'Lv ' + spirit.level : 'Locked')
          );
        })
      )
    )
  );
}

function CommunityScreen({ t }) {
  const [activeTab, setActiveTab] = useState('stories');
  const [liked, setLiked] = useState({});

  const stories = [
    { id: 1, user: 'maple.dreams', avatar: '🍁', season: 'Autumn', content: 'The last oak held its breath as October exhaled. Beneath it, we gathered acorns, filling our pockets with small, possible futures...', likes: 234, comments: 18, badge: 'Ember Fox Lv4' },
    { id: 2, user: 'frost.wanderer', avatar: '❄️', season: 'Winter', content: 'Silence has texture in winter — thick like wool, cold like glass. I pressed my palm to the frozen window and felt the whole world pause.', likes: 187, comments: 24, badge: 'Frost Owl Lv2' },
    { id: 3, user: 'blossom.riot', avatar: '🌸', season: 'Spring', content: 'Cherry blossoms don\'t fall — they leap. Each petal a tiny act of faith, trusting the wind to carry it somewhere worth landing.', likes: 312, comments: 31, badge: 'Petal Sprite' },
  ];

  const handleLike = (id) => setLiked(l => ({ ...l, [id]: !l[id] }));

  return React.createElement('div', { style: { flex: 1, overflowY: 'auto', paddingBottom: 20 } },
    React.createElement('div', { style: { padding: '12px 20px 0', marginBottom: 12 } },
      React.createElement('h1', { style: { fontSize: 28, fontWeight: '700', color: t.text, margin: 0, fontFamily: 'Fredoka, sans-serif' } }, 'Community 🌿')
    ),
    React.createElement('div', { style: { display: 'flex', gap: 8, padding: '0 20px', marginBottom: 16 } },
      ['stories', 'challenges', 'badges'].map(tab =>
        React.createElement('div', {
          key: tab,
          onClick: () => setActiveTab(tab),
          style: {
            padding: '8px 16px',
            borderRadius: 20,
            background: activeTab === tab ? t.primary : t.card,
            border: `1px solid ${activeTab === tab ? t.primary : t.border}`,
            color: activeTab === tab ? '#fff' : t.textSub,
            fontSize: 13,
            fontWeight: '600',
            cursor: 'pointer',
            textTransform: 'capitalize',
            fontFamily: 'Fredoka, sans-serif',
            transition: 'all 0.2s',
          }
        }, tab)
      )
    ),
    activeTab === 'stories' && React.createElement('div', { style: { padding: '0 20px' } },
      stories.map(story => React.createElement('div', {
        key: story.id,
        style: { background: t.card, borderRadius: 20, padding: 16, marginBottom: 12, border: `1px solid ${t.border}` }
      },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 } },
          React.createElement('div', { style: { width: 38, height: 38, borderRadius: '50%', background: t.primary + '33', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 } }, story.avatar),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', { style: { fontSize: 14, fontWeight: '700', color: t.text, fontFamily: 'Fredoka, sans-serif' } }, story.user),
            React.createElement('div', { style: { fontSize: 11, color: t.accent, fontFamily: 'Fredoka, sans-serif' } }, story.badge)
          ),
          React.createElement('div', { style: { background: t.accent + '22', borderRadius: 8, padding: '3px 8px', fontSize: 11, color: t.accent, fontFamily: 'Fredoka, sans-serif' } }, story.season)
        ),
        React.createElement('p', { style: { fontSize: 13, color: t.textSub, lineHeight: 1.6, margin: '0 0 12px', fontStyle: 'italic', fontFamily: 'Fredoka, sans-serif' } }, '"' + story.content + '"'),
        React.createElement('div', { style: { display: 'flex', gap: 16 } },
          React.createElement('div', {
            onClick: () => handleLike(story.id),
            style: { display: 'flex', alignItems: 'center', gap: 5, cursor: 'pointer' }
          },
            React.createElement(window.lucide.Heart, { size: 15, color: liked[story.id] ? '#e8682a' : t.textMuted, fill: liked[story.id] ? '#e8682a' : 'none' }),
            React.createElement('span', { style: { fontSize: 12, color: t.textMuted, fontFamily: 'Fredoka, sans-serif' } }, story.likes + (liked[story.id] ? 1 : 0))
          ),
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 5 } },
            React.createElement(window.lucide.MessageCircle, { size: 15, color: t.textMuted }),
            React.createElement('span', { style: { fontSize: 12, color: t.textMuted, fontFamily: 'Fredoka, sans-serif' } }, story.comments)
          )
        )
      ))
    ),
    activeTab === 'badges' && React.createElement('div', { style: { padding: '0 20px' } },
      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 } },
        [
          { emoji: '🦊', name: 'Ember Fox', rarity: 'Rare', color: '#e8682a' },
          { emoji: '📝', name: 'Haiku Master', rarity: 'Common', color: '#c9a84c' },
          { emoji: '🎨', name: 'Color Soul', rarity: 'Common', color: '#b8a5d4' },
          { emoji: '🎵', name: 'Sound Weaver', rarity: 'Epic', color: '#78b8a0' },
          { emoji: '📖', name: 'Story Keeper', rarity: 'Rare', color: '#e8682a' },
          { emoji: '🔒', name: '???', rarity: 'Legendary', color: '#888' },
        ].map((badge, i) => React.createElement('div', {
          key: i,
          style: { background: t.card, border: `2px solid ${badge.color}44`, borderRadius: 16, padding: '14px 10px', textAlign: 'center' }
        },
          React.createElement('div', { style: { fontSize: 28, marginBottom: 6 } }, badge.emoji),
          React.createElement('div', { style: { fontSize: 11, fontWeight: '700', color: t.text, fontFamily: 'Fredoka, sans-serif', marginBottom: 2 } }, badge.name),
          React.createElement('div', { style: { fontSize: 10, color: badge.color, fontFamily: 'Fredoka, sans-serif' } }, badge.rarity)
        ))
      )
    ),
    activeTab === 'challenges' && React.createElement('div', { style: { padding: '0 20px' } },
      [
        { title: '7-Day Autumn Journal', desc: 'Write daily micro-reflections on autumn changes you observe around you.', participants: 1204, days: 3, emoji: '🍂' },
        { title: 'Global Soundscape Relay', desc: 'Each user adds one sound layer to a global community ambient track.', participants: 876, days: 5, emoji: '🌍' },
        { title: 'Spirit Portrait Week', desc: 'Illustrate (digitally or physically) what your Season Spirit looks like to you.', participants: 543, days: 2, emoji: '🎨' },
      ].map((c, i) => React.createElement('div', {
        key: i,
        style: { background: t.card, borderRadius: 20, padding: 16, marginBottom: 12, border: `1px solid ${t.border}` }
      },
        React.createElement('div', { style: { display: 'flex', gap: 12, alignItems: 'flex-start' } },
          React.createElement('div', { style: { fontSize: 30, flexShrink: 0 } }, c.emoji),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', { style: { fontSize: 15, fontWeight: '700', color: t.text, fontFamily: 'Fredoka, sans-serif', marginBottom: 4 } }, c.title),
            React.createElement('p', { style: { fontSize: 12, color: t.textSub, margin: '0 0 10px', lineHeight: 1.5, fontFamily: 'Fredoka, sans-serif' } }, c.desc),
            React.createElement('div', { style: { display: 'flex', gap: 12 } },
              React.createElement('span', { style: { fontSize: 11, color: t.textMuted, fontFamily: 'Fredoka, sans-serif' } }, '👥 ' + c.participants.toLocaleString() + ' joined'),
              React.createElement('span', { style: { fontSize: 11, color: t.accent, fontFamily: 'Fredoka, sans-serif' } }, c.days + 'd left')
            )
          )
        )
      ))
    )
  );
}

function AvatarScreen({ t }) {
  const [selectedSkin, setSelectedSkin] = useState(0);
  const [equipped, setEquipped] = useState({ bg: 0, frame: 0, accessory: 0 });

  const skins = [
    { name: 'Autumn Soul', emoji: '🧑‍🎤', bg: '#e8682a33', border: '#e8682a' },
    { name: 'Forest Sage', emoji: '🧙', bg: '#78b8a033', border: '#78b8a0' },
    { name: 'Snow Walker', emoji: '🧝', bg: '#7ab8e833', border: '#7ab8e8' },
    { name: 'Bloom Dancer', emoji: '🧜', bg: '#e87ab833', border: '#e87ab8' },
  ];

  const accessories = ['🍂', '❄️', '🌸', '🌧️', '⭐', '🔥'];

  return React.createElement('div', { style: { flex: 1, overflowY: 'auto', paddingBottom: 20 } },
    React.createElement('div', { style: { padding: '12px 20px 0', marginBottom: 16 } },
      React.createElement('h1', { style: { fontSize: 28, fontWeight: '700', color: t.text, margin: 0, fontFamily: 'Fredoka, sans-serif' } }, 'Your Avatar 🌟')
    ),
    React.createElement('div', { style: { margin: '0 20px 20px', textAlign: 'center' } },
      React.createElement('div', {
        style: {
          width: 120, height: 120, borderRadius: '50%', margin: '0 auto 12px',
          background: skins[selectedSkin].bg,
          border: `4px solid ${skins[selectedSkin].border}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 56, position: 'relative',
          boxShadow: `0 0 30px ${skins[selectedSkin].border}66`,
        }
      },
        skins[selectedSkin].emoji,
        React.createElement('div', { style: { position: 'absolute', top: 0, right: 0, fontSize: 24 } }, accessories[equipped.accessory])
      ),
      React.createElement('div', { style: { fontSize: 20, fontWeight: '700', color: t.text, fontFamily: 'Fredoka, sans-serif' } }, 'Aurelia Dawn'),
      React.createElement('div', { style: { fontSize: 13, color: t.accent, fontFamily: 'Fredoka, sans-serif' } }, '🦊 Ember Fox · Season 3 · Lv 14')
    ),
    React.createElement('div', { style: { padding: '0 20px' } },
      React.createElement('div', { style: { marginBottom: 20 } },
        React.createElement('h2', { style: { fontSize: 16, fontWeight: '700', color: t.text, marginBottom: 10, fontFamily: 'Fredoka, sans-serif' } }, 'Avatar Skins'),
        React.createElement('div', { style: { display: 'flex', gap: 10 } },
          skins.map((skin, i) => React.createElement('div', {
            key: i,
            onClick: () => setSelectedSkin(i),
            style: {
              flex: 1, background: selectedSkin === i ? skin.bg : t.card,
              border: `2px solid ${selectedSkin === i ? skin.border : t.border}`,
              borderRadius: 16, padding: '12px 8px', textAlign: 'center', cursor: 'pointer',
              transition: 'all 0.2s',
            }
          },
            React.createElement('div', { style: { fontSize: 26, marginBottom: 4 } }, skin.emoji),
            React.createElement('div', { style: { fontSize: 10, color: selectedSkin === i ? skin.border : t.textMuted, fontFamily: 'Fredoka, sans-serif', fontWeight: '600' } }, skin.name)
          ))
        )
      ),
      React.createElement('div', { style: { marginBottom: 20 } },
        React.createElement('h2', { style: { fontSize: 16, fontWeight: '700', color: t.text, marginBottom: 10, fontFamily: 'Fredoka, sans-serif' } }, 'Accessories'),
        React.createElement('div', { style: { display: 'flex', gap: 10, flexWrap: 'wrap' } },
          accessories.map((acc, i) => React.createElement('div', {
            key: i,
            onClick: () => setEquipped(e => ({ ...e, accessory: i })),
            style: {
              width: 48, height: 48, borderRadius: 14, background: equipped.accessory === i ? t.primary + '33' : t.card,
              border: `2px solid ${equipped.accessory === i ? t.primary : t.border}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 22, cursor: 'pointer', transition: 'all 0.2s',
            }
          }, acc))
        )
      ),
      React.createElement('div', { style: { background: t.card, border: `1px solid ${t.border}`, borderRadius: 18, padding: 16 } },
        React.createElement('h3', { style: { fontSize: 15, fontWeight: '700', color: t.text, marginBottom: 12, fontFamily: 'Fredoka, sans-serif' } }, 'Earned Badges'),
        React.createElement('div', { style: { display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 4 } },
          ['🦊', '📝', '🎨', '🎵'].map((b, i) => React.createElement('div', {
            key: i,
            style: { flexShrink: 0, width: 52, height: 52, borderRadius: 14, background: t.primary + '22', border: `2px solid ${t.primary}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }
          }, b))
        )
      )
    )
  );
}

function SettingsScreen({ t, isDark, toggleTheme }) {
  const [notifs, setNotifs] = useState(true);
  const [sounds, setSounds] = useState(true);
  const [haptics, setHaptics] = useState(false);
  const [spirit, setSpirit] = useState(true);

  const Toggle = ({ value, onChange }) =>
    React.createElement('div', {
      onClick: () => onChange(!value),
      style: {
        width: 44, height: 24, borderRadius: 12,
        background: value ? t.primary : t.border,
        position: 'relative', cursor: 'pointer', transition: 'background 0.3s',
      }
    },
      React.createElement('div', {
        style: {
          width: 20, height: 20, borderRadius: '50%', background: '#fff',
          position: 'absolute', top: 2, left: value ? 22 : 2,
          transition: 'left 0.3s', boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
        }
      })
    );

  const Row = ({ label, sub, value, onChange, icon }) =>
    React.createElement('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0', borderBottom: `1px solid ${t.border}` } },
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12 } },
        React.createElement('div', { style: { width: 36, height: 36, borderRadius: 10, background: t.primary + '22', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 } }, icon),
        React.createElement('div', null,
          React.createElement('div', { style: { fontSize: 14, fontWeight: '600', color: t.text, fontFamily: 'Fredoka, sans-serif' } }, label),
          sub && React.createElement('div', { style: { fontSize: 11, color: t.textMuted, fontFamily: 'Fredoka, sans-serif' } }, sub)
        )
      ),
      React.createElement(Toggle, { value, onChange })
    );

  return React.createElement('div', { style: { flex: 1, overflowY: 'auto', paddingBottom: 20 } },
    React.createElement('div', { style: { padding: '12px 20px 0', marginBottom: 16 } },
      React.createElement('h1', { style: { fontSize: 28, fontWeight: '700', color: t.text, margin: 0, fontFamily: 'Fredoka, sans-serif' } }, 'Settings ⚙️')
    ),
    React.createElement('div', { style: { margin: '0 20px' } },
      React.createElement('div', { style: { background: t.card, borderRadius: 20, padding: '8px 16px', marginBottom: 16, border: `1px solid ${t.border}` } },
        React.createElement('div', { style: { padding: '14px 0', borderBottom: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' } },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12 } },
            React.createElement('div', { style: { width: 36, height: 36, borderRadius: 10, background: t.accent + '22', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 } }, isDark ? '🌙' : '☀️'),
            React.createElement('div', null,
              React.createElement('div', { style: { fontSize: 14, fontWeight: '600', color: t.text, fontFamily: 'Fredoka, sans-serif' } }, 'Dark Mode'),
              React.createElement('div', { style: { fontSize: 11, color: t.textMuted, fontFamily: 'Fredoka, sans-serif' } }, isDark ? 'Night ambiance active' : 'Day theme active')
            )
          ),
          React.createElement('div', {
            onClick: toggleTheme,
            style: { width: 44, height: 24, borderRadius: 12, background: isDark ? t.primary : t.border, position: 'relative', cursor: 'pointer', transition: 'background 0.3s' }
          },
            React.createElement('div', { style: { width: 20, height: 20, borderRadius: '50%', background: '#fff', position: 'absolute', top: 2, left: isDark ? 22 : 2, transition: 'left 0.3s', boxShadow: '0 1px 3px rgba(0,0,0,0.3)' } })
          )
        ),
        React.createElement(Row, { label: 'Notifications', sub: 'Quest reminders & community', value: notifs, onChange: setNotifs, icon: '🔔' }),
        React.createElement(Row, { label: 'Ambient Sounds', sub: 'Spirit soundscapes', value: sounds, onChange: setSounds, icon: '🎵' }),
        React.createElement(Row, { label: 'Haptic Feedback', sub: 'Vibration on interactions', value: haptics, onChange: setHaptics, icon: '📳' }),
        React.createElement(Row, { label: 'Spirit Animations', sub: 'Dynamic spirit effects', value: spirit, onChange: setSpirit, icon: '✨' })
      ),
      React.createElement('div', { style: { background: t.card, borderRadius: 20, overflow: 'hidden', border: `1px solid ${t.border}` } },
        [
          { icon: '🧑‍🎤', label: 'Edit Profile', sub: 'Aurelia Dawn' },
          { icon: '🔐', label: 'Privacy', sub: 'Manage your data' },
          { icon: '❓', label: 'Help & FAQ', sub: 'Get support' },
          { icon: '⭐', label: 'Rate SeasonScape', sub: 'Leave a review' },
        ].map((item, i, arr) => React.createElement('div', {
          key: i,
          style: { padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12, borderBottom: i < arr.length - 1 ? `1px solid ${t.border}` : 'none', cursor: 'pointer' }
        },
          React.createElement('div', { style: { fontSize: 18 } }, item.icon),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', { style: { fontSize: 14, fontWeight: '600', color: t.text, fontFamily: 'Fredoka, sans-serif' } }, item.label),
            React.createElement('div', { style: { fontSize: 11, color: t.textMuted, fontFamily: 'Fredoka, sans-serif' } }, item.sub)
          ),
          React.createElement(window.lucide.ChevronRight, { size: 16, color: t.textMuted })
        ))
      )
    )
  );
}

function App() {
  const [isDark, setIsDark] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const [prevTab, setPrevTab] = useState(null);
  const [slideDir, setSlideDir] = useState(0);
  const [animating, setAnimating] = useState(false);

  const t = isDark ? themes.dark : themes.light;
  const season = seasonMotifs.autumn;

  const tabs = [
    { id: 'home', label: 'Quests', icon: window.lucide.Compass },
    { id: 'spirits', label: 'Spirits', icon: window.lucide.Sparkles },
    { id: 'community', label: 'World', icon: window.lucide.Globe },
    { id: 'avatar', label: 'Avatar', icon: window.lucide.User },
    { id: 'settings', label: 'Settings', icon: window.lucide.Settings },
  ];

  const tabOrder = tabs.map(t => t.id);

  const handleTabChange = (id) => {
    if (id === activeTab || animating) return;
    const oldIndex = tabOrder.indexOf(activeTab);
    const newIndex = tabOrder.indexOf(id);
    setSlideDir(newIndex > oldIndex ? 1 : -1);
    setPrevTab(activeTab);
    setAnimating(true);
    setActiveTab(id);
    setTimeout(() => { setAnimating(false); setPrevTab(null); }, 300);
  };

  const screens = {
    home: () => React.createElement(HomeScreen, { t, season }),
    spirits: () => React.createElement(SpiritsScreen, { t }),
    community: () => React.createElement(CommunityScreen, { t }),
    avatar: () => React.createElement(AvatarScreen, { t }),
    settings: () => React.createElement(SettingsScreen, { t, isDark, toggleTheme: () => setIsDark(!isDark) }),
  };

  return React.createElement('div', {
    style: { minHeight: '100vh', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Fredoka, sans-serif' }
  },
    React.createElement('style', null, `
      @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@300;400;500;600;700&display=swap');
      * { box-sizing: border-box; margin: 0; padding: 0; }
      ::-webkit-scrollbar { width: 0; }
      @keyframes slideInRight { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
      @keyframes slideInLeft { from { transform: translateX(-100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
      @keyframes floatEmber { 0%,100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-8px) rotate(10deg); } }
      .screen-slide-right { animation: slideInRight 0.28s ease-out; }
      .screen-slide-left { animation: slideInLeft 0.28s ease-out; }
      .ember { animation: floatEmber 3s ease-in-out infinite; }
    `),
    React.createElement('div', {
      style: {
        width: 375, height: 812, borderRadius: 50,
        background: t.bg,
        boxShadow: '0 30px 80px rgba(0,0,0,0.4)',
        display: 'flex', flexDirection: 'column',
        overflow: 'hidden', position: 'relative',
        border: `3px solid ${isDark ? '#1a2a38' : '#e0c8b0'}`,
      }
    },
      React.createElement('div', { style: { background: t.statusBar, flexShrink: 0 } },
        React.createElement(StatusBar, { t }),
        React.createElement(DynamicIsland)
      ),
      React.createElement('div', { style: { flex: 1, overflow: 'hidden', position: 'relative', display: 'flex', flexDirection: 'column' } },
        React.createElement('div', {
          key: activeTab,
          className: animating ? (slideDir > 0 ? 'screen-slide-right' : 'screen-slide-left') : '',
          style: { flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }
        },
          screens[activeTab]()
        )
      ),
      React.createElement('div', {
        style: {
          background: t.navBg,
          borderTop: `1px solid ${t.border}`,
          display: 'flex', padding: '10px 0 20px',
          flexShrink: 0,
        }
      },
        tabs.map(tab => {
          const isActive = activeTab === tab.id;
          const navItemStyle = {
            flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
            cursor: 'pointer', transition: 'all 0.2s',
          };
          const labelStyle = {
            fontSize: 10, fontWeight: isActive ? '700' : '500',
            color: isActive ? t.tabActive : t.tabInactive,
            fontFamily: 'Fredoka, sans-serif',
          };
          return React.createElement('div', {
            key: tab.id,
            onClick: () => handleTabChange(tab.id),
            style: navItemStyle
          },
            React.createElement('div', {
              style: {
                width: 36, height: 28, borderRadius: 10,
                background: isActive ? t.primary + '22' : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.2s',
              }
            },
              React.createElement(tab.icon, { size: 22, color: isActive ? t.tabActive : t.tabInactive, strokeWidth: isActive ? 2.5 : 1.8 })
            ),
            React.createElement('span', { style: labelStyle }, tab.label)
          );
        })
      )
    )
  );
}
