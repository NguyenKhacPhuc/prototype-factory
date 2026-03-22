
const { useState, useEffect, useRef } = React;

const themes = {
  dark: {
    bg: '#0C0F1A',
    surface: '#141827',
    surfaceAlt: '#1C2235',
    card: '#1E2540',
    border: '#2A3150',
    text: '#F0F4FF',
    textSub: '#8A93B4',
    textMuted: '#4A5270',
    primary: '#7C6EFA',
    primaryLight: '#9B8FFB',
    primaryGlow: 'rgba(124,110,250,0.2)',
    accent: '#4ECDC4',
    accentLight: '#6ED8D1',
    accentGlow: 'rgba(78,205,196,0.2)',
    warm: '#FF8C69',
    warmGlow: 'rgba(255,140,105,0.2)',
    success: '#4ADE80',
    successGlow: 'rgba(74,222,128,0.15)',
    navBg: '#0F1220',
    statusBar: '#0C0F1A',
    gradient1: 'linear-gradient(135deg, #7C6EFA 0%, #4ECDC4 100%)',
    gradient2: 'linear-gradient(135deg, #1E2540 0%, #141827 100%)',
    gradient3: 'linear-gradient(135deg, #FF8C69 0%, #7C6EFA 100%)',
    shadow: '0 8px 32px rgba(0,0,0,0.4)',
    cardShadow: '0 4px 16px rgba(0,0,0,0.3)',
  },
  light: {
    bg: '#F5F0FF',
    surface: '#FFFFFF',
    surfaceAlt: '#F0ECFF',
    card: '#FFFFFF',
    border: '#E8E2FF',
    text: '#1A1530',
    textSub: '#6B5FA6',
    textMuted: '#A89FCC',
    primary: '#7C6EFA',
    primaryLight: '#9B8FFB',
    primaryGlow: 'rgba(124,110,250,0.15)',
    accent: '#3BBDB5',
    accentLight: '#4ECDC4',
    accentGlow: 'rgba(59,189,181,0.15)',
    warm: '#FF7A52',
    warmGlow: 'rgba(255,122,82,0.15)',
    success: '#22C55E',
    successGlow: 'rgba(34,197,94,0.15)',
    navBg: '#FFFFFF',
    statusBar: '#F5F0FF',
    gradient1: 'linear-gradient(135deg, #7C6EFA 0%, #4ECDC4 100%)',
    gradient2: 'linear-gradient(135deg, #F0ECFF 0%, #FFFFFF 100%)',
    gradient3: 'linear-gradient(135deg, #FF8C69 0%, #7C6EFA 100%)',
    shadow: '0 8px 32px rgba(100,80,200,0.12)',
    cardShadow: '0 4px 16px rgba(100,80,200,0.08)',
  }
};

