function App() {
  const { useState, useEffect, useRef } = React;

  // Inject Google Fonts
  const fontStyle = `@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap');`;

  const colors = {
    ivory: '#FFFDF5',
    terracotta: '#C67B5C',
    terracottaDark: '#A5634A',
    terracottaLight: '#E8A08A',
    sand: '#E8D5B7',
    sandDark: '#D4BA96',
    forest: '#4A7C59',
    forestLight: '#6BA57A',
    forestDark: '#3A6247',
    warmGray: '#8B7E74',
    cream: '#F5EDD8',
    darkBg: '#1A1410',
    text: '#2C1810',
    textLight: '#6B5A50',
    white: '#FFFFFF',
    errorRed: '#D94F3D',
    warningAmber: '#E8973A',
    successGreen: '#4A7C59',
    cardBg: '#FFF9EE',
  };

  const [activeTab, setActiveTab] = useState('home');
  const [scanStage, setScanStage] = useState('idle'); // idle, scanning, analyzing, done
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedMistake, setSelectedMistake] = useState(null);
  const [questActive, setQuestActive] = useState(null);
  const [pressedBtn, setPressedBtn] = useState(null);

  const handlePress = (id) => {
    setPressedBtn(id);
    setTimeout(() => setPressedBtn(null), 150);
  };

  const btnScale = (id) => pressedBtn === id ? 'scale(0.96)' : 'scale(1)';

  // ── DATA ──────────────────────────────────────────────────────────────────

  const recentMistakes = [
    { id: 1, subject: 'Algebra', topic: 'Quadratic Equations', error: 'Sign error when applying quadratic formula', severity: 'high', date: 'Today', count: 3, concept: 'Discriminant & roots' },
    { id: 2, subject: 'Chemistry', topic: 'Mole Calculations', error: 'Confused molar mass with molecular mass', severity: 'medium', date: 'Yesterday', count: 2, concept: 'Avogadro\'s number' },
    { id: 3, subject: 'Geometry', topic: 'Similar Triangles', error: 'Incorrect ratio setup for proportional sides', severity: 'low', date: '2d ago', count: 1, concept: 'Proportionality' },
    { id: 4, subject: 'Physics', topic: 'Newton\'s Laws', error: 'Mixed up net force direction', severity: 'high', date: '3d ago', count: 4, concept: 'Force vectors' },
  ];

  const heatmapConcepts = [
    { id: 1, name: 'Quadratic Formula', subject: 'Algebra', intensity: 0.9, x: 30, y: 20, linked: [2, 3] },
    { id: 2, name: 'Factoring', subject: 'Algebra', intensity: 0.6, x: 60, y: 35, linked: [4] },
    { id: 3, name: 'Completing Square', subject: 'Algebra', intensity: 0.4, x: 20, y: 50, linked: [4] },
    { id: 4, name: 'Polynomials', subject: 'Algebra', intensity: 0.3, x: 45, y: 65, linked: [] },
    { id: 5, name: 'Mole Concept', subject: 'Chemistry', intensity: 0.75, x: 75, y: 25, linked: [6, 7] },
    { id: 6, name: 'Atomic Mass', subject: 'Chemistry', intensity: 0.5, x: 82, y: 48, linked: [7] },
    { id: 7, name: 'Periodic Table', subject: 'Chemistry', intensity: 0.2, x: 70, y: 70, linked: [] },
    { id: 8, name: 'Force Vectors', subject: 'Physics', intensity: 0.8, x: 15, y: 75, linked: [9] },
    { id: 9, name: 'Newton\'s 2nd Law', subject: 'Physics', intensity: 0.6, x: 35, y: 85, linked: [] },
  ];

  const quests = [
    {
      id: 1, title: 'Root Cause: Quadratic Signs', subject: 'Algebra', xp: 120, difficulty: 'Hard',
      steps: 4, completed: 1, dueIn: '2h', color: colors.terracotta,
      desc: 'Rebuild your understanding of ± in the quadratic formula through targeted micro-exercises.',
      exercises: [
        { q: 'What does the ± symbol mean in x = (-b ± √Δ) / 2a?', a: 'Two solutions exist: one with addition, one with subtraction', done: true },
        { q: 'If Δ = 16 and b = -4, a = 1, find both roots.', a: 'x = (4 + 4)/2 = 4 and x = (4 - 4)/2 = 0', done: false },
        { q: 'Why do we divide the entire numerator by 2a?', a: 'The formula derives from completing the square, 2a is the full denominator', done: false },
        { q: 'Solve: 2x² - 5x + 3 = 0 step by step', a: 'x = 1 or x = 1.5', done: false },
      ]
    },
    {
      id: 2, title: 'Molar Mass vs Molecular Mass', subject: 'Chemistry', xp: 80, difficulty: 'Medium',
      steps: 3, completed: 0, dueIn: '1d', color: colors.forest,
      desc: 'Distinguish between molar mass (g/mol) and molecular mass (amu) with real compound examples.',
      exercises: [
        { q: 'What units does molar mass use?', a: 'g/mol (grams per mole)', done: false },
        { q: 'Calculate the molar mass of H₂O', a: '2(1) + 16 = 18 g/mol', done: false },
        { q: 'How many molecules in 18g of H₂O?', a: '6.022 × 10²³ (one mole)', done: false },
      ]
    },
    {
      id: 3, title: 'Force Direction Mastery', subject: 'Physics', xp: 150, difficulty: 'Hard',
      steps: 5, completed: 2, dueIn: '4h', color: colors.warningAmber,
      desc: 'Practice free-body diagrams to correctly identify net force direction in multi-force scenarios.',
      exercises: [
        { q: 'Draw a free-body diagram for a book on a table', a: 'Weight down, Normal force up, net = 0', done: true },
        { q: 'If F₁ = 10N right and F₂ = 4N left, what is net force?', a: '6N to the right', done: true },
        { q: 'A 5kg box accelerates at 3 m/s². What is net force?', a: 'F = ma = 5 × 3 = 15N', done: false },
        { q: 'Identify action-reaction pairs when jumping', a: 'Feet push ground down; ground pushes feet up', done: false },
        { q: 'Why does a heavier object not fall faster in vacuum?', a: 'Greater mass means greater inertia, but also greater gravitational force — they cancel', done: false },
      ]
    },
  ];

  const stats = {
    streak: 7,
    mistakesFixed: 23,
    totalScanned: 47,
    xpEarned: 1240,
    accuracy: 68,
    topGap: 'Quadratic Formula',
  };

  // ── HELPERS ───────────────────────────────────────────────────────────────

  const severityColor = (s) => s === 'high' ? colors.errorRed : s === 'medium' ? colors.warningAmber : colors.forest;
  const severityBg = (s) => s === 'high' ? '#FFF0EE' : s === 'medium' ? '#FFF8EE' : '#EEF5F0';

  const intensityColor = (v) => {
    if (v > 0.7) return colors.errorRed;
    if (v > 0.45) return colors.warningAmber;
    return colors.forest;
  };

  const intensityLabel = (v) => v > 0.7 ? 'Critical' : v > 0.45 ? 'Moderate' : 'Minor';

  // ── SCREENS ───────────────────────────────────────────────────────────────

  const renderHome = () => {
    const ScanIcon = window.lucide.ScanLine || window.lucide.Scan;
    const ZapIcon = window.lucide.Zap;
    const TrendingUpIcon = window.lucide.TrendingUp;
    const FlameIcon = window.lucide.Flame;
    const BookOpenIcon = window.lucide.BookOpen;
    const ChevronRightIcon = window.lucide.ChevronRight;
    const AlertCircleIcon = window.lucide.AlertCircle;

    return React.createElement('div', {
      style: { flex: 1, overflowY: 'auto', background: colors.ivory, paddingBottom: 80 }
    },
      // Header
      React.createElement('div', {
        style: { background: colors.terracotta, padding: '52px 20px 24px', borderBottomLeftRadius: 28, borderBottomRightRadius: 28, position: 'relative', overflow: 'hidden' }
      },
        React.createElement('div', {
          style: { position: 'absolute', top: -30, right: -20, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }
        }),
        React.createElement('div', {
          style: { position: 'absolute', top: 20, right: 30, width: 70, height: 70, borderRadius: '50%', background: 'rgba(255,255,255,0.07)' }
        }),
        React.createElement('p', { style: { color: 'rgba(255,255,255,0.75)', fontSize: 13, fontFamily: 'DM Sans', marginBottom: 2 } }, 'Good morning, Alex 👋'),
        React.createElement('h1', { style: { color: '#fff', fontSize: 24, fontWeight: 700, fontFamily: 'DM Sans', marginBottom: 16 } }, 'Your Learning Atlas'),
        // Streak row
        React.createElement('div', { style: { display: 'flex', gap: 10 } },
          [
            { label: 'Day Streak', value: `${stats.streak}🔥`, bg: 'rgba(255,255,255,0.18)' },
            { label: 'Fixed', value: stats.mistakesFixed, bg: 'rgba(255,255,255,0.18)' },
            { label: 'XP', value: `${stats.xpEarned}`, bg: 'rgba(255,255,255,0.18)' },
          ].map((s, i) => React.createElement('div', {
            key: i,
            style: { flex: 1, background: s.bg, borderRadius: 14, padding: '10px 8px', textAlign: 'center', backdropFilter: 'blur(4px)' }
          },
            React.createElement('div', { style: { color: '#fff', fontSize: 18, fontWeight: 700, fontFamily: 'DM Sans' } }, s.value),
            React.createElement('div', { style: { color: 'rgba(255,255,255,0.75)', fontSize: 10, fontFamily: 'DM Sans' } }, s.label)
          ))
        )
      ),

      React.createElement('div', { style: { padding: '20px 16px 0' } },

        // Scan CTA
        React.createElement('div', {
          onClick: () => { handlePress('scan-cta'); setActiveTab('scanner'); },
          style: {
            background: `linear-gradient(135deg, ${colors.forest} 0%, ${colors.forestLight} 100%)`,
            borderRadius: 20, padding: '18px 20px', display: 'flex', alignItems: 'center',
            gap: 14, marginBottom: 20, cursor: 'pointer', transform: btnScale('scan-cta'),
            transition: 'transform 0.15s ease', boxShadow: '0 4px 16px rgba(74,124,89,0.35)'
          }
        },
          React.createElement('div', {
            style: { width: 46, height: 46, background: 'rgba(255,255,255,0.2)', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }
          }, React.createElement(ScanIcon, { size: 22, color: '#fff', strokeWidth: 2 })),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', { style: { color: '#fff', fontWeight: 700, fontSize: 15, fontFamily: 'DM Sans' } }, 'Scan New Homework'),
            React.createElement('div', { style: { color: 'rgba(255,255,255,0.75)', fontSize: 12, fontFamily: 'DM Sans' } }, 'Find hidden misconceptions instantly')
          ),
          React.createElement(ChevronRightIcon, { size: 18, color: 'rgba(255,255,255,0.8)', strokeWidth: 2.5 })
        ),

        // Accuracy bar
        React.createElement('div', {
          style: { background: colors.cardBg, borderRadius: 18, padding: '16px', marginBottom: 20, border: `1px solid ${colors.sand}` }
        },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: 10, alignItems: 'center' } },
            React.createElement('span', { style: { fontFamily: 'DM Sans', fontWeight: 600, fontSize: 13, color: colors.text } }, 'Overall Accuracy'),
            React.createElement('span', { style: { fontFamily: 'DM Sans', fontWeight: 700, fontSize: 18, color: colors.terracotta } }, `${stats.accuracy}%`)
          ),
          React.createElement('div', { style: { height: 8, background: colors.sand, borderRadius: 8, overflow: 'hidden' } },
            React.createElement('div', { style: { height: '100%', width: `${stats.accuracy}%`, background: `linear-gradient(90deg, ${colors.terracotta}, ${colors.warningAmber})`, borderRadius: 8, transition: 'width 0.6s ease' } })
          ),
          React.createElement('div', { style: { marginTop: 8, fontSize: 11, color: colors.textLight, fontFamily: 'DM Sans' } }, `Top gap: ${stats.topGap}`)
        ),

        // Recent mistakes
        React.createElement('div', { style: { marginBottom: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
          React.createElement('h2', { style: { fontSize: 16, fontWeight: 700, fontFamily: 'DM Sans', color: colors.text } }, 'Recent Mistakes'),
          React.createElement('span', { style: { fontSize: 12, color: colors.terracotta, fontFamily: 'DM Sans', fontWeight: 600 } }, 'View All')
        ),

        recentMistakes.map(m => React.createElement('div', {
          key: m.id,
          onClick: () => { handlePress(`m-${m.id}`); setSelectedMistake(m); setActiveTab('atlas'); },
          style: {
            background: colors.cardBg, borderRadius: 16, padding: '14px 14px', marginBottom: 10,
            border: `1px solid ${colors.sand}`, cursor: 'pointer', transform: btnScale(`m-${m.id}`),
            transition: 'transform 0.15s ease', display: 'flex', gap: 12, alignItems: 'flex-start'
          }
        },
          React.createElement('div', {
            style: { width: 40, height: 40, borderRadius: 12, background: severityBg(m.severity), display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }
          }, React.createElement(AlertCircleIcon, { size: 18, color: severityColor(m.severity), strokeWidth: 2 })),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: 3 } },
              React.createElement('span', { style: { fontFamily: 'DM Sans', fontWeight: 600, fontSize: 13, color: colors.text } }, m.topic),
              React.createElement('span', { style: { fontFamily: 'DM Sans', fontSize: 11, color: colors.textLight } }, m.date)
            ),
            React.createElement('div', { style: { fontFamily: 'DM Sans', fontSize: 12, color: colors.textLight, marginBottom: 5, lineHeight: 1.4 } }, m.error),
            React.createElement('div', { style: { display: 'inline-flex', alignItems: 'center', gap: 4, background: severityBg(m.severity), borderRadius: 20, padding: '2px 8px' } },
              React.createElement('div', { style: { width: 6, height: 6, borderRadius: '50%', background: severityColor(m.severity) } }),
              React.createElement('span', { style: { fontSize: 10, color: severityColor(m.severity), fontFamily: 'DM Sans', fontWeight: 600 } }, m.subject)
            )
          )
        ))
      )
    );
  };

  const renderScanner = () => {
    const ScanIcon = window.lucide.ScanLine || window.lucide.Scan;
    const UploadIcon = window.lucide.Upload;
    const CameraIcon = window.lucide.Camera;
    const CheckCircleIcon = window.lucide.CheckCircle;
    const ZapIcon = window.lucide.Zap;
    const XIcon = window.lucide.X;

    const stages = {
      idle: () => React.createElement('div', { style: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 20px', paddingTop: 20 } },
        // Scanner frame
        React.createElement('div', {
          style: { width: '100%', height: 260, background: '#1A1410', borderRadius: 24, position: 'relative', overflow: 'hidden', marginBottom: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }
        },
          React.createElement('div', { style: { position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 29px, rgba(255,255,255,0.04) 29px, rgba(255,255,255,0.04) 30px), repeating-linear-gradient(90deg, transparent, transparent 29px, rgba(255,255,255,0.04) 29px, rgba(255,255,255,0.04) 30px)' } }),
          // Corner brackets
          ...[{top:16,left:16,borderTop:`2px solid ${colors.terracotta}`,borderLeft:`2px solid ${colors.terracotta}`},{top:16,right:16,borderTop:`2px solid ${colors.terracotta}`,borderRight:`2px solid ${colors.terracotta}`},{bottom:16,left:16,borderBottom:`2px solid ${colors.terracotta}`,borderLeft:`2px solid ${colors.terracotta}`},{bottom:16,right:16,borderBottom:`2px solid ${colors.terracotta}`,borderRight:`2px solid ${colors.terracotta}`}].map((s, i) => React.createElement('div', { key: i, style: { position: 'absolute', width: 28, height: 28, borderRadius: 4, ...s } })),
          React.createElement('div', { style: { textAlign: 'center' } },
            React.createElement(CameraIcon, { size: 36, color: 'rgba(255,255,255,0.3)', strokeWidth: 1.5 }),
            React.createElement('p', { style: { color: 'rgba(255,255,255,0.4)', fontSize: 13, fontFamily: 'DM Sans', marginTop: 8 } }, 'Point at homework or quiz')
          )
        ),

        // Upload options
        React.createElement('div', { style: { width: '100%', display: 'flex', gap: 12, marginBottom: 24 } },
          [
            { icon: CameraIcon, label: 'Take Photo', sub: 'Use camera', id: 'cam' },
            { icon: UploadIcon, label: 'Upload File', sub: 'Photo or PDF', id: 'upload' },
          ].map(opt => React.createElement('div', {
            key: opt.id,
            onClick: () => { handlePress(opt.id); setScanStage('scanning'); setTimeout(() => setScanStage('analyzing'), 1800); setTimeout(() => setScanStage('done'), 3400); },
            style: {
              flex: 1, background: colors.cardBg, borderRadius: 18, padding: '18px 14px', textAlign: 'center',
              border: `1px solid ${colors.sand}`, cursor: 'pointer', transform: btnScale(opt.id), transition: 'transform 0.15s ease'
            }
          },
            React.createElement('div', { style: { width: 44, height: 44, background: colors.sand, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px' } },
              React.createElement(opt.icon, { size: 20, color: colors.terracotta, strokeWidth: 2 })
            ),
            React.createElement('div', { style: { fontFamily: 'DM Sans', fontWeight: 600, fontSize: 13, color: colors.text } }, opt.label),
            React.createElement('div', { style: { fontFamily: 'DM Sans', fontSize: 11, color: colors.textLight } }, opt.sub)
          ))
        ),

        // Recent scans
        React.createElement('div', { style: { width: '100%' } },
          React.createElement('h3', { style: { fontFamily: 'DM Sans', fontWeight: 700, fontSize: 15, color: colors.text, marginBottom: 12 } }, 'Recent Scans'),
          ['Algebra Quiz — Ch.4', 'Chemistry Homework — Moles', 'Physics Test — Forces'].map((scan, i) => React.createElement('div', {
            key: i,
            style: { background: colors.cardBg, borderRadius: 14, padding: '12px 14px', marginBottom: 8, border: `1px solid ${colors.sand}`, display: 'flex', alignItems: 'center', gap: 12 }
          },
            React.createElement('div', { style: { width: 36, height: 36, background: colors.sand, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
              React.createElement(ScanIcon, { size: 16, color: colors.terracotta, strokeWidth: 2 })
            ),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', { style: { fontFamily: 'DM Sans', fontWeight: 600, fontSize: 13, color: colors.text } }, scan),
              React.createElement('div', { style: { fontFamily: 'DM Sans', fontSize: 11, color: colors.textLight } }, `${i+1} day${i > 0 ? 's' : ''} ago · ${3-i} errors found`)
            ),
            React.createElement(CheckCircleIcon, { size: 16, color: colors.forest, strokeWidth: 2 })
          ))
        )
      ),

      scanning: () => React.createElement('div', { style: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24 } },
        React.createElement('div', { style: { width: 200, height: 260, background: '#1A1410', borderRadius: 20, position: 'relative', overflow: 'hidden', marginBottom: 32 } },
          React.createElement('div', { style: { position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 0%, rgba(198,123,92,0.15) 50%, transparent 100%)', animation: 'scanline 1.5s ease-in-out infinite' } }),
          React.createElement('style', null, '@keyframes scanline { 0%,100%{transform:translateY(-100%)} 50%{transform:translateY(100%)} }'),
          React.createElement('div', { style: { position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', textAlign: 'center' } },
            React.createElement('div', { style: { fontFamily: 'DM Sans', fontSize: 11, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 } },
              ['x² - 5x + 6 = 0', 'x = -5 ± √25-24', '       2', 'x = -5 ± 1'].map((l, i) => React.createElement('div', { key: i }, l))
            )
          )
        ),
        React.createElement('div', { style: { fontFamily: 'DM Sans', fontWeight: 700, fontSize: 18, color: colors.text, marginBottom: 8 } }, 'Scanning document...'),
        React.createElement('div', { style: { fontFamily: 'DM Sans', fontSize: 13, color: colors.textLight } }, 'Identifying problems and answers')
      ),

      analyzing: () => React.createElement('div', { style: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24 } },
        React.createElement('div', { style: { width: 80, height: 80, borderRadius: '50%', background: colors.sand, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 } },
          React.createElement(ZapIcon, { size: 36, color: colors.terracotta, strokeWidth: 2 })
        ),
        React.createElement('div', { style: { fontFamily: 'DM Sans', fontWeight: 700, fontSize: 18, color: colors.text, marginBottom: 8 } }, 'Analyzing errors...'),
        React.createElement('div', { style: { fontFamily: 'DM Sans', fontSize: 13, color: colors.textLight, textAlign: 'center', lineHeight: 1.6, marginBottom: 24 } }, 'AI is mapping misconceptions\nto prerequisite gaps'),
        ['Detecting error type...', 'Tracing root concepts...', 'Building remediation path...'].map((step, i) => React.createElement('div', {
          key: i,
          style: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }
        },
          React.createElement('div', { style: { width: 20, height: 20, borderRadius: '50%', background: colors.forest, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
            React.createElement(CheckCircleIcon, { size: 12, color: '#fff', strokeWidth: 2.5 })
          ),
          React.createElement('span', { style: { fontFamily: 'DM Sans', fontSize: 13, color: colors.text } }, step)
        ))
      ),

      done: () => React.createElement('div', { style: { flex: 1, overflowY: 'auto', padding: 20, paddingBottom: 80 } },
        React.createElement('div', { style: { background: `linear-gradient(135deg, ${colors.forest}, ${colors.forestLight})`, borderRadius: 20, padding: 20, marginBottom: 20, textAlign: 'center' } },
          React.createElement('div', { style: { fontFamily: 'DM Sans', fontWeight: 700, fontSize: 20, color: '#fff', marginBottom: 4 } }, '3 Errors Found'),
          React.createElement('div', { style: { fontFamily: 'DM Sans', fontSize: 13, color: 'rgba(255,255,255,0.8)' } }, 'Algebra Quiz · Chapter 4'),
          React.createElement('div', { style: { display: 'flex', justifyContent: 'center', gap: 16, marginTop: 16 } },
            [{ v: '2', l: 'Critical' }, { v: '1', l: 'Moderate' }, { v: '4', l: 'Concepts\nMapped' }].map((s, i) => React.createElement('div', { key: i, style: { textAlign: 'center' } },
              React.createElement('div', { style: { color: '#fff', fontWeight: 700, fontSize: 22, fontFamily: 'DM Sans' } }, s.v),
              React.createElement('div', { style: { color: 'rgba(255,255,255,0.75)', fontSize: 10, fontFamily: 'DM Sans', whiteSpace: 'pre-line' } }, s.l)
            ))
          )
        ),
        React.createElement('h3', { style: { fontFamily: 'DM Sans', fontWeight: 700, fontSize: 15, color: colors.text, marginBottom: 12 } }, 'Identified Mistakes'),
        [
          { q: 'Q3: Solve x² - 5x + 6 = 0', error: 'Used -b instead of b in numerator', concept: 'Quadratic formula sign convention', severity: 'high' },
          { q: 'Q5: Factor 2x² + 7x + 3', error: 'Incorrect grouping after AC method', concept: 'Factoring by grouping', severity: 'high' },
          { q: 'Q8: Find discriminant of x² + 4x + 5', error: 'Forgot to square b (used 4 instead of 16)', concept: 'Discriminant calculation b² - 4ac', severity: 'medium' },
        ].map((e, i) => React.createElement('div', { key: i, style: { background: colors.cardBg, borderRadius: 16, padding: 16, marginBottom: 12, border: `1px solid ${colors.sand}` } },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: 8, alignItems: 'flex-start' } },
            React.createElement('span', { style: { fontFamily: 'DM Sans', fontWeight: 600, fontSize: 13, color: colors.text, flex: 1 } }, e.q),
            React.createElement('span', { style: { fontSize: 10, fontFamily: 'DM Sans', color: severityColor(e.severity), background: severityBg(e.severity), padding: '2px 8px', borderRadius: 20, fontWeight: 600, flexShrink: 0, marginLeft: 8 } }, e.severity === 'high' ? 'Critical' : 'Moderate')
          ),
          React.createElement('div', { style: { fontFamily: 'DM Sans', fontSize: 12, color: colors.errorRed, marginBottom: 6 } }, `✗ ${e.error}`),
          React.createElement('div', { style: { fontFamily: 'DM Sans', fontSize: 12, color: colors.forest, background: '#EEF5F0', padding: '6px 10px', borderRadius: 8 } }, `Gap: ${e.concept}`)
        )),
        React.createElement('div', {
          onClick: () => { handlePress('view-atlas'); setScanStage('idle'); setActiveTab('atlas'); },
          style: { background: colors.terracotta, borderRadius: 16, padding: '14px', textAlign: 'center', cursor: 'pointer', transform: btnScale('view-atlas'), transition: 'transform 0.15s ease', marginTop: 8 }
        },
          React.createElement('span', { style: { fontFamily: 'DM Sans', fontWeight: 700, fontSize: 15, color: '#fff' } }, 'View Full Atlas Map →')
        )
      ),
    };

    return React.createElement('div', {
      style: { flex: 1, display: 'flex', flexDirection: 'column', background: colors.ivory, paddingBottom: 80 }
    },
      // Header
      React.createElement('div', { style: { background: colors.ivory, padding: '52px 20px 14px', borderBottom: `1px solid ${colors.sand}` } },
        React.createElement('h2', { style: { fontFamily: 'DM Sans', fontWeight: 700, fontSize: 22, color: colors.text } }, 'Error Scanner'),
        React.createElement('p', { style: { fontFamily: 'DM Sans', fontSize: 13, color: colors.textLight } }, 'Scan homework, quizzes, or practice problems')
      ),
      (stages[scanStage] || stages.idle)()
    );
  };

  const renderAtlas = () => {
    const MapIcon = window.lucide.Map;
    const InfoIcon = window.lucide.Info;
    const ArrowRightIcon = window.lucide.ArrowRight;
    const LayersIcon = window.lucide.Layers;
    const CircleIcon = window.lucide.Circle;
    const ChevronDownIcon = window.lucide.ChevronDown;

    const [activeSubject, setActiveSubject] = useState('All');
    const subjects = ['All', 'Algebra', 'Chemistry', 'Physics'];

    const filtered = activeSubject === 'All' ? heatmapConcepts : heatmapConcepts.filter(c => c.subject === activeSubject);

    const selectedConcept = selectedMistake
      ? heatmapConcepts.find(c => c.subject === selectedMistake.subject) || null
      : null;

    return React.createElement('div', {
      style: { flex: 1, overflowY: 'auto', background: colors.ivory, paddingBottom: 80 }
    },
      // Header
      React.createElement('div', { style: { background: colors.ivory, padding: '52px 20px 14px' } },
        React.createElement('h2', { style: { fontFamily: 'DM Sans', fontWeight: 700, fontSize: 22, color: colors.text, marginBottom: 2 } }, 'Mistake Atlas'),
        React.createElement('p', { style: { fontFamily: 'DM Sans', fontSize: 13, color: colors.textLight } }, 'Your misconception heatmap & gap tracker')
      ),

      React.createElement('div', { style: { padding: '0 16px' } },

        // Subject filter
        React.createElement('div', { style: { display: 'flex', gap: 8, marginBottom: 18, overflowX: 'auto', paddingBottom: 4 } },
          subjects.map(s => React.createElement('div', {
            key: s,
            onClick: () => setActiveSubject(s),
            style: {
              padding: '7px 16px', borderRadius: 20, cursor: 'pointer', flexShrink: 0,
              background: activeSubject === s ? colors.terracotta : colors.sand,
              color: activeSubject === s ? '#fff' : colors.text,
              fontFamily: 'DM Sans', fontSize: 12, fontWeight: 600,
              transition: 'all 0.2s ease'
            }
          }, s))
        ),

        // Heatmap canvas
        React.createElement('div', {
          style: { background: '#1F1A16', borderRadius: 22, padding: 16, marginBottom: 20, height: 240, position: 'relative', overflow: 'hidden' }
        },
          React.createElement('div', { style: { position: 'absolute', top: 10, left: 14, fontFamily: 'DM Sans', fontSize: 11, color: 'rgba(255,255,255,0.4)', fontWeight: 600 } }, 'CONCEPT MAP'),
          // Draw connection lines (simplified)
          React.createElement('svg', { style: { position: 'absolute', inset: 0, width: '100%', height: '100%' }, viewBox: '0 0 100 100', preserveAspectRatio: 'none' },
            filtered.map(c => c.linked.map(lid => {
              const target = filtered.find(t => t.id === lid);
              if (!target) return null;
              return React.createElement('line', { key: `${c.id}-${lid}`, x1: `${c.x}%`, y1: `${c.y}%`, x2: `${target.x}%`, y2: `${target.y}%`, stroke: 'rgba(255,255,255,0.1)', strokeWidth: 0.5 });
            }))
          ),
          // Concept nodes
          filtered.map(c => React.createElement('div', {
            key: c.id,
            style: {
              position: 'absolute', left: `${c.x}%`, top: `${c.y}%`, transform: 'translate(-50%, -50%)',
              textAlign: 'center', cursor: 'pointer'
            }
          },
            React.createElement('div', {
              style: {
                width: Math.max(28, c.intensity * 44), height: Math.max(28, c.intensity * 44),
                borderRadius: '50%', background: intensityColor(c.intensity),
                opacity: 0.7 + c.intensity * 0.3, margin: '0 auto 4px',
                boxShadow: `0 0 ${c.intensity * 16}px ${intensityColor(c.intensity)}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.3s ease'
              }
            }),
            React.createElement('div', {
              style: { fontFamily: 'DM Sans', fontSize: 9, color: 'rgba(255,255,255,0.85)', fontWeight: 600, maxWidth: 60, lineHeight: 1.2 }
            }, c.name)
          ))
        ),

        // Legend
        React.createElement('div', { style: { display: 'flex', gap: 16, marginBottom: 20, justifyContent: 'center' } },
          [{ c: colors.errorRed, l: 'Critical' }, { c: colors.warningAmber, l: 'Moderate' }, { c: colors.forest, l: 'Minor' }].map((item, i) => React.createElement('div', { key: i, style: { display: 'flex', alignItems: 'center', gap: 5 } },
            React.createElement('div', { style: { width: 10, height: 10, borderRadius: '50%', background: item.c } }),
            React.createElement('span', { style: { fontFamily: 'DM Sans', fontSize: 11, color: colors.textLight } }, item.l)
          ))
        ),

        // Gap list
        React.createElement('h3', { style: { fontFamily: 'DM Sans', fontWeight: 700, fontSize: 15, color: colors.text, marginBottom: 12 } }, 'Prerequisite Gaps'),

        filtered.sort((a, b) => b.intensity - a.intensity).map(c => React.createElement('div', {
          key: c.id,
          style: { background: colors.cardBg, borderRadius: 16, padding: '14px', marginBottom: 10, border: `1px solid ${colors.sand}` }
        },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 } },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10 } },
              React.createElement('div', { style: { width: 12, height: 12, borderRadius: '50%', background: intensityColor(c.intensity), flexShrink: 0 } }),
              React.createElement('span', { style: { fontFamily: 'DM Sans', fontWeight: 600, fontSize: 13, color: colors.text } }, c.name)
            ),
            React.createElement('span', { style: { fontFamily: 'DM Sans', fontSize: 11, color: intensityColor(c.intensity), fontWeight: 600, background: c.intensity > 0.7 ? '#FFF0EE' : c.intensity > 0.45 ? '#FFF8EE' : '#EEF5F0', padding: '2px 8px', borderRadius: 20 } }, intensityLabel(c.intensity))
          ),
          React.createElement('div', { style: { height: 5, background: colors.sand, borderRadius: 5, overflow: 'hidden' } },
            React.createElement('div', { style: { height: '100%', width: `${c.intensity * 100}%`, background: intensityColor(c.intensity), borderRadius: 5 } })
          ),
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginTop: 6 } },
            React.createElement('span', { style: { fontFamily: 'DM Sans', fontSize: 11, color: colors.textLight } }, c.subject),
            React.createElement('span', { style: { fontFamily: 'DM Sans', fontSize: 11, color: colors.terracotta, fontWeight: 600 } }, `${Math.round(c.intensity * 100)}% gap`)
          )
        ))
      )
    );
  };

  const renderQuests = () => {
    const ZapIcon = window.lucide.Zap;
    const CheckCircleIcon = window.lucide.CheckCircle;
    const CircleIcon = window.lucide.Circle;
    const ClockIcon = window.lucide.Clock;
    const StarIcon = window.lucide.Star;
    const ChevronRightIcon = window.lucide.ChevronRight;
    const ArrowLeftIcon = window.lucide.ArrowLeft;

    if (questActive !== null) {
      const q = quests.find(x => x.id === questActive);
      if (!q) return null;
      const [currentStep, setCurrentStep] = useState(q.completed);
      const [showAnswer, setShowAnswer] = useState(false);

      return React.createElement('div', {
        style: { flex: 1, overflowY: 'auto', background: colors.ivory, paddingBottom: 80 }
      },
        // Header
        React.createElement('div', {
          style: { background: q.color, padding: '52px 20px 20px' }
        },
          React.createElement('div', {
            onClick: () => setQuestActive(null),
            style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12, cursor: 'pointer' }
          },
            React.createElement(ArrowLeftIcon, { size: 18, color: 'rgba(255,255,255,0.8)', strokeWidth: 2 }),
            React.createElement('span', { style: { fontFamily: 'DM Sans', fontSize: 13, color: 'rgba(255,255,255,0.8)' } }, 'Back to Quests')
          ),
          React.createElement('h2', { style: { fontFamily: 'DM Sans', fontWeight: 700, fontSize: 20, color: '#fff', marginBottom: 4 } }, q.title),
          React.createElement('p', { style: { fontFamily: 'DM Sans', fontSize: 12, color: 'rgba(255,255,255,0.75)', lineHeight: 1.5 } }, q.desc),
          // Progress
          React.createElement('div', { style: { marginTop: 14 } },
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: 6 } },
              React.createElement('span', { style: { fontFamily: 'DM Sans', fontSize: 12, color: 'rgba(255,255,255,0.75)' } }, `${currentStep}/${q.steps} complete`),
              React.createElement('span', { style: { fontFamily: 'DM Sans', fontSize: 12, color: 'rgba(255,255,255,0.9)', fontWeight: 600 } }, `+${q.xp} XP`)
            ),
            React.createElement('div', { style: { height: 6, background: 'rgba(255,255,255,0.2)', borderRadius: 6, overflow: 'hidden' } },
              React.createElement('div', { style: { height: '100%', width: `${(currentStep / q.steps) * 100}%`, background: 'rgba(255,255,255,0.9)', borderRadius: 6, transition: 'width 0.4s ease' } })
            )
          )
        ),

        React.createElement('div', { style: { padding: '20px 16px' } },
          q.exercises.map((ex, i) => {
            const isActive = i === currentStep;
            const isDone = i < currentStep;
            return React.createElement('div', {
              key: i,
              style: {
                background: colors.cardBg, borderRadius: 18, padding: '16px', marginBottom: 12,
                border: `1px solid ${isActive ? q.color : colors.sand}`,
                opacity: i > currentStep ? 0.5 : 1, transition: 'all 0.3s ease'
              }
            },
              React.createElement('div', { style: { display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 10 } },
                isDone
                  ? React.createElement(CheckCircleIcon, { size: 20, color: colors.forest, strokeWidth: 2 })
                  : React.createElement('div', { style: { width: 20, height: 20, borderRadius: '50%', border: `2px solid ${isActive ? q.color : colors.sandDark}`, flexShrink: 0, marginTop: 2 } }),
                React.createElement('span', { style: { fontFamily: 'DM Sans', fontWeight: 600, fontSize: 13, color: colors.text, lineHeight: 1.5 } }, ex.q)
              ),
              isDone && React.createElement('div', {
                style: { background: '#EEF5F0', borderRadius: 10, padding: '10px 12px', marginLeft: 30 }
              },
                React.createElement('div', { style: { fontFamily: 'DM Sans', fontSize: 12, color: colors.forest } }, `✓ ${ex.a}`)
              ),
              isActive && React.createElement('div', { style: { marginLeft: 30 } },
                showAnswer
                  ? React.createElement('div', null,
                    React.createElement('div', { style: { background: '#EEF5F0', borderRadius: 10, padding: '10px 12px', marginBottom: 10 } },
                      React.createElement('div', { style: { fontFamily: 'DM Sans', fontSize: 12, color: colors.forest } }, `Answer: ${ex.a}`)
                    ),
                    React.createElement('div', {
                      onClick: () => { setCurrentStep(currentStep + 1); setShowAnswer(false); },
                      style: { background: q.color, borderRadius: 12, padding: '10px', textAlign: 'center', cursor: 'pointer' }
                    },
                      React.createElement('span', { style: { fontFamily: 'DM Sans', fontWeight: 700, fontSize: 13, color: '#fff' } }, currentStep + 1 >= q.steps ? 'Complete Quest! 🎉' : 'Got it! Next →')
                    )
                  )
                  : React.createElement('div', {
                    onClick: () => setShowAnswer(true),
                    style: { border: `1px solid ${q.color}`, borderRadius: 12, padding: '10px', textAlign: 'center', cursor: 'pointer' }
                  },
                    React.createElement('span', { style: { fontFamily: 'DM Sans', fontWeight: 600, fontSize: 13, color: q.color } }, 'Show Answer')
                  )
              )
            );
          })
        )
      );
    }

    return React.createElement('div', {
      style: { flex: 1, overflowY: 'auto', background: colors.ivory, paddingBottom: 80 }
    },
      React.createElement('div', { style: { background: colors.ivory, padding: '52px 20px 14px' } },
        React.createElement('h2', { style: { fontFamily: 'DM Sans', fontWeight: 700, fontSize: 22, color: colors.text, marginBottom: 2 } }, 'Remediation Quests'),
        React.createElement('p', { style: { fontFamily: 'DM Sans', fontSize: 13, color: colors.textLight } }, 'Fix root gaps before they spread')
      ),

      React.createElement('div', { style: { padding: '0 16px' } },
        // Daily XP bar
        React.createElement('div', {
          style: { background: `linear-gradient(135deg, ${colors.terracotta}, ${colors.terracottaLight})`, borderRadius: 18, padding: '14px 16px', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12 }
        },
          React.createElement(ZapIcon, { size: 22, color: '#fff', strokeWidth: 2 }),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', { style: { fontFamily: 'DM Sans', fontWeight: 700, fontSize: 14, color: '#fff' } }, 'Daily XP Goal'),
            React.createElement('div', { style: { height: 5, background: 'rgba(255,255,255,0.3)', borderRadius: 5, marginTop: 5 } },
              React.createElement('div', { style: { height: '100%', width: '65%', background: '#fff', borderRadius: 5 } })
            )
          ),
          React.createElement('span', { style: { fontFamily: 'DM Sans', fontWeight: 700, fontSize: 15, color: '#fff' } }, '65/100')
        ),

        quests.map(q => {
          const progressPct = (q.completed / q.steps) * 100;
          return React.createElement('div', {
            key: q.id,
            onClick: () => { handlePress(`q-${q.id}`); setQuestActive(q.id); },
            style: {
              background: colors.cardBg, borderRadius: 20, marginBottom: 14,
              border: `1px solid ${colors.sand}`, overflow: 'hidden', cursor: 'pointer',
              transform: btnScale(`q-${q.id}`), transition: 'transform 0.15s ease'
            }
          },
            // Color header band
            React.createElement('div', {
              style: { height: 5, background: `linear-gradient(90deg, ${q.color}, ${q.color}66)` }
            }),
            React.createElement('div', { style: { padding: '14px 16px' } },
              React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 } },
                React.createElement('div', { style: { flex: 1 } },
                  React.createElement('div', { style: { fontFamily: 'DM Sans', fontWeight: 700, fontSize: 14, color: colors.text, marginBottom: 2 } }, q.title),
                  React.createElement('div', { style: { fontFamily: 'DM Sans', fontSize: 12, color: colors.textLight } }, q.subject)
                ),
                React.createElement('div', { style: { textAlign: 'right' } },
                  React.createElement('div', { style: { fontFamily: 'DM Sans', fontWeight: 700, fontSize: 14, color: q.color } }, `+${q.xp} XP`),
                  React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4, justifyContent: 'flex-end', marginTop: 2 } },
                    React.createElement(ClockIcon, { size: 11, color: colors.textLight, strokeWidth: 2 }),
                    React.createElement('span', { style: { fontFamily: 'DM Sans', fontSize: 11, color: colors.textLight } }, q.dueIn)
                  )
                )
              ),
              React.createElement('div', { style: { height: 5, background: colors.sand, borderRadius: 5, overflow: 'hidden', marginBottom: 8 } },
                React.createElement('div', { style: { height: '100%', width: `${progressPct}%`, background: q.color, borderRadius: 5, transition: 'width 0.4s ease' } })
              ),
              React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
                React.createElement('span', { style: { fontFamily: 'DM Sans', fontSize: 12, color: colors.textLight } }, `${q.completed}/${q.steps} steps · ${q.difficulty}`),
                React.createElement('div', {
                  style: { background: q.color, borderRadius: 20, padding: '5px 12px', display: 'flex', alignItems: 'center', gap: 5 }
                },
                  React.createElement('span', { style: { fontFamily: 'DM Sans', fontWeight: 600, fontSize: 12, color: '#fff' } }, q.completed > 0 ? 'Continue' : 'Start'),
                  React.createElement(ChevronRightIcon, { size: 13, color: '#fff', strokeWidth: 2.5 })
                )
              )
            )
          );
        })
      )
    );
  };

  const renderProfile = () => {
    const UserIcon = window.lucide.User;
    const TrophyIcon = window.lucide.Trophy;
    const BookOpenIcon = window.lucide.BookOpen;
    const TrendingUpIcon = window.lucide.TrendingUp;
    const SettingsIcon = window.lucide.Settings;
    const BellIcon = window.lucide.Bell;
    const StarIcon = window.lucide.Star;
    const FlameIcon = window.lucide.Flame;
    const CheckCircleIcon = window.lucide.CheckCircle;

    const achievements = [
      { icon: FlameIcon, label: '7-Day Streak', color: colors.errorRed, earned: true },
      { icon: BookOpenIcon, label: 'First Scan', color: colors.forest, earned: true },
      { icon: TrophyIcon, label: '5 Quests Done', color: colors.warningAmber, earned: true },
      { icon: StarIcon, label: '100 XP Earned', color: colors.terracotta, earned: true },
      { icon: TrendingUpIcon, label: '80% Accuracy', color: colors.forestLight, earned: false },
      { icon: CheckCircleIcon, label: 'Zero Gaps', color: colors.sandDark, earned: false },
    ];

    const subjectBreakdown = [
      { subject: 'Algebra', mistakes: 8, fixed: 5, color: colors.terracotta },
      { subject: 'Chemistry', mistakes: 5, fixed: 4, color: colors.forest },
      { subject: 'Physics', mistakes: 7, fixed: 3, color: colors.warningAmber },
      { subject: 'Geometry', mistakes: 3, fixed: 2, color: colors.forestLight },
    ];

    return React.createElement('div', {
      style: { flex: 1, overflowY: 'auto', background: colors.ivory, paddingBottom: 80 }
    },
      // Profile header
      React.createElement('div', {
        style: { background: `linear-gradient(160deg, ${colors.terracotta} 0%, #A5634A 100%)`, padding: '52px 20px 28px', textAlign: 'center', position: 'relative' }
      },
        React.createElement('div', {
          style: { position: 'absolute', top: 54, right: 20, width: 36, height: 36, background: 'rgba(255,255,255,0.15)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }
        }, React.createElement(SettingsIcon, { size: 18, color: '#fff', strokeWidth: 2 })),
        React.createElement('div', {
          style: { width: 80, height: 80, borderRadius: '50%', background: colors.sand, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', fontSize: 32, border: '3px solid rgba(255,255,255,0.4)' }
        }, '🧑‍🎓'),
        React.createElement('h2', { style: { fontFamily: 'DM Sans', fontWeight: 700, fontSize: 20, color: '#fff', marginBottom: 2 } }, 'Alex Rivera'),
        React.createElement('p', { style: { fontFamily: 'DM Sans', fontSize: 13, color: 'rgba(255,255,255,0.75)' } }, 'Grade 10 · Washington High'),
        React.createElement('div', { style: { display: 'flex', justifyContent: 'center', gap: 20, marginTop: 18 } },
          [
            { v: stats.streak + '🔥', l: 'Streak' },
            { v: stats.mistakesFixed, l: 'Fixed' },
            { v: stats.xpEarned, l: 'Total XP' },
          ].map((s, i) => React.createElement('div', { key: i, style: { textAlign: 'center' } },
            React.createElement('div', { style: { fontFamily: 'DM Sans', fontWeight: 700, fontSize: 20, color: '#fff' } }, s.v),
            React.createElement('div', { style: { fontFamily: 'DM Sans', fontSize: 11, color: 'rgba(255,255,255,0.7)' } }, s.l)
          ))
        )
      ),

      React.createElement('div', { style: { padding: '20px 16px' } },

        // Subject breakdown
        React.createElement('h3', { style: { fontFamily: 'DM Sans', fontWeight: 700, fontSize: 15, color: colors.text, marginBottom: 12 } }, 'Subject Progress'),
        subjectBreakdown.map((s, i) => React.createElement('div', {
          key: i,
          style: { background: colors.cardBg, borderRadius: 14, padding: '12px 14px', marginBottom: 8, border: `1px solid ${colors.sand}` }
        },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: 6, alignItems: 'center' } },
            React.createElement('span', { style: { fontFamily: 'DM Sans', fontWeight: 600, fontSize: 13, color: colors.text } }, s.subject),
            React.createElement('span', { style: { fontFamily: 'DM Sans', fontSize: 12, color: colors.textLight } }, `${s.fixed}/${s.mistakes} fixed`)
          ),
          React.createElement('div', { style: { height: 6, background: colors.sand, borderRadius: 6, overflow: 'hidden' } },
            React.createElement('div', { style: { height: '100%', width: `${(s.fixed / s.mistakes) * 100}%`, background: s.color, borderRadius: 6 } })
          )
        )),

        // Achievements
        React.createElement('h3', { style: { fontFamily: 'DM Sans', fontWeight: 700, fontSize: 15, color: colors.text, margin: '20px 0 12px' } }, 'Achievements'),
        React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 } },
          achievements.map((a, i) => React.createElement('div', {
            key: i,
            style: {
              background: a.earned ? colors.cardBg : '#F5F0E8',
              borderRadius: 16, padding: '14px 8px', textAlign: 'center',
              border: `1px solid ${a.earned ? colors.sand : colors.sand}`,
              opacity: a.earned ? 1 : 0.5
            }
          },
            React.createElement('div', {
              style: { width: 42, height: 42, borderRadius: '50%', background: a.earned ? a.color + '22' : colors.sand, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px' }
            }, React.createElement(a.icon, { size: 20, color: a.earned ? a.color : colors.sandDark, strokeWidth: 2 })),
            React.createElement('div', { style: { fontFamily: 'DM Sans', fontSize: 10, fontWeight: 600, color: a.earned ? colors.text : colors.textLight, lineHeight: 1.3 } }, a.label)
          ))
        ),

        // Settings rows
        React.createElement('div', { style: { marginTop: 24 } },
          [
            { icon: BellIcon, label: 'Notifications', sub: 'Reminders for quests & streaks' },
            { icon: BookOpenIcon, label: 'Subjects', sub: 'Manage your enrolled subjects' },
            { icon: TrendingUpIcon, label: 'Progress Report', sub: 'Weekly insights & analytics' },
          ].map((row, i) => React.createElement('div', {
            key: i,
            style: { background: colors.cardBg, borderRadius: 14, padding: '14px', marginBottom: 8, border: `1px solid ${colors.sand}`, display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }
          },
            React.createElement('div', { style: { width: 38, height: 38, background: colors.sand, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
              React.createElement(row.icon, { size: 18, color: colors.terracotta, strokeWidth: 2 })
            ),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', { style: { fontFamily: 'DM Sans', fontWeight: 600, fontSize: 13, color: colors.text } }, row.label),
              React.createElement('div', { style: { fontFamily: 'DM Sans', fontSize: 11, color: colors.textLight } }, row.sub)
            ),
            React.createElement('div', { style: { width: 6, height: 6, border: `2px solid ${colors.sandDark}`, borderLeft: 'none', borderBottom: 'none', transform: 'rotate(45deg)', marginRight: 4 } })
          ))
        )
      )
    );
  };

  // ── NAVIGATION ────────────────────────────────────────────────────────────

  const navItems = [
    { id: 'home', label: 'Home', icon: window.lucide.Home },
    { id: 'scanner', label: 'Scan', icon: window.lucide.ScanLine || window.lucide.Scan },
    { id: 'atlas', label: 'Atlas', icon: window.lucide.Map },
    { id: 'quests', label: 'Quests', icon: window.lucide.Zap },
    { id: 'profile', label: 'Profile', icon: window.lucide.User },
  ];

  const screenMap = { home: renderHome, scanner: renderScanner, atlas: renderAtlas, quests: renderQuests, profile: renderProfile };
  const currentScreen = (screenMap[activeTab] || renderHome)();

  // ── STATUS BAR ────────────────────────────────────────────────────────────

  const StatusBar = () => React.createElement('div', {
    style: { height: 44, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '0 18px 6px', background: 'transparent', position: 'absolute', top: 0, left: 0, right: 0, zIndex: 100 }
  },
    React.createElement('span', { style: { fontFamily: 'DM Sans', fontWeight: 700, fontSize: 14, color: activeTab === 'scanner' ? colors.ivory : colors.text } }, '9:41'),
    React.createElement('div', { style: { width: 120, height: 32, background: '#111', borderRadius: 20, position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)' } }),
    React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 5 } },
      React.createElement('svg', { width: 16, height: 11, viewBox: '0 0 16 11' },
        [1, 2, 3, 4].map((b, i) => React.createElement('rect', { key: i, x: i * 4, y: 11 - (i + 1) * 2.5, width: 3, height: (i + 1) * 2.5, rx: 0.5, fill: activeTab === 'scanner' ? 'rgba(255,255,255,0.9)' : colors.text, opacity: i < 3 ? 1 : 0.3 }))
      ),
      React.createElement('svg', { width: 16, height: 11, viewBox: '0 0 16 11' },
        React.createElement('path', { d: 'M8 2.5 C10.5 2.5 12.7 3.6 14.2 5.3 L15 4.5 C13.2 2.5 10.7 1.3 8 1.3 C5.3 1.3 2.8 2.5 1 4.5 L1.8 5.3 C3.3 3.6 5.5 2.5 8 2.5Z', fill: activeTab === 'scanner' ? 'rgba(255,255,255,0.9)' : colors.text }),
        React.createElement('path', { d: 'M8 5C9.8 5 11.3 5.8 12.4 7L13.2 6.2C11.8 4.8 9.9 4 8 4C6.1 4 4.2 4.8 2.8 6.2L3.6 7C4.7 5.8 6.2 5 8 5Z', fill: activeTab === 'scanner' ? 'rgba(255,255,255,0.9)' : colors.text }),
        React.createElement('circle', { cx: 8, cy: 9, r: 1.5, fill: activeTab === 'scanner' ? 'rgba(255,255,255,0.9)' : colors.text })
      ),
      React.createElement('div', {
        style: { width: 24, height: 12, borderRadius: 3, border: `1.5px solid ${activeTab === 'scanner' ? 'rgba(255,255,255,0.9)' : colors.text}`, position: 'relative', display: 'flex', alignItems: 'center', padding: 2 }
      },
        React.createElement('div', { style: { width: '75%', height: '100%', background: colors.forest, borderRadius: 1.5 } }),
        React.createElement('div', { style: { width: 3, height: 5, background: activeTab === 'scanner' ? 'rgba(255,255,255,0.7)' : colors.warmGray, borderRadius: '0 2px 2px 0', position: 'absolute', right: -4.5 } })
      )
    )
  );

  // ── BOTTOM NAV ────────────────────────────────────────────────────────────

  const BottomNav = () => React.createElement('div', {
    style: {
      position: 'absolute', bottom: 0, left: 0, right: 0, height: 72,
      background: 'rgba(255,253,245,0.95)', backdropFilter: 'blur(12px)',
      borderTop: `1px solid ${colors.sand}`, display: 'flex', alignItems: 'center',
      padding: '0 8px 8px', zIndex: 100
    }
  },
    navItems.map(item => {
      const isActive = activeTab === item.id;
      return React.createElement('div', {
        key: item.id,
        onClick: () => { handlePress(`nav-${item.id}`); setActiveTab(item.id); if (item.id !== 'quests') setQuestActive(null); if (item.id !== 'scanner') setScanStage('idle'); },
        style: {
          flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          gap: 4, cursor: 'pointer', transform: btnScale(`nav-${item.id}`), transition: 'transform 0.15s ease',
          padding: '6px 0'
        }
      },
        isActive && item.id !== 'scanner'
          ? React.createElement('div', {
            style: { width: 44, height: 32, background: colors.terracotta + '22', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }
          }, React.createElement(item.icon, { size: 20, color: colors.terracotta, strokeWidth: 2 }))
          : item.id === 'scanner'
            ? React.createElement('div', {
              style: { width: 48, height: 32, background: isActive ? colors.terracotta : `linear-gradient(135deg, ${colors.terracotta}, ${colors.terracottaLight})`, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 10px rgba(198,123,92,0.4)' }
            }, React.createElement(item.icon, { size: 20, color: '#fff', strokeWidth: 2 }))
            : React.createElement(item.icon, { size: 20, color: colors.warmGray, strokeWidth: 2 }),
        React.createElement('span', {
          style: { fontFamily: 'DM Sans', fontSize: 10, fontWeight: isActive ? 700 : 500, color: isActive ? colors.terracotta : colors.warmGray, transition: 'color 0.2s ease' }
        }, item.label)
      );
    })
  );

  // ── ROOT ──────────────────────────────────────────────────────────────────

  return React.createElement('div', {
    style: { minHeight: '100vh', background: '#1A1410', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'DM Sans, sans-serif', padding: '20px 0' }
  },
    React.createElement('style', null, fontStyle + `
      * { box-sizing: border-box; margin: 0; padding: 0; -webkit-tap-highlight-color: transparent; }
      ::-webkit-scrollbar { display: none; }
      body { background: #1A1410; }
    `),
    React.createElement('div', {
      style: {
        width: 375, height: 812, background: colors.ivory, borderRadius: 50,
        overflow: 'hidden', position: 'relative', display: 'flex', flexDirection: 'column',
        boxShadow: '0 40px 100px rgba(0,0,0,0.7), 0 0 0 12px #2A2420, 0 0 0 14px #3A3028',
        fontFamily: 'DM Sans, sans-serif'
      }
    },
      React.createElement(StatusBar),
      React.createElement('div', { style: { flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', paddingTop: 44 } },
        currentScreen
      ),
      React.createElement(BottomNav)
    )
  );
}
