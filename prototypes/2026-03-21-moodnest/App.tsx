function App() {
  const { useState, useEffect, useRef } = React;

  // ─── Icons ───────────────────────────────────────────────────────────────
  const { Home, BookOpen, Compass, Settings, Wind, Heart, Zap, Coffee,
          Sun, Moon, Clock, ChevronRight, Check, Star, Play, Pause,
          RotateCcw, ArrowLeft, Plus, Flame, Wifi, Battery, Signal,
          Sparkles, Leaf, Brain, Music, Eye, Shield, Smile } = window.lucide;

  // ─── Font ────────────────────────────────────────────────────────────────
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');`;
    document.head.appendChild(style);
  }, []);

  // ─── Themes ──────────────────────────────────────────────────────────────
  const themes = {
    light: {
      bg: '#F4F1FF',
      surface: '#FFFFFF',
      surfaceAlt: '#EDE8FF',
      surfaceAlt2: '#FAF8FF',
      text: '#180F3D',
      textSub: '#5C4B8A',
      textMuted: '#9987C2',
      primary: '#7C3AED',
      primaryHover: '#6D28D9',
      primaryLight: '#EDE9FE',
      primaryGrad: 'linear-gradient(135deg, #7C3AED 0%, #A855F7 100%)',
      accentGrad: 'linear-gradient(135deg, #F59E0B 0%, #EF4444 100%)',
      calmGrad: 'linear-gradient(135deg, #06B6D4 0%, #7C3AED 100%)',
      border: '#E4DCFF',
      card: '#FFFFFF',
      cardShadow: '0 2px 16px rgba(124,58,237,0.08)',
      navBg: '#FFFFFF',
      navBorder: '#EDE8FF',
      statusText: '#180F3D',
      pill: '#EDE8FF',
      pillText: '#7C3AED',
      success: '#10B981',
      warn: '#F59E0B',
    },
    dark: {
      bg: '#0C0818',
      surface: '#160F2C',
      surfaceAlt: '#1F1640',
      surfaceAlt2: '#130C24',
      text: '#EDE8FF',
      textSub: '#B09FE0',
      textMuted: '#6B5A9A',
      primary: '#A78BFA',
      primaryHover: '#8B5CF6',
      primaryLight: '#2D1F5E',
      primaryGrad: 'linear-gradient(135deg, #6D28D9 0%, #9333EA 100%)',
      accentGrad: 'linear-gradient(135deg, #F59E0B 0%, #EF4444 100%)',
      calmGrad: 'linear-gradient(135deg, #0891B2 0%, #6D28D9 100%)',
      border: '#2A1D55',
      card: '#160F2C',
      cardShadow: '0 2px 16px rgba(0,0,0,0.4)',
      navBg: '#0C0818',
      navBorder: '#1F1640',
      statusText: '#EDE8FF',
      pill: '#2D1F5E',
      pillText: '#A78BFA',
      success: '#34D399',
      warn: '#FBBF24',
    }
  };

  // ─── State ────────────────────────────────────────────────────────────────
  const [isDark, setIsDark] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [checkInStep, setCheckInStep] = useState(0); // 0=mood, 1=situation, 2=time, 3=ritual
  const [selectedMood, setSelectedMood] = useState(null);
  const [selectedSituation, setSelectedSituation] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [activeRitual, setActiveRitual] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(90);
  const [stepDone, setStepDone] = useState(false);
  const [savedRituals, setSavedRituals] = useState([
    { id: 1, name: 'Desk Decompression', emoji: '🪑', duration: '4 min', uses: 12, tag: 'Work' },
    { id: 2, name: 'Pre-Sleep Wind Down', emoji: '🌙', duration: '5 min', uses: 8, tag: 'Evening' },
    { id: 3, name: 'Social Reset', emoji: '🫧', duration: '3 min', uses: 5, tag: 'Social' },
    { id: 4, name: 'Morning Anchor', emoji: '☀️', duration: '5 min', uses: 19, tag: 'Morning' },
  ]);
  const [pressedBtn, setPressedBtn] = useState(null);

  const t = themes[isDark ? 'dark' : 'light'];
  const font = 'Plus Jakarta Sans, sans-serif';

  // ─── Timer ────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!timerActive) return;
    if (timeLeft <= 0) { setTimerActive(false); setStepDone(true); return; }
    const id = setInterval(() => setTimeLeft(p => p - 1), 1000);
    return () => clearInterval(id);
  }, [timerActive, timeLeft]);

  const formatTime = (s) => `${Math.floor(s/60)}:${String(s%60).padStart(2,'0')}`;

  // ─── Data ─────────────────────────────────────────────────────────────────
  const moods = [
    { id: 'tense', emoji: '😤', label: 'Tense', color: '#EF4444' },
    { id: 'drained', emoji: '😶', label: 'Drained', color: '#6366F1' },
    { id: 'anxious', emoji: '😰', label: 'Anxious', color: '#F59E0B' },
    { id: 'scattered', emoji: '🌀', label: 'Scattered', color: '#8B5CF6' },
    { id: 'low', emoji: '😔', label: 'Low', color: '#64748B' },
    { id: 'okay', emoji: '😌', label: 'Just Okay', color: '#10B981' },
  ];

  const situations = {
    tense: ['Hard work meeting', 'Argument aftermath', 'Deadline pressure', 'Commute stress'],
    drained: ['Long social day', 'Post-work collapse', 'Too many decisions', 'Bad night sleep'],
    anxious: ['Big event coming', 'Conflict brewing', 'Sunday night dread', 'Health worry'],
    scattered: ['Overwhelmed inbox', 'Too many tasks', 'No clear direction', 'Constant interruptions'],
    low: ['Felt dismissed', 'Plans fell through', 'Missing connection', 'Comparison spiral'],
    okay: ['Need a reset', 'Want to feel grounded', 'Transition moment', 'Proactive check-in'],
  };

  const timeOptions = ['2 min', '5 min', '10 min', '15+ min'];

  const ritualLibrary = {
    tense_2: {
      name: 'Quick Release', emoji: '💨', duration: '2 min', tag: 'Tension',
      color: '#EF4444',
      steps: [
        { title: 'Exhale Tension', desc: 'Breathe in for 4 counts, hold 1, exhale slowly for 6. Feel your jaw unclench.', duration: 60, icon: 'Wind' },
        { title: 'Shoulder Drop', desc: 'Raise shoulders to ears, hold 3 seconds, let them fall. Repeat 3 times.', duration: 30, icon: 'Zap' },
      ]
    },
    tense_5: {
      name: 'Desk Decompression', emoji: '🪑', duration: '4 min', tag: 'Work',
      color: '#EF4444',
      steps: [
        { title: '4-7-8 Breath', desc: 'Inhale 4 counts, hold 7, exhale 8. This activates your parasympathetic system.', duration: 90, icon: 'Wind' },
        { title: 'Posture Reset', desc: 'Roll shoulders back, lengthen spine, tuck chin slightly. Feel tall and stable.', duration: 45, icon: 'Zap' },
        { title: 'Confidence Cue', desc: 'Name one thing you handled well today. Say it out loud or write it down.', duration: 60, icon: 'Sparkles' },
        { title: 'Hand Warm-up', desc: 'Rub palms together until warm, then place them over your eyes for 20 seconds.', duration: 45, icon: 'Heart' },
      ]
    },
    anxious_5: {
      name: 'Ground & Settle', emoji: '🌿', duration: '5 min', tag: 'Anxiety',
      color: '#F59E0B',
      steps: [
        { title: '5-4-3-2-1 Sense', desc: 'Name 5 things you see, 4 you hear, 3 you can touch, 2 you smell, 1 you taste.', duration: 120, icon: 'Eye' },
        { title: 'Slow Exhale', desc: 'Make your exhale twice as long as your inhale. This signals safety to your nervous system.', duration: 90, icon: 'Wind' },
        { title: 'Boundary Check', desc: 'What is actually within your control right now? Name just one thing you can do.', duration: 90, icon: 'Shield' },
      ]
    },
    drained_5: {
      name: 'Energy Recharge', emoji: '🔋', duration: '5 min', tag: 'Recovery',
      color: '#6366F1',
      steps: [
        { title: 'Permission Stop', desc: 'You don\'t have to do anything for the next 5 minutes. Close your task apps.', duration: 30, icon: 'Leaf' },
        { title: 'Body Scan', desc: 'Start at your feet, slowly notice each body part. Breathe into anywhere tight.', duration: 120, icon: 'Heart' },
        { title: 'One Nourish', desc: 'Drink water, eat something small, or step outside. One physical act of care.', duration: 90, icon: 'Smile' },
        { title: 'Micro-rest', desc: 'Close your eyes, let thoughts pass without grabbing them. Just breathe for 60 seconds.', duration: 60, icon: 'Moon' },
      ]
    },
    scattered_5: {
      name: 'Focus Funnel', emoji: '🌀', duration: '4 min', tag: 'Clarity',
      color: '#8B5CF6',
      steps: [
        { title: 'Brain Dump', desc: 'Write or type everything in your head right now. Get it out of your mind and onto paper.', duration: 90, icon: 'Brain' },
        { title: 'One-Thing Pick', desc: 'Look at your list. Circle the single most important thing. The rest can wait.', duration: 60, icon: 'Star' },
        { title: 'Reset Breath', desc: 'Three deep breaths. Exhale fully each time. You\'re starting fresh with one clear goal.', duration: 45, icon: 'Wind' },
        { title: 'Intention Set', desc: 'Say: "Right now I am working on [one thing] for the next [timeframe]." Then begin.', duration: 45, icon: 'Sparkles' },
      ]
    },
    low_5: {
      name: 'Gentle Lift', emoji: '🌸', duration: '5 min', tag: 'Mood',
      color: '#64748B',
      steps: [
        { title: 'Feel It First', desc: 'Don\'t rush past the feeling. Name it: "I feel [low/dismissed/sad]." That\'s valid.', duration: 60, icon: 'Heart' },
        { title: 'Movement Shift', desc: 'Walk to another room, shake your hands out, or do 5 slow neck rolls. Change your state.', duration: 60, icon: 'Zap' },
        { title: 'Evidence Collect', desc: 'Name one person who sees you. Name one thing you did that had impact. Just one.', duration: 90, icon: 'Sparkles' },
        { title: 'Reach or Rest', desc: 'Text someone you trust, or give yourself permission to rest without guilt. Both are valid.', duration: 90, icon: 'Smile' },
      ]
    },
  };

  const getRitual = () => {
    if (!selectedMood || !selectedTime) return ritualLibrary['tense_5'];
    const timeKey = ['2 min', '5 min'].includes(selectedTime) ? selectedTime.replace(' min','') : '5';
    const key = `${selectedMood}_${timeKey}`;
    return ritualLibrary[key] || ritualLibrary[`${selectedMood}_5`] || ritualLibrary['tense_5'];
  };

  const discoverCategories = [
    { emoji: '🌅', name: 'Morning Anchors', count: 8, grad: 'linear-gradient(135deg,#F59E0B,#EF4444)' },
    { emoji: '💼', name: 'Work Resets', count: 12, grad: 'linear-gradient(135deg,#7C3AED,#6366F1)' },
    { emoji: '🌙', name: 'Evening Wind-Down', count: 6, grad: 'linear-gradient(135deg,#1E40AF,#7C3AED)' },
    { emoji: '🫧', name: 'Social Recovery', count: 5, grad: 'linear-gradient(135deg,#06B6D4,#7C3AED)' },
    { emoji: '😰', name: 'Anxiety Toolkit', count: 9, grad: 'linear-gradient(135deg,#F59E0B,#10B981)' },
    { emoji: '🔋', name: 'Energy Lifts', count: 7, grad: 'linear-gradient(135deg,#10B981,#06B6D4)' },
  ];

  const featuredRituals = [
    { emoji: '🧘', name: 'Pre-Presentation Calm', tag: '3 min', color: '#7C3AED' },
    { emoji: '🌃', name: 'Late-Night Overthink', tag: '5 min', color: '#1E40AF' },
    { emoji: '🚇', name: 'Post-Commute Reset', tag: '4 min', color: '#06B6D4' },
  ];

  // ─── Press Effect ─────────────────────────────────────────────────────────
  const press = (id, fn) => {
    setPressedBtn(id);
    setTimeout(() => { setPressedBtn(null); fn && fn(); }, 150);
  };

  // ─── Styles ───────────────────────────────────────────────────────────────
  const s = {
    page: { width: '100%', height: '100%', background: t.bg, fontFamily: font, display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' },
    scroll: { flex: 1, overflowY: 'auto', padding: '0 0 80px 0', scrollbarWidth: 'none' },
    section: { padding: '0 20px' },
    card: { background: t.card, borderRadius: 20, padding: '16px', boxShadow: t.cardShadow, marginBottom: 12, border: `1px solid ${t.border}` },
    btn: (pressed) => ({ transform: pressed ? 'scale(0.96)' : 'scale(1)', transition: 'all 0.15s ease' }),
    pill: { background: t.pill, color: t.pillText, borderRadius: 30, padding: '4px 12px', fontSize: 12, fontWeight: 600, display: 'inline-block' },
    h1: { fontSize: 26, fontWeight: 800, color: t.text, margin: 0 },
    h2: { fontSize: 20, fontWeight: 700, color: t.text, margin: 0 },
    h3: { fontSize: 15, fontWeight: 700, color: t.text, margin: 0 },
    body: { fontSize: 14, color: t.textSub, lineHeight: 1.5, margin: 0 },
    sub: { fontSize: 12, color: t.textMuted, margin: 0 },
    row: { display: 'flex', alignItems: 'center', gap: 8 },
    rowBetween: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
  };

  // ─── Status Bar ───────────────────────────────────────────────────────────
  const StatusBar = () => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 24px 4px', flexShrink: 0 }}>
      <span style={{ fontSize: 14, fontWeight: 700, color: t.statusText, fontFamily: font }}>9:41</span>
      <div style={{ width: 120, height: 34, background: '#000', borderRadius: 20, position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: 0 }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <Signal size={14} color={t.statusText} />
        <Wifi size={14} color={t.statusText} />
        <Battery size={14} color={t.statusText} />
      </div>
    </div>
  );

  // ─── Nav Bar ─────────────────────────────────────────────────────────────
  const NavBar = () => {
    const tabs = [
      { id: 'home', Icon: Home, label: 'Home' },
      { id: 'discover', Icon: Compass, label: 'Discover' },
      { id: 'playbook', Icon: BookOpen, label: 'Playbook' },
      { id: 'settings', Icon: Settings, label: 'Profile' },
    ];
    return (
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: t.navBg, borderTop: `1px solid ${t.navBorder}`, display: 'flex', padding: '8px 0 20px', zIndex: 100, boxShadow: `0 -4px 20px rgba(0,0,0,0.06)` }}>
        {tabs.map(({ id, Icon, label }) => {
          const active = activeTab === id;
          return (
            <div key={id} onClick={() => { setActiveTab(id); if (id === 'home') { setCheckInStep(0); setSelectedMood(null); setSelectedSituation(null); setSelectedTime(null); }}}
              style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, cursor: 'pointer', transition: 'all 0.2s' }}>
              <div style={{ width: 44, height: 28, borderRadius: 14, background: active ? t.primaryLight : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}>
                <Icon size={18} color={active ? t.primary : t.textMuted} strokeWidth={active ? 2.5 : 2} />
              </div>
              <span style={{ fontSize: 10, fontWeight: active ? 700 : 500, color: active ? t.primary : t.textMuted, fontFamily: font }}>{label}</span>
            </div>
          );
        })}
      </div>
    );
  };

  // ─── HOME SCREEN ─────────────────────────────────────────────────────────
  const HomeScreen = () => {
    const ritual = getRitual();

    // Step 0: Mood selection
    if (checkInStep === 0) return (
      <div style={s.scroll}>
        {/* Header */}
        <div style={{ padding: '16px 20px 8px', ...s.rowBetween }}>
          <div>
            <p style={{ ...s.sub, marginBottom: 2 }}>Good afternoon</p>
            <h1 style={s.h1}>How are you<br />feeling right now?</h1>
          </div>
          <div style={{ width: 48, height: 48, borderRadius: 24, background: t.primaryGrad, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Sparkles size={22} color="#fff" />
          </div>
        </div>

        {/* Streak */}
        <div style={{ ...s.section, marginBottom: 20 }}>
          <div style={{ ...s.card, background: t.primaryGrad, border: 'none', padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 42, height: 42, borderRadius: 21, background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Flame size={22} color="#fff" />
            </div>
            <div>
              <p style={{ fontSize: 22, fontWeight: 800, color: '#fff', margin: 0 }}>7-day streak</p>
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)', margin: 0 }}>You've shown up every day this week</p>
            </div>
          </div>
        </div>

        {/* Mood Grid */}
        <div style={{ ...s.section, marginBottom: 24 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
            {moods.map(mood => {
              const selected = selectedMood === mood.id;
              return (
                <div key={mood.id}
                  onClick={() => { setSelectedMood(mood.id); press(mood.id, () => setCheckInStep(1)); }}
                  style={{ ...s.btn(pressedBtn === mood.id), background: selected ? mood.color + '18' : t.card, border: `2px solid ${selected ? mood.color : t.border}`, borderRadius: 18, padding: '16px 8px', textAlign: 'center', cursor: 'pointer', boxShadow: selected ? `0 4px 12px ${mood.color}30` : t.cardShadow }}>
                  <div style={{ fontSize: 28, marginBottom: 6 }}>{mood.emoji}</div>
                  <p style={{ fontSize: 12, fontWeight: 700, color: selected ? mood.color : t.textSub, margin: 0 }}>{mood.label}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent */}
        <div style={s.section}>
          <p style={{ ...s.sub, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 10 }}>Last ritual</p>
          <div style={{ ...s.card, display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer' }}
            onClick={() => { setActiveRitual(ritualLibrary['tense_5']); setCheckInStep(3); setCurrentStep(0); setTimerActive(false); setTimeLeft(90); setStepDone(false); }}>
            <div style={{ width: 48, height: 48, borderRadius: 24, background: t.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>🪑</div>
            <div style={{ flex: 1 }}>
              <p style={s.h3}>Desk Decompression</p>
              <p style={{ ...s.sub, marginTop: 2 }}>Yesterday · 4 min · Work</p>
            </div>
            <div style={s.pill}>Repeat</div>
          </div>
        </div>
      </div>
    );

    // Step 1: Situation
    if (checkInStep === 1) return (
      <div style={s.scroll}>
        <div style={{ padding: '16px 20px 20px' }}>
          <div style={s.row} onClick={() => setCheckInStep(0)} style={{ cursor: 'pointer', marginBottom: 16 }}>
            <ArrowLeft size={20} color={t.textSub} />
            <span style={{ fontSize: 14, color: t.textSub, fontFamily: font }}>Back</span>
          </div>
          <p style={{ ...s.sub, marginBottom: 4 }}>Step 2 of 3</p>
          <h2 style={{ ...s.h2, marginBottom: 4 }}>What just happened?</h2>
          <p style={{ ...s.body, marginBottom: 24 }}>Pick the situation that fits best</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {(situations[selectedMood] || []).map((sit, i) => {
              const sel = selectedSituation === sit;
              return (
                <div key={i} onClick={() => { setSelectedSituation(sit); press(`sit${i}`, () => setCheckInStep(2)); }}
                  style={{ ...s.btn(pressedBtn === `sit${i}`), ...s.card, display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', border: `2px solid ${sel ? t.primary : t.border}`, background: sel ? t.primaryLight : t.card }}>
                  <div style={{ width: 36, height: 36, borderRadius: 18, background: sel ? t.primary : t.surfaceAlt, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {sel ? <Check size={18} color="#fff" /> : <span style={{ fontSize: 16 }}>⚡</span>}
                  </div>
                  <p style={{ ...s.h3, color: sel ? t.primary : t.text, flex: 1 }}>{sit}</p>
                  <ChevronRight size={16} color={sel ? t.primary : t.textMuted} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );

    // Step 2: Time
    if (checkInStep === 2) return (
      <div style={s.scroll}>
        <div style={{ padding: '16px 20px 20px' }}>
          <div style={{ ...s.row, cursor: 'pointer', marginBottom: 16 }} onClick={() => setCheckInStep(1)}>
            <ArrowLeft size={20} color={t.textSub} />
            <span style={{ fontSize: 14, color: t.textSub, fontFamily: font }}>Back</span>
          </div>
          <p style={{ ...s.sub, marginBottom: 4 }}>Step 3 of 3</p>
          <h2 style={{ ...s.h2, marginBottom: 4 }}>How much time<br />do you have?</h2>
          <p style={{ ...s.body, marginBottom: 24 }}>We'll build a ritual that fits.</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {timeOptions.map((t_, i) => {
              const sel = selectedTime === t_;
              return (
                <div key={i} onClick={() => { setSelectedTime(t_); const r = getRitual(); setActiveRitual(r); press(`time${i}`, () => { setCheckInStep(3); setCurrentStep(0); setTimerActive(false); setTimeLeft(r.steps[0]?.duration || 90); setStepDone(false); }); }}
                  style={{ ...s.btn(pressedBtn === `time${i}`), background: sel ? t.primary : t.card, border: `2px solid ${sel ? t.primary : t.border}`, borderRadius: 18, padding: '20px 16px', textAlign: 'center', cursor: 'pointer', boxShadow: sel ? `0 4px 16px ${t.primary}40` : t.cardShadow }}>
                  <Clock size={20} color={sel ? '#fff' : t.primary} style={{ marginBottom: 8 }} />
                  <p style={{ fontSize: 16, fontWeight: 700, color: sel ? '#fff' : t.text, margin: 0, fontFamily: font }}>{t_}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );

    // Step 3: Ritual
    if (checkInStep === 3 && activeRitual) {
      const step = activeRitual.steps[currentStep];
      const total = activeRitual.steps.length;
      const progress = ((currentStep + (stepDone ? 1 : 0)) / total) * 100;
      const allDone = currentStep >= total;
      const iconMap = { Wind, Zap, Sparkles, Heart, Eye, Shield, Leaf, Brain, Star, Moon: Moon, Smile };
      const StepIcon = iconMap[step?.icon] || Sparkles;

      if (allDone) return (
        <div style={{ ...s.scroll, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 24px', textAlign: 'center', flex: 1 }}>
          <div style={{ width: 80, height: 80, borderRadius: 40, background: t.primaryGrad, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, boxShadow: `0 8px 24px ${t.primary}40` }}>
            <Check size={36} color="#fff" strokeWidth={3} />
          </div>
          <h2 style={{ ...s.h1, marginBottom: 8 }}>Ritual complete!</h2>
          <p style={{ ...s.body, marginBottom: 32, maxWidth: 260 }}>You showed up for yourself. That's what matters.</p>
          <div style={{ width: '100%', ...s.card, marginBottom: 12 }}>
            <div style={s.rowBetween}>
              <div>
                <p style={s.h3}>{activeRitual.name}</p>
                <p style={{ ...s.sub, marginTop: 3 }}>{activeRitual.tag} · {activeRitual.duration}</p>
              </div>
              <span style={{ fontSize: 28 }}>{activeRitual.emoji}</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10, width: '100%' }}>
            <div onClick={() => { const newRitual = { id: Date.now(), name: activeRitual.name, emoji: activeRitual.emoji, duration: activeRitual.duration, uses: 1, tag: activeRitual.tag }; setSavedRituals(p => [newRitual, ...p]); }}
              style={{ flex: 1, background: t.primaryLight, borderRadius: 16, padding: '14px', textAlign: 'center', cursor: 'pointer' }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: t.primary, margin: 0, fontFamily: font }}>Save to Playbook</p>
            </div>
            <div onClick={() => { setCheckInStep(0); setSelectedMood(null); setSelectedSituation(null); setSelectedTime(null); }}
              style={{ flex: 1, background: t.primaryGrad, borderRadius: 16, padding: '14px', textAlign: 'center', cursor: 'pointer', boxShadow: `0 4px 12px ${t.primary}40` }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: '#fff', margin: 0, fontFamily: font }}>Done</p>
            </div>
          </div>
        </div>
      );

      return (
        <div style={s.scroll}>
          <div style={{ padding: '16px 20px 0' }}>
            <div style={{ ...s.rowBetween, marginBottom: 16 }}>
              <div style={{ ...s.row, cursor: 'pointer' }} onClick={() => setCheckInStep(2)}>
                <ArrowLeft size={20} color={t.textSub} />
                <span style={{ fontSize: 14, color: t.textSub, fontFamily: font }}>Exit</span>
              </div>
              <div style={s.pill}>{step ? `${currentStep + 1} of ${total}` : 'Done'}</div>
            </div>

            {/* Progress */}
            <div style={{ height: 6, background: t.surfaceAlt, borderRadius: 3, marginBottom: 20, overflow: 'hidden' }}>
              <div style={{ width: `${progress}%`, height: '100%', background: t.primaryGrad, borderRadius: 3, transition: 'width 0.4s ease' }} />
            </div>

            {/* Ritual Card */}
            <div style={{ ...s.card, background: t.primaryGrad, border: 'none', padding: '24px', marginBottom: 16, minHeight: 180 }}>
              <div style={{ width: 56, height: 56, borderRadius: 28, background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                <StepIcon size={26} color="#fff" />
              </div>
              <p style={{ fontSize: 20, fontWeight: 800, color: '#fff', margin: '0 0 8px', fontFamily: font }}>{step?.title}</p>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.85)', lineHeight: 1.6, margin: 0 }}>{step?.desc}</p>
            </div>

            {/* Timer */}
            <div style={{ ...s.card, textAlign: 'center', padding: '24px' }}>
              <div style={{ fontSize: 48, fontWeight: 800, color: t.primary, fontFamily: font, letterSpacing: -2, marginBottom: 4 }}>
                {formatTime(timeLeft)}
              </div>
              <p style={{ ...s.sub, marginBottom: 16 }}>Duration: {formatTime(step?.duration || 90)}</p>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                <div onClick={() => { setTimeLeft(step?.duration || 90); setTimerActive(false); setStepDone(false); }}
                  style={{ width: 48, height: 48, borderRadius: 24, background: t.surfaceAlt, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                  <RotateCcw size={20} color={t.textSub} />
                </div>
                <div onClick={() => setTimerActive(p => !p)}
                  style={{ width: 72, height: 48, borderRadius: 24, background: t.primaryGrad, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: `0 4px 12px ${t.primary}50` }}>
                  {timerActive ? <Pause size={22} color="#fff" /> : <Play size={22} color="#fff" fill="#fff" />}
                </div>
              </div>
            </div>

            {/* Next Step */}
            <div onClick={() => { const next = currentStep + 1; setCurrentStep(next); if (next < total) { setTimeLeft(activeRitual.steps[next].duration); setTimerActive(false); setStepDone(false); } }}
              style={{ ...s.btn(pressedBtn === 'next'), background: stepDone || !timerActive ? t.card : t.primaryGrad, border: `2px solid ${t.border}`, borderRadius: 18, padding: '16px', textAlign: 'center', cursor: 'pointer', marginBottom: 8 }}
              onClickCapture={() => press('next', null)}>
              <p style={{ fontSize: 15, fontWeight: 700, color: t.primary, margin: 0, fontFamily: font }}>
                {currentStep < total - 1 ? `Next: ${activeRitual.steps[currentStep + 1]?.title}` : 'Finish Ritual →'}
              </p>
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  // ─── DISCOVER SCREEN ───────────────────────────────────────────────────────
  const DiscoverScreen = () => (
    <div style={s.scroll}>
      <div style={{ padding: '16px 20px 12px' }}>
        <h1 style={{ ...s.h1, marginBottom: 4 }}>Discover</h1>
        <p style={{ ...s.body, marginBottom: 20 }}>Browse rituals by life moment</p>

        {/* Featured */}
        <p style={{ ...s.sub, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 10 }}>Featured</p>
        <div style={{ display: 'flex', gap: 12, marginBottom: 24, overflowX: 'auto', paddingBottom: 4, scrollbarWidth: 'none' }}>
          {featuredRituals.map((r, i) => (
            <div key={i} style={{ flexShrink: 0, width: 160, background: t.primaryGrad, borderRadius: 20, padding: '20px 16px', cursor: 'pointer', boxShadow: `0 4px 16px ${t.primary}30` }}>
              <div style={{ fontSize: 30, marginBottom: 10 }}>{r.emoji}</div>
              <p style={{ fontSize: 13, fontWeight: 700, color: '#fff', margin: '0 0 6px', fontFamily: font }}>{r.name}</p>
              <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: 10, padding: '3px 8px', display: 'inline-block' }}>
                <p style={{ fontSize: 11, color: '#fff', margin: 0, fontWeight: 600 }}>{r.tag}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Categories */}
        <p style={{ ...s.sub, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 12 }}>Categories</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {discoverCategories.map((cat, i) => (
            <div key={i} style={{ borderRadius: 20, padding: '20px 16px', cursor: 'pointer', background: t.card, border: `1px solid ${t.border}`, boxShadow: t.cardShadow }}>
              <div style={{ width: 44, height: 44, borderRadius: 22, background: cat.grad, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10, fontSize: 22 }}>{cat.emoji}</div>
              <p style={{ fontSize: 13, fontWeight: 700, color: t.text, margin: '0 0 4px', fontFamily: font }}>{cat.name}</p>
              <p style={{ ...s.sub }}>{cat.count} rituals</p>
            </div>
          ))}
        </div>

        {/* Trending */}
        <p style={{ ...s.sub, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 12, marginTop: 24 }}>Trending this week</p>
        {[
          { emoji: '🌬️', name: 'Box Breathing Reset', tag: 'Calm', uses: '2.4k' },
          { emoji: '📝', name: 'Worry Dump & Release', tag: 'Anxiety', uses: '1.8k' },
          { emoji: '💧', name: 'Cold Splash Reset', tag: 'Energy', uses: '1.2k' },
        ].map((r, i) => (
          <div key={i} style={{ ...s.card, display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer' }}>
            <div style={{ width: 44, height: 44, borderRadius: 22, background: t.surfaceAlt, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>{r.emoji}</div>
            <div style={{ flex: 1 }}>
              <p style={s.h3}>{r.name}</p>
              <p style={{ ...s.sub, marginTop: 2 }}>{r.tag} · {r.uses} uses</p>
            </div>
            <Plus size={18} color={t.primary} />
          </div>
        ))}
      </div>
    </div>
  );

  // ─── PLAYBOOK SCREEN ──────────────────────────────────────────────────────
  const PlaybookScreen = () => (
    <div style={s.scroll}>
      <div style={{ padding: '16px 20px 12px' }}>
        <div style={{ ...s.rowBetween, marginBottom: 4 }}>
          <h1 style={s.h1}>My Playbook</h1>
          <div style={{ width: 36, height: 36, borderRadius: 18, background: t.primaryGrad, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <Plus size={18} color="#fff" />
          </div>
        </div>
        <p style={{ ...s.body, marginBottom: 20 }}>Your personal ritual collection</p>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 20 }}>
          {[
            { label: 'Saved', value: savedRituals.length, icon: '📚' },
            { label: 'Total Uses', value: savedRituals.reduce((a, r) => a + r.uses, 0), icon: '⚡' },
            { label: 'Day Streak', value: 7, icon: '🔥' },
          ].map((stat, i) => (
            <div key={i} style={{ ...s.card, textAlign: 'center', padding: '14px 8px' }}>
              <div style={{ fontSize: 20, marginBottom: 4 }}>{stat.icon}</div>
              <p style={{ fontSize: 20, fontWeight: 800, color: t.primary, margin: 0, fontFamily: font }}>{stat.value}</p>
              <p style={{ ...s.sub, marginTop: 2 }}>{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Rituals List */}
        <p style={{ ...s.sub, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 12 }}>Saved Rituals</p>
        {savedRituals.map((ritual) => (
          <div key={ritual.id} style={{ ...s.card, display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer' }}
            onClick={() => { setActiveRitual(ritualLibrary['tense_5']); setCheckInStep(3); setCurrentStep(0); setTimerActive(false); setTimeLeft(90); setStepDone(false); setActiveTab('home'); }}>
            <div style={{ width: 50, height: 50, borderRadius: 25, background: t.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>{ritual.emoji}</div>
            <div style={{ flex: 1 }}>
              <p style={s.h3}>{ritual.name}</p>
              <p style={{ ...s.sub, marginTop: 2 }}>{ritual.tag} · {ritual.duration}</p>
              <div style={{ ...s.row, marginTop: 6 }}>
                <Zap size={11} color={t.warn} />
                <p style={{ fontSize: 11, color: t.warn, margin: 0, fontWeight: 600 }}>{ritual.uses} uses</p>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'flex-end' }}>
              <div style={s.pill}>{ritual.tag}</div>
              <Star size={16} color={t.warn} fill={t.warn} />
            </div>
          </div>
        ))}

        {/* Insights */}
        <p style={{ ...s.sub, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 12, marginTop: 8 }}>Insights</p>
        <div style={{ ...s.card, background: t.calmGrad, border: 'none', padding: '20px' }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.7)', margin: '0 0 8px' }}>YOUR MOST EFFECTIVE RITUAL</p>
          <p style={{ fontSize: 18, fontWeight: 800, color: '#fff', margin: '0 0 4px', fontFamily: font }}>Morning Anchor</p>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', margin: 0 }}>Used 19 times · Helps most with focus</p>
        </div>
      </div>
    </div>
  );

  // ─── SETTINGS SCREEN ──────────────────────────────────────────────────────
  const SettingsScreen = () => (
    <div style={s.scroll}>
      <div style={{ padding: '16px 20px 12px' }}>
        {/* Profile */}
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div style={{ width: 80, height: 80, borderRadius: 40, background: t.primaryGrad, margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 36 }}>🧘</span>
          </div>
          <h2 style={{ ...s.h2, marginBottom: 4 }}>Alex Chen</h2>
          <p style={{ ...s.body }}>Member since March 2025</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 10 }}>
            <div style={s.pill}>7-day streak</div>
            <div style={{ ...s.pill, background: t.warn + '20', color: t.warn }}>Top 10%</div>
          </div>
        </div>

        {/* Theme Toggle */}
        <div style={{ ...s.card, display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
          <div style={{ width: 44, height: 44, borderRadius: 22, background: isDark ? '#1E3A5F' : '#FFF3CD', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {isDark ? <Moon size={20} color="#93C5FD" /> : <Sun size={20} color="#F59E0B" />}
          </div>
          <div style={{ flex: 1 }}>
            <p style={s.h3}>{isDark ? 'Dark Mode' : 'Light Mode'}</p>
            <p style={{ ...s.sub, marginTop: 2 }}>Switch app appearance</p>
          </div>
          <div onClick={() => setIsDark(p => !p)}
            style={{ width: 50, height: 28, borderRadius: 14, background: isDark ? t.primary : t.border, position: 'relative', cursor: 'pointer', transition: 'background 0.3s' }}>
            <div style={{ width: 22, height: 22, borderRadius: 11, background: '#fff', position: 'absolute', top: 3, left: isDark ? 25 : 3, transition: 'left 0.3s', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }} />
          </div>
        </div>

        {/* Preferences */}
        <p style={{ ...s.sub, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 12 }}>Preferences</p>
        {[
          { icon: '🔔', label: 'Daily check-in reminders', sub: '8:00 AM, 2:00 PM', toggle: true },
          { icon: '🎵', label: 'Ambient sounds', sub: 'During rituals', toggle: true },
          { icon: '📊', label: 'Weekly mood insights', sub: 'Every Sunday evening', toggle: false },
        ].map((item, i) => (
          <div key={i} style={{ ...s.card, display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 44, height: 44, borderRadius: 22, background: t.surfaceAlt, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>{item.icon}</div>
            <div style={{ flex: 1 }}>
              <p style={s.h3}>{item.label}</p>
              <p style={{ ...s.sub, marginTop: 2 }}>{item.sub}</p>
            </div>
            <div style={{ width: 44, height: 26, borderRadius: 13, background: item.toggle ? t.primary : t.border, position: 'relative', cursor: 'pointer' }}>
              <div style={{ width: 20, height: 20, borderRadius: 10, background: '#fff', position: 'absolute', top: 3, left: item.toggle ? 21 : 3, boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
            </div>
          </div>
        ))}

        {/* About */}
        <p style={{ ...s.sub, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 12, marginTop: 8 }}>About</p>
        {[
          { icon: '💜', label: 'MoodNest v1.0', sub: 'Turn chaos into calm rituals' },
          { icon: '🔒', label: 'Privacy Policy', sub: 'Your data stays private' },
          { icon: '💬', label: 'Give Feedback', sub: 'Help us improve' },
        ].map((item, i) => (
          <div key={i} style={{ ...s.card, display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer' }}>
            <div style={{ width: 44, height: 44, borderRadius: 22, background: t.surfaceAlt, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>{item.icon}</div>
            <div style={{ flex: 1 }}>
              <p style={s.h3}>{item.label}</p>
              <p style={{ ...s.sub, marginTop: 2 }}>{item.sub}</p>
            </div>
            <ChevronRight size={16} color={t.textMuted} />
          </div>
        ))}
      </div>
    </div>
  );

  // ─── Render ───────────────────────────────────────────────────────────────
  const screens = { home: <HomeScreen />, discover: <DiscoverScreen />, playbook: <PlaybookScreen />, settings: <SettingsScreen /> };

  return (
    <div style={{ minHeight: '100vh', background: '#E8E4F0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: font }}>
      <div style={{ width: 375, height: 812, background: t.bg, borderRadius: 50, overflow: 'hidden', position: 'relative', boxShadow: '0 32px 80px rgba(0,0,0,0.3), 0 0 0 12px #111', display: 'flex', flexDirection: 'column' }}>
        {/* Dynamic Island */}
        <div style={{ width: 120, height: 34, background: '#000', borderRadius: 20, position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: 10, zIndex: 200 }} />

        <StatusBar />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
          {screens[activeTab]}
        </div>
        <NavBar />
      </div>
    </div>
  );
}
