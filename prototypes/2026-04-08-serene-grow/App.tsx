const { useState, useEffect, useRef, useCallback } = React;

function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [theme, setTheme] = useState('dark');

  const themes = {
    dark: {
      primary: '#1E1B4B',
      secondary: '#4338CA',
      cta: '#22C55E',
      bg: '#0F0F23',
      card: '#1A1A3E',
      cardAlt: '#15152D',
      text: '#F1F0FF',
      textSecondary: '#A5A3C8',
      textMuted: '#6B6990',
      border: '#2A2858',
      surface: '#1E1B4B',
      overlay: 'rgba(15,15,35,0.85)',
    },
    light: {
      primary: '#1E1B4B',
      secondary: '#4338CA',
      cta: '#22C55E',
      bg: '#F5F3FF',
      card: '#FFFFFF',
      cardAlt: '#EDE9FE',
      text: '#1E1B4B',
      textSecondary: '#4338CA',
      textMuted: '#7C7AAF',
      border: '#DDD6FE',
      surface: '#EDE9FE',
      overlay: 'rgba(245,243,255,0.9)',
    },
  };

  const t = themes[theme];

  const font = "-apple-system, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif";

  // ==================== HOME SCREEN ====================
  function HomeScreen() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [mood, setMood] = useState('calm');
    const [babyAge, setBabyAge] = useState('0-3m');
    const [volume, setVolume] = useState(72);
    const [activeLayers, setActiveLayers] = useState({ rain: true, heartbeat: true, melody: false, birds: false });

    const moods = [
      { id: 'calm', label: 'Calm', icon: 'Moon' },
      { id: 'focus', label: 'Focus', icon: 'Brain' },
      { id: 'sleep', label: 'Sleep', icon: 'CloudMoon' },
      { id: 'play', label: 'Play', icon: 'Sun' },
    ];

    const soundLayers = [
      { id: 'rain', label: 'Soft Rain', color: '#4338CA' },
      { id: 'heartbeat', label: 'Heartbeat', color: '#7C3AED' },
      { id: 'melody', label: 'Gentle Melody', color: '#22C55E' },
      { id: 'birds', label: 'Morning Birds', color: '#06B6D4' },
    ];

    const toggleLayer = (id) => {
      setActiveLayers(prev => ({ ...prev, [id]: !prev[id] }));
    };

    return React.createElement('div', { style: { padding: '24px 20px 20px', minHeight: '100%' } },
      // Header
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 } },
        React.createElement('div', null,
          React.createElement('h1', { style: { fontFamily: font, fontSize: 34, fontWeight: 800, color: t.text, letterSpacing: -0.5, margin: 0 } }, 'Serene Grow'),
          React.createElement('p', { style: { fontFamily: font, fontSize: 15, color: t.textSecondary, margin: '4px 0 0', fontWeight: 400 } }, 'Good evening, Sarah')
        ),
        React.createElement('button', {
          onClick: () => setTheme(theme === 'dark' ? 'light' : 'dark'),
          style: { width: 44, height: 44, borderRadius: 22, background: t.card, border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }
        }, React.createElement(theme === 'dark' ? window.lucide.Sun : window.lucide.Moon, { size: 20, color: t.textSecondary }))
      ),

      // Soundscape Visualizer
      React.createElement('div', {
        style: {
          background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})`,
          borderRadius: 24,
          padding: '28px 24px',
          marginBottom: 24,
          position: 'relative',
          overflow: 'hidden',
          boxShadow: `0 8px 32px rgba(67,56,202,0.3)`,
        }
      },
        // Animated orbs
        React.createElement('div', { style: { position: 'absolute', top: -30, right: -30, width: 120, height: 120, borderRadius: 60, background: 'rgba(34,197,94,0.15)', animation: 'pulse 4s ease-in-out infinite' } }),
        React.createElement('div', { style: { position: 'absolute', bottom: -20, left: -20, width: 80, height: 80, borderRadius: 40, background: 'rgba(99,102,241,0.2)', animation: 'pulse 3s ease-in-out infinite 1s' } }),

        React.createElement('div', { style: { position: 'relative', zIndex: 1 } },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 } },
            React.createElement('div', null,
              React.createElement('p', { style: { fontFamily: font, fontSize: 13, color: 'rgba(255,255,255,0.6)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, margin: 0 } }, 'Now Playing'),
              React.createElement('h2', { style: { fontFamily: font, fontSize: 22, fontWeight: 700, color: '#fff', margin: '6px 0 0', letterSpacing: -0.3 } }, 'Evening Lullaby Mix'),
            ),
            React.createElement('div', { style: { background: 'rgba(34,197,94,0.2)', borderRadius: 12, padding: '6px 12px', display: 'flex', alignItems: 'center', gap: 6 } },
              React.createElement(window.lucide.Baby, { size: 14, color: '#22C55E' }),
              React.createElement('span', { style: { fontFamily: font, fontSize: 13, color: '#22C55E', fontWeight: 600 } }, babyAge)
            )
          ),

          // Waveform visualization
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 3, height: 48, marginBottom: 20 } },
            ...[...Array(28)].map((_, i) => {
              const h = isPlaying ? (12 + Math.sin(i * 0.7) * 16 + Math.cos(i * 1.3) * 8) : 6;
              return React.createElement('div', {
                key: i,
                style: {
                  flex: 1,
                  height: h,
                  borderRadius: 3,
                  background: `linear-gradient(180deg, #22C55E, ${t.secondary})`,
                  opacity: isPlaying ? 0.6 + Math.sin(i * 0.5) * 0.4 : 0.3,
                  transition: 'all 0.5s ease',
                  animation: isPlaying ? `waveform ${1.5 + (i % 4) * 0.3}s ease-in-out infinite alternate` : 'none',
                }
              });
            })
          ),

          // Controls
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24 } },
            React.createElement('button', { style: { background: 'none', border: 'none', cursor: 'pointer', padding: 8 } },
              React.createElement(window.lucide.SkipBack, { size: 24, color: 'rgba(255,255,255,0.7)' })
            ),
            React.createElement('button', {
              onClick: () => setIsPlaying(!isPlaying),
              style: {
                width: 64, height: 64, borderRadius: 32,
                background: '#22C55E',
                border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 4px 20px rgba(34,197,94,0.4)',
                transition: 'transform 150ms ease, box-shadow 150ms ease',
              },
              onMouseDown: (e) => { e.currentTarget.style.transform = 'scale(0.93)'; },
              onMouseUp: (e) => { e.currentTarget.style.transform = 'scale(1)'; },
            },
              React.createElement(isPlaying ? window.lucide.Pause : window.lucide.Play, { size: 28, color: '#fff', fill: '#fff' })
            ),
            React.createElement('button', { style: { background: 'none', border: 'none', cursor: 'pointer', padding: 8 } },
              React.createElement(window.lucide.SkipForward, { size: 24, color: 'rgba(255,255,255,0.7)' })
            ),
          )
        )
      ),

      // Mood Selector
      React.createElement('div', { style: { marginBottom: 24 } },
        React.createElement('h3', { style: { fontFamily: font, fontSize: 17, fontWeight: 600, color: t.text, margin: '0 0 14px' } }, 'Current Mood'),
        React.createElement('div', { style: { display: 'flex', gap: 10 } },
          ...moods.map(m => {
            const active = mood === m.id;
            const Icon = window.lucide[m.icon];
            return React.createElement('button', {
              key: m.id,
              onClick: () => setMood(m.id),
              style: {
                flex: 1, padding: '14px 8px', borderRadius: 16,
                background: active ? `linear-gradient(135deg, ${t.secondary}, #7C3AED)` : t.card,
                border: active ? 'none' : `1px solid ${t.border}`,
                cursor: 'pointer',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
                transition: 'all 200ms ease',
                boxShadow: active ? '0 4px 16px rgba(67,56,202,0.3)' : 'none',
              },
            },
              React.createElement(Icon, { size: 20, color: active ? '#fff' : t.textMuted }),
              React.createElement('span', { style: { fontFamily: font, fontSize: 13, fontWeight: 600, color: active ? '#fff' : t.textMuted } }, m.label)
            );
          })
        )
      ),

      // Sound Layers
      React.createElement('div', { style: { marginBottom: 24 } },
        React.createElement('h3', { style: { fontFamily: font, fontSize: 17, fontWeight: 600, color: t.text, margin: '0 0 14px' } }, 'Sound Layers'),
        React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 10 } },
          ...soundLayers.map(layer => {
            const active = activeLayers[layer.id];
            return React.createElement('div', {
              key: layer.id,
              onClick: () => toggleLayer(layer.id),
              style: {
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '14px 16px', borderRadius: 14,
                background: t.card,
                border: `1px solid ${active ? layer.color + '44' : t.border}`,
                cursor: 'pointer',
                transition: 'all 200ms ease',
              }
            },
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12 } },
                React.createElement('div', { style: { width: 10, height: 10, borderRadius: 5, background: active ? layer.color : t.textMuted, boxShadow: active ? `0 0 8px ${layer.color}88` : 'none', transition: 'all 200ms ease' } }),
                React.createElement('span', { style: { fontFamily: font, fontSize: 15, fontWeight: 500, color: t.text } }, layer.label)
              ),
              React.createElement('div', {
                style: {
                  width: 44, height: 26, borderRadius: 13,
                  background: active ? '#22C55E' : t.border,
                  padding: 2, cursor: 'pointer',
                  transition: 'background 200ms ease',
                  display: 'flex', alignItems: 'center',
                }
              },
                React.createElement('div', {
                  style: {
                    width: 22, height: 22, borderRadius: 11,
                    background: '#fff',
                    transform: active ? 'translateX(18px)' : 'translateX(0)',
                    transition: 'transform 200ms ease',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                  }
                })
              )
            );
          })
        )
      ),

      // Quick Trail
      React.createElement('div', {
        onClick: () => setActiveScreen('trails'),
        style: {
          background: `linear-gradient(135deg, ${t.card}, ${t.cardAlt})`,
          borderRadius: 18,
          padding: '18px 20px',
          border: `1px solid ${t.border}`,
          cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: 16,
          transition: 'all 200ms ease',
        }
      },
        React.createElement('div', { style: { width: 48, height: 48, borderRadius: 14, background: `linear-gradient(135deg, #22C55E, #16A34A)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 } },
          React.createElement(window.lucide.Headphones, { size: 22, color: '#fff' })
        ),
        React.createElement('div', { style: { flex: 1 } },
          React.createElement('p', { style: { fontFamily: font, fontSize: 13, color: t.cta, fontWeight: 600, margin: 0, textTransform: 'uppercase', letterSpacing: 0.5 } }, 'Up Next'),
          React.createElement('p', { style: { fontFamily: font, fontSize: 15, fontWeight: 600, color: t.text, margin: '4px 0 0' } }, 'Sleep Science: The 4-Month Regression'),
          React.createElement('p', { style: { fontFamily: font, fontSize: 13, color: t.textMuted, margin: '2px 0 0' } }, '3 min trail')
        ),
        React.createElement(window.lucide.ChevronRight, { size: 20, color: t.textMuted })
      ),
    );
  }

  // ==================== TRAILS SCREEN ====================
  function TrailsScreen() {
    const [activeCategory, setActiveCategory] = useState('all');
    const [expandedTrail, setExpandedTrail] = useState(null);

    const categories = ['All', 'Sleep', 'Development', 'Feeding', 'Bonding', 'Mindfulness'];

    const trails = [
      { id: 1, title: 'Understanding Newborn Sleep Cycles', category: 'Sleep', duration: '4 min', author: 'Dr. Maya Chen', plays: '12.4K', description: 'Learn why your newborn sleeps in short bursts and how to work with their natural rhythms.', progress: 0.7, icon: 'Moon' },
      { id: 2, title: 'The Power of Skin-to-Skin Contact', category: 'Bonding', duration: '3 min', author: 'Dr. Lisa Park', plays: '8.7K', description: 'Discover how kangaroo care strengthens your bond and regulates your baby\'s temperature and heart rate.', progress: 1, icon: 'Heart' },
      { id: 3, title: 'Reading Baby\'s Hunger Cues', category: 'Feeding', duration: '5 min', author: 'Dr. Sarah Mitchell', plays: '15.2K', description: 'Identify the subtle early signs of hunger before crying begins, making feeding calmer for everyone.', progress: 0, icon: 'Utensils' },
      { id: 4, title: 'Tummy Time: Building Strength', category: 'Development', duration: '3 min', author: 'Dr. James Liu', plays: '9.1K', description: 'Why daily tummy time is crucial for motor development and how to make it enjoyable for your baby.', progress: 0.3, icon: 'Dumbbell' },
      { id: 5, title: 'Mindful Moments for Tired Parents', category: 'Mindfulness', duration: '4 min', author: 'Dr. Anna Reed', plays: '18.3K', description: 'Quick breathing and grounding exercises designed for exhausted new parents during quiet moments.', progress: 0, icon: 'Wind' },
      { id: 6, title: 'The 4-Month Sleep Regression', category: 'Sleep', duration: '3 min', author: 'Dr. Maya Chen', plays: '22.1K', description: 'What happens during this developmental leap and practical strategies to help everyone sleep better.', progress: 0, icon: 'CloudMoon' },
    ];

    const filtered = activeCategory === 'all' ? trails : trails.filter(t2 => t2.category.toLowerCase() === activeCategory);

    return React.createElement('div', { style: { padding: '24px 20px 20px' } },
      React.createElement('h1', { style: { fontFamily: font, fontSize: 34, fontWeight: 800, color: t.text, letterSpacing: -0.5, margin: '0 0 6px' } }, 'Audio Trails'),
      React.createElement('p', { style: { fontFamily: font, fontSize: 15, color: t.textSecondary, margin: '0 0 20px', fontWeight: 400 } }, 'Bite-sized parenting wisdom, hands-free'),

      // Categories
      React.createElement('div', { style: { display: 'flex', gap: 8, overflowX: 'auto', marginBottom: 24, paddingBottom: 4 } },
        ...categories.map(cat => {
          const active = activeCategory === cat.toLowerCase();
          return React.createElement('button', {
            key: cat,
            onClick: () => setActiveCategory(cat.toLowerCase()),
            style: {
              padding: '10px 18px', borderRadius: 20,
              background: active ? t.secondary : t.card,
              border: active ? 'none' : `1px solid ${t.border}`,
              color: active ? '#fff' : t.textMuted,
              fontFamily: font, fontSize: 14, fontWeight: 600,
              cursor: 'pointer', whiteSpace: 'nowrap',
              transition: 'all 200ms ease',
            }
          }, cat);
        })
      ),

      // Featured
      React.createElement('div', {
        style: {
          background: `linear-gradient(135deg, #1E1B4B, #4338CA)`,
          borderRadius: 20,
          padding: '22px 20px',
          marginBottom: 24,
          position: 'relative', overflow: 'hidden',
        }
      },
        React.createElement('div', { style: { position: 'absolute', top: -20, right: -20, width: 100, height: 100, borderRadius: 50, background: 'rgba(34,197,94,0.12)', animation: 'pulse 3s ease-in-out infinite' } }),
        React.createElement('div', { style: { position: 'relative', zIndex: 1 } },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 } },
            React.createElement(window.lucide.Sparkles, { size: 16, color: '#22C55E' }),
            React.createElement('span', { style: { fontFamily: font, fontSize: 13, color: '#22C55E', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 } }, 'Featured Trail')
          ),
          React.createElement('h3', { style: { fontFamily: font, fontSize: 20, fontWeight: 700, color: '#fff', margin: '0 0 8px' } }, 'Navigating the First 100 Days'),
          React.createElement('p', { style: { fontFamily: font, fontSize: 14, color: 'rgba(255,255,255,0.6)', margin: '0 0 16px', lineHeight: 1.4 } }, 'A 7-part audio series covering everything from feeding patterns to emotional bonding.'),
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 16 } },
            React.createElement('button', {
              style: {
                padding: '10px 20px', borderRadius: 12,
                background: '#22C55E', border: 'none',
                color: '#fff', fontFamily: font, fontSize: 14, fontWeight: 600,
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8,
                boxShadow: '0 4px 12px rgba(34,197,94,0.3)',
              }
            },
              React.createElement(window.lucide.Play, { size: 16, color: '#fff', fill: '#fff' }),
              'Start Series'
            ),
            React.createElement('span', { style: { fontFamily: font, fontSize: 13, color: 'rgba(255,255,255,0.5)' } }, '7 trails \u00b7 24 min total')
          )
        )
      ),

      // Trail List
      React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 12 } },
        ...filtered.map(trail => {
          const Icon = window.lucide[trail.icon] || window.lucide.Headphones;
          return React.createElement('div', {
            key: trail.id,
            onClick: () => setExpandedTrail(expandedTrail === trail.id ? null : trail.id),
            style: {
              background: t.card,
              borderRadius: 16,
              padding: '16px 18px',
              border: `1px solid ${expandedTrail === trail.id ? t.secondary + '66' : t.border}`,
              cursor: 'pointer',
              transition: 'all 200ms ease',
            }
          },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 14 } },
              React.createElement('div', {
                style: {
                  width: 46, height: 46, borderRadius: 13,
                  background: trail.progress === 1 ? `linear-gradient(135deg, #22C55E, #16A34A)` : `linear-gradient(135deg, ${t.secondary}, #7C3AED)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }
              },
                trail.progress === 1
                  ? React.createElement(window.lucide.Check, { size: 22, color: '#fff' })
                  : React.createElement(Icon, { size: 20, color: '#fff' })
              ),
              React.createElement('div', { style: { flex: 1, minWidth: 0 } },
                React.createElement('p', { style: { fontFamily: font, fontSize: 15, fontWeight: 600, color: t.text, margin: 0, lineHeight: 1.3 } }, trail.title),
                React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 } },
                  React.createElement('span', { style: { fontFamily: font, fontSize: 13, color: t.textMuted } }, trail.duration),
                  React.createElement('span', { style: { color: t.textMuted } }, '\u00b7'),
                  React.createElement('span', { style: { fontFamily: font, fontSize: 13, color: t.textMuted } }, trail.author),
                )
              ),
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
                React.createElement(window.lucide.Headphones, { size: 14, color: t.textMuted }),
                React.createElement('span', { style: { fontFamily: font, fontSize: 12, color: t.textMuted } }, trail.plays),
              )
            ),
            trail.progress > 0 && trail.progress < 1 ? React.createElement('div', { style: { marginTop: 12, height: 3, borderRadius: 2, background: t.border } },
              React.createElement('div', { style: { height: '100%', borderRadius: 2, background: '#22C55E', width: `${trail.progress * 100}%`, transition: 'width 300ms ease' } })
            ) : null,
            expandedTrail === trail.id ? React.createElement('div', { style: { marginTop: 12, animation: 'fadeIn 200ms ease' } },
              React.createElement('p', { style: { fontFamily: font, fontSize: 14, color: t.textSecondary, lineHeight: 1.5, margin: '0 0 14px' } }, trail.description),
              React.createElement('button', {
                style: {
                  padding: '10px 20px', borderRadius: 10,
                  background: trail.progress === 1 ? t.card : '#22C55E',
                  border: trail.progress === 1 ? `1px solid ${t.border}` : 'none',
                  color: trail.progress === 1 ? t.textSecondary : '#fff',
                  fontFamily: font, fontSize: 14, fontWeight: 600,
                  cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
                }
              },
                React.createElement(trail.progress === 1 ? window.lucide.RotateCcw : window.lucide.Play, { size: 15, color: trail.progress === 1 ? t.textSecondary : '#fff', fill: trail.progress === 1 ? 'none' : '#fff' }),
                trail.progress === 1 ? 'Replay' : trail.progress > 0 ? 'Continue' : 'Listen Now'
              )
            ) : null
          );
        })
      ),
    );
  }

  // ==================== CHALLENGES SCREEN ====================
  function ChallengesScreen() {
    const [activeTab, setActiveTab] = useState('current');

    const currentChallenge = {
      title: 'Sleep Sanctuary Sounds',
      description: 'Build the perfect sleep environment with a week of curated soundscapes and sleep science insights.',
      daysLeft: 4,
      progress: 0.43,
      participants: 2847,
      tasks: [
        { id: 1, label: 'Listen to the "Womb Echo" soundscape', done: true },
        { id: 2, label: 'Complete the Sleep Cycles trail', done: true },
        { id: 3, label: 'Create your custom bedtime mix', done: true },
        { id: 4, label: 'Try the "Wind Down" 15-min session', done: false },
        { id: 5, label: 'Share a sound memory with the community', done: false },
        { id: 6, label: 'Complete the Dream Sounds journey', done: false },
        { id: 7, label: 'Earn the Sleep Guardian badge', done: false },
      ]
    };

    const upcomingChallenges = [
      { id: 1, title: 'Sensory Play Melodies', starts: 'Apr 15', icon: 'Music', color: '#7C3AED' },
      { id: 2, title: 'Mindful Morning Rituals', starts: 'Apr 22', icon: 'Sunrise', color: '#F59E0B' },
      { id: 3, title: 'Nature Connection Sounds', starts: 'Apr 29', icon: 'TreePine', color: '#22C55E' },
    ];

    const completedChallenges = [
      { id: 1, title: 'First Lullaby Journey', badge: 'Melody Maker', xp: 350 },
      { id: 2, title: 'Calm Waters Week', badge: 'Ocean Guardian', xp: 420 },
    ];

    return React.createElement('div', { style: { padding: '24px 20px 20px' } },
      React.createElement('h1', { style: { fontFamily: font, fontSize: 34, fontWeight: 800, color: t.text, letterSpacing: -0.5, margin: '0 0 6px' } }, 'Challenges'),
      React.createElement('p', { style: { fontFamily: font, fontSize: 15, color: t.textSecondary, margin: '0 0 22px', fontWeight: 400 } }, 'Weekly audio journeys for growing families'),

      // Tabs
      React.createElement('div', { style: { display: 'flex', gap: 4, background: t.card, borderRadius: 14, padding: 4, marginBottom: 24 } },
        ...['current', 'upcoming', 'completed'].map(tab => (
          React.createElement('button', {
            key: tab,
            onClick: () => setActiveTab(tab),
            style: {
              flex: 1, padding: '10px 12px', borderRadius: 11,
              background: activeTab === tab ? t.secondary : 'transparent',
              border: 'none', color: activeTab === tab ? '#fff' : t.textMuted,
              fontFamily: font, fontSize: 14, fontWeight: 600,
              cursor: 'pointer', textTransform: 'capitalize',
              transition: 'all 200ms ease',
            }
          }, tab)
        ))
      ),

      // Current Challenge
      activeTab === 'current' && React.createElement('div', null,
        React.createElement('div', {
          style: {
            background: `linear-gradient(135deg, #1E1B4B, #4338CA)`,
            borderRadius: 22, padding: '24px 22px',
            marginBottom: 20,
            position: 'relative', overflow: 'hidden',
            boxShadow: '0 8px 32px rgba(30,27,75,0.4)',
          }
        },
          React.createElement('div', { style: { position: 'absolute', bottom: -30, right: -30, width: 140, height: 140, borderRadius: 70, background: 'rgba(34,197,94,0.08)', animation: 'pulse 5s ease-in-out infinite' } }),
          React.createElement('div', { style: { position: 'relative', zIndex: 1 } },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 } },
              React.createElement(window.lucide.Flame, { size: 18, color: '#F59E0B' }),
              React.createElement('span', { style: { fontFamily: font, fontSize: 13, color: '#F59E0B', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 } }, 'This Week'),
              React.createElement('span', { style: { fontFamily: font, fontSize: 13, color: 'rgba(255,255,255,0.4)', marginLeft: 'auto' } }, `${currentChallenge.daysLeft} days left`)
            ),
            React.createElement('h2', { style: { fontFamily: font, fontSize: 22, fontWeight: 700, color: '#fff', margin: '0 0 8px' } }, currentChallenge.title),
            React.createElement('p', { style: { fontFamily: font, fontSize: 14, color: 'rgba(255,255,255,0.6)', margin: '0 0 18px', lineHeight: 1.4 } }, currentChallenge.description),

            // Progress bar
            React.createElement('div', { style: { marginBottom: 12 } },
              React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: 8 } },
                React.createElement('span', { style: { fontFamily: font, fontSize: 13, color: 'rgba(255,255,255,0.5)' } }, 'Progress'),
                React.createElement('span', { style: { fontFamily: font, fontSize: 13, color: '#22C55E', fontWeight: 600 } }, `${Math.round(currentChallenge.progress * 100)}%`)
              ),
              React.createElement('div', { style: { height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.1)' } },
                React.createElement('div', { style: { height: '100%', borderRadius: 3, background: 'linear-gradient(90deg, #22C55E, #4ADE80)', width: `${currentChallenge.progress * 100}%`, transition: 'width 500ms ease' } })
              )
            ),

            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6 } },
              React.createElement(window.lucide.Users, { size: 14, color: 'rgba(255,255,255,0.4)' }),
              React.createElement('span', { style: { fontFamily: font, fontSize: 13, color: 'rgba(255,255,255,0.4)' } }, `${currentChallenge.participants.toLocaleString()} parents joined`)
            )
          )
        ),

        // Tasks
        React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 8 } },
          ...currentChallenge.tasks.map((task, i) => (
            React.createElement('div', {
              key: task.id,
              style: {
                display: 'flex', alignItems: 'center', gap: 14,
                padding: '14px 16px', borderRadius: 14,
                background: t.card,
                border: `1px solid ${t.border}`,
                opacity: task.done ? 0.6 : 1,
                animation: `slideUp ${200 + i * 60}ms ease`,
              }
            },
              React.createElement('div', {
                style: {
                  width: 26, height: 26, borderRadius: 8,
                  background: task.done ? '#22C55E' : 'transparent',
                  border: task.done ? 'none' : `2px solid ${t.border}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }
              },
                task.done && React.createElement(window.lucide.Check, { size: 14, color: '#fff' })
              ),
              React.createElement('span', { style: { fontFamily: font, fontSize: 15, color: task.done ? t.textMuted : t.text, fontWeight: 400, textDecoration: task.done ? 'line-through' : 'none' } }, task.label)
            )
          ))
        ),
      ),

      // Upcoming
      activeTab === 'upcoming' && React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 12 } },
        ...upcomingChallenges.map(ch => {
          const Icon = window.lucide[ch.icon] || window.lucide.Star;
          return React.createElement('div', {
            key: ch.id,
            style: {
              background: t.card, borderRadius: 18, padding: '20px',
              border: `1px solid ${t.border}`,
              display: 'flex', alignItems: 'center', gap: 16,
            }
          },
            React.createElement('div', { style: { width: 52, height: 52, borderRadius: 16, background: ch.color + '22', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 } },
              React.createElement(Icon, { size: 24, color: ch.color })
            ),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('p', { style: { fontFamily: font, fontSize: 17, fontWeight: 600, color: t.text, margin: 0 } }, ch.title),
              React.createElement('p', { style: { fontFamily: font, fontSize: 13, color: t.textMuted, margin: '4px 0 0' } }, `Starts ${ch.starts}`)
            ),
            React.createElement('button', {
              style: { padding: '8px 16px', borderRadius: 10, background: t.secondary + '22', border: 'none', color: t.secondary, fontFamily: font, fontSize: 13, fontWeight: 600, cursor: 'pointer' }
            }, 'Remind Me')
          );
        })
      ),

      // Completed
      activeTab === 'completed' && React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 12 } },
        ...completedChallenges.map(ch => (
          React.createElement('div', {
            key: ch.id,
            style: {
              background: t.card, borderRadius: 18, padding: '20px',
              border: `1px solid ${t.border}`,
              display: 'flex', alignItems: 'center', gap: 16,
            }
          },
            React.createElement('div', { style: { width: 52, height: 52, borderRadius: 16, background: 'linear-gradient(135deg, #22C55E22, #4ADE8022)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 } },
              React.createElement(window.lucide.Trophy, { size: 24, color: '#22C55E' })
            ),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('p', { style: { fontFamily: font, fontSize: 17, fontWeight: 600, color: t.text, margin: 0 } }, ch.title),
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 } },
                React.createElement(window.lucide.Award, { size: 14, color: '#F59E0B' }),
                React.createElement('span', { style: { fontFamily: font, fontSize: 13, color: '#F59E0B', fontWeight: 500 } }, ch.badge),
                React.createElement('span', { style: { color: t.textMuted } }, '\u00b7'),
                React.createElement('span', { style: { fontFamily: font, fontSize: 13, color: t.textMuted } }, `+${ch.xp} XP`)
              )
            ),
            React.createElement(window.lucide.CheckCircle, { size: 24, color: '#22C55E' })
          )
        ))
      ),
    );
  }

  // ==================== COMMUNITY SCREEN ====================
  function CommunityScreen() {
    const [activeTab, setActiveTab] = useState('feed');

    const posts = [
      { id: 1, user: 'Emma W.', avatar: '#7C3AED', time: '2h ago', text: 'The womb echo soundscape was a game-changer for us! My 3-week-old fell asleep in under 5 minutes.', likes: 24, replies: 8, type: 'memory', sound: 'Womb Echo Mix' },
      { id: 2, user: 'Carlos M.', avatar: '#06B6D4', time: '4h ago', text: 'Just completed the Sleep Sanctuary challenge! The combination of rain sounds and the heartbeat layer is now our nightly ritual.', likes: 42, replies: 12, type: 'milestone' },
      { id: 3, user: 'Priya S.', avatar: '#F59E0B', time: '6h ago', text: 'Has anyone tried layering the bird sounds with the gentle melody for morning wake-ups? My 4-month-old absolutely lights up!', likes: 18, replies: 15, type: 'discussion' },
      { id: 4, user: 'Jordan T.', avatar: '#22C55E', time: '8h ago', text: 'Sharing my custom "Sunset Wind-down" mix \u2013 it blends ocean waves, a soft piano melody, and cricket sounds. Feel free to try it out!', likes: 56, replies: 21, type: 'memory', sound: 'Sunset Wind-down' },
    ];

    const typeIcons = { memory: 'Music', milestone: 'Trophy', discussion: 'MessageCircle' };
    const typeLabels = { memory: 'Sound Memory', milestone: 'Milestone', discussion: 'Discussion' };
    const typeColors = { memory: '#4338CA', milestone: '#22C55E', discussion: '#F59E0B' };

    return React.createElement('div', { style: { padding: '24px 20px 20px' } },
      React.createElement('h1', { style: { fontFamily: font, fontSize: 34, fontWeight: 800, color: t.text, letterSpacing: -0.5, margin: '0 0 6px' } }, 'Sound Circle'),
      React.createElement('p', { style: { fontFamily: font, fontSize: 15, color: t.textSecondary, margin: '0 0 22px', fontWeight: 400 } }, 'Connect with parents on the same journey'),

      // Stats bar
      React.createElement('div', {
        style: {
          display: 'flex', gap: 10, marginBottom: 24,
        }
      },
        ...[
          { label: 'Members', value: '14.2K', icon: 'Users' },
          { label: 'Sounds Shared', value: '3.8K', icon: 'Music' },
          { label: 'Active Now', value: '247', icon: 'Radio' },
        ].map(stat => {
          const Icon = window.lucide[stat.icon];
          return React.createElement('div', {
            key: stat.label,
            style: { flex: 1, background: t.card, borderRadius: 14, padding: '14px 12px', border: `1px solid ${t.border}`, textAlign: 'center' }
          },
            React.createElement(Icon, { size: 18, color: t.secondary, style: { margin: '0 auto 6px' } }),
            React.createElement('p', { style: { fontFamily: font, fontSize: 17, fontWeight: 700, color: t.text, margin: 0 } }, stat.value),
            React.createElement('p', { style: { fontFamily: font, fontSize: 11, color: t.textMuted, margin: '2px 0 0', fontWeight: 500 } }, stat.label)
          );
        })
      ),

      // Tabs
      React.createElement('div', { style: { display: 'flex', gap: 4, background: t.card, borderRadius: 14, padding: 4, marginBottom: 20 } },
        ...['feed', 'memories', 'discussions'].map(tab => (
          React.createElement('button', {
            key: tab,
            onClick: () => setActiveTab(tab),
            style: {
              flex: 1, padding: '10px 8px', borderRadius: 11,
              background: activeTab === tab ? t.secondary : 'transparent',
              border: 'none', color: activeTab === tab ? '#fff' : t.textMuted,
              fontFamily: font, fontSize: 13, fontWeight: 600,
              cursor: 'pointer', textTransform: 'capitalize',
              transition: 'all 200ms ease',
            }
          }, tab)
        ))
      ),

      // Posts
      React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 14 } },
        ...posts
          .filter(p => activeTab === 'feed' || (activeTab === 'memories' && p.type === 'memory') || (activeTab === 'discussions' && p.type === 'discussion'))
          .map((post, i) => {
            const TypeIcon = window.lucide[typeIcons[post.type]];
            return React.createElement('div', {
              key: post.id,
              style: {
                background: t.card, borderRadius: 18, padding: '18px 18px 14px',
                border: `1px solid ${t.border}`,
                animation: `slideUp ${200 + i * 80}ms ease`,
              }
            },
              // Header
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 } },
                React.createElement('div', { style: { width: 40, height: 40, borderRadius: 20, background: post.avatar, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
                  React.createElement('span', { style: { fontFamily: font, fontSize: 16, fontWeight: 700, color: '#fff' } }, post.user.charAt(0))
                ),
                React.createElement('div', { style: { flex: 1 } },
                  React.createElement('p', { style: { fontFamily: font, fontSize: 15, fontWeight: 600, color: t.text, margin: 0 } }, post.user),
                  React.createElement('p', { style: { fontFamily: font, fontSize: 12, color: t.textMuted, margin: '1px 0 0' } }, post.time)
                ),
                React.createElement('div', {
                  style: {
                    display: 'flex', alignItems: 'center', gap: 6,
                    padding: '4px 10px', borderRadius: 8,
                    background: typeColors[post.type] + '18',
                  }
                },
                  React.createElement(TypeIcon, { size: 13, color: typeColors[post.type] }),
                  React.createElement('span', { style: { fontFamily: font, fontSize: 11, color: typeColors[post.type], fontWeight: 600 } }, typeLabels[post.type])
                )
              ),
              // Body
              React.createElement('p', { style: { fontFamily: font, fontSize: 15, color: t.text, lineHeight: 1.5, margin: '0 0 12px', fontWeight: 400 } }, post.text),
              // Sound attachment
              post.sound && React.createElement('div', {
                style: {
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '10px 14px', borderRadius: 12,
                  background: t.cardAlt,
                  marginBottom: 12,
                }
              },
                React.createElement('div', { style: { width: 36, height: 36, borderRadius: 18, background: `linear-gradient(135deg, ${t.secondary}, #7C3AED)`, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
                  React.createElement(window.lucide.Play, { size: 16, color: '#fff', fill: '#fff' })
                ),
                React.createElement('div', { style: { flex: 1 } },
                  React.createElement('p', { style: { fontFamily: font, fontSize: 14, fontWeight: 600, color: t.text, margin: 0 } }, post.sound),
                  React.createElement('p', { style: { fontFamily: font, fontSize: 12, color: t.textMuted, margin: '1px 0 0' } }, 'Tap to listen')
                )
              ),
              // Actions
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 20, paddingTop: 8, borderTop: `1px solid ${t.border}` } },
                React.createElement('button', { style: { display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', padding: 4 } },
                  React.createElement(window.lucide.Heart, { size: 18, color: t.textMuted }),
                  React.createElement('span', { style: { fontFamily: font, fontSize: 13, color: t.textMuted } }, post.likes)
                ),
                React.createElement('button', { style: { display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', padding: 4 } },
                  React.createElement(window.lucide.MessageCircle, { size: 18, color: t.textMuted }),
                  React.createElement('span', { style: { fontFamily: font, fontSize: 13, color: t.textMuted } }, post.replies)
                ),
                React.createElement('button', { style: { display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', padding: 4, marginLeft: 'auto' } },
                  React.createElement(window.lucide.Share2, { size: 18, color: t.textMuted })
                ),
              )
            );
          })
      ),
    );
  }

  // ==================== PROFILE SCREEN ====================
  function ProfileScreen() {
    const [streakAnim, setStreakAnim] = useState(false);

    useEffect(() => {
      const timer = setTimeout(() => setStreakAnim(true), 300);
      return () => clearTimeout(timer);
    }, []);

    const badges = [
      { id: 1, name: 'First Steps', icon: 'Footprints', earned: true, color: '#22C55E' },
      { id: 2, name: 'Melody Maker', icon: 'Music', earned: true, color: '#4338CA' },
      { id: 3, name: 'Ocean Guardian', icon: 'Waves', earned: true, color: '#06B6D4' },
      { id: 4, name: 'Night Owl', icon: 'Moon', earned: true, color: '#7C3AED' },
      { id: 5, name: 'Community Star', icon: 'Star', earned: false, color: '#F59E0B' },
      { id: 6, name: 'Sound Alchemist', icon: 'Wand2', earned: false, color: '#EC4899' },
    ];

    const stats = [
      { label: 'Listening Hours', value: '47.2', icon: 'Headphones' },
      { label: 'Trails Completed', value: '18', icon: 'BookOpen' },
      { label: 'Challenges Won', value: '4', icon: 'Trophy' },
    ];

    const milestones = [
      { label: 'Newborn Navigator', progress: 1, xp: '500/500' },
      { label: 'Sleep Specialist', progress: 0.65, xp: '325/500' },
      { label: 'Bonding Expert', progress: 0.3, xp: '150/500' },
    ];

    return React.createElement('div', { style: { padding: '24px 20px 20px' } },
      // Profile header
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 18, marginBottom: 28 } },
        React.createElement('div', {
          style: {
            width: 72, height: 72, borderRadius: 24,
            background: `linear-gradient(135deg, ${t.secondary}, #7C3AED)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 20px rgba(67,56,202,0.3)',
          }
        },
          React.createElement('span', { style: { fontFamily: font, fontSize: 28, fontWeight: 700, color: '#fff' } }, 'S')
        ),
        React.createElement('div', { style: { flex: 1 } },
          React.createElement('h1', { style: { fontFamily: font, fontSize: 22, fontWeight: 700, color: t.text, margin: 0, letterSpacing: -0.3 } }, 'Sarah Johnson'),
          React.createElement('p', { style: { fontFamily: font, fontSize: 14, color: t.textSecondary, margin: '3px 0 0' } }, 'Parent of Olivia, 3 months'),
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6, marginTop: 6 } },
            React.createElement(window.lucide.Flame, { size: 16, color: '#F59E0B' }),
            React.createElement('span', { style: { fontFamily: font, fontSize: 14, fontWeight: 600, color: '#F59E0B' } }, '12-day streak')
          ),
        ),
        React.createElement('button', {
          onClick: () => setTheme(theme === 'dark' ? 'light' : 'dark'),
          style: { width: 44, height: 44, borderRadius: 14, background: t.card, border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }
        }, React.createElement(window.lucide.Settings, { size: 20, color: t.textSecondary }))
      ),

      // Level Progress
      React.createElement('div', {
        style: {
          background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})`,
          borderRadius: 20, padding: '20px 22px', marginBottom: 24,
          position: 'relative', overflow: 'hidden',
        }
      },
        React.createElement('div', { style: { position: 'absolute', top: -40, right: -40, width: 120, height: 120, borderRadius: 60, background: 'rgba(34,197,94,0.1)', animation: 'pulse 4s ease-in-out infinite' } }),
        React.createElement('div', { style: { position: 'relative', zIndex: 1 } },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 } },
            React.createElement('div', null,
              React.createElement('p', { style: { fontFamily: font, fontSize: 13, color: 'rgba(255,255,255,0.5)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5, margin: 0 } }, 'Current Level'),
              React.createElement('h3', { style: { fontFamily: font, fontSize: 22, fontWeight: 700, color: '#fff', margin: '4px 0 0' } }, 'Nurturing Parent')
            ),
            React.createElement('div', { style: { width: 52, height: 52, borderRadius: 16, background: 'rgba(34,197,94,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' } },
              React.createElement('span', { style: { fontFamily: font, fontSize: 22, fontWeight: 800, color: '#22C55E' } }, '7')
            ),
          ),
          React.createElement('div', { style: { height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.1)', marginBottom: 8 } },
            React.createElement('div', { style: { height: '100%', borderRadius: 3, background: 'linear-gradient(90deg, #22C55E, #4ADE80)', width: streakAnim ? '68%' : '0%', transition: 'width 1s ease-out' } })
          ),
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between' } },
            React.createElement('span', { style: { fontFamily: font, fontSize: 12, color: 'rgba(255,255,255,0.4)' } }, '1,720 / 2,500 XP'),
            React.createElement('span', { style: { fontFamily: font, fontSize: 12, color: 'rgba(255,255,255,0.4)' } }, 'Level 8')
          )
        )
      ),

      // Stats
      React.createElement('div', { style: { display: 'flex', gap: 10, marginBottom: 24 } },
        ...stats.map(stat => {
          const Icon = window.lucide[stat.icon];
          return React.createElement('div', {
            key: stat.label,
            style: { flex: 1, background: t.card, borderRadius: 16, padding: '18px 12px', border: `1px solid ${t.border}`, textAlign: 'center' }
          },
            React.createElement(Icon, { size: 22, color: t.secondary, style: { margin: '0 auto 8px' } }),
            React.createElement('p', { style: { fontFamily: font, fontSize: 22, fontWeight: 800, color: t.text, margin: 0, letterSpacing: -0.5 } }, stat.value),
            React.createElement('p', { style: { fontFamily: font, fontSize: 11, color: t.textMuted, margin: '4px 0 0', fontWeight: 500 } }, stat.label)
          );
        })
      ),

      // Badges
      React.createElement('div', { style: { marginBottom: 24 } },
        React.createElement('h3', { style: { fontFamily: font, fontSize: 17, fontWeight: 600, color: t.text, margin: '0 0 14px' } }, 'Badges'),
        React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 } },
          ...badges.map(badge => {
            const Icon = window.lucide[badge.icon] || window.lucide.Award;
            return React.createElement('div', {
              key: badge.id,
              style: {
                background: t.card, borderRadius: 16, padding: '18px 10px',
                border: `1px solid ${badge.earned ? badge.color + '44' : t.border}`,
                textAlign: 'center',
                opacity: badge.earned ? 1 : 0.4,
                transition: 'all 200ms ease',
              }
            },
              React.createElement('div', {
                style: {
                  width: 44, height: 44, borderRadius: 14,
                  background: badge.earned ? badge.color + '22' : t.cardAlt,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 8px',
                }
              },
                React.createElement(Icon, { size: 22, color: badge.earned ? badge.color : t.textMuted })
              ),
              React.createElement('p', { style: { fontFamily: font, fontSize: 12, fontWeight: 600, color: badge.earned ? t.text : t.textMuted, margin: 0, lineHeight: 1.3 } }, badge.name),
              !badge.earned && React.createElement(window.lucide.Lock, { size: 12, color: t.textMuted, style: { marginTop: 4 } })
            );
          })
        )
      ),

      // Milestones
      React.createElement('div', null,
        React.createElement('h3', { style: { fontFamily: font, fontSize: 17, fontWeight: 600, color: t.text, margin: '0 0 14px' } }, 'Growth Milestones'),
        React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 10 } },
          ...milestones.map(ms => (
            React.createElement('div', {
              key: ms.label,
              style: { background: t.card, borderRadius: 14, padding: '16px 18px', border: `1px solid ${t.border}` }
            },
              React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 } },
                React.createElement('span', { style: { fontFamily: font, fontSize: 15, fontWeight: 600, color: t.text } }, ms.label),
                React.createElement('span', { style: { fontFamily: font, fontSize: 13, color: ms.progress === 1 ? '#22C55E' : t.textMuted, fontWeight: 500 } }, ms.progress === 1 ? 'Complete' : ms.xp)
              ),
              React.createElement('div', { style: { height: 5, borderRadius: 3, background: t.border } },
                React.createElement('div', { style: { height: '100%', borderRadius: 3, background: ms.progress === 1 ? '#22C55E' : `linear-gradient(90deg, ${t.secondary}, #7C3AED)`, width: `${ms.progress * 100}%`, transition: 'width 500ms ease' } })
              )
            )
          ))
        )
      ),
    );
  }

  // ==================== BOTTOM NAVIGATION ====================
  const screens = { home: HomeScreen, trails: TrailsScreen, challenges: ChallengesScreen, community: CommunityScreen, profile: ProfileScreen };

  const navItems = [
    { id: 'home', label: 'Home', icon: 'Home' },
    { id: 'trails', label: 'Trails', icon: 'Headphones' },
    { id: 'challenges', label: 'Challenges', icon: 'Flame' },
    { id: 'community', label: 'Circle', icon: 'Users' },
    { id: 'profile', label: 'Profile', icon: 'User' },
  ];

  const ActiveScreenComponent = screens[activeScreen] || HomeScreen;

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
    // CSS Animations
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
        0%, 100% { transform: scale(1); opacity: 0.5; }
        50% { transform: scale(1.15); opacity: 0.8; }
      }
      @keyframes waveform {
        0% { transform: scaleY(0.4); }
        100% { transform: scaleY(1.2); }
      }
      @keyframes shimmer {
        0% { background-position: -200% 0; }
        100% { background-position: 200% 0; }
      }
      * { -webkit-tap-highlight-color: transparent; }
      ::-webkit-scrollbar { display: none; }
    `),

    // Phone Frame
    React.createElement('div', {
      style: {
        width: 375,
        height: 812,
        borderRadius: 44,
        overflow: 'hidden',
        background: themes[theme].bg,
        boxShadow: '0 20px 60px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.1)',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }
    },
      // Scrollable Content
      React.createElement('div', {
        style: {
          flex: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
          paddingTop: 16,
          paddingBottom: 20,
        }
      },
        React.createElement(ActiveScreenComponent)
      ),

      // Bottom Nav
      React.createElement('div', {
        style: {
          background: themes[theme].overlay,
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderTop: `1px solid ${themes[theme].border}`,
          padding: '8px 8px 28px',
          display: 'flex',
          justifyContent: 'space-around',
        }
      },
        ...navItems.map(item => {
          const active = activeScreen === item.id;
          const Icon = window.lucide[item.icon];
          return React.createElement('button', {
            key: item.id,
            onClick: () => setActiveScreen(item.id),
            style: {
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
              background: 'none', border: 'none', cursor: 'pointer',
              padding: '6px 12px', borderRadius: 12,
              minWidth: 54,
              transition: 'all 150ms ease',
            }
          },
            React.createElement(Icon, { size: 24, color: active ? themes[theme].cta : themes[theme].textMuted, fill: active ? themes[theme].cta : 'none', strokeWidth: active ? 2.2 : 1.8 }),
            React.createElement('span', { style: { fontFamily: font, fontSize: 10, fontWeight: active ? 700 : 500, color: active ? themes[theme].cta : themes[theme].textMuted, transition: 'color 150ms ease' } }, item.label)
          );
        })
      ),
    )
  );
}
