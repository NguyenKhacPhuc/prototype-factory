
const { useState, useEffect, useRef } = React;

const themes = {
  light: {
    bg: '#F5F2FF',
    surface: '#FFFFFF',
    surfaceAlt: '#EDE9FE',
    card: '#FFFFFF',
    cardAlt: '#F9F7FF',
    primary: '#7C5CFC',
    primaryDark: '#6344E8',
    primaryLight: '#EDE9FE',
    primaryGradient: 'linear-gradient(135deg, #7C5CFC 0%, #C471ED 100%)',
    heroGradient: 'linear-gradient(160deg, #7C5CFC 0%, #9B7DFF 50%, #C471ED 100%)',
    secondary: '#06B6D4',
    accent: '#F59E0B',
    accentLight: '#FEF3C7',
    text: '#1A1035',
    textSecondary: '#5B5280',
    textTertiary: '#9CA3AF',
    border: '#E8E0FF',
    navBg: '#FFFFFF',
    statusBar: '#1A1035',
    success: '#10B981',
    successLight: '#D1FAE5',
    warning: '#F59E0B',
    error: '#EF4444',
    shadow: '0 4px 20px rgba(124, 92, 252, 0.15)',
    shadowMd: '0 8px 32px rgba(124, 92, 252, 0.2)',
    overlay: 'rgba(26, 16, 53, 0.7)',
    chip1: '#EDE9FE',
    chip1Text: '#7C5CFC',
    chip2: '#D1FAE5',
    chip2Text: '#059669',
    chip3: '#FEF3C7',
    chip3Text: '#D97706',
    chip4: '#FCE7F3',
    chip4Text: '#BE185D',
    chip5: '#DBEAFE',
    chip5Text: '#2563EB',
  },
  dark: {
    bg: '#0D0A1A',
    surface: '#17122B',
    surfaceAlt: '#211A3F',
    card: '#1C1735',
    cardAlt: '#211A3F',
    primary: '#9B7DFF',
    primaryDark: '#7C5CFC',
    primaryLight: '#2A2050',
    primaryGradient: 'linear-gradient(135deg, #9B7DFF 0%, #E879F9 100%)',
    heroGradient: 'linear-gradient(160deg, #4C35C8 0%, #7C5CFC 50%, #C471ED 100%)',
    secondary: '#22D3EE',
    accent: '#FCD34D',
    accentLight: '#3A2E00',
    text: '#F0EEFF',
    textSecondary: '#A89EC9',
    textTertiary: '#5E5480',
    border: '#2A2150',
    navBg: '#120F23',
    statusBar: '#F0EEFF',
    success: '#34D399',
    successLight: '#064E3B',
    warning: '#FCD34D',
    error: '#F87171',
    shadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
    shadowMd: '0 8px 32px rgba(0, 0, 0, 0.5)',
    overlay: 'rgba(0, 0, 0, 0.85)',
    chip1: '#2A2050',
    chip1Text: '#9B7DFF',
    chip2: '#064E3B',
    chip2Text: '#34D399',
    chip3: '#3A2E00',
    chip3Text: '#FCD34D',
    chip4: '#4A1535',
    chip4Text: '#F9A8D4',
    chip5: '#1E3A5F',
    chip5Text: '#60A5FA',
  }
};

