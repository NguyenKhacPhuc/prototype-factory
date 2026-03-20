function App() {
  const { useState, useEffect, useRef } = React;

  // Inject Google Fonts
  const fontStyle = `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap');`;

  // Design tokens
  const colors = {
    bg: '#0A0A14',
    surface: '#12121F',
    card: '#1A1A2E',
    cardHover: '#1E1E38',
    primary: '#7C6FFF',
    primaryLight: '#9D93FF',
    primaryDark: '#5A4FD9',
    secondary: '#FF6B6B',
    accent: '#4ECDC4',
    accentGold: '#FFD93D',
    text: '#F0F0FF',
    textMuted: '#8888BB',
    textFaint: '#44446A',
    border: '#2A2A45',
    success: '#4ECDC4',
    warning: '#FFD93D',
  };

  const [activeTab, setActiveTab] = useState('capture');
  const [captureMode, setCaptureMode] = useState('photo');
  const [showLesson, setShowLesson] = useState(false);
  const [lessonDepth, setLessonDepth] = useState('simple');
  const [pressedBtn, setPressedBtn] = useState(null);
  const [topicFilter, setTopicFilter] = useState('all');
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  const press = (id) => {
    setPressedBtn(id);
    setTimeout(() => setPressedBtn(null), 180);
  };

  const btnScale = (id) => pressedBtn === id ? 'scale(0.94)' : 'scale(1)';

  // ─── Styles ───────────────────────────────────────────────────────────────

  const styles = {
    page: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #060612 0%, #0F0A1E 50%, #060612 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Inter', sans-serif",
    },
    phone: {
      width: 375,
      height: 812,
      background: colors.bg,
      borderRadius: 52,
      overflow: 'hidden',
      position: 'relative',
      boxShadow: '0 0 0 10px #1a1a2e, 0 0 0 12px #2a2a45, 0 60px 120px rgba(124,111,255,0.25)',
      display: 'flex',
      flexDirection: 'column',
    },
    statusBar: {
      height: 48,
      background: colors.bg,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 28px',
      flexShrink: 0,
    },
    dynamicIsland: {
      position: 'absolute',
      top: 12,
      left: '50%',
      transform: 'translateX(-50%)',
      width: 120,
      height: 34,
      background: '#000',
      borderRadius: 20,
      zIndex: 10,
    },
    content: {
      flex: 1,
      overflow: 'hidden',
      position: 'relative',
    },
    screen: {
      position: 'absolute',
      inset: 0,
      overflowY: 'auto',
      overflowX: 'hidden',
    },
    bottomNav: {
      height: 84,
      background: colors.surface,
      borderTop: `1px solid ${colors.border}`,
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-around',
      padding: '12px 8px 0',
      flexShrink: 0,
    },
    navBtn: (active) => ({
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 4,
      cursor: 'pointer',
      transition: 'transform 0.15s',
      padding: '6px 14px',
      borderRadius: 16,
      background: active ? `${colors.primary}18` : 'transparent',
    }),
    navLabel: (active) => ({
      fontSize: 10,
      fontWeight: active ? 600 : 400,
      color: active ? colors.primary : colors.textFaint,
      letterSpacing: 0.3,
    }),
    tag: (color = colors.primary) => ({
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      padding: '3px 10px',
      borderRadius: 20,
      background: `${color}20`,
      color: color,
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: 0.4,
    }),
    card: {
      background: colors.card,
      borderRadius: 20,
      border: `1px solid ${colors.border}`,
      overflow: 'hidden',
    },
    sectionTitle: {
      fontSize: 11,
      fontWeight: 700,
      color: colors.textFaint,
      letterSpacing: 1.2,
      textTransform: 'uppercase',
    },
    headingLg: {
      fontFamily: "'Space Grotesk', sans-serif",
      fontSize: 22,
      fontWeight: 700,
      color: colors.text,
      lineHeight: 1.2,
    },
    headingMd: {
      fontFamily: "'Space Grotesk', sans-serif",
      fontSize: 16,
      fontWeight: 600,
      color: colors.text,
    },
    bodyText: {
      fontSize: 13,
      color: colors.textMuted,
      lineHeight: 1.6,
    },
    primaryBtn: {
      background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryDark})`,
      color: '#fff',
      border: 'none',
      borderRadius: 14,
      padding: '13px 24px',
      fontSize: 14,
      fontWeight: 600,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      width: '100%',
      transition: 'transform 0.15s',
    },
  };

  // ─── Nav Tabs ─────────────────────────────────────────────────────────────

  const tabs = [
    { id: 'capture', label: 'Capture', icon: 'Aperture' },
    { id: 'learn', label: 'Learn', icon: 'BookOpen' },
    { id: 'practice', label: 'Practice', icon: 'Zap' },
    { id: 'map', label: 'My Map', icon: 'Map' },
    { id: 'profile', label: 'Profile', icon: 'User' },
  ];

  // ─── SCREEN: Capture ──────────────────────────────────────────────────────

  const CaptureScreen = () => {
    const [inputText, setInputText] = useState('');
    const [isRecording, setIsRecording] = useState(false);
    const [recordPulse, setRecordPulse] = useState(false);

    const startRecord = () => {
      setIsRecording(true);
      setRecordPulse(true);
    };
    const stopRecord = () => {
      setIsRecording(false);
      setRecordPulse(false);
    };

    const recentCaptures = [
      { icon: '🏗️', text: 'Construction scaffolding angles', time: '2h ago', topic: 'Math' },
      { icon: '🌱', text: 'Photosynthesis from a leaf', time: '5h ago', topic: 'Biology' },
      { icon: '🗞️', text: 'Inflation rate on the news', time: '1d ago', topic: 'Economics' },
    ];

    return (
      <div style={{ padding: '12px 20px 20px', display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* Header */}
        <div>
          <div style={styles.sectionTitle}>Today, March 21</div>
          <div style={{ ...styles.headingLg, marginTop: 4 }}>What are you curious about? ✨</div>
        </div>

        {/* Mode switcher */}
        <div style={{ display: 'flex', gap: 8, background: colors.card, borderRadius: 16, padding: 5 }}>
          {['photo', 'voice', 'text'].map(m => (
            <div
              key={m}
              onClick={() => { setCaptureMode(m); press(`mode-${m}`); }}
              style={{
                flex: 1,
                padding: '8px 0',
                borderRadius: 12,
                background: captureMode === m ? colors.primary : 'transparent',
                color: captureMode === m ? '#fff' : colors.textMuted,
                fontSize: 13,
                fontWeight: 600,
                textAlign: 'center',
                cursor: 'pointer',
                textTransform: 'capitalize',
                transition: 'all 0.2s',
                transform: btnScale(`mode-${m}`),
              }}
            >
              {m === 'photo' ? '📷 Photo' : m === 'voice' ? '🎙️ Voice' : '✏️ Text'}
            </div>
          ))}
        </div>

        {/* Capture area */}
        {captureMode === 'photo' && (
          <div style={{
            ...styles.card,
            height: 220,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 12,
            background: `linear-gradient(135deg, ${colors.card}, #0E0E22)`,
            border: `2px dashed ${colors.border}`,
          }}>
            <div style={{ fontSize: 48 }}>📸</div>
            <div style={{ ...styles.headingMd, color: colors.textMuted }}>Tap to capture moment</div>
            <div style={{ ...styles.bodyText, textAlign: 'center', maxWidth: 200, fontSize: 12 }}>
              Point at anything — objects, text, situations — and turn it into a lesson
            </div>
            <div
              onClick={() => { press('camera-btn'); setTimeout(() => { setActiveTab('learn'); setShowLesson(true); }, 300); }}
              style={{
                ...styles.primaryBtn,
                width: 'auto',
                padding: '10px 24px',
                borderRadius: 30,
                transform: btnScale('camera-btn'),
              }}
            >
              Open Camera
            </div>
          </div>
        )}

        {captureMode === 'voice' && (
          <div style={{
            ...styles.card,
            height: 220,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 14,
          }}>
            <div style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              background: isRecording ? `${colors.secondary}30` : `${colors.primary}20`,
              border: `3px solid ${isRecording ? colors.secondary : colors.primary}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 32,
              animation: recordPulse ? 'pulse 1s infinite' : 'none',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
              onClick={() => isRecording ? stopRecord() : startRecord()}
            >
              {isRecording ? '⏹️' : '🎙️'}
            </div>
            {isRecording ? (
              <div>
                <div style={{ ...styles.headingMd, color: colors.secondary, textAlign: 'center' }}>Recording... 0:04</div>
                <div style={{ ...styles.bodyText, textAlign: 'center', fontSize: 12, marginTop: 4 }}>Tap to stop</div>
              </div>
            ) : (
              <div>
                <div style={{ ...styles.headingMd, textAlign: 'center' }}>Ask a question</div>
                <div style={{ ...styles.bodyText, textAlign: 'center', fontSize: 12, marginTop: 4 }}>Speak naturally — describe what you see or ask anything</div>
              </div>
            )}
          </div>
        )}

        {captureMode === 'text' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{
              ...styles.card,
              padding: 16,
            }}>
              <textarea
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                placeholder="Describe what you're looking at, or ask anything you're curious about...

e.g. 'I see a circuit board — what are those tiny black chips?' or 'My lease says APR 3.2% — what does that mean?'"
                style={{
                  width: '100%',
                  minHeight: 120,
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: colors.text,
                  fontSize: 13,
                  lineHeight: 1.6,
                  fontFamily: "'Inter', sans-serif",
                  resize: 'none',
                  boxSizing: 'border-box',
                }}
              />
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {['What is...', 'How does...', 'Why does...', 'Explain this'].map(hint => (
                <div key={hint}
                  onClick={() => setInputText(hint + ' ')}
                  style={{ ...styles.tag(), cursor: 'pointer', fontSize: 12 }}
                >
                  {hint}
                </div>
              ))}
            </div>
            <div
              onClick={() => { press('text-submit'); setTimeout(() => { setActiveTab('learn'); setShowLesson(true); }, 300); }}
              style={{ ...styles.primaryBtn, transform: btnScale('text-submit') }}
            >
              <span>Generate Lesson</span>
              <span>→</span>
            </div>
          </div>
        )}

        {/* Recent captures */}
        <div>
          <div style={{ ...styles.sectionTitle, marginBottom: 12 }}>Recent Captures</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {recentCaptures.map((cap, i) => (
              <div key={i}
                onClick={() => { press(`cap-${i}`); setActiveTab('learn'); setShowLesson(true); }}
                style={{
                  ...styles.card,
                  padding: '12px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  cursor: 'pointer',
                  transform: btnScale(`cap-${i}`),
                  transition: 'transform 0.15s',
                }}
              >
                <div style={{ fontSize: 28, flexShrink: 0 }}>{cap.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ ...styles.headingMd, fontSize: 13 }}>{cap.text}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
                    <div style={styles.tag(colors.accent)}>{cap.topic}</div>
                    <div style={{ ...styles.bodyText, fontSize: 11 }}>{cap.time}</div>
                  </div>
                </div>
                <div style={{ color: colors.textFaint, fontSize: 16 }}>›</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // ─── SCREEN: Learn ────────────────────────────────────────────────────────

  const LearnScreen = () => {
    const depths = ['simple', 'standard', 'advanced'];
    const [bookmarked, setBookmarked] = useState(false);
    const [liked, setLiked] = useState(false);

    const lesson = {
      topic: 'Scaffolding Angles & Structural Math',
      emoji: '🏗️',
      tags: ['Math', 'Physics', 'Real Life'],
      context: 'From your photo: Construction site on 5th Ave',
      simple: {
        headline: 'Why scaffolding is angled',
        body: 'Scaffolding needs diagonal braces because triangles are the strongest shape in construction. When you push on a triangle, force spreads evenly to all three sides. A rectangle without diagonals would wobble and collapse under pressure.',
        analogy: '🧩 Think of it like a chair — four legs wobble, but add an X brace between them and it becomes solid instantly.',
      },
      standard: {
        headline: 'The 45° Rule & Load Distribution',
        body: 'Engineers use 45-degree angles because they create equal tension and compression forces along each member. At 45°, sin(45°) = cos(45°) ≈ 0.707, meaning horizontal and vertical force components are balanced. This maximizes stability without wasting material.',
        analogy: '📐 The Pythagorean theorem (a² + b² = c²) determines how long each brace needs to be. A 3m × 3m frame needs diagonal braces of √18 ≈ 4.24m.',
      },
      advanced: {
        headline: 'Truss Theory & Moment Distribution',
        body: 'Scaffolding uses Pratt truss configurations where diagonal members carry tension and verticals carry compression. Using Euler\'s column buckling formula (P_cr = π²EI/L²), engineers calculate the critical load before a member buckles. Moment distribution across nodes follows the stiffness method (K = 4EI/L for fixed ends).',
        analogy: '🔬 In FEM analysis, each node has 6 degrees of freedom. Constraining rotation (moment resistance) is what separates rigid scaffolding from a simple propped structure.',
      },
    };

    const current = lesson[lessonDepth];

    return (
      <div style={{ padding: '12px 20px 20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* Lesson header */}
        <div style={{
          ...styles.card,
          padding: 16,
          background: `linear-gradient(135deg, ${colors.card}, #1A1030)`,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ fontSize: 40 }}>{lesson.emoji}</div>
            <div style={{ display: 'flex', gap: 10 }}>
              <div onClick={() => setLiked(!liked)} style={{ cursor: 'pointer', fontSize: 20 }}>{liked ? '❤️' : '🤍'}</div>
              <div onClick={() => setBookmarked(!bookmarked)} style={{ cursor: 'pointer', fontSize: 20 }}>{bookmarked ? '🔖' : '📑'}</div>
            </div>
          </div>
          <div style={{ ...styles.headingLg, marginTop: 10, fontSize: 18 }}>{lesson.topic}</div>
          <div style={{ ...styles.bodyText, fontSize: 11, marginTop: 6 }}>📍 {lesson.context}</div>
          <div style={{ display: 'flex', gap: 6, marginTop: 10, flexWrap: 'wrap' }}>
            {lesson.tags.map(t => (
              <div key={t} style={styles.tag(colors.accent)}>{t}</div>
            ))}
          </div>
        </div>

        {/* Depth selector */}
        <div>
          <div style={{ ...styles.sectionTitle, marginBottom: 8 }}>Explanation Depth</div>
          <div style={{ display: 'flex', gap: 6 }}>
            {depths.map(d => (
              <div
                key={d}
                onClick={() => { setLessonDepth(d); press(`depth-${d}`); }}
                style={{
                  flex: 1,
                  padding: '8px 0',
                  borderRadius: 12,
                  background: lessonDepth === d
                    ? d === 'simple' ? colors.accent : d === 'standard' ? colors.primary : colors.secondary
                    : colors.card,
                  color: lessonDepth === d ? '#fff' : colors.textMuted,
                  fontSize: 11,
                  fontWeight: 600,
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  transform: btnScale(`depth-${d}`),
                  border: `1px solid ${lessonDepth === d ? 'transparent' : colors.border}`,
                  textTransform: 'capitalize',
                }}
              >
                {d === 'simple' ? '🌱 Simple' : d === 'standard' ? '📚 Standard' : '🔬 Advanced'}
              </div>
            ))}
          </div>
        </div>

        {/* Lesson content */}
        <div style={{ ...styles.card, padding: 18, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ ...styles.headingMd }}>{current.headline}</div>
          <div style={{ ...styles.bodyText, fontSize: 14 }}>{current.body}</div>
          <div style={{
            background: `${colors.accentGold}12`,
            borderLeft: `3px solid ${colors.accentGold}`,
            padding: '12px 14px',
            borderRadius: '0 10px 10px 0',
          }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: colors.accentGold, marginBottom: 4 }}>ANALOGY</div>
            <div style={{ ...styles.bodyText, fontSize: 13 }}>{current.analogy}</div>
          </div>
        </div>

        {/* Key terms */}
        <div>
          <div style={{ ...styles.sectionTitle, marginBottom: 10 }}>Key Terms</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { term: 'Truss', def: 'A framework of beams forming triangles for structural support' },
              { term: 'Compression', def: 'Force that pushes or squeezes a structural member inward' },
              { term: 'Load distribution', def: 'How weight is spread across connected structural elements' },
            ].map((item, i) => (
              <div key={i} style={{ ...styles.card, padding: '10px 14px', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <div style={{ ...styles.tag(colors.primary), flexShrink: 0, marginTop: 1 }}>{item.term}</div>
                <div style={{ ...styles.bodyText, fontSize: 12 }}>{item.def}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div
          onClick={() => { press('goto-practice'); setActiveTab('practice'); }}
          style={{
            ...styles.primaryBtn,
            background: `linear-gradient(135deg, ${colors.secondary}, #D94F4F)`,
            transform: btnScale('goto-practice'),
          }}
        >
          <span>⚡ Try a Practice Challenge</span>
        </div>
      </div>
    );
  };

  // ─── SCREEN: Practice ─────────────────────────────────────────────────────

  const PracticeScreen = () => {
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [revealed, setRevealed] = useState(false);
    const [streakCount] = useState(7);

    const challenge = {
      type: 'Quiz',
      emoji: '🏗️',
      context: 'Based on your capture: Construction site angles',
      question: 'If a scaffold brace is 4m tall and 4m wide, what is the exact length of its diagonal support?',
      answers: [
        { text: '5.66 meters (√32)', correct: true },
        { text: '6.00 meters', correct: false },
        { text: '4.50 meters', correct: false },
        { text: '8.00 meters', correct: false },
      ],
      explanation: 'Using the Pythagorean theorem: √(4² + 4²) = √32 ≈ 5.66m. The diagonal is always longer than each side when both dimensions are equal.',
    };

    const upcomingChallenges = [
      { icon: '🌱', title: 'Photosynthesis reaction equation', type: 'Fill-in', due: 'Tomorrow' },
      { icon: '📰', title: 'Inflation impact on savings', type: 'Scenario', due: 'In 2 days' },
      { icon: '⚡', title: 'Ohm\'s Law from circuit photo', type: 'Calculate', due: 'In 3 days' },
    ];

    return (
      <div style={{ padding: '12px 20px 20px', display: 'flex', flexDirection: 'column', gap: 18 }}>
        {/* Streak */}
        <div style={{
          ...styles.card,
          padding: '14px 18px',
          background: `linear-gradient(135deg, ${colors.card}, #1E1025)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div>
            <div style={{ fontSize: 11, color: colors.textMuted, fontWeight: 600, letterSpacing: 0.5 }}>DAILY STREAK</div>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 28, fontWeight: 700, color: colors.accentGold }}>
              🔥 {streakCount} days
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 11, color: colors.textMuted }}>XP Today</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: colors.accent }}>+240</div>
          </div>
        </div>

        {/* Active challenge */}
        <div>
          <div style={{ ...styles.sectionTitle, marginBottom: 10 }}>Active Challenge</div>
          <div style={{ ...styles.card, padding: 18, display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ fontSize: 28 }}>{challenge.emoji}</div>
              <div>
                <div style={styles.tag(colors.secondary)}>{challenge.type}</div>
                <div style={{ ...styles.bodyText, fontSize: 11, marginTop: 4 }}>📍 {challenge.context}</div>
              </div>
            </div>
            <div style={{ ...styles.headingMd, fontSize: 14, lineHeight: 1.4 }}>{challenge.question}</div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {challenge.answers.map((ans, i) => {
                const isSelected = selectedAnswer === i;
                const showResult = revealed && isSelected;
                const bgColor = revealed
                  ? ans.correct ? `${colors.accent}25` : (isSelected ? `${colors.secondary}25` : colors.card)
                  : isSelected ? `${colors.primary}25` : colors.card;
                const borderColor = revealed
                  ? ans.correct ? colors.accent : (isSelected ? colors.secondary : colors.border)
                  : isSelected ? colors.primary : colors.border;

                return (
                  <div key={i}
                    onClick={() => { if (!revealed) { setSelectedAnswer(i); press(`ans-${i}`); } }}
                    style={{
                      padding: '12px 14px',
                      borderRadius: 12,
                      border: `2px solid ${borderColor}`,
                      background: bgColor,
                      cursor: revealed ? 'default' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      transition: 'all 0.2s',
                      transform: btnScale(`ans-${i}`),
                    }}
                  >
                    <div style={{
                      width: 24,
                      height: 24,
                      borderRadius: 12,
                      background: revealed ? (ans.correct ? colors.accent : (isSelected ? colors.secondary : colors.border)) : (isSelected ? colors.primary : colors.textFaint),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 11,
                      fontWeight: 700,
                      color: '#fff',
                      flexShrink: 0,
                    }}>
                      {revealed ? (ans.correct ? '✓' : (isSelected ? '✗' : String.fromCharCode(65 + i))) : String.fromCharCode(65 + i)}
                    </div>
                    <div style={{ ...styles.bodyText, fontSize: 13, color: colors.text }}>{ans.text}</div>
                  </div>
                );
              })}
            </div>

            {revealed && (
              <div style={{
                background: `${colors.accent}12`,
                borderLeft: `3px solid ${colors.accent}`,
                padding: '12px 14px',
                borderRadius: '0 10px 10px 0',
              }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: colors.accent, marginBottom: 4 }}>EXPLANATION</div>
                <div style={{ ...styles.bodyText, fontSize: 12 }}>{challenge.explanation}</div>
              </div>
            )}

            {!revealed ? (
              <div
                onClick={() => { press('check'); setRevealed(true); }}
                style={{
                  ...styles.primaryBtn,
                  opacity: selectedAnswer === null ? 0.4 : 1,
                  transform: btnScale('check'),
                }}
              >
                Check Answer
              </div>
            ) : (
              <div style={{ display: 'flex', gap: 8 }}>
                <div
                  onClick={() => { setSelectedAnswer(null); setRevealed(false); press('retry'); }}
                  style={{
                    ...styles.primaryBtn,
                    flex: 1,
                    background: colors.card,
                    border: `1px solid ${colors.border}`,
                    color: colors.text,
                    transform: btnScale('retry'),
                  }}
                >
                  Try Again
                </div>
                <div
                  onClick={() => press('next-c')}
                  style={{ ...styles.primaryBtn, flex: 1, transform: btnScale('next-c') }}
                >
                  Next →
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Upcoming */}
        <div>
          <div style={{ ...styles.sectionTitle, marginBottom: 10 }}>Spaced Reminders</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {upcomingChallenges.map((c, i) => (
              <div key={i} style={{ ...styles.card, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ fontSize: 24 }}>{c.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ ...styles.headingMd, fontSize: 13 }}>{c.title}</div>
                  <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                    <div style={styles.tag(colors.primary)}>{c.type}</div>
                    <div style={{ ...styles.bodyText, fontSize: 11 }}>⏰ {c.due}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // ─── SCREEN: Knowledge Map ────────────────────────────────────────────────

  const MapScreen = () => {
    const filters = ['all', 'Math', 'Science', 'Economics', 'History', 'Tech'];
    const [expanded, setExpanded] = useState(null);

    const nodes = [
      {
        id: 1, emoji: '📐', title: 'Structural Math', strength: 78, color: colors.primary,
        subtopics: ['Pythagorean Theorem', 'Load Distribution', 'Truss Theory', 'Angles & Vectors'],
        category: 'Math', lessons: 6, lastVisited: '2h ago',
      },
      {
        id: 2, emoji: '🌱', title: 'Photosynthesis', strength: 45, color: colors.accent,
        subtopics: ['Light Reactions', 'Calvin Cycle', 'Chlorophyll', 'Glucose Production'],
        category: 'Science', lessons: 3, lastVisited: '5h ago',
      },
      {
        id: 3, emoji: '💹', title: 'Personal Finance', strength: 62, color: colors.accentGold,
        subtopics: ['APR vs APY', 'Inflation', 'Compound Interest', 'Bond Rates'],
        category: 'Economics', lessons: 5, lastVisited: '1d ago',
      },
      {
        id: 4, emoji: '⚡', title: 'Electricity Basics', strength: 30, color: colors.secondary,
        subtopics: ['Ohm\'s Law', 'Circuit Types', 'Resistance', 'Voltage Drop'],
        category: 'Tech', lessons: 2, lastVisited: '3d ago',
      },
      {
        id: 5, emoji: '🧠', title: 'Cognitive Biases', strength: 55, color: '#B87FFF',
        subtopics: ['Confirmation Bias', 'Anchoring', 'Loss Aversion', 'Sunk Cost Fallacy'],
        category: 'Science', lessons: 4, lastVisited: '2d ago',
      },
    ];

    const filtered = topicFilter === 'all' ? nodes : nodes.filter(n => n.category === topicFilter);

    const StrengthBar = ({ value, color }) => (
      <div style={{ width: '100%', height: 5, background: colors.border, borderRadius: 3, overflow: 'hidden' }}>
        <div style={{
          height: '100%',
          width: `${value}%`,
          background: `linear-gradient(90deg, ${color}, ${color}88)`,
          borderRadius: 3,
          transition: 'width 0.6s ease',
        }} />
      </div>
    );

    return (
      <div style={{ padding: '12px 20px 20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* Header stats */}
        <div style={{ display: 'flex', gap: 10 }}>
          {[
            { label: 'Topics', value: '12', icon: '🗺️' },
            { label: 'Lessons', value: '38', icon: '📚' },
            { label: 'Avg Strength', value: '54%', icon: '💪' },
          ].map((stat, i) => (
            <div key={i} style={{
              ...styles.card,
              flex: 1,
              padding: '12px 10px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 4,
            }}>
              <div style={{ fontSize: 20 }}>{stat.icon}</div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 700, color: colors.text }}>{stat.value}</div>
              <div style={{ fontSize: 10, color: colors.textMuted, fontWeight: 600 }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Filter */}
        <div style={{ display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 4 }}>
          {filters.map(f => (
            <div
              key={f}
              onClick={() => { setTopicFilter(f); press(`filter-${f}`); }}
              style={{
                flexShrink: 0,
                padding: '6px 14px',
                borderRadius: 20,
                background: topicFilter === f ? colors.primary : colors.card,
                color: topicFilter === f ? '#fff' : colors.textMuted,
                fontSize: 12,
                fontWeight: 600,
                cursor: 'pointer',
                border: `1px solid ${topicFilter === f ? 'transparent' : colors.border}`,
                transition: 'all 0.2s',
                transform: btnScale(`filter-${f}`),
                textTransform: 'capitalize',
              }}
            >
              {f}
            </div>
          ))}
        </div>

        {/* Topic nodes */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {filtered.map(node => (
            <div key={node.id}>
              <div
                onClick={() => { setExpanded(expanded === node.id ? null : node.id); press(`node-${node.id}`); }}
                style={{
                  ...styles.card,
                  padding: '14px 16px',
                  cursor: 'pointer',
                  transform: btnScale(`node-${node.id}`),
                  transition: 'transform 0.15s',
                  borderLeft: `4px solid ${node.color}`,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ fontSize: 28 }}>{node.emoji}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ ...styles.headingMd, fontSize: 14 }}>{node.title}</div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: node.color }}>{node.strength}%</div>
                    </div>
                    <div style={{ marginTop: 6 }}>
                      <StrengthBar value={node.strength} color={node.color} />
                    </div>
                    <div style={{ display: 'flex', gap: 10, marginTop: 6 }}>
                      <div style={{ ...styles.bodyText, fontSize: 11 }}>📖 {node.lessons} lessons</div>
                      <div style={{ ...styles.bodyText, fontSize: 11 }}>⏱ {node.lastVisited}</div>
                    </div>
                  </div>
                  <div style={{ color: colors.textFaint, fontSize: 16, transition: 'transform 0.2s', transform: expanded === node.id ? 'rotate(90deg)' : 'none' }}>›</div>
                </div>
              </div>

              {expanded === node.id && (
                <div style={{
                  background: colors.card,
                  borderRadius: '0 0 16px 16px',
                  border: `1px solid ${colors.border}`,
                  borderTop: 'none',
                  padding: '12px 16px 14px',
                  borderLeft: `4px solid ${node.color}`,
                  marginTop: -4,
                }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: colors.textFaint, marginBottom: 8, letterSpacing: 0.5 }}>SUBTOPICS</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {node.subtopics.map((sub, i) => (
                      <div key={i} style={{ ...styles.tag(node.color), fontSize: 11 }}>{sub}</div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ─── SCREEN: Profile ──────────────────────────────────────────────────────

  const ProfileScreen = () => {
    const [notifications, setNotifications] = useState(true);
    const [darkMode, setDarkMode] = useState(true);
    const [dailyGoal, setDailyGoal] = useState(3);

    const Toggle = ({ value, onChange }) => (
      <div
        onClick={() => onChange(!value)}
        style={{
          width: 44,
          height: 26,
          borderRadius: 13,
          background: value ? colors.primary : colors.border,
          position: 'relative',
          cursor: 'pointer',
          transition: 'background 0.2s',
          flexShrink: 0,
        }}
      >
        <div style={{
          position: 'absolute',
          width: 20,
          height: 20,
          borderRadius: 10,
          background: '#fff',
          top: 3,
          left: value ? 21 : 3,
          transition: 'left 0.2s',
          boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
        }} />
      </div>
    );

    const achievements = [
      { icon: '🔥', label: '7-Day Streak', earned: true },
      { icon: '🧠', label: 'First Lesson', earned: true },
      { icon: '⚡', label: '10 Captures', earned: true },
      { icon: '🏆', label: '30-Day Streak', earned: false },
      { icon: '🌍', label: '10 Topics', earned: false },
      { icon: '💎', label: '100 Lessons', earned: false },
    ];

    return (
      <div style={{ padding: '12px 20px 20px', display: 'flex', flexDirection: 'column', gap: 18 }}>
        {/* Profile header */}
        <div style={{
          ...styles.card,
          padding: 20,
          background: `linear-gradient(135deg, ${colors.card}, #1A0F30)`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 10,
        }}>
          <div style={{
            width: 72,
            height: 72,
            borderRadius: 36,
            background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 32,
          }}>
            🧑‍🎓
          </div>
          <div>
            <div style={{ ...styles.headingLg, fontSize: 20, textAlign: 'center' }}>Alex Rivera</div>
            <div style={{ ...styles.bodyText, textAlign: 'center', fontSize: 12 }}>Curious Learner · Level 8</div>
          </div>
          <div style={{
            width: '100%',
            background: colors.bg,
            borderRadius: 12,
            height: 8,
            overflow: 'hidden',
          }}>
            <div style={{
              height: '100%',
              width: '65%',
              background: `linear-gradient(90deg, ${colors.primary}, ${colors.accent})`,
              borderRadius: 12,
            }} />
          </div>
          <div style={{ ...styles.bodyText, fontSize: 11 }}>1,620 / 2,500 XP to Level 9</div>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', gap: 8 }}>
          {[
            { label: 'Captures', value: '38', icon: '📸' },
            { label: 'Lessons', value: '112', icon: '📚' },
            { label: 'Best Streak', value: '14d', icon: '🔥' },
            { label: 'Topics', value: '12', icon: '🗺️' },
          ].map((s, i) => (
            <div key={i} style={{
              ...styles.card,
              flex: 1,
              padding: '10px 6px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 3,
            }}>
              <div style={{ fontSize: 16 }}>{s.icon}</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: colors.text }}>{s.value}</div>
              <div style={{ fontSize: 9, color: colors.textMuted, fontWeight: 600, textAlign: 'center' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Achievements */}
        <div>
          <div style={{ ...styles.sectionTitle, marginBottom: 10 }}>Achievements</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
            {achievements.map((a, i) => (
              <div key={i} style={{
                ...styles.card,
                padding: '12px 8px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 6,
                opacity: a.earned ? 1 : 0.4,
              }}>
                <div style={{ fontSize: 26, filter: a.earned ? 'none' : 'grayscale(100%)' }}>{a.icon}</div>
                <div style={{ fontSize: 10, fontWeight: 600, color: a.earned ? colors.text : colors.textMuted, textAlign: 'center' }}>{a.label}</div>
                {a.earned && <div style={{ ...styles.tag(colors.accent), fontSize: 9 }}>Earned</div>}
              </div>
            ))}
          </div>
        </div>

        {/* Settings */}
        <div>
          <div style={{ ...styles.sectionTitle, marginBottom: 10 }}>Settings</div>
          <div style={{ ...styles.card, overflow: 'hidden' }}>
            {[
              { label: 'Daily Reminders', sub: 'Spaced repetition alerts', value: notifications, onChange: setNotifications },
              { label: 'Dark Mode', sub: 'Current: Dark theme', value: darkMode, onChange: setDarkMode },
            ].map((setting, i) => (
              <div key={i} style={{
                padding: '14px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: i === 0 ? `1px solid ${colors.border}` : 'none',
              }}>
                <div>
                  <div style={{ ...styles.headingMd, fontSize: 14 }}>{setting.label}</div>
                  <div style={{ ...styles.bodyText, fontSize: 11 }}>{setting.sub}</div>
                </div>
                <Toggle value={setting.value} onChange={setting.onChange} />
              </div>
            ))}

            {/* Daily goal */}
            <div style={{
              padding: '14px 16px',
              borderTop: `1px solid ${colors.border}`,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <div>
                  <div style={{ ...styles.headingMd, fontSize: 14 }}>Daily Goal</div>
                  <div style={{ ...styles.bodyText, fontSize: 11 }}>Lessons per day</div>
                </div>
                <div style={{ fontSize: 20, fontWeight: 700, color: colors.primary }}>{dailyGoal}</div>
              </div>
              <div style={{ display: 'flex', gap: 6 }}>
                {[1, 3, 5, 10].map(g => (
                  <div
                    key={g}
                    onClick={() => { setDailyGoal(g); press(`goal-${g}`); }}
                    style={{
                      flex: 1,
                      padding: '6px 0',
                      borderRadius: 10,
                      background: dailyGoal === g ? colors.primary : colors.bg,
                      color: dailyGoal === g ? '#fff' : colors.textMuted,
                      fontSize: 13,
                      fontWeight: 600,
                      textAlign: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      transform: btnScale(`goal-${g}`),
                    }}
                  >
                    {g}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Logout */}
        <div
          onClick={() => press('logout')}
          style={{
            ...styles.card,
            padding: '14px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            cursor: 'pointer',
            transform: btnScale('logout'),
            transition: 'transform 0.15s',
          }}
        >
          <div style={{ color: colors.secondary, fontWeight: 600, fontSize: 14 }}>Sign Out</div>
        </div>
      </div>
    );
  };

  // ─── Render ───────────────────────────────────────────────────────────────

  const screenMap = {
    capture: CaptureScreen,
    learn: LearnScreen,
    practice: PracticeScreen,
    map: MapScreen,
    profile: ProfileScreen,
  };

  const ActiveScreen = screenMap[activeTab];

  const IconComponent = ({ name, size = 20, color = colors.textFaint }) => {
    const Icon = window.lucide && window.lucide[name];
    if (!Icon) return <span style={{ color, fontSize: size * 0.8 }}>·</span>;
    return React.createElement(Icon, { size, color, strokeWidth: 2 });
  };

  const navIcons = {
    capture: 'Aperture',
    learn: 'BookOpen',
    practice: 'Zap',
    map: 'Map',
    profile: 'User',
  };

  return (
    <div style={styles.page}>
      <style>{`
        ${fontStyle}
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { display: none; }
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.08); opacity: 0.8; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div style={styles.phone}>
        {/* Dynamic Island */}
        <div style={styles.dynamicIsland} />

        {/* Status Bar */}
        <div style={styles.statusBar}>
          <div style={{ fontSize: 13, fontWeight: 700, color: colors.text, letterSpacing: 0.5 }}>{currentTime || '09:41'}</div>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            <IconComponent name="Wifi" size={14} color={colors.text} />
            <IconComponent name="Signal" size={14} color={colors.text} />
            <div style={{
              width: 24,
              height: 12,
              borderRadius: 3,
              border: `1.5px solid ${colors.textMuted}`,
              padding: 2,
              display: 'flex',
              alignItems: 'center',
            }}>
              <div style={{ width: '75%', height: '100%', background: colors.accent, borderRadius: 1 }} />
            </div>
          </div>
        </div>

        {/* Screen content */}
        <div style={styles.content}>
          <div style={{ ...styles.screen, animation: 'fadeIn 0.25s ease' }} key={activeTab}>
            <ActiveScreen />
          </div>
        </div>

        {/* Bottom nav */}
        <div style={styles.bottomNav}>
          {tabs.map(tab => {
            const active = activeTab === tab.id;
            return (
              <div
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); press(`nav-${tab.id}`); }}
                style={{ ...styles.navBtn(active), transform: btnScale(`nav-${tab.id}`), transition: 'transform 0.15s', cursor: 'pointer' }}
              >
                <IconComponent name={tab.icon} size={22} color={active ? colors.primary : colors.textFaint} />
                <span style={styles.navLabel(active)}>{tab.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
