function App() {
  const { useState, useEffect, useRef } = React;

  // ─── THEMES ──────────────────────────────────────────────────────────────────
  const themes = {
    light: {
      bg: '#F4F1FF',
      surface: '#FFFFFF',
      surface2: '#EDE9FE',
      surfaceElevated: '#F9F7FF',
      text: '#1E1B4B',
      textSecondary: '#6B6B8A',
      textMuted: '#A8A8C0',
      primary: '#7C3AED',
      primaryDark: '#6D28D9',
      primaryLight: '#EDE9FE',
      primaryGradient: 'linear-gradient(135deg, #7C3AED 0%, #A855F7 100%)',
      accentPink: '#EC4899',
      accentGreen: '#10B981',
      accentBlue: '#3B82F6',
      accentAmber: '#F59E0B',
      border: '#E8E4F8',
      navBg: '#FFFFFF',
      navBorder: 'rgba(124,58,237,0.08)',
      cardShadow: '0 2px 16px rgba(124,58,237,0.07)',
      statusBar: '#1E1B4B',
      inputBg: '#F4F1FF',
      toggleTrackOff: '#DDD6FE',
      scrim: 'rgba(30,27,75,0.04)',
    },
    dark: {
      bg: '#0D0B1A',
      surface: '#15112A',
      surface2: '#1E1838',
      surfaceElevated: '#221D3D',
      text: '#EDE9FE',
      textSecondary: '#9D93C8',
      textMuted: '#5E577E',
      primary: '#A78BFA',
      primaryDark: '#8B5CF6',
      primaryLight: '#2D1B69',
      primaryGradient: 'linear-gradient(135deg, #7C3AED 0%, #A855F7 100%)',
      accentPink: '#F472B6',
      accentGreen: '#34D399',
      accentBlue: '#60A5FA',
      accentAmber: '#FBBF24',
      border: '#2A2050',
      navBg: '#100E20',
      navBorder: 'rgba(167,139,250,0.12)',
      cardShadow: '0 2px 16px rgba(0,0,0,0.4)',
      statusBar: '#EDE9FE',
      inputBg: '#1E1838',
      toggleTrackOff: '#2A2050',
      scrim: 'rgba(0,0,0,0.2)',
    },
  };

  // ─── STATE ────────────────────────────────────────────────────────────────────
  const [activeTab, setActiveTab] = useState('home');
  const [isDark, setIsDark] = useState(false);
  const [pressedId, setPressedId] = useState(null);
  const [likedMoments, setLikedMoments] = useState(new Set(['m1', 'm3']));

  const t = isDark ? themes.dark : themes.light;

  // ─── FONT INJECTION ───────────────────────────────────────────────────────────
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    const style = document.createElement('style');
    style.textContent = `
      * { box-sizing: border-box; margin: 0; padding: 0; }
      input { outline: none; border: none; }
      ::-webkit-scrollbar { display: none; }
      body { background: #E2DAF7; font-family: 'Plus Jakarta Sans', sans-serif; }
    `;
    document.head.appendChild(style);
  }, []);

  // ─── DATA ─────────────────────────────────────────────────────────────────────
  const videos = [
    { id: 'v1', name: "Emma's First Steps", duration: '4:32', moments: 8, color: 'linear-gradient(135deg, #EC4899, #8B5CF6)', tag: 'Family', processed: true },
    { id: 'v2', name: 'Calculus Lecture — Week 3', duration: '1:28:45', moments: 34, color: 'linear-gradient(135deg, #3B82F6, #06B6D4)', tag: 'Study', processed: true },
    { id: 'v3', name: 'Product Demo — Q4 Review', duration: '47:12', moments: 19, color: 'linear-gradient(135deg, #10B981, #3B82F6)', tag: 'Work', processed: true },
    { id: 'v4', name: 'Kitchen Renovation', duration: '2:15:33', moments: 41, color: 'linear-gradient(135deg, #F59E0B, #EF4444)', tag: 'Home', processed: true },
    { id: 'v5', name: 'Birthday Party 2024', duration: '38:20', moments: 22, color: 'linear-gradient(135deg, #EC4899, #F59E0B)', tag: 'Family', processed: false },
    { id: 'v6', name: 'Guitar Lesson — Chords', duration: '52:10', moments: 15, color: 'linear-gradient(135deg, #8B5CF6, #06B6D4)', tag: 'Hobby', processed: true },
  ];

  const moments = [
    { id: 'm1', video: "Emma's First Steps", time: '0:23', label: 'First words!', type: 'speech', color: '#8B5CF6', thumb: 'linear-gradient(135deg, #EC4899, #8B5CF6)' },
    { id: 'm2', video: 'Calculus Lecture', time: '1:45:12', label: 'Board explanation', type: 'motion', color: '#3B82F6', thumb: 'linear-gradient(135deg, #3B82F6, #06B6D4)' },
    { id: 'm3', video: 'Product Demo', time: '22:45', label: 'Laughter spike', type: 'emotion', color: '#10B981', thumb: 'linear-gradient(135deg, #10B981, #3B82F6)' },
    { id: 'm4', video: 'Kitchen Reno', time: '18:05', label: 'Red backpack', type: 'object', color: '#EF4444', thumb: 'linear-gradient(135deg, #F59E0B, #EF4444)' },
  ];

  const reels = [
    { id: 'r1', title: "Emma's Milestones", clips: 8, duration: '3:24', category: 'Family', color: 'linear-gradient(135deg, #EC4899, #8B5CF6)', isNew: true },
    { id: 'r2', title: 'Best Lecture Moments', clips: 12, duration: '18:45', category: 'Study', color: 'linear-gradient(135deg, #3B82F6, #8B5CF6)', isNew: false },
    { id: 'r3', title: 'Q4 Customer Reactions', clips: 6, duration: '5:30', category: 'Work', color: 'linear-gradient(135deg, #10B981, #06B6D4)', isNew: true },
    { id: 'r4', title: 'Reno Progress Timeline', clips: 15, duration: '8:12', category: 'Home', color: 'linear-gradient(135deg, #F59E0B, #EF4444)', isNew: false },
  ];

  const searchSuggestions = [
    { text: 'when he explains the second step', type: 'speech' },
    { text: 'the part with the red backpack', type: 'object' },
    { text: 'first words or baby speech', type: 'speech' },
    { text: 'laughter and reactions', type: 'emotion' },
    { text: 'scene changes and transitions', type: 'scene' },
  ];

  const searchResults = [
    { id: 's1', video: 'Calculus Lecture — Week 3', time: '45:32', context: '"...so the second derivative tells us the rate of change..."', type: 'speech', confidence: 97, thumb: 'linear-gradient(135deg, #3B82F6, #06B6D4)' },
    { id: 's2', video: 'Calculus Lecture — Week 3', time: '1:12:08', context: '"...step two is where most students get confused, pay attention..."', type: 'speech', confidence: 91, thumb: 'linear-gradient(135deg, #3B82F6, #06B6D4)' },
    { id: 's3', video: 'Product Demo — Q4', time: '15:22', context: 'Presenter introduces the second feature set on the left panel', type: 'motion', confidence: 84, thumb: 'linear-gradient(135deg, #10B981, #3B82F6)' },
  ];

  const typeColors = {
    speech: '#8B5CF6',
    emotion: '#EC4899',
    object: '#EF4444',
    motion: '#3B82F6',
    scene: '#10B981',
  };

  // ─── HELPERS ──────────────────────────────────────────────────────────────────
  const press = (id) => {
    setPressedId(id);
    setTimeout(() => setPressedId(null), 180);
  };

  const toggleLike = (id) => {
    setLikedMoments(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  // ─── SHARED COMPONENTS ────────────────────────────────────────────────────────
  const card = (extra = {}) => ({
    background: t.surface,
    borderRadius: 18,
    border: `1px solid ${t.border}`,
    boxShadow: t.cardShadow,
    ...extra,
  });

  const chip = (color, bg, extra = {}) => ({
    display: 'inline-flex',
    alignItems: 'center',
    gap: 4,
    background: bg,
    color: color,
    borderRadius: 100,
    padding: '5px 11px',
    fontSize: 11,
    fontWeight: 700,
    fontFamily: 'Plus Jakarta Sans, sans-serif',
    ...extra,
  });

  const StatusBar = () =>
    React.createElement('div', {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '14px 22px 6px',
        fontSize: 12,
        fontWeight: 700,
        color: t.text,
        fontFamily: 'Plus Jakarta Sans, sans-serif',
        flexShrink: 0,
      },
    },
      React.createElement('span', null, '9:41'),
      React.createElement('div', { style: { display: 'flex', gap: 5, alignItems: 'center' } },
        React.createElement(window.lucide.Wifi, { size: 14, color: t.text }),
        React.createElement(window.lucide.Battery, { size: 16, color: t.text }),
      ),
    );

  // ─── HOME SCREEN ─────────────────────────────────────────────────────────────
  const HomeScreen = () =>
    React.createElement('div', { style: { flex: 1, overflowY: 'auto', paddingBottom: 88 } },
      React.createElement(StatusBar),

      // Header
      React.createElement('div', {
        style: { padding: '6px 22px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' },
      },
        React.createElement('div', null,
          React.createElement('p', { style: { fontSize: 13, color: t.textSecondary, fontWeight: 500, marginBottom: 2 } }, 'Good afternoon'),
          React.createElement('h1', { style: { fontSize: 26, fontWeight: 800, color: t.text, lineHeight: 1.2 } }, 'Alex ✌️'),
        ),
        React.createElement('div', {
          style: {
            width: 42, height: 42, borderRadius: 13, background: t.primaryGradient,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 14px rgba(124,58,237,0.35)', cursor: 'pointer',
          },
        },
          React.createElement(window.lucide.Bell, { size: 18, color: '#fff' }),
        ),
      ),

      // Stats Row
      React.createElement('div', { style: { display: 'flex', gap: 10, padding: '0 22px 20px' } },
        [
          { label: 'Videos', value: '47', icon: window.lucide.Video, color: t.primary },
          { label: 'Moments', value: '312', icon: window.lucide.Sparkles, color: t.accentPink },
          { label: 'Reels', value: '8', icon: window.lucide.Film, color: t.accentGreen },
        ].map((stat, i) =>
          React.createElement('div', {
            key: i,
            style: { ...card({ padding: '12px 14px', flex: 1 }) },
          },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 5, marginBottom: 6 } },
              React.createElement(stat.icon, { size: 13, color: stat.color }),
              React.createElement('span', { style: { fontSize: 11, color: t.textSecondary, fontWeight: 600 } }, stat.label),
            ),
            React.createElement('p', { style: { fontSize: 24, fontWeight: 800, color: t.text } }, stat.value),
          ),
        ),
      ),

      // Quick Search
      React.createElement('div', {
        onClick: () => setActiveTab('search'),
        style: {
          margin: '0 22px 22px',
          ...card({
            padding: '13px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            cursor: 'pointer',
            background: t.inputBg,
          }),
        },
      },
        React.createElement(window.lucide.Search, { size: 15, color: t.textMuted }),
        React.createElement('span', { style: { color: t.textMuted, fontSize: 14, fontWeight: 500 } }, 'Search moments... "first words"'),
      ),

      // Recent Moments
      React.createElement('div', { style: { marginBottom: 22 } },
        React.createElement('div', {
          style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 22px 12px' },
        },
          React.createElement('h2', { style: { fontSize: 16, fontWeight: 800, color: t.text } }, 'Recent Moments'),
          React.createElement('span', { style: { fontSize: 13, color: t.primary, fontWeight: 700, cursor: 'pointer' } }, 'See all'),
        ),
        React.createElement('div', {
          style: { display: 'flex', gap: 12, overflowX: 'auto', padding: '0 22px 4px' },
        },
          moments.map(m =>
            React.createElement('div', {
              key: m.id,
              style: {
                ...card({ padding: 0, overflow: 'hidden', flexShrink: 0, width: 158, cursor: 'pointer' }),
                transform: pressedId === m.id ? 'scale(0.95)' : 'scale(1)',
                transition: 'transform 0.15s ease',
              },
              onClick: () => press(m.id),
            },
              React.createElement('div', {
                style: {
                  height: 92, background: m.thumb,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative',
                },
              },
                React.createElement('div', {
                  style: {
                    width: 32, height: 32, borderRadius: '50%',
                    background: 'rgba(255,255,255,0.22)', backdropFilter: 'blur(8px)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  },
                },
                  React.createElement(window.lucide.Play, { size: 13, color: '#fff', fill: '#fff' }),
                ),
                React.createElement('div', {
                  style: {
                    position: 'absolute', bottom: 6, right: 7,
                    background: 'rgba(0,0,0,0.62)', color: '#fff',
                    fontSize: 9, fontWeight: 700, padding: '2px 6px', borderRadius: 5,
                  },
                }, m.time),
                React.createElement('div', {
                  style: {
                    ...chip('#fff', typeColors[m.type] + 'CC'),
                    position: 'absolute', top: 6, left: 7,
                    fontSize: 9, padding: '2px 7px',
                  },
                }, m.type),
              ),
              React.createElement('div', { style: { padding: '10px 11px 12px' } },
                React.createElement('p', { style: { fontSize: 12, fontWeight: 700, color: t.text, marginBottom: 6, lineHeight: 1.3 } }, m.label),
                React.createElement('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' } },
                  React.createElement('span', { style: { fontSize: 10, color: t.textSecondary, fontWeight: 500 } },
                    m.video.length > 12 ? m.video.slice(0, 12) + '…' : m.video,
                  ),
                  React.createElement('div', {
                    onClick: (e) => { e.stopPropagation(); toggleLike(m.id); },
                    style: { cursor: 'pointer' },
                  },
                    React.createElement(window.lucide.Heart, {
                      size: 14,
                      color: likedMoments.has(m.id) ? '#EC4899' : t.textMuted,
                      fill: likedMoments.has(m.id) ? '#EC4899' : 'none',
                    }),
                  ),
                ),
              ),
            ),
          ),
        ),
      ),

      // Smart Reels
      React.createElement('div', { style: { marginBottom: 22 } },
        React.createElement('div', {
          style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 22px 12px' },
        },
          React.createElement('h2', { style: { fontSize: 16, fontWeight: 800, color: t.text } }, 'Smart Reels'),
          React.createElement('span', {
            style: { fontSize: 13, color: t.primary, fontWeight: 700, cursor: 'pointer' },
            onClick: () => setActiveTab('reels'),
          }, 'See all'),
        ),
        React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 10, padding: '0 22px' } },
          reels.slice(0, 2).map(r =>
            React.createElement('div', {
              key: r.id,
              style: {
                ...card({ padding: 0, overflow: 'hidden', display: 'flex', cursor: 'pointer' }),
                transform: pressedId === r.id ? 'scale(0.97)' : 'scale(1)',
                transition: 'transform 0.15s ease',
              },
              onClick: () => press(r.id),
            },
              React.createElement('div', {
                style: {
                  width: 70, height: 70, background: r.color, flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                },
              },
                React.createElement(window.lucide.Film, { size: 20, color: 'rgba(255,255,255,0.9)' }),
              ),
              React.createElement('div', { style: { padding: '13px 14px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' } },
                React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 } },
                  React.createElement('p', { style: { fontSize: 14, fontWeight: 700, color: t.text } }, r.title),
                  r.isNew && React.createElement('span', {
                    style: chip('#fff', t.primary, { fontSize: 9, padding: '2px 6px' }),
                  }, 'NEW'),
                ),
                React.createElement('p', { style: { fontSize: 12, color: t.textSecondary, fontWeight: 500 } },
                  `${r.clips} clips · ${r.duration}`,
                ),
              ),
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', paddingRight: 14 } },
                React.createElement(window.lucide.ChevronRight, { size: 16, color: t.textMuted }),
              ),
            ),
          ),
        ),
      ),

      // Activity Feed
      React.createElement('div', { style: { padding: '0 22px' } },
        React.createElement('h2', { style: { fontSize: 16, fontWeight: 800, color: t.text, marginBottom: 12 } }, 'Recent Activity'),
        React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 9 } },
          [
            { icon: window.lucide.Loader, text: 'Birthday Party 2024 is being analyzed…', time: '2m ago', color: t.accentAmber },
            { icon: window.lucide.Film, text: "New reel ready: Emma's Milestones", time: '1h ago', color: t.accentPink },
            { icon: window.lucide.Tag, text: '34 moments tagged in Calculus Lecture', time: '3h ago', color: t.accentBlue },
          ].map((item, i) =>
            React.createElement('div', {
              key: i,
              style: {
                ...card({ padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 12 }),
              },
            },
              React.createElement('div', {
                style: {
                  width: 36, height: 36, borderRadius: 11,
                  background: item.color + '22',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                },
              },
                React.createElement(item.icon, { size: 15, color: item.color }),
              ),
              React.createElement('div', { style: { flex: 1 } },
                React.createElement('p', { style: { fontSize: 13, fontWeight: 600, color: t.text, marginBottom: 2, lineHeight: 1.4 } }, item.text),
                React.createElement('p', { style: { fontSize: 11, color: t.textMuted, fontWeight: 500 } }, item.time),
              ),
            ),
          ),
        ),
      ),
    );

  // ─── SEARCH SCREEN ────────────────────────────────────────────────────────────
  const SearchScreen = () => {
    const [query, setQuery] = useState('');
    const [hasResults, setHasResults] = useState(false);
    const [activeFilter, setActiveFilter] = useState('all');
    const filters = ['all', 'speech', 'emotion', 'objects', 'scenes'];

    const handleSearch = (q) => {
      setQuery(q);
      setHasResults(q.length > 2);
    };

    return React.createElement('div', { style: { flex: 1, overflowY: 'auto', paddingBottom: 88 } },
      React.createElement(StatusBar),

      React.createElement('div', { style: { padding: '6px 22px 18px' } },
        React.createElement('h1', { style: { fontSize: 24, fontWeight: 800, color: t.text, marginBottom: 4 } }, 'Search Moments'),
        React.createElement('p', { style: { fontSize: 13, color: t.textSecondary, fontWeight: 500 } }, 'Find anything across all your videos'),
      ),

      // Search Input
      React.createElement('div', { style: { padding: '0 22px 16px' } },
        React.createElement('div', {
          style: {
            display: 'flex', alignItems: 'center', gap: 10,
            background: t.surface,
            border: `1.5px solid ${hasResults ? t.primary : t.border}`,
            borderRadius: 15, padding: '12px 16px',
            boxShadow: hasResults ? `0 0 0 3px ${t.primaryLight}` : t.cardShadow,
            transition: 'all 0.2s ease',
          },
        },
          React.createElement(window.lucide.Search, { size: 15, color: hasResults ? t.primary : t.textSecondary }),
          React.createElement('input', {
            style: {
              flex: 1, background: 'transparent', fontSize: 14,
              color: t.text, fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 500,
            },
            placeholder: 'Try: "when he laughs" or "red door"',
            value: query,
            onChange: (e) => handleSearch(e.target.value),
          }),
          query.length > 0 && React.createElement('div', {
            onClick: () => handleSearch(''),
            style: { cursor: 'pointer' },
          },
            React.createElement(window.lucide.X, { size: 15, color: t.textMuted }),
          ),
        ),
      ),

      // Filter Chips
      React.createElement('div', { style: { display: 'flex', gap: 7, overflowX: 'auto', padding: '0 22px 18px' } },
        filters.map(f =>
          React.createElement('div', {
            key: f,
            onClick: () => setActiveFilter(f),
            style: {
              ...chip(
                activeFilter === f ? '#fff' : t.primary,
                activeFilter === f ? t.primary : t.primaryLight,
                { cursor: 'pointer', whiteSpace: 'nowrap', padding: '7px 14px', fontSize: 12, flexShrink: 0, transition: 'all 0.2s ease', textTransform: 'capitalize' },
              ),
            },
          }, f),
        ),
      ),

      !hasResults
        ? React.createElement('div', { style: { padding: '0 22px' } },
            React.createElement('p', { style: { fontSize: 12, fontWeight: 700, color: t.textMuted, letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 12 } }, 'Try searching for'),
            React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 8 } },
              searchSuggestions.map((s, i) =>
                React.createElement('div', {
                  key: i,
                  onClick: () => handleSearch(s.text),
                  style: {
                    ...card({ padding: '13px 16px', display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }),
                  },
                },
                  React.createElement('div', {
                    style: {
                      width: 32, height: 32, borderRadius: 9,
                      background: typeColors[s.type] + '22',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    },
                  },
                    React.createElement(window.lucide.Sparkles, { size: 13, color: typeColors[s.type] }),
                  ),
                  React.createElement('span', { style: { fontSize: 13, color: t.text, fontWeight: 500, flex: 1 } }, `"${s.text}"`),
                  React.createElement(window.lucide.ArrowUpRight, { size: 14, color: t.textMuted }),
                ),
              ),
            ),
          )
        : React.createElement('div', { style: { padding: '0 22px' } },
            React.createElement('p', { style: { fontSize: 13, fontWeight: 600, color: t.textSecondary, marginBottom: 12 } },
              `${searchResults.length} results for "${query}"`,
            ),
            React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 12 } },
              searchResults.map(r =>
                React.createElement('div', {
                  key: r.id,
                  style: { ...card({ padding: 0, overflow: 'hidden' }), cursor: 'pointer' },
                },
                  React.createElement('div', { style: { display: 'flex' } },
                    React.createElement('div', {
                      style: {
                        width: 82, height: 82, background: r.thumb, flexShrink: 0,
                        display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative',
                      },
                    },
                      React.createElement(window.lucide.Play, { size: 18, color: 'rgba(255,255,255,0.9)', fill: 'rgba(255,255,255,0.9)' }),
                      React.createElement('div', {
                        style: {
                          position: 'absolute', bottom: 5, left: 5,
                          background: 'rgba(0,0,0,0.65)', borderRadius: 4,
                          padding: '1px 5px', fontSize: 9, color: '#fff', fontWeight: 700,
                        },
                      }, r.time),
                    ),
                    React.createElement('div', { style: { padding: '11px 14px', flex: 1 } },
                      React.createElement('p', {
                        style: {
                          fontSize: 10, color: typeColors[r.type], fontWeight: 800,
                          textTransform: 'uppercase', letterSpacing: 0.6, marginBottom: 4,
                        },
                      }, r.type),
                      React.createElement('p', { style: { fontSize: 13, fontWeight: 600, color: t.text, lineHeight: 1.4, marginBottom: 4 } }, r.context),
                      React.createElement('p', { style: { fontSize: 11, color: t.textSecondary, fontWeight: 500 } }, r.video.slice(0, 26) + '…'),
                    ),
                  ),
                  React.createElement('div', {
                    style: {
                      borderTop: `1px solid ${t.border}`,
                      padding: '8px 14px',
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    },
                  },
                    React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
                      React.createElement(window.lucide.Zap, { size: 12, color: t.accentGreen }),
                      React.createElement('span', { style: { fontSize: 11, color: t.accentGreen, fontWeight: 700 } }, `${r.confidence}% match`),
                    ),
                    React.createElement('div', { style: { display: 'flex', gap: 14, alignItems: 'center' } },
                      React.createElement(window.lucide.Share2, { size: 14, color: t.textSecondary }),
                      React.createElement(window.lucide.Bookmark, { size: 14, color: t.textSecondary }),
                    ),
                  ),
                ),
              ),
            ),
          ),
    );
  };

  // ─── LIBRARY SCREEN ───────────────────────────────────────────────────────────
  const LibraryScreen = () => {
    const [filter, setFilter] = useState('All');
    const tags = ['All', 'Family', 'Study', 'Work', 'Home', 'Hobby'];
    const filtered = filter === 'All' ? videos : videos.filter(v => v.tag === filter);

    return React.createElement('div', { style: { flex: 1, overflowY: 'auto', paddingBottom: 88 } },
      React.createElement(StatusBar),

      React.createElement('div', {
        style: { padding: '6px 22px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' },
      },
        React.createElement('div', null,
          React.createElement('h1', { style: { fontSize: 24, fontWeight: 800, color: t.text, marginBottom: 3 } }, 'Library'),
          React.createElement('p', { style: { fontSize: 13, color: t.textSecondary, fontWeight: 500 } }, `${videos.length} videos · 312 moments tagged`),
        ),
        React.createElement('div', {
          style: {
            width: 40, height: 40, borderRadius: 12, background: t.primaryLight,
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          },
        },
          React.createElement(window.lucide.Plus, { size: 18, color: t.primary }),
        ),
      ),

      // Filter Chips
      React.createElement('div', { style: { display: 'flex', gap: 7, overflowX: 'auto', padding: '0 22px 18px' } },
        tags.map(tag =>
          React.createElement('div', {
            key: tag,
            onClick: () => setFilter(tag),
            style: {
              ...chip(
                filter === tag ? '#fff' : t.primary,
                filter === tag ? t.primary : t.primaryLight,
                { cursor: 'pointer', whiteSpace: 'nowrap', padding: '7px 14px', fontSize: 12, flexShrink: 0, transition: 'all 0.2s ease' },
              ),
            },
          }, tag),
        ),
      ),

      // Grid
      React.createElement('div', {
        style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, padding: '0 22px' },
      },
        filtered.map(v =>
          React.createElement('div', {
            key: v.id,
            style: {
              ...card({ padding: 0, overflow: 'hidden', cursor: 'pointer' }),
              transform: pressedId === v.id ? 'scale(0.95)' : 'scale(1)',
              transition: 'transform 0.15s ease',
            },
            onClick: () => press(v.id),
          },
            React.createElement('div', {
              style: { height: 88, background: v.color, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' },
            },
              React.createElement('div', {
                style: {
                  width: 28, height: 28, borderRadius: '50%',
                  background: 'rgba(255,255,255,0.22)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                },
              },
                React.createElement(window.lucide.Play, { size: 11, color: '#fff', fill: '#fff' }),
              ),
              React.createElement('div', {
                style: {
                  position: 'absolute', bottom: 6, right: 7,
                  background: 'rgba(0,0,0,0.6)', color: '#fff',
                  fontSize: 9, fontWeight: 700, padding: '2px 5px', borderRadius: 4,
                },
              }, v.duration),
              !v.processed && React.createElement('div', {
                style: {
                  position: 'absolute', top: 6, left: 7,
                  background: t.accentAmber, color: '#fff',
                  fontSize: 9, fontWeight: 700, padding: '2px 6px', borderRadius: 4,
                },
              }, 'Analyzing'),
            ),
            React.createElement('div', { style: { padding: '10px 11px 12px' } },
              React.createElement('p', { style: { fontSize: 12, fontWeight: 700, color: t.text, marginBottom: 6, lineHeight: 1.35 } }, v.name),
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' } },
                React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 3 } },
                  React.createElement(window.lucide.Tag, { size: 10, color: t.primary }),
                  React.createElement('span', { style: { fontSize: 11, color: t.primary, fontWeight: 700 } }, `${v.moments}`),
                ),
                React.createElement('span', { style: { fontSize: 10, color: t.textMuted, fontWeight: 600 } }, v.tag),
              ),
            ),
          ),
        ),
      ),
    );
  };

  // ─── REELS SCREEN ─────────────────────────────────────────────────────────────
  const ReelsScreen = () => {
    const [activeCategory, setActiveCategory] = useState('All');
    const categories = ['All', 'Family', 'Study', 'Work', 'Home'];
    const filtered = activeCategory === 'All' ? reels : reels.filter(r => r.category === activeCategory);

    return React.createElement('div', { style: { flex: 1, overflowY: 'auto', paddingBottom: 88 } },
      React.createElement(StatusBar),

      React.createElement('div', { style: { padding: '6px 22px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' } },
        React.createElement('div', null,
          React.createElement('h1', { style: { fontSize: 24, fontWeight: 800, color: t.text, marginBottom: 3 } }, 'Smart Reels'),
          React.createElement('p', { style: { fontSize: 13, color: t.textSecondary, fontWeight: 500 } }, 'AI-curated highlight reels'),
        ),
        React.createElement('div', {
          style: {
            background: t.primaryGradient, borderRadius: 12,
            padding: '8px 14px', display: 'flex', alignItems: 'center', gap: 5,
            cursor: 'pointer', boxShadow: '0 4px 14px rgba(124,58,237,0.35)',
          },
        },
          React.createElement(window.lucide.Plus, { size: 13, color: '#fff' }),
          React.createElement('span', { style: { fontSize: 13, fontWeight: 700, color: '#fff' } }, 'Create'),
        ),
      ),

      // Category chips
      React.createElement('div', { style: { display: 'flex', gap: 7, overflowX: 'auto', padding: '0 22px 20px' } },
        categories.map(c =>
          React.createElement('div', {
            key: c,
            onClick: () => setActiveCategory(c),
            style: {
              ...chip(
                activeCategory === c ? '#fff' : t.primary,
                activeCategory === c ? t.primary : t.primaryLight,
                { cursor: 'pointer', whiteSpace: 'nowrap', padding: '7px 14px', fontSize: 12, flexShrink: 0, transition: 'all 0.2s ease' },
              ),
            },
          }, c),
        ),
      ),

      // Featured Hero
      React.createElement('div', { style: { padding: '0 22px 20px' } },
        React.createElement('div', {
          style: {
            height: 188, background: filtered[0] ? filtered[0].color : reels[0].color,
            borderRadius: 22, overflow: 'hidden', position: 'relative', cursor: 'pointer',
          },
        },
          React.createElement('div', {
            style: { position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.72) 0%, transparent 55%)' },
          }),
          React.createElement('div', {
            style: {
              position: 'absolute', top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 52, height: 52, borderRadius: '50%',
              background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            },
          },
            React.createElement(window.lucide.Play, { size: 20, color: '#fff', fill: '#fff' }),
          ),
          React.createElement('div', { style: { position: 'absolute', bottom: 16, left: 16, right: 16 } },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 } },
              React.createElement('span', {
                style: chip('rgba(255,255,255,0.9)', 'rgba(255,255,255,0.2)', { fontSize: 9, padding: '2px 8px', backdropFilter: 'blur(8px)' }),
              }, 'FEATURED'),
            ),
            React.createElement('p', { style: { fontSize: 17, fontWeight: 800, color: '#fff', marginBottom: 3 } },
              filtered[0] ? filtered[0].title : reels[0].title,
            ),
            React.createElement('p', { style: { fontSize: 12, color: 'rgba(255,255,255,0.8)', fontWeight: 500 } },
              filtered[0] ? `${filtered[0].clips} clips · ${filtered[0].duration}` : `${reels[0].clips} clips · ${reels[0].duration}`,
            ),
          ),
        ),
      ),

      // Reel list
      React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 11, padding: '0 22px' } },
        (filtered.length > 1 ? filtered.slice(1) : reels.slice(1)).map(r =>
          React.createElement('div', {
            key: r.id,
            style: {
              ...card({ padding: 0, overflow: 'hidden', display: 'flex', cursor: 'pointer' }),
              transform: pressedId === r.id ? 'scale(0.97)' : 'scale(1)',
              transition: 'transform 0.15s ease',
            },
            onClick: () => press(r.id),
          },
            React.createElement('div', {
              style: {
                width: 90, height: 90, background: r.color, flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative',
              },
            },
              React.createElement(window.lucide.Film, { size: 22, color: 'rgba(255,255,255,0.9)' }),
              r.isNew && React.createElement('div', {
                style: {
                  position: 'absolute', top: 7, right: 7,
                  width: 8, height: 8, borderRadius: '50%', background: '#EC4899',
                  boxShadow: '0 0 6px #EC4899',
                },
              }),
            ),
            React.createElement('div', { style: { padding: '14px 14px', flex: 1 } },
              React.createElement('p', { style: { fontSize: 14, fontWeight: 700, color: t.text, marginBottom: 3 } }, r.title),
              React.createElement('p', { style: { fontSize: 12, color: t.textSecondary, fontWeight: 500, marginBottom: 10 } }, `${r.clips} clips · ${r.duration}`),
              React.createElement('div', { style: { display: 'flex', gap: 8 } },
                React.createElement('div', {
                  style: {
                    display: 'flex', alignItems: 'center', gap: 4,
                    background: t.primaryLight, borderRadius: 8, padding: '4px 10px', cursor: 'pointer',
                  },
                },
                  React.createElement(window.lucide.Share2, { size: 11, color: t.primary }),
                  React.createElement('span', { style: { fontSize: 11, color: t.primary, fontWeight: 700 } }, 'Share'),
                ),
                React.createElement('div', {
                  style: {
                    display: 'flex', alignItems: 'center', gap: 4,
                    background: t.surface2, borderRadius: 8, padding: '4px 10px', cursor: 'pointer',
                  },
                },
                  React.createElement(window.lucide.Pencil, { size: 11, color: t.textSecondary }),
                  React.createElement('span', { style: { fontSize: 11, color: t.textSecondary, fontWeight: 700 } }, 'Edit'),
                ),
              ),
            ),
          ),
        ),
      ),
    );
  };

  // ─── SETTINGS SCREEN ──────────────────────────────────────────────────────────
  const SettingsScreen = () =>
    React.createElement('div', { style: { flex: 1, overflowY: 'auto', paddingBottom: 88 } },
      React.createElement(StatusBar),

      React.createElement('div', { style: { padding: '6px 22px 18px' } },
        React.createElement('h1', { style: { fontSize: 24, fontWeight: 800, color: t.text } }, 'Settings'),
      ),

      // Profile Card
      React.createElement('div', { style: { padding: '0 22px 20px' } },
        React.createElement('div', {
          style: {
            background: t.primaryGradient, borderRadius: 22,
            padding: 20, display: 'flex', alignItems: 'center', gap: 14,
          },
        },
          React.createElement('div', {
            style: {
              width: 54, height: 54, borderRadius: 16,
              background: 'rgba(255,255,255,0.22)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 24,
            },
          }, '👤'),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('p', { style: { fontSize: 16, fontWeight: 800, color: '#fff', marginBottom: 2 } }, 'Alex Johnson'),
            React.createElement('p', { style: { fontSize: 12, color: 'rgba(255,255,255,0.72)', fontWeight: 500 } }, 'alex@clipcue.app'),
          ),
          React.createElement('div', {
            style: {
              background: 'rgba(255,255,255,0.18)', borderRadius: 10,
              padding: '6px 14px', cursor: 'pointer', backdropFilter: 'blur(8px)',
            },
          },
            React.createElement('span', { style: { fontSize: 12, fontWeight: 800, color: '#fff' } }, 'Pro'),
          ),
        ),
      ),

      // Appearance
      React.createElement('div', { style: { padding: '0 22px 16px' } },
        React.createElement('p', { style: { fontSize: 11, fontWeight: 800, color: t.textMuted, letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 10 } }, 'Appearance'),
        React.createElement('div', { style: card({ padding: '16px' }) },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' } },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12 } },
              React.createElement('div', {
                style: {
                  width: 38, height: 38, borderRadius: 11,
                  background: isDark ? '#2A2050' : '#FEF3C7',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                },
              },
                React.createElement(isDark ? window.lucide.Moon : window.lucide.Sun, {
                  size: 16, color: isDark ? t.primary : t.accentAmber,
                }),
              ),
              React.createElement('div', null,
                React.createElement('p', { style: { fontSize: 14, fontWeight: 700, color: t.text, marginBottom: 1 } },
                  isDark ? 'Dark Mode' : 'Light Mode',
                ),
                React.createElement('p', { style: { fontSize: 11, color: t.textSecondary, fontWeight: 500 } }, 'Switch appearance'),
              ),
            ),
            // Toggle
            React.createElement('div', {
              onClick: () => setIsDark(!isDark),
              style: {
                width: 50, height: 28, borderRadius: 14,
                background: isDark ? t.primary : t.toggleTrackOff,
                position: 'relative', cursor: 'pointer',
                transition: 'background 0.3s ease',
              },
            },
              React.createElement('div', {
                style: {
                  position: 'absolute', top: 3,
                  left: isDark ? 24 : 3,
                  width: 22, height: 22, borderRadius: '50%',
                  background: '#fff',
                  boxShadow: '0 1px 5px rgba(0,0,0,0.25)',
                  transition: 'left 0.3s ease',
                },
              }),
            ),
          ),
        ),
      ),

      // Privacy
      React.createElement('div', { style: { padding: '0 22px 16px' } },
        React.createElement('p', { style: { fontSize: 11, fontWeight: 800, color: t.textMuted, letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 10 } }, 'Privacy'),
        React.createElement('div', { style: card({ padding: '16px' }) },
          [
            { icon: window.lucide.Lock, label: 'Processing Mode', value: 'On-Device', color: t.accentGreen },
            { icon: window.lucide.Eye, label: 'Default Share Privacy', value: 'Private', color: t.accentBlue },
            { icon: window.lucide.Mic, label: 'Audio Processing', value: 'Enabled', color: t.primary },
          ].map((item, i, arr) =>
            React.createElement('div', {
              key: i,
              style: {
                display: 'flex', alignItems: 'center',
                paddingBottom: i < arr.length - 1 ? 14 : 0,
                marginBottom: i < arr.length - 1 ? 14 : 0,
                borderBottom: i < arr.length - 1 ? `1px solid ${t.border}` : 'none',
              },
            },
              React.createElement('div', {
                style: {
                  width: 36, height: 36, borderRadius: 10,
                  background: item.color + '22',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 12, flexShrink: 0,
                },
              },
                React.createElement(item.icon, { size: 15, color: item.color }),
              ),
              React.createElement('p', { style: { flex: 1, fontSize: 14, fontWeight: 600, color: t.text } }, item.label),
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
                React.createElement('span', { style: { fontSize: 12, color: t.textSecondary, fontWeight: 600 } }, item.value),
                React.createElement(window.lucide.ChevronRight, { size: 14, color: t.textMuted }),
              ),
            ),
          ),
        ),
      ),

      // Storage
      React.createElement('div', { style: { padding: '0 22px 16px' } },
        React.createElement('p', { style: { fontSize: 11, fontWeight: 800, color: t.textMuted, letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 10 } }, 'Storage'),
        React.createElement('div', { style: card({ padding: '16px' }) },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 } },
            React.createElement('span', { style: { fontSize: 14, fontWeight: 600, color: t.text } }, 'Used Storage'),
            React.createElement('span', { style: { fontSize: 14, fontWeight: 800, color: t.primary } }, '8.3 / 25 GB'),
          ),
          React.createElement('div', {
            style: { height: 7, background: t.border, borderRadius: 8, overflow: 'hidden', marginBottom: 8 },
          },
            React.createElement('div', {
              style: { width: '33%', height: '100%', background: t.primaryGradient, borderRadius: 8 },
            }),
          ),
          React.createElement('p', { style: { fontSize: 11, color: t.textSecondary, fontWeight: 500 } }, '47 videos · 312 cached moments'),
        ),
      ),

      // About
      React.createElement('div', { style: { padding: '0 22px 24px' } },
        React.createElement('p', { style: { fontSize: 11, fontWeight: 800, color: t.textMuted, letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 10 } }, 'About'),
        React.createElement('div', { style: card({ padding: '16px' }) },
          [
            { label: 'Version', value: '1.4.2 (Beta)' },
            { label: 'Send Feedback', value: '' },
            { label: 'Privacy Policy', value: '' },
          ].map((item, i, arr) =>
            React.createElement('div', {
              key: i,
              style: {
                display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer',
                paddingBottom: i < arr.length - 1 ? 14 : 0,
                marginBottom: i < arr.length - 1 ? 14 : 0,
                borderBottom: i < arr.length - 1 ? `1px solid ${t.border}` : 'none',
              },
            },
              React.createElement('span', { style: { fontSize: 14, fontWeight: 600, color: t.text } }, item.label),
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
                item.value && React.createElement('span', { style: { fontSize: 12, color: t.textSecondary, fontWeight: 500 } }, item.value),
                !item.value && React.createElement(window.lucide.ChevronRight, { size: 14, color: t.textMuted }),
              ),
            ),
          ),
        ),
      ),
    );

  // ─── NAV ─────────────────────────────────────────────────────────────────────
  const tabs = [
    { id: 'home', label: 'Home', icon: window.lucide.Home },
    { id: 'search', label: 'Search', icon: window.lucide.Search },
    { id: 'library', label: 'Library', icon: window.lucide.Video },
    { id: 'reels', label: 'Reels', icon: window.lucide.Sparkles },
    { id: 'settings', label: 'Settings', icon: window.lucide.Settings },
  ];

  const screens = {
    home: HomeScreen,
    search: SearchScreen,
    library: LibraryScreen,
    reels: ReelsScreen,
    settings: SettingsScreen,
  };

  // ─── RENDER ───────────────────────────────────────────────────────────────────
  return React.createElement('div', {
    style: {
      minHeight: '100vh',
      background: isDark ? '#1A1330' : '#E2DAF7',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Plus Jakarta Sans, sans-serif',
      transition: 'background 0.4s ease',
    },
  },
    React.createElement('div', {
      style: {
        width: 375, height: 812,
        background: t.bg,
        borderRadius: 52,
        overflow: 'hidden',
        position: 'relative',
        boxShadow: isDark
          ? '0 40px 90px rgba(0,0,0,0.7), 0 0 0 1.5px rgba(255,255,255,0.06)'
          : '0 40px 90px rgba(124,58,237,0.18), 0 0 0 1.5px rgba(255,255,255,0.6)',
        display: 'flex',
        flexDirection: 'column',
        transition: 'background 0.4s ease, box-shadow 0.4s ease',
      },
    },
      // Dynamic Island
      React.createElement('div', {
        style: {
          position: 'absolute', top: 13, left: '50%',
          transform: 'translateX(-50%)',
          width: 122, height: 35,
          background: '#000', borderRadius: 20, zIndex: 100,
        },
      }),

      // Screen content
      React.createElement('div', { style: { flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' } },
        React.createElement(screens[activeTab]),
      ),

      // Bottom Nav
      React.createElement('div', {
        style: {
          height: 82, background: t.navBg,
          borderTop: `1px solid ${t.navBorder}`,
          display: 'flex', alignItems: 'center', justifyContent: 'space-around',
          paddingBottom: 10, paddingTop: 4,
          boxShadow: `0 -6px 24px ${t.scrim}`,
          position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 50,
          transition: 'background 0.3s ease',
        },
      },
        tabs.map(tab =>
          React.createElement('div', {
            key: tab.id,
            onClick: () => setActiveTab(tab.id),
            style: {
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
              padding: '7px 14px', borderRadius: 14, cursor: 'pointer',
              background: activeTab === tab.id ? t.primaryLight : 'transparent',
              transition: 'all 0.2s ease',
              transform: activeTab === tab.id ? 'scale(1.04)' : 'scale(1)',
            },
          },
            React.createElement(tab.icon, {
              size: 21,
              color: activeTab === tab.id ? t.primary : t.textSecondary,
            }),
            React.createElement('span', {
              style: {
                fontSize: 10,
                fontWeight: activeTab === tab.id ? 800 : 500,
                color: activeTab === tab.id ? t.primary : t.textSecondary,
                fontFamily: 'Plus Jakarta Sans, sans-serif',
                transition: 'color 0.2s ease',
              },
            }, tab.label),
          ),
        ),
      ),
    ),
  );
}
