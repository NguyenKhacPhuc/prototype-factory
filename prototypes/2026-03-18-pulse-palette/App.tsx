function App() {
  const { useState, useEffect, useRef } = React;

  // Load Google Fonts
  const fontStyle = `
    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    ::-webkit-scrollbar { display: none; }
    @keyframes pulse { 0%,100%{opacity:1;} 50%{opacity:0.5;} }
    @keyframes slideUp { from{transform:translateY(20px);opacity:0;} to{transform:translateY(0);opacity:1;} }
    @keyframes fadeIn { from{opacity:0;} to{opacity:1;} }
    @keyframes ripple { 0%{transform:scale(0);opacity:1;} 100%{transform:scale(2.5);opacity:0;} }
    @keyframes glow { 0%,100%{box-shadow:0 0 20px rgba(225,112,85,0.3);} 50%{box-shadow:0 0 40px rgba(225,112,85,0.6);} }
    @keyframes spin { from{transform:rotate(0deg);} to{transform:rotate(360deg);} }
    @keyframes breathe { 0%,100%{transform:scale(1);} 50%{transform:scale(1.08);} }
  `;

  const colors = {
    bg: '#F5F0EB',
    bgDark: '#EDE7DF',
    charcoal: '#2D3436',
    accent: '#E17055',
    accentLight: '#F0A090',
    cream: '#FAF0E6',
    warm1: '#8B6F5E',
    warm2: '#C4A882',
    warm3: '#D4C4B0',
    warm4: '#E8DDD4',
    green: '#6BAB8A',
    greenLight: '#A8D5BA',
    yellow: '#E8C547',
    yellowLight: '#F5DFA0',
    blue: '#6B9EAB',
    blueLight: '#A8CDD5',
    red: '#D4615A',
    redLight: '#E8A5A0',
    muted: '#9B8E87',
    border: 'rgba(45,52,54,0.1)',
  };

  const font = "'DM Sans', sans-serif";
  const mono = "'DM Mono', monospace";

  const [activeTab, setActiveTab] = useState('home');
  const [pressedBtn, setPressedBtn] = useState(null);
  const [time, setTime] = useState('9:41');
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [hydrationCount, setHydrationCount] = useState(4);
  const [moodSelected, setMoodSelected] = useState('energized');
  const [bodyScore, setBodyScore] = useState(74);
  const [animateScore, setAnimateScore] = useState(false);
  const [toggleStates, setToggleStates] = useState({ sleep: true, hrv: true, cycle: false });
  const [activeMetric, setActiveMetric] = useState('hrv');

  useEffect(() => {
    const t = setInterval(() => {
      const now = new Date();
      setTime(`${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`);
    }, 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    setAnimateScore(true);
    const t = setTimeout(() => setAnimateScore(false), 600);
    return () => clearTimeout(t);
  }, [activeTab]);

  const handlePress = (id, fn) => {
    setPressedBtn(id);
    setTimeout(() => setPressedBtn(null), 180);
    if (fn) fn();
  };

  const getReadinessColor = (score) => {
    if (score >= 80) return { color: colors.green, label: 'Peak', bg: colors.greenLight, desc: 'Body is primed for intensity' };
    if (score >= 65) return { color: colors.yellow, label: 'Good', bg: colors.yellowLight, desc: 'Moderate training recommended' };
    if (score >= 45) return { color: colors.accentLight, label: 'Moderate', bg: '#F5DDD8', desc: 'Light activity works well' };
    return { color: colors.red, label: 'Rest', bg: colors.redLight, desc: 'Recovery day advised' };
  };

  const readiness = getReadinessColor(bodyScore);

  // ─── STATUS BAR ───
  const StatusBar = () => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 24px 8px', fontSize: 12, fontWeight: 600, color: colors.charcoal, fontFamily: mono }}>
      <span>{time}</span>
      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        {React.createElement(window.lucide.Wifi, { size: 14, color: colors.charcoal })}
        {React.createElement(window.lucide.Battery, { size: 14, color: colors.charcoal })}
      </div>
    </div>
  );

  // ─── DYNAMIC ISLAND ───
  const DynamicIsland = () => (
    <div style={{ position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)', width: 120, height: 34, background: '#1a1a1a', borderRadius: 20, zIndex: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
      <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#2a2a2a', border: '1px solid #333' }} />
      <div style={{ width: 36, height: 10, borderRadius: 5, background: '#2a2a2a', border: '1px solid #333' }} />
    </div>
  );

  // ─── BOTTOM NAV ───
  const navItems = [
    { id: 'home', icon: window.lucide.Activity, label: 'Pulse' },
    { id: 'workout', icon: window.lucide.Zap, label: 'Move' },
    { id: 'recovery', icon: window.lucide.Heart, label: 'Recover' },
    { id: 'trends', icon: window.lucide.TrendingUp, label: 'Trends' },
  ];

  const BottomNav = () => (
    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: colors.cream, borderTop: `1px solid ${colors.border}`, display: 'flex', padding: '10px 0 20px', zIndex: 10 }}>
      {navItems.map(({ id, icon, label }) => {
        const active = activeTab === id;
        return (
          <div key={id} onClick={() => handlePress(`nav-${id}`, () => setActiveTab(id))}
            style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, cursor: 'pointer', transform: pressedBtn === `nav-${id}` ? 'scale(0.88)' : 'scale(1)', transition: 'transform 0.15s' }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: active ? colors.accent : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}>
              {React.createElement(icon, { size: 20, color: active ? '#fff' : colors.muted })}
            </div>
            <span style={{ fontSize: 10, fontWeight: active ? 600 : 400, color: active ? colors.accent : colors.muted, fontFamily: font }}>{label}</span>
          </div>
        );
      })}
    </div>
  );

  // ─── SCREEN: HOME ───
  const HomeScreen = () => {
    const signals = [
      { label: 'Sleep', value: '7h 12m', score: 82, icon: window.lucide.Moon, color: colors.blue },
      { label: 'HRV', value: '52 ms', score: 68, icon: window.lucide.Activity, color: colors.green },
      { label: 'Soreness', value: 'Mild', score: 55, icon: window.lucide.Zap, color: colors.yellow },
      { label: 'Stress', value: 'Low', score: 78, icon: window.lucide.Wind, color: colors.accentLight },
    ];

    return (
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 0 90px' }}>
        {/* Header */}
        <div style={{ padding: '8px 24px 20px', animation: 'fadeIn 0.4s ease' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <p style={{ fontSize: 13, color: colors.muted, fontFamily: font, fontWeight: 400 }}>Wednesday, Mar 18</p>
              <h1 style={{ fontSize: 22, fontWeight: 700, color: colors.charcoal, fontFamily: font, marginTop: 2 }}>Good morning, Alex</h1>
            </div>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: `linear-gradient(135deg, ${colors.accent}, ${colors.warm2})`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#fff', fontWeight: 700, fontSize: 14, fontFamily: font }}>A</span>
            </div>
          </div>
        </div>

        {/* Body Readiness Score */}
        <div style={{ margin: '0 20px 20px', background: colors.cream, borderRadius: 24, padding: '24px', border: `1px solid ${colors.border}`, animation: 'slideUp 0.4s ease', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -30, right: -30, width: 120, height: 120, borderRadius: '50%', background: readiness.bg, opacity: 0.5 }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <p style={{ fontSize: 11, fontWeight: 600, color: colors.muted, letterSpacing: 1, textTransform: 'uppercase', fontFamily: font }}>Body Readiness</p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 8 }}>
                <span style={{ fontSize: 56, fontWeight: 700, color: readiness.color, fontFamily: font, lineHeight: 1, animation: animateScore ? 'pulse 0.6s ease' : 'none' }}>{bodyScore}</span>
                <span style={{ fontSize: 14, color: colors.muted, fontFamily: font }}>/100</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
                <div style={{ background: readiness.color, borderRadius: 20, padding: '4px 12px' }}>
                  <span style={{ color: '#fff', fontSize: 12, fontWeight: 600, fontFamily: font }}>{readiness.label}</span>
                </div>
                <span style={{ fontSize: 12, color: colors.muted, fontFamily: font }}>{readiness.desc}</span>
              </div>
            </div>
            {/* Donut ring */}
            <div style={{ position: 'relative', width: 80, height: 80 }}>
              <svg width="80" height="80" style={{ transform: 'rotate(-90deg)' }}>
                <circle cx="40" cy="40" r="32" fill="none" stroke={colors.warm4} strokeWidth="6" />
                <circle cx="40" cy="40" r="32" fill="none" stroke={readiness.color} strokeWidth="6"
                  strokeDasharray={`${(bodyScore / 100) * 201} 201`} strokeLinecap="round" />
              </svg>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {React.createElement(window.lucide.HeartPulse || window.lucide.Heart, { size: 20, color: readiness.color })}
              </div>
            </div>
          </div>
        </div>

        {/* Signal Cards */}
        <div style={{ padding: '0 20px', marginBottom: 20 }}>
          <p style={{ fontSize: 11, fontWeight: 600, color: colors.muted, letterSpacing: 1, textTransform: 'uppercase', fontFamily: font, marginBottom: 12 }}>Today's Signals</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {signals.map((s) => (
              <div key={s.label} style={{ background: colors.cream, borderRadius: 16, padding: '16px', border: `1px solid ${colors.border}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                  <span style={{ fontSize: 11, color: colors.muted, fontWeight: 500, fontFamily: font }}>{s.label}</span>
                  {React.createElement(s.icon, { size: 14, color: s.color })}
                </div>
                <p style={{ fontSize: 16, fontWeight: 700, color: colors.charcoal, fontFamily: font }}>{s.value}</p>
                <div style={{ marginTop: 8, background: colors.warm4, borderRadius: 4, height: 4, overflow: 'hidden' }}>
                  <div style={{ width: `${s.score}%`, height: '100%', background: s.color, borderRadius: 4, transition: 'width 1s ease' }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Today's Recommendation */}
        <div style={{ margin: '0 20px', background: `linear-gradient(135deg, ${colors.accent}15, ${colors.accent}05)`, borderRadius: 20, padding: '20px', border: `1px solid ${colors.accent}30` }}>
          <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
            <div style={{ width: 44, height: 44, borderRadius: 14, background: colors.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              {React.createElement(window.lucide.Sparkles || window.lucide.Star, { size: 20, color: '#fff' })}
            </div>
            <div>
              <p style={{ fontSize: 11, fontWeight: 600, color: colors.accent, letterSpacing: 1, textTransform: 'uppercase', fontFamily: font }}>Recommended Today</p>
              <p style={{ fontSize: 16, fontWeight: 700, color: colors.charcoal, fontFamily: font, marginTop: 4 }}>20-min Moderate Flow</p>
              <p style={{ fontSize: 13, color: colors.muted, fontFamily: font, marginTop: 4, lineHeight: 1.5 }}>Your HRV is recovering — mix of mobility and light cardio ideal.</p>
              <div onClick={() => { setActiveTab('workout'); }} style={{ marginTop: 12, display: 'inline-flex', alignItems: 'center', gap: 6, background: colors.accent, borderRadius: 20, padding: '8px 16px', cursor: 'pointer' }}>
                <span style={{ color: '#fff', fontSize: 12, fontWeight: 600, fontFamily: font }}>See Plan</span>
                {React.createElement(window.lucide.ArrowRight, { size: 12, color: '#fff' })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ─── SCREEN: WORKOUT ───
  const WorkoutScreen = () => {
    const moods = [
      { id: 'energized', label: 'Energized', icon: '⚡', color: colors.yellow },
      { id: 'calm', label: 'Calm', icon: '🌊', color: colors.blue },
      { id: 'stressed', label: 'Stressed', icon: '🌪', color: colors.accent },
      { id: 'tired', label: 'Tired', icon: '🌙', color: colors.warm2 },
    ];

    const workouts = {
      energized: [
        { name: 'HIIT Sprint Intervals', duration: '25 min', intensity: 'High', tag: 'Cardio', color: colors.yellow },
        { name: 'Power Yoga Flow', duration: '30 min', intensity: 'Medium', tag: 'Flexibility', color: colors.green },
        { name: 'Strength Circuit', duration: '35 min', intensity: 'High', tag: 'Strength', color: colors.accent },
      ],
      calm: [
        { name: 'Breathwork & Stretch', duration: '20 min', intensity: 'Low', tag: 'Recovery', color: colors.blue },
        { name: 'Slow Flow Yoga', duration: '25 min', intensity: 'Low', tag: 'Flexibility', color: colors.blueLight },
        { name: 'Walking Meditation', duration: '30 min', intensity: 'Low', tag: 'Mindful', color: colors.greenLight },
      ],
      stressed: [
        { name: 'Box Breathing Run', duration: '20 min', intensity: 'Medium', tag: 'Cardio', color: colors.accent },
        { name: 'Release Yoga', duration: '25 min', intensity: 'Low', tag: 'Recovery', color: colors.accentLight },
        { name: 'Light Mobility Work', duration: '15 min', intensity: 'Low', tag: 'Mobility', color: colors.warm2 },
      ],
      tired: [
        { name: 'Gentle Stretch', duration: '15 min', intensity: 'Very Low', tag: 'Recovery', color: colors.warm3 },
        { name: 'Evening Wind Down', duration: '20 min', intensity: 'Very Low', tag: 'Rest', color: colors.blueLight },
        { name: 'Foam Roll Session', duration: '10 min', intensity: 'Low', tag: 'Recovery', color: colors.warm2 },
      ],
    };

    const currentWorkouts = workouts[moodSelected] || workouts.energized;

    return (
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 0 90px' }}>
        <div style={{ padding: '8px 24px 20px' }}>
          <p style={{ fontSize: 13, color: colors.muted, fontFamily: font }}>Personalized for you</p>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: colors.charcoal, fontFamily: font, marginTop: 2 }}>Move</h1>
        </div>

        {/* Mood Selector */}
        <div style={{ padding: '0 20px', marginBottom: 24 }}>
          <p style={{ fontSize: 11, fontWeight: 600, color: colors.muted, letterSpacing: 1, textTransform: 'uppercase', fontFamily: font, marginBottom: 12 }}>How are you feeling?</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {moods.map((m) => {
              const active = moodSelected === m.id;
              return (
                <div key={m.id} onClick={() => handlePress(`mood-${m.id}`, () => setMoodSelected(m.id))}
                  style={{ background: active ? m.color + '25' : colors.cream, border: `1.5px solid ${active ? m.color : colors.border}`, borderRadius: 14, padding: '12px 14px', cursor: 'pointer', transform: pressedBtn === `mood-${m.id}` ? 'scale(0.94)' : 'scale(1)', transition: 'all 0.15s', display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 20 }}>{m.icon}</span>
                  <span style={{ fontSize: 13, fontWeight: active ? 700 : 500, color: active ? m.color : colors.charcoal, fontFamily: font }}>{m.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Workout Cards */}
        <div style={{ padding: '0 20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <p style={{ fontSize: 11, fontWeight: 600, color: colors.muted, letterSpacing: 1, textTransform: 'uppercase', fontFamily: font }}>Suggested Sessions</p>
            <span style={{ fontSize: 12, color: colors.accent, fontWeight: 600, fontFamily: font }}>3 matched</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {currentWorkouts.map((w, i) => (
              <div key={w.name} onClick={() => handlePress(`wk-${i}`, () => setSelectedWorkout(selectedWorkout === i ? null : i))}
                style={{ background: colors.cream, borderRadius: 18, padding: '18px', border: `1px solid ${selectedWorkout === i ? w.color : colors.border}`, cursor: 'pointer', transform: pressedBtn === `wk-${i}` ? 'scale(0.97)' : 'scale(1)', transition: 'all 0.15s' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                      <span style={{ fontSize: 10, fontWeight: 600, background: w.color + '30', color: w.color, padding: '2px 8px', borderRadius: 10, fontFamily: font }}>{w.tag}</span>
                      <span style={{ fontSize: 10, color: colors.muted, fontFamily: font }}>{w.intensity} intensity</span>
                    </div>
                    <p style={{ fontSize: 15, fontWeight: 700, color: colors.charcoal, fontFamily: font }}>{w.name}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: 16, fontWeight: 700, color: w.color, fontFamily: font }}>{w.duration}</p>
                    {React.createElement(window.lucide.ChevronDown, { size: 16, color: colors.muted, style: { transform: selectedWorkout === i ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' } })}
                  </div>
                </div>
                {selectedWorkout === i && (
                  <div style={{ marginTop: 14, paddingTop: 14, borderTop: `1px solid ${colors.border}`, animation: 'slideUp 0.2s ease' }}>
                    <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                      {['Warm up', 'Main', 'Cool down'].map((phase, pi) => (
                        <div key={phase} style={{ flex: 1, background: pi === 1 ? w.color + '20' : colors.bgDark, borderRadius: 10, padding: '8px', textAlign: 'center' }}>
                          <p style={{ fontSize: 10, color: colors.muted, fontFamily: font }}>{phase}</p>
                          <p style={{ fontSize: 12, fontWeight: 600, color: pi === 1 ? w.color : colors.charcoal, fontFamily: font }}>{['5 min', '15 min', '5 min'][pi]}</p>
                        </div>
                      ))}
                    </div>
                    <div style={{ background: w.color, borderRadius: 12, padding: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                      {React.createElement(window.lucide.Play, { size: 16, color: '#fff' })}
                      <span style={{ color: '#fff', fontWeight: 700, fontSize: 14, fontFamily: font }}>Start Session</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // ─── SCREEN: RECOVERY ───
  const RecoveryScreen = () => {
    const hydrationGoal = 8;

    const recoveryTips = [
      { icon: window.lucide.Moon, title: 'Sleep Quality', value: '82%', desc: 'Above your 7-day avg', color: colors.blue, good: true },
      { icon: window.lucide.Wind, title: 'HRV Trend', value: '+8ms', desc: 'Recovering steadily', color: colors.green, good: true },
      { icon: window.lucide.Thermometer, title: 'Resting HR', value: '58 bpm', desc: '2 below average', color: colors.accent, good: true },
      { icon: window.lucide.Battery, title: 'Energy Level', value: 'Moderate', desc: 'Not fully restored', color: colors.yellow, good: false },
    ];

    const stretches = [
      { name: 'Hip Flexor Release', time: '2 min', done: true },
      { name: 'Thoracic Rotation', time: '3 min', done: true },
      { name: 'Hamstring Stretch', time: '2 min', done: false },
      { name: 'Shoulder Opener', time: '3 min', done: false },
    ];

    return (
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 0 90px' }}>
        <div style={{ padding: '8px 24px 20px' }}>
          <p style={{ fontSize: 13, color: colors.muted, fontFamily: font }}>Rest & restore</p>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: colors.charcoal, fontFamily: font, marginTop: 2 }}>Recovery</h1>
        </div>

        {/* Hydration */}
        <div style={{ margin: '0 20px 20px', background: colors.cream, borderRadius: 20, padding: '20px', border: `1px solid ${colors.border}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div>
              <p style={{ fontSize: 11, fontWeight: 600, color: colors.muted, letterSpacing: 1, textTransform: 'uppercase', fontFamily: font }}>Hydration</p>
              <p style={{ fontSize: 22, fontWeight: 700, color: colors.charcoal, fontFamily: font, marginTop: 4 }}>{hydrationCount} <span style={{ fontSize: 13, fontWeight: 400, color: colors.muted }}>/ {hydrationGoal} glasses</span></p>
            </div>
            {React.createElement(window.lucide.Droplets, { size: 28, color: colors.blue })}
          </div>
          <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
            {Array.from({ length: hydrationGoal }).map((_, i) => (
              <div key={i} onClick={() => handlePress(`hyd-${i}`, () => setHydrationCount(i + 1))}
                style={{ flex: 1, height: 32, borderRadius: 8, background: i < hydrationCount ? colors.blue : colors.warm4, cursor: 'pointer', transition: 'background 0.2s', transform: pressedBtn === `hyd-${i}` ? 'scale(0.88)' : 'scale(1)' }} />
            ))}
          </div>
          <div onClick={() => handlePress('add-water', () => setHydrationCount(Math.min(hydrationCount + 1, hydrationGoal)))}
            style={{ background: colors.blue, borderRadius: 12, padding: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8, cursor: 'pointer', transform: pressedBtn === 'add-water' ? 'scale(0.97)' : 'scale(1)', transition: 'transform 0.15s' }}>
            {React.createElement(window.lucide.Plus, { size: 14, color: '#fff' })}
            <span style={{ color: '#fff', fontWeight: 600, fontSize: 13, fontFamily: font }}>Add Glass</span>
          </div>
        </div>

        {/* Recovery Metrics */}
        <div style={{ padding: '0 20px', marginBottom: 20 }}>
          <p style={{ fontSize: 11, fontWeight: 600, color: colors.muted, letterSpacing: 1, textTransform: 'uppercase', fontFamily: font, marginBottom: 12 }}>Recovery Signals</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {recoveryTips.map((r) => (
              <div key={r.title} style={{ background: colors.cream, borderRadius: 16, padding: '14px', border: `1px solid ${colors.border}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  {React.createElement(r.icon, { size: 16, color: r.color })}
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: r.good ? colors.green : colors.yellow }} />
                </div>
                <p style={{ fontSize: 10, color: colors.muted, fontFamily: font, marginBottom: 2 }}>{r.title}</p>
                <p style={{ fontSize: 15, fontWeight: 700, color: r.color, fontFamily: font }}>{r.value}</p>
                <p style={{ fontSize: 10, color: colors.muted, fontFamily: font, marginTop: 2, lineHeight: 1.4 }}>{r.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recovery Stretches */}
        <div style={{ padding: '0 20px' }}>
          <p style={{ fontSize: 11, fontWeight: 600, color: colors.muted, letterSpacing: 1, textTransform: 'uppercase', fontFamily: font, marginBottom: 12 }}>Recovery Routine</p>
          <div style={{ background: colors.cream, borderRadius: 20, border: `1px solid ${colors.border}`, overflow: 'hidden' }}>
            {stretches.map((s, i) => (
              <div key={s.name} style={{ padding: '14px 18px', borderBottom: i < stretches.length - 1 ? `1px solid ${colors.border}` : 'none', display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: s.done ? colors.green + '20' : colors.warm4, border: `1.5px solid ${s.done ? colors.green : colors.warm3}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {s.done && React.createElement(window.lucide.Check, { size: 14, color: colors.green })}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 14, fontWeight: 600, color: s.done ? colors.muted : colors.charcoal, fontFamily: font, textDecoration: s.done ? 'line-through' : 'none' }}>{s.name}</p>
                </div>
                <span style={{ fontSize: 12, color: colors.muted, fontFamily: mono }}>{s.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // ─── SCREEN: TRENDS ───
  const TrendsScreen = () => {
    const metrics = [
      { id: 'hrv', label: 'HRV', unit: 'ms', color: colors.green, data: [44, 48, 52, 49, 55, 58, 52] },
      { id: 'sleep', label: 'Sleep', unit: 'hrs', color: colors.blue, data: [6.5, 7.2, 6.8, 7.5, 7.1, 7.8, 7.2] },
      { id: 'rhr', label: 'Resting HR', unit: 'bpm', color: colors.accent, data: [62, 60, 59, 61, 58, 57, 58] },
    ];

    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const activeMetricData = metrics.find(m => m.id === activeMetric);
    const maxVal = Math.max(...(activeMetricData?.data || [1]));
    const minVal = Math.min(...(activeMetricData?.data || [0]));

    const insights = [
      { icon: window.lucide.TrendingUp, text: 'HRV improved 18% over past 2 weeks', type: 'positive' },
      { icon: window.lucide.Moon, text: 'Sleep consistency highest on Tues/Fri', type: 'info' },
      { icon: window.lucide.AlertCircle, text: 'Soreness spikes after back-to-back highs', type: 'warning' },
    ];

    const toggleHandler = (key) => setToggleStates(prev => ({ ...prev, [key]: !prev[key] }));

    return (
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 0 90px' }}>
        <div style={{ padding: '8px 24px 20px' }}>
          <p style={{ fontSize: 13, color: colors.muted, fontFamily: font }}>7-day overview</p>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: colors.charcoal, fontFamily: font, marginTop: 2 }}>Trends</h1>
        </div>

        {/* Metric Tabs */}
        <div style={{ padding: '0 20px', marginBottom: 20 }}>
          <div style={{ display: 'flex', background: colors.bgDark, borderRadius: 14, padding: 4, gap: 4 }}>
            {metrics.map(m => (
              <div key={m.id} onClick={() => handlePress(`mt-${m.id}`, () => setActiveMetric(m.id))}
                style={{ flex: 1, padding: '8px', borderRadius: 10, background: activeMetric === m.id ? colors.cream : 'transparent', textAlign: 'center', cursor: 'pointer', transform: pressedBtn === `mt-${m.id}` ? 'scale(0.94)' : 'scale(1)', transition: 'all 0.15s', boxShadow: activeMetric === m.id ? '0 1px 4px rgba(0,0,0,0.08)' : 'none' }}>
                <span style={{ fontSize: 12, fontWeight: activeMetric === m.id ? 700 : 500, color: activeMetric === m.id ? m.color : colors.muted, fontFamily: font }}>{m.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Chart */}
        <div style={{ margin: '0 20px', background: colors.cream, borderRadius: 20, padding: '20px', border: `1px solid ${colors.border}`, marginBottom: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 20 }}>
            <div>
              <p style={{ fontSize: 11, fontWeight: 600, color: colors.muted, letterSpacing: 1, textTransform: 'uppercase', fontFamily: font }}>{activeMetricData?.label}</p>
              <p style={{ fontSize: 28, fontWeight: 700, color: activeMetricData?.color, fontFamily: font, marginTop: 4 }}>
                {activeMetricData?.data[6]}<span style={{ fontSize: 14, fontWeight: 400, color: colors.muted }}> {activeMetricData?.unit}</span>
              </p>
            </div>
            <div style={{ background: colors.green + '20', borderRadius: 20, padding: '4px 10px', display: 'flex', alignItems: 'center', gap: 4 }}>
              {React.createElement(window.lucide.TrendingUp, { size: 12, color: colors.green })}
              <span style={{ fontSize: 11, color: colors.green, fontWeight: 600, fontFamily: font }}>+8% this week</span>
            </div>
          </div>
          {/* Bar Chart */}
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 80 }}>
            {(activeMetricData?.data || []).map((val, i) => {
              const h = ((val - minVal) / (maxVal - minVal + 0.001)) * 60 + 20;
              return (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: '100%', height: h, background: i === 6 ? activeMetricData?.color : activeMetricData?.color + '40', borderRadius: '6px 6px 0 0', transition: 'height 0.6s ease' }} />
                  <span style={{ fontSize: 9, color: i === 6 ? colors.charcoal : colors.muted, fontWeight: i === 6 ? 600 : 400, fontFamily: font }}>{days[i]}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Data Sources Toggles */}
        <div style={{ margin: '0 20px', background: colors.cream, borderRadius: 20, border: `1px solid ${colors.border}`, overflow: 'hidden', marginBottom: 20 }}>
          <div style={{ padding: '16px 18px', borderBottom: `1px solid ${colors.border}` }}>
            <p style={{ fontSize: 11, fontWeight: 600, color: colors.muted, letterSpacing: 1, textTransform: 'uppercase', fontFamily: font }}>Connected Sources</p>
          </div>
          {[
            { key: 'sleep', label: 'Sleep Tracking', sub: 'Apple Health', icon: window.lucide.Moon },
            { key: 'hrv', label: 'HRV Monitor', sub: 'Apple Watch', icon: window.lucide.Activity },
            { key: 'cycle', label: 'Cycle Tracking', sub: 'Clue', icon: window.lucide.Circle },
          ].map(({ key, label, sub, icon }, i, arr) => (
            <div key={key} style={{ padding: '14px 18px', borderBottom: i < arr.length - 1 ? `1px solid ${colors.border}` : 'none', display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: colors.bgDark, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {React.createElement(icon, { size: 16, color: colors.muted })}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: colors.charcoal, fontFamily: font }}>{label}</p>
                <p style={{ fontSize: 11, color: colors.muted, fontFamily: font }}>{sub}</p>
              </div>
              <div onClick={() => handlePress(`tog-${key}`, () => toggleHandler(key))}
                style={{ width: 44, height: 24, borderRadius: 12, background: toggleStates[key] ? colors.accent : colors.warm3, position: 'relative', cursor: 'pointer', transition: 'background 0.2s' }}>
                <div style={{ position: 'absolute', top: 2, left: toggleStates[key] ? 22 : 2, width: 20, height: 20, borderRadius: '50%', background: '#fff', transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
              </div>
            </div>
          ))}
        </div>

        {/* AI Insights */}
        <div style={{ padding: '0 20px' }}>
          <p style={{ fontSize: 11, fontWeight: 600, color: colors.muted, letterSpacing: 1, textTransform: 'uppercase', fontFamily: font, marginBottom: 12 }}>Pattern Insights</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {insights.map((ins, i) => {
              const bgMap = { positive: colors.green + '15', info: colors.blue + '15', warning: colors.yellow + '15' };
              const clrMap = { positive: colors.green, info: colors.blue, warning: colors.yellow };
              return (
                <div key={i} style={{ background: bgMap[ins.type], borderRadius: 14, padding: '14px 16px', display: 'flex', alignItems: 'flex-start', gap: 12, border: `1px solid ${clrMap[ins.type]}30` }}>
                  {React.createElement(ins.icon, { size: 16, color: clrMap[ins.type], style: { flexShrink: 0, marginTop: 1 } })}
                  <p style={{ fontSize: 13, color: colors.charcoal, fontFamily: font, lineHeight: 1.5 }}>{ins.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  const screens = { home: HomeScreen, workout: WorkoutScreen, recovery: RecoveryScreen, trends: TrendsScreen };
  const CurrentScreen = screens[activeTab];

  return (
    <div style={{ minHeight: '100vh', background: '#1C1917', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: font, padding: '40px 20px' }}>
      <style>{fontStyle}</style>

      {/* Ambient glow */}
      <div style={{ position: 'fixed', top: '20%', left: '30%', width: 400, height: 400, borderRadius: '50%', background: `radial-gradient(circle, ${colors.accent}15 0%, transparent 70%)`, pointerEvents: 'none' }} />

      {/* Phone Frame */}
      <div style={{ width: 375, height: 812, background: colors.bg, borderRadius: 50, position: 'relative', overflow: 'hidden', boxShadow: '0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.1) inset', flexShrink: 0 }}>

        {/* Notch overlay layer */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 60, zIndex: 15, pointerEvents: 'none' }}>
          <DynamicIsland />
        </div>

        {/* Status Bar */}
        <div style={{ paddingTop: 50 }}>
          <StatusBar />
        </div>

        {/* Screen Content */}
        <div style={{ position: 'absolute', top: 90, left: 0, right: 0, bottom: 80, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
          <div key={activeTab} style={{ animation: 'slideUp 0.3s ease', flex: 1, display: 'flex', flexDirection: 'column' }}>
            <CurrentScreen />
          </div>
        </div>

        {/* Bottom Nav */}
        <BottomNav />
      </div>
    </div>
  );
}
