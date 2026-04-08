const { useState, useEffect, useRef, useCallback } = React;

function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [isDark, setIsDark] = useState(true);
  const [animateIn, setAnimateIn] = useState(true);
  const [staked, setStaked] = useState({});
  const [likedSprints, setLikedSprints] = useState({});
  const [activeTab, setActiveTab] = useState('all');
  const [showSprintDetail, setShowSprintDetail] = useState(null);
  const [showCreateSuccess, setShowCreateSuccess] = useState(false);

  const themes = {
    dark: {
      bg: '#0F0A1A',
      surface: '#1A1128',
      surfaceAlt: '#241835',
      card: '#1E1430',
      cardAlt: '#2A1D3D',
      text: '#FFFFFF',
      textSecondary: '#A89BBE',
      textMuted: '#6B5E80',
      primary: '#EC4899',
      secondary: '#F472B6',
      cta: '#06B6D4',
      ctaAlt: '#22D3EE',
      accent: '#A855F7',
      border: '#2D2145',
      success: '#10B981',
      warning: '#F59E0B',
      danger: '#EF4444',
      gradientStart: '#EC4899',
      gradientEnd: '#06B6D4',
      overlay: 'rgba(15, 10, 26, 0.85)',
      navBg: 'rgba(26, 17, 40, 0.95)',
      inputBg: '#241835',
    },
    light: {
      bg: '#FDF2F8',
      surface: '#FFFFFF',
      surfaceAlt: '#FFF1F7',
      card: '#FFFFFF',
      cardAlt: '#FFF5FA',
      text: '#1A0A2E',
      textSecondary: '#6B5E80',
      textMuted: '#A89BBE',
      primary: '#EC4899',
      secondary: '#F472B6',
      cta: '#06B6D4',
      ctaAlt: '#0891B2',
      accent: '#A855F7',
      border: '#F3D1E5',
      success: '#10B981',
      warning: '#F59E0B',
      danger: '#EF4444',
      gradientStart: '#EC4899',
      gradientEnd: '#06B6D4',
      overlay: 'rgba(253, 242, 248, 0.85)',
      navBg: 'rgba(255, 255, 255, 0.95)',
      inputBg: '#FFF1F7',
    },
  };

  const t = isDark ? themes.dark : themes.light;
  const font = "-apple-system, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif";

  useEffect(() => {
    setAnimateIn(false);
    const timer = setTimeout(() => setAnimateIn(true), 30);
    return () => clearTimeout(timer);
  }, [activeScreen]);

  const sprints = [
    { id: 1, title: 'Design a Minimalist App Icon', category: 'Design', time: '24h', stake: 50, entries: 34, reward: 75, difficulty: 'Medium', desc: 'Create a clean, memorable app icon using max 3 colors and simple geometry. Must work at 1024x1024 and 64x64.', creator: 'Maya Chen', creatorAvatar: 'MC', tags: ['UI', 'Branding', 'Minimalism'] },
    { id: 2, title: 'Write a Dystopian Micro-Story', category: 'Writing', time: '48h', stake: 30, entries: 67, reward: 50, difficulty: 'Easy', desc: 'Craft a 500-word dystopian story set in 2084. Must include a twist ending and a character named after a color.', creator: 'Alex Rivera', creatorAvatar: 'AR', tags: ['Fiction', 'Sci-Fi', 'Short Form'] },
    { id: 3, title: 'Compose a Lo-Fi Beat', category: 'Music', time: '72h', stake: 80, entries: 12, reward: 120, difficulty: 'Hard', desc: 'Produce a 2-minute lo-fi hip-hop beat with original samples. Must include vinyl crackle and a jazz chord progression.', creator: 'DJ Solstice', creatorAvatar: 'DS', tags: ['Production', 'Lo-Fi', 'Jazz'] },
    { id: 4, title: 'Photograph Urban Geometry', category: 'Photo', time: '24h', stake: 40, entries: 89, reward: 60, difficulty: 'Easy', desc: 'Capture 5 photos of geometric patterns in urban architecture. No filters, only natural light. RAW files required.', creator: 'Lens Nomad', creatorAvatar: 'LN', tags: ['Architecture', 'Street', 'Minimal'] },
    { id: 5, title: 'Build a CSS-Only Animation', category: 'Code', time: '12h', stake: 100, entries: 8, reward: 160, difficulty: 'Hard', desc: 'Create a mesmerizing CSS-only animation. No JavaScript. Must loop seamlessly and work across modern browsers.', creator: 'CodeArtist', creatorAvatar: 'CA', tags: ['CSS', 'Animation', 'Frontend'] },
    { id: 6, title: 'Sketch a Character in 1 Hour', category: 'Design', time: '1h', stake: 20, entries: 156, reward: 30, difficulty: 'Easy', desc: 'Design an original character from scratch. Must include front view and one expression sheet. Digital or traditional.', creator: 'SketchPad Pro', creatorAvatar: 'SP', tags: ['Character', 'Illustration', 'Speed'] },
  ];

  const activeSprints = [
    { id: 101, title: 'Design a Minimalist App Icon', timeLeft: '18h 24m', progress: 0.65, stake: 50, status: 'in-progress' },
    { id: 102, title: 'Write a Dystopian Micro-Story', timeLeft: '36h 10m', progress: 0.3, stake: 30, status: 'in-progress' },
  ];

  const completedSprints = [
    { id: 201, title: 'Logo for a Coffee Brand', earned: 75, rating: 4.8, date: 'Mar 28' },
    { id: 202, title: 'Haiku Collection: Spring', earned: 40, rating: 4.2, date: 'Mar 22' },
    { id: 203, title: 'Pixel Art Self-Portrait', earned: 90, rating: 4.9, date: 'Mar 15' },
  ];

  const badges = [
    { name: 'First Stake', icon: 'Zap', color: '#F59E0B', earned: true },
    { name: 'Sprint Master', icon: 'Trophy', color: '#EC4899', earned: true },
    { name: 'Night Owl', icon: 'Moon', color: '#8B5CF6', earned: true },
    { name: 'Community Voice', icon: 'MessageCircle', color: '#06B6D4', earned: true },
    { name: 'Perfect Score', icon: 'Star', color: '#10B981', earned: false },
    { name: 'Streak King', icon: 'Flame', color: '#EF4444', earned: false },
  ];

  const categories = ['all', 'Design', 'Writing', 'Music', 'Photo', 'Code'];

  const Icon = ({ name, size = 20, color = t.text, style = {} }) => {
    const IconComp = window.lucide && window.lucide[name];
    if (!IconComp) return null;
    return React.createElement(IconComp, { size, color, style, strokeWidth: 1.8 });
  };

  const styleTag = React.createElement('style', null, `
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(24px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes slideUp {
      from { transform: translateY(100%); }
      to { transform: translateY(0); }
    }
    @keyframes slideDown {
      from { transform: translateY(-20px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.05); }
    }
    @keyframes shimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }
    @keyframes glow {
      0%, 100% { box-shadow: 0 0 20px rgba(236,72,153,0.3); }
      50% { box-shadow: 0 0 40px rgba(236,72,153,0.6); }
    }
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-6px); }
    }
    @keyframes progressFill {
      from { width: 0%; }
      to { width: var(--progress); }
    }
    @keyframes scaleIn {
      from { transform: scale(0.8); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }
    @keyframes rotateIn {
      from { transform: rotate(-10deg) scale(0.9); opacity: 0; }
      to { transform: rotate(0deg) scale(1); opacity: 1; }
    }
    @keyframes checkmark {
      0% { transform: scale(0); }
      50% { transform: scale(1.3); }
      100% { transform: scale(1); }
    }
    * { -webkit-tap-highlight-color: transparent; }
    *::-webkit-scrollbar { display: none; }
  `);

  const staggerDelay = (i) => ({
    animation: animateIn ? `fadeInUp 0.5s ease ${i * 0.08}s both` : 'none',
  });

  // --- HOME SCREEN ---
  const HomeScreen = () => {
    const streak = 7;
    const totalEarned = 1240;
    const level = 12;
    const xpProgress = 0.72;

    return React.createElement('div', { style: { padding: '0 20px 100px', animation: animateIn ? 'fadeIn 0.4s ease' : 'none' } },
      // Header
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 16, marginBottom: 24, ...staggerDelay(0) } },
        React.createElement('div', null,
          React.createElement('div', { style: { fontSize: 15, fontFamily: font, fontWeight: 500, color: t.textSecondary, marginBottom: 4 } }, 'Welcome back,'),
          React.createElement('div', { style: { fontSize: 28, fontFamily: font, fontWeight: 800, color: t.text, letterSpacing: -0.5 } }, 'Creator')
        ),
        React.createElement('div', { style: { display: 'flex', gap: 12, alignItems: 'center' } },
          React.createElement('button', {
            onClick: () => setIsDark(!isDark),
            style: { width: 40, height: 40, borderRadius: 12, background: t.surface, border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s ease' }
          }, React.createElement(Icon, { name: isDark ? 'Sun' : 'Moon', size: 18, color: t.primary })),
          React.createElement('div', {
            style: { width: 44, height: 44, borderRadius: 14, background: `linear-gradient(135deg, ${t.primary}, ${t.accent})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17, fontFamily: font, fontWeight: 700, color: '#FFF' }
          }, 'S')
        )
      ),

      // Level / XP Bar
      React.createElement('div', { style: { background: t.card, borderRadius: 20, padding: 20, marginBottom: 16, border: `1px solid ${t.border}`, ...staggerDelay(1) } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 } },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10 } },
            React.createElement('div', { style: { width: 36, height: 36, borderRadius: 10, background: `linear-gradient(135deg, ${t.primary}, ${t.cta})`, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
              React.createElement(Icon, { name: 'Sparkles', size: 18, color: '#FFF' })
            ),
            React.createElement('div', null,
              React.createElement('div', { style: { fontSize: 13, fontFamily: font, fontWeight: 600, color: t.textSecondary } }, 'LEVEL ' + level),
              React.createElement('div', { style: { fontSize: 17, fontFamily: font, fontWeight: 700, color: t.text } }, 'Rising Creator')
            )
          ),
          React.createElement('div', { style: { fontSize: 13, fontFamily: font, fontWeight: 600, color: t.cta } }, '72% to Level 13')
        ),
        React.createElement('div', { style: { height: 8, borderRadius: 4, background: t.surfaceAlt, overflow: 'hidden' } },
          React.createElement('div', { style: { height: '100%', width: `${xpProgress * 100}%`, borderRadius: 4, background: `linear-gradient(90deg, ${t.primary}, ${t.cta})`, transition: 'width 1s ease' } })
        )
      ),

      // Stats Row
      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 24, ...staggerDelay(2) } },
        ...[
          { label: 'Streak', value: `${streak} days`, icon: 'Flame', color: '#EF4444', bg: 'rgba(239,68,68,0.1)' },
          { label: 'Earned', value: `${totalEarned}`, icon: 'Coins', color: '#F59E0B', bg: 'rgba(245,158,11,0.1)' },
          { label: 'Completed', value: '23', icon: 'CheckCircle', color: '#10B981', bg: 'rgba(16,185,129,0.1)' },
        ].map((s, i) =>
          React.createElement('div', { key: i, style: { background: t.card, borderRadius: 16, padding: '16px 12px', textAlign: 'center', border: `1px solid ${t.border}`, transition: 'transform 0.2s ease' } },
            React.createElement('div', { style: { width: 36, height: 36, borderRadius: 10, background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px' } },
              React.createElement(Icon, { name: s.icon, size: 18, color: s.color })
            ),
            React.createElement('div', { style: { fontSize: 17, fontFamily: font, fontWeight: 700, color: t.text, marginBottom: 2 } }, s.value),
            React.createElement('div', { style: { fontSize: 11, fontFamily: font, fontWeight: 500, color: t.textMuted, textTransform: 'uppercase', letterSpacing: 0.5 } }, s.label)
          )
        )
      ),

      // Active Sprints
      React.createElement('div', { style: { marginBottom: 24, ...staggerDelay(3) } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 } },
          React.createElement('div', { style: { fontSize: 20, fontFamily: font, fontWeight: 700, color: t.text } }, 'Active Sprints'),
          React.createElement('button', { onClick: () => setActiveScreen('explore'), style: { fontSize: 13, fontFamily: font, fontWeight: 600, color: t.cta, background: 'none', border: 'none', cursor: 'pointer', padding: '4px 0' } }, 'See All')
        ),
        ...activeSprints.map((sprint, i) =>
          React.createElement('div', { key: sprint.id, style: { background: t.card, borderRadius: 16, padding: 16, marginBottom: 10, border: `1px solid ${t.border}`, animation: animateIn ? `fadeInUp 0.5s ease ${(i + 4) * 0.08}s both` : 'none' } },
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 } },
              React.createElement('div', { style: { flex: 1 } },
                React.createElement('div', { style: { fontSize: 15, fontFamily: font, fontWeight: 600, color: t.text, marginBottom: 4 } }, sprint.title),
                React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6 } },
                  React.createElement(Icon, { name: 'Clock', size: 13, color: t.warning }),
                  React.createElement('span', { style: { fontSize: 13, fontFamily: font, fontWeight: 500, color: t.warning } }, sprint.timeLeft + ' left')
                )
              ),
              React.createElement('div', { style: { padding: '4px 10px', borderRadius: 8, background: 'rgba(236,72,153,0.15)', fontSize: 13, fontFamily: font, fontWeight: 600, color: t.primary } }, sprint.stake + ' staked')
            ),
            React.createElement('div', { style: { height: 6, borderRadius: 3, background: t.surfaceAlt, overflow: 'hidden' } },
              React.createElement('div', { style: { height: '100%', width: `${sprint.progress * 100}%`, borderRadius: 3, background: `linear-gradient(90deg, ${t.primary}, ${t.secondary})`, transition: 'width 0.8s ease' } })
            ),
            React.createElement('div', { style: { fontSize: 11, fontFamily: font, fontWeight: 500, color: t.textMuted, marginTop: 6, textAlign: 'right' } }, Math.round(sprint.progress * 100) + '% complete')
          )
        )
      ),

      // Recent Completions
      React.createElement('div', { style: { ...staggerDelay(5) } },
        React.createElement('div', { style: { fontSize: 20, fontFamily: font, fontWeight: 700, color: t.text, marginBottom: 14 } }, 'Recent Wins'),
        ...completedSprints.map((c, i) =>
          React.createElement('div', { key: c.id, style: { display: 'flex', alignItems: 'center', gap: 14, background: t.card, borderRadius: 14, padding: 14, marginBottom: 8, border: `1px solid ${t.border}` } },
            React.createElement('div', { style: { width: 42, height: 42, borderRadius: 12, background: `linear-gradient(135deg, ${t.success}, #34D399)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 } },
              React.createElement(Icon, { name: 'Check', size: 20, color: '#FFF' })
            ),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', { style: { fontSize: 15, fontFamily: font, fontWeight: 600, color: t.text } }, c.title),
              React.createElement('div', { style: { fontSize: 13, fontFamily: font, fontWeight: 500, color: t.textMuted } }, c.date)
            ),
            React.createElement('div', { style: { textAlign: 'right' } },
              React.createElement('div', { style: { fontSize: 15, fontFamily: font, fontWeight: 700, color: t.success } }, '+' + c.earned),
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 2, justifyContent: 'flex-end' } },
                React.createElement(Icon, { name: 'Star', size: 11, color: '#F59E0B' }),
                React.createElement('span', { style: { fontSize: 12, fontFamily: font, fontWeight: 600, color: '#F59E0B' } }, c.rating)
              )
            )
          )
        )
      )
    );
  };

  // --- EXPLORE SCREEN ---
  const ExploreScreen = () => {
    const filtered = activeTab === 'all' ? sprints : sprints.filter(s => s.category === activeTab);

    const difficultyColor = (d) => d === 'Easy' ? t.success : d === 'Medium' ? t.warning : t.danger;

    return React.createElement('div', { style: { padding: '0 20px 100px', animation: animateIn ? 'fadeIn 0.4s ease' : 'none' } },
      // Header
      React.createElement('div', { style: { paddingTop: 16, marginBottom: 20, ...staggerDelay(0) } },
        React.createElement('div', { style: { fontSize: 34, fontFamily: font, fontWeight: 800, color: t.text, letterSpacing: -0.5, marginBottom: 4 } }, 'Explore'),
        React.createElement('div', { style: { fontSize: 15, fontFamily: font, fontWeight: 500, color: t.textSecondary } }, 'Find your next creative challenge')
      ),

      // Search
      React.createElement('div', { style: { position: 'relative', marginBottom: 16, ...staggerDelay(1) } },
        React.createElement('div', { style: { position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', zIndex: 1 } },
          React.createElement(Icon, { name: 'Search', size: 18, color: t.textMuted })
        ),
        React.createElement('input', {
          placeholder: 'Search sprints...',
          style: { width: '100%', height: 46, borderRadius: 14, border: `1px solid ${t.border}`, background: t.inputBg, paddingLeft: 42, paddingRight: 14, fontSize: 15, fontFamily: font, color: t.text, outline: 'none', boxSizing: 'border-box' }
        })
      ),

      // Category tabs
      React.createElement('div', { style: { display: 'flex', gap: 8, overflowX: 'auto', marginBottom: 20, paddingBottom: 4, ...staggerDelay(2) } },
        ...categories.map(cat =>
          React.createElement('button', {
            key: cat,
            onClick: () => setActiveTab(cat),
            style: {
              padding: '8px 16px', borderRadius: 20, border: 'none', cursor: 'pointer', whiteSpace: 'nowrap',
              fontSize: 13, fontFamily: font, fontWeight: 600, transition: 'all 0.2s ease',
              background: activeTab === cat ? `linear-gradient(135deg, ${t.primary}, ${t.cta})` : t.surfaceAlt,
              color: activeTab === cat ? '#FFF' : t.textSecondary,
            }
          }, cat === 'all' ? 'All' : cat)
        )
      ),

      // Sprint Cards
      ...filtered.map((sprint, i) =>
        React.createElement('div', {
          key: sprint.id,
          onClick: () => setShowSprintDetail(sprint),
          style: {
            background: t.card, borderRadius: 20, padding: 20, marginBottom: 14,
            border: `1px solid ${t.border}`, cursor: 'pointer',
            transition: 'all 0.2s ease', position: 'relative', overflow: 'hidden',
            animation: animateIn ? `fadeInUp 0.5s ease ${(i + 3) * 0.08}s both` : 'none',
          }
        },
          // Accent top border
          React.createElement('div', { style: { position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${t.primary}, ${t.cta})` } }),

          // Header row
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 } },
            React.createElement('div', { style: { flex: 1, marginRight: 10 } },
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 } },
                React.createElement('span', { style: { padding: '3px 8px', borderRadius: 6, fontSize: 11, fontFamily: font, fontWeight: 600, background: `${difficultyColor(sprint.difficulty)}20`, color: difficultyColor(sprint.difficulty) } }, sprint.difficulty),
                React.createElement('span', { style: { padding: '3px 8px', borderRadius: 6, fontSize: 11, fontFamily: font, fontWeight: 600, background: `${t.accent}20`, color: t.accent } }, sprint.category)
              ),
              React.createElement('div', { style: { fontSize: 17, fontFamily: font, fontWeight: 700, color: t.text, lineHeight: 1.3 } }, sprint.title)
            ),
            React.createElement('button', {
              onClick: (e) => { e.stopPropagation(); setLikedSprints(p => ({ ...p, [sprint.id]: !p[sprint.id] })); },
              style: { width: 40, height: 40, borderRadius: 12, background: t.surfaceAlt, border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s ease', flexShrink: 0 }
            }, React.createElement(Icon, { name: 'Heart', size: 18, color: likedSprints[sprint.id] ? t.primary : t.textMuted }))
          ),

          React.createElement('div', { style: { fontSize: 14, fontFamily: font, fontWeight: 400, color: t.textSecondary, lineHeight: 1.5, marginBottom: 14, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' } }, sprint.desc),

          // Tags
          React.createElement('div', { style: { display: 'flex', gap: 6, marginBottom: 14, flexWrap: 'wrap' } },
            ...sprint.tags.map(tag =>
              React.createElement('span', { key: tag, style: { padding: '4px 10px', borderRadius: 8, fontSize: 12, fontFamily: font, fontWeight: 500, background: t.surfaceAlt, color: t.textSecondary } }, tag)
            )
          ),

          // Bottom row
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
            React.createElement('div', { style: { display: 'flex', gap: 14 } },
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
                React.createElement(Icon, { name: 'Clock', size: 14, color: t.textMuted }),
                React.createElement('span', { style: { fontSize: 13, fontFamily: font, fontWeight: 500, color: t.textMuted } }, sprint.time)
              ),
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
                React.createElement(Icon, { name: 'Users', size: 14, color: t.textMuted }),
                React.createElement('span', { style: { fontSize: 13, fontFamily: font, fontWeight: 500, color: t.textMuted } }, sprint.entries + ' entries')
              )
            ),
            React.createElement('button', {
              onClick: (e) => { e.stopPropagation(); setStaked(p => ({ ...p, [sprint.id]: !p[sprint.id] })); },
              style: {
                padding: '8px 16px', borderRadius: 12, border: 'none', cursor: 'pointer',
                background: staked[sprint.id] ? t.success : `linear-gradient(135deg, ${t.primary}, ${t.cta})`,
                fontSize: 13, fontFamily: font, fontWeight: 700, color: '#FFF',
                display: 'flex', alignItems: 'center', gap: 6, transition: 'all 0.2s ease',
                minHeight: 44,
              }
            },
              React.createElement(Icon, { name: staked[sprint.id] ? 'Check' : 'Zap', size: 14, color: '#FFF' }),
              React.createElement('span', null, staked[sprint.id] ? 'Staked!' : `Stake ${sprint.stake}`)
            )
          )
        )
      ),

      // Sprint Detail Modal
      showSprintDetail && React.createElement('div', {
        onClick: () => setShowSprintDetail(null),
        style: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: t.overlay, zIndex: 50, display: 'flex', alignItems: 'flex-end', animation: 'fadeIn 0.2s ease' }
      },
        React.createElement('div', {
          onClick: (e) => e.stopPropagation(),
          style: { background: t.surface, borderRadius: '24px 24px 0 0', padding: '24px 20px 40px', width: '100%', maxHeight: '75%', overflowY: 'auto', animation: 'slideUp 0.3s ease' }
        },
          React.createElement('div', { style: { width: 36, height: 4, borderRadius: 2, background: t.border, margin: '0 auto 20px' } }),
          React.createElement('div', { style: { fontSize: 22, fontFamily: font, fontWeight: 800, color: t.text, letterSpacing: -0.5, marginBottom: 8 } }, showSprintDetail.title),
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 } },
            React.createElement('div', { style: { width: 28, height: 28, borderRadius: 8, background: `linear-gradient(135deg, ${t.primary}, ${t.accent})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontFamily: font, fontWeight: 700, color: '#FFF' } }, showSprintDetail.creatorAvatar),
            React.createElement('span', { style: { fontSize: 14, fontFamily: font, fontWeight: 600, color: t.textSecondary } }, showSprintDetail.creator)
          ),
          React.createElement('div', { style: { fontSize: 15, fontFamily: font, fontWeight: 400, color: t.textSecondary, lineHeight: 1.6, marginBottom: 20 } }, showSprintDetail.desc),
          React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 24 } },
            ...[
              { label: 'Time Limit', value: showSprintDetail.time, icon: 'Clock' },
              { label: 'Stake', value: showSprintDetail.stake + ' coins', icon: 'Coins' },
              { label: 'Reward', value: showSprintDetail.reward + ' coins', icon: 'Gift' },
              { label: 'Entries', value: showSprintDetail.entries, icon: 'Users' },
            ].map((item, i) =>
              React.createElement('div', { key: i, style: { background: t.surfaceAlt, borderRadius: 14, padding: 14, display: 'flex', alignItems: 'center', gap: 10 } },
                React.createElement(Icon, { name: item.icon, size: 18, color: t.primary }),
                React.createElement('div', null,
                  React.createElement('div', { style: { fontSize: 11, fontFamily: font, fontWeight: 500, color: t.textMuted, textTransform: 'uppercase' } }, item.label),
                  React.createElement('div', { style: { fontSize: 15, fontFamily: font, fontWeight: 700, color: t.text } }, item.value)
                )
              )
            )
          ),
          React.createElement('button', {
            onClick: () => { setStaked(p => ({ ...p, [showSprintDetail.id]: true })); setShowSprintDetail(null); },
            style: { width: '100%', height: 52, borderRadius: 16, border: 'none', background: `linear-gradient(135deg, ${t.primary}, ${t.cta})`, fontSize: 17, fontFamily: font, fontWeight: 700, color: '#FFF', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }
          },
            React.createElement(Icon, { name: 'Zap', size: 20, color: '#FFF' }),
            React.createElement('span', null, `Stake ${showSprintDetail.stake} & Enter Sprint`)
          )
        )
      )
    );
  };

  // --- CREATE SCREEN ---
  const CreateScreen = () => {
    const [step, setStep] = useState(0);

    return React.createElement('div', { style: { padding: '0 20px 100px', animation: animateIn ? 'fadeIn 0.4s ease' : 'none' } },
      React.createElement('div', { style: { paddingTop: 16, marginBottom: 24, ...staggerDelay(0) } },
        React.createElement('div', { style: { fontSize: 34, fontFamily: font, fontWeight: 800, color: t.text, letterSpacing: -0.5, marginBottom: 4 } }, 'Sprint Foundry'),
        React.createElement('div', { style: { fontSize: 15, fontFamily: font, fontWeight: 500, color: t.textSecondary } }, 'Design a creative challenge for the community')
      ),

      // Progress Steps
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', marginBottom: 28, ...staggerDelay(1) } },
        ...[0, 1, 2].map((s, i) =>
          React.createElement(React.Fragment, { key: i },
            React.createElement('div', {
              onClick: () => setStep(s),
              style: {
                width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 14, fontFamily: font, fontWeight: 700, cursor: 'pointer', transition: 'all 0.3s ease',
                background: step >= s ? `linear-gradient(135deg, ${t.primary}, ${t.cta})` : t.surfaceAlt,
                color: step >= s ? '#FFF' : t.textMuted,
                boxShadow: step === s ? `0 0 0 4px ${t.primary}30` : 'none',
              }
            }, s + 1),
            i < 2 && React.createElement('div', { style: { flex: 1, height: 2, margin: '0 8px', background: step > s ? t.primary : t.border, borderRadius: 1, transition: 'background 0.3s ease' } })
          )
        )
      ),

      // Step Content
      step === 0 && React.createElement('div', { style: { animation: 'fadeInUp 0.4s ease' } },
        React.createElement('div', { style: { fontSize: 20, fontFamily: font, fontWeight: 700, color: t.text, marginBottom: 20 } }, 'Sprint Details'),
        ...[
          { label: 'Sprint Title', placeholder: 'e.g. Design a Retro Game Cover', icon: 'Pencil' },
          { label: 'Description', placeholder: 'Describe what participants should create...', icon: 'FileText', multiline: true },
          { label: 'Category', placeholder: 'Select a category', icon: 'Tag' },
        ].map((field, i) =>
          React.createElement('div', { key: i, style: { marginBottom: 18, animation: `fadeInUp 0.4s ease ${i * 0.1}s both` } },
            React.createElement('label', { style: { display: 'block', fontSize: 13, fontFamily: font, fontWeight: 600, color: t.textSecondary, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 } }, field.label),
            React.createElement('div', { style: { position: 'relative' } },
              React.createElement('div', { style: { position: 'absolute', left: 14, top: field.multiline ? 16 : '50%', transform: field.multiline ? 'none' : 'translateY(-50%)' } },
                React.createElement(Icon, { name: field.icon, size: 16, color: t.textMuted })
              ),
              React.createElement(field.multiline ? 'textarea' : 'input', {
                placeholder: field.placeholder,
                style: {
                  width: '100%', borderRadius: 14, border: `1px solid ${t.border}`, background: t.inputBg,
                  paddingLeft: 40, paddingRight: 14, paddingTop: field.multiline ? 14 : 0, paddingBottom: field.multiline ? 14 : 0,
                  fontSize: 15, fontFamily: font, color: t.text, outline: 'none', boxSizing: 'border-box',
                  height: field.multiline ? 100 : 48, resize: 'none',
                }
              })
            )
          )
        ),
        React.createElement('button', {
          onClick: () => setStep(1),
          style: { width: '100%', height: 50, borderRadius: 14, border: 'none', background: `linear-gradient(135deg, ${t.primary}, ${t.cta})`, fontSize: 15, fontFamily: font, fontWeight: 700, color: '#FFF', cursor: 'pointer', marginTop: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }
        },
          React.createElement('span', null, 'Continue'),
          React.createElement(Icon, { name: 'ArrowRight', size: 18, color: '#FFF' })
        )
      ),

      step === 1 && React.createElement('div', { style: { animation: 'fadeInUp 0.4s ease' } },
        React.createElement('div', { style: { fontSize: 20, fontFamily: font, fontWeight: 700, color: t.text, marginBottom: 20 } }, 'Rules & Stakes'),

        // Time Limit
        React.createElement('div', { style: { marginBottom: 18 } },
          React.createElement('label', { style: { display: 'block', fontSize: 13, fontFamily: font, fontWeight: 600, color: t.textSecondary, marginBottom: 10, textTransform: 'uppercase', letterSpacing: 0.5 } }, 'Time Limit'),
          React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 8 } },
            ...['1h', '12h', '24h', '72h'].map((time, i) =>
              React.createElement('button', {
                key: time,
                style: { padding: '12px 0', borderRadius: 12, border: `1px solid ${i === 2 ? t.primary : t.border}`, background: i === 2 ? `${t.primary}20` : t.surfaceAlt, fontSize: 14, fontFamily: font, fontWeight: 600, color: i === 2 ? t.primary : t.textSecondary, cursor: 'pointer', transition: 'all 0.2s ease' }
              }, time)
            )
          )
        ),

        // Stake Amount
        React.createElement('div', { style: { marginBottom: 18 } },
          React.createElement('label', { style: { display: 'block', fontSize: 13, fontFamily: font, fontWeight: 600, color: t.textSecondary, marginBottom: 10, textTransform: 'uppercase', letterSpacing: 0.5 } }, 'Entry Stake'),
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12, background: t.inputBg, borderRadius: 14, padding: '12px 16px', border: `1px solid ${t.border}` } },
            React.createElement(Icon, { name: 'Coins', size: 20, color: t.warning }),
            React.createElement('input', { placeholder: '50', style: { flex: 1, border: 'none', background: 'transparent', fontSize: 22, fontFamily: font, fontWeight: 700, color: t.text, outline: 'none' } }),
            React.createElement('span', { style: { fontSize: 14, fontFamily: font, fontWeight: 500, color: t.textMuted } }, 'coins')
          )
        ),

        // Difficulty
        React.createElement('div', { style: { marginBottom: 24 } },
          React.createElement('label', { style: { display: 'block', fontSize: 13, fontFamily: font, fontWeight: 600, color: t.textSecondary, marginBottom: 10, textTransform: 'uppercase', letterSpacing: 0.5 } }, 'Difficulty'),
          React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 } },
            ...['Easy', 'Medium', 'Hard'].map((d, i) => {
              const colors = [t.success, t.warning, t.danger];
              return React.createElement('button', {
                key: d,
                style: { padding: '12px 0', borderRadius: 12, border: `1px solid ${i === 1 ? colors[i] : t.border}`, background: i === 1 ? `${colors[i]}20` : t.surfaceAlt, fontSize: 14, fontFamily: font, fontWeight: 600, color: i === 1 ? colors[i] : t.textSecondary, cursor: 'pointer', transition: 'all 0.2s ease' }
              }, d);
            })
          )
        ),

        React.createElement('div', { style: { display: 'flex', gap: 10 } },
          React.createElement('button', {
            onClick: () => setStep(0),
            style: { flex: 1, height: 50, borderRadius: 14, border: `1px solid ${t.border}`, background: 'transparent', fontSize: 15, fontFamily: font, fontWeight: 600, color: t.textSecondary, cursor: 'pointer' }
          }, 'Back'),
          React.createElement('button', {
            onClick: () => setStep(2),
            style: { flex: 2, height: 50, borderRadius: 14, border: 'none', background: `linear-gradient(135deg, ${t.primary}, ${t.cta})`, fontSize: 15, fontFamily: font, fontWeight: 700, color: '#FFF', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }
          },
            React.createElement('span', null, 'Continue'),
            React.createElement(Icon, { name: 'ArrowRight', size: 18, color: '#FFF' })
          )
        )
      ),

      step === 2 && React.createElement('div', { style: { animation: 'fadeInUp 0.4s ease' } },
        React.createElement('div', { style: { fontSize: 20, fontFamily: font, fontWeight: 700, color: t.text, marginBottom: 20 } }, 'Review & Launch'),

        // Preview Card
        React.createElement('div', { style: { background: t.cardAlt, borderRadius: 20, padding: 20, marginBottom: 20, border: `1px solid ${t.border}`, position: 'relative', overflow: 'hidden' } },
          React.createElement('div', { style: { position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${t.primary}, ${t.cta})` } }),
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 } },
            React.createElement('span', { style: { padding: '3px 8px', borderRadius: 6, fontSize: 11, fontFamily: font, fontWeight: 600, background: `${t.warning}20`, color: t.warning } }, 'Medium'),
            React.createElement('span', { style: { padding: '3px 8px', borderRadius: 6, fontSize: 11, fontFamily: font, fontWeight: 600, background: `${t.accent}20`, color: t.accent } }, 'Design')
          ),
          React.createElement('div', { style: { fontSize: 17, fontFamily: font, fontWeight: 700, color: t.text, marginBottom: 8 } }, 'Design a Retro Game Cover'),
          React.createElement('div', { style: { fontSize: 14, fontFamily: font, fontWeight: 400, color: t.textSecondary, lineHeight: 1.5, marginBottom: 14 } }, 'Create a nostalgic game cover art inspired by 80s/90s aesthetics. Must include a title and character.'),
          React.createElement('div', { style: { display: 'flex', gap: 16 } },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
              React.createElement(Icon, { name: 'Clock', size: 14, color: t.textMuted }),
              React.createElement('span', { style: { fontSize: 13, fontFamily: font, fontWeight: 500, color: t.textMuted } }, '24h')
            ),
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
              React.createElement(Icon, { name: 'Coins', size: 14, color: t.warning }),
              React.createElement('span', { style: { fontSize: 13, fontFamily: font, fontWeight: 500, color: t.textMuted } }, '50 stake')
            )
          )
        ),

        // Checklist
        React.createElement('div', { style: { marginBottom: 24 } },
          ...['Sprint details complete', 'Rules defined', 'Stake amount set', 'Ready for review'].map((item, i) =>
            React.createElement('div', { key: i, style: { display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: i < 3 ? `1px solid ${t.border}` : 'none' } },
              React.createElement('div', { style: { width: 24, height: 24, borderRadius: 8, background: `${t.success}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
                React.createElement(Icon, { name: 'Check', size: 14, color: t.success })
              ),
              React.createElement('span', { style: { fontSize: 15, fontFamily: font, fontWeight: 500, color: t.text } }, item)
            )
          )
        ),

        React.createElement('div', { style: { display: 'flex', gap: 10 } },
          React.createElement('button', {
            onClick: () => setStep(1),
            style: { flex: 1, height: 50, borderRadius: 14, border: `1px solid ${t.border}`, background: 'transparent', fontSize: 15, fontFamily: font, fontWeight: 600, color: t.textSecondary, cursor: 'pointer' }
          }, 'Back'),
          React.createElement('button', {
            onClick: () => { setShowCreateSuccess(true); setTimeout(() => setShowCreateSuccess(false), 2500); },
            style: { flex: 2, height: 50, borderRadius: 14, border: 'none', background: `linear-gradient(135deg, ${t.primary}, ${t.cta})`, fontSize: 15, fontFamily: font, fontWeight: 700, color: '#FFF', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, animation: 'glow 2s ease infinite' }
          },
            React.createElement(Icon, { name: 'Rocket', size: 18, color: '#FFF' }),
            React.createElement('span', null, 'Launch Sprint')
          )
        ),

        showCreateSuccess && React.createElement('div', { style: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: t.overlay, zIndex: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'fadeIn 0.2s ease' } },
          React.createElement('div', { style: { background: t.surface, borderRadius: 24, padding: 32, textAlign: 'center', animation: 'scaleIn 0.4s ease', margin: 20 } },
            React.createElement('div', { style: { width: 64, height: 64, borderRadius: '50%', background: `linear-gradient(135deg, ${t.success}, #34D399)`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', animation: 'checkmark 0.5s ease 0.2s both' } },
              React.createElement(Icon, { name: 'Check', size: 32, color: '#FFF' })
            ),
            React.createElement('div', { style: { fontSize: 22, fontFamily: font, fontWeight: 800, color: t.text, marginBottom: 8 } }, 'Sprint Launched!'),
            React.createElement('div', { style: { fontSize: 15, fontFamily: font, fontWeight: 400, color: t.textSecondary } }, 'Your challenge is now live for the community.')
          )
        )
      )
    );
  };

  // --- PORTFOLIO SCREEN ---
  const PortfolioScreen = () => {
    const portfolioItems = [
      { id: 1, title: 'Neon Café Logo', category: 'Design', rating: 4.9, date: 'Apr 2', image: `linear-gradient(135deg, #EC4899, #8B5CF6)`, votes: 42 },
      { id: 2, title: 'Midnight in Neo-Tokyo', category: 'Writing', rating: 4.7, date: 'Mar 28', image: `linear-gradient(135deg, #06B6D4, #3B82F6)`, votes: 31 },
      { id: 3, title: 'Ambient Rain Loop', category: 'Music', rating: 4.5, date: 'Mar 22', image: `linear-gradient(135deg, #10B981, #06B6D4)`, votes: 28 },
      { id: 4, title: 'Urban Symmetry Series', category: 'Photo', rating: 4.8, date: 'Mar 15', image: `linear-gradient(135deg, #F59E0B, #EF4444)`, votes: 55 },
      { id: 5, title: 'Pixel Art Self-Portrait', category: 'Design', rating: 4.9, date: 'Mar 10', image: `linear-gradient(135deg, #A855F7, #EC4899)`, votes: 67 },
      { id: 6, title: 'CSS Particle System', category: 'Code', rating: 5.0, date: 'Mar 5', image: `linear-gradient(135deg, #3B82F6, #8B5CF6)`, votes: 89 },
    ];

    return React.createElement('div', { style: { padding: '0 20px 100px', animation: animateIn ? 'fadeIn 0.4s ease' : 'none' } },
      React.createElement('div', { style: { paddingTop: 16, marginBottom: 20, ...staggerDelay(0) } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
          React.createElement('div', null,
            React.createElement('div', { style: { fontSize: 34, fontFamily: font, fontWeight: 800, color: t.text, letterSpacing: -0.5, marginBottom: 4 } }, 'Portfolio'),
            React.createElement('div', { style: { fontSize: 15, fontFamily: font, fontWeight: 500, color: t.textSecondary } }, '6 completed works')
          ),
          React.createElement('button', { style: { padding: '8px 16px', borderRadius: 12, border: `1px solid ${t.border}`, background: t.surfaceAlt, fontSize: 13, fontFamily: font, fontWeight: 600, color: t.cta, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, minHeight: 44 } },
            React.createElement(Icon, { name: 'Share2', size: 15, color: t.cta }),
            React.createElement('span', null, 'Share')
          )
        )
      ),

      // Stats
      React.createElement('div', { style: { display: 'flex', gap: 10, marginBottom: 24, ...staggerDelay(1) } },
        ...[
          { label: 'Avg Rating', value: '4.8', icon: 'Star', color: '#F59E0B' },
          { label: 'Total Votes', value: '312', icon: 'ThumbsUp', color: t.primary },
        ].map((s, i) =>
          React.createElement('div', { key: i, style: { flex: 1, background: t.card, borderRadius: 16, padding: 16, display: 'flex', alignItems: 'center', gap: 12, border: `1px solid ${t.border}` } },
            React.createElement('div', { style: { width: 40, height: 40, borderRadius: 12, background: `${s.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
              React.createElement(Icon, { name: s.icon, size: 18, color: s.color })
            ),
            React.createElement('div', null,
              React.createElement('div', { style: { fontSize: 20, fontFamily: font, fontWeight: 700, color: t.text } }, s.value),
              React.createElement('div', { style: { fontSize: 12, fontFamily: font, fontWeight: 500, color: t.textMuted } }, s.label)
            )
          )
        )
      ),

      // Grid
      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 } },
        ...portfolioItems.map((item, i) =>
          React.createElement('div', {
            key: item.id,
            style: {
              background: t.card, borderRadius: 18, overflow: 'hidden', border: `1px solid ${t.border}`,
              transition: 'transform 0.2s ease', cursor: 'pointer',
              animation: animateIn ? `fadeInUp 0.5s ease ${(i + 2) * 0.08}s both` : 'none',
            }
          },
            React.createElement('div', { style: { height: 120, background: item.image, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' } },
              React.createElement(Icon, { name: 'Image', size: 28, color: 'rgba(255,255,255,0.5)' }),
              React.createElement('div', { style: { position: 'absolute', top: 8, right: 8, padding: '3px 8px', borderRadius: 8, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', gap: 3 } },
                React.createElement(Icon, { name: 'Star', size: 10, color: '#F59E0B' }),
                React.createElement('span', { style: { fontSize: 11, fontFamily: font, fontWeight: 600, color: '#FFF' } }, item.rating)
              )
            ),
            React.createElement('div', { style: { padding: 12 } },
              React.createElement('div', { style: { fontSize: 14, fontFamily: font, fontWeight: 600, color: t.text, marginBottom: 4, lineHeight: 1.3 } }, item.title),
              React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
                React.createElement('span', { style: { fontSize: 12, fontFamily: font, fontWeight: 500, color: t.accent } }, item.category),
                React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 3 } },
                  React.createElement(Icon, { name: 'ThumbsUp', size: 11, color: t.textMuted }),
                  React.createElement('span', { style: { fontSize: 12, fontFamily: font, fontWeight: 500, color: t.textMuted } }, item.votes)
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
    return React.createElement('div', { style: { padding: '0 20px 100px', animation: animateIn ? 'fadeIn 0.4s ease' : 'none' } },
      // Profile Header
      React.createElement('div', { style: { textAlign: 'center', paddingTop: 20, marginBottom: 24, ...staggerDelay(0) } },
        React.createElement('div', { style: { width: 80, height: 80, borderRadius: 24, background: `linear-gradient(135deg, ${t.primary}, ${t.cta})`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px', fontSize: 32, fontFamily: font, fontWeight: 800, color: '#FFF', boxShadow: `0 8px 32px ${t.primary}40`, animation: 'float 3s ease infinite' } }, 'S'),
        React.createElement('div', { style: { fontSize: 22, fontFamily: font, fontWeight: 800, color: t.text, letterSpacing: -0.5 } }, 'Steve'),
        React.createElement('div', { style: { fontSize: 15, fontFamily: font, fontWeight: 500, color: t.textSecondary, marginBottom: 4 } }, '@stevecreates'),
        React.createElement('div', { style: { fontSize: 13, fontFamily: font, fontWeight: 500, color: t.primary } }, 'Level 12 — Rising Creator'),

        // Theme toggle
        React.createElement('button', {
          onClick: () => setIsDark(!isDark),
          style: { marginTop: 14, padding: '8px 20px', borderRadius: 12, border: `1px solid ${t.border}`, background: t.surfaceAlt, fontSize: 13, fontFamily: font, fontWeight: 600, color: t.textSecondary, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8, minHeight: 44, transition: 'all 0.2s ease' }
        },
          React.createElement(Icon, { name: isDark ? 'Sun' : 'Moon', size: 15, color: t.primary }),
          React.createElement('span', null, isDark ? 'Light Mode' : 'Dark Mode')
        )
      ),

      // Stats Grid
      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 24, ...staggerDelay(1) } },
        ...[
          { value: '23', label: 'Completed' },
          { value: '1,240', label: 'Coins' },
          { value: '7', label: 'Day Streak' },
        ].map((s, i) =>
          React.createElement('div', { key: i, style: { background: t.card, borderRadius: 16, padding: '16px 8px', textAlign: 'center', border: `1px solid ${t.border}` } },
            React.createElement('div', { style: { fontSize: 20, fontFamily: font, fontWeight: 800, color: t.text } }, s.value),
            React.createElement('div', { style: { fontSize: 12, fontFamily: font, fontWeight: 500, color: t.textMuted } }, s.label)
          )
        )
      ),

      // Badges
      React.createElement('div', { style: { marginBottom: 24, ...staggerDelay(2) } },
        React.createElement('div', { style: { fontSize: 20, fontFamily: font, fontWeight: 700, color: t.text, marginBottom: 14 } }, 'Badges'),
        React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 } },
          ...badges.map((badge, i) =>
            React.createElement('div', {
              key: i,
              style: {
                background: t.card, borderRadius: 16, padding: 14, textAlign: 'center',
                border: `1px solid ${badge.earned ? badge.color + '40' : t.border}`,
                opacity: badge.earned ? 1 : 0.4, transition: 'all 0.2s ease',
                animation: animateIn ? `scaleIn 0.4s ease ${i * 0.06}s both` : 'none',
              }
            },
              React.createElement('div', { style: { width: 40, height: 40, borderRadius: 12, background: `${badge.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px' } },
                React.createElement(Icon, { name: badge.icon, size: 20, color: badge.color })
              ),
              React.createElement('div', { style: { fontSize: 12, fontFamily: font, fontWeight: 600, color: t.text } }, badge.name)
            )
          )
        )
      ),

      // Menu Items
      React.createElement('div', { style: { ...staggerDelay(3) } },
        ...[
          { icon: 'Settings', label: 'Settings', color: t.textSecondary },
          { icon: 'HelpCircle', label: 'Help & FAQ', color: t.textSecondary },
          { icon: 'Shield', label: 'Privacy', color: t.textSecondary },
          { icon: 'LogOut', label: 'Sign Out', color: t.danger },
        ].map((item, i) =>
          React.createElement('button', {
            key: i,
            style: {
              width: '100%', display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px',
              background: t.card, borderRadius: 14, border: `1px solid ${t.border}`, cursor: 'pointer',
              marginBottom: 8, transition: 'all 0.2s ease', minHeight: 48,
            }
          },
            React.createElement(Icon, { name: item.icon, size: 20, color: item.color }),
            React.createElement('span', { style: { flex: 1, fontSize: 15, fontFamily: font, fontWeight: 500, color: item.color, textAlign: 'left' } }, item.label),
            React.createElement(Icon, { name: 'ChevronRight', size: 18, color: t.textMuted })
          )
        )
      )
    );
  };

  // --- NAV BAR ---
  const navItems = [
    { id: 'home', icon: 'Home', label: 'Home' },
    { id: 'explore', icon: 'Compass', label: 'Explore' },
    { id: 'create', icon: 'PlusCircle', label: 'Create' },
    { id: 'portfolio', icon: 'Briefcase', label: 'Portfolio' },
    { id: 'profile', icon: 'User', label: 'Profile' },
  ];

  const screens = {
    home: HomeScreen,
    explore: ExploreScreen,
    create: CreateScreen,
    portfolio: PortfolioScreen,
    profile: ProfileScreen,
  };

  const CurrentScreen = screens[activeScreen] || HomeScreen;

  return React.createElement('div', {
    style: { minHeight: '100vh', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px 0', fontFamily: font }
  },
    styleTag,
    React.createElement('div', {
      style: {
        width: 375, height: 812, borderRadius: 44, overflow: 'hidden', position: 'relative',
        background: t.bg, boxShadow: '0 25px 80px rgba(0,0,0,0.3)', display: 'flex', flexDirection: 'column',
      }
    },
      // Scrollable Content
      React.createElement('div', {
        style: { flex: 1, overflowY: 'auto', overflowX: 'hidden', position: 'relative', paddingTop: 8 }
      },
        React.createElement(CurrentScreen)
      ),

      // Bottom Nav
      React.createElement('div', {
        style: {
          display: 'flex', justifyContent: 'space-around', alignItems: 'center',
          padding: '8px 8px 24px', background: t.navBg, backdropFilter: 'blur(20px)',
          borderTop: `1px solid ${t.border}`,
        }
      },
        ...navItems.map(item =>
          React.createElement('button', {
            key: item.id,
            onClick: () => setActiveScreen(item.id),
            style: {
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
              padding: '6px 12px', background: 'none', border: 'none', cursor: 'pointer',
              minWidth: 56, minHeight: 44, transition: 'all 0.2s ease',
            }
          },
            item.id === 'create' ?
              React.createElement('div', {
                style: {
                  width: 44, height: 44, borderRadius: 14,
                  background: `linear-gradient(135deg, ${t.primary}, ${t.cta})`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: `0 4px 16px ${t.primary}50`, marginTop: -14,
                  transform: activeScreen === item.id ? 'scale(1.1)' : 'scale(1)',
                  transition: 'transform 0.2s ease',
                }
              },
                React.createElement(Icon, { name: 'Plus', size: 22, color: '#FFF' })
              ) :
              React.createElement(React.Fragment, null,
                React.createElement(Icon, {
                  name: item.icon, size: 22,
                  color: activeScreen === item.id ? t.primary : t.textMuted,
                }),
                React.createElement('span', {
                  style: {
                    fontSize: 10, fontFamily: font, fontWeight: 600,
                    color: activeScreen === item.id ? t.primary : t.textMuted,
                    transition: 'color 0.2s ease',
                  }
                }, item.label)
              )
          )
        )
      )
    )
  );
}
