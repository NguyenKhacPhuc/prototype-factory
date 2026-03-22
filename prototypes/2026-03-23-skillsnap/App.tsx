
const { useState, useEffect, useRef } = React;

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isDark, setIsDark] = useState(true);
  const [scanState, setScanState] = useState('idle'); // idle | scanning | result
  const [scanResult, setScanResult] = useState(null);
  const [quizActive, setQuizActive] = useState(false);
  const [quizAnswer, setQuizAnswer] = useState(null);
  const [savedSkills, setSavedSkills] = useState([0, 1, 2]);
  const [activeSkill, setActiveSkill] = useState(null);
  const [lessonActive, setLessonActive] = useState(null);
  const [lessonStep, setLessonStep] = useState(0);
  const scanTimerRef = useRef(null);

  const themes = {
    dark: {
      bg: '#080C18',
      surface: '#111827',
      card: '#1A2235',
      cardHover: '#1F2A40',
      border: '#2A3550',
      primary: '#00E5B8',
      primaryDim: '#00E5B830',
      primaryMid: '#00E5B860',
      secondary: '#7C6AFF',
      secondaryDim: '#7C6AFF25',
      accent: '#FF6B6B',
      accentDim: '#FF6B6B25',
      gold: '#FFB547',
      goldDim: '#FFB54725',
      text: '#F0F4FF',
      textSub: '#8896B3',
      textMuted: '#4A5568',
      navBg: '#0F1623',
      statusBar: '#080C18',
      inputBg: '#1A2235',
      success: '#00E5B8',
      warn: '#FFB547',
    },
    light: {
      bg: '#EEF2FF',
      surface: '#FFFFFF',
      card: '#FFFFFF',
      cardHover: '#F8FAFF',
      border: '#DDE3F5',
      primary: '#00B894',
      primaryDim: '#00B89420',
      primaryMid: '#00B89450',
      secondary: '#6C5CE7',
      secondaryDim: '#6C5CE720',
      accent: '#E84393',
      accentDim: '#E8439320',
      gold: '#F39C12',
      goldDim: '#F39C1220',
      text: '#1A2040',
      textSub: '#5A6480',
      textMuted: '#AAB4CC',
      navBg: '#FFFFFF',
      statusBar: '#EEF2FF',
      inputBg: '#F3F6FF',
      success: '#00B894',
      warn: '#F39C12',
    }
  };

  const t = isDark ? themes.dark : themes.light;

  // Font loader
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
      * { box-sizing: border-box; margin: 0; padding: 0; }
      ::-webkit-scrollbar { width: 0; }
      @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
      @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
      @keyframes scanLine { 0%{top:10%} 100%{top:90%} }
      @keyframes fadeIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
      @keyframes ripple { 0%{transform:scale(0);opacity:0.6} 100%{transform:scale(4);opacity:0} }
      @keyframes slideUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
      @keyframes glow { 0%,100%{box-shadow:0 0 20px #00E5B840} 50%{box-shadow:0 0 40px #00E5B880} }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const scanResults = [
    {
      type: 'Transit Sign',
      icon: '🚌',
      confidence: 96,
      title: 'Reading Bus Timetables',
      summary: 'This is a bus schedule showing departure times in 24h format.',
      steps: [
        { heading: 'Find your route number', body: 'Look at the bold number at the top of each column — that\'s your route. Route 42 runs every 15 min during peak hours.' },
        { heading: 'Read the time format', body: 'Times shown as 14:35 mean 2:35 PM. The bold times indicate the last guaranteed connection at that stop.' },
        { heading: 'Check the frequency band', body: 'The colored bar shows service frequency: green = every 10min, yellow = every 30min, red = limited service.' },
        { heading: 'Spot your stop code', body: 'The 4-digit code on the sign pole (e.g. 2847) lets you get live arrival times by SMS or the transit app.' },
      ],
      quiz: {
        q: 'A timetable shows "16:05" — what time is this?',
        options: ['6:05 AM', '4:05 PM', '4:05 AM', '16 minutes past 5'],
        correct: 1,
      }
    },
    {
      type: 'Instruction Manual',
      icon: '📋',
      confidence: 91,
      title: 'Flat-Pack Assembly Guide',
      summary: 'Assembly instructions for a 3-shelf bookcase with cam-lock fittings.',
      steps: [
        { heading: 'Sort all parts first', body: 'Lay everything out and match each item to the parts list. Cam locks (round discs) and dowels (wooden cylinders) are most commonly missing.' },
        { heading: 'Follow the arrows', body: 'Assembly diagrams show a solid arrow for "push in" and a dotted arrow for "screw in". Never force a piece — if it resists, check orientation.' },
        { heading: 'Cam locks go in last', body: 'Insert all dowels and screws loosely first. Once the frame is aligned, tighten cam locks clockwise with a flat-head screwdriver.' },
        { heading: 'Check squareness', body: 'Before final tightening, place on a flat floor and press one corner. If it rocks, adjust the cam locks on the opposite side.' },
      ],
      quiz: {
        q: 'When should you tighten cam locks?',
        options: ['First, to hold parts in place', 'After all parts are loosely assembled', 'One at a time as you build', 'Only if the unit wobbles'],
        correct: 1,
      }
    },
    {
      type: 'Grocery Label',
      icon: '🛒',
      confidence: 88,
      title: 'Comparing Unit Prices',
      summary: 'Nutrition and pricing label from a supermarket product.',
      steps: [
        { heading: 'Find the unit price tag', body: 'The small text on the shelf edge (e.g. "$0.42 / 100g") is the unit price. Always compare this — not the total package price.' },
        { heading: 'Match the units', body: 'Compare per 100g vs per 100g, or per litre vs per litre. Don\'t mix grams and millilitres for solid vs liquid products.' },
        { heading: 'Check the serving size trap', body: 'A product may show low calories but per 30g serving. Multiply to compare against a product showing per 100g.' },
        { heading: 'Apply the rule', body: 'Lower unit price = better value. A larger pack at $4.80 (per 100g: $0.38) beats a smaller pack at $2.10 (per 100g: $0.52).' },
      ],
      quiz: {
        q: 'Which is better value: 500g for $3.00 or 200g for $1.00?',
        options: ['200g pack — it\'s cheaper', '500g pack — lower unit price', 'They\'re the same value', 'Depends on the brand'],
        correct: 1,
      }
    },
  ];

  const allSkills = [
    { id: 0, title: 'Reading Bus Timetables', icon: '🚌', category: 'Transit', date: 'Today', mastery: 85, location: 'Central Station', color: t.secondary },
    { id: 1, title: 'Unit Price Comparison', icon: '🛒', category: 'Finance', date: 'Yesterday', mastery: 70, location: 'Woolworths CBD', color: t.primary },
    { id: 2, title: 'Flat-Pack Assembly', icon: '🔧', category: 'DIY', date: '2 days ago', mastery: 60, location: 'Home', color: t.gold },
    { id: 3, title: 'Medication Label Reading', icon: '💊', category: 'Health', date: '5 days ago', mastery: 90, location: 'Pharmacy', color: t.accent },
    { id: 4, title: 'Workplace Safety Signs', icon: '⚠️', category: 'Work', date: '1 week ago', mastery: 75, location: 'Office', color: '#FF6B35' },
    { id: 5, title: 'Parking Sign Decoding', icon: '🅿️', category: 'Transit', date: '2 weeks ago', mastery: 95, location: 'City Centre', color: t.secondary },
  ];

  const offlineLessons = [
    { icon: '💊', title: 'Reading Medicine Labels', desc: 'Dosage, warnings, expiry dates', color: t.accent },
    { icon: '🗺️', title: 'Navigating Transit Maps', desc: 'Lines, zones, transfers', color: t.secondary },
    { icon: '🔥', title: 'Fire Extinguisher Types', desc: 'PASS method, fire classes', color: t.gold },
    { icon: '📋', title: 'Filling Official Forms', desc: 'Common fields explained', color: t.primary },
  ];

  const startScan = () => {
    setScanState('scanning');
    setScanResult(null);
    setQuizActive(false);
    setQuizAnswer(null);
    scanTimerRef.current = setTimeout(() => {
      const result = scanResults[Math.floor(Math.random() * scanResults.length)];
      setScanResult(result);
      setScanState('result');
    }, 2800);
  };

  const resetScan = () => {
    if (scanTimerRef.current) clearTimeout(scanTimerRef.current);
    setScanState('idle');
    setScanResult(null);
    setQuizActive(false);
    setQuizAnswer(null);
    setLessonStep(0);
  };

  // ── Screens ──────────────────────────────────────────────────────────────

  function HomeScreen() {
    const [pressedCard, setPressedCard] = useState(null);
    const dailyTip = { icon: '🧾', title: 'Decode a Pay Slip', body: 'Tap Scan and point at any payroll document to understand gross pay, net pay, and deductions in 30 seconds.' };

    return React.createElement('div', {
      style: { flex: 1, overflowY: 'auto', padding: '0 0 12px' }
    },
      // Header
      React.createElement('div', {
        style: { padding: '16px 20px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }
      },
        React.createElement('div', null,
          React.createElement('div', { style: { fontSize: 12, color: t.textMuted, fontWeight: 500, letterSpacing: 1, textTransform: 'uppercase' } }, 'Monday, March 23'),
          React.createElement('div', { style: { fontSize: 22, fontWeight: 800, color: t.text, lineHeight: 1.2, marginTop: 2 } }, 'Good morning, Alex'),
        ),
        React.createElement('div', {
          style: { width: 40, height: 40, borderRadius: 20, background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }
        }, '👤')
      ),

      // Big scan CTA
      React.createElement('div', {
        style: { margin: '8px 20px 20px', borderRadius: 20, background: `linear-gradient(135deg, ${t.primary}22, ${t.secondary}22)`, border: `1.5px solid ${t.primary}40`, padding: '20px', position: 'relative', overflow: 'hidden', cursor: 'pointer', animation: 'glow 3s ease-in-out infinite' },
        onClick: () => setActiveTab('scan')
      },
        React.createElement('div', {
          style: { position: 'absolute', top: -20, right: -20, width: 100, height: 100, borderRadius: 50, background: t.primary + '15' }
        }),
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 14 } },
          React.createElement('div', {
            style: { width: 52, height: 52, borderRadius: 16, background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }
          },
            React.createElement(window.lucide.Camera, { size: 24, color: '#000', strokeWidth: 2.5 })
          ),
          React.createElement('div', null,
            React.createElement('div', { style: { fontSize: 16, fontWeight: 700, color: t.text } }, 'Snap to Learn'),
            React.createElement('div', { style: { fontSize: 12, color: t.textSub, marginTop: 3 } }, 'Point at anything around you — a sign, label, form, or manual'),
          )
        ),
        React.createElement('div', {
          style: { marginTop: 14, display: 'flex', alignItems: 'center', gap: 6, color: t.primary, fontSize: 13, fontWeight: 600 }
        },
          React.createElement('span', null, 'Open Camera'),
          React.createElement(window.lucide.ArrowRight, { size: 14 })
        )
      ),

      // Daily challenge
      React.createElement('div', { style: { padding: '0 20px', marginBottom: 20 } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 } },
          React.createElement('span', { style: { fontSize: 13, fontWeight: 700, color: t.textSub, textTransform: 'uppercase', letterSpacing: 0.8 } }, "Today's Skill"),
          React.createElement('span', { style: { fontSize: 12, color: t.primary, fontWeight: 600, cursor: 'pointer' } }, 'See all')
        ),
        React.createElement('div', {
          style: { borderRadius: 16, background: t.card, border: `1px solid ${t.border}`, padding: 16, display: 'flex', gap: 14, alignItems: 'flex-start', cursor: 'pointer' },
          onClick: () => { setLessonActive(scanResults[0]); setLessonStep(0); setActiveTab('scan'); setScanState('result'); setScanResult(scanResults[0]); }
        },
          React.createElement('div', { style: { fontSize: 32, lineHeight: 1 } }, dailyTip.icon),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', { style: { fontSize: 15, fontWeight: 700, color: t.text, marginBottom: 4 } }, dailyTip.title),
            React.createElement('div', { style: { fontSize: 12, color: t.textSub, lineHeight: 1.5 } }, dailyTip.body),
            React.createElement('div', {
              style: { marginTop: 10, display: 'inline-flex', alignItems: 'center', gap: 5, background: t.primaryDim, color: t.primary, fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 20 }
            },
              React.createElement(window.lucide.Zap, { size: 11 }),
              React.createElement('span', null, '30-sec lesson')
            )
          )
        )
      ),

      // Recent sessions
      React.createElement('div', { style: { padding: '0 20px' } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 } },
          React.createElement('span', { style: { fontSize: 13, fontWeight: 700, color: t.textSub, textTransform: 'uppercase', letterSpacing: 0.8 } }, 'Recent Snaps'),
          React.createElement('span', { style: { fontSize: 12, color: t.primary, fontWeight: 600, cursor: 'pointer' }, onClick: () => setActiveTab('skills') }, 'View all')
        ),
        allSkills.slice(0, 3).map((skill, i) =>
          React.createElement('div', {
            key: skill.id,
            style: {
              borderRadius: 14, background: pressedCard === i ? t.cardHover : t.card, border: `1px solid ${t.border}`,
              padding: '12px 14px', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 12,
              cursor: 'pointer', transition: 'all 0.15s', animation: `fadeIn 0.3s ease ${i * 0.05}s both`
            },
            onMouseDown: () => setPressedCard(i),
            onMouseUp: () => setPressedCard(null),
            onClick: () => setActiveTab('skills')
          },
            React.createElement('div', {
              style: { width: 40, height: 40, borderRadius: 12, background: skill.color + '22', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }
            }, skill.icon),
            React.createElement('div', { style: { flex: 1, minWidth: 0 } },
              React.createElement('div', { style: { fontSize: 13, fontWeight: 600, color: t.text, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' } }, skill.title),
              React.createElement('div', { style: { fontSize: 11, color: t.textMuted, marginTop: 2 } }, `${skill.category} · ${skill.date}`)
            ),
            React.createElement('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 } },
              React.createElement('div', { style: { fontSize: 12, fontWeight: 700, color: skill.color } }, `${skill.mastery}%`),
              React.createElement('div', {
                style: { width: 50, height: 4, borderRadius: 2, background: t.border, overflow: 'hidden' }
              },
                React.createElement('div', { style: { width: `${skill.mastery}%`, height: '100%', borderRadius: 2, background: skill.color } })
              )
            )
          )
        )
      ),

      // Streak section
      React.createElement('div', { style: { padding: '20px 20px 0' } },
        React.createElement('div', { style: { borderRadius: 16, background: t.card, border: `1px solid ${t.border}`, padding: 16 } },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 } },
            React.createElement('span', { style: { fontSize: 13, fontWeight: 700, color: t.text } }, 'Learning Streak'),
            React.createElement('span', { style: { fontSize: 20 } }, '🔥')
          ),
          React.createElement('div', { style: { display: 'flex', gap: 6 } },
            ['M','T','W','T','F','S','S'].map((day, i) =>
              React.createElement('div', { key: i, style: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 } },
                React.createElement('div', {
                  style: { width: '100%', aspectRatio: '1', borderRadius: 8, background: i < 4 ? t.primary : t.border, display: 'flex', alignItems: 'center', justifyContent: 'center' }
                },
                  i < 4 ? React.createElement(window.lucide.Check, { size: 12, color: '#000', strokeWidth: 3 }) : null
                ),
                React.createElement('span', { style: { fontSize: 9, color: t.textMuted, fontWeight: 600 } }, day)
              )
            )
          ),
          React.createElement('div', { style: { marginTop: 10, fontSize: 12, color: t.textSub } }, '4-day streak · Best: 12 days')
        )
      )
    );
  }

  function ScanScreen() {
    return React.createElement('div', { style: { flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' } },
      scanState === 'idle' && React.createElement('div', {
        style: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24, gap: 0 }
      },
        // Viewfinder mock
        React.createElement('div', {
          style: { width: 280, height: 220, borderRadius: 20, background: isDark ? '#0A1020' : '#1A2040', position: 'relative', overflow: 'hidden', marginBottom: 28, border: `2px solid ${t.primary}50` }
        },
          React.createElement('div', { style: { position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, transparent 40%, transparent 60%, rgba(0,0,0,0.4) 100%)' } }),
          // corner brackets
          ['tl','tr','bl','br'].map(corner => {
            const isTop = corner.startsWith('t');
            const isLeft = corner.endsWith('l');
            return React.createElement('div', { key: corner, style: {
              position: 'absolute',
              [isTop ? 'top' : 'bottom']: 16,
              [isLeft ? 'left' : 'right']: 16,
              width: 24, height: 24,
              borderTop: isTop ? `3px solid ${t.primary}` : 'none',
              borderBottom: !isTop ? `3px solid ${t.primary}` : 'none',
              borderLeft: isLeft ? `3px solid ${t.primary}` : 'none',
              borderRight: !isLeft ? `3px solid ${t.primary}` : 'none',
            }});
          }),
          React.createElement('div', { style: { position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 8 } },
            React.createElement(window.lucide.Camera, { size: 36, color: t.primary + '80' }),
            React.createElement('span', { style: { fontSize: 12, color: t.primary + '80', fontWeight: 500 } }, 'Point at anything')
          )
        ),
        React.createElement('div', { style: { fontSize: 22, fontWeight: 800, color: t.text, textAlign: 'center', marginBottom: 8 } }, 'What do you need help with?'),
        React.createElement('div', { style: { fontSize: 14, color: t.textSub, textAlign: 'center', lineHeight: 1.6, marginBottom: 32 } }, 'Point your camera at a sign, label, form, or document and get an instant micro-lesson.'),

        React.createElement('button', {
          style: { width: 220, height: 56, borderRadius: 28, background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})`, border: 'none', color: '#000', fontSize: 16, fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, boxShadow: `0 8px 32px ${t.primary}50` },
          onClick: startScan
        },
          React.createElement(window.lucide.Camera, { size: 20, strokeWidth: 2.5 }),
          React.createElement('span', null, 'Snap & Learn')
        ),

        // quick examples
        React.createElement('div', { style: { marginTop: 28, display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' } },
          ['Bus timetable', 'Medicine label', 'Assembly guide', 'Price tag', 'Work form'].map(tag =>
            React.createElement('div', {
              key: tag,
              style: { padding: '5px 12px', borderRadius: 20, border: `1px solid ${t.border}`, fontSize: 11, color: t.textSub, fontWeight: 500, cursor: 'pointer' }
            }, tag)
          )
        )
      ),

      scanState === 'scanning' && React.createElement('div', {
        style: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24, gap: 16 }
      },
        React.createElement('div', {
          style: { width: 280, height: 220, borderRadius: 20, background: isDark ? '#0A1020' : '#1A2040', position: 'relative', overflow: 'hidden', border: `2px solid ${t.primary}` }
        },
          // simulated scene
          React.createElement('div', { style: { position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', padding: 16, gap: 8, justifyContent: 'center' } },
            [1,2,3,4].map(row => React.createElement('div', { key: row, style: { height: 12, borderRadius: 6, background: isDark ? '#FFFFFF15' : '#00000020', width: row === 1 ? '60%' : row === 3 ? '80%' : '100%' } }))
          ),
          // scan line
          React.createElement('div', { style: {
            position: 'absolute', left: 0, right: 0, height: 2,
            background: `linear-gradient(90deg, transparent, ${t.primary}, transparent)`,
            animation: 'scanLine 1.2s ease-in-out infinite', top: '20%',
            boxShadow: `0 0 12px ${t.primary}`
          }}),
          React.createElement('div', { style: { position: 'absolute', inset: 0, background: `${t.primary}10` } })
        ),
        React.createElement('div', { style: { fontSize: 16, fontWeight: 700, color: t.text } }, 'Analyzing scene...'),
        React.createElement('div', { style: { display: 'flex', gap: 6 } },
          [0,1,2].map(i => React.createElement('div', { key: i, style: {
            width: 8, height: 8, borderRadius: 4, background: t.primary,
            animation: `pulse 1s ease-in-out ${i * 0.2}s infinite`
          }}))
        )
      ),

      scanState === 'result' && scanResult && React.createElement('div', {
        style: { flex: 1, overflowY: 'auto', animation: 'slideUp 0.4s ease' }
      },
        // Result header
        React.createElement('div', {
          style: { margin: '16px 20px 0', borderRadius: 18, background: `linear-gradient(135deg, ${t.primary}20, ${t.secondary}15)`, border: `1.5px solid ${t.primary}40`, padding: '16px' }
        },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 } },
            React.createElement('div', { style: { fontSize: 32 } }, scanResult.icon),
            React.createElement('div', null,
              React.createElement('div', { style: { fontSize: 11, color: t.primary, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 2 } }, scanResult.type),
              React.createElement('div', { style: { fontSize: 17, fontWeight: 800, color: t.text, lineHeight: 1.2 } }, scanResult.title),
            ),
            React.createElement('div', { style: { marginLeft: 'auto', background: t.primaryDim, color: t.primary, fontSize: 12, fontWeight: 700, padding: '4px 8px', borderRadius: 8, textAlign: 'center' } },
              React.createElement('div', null, scanResult.confidence + '%'),
              React.createElement('div', { style: { fontSize: 9, opacity: 0.7 } }, 'match')
            )
          ),
          React.createElement('div', { style: { fontSize: 13, color: t.textSub, lineHeight: 1.5 } }, scanResult.summary)
        ),

        // Lesson steps
        React.createElement('div', { style: { padding: '16px 20px' } },
          React.createElement('div', { style: { fontSize: 13, fontWeight: 700, color: t.textSub, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 12 } }, 'Micro-Lesson'),
          scanResult.steps.map((step, i) =>
            React.createElement('div', {
              key: i,
              style: { display: 'flex', gap: 12, marginBottom: 14, animation: `fadeIn 0.3s ease ${i * 0.08}s both` }
            },
              React.createElement('div', {
                style: { width: 26, height: 26, borderRadius: 13, background: i <= lessonStep ? `linear-gradient(135deg, ${t.primary}, ${t.secondary})` : t.border, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1, transition: 'background 0.3s' }
              },
                React.createElement('span', { style: { fontSize: 11, fontWeight: 800, color: i <= lessonStep ? '#000' : t.textMuted } }, i + 1)
              ),
              React.createElement('div', {
                style: { flex: 1, borderRadius: 14, background: i <= lessonStep ? t.card : t.card + '60', border: `1px solid ${i <= lessonStep ? t.border : t.border + '60'}`, padding: 12, transition: 'all 0.3s', opacity: i <= lessonStep ? 1 : 0.45 }
              },
                React.createElement('div', { style: { fontSize: 13, fontWeight: 700, color: t.text, marginBottom: 4 } }, step.heading),
                React.createElement('div', { style: { fontSize: 12, color: t.textSub, lineHeight: 1.6 } }, step.body)
              )
            )
          ),

          lessonStep < scanResult.steps.length - 1
            ? React.createElement('button', {
                style: { width: '100%', height: 48, borderRadius: 14, background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})`, border: 'none', color: '#000', fontSize: 14, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 },
                onClick: () => setLessonStep(s => s + 1)
              },
                React.createElement('span', null, 'Next Step'),
                React.createElement(window.lucide.ArrowRight, { size: 16 })
              )
            : !quizActive
              ? React.createElement('button', {
                  style: { width: '100%', height: 48, borderRadius: 14, background: `linear-gradient(135deg, ${t.gold}, #FF6B35)`, border: 'none', color: '#000', fontSize: 14, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 },
                  onClick: () => setQuizActive(true)
                },
                  React.createElement(window.lucide.Brain, { size: 16 }),
                  React.createElement('span', null, 'Test Your Knowledge')
                )
              : null
        ),

        // Quiz
        quizActive && React.createElement('div', {
          style: { margin: '0 20px 20px', borderRadius: 18, border: `1.5px solid ${t.gold}40`, background: t.goldDim, padding: 16, animation: 'slideUp 0.3s ease' }
        },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 } },
            React.createElement(window.lucide.Brain, { size: 16, color: t.gold }),
            React.createElement('span', { style: { fontSize: 12, fontWeight: 700, color: t.gold, textTransform: 'uppercase', letterSpacing: 0.8 } }, 'Quick Quiz')
          ),
          React.createElement('div', { style: { fontSize: 14, fontWeight: 600, color: t.text, lineHeight: 1.5, marginBottom: 14 } }, scanResult.quiz.q),
          scanResult.quiz.options.map((opt, i) =>
            React.createElement('button', {
              key: i,
              style: {
                width: '100%', borderRadius: 12, padding: '11px 14px', border: `1.5px solid`,
                borderColor: quizAnswer === null ? t.border : quizAnswer === i ? (i === scanResult.quiz.correct ? t.primary : t.accent) : i === scanResult.quiz.correct && quizAnswer !== null ? t.primary : t.border,
                background: quizAnswer === null ? t.card : quizAnswer === i ? (i === scanResult.quiz.correct ? t.primaryDim : t.accentDim) : i === scanResult.quiz.correct && quizAnswer !== null ? t.primaryDim : t.card,
                color: t.text, fontSize: 13, fontWeight: 500, textAlign: 'left', cursor: quizAnswer === null ? 'pointer' : 'default',
                marginBottom: 8, transition: 'all 0.2s', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
              },
              onClick: () => quizAnswer === null && setQuizAnswer(i)
            },
              React.createElement('span', null, opt),
              quizAnswer !== null && i === scanResult.quiz.correct && React.createElement(window.lucide.Check, { size: 14, color: t.primary }),
              quizAnswer === i && i !== scanResult.quiz.correct && React.createElement(window.lucide.X, { size: 14, color: t.accent })
            )
          ),
          quizAnswer !== null && React.createElement('div', {
            style: { marginTop: 8, padding: '10px 12px', borderRadius: 12, background: quizAnswer === scanResult.quiz.correct ? t.primaryDim : t.accentDim, fontSize: 12, color: quizAnswer === scanResult.quiz.correct ? t.primary : t.accent, fontWeight: 600 }
          }, quizAnswer === scanResult.quiz.correct ? '✓ Correct! Lesson saved to your Skills library.' : 'Not quite — the correct answer is highlighted above.'),
          quizAnswer !== null && React.createElement('button', {
            style: { width: '100%', marginTop: 12, height: 44, borderRadius: 12, background: t.card, border: `1px solid ${t.border}`, color: t.textSub, fontSize: 13, fontWeight: 600, cursor: 'pointer' },
            onClick: resetScan
          }, 'Scan another →')
        )
      )
    );
  }

  function SkillsScreen() {
    const [filter, setFilter] = useState('All');
    const categories = ['All', 'Transit', 'Finance', 'DIY', 'Health', 'Work'];
    const filtered = filter === 'All' ? allSkills : allSkills.filter(s => s.category === filter);

    return React.createElement('div', { style: { flex: 1, overflowY: 'auto' } },
      // Header
      React.createElement('div', { style: { padding: '16px 20px 4px' } },
        React.createElement('div', { style: { fontSize: 22, fontWeight: 800, color: t.text, marginBottom: 4 } }, 'My Skills Library'),
        React.createElement('div', { style: { fontSize: 13, color: t.textSub } }, `${allSkills.length} skills · 4-day streak 🔥`),
      ),

      // Stats row
      React.createElement('div', { style: { padding: '12px 20px', display: 'flex', gap: 10 } },
        [
          { label: 'Snaps', value: '24', icon: '📸', color: t.primary },
          { label: 'Mastered', value: '6', icon: '⭐', color: t.gold },
          { label: 'Streak', value: '4d', icon: '🔥', color: t.accent },
        ].map(stat =>
          React.createElement('div', {
            key: stat.label,
            style: { flex: 1, borderRadius: 14, background: t.card, border: `1px solid ${t.border}`, padding: '12px 8px', textAlign: 'center' }
          },
            React.createElement('div', { style: { fontSize: 20, marginBottom: 4 } }, stat.icon),
            React.createElement('div', { style: { fontSize: 18, fontWeight: 800, color: stat.color } }, stat.value),
            React.createElement('div', { style: { fontSize: 10, color: t.textMuted, fontWeight: 600 } }, stat.label)
          )
        )
      ),

      // Category filter
      React.createElement('div', {
        style: { padding: '4px 20px 12px', display: 'flex', gap: 8, overflowX: 'auto' }
      },
        categories.map(cat =>
          React.createElement('button', {
            key: cat,
            style: {
              padding: '6px 14px', borderRadius: 20, border: `1.5px solid`,
              borderColor: filter === cat ? t.primary : t.border,
              background: filter === cat ? t.primaryDim : 'transparent',
              color: filter === cat ? t.primary : t.textSub,
              fontSize: 12, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.2s'
            },
            onClick: () => setFilter(cat)
          }, cat)
        )
      ),

      // Skills list
      React.createElement('div', { style: { padding: '0 20px 20px' } },
        filtered.map((skill, i) =>
          React.createElement('div', {
            key: skill.id,
            style: { borderRadius: 16, background: t.card, border: `1px solid ${t.border}`, padding: '14px', marginBottom: 10, animation: `fadeIn 0.3s ease ${i * 0.05}s both` }
          },
            React.createElement('div', { style: { display: 'flex', alignItems: 'flex-start', gap: 12 } },
              React.createElement('div', {
                style: { width: 46, height: 46, borderRadius: 14, background: skill.color + '25', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }
              }, skill.icon),
              React.createElement('div', { style: { flex: 1, minWidth: 0 } },
                React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 } },
                  React.createElement('div', { style: { fontSize: 14, fontWeight: 700, color: t.text } }, skill.title),
                  React.createElement('div', { style: { fontSize: 12, fontWeight: 800, color: skill.color } }, skill.mastery + '%')
                ),
                React.createElement('div', { style: { display: 'flex', gap: 8, marginBottom: 8 } },
                  React.createElement('span', { style: { fontSize: 11, color: t.textMuted } }, `📍 ${skill.location}`),
                  React.createElement('span', { style: { fontSize: 11, color: t.textMuted } }, `· ${skill.date}`)
                ),
                React.createElement('div', { style: { height: 5, borderRadius: 3, background: t.border, overflow: 'hidden' } },
                  React.createElement('div', { style: { width: `${skill.mastery}%`, height: '100%', borderRadius: 3, background: `linear-gradient(90deg, ${skill.color}, ${skill.color}AA)`, transition: 'width 0.5s ease' } })
                )
              )
            )
          )
        )
      ),

      // Offline lessons
      React.createElement('div', { style: { padding: '0 20px 24px' } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 } },
          React.createElement('span', { style: { fontSize: 13, fontWeight: 700, color: t.textSub, textTransform: 'uppercase', letterSpacing: 0.8 } }, 'Offline Emergency Lessons'),
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4, background: t.successDim || t.primaryDim, padding: '3px 8px', borderRadius: 10 } },
            React.createElement(window.lucide.WifiOff, { size: 10, color: t.primary }),
            React.createElement('span', { style: { fontSize: 10, color: t.primary, fontWeight: 700 } }, 'Available offline')
          )
        ),
        React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 } },
          offlineLessons.map(lesson =>
            React.createElement('div', {
              key: lesson.title,
              style: { borderRadius: 14, background: lesson.color + '18', border: `1px solid ${lesson.color}30`, padding: '14px 12px', cursor: 'pointer' }
            },
              React.createElement('div', { style: { fontSize: 24, marginBottom: 8 } }, lesson.icon),
              React.createElement('div', { style: { fontSize: 12, fontWeight: 700, color: t.text, marginBottom: 4, lineHeight: 1.3 } }, lesson.title),
              React.createElement('div', { style: { fontSize: 10, color: t.textSub } }, lesson.desc)
            )
          )
        )
      )
    );
  }

  function ProfileScreen() {
    const [notifs, setNotifs] = useState(true);
    const [adaptive, setAdaptive] = useState(true);
    const [offlineMode, setOfflineMode] = useState(false);

    const Toggle = ({ value, onChange }) => React.createElement('div', {
      style: { width: 44, height: 24, borderRadius: 12, background: value ? t.primary : t.border, position: 'relative', cursor: 'pointer', transition: 'background 0.25s', flexShrink: 0 },
      onClick: () => onChange(!value)
    },
      React.createElement('div', {
        style: { position: 'absolute', width: 18, height: 18, borderRadius: 9, background: '#FFF', top: 3, left: value ? 23 : 3, transition: 'left 0.25s', boxShadow: '0 1px 4px rgba(0,0,0,0.3)' }
      })
    );

    return React.createElement('div', { style: { flex: 1, overflowY: 'auto' } },
      // Profile hero
      React.createElement('div', {
        style: { padding: '20px', background: `linear-gradient(180deg, ${t.primary}18, transparent)`, marginBottom: 4 }
      },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 } },
          React.createElement('div', {
            style: { width: 64, height: 64, borderRadius: 32, background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, flexShrink: 0 }
          }, '👤'),
          React.createElement('div', null,
            React.createElement('div', { style: { fontSize: 20, fontWeight: 800, color: t.text } }, 'Alex Rivera'),
            React.createElement('div', { style: { fontSize: 13, color: t.textSub, marginTop: 2 } }, 'Skill level: Curious Explorer'),
            React.createElement('div', {
              style: { display: 'inline-flex', alignItems: 'center', gap: 5, background: t.primaryDim, color: t.primary, fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 20, marginTop: 6 }
            },
              React.createElement(window.lucide.Award, { size: 11 }),
              React.createElement('span', null, 'Level 4 Learner')
            )
          )
        ),
        // Achievement badges
        React.createElement('div', { style: { display: 'flex', gap: 8 } },
          [
            { icon: '🔥', label: '4-day streak', color: t.accent },
            { icon: '📸', label: '24 snaps', color: t.primary },
            { icon: '⭐', label: '6 mastered', color: t.gold },
          ].map(badge =>
            React.createElement('div', {
              key: badge.label,
              style: { flex: 1, borderRadius: 12, background: badge.color + '20', border: `1px solid ${badge.color}30`, padding: '8px 6px', textAlign: 'center' }
            },
              React.createElement('div', { style: { fontSize: 18, marginBottom: 3 } }, badge.icon),
              React.createElement('div', { style: { fontSize: 10, color: badge.color, fontWeight: 600 } }, badge.label)
            )
          )
        )
      ),

      // Settings section
      React.createElement('div', { style: { padding: '0 20px 20px' } },

        // Theme toggle
        React.createElement('div', { style: { marginBottom: 16 } },
          React.createElement('div', { style: { fontSize: 11, fontWeight: 700, color: t.textMuted, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 } }, 'Appearance'),
          React.createElement('div', {
            style: { borderRadius: 16, background: t.card, border: `1px solid ${t.border}`, overflow: 'hidden' }
          },
            React.createElement('div', {
              style: { padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }
            },
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12 } },
                React.createElement('div', { style: { width: 36, height: 36, borderRadius: 10, background: t.secondaryDim, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
                  isDark ? React.createElement(window.lucide.Moon, { size: 18, color: t.secondary }) : React.createElement(window.lucide.Sun, { size: 18, color: t.gold })
                ),
                React.createElement('div', null,
                  React.createElement('div', { style: { fontSize: 14, fontWeight: 600, color: t.text } }, isDark ? 'Dark Mode' : 'Light Mode'),
                  React.createElement('div', { style: { fontSize: 11, color: t.textMuted } }, 'Switch theme')
                )
              ),
              React.createElement(Toggle, { value: isDark, onChange: setIsDark })
            )
          )
        ),

        // Learning settings
        React.createElement('div', { style: { marginBottom: 16 } },
          React.createElement('div', { style: { fontSize: 11, fontWeight: 700, color: t.textMuted, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 } }, 'Learning'),
          React.createElement('div', {
            style: { borderRadius: 16, background: t.card, border: `1px solid ${t.border}`, overflow: 'hidden' }
          },
            [
              { icon: window.lucide.Bell, label: 'Lesson reminders', sub: 'Daily nudges to practice', color: t.accent, value: notifs, onChange: setNotifs },
              { icon: window.lucide.Cpu, label: 'Adaptive coaching', sub: 'Adjust to your pace', color: t.secondary, value: adaptive, onChange: setAdaptive },
              { icon: window.lucide.WifiOff, label: 'Offline lesson pack', sub: '4 emergency lessons', color: t.primary, value: offlineMode, onChange: setOfflineMode },
            ].map((item, i, arr) =>
              React.createElement('div', {
                key: item.label,
                style: { padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: i < arr.length - 1 ? `1px solid ${t.border}` : 'none' }
              },
                React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12 } },
                  React.createElement('div', { style: { width: 36, height: 36, borderRadius: 10, background: item.color + '20', display: 'flex', alignItems: 'center', justifyContent: 'center' } },
                    React.createElement(item.icon, { size: 17, color: item.color })
                  ),
                  React.createElement('div', null,
                    React.createElement('div', { style: { fontSize: 14, fontWeight: 600, color: t.text } }, item.label),
                    React.createElement('div', { style: { fontSize: 11, color: t.textMuted } }, item.sub)
                  )
                ),
                React.createElement(Toggle, { value: item.value, onChange: item.onChange })
              )
            )
          )
        ),

        // Account options
        React.createElement('div', null,
          React.createElement('div', { style: { fontSize: 11, fontWeight: 700, color: t.textMuted, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 } }, 'Account'),
          React.createElement('div', {
            style: { borderRadius: 16, background: t.card, border: `1px solid ${t.border}`, overflow: 'hidden' }
          },
            [
              { icon: window.lucide.Download, label: 'Export my skills', color: t.primary },
              { icon: window.lucide.Share2, label: 'Share progress', color: t.secondary },
              { icon: window.lucide.HelpCircle, label: 'Help & feedback', color: t.textSub },
            ].map((item, i, arr) =>
              React.createElement('div', {
                key: item.label,
                style: { padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: i < arr.length - 1 ? `1px solid ${t.border}` : 'none', cursor: 'pointer' }
              },
                React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12 } },
                  React.createElement('div', { style: { width: 36, height: 36, borderRadius: 10, background: item.color + '20', display: 'flex', alignItems: 'center', justifyContent: 'center' } },
                    React.createElement(item.icon, { size: 17, color: item.color })
                  ),
                  React.createElement('div', { style: { fontSize: 14, fontWeight: 600, color: t.text } }, item.label)
                ),
                React.createElement(window.lucide.ChevronRight, { size: 16, color: t.textMuted })
              )
            )
          )
        )
      )
    );
  }

  function ExploreScreen() {
    const topics = [
      { icon: '🚦', label: 'Traffic & Signs', count: 12, color: t.accent },
      { icon: '🏥', label: 'Health Docs', count: 8, color: '#FF6B6B' },
      { icon: '💼', label: 'Workplace', count: 15, color: t.secondary },
      { icon: '🏠', label: 'Home & DIY', count: 20, color: t.gold },
      { icon: '🛍️', label: 'Shopping Smart', count: 9, color: t.primary },
      { icon: '✈️', label: 'Travel & Transit', count: 17, color: '#00B4D8' },
      { icon: '📄', label: 'Forms & Legal', count: 11, color: '#B5838D' },
      { icon: '📱', label: 'Tech & Devices', count: 14, color: '#6C63FF' },
    ];

    const trending = [
      { icon: '💊', title: 'Reading Prescription Labels', snaps: '2.1k', color: '#FF6B6B' },
      { icon: '🧾', title: 'Understanding Pay Slips', snaps: '1.8k', color: t.primary },
      { icon: '🔌', title: 'Electrical Safety Signs', snaps: '1.4k', color: t.gold },
    ];

    return React.createElement('div', { style: { flex: 1, overflowY: 'auto' } },
      React.createElement('div', { style: { padding: '16px 20px 12px' } },
        React.createElement('div', { style: { fontSize: 22, fontWeight: 800, color: t.text, marginBottom: 4 } }, 'Explore Topics'),
        React.createElement('div', { style: { fontSize: 13, color: t.textSub } }, 'Browse skill categories & trending lessons'),
      ),

      // Search bar
      React.createElement('div', { style: { padding: '0 20px 16px' } },
        React.createElement('div', {
          style: { height: 44, borderRadius: 14, background: t.inputBg, border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', gap: 10, padding: '0 14px', cursor: 'text' }
        },
          React.createElement(window.lucide.Search, { size: 16, color: t.textMuted }),
          React.createElement('span', { style: { fontSize: 14, color: t.textMuted } }, 'Search skills...')
        )
      ),

      // Categories grid
      React.createElement('div', { style: { padding: '0 20px 20px' } },
        React.createElement('div', { style: { fontSize: 13, fontWeight: 700, color: t.textSub, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 12 } }, 'Categories'),
        React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 } },
          topics.map((topic, i) =>
            React.createElement('div', {
              key: topic.label,
              style: { borderRadius: 16, background: topic.color + '18', border: `1px solid ${topic.color}30`, padding: '14px', cursor: 'pointer', animation: `fadeIn 0.3s ease ${i * 0.04}s both` }
            },
              React.createElement('div', { style: { fontSize: 26, marginBottom: 8 } }, topic.icon),
              React.createElement('div', { style: { fontSize: 13, fontWeight: 700, color: t.text, marginBottom: 2 } }, topic.label),
              React.createElement('div', { style: { fontSize: 11, color: t.textMuted } }, `${topic.count} lessons`)
            )
          )
        )
      ),

      // Trending
      React.createElement('div', { style: { padding: '0 20px 24px' } },
        React.createElement('div', { style: { fontSize: 13, fontWeight: 700, color: t.textSub, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 12 } }, 'Trending This Week'),
        trending.map((item, i) =>
          React.createElement('div', {
            key: item.title,
            style: { borderRadius: 14, background: t.card, border: `1px solid ${t.border}`, padding: '12px 14px', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', animation: `fadeIn 0.3s ease ${i * 0.08}s both` }
          },
            React.createElement('div', { style: { fontSize: 28, flexShrink: 0 } }, item.icon),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', { style: { fontSize: 13, fontWeight: 700, color: t.text } }, item.title),
              React.createElement('div', { style: { fontSize: 11, color: t.textMuted, marginTop: 2 } }, `${item.snaps} snaps this week`)
            ),
            React.createElement('div', { style: { background: item.color + '20', color: item.color, fontSize: 11, fontWeight: 700, padding: '4px 8px', borderRadius: 8 } }, '🔥 Hot')
          )
        )
      )
    );
  }

  const screens = { home: HomeScreen, scan: ScanScreen, skills: SkillsScreen, explore: ExploreScreen, profile: ProfileScreen };
  const tabs = [
    { id: 'home', label: 'Home', icon: window.lucide.Home },
    { id: 'explore', label: 'Explore', icon: window.lucide.Compass },
    { id: 'scan', label: 'Scan', icon: window.lucide.Camera },
    { id: 'skills', label: 'Skills', icon: window.lucide.BookOpen },
    { id: 'profile', label: 'Profile', icon: window.lucide.User },
  ];

  const navItemStyle = (isActive) => ({
    flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    gap: 3, cursor: 'pointer', transition: 'all 0.2s', opacity: isActive ? 1 : 0.5,
    paddingTop: 6,
  });

  const labelStyle = (isActive) => ({
    fontSize: 9, fontWeight: isActive ? 700 : 500,
    color: isActive ? t.primary : t.textMuted, letterSpacing: 0.3
  });

  return React.createElement('div', {
    style: { minHeight: '100vh', background: '#1A1A2E', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Plus Jakarta Sans', sans-serif" }
  },
    React.createElement('div', {
      style: { width: 375, height: 812, borderRadius: 48, overflow: 'hidden', background: t.bg, display: 'flex', flexDirection: 'column', boxShadow: '0 30px 80px rgba(0,0,0,0.6), 0 0 0 10px #222, 0 0 0 12px #333', position: 'relative', transition: 'background 0.3s' }
    },
      // Dynamic Island
      React.createElement('div', {
        style: { height: 50, background: t.statusBar, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 28px 0', flexShrink: 0, transition: 'background 0.3s' }
      },
        React.createElement('span', { style: { fontSize: 12, fontWeight: 700, color: t.text } }, '9:41'),
        React.createElement('div', { style: { width: 120, height: 28, borderRadius: 20, background: '#000', position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: 8 } }),
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 5 } },
          React.createElement(window.lucide.Wifi, { size: 12, color: t.text }),
          React.createElement(window.lucide.Battery, { size: 14, color: t.text })
        )
      ),

      // Screen title bar
      React.createElement('div', {
        style: { height: 44, background: t.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, position: 'relative', transition: 'background 0.3s' }
      },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8 } },
          React.createElement('div', { style: { width: 26, height: 26, borderRadius: 8, background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})`, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
            React.createElement(window.lucide.Zap, { size: 14, color: '#000', strokeWidth: 2.5 })
          ),
          React.createElement('span', { style: { fontSize: 16, fontWeight: 800, color: t.text, letterSpacing: -0.5 } }, 'SkillSnap')
        ),
        activeTab === 'scan' && scanState !== 'idle' && React.createElement('button', {
          style: { position: 'absolute', right: 16, background: 'none', border: 'none', color: t.textSub, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, fontSize: 12 },
          onClick: resetScan
        },
          React.createElement(window.lucide.X, { size: 16 }),
          React.createElement('span', null, 'Reset')
        )
      ),

      // Main content
      React.createElement('div', { style: { flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' } },
        React.createElement(screens[activeTab] || HomeScreen)
      ),

      // Bottom nav
      React.createElement('div', {
        style: { height: 72, background: t.navBg, borderTop: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', flexShrink: 0, transition: 'background 0.3s', paddingBottom: 8 }
      },
        tabs.map(tab => {
          const isActive = activeTab === tab.id;
          const isScan = tab.id === 'scan';
          return React.createElement('div', {
            key: tab.id,
            onClick: () => { setActiveTab(tab.id); if (tab.id === 'scan' && scanState === 'idle') {} },
            style: navItemStyle(isActive)
          },
            isScan
              ? React.createElement('div', {
                  style: { width: 44, height: 44, borderRadius: 22, background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: -4, boxShadow: `0 4px 16px ${t.primary}60` }
                },
                  React.createElement(tab.icon, { size: 20, color: '#000', strokeWidth: 2.5 })
                )
              : React.createElement(tab.icon, { size: 22, color: isActive ? t.primary : t.textMuted, strokeWidth: isActive ? 2.5 : 2 }),
            React.createElement('span', { style: labelStyle(isActive) }, tab.label)
          );
        })
      )
    )
  );
}
