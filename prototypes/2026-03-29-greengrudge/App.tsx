const { useState, useEffect, useRef } = React;

const themes = {
  dark: {
    bg: '#141210', surface: '#1C1915', card: '#242018', cardAlt: '#2C271E',
    primary: '#E8735A', primaryMuted: 'rgba(232,115,90,0.13)', primaryBright: '#F09070',
    secondary: '#C4956A', secondaryMuted: 'rgba(196,149,106,0.13)',
    accent: '#4A8C6F', accentMuted: 'rgba(74,140,111,0.13)',
    text: '#F5F0E8', textMuted: '#8A7A6A', textFaint: '#4E4438',
    border: '#2C271E', borderMid: '#3A3428',
    nav: '#141210', navBorder: '#242018',
    success: '#5BAA7A', danger: '#E05555',
  },
  light: {
    bg: '#FAF8F5', surface: '#FFFFFF', card: '#FFFFFF', cardAlt: '#F5F0E8',
    primary: '#D4634A', primaryMuted: 'rgba(212,99,74,0.09)', primaryBright: '#E8735A',
    secondary: '#B8844A', secondaryMuted: 'rgba(184,132,74,0.1)',
    accent: '#3D7A5E', accentMuted: 'rgba(61,122,94,0.1)',
    text: '#2C2416', textMuted: '#7A6A5A', textFaint: '#C0B0A0',
    border: '#EAE4DA', borderMid: '#DDD5C8',
    nav: '#FFFFFF', navBorder: '#EAE4DA',
    success: '#4A9A6A', danger: '#C84444',
  }
};

