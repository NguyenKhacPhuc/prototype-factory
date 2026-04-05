const { useState, useEffect, useRef, useCallback } = React;

const themes = {
  light: {
    bg: '#F8F7FF',
    surface: '#FFFFFF',
    surfaceAlt: '#F0EEFF',
    primary: '#0F0F23',
    secondary: '#1E1B4B',
    accent: '#E11D48',
    accentLight: '#FFE4EA',
    text: '#0F0F23',
    textSecondary: '#4B4869',
    textMuted: '#8B87A8',
    border: '#E8E5FF',
    cardBg: '#FFFFFF',
    navBg: '#FFFFFF',
    navBorder: '#E8E5FF',
    inputBg: '#F0EEFF',
    tagBg: '#EDE9FF',
    tagText: '#4C1D95',
    shimmer: 'linear-gradient(90deg, #F0EEFF 25%, #E8E5FF 50%, #F0EEFF 75%)',
  },
  dark: {
    bg: '#000000',
    surface: '#0F0F23',
    surfaceAlt: '#1E1B4B',
    primary: '#E8E5FF',
    secondary: '#C4BFFF',
    accent: '#E11D48',
    accentLight: '#3D0B1A',
    text: '#F0EEFF',
    textSecondary: '#C4BFFF',
    textMuted: '#6B6890',
    border: '#2A2750',
    cardBg: '#0F0F23',
    navBg: '#0F0F23',
    navBorder: '#2A2750',
    inputBg: '#1E1B4B',
    tagBg: '#2D1B4E',
    tagText: '#C4BFFF',
    shimmer: 'linear-gradient(90deg, #1E1B4B 25%, #2A2750 50%, #1E1B4B 75%)',
  },
};

const moodPresets = [
  {
    id: 'serene-dawn',
    name: 'Serene Dawn',
    subtitle: 'Gentle beginnings',
    gradient: 'linear-gradient(135deg, #FDE68A 0%, #FCA5A5 50%, #C4B5FD 100%)',
    icon: 'Sunrise',
    duration: '2:30',
    color: '#F59E0B',
  },
  {
    id: 'reflective-haze',
    name: 'Reflective Haze',
    subtitle: 'Inward clarity',
    gradient: 'linear-gradient(135deg, #A5B4FC 0%, #6EE7B7 50%, #BAE6FD 100%)',
    icon: 'Waves',
    duration: '3:15',
    color: '#6366F1',
  },
  {
    id: 'grounding-glimpse',
    name: 'Grounding Glimpse',
    subtitle: 'Earth & stillness',
    gradient: 'linear-gradient(135deg, #6EE7B7 0%, #A7F3D0 50%, #D1FAE5 100%)',
    icon: 'Leaf',
    duration: '2:45',
    color: '#10B981',
  },
  {
    id: 'twilight-rest',
    name: 'Twilight Rest',
    subtitle: 'Letting go',
    gradient: 'linear-gradient(135deg, #1E1B4B 0%, #4C1D95 50%, #7C3AED 100%)',
    icon: 'Moon',
    duration: '4:00',
    color: '#7C3AED',
  },
  {
    id: 'soft-focus',
    name: 'Soft Focus',
    subtitle: 'Gentle presence',
    gradient: 'linear-gradient(135deg, #FCE7F3 0%, #FDE68A 50%, #D1FAE5 100%)',
    icon: 'Aperture',
    duration: '2:00',
    color: '#EC4899',
  },
];

const soundscapes = [
  { id: 'rainfall', name: 'Rainfall', icon: 'CloudRain', bpm: '♩ 60 BPM', active: true },
  { id: 'forest', name: 'Forest', icon: 'TreePine', bpm: '♩ 52 BPM', active: false },
  { id: 'ocean', name: 'Ocean Drift', icon: 'Waves', bpm: '♩ 48 BPM', active: false },
  { id: 'cosmos', name: 'Cosmos', icon: 'Sparkles', bpm: '♩ 55 BPM', active: false },
];

const visualPrompts = [
  { id: 1, theme: 'Soft Textures', description: 'Wool, linen, petals', color: '#FDE68A', icon: 'Layers' },
  { id: 2, theme: 'Warm Lights', description: 'Candles, golden hour', color: '#FCA5A5', icon: 'Sun' },
  { id: 3, theme: 'Repeated Patterns', description: 'Tiles, leaves, waves', color: '#A5B4FC', icon: 'Grid' },
  { id: 4, theme: 'Negative Space', description: 'Stillness, emptiness', color: '#6EE7B7', icon: 'Circle' },
  { id: 5, theme: 'Water Reflections', description: 'Puddles, pools, rain', color: '#BAE6FD', icon: 'Droplets' },
  { id: 6, theme: 'Minimalist Frames', description: 'Clean lines, silence', color: '#DDD6FE', icon: 'Square' },
];

const recentCreations = [
  { id: 1, title: 'Morning Walk', mood: 'Serene Dawn', date: 'Today', duration: '2:12', gradient: 'linear-gradient(135deg, #FDE68A 0%, #FCA5A5 100%)' },
  { id: 2, title: 'Garden Quiet', mood: 'Grounding Glimpse', date: 'Yesterday', duration: '3:01', gradient: 'linear-gradient(135deg, #6EE7B7 0%, #A7F3D0 100%)' },
  { id: 3, title: 'Evening Light', mood: 'Reflective Haze', date: '2 days ago', duration: '2:45', gradient: 'linear-gradient(135deg, #A5B4FC 0%, #6EE7B7 100%)' },
];

const harmonyColors = ['#FDE68A', '#FCA5A5', '#A5B4FC', '#6EE7B7', '#BAE6FD', '#DDD6FE', '#FECACA', '#BBF7D0'];

