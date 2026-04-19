const { useState, useEffect, useRef, useCallback } = React;

function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [darkMode, setDarkMode] = useState(false);

  const themes = {
    light: {
      bg: '#FAFAFA',
      surface: '#FFFFFF',
      surfaceAlt: '#F4F4F5',
      primary: '#18181B',
      secondary: '#3F3F46',
      tertiary: '#71717A',
      cta: '#EC4899',
      ctaLight: 'rgba(236,72,153,0.1)',
      ctaDark: '#DB2777',
      border: '#E4E4E7',
      cardShadow: '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
      elevatedShadow: '0 4px 16px rgba(0,0,0,0.08)',
      overlay: 'rgba(24,24,27,0.5)',
    },
    dark: {
      bg: '#09090B',
      surface: '#18181B',
      surfaceAlt: '#27272A',
      primary: '#FAFAFA',
      secondary: '#D4D4D8',
      tertiary: '#A1A1AA',
      cta: '#EC4899',
      ctaLight: 'rgba(236,72,153,0.15)',
      ctaDark: '#F472B6',
      border: '#27272A',
      cardShadow: '0 1px 3px rgba(0,0,0,0.3)',
      elevatedShadow: '0 4px 16px rgba(0,0,0,0.4)',
      overlay: 'rgba(0,0,0,0.7)',
    }
  };

  const t = darkMode ? themes.dark : themes.light;
  const font = "-apple-system, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif";

  const styleTag = React.createElement('style', null, `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(8px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(24px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.05); }
    }
    @keyframes shimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }
    @keyframes dreamFloat {
      0%, 100% { transform: translateY(0) rotate(0deg); }
      33% { transform: translateY(-6px) rotate(1deg); }
      66% { transform: translateY(3px) rotate(-1deg); }
    }
    @keyframes gradientShift {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
  `);

  // Icon helper
  const Icon = ({ name, size = 24, color, style: s }) => {
    const IconComp = window.lucide && window.lucide[name];
    if (!IconComp) return null;
    return React.createElement(IconComp, { size, color: color || t.primary, style: s });
  };

  // ─── HOME SCREEN ───
  function HomeScreen() {
    const [likedSeeds, setLikedSeeds] = useState({});

    const activeDreams = [
      { id: 1, title: 'Celestial Tidepool', seeds: 47, contributors: 12, gradient: 'linear-gradient(135deg, #6366F1, #EC4899, #F59E0B)', phase: 'Evolving' },
      { id: 2, title: 'Neon Mycelia', seeds: 83, contributors: 24, gradient: 'linear-gradient(135deg, #10B981, #3B82F6, #8B5CF6)', phase: 'Blooming' },
      { id: 3, title: 'Echo Chamber', seeds: 31, contributors: 8, gradient: 'linear-gradient(135deg, #F43F5E, #FB923C, #FBBF24)', phase: 'Seeding' },
    ];

    const recentSeeds = [
      { id: 1, user: 'AuroraMind', type: 'text', preview: '"When starlight bends through memory glass..."', time: '4m ago', reactions: 12 },
      { id: 2, user: 'VoxelDreamer', type: 'image', preview: 'Abstract fractal bloom', time: '11m ago', reactions: 28 },
      { id: 3, user: 'SynthWave_9', type: 'audio', preview: 'Ambient drone loop · 0:14', time: '23m ago', reactions: 7 },
    ];

    return React.createElement('div', { style: { animation: 'fadeIn 0.4s ease' } },
      // Header
      React.createElement('div', { style: { padding: '16px 20px 8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
        React.createElement('div', null,
          React.createElement('h1', { style: { fontFamily: font, fontSize: 28, fontWeight: 800, color: t.primary, letterSpacing: -0.5, margin: 0 } }, 'DreamWeave'),
          React.createElement('p', { style: { fontFamily: font, fontSize: 13, color: t.tertiary, margin: '2px 0 0', fontWeight: 400 } }, 'Unfold collaborative AI dreams')
        ),
        React.createElement('div', { style: { display: 'flex', gap: 12, alignItems: 'center' } },
          React.createElement('button', {
            onClick: () => setDarkMode(!darkMode),
            style: { background: 'none', border: 'none', cursor: 'pointer', padding: 8, borderRadius: 12, transition: 'background 0.2s' }
          }, React.createElement(Icon, { name: darkMode ? 'Sun' : 'Moon', size: 20, color: t.tertiary })),
          React.createElement('button', {
            style: { background: t.cta, border: 'none', borderRadius: 14, width: 40, height: 40, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(236,72,153,0.3)', transition: 'transform 0.15s' },
            onMouseDown: (e) => e.currentTarget.style.transform = 'scale(0.92)',
            onMouseUp: (e) => e.currentTarget.style.transform = 'scale(1)',
            onMouseLeave: (e) => e.currentTarget.style.transform = 'scale(1)',
          }, React.createElement(Icon, { name: 'Plus', size: 20, color: '#FFFFFF' }))
        )
      ),

      // Daily Challenge Banner
      React.createElement('div', {
        onClick: () => setActiveScreen('challenges'),
        style: {
          margin: '12px 20px 0', padding: '16px 18px', borderRadius: 16,
          background: 'linear-gradient(135deg, #18181B 0%, #3F3F46 100%)',
          cursor: 'pointer', position: 'relative', overflow: 'hidden', transition: 'transform 0.2s',
        },
        onMouseDown: (e) => e.currentTarget.style.transform = 'scale(0.98)',
        onMouseUp: (e) => e.currentTarget.style.transform = 'scale(1)',
        onMouseLeave: (e) => e.currentTarget.style.transform = 'scale(1)',
      },
        React.createElement('div', { style: { position: 'absolute', top: -20, right: -20, width: 80, height: 80, borderRadius: '50%', background: 'rgba(236,72,153,0.2)', filter: 'blur(20px)' } }),
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 } },
          React.createElement(Icon, { name: 'Zap', size: 14, color: '#EC4899' }),
          React.createElement('span', { style: { fontFamily: font, fontSize: 11, fontWeight: 600, color: '#EC4899', textTransform: 'uppercase', letterSpacing: 1 } }, 'Prompt Pulsar · Today')
        ),
        React.createElement('p', { style: { fontFamily: font, fontSize: 17, fontWeight: 600, color: '#FAFAFA', margin: 0, lineHeight: 1.3 } }, '"Architecture of forgotten lullabies"'),
        React.createElement('p', { style: { fontFamily: font, fontSize: 13, color: '#A1A1AA', margin: '6px 0 0', fontWeight: 400 } }, '184 seeds planted · 6h remaining')
      ),

      // Active DreamWeaves
      React.createElement('div', { style: { padding: '20px 20px 8px' } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 } },
          React.createElement('h2', { style: { fontFamily: font, fontSize: 20, fontWeight: 700, color: t.primary, margin: 0, letterSpacing: -0.3 } }, 'Active Weaves'),
          React.createElement('button', {
            onClick: () => setActiveScreen('explore'),
            style: { background: 'none', border: 'none', fontFamily: font, fontSize: 13, color: t.cta, fontWeight: 600, cursor: 'pointer', padding: '4px 0' }
          }, 'See all')
        )
      ),
      React.createElement('div', { style: { display: 'flex', gap: 12, overflowX: 'auto', paddingLeft: 20, paddingRight: 20, paddingBottom: 4, scrollbarWidth: 'none' } },
        ...activeDreams.map((dream, i) =>
          React.createElement('div', {
            key: dream.id,
            onClick: () => setActiveScreen('explore'),
            style: {
              minWidth: 220, borderRadius: 20, overflow: 'hidden', cursor: 'pointer',
              background: t.surface, boxShadow: t.cardShadow, transition: 'transform 0.2s, box-shadow 0.2s',
              animation: `slideUp 0.5s ease ${i * 0.1}s both`,
              flexShrink: 0,
            },
            onMouseDown: (e) => { e.currentTarget.style.transform = 'scale(0.97)'; },
            onMouseUp: (e) => { e.currentTarget.style.transform = 'scale(1)'; },
            onMouseLeave: (e) => { e.currentTarget.style.transform = 'scale(1)'; },
          },
            React.createElement('div', { style: { height: 120, background: dream.gradient, position: 'relative', animation: 'dreamFloat 8s ease-in-out infinite', animationDelay: `${i * 2}s` } },
              React.createElement('div', { style: { position: 'absolute', bottom: 10, left: 12, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)', borderRadius: 8, padding: '3px 8px' } },
                React.createElement('span', { style: { fontFamily: font, fontSize: 11, color: '#fff', fontWeight: 500 } }, dream.phase)
              )
            ),
            React.createElement('div', { style: { padding: '12px 14px 14px' } },
              React.createElement('h3', { style: { fontFamily: font, fontSize: 15, fontWeight: 700, color: t.primary, margin: '0 0 6px' } }, dream.title),
              React.createElement('div', { style: { display: 'flex', gap: 12 } },
                React.createElement('span', { style: { fontFamily: font, fontSize: 12, color: t.tertiary } }, `${dream.seeds} seeds`),
                React.createElement('span', { style: { fontFamily: font, fontSize: 12, color: t.tertiary } }, `${dream.contributors} weavers`)
              )
            )
          )
        )
      ),

      // Recent Seeds Feed
      React.createElement('div', { style: { padding: '20px 20px 8px' } },
        React.createElement('h2', { style: { fontFamily: font, fontSize: 20, fontWeight: 700, color: t.primary, margin: '0 0 14px', letterSpacing: -0.3 } }, 'Seed Stream')
      ),
      ...recentSeeds.map((seed, i) =>
        React.createElement('div', {
          key: seed.id,
          style: {
            margin: '0 20px 10px', padding: '14px 16px', borderRadius: 16,
            background: t.surface, boxShadow: t.cardShadow,
            animation: `fadeIn 0.4s ease ${0.2 + i * 0.1}s both`,
            transition: 'background 0.2s',
          }
        },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 } },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10 } },
              React.createElement('div', { style: { width: 32, height: 32, borderRadius: 10, background: `linear-gradient(135deg, ${t.cta}, #6366F1)`, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
                React.createElement('span', { style: { fontFamily: font, fontSize: 13, fontWeight: 700, color: '#fff' } }, seed.user[0])
              ),
              React.createElement('div', null,
                React.createElement('span', { style: { fontFamily: font, fontSize: 15, fontWeight: 600, color: t.primary } }, seed.user),
                React.createElement('span', { style: { fontFamily: font, fontSize: 12, color: t.tertiary, marginLeft: 8 } }, seed.time)
              )
            ),
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4, padding: '4px 8px', borderRadius: 8, background: t.surfaceAlt } },
              React.createElement(Icon, { name: seed.type === 'text' ? 'Type' : seed.type === 'image' ? 'Image' : 'Music', size: 12, color: t.tertiary }),
              React.createElement('span', { style: { fontFamily: font, fontSize: 11, color: t.tertiary, fontWeight: 500 } }, seed.type)
            )
          ),
          React.createElement('p', { style: { fontFamily: font, fontSize: 15, color: t.secondary, margin: '0 0 10px', lineHeight: 1.4, fontStyle: seed.type === 'text' ? 'italic' : 'normal' } }, seed.preview),
          React.createElement('div', { style: { display: 'flex', gap: 16 } },
            React.createElement('button', {
              onClick: () => setLikedSeeds(prev => ({ ...prev, [seed.id]: !prev[seed.id] })),
              style: { background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer', padding: '4px 0' }
            },
              React.createElement(Icon, { name: 'Heart', size: 16, color: likedSeeds[seed.id] ? t.cta : t.tertiary }),
              React.createElement('span', { style: { fontFamily: font, fontSize: 13, color: likedSeeds[seed.id] ? t.cta : t.tertiary } }, seed.reactions + (likedSeeds[seed.id] ? 1 : 0))
            ),
            React.createElement('button', { style: { background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer', padding: '4px 0' } },
              React.createElement(Icon, { name: 'Sparkles', size: 16, color: t.tertiary }),
              React.createElement('span', { style: { fontFamily: font, fontSize: 13, color: t.tertiary } }, 'Resonate')
            )
          )
        )
      ),
      React.createElement('div', { style: { height: 100 } })
    );
  }

  // ─── EXPLORE SCREEN ───
  function ExploreScreen() {
    const [selectedFilter, setSelectedFilter] = useState('trending');
    const filters = ['trending', 'new', 'evolving', 'near you'];

    const weaves = [
      { id: 1, title: 'Celestial Tidepool', desc: 'An oceanic dreamscape where starlight dissolves into bioluminescent currents. Currently merging 47 seeds from 12 weavers.', gradient: 'linear-gradient(135deg, #6366F1, #EC4899, #F59E0B)', seeds: 47, weavers: 12, snapshots: 8, phase: 'Evolving', hot: true },
      { id: 2, title: 'Neon Mycelia', desc: 'Underground fungal networks reimagined as glowing digital pathways. The AI is discovering recursive patterns.', gradient: 'linear-gradient(135deg, #10B981, #3B82F6, #8B5CF6)', seeds: 83, weavers: 24, snapshots: 15, phase: 'Blooming', hot: true },
      { id: 3, title: 'Echo Chamber', desc: 'Sound becomes architecture. Audio seeds are being transformed into spatial structures that shift with each new contribution.', gradient: 'linear-gradient(135deg, #F43F5E, #FB923C, #FBBF24)', seeds: 31, weavers: 8, snapshots: 3, phase: 'Seeding', hot: false },
      { id: 4, title: 'Forgotten Cartography', desc: 'Maps of places that never existed. Text and image seeds merge into detailed topographies of imaginary lands.', gradient: 'linear-gradient(135deg, #8B5CF6, #06B6D4, #10B981)', seeds: 56, weavers: 18, snapshots: 11, phase: 'Evolving', hot: false },
      { id: 5, title: 'Syntax Garden', desc: 'Code poetry meets organic growth. Snippets of prose evolve into living algorithmic flora.', gradient: 'linear-gradient(135deg, #F59E0B, #EF4444, #EC4899)', seeds: 22, weavers: 6, snapshots: 2, phase: 'Seeding', hot: false },
    ];

    return React.createElement('div', { style: { animation: 'fadeIn 0.4s ease' } },
      React.createElement('div', { style: { padding: '16px 20px 0' } },
        React.createElement('h1', { style: { fontFamily: font, fontSize: 34, fontWeight: 800, color: t.primary, margin: '0 0 16px', letterSpacing: -0.5 } }, 'Explore'),
        // Search
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderRadius: 14, background: t.surfaceAlt, marginBottom: 16 } },
          React.createElement(Icon, { name: 'Search', size: 18, color: t.tertiary }),
          React.createElement('span', { style: { fontFamily: font, fontSize: 15, color: t.tertiary } }, 'Search dreamweaves...')
        ),
        // Filter chips
        React.createElement('div', { style: { display: 'flex', gap: 8, marginBottom: 20, overflowX: 'auto', scrollbarWidth: 'none' } },
          ...filters.map(f =>
            React.createElement('button', {
              key: f,
              onClick: () => setSelectedFilter(f),
              style: {
                padding: '8px 16px', borderRadius: 20, border: 'none', cursor: 'pointer',
                background: selectedFilter === f ? t.primary : t.surfaceAlt,
                color: selectedFilter === f ? (darkMode ? '#09090B' : '#FAFAFA') : t.secondary,
                fontFamily: font, fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap',
                transition: 'all 0.2s',
              }
            }, f.charAt(0).toUpperCase() + f.slice(1))
          )
        )
      ),
      // Weave cards
      ...weaves.map((w, i) =>
        React.createElement('div', {
          key: w.id,
          style: {
            margin: '0 20px 14px', borderRadius: 20, overflow: 'hidden',
            background: t.surface, boxShadow: t.cardShadow,
            animation: `slideUp 0.5s ease ${i * 0.08}s both`,
            cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s',
          },
          onMouseDown: (e) => e.currentTarget.style.transform = 'scale(0.98)',
          onMouseUp: (e) => e.currentTarget.style.transform = 'scale(1)',
          onMouseLeave: (e) => e.currentTarget.style.transform = 'scale(1)',
        },
          React.createElement('div', { style: { height: 100, background: w.gradient, position: 'relative' } },
            w.hot && React.createElement('div', { style: { position: 'absolute', top: 10, right: 10, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)', borderRadius: 8, padding: '4px 10px', display: 'flex', alignItems: 'center', gap: 4 } },
              React.createElement(Icon, { name: 'Flame', size: 12, color: '#FBBF24' }),
              React.createElement('span', { style: { fontFamily: font, fontSize: 11, color: '#fff', fontWeight: 600 } }, 'Hot')
            ),
            React.createElement('div', { style: { position: 'absolute', bottom: 10, left: 12, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)', borderRadius: 8, padding: '3px 10px' } },
              React.createElement('span', { style: { fontFamily: font, fontSize: 11, color: '#fff', fontWeight: 500 } }, w.phase)
            )
          ),
          React.createElement('div', { style: { padding: '14px 16px 16px' } },
            React.createElement('h3', { style: { fontFamily: font, fontSize: 17, fontWeight: 700, color: t.primary, margin: '0 0 6px' } }, w.title),
            React.createElement('p', { style: { fontFamily: font, fontSize: 13, color: t.tertiary, margin: '0 0 12px', lineHeight: 1.4 } }, w.desc),
            React.createElement('div', { style: { display: 'flex', gap: 16 } },
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
                React.createElement(Icon, { name: 'Sprout', size: 14, color: t.tertiary }),
                React.createElement('span', { style: { fontFamily: font, fontSize: 12, color: t.tertiary } }, `${w.seeds} seeds`)
              ),
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
                React.createElement(Icon, { name: 'Users', size: 14, color: t.tertiary }),
                React.createElement('span', { style: { fontFamily: font, fontSize: 12, color: t.tertiary } }, `${w.weavers} weavers`)
              ),
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
                React.createElement(Icon, { name: 'Camera', size: 14, color: t.tertiary }),
                React.createElement('span', { style: { fontFamily: font, fontSize: 12, color: t.tertiary } }, `${w.snapshots} snaps`)
              )
            )
          )
        )
      ),
      React.createElement('div', { style: { height: 100 } })
    );
  }

  // ─── GALLERY SCREEN ───
  function GalleryScreen() {
    const [selectedTab, setSelectedTab] = useState('my');
    const tabs = [{ id: 'my', label: 'My Snapshots' }, { id: 'community', label: 'Community' }];

    const snapshots = [
      { id: 1, title: 'Tidepool at Dusk', weave: 'Celestial Tidepool', gradient: 'linear-gradient(135deg, #312E81, #EC4899, #1E3A5F)', likes: 42, saved: true },
      { id: 2, title: 'Spore Network v3', weave: 'Neon Mycelia', gradient: 'linear-gradient(135deg, #064E3B, #3B82F6, #7C3AED)', likes: 67, saved: true },
      { id: 3, title: 'Resonant Hall', weave: 'Echo Chamber', gradient: 'linear-gradient(135deg, #7F1D1D, #EA580C, #CA8A04)', likes: 19, saved: false },
      { id: 4, title: 'Bloom State 7', weave: 'Neon Mycelia', gradient: 'linear-gradient(135deg, #0F766E, #2563EB, #9333EA)', likes: 88, saved: true },
      { id: 5, title: 'Golden Drift', weave: 'Celestial Tidepool', gradient: 'linear-gradient(135deg, #92400E, #EC4899, #6366F1)', likes: 34, saved: false },
      { id: 6, title: 'Terra Incognita', weave: 'Forgotten Cartography', gradient: 'linear-gradient(135deg, #6D28D9, #0891B2, #059669)', likes: 51, saved: true },
    ];

    return React.createElement('div', { style: { animation: 'fadeIn 0.4s ease' } },
      React.createElement('div', { style: { padding: '16px 20px 0' } },
        React.createElement('h1', { style: { fontFamily: font, fontSize: 34, fontWeight: 800, color: t.primary, margin: '0 0 4px', letterSpacing: -0.5 } }, 'Gallery'),
        React.createElement('p', { style: { fontFamily: font, fontSize: 15, color: t.tertiary, margin: '0 0 16px' } }, 'Your dream-snapshot collection'),
        // Tabs
        React.createElement('div', { style: { display: 'flex', gap: 0, background: t.surfaceAlt, borderRadius: 12, padding: 3, marginBottom: 20 } },
          ...tabs.map(tab =>
            React.createElement('button', {
              key: tab.id,
              onClick: () => setSelectedTab(tab.id),
              style: {
                flex: 1, padding: '10px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
                background: selectedTab === tab.id ? t.surface : 'transparent',
                color: selectedTab === tab.id ? t.primary : t.tertiary,
                fontFamily: font, fontSize: 13, fontWeight: 600,
                boxShadow: selectedTab === tab.id ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
                transition: 'all 0.2s',
              }
            }, tab.label)
          )
        )
      ),
      // Masonry-style grid
      React.createElement('div', { style: { padding: '0 20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 } },
        ...snapshots.map((snap, i) =>
          React.createElement('div', {
            key: snap.id,
            style: {
              borderRadius: 16, overflow: 'hidden', background: t.surface,
              boxShadow: t.cardShadow, cursor: 'pointer',
              animation: `fadeIn 0.4s ease ${i * 0.08}s both`,
              transition: 'transform 0.2s',
            },
            onMouseDown: (e) => e.currentTarget.style.transform = 'scale(0.96)',
            onMouseUp: (e) => e.currentTarget.style.transform = 'scale(1)',
            onMouseLeave: (e) => e.currentTarget.style.transform = 'scale(1)',
          },
            React.createElement('div', { style: { height: i % 3 === 0 ? 140 : 110, background: snap.gradient, position: 'relative' } },
              React.createElement('button', {
                style: {
                  position: 'absolute', top: 8, right: 8, width: 30, height: 30,
                  borderRadius: 8, border: 'none', background: 'rgba(0,0,0,0.3)',
                  backdropFilter: 'blur(8px)', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }
              }, React.createElement(Icon, { name: snap.saved ? 'Bookmark' : 'BookmarkPlus', size: 14, color: '#fff' }))
            ),
            React.createElement('div', { style: { padding: '10px 12px 12px' } },
              React.createElement('h4', { style: { fontFamily: font, fontSize: 14, fontWeight: 700, color: t.primary, margin: '0 0 2px' } }, snap.title),
              React.createElement('p', { style: { fontFamily: font, fontSize: 11, color: t.tertiary, margin: '0 0 8px' } }, snap.weave),
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
                React.createElement(Icon, { name: 'Heart', size: 12, color: t.cta }),
                React.createElement('span', { style: { fontFamily: font, fontSize: 12, color: t.tertiary } }, snap.likes)
              )
            )
          )
        )
      ),
      React.createElement('div', { style: { height: 100 } })
    );
  }

  // ─── CHALLENGES SCREEN ───
  function ChallengesScreen() {
    const [joinedIds, setJoinedIds] = useState({});

    const challenges = [
      { id: 1, title: 'Architecture of Forgotten Lullabies', type: 'Daily', timeLeft: '6h remaining', participants: 184, style: 'Ethereal Fusion', gradient: 'linear-gradient(135deg, #18181B, #3F3F46)', active: true },
      { id: 2, title: 'Recursive Horizons', type: 'Weekly', timeLeft: '3d remaining', participants: 412, style: 'Fractal Bloom', gradient: 'linear-gradient(135deg, #6366F1, #EC4899)', active: true },
      { id: 3, title: 'Chromatic Whisper', type: 'Daily', timeLeft: 'Ended', participants: 267, style: 'Soft Gradient', gradient: 'linear-gradient(135deg, #F59E0B, #EF4444)', active: false },
      { id: 4, title: 'Digital Fossils', type: 'Weekly', timeLeft: 'Ended', participants: 389, style: 'Ancient Tech', gradient: 'linear-gradient(135deg, #059669, #0891B2)', active: false },
    ];

    return React.createElement('div', { style: { animation: 'fadeIn 0.4s ease' } },
      React.createElement('div', { style: { padding: '16px 20px 0' } },
        React.createElement('h1', { style: { fontFamily: font, fontSize: 34, fontWeight: 800, color: t.primary, margin: '0 0 4px', letterSpacing: -0.5 } }, 'Challenges'),
        React.createElement('p', { style: { fontFamily: font, fontSize: 15, color: t.tertiary, margin: '0 0 20px' } }, 'Prompt Pulsar creative themes'),
      ),

      // Stats bar
      React.createElement('div', {
        style: { margin: '0 20px 20px', padding: '14px 18px', borderRadius: 16, background: t.ctaLight, display: 'flex', justifyContent: 'space-around' }
      },
        ...[
          { label: 'Seeds Planted', value: '23' },
          { label: 'Challenges Won', value: '3' },
          { label: 'Streak', value: '7d' },
        ].map(stat =>
          React.createElement('div', { key: stat.label, style: { textAlign: 'center' } },
            React.createElement('div', { style: { fontFamily: font, fontSize: 22, fontWeight: 800, color: t.cta } }, stat.value),
            React.createElement('div', { style: { fontFamily: font, fontSize: 11, color: t.tertiary, marginTop: 2 } }, stat.label)
          )
        )
      ),

      // Challenge cards
      ...challenges.map((c, i) =>
        React.createElement('div', {
          key: c.id,
          style: {
            margin: '0 20px 14px', borderRadius: 20, overflow: 'hidden',
            background: t.surface, boxShadow: t.cardShadow,
            animation: `slideUp 0.5s ease ${i * 0.1}s both`,
            opacity: c.active ? 1 : 0.6,
          }
        },
          React.createElement('div', { style: { height: 80, background: c.gradient, padding: '14px 16px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' } },
            React.createElement('div', { style: { display: 'flex', gap: 8, alignItems: 'center' } },
              React.createElement('span', { style: { fontFamily: font, fontSize: 11, fontWeight: 600, color: '#EC4899', background: 'rgba(236,72,153,0.2)', padding: '2px 8px', borderRadius: 6 } }, c.type),
              React.createElement('span', { style: { fontFamily: font, fontSize: 11, color: 'rgba(255,255,255,0.7)' } }, c.timeLeft),
            )
          ),
          React.createElement('div', { style: { padding: '14px 16px 16px' } },
            React.createElement('h3', { style: { fontFamily: font, fontSize: 17, fontWeight: 700, color: t.primary, margin: '0 0 4px' } }, `"${c.title}"`),
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 } },
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6 } },
                React.createElement(Icon, { name: 'Users', size: 14, color: t.tertiary }),
                React.createElement('span', { style: { fontFamily: font, fontSize: 13, color: t.tertiary } }, `${c.participants} weavers`),
                React.createElement('span', { style: { fontFamily: font, fontSize: 12, color: t.tertiary, marginLeft: 4 } }, `· ${c.style}`)
              ),
              c.active && React.createElement('button', {
                onClick: () => setJoinedIds(prev => ({ ...prev, [c.id]: !prev[c.id] })),
                style: {
                  padding: '8px 18px', borderRadius: 12, border: 'none', cursor: 'pointer',
                  background: joinedIds[c.id] ? t.surfaceAlt : t.cta,
                  color: joinedIds[c.id] ? t.secondary : '#fff',
                  fontFamily: font, fontSize: 13, fontWeight: 600,
                  transition: 'all 0.2s', minHeight: 44,
                },
                onMouseDown: (e) => e.currentTarget.style.transform = 'scale(0.95)',
                onMouseUp: (e) => e.currentTarget.style.transform = 'scale(1)',
                onMouseLeave: (e) => e.currentTarget.style.transform = 'scale(1)',
              }, joinedIds[c.id] ? 'Joined' : 'Plant Seed')
            )
          )
        )
      ),
      React.createElement('div', { style: { height: 100 } })
    );
  }

  // ─── PROFILE SCREEN ───
  function ProfileScreen() {
    const stats = [
      { label: 'Seeds', value: '142', icon: 'Sprout' },
      { label: 'Weaves', value: '8', icon: 'Layers' },
      { label: 'Snapshots', value: '23', icon: 'Camera' },
      { label: 'Resonance', value: '1.2k', icon: 'Heart' },
    ];

    const achievements = [
      { title: 'First Seed', desc: 'Plant your first creative seed', done: true },
      { title: 'Dream Architect', desc: 'Contribute to 5 weaves', done: true },
      { title: 'Pulse Rider', desc: '7-day challenge streak', done: true },
      { title: 'Weave Master', desc: 'Start 10 original weaves', done: false },
    ];

    return React.createElement('div', { style: { animation: 'fadeIn 0.4s ease' } },
      React.createElement('div', { style: { padding: '16px 20px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
        React.createElement('h1', { style: { fontFamily: font, fontSize: 34, fontWeight: 800, color: t.primary, margin: 0, letterSpacing: -0.5 } }, 'Profile'),
        React.createElement('button', {
          onClick: () => setDarkMode(!darkMode),
          style: { background: t.surfaceAlt, border: 'none', borderRadius: 12, padding: '8px 12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }
        },
          React.createElement(Icon, { name: darkMode ? 'Sun' : 'Moon', size: 16, color: t.tertiary }),
          React.createElement('span', { style: { fontFamily: font, fontSize: 13, color: t.tertiary, fontWeight: 500 } }, darkMode ? 'Light' : 'Dark')
        )
      ),

      // Profile card
      React.createElement('div', { style: { margin: '20px 20px 0', padding: '24px 20px', borderRadius: 20, background: t.surface, boxShadow: t.cardShadow, textAlign: 'center' } },
        React.createElement('div', {
          style: {
            width: 72, height: 72, borderRadius: 20, margin: '0 auto 12px',
            background: 'linear-gradient(135deg, #EC4899, #6366F1, #10B981)',
            backgroundSize: '200% 200%', animation: 'gradientShift 4s ease infinite',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }
        },
          React.createElement('span', { style: { fontFamily: font, fontSize: 28, fontWeight: 800, color: '#fff' } }, 'A')
        ),
        React.createElement('h2', { style: { fontFamily: font, fontSize: 22, fontWeight: 700, color: t.primary, margin: '0 0 4px' } }, 'AuroraMind'),
        React.createElement('p', { style: { fontFamily: font, fontSize: 13, color: t.tertiary, margin: '0 0 20px' } }, 'Weaving dreams since March 2026'),
        // Stats grid
        React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 } },
          ...stats.map(s =>
            React.createElement('div', { key: s.label, style: { padding: '12px 4px', borderRadius: 14, background: t.surfaceAlt } },
              React.createElement(Icon, { name: s.icon, size: 18, color: t.cta }),
              React.createElement('div', { style: { fontFamily: font, fontSize: 18, fontWeight: 800, color: t.primary, margin: '4px 0 2px' } }, s.value),
              React.createElement('div', { style: { fontFamily: font, fontSize: 11, color: t.tertiary } }, s.label)
            )
          )
        )
      ),

      // Achievements
      React.createElement('div', { style: { padding: '24px 20px 8px' } },
        React.createElement('h3', { style: { fontFamily: font, fontSize: 20, fontWeight: 700, color: t.primary, margin: '0 0 14px', letterSpacing: -0.3 } }, 'Achievements')
      ),
      ...achievements.map((a, i) =>
        React.createElement('div', {
          key: i,
          style: {
            margin: '0 20px 10px', padding: '14px 16px', borderRadius: 14,
            background: t.surface, boxShadow: t.cardShadow,
            display: 'flex', alignItems: 'center', gap: 14,
            animation: `fadeIn 0.4s ease ${i * 0.08}s both`,
            opacity: a.done ? 1 : 0.5,
          }
        },
          React.createElement('div', {
            style: {
              width: 40, height: 40, borderRadius: 12, flexShrink: 0,
              background: a.done ? t.ctaLight : t.surfaceAlt,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }
          },
            React.createElement(Icon, { name: a.done ? 'Award' : 'Lock', size: 20, color: a.done ? t.cta : t.tertiary })
          ),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', { style: { fontFamily: font, fontSize: 15, fontWeight: 600, color: t.primary } }, a.title),
            React.createElement('div', { style: { fontFamily: font, fontSize: 13, color: t.tertiary } }, a.desc)
          ),
          a.done && React.createElement(Icon, { name: 'Check', size: 18, color: '#10B981' })
        )
      ),

      // Settings links
      React.createElement('div', { style: { padding: '16px 20px 0' } },
        React.createElement('h3', { style: { fontFamily: font, fontSize: 20, fontWeight: 700, color: t.primary, margin: '0 0 14px', letterSpacing: -0.3 } }, 'Settings')
      ),
      ...['Notifications', 'Privacy', 'AI Preferences', 'Help & Support'].map((item, i) =>
        React.createElement('div', {
          key: i,
          style: {
            margin: '0 20px 8px', padding: '14px 16px', borderRadius: 14,
            background: t.surface, boxShadow: t.cardShadow,
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            cursor: 'pointer', transition: 'background 0.2s',
          }
        },
          React.createElement('span', { style: { fontFamily: font, fontSize: 15, color: t.primary, fontWeight: 500 } }, item),
          React.createElement(Icon, { name: 'ChevronRight', size: 18, color: t.tertiary })
        )
      ),
      React.createElement('div', { style: { height: 100 } })
    );
  }

  // ─── BOTTOM TAB BAR ───
  const tabs = [
    { id: 'home', label: 'Home', icon: 'Home' },
    { id: 'explore', label: 'Explore', icon: 'Compass' },
    { id: 'gallery', label: 'Gallery', icon: 'Image' },
    { id: 'challenges', label: 'Pulsar', icon: 'Zap' },
    { id: 'profile', label: 'Profile', icon: 'User' },
  ];

  const screens = {
    home: HomeScreen,
    explore: ExploreScreen,
    gallery: GalleryScreen,
    challenges: ChallengesScreen,
    profile: ProfileScreen,
  };

  const ActiveScreen = screens[activeScreen] || HomeScreen;

  return React.createElement('div', { style: { minHeight: '100vh', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px 0' } },
    styleTag,
    React.createElement('div', {
      style: {
        width: 375, height: 812, borderRadius: 40, overflow: 'hidden',
        background: t.bg, position: 'relative',
        boxShadow: '0 25px 60px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.08)',
        display: 'flex', flexDirection: 'column',
      }
    },
      // Scrollable content
      React.createElement('div', {
        style: { flex: 1, overflowY: 'auto', overflowX: 'hidden', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none' }
      },
        React.createElement(ActiveScreen)
      ),
      // Bottom tab bar
      React.createElement('div', {
        style: {
          position: 'absolute', bottom: 0, left: 0, right: 0,
          background: darkMode ? 'rgba(9,9,11,0.92)' : 'rgba(255,255,255,0.92)',
          backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
          borderTop: `0.5px solid ${t.border}`,
          padding: '6px 0 28px', display: 'flex', justifyContent: 'space-around',
        }
      },
        ...tabs.map(tab =>
          React.createElement('button', {
            key: tab.id,
            onClick: () => setActiveScreen(tab.id),
            style: {
              background: 'none', border: 'none', cursor: 'pointer',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
              padding: '6px 12px', minWidth: 44, minHeight: 44,
              transition: 'transform 0.15s',
            },
            onMouseDown: (e) => e.currentTarget.style.transform = 'scale(0.88)',
            onMouseUp: (e) => e.currentTarget.style.transform = 'scale(1)',
            onMouseLeave: (e) => e.currentTarget.style.transform = 'scale(1)',
          },
            React.createElement(Icon, {
              name: tab.icon, size: 22,
              color: activeScreen === tab.id ? t.cta : t.tertiary,
            }),
            React.createElement('span', {
              style: {
                fontFamily: font, fontSize: 10, fontWeight: activeScreen === tab.id ? 600 : 400,
                color: activeScreen === tab.id ? t.cta : t.tertiary,
              }
            }, tab.label)
          )
        )
      )
    )
  );
}
