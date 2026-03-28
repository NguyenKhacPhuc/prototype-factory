const { useState } = React;

const themes = {
  dark: {
    bg: '#18110E', surface: '#221B16', surfaceAlt: '#2A2118', card: '#2A2118',
    border: '#3D2E26', text: '#F5EFE8', textSub: '#C4A882', textMuted: '#8B6B55',
    primary: '#E8614A', primaryDark: '#C4432A', secondary: '#D4A853',
    navBg: '#18110E', pill: '#3D2E26',
  },
  light: {
    bg: '#FAF7F2', surface: '#FFFFFF', surfaceAlt: '#F5EDE0', card: '#FFFFFF',
    border: '#E8D8C4', text: '#2C1A0E', textSub: '#6B4F38', textMuted: '#A08060',
    primary: '#E8614A', primaryDark: '#C4432A', secondary: '#D4A853',
    navBg: '#FFFFFF', pill: '#F0E8DC',
  }
};

function OnboardingScreen({ onComplete }) {
  const [slide, setSlide] = useState(0);
  const slides = [
    { bg: '#E8614A', accent: '#FFD4CC', bgAccent: '#C4432A', title: 'Challenge\nYourself', sub: 'Join time-bound crafting quests with hundreds of fellow creators worldwide.', icon: window.lucide.Zap, tag: 'Live Quests' },
    { bg: '#2C1A0E', accent: '#D4A853', bgAccent: '#3D2A10', title: 'Share &\nGrow', sub: 'Document your creative journey with photos, videos, and milestone updates.', icon: window.lucide.Camera, tag: 'Progress' },
    { bg: '#1A110D', accent: '#E8614A', bgAccent: '#241810', title: 'Rise to\nFame', sub: 'Earn badges, unlock craft toolkits, and ascend the Hall of Fame.', icon: window.lucide.Trophy, tag: 'Achievements' },
  ];
  const s = slides[slide];
  return React.createElement('div', {
    style: { width: '100%', height: '100%', background: s.bg, display: 'flex', flexDirection: 'column', padding: '48px 32px 40px', position: 'relative', overflow: 'hidden', transition: 'background 0.4s ease' }
  },
    React.createElement('div', { style: { position: 'absolute', top: '-60px', right: '-50px', width: '240px', height: '240px', borderRadius: '50%', background: s.accent + '12', border: `2px solid ${s.accent}18` } }),
    React.createElement('div', { style: { position: 'absolute', bottom: '140px', left: '-30px', width: '140px', height: '140px', borderRadius: '50%', background: s.accent + '08' } }),
    React.createElement('div', { style: { display: 'inline-flex', alignItems: 'center', gap: '6px', background: s.accent + '22', border: `1px solid ${s.accent}38`, borderRadius: '20px', padding: '6px 14px', marginBottom: '40px', width: 'fit-content' } },
      React.createElement(s.icon, { size: 12, color: s.accent }),
      React.createElement('span', { style: { fontFamily: 'Inter', fontSize: '10px', fontWeight: '700', color: s.accent, letterSpacing: '2px', textTransform: 'uppercase' } }, s.tag)
    ),
    React.createElement('div', { style: { width: '96px', height: '96px', borderRadius: '28px', background: s.accent + '16', border: `1.5px solid ${s.accent}28`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '32px' } },
      React.createElement(s.icon, { size: 42, color: s.accent, strokeWidth: 1.5 })
    ),
    React.createElement('h1', { style: { fontFamily: 'Playfair Display', fontSize: '54px', fontWeight: '900', color: '#FFF', lineHeight: '1.0', marginBottom: '16px', whiteSpace: 'pre-line' } }, s.title),
    React.createElement('p', { style: { fontFamily: 'Inter', fontSize: '15px', color: 'rgba(255,255,255,0.6)', lineHeight: '1.65', marginBottom: 'auto' } }, s.sub),
    React.createElement('div', { style: { paddingTop: '40px' } },
      React.createElement('div', { style: { display: 'flex', gap: '6px', marginBottom: '22px' } },
        slides.map((_, i) => React.createElement('div', { key: i, style: { width: i === slide ? '24px' : '6px', height: '6px', borderRadius: '3px', background: i === slide ? s.accent : 'rgba(255,255,255,0.28)', transition: 'all 0.3s ease' } }))
      ),
      React.createElement('div', { style: { display: 'flex', gap: '10px' } },
        slide < 2 && React.createElement('button', { onClick: onComplete, style: { flex: 1, padding: '14px', background: 'transparent', border: '1px solid rgba(255,255,255,0.22)', borderRadius: '14px', color: 'rgba(255,255,255,0.55)', fontFamily: 'Inter', fontSize: '14px', fontWeight: '500', cursor: 'pointer' } }, 'Skip'),
        React.createElement('button', { onClick: () => slide < 2 ? setSlide(slide + 1) : onComplete(), style: { flex: 2, padding: '14px', background: s.accent, border: 'none', borderRadius: '14px', color: s.bg, fontFamily: 'Inter', fontSize: '15px', fontWeight: '700', cursor: 'pointer' } }, slide < 2 ? 'Continue' : 'Start Crafting')
      )
    )
  );
}