function App() {
  const [isDark, setIsDark] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const [currentMood, setCurrentMood] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState('living');
  const [activeRoutine, setActiveRoutine] = useState(null);
  const [routineStep, setRoutineStep] = useState(0);
  const [pressedBtn, setPressedBtn] = useState(null);

  const t = isDark ? themes.dark : themes.light;

  const fontStyle = `
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    ::-webkit-scrollbar { display: none; }
    body { background: #1a1a2e; }
  `;

  const moods = [
    { id: 'drained', label: 'Drained', emoji: '😮‍💨', color: '#6B7FD4' },
    { id: 'scattered', label: 'Scattered', emoji: '🌀', color: '#C084FC' },
    { id: 'anxious', label: 'Anxious', emoji: '😰', color: '#FB923C' },
    { id: 'calm', label: 'Calm', emoji: '😌', color: '#4ECDC4' },
    { id: 'focused', label: 'Focused', emoji: '🎯', color: '#7C6EFA' },
    { id: 'tired', label: 'Tired', emoji: '😴', color: '#94A3B8' },
  ];

  const rooms = [
    { id: 'living', label: 'Living Room', icon: '🛋️' },
    { id: 'bedroom', label: 'Bedroom', icon: '🛏️' },
    { id: 'kitchen', label: 'Kitchen', icon: '🍳' },
    { id: 'office', label: 'Office', icon: '💻' },
  ];

  const routinesList = [
    {
      id: 'landing',
      title: 'Landing Ritual',
      subtitle: 'After work decompression',
      duration: '5 min',
      icon: '🏠',
      color: '#7C6EFA',
      tags: ['Evening', 'Decompression'],
      steps: [
        { action: 'Drop your bag at the door', detail: 'Designate a specific spot — this signals "work is over"', icon: '🎒' },
        { action: 'Change clothes immediately', detail: 'Physical transition helps mental transition', icon: '👕' },
        { action: 'Dim lights to 40%', detail: 'Warm, low light tells your nervous system to slow down', icon: '💡' },
        { action: 'Play ambient soundscape', detail: 'Try rain sounds or lo-fi for 5 minutes of silence', icon: '🎵' },
        { action: 'One cold glass of water', detail: 'Hydrate and ground yourself in the present', icon: '💧' },
      ]
    },
    {
      id: 'focus',
      title: 'Focus 25',
      subtitle: 'Deep work setup',
      duration: '3 min setup',
      icon: '🎯',
      color: '#4ECDC4',
      tags: ['Daytime', 'Work'],
      steps: [
        { action: 'Clear your immediate surface', detail: 'Remove everything except what you need right now', icon: '🗂️' },
        { action: 'Set bright cool-white light', detail: 'Blue-tinted light boosts alertness and focus', icon: '💡' },
        { action: 'Put phone face-down', detail: 'Out of sight reduces temptation by 40%', icon: '📵' },
        { action: 'Play binaural focus sounds', detail: '40Hz gamma waves support concentration', icon: '🎧' },
        { action: 'Set 25-min timer', detail: 'Commit to one task for one Pomodoro interval', icon: '⏱️' },
      ]
    },
    {
      id: 'winddown',
      title: 'Evening Wind-Down',
      subtitle: 'Prepare body for sleep',
      duration: '10 min',
      icon: '🌙',
      color: '#6B7FD4',
      tags: ['Night', 'Sleep'],
      steps: [
        { action: 'Tidy one surface only', detail: 'A cluttered room at bedtime increases cortisol', icon: '✨' },
        { action: 'Switch to warm amber lighting', detail: 'Cool light suppresses melatonin — go warm after 8pm', icon: '🕯️' },
        { action: 'Lower room temperature 2°', detail: 'Core temperature drop signals sleep readiness', icon: '🌡️' },
        { action: 'Diffuse lavender or chamomile', detail: 'Scent triggers are powerful sleep anchors', icon: '🌿' },
        { action: 'Screen-free for 20 minutes', detail: 'Read, stretch, or simply breathe', icon: '📖' },
      ]
    },
    {
      id: 'guests',
      title: 'Reset After Guests',
      subtitle: 'Reclaim your space',
      duration: '8 min',
      icon: '🧹',
      color: '#FF8C69',
      tags: ['Social Recovery', 'Reset'],
      steps: [
        { action: 'Open a window for 5 min', detail: 'Fresh air and scent reset work together', icon: '🪟' },
        { action: 'Return furniture to original positions', detail: 'Physical order restores psychological order', icon: '🛋️' },
        { action: 'Quick surface wipe of main areas', detail: 'Kitchen counter, coffee table, bathroom sink', icon: '🧽' },
        { action: 'Silence for 10 minutes', detail: 'After social stimulation, quiet is restorative', icon: '🤫' },
      ]
    },
    {
      id: 'sunday',
      title: 'Sleepy Sunday',
      subtitle: 'Gentle slow-day mode',
      duration: 'All day',
      icon: '☁️',
      color: '#94A3B8',
      tags: ['Weekend', 'Restoration'],
      steps: [
        { action: 'No alarm — let light wake you', detail: 'Sunday recovery starts with natural rhythms', icon: '☀️' },
        { action: 'Keep curtains half-open', detail: 'Soft daylight without harsh brightness', icon: '🪟' },
        { action: 'Slow music or nature sounds', detail: 'Match the energy you want to feel', icon: '🎼' },
        { action: 'Cook something warm', detail: 'The act of cooking is grounding and sensory', icon: '🍲' },
        { action: 'One intentional rest spot', detail: 'Choose your "nest" for the day and stay there', icon: '🛋️' },
      ]
    },
  ];

  const journalData = [
    { date: 'Today', time: '8:32 PM', mood: 'calm', emoji: '😌', action: 'Used Evening Wind-Down', impact: '+2' },
    { date: 'Today', time: '2:15 PM', mood: 'focused', emoji: '🎯', action: 'Focus 25 in office', impact: '+3' },
    { date: 'Yesterday', time: '6:45 PM', mood: 'drained', emoji: '😮‍💨', action: 'Landing Ritual', impact: '+2' },
    { date: 'Yesterday', time: '10:00 AM', mood: 'scattered', emoji: '🌀', action: 'Cleared desk, opened window', impact: '+1' },
    { date: 'Mon', time: '9:15 PM', mood: 'anxious', emoji: '😰', action: 'Lavender + dim lights', impact: '+3' },
    { date: 'Mon', time: '3:30 PM', mood: 'focused', emoji: '🎯', action: 'Focus 25 + cold brew', impact: '+2' },
  ];

  const weekMoods = [
    { day: 'M', score: 6 },
    { day: 'T', score: 4 },
    { day: 'W', score: 7 },
    { day: 'T', score: 5 },
    { day: 'F', score: 8 },
    { day: 'S', score: 9 },
    { day: 'S', score: 7 },
  ];

  const roomSuggestions = {
    living: [
      { icon: '💡', title: 'Warm lighting', detail: 'Dim to 35%, switch to amber bulb', tag: 'Lighting' },
      { icon: '🎵', title: 'Lo-fi soundscape', detail: 'Plays soft background focus music', tag: 'Sound' },
      { icon: '🪟', title: 'Ventilate 5 min', detail: 'Open east-facing window briefly', tag: 'Air' },
      { icon: '🌿', title: 'Move plant to sill', detail: 'Green in peripheral view lowers stress', tag: 'Visual' },
    ],
    bedroom: [
      { icon: '🌡️', title: 'Cool room 2°', detail: 'Ideal sleep temp: 65–68°F (18–20°C)', tag: 'Temperature' },
      { icon: '🕯️', title: 'Amber nightlight', detail: 'Avoid all blue light after 9 PM', tag: 'Lighting' },
      { icon: '🌿', title: 'Lavender mist', detail: 'Spray pillow 20 min before bed', tag: 'Scent' },
      { icon: '📵', title: 'Charge phone outside', detail: 'Keep bedroom a screen-free zone', tag: 'Digital' },
    ],
    kitchen: [
      { icon: '💡', title: 'Bright task lighting', detail: 'Full brightness over prep area only', tag: 'Lighting' },
      { icon: '🎵', title: 'Upbeat playlist', detail: 'Cooking with music increases enjoyment', tag: 'Sound' },
      { icon: '🧽', title: 'Clear one counter', detail: 'Cook more easily with visual space', tag: 'Clutter' },
      { icon: '🪟', title: 'Ventilate while cooking', detail: 'Remove cooking odors, add fresh air', tag: 'Air' },
    ],
    office: [
      { icon: '💡', title: 'Cool white 5000K', detail: 'Blue-white light boosts alertness', tag: 'Lighting' },
      { icon: '🎧', title: 'White noise / binaural', detail: '40Hz focus frequencies recommended', tag: 'Sound' },
      { icon: '🗂️', title: 'Clear desk surface', detail: 'Keep only active task materials out', tag: 'Clutter' },
      { icon: '🌿', title: 'Snake plant nearby', detail: 'Air-purifying + improves focus visually', tag: 'Plant' },
    ],
  };

  const getTimeGreeting = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 17) return 'Good afternoon';
    if (h < 21) return 'Good evening';
    return 'Good night';
  };

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  };

  const handlePress = (id) => {
    setPressedBtn(id);
    setTimeout(() => setPressedBtn(null), 200);
  };

  // ─── Shared UI Components ────────────────────────────────────────────────

  const StatusBar = () =>
    React.createElement('div', {
      style: {
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '12px 20px 4px', background: t.bg, position: 'relative', zIndex: 10,
      }
    },
      React.createElement('span', { style: { fontSize: 13, fontWeight: 700, color: t.text, fontFamily: 'Plus Jakarta Sans' } }, getCurrentTime()),
      React.createElement('div', {
        style: {
          width: 120, height: 30, background: '#000', borderRadius: 20,
          position: 'absolute', left: '50%', transform: 'translateX(-50%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
        }
      },
        React.createElement('div', { style: { width: 10, height: 10, borderRadius: '50%', background: '#1a1a1a' } }),
        React.createElement('div', { style: { width: 28, height: 10, borderRadius: 5, background: '#1a1a1a' } })
      ),
      React.createElement('div', { style: { display: 'flex', gap: 5, alignItems: 'center' } },
        React.createElement('div', { style: { display: 'flex', gap: 2 } },
          [1,1,1,0.3].map((op, i) =>
            React.createElement('div', { key: i, style: { width: 3, height: 6 + i * 2, background: t.text, opacity: op, borderRadius: 1 } })
          )
        ),
        React.createElement('div', { style: { display: 'flex', gap: 1, alignItems: 'center' } },
          React.createElement('div', { style: { width: 20, height: 11, border: `1.5px solid ${t.textSub}`, borderRadius: 3, display: 'flex', alignItems: 'center', padding: '1px 1.5px', gap: 0 } },
            React.createElement('div', { style: { width: '75%', height: '100%', background: t.success, borderRadius: 1 } })
          )
        )
      )
    );

  const BottomNav = () => {
    const tabs = [
      { id: 'home', label: 'Home', icon: window.lucide.Home },
      { id: 'nest', label: 'Nest', icon: window.lucide.Layers },
      { id: 'routines', label: 'Routines', icon: window.lucide.Sparkles },
      { id: 'journal', label: 'Journal', icon: window.lucide.BookOpen },
      { id: 'settings', label: 'Settings', icon: window.lucide.Settings2 },
    ];

    return React.createElement('div', {
      style: {
        display: 'flex', background: t.navBg, borderTop: `1px solid ${t.border}`,
        padding: '8px 0 20px', position: 'absolute', bottom: 0, left: 0, right: 0,
        backdropFilter: 'blur(20px)',
      }
    },
      tabs.map(tab => {
        const isActive = activeTab === tab.id;
        return React.createElement('div', {
          key: tab.id,
          onClick: () => setActiveTab(tab.id),
          style: {
            flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
            gap: 3, cursor: 'pointer', padding: '4px 0', transition: 'all 0.2s',
          }
        },
          React.createElement('div', {
            style: {
              width: 36, height: 36, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: isActive ? t.primaryGlow : 'transparent',
              transition: 'all 0.2s',
            }
          },
            React.createElement(tab.icon, {
              size: 20,
              color: isActive ? t.primary : t.textMuted,
              strokeWidth: isActive ? 2.5 : 1.8,
            })
          ),
          React.createElement('span', {
            style: {
              fontSize: 10, fontWeight: isActive ? 700 : 500,
              color: isActive ? t.primary : t.textMuted,
              fontFamily: 'Plus Jakarta Sans', transition: 'all 0.2s',
            }
          }, tab.label)
        );
      })
    );
  };

  // ─── Home Screen ─────────────────────────────────────────────────────────

  const HomeScreen = () => {
    const selectedMood = moods.find(m => m.id === currentMood);
    const quickSuggestions = currentMood ? {
      drained: [
        { icon: '💡', text: 'Dim lights in living room to 30%' },
        { icon: '🎵', text: 'Play rain ambient for 10 minutes' },
        { icon: '💧', text: 'Drink a glass of cold water now' },
      ],
      scattered: [
        { icon: '🗂️', text: 'Clear one surface, any surface' },
        { icon: '🪟', text: 'Open a window for fresh air' },
        { icon: '📵', text: 'Phone face-down for 15 min' },
      ],
      anxious: [
        { icon: '🌿', text: 'Diffuse lavender or eucalyptus' },
        { icon: '💡', text: 'Switch to warm amber lighting' },
        { icon: '🎵', text: '4-7-8 breathing with soft music' },
      ],
      calm: [
        { icon: '📖', text: 'This is your peak reading window' },
        { icon: '🌿', text: 'Water your plants mindfully' },
        { icon: '✍️', text: 'Write 3 things you noticed today' },
      ],
      focused: [
        { icon: '💡', text: 'Set cool white light in office' },
        { icon: '🎧', text: 'Play binaural 40Hz focus sounds' },
        { icon: '⏱️', text: 'Start a Focus 25 session now' },
      ],
      tired: [
        { icon: '🕯️', text: 'Amber light only, no overhead' },
        { icon: '🌡️', text: 'Lower bedroom temp by 2 degrees' },
        { icon: '🌿', text: 'Lavender mist on your pillow' },
      ],
    }[currentMood] : [];

    return React.createElement('div', {
      style: { flex: 1, overflowY: 'auto', padding: '8px 0 80px', background: t.bg }
    },
      // Header
      React.createElement('div', { style: { padding: '8px 20px 16px' } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' } },
          React.createElement('div', {},
            React.createElement('p', { style: { fontSize: 13, color: t.textSub, fontFamily: 'Plus Jakarta Sans', marginBottom: 2 } }, getTimeGreeting()),
            React.createElement('h1', { style: { fontSize: 24, fontWeight: 800, color: t.text, fontFamily: 'Plus Jakarta Sans', lineHeight: 1.1 } }, 'How\'s your\nhome feeling?')
          ),
          React.createElement('div', {
            style: {
              width: 44, height: 44, borderRadius: 14, background: t.primaryGlow,
              border: `1.5px solid ${t.primary}`, display: 'flex', alignItems: 'center', justifyContent: 'center',
            }
          },
            React.createElement('span', { style: { fontSize: 20 } }, '🏠')
          )
        )
      ),

      // Mood Check-in
      React.createElement('div', { style: { padding: '0 20px 16px' } },
        React.createElement('div', {
          style: {
            background: t.card, borderRadius: 20, padding: '16px', border: `1px solid ${t.border}`,
            boxShadow: t.cardShadow,
          }
        },
          React.createElement('p', { style: { fontSize: 12, fontWeight: 700, color: t.textSub, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12, fontFamily: 'Plus Jakarta Sans' } }, 'Mood Check-in'),
          React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 } },
            moods.map(mood =>
              React.createElement('button', {
                key: mood.id,
                onClick: () => { setCurrentMood(mood.id); handlePress(mood.id); },
                style: {
                  background: currentMood === mood.id ? `${mood.color}20` : t.surfaceAlt,
                  border: `1.5px solid ${currentMood === mood.id ? mood.color : t.border}`,
                  borderRadius: 14, padding: '10px 6px', cursor: 'pointer', transition: 'all 0.2s',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                  transform: pressedBtn === mood.id ? 'scale(0.95)' : 'scale(1)',
                }
              },
                React.createElement('span', { style: { fontSize: 20 } }, mood.emoji),
                React.createElement('span', { style: { fontSize: 11, fontWeight: 600, color: currentMood === mood.id ? mood.color : t.textSub, fontFamily: 'Plus Jakarta Sans' } }, mood.label)
              )
            )
          )
        )
      ),

      // Nest Pulse
      React.createElement('div', { style: { padding: '0 20px 16px' } },
        React.createElement('div', {
          style: {
            background: t.gradient1, borderRadius: 20, padding: '16px',
            position: 'relative', overflow: 'hidden',
          }
        },
          React.createElement('div', {
            style: {
              position: 'absolute', top: -30, right: -30, width: 120, height: 120,
              borderRadius: '50%', background: 'rgba(255,255,255,0.08)',
            }
          }),
          React.createElement('p', { style: { fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.7)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6, fontFamily: 'Plus Jakarta Sans' } }, 'Nest Pulse'),
          React.createElement('p', { style: { fontSize: 20, fontWeight: 800, color: '#fff', fontFamily: 'Plus Jakarta Sans', marginBottom: 4 } },
            selectedMood ? `Your home is ready to ${selectedMood.id === 'focused' ? 'support deep work' : selectedMood.id === 'calm' ? 'hold your calm' : selectedMood.id === 'drained' ? 'restore your energy' : selectedMood.id === 'anxious' ? 'ease your tension' : selectedMood.id === 'scattered' ? 'center your mind' : 'welcome your rest'}` : 'Check in to activate'
          ),
          React.createElement('p', { style: { fontSize: 13, color: 'rgba(255,255,255,0.75)', fontFamily: 'Plus Jakarta Sans' } },
            selectedMood ? `3 micro-adjustments ready for ${selectedMood.label.toLowerCase()} mode` : 'Select your current mood above'
          )
        )
      ),

      // Quick Suggestions
      currentMood && React.createElement('div', { style: { padding: '0 20px 16px' } },
        React.createElement('p', { style: { fontSize: 13, fontWeight: 700, color: t.textSub, marginBottom: 10, fontFamily: 'Plus Jakarta Sans' } }, 'Quick adjustments for you'),
        quickSuggestions.map((s, i) =>
          React.createElement('div', {
            key: i,
            style: {
              background: t.card, borderRadius: 14, padding: '12px 14px',
              border: `1px solid ${t.border}`, marginBottom: 8, display: 'flex',
              alignItems: 'center', gap: 12, boxShadow: t.cardShadow,
            }
          },
            React.createElement('div', {
              style: {
                width: 40, height: 40, borderRadius: 12, background: t.surfaceAlt,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18,
                flexShrink: 0,
              }
            }, s.icon),
            React.createElement('p', { style: { fontSize: 14, fontWeight: 500, color: t.text, fontFamily: 'Plus Jakarta Sans', flex: 1 } }, s.text),
            React.createElement(window.lucide.ChevronRight, { size: 16, color: t.textMuted })
          )
        )
      ),

      // Today's activity
      React.createElement('div', { style: { padding: '0 20px' } },
        React.createElement('p', { style: { fontSize: 13, fontWeight: 700, color: t.textSub, marginBottom: 10, fontFamily: 'Plus Jakarta Sans' } }, 'Today\'s activity'),
        React.createElement('div', {
          style: { background: t.card, borderRadius: 16, padding: 16, border: `1px solid ${t.border}` }
        },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: 12 } },
            ['Check-ins', 'Adjustments', 'Mood avg'].map((label, i) =>
              React.createElement('div', { key: i, style: { textAlign: 'center' } },
                React.createElement('p', { style: { fontSize: 22, fontWeight: 800, color: t.primary, fontFamily: 'Plus Jakarta Sans' } },
                  ['2', '5', '7.2'][i]
                ),
                React.createElement('p', { style: { fontSize: 11, color: t.textSub, fontFamily: 'Plus Jakarta Sans' } }, label)
              )
            )
          ),
          React.createElement('div', { style: { height: 1, background: t.border, marginBottom: 12 } }),
          React.createElement('p', { style: { fontSize: 12, color: t.textSub, fontFamily: 'Plus Jakarta Sans', textAlign: 'center' } },
            React.createElement('span', { style: { color: t.success, fontWeight: 700 } }, '+23% '),
            'calmer than last week'
          )
        )
      )
    );
  };

  // ─── Nest Screen ─────────────────────────────────────────────────────────

  const NestScreen = () =>
    React.createElement('div', {
      style: { flex: 1, overflowY: 'auto', padding: '8px 0 80px', background: t.bg }
    },
      React.createElement('div', { style: { padding: '8px 20px 16px' } },
        React.createElement('h2', { style: { fontSize: 22, fontWeight: 800, color: t.text, fontFamily: 'Plus Jakarta Sans' } }, 'Your Nest'),
        React.createElement('p', { style: { fontSize: 13, color: t.textSub, fontFamily: 'Plus Jakarta Sans', marginTop: 2 } }, 'Room-by-room environment tuning')
      ),

      // Room selector
      React.createElement('div', { style: { padding: '0 20px 16px', display: 'flex', gap: 8, overflowX: 'auto' } },
        rooms.map(room =>
          React.createElement('button', {
            key: room.id,
            onClick: () => setSelectedRoom(room.id),
            style: {
              flexShrink: 0, padding: '8px 16px', borderRadius: 50,
              background: selectedRoom === room.id ? t.primary : t.card,
              border: `1.5px solid ${selectedRoom === room.id ? t.primary : t.border}`,
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
              transition: 'all 0.2s',
            }
          },
            React.createElement('span', { style: { fontSize: 14 } }, room.icon),
            React.createElement('span', { style: { fontSize: 13, fontWeight: 600, color: selectedRoom === room.id ? '#fff' : t.textSub, fontFamily: 'Plus Jakarta Sans', whiteSpace: 'nowrap' } }, room.label)
          )
        )
      ),

      // Room mood visual
      React.createElement('div', { style: { padding: '0 20px 16px' } },
        React.createElement('div', {
          style: {
            background: t.card, borderRadius: 20, padding: '16px', border: `1px solid ${t.border}`,
            display: 'flex', alignItems: 'center', gap: 16,
          }
        },
          React.createElement('div', {
            style: {
              width: 64, height: 64, borderRadius: 18, background: t.surfaceAlt,
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, flexShrink: 0,
            }
          }, rooms.find(r => r.id === selectedRoom)?.icon),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('p', { style: { fontSize: 16, fontWeight: 700, color: t.text, fontFamily: 'Plus Jakarta Sans' } }, rooms.find(r => r.id === selectedRoom)?.label),
            React.createElement('p', { style: { fontSize: 12, color: t.textSub, fontFamily: 'Plus Jakarta Sans', marginTop: 2 } }, 'Environment score'),
            React.createElement('div', {
              style: { marginTop: 6, height: 6, background: t.surfaceAlt, borderRadius: 3, overflow: 'hidden' }
            },
              React.createElement('div', {
                style: {
                  height: '100%', width: selectedRoom === 'living' ? '68%' : selectedRoom === 'bedroom' ? '45%' : selectedRoom === 'kitchen' ? '80%' : '72%',
                  background: t.gradient1, borderRadius: 3, transition: 'width 0.5s ease',
                }
              })
            )
          ),
          React.createElement('div', { style: { textAlign: 'right' } },
            React.createElement('p', { style: { fontSize: 22, fontWeight: 800, color: t.primary, fontFamily: 'Plus Jakarta Sans' } },
              selectedRoom === 'living' ? '68' : selectedRoom === 'bedroom' ? '45' : selectedRoom === 'kitchen' ? '80' : '72'
            ),
            React.createElement('p', { style: { fontSize: 10, color: t.textSub, fontFamily: 'Plus Jakarta Sans' } }, '/ 100')
          )
        )
      ),

      // Environmental factors
      React.createElement('div', { style: { padding: '0 20px 16px' } },
        React.createElement('p', { style: { fontSize: 12, fontWeight: 700, color: t.textSub, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10, fontFamily: 'Plus Jakarta Sans' } }, 'Environment Factors'),
        React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 } },
          [
            { icon: '💡', label: 'Lighting', value: selectedRoom === 'bedroom' ? 'Low warm' : 'Medium', color: '#FFB347' },
            { icon: '🎵', label: 'Sound', value: 'Ambient on', color: '#7C6EFA' },
            { icon: '🌡️', label: 'Temp', value: '71°F', color: '#4ECDC4' },
            { icon: '💨', label: 'Air', value: 'Fresh', color: '#4ADE80' },
          ].map((factor, i) =>
            React.createElement('div', {
              key: i,
              style: {
                background: t.card, borderRadius: 14, padding: '12px',
                border: `1px solid ${t.border}`,
              }
            },
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 } },
                React.createElement('span', { style: { fontSize: 16 } }, factor.icon),
                React.createElement('span', { style: { fontSize: 11, fontWeight: 600, color: t.textSub, fontFamily: 'Plus Jakarta Sans' } }, factor.label)
              ),
              React.createElement('p', { style: { fontSize: 14, fontWeight: 700, color: factor.color, fontFamily: 'Plus Jakarta Sans' } }, factor.value)
            )
          )
        )
      ),

      // Suggestions
      React.createElement('div', { style: { padding: '0 20px' } },
        React.createElement('p', { style: { fontSize: 12, fontWeight: 700, color: t.textSub, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10, fontFamily: 'Plus Jakarta Sans' } }, 'Recommended Adjustments'),
        roomSuggestions[selectedRoom].map((s, i) =>
          React.createElement('div', {
            key: i,
            style: {
              background: t.card, borderRadius: 14, padding: '12px 14px', marginBottom: 8,
              border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', gap: 12,
            }
          },
            React.createElement('div', {
              style: {
                width: 40, height: 40, borderRadius: 12, background: t.surfaceAlt,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0,
              }
            }, s.icon),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 } },
                React.createElement('p', { style: { fontSize: 14, fontWeight: 600, color: t.text, fontFamily: 'Plus Jakarta Sans' } }, s.title),
                React.createElement('span', {
                  style: {
                    fontSize: 10, fontWeight: 600, color: t.accent, background: t.accentGlow,
                    padding: '2px 6px', borderRadius: 4, fontFamily: 'Plus Jakarta Sans',
                  }
                }, s.tag)
              ),
              React.createElement('p', { style: { fontSize: 12, color: t.textSub, fontFamily: 'Plus Jakarta Sans' } }, s.detail)
            ),
            React.createElement(window.lucide.ChevronRight, { size: 16, color: t.textMuted })
          )
        )
      )
    );

  // ─── Routines Screen ──────────────────────────────────────────────────────

  const RoutinesScreen = () => {
    if (activeRoutine) {
      const routine = routinesList.find(r => r.id === activeRoutine);
      return React.createElement('div', {
        style: { flex: 1, overflowY: 'auto', padding: '8px 0 80px', background: t.bg }
      },
        React.createElement('div', { style: { padding: '8px 20px 16px', display: 'flex', alignItems: 'center', gap: 12 } },
          React.createElement('button', {
            onClick: () => { setActiveRoutine(null); setRoutineStep(0); },
            style: {
              width: 36, height: 36, borderRadius: 12, background: t.card,
              border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
            }
          }, React.createElement(window.lucide.ArrowLeft, { size: 18, color: t.text })),
          React.createElement('div', {},
            React.createElement('h2', { style: { fontSize: 18, fontWeight: 800, color: t.text, fontFamily: 'Plus Jakarta Sans' } }, routine.title),
            React.createElement('p', { style: { fontSize: 12, color: t.textSub, fontFamily: 'Plus Jakarta Sans' } }, `${routine.duration} · ${routine.steps.length} steps`)
          )
        ),

        // Progress bar
        React.createElement('div', { style: { padding: '0 20px 16px' } },
          React.createElement('div', { style: { height: 4, background: t.surfaceAlt, borderRadius: 2, overflow: 'hidden' } },
            React.createElement('div', {
              style: {
                height: '100%', background: routine.color,
                width: `${((routineStep + 1) / routine.steps.length) * 100}%`,
                transition: 'width 0.4s ease', borderRadius: 2,
              }
            })
          ),
          React.createElement('p', { style: { fontSize: 11, color: t.textSub, marginTop: 6, fontFamily: 'Plus Jakarta Sans' } },
            `Step ${routineStep + 1} of ${routine.steps.length}`
          )
        ),

        // Current step
        React.createElement('div', { style: { padding: '0 20px 16px' } },
          React.createElement('div', {
            style: {
              background: `${routine.color}15`, borderRadius: 20, padding: '24px',
              border: `1.5px solid ${routine.color}40`, textAlign: 'center',
            }
          },
            React.createElement('div', { style: { fontSize: 48, marginBottom: 16 } }, routine.steps[routineStep].icon),
            React.createElement('p', { style: { fontSize: 20, fontWeight: 800, color: t.text, fontFamily: 'Plus Jakarta Sans', marginBottom: 8, lineHeight: 1.2 } }, routine.steps[routineStep].action),
            React.createElement('p', { style: { fontSize: 14, color: t.textSub, fontFamily: 'Plus Jakarta Sans', lineHeight: 1.5 } }, routine.steps[routineStep].detail)
          )
        ),

        // All steps
        React.createElement('div', { style: { padding: '0 20px 16px' } },
          routine.steps.map((step, i) =>
            React.createElement('div', {
              key: i,
              onClick: () => setRoutineStep(i),
              style: {
                display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px',
                borderRadius: 12, marginBottom: 6, cursor: 'pointer',
                background: i === routineStep ? `${routine.color}15` : 'transparent',
                border: `1px solid ${i === routineStep ? routine.color + '40' : 'transparent'}`,
                transition: 'all 0.2s',
              }
            },
              React.createElement('div', {
                style: {
                  width: 28, height: 28, borderRadius: '50%',
                  background: i < routineStep ? routine.color : i === routineStep ? `${routine.color}30` : t.surfaceAlt,
                  border: `2px solid ${i <= routineStep ? routine.color : t.border}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  transition: 'all 0.3s',
                }
              },
                i < routineStep
                  ? React.createElement(window.lucide.Check, { size: 14, color: '#fff' })
                  : React.createElement('span', { style: { fontSize: 11, fontWeight: 700, color: i === routineStep ? routine.color : t.textMuted, fontFamily: 'Plus Jakarta Sans' } }, i + 1)
              ),
              React.createElement('div', { style: { flex: 1 } },
                React.createElement('p', { style: { fontSize: 13, fontWeight: 600, color: i <= routineStep ? t.text : t.textSub, fontFamily: 'Plus Jakarta Sans' } }, step.action)
              ),
              React.createElement('span', { style: { fontSize: 14 } }, step.icon)
            )
          )
        ),

        // Next / Done button
        React.createElement('div', { style: { padding: '0 20px' } },
          React.createElement('button', {
            onClick: () => {
              if (routineStep < routine.steps.length - 1) {
                setRoutineStep(routineStep + 1);
              } else {
                setActiveRoutine(null);
                setRoutineStep(0);
              }
            },
            style: {
              width: '100%', padding: '14px', borderRadius: 16, border: 'none',
              background: routine.color, color: '#fff', fontSize: 15, fontWeight: 700,
              cursor: 'pointer', fontFamily: 'Plus Jakarta Sans',
            }
          }, routineStep < routine.steps.length - 1 ? `Next Step →` : `Complete Routine ✓`)
        )
      );
    }

    return React.createElement('div', {
      style: { flex: 1, overflowY: 'auto', padding: '8px 0 80px', background: t.bg }
    },
      React.createElement('div', { style: { padding: '8px 20px 16px' } },
        React.createElement('h2', { style: { fontSize: 22, fontWeight: 800, color: t.text, fontFamily: 'Plus Jakarta Sans' } }, 'Routines'),
        React.createElement('p', { style: { fontSize: 13, color: t.textSub, fontFamily: 'Plus Jakarta Sans', marginTop: 2 } }, 'Situational home-life rituals')
      ),

      // Featured routine
      React.createElement('div', { style: { padding: '0 20px 16px' } },
        React.createElement('p', { style: { fontSize: 12, fontWeight: 700, color: t.textSub, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10, fontFamily: 'Plus Jakarta Sans' } }, 'Suggested now'),
        React.createElement('div', {
          onClick: () => { setActiveRoutine('landing'); setRoutineStep(0); },
          style: {
            background: 'linear-gradient(135deg, #7C6EFA 0%, #4ECDC4 100%)',
            borderRadius: 20, padding: '20px', cursor: 'pointer', position: 'relative', overflow: 'hidden',
          }
        },
          React.createElement('div', { style: { position: 'absolute', top: -20, right: -20, width: 100, height: 100, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' } }),
          React.createElement('div', { style: { display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 8 } },
            React.createElement('span', { style: { fontSize: 32 } }, '🏠'),
            React.createElement('span', {
              style: {
                background: 'rgba(255,255,255,0.25)', color: '#fff', fontSize: 11,
                fontWeight: 700, padding: '3px 10px', borderRadius: 50, fontFamily: 'Plus Jakarta Sans',
              }
            }, '5 min')
          ),
          React.createElement('p', { style: { fontSize: 18, fontWeight: 800, color: '#fff', fontFamily: 'Plus Jakarta Sans', marginBottom: 4 } }, 'Landing Ritual'),
          React.createElement('p', { style: { fontSize: 13, color: 'rgba(255,255,255,0.8)', fontFamily: 'Plus Jakarta Sans', marginBottom: 12 } }, 'Perfect for after-work decompression'),
          React.createElement('div', {
            style: {
              display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.2)',
              padding: '7px 14px', borderRadius: 50,
            }
          },
            React.createElement('span', { style: { color: '#fff', fontSize: 13, fontWeight: 700, fontFamily: 'Plus Jakarta Sans' } }, 'Start ritual'),
            React.createElement(window.lucide.ArrowRight, { size: 14, color: '#fff' })
          )
        )
      ),

      // All routines
      React.createElement('div', { style: { padding: '0 20px' } },
        React.createElement('p', { style: { fontSize: 12, fontWeight: 700, color: t.textSub, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10, fontFamily: 'Plus Jakarta Sans' } }, 'All Routines'),
        routinesList.slice(1).map(routine =>
          React.createElement('div', {
            key: routine.id,
            onClick: () => { setActiveRoutine(routine.id); setRoutineStep(0); },
            style: {
              background: t.card, borderRadius: 16, padding: '14px', marginBottom: 10,
              border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer',
            }
          },
            React.createElement('div', {
              style: {
                width: 48, height: 48, borderRadius: 14, background: `${routine.color}20`,
                border: `1.5px solid ${routine.color}40`, display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: 22, flexShrink: 0,
              }
            }, routine.icon),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('p', { style: { fontSize: 15, fontWeight: 700, color: t.text, fontFamily: 'Plus Jakarta Sans', marginBottom: 2 } }, routine.title),
              React.createElement('p', { style: { fontSize: 12, color: t.textSub, fontFamily: 'Plus Jakarta Sans' } }, routine.subtitle),
              React.createElement('div', { style: { display: 'flex', gap: 5, marginTop: 5 } },
                routine.tags.map(tag =>
                  React.createElement('span', {
                    key: tag,
                    style: {
                      fontSize: 10, fontWeight: 600, color: routine.color,
                      background: `${routine.color}15`, padding: '2px 7px', borderRadius: 4, fontFamily: 'Plus Jakarta Sans',
                    }
                  }, tag)
                )
              )
            ),
            React.createElement('div', { style: { textAlign: 'right' } },
              React.createElement('p', { style: { fontSize: 11, color: t.textSub, fontFamily: 'Plus Jakarta Sans', marginBottom: 4 } }, routine.duration),
              React.createElement(window.lucide.ChevronRight, { size: 16, color: t.textMuted })
            )
          )
        )
      )
    );
  };

  // ─── Journal Screen ───────────────────────────────────────────────────────

  const JournalScreen = () =>
    React.createElement('div', {
      style: { flex: 1, overflowY: 'auto', padding: '8px 0 80px', background: t.bg }
    },
      React.createElement('div', { style: { padding: '8px 20px 16px' } },
        React.createElement('h2', { style: { fontSize: 22, fontWeight: 800, color: t.text, fontFamily: 'Plus Jakarta Sans' } }, 'Mood Journal'),
        React.createElement('p', { style: { fontSize: 13, color: t.textSub, fontFamily: 'Plus Jakarta Sans', marginTop: 2 } }, 'Your home-mood history')
      ),

      // Weekly chart
      React.createElement('div', { style: { padding: '0 20px 16px' } },
        React.createElement('div', { style: { background: t.card, borderRadius: 20, padding: '16px', border: `1px solid ${t.border}` } },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 } },
            React.createElement('p', { style: { fontSize: 14, fontWeight: 700, color: t.text, fontFamily: 'Plus Jakarta Sans' } }, 'This Week'),
            React.createElement('p', { style: { fontSize: 12, color: t.textSub, fontFamily: 'Plus Jakarta Sans' } }, 'Avg: 6.6 / 10')
          ),
          React.createElement('div', {
            style: { display: 'flex', gap: 6, alignItems: 'flex-end', height: 80, justifyContent: 'space-between' }
          },
            weekMoods.map((d, i) =>
              React.createElement('div', { key: i, style: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, height: '100%', justifyContent: 'flex-end' } },
                React.createElement('div', {
                  style: {
                    width: '100%', borderRadius: '4px 4px 0 0',
                    height: `${(d.score / 10) * 70}px`,
                    background: i === 5 ? t.gradient1 : t.surfaceAlt,
                    transition: 'height 0.5s ease',
                    minHeight: 4,
                  }
                }),
                React.createElement('span', { style: { fontSize: 11, fontWeight: i === 5 ? 700 : 400, color: i === 5 ? t.primary : t.textSub, fontFamily: 'Plus Jakarta Sans' } }, d.day)
              )
            )
          )
        )
      ),

      // What worked
      React.createElement('div', { style: { padding: '0 20px 16px' } },
        React.createElement('div', { style: { background: t.card, borderRadius: 16, padding: '14px', border: `1px solid ${t.border}`, marginBottom: 10 } },
          React.createElement('p', { style: { fontSize: 13, fontWeight: 700, color: t.success, fontFamily: 'Plus Jakarta Sans', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 5 } },
            React.createElement(window.lucide.TrendingUp, { size: 14, color: t.success }),
            ' What worked this week'
          ),
          ['Dimming lights before bed', 'Opening windows mid-morning', 'Lo-fi music during focus work', 'Landing ritual after commute'].map((item, i) =>
            React.createElement('div', { key: i, style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 } },
              React.createElement('div', { style: { width: 6, height: 6, borderRadius: '50%', background: t.success, flexShrink: 0 } }),
              React.createElement('p', { style: { fontSize: 13, color: t.textSub, fontFamily: 'Plus Jakarta Sans' } }, item)
            )
          )
        )
      ),

      // Log entries
      React.createElement('div', { style: { padding: '0 20px' } },
        React.createElement('p', { style: { fontSize: 12, fontWeight: 700, color: t.textSub, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10, fontFamily: 'Plus Jakarta Sans' } }, 'Recent Entries'),
        journalData.map((entry, i) => {
          const moodColor = moods.find(m => m.id === entry.mood)?.color || t.primary;
          return React.createElement('div', { key: i },
            i === 0 || journalData[i - 1].date !== entry.date
              ? React.createElement('p', { style: { fontSize: 12, fontWeight: 700, color: t.textMuted, fontFamily: 'Plus Jakarta Sans', marginBottom: 6, marginTop: i > 0 ? 12 : 0 } }, entry.date)
              : null,
            React.createElement('div', {
              style: {
                background: t.card, borderRadius: 14, padding: '12px 14px', marginBottom: 6,
                border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', gap: 12,
              }
            },
              React.createElement('span', { style: { fontSize: 22, flexShrink: 0 } }, entry.emoji),
              React.createElement('div', { style: { flex: 1 } },
                React.createElement('p', { style: { fontSize: 13, fontWeight: 600, color: t.text, fontFamily: 'Plus Jakarta Sans' } }, entry.action),
                React.createElement('p', { style: { fontSize: 11, color: t.textSub, fontFamily: 'Plus Jakarta Sans' } }, entry.time)
              ),
              React.createElement('div', { style: { textAlign: 'center' } },
                React.createElement('p', { style: { fontSize: 15, fontWeight: 800, color: t.success, fontFamily: 'Plus Jakarta Sans' } }, entry.impact),
                React.createElement('p', { style: { fontSize: 10, color: t.textSub, fontFamily: 'Plus Jakarta Sans' } }, 'mood')
              )
            )
          );
        })
      )
    );

  // ─── Settings Screen ──────────────────────────────────────────────────────

  const SettingsScreen = () => {
    const [notifs, setNotifs] = useState(true);
    const [calSync, setCalSync] = useState(false);
    const [learning, setLearning] = useState(true);

    const Toggle = ({ value, onChange }) =>
      React.createElement('div', {
        onClick: () => onChange(!value),
        style: {
          width: 44, height: 24, borderRadius: 50, cursor: 'pointer', transition: 'all 0.3s',
          background: value ? t.primary : t.surfaceAlt,
          border: `1.5px solid ${value ? t.primary : t.border}`,
          display: 'flex', alignItems: 'center', padding: '2px',
          justifyContent: value ? 'flex-end' : 'flex-start',
        }
      },
        React.createElement('div', {
          style: { width: 18, height: 18, borderRadius: '50%', background: '#fff', transition: 'all 0.3s', boxShadow: '0 1px 4px rgba(0,0,0,0.2)' }
        })
      );

    return React.createElement('div', {
      style: { flex: 1, overflowY: 'auto', padding: '8px 0 80px', background: t.bg }
    },
      React.createElement('div', { style: { padding: '8px 20px 16px' } },
        React.createElement('h2', { style: { fontSize: 22, fontWeight: 800, color: t.text, fontFamily: 'Plus Jakarta Sans' } }, 'Settings'),
        React.createElement('p', { style: { fontSize: 13, color: t.textSub, fontFamily: 'Plus Jakarta Sans', marginTop: 2 } }, 'Personalize your Nest')
      ),

      // Profile card
      React.createElement('div', { style: { padding: '0 20px 20px' } },
        React.createElement('div', {
          style: {
            background: t.gradient1, borderRadius: 20, padding: '16px',
            display: 'flex', alignItems: 'center', gap: 14,
          }
        },
          React.createElement('div', {
            style: {
              width: 52, height: 52, borderRadius: 16, background: 'rgba(255,255,255,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24,
            }
          }, '🧘'),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('p', { style: { fontSize: 16, fontWeight: 800, color: '#fff', fontFamily: 'Plus Jakarta Sans' } }, 'Your Profile'),
            React.createElement('p', { style: { fontSize: 12, color: 'rgba(255,255,255,0.75)', fontFamily: 'Plus Jakarta Sans' } }, '23 check-ins · 47 adjustments')
          ),
          React.createElement(window.lucide.ChevronRight, { size: 18, color: 'rgba(255,255,255,0.7)' })
        )
      ),

      // Theme toggle
      React.createElement('div', { style: { padding: '0 20px 20px' } },
        React.createElement('p', { style: { fontSize: 12, fontWeight: 700, color: t.textSub, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10, fontFamily: 'Plus Jakarta Sans' } }, 'Appearance'),
        React.createElement('div', {
          style: { background: t.card, borderRadius: 16, border: `1px solid ${t.border}`, overflow: 'hidden' }
        },
          React.createElement('div', {
            style: { display: 'flex', padding: '4px', gap: 4 }
          },
            ['dark', 'light'].map(mode =>
              React.createElement('button', {
                key: mode,
                onClick: () => setIsDark(mode === 'dark'),
                style: {
                  flex: 1, padding: '10px', borderRadius: 12, border: 'none',
                  background: (isDark && mode === 'dark') || (!isDark && mode === 'light') ? t.primary : 'transparent',
                  color: (isDark && mode === 'dark') || (!isDark && mode === 'light') ? '#fff' : t.textSub,
                  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                  fontFamily: 'Plus Jakarta Sans', fontSize: 13, fontWeight: 600, transition: 'all 0.2s',
                }
              },
                React.createElement(mode === 'dark' ? window.lucide.Moon : window.lucide.Sun, { size: 15 }),
                mode === 'dark' ? 'Dark' : 'Light'
              )
            )
          )
        )
      ),

      // Settings sections
      React.createElement('div', { style: { padding: '0 20px 20px' } },
        React.createElement('p', { style: { fontSize: 12, fontWeight: 700, color: t.textSub, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10, fontFamily: 'Plus Jakarta Sans' } }, 'Preferences'),
        React.createElement('div', {
          style: { background: t.card, borderRadius: 16, border: `1px solid ${t.border}`, overflow: 'hidden' }
        },
          [
            { label: 'Smart notifications', sub: 'Context-aware nudges', icon: '🔔', value: notifs, onChange: setNotifs },
            { label: 'Calendar sync', sub: 'Adapt to your schedule', icon: '📅', value: calSync, onChange: setCalSync },
            { label: 'Learning mode', sub: 'Remember what works', icon: '🧠', value: learning, onChange: setLearning },
          ].map((item, i) =>
            React.createElement('div', {
              key: i,
              style: {
                display: 'flex', alignItems: 'center', gap: 12, padding: '13px 16px',
                borderBottom: i < 2 ? `1px solid ${t.border}` : 'none',
              }
            },
              React.createElement('div', {
                style: {
                  width: 36, height: 36, borderRadius: 10, background: t.surfaceAlt,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0,
                }
              }, item.icon),
              React.createElement('div', { style: { flex: 1 } },
                React.createElement('p', { style: { fontSize: 14, fontWeight: 600, color: t.text, fontFamily: 'Plus Jakarta Sans' } }, item.label),
                React.createElement('p', { style: { fontSize: 11, color: t.textSub, fontFamily: 'Plus Jakarta Sans' } }, item.sub)
              ),
              React.createElement(Toggle, { value: item.value, onChange: item.onChange })
            )
          )
        )
      ),

      // Connected rooms
      React.createElement('div', { style: { padding: '0 20px' } },
        React.createElement('p', { style: { fontSize: 12, fontWeight: 700, color: t.textSub, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10, fontFamily: 'Plus Jakarta Sans' } }, 'Your Rooms'),
        React.createElement('div', {
          style: { background: t.card, borderRadius: 16, border: `1px solid ${t.border}`, overflow: 'hidden' }
        },
          rooms.map((room, i) =>
            React.createElement('div', {
              key: room.id,
              style: {
                display: 'flex', alignItems: 'center', gap: 12, padding: '13px 16px',
                borderBottom: i < rooms.length - 1 ? `1px solid ${t.border}` : 'none',
              }
            },
              React.createElement('span', { style: { fontSize: 18, width: 24, textAlign: 'center' } }, room.icon),
              React.createElement('p', { style: { flex: 1, fontSize: 14, fontWeight: 500, color: t.text, fontFamily: 'Plus Jakarta Sans' } }, room.label),
              React.createElement('div', {
                style: { width: 8, height: 8, borderRadius: '50%', background: i < 3 ? t.success : t.textMuted }
              }),
              React.createElement('span', { style: { fontSize: 11, color: i < 3 ? t.success : t.textMuted, fontFamily: 'Plus Jakarta Sans' } }, i < 3 ? 'Active' : 'Idle')
            )
          )
        )
      )
    );
  };

  // ─── Screen Router ────────────────────────────────────────────────────────

  const screens = {
    home: HomeScreen,
    nest: NestScreen,
    routines: RoutinesScreen,
    journal: JournalScreen,
    settings: SettingsScreen,
  };

  const tabs = [
    { id: 'home', label: 'Home', icon: window.lucide.Home },
    { id: 'nest', label: 'Nest', icon: window.lucide.Layers },
    { id: 'routines', label: 'Routines', icon: window.lucide.Sparkles },
    { id: 'journal', label: 'Journal', icon: window.lucide.BookOpen },
    { id: 'settings', label: 'Settings', icon: window.lucide.Settings2 },
  ];

  return React.createElement('div', {
    style: {
      minHeight: '100vh', background: '#1a1a2e',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'Plus Jakarta Sans, sans-serif',
    }
  },
    React.createElement('style', {}, fontStyle),

    React.createElement('div', {
      style: {
        width: 375, height: 812, borderRadius: 44, overflow: 'hidden',
        position: 'relative', background: t.bg, boxShadow: '0 30px 80px rgba(0,0,0,0.5), 0 0 0 2px rgba(255,255,255,0.1)',
        display: 'flex', flexDirection: 'column',
      }
    },
      React.createElement(StatusBar),
      React.createElement('div', { style: { flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', position: 'relative' } },
        React.createElement(screens[activeTab])
      ),
      React.createElement(BottomNav)
    )
  );
}
