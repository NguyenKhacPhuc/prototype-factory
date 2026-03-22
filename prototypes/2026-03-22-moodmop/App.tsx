const { useState, useEffect, useRef } = React;

const themes = {
  dark: {
    bg: '#0A0E1A',
    surface: '#111827',
    card: '#1C2333',
    cardAlt: '#222D40',
    border: '#2A3550',
    text: '#E8EEFF',
    textSecondary: '#7A8AAD',
    textMuted: '#4A5A7A',
    primary: '#00D4AA',
    primaryDim: 'rgba(0,212,170,0.15)',
    secondary: '#FF6B8A',
    secondaryDim: 'rgba(255,107,138,0.15)',
    accent3: '#A78BFA',
    accent3Dim: 'rgba(167,139,250,0.15)',
    statusBar: '#0A0E1A',
    navBg: '#111827',
    inputBg: '#1C2333',
    overlay: 'rgba(10,14,26,0.85)',
  },
  light: {
    bg: '#EFF3FF',
    surface: '#FFFFFF',
    card: '#F7F9FF',
    cardAlt: '#EDF0FB',
    border: '#D4DCEF',
    text: '#0D1733',
    textSecondary: '#4A5A7A',
    textMuted: '#8A9ABC',
    primary: '#00A896',
    primaryDim: 'rgba(0,168,150,0.12)',
    secondary: '#E8516D',
    secondaryDim: 'rgba(232,81,109,0.12)',
    accent3: '#7C5CC4',
    accent3Dim: 'rgba(124,92,196,0.12)',
    statusBar: '#FFFFFF',
    navBg: '#FFFFFF',
    inputBg: '#EFF3FF',
    overlay: 'rgba(10,14,26,0.6)',
  }
};

const moods = [
  { id: 'frustrated', label: 'Frustrated', emoji: '🔥', color: '#FF6B4A', ritual: 'Rage Tidy', desc: 'Clear one surface fast', intensity: 'high' },
  { id: 'anxious', label: 'Anxious', emoji: '🌪️', color: '#A78BFA', ritual: 'Fog Sweep', desc: 'Sort three small items', intensity: 'medium' },
  { id: 'foggy', label: 'Foggy', emoji: '🌫️', color: '#60A5FA', ritual: 'Slow Dust', desc: 'Wipe one flat surface', intensity: 'low' },
  { id: 'drained', label: 'Drained', emoji: '🪫', color: '#34D399', ritual: 'Gentle Fold', desc: 'Fold one item of clothing', intensity: 'low' },
  { id: 'restless', label: 'Restless', emoji: '⚡', color: '#FBBF24', ritual: 'Quick Sort', desc: 'Empty your pockets', intensity: 'medium' },
  { id: 'overwhelmed', label: 'Overwhelmed', emoji: '💦', color: '#F472B6', ritual: 'Pocket Clear', desc: 'Throw away one scrap', intensity: 'high' },
];

const ritualTasks = {
  frustrated: [
    { id: 1, action: 'Grab one item that doesn\'t belong', duration: 15 },
    { id: 2, action: 'Put it exactly where it goes', duration: 10 },
    { id: 3, action: 'Wipe the empty space left behind', duration: 15 },
    { id: 4, action: 'Take a 10-second breath', duration: 10 },
  ],
  anxious: [
    { id: 1, action: 'Find 3 small objects near you', duration: 10 },
    { id: 2, action: 'Sort them by size', duration: 15 },
    { id: 3, action: 'Line them up neatly', duration: 10 },
    { id: 4, action: 'Step back and observe', duration: 10 },
  ],
  foggy: [
    { id: 1, action: 'Find a flat surface nearby', duration: 10 },
    { id: 2, action: 'Wipe it with your sleeve or hand', duration: 20 },
    { id: 3, action: 'Straighten one item on it', duration: 10 },
    { id: 4, action: 'Name what you just cleared', duration: 5 },
  ],
  drained: [
    { id: 1, action: 'Pick up one piece of clothing', duration: 10 },
    { id: 2, action: 'Fold it slowly and deliberately', duration: 25 },
    { id: 3, action: 'Place it somewhere intentional', duration: 10 },
    { id: 4, action: 'Notice the small order you made', duration: 5 },
  ],
  restless: [
    { id: 1, action: 'Empty both pockets completely', duration: 15 },
    { id: 2, action: 'Sort what\'s there by type', duration: 15 },
    { id: 3, action: 'Put back only what you need', duration: 10 },
    { id: 4, action: 'Discard one piece of trash', duration: 5 },
  ],
  overwhelmed: [
    { id: 1, action: 'Find one scrap of paper nearby', duration: 10 },
    { id: 2, action: 'Crumple it slowly and deliberately', duration: 10 },
    { id: 3, action: 'Throw it exactly into a bin', duration: 10 },
    { id: 4, action: 'Watch where it lands', duration: 5 },
  ],
};