function HomeScreen({ t }) {
  const [liked, setLiked] = useState({});
  const toggle = id => setLiked(p => ({ ...p, [id]: !p[id] }));
  const posts = [
    { id: 1, emoji: '🎨', user: 'Maya Kessler', role: 'Level 9 · Metalsmith', time: '2h ago', content: 'Day 5 update — finally got the clasp mechanism right! Used upcycled copper wire from old electronics. The texture is everything.', likes: 47, comments: 12, hasImg: true },
    { id: 2, emoji: '✂️', user: 'James Reyes', role: 'Level 6 · Paper Artist', time: '5h ago', content: 'Just hit my Week 1 milestone. My accountability partner Priya gave me the best feedback on my material sourcing.', likes: 29, comments: 7, hasImg: false },
  ];
  return React.createElement('div', { style: { background: t.bg, paddingBottom: '24px' } },
    React.createElement('div', { style: { padding: '8px 24px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' } },
      React.createElement('div', null,
        React.createElement('p', { style: { fontFamily: 'Inter', fontSize: '10px', fontWeight: '700', letterSpacing: '3px', color: t.primary, textTransform: 'uppercase', marginBottom: '4px' } }, 'Good morning'),
        React.createElement('h1', { style: { fontFamily: 'Playfair Display', fontSize: '36px', fontWeight: '900', color: t.text, lineHeight: '1' } }, 'Aria Chen'),
        React.createElement('p', { style: { fontFamily: 'Inter', fontSize: '12px', color: t.textMuted, marginTop: '5px' } }, 'Level 7 Artisan · Rank #12 · 12 quests')
      ),
      React.createElement('div', { style: { width: '46px', height: '46px', borderRadius: '50%', background: `linear-gradient(135deg, ${t.primary}, #C4432A)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', border: `2px solid ${t.primary}40` } }, '🧵')
    ),
    // OVERLAPPING ANGLED CARDS — Featured Quest
    React.createElement('div', { style: { margin: '22px 24px 0', position: 'relative', height: '196px' } },
      React.createElement('div', { style: { position: 'absolute', top: '14px', left: '10px', right: '-6px', height: '164px', background: t.secondary + '26', borderRadius: '22px', transform: 'rotate(3.5deg)', border: `1px solid ${t.secondary}32` } }),
      React.createElement('div', { style: { position: 'absolute', top: '7px', left: '4px', right: '2px', height: '168px', background: t.primary + '20', borderRadius: '22px', transform: 'rotate(-1.5deg)', border: `1px solid ${t.primary}26` } }),
      React.createElement('div', { style: { position: 'absolute', top: 0, left: 0, right: 0, height: '176px', background: `linear-gradient(145deg, ${t.primary} 0%, #B83020 100%)`, borderRadius: '22px', padding: '22px', boxShadow: `0 10px 40px ${t.primary}42`, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' } },
        React.createElement('div', null,
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '10px' } },
            React.createElement('div', { style: { width: '7px', height: '7px', borderRadius: '50%', background: '#FFD4CC' } }),
            React.createElement('span', { style: { fontFamily: 'Inter', fontSize: '10px', fontWeight: '700', color: 'rgba(255,255,255,0.7)', letterSpacing: '2.5px', textTransform: 'uppercase' } }, 'Active Quest · Week 2')
          ),
          React.createElement('h2', { style: { fontFamily: 'Playfair Display', fontSize: '26px', fontWeight: '700', color: '#FFF', lineHeight: '1.15' } }, 'Recycled Jewelry\nChallenge')
        ),
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' } },
          React.createElement('div', null,
            React.createElement('div', { style: { fontFamily: 'Inter', fontSize: '14px', fontWeight: '700', color: '#FFD4CC' } }, '847 crafters joined'),
            React.createElement('div', { style: { fontFamily: 'Inter', fontSize: '11px', color: 'rgba(255,255,255,0.52)', marginTop: '2px' } }, '3 days · 14 hours left')
          ),
          React.createElement('div', { style: { background: 'rgba(255,255,255,0.18)', borderRadius: '24px', padding: '9px 18px', fontFamily: 'Inter', fontSize: '13px', fontWeight: '600', color: '#FFF', cursor: 'pointer' } }, 'View Quest')
        )
      )
    ),
    // Stats
    React.createElement('div', { style: { display: 'flex', gap: '10px', margin: '18px 24px 0' } },
      [{ label: 'Day Streak', value: '7', icon: window.lucide.Flame, color: '#FF6B35' }, { label: 'Badges', value: '14', icon: window.lucide.Award, color: t.secondary }, { label: 'Partners', value: '3', icon: window.lucide.Users, color: '#7BC8A4' }].map((s, i) =>
        React.createElement('div', { key: i, style: { flex: 1, background: t.surface, borderRadius: '16px', padding: '14px 10px', border: `1px solid ${t.border}`, textAlign: 'center' } },
          React.createElement(s.icon, { size: 18, color: s.color, strokeWidth: 1.8 }),
          React.createElement('div', { style: { fontFamily: 'Playfair Display', fontSize: '24px', fontWeight: '700', color: t.text, lineHeight: '1', marginTop: '4px' } }, s.value),
          React.createElement('div', { style: { fontFamily: 'Inter', fontSize: '10px', color: t.textMuted, marginTop: '3px' } }, s.label)
        )
      )
    ),
    // Community updates
    React.createElement('div', { style: { padding: '22px 24px 0' } },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '14px' } },
        React.createElement('h3', { style: { fontFamily: 'Playfair Display', fontSize: '22px', fontWeight: '700', color: t.text } }, 'Community Updates'),
        React.createElement('span', { style: { fontFamily: 'Inter', fontSize: '12px', color: t.primary, fontWeight: '600', cursor: 'pointer' } }, 'See all')
      ),
      ...posts.map(post =>
        React.createElement('div', { key: post.id, style: { background: t.surface, borderRadius: '18px', padding: '16px', marginBottom: '12px', border: `1px solid ${t.border}` } },
          React.createElement('div', { style: { display: 'flex', gap: '10px', marginBottom: '10px' } },
            React.createElement('div', { style: { width: '40px', height: '40px', borderRadius: '50%', flexShrink: 0, background: t.surfaceAlt, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', border: `2px solid ${t.primary}32` } }, post.emoji),
            React.createElement('div', null,
              React.createElement('div', { style: { fontFamily: 'Inter', fontSize: '14px', fontWeight: '600', color: t.text } }, post.user),
              React.createElement('div', { style: { fontFamily: 'Inter', fontSize: '11px', color: t.textMuted } }, `${post.role} · ${post.time}`)
            )
          ),
          React.createElement('p', { style: { fontFamily: 'Inter', fontSize: '13px', color: t.textSub, lineHeight: '1.55', marginBottom: '12px' } }, post.content),
          post.hasImg && React.createElement('div', { style: { height: '100px', background: t.surfaceAlt, borderRadius: '12px', marginBottom: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '5px', border: `1px solid ${t.border}` } },
            React.createElement(window.lucide.Image, { size: 24, color: t.textMuted, strokeWidth: 1.5 }),
            React.createElement('span', { style: { fontFamily: 'Inter', fontSize: '11px', color: t.textMuted } }, 'Progress Photo')
          ),
          React.createElement('div', { style: { display: 'flex', gap: '16px' } },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }, onClick: () => toggle(post.id) },
              React.createElement(window.lucide.Heart, { size: 15, color: liked[post.id] ? t.primary : t.textMuted, fill: liked[post.id] ? t.primary : 'none', strokeWidth: 2 }),
              React.createElement('span', { style: { fontFamily: 'Inter', fontSize: '12px', fontWeight: '600', color: liked[post.id] ? t.primary : t.textMuted } }, liked[post.id] ? post.likes + 1 : post.likes)
            ),
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' } },
              React.createElement(window.lucide.MessageCircle, { size: 15, color: t.textMuted, strokeWidth: 1.8 }),
              React.createElement('span', { style: { fontFamily: 'Inter', fontSize: '12px', color: t.textMuted } }, post.comments)
            ),
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' } },
              React.createElement(window.lucide.Share2, { size: 15, color: t.textMuted, strokeWidth: 1.8 }),
              React.createElement('span', { style: { fontFamily: 'Inter', fontSize: '12px', color: t.textMuted } }, 'Share')
            )
          )
        )
      )
    )
  );
}

