// PulseCircle - Live shared rituals strengthening identity bonds
// Single-file React prototype with Babel standalone

function App() {
  const { useState, useEffect, useRef } = React;

  // Theme system
  const themes = {
    dark: {
      bg: '#0D0B14',
      surface: '#1A1625',
      surfaceElevated: '#241E33',
      surfaceHigh: '#2E2744',
      primary: '#A855F7',
      primaryLight: '#C084FC',
      primaryDark: '#7C3AED',
      primaryGlow: 'rgba(168, 85, 247, 0.3)',
      accent: '#06B6D4',
      accentGlow: 'rgba(6, 182, 212, 0.3)',
      success: '#10B981',
      warning: '#F59E0B',
      text: '#F1EDF8',
      textSecondary: '#A89DC0',
      textMuted: '#6B5F82',
      border: '#2E2744',
      borderLight: '#3D3558',
      cardBg: '#1A1625',
      gradientPrimary: 'linear-gradient(135deg, #7C3AED 0%, #A855F7 50%, #C084FC 100%)',
      gradientAccent: 'linear-gradient(135deg, #0891B2 0%, #06B6D4 100%)',
      gradientCard: 'linear-gradient(145deg, #1A1625 0%, #241E33 100%)',
      shimmer: 'rgba(168, 85, 247, 0.08)',
    },
    light: {
      bg: '#F5F0FF',
      surface: '#FFFFFF',
      surfaceElevated: '#F0EBFF',
      surfaceHigh: '#E8DFFF',
      primary: '#7C3AED',
      primaryLight: '#A855F7',
      primaryDark: '#5B21B6',
      primaryGlow: 'rgba(124, 58, 237, 0.2)',
      accent: '#0891B2',
      accentGlow: 'rgba(8, 145, 178, 0.2)',
      success: '#059669',
      warning: '#D97706',
      text: '#1E1030',
      textSecondary: '#5B4A75',
      textMuted: '#8B7AAA',
      border: '#E8DFFF',
      borderLight: '#DDD4F5',
      cardBg: '#FFFFFF',
      gradientPrimary: 'linear-gradient(135deg, #5B21B6 0%, #7C3AED 50%, #A855F7 100%)',
      gradientAccent: 'linear-gradient(135deg, #0369A1 0%, #0891B2 100%)',
      gradientCard: 'linear-gradient(145deg, #FFFFFF 0%, #F5F0FF 100%)',
      shimmer: 'rgba(124, 58, 237, 0.06)',
    }
  };

  const [theme, setTheme] = useState('dark');
  const [activeTab, setActiveTab] = useState('home');
  const [pulseActive, setPulseActive] = useState(false);
  const [pulseIntensity, setPulseIntensity] = useState(67);
  const [joinedCircles, setJoinedCircles] = useState(['artists', 'wellness']);
  const [liveCount, setLiveCount] = useState(847);
  const [chatMessages, setChatMessages] = useState([
    { id: 1, user: 'Maya K.', avatar: '🎨', text: 'This prompt is hitting different today 🔥', time: '2s ago', tribe: 'Artists' },
    { id: 2, user: 'Zen Riku', avatar: '🧘', text: 'Syncing with everyone... I can feel the collective energy', time: '8s ago', tribe: 'Wellness' },
    { id: 3, user: 'Alex R.', avatar: '🏃', text: 'Mile 3 checking in! Let\'s go crew!', time: '12s ago', tribe: 'Runners' },
    { id: 4, user: 'Priya M.', avatar: '✍️', text: 'First time in this circle. Already inspired.', time: '18s ago', tribe: 'Artists' },
    { id: 5, user: 'Jordan T.', avatar: '🎵', text: 'The beat sync is perfect this session', time: '25s ago', tribe: 'Music' },
  ]);
  const [chatInput, setChatInput] = useState('');
  const [ritualStep, setRitualStep] = useState(0);
  const [pressedButton, setPressedButton] = useState(null);
  const [expandedCircle, setExpandedCircle] = useState(null);

  const t = themes[theme];

  // Animate live count
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveCount(prev => prev + Math.floor(Math.random() * 5) - 2);
      setPulseIntensity(prev => {
        const delta = (Math.random() - 0.4) * 3;
        return Math.max(30, Math.min(100, prev + delta));
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Load font
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
      * { box-sizing: border-box; margin: 0; padding: 0; }
      ::-webkit-scrollbar { width: 0px; }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const handleButtonPress = (id) => {
    setPressedButton(id);
    setTimeout(() => setPressedButton(null), 150);
  };

  const btnStyle = (id, base) => ({
    ...base,
    transform: pressedButton === id ? 'scale(0.96)' : 'scale(1)',
    transition: 'all 0.15s ease',
  });

  const circles = [
    {
      id: 'artists',
      name: 'Creative Collective',
      tribe: 'Artists',
      emoji: '🎨',
      color: '#A855F7',
      colorGlow: 'rgba(168, 85, 247, 0.4)',
      members: 2847,
      nextSession: '10 min',
      ritual: 'Expressive Prompt Drop',
      description: 'Daily creative challenges that push artistic boundaries',
      tags: ['visual art', 'writing', 'music', 'design'],
      streak: 12,
      active: true,
    },
    {
      id: 'runners',
      name: 'Pavement Tribe',
      tribe: 'Runners',
      emoji: '🏃',
      color: '#06B6D4',
      colorGlow: 'rgba(6, 182, 212, 0.4)',
      members: 5241,
      nextSession: '6:00 AM',
      ritual: 'Morning Mile Sync',
      description: 'Run together virtually with synchronized pace cues',
      tags: ['running', 'fitness', 'endurance', 'motivation'],
      streak: 7,
      active: false,
    },
    {
      id: 'wellness',
      name: 'Inner Pulse',
      tribe: 'Wellness',
      emoji: '🧘',
      color: '#10B981',
      colorGlow: 'rgba(16, 185, 129, 0.4)',
      members: 3612,
      nextSession: '2 min',
      ritual: 'Breath Ritual',
      description: 'Collective mindfulness and breathwork sessions',
      tags: ['meditation', 'breathwork', 'mindfulness', 'healing'],
      streak: 21,
      active: true,
    },
    {
      id: 'writers',
      name: 'Story Weavers',
      tribe: 'Writers',
      emoji: '✍️',
      color: '#F59E0B',
      colorGlow: 'rgba(245, 158, 11, 0.4)',
      members: 1893,
      nextSession: '3:00 PM',
      ritual: 'Flash Fiction Sprint',
      description: '20-minute timed writing sessions with shared prompts',
      tags: ['fiction', 'poetry', 'journaling', 'storytelling'],
      streak: 0,
      active: false,
    },
  ];

  const ritualSteps = [
    { title: 'Tune In', desc: 'Take 3 deep breaths. Feel the collective space forming.', duration: 30 },
    { title: 'Receive the Pulse', desc: 'Today\'s prompt: "Draw the emotion you carry but cannot name"', duration: 120 },
    { title: 'Create & Share', desc: 'Work in sync with your circle. The Pulse feeds on your energy.', duration: 300 },
    { title: 'Resonate', desc: 'Share your creation. Add to the collective Pulse.', duration: 60 },
  ];

  const archiveData = [
    { date: 'Mar 27', circle: 'Creative Collective', ritual: 'Expressive Prompt Drop', duration: '8 min', mood: '🔥', growth: '+3' },
    { date: 'Mar 26', circle: 'Inner Pulse', ritual: 'Breath Ritual', duration: '12 min', mood: '✨', growth: '+5' },
    { date: 'Mar 25', circle: 'Creative Collective', ritual: 'Color Theory Drop', duration: '8 min', mood: '💜', growth: '+4' },
    { date: 'Mar 24', circle: 'Inner Pulse', ritual: 'Sound Bath Sync', duration: '15 min', mood: '🌊', growth: '+6' },
    { date: 'Mar 23', circle: 'Creative Collective', ritual: 'Abstract Form', duration: '8 min', mood: '⚡', growth: '+3' },
    { date: 'Mar 22', circle: 'Story Weavers', ritual: 'Flash Fiction Sprint', duration: '20 min', mood: '🌙', growth: '+7' },
  ];

  // Screens
  function HomeScreen() {
    const liveCircles = circles.filter(c => c.active);
    const upcomingCircles = circles.filter(c => !c.active);

    return React.createElement('div', {
      style: { flex: 1, overflowY: 'auto', padding: '0 0 16px 0', backgroundColor: t.bg }
    },
      // Header
      React.createElement('div', {
        style: {
          padding: '16px 20px 20px',
          background: `linear-gradient(180deg, ${t.surfaceElevated} 0%, ${t.bg} 100%)`,
        }
      },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' } },
          React.createElement('div', null,
            React.createElement('p', { style: { fontSize: 12, color: t.textMuted, fontFamily: 'Space Grotesk', marginBottom: 2 } }, 'SATURDAY, MAR 28'),
            React.createElement('h1', { style: { fontSize: 26, fontWeight: 700, color: t.text, fontFamily: 'Space Grotesk', lineHeight: 1.2 } }, 'Your Circles'),
          ),
          React.createElement('div', {
            style: {
              display: 'flex', alignItems: 'center', gap: 6,
              background: t.primaryGlow,
              border: `1px solid ${t.primary}`,
              borderRadius: 20, padding: '6px 12px',
            }
          },
            React.createElement('div', { style: { width: 8, height: 8, borderRadius: '50%', backgroundColor: '#10B981', boxShadow: '0 0 6px #10B981' } }),
            React.createElement('span', { style: { fontSize: 12, fontWeight: 600, color: t.primary, fontFamily: 'Space Grotesk' } }, `${liveCount} live`)
          )
        ),

        // Pulse intensity bar
        React.createElement('div', { style: { marginTop: 16 } },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: 6 } },
            React.createElement('span', { style: { fontSize: 11, color: t.textMuted, fontFamily: 'Space Grotesk', fontWeight: 500 } }, 'COLLECTIVE PULSE'),
            React.createElement('span', { style: { fontSize: 11, color: t.primary, fontFamily: 'Space Grotesk', fontWeight: 600 } }, `${Math.round(pulseIntensity)}%`)
          ),
          React.createElement('div', { style: { height: 6, backgroundColor: t.border, borderRadius: 3, overflow: 'hidden' } },
            React.createElement('div', {
              style: {
                height: '100%',
                width: `${pulseIntensity}%`,
                background: t.gradientPrimary,
                borderRadius: 3,
                transition: 'width 1.5s ease',
                boxShadow: `0 0 8px ${t.primaryGlow}`,
              }
            })
          )
        )
      ),

      // Live Now section
      React.createElement('div', { style: { padding: '0 20px 16px' } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 } },
          React.createElement('h2', { style: { fontSize: 14, fontWeight: 600, color: t.textSecondary, fontFamily: 'Space Grotesk', letterSpacing: '0.5px' } }, 'LIVE NOW'),
          React.createElement('span', { style: { fontSize: 12, color: t.primary, fontFamily: 'Space Grotesk', cursor: 'pointer' } }, 'see all')
        ),

        liveCircles.map(circle =>
          React.createElement('div', {
            key: circle.id,
            onClick: () => { setExpandedCircle(circle); setActiveTab('ritual'); },
            style: btnStyle(`live-${circle.id}`, {
              background: t.gradientCard,
              border: `1px solid ${circle.color}40`,
              borderRadius: 16,
              padding: '16px',
              marginBottom: 12,
              cursor: 'pointer',
              boxShadow: `0 4px 20px ${circle.colorGlow}`,
              position: 'relative',
              overflow: 'hidden',
            }),
            onMouseDown: () => handleButtonPress(`live-${circle.id}`),
          },
            React.createElement('div', { style: { position: 'absolute', top: 0, right: 0, width: 100, height: 100, background: `radial-gradient(circle, ${circle.colorGlow} 0%, transparent 70%)`, pointerEvents: 'none' } }),
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' } },
              React.createElement('div', { style: { display: 'flex', gap: 12, alignItems: 'center' } },
                React.createElement('div', {
                  style: {
                    width: 48, height: 48, borderRadius: 14,
                    background: `linear-gradient(135deg, ${circle.color}30, ${circle.color}60)`,
                    border: `1.5px solid ${circle.color}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 22,
                  }
                }, circle.emoji),
                React.createElement('div', null,
                  React.createElement('h3', { style: { fontSize: 15, fontWeight: 700, color: t.text, fontFamily: 'Space Grotesk' } }, circle.name),
                  React.createElement('p', { style: { fontSize: 12, color: t.textMuted, fontFamily: 'Space Grotesk', marginTop: 2 } }, circle.ritual),
                )
              ),
              React.createElement('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 } },
                React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4, background: '#10B98120', borderRadius: 8, padding: '3px 8px' } },
                  React.createElement('div', { style: { width: 6, height: 6, borderRadius: '50%', backgroundColor: '#10B981', animation: 'pulse 2s infinite' } }),
                  React.createElement('span', { style: { fontSize: 11, color: '#10B981', fontWeight: 600, fontFamily: 'Space Grotesk' } }, 'LIVE')
                ),
                React.createElement('span', { style: { fontSize: 11, color: t.textMuted, fontFamily: 'Space Grotesk' } }, `${circle.members.toLocaleString()} members`)
              )
            ),
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 } },
              React.createElement('div', { style: { display: 'flex', gap: 6 } },
                circle.tags.slice(0, 2).map(tag =>
                  React.createElement('span', {
                    key: tag,
                    style: { fontSize: 10, color: circle.color, background: `${circle.color}15`, borderRadius: 6, padding: '3px 8px', fontFamily: 'Space Grotesk', fontWeight: 500 }
                  }, tag)
                )
              ),
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
                React.createElement('span', { style: { fontSize: 12, color: t.textSecondary, fontFamily: 'Space Grotesk' } }, '🔥'),
                React.createElement('span', { style: { fontSize: 12, color: t.textSecondary, fontFamily: 'Space Grotesk' } }, `${circle.streak} day streak`)
              )
            )
          )
        )
      ),

      // Upcoming section
      React.createElement('div', { style: { padding: '0 20px' } },
        React.createElement('h2', { style: { fontSize: 14, fontWeight: 600, color: t.textSecondary, fontFamily: 'Space Grotesk', letterSpacing: '0.5px', marginBottom: 12 } }, 'UPCOMING'),
        upcomingCircles.map(circle =>
          React.createElement('div', {
            key: circle.id,
            style: {
              display: 'flex', alignItems: 'center', gap: 12,
              background: t.surface,
              border: `1px solid ${t.border}`,
              borderRadius: 14,
              padding: '12px 14px',
              marginBottom: 10,
            }
          },
            React.createElement('div', {
              style: {
                width: 42, height: 42, borderRadius: 12,
                background: `${circle.color}20`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 20,
              }
            }, circle.emoji),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('p', { style: { fontSize: 14, fontWeight: 600, color: t.text, fontFamily: 'Space Grotesk' } }, circle.name),
              React.createElement('p', { style: { fontSize: 11, color: t.textMuted, fontFamily: 'Space Grotesk', marginTop: 2 } }, circle.ritual),
            ),
            React.createElement('div', { style: { textAlign: 'right' } },
              React.createElement('p', { style: { fontSize: 12, color: circle.color, fontWeight: 600, fontFamily: 'Space Grotesk' } }, circle.nextSession),
              React.createElement('p', { style: { fontSize: 10, color: t.textMuted, fontFamily: 'Space Grotesk', marginTop: 2 } }, 'next session')
            )
          )
        )
      )
    );
  }

  function RitualScreen() {
    const circle = expandedCircle || circles[0];
    const [entered, setEntered] = useState(false);
    const [currentStep, setCurrentStep] = useState(ritualStep);
    const [timer, setTimer] = useState(ritualSteps[ritualStep].duration);

    useEffect(() => {
      if (!entered) return;
      const interval = setInterval(() => {
        setTimer(t => {
          if (t <= 1) {
            if (currentStep < ritualSteps.length - 1) {
              const next = currentStep + 1;
              setCurrentStep(next);
              setRitualStep(next);
              return ritualSteps[next].duration;
            }
            return 0;
          }
          return t - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }, [entered, currentStep]);

    const formatTime = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
    const progress = entered ? ((ritualSteps[currentStep].duration - timer) / ritualSteps[currentStep].duration) * 100 : 0;

    return React.createElement('div', {
      style: { flex: 1, overflowY: 'auto', backgroundColor: t.bg }
    },
      // Header
      React.createElement('div', {
        style: {
          padding: '16px 20px',
          background: `linear-gradient(180deg, ${circle.color}25 0%, transparent 100%)`,
          borderBottom: `1px solid ${t.border}`,
        }
      },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12 } },
          React.createElement('div', {
            style: {
              width: 44, height: 44, borderRadius: 13,
              background: `linear-gradient(135deg, ${circle.color}40, ${circle.color}70)`,
              border: `1.5px solid ${circle.color}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 22,
            }
          }, circle.emoji),
          React.createElement('div', null,
            React.createElement('h2', { style: { fontSize: 17, fontWeight: 700, color: t.text, fontFamily: 'Space Grotesk' } }, circle.name),
            React.createElement('p', { style: { fontSize: 12, color: t.textMuted, fontFamily: 'Space Grotesk' } }, circle.ritual),
          )
        )
      ),

      React.createElement('div', { style: { padding: '20px' } },
        // Pulse visualizer
        React.createElement('div', {
          style: {
            background: `radial-gradient(circle at center, ${circle.color}20 0%, ${t.surface} 70%)`,
            border: `1px solid ${circle.color}40`,
            borderRadius: 20,
            padding: '28px',
            textAlign: 'center',
            marginBottom: 20,
            position: 'relative',
            overflow: 'hidden',
          }
        },
          // Animated rings
          [1, 2, 3].map(i =>
            React.createElement('div', {
              key: i,
              style: {
                position: 'absolute',
                top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 60 + i * 50,
                height: 60 + i * 50,
                borderRadius: '50%',
                border: `1px solid ${circle.color}${entered ? Math.round(30 / i).toString(16).padStart(2, '0') : '10'}`,
                transition: 'border-color 1s ease',
                pointerEvents: 'none',
              }
            })
          ),
          React.createElement('div', {
            style: {
              width: 80, height: 80,
              borderRadius: '50%',
              background: `radial-gradient(circle, ${circle.color} 0%, ${circle.color}60 100%)`,
              margin: '0 auto 16px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 32,
              boxShadow: entered ? `0 0 30px ${circle.colorGlow}` : 'none',
              transition: 'box-shadow 1s ease',
              position: 'relative', zIndex: 1,
            }
          }, circle.emoji),

          entered ? [
            React.createElement('p', { key: 'step', style: { fontSize: 11, color: circle.color, fontWeight: 600, fontFamily: 'Space Grotesk', letterSpacing: '1px', marginBottom: 6 } },
              `STEP ${currentStep + 1} OF ${ritualSteps.length}`
            ),
            React.createElement('h3', { key: 'title', style: { fontSize: 18, fontWeight: 700, color: t.text, fontFamily: 'Space Grotesk', marginBottom: 8 } },
              ritualSteps[currentStep].title
            ),
            React.createElement('p', { key: 'desc', style: { fontSize: 13, color: t.textSecondary, fontFamily: 'Space Grotesk', lineHeight: 1.5, marginBottom: 14 } },
              ritualSteps[currentStep].desc
            ),
            React.createElement('div', { key: 'timer', style: { fontSize: 28, fontWeight: 700, color: circle.color, fontFamily: 'Space Grotesk' } }, formatTime(timer)),
            // Progress bar
            React.createElement('div', { key: 'bar', style: { marginTop: 12, height: 4, background: t.border, borderRadius: 2 } },
              React.createElement('div', {
                style: {
                  height: '100%',
                  width: `${progress}%`,
                  background: circle.color,
                  borderRadius: 2,
                  transition: 'width 1s linear',
                }
              })
            ),
          ] : [
            React.createElement('h3', { key: 'title', style: { fontSize: 18, fontWeight: 700, color: t.text, fontFamily: 'Space Grotesk', marginBottom: 8 } }, 'Ready to Pulse?'),
            React.createElement('p', { key: 'desc', style: { fontSize: 13, color: t.textSecondary, fontFamily: 'Space Grotesk' } },
              `${circle.members.toLocaleString()} members are syncing. Join the collective energy.`
            ),
          ]
        ),

        // Steps overview
        React.createElement('div', { style: { marginBottom: 20 } },
          React.createElement('p', { style: { fontSize: 12, color: t.textMuted, fontFamily: 'Space Grotesk', fontWeight: 500, marginBottom: 10, letterSpacing: '0.5px' } }, 'RITUAL FLOW'),
          ritualSteps.map((step, i) =>
            React.createElement('div', {
              key: i,
              style: {
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '10px 12px',
                background: entered && i === currentStep ? `${circle.color}15` : t.surface,
                border: `1px solid ${entered && i === currentStep ? circle.color + '50' : t.border}`,
                borderRadius: 10,
                marginBottom: 8,
                transition: 'all 0.3s ease',
              }
            },
              React.createElement('div', {
                style: {
                  width: 28, height: 28, borderRadius: '50%',
                  background: entered && i <= currentStep ? circle.color : t.surfaceHigh,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 11, fontWeight: 700, color: entered && i <= currentStep ? '#fff' : t.textMuted,
                  fontFamily: 'Space Grotesk',
                  flexShrink: 0,
                }
              }, i + 1),
              React.createElement('div', { style: { flex: 1 } },
                React.createElement('p', { style: { fontSize: 13, fontWeight: 600, color: t.text, fontFamily: 'Space Grotesk' } }, step.title),
                React.createElement('p', { style: { fontSize: 11, color: t.textMuted, fontFamily: 'Space Grotesk' } }, `${step.duration}s`),
              )
            )
          )
        ),

        // Enter/Leave button
        React.createElement('button', {
          onClick: () => { setEntered(!entered); handleButtonPress('enter'); },
          onMouseDown: () => handleButtonPress('enter'),
          style: btnStyle('enter', {
            width: '100%',
            padding: '16px',
            background: entered ? 'transparent' : `linear-gradient(135deg, ${circle.color}, ${circle.color}cc)`,
            border: `2px solid ${circle.color}`,
            borderRadius: 14,
            color: entered ? circle.color : '#fff',
            fontSize: 15,
            fontWeight: 700,
            fontFamily: 'Space Grotesk',
            cursor: 'pointer',
            boxShadow: entered ? 'none' : `0 4px 20px ${circle.colorGlow}`,
          })
        }, entered ? '✕ Leave Ritual' : `⚡ Enter the Circle`)
      )
    );
  }

  function DiscoverScreen() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('all');
    const filters = ['all', 'artists', 'fitness', 'wellness', 'writers', 'music'];

    return React.createElement('div', {
      style: { flex: 1, overflowY: 'auto', backgroundColor: t.bg }
    },
      React.createElement('div', { style: { padding: '16px 20px 0' } },
        React.createElement('h1', { style: { fontSize: 24, fontWeight: 700, color: t.text, fontFamily: 'Space Grotesk', marginBottom: 14 } }, 'Find Your Tribe'),

        // Search bar
        React.createElement('div', {
          style: {
            display: 'flex', alignItems: 'center', gap: 10,
            background: t.surface,
            border: `1px solid ${t.border}`,
            borderRadius: 12,
            padding: '10px 14px',
            marginBottom: 16,
          }
        },
          React.createElement(window.lucide.Search, { size: 16, color: t.textMuted }),
          React.createElement('input', {
            type: 'text',
            placeholder: 'Search circles, rituals, tribes...',
            value: searchQuery,
            onChange: e => setSearchQuery(e.target.value),
            style: {
              flex: 1, border: 'none', background: 'transparent',
              color: t.text, fontSize: 14, fontFamily: 'Space Grotesk',
              outline: 'none',
            }
          })
        ),

        // Filters
        React.createElement('div', {
          style: { display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 14 }
        },
          filters.map(f =>
            React.createElement('button', {
              key: f,
              onClick: () => setSelectedFilter(f),
              style: {
                padding: '6px 14px',
                borderRadius: 20,
                border: `1px solid ${selectedFilter === f ? t.primary : t.border}`,
                background: selectedFilter === f ? t.primaryGlow : 'transparent',
                color: selectedFilter === f ? t.primaryLight : t.textMuted,
                fontSize: 12,
                fontWeight: 500,
                fontFamily: 'Space Grotesk',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }
            }, f.charAt(0).toUpperCase() + f.slice(1))
          )
        )
      ),

      React.createElement('div', { style: { padding: '0 20px 20px' } },
        // Featured
        React.createElement('p', { style: { fontSize: 12, color: t.textMuted, fontFamily: 'Space Grotesk', fontWeight: 500, marginBottom: 12, letterSpacing: '0.5px' } }, 'ALL CIRCLES'),
        circles.map(circle =>
          React.createElement('div', {
            key: circle.id,
            onClick: () => { setExpandedCircle(circle); setActiveTab('ritual'); handleButtonPress(`disc-${circle.id}`); },
            onMouseDown: () => handleButtonPress(`disc-${circle.id}`),
            style: btnStyle(`disc-${circle.id}`, {
              background: t.surface,
              border: `1px solid ${t.border}`,
              borderRadius: 16,
              padding: '16px',
              marginBottom: 12,
              cursor: 'pointer',
            })
          },
            React.createElement('div', { style: { display: 'flex', gap: 12 } },
              React.createElement('div', {
                style: {
                  width: 52, height: 52, borderRadius: 15,
                  background: `linear-gradient(135deg, ${circle.color}30, ${circle.color}60)`,
                  border: `2px solid ${circle.color}50`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 24, flexShrink: 0,
                }
              }, circle.emoji),
              React.createElement('div', { style: { flex: 1 } },
                React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' } },
                  React.createElement('h3', { style: { fontSize: 15, fontWeight: 700, color: t.text, fontFamily: 'Space Grotesk' } }, circle.name),
                  circle.active && React.createElement('div', {
                    style: { display: 'flex', alignItems: 'center', gap: 4, background: '#10B98120', borderRadius: 6, padding: '2px 7px' }
                  },
                    React.createElement('div', { style: { width: 5, height: 5, borderRadius: '50%', backgroundColor: '#10B981' } }),
                    React.createElement('span', { style: { fontSize: 10, color: '#10B981', fontWeight: 600, fontFamily: 'Space Grotesk' } }, 'LIVE')
                  )
                ),
                React.createElement('p', { style: { fontSize: 12, color: t.textMuted, fontFamily: 'Space Grotesk', marginTop: 3, marginBottom: 8 } }, circle.description),
                React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
                  React.createElement('div', { style: { display: 'flex', gap: 5 } },
                    circle.tags.slice(0, 2).map(tag =>
                      React.createElement('span', {
                        key: tag,
                        style: { fontSize: 10, color: circle.color, background: `${circle.color}15`, borderRadius: 5, padding: '2px 7px', fontFamily: 'Space Grotesk' }
                      }, tag)
                    )
                  ),
                  React.createElement('span', { style: { fontSize: 11, color: t.textMuted, fontFamily: 'Space Grotesk' } },
                    `${circle.members.toLocaleString()} members`
                  )
                )
              )
            ),

            // Join/Joined button
            React.createElement('div', {
              onClick: e => {
                e.stopPropagation();
                setJoinedCircles(prev =>
                  prev.includes(circle.id) ? prev.filter(id => id !== circle.id) : [...prev, circle.id]
                );
              },
              style: {
                marginTop: 12,
                padding: '8px',
                borderRadius: 10,
                background: joinedCircles.includes(circle.id) ? `${circle.color}20` : t.gradientPrimary,
                textAlign: 'center',
                fontSize: 13,
                fontWeight: 600,
                fontFamily: 'Space Grotesk',
                color: joinedCircles.includes(circle.id) ? circle.color : '#fff',
                border: `1px solid ${circle.color}40`,
                cursor: 'pointer',
              }
            }, joinedCircles.includes(circle.id) ? '✓ Joined' : '+ Join Circle')
          )
        )
      )
    );
  }

  function ChatScreen() {
    const chatRef = useRef(null);

    const sendMessage = () => {
      if (!chatInput.trim()) return;
      setChatMessages(prev => [{
        id: Date.now(),
        user: 'You',
        avatar: '💜',
        text: chatInput,
        time: 'just now',
        tribe: 'Artists'
      }, ...prev]);
      setChatInput('');
    };

    return React.createElement('div', {
      style: { flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: t.bg }
    },
      React.createElement('div', {
        style: {
          padding: '16px 20px 12px',
          borderBottom: `1px solid ${t.border}`,
          background: t.surface,
        }
      },
        React.createElement('h1', { style: { fontSize: 20, fontWeight: 700, color: t.text, fontFamily: 'Space Grotesk' } }, 'Pulse Chat'),
        React.createElement('p', { style: { fontSize: 12, color: t.textMuted, fontFamily: 'Space Grotesk', marginTop: 2 } }, `${liveCount} pulsing now across all circles`)
      ),

      // Messages
      React.createElement('div', {
        ref: chatRef,
        style: { flex: 1, overflowY: 'auto', padding: '16px 20px' }
      },
        chatMessages.map(msg =>
          React.createElement('div', {
            key: msg.id,
            style: {
              display: 'flex', gap: 10, marginBottom: 14,
              flexDirection: msg.user === 'You' ? 'row-reverse' : 'row',
            }
          },
            React.createElement('div', {
              style: {
                width: 34, height: 34, borderRadius: '50%',
                background: t.surfaceHigh,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 16, flexShrink: 0,
              }
            }, msg.avatar),
            React.createElement('div', { style: { maxWidth: '72%' } },
              React.createElement('div', { style: { display: 'flex', gap: 8, alignItems: 'baseline', marginBottom: 4, flexDirection: msg.user === 'You' ? 'row-reverse' : 'row' } },
                React.createElement('span', { style: { fontSize: 12, fontWeight: 600, color: t.textSecondary, fontFamily: 'Space Grotesk' } }, msg.user),
                React.createElement('span', { style: { fontSize: 10, color: t.textMuted, fontFamily: 'Space Grotesk' } }, msg.time),
              ),
              React.createElement('div', {
                style: {
                  background: msg.user === 'You' ? t.gradientPrimary : t.surface,
                  border: `1px solid ${msg.user === 'You' ? 'transparent' : t.border}`,
                  borderRadius: msg.user === 'You' ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
                  padding: '9px 12px',
                }
              },
                React.createElement('p', { style: { fontSize: 13, color: msg.user === 'You' ? '#fff' : t.text, fontFamily: 'Space Grotesk', lineHeight: 1.4 } }, msg.text)
              )
            )
          )
        )
      ),

      // Input
      React.createElement('div', {
        style: {
          padding: '12px 16px',
          background: t.surface,
          borderTop: `1px solid ${t.border}`,
          display: 'flex', gap: 10, alignItems: 'center',
        }
      },
        React.createElement('input', {
          type: 'text',
          placeholder: 'Share your pulse...',
          value: chatInput,
          onChange: e => setChatInput(e.target.value),
          onKeyDown: e => e.key === 'Enter' && sendMessage(),
          style: {
            flex: 1, background: t.surfaceElevated,
            border: `1px solid ${t.border}`,
            borderRadius: 22,
            padding: '10px 16px',
            color: t.text,
            fontSize: 13,
            fontFamily: 'Space Grotesk',
            outline: 'none',
          }
        }),
        React.createElement('button', {
          onClick: sendMessage,
          style: {
            width: 40, height: 40,
            borderRadius: '50%',
            background: t.gradientPrimary,
            border: 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: `0 2px 12px ${t.primaryGlow}`,
          }
        },
          React.createElement(window.lucide.Send, { size: 16, color: '#fff' })
        )
      )
    );
  }

  function ProfileScreen() {
    const totalSessions = archiveData.length;
    const totalMinutes = archiveData.reduce((acc, d) => acc + parseInt(d.duration), 0);

    return React.createElement('div', {
      style: { flex: 1, overflowY: 'auto', backgroundColor: t.bg }
    },
      // Profile header
      React.createElement('div', {
        style: {
          background: `linear-gradient(180deg, ${t.surfaceElevated} 0%, ${t.bg} 100%)`,
          padding: '20px 20px 24px',
        }
      },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 } },
          React.createElement('h1', { style: { fontSize: 22, fontWeight: 700, color: t.text, fontFamily: 'Space Grotesk' } }, 'My Journey'),
          // Theme toggle
          React.createElement('button', {
            onClick: () => setTheme(theme === 'dark' ? 'light' : 'dark'),
            style: {
              width: 38, height: 38, borderRadius: '50%',
              background: t.surfaceHigh,
              border: `1px solid ${t.border}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
            }
          },
            theme === 'dark'
              ? React.createElement(window.lucide.Sun, { size: 16, color: t.textSecondary })
              : React.createElement(window.lucide.Moon, { size: 16, color: t.textSecondary })
          )
        ),

        // Avatar
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 } },
          React.createElement('div', {
            style: {
              width: 64, height: 64, borderRadius: '50%',
              background: t.gradientPrimary,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 28,
              boxShadow: `0 4px 20px ${t.primaryGlow}`,
            }
          }, '💜'),
          React.createElement('div', null,
            React.createElement('h2', { style: { fontSize: 18, fontWeight: 700, color: t.text, fontFamily: 'Space Grotesk' } }, 'Alex Morgan'),
            React.createElement('p', { style: { fontSize: 13, color: t.textMuted, fontFamily: 'Space Grotesk' } }, '@alexmorgan · Artists, Wellness'),
          )
        ),

        // Stats row
        React.createElement('div', { style: { display: 'flex', gap: 10 } },
          [
            { label: 'Sessions', value: totalSessions },
            { label: 'Minutes', value: totalMinutes },
            { label: 'Streak', value: '21 🔥' },
          ].map(stat =>
            React.createElement('div', {
              key: stat.label,
              style: {
                flex: 1, textAlign: 'center',
                background: t.surface,
                border: `1px solid ${t.border}`,
                borderRadius: 12,
                padding: '12px 8px',
              }
            },
              React.createElement('p', { style: { fontSize: 18, fontWeight: 700, color: t.primary, fontFamily: 'Space Grotesk' } }, stat.value),
              React.createElement('p', { style: { fontSize: 10, color: t.textMuted, fontFamily: 'Space Grotesk', marginTop: 2 } }, stat.label),
            )
          )
        )
      ),

      React.createElement('div', { style: { padding: '0 20px 20px' } },
        // Archive
        React.createElement('p', { style: { fontSize: 12, color: t.textMuted, fontFamily: 'Space Grotesk', fontWeight: 500, marginBottom: 12, letterSpacing: '0.5px' } }, 'RITUAL ARCHIVE'),
        archiveData.map((entry, i) =>
          React.createElement('div', {
            key: i,
            style: {
              display: 'flex', alignItems: 'center', gap: 12,
              background: t.surface,
              border: `1px solid ${t.border}`,
              borderRadius: 12,
              padding: '12px',
              marginBottom: 8,
            }
          },
            React.createElement('div', {
              style: {
                width: 36, height: 36, borderRadius: 10,
                background: t.surfaceHigh,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 18,
              }
            }, entry.mood),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('p', { style: { fontSize: 13, fontWeight: 600, color: t.text, fontFamily: 'Space Grotesk' } }, entry.ritual),
              React.createElement('p', { style: { fontSize: 11, color: t.textMuted, fontFamily: 'Space Grotesk', marginTop: 2 } }, `${entry.circle} · ${entry.date}`),
            ),
            React.createElement('div', { style: { textAlign: 'right' } },
              React.createElement('p', { style: { fontSize: 11, color: t.textMuted, fontFamily: 'Space Grotesk' } }, entry.duration),
              React.createElement('p', { style: { fontSize: 12, color: t.success, fontWeight: 600, fontFamily: 'Space Grotesk' } }, entry.growth + ' pts'),
            )
          )
        )
      )
    );
  }

  const tabs = [
    { id: 'home', label: 'Home', icon: window.lucide.Home },
    { id: 'ritual', label: 'Ritual', icon: window.lucide.Zap },
    { id: 'discover', label: 'Discover', icon: window.lucide.Compass },
    { id: 'chat', label: 'Chat', icon: window.lucide.MessageCircle },
    { id: 'profile', label: 'Profile', icon: window.lucide.User },
  ];

  const screens = {
    home: HomeScreen,
    ritual: RitualScreen,
    discover: DiscoverScreen,
    chat: ChatScreen,
    profile: ProfileScreen,
  };

  return React.createElement('div', {
    style: {
      minHeight: '100vh',
      backgroundColor: '#f0f0f0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Space Grotesk, sans-serif',
    }
  },
    // Phone frame
    React.createElement('div', {
      style: {
        width: 375,
        height: 812,
        backgroundColor: t.bg,
        borderRadius: 50,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 40px 80px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.08), inset 0 0 0 1.5px rgba(255,255,255,0.06)',
      }
    },
      // Dynamic Island
      React.createElement('div', {
        style: {
          position: 'absolute',
          top: 12,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 120,
          height: 34,
          backgroundColor: '#000',
          borderRadius: 20,
          zIndex: 100,
        }
      }),

      // Status bar
      React.createElement('div', {
        style: {
          height: 56,
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          paddingBottom: 8,
          paddingLeft: 20,
          paddingRight: 20,
          backgroundColor: t.bg,
          flexShrink: 0,
          position: 'relative',
          zIndex: 10,
        }
      },
        React.createElement('span', { style: { fontSize: 13, fontWeight: 600, color: t.text, fontFamily: 'Space Grotesk' } }, '9:41'),
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6 } },
          React.createElement(window.lucide.Wifi, { size: 14, color: t.text }),
          React.createElement(window.lucide.Battery, { size: 14, color: t.text }),
        )
      ),

      // Main content
      React.createElement('div', { style: { flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' } },
        React.createElement(screens[activeTab])
      ),

      // Bottom nav
      React.createElement('div', {
        style: {
          height: 80,
          backgroundColor: t.surface,
          borderTop: `1px solid ${t.border}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          paddingBottom: 12,
          flexShrink: 0,
        }
      },
        tabs.map(tab =>
          React.createElement('div', {
            key: tab.id,
            onClick: () => setActiveTab(tab.id),
            style: {
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 4,
              padding: '6px 10px',
              cursor: 'pointer',
              opacity: activeTab === tab.id ? 1 : 0.5,
              transition: 'opacity 0.2s ease',
            }
          },
            React.createElement(tab.icon, {
              size: 22,
              color: activeTab === tab.id ? t.primary : t.textMuted,
              strokeWidth: activeTab === tab.id ? 2.5 : 1.8,
            }),
            React.createElement('span', {
              style: {
                fontSize: 10,
                fontWeight: activeTab === tab.id ? 600 : 400,
                color: activeTab === tab.id ? t.primary : t.textMuted,
                fontFamily: 'Space Grotesk',
              }
            }, tab.label)
          )
        )
      )
    )
  );
}