const historyData = [
  { date: 'Today', time: '3:42 PM', mood: 'frustrated', ritual: 'Rage Tidy', completed: true, duration: 58 },
  { date: 'Today', time: '10:17 AM', mood: 'anxious', ritual: 'Fog Sweep', completed: true, duration: 52 },
  { date: 'Yesterday', time: '6:05 PM', mood: 'overwhelmed', ritual: 'Pocket Clear', completed: true, duration: 60 },
  { date: 'Yesterday', time: '2:31 PM', mood: 'foggy', ritual: 'Slow Dust', completed: false, duration: 0 },
  { date: 'Mon Mar 18', time: '11:55 AM', mood: 'restless', ritual: 'Quick Sort', completed: true, duration: 45 },
  { date: 'Mon Mar 18', time: '9:20 AM', mood: 'drained', ritual: 'Gentle Fold', completed: true, duration: 60 },
  { date: 'Sun Mar 17', time: '8:14 PM', mood: 'anxious', ritual: 'Fog Sweep', completed: true, duration: 55 },
];

const soundscapes = [
  { id: 'broom', label: 'Tiny Broom', icon: '🧹', desc: 'Soft swishing sounds' },
  { id: 'clicks', label: 'Object Clicks', icon: '📦', desc: 'Satisfying item sorting' },
  { id: 'water', label: 'Drip Rinse', icon: '💧', desc: 'Gentle water drips' },
  { id: 'paper', label: 'Paper Fold', icon: '📄', desc: 'Crisp folding sounds' },
  { id: 'silence', label: 'Silence', icon: '🔇', desc: 'No sounds' },
];

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [theme, setTheme] = useState('dark');
  const [selectedMood, setSelectedMood] = useState(null);
  const [activeRitual, setActiveRitual] = useState(null);
  const [ritualPhase, setRitualPhase] = useState('scan'); // scan, active, complete
  const [timer, setTimer] = useState(60);
  const [isRunning, setIsRunning] = useState(false);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [activeSoundscape, setActiveSoundscape] = useState('broom');
  const [notifications, setNotifications] = useState(true);
  const [haptics, setHaptics] = useState(true);
  const [breathPhase, setBreathPhase] = useState('inhale');
  const [pressedButton, setPressedButton] = useState(null);
  const timerRef = useRef(null);
  const breathRef = useRef(null);

  const t = themes[theme];

  // Font loader
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');`;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  // Timer logic
  useEffect(() => {
    if (isRunning && timer > 0) {
      timerRef.current = setInterval(() => {
        setTimer(prev => {
          if (prev <= 1) {
            setIsRunning(false);
            setRitualPhase('complete');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [isRunning, timer]);

  // Breath animation cycle
  useEffect(() => {
    if (isRunning) {
      breathRef.current = setInterval(() => {
        setBreathPhase(prev => prev === 'inhale' ? 'hold' : prev === 'hold' ? 'exhale' : 'inhale');
      }, 3000);
    }
    return () => clearInterval(breathRef.current);
  }, [isRunning]);

  const startRitual = (mood) => {
    setSelectedMood(mood);
    setActiveRitual(mood);
    setRitualPhase('scan');
    setTimer(60);
    setCompletedTasks([]);
    setCurrentTaskIndex(0);
    setIsRunning(false);
    setActiveTab('ritual');
  };

  const beginRitual = () => {
    setRitualPhase('active');
    setIsRunning(true);
  };

  const toggleTask = (taskId) => {
    setCompletedTasks(prev => {
      if (prev.includes(taskId)) return prev.filter(id => id !== taskId);
      const next = [...prev, taskId];
      const tasks = ritualTasks[activeRitual?.id] || [];
      if (next.length >= tasks.length) {
        setTimeout(() => setRitualPhase('complete'), 400);
      }
      return next;
    });
  };

  const handleButtonPress = (id) => {
    setPressedButton(id);
    setTimeout(() => setPressedButton(null), 150);
  };

  const resetRitual = () => {
    setActiveRitual(null);
    setSelectedMood(null);
    setRitualPhase('scan');
    setTimer(60);
    setIsRunning(false);
    setCompletedTasks([]);
    setActiveTab('home');
  };

  const getMoodObj = (id) => moods.find(m => m.id === id) || moods[0];

  const formatTime = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

  const progressRing = (value, max, size, stroke) => {
    const r = (size - stroke) / 2;
    const circ = 2 * Math.PI * r;
    const filled = circ * (1 - value / max);
    return { r, circ, filled };
  };

  // ── SCREENS ─────────────────────────────────────────────

  const HomeScreen = () => (
    React.createElement('div', {
      style: { flex: 1, overflowY: 'auto', padding: '0 16px 16px', fontFamily: "'Plus Jakarta Sans', sans-serif" }
    },
      // Greeting
      React.createElement('div', { style: { padding: '8px 0 20px' } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 } },
          React.createElement('span', { style: { color: t.textSecondary, fontSize: 13, fontWeight: 500 } }, 'Sunday, March 22'),
          React.createElement('div', {
            onClick: () => { handleButtonPress('scan-btn'); startRitual(moods[0]); },
            style: {
              background: t.primaryDim,
              border: `1px solid ${t.primary}40`,
              borderRadius: 20,
              padding: '4px 12px',
              display: 'flex',
              alignItems: 'center',
              gap: 5,
              cursor: 'pointer',
              transform: pressedButton === 'scan-btn' ? 'scale(0.96)' : 'scale(1)',
              transition: 'transform 0.15s',
            }
          },
            React.createElement('span', { style: { fontSize: 11 } }, '📷'),
            React.createElement('span', { style: { color: t.primary, fontSize: 11, fontWeight: 600 } }, 'Scan Room')
          )
        ),
        React.createElement('h1', { style: { color: t.text, fontSize: 22, fontWeight: 800, margin: '4px 0 0', lineHeight: 1.2 } },
          'How\'s your ', React.createElement('span', { style: { color: t.primary } }, 'mental space'), ' right now?'
        )
      ),

      // Mood Grid
      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 } },
        moods.map(mood =>
          React.createElement('div', {
            key: mood.id,
            onClick: () => { handleButtonPress(mood.id); startRitual(mood); },
            style: {
              background: selectedMood?.id === mood.id ? `${mood.color}25` : t.card,
              border: `1.5px solid ${selectedMood?.id === mood.id ? mood.color : t.border}`,
              borderRadius: 16,
              padding: '14px 12px',
              cursor: 'pointer',
              transform: pressedButton === mood.id ? 'scale(0.95)' : 'scale(1)',
              transition: 'all 0.15s',
            }
          },
            React.createElement('div', { style: { fontSize: 26, marginBottom: 6 } }, mood.emoji),
            React.createElement('div', { style: { color: t.text, fontSize: 13, fontWeight: 700, marginBottom: 2 } }, mood.label),
            React.createElement('div', { style: { color: t.textSecondary, fontSize: 11, lineHeight: 1.3 } }, mood.desc),
            React.createElement('div', {
              style: {
                display: 'inline-block',
                marginTop: 8,
                background: `${mood.color}20`,
                borderRadius: 6,
                padding: '2px 8px',
                fontSize: 10,
                fontWeight: 600,
                color: mood.color,
                letterSpacing: '0.02em',
              }
            }, mood.ritual)
          )
        )
      ),

      // Quick Modes
      React.createElement('div', { style: { marginBottom: 20 } },
        React.createElement('div', { style: { color: t.textSecondary, fontSize: 12, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 10 } }, 'Quick Modes'),
        React.createElement('div', { style: { display: 'flex', gap: 10 } },
          React.createElement('div', {
            onClick: () => { handleButtonPress('rage'); startRitual(moods[0]); },
            style: {
              flex: 1, background: 'linear-gradient(135deg, #FF6B4A22, #FF4A6A22)',
              border: `1.5px solid #FF6B4A40`, borderRadius: 16, padding: '14px 12px',
              cursor: 'pointer', transform: pressedButton === 'rage' ? 'scale(0.96)' : 'scale(1)',
              transition: 'transform 0.15s',
            }
          },
            React.createElement('div', { style: { fontSize: 22, marginBottom: 4 } }, '⚡'),
            React.createElement('div', { style: { color: '#FF6B4A', fontSize: 13, fontWeight: 700 } }, 'Rage Tidy'),
            React.createElement('div', { style: { color: t.textSecondary, fontSize: 10, marginTop: 2 } }, '60-sec burst')
          ),
          React.createElement('div', {
            onClick: () => { handleButtonPress('fog'); startRitual(moods[1]); },
            style: {
              flex: 1, background: 'linear-gradient(135deg, #A78BFA22, #60A5FA22)',
              border: `1.5px solid #A78BFA40`, borderRadius: 16, padding: '14px 12px',
              cursor: 'pointer', transform: pressedButton === 'fog' ? 'scale(0.96)' : 'scale(1)',
              transition: 'transform 0.15s',
            }
          },
            React.createElement('div', { style: { fontSize: 22, marginBottom: 4 } }, '🌫️'),
            React.createElement('div', { style: { color: '#A78BFA', fontSize: 13, fontWeight: 700 } }, 'Fog Sweep'),
            React.createElement('div', { style: { color: t.textSecondary, fontSize: 10, marginTop: 2 } }, 'Calm flow')
          ),
        )
      ),

      // Streak
      React.createElement('div', {
        style: { background: t.card, border: `1.5px solid ${t.border}`, borderRadius: 16, padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }
      },
        React.createElement('div', null,
          React.createElement('div', { style: { color: t.textSecondary, fontSize: 11, fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 4 } }, 'Current Streak'),
          React.createElement('div', { style: { display: 'flex', alignItems: 'baseline', gap: 6 } },
            React.createElement('span', { style: { color: t.text, fontSize: 28, fontWeight: 800 } }, '7'),
            React.createElement('span', { style: { color: t.textSecondary, fontSize: 13 } }, 'days')
          )
        ),
        React.createElement('div', { style: { textAlign: 'right' } },
          React.createElement('div', { style: { display: 'flex', gap: 4, marginBottom: 4 } },
            ['M','T','W','T','F','S','S'].map((d, i) =>
              React.createElement('div', {
                key: i,
                style: {
                  width: 26, height: 26, borderRadius: 8,
                  background: i < 7 ? t.primary : t.cardAlt,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 9, fontWeight: 700,
                  color: i < 7 ? '#fff' : t.textMuted,
                }
              }, d)
            )
          ),
          React.createElement('div', { style: { color: t.primary, fontSize: 11, fontWeight: 600 } }, '🔥 All clean this week')
        )
      )
    )
  );

  const RitualScreen = () => {
    const mood = activeRitual || moods[0];
    const tasks = ritualTasks[mood.id] || ritualTasks.frustrated;
    const ring = progressRing(timer, 60, 140, 8);

    if (ritualPhase === 'scan') {
      return React.createElement('div', { style: { flex: 1, padding: '0 16px', display: 'flex', flexDirection: 'column', alignItems: 'center' } },
        React.createElement('div', { style: { width: '100%', background: t.card, borderRadius: 20, padding: '20px 16px', marginBottom: 16, border: `1.5px solid ${t.border}` } },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 } },
            React.createElement('span', { style: { fontSize: 28 } }, mood.emoji),
            React.createElement('div', null,
              React.createElement('div', { style: { color: t.textSecondary, fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' } }, 'Ritual for'),
              React.createElement('div', { style: { color: t.text, fontSize: 18, fontWeight: 800 } }, mood.ritual)
            )
          ),
          React.createElement('div', {
            style: { background: t.inputBg, borderRadius: 14, padding: '40px 16px', border: `2px dashed ${t.border}`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, marginBottom: 12 }
          },
            React.createElement('div', { style: { fontSize: 32 } }, '📷'),
            React.createElement('div', { style: { color: t.text, fontSize: 14, fontWeight: 700, textAlign: 'center' } }, 'Room Scan Active'),
            React.createElement('div', { style: { color: t.textSecondary, fontSize: 12, textAlign: 'center', lineHeight: 1.5 } }, 'Point camera at your space\nWe\'ll find the easiest start point')
          ),
          React.createElement('div', {
            style: { background: `${mood.color}15`, border: `1.5px solid ${mood.color}30`, borderRadius: 12, padding: '12px 14px' }
          },
            React.createElement('div', { style: { color: mood.color, fontSize: 11, fontWeight: 700, marginBottom: 3, textTransform: 'uppercase', letterSpacing: '0.05em' } }, '💡 Suggested'),
            React.createElement('div', { style: { color: t.text, fontSize: 13, fontWeight: 600 } }, mood.desc),
            React.createElement('div', { style: { color: t.textSecondary, fontSize: 11, marginTop: 3 } }, 'Estimated time: under 60 seconds')
          )
        ),
        React.createElement('div', {
          onClick: beginRitual,
          style: {
            width: '100%', background: `linear-gradient(135deg, ${t.primary}, ${t.primary}CC)`,
            borderRadius: 18, padding: '16px', textAlign: 'center', cursor: 'pointer',
            boxShadow: `0 8px 24px ${t.primary}40`,
          }
        },
          React.createElement('div', { style: { color: '#fff', fontSize: 16, fontWeight: 800 } }, 'Start ' + mood.ritual),
          React.createElement('div', { style: { color: 'rgba(255,255,255,0.7)', fontSize: 11, marginTop: 2 } }, '60 seconds · breathing cues included')
        ),
        React.createElement('div', {
          onClick: resetRitual,
          style: { color: t.textSecondary, fontSize: 13, marginTop: 14, cursor: 'pointer', textDecoration: 'underline' }
        }, 'Pick a different mood')
      );
    }

    if (ritualPhase === 'complete') {
      return React.createElement('div', { style: { flex: 1, padding: '0 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' } },
        React.createElement('div', { style: { fontSize: 64, marginBottom: 12 } }, '✨'),
        React.createElement('div', { style: { color: t.primary, fontSize: 22, fontWeight: 800, marginBottom: 6 } }, 'Space cleared.'),
        React.createElement('div', { style: { color: t.textSecondary, fontSize: 14, lineHeight: 1.6, marginBottom: 24, maxWidth: 260 } },
          `You swept out the ${mood.label.toLowerCase()} and made room for something better.`
        ),
        React.createElement('div', { style: { display: 'flex', gap: 12, marginBottom: 24 } },
          [{ label: 'Tasks', value: tasks.length + '/' + tasks.length }, { label: 'Time', value: (60 - timer) + 's' }, { label: 'Mood', value: mood.emoji }].map((stat, i) =>
            React.createElement('div', { key: i, style: { flex: 1, background: t.card, border: `1.5px solid ${t.border}`, borderRadius: 14, padding: '12px 8px', textAlign: 'center' } },
              React.createElement('div', { style: { color: t.text, fontSize: 18, fontWeight: 800 } }, stat.value),
              React.createElement('div', { style: { color: t.textSecondary, fontSize: 10, marginTop: 2, fontWeight: 600 } }, stat.label)
            )
          )
        ),
        React.createElement('div', {
          onClick: resetRitual,
          style: { width: '100%', background: `linear-gradient(135deg, ${t.primary}, ${t.primary}CC)`, borderRadius: 18, padding: '16px', textAlign: 'center', cursor: 'pointer', boxShadow: `0 8px 24px ${t.primary}40` }
        },
          React.createElement('div', { style: { color: '#fff', fontSize: 15, fontWeight: 800 } }, 'Done · Back Home')
        )
      );
    }

    return React.createElement('div', { style: { flex: 1, padding: '0 16px', display: 'flex', flexDirection: 'column' } },
      // Timer ring
      React.createElement('div', { style: { display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '10px 0 16px', position: 'relative' } },
        React.createElement('svg', { width: 140, height: 140, style: { transform: 'rotate(-90deg)' } },
          React.createElement('circle', { cx: 70, cy: 70, r: ring.r, fill: 'none', stroke: t.border, strokeWidth: 8 }),
          React.createElement('circle', {
            cx: 70, cy: 70, r: ring.r, fill: 'none',
            stroke: mood.color, strokeWidth: 8,
            strokeDasharray: ring.circ,
            strokeDashoffset: ring.filled,
            strokeLinecap: 'round',
            style: { transition: 'stroke-dashoffset 1s linear' }
          })
        ),
        React.createElement('div', { style: { position: 'absolute', textAlign: 'center' } },
          React.createElement('div', { style: { color: t.text, fontSize: 28, fontWeight: 800, lineHeight: 1 } }, formatTime(timer)),
          React.createElement('div', {
            style: { color: mood.color, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: 4,
              animation: isRunning ? 'pulse 3s infinite' : 'none' }
          }, breathPhase === 'inhale' ? '↑ Inhale' : breathPhase === 'hold' ? '· Hold' : '↓ Exhale')
        )
      ),

      // Tasks
      React.createElement('div', { style: { flex: 1 } },
        React.createElement('div', { style: { color: t.textSecondary, fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 } }, 'Ritual Steps'),
        React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 8 } },
          tasks.map((task, i) => {
            const done = completedTasks.includes(task.id);
            return React.createElement('div', {
              key: task.id,
              onClick: () => toggleTask(task.id),
              style: {
                background: done ? `${mood.color}15` : t.card,
                border: `1.5px solid ${done ? mood.color + '50' : t.border}`,
                borderRadius: 14, padding: '12px 14px',
                display: 'flex', alignItems: 'center', gap: 12,
                cursor: 'pointer', transition: 'all 0.2s',
              }
            },
              React.createElement('div', {
                style: {
                  width: 22, height: 22, borderRadius: 7,
                  border: `2px solid ${done ? mood.color : t.border}`,
                  background: done ? mood.color : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0, transition: 'all 0.2s',
                }
              }, done && React.createElement('span', { style: { color: '#fff', fontSize: 12, fontWeight: 800, lineHeight: 1 } }, '✓')),
              React.createElement('div', { style: { flex: 1 } },
                React.createElement('div', {
                  style: { color: done ? t.textSecondary : t.text, fontSize: 13, fontWeight: 600, textDecoration: done ? 'line-through' : 'none', transition: 'all 0.2s' }
                }, task.action),
                React.createElement('div', { style: { color: t.textMuted, fontSize: 10, marginTop: 2 } }, task.duration + 's')
              )
            );
          })
        )
      ),

      // Sound bar
      React.createElement('div', {
        style: { background: t.card, borderRadius: 14, padding: '10px 14px', marginTop: 12, display: 'flex', alignItems: 'center', gap: 8, border: `1.5px solid ${t.border}` }
      },
        React.createElement('span', { style: { fontSize: 14 } }, '🔊'),
        React.createElement('span', { style: { color: t.textSecondary, fontSize: 11, fontWeight: 600 } }, soundscapes.find(s => s.id === activeSoundscape)?.label),
        React.createElement('div', { style: { flex: 1, height: 3, background: t.border, borderRadius: 2, overflow: 'hidden' } },
          React.createElement('div', { style: { width: '60%', height: '100%', background: t.primary, borderRadius: 2, animation: isRunning ? 'soundwave 2s ease-in-out infinite alternate' : 'none' } })
        )
      )
    );
  };

  const HistoryScreen = () => {
    const moodCounts = {};
    historyData.forEach(e => { moodCounts[e.mood] = (moodCounts[e.mood] || 0) + 1; });
    const topMood = Object.entries(moodCounts).sort((a, b) => b[1] - a[1])[0];

    return React.createElement('div', { style: { flex: 1, overflowY: 'auto', padding: '0 16px 16px' } },
      // Stats row
      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 20 } },
        [
          { label: 'Rituals', value: historyData.filter(e => e.completed).length, color: t.primary },
          { label: 'Avg time', value: '54s', color: t.accent3 },
          { label: 'Top mood', value: getMoodObj(topMood?.[0]).emoji, color: t.secondary },
        ].map((stat, i) =>
          React.createElement('div', { key: i, style: { background: t.card, border: `1.5px solid ${t.border}`, borderRadius: 14, padding: '12px 10px', textAlign: 'center' } },
            React.createElement('div', { style: { color: stat.color, fontSize: 20, fontWeight: 800 } }, stat.value),
            React.createElement('div', { style: { color: t.textSecondary, fontSize: 10, marginTop: 2, fontWeight: 600 } }, stat.label)
          )
        )
      ),

      // Clutter pattern
      React.createElement('div', { style: { background: t.card, border: `1.5px solid ${t.border}`, borderRadius: 16, padding: '14px', marginBottom: 20 } },
        React.createElement('div', { style: { color: t.text, fontSize: 14, fontWeight: 700, marginBottom: 12 } }, 'Clutter Pattern'),
        React.createElement('div', { style: { color: t.textSecondary, fontSize: 11, marginBottom: 10 } }, 'When stress tends to accumulate'),
        Object.entries(moodCounts).sort((a, b) => b[1] - a[1]).map(([moodId, count]) => {
          const m = getMoodObj(moodId);
          const pct = (count / historyData.length) * 100;
          return React.createElement('div', { key: moodId, style: { marginBottom: 10 } },
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: 5 } },
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6 } },
                React.createElement('span', { style: { fontSize: 14 } }, m.emoji),
                React.createElement('span', { style: { color: t.text, fontSize: 12, fontWeight: 600 } }, m.label)
              ),
              React.createElement('span', { style: { color: t.textSecondary, fontSize: 11 } }, count + 'x')
            ),
            React.createElement('div', { style: { height: 6, background: t.inputBg, borderRadius: 4, overflow: 'hidden' } },
              React.createElement('div', {
                style: { width: pct + '%', height: '100%', background: m.color, borderRadius: 4, transition: 'width 0.6s ease' }
              })
            )
          );
        })
      ),

      // History list
      React.createElement('div', { style: { color: t.textSecondary, fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 } }, 'Recent Rituals'),
      React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 8 } },
        historyData.map((entry, i) => {
          const m = getMoodObj(entry.mood);
          return React.createElement('div', {
            key: i,
            style: { background: t.card, border: `1.5px solid ${t.border}`, borderRadius: 14, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 12 }
          },
            React.createElement('span', { style: { fontSize: 22, flexShrink: 0 } }, m.emoji),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
                React.createElement('span', { style: { color: t.text, fontSize: 13, fontWeight: 700 } }, entry.ritual),
                React.createElement('span', { style: { color: t.textMuted, fontSize: 11 } }, entry.time)
              ),
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginTop: 3 } },
                React.createElement('span', { style: { color: t.textSecondary, fontSize: 11 } }, entry.date),
                entry.completed && React.createElement('span', {
                  style: { background: `${t.primary}20`, color: t.primary, fontSize: 9, fontWeight: 700, padding: '1px 6px', borderRadius: 4, textTransform: 'uppercase', letterSpacing: '0.05em' }
                }, entry.duration + 's ✓')
              )
            )
          );
        })
      )
    );
  };

  const SettingsScreen = () => (
    React.createElement('div', { style: { flex: 1, overflowY: 'auto', padding: '0 16px 16px' } },
      // Profile
      React.createElement('div', {
        style: { background: t.card, border: `1.5px solid ${t.border}`, borderRadius: 16, padding: '16px', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 14 }
      },
        React.createElement('div', {
          style: { width: 52, height: 52, borderRadius: 18, background: `linear-gradient(135deg, ${t.primary}, ${t.accent3})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }
        }, '🧹'),
        React.createElement('div', null,
          React.createElement('div', { style: { color: t.text, fontSize: 16, fontWeight: 800 } }, 'Your Mop Profile'),
          React.createElement('div', { style: { color: t.textSecondary, fontSize: 12, marginTop: 2 } }, '7-day streak · 14 rituals completed')
        )
      ),

      // Theme toggle
      React.createElement('div', { style: { color: t.textSecondary, fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 } }, 'Appearance'),
      React.createElement('div', {
        style: { background: t.card, border: `1.5px solid ${t.border}`, borderRadius: 16, overflow: 'hidden', marginBottom: 16 }
      },
        React.createElement('div', {
          onClick: () => { handleButtonPress('theme'); setTheme(prev => prev === 'dark' ? 'light' : 'dark'); },
          style: { padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', borderBottom: `1px solid ${t.border}` }
        },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12 } },
            React.createElement('span', { style: { fontSize: 16 } }, theme === 'dark' ? '🌙' : '☀️'),
            React.createElement('div', null,
              React.createElement('div', { style: { color: t.text, fontSize: 13, fontWeight: 600 } }, theme === 'dark' ? 'Dark Mode' : 'Light Mode'),
              React.createElement('div', { style: { color: t.textSecondary, fontSize: 11 } }, 'Tap to switch')
            )
          ),
          React.createElement('div', {
            style: {
              width: 42, height: 24, borderRadius: 12,
              background: theme === 'dark' ? t.primary : t.border,
              position: 'relative', transition: 'background 0.3s',
            }
          },
            React.createElement('div', {
              style: {
                position: 'absolute', width: 18, height: 18, borderRadius: 9, background: '#fff',
                top: 3, left: theme === 'dark' ? 21 : 3, transition: 'left 0.3s',
                boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
              }
            })
          )
        )
      ),

      // Soundscapes
      React.createElement('div', { style: { color: t.textSecondary, fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 } }, 'Soundscape'),
      React.createElement('div', {
        style: { background: t.card, border: `1.5px solid ${t.border}`, borderRadius: 16, overflow: 'hidden', marginBottom: 16 }
      },
        soundscapes.map((s, i) =>
          React.createElement('div', {
            key: s.id,
            onClick: () => setActiveSoundscape(s.id),
            style: {
              padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer',
              borderBottom: i < soundscapes.length - 1 ? `1px solid ${t.border}` : 'none',
              background: activeSoundscape === s.id ? t.primaryDim : 'transparent',
            }
          },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12 } },
              React.createElement('span', { style: { fontSize: 16 } }, s.icon),
              React.createElement('div', null,
                React.createElement('div', { style: { color: t.text, fontSize: 13, fontWeight: 600 } }, s.label),
                React.createElement('div', { style: { color: t.textSecondary, fontSize: 11 } }, s.desc)
              )
            ),
            activeSoundscape === s.id && React.createElement('div', {
              style: { width: 18, height: 18, borderRadius: 9, background: t.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: '#fff', fontWeight: 800 }
            }, '✓')
          )
        )
      ),

      // Preferences
      React.createElement('div', { style: { color: t.textSecondary, fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 } }, 'Preferences'),
      React.createElement('div', {
        style: { background: t.card, border: `1.5px solid ${t.border}`, borderRadius: 16, overflow: 'hidden' }
      },
        [
          { label: 'Notifications', sub: 'Stress spike reminders', val: notifications, toggle: () => setNotifications(p => !p) },
          { label: 'Haptic Feedback', sub: 'Vibration on ritual steps', val: haptics, toggle: () => setHaptics(p => !p) },
        ].map((item, i) =>
          React.createElement('div', {
            key: i,
            onClick: item.toggle,
            style: { padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', borderBottom: i < 1 ? `1px solid ${t.border}` : 'none' }
          },
            React.createElement('div', null,
              React.createElement('div', { style: { color: t.text, fontSize: 13, fontWeight: 600 } }, item.label),
              React.createElement('div', { style: { color: t.textSecondary, fontSize: 11 } }, item.sub)
            ),
            React.createElement('div', {
              style: { width: 42, height: 24, borderRadius: 12, background: item.val ? t.primary : t.border, position: 'relative', transition: 'background 0.3s' }
            },
              React.createElement('div', {
                style: { position: 'absolute', width: 18, height: 18, borderRadius: 9, background: '#fff', top: 3, left: item.val ? 21 : 3, transition: 'left 0.3s', boxShadow: '0 1px 4px rgba(0,0,0,0.3)' }
              })
            )
          )
        )
      )
    )
  );

  const screens = {
    home: HomeScreen,
    ritual: RitualScreen,
    history: HistoryScreen,
    settings: SettingsScreen,
  };

  const ScreenComponent = screens[activeTab] || HomeScreen;

  const navItems = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'ritual', label: 'Ritual', icon: '✨' },
    { id: 'history', label: 'History', icon: '📊' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ];

  const screenTitles = { home: 'MoodMop', ritual: activeRitual ? activeRitual.ritual : 'Ritual', history: 'Clutter Log', settings: 'Settings' };

  return React.createElement('div', {
    style: { minHeight: '100vh', background: '#1A1A2E', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Plus Jakarta Sans', sans-serif" }
  },
    React.createElement('style', null, `
      @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.5; } }
      @keyframes soundwave { 0% { width: 30%; } 100% { width: 90%; } }
      ::-webkit-scrollbar { width: 0; }
    `),

    React.createElement('div', {
      style: { width: 375, height: 812, background: t.bg, borderRadius: 50, overflow: 'hidden', position: 'relative', boxShadow: '0 40px 80px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column' }
    },

      // Dynamic Island
      React.createElement('div', {
        style: { position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)', width: 120, height: 34, background: '#000', borderRadius: 20, zIndex: 50 }
      }),

      // Status bar
      React.createElement('div', {
        style: { background: t.statusBar, paddingTop: 14, paddingBottom: 0, paddingLeft: 20, paddingRight: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', height: 56, flexShrink: 0, zIndex: 10 }
      },
        React.createElement('span', { style: { color: t.text, fontSize: 12, fontWeight: 700, paddingBottom: 6 } }, '9:41'),
        React.createElement('div', { style: { display: 'flex', gap: 6, alignItems: 'center', paddingBottom: 6 } },
          React.createElement('span', { style: { color: t.text, fontSize: 11 } }, '●●●'),
          React.createElement('span', { style: { color: t.text, fontSize: 11 } }, '▲'),
          React.createElement('span', { style: { color: t.text, fontSize: 11 } }, '🔋')
        )
      ),

      // Screen header
      React.createElement('div', {
        style: { padding: '12px 16px 0', flexShrink: 0, borderBottom: `1px solid ${t.border}` }
      },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 12 } },
          React.createElement('h2', {
            style: { color: t.text, fontSize: 20, fontWeight: 800, margin: 0, letterSpacing: '-0.02em' }
          }, screenTitles[activeTab]),
          activeTab === 'home' && React.createElement('div', {
            style: { display: 'flex', alignItems: 'center', gap: 6, background: t.primaryDim, borderRadius: 20, padding: '5px 12px', cursor: 'pointer' }
          },
            React.createElement('span', { style: { fontSize: 12 } }, '🔥'),
            React.createElement('span', { style: { color: t.primary, fontSize: 12, fontWeight: 700 } }, '7 days')
          ),
          activeTab === 'settings' && React.createElement('div', {
            onClick: () => setTheme(prev => prev === 'dark' ? 'light' : 'dark'),
            style: { width: 34, height: 34, borderRadius: 12, background: t.card, border: `1.5px solid ${t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 16 }
          }, theme === 'dark' ? '☀️' : '🌙')
        )
      ),

      // Screen content
      React.createElement('div', { style: { flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', paddingTop: 12 } },
        React.createElement(ScreenComponent)
      ),

      // Bottom Nav
      React.createElement('div', {
        style: { background: t.navBg, borderTop: `1px solid ${t.border}`, padding: '8px 0 20px', display: 'flex', justifyContent: 'space-around', flexShrink: 0, zIndex: 10 }
      },
        navItems.map(item =>
          React.createElement('div', {
            key: item.id,
            onClick: () => { handleButtonPress('nav-' + item.id); setActiveTab(item.id); },
            style: {
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, padding: '4px 16px',
              cursor: 'pointer', transform: pressedButton === 'nav-' + item.id ? 'scale(0.9)' : 'scale(1)', transition: 'transform 0.15s',
            }
          },
            React.createElement('div', {
              style: {
                fontSize: 20, lineHeight: 1,
                filter: activeTab === item.id ? 'none' : 'grayscale(1) opacity(0.5)',
                transition: 'filter 0.2s',
              }
            }, item.icon),
            React.createElement('span', {
              style: { fontSize: 10, fontWeight: activeTab === item.id ? 700 : 500, color: activeTab === item.id ? t.primary : t.textMuted, transition: 'color 0.2s' }
            }, item.label)
          )
        )
      )
    )
  );
}
