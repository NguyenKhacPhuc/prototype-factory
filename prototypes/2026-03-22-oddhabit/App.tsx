const { useState, useEffect, useRef } = React;

function App() {
  const [isDark, setIsDark] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const [currentTime, setCurrentTime] = useState('9:41 AM');
  const [completedRituals, setCompletedRituals] = useState({});
  const [emergencyActive, setEmergencyActive] = useState(false);
  const [emergencyRitual, setEmergencyRitual] = useState(null);
  const [pressedBtn, setPressedBtn] = useState(null);
  const [ritualRatings, setRitualRatings] = useState({});
  const [activeCategory, setActiveCategory] = useState('all');
  const [addedRituals, setAddedRituals] = useState({});
  const [showRitualDetail, setShowRitualDetail] = useState(null);
  const [completedEmergency, setCompletedEmergency] = useState(false);

  const themes = {
    dark: {
      bg: '#0C0C14',
      surface: '#161622',
      surface2: '#1E1E2E',
      surface3: '#25253A',
      primary: '#C4FF5C',
      primaryDark: '#8FCC00',
      primaryDim: 'rgba(196,255,92,0.12)',
      secondary: '#8B5CF6',
      secondaryDim: 'rgba(139,92,246,0.15)',
      danger: '#FF5C7A',
      dangerDim: 'rgba(255,92,122,0.12)',
      amber: '#FFBA3B',
      amberDim: 'rgba(255,186,59,0.12)',
      text: '#F2F2FF',
      textSec: '#7C7C9E',
      textMuted: '#454567',
      border: '#22223A',
      navBg: '#0E0E1A',
      streakColor: '#FF8C42',
    },
    light: {
      bg: '#F3F0FF',
      surface: '#FFFFFF',
      surface2: '#EDEAFF',
      surface3: '#E4E0FF',
      primary: '#5C2ECC',
      primaryDark: '#3D1A99',
      primaryDim: 'rgba(92,46,204,0.1)',
      secondary: '#7B3FF0',
      secondaryDim: 'rgba(123,63,240,0.1)',
      danger: '#E0274A',
      dangerDim: 'rgba(224,39,74,0.1)',
      amber: '#E07A00',
      amberDim: 'rgba(224,122,0,0.1)',
      text: '#12112A',
      textSec: '#5C5880',
      textMuted: '#9895B8',
      border: '#DDD8FF',
      navBg: '#FFFFFF',
      streakColor: '#D9600A',
    }
  };

  const t = isDark ? themes.dark : themes.light;

  const fontStyle = `
    @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,300;12..96,400;12..96,500;12..96,600;12..96,700;12..96,800&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    ::-webkit-scrollbar { width: 0; height: 0; }
    @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
    @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.6; } }
    @keyframes shake { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-4px)} 60%{transform:translateX(4px)} }
    @keyframes popIn { 0%{transform:scale(0.8);opacity:0} 60%{transform:scale(1.05)} 100%{transform:scale(1);opacity:1} }
    .ritual-card { animation: slideUp 0.3s ease both; }
    .emergency-pop { animation: popIn 0.4s cubic-bezier(.34,1.56,.64,1) both; }
  `;

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }));
    };
    update();
    const interval = setInterval(update, 10000);
    return () => clearInterval(interval);
  }, []);

  const todayRituals = [
    { id: 'r1', emoji: '🔑', title: 'Doorway Pat-Down', desc: 'Left pocket → right pocket → chest → forehead tap. Say "locked in" once.', category: 'Memory', time: 'Before leaving', xp: 15, duration: '3 sec', trigger: '📍 Near front door' },
    { id: 'r2', emoji: '🌀', title: 'Fridge Spiral', desc: 'Trace a slow spiral in the air before opening the fridge. What do you actually need?', category: 'Memory', time: 'Before cooking', xp: 12, duration: '4 sec', trigger: '🕕 6:00 PM daily' },
    { id: 'r3', emoji: '🧦', title: 'Sock Whisper', desc: 'Hold one sock and whisper tomorrow\'s hardest task into it before putting it on.', category: 'Focus', time: 'Morning routine', xp: 10, duration: '5 sec', trigger: '⏰ 7:30 AM' },
    { id: 'r4', emoji: '📸', title: 'Museum Chaos Shot', desc: 'Photo the messiest thing nearby. Give it a pompous museum title. Now clean it.', category: 'Anti-Clutter', time: 'On demand', xp: 20, duration: '10 sec', trigger: '🔔 Manual' },
  ];

  const libraryRituals = [
    { id: 'l1', emoji: '🔑', title: 'Doorway Pat-Down', desc: 'Tap left pocket → right → chest → forehead before leaving. Say "locked in."', category: 'Memory', xp: 15, uses: 4521, sticky: 4.8 },
    { id: 'l2', emoji: '🌀', title: 'Fridge Spiral', desc: 'Trace a slow spiral in the air, then open the fridge. Recall your actual need.', category: 'Memory', xp: 12, uses: 2310, sticky: 4.6 },
    { id: 'l3', emoji: '🎯', title: 'Target Breath', desc: 'Point a finger at your most-avoided task and exhale slowly while staring at it.', category: 'Focus', xp: 10, uses: 1240, sticky: 4.2 },
    { id: 'l4', emoji: '🫀', title: 'Heartbeat Message', desc: 'Feel your pulse for 8 full beats before sending any stressful text or email.', category: 'Anti-Stress', xp: 8, uses: 987, sticky: 4.5 },
    { id: 'l5', emoji: '🦜', title: 'Parrot the Plan', desc: 'Announce tomorrow\'s top task out loud in a ridiculous accent or character voice.', category: 'Focus', xp: 18, uses: 876, sticky: 4.1 },
    { id: 'l6', emoji: '📸', title: 'Museum Chaos Shot', desc: 'Photo something messy. Assign a dramatic museum title. Feel the cleaning urge arrive.', category: 'Anti-Clutter', xp: 20, uses: 654, sticky: 4.7 },
    { id: 'l7', emoji: '🧲', title: 'Magnet Pull', desc: 'Pretend your hand is magnetically drawn to your water bottle every 60 minutes.', category: 'Wellness', xp: 5, uses: 1876, sticky: 3.9 },
    { id: 'l8', emoji: '🌊', title: 'Wave Goodbye', desc: 'Wave at your phone screen each time you close a social media app. Intentional exit.', category: 'Anti-Stress', xp: 12, uses: 2134, sticky: 4.3 },
    { id: 'l9', emoji: '🎭', title: 'Character Switch', desc: 'Become a capable alter-ego for exactly 60 seconds to start the task you\'re dodging.', category: 'Focus', xp: 25, uses: 543, sticky: 4.4 },
    { id: 'l10', emoji: '🧦', title: 'Sock Whisper', desc: 'Whisper tomorrow\'s hardest commitment into a sock each morning. It absorbs your intent.', category: 'Memory', xp: 10, uses: 1432, sticky: 4.0 },
    { id: 'l11', emoji: '🌿', title: 'Plant Confession', desc: 'Tell a plant (or object) the one task you\'ve been avoiding. Somehow this helps.', category: 'Anti-Stress', xp: 15, uses: 789, sticky: 4.6 },
    { id: 'l12', emoji: '🎲', title: 'Dice Decision', desc: 'Can\'t choose what to do? Count ceiling tiles. The last digit is your decision number.', category: 'Focus', xp: 8, uses: 432, sticky: 3.8 },
  ];

  const emergencyRituals = [
    { id: 'e1', emoji: '🏛️', title: 'Instant Museum', desc: 'Name 5 nearby objects as priceless museum artifacts with dramatic one-line descriptions. Announce each one aloud.', duration: '30 sec', effect: 'Breaks overwhelm loop instantly' },
    { id: 'e2', emoji: '🎬', title: 'Scene Cut', desc: 'Whisper "CUT!" loudly, stand up, physically walk to a different spot. You are now in Scene 2 of your day.', duration: '20 sec', effect: 'Resets mental context' },
    { id: 'e3', emoji: '🦧', title: 'Primal Inventory', desc: 'Touch 5 items near you and grunt their function. Phone: communication grunt. Pen: scribble grunt. Very grounding.', duration: '45 sec', effect: 'Returns you to physical reality' },
    { id: 'e4', emoji: '🔮', title: 'Fortune Teller Mode', desc: 'Predict the next 5 tiny things that will happen around you. A door will close. A phone will buzz. Creates control.', duration: '60 sec', effect: 'Dissolves decision paralysis' },
    { id: 'e5', emoji: '🌡️', title: 'Stress Temperature', desc: 'Rate your stress on a scale of 1-10 aloud, then reduce it by 1 by identifying one tiny manageable thing to do.', duration: '30 sec', effect: 'Converts panic to action' },
  ];

  const categories = ['all', 'Memory', 'Focus', 'Anti-Stress', 'Anti-Clutter', 'Wellness'];

  const streakData = {
    current: 12,
    longest: 23,
    totalRituals: 847,
    thisWeek: [true, true, true, false, true, true, true],
    weekDays: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
    badges: [
      { emoji: '🌱', title: 'First Ritual', sub: 'Day 1', earned: true },
      { emoji: '🔥', title: '7-Day Streak', sub: 'Week 1', earned: true },
      { emoji: '🧠', title: 'Memory Master', sub: '50 memory rituals', earned: true },
      { emoji: '⚡', title: 'Emergency Pro', sub: '10 spirals stopped', earned: false },
      { emoji: '🏆', title: '30-Day Streak', sub: 'The long game', earned: false },
      { emoji: '🌟', title: 'All Categories', sub: 'True odd-achiever', earned: false },
    ]
  };

  const handleComplete = (id) => {
    setCompletedRituals(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const triggerEmergency = () => {
    setCompletedEmergency(false);
    const ritual = emergencyRituals[Math.floor(Math.random() * emergencyRituals.length)];
    setEmergencyRitual(ritual);
    setEmergencyActive(true);
  };

  const handlePress = (id) => {
    setPressedBtn(id);
    setTimeout(() => setPressedBtn(null), 150);
  };

  const rateRitual = (id, rating) => {
    setRitualRatings(prev => ({ ...prev, [id]: rating }));
  };

  const addRitualToToday = (id) => {
    setAddedRituals(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredRituals = activeCategory === 'all'
    ? libraryRituals
    : libraryRituals.filter(r => r.category === activeCategory);

  const completedCount = todayRituals.filter(r => completedRituals[r.id]).length;
  const progress = (completedCount / todayRituals.length) * 100;

  const Icon = ({ name, size = 20, color, strokeWidth = 2 }) => {
    const IconComp = window.lucide && window.lucide[name];
    if (!IconComp) return React.createElement('span', { style: { width: size, height: size, display: 'inline-block' } });
    return React.createElement(IconComp, { size, color: color || t.textSec, strokeWidth });
  };

  const Badge = ({ children, color, bg }) => (
    React.createElement('span', {
      style: {
        display: 'inline-flex', alignItems: 'center', gap: '4px',
        background: bg, color: color,
        fontSize: '11px', fontWeight: '700', padding: '3px 9px', borderRadius: '100px',
      }
    }, children)
  );

  const categoryColors = {
    Memory: { color: t.primary, bg: t.primaryDim },
    Focus: { color: t.secondary, bg: t.secondaryDim },
    'Anti-Stress': { color: t.danger, bg: t.dangerDim },
    'Anti-Clutter': { color: t.amber, bg: t.amberDim },
    Wellness: { color: '#34D399', bg: 'rgba(52,211,153,0.12)' },
  };

  const StatusBar = () => (
    React.createElement('div', {
      style: {
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '14px 24px 0', height: '44px', zIndex: 20, position: 'relative',
      }
    },
      React.createElement('span', { style: { fontSize: '14px', fontWeight: '700', color: t.text } }, currentTime),
      React.createElement('div', { style: { display: 'flex', gap: '6px', alignItems: 'center' } },
        React.createElement(Icon, { name: 'Signal', size: 14, color: t.text, strokeWidth: 2 }),
        React.createElement(Icon, { name: 'Wifi', size: 14, color: t.text, strokeWidth: 2 }),
        React.createElement(Icon, { name: 'Battery', size: 14, color: t.text, strokeWidth: 2 }),
      )
    )
  );

  const HomeScreen = () => (
    React.createElement('div', { style: { flex: 1, overflowY: 'auto', padding: '0 20px 20px' } },
      // Header
      React.createElement('div', { style: { paddingTop: '8px', marginBottom: '18px' } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' } },
          React.createElement('div', null,
            React.createElement('p', { style: { fontSize: '13px', color: t.textSec, marginBottom: '3px' } }, '👋 Good morning, Ritual Keeper'),
            React.createElement('h1', { style: { fontSize: '28px', fontWeight: '800', color: t.text, lineHeight: 1.1 } }, "Today's\nRituals"),
          ),
          React.createElement('div', {
            style: {
              background: `linear-gradient(135deg, ${t.streakColor}, #FF4D6D)`,
              borderRadius: '16px', padding: '10px 14px', textAlign: 'center',
              boxShadow: `0 8px 24px rgba(255,140,66,0.3)`,
            }
          },
            React.createElement('div', { style: { fontSize: '22px', lineHeight: 1 } }, '🔥'),
            React.createElement('div', { style: { fontSize: '22px', fontWeight: '800', color: '#fff', lineHeight: 1.1 } }, '12'),
            React.createElement('div', { style: { fontSize: '9px', color: 'rgba(255,255,255,0.85)', fontWeight: '700', letterSpacing: '0.5px' } }, 'STREAK'),
          )
        )
      ),

      // Progress bar
      React.createElement('div', {
        style: {
          background: t.surface, borderRadius: '18px', padding: '16px', marginBottom: '18px',
          border: `1px solid ${t.border}`,
        }
      },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: '10px', alignItems: 'center' } },
          React.createElement('span', { style: { fontSize: '13px', color: t.textSec, fontWeight: '500' } }, 'Daily progress'),
          React.createElement('span', { style: { fontSize: '13px', fontWeight: '800', color: t.primary } },
            `${completedCount}/${todayRituals.length} done`
          ),
        ),
        React.createElement('div', { style: { background: t.surface3, borderRadius: '100px', height: '8px', overflow: 'hidden' } },
          React.createElement('div', {
            style: {
              background: `linear-gradient(90deg, ${t.primary}, ${t.secondary})`,
              borderRadius: '100px', height: '100%', width: `${progress}%`,
              transition: 'width 0.6s cubic-bezier(.34,1.2,.64,1)',
              boxShadow: `0 0 12px ${t.primary}66`,
            }
          })
        ),
        completedCount === todayRituals.length && React.createElement('p', {
          style: { fontSize: '12px', color: t.primary, fontWeight: '700', marginTop: '10px', textAlign: 'center' }
        }, '✦ All rituals complete! You earned 57 XP today ✦'),
      ),

      // Ritual cards
      todayRituals.map((ritual, idx) => {
        const done = completedRituals[ritual.id];
        const catStyle = categoryColors[ritual.category] || {};
        return React.createElement('div', {
          key: ritual.id,
          className: 'ritual-card',
          style: {
            background: done ? t.primaryDim : t.surface,
            border: `1px solid ${done ? t.primary + '55' : t.border}`,
            borderRadius: '20px', padding: '16px', marginBottom: '12px',
            transition: 'all 0.3s ease',
            animationDelay: `${idx * 0.05}s`,
          }
        },
          React.createElement('div', { style: { display: 'flex', gap: '14px', alignItems: 'flex-start' } },
            React.createElement('div', {
              style: {
                width: '52px', height: '52px', borderRadius: '16px',
                background: t.surface2, display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: '26px', flexShrink: 0,
                border: `1px solid ${t.border}`,
              }
            }, ritual.emoji),
            React.createElement('div', { style: { flex: 1, minWidth: 0 } },
              React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px', marginBottom: '4px' } },
                React.createElement('h3', {
                  style: {
                    fontSize: '15px', fontWeight: '700', color: t.text,
                    textDecoration: done ? 'line-through' : 'none',
                    opacity: done ? 0.6 : 1,
                  }
                }, ritual.title),
                React.createElement(Badge, { color: t.primary, bg: t.primaryDim }, `+${ritual.xp} XP`),
              ),
              React.createElement('p', { style: { fontSize: '13px', color: t.textSec, lineHeight: 1.45, marginBottom: '8px' } }, ritual.desc),
              React.createElement('div', { style: { display: 'flex', gap: '10px', flexWrap: 'wrap' } },
                React.createElement(Badge, { color: catStyle.color, bg: catStyle.bg }, ritual.category),
                React.createElement('span', { style: { fontSize: '11px', color: t.textMuted, display: 'flex', alignItems: 'center', gap: '3px' } },
                  '⏱ ', ritual.duration
                ),
                React.createElement('span', { style: { fontSize: '11px', color: t.textMuted } }, ritual.trigger),
              ),
            )
          ),
          React.createElement('button', {
            onClick: () => { handlePress(ritual.id); handleComplete(ritual.id); },
            style: {
              width: '100%', marginTop: '14px', padding: '12px',
              borderRadius: '14px', border: done ? `1px solid ${t.border}` : 'none',
              background: done ? 'transparent' : t.primary,
              color: done ? t.textSec : '#0C0C14',
              fontWeight: '700', fontSize: '14px', cursor: 'pointer',
              fontFamily: 'inherit',
              transform: pressedBtn === ritual.id ? 'scale(0.97)' : 'scale(1)',
              transition: 'all 0.15s ease',
            }
          }, done ? '↩ Undo ritual' : '✓ Complete ritual')
        );
      }),

      // Emergency shortcut
      React.createElement('button', {
        onClick: () => { handlePress('emerg-home'); setActiveTab('emergency'); },
        style: {
          width: '100%', padding: '16px', borderRadius: '20px',
          border: `1px solid ${t.danger}44`, background: t.dangerDim,
          color: t.danger, fontWeight: '700', fontSize: '14px',
          cursor: 'pointer', fontFamily: 'inherit',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
          transform: pressedBtn === 'emerg-home' ? 'scale(0.97)' : 'scale(1)',
          transition: 'all 0.15s ease', marginTop: '4px',
        }
      },
        React.createElement(Icon, { name: 'Zap', size: 16, color: t.danger, strokeWidth: 2.5 }),
        'Emergency Anti-Spiral Mode'
      )
    )
  );

  const LibraryScreen = () => (
    React.createElement('div', { style: { flex: 1, overflowY: 'auto', padding: '0 20px 20px' } },
      React.createElement('div', { style: { paddingTop: '8px', marginBottom: '16px' } },
        React.createElement('h1', { style: { fontSize: '28px', fontWeight: '800', color: t.text, marginBottom: '4px' } }, 'Ritual Library'),
        React.createElement('p', { style: { fontSize: '13px', color: t.textSec } }, `${libraryRituals.length} rituals · Rate what sticks`),
      ),

      // Category filter
      React.createElement('div', { style: { display: 'flex', gap: '8px', overflowX: 'auto', marginBottom: '16px', paddingBottom: '4px' } },
        categories.map(cat => React.createElement('button', {
          key: cat,
          onClick: () => setActiveCategory(cat),
          style: {
            padding: '7px 14px', borderRadius: '100px', border: 'none', flexShrink: 0,
            background: activeCategory === cat ? t.primary : t.surface2,
            color: activeCategory === cat ? '#0C0C14' : t.textSec,
            fontSize: '12px', fontWeight: '700', cursor: 'pointer',
            fontFamily: 'inherit', transition: 'all 0.2s ease',
          }
        }, cat === 'all' ? '✦ All' : cat))
      ),

      filteredRituals.map((ritual, idx) => {
        const catStyle = categoryColors[ritual.category] || {};
        const userRating = ritualRatings[ritual.id];
        const added = addedRituals[ritual.id];
        return React.createElement('div', {
          key: ritual.id,
          className: 'ritual-card',
          style: {
            background: t.surface, border: `1px solid ${t.border}`,
            borderRadius: '20px', padding: '16px', marginBottom: '12px',
            animationDelay: `${idx * 0.04}s`,
          }
        },
          React.createElement('div', { style: { display: 'flex', gap: '12px', alignItems: 'flex-start', marginBottom: '12px' } },
            React.createElement('div', {
              style: {
                width: '50px', height: '50px', borderRadius: '14px', flexShrink: 0,
                background: t.surface2, display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: '24px', border: `1px solid ${t.border}`,
              }
            }, ritual.emoji),
            React.createElement('div', { style: { flex: 1, minWidth: 0 } },
              React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px', marginBottom: '4px' } },
                React.createElement('h3', { style: { fontSize: '15px', fontWeight: '700', color: t.text } }, ritual.title),
                React.createElement('span', { style: { fontSize: '11px', color: t.textMuted, flexShrink: 0 } },
                  `${ritual.uses.toLocaleString()} uses`
                ),
              ),
              React.createElement('div', { style: { marginBottom: '6px' } },
                React.createElement(Badge, { color: catStyle.color, bg: catStyle.bg }, ritual.category),
              ),
              React.createElement('p', { style: { fontSize: '13px', color: t.textSec, lineHeight: 1.45 } }, ritual.desc),
            )
          ),
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: `1px solid ${t.border}`, paddingTop: '12px' } },
            React.createElement('div', { style: { display: 'flex', gap: '3px', alignItems: 'center' } },
              [1,2,3,4,5].map(star => React.createElement('button', {
                key: star,
                onClick: () => rateRitual(ritual.id, star),
                style: {
                  background: 'none', border: 'none', cursor: 'pointer',
                  fontSize: '16px', padding: '2px',
                  opacity: userRating >= star ? 1 : 0.25,
                  transform: userRating === star ? 'scale(1.3)' : 'scale(1)',
                  transition: 'all 0.2s ease',
                }
              }, '⭐'))
            ),
            React.createElement('div', { style: { display: 'flex', gap: '8px', alignItems: 'center' } },
              React.createElement('span', { style: { fontSize: '12px', fontWeight: '700', color: t.primary } },
                `+${ritual.xp} XP`
              ),
              React.createElement('button', {
                onClick: () => { handlePress(`add-${ritual.id}`); addRitualToToday(ritual.id); },
                style: {
                  padding: '7px 14px', borderRadius: '10px', border: 'none',
                  background: added ? t.primaryDim : t.primary,
                  color: added ? t.primary : '#0C0C14',
                  fontSize: '12px', fontWeight: '700', cursor: 'pointer',
                  fontFamily: 'inherit',
                  transform: pressedBtn === `add-${ritual.id}` ? 'scale(0.92)' : 'scale(1)',
                  transition: 'all 0.15s ease',
                  border: added ? `1px solid ${t.primary}55` : 'none',
                }
              }, added ? '✓ Added' : '+ Add')
            )
          )
        );
      })
    )
  );

  const EmergencyScreen = () => (
    React.createElement('div', { style: { flex: 1, overflowY: 'auto', padding: '0 20px 20px' } },
      React.createElement('div', { style: { paddingTop: '8px', marginBottom: '20px' } },
        React.createElement('h1', { style: { fontSize: '28px', fontWeight: '800', color: t.text, marginBottom: '4px' } }, 'Emergency Mode'),
        React.createElement('p', { style: { fontSize: '13px', color: t.textSec } }, 'Instant absurd resets for overwhelming moments'),
      ),

      // Big trigger
      React.createElement('div', {
        style: {
          background: `linear-gradient(145deg, ${t.danger}18, ${t.danger}08)`,
          border: `1.5px solid ${t.danger}55`, borderRadius: '24px',
          padding: '28px 20px', textAlign: 'center', marginBottom: '20px',
        }
      },
        React.createElement('div', { style: { fontSize: '52px', marginBottom: '10px' } }, '🆘'),
        React.createElement('h2', { style: { fontSize: '20px', fontWeight: '800', color: t.text, marginBottom: '8px' } },
          "I'm overwhelmed right now"
        ),
        React.createElement('p', { style: { fontSize: '13px', color: t.textSec, lineHeight: 1.55, marginBottom: '20px' } },
          'An instant bizarre ritual will interrupt the spiral and bring you back to earth.'
        ),
        React.createElement('button', {
          onClick: () => { handlePress('bigEmerg'); triggerEmergency(); },
          style: {
            background: t.danger, color: '#fff', border: 'none', borderRadius: '16px',
            padding: '16px 32px', fontSize: '16px', fontWeight: '800',
            cursor: 'pointer', fontFamily: 'inherit', width: '100%',
            boxShadow: `0 8px 24px ${t.danger}44`,
            transform: pressedBtn === 'bigEmerg' ? 'scale(0.96)' : 'scale(1)',
            transition: 'all 0.15s ease',
          }
        }, '⚡ Generate Emergency Ritual')
      ),

      // Generated ritual
      emergencyActive && emergencyRitual && React.createElement('div', {
        className: 'emergency-pop',
        style: {
          background: t.surface, border: `1.5px solid ${t.border}`,
          borderRadius: '22px', padding: '22px', marginBottom: '20px',
        }
      },
        React.createElement('div', { style: { textAlign: 'center', marginBottom: '18px' } },
          React.createElement('div', { style: { fontSize: '56px', marginBottom: '10px' } }, emergencyRitual.emoji),
          React.createElement('h3', { style: { fontSize: '22px', fontWeight: '800', color: t.text, marginBottom: '6px' } },
            emergencyRitual.title
          ),
          React.createElement('span', {
            style: {
              display: 'inline-block', fontSize: '11px', color: t.danger,
              fontWeight: '700', background: t.dangerDim,
              padding: '4px 12px', borderRadius: '100px',
            }
          }, `⏱ ${emergencyRitual.duration}`),
        ),
        React.createElement('p', {
          style: { fontSize: '15px', color: t.textSec, lineHeight: 1.65, textAlign: 'center', marginBottom: '14px' }
        }, emergencyRitual.desc),
        React.createElement('div', {
          style: {
            background: t.surface2, borderRadius: '12px', padding: '11px 14px',
            textAlign: 'center', marginBottom: '14px',
          }
        },
          React.createElement('span', { style: { fontSize: '13px', color: t.primary, fontWeight: '700' } },
            `✦ ${emergencyRitual.effect}`
          )
        ),
        completedEmergency
          ? React.createElement('div', {
            style: {
              textAlign: 'center', padding: '12px',
              color: t.primary, fontWeight: '700', fontSize: '15px',
            }
          }, '✓ Spiral interrupted! Well done.')
          : React.createElement('button', {
            onClick: () => setCompletedEmergency(true),
            style: {
              width: '100%', padding: '13px', borderRadius: '14px',
              border: 'none', background: t.primary,
              color: '#0C0C14', fontWeight: '700', fontSize: '14px',
              cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s ease',
            }
          }, 'I did it — feeling better')
      ),

      // All emergency rituals
      React.createElement('h3', { style: { fontSize: '15px', fontWeight: '700', color: t.text, marginBottom: '12px' } },
        'All Emergency Rituals'
      ),
      emergencyRituals.map(ritual => React.createElement('div', {
        key: ritual.id,
        style: {
          background: t.surface, border: `1px solid ${t.border}`,
          borderRadius: '16px', padding: '14px', marginBottom: '10px',
          display: 'flex', gap: '12px', alignItems: 'center',
        }
      },
        React.createElement('span', { style: { fontSize: '28px' } }, ritual.emoji),
        React.createElement('div', { style: { flex: 1 } },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: '3px' } },
            React.createElement('h4', { style: { fontSize: '14px', fontWeight: '700', color: t.text } }, ritual.title),
            React.createElement('span', { style: { fontSize: '11px', color: t.textMuted } }, `⏱ ${ritual.duration}`),
          ),
          React.createElement('p', { style: { fontSize: '12px', color: t.textSec, lineHeight: 1.4 } }, ritual.effect),
        )
      ))
    )
  );

  const JourneyScreen = () => (
    React.createElement('div', { style: { flex: 1, overflowY: 'auto', padding: '0 20px 20px' } },
      React.createElement('div', { style: { paddingTop: '8px', marginBottom: '18px' } },
        React.createElement('h1', { style: { fontSize: '28px', fontWeight: '800', color: t.text, marginBottom: '4px' } }, 'Your Journey'),
        React.createElement('p', { style: { fontSize: '13px', color: t.textSec } }, 'Private progress, zero pressure'),
      ),

      // Stats grid
      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '18px' } },
        [
          { label: 'Current Streak', value: '12', suffix: '🔥', sub: 'days running' },
          { label: 'Longest Streak', value: '23', suffix: '⚡', sub: 'personal best' },
          { label: 'Total Rituals', value: '847', suffix: '', sub: 'completed' },
          { label: 'This Week', value: '6/7', suffix: '', sub: 'days active' },
        ].map((stat, i) => React.createElement('div', {
          key: i,
          style: {
            background: t.surface, border: `1px solid ${t.border}`,
            borderRadius: '18px', padding: '16px',
          }
        },
          React.createElement('div', { style: { fontSize: '26px', fontWeight: '800', color: t.text, marginBottom: '2px' } },
            stat.value, React.createElement('span', { style: { fontSize: '20px' } }, stat.suffix)
          ),
          React.createElement('div', { style: { fontSize: '12px', fontWeight: '600', color: t.textSec } }, stat.label),
          React.createElement('div', { style: { fontSize: '11px', color: t.textMuted, marginTop: '1px' } }, stat.sub),
        ))
      ),

      // Week tracker
      React.createElement('div', {
        style: {
          background: t.surface, border: `1px solid ${t.border}`,
          borderRadius: '18px', padding: '18px', marginBottom: '18px',
        }
      },
        React.createElement('h3', { style: { fontSize: '14px', fontWeight: '700', color: t.text, marginBottom: '14px' } }, 'This Week'),
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between' } },
          streakData.weekDays.map((day, i) => React.createElement('div', { key: i, style: { textAlign: 'center', flex: 1 } },
            React.createElement('div', {
              style: {
                width: '34px', height: '34px', borderRadius: '11px', margin: '0 auto 6px',
                background: streakData.thisWeek[i] ? t.primary : t.surface2,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '15px', fontWeight: '700',
                color: streakData.thisWeek[i] ? '#0C0C14' : t.textMuted,
                border: `1px solid ${streakData.thisWeek[i] ? 'transparent' : t.border}`,
                boxShadow: streakData.thisWeek[i] ? `0 0 14px ${t.primary}55` : 'none',
              }
            }, streakData.thisWeek[i] ? '✓' : ''),
            React.createElement('span', { style: { fontSize: '11px', color: t.textMuted, fontWeight: '600' } }, day),
          ))
        )
      ),

      // Badges
      React.createElement('h3', { style: { fontSize: '15px', fontWeight: '700', color: t.text, marginBottom: '12px' } }, 'Badges'),
      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '20px' } },
        streakData.badges.map((badge, i) => React.createElement('div', {
          key: i,
          style: {
            background: badge.earned ? t.surface : t.surface2,
            border: `1px solid ${badge.earned ? t.primary + '44' : t.border}`,
            borderRadius: '16px', padding: '14px 8px', textAlign: 'center',
            opacity: badge.earned ? 1 : 0.4,
            transition: 'all 0.2s ease',
          }
        },
          React.createElement('div', {
            style: { fontSize: '28px', marginBottom: '6px', filter: badge.earned ? 'none' : 'grayscale(1)' }
          }, badge.emoji),
          React.createElement('div', { style: { fontSize: '11px', fontWeight: '700', color: t.text, lineHeight: 1.3 } }, badge.title),
          React.createElement('div', { style: { fontSize: '10px', color: t.textMuted, marginTop: '2px' } }, badge.sub),
        ))
      ),

      // Category breakdown
      React.createElement('h3', { style: { fontSize: '15px', fontWeight: '700', color: t.text, marginBottom: '12px' } }, 'Category Breakdown'),
      [
        { cat: 'Memory', count: 312, pct: 37, color: t.primary },
        { cat: 'Focus', count: 256, pct: 30, color: t.secondary },
        { cat: 'Anti-Stress', count: 183, pct: 22, color: t.danger },
        { cat: 'Anti-Clutter', count: 96, pct: 11, color: t.amber },
      ].map(item => React.createElement('div', { key: item.cat, style: { marginBottom: '14px' } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: '7px' } },
          React.createElement('span', { style: { fontSize: '13px', fontWeight: '600', color: t.text } }, item.cat),
          React.createElement('span', { style: { fontSize: '13px', color: t.textSec } }, `${item.count} rituals`),
        ),
        React.createElement('div', { style: { background: t.surface2, borderRadius: '100px', height: '7px', overflow: 'hidden' } },
          React.createElement('div', {
            style: {
              background: item.color, borderRadius: '100px', height: '100%',
              width: `${item.pct}%`, boxShadow: `0 0 8px ${item.color}66`,
            }
          })
        )
      ))
    )
  );

  const SettingsScreen = () => (
    React.createElement('div', { style: { flex: 1, overflowY: 'auto', padding: '0 20px 20px' } },
      React.createElement('div', { style: { paddingTop: '8px', marginBottom: '20px' } },
        React.createElement('h1', { style: { fontSize: '28px', fontWeight: '800', color: t.text, marginBottom: '4px' } }, 'Settings'),
        React.createElement('p', { style: { fontSize: '13px', color: t.textSec } }, 'Personalize your odd rituals'),
      ),

      // Profile card
      React.createElement('div', {
        style: {
          background: `linear-gradient(135deg, ${t.primaryDim}, ${t.secondaryDim})`,
          border: `1px solid ${t.border}`, borderRadius: '22px',
          padding: '20px', marginBottom: '20px',
          display: 'flex', gap: '16px', alignItems: 'center',
        }
      },
        React.createElement('div', {
          style: {
            width: '58px', height: '58px', borderRadius: '18px',
            background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '28px', flexShrink: 0,
          }
        }, '🦄'),
        React.createElement('div', null,
          React.createElement('div', { style: { fontSize: '18px', fontWeight: '800', color: t.text } }, 'Ritual Keeper'),
          React.createElement('div', { style: { fontSize: '13px', color: t.textSec } }, 'Level 7 Odd-Achiever'),
          React.createElement('div', { style: { fontSize: '12px', color: t.primary, fontWeight: '700', marginTop: '2px' } }, '2,840 XP total'),
        )
      ),

      // Theme toggle
      React.createElement('div', {
        style: {
          background: t.surface, border: `1px solid ${t.border}`,
          borderRadius: '20px', overflow: 'hidden', marginBottom: '14px',
        }
      },
        React.createElement('div', {
          style: {
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '16px', borderBottom: `1px solid ${t.border}`,
          }
        },
          React.createElement('div', { style: { display: 'flex', gap: '12px', alignItems: 'center' } },
            React.createElement('span', { style: { fontSize: '22px' } }, isDark ? '🌙' : '☀️'),
            React.createElement('div', null,
              React.createElement('div', { style: { fontSize: '14px', fontWeight: '600', color: t.text } }, 'App Theme'),
              React.createElement('div', { style: { fontSize: '12px', color: t.textSec } }, isDark ? 'Dark Mode' : 'Light Mode'),
            )
          ),
          React.createElement('button', {
            onClick: () => setIsDark(!isDark),
            style: {
              width: '52px', height: '30px', borderRadius: '100px',
              background: isDark ? t.primary : t.surface3,
              border: 'none', cursor: 'pointer', position: 'relative',
              transition: 'all 0.3s ease',
            }
          },
            React.createElement('div', {
              style: {
                position: 'absolute', top: '4px',
                left: isDark ? '24px' : '4px', width: '22px', height: '22px',
                borderRadius: '50%', background: isDark ? '#0C0C14' : '#fff',
                transition: 'all 0.3s cubic-bezier(.34,1.4,.64,1)',
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
              }
            })
          )
        ),

        // Settings rows
        [
          { icon: '📍', label: 'Location Triggers', sub: 'Context-aware ritual delivery', on: true },
          { icon: '🔔', label: 'Smart Reminders', sub: 'Nudges at the right moments', on: true },
          { icon: '🧠', label: 'AI Personalization', sub: 'Learn what sticks for you', on: true },
          { icon: '🔒', label: 'Private Mode', sub: 'No data leaves your device', on: false },
        ].map((item, i, arr) => React.createElement('div', {
          key: i,
          style: {
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '15px 16px',
            borderBottom: i < arr.length - 1 ? `1px solid ${t.border}` : 'none',
          }
        },
          React.createElement('div', { style: { display: 'flex', gap: '12px', alignItems: 'center' } },
            React.createElement('span', { style: { fontSize: '20px' } }, item.icon),
            React.createElement('div', null,
              React.createElement('div', { style: { fontSize: '14px', fontWeight: '600', color: t.text } }, item.label),
              React.createElement('div', { style: { fontSize: '12px', color: t.textSec } }, item.sub),
            )
          ),
          React.createElement('div', {
            style: {
              width: '46px', height: '26px', borderRadius: '100px',
              background: item.on ? t.primary : t.surface3,
              position: 'relative', transition: 'all 0.2s ease',
            }
          },
            React.createElement('div', {
              style: {
                position: 'absolute', top: '3px', left: item.on ? '22px' : '3px',
                width: '20px', height: '20px', borderRadius: '50%', background: '#fff',
                transition: 'all 0.2s ease', boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
              }
            })
          )
        ))
      ),

      // App info
      React.createElement('div', {
        style: {
          background: t.surface, border: `1px solid ${t.border}`,
          borderRadius: '16px', padding: '14px 16px', marginBottom: '14px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }
      },
        React.createElement('div', { style: { display: 'flex', gap: '12px', alignItems: 'center' } },
          React.createElement('span', { style: { fontSize: '20px' } }, '📊'),
          React.createElement('div', null,
            React.createElement('div', { style: { fontSize: '14px', fontWeight: '600', color: t.text } }, 'Data & Privacy'),
            React.createElement('div', { style: { fontSize: '12px', color: t.textSec } }, 'Manage your ritual data'),
          )
        ),
        React.createElement(Icon, { name: 'ChevronRight', size: 18, color: t.textMuted })
      ),

      React.createElement('div', { style: { textAlign: 'center', padding: '16px', borderTop: `1px solid ${t.border}`, marginTop: '8px' } },
        React.createElement('div', { style: { fontSize: '13px', fontWeight: '800', color: t.text, marginBottom: '3px' } }, 'OddHabit'),
        React.createElement('div', { style: { fontSize: '11px', color: t.textMuted } }, 'v1.0.0 · Fix life through tiny strange rituals'),
      )
    )
  );

  const navTabs = [
    { id: 'home', icon: 'Home', label: 'Today' },
    { id: 'library', icon: 'BookOpen', label: 'Library' },
    { id: 'emergency', icon: 'Zap', label: 'SOS' },
    { id: 'journey', icon: 'TrendingUp', label: 'Journey' },
    { id: 'settings', icon: 'Settings', label: 'Settings' },
  ];

  const screenMap = {
    home: HomeScreen,
    library: LibraryScreen,
    emergency: EmergencyScreen,
    journey: JourneyScreen,
    settings: SettingsScreen,
  };

  const ActiveScreen = screenMap[activeTab] || HomeScreen;

  return React.createElement('div', {
    style: {
      minHeight: '100vh', background: '#E8E8EC',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: "'Bricolage Grotesque', sans-serif", padding: '20px',
    }
  },
    React.createElement('style', null, fontStyle),

    // Phone frame
    React.createElement('div', {
      style: {
        width: '375px', height: '812px', background: t.bg,
        borderRadius: '52px', overflow: 'hidden',
        boxShadow: '0 50px 100px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.08)',
        display: 'flex', flexDirection: 'column', position: 'relative',
        transition: 'background 0.35s ease',
      }
    },
      // Dynamic Island
      React.createElement('div', {
        style: {
          width: '126px', height: '36px', background: '#000', borderRadius: '20px',
          position: 'absolute', top: '13px', left: '50%',
          transform: 'translateX(-50%)', zIndex: 30,
        }
      }),

      React.createElement(StatusBar, null),

      // Screen content
      React.createElement('div', {
        style: { flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', paddingTop: '10px' }
      },
        React.createElement(ActiveScreen, null)
      ),

      // Bottom nav
      React.createElement('div', {
        style: {
          background: t.navBg, borderTop: `1px solid ${t.border}`,
          display: 'flex', padding: '10px 0 26px',
          transition: 'background 0.35s ease',
        }
      },
        navTabs.map(tab => {
          const active = activeTab === tab.id;
          const IconComp = window.lucide && window.lucide[tab.icon];
          const isEmergency = tab.id === 'emergency';
          const activeColor = isEmergency ? t.danger : t.primary;
          return React.createElement('button', {
            key: tab.id,
            onClick: () => setActiveTab(tab.id),
            style: {
              flex: 1, background: 'none', border: 'none', cursor: 'pointer',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px',
              padding: '4px 0', fontFamily: 'inherit',
            }
          },
            isEmergency && active
              ? React.createElement('div', {
                style: {
                  width: '36px', height: '36px', borderRadius: '12px',
                  background: t.danger, display: 'flex', alignItems: 'center',
                  justifyContent: 'center', marginBottom: '-2px',
                  boxShadow: `0 4px 16px ${t.danger}66`,
                }
              },
                IconComp && React.createElement(IconComp, { size: 20, color: '#fff', strokeWidth: 2.5 })
              )
              : IconComp && React.createElement(IconComp, {
                size: 22,
                color: active ? activeColor : t.textMuted,
                strokeWidth: active ? 2.5 : 1.8,
              }),
            React.createElement('span', {
              style: {
                fontSize: '10px', fontWeight: active ? '800' : '500',
                color: active ? activeColor : t.textMuted,
                transition: 'color 0.2s ease',
              }
            }, tab.label)
          );
        })
      )
    )
  );
}