// ─── HOME ─────────────────────────────────────────────────────────────────────
function HomeScreen({ t, isDark }) {
  const leaderboard = [
    { rank: 1, name: 'Sophia L.', faction: 'Viridians', points: 4820, delta: '+2' },
    { rank: 2, name: 'You', faction: 'Viridians', points: 4640, delta: '+1', isYou: true },
    { rank: 3, name: 'Marcus T.', faction: 'Terrans', points: 4410, delta: '-1' },
    { rank: 4, name: 'Alex K.', faction: 'Solars', points: 3980, delta: '0' },
  ];
  const rewards = [
    { title: '15% off Local Roast', Icon: window.lucide.Coffee, progress: 80, sub: 'Coffee shop' },
    { title: 'Eco-Art #047', Icon: window.lucide.Palette, progress: 60, sub: 'Collectible' },
    { title: 'Green Market Pass', Icon: window.lucide.Leaf, progress: 45, sub: 'Weekend event' },
  ];

  return React.createElement('div', { style: { height: '100%', overflowY: 'auto', background: t.bg, paddingBottom: 20 } },
    // Header
    React.createElement('div', { style: { padding: '10px 24px 0' } },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' } },
        React.createElement('div', null,
          React.createElement('div', { style: { fontSize: 10, letterSpacing: '2px', textTransform: 'uppercase', color: t.textMuted, marginBottom: 3, fontFamily: "'Inter',sans-serif" } }, 'Week 12 · Season 3'),
          React.createElement('div', { style: { fontFamily: "'Playfair Display',serif", fontSize: 30, fontWeight: 800, color: t.text, lineHeight: 1, letterSpacing: '-0.5px' } }, 'GreenGrudge')
        ),
        React.createElement('div', {
          style: { width: 44, height: 44, borderRadius: '50%', background: `linear-gradient(135deg,${t.primary},${t.secondary})`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 4px 16px rgba(232,115,90,0.35)`, cursor: 'pointer' }
        }, React.createElement('span', { style: { fontFamily: "'Playfair Display',serif", fontWeight: 800, fontSize: 18, color: '#fff' } }, 'S'))
      )
    ),

    // Stats strip
    React.createElement('div', { style: { padding: '12px 24px', display: 'flex', gap: 10 } },
      [
        { label: 'Eco Points', value: '4,640', Icon: window.lucide.Leaf, color: t.accent },
        { label: 'Streak', value: '14 days', Icon: window.lucide.Flame, color: t.primary },
        { label: 'Global Rank', value: '#2', Icon: window.lucide.Trophy, color: t.secondary },
      ].map((s, i) =>
        React.createElement('div', { key: i, style: { flex: 1, background: t.card, border: `1px solid ${t.border}`, borderRadius: 14, padding: '11px 8px', textAlign: 'center' } },
          React.createElement(s.Icon, { size: 15, color: s.color, style: { display: 'block', margin: '0 auto 5px' } }),
          React.createElement('div', { style: { fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: 16, color: t.text, lineHeight: 1 } }, s.value),
          React.createElement('div', { style: { fontSize: 9, color: t.textMuted, marginTop: 3, letterSpacing: '0.8px', textTransform: 'uppercase', fontFamily: "'Inter',sans-serif" } }, s.label)
        )
      )
    ),

    // Active Grudges — overlapping angled cards
    React.createElement('div', { style: { padding: '0 24px 16px' } },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 } },
        React.createElement('div', { style: { fontFamily: "'Playfair Display',serif", fontSize: 21, fontWeight: 700, color: t.text, fontStyle: 'italic' } }, 'Active Grudges'),
        React.createElement('span', { style: { fontSize: 12, color: t.primary, fontWeight: 600, fontFamily: "'Inter',sans-serif" } }, '2 running')
      ),
      React.createElement('div', { style: { position: 'relative', height: 165 } },
        // Back card angled
        React.createElement('div', {
          style: {
            position: 'absolute', top: 10, left: 2, right: 2,
            background: isDark ? '#2C271E' : '#F0EBE0',
            border: `1px solid ${t.borderMid}`, borderRadius: 18, padding: '14px 16px',
            transform: 'rotate(2.6deg)', transformOrigin: 'bottom center',
          }
        },
          React.createElement('div', { style: { fontFamily: "'Playfair Display',serif", fontWeight: 600, fontSize: 15, color: t.textMuted } }, 'vs. Maya R.'),
          React.createElement('div', { style: { fontSize: 12, color: t.textFaint, marginTop: 3, fontFamily: "'Inter',sans-serif" } }, 'Reduce takeout packaging · 5d left')
        ),
        // Front card
        React.createElement('div', {
          style: {
            position: 'absolute', top: 0, left: 0, right: 0,
            background: t.card, border: `1.5px solid ${t.primary}`, borderRadius: 18, padding: 16,
            boxShadow: isDark ? '0 8px 32px rgba(0,0,0,0.5)' : '0 8px 24px rgba(0,0,0,0.1)',
          }
        },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 } },
            React.createElement('div', null,
              React.createElement('div', { style: { fontSize: 10, color: t.primary, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 3, fontFamily: "'Inter',sans-serif" } }, '⚔ Active Grudge'),
              React.createElement('div', { style: { fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: 16, color: t.text, lineHeight: 1.2 } }, "Beat Alex's plastic fork count")
            ),
            React.createElement('div', { style: { background: t.primaryMuted, color: t.primary, borderRadius: 8, padding: '4px 10px', fontSize: 12, fontWeight: 700, fontFamily: "'Inter',sans-serif" } }, '3d left')
          ),
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', fontSize: 12, color: t.textMuted, marginBottom: 7, fontFamily: "'Inter',sans-serif" } },
            React.createElement('span', null, 'You: 12 forks'),
            React.createElement('span', { style: { color: t.danger } }, 'Alex: 18 — leading')
          ),
          React.createElement('div', { style: { height: 5, background: t.border, borderRadius: 3, overflow: 'hidden', marginBottom: 6 } },
            React.createElement('div', { style: { width: '67%', height: '100%', background: `linear-gradient(90deg,${t.primary},${t.secondary})`, borderRadius: 3 } })
          ),
          React.createElement('div', { style: { fontSize: 11, color: t.textMuted, fontFamily: "'Inter',sans-serif" } }, "Behind by 6 — skip plastic cutlery today to catch up")
        )
      )
    ),

    // Leaderboard
    React.createElement('div', { style: { padding: '0 24px 16px' } },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 } },
        React.createElement('div', { style: { fontFamily: "'Playfair Display',serif", fontSize: 21, fontWeight: 700, color: t.text, fontStyle: 'italic' } }, 'This Week'),
        React.createElement('span', { style: { fontSize: 12, color: t.primary, fontWeight: 600, fontFamily: "'Inter',sans-serif" } }, 'Full board →')
      ),
      React.createElement('div', { style: { background: t.card, border: `1px solid ${t.border}`, borderRadius: 16, overflow: 'hidden' } },
        leaderboard.map((p, i) =>
          React.createElement('div', {
            key: i,
            style: { display: 'flex', alignItems: 'center', padding: '11px 16px', borderBottom: i < 3 ? `1px solid ${t.border}` : 'none', background: p.isYou ? t.primaryMuted : 'transparent' }
          },
            React.createElement('div', {
              style: { width: 28, height: 28, borderRadius: '50%', marginRight: 12, flexShrink: 0, background: i === 0 ? t.secondary : i === 1 ? t.primary : t.border, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Playfair Display',serif", fontWeight: 800, fontSize: 12, color: i < 2 ? '#fff' : t.textMuted }
            }, p.rank),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', { style: { fontFamily: p.isYou ? "'Playfair Display',serif" : "'Inter',sans-serif", fontWeight: p.isYou ? 700 : 500, fontSize: 14, color: p.isYou ? t.primary : t.text } }, p.name),
              React.createElement('div', { style: { fontSize: 11, color: t.textMuted, fontFamily: "'Inter',sans-serif" } }, p.faction)
            ),
            React.createElement('div', { style: { textAlign: 'right' } },
              React.createElement('div', { style: { fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: 14, color: t.text } }, p.points.toLocaleString()),
              React.createElement('div', { style: { fontSize: 11, fontWeight: 600, fontFamily: "'Inter',sans-serif", color: p.delta.startsWith('+') ? t.success : p.delta === '0' ? t.textMuted : t.danger } }, p.delta)
            )
          )
        )
      )
    ),

    // Rewards
    React.createElement('div', { style: { padding: '0 24px 8px' } },
      React.createElement('div', { style: { fontFamily: "'Playfair Display',serif", fontSize: 21, fontWeight: 700, color: t.text, fontStyle: 'italic', marginBottom: 12 } }, 'Unlocking Soon'),
      React.createElement('div', { style: { display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 4 } },
        rewards.map((r, i) =>
          React.createElement('div', { key: i, style: { background: t.card, border: `1px solid ${t.border}`, borderRadius: 14, padding: 14, minWidth: 140, flexShrink: 0, cursor: 'pointer' } },
            React.createElement(r.Icon, { size: 22, color: t.primary, style: { marginBottom: 8 } }),
            React.createElement('div', { style: { fontSize: 12, fontWeight: 600, color: t.text, marginBottom: 2, lineHeight: 1.3, fontFamily: "'Inter',sans-serif" } }, r.title),
            React.createElement('div', { style: { fontSize: 10, color: t.textMuted, marginBottom: 8, fontFamily: "'Inter',sans-serif" } }, r.sub),
            React.createElement('div', { style: { height: 4, background: t.border, borderRadius: 2, overflow: 'hidden', marginBottom: 4 } },
              React.createElement('div', { style: { width: `${r.progress}%`, height: '100%', background: t.primary, borderRadius: 2 } })
            ),
            React.createElement('div', { style: { fontSize: 10, color: t.textMuted, fontFamily: "'Inter',sans-serif" } }, `${r.progress}% to unlock`)
          )
        )
      )
    )
  );
}

// ─── GRUDGES ─────────────────────────────────────────────────────────────────
function GrudgesScreen({ t, isDark }) {
  const [view, setView] = useState('mine');

  const myGrudges = [
    { id: 1, target: 'Alex K.', avatar: 'A', goal: "Beat Alex's plastic fork count", category: 'Plastic', daysLeft: 3, progress: 67, status: 'losing' },
    { id: 2, target: 'Maya R.', avatar: 'M', goal: 'Out-recycle Maya in takeout waste', category: 'Packaging', daysLeft: 5, progress: 40, status: 'even' },
    { id: 3, target: 'Chris W.', avatar: 'C', goal: 'Use fewer plastic bags than Chris', category: 'Single-Use', daysLeft: 1, progress: 88, status: 'winning' },
  ];
  const incomingGrudges = [
    { id: 4, from: 'Marcus T.', avatar: 'M', goal: "Beat Marcus's composting volume", category: 'Food Waste', daysLeft: 4, progress: 55, status: 'even' },
    { id: 5, from: 'Alex K.', avatar: 'A', goal: 'Alex challenges your coffee cup count', category: 'Beverage', daysLeft: 6, progress: 30, status: 'losing' },
  ];
  const statusColor = s => s === 'winning' ? t.success : s === 'losing' ? t.danger : t.secondary;
  const statusLabel = s => s === 'winning' ? 'Winning' : s === 'losing' ? 'Behind' : 'Even';
  const list = view === 'mine' ? myGrudges : incomingGrudges;

  return React.createElement('div', { style: { height: '100%', overflowY: 'auto', background: t.bg, paddingBottom: 20 } },
    React.createElement('div', { style: { padding: '10px 24px 0' } },
      React.createElement('div', { style: { fontFamily: "'Playfair Display',serif", fontSize: 28, fontWeight: 800, color: t.text, lineHeight: 1, letterSpacing: '-0.5px' } }, 'Secret Grudges'),
      React.createElement('div', { style: { fontSize: 12, color: t.textMuted, marginTop: 4, fontFamily: "'Inter',sans-serif" } }, 'Assign hidden challenges · Track rivals')
    ),

    React.createElement('div', { style: { padding: '14px 24px' } },
      React.createElement('div', { style: { background: t.card, border: `1px solid ${t.border}`, borderRadius: 12, padding: 3, display: 'flex' } },
        ['mine', 'incoming'].map(v =>
          React.createElement('div', {
            key: v, onClick: () => setView(v),
            style: { flex: 1, textAlign: 'center', padding: '9px 0', borderRadius: 9, cursor: 'pointer', background: view === v ? t.primary : 'transparent', color: view === v ? '#fff' : t.textMuted, fontSize: 13, fontWeight: 600, fontFamily: "'Inter',sans-serif", transition: 'all 0.2s ease' }
          }, v === 'mine' ? `My Grudges (${myGrudges.length})` : `Incoming (${incomingGrudges.length})`)
        )
      )
    ),

    // Angled stacked cards
    React.createElement('div', { style: { padding: '0 24px' } },
      list.map((g, i) => {
        const name = g.target || g.from;
        return React.createElement('div', { key: g.id, style: { marginBottom: 14 } },
          React.createElement('div', {
            style: {
              background: t.card, border: `1px solid ${i === 0 ? t.primary : t.border}`, borderRadius: 18, padding: 16,
              transform: i % 2 === 0 ? 'rotate(-0.5deg)' : 'rotate(0.7deg)', transformOrigin: 'center',
              boxShadow: i === 0 ? (isDark ? '0 8px 28px rgba(0,0,0,0.45)' : '0 6px 20px rgba(0,0,0,0.08)') : 'none',
              cursor: 'pointer', transition: 'transform 0.2s ease',
            }
          },
            React.createElement('div', { style: { display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 10 } },
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10 } },
                React.createElement('div', {
                  style: { width: 38, height: 38, borderRadius: '50%', background: `linear-gradient(135deg,${t.primary},${t.secondary})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Playfair Display',serif", fontWeight: 800, fontSize: 16, color: '#fff', flexShrink: 0 }
                }, g.avatar),
                React.createElement('div', null,
                  React.createElement('div', { style: { fontSize: 10, color: t.textMuted, letterSpacing: '1px', textTransform: 'uppercase', fontFamily: "'Inter',sans-serif", marginBottom: 2 } }, view === 'mine' ? `vs. ${name}` : `from ${name}`),
                  React.createElement('div', { style: { fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: 15, color: t.text, lineHeight: 1.25 } }, g.goal)
                )
              ),
              React.createElement('div', { style: { background: `${statusColor(g.status)}20`, color: statusColor(g.status), borderRadius: 8, padding: '3px 9px', fontSize: 11, fontWeight: 700, fontFamily: "'Inter',sans-serif", flexShrink: 0 } }, statusLabel(g.status))
            ),
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 7 } },
              React.createElement('div', { style: { flex: 1, height: 5, background: t.border, borderRadius: 3, overflow: 'hidden' } },
                React.createElement('div', { style: { width: `${g.progress}%`, height: '100%', background: statusColor(g.status), borderRadius: 3, transition: 'width 0.5s ease' } })
              ),
              React.createElement('span', { style: { fontSize: 12, color: t.textMuted, fontWeight: 600, fontFamily: "'Inter',sans-serif" } }, `${g.progress}%`)
            ),
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between' } },
              React.createElement('span', { style: { fontSize: 11, color: t.textMuted, fontFamily: "'Inter',sans-serif" } }, `#${g.category}`),
              React.createElement('span', { style: { fontSize: 11, color: t.textMuted, fontFamily: "'Inter',sans-serif" } }, `${g.daysLeft}d remaining`)
            )
          )
        );
      })
    ),

    view === 'mine' && React.createElement('div', { style: { padding: '4px 24px' } },
      React.createElement('div', {
        style: { background: t.primary, borderRadius: 14, padding: '15px 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, cursor: 'pointer', boxShadow: `0 4px 20px rgba(232,115,90,0.35)`, transition: 'transform 0.15s ease' }
      },
        React.createElement(window.lucide.Plus, { size: 18, color: '#fff' }),
        React.createElement('span', { style: { fontFamily: "'Playfair Display',serif", fontSize: 16, fontWeight: 700, color: '#fff' } }, 'Assign New Grudge')
      )
    )
  );
}