function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [isDark, setIsDark] = useState(false);
  const [theme, setTheme] = useState(themes.light);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedMood, setSelectedMood] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isCreating, setIsCreating] = useState(false);
  const [activeSoundscape, setActiveSoundscape] = useState('rainfall');
  const [selectedPrompts, setSelectedPrompts] = useState([]);
  const [animating, setAnimating] = useState(false);
  const [activeTab, setActiveTab] = useState('home');

  useEffect(() => {
    setTheme(isDark ? themes.dark : themes.light);
  }, [isDark]);

  const navigate = (screen) => {
    setAnimating(true);
    setTimeout(() => {
      setActiveScreen(screen);
      setActiveTab(screen);
      setAnimating(false);
    }, 150);
  };

  const screens = {
    home: HomeScreen,
    create: CreateScreen,
    explore: ExploreScreen,
    profile: ProfileScreen,
  };

  const ActiveScreen = screens[activeScreen] || HomeScreen;

  const styleTag = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(12px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes pulse {
      0%, 100% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.05); opacity: 0.8; }
    }
    @keyframes shimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }
    @keyframes breathe {
      0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(225,29,72,0.4); }
      50% { transform: scale(1.02); box-shadow: 0 0 0 12px rgba(225,29,72,0); }
    }
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-6px); }
    }
    @keyframes waveform {
      0%, 100% { height: 4px; }
      50% { height: 16px; }
    }
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    @keyframes progressFill {
      from { width: 0%; }
      to { width: 100%; }
    }
    * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
    ::-webkit-scrollbar { display: none; }
    body { margin: 0; font-family: 'Inter', sans-serif; }
  `;

  function HomeScreen() {
    const [activePreset, setActivePreset] = useState(null);
    const [scrollY, setScrollY] = useState(0);
    const scrollRef = useRef(null);

    const handleScroll = (e) => {
      setScrollY(e.target.scrollTop);
    };

    return React.createElement('div', {
      style: { height: '100%', overflowY: 'auto', background: theme.bg, fontFamily: 'Inter, sans-serif' },
      onScroll: handleScroll,
      ref: scrollRef,
    },
      // Hero Section
      React.createElement('div', {
        style: {
          padding: '24px 20px 20px',
          background: isDark
            ? 'linear-gradient(180deg, #1E1B4B 0%, #0F0F23 100%)'
            : 'linear-gradient(180deg, #EDE9FF 0%, #F8F7FF 100%)',
          position: 'relative',
          overflow: 'hidden',
        }
      },
        // Decorative orbs
        React.createElement('div', { style: {
          position: 'absolute', top: -20, right: -20, width: 120, height: 120,
          borderRadius: '50%', background: 'rgba(225,29,72,0.08)',
          filter: 'blur(30px)',
        }}),
        React.createElement('div', { style: {
          position: 'absolute', bottom: 0, left: -30, width: 100, height: 100,
          borderRadius: '50%', background: 'rgba(99,102,241,0.1)',
          filter: 'blur(20px)',
        }}),

        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 } },
          React.createElement('div', null,
            React.createElement('p', { style: { margin: 0, fontSize: 12, color: theme.textMuted, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase' } }, 'Good Morning'),
            React.createElement('h1', { style: { margin: '2px 0 0', fontSize: 22, fontWeight: 700, color: theme.text, letterSpacing: '-0.5px' } }, 'Find your calm')
          ),
          React.createElement('button', {
            onClick: () => setIsDark(!isDark),
            style: {
              width: 40, height: 40, borderRadius: 12, border: 'none', cursor: 'pointer',
              background: theme.surface, display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)', transition: 'all 200ms',
            }
          },
            isDark
              ? React.createElement(window.lucide.Sun, { size: 18, color: theme.accent })
              : React.createElement(window.lucide.Moon, { size: 18, color: theme.secondary })
          )
        ),

        // Daily intention card
        React.createElement('div', {
          style: {
            background: isDark ? 'linear-gradient(135deg, #1E1B4B, #2D2A6E)' : 'linear-gradient(135deg, #0F0F23, #1E1B4B)',
            borderRadius: 20, padding: '18px 20px',
            animation: 'fadeIn 0.6s ease forwards',
            cursor: 'pointer',
            transition: 'transform 200ms',
          },
          onClick: () => navigate('create'),
        },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' } },
            React.createElement('div', null,
              React.createElement('p', { style: { margin: 0, fontSize: 11, color: 'rgba(196,191,255,0.7)', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase' } }, "Today's Intention"),
              React.createElement('h2', { style: { margin: '6px 0 4px', fontSize: 18, fontWeight: 700, color: '#F0EEFF', letterSpacing: '-0.3px' } }, 'Create a Moment'),
              React.createElement('p', { style: { margin: 0, fontSize: 13, color: 'rgba(196,191,255,0.7)', lineHeight: 1.4 } }, 'Turn 5 photos into a calming flow'),
            ),
            React.createElement('div', {
              style: {
                width: 48, height: 48, borderRadius: 14, background: theme.accent,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                animation: 'breathe 3s ease-in-out infinite',
                flexShrink: 0,
              }
            }, React.createElement(window.lucide.Plus, { size: 22, color: '#fff' }))
          ),
          React.createElement('div', { style: { display: 'flex', gap: 6, marginTop: 14, flexWrap: 'wrap' } },
            ['Peaceful', 'Reflective', 'Grounding'].map(tag =>
              React.createElement('span', {
                key: tag,
                style: {
                  fontSize: 11, padding: '4px 10px', borderRadius: 20,
                  background: 'rgba(196,191,255,0.15)', color: '#C4BFFF',
                  fontWeight: 500, border: '1px solid rgba(196,191,255,0.2)',
                }
              }, tag)
            )
          )
        )
      ),

      // Recent Creations
      React.createElement('div', { style: { padding: '20px 20px 8px' } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 } },
          React.createElement('h3', { style: { margin: 0, fontSize: 16, fontWeight: 700, color: theme.text, letterSpacing: '-0.3px' } }, 'Recent Creations'),
          React.createElement('button', {
            onClick: () => navigate('explore'),
            style: { background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, color: theme.accent, fontWeight: 600, padding: 0 }
          }, 'See all')
        ),
        React.createElement('div', { style: { display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 4 } },
          recentCreations.map((item, i) =>
            React.createElement('div', {
              key: item.id,
              style: {
                flexShrink: 0, width: 140, borderRadius: 16, overflow: 'hidden',
                boxShadow: isDark ? '0 4px 20px rgba(0,0,0,0.4)' : '0 4px 16px rgba(15,15,35,0.1)',
                animation: `slideUp 0.5s ease ${i * 0.1}s both`,
                cursor: 'pointer',
                transition: 'transform 200ms',
              },
              onMouseEnter: e => e.currentTarget.style.transform = 'scale(1.02)',
              onMouseLeave: e => e.currentTarget.style.transform = 'scale(1)',
            },
              React.createElement('div', { style: { height: 100, background: item.gradient, position: 'relative' } },
                React.createElement('div', { style: {
                  position: 'absolute', bottom: 8, right: 8, background: 'rgba(0,0,0,0.5)',
                  borderRadius: 6, padding: '2px 6px', fontSize: 10, color: '#fff', fontWeight: 600
                } }, item.duration),
                React.createElement('div', { style: {
                  position: 'absolute', top: 8, left: 8, background: 'rgba(0,0,0,0.3)',
                  borderRadius: 20, padding: '3px 8px', fontSize: 10, color: '#fff',
                  backdropFilter: 'blur(4px)',
                } }, item.mood)
              ),
              React.createElement('div', { style: { padding: '10px 12px', background: theme.surface } },
                React.createElement('p', { style: { margin: 0, fontSize: 13, fontWeight: 600, color: theme.text } }, item.title),
                React.createElement('p', { style: { margin: '2px 0 0', fontSize: 11, color: theme.textMuted } }, item.date)
              )
            )
          )
        )
      ),

      // Mood Presets
      React.createElement('div', { style: { padding: '12px 20px 8px' } },
        React.createElement('h3', { style: { margin: '0 0 14px', fontSize: 16, fontWeight: 700, color: theme.text, letterSpacing: '-0.3px' } }, 'Mood Presets'),
        moodPresets.map((preset, i) => {
          const Icon = window.lucide[preset.icon] || window.lucide.Sparkles;
          const isActive = activePreset === preset.id;
          return React.createElement('div', {
            key: preset.id,
            onClick: () => { setActivePreset(isActive ? null : preset.id); },
            style: {
              marginBottom: 10, borderRadius: 16, padding: '14px 16px',
              background: theme.surface, cursor: 'pointer',
              border: `1px solid ${isActive ? preset.color : theme.border}`,
              boxShadow: isActive ? `0 4px 20px ${preset.color}30` : isDark ? 'none' : '0 2px 8px rgba(15,15,35,0.06)',
              transition: 'all 250ms cubic-bezier(0.4,0,0.2,1)',
              animation: `fadeIn 0.5s ease ${i * 0.08}s both`,
              transform: isActive ? 'scale(1.01)' : 'scale(1)',
            }
          },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 14 } },
              React.createElement('div', { style: {
                width: 48, height: 48, borderRadius: 14, background: preset.gradient,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              } }, React.createElement(Icon, { size: 20, color: '#fff' })),
              React.createElement('div', { style: { flex: 1 } },
                React.createElement('p', { style: { margin: 0, fontSize: 14, fontWeight: 700, color: theme.text } }, preset.name),
                React.createElement('p', { style: { margin: '2px 0 0', fontSize: 12, color: theme.textMuted } }, preset.subtitle)
              ),
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6 } },
                React.createElement('span', { style: { fontSize: 12, color: theme.textMuted } }, preset.duration),
                React.createElement('div', {
                  onClick: (e) => { e.stopPropagation(); navigate('create'); },
                  style: {
                    width: 32, height: 32, borderRadius: 10, background: isActive ? preset.color : theme.surfaceAlt,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 200ms',
                  }
                }, React.createElement(window.lucide.Play, { size: 14, color: isActive ? '#fff' : theme.textMuted, fill: isActive ? '#fff' : 'none' }))
              )
            )
          );
        })
      ),

      React.createElement('div', { style: { height: 20 } })
    );
  }

  function CreateScreen() {
    const [step, setStep] = useState(1);
    const [chosenMood, setChosenMood] = useState(null);
    const [mediaCount, setMediaCount] = useState(0);
    const [generating, setGenerating] = useState(false);
    const [done, setDone] = useState(false);
    const [progress, setProgress] = useState(0);

    const startGeneration = () => {
      if (!chosenMood || mediaCount === 0) return;
      setGenerating(true);
      setProgress(0);
      const interval = setInterval(() => {
        setProgress(p => {
          if (p >= 100) {
            clearInterval(interval);
            setGenerating(false);
            setDone(true);
            return 100;
          }
          return p + 2;
        });
      }, 60);
    };

    const addMedia = () => setMediaCount(c => Math.min(c + 1, 9));

    if (done) {
      const preset = moodPresets.find(m => m.id === chosenMood);
      return React.createElement('div', { style: { height: '100%', background: theme.bg, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 28, fontFamily: 'Inter, sans-serif' } },
        React.createElement('div', { style: {
          width: 90, height: 90, borderRadius: 26, background: preset?.gradient || 'linear-gradient(135deg,#FDE68A,#FCA5A5)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: 24, animation: 'float 3s ease-in-out infinite',
          boxShadow: '0 20px 40px rgba(225,29,72,0.3)',
        } }, React.createElement(window.lucide.Sparkles, { size: 36, color: '#fff' })),
        React.createElement('h2', { style: { margin: '0 0 8px', fontSize: 24, fontWeight: 800, color: theme.text, textAlign: 'center', letterSpacing: '-0.5px' } }, 'Your Flow is Ready'),
        React.createElement('p', { style: { margin: '0 0 32px', fontSize: 14, color: theme.textSecondary, textAlign: 'center', lineHeight: 1.6 } },
          `${preset?.name} mood reel created with ${mediaCount} photos — 2:34 of calm`),
        React.createElement('button', {
          style: {
            width: '100%', padding: '16px', borderRadius: 16, border: 'none',
            background: theme.accent, color: '#fff', fontSize: 16, fontWeight: 700,
            cursor: 'pointer', marginBottom: 12, display: 'flex', alignItems: 'center',
            justifyContent: 'center', gap: 8,
          }
        }, React.createElement(window.lucide.Play, { size: 18, color: '#fff', fill: '#fff' }), React.createElement('span', null, 'Watch Your Reel')),
        React.createElement('button', {
          onClick: () => { setDone(false); setStep(1); setChosenMood(null); setMediaCount(0); },
          style: {
            width: '100%', padding: '14px', borderRadius: 16, border: `1px solid ${theme.border}`,
            background: 'transparent', color: theme.text, fontSize: 15, fontWeight: 600, cursor: 'pointer',
          }
        }, 'Create Another'),
      );
    }

    return React.createElement('div', { style: { height: '100%', overflowY: 'auto', background: theme.bg, fontFamily: 'Inter, sans-serif' } },
      // Header
      React.createElement('div', { style: { padding: '20px 20px 16px', borderBottom: `1px solid ${theme.border}` } },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 } },
          React.createElement('h2', { style: { margin: 0, fontSize: 20, fontWeight: 800, color: theme.text, letterSpacing: '-0.5px', flex: 1 } }, 'New Creation'),
          React.createElement('button', {
            onClick: () => setIsDark(!isDark),
            style: { width: 36, height: 36, borderRadius: 10, border: 'none', cursor: 'pointer', background: theme.surfaceAlt, display: 'flex', alignItems: 'center', justifyContent: 'center' }
          }, isDark ? React.createElement(window.lucide.Sun, { size: 16, color: theme.accent }) : React.createElement(window.lucide.Moon, { size: 16, color: theme.secondary }))
        ),
        // Steps
        React.createElement('div', { style: { display: 'flex', gap: 6 } },
          ['Select Mood', 'Add Media', 'Generate'].map((s, i) =>
            React.createElement('div', { key: s, style: { flex: 1, display: 'flex', flexDirection: 'column', gap: 4 } },
              React.createElement('div', { style: {
                height: 3, borderRadius: 2,
                background: step > i ? theme.accent : step === i + 1 ? theme.accent : theme.border,
                opacity: step > i ? 1 : step === i + 1 ? 1 : 0.3,
                transition: 'all 300ms',
              }}),
              React.createElement('p', { style: { margin: 0, fontSize: 10, color: step === i + 1 ? theme.accent : theme.textMuted, fontWeight: step === i + 1 ? 600 : 400 } }, s)
            )
          )
        )
      ),

      React.createElement('div', { style: { padding: 20 } },
        // Step 1: Mood
        step >= 1 && React.createElement('div', { style: { marginBottom: 24, animation: 'fadeIn 0.4s ease' } },
          React.createElement('h3', { style: { margin: '0 0 12px', fontSize: 15, fontWeight: 700, color: theme.text } }, '1. Choose your emotional intention'),
          React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 } },
            moodPresets.map(preset => {
              const Icon = window.lucide[preset.icon] || window.lucide.Sparkles;
              const isChosen = chosenMood === preset.id;
              return React.createElement('div', {
                key: preset.id,
                onClick: () => { setChosenMood(preset.id); if (step === 1) setStep(2); },
                style: {
                  borderRadius: 14, padding: 12, cursor: 'pointer',
                  border: `2px solid ${isChosen ? preset.color : theme.border}`,
                  background: isChosen ? (isDark ? `${preset.color}18` : `${preset.color}12`) : theme.surface,
                  transition: 'all 200ms',
                  transform: isChosen ? 'scale(1.02)' : 'scale(1)',
                }
              },
                React.createElement('div', { style: {
                  width: 36, height: 36, borderRadius: 10, background: preset.gradient,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 8
                } }, React.createElement(Icon, { size: 16, color: '#fff' })),
                React.createElement('p', { style: { margin: 0, fontSize: 12, fontWeight: 700, color: theme.text } }, preset.name),
                React.createElement('p', { style: { margin: '2px 0 0', fontSize: 11, color: theme.textMuted } }, preset.subtitle)
              );
            })
          )
        ),

        // Step 2: Media
        step >= 2 && React.createElement('div', { style: { marginBottom: 24, animation: 'slideUp 0.4s ease' } },
          React.createElement('h3', { style: { margin: '0 0 12px', fontSize: 15, fontWeight: 700, color: theme.text } }, '2. Add your photos & videos'),
          React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 } },
            Array.from({ length: Math.max(mediaCount + 1, 3) }, (_, i) => {
              const filled = i < mediaCount;
              const gradients = [
                'linear-gradient(135deg,#FDE68A,#FCA5A5)',
                'linear-gradient(135deg,#A5B4FC,#6EE7B7)',
                'linear-gradient(135deg,#6EE7B7,#BAE6FD)',
                'linear-gradient(135deg,#DDD6FE,#FCA5A5)',
                'linear-gradient(135deg,#FCA5A5,#FDE68A)',
                'linear-gradient(135deg,#BAE6FD,#DDD6FE)',
                'linear-gradient(135deg,#A7F3D0,#A5B4FC)',
                'linear-gradient(135deg,#FDE68A,#6EE7B7)',
                'linear-gradient(135deg,#FCA5A5,#A5B4FC)',
              ];
              return React.createElement('div', {
                key: i,
                onClick: !filled ? addMedia : undefined,
                style: {
                  aspectRatio: '1', borderRadius: 12,
                  background: filled ? gradients[i % gradients.length] : theme.surfaceAlt,
                  border: filled ? 'none' : `2px dashed ${theme.border}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: !filled && i === mediaCount ? 'pointer' : 'default',
                  transition: 'all 200ms',
                  position: 'relative', overflow: 'hidden',
                }
              },
                filled
                  ? React.createElement(window.lucide.Check, { size: 16, color: 'rgba(255,255,255,0.8)' })
                  : i === mediaCount
                    ? React.createElement(window.lucide.Plus, { size: 18, color: theme.textMuted })
                    : null
              );
            }).slice(0, 9)
          ),
          mediaCount > 0 && step === 2 && React.createElement('button', {
            onClick: () => setStep(3),
            style: {
              marginTop: 14, width: '100%', padding: '14px', borderRadius: 14, border: 'none',
              background: theme.secondary, color: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer'
            }
          }, `Continue with ${mediaCount} photo${mediaCount !== 1 ? 's' : ''}`)
        ),

        // Step 3: Generate
        step >= 3 && React.createElement('div', { style: { animation: 'slideUp 0.4s ease' } },
          React.createElement('h3', { style: { margin: '0 0 16px', fontSize: 15, fontWeight: 700, color: theme.text } }, '3. Flow State Settings'),

          React.createElement('div', { style: { background: theme.surface, borderRadius: 16, padding: 16, marginBottom: 12, border: `1px solid ${theme.border}` } },
            React.createElement('p', { style: { margin: '0 0 12px', fontSize: 13, fontWeight: 600, color: theme.text } }, 'Soundscape'),
            React.createElement('div', { style: { display: 'flex', gap: 8, overflowX: 'auto' } },
              soundscapes.map(s => {
                const Icon = window.lucide[s.icon] || window.lucide.Music;
                return React.createElement('div', {
                  key: s.id,
                  onClick: () => setActiveSoundscape(s.id),
                  style: {
                    flexShrink: 0, padding: '8px 14px', borderRadius: 12, cursor: 'pointer',
                    border: `1.5px solid ${activeSoundscape === s.id ? theme.accent : theme.border}`,
                    background: activeSoundscape === s.id ? (isDark ? 'rgba(225,29,72,0.12)' : '#FFF1F3') : theme.surfaceAlt,
                    display: 'flex', alignItems: 'center', gap: 6, transition: 'all 200ms',
                  }
                },
                  React.createElement(Icon, { size: 14, color: activeSoundscape === s.id ? theme.accent : theme.textMuted }),
                  React.createElement('span', { style: { fontSize: 12, fontWeight: 600, color: activeSoundscape === s.id ? theme.accent : theme.text } }, s.name)
                );
              })
            )
          ),

          generating
            ? React.createElement('div', { style: { textAlign: 'center', padding: '20px 0' } },
                React.createElement('div', { style: {
                  width: 56, height: 56, borderRadius: '50%', background: 'linear-gradient(135deg,#E11D48,#7C3AED)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px',
                  animation: 'spin 2s linear infinite',
                } }, React.createElement(window.lucide.Sparkles, { size: 24, color: '#fff' })),
                React.createElement('p', { style: { margin: '0 0 12px', fontSize: 14, fontWeight: 600, color: theme.text } }, 'Weaving your calm...'),
                React.createElement('div', { style: { background: theme.border, borderRadius: 4, height: 4, overflow: 'hidden' } },
                  React.createElement('div', { style: {
                    height: '100%', background: `linear-gradient(90deg, ${theme.accent}, #7C3AED)`,
                    width: `${progress}%`, borderRadius: 4, transition: 'width 60ms linear',
                  }})
                ),
                React.createElement('p', { style: { margin: '8px 0 0', fontSize: 12, color: theme.textMuted } }, `${progress}% complete`)
              )
            : React.createElement('button', {
                onClick: startGeneration,
                style: {
                  width: '100%', padding: '16px', borderRadius: 16, border: 'none',
                  background: `linear-gradient(135deg, ${theme.accent}, #7C3AED)`,
                  color: '#fff', fontSize: 16, fontWeight: 700, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  boxShadow: '0 8px 24px rgba(225,29,72,0.35)',
                  animation: 'breathe 3s ease-in-out infinite',
                }
              },
                React.createElement(window.lucide.Sparkles, { size: 18, color: '#fff' }),
                React.createElement('span', null, 'Generate Flow State')
              )
        )
      )
    );
  }

  function ExploreScreen() {
    const [activeTab, setActiveTab] = useState('prompts');
    const [liked, setLiked] = useState({});

    return React.createElement('div', { style: { height: '100%', overflowY: 'auto', background: theme.bg, fontFamily: 'Inter, sans-serif' } },
      React.createElement('div', { style: { padding: '20px 20px 16px' } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 } },
          React.createElement('h2', { style: { margin: 0, fontSize: 20, fontWeight: 800, color: theme.text, letterSpacing: '-0.5px' } }, 'Explore'),
          React.createElement('button', {
            onClick: () => setIsDark(!isDark),
            style: { width: 36, height: 36, borderRadius: 10, border: 'none', cursor: 'pointer', background: theme.surfaceAlt, display: 'flex', alignItems: 'center', justifyContent: 'center' }
          }, isDark ? React.createElement(window.lucide.Sun, { size: 16, color: theme.accent }) : React.createElement(window.lucide.Moon, { size: 16, color: theme.secondary }))
        ),
        React.createElement('div', { style: {
          display: 'flex', background: theme.surfaceAlt, borderRadius: 12, padding: 4, gap: 2
        } },
          ['prompts', 'soundscapes', 'gallery'].map(tab =>
            React.createElement('button', {
              key: tab,
              onClick: () => setActiveTab(tab),
              style: {
                flex: 1, padding: '8px 4px', borderRadius: 10, border: 'none', cursor: 'pointer',
                background: activeTab === tab ? theme.surface : 'transparent',
                color: activeTab === tab ? theme.text : theme.textMuted,
                fontSize: 12, fontWeight: activeTab === tab ? 700 : 500,
                boxShadow: activeTab === tab ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
                transition: 'all 200ms', textTransform: 'capitalize',
              }
            }, tab)
          )
        )
      ),

      activeTab === 'prompts' && React.createElement('div', { style: { padding: '4px 20px 20px' } },
        React.createElement('p', { style: { margin: '0 0 14px', fontSize: 13, color: theme.textSecondary, lineHeight: 1.5 } },
          'Daily visual themes curated to build your calm aesthetic. Tap to add to your next creation.'),
        visualPrompts.map((prompt, i) => {
          const Icon = window.lucide[prompt.icon] || window.lucide.Image;
          return React.createElement('div', {
            key: prompt.id,
            style: {
              display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px',
              background: theme.surface, borderRadius: 16, marginBottom: 10,
              border: `1px solid ${theme.border}`,
              animation: `slideUp 0.4s ease ${i * 0.07}s both`,
              cursor: 'pointer', transition: 'transform 200ms',
            },
            onMouseEnter: e => e.currentTarget.style.transform = 'translateX(4px)',
            onMouseLeave: e => e.currentTarget.style.transform = 'translateX(0)',
          },
            React.createElement('div', { style: {
              width: 48, height: 48, borderRadius: 14, flexShrink: 0,
              background: `${prompt.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: `1.5px solid ${prompt.color}50`,
            } }, React.createElement(Icon, { size: 20, color: prompt.color })),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('p', { style: { margin: 0, fontSize: 14, fontWeight: 700, color: theme.text } }, prompt.theme),
              React.createElement('p', { style: { margin: '2px 0 0', fontSize: 12, color: theme.textMuted } }, prompt.description)
            ),
            React.createElement('button', {
              onClick: () => navigate('create'),
              style: {
                width: 32, height: 32, borderRadius: 10, border: 'none', cursor: 'pointer',
                background: theme.surfaceAlt, display: 'flex', alignItems: 'center', justifyContent: 'center'
              }
            }, React.createElement(window.lucide.Plus, { size: 16, color: theme.textSecondary }))
          );
        })
      ),

      activeTab === 'soundscapes' && React.createElement('div', { style: { padding: '4px 20px 20px' } },
        React.createElement('div', { style: {
          background: isDark ? 'linear-gradient(135deg,#1E1B4B,#0F0F23)' : 'linear-gradient(135deg,#0F0F23,#1E1B4B)',
          borderRadius: 20, padding: 20, marginBottom: 16,
        } },
          React.createElement('p', { style: { margin: '0 0 4px', fontSize: 11, color: 'rgba(196,191,255,0.6)', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 500 } }, 'Now Playing'),
          React.createElement('p', { style: { margin: '0 0 16px', fontSize: 18, fontWeight: 700, color: '#F0EEFF' } }, 'Rainfall · Ambi-Synth'),
          React.createElement('div', { style: { display: 'flex', gap: 3, alignItems: 'flex-end', height: 24, marginBottom: 16 } },
            Array.from({ length: 20 }, (_, i) =>
              React.createElement('div', {
                key: i,
                style: {
                  flex: 1, background: `rgba(225,29,72,${0.4 + Math.sin(i) * 0.4})`,
                  borderRadius: 2,
                  animation: `waveform ${0.5 + (i % 3) * 0.3}s ease-in-out ${i * 0.1}s infinite alternate`,
                }
              })
            )
          ),
          React.createElement('div', { style: { display: 'flex', gap: 8 } },
            [window.lucide.SkipBack, window.lucide.Pause, window.lucide.SkipForward].map((Icon, i) =>
              React.createElement('button', {
                key: i,
                style: {
                  flex: i === 1 ? 2 : 1, padding: '10px', borderRadius: 12, border: 'none', cursor: 'pointer',
                  background: i === 1 ? theme.accent : 'rgba(196,191,255,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }
              }, React.createElement(Icon, { size: i === 1 ? 18 : 16, color: '#fff' }))
            )
          )
        ),
        soundscapes.map((s, i) => {
          const Icon = window.lucide[s.icon] || window.lucide.Music;
          return React.createElement('div', {
            key: s.id,
            style: {
              display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px',
              background: theme.surface, borderRadius: 16, marginBottom: 10,
              border: `1px solid ${s.id === 'rainfall' ? theme.accent : theme.border}`,
              animation: `fadeIn 0.4s ease ${i * 0.1}s both`, cursor: 'pointer',
            }
          },
            React.createElement('div', { style: {
              width: 44, height: 44, borderRadius: 12,
              background: s.id === 'rainfall' ? `linear-gradient(135deg,${theme.accent},#7C3AED)` : theme.surfaceAlt,
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            } }, React.createElement(Icon, { size: 18, color: s.id === 'rainfall' ? '#fff' : theme.textMuted })),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('p', { style: { margin: 0, fontSize: 14, fontWeight: 600, color: theme.text } }, s.name),
              React.createElement('p', { style: { margin: '2px 0 0', fontSize: 12, color: theme.textMuted } }, s.bpm)
            ),
            s.id === 'rainfall' && React.createElement('div', { style: { display: 'flex', gap: 2, alignItems: 'flex-end', height: 16 } },
              [4, 8, 12, 6, 14, 10].map((h, j) =>
                React.createElement('div', { key: j, style: {
                  width: 3, height: h, background: theme.accent, borderRadius: 2,
                  animation: `waveform 0.6s ease ${j * 0.1}s infinite alternate`,
                }})
              )
            )
          );
        })
      ),

      activeTab === 'gallery' && React.createElement('div', { style: { padding: '4px 20px 20px' } },
        React.createElement('p', { style: { margin: '0 0 14px', fontSize: 13, color: theme.textSecondary } }, 'Community calm — gentle inspiration from others'),
        React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 } },
          [
            { title: 'Morning Mist', mood: 'Serene Dawn', user: '@luna', likes: 42, gradient: 'linear-gradient(135deg,#FDE68A,#FCA5A5)' },
            { title: 'Pine Forest', mood: 'Grounding', user: '@river', likes: 28, gradient: 'linear-gradient(135deg,#6EE7B7,#A7F3D0)' },
            { title: 'Blue Hour', mood: 'Reflective', user: '@kai', likes: 67, gradient: 'linear-gradient(135deg,#A5B4FC,#6EE7B7)' },
            { title: 'Rainy Day', mood: 'Twilight', user: '@sage', likes: 51, gradient: 'linear-gradient(135deg,#1E1B4B,#4C1D95)' },
            { title: 'Window Light', mood: 'Soft Focus', user: '@alba', likes: 33, gradient: 'linear-gradient(135deg,#FCE7F3,#FDE68A)' },
            { title: 'Still Waters', mood: 'Reflective', user: '@zen', likes: 89, gradient: 'linear-gradient(135deg,#BAE6FD,#DDD6FE)' },
          ].map((item, i) => {
            const isLiked = liked[i];
            return React.createElement('div', {
              key: i,
              style: {
                borderRadius: 16, overflow: 'hidden', cursor: 'pointer',
                boxShadow: isDark ? '0 4px 20px rgba(0,0,0,0.4)' : '0 4px 16px rgba(15,15,35,0.1)',
                animation: `slideUp 0.4s ease ${i * 0.08}s both`,
              }
            },
              React.createElement('div', { style: { height: 110, background: item.gradient, position: 'relative' } },
                React.createElement('button', {
                  onClick: () => setLiked(l => ({ ...l, [i]: !l[i] })),
                  style: {
                    position: 'absolute', top: 8, right: 8, width: 30, height: 30,
                    borderRadius: 8, border: 'none', cursor: 'pointer',
                    background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backdropFilter: 'blur(4px)', transition: 'transform 200ms',
                  }
                }, React.createElement(window.lucide.Heart, { size: 14, color: isLiked ? '#E11D48' : '#fff', fill: isLiked ? '#E11D48' : 'none' }))
              ),
              React.createElement('div', { style: { padding: '10px 12px', background: theme.surface } },
                React.createElement('p', { style: { margin: 0, fontSize: 13, fontWeight: 700, color: theme.text } }, item.title),
                React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 } },
                  React.createElement('p', { style: { margin: 0, fontSize: 11, color: theme.textMuted } }, item.user),
                  React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 3 } },
                    React.createElement(window.lucide.Heart, { size: 11, color: theme.accent, fill: theme.accent }),
                    React.createElement('span', { style: { fontSize: 11, color: theme.textMuted } }, isLiked ? item.likes + 1 : item.likes)
                  )
                )
              )
            );
          })
        )
      )
    );
  }

  function ProfileScreen() {
    const [notifications, setNotifications] = useState(true);
    const [dailyPrompt, setDailyPrompt] = useState(true);
    const [autoRhythm, setAutoRhythm] = useState(false);

    const Toggle = ({ value, onChange }) =>
      React.createElement('button', {
        onClick: () => onChange(!value),
        style: {
          width: 44, height: 26, borderRadius: 13, border: 'none', cursor: 'pointer',
          background: value ? theme.accent : theme.border,
          position: 'relative', transition: 'background 200ms', padding: 0,
        }
      },
        React.createElement('div', { style: {
          width: 20, height: 20, borderRadius: '50%', background: '#fff',
          position: 'absolute', top: 3, left: value ? 21 : 3,
          transition: 'left 200ms', boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
        }})
      );

    const stats = [
      { label: 'Creations', value: '24' },
      { label: 'Hours of Calm', value: '8.4' },
      { label: 'Day Streak', value: '12' },
    ];

    return React.createElement('div', { style: { height: '100%', overflowY: 'auto', background: theme.bg, fontFamily: 'Inter, sans-serif' } },
      // Profile header
      React.createElement('div', { style: {
        padding: '24px 20px 20px',
        background: isDark ? 'linear-gradient(180deg,#1E1B4B,#000)' : 'linear-gradient(180deg,#EDE9FF,#F8F7FF)',
      } },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 } },
          React.createElement('div', { style: {
            width: 64, height: 64, borderRadius: 20, flexShrink: 0,
            background: 'linear-gradient(135deg,#FDE68A,#FCA5A5,#A5B4FC)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 8px 24px rgba(225,29,72,0.2)',
          } }, React.createElement(window.lucide.User, { size: 28, color: '#fff' })),
          React.createElement('div', null,
            React.createElement('h2', { style: { margin: 0, fontSize: 20, fontWeight: 800, color: theme.text } }, 'Your Sanctuary'),
            React.createElement('p', { style: { margin: '3px 0 0', fontSize: 13, color: theme.textMuted } }, 'Building calm since March 2025')
          ),
          React.createElement('button', {
            onClick: () => setIsDark(!isDark),
            style: { marginLeft: 'auto', width: 36, height: 36, borderRadius: 10, border: 'none', cursor: 'pointer', background: theme.surface, display: 'flex', alignItems: 'center', justifyContent: 'center' }
          }, isDark ? React.createElement(window.lucide.Sun, { size: 16, color: theme.accent }) : React.createElement(window.lucide.Moon, { size: 16, color: theme.secondary }))
        ),

        React.createElement('div', { style: { display: 'flex', gap: 10 } },
          stats.map(s => React.createElement('div', {
            key: s.label,
            style: {
              flex: 1, background: theme.surface, borderRadius: 14, padding: '12px 8px', textAlign: 'center',
              boxShadow: isDark ? 'none' : '0 2px 8px rgba(15,15,35,0.08)',
              border: `1px solid ${theme.border}`,
            }
          },
            React.createElement('p', { style: { margin: 0, fontSize: 22, fontWeight: 800, color: theme.text } }, s.value),
            React.createElement('p', { style: { margin: '2px 0 0', fontSize: 10, color: theme.textMuted, fontWeight: 500 } }, s.label)
          ))
        )
      ),

      React.createElement('div', { style: { padding: '16px 20px' } },
        // Harmony Palette
        React.createElement('div', { style: { marginBottom: 20 } },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 } },
            React.createElement('h3', { style: { margin: 0, fontSize: 15, fontWeight: 700, color: theme.text } }, 'Personal Harmony Palette'),
            React.createElement('span', { style: { fontSize: 11, color: theme.accent, fontWeight: 600 } }, 'Auto-learned')
          ),
          React.createElement('p', { style: { margin: '0 0 12px', fontSize: 12, color: theme.textMuted, lineHeight: 1.5 } },
            'Your unique calm aesthetic — colors that consistently bring you peace'),
          React.createElement('div', { style: { display: 'flex', gap: 8, flexWrap: 'wrap' } },
            harmonyColors.map((color, i) =>
              React.createElement('div', {
                key: color,
                style: {
                  width: 36, height: 36, borderRadius: 10, background: color,
                  cursor: 'pointer', animation: `fadeIn 0.4s ease ${i * 0.06}s both`,
                  transition: 'transform 200ms, box-shadow 200ms',
                  boxShadow: `0 4px 12px ${color}60`,
                },
                onMouseEnter: e => { e.currentTarget.style.transform = 'scale(1.15) rotate(5deg)'; },
                onMouseLeave: e => { e.currentTarget.style.transform = 'scale(1) rotate(0)'; },
              })
            )
          )
        ),

        // Settings
        React.createElement('div', { style: { background: theme.surface, borderRadius: 20, overflow: 'hidden', border: `1px solid ${theme.border}`, marginBottom: 16 } },
          [
            { label: 'Daily visual prompts', desc: 'Get inspired each morning', value: dailyPrompt, onChange: setDailyPrompt, icon: 'Sunrise' },
            { label: 'Mindful notifications', desc: 'Gentle reminders to create', value: notifications, onChange: setNotifications, icon: 'Bell' },
            { label: 'Auto rhythm detection', desc: 'Let AI set pacing for you', value: autoRhythm, onChange: setAutoRhythm, icon: 'Waveform' },
          ].map((setting, i) => {
            const Icon = window.lucide[setting.icon] || window.lucide.Settings;
            return React.createElement('div', {
              key: setting.label,
              style: {
                display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px',
                borderBottom: i < 2 ? `1px solid ${theme.border}` : 'none',
              }
            },
              React.createElement('div', { style: {
                width: 36, height: 36, borderRadius: 10, background: theme.surfaceAlt,
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              } }, React.createElement(Icon, { size: 16, color: theme.textSecondary })),
              React.createElement('div', { style: { flex: 1 } },
                React.createElement('p', { style: { margin: 0, fontSize: 13, fontWeight: 600, color: theme.text } }, setting.label),
                React.createElement('p', { style: { margin: '2px 0 0', fontSize: 11, color: theme.textMuted } }, setting.desc)
              ),
              React.createElement(Toggle, { value: setting.value, onChange: setting.onChange })
            );
          })
        ),

        // Mood profile breakdown
        React.createElement('div', { style: { background: theme.surface, borderRadius: 20, padding: 16, border: `1px solid ${theme.border}`, marginBottom: 16 } },
          React.createElement('h3', { style: { margin: '0 0 14px', fontSize: 15, fontWeight: 700, color: theme.text } }, 'Mood Profile'),
          [
            { label: 'Serene Dawn', pct: 42, color: '#F59E0B' },
            { label: 'Reflective Haze', pct: 28, color: '#6366F1' },
            { label: 'Grounding Glimpse', pct: 20, color: '#10B981' },
            { label: 'Twilight Rest', pct: 10, color: '#7C3AED' },
          ].map((mood, i) =>
            React.createElement('div', { key: mood.label, style: { marginBottom: i < 3 ? 10 : 0 } },
              React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: 5 } },
                React.createElement('span', { style: { fontSize: 12, fontWeight: 600, color: theme.text } }, mood.label),
                React.createElement('span', { style: { fontSize: 12, color: theme.textMuted } }, `${mood.pct}%`)
              ),
              React.createElement('div', { style: { height: 6, background: theme.surfaceAlt, borderRadius: 3, overflow: 'hidden' } },
                React.createElement('div', { style: {
                  height: '100%', width: `${mood.pct}%`, background: mood.color,
                  borderRadius: 3, animation: `progressFill 1s ease ${i * 0.15}s both`,
                }})
              )
            )
          )
        ),

        React.createElement('button', {
          style: {
            width: '100%', padding: '14px', borderRadius: 16, border: `1.5px solid ${theme.border}`,
            background: 'transparent', color: theme.accent, fontSize: 14, fontWeight: 600, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }
        }, React.createElement(window.lucide.Download, { size: 16, color: theme.accent }), React.createElement('span', null, 'Export My Calm Collection')),

        React.createElement('div', { style: { height: 20 } })
      )
    );
  }

  const navItems = [
    { id: 'home', label: 'Home', icon: 'Home' },
    { id: 'create', label: 'Create', icon: 'Plus' },
    { id: 'explore', label: 'Explore', icon: 'Compass' },
    { id: 'profile', label: 'Profile', icon: 'User' },
  ];

  return React.createElement('div', {
    style: {
      minHeight: '100vh',
      background: '#f0f0f0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Inter, sans-serif',
      padding: '20px',
    }
  },
    React.createElement('style', { dangerouslySetInnerHTML: { __html: styleTag } }),

    React.createElement('div', {
      style: {
        width: 375, height: 812,
        borderRadius: 44,
        overflow: 'hidden',
        boxShadow: '0 40px 80px rgba(0,0,0,0.25), 0 0 0 1px rgba(0,0,0,0.08)',
        display: 'flex',
        flexDirection: 'column',
        background: theme.bg,
        position: 'relative',
      }
    },
      // Screen content
      React.createElement('div', {
        style: {
          flex: 1,
          overflow: 'hidden',
          opacity: animating ? 0 : 1,
          transform: animating ? 'translateY(8px)' : 'translateY(0)',
          transition: 'opacity 150ms, transform 150ms',
        }
      },
        React.createElement(ActiveScreen)
      ),

      // Bottom navigation
      React.createElement('div', {
        style: {
          height: 72,
          background: theme.navBg,
          borderTop: `1px solid ${theme.navBorder}`,
          display: 'flex',
          alignItems: 'center',
          paddingBottom: 6,
          paddingTop: 4,
          flexShrink: 0,
        }
      },
        navItems.map(item => {
          const Icon = window.lucide[item.icon];
          const isActive = activeTab === item.id;
          const isCreate = item.id === 'create';
          return React.createElement('button', {
            key: item.id,
            onClick: () => navigate(item.id),
            style: {
              flex: 1, border: 'none', cursor: 'pointer', background: 'transparent',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              gap: 3, padding: '6px 4px',
              minHeight: 44,
            }
          },
            isCreate
              ? React.createElement('div', { style: {
                  width: 44, height: 44, borderRadius: 14,
                  background: `linear-gradient(135deg, ${theme.accent}, #7C3AED)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: isActive ? `0 6px 18px rgba(225,29,72,0.4)` : '0 4px 12px rgba(225,29,72,0.25)',
                  transition: 'all 200ms',
                  transform: isActive ? 'scale(1.08)' : 'scale(1)',
                } },
                React.createElement(Icon, { size: 20, color: '#fff' })
              )
              : React.createElement('div', { style: {
                  width: 32, height: 32, borderRadius: 10,
                  background: isActive ? (isDark ? 'rgba(225,29,72,0.15)' : 'rgba(225,29,72,0.1)') : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 200ms',
                } },
                React.createElement(Icon, { size: 20, color: isActive ? theme.accent : theme.textMuted, strokeWidth: isActive ? 2.5 : 1.8 })
              ),
            !isCreate && React.createElement('span', {
              style: {
                fontSize: 10, fontWeight: isActive ? 700 : 500,
                color: isActive ? theme.accent : theme.textMuted, transition: 'color 200ms',
              }
            }, item.label)
          );
        })
      )
    )
  );
}
