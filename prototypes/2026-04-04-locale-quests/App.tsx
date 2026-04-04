const { useState, useEffect, useRef } = React;

const THEMES = {
  dark: {
    bg: '#0e1a12',
    surface: '#162b1e',
    surfaceAlt: '#1c3322',
    surfaceHover: '#243d2a',
    text: '#f0ebe1',
    textMuted: '#8a9e8e',
    accent: '#d4621a',
    accentLight: '#e8783a',
    green: '#2d6a4f',
    greenLight: '#52b788',
    border: '#1e3426',
    navBg: '#0a130d',
    pill: '#1c3322',
    shadow: 'rgba(0,0,0,0.5)',
  },
  light: {
    bg: '#f5f0e8',
    surface: '#ffffff',
    surfaceAlt: '#ede8dd',
    surfaceHover: '#e4dece',
    text: '#1a2e20',
    textMuted: '#6b7a6e',
    accent: '#c4551a',
    accentLight: '#d4621a',
    green: '#2d6a4f',
    greenLight: '#3d8b65',
    border: '#d0c9bc',
    navBg: '#eae4d8',
    pill: '#e4dece',
    shadow: 'rgba(0,0,0,0.12)',
  }
};

// ─── Home Screen ──────────────────────────────────────────────────────────────
function HomeScreen({ t, setActiveScreen, isDark, setIsDark }) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [pressed, setPressed] = useState(null);

  const filters = ['All', 'Discovery', 'Civic', 'Community', 'Nature'];

  const quests = [
    { id: 1, emoji: '🔍', tag: 'DISCOVERY', title: 'Hidden in Plain Sight', desc: 'Find and photograph 3 historical markers in your district', xp: 150, time: '45 min', difficulty: 'Medium', category: 'Discovery' },
    { id: 2, emoji: '🌱', tag: 'IMPACT', title: 'Green Thumb Initiative', desc: 'Volunteer 15 min at the Riverside Community Garden on Oak St.', xp: 200, time: '20 min', difficulty: 'Easy', category: 'Community' },
    { id: 3, emoji: '♿', tag: 'CIVIC', title: 'Access Audit', desc: 'Rate the accessibility of 2 new public spaces near you', xp: 120, time: '30 min', difficulty: 'Easy', category: 'Civic' },
    { id: 4, emoji: '🎨', tag: 'DISCOVERY', title: 'Mural Hunt', desc: 'Document 2 pieces of street art with photos and artist info', xp: 180, time: '1 hr', difficulty: 'Medium', category: 'Discovery' },
    { id: 5, emoji: '🌊', tag: 'NATURE', title: 'Storm Drain Sentinel', desc: 'Check and log 3 storm drains for debris blockage', xp: 130, time: '25 min', difficulty: 'Easy', category: 'Nature' },
  ];

  const filtered = activeFilter === 'All' ? quests : quests.filter(q => q.category === activeFilter);

  return React.createElement('div', { style: { background: t.bg, minHeight: '100%', fontFamily: "'Bitter', serif", paddingBottom: 80 } },

    // ── Asymmetric editorial header ──
    React.createElement('div', { style: { padding: '28px 20px 0' } },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' } },
        React.createElement('div', {},
          React.createElement('p', { style: { color: t.accent, fontSize: 10, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', margin: 0 } }, 'Saturday · Apr 4 · Issue 42'),
          React.createElement('h1', { style: { color: t.text, fontSize: 38, fontWeight: 700, margin: '6px 0 0', lineHeight: 1.0, fontStyle: 'italic' } }, "Today's\nQuests"),
        ),
        React.createElement('button', {
          onClick: () => setIsDark(!isDark),
          style: { background: t.surfaceAlt, border: `1px solid ${t.border}`, borderRadius: 4, padding: '7px 10px', cursor: 'pointer', color: t.text, fontSize: 16, marginTop: 8, flexShrink: 0 }
        }, isDark ? '☀️' : '🌙')
      ),
      // Thick accent rule — editorial signature
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10, marginTop: 14 } },
        React.createElement('div', { style: { height: 3, background: t.accent, flex: 1 } }),
        React.createElement('div', { style: { height: 1, background: t.border, flex: 2 } }),
      ),
      // Filters
      React.createElement('div', { style: { display: 'flex', gap: 6, overflowX: 'auto', marginTop: 14, paddingBottom: 2 } },
        filters.map(f => React.createElement('button', {
          key: f,
          onClick: () => setActiveFilter(f),
          style: {
            flexShrink: 0, background: f === activeFilter ? t.accent : 'transparent',
            color: f === activeFilter ? '#fff' : t.textMuted,
            border: `1px solid ${f === activeFilter ? t.accent : t.border}`,
            borderRadius: 2, padding: '4px 12px', fontSize: 11,
            fontFamily: "'Bitter', serif", fontWeight: 700, cursor: 'pointer', letterSpacing: 0.5,
          }
        }, f))
      )
    ),

    // ── Featured Guild Mission ──
    React.createElement('div', { style: { padding: '20px 20px 0' } },
      React.createElement('p', { style: { color: t.textMuted, fontSize: 9, letterSpacing: 3, textTransform: 'uppercase', margin: '0 0 10px', fontWeight: 700 } }, '— Guild Mission of the Day'),
      React.createElement('div', {
        onClick: () => setActiveScreen('guild'),
        style: {
          background: t.green, borderRadius: 2, padding: '20px', position: 'relative',
          overflow: 'hidden', cursor: 'pointer',
          transform: pressed === 'featured' ? 'scale(0.97)' : 'scale(1)',
          transition: 'transform 0.15s ease',
        },
        onMouseDown: () => setPressed('featured'), onMouseUp: () => setPressed(null),
        onTouchStart: () => setPressed('featured'), onTouchEnd: () => setPressed(null),
      },
        React.createElement('div', { style: { position: 'absolute', top: -30, right: -30, width: 130, height: 130, borderRadius: '50%', background: 'rgba(212,98,26,0.2)', pointerEvents: 'none' } }),
        React.createElement('div', { style: { position: 'absolute', bottom: -20, left: '38%', width: 90, height: 90, borderRadius: '50%', background: 'rgba(255,255,255,0.04)', pointerEvents: 'none' } }),
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 } },
          React.createElement('span', { style: { background: t.accent, color: '#fff', fontSize: 9, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', padding: '3px 8px', borderRadius: 2 } }, 'Guild Mission'),
          React.createElement('span', { style: { color: 'rgba(255,255,255,0.5)', fontSize: 11 } }, '3 of 5 members active')
        ),
        React.createElement('h2', { style: { color: '#fff', fontSize: 28, fontWeight: 700, margin: '0 0 8px', lineHeight: 1.05, fontFamily: "'Bitter', serif" } }, 'Neighborhood\nHistorian'),
        React.createElement('p', { style: { color: 'rgba(255,255,255,0.7)', fontSize: 12, margin: '0 0 14px', lineHeight: 1.55 } }, 'Document 5 forgotten stories with photos and oral histories'),
        React.createElement('div', { style: { display: 'flex', alignItems: 'center' } },
          React.createElement('span', { style: { color: t.greenLight, fontSize: 13, fontWeight: 700 } }, '500 XP'),
          React.createElement('span', { style: { color: 'rgba(255,255,255,0.4)', fontSize: 12, marginLeft: 12 } }, '2h · Hard'),
          React.createElement('div', { style: { marginLeft: 'auto', background: t.accent, padding: '7px 16px', borderRadius: 2, cursor: 'pointer' } },
            React.createElement('span', { style: { color: '#fff', fontSize: 12, fontWeight: 700 } }, 'Join →')
          )
        ),
        React.createElement('div', { style: { marginTop: 14, background: 'rgba(255,255,255,0.15)', borderRadius: 2, height: 4 } },
          React.createElement('div', { style: { width: '40%', height: '100%', background: t.accent, borderRadius: 2 } })
        ),
        React.createElement('p', { style: { color: 'rgba(255,255,255,0.4)', fontSize: 10, margin: '5px 0 0', fontWeight: 700, letterSpacing: 1 } }, '2 OF 5 QUESTS COMPLETE')
      )
    ),

    // ── Solo Quests list ──
    React.createElement('div', { style: { padding: '20px' } },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 } },
        React.createElement('p', { style: { color: t.textMuted, fontSize: 9, letterSpacing: 3, textTransform: 'uppercase', margin: 0, fontWeight: 700 } }, '— Solo Quests'),
        React.createElement('span', { style: { color: t.accent, fontSize: 11, fontWeight: 700, cursor: 'pointer' } }, 'View all')
      ),
      filtered.map((quest, i) => React.createElement('div', {
        key: quest.id,
        style: {
          borderTop: `${i === 0 ? 2 : 1}px solid ${t.border}`,
          paddingTop: 14, paddingBottom: 14,
          display: 'flex', gap: 12, alignItems: 'flex-start', cursor: 'pointer',
          transform: pressed === quest.id ? 'scale(0.98)' : 'scale(1)',
          transition: 'transform 0.15s ease',
        },
        onMouseDown: () => setPressed(quest.id), onMouseUp: () => setPressed(null),
        onTouchStart: () => setPressed(quest.id), onTouchEnd: () => setPressed(null),
      },
        React.createElement('div', { style: { width: 44, height: 44, flexShrink: 0, background: t.surfaceAlt, borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 } }, quest.emoji),
        React.createElement('div', { style: { flex: 1 } },
          React.createElement('div', { style: { display: 'flex', gap: 8, alignItems: 'center', marginBottom: 4 } },
            React.createElement('span', { style: { color: t.accent, fontSize: 9, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase' } }, quest.tag),
            React.createElement('span', { style: { color: t.textMuted, fontSize: 11 } }, quest.time),
            React.createElement('span', { style: { background: quest.difficulty === 'Easy' ? 'rgba(82,183,136,0.15)' : 'rgba(212,98,26,0.15)', color: quest.difficulty === 'Easy' ? t.greenLight : t.accent, fontSize: 9, fontWeight: 700, padding: '2px 6px', borderRadius: 2, letterSpacing: 0.5 } }, quest.difficulty.toUpperCase())
          ),
          React.createElement('p', { style: { color: t.text, fontWeight: 700, fontSize: 14, margin: '0 0 3px', fontFamily: "'Bitter', serif" } }, quest.title),
          React.createElement('p', { style: { color: t.textMuted, fontSize: 12, margin: 0, lineHeight: 1.45 } }, quest.desc)
        ),
        React.createElement('div', { style: { textAlign: 'right', flexShrink: 0 } },
          React.createElement('div', { style: { color: t.greenLight, fontSize: 15, fontWeight: 700 } }, quest.xp),
          React.createElement('div', { style: { color: t.textMuted, fontSize: 9, fontWeight: 700, letterSpacing: 1 } }, 'XP')
        )
      ))
    )
  );
}

