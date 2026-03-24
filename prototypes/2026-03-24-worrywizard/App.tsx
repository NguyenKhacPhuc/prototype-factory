const { useState, useEffect, useRef } = React;

function App() {
  const themes = {
    dark: {
      bg: '#0D0A1E',
      surface: '#1A1030',
      surface2: '#221545',
      primary: '#7C3AED',
      primaryLight: '#A855F7',
      secondary: '#06B6D4',
      accent: '#F59E0B',
      accentGreen: '#10B981',
      text: '#F0E9FF',
      textSecondary: '#9D8EC7',
      border: '#2E1F5A',
      cardBg: '#1E1540',
      navBg: '#140E28',
    },
    light: {
      bg: '#F5F0FF',
      surface: '#FFFFFF',
      surface2: '#EDE8FF',
      primary: '#7C3AED',
      primaryLight: '#A855F7',
      secondary: '#0891B2',
      accent: '#D97706',
      accentGreen: '#059669',
      text: '#1A0A2E',
      textSecondary: '#6B5E8A',
      border: '#E0D5FF',
      cardBg: '#FFFFFF',
      navBg: '#FFFFFF',
    },
  };

  const [themeMode, setThemeMode] = useState('dark');
  const t = themes[themeMode];

  const [showOnboarding, setShowOnboarding] = useState(true);
  const [onboardingSlide, setOnboardingSlide] = useState(0);
  const [activeTab, setActiveTab] = useState('home');
  const [pressedTab, setPressedTab] = useState(null);
  const [showBreathing, setShowBreathing] = useState(false);
  const [breathPhase, setBreathPhase] = useState('inhale');
  const [breathCount, setBreathCount] = useState(0);
  const [breathScale, setBreathScale] = useState(1);

  const fontStyle = "@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800;900&display=swap');* { box-sizing: border-box; } textarea { font-family: 'Nunito', sans-serif; }";

  useEffect(() => {
    if (!showBreathing) { setBreathScale(1); setBreathPhase('inhale'); return; }
    let cancelled = false;
    const runCycle = () => {
      if (cancelled) return;
      setBreathPhase('inhale');
      setBreathScale(1.5);
      setTimeout(() => {
        if (cancelled) return;
        setBreathPhase('hold');
        setTimeout(() => {
          if (cancelled) return;
          setBreathPhase('exhale');
          setBreathScale(0.85);
          setTimeout(() => {
            if (cancelled) return;
            setBreathCount(c => c + 1);
            runCycle();
          }, 4000);
        }, 2000);
      }, 4000);
    };
    runCycle();
    return () => { cancelled = true; };
  }, [showBreathing]);

  const onboardingSlides = [
    { title: 'Meet Wizzo!', subtitle: 'Your magical worry wizard', desc: 'Wizzo turns big feelings into tiny adventures you can actually solve.', color: '#7C3AED', bg: 'linear-gradient(160deg, #2D1B69, #0D0A1E)', emoji: '🧙‍♂️' },
    { title: 'Name Your Worry', subtitle: 'Tell Wizzo what\'s on your mind', desc: 'Type or say your worry — Wizzo listens without judgment and helps you understand it.', color: '#06B6D4', bg: 'linear-gradient(160deg, #0C4A6E, #0D0A1E)', emoji: '💬' },
    { title: 'Go on a Quest!', subtitle: 'Worries become adventures', desc: 'Each worry turns into brave steps. Earn badges and collect courage along the way!', color: '#F59E0B', bg: 'linear-gradient(160deg, #451A03, #0D0A1E)', emoji: '⭐' },
  ];

  const questsData = [
    {
      id: 'q1', title: 'School Presentation Quest', worry: "I'm scared of talking in front of the class",
      steps: [
        { text: 'Practice once in front of your mirror', done: true },
        { text: 'Pick your confidence phrase ("I am brave!")', done: true },
        { text: 'Tell one friend about your topic', done: false },
        { text: 'Take 3 deep breaths before starting', done: false },
      ],
      badge: '🎤', color: '#7C3AED', progress: 0.5,
    },
    {
      id: 'q2', title: 'Bedtime Calm Quest', worry: "I'm worried about monsters at night",
      steps: [
        { text: 'Draw your worry and fold it up small', done: true },
        { text: 'Say the magic calm words 3 times', done: false },
        { text: 'Think of 3 good things from today', done: false },
      ],
      badge: '🌙', color: '#06B6D4', progress: 0.33,
    },
  ];

  const badgesData = [
    { id: 'b1', name: 'First Brave Step', icon: '⭐', color: '#F59E0B', earned: true },
    { id: 'b2', name: 'Brave Speaker', icon: '🎤', color: '#7C3AED', earned: true },
    { id: 'b3', name: 'Breathing Master', icon: '🫧', color: '#06B6D4', earned: false },
    { id: 'b4', name: 'Night Warrior', icon: '🌙', color: '#8B5CF6', earned: false },
    { id: 'b5', name: 'Worry Crusher', icon: '💪', color: '#10B981', earned: false },
    { id: 'b6', name: 'Quest Hero', icon: '🏆', color: '#F59E0B', earned: false },
  ];

  const tabs = [
    { id: 'home', label: 'Home', icon: window.lucide.Home },
    { id: 'worry', label: 'Worry', icon: window.lucide.MessageCircle },
    { id: 'quests', label: 'Quests', icon: window.lucide.Map },
    { id: 'rewards', label: 'Rewards', icon: window.lucide.Star },
    { id: 'settings', label: 'Settings', icon: window.lucide.Settings },
  ];

  // ─── Sub-components ───────────────────────────────────────────────

  function WizzoFace({ size, animated }) {
    const [bounce, setBounce] = useState(false);
    useEffect(() => {
      if (!animated) return;
      const iv = setInterval(() => setBounce(b => !b), 1800);
      return () => clearInterval(iv);
    }, [animated]);
    return React.createElement('div', {
      style: {
        width: size, height: size,
        background: 'linear-gradient(135deg, #7C3AED, #A855F7)',
        borderRadius: '50%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: size * 0.48,
        boxShadow: '0 8px 24px rgba(124,58,237,0.45)',
        transform: bounce ? 'translateY(-7px) scale(1.06)' : 'translateY(0) scale(1)',
        transition: 'transform 0.7s cubic-bezier(0.34,1.56,0.64,1)',
        flexShrink: 0,
        cursor: 'pointer',
      },
    }, '🧙‍♂️');
  }

  function StatusBar() {
    return React.createElement('div', {
      style: {
        height: 54, padding: '14px 24px 0',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        fontFamily: "'Nunito', sans-serif",
      },
    },
      React.createElement('span', { style: { fontSize: 15, fontWeight: 700, color: t.text } }, '9:41'),
      React.createElement('div', { style: { display: 'flex', gap: 6, alignItems: 'center' } },
        React.createElement(window.lucide.Signal, { size: 14, color: t.text }),
        React.createElement(window.lucide.Wifi, { size: 14, color: t.text }),
        React.createElement(window.lucide.Battery, { size: 17, color: t.text }),
      ),
    );
  }

  function QuestCard({ quest, compact }) {
    const done = quest.steps.filter(s => s.done).length;
    return React.createElement('div', {
      style: {
        background: t.surface2, borderRadius: 20, padding: 16,
        border: `1.5px solid ${quest.color}33`,
      },
    },
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 } },
        React.createElement('div', {
          style: {
            width: 42, height: 42, borderRadius: 13,
            background: quest.color + '33',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0,
          },
        }, quest.badge),
        React.createElement('div', { style: { flex: 1 } },
          React.createElement('div', { style: { fontSize: 14, fontWeight: 800, color: t.text, lineHeight: 1.25 } }, quest.title),
          React.createElement('div', { style: { fontSize: 12, color: t.textSecondary, marginTop: 2 } }, `${done} of ${quest.steps.length} steps done`),
        ),
      ),
      React.createElement('div', { style: { background: t.border, borderRadius: 100, height: 6, overflow: 'hidden', marginBottom: compact ? 0 : 12 } },
        React.createElement('div', { style: { width: `${quest.progress * 100}%`, height: '100%', background: quest.color, borderRadius: 100, transition: 'width 0.5s ease' } }),
      ),
      !compact && quest.steps.map((step, i) =>
        React.createElement('div', { key: i, style: { display: 'flex', alignItems: 'flex-start', gap: 8, marginTop: 8 } },
          React.createElement('div', {
            style: {
              width: 20, height: 20, borderRadius: '50%', flexShrink: 0, marginTop: 1,
              background: step.done ? '#10B981' : 'transparent',
              border: `2px solid ${step.done ? '#10B981' : t.border}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            },
          }, step.done && React.createElement(window.lucide.Check, { size: 11, color: '#fff' })),
          React.createElement('div', {
            style: { fontSize: 13, color: step.done ? t.textSecondary : t.text, lineHeight: 1.45, textDecoration: step.done ? 'line-through' : 'none' },
          }, step.text),
        )
      ),
    );
  }

  // ─── Screens ──────────────────────────────────────────────────────

  function HomeScreen() {
    const [tapped, setTapped] = useState(false);
    const [selectedMood, setSelectedMood] = useState(null);
    const moods = [
      { label: '😊', name: 'Tiny', color: '#10B981' },
      { label: '😐', name: 'Medium', color: '#F59E0B' },
      { label: '😰', name: 'Big', color: '#F97316' },
      { label: '😱', name: 'Huge', color: '#EF4444' },
    ];

    return React.createElement('div', { style: { padding: '0 20px 20px', fontFamily: "'Nunito', sans-serif" } },
      React.createElement('div', { style: { marginBottom: 18 } },
        React.createElement('div', { style: { fontSize: 12, color: t.textSecondary, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4 } }, '✨ Good morning'),
        React.createElement('h1', { style: { fontSize: 27, fontWeight: 900, color: t.text, margin: 0, lineHeight: 1.2 } }, 'How are you\nfeeling today?'),
      ),

      React.createElement('div', {
        onClick: () => setTapped(p => !p),
        style: {
          background: `linear-gradient(135deg, ${t.primary}25, ${t.primaryLight}18)`,
          border: `1.5px solid ${t.primary}44`, borderRadius: 24, padding: '20px 18px',
          display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18,
          cursor: 'pointer',
          transform: tapped ? 'scale(0.98)' : 'scale(1)', transition: 'transform 0.15s ease',
        },
      },
        React.createElement(WizzoFace, { size: 60, animated: true }),
        React.createElement('div', { style: { flex: 1 } },
          React.createElement('div', { style: { fontSize: 17, fontWeight: 800, color: t.text, marginBottom: 3 } }, 'Wizzo is ready!'),
          React.createElement('div', { style: { fontSize: 13, color: t.textSecondary, lineHeight: 1.45 } }, 'Tell me your worry and we\'ll turn it into a tiny quest together.'),
          React.createElement('div', {
            onClick: (e) => { e.stopPropagation(); setActiveTab('worry'); },
            style: {
              marginTop: 10, background: t.primary, color: '#fff', borderRadius: 100,
              padding: '8px 14px', display: 'inline-flex', alignItems: 'center', gap: 5,
              fontSize: 12, fontWeight: 800, cursor: 'pointer',
            },
          },
            React.createElement(window.lucide.Sparkles, { size: 13 }),
            'Feed a Worry',
          ),
        ),
      ),

      React.createElement('div', { style: { marginBottom: 18 } },
        React.createElement('div', { style: { fontSize: 15, fontWeight: 800, color: t.text, marginBottom: 10 } }, 'How big is your worry right now?'),
        React.createElement('div', { style: { display: 'flex', gap: 8 } },
          moods.map((m, i) =>
            React.createElement('div', {
              key: i,
              onClick: () => setSelectedMood(i),
              style: {
                flex: 1, textAlign: 'center', padding: '10px 4px',
                background: selectedMood === i ? m.color + '30' : t.surface2,
                border: `1.5px solid ${selectedMood === i ? m.color : 'transparent'}`,
                borderRadius: 14, cursor: 'pointer', transition: 'all 0.15s ease',
              },
            },
              React.createElement('div', { style: { fontSize: 22 } }, m.label),
              React.createElement('div', { style: { fontSize: 10, fontWeight: 700, color: selectedMood === i ? m.color : t.textSecondary, marginTop: 3 } }, m.name),
            )
          ),
        ),
      ),

      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 } },
        React.createElement('div', { style: { fontSize: 15, fontWeight: 800, color: t.text } }, 'Active Quest'),
        React.createElement('div', { onClick: () => setActiveTab('quests'), style: { fontSize: 12, color: t.primary, fontWeight: 800, cursor: 'pointer' } }, 'See all →'),
      ),
      React.createElement(QuestCard, { quest: questsData[0], compact: true }),

      React.createElement('div', { style: { marginTop: 18 } },
        React.createElement('div', { style: { fontSize: 15, fontWeight: 800, color: t.text, marginBottom: 10 } }, 'Quick Tools'),
        React.createElement('div', { style: { display: 'flex', gap: 10 } },
          [
            { icon: '🫧', label: 'Breathe', color: '#06B6D4', action: () => setShowBreathing(true) },
            { icon: '💪', label: 'Brave Talk', color: '#F59E0B', action: () => setActiveTab('worry') },
            { icon: '📖', label: 'Journal', color: '#10B981', action: () => setActiveTab('worry') },
          ].map((tool, i) => {
            const [pressed, setPressed] = useState(false);
            return React.createElement('div', {
              key: i, onClick: tool.action,
              onMouseDown: () => setPressed(true), onMouseUp: () => setPressed(false),
              style: {
                flex: 1, textAlign: 'center', padding: '14px 8px',
                background: tool.color + '20', border: `1.5px solid ${tool.color}40`,
                borderRadius: 16, cursor: 'pointer',
                transform: pressed ? 'scale(0.93)' : 'scale(1)', transition: 'transform 0.12s ease',
              },
            },
              React.createElement('div', { style: { fontSize: 24, marginBottom: 5 } }, tool.icon),
              React.createElement('div', { style: { fontSize: 11, fontWeight: 800, color: tool.color } }, tool.label),
            );
          }),
        ),
      ),
    );
  }

  function WorryScreen() {
    const [step, setStep] = useState(0);
    const [input, setInput] = useState('');
    const [category, setCategory] = useState(null);
    const cats = [
      { id: 'school', label: 'School', icon: '📚', color: '#7C3AED' },
      { id: 'friends', label: 'Friends', icon: '👫', color: '#06B6D4' },
      { id: 'bedtime', label: 'Bedtime', icon: '🌙', color: '#8B5CF6' },
      { id: 'family', label: 'Family', icon: '🏠', color: '#F59E0B' },
      { id: 'health', label: 'Health', icon: '💊', color: '#10B981' },
      { id: 'other', label: 'Other', icon: '✨', color: '#EC4899' },
    ];

    const handleSubmit = () => {
      if (!input.trim()) return;
      setStep(1);
      setTimeout(() => setStep(2), 2600);
    };

    if (step === 1) {
      return React.createElement('div', {
        style: { padding: 24, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 500, fontFamily: "'Nunito', sans-serif" },
      },
        React.createElement(WizzoFace, { size: 88, animated: true }),
        React.createElement('div', { style: { fontSize: 20, fontWeight: 900, color: t.text, marginTop: 20, marginBottom: 6, textAlign: 'center' } }, 'Wizzo is listening...'),
        React.createElement('div', { style: { fontSize: 14, color: t.textSecondary, textAlign: 'center', lineHeight: 1.5 } }, 'Turning your worry\ninto a brave quest!'),
        React.createElement('div', { style: { display: 'flex', gap: 8, marginTop: 24 } },
          [0, 1, 2].map(i => React.createElement('div', {
            key: i,
            style: { width: 10, height: 10, borderRadius: '50%', background: t.primary, opacity: 0.25 + i * 0.375 },
          })),
        ),
      );
    }

    if (step === 2) {
      return React.createElement('div', { style: { padding: '0 20px 24px', fontFamily: "'Nunito', sans-serif" } },
        React.createElement('div', { style: { textAlign: 'center', padding: '24px 0 18px' } },
          React.createElement('div', { style: { fontSize: 44, marginBottom: 10 } }, '🎉'),
          React.createElement('div', { style: { fontSize: 22, fontWeight: 900, color: t.text, marginBottom: 5 } }, 'Quest Created!'),
          React.createElement('div', { style: { fontSize: 14, color: t.textSecondary } }, 'Your worry just became a brave adventure!'),
        ),
        React.createElement(QuestCard, { quest: questsData[0], compact: false }),
        React.createElement('div', {
          onClick: () => setActiveTab('quests'),
          style: {
            background: t.primary, color: '#fff', borderRadius: 16,
            padding: '14px 20px', textAlign: 'center', fontWeight: 900, fontSize: 16,
            cursor: 'pointer', marginTop: 16,
          },
        }, 'Start the Quest! →'),
        React.createElement('div', {
          onClick: () => { setStep(0); setInput(''); setCategory(null); },
          style: { textAlign: 'center', marginTop: 12, color: t.textSecondary, fontSize: 13, cursor: 'pointer' },
        }, '+ Add another worry'),
      );
    }

    return React.createElement('div', { style: { padding: '0 20px 24px', fontFamily: "'Nunito', sans-serif" } },
      React.createElement('div', { style: { padding: '16px 0 16px' } },
        React.createElement('h2', { style: { fontSize: 24, fontWeight: 900, color: t.text, margin: '0 0 3px' } }, 'Feed Wizzo a Worry'),
        React.createElement('p', { style: { fontSize: 13, color: t.textSecondary, margin: 0, lineHeight: 1.5 } }, 'Wizzo\'ll help shrink it into tiny brave steps.'),
      ),
      React.createElement('div', { style: { fontSize: 12, fontWeight: 700, color: t.textSecondary, letterSpacing: 0.6, marginBottom: 8 } }, "WHAT'S IT ABOUT?"),
      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 16 } },
        cats.map(c =>
          React.createElement('div', {
            key: c.id, onClick: () => setCategory(c.id),
            style: {
              padding: '12px 6px', textAlign: 'center',
              background: category === c.id ? c.color + '30' : t.surface2,
              border: `1.5px solid ${category === c.id ? c.color : 'transparent'}`,
              borderRadius: 14, cursor: 'pointer', transition: 'all 0.14s ease',
            },
          },
            React.createElement('div', { style: { fontSize: 22, marginBottom: 4 } }, c.icon),
            React.createElement('div', { style: { fontSize: 11, fontWeight: 700, color: category === c.id ? c.color : t.textSecondary } }, c.label),
          )
        ),
      ),
      React.createElement('div', { style: { fontSize: 12, fontWeight: 700, color: t.textSecondary, letterSpacing: 0.6, marginBottom: 8 } }, 'TELL WIZZO:'),
      React.createElement('textarea', {
        value: input, onChange: e => setInput(e.target.value),
        placeholder: "I'm worried about...",
        style: {
          width: '100%', minHeight: 90, background: t.surface2,
          border: `1.5px solid ${t.border}`, borderRadius: 16, padding: '12px 14px',
          fontSize: 15, color: t.text, resize: 'none', outline: 'none',
          lineHeight: 1.5, display: 'block', marginBottom: 12,
        },
      }),
      React.createElement('div', {
        onClick: () => setShowBreathing(true),
        style: {
          display: 'flex', alignItems: 'center', gap: 10, padding: '11px 14px',
          background: '#06B6D420', border: '1.5px solid #06B6D440',
          borderRadius: 14, marginBottom: 14, cursor: 'pointer',
        },
      },
        React.createElement('div', { style: { fontSize: 18 } }, '🫧'),
        React.createElement('div', { style: { flex: 1 } },
          React.createElement('div', { style: { fontSize: 13, fontWeight: 800, color: '#06B6D4' } }, 'Feel nervous?'),
          React.createElement('div', { style: { fontSize: 12, color: t.textSecondary } }, 'Try a quick breathing exercise first'),
        ),
        React.createElement(window.lucide.ChevronRight, { size: 14, color: '#06B6D4' }),
      ),
      React.createElement('div', {
        onClick: handleSubmit,
        style: {
          background: input.trim() ? `linear-gradient(135deg, ${t.primary}, ${t.primaryLight})` : t.surface2,
          color: input.trim() ? '#fff' : t.textSecondary,
          borderRadius: 16, padding: '14px 20px', textAlign: 'center',
          fontWeight: 900, fontSize: 16, cursor: input.trim() ? 'pointer' : 'default',
          transition: 'all 0.2s ease', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
          boxShadow: input.trim() ? `0 8px 24px ${t.primary}44` : 'none',
        },
      },
        React.createElement(window.lucide.Sparkles, { size: 17 }),
        'Feed to Wizzo!',
      ),
    );
  }

  function QuestsScreen() {
    return React.createElement('div', { style: { padding: '0 20px 24px', fontFamily: "'Nunito', sans-serif" } },
      React.createElement('div', { style: { padding: '16px 0 16px' } },
        React.createElement('h2', { style: { fontSize: 24, fontWeight: 900, color: t.text, margin: '0 0 3px' } }, 'Your Quests'),
        React.createElement('p', { style: { fontSize: 13, color: t.textSecondary, margin: 0 } }, '2 active • 3 brave steps complete!'),
      ),
      React.createElement('div', { style: { display: 'flex', gap: 10, marginBottom: 18 } },
        [
          { label: 'Done', val: '1', color: '#10B981' },
          { label: 'Steps', val: '3', color: '#F59E0B' },
          { label: 'Badges', val: '2', color: '#7C3AED' },
        ].map((s, i) =>
          React.createElement('div', {
            key: i,
            style: { flex: 1, textAlign: 'center', padding: '12px 6px', background: s.color + '20', borderRadius: 14, border: `1.5px solid ${s.color}30` },
          },
            React.createElement('div', { style: { fontSize: 22, fontWeight: 900, color: s.color } }, s.val),
            React.createElement('div', { style: { fontSize: 10, color: t.textSecondary, fontWeight: 700, marginTop: 2 } }, s.label),
          )
        ),
      ),
      React.createElement('div', { style: { fontSize: 12, fontWeight: 700, color: t.textSecondary, letterSpacing: 0.6, marginBottom: 10 } }, 'ACTIVE QUESTS'),
      questsData.map(q =>
        React.createElement('div', { key: q.id, style: { marginBottom: 12 } },
          React.createElement(QuestCard, { quest: q, compact: false }),
        )
      ),
      React.createElement('div', { style: { fontSize: 12, fontWeight: 700, color: t.textSecondary, letterSpacing: 0.6, marginBottom: 10, marginTop: 6 } }, 'COMPLETED'),
      React.createElement('div', {
        style: {
          background: '#10B98120', border: '1.5px solid #10B98130',
          borderRadius: 20, padding: '14px 16px',
          display: 'flex', alignItems: 'center', gap: 12,
        },
      },
        React.createElement('div', { style: { fontSize: 24 } }, '🌟'),
        React.createElement('div', {},
          React.createElement('div', { style: { fontSize: 14, fontWeight: 800, color: '#10B981' } }, 'Doctor Visit Quest'),
          React.createElement('div', { style: { fontSize: 12, color: t.textSecondary } }, 'Completed 3 days ago · Earned a Badge!'),
        ),
      ),
    );
  }

  function RewardsScreen() {
    const [selected, setSelected] = useState(null);
    const chars = [
      { name: 'Wizzo', icon: '🧙‍♂️', color: '#7C3AED', unlocked: true },
      { name: 'Bubbles', icon: '🫧', color: '#06B6D4', unlocked: true },
      { name: 'Sunny', icon: '☀️', color: '#F59E0B', unlocked: false },
      { name: 'Luna', icon: '🌙', color: '#8B5CF6', unlocked: false },
    ];

    return React.createElement('div', { style: { padding: '0 20px 24px', fontFamily: "'Nunito', sans-serif" } },
      React.createElement('div', { style: { padding: '16px 0 16px' } },
        React.createElement('h2', { style: { fontSize: 24, fontWeight: 900, color: t.text, margin: '0 0 3px' } }, 'Rewards'),
        React.createElement('p', { style: { fontSize: 13, color: t.textSecondary, margin: 0 } }, 'Collect badges by being brave!'),
      ),
      React.createElement('div', {
        style: {
          background: `linear-gradient(135deg, ${t.primary}28, ${t.secondary}18)`,
          border: `1.5px solid ${t.primary}40`, borderRadius: 22, padding: 18,
          display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18,
        },
      },
        React.createElement(WizzoFace, { size: 56, animated: true }),
        React.createElement('div', { style: { flex: 1 } },
          React.createElement('div', { style: { fontSize: 11, color: t.textSecondary, fontWeight: 700, letterSpacing: 0.5, marginBottom: 2 } }, 'WIZZO LEVEL'),
          React.createElement('div', { style: { fontSize: 26, fontWeight: 900, color: t.text, lineHeight: 1 } }, 'Level 3'),
          React.createElement('div', { style: { background: t.border, borderRadius: 100, height: 6, overflow: 'hidden', marginTop: 7, marginBottom: 4 } },
            React.createElement('div', { style: { width: '60%', height: '100%', background: `linear-gradient(90deg, ${t.primary}, ${t.primaryLight})`, borderRadius: 100 } }),
          ),
          React.createElement('div', { style: { fontSize: 11, color: t.textSecondary } }, '60 / 100 XP to Level 4'),
        ),
      ),
      React.createElement('div', { style: { fontSize: 12, fontWeight: 700, color: t.textSecondary, letterSpacing: 0.6, marginBottom: 10 } }, 'BADGES'),
      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 18 } },
        badgesData.map(b =>
          React.createElement('div', {
            key: b.id, onClick: () => setSelected(b.id === selected ? null : b.id),
            style: {
              textAlign: 'center', padding: '14px 6px',
              background: b.earned ? b.color + '20' : t.surface2,
              border: `1.5px solid ${b.earned ? (selected === b.id ? b.color : b.color + '40') : t.border}`,
              borderRadius: 18, cursor: 'pointer', opacity: b.earned ? 1 : 0.5,
              transform: selected === b.id ? 'scale(1.06)' : 'scale(1)',
              transition: 'all 0.18s ease',
            },
          },
            React.createElement('div', { style: { fontSize: 26, marginBottom: 5, filter: b.earned ? 'none' : 'grayscale(1)' } }, b.icon),
            React.createElement('div', { style: { fontSize: 10, fontWeight: 700, color: b.earned ? b.color : t.textSecondary, lineHeight: 1.3 } }, b.name),
            !b.earned && React.createElement('div', { style: { fontSize: 9, color: t.textSecondary, marginTop: 2 } }, '🔒 Locked'),
          )
        ),
      ),
      React.createElement('div', { style: { fontSize: 12, fontWeight: 700, color: t.textSecondary, letterSpacing: 0.6, marginBottom: 10 } }, 'STORY CHARACTERS'),
      React.createElement('div', { style: { display: 'flex', gap: 10 } },
        chars.map((c, i) =>
          React.createElement('div', {
            key: i,
            style: {
              flex: 1, textAlign: 'center', padding: '12px 6px',
              background: c.unlocked ? c.color + '20' : t.surface2,
              border: `1.5px solid ${c.unlocked ? c.color + '40' : t.border}`,
              borderRadius: 16, opacity: c.unlocked ? 1 : 0.48,
            },
          },
            React.createElement('div', { style: { fontSize: 26, marginBottom: 4 } }, c.icon),
            React.createElement('div', { style: { fontSize: 10, fontWeight: 700, color: c.unlocked ? c.color : t.textSecondary } }, c.name),
            !c.unlocked && React.createElement('div', { style: { fontSize: 9, color: t.textSecondary } }, '🔒'),
          )
        ),
      ),
    );
  }

  function SettingsScreen() {
    const [notifs, setNotifs] = useState(true);
    const [sounds, setSounds] = useState(true);
    const [parentOpen, setParentOpen] = useState(false);

    function Toggle({ val, onChange }) {
      return React.createElement('div', {
        onClick: () => onChange(!val),
        style: {
          width: 44, height: 24, borderRadius: 100,
          background: val ? t.primary : t.border,
          position: 'relative', cursor: 'pointer',
          transition: 'background 0.2s ease', flexShrink: 0,
        },
      },
        React.createElement('div', {
          style: {
            width: 18, height: 18, borderRadius: '50%', background: '#fff',
            position: 'absolute', top: 3, left: val ? 23 : 3,
            transition: 'left 0.2s ease', boxShadow: '0 1px 4px rgba(0,0,0,0.25)',
          },
        }),
      );
    }

    function Row({ IconComp, label, sub, right }) {
      return React.createElement('div', {
        style: { display: 'flex', alignItems: 'center', gap: 12, padding: '13px 0', borderBottom: `1px solid ${t.border}` },
      },
        React.createElement('div', { style: { width: 34, height: 34, borderRadius: 10, background: t.surface2, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 } },
          React.createElement(IconComp, { size: 16, color: t.primary }),
        ),
        React.createElement('div', { style: { flex: 1 } },
          React.createElement('div', { style: { fontSize: 14, fontWeight: 700, color: t.text } }, label),
          sub && React.createElement('div', { style: { fontSize: 11, color: t.textSecondary, marginTop: 1 } }, sub),
        ),
        right,
      );
    }

    return React.createElement('div', { style: { padding: '0 20px 24px', fontFamily: "'Nunito', sans-serif" } },
      React.createElement('div', { style: { padding: '16px 0 16px' } },
        React.createElement('h2', { style: { fontSize: 24, fontWeight: 900, color: t.text, margin: 0 } }, 'Settings'),
      ),
      React.createElement('div', {
        style: {
          background: `linear-gradient(135deg, ${t.primary}25, ${t.secondary}18)`,
          border: `1.5px solid ${t.primary}40`, borderRadius: 20, padding: '14px 16px',
          display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16, cursor: 'pointer',
        },
        onClick: () => setThemeMode(m => m === 'dark' ? 'light' : 'dark'),
      },
        React.createElement('div', { style: { fontSize: 22 } }, themeMode === 'dark' ? '🌙' : '☀️'),
        React.createElement('div', { style: { flex: 1 } },
          React.createElement('div', { style: { fontSize: 15, fontWeight: 800, color: t.text } }, themeMode === 'dark' ? 'Dark Mode' : 'Light Mode'),
          React.createElement('div', { style: { fontSize: 12, color: t.textSecondary } }, 'Tap to switch theme'),
        ),
        React.createElement(Toggle, { val: themeMode === 'dark', onChange: (v) => setThemeMode(v ? 'dark' : 'light') }),
      ),
      React.createElement('div', { style: { fontSize: 11, fontWeight: 700, color: t.textSecondary, letterSpacing: 0.6, marginBottom: 4 } }, 'APP SETTINGS'),
      React.createElement(Row, { IconComp: window.lucide.Bell, label: 'Notifications', sub: 'Daily check-in reminders', right: React.createElement(Toggle, { val: notifs, onChange: setNotifs }) }),
      React.createElement(Row, { IconComp: window.lucide.Volume2, label: 'Sounds & Music', sub: 'Ambient sounds during exercises', right: React.createElement(Toggle, { val: sounds, onChange: setSounds }) }),
      React.createElement('div', { style: { height: 16 } }),
      React.createElement('div', { style: { fontSize: 11, fontWeight: 700, color: t.textSecondary, letterSpacing: 0.6, marginBottom: 4 } }, 'PARENT MODE'),
      React.createElement('div', {
        style: { background: '#F59E0B18', border: '1.5px solid #F59E0B35', borderRadius: 20, padding: '14px 16px', marginBottom: 16 },
      },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12 } },
          React.createElement('div', { style: { fontSize: 22 } }, '👨‍👩‍👧'),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', { style: { fontSize: 14, fontWeight: 800, color: t.text } }, 'Parent Dashboard'),
            React.createElement('div', { style: { fontSize: 12, color: t.textSecondary } }, 'Worry summaries & support tips'),
          ),
          React.createElement(Toggle, { val: parentOpen, onChange: setParentOpen }),
        ),
        parentOpen && React.createElement('div', { style: { marginTop: 14 } },
          React.createElement('div', { style: { fontSize: 12, fontWeight: 700, color: '#F59E0B', marginBottom: 7 } }, '📊 This Week'),
          ['Maya mentioned school worry 3×', 'Bedtime anxiety noted twice'].map((tip, i) =>
            React.createElement('div', { key: i, style: { fontSize: 12, color: t.textSecondary, padding: '5px 0', borderBottom: i === 0 ? `1px solid ${t.border}` : 'none' } }, `• ${tip}`),
          ),
          React.createElement('div', { style: { fontSize: 12, fontWeight: 700, color: '#F59E0B', marginTop: 10, marginBottom: 6 } }, '💡 Support Tips'),
          ['Ask "What would make this feel smaller?"', 'Celebrate each brave step, not just the result'].map((tip, i) =>
            React.createElement('div', { key: i, style: { fontSize: 12, color: t.textSecondary, padding: '4px 0' } }, `• ${tip}`),
          ),
        ),
      ),
      React.createElement(Row, { IconComp: window.lucide.Info, label: 'About WorryWizard', sub: 'v1.0 · Made with ❤️ for brave kids', right: React.createElement(window.lucide.ChevronRight, { size: 14, color: t.textSecondary }) }),
      React.createElement(Row, { IconComp: window.lucide.Shield, label: 'Privacy & Safety', sub: 'COPPA compliant · No data sharing', right: React.createElement(window.lucide.ChevronRight, { size: 14, color: t.textSecondary }) }),
    );
  }

  function BreathingModal() {
    const phaseLabel = { inhale: 'Breathe In...', hold: 'Hold...', exhale: 'Breathe Out...' };
    const phaseColor = { inhale: '#7C3AED', hold: '#F59E0B', exhale: '#06B6D4' };
    const color = phaseColor[breathPhase];
    const done = breathCount >= 3;
    return React.createElement('div', {
      style: {
        position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.75)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 300, fontFamily: "'Nunito', sans-serif",
      },
    },
      React.createElement('div', {
        style: {
          background: themeMode === 'dark' ? '#140E28' : '#FFFFFF',
          borderRadius: 30, padding: '28px 24px', margin: 20, textAlign: 'center',
          width: 'calc(100% - 40px)', boxSizing: 'border-box',
        },
      },
        React.createElement('div', { style: { fontSize: 20, fontWeight: 900, color: t.text, marginBottom: 4 } }, '🫧 Breathing Bubbles'),
        React.createElement('div', { style: { fontSize: 13, color: t.textSecondary, marginBottom: 26 } }, `Breath ${Math.min(breathCount + 1, 3)} of 3 · Follow the bubble`),
        React.createElement('div', { style: { position: 'relative', height: 140, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 22 } },
          React.createElement('div', { style: { position: 'absolute', width: 130, height: 130, borderRadius: '50%', border: `2px solid ${color}22`, transform: `scale(${breathScale})`, transition: 'transform 4s ease-in-out' } }),
          React.createElement('div', { style: { position: 'absolute', width: 100, height: 100, borderRadius: '50%', border: `2px solid ${color}44`, transform: `scale(${breathScale * 0.88})`, transition: 'transform 4s ease-in-out' } }),
          React.createElement('div', {
            style: {
              width: 64, height: 64, borderRadius: '50%',
              background: `radial-gradient(circle at 35% 35%, ${color}cc, ${color})`,
              transform: `scale(${breathScale * 0.75})`, transition: 'transform 4s ease-in-out, background 1.5s ease',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28,
              boxShadow: `0 0 24px ${color}66`,
            },
          }, '🫧'),
        ),
        React.createElement('div', { style: { fontSize: 20, fontWeight: 900, color, marginBottom: 24, transition: 'color 0.5s ease' } }, phaseLabel[breathPhase]),
        React.createElement('div', {
          onClick: () => { setShowBreathing(false); setBreathCount(0); setBreathScale(1); },
          style: {
            background: done ? '#10B981' : t.primary, color: '#fff',
            borderRadius: 14, padding: '13px 24px', fontSize: 15, fontWeight: 900, cursor: 'pointer',
          },
        }, done ? '✨ Feeling better!' : 'Close'),
      ),
    );
  }

  // ─── Onboarding ───────────────────────────────────────────────────

  if (showOnboarding) {
    const slide = onboardingSlides[onboardingSlide];
    return React.createElement('div', {
      style: { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#1A1030', fontFamily: "'Nunito', sans-serif" },
    },
      React.createElement('style', {}, fontStyle),
      React.createElement('div', {
        style: {
          width: 375, height: 812, borderRadius: 44, border: '8px solid #111',
          overflow: 'hidden', position: 'relative',
          boxShadow: '0 25px 60px rgba(0,0,0,0.55)',
          background: slide.bg, display: 'flex', flexDirection: 'column',
        },
      },
        React.createElement('div', { style: { position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)', width: 120, height: 32, borderRadius: 20, background: '#000', zIndex: 100 } }),
        React.createElement('div', { style: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 36px 0', textAlign: 'center' } },
          React.createElement('div', { style: { fontSize: 88, marginBottom: 24, lineHeight: 1 } }, slide.emoji),
          React.createElement('h1', { style: { fontSize: 32, fontWeight: 900, color: '#F0E9FF', margin: '0 0 8px', lineHeight: 1.15 } }, slide.title),
          React.createElement('div', { style: { fontSize: 15, fontWeight: 700, color: slide.color, marginBottom: 14 } }, slide.subtitle),
          React.createElement('p', { style: { fontSize: 15, color: '#A899CC', lineHeight: 1.65, margin: 0 } }, slide.desc),
        ),
        React.createElement('div', { style: { padding: '0 32px 56px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 } },
          React.createElement('div', { style: { display: 'flex', gap: 8 } },
            onboardingSlides.map((_, i) =>
              React.createElement('div', {
                key: i,
                style: { width: i === onboardingSlide ? 22 : 8, height: 8, borderRadius: 100, background: i === onboardingSlide ? slide.color : '#2E1F5A', transition: 'all 0.3s ease' },
              })
            ),
          ),
          React.createElement('div', {
            onClick: () => { if (onboardingSlide < onboardingSlides.length - 1) setOnboardingSlide(s => s + 1); else setShowOnboarding(false); },
            style: {
              background: slide.color, color: '#fff', borderRadius: 20,
              padding: '16px 0', fontSize: 17, fontWeight: 900, cursor: 'pointer',
              width: '100%', textAlign: 'center',
              boxShadow: `0 10px 28px ${slide.color}55`,
            },
          }, onboardingSlide < onboardingSlides.length - 1 ? 'Next →' : "Let's Go! 🧙‍♂️"),
          onboardingSlide === 0 && React.createElement('div', {
            onClick: () => setShowOnboarding(false),
            style: { fontSize: 13, color: '#9D8EC7', cursor: 'pointer' },
          }, 'Skip intro'),
        ),
      ),
    );
  }

  // ─── Main App ─────────────────────────────────────────────────────

  const screens = { home: HomeScreen, worry: WorryScreen, quests: QuestsScreen, rewards: RewardsScreen, settings: SettingsScreen };
  const ActiveScreen = screens[activeTab];

  return React.createElement('div', {
    style: { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#f0f0f0' },
  },
    React.createElement('style', {}, fontStyle),
    React.createElement('div', {
      style: {
        width: 375, height: 812, borderRadius: 44, border: '8px solid #1a1a1a',
        overflow: 'hidden', position: 'relative',
        boxShadow: '0 25px 60px rgba(0,0,0,0.3), inset 0 0 0 1px rgba(255,255,255,0.08)',
        background: t.bg, display: 'flex', flexDirection: 'column',
      },
    },
      React.createElement('div', { style: { position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)', width: 120, height: 32, borderRadius: 20, background: '#000', zIndex: 100 } }),
      React.createElement(StatusBar),
      React.createElement('div', { style: { flex: 1, overflowY: 'auto', overflowX: 'hidden' } },
        React.createElement(ActiveScreen),
      ),
      React.createElement('div', {
        style: {
          height: 90, background: t.navBg,
          borderTop: `1px solid ${t.border}`,
          display: 'flex', justifyContent: 'space-around', alignItems: 'flex-start',
          paddingTop: 8, flexShrink: 0,
        },
      },
        tabs.map(tab =>
          React.createElement('div', {
            key: tab.id,
            onClick: () => setActiveTab(tab.id),
            onMouseDown: () => setPressedTab(tab.id),
            onMouseUp: () => setPressedTab(null),
            style: {
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
              padding: '6px 10px', borderRadius: 14, cursor: 'pointer',
              transform: pressedTab === tab.id ? 'scale(0.88)' : 'scale(1)',
              transition: 'transform 0.12s ease',
            },
          },
            React.createElement(tab.icon, { size: 22, color: activeTab === tab.id ? t.primary : t.textSecondary }),
            React.createElement('span', { style: { fontSize: 10, fontWeight: 700, color: activeTab === tab.id ? t.primary : t.textSecondary, transition: 'color 0.15s ease' } }, tab.label),
          )
        ),
      ),
      showBreathing && React.createElement(BreathingModal),
    ),
  );
}
