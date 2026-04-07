const { useState, useEffect, useRef, useCallback } = React;

function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [isDark, setIsDark] = useState(true);
  const [selectedGlimmer, setSelectedGlimmer] = useState(null);
  const [activePalette, setActivePalette] = useState('soft-focus');
  const [isPlaying, setIsPlaying] = useState(false);
  const [serenityAnswer, setSerenityAnswer] = useState('');
  const [showPrompt, setShowPrompt] = useState(false);
  const [savedGlimmers, setSavedGlimmers] = useState([0, 2, 4]);
  const [activeSound, setActiveSound] = useState('rain');

  const themes = {
    dark: {
      primary: '#0F0F23',
      secondary: '#1E1B4B',
      cta: '#E11D48',
      bg: '#000000',
      surface: '#0F0F23',
      surfaceLight: '#1a1a3e',
      text: '#FFFFFF',
      textSecondary: '#A0A0C0',
      textTertiary: '#6B6B8D',
      card: '#151533',
      cardBorder: 'rgba(225,29,72,0.15)',
      accent: '#E11D48',
      glow: 'rgba(225,29,72,0.3)',
      overlay: 'rgba(0,0,0,0.7)',
    },
    light: {
      primary: '#E8E6F0',
      secondary: '#D4D0E8',
      cta: '#E11D48',
      bg: '#F5F3FA',
      surface: '#FFFFFF',
      surfaceLight: '#F0EDF8',
      text: '#0F0F23',
      textSecondary: '#5A5A7A',
      textTertiary: '#8A8AAA',
      card: '#FFFFFF',
      cardBorder: 'rgba(225,29,72,0.2)',
      accent: '#E11D48',
      glow: 'rgba(225,29,72,0.15)',
      overlay: 'rgba(255,255,255,0.7)',
    },
  };

  const t = isDark ? themes.dark : themes.light;
  const font = "-apple-system, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif";

  const icons = window.lucide || {};
  const createIcon = (IconComp, props = {}) => {
    if (!IconComp) return null;
    return React.createElement(IconComp, { size: props.size || 20, color: props.color || t.text, strokeWidth: props.strokeWidth || 1.8, ...props });
  };

  // Glimmer data
  const glimmers = [
    { id: 0, title: 'Golden Hour Walk', mood: 'peaceful', duration: '12s', gradient: 'linear-gradient(135deg, #f5af19, #f12711)', time: '3 days ago', photos: 4 },
    { id: 1, title: 'Morning Garden Light', mood: 'refreshing', duration: '8s', gradient: 'linear-gradient(135deg, #56ab2f, #a8e063)', time: '1 week ago', photos: 6 },
    { id: 2, title: 'Rainy Window', mood: 'contemplative', duration: '15s', gradient: 'linear-gradient(135deg, #4facfe, #00f2fe)', time: '2 weeks ago', photos: 3 },
    { id: 3, title: 'Sunset Over Water', mood: 'serene', duration: '10s', gradient: 'linear-gradient(135deg, #fa709a, #fee140)', time: 'Yesterday', photos: 5 },
    { id: 4, title: 'Forest Canopy', mood: 'grounding', duration: '14s', gradient: 'linear-gradient(135deg, #0f9b0f, #36d1dc)', time: '4 days ago', photos: 7 },
    { id: 5, title: 'Starlit Evening', mood: 'dreamy', duration: '11s', gradient: 'linear-gradient(135deg, #0F0F23, #4a00e0)', time: '5 days ago', photos: 3 },
  ];

  const palettes = [
    { id: 'soft-focus', name: 'Soft Focus', colors: ['#f5e6d3', '#e8d5c4', '#d4c4b0'], desc: 'Warm, gentle blur' },
    { id: 'vivid-calm', name: 'Vivid Calm', colors: ['#4facfe', '#00f2fe', '#43e97b'], desc: 'Bright yet soothing' },
    { id: 'dreamy-haze', name: 'Dreamy Haze', colors: ['#a18cd1', '#fbc2eb', '#f5576c'], desc: 'Ethereal pastels' },
    { id: 'twilight', name: 'Twilight Glow', colors: ['#0F0F23', '#1E1B4B', '#E11D48'], desc: 'Deep dusk tones' },
    { id: 'ocean-mist', name: 'Ocean Mist', colors: ['#667db6', '#0082c8', '#00d4ff'], desc: 'Cool sea spray' },
  ];

  const soundscapes = [
    { id: 'rain', name: 'Gentle Rain', icon: icons.CloudRain },
    { id: 'forest', name: 'Forest Breeze', icon: icons.Trees },
    { id: 'waves', name: 'Ocean Waves', icon: icons.Waves },
    { id: 'piano', name: 'Soft Piano', icon: icons.Music },
    { id: 'silence', name: 'Silence', icon: icons.VolumeX },
  ];

  // Style tag for animations
  const styleTag = React.createElement('style', null, `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes pulse {
      0%, 100% { transform: scale(1); opacity: 0.7; }
      50% { transform: scale(1.05); opacity: 1; }
    }
    @keyframes shimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }
    @keyframes breathe {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.08); }
    }
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-6px); }
    }
    @keyframes ripple {
      0% { box-shadow: 0 0 0 0 rgba(225,29,72,0.4); }
      100% { box-shadow: 0 0 0 20px rgba(225,29,72,0); }
    }
  `);

  // ========== HOME SCREEN ==========
  function HomeScreen() {
    const featuredGlimmer = glimmers[3];
    return React.createElement('div', { style: { padding: '0 0 20px 0', animation: 'fadeIn 0.4s ease' } },
      // Header
      React.createElement('div', { style: { padding: '16px 20px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
        React.createElement('div', null,
          React.createElement('h1', { style: { fontFamily: font, fontSize: 28, fontWeight: 800, color: t.text, letterSpacing: -0.5, margin: 0 } }, 'Serene Glimmers'),
          React.createElement('p', { style: { fontFamily: font, fontSize: 13, color: t.textTertiary, margin: '2px 0 0', fontWeight: 400 } }, 'Your calm awaits')
        ),
        React.createElement('div', { style: { display: 'flex', gap: 12, alignItems: 'center' } },
          React.createElement('button', {
            onClick: () => setIsDark(!isDark),
            style: { background: 'none', border: 'none', cursor: 'pointer', padding: 8, borderRadius: 12, background: t.surfaceLight }
          }, createIcon(isDark ? icons.Sun : icons.Moon, { size: 20, color: t.textSecondary })),
          React.createElement('button', {
            style: { background: 'none', border: 'none', cursor: 'pointer', padding: 8, borderRadius: 12, background: t.surfaceLight }
          }, createIcon(icons.Bell, { size: 20, color: t.textSecondary }))
        )
      ),

      // Daily Serenity Prompt
      React.createElement('div', {
        onClick: () => setShowPrompt(true),
        style: {
          margin: '8px 20px 16px', padding: '16px 18px', borderRadius: 16,
          background: `linear-gradient(135deg, ${t.secondary}, ${t.primary})`,
          border: `1px solid ${t.cardBorder}`,
          cursor: 'pointer', transition: 'transform 0.2s',
          position: 'relative', overflow: 'hidden',
        }
      },
        React.createElement('div', { style: { position: 'absolute', top: -20, right: -20, width: 80, height: 80, borderRadius: '50%', background: t.glow, filter: 'blur(20px)' } }),
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 } },
          createIcon(icons.Sparkles, { size: 16, color: t.cta }),
          React.createElement('span', { style: { fontFamily: font, fontSize: 13, fontWeight: 600, color: t.cta, textTransform: 'uppercase', letterSpacing: 1 } }, 'Daily Prompt')
        ),
        React.createElement('p', { style: { fontFamily: font, fontSize: 17, fontWeight: 500, color: t.text, margin: 0, lineHeight: 1.4 } },
          '"What brought you peace today?"'
        ),
        React.createElement('p', { style: { fontFamily: font, fontSize: 13, color: t.textTertiary, margin: '6px 0 0' } }, 'Tap to reflect and generate a Glimmer')
      ),

      // Featured Glimmer
      React.createElement('div', { style: { padding: '0 20px', marginBottom: 20 } },
        React.createElement('h2', { style: { fontFamily: font, fontSize: 22, fontWeight: 700, color: t.text, letterSpacing: -0.3, margin: '0 0 12px' } }, 'Today\'s Glimmer'),
        React.createElement('div', {
          onClick: () => { setSelectedGlimmer(featuredGlimmer); setActiveScreen('player'); },
          style: {
            borderRadius: 20, height: 200, background: featuredGlimmer.gradient,
            position: 'relative', overflow: 'hidden', cursor: 'pointer',
            boxShadow: `0 8px 32px ${t.glow}`,
          }
        },
          React.createElement('div', { style: { position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)' } }),
          React.createElement('div', { style: { position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' } },
            React.createElement('div', { style: { width: 56, height: 56, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'breathe 3s ease infinite' } },
              createIcon(icons.Play, { size: 24, color: '#fff' })
            )
          ),
          React.createElement('div', { style: { position: 'absolute', bottom: 16, left: 18, right: 18 } },
            React.createElement('p', { style: { fontFamily: font, fontSize: 20, fontWeight: 700, color: '#fff', margin: 0 } }, featuredGlimmer.title),
            React.createElement('div', { style: { display: 'flex', gap: 8, marginTop: 6, alignItems: 'center' } },
              React.createElement('span', { style: { fontFamily: font, fontSize: 13, color: 'rgba(255,255,255,0.8)', background: 'rgba(255,255,255,0.15)', padding: '3px 10px', borderRadius: 20 } }, featuredGlimmer.mood),
              React.createElement('span', { style: { fontFamily: font, fontSize: 13, color: 'rgba(255,255,255,0.7)' } }, featuredGlimmer.duration),
              React.createElement('span', { style: { fontFamily: font, fontSize: 13, color: 'rgba(255,255,255,0.7)' } }, `${featuredGlimmer.photos} photos`)
            )
          )
        )
      ),

      // Recent Glimmers
      React.createElement('div', { style: { padding: '0 20px' } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 } },
          React.createElement('h2', { style: { fontFamily: font, fontSize: 22, fontWeight: 700, color: t.text, letterSpacing: -0.3, margin: 0 } }, 'Recent Glimmers'),
          React.createElement('button', {
            onClick: () => setActiveScreen('explore'),
            style: { background: 'none', border: 'none', fontFamily: font, fontSize: 15, color: t.cta, fontWeight: 600, cursor: 'pointer' }
          }, 'See All')
        ),
        React.createElement('div', { style: { display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 4 } },
          glimmers.slice(0, 4).map((g, i) =>
            React.createElement('div', {
              key: g.id,
              onClick: () => { setSelectedGlimmer(g); setActiveScreen('player'); },
              style: {
                minWidth: 140, height: 180, borderRadius: 16, background: g.gradient,
                position: 'relative', overflow: 'hidden', cursor: 'pointer', flexShrink: 0,
                animation: `slideUp 0.4s ease ${i * 0.08}s both`,
                transition: 'transform 0.2s',
              }
            },
              React.createElement('div', { style: { position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent 60%)' } }),
              React.createElement('div', { style: { position: 'absolute', bottom: 12, left: 12, right: 12 } },
                React.createElement('p', { style: { fontFamily: font, fontSize: 14, fontWeight: 600, color: '#fff', margin: 0 } }, g.title),
                React.createElement('p', { style: { fontFamily: font, fontSize: 12, color: 'rgba(255,255,255,0.7)', margin: '3px 0 0' } }, g.time)
              )
            )
          )
        )
      ),

      // Active Soundscape
      React.createElement('div', { style: { margin: '20px 20px 0', padding: '16px 18px', borderRadius: 16, background: t.card, border: `1px solid ${t.cardBorder}` } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12 } },
            React.createElement('div', { style: { width: 40, height: 40, borderRadius: 12, background: `linear-gradient(135deg, ${t.secondary}, ${t.primary})`, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
              createIcon(icons.Volume2, { size: 18, color: t.cta })
            ),
            React.createElement('div', null,
              React.createElement('p', { style: { fontFamily: font, fontSize: 15, fontWeight: 600, color: t.text, margin: 0 } }, 'Ambient Sound'),
              React.createElement('p', { style: { fontFamily: font, fontSize: 13, color: t.textTertiary, margin: 0 } }, soundscapes.find(s => s.id === activeSound)?.name)
            )
          ),
          React.createElement('button', {
            onClick: () => setIsPlaying(!isPlaying),
            style: {
              width: 44, height: 44, borderRadius: '50%', border: 'none', cursor: 'pointer',
              background: t.cta, display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: isPlaying ? '0 0 16px rgba(225,29,72,0.5)' : 'none',
              transition: 'box-shadow 0.3s',
            }
          }, createIcon(isPlaying ? icons.Pause : icons.Play, { size: 18, color: '#fff' }))
        )
      ),

      // Serenity Prompt Modal
      showPrompt && React.createElement('div', {
        style: { position: 'absolute', inset: 0, background: t.overlay, backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, animation: 'fadeIn 0.3s ease' }
      },
        React.createElement('div', { style: { background: t.card, borderRadius: 24, padding: 24, margin: 20, width: '100%', border: `1px solid ${t.cardBorder}` } },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 } },
            React.createElement('h3', { style: { fontFamily: font, fontSize: 20, fontWeight: 700, color: t.text, margin: 0 } }, 'Daily Reflection'),
            React.createElement('button', { onClick: () => setShowPrompt(false), style: { background: 'none', border: 'none', cursor: 'pointer', padding: 4 } },
              createIcon(icons.X, { size: 20, color: t.textSecondary })
            )
          ),
          React.createElement('p', { style: { fontFamily: font, fontSize: 17, color: t.textSecondary, margin: '0 0 16px', lineHeight: 1.5 } }, 'What brought you peace today? We\'ll search your camera roll and create a Glimmer from it.'),
          React.createElement('textarea', {
            value: serenityAnswer, onChange: (e) => setSerenityAnswer(e.target.value),
            placeholder: 'A quiet walk through the park...',
            style: {
              width: '100%', height: 80, borderRadius: 12, border: `1px solid ${t.cardBorder}`,
              background: t.surfaceLight, color: t.text, fontFamily: font, fontSize: 15,
              padding: 12, resize: 'none', outline: 'none', boxSizing: 'border-box',
            }
          }),
          React.createElement('button', {
            onClick: () => { setShowPrompt(false); setSerenityAnswer(''); },
            style: {
              width: '100%', marginTop: 12, padding: '14px', borderRadius: 14, border: 'none',
              background: t.cta, color: '#fff', fontFamily: font, fontSize: 17, fontWeight: 600,
              cursor: 'pointer',
            }
          }, 'Generate Glimmer')
        )
      )
    );
  }

  // ========== EXPLORE SCREEN ==========
  function ExploreScreen() {
    const [selectedTab, setSelectedTab] = useState('all');
    const tabs = ['all', 'peaceful', 'dreamy', 'refreshing', 'grounding'];

    return React.createElement('div', { style: { padding: '0 0 20px', animation: 'fadeIn 0.4s ease' } },
      // Header
      React.createElement('div', { style: { padding: '16px 20px 12px' } },
        React.createElement('h1', { style: { fontFamily: font, fontSize: 28, fontWeight: 800, color: t.text, letterSpacing: -0.5, margin: 0 } }, 'Explore'),
        React.createElement('p', { style: { fontFamily: font, fontSize: 15, color: t.textTertiary, margin: '4px 0 0' } }, 'Discover new Glimmer styles')
      ),

      // Mood filter tabs
      React.createElement('div', { style: { display: 'flex', gap: 8, padding: '0 20px 16px', overflowX: 'auto' } },
        tabs.map(tab =>
          React.createElement('button', {
            key: tab, onClick: () => setSelectedTab(tab),
            style: {
              padding: '8px 16px', borderRadius: 20, border: 'none', cursor: 'pointer', flexShrink: 0,
              background: selectedTab === tab ? t.cta : t.surfaceLight,
              color: selectedTab === tab ? '#fff' : t.textSecondary,
              fontFamily: font, fontSize: 14, fontWeight: 600, transition: 'all 0.2s',
              textTransform: 'capitalize',
            }
          }, tab)
        )
      ),

      // Mood Palettes Section
      React.createElement('div', { style: { padding: '0 20px', marginBottom: 20 } },
        React.createElement('h2', { style: { fontFamily: font, fontSize: 20, fontWeight: 700, color: t.text, margin: '0 0 12px' } }, 'Mood Palettes'),
        React.createElement('div', { style: { display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 4 } },
          palettes.map((p, i) =>
            React.createElement('div', {
              key: p.id,
              onClick: () => setActivePalette(p.id),
              style: {
                minWidth: 130, padding: 14, borderRadius: 16, cursor: 'pointer',
                background: t.card, border: `2px solid ${activePalette === p.id ? t.cta : t.cardBorder}`,
                transition: 'all 0.2s', flexShrink: 0,
                animation: `slideUp 0.4s ease ${i * 0.06}s both`,
              }
            },
              React.createElement('div', { style: { display: 'flex', gap: 4, marginBottom: 10 } },
                p.colors.map((c, j) =>
                  React.createElement('div', { key: j, style: { width: 24, height: 24, borderRadius: 8, background: c } })
                )
              ),
              React.createElement('p', { style: { fontFamily: font, fontSize: 14, fontWeight: 600, color: t.text, margin: 0 } }, p.name),
              React.createElement('p', { style: { fontFamily: font, fontSize: 12, color: t.textTertiary, margin: '3px 0 0' } }, p.desc)
            )
          )
        )
      ),

      // Glimmer Grid
      React.createElement('div', { style: { padding: '0 20px' } },
        React.createElement('h2', { style: { fontFamily: font, fontSize: 20, fontWeight: 700, color: t.text, margin: '0 0 12px' } }, 'All Glimmers'),
        React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 } },
          glimmers.filter(g => selectedTab === 'all' || g.mood === selectedTab).map((g, i) =>
            React.createElement('div', {
              key: g.id,
              onClick: () => { setSelectedGlimmer(g); setActiveScreen('player'); },
              style: {
                borderRadius: 16, height: 160, background: g.gradient,
                position: 'relative', overflow: 'hidden', cursor: 'pointer',
                animation: `slideUp 0.4s ease ${i * 0.06}s both`,
                transition: 'transform 0.2s',
              }
            },
              React.createElement('div', { style: { position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.55), transparent 50%)' } }),
              savedGlimmers.includes(g.id) && React.createElement('div', { style: { position: 'absolute', top: 10, right: 10 } },
                createIcon(icons.Heart, { size: 16, color: t.cta })
              ),
              React.createElement('div', { style: { position: 'absolute', bottom: 12, left: 12, right: 12 } },
                React.createElement('p', { style: { fontFamily: font, fontSize: 14, fontWeight: 600, color: '#fff', margin: 0 } }, g.title),
                React.createElement('div', { style: { display: 'flex', gap: 6, marginTop: 4, alignItems: 'center' } },
                  React.createElement('span', { style: { fontFamily: font, fontSize: 11, color: 'rgba(255,255,255,0.8)', background: 'rgba(255,255,255,0.15)', padding: '2px 8px', borderRadius: 10 } }, g.mood),
                  React.createElement('span', { style: { fontFamily: font, fontSize: 11, color: 'rgba(255,255,255,0.7)' } }, g.duration)
                )
              )
            )
          )
        )
      ),

      // Generate New
      React.createElement('div', { style: { padding: '20px 20px 0' } },
        React.createElement('button', {
          onClick: () => setShowPrompt(true),
          style: {
            width: '100%', padding: 16, borderRadius: 16, border: `2px dashed ${t.cardBorder}`,
            background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center',
            justifyContent: 'center', gap: 10, transition: 'all 0.2s',
          }
        },
          createIcon(icons.Plus, { size: 20, color: t.cta }),
          React.createElement('span', { style: { fontFamily: font, fontSize: 15, fontWeight: 600, color: t.cta } }, 'Create New Glimmer')
        )
      )
    );
  }

  // ========== PLAYER SCREEN ==========
  function PlayerScreen() {
    const [progress, setProgress] = useState(0);
    const [showControls, setShowControls] = useState(true);
    const glimmer = selectedGlimmer || glimmers[0];
    const isSaved = savedGlimmers.includes(glimmer.id);

    useEffect(() => {
      if (!isPlaying) return;
      const interval = setInterval(() => {
        setProgress(p => p >= 100 ? 0 : p + 0.5);
      }, 50);
      return () => clearInterval(interval);
    }, [isPlaying]);

    return React.createElement('div', {
      onClick: () => setShowControls(!showControls),
      style: { position: 'relative', height: '100%', minHeight: 700, background: glimmer.gradient, animation: 'fadeIn 0.5s ease' }
    },
      // Animated overlay circles
      React.createElement('div', { style: { position: 'absolute', top: 80, left: 30, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.06)', animation: 'breathe 4s ease infinite' } }),
      React.createElement('div', { style: { position: 'absolute', bottom: 200, right: 20, width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', animation: 'float 5s ease infinite' } }),
      React.createElement('div', { style: { position: 'absolute', top: 200, right: 50, width: 50, height: 50, borderRadius: '50%', background: 'rgba(255,255,255,0.04)', animation: 'breathe 6s ease infinite 1s' } }),

      // Dark gradient overlay
      React.createElement('div', { style: { position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 30%, transparent 60%, rgba(0,0,0,0.7) 100%)' } }),

      // Top controls
      showControls && React.createElement('div', {
        style: { position: 'absolute', top: 0, left: 0, right: 0, padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', animation: 'fadeIn 0.3s ease', zIndex: 10 }
      },
        React.createElement('button', {
          onClick: (e) => { e.stopPropagation(); setActiveScreen('home'); setIsPlaying(false); setProgress(0); },
          style: { width: 44, height: 44, borderRadius: 14, background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }
        }, createIcon(icons.ChevronLeft, { size: 22, color: '#fff' })),
        React.createElement('div', { style: { display: 'flex', gap: 10 } },
          React.createElement('button', {
            onClick: (e) => { e.stopPropagation(); setSavedGlimmers(prev => isSaved ? prev.filter(id => id !== glimmer.id) : [...prev, glimmer.id]); },
            style: { width: 44, height: 44, borderRadius: 14, background: isSaved ? 'rgba(225,29,72,0.3)' : 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }
          }, createIcon(icons.Heart, { size: 20, color: isSaved ? '#E11D48' : '#fff' })),
          React.createElement('button', {
            onClick: (e) => e.stopPropagation(),
            style: { width: 44, height: 44, borderRadius: 14, background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }
          }, createIcon(icons.Share2, { size: 20, color: '#fff' }))
        )
      ),

      // Center play/pause
      showControls && React.createElement('div', {
        style: { position: 'absolute', top: '42%', left: '50%', transform: 'translate(-50%,-50%)', zIndex: 10, animation: 'fadeIn 0.3s ease' }
      },
        React.createElement('button', {
          onClick: (e) => { e.stopPropagation(); setIsPlaying(!isPlaying); },
          style: {
            width: 72, height: 72, borderRadius: '50%', border: 'none', cursor: 'pointer',
            background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(16px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            animation: isPlaying ? 'ripple 1.5s ease infinite' : 'none',
          }
        }, createIcon(isPlaying ? icons.Pause : icons.Play, { size: 32, color: '#fff' }))
      ),

      // Bottom info
      showControls && React.createElement('div', {
        style: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: '24px 20px 24px', animation: 'slideUp 0.3s ease', zIndex: 10 }
      },
        React.createElement('p', { style: { fontFamily: font, fontSize: 26, fontWeight: 800, color: '#fff', margin: 0, letterSpacing: -0.5 } }, glimmer.title),
        React.createElement('div', { style: { display: 'flex', gap: 10, marginTop: 8, alignItems: 'center' } },
          React.createElement('span', { style: { fontFamily: font, fontSize: 13, color: 'rgba(255,255,255,0.8)', background: 'rgba(255,255,255,0.15)', padding: '4px 12px', borderRadius: 20 } }, glimmer.mood),
          React.createElement('span', { style: { fontFamily: font, fontSize: 13, color: 'rgba(255,255,255,0.7)' } }, `${glimmer.photos} photos`),
          React.createElement('span', { style: { fontFamily: font, fontSize: 13, color: 'rgba(255,255,255,0.7)' } }, glimmer.duration)
        ),

        // Soundscape selector
        React.createElement('div', { style: { display: 'flex', gap: 8, marginTop: 16, overflowX: 'auto' } },
          soundscapes.map(s =>
            React.createElement('button', {
              key: s.id,
              onClick: (e) => { e.stopPropagation(); setActiveSound(s.id); },
              style: {
                padding: '8px 14px', borderRadius: 20, border: 'none', cursor: 'pointer', flexShrink: 0,
                background: activeSound === s.id ? 'rgba(225,29,72,0.5)' : 'rgba(255,255,255,0.12)',
                display: 'flex', alignItems: 'center', gap: 6, transition: 'all 0.2s',
              }
            },
              createIcon(s.icon, { size: 14, color: '#fff' }),
              React.createElement('span', { style: { fontFamily: font, fontSize: 12, color: '#fff', fontWeight: 500 } }, s.name)
            )
          )
        ),

        // Progress bar
        React.createElement('div', { style: { marginTop: 16, height: 3, borderRadius: 2, background: 'rgba(255,255,255,0.2)', overflow: 'hidden' } },
          React.createElement('div', { style: { height: '100%', width: `${progress}%`, background: '#E11D48', borderRadius: 2, transition: 'width 0.05s linear' } })
        )
      )
    );
  }

  // ========== SANCTUARY SCREEN ==========
  function SanctuaryScreen() {
    const saved = glimmers.filter(g => savedGlimmers.includes(g.id));

    return React.createElement('div', { style: { padding: '0 0 20px', animation: 'fadeIn 0.4s ease' } },
      React.createElement('div', { style: { padding: '16px 20px 12px' } },
        React.createElement('h1', { style: { fontFamily: font, fontSize: 28, fontWeight: 800, color: t.text, letterSpacing: -0.5, margin: 0 } }, 'Sanctuary'),
        React.createElement('p', { style: { fontFamily: font, fontSize: 15, color: t.textTertiary, margin: '4px 0 0' } }, 'Your saved moments of peace')
      ),

      // Stats row
      React.createElement('div', { style: { display: 'flex', gap: 12, padding: '8px 20px 20px' } },
        [
          { label: 'Saved', value: saved.length, icon: icons.Heart },
          { label: 'Minutes', value: '4.2', icon: icons.Clock },
          { label: 'Streak', value: '7d', icon: icons.Flame },
        ].map((stat, i) =>
          React.createElement('div', {
            key: i,
            style: {
              flex: 1, padding: 14, borderRadius: 16, background: t.card,
              border: `1px solid ${t.cardBorder}`, textAlign: 'center',
              animation: `slideUp 0.4s ease ${i * 0.08}s both`,
            }
          },
            React.createElement('div', { style: { display: 'flex', justifyContent: 'center', marginBottom: 6 } },
              createIcon(stat.icon, { size: 18, color: t.cta })
            ),
            React.createElement('p', { style: { fontFamily: font, fontSize: 22, fontWeight: 700, color: t.text, margin: 0 } }, stat.value),
            React.createElement('p', { style: { fontFamily: font, fontSize: 12, color: t.textTertiary, margin: '2px 0 0' } }, stat.label)
          )
        )
      ),

      // Saved Glimmers
      saved.length > 0 ? React.createElement('div', { style: { padding: '0 20px' } },
        saved.map((g, i) =>
          React.createElement('div', {
            key: g.id,
            onClick: () => { setSelectedGlimmer(g); setActiveScreen('player'); },
            style: {
              display: 'flex', gap: 14, padding: 14, borderRadius: 16, marginBottom: 12,
              background: t.card, border: `1px solid ${t.cardBorder}`, cursor: 'pointer',
              animation: `slideUp 0.4s ease ${i * 0.06}s both`, transition: 'transform 0.2s',
            }
          },
            React.createElement('div', { style: { width: 72, height: 72, borderRadius: 14, background: g.gradient, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
              createIcon(icons.Play, { size: 20, color: '#fff' })
            ),
            React.createElement('div', { style: { flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' } },
              React.createElement('p', { style: { fontFamily: font, fontSize: 16, fontWeight: 600, color: t.text, margin: 0 } }, g.title),
              React.createElement('div', { style: { display: 'flex', gap: 8, marginTop: 4 } },
                React.createElement('span', { style: { fontFamily: font, fontSize: 12, color: t.textTertiary } }, g.mood),
                React.createElement('span', { style: { fontFamily: font, fontSize: 12, color: t.textTertiary } }, g.duration)
              ),
              React.createElement('p', { style: { fontFamily: font, fontSize: 12, color: t.textTertiary, margin: '4px 0 0' } }, g.time)
            ),
            React.createElement('div', { style: { display: 'flex', alignItems: 'center' } },
              createIcon(icons.Heart, { size: 18, color: t.cta })
            )
          )
        )
      ) : React.createElement('div', { style: { padding: '40px 20px', textAlign: 'center' } },
        createIcon(icons.Heart, { size: 48, color: t.textTertiary }),
        React.createElement('p', { style: { fontFamily: font, fontSize: 17, color: t.textSecondary, marginTop: 12 } }, 'No saved Glimmers yet'),
        React.createElement('p', { style: { fontFamily: font, fontSize: 14, color: t.textTertiary, marginTop: 4 } }, 'Tap the heart on any Glimmer to save it here')
      ),

      // Weekly calm chart
      React.createElement('div', { style: { margin: '8px 20px 0', padding: 18, borderRadius: 16, background: t.card, border: `1px solid ${t.cardBorder}` } },
        React.createElement('p', { style: { fontFamily: font, fontSize: 16, fontWeight: 600, color: t.text, margin: '0 0 14px' } }, 'Weekly Calm Minutes'),
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', height: 80, gap: 6 } },
          ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => {
            const heights = [40, 55, 30, 70, 45, 80, 60];
            return React.createElement('div', { key: day, style: { flex: 1, textAlign: 'center' } },
              React.createElement('div', {
                style: {
                  height: heights[i], borderRadius: 6, margin: '0 auto',
                  background: i === 5 ? t.cta : `${t.cta}40`,
                  width: '70%', transition: 'height 0.3s',
                  animation: `slideUp 0.5s ease ${i * 0.05}s both`,
                }
              }),
              React.createElement('p', { style: { fontFamily: font, fontSize: 11, color: t.textTertiary, margin: '6px 0 0' } }, day)
            );
          })
        )
      )
    );
  }

  // ========== SETTINGS SCREEN ==========
  function SettingsScreen() {
    const [haptics, setHaptics] = useState(true);
    const [autoGenerate, setAutoGenerate] = useState(true);
    const [notifications, setNotifications] = useState(true);

    const Toggle = ({ value, onToggle }) =>
      React.createElement('button', {
        onClick: onToggle,
        style: {
          width: 51, height: 31, borderRadius: 16, border: 'none', cursor: 'pointer', padding: 2,
          background: value ? t.cta : t.surfaceLight, transition: 'background 0.2s', position: 'relative',
        }
      },
        React.createElement('div', {
          style: {
            width: 27, height: 27, borderRadius: '50%', background: '#fff',
            transform: value ? 'translateX(20px)' : 'translateX(0)',
            transition: 'transform 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
          }
        })
      );

    const SettingsRow = ({ icon, label, right, onClick }) =>
      React.createElement('div', {
        onClick: onClick,
        style: {
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '14px 0', borderBottom: `1px solid ${t.cardBorder}`, cursor: onClick ? 'pointer' : 'default',
        }
      },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12 } },
          React.createElement('div', { style: { width: 36, height: 36, borderRadius: 10, background: t.surfaceLight, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
            createIcon(icon, { size: 18, color: t.cta })
          ),
          React.createElement('span', { style: { fontFamily: font, fontSize: 16, color: t.text } }, label)
        ),
        right || createIcon(icons.ChevronRight, { size: 18, color: t.textTertiary })
      );

    return React.createElement('div', { style: { padding: '0 0 20px', animation: 'fadeIn 0.4s ease' } },
      React.createElement('div', { style: { padding: '16px 20px 12px' } },
        React.createElement('h1', { style: { fontFamily: font, fontSize: 28, fontWeight: 800, color: t.text, letterSpacing: -0.5, margin: 0 } }, 'Settings'),
      ),

      // Profile card
      React.createElement('div', { style: { margin: '8px 20px 20px', padding: 18, borderRadius: 16, background: t.card, border: `1px solid ${t.cardBorder}`, display: 'flex', alignItems: 'center', gap: 14 } },
        React.createElement('div', { style: { width: 56, height: 56, borderRadius: '50%', background: `linear-gradient(135deg, ${t.cta}, ${t.secondary})`, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
          createIcon(icons.User, { size: 24, color: '#fff' })
        ),
        React.createElement('div', { style: { flex: 1 } },
          React.createElement('p', { style: { fontFamily: font, fontSize: 18, fontWeight: 600, color: t.text, margin: 0 } }, 'Alex'),
          React.createElement('p', { style: { fontFamily: font, fontSize: 14, color: t.textTertiary, margin: '2px 0 0' } }, '142 Glimmers created')
        ),
        createIcon(icons.ChevronRight, { size: 18, color: t.textTertiary })
      ),

      // Settings sections
      React.createElement('div', { style: { padding: '0 20px' } },
        React.createElement('p', { style: { fontFamily: font, fontSize: 13, fontWeight: 600, color: t.textTertiary, textTransform: 'uppercase', letterSpacing: 1, margin: '0 0 8px' } }, 'Preferences'),
        React.createElement('div', { style: { background: t.card, borderRadius: 16, padding: '0 16px', border: `1px solid ${t.cardBorder}`, marginBottom: 20 } },
          React.createElement(SettingsRow, { icon: isDark ? icons.Moon : icons.Sun, label: 'Dark Mode', right: React.createElement(Toggle, { value: isDark, onToggle: () => setIsDark(!isDark) }) }),
          React.createElement(SettingsRow, { icon: icons.Vibrate, label: 'Haptic Feedback', right: React.createElement(Toggle, { value: haptics, onToggle: () => setHaptics(!haptics) }) }),
          React.createElement(SettingsRow, { icon: icons.Wand2, label: 'Auto-Generate Daily', right: React.createElement(Toggle, { value: autoGenerate, onToggle: () => setAutoGenerate(!autoGenerate) }) }),
          React.createElement(SettingsRow, { icon: icons.Bell, label: 'Notifications', right: React.createElement(Toggle, { value: notifications, onToggle: () => setNotifications(!notifications) }) })
        ),

        React.createElement('p', { style: { fontFamily: font, fontSize: 13, fontWeight: 600, color: t.textTertiary, textTransform: 'uppercase', letterSpacing: 1, margin: '0 0 8px' } }, 'Content'),
        React.createElement('div', { style: { background: t.card, borderRadius: 16, padding: '0 16px', border: `1px solid ${t.cardBorder}`, marginBottom: 20 } },
          React.createElement(SettingsRow, { icon: icons.Image, label: 'Photo Library Access' }),
          React.createElement(SettingsRow, { icon: icons.Music, label: 'Sound Library' }),
          React.createElement(SettingsRow, { icon: icons.Palette, label: 'Custom Palettes' }),
          React.createElement(SettingsRow, { icon: icons.Download, label: 'Export Glimmers' })
        ),

        React.createElement('p', { style: { fontFamily: font, fontSize: 13, fontWeight: 600, color: t.textTertiary, textTransform: 'uppercase', letterSpacing: 1, margin: '0 0 8px' } }, 'About'),
        React.createElement('div', { style: { background: t.card, borderRadius: 16, padding: '0 16px', border: `1px solid ${t.cardBorder}` } },
          React.createElement(SettingsRow, { icon: icons.HelpCircle, label: 'Help & Support' }),
          React.createElement(SettingsRow, { icon: icons.Shield, label: 'Privacy Policy' }),
          React.createElement(SettingsRow, { icon: icons.Info, label: 'Version 1.0.0', right: React.createElement('span', { style: { fontFamily: font, fontSize: 14, color: t.textTertiary } }, 'v1.0.0') })
        )
      )
    );
  }

  // ========== BOTTOM TABS ==========
  const tabs = [
    { id: 'home', label: 'Home', icon: icons.Home },
    { id: 'explore', label: 'Explore', icon: icons.Compass },
    { id: 'sanctuary', label: 'Sanctuary', icon: icons.Heart },
    { id: 'settings', label: 'Settings', icon: icons.Settings },
  ];

  const screens = {
    home: HomeScreen,
    explore: ExploreScreen,
    player: PlayerScreen,
    sanctuary: SanctuaryScreen,
    settings: SettingsScreen,
  };

  const isPlayerScreen = activeScreen === 'player';

  return React.createElement('div', { style: { minHeight: '100vh', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px 0' } },
    styleTag,
    React.createElement('div', {
      style: {
        width: 375, height: 812, borderRadius: 44, overflow: 'hidden', position: 'relative',
        background: t.bg, boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        display: 'flex', flexDirection: 'column',
      }
    },
      // Scrollable content
      React.createElement('div', {
        style: {
          flex: 1, overflowY: 'auto', overflowX: 'hidden',
          paddingTop: isPlayerScreen ? 0 : 8,
          paddingBottom: isPlayerScreen ? 0 : 80,
        }
      },
        React.createElement(screens[activeScreen])
      ),

      // Bottom Tab Bar
      !isPlayerScreen && React.createElement('div', {
        style: {
          position: 'absolute', bottom: 0, left: 0, right: 0,
          background: isDark ? 'rgba(15,15,35,0.92)' : 'rgba(255,255,255,0.92)',
          backdropFilter: 'blur(20px)',
          borderTop: `1px solid ${t.cardBorder}`,
          display: 'flex', justifyContent: 'space-around', alignItems: 'center',
          padding: '8px 0 24px', height: 56,
        }
      },
        tabs.map(tab =>
          React.createElement('button', {
            key: tab.id,
            onClick: () => setActiveScreen(tab.id),
            style: {
              background: 'none', border: 'none', cursor: 'pointer',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
              padding: '4px 16px', minWidth: 44, minHeight: 44,
              transition: 'all 0.2s',
            }
          },
            createIcon(tab.icon, {
              size: 22,
              color: activeScreen === tab.id ? t.cta : t.textTertiary,
              strokeWidth: activeScreen === tab.id ? 2.2 : 1.6,
            }),
            React.createElement('span', {
              style: {
                fontFamily: font, fontSize: 11, fontWeight: activeScreen === tab.id ? 600 : 400,
                color: activeScreen === tab.id ? t.cta : t.textTertiary,
              }
            }, tab.label)
          )
        )
      )
    )
  );
}