// ─── FACTION ─────────────────────────────────────────────────────────────────
function FactionScreen({ t, isDark }) {
  const [tab, setTab] = useState('leaderboard');

  const factions = [
    { rank: 1, name: 'Solars', members: 847, points: 28420, badge: '☀', color: '#C4956A' },
    { rank: 2, name: 'Viridians', members: 763, points: 26840, badge: '🌿', color: '#4A8C6F', isYours: true },
    { rank: 3, name: 'Terrans', members: 692, points: 24110, badge: '⛰', color: '#8A7A6A' },
    { rank: 4, name: 'Aquatics', members: 521, points: 19880, badge: '🌊', color: '#4A7A8C' },
  ];
  const members = [
    { name: 'Sophia L.', points: 4820, badge: 'Captain', isYou: false },
    { name: 'You', points: 4640, badge: 'Veteran', isYou: true },
    { name: 'Lena P.', points: 3840, badge: 'Member', isYou: false },
    { name: 'Kai M.', points: 3210, badge: 'Member', isYou: false },
    { name: 'Noor A.', points: 2980, badge: 'Recruit', isYou: false },
  ];
  const bonuses = [
    { title: '2x Points Weekend', desc: 'Double points for all verified eco actions', progress: 72 },
    { title: 'Faction Art Drop', desc: 'Exclusive digital art for top contributors', progress: 55 },
    { title: 'City Market Discount', desc: '20% off at partner eco-stores city-wide', progress: 88 },
  ];

  return React.createElement('div', { style: { height: '100%', overflowY: 'auto', background: t.bg, paddingBottom: 20 } },
    // Hero
    React.createElement('div', {
      style: { margin: '10px 24px 0', background: isDark ? '#1C2A20' : '#EAF4EE', border: `1.5px solid ${t.accent}`, borderRadius: 20, padding: 20 }
    },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' } },
        React.createElement('div', null,
          React.createElement('div', { style: { fontSize: 10, letterSpacing: '2px', textTransform: 'uppercase', color: t.accent, fontFamily: "'Inter',sans-serif", marginBottom: 4 } }, 'Your Faction'),
          React.createElement('div', { style: { fontFamily: "'Playfair Display',serif", fontSize: 26, fontWeight: 800, color: t.text, lineHeight: 1 } }, 'The Viridians'),
          React.createElement('div', { style: { fontSize: 12, color: t.textMuted, marginTop: 4, fontFamily: "'Inter',sans-serif" } }, '#2 globally · 763 members')
        ),
        React.createElement('div', { style: { fontSize: 38, lineHeight: 1, width: 54, height: 54, borderRadius: 16, background: t.accentMuted, display: 'flex', alignItems: 'center', justifyContent: 'center' } }, '🌿')
      ),
      React.createElement('div', { style: { marginTop: 14 } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: 6 } },
          React.createElement('span', { style: { fontSize: 12, color: t.textMuted, fontFamily: "'Inter',sans-serif" } }, 'Weekly faction target'),
          React.createElement('span', { style: { fontSize: 12, fontWeight: 600, color: t.accent, fontFamily: "'Inter',sans-serif" } }, '26,840 / 30,000')
        ),
        React.createElement('div', { style: { height: 6, background: t.border, borderRadius: 3, overflow: 'hidden' } },
          React.createElement('div', { style: { width: '89%', height: '100%', background: t.accent, borderRadius: 3 } })
        ),
        React.createElement('div', { style: { fontSize: 11, color: t.textMuted, marginTop: 5, fontFamily: "'Inter',sans-serif" } }, '3,160 pts needed — you\'re almost there!')
      )
    ),

    // Sub-tabs
    React.createElement('div', { style: { padding: '14px 24px 0', display: 'flex', gap: 20, borderBottom: `1px solid ${t.border}` } },
      ['leaderboard', 'members', 'bonuses'].map(v =>
        React.createElement('div', {
          key: v, onClick: () => setTab(v),
          style: { paddingBottom: 10, cursor: 'pointer', fontSize: 13, fontWeight: 600, fontFamily: "'Inter',sans-serif", color: tab === v ? t.primary : t.textMuted, borderBottom: tab === v ? `2px solid ${t.primary}` : '2px solid transparent', transition: 'all 0.2s ease', textTransform: 'capitalize' }
        }, v)
      )
    ),

    tab === 'leaderboard' && React.createElement('div', { style: { padding: '16px 24px' } },
      factions.map((f, i) =>
        React.createElement('div', { key: i, style: { background: f.isYours ? (isDark ? '#1C2A20' : '#EAF4EE') : t.card, border: `1px solid ${f.isYours ? t.accent : t.border}`, borderRadius: 14, padding: '14px 16px', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 12 } },
          React.createElement('div', { style: { width: 30, height: 30, borderRadius: 10, background: `${f.color}22`, color: f.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Playfair Display',serif", fontWeight: 800, fontSize: 14, flexShrink: 0 } }, f.rank),
          React.createElement('div', { style: { fontSize: 22, flexShrink: 0 } }, f.badge),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', { style: { fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: 16, color: f.isYours ? t.accent : t.text } }, f.name + (f.isYours ? ' ←' : '')),
            React.createElement('div', { style: { fontSize: 11, color: t.textMuted, fontFamily: "'Inter',sans-serif" } }, `${f.members.toLocaleString()} members`)
          ),
          React.createElement('div', { style: { fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: 15, color: t.text } }, f.points.toLocaleString())
        )
      )
    ),

    tab === 'members' && React.createElement('div', { style: { padding: '16px 24px' } },
      members.map((m, i) =>
        React.createElement('div', { key: i, style: { display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: i < members.length - 1 ? `1px solid ${t.border}` : 'none' } },
          React.createElement('div', { style: { width: 36, height: 36, borderRadius: '50%', flexShrink: 0, background: m.isYou ? `linear-gradient(135deg,${t.primary},${t.secondary})` : t.card, border: `1px solid ${m.isYou ? t.primary : t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: 14, color: m.isYou ? '#fff' : t.textMuted } }, m.name[0]),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', { style: { fontFamily: m.isYou ? "'Playfair Display',serif" : "'Inter',sans-serif", fontWeight: m.isYou ? 700 : 500, fontSize: 14, color: m.isYou ? t.primary : t.text } }, m.name),
            React.createElement('span', { style: { fontSize: 10, color: t.textMuted, background: t.border, padding: '2px 7px', borderRadius: 4, fontFamily: "'Inter',sans-serif" } }, m.badge)
          ),
          React.createElement('div', { style: { fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: 14, color: t.text } }, m.points.toLocaleString())
        )
      )
    ),

    tab === 'bonuses' && React.createElement('div', { style: { padding: '16px 24px' } },
      bonuses.map((b, i) =>
        React.createElement('div', { key: i, style: { background: t.card, border: `1px solid ${t.border}`, borderRadius: 16, padding: 16, marginBottom: 12 } },
          React.createElement('div', { style: { fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: 16, color: t.text, marginBottom: 3 } }, b.title),
          React.createElement('div', { style: { fontSize: 12, color: t.textMuted, fontFamily: "'Inter',sans-serif", marginBottom: 10 } }, b.desc),
          React.createElement('div', { style: { height: 5, background: t.border, borderRadius: 3, overflow: 'hidden', marginBottom: 5 } },
            React.createElement('div', { style: { width: `${b.progress}%`, height: '100%', background: t.primary, borderRadius: 3 } })
          ),
          React.createElement('div', { style: { fontSize: 11, color: t.textMuted, fontFamily: "'Inter',sans-serif" } }, `${b.progress}% — faction unlocks at 100%`)
        )
      )
    )
  );
}

// ─── SABOTAGE ────────────────────────────────────────────────────────────────
function SabotageScreen({ t, isDark }) {
  const [fired, setFired] = useState(null);

  const powers = [
    { id: 1, name: 'Coffee Swap', desc: 'Force a rival to track every coffee cup for 48 hrs', cost: 50, type: 'mild', Icon: window.lucide.Coffee, color: t.accent, ready: true },
    { id: 2, name: 'Bag Check', desc: 'Your target must avoid single-use bags all weekend', cost: 100, type: 'medium', Icon: window.lucide.ShoppingBag, color: t.secondary, ready: false, cooldown: '18h' },
    { id: 3, name: 'Ghost Mission', desc: 'Secretly add a mystery eco-goal to a rival\'s week', cost: 200, type: 'wild', Icon: window.lucide.Ghost, color: t.primary, ready: true },
    { id: 4, name: 'Faction Bomb', desc: 'Force an entire opposing faction into a group challenge', cost: 500, type: 'nuclear', Icon: window.lucide.Zap, color: t.danger, ready: false, cooldown: '6h' },
  ];
  const activity = [
    { label: 'Marcus T. sent you a Ghost Mission', time: '2h ago', icon: '👻', isNew: true },
    { label: 'You hit Alex K. with Coffee Swap', time: '1d ago', icon: '☕', isNew: false },
    { label: 'Priya S. sent you a Bag Check', time: '2d ago', icon: '🛍', isNew: false },
  ];

  return React.createElement('div', { style: { height: '100%', overflowY: 'auto', background: t.bg, paddingBottom: 20 } },
    React.createElement('div', { style: { padding: '10px 24px 12px' } },
      React.createElement('div', { style: { fontFamily: "'Playfair Display',serif", fontSize: 28, fontWeight: 800, color: t.text, letterSpacing: '-0.5px' } }, 'Sabotage'),
      React.createElement('div', { style: { fontFamily: "'Playfair Display',serif", fontSize: 14, fontStyle: 'italic', color: t.textMuted, marginTop: 3 } }, 'Disrupt rivals. Keep competition alive.')
    ),

    // SP Balance
    React.createElement('div', { style: { padding: '0 24px 16px' } },
      React.createElement('div', {
        style: { background: isDark ? '#2A1818' : '#FFF0EE', border: `1px solid ${t.danger}30`, borderRadius: 16, padding: 16, display: 'flex', alignItems: 'center', gap: 14 }
      },
        React.createElement('div', { style: { width: 48, height: 48, borderRadius: 14, background: `${t.danger}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 } },
          React.createElement(window.lucide.Zap, { size: 24, color: t.danger })
        ),
        React.createElement('div', null,
          React.createElement('div', { style: { fontFamily: "'Playfair Display',serif", fontWeight: 800, fontSize: 24, color: t.text, lineHeight: 1 } }, '850 SP'),
          React.createElement('div', { style: { fontSize: 12, color: t.textMuted, marginTop: 3, fontFamily: "'Inter',sans-serif" } }, 'Sabotage Points available')
        ),
        React.createElement('div', { style: { marginLeft: 'auto', textAlign: 'right' } },
          React.createElement('div', { style: { fontSize: 12, color: t.success, fontWeight: 600, fontFamily: "'Inter',sans-serif" } }, '+50 today'),
          React.createElement('div', { style: { fontSize: 10, color: t.textMuted, fontFamily: "'Inter',sans-serif" } }, 'from eco actions')
        )
      )
    ),

    // Powers — angled cards
    React.createElement('div', { style: { padding: '0 24px' } },
      React.createElement('div', { style: { fontFamily: "'Playfair Display',serif", fontSize: 21, fontWeight: 700, color: t.text, fontStyle: 'italic', marginBottom: 12 } }, 'Powers'),
      powers.map((p, i) =>
        React.createElement('div', { key: p.id, style: { marginBottom: 10 } },
          React.createElement('div', {
            style: {
              background: t.card, border: `1px solid ${p.ready ? p.color + '50' : t.border}`, borderRadius: 16, padding: 14,
              opacity: p.ready ? 1 : 0.55,
              transform: i % 2 === 0 ? 'rotate(-0.4deg)' : 'rotate(0.4deg)',
            }
          },
            React.createElement('div', { style: { display: 'flex', gap: 12, alignItems: 'flex-start' } },
              React.createElement('div', { style: { width: 42, height: 42, borderRadius: 12, background: `${p.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 } },
                React.createElement(p.Icon, { size: 20, color: p.color })
              ),
              React.createElement('div', { style: { flex: 1 } },
                React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 } },
                  React.createElement('div', { style: { fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: 16, color: t.text } }, p.name),
                  React.createElement('span', { style: { fontSize: 9, letterSpacing: '1px', textTransform: 'uppercase', color: p.color, fontWeight: 700, fontFamily: "'Inter',sans-serif" } }, p.type)
                ),
                React.createElement('div', { style: { fontSize: 12, color: t.textMuted, fontFamily: "'Inter',sans-serif", lineHeight: 1.45, marginBottom: 8 } }, p.desc),
                React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
                  React.createElement('span', { style: { fontSize: 13, fontWeight: 700, color: p.color, fontFamily: "'Inter',sans-serif" } }, `${p.cost} SP`),
                  p.ready
                    ? React.createElement('div', {
                        onClick: () => setFired(p.id),
                        style: { background: fired === p.id ? t.success : p.color, color: '#fff', borderRadius: 8, padding: '6px 16px', fontSize: 12, fontWeight: 700, fontFamily: "'Inter',sans-serif", cursor: 'pointer', transition: 'background 0.2s ease' }
                      }, fired === p.id ? '✓ Fired!' : 'Deploy')
                    : React.createElement('div', { style: { fontSize: 11, color: t.textMuted, fontFamily: "'Inter',sans-serif" } }, `Ready in ${p.cooldown}`)
                )
              )
            )
          )
        )
      )
    ),

    // Activity
    React.createElement('div', { style: { padding: '12px 24px' } },
      React.createElement('div', { style: { fontFamily: "'Playfair Display',serif", fontSize: 21, fontWeight: 700, color: t.text, fontStyle: 'italic', marginBottom: 12 } }, 'Recent Activity'),
      activity.map((a, i) =>
        React.createElement('div', { key: i, style: { display: 'flex', gap: 12, alignItems: 'center', padding: '10px 0', borderBottom: i < activity.length - 1 ? `1px solid ${t.border}` : 'none' } },
          React.createElement('div', { style: { fontSize: 20, width: 36, height: 36, borderRadius: 10, background: t.card, border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 } }, a.icon),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', { style: { fontSize: 13, color: t.text, fontWeight: a.isNew ? 600 : 400, fontFamily: "'Inter',sans-serif", lineHeight: 1.4 } }, a.label),
            React.createElement('div', { style: { fontSize: 11, color: t.textMuted, fontFamily: "'Inter',sans-serif", marginTop: 2 } }, a.time)
          ),
          a.isNew && React.createElement('div', { style: { background: t.primaryMuted, color: t.primary, borderRadius: 6, padding: '3px 8px', fontSize: 10, fontWeight: 700, fontFamily: "'Inter',sans-serif" } }, 'New!')
        )
      )
    )
  );
}

// ─── PROFILE ─────────────────────────────────────────────────────────────────
function ProfileScreen({ t, isDark, setIsDark }) {
  const achievements = [
    { title: 'Plastic Slayer', desc: 'Zero single-use plastics for 7 days', Icon: window.lucide.Shield, earned: true },
    { title: 'Grudge Master', desc: 'Won 10 secret grudge battles', Icon: window.lucide.Swords, earned: true },
    { title: 'Faction MVP', desc: 'Top Viridian contributor for a full week', Icon: window.lucide.Star, earned: true },
    { title: 'Ghost Operator', desc: 'Complete 5 sabotage missions', Icon: window.lucide.Ghost, earned: false },
    { title: 'Eco Warrior', desc: 'Reach 10,000 eco points', Icon: window.lucide.Award, earned: false },
  ];
  const collectibles = [
    { name: 'Bloom #012', rarity: 'Rare', color: '#4A8C6F', emoji: '🌸' },
    { name: 'Coral #034', rarity: 'Common', color: '#E8735A', emoji: '🪸' },
    { name: 'Mist #007', rarity: 'Epic', color: '#7A9AB8', emoji: '🌫' },
    { name: '???', rarity: 'Locked', color: '#4E4438', emoji: '🔒' },
  ];
  const stats = [
    { label: 'Eco Points', value: '4,640' }, { label: 'Grudges Won', value: '23' },
    { label: 'Sabotages Sent', value: '11' }, { label: 'Weeks Active', value: '14' },
  ];
  const rarityColor = r => r === 'Epic' ? '#9B6DFF' : r === 'Rare' ? '#C4956A' : r === 'Common' ? '#5BAA7A' : '#4E4438';

  return React.createElement('div', { style: { height: '100%', overflowY: 'auto', background: t.bg, paddingBottom: 20 } },
    // Hero
    React.createElement('div', { style: { padding: '10px 24px 18px', background: isDark ? '#1C1915' : '#F5F0E8', borderBottom: `1px solid ${t.border}` } },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' } },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 14 } },
          React.createElement('div', { style: { width: 62, height: 62, borderRadius: 20, background: `linear-gradient(135deg,${t.primary},${t.secondary})`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 4px 20px rgba(232,115,90,0.4)`, fontFamily: "'Playfair Display',serif", fontWeight: 800, fontSize: 28, color: '#fff' } }, 'S'),
          React.createElement('div', null,
            React.createElement('div', { style: { fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 800, color: t.text, lineHeight: 1 } }, 'Steve'),
            React.createElement('div', { style: { fontSize: 12, color: t.textMuted, marginTop: 3, fontFamily: "'Inter',sans-serif" } }, 'The Viridians · Season 3'),
            React.createElement('div', { style: { fontSize: 11, color: t.primary, fontWeight: 700, fontFamily: "'Inter',sans-serif", marginTop: 3 } }, '⚔ Grudge Veteran · #2 Global')
          )
        ),
        // Theme toggle
        React.createElement('div', {
          onClick: () => setIsDark(!isDark),
          style: { width: 52, height: 30, borderRadius: 15, background: isDark ? t.primary : t.border, position: 'relative', cursor: 'pointer', transition: 'background 0.25s ease', flexShrink: 0 }
        },
          React.createElement('div', { style: { position: 'absolute', top: 3, left: isDark ? 25 : 3, width: 24, height: 24, borderRadius: '50%', background: '#fff', transition: 'left 0.25s ease', boxShadow: '0 1px 4px rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' } },
            React.createElement(isDark ? window.lucide.Moon : window.lucide.Sun, { size: 12, color: isDark ? t.primary : t.secondary })
          )
        )
      )
    ),

    // Stats grid
    React.createElement('div', { style: { padding: '16px 24px' } },
      React.createElement('div', { style: { fontFamily: "'Playfair Display',serif", fontSize: 21, fontWeight: 700, color: t.text, fontStyle: 'italic', marginBottom: 12 } }, 'Your Stats'),
      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 } },
        stats.map((s, i) =>
          React.createElement('div', { key: i, style: { background: t.card, border: `1px solid ${t.border}`, borderRadius: 14, padding: '14px 16px' } },
            React.createElement('div', { style: { fontFamily: "'Playfair Display',serif", fontWeight: 800, fontSize: 26, color: t.primary, lineHeight: 1 } }, s.value),
            React.createElement('div', { style: { fontSize: 11, color: t.textMuted, marginTop: 4, fontFamily: "'Inter',sans-serif" } }, s.label)
          )
        )
      )
    ),

    // Achievements
    React.createElement('div', { style: { padding: '0 24px 16px' } },
      React.createElement('div', { style: { fontFamily: "'Playfair Display',serif", fontSize: 21, fontWeight: 700, color: t.text, fontStyle: 'italic', marginBottom: 12 } }, 'Achievements'),
      achievements.map((a, i) =>
        React.createElement('div', { key: i, style: { display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: i < achievements.length - 1 ? `1px solid ${t.border}` : 'none', opacity: a.earned ? 1 : 0.4 } },
          React.createElement('div', { style: { width: 38, height: 38, borderRadius: 10, flexShrink: 0, background: a.earned ? t.primaryMuted : t.border, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
            React.createElement(a.Icon, { size: 18, color: a.earned ? t.primary : t.textFaint })
          ),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', { style: { fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 13, color: a.earned ? t.text : t.textMuted } }, a.title),
            React.createElement('div', { style: { fontSize: 11, color: t.textMuted, fontFamily: "'Inter',sans-serif", lineHeight: 1.4 } }, a.desc)
          ),
          a.earned && React.createElement(window.lucide.Check, { size: 16, color: t.success })
        )
      )
    ),

    // Collectibles
    React.createElement('div', { style: { padding: '0 24px' } },
      React.createElement('div', { style: { fontFamily: "'Playfair Display',serif", fontSize: 21, fontWeight: 700, color: t.text, fontStyle: 'italic', marginBottom: 12 } }, 'Eco Art Collection'),
      React.createElement('div', { style: { display: 'flex', gap: 10 } },
        collectibles.map((c, i) =>
          React.createElement('div', { key: i, style: { flex: 1, background: c.rarity === 'Locked' ? t.card : `${c.color}18`, border: `1.5px solid ${c.rarity === 'Locked' ? t.border : c.color + '55'}`, borderRadius: 14, padding: '12px 8px', textAlign: 'center', opacity: c.rarity === 'Locked' ? 0.45 : 1 } },
            React.createElement('div', { style: { fontSize: 24, marginBottom: 6 } }, c.emoji),
            React.createElement('div', { style: { fontSize: 10, fontWeight: 600, color: t.text, lineHeight: 1.2, fontFamily: "'Inter',sans-serif" } }, c.name),
            React.createElement('div', { style: { fontSize: 9, marginTop: 4, fontWeight: 700, letterSpacing: '0.5px', color: rarityColor(c.rarity), fontFamily: "'Inter',sans-serif" } }, c.rarity)
          )
        )
      )
    )
  );
}

// ─── APP ─────────────────────────────────────────────────────────────────────
function App() {
  const [isDark, setIsDark] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const [pressedTab, setPressedTab] = useState(null);
  const t = isDark ? themes.dark : themes.light;

  const [tick, setTick] = useState(new Date());
  useEffect(() => { const id = setInterval(() => setTick(new Date()), 30000); return () => clearInterval(id); }, []);
  const timeStr = tick.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const tabs = [
    { id: 'home', label: 'Home', icon: window.lucide.Home },
    { id: 'grudges', label: 'Grudges', icon: window.lucide.Swords },
    { id: 'faction', label: 'Faction', icon: window.lucide.Users },
    { id: 'sabotage', label: 'Sabotage', icon: window.lucide.Zap },
    { id: 'profile', label: 'Profile', icon: window.lucide.User },
  ];

  const screens = {
    home: HomeScreen,
    grudges: GrudgesScreen,
    faction: FactionScreen,
    sabotage: SabotageScreen,
    profile: ProfileScreen,
  };

  const ActiveScreen = screens[activeTab];

  const fontStyle = `
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;1,400;1,600&family=Inter:wght@300;400;500;600;700&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    ::-webkit-scrollbar { width: 0; height: 0; }
  `;

  return React.createElement('div', {
    style: { minHeight: '100vh', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Inter',sans-serif", padding: 20 }
  },
    React.createElement('style', null, fontStyle),
    React.createElement('div', {
      style: { width: 375, height: 812, background: t.bg, borderRadius: 44, overflow: 'hidden', position: 'relative', boxShadow: '0 40px 100px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.08)', display: 'flex', flexDirection: 'column' }
    },
      // Dynamic Island
      React.createElement('div', { style: { position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)', width: 120, height: 34, background: '#000', borderRadius: 20, zIndex: 100 } }),

      // Status bar
      React.createElement('div', { style: { height: 54, paddingTop: 16, paddingLeft: 24, paddingRight: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0, zIndex: 50 } },
        React.createElement('span', { style: { fontSize: 15, fontWeight: 600, color: t.text, letterSpacing: '-0.3px', fontFamily: "'Inter',sans-serif" } }, timeStr),
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6 } },
          React.createElement(window.lucide.Wifi, { size: 15, color: t.text }),
          React.createElement(window.lucide.Signal, { size: 15, color: t.text }),
          React.createElement(window.lucide.Battery, { size: 20, color: t.text })
        )
      ),

      // Content
      React.createElement('div', { style: { flex: 1, overflow: 'hidden', position: 'relative' } },
        React.createElement(ActiveScreen, { t, isDark, setIsDark })
      ),

      // Bottom nav
      React.createElement('div', {
        style: { height: 80, background: t.nav, borderTop: `1px solid ${t.navBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'space-around', paddingBottom: 8, flexShrink: 0 }
      },
        tabs.map(tab => {
          const isActive = activeTab === tab.id;
          const isPressed = pressedTab === tab.id;
          const navItemStyle = {
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
            cursor: 'pointer', padding: '8px 10px', borderRadius: 12,
            transition: 'all 0.15s ease',
            transform: isPressed ? 'scale(0.9)' : 'scale(1)',
            background: isActive ? t.primaryMuted : 'transparent',
          };
          const labelStyle = {
            fontFamily: "'Inter',sans-serif", fontSize: 10,
            fontWeight: isActive ? 600 : 400,
            color: isActive ? t.primary : t.textFaint,
            letterSpacing: '0.2px',
          };
          return React.createElement('div', {
            key: tab.id,
            onClick: () => setActiveTab(tab.id),
            onMouseDown: () => setPressedTab(tab.id),
            onMouseUp: () => setPressedTab(null),
            onTouchStart: () => setPressedTab(tab.id),
            onTouchEnd: () => setPressedTab(null),
            style: navItemStyle,
          },
            React.createElement(tab.icon, { size: 22, color: isActive ? t.primary : t.textFaint, strokeWidth: isActive ? 2.5 : 1.8 }),
            React.createElement('span', { style: labelStyle }, tab.label)
          );
        })
      )
    )
  );
}
