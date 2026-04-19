const { useState, useEffect, useRef, useCallback } = React;

function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [isDark, setIsDark] = useState(true);
  const [playing, setPlaying] = useState({});
  const [volumes, setVolumes] = useState({});
  const [savedWeaves, setSavedWeaves] = useState([
    { id: 1, name: 'Morning Focus', sounds: ['Rain', 'Piano'], mood: 'Productive', notes: 'Light rain with soft piano for deep work sessions.' },
    { id: 2, name: 'Evening Wind Down', sounds: ['Ocean', 'Crickets', 'Wind Chimes'], mood: 'Relaxed', notes: 'Coastal evening atmosphere for unwinding.' },
  ]);
  const [activeChallenge, setActiveChallenge] = useState(null);
  const [likedWeaves, setLikedWeaves] = useState({});
  const [showPlayer, setShowPlayer] = useState(false);
  const [currentWeave, setCurrentWeave] = useState(null);
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    setAnimateIn(false);
    const t = setTimeout(() => setAnimateIn(true), 50);
    return () => clearTimeout(t);
  }, [activeScreen]);

  const themes = {
    dark: {
      primary: '#1E1B4B',
      secondary: '#4338CA',
      cta: '#22C55E',
      bg: '#0F0F23',
      surface: '#1a1a3e',
      surfaceAlt: '#232350',
      card: '#1E1B4B',
      text: '#F1F0FF',
      textSecondary: '#A5A3C9',
      textMuted: '#6B6999',
      border: '#2D2A6E',
      overlay: 'rgba(15,15,35,0.85)',
      tabBg: '#13132e',
      inputBg: '#1a1a3e',
    },
    light: {
      primary: '#4338CA',
      secondary: '#1E1B4B',
      cta: '#22C55E',
      bg: '#F5F3FF',
      surface: '#FFFFFF',
      surfaceAlt: '#EDE9FE',
      card: '#FFFFFF',
      text: '#1E1B4B',
      textSecondary: '#4338CA',
      textMuted: '#7C7AAA',
      border: '#DDD6FE',
      overlay: 'rgba(245,243,255,0.9)',
      tabBg: '#FFFFFF',
      inputBg: '#EDE9FE',
    },
  };

  const t = isDark ? themes.dark : themes.light;
  const font = "-apple-system, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif";

  const soundLibrary = [
    { id: 's1', name: 'Rain', category: 'Nature', icon: 'CloudRain' },
    { id: 's2', name: 'Ocean Waves', category: 'Nature', icon: 'Waves' },
    { id: 's3', name: 'Forest Birds', category: 'Nature', icon: 'Bird' },
    { id: 's4', name: 'Thunder', category: 'Nature', icon: 'CloudLightning' },
    { id: 's5', name: 'Wind', category: 'Nature', icon: 'Wind' },
    { id: 's6', name: 'Crickets', category: 'Nature', icon: 'Bug' },
    { id: 's7', name: 'Soft Piano', category: 'Musical', icon: 'Piano' },
    { id: 's8', name: 'Ambient Pad', category: 'Musical', icon: 'Music' },
    { id: 's9', name: 'Guitar Hum', category: 'Musical', icon: 'Guitar' },
    { id: 's10', name: 'Wind Chimes', category: 'Texture', icon: 'Sparkles' },
    { id: 's11', name: 'White Noise', category: 'Texture', icon: 'Radio' },
    { id: 's12', name: 'Deep Drone', category: 'Texture', icon: 'Volume2' },
    { id: 's13', name: 'Creek', category: 'Nature', icon: 'Droplets' },
    { id: 's14', name: 'Fireplace', category: 'Texture', icon: 'Flame' },
    { id: 's15', name: 'Singing Bowl', category: 'Musical', icon: 'CircleDot' },
  ];

  const challenges = [
    { id: 'c1', title: 'Autumn Rain Meditation', season: 'Autumn', desc: 'Create a soundscape that captures the gentle melancholy of an autumn afternoon rain.', difficulty: 'Beginner', participants: 234, deadline: '5 days left', requiredSounds: ['Rain', 'Wind'], color: '#C2410C' },
    { id: 'c2', title: 'Midnight Forest Lullaby', season: 'Night', desc: 'Compose a soothing nighttime forest atmosphere perfect for drifting off to sleep.', difficulty: 'Intermediate', participants: 189, deadline: '12 days left', requiredSounds: ['Crickets', 'Wind'], color: '#1D4ED8' },
    { id: 'c3', title: 'Sunrise Awakening', season: 'Spring', desc: 'Build an energizing dawn chorus that gently lifts the listener into a new day.', difficulty: 'Beginner', participants: 312, deadline: '3 days left', requiredSounds: ['Forest Birds'], color: '#D97706' },
    { id: 'c4', title: 'The Sound of Deep Focus', season: 'Anytime', desc: 'Engineer the ultimate concentration soundtrack using minimal, precise elements.', difficulty: 'Advanced', participants: 156, deadline: '20 days left', requiredSounds: ['White Noise', 'Ambient Pad'], color: '#7C3AED' },
  ];

  const communityWeaves = [
    { id: 'cw1', name: 'Rainy Café Morning', author: 'SonicAlice', sounds: ['Rain', 'Soft Piano', 'White Noise'], likes: 847, mood: 'Focus', avatar: 'A' },
    { id: 'cw2', name: 'Deep Space Drift', author: 'NebulaSounds', sounds: ['Deep Drone', 'Ambient Pad', 'Wind'], likes: 623, mood: 'Introspective', avatar: 'N' },
    { id: 'cw3', name: 'Tropical Nightfall', author: 'IslandEcho', sounds: ['Ocean Waves', 'Crickets', 'Wind Chimes'], likes: 1204, mood: 'Relaxation', avatar: 'I' },
    { id: 'cw4', name: 'Mountain Stream Study', author: 'ZenCrafter', sounds: ['Creek', 'Forest Birds', 'Wind'], likes: 531, mood: 'Focus', avatar: 'Z' },
    { id: 'cw5', name: 'Fireside Stories', author: 'WarmWaves', sounds: ['Fireplace', 'Thunder', 'Rain'], likes: 982, mood: 'Cozy', avatar: 'W' },
  ];

  const getIcon = (name, size = 20, color = t.text) => {
    const IconComp = window.lucide && window.lucide[name];
    if (IconComp) {
      return React.createElement(IconComp, { size, color, strokeWidth: 1.8 });
    }
    return null;
  };

  const toggleSound = (id) => {
    setPlaying(prev => ({ ...prev, [id]: !prev[id] }));
    if (!volumes[id]) setVolumes(prev => ({ ...prev, [id]: 70 }));
    setShowPlayer(true);
  };

  const activeCount = Object.values(playing).filter(Boolean).length;

  // ─── HOME SCREEN ────────────────────────
  const HomeScreen = () => {
    const timeOfDay = new Date().getHours();
    const greeting = timeOfDay < 12 ? 'Good Morning' : timeOfDay < 18 ? 'Good Afternoon' : 'Good Evening';

    return React.createElement('div', { style: { padding: '24px 20px 20px', animation: animateIn ? 'fadeIn 0.4s ease' : 'none' } },
      // Header
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 } },
        React.createElement('div', null,
          React.createElement('div', { style: { fontSize: 15, color: t.textMuted, fontWeight: 500, fontFamily: font, marginBottom: 4 } }, greeting),
          React.createElement('h1', { style: { fontSize: 28, fontWeight: 800, color: t.text, fontFamily: font, letterSpacing: -0.5, margin: 0 } }, 'Echo Weave'),
        ),
        React.createElement('div', { style: { display: 'flex', gap: 12, alignItems: 'center' } },
          React.createElement('button', {
            onClick: () => setIsDark(!isDark),
            style: { width: 40, height: 40, borderRadius: 20, background: t.surface, border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }
          }, getIcon(isDark ? 'Sun' : 'Moon', 18, t.textSecondary)),
          React.createElement('div', {
            style: { width: 40, height: 40, borderRadius: 20, background: `linear-gradient(135deg, ${t.secondary}, ${t.cta})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, fontWeight: 700, color: '#fff', fontFamily: font }
          }, 'S'),
        ),
      ),

      // Now Playing Card
      activeCount > 0 && React.createElement('div', {
        onClick: () => setShowPlayer(!showPlayer),
        style: {
          background: `linear-gradient(135deg, ${t.secondary}dd, ${t.primary}ee)`,
          borderRadius: 20, padding: '18px 20px', marginBottom: 20, cursor: 'pointer',
          boxShadow: `0 8px 32px ${t.secondary}44`,
          animation: 'pulse 3s ease-in-out infinite',
          position: 'relative', overflow: 'hidden',
        }
      },
        React.createElement('div', { style: { position: 'absolute', top: -20, right: -20, width: 80, height: 80, borderRadius: 40, background: `${t.cta}22` } }),
        React.createElement('div', { style: { position: 'absolute', bottom: -10, left: 30, width: 50, height: 50, borderRadius: 25, background: `${t.cta}15` } }),
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 1 } },
          React.createElement('div', null,
            React.createElement('div', { style: { fontSize: 13, color: '#A5A3C9', fontWeight: 600, fontFamily: font, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 } }, 'Now Playing'),
            React.createElement('div', { style: { fontSize: 17, color: '#F1F0FF', fontWeight: 700, fontFamily: font } },
              `${activeCount} sound${activeCount > 1 ? 's' : ''} active`
            ),
          ),
          React.createElement('div', { style: { display: 'flex', gap: 8 } },
            React.createElement('button', {
              onClick: (e) => { e.stopPropagation(); setPlaying({}); setShowPlayer(false); },
              style: { width: 44, height: 44, borderRadius: 22, background: 'rgba(255,255,255,0.15)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }
            }, getIcon('Square', 18, '#F1F0FF')),
          ),
        ),
      ),

      // Quick Start Section
      React.createElement('div', { style: { marginBottom: 24 } },
        React.createElement('h2', { style: { fontSize: 20, fontWeight: 700, color: t.text, fontFamily: font, letterSpacing: -0.3, marginBottom: 14 } }, 'Quick Start'),
        React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 } },
          [
            { label: 'Focus Mode', icon: 'Target', sounds: ['s11', 's8'], gradient: `linear-gradient(135deg, #4338CA, #6366F1)` },
            { label: 'Sleep Well', icon: 'Moon', sounds: ['s1', 's6'], gradient: `linear-gradient(135deg, #1E1B4B, #312E81)` },
            { label: 'Nature Walk', icon: 'TreePine', sounds: ['s3', 's5', 's13'], gradient: `linear-gradient(135deg, #166534, #22C55E)` },
            { label: 'Cozy Vibes', icon: 'Flame', sounds: ['s14', 's1', 's7'], gradient: `linear-gradient(135deg, #92400E, #D97706)` },
          ].map((preset, i) =>
            React.createElement('button', {
              key: i,
              onClick: () => {
                const newPlaying = {};
                preset.sounds.forEach(s => { newPlaying[s] = true; });
                setPlaying(newPlaying);
                setShowPlayer(true);
              },
              style: {
                background: preset.gradient, border: 'none', borderRadius: 16, padding: '20px 16px',
                cursor: 'pointer', textAlign: 'left', transition: 'transform 0.2s, box-shadow 0.2s',
                boxShadow: '0 4px 16px rgba(0,0,0,0.2)', position: 'relative', overflow: 'hidden',
              },
              onMouseDown: (e) => { e.currentTarget.style.transform = 'scale(0.96)'; },
              onMouseUp: (e) => { e.currentTarget.style.transform = 'scale(1)'; },
              onMouseLeave: (e) => { e.currentTarget.style.transform = 'scale(1)'; },
            },
              React.createElement('div', { style: { position: 'absolute', top: -8, right: -8, width: 40, height: 40, borderRadius: 20, background: 'rgba(255,255,255,0.1)' } }),
              React.createElement('div', { style: { marginBottom: 12 } }, getIcon(preset.icon, 24, '#fff')),
              React.createElement('div', { style: { fontSize: 15, fontWeight: 700, color: '#fff', fontFamily: font } }, preset.label),
              React.createElement('div', { style: { fontSize: 12, color: 'rgba(255,255,255,0.6)', fontFamily: font, marginTop: 4 } },
                `${preset.sounds.length} layers`
              ),
            )
          )
        ),
      ),

      // Featured Challenge
      React.createElement('div', { style: { marginBottom: 24 } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 } },
          React.createElement('h2', { style: { fontSize: 20, fontWeight: 700, color: t.text, fontFamily: font, letterSpacing: -0.3, margin: 0 } }, 'Featured Challenge'),
          React.createElement('button', {
            onClick: () => setActiveScreen('challenges'),
            style: { background: 'none', border: 'none', fontSize: 14, color: t.cta, fontWeight: 600, fontFamily: font, cursor: 'pointer' }
          }, React.createElement('span', null, 'See All')),
        ),
        React.createElement('div', {
          onClick: () => { setActiveChallenge(challenges[0]); setActiveScreen('challenges'); },
          style: {
            background: `linear-gradient(135deg, ${challenges[0].color}cc, ${t.primary}ee)`,
            borderRadius: 20, padding: 20, cursor: 'pointer',
            boxShadow: `0 8px 24px ${challenges[0].color}33`,
            position: 'relative', overflow: 'hidden',
          }
        },
          React.createElement('div', { style: { position: 'absolute', bottom: -20, right: -10, width: 100, height: 100, borderRadius: 50, background: 'rgba(255,255,255,0.05)' } }),
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 } },
            React.createElement('span', { style: { fontSize: 11, fontWeight: 700, color: '#fff', background: 'rgba(255,255,255,0.2)', padding: '4px 10px', borderRadius: 8, fontFamily: font, textTransform: 'uppercase', letterSpacing: 0.8 } }, challenges[0].season),
            React.createElement('span', { style: { fontSize: 12, color: 'rgba(255,255,255,0.7)', fontFamily: font } }, challenges[0].deadline),
          ),
          React.createElement('h3', { style: { fontSize: 20, fontWeight: 800, color: '#fff', fontFamily: font, margin: '8px 0 6px', letterSpacing: -0.3 } }, challenges[0].title),
          React.createElement('p', { style: { fontSize: 14, color: 'rgba(255,255,255,0.7)', fontFamily: font, margin: 0, lineHeight: 1.4 } }, challenges[0].desc),
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6, marginTop: 12 } },
            getIcon('Users', 14, 'rgba(255,255,255,0.6)'),
            React.createElement('span', { style: { fontSize: 13, color: 'rgba(255,255,255,0.6)', fontFamily: font } }, `${challenges[0].participants} participants`),
          ),
        ),
      ),

      // Trending Community
      React.createElement('div', { style: { marginBottom: 20 } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 } },
          React.createElement('h2', { style: { fontSize: 20, fontWeight: 700, color: t.text, fontFamily: font, letterSpacing: -0.3, margin: 0 } }, 'Trending Weaves'),
          React.createElement('button', {
            onClick: () => setActiveScreen('community'),
            style: { background: 'none', border: 'none', fontSize: 14, color: t.cta, fontWeight: 600, fontFamily: font, cursor: 'pointer' }
          }, React.createElement('span', null, 'Explore')),
        ),
        React.createElement('div', { style: { display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 4 } },
          communityWeaves.slice(0, 3).map((w, i) =>
            React.createElement('div', {
              key: w.id,
              onClick: () => setActiveScreen('community'),
              style: {
                minWidth: 150, background: t.surface, borderRadius: 16, padding: 16,
                border: `1px solid ${t.border}`, cursor: 'pointer',
                transition: 'transform 0.2s', flexShrink: 0,
              },
              onMouseDown: (e) => { e.currentTarget.style.transform = 'scale(0.97)'; },
              onMouseUp: (e) => { e.currentTarget.style.transform = 'scale(1)'; },
              onMouseLeave: (e) => { e.currentTarget.style.transform = 'scale(1)'; },
            },
              React.createElement('div', { style: { width: 36, height: 36, borderRadius: 18, background: `linear-gradient(135deg, ${t.secondary}, ${t.cta})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, color: '#fff', fontFamily: font, marginBottom: 10 } }, w.avatar),
              React.createElement('div', { style: { fontSize: 14, fontWeight: 700, color: t.text, fontFamily: font, marginBottom: 4 } }, w.name),
              React.createElement('div', { style: { fontSize: 12, color: t.textMuted, fontFamily: font, marginBottom: 8 } }, `by ${w.author}`),
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
                getIcon('Heart', 12, t.cta),
                React.createElement('span', { style: { fontSize: 12, color: t.textSecondary, fontFamily: font } }, w.likes),
              ),
            )
          ),
        ),
      ),
    );
  };

  // ─── CREATE SCREEN ────────────────────────
  const CreateScreen = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const categories = ['All', 'Nature', 'Musical', 'Texture'];

    const filtered = selectedCategory === 'All'
      ? soundLibrary
      : soundLibrary.filter(s => s.category === selectedCategory);

    return React.createElement('div', { style: { padding: '24px 20px 20px', animation: animateIn ? 'fadeIn 0.4s ease' : 'none' } },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 } },
        React.createElement('h1', { style: { fontSize: 28, fontWeight: 800, color: t.text, fontFamily: font, letterSpacing: -0.5, margin: 0 } }, 'Sound Palette'),
        activeCount > 0 && React.createElement('button', {
          onClick: () => {
            const activeSounds = soundLibrary.filter(s => playing[s.id]).map(s => s.name);
            setSavedWeaves(prev => [...prev, {
              id: Date.now(), name: `Weave #${prev.length + 1}`,
              sounds: activeSounds, mood: 'Custom',
              notes: `Created with ${activeSounds.length} layers.`
            }]);
          },
          style: {
            background: t.cta, border: 'none', borderRadius: 12, padding: '10px 16px',
            fontSize: 14, fontWeight: 700, color: '#fff', fontFamily: font, cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 6,
          }
        }, getIcon('Save', 16, '#fff'), 'Save Weave'),
      ),

      // Category Tabs
      React.createElement('div', { style: { display: 'flex', gap: 8, marginBottom: 20, overflowX: 'auto' } },
        categories.map(cat =>
          React.createElement('button', {
            key: cat,
            onClick: () => setSelectedCategory(cat),
            style: {
              padding: '8px 18px', borderRadius: 20, border: 'none', cursor: 'pointer',
              fontFamily: font, fontSize: 14, fontWeight: 600, whiteSpace: 'nowrap',
              background: selectedCategory === cat ? t.secondary : t.surface,
              color: selectedCategory === cat ? '#fff' : t.textSecondary,
              transition: 'all 0.2s',
            }
          }, cat)
        )
      ),

      // Active Layers Info
      activeCount > 0 && React.createElement('div', {
        style: {
          background: t.surfaceAlt, borderRadius: 14, padding: '12px 16px', marginBottom: 16,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          border: `1px solid ${t.border}`,
        }
      },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8 } },
          React.createElement('div', { style: { width: 8, height: 8, borderRadius: 4, background: t.cta, animation: 'pulse 2s infinite' } }),
          React.createElement('span', { style: { fontSize: 14, color: t.text, fontFamily: font, fontWeight: 600 } },
            `${activeCount} layer${activeCount > 1 ? 's' : ''} active`
          ),
        ),
        React.createElement('button', {
          onClick: () => setPlaying({}),
          style: { background: 'none', border: 'none', fontSize: 13, color: t.textMuted, fontFamily: font, cursor: 'pointer' }
        }, 'Clear all'),
      ),

      // Sound Grid
      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 } },
        filtered.map(sound =>
          React.createElement('button', {
            key: sound.id,
            onClick: () => toggleSound(sound.id),
            style: {
              background: playing[sound.id]
                ? `linear-gradient(135deg, ${t.secondary}, ${t.cta}88)`
                : t.surface,
              border: playing[sound.id] ? `2px solid ${t.cta}` : `1px solid ${t.border}`,
              borderRadius: 16, padding: '18px 10px', cursor: 'pointer',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
              transition: 'all 0.2s',
              boxShadow: playing[sound.id] ? `0 4px 20px ${t.cta}33` : 'none',
              animation: playing[sound.id] ? 'pulse 3s ease-in-out infinite' : 'none',
            },
            onMouseDown: (e) => { e.currentTarget.style.transform = 'scale(0.93)'; },
            onMouseUp: (e) => { e.currentTarget.style.transform = 'scale(1)'; },
            onMouseLeave: (e) => { e.currentTarget.style.transform = 'scale(1)'; },
          },
            getIcon(sound.icon, 24, playing[sound.id] ? '#fff' : t.textSecondary),
            React.createElement('span', {
              style: { fontSize: 12, fontWeight: 600, color: playing[sound.id] ? '#fff' : t.text, fontFamily: font, textAlign: 'center' }
            }, sound.name),
            React.createElement('span', {
              style: { fontSize: 10, color: playing[sound.id] ? 'rgba(255,255,255,0.6)' : t.textMuted, fontFamily: font }
            }, sound.category),
          )
        ),
      ),

      // Volume Controls
      activeCount > 0 && React.createElement('div', { style: { marginTop: 20 } },
        React.createElement('h3', { style: { fontSize: 17, fontWeight: 700, color: t.text, fontFamily: font, marginBottom: 12 } }, 'Mix Levels'),
        soundLibrary.filter(s => playing[s.id]).map(sound =>
          React.createElement('div', {
            key: sound.id,
            style: { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12, background: t.surface, borderRadius: 12, padding: '10px 14px', border: `1px solid ${t.border}` }
          },
            getIcon(sound.icon, 18, t.cta),
            React.createElement('span', { style: { fontSize: 14, fontWeight: 600, color: t.text, fontFamily: font, flex: 1 } }, sound.name),
            React.createElement('input', {
              type: 'range', min: 0, max: 100,
              value: volumes[sound.id] || 70,
              onChange: (e) => setVolumes(prev => ({ ...prev, [sound.id]: e.target.value })),
              style: { width: 80, accentColor: t.cta }
            }),
            React.createElement('span', { style: { fontSize: 12, color: t.textMuted, fontFamily: font, width: 30, textAlign: 'right' } }, `${volumes[sound.id] || 70}%`),
          )
        ),
      ),
    );
  };

  // ─── CHALLENGES SCREEN ────────────────────────
  const ChallengesScreen = () => {
    return React.createElement('div', { style: { padding: '24px 20px 20px', animation: animateIn ? 'slideUp 0.4s ease' : 'none' } },
      React.createElement('h1', { style: { fontSize: 28, fontWeight: 800, color: t.text, fontFamily: font, letterSpacing: -0.5, margin: '0 0 6px' } }, 'Weave Challenges'),
      React.createElement('p', { style: { fontSize: 15, color: t.textMuted, fontFamily: font, margin: '0 0 24px', lineHeight: 1.4 } },
        'Creative sound prompts to expand your sonic palette'
      ),

      // Active Challenge Detail
      activeChallenge && React.createElement('div', {
        style: {
          background: `linear-gradient(135deg, ${activeChallenge.color}dd, ${t.primary})`,
          borderRadius: 20, padding: 20, marginBottom: 20,
          boxShadow: `0 8px 32px ${activeChallenge.color}33`,
          position: 'relative', overflow: 'hidden',
        }
      },
        React.createElement('div', { style: { position: 'absolute', top: -30, right: -20, width: 100, height: 100, borderRadius: 50, background: 'rgba(255,255,255,0.06)' } }),
        React.createElement('button', {
          onClick: () => setActiveChallenge(null),
          style: { position: 'absolute', top: 12, right: 12, width: 32, height: 32, borderRadius: 16, background: 'rgba(255,255,255,0.15)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }
        }, getIcon('X', 16, '#fff')),
        React.createElement('span', { style: { fontSize: 11, fontWeight: 700, color: '#fff', background: 'rgba(255,255,255,0.2)', padding: '4px 10px', borderRadius: 8, fontFamily: font, textTransform: 'uppercase', letterSpacing: 0.8 } }, activeChallenge.difficulty),
        React.createElement('h2', { style: { fontSize: 22, fontWeight: 800, color: '#fff', fontFamily: font, margin: '12px 0 8px', letterSpacing: -0.3 } }, activeChallenge.title),
        React.createElement('p', { style: { fontSize: 15, color: 'rgba(255,255,255,0.75)', fontFamily: font, margin: '0 0 16px', lineHeight: 1.5 } }, activeChallenge.desc),
        React.createElement('div', { style: { marginBottom: 16 } },
          React.createElement('div', { style: { fontSize: 12, color: 'rgba(255,255,255,0.5)', fontFamily: font, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.8, fontWeight: 600 } }, 'Required Sounds'),
          React.createElement('div', { style: { display: 'flex', gap: 8, flexWrap: 'wrap' } },
            activeChallenge.requiredSounds.map(s =>
              React.createElement('span', { key: s, style: { fontSize: 13, color: '#fff', background: 'rgba(255,255,255,0.15)', padding: '6px 12px', borderRadius: 10, fontFamily: font, fontWeight: 600 } }, s)
            ),
          ),
        ),
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6 } },
            getIcon('Users', 14, 'rgba(255,255,255,0.6)'),
            React.createElement('span', { style: { fontSize: 13, color: 'rgba(255,255,255,0.6)', fontFamily: font } }, `${activeChallenge.participants} joined`),
          ),
          React.createElement('button', {
            onClick: () => setActiveScreen('create'),
            style: { background: t.cta, border: 'none', borderRadius: 12, padding: '10px 20px', fontSize: 14, fontWeight: 700, color: '#fff', fontFamily: font, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }
          }, getIcon('Play', 16, '#fff'), React.createElement('span', null, 'Start Creating')),
        ),
      ),

      // Challenge List
      challenges.map(ch =>
        React.createElement('div', {
          key: ch.id,
          onClick: () => setActiveChallenge(ch),
          style: {
            background: t.surface, borderRadius: 16, padding: 16, marginBottom: 12,
            border: `1px solid ${t.border}`, cursor: 'pointer',
            transition: 'all 0.2s', display: 'flex', gap: 14, alignItems: 'center',
            boxShadow: activeChallenge?.id === ch.id ? `0 4px 16px ${ch.color}33` : 'none',
          },
          onMouseDown: (e) => { e.currentTarget.style.transform = 'scale(0.98)'; },
          onMouseUp: (e) => { e.currentTarget.style.transform = 'scale(1)'; },
          onMouseLeave: (e) => { e.currentTarget.style.transform = 'scale(1)'; },
        },
          React.createElement('div', {
            style: {
              width: 52, height: 52, borderRadius: 14, flexShrink: 0,
              background: `linear-gradient(135deg, ${ch.color}, ${ch.color}88)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }
          }, getIcon('Sparkles', 24, '#fff')),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 } },
              React.createElement('h3', { style: { fontSize: 16, fontWeight: 700, color: t.text, fontFamily: font, margin: 0 } }, ch.title),
              React.createElement('span', { style: { fontSize: 11, color: t.textMuted, fontFamily: font, whiteSpace: 'nowrap' } }, ch.deadline),
            ),
            React.createElement('div', { style: { display: 'flex', gap: 8, alignItems: 'center' } },
              React.createElement('span', { style: { fontSize: 12, color: t.textSecondary, fontFamily: font, fontWeight: 600 } }, ch.difficulty),
              React.createElement('span', { style: { fontSize: 12, color: t.textMuted, fontFamily: font } }, `\u00B7 ${ch.participants} joined`),
            ),
          ),
        )
      ),
    );
  };

  // ─── COMMUNITY SCREEN ────────────────────────
  const CommunityScreen = () => {
    const [filter, setFilter] = useState('Trending');
    const filters = ['Trending', 'New', 'Focus', 'Relaxation'];

    return React.createElement('div', { style: { padding: '24px 20px 20px', animation: animateIn ? 'fadeIn 0.4s ease' : 'none' } },
      React.createElement('h1', { style: { fontSize: 28, fontWeight: 800, color: t.text, fontFamily: font, letterSpacing: -0.5, margin: '0 0 6px' } }, 'Community Gallery'),
      React.createElement('p', { style: { fontSize: 15, color: t.textMuted, fontFamily: font, margin: '0 0 20px' } },
        'Discover soundscapes crafted by fellow weavers'
      ),

      // Search
      React.createElement('div', {
        style: {
          display: 'flex', alignItems: 'center', gap: 10, background: t.inputBg,
          borderRadius: 14, padding: '12px 16px', marginBottom: 16,
          border: `1px solid ${t.border}`,
        }
      },
        getIcon('Search', 18, t.textMuted),
        React.createElement('input', {
          placeholder: 'Search weaves, moods, creators...',
          style: { background: 'none', border: 'none', outline: 'none', fontSize: 15, color: t.text, fontFamily: font, flex: 1 }
        }),
      ),

      // Filter Tabs
      React.createElement('div', { style: { display: 'flex', gap: 8, marginBottom: 20, overflowX: 'auto' } },
        filters.map(f =>
          React.createElement('button', {
            key: f,
            onClick: () => setFilter(f),
            style: {
              padding: '8px 16px', borderRadius: 20, border: 'none', cursor: 'pointer',
              fontFamily: font, fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap',
              background: filter === f ? t.cta : t.surface,
              color: filter === f ? '#fff' : t.textSecondary,
              transition: 'all 0.2s',
            }
          }, f)
        )
      ),

      // Community Weaves
      communityWeaves.map(weave =>
        React.createElement('div', {
          key: weave.id,
          style: {
            background: t.surface, borderRadius: 18, padding: 18, marginBottom: 14,
            border: `1px solid ${t.border}`, transition: 'all 0.2s',
          }
        },
          // Header
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 } },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10 } },
              React.createElement('div', {
                style: {
                  width: 38, height: 38, borderRadius: 19,
                  background: `linear-gradient(135deg, ${t.secondary}, ${t.cta})`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 15, fontWeight: 700, color: '#fff', fontFamily: font,
                }
              }, weave.avatar),
              React.createElement('div', null,
                React.createElement('div', { style: { fontSize: 14, fontWeight: 700, color: t.text, fontFamily: font } }, weave.author),
                React.createElement('div', { style: { fontSize: 12, color: t.textMuted, fontFamily: font } }, weave.mood),
              ),
            ),
            React.createElement('span', {
              style: {
                fontSize: 11, fontWeight: 700, color: t.cta,
                background: `${t.cta}18`, padding: '4px 10px', borderRadius: 8,
                fontFamily: font, textTransform: 'uppercase', letterSpacing: 0.5,
              }
            }, weave.mood),
          ),
          // Title
          React.createElement('h3', { style: { fontSize: 18, fontWeight: 700, color: t.text, fontFamily: font, margin: '0 0 10px', letterSpacing: -0.2 } }, weave.name),
          // Sound tags
          React.createElement('div', { style: { display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 14 } },
            weave.sounds.map(s =>
              React.createElement('span', {
                key: s,
                style: { fontSize: 12, color: t.textSecondary, background: t.surfaceAlt, padding: '4px 10px', borderRadius: 8, fontFamily: font, fontWeight: 500 }
              }, s)
            ),
          ),
          // Actions
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
            React.createElement('div', { style: { display: 'flex', gap: 16 } },
              React.createElement('button', {
                onClick: () => setLikedWeaves(prev => ({ ...prev, [weave.id]: !prev[weave.id] })),
                style: {
                  display: 'flex', alignItems: 'center', gap: 6,
                  background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                }
              },
                getIcon(likedWeaves[weave.id] ? 'HeartHandshake' : 'Heart', 18, likedWeaves[weave.id] ? '#EF4444' : t.textMuted),
                React.createElement('span', { style: { fontSize: 13, color: likedWeaves[weave.id] ? '#EF4444' : t.textMuted, fontFamily: font, fontWeight: 600 } },
                  likedWeaves[weave.id] ? weave.likes + 1 : weave.likes
                ),
              ),
              React.createElement('button', {
                style: { display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }
              },
                getIcon('MessageCircle', 18, t.textMuted),
                React.createElement('span', { style: { fontSize: 13, color: t.textMuted, fontFamily: font } }, 'Reply'),
              ),
            ),
            React.createElement('button', {
              style: {
                display: 'flex', alignItems: 'center', gap: 6,
                background: `${t.secondary}22`, border: 'none', borderRadius: 10,
                padding: '8px 14px', cursor: 'pointer',
              }
            },
              getIcon('Play', 16, t.secondary),
              React.createElement('span', { style: { fontSize: 13, color: t.secondary, fontWeight: 600, fontFamily: font } }, 'Listen'),
            ),
          ),
        )
      ),
    );
  };

  // ─── JOURNAL SCREEN ────────────────────────
  const JournalScreen = () => {
    return React.createElement('div', { style: { padding: '24px 20px 20px', animation: animateIn ? 'slideUp 0.4s ease' : 'none' } },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 } },
        React.createElement('h1', { style: { fontSize: 28, fontWeight: 800, color: t.text, fontFamily: font, letterSpacing: -0.5, margin: 0 } }, 'Sonic Journal'),
        React.createElement('div', { style: { display: 'flex', gap: 8 } },
          React.createElement('button', {
            style: { width: 40, height: 40, borderRadius: 12, background: t.surface, border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }
          }, getIcon('Filter', 18, t.textSecondary)),
        ),
      ),
      React.createElement('p', { style: { fontSize: 15, color: t.textMuted, fontFamily: font, margin: '0 0 20px' } },
        'Your personal collection of sound weaves'
      ),

      // Stats Row
      React.createElement('div', { style: { display: 'flex', gap: 10, marginBottom: 24 } },
        [
          { label: 'Total Weaves', value: savedWeaves.length, icon: 'Layers' },
          { label: 'Hours Played', value: '14.2', icon: 'Clock' },
          { label: 'Streak', value: '7 days', icon: 'Zap' },
        ].map((stat, i) =>
          React.createElement('div', {
            key: i,
            style: {
              flex: 1, background: t.surface, borderRadius: 14, padding: '14px 12px',
              border: `1px solid ${t.border}`, textAlign: 'center',
            }
          },
            React.createElement('div', { style: { marginBottom: 6, display: 'flex', justifyContent: 'center' } }, getIcon(stat.icon, 18, t.cta)),
            React.createElement('div', { style: { fontSize: 20, fontWeight: 800, color: t.text, fontFamily: font } }, stat.value),
            React.createElement('div', { style: { fontSize: 11, color: t.textMuted, fontFamily: font, fontWeight: 500 } }, stat.label),
          )
        ),
      ),

      // Saved Weaves
      React.createElement('h2', { style: { fontSize: 18, fontWeight: 700, color: t.text, fontFamily: font, marginBottom: 14 } }, 'Saved Weaves'),
      savedWeaves.length === 0
        ? React.createElement('div', {
            style: { textAlign: 'center', padding: '40px 20px', background: t.surface, borderRadius: 20, border: `1px solid ${t.border}` }
          },
            React.createElement('div', { style: { marginBottom: 12 } }, getIcon('Music', 40, t.textMuted)),
            React.createElement('h3', { style: { fontSize: 17, fontWeight: 700, color: t.text, fontFamily: font, margin: '0 0 6px' } }, 'No weaves yet'),
            React.createElement('p', { style: { fontSize: 14, color: t.textMuted, fontFamily: font, margin: '0 0 16px' } }, 'Start creating your first soundscape'),
            React.createElement('button', {
              onClick: () => setActiveScreen('create'),
              style: { background: t.cta, border: 'none', borderRadius: 12, padding: '12px 24px', fontSize: 15, fontWeight: 700, color: '#fff', fontFamily: font, cursor: 'pointer' }
            }, React.createElement('span', null, 'Create Now')),
          )
        : savedWeaves.map((weave, i) =>
          React.createElement('div', {
            key: weave.id,
            style: {
              background: t.surface, borderRadius: 16, padding: 16, marginBottom: 12,
              border: `1px solid ${t.border}`, transition: 'all 0.2s',
              animation: animateIn ? `slideUp 0.4s ease ${i * 0.1}s both` : 'none',
            }
          },
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 } },
              React.createElement('div', null,
                React.createElement('h3', { style: { fontSize: 17, fontWeight: 700, color: t.text, fontFamily: font, margin: '0 0 4px' } }, weave.name),
                React.createElement('span', {
                  style: { fontSize: 12, fontWeight: 600, color: t.cta, background: `${t.cta}18`, padding: '3px 8px', borderRadius: 6, fontFamily: font }
                }, weave.mood),
              ),
              React.createElement('div', { style: { display: 'flex', gap: 8 } },
                React.createElement('button', {
                  onClick: () => {
                    const soundMap = {};
                    soundLibrary.forEach(s => { if (weave.sounds.includes(s.name)) soundMap[s.id] = true; });
                    setPlaying(soundMap);
                    setShowPlayer(true);
                  },
                  style: { width: 40, height: 40, borderRadius: 12, background: `${t.secondary}22`, border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }
                }, getIcon('Play', 18, t.secondary)),
                React.createElement('button', {
                  onClick: () => setSavedWeaves(prev => prev.filter(w => w.id !== weave.id)),
                  style: { width: 40, height: 40, borderRadius: 12, background: t.surfaceAlt, border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }
                }, getIcon('Trash2', 18, t.textMuted)),
              ),
            ),
            React.createElement('div', { style: { display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 } },
              weave.sounds.map(s =>
                React.createElement('span', { key: s, style: { fontSize: 12, color: t.textSecondary, background: t.surfaceAlt, padding: '3px 8px', borderRadius: 6, fontFamily: font } }, s)
              ),
            ),
            React.createElement('p', { style: { fontSize: 13, color: t.textMuted, fontFamily: font, margin: 0, lineHeight: 1.4, fontStyle: 'italic' } }, weave.notes),
          )
        ),

      // Reactive Mode
      React.createElement('div', { style: { marginTop: 24 } },
        React.createElement('h2', { style: { fontSize: 18, fontWeight: 700, color: t.text, fontFamily: font, marginBottom: 14 } }, 'Reactive Modes'),
        React.createElement('div', {
          style: {
            background: `linear-gradient(135deg, ${t.secondary}22, ${t.primary}44)`,
            borderRadius: 18, padding: 18, border: `1px solid ${t.border}`,
          }
        },
          [
            { name: 'Time of Day', desc: 'Adjust sounds based on morning, afternoon, or evening', icon: 'Clock', active: true },
            { name: 'Ambient Light', desc: 'React to your environment brightness', icon: 'SunDim', active: false },
            { name: 'Weather Sync', desc: 'Blend local weather into your soundscape', icon: 'CloudSun', active: false },
          ].map((mode, i) =>
            React.createElement('div', {
              key: i,
              style: {
                display: 'flex', alignItems: 'center', gap: 14, padding: '12px 0',
                borderBottom: i < 2 ? `1px solid ${t.border}44` : 'none',
              }
            },
              React.createElement('div', {
                style: { width: 42, height: 42, borderRadius: 12, background: mode.active ? `${t.cta}22` : t.surface, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }
              }, getIcon(mode.icon, 20, mode.active ? t.cta : t.textMuted)),
              React.createElement('div', { style: { flex: 1 } },
                React.createElement('div', { style: { fontSize: 15, fontWeight: 600, color: t.text, fontFamily: font } }, mode.name),
                React.createElement('div', { style: { fontSize: 12, color: t.textMuted, fontFamily: font } }, mode.desc),
              ),
              React.createElement('div', {
                onClick: () => {},
                style: {
                  width: 48, height: 28, borderRadius: 14, cursor: 'pointer',
                  background: mode.active ? t.cta : t.surfaceAlt,
                  display: 'flex', alignItems: 'center', padding: 2,
                  transition: 'background 0.2s',
                }
              },
                React.createElement('div', {
                  style: {
                    width: 24, height: 24, borderRadius: 12, background: '#fff',
                    transition: 'transform 0.2s',
                    transform: mode.active ? 'translateX(20px)' : 'translateX(0)',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                  }
                }),
              ),
            )
          ),
        ),
      ),
    );
  };

  const screens = {
    home: HomeScreen,
    create: CreateScreen,
    challenges: ChallengesScreen,
    community: CommunityScreen,
    journal: JournalScreen,
  };

  const tabs = [
    { id: 'home', label: 'Home', icon: 'Home' },
    { id: 'create', label: 'Create', icon: 'Sliders' },
    { id: 'challenges', label: 'Challenges', icon: 'Trophy' },
    { id: 'community', label: 'Community', icon: 'Users' },
    { id: 'journal', label: 'Journal', icon: 'BookOpen' },
  ];

  const styleTag = React.createElement('style', null, `
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.85; }
    }
    @keyframes shimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }
    input[type="range"] {
      -webkit-appearance: none;
      height: 4px;
      border-radius: 2px;
      outline: none;
    }
    input[type="range"]::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: #22C55E;
      cursor: pointer;
    }
    * { -webkit-tap-highlight-color: transparent; }
    ::-webkit-scrollbar { display: none; }
  `);

  return React.createElement('div', {
    style: { minHeight: '100vh', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px 0', fontFamily: font }
  },
    styleTag,
    React.createElement('div', {
      style: {
        width: 375, height: 812, borderRadius: 40, overflow: 'hidden',
        background: t.bg, display: 'flex', flexDirection: 'column',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)', position: 'relative',
      }
    },
      // Scrollable Content
      React.createElement('div', {
        style: { flex: 1, overflowY: 'auto', overflowX: 'hidden', paddingBottom: 80 }
      },
        React.createElement(screens[activeScreen]),
      ),

      // Bottom Tab Bar
      React.createElement('div', {
        style: {
          position: 'absolute', bottom: 0, left: 0, right: 0,
          background: t.tabBg, borderTop: `1px solid ${t.border}`,
          display: 'flex', justifyContent: 'space-around', alignItems: 'center',
          padding: '8px 0 24px', backdropFilter: 'blur(20px)',
        }
      },
        tabs.map(tab =>
          React.createElement('button', {
            key: tab.id,
            onClick: () => setActiveScreen(tab.id),
            style: {
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
              background: 'none', border: 'none', cursor: 'pointer', padding: '4px 8px',
              minWidth: 44, minHeight: 44,
              transition: 'all 0.2s',
            }
          },
            React.createElement('div', {
              style: {
                padding: '4px 12px', borderRadius: 12,
                background: activeScreen === tab.id ? `${t.secondary}33` : 'transparent',
                transition: 'background 0.2s',
              }
            },
              getIcon(tab.icon, 22, activeScreen === tab.id ? t.cta : t.textMuted),
            ),
            React.createElement('span', {
              style: {
                fontSize: 10, fontWeight: activeScreen === tab.id ? 700 : 500,
                color: activeScreen === tab.id ? t.cta : t.textMuted,
                fontFamily: font,
              }
            }, tab.label),
          )
        ),
      ),
    ),
  );
}
