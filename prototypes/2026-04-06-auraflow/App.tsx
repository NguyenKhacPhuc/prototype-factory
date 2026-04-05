const { useState, useEffect, useRef, useCallback } = React;

function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [isDark, setIsDark] = useState(true);
  const [currentFlow, setCurrentFlow] = useState(null);
  const [selectedMood, setSelectedMood] = useState('calm');
  const [isPlaying, setIsPlaying] = useState(false);
  const [animPhase, setAnimPhase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setAnimPhase(p => (p + 1) % 360), 50);
    return () => clearInterval(interval);
  }, []);

  const themes = {
    dark: {
      bg: '#000000',
      surface: '#0F0F23',
      surfaceAlt: '#1E1B4B',
      card: '#161632',
      cardAlt: '#1a1a3e',
      text: '#FFFFFF',
      textSecondary: '#A0A0C0',
      textTertiary: '#6B6B8D',
      accent: '#E11D48',
      accentSoft: 'rgba(225,29,72,0.15)',
      border: 'rgba(255,255,255,0.08)',
      gradient1: '#0F0F23',
      gradient2: '#1E1B4B',
      tabBg: 'rgba(15,15,35,0.95)',
      overlay: 'rgba(0,0,0,0.6)',
    },
    light: {
      bg: '#F8F7FF',
      surface: '#FFFFFF',
      surfaceAlt: '#EDE9FE',
      card: '#FFFFFF',
      cardAlt: '#F3F0FF',
      text: '#1A1A2E',
      textSecondary: '#6B6B8D',
      textTertiary: '#9B9BB0',
      accent: '#E11D48',
      accentSoft: 'rgba(225,29,72,0.1)',
      border: 'rgba(30,27,75,0.1)',
      gradient1: '#EDE9FE',
      gradient2: '#F8F7FF',
      tabBg: 'rgba(255,255,255,0.95)',
      overlay: 'rgba(248,247,255,0.8)',
    }
  };

  const t = isDark ? themes.dark : themes.light;
  const font = "-apple-system, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif";

  const icons = window.lucide || {};
  const createIcon = (IconComponent, size = 24, color = t.text, extra = {}) => {
    if (!IconComponent) return null;
    return React.createElement(IconComponent, { size, color, strokeWidth: 1.5, ...extra });
  };

  // ── Style tag for keyframes ──
  const StyleTag = () => React.createElement('style', null, `
    @keyframes auraFadeIn {
      from { opacity: 0; transform: translateY(12px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes auraSlideUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes auraPulse {
      0%, 100% { transform: scale(1); opacity: 0.7; }
      50% { transform: scale(1.08); opacity: 1; }
    }
    @keyframes auraShimmer {
      0% { background-position: -200% center; }
      100% { background-position: 200% center; }
    }
    @keyframes auraFloat {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      33% { transform: translateY(-8px) rotate(1deg); }
      66% { transform: translateY(4px) rotate(-1deg); }
    }
    @keyframes auraGlow {
      0%, 100% { box-shadow: 0 0 20px rgba(225,29,72,0.2); }
      50% { box-shadow: 0 0 40px rgba(225,29,72,0.4); }
    }
    @keyframes orbMove1 {
      0%, 100% { transform: translate(0, 0) scale(1); }
      25% { transform: translate(30px, -20px) scale(1.1); }
      50% { transform: translate(-10px, -40px) scale(0.9); }
      75% { transform: translate(-30px, 10px) scale(1.05); }
    }
    @keyframes orbMove2 {
      0%, 100% { transform: translate(0, 0) scale(1); }
      25% { transform: translate(-25px, 30px) scale(0.95); }
      50% { transform: translate(20px, 15px) scale(1.1); }
      75% { transform: translate(10px, -25px) scale(1); }
    }
  `);

  // ── Ambient Orb Background ──
  const AmbientOrbs = ({ colors = ['#E11D48', '#1E1B4B', '#7C3AED'] }) => {
    return React.createElement('div', {
      style: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, overflow: 'hidden', pointerEvents: 'none' }
    },
      colors.map((color, i) => React.createElement('div', {
        key: i,
        style: {
          position: 'absolute',
          width: 180 + i * 40,
          height: 180 + i * 40,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${color}40 0%, transparent 70%)`,
          top: `${20 + i * 25}%`,
          left: `${10 + i * 30}%`,
          animation: `orbMove${(i % 2) + 1} ${8 + i * 3}s ease-in-out infinite`,
          filter: 'blur(40px)',
        }
      }))
    );
  };

  // ── Home Screen ──
  const HomeScreen = () => {
    const dailyPause = {
      title: 'Golden Hour Serenity',
      subtitle: 'A warm evening blend from last summer',
      memories: 23,
      duration: '4:30',
    };

    const recentFlows = [
      { id: 1, title: 'Ocean Whispers', theme: 'Blue & Silver', count: 47, gradient: ['#0EA5E9', '#1E1B4B'] },
      { id: 2, title: 'Forest Canopy', theme: 'Green & Gold', count: 31, gradient: ['#22C55E', '#0F0F23'] },
      { id: 3, title: 'Twilight Calm', theme: 'Purple & Rose', count: 56, gradient: ['#A855F7', '#E11D48'] },
    ];

    return React.createElement('div', {
      style: { padding: '20px 20px 100px', animation: 'auraFadeIn 0.4s ease-out' }
    },
      // Header
      React.createElement('div', {
        style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }
      },
        React.createElement('div', null,
          React.createElement('h1', {
            style: { fontSize: 34, fontWeight: 800, color: t.text, fontFamily: font, letterSpacing: '-0.5px', margin: 0 }
          }, 'AuraFlow'),
          React.createElement('p', {
            style: { fontSize: 15, color: t.textSecondary, fontFamily: font, margin: '4px 0 0' }
          }, 'Your daily sanctuary')
        ),
        React.createElement('div', {
          style: { display: 'flex', gap: 12, alignItems: 'center' }
        },
          React.createElement('button', {
            onClick: () => setIsDark(!isDark),
            style: {
              width: 44, height: 44, borderRadius: 22, border: `1px solid ${t.border}`,
              background: t.card, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
            }
          }, createIcon(isDark ? icons.Sun : icons.Moon, 20, t.textSecondary)),
          React.createElement('button', {
            onClick: () => setActiveScreen('profile'),
            style: {
              width: 44, height: 44, borderRadius: 22, border: `1px solid ${t.border}`,
              background: t.card, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
            }
          }, createIcon(icons.User, 20, t.textSecondary))
        )
      ),

      // Daily Pause Prompt
      React.createElement('div', {
        onClick: () => { setCurrentFlow(dailyPause); setActiveScreen('player'); },
        style: {
          position: 'relative', borderRadius: 24, padding: 28, marginBottom: 28,
          background: `linear-gradient(135deg, ${t.surfaceAlt}, ${t.surface})`,
          border: `1px solid ${t.border}`,
          overflow: 'hidden', cursor: 'pointer',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          boxShadow: isDark ? '0 8px 32px rgba(0,0,0,0.3)' : '0 8px 32px rgba(30,27,75,0.08)',
        },
        onMouseEnter: e => { e.currentTarget.style.transform = 'scale(1.01)'; },
        onMouseLeave: e => { e.currentTarget.style.transform = 'scale(1)'; },
      },
        React.createElement(AmbientOrbs, { colors: ['#E11D48', '#7C3AED', '#F59E0B'] }),
        React.createElement('div', { style: { position: 'relative', zIndex: 1 } },
          React.createElement('div', {
            style: {
              display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 12px',
              borderRadius: 20, background: t.accentSoft, marginBottom: 16,
            }
          },
            createIcon(icons.Sparkles, 14, t.accent),
            React.createElement('span', {
              style: { fontSize: 13, fontWeight: 600, color: t.accent, fontFamily: font }
            }, "Today's Pause")
          ),
          React.createElement('h2', {
            style: { fontSize: 22, fontWeight: 700, color: t.text, fontFamily: font, margin: '0 0 8px', letterSpacing: '-0.3px' }
          }, dailyPause.title),
          React.createElement('p', {
            style: { fontSize: 15, color: t.textSecondary, fontFamily: font, margin: '0 0 20px', lineHeight: 1.4 }
          }, dailyPause.subtitle),
          React.createElement('div', {
            style: { display: 'flex', alignItems: 'center', gap: 16 }
          },
            React.createElement('div', {
              style: {
                width: 52, height: 52, borderRadius: 26, background: t.accent,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 4px 20px rgba(225,29,72,0.4)',
                animation: 'auraPulse 3s ease-in-out infinite',
              }
            }, createIcon(icons.Play, 24, '#FFFFFF')),
            React.createElement('div', null,
              React.createElement('p', { style: { fontSize: 13, color: t.textTertiary, fontFamily: font, margin: 0 } }, `${dailyPause.memories} memories`),
              React.createElement('p', { style: { fontSize: 13, color: t.textTertiary, fontFamily: font, margin: '2px 0 0' } }, dailyPause.duration)
            )
          )
        )
      ),

      // Mood Selection
      React.createElement('div', { style: { marginBottom: 28 } },
        React.createElement('h3', {
          style: { fontSize: 17, fontWeight: 700, color: t.text, fontFamily: font, margin: '0 0 14px' }
        }, 'How are you feeling?'),
        React.createElement('div', {
          style: { display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 4 }
        },
          [
            { id: 'calm', label: 'Calm', icon: icons.Waves, color: '#0EA5E9' },
            { id: 'nostalgic', label: 'Nostalgic', icon: icons.Clock, color: '#F59E0B' },
            { id: 'joyful', label: 'Joyful', icon: icons.Heart, color: '#E11D48' },
            { id: 'focused', label: 'Focused', icon: icons.Target, color: '#22C55E' },
          ].map(mood => React.createElement('button', {
            key: mood.id,
            onClick: () => setSelectedMood(mood.id),
            style: {
              flex: '0 0 auto', padding: '12px 18px', borderRadius: 20,
              border: selectedMood === mood.id ? `2px solid ${mood.color}` : `1px solid ${t.border}`,
              background: selectedMood === mood.id ? `${mood.color}18` : t.card,
              display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer',
              transition: 'all 0.2s ease',
            }
          },
            createIcon(mood.icon, 18, selectedMood === mood.id ? mood.color : t.textSecondary),
            React.createElement('span', {
              style: {
                fontSize: 15, fontWeight: selectedMood === mood.id ? 600 : 400,
                color: selectedMood === mood.id ? mood.color : t.textSecondary, fontFamily: font,
              }
            }, mood.label)
          ))
        )
      ),

      // Recent Flows
      React.createElement('div', null,
        React.createElement('div', {
          style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }
        },
          React.createElement('h3', {
            style: { fontSize: 17, fontWeight: 700, color: t.text, fontFamily: font, margin: 0 }
          }, 'Recent MemoryScapes'),
          React.createElement('button', {
            onClick: () => setActiveScreen('explore'),
            style: { background: 'none', border: 'none', color: t.accent, fontSize: 15, fontWeight: 600, fontFamily: font, cursor: 'pointer' }
          }, 'See All')
        ),
        recentFlows.map((flow, i) => React.createElement('div', {
          key: flow.id,
          onClick: () => { setCurrentFlow(flow); setActiveScreen('player'); },
          style: {
            display: 'flex', alignItems: 'center', gap: 14, padding: 14,
            borderRadius: 16, background: t.card, marginBottom: 10,
            border: `1px solid ${t.border}`, cursor: 'pointer',
            transition: 'all 0.2s ease',
            animation: `auraSlideUp ${0.3 + i * 0.1}s ease-out`,
          },
          onMouseEnter: e => { e.currentTarget.style.background = t.cardAlt; },
          onMouseLeave: e => { e.currentTarget.style.background = t.card; },
        },
          React.createElement('div', {
            style: {
              width: 56, height: 56, borderRadius: 14, flexShrink: 0,
              background: `linear-gradient(135deg, ${flow.gradient[0]}, ${flow.gradient[1]})`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }
          }, createIcon(icons.Layers, 24, '#FFFFFF')),
          React.createElement('div', { style: { flex: 1, minWidth: 0 } },
            React.createElement('p', {
              style: { fontSize: 17, fontWeight: 600, color: t.text, fontFamily: font, margin: 0 }
            }, flow.title),
            React.createElement('p', {
              style: { fontSize: 13, color: t.textTertiary, fontFamily: font, margin: '3px 0 0' }
            }, `${flow.theme} · ${flow.count} moments`)
          ),
          createIcon(icons.ChevronRight, 20, t.textTertiary)
        ))
      )
    );
  };

  // ── Explore Screen ──
  const ExploreScreen = () => {
    const categories = [
      { id: 'nature', label: 'Nature', icon: icons.TreePine, color: '#22C55E', count: 142 },
      { id: 'people', label: 'People', icon: icons.Users, color: '#0EA5E9', count: 89 },
      { id: 'travel', label: 'Travel', icon: icons.MapPin, color: '#F59E0B', count: 67 },
      { id: 'food', label: 'Food', icon: icons.Coffee, color: '#E11D48', count: 53 },
      { id: 'pets', label: 'Pets', icon: icons.Heart, color: '#A855F7', count: 38 },
      { id: 'city', label: 'Cityscapes', icon: icons.Building, color: '#6366F1', count: 45 },
    ];

    const curatedFlows = [
      { id: 'a', title: 'Morning Light Collection', desc: 'Sunrise moments across seasons', photos: 34, duration: '6:15', gradient: ['#F59E0B', '#E11D48'] },
      { id: 'b', title: 'Rainy Day Comfort', desc: 'Cozy indoor scenes and misty windows', photos: 28, duration: '5:40', gradient: ['#6366F1', '#0EA5E9'] },
      { id: 'c', title: 'Summer Evenings', desc: 'Golden hour walks and garden moments', photos: 41, duration: '7:20', gradient: ['#22C55E', '#F59E0B'] },
      { id: 'd', title: 'Quiet Corners', desc: 'Peaceful nooks and reading spots', photos: 19, duration: '3:45', gradient: ['#A855F7', '#1E1B4B'] },
    ];

    return React.createElement('div', {
      style: { padding: '20px 20px 100px', animation: 'auraFadeIn 0.4s ease-out' }
    },
      React.createElement('h1', {
        style: { fontSize: 34, fontWeight: 800, color: t.text, fontFamily: font, letterSpacing: '-0.5px', margin: '0 0 6px' }
      }, 'Explore'),
      React.createElement('p', {
        style: { fontSize: 15, color: t.textSecondary, fontFamily: font, margin: '0 0 24px' }
      }, 'Discover themes in your memories'),

      // Categories Grid
      React.createElement('div', {
        style: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 28 }
      },
        categories.map((cat, i) => React.createElement('button', {
          key: cat.id,
          style: {
            padding: '18px 10px', borderRadius: 16, border: `1px solid ${t.border}`,
            background: t.card, display: 'flex', flexDirection: 'column',
            alignItems: 'center', gap: 8, cursor: 'pointer',
            transition: 'all 0.2s ease',
            animation: `auraFadeIn ${0.2 + i * 0.08}s ease-out`,
          },
          onMouseEnter: e => { e.currentTarget.style.background = `${cat.color}15`; e.currentTarget.style.borderColor = `${cat.color}40`; },
          onMouseLeave: e => { e.currentTarget.style.background = t.card; e.currentTarget.style.borderColor = t.border; },
        },
          React.createElement('div', {
            style: {
              width: 44, height: 44, borderRadius: 12, background: `${cat.color}20`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }
          }, createIcon(cat.icon, 22, cat.color)),
          React.createElement('span', { style: { fontSize: 13, fontWeight: 600, color: t.text, fontFamily: font } }, cat.label),
          React.createElement('span', { style: { fontSize: 11, color: t.textTertiary, fontFamily: font } }, `${cat.count} photos`)
        ))
      ),

      // AI Curated
      React.createElement('h3', {
        style: { fontSize: 17, fontWeight: 700, color: t.text, fontFamily: font, margin: '0 0 14px' }
      }, 'AI-Curated Flows'),

      curatedFlows.map((flow, i) => React.createElement('div', {
        key: flow.id,
        onClick: () => { setCurrentFlow(flow); setActiveScreen('player'); },
        style: {
          position: 'relative', borderRadius: 20, padding: 22, marginBottom: 12,
          background: `linear-gradient(135deg, ${flow.gradient[0]}20, ${flow.gradient[1]}20)`,
          border: `1px solid ${t.border}`, cursor: 'pointer',
          overflow: 'hidden', transition: 'all 0.2s ease',
          animation: `auraSlideUp ${0.3 + i * 0.1}s ease-out`,
        },
        onMouseEnter: e => { e.currentTarget.style.transform = 'translateY(-2px)'; },
        onMouseLeave: e => { e.currentTarget.style.transform = 'translateY(0)'; },
      },
        React.createElement('div', {
          style: {
            position: 'absolute', top: -20, right: -20, width: 100, height: 100,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${flow.gradient[0]}25 0%, transparent 70%)`,
            filter: 'blur(20px)',
          }
        }),
        React.createElement('div', { style: { position: 'relative', zIndex: 1 } },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' } },
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('h4', { style: { fontSize: 17, fontWeight: 600, color: t.text, fontFamily: font, margin: '0 0 4px' } }, flow.title),
              React.createElement('p', { style: { fontSize: 13, color: t.textSecondary, fontFamily: font, margin: '0 0 12px' } }, flow.desc)
            ),
            React.createElement('div', {
              style: {
                width: 44, height: 44, borderRadius: 22, background: `${flow.gradient[0]}30`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }
            }, createIcon(icons.Play, 20, flow.gradient[0]))
          ),
          React.createElement('div', { style: { display: 'flex', gap: 16 } },
            React.createElement('span', { style: { fontSize: 13, color: t.textTertiary, fontFamily: font, display: 'flex', alignItems: 'center', gap: 4 } },
              createIcon(icons.Image, 14, t.textTertiary), `${flow.photos} photos`
            ),
            React.createElement('span', { style: { fontSize: 13, color: t.textTertiary, fontFamily: font, display: 'flex', alignItems: 'center', gap: 4 } },
              createIcon(icons.Clock, 14, t.textTertiary), flow.duration
            )
          )
        )
      ))
    );
  };

  // ── Sounds Screen ──
  const SoundsScreen = () => {
    const [activeSound, setActiveSound] = useState(null);

    const soundCategories = [
      { id: 'nature', label: 'Nature', icon: icons.TreePine },
      { id: 'ambient', label: 'Ambient', icon: icons.Waves },
      { id: 'music', label: 'Music', icon: icons.Music },
      { id: 'personal', label: 'Personal', icon: icons.Headphones },
    ];

    const [activeSoundCat, setActiveSoundCat] = useState('nature');

    const soundscapes = {
      nature: [
        { id: 's1', title: 'Forest Whispers', desc: 'Gentle rustling leaves and distant birdsong', duration: '∞', color: '#22C55E' },
        { id: 's2', title: 'Soft Rain', desc: 'Light rainfall on a quiet afternoon', duration: '∞', color: '#0EA5E9' },
        { id: 's3', title: 'Ocean Drift', desc: 'Calm waves rolling onto sandy shore', duration: '∞', color: '#06B6D4' },
        { id: 's4', title: 'Mountain Stream', desc: 'Water flowing over smooth stones', duration: '∞', color: '#10B981' },
      ],
      ambient: [
        { id: 's5', title: 'Distant Chimes', desc: 'Ethereal wind chimes in a gentle breeze', duration: '∞', color: '#A855F7' },
        { id: 's6', title: 'Warm Hum', desc: 'Low, comforting drone with subtle harmonics', duration: '∞', color: '#F59E0B' },
        { id: 's7', title: 'Crystal Bowls', desc: 'Resonating singing bowls in a quiet room', duration: '∞', color: '#EC4899' },
      ],
      music: [
        { id: 's8', title: 'Piano Dusk', desc: 'Slow, contemplative piano melodies', duration: '45:00', color: '#6366F1' },
        { id: 's9', title: 'Acoustic Dawn', desc: 'Gentle guitar and soft strings', duration: '38:00', color: '#F97316' },
      ],
      personal: [
        { id: 's10', title: 'My Calm Playlist', desc: '12 tracks you\'ve added', duration: '52:00', color: '#E11D48' },
      ],
    };

    const currentSounds = soundscapes[activeSoundCat] || [];

    return React.createElement('div', {
      style: { padding: '20px 20px 100px', animation: 'auraFadeIn 0.4s ease-out' }
    },
      React.createElement('h1', {
        style: { fontSize: 34, fontWeight: 800, color: t.text, fontFamily: font, letterSpacing: '-0.5px', margin: '0 0 6px' }
      }, 'Sonic Aura'),
      React.createElement('p', {
        style: { fontSize: 15, color: t.textSecondary, fontFamily: font, margin: '0 0 24px' }
      }, 'Soundscapes for your visual flows'),

      // Sound Categories
      React.createElement('div', {
        style: { display: 'flex', gap: 8, marginBottom: 24 }
      },
        soundCategories.map(cat => React.createElement('button', {
          key: cat.id,
          onClick: () => setActiveSoundCat(cat.id),
          style: {
            flex: 1, padding: '10px 6px', borderRadius: 14,
            border: activeSoundCat === cat.id ? `2px solid ${t.accent}` : `1px solid ${t.border}`,
            background: activeSoundCat === cat.id ? t.accentSoft : t.card,
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
            cursor: 'pointer', transition: 'all 0.2s ease',
          }
        },
          createIcon(cat.icon, 20, activeSoundCat === cat.id ? t.accent : t.textSecondary),
          React.createElement('span', {
            style: {
              fontSize: 11, fontWeight: 600, fontFamily: font,
              color: activeSoundCat === cat.id ? t.accent : t.textSecondary,
            }
          }, cat.label)
        ))
      ),

      // Active Sound Visualizer
      activeSound && React.createElement('div', {
        style: {
          borderRadius: 20, padding: 24, marginBottom: 20,
          background: `linear-gradient(135deg, ${activeSound.color}25, ${t.surface})`,
          border: `1px solid ${activeSound.color}40`,
          animation: 'auraFadeIn 0.3s ease-out',
        }
      },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 } },
          React.createElement('div', {
            style: {
              width: 52, height: 52, borderRadius: 26, background: `${activeSound.color}30`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              animation: 'auraPulse 2s ease-in-out infinite',
            }
          }, createIcon(icons.Volume2, 24, activeSound.color)),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('p', { style: { fontSize: 17, fontWeight: 600, color: t.text, fontFamily: font, margin: 0 } }, activeSound.title),
            React.createElement('p', { style: { fontSize: 13, color: t.textSecondary, fontFamily: font, margin: '2px 0 0' } }, 'Now Playing')
          ),
          React.createElement('button', {
            onClick: () => setActiveSound(null),
            style: {
              width: 44, height: 44, borderRadius: 22, border: `1px solid ${t.border}`,
              background: t.card, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
            }
          }, createIcon(icons.X, 20, t.textSecondary))
        ),
        // Fake waveform
        React.createElement('div', { style: { display: 'flex', alignItems: 'end', gap: 3, height: 40, justifyContent: 'center' } },
          Array.from({ length: 24 }, (_, i) => React.createElement('div', {
            key: i,
            style: {
              width: 4, borderRadius: 2,
              height: Math.max(6, Math.abs(Math.sin((animPhase + i * 15) * Math.PI / 180) * 36)),
              background: activeSound.color,
              opacity: 0.4 + Math.abs(Math.sin((animPhase + i * 15) * Math.PI / 180) * 0.6),
              transition: 'height 0.15s ease',
            }
          }))
        )
      ),

      // Sound List
      currentSounds.map((sound, i) => React.createElement('button', {
        key: sound.id,
        onClick: () => setActiveSound(activeSound?.id === sound.id ? null : sound),
        style: {
          display: 'flex', alignItems: 'center', gap: 14, padding: 16, width: '100%',
          borderRadius: 16, background: activeSound?.id === sound.id ? `${sound.color}12` : t.card,
          border: activeSound?.id === sound.id ? `1px solid ${sound.color}40` : `1px solid ${t.border}`,
          marginBottom: 10, cursor: 'pointer', textAlign: 'left',
          transition: 'all 0.2s ease',
          animation: `auraSlideUp ${0.2 + i * 0.08}s ease-out`,
        }
      },
        React.createElement('div', {
          style: {
            width: 48, height: 48, borderRadius: 14, flexShrink: 0,
            background: `${sound.color}20`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }
        }, createIcon(activeSound?.id === sound.id ? icons.Pause : icons.Play, 22, sound.color)),
        React.createElement('div', { style: { flex: 1, minWidth: 0 } },
          React.createElement('p', { style: { fontSize: 17, fontWeight: 600, color: t.text, fontFamily: font, margin: 0 } }, sound.title),
          React.createElement('p', { style: { fontSize: 13, color: t.textTertiary, fontFamily: font, margin: '3px 0 0' } }, sound.desc)
        ),
        React.createElement('span', { style: { fontSize: 13, color: t.textTertiary, fontFamily: font, flexShrink: 0 } }, sound.duration)
      ))
    );
  };

  // ── Player Screen ──
  const PlayerScreen = () => {
    const [playerPlaying, setPlayerPlaying] = useState(true);
    const flow = currentFlow || { title: 'Golden Hour Serenity', subtitle: 'A warm evening blend', gradient: ['#F59E0B', '#E11D48'] };
    const gradColors = flow.gradient || ['#E11D48', '#1E1B4B'];

    return React.createElement('div', {
      style: {
        position: 'relative', height: '100%', minHeight: 812,
        background: `linear-gradient(180deg, ${gradColors[0]}30, ${t.bg})`,
        display: 'flex', flexDirection: 'column',
        animation: 'auraFadeIn 0.5s ease-out',
      }
    },
      React.createElement(AmbientOrbs, { colors: [...gradColors, '#7C3AED'] }),

      // Top bar
      React.createElement('div', {
        style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 20px 0', position: 'relative', zIndex: 2 }
      },
        React.createElement('button', {
          onClick: () => setActiveScreen('home'),
          style: {
            width: 44, height: 44, borderRadius: 22, background: 'rgba(255,255,255,0.1)',
            border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
            backdropFilter: 'blur(10px)',
          }
        }, createIcon(icons.ChevronLeft, 24, '#FFFFFF')),
        React.createElement('button', {
          style: {
            width: 44, height: 44, borderRadius: 22, background: 'rgba(255,255,255,0.1)',
            border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
            backdropFilter: 'blur(10px)',
          }
        }, createIcon(icons.MoreHorizontal, 24, '#FFFFFF'))
      ),

      // Center visualization
      React.createElement('div', {
        style: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 1, padding: '0 40px' }
      },
        React.createElement('div', {
          style: {
            width: 220, height: 220, borderRadius: '50%', marginBottom: 40,
            background: `conic-gradient(from ${animPhase}deg, ${gradColors[0]}, ${gradColors[1]}, #7C3AED, ${gradColors[0]})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            animation: 'auraGlow 3s ease-in-out infinite',
            boxShadow: `0 0 60px ${gradColors[0]}40`,
          }
        },
          React.createElement('div', {
            style: {
              width: 200, height: 200, borderRadius: '50%', background: t.bg,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }
          },
            React.createElement('div', {
              style: {
                width: 160, height: 160, borderRadius: '50%',
                background: `linear-gradient(${animPhase}deg, ${gradColors[0]}60, ${gradColors[1]}60)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                animation: 'auraFloat 6s ease-in-out infinite',
              }
            },
              createIcon(icons.Layers, 48, '#FFFFFF')
            )
          )
        ),
        React.createElement('h2', {
          style: { fontSize: 22, fontWeight: 700, color: '#FFFFFF', fontFamily: font, textAlign: 'center', margin: '0 0 6px', letterSpacing: '-0.3px' }
        }, flow.title),
        React.createElement('p', {
          style: { fontSize: 15, color: 'rgba(255,255,255,0.6)', fontFamily: font, textAlign: 'center', margin: '0 0 8px' }
        }, flow.subtitle || flow.desc || flow.theme || ''),
        React.createElement('p', {
          style: { fontSize: 13, color: 'rgba(255,255,255,0.4)', fontFamily: font, textAlign: 'center', margin: 0 }
        }, flow.count ? `${flow.count} moments` : `${flow.photos || flow.memories || 0} memories`)
      ),

      // Controls
      React.createElement('div', {
        style: {
          padding: '0 30px 40px', position: 'relative', zIndex: 2,
        }
      },
        // Progress bar
        React.createElement('div', {
          style: { height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.15)', marginBottom: 10, overflow: 'hidden' }
        },
          React.createElement('div', {
            style: { height: '100%', width: `${(animPhase / 360) * 100}%`, borderRadius: 2, background: gradColors[0], transition: 'width 0.1s linear' }
          })
        ),
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: 24 } },
          React.createElement('span', { style: { fontSize: 11, color: 'rgba(255,255,255,0.4)', fontFamily: font } }, '1:23'),
          React.createElement('span', { style: { fontSize: 11, color: 'rgba(255,255,255,0.4)', fontFamily: font } }, '4:30')
        ),

        React.createElement('div', {
          style: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 28 }
        },
          React.createElement('button', {
            style: { width: 48, height: 48, borderRadius: 24, background: 'transparent', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }
          }, createIcon(icons.SkipBack, 28, 'rgba(255,255,255,0.7)')),
          React.createElement('button', {
            onClick: () => setPlayerPlaying(!playerPlaying),
            style: {
              width: 72, height: 72, borderRadius: 36, background: '#FFFFFF',
              border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
              boxShadow: '0 4px 24px rgba(0,0,0,0.3)', transition: 'transform 0.15s ease',
            },
            onMouseDown: e => { e.currentTarget.style.transform = 'scale(0.92)'; },
            onMouseUp: e => { e.currentTarget.style.transform = 'scale(1)'; },
          }, createIcon(playerPlaying ? icons.Pause : icons.Play, 32, '#0F0F23')),
          React.createElement('button', {
            style: { width: 48, height: 48, borderRadius: 24, background: 'transparent', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }
          }, createIcon(icons.SkipForward, 28, 'rgba(255,255,255,0.7)'))
        ),

        // Bottom actions
        React.createElement('div', {
          style: { display: 'flex', justifyContent: 'center', gap: 40, marginTop: 28 }
        },
          React.createElement('button', {
            onClick: () => setActiveScreen('sounds'),
            style: { background: 'none', border: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, cursor: 'pointer' }
          },
            createIcon(icons.Music, 20, 'rgba(255,255,255,0.5)'),
            React.createElement('span', { style: { fontSize: 11, color: 'rgba(255,255,255,0.5)', fontFamily: font } }, 'Sounds')
          ),
          React.createElement('button', {
            style: { background: 'none', border: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, cursor: 'pointer' }
          },
            createIcon(icons.Sliders, 20, 'rgba(255,255,255,0.5)'),
            React.createElement('span', { style: { fontSize: 11, color: 'rgba(255,255,255,0.5)', fontFamily: font } }, 'Adjust')
          ),
          React.createElement('button', {
            style: { background: 'none', border: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, cursor: 'pointer' }
          },
            createIcon(icons.Bookmark, 20, 'rgba(255,255,255,0.5)'),
            React.createElement('span', { style: { fontSize: 11, color: 'rgba(255,255,255,0.5)', fontFamily: font } }, 'Save')
          )
        )
      )
    );
  };

  // ── Profile Screen ──
  const ProfileScreen = () => {
    const stats = [
      { label: 'Photos', value: '2,847', icon: icons.Image },
      { label: 'Videos', value: '193', icon: icons.Video },
      { label: 'Flows', value: '24', icon: icons.Layers },
      { label: 'Hours', value: '18.5', icon: icons.Clock },
    ];

    const settings = [
      { label: 'Mood Palette AI', desc: 'Learning your calm preferences', icon: icons.Palette, toggle: true, on: true },
      { label: 'Daily Pause Prompt', desc: 'Get notified at 8:00 PM', icon: icons.Bell, toggle: true, on: true },
      { label: 'Temporal Serenity', desc: 'Slow motion & cinematic effects', icon: icons.Film, toggle: true, on: false },
      { label: 'Photo Library Access', desc: '2,847 photos analyzed', icon: icons.FolderOpen },
      { label: 'Calm Zone Themes', desc: '4 custom themes created', icon: icons.Paintbrush },
      { label: 'About AuraFlow', desc: 'Version 1.2.0', icon: icons.Info },
    ];

    const [toggleStates, setToggleStates] = useState({ 0: true, 1: true, 2: false });

    return React.createElement('div', {
      style: { padding: '20px 20px 100px', animation: 'auraFadeIn 0.4s ease-out' }
    },
      React.createElement('div', {
        style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }
      },
        React.createElement('h1', {
          style: { fontSize: 34, fontWeight: 800, color: t.text, fontFamily: font, letterSpacing: '-0.5px', margin: 0 }
        }, 'Profile'),
        React.createElement('button', {
          onClick: () => setIsDark(!isDark),
          style: {
            width: 44, height: 44, borderRadius: 22, border: `1px solid ${t.border}`,
            background: t.card, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          }
        }, createIcon(isDark ? icons.Sun : icons.Moon, 20, t.textSecondary))
      ),

      // User info
      React.createElement('div', {
        style: {
          display: 'flex', alignItems: 'center', gap: 16, padding: 20, borderRadius: 20,
          background: t.card, border: `1px solid ${t.border}`, marginBottom: 20,
        }
      },
        React.createElement('div', {
          style: {
            width: 64, height: 64, borderRadius: 32,
            background: `linear-gradient(135deg, ${t.accent}, #7C3AED)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }
        }, createIcon(icons.User, 28, '#FFFFFF')),
        React.createElement('div', null,
          React.createElement('p', { style: { fontSize: 22, fontWeight: 700, color: t.text, fontFamily: font, margin: 0, letterSpacing: '-0.3px' } }, 'Alex'),
          React.createElement('p', { style: { fontSize: 15, color: t.textSecondary, fontFamily: font, margin: '2px 0 0' } }, 'Finding calm since March 2026')
        )
      ),

      // Stats
      React.createElement('div', {
        style: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 10, marginBottom: 24 }
      },
        stats.map((stat, i) => React.createElement('div', {
          key: i,
          style: {
            padding: '16px 8px', borderRadius: 16, background: t.card,
            border: `1px solid ${t.border}`, textAlign: 'center',
            animation: `auraFadeIn ${0.2 + i * 0.08}s ease-out`,
          }
        },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'center', marginBottom: 8 } },
            createIcon(stat.icon, 20, t.accent)
          ),
          React.createElement('p', { style: { fontSize: 17, fontWeight: 700, color: t.text, fontFamily: font, margin: 0 } }, stat.value),
          React.createElement('p', { style: { fontSize: 11, color: t.textTertiary, fontFamily: font, margin: '2px 0 0' } }, stat.label)
        ))
      ),

      // Settings
      React.createElement('h3', {
        style: { fontSize: 17, fontWeight: 700, color: t.text, fontFamily: font, margin: '0 0 12px' }
      }, 'Settings'),

      settings.map((item, i) => React.createElement('div', {
        key: i,
        style: {
          display: 'flex', alignItems: 'center', gap: 14, padding: 16,
          borderRadius: 16, background: t.card, border: `1px solid ${t.border}`,
          marginBottom: 8, cursor: 'pointer', transition: 'all 0.2s ease',
          animation: `auraSlideUp ${0.3 + i * 0.06}s ease-out`,
        },
        onMouseEnter: e => { e.currentTarget.style.background = t.cardAlt; },
        onMouseLeave: e => { e.currentTarget.style.background = t.card; },
      },
        React.createElement('div', {
          style: {
            width: 44, height: 44, borderRadius: 12, background: t.accentSoft,
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }
        }, createIcon(item.icon, 22, t.accent)),
        React.createElement('div', { style: { flex: 1, minWidth: 0 } },
          React.createElement('p', { style: { fontSize: 17, fontWeight: 500, color: t.text, fontFamily: font, margin: 0 } }, item.label),
          React.createElement('p', { style: { fontSize: 13, color: t.textTertiary, fontFamily: font, margin: '2px 0 0' } }, item.desc)
        ),
        item.toggle ? React.createElement('div', {
          onClick: (e) => { e.stopPropagation(); setToggleStates(prev => ({ ...prev, [i]: !prev[i] })); },
          style: {
            width: 51, height: 31, borderRadius: 16, padding: 2,
            background: toggleStates[i] ? t.accent : (isDark ? '#333' : '#ccc'),
            transition: 'background 0.2s ease', cursor: 'pointer', flexShrink: 0,
          }
        },
          React.createElement('div', {
            style: {
              width: 27, height: 27, borderRadius: 14, background: '#FFFFFF',
              transform: toggleStates[i] ? 'translateX(20px)' : 'translateX(0)',
              transition: 'transform 0.2s ease',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
            }
          })
        ) : createIcon(icons.ChevronRight, 20, t.textTertiary)
      ))
    );
  };

  // ── Bottom Tab Bar ──
  const TabBar = () => {
    if (activeScreen === 'player') return null;

    const tabs = [
      { id: 'home', label: 'Home', icon: icons.Home },
      { id: 'explore', label: 'Explore', icon: icons.Compass },
      { id: 'sounds', label: 'Sounds', icon: icons.Music },
      { id: 'profile', label: 'Profile', icon: icons.User },
    ];

    return React.createElement('div', {
      style: {
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '10px 20px 28px',
        background: t.tabBg,
        backdropFilter: 'blur(20px)',
        borderTop: `1px solid ${t.border}`,
        display: 'flex', justifyContent: 'space-around',
      }
    },
      tabs.map(tab => React.createElement('button', {
        key: tab.id,
        onClick: () => setActiveScreen(tab.id),
        style: {
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
          background: 'none', border: 'none', cursor: 'pointer',
          padding: '4px 12px', minWidth: 48, minHeight: 44,
          transition: 'all 0.2s ease',
        }
      },
        createIcon(tab.icon, 24, activeScreen === tab.id ? t.accent : t.textTertiary),
        React.createElement('span', {
          style: {
            fontSize: 11, fontWeight: activeScreen === tab.id ? 600 : 400,
            color: activeScreen === tab.id ? t.accent : t.textTertiary,
            fontFamily: font,
          }
        }, tab.label)
      ))
    );
  };

  const screens = {
    home: HomeScreen,
    explore: ExploreScreen,
    sounds: SoundsScreen,
    player: PlayerScreen,
    profile: ProfileScreen,
  };

  const CurrentScreen = screens[activeScreen] || HomeScreen;

  return React.createElement('div', {
    style: {
      minHeight: '100vh',
      background: '#f0f0f0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px 0',
      fontFamily: font,
    }
  },
    React.createElement(StyleTag),
    React.createElement('div', {
      style: {
        width: 375,
        height: 812,
        borderRadius: 44,
        overflow: 'hidden',
        position: 'relative',
        background: t.bg,
        boxShadow: '0 25px 80px rgba(0,0,0,0.3), 0 0 0 1px rgba(0,0,0,0.1)',
      }
    },
      React.createElement('div', {
        style: {
          height: '100%',
          overflowY: 'auto',
          overflowX: 'hidden',
          WebkitOverflowScrolling: 'touch',
        }
      },
        React.createElement(CurrentScreen)
      ),
      React.createElement(TabBar)
    )
  );
}