function QuestsScreen({ t }) {
  const [filter, setFilter] = useState('All');
  const [joined, setJoined] = useState({});
  const filters = ['All', 'Jewelry', 'Digital', 'Textile', 'Paper'];
  const quests = [
    { id: 1, title: 'Recycled Jewelry Challenge', tag: 'Jewelry', weeks: 4, crafters: 847, daysLeft: 3, hot: true, desc: 'Create wearable art exclusively from reclaimed and recycled materials.' },
    { id: 2, title: 'Digital Illustration Sprint', tag: 'Digital', weeks: 2, crafters: 523, daysLeft: 8, hot: false, desc: 'One word prompt per day. Interpret it in your own digital art style.' },
    { id: 3, title: 'Loom Weaving Odyssey', tag: 'Textile', weeks: 6, crafters: 291, daysLeft: 21, hot: false, desc: 'Weave a small tapestry using traditional and modern fusion techniques.' },
    { id: 4, title: 'Paper Sculpture Series', tag: 'Paper', weeks: 3, crafters: 412, daysLeft: 12, hot: true, desc: 'Architectural paper sculptures inspired by global landmark structures.' },
  ];
  const filtered = filter === 'All' ? quests : quests.filter(q => q.tag === filter);
  return React.createElement('div', { style: { background: t.bg, paddingBottom: '24px' } },
    React.createElement('div', { style: { padding: '8px 24px 16px' } },
      React.createElement('h1', { style: { fontFamily: 'Playfair Display', fontSize: '36px', fontWeight: '900', color: t.text, lineHeight: '1.1' } }, 'Discover\nQuests'),
      React.createElement('p', { style: { fontFamily: 'Inter', fontSize: '13px', color: t.textMuted, marginTop: '6px' } }, '24 live challenges · 3 starting soon')
    ),
    React.createElement('div', { style: { display: 'flex', gap: '8px', padding: '0 24px 20px', overflowX: 'auto' } },
      filters.map(f => React.createElement('div', { key: f, onClick: () => setFilter(f), style: { padding: '7px 16px', borderRadius: '20px', flexShrink: 0, background: filter === f ? t.primary : t.surface, border: `1px solid ${filter === f ? t.primary : t.border}`, fontFamily: 'Inter', fontSize: '12px', fontWeight: '600', color: filter === f ? '#FFF' : t.textMuted, cursor: 'pointer', transition: 'all 0.2s ease' } }, f))
    ),
    React.createElement('div', { style: { padding: '0 24px' } },
      ...filtered.map(quest =>
        React.createElement('div', { key: quest.id, style: { background: t.surface, borderRadius: '20px', padding: '20px', marginBottom: '14px', border: `1px solid ${t.border}`, position: 'relative', overflow: 'hidden' } },
          quest.hot && React.createElement('div', { style: { position: 'absolute', top: 0, right: '20px', background: t.primary, borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px', padding: '4px 12px', fontFamily: 'Inter', fontSize: '10px', fontWeight: '700', color: '#FFF', letterSpacing: '1px' } }, '🔥 HOT'),
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' } },
            React.createElement('div', { style: { background: t.primary + '18', border: `1px solid ${t.primary}28`, borderRadius: '10px', padding: '4px 10px', fontFamily: 'Inter', fontSize: '10px', fontWeight: '700', color: t.primary, letterSpacing: '1px' } }, quest.tag.toUpperCase()),
            React.createElement('span', { style: { fontFamily: 'Inter', fontSize: '11px', color: t.textMuted } }, `${quest.weeks} weeks`)
          ),
          React.createElement('h3', { style: { fontFamily: 'Playfair Display', fontSize: '20px', fontWeight: '700', color: t.text, lineHeight: '1.2', marginBottom: '8px' } }, quest.title),
          React.createElement('p', { style: { fontFamily: 'Inter', fontSize: '12px', color: t.textSub, lineHeight: '1.5', marginBottom: '16px' } }, quest.desc),
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
            React.createElement('div', { style: { display: 'flex', gap: '12px' } },
              React.createElement('span', { style: { fontFamily: 'Inter', fontSize: '12px', color: t.textMuted } },
                React.createElement('span', { style: { color: t.text, fontWeight: '700' } }, quest.crafters.toLocaleString()), ' crafters'
              ),
              React.createElement('span', { style: { fontFamily: 'Inter', fontSize: '12px', color: t.textMuted } },
                React.createElement('span', { style: { color: '#FF6B35', fontWeight: '700' } }, quest.daysLeft), ' days left'
              )
            ),
            React.createElement('div', { onClick: () => setJoined(p => ({ ...p, [quest.id]: !p[quest.id] })), style: { padding: '9px 20px', borderRadius: '24px', cursor: 'pointer', background: joined[quest.id] ? 'transparent' : t.primary, border: `1.5px solid ${joined[quest.id] ? t.border : t.primary}`, fontFamily: 'Inter', fontSize: '13px', fontWeight: '600', color: joined[quest.id] ? t.textMuted : '#FFF', transition: 'all 0.2s ease' } }, joined[quest.id] ? '✓ Joined' : 'Join Quest')
          )
        )
      )
    )
  );
}

function ProgressScreen({ t }) {
  const [mIdx, setMIdx] = useState(2);
  const milestones = ['Research', 'Sketch', 'Draft', 'Refine', 'Final'];
  const showcases = [
    { user: 'Priya M.', emoji: '💎', week: 'Week 2', title: 'Copper clasp detail — 3 attempts to get right', likes: 88, hot: true },
    { user: 'Omar T.', emoji: '🌿', week: 'Week 1', title: 'Found materials sorted by texture and tone', likes: 61, hot: false },
    { user: 'Sofia L.', emoji: '🎭', week: 'Week 2', title: 'Patina experiment using vinegar solution', likes: 52, hot: false },
  ];
  return React.createElement('div', { style: { background: t.bg, paddingBottom: '24px' } },
    React.createElement('div', { style: { padding: '8px 24px 20px' } },
      React.createElement('h1', { style: { fontFamily: 'Playfair Display', fontSize: '34px', fontWeight: '900', color: t.text, lineHeight: '1' } }, 'Your Progress'),
      React.createElement('p', { style: { fontFamily: 'Inter', fontSize: '13px', color: t.textMuted, marginTop: '6px' } }, 'Recycled Jewelry Challenge · Week 2 of 4')
    ),
    React.createElement('div', { style: { margin: '0 24px 20px', background: t.surface, borderRadius: '20px', padding: '20px', border: `1px solid ${t.border}` } },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' } },
        React.createElement('span', { style: { fontFamily: 'Playfair Display', fontSize: '16px', fontWeight: '700', color: t.text } }, 'Milestone Tracker'),
        React.createElement('span', { style: { fontFamily: 'Inter', fontSize: '12px', color: t.primary, fontWeight: '600' } }, `${mIdx + 1}/${milestones.length}`)
      ),
      React.createElement('div', { style: { height: '4px', background: t.border, borderRadius: '2px', marginBottom: '16px', position: 'relative' } },
        React.createElement('div', { style: { position: 'absolute', left: 0, top: 0, height: '100%', width: `${((mIdx + 1) / milestones.length) * 100}%`, background: t.primary, borderRadius: '2px', transition: 'width 0.4s ease' } })
      ),
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between' } },
        milestones.map((m, i) =>
          React.createElement('div', { key: m, onClick: () => setMIdx(i), style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', cursor: 'pointer' } },
            React.createElement('div', { style: { width: '28px', height: '28px', borderRadius: '50%', background: i <= mIdx ? t.primary : t.surfaceAlt, border: `2px solid ${i <= mIdx ? t.primary : t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s ease' } },
              i < mIdx ? React.createElement(window.lucide.Check, { size: 13, color: '#FFF', strokeWidth: 3 }) : i === mIdx ? React.createElement('div', { style: { width: '8px', height: '8px', borderRadius: '50%', background: '#FFF' } }) : null
            ),
            React.createElement('span', { style: { fontFamily: 'Inter', fontSize: '9px', color: i <= mIdx ? t.primary : t.textMuted, fontWeight: '600' } }, m)
          )
        )
      )
    ),
    React.createElement('div', { style: { margin: '0 24px 22px', background: `linear-gradient(135deg, ${t.primary}12, ${t.secondary}0a)`, border: `1.5px dashed ${t.primary}38`, borderRadius: '20px', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', cursor: 'pointer' } },
      React.createElement('div', { style: { width: '48px', height: '48px', borderRadius: '50%', background: t.primary + '16', border: `1.5px solid ${t.primary}32`, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
        React.createElement(window.lucide.Camera, { size: 22, color: t.primary, strokeWidth: 1.8 })
      ),
      React.createElement('div', { style: { textAlign: 'center' } },
        React.createElement('div', { style: { fontFamily: 'Playfair Display', fontSize: '16px', fontWeight: '700', color: t.text } }, 'Share Your Progress'),
        React.createElement('div', { style: { fontFamily: 'Inter', fontSize: '12px', color: t.textMuted, marginTop: '2px' } }, 'Photo, video, or written update')
      ),
      React.createElement('div', { style: { background: t.primary, borderRadius: '24px', padding: '9px 24px', fontFamily: 'Inter', fontSize: '13px', fontWeight: '600', color: '#FFF' } }, '+ Post Update')
    ),
    React.createElement('div', { style: { padding: '0 24px' } },
      React.createElement('h3', { style: { fontFamily: 'Playfair Display', fontSize: '22px', fontWeight: '700', color: t.text, marginBottom: '14px' } }, 'Community Showcases'),
      ...showcases.map(s =>
        React.createElement('div', { key: s.user, style: { background: t.surface, borderRadius: '16px', padding: '14px 16px', marginBottom: '10px', border: `1px solid ${t.border}`, display: 'flex', gap: '12px', alignItems: 'center' } },
          React.createElement('div', { style: { width: '50px', height: '50px', borderRadius: '14px', flexShrink: 0, background: t.surfaceAlt, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', border: `1px solid ${t.border}` } }, s.emoji),
          React.createElement('div', { style: { flex: 1, minWidth: 0 } },
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '3px' } },
              React.createElement('span', { style: { fontFamily: 'Inter', fontSize: '13px', fontWeight: '600', color: t.text } }, s.user),
              s.hot && React.createElement('span', { style: { fontFamily: 'Inter', fontSize: '10px', fontWeight: '700', color: '#FF6B35', background: '#FF6B3514', border: '1px solid #FF6B3528', borderRadius: '8px', padding: '2px 7px' } }, 'Trending')
            ),
            React.createElement('p', { style: { fontFamily: 'Inter', fontSize: '12px', color: t.textSub, lineHeight: '1.4', marginBottom: '5px' } }, s.title),
            React.createElement('div', { style: { display: 'flex', gap: '10px', alignItems: 'center' } },
              React.createElement('span', { style: { fontFamily: 'Inter', fontSize: '11px', color: t.textMuted } }, s.week),
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '4px' } },
                React.createElement(window.lucide.Heart, { size: 12, color: t.primary, fill: t.primary }),
                React.createElement('span', { style: { fontFamily: 'Inter', fontSize: '11px', color: t.primary, fontWeight: '600' } }, s.likes)
              )
            )
          )
        )
      )
    )
  );
}

function HallScreen({ t }) {
  const [tab, setTab] = useState('season');
  const leaderboard = [
    { rank: 4, name: 'Priya M.', emoji: '💎', points: 6210 },
    { rank: 5, name: 'Omar T.', emoji: '🌿', points: 5940 },
    { rank: 6, name: 'Sofia L.', emoji: '🎭', points: 5480 },
    { rank: 7, name: 'James R.', emoji: '✂️', points: 4920 },
    { rank: 8, name: 'Maya K.', emoji: '🎨', points: 4710 },
  ];
  return React.createElement('div', { style: { background: t.bg, paddingBottom: '24px' } },
    React.createElement('div', { style: { padding: '8px 24px 0' } },
      React.createElement('p', { style: { fontFamily: 'Inter', fontSize: '10px', fontWeight: '700', letterSpacing: '3px', color: t.primary, textTransform: 'uppercase', marginBottom: '4px' } }, 'Season 7 · Spring 2026'),
      React.createElement('h1', { style: { fontFamily: 'Playfair Display', fontSize: '36px', fontWeight: '900', color: t.text, lineHeight: '1' } }, 'Hall of\nFame')
    ),
    React.createElement('div', { style: { display: 'flex', gap: '6px', margin: '16px 24px 22px', padding: '4px', background: t.surface, borderRadius: '14px', border: `1px solid ${t.border}` } },
      ['season', 'all-time'].map(id => React.createElement('div', { key: id, onClick: () => setTab(id), style: { flex: 1, textAlign: 'center', padding: '9px', borderRadius: '10px', cursor: 'pointer', background: tab === id ? t.primary : 'transparent', fontFamily: 'Inter', fontSize: '12px', fontWeight: '600', color: tab === id ? '#FFF' : t.textMuted, transition: 'all 0.2s ease' } }, id === 'season' ? 'This Season' : 'All-Time'))
    ),
    // OVERLAPPING ANGLED CARDS — Top 3 Podium
    React.createElement('div', { style: { margin: '0 24px 20px', position: 'relative', height: '200px' } },
      // Rank 2 — left, rotated
      React.createElement('div', { style: { position: 'absolute', top: '28px', left: '-4px', width: '162px', background: t.surface, borderRadius: '20px', padding: '16px', border: `2px solid #C0C0C028`, transform: 'rotate(-4deg)', boxShadow: '0 6px 20px rgba(0,0,0,0.14)', zIndex: 1 } },
        React.createElement('div', { style: { fontSize: '26px', marginBottom: '6px' } }, '🥈'),
        React.createElement('div', { style: { fontFamily: 'Playfair Display', fontSize: '17px', fontWeight: '700', color: t.text } }, 'Marco D.'),
        React.createElement('div', { style: { fontFamily: 'Inter', fontSize: '10px', color: t.textMuted, marginTop: '2px' } }, 'Master Crafter'),
        React.createElement('div', { style: { fontFamily: 'Playfair Display', fontSize: '22px', fontWeight: '900', color: '#C0C0C0', marginTop: '6px' } }, '8,105 pts')
      ),
      // Rank 3 — right, rotated
      React.createElement('div', { style: { position: 'absolute', top: '52px', right: '-4px', width: '155px', background: t.surface, borderRadius: '20px', padding: '16px', border: `2px solid #CD7F3228`, transform: 'rotate(3.5deg)', boxShadow: '0 6px 20px rgba(0,0,0,0.14)', zIndex: 1 } },
        React.createElement('div', { style: { fontSize: '26px', marginBottom: '6px' } }, '🥉'),
        React.createElement('div', { style: { fontFamily: 'Playfair Display', fontSize: '17px', fontWeight: '700', color: t.primary } }, 'Aria Chen ★'),
        React.createElement('div', { style: { fontFamily: 'Inter', fontSize: '10px', color: t.textMuted, marginTop: '2px' } }, 'Level 7 Artisan'),
        React.createElement('div', { style: { fontFamily: 'Playfair Display', fontSize: '22px', fontWeight: '900', color: '#CD7F32', marginTop: '6px' } }, '6,870 pts')
      ),
      // Rank 1 — center, front
      React.createElement('div', { style: { position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%) rotate(-1deg)', width: '172px', zIndex: 3, background: `linear-gradient(145deg, #2A1E08, #3D2E14)`, borderRadius: '22px', padding: '18px', border: `2px solid #F0C04048`, boxShadow: `0 12px 40px #F0C04028` } },
        React.createElement('div', { style: { fontSize: '30px', marginBottom: '6px' } }, '🏆'),
        React.createElement('div', { style: { fontFamily: 'Playfair Display', fontSize: '20px', fontWeight: '700', color: '#F5EFE8' } }, 'Yuki S.'),
        React.createElement('div', { style: { display: 'inline-block', marginTop: '4px', background: '#F0C04018', border: '1px solid #F0C04038', borderRadius: '8px', padding: '3px 8px', fontFamily: 'Inter', fontSize: '10px', fontWeight: '700', color: '#F0C040', letterSpacing: '0.5px' } }, 'Grand Artisan'),
        React.createElement('div', { style: { fontFamily: 'Playfair Display', fontSize: '26px', fontWeight: '900', color: '#F0C040', marginTop: '8px' } }, '9,420 pts'),
        React.createElement('div', { style: { fontFamily: 'Inter', fontSize: '10px', color: 'rgba(255,255,255,0.45)', marginTop: '2px' } }, '18 quests completed')
      )
    ),
    // Leaderboard list
    React.createElement('div', { style: { margin: '0 24px', background: t.surface, borderRadius: '20px', border: `1px solid ${t.border}`, overflow: 'hidden' } },
      React.createElement('div', { style: { padding: '14px 18px', borderBottom: `1px solid ${t.border}` } },
        React.createElement('span', { style: { fontFamily: 'Playfair Display', fontSize: '16px', fontWeight: '700', color: t.text } }, 'Rankings 4–8')
      ),
      ...leaderboard.map((row, i) =>
        React.createElement('div', { key: row.rank, style: { display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 18px', borderBottom: i < leaderboard.length - 1 ? `1px solid ${t.border}30` : 'none' } },
          React.createElement('span', { style: { fontFamily: 'Playfair Display', fontSize: '16px', fontWeight: '700', color: t.textMuted, width: '20px' } }, row.rank),
          React.createElement('span', { style: { fontSize: '18px' } }, row.emoji),
          React.createElement('span', { style: { fontFamily: 'Inter', fontSize: '13px', fontWeight: '600', color: t.text, flex: 1 } }, row.name),
          React.createElement('span', { style: { fontFamily: 'Playfair Display', fontSize: '14px', fontWeight: '700', color: t.secondary } }, row.points.toLocaleString())
        )
      )
    )
  );
}

function ProfileScreen({ t, isDark, setIsDark }) {
  const badges = [
    { name: 'First Quest', icon: window.lucide.Star, color: '#F0C040', on: true },
    { name: 'Week Warrior', icon: window.lucide.Flame, color: '#FF6B35', on: true },
    { name: 'Trendsetter', icon: window.lucide.TrendingUp, color: '#7BC8A4', on: true },
    { name: 'Mentor', icon: window.lucide.Heart, color: '#E8614A', on: true },
    { name: 'Hall of Fame', icon: window.lucide.Trophy, color: '#D4A853', on: false },
    { name: 'Grand Artisan', icon: window.lucide.Award, color: '#C0C0C0', on: false },
  ];
  const settings = [
    { icon: window.lucide.Bell, label: 'Notifications', sub: 'Quest updates & milestones' },
    { icon: window.lucide.Users, label: 'Accountability Partner', sub: 'Priya M. · Active' },
    { icon: window.lucide.ShieldCheck, label: 'Privacy', sub: 'Profile is public' },
    { icon: window.lucide.LogOut, label: 'Sign Out', sub: '', danger: true },
  ];
  return React.createElement('div', { style: { background: t.bg, paddingBottom: '24px' } },
    React.createElement('div', { style: { margin: '8px 24px 0', background: t.surface, borderRadius: '24px', padding: '22px', border: `1px solid ${t.border}` } },
      React.createElement('div', { style: { display: 'flex', gap: '16px', alignItems: 'flex-start', marginBottom: '16px' } },
        React.createElement('div', { style: { width: '64px', height: '64px', borderRadius: '22px', background: `linear-gradient(135deg, ${t.primary}, #C4432A)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', border: `3px solid ${t.primary}38`, boxShadow: `0 4px 16px ${t.primary}28`, flexShrink: 0 } }, '🧵'),
        React.createElement('div', { style: { flex: 1 } },
          React.createElement('h2', { style: { fontFamily: 'Playfair Display', fontSize: '26px', fontWeight: '900', color: t.text } }, 'Aria Chen'),
          React.createElement('p', { style: { fontFamily: 'Inter', fontSize: '12px', color: t.textMuted, marginTop: '2px' } }, '@aria.creates'),
          React.createElement('div', { style: { display: 'inline-block', marginTop: '8px', background: t.primary + '16', border: `1px solid ${t.primary}32`, borderRadius: '10px', padding: '4px 12px', fontFamily: 'Inter', fontSize: '11px', fontWeight: '700', color: t.primary, letterSpacing: '1px' } }, 'LEVEL 7 · ARTISAN')
        )
      ),
      React.createElement('div', { style: { display: 'flex', borderTop: `1px solid ${t.border}`, paddingTop: '16px' } },
        [{ label: 'Quests', value: '12' }, { label: 'Streak', value: '7d' }, { label: 'Points', value: '6.8K' }, { label: 'Following', value: '48' }].map((s, i, arr) =>
          React.createElement('div', { key: s.label, style: { flex: 1, textAlign: 'center', borderRight: i < arr.length - 1 ? `1px solid ${t.border}` : 'none' } },
            React.createElement('div', { style: { fontFamily: 'Playfair Display', fontSize: '22px', fontWeight: '700', color: t.text } }, s.value),
            React.createElement('div', { style: { fontFamily: 'Inter', fontSize: '10px', color: t.textMuted } }, s.label)
          )
        )
      )
    ),
    React.createElement('div', { style: { padding: '20px 24px 0' } },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '14px' } },
        React.createElement('h3', { style: { fontFamily: 'Playfair Display', fontSize: '22px', fontWeight: '700', color: t.text } }, 'Badges & Awards'),
        React.createElement('span', { style: { fontFamily: 'Inter', fontSize: '12px', color: t.textMuted } }, '4/6 earned')
      ),
      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '22px' } },
        ...badges.map(b => React.createElement('div', { key: b.name, style: { background: t.surface, border: `1.5px solid ${b.on ? b.color + '38' : t.border}`, borderRadius: '16px', padding: '14px 10px', textAlign: 'center', opacity: b.on ? 1 : 0.4 } },
          React.createElement('div', { style: { width: '40px', height: '40px', borderRadius: '50%', margin: '0 auto 8px', background: b.on ? b.color + '16' : t.surfaceAlt, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1.5px solid ${b.on ? b.color + '38' : t.border}` } },
            React.createElement(b.icon, { size: 18, color: b.on ? b.color : t.textMuted, strokeWidth: 1.8 })
          ),
          React.createElement('div', { style: { fontFamily: 'Inter', fontSize: '10px', fontWeight: '600', color: b.on ? t.text : t.textMuted, lineHeight: '1.3' } }, b.name)
        ))
      ),
      React.createElement('h3', { style: { fontFamily: 'Playfair Display', fontSize: '22px', fontWeight: '700', color: t.text, marginBottom: '14px' } }, 'Settings'),
      React.createElement('div', { style: { background: t.surface, borderRadius: '18px', border: `1px solid ${t.border}`, overflow: 'hidden' } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 18px', borderBottom: `1px solid ${t.border}` } },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '10px' } },
            React.createElement(isDark ? window.lucide.Moon : window.lucide.Sun, { size: 18, color: t.primary, strokeWidth: 1.8 }),
            React.createElement('div', null,
              React.createElement('div', { style: { fontFamily: 'Inter', fontSize: '14px', fontWeight: '600', color: t.text } }, isDark ? 'Dark Mode' : 'Light Mode'),
              React.createElement('div', { style: { fontFamily: 'Inter', fontSize: '11px', color: t.textMuted } }, 'Appearance')
            )
          ),
          React.createElement('div', { onClick: () => setIsDark(!isDark), style: { width: '50px', height: '28px', borderRadius: '14px', background: isDark ? t.primary : t.border, position: 'relative', cursor: 'pointer', transition: 'background 0.3s ease' } },
            React.createElement('div', { style: { position: 'absolute', top: '3px', left: isDark ? '25px' : '3px', width: '22px', height: '22px', borderRadius: '50%', background: '#FFF', boxShadow: '0 2px 6px rgba(0,0,0,0.2)', transition: 'left 0.3s ease' } })
          )
        ),
        ...settings.map((item, i, arr) =>
          React.createElement('div', { key: item.label, style: { display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 18px', borderBottom: i < arr.length - 1 ? `1px solid ${t.border}` : 'none', cursor: 'pointer' } },
            React.createElement(item.icon, { size: 18, color: item.danger ? '#EF4444' : t.textMuted, strokeWidth: 1.8 }),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', { style: { fontFamily: 'Inter', fontSize: '14px', fontWeight: '600', color: item.danger ? '#EF4444' : t.text } }, item.label),
              item.sub ? React.createElement('div', { style: { fontFamily: 'Inter', fontSize: '11px', color: t.textMuted } }, item.sub) : null
            ),
            !item.danger && React.createElement(window.lucide.ChevronRight, { size: 16, color: t.textMuted })
          )
        )
      )
    )
  );
}

function App() {
  const [isDark, setIsDark] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const [onboarded, setOnboarded] = useState(false);
  const t = isDark ? themes.dark : themes.light;

  const fontStyle = `
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400;1,700&family=Inter:wght@300;400;500;600;700&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    ::-webkit-scrollbar { display: none; }
  `;

  const tabs = [
    { id: 'home', label: 'Home', icon: window.lucide.Home },
    { id: 'quests', label: 'Quests', icon: window.lucide.Compass },
    { id: 'progress', label: 'Progress', icon: window.lucide.Camera },
    { id: 'hall', label: 'Hall', icon: window.lucide.Trophy },
    { id: 'profile', label: 'Profile', icon: window.lucide.User },
  ];

  const screens = { home: HomeScreen, quests: QuestsScreen, progress: ProgressScreen, hall: HallScreen, profile: ProfileScreen };
  const CurrentScreen = screens[activeTab];

  return React.createElement('div', { style: { minHeight: '100vh', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, sans-serif', padding: '20px' } },
    React.createElement('style', null, fontStyle),
    React.createElement('div', { style: { width: '375px', height: '812px', borderRadius: '48px', background: t.bg, overflow: 'hidden', position: 'relative', boxShadow: '0 40px 80px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.06) inset', display: 'flex', flexDirection: 'column', border: '8px solid #0D0D0D' } },
      React.createElement('div', { style: { position: 'absolute', top: '10px', left: '50%', transform: 'translateX(-50%)', width: '120px', height: '34px', background: '#000', borderRadius: '20px', zIndex: 200 } }),
      !onboarded
        ? React.createElement('div', { style: { flex: 1 } }, React.createElement(OnboardingScreen, { onComplete: () => setOnboarded(true) }))
        : React.createElement(React.Fragment, null,
            React.createElement('div', { style: { height: '54px', background: t.bg, flexShrink: 0, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '0 24px 8px', zIndex: 10 } },
              React.createElement('span', { style: { fontSize: '15px', fontWeight: '600', color: t.text, fontFamily: 'Inter' } }, '9:41'),
              React.createElement('div', { style: { display: 'flex', gap: '5px', alignItems: 'center' } },
                React.createElement(window.lucide.Wifi, { size: 15, color: t.text }),
                React.createElement(window.lucide.Signal, { size: 15, color: t.text }),
                React.createElement(window.lucide.Battery, { size: 15, color: t.text })
              )
            ),
            React.createElement('div', { style: { flex: 1, overflowY: 'auto', overflowX: 'hidden' } },
              React.createElement(CurrentScreen, { t, isDark, setIsDark })
            ),
            React.createElement('div', { style: { height: '83px', background: t.navBg, flexShrink: 0, borderTop: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-around', padding: '0 4px 20px' } },
              tabs.map(tab => {
                const isActive = activeTab === tab.id;
                const navItemStyle = { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', padding: '8px 10px', cursor: 'pointer', transition: 'all 0.2s ease' };
                const labelStyle = { fontSize: '10px', fontFamily: 'Inter', fontWeight: isActive ? '700' : '400', color: isActive ? t.primary : t.textMuted, letterSpacing: '0.3px' };
                return React.createElement('div', { key: tab.id, onClick: () => setActiveTab(tab.id), style: navItemStyle },
                  React.createElement(tab.icon, { size: 22, strokeWidth: isActive ? 2.5 : 1.5, color: isActive ? t.primary : t.textMuted }),
                  React.createElement('span', { style: labelStyle }, tab.label)
                );
              })
            )
          )
    )
  );
}
