const { useState, useEffect, useRef, useCallback } = React;

function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [isDark, setIsDark] = useState(true);
  const [currentEcho, setCurrentEcho] = useState(null);
  const [playingLoom, setPlayingLoom] = useState(false);
  const [activeLayers, setActiveLayers] = useState(['rain', 'chimes']);
  const [resonatedPosts, setResonatedPosts] = useState({});
  const [expandedLore, setExpandedLore] = useState(null);
  const [weaveStep, setWeaveStep] = useState(0);
  const [selectedSeed, setSelectedSeed] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [loomVisualizerPhase, setLoomVisualizerPhase] = useState(0);

  const themes = {
    dark: {
      primary: '#1E1B4B',
      secondary: '#4338CA',
      cta: '#22C55E',
      bg: '#0F0F23',
      surface: '#1a1a3e',
      surfaceLight: '#252550',
      text: '#F1F0FF',
      textSecondary: '#A5A3C9',
      textMuted: '#6B6999',
      cardBg: '#16163a',
      border: '#2a2a5a',
    },
    light: {
      primary: '#1E1B4B',
      secondary: '#4338CA',
      cta: '#22C55E',
      bg: '#F5F3FF',
      surface: '#FFFFFF',
      surfaceLight: '#EDE9FE',
      text: '#1E1B4B',
      textSecondary: '#4338CA',
      textMuted: '#7C7AAF',
      cardBg: '#FFFFFF',
      border: '#DDD6FE',
    }
  };

  const t = isDark ? themes.dark : themes.light;

  const font = "-apple-system, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif";

  // Loom visualizer animation
  useEffect(() => {
    if (playingLoom) {
      const interval = setInterval(() => {
        setLoomVisualizerPhase(p => (p + 1) % 360);
      }, 50);
      return () => clearInterval(interval);
    }
  }, [playingLoom]);

  const icons = window.lucide || {};

  const createIcon = (IconComponent, size = 24, color = t.text, props = {}) => {
    if (!IconComponent) return null;
    return React.createElement(IconComponent, { size, color, strokeWidth: 1.8, ...props });
  };

  // ========== HOME SCREEN ==========
  function HomeScreen() {
    const seeds = [
      { id: 1, name: 'Morning Dew', type: 'Melody', season: 'Spring', unlocked: true, color: '#22C55E' },
      { id: 2, name: 'Petal Fall', type: 'Rhythm', season: 'Spring', unlocked: true, color: '#A78BFA' },
      { id: 3, name: 'Brook Murmur', type: 'Texture', season: 'Spring', unlocked: false, color: '#38BDF8' },
      { id: 4, name: 'Birdsong Call', type: 'Melody', season: 'Spring', unlocked: false, color: '#FB923C' },
    ];

    const stats = [
      { label: 'Echoes Woven', value: '47', icon: icons.Waves },
      { label: 'Days Active', value: '12', icon: icons.Flame },
      { label: 'Resonance', value: '89', icon: icons.Heart },
    ];

    return React.createElement('div', { style: { padding: '20px 16px', paddingBottom: 100 } },
      // Header
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 } },
        React.createElement('div', null,
          React.createElement('h1', { style: { fontFamily: font, fontSize: 34, fontWeight: 800, color: t.text, letterSpacing: -0.5, margin: 0, lineHeight: 1.1 } }, 'Echo Loom'),
          React.createElement('p', { style: { fontFamily: font, fontSize: 15, color: t.textSecondary, margin: '4px 0 0', fontWeight: 400 } }, 'Spring Soundscape · Day 12')
        ),
        React.createElement('button', {
          onClick: () => setIsDark(!isDark),
          style: { width: 44, height: 44, borderRadius: 22, background: t.surfaceLight, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'transform 150ms' }
        }, createIcon(isDark ? icons.Sun : icons.Moon, 20, t.textSecondary))
      ),

      // Stats Row
      React.createElement('div', { style: { display: 'flex', gap: 10, marginBottom: 24 } },
        stats.map((stat, i) =>
          React.createElement('div', { key: i, style: {
            flex: 1, background: t.surface, borderRadius: 16, padding: '14px 12px', textAlign: 'center',
            border: `1px solid ${t.border}`, boxShadow: isDark ? '0 4px 20px rgba(0,0,0,0.3)' : '0 2px 10px rgba(0,0,0,0.06)'
          }},
            React.createElement('div', { style: { display: 'flex', justifyContent: 'center', marginBottom: 6 } },
              createIcon(stat.icon, 18, t.cta)
            ),
            React.createElement('div', { style: { fontFamily: font, fontSize: 22, fontWeight: 700, color: t.text, letterSpacing: -0.5 } }, stat.value),
            React.createElement('div', { style: { fontFamily: font, fontSize: 11, fontWeight: 600, color: t.textMuted, textTransform: 'uppercase', letterSpacing: 0.5 } }, stat.label)
          )
        )
      ),

      // Current Season Card
      React.createElement('div', { style: {
        background: `linear-gradient(135deg, ${t.secondary}, ${t.primary})`,
        borderRadius: 20, padding: 20, marginBottom: 24, position: 'relative', overflow: 'hidden'
      }},
        React.createElement('div', { style: {
          position: 'absolute', top: -20, right: -20, width: 120, height: 120,
          borderRadius: '50%', background: 'rgba(34,197,94,0.15)', animation: 'pulse 3s ease-in-out infinite'
        }}),
        React.createElement('div', { style: {
          position: 'absolute', bottom: -30, left: 40, width: 80, height: 80,
          borderRadius: '50%', background: 'rgba(167,139,250,0.1)', animation: 'pulse 4s ease-in-out infinite 1s'
        }}),
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10, position: 'relative', zIndex: 1 } },
          createIcon(icons.Leaf, 18, '#22C55E'),
          React.createElement('span', { style: { fontFamily: font, fontSize: 13, fontWeight: 600, color: '#22C55E', textTransform: 'uppercase', letterSpacing: 1 } }, 'Spring Challenge')
        ),
        React.createElement('h2', { style: { fontFamily: font, fontSize: 22, fontWeight: 700, color: '#fff', margin: '0 0 6px', letterSpacing: -0.3, position: 'relative', zIndex: 1 } }, 'Dawn Chorus Weave'),
        React.createElement('p', { style: { fontFamily: font, fontSize: 15, color: 'rgba(255,255,255,0.75)', margin: '0 0 16px', lineHeight: 1.4, position: 'relative', zIndex: 1 } },
          'Combine birdsong echoes with morning textures. 3 days remaining.'
        ),
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12, position: 'relative', zIndex: 1 } },
          React.createElement('div', { style: { flex: 1, height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.15)' } },
            React.createElement('div', { style: { width: '62%', height: '100%', borderRadius: 3, background: '#22C55E', transition: 'width 500ms' } })
          ),
          React.createElement('span', { style: { fontFamily: font, fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.8)' } }, '62%')
        )
      ),

      // Daily Echo Seeds
      React.createElement('div', { style: { marginBottom: 8 } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 } },
          React.createElement('h3', { style: { fontFamily: font, fontSize: 17, fontWeight: 700, color: t.text, margin: 0 } }, "Today's Echo Seeds"),
          React.createElement('span', { style: { fontFamily: font, fontSize: 13, color: t.cta, fontWeight: 600, cursor: 'pointer' } }, 'See All')
        ),
        seeds.map((seed, i) =>
          React.createElement('div', {
            key: seed.id,
            onClick: () => { if (seed.unlocked) { setSelectedSeed(seed); setWeaveStep(0); setActiveScreen('weave'); }},
            style: {
              display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px',
              background: t.cardBg, borderRadius: 14, marginBottom: 10,
              border: `1px solid ${t.border}`, cursor: seed.unlocked ? 'pointer' : 'default',
              opacity: seed.unlocked ? 1 : 0.5, transition: 'transform 150ms, box-shadow 150ms',
              boxShadow: isDark ? '0 2px 10px rgba(0,0,0,0.2)' : '0 1px 4px rgba(0,0,0,0.05)',
              animation: `slideUp 400ms ease-out ${i * 80}ms both`
            }
          },
            React.createElement('div', { style: {
              width: 44, height: 44, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: `${seed.color}20`
            }},
              createIcon(seed.unlocked ? icons.Music : icons.Lock, 20, seed.color)
            ),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', { style: { fontFamily: font, fontSize: 17, fontWeight: 600, color: t.text } }, seed.name),
              React.createElement('div', { style: { fontFamily: font, fontSize: 13, color: t.textMuted, marginTop: 2 } },
                seed.type + ' · ' + seed.season
              )
            ),
            seed.unlocked && createIcon(icons.ChevronRight, 18, t.textMuted)
          )
        )
      )
    );
  }

  // ========== LOOM SCREEN ==========
  function LoomScreen() {
    const layers = [
      { id: 'rain', name: 'Spring Rain', contributors: 234, active: activeLayers.includes('rain'), color: '#38BDF8' },
      { id: 'chimes', name: 'Wind Chimes', contributors: 189, active: activeLayers.includes('chimes'), color: '#A78BFA' },
      { id: 'birds', name: 'Dawn Birds', contributors: 312, active: activeLayers.includes('birds'), color: '#22C55E' },
      { id: 'stream', name: 'Brook Flow', contributors: 156, active: activeLayers.includes('stream'), color: '#FB923C' },
      { id: 'bells', name: 'Temple Bells', contributors: 98, active: activeLayers.includes('bells'), color: '#F472B6' },
    ];

    const toggleLayer = (id) => {
      setActiveLayers(prev => prev.includes(id) ? prev.filter(l => l !== id) : [...prev, id]);
    };

    // Generate visualizer bars
    const bars = Array.from({ length: 32 }, (_, i) => {
      const height = playingLoom
        ? 8 + Math.sin((loomVisualizerPhase + i * 15) * Math.PI / 180) * 25 + Math.random() * 10
        : 4 + Math.sin(i * 0.5) * 3;
      return height;
    });

    return React.createElement('div', { style: { padding: '20px 16px', paddingBottom: 100 } },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 } },
        React.createElement('h1', { style: { fontFamily: font, fontSize: 34, fontWeight: 800, color: t.text, letterSpacing: -0.5, margin: 0 } }, 'The Loom'),
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6, background: t.surfaceLight, borderRadius: 20, padding: '6px 12px' } },
          React.createElement('div', { style: { width: 8, height: 8, borderRadius: 4, background: '#22C55E', animation: 'pulse 2s infinite' } }),
          React.createElement('span', { style: { fontFamily: font, fontSize: 13, fontWeight: 600, color: t.textSecondary } }, '1,247 weavers')
        )
      ),

      // Visualizer
      React.createElement('div', { style: {
        background: `linear-gradient(180deg, ${t.primary}, ${t.surface})`,
        borderRadius: 24, padding: '24px 16px', marginBottom: 20, position: 'relative', overflow: 'hidden',
        border: `1px solid ${t.border}`
      }},
        React.createElement('div', { style: {
          position: 'absolute', inset: 0, background: `radial-gradient(circle at 50% 30%, ${t.secondary}30, transparent 60%)`
        }}),
        React.createElement('div', { style: { display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 3, height: 80, marginBottom: 20, position: 'relative', zIndex: 1 } },
          bars.map((h, i) =>
            React.createElement('div', { key: i, style: {
              width: 6, height: h, borderRadius: 3, transition: playingLoom ? 'height 80ms' : 'height 500ms',
              background: `linear-gradient(180deg, ${t.cta}, ${t.secondary})`
            }})
          )
        ),
        React.createElement('div', { style: { textAlign: 'center', position: 'relative', zIndex: 1 } },
          React.createElement('div', { style: { fontFamily: font, fontSize: 15, fontWeight: 600, color: t.text, marginBottom: 4 } }, 'Spring Collective · Week 12'),
          React.createElement('div', { style: { fontFamily: font, fontSize: 13, color: t.textMuted } },
            activeLayers.length + ' layers active · ' + (playingLoom ? 'Playing' : 'Paused')
          )
        ),
        // Play button
        React.createElement('div', { style: { display: 'flex', justifyContent: 'center', marginTop: 16, position: 'relative', zIndex: 1 } },
          React.createElement('button', {
            onClick: () => setPlayingLoom(!playingLoom),
            style: {
              width: 56, height: 56, borderRadius: 28, background: t.cta, border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: `0 4px 20px ${t.cta}50`, transition: 'transform 150ms'
            }
          }, createIcon(playingLoom ? icons.Pause : icons.Play, 24, '#fff'))
        )
      ),

      // Layer Mixer
      React.createElement('h3', { style: { fontFamily: font, fontSize: 17, fontWeight: 700, color: t.text, margin: '0 0 14px' } }, 'Layer Mixer'),
      layers.map((layer, i) =>
        React.createElement('div', {
          key: layer.id,
          onClick: () => toggleLayer(layer.id),
          style: {
            display: 'flex', alignItems: 'center', gap: 14, padding: '12px 16px',
            background: layer.active ? `${layer.color}12` : t.cardBg,
            borderRadius: 14, marginBottom: 8, cursor: 'pointer',
            border: `1px solid ${layer.active ? layer.color + '40' : t.border}`,
            transition: 'all 200ms', animation: `slideUp 300ms ease-out ${i * 60}ms both`
          }
        },
          React.createElement('div', { style: {
            width: 40, height: 40, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: `${layer.color}25`
          }}, createIcon(icons.AudioLines, 18, layer.color)),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', { style: { fontFamily: font, fontSize: 15, fontWeight: 600, color: t.text } }, layer.name),
            React.createElement('div', { style: { fontFamily: font, fontSize: 13, color: t.textMuted } }, layer.contributors + ' contributors')
          ),
          React.createElement('div', { style: {
            width: 44, height: 26, borderRadius: 13, padding: 2,
            background: layer.active ? t.cta : t.border, transition: 'background 200ms', cursor: 'pointer'
          }},
            React.createElement('div', { style: {
              width: 22, height: 22, borderRadius: 11, background: '#fff',
              transform: layer.active ? 'translateX(18px)' : 'translateX(0)', transition: 'transform 200ms'
            }})
          )
        )
      )
    );
  }

  // ========== WEAVE SCREEN ==========
  function WeaveScreen() {
    const seedOptions = [
      { id: 1, name: 'Morning Dew', type: 'Melody', color: '#22C55E', waveform: [3,5,8,12,10,7,9,14,11,6,8,4] },
      { id: 2, name: 'Petal Fall', type: 'Rhythm', color: '#A78BFA', waveform: [6,3,9,4,11,5,8,3,10,6,4,7] },
    ];

    const filterOptions = [
      { id: 'reverb', name: 'Cavern Reverb', icon: icons.Mountain },
      { id: 'chorus', name: 'Forest Chorus', icon: icons.TreePine },
      { id: 'shimmer', name: 'Crystal Shimmer', icon: icons.Sparkles },
      { id: 'warmth', name: 'Hearthside Warmth', icon: icons.Flame },
      { id: 'water', name: 'Underwater', icon: icons.Droplets },
      { id: 'wind', name: 'Open Wind', icon: icons.Wind },
    ];

    const toggleFilter = (id) => {
      setSelectedFilters(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
    };

    const seed = selectedSeed || seedOptions[0];

    return React.createElement('div', { style: { padding: '20px 16px', paddingBottom: 100 } },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 } },
        React.createElement('h1', { style: { fontFamily: font, fontSize: 34, fontWeight: 800, color: t.text, letterSpacing: -0.5, margin: 0 } }, 'Weave'),
        React.createElement('div', { style: { fontFamily: font, fontSize: 13, color: t.textMuted, background: t.surfaceLight, borderRadius: 20, padding: '6px 14px', fontWeight: 600 } },
          'Step ' + (weaveStep + 1) + ' of 3'
        )
      ),

      // Step 0: Choose seed
      weaveStep === 0 && React.createElement('div', null,
        React.createElement('h3', { style: { fontFamily: font, fontSize: 17, fontWeight: 700, color: t.text, margin: '0 0 6px' } }, 'Choose Your Echo Seed'),
        React.createElement('p', { style: { fontFamily: font, fontSize: 15, color: t.textMuted, margin: '0 0 16px' } }, 'Select a base sound to begin weaving'),
        seedOptions.map((s, i) =>
          React.createElement('div', {
            key: s.id,
            onClick: () => setSelectedSeed(s),
            style: {
              padding: 16, background: selectedSeed?.id === s.id ? `${s.color}15` : t.cardBg,
              borderRadius: 16, marginBottom: 12, cursor: 'pointer',
              border: `2px solid ${selectedSeed?.id === s.id ? s.color : t.border}`,
              transition: 'all 200ms', animation: `fadeIn 400ms ease-out ${i * 100}ms both`
            }
          },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 } },
              React.createElement('div', { style: { width: 44, height: 44, borderRadius: 12, background: `${s.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
                createIcon(icons.Music, 22, s.color)
              ),
              React.createElement('div', null,
                React.createElement('div', { style: { fontFamily: font, fontSize: 17, fontWeight: 600, color: t.text } }, s.name),
                React.createElement('div', { style: { fontFamily: font, fontSize: 13, color: t.textMuted } }, s.type + ' Seed')
              )
            ),
            // Waveform
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 3, height: 40 } },
              s.waveform.map((h, j) =>
                React.createElement('div', { key: j, style: {
                  flex: 1, height: h * 3, borderRadius: 2, background: selectedSeed?.id === s.id ? s.color : t.border,
                  transition: 'all 300ms'
                }})
              )
            )
          )
        ),
        React.createElement('button', {
          onClick: () => { if (selectedSeed) setWeaveStep(1); },
          style: {
            width: '100%', padding: '16px', borderRadius: 14, border: 'none',
            background: selectedSeed ? t.cta : t.border, color: '#fff',
            fontFamily: font, fontSize: 17, fontWeight: 600, cursor: selectedSeed ? 'pointer' : 'default',
            boxShadow: selectedSeed ? `0 4px 20px ${t.cta}40` : 'none', transition: 'all 200ms', marginTop: 8
          }
        }, 'Continue')
      ),

      // Step 1: Add filters
      weaveStep === 1 && React.createElement('div', null,
        React.createElement('div', { style: {
          background: `${seed.color}15`, borderRadius: 16, padding: 16, marginBottom: 20,
          border: `1px solid ${seed.color}30`, display: 'flex', alignItems: 'center', gap: 12
        }},
          createIcon(icons.Music, 20, seed.color),
          React.createElement('div', null,
            React.createElement('div', { style: { fontFamily: font, fontSize: 15, fontWeight: 600, color: t.text } }, seed.name),
            React.createElement('div', { style: { fontFamily: font, fontSize: 13, color: t.textMuted } }, 'Base seed selected')
          )
        ),
        React.createElement('h3', { style: { fontFamily: font, fontSize: 17, fontWeight: 700, color: t.text, margin: '0 0 6px' } }, 'Add Sonic Layers'),
        React.createElement('p', { style: { fontFamily: font, fontSize: 15, color: t.textMuted, margin: '0 0 16px' } }, 'Choose textures and filters to shape your echo'),
        React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 } },
          filterOptions.map((f, i) =>
            React.createElement('div', {
              key: f.id,
              onClick: () => toggleFilter(f.id),
              style: {
                padding: 16, borderRadius: 14, cursor: 'pointer', textAlign: 'center',
                background: selectedFilters.includes(f.id) ? `${t.cta}18` : t.cardBg,
                border: `1.5px solid ${selectedFilters.includes(f.id) ? t.cta : t.border}`,
                transition: 'all 200ms', animation: `slideUp 300ms ease-out ${i * 60}ms both`
              }
            },
              React.createElement('div', { style: { marginBottom: 8, display: 'flex', justifyContent: 'center' } },
                createIcon(f.icon, 24, selectedFilters.includes(f.id) ? t.cta : t.textMuted)
              ),
              React.createElement('div', { style: { fontFamily: font, fontSize: 15, fontWeight: 600, color: t.text } }, f.name)
            )
          )
        ),
        React.createElement('div', { style: { display: 'flex', gap: 10, marginTop: 20 } },
          React.createElement('button', {
            onClick: () => setWeaveStep(0),
            style: { flex: 1, padding: 16, borderRadius: 14, border: `1px solid ${t.border}`, background: 'transparent', color: t.text, fontFamily: font, fontSize: 15, fontWeight: 600, cursor: 'pointer' }
          }, 'Back'),
          React.createElement('button', {
            onClick: () => setWeaveStep(2),
            style: { flex: 2, padding: 16, borderRadius: 14, border: 'none', background: t.cta, color: '#fff', fontFamily: font, fontSize: 17, fontWeight: 600, cursor: 'pointer', boxShadow: `0 4px 20px ${t.cta}40` }
          }, 'Preview & Submit')
        )
      ),

      // Step 2: Preview and submit
      weaveStep === 2 && React.createElement('div', null,
        React.createElement('div', { style: {
          background: `linear-gradient(135deg, ${t.secondary}30, ${t.primary})`,
          borderRadius: 20, padding: 24, marginBottom: 20, textAlign: 'center',
          border: `1px solid ${t.border}`, position: 'relative', overflow: 'hidden'
        }},
          React.createElement('div', { style: { position: 'absolute', inset: 0, background: `radial-gradient(circle at 30% 70%, ${t.cta}15, transparent 50%)` } }),
          React.createElement('div', { style: { position: 'relative', zIndex: 1 } },
            React.createElement('div', { style: { width: 72, height: 72, borderRadius: 36, background: `${t.cta}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', animation: 'pulse 2s infinite' } },
              createIcon(icons.Waves, 32, t.cta)
            ),
            React.createElement('h3', { style: { fontFamily: font, fontSize: 22, fontWeight: 700, color: t.text, margin: '0 0 8px', letterSpacing: -0.3 } }, 'Your Echo Preview'),
            React.createElement('div', { style: { fontFamily: font, fontSize: 15, color: t.textSecondary, marginBottom: 4 } }, seed.name),
            selectedFilters.length > 0 && React.createElement('div', { style: { fontFamily: font, fontSize: 13, color: t.textMuted } },
              '+ ' + selectedFilters.join(', ')
            ),
            // Fake waveform
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, height: 50, margin: '20px 0' } },
              Array.from({ length: 40 }, (_, i) =>
                React.createElement('div', { key: i, style: {
                  width: 4, borderRadius: 2, background: `linear-gradient(180deg, ${t.cta}, ${t.secondary})`,
                  height: 6 + Math.sin(i * 0.4) * 18 + Math.cos(i * 0.7) * 10,
                  animation: `pulse ${1.5 + (i % 3) * 0.5}s ease-in-out infinite ${i * 0.05}s`
                }})
              )
            )
          )
        ),
        React.createElement('button', {
          onClick: () => { setWeaveStep(0); setSelectedSeed(null); setSelectedFilters([]); setActiveScreen('loom'); },
          style: {
            width: '100%', padding: 16, borderRadius: 14, border: 'none', background: t.cta, color: '#fff',
            fontFamily: font, fontSize: 17, fontWeight: 700, cursor: 'pointer',
            boxShadow: `0 4px 24px ${t.cta}50`, marginBottom: 12, transition: 'transform 150ms'
          }
        }, 'Weave Into The Loom'),
        React.createElement('button', {
          onClick: () => setWeaveStep(1),
          style: { width: '100%', padding: 14, borderRadius: 14, border: `1px solid ${t.border}`, background: 'transparent', color: t.textSecondary, fontFamily: font, fontSize: 15, fontWeight: 600, cursor: 'pointer' }
        }, 'Edit Layers')
      )
    );
  }

  // ========== COMMUNITY SCREEN ==========
  function CommunityScreen() {
    const posts = [
      { id: 1, user: 'SonicSage', avatar: '🎵', echo: 'Twilight Murmur', layers: ['Reverb', 'Shimmer'], resonance: 42, time: '2h ago', comment: 'Added a twilight bell layer to the spring loom. The harmonics with the rain are magical.' },
      { id: 2, user: 'EchoWanderer', avatar: '🌊', echo: 'Forest Dawn', layers: ['Chorus', 'Warmth'], resonance: 89, time: '4h ago', comment: 'My morning routine echo — birdsong base with hearthside warmth. Perfect for sunrise meditation.' },
      { id: 3, user: 'LoopWeaver', avatar: '🎶', echo: 'Crystal Brook', layers: ['Water', 'Wind'], resonance: 156, time: '6h ago', comment: 'Combined brook samples with high-altitude wind recordings. The result sounds like mountain springs.' },
      { id: 4, user: 'HarmonicDrift', avatar: '🌿', echo: 'Petal Rain', layers: ['Shimmer'], resonance: 31, time: '8h ago', comment: 'A gentle petal melody with crystal shimmer — my contribution to this week\'s challenge.' },
    ];

    return React.createElement('div', { style: { padding: '20px 16px', paddingBottom: 100 } },
      React.createElement('h1', { style: { fontFamily: font, fontSize: 34, fontWeight: 800, color: t.text, letterSpacing: -0.5, margin: '0 0 6px' } }, 'Community'),
      React.createElement('p', { style: { fontFamily: font, fontSize: 15, color: t.textMuted, margin: '0 0 20px' } }, 'Listen to fellow weavers\' echoes'),

      // Trending tag
      React.createElement('div', { style: { display: 'flex', gap: 8, marginBottom: 20, overflowX: 'auto' } },
        ['All', 'Trending', 'Spring Weaves', 'Challenges', 'New'].map((tag, i) =>
          React.createElement('div', { key: tag, style: {
            padding: '8px 16px', borderRadius: 20, whiteSpace: 'nowrap', cursor: 'pointer',
            background: i === 0 ? t.cta : t.surfaceLight,
            color: i === 0 ? '#fff' : t.textSecondary,
            fontFamily: font, fontSize: 13, fontWeight: 600, transition: 'all 200ms'
          }}, tag)
        )
      ),

      posts.map((post, i) =>
        React.createElement('div', { key: post.id, style: {
          background: t.cardBg, borderRadius: 16, padding: 16, marginBottom: 12,
          border: `1px solid ${t.border}`, animation: `slideUp 400ms ease-out ${i * 80}ms both`,
          boxShadow: isDark ? '0 2px 12px rgba(0,0,0,0.2)' : '0 1px 6px rgba(0,0,0,0.05)'
        }},
          // User info
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 } },
            React.createElement('div', { style: {
              width: 40, height: 40, borderRadius: 20, background: t.surfaceLight,
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}, createIcon(icons.User, 20, t.textSecondary)),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', { style: { fontFamily: font, fontSize: 15, fontWeight: 600, color: t.text } }, post.user),
              React.createElement('div', { style: { fontFamily: font, fontSize: 13, color: t.textMuted } }, post.time)
            ),
            React.createElement('div', { style: {
              background: `${t.secondary}20`, borderRadius: 12, padding: '4px 10px',
              fontFamily: font, fontSize: 11, fontWeight: 600, color: t.secondary
            }}, post.echo)
          ),
          // Comment
          React.createElement('p', { style: { fontFamily: font, fontSize: 15, color: t.text, margin: '0 0 12px', lineHeight: 1.5 } }, post.comment),
          // Layers
          React.createElement('div', { style: { display: 'flex', gap: 6, marginBottom: 12 } },
            post.layers.map(layer =>
              React.createElement('span', { key: layer, style: {
                fontFamily: font, fontSize: 11, fontWeight: 600, color: t.textMuted,
                background: t.surfaceLight, borderRadius: 8, padding: '4px 10px'
              }}, layer)
            )
          ),
          // Actions
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 20 } },
            React.createElement('button', {
              onClick: () => setResonatedPosts(prev => ({ ...prev, [post.id]: !prev[post.id] })),
              style: {
                display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none',
                cursor: 'pointer', padding: '4px 0'
              }
            },
              createIcon(resonatedPosts[post.id] ? icons.HeartHandshake : icons.Heart, 18,
                resonatedPosts[post.id] ? t.cta : t.textMuted),
              React.createElement('span', { style: {
                fontFamily: font, fontSize: 13, fontWeight: 600,
                color: resonatedPosts[post.id] ? t.cta : t.textMuted
              }}, (post.resonance + (resonatedPosts[post.id] ? 1 : 0)) + ' resonance')
            ),
            React.createElement('button', {
              style: { display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', padding: '4px 0' }
            },
              createIcon(icons.Headphones, 18, t.textMuted),
              React.createElement('span', { style: { fontFamily: font, fontSize: 13, color: t.textMuted, fontWeight: 600 } }, 'Listen')
            )
          )
        )
      )
    );
  }

  // ========== LORE SCREEN ==========
  function LoreScreen() {
    const loreItems = [
      {
        id: 1, title: 'The Science of Rain Sounds', category: 'Acoustics', readTime: '2 min',
        color: '#38BDF8', icon: icons.Droplets,
        preview: 'Rain produces pink noise — a frequency spectrum that mirrors how our auditory system processes sound, making it naturally soothing.',
        full: 'Rain produces pink noise — a frequency spectrum that mirrors how our auditory system processes sound, making it naturally soothing. Unlike white noise which has equal energy across all frequencies, pink noise decreases in power as frequency increases, closely matching the sensitivity of human hearing. This is why rainfall sounds so calming — it literally resonates with our biology. Studies show pink noise during sleep can improve memory consolidation by up to 25%.'
      },
      {
        id: 2, title: 'Wind Chimes in Japanese Culture', category: 'Culture', readTime: '3 min',
        color: '#A78BFA', icon: icons.Wind,
        preview: 'Furin (wind bells) have been part of Japanese summers since the Edo period, believed to ward off evil spirits with their pure tones.',
        full: 'Furin (風鈴) wind bells have been part of Japanese summers since the Edo period (1603-1868). Originally imported from China as fortune-telling devices, they evolved into beloved summer fixtures. The glass bells are hung under eaves where breezes catch them, and their clear, high-pitched ring is psychologically associated with coolness — studies show the sound can make people perceive temperatures as 2-3°C lower. Each region developed its own style: Edo furin from Tokyo are glass, while Nanbu furin from Iwate are cast iron.'
      },
      {
        id: 3, title: 'Birdsong & The Dawn Chorus', category: 'Nature', readTime: '2 min',
        color: '#22C55E', icon: icons.Bird,
        preview: 'Birds sing most actively at dawn because cool, still air carries sound up to 20x farther than during the heat of day.',
        full: 'The dawn chorus occurs because cool, calm air at sunrise creates optimal conditions for sound transmission — songs carry up to 20 times farther than midday. Birds use this acoustic advantage to defend territories and attract mates with maximum efficiency. Interestingly, urban birds have adapted by singing at higher pitches to be heard over traffic noise, sometimes shifting their songs by as much as 1,000 Hz compared to rural populations.'
      },
      {
        id: 4, title: 'Temple Bells & Harmonic Overtones', category: 'Music Theory', readTime: '3 min',
        color: '#F472B6', icon: icons.Bell,
        preview: 'Buddhist singing bowls produce multiple simultaneous frequencies, creating "binaural beats" that can influence brainwave patterns.',
        full: 'Buddhist singing bowls and temple bells are engineered to produce complex harmonic overtones — multiple frequencies sounding simultaneously from a single strike. When two slightly different frequencies interact, they create "binaural beats" — a perceived pulsation that can influence brainwave patterns. Frequencies around 4-8 Hz can promote theta brainwave states associated with deep meditation. Tibetan monks have used this acoustic phenomenon for centuries as a meditation aid.'
      },
    ];

    return React.createElement('div', { style: { padding: '20px 16px', paddingBottom: 100 } },
      React.createElement('h1', { style: { fontFamily: font, fontSize: 34, fontWeight: 800, color: t.text, letterSpacing: -0.5, margin: '0 0 6px' } }, 'Sonic Lore'),
      React.createElement('p', { style: { fontFamily: font, fontSize: 15, color: t.textMuted, margin: '0 0 20px' } }, 'Discover the stories behind the sounds'),

      // Featured
      React.createElement('div', { style: {
        background: `linear-gradient(135deg, #38BDF820, ${t.primary})`,
        borderRadius: 20, padding: 20, marginBottom: 20, position: 'relative', overflow: 'hidden',
        border: `1px solid ${t.border}`
      }},
        React.createElement('div', { style: { position: 'absolute', top: -20, right: -10, opacity: 0.1 } },
          createIcon(icons.BookOpen, 100, t.textSecondary)
        ),
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8, position: 'relative', zIndex: 1 } },
          createIcon(icons.Sparkles, 14, '#FB923C'),
          React.createElement('span', { style: { fontFamily: font, fontSize: 11, fontWeight: 700, color: '#FB923C', textTransform: 'uppercase', letterSpacing: 1 } }, 'Featured')
        ),
        React.createElement('h3', { style: { fontFamily: font, fontSize: 22, fontWeight: 700, color: t.text, margin: '0 0 6px', letterSpacing: -0.3, position: 'relative', zIndex: 1 } }, 'How Spring Changes Sound'),
        React.createElement('p', { style: { fontFamily: font, fontSize: 15, color: t.textSecondary, margin: '0 0 14px', lineHeight: 1.4, position: 'relative', zIndex: 1 } },
          'As ice melts and leaves grow, the entire acoustic landscape transforms. Discover the physics of seasonal soundscapes.'
        ),
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6, position: 'relative', zIndex: 1 } },
          createIcon(icons.Clock, 14, t.textMuted),
          React.createElement('span', { style: { fontFamily: font, fontSize: 13, color: t.textMuted, fontWeight: 500 } }, '5 min read')
        )
      ),

      // Lore cards
      loreItems.map((item, i) =>
        React.createElement('div', {
          key: item.id,
          onClick: () => setExpandedLore(expandedLore === item.id ? null : item.id),
          style: {
            background: t.cardBg, borderRadius: 16, padding: 16, marginBottom: 12, cursor: 'pointer',
            border: `1px solid ${expandedLore === item.id ? item.color + '50' : t.border}`,
            transition: 'all 250ms', animation: `slideUp 400ms ease-out ${i * 80}ms both`,
            boxShadow: isDark ? '0 2px 12px rgba(0,0,0,0.2)' : '0 1px 6px rgba(0,0,0,0.05)'
          }
        },
          React.createElement('div', { style: { display: 'flex', alignItems: 'flex-start', gap: 12 } },
            React.createElement('div', { style: {
              width: 44, height: 44, borderRadius: 12, flexShrink: 0,
              background: `${item.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}, createIcon(item.icon, 22, item.color)),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 } },
                React.createElement('span', { style: { fontFamily: font, fontSize: 11, fontWeight: 600, color: item.color, textTransform: 'uppercase', letterSpacing: 0.5 } }, item.category),
                React.createElement('span', { style: { fontFamily: font, fontSize: 11, color: t.textMuted } }, '· ' + item.readTime)
              ),
              React.createElement('div', { style: { fontFamily: font, fontSize: 17, fontWeight: 600, color: t.text, marginBottom: 6 } }, item.title),
              React.createElement('p', { style: {
                fontFamily: font, fontSize: 15, color: t.textSecondary, margin: 0, lineHeight: 1.5,
                overflow: 'hidden', transition: 'max-height 300ms',
                maxHeight: expandedLore === item.id ? 300 : 44
              }}, expandedLore === item.id ? item.full : item.preview)
            ),
            React.createElement('div', { style: { flexShrink: 0, marginTop: 4, transition: 'transform 200ms', transform: expandedLore === item.id ? 'rotate(180deg)' : 'rotate(0)' } },
              createIcon(icons.ChevronDown, 18, t.textMuted)
            )
          )
        )
      )
    );
  }

  // ========== NAVIGATION ==========
  const tabs = [
    { id: 'home', label: 'Home', icon: icons.Home },
    { id: 'loom', label: 'Loom', icon: icons.Radio },
    { id: 'weave', label: 'Weave', icon: icons.Plus },
    { id: 'community', label: 'Community', icon: icons.Users },
    { id: 'lore', label: 'Lore', icon: icons.BookOpen },
  ];

  const screens = {
    home: HomeScreen,
    loom: LoomScreen,
    weave: WeaveScreen,
    community: CommunityScreen,
    lore: LoreScreen,
  };

  return React.createElement('div', { style: { minHeight: '100vh', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: font, padding: '20px 0' } },
    // Style tag for animations
    React.createElement('style', null, `
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes slideUp {
        from { opacity: 0; transform: translateY(16px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes pulse {
        0%, 100% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.05); opacity: 0.7; }
      }
      @keyframes shimmer {
        0% { background-position: -200px 0; }
        100% { background-position: 200px 0; }
      }
      * { -webkit-tap-highlight-color: transparent; }
      ::-webkit-scrollbar { display: none; }
    `),
    // Phone Frame
    React.createElement('div', { style: {
      width: 375, height: 812, borderRadius: 40, overflow: 'hidden', position: 'relative',
      background: t.bg, boxShadow: '0 20px 80px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.1)',
      display: 'flex', flexDirection: 'column'
    }},
      // Content
      React.createElement('div', { style: { flex: 1, overflowY: 'auto', overflowX: 'hidden' } },
        React.createElement(screens[activeScreen])
      ),
      // Bottom Navigation
      React.createElement('div', { style: {
        position: 'absolute', bottom: 0, left: 0, right: 0,
        background: isDark ? 'rgba(15,15,35,0.95)' : 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
        borderTop: `1px solid ${t.border}`, padding: '8px 0 24px',
        display: 'flex', justifyContent: 'space-around'
      }},
        tabs.map(tab =>
          React.createElement('button', {
            key: tab.id,
            onClick: () => { setActiveScreen(tab.id); if (tab.id === 'weave') { setWeaveStep(0); } },
            style: {
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
              background: 'none', border: 'none', cursor: 'pointer', padding: '6px 12px',
              minWidth: 44, minHeight: 44, transition: 'transform 150ms',
              transform: activeScreen === tab.id ? 'scale(1.05)' : 'scale(1)'
            }
          },
            tab.id === 'weave'
              ? React.createElement('div', { style: {
                  width: 44, height: 44, borderRadius: 22, background: t.cta,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: `0 4px 16px ${t.cta}40`, marginTop: -14
                }}, createIcon(tab.icon, 22, '#fff'))
              : createIcon(tab.icon, 22, activeScreen === tab.id ? t.cta : t.textMuted),
            React.createElement('span', { style: {
              fontFamily: font, fontSize: 10, fontWeight: 600,
              color: activeScreen === tab.id ? t.cta : t.textMuted
            }}, tab.label)
          )
        )
      )
    )
  );
}
