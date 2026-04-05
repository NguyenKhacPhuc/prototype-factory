const { useState, useEffect, useRef, useCallback } = React;

function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [isDark, setIsDark] = useState(true);
  const [activeChallenge, setActiveChallenge] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [playingTapestry, setPlayingTapestry] = useState(false);
  const [mixerLevels, setMixerLevels] = useState({ rain: 70, birds: 45, wind: 30, urban: 20, water: 55 });
  const [joinedCircles, setJoinedCircles] = useState(['Urban Explorers']);
  const [activeBadges, setActiveBadges] = useState(['First Recording', 'Week Streak']);
  const [selectedLayer, setSelectedLayer] = useState(null);
  const [tapestryPlaying, setTapestryPlaying] = useState({});

  const themes = {
    dark: {
      primary: '#1E1B4B',
      secondary: '#4338CA',
      cta: '#22C55E',
      bg: '#0F0F23',
      card: '#1a1a3e',
      cardBorder: '#2a2a5e',
      text: '#F8FAFC',
      textSecondary: '#94A3B8',
      textMuted: '#64748B',
      surface: '#161633',
      surfaceHover: '#1e1e44',
      overlay: 'rgba(15, 15, 35, 0.9)',
      tabBg: '#0a0a1e',
      inputBg: '#1a1a3e',
    },
    light: {
      primary: '#4338CA',
      secondary: '#6366F1',
      cta: '#16A34A',
      bg: '#F8FAFC',
      card: '#FFFFFF',
      cardBorder: '#E2E8F0',
      text: '#0F172A',
      textSecondary: '#475569',
      textMuted: '#94A3B8',
      surface: '#F1F5F9',
      surfaceHover: '#E2E8F0',
      overlay: 'rgba(248, 250, 252, 0.95)',
      tabBg: '#FFFFFF',
      inputBg: '#F1F5F9',
    }
  };

  const t = isDark ? themes.dark : themes.light;
  const font = "-apple-system, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif";

  // Recording timer
  useEffect(() => {
    let interval;
    if (isRecording) {
      interval = setInterval(() => setRecordingTime(p => p + 1), 1000);
    } else {
      setRecordingTime(0);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const formatTime = (s) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

  const icon = (name, size = 20, color = t.text) => {
    const Icon = window.lucide[name];
    if (!Icon) return null;
    return React.createElement(Icon, { size, color, strokeWidth: 1.8 });
  };

  // ==================== HOME SCREEN ====================
  function HomeScreen() {
    const challenges = [
      { id: 1, title: 'Morning Bird Chorus', desc: 'Record the dawn chorus near your home before 8am', icon: 'Bird', deadline: '2d left', difficulty: 'Easy', xp: 50 },
      { id: 2, title: 'Urban Machine Hum', desc: 'Capture the background drone of city infrastructure', icon: 'Building2', deadline: '5d left', difficulty: 'Medium', xp: 80 },
      { id: 3, title: 'Wind Through Leaves', desc: 'Find a tree canopy and record wind patterns', icon: 'TreePine', deadline: '1w left', difficulty: 'Easy', xp: 60 },
    ];

    const stats = [
      { label: 'Recordings', value: '23', iconName: 'Mic' },
      { label: 'Streak', value: '7d', iconName: 'Flame' },
      { label: 'Biome XP', value: '840', iconName: 'Zap' },
    ];

    return React.createElement('div', { style: { padding: '20px 16px 24px', animation: 'fadeIn 0.4s ease' } },
      // Header
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 } },
        React.createElement('div', null,
          React.createElement('h1', { style: { fontSize: 34, fontWeight: 800, color: t.text, fontFamily: font, letterSpacing: -0.5, margin: 0, lineHeight: 1.1 } }, 'Echo Weave'),
          React.createElement('p', { style: { fontSize: 15, color: t.textSecondary, fontFamily: font, margin: '4px 0 0', fontWeight: 400 } }, 'Spring Season 2026')
        ),
        React.createElement('div', { style: { display: 'flex', gap: 12, alignItems: 'center' } },
          React.createElement('button', {
            onClick: () => setIsDark(!isDark),
            style: { background: t.card, border: `1px solid ${t.cardBorder}`, borderRadius: 12, width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 200ms' }
          }, icon(isDark ? 'Sun' : 'Moon', 18)),
          React.createElement('div', {
            style: { width: 40, height: 40, borderRadius: 12, background: `linear-gradient(135deg, ${t.secondary}, ${t.cta})`, display: 'flex', alignItems: 'center', justifyContent: 'center' }
          }, icon('User', 18, '#fff'))
        )
      ),

      // Stats row
      React.createElement('div', { style: { display: 'flex', gap: 10, marginBottom: 24 } },
        stats.map((s, i) =>
          React.createElement('div', { key: i, style: { flex: 1, background: t.card, border: `1px solid ${t.cardBorder}`, borderRadius: 16, padding: '14px 12px', textAlign: 'center', transition: 'all 200ms' } },
            React.createElement('div', { style: { display: 'flex', justifyContent: 'center', marginBottom: 6 } }, icon(s.iconName, 16, t.cta)),
            React.createElement('div', { style: { fontSize: 22, fontWeight: 700, color: t.text, fontFamily: font } }, s.value),
            React.createElement('div', { style: { fontSize: 13, color: t.textMuted, fontFamily: font, fontWeight: 400 } }, s.label)
          )
        )
      ),

      // Active Tapestry Card
      React.createElement('div', {
        onClick: () => setActiveScreen('tapestry'),
        style: {
          background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})`,
          borderRadius: 20,
          padding: '20px',
          marginBottom: 24,
          cursor: 'pointer',
          position: 'relative',
          overflow: 'hidden',
          transition: 'transform 200ms',
          boxShadow: `0 8px 32px ${isDark ? 'rgba(67, 56, 202, 0.3)' : 'rgba(67, 56, 202, 0.2)'}`,
        }
      },
        // Decorative circles
        React.createElement('div', { style: { position: 'absolute', top: -20, right: -20, width: 100, height: 100, borderRadius: 50, background: 'rgba(255,255,255,0.05)', animation: 'pulse 3s infinite' } }),
        React.createElement('div', { style: { position: 'absolute', bottom: -30, left: 40, width: 80, height: 80, borderRadius: 40, background: 'rgba(255,255,255,0.03)' } }),
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' } },
          React.createElement('div', null,
            React.createElement('div', { style: { fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.7)', fontFamily: font, marginBottom: 4, textTransform: 'uppercase', letterSpacing: 1 } }, 'Community Tapestry'),
            React.createElement('div', { style: { fontSize: 22, fontWeight: 700, color: '#fff', fontFamily: font, letterSpacing: -0.5 } }, 'Urban Explorers Mix'),
            React.createElement('div', { style: { fontSize: 15, color: 'rgba(255,255,255,0.6)', fontFamily: font, marginTop: 4, fontWeight: 400 } }, '147 contributions this week')
          ),
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8 } },
            React.createElement('span', { style: { fontSize: 15, color: '#fff', fontFamily: font } }, 'Listen'),
            icon('Play', 20, '#fff')
          )
        ),
        // Waveform visualization
        React.createElement('div', { style: { display: 'flex', alignItems: 'end', gap: 2, marginTop: 16, height: 32 } },
          Array.from({ length: 30 }).map((_, i) =>
            React.createElement('div', {
              key: i,
              style: {
                flex: 1,
                height: `${15 + Math.sin(i * 0.8) * 12 + Math.random() * 8}px`,
                background: 'rgba(255,255,255,0.3)',
                borderRadius: 2,
                animation: `waveform ${1 + Math.random()}s ease-in-out infinite alternate`,
                animationDelay: `${i * 0.05}s`
              }
            })
          )
        )
      ),

      // Seasonal Challenges
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 } },
        React.createElement('h2', { style: { fontSize: 22, fontWeight: 700, color: t.text, fontFamily: font, letterSpacing: -0.5, margin: 0 } }, 'Sound Challenges'),
        React.createElement('button', {
          onClick: () => setActiveScreen('challenges'),
          style: { background: 'none', border: 'none', fontSize: 15, color: t.cta, fontFamily: font, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }
        }, React.createElement('span', null, 'See All'), icon('ChevronRight', 16, t.cta))
      ),

      challenges.map((c, i) =>
        React.createElement('div', {
          key: c.id,
          onClick: () => setActiveChallenge(c),
          style: {
            background: t.card,
            border: `1px solid ${t.cardBorder}`,
            borderRadius: 16,
            padding: '16px',
            marginBottom: 10,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            transition: 'all 200ms',
            animation: `slideUp 0.4s ease ${i * 0.1}s both`,
          }
        },
          React.createElement('div', {
            style: { width: 48, height: 48, borderRadius: 14, background: `linear-gradient(135deg, ${t.secondary}33, ${t.cta}22)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }
          }, icon(c.icon, 22, t.cta)),
          React.createElement('div', { style: { flex: 1, minWidth: 0 } },
            React.createElement('div', { style: { fontSize: 17, fontWeight: 600, color: t.text, fontFamily: font } }, c.title),
            React.createElement('div', { style: { fontSize: 13, color: t.textMuted, fontFamily: font, marginTop: 2, fontWeight: 400 } }, c.desc)
          ),
          React.createElement('div', { style: { textAlign: 'right', flexShrink: 0 } },
            React.createElement('div', { style: { fontSize: 13, fontWeight: 600, color: t.cta, fontFamily: font } }, `+${c.xp} XP`),
            React.createElement('div', { style: { fontSize: 13, color: t.textMuted, fontFamily: font, marginTop: 2 } }, c.deadline)
          )
        )
      ),

      // Challenge recording modal
      activeChallenge && React.createElement('div', {
        style: { position: 'absolute', inset: 0, background: t.overlay, zIndex: 50, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', animation: 'fadeIn 0.3s ease', backdropFilter: 'blur(10px)' }
      },
        React.createElement('div', {
          style: { background: t.card, borderRadius: '24px 24px 0 0', padding: '24px 20px 40px', border: `1px solid ${t.cardBorder}`, borderBottom: 'none' }
        },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 } },
            React.createElement('h3', { style: { fontSize: 22, fontWeight: 700, color: t.text, fontFamily: font, margin: 0, letterSpacing: -0.5 } }, activeChallenge.title),
            React.createElement('button', {
              onClick: () => { setActiveChallenge(null); setIsRecording(false); },
              style: { background: t.surface, border: 'none', borderRadius: 10, width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }
            }, icon('X', 18, t.textMuted))
          ),
          React.createElement('p', { style: { fontSize: 15, color: t.textSecondary, fontFamily: font, margin: '0 0 24px', lineHeight: 1.5, fontWeight: 400 } }, activeChallenge.desc),
          // Recording UI
          React.createElement('div', { style: { textAlign: 'center' } },
            React.createElement('div', { style: { fontSize: 34, fontWeight: 700, color: t.text, fontFamily: font, marginBottom: 20, letterSpacing: -0.5 } },
              isRecording ? formatTime(recordingTime) : '0:00'
            ),
            // Waveform when recording
            isRecording && React.createElement('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 3, marginBottom: 24, height: 48 } },
              Array.from({ length: 20 }).map((_, i) =>
                React.createElement('div', {
                  key: i,
                  style: {
                    width: 4,
                    height: `${10 + Math.random() * 38}px`,
                    background: t.cta,
                    borderRadius: 2,
                    animation: `waveform ${0.3 + Math.random() * 0.5}s ease-in-out infinite alternate`,
                    animationDelay: `${i * 0.05}s`,
                  }
                })
              )
            ),
            React.createElement('button', {
              onClick: () => setIsRecording(!isRecording),
              style: {
                width: 80, height: 80, borderRadius: 40,
                background: isRecording ? '#EF4444' : t.cta,
                border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto',
                boxShadow: isRecording ? '0 0 0 8px rgba(239,68,68,0.2)' : `0 0 0 8px ${t.cta}22`,
                transition: 'all 300ms',
                animation: isRecording ? 'pulse 1.5s infinite' : 'none'
              }
            }, icon(isRecording ? 'Square' : 'Mic', 28, '#fff')),
            React.createElement('p', { style: { fontSize: 15, color: t.textMuted, fontFamily: font, marginTop: 16, fontWeight: 400 } },
              isRecording ? 'Tap to stop recording' : 'Tap to start recording'
            )
          )
        )
      )
    );
  }

  // ==================== TAPESTRY SCREEN ====================
  function TapestryScreen() {
    const layers = [
      { id: 'rain', name: 'Gentle Rain', contributor: 'Anonymous', icon: 'CloudRain', color: '#60A5FA' },
      { id: 'birds', name: 'Sparrow Song', contributor: 'BiomeWalker', icon: 'Bird', color: '#F59E0B' },
      { id: 'wind', name: 'Canopy Breeze', contributor: 'Anonymous', icon: 'Wind', color: '#34D399' },
      { id: 'urban', name: 'Distant Traffic', contributor: 'CityListener', icon: 'Car', color: '#F472B6' },
      { id: 'water', name: 'Creek Flow', contributor: 'Anonymous', icon: 'Waves', color: '#22D3EE' },
    ];

    return React.createElement('div', { style: { padding: '20px 16px', animation: 'fadeIn 0.4s ease' } },
      // Header
      React.createElement('div', { style: { marginBottom: 24 } },
        React.createElement('h1', { style: { fontSize: 34, fontWeight: 800, color: t.text, fontFamily: font, letterSpacing: -0.5, margin: 0 } }, 'Sound Tapestry'),
        React.createElement('p', { style: { fontSize: 15, color: t.textSecondary, fontFamily: font, margin: '4px 0 0', fontWeight: 400 } }, 'Urban Explorers Biome Circle')
      ),

      // Main visualization
      React.createElement('div', {
        style: {
          background: `linear-gradient(180deg, ${t.primary}, ${t.secondary}44)`,
          borderRadius: 24,
          padding: 24,
          marginBottom: 20,
          position: 'relative',
          overflow: 'hidden',
          minHeight: 180,
        }
      },
        // Animated orbs
        React.createElement('div', { style: { position: 'absolute', top: 30, left: 30, width: 60, height: 60, borderRadius: 30, background: 'rgba(96,165,250,0.2)', animation: 'float 4s ease-in-out infinite', filter: 'blur(2px)' } }),
        React.createElement('div', { style: { position: 'absolute', top: 60, right: 50, width: 40, height: 40, borderRadius: 20, background: 'rgba(52,211,153,0.2)', animation: 'float 3s ease-in-out infinite reverse', filter: 'blur(2px)' } }),
        React.createElement('div', { style: { position: 'absolute', bottom: 40, left: '40%', width: 50, height: 50, borderRadius: 25, background: 'rgba(244,114,182,0.15)', animation: 'float 5s ease-in-out infinite', filter: 'blur(3px)' } }),

        React.createElement('div', { style: { textAlign: 'center', position: 'relative', zIndex: 1 } },
          React.createElement('div', { style: { fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.6)', fontFamily: font, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 } }, 'Now Playing'),
          React.createElement('div', { style: { fontSize: 22, fontWeight: 700, color: '#fff', fontFamily: font, letterSpacing: -0.5, marginBottom: 4 } }, 'Spring Evening Mix'),
          React.createElement('div', { style: { fontSize: 15, color: 'rgba(255,255,255,0.5)', fontFamily: font, marginBottom: 20, fontWeight: 400 } }, '5 layers blended'),
          // Play controls
          React.createElement('div', { style: { display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 24 } },
            React.createElement('button', { style: { background: 'none', border: 'none', cursor: 'pointer', padding: 8 } }, icon('SkipBack', 22, 'rgba(255,255,255,0.7)')),
            React.createElement('button', {
              onClick: () => setPlayingTapestry(!playingTapestry),
              style: { width: 64, height: 64, borderRadius: 32, background: '#fff', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.3)', transition: 'transform 150ms' }
            }, icon(playingTapestry ? 'Pause' : 'Play', 26, t.primary)),
            React.createElement('button', { style: { background: 'none', border: 'none', cursor: 'pointer', padding: 8 } }, icon('SkipForward', 22, 'rgba(255,255,255,0.7)')),
          )
        )
      ),

      // Sound Layers / Mixer
      React.createElement('h2', { style: { fontSize: 22, fontWeight: 700, color: t.text, fontFamily: font, letterSpacing: -0.5, margin: '0 0 14px' } }, 'Sound Layers'),

      layers.map((layer, i) =>
        React.createElement('div', {
          key: layer.id,
          onClick: () => setSelectedLayer(selectedLayer === layer.id ? null : layer.id),
          style: {
            background: selectedLayer === layer.id ? `${layer.color}11` : t.card,
            border: `1px solid ${selectedLayer === layer.id ? layer.color + '44' : t.cardBorder}`,
            borderRadius: 16,
            padding: '14px 16px',
            marginBottom: 8,
            cursor: 'pointer',
            transition: 'all 200ms',
            animation: `slideUp 0.4s ease ${i * 0.08}s both`,
          }
        },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12, marginBottom: selectedLayer === layer.id ? 12 : 0 } },
            React.createElement('div', {
              style: { width: 40, height: 40, borderRadius: 12, background: `${layer.color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }
            }, icon(layer.icon, 18, layer.color)),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', { style: { fontSize: 17, fontWeight: 600, color: t.text, fontFamily: font } }, layer.name),
              React.createElement('div', { style: { fontSize: 13, color: t.textMuted, fontFamily: font, fontWeight: 400 } }, `by ${layer.contributor}`)
            ),
            React.createElement('div', { style: { fontSize: 15, fontWeight: 600, color: layer.color, fontFamily: font } }, `${mixerLevels[layer.id]}%`),
            React.createElement('button', {
              onClick: (e) => {
                e.stopPropagation();
                setTapestryPlaying(p => ({ ...p, [layer.id]: !p[layer.id] }));
              },
              style: { background: tapestryPlaying[layer.id] ? `${layer.color}22` : t.surface, border: 'none', borderRadius: 10, width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', marginLeft: 4 }
            }, icon(tapestryPlaying[layer.id] ? 'Pause' : 'Play', 14, layer.color))
          ),
          // Expanded slider
          selectedLayer === layer.id && React.createElement('div', { style: { paddingLeft: 52 } },
            React.createElement('div', { style: { position: 'relative', height: 6, background: t.surface, borderRadius: 3, marginBottom: 8 } },
              React.createElement('div', { style: { position: 'absolute', left: 0, top: 0, height: 6, width: `${mixerLevels[layer.id]}%`, background: layer.color, borderRadius: 3, transition: 'width 150ms' } }),
              React.createElement('input', {
                type: 'range', min: 0, max: 100, value: mixerLevels[layer.id],
                onClick: (e) => e.stopPropagation(),
                onChange: (e) => setMixerLevels(p => ({ ...p, [layer.id]: parseInt(e.target.value) })),
                style: { position: 'absolute', left: 0, top: -8, width: '100%', height: 22, opacity: 0, cursor: 'pointer' }
              })
            ),
            React.createElement('div', { style: { fontSize: 13, color: t.textMuted, fontFamily: font, fontWeight: 400 } }, 'Drag to adjust volume level')
          )
        )
      ),

      // Save mix button
      React.createElement('button', {
        style: {
          width: '100%', padding: '16px', background: t.cta, border: 'none', borderRadius: 14,
          fontSize: 17, fontWeight: 600, color: '#fff', fontFamily: font, cursor: 'pointer',
          marginTop: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          boxShadow: `0 4px 16px ${t.cta}44`, transition: 'all 200ms'
        }
      }, icon('Save', 18, '#fff'), 'Save This Mix')
    );
  }

  // ==================== DISCOVER SCREEN ====================
  function DiscoverScreen() {
    const fieldGuide = [
      { title: 'European Robin Song', type: 'Bird', season: 'Spring', description: 'A melodious warbling heard at dawn and dusk, often from elevated perches.', icon: 'Bird', color: '#F59E0B' },
      { title: 'Rain on Broadleaves', type: 'Weather', season: 'All Year', description: 'The characteristic patter of rain hitting large-surface leaves creates a natural white noise.', icon: 'CloudRain', color: '#60A5FA' },
      { title: 'HVAC System Hum', type: 'Urban', season: 'All Year', description: 'Low-frequency drone from building ventilation, typically 50-120Hz.', icon: 'Building2', color: '#A78BFA' },
      { title: 'Creek Over Pebbles', type: 'Water', season: 'Spring', description: 'Turbulent water flowing over a rocky bed creates complex frequency patterns.', icon: 'Waves', color: '#22D3EE' },
    ];

    const categories = ['All', 'Birds', 'Weather', 'Water', 'Urban', 'Insects'];
    const [activeCategory, setActiveCategory] = useState('All');

    return React.createElement('div', { style: { padding: '20px 16px', animation: 'fadeIn 0.4s ease' } },
      React.createElement('div', { style: { marginBottom: 20 } },
        React.createElement('h1', { style: { fontSize: 34, fontWeight: 800, color: t.text, fontFamily: font, letterSpacing: -0.5, margin: 0 } }, 'Discover'),
        React.createElement('p', { style: { fontSize: 15, color: t.textSecondary, fontFamily: font, margin: '4px 0 0', fontWeight: 400 } }, 'Audio field guide & learning')
      ),

      // Search bar
      React.createElement('div', {
        style: { display: 'flex', alignItems: 'center', gap: 10, background: t.inputBg, borderRadius: 14, padding: '12px 14px', marginBottom: 18, border: `1px solid ${t.cardBorder}` }
      },
        icon('Search', 18, t.textMuted),
        React.createElement('span', { style: { fontSize: 17, color: t.textMuted, fontFamily: font, fontWeight: 400 } }, 'Search sounds, species...')
      ),

      // Category pills
      React.createElement('div', { style: { display: 'flex', gap: 8, marginBottom: 20, overflowX: 'auto', paddingBottom: 4 } },
        categories.map(cat =>
          React.createElement('button', {
            key: cat,
            onClick: () => setActiveCategory(cat),
            style: {
              padding: '8px 16px',
              borderRadius: 20,
              border: 'none',
              background: activeCategory === cat ? t.cta : t.card,
              color: activeCategory === cat ? '#fff' : t.textSecondary,
              fontSize: 15, fontWeight: 600, fontFamily: font,
              cursor: 'pointer', whiteSpace: 'nowrap',
              transition: 'all 200ms',
              boxShadow: activeCategory === cat ? `0 2px 8px ${t.cta}44` : 'none',
            }
          }, cat)
        )
      ),

      // Trending section
      React.createElement('div', {
        style: { background: `linear-gradient(135deg, ${t.cta}15, ${t.secondary}15)`, borderRadius: 20, padding: 20, marginBottom: 20, border: `1px solid ${t.cta}22` }
      },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 } },
          icon('TrendingUp', 18, t.cta),
          React.createElement('span', { style: { fontSize: 17, fontWeight: 600, color: t.text, fontFamily: font } }, 'Trending This Week')
        ),
        React.createElement('div', { style: { display: 'flex', gap: 10 } },
          [
            { name: 'Dawn Chorus', count: '234 recordings', gradient: `linear-gradient(135deg, #F59E0B, #F97316)` },
            { name: 'Rain Patterns', count: '189 recordings', gradient: `linear-gradient(135deg, #3B82F6, #6366F1)` },
          ].map((trend, i) =>
            React.createElement('div', {
              key: i,
              style: { flex: 1, background: trend.gradient, borderRadius: 14, padding: '14px', cursor: 'pointer', transition: 'transform 150ms' }
            },
              React.createElement('div', { style: { fontSize: 15, fontWeight: 600, color: '#fff', fontFamily: font } }, trend.name),
              React.createElement('div', { style: { fontSize: 13, color: 'rgba(255,255,255,0.7)', fontFamily: font, marginTop: 4, fontWeight: 400 } }, trend.count)
            )
          )
        )
      ),

      // Field Guide entries
      React.createElement('h2', { style: { fontSize: 22, fontWeight: 700, color: t.text, fontFamily: font, letterSpacing: -0.5, margin: '0 0 14px' } }, 'Audio Field Guide'),

      fieldGuide.map((item, i) =>
        React.createElement('div', {
          key: i,
          style: {
            background: t.card, border: `1px solid ${t.cardBorder}`, borderRadius: 16,
            padding: 16, marginBottom: 10, cursor: 'pointer', transition: 'all 200ms',
            animation: `slideUp 0.4s ease ${i * 0.08}s both`,
          }
        },
          React.createElement('div', { style: { display: 'flex', alignItems: 'flex-start', gap: 12 } },
            React.createElement('div', {
              style: { width: 48, height: 48, borderRadius: 14, background: `${item.color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }
            }, icon(item.icon, 22, item.color)),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', { style: { fontSize: 17, fontWeight: 600, color: t.text, fontFamily: font } }, item.title),
              React.createElement('div', { style: { display: 'flex', gap: 8, marginTop: 4, marginBottom: 6 } },
                React.createElement('span', { style: { fontSize: 13, color: item.color, fontWeight: 600, fontFamily: font, background: `${item.color}15`, padding: '2px 8px', borderRadius: 6 } }, item.type),
                React.createElement('span', { style: { fontSize: 13, color: t.textMuted, fontFamily: font, fontWeight: 400 } }, item.season)
              ),
              React.createElement('p', { style: { fontSize: 15, color: t.textSecondary, fontFamily: font, margin: 0, lineHeight: 1.4, fontWeight: 400 } }, item.description)
            )
          )
        )
      )
    );
  }

  // ==================== COMMUNITY SCREEN ====================
  function CommunityScreen() {
    const circles = [
      { name: 'Urban Explorers', members: 342, recordings: '2.1k', joined: true, color: '#A78BFA', icon: 'Building2' },
      { name: 'Forest Dwellers', members: 518, recordings: '3.4k', joined: false, color: '#34D399', icon: 'TreePine' },
      { name: 'Coastal Listeners', members: 276, recordings: '1.8k', joined: false, color: '#22D3EE', icon: 'Waves' },
      { name: 'Night Owls', members: 189, recordings: '980', joined: false, color: '#F59E0B', icon: 'Moon' },
    ];

    const badges = [
      { name: 'First Recording', desc: 'Submit your first sound', earned: true, icon: 'Mic', color: '#22C55E' },
      { name: 'Week Streak', desc: '7 days of recording', earned: true, icon: 'Flame', color: '#F59E0B' },
      { name: 'Blend Master', desc: 'Create 10 custom mixes', earned: false, icon: 'Sliders', color: '#A78BFA' },
      { name: 'Dawn Patrol', desc: 'Record before 6am', earned: false, icon: 'Sunrise', color: '#F472B6' },
      { name: 'Sound Scholar', desc: 'Identify 50 sounds', earned: false, icon: 'GraduationCap', color: '#60A5FA' },
      { name: 'Community Pillar', desc: '100 contributions', earned: false, icon: 'Heart', color: '#EF4444' },
    ];

    const leaderboard = [
      { rank: 1, name: 'SoundWalker', xp: 2340, avatar: '#22C55E' },
      { rank: 2, name: 'BiomeHunter', xp: 2180, avatar: '#3B82F6' },
      { rank: 3, name: 'NightOwlNina', xp: 1960, avatar: '#F59E0B' },
      { rank: 4, name: 'You', xp: 840, avatar: t.secondary, isUser: true },
    ];

    return React.createElement('div', { style: { padding: '20px 16px', animation: 'fadeIn 0.4s ease' } },
      React.createElement('div', { style: { marginBottom: 20 } },
        React.createElement('h1', { style: { fontSize: 34, fontWeight: 800, color: t.text, fontFamily: font, letterSpacing: -0.5, margin: 0 } }, 'Community'),
        React.createElement('p', { style: { fontSize: 15, color: t.textSecondary, fontFamily: font, margin: '4px 0 0', fontWeight: 400 } }, 'Biome Circles & achievements')
      ),

      // Leaderboard mini
      React.createElement('div', {
        style: { background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})`, borderRadius: 20, padding: 20, marginBottom: 20, boxShadow: `0 8px 32px ${isDark ? 'rgba(67,56,202,0.3)' : 'rgba(67,56,202,0.15)'}` }
      },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 } },
          icon('Trophy', 18, '#F59E0B'),
          React.createElement('span', { style: { fontSize: 17, fontWeight: 600, color: '#fff', fontFamily: font } }, 'Weekly Leaderboard')
        ),
        leaderboard.map((entry, i) =>
          React.createElement('div', {
            key: i,
            style: {
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '8px 12px', borderRadius: 12, marginBottom: 4,
              background: entry.isUser ? 'rgba(255,255,255,0.1)' : 'transparent',
            }
          },
            React.createElement('span', { style: { fontSize: 15, fontWeight: 700, color: i === 0 ? '#F59E0B' : i === 1 ? '#C0C0C0' : i === 2 ? '#CD7F32' : 'rgba(255,255,255,0.6)', fontFamily: font, width: 24 } }, `#${entry.rank}`),
            React.createElement('div', { style: { width: 32, height: 32, borderRadius: 10, background: entry.avatar, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
              icon('User', 14, '#fff')
            ),
            React.createElement('span', { style: { flex: 1, fontSize: 15, fontWeight: entry.isUser ? 700 : 400, color: '#fff', fontFamily: font } }, entry.name),
            React.createElement('span', { style: { fontSize: 15, fontWeight: 600, color: 'rgba(255,255,255,0.7)', fontFamily: font } }, `${entry.xp} XP`)
          )
        )
      ),

      // Biome Circles
      React.createElement('h2', { style: { fontSize: 22, fontWeight: 700, color: t.text, fontFamily: font, letterSpacing: -0.5, margin: '0 0 14px' } }, 'Biome Circles'),

      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 24 } },
        circles.map((circle, i) =>
          React.createElement('div', {
            key: i,
            onClick: () => {
              if (!circle.joined) {
                setJoinedCircles(p => [...p, circle.name]);
              }
            },
            style: {
              background: t.card, border: `1px solid ${circle.joined || joinedCircles.includes(circle.name) ? circle.color + '44' : t.cardBorder}`,
              borderRadius: 16, padding: 16, cursor: 'pointer', transition: 'all 200ms',
              animation: `slideUp 0.4s ease ${i * 0.08}s both`,
            }
          },
            React.createElement('div', {
              style: { width: 44, height: 44, borderRadius: 14, background: `${circle.color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }
            }, icon(circle.icon, 20, circle.color)),
            React.createElement('div', { style: { fontSize: 17, fontWeight: 600, color: t.text, fontFamily: font, marginBottom: 4 } }, circle.name),
            React.createElement('div', { style: { fontSize: 13, color: t.textMuted, fontFamily: font, fontWeight: 400 } }, `${circle.members} members`),
            React.createElement('div', { style: { fontSize: 13, color: t.textMuted, fontFamily: font, marginBottom: 10, fontWeight: 400 } }, `${circle.recordings} sounds`),
            (circle.joined || joinedCircles.includes(circle.name))
              ? React.createElement('div', { style: { fontSize: 13, fontWeight: 600, color: circle.color, fontFamily: font, display: 'flex', alignItems: 'center', gap: 4 } },
                  icon('Check', 14, circle.color), 'Joined')
              : React.createElement('div', { style: { fontSize: 13, fontWeight: 600, color: t.cta, fontFamily: font } }, 'Join')
          )
        )
      ),

      // Badges
      React.createElement('h2', { style: { fontSize: 22, fontWeight: 700, color: t.text, fontFamily: font, letterSpacing: -0.5, margin: '0 0 14px' } }, 'Badges'),

      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 } },
        badges.map((badge, i) =>
          React.createElement('div', {
            key: i,
            style: {
              background: t.card, border: `1px solid ${badge.earned ? badge.color + '44' : t.cardBorder}`,
              borderRadius: 16, padding: '14px 10px', textAlign: 'center',
              opacity: badge.earned ? 1 : 0.5,
              transition: 'all 200ms',
              animation: `slideUp 0.4s ease ${i * 0.06}s both`,
            }
          },
            React.createElement('div', {
              style: { width: 44, height: 44, borderRadius: 22, background: badge.earned ? `${badge.color}22` : t.surface, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px' }
            }, icon(badge.icon, 20, badge.earned ? badge.color : t.textMuted)),
            React.createElement('div', { style: { fontSize: 13, fontWeight: 600, color: t.text, fontFamily: font, marginBottom: 2 } }, badge.name),
            React.createElement('div', { style: { fontSize: 11, color: t.textMuted, fontFamily: font, fontWeight: 400 } }, badge.desc)
          )
        )
      )
    );
  }

  // ==================== NAVIGATION ====================
  const tabs = [
    { id: 'home', label: 'Home', icon: 'Home' },
    { id: 'tapestry', label: 'Tapestry', icon: 'AudioWaveform' },
    { id: 'discover', label: 'Discover', icon: 'Compass' },
    { id: 'community', label: 'Community', icon: 'Users' },
  ];

  const screens = {
    home: HomeScreen,
    tapestry: TapestryScreen,
    discover: DiscoverScreen,
    community: CommunityScreen,
  };

  const ActiveScreenComponent = screens[activeScreen] || HomeScreen;

  return React.createElement('div', {
    style: { minHeight: '100vh', background: '#f0f0f0', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px 0', fontFamily: font }
  },
    // Style tag for animations
    React.createElement('style', null, `
      @keyframes fadeIn {
        from { opacity: 0; } to { opacity: 1; }
      }
      @keyframes slideUp {
        from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); }
      }
      @keyframes pulse {
        0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); }
      }
      @keyframes waveform {
        0% { transform: scaleY(0.5); } 100% { transform: scaleY(1); }
      }
      @keyframes float {
        0%, 100% { transform: translateY(0); } 50% { transform: translateY(-12px); }
      }
      @keyframes shimmer {
        0% { background-position: -200% 0; } 100% { background-position: 200% 0; }
      }
      input[type=range]::-webkit-slider-thumb {
        -webkit-appearance: none;
        width: 18px; height: 18px; border-radius: 9px;
        background: #fff; box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        cursor: pointer;
      }
      * { -webkit-tap-highlight-color: transparent; }
      ::-webkit-scrollbar { display: none; }
    `),

    // Phone frame
    React.createElement('div', {
      style: {
        width: 375, height: 812,
        background: t.bg,
        borderRadius: 40,
        overflow: 'hidden',
        position: 'relative',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.1)',
        display: 'flex',
        flexDirection: 'column',
        transition: 'background 300ms',
      }
    },
      // Scrollable content area
      React.createElement('div', {
        style: { flex: 1, overflowY: 'auto', overflowX: 'hidden', paddingBottom: 80 }
      },
        React.createElement(ActiveScreenComponent)
      ),

      // Bottom tab bar
      React.createElement('div', {
        style: {
          position: 'absolute',
          bottom: 0, left: 0, right: 0,
          background: t.tabBg,
          borderTop: `1px solid ${t.cardBorder}`,
          display: 'flex',
          paddingBottom: 20,
          paddingTop: 8,
          backdropFilter: 'blur(20px)',
        }
      },
        tabs.map(tab =>
          React.createElement('button', {
            key: tab.id,
            onClick: () => setActiveScreen(tab.id),
            style: {
              flex: 1, background: 'none', border: 'none',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
              cursor: 'pointer', padding: '4px 0',
              transition: 'all 150ms',
            }
          },
            React.createElement('div', {
              style: {
                width: 44, height: 28, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: activeScreen === tab.id ? `${t.secondary}22` : 'transparent',
                transition: 'all 200ms',
              }
            }, icon(tab.icon, 20, activeScreen === tab.id ? t.cta : t.textMuted)),
            React.createElement('span', {
              style: { fontSize: 11, fontWeight: activeScreen === tab.id ? 600 : 400, color: activeScreen === tab.id ? t.cta : t.textMuted, fontFamily: font }
            }, tab.label)
          )
        )
      )
    )
  );
}
