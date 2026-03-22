const { useState, useEffect, useRef } = React;

function App() {
  const [theme, setTheme] = useState('light');
  const [activeTab, setActiveTab] = useState('scan');
  const [scanMode, setScanMode] = useState('photo');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [lessonStep, setLessonStep] = useState(0);
  const [quizAnswer, setQuizAnswer] = useState(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [mapFilter, setMapFilter] = useState('all');
  const [selectedConcept, setSelectedConcept] = useState(null);
  const [pastedText, setPastedText] = useState('');
  const [pressed, setPressed] = useState(null);
  const [completedLessons, setCompletedLessons] = useState([4]);

  useEffect(() => {
    const s = document.createElement('style');
    s.textContent = `@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');*{box-sizing:border-box;margin:0;padding:0;-webkit-tap-highlight-color:transparent;}::-webkit-scrollbar{display:none;}textarea,input{outline:none;border:none;background:transparent;font-family:'Space Grotesk',sans-serif;}@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.5}}@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}@keyframes slideUp{from{transform:translateY(20px);opacity:0}to{transform:translateY(0);opacity:1}}`;
    document.head.appendChild(s);
    return () => { try { document.head.removeChild(s); } catch (e) {} };
  }, []);

  const themes = {
    light: {
      page: '#E6E2FF',
      bg: '#F4F2FF',
      surf: '#FFFFFF',
      surfAlt: '#EFECFF',
      pri: '#6366F1',
      priDark: '#4F46E5',
      priGrad: 'linear-gradient(135deg,#6366F1 0%,#8B5CF6 100%)',
      priLight: '#EDE9FE',
      sec: '#8B5CF6',
      txt: '#1E1B4B',
      sub: '#5A5888',
      muted: '#A0A0BE',
      border: '#DDD8F5',
      card: '#FFFFFF',
      shadow: '0 2px 16px rgba(99,102,241,0.10)',
      ok: '#059669', okBg: '#ECFDF5',
      warn: '#D97706', warnBg: '#FFFBEB',
      err: '#DC2626', errBg: '#FFF1F2',
      nav: '#FFFFFF',
      inp: '#EFECFF',
      tag: '#EEF2FF', tagTxt: '#6366F1',
    },
    dark: {
      page: '#030112',
      bg: '#090720',
      surf: '#110E2B',
      surfAlt: '#181440',
      pri: '#818CF8',
      priDark: '#6366F1',
      priGrad: 'linear-gradient(135deg,#818CF8 0%,#A78BFA 100%)',
      priLight: '#29215A',
      sec: '#A78BFA',
      txt: '#EDE9FE',
      sub: '#9E9CC8',
      muted: '#60607A',
      border: '#211C4E',
      card: '#16122E',
      shadow: '0 2px 16px rgba(0,0,0,0.45)',
      ok: '#34D399', okBg: '#022C22',
      warn: '#FCD34D', warnBg: '#180D00',
      err: '#F87171', errBg: '#1A0808',
      nav: '#090720',
      inp: '#181440',
      tag: '#29215A', tagTxt: '#A5B4FC',
    },
  };

  const t = themes[theme];
  const f = "'Space Grotesk', sans-serif";
  const L = window.lucide || {};

  const recentScans = [
    { id: 1, subject: 'Biology', gap: 'Controls vs. Variables', source: 'Lab worksheet photo', time: '2h ago', color: '#10B981', emoji: '🔬' },
    { id: 2, subject: 'Spreadsheets', gap: 'VLOOKUP vs. INDEX-MATCH', source: 'Work email text', time: 'Yesterday', color: '#6366F1', emoji: '📊' },
    { id: 3, subject: 'Algebra', gap: 'Factoring polynomials', source: 'Math homework photo', time: '3d ago', color: '#F59E0B', emoji: '📐' },
  ];

  const mapConcepts = [
    { id: 'me', label: 'You', status: 'center', cx: 50, cy: 50 },
    { id: 'bio', label: 'Biology', status: 'learning', cx: 72, cy: 20, subject: 'science', color: '#10B981' },
    { id: 'expdesign', label: 'Exp. Design', status: 'gap', cx: 86, cy: 35, subject: 'science', color: '#10B981' },
    { id: 'chem', label: 'Chemistry', status: 'strong', cx: 80, cy: 58, subject: 'science', color: '#10B981' },
    { id: 'alg', label: 'Algebra', status: 'strong', cx: 24, cy: 22, subject: 'math', color: '#6366F1' },
    { id: 'func', label: 'Functions', status: 'gap', cx: 10, cy: 38, subject: 'math', color: '#6366F1' },
    { id: 'geo', label: 'Geometry', status: 'learning', cx: 18, cy: 60, subject: 'math', color: '#6366F1' },
    { id: 'xl', label: 'Excel', status: 'learning', cx: 70, cy: 78, subject: 'work', color: '#F59E0B' },
    { id: 'dataviz', label: 'Data Viz', status: 'gap', cx: 84, cy: 86, subject: 'work', color: '#F59E0B' },
    { id: 'ppt', label: 'Slides', status: 'strong', cx: 54, cy: 88, subject: 'work', color: '#F59E0B' },
    { id: 'essay', label: 'Essays', status: 'strong', cx: 28, cy: 78, subject: 'writing', color: '#EC4899' },
    { id: 'cite', label: 'Citations', status: 'learning', cx: 13, cy: 64, subject: 'writing', color: '#EC4899' },
    { id: 'arg', label: 'Arguments', status: 'gap', cx: 22, cy: 88, subject: 'writing', color: '#EC4899' },
  ];

  const lessons = [
    {
      id: 1, title: 'Controls vs. Variables', subject: 'Biology', emoji: '🔬',
      duration: '2 min', difficulty: 'Beginner', color: '#10B981', tags: ['Science', 'Lab'],
      summary: 'Why every experiment needs a baseline—and what happens when you change too much at once.',
      steps: [
        { title: 'The Problem with No Control', body: 'Imagine giving one plant coffee and another water, then claiming coffee makes plants grow faster. How do you know the coffee plant wasn\'t just healthier to begin with?\n\nA control group is your baseline—the "nothing changed" version. Without it, you have no reference point.' },
        { title: 'The Variable Rule', body: 'Your independent variable is the ONE thing you intentionally change.\nYour dependent variable is what you measure.\nEverything else is controlled—kept identical across groups.\n\nChange two things at once, and you can\'t tell which one caused what.' },
        { title: 'Real Lab Example', body: 'Testing: Does light color affect plant height?\n\n• Group A: red light → 14 cm\n• Group B: blue light → 18 cm\n• Group C: white light (control) → 12 cm\n\nYou now know both colors perform differently from the baseline. That\'s meaningful data.' },
      ],
      quiz: { q: 'A student tests 3 fertilizer brands on identical tomato plants. What is the independent variable?', opts: ['Plant height', 'Fertilizer brand', 'Number of tomatoes', 'Amount of water'], ans: 1 },
    },
    {
      id: 2, title: 'VLOOKUP, Simply Put', subject: 'Spreadsheets', emoji: '📊',
      duration: '3 min', difficulty: 'Intermediate', color: '#6366F1', tags: ['Work', 'Excel'],
      summary: 'Pull data from big tables without searching row by row—the skill that saves hours at work.',
      steps: [
        { title: 'What It Does', body: 'VLOOKUP searches the first column of a range for a value, then returns something from the same row in another column.\n\nLike a lookup table at a diner: find "Pancakes" in column A, and column C tells you the price.' },
        { title: 'Breaking Down the Formula', body: '=VLOOKUP(what_to_find, where_to_look, which_column, exact_match?)\n\nExample:\n=VLOOKUP("Alice", A2:D100, 3, FALSE)\n\nFinds "Alice" in column A, returns her value from column C (3rd column). FALSE = exact match.' },
        { title: 'The One Limitation', body: 'VLOOKUP only searches leftward—it can\'t return a value from a column to the LEFT of your search column.\n\nFor that, you\'d use INDEX-MATCH. But for 80% of lookup tasks at work, VLOOKUP is faster to write and just as reliable.' },
      ],
      quiz: { q: '=VLOOKUP("Widget", A1:E50, 4, FALSE) — What does the "4" mean?', opts: ['Search in column 4', 'Return value from column 4', 'Use 4 search terms', 'Match 4 characters'], ans: 1 },
    },
    {
      id: 3, title: 'Factoring Polynomials', subject: 'Algebra', emoji: '📐',
      duration: '4 min', difficulty: 'Intermediate', color: '#F59E0B', tags: ['Math', 'Algebra'],
      summary: 'Break down complex expressions into simpler forms that unlock equation solving.',
      steps: [
        { title: 'Why Factor?', body: 'Factoring rewrites a sum as a product. It\'s the reverse of expanding.\n\nx² + 5x + 6 becomes (x + 2)(x + 3)\n\nThis matters because products are easier to work with. If (x+2)(x+3) = 0, then x = -2 or x = -3. Done.' },
        { title: 'Start With GCF', body: 'Always check for a Greatest Common Factor first.\n\n6x² + 9x — both terms share 3x\n→ 3x(2x + 3)\n\nThis step alone can simplify an expression before you do anything more complex.' },
        { title: 'The Product-Sum Method', body: 'For x² + bx + c, find two numbers that:\n✓ Multiply to c\n✓ Add to b\n\nx² + 7x + 12:\nNeed numbers × to 12 and + to 7\n→ 3 × 4 = 12, 3 + 4 = 7\n→ (x + 3)(x + 4)' },
      ],
      quiz: { q: 'Factor: x² + 9x + 20', opts: ['(x + 4)(x + 5)', '(x + 2)(x + 10)', '(x + 3)(x + 7)', '(x + 1)(x + 20)'], ans: 0 },
    },
    {
      id: 4, title: 'Revenue vs. Retention', subject: 'Business', emoji: '📈',
      duration: '2 min', difficulty: 'Beginner', color: '#EC4899', tags: ['Work', 'Strategy'],
      summary: 'Know the difference between growing your customer base and keeping the one you have.',
      steps: [
        { title: 'Two Ways to Grow', body: 'Revenue growth = more customers paying you.\nRetention = keeping customers from leaving.\n\nBoth drive revenue, but they need different strategies—and mixing them up leads to bad decisions.' },
        { title: 'The Leaky Bucket Problem', body: 'If you acquire 100 new customers but lose 80 old ones, you\'re barely growing.\n\nRetention rate = (End customers - New customers) / Start customers × 100\n\nA 5% improvement in retention can increase profit by 25–95%.' },
        { title: 'Which Metric Matters More?', body: 'Early-stage: revenue growth signals product-market fit.\nGrowth-stage: retention signals sustainability.\n\nFor your next meeting: ask "are we growing because we\'re acquiring or because we\'re retaining?" They require different investments.' },
      ],
      quiz: { q: 'A SaaS company started with 200 customers, gained 50, and ended with 210. What\'s the retention rate?', opts: ['80%', '85%', '90%', '95%'], ans: 1 },
    },
  ];

  const bp = (id) => setPressed(id);
  const rp = () => setTimeout(() => setPressed(null), 150);
  const bStyle = (id, base = {}) => ({
    ...base,
    opacity: pressed === id ? 0.72 : 1,
    transform: pressed === id ? 'scale(0.96)' : 'scale(1)',
    transition: 'all 0.12s ease',
    cursor: 'pointer',
    userSelect: 'none',
  });

  const handleScan = () => {
    setIsProcessing(true);
    setTimeout(() => { setIsProcessing(false); setShowResult(true); }, 2200);
  };

  // ── LESSON DETAIL SCREEN ──────────────────────────────────────────────────
  const lesson = lessons.find(l => l.id === selectedLesson);
  if (lesson) {
    const totalSteps = lesson.steps.length + 1;
    const isQuiz = lessonStep === lesson.steps.length;
    const step = lesson.steps[lessonStep];
    const handleNext = () => {
      if (isQuiz && quizSubmitted) {
        setCompletedLessons(p => [...new Set([...p, lesson.id])]);
        setSelectedLesson(null); setLessonStep(0); setQuizAnswer(null); setQuizSubmitted(false);
        setActiveTab('learn');
      } else if (!isQuiz) {
        setLessonStep(s => s + 1);
      }
    };
    const handleBackLesson = () => {
      if (lessonStep === 0) { setSelectedLesson(null); setLessonStep(0); setQuizAnswer(null); setQuizSubmitted(false); }
      else setLessonStep(s => s - 1);
    };

    return (
      <div style={{ width: 375, height: 812, background: t.bg, fontFamily: f, overflow: 'hidden', position: 'relative', display: 'flex', flexDirection: 'column', borderRadius: 44, boxShadow: '0 40px 100px rgba(0,0,0,0.35)' }}>
        <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 120, height: 34, background: '#000', borderRadius: '0 0 22px 22px', zIndex: 100 }} />
        <div style={{ height: 50, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '0 24px 8px', background: t.bg, flexShrink: 0 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: t.txt }}>9:41</span>
          <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
            <L.Wifi size={14} color={t.muted} /><L.Battery size={14} color={t.muted} />
          </div>
        </div>

        <div style={{ padding: '10px 20px 12px', display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
          <div onMouseDown={() => bp('lb')} onMouseUp={() => { rp(); handleBackLesson(); }} onTouchStart={() => bp('lb')} onTouchEnd={() => { rp(); handleBackLesson(); }} style={bStyle('lb', { width: 36, height: 36, borderRadius: 12, background: t.surf, border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: t.shadow })}>
            <L.ArrowLeft size={18} color={t.txt} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, color: t.muted, fontWeight: 600 }}>{lesson.emoji} {lesson.subject}</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: t.txt }}>{lesson.title}</div>
          </div>
          <div style={{ fontSize: 12, color: t.muted, fontWeight: 600, background: t.surf, border: `1px solid ${t.border}`, padding: '4px 10px', borderRadius: 20 }}>{lessonStep + 1}/{totalSteps}</div>
        </div>

        <div style={{ height: 3, background: t.border, margin: '0 20px 16px', borderRadius: 2, flexShrink: 0 }}>
          <div style={{ height: '100%', width: `${((lessonStep + 1) / totalSteps) * 100}%`, background: lesson.color, borderRadius: 2, transition: 'width 0.4s ease' }} />
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '0 20px' }}>
          {!isQuiz ? (
            <div style={{ animation: 'slideUp 0.3s ease' }}>
              <div style={{ background: t.surf, borderRadius: 20, padding: 20, boxShadow: t.shadow, border: `1px solid ${t.border}`, marginBottom: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                  <div style={{ width: 4, height: 32, background: lesson.color, borderRadius: 2 }} />
                  <div style={{ fontSize: 17, fontWeight: 700, color: t.txt }}>{step.title}</div>
                </div>
                <div style={{ fontSize: 14, color: t.sub, lineHeight: 1.75, whiteSpace: 'pre-line' }}>{step.body}</div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 6 }}>
                {lesson.steps.map((_, i) => (
                  <div key={i} style={{ width: i === lessonStep ? 20 : 6, height: 6, borderRadius: 3, background: i === lessonStep ? lesson.color : t.border, transition: 'all 0.3s ease' }} />
                ))}
                <div style={{ width: 6, height: 6, borderRadius: 3, background: t.border }} />
              </div>
            </div>
          ) : (
            <div style={{ animation: 'slideUp 0.3s ease' }}>
              <div style={{ background: t.surf, borderRadius: 20, padding: 20, boxShadow: t.shadow, border: `1px solid ${t.border}` }}>
                <div style={{ display: 'inline-block', background: lesson.color + '20', borderRadius: 8, padding: '4px 10px', fontSize: 11, fontWeight: 700, color: lesson.color, letterSpacing: 0.5, marginBottom: 12 }}>QUICK CHECK</div>
                <div style={{ fontSize: 15, fontWeight: 600, color: t.txt, lineHeight: 1.55, marginBottom: 16 }}>{lesson.quiz.q}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {lesson.quiz.opts.map((opt, i) => {
                    const isSel = quizAnswer === i;
                    const isCorrect = i === lesson.quiz.ans;
                    let bg = t.inp, border = t.border, col = t.txt;
                    if (quizSubmitted) {
                      if (isCorrect) { bg = t.okBg; border = t.ok; col = t.ok; }
                      else if (isSel) { bg = t.errBg; border = t.err; col = t.err; }
                    } else if (isSel) { bg = t.priLight; border = t.pri; col = t.pri; }
                    return (
                      <div key={i} onMouseDown={() => { if (!quizSubmitted) { bp(`opt${i}`); setQuizAnswer(i); } }} onMouseUp={() => rp()} onTouchStart={() => { if (!quizSubmitted) { bp(`opt${i}`); setQuizAnswer(i); } }} onTouchEnd={() => rp()} style={bStyle(`opt${i}`, { padding: '12px 14px', borderRadius: 14, background: bg, border: `1.5px solid ${border}`, display: 'flex', alignItems: 'center', gap: 10 })}>
                        <div style={{ width: 20, height: 20, borderRadius: '50%', border: `2px solid ${border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          {quizSubmitted && isCorrect && <L.Check size={11} color={t.ok} />}
                          {quizSubmitted && isSel && !isCorrect && <L.X size={11} color={t.err} />}
                        </div>
                        <span style={{ fontSize: 13, fontWeight: 500, color: col }}>{opt}</span>
                      </div>
                    );
                  })}
                </div>
                {quizSubmitted && (
                  <div style={{ marginTop: 14, padding: '10px 14px', borderRadius: 12, background: quizAnswer === lesson.quiz.ans ? t.okBg : t.warnBg }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: quizAnswer === lesson.quiz.ans ? t.ok : t.warn }}>
                      {quizAnswer === lesson.quiz.ans ? '✓ Correct! Well done.' : 'Not quite — the highlighted answer is correct.'}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div style={{ padding: '12px 20px 28px', flexShrink: 0, display: 'flex', gap: 10 }}>
          {isQuiz && !quizSubmitted && (
            <div onMouseDown={() => bp('submit')} onMouseUp={() => { rp(); if (quizAnswer !== null) setQuizSubmitted(true); }} onTouchStart={() => bp('submit')} onTouchEnd={() => { rp(); if (quizAnswer !== null) setQuizSubmitted(true); }} style={bStyle('submit', { flex: 1, padding: 14, borderRadius: 16, background: quizAnswer !== null ? t.priGrad : t.border, textAlign: 'center', fontSize: 15, fontWeight: 700, color: quizAnswer !== null ? '#fff' : t.muted })}>
              Check Answer
            </div>
          )}
          {(!isQuiz || quizSubmitted) && (
            <div onMouseDown={() => bp('next')} onMouseUp={() => { rp(); handleNext(); }} onTouchStart={() => bp('next')} onTouchEnd={() => { rp(); handleNext(); }} style={bStyle('next', { flex: 1, padding: 14, borderRadius: 16, background: t.priGrad, textAlign: 'center', fontSize: 15, fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: '0 4px 16px rgba(99,102,241,0.35)' })}>
              {isQuiz && quizSubmitted ? <><L.Award size={16} color="#fff" /><span>Complete Lesson</span></> : <><span>Next</span><L.ChevronRight size={18} color="#fff" /></>}
            </div>
          )}
        </div>
      </div>
    );
  }

  // ── SCAN SCREEN ───────────────────────────────────────────────────────────
  const renderScan = () => (
    <div style={{ flex: 1, overflowY: 'auto' }}>
      <div style={{ padding: '16px 20px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 22, fontWeight: 700, color: t.txt }}>Scan & Learn</div>
          <div style={{ fontSize: 13, color: t.sub }}>Snap, paste, or speak your confusion</div>
        </div>
        <div style={{ width: 42, height: 42, borderRadius: 14, background: t.priGrad, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 14px rgba(99,102,241,0.35)' }}>
          <L.Zap size={18} color="#fff" />
        </div>
      </div>

      <div style={{ padding: '0 20px 14px', display: 'flex', gap: 8 }}>
        {[{ id: 'photo', Icon: L.Camera, label: 'Photo' }, { id: 'text', Icon: L.FileText, label: 'Paste Text' }, { id: 'voice', Icon: L.Mic, label: 'Voice' }].map(m => (
          <div key={m.id} onMouseDown={() => bp(m.id)} onMouseUp={() => { rp(); setScanMode(m.id); setShowResult(false); setIsProcessing(false); }} onTouchStart={() => bp(m.id)} onTouchEnd={() => { rp(); setScanMode(m.id); setShowResult(false); setIsProcessing(false); }} style={bStyle(m.id, { flex: 1, padding: '10px 6px', borderRadius: 14, background: scanMode === m.id ? t.priGrad : t.surf, border: `1.5px solid ${scanMode === m.id ? 'transparent' : t.border}`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, boxShadow: scanMode === m.id ? '0 4px 14px rgba(99,102,241,0.3)' : t.shadow })}>
            <m.Icon size={16} color={scanMode === m.id ? '#fff' : t.sub} />
            <span style={{ fontSize: 11, fontWeight: 600, color: scanMode === m.id ? '#fff' : t.sub }}>{m.label}</span>
          </div>
        ))}
      </div>

      {!showResult && (
        <div style={{ padding: '0 20px 16px' }}>
          {scanMode === 'photo' && (
            <div style={{ borderRadius: 20, border: `2px dashed ${t.border}`, background: t.surf, minHeight: 185, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24, gap: 14 }}>
              {isProcessing ? (
                <div style={{ textAlign: 'center' }}>
                  <div style={{ width: 56, height: 56, borderRadius: '50%', background: t.priLight, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', animation: 'pulse 1.2s ease infinite' }}>
                    <L.Search size={22} color={t.pri} />
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: t.txt, marginBottom: 4 }}>Analyzing...</div>
                  <div style={{ fontSize: 12, color: t.muted, marginBottom: 14 }}>Identifying your knowledge gap</div>
                  <div style={{ height: 4, background: t.border, borderRadius: 2, width: 140, overflow: 'hidden', margin: '0 auto' }}>
                    <div style={{ height: '100%', width: '70%', background: t.priGrad, borderRadius: 2 }} />
                  </div>
                </div>
              ) : (
                <>
                  <div style={{ width: 64, height: 64, borderRadius: 20, background: t.priLight, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <L.Camera size={28} color={t.pri} />
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: t.txt }}>Upload a photo</div>
                    <div style={{ fontSize: 12, color: t.muted, marginTop: 2 }}>Worksheet, problem set, or any document</div>
                  </div>
                  <div onMouseDown={() => bp('scan-btn')} onMouseUp={() => { rp(); handleScan(); }} onTouchStart={() => bp('scan-btn')} onTouchEnd={() => { rp(); handleScan(); }} style={bStyle('scan-btn', { background: t.priGrad, color: '#fff', padding: '10px 28px', borderRadius: 30, fontSize: 13, fontWeight: 700, boxShadow: '0 4px 14px rgba(99,102,241,0.4)' })}>
                    Scan Document
                  </div>
                </>
              )}
            </div>
          )}
          {scanMode === 'text' && (
            <div>
              <div style={{ borderRadius: 20, background: t.surf, border: `1.5px solid ${t.border}`, padding: 16, boxShadow: t.shadow }}>
                <textarea value={pastedText} onChange={e => setPastedText(e.target.value)} placeholder="Paste homework, a work email, or anything confusing you..." style={{ width: '100%', height: 120, color: t.txt, fontSize: 13, lineHeight: 1.65 }} />
              </div>
              <div onMouseDown={() => bp('text-scan')} onMouseUp={() => { rp(); if (pastedText.trim()) handleScan(); }} onTouchStart={() => bp('text-scan')} onTouchEnd={() => { rp(); if (pastedText.trim()) handleScan(); }} style={bStyle('text-scan', { width: '100%', marginTop: 10, padding: 13, borderRadius: 16, background: pastedText.trim() ? t.priGrad : t.border, textAlign: 'center', fontSize: 14, fontWeight: 700, color: pastedText.trim() ? '#fff' : t.muted, transition: 'background 0.2s ease' })}>
                Find My Gap
              </div>
            </div>
          )}
          {scanMode === 'voice' && (
            <div style={{ borderRadius: 20, background: t.surf, border: `1.5px solid ${t.border}`, padding: 28, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, boxShadow: t.shadow }}>
              <div style={{ width: 80, height: 80, borderRadius: '50%', background: t.priLight, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `3px solid ${t.pri}`, boxShadow: `0 0 0 8px ${t.pri}18` }}>
                <L.Mic size={34} color={t.pri} />
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: t.txt }}>Speak your confusion</div>
                <div style={{ fontSize: 12, color: t.muted, marginTop: 3 }}>Say what you don't understand</div>
              </div>
              <div style={{ padding: '8px 16px', borderRadius: 20, background: t.inp, border: `1px solid ${t.border}` }}>
                <span style={{ fontSize: 12, color: t.muted, fontStyle: 'italic' }}>"Why do we need a control group?"</span>
              </div>
              <div onMouseDown={() => bp('voice-scan')} onMouseUp={() => { rp(); handleScan(); }} onTouchStart={() => bp('voice-scan')} onTouchEnd={() => { rp(); handleScan(); }} style={bStyle('voice-scan', { background: t.priGrad, color: '#fff', padding: '11px 30px', borderRadius: 30, fontSize: 13, fontWeight: 700, boxShadow: '0 4px 14px rgba(99,102,241,0.35)' })}>
                Hold to Record
              </div>
            </div>
          )}
        </div>
      )}

      {showResult && (
        <div style={{ padding: '0 20px 16px', animation: 'slideUp 0.35s ease' }}>
          <div style={{ borderRadius: 20, background: t.surf, border: `1.5px solid ${t.border}`, overflow: 'hidden', boxShadow: t.shadow }}>
            <div style={{ background: t.priGrad, padding: '14px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', fontWeight: 600, letterSpacing: 0.6, marginBottom: 2 }}>GAP IDENTIFIED</div>
                <div style={{ fontSize: 17, fontWeight: 700, color: '#fff' }}>Controls vs. Variables</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: 10, padding: '5px 10px' }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: '#fff' }}>94% confident</span>
              </div>
            </div>
            <div style={{ padding: 16 }}>
              <div style={{ fontSize: 13, color: t.sub, lineHeight: 1.65, marginBottom: 14 }}>
                You're missing how experimental controls work—the baseline that makes variable changes meaningful.
              </div>
              <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
                <div style={{ flex: 1, padding: '10px 12px', borderRadius: 12, background: t.inp, border: `1px solid ${t.border}` }}>
                  <div style={{ fontSize: 10, color: t.muted, fontWeight: 600, marginBottom: 2 }}>SUBJECT</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: t.txt }}>🔬 Biology</div>
                </div>
                <div style={{ flex: 1, padding: '10px 12px', borderRadius: 12, background: t.inp, border: `1px solid ${t.border}` }}>
                  <div style={{ fontSize: 10, color: t.muted, fontWeight: 600, marginBottom: 2 }}>LESSON</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: t.txt }}>2 min · 3 steps</div>
                </div>
              </div>
              <div style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 11, color: t.muted, fontWeight: 600, marginBottom: 7 }}>RELATED GAPS</div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {['Hypothesis writing', 'Data interpretation'].map(g => (
                    <div key={g} style={{ padding: '4px 10px', borderRadius: 20, background: t.tag, border: `1px solid ${t.border}` }}>
                      <span style={{ fontSize: 11, color: t.tagTxt, fontWeight: 600 }}>{g}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div onMouseDown={() => bp('start-lesson')} onMouseUp={() => { rp(); setSelectedLesson(1); setLessonStep(0); setShowResult(false); }} onTouchStart={() => bp('start-lesson')} onTouchEnd={() => { rp(); setSelectedLesson(1); setLessonStep(0); setShowResult(false); }} style={bStyle('start-lesson', { width: '100%', padding: 13, borderRadius: 14, background: t.priGrad, textAlign: 'center', fontSize: 14, fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: '0 4px 14px rgba(99,102,241,0.35)' })}>
                <L.Play size={15} color="#fff" />Start 2-min Lesson
              </div>
            </div>
          </div>
        </div>
      )}

      <div style={{ padding: '4px 20px 88px' }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: t.txt, marginBottom: 10 }}>Recent Scans</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {recentScans.map(scan => (
            <div key={scan.id} style={{ background: t.surf, borderRadius: 16, padding: '12px 14px', border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', gap: 12, boxShadow: t.shadow }}>
              <div style={{ width: 42, height: 42, borderRadius: 12, background: scan.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 20 }}>{scan.emoji}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: t.txt, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{scan.gap}</div>
                <div style={{ fontSize: 11, color: t.muted, marginTop: 1 }}>{scan.source} · {scan.time}</div>
              </div>
              <div style={{ padding: '3px 9px', borderRadius: 20, background: scan.color + '18', flexShrink: 0 }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: scan.color }}>{scan.subject}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ── MAP SCREEN ────────────────────────────────────────────────────────────
  const renderMap = () => {
    const statusInfo = {
      strong: { dot: '#10B981', bg: '#ECFDF5', txt: '#059669', label: 'Strong' },
      learning: { dot: '#F59E0B', bg: '#FFFBEB', txt: '#D97706', label: 'Learning' },
      gap: { dot: '#EF4444', bg: '#FFF1F2', txt: '#DC2626', label: 'Gap' },
    };
    const subjColors = { math: '#6366F1', science: '#10B981', work: '#F59E0B', writing: '#EC4899' };
    const filters = ['all', 'math', 'science', 'work', 'writing'];
    const filtered = mapFilter === 'all' ? mapConcepts : mapConcepts.filter(c => c.subject === mapFilter || c.id === 'me');
    const lessonLinks = { bio: 1, expdesign: 1, func: 3, geo: 3, xl: 2, dataviz: 2, arg: 3 };

    return (
      <div style={{ flex: 1, overflowY: 'auto' }}>
        <div style={{ padding: '16px 20px 10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 22, fontWeight: 700, color: t.txt }}>Knowledge Map</div>
            <div style={{ fontSize: 13, color: t.sub }}>Your personal learning landscape</div>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            {Object.entries(statusInfo).map(([k, v]) => (
              <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <div style={{ width: 7, height: 7, borderRadius: '50%', background: v.dot }} />
                <span style={{ fontSize: 10, color: t.sub, fontWeight: 500 }}>{v.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ padding: '0 20px 12px', display: 'flex', gap: 6, overflowX: 'auto' }}>
          {filters.map(fi => (
            <div key={fi} onMouseDown={() => bp(`f${fi}`)} onMouseUp={() => { rp(); setMapFilter(fi); setSelectedConcept(null); }} onTouchStart={() => bp(`f${fi}`)} onTouchEnd={() => { rp(); setMapFilter(fi); setSelectedConcept(null); }} style={bStyle(`f${fi}`, { padding: '6px 14px', borderRadius: 20, flexShrink: 0, background: mapFilter === fi ? (fi === 'all' ? t.priGrad : `linear-gradient(135deg,${subjColors[fi]},${subjColors[fi]}CC)`) : t.surf, border: `1.5px solid ${mapFilter === fi ? 'transparent' : t.border}`, fontSize: 12, fontWeight: 600, color: mapFilter === fi ? '#fff' : t.sub })}>
              {fi.charAt(0).toUpperCase() + fi.slice(1)}
            </div>
          ))}
        </div>

        <div style={{ margin: '0 20px', borderRadius: 20, background: t.surf, border: `1px solid ${t.border}`, overflow: 'hidden', boxShadow: t.shadow, position: 'relative', height: 270 }}>
          <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle at 50% 50%, ${t.pri}08 0%, transparent 65%)`, pointerEvents: 'none' }} />
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} viewBox="0 0 100 100" preserveAspectRatio="none">
            {filtered.filter(c => c.id !== 'me').map(c => (
              <line key={`l${c.id}`} x1="50" y1="50" x2={c.cx} y2={c.cy} stroke={t.border} strokeWidth="0.6" strokeDasharray="2,2" />
            ))}
          </svg>
          {filtered.map(c => {
            if (c.id === 'me') return (
              <div key="me" style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: 54, height: 54, borderRadius: '50%', background: t.priGrad, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: `0 0 0 6px ${t.pri}22, 0 4px 20px rgba(99,102,241,0.4)`, zIndex: 10 }}>
                <span style={{ fontSize: 20 }}>🎓</span>
                <span style={{ fontSize: 8, color: 'rgba(255,255,255,0.85)', fontWeight: 700 }}>YOU</span>
              </div>
            );
            const si = statusInfo[c.status] || {};
            const isSel = selectedConcept === c.id;
            return (
              <div key={c.id} onMouseDown={() => bp(`n${c.id}`)} onMouseUp={() => { rp(); setSelectedConcept(isSel ? null : c.id); }} onTouchStart={() => bp(`n${c.id}`)} onTouchEnd={() => { rp(); setSelectedConcept(isSel ? null : c.id); }} style={bStyle(`n${c.id}`, { position: 'absolute', left: `${c.cx}%`, top: `${c.cy}%`, transform: 'translate(-50%,-50%)', background: isSel ? si.dot : t.surf, border: `2px solid ${si.dot}`, borderRadius: 10, padding: '4px 8px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, boxShadow: isSel ? `0 4px 16px ${si.dot}50` : t.shadow, zIndex: isSel ? 9 : 5 })}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: isSel ? '#fff' : si.dot }} />
                <span style={{ fontSize: 9, fontWeight: 700, color: isSel ? '#fff' : t.txt, whiteSpace: 'nowrap' }}>{c.label}</span>
              </div>
            );
          })}
        </div>

        {selectedConcept && (() => {
          const c = mapConcepts.find(x => x.id === selectedConcept);
          const si = statusInfo[c.status] || {};
          const linkedId = lessonLinks[c.id];
          const linked = linkedId ? lessons.find(l => l.id === linkedId) : null;
          return (
            <div style={{ margin: '12px 20px', borderRadius: 16, background: t.surf, border: `1.5px solid ${t.border}`, padding: 14, boxShadow: t.shadow, animation: 'slideUp 0.25s ease' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: c.status !== 'strong' && linked ? 12 : 0 }}>
                <div style={{ width: 38, height: 38, borderRadius: 10, background: si.bg, border: `1.5px solid ${si.dot}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: 12, height: 12, borderRadius: '50%', background: si.dot }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: t.txt }}>{c.label}</div>
                  <div style={{ fontSize: 11, color: si.txt, fontWeight: 600 }}>{si.label} · {c.subject}</div>
                </div>
                <div onMouseDown={() => bp('close-node')} onMouseUp={() => { rp(); setSelectedConcept(null); }} onTouchStart={() => bp('close-node')} onTouchEnd={() => { rp(); setSelectedConcept(null); }} style={bStyle('close-node', { width: 28, height: 28, borderRadius: 8, background: t.inp, display: 'flex', alignItems: 'center', justifyContent: 'center' })}>
                  <L.X size={14} color={t.muted} />
                </div>
              </div>
              {linked && c.status !== 'strong' && (
                <div onMouseDown={() => bp('map-go')} onMouseUp={() => { rp(); setSelectedLesson(linked.id); setLessonStep(0); setQuizAnswer(null); setQuizSubmitted(false); }} onTouchStart={() => bp('map-go')} onTouchEnd={() => { rp(); setSelectedLesson(linked.id); setLessonStep(0); setQuizAnswer(null); setQuizSubmitted(false); }} style={bStyle('map-go', { background: t.priGrad, borderRadius: 12, padding: '10px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 4px 14px rgba(99,102,241,0.3)' })}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#fff' }}>{linked.emoji} {linked.title}</span>
                  <L.ChevronRight size={16} color="rgba(255,255,255,0.8)" />
                </div>
              )}
              {c.status === 'strong' && (
                <div style={{ padding: '8px 12px', borderRadius: 10, background: t.okBg, fontSize: 12, color: t.ok, fontWeight: 500 }}>
                  ✓ Solid foundation here. Keep going!
                </div>
              )}
            </div>
          );
        })()}

        <div style={{ padding: '10px 20px 88px', display: 'flex', gap: 10 }}>
          {[{ label: 'Gaps', value: '5', color: '#EF4444' }, { label: 'Learning', value: '4', color: '#F59E0B' }, { label: 'Strong', value: '4', color: '#10B981' }].map(s => (
            <div key={s.label} style={{ flex: 1, background: t.surf, borderRadius: 14, padding: '12px 10px', textAlign: 'center', border: `1px solid ${t.border}`, boxShadow: t.shadow }}>
              <div style={{ fontSize: 22, fontWeight: 700, color: s.color }}>{s.value}</div>
              <div style={{ fontSize: 11, color: t.muted, fontWeight: 500, marginTop: 1 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ── LEARN SCREEN ──────────────────────────────────────────────────────────
  const renderLearn = () => {
    const featured = lessons[0];
    return (
      <div style={{ flex: 1, overflowY: 'auto' }}>
        <div style={{ padding: '16px 20px 12px' }}>
          <div style={{ fontSize: 22, fontWeight: 700, color: t.txt }}>Your Lessons</div>
          <div style={{ fontSize: 13, color: t.sub }}>5-day streak 🔥 · 8 concepts learned</div>
        </div>

        <div style={{ padding: '0 20px 16px' }}>
          <div style={{ borderRadius: 22, background: t.priGrad, padding: 20, boxShadow: '0 8px 28px rgba(99,102,241,0.38)', overflow: 'hidden', position: 'relative' }}>
            <div style={{ position: 'absolute', top: -20, right: -20, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />
            <div style={{ position: 'absolute', bottom: -30, right: 20, width: 90, height: 90, borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.65)', fontWeight: 700, letterSpacing: 0.8, marginBottom: 6 }}>TODAY'S PICK</div>
            <div style={{ fontSize: 19, fontWeight: 700, color: '#fff', marginBottom: 4 }}>{featured.title}</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.72)', marginBottom: 12 }}>{featured.emoji} {featured.subject} · {featured.duration} · {featured.difficulty}</div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.82)', lineHeight: 1.6, marginBottom: 16 }}>{featured.summary}</div>
            <div onMouseDown={() => bp('featured-go')} onMouseUp={() => { rp(); setSelectedLesson(featured.id); setLessonStep(0); setQuizAnswer(null); setQuizSubmitted(false); }} onTouchStart={() => bp('featured-go')} onTouchEnd={() => { rp(); setSelectedLesson(featured.id); setLessonStep(0); setQuizAnswer(null); setQuizSubmitted(false); }} style={bStyle('featured-go', { display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.2)', border: '1.5px solid rgba(255,255,255,0.3)', borderRadius: 14, padding: '10px 18px' })}>
              <L.Play size={14} color="#fff" />
              <span style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>Start Lesson</span>
            </div>
          </div>
        </div>

        <div style={{ padding: '0 20px 88px' }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: t.txt, marginBottom: 10 }}>All Lessons</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {lessons.map(ls => {
              const done = completedLessons.includes(ls.id);
              return (
                <div key={ls.id} onMouseDown={() => bp(`ls${ls.id}`)} onMouseUp={() => { rp(); setSelectedLesson(ls.id); setLessonStep(0); setQuizAnswer(null); setQuizSubmitted(false); }} onTouchStart={() => bp(`ls${ls.id}`)} onTouchEnd={() => { rp(); setSelectedLesson(ls.id); setLessonStep(0); setQuizAnswer(null); setQuizSubmitted(false); }} style={bStyle(`ls${ls.id}`, { background: t.surf, borderRadius: 16, padding: '12px 14px', border: `1.5px solid ${done ? t.ok + '40' : t.border}`, display: 'flex', alignItems: 'center', gap: 12, boxShadow: t.shadow })}>
                  <div style={{ width: 46, height: 46, borderRadius: 14, background: ls.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 22 }}>{ls.emoji}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: t.txt, marginBottom: 2 }}>{ls.title}</div>
                    <div style={{ fontSize: 11, color: t.muted, marginBottom: 5 }}>{ls.subject} · {ls.duration} · {ls.difficulty}</div>
                    <div style={{ display: 'flex', gap: 5 }}>
                      {ls.tags.map(tag => (
                        <span key={tag} style={{ fontSize: 10, fontWeight: 600, color: t.tagTxt, background: t.tag, padding: '2px 7px', borderRadius: 6 }}>{tag}</span>
                      ))}
                    </div>
                  </div>
                  {done ? (
                    <div style={{ width: 30, height: 30, borderRadius: '50%', background: t.okBg, border: `1.5px solid ${t.ok}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <L.Check size={14} color={t.ok} />
                    </div>
                  ) : (
                    <L.ChevronRight size={18} color={t.muted} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  // ── PROFILE SCREEN ────────────────────────────────────────────────────────
  const renderProfile = () => (
    <div style={{ flex: 1, overflowY: 'auto' }}>
      <div style={{ padding: '16px 20px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontSize: 22, fontWeight: 700, color: t.txt }}>My Progress</div>
        <div onMouseDown={() => bp('theme')} onMouseUp={() => { rp(); setTheme(th => th === 'light' ? 'dark' : 'light'); }} onTouchStart={() => bp('theme')} onTouchEnd={() => { rp(); setTheme(th => th === 'light' ? 'dark' : 'light'); }} style={bStyle('theme', { width: 40, height: 40, borderRadius: 14, background: t.surf, border: `1.5px solid ${t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: t.shadow })}>
          {theme === 'light' ? <L.Moon size={18} color={t.sub} /> : <L.Sun size={18} color={t.sub} />}
        </div>
      </div>

      <div style={{ padding: '0 20px 16px', display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{ width: 66, height: 66, borderRadius: 22, background: t.priGrad, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 6px 20px rgba(99,102,241,0.35)', flexShrink: 0 }}>
          <span style={{ fontSize: 30 }}>🎓</span>
        </div>
        <div>
          <div style={{ fontSize: 18, fontWeight: 700, color: t.txt }}>Alex Chen</div>
          <div style={{ fontSize: 13, color: t.sub }}>High school student</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 4 }}>
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#10B981' }} />
            <span style={{ fontSize: 11, color: t.muted, fontWeight: 500 }}>Active learner · Member since Jan 2026</span>
          </div>
        </div>
      </div>

      <div style={{ padding: '0 20px 16px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {[
          { label: 'Gaps Found', value: '12', Icon: L.Target, color: '#EF4444', bg: '#FFF1F2' },
          { label: 'Concepts Learned', value: '8', Icon: L.CheckCircle, color: '#10B981', bg: '#ECFDF5' },
          { label: 'Day Streak', value: '5 🔥', Icon: L.Zap, color: '#F59E0B', bg: '#FFFBEB' },
          { label: 'Hours Saved', value: '3.2h', Icon: L.Clock, color: '#6366F1', bg: '#EEF2FF' },
        ].map(s => (
          <div key={s.label} style={{ background: t.surf, borderRadius: 16, padding: 14, border: `1px solid ${t.border}`, boxShadow: t.shadow }}>
            <div style={{ width: 34, height: 34, borderRadius: 10, background: theme === 'light' ? s.bg : s.color + '22', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 8 }}>
              <s.Icon size={16} color={s.color} />
            </div>
            <div style={{ fontSize: 22, fontWeight: 700, color: t.txt }}>{s.value}</div>
            <div style={{ fontSize: 11, color: t.muted, fontWeight: 500, marginTop: 1 }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ padding: '0 20px 16px' }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: t.txt, marginBottom: 10 }}>Catch-Up Plan</div>
        <div style={{ background: t.surf, borderRadius: 20, border: `1px solid ${t.border}`, overflow: 'hidden', boxShadow: t.shadow }}>
          {[
            { week: 'This week', items: ['Controls vs. Variables', 'VLOOKUP basics'], done: false, color: t.pri },
            { week: 'Next week', items: ['Factoring polynomials', 'Hypothesis writing'], done: false, color: t.sec },
            { week: 'Completed', items: ['Revenue vs. Retention', 'Active listening skills'], done: true, color: '#10B981' },
          ].map((phase, i, arr) => (
            <div key={i} style={{ padding: '12px 16px', borderBottom: i < arr.length - 1 ? `1px solid ${t.border}` : 'none', display: 'flex', gap: 12 }}>
              <div style={{ width: 4, alignSelf: 'stretch', background: phase.color, borderRadius: 2, flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                  {phase.done && <L.CheckCircle size={12} color={t.ok} />}
                  <span style={{ fontSize: 12, fontWeight: 700, color: phase.done ? t.ok : t.txt }}>{phase.week}</span>
                </div>
                {phase.items.map(item => (
                  <div key={item} style={{ fontSize: 12, color: phase.done ? t.muted : t.sub, marginBottom: 2 }}>
                    {phase.done ? '✓ ' : '• '}{item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: '0 20px 88px' }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: t.txt, marginBottom: 10 }}>Achievements</div>
        <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 4 }}>
          {[
            { name: 'First Gap', emoji: '🔍', earned: true },
            { name: '5-Day Streak', emoji: '🔥', earned: true },
            { name: 'Quick Learner', emoji: '⚡', earned: true },
            { name: 'Map Explorer', emoji: '🗺️', earned: false },
            { name: '10 Concepts', emoji: '🧠', earned: false },
            { name: 'Deep Dive', emoji: '🌊', earned: false },
          ].map(a => (
            <div key={a.name} style={{ flexShrink: 0, width: 80, background: t.surf, borderRadius: 18, padding: '14px 8px', textAlign: 'center', border: `1.5px solid ${a.earned ? t.pri + '40' : t.border}`, boxShadow: t.shadow, opacity: a.earned ? 1 : 0.45 }}>
              <div style={{ fontSize: 26, marginBottom: 6 }}>{a.emoji}</div>
              <div style={{ fontSize: 10, fontWeight: 700, color: a.earned ? t.pri : t.muted, lineHeight: 1.3 }}>{a.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ── SHELL ─────────────────────────────────────────────────────────────────
  const tabs = [
    { id: 'scan', label: 'Scan', Icon: L.Camera },
    { id: 'map', label: 'Map', Icon: L.Map },
    { id: 'learn', label: 'Learn', Icon: L.BookOpen },
    { id: 'me', label: 'Me', Icon: L.User },
  ];

  return (
    <div style={{ minHeight: '100vh', background: t.page, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: f, padding: '24px 0', transition: 'background 0.3s ease' }}>
      <div style={{ width: 375, height: 812, background: t.bg, borderRadius: 44, overflow: 'hidden', position: 'relative', display: 'flex', flexDirection: 'column', boxShadow: '0 40px 100px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.08)', fontFamily: f, transition: 'background 0.3s ease' }}>
        {/* Dynamic Island */}
        <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 122, height: 35, background: '#000', borderRadius: '0 0 24px 24px', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#111', border: '1.5px solid #2a2a2a' }} />
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#1a1a1a' }} />
        </div>

        {/* Status bar */}
        <div style={{ height: 50, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '0 24px 8px', flexShrink: 0, zIndex: 10 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: t.txt }}>9:41</span>
          <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
            <L.Wifi size={14} color={t.muted} /><L.Battery size={14} color={t.muted} />
          </div>
        </div>

        {/* Screen */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {activeTab === 'scan' && renderScan()}
          {activeTab === 'map' && renderMap()}
          {activeTab === 'learn' && renderLearn()}
          {activeTab === 'me' && renderProfile()}
        </div>

        {/* Bottom nav */}
        <div style={{ height: 74, background: t.nav, borderTop: `1px solid ${t.border}`, display: 'flex', flexShrink: 0, paddingBottom: 10, boxShadow: `0 -4px 24px rgba(0,0,0,0.06)`, transition: 'background 0.3s ease' }}>
          {tabs.map(tab => {
            const active = activeTab === tab.id;
            return (
              <div key={tab.id} onMouseDown={() => bp(`t${tab.id}`)} onMouseUp={() => { rp(); setActiveTab(tab.id); }} onTouchStart={() => bp(`t${tab.id}`)} onTouchEnd={() => { rp(); setActiveTab(tab.id); }} style={bStyle(`t${tab.id}`, { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3 })}>
                <div style={{ width: 40, height: 28, borderRadius: 10, background: active ? t.priLight : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s ease' }}>
                  <tab.Icon size={20} color={active ? t.pri : t.muted} />
                </div>
                <span style={{ fontSize: 10, fontWeight: active ? 700 : 500, color: active ? t.pri : t.muted, transition: 'color 0.2s ease' }}>{tab.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