const rituals = [
  {
    id: 'r1', name: 'Morning Awakening', duration: '5 min', category: 'Energy',
    emoji: '🌅', color: '#F59E0B', bgColor: '#FEF3C7',
    trigger: 'After waking up', mood: 'Groggy',
    steps: [
      { title: 'Deep Breath Reset', desc: 'Inhale for 4 counts, hold for 4, exhale for 6. Repeat 3 times.', time: 60 },
      { title: 'Set Your Intention', desc: 'Whisper or write one clear intention: "Today I will..."', time: 45 },
      { title: 'Gratitude Spark', desc: 'Name 3 small things you\'re thankful for right now.', time: 60 },
      { title: 'Hydrate & Go', desc: 'Drink a full glass of water. You\'re ready.', time: 30 },
    ]
  },
  {
    id: 'r2', name: 'Pre-Call Grounding', duration: '2 min', category: 'Focus',
    emoji: '🎯', color: '#7C5CFC', bgColor: '#EDE9FE',
    trigger: 'Before meetings', mood: 'Scattered',
    steps: [
      { title: 'Posture Check', desc: 'Sit tall, shoulders back, both feet on the floor.', time: 20 },
      { title: 'Box Breathing', desc: 'Breathe in 4, hold 4, out 4, hold 4. Do this twice.', time: 40 },
      { title: 'One Word Focus', desc: 'Choose one word for this call: Listen? Lead? Support?', time: 30 },
    ]
  },
  {
    id: 'r3', name: 'Midday Reset', duration: '3 min', category: 'Calm',
    emoji: '☀️', color: '#06B6D4', bgColor: '#CFFAFE',
    trigger: 'After lunch', mood: 'Sluggish',
    steps: [
      { title: 'Step Away', desc: 'Stand up and walk 10 steps away from your desk.', time: 30 },
      { title: 'Window Gaze', desc: 'Look at something at least 20 feet away for 30 seconds.', time: 30 },
      { title: 'Neck & Shoulder Roll', desc: 'Slowly roll your neck and shoulders 3 times each direction.', time: 60 },
      { title: 'Check In', desc: 'How are you actually feeling? Name it without judgment.', time: 30 },
    ]
  },
  {
    id: 'r4', name: 'Desk Reset', duration: '6 min', category: 'Reset',
    emoji: '🧹', color: '#10B981', bgColor: '#D1FAE5',
    trigger: 'After back-to-back calls', mood: 'Overwhelmed',
    steps: [
      { title: 'Clear the Screen', desc: 'Close all browser tabs you don\'t need. Seriously, all of them.', time: 60 },
      { title: 'Physical Tidy', desc: 'Put away 5 items on your desk. One minute, go.', time: 60 },
      { title: 'Water Break', desc: 'Get up, refill your water, and take 5 slow breaths standing.', time: 90 },
      { title: 'Priority Reset', desc: 'Write the 1 most important thing for the rest of today.', time: 60 },
      { title: 'Re-enter', desc: 'Take one final breath and open only the one tab you need.', time: 30 },
    ]
  },
  {
    id: 'r5', name: 'Evening Transition', duration: '8 min', category: 'Calm',
    emoji: '🌙', color: '#8B5CF6', bgColor: '#EDE9FE',
    trigger: 'End of workday', mood: 'Stressed',
    steps: [
      { title: 'Work is Done', desc: 'Say out loud: "Work is complete for today." Close your laptop.', time: 30 },
      { title: 'Change Something', desc: 'Change one item of clothing to mark the transition.', time: 60 },
      { title: 'Body Scan', desc: 'Scan from head to toe. Where is tension? Breathe into it.', time: 90 },
      { title: 'Tomorrow\'s 3', desc: 'Write 3 things for tomorrow, then close the notebook.', time: 90 },
      { title: 'One Good Thing', desc: 'Name one thing from today that went well, however small.', time: 60 },
    ]
  },
  {
    id: 'r6', name: 'Social Confidence Boost', duration: '2 min', category: 'Energy',
    emoji: '✨', color: '#EC4899', bgColor: '#FCE7F3',
    trigger: 'Before social events', mood: 'Anxious',
    steps: [
      { title: 'Power Stance', desc: 'Stand tall, hands on hips, head up for 30 seconds.', time: 30 },
      { title: 'Recall a Win', desc: 'Remember a moment you felt genuinely confident. Feel it.', time: 45 },
      { title: 'Warm-Up Smile', desc: 'Smile genuinely at yourself in a mirror or window.', time: 20 },
      { title: 'Curiosity Mode', desc: 'Set intention: be curious about others, not focused on yourself.', time: 30 },
    ]
  },
];

const momentTriggers = [
  { id: 'm1', label: 'After meetings', ritual: 'r2', count: 12, streak: 5 },
  { id: 'm2', label: 'Sunday dread', ritual: 'r5', count: 4, streak: 2 },
  { id: 'm3', label: 'Pre-commute', ritual: 'r1', count: 8, streak: 3 },
  { id: 'm4', label: 'Low energy slump', ritual: 'r3', count: 15, streak: 7 },
  { id: 'm5', label: 'Feeling overwhelmed', ritual: 'r4', count: 6, streak: 4 },
];

