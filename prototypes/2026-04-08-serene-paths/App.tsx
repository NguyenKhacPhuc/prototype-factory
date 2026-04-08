const { useState, useEffect, useRef, useCallback } = React;

function App() {
  // Theme system
  const themes = {
    light: {
      primary: '#0EA5E9',
      secondary: '#38BDF8',
      cta: '#F97316',
      bg: '#F0F9FF',
      card: '#FFFFFF',
      cardAlt: '#E0F2FE',
      text: '#0C4A6E',
      textSecondary: '#64748B',
      textMuted: '#94A3B8',
      border: '#BAE6FD',
      navBg: '#FFFFFF',
      navBorder: '#E0F2FE',
      sanctuary: 'linear-gradient(180deg, #0EA5E9 0%, #38BDF8 40%, #BAE6FD 100%)',
      havenGrad: 'linear-gradient(135deg, #0EA5E9 0%, #6366F1 50%, #8B5CF6 100%)',
      progressBg: '#E0F2FE',
      overlay: 'rgba(12, 74, 110, 0.6)',
    },
    dark: {
      primary: '#38BDF8',
      secondary: '#0EA5E9',
      cta: '#FB923C',
      bg: '#0C1929',
      card: '#152238',
      cardAlt: '#1E3048',
      text: '#E0F2FE',
      textSecondary: '#7DD3FC',
      textMuted: '#64748B',
      border: '#1E3A5F',
      navBg: '#0F1D2F',
      navBorder: '#1E3A5F',
      sanctuary: 'linear-gradient(180deg, #0C1929 0%, #152238 40%, #1E3048 100%)',
      havenGrad: 'linear-gradient(135deg, #1E3A5F 0%, #312E81 50%, #4C1D95 100%)',
      progressBg: '#1E3A5F',
      overlay: 'rgba(0, 0, 0, 0.7)',
    }
  };

  const [isDark, setIsDark] = useState(false);
  const t = isDark ? themes.dark : themes.light;
  const [activeScreen, setActiveScreen] = useState('home');
  const [animKey, setAnimKey] = useState(0);
  const [pressedTab, setPressedTab] = useState(null);
  const [selectedRitual, setSelectedRitual] = useState(null);
  const [journalExpanded, setJournalExpanded] = useState(null);
  const [sanctuaryTab, setSanctuaryTab] = useState('space');
  const [guildTab, setGuildTab] = useState('quests');

  const switchScreen = useCallback((screen) => {
    setAnimKey(k => k + 1);
    setActiveScreen(screen);
  }, []);

  const font = "-apple-system, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif";

  // Lucide icons helper
  const Icon = ({ name, size = 24, color = t.text, style = {} }) => {
    const IconComponent = window.lucide && window.lucide[name];
    if (!IconComponent) return null;
    return React.createElement(IconComponent, { size, color, style, strokeWidth: 1.8 });
  };

  // ===== HOME SCREEN =====
  function HomeScreen() {
    const [breathPhase, setBreathPhase] = useState('inhale');
    const [checkedRituals, setCheckedRituals] = useState({});

    useEffect(() => {
      const interval = setInterval(() => {
        setBreathPhase(p => p === 'inhale' ? 'exhale' : 'inhale');
      }, 4000);
      return () => clearInterval(interval);
    }, []);

    const todayRituals = [
      { id: 'r1', title: 'Morning Grounding', subtitle: '5 min body scan', icon: 'Sunrise', progress: 100 },
      { id: 'r2', title: 'Mindful Packing', subtitle: 'Intention setting for items', icon: 'Luggage', progress: 60 },
      { id: 'r3', title: 'Transit Breathwork', subtitle: '3-phase breathing exercise', icon: 'Wind', progress: 0 },
      { id: 'r4', title: 'Arrival Grounding', subtitle: '5 senses check-in', icon: 'MapPin', progress: 0 },
    ];

    return React.createElement('div', { style: { padding: '20px 16px 24px', animation: 'fadeIn 0.4s ease' } },
      // Header
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 } },
        React.createElement('div', null,
          React.createElement('p', { style: { fontFamily: font, fontSize: 15, color: t.textSecondary, fontWeight: 500, margin: 0 } }, 'Good morning'),
          React.createElement('h1', { style: { fontFamily: font, fontSize: 34, fontWeight: 800, color: t.text, margin: '2px 0 0', letterSpacing: -0.5 } }, 'Serene Paths')
        ),
        React.createElement('div', {
          style: { width: 44, height: 44, borderRadius: 22, background: t.cardAlt, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' },
          onClick: () => setIsDark(!isDark)
        }, React.createElement(Icon, { name: isDark ? 'Sun' : 'Moon', size: 20, color: t.primary }))
      ),

      // Breathing widget
      React.createElement('div', {
        style: {
          background: t.havenGrad, borderRadius: 20, padding: '24px 20px', marginBottom: 20,
          position: 'relative', overflow: 'hidden', boxShadow: '0 8px 32px rgba(14, 165, 233, 0.2)'
        }
      },
        React.createElement('div', {
          style: {
            position: 'absolute', top: -40, right: -40, width: 120, height: 120, borderRadius: 60,
            background: 'rgba(255,255,255,0.08)', animation: 'pulse 4s ease-in-out infinite'
          }
        }),
        React.createElement('div', {
          style: {
            position: 'absolute', bottom: -20, left: 30, width: 80, height: 80, borderRadius: 40,
            background: 'rgba(255,255,255,0.05)', animation: 'pulse 4s ease-in-out infinite 1s'
          }
        }),
        React.createElement('p', { style: { fontFamily: font, fontSize: 13, color: 'rgba(255,255,255,0.7)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, margin: '0 0 8px' } }, 'Breathe with me'),
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 16 } },
          React.createElement('div', {
            style: {
              width: 56, height: 56, borderRadius: 28, border: '2px solid rgba(255,255,255,0.4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transform: breathPhase === 'inhale' ? 'scale(1.15)' : 'scale(0.85)',
              transition: 'transform 3.5s ease-in-out',
              background: 'rgba(255,255,255,0.1)'
            }
          }, React.createElement(Icon, { name: 'Waves', size: 28, color: '#fff' })),
          React.createElement('div', null,
            React.createElement('p', { style: { fontFamily: font, fontSize: 22, fontWeight: 700, color: '#fff', margin: 0, letterSpacing: -0.3 } },
              breathPhase === 'inhale' ? 'Breathe in...' : 'Breathe out...'
            ),
            React.createElement('p', { style: { fontFamily: font, fontSize: 15, color: 'rgba(255,255,255,0.7)', margin: '4px 0 0' } }, 'Follow the rhythm')
          )
        )
      ),

      // Journey progress
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 } },
        React.createElement('h2', { style: { fontFamily: font, fontSize: 22, fontWeight: 700, color: t.text, margin: 0, letterSpacing: -0.3 } }, "Today's Rituals"),
        React.createElement('span', { style: { fontFamily: font, fontSize: 13, color: t.cta, fontWeight: 600 } }, '1 of 4 done')
      ),

      ...todayRituals.map((ritual, i) =>
        React.createElement('div', {
          key: ritual.id,
          style: {
            background: t.card, borderRadius: 16, padding: '14px 16px', marginBottom: 10,
            display: 'flex', alignItems: 'center', gap: 14,
            border: `1px solid ${t.border}`, cursor: 'pointer',
            transition: 'transform 0.15s ease, box-shadow 0.15s ease',
            animation: `slideUp 0.4s ease ${i * 0.08}s both`,
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          },
          onClick: () => { setSelectedRitual(ritual); switchScreen('journeys'); },
          onMouseDown: (e) => e.currentTarget.style.transform = 'scale(0.97)',
          onMouseUp: (e) => e.currentTarget.style.transform = 'scale(1)',
          onMouseLeave: (e) => e.currentTarget.style.transform = 'scale(1)',
        },
          React.createElement('div', {
            style: {
              width: 44, height: 44, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: ritual.progress === 100 ? `${t.primary}15` : `${t.cta}12`,
              flexShrink: 0
            }
          }, React.createElement(Icon, { name: ritual.icon, size: 22, color: ritual.progress === 100 ? t.primary : t.cta })),
          React.createElement('div', { style: { flex: 1, minWidth: 0 } },
            React.createElement('p', { style: { fontFamily: font, fontSize: 17, fontWeight: 600, color: t.text, margin: 0 } }, ritual.title),
            React.createElement('p', { style: { fontFamily: font, fontSize: 13, color: t.textMuted, margin: '2px 0 0' } }, ritual.subtitle),
            React.createElement('div', { style: { marginTop: 8, height: 4, borderRadius: 2, background: t.progressBg, overflow: 'hidden' } },
              React.createElement('div', { style: { height: '100%', borderRadius: 2, width: `${ritual.progress}%`, background: ritual.progress === 100 ? t.primary : t.cta, transition: 'width 0.6s ease' } })
            )
          ),
          ritual.progress === 100
            ? React.createElement(Icon, { name: 'CheckCircle2', size: 22, color: t.primary })
            : React.createElement(Icon, { name: 'ChevronRight', size: 20, color: t.textMuted })
        )
      ),

      // Guild teaser
      React.createElement('div', {
        style: {
          background: t.card, borderRadius: 20, padding: '18px 18px', marginTop: 10,
          border: `1px solid ${t.border}`, cursor: 'pointer',
          boxShadow: '0 2px 12px rgba(0,0,0,0.04)', animation: 'slideUp 0.4s ease 0.35s both'
        },
        onClick: () => switchScreen('compass')
      },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 } },
          React.createElement(Icon, { name: 'Compass', size: 20, color: t.cta }),
          React.createElement('span', { style: { fontFamily: font, fontSize: 15, fontWeight: 600, color: t.cta } }, 'Collective Compass'),
          React.createElement('span', { style: { fontFamily: font, fontSize: 15, color: t.text } }, ''),
        ),
        React.createElement('p', { style: { fontFamily: font, fontSize: 15, color: t.textSecondary, margin: 0 } }, 'Your guild "Wandering Lotus" completed 3 quests this week. The World Haven is evolving!'),
        React.createElement('div', { style: { display: 'flex', gap: -8, marginTop: 12 } },
          ...[0,1,2,3].map(i =>
            React.createElement('div', {
              key: i,
              style: {
                width: 32, height: 32, borderRadius: 16,
                background: ['#0EA5E9', '#F97316', '#8B5CF6', '#10B981'][i],
                border: `2px solid ${t.card}`, marginLeft: i > 0 ? -8 : 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: font, fontSize: 13, fontWeight: 600, color: '#fff'
              }
            }, ['S', 'M', 'A', 'J'][i])
          ),
          React.createElement('span', { style: { fontFamily: font, fontSize: 13, color: t.textMuted, marginLeft: 8, alignSelf: 'center' } }, '+12 members')
        )
      )
    );
  }

  // ===== JOURNEYS SCREEN =====
  function JourneysScreen() {
    const [activeJourney, setActiveJourney] = useState('pre');
    const journeyTypes = [
      { id: 'pre', label: 'Pre-Trip', icon: 'Luggage' },
      { id: 'transit', label: 'In Transit', icon: 'Plane' },
      { id: 'post', label: 'Post-Trip', icon: 'Palmtree' },
    ];

    const journeys = {
      pre: [
        { title: 'Mindful Packing Quest', desc: 'Set intentions for each item you bring. Touch, observe, and choose with purpose.', duration: '15 min', rituals: 4, unlocks: 'Forest Rain soundscape', icon: 'Package', color: '#0EA5E9' },
        { title: 'Pre-Journey Visualization', desc: 'Close your eyes and mentally walk through your upcoming trip with calm awareness.', duration: '10 min', rituals: 3, unlocks: 'Mountain Dawn meditation', icon: 'Eye', color: '#8B5CF6' },
        { title: 'Letting Go Ceremony', desc: 'Release anxieties about your trip by writing and symbolically releasing worries.', duration: '12 min', rituals: 3, unlocks: 'Calm Tide ambient mix', icon: 'Feather', color: '#10B981' },
      ],
      transit: [
        { title: 'Turbulence Tranquility', desc: 'A guided breathing sequence designed for moments of turbulence or travel anxiety.', duration: '8 min', rituals: 2, unlocks: 'Cloud Walk soundscape', icon: 'Cloud', color: '#F97316' },
        { title: 'Window Seat Meditation', desc: 'Transform the view outside into a mindfulness anchor, whether clouds or landscapes.', duration: '10 min', rituals: 3, unlocks: 'Sky Temple sanctuary item', icon: 'Mountain', color: '#0EA5E9' },
        { title: 'Body Scan at 30,000 ft', desc: 'Progressive relaxation tailored for cramped spaces and long journeys.', duration: '12 min', rituals: 4, unlocks: 'Silk Breeze ambient', icon: 'Activity', color: '#EC4899' },
      ],
      post: [
        { title: 'Arrival Grounding', desc: 'Connect with your new environment through a 5-senses awareness exercise.', duration: '8 min', rituals: 3, unlocks: 'Earth Pulse meditation', icon: 'MapPin', color: '#10B981' },
        { title: 'Jet Lag Recovery Flow', desc: 'Gentle movement and breathing exercises to help your body adjust to the new time zone.', duration: '20 min', rituals: 5, unlocks: 'Moonlit Garden soundscape', icon: 'Moon', color: '#6366F1' },
        { title: 'Trip Integration Journal', desc: 'Reflect on meaningful moments and insights from your travel experience.', duration: '15 min', rituals: 3, unlocks: 'Wisdom Tree sanctuary item', icon: 'BookOpen', color: '#F59E0B' },
      ],
    };

    return React.createElement('div', { style: { padding: '20px 16px 24px', animation: 'fadeIn 0.4s ease' } },
      React.createElement('h1', { style: { fontFamily: font, fontSize: 34, fontWeight: 800, color: t.text, margin: '0 0 4px', letterSpacing: -0.5 } }, 'Ritual Journeys'),
      React.createElement('p', { style: { fontFamily: font, fontSize: 15, color: t.textSecondary, margin: '0 0 20px' } }, 'Cultivate presence at every stage of travel'),

      // Journey type tabs
      React.createElement('div', { style: { display: 'flex', gap: 8, marginBottom: 22 } },
        ...journeyTypes.map(jt =>
          React.createElement('div', {
            key: jt.id,
            style: {
              flex: 1, padding: '10px 8px', borderRadius: 14, textAlign: 'center', cursor: 'pointer',
              background: activeJourney === jt.id ? t.primary : t.card,
              border: `1px solid ${activeJourney === jt.id ? t.primary : t.border}`,
              transition: 'all 0.2s ease',
              boxShadow: activeJourney === jt.id ? '0 4px 16px rgba(14,165,233,0.25)' : 'none'
            },
            onClick: () => setActiveJourney(jt.id)
          },
            React.createElement('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 } },
              React.createElement(Icon, { name: jt.icon, size: 20, color: activeJourney === jt.id ? '#fff' : t.textMuted }),
              React.createElement('span', { style: { fontFamily: font, fontSize: 13, fontWeight: 600, color: activeJourney === jt.id ? '#fff' : t.textSecondary } }, jt.label)
            )
          )
        )
      ),

      // Journey cards
      ...journeys[activeJourney].map((j, i) =>
        React.createElement('div', {
          key: j.title,
          style: {
            background: t.card, borderRadius: 20, padding: '18px', marginBottom: 14,
            border: `1px solid ${t.border}`, cursor: 'pointer',
            boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
            animation: `slideUp 0.35s ease ${i * 0.08}s both`,
            transition: 'transform 0.15s ease',
          },
          onMouseDown: (e) => e.currentTarget.style.transform = 'scale(0.98)',
          onMouseUp: (e) => e.currentTarget.style.transform = 'scale(1)',
          onMouseLeave: (e) => e.currentTarget.style.transform = 'scale(1)',
        },
          React.createElement('div', { style: { display: 'flex', alignItems: 'flex-start', gap: 14 } },
            React.createElement('div', {
              style: {
                width: 48, height: 48, borderRadius: 16, flexShrink: 0,
                background: `${j.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center'
              }
            }, React.createElement(Icon, { name: j.icon, size: 24, color: j.color })),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('h3', { style: { fontFamily: font, fontSize: 17, fontWeight: 700, color: t.text, margin: '0 0 4px' } }, j.title),
              React.createElement('p', { style: { fontFamily: font, fontSize: 14, color: t.textSecondary, margin: '0 0 12px', lineHeight: 1.45 } }, j.desc)
            )
          ),
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 } },
            React.createElement('div', { style: { display: 'flex', gap: 14 } },
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
                React.createElement(Icon, { name: 'Clock', size: 14, color: t.textMuted }),
                React.createElement('span', { style: { fontFamily: font, fontSize: 13, color: t.textMuted } }, j.duration)
              ),
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
                React.createElement(Icon, { name: 'Sparkles', size: 14, color: t.textMuted }),
                React.createElement('span', { style: { fontFamily: font, fontSize: 13, color: t.textMuted } }, `${j.rituals} rituals`)
              )
            ),
            React.createElement('div', {
              style: {
                padding: '6px 14px', borderRadius: 20,
                background: `${t.cta}15`, display: 'flex', alignItems: 'center', gap: 4
              }
            },
              React.createElement(Icon, { name: 'Lock', size: 12, color: t.cta }),
              React.createElement('span', { style: { fontFamily: font, fontSize: 12, fontWeight: 600, color: t.cta } }, 'Unlocks')
            )
          )
        )
      )
    );
  }

  // ===== SANCTUARY SCREEN =====
  function SanctuaryScreen() {
    const [activeSoundscape, setActiveSoundscape] = useState(null);
    const [playing, setPlaying] = useState(false);

    const sanctuaryItems = [
      { name: 'Lotus Pond', icon: 'Flower2', unlocked: true, color: '#EC4899' },
      { name: 'Zen Garden', icon: 'TreePine', unlocked: true, color: '#10B981' },
      { name: 'Crystal Cave', icon: 'Gem', unlocked: true, color: '#8B5CF6' },
      { name: 'Cloud Temple', icon: 'Cloud', unlocked: false, color: '#64748B' },
      { name: 'Moon Bridge', icon: 'Moon', unlocked: false, color: '#64748B' },
      { name: 'Star Pool', icon: 'Star', unlocked: false, color: '#64748B' },
    ];

    const soundscapes = [
      { name: 'Forest Rain', duration: '30 min', icon: 'CloudRain', unlocked: true },
      { name: 'Ocean Breeze', duration: '45 min', icon: 'Waves', unlocked: true },
      { name: 'Mountain Dawn', duration: '20 min', icon: 'Mountain', unlocked: true },
      { name: 'Night Garden', duration: '60 min', icon: 'Moon', unlocked: false },
    ];

    const meditations = [
      { name: 'Turbulence Calm', duration: '8 min', type: 'Guided', icon: 'Cloud' },
      { name: 'Jet Lag Reset', duration: '15 min', type: 'Body Scan', icon: 'RotateCcw' },
      { name: 'Grounding Arrival', duration: '10 min', type: 'Mindfulness', icon: 'MapPin' },
    ];

    return React.createElement('div', { style: { animation: 'fadeIn 0.4s ease' } },
      // Sanctuary visual header
      React.createElement('div', {
        style: {
          background: t.sanctuary, padding: '28px 16px 32px', position: 'relative', overflow: 'hidden'
        }
      },
        React.createElement('div', {
          style: {
            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
            width: 200, height: 200, borderRadius: 100, border: `2px solid rgba(255,255,255,0.1)`,
            animation: 'pulse 6s ease-in-out infinite'
          }
        }),
        React.createElement('div', {
          style: {
            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
            width: 140, height: 140, borderRadius: 70, border: `2px solid rgba(255,255,255,0.15)`,
            animation: 'pulse 6s ease-in-out infinite 1.5s'
          }
        }),
        React.createElement('h1', { style: { fontFamily: font, fontSize: 34, fontWeight: 800, color: '#fff', margin: '0 0 4px', letterSpacing: -0.5, position: 'relative', zIndex: 1 } }, 'My Sanctuary'),
        React.createElement('p', { style: { fontFamily: font, fontSize: 15, color: 'rgba(255,255,255,0.7)', margin: '0 0 20px', position: 'relative', zIndex: 1 } }, 'Your personal space of calm'),
        // Stats row
        React.createElement('div', { style: { display: 'flex', gap: 12, position: 'relative', zIndex: 1 } },
          ...[{ label: 'Rituals Done', value: '47' }, { label: 'Items Unlocked', value: '3/6' }, { label: 'Streak', value: '12 days' }].map(s =>
            React.createElement('div', {
              key: s.label,
              style: {
                flex: 1, padding: '12px 8px', borderRadius: 14,
                background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(10px)',
                textAlign: 'center'
              }
            },
              React.createElement('p', { style: { fontFamily: font, fontSize: 22, fontWeight: 700, color: '#fff', margin: 0 } }, s.value),
              React.createElement('p', { style: { fontFamily: font, fontSize: 11, color: 'rgba(255,255,255,0.6)', margin: '2px 0 0', fontWeight: 500 } }, s.label)
            )
          )
        )
      ),

      React.createElement('div', { style: { padding: '20px 16px 24px' } },
        // Tabs
        React.createElement('div', { style: { display: 'flex', gap: 0, marginBottom: 20, background: t.progressBg, borderRadius: 12, padding: 3 } },
          ...[{ id: 'space', label: 'Space', icon: 'Home' }, { id: 'sounds', label: 'Sounds', icon: 'Music' }, { id: 'meditations', label: 'Meditations', icon: 'Brain' }].map(tab =>
            React.createElement('div', {
              key: tab.id,
              style: {
                flex: 1, padding: '10px 6px', borderRadius: 10, textAlign: 'center', cursor: 'pointer',
                background: sanctuaryTab === tab.id ? t.card : 'transparent',
                boxShadow: sanctuaryTab === tab.id ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
                transition: 'all 0.2s ease', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5
              },
              onClick: () => setSanctuaryTab(tab.id)
            },
              React.createElement(Icon, { name: tab.icon, size: 15, color: sanctuaryTab === tab.id ? t.primary : t.textMuted }),
              React.createElement('span', { style: { fontFamily: font, fontSize: 13, fontWeight: 600, color: sanctuaryTab === tab.id ? t.primary : t.textMuted } }, tab.label)
            )
          )
        ),

        // Content based on tab
        sanctuaryTab === 'space' && React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 } },
          ...sanctuaryItems.map((item, i) =>
            React.createElement('div', {
              key: item.name,
              style: {
                background: t.card, borderRadius: 18, padding: '18px 10px', textAlign: 'center',
                border: `1px solid ${t.border}`, opacity: item.unlocked ? 1 : 0.5,
                animation: `slideUp 0.35s ease ${i * 0.06}s both`, cursor: 'pointer',
                transition: 'transform 0.15s ease',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
              },
              onMouseDown: (e) => item.unlocked && (e.currentTarget.style.transform = 'scale(0.95)'),
              onMouseUp: (e) => e.currentTarget.style.transform = 'scale(1)',
              onMouseLeave: (e) => e.currentTarget.style.transform = 'scale(1)',
            },
              React.createElement('div', {
                style: { width: 48, height: 48, borderRadius: 16, margin: '0 auto 10px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: `${item.color}15` }
              }, React.createElement(Icon, { name: item.unlocked ? item.icon : 'Lock', size: 24, color: item.color })),
              React.createElement('p', { style: { fontFamily: font, fontSize: 13, fontWeight: 600, color: t.text, margin: 0 } }, item.name),
              item.unlocked
                ? React.createElement('p', { style: { fontFamily: font, fontSize: 11, color: t.primary, margin: '4px 0 0', fontWeight: 500 } }, 'Placed')
                : React.createElement('p', { style: { fontFamily: font, fontSize: 11, color: t.textMuted, margin: '4px 0 0' } }, 'Locked')
            )
          )
        ),

        sanctuaryTab === 'sounds' && React.createElement('div', null,
          ...soundscapes.map((s, i) =>
            React.createElement('div', {
              key: s.name,
              style: {
                background: t.card, borderRadius: 16, padding: '14px 16px', marginBottom: 10,
                border: `1px solid ${activeSoundscape === s.name ? t.primary : t.border}`,
                display: 'flex', alignItems: 'center', gap: 14, cursor: s.unlocked ? 'pointer' : 'default',
                opacity: s.unlocked ? 1 : 0.5, animation: `slideUp 0.35s ease ${i * 0.08}s both`,
                boxShadow: activeSoundscape === s.name ? `0 0 0 2px ${t.primary}30` : '0 2px 8px rgba(0,0,0,0.04)',
                transition: 'all 0.2s ease'
              },
              onClick: () => { if (s.unlocked) { setActiveSoundscape(s.name); setPlaying(!playing); } }
            },
              React.createElement('div', {
                style: { width: 44, height: 44, borderRadius: 22, background: activeSoundscape === s.name ? t.primary : `${t.primary}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s ease' }
              }, React.createElement(Icon, { name: activeSoundscape === s.name && playing ? 'Pause' : 'Play', size: 20, color: activeSoundscape === s.name ? '#fff' : t.primary })),
              React.createElement('div', { style: { flex: 1 } },
                React.createElement('p', { style: { fontFamily: font, fontSize: 17, fontWeight: 600, color: t.text, margin: 0 } }, s.name),
                React.createElement('p', { style: { fontFamily: font, fontSize: 13, color: t.textMuted, margin: '2px 0 0' } }, s.duration)
              ),
              React.createElement(Icon, { name: s.icon, size: 20, color: t.textMuted })
            )
          )
        ),

        sanctuaryTab === 'meditations' && React.createElement('div', null,
          ...meditations.map((m, i) =>
            React.createElement('div', {
              key: m.name,
              style: {
                background: t.card, borderRadius: 16, padding: '16px', marginBottom: 10,
                border: `1px solid ${t.border}`, cursor: 'pointer',
                animation: `slideUp 0.35s ease ${i * 0.08}s both`,
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)', transition: 'transform 0.15s ease',
              },
              onMouseDown: (e) => e.currentTarget.style.transform = 'scale(0.98)',
              onMouseUp: (e) => e.currentTarget.style.transform = 'scale(1)',
              onMouseLeave: (e) => e.currentTarget.style.transform = 'scale(1)',
            },
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 14 } },
                React.createElement('div', { style: { width: 44, height: 44, borderRadius: 14, background: `${t.primary}12`, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
                  React.createElement(Icon, { name: m.icon, size: 22, color: t.primary })
                ),
                React.createElement('div', { style: { flex: 1 } },
                  React.createElement('p', { style: { fontFamily: font, fontSize: 17, fontWeight: 600, color: t.text, margin: 0 } }, m.name),
                  React.createElement('div', { style: { display: 'flex', gap: 10, marginTop: 4 } },
                    React.createElement('span', { style: { fontFamily: font, fontSize: 13, color: t.textMuted } }, m.duration),
                    React.createElement('span', { style: { fontFamily: font, fontSize: 13, color: t.primary, fontWeight: 500 } }, m.type)
                  )
                ),
                React.createElement(Icon, { name: 'Play', size: 20, color: t.cta })
              )
            )
          )
        )
      )
    );
  }

  // ===== COMPASS SCREEN =====
  function CompassScreen() {
    const [havenLevel, setHavenLevel] = useState(67);

    const quests = [
      { title: 'Sunrise Synchrony', desc: 'All members complete a morning grounding ritual within the same 24 hours.', members: '12/16', progress: 75, reward: 'Golden Dawn Spire', icon: 'Sunrise', color: '#F97316' },
      { title: 'Ocean of Calm', desc: 'Collectively accumulate 100 minutes of ocean soundscape listening.', members: '16/16', progress: 92, reward: 'Tidal Harmony Fountain', icon: 'Waves', color: '#0EA5E9' },
      { title: 'Mountain Meditation', desc: 'Complete 50 guided meditations as a guild. Currently: 34/50.', members: '9/16', progress: 68, reward: 'Summit Peace Pagoda', icon: 'Mountain', color: '#8B5CF6' },
    ];

    const guildMembers = [
      { name: 'Sarah K.', rituals: 82, streak: 15, role: 'Guide' },
      { name: 'Marcus L.', rituals: 64, streak: 12, role: 'Explorer' },
      { name: 'Aria T.', rituals: 91, streak: 21, role: 'Sage' },
      { name: 'James W.', rituals: 45, streak: 8, role: 'Seeker' },
    ];

    return React.createElement('div', { style: { animation: 'fadeIn 0.4s ease' } },
      // Haven header
      React.createElement('div', {
        style: { background: t.havenGrad, padding: '28px 16px 28px', position: 'relative', overflow: 'hidden' }
      },
        React.createElement('div', { style: { position: 'absolute', inset: 0, background: 'radial-gradient(circle at 70% 30%, rgba(255,255,255,0.08) 0%, transparent 60%)' } }),
        // Floating orbs
        ...[0,1,2].map(i =>
          React.createElement('div', {
            key: i,
            style: {
              position: 'absolute', width: [30,22,18][i], height: [30,22,18][i], borderRadius: '50%',
              background: 'rgba(255,255,255,0.1)',
              top: [20,60,40][i] + '%', left: [75,20,55][i] + '%',
              animation: `float 4s ease-in-out infinite ${i * 1.2}s`
            }
          })
        ),
        React.createElement('div', { style: { position: 'relative', zIndex: 1 } },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 } },
            React.createElement(Icon, { name: 'Compass', size: 20, color: '#fff' }),
            React.createElement('span', { style: { fontFamily: font, fontSize: 13, color: 'rgba(255,255,255,0.7)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 } }, 'Collective Compass')
          ),
          React.createElement('h1', { style: { fontFamily: font, fontSize: 34, fontWeight: 800, color: '#fff', margin: '0 0 2px', letterSpacing: -0.5 } }, 'Wandering Lotus'),
          React.createElement('p', { style: { fontFamily: font, fontSize: 15, color: 'rgba(255,255,255,0.7)', margin: '0 0 18px' } }, '16 travelers on a shared path'),
          // Haven progress
          React.createElement('div', { style: { background: 'rgba(255,255,255,0.15)', borderRadius: 8, height: 8, overflow: 'hidden', marginBottom: 6 } },
            React.createElement('div', { style: { height: '100%', width: `${havenLevel}%`, background: '#fff', borderRadius: 8, transition: 'width 1s ease', animation: 'shimmer 2s ease infinite' } })
          ),
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between' } },
            React.createElement('span', { style: { fontFamily: font, fontSize: 12, color: 'rgba(255,255,255,0.6)' } }, 'World Haven Level 7'),
            React.createElement('span', { style: { fontFamily: font, fontSize: 12, color: 'rgba(255,255,255,0.6)' } }, `${havenLevel}%`)
          )
        )
      ),

      React.createElement('div', { style: { padding: '16px 16px 24px' } },
        // Tabs
        React.createElement('div', { style: { display: 'flex', gap: 0, marginBottom: 18, background: t.progressBg, borderRadius: 12, padding: 3 } },
          ...[{ id: 'quests', label: 'Shared Quests', icon: 'Target' }, { id: 'members', label: 'Members', icon: 'Users' }].map(tab =>
            React.createElement('div', {
              key: tab.id,
              style: {
                flex: 1, padding: '10px 8px', borderRadius: 10, textAlign: 'center', cursor: 'pointer',
                background: guildTab === tab.id ? t.card : 'transparent',
                boxShadow: guildTab === tab.id ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
                transition: 'all 0.2s ease', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6
              },
              onClick: () => setGuildTab(tab.id)
            },
              React.createElement(Icon, { name: tab.icon, size: 15, color: guildTab === tab.id ? t.primary : t.textMuted }),
              React.createElement('span', { style: { fontFamily: font, fontSize: 14, fontWeight: 600, color: guildTab === tab.id ? t.primary : t.textMuted } }, tab.label)
            )
          )
        ),

        guildTab === 'quests' && React.createElement('div', null,
          ...quests.map((q, i) =>
            React.createElement('div', {
              key: q.title,
              style: {
                background: t.card, borderRadius: 20, padding: '18px', marginBottom: 14,
                border: `1px solid ${t.border}`, animation: `slideUp 0.35s ease ${i * 0.08}s both`,
                boxShadow: '0 2px 12px rgba(0,0,0,0.04)'
              }
            },
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 } },
                React.createElement('div', { style: { width: 44, height: 44, borderRadius: 14, background: `${q.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
                  React.createElement(Icon, { name: q.icon, size: 22, color: q.color })
                ),
                React.createElement('div', { style: { flex: 1 } },
                  React.createElement('h3', { style: { fontFamily: font, fontSize: 17, fontWeight: 700, color: t.text, margin: 0 } }, q.title),
                  React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6, marginTop: 3 } },
                    React.createElement(Icon, { name: 'Users', size: 12, color: t.textMuted }),
                    React.createElement('span', { style: { fontFamily: font, fontSize: 13, color: t.textMuted } }, q.members + ' participating')
                  )
                )
              ),
              React.createElement('p', { style: { fontFamily: font, fontSize: 14, color: t.textSecondary, margin: '0 0 12px', lineHeight: 1.45 } }, q.desc),
              React.createElement('div', { style: { height: 6, borderRadius: 3, background: t.progressBg, overflow: 'hidden', marginBottom: 8 } },
                React.createElement('div', { style: { height: '100%', width: `${q.progress}%`, borderRadius: 3, background: q.progress > 85 ? '#10B981' : q.color, transition: 'width 0.6s ease' } })
              ),
              React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
                React.createElement('span', { style: { fontFamily: font, fontSize: 13, fontWeight: 600, color: q.progress > 85 ? '#10B981' : t.textMuted } }, q.progress + '% complete'),
                React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
                  React.createElement(Icon, { name: 'Gift', size: 14, color: t.cta }),
                  React.createElement('span', { style: { fontFamily: font, fontSize: 12, color: t.cta, fontWeight: 500 } }, q.reward)
                )
              )
            )
          )
        ),

        guildTab === 'members' && React.createElement('div', null,
          ...guildMembers.map((m, i) =>
            React.createElement('div', {
              key: m.name,
              style: {
                background: t.card, borderRadius: 16, padding: '14px 16px', marginBottom: 10,
                border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', gap: 14,
                animation: `slideUp 0.35s ease ${i * 0.08}s both`,
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
              }
            },
              React.createElement('div', {
                style: {
                  width: 44, height: 44, borderRadius: 22,
                  background: ['#0EA5E9', '#F97316', '#8B5CF6', '#10B981'][i],
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: font, fontSize: 18, fontWeight: 700, color: '#fff'
                }
              }, m.name.charAt(0)),
              React.createElement('div', { style: { flex: 1 } },
                React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8 } },
                  React.createElement('span', { style: { fontFamily: font, fontSize: 17, fontWeight: 600, color: t.text } }, m.name),
                  React.createElement('span', { style: { fontFamily: font, fontSize: 11, fontWeight: 600, color: t.primary, background: `${t.primary}15`, padding: '2px 8px', borderRadius: 6 } }, m.role)
                ),
                React.createElement('div', { style: { display: 'flex', gap: 12, marginTop: 4 } },
                  React.createElement('span', { style: { fontFamily: font, fontSize: 13, color: t.textMuted } }, `${m.rituals} rituals`),
                  React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 3 } },
                    React.createElement(Icon, { name: 'Flame', size: 12, color: t.cta }),
                    React.createElement('span', { style: { fontFamily: font, fontSize: 13, color: t.cta, fontWeight: 500 } }, `${m.streak} day streak`)
                  )
                )
              )
            )
          )
        )
      )
    );
  }

  // ===== JOURNAL SCREEN =====
  function JournalScreen() {
    const entries = [
      { date: 'Today', title: 'Morning at Kyoto Temple', text: 'Found unexpected peace in the simplicity of the rock garden. The act of sitting still, just observing the raked patterns, felt like a ritual in itself. I noticed my breathing slow naturally.', mood: 'Calm', tags: ['Grounding', 'Reflection'], icon: 'Flower2' },
      { date: 'Yesterday', title: 'Train Journey Through Alps', text: 'Used the Window Seat Meditation during the mountain pass. The snow-capped peaks became my anchor point. Each tunnel felt like a natural breathing pause. Grateful for the toolkit.', mood: 'Peaceful', tags: ['Transit', 'Meditation'], icon: 'Mountain' },
      { date: 'Apr 5', title: 'Packing with Intention', text: 'Spent 20 minutes mindfully choosing what to bring. Each item had a purpose. Left behind three things I would have stress-packed before. Feeling lighter already.', mood: 'Focused', tags: ['Pre-Trip', 'Ritual'], icon: 'Package' },
      { date: 'Apr 3', title: 'Arrival in Osaka', text: 'The Arrival Grounding exercise transformed my first hour. Instead of rushing to the hotel, I sat in a park and did the 5 senses check-in. Heard birds I would have missed.', mood: 'Grateful', tags: ['Grounding', 'Arrival'], icon: 'MapPin' },
    ];

    const prompts = [
      'What moment of stillness did you find today?',
      'How did your body feel during travel?',
      'What sensory detail stood out most?',
    ];

    return React.createElement('div', { style: { padding: '20px 16px 24px', animation: 'fadeIn 0.4s ease' } },
      React.createElement('h1', { style: { fontFamily: font, fontSize: 34, fontWeight: 800, color: t.text, margin: '0 0 4px', letterSpacing: -0.5 } }, 'Journey Log'),
      React.createElement('p', { style: { fontFamily: font, fontSize: 15, color: t.textSecondary, margin: '0 0 20px' } }, 'Your reflections and insights'),

      // Prompt card
      React.createElement('div', {
        style: {
          background: `linear-gradient(135deg, ${t.primary}15, ${t.cta}10)`,
          borderRadius: 18, padding: '16px 18px', marginBottom: 20,
          border: `1px solid ${t.border}`, animation: 'slideUp 0.35s ease both'
        }
      },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 } },
          React.createElement(Icon, { name: 'Sparkles', size: 16, color: t.cta }),
          React.createElement('span', { style: { fontFamily: font, fontSize: 13, fontWeight: 600, color: t.cta, textTransform: 'uppercase', letterSpacing: 0.5 } }, 'Reflection Prompt')
        ),
        React.createElement('p', { style: { fontFamily: font, fontSize: 17, fontWeight: 600, color: t.text, margin: '0 0 12px', lineHeight: 1.4 } }, prompts[0]),
        React.createElement('div', {
          style: {
            background: t.card, borderRadius: 12, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer',
            border: `1px solid ${t.border}`
          }
        },
          React.createElement(Icon, { name: 'PenLine', size: 16, color: t.textMuted }),
          React.createElement('span', { style: { fontFamily: font, fontSize: 15, color: t.textMuted } }, 'Start writing...')
        )
      ),

      // Journal entries
      ...entries.map((entry, i) =>
        React.createElement('div', {
          key: entry.title,
          style: {
            background: t.card, borderRadius: 18, padding: '16px 18px', marginBottom: 12,
            border: `1px solid ${t.border}`, cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            animation: `slideUp 0.35s ease ${(i + 1) * 0.08}s both`,
            transition: 'transform 0.15s ease',
          },
          onClick: () => setJournalExpanded(journalExpanded === i ? null : i),
          onMouseDown: (e) => e.currentTarget.style.transform = 'scale(0.98)',
          onMouseUp: (e) => e.currentTarget.style.transform = 'scale(1)',
          onMouseLeave: (e) => e.currentTarget.style.transform = 'scale(1)',
        },
          React.createElement('div', { style: { display: 'flex', alignItems: 'flex-start', gap: 12 } },
            React.createElement('div', { style: { width: 40, height: 40, borderRadius: 12, background: `${t.primary}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 } },
              React.createElement(Icon, { name: entry.icon, size: 20, color: t.primary })
            ),
            React.createElement('div', { style: { flex: 1, minWidth: 0 } },
              React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 } },
                React.createElement('span', { style: { fontFamily: font, fontSize: 13, color: t.textMuted } }, entry.date),
                React.createElement('span', { style: { fontFamily: font, fontSize: 12, fontWeight: 500, color: t.primary, background: `${t.primary}12`, padding: '2px 10px', borderRadius: 8 } }, entry.mood)
              ),
              React.createElement('h3', { style: { fontFamily: font, fontSize: 17, fontWeight: 700, color: t.text, margin: '0 0 4px' } }, entry.title),
              React.createElement('p', {
                style: {
                  fontFamily: font, fontSize: 14, color: t.textSecondary, margin: 0, lineHeight: 1.5,
                  overflow: 'hidden',
                  maxHeight: journalExpanded === i ? 200 : 42,
                  transition: 'max-height 0.3s ease'
                }
              }, entry.text),
              React.createElement('div', { style: { display: 'flex', gap: 6, marginTop: 10, flexWrap: 'wrap' } },
                ...entry.tags.map(tag =>
                  React.createElement('span', { key: tag, style: { fontFamily: font, fontSize: 12, color: t.textMuted, background: t.cardAlt, padding: '3px 10px', borderRadius: 8, fontWeight: 500 } }, tag)
                )
              )
            )
          )
        )
      )
    );
  }

  // ===== SCREEN MAP =====
  const screens = {
    home: HomeScreen,
    journeys: JourneysScreen,
    sanctuary: SanctuaryScreen,
    compass: CompassScreen,
    journal: JournalScreen,
  };

  const navItems = [
    { id: 'home', label: 'Home', icon: 'Home' },
    { id: 'journeys', label: 'Journeys', icon: 'Route' },
    { id: 'sanctuary', label: 'Sanctuary', icon: 'Flower2' },
    { id: 'compass', label: 'Compass', icon: 'Compass' },
    { id: 'journal', label: 'Journal', icon: 'BookOpen' },
  ];

  const ActiveScreen = screens[activeScreen];

  return React.createElement('div', {
    style: { minHeight: '100vh', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px 0', fontFamily: font }
  },
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
        0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
        50% { transform: translate(-50%, -50%) scale(1.15); opacity: 0.8; }
      }
      @keyframes shimmer {
        0% { opacity: 0.8; }
        50% { opacity: 1; }
        100% { opacity: 0.8; }
      }
      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-12px); }
      }
      * { -webkit-tap-highlight-color: transparent; }
      ::-webkit-scrollbar { display: none; }
    `),

    // Phone frame
    React.createElement('div', {
      style: {
        width: 375, height: 812, borderRadius: 44, overflow: 'hidden',
        background: t.bg, position: 'relative',
        boxShadow: '0 25px 80px rgba(0,0,0,0.2), 0 4px 20px rgba(0,0,0,0.1)',
        display: 'flex', flexDirection: 'column',
        transition: 'background 0.3s ease',
      }
    },
      // Scrollable content area
      React.createElement('div', {
        key: animKey,
        style: {
          flex: 1, overflowY: 'auto', overflowX: 'hidden',
          paddingTop: 8, paddingBottom: 0,
          WebkitOverflowScrolling: 'touch',
        }
      },
        React.createElement(ActiveScreen)
      ),

      // Bottom navigation
      React.createElement('div', {
        style: {
          background: t.navBg, borderTop: `1px solid ${t.navBorder}`,
          padding: '6px 8px 28px', display: 'flex', justifyContent: 'space-around',
          position: 'relative', zIndex: 10, flexShrink: 0,
          transition: 'background 0.3s ease',
        }
      },
        ...navItems.map(item =>
          React.createElement('div', {
            key: item.id,
            style: {
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
              padding: '6px 8px', cursor: 'pointer', borderRadius: 12,
              minWidth: 56, minHeight: 44,
              transition: 'transform 0.15s ease',
              transform: pressedTab === item.id ? 'scale(0.9)' : 'scale(1)',
            },
            onClick: () => switchScreen(item.id),
            onMouseDown: () => setPressedTab(item.id),
            onMouseUp: () => setPressedTab(null),
            onMouseLeave: () => setPressedTab(null),
          },
            React.createElement(Icon, {
              name: item.icon, size: 24,
              color: activeScreen === item.id ? t.primary : t.textMuted
            }),
            React.createElement('span', {
              style: {
                fontFamily: font, fontSize: 10, fontWeight: activeScreen === item.id ? 600 : 500,
                color: activeScreen === item.id ? t.primary : t.textMuted,
                transition: 'color 0.2s ease'
              }
            }, item.label)
          )
        )
      )
    )
  );
}
