function App() {
  const { useState, useEffect, useRef } = React;

  // Inject Google Fonts
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  const [tab, setTab] = useState('home');
  const [openLesson, setOpenLesson] = useState(null);
  const [lessonStep, setLessonStep] = useState(0);
  const [scanPhase, setScanPhase] = useState('idle'); // idle | scanning | result
  const [scanItem, setScanItem] = useState(null);
  const [pressedCard, setPressedCard] = useState(null);
  const [completedLessons, setCompletedLessons] = useState([2]);
  const [streak] = useState(7);
  const [time, setTime] = useState('9:41');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(`${now.getHours() % 12 || 12}:${String(now.getMinutes()).padStart(2, '0')}`);
    };
    update();
    const t = setInterval(update, 30000);
    return () => clearInterval(t);
  }, []);

  const C = {
    ivory: '#FFFDF5', terra: '#C67B5C', sand: '#E8D5B7',
    forest: '#4A7C59', brown: '#3D2B1F', lightSand: '#F5EDD8',
    muted: '#8B7355', softOrange: '#E8A87C', mutedGreen: '#7AAF8A',
    darkBg: '#1C1408',
  };

  const lessons = [
    {
      id: 1, category: 'Language', emoji: '🌍', color: '#F0E6D4',
      title: 'Ordering politely in Spanish', context: 'Near a restaurant · Now',
      duration: '90 sec', tag: 'Context: Location',
      steps: [
        { h: 'The Situation', body: "You're at a Spanish restaurant and want to order without awkwardly pointing at the menu. A few phrases go a long way." },
        { h: 'Key Phrase', body: '"Quisiera…" means "I would like…" — polite and natural.\n\n• "Quisiera el pollo, por favor."\n  (I would like the chicken, please.)\n\n• "¿Me recomienda algo?" \n  (Can you recommend something?)\n\nTip: "Por favor" and "Gracias" always land well.' },
        { h: 'Your Takeaway', body: '✓ Replace "Quiero" (I want) with "Quisiera" (I would like) — one word makes you sound respectful.\n\nLocals immediately appreciate the effort. Even a small attempt at the local language changes the experience.' },
      ]
    },
    {
      id: 2, category: 'Finance', emoji: '💸', color: '#E8F0E0',
      title: 'What FICA means on your pay stub', context: 'Payday this Friday',
      duration: '75 sec', tag: 'Context: Calendar',
      steps: [
        { h: 'The Situation', body: 'You noticed "FICA" taking a chunk from your paycheck every period and wondered if it was optional or even correct.' },
        { h: 'What It Is', body: 'FICA = Federal Insurance Contributions Act.\n\nIt covers two things:\n• Social Security: 6.2% of your wages\n• Medicare: 1.45% of your wages\n\nYour employer matches these amounts exactly — so your company pays the same amount too.' },
        { h: 'Your Takeaway', body: "✓ FICA isn't optional, but it's not lost money.\n\nSocial Security: retirement and disability income.\nMedicare: health coverage after age 65.\n\nYou're investing in your future self every paycheck." },
      ]
    },
    {
      id: 3, category: 'Health', emoji: '🥗', color: '#F5EDD4',
      title: 'Reading a nutrition label in 20 seconds', context: 'At the grocery store',
      duration: '60 sec', tag: 'Context: Location',
      steps: [
        { h: 'The Situation', body: 'You picked up a snack labeled "healthy" and "natural" — but you want to know if it actually is.' },
        { h: 'What to Focus On', body: 'Ignore the front of the package. Go to Nutrition Facts:\n\n1. Serving size — the whole label is based on this\n2. Added sugars — aim for under 25g per day total\n3. Dietary fiber — aim for 25g per day (more = better)\n4. Saturated fat — keep under 20g per day\n\nIngredients list: shorter = usually better.' },
        { h: 'Your Takeaway', body: '✓ "Low fat" often means high sugar. "Natural" means almost nothing legally.\n\nThe only truth is in the Nutrition Facts panel — especially serving size. One "serving" may be half the bag.' },
      ]
    },
    {
      id: 4, category: 'Work', emoji: '💼', color: '#E0EAF0',
      title: 'Run a stand-up that actually ends on time', context: 'Team meeting in 20 min',
      duration: '75 sec', tag: 'Context: Calendar',
      steps: [
        { h: 'The Situation', body: "Your daily stand-up starts at 9am and somehow ends at 9:30. By then everyone's mentally checked out before real work begins." },
        { h: 'The Fix', body: "Each person answers ONLY 3 things:\n✓ Done yesterday\n✓ Doing today\n✓ Any blockers\n\nTotal meeting: 15 minutes max.\n\nIf something needs discussion → 'Let's take it offline' and schedule a separate chat. Stand-ups are for sync, not solving." },
        { h: 'Your Takeaway', body: "✓ Blockers get attention. Solutions get scheduled separately.\n\nA good stand-up leaves everyone knowing what each person is working on — nothing more. That's the whole goal." },
      ]
    },
  ];

  const scanItems = [
    {
      id: 'menu', label: 'Restaurant Menu', emoji: '🍽️', icon: '📋',
      preview: 'Bruschetta al Pomodoro · Risotto ai Funghi Porcini · Tiramisù della Casa',
      result: {
        title: 'Italian Menu Terms Explained',
        terms: [
          { term: 'Bruschetta al Pomodoro', def: 'Toasted bread rubbed with garlic and topped with fresh tomatoes. "Al" = "with".' },
          { term: 'Porcini', def: 'A type of wild mushroom, earthy and rich. High-end ingredient — expect a price bump.' },
          { term: 'Della Casa', def: 'Literally "of the house" — it\'s the restaurant\'s own special recipe. Usually a good sign.' },
        ],
        lesson: 'Language · Italian Dining',
      }
    },
    {
      id: 'receipt', label: 'Pay Stub', emoji: '📄', icon: '📑',
      preview: 'Gross Pay: $4,200 · FICA: $321.30 · Fed W/H: $504 · Net: $3,125',
      result: {
        title: 'Pay Stub Decoded',
        terms: [
          { term: 'Gross Pay', def: 'Your full salary before any deductions. This is what your offer letter says.' },
          { term: 'FICA $321.30', def: 'Social Security (6.2%) + Medicare (1.45%) = 7.65% of gross. Employer matches this.' },
          { term: 'Fed W/H $504', def: 'Federal income tax withheld based on your W-4 form. Filed each April.' },
        ],
        lesson: 'Finance · Payroll',
      }
    },
    {
      id: 'label', label: 'Supplement Label', emoji: '💊', icon: '🏷️',
      preview: 'Vitamin D3 2000IU · Magnesium Glycinate 400mg · Ashwagandha Extract 300mg',
      result: {
        title: 'Supplement Label Explained',
        terms: [
          { term: 'IU (International Units)', def: 'A measure of biological activity, not weight. 2000 IU of Vitamin D is a common daily dose.' },
          { term: 'Glycinate form', def: 'A chelated form of magnesium — better absorbed than oxide. Worth the extra cost.' },
          { term: 'Ashwagandha Extract', def: 'Adaptogenic herb studied for stress reduction. "Extract" means concentrated from root.' },
        ],
        lesson: 'Health · Supplements',
      }
    },
  ];

  const skills = [
    { name: 'Money', emoji: '💸', pct: 68, lessons: 14, color: '#E8F0E0', level: 'Intermediate' },
    { name: 'Travel', emoji: '✈️', pct: 45, lessons: 9, color: '#E0EAF0', level: 'Beginner' },
    { name: 'Health', emoji: '🥗', pct: 82, lessons: 21, color: '#F5EDD4', level: 'Advanced' },
    { name: 'Work', emoji: '💼', pct: 55, lessons: 11, color: '#F0E6D4', level: 'Intermediate' },
    { name: 'Language', emoji: '🌍', pct: 38, lessons: 7, color: '#EAF0E0', level: 'Beginner' },
    { name: 'Food', emoji: '🍳', pct: 72, lessons: 17, color: '#F0ECE0', level: 'Intermediate' },
  ];

  // ─── Helpers ───────────────────────────────────────────────────────────────
  const px = (n) => `${n}px`;

  const btn = (id) => ({
    transform: pressedCard === id ? 'scale(0.97)' : 'scale(1)',
    transition: 'transform 0.12s ease',
    cursor: 'pointer',
  });

  const press = (id) => { setPressedCard(id); setTimeout(() => setPressedCard(null), 200); };

  // ─── Lesson Modal ──────────────────────────────────────────────────────────
  const LessonModal = () => {
    if (!openLesson) return null;
    const L = openLesson;
    const step = L.steps[lessonStep];
    const pct = ((lessonStep + 1) / L.steps.length) * 100;
    const done = lessonStep >= L.steps.length - 1;

    return React.createElement('div', {
      style: {
        position: 'absolute', inset: 0, background: C.ivory, zIndex: 50,
        display: 'flex', flexDirection: 'column', fontFamily: "'DM Sans', sans-serif",
        borderRadius: px(40),
      }
    },
      // Header
      React.createElement('div', {
        style: { padding: '56px 20px 16px', background: L.color, borderRadius: '40px 40px 0 0' }
      },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 } },
          React.createElement('span', { style: { fontSize: 12, fontWeight: 600, color: C.muted, letterSpacing: 1, textTransform: 'uppercase' } }, `${L.category} · ${L.duration}`),
          React.createElement('button', {
            onClick: () => { setOpenLesson(null); setLessonStep(0); },
            style: { background: 'rgba(0,0,0,0.08)', border: 'none', borderRadius: '50%', width: 30, height: 30, cursor: 'pointer', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }
          }, '✕'),
        ),
        React.createElement('div', { style: { fontSize: 28, marginBottom: 4 } }, L.emoji),
        React.createElement('h2', { style: { margin: 0, fontSize: 20, fontWeight: 700, color: C.brown, lineHeight: 1.3 } }, L.title),
        // Progress bar
        React.createElement('div', { style: { marginTop: 16, background: 'rgba(0,0,0,0.1)', borderRadius: 4, height: 4 } },
          React.createElement('div', { style: { width: `${pct}%`, height: 4, background: C.terra, borderRadius: 4, transition: 'width 0.4s ease' } }),
        ),
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginTop: 6 } },
          ...L.steps.map((_, i) => React.createElement('div', {
            key: i,
            style: { width: 8, height: 8, borderRadius: '50%', background: i <= lessonStep ? C.terra : 'rgba(0,0,0,0.15)' }
          }))
        ),
      ),
      // Content
      React.createElement('div', { style: { flex: 1, padding: '24px 20px', overflowY: 'auto' } },
        React.createElement('h3', { style: { margin: '0 0 12px', fontSize: 14, fontWeight: 700, color: C.terra, letterSpacing: 0.5, textTransform: 'uppercase' } }, step.h),
        React.createElement('p', {
          style: { margin: 0, fontSize: 16, color: C.brown, lineHeight: 1.7, whiteSpace: 'pre-line', fontWeight: 400 }
        }, step.body),
      ),
      // Footer
      React.createElement('div', { style: { padding: '16px 20px 32px', borderTop: `1px solid ${C.sand}` } },
        done
          ? React.createElement('button', {
              onClick: () => {
                setCompletedLessons(prev => [...prev, L.id]);
                setOpenLesson(null); setLessonStep(0);
              },
              style: { width: '100%', padding: '14px', background: C.forest, color: '#fff', border: 'none', borderRadius: 14, fontSize: 16, fontWeight: 700, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }
            }, '✓ Got it! Mark complete')
          : React.createElement('button', {
              onClick: () => setLessonStep(s => s + 1),
              style: { width: '100%', padding: '14px', background: C.terra, color: '#fff', border: 'none', borderRadius: 14, fontSize: 16, fontWeight: 600, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }
            }, 'Next →'),
      ),
    );
  };

  // ─── Status Bar ────────────────────────────────────────────────────────────
  const StatusBar = () =>
    React.createElement('div', {
      style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 24px 0', position: 'relative', zIndex: 10 }
    },
      React.createElement('span', { style: { fontSize: 15, fontWeight: 700, color: C.brown, fontFamily: "'DM Sans', sans-serif" } }, time),
      React.createElement('div', { style: { display: 'flex', gap: 5, alignItems: 'center' } },
        // Wifi
        React.createElement('svg', { width: 16, height: 12, viewBox: '0 0 24 18', fill: C.muted },
          React.createElement('path', { d: 'M12 14a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm0-5c2.4 0 4.6.9 6.2 2.4l-1.5 1.5A7.5 7.5 0 0 0 12 11a7.5 7.5 0 0 0-4.7 1.9L5.8 11.4C7.4 9.9 9.6 9 12 9zm0-5c3.7 0 7 1.4 9.5 3.7l-1.5 1.5A11.5 11.5 0 0 0 12 7a11.5 11.5 0 0 0-8 3.2L2.5 8.7C5 6.4 8.3 5 12 5z' })
        ),
        // Battery
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 2 } },
          React.createElement('div', { style: { width: 22, height: 12, border: `1.5px solid ${C.muted}`, borderRadius: 3, position: 'relative', display: 'flex', alignItems: 'center', padding: 1.5 } },
            React.createElement('div', { style: { width: '75%', height: '100%', background: C.forest, borderRadius: 1 } }),
          ),
          React.createElement('div', { style: { width: 2, height: 6, background: C.muted, borderRadius: '0 1px 1px 0' } }),
        ),
      ),
    );

  // ─── Dynamic Island ────────────────────────────────────────────────────────
  const DynamicIsland = () =>
    React.createElement('div', {
      style: { width: 120, height: 34, background: '#111', borderRadius: 20, margin: '8px auto 0', position: 'relative', zIndex: 10 }
    });

  // ─── HOME SCREEN ──────────────────────────────────────────────────────────
  const HomeScreen = () => {
    const hour = new Date().getHours();
    const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
    const contextMsg = hour < 10 ? 'You\'re commuting — perfect for a quick lesson.' : hour < 14 ? 'Lunch break? Learn something new.' : 'Wind-down time. A 90-second lesson fits right in.';

    return React.createElement('div', { style: { flex: 1, overflowY: 'auto', paddingBottom: 20 } },
      // Hero greeting
      React.createElement('div', { style: { padding: '16px 20px 12px' } },
        React.createElement('p', { style: { margin: 0, fontSize: 13, color: C.muted, fontWeight: 500 } }, greeting + ', Sarah ☀️'),
        React.createElement('h1', { style: { margin: '2px 0 0', fontSize: 22, fontWeight: 700, color: C.brown } }, 'What will you learn today?'),
      ),
      // Streak card
      React.createElement('div', { style: { margin: '0 20px 16px', background: `linear-gradient(135deg, ${C.terra}, ${C.softOrange})`, borderRadius: 16, padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 12 } },
        React.createElement('div', { style: { fontSize: 28 } }, '🔥'),
        React.createElement('div', { style: { flex: 1 } },
          React.createElement('p', { style: { margin: 0, color: 'rgba(255,255,255,0.8)', fontSize: 12, fontWeight: 500 } }, 'Learning streak'),
          React.createElement('p', { style: { margin: 0, color: '#fff', fontSize: 20, fontWeight: 700 } }, `${streak} days in a row`),
        ),
        React.createElement('div', { style: { textAlign: 'right' } },
          React.createElement('p', { style: { margin: 0, color: 'rgba(255,255,255,0.75)', fontSize: 11 } }, '62 total'),
          React.createElement('p', { style: { margin: 0, color: '#fff', fontSize: 11, fontWeight: 600 } }, 'lessons'),
        ),
      ),
      // Context banner
      React.createElement('div', { style: { margin: '0 20px 16px', background: C.lightSand, borderRadius: 12, padding: '12px 16px', display: 'flex', gap: 10, alignItems: 'flex-start', border: `1px solid ${C.sand}` } },
        React.createElement('span', { style: { fontSize: 18 } }, '📍'),
        React.createElement('div', null,
          React.createElement('p', { style: { margin: 0, fontSize: 12, fontWeight: 700, color: C.terra, textTransform: 'uppercase', letterSpacing: 0.5 } }, 'Context Detected'),
          React.createElement('p', { style: { margin: '2px 0 0', fontSize: 13, color: C.brown, lineHeight: 1.4 } }, contextMsg),
        ),
      ),
      // Section: Ready to learn
      React.createElement('div', { style: { padding: '0 20px 8px' } },
        React.createElement('p', { style: { margin: 0, fontSize: 13, fontWeight: 700, color: C.muted, letterSpacing: 0.5, textTransform: 'uppercase' } }, 'For this moment'),
      ),
      // Lesson cards
      ...lessons.map((L) => {
        const done = completedLessons.includes(L.id);
        return React.createElement('div', {
          key: L.id,
          onClick: () => { if (!done) { press(L.id); setOpenLesson(L); setLessonStep(0); } },
          style: {
            ...btn(L.id), margin: '0 20px 12px', background: done ? '#F5F3EF' : L.color,
            borderRadius: 16, padding: '16px', border: `1px solid ${done ? '#E0DBD3' : 'transparent'}`,
            opacity: done ? 0.65 : 1,
          }
        },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' } },
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', { style: { display: 'flex', gap: 6, marginBottom: 8, alignItems: 'center' } },
                React.createElement('span', { style: { fontSize: 11, fontWeight: 700, color: C.terra, background: 'rgba(198,123,92,0.12)', padding: '2px 8px', borderRadius: 20 } }, L.tag),
                React.createElement('span', { style: { fontSize: 11, color: C.muted } }, L.duration),
              ),
              React.createElement('p', { style: { margin: 0, fontSize: 16, fontWeight: 700, color: C.brown, lineHeight: 1.35 } }, L.title),
              React.createElement('p', { style: { margin: '4px 0 0', fontSize: 12, color: C.muted } }, L.context),
            ),
            React.createElement('div', { style: { fontSize: 28, marginLeft: 12 } }, done ? '✅' : L.emoji),
          ),
          !done && React.createElement('div', {
            style: { marginTop: 12, background: C.terra, color: '#fff', borderRadius: 10, padding: '8px 14px', display: 'inline-block', fontSize: 13, fontWeight: 600 }
          }, 'Start lesson →'),
        );
      }),
    );
  };

  // ─── SCAN SCREEN ───────────────────────────────────────────────────────────
  const ScanScreen = () => {
    if (scanPhase === 'result' && scanItem) {
      const item = scanItems.find(s => s.id === scanItem);
      return React.createElement('div', { style: { flex: 1, overflowY: 'auto', paddingBottom: 20 } },
        React.createElement('div', { style: { padding: '16px 20px 12px', display: 'flex', alignItems: 'center', gap: 10 } },
          React.createElement('button', {
            onClick: () => { setScanPhase('idle'); setScanItem(null); },
            style: { background: C.lightSand, border: 'none', borderRadius: 10, width: 32, height: 32, cursor: 'pointer', fontSize: 16 }
          }, '←'),
          React.createElement('h2', { style: { margin: 0, fontSize: 18, fontWeight: 700, color: C.brown } }, item.result.title),
        ),
        React.createElement('div', { style: { margin: '0 20px 16px', background: C.lightSand, borderRadius: 14, padding: 16, border: `1px solid ${C.sand}` } },
          React.createElement('p', { style: { margin: '0 0 6px', fontSize: 11, fontWeight: 700, color: C.muted, textTransform: 'uppercase', letterSpacing: 0.5 } }, 'Scanned text'),
          React.createElement('p', { style: { margin: 0, fontSize: 13, color: C.brown, fontStyle: 'italic', lineHeight: 1.5 } }, item.preview),
        ),
        React.createElement('div', { style: { padding: '0 20px 8px' } },
          React.createElement('p', { style: { margin: 0, fontSize: 13, fontWeight: 700, color: C.muted, letterSpacing: 0.5, textTransform: 'uppercase' } }, 'Terms explained'),
        ),
        ...item.result.terms.map((t, i) =>
          React.createElement('div', {
            key: i,
            style: { margin: '0 20px 10px', background: '#fff', borderRadius: 14, padding: '14px 16px', border: `1px solid ${C.sand}`, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }
          },
            React.createElement('p', { style: { margin: '0 0 4px', fontSize: 14, fontWeight: 700, color: C.terra } }, t.term),
            React.createElement('p', { style: { margin: 0, fontSize: 14, color: C.brown, lineHeight: 1.55 } }, t.def),
          )
        ),
        React.createElement('div', {
          style: { margin: '8px 20px 0', background: `linear-gradient(135deg, ${C.forest}, ${C.mutedGreen})`, borderRadius: 14, padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }
        },
          React.createElement('div', null,
            React.createElement('p', { style: { margin: 0, fontSize: 11, color: 'rgba(255,255,255,0.75)', fontWeight: 600 } }, 'Turn this into a lesson'),
            React.createElement('p', { style: { margin: '2px 0 0', fontSize: 14, fontWeight: 700, color: '#fff' } }, item.result.lesson),
          ),
          React.createElement('button', {
            style: { background: 'rgba(255,255,255,0.2)', border: 'none', color: '#fff', borderRadius: 10, padding: '8px 14px', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }
          }, 'Start →'),
        ),
      );
    }

    if (scanPhase === 'scanning') {
      return React.createElement('div', { style: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 20 } },
        React.createElement('div', {
          style: { width: 240, height: 240, border: `2px solid ${C.terra}`, borderRadius: 20, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(198,123,92,0.05)' }
        },
          React.createElement('div', { style: { fontSize: 48 } }, '📷'),
          // Corner accents
          ...[[0,0,'0,8,0,2'], [0,1,'0,8,2,0'], [1,0,'2,0,0,8'], [1,1,'2,0,8,0']].map(([t, r, radii], i) =>
            React.createElement('div', {
              key: i,
              style: {
                position: 'absolute', width: 20, height: 20,
                top: t ? 'auto' : -2, bottom: t ? -2 : 'auto',
                left: r ? 'auto' : -2, right: r ? -2 : 'auto',
                borderTop: !t ? `3px solid ${C.terra}` : 'none',
                borderBottom: t ? `3px solid ${C.terra}` : 'none',
                borderLeft: !r ? `3px solid ${C.terra}` : 'none',
                borderRight: r ? `3px solid ${C.terra}` : 'none',
              }
            })
          ),
        ),
        React.createElement('p', { style: { marginTop: 24, fontSize: 16, fontWeight: 600, color: C.brown } }, 'Analyzing content…'),
        React.createElement('p', { style: { margin: '4px 0 24px', fontSize: 13, color: C.muted, textAlign: 'center' } }, 'Lesson Lens is reading the text and identifying terms'),
        React.createElement('button', {
          onClick: () => { setScanPhase('idle'); },
          style: { background: C.lightSand, border: 'none', color: C.muted, borderRadius: 10, padding: '10px 20px', cursor: 'pointer', fontSize: 14, fontFamily: "'DM Sans', sans-serif" }
        }, 'Cancel'),
      );
    }

    return React.createElement('div', { style: { flex: 1, overflowY: 'auto', paddingBottom: 20 } },
      React.createElement('div', { style: { padding: '16px 20px 8px' } },
        React.createElement('h2', { style: { margin: 0, fontSize: 22, fontWeight: 700, color: C.brown } }, 'Scan & Learn'),
        React.createElement('p', { style: { margin: '4px 0 0', fontSize: 14, color: C.muted } }, 'Point at menus, receipts, labels, or forms'),
      ),
      // Big scan button
      React.createElement('div', {
        style: { margin: '12px 20px 20px', background: `linear-gradient(145deg, ${C.terra}, ${C.softOrange})`, borderRadius: 20, padding: '28px 20px', textAlign: 'center', cursor: 'pointer', boxShadow: '0 6px 24px rgba(198,123,92,0.3)' },
        onClick: () => {
          setScanPhase('scanning');
          setTimeout(() => { setScanItem('menu'); setScanPhase('result'); }, 2200);
        }
      },
        React.createElement('div', { style: { fontSize: 48, marginBottom: 10 } }, '📷'),
        React.createElement('p', { style: { margin: 0, color: '#fff', fontSize: 18, fontWeight: 700 } }, 'Tap to Scan'),
        React.createElement('p', { style: { margin: '6px 0 0', color: 'rgba(255,255,255,0.8)', fontSize: 13 } }, 'Camera · Documents · Screenshots'),
      ),
      React.createElement('div', { style: { padding: '0 20px 8px' } },
        React.createElement('p', { style: { margin: 0, fontSize: 13, fontWeight: 700, color: C.muted, letterSpacing: 0.5, textTransform: 'uppercase' } }, 'Try a sample'),
      ),
      ...scanItems.map((item) =>
        React.createElement('div', {
          key: item.id,
          onClick: () => { press(item.id); setTimeout(() => { setScanItem(item.id); setScanPhase('result'); }, 150); },
          style: { ...btn(item.id), margin: '0 20px 10px', background: C.lightSand, borderRadius: 14, padding: '14px 16px', border: `1px solid ${C.sand}`, cursor: 'pointer' }
        },
          React.createElement('div', { style: { display: 'flex', gap: 12, alignItems: 'center' } },
            React.createElement('div', { style: { fontSize: 28 } }, item.emoji),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('p', { style: { margin: 0, fontSize: 15, fontWeight: 700, color: C.brown } }, item.label),
              React.createElement('p', { style: { margin: '2px 0 0', fontSize: 12, color: C.muted } }, item.preview.slice(0, 42) + '…'),
            ),
            React.createElement('div', { style: { fontSize: 18, color: C.terra } }, '→'),
          ),
        )
      ),
    );
  };

  // ─── MAP SCREEN ────────────────────────────────────────────────────────────
  const MapScreen = () =>
    React.createElement('div', { style: { flex: 1, overflowY: 'auto', paddingBottom: 20 } },
      React.createElement('div', { style: { padding: '16px 20px 12px' } },
        React.createElement('h2', { style: { margin: 0, fontSize: 22, fontWeight: 700, color: C.brown } }, 'Your Skill Map'),
        React.createElement('p', { style: { margin: '4px 0 0', fontSize: 14, color: C.muted } }, '62 lessons · 6 life areas · 7-day streak'),
      ),
      // Summary bar
      React.createElement('div', { style: { margin: '0 20px 16px', display: 'flex', gap: 8 } },
        [['62', 'Lessons'], ['7', 'Day streak'], ['4h', 'Saved']].map(([val, lbl]) =>
          React.createElement('div', {
            key: lbl,
            style: { flex: 1, background: C.lightSand, borderRadius: 12, padding: '12px 8px', textAlign: 'center', border: `1px solid ${C.sand}` }
          },
            React.createElement('p', { style: { margin: 0, fontSize: 20, fontWeight: 700, color: C.terra } }, val),
            React.createElement('p', { style: { margin: '2px 0 0', fontSize: 11, color: C.muted } }, lbl),
          )
        )
      ),
      React.createElement('div', { style: { padding: '0 20px 8px' } },
        React.createElement('p', { style: { margin: 0, fontSize: 13, fontWeight: 700, color: C.muted, letterSpacing: 0.5, textTransform: 'uppercase' } }, 'Life areas'),
      ),
      React.createElement('div', { style: { padding: '0 20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 } },
        ...skills.map((s) =>
          React.createElement('div', {
            key: s.name,
            style: { background: s.color, borderRadius: 16, padding: '14px', border: `1px solid rgba(0,0,0,0.04)` }
          },
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 } },
              React.createElement('span', { style: { fontSize: 22 } }, s.emoji),
              React.createElement('span', { style: { fontSize: 10, fontWeight: 700, color: C.muted, background: 'rgba(0,0,0,0.07)', padding: '2px 6px', borderRadius: 8 } }, s.level),
            ),
            React.createElement('p', { style: { margin: '0 0 8px', fontSize: 15, fontWeight: 700, color: C.brown } }, s.name),
            React.createElement('div', { style: { background: 'rgba(0,0,0,0.1)', borderRadius: 4, height: 5 } },
              React.createElement('div', { style: { width: `${s.pct}%`, height: 5, background: C.terra, borderRadius: 4 } }),
            ),
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginTop: 6 } },
              React.createElement('span', { style: { fontSize: 11, color: C.muted } }, `${s.lessons} lessons`),
              React.createElement('span', { style: { fontSize: 11, fontWeight: 700, color: C.terra } }, `${s.pct}%`),
            ),
          )
        )
      ),
      // Recent achievements
      React.createElement('div', { style: { padding: '0 20px 8px' } },
        React.createElement('p', { style: { margin: 0, fontSize: 13, fontWeight: 700, color: C.muted, letterSpacing: 0.5, textTransform: 'uppercase' } }, 'Recent achievements'),
      ),
      ...[
        { icon: '🏅', title: 'Finance Foundation', desc: 'Completed 10 money lessons', date: '2 days ago' },
        { icon: '🌱', title: 'Health Sprout', desc: 'Learned 5 nutrition lessons', date: '1 week ago' },
        { icon: '🔥', title: 'Week Warrior', desc: '7 days learning streak', date: 'Today' },
      ].map((a, i) =>
        React.createElement('div', {
          key: i,
          style: { margin: '0 20px 8px', background: '#fff', borderRadius: 12, padding: '12px 14px', display: 'flex', gap: 12, alignItems: 'center', border: `1px solid ${C.sand}` }
        },
          React.createElement('span', { style: { fontSize: 24 } }, a.icon),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('p', { style: { margin: 0, fontSize: 14, fontWeight: 700, color: C.brown } }, a.title),
            React.createElement('p', { style: { margin: '2px 0 0', fontSize: 12, color: C.muted } }, a.desc),
          ),
          React.createElement('span', { style: { fontSize: 11, color: C.muted } }, a.date),
        )
      ),
    );

  // ─── PROFILE SCREEN ────────────────────────────────────────────────────────
  const ProfileScreen = () => {
    const [notifs, setNotifs] = useState(true);
    const [contextAware, setContextAware] = useState(true);
    const [darkMode, setDarkMode] = useState(false);

    const Toggle = ({ val, onToggle, color }) =>
      React.createElement('div', {
        onClick: onToggle,
        style: { width: 44, height: 26, background: val ? (color || C.terra) : '#D4CBBA', borderRadius: 13, position: 'relative', cursor: 'pointer', transition: 'background 0.2s' }
      },
        React.createElement('div', { style: { position: 'absolute', top: 3, left: val ? 21 : 3, width: 20, height: 20, background: '#fff', borderRadius: '50%', transition: 'left 0.2s', boxShadow: '0 1px 4px rgba(0,0,0,0.2)' } }),
      );

    return React.createElement('div', { style: { flex: 1, overflowY: 'auto', paddingBottom: 20 } },
      // Profile hero
      React.createElement('div', { style: { padding: '16px 20px 0', display: 'flex', gap: 16, alignItems: 'center' } },
        React.createElement('div', { style: { width: 60, height: 60, background: `linear-gradient(135deg, ${C.terra}, ${C.softOrange})`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26 } }, '👩'),
        React.createElement('div', null,
          React.createElement('h2', { style: { margin: 0, fontSize: 20, fontWeight: 700, color: C.brown } }, 'Sarah Chen'),
          React.createElement('p', { style: { margin: '2px 0 0', fontSize: 13, color: C.muted } }, 'Member since January 2026'),
          React.createElement('div', { style: { display: 'flex', gap: 6, marginTop: 6 } },
            React.createElement('span', { style: { background: `${C.terra}22`, color: C.terra, fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 20 } }, '🔥 7-day streak'),
          ),
        ),
      ),
      // Settings sections
      ...[
        {
          title: 'Learning Preferences',
          items: [
            { label: 'Context-aware triggers', sub: 'Use location & calendar', toggle: contextAware, onToggle: () => setContextAware(v => !v), color: C.forest },
            { label: 'Smart notifications', sub: 'Only when you\'re ready', toggle: notifs, onToggle: () => setNotifs(v => !v) },
            { label: 'Dark mode', sub: 'Easier on the eyes at night', toggle: darkMode, onToggle: () => setDarkMode(v => !v) },
          ]
        },
        {
          title: 'Focus Areas',
          items: [
            { label: '💸 Finance', sub: '14 lessons · High interest', badge: 'Active' },
            { label: '🥗 Health', sub: '21 lessons · Your strongest area', badge: 'Active' },
            { label: '🌍 Language', sub: '7 lessons · Room to grow', badge: 'Growing' },
          ]
        },
        {
          title: 'App',
          items: [
            { label: 'Lesson history', sub: 'View all 62 completed lessons', arrow: true },
            { label: 'Export my data', sub: 'Download your learning journey', arrow: true },
            { label: 'Send feedback', sub: 'Help us improve Lesson Lens', arrow: true },
          ]
        },
      ].map((section, si) =>
        React.createElement('div', { key: si, style: { marginTop: 20 } },
          React.createElement('div', { style: { padding: '0 20px 8px' } },
            React.createElement('p', { style: { margin: 0, fontSize: 13, fontWeight: 700, color: C.muted, letterSpacing: 0.5, textTransform: 'uppercase' } }, section.title),
          ),
          React.createElement('div', { style: { margin: '0 20px', background: '#fff', borderRadius: 16, overflow: 'hidden', border: `1px solid ${C.sand}` } },
            ...section.items.map((item, ii) =>
              React.createElement('div', {
                key: ii,
                style: { padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: ii < section.items.length - 1 ? `1px solid ${C.sand}` : 'none' }
              },
                React.createElement('div', null,
                  React.createElement('p', { style: { margin: 0, fontSize: 14, fontWeight: 600, color: C.brown } }, item.label),
                  React.createElement('p', { style: { margin: '2px 0 0', fontSize: 12, color: C.muted } }, item.sub),
                ),
                item.toggle !== undefined
                  ? React.createElement(Toggle, { val: item.toggle, onToggle: item.onToggle, color: item.color })
                  : item.badge
                  ? React.createElement('span', { style: { fontSize: 11, fontWeight: 700, color: C.forest, background: `${C.forest}18`, padding: '3px 8px', borderRadius: 10 } }, item.badge)
                  : React.createElement('span', { style: { color: C.muted, fontSize: 18 } }, '›'),
              )
            )
          ),
        )
      ),
      React.createElement('p', { style: { textAlign: 'center', margin: '20px 0 0', fontSize: 12, color: C.muted } }, 'Lesson Lens · v1.0.0'),
    );
  };

  // ─── Bottom Nav ────────────────────────────────────────────────────────────
  const tabs = [
    { id: 'home', label: 'Today', emoji: '🏠' },
    { id: 'scan', label: 'Scan', emoji: '📷' },
    { id: 'map', label: 'Skills', emoji: '🗺️' },
    { id: 'profile', label: 'Profile', emoji: '👤' },
  ];

  const BottomNav = () =>
    React.createElement('div', {
      style: { borderTop: `1px solid ${C.sand}`, background: C.ivory, display: 'flex', paddingBottom: 8 }
    },
      ...tabs.map(t =>
        React.createElement('button', {
          key: t.id,
          onClick: () => { setTab(t.id); setScanPhase('idle'); },
          style: {
            flex: 1, padding: '10px 4px 4px', background: 'none', border: 'none', cursor: 'pointer',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
            fontFamily: "'DM Sans', sans-serif",
          }
        },
          React.createElement('div', { style: { fontSize: tab === t.id ? 22 : 20, filter: tab === t.id ? 'none' : 'grayscale(60%) opacity(0.55)', transition: 'all 0.15s' } }, t.emoji),
          React.createElement('span', { style: { fontSize: 10, fontWeight: tab === t.id ? 700 : 400, color: tab === t.id ? C.terra : C.muted, transition: 'all 0.15s' } }, t.label),
          tab === t.id && React.createElement('div', { style: { width: 4, height: 4, background: C.terra, borderRadius: '50%', marginTop: 1 } }),
        )
      )
    );

  const screens = { home: HomeScreen, scan: ScanScreen, map: MapScreen, profile: ProfileScreen };
  const Screen = screens[tab];

  // ─── Root Render ───────────────────────────────────────────────────────────
  return React.createElement('div', {
    style: { minHeight: '100vh', background: C.darkBg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'DM Sans', sans-serif", padding: '20px 0' }
  },
    // Phone frame
    React.createElement('div', {
      style: { width: 375, height: 812, background: C.ivory, borderRadius: 50, overflow: 'hidden', position: 'relative', display: 'flex', flexDirection: 'column', boxShadow: '0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.08) inset' }
    },
      // Lesson modal overlay
      openLesson && React.createElement(LessonModal),
      // Normal UI
      !openLesson && React.createElement(React.Fragment, null,
        React.createElement(StatusBar),
        React.createElement(DynamicIsland),
        // Page title
        React.createElement('div', { style: { padding: '6px 20px 0', display: 'flex', alignItems: 'center', gap: 8 } },
          React.createElement('span', { style: { fontSize: 22 } }, tabs.find(t => t.id === tab)?.emoji),
          React.createElement('span', { style: { fontSize: 13, fontWeight: 700, color: C.terra, letterSpacing: 0.5 } }, 'LESSON LENS'),
        ),
        React.createElement('div', { style: { flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' } },
          React.createElement(Screen),
        ),
        React.createElement(BottomNav),
      ),
    ),
  );
}