// ─── Explore Screen ───────────────────────────────────────────────────────────
function ExploreScreen({ t, setActiveScreen }) {
  const [selected, setSelected] = useState(null);

  const nearbyQuests = [
    { id: 1, emoji: '🌿', title: 'Sunset Park Cleanup', distance: '0.3 mi', category: 'Community', xp: 250, participants: 8, x: 55, y: 38 },
    { id: 2, emoji: '🎨', title: 'Library Art Trail', distance: '0.7 mi', category: 'Discovery', xp: 180, participants: 3, x: 28, y: 58 },
    { id: 3, emoji: '🛒', title: 'Farmers Market Guide', distance: '1.2 mi', category: 'Community', xp: 140, participants: 5, x: 72, y: 64 },
    { id: 4, emoji: '🌊', title: 'Storm Drain Survey', distance: '0.5 mi', category: 'Civic', xp: 160, participants: 2, x: 44, y: 74 },
    { id: 5, emoji: '🏛️', title: 'Heritage Marker Walk', distance: '0.9 mi', category: 'Discovery', xp: 200, participants: 6, x: 62, y: 26 },
  ];

  const sel = nearbyQuests.find(q => q.id === selected);

  return React.createElement('div', { style: { background: t.bg, minHeight: '100%', fontFamily: "'Bitter', serif", display: 'flex', flexDirection: 'column', paddingBottom: 80 } },

    // Header
    React.createElement('div', { style: { padding: '28px 20px 16px', borderBottom: `1px solid ${t.border}` } },
      React.createElement('p', { style: { color: t.accent, fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', margin: '0 0 4px', fontWeight: 700 } }, '— Riverside District'),
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' } },
        React.createElement('h1', { style: { color: t.text, fontSize: 32, fontWeight: 700, margin: 0, lineHeight: 1.0, fontStyle: 'italic' } }, 'Explore'),
        React.createElement('span', { style: { color: t.textMuted, fontSize: 12, paddingBottom: 4 } }, `${nearbyQuests.length} quests nearby`)
      )
    ),

    // Map
    React.createElement('div', { style: { margin: '16px 20px 0', height: 210, background: THEMES.dark === t ? '#0e1f14' : '#dae8d2', borderRadius: 2, position: 'relative', overflow: 'hidden', border: `1px solid ${t.border}` } },
      React.createElement('div', { style: { position: 'absolute', inset: 0, backgroundImage: `linear-gradient(${t.border}30 1px, transparent 1px), linear-gradient(90deg, ${t.border}30 1px, transparent 1px)`, backgroundSize: '32px 32px' } }),
      React.createElement('div', { style: { position: 'absolute', top: '48%', left: 0, right: 0, height: 2, background: t.border + '60' } }),
      React.createElement('div', { style: { position: 'absolute', left: '42%', top: 0, bottom: 0, width: 2, background: t.border + '60' } }),
      React.createElement('div', { style: { position: 'absolute', top: '28%', left: '14%', right: '22%', height: 1, background: t.border + '40', transform: 'rotate(18deg)' } }),
      nearbyQuests.map(q => React.createElement('button', {
        key: q.id,
        onClick: () => setSelected(selected === q.id ? null : q.id),
        style: {
          position: 'absolute', left: `${q.x}%`, top: `${q.y}%`,
          transform: 'translate(-50%,-50%)',
          background: selected === q.id ? t.accent : t.green,
          border: `2px solid ${selected === q.id ? '#fff' : t.greenLight}`,
          borderRadius: 4, padding: '4px 6px', cursor: 'pointer',
          fontSize: 14, zIndex: 2,
          boxShadow: selected === q.id ? `0 4px 12px rgba(212,98,26,0.5)` : 'none',
          transition: 'all 0.2s ease',
        }
      }, q.emoji)),
      React.createElement('div', { style: { position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: 14, height: 14, background: t.accent, borderRadius: '50%', border: '3px solid #fff', zIndex: 3, boxShadow: `0 0 0 6px rgba(212,98,26,0.25)` } }),
      React.createElement('div', { style: { position: 'absolute', bottom: 8, right: 8, background: t.bg + 'cc', borderRadius: 2, padding: '3px 8px' } },
        React.createElement('span', { style: { color: t.textMuted, fontSize: 9, letterSpacing: 1.5, fontWeight: 700 } }, 'RIVERSIDE DISTRICT')
      )
    ),

    // Selected quest detail
    sel && React.createElement('div', { style: { margin: '10px 20px 0', background: t.green, borderRadius: 2, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 12 } },
      React.createElement('span', { style: { fontSize: 22 } }, sel.emoji),
      React.createElement('div', { style: { flex: 1 } },
        React.createElement('p', { style: { color: '#fff', fontWeight: 700, fontSize: 14, margin: '0 0 2px' } }, sel.title),
        React.createElement('p', { style: { color: 'rgba(255,255,255,0.55)', fontSize: 11, margin: 0 } }, `${sel.distance} · ${sel.participants} on this quest`)
      ),
      React.createElement('div', { style: { background: t.accent, padding: '6px 12px', borderRadius: 2, cursor: 'pointer' } },
        React.createElement('span', { style: { color: '#fff', fontSize: 11, fontWeight: 700 } }, `${sel.xp} XP`)
      )
    ),

    // List
    React.createElement('div', { style: { flex: 1, padding: '16px 20px 0' } },
      React.createElement('p', { style: { color: t.textMuted, fontSize: 9, letterSpacing: 3, textTransform: 'uppercase', margin: '0 0 8px', fontWeight: 700 } }, `— ${nearbyQuests.length} quests within 2 miles`),
      nearbyQuests.map((q, i) => React.createElement('div', {
        key: q.id,
        onClick: () => setSelected(q.id === selected ? null : q.id),
        style: {
          display: 'flex', alignItems: 'center', gap: 12,
          padding: '12px 0', borderTop: `1px solid ${t.border}`, cursor: 'pointer',
          background: selected === q.id ? t.surfaceAlt : 'transparent',
          transition: 'background 0.15s ease',
        }
      },
        React.createElement('div', { style: { width: 36, height: 36, borderRadius: 2, background: t.surfaceAlt, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 } }, q.emoji),
        React.createElement('div', { style: { flex: 1 } },
          React.createElement('p', { style: { color: t.text, fontWeight: 700, fontSize: 13, margin: '0 0 2px' } }, q.title),
          React.createElement('p', { style: { color: t.textMuted, fontSize: 11, margin: 0 } }, `${q.distance} · ${q.category}`)
        ),
        React.createElement('div', { style: { textAlign: 'right' } },
          React.createElement('div', { style: { color: t.greenLight, fontSize: 13, fontWeight: 700 } }, q.xp),
          React.createElement('div', { style: { color: t.textMuted, fontSize: 9, fontWeight: 700 } }, 'XP')
        )
      ))
    )
  );
}

// ─── Guild Screen ─────────────────────────────────────────────────────────────
function GuildScreen({ t, setActiveScreen }) {
  const [activeTab, setActiveTab] = useState('missions');

  const members = [
    { name: 'Alex M.', emoji: '👤', xp: 1240, status: 'active', color: '#52b788' },
    { name: 'Jordan P.', emoji: '👤', xp: 980, status: 'active', color: '#52b788' },
    { name: 'Sam K.', emoji: '👤', xp: 760, status: 'away', color: '#8a9e8e' },
    { name: 'Riley C.', emoji: '👤', xp: 650, status: 'active', color: '#52b788' },
    { name: 'You', emoji: '⭐', xp: 520, status: 'active', color: t.accent },
  ];

  const missions = [
    { id: 1, title: 'Neighborhood Historian', progress: 2, total: 5, xp: 500, deadline: '2 days', done: false },
    { id: 2, title: 'Green Corridor Initiative', progress: 1, total: 3, xp: 350, deadline: '4 days', done: false },
    { id: 3, title: 'Transit Accessibility Audit', progress: 4, total: 4, xp: 400, deadline: 'Completed', done: true },
  ];

  const chatMessages = [
    { from: 'Alex M.', text: 'Just found marker #2 near the old clocktower! 📍', time: '2m ago', mine: false },
    { from: 'You', text: "Nice! I'm heading to the waterfront next", time: '5m ago', mine: true },
    { from: 'Jordan P.', text: 'Anyone need a ride to Riverside Park for the cleanup?', time: '12m ago', mine: false },
    { from: 'Sam K.', text: 'Great work on the transit audit everyone! 🎉', time: '1h ago', mine: false },
  ];

  return React.createElement('div', { style: { background: t.bg, minHeight: '100%', fontFamily: "'Bitter', serif", paddingBottom: 80 } },

    // Header
    React.createElement('div', { style: { padding: '28px 20px 0' } },
      React.createElement('p', { style: { color: t.accent, fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', margin: '0 0 4px', fontWeight: 700 } }, '— Your Guild'),
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' } },
        React.createElement('h1', { style: { color: t.text, fontSize: 30, fontWeight: 700, margin: 0, lineHeight: 1.0, fontStyle: 'italic' } }, 'The Urban\nPioneers'),
        React.createElement('div', { style: { textAlign: 'right', paddingBottom: 4 } },
          React.createElement('div', { style: { color: t.greenLight, fontSize: 22, fontWeight: 700 } }, '4,150'),
          React.createElement('div', { style: { color: t.textMuted, fontSize: 9, fontWeight: 700, letterSpacing: 1 } }, 'GUILD XP')
        )
      ),
      React.createElement('div', { style: { height: 2, background: t.accent, marginTop: 14 } })
    ),

    // Member avatars
    React.createElement('div', { style: { padding: '14px 20px', display: 'flex', gap: 10, overflowX: 'auto' } },
      members.map(m => React.createElement('div', { key: m.name, style: { flexShrink: 0, textAlign: 'center', width: 52 } },
        React.createElement('div', { style: { position: 'relative', width: 44, height: 44, margin: '0 auto 5px' } },
          React.createElement('div', { style: { width: 44, height: 44, borderRadius: 2, background: t.surfaceAlt, border: `2px solid ${m.name === 'You' ? t.accent : t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 } }, m.emoji),
          React.createElement('div', { style: { position: 'absolute', bottom: -2, right: -2, width: 8, height: 8, borderRadius: '50%', background: m.color, border: `2px solid ${t.bg}` } })
        ),
        React.createElement('p', { style: { color: t.text, fontSize: 9, fontWeight: 700, margin: 0, lineHeight: 1.2 } }, m.name)
      ))
    ),

    // Tabs
    React.createElement('div', { style: { display: 'flex', borderBottom: `1px solid ${t.border}`, margin: '0 20px' } },
      ['missions', 'leaderboard', 'chat'].map(tab => React.createElement('button', {
        key: tab, onClick: () => setActiveTab(tab),
        style: { flex: 1, background: 'transparent', border: 'none', borderBottom: `2px solid ${activeTab === tab ? t.accent : 'transparent'}`, color: activeTab === tab ? t.text : t.textMuted, fontSize: 11, fontFamily: "'Bitter', serif", fontWeight: 700, padding: '10px 0', cursor: 'pointer', textTransform: 'capitalize', letterSpacing: 0.5, marginBottom: -1 }
      }, tab))
    ),

    // Missions tab
    activeTab === 'missions' && React.createElement('div', { style: { padding: '16px 20px' } },
      missions.map(m => React.createElement('div', {
        key: m.id,
        style: { marginBottom: 12, padding: '14px', background: t.surfaceAlt, borderRadius: 2, borderLeft: `3px solid ${m.done ? t.greenLight : t.accent}` }
      },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: 8 } },
          React.createElement('p', { style: { color: t.text, fontWeight: 700, fontSize: 14, margin: 0 } }, m.title),
          React.createElement('span', { style: { color: t.greenLight, fontSize: 13, fontWeight: 700 } }, `${m.xp} XP`)
        ),
        React.createElement('div', { style: { background: t.border, borderRadius: 2, height: 4, marginBottom: 6 } },
          React.createElement('div', { style: { width: `${(m.progress / m.total) * 100}%`, height: '100%', background: m.done ? t.greenLight : t.accent, borderRadius: 2 } })
        ),
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between' } },
          React.createElement('span', { style: { color: t.textMuted, fontSize: 11 } }, `${m.progress}/${m.total} quests`),
          React.createElement('span', { style: { color: m.done ? t.greenLight : t.accent, fontSize: 10, fontWeight: 700, letterSpacing: 1 } }, m.done ? '✓ COMPLETE' : `${m.deadline} left`)
        )
      ))
    ),

    // Leaderboard tab
    activeTab === 'leaderboard' && React.createElement('div', { style: { padding: '16px 20px' } },
      [...members].sort((a, b) => b.xp - a.xp).map((m, i) => React.createElement('div', {
        key: m.name,
        style: { display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderTop: `${i === 0 ? 2 : 1}px solid ${t.border}` }
      },
        React.createElement('span', { style: { width: 24, textAlign: 'center', color: i === 0 ? t.accent : t.textMuted, fontSize: 13, fontWeight: 700 } }, `#${i + 1}`),
        React.createElement('div', { style: { width: 32, height: 32, borderRadius: 2, background: t.surfaceAlt, fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', border: m.name === 'You' ? `2px solid ${t.accent}` : 'none' } }, m.emoji),
        React.createElement('span', { style: { flex: 1, color: t.text, fontWeight: m.name === 'You' ? 700 : 400, fontSize: 13 } }, m.name),
        React.createElement('span', { style: { color: t.greenLight, fontWeight: 700, fontSize: 13 } }, `${m.xp.toLocaleString()} XP`)
      ))
    ),

    // Chat tab
    activeTab === 'chat' && React.createElement('div', { style: { padding: '16px 20px' } },
      chatMessages.map((msg, i) => React.createElement('div', {
        key: i,
        style: { display: 'flex', flexDirection: msg.mine ? 'row-reverse' : 'row', gap: 8, marginBottom: 12, alignItems: 'flex-end' }
      },
        React.createElement('div', { style: { width: 28, height: 28, flexShrink: 0, background: msg.mine ? t.accent : t.surfaceAlt, borderRadius: 2, fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' } }, msg.mine ? '⭐' : '👤'),
        React.createElement('div', { style: { maxWidth: '75%', background: msg.mine ? t.accent : t.surfaceAlt, borderRadius: 2, padding: '8px 12px' } },
          !msg.mine && React.createElement('p', { style: { color: t.accent, fontSize: 10, fontWeight: 700, margin: '0 0 2px', letterSpacing: 0.5 } }, msg.from),
          React.createElement('p', { style: { color: msg.mine ? '#fff' : t.text, fontSize: 12, margin: '0 0 2px', lineHeight: 1.4 } }, msg.text),
          React.createElement('p', { style: { color: msg.mine ? 'rgba(255,255,255,0.5)' : t.textMuted, fontSize: 10, margin: 0 } }, msg.time)
        )
      )),
      React.createElement('div', { style: { display: 'flex', gap: 8, marginTop: 8 } },
        React.createElement('input', { placeholder: 'Message your guild...', style: { flex: 1, background: t.surfaceAlt, border: `1px solid ${t.border}`, borderRadius: 2, padding: '10px 12px', color: t.text, fontSize: 12, fontFamily: "'Bitter', serif", outline: 'none' } }),
        React.createElement('button', { style: { background: t.accent, border: 'none', borderRadius: 2, padding: '10px 14px', color: '#fff', fontSize: 13, cursor: 'pointer', fontWeight: 700 } }, '→')
      )
    )
  );
}

// ─── Impact Screen ────────────────────────────────────────────────────────────
function ImpactScreen({ t, setActiveScreen }) {
  const stats = [
    { label: 'Quests Done', value: '47', sub: 'this month', accent: true },
    { label: 'Hours Given', value: '23h', sub: 'community time', accent: false },
    { label: 'Places Mapped', value: '18', sub: 'locations', accent: false },
    { label: 'City Rank', value: '#12', sub: 'guild standing', accent: false },
  ];

  const recentImpacts = [
    { icon: '🌿', title: 'Riverside Garden Cleanup', impact: '2 tons of debris cleared', date: 'Apr 2', guild: true },
    { icon: '📚', title: 'Library Art Documentation', impact: '8 artworks catalogued', date: 'Mar 30', guild: false },
    { icon: '♿', title: 'Transit Accessibility Survey', impact: '12 stops assessed', date: 'Mar 28', guild: true },
    { icon: '🔍', title: 'Historical Marker Hunt', impact: '5 markers documented', date: 'Mar 25', guild: false },
  ];

  const achievements = [
    { emoji: '🔍', title: 'Urban Explorer', desc: 'Completed 10 discovery quests', earned: true },
    { emoji: '🌱', title: 'Community Seed', desc: 'First community impact quest', earned: true },
    { emoji: '📍', title: 'Cartographer', desc: 'Documented 15+ locations', earned: true },
    { emoji: '⚡', title: 'Streak Master', desc: '7-day quest streak — 2 days to go', earned: false },
    { emoji: '🤝', title: 'Guild Leader', desc: 'Led 5 guild missions', earned: false },
  ];

  return React.createElement('div', { style: { background: t.bg, minHeight: '100%', fontFamily: "'Bitter', serif", paddingBottom: 80 } },

    // Asymmetric editorial header
    React.createElement('div', { style: { padding: '28px 20px 0' } },
      React.createElement('p', { style: { color: t.accent, fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', margin: '0 0 4px', fontWeight: 700 } }, '— Your Footprint'),
      React.createElement('div', { style: { display: 'flex', alignItems: 'flex-end', gap: 12 } },
        React.createElement('h1', { style: { color: t.text, fontSize: 32, fontWeight: 700, margin: 0, lineHeight: 1.0, fontStyle: 'italic', flex: 1 } }, 'Impact\nLedger'),
        React.createElement('div', { style: { background: t.accent, padding: '5px 12px', borderRadius: 2, marginBottom: 4, flexShrink: 0 } },
          React.createElement('span', { style: { color: '#fff', fontSize: 11, fontWeight: 700 } }, 'APRIL 2026')
        )
      ),
      // Progress bar row
      React.createElement('div', { style: { marginTop: 14 } },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 0 } },
          React.createElement('div', { style: { height: 3, background: t.greenLight, width: '65%', borderRadius: '2px 0 0 2px' } }),
          React.createElement('div', { style: { height: 3, background: t.border, flex: 1, borderRadius: '0 2px 2px 0' } }),
        ),
        React.createElement('p', { style: { color: t.textMuted, fontSize: 10, margin: '4px 0 0', fontWeight: 700, letterSpacing: 1 } }, 'MONTH PROGRESS · 65%')
      )
    ),

    // Stats 2×2 grid — asymmetric sizing
    React.createElement('div', { style: { padding: '20px' } },
      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 10 } },
        stats.map((s, i) => React.createElement('div', {
          key: s.label,
          style: { background: i === 0 ? t.green : t.surfaceAlt, padding: '14px 14px', borderRadius: 2, borderLeft: i > 0 ? `2px solid ${i === 1 ? t.accent : t.border}` : 'none' }
        },
          React.createElement('div', { style: { color: i === 0 ? '#fff' : t.text, fontSize: 30, fontWeight: 700, lineHeight: 1, marginBottom: 4, fontFamily: "'Bitter', serif" } }, s.value),
          React.createElement('div', { style: { color: i === 0 ? 'rgba(255,255,255,0.65)' : t.textMuted, fontSize: 11 } }, s.label),
          React.createElement('div', { style: { color: i === 0 ? t.greenLight : t.accent, fontSize: 10, fontWeight: 700, letterSpacing: 0.5, marginTop: 2 } }, s.sub)
        ))
      )
    ),

    // Recent Impact list
    React.createElement('div', { style: { padding: '0 20px' } },
      React.createElement('p', { style: { color: t.textMuted, fontSize: 9, letterSpacing: 3, textTransform: 'uppercase', margin: '0 0 10px', fontWeight: 700 } }, '— Recent Impact'),
      recentImpacts.map((item, i) => React.createElement('div', {
        key: i,
        style: { display: 'flex', gap: 12, padding: '12px 0', borderTop: `1px solid ${t.border}`, alignItems: 'center' }
      },
        React.createElement('div', { style: { width: 36, height: 36, background: t.surfaceAlt, borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 } }, item.icon),
        React.createElement('div', { style: { flex: 1 } },
          React.createElement('div', { style: { display: 'flex', gap: 6, alignItems: 'center', marginBottom: 3 } },
            React.createElement('p', { style: { color: t.text, fontWeight: 700, fontSize: 13, margin: 0 } }, item.title),
            item.guild && React.createElement('span', { style: { background: t.green, color: '#fff', fontSize: 9, padding: '2px 5px', borderRadius: 2, fontWeight: 700, letterSpacing: 0.5 } }, 'GUILD')
          ),
          React.createElement('p', { style: { color: t.greenLight, fontSize: 12, margin: 0 } }, item.impact)
        ),
        React.createElement('span', { style: { color: t.textMuted, fontSize: 11, flexShrink: 0 } }, item.date)
      ))
    ),

    // Achievements
    React.createElement('div', { style: { padding: '20px' } },
      React.createElement('p', { style: { color: t.textMuted, fontSize: 9, letterSpacing: 3, textTransform: 'uppercase', margin: '0 0 12px', fontWeight: 700 } }, '— Achievements'),
      achievements.map(a => React.createElement('div', {
        key: a.title,
        style: { display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', background: a.earned ? t.surfaceAlt : 'transparent', border: `1px solid ${t.border}`, borderRadius: 2, marginBottom: 8, opacity: a.earned ? 1 : 0.45 }
      },
        React.createElement('span', { style: { fontSize: 20 } }, a.emoji),
        React.createElement('div', { style: { flex: 1 } },
          React.createElement('p', { style: { color: t.text, fontWeight: 700, fontSize: 12, margin: '0 0 1px' } }, a.title),
          React.createElement('p', { style: { color: t.textMuted, fontSize: 10, margin: 0 } }, a.desc)
        ),
        a.earned && React.createElement('span', { style: { color: t.greenLight, fontSize: 16, fontWeight: 700 } }, '✓')
      ))
    )
  );
}

// ─── Profile Screen ───────────────────────────────────────────────────────────
function ProfileScreen({ t, setActiveScreen, isDark, setIsDark }) {
  const skills = [
    { name: 'Urban Discovery', level: 4, max: 5, xp: 840, color: t.accent },
    { name: 'Civic Engagement', level: 3, max: 5, xp: 620, color: t.greenLight },
    { name: 'Community Building', level: 2, max: 5, xp: 380, color: t.green },
    { name: 'Environmental Action', level: 1, max: 5, xp: 140, color: t.textMuted },
  ];

  const scrollSuggestions = [
    { emoji: '🏛️', title: 'Architectural Heritage', desc: 'Unlock based on your history marker quests' },
    { emoji: '🌊', title: 'Water Systems Advocate', desc: 'Complete 3 storm drain surveys to unlock' },
    { emoji: '🎙️', title: 'Oral Historian', desc: 'Record 2 community stories with audio' },
  ];

  const settingsItems = ['Quest Notifications', 'Privacy Settings', 'Location Services', 'Guild Invites', 'About Locale Quests'];

  return React.createElement('div', { style: { background: t.bg, minHeight: '100%', fontFamily: "'Bitter', serif", paddingBottom: 80 } },

    // Hero header on green
    React.createElement('div', { style: { padding: '28px 20px 20px', background: t.green, position: 'relative', overflow: 'hidden' } },
      React.createElement('div', { style: { position: 'absolute', top: -40, right: -40, width: 160, height: 160, borderRadius: '50%', background: 'rgba(212,98,26,0.18)', pointerEvents: 'none' } }),
      React.createElement('div', { style: { position: 'absolute', bottom: -30, left: '35%', width: 100, height: 100, borderRadius: '50%', background: 'rgba(255,255,255,0.04)', pointerEvents: 'none' } }),
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 } },
        React.createElement('p', { style: { color: 'rgba(255,255,255,0.55)', fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', margin: 0, fontWeight: 700 } }, '— Your Profile'),
        React.createElement('button', {
          onClick: () => setIsDark(!isDark),
          style: { background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 4, padding: '5px 9px', cursor: 'pointer', color: '#fff', fontSize: 14 }
        }, isDark ? '☀️' : '🌙')
      ),
      React.createElement('div', { style: { display: 'flex', gap: 14, alignItems: 'flex-end' } },
        React.createElement('div', { style: { width: 64, height: 64, borderRadius: 4, background: t.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, flexShrink: 0, border: '3px solid rgba(255,255,255,0.25)' } }, '⭐'),
        React.createElement('div', {},
          React.createElement('h2', { style: { color: '#fff', fontSize: 24, fontWeight: 700, margin: '0 0 2px', fontStyle: 'italic' } }, 'Alex Chen'),
          React.createElement('p', { style: { color: 'rgba(255,255,255,0.6)', fontSize: 12, margin: '0 0 8px' } }, 'Riverside District · Level 7'),
          React.createElement('div', { style: { display: 'flex', gap: 18 } },
            [['520', 'XP'], ['47', 'QUESTS'], ['5', 'STREAK']].map(([val, label]) =>
              React.createElement('div', { key: label },
                React.createElement('div', { style: { color: '#fff', fontSize: 17, fontWeight: 700, lineHeight: 1 } }, val),
                React.createElement('div', { style: { color: 'rgba(255,255,255,0.45)', fontSize: 9, fontWeight: 700, letterSpacing: 1 } }, label)
              )
            )
          )
        )
      )
    ),

    // Skill Scrolls
    React.createElement('div', { style: { padding: '20px' } },
      React.createElement('p', { style: { color: t.textMuted, fontSize: 9, letterSpacing: 3, textTransform: 'uppercase', margin: '0 0 16px', fontWeight: 700 } }, '— Skill Scrolls'),
      skills.map(s => React.createElement('div', { key: s.name, style: { marginBottom: 16 } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: 7 } },
          React.createElement('span', { style: { color: t.text, fontSize: 13, fontWeight: 700 } }, s.name),
          React.createElement('span', { style: { color: t.textMuted, fontSize: 11 } }, `Lv. ${s.level} · ${s.xp} XP`)
        ),
        React.createElement('div', { style: { display: 'flex', gap: 3 } },
          Array.from({ length: s.max }).map((_, i) => React.createElement('div', {
            key: i,
            style: { flex: 1, height: 6, borderRadius: 2, background: i < s.level ? s.color : t.border, transition: 'background 0.3s' }
          }))
        )
      ))
    ),

    // Adaptive suggestions
    React.createElement('div', { style: { padding: '0 20px' } },
      React.createElement('p', { style: { color: t.textMuted, fontSize: 9, letterSpacing: 3, textTransform: 'uppercase', margin: '0 0 12px', fontWeight: 700 } }, '— Adaptive Next Steps'),
      scrollSuggestions.map((s, i) => React.createElement('div', {
        key: i,
        style: { display: 'flex', gap: 12, padding: '12px 14px', background: t.surfaceAlt, borderRadius: 2, marginBottom: 8, borderLeft: `3px solid ${t.accent}`, cursor: 'pointer', alignItems: 'center' }
      },
        React.createElement('span', { style: { fontSize: 22 } }, s.emoji),
        React.createElement('div', { style: { flex: 1 } },
          React.createElement('p', { style: { color: t.text, fontWeight: 700, fontSize: 13, margin: '0 0 2px' } }, s.title),
          React.createElement('p', { style: { color: t.textMuted, fontSize: 11, margin: 0 } }, s.desc)
        ),
        React.createElement('span', { style: { color: t.accent, fontSize: 16 } }, '→')
      ))
    ),

    // Settings
    React.createElement('div', { style: { padding: '20px' } },
      React.createElement('p', { style: { color: t.textMuted, fontSize: 9, letterSpacing: 3, textTransform: 'uppercase', margin: '0 0 0px', fontWeight: 700 } }, '— Settings'),
      settingsItems.map((s, i) => React.createElement('div', {
        key: s,
        style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderTop: `${i === 0 ? 2 : 1}px solid ${t.border}`, cursor: 'pointer' }
      },
        React.createElement('span', { style: { color: t.text, fontSize: 13 } }, s),
        React.createElement('span', { style: { color: t.textMuted, fontSize: 16 } }, '›')
      ))
    )
  );
}

// ─── Root App Component ───────────────────────────────────────────────────────
function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [isDark, setIsDark] = useState(true);

  const t = isDark ? THEMES.dark : THEMES.light;

  const screens = {
    home: HomeScreen,
    explore: ExploreScreen,
    guild: GuildScreen,
    impact: ImpactScreen,
    profile: ProfileScreen,
  };

  const ScreenComponent = screens[activeScreen] || HomeScreen;

  const navItems = [
    { id: 'home', label: 'Home', icon: 'Home' },
    { id: 'explore', label: 'Explore', icon: 'Map' },
    { id: 'guild', label: 'Guild', icon: 'Users' },
    { id: 'impact', label: 'Impact', icon: 'BarChart2' },
    { id: 'profile', label: 'Profile', icon: 'User' },
  ];

  const fontStyle = `
    @import url('https://fonts.googleapis.com/css2?family=Bitter:ital,wght@0,400;0,600;0,700;1,400;1,700&display=swap');
    *, *::before, *::after { box-sizing: border-box; }
    ::-webkit-scrollbar { width: 0; height: 0; }
    body { margin: 0; padding: 0; }
    input::placeholder { color: #8a9e8e; }
    button { font-family: 'Bitter', serif; }
  `;

  return React.createElement('div', {
    style: { minHeight: '100vh', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', fontFamily: "'Bitter', serif" }
  },
    React.createElement('style', { dangerouslySetInnerHTML: { __html: fontStyle } }),

    // Phone frame
    React.createElement('div', {
      style: {
        width: 375, height: 812,
        background: t.bg, borderRadius: 40,
        overflow: 'hidden', position: 'relative',
        boxShadow: `0 40px 80px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.08)`,
        display: 'flex', flexDirection: 'column',
      }
    },

      // Scrollable content area
      React.createElement('div', { style: { flex: 1, overflowY: 'auto', overflowX: 'hidden' } },
        React.createElement(ScreenComponent, { t, setActiveScreen, isDark, setIsDark })
      ),

      // Bottom navigation
      React.createElement('div', {
        style: { background: t.navBg, borderTop: `1px solid ${t.border}`, display: 'flex', paddingBottom: 10, paddingTop: 2, flexShrink: 0 }
      },
        navItems.map(item => {
          const Icon = window.lucide && window.lucide[item.icon];
          const isActive = activeScreen === item.id;
          return React.createElement('button', {
            key: item.id,
            onClick: () => setActiveScreen(item.id),
            style: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 10, paddingBottom: 2, background: 'transparent', border: 'none', cursor: 'pointer', color: isActive ? t.accent : t.textMuted, transition: 'color 0.15s ease' }
          },
            Icon
              ? React.createElement(Icon, { size: 20, strokeWidth: isActive ? 2.5 : 1.5 })
              : React.createElement('span', { style: { fontSize: 18 } }, '·'),
            React.createElement('span', { style: { fontSize: 10, marginTop: 3, fontFamily: "'Bitter', serif", fontWeight: isActive ? 700 : 400 } }, item.label)
          );
        })
      )
    )
  );
}
