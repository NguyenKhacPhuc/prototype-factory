const { useState, useEffect, useRef } = React;

function App() {
  const [activeTab, setActiveTab] = useState('today');
  const [activeLesson, setActiveLesson] = useState(null);
  const [scanMode, setScanMode] = useState(false);
  const [scannedResult, setScannedResult] = useState(null);
  const [pressedBtn, setPressedBtn] = useState(null);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [expandedCue, setExpandedCue] = useState(null);
  const [reviewIdx, setReviewIdx] = useState(0);
  const [showBoost, setShowBoost] = useState(false);

  const colors = {
    bg: '#0D0B1E',
    surface: '#16132B',
    card: '#1E1A35',
    cardHover: '#252040',
    primary: '#7C6FF7',
    primaryLight: '#9D97FF',
    secondary: '#F5A623',
    accent: '#36D9B5',
    danger: '#FF6B6B',
    text: '#FFFFFF',
    textSub: '#A89EC9',
    textMuted: '#6B6490',
    border: '#2A2550',
    tabBar: '#100E22',
  };

  const fontStyle = `
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    ::-webkit-scrollbar { display: none; }
    body { background: #06050F; }
  `;

  const contextCues = [
    {
      id: 1,
      icon: '☕',
      context: 'Morning routine',
      time: 'Right now',
      lesson: 'The Chemistry of Coffee',
      subject: 'Chemistry',
      duration: '2 min',
      color: '#F5A623',
      desc: 'Why does your coffee smell so good? Learn about the Maillard reaction and volatile aromatic compounds.',
      tag: 'Context-matched',
    },
    {
      id: 2,
      icon: '🚆',
      context: 'Commute detected',
      time: '8 min ago',
      lesson: 'Probability & Train Delays',
      subject: 'Math',
      duration: '3 min',
      color: '#7C6FF7',
      desc: 'Use Poisson distributions to understand why your train is always late — and when to expect it.',
      tag: 'Location-aware',
    },
    {
      id: 3,
      icon: '📧',
      context: 'Meeting in 30 min',
      time: 'Upcoming',
      lesson: 'Subject Line Mastery',
      subject: 'Communication',
      duration: '2 min',
      color: '#36D9B5',
      desc: 'Three email opener techniques that get responses. Perfect before your 9am standup.',
      tag: 'Calendar-linked',
    },
  ];

  const microLessons = [
    {
      id: 'ml1',
      title: 'The Maillard Reaction',
      subject: 'Chemistry',
      emoji: '🔬',
      color: '#F5A623',
      duration: '2 min',
      difficulty: 'Easy',
      steps: [
        { heading: 'What Is It?', body: 'The Maillard reaction is a chemical process between amino acids and reducing sugars when heated above 140°C. It creates hundreds of flavor and aroma compounds.' },
        { heading: 'In Your Kitchen', body: 'Every time you toast bread, sear a steak, or brew coffee, you trigger this reaction. The brown crust? That\'s Maillard at work — not caramelization.' },
        { heading: 'Quick Action', body: 'Next time you cook, raise the heat slightly and pat your food dry first. Less moisture = faster Maillard = better flavor.' },
      ],
      quickFact: 'Over 1,000 different flavor compounds are created by the Maillard reaction in coffee alone.',
    },
    {
      id: 'ml2',
      title: 'Poisson Distribution',
      subject: 'Statistics',
      emoji: '📊',
      color: '#7C6FF7',
      duration: '3 min',
      difficulty: 'Medium',
      steps: [
        { heading: 'What Is It?', body: 'A Poisson distribution models the probability of a given number of events occurring in a fixed interval of time when events happen at a known average rate.' },
        { heading: 'Train Delays Explained', body: 'If a train is late on average 3 times per 10 trips, Poisson tells you there\'s a 22% chance it\'s late exactly once on your next 10 trips.' },
        { heading: 'Quick Action', body: 'Track your commute delays for a week. Calculate your personal λ (lambda) — the average delays per trip. Predict next week\'s frustrations.' },
      ],
      quickFact: 'Siméon Denis Poisson published this distribution in 1837. It was originally used to model soldier deaths by horse kicks.',
    },
    {
      id: 'ml3',
      title: 'Active Recall',
      subject: 'Learning Science',
      emoji: '🧠',
      color: '#36D9B5',
      duration: '2 min',
      difficulty: 'Easy',
      steps: [
        { heading: 'The Technique', body: 'Active recall means testing yourself on information rather than re-reading it. After reading a paragraph, close the book and write down everything you remember.' },
        { heading: 'Why It Works', body: 'Each time you retrieve a memory, you strengthen that neural pathway. Re-reading only feels productive — it\'s passive and creates "fluency illusion".' },
        { heading: 'Quick Action', body: 'After finishing this lesson, lock your phone and recall three things you just learned. Don\'t peek!' },
      ],
      quickFact: 'Studies show active recall improves retention by up to 50% compared to passive review.',
    },
    {
      id: 'ml4',
      title: 'Subject Line Psychology',
      subject: 'Communication',
      emoji: '✉️',
      color: '#FF6B6B',
      duration: '2 min',
      difficulty: 'Easy',
      steps: [
        { heading: 'The Hook', body: 'A subject line has 0.3 seconds to earn attention. The brain filters email subjects like a news headline — curiosity and specificity beat cleverness.' },
        { heading: 'Three Templates', body: '"Quick question about [topic]" — Low-effort ask\n"[Name], I noticed [observation]" — Personalized\n"Re: [their last subject]" — Continuation (highest open rates)' },
        { heading: 'Quick Action', body: 'Before your next email, A/B test in your head: write two subject lines. Pick the one that creates more curiosity without being clickbait.' },
      ],
      quickFact: '47% of email recipients open emails based on the subject line alone.',
    },
  ];

  const curriculum = [
    { subject: 'Communication', progress: 68, color: '#36D9B5', lessons: 12, streak: 5, emoji: '💬', nextLesson: 'Persuasion Principles' },
    { subject: 'Data & Math', progress: 42, color: '#7C6FF7', lessons: 8, streak: 3, emoji: '📊', nextLesson: 'Bayesian Thinking' },
    { subject: 'Science', progress: 55, color: '#F5A623', lessons: 10, streak: 7, emoji: '🔬', nextLesson: 'Entropy in Daily Life' },
    { subject: 'History', progress: 30, color: '#FF6B6B', lessons: 5, streak: 1, emoji: '🏛️', nextLesson: 'Trade Routes & Modern Supply Chains' },
  ];

  const reviewCards = [
    {
      id: 'r1',
      concept: 'Active Recall',
      subject: 'Learning Science',
      emoji: '🧠',
      color: '#36D9B5',
      newContext: 'You\'re reading documentation right now',
      reminder: 'Instead of re-reading that doc, close it after each section and summarize aloud or in writing.',
      learnedAgo: '3 days ago',
      retentionScore: 72,
    },
    {
      id: 'r2',
      concept: 'Compound Interest',
      subject: 'Finance',
      emoji: '💰',
      color: '#F5A623',
      newContext: 'It\'s the 21st — near month-end',
      reminder: 'Monthly compounding means your $100 today becomes $110.47 in a year at 10% — not just $110.',
      learnedAgo: '1 week ago',
      retentionScore: 58,
    },
    {
      id: 'r3',
      concept: 'Cognitive Load',
      subject: 'Psychology',
      emoji: '🎯',
      color: '#7C6FF7',
      newContext: 'You have a meeting in 30 minutes',
      reminder: 'Multitasking before important work depletes working memory. Go in fresh — close your tabs.',
      learnedAgo: '5 days ago',
      retentionScore: 45,
    },
  ];

  const scanObjects = [
    { label: 'Nutrition Label', emoji: '🥫', lesson: 'Understanding Macronutrients', subject: 'Biology/Nutrition', color: '#36D9B5' },
    { label: 'Math Worksheet', emoji: '📝', lesson: 'Quadratic Formula Explained', subject: 'Algebra', color: '#7C6FF7' },
    { label: 'Museum Exhibit', emoji: '🏛️', lesson: 'Roman Architecture & Arches', subject: 'History', color: '#F5A623' },
    { label: 'Medicine Bottle', emoji: '💊', lesson: 'How Analgesics Work', subject: 'Pharmacology', color: '#FF6B6B' },
  ];

  const handlePress = (id) => {
    setPressedBtn(id);
    setTimeout(() => setPressedBtn(null), 150);
  };

  const handleCompleteLesson = (id) => {
    setCompletedLessons(prev => [...prev, id]);
    setActiveLesson(null);
  };

  const handleScan = (item) => {
    setScanMode(false);
    setScannedResult(item);
  };

  const btnStyle = (id, base = {}) => ({
    ...base,
    transform: pressedBtn === id ? 'scale(0.96)' : 'scale(1)',
    transition: 'transform 0.1s ease',
    cursor: 'pointer',
  });

  // Status bar
  const StatusBar = () => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 24px 0', fontSize: 12, fontWeight: 600, color: colors.text }}>
      <span>9:41</span>
      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        <svg width="16" height="12" viewBox="0 0 16 12" fill="white"><path d="M8 2.4C5.6 2.4 3.5 3.4 2 5L0 3C2.1 1.1 4.9 0 8 0s5.9 1.1 8 3l-2 2C12.5 3.4 10.4 2.4 8 2.4z" opacity=".4"/><path d="M8 5.6C6.5 5.6 5.1 6.2 4 7.2L2 5.2C3.6 3.8 5.7 3 8 3s4.4.8 6 2.2L12 7.2C10.9 6.2 9.5 5.6 8 5.6z" opacity=".7"/><path d="M8 8.8C7.1 8.8 6.2 9.2 5.6 9.8L4 8.2C5 7.2 6.4 6.6 8 6.6s3 .6 4 1.6L10.4 9.8C9.8 9.2 8.9 8.8 8 8.8z"/><circle cx="8" cy="12" r="1.6"/></svg>
        <svg width="25" height="12" viewBox="0 0 25 12" fill="none"><rect x=".5" y=".5" width="22" height="11" rx="3.5" stroke="white" strokeOpacity=".35"/><rect x="1" y="1" width={Math.round(20 * 0.78)} height="10" rx="3" fill="white"/><path d="M23 4v4a2 2 0 000-4z" fill="white" fillOpacity=".4"/></svg>
      </div>
    </div>
  );

  // Dynamic Island
  const DynamicIsland = () => (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 4, marginBottom: 8 }}>
      <div style={{ width: 120, height: 34, background: '#000', borderRadius: 20 }} />
    </div>
  );

  // Bottom nav
  const TabBar = () => {
    const tabs = [
      { id: 'today', label: 'Today', iconName: 'Zap' },
      { id: 'lessons', label: 'Learn', iconName: 'BookOpen' },
      { id: 'scan', label: 'Scan', iconName: 'Camera' },
      { id: 'curriculum', label: 'Path', iconName: 'Map' },
      { id: 'review', label: 'Review', iconName: 'RefreshCw' },
    ];
    return (
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 80, background: colors.tabBar, borderTop: `1px solid ${colors.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-around', padding: '0 4px 12px', borderBottomLeftRadius: 44, borderBottomRightRadius: 44 }}>
        {tabs.map(t => {
          const Icon = window.lucide[t.iconName];
          const active = activeTab === t.id;
          return (
            <div key={t.id} onClick={() => { setActiveTab(t.id); setActiveLesson(null); setScanMode(false); setScannedResult(null); }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, cursor: 'pointer', padding: '6px 12px', borderRadius: 12, background: active ? `${colors.primary}22` : 'transparent', transition: 'all 0.2s' }}>
              {Icon && <Icon size={20} color={active ? colors.primary : colors.textMuted} strokeWidth={active ? 2.5 : 1.8} />}
              <span style={{ fontSize: 10, fontWeight: active ? 700 : 500, color: active ? colors.primary : colors.textMuted, transition: 'color 0.2s' }}>{t.label}</span>
            </div>
          );
        })}
      </div>
    );
  };

  // TODAY SCREEN
  const TodayScreen = () => (
    <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 90 }}>
      <div style={{ padding: '16px 20px 8px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <p style={{ fontSize: 13, color: colors.textMuted, fontWeight: 500 }}>Friday, Mar 21</p>
            <h1 style={{ fontSize: 24, fontWeight: 800, color: colors.text, lineHeight: 1.2 }}>Good morning,<br />Alex 👋</h1>
          </div>
          <div style={{ width: 42, height: 42, borderRadius: 21, background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>A</div>
        </div>

        {/* Streak bar */}
        <div style={{ marginTop: 16, background: colors.card, borderRadius: 16, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 12, border: `1px solid ${colors.border}` }}>
          <div style={{ fontSize: 24 }}>🔥</div>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: colors.text }}>7-day streak</p>
            <p style={{ fontSize: 11, color: colors.textMuted }}>3 lessons today · 14 min learned</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 20, fontWeight: 800, color: colors.secondary }}>7</div>
            <div style={{ fontSize: 10, color: colors.textMuted }}>days</div>
          </div>
        </div>
      </div>

      {/* Context Cues */}
      <div style={{ padding: '16px 20px 8px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: colors.text }}>Context Cues</h2>
          <span style={{ fontSize: 11, color: colors.primary, fontWeight: 600 }}>3 detected</span>
        </div>
        {contextCues.map((cue) => (
          <div key={cue.id} onClick={() => { handlePress(`cue-${cue.id}`); setExpandedCue(expandedCue === cue.id ? null : cue.id); }} style={btnStyle(`cue-${cue.id}`, { background: colors.card, borderRadius: 18, padding: '14px 16px', marginBottom: 10, border: `1px solid ${expandedCue === cue.id ? cue.color + '60' : colors.border}`, cursor: 'pointer', transition: 'all 0.2s' })}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 44, height: 44, borderRadius: 14, background: `${cue.color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, border: `1px solid ${cue.color}33` }}>{cue.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                  <span style={{ fontSize: 10, background: `${cue.color}22`, color: cue.color, padding: '2px 7px', borderRadius: 6, fontWeight: 600 }}>{cue.tag}</span>
                  <span style={{ fontSize: 10, color: colors.textMuted }}>{cue.time}</span>
                </div>
                <p style={{ fontSize: 14, fontWeight: 700, color: colors.text }}>{cue.lesson}</p>
                <p style={{ fontSize: 11, color: colors.textMuted }}>{cue.context} · {cue.duration}</p>
              </div>
              <div style={{ color: colors.textMuted, fontSize: 16, transform: expandedCue === cue.id ? 'rotate(90deg)' : 'rotate(0)', transition: 'transform 0.2s' }}>›</div>
            </div>
            {expandedCue === cue.id && (
              <div style={{ marginTop: 12, paddingTop: 12, borderTop: `1px solid ${colors.border}` }}>
                <p style={{ fontSize: 13, color: colors.textSub, lineHeight: 1.6, marginBottom: 12 }}>{cue.desc}</p>
                <div onClick={(e) => { e.stopPropagation(); setActiveLesson(microLessons.find(l => l.id === `ml${cue.id}`)); setActiveTab('lessons'); }} style={{ background: cue.color, borderRadius: 12, padding: '10px 16px', textAlign: 'center', fontWeight: 700, fontSize: 13, color: '#000' }}>
                  Start Lesson →
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Daily Tip */}
      <div style={{ padding: '8px 20px' }}>
        <div style={{ background: `linear-gradient(135deg, ${colors.primary}33, ${colors.accent}22)`, borderRadius: 18, padding: '16px', border: `1px solid ${colors.primary}44` }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
            <div style={{ fontSize: 24 }}>💡</div>
            <div>
              <p style={{ fontSize: 12, fontWeight: 700, color: colors.primaryLight, marginBottom: 4 }}>DAILY INSIGHT</p>
              <p style={{ fontSize: 14, fontWeight: 600, color: colors.text, lineHeight: 1.5 }}>The best time to learn is right before you use it. Your brain encodes knowledge 40% better when context matches application.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // LESSON DETAIL SCREEN
  const LessonDetail = ({ lesson }) => {
    const [step, setStep] = useState(0);
    const done = completedLessons.includes(lesson.id);
    return (
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 90 }}>
        <div style={{ padding: '8px 20px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div onClick={() => setActiveLesson(null)} style={{ width: 36, height: 36, borderRadius: 12, background: colors.card, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: `1px solid ${colors.border}` }}>
            <span style={{ color: colors.text, fontSize: 18 }}>‹</span>
          </div>
          <span style={{ fontSize: 13, color: colors.textMuted, fontWeight: 500 }}>Micro-Lesson</span>
        </div>

        <div style={{ padding: '0 20px' }}>
          <div style={{ background: `${lesson.color}22`, borderRadius: 20, padding: '20px', marginBottom: 20, border: `1px solid ${lesson.color}44` }}>
            <div style={{ fontSize: 40, marginBottom: 8 }}>{lesson.emoji}</div>
            <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
              <span style={{ fontSize: 10, background: `${lesson.color}33`, color: lesson.color, padding: '3px 8px', borderRadius: 6, fontWeight: 600 }}>{lesson.subject}</span>
              <span style={{ fontSize: 10, background: colors.card, color: colors.textMuted, padding: '3px 8px', borderRadius: 6, fontWeight: 600 }}>{lesson.duration}</span>
              <span style={{ fontSize: 10, background: colors.card, color: colors.textMuted, padding: '3px 8px', borderRadius: 6, fontWeight: 600 }}>{lesson.difficulty}</span>
            </div>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: colors.text, lineHeight: 1.2 }}>{lesson.title}</h2>
          </div>

          {/* Progress dots */}
          <div style={{ display: 'flex', gap: 6, marginBottom: 20, justifyContent: 'center' }}>
            {lesson.steps.map((_, i) => (
              <div key={i} style={{ width: i === step ? 24 : 8, height: 8, borderRadius: 4, background: i <= step ? lesson.color : colors.border, transition: 'all 0.3s' }} />
            ))}
          </div>

          {/* Step card */}
          <div style={{ background: colors.card, borderRadius: 18, padding: '20px', marginBottom: 16, border: `1px solid ${colors.border}`, minHeight: 160 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: lesson.color, marginBottom: 8, letterSpacing: 1 }}>STEP {step + 1} OF {lesson.steps.length}</p>
            <h3 style={{ fontSize: 17, fontWeight: 700, color: colors.text, marginBottom: 10 }}>{lesson.steps[step].heading}</h3>
            <p style={{ fontSize: 14, color: colors.textSub, lineHeight: 1.7 }}>{lesson.steps[step].body}</p>
          </div>

          {/* Quick fact */}
          {step === lesson.steps.length - 1 && (
            <div style={{ background: `${lesson.color}11`, borderRadius: 14, padding: '14px 16px', marginBottom: 16, border: `1px solid ${lesson.color}33` }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: lesson.color, marginBottom: 4 }}>⚡ QUICK FACT</p>
              <p style={{ fontSize: 13, color: colors.textSub, lineHeight: 1.6 }}>{lesson.quickFact}</p>
            </div>
          )}

          {/* Nav buttons */}
          <div style={{ display: 'flex', gap: 10 }}>
            {step > 0 && (
              <div onClick={() => setStep(s => s - 1)} style={{ flex: 1, background: colors.card, borderRadius: 14, padding: '13px', textAlign: 'center', fontWeight: 600, fontSize: 14, color: colors.textSub, cursor: 'pointer', border: `1px solid ${colors.border}` }}>← Back</div>
            )}
            {step < lesson.steps.length - 1 ? (
              <div onClick={() => setStep(s => s + 1)} style={{ flex: 1, background: lesson.color, borderRadius: 14, padding: '13px', textAlign: 'center', fontWeight: 700, fontSize: 14, color: '#000', cursor: 'pointer' }}>Next →</div>
            ) : (
              <div onClick={() => handleCompleteLesson(lesson.id)} style={{ flex: 1, background: done ? colors.card : lesson.color, borderRadius: 14, padding: '13px', textAlign: 'center', fontWeight: 700, fontSize: 14, color: done ? colors.textMuted : '#000', cursor: 'pointer' }}>{done ? '✓ Completed' : '✅ Complete Lesson'}</div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // LESSONS SCREEN
  const LessonsScreen = () => {
    if (activeLesson) return <LessonDetail lesson={activeLesson} />;
    return (
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 90 }}>
        <div style={{ padding: '16px 20px 8px' }}>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: colors.text }}>Micro-Lessons</h1>
          <p style={{ fontSize: 13, color: colors.textMuted, marginTop: 2 }}>Learn anything in under 3 minutes</p>
        </div>

        <div style={{ padding: '8px 20px' }}>
          <div style={{ background: colors.card, borderRadius: 14, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10, border: `1px solid ${colors.border}` }}>
            <span style={{ color: colors.textMuted }}>🔍</span>
            <span style={{ fontSize: 14, color: colors.textMuted }}>Search lessons...</span>
          </div>
        </div>

        <div style={{ padding: '8px 20px' }}>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {['All', 'Chemistry', 'Math', 'Communication', 'Psychology'].map((tag, i) => (
              <div key={tag} style={{ padding: '6px 14px', borderRadius: 20, background: i === 0 ? colors.primary : colors.card, border: `1px solid ${i === 0 ? colors.primary : colors.border}`, fontSize: 12, fontWeight: 600, color: i === 0 ? '#fff' : colors.textMuted, cursor: 'pointer' }}>{tag}</div>
            ))}
          </div>
        </div>

        <div style={{ padding: '8px 20px' }}>
          {microLessons.map((lesson) => {
            const done = completedLessons.includes(lesson.id);
            return (
              <div key={lesson.id} onClick={() => setActiveLesson(lesson)} style={btnStyle(`lesson-${lesson.id}`, { background: colors.card, borderRadius: 18, padding: '16px', marginBottom: 12, border: `1px solid ${done ? lesson.color + '44' : colors.border}`, cursor: 'pointer', display: 'flex', gap: 14, alignItems: 'flex-start' })}>
                <div style={{ width: 48, height: 48, borderRadius: 14, background: `${lesson.color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0 }}>{lesson.emoji}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <p style={{ fontSize: 10, color: lesson.color, fontWeight: 700, marginBottom: 3, letterSpacing: 0.5 }}>{lesson.subject.toUpperCase()}</p>
                      <h3 style={{ fontSize: 15, fontWeight: 700, color: colors.text, lineHeight: 1.3 }}>{lesson.title}</h3>
                    </div>
                    {done && <span style={{ fontSize: 16 }}>✅</span>}
                  </div>
                  <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
                    <span style={{ fontSize: 11, color: colors.textMuted }}>⏱ {lesson.duration}</span>
                    <span style={{ fontSize: 11, color: colors.textMuted }}>· {lesson.difficulty}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // SCAN SCREEN
  const ScanScreen = () => {
    if (scannedResult) {
      return (
        <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 90 }}>
          <div style={{ padding: '8px 20px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
            <div onClick={() => setScannedResult(null)} style={{ width: 36, height: 36, borderRadius: 12, background: colors.card, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: `1px solid ${colors.border}` }}>
              <span style={{ color: colors.text, fontSize: 18 }}>‹</span>
            </div>
            <span style={{ fontSize: 13, color: colors.textMuted }}>Scan Result</span>
          </div>
          <div style={{ padding: '0 20px' }}>
            <div style={{ background: `${scannedResult.color}22`, borderRadius: 20, padding: '24px 20px', marginBottom: 20, border: `1px solid ${scannedResult.color}44`, textAlign: 'center' }}>
              <div style={{ fontSize: 56, marginBottom: 12 }}>{scannedResult.emoji}</div>
              <p style={{ fontSize: 11, color: scannedResult.color, fontWeight: 700, marginBottom: 4 }}>IDENTIFIED</p>
              <h2 style={{ fontSize: 20, fontWeight: 800, color: colors.text }}>{scannedResult.label}</h2>
            </div>
            <div style={{ background: colors.card, borderRadius: 18, padding: '18px', marginBottom: 16, border: `1px solid ${colors.border}` }}>
              <p style={{ fontSize: 11, color: colors.textMuted, fontWeight: 700, marginBottom: 6 }}>LESSON UNLOCKED</p>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: colors.text, marginBottom: 6 }}>{scannedResult.lesson}</h3>
              <span style={{ fontSize: 11, background: `${scannedResult.color}22`, color: scannedResult.color, padding: '3px 8px', borderRadius: 6, fontWeight: 600 }}>{scannedResult.subject}</span>
            </div>
            <div onClick={() => { setScannedResult(null); setActiveTab('lessons'); }} style={{ background: scannedResult.color, borderRadius: 14, padding: '14px', textAlign: 'center', fontWeight: 700, fontSize: 15, color: '#000', cursor: 'pointer', marginBottom: 12 }}>
              Start Lesson →
            </div>
            <div onClick={() => setScannedResult(null)} style={{ background: colors.card, borderRadius: 14, padding: '14px', textAlign: 'center', fontWeight: 600, fontSize: 14, color: colors.textSub, cursor: 'pointer', border: `1px solid ${colors.border}` }}>
              Scan Another
            </div>
          </div>
        </div>
      );
    }

    return (
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 90 }}>
        <div style={{ padding: '16px 20px 12px' }}>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: colors.text }}>Photo-to-Concept</h1>
          <p style={{ fontSize: 13, color: colors.textMuted, marginTop: 2 }}>Snap anything, learn instantly</p>
        </div>

        {/* Viewfinder */}
        <div style={{ margin: '0 20px 20px', borderRadius: 24, overflow: 'hidden', position: 'relative', height: 220, background: '#050510', border: `2px solid ${colors.primary}55` }}>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 8 }}>
            <div style={{ width: 80, height: 80, borderRadius: 40, background: `${colors.primary}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `2px dashed ${colors.primary}66` }}>
              <span style={{ fontSize: 36 }}>📷</span>
            </div>
            <p style={{ fontSize: 13, color: colors.textMuted, fontWeight: 500 }}>Point at any object</p>
          </div>
          {/* Corner brackets */}
          {[['0','0','top','left'],['0','0','top','right'],['0','0','bottom','left'],['0','0','bottom','right']].map(([t,l,vp,hp], i) => (
            <div key={i} style={{ position: 'absolute', [vp]: 12, [hp]: 12, width: 24, height: 24, borderTop: vp === 'top' ? `2px solid ${colors.primary}` : 'none', borderBottom: vp === 'bottom' ? `2px solid ${colors.primary}` : 'none', borderLeft: hp === 'left' ? `2px solid ${colors.primary}` : 'none', borderRight: hp === 'right' ? `2px solid ${colors.primary}` : 'none' }} />
          ))}
        </div>

        <div style={{ padding: '0 20px' }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: colors.textSub, marginBottom: 12 }}>Try scanning one of these:</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {scanObjects.map((obj) => (
              <div key={obj.label} onClick={() => handleScan(obj)} style={btnStyle(`scan-${obj.label}`, { background: colors.card, borderRadius: 16, padding: '16px 14px', border: `1px solid ${colors.border}`, cursor: 'pointer', textAlign: 'center' })}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>{obj.emoji}</div>
                <p style={{ fontSize: 13, fontWeight: 700, color: colors.text, lineHeight: 1.3 }}>{obj.label}</p>
                <p style={{ fontSize: 10, color: obj.color, fontWeight: 600, marginTop: 4 }}>{obj.subject}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // CURRICULUM SCREEN
  const CurriculumScreen = () => (
    <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 90 }}>
      <div style={{ padding: '16px 20px 8px' }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: colors.text }}>Your Life Curriculum</h1>
        <p style={{ fontSize: 13, color: colors.textMuted, marginTop: 2 }}>Built from your habits & environment</p>
      </div>

      {/* Overall stats */}
      <div style={{ padding: '8px 20px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
        {[
          { label: 'Lessons Done', value: '35', icon: '📚' },
          { label: 'Total Time', value: '4.2h', icon: '⏱' },
          { label: 'Concepts', value: '28', icon: '🧠' },
        ].map(s => (
          <div key={s.label} style={{ background: colors.card, borderRadius: 14, padding: '12px 10px', textAlign: 'center', border: `1px solid ${colors.border}` }}>
            <div style={{ fontSize: 20, marginBottom: 4 }}>{s.icon}</div>
            <p style={{ fontSize: 18, fontWeight: 800, color: colors.text }}>{s.value}</p>
            <p style={{ fontSize: 10, color: colors.textMuted, lineHeight: 1.3 }}>{s.label}</p>
          </div>
        ))}
      </div>

      <div style={{ padding: '16px 20px 8px' }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, color: colors.text, marginBottom: 12 }}>Subject Tracks</h2>
        {curriculum.map((subject) => (
          <div key={subject.subject} style={{ background: colors.card, borderRadius: 18, padding: '16px', marginBottom: 12, border: `1px solid ${colors.border}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <div style={{ width: 44, height: 44, borderRadius: 14, background: `${subject.color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>{subject.emoji}</div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: colors.text }}>{subject.subject}</h3>
                <p style={{ fontSize: 11, color: colors.textMuted }}>{subject.lessons} lessons · {subject.streak} day streak 🔥</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: 16, fontWeight: 800, color: subject.color }}>{subject.progress}%</p>
              </div>
            </div>
            <div style={{ background: colors.bg, borderRadius: 6, height: 6, overflow: 'hidden', marginBottom: 10 }}>
              <div style={{ height: '100%', width: `${subject.progress}%`, background: subject.color, borderRadius: 6, transition: 'width 0.6s ease' }} />
            </div>
            <div style={{ background: `${subject.color}11`, borderRadius: 10, padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 8, border: `1px solid ${subject.color}22` }}>
              <span style={{ fontSize: 12 }}>▶️</span>
              <p style={{ fontSize: 12, color: colors.textSub, fontWeight: 500 }}>Up next: <span style={{ color: subject.color, fontWeight: 700 }}>{subject.nextLesson}</span></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // REVIEW SCREEN
  const ReviewScreen = () => {
    const card = reviewCards[reviewIdx];
    return (
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 90 }}>
        <div style={{ padding: '16px 20px 8px' }}>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: colors.text }}>Memory Boost</h1>
          <p style={{ fontSize: 13, color: colors.textMuted, marginTop: 2 }}>Concepts resurface in new real-world contexts</p>
        </div>

        {/* Card indicator */}
        <div style={{ padding: '8px 20px', display: 'flex', gap: 6 }}>
          {reviewCards.map((_, i) => (
            <div key={i} onClick={() => setReviewIdx(i)} style={{ flex: 1, height: 4, borderRadius: 2, background: i === reviewIdx ? colors.primary : colors.border, cursor: 'pointer', transition: 'background 0.2s' }} />
          ))}
        </div>

        <div style={{ padding: '8px 20px' }}>
          {/* Main review card */}
          <div style={{ background: `linear-gradient(135deg, ${card.color}18, ${colors.card})`, borderRadius: 24, padding: '20px', marginBottom: 16, border: `1px solid ${card.color}44` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
              <div>
                <span style={{ fontSize: 11, background: `${card.color}22`, color: card.color, padding: '3px 8px', borderRadius: 6, fontWeight: 700 }}>{card.subject}</span>
                <div style={{ fontSize: 40, marginTop: 10, marginBottom: 6 }}>{card.emoji}</div>
                <h2 style={{ fontSize: 20, fontWeight: 800, color: colors.text }}>{card.concept}</h2>
                <p style={{ fontSize: 11, color: colors.textMuted, marginTop: 2 }}>Learned {card.learnedAgo}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: 11, color: colors.textMuted, marginBottom: 4 }}>Retention</p>
                <p style={{ fontSize: 26, fontWeight: 800, color: card.retentionScore > 65 ? colors.accent : colors.secondary }}>{card.retentionScore}%</p>
              </div>
            </div>

            <div style={{ background: `${card.color}15`, borderRadius: 14, padding: '14px', marginBottom: 0, border: `1px solid ${card.color}33` }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: card.color, marginBottom: 6 }}>📍 NEW CONTEXT DETECTED</p>
              <p style={{ fontSize: 13, color: colors.textSub, marginBottom: 10, fontStyle: 'italic' }}>"{card.newContext}"</p>
              <p style={{ fontSize: 14, color: colors.text, lineHeight: 1.6 }}>{card.reminder}</p>
            </div>
          </div>

          {/* Reaction buttons */}
          <p style={{ fontSize: 12, color: colors.textMuted, textAlign: 'center', marginBottom: 10 }}>How well do you remember this?</p>
          <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
            {[
              { label: '😅 Forgot', color: '#FF6B6B' },
              { label: '🤔 Fuzzy', color: colors.secondary },
              { label: '😊 Clear', color: colors.accent },
            ].map((r) => (
              <div key={r.label} onClick={() => setReviewIdx((reviewIdx + 1) % reviewCards.length)} style={{ flex: 1, background: colors.card, borderRadius: 14, padding: '12px 8px', textAlign: 'center', cursor: 'pointer', border: `1px solid ${colors.border}`, fontSize: 12, fontWeight: 600, color: r.color }}>
                {r.label}
              </div>
            ))}
          </div>

          {/* Past reviews */}
          <h3 style={{ fontSize: 14, fontWeight: 700, color: colors.textSub, marginBottom: 10 }}>Review History</h3>
          {[
            { concept: 'Maillard Reaction', emoji: '🔬', score: 88, ago: '2 days ago', color: colors.secondary },
            { concept: 'Active Recall', emoji: '🧠', score: 72, ago: '3 days ago', color: colors.accent },
          ].map((h) => (
            <div key={h.concept} style={{ background: colors.card, borderRadius: 14, padding: '12px 14px', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 12, border: `1px solid ${colors.border}` }}>
              <span style={{ fontSize: 22 }}>{h.emoji}</span>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: colors.text }}>{h.concept}</p>
                <p style={{ fontSize: 11, color: colors.textMuted }}>{h.ago}</p>
              </div>
              <div style={{ width: 40, height: 40, borderRadius: 20, background: `${h.color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `2px solid ${h.color}55` }}>
                <span style={{ fontSize: 12, fontWeight: 800, color: h.color }}>{h.score}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const screens = {
    today: <TodayScreen />,
    lessons: <LessonsScreen />,
    scan: <ScanScreen />,
    curriculum: <CurriculumScreen />,
    review: <ReviewScreen />,
  };

  return (
    <div style={{ minHeight: '100vh', background: '#06050F', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <style>{fontStyle}</style>

      {/* Phone frame */}
      <div style={{ width: 375, height: 812, background: colors.bg, borderRadius: 44, position: 'relative', overflow: 'hidden', boxShadow: '0 40px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.08)', display: 'flex', flexDirection: 'column' }}>
        <StatusBar />
        <DynamicIsland />

        {/* Screen content */}
        <div style={{ flex: 1, overflowY: 'hidden', display: 'flex', flexDirection: 'column', position: 'relative' }}>
          {screens[activeTab]}
        </div>

        <TabBar />
      </div>
    </div>
  );
}
