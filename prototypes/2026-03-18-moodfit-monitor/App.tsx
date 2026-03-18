function App() {
  const { useState, useEffect, useRef } = React;

  // Load Google Fonts
  const fontStyle = `@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');* { font-family: 'Space Grotesk', sans-serif; }`;

  const [activeTab, setActiveTab] = useState('home');
  const [currentTime, setCurrentTime] = useState('');
  const [activeWorkout, setActiveWorkout] = useState(false);
  const [moodEntry, setMoodEntry] = useState(null);
  const [journalOpen, setJournalOpen] = useState(false);
  const [journalText, setJournalText] = useState('');
  const [selectedMood, setSelectedMood] = useState(null);
  const [pressedButton, setPressedButton] = useState(null);
  const [workoutTimer, setWorkoutTimer] = useState(0);
  const [challengeJoined, setChallengeJoined] = useState({});
  const timerRef = useRef(null);

  const colors = {
    primary: '#FF8C42',
    secondary: '#FFD166',
    accent: '#06D6A0',
    bg: '#FFFFFF',
    dark: '#1A1A2E',
    gray: '#F5F5F5',
    textDark: '#1A1A2E',
    textMid: '#6B7280',
    textLight: '#9CA3AF',
    cardBg: '#FAFAFA',
    orangeLight: '#FFF0E6',
    yellowLight: '#FFFBEB',
    mintLight: '#E6FBF6',
  };

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (activeWorkout) {
      timerRef.current = setInterval(() => setWorkoutTimer(t => t + 1), 1000);
    } else {
      clearInterval(timerRef.current);
      if (!activeWorkout) setWorkoutTimer(0);
    }
    return () => clearInterval(timerRef.current);
  }, [activeWorkout]);

  const formatTimer = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}`;
  };

  const handlePress = (id) => {
    setPressedButton(id);
    setTimeout(() => setPressedButton(null), 150);
  };

  const moodData = [
    { label: 'Mon', before: 3, after: 7, workout: 'Run' },
    { label: 'Tue', before: 5, after: 8, workout: 'Yoga' },
    { label: 'Wed', before: 4, after: 9, workout: 'HIIT' },
    { label: 'Thu', before: 6, after: 7, workout: 'Swim' },
    { label: 'Fri', before: 3, after: 8, workout: 'Cycle' },
    { label: 'Sat', before: 7, after: 9, workout: 'Hike' },
    { label: 'Sun', before: 5, after: 8, workout: 'Rest' },
  ];

  const moods = [
    { id: 1, emoji: '😔', label: 'Low', color: '#94A3B8' },
    { id: 2, emoji: '😐', label: 'Meh', color: '#FFD166' },
    { id: 3, emoji: '🙂', label: 'Good', color: '#FF8C42' },
    { id: 4, emoji: '😄', label: 'Great', color: '#06D6A0' },
    { id: 5, emoji: '🤩', label: 'Amazing', color: '#7C3AED' },
  ];

  const workouts = [
    { id: 1, name: 'Morning Run', icon: '🏃', duration: '30 min', moodBoost: '+4.2', calories: '320', category: 'Cardio' },
    { id: 2, name: 'Yoga Flow', icon: '🧘', duration: '45 min', moodBoost: '+3.8', calories: '180', category: 'Mindful' },
    { id: 3, name: 'HIIT Blast', icon: '⚡', duration: '25 min', moodBoost: '+5.1', calories: '410', category: 'Intense' },
    { id: 4, name: 'Cycling', icon: '🚴', duration: '40 min', moodBoost: '+3.5', calories: '280', category: 'Cardio' },
    { id: 5, name: 'Swim Laps', icon: '🏊', duration: '35 min', moodBoost: '+4.0', calories: '350', category: 'Full Body' },
  ];

  const recentWorkouts = [
    { name: 'Morning Run', time: 'Today, 7:30 AM', moodBefore: 3, moodAfter: 8, calories: 320 },
    { name: 'Yoga Flow', time: 'Yesterday, 6:00 PM', moodBefore: 5, moodAfter: 9, calories: 180 },
    { name: 'HIIT Blast', time: 'Mon, 8:00 AM', moodBefore: 4, moodAfter: 8, calories: 410 },
  ];

  const challenges = [
    { id: 1, name: '7-Day Mood Boost', desc: 'Complete 7 mood-enhancing workouts', participants: 1247, daysLeft: 3, reward: '🏆', progress: 5 },
    { id: 2, name: 'Morning Warrior', desc: 'Work out before 8 AM for 5 days', participants: 892, daysLeft: 4, reward: '🌅', progress: 2 },
    { id: 3, name: 'Zen Master', desc: 'Log 10 mindful sessions this month', participants: 634, daysLeft: 12, reward: '🧘', progress: 6 },
  ];

  const communityPosts = [
    { user: 'Sarah K.', avatar: '🧑‍🦰', workout: 'Morning Run', mood: '😄 Great', comment: 'Best mood boost ever! Ran 5k and feel unstoppable 🔥', likes: 24, time: '2h ago' },
    { user: 'Mike R.', avatar: '👨‍🦱', workout: 'Yoga Flow', mood: '🤩 Amazing', comment: 'Yoga literally saved my anxious Monday morning!', likes: 18, time: '4h ago' },
    { user: 'Priya M.', avatar: '👩', workout: 'HIIT Blast', mood: '😄 Great', comment: 'Started at 3/10 mood, ended at 9/10. Data never lies!', likes: 31, time: '6h ago' },
  ];

  const s = {
    container: { width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0F0F1A', minHeight: '100vh', padding: '20px 0' },
    phone: { width: 375, height: 812, background: colors.bg, borderRadius: 44, overflow: 'hidden', position: 'relative', boxShadow: '0 40px 80px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column' },
    dynamicIsland: { position: 'absolute', top: 14, left: '50%', transform: 'translateX(-50%)', width: 120, height: 34, background: '#0F0F1A', borderRadius: 20, zIndex: 100 },
    statusBar: { height: 52, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', paddingBottom: 8, paddingLeft: 24, paddingRight: 24, flexShrink: 0, zIndex: 50 },
    statusTime: { fontSize: 15, fontWeight: '600', color: colors.textDark },
    statusIcons: { display: 'flex', gap: 6, alignItems: 'center' },
    content: { flex: 1, overflowY: 'auto', overflowX: 'hidden', paddingBottom: 80 },
    bottomNav: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 80, background: colors.bg, borderTop: `1px solid ${colors.gray}`, display: 'flex', alignItems: 'center', justifyContent: 'space-around', paddingBottom: 16, zIndex: 50 },
    navItem: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, cursor: 'pointer', transition: 'transform 0.15s', minWidth: 60 },
    navLabel: { fontSize: 10, fontWeight: '500' },
    // Screen elements
    header: { padding: '16px 20px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
    pageTitle: { fontSize: 24, fontWeight: '700', color: colors.textDark },
    card: { margin: '0 16px 12px', background: colors.cardBg, borderRadius: 20, padding: 16, border: `1px solid rgba(0,0,0,0.05)` },
    sectionLabel: { fontSize: 11, fontWeight: '700', color: colors.textLight, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 },
    btn: { borderRadius: 14, padding: '12px 20px', fontWeight: '600', fontSize: 14, border: 'none', cursor: 'pointer', transition: 'transform 0.1s, opacity 0.1s', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6 },
    chip: { borderRadius: 20, padding: '4px 12px', fontSize: 12, fontWeight: '600', display: 'inline-flex', alignItems: 'center' },
  };

  const TabIcon = ({ tab }) => {
    const active = activeTab === tab;
    const iconColor = active ? colors.primary : colors.textLight;
    const size = 22;
    if (tab === 'home') return React.createElement(window.lucide.Home, { size, color: iconColor, strokeWidth: active ? 2.5 : 2 });
    if (tab === 'workout') return React.createElement(window.lucide.Zap, { size, color: iconColor, strokeWidth: active ? 2.5 : 2 });
    if (tab === 'trends') return React.createElement(window.lucide.TrendingUp, { size, color: iconColor, strokeWidth: active ? 2.5 : 2 });
    if (tab === 'community') return React.createElement(window.lucide.Users, { size, color: iconColor, strokeWidth: active ? 2.5 : 2 });
    if (tab === 'profile') return React.createElement(window.lucide.User, { size, color: iconColor, strokeWidth: active ? 2.5 : 2 });
    return null;
  };

  // HOME SCREEN
  const HomeScreen = () => (
    React.createElement('div', null,
      // Header
      React.createElement('div', { style: { ...s.header, paddingTop: 8 } },
        React.createElement('div', null,
          React.createElement('div', { style: { fontSize: 13, color: colors.textMid, marginBottom: 2 } }, 'Good morning, Alex! 👋'),
          React.createElement('div', { style: { ...s.pageTitle } }, 'MoodFit Monitor')
        ),
        React.createElement('div', { style: { width: 44, height: 44, borderRadius: 22, background: colors.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 } }, '🧑')
      ),

      // Mood Check-In Card
      React.createElement('div', { style: { margin: '0 16px 12px', background: `linear-gradient(135deg, ${colors.primary}, #FF6B1A)`, borderRadius: 24, padding: 20, position: 'relative', overflow: 'hidden' } },
        React.createElement('div', { style: { position: 'absolute', right: -20, top: -20, width: 100, height: 100, borderRadius: 50, background: 'rgba(255,255,255,0.1)' } }),
        React.createElement('div', { style: { position: 'absolute', right: 20, bottom: -30, width: 80, height: 80, borderRadius: 40, background: 'rgba(255,255,255,0.08)' } }),
        React.createElement('div', { style: { fontSize: 12, color: 'rgba(255,255,255,0.8)', fontWeight: '600', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.06em' } }, "Today's Mood"),
        React.createElement('div', { style: { fontSize: 36, fontWeight: '800', color: '#fff', marginBottom: 4 } }, '7.4/10'),
        React.createElement('div', { style: { fontSize: 13, color: 'rgba(255,255,255,0.85)', marginBottom: 16 } }, '↑ 2.1 pts after your morning run'),
        React.createElement('button', {
          onClick: () => { handlePress('checkin'); setJournalOpen(true); },
          style: { ...s.btn, background: 'rgba(255,255,255,0.2)', color: '#fff', fontSize: 13, padding: '8px 16px', borderRadius: 12, transform: pressedButton === 'checkin' ? 'scale(0.96)' : 'scale(1)' }
        }, React.createElement(window.lucide.Plus, { size: 14 }), 'Log Current Mood')
      ),

      // Mood Trend Mini Chart
      React.createElement('div', { style: s.card },
        React.createElement('div', { style: s.sectionLabel }, 'Mood This Week'),
        React.createElement('div', { style: { display: 'flex', alignItems: 'flex-end', gap: 6, height: 60, marginBottom: 6 } },
          moodData.map((d, i) => React.createElement('div', { key: i, style: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 } },
            React.createElement('div', { style: { width: '100%', background: colors.accent, borderRadius: '4px 4px 0 0', height: `${d.after * 6}px`, transition: 'height 0.4s', minHeight: 4 } }),
            React.createElement('div', { style: { fontSize: 9, color: colors.textLight, fontWeight: '500' } }, d.label)
          ))
        ),
        React.createElement('div', { style: { display: 'flex', gap: 12 } },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
            React.createElement('div', { style: { width: 8, height: 8, borderRadius: 4, background: colors.accent } }),
            React.createElement('span', { style: { fontSize: 11, color: colors.textMid } }, 'Post-workout mood')
          )
        )
      ),

      // Stats Row
      React.createElement('div', { style: { margin: '0 16px 12px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 } },
        [
          { icon: '🔥', value: '14', label: 'Day Streak', bg: colors.orangeLight, color: colors.primary },
          { icon: '⚡', value: '3', label: 'This Week', bg: colors.yellowLight, color: '#B45309' },
        ].map((stat, i) => React.createElement('div', { key: i, style: { background: stat.bg, borderRadius: 18, padding: 16 } },
          React.createElement('div', { style: { fontSize: 22 } }, stat.icon),
          React.createElement('div', { style: { fontSize: 22, fontWeight: '800', color: stat.color, marginTop: 4 } }, stat.value),
          React.createElement('div', { style: { fontSize: 11, color: colors.textMid, fontWeight: '500' } }, stat.label)
        ))
      ),

      // Recent Workouts
      React.createElement('div', { style: { padding: '0 16px 8px' } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 } },
          React.createElement('div', { style: { fontSize: 15, fontWeight: '700', color: colors.textDark } }, 'Recent Workouts'),
          React.createElement('span', { style: { fontSize: 13, color: colors.primary, fontWeight: '600', cursor: 'pointer' }, onClick: () => setActiveTab('workout') }, 'See all')
        ),
        recentWorkouts.map((w, i) => React.createElement('div', { key: i, style: { ...s.card, margin: '0 0 10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' } },
          React.createElement('div', null,
            React.createElement('div', { style: { fontSize: 14, fontWeight: '600', color: colors.textDark } }, w.name),
            React.createElement('div', { style: { fontSize: 11, color: colors.textLight, marginTop: 2 } }, w.time)
          ),
          React.createElement('div', { style: { textAlign: 'right' } },
            React.createElement('div', { style: { fontSize: 13, fontWeight: '700', color: colors.accent } }, `${w.moodBefore} → ${w.moodAfter} 😊`),
            React.createElement('div', { style: { fontSize: 11, color: colors.textLight, marginTop: 2 } }, `${w.calories} cal`)
          )
        ))
      ),

      // Suggested Workout
      React.createElement('div', { style: { margin: '0 16px 16px', background: colors.mintLight, borderRadius: 20, padding: 16 } },
        React.createElement('div', { style: { fontSize: 11, fontWeight: '700', color: colors.accent, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 } }, '✨ AI Suggestion'),
        React.createElement('div', { style: { fontSize: 15, fontWeight: '700', color: colors.textDark } }, 'Try Yoga Flow today'),
        React.createElement('div', { style: { fontSize: 12, color: colors.textMid, marginTop: 2, marginBottom: 12 } }, 'Based on your stress level, a calm mindful session could boost your mood by +3.8 pts'),
        React.createElement('button', {
          onClick: () => { handlePress('startYoga'); setActiveTab('workout'); },
          style: { ...s.btn, background: colors.accent, color: '#fff', fontSize: 13, padding: '9px 18px', transform: pressedButton === 'startYoga' ? 'scale(0.96)' : 'scale(1)' }
        }, 'Start Now →')
      ),

      // Journal Modal
      journalOpen && React.createElement('div', {
        style: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 200, display: 'flex', alignItems: 'flex-end' }
      },
        React.createElement('div', { style: { background: colors.bg, borderRadius: '24px 24px 0 0', padding: 24, width: '100%', paddingBottom: 40 } },
          React.createElement('div', { style: { width: 40, height: 4, background: colors.gray, borderRadius: 2, margin: '0 auto 20px' } }),
          React.createElement('div', { style: { fontSize: 18, fontWeight: '700', color: colors.textDark, marginBottom: 4 } }, 'How are you feeling?'),
          React.createElement('div', { style: { fontSize: 13, color: colors.textMid, marginBottom: 20 } }, 'Rate your current mood'),
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-around', marginBottom: 20 } },
            moods.map(m => React.createElement('div', {
              key: m.id,
              onClick: () => setSelectedMood(m.id),
              style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, cursor: 'pointer', transition: 'transform 0.15s', transform: selectedMood === m.id ? 'scale(1.2)' : 'scale(1)' }
            },
              React.createElement('div', { style: { fontSize: 28, lineHeight: 1, background: selectedMood === m.id ? colors.orangeLight : 'transparent', borderRadius: 50, padding: 6 } }, m.emoji),
              React.createElement('div', { style: { fontSize: 10, color: selectedMood === m.id ? colors.primary : colors.textLight, fontWeight: '600' } }, m.label)
            ))
          ),
          React.createElement('textarea', {
            placeholder: 'Add a note about how you feel...',
            value: journalText,
            onChange: e => setJournalText(e.target.value),
            style: { width: '100%', border: `1.5px solid ${colors.gray}`, borderRadius: 14, padding: '12px 14px', fontSize: 14, color: colors.textDark, resize: 'none', height: 80, outline: 'none', boxSizing: 'border-box', fontFamily: 'Space Grotesk' }
          }),
          React.createElement('div', { style: { display: 'flex', gap: 10, marginTop: 14 } },
            React.createElement('button', {
              onClick: () => { setJournalOpen(false); setSelectedMood(null); setJournalText(''); },
              style: { ...s.btn, background: colors.gray, color: colors.textMid, flex: 1 }
            }, 'Cancel'),
            React.createElement('button', {
              onClick: () => { setJournalOpen(false); setMoodEntry({ mood: selectedMood, note: journalText }); setSelectedMood(null); setJournalText(''); },
              style: { ...s.btn, background: colors.primary, color: '#fff', flex: 2 }
            }, 'Save Mood Entry')
          )
        )
      )
    )
  );

  // WORKOUT SCREEN
  const WorkoutScreen = () => {
    const [selectedWorkout, setSelectedWorkout] = useState(null);
    const [filter, setFilter] = useState('All');
    const filters = ['All', 'Cardio', 'Mindful', 'Intense', 'Full Body'];

    return React.createElement('div', null,
      React.createElement('div', { style: s.header },
        React.createElement('div', { style: s.pageTitle }, 'Workouts'),
        React.createElement('button', { style: { ...s.btn, background: colors.orangeLight, color: colors.primary, padding: '8px 14px', fontSize: 13 } }, React.createElement(window.lucide.Plus, { size: 14 }), 'Custom')
      ),

      // Active Workout Banner
      activeWorkout ? React.createElement('div', { style: { margin: '0 16px 14px', background: `linear-gradient(135deg, #1A1A2E, #2D1B69)`, borderRadius: 20, padding: 18 } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
          React.createElement('div', null,
            React.createElement('div', { style: { fontSize: 11, color: 'rgba(255,255,255,0.6)', fontWeight: '600', marginBottom: 2 } }, '🔴 LIVE TRACKING'),
            React.createElement('div', { style: { fontSize: 22, fontWeight: '800', color: '#fff' } }, formatTimer(workoutTimer)),
            React.createElement('div', { style: { fontSize: 13, color: 'rgba(255,255,255,0.7)', marginTop: 2 } }, selectedWorkout ? selectedWorkout.name : 'Morning Run')
          ),
          React.createElement('div', { style: { textAlign: 'right' } },
            React.createElement('div', { style: { fontSize: 24, marginBottom: 4 } }, '💓'),
            React.createElement('div', { style: { fontSize: 20, fontWeight: '700', color: '#FF6B6B' } }, '142'),
            React.createElement('div', { style: { fontSize: 10, color: 'rgba(255,255,255,0.5)' } }, 'BPM')
          )
        ),
        React.createElement('div', { style: { display: 'flex', gap: 8, marginTop: 14 } },
          React.createElement('div', { style: { flex: 1, background: 'rgba(255,255,255,0.1)', borderRadius: 10, padding: 10, textAlign: 'center' } },
            React.createElement('div', { style: { fontSize: 16, fontWeight: '700', color: '#fff' } }, `${Math.floor(workoutTimer * 5.3 / 60)} cal`),
            React.createElement('div', { style: { fontSize: 10, color: 'rgba(255,255,255,0.5)' } }, 'Burned')
          ),
          React.createElement('div', { style: { flex: 1, background: 'rgba(255,255,255,0.1)', borderRadius: 10, padding: 10, textAlign: 'center' } },
            React.createElement('div', { style: { fontSize: 16, fontWeight: '700', color: colors.secondary } }, '6.8'),
            React.createElement('div', { style: { fontSize: 10, color: 'rgba(255,255,255,0.5)' } }, 'Mood Now')
          ),
          React.createElement('button', {
            onClick: () => { handlePress('stopW'); setActiveWorkout(false); },
            style: { ...s.btn, background: '#FF4444', color: '#fff', padding: '8px 16px', fontSize: 13, transform: pressedButton === 'stopW' ? 'scale(0.95)' : 'scale(1)' }
          }, 'End')
        )
      ) : null,

      // Filter chips
      React.createElement('div', { style: { display: 'flex', gap: 8, paddingLeft: 16, marginBottom: 14, overflowX: 'auto', paddingRight: 16, paddingBottom: 4 } },
        filters.map(f => React.createElement('button', {
          key: f,
          onClick: () => setFilter(f),
          style: { ...s.chip, background: filter === f ? colors.primary : colors.gray, color: filter === f ? '#fff' : colors.textMid, border: 'none', cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.2s' }
        }, f))
      ),

      // Workout Cards
      React.createElement('div', { style: { padding: '0 16px' } },
        workouts.filter(w => filter === 'All' || w.category === filter).map((w, i) => React.createElement('div', {
          key: i,
          onClick: () => setSelectedWorkout(w === selectedWorkout ? null : w),
          style: { ...s.card, marginLeft: 0, marginRight: 0, cursor: 'pointer', border: selectedWorkout?.id === w.id ? `2px solid ${colors.primary}` : '1px solid rgba(0,0,0,0.05)', transition: 'all 0.2s' }
        },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12 } },
            React.createElement('div', { style: { width: 52, height: 52, borderRadius: 16, background: colors.orangeLight, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, flexShrink: 0 } }, w.icon),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', { style: { fontSize: 15, fontWeight: '700', color: colors.textDark } }, w.name),
              React.createElement('div', { style: { fontSize: 12, color: colors.textMid, marginTop: 2 } }, `${w.duration} • ${w.calories} cal`),
              React.createElement('div', { style: { display: 'flex', gap: 6, marginTop: 6 } },
                React.createElement('span', { style: { ...s.chip, background: colors.mintLight, color: colors.accent, fontSize: 11 } }, `✨ Mood ${w.moodBoost}`),
                React.createElement('span', { style: { ...s.chip, background: colors.gray, color: colors.textMid, fontSize: 11 } }, w.category)
              )
            ),
            React.createElement(window.lucide.ChevronRight, { size: 18, color: colors.textLight })
          ),
          selectedWorkout?.id === w.id && React.createElement('div', { style: { marginTop: 14, paddingTop: 14, borderTop: `1px solid ${colors.gray}` } },
            React.createElement('div', { style: { fontSize: 12, color: colors.textMid, marginBottom: 12 } }, 'This workout consistently boosts mood by an average of ' + w.moodBoost + ' points based on 23 logged sessions.'),
            React.createElement('button', {
              onClick: (e) => { e.stopPropagation(); handlePress('startW' + w.id); setActiveWorkout(true); },
              style: { ...s.btn, background: colors.primary, color: '#fff', width: '100%', transform: pressedButton === 'startW' + w.id ? 'scale(0.97)' : 'scale(1)' }
            }, React.createElement(window.lucide.Play, { size: 16 }), 'Start Workout + Track Mood')
          )
        ))
      )
    );
  };

  // TRENDS SCREEN
  const TrendsScreen = () => {
    const [timeRange, setTimeRange] = useState('Week');
    const ranges = ['Week', 'Month', 'Year'];
    const insights = [
      { icon: '🧘', title: 'Yoga = Best Mood', desc: 'Avg +3.8 mood boost, especially on stressed days', color: colors.mintLight, textColor: colors.accent },
      { icon: '⚡', title: 'HIIT Peaks High', desc: 'Highest single session boost: +5.1 points', color: colors.yellowLight, textColor: '#B45309' },
      { icon: '🌅', title: 'Morning > Evening', desc: 'AM workouts give 34% better mood lift', color: colors.orangeLight, textColor: colors.primary },
    ];

    return React.createElement('div', null,
      React.createElement('div', { style: s.header },
        React.createElement('div', { style: s.pageTitle }, 'Mood Trends'),
        React.createElement('div', { style: { display: 'flex', background: colors.gray, borderRadius: 10, overflow: 'hidden' } },
          ranges.map(r => React.createElement('button', {
            key: r,
            onClick: () => setTimeRange(r),
            style: { padding: '6px 12px', fontSize: 12, fontWeight: '600', border: 'none', cursor: 'pointer', background: timeRange === r ? colors.primary : 'transparent', color: timeRange === r ? '#fff' : colors.textMid, transition: 'all 0.2s' }
          }, r))
        )
      ),

      // Big Mood Score
      React.createElement('div', { style: { margin: '0 16px 14px', background: `linear-gradient(135deg, ${colors.secondary}, #FFC300)`, borderRadius: 24, padding: 24 } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
          React.createElement('div', null,
            React.createElement('div', { style: { fontSize: 12, color: 'rgba(0,0,0,0.5)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em' } }, 'Avg Mood Boost'),
            React.createElement('div', { style: { fontSize: 52, fontWeight: '800', color: colors.textDark, lineHeight: 1.1 } }, '+4.1'),
            React.createElement('div', { style: { fontSize: 13, color: 'rgba(0,0,0,0.5)', marginTop: 4 } }, 'pts per session this ' + timeRange.toLowerCase())
          ),
          React.createElement('div', { style: { textAlign: 'center' } },
            React.createElement('div', { style: { fontSize: 48 } }, '📈'),
            React.createElement('div', { style: { fontSize: 13, fontWeight: '700', color: '#065F46' } }, '↑ 12% vs last ' + timeRange.toLowerCase())
          )
        )
      ),

      // Bar Chart
      React.createElement('div', { style: s.card },
        React.createElement('div', { style: s.sectionLabel }, 'Before vs After Workout'),
        React.createElement('div', { style: { display: 'flex', alignItems: 'flex-end', gap: 4, height: 90, marginBottom: 8 } },
          moodData.map((d, i) => React.createElement('div', { key: i, style: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 } },
            React.createElement('div', { style: { width: '100%', display: 'flex', gap: 1 } },
              React.createElement('div', { style: { flex: 1, background: `${colors.secondary}88`, borderRadius: '3px 3px 0 0', height: `${d.before * 9}px` } }),
              React.createElement('div', { style: { flex: 1, background: colors.accent, borderRadius: '3px 3px 0 0', height: `${d.after * 9}px` } })
            ),
            React.createElement('div', { style: { fontSize: 9, color: colors.textLight } }, d.label)
          ))
        ),
        React.createElement('div', { style: { display: 'flex', gap: 14 } },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 5 } },
            React.createElement('div', { style: { width: 10, height: 10, borderRadius: 2, background: `${colors.secondary}88` } }),
            React.createElement('span', { style: { fontSize: 11, color: colors.textMid } }, 'Before')
          ),
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 5 } },
            React.createElement('div', { style: { width: 10, height: 10, borderRadius: 2, background: colors.accent } }),
            React.createElement('span', { style: { fontSize: 11, color: colors.textMid } }, 'After')
          )
        )
      ),

      // Workout → Mood Table
      React.createElement('div', { style: s.card },
        React.createElement('div', { style: s.sectionLabel }, 'Activity Mood Impact'),
        workouts.map((w, i) => React.createElement('div', { key: i, style: { display: 'flex', alignItems: 'center', gap: 10, paddingBottom: 10, marginBottom: 10, borderBottom: i < workouts.length - 1 ? `1px solid ${colors.gray}` : 'none' } },
          React.createElement('div', { style: { fontSize: 20, width: 32, textAlign: 'center' } }, w.icon),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', { style: { fontSize: 13, fontWeight: '600', color: colors.textDark } }, w.name),
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 } },
              React.createElement('div', { style: { height: 6, flex: 1, background: colors.gray, borderRadius: 3, overflow: 'hidden' } },
                React.createElement('div', { style: { height: '100%', width: `${(parseFloat(w.moodBoost) / 6) * 100}%`, background: `linear-gradient(90deg, ${colors.secondary}, ${colors.accent})`, borderRadius: 3 } })
              ),
              React.createElement('span', { style: { fontSize: 12, fontWeight: '700', color: colors.accent, minWidth: 32 } }, w.moodBoost)
            )
          )
        ))
      ),

      // Insights
      React.createElement('div', { style: { padding: '0 16px', marginBottom: 16 } },
        React.createElement('div', { style: { fontSize: 15, fontWeight: '700', color: colors.textDark, marginBottom: 10 } }, 'AI Insights'),
        insights.map((ins, i) => React.createElement('div', { key: i, style: { background: ins.color, borderRadius: 16, padding: 14, marginBottom: 8 } },
          React.createElement('div', { style: { display: 'flex', gap: 10, alignItems: 'flex-start' } },
            React.createElement('div', { style: { fontSize: 22 } }, ins.icon),
            React.createElement('div', null,
              React.createElement('div', { style: { fontSize: 13, fontWeight: '700', color: colors.textDark } }, ins.title),
              React.createElement('div', { style: { fontSize: 12, color: colors.textMid, marginTop: 2 } }, ins.desc)
            )
          )
        ))
      )
    );
  };

  // COMMUNITY SCREEN
  const CommunityScreen = () => {
    const [likedPosts, setLikedPosts] = useState({});
    return React.createElement('div', null,
      React.createElement('div', { style: s.header },
        React.createElement('div', { style: s.pageTitle }, 'Community'),
        React.createElement('button', { style: { ...s.btn, background: colors.primary, color: '#fff', padding: '8px 14px', fontSize: 13 } }, React.createElement(window.lucide.Bell, { size: 14 }), '3')
      ),

      // Challenges
      React.createElement('div', { style: { padding: '0 16px 4px' } },
        React.createElement('div', { style: { fontSize: 15, fontWeight: '700', color: colors.textDark, marginBottom: 10 } }, '🏆 Active Challenges'),
        challenges.map((c, i) => React.createElement('div', { key: i, style: { ...s.card, marginLeft: 0, marginRight: 0 } },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 } },
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 } },
                React.createElement('span', { style: { fontSize: 18 } }, c.reward),
                React.createElement('span', { style: { fontSize: 14, fontWeight: '700', color: colors.textDark } }, c.name)
              ),
              React.createElement('div', { style: { fontSize: 12, color: colors.textMid } }, c.desc)
            ),
            React.createElement('button', {
              onClick: () => { handlePress('join'+c.id); setChallengeJoined(prev => ({...prev, [c.id]: !prev[c.id]})); },
              style: { ...s.btn, background: challengeJoined[c.id] ? colors.accent : colors.primary, color: '#fff', padding: '6px 12px', fontSize: 12, transform: pressedButton === 'join'+c.id ? 'scale(0.93)' : 'scale(1)', flexShrink: 0 }
            }, challengeJoined[c.id] ? '✓ Joined' : 'Join')
          ),
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8 } },
            React.createElement('div', { style: { height: 6, flex: 1, background: colors.gray, borderRadius: 3, overflow: 'hidden' } },
              React.createElement('div', { style: { height: '100%', width: `${(c.progress / 10) * 100}%`, background: `linear-gradient(90deg, ${colors.primary}, ${colors.accent})`, borderRadius: 3, transition: 'width 0.4s' } })
            ),
            React.createElement('span', { style: { fontSize: 11, color: colors.textMid, minWidth: 50, textAlign: 'right' } }, `${c.progress}/10 done`)
          ),
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginTop: 8 } },
            React.createElement('span', { style: { fontSize: 11, color: colors.textLight } }, `👥 ${c.participants.toLocaleString()} participants`),
            React.createElement('span', { style: { fontSize: 11, color: colors.primary, fontWeight: '600' } }, `${c.daysLeft} days left`)
          )
        ))
      ),

      // Feed
      React.createElement('div', { style: { padding: '8px 16px 16px' } },
        React.createElement('div', { style: { fontSize: 15, fontWeight: '700', color: colors.textDark, marginBottom: 10 } }, 'Community Feed'),
        communityPosts.map((p, i) => React.createElement('div', { key: i, style: { ...s.card, marginLeft: 0, marginRight: 0 } },
          React.createElement('div', { style: { display: 'flex', gap: 10, marginBottom: 10 } },
            React.createElement('div', { style: { width: 40, height: 40, borderRadius: 20, background: colors.orangeLight, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 } }, p.avatar),
            React.createElement('div', null,
              React.createElement('div', { style: { fontSize: 13, fontWeight: '700', color: colors.textDark } }, p.user),
              React.createElement('div', { style: { fontSize: 11, color: colors.textLight } }, p.time)
            )
          ),
          React.createElement('div', { style: { display: 'flex', gap: 6, marginBottom: 8 } },
            React.createElement('span', { style: { ...s.chip, background: colors.orangeLight, color: colors.primary, fontSize: 11 } }, `🏃 ${p.workout}`),
            React.createElement('span', { style: { ...s.chip, background: colors.mintLight, color: colors.accent, fontSize: 11 } }, p.mood)
          ),
          React.createElement('div', { style: { fontSize: 13, color: colors.textDark, lineHeight: 1.5, marginBottom: 10 } }, p.comment),
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6 } },
            React.createElement('button', {
              onClick: () => { setLikedPosts(prev => ({...prev, [i]: !prev[i]})); },
              style: { display: 'flex', alignItems: 'center', gap: 4, border: 'none', background: 'transparent', cursor: 'pointer', color: likedPosts[i] ? '#EF4444' : colors.textLight, fontSize: 13, fontWeight: '600', padding: 0 }
            }, React.createElement(window.lucide.Heart, { size: 16, fill: likedPosts[i] ? '#EF4444' : 'none', color: likedPosts[i] ? '#EF4444' : colors.textLight }), p.likes + (likedPosts[i] ? 1 : 0)),
            React.createElement('button', { style: { display: 'flex', alignItems: 'center', gap: 4, border: 'none', background: 'transparent', cursor: 'pointer', color: colors.textLight, fontSize: 13, fontWeight: '600', padding: 0, marginLeft: 8 } },
              React.createElement(window.lucide.MessageCircle, { size: 16 }), 'Reply'
            )
          )
        ))
      )
    );
  };

  // PROFILE SCREEN
  const ProfileScreen = () => {
    const [notifOn, setNotifOn] = useState(true);
    const [wearableOn, setWearableOn] = useState(true);
    const [autoTrackOn, setAutoTrackOn] = useState(false);

    const Toggle = ({ value, onChange }) => React.createElement('div', {
      onClick: () => onChange(!value),
      style: { width: 44, height: 24, borderRadius: 12, background: value ? colors.accent : colors.gray, position: 'relative', cursor: 'pointer', transition: 'background 0.25s', flexShrink: 0 }
    },
      React.createElement('div', { style: { width: 20, height: 20, borderRadius: 10, background: '#fff', position: 'absolute', top: 2, left: value ? 22 : 2, transition: 'left 0.25s', boxShadow: '0 1px 4px rgba(0,0,0,0.2)' } })
    );

    const badges = ['🔥 14-Day Streak', '💪 50 Workouts', '🧘 Zen Master', '⚡ HIIT Hero'];

    return React.createElement('div', null,
      // Profile Header
      React.createElement('div', { style: { padding: '16px 20px 24px', background: `linear-gradient(180deg, ${colors.orangeLight}, ${colors.bg})` } },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 16 } },
          React.createElement('div', { style: { width: 72, height: 72, borderRadius: 36, background: colors.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, border: `3px solid #fff`, boxShadow: `0 4px 16px ${colors.primary}44` } }, '🧑'),
          React.createElement('div', null,
            React.createElement('div', { style: { fontSize: 20, fontWeight: '800', color: colors.textDark } }, 'Alex Johnson'),
            React.createElement('div', { style: { fontSize: 13, color: colors.textMid, marginTop: 2 } }, 'Member since Jan 2025'),
            React.createElement('div', { style: { display: 'flex', gap: 6, marginTop: 8 } },
              React.createElement('span', { style: { ...s.chip, background: colors.primary, color: '#fff', fontSize: 11 } }, '🔥 14 streak'),
              React.createElement('span', { style: { ...s.chip, background: colors.mintLight, color: colors.accent, fontSize: 11 } }, '⭐ Pro')
            )
          )
        ),
        // Stats
        React.createElement('div', { style: { display: 'flex', gap: 8, marginTop: 18 } },
          [['67', 'Workouts'], ['7.4', 'Avg Mood'], ['14', 'Day Streak']].map(([val, label], i) => React.createElement('div', { key: i, style: { flex: 1, background: '#fff', borderRadius: 14, padding: '12px 8px', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' } },
            React.createElement('div', { style: { fontSize: 20, fontWeight: '800', color: colors.primary } }, val),
            React.createElement('div', { style: { fontSize: 10, color: colors.textMid, fontWeight: '600', marginTop: 2 } }, label)
          ))
        )
      ),

      // Badges
      React.createElement('div', { style: { padding: '0 16px 16px' } },
        React.createElement('div', { style: { fontSize: 15, fontWeight: '700', color: colors.textDark, marginBottom: 10 } }, 'Achievements'),
        React.createElement('div', { style: { display: 'flex', flexWrap: 'wrap', gap: 8 } },
          badges.map((b, i) => React.createElement('span', { key: i, style: { ...s.chip, background: colors.yellowLight, color: '#B45309', fontSize: 12 } }, b))
        )
      ),

      // Wearables
      React.createElement('div', { style: s.card },
        React.createElement('div', { style: { fontSize: 14, fontWeight: '700', color: colors.textDark, marginBottom: 12 } }, '⌚ Connected Devices'),
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10 } },
          React.createElement('div', { style: { width: 40, height: 40, borderRadius: 12, background: colors.textDark, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
            React.createElement(window.lucide.Watch, { size: 18, color: '#fff' })
          ),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', { style: { fontSize: 13, fontWeight: '600', color: colors.textDark } }, 'Apple Watch Series 9'),
            React.createElement('div', { style: { fontSize: 11, color: colors.accent } }, '● Connected • Syncing')
          ),
          React.createElement(Toggle, { value: wearableOn, onChange: setWearableOn })
        )
      ),

      // Settings
      React.createElement('div', { style: { padding: '0 16px 16px' } },
        React.createElement('div', { style: { fontSize: 15, fontWeight: '700', color: colors.textDark, marginBottom: 10 } }, 'Preferences'),
        [
          { label: 'Workout Reminders', sub: 'Daily at 7:00 AM', icon: window.lucide.Bell, value: notifOn, set: setNotifOn },
          { label: 'Auto Mood Detection', sub: 'Via wearable HRV data', icon: window.lucide.Brain, value: autoTrackOn, set: setAutoTrackOn },
        ].map((item, i) => React.createElement('div', { key: i, style: { ...s.card, marginLeft: 0, marginRight: 0, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 12 } },
          React.createElement('div', { style: { width: 40, height: 40, borderRadius: 12, background: colors.orangeLight, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
            React.createElement(item.icon, { size: 18, color: colors.primary })
          ),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', { style: { fontSize: 13, fontWeight: '600', color: colors.textDark } }, item.label),
            React.createElement('div', { style: { fontSize: 11, color: colors.textLight } }, item.sub)
          ),
          React.createElement(Toggle, { value: item.value, onChange: item.set })
        ))
      )
    );
  };

  const screens = { home: HomeScreen, workout: WorkoutScreen, trends: TrendsScreen, community: CommunityScreen, profile: ProfileScreen };
  const CurrentScreen = screens[activeTab];
  const tabs = [
    { id: 'home', label: 'Home' },
    { id: 'workout', label: 'Workout' },
    { id: 'trends', label: 'Trends' },
    { id: 'community', label: 'Community' },
    { id: 'profile', label: 'Profile' },
  ];

  return React.createElement('div', { style: s.container },
    React.createElement('style', null, fontStyle),
    React.createElement('div', { style: s.phone },
      React.createElement('div', { style: s.dynamicIsland }),
      // Status Bar
      React.createElement('div', { style: s.statusBar },
        React.createElement('span', { style: s.statusTime }, currentTime),
        React.createElement('div', { style: s.statusIcons },
          React.createElement(window.lucide.Signal, { size: 14, color: colors.textDark }),
          React.createElement(window.lucide.Wifi, { size: 14, color: colors.textDark }),
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 1 } },
            React.createElement('div', { style: { width: 20, height: 11, borderRadius: 3, border: `1.5px solid ${colors.textDark}`, position: 'relative', display: 'flex', alignItems: 'center', padding: 1.5 } },
              React.createElement('div', { style: { width: '75%', height: '100%', background: colors.textDark, borderRadius: 1.5 } })
            )
          )
        )
      ),
      // Screen Content
      React.createElement('div', { style: s.content },
        React.createElement(CurrentScreen)
      ),
      // Bottom Nav
      React.createElement('div', { style: s.bottomNav },
        tabs.map(tab => React.createElement('div', {
          key: tab.id,
          style: { ...s.navItem, transform: pressedButton === 'nav' + tab.id ? 'scale(0.88)' : 'scale(1)', transition: 'transform 0.12s' },
          onClick: () => { handlePress('nav' + tab.id); setActiveTab(tab.id); }
        },
          React.createElement(TabIcon, { tab: tab.id }),
          React.createElement('span', { style: { ...s.navLabel, color: activeTab === tab.id ? colors.primary : colors.textLight } }, tab.label)
        ))
      )
    )
  );
}
