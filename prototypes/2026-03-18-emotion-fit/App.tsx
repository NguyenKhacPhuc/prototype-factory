function App() {
  const { useState, useEffect, useRef } = React;

  // Load Google Fonts
  const fontStyle = `
    @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&family=Quicksand:wght@400;500;600;700&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    ::-webkit-scrollbar { display: none; }
    body { background: #1a0a2e; display: flex; justify-content: center; align-items: center; min-height: 100vh; font-family: 'Sora', sans-serif; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
    @keyframes breathe { 0%, 100% { transform: scale(1); opacity: 0.7; } 50% { transform: scale(1.3); opacity: 1; } }
    @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
    @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-6px); } }
    @keyframes progressFill { from { width: 0%; } to { width: var(--target-width); } }
    .screen-enter { animation: fadeIn 0.3s ease forwards; }
    .slide-up { animation: slideUp 0.4s ease forwards; }
    .float-anim { animation: float 3s ease-in-out infinite; }
  `;

  const colors = {
    bg: '#FFF5EE',
    primary: '#F6A623',
    secondary: '#FFB6C1',
    plum: '#6B3A5B',
    plumLight: '#8B5A7B',
    plumDark: '#4A2040',
    amber: '#F6A623',
    amberLight: '#FFD080',
    pink: '#FFB6C1',
    pinkDeep: '#FF8FAA',
    white: '#FFFFFF',
    textDark: '#2D1B2E',
    textMid: '#6B3A5B',
    textLight: '#9B7A8B',
    cardBg: '#FFFFFF',
    gradStart: '#FFB6C1',
    gradEnd: '#F6A623',
    surface: '#FFF0F5',
    green: '#6BC47A',
    greenLight: '#A8E6B4',
  };

  const [activeTab, setActiveTab] = useState('home');
  const [selectedMood, setSelectedMood] = useState(null);
  const [breathPhase, setBreathPhase] = useState('inhale');
  const [breathCount, setBreathCount] = useState(0);
  const [breathActive, setBreathActive] = useState(false);
  const [activeWorkout, setActiveWorkout] = useState(null);
  const [journalText, setJournalText] = useState('');
  const [journalEntries, setJournalEntries] = useState([
    { date: 'Mar 17', mood: '😊', text: 'Had a great yoga session after work. Felt energized and calm.', energy: 80 },
    { date: 'Mar 16', mood: '😔', text: 'Stressed from meetings. Did breathing exercises which helped.', energy: 45 },
    { date: 'Mar 15', mood: '😤', text: 'Channeled frustration into an intense run. Felt amazing after!', energy: 90 },
  ]);
  const [pressedBtn, setPressedBtn] = useState(null);
  const [workoutTimer, setWorkoutTimer] = useState(0);
  const [workoutActive, setWorkoutActive] = useState(false);
  const [completedExercises, setCompletedExercises] = useState([]);
  const [meditationTime, setMeditationTime] = useState(300);
  const [meditationActive, setMeditationActive] = useState(false);
  const breathTimerRef = useRef(null);
  const workoutTimerRef = useRef(null);
  const meditationTimerRef = useRef(null);

  const moods = [
    { id: 'happy', emoji: '😊', label: 'Happy', color: '#FFD700' },
    { id: 'calm', emoji: '😌', label: 'Calm', color: '#98D8C8' },
    { id: 'anxious', emoji: '😰', label: 'Anxious', color: '#FFB6C1' },
    { id: 'stressed', emoji: '😤', label: 'Stressed', color: '#FFA07A' },
    { id: 'sad', emoji: '😔', label: 'Sad', color: '#B0C4DE' },
    { id: 'energized', emoji: '⚡', label: 'Energized', color: '#F6A623' },
  ];

  const workoutSuggestions = {
    happy: { name: 'Joy Flow Yoga', type: 'Yoga', duration: '25 min', intensity: 'Moderate', icon: '🧘', exercises: ['Sun Salutation', 'Warrior II', 'Tree Pose', 'Camel Pose', 'Savasana'], color: '#FFD700' },
    calm: { name: 'Mindful Stretch', type: 'Flexibility', duration: '20 min', intensity: 'Low', icon: '🌿', exercises: ['Deep Breathing', 'Neck Rolls', 'Cat-Cow Stretch', 'Child\'s Pose', 'Body Scan'], color: '#98D8C8' },
    anxious: { name: 'Grounding Walk', type: 'Cardio', duration: '30 min', intensity: 'Low-Mod', icon: '🚶', exercises: ['5-4-3-2-1 Grounding', 'Brisk Walk', 'Box Breathing', 'Shoulder Rolls', 'Mindful Cool-down'], color: '#FFB6C1' },
    stressed: { name: 'Power Release', type: 'HIIT', duration: '20 min', intensity: 'High', icon: '💪', exercises: ['Jump Squats', 'Burpees', 'Mountain Climbers', 'Punch Combos', 'Cool-down Stretch'], color: '#FFA07A' },
    sad: { name: 'Gentle Rise', type: 'Yoga', duration: '25 min', intensity: 'Low', icon: '🌅', exercises: ['Heart Opener', 'Forward Fold', 'Hip Circles', 'Gratitude Meditation', 'Loving-Kindness'], color: '#B0C4DE' },
    energized: { name: 'Peak Performance', type: 'Strength', duration: '40 min', intensity: 'High', icon: '🏋️', exercises: ['Dynamic Warm-up', 'Power Squats', 'Push-up Variations', 'Core Circuit', 'Sprint Intervals'], color: '#F6A623' },
  };

  const communityGroups = [
    { name: 'Anxiety Warriors', members: 1243, posts: 47, emoji: '💙', tag: 'Support', active: true },
    { name: 'Morning Energy Club', members: 892, posts: 23, emoji: '⚡', tag: 'Motivation', active: false },
    { name: 'Mindful Runners', members: 567, posts: 18, emoji: '🏃', tag: 'Fitness', active: true },
    { name: 'Stress-Free Living', members: 2104, posts: 89, emoji: '🌿', tag: 'Wellness', active: false },
  ];

  const communityPosts = [
    { user: 'Sarah M.', avatar: '👩', time: '2h ago', mood: '😊', text: 'Did the Joy Flow workout and honestly cried happy tears. This app understands me!', likes: 34, comments: 8 },
    { user: 'Alex K.', avatar: '🧑', time: '4h ago', mood: '💪', text: 'Power Release after a brutal Monday meeting. Best decision ever. Stress gone!', likes: 51, comments: 12 },
    { user: 'Maya P.', avatar: '👧', time: '6h ago', mood: '🌿', text: 'Week 3 of daily mindfulness check-ins. My anxiety scores dropped by 40%!', likes: 128, comments: 31 },
  ];

  useEffect(() => {
    if (breathActive) {
      const phases = [
        { phase: 'inhale', duration: 4000 },
        { phase: 'hold', duration: 4000 },
        { phase: 'exhale', duration: 6000 },
        { phase: 'rest', duration: 2000 },
      ];
      let phaseIndex = 0;
      const runPhase = () => {
        setBreathPhase(phases[phaseIndex].phase);
        breathTimerRef.current = setTimeout(() => {
          phaseIndex = (phaseIndex + 1) % phases.length;
          if (phaseIndex === 0) setBreathCount(c => c + 1);
          runPhase();
        }, phases[phaseIndex].duration);
      };
      runPhase();
    } else {
      clearTimeout(breathTimerRef.current);
    }
    return () => clearTimeout(breathTimerRef.current);
  }, [breathActive]);

  useEffect(() => {
    if (workoutActive) {
      workoutTimerRef.current = setInterval(() => setWorkoutTimer(t => t + 1), 1000);
    } else {
      clearInterval(workoutTimerRef.current);
    }
    return () => clearInterval(workoutTimerRef.current);
  }, [workoutActive]);

  useEffect(() => {
    if (meditationActive && meditationTime > 0) {
      meditationTimerRef.current = setInterval(() => setMeditationTime(t => t - 1), 1000);
    } else {
      clearInterval(meditationTimerRef.current);
      if (meditationTime === 0) setMeditationActive(false);
    }
    return () => clearInterval(meditationTimerRef.current);
  }, [meditationActive, meditationTime]);

  const formatTime = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  const handlePress = (id) => { setPressedBtn(id); setTimeout(() => setPressedBtn(null), 200); };

  const btnStyle = (id, base = {}) => ({
    ...base,
    transform: pressedBtn === id ? 'scale(0.95)' : 'scale(1)',
    transition: 'all 0.15s ease',
    cursor: 'pointer',
  });

  // ─── PHONE SHELL ────────────────────────────────────────────────────────────
  const phoneStyle = {
    width: 375,
    height: 812,
    background: colors.bg,
    borderRadius: 44,
    overflow: 'hidden',
    position: 'relative',
    boxShadow: '0 40px 120px rgba(0,0,0,0.6), 0 0 0 2px rgba(255,255,255,0.1)',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: "'Sora', sans-serif",
  };

  // ─── STATUS BAR ─────────────────────────────────────────────────────────────
  const StatusBar = () => (
    <div style={{ height: 44, background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 28px', position: 'relative', zIndex: 10 }}>
      <span style={{ fontSize: 15, fontWeight: 600, color: colors.textDark }}>9:41</span>
      <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', width: 120, height: 34, background: '#1a0a2e', borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
        <div style={{ width: 12, height: 12, borderRadius: 6, background: '#333' }} />
        <div style={{ width: 8, height: 8, borderRadius: 4, background: '#333' }} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <svg width="16" height="12" viewBox="0 0 24 18" fill={colors.textDark}><path d="M12 3.5C8.4 3.5 5.2 5 2.9 7.4L1 5.5C3.9 2.6 7.8 1 12 1s8.1 1.6 11 4.5L21.1 7.4C18.8 5 15.6 3.5 12 3.5zM12 8.5c-2 0-3.9.8-5.2 2.1L5 8.8C6.9 7 9.3 5.9 12 5.9s5.1 1.1 7 2.9l-1.8 1.8C15.9 9.3 14 8.5 12 8.5zM12 13c-1 0-2 .4-2.7 1.1L12 17l2.7-2.9C14 13.4 13 13 12 13z"/></svg>
        <svg width="16" height="12" viewBox="0 0 24 24" fill={colors.textDark}><rect x="2" y="7" width="18" height="11" rx="2" stroke={colors.textDark} strokeWidth="2" fill="none"/><path d="M20 11h2v4h-2z" fill={colors.textDark}/><rect x="4" y="9" width="12" height="7" rx="1" fill={colors.textDark}/></svg>
      </div>
    </div>
  );

  // ─── BOTTOM NAV ─────────────────────────────────────────────────────────────
  const tabs = [
    { id: 'home', icon: 'Home', label: 'Home' },
    { id: 'workout', icon: 'Dumbbell', label: 'Workout' },
    { id: 'mindful', icon: 'Wind', label: 'Mindful' },
    { id: 'journal', icon: 'BookOpen', label: 'Journal' },
    { id: 'community', icon: 'Users', label: 'Connect' },
  ];

  const BottomNav = () => (
    <div style={{ height: 80, background: colors.white, borderTop: `1px solid rgba(107,58,91,0.1)`, display: 'flex', alignItems: 'center', justifyContent: 'space-around', padding: '0 8px 12px', boxShadow: '0 -8px 24px rgba(107,58,91,0.08)' }}>
      {tabs.map(tab => {
        const Icon = window.lucide[tab.icon];
        const isActive = activeTab === tab.id;
        return (
          <div key={tab.id} onClick={() => { handlePress(tab.id); setActiveTab(tab.id); }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, cursor: 'pointer', padding: '6px 12px', borderRadius: 16, background: isActive ? `rgba(246,166,35,0.12)` : 'transparent', transition: 'all 0.2s ease', transform: pressedBtn === tab.id ? 'scale(0.9)' : 'scale(1)' }}>
            {Icon && <Icon size={22} color={isActive ? colors.primary : colors.textLight} strokeWidth={isActive ? 2.5 : 1.8} />}
            <span style={{ fontSize: 10, fontWeight: isActive ? 600 : 400, color: isActive ? colors.primary : colors.textLight }}>{tab.label}</span>
          </div>
        );
      })}
    </div>
  );

  // ─── HOME SCREEN ────────────────────────────────────────────────────────────
  const HomeScreen = () => {
    const workout = selectedMood ? workoutSuggestions[selectedMood] : null;
    return (
      <div className="screen-enter" style={{ flex: 1, overflowY: 'auto', padding: '0 0 16px' }}>
        {/* Header */}
        <div style={{ background: `linear-gradient(135deg, ${colors.plum} 0%, ${colors.pinkDeep} 60%, ${colors.amber} 100%)`, padding: '16px 24px 32px', borderRadius: '0 0 32px 32px', marginBottom: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
            <div>
              <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 13, marginBottom: 4 }}>Good morning,</p>
              <h2 style={{ color: colors.white, fontSize: 24, fontWeight: 700 }}>Alex ✨</h2>
            </div>
            <div style={{ width: 44, height: 44, borderRadius: 22, background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>🧘</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.15)', borderRadius: 16, padding: '12px 16px', backdropFilter: 'blur(10px)' }}>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 12, marginBottom: 6 }}>Today's Wellness Score</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ flex: 1, height: 8, background: 'rgba(255,255,255,0.25)', borderRadius: 4, overflow: 'hidden' }}>
                <div style={{ width: '72%', height: '100%', background: `linear-gradient(90deg, ${colors.amberLight}, ${colors.white})`, borderRadius: 4, transition: 'width 1s ease' }} />
              </div>
              <span style={{ color: colors.white, fontWeight: 700, fontSize: 18 }}>72</span>
            </div>
          </div>
        </div>

        <div style={{ padding: '0 20px' }}>
          {/* Mood Check-In */}
          <div style={{ background: colors.white, borderRadius: 20, padding: 20, marginBottom: 16, boxShadow: '0 4px 20px rgba(107,58,91,0.08)' }}>
            <h3 style={{ color: colors.textDark, fontSize: 16, fontWeight: 600, marginBottom: 4 }}>How are you feeling?</h3>
            <p style={{ color: colors.textLight, fontSize: 13, marginBottom: 16 }}>Your mood shapes today's workout</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
              {moods.map(m => (
                <div key={m.id} onClick={() => { handlePress('mood-' + m.id); setSelectedMood(m.id); }} style={{ ...btnStyle('mood-' + m.id), display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, padding: '12px 8px', borderRadius: 14, background: selectedMood === m.id ? `${m.color}22` : colors.surface, border: selectedMood === m.id ? `2px solid ${m.color}` : '2px solid transparent', transition: 'all 0.2s ease' }}>
                  <span style={{ fontSize: 24 }}>{m.emoji}</span>
                  <span style={{ fontSize: 11, fontWeight: 500, color: selectedMood === m.id ? colors.textDark : colors.textLight }}>{m.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* AI Workout Suggestion */}
          {workout && (
            <div className="slide-up" style={{ background: `linear-gradient(135deg, ${workout.color}33, ${colors.white})`, borderRadius: 20, padding: 20, marginBottom: 16, border: `1px solid ${workout.color}44` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <div style={{ width: 28, height: 28, borderRadius: 8, background: `${workout.color}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>🤖</div>
                <span style={{ fontSize: 12, color: colors.plum, fontWeight: 600 }}>AI RECOMMENDATION</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: colors.textDark }}>{workout.icon} {workout.name}</h3>
                  <p style={{ fontSize: 13, color: colors.textLight, marginTop: 2 }}>{workout.type} · {workout.duration} · {workout.intensity}</p>
                </div>
              </div>
              <div onClick={() => { handlePress('start-workout'); setActiveTab('workout'); setActiveWorkout(workout); }} style={{ ...btnStyle('start-workout'), background: colors.plum, borderRadius: 14, padding: '13px 20px', textAlign: 'center', color: colors.white, fontWeight: 600, fontSize: 15 }}>
                Start This Workout →
              </div>
            </div>
          )}

          {/* Stats Row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 16 }}>
            {[
              { label: 'Workouts', value: '18', sub: 'this month', emoji: '🏋️' },
              { label: 'Streak', value: '7', sub: 'days', emoji: '🔥' },
              { label: 'Mindful', value: '42', sub: 'minutes', emoji: '🧘' },
            ].map((stat, i) => (
              <div key={i} style={{ background: colors.white, borderRadius: 16, padding: '14px 10px', textAlign: 'center', boxShadow: '0 2px 12px rgba(107,58,91,0.06)' }}>
                <div style={{ fontSize: 20, marginBottom: 6 }}>{stat.emoji}</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: colors.plum }}>{stat.value}</div>
                <div style={{ fontSize: 10, color: colors.textLight, fontWeight: 500 }}>{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Today's Schedule */}
          <div style={{ background: colors.white, borderRadius: 20, padding: 20, boxShadow: '0 4px 20px rgba(107,58,91,0.08)' }}>
            <h3 style={{ fontSize: 15, fontWeight: 600, color: colors.textDark, marginBottom: 14 }}>Today's Plan</h3>
            {[
              { time: '7:00 AM', name: 'Morning Breathwork', done: true, icon: '🌬️' },
              { time: '12:00 PM', name: selectedMood ? workoutSuggestions[selectedMood].name : 'Midday Workout', done: false, icon: '💪' },
              { time: '9:00 PM', name: 'Evening Journal', done: false, icon: '📓' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: i < 2 ? 12 : 0 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: item.done ? `${colors.green}22` : colors.surface, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>{item.icon}</div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 13, fontWeight: 500, color: item.done ? colors.textLight : colors.textDark, textDecoration: item.done ? 'line-through' : 'none' }}>{item.name}</p>
                  <p style={{ fontSize: 11, color: colors.textLight }}>{item.time}</p>
                </div>
                {item.done && <span style={{ fontSize: 16 }}>✅</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // ─── WORKOUT SCREEN ─────────────────────────────────────────────────────────
  const WorkoutScreen = () => {
    const workout = activeWorkout || (selectedMood ? workoutSuggestions[selectedMood] : workoutSuggestions.energized);
    return (
      <div className="screen-enter" style={{ flex: 1, overflowY: 'auto' }}>
        <div style={{ background: `linear-gradient(160deg, ${colors.plum}, ${colors.pinkDeep})`, padding: '16px 24px 28px', borderRadius: '0 0 32px 32px', marginBottom: 20 }}>
          <h2 style={{ color: colors.white, fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Your Workout</h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13 }}>Adapted to your {selectedMood || 'energized'} mood</p>
          <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
            <div style={{ flex: 1, background: 'rgba(255,255,255,0.15)', borderRadius: 12, padding: '10px 14px', textAlign: 'center' }}>
              <p style={{ color: colors.white, fontSize: 20, fontWeight: 700 }}>{workout.duration}</p>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 11 }}>Duration</p>
            </div>
            <div style={{ flex: 1, background: 'rgba(255,255,255,0.15)', borderRadius: 12, padding: '10px 14px', textAlign: 'center' }}>
              <p style={{ color: colors.white, fontSize: 20, fontWeight: 700 }}>{workout.intensity}</p>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 11 }}>Intensity</p>
            </div>
            <div style={{ flex: 1, background: 'rgba(255,255,255,0.15)', borderRadius: 12, padding: '10px 14px', textAlign: 'center' }}>
              <p style={{ color: colors.white, fontSize: 20, fontWeight: 700 }}>{workout.type}</p>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 11 }}>Type</p>
            </div>
          </div>
        </div>

        <div style={{ padding: '0 20px' }}>
          {/* Timer */}
          <div style={{ background: colors.white, borderRadius: 20, padding: 20, marginBottom: 16, boxShadow: '0 4px 20px rgba(107,58,91,0.08)', textAlign: 'center' }}>
            <div style={{ fontSize: 48, fontWeight: 700, color: colors.plum, fontVariantNumeric: 'tabular-nums', marginBottom: 12 }}>
              {formatTime(workoutTimer)}
            </div>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
              <div onClick={() => { handlePress('toggle-workout'); setWorkoutActive(!workoutActive); }} style={{ ...btnStyle('toggle-workout'), background: workoutActive ? colors.pinkDeep : colors.plum, borderRadius: 14, padding: '11px 28px', color: colors.white, fontWeight: 600, fontSize: 14 }}>
                {workoutActive ? '⏸ Pause' : '▶ Start'}
              </div>
              <div onClick={() => { handlePress('reset-workout'); setWorkoutTimer(0); setWorkoutActive(false); setCompletedExercises([]); }} style={{ ...btnStyle('reset-workout'), background: colors.surface, borderRadius: 14, padding: '11px 20px', color: colors.textMid, fontWeight: 600, fontSize: 14 }}>
                Reset
              </div>
            </div>
          </div>

          {/* Exercise List */}
          <div style={{ background: colors.white, borderRadius: 20, padding: 20, marginBottom: 16, boxShadow: '0 4px 20px rgba(107,58,91,0.08)' }}>
            <h3 style={{ fontSize: 15, fontWeight: 600, color: colors.textDark, marginBottom: 14 }}>{workout.icon} {workout.name}</h3>
            {workout.exercises.map((ex, i) => {
              const done = completedExercises.includes(i);
              return (
                <div key={i} onClick={() => { handlePress('ex-' + i); setCompletedExercises(p => done ? p.filter(x => x !== i) : [...p, i]); }} style={{ ...btnStyle('ex-' + i), display: 'flex', alignItems: 'center', gap: 12, marginBottom: i < workout.exercises.length - 1 ? 12 : 0, padding: '10px 12px', borderRadius: 12, background: done ? `${colors.green}15` : colors.surface, border: done ? `1px solid ${colors.green}40` : '1px solid transparent', cursor: 'pointer' }}>
                  <div style={{ width: 28, height: 28, borderRadius: 8, background: done ? colors.green : colors.plum, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: colors.white, fontWeight: 700, flexShrink: 0 }}>
                    {done ? '✓' : i + 1}
                  </div>
                  <span style={{ fontSize: 14, fontWeight: 500, color: done ? colors.textLight : colors.textDark, textDecoration: done ? 'line-through' : 'none' }}>{ex}</span>
                </div>
              );
            })}
          </div>

          {/* Progress */}
          <div style={{ background: `linear-gradient(135deg, ${colors.plum}15, ${colors.pink}15)`, borderRadius: 20, padding: 20, border: `1px solid ${colors.pink}44` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: colors.textDark }}>Progress</span>
              <span style={{ fontSize: 14, fontWeight: 600, color: colors.plum }}>{completedExercises.length}/{workout.exercises.length}</span>
            </div>
            <div style={{ height: 10, background: 'rgba(107,58,91,0.15)', borderRadius: 5, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${(completedExercises.length / workout.exercises.length) * 100}%`, background: `linear-gradient(90deg, ${colors.plum}, ${colors.pinkDeep})`, borderRadius: 5, transition: 'width 0.4s ease' }} />
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ─── MINDFULNESS SCREEN ─────────────────────────────────────────────────────
  const MindfulScreen = () => {
    const breathLabels = { inhale: 'Breathe In...', hold: 'Hold...', exhale: 'Breathe Out...', rest: 'Rest...' };
    const breathColors = { inhale: colors.plum, hold: colors.amber, exhale: colors.pinkDeep, rest: colors.textLight };
    return (
      <div className="screen-enter" style={{ flex: 1, overflowY: 'auto' }}>
        <div style={{ padding: '12px 24px 20px' }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: colors.textDark }}>Mindfulness</h2>
          <p style={{ fontSize: 13, color: colors.textLight, marginTop: 2 }}>Train your mind, find your center</p>
        </div>

        {/* Breathing Exercise */}
        <div style={{ margin: '0 20px 16px', background: `linear-gradient(135deg, ${colors.plum}15, ${colors.pink}20)`, borderRadius: 24, padding: '24px 20px', textAlign: 'center', border: `1px solid ${colors.pink}44` }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, color: colors.textDark, marginBottom: 4 }}>Box Breathing</h3>
          <p style={{ fontSize: 12, color: colors.textLight, marginBottom: 24 }}>4-4-6-2 rhythm · Reduces anxiety</p>

          <div style={{ position: 'relative', width: 160, height: 160, margin: '0 auto 20px' }}>
            <div style={{ width: 160, height: 160, borderRadius: 80, background: `linear-gradient(135deg, ${colors.plum}22, ${colors.pink}33)`, border: `3px solid ${breathColors[breathPhase]}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', animation: breathActive ? (breathPhase === 'inhale' ? 'breathe 4s ease-in-out' : breathPhase === 'exhale' ? 'breathe 6s ease-in-out reverse' : 'none') : 'none', transition: 'border-color 0.5s ease' }}>
              <div style={{ fontSize: 36 }}>🫁</div>
              <p style={{ fontSize: 14, fontWeight: 600, color: breathColors[breathPhase], marginTop: 6 }}>{breathActive ? breathLabels[breathPhase] : 'Ready'}</p>
            </div>
            <div style={{ position: 'absolute', top: -10, right: -10, width: 36, height: 36, borderRadius: 18, background: colors.white, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 14, color: colors.plum, boxShadow: '0 2px 8px rgba(107,58,91,0.2)' }}>{breathCount}</div>
          </div>

          <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
            <div onClick={() => { handlePress('breath-toggle'); setBreathActive(!breathActive); if (!breathActive) setBreathCount(0); }} style={{ ...btnStyle('breath-toggle'), background: breathActive ? colors.pinkDeep : colors.plum, borderRadius: 14, padding: '11px 28px', color: colors.white, fontWeight: 600, fontSize: 14 }}>
              {breathActive ? '⏸ Stop' : '▶ Begin'}
            </div>
          </div>
        </div>

        {/* Meditation Timer */}
        <div style={{ margin: '0 20px 16px', background: colors.white, borderRadius: 20, padding: 20, boxShadow: '0 4px 20px rgba(107,58,91,0.08)' }}>
          <h3 style={{ fontSize: 15, fontWeight: 600, color: colors.textDark, marginBottom: 14 }}>🧘 Guided Meditation</h3>
          <div style={{ textAlign: 'center', marginBottom: 16 }}>
            <div style={{ fontSize: 42, fontWeight: 700, color: colors.plum, fontVariantNumeric: 'tabular-nums' }}>{formatTime(meditationTime)}</div>
          </div>
          <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
            {[180, 300, 600, 900].map(t => (
              <div key={t} onClick={() => { setMeditationTime(t); setMeditationActive(false); }} style={{ flex: 1, padding: '8px 4px', borderRadius: 10, background: meditationTime === t && !meditationActive ? `${colors.plum}15` : colors.surface, border: meditationTime === t && !meditationActive ? `1.5px solid ${colors.plum}` : '1.5px solid transparent', textAlign: 'center', cursor: 'pointer', fontSize: 12, fontWeight: 500, color: colors.textMid }}>
                {t / 60}m
              </div>
            ))}
          </div>
          <div onClick={() => { handlePress('med-toggle'); setMeditationActive(!meditationActive); }} style={{ ...btnStyle('med-toggle'), background: meditationActive ? colors.pinkDeep : colors.plum, borderRadius: 14, padding: '12px', textAlign: 'center', color: colors.white, fontWeight: 600, fontSize: 14 }}>
            {meditationActive ? '⏸ Pause' : '▶ Start Meditation'}
          </div>
        </div>

        {/* Mindfulness Cards */}
        <div style={{ padding: '0 20px' }}>
          <h3 style={{ fontSize: 15, fontWeight: 600, color: colors.textDark, marginBottom: 12 }}>Today's Practices</h3>
          {[
            { title: 'Body Scan Meditation', duration: '10 min', icon: '🌊', desc: 'Release tension from head to toe', color: '#B0C4DE' },
            { title: 'Gratitude Reflection', duration: '5 min', icon: '🌸', desc: 'Shift focus to what\'s going well', color: '#FFB6C1' },
            { title: 'Loving-Kindness', duration: '15 min', icon: '💖', desc: 'Cultivate compassion for self & others', color: '#DDA0DD' },
          ].map((card, i) => (
            <div key={i} onClick={() => handlePress('mcard-' + i)} style={{ ...btnStyle('mcard-' + i), display: 'flex', alignItems: 'center', gap: 14, background: colors.white, borderRadius: 16, padding: '14px 16px', marginBottom: 10, boxShadow: '0 2px 12px rgba(107,58,91,0.06)' }}>
              <div style={{ width: 46, height: 46, borderRadius: 14, background: `${card.color}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>{card.icon}</div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 14, fontWeight: 600, color: colors.textDark }}>{card.title}</p>
                <p style={{ fontSize: 12, color: colors.textLight, marginTop: 2 }}>{card.desc}</p>
              </div>
              <span style={{ fontSize: 12, fontWeight: 500, color: colors.textLight, background: colors.surface, padding: '4px 10px', borderRadius: 8 }}>{card.duration}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ─── JOURNAL SCREEN ─────────────────────────────────────────────────────────
  const JournalScreen = () => {
    const [localText, setLocalText] = useState('');
    const [selectedJournalMood, setSelectedJournalMood] = useState(null);
    const [energy, setEnergy] = useState(70);

    const handleSave = () => {
      if (localText.trim()) {
        const newEntry = {
          date: 'Today',
          mood: selectedJournalMood ? moods.find(m => m.id === selectedJournalMood)?.emoji || '😊' : '😊',
          text: localText.trim(),
          energy,
        };
        setJournalEntries(p => [newEntry, ...p]);
        setLocalText('');
        setSelectedJournalMood(null);
        setEnergy(70);
      }
    };

    return (
      <div className="screen-enter" style={{ flex: 1, overflowY: 'auto' }}>
        <div style={{ background: `linear-gradient(135deg, ${colors.pinkDeep}, ${colors.plum})`, padding: '16px 24px 28px', borderRadius: '0 0 32px 32px', marginBottom: 20 }}>
          <h2 style={{ color: colors.white, fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Emotion Journal</h2>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 13 }}>Track your emotional journey</p>
          <div style={{ display: 'flex', gap: 16, marginTop: 16 }}>
            {[{ label: 'Entries', val: journalEntries.length + 1 }, { label: 'Avg Mood', val: '7.4' }, { label: 'Insights', val: '3' }].map((s, i) => (
              <div key={i} style={{ flex: 1, textAlign: 'center' }}>
                <p style={{ color: colors.white, fontSize: 22, fontWeight: 700 }}>{s.val}</p>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 11 }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ padding: '0 20px' }}>
          {/* New Entry */}
          <div style={{ background: colors.white, borderRadius: 20, padding: 20, marginBottom: 16, boxShadow: '0 4px 20px rgba(107,58,91,0.08)' }}>
            <h3 style={{ fontSize: 15, fontWeight: 600, color: colors.textDark, marginBottom: 12 }}>📝 New Entry</h3>
            <div style={{ display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}>
              {moods.slice(0, 4).map(m => (
                <div key={m.id} onClick={() => setSelectedJournalMood(m.id)} style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '6px 12px', borderRadius: 20, background: selectedJournalMood === m.id ? `${m.color}33` : colors.surface, border: selectedJournalMood === m.id ? `1.5px solid ${m.color}` : '1.5px solid transparent', cursor: 'pointer', fontSize: 12, fontWeight: 500, color: colors.textMid }}>
                  <span>{m.emoji}</span> {m.label}
                </div>
              ))}
            </div>
            <textarea
              value={localText}
              onChange={e => setLocalText(e.target.value)}
              placeholder="How did your workout affect your mood today? What emotions came up?"
              style={{ width: '100%', minHeight: 90, background: colors.surface, border: 'none', borderRadius: 14, padding: '12px 14px', fontSize: 13, color: colors.textDark, resize: 'none', outline: 'none', fontFamily: "'Sora', sans-serif", lineHeight: 1.6 }}
            />
            <div style={{ marginTop: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: 12, color: colors.textLight }}>Energy Level</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: colors.plum }}>{energy}%</span>
              </div>
              <input type="range" min={0} max={100} value={energy} onChange={e => setEnergy(+e.target.value)} style={{ width: '100%', accentColor: colors.plum, cursor: 'pointer' }} />
            </div>
            <div onClick={() => { handlePress('save-journal'); handleSave(); }} style={{ ...btnStyle('save-journal'), background: `linear-gradient(135deg, ${colors.plum}, ${colors.pinkDeep})`, borderRadius: 14, padding: '12px', textAlign: 'center', color: colors.white, fontWeight: 600, fontSize: 14, marginTop: 14 }}>
              Save Entry ✨
            </div>
          </div>

          {/* Entries */}
          <h3 style={{ fontSize: 15, fontWeight: 600, color: colors.textDark, marginBottom: 12 }}>Past Entries</h3>
          {journalEntries.map((entry, i) => (
            <div key={i} style={{ background: colors.white, borderRadius: 16, padding: '16px', marginBottom: 10, boxShadow: '0 2px 12px rgba(107,58,91,0.06)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 24 }}>{entry.mood}</span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: colors.textLight }}>{entry.date}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 60, height: 6, background: colors.surface, borderRadius: 3, overflow: 'hidden' }}>
                    <div style={{ width: `${entry.energy}%`, height: '100%', background: `linear-gradient(90deg, ${colors.plum}, ${colors.pinkDeep})`, borderRadius: 3 }} />
                  </div>
                  <span style={{ fontSize: 11, color: colors.textLight }}>{entry.energy}%</span>
                </div>
              </div>
              <p style={{ fontSize: 13, color: colors.textMid, lineHeight: 1.5 }}>{entry.text}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ─── COMMUNITY SCREEN ────────────────────────────────────────────────────────
  const CommunityScreen = () => {
    const [likedPosts, setLikedPosts] = useState([]);
    const [joinedGroups, setJoinedGroups] = useState(['Anxiety Warriors']);
    return (
      <div className="screen-enter" style={{ flex: 1, overflowY: 'auto' }}>
        <div style={{ background: `linear-gradient(135deg, ${colors.amber}, ${colors.pinkDeep})`, padding: '16px 24px 28px', borderRadius: '0 0 32px 32px', marginBottom: 20 }}>
          <h2 style={{ color: colors.white, fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Community</h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13 }}>You're not alone in this journey</p>
        </div>

        <div style={{ padding: '0 20px' }}>
          {/* Groups */}
          <h3 style={{ fontSize: 15, fontWeight: 600, color: colors.textDark, marginBottom: 12 }}>Support Groups</h3>
          <div style={{ display: 'flex', gap: 10, overflowX: 'auto', marginBottom: 20, paddingBottom: 4 }}>
            {communityGroups.map((g, i) => {
              const joined = joinedGroups.includes(g.name);
              return (
                <div key={i} style={{ flexShrink: 0, width: 150, background: colors.white, borderRadius: 16, padding: '14px 12px', boxShadow: '0 2px 12px rgba(107,58,91,0.08)', border: joined ? `2px solid ${colors.amber}` : '2px solid transparent' }}>
                  <div style={{ fontSize: 28, marginBottom: 8 }}>{g.emoji}</div>
                  <p style={{ fontSize: 13, fontWeight: 600, color: colors.textDark, marginBottom: 4, lineHeight: 1.3 }}>{g.name}</p>
                  <p style={{ fontSize: 11, color: colors.textLight, marginBottom: 10 }}>{g.members.toLocaleString()} members</p>
                  <div onClick={() => setJoinedGroups(p => joined ? p.filter(x => x !== g.name) : [...p, g.name])} style={{ background: joined ? `${colors.amber}22` : colors.plum, borderRadius: 8, padding: '6px', textAlign: 'center', color: joined ? colors.amber : colors.white, fontSize: 11, fontWeight: 600, cursor: 'pointer' }}>
                    {joined ? '✓ Joined' : '+ Join'}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Feed */}
          <h3 style={{ fontSize: 15, fontWeight: 600, color: colors.textDark, marginBottom: 12 }}>Community Feed</h3>
          {communityPosts.map((post, i) => {
            const liked = likedPosts.includes(i);
            return (
              <div key={i} style={{ background: colors.white, borderRadius: 18, padding: '16px', marginBottom: 12, boxShadow: '0 2px 12px rgba(107,58,91,0.06)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <div style={{ width: 38, height: 38, borderRadius: 19, background: `linear-gradient(135deg, ${colors.plum}33, ${colors.pink}33)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>{post.avatar}</div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 13, fontWeight: 600, color: colors.textDark }}>{post.user}</p>
                    <p style={{ fontSize: 11, color: colors.textLight }}>{post.time}</p>
                  </div>
                  <span style={{ fontSize: 20 }}>{post.mood}</span>
                </div>
                <p style={{ fontSize: 13, color: colors.textMid, lineHeight: 1.55, marginBottom: 12 }}>{post.text}</p>
                <div style={{ display: 'flex', gap: 16 }}>
                  <div onClick={() => { handlePress('like-' + i); setLikedPosts(p => liked ? p.filter(x => x !== i) : [...p, i]); }} style={{ ...btnStyle('like-' + i), display: 'flex', alignItems: 'center', gap: 5, cursor: 'pointer' }}>
                    <span style={{ fontSize: 16 }}>{liked ? '❤️' : '🤍'}</span>
                    <span style={{ fontSize: 12, color: liked ? colors.pinkDeep : colors.textLight, fontWeight: 500 }}>{post.likes + (liked ? 1 : 0)}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                    <span style={{ fontSize: 16 }}>💬</span>
                    <span style={{ fontSize: 12, color: colors.textLight, fontWeight: 500 }}>{post.comments}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                    <span style={{ fontSize: 16 }}>🔗</span>
                    <span style={{ fontSize: 12, color: colors.textLight, fontWeight: 500 }}>Share</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const screenMap = {
    home: HomeScreen,
    workout: WorkoutScreen,
    mindful: MindfulScreen,
    journal: JournalScreen,
    community: CommunityScreen,
  };

  const ActiveScreen = screenMap[activeTab] || HomeScreen;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: fontStyle }} />
      <div style={{ background: 'linear-gradient(135deg, #1a0a2e 0%, #3D1A4E 50%, #1a0a2e 100%)', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
        <div style={phoneStyle}>
          <StatusBar />
          <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
            <ActiveScreen />
          </div>
          <BottomNav />
        </div>
      </div>
    </>
  );
}