const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const weekData = [3, 2, 4, 3, 5, 2, 4];
const moodData = [65, 72, 68, 80, 75, 85, 78];

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [themeMode, setThemeMode] = useState('light');
  const [activeRitual, setActiveRitual] = useState(null);
  const [ritualStep, setRitualStep] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [completedToday, setCompletedToday] = useState(['r1', 'r3']);
  const [pressedButton, setPressedButton] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showMomentModal, setShowMomentModal] = useState(false);
  const [animatingTab, setAnimatingTab] = useState(null);

  const t = themes[themeMode];

  useEffect(() => {
    let interval;
    if (isTimerRunning) {
      interval = setInterval(() => setTimer(p => p + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const startRitual = (ritual) => {
    setActiveRitual(ritual);
    setRitualStep(0);
    setTimer(0);
    setIsTimerRunning(true);
  };

  const nextStep = () => {
    if (ritualStep < activeRitual.steps.length - 1) {
      setRitualStep(p => p + 1);
      setTimer(0);
    } else {
      setCompletedToday(p => [...p, activeRitual.id]);
      setActiveRitual(null);
      setIsTimerRunning(false);
      setTimer(0);
    }
  };

  const closeRitual = () => {
    setActiveRitual(null);
    setIsTimerRunning(false);
    setTimer(0);
    setRitualStep(0);
  };

  const formatTime = (s) => `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`;
  const getRitualById = (id) => rituals.find(r => r.id === id);
  const getHour = () => new Date().getHours();
  const getGreeting = () => {
    const h = getHour();
    if (h < 12) return 'Good morning';
    if (h < 17) return 'Good afternoon';
    return 'Good evening';
  };
  const getSuggestedRitual = () => {
    const h = getHour();
    if (h < 9) return rituals[0];
    if (h < 12) return rituals[1];
    if (h < 14) return rituals[2];
    if (h < 17) return rituals[3];
    if (h < 19) return rituals[4];
    return rituals[5];
  };

  const categories = ['All', 'Energy', 'Calm', 'Focus', 'Reset'];

  const btn = (id) => ({
    transform: pressedButton === id ? 'scale(0.96)' : 'scale(1)',
    transition: 'transform 0.1s ease',
  });

  const suggested = getSuggestedRitual();

  // ─── HOME SCREEN ───────────────────────────────────────────────────────────
  const HomeScreen = () => (
    <div style={{ height: '100%', overflowY: 'auto', paddingBottom: 90 }}>
      {/* Hero Section */}
      <div style={{ background: t.heroGradient, padding: '20px 20px 28px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -30, right: -30, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
        <div style={{ position: 'absolute', bottom: -20, left: -20, width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />
        <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 13, fontWeight: 500, marginBottom: 4 }}>{getGreeting()}, Sarah ✦</p>
        <h1 style={{ color: '#fff', fontSize: 22, fontWeight: 800, lineHeight: 1.2, marginBottom: 16 }}>
          You have 3 rituals<br />waiting today.
        </h1>
        <div style={{ display: 'flex', gap: 10 }}>
          {[
            { label: '7 day streak', icon: '🔥' },
            { label: `${completedToday.length} done today`, icon: '✓' },
          ].map((stat, i) => (
            <div key={i} style={{ background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(10px)', borderRadius: 20, padding: '6px 12px', display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: 14 }}>{stat.icon}</span>
              <span style={{ color: '#fff', fontSize: 12, fontWeight: 600 }}>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: '20px 16px 0' }}>
        {/* Suggested Now */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <p style={{ color: t.text, fontSize: 15, fontWeight: 700 }}>Suggested Right Now</p>
          <span style={{ fontSize: 11, color: t.textSecondary, background: t.primaryLight, color: t.primary, padding: '3px 8px', borderRadius: 10, fontWeight: 600 }}>Based on your time</span>
        </div>

        <div
          onClick={() => startRitual(suggested)}
          onMouseDown={() => setPressedButton('suggest')}
          onMouseUp={() => setPressedButton(null)}
          style={{ background: t.heroGradient, borderRadius: 20, padding: 20, cursor: 'pointer', ...btn('suggest'), boxShadow: t.shadowMd, marginBottom: 24 }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
            <div>
              <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: 12, padding: '4px 10px', display: 'inline-block', marginBottom: 8 }}>
                <span style={{ color: '#fff', fontSize: 11, fontWeight: 600 }}>{suggested.duration} · {suggested.category}</span>
              </div>
              <h3 style={{ color: '#fff', fontSize: 20, fontWeight: 800, marginBottom: 4 }}>{suggested.name}</h3>
              <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 13 }}>Perfect for: {suggested.trigger}</p>
            </div>
            <div style={{ fontSize: 36 }}>{suggested.emoji}</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.2)', borderRadius: 12, padding: '10px 16px', gap: 10 }}>
            {React.createElement(window.lucide.Play, { size: 16, color: '#fff', fill: '#fff' })}
            <span style={{ color: '#fff', fontSize: 14, fontWeight: 700 }}>Start Ritual</span>
          </div>
        </div>

        {/* Today's Rituals */}
        <p style={{ color: t.text, fontSize: 15, fontWeight: 700, marginBottom: 12 }}>Today's Plan</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
          {rituals.slice(0, 4).map((ritual) => {
            const done = completedToday.includes(ritual.id);
            return (
              <div
                key={ritual.id}
                onClick={() => !done && startRitual(ritual)}
                onMouseDown={() => setPressedButton(ritual.id)}
                onMouseUp={() => setPressedButton(null)}
                style={{ background: t.card, borderRadius: 16, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 14, boxShadow: t.shadow, cursor: done ? 'default' : 'pointer', border: `1px solid ${t.border}`, opacity: done ? 0.65 : 1, ...btn(ritual.id) }}
              >
                <div style={{ width: 44, height: 44, borderRadius: 14, background: ritual.bgColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>
                  {done ? '✓' : ritual.emoji}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ color: t.text, fontSize: 14, fontWeight: 700, marginBottom: 2 }}>{ritual.name}</p>
                  <p style={{ color: t.textSecondary, fontSize: 12 }}>{ritual.duration} · {ritual.trigger}</p>
                </div>
                {done ? (
                  <div style={{ background: t.successLight, borderRadius: 10, padding: '4px 10px' }}>
                    <span style={{ color: t.success, fontSize: 12, fontWeight: 700 }}>Done</span>
                  </div>
                ) : (
                  React.createElement(window.lucide.ChevronRight, { size: 18, color: t.textTertiary })
                )}
              </div>
            );
          })}
        </div>

        {/* Quick Moments */}
        <p style={{ color: t.text, fontSize: 15, fontWeight: 700, marginBottom: 12 }}>Quick Moments</p>
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
          {[
            { label: 'Stressed', emoji: '😤', ritual: 'r4' },
            { label: 'Tired', emoji: '😴', ritual: 'r3' },
            { label: 'Anxious', emoji: '😰', ritual: 'r6' },
            { label: 'Unfocused', emoji: '🌀', ritual: 'r2' },
          ].map((m, i) => (
            <div
              key={i}
              onClick={() => startRitual(getRitualById(m.ritual))}
              onMouseDown={() => setPressedButton(`qm${i}`)}
              onMouseUp={() => setPressedButton(null)}
              style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 16, padding: '10px 14px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, minWidth: 72, cursor: 'pointer', ...btn(`qm${i}`) }}
            >
              <span style={{ fontSize: 22 }}>{m.emoji}</span>
              <span style={{ color: t.textSecondary, fontSize: 11, fontWeight: 600, textAlign: 'center' }}>{m.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ─── EXPLORE SCREEN ─────────────────────────────────────────────────────────
  const ExploreScreen = () => {
    const filtered = selectedCategory === 'All' ? rituals : rituals.filter(r => r.category === selectedCategory);
    return (
      <div style={{ height: '100%', overflowY: 'auto', paddingBottom: 90 }}>
        <div style={{ padding: '20px 16px 0' }}>
          <h2 style={{ color: t.text, fontSize: 22, fontWeight: 800, marginBottom: 4 }}>Explore Rituals</h2>
          <p style={{ color: t.textSecondary, fontSize: 13, marginBottom: 20 }}>Find your perfect micro-routine</p>

          {/* Search Bar */}
          <div style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 16, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20, boxShadow: t.shadow }}>
            {React.createElement(window.lucide.Search, { size: 18, color: t.textTertiary })}
            <span style={{ color: t.textTertiary, fontSize: 14 }}>Search rituals, moods, triggers...</span>
          </div>

          {/* Categories */}
          <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4, marginBottom: 24 }}>
            {categories.map(cat => (
              <div
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{ background: selectedCategory === cat ? t.primary : t.card, borderRadius: 20, padding: '8px 16px', cursor: 'pointer', border: `1px solid ${selectedCategory === cat ? t.primary : t.border}`, flexShrink: 0, transition: 'all 0.2s' }}
              >
                <span style={{ color: selectedCategory === cat ? '#fff' : t.textSecondary, fontSize: 13, fontWeight: 600 }}>{cat}</span>
              </div>
            ))}
          </div>

          {/* Featured Banner */}
          {selectedCategory === 'All' && (
            <div style={{ background: 'linear-gradient(135deg, #F59E0B 0%, #F97316 100%)', borderRadius: 20, padding: 20, marginBottom: 24, position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: -20, right: -20, width: 90, height: 90, borderRadius: '50%', background: 'rgba(255,255,255,0.15)' }} />
              <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 11, fontWeight: 700, letterSpacing: 1, marginBottom: 4 }}>FEATURED THIS WEEK</p>
              <h3 style={{ color: '#fff', fontSize: 18, fontWeight: 800, marginBottom: 6 }}>Evening Transition</h3>
              <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 12, marginBottom: 14 }}>Used by 2,400 people this week to separate work from rest.</p>
              <div
                onClick={() => startRitual(rituals[4])}
                style={{ background: 'rgba(255,255,255,0.25)', borderRadius: 12, padding: '8px 16px', display: 'inline-flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}
              >
                {React.createElement(window.lucide.Play, { size: 14, color: '#fff', fill: '#fff' })}
                <span style={{ color: '#fff', fontSize: 13, fontWeight: 700 }}>Try it · 8 min</span>
              </div>
            </div>
          )}

          {/* Ritual Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {filtered.map(ritual => (
              <div
                key={ritual.id}
                onClick={() => startRitual(ritual)}
                onMouseDown={() => setPressedButton(`ex${ritual.id}`)}
                onMouseUp={() => setPressedButton(null)}
                style={{ background: t.card, borderRadius: 20, padding: 16, cursor: 'pointer', border: `1px solid ${t.border}`, boxShadow: t.shadow, ...btn(`ex${ritual.id}`) }}
              >
                <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                  <div style={{ width: 52, height: 52, borderRadius: 16, background: ritual.bgColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, flexShrink: 0 }}>
                    {ritual.emoji}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
                      <h4 style={{ color: t.text, fontSize: 15, fontWeight: 700 }}>{ritual.name}</h4>
                      <span style={{ background: t.primaryLight, color: t.primary, fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 8 }}>{ritual.duration}</span>
                    </div>
                    <p style={{ color: t.textSecondary, fontSize: 12, marginBottom: 8 }}>Best for: {ritual.trigger}</p>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <span style={{ background: t.primaryLight, color: t.primary, fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 8 }}>{ritual.category}</span>
                      <span style={{ background: t.surfaceAlt, color: t.textSecondary, fontSize: 11, fontWeight: 500, padding: '2px 8px', borderRadius: 8 }}>{ritual.steps.length} steps</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // ─── MY RITUALS (MOMENTS) SCREEN ────────────────────────────────────────────
  const RitualsScreen = () => (
    <div style={{ height: '100%', overflowY: 'auto', paddingBottom: 90 }}>
      <div style={{ padding: '20px 16px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
          <div>
            <h2 style={{ color: t.text, fontSize: 22, fontWeight: 800, marginBottom: 4 }}>My Moment Map</h2>
            <p style={{ color: t.textSecondary, fontSize: 13 }}>Triggers linked to your rituals</p>
          </div>
          <div
            onClick={() => setShowMomentModal(true)}
            style={{ background: t.primary, borderRadius: 14, padding: '8px 14px', display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}
          >
            {React.createElement(window.lucide.Plus, { size: 16, color: '#fff' })}
            <span style={{ color: '#fff', fontSize: 13, fontWeight: 700 }}>Add</span>
          </div>
        </div>

        {/* Moment Triggers */}
        <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
          {momentTriggers.map((moment) => {
            const ritual = getRitualById(moment.ritual);
            return (
              <div key={moment.id} style={{ background: t.card, borderRadius: 20, padding: 16, border: `1px solid ${t.border}`, boxShadow: t.shadow }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: ritual?.color || t.primary, flexShrink: 0 }} />
                    <span style={{ color: t.text, fontSize: 14, fontWeight: 700 }}>{moment.label}</span>
                  </div>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <span style={{ background: t.primaryLight, color: t.primary, fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 8 }}>🔥 {moment.streak}</span>
                  </div>
                </div>
                {ritual && (
                  <div
                    onClick={() => startRitual(ritual)}
                    style={{ display: 'flex', alignItems: 'center', gap: 10, background: t.surfaceAlt, borderRadius: 14, padding: '10px 12px', cursor: 'pointer' }}
                  >
                    <div style={{ width: 36, height: 36, borderRadius: 12, background: ritual.bgColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>
                      {ritual.emoji}
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ color: t.text, fontSize: 13, fontWeight: 600 }}>{ritual.name}</p>
                      <p style={{ color: t.textSecondary, fontSize: 11 }}>{ritual.duration} · used {moment.count} times</p>
                    </div>
                    {React.createElement(window.lucide.Play, { size: 14, color: t.primary, fill: t.primary })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Custom Ritual Builder Teaser */}
        <div style={{ background: t.primaryLight, borderRadius: 20, padding: 20, border: `2px dashed ${t.primary}`, marginBottom: 24 }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <div style={{ fontSize: 28 }}>🔨</div>
            <div>
              <p style={{ color: t.primary, fontSize: 14, fontWeight: 700, marginBottom: 2 }}>Build a Custom Ritual</p>
              <p style={{ color: t.textSecondary, fontSize: 12 }}>Chain your own steps for a unique sequence</p>
            </div>
          </div>
          <div style={{ marginTop: 14, background: t.primary, borderRadius: 12, padding: '10px 16px', textAlign: 'center', cursor: 'pointer' }}>
            <span style={{ color: '#fff', fontSize: 13, fontWeight: 700 }}>Create Custom Ritual</span>
          </div>
        </div>

        {/* All My Rituals */}
        <p style={{ color: t.text, fontSize: 15, fontWeight: 700, marginBottom: 12 }}>Saved Rituals</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {rituals.map(ritual => (
            <div
              key={ritual.id}
              onClick={() => startRitual(ritual)}
              style={{ background: t.card, borderRadius: 16, padding: 14, cursor: 'pointer', border: `1px solid ${t.border}`, boxShadow: t.shadow }}
            >
              <div style={{ fontSize: 28, marginBottom: 8 }}>{ritual.emoji}</div>
              <p style={{ color: t.text, fontSize: 13, fontWeight: 700, marginBottom: 2 }}>{ritual.name}</p>
              <p style={{ color: t.textSecondary, fontSize: 11 }}>{ritual.duration}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ─── PROGRESS SCREEN ────────────────────────────────────────────────────────
  const ProgressScreen = () => (
    <div style={{ height: '100%', overflowY: 'auto', paddingBottom: 90 }}>
      <div style={{ padding: '20px 16px 0' }}>
        <h2 style={{ color: t.text, fontSize: 22, fontWeight: 800, marginBottom: 4 }}>Your Progress</h2>
        <p style={{ color: t.textSecondary, fontSize: 13, marginBottom: 20 }}>Week of March 16 — 22</p>

        {/* Stats Row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 24 }}>
          {[
            { label: 'Day Streak', value: '7', icon: '🔥', color: '#F59E0B', bg: '#FEF3C7' },
            { label: 'This Week', value: '23', icon: '✦', color: '#7C5CFC', bg: '#EDE9FE' },
            { label: 'Avg Mood', value: '76%', icon: '😊', color: '#10B981', bg: '#D1FAE5' },
          ].map((stat, i) => (
            <div key={i} style={{ background: t.card, borderRadius: 18, padding: '14px 10px', textAlign: 'center', border: `1px solid ${t.border}`, boxShadow: t.shadow }}>
              <div style={{ width: 36, height: 36, borderRadius: 12, background: stat.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, margin: '0 auto 8px' }}>{stat.icon}</div>
              <p style={{ color: t.text, fontSize: 18, fontWeight: 800 }}>{stat.value}</p>
              <p style={{ color: t.textSecondary, fontSize: 10, fontWeight: 600 }}>{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Weekly Activity */}
        <div style={{ background: t.card, borderRadius: 20, padding: 20, marginBottom: 20, border: `1px solid ${t.border}`, boxShadow: t.shadow }}>
          <p style={{ color: t.text, fontSize: 14, fontWeight: 700, marginBottom: 16 }}>Weekly Rituals</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', height: 80 }}>
            {weekDays.map((day, i) => (
              <div key={day} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, flex: 1 }}>
                <div style={{ width: '60%', height: weekData[i] * 14, background: i === 6 ? t.primary : t.primaryLight, borderRadius: 6, transition: 'all 0.3s', minHeight: 8 }} />
                <span style={{ color: i === 6 ? t.primary : t.textTertiary, fontSize: 10, fontWeight: i === 6 ? 700 : 500 }}>{day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Mood Trend */}
        <div style={{ background: t.card, borderRadius: 20, padding: 20, marginBottom: 20, border: `1px solid ${t.border}`, boxShadow: t.shadow }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <p style={{ color: t.text, fontSize: 14, fontWeight: 700 }}>Mood Trend</p>
            <span style={{ color: t.success, fontSize: 12, fontWeight: 600 }}>↑ 12% this week</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', height: 70 }}>
            {moodData.map((val, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, flex: 1 }}>
                <div style={{ width: '50%', height: val * 0.65, background: `linear-gradient(180deg, #10B981, #34D399)`, borderRadius: 4, opacity: i === 6 ? 1 : 0.5, minHeight: 6 }} />
                <span style={{ color: t.textTertiary, fontSize: 9 }}>{weekDays[i]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Rituals */}
        <p style={{ color: t.text, fontSize: 15, fontWeight: 700, marginBottom: 12 }}>Top Rituals This Week</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
          {[
            { ritual: rituals[2], count: 7, impact: 'Mood +18%' },
            { ritual: rituals[1], count: 5, impact: 'Focus +24%' },
            { ritual: rituals[4], count: 4, impact: 'Calm +31%' },
          ].map(({ ritual, count, impact }, i) => (
            <div key={i} style={{ background: t.card, borderRadius: 16, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 12, border: `1px solid ${t.border}`, boxShadow: t.shadow }}>
              <span style={{ color: t.textTertiary, fontSize: 16, fontWeight: 800, width: 20 }}>{i + 1}</span>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: ritual.bgColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>{ritual.emoji}</div>
              <div style={{ flex: 1 }}>
                <p style={{ color: t.text, fontSize: 13, fontWeight: 700 }}>{ritual.name}</p>
                <p style={{ color: t.textSecondary, fontSize: 11 }}>{count}x this week</p>
              </div>
              <div style={{ background: t.successLight, borderRadius: 10, padding: '4px 8px' }}>
                <span style={{ color: t.success, fontSize: 11, fontWeight: 700 }}>{impact}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Reflection */}
        <div style={{ background: t.primaryGradient, borderRadius: 20, padding: 20, marginBottom: 24 }}>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 11, fontWeight: 700, letterSpacing: 1, marginBottom: 6 }}>WEEKLY REFLECTION</p>
          <p style={{ color: '#fff', fontSize: 14, lineHeight: 1.6, fontStyle: 'italic' }}>
            "You completed 23 rituals this week — your best week yet. The Midday Reset has become your anchor. You're 40% more consistent on days when you start with Morning Awakening."
          </p>
          <div style={{ marginTop: 14, display: 'flex', gap: 8 }}>
            <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: 10, padding: '6px 12px', cursor: 'pointer' }}>
              <span style={{ color: '#fff', fontSize: 12, fontWeight: 600 }}>Save Reflection</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // ─── SETTINGS SCREEN ────────────────────────────────────────────────────────
  const SettingsScreen = () => (
    <div style={{ height: '100%', overflowY: 'auto', paddingBottom: 90 }}>
      <div style={{ padding: '20px 16px 0' }}>
        {/* Profile */}
        <div style={{ background: t.heroGradient, borderRadius: 24, padding: 24, marginBottom: 24, textAlign: 'center', position: 'relative' }}>
          <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', fontSize: 32 }}>
            🧘
          </div>
          <p style={{ color: '#fff', fontSize: 18, fontWeight: 800, marginBottom: 2 }}>Sarah Chen</p>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 13 }}>Member since Jan 2026</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginTop: 16 }}>
            {[{ label: 'Rituals', val: '89' }, { label: 'Streak', val: '7d' }, { label: 'Moments', val: '24' }].map((s, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <p style={{ color: '#fff', fontSize: 18, fontWeight: 800 }}>{s.val}</p>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 11 }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Theme Toggle */}
        <div style={{ background: t.card, borderRadius: 20, padding: 20, marginBottom: 16, border: `1px solid ${t.border}`, boxShadow: t.shadow }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 44, height: 44, borderRadius: 14, background: themeMode === 'dark' ? '#2A2050' : '#FEF3C7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {themeMode === 'dark'
                  ? React.createElement(window.lucide.Moon, { size: 22, color: '#9B7DFF' })
                  : React.createElement(window.lucide.Sun, { size: 22, color: '#F59E0B' })
                }
              </div>
              <div>
                <p style={{ color: t.text, fontSize: 14, fontWeight: 700 }}>{themeMode === 'dark' ? 'Dark Mode' : 'Light Mode'}</p>
                <p style={{ color: t.textSecondary, fontSize: 12 }}>Tap to toggle theme</p>
              </div>
            </div>
            <div
              onClick={() => setThemeMode(m => m === 'light' ? 'dark' : 'light')}
              style={{ width: 52, height: 30, borderRadius: 15, background: themeMode === 'dark' ? t.primary : t.border, position: 'relative', cursor: 'pointer', transition: 'background 0.3s' }}
            >
              <div style={{ position: 'absolute', top: 3, left: themeMode === 'dark' ? 24 : 3, width: 24, height: 24, borderRadius: '50%', background: '#fff', transition: 'left 0.3s', boxShadow: '0 2px 6px rgba(0,0,0,0.2)' }} />
            </div>
          </div>
        </div>

        {/* Settings Options */}
        {[
          { icon: window.lucide.Bell, label: 'Notifications', sub: 'Smart ritual reminders', color: '#F59E0B', bg: '#FEF3C7' },
          { icon: window.lucide.Clock, label: 'Daily Schedule', sub: 'Set your active hours', color: '#06B6D4', bg: '#CFFAFE' },
          { icon: window.lucide.Target, label: 'Ritual Goals', sub: '3 rituals per day target', color: '#10B981', bg: '#D1FAE5' },
          { icon: window.lucide.Smartphone, label: 'Focus Mode', sub: 'Block distractions during rituals', color: '#7C5CFC', bg: '#EDE9FE' },
          { icon: window.lucide.Download, label: 'Backup & Sync', sub: 'Cloud sync enabled', color: '#EC4899', bg: '#FCE7F3' },
        ].map((item, i) => (
          <div key={i} style={{ background: t.card, borderRadius: 16, padding: '14px 16px', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 14, border: `1px solid ${t.border}`, boxShadow: t.shadow, cursor: 'pointer' }}>
            <div style={{ width: 44, height: 44, borderRadius: 14, background: item.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              {React.createElement(item.icon, { size: 20, color: item.color })}
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ color: t.text, fontSize: 14, fontWeight: 700 }}>{item.label}</p>
              <p style={{ color: t.textSecondary, fontSize: 12 }}>{item.sub}</p>
            </div>
            {React.createElement(window.lucide.ChevronRight, { size: 18, color: t.textTertiary })}
          </div>
        ))}

        <p style={{ color: t.textTertiary, fontSize: 12, textAlign: 'center', marginTop: 20, marginBottom: 8 }}>Pocket Ritual v1.0.0 · Made with intention</p>
      </div>
    </div>
  );

  const screens = { home: HomeScreen, explore: ExploreScreen, rituals: RitualsScreen, progress: ProgressScreen, settings: SettingsScreen };
  const tabs = [
    { id: 'home', label: 'Home', icon: window.lucide.Home },
    { id: 'explore', label: 'Explore', icon: window.lucide.Compass },
    { id: 'rituals', label: 'Rituals', icon: window.lucide.Sparkles },
    { id: 'progress', label: 'Progress', icon: window.lucide.BarChart2 },
    { id: 'settings', label: 'Settings', icon: window.lucide.Settings },
  ];

  const ActiveScreen = screens[activeTab];

  return (
    <div style={{ background: '#E8E5F0', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { display: none; }
      `}</style>

      <div style={{
        width: 375, height: 812,
        background: t.bg,
        borderRadius: 44,
        overflow: 'hidden',
        position: 'relative',
        boxShadow: '0 50px 100px rgba(0,0,0,0.35), 0 0 0 10px #1A1035',
        fontFamily: "'Plus Jakarta Sans', -apple-system, sans-serif",
        display: 'flex', flexDirection: 'column',
        transition: 'background 0.3s',
      }}>

        {/* Status Bar */}
        <div style={{ padding: '14px 24px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0, zIndex: 10 }}>
          <span style={{ color: t.statusBar, fontSize: 13, fontWeight: 700 }}>9:41</span>
          <div style={{ width: 120, height: 30, background: '#000', borderRadius: 20, position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: 10 }} />
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            {React.createElement(window.lucide.Wifi, { size: 14, color: t.statusBar })}
            {React.createElement(window.lucide.Battery, { size: 16, color: t.statusBar })}
          </div>
        </div>

        {/* Screen */}
        <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
          <ActiveScreen />
        </div>

        {/* Bottom Nav */}
        <div style={{
          background: t.navBg,
          borderTop: `1px solid ${t.border}`,
          padding: '8px 0 20px',
          display: 'flex',
          flexShrink: 0,
          boxShadow: `0 -4px 20px ${t.shadow}`,
        }}>
          {tabs.map(tab => React.createElement('div', {
            key: tab.id,
            onClick: () => setActiveTab(tab.id),
            style: {
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 4,
              padding: '6px 0',
              cursor: 'pointer',
              transition: 'transform 0.15s',
              transform: activeTab === tab.id ? 'translateY(-2px)' : 'translateY(0)',
            }
          },
            React.createElement('div', {
              style: {
                width: 36,
                height: 36,
                borderRadius: 12,
                background: activeTab === tab.id ? t.primaryLight : 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background 0.2s',
              }
            },
              React.createElement(tab.icon, {
                size: 20,
                color: activeTab === tab.id ? t.primary : t.textTertiary,
                strokeWidth: activeTab === tab.id ? 2.5 : 1.75,
              })
            ),
            React.createElement('span', {
              style: {
                fontSize: 10,
                fontWeight: 700,
                color: activeTab === tab.id ? t.primary : t.textTertiary,
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }
            }, tab.label)
          ))}
        </div>

        {/* Ritual Execution Overlay */}
        {activeRitual && (
          <div style={{
            position: 'absolute', inset: 0,
            background: t.overlay,
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'flex-end',
            zIndex: 100,
          }}>
            <div style={{
              background: t.surface,
              borderRadius: '28px 28px 0 0',
              width: '100%',
              padding: 24,
              maxHeight: '80%',
              overflowY: 'auto',
            }}>
              {/* Close */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <div>
                  <p style={{ color: t.textSecondary, fontSize: 12, fontWeight: 600, marginBottom: 2 }}>
                    Step {ritualStep + 1} of {activeRitual.steps.length}
                  </p>
                  <h3 style={{ color: t.text, fontSize: 18, fontWeight: 800 }}>{activeRitual.name}</h3>
                </div>
                <div onClick={closeRitual} style={{ width: 36, height: 36, borderRadius: '50%', background: t.surfaceAlt, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                  {React.createElement(window.lucide.X, { size: 18, color: t.textSecondary })}
                </div>
              </div>

              {/* Progress Bar */}
              <div style={{ background: t.border, borderRadius: 4, height: 4, marginBottom: 24 }}>
                <div style={{ height: '100%', borderRadius: 4, background: t.primaryGradient, width: `${((ritualStep + 1) / activeRitual.steps.length) * 100}%`, transition: 'width 0.4s ease' }} />
              </div>

              {/* Step Content */}
              <div style={{ background: activeRitual.bgColor, borderRadius: 24, padding: 24, marginBottom: 20, textAlign: 'center' }}>
                <div style={{ fontSize: 48, marginBottom: 12 }}>{activeRitual.emoji}</div>
                <h4 style={{ color: '#1A1035', fontSize: 20, fontWeight: 800, marginBottom: 10 }}>
                  {activeRitual.steps[ritualStep].title}
                </h4>
                <p style={{ color: '#4B4575', fontSize: 14, lineHeight: 1.6 }}>
                  {activeRitual.steps[ritualStep].desc}
                </p>
              </div>

              {/* Timer */}
              <div style={{ textAlign: 'center', marginBottom: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                  {React.createElement(window.lucide.Clock, { size: 16, color: t.textSecondary })}
                  <span style={{ color: t.text, fontSize: 22, fontWeight: 800, fontVariantNumeric: 'tabular-nums' }}>
                    {formatTime(timer)}
                  </span>
                </div>
                <p style={{ color: t.textSecondary, fontSize: 12, marginTop: 2 }}>
                  Suggested: ~{activeRitual.steps[ritualStep].time}s
                </p>
              </div>

              {/* Controls */}
              <div style={{ display: 'flex', gap: 12 }}>
                <div
                  onClick={() => setIsTimerRunning(p => !p)}
                  style={{ flex: 1, background: t.surfaceAlt, borderRadius: 16, padding: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', gap: 8 }}
                >
                  {React.createElement(isTimerRunning ? window.lucide.Pause : window.lucide.Play, { size: 18, color: t.primary })}
                  <span style={{ color: t.primary, fontSize: 14, fontWeight: 700 }}>{isTimerRunning ? 'Pause' : 'Resume'}</span>
                </div>
                <div
                  onClick={nextStep}
                  onMouseDown={() => setPressedButton('next')}
                  onMouseUp={() => setPressedButton(null)}
                  style={{ flex: 2, background: t.primaryGradient, borderRadius: 16, padding: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', gap: 8, ...btn('next'), boxShadow: t.shadowMd }}
                >
                  {React.createElement(ritualStep === activeRitual.steps.length - 1 ? window.lucide.CheckCircle : window.lucide.ArrowRight, { size: 18, color: '#fff' })}
                  <span style={{ color: '#fff', fontSize: 14, fontWeight: 700 }}>
                    {ritualStep === activeRitual.steps.length - 1 ? 'Complete!' : 'Next Step'}
                  </span>
                </div>
              </div>

              {/* Step dots */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 16 }}>
                {activeRitual.steps.map((_, i) => (
                  <div key={i} style={{ width: i === ritualStep ? 20 : 6, height: 6, borderRadius: 3, background: i === ritualStep ? t.primary : t.border, transition: 'all 0.3s' }} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Add Moment Modal */}
        {showMomentModal && (
          <div style={{ position: 'absolute', inset: 0, background: t.overlay, display: 'flex', alignItems: 'flex-end', zIndex: 100 }}>
            <div style={{ background: t.surface, borderRadius: '28px 28px 0 0', width: '100%', padding: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <h3 style={{ color: t.text, fontSize: 18, fontWeight: 800 }}>Add a Moment</h3>
                <div onClick={() => setShowMomentModal(false)} style={{ width: 36, height: 36, borderRadius: '50%', background: t.surfaceAlt, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                  {React.createElement(window.lucide.X, { size: 18, color: t.textSecondary })}
                </div>
              </div>
              <p style={{ color: t.textSecondary, fontSize: 13, marginBottom: 16 }}>When does this moment happen in your day?</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
                {['After waking', 'Before commute', 'After lunch', 'Feeling stressed', 'End of day', 'Before sleep', 'After exercise', 'Custom...'].map((tag, i) => (
                  <div key={i} style={{ background: t.primaryLight, borderRadius: 20, padding: '8px 14px', cursor: 'pointer' }}>
                    <span style={{ color: t.primary, fontSize: 13, fontWeight: 600 }}>{tag}</span>
                  </div>
                ))}
              </div>
              <div
                onClick={() => setShowMomentModal(false)}
                style={{ background: t.primaryGradient, borderRadius: 16, padding: '14px', textAlign: 'center', cursor: 'pointer', boxShadow: t.shadowMd }}
              >
                <span style={{ color: '#fff', fontSize: 15, fontWeight: 700 }}>Choose a Ritual →</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
