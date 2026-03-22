const { useState, useEffect, useRef } = React;

// ─── Themes ──────────────────────────────────────────────────────────────────
const themes = {
  dark: {
    bg: '#06090F',
    surface: '#0D1525',
    surface2: '#142035',
    surface3: '#1C2B46',
    primary: '#00E5CC',
    primaryDim: 'rgba(0,229,204,0.14)',
    secondary: '#8B5CF6',
    secondaryDim: 'rgba(139,92,246,0.14)',
    text: '#EEF2FF',
    textSub: '#7D91BB',
    textMuted: '#3C4E6E',
    border: 'rgba(255,255,255,0.06)',
    success: '#0FDA79',
    warning: '#F59E0B',
    danger: '#F43F5E',
    flame: '#FB923C',
  },
  light: {
    bg: '#ECF0FF',
    surface: '#FFFFFF',
    surface2: '#F3F6FF',
    surface3: '#E4EAFF',
    primary: '#00BFA8',
    primaryDim: 'rgba(0,191,168,0.11)',
    secondary: '#7C3AED',
    secondaryDim: 'rgba(124,58,237,0.1)',
    text: '#0C1528',
    textSub: '#506080',
    textMuted: '#98AABB',
    border: 'rgba(0,0,0,0.07)',
    success: '#059669',
    warning: '#D97706',
    danger: '#DC2626',
    flame: '#EA580C',
  },
};

// ─── Data ────────────────────────────────────────────────────────────────────
const lessons = [
  {
    id: 1, scanned: 'Bicycle Chain', emoji: '🚲',
    title: 'How Gear Ratios Work', category: 'Home & DIY', catColor: '#00E5CC',
    time: '2 min', level: 'Beginner', xp: 45,
    body: [
      { h: "What you're seeing", p: "That chain links your pedal sprocket to the rear wheel. One pedal stroke turns the wheel — but how much depends on the number of teeth on each sprocket." },
      { h: "Gear Ratio = Front Teeth ÷ Rear Teeth", p: "A 50-tooth chainring with a 25-tooth cassette gives a 2:1 ratio — one pedal rotation spins the wheel twice. Higher ratio = more distance, more effort per stroke." },
      { h: "Using gears smartly", p: "Shift to lower gears on hills (easier, less distance per stroke). Higher gears for flat-road speed. Most modern bikes have 18–27 combinations." },
    ],
    quiz: { q: "You're cycling uphill and feeling tired. What gear should you use?", opts: ["Higher gear for more speed", "Lower gear for easier pedaling", "Stay in the current gear"], ans: 1, explain: "Lower gears reduce resistance — less distance per pedal stroke but much less effort. Perfect for climbs." },
  },
  {
    id: 2, scanned: 'Restaurant Receipt', emoji: '🧾',
    title: 'Mental Math for Tips', category: 'Financial Literacy', catColor: '#8B5CF6',
    time: '90 sec', level: 'Beginner', xp: 35,
    body: [
      { h: "The 10% anchor method", p: "Move the decimal one place left to instantly get 10%. $48.60 becomes $4.86. Double it for 20%: $9.72. Works every time." },
      { h: "Getting to 15%", p: "Find 10% and add half. $40 bill: 10% = $4, half = $2, so 15% = $6. No calculator needed." },
      { h: "When to tip more", p: "Complex orders, busy nights, large parties — consider 22–25%. The server often shares with kitchen staff, so generosity travels further than you think." },
    ],
    quiz: { q: "Your bill is $80. What's 20% using mental math?", opts: ["$14", "$16", "$18"], ans: 1, explain: "10% of $80 = $8. Double it: $16. That's your 20% tip!" },
  },
  {
    id: 3, scanned: 'Nutrition Label', emoji: '🥦',
    title: 'Decoding Nutrition Labels', category: 'Health & Nutrition', catColor: '#0FDA79',
    time: '2 min', level: 'Beginner', xp: 40,
    body: [
      { h: "Serving size is the trick", p: "Every number on the label is PER SERVING, not per package. A '200 calorie' snack with 3 servings is 600 calories if you eat it all." },
      { h: "The big three to watch", p: "Added sugars (under 25g/day for women, 36g for men), saturated fat (under 13g/day), and sodium (under 2300mg/day)." },
      { h: "% Daily Value shortcut", p: "5% or less = low. 20% or more = high. Use this instantly to judge any nutrient without memorizing absolute numbers." },
    ],
    quiz: { q: "A bag says '8g sugar, 3 servings.' Eating the whole bag gives you how much sugar?", opts: ["8g", "11g", "24g"], ans: 2, explain: "8g × 3 servings = 24g. Always multiply by serving count before eating!" },
  },
  {
    id: 4, scanned: 'Transit Map', emoji: '🚇',
    title: 'Reading Transit Maps', category: 'Commuting & Transit', catColor: '#F59E0B',
    time: '2 min', level: 'Beginner', xp: 30,
    body: [
      { h: "Color = line, dot = stop", p: "Each colored line is a separate route. Dots along the line are stations. Where two lines share a dot = transfer station." },
      { h: "Direction matters", p: "Trains run both ways on the same track. Systems label directions by the terminal station. Always check the end destination before boarding." },
      { h: "Local etiquette", p: "Let passengers exit before boarding. Move toward the center. Give up priority seats. Headphones are the universal 'not chatting' signal." },
    ],
    quiz: { q: "You see a dot where two colored lines meet. What is it?", opts: ["End of the line", "A transfer station", "An express stop"], ans: 1, explain: "A shared dot where lines meet = transfer station. Switch lines here, usually without buying a new ticket." },
  },
];

const paths = [
  { id: 'finance', name: 'Financial Literacy', emoji: '💰', color: '#8B5CF6', total: 20, done: 6, topics: ['Tip Calculations', 'Compound Interest', 'Reading a Pay Stub', 'Credit Score Basics', 'Loan APR', 'Tax on Receipts'] },
  { id: 'health', name: 'Health & Nutrition', emoji: '🥦', color: '#0FDA79', total: 24, done: 9, topics: ['Nutrition Labels', 'Macro Tracking', 'Hydration Math', 'Ingredient Lists', 'Calorie Density', 'Serving Sizes'] },
  { id: 'transit', name: 'Commuting & Transit', emoji: '🚌', color: '#F59E0B', total: 12, done: 5, topics: ['Transit Maps', 'Route Planning', 'Local Etiquette', 'Timetables'] },
  { id: 'diy', name: 'Home & DIY', emoji: '🔧', color: '#00E5CC', total: 18, done: 2, topics: ['Gear Ratios', 'Wiring Safety'] },
  { id: 'work', name: 'Workplace Skills', emoji: '💼', color: '#FB923C', total: 16, done: 3, topics: ['Inventory Codes', 'Safety Labels', 'Email Jargon'] },
];

// ─── StatusBar ────────────────────────────────────────────────────────────────
function StatusBar({ t }) {
  const [time, setTime] = useState(() => {
    const d = new Date();
    return `${d.getHours()}:${String(d.getMinutes()).padStart(2, '0')}`;
  });
  useEffect(() => {
    const iv = setInterval(() => {
      const d = new Date();
      setTime(`${d.getHours()}:${String(d.getMinutes()).padStart(2, '0')}`);
    }, 30000);
    return () => clearInterval(iv);
  }, []);
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 24px 4px', height: '36px', zIndex: 10 }}>
      <span style={{ fontSize: '13px', fontWeight: 700, color: t.text, letterSpacing: '-0.3px' }}>{time}</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: t.text }}>
        {React.createElement(window.lucide.Signal, { size: 13 })}
        {React.createElement(window.lucide.Wifi, { size: 13 })}
        {React.createElement(window.lucide.Battery, { size: 15 })}
      </div>
    </div>
  );
}

// ─── LessonCard ───────────────────────────────────────────────────────────────
function LessonCard({ lesson, t, onClick }) {
  const [pressed, setPressed] = useState(false);
  return (
    <div
      onClick={() => onClick(lesson)}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      onTouchStart={() => setPressed(true)}
      onTouchEnd={() => setPressed(false)}
      style={{
        background: t.surface2,
        border: `1px solid ${t.border}`,
        borderRadius: '16px',
        padding: '14px 16px',
        cursor: 'pointer',
        transform: pressed ? 'scale(0.97)' : 'scale(1)',
        transition: 'transform 0.1s ease',
        marginBottom: '10px',
        userSelect: 'none',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
        <div style={{ fontSize: '28px', lineHeight: 1, flexShrink: 0 }}>{lesson.emoji}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '10px', fontWeight: 700, color: lesson.catColor, background: lesson.catColor + '20', padding: '2px 8px', borderRadius: '20px', letterSpacing: '0.2px' }}>{lesson.category}</span>
            <span style={{ fontSize: '11px', color: t.textMuted }}>{lesson.time}</span>
          </div>
          <div style={{ fontSize: '14px', fontWeight: 700, color: t.text, marginBottom: '2px' }}>{lesson.title}</div>
          <div style={{ fontSize: '12px', color: t.textSub }}>Scanned: {lesson.scanned}</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px', flexShrink: 0 }}>
          <div style={{ fontSize: '12px', fontWeight: 700, color: t.primary }}>+{lesson.xp} XP</div>
          {React.createElement(window.lucide.ChevronRight, { size: 16, color: t.textMuted })}
        </div>
      </div>
    </div>
  );
}

// ─── HomeScreen ───────────────────────────────────────────────────────────────
function HomeScreen({ t, openLesson }) {
  return (
    <div style={{ flex: 1, overflowY: 'auto', background: t.bg }}>
      {/* Header */}
      <div style={{ padding: '6px 20px 16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontSize: '13px', color: t.textSub, marginBottom: '2px' }}>Good morning,</div>
            <div style={{ fontSize: '24px', fontWeight: 800, color: t.text, letterSpacing: '-0.5px' }}>Alex 👋</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: t.surface2, padding: '8px 14px', borderRadius: '20px', border: `1px solid ${t.border}` }}>
            {React.createElement(window.lucide.Flame, { size: 16, color: t.flame })}
            <span style={{ fontSize: '15px', fontWeight: 800, color: t.text }}>12</span>
            <span style={{ fontSize: '12px', color: t.textSub }}>day streak</span>
          </div>
        </div>

        {/* Daily Goal */}
        <div style={{ marginTop: '16px', background: t.surface2, borderRadius: '16px', padding: '14px', border: `1px solid ${t.border}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              {React.createElement(window.lucide.Target, { size: 14, color: t.primary })}
              <span style={{ fontSize: '13px', fontWeight: 600, color: t.text }}>Today's Goal</span>
            </div>
            <span style={{ fontSize: '13px', fontWeight: 700, color: t.primary }}>3 / 5 lessons</span>
          </div>
          <div style={{ height: '6px', background: t.border, borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: '60%', background: `linear-gradient(90deg, ${t.primary}, ${t.secondary})`, borderRadius: '3px' }} />
          </div>
        </div>
      </div>

      {/* Scan CTA */}
      <div style={{ margin: '0 20px 20px', background: `linear-gradient(135deg, ${t.primary}18, ${t.secondary}18)`, border: `1px solid ${t.primary}2A`, borderRadius: '18px', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
        <div style={{ width: '46px', height: '46px', borderRadius: '13px', background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          {React.createElement(window.lucide.Camera, { size: 22, color: '#fff' })}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '14px', fontWeight: 700, color: t.text }}>Ready to learn?</div>
          <div style={{ fontSize: '12px', color: t.textSub, marginTop: '1px' }}>Point your camera at anything around you</div>
        </div>
        {React.createElement(window.lucide.ArrowRight, { size: 18, color: t.primary })}
      </div>

      {/* Recent Discoveries */}
      <div style={{ padding: '0 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <span style={{ fontSize: '16px', fontWeight: 700, color: t.text }}>Recent Discoveries</span>
          <span style={{ fontSize: '12px', color: t.primary, fontWeight: 600, cursor: 'pointer' }}>See all</span>
        </div>
        {lessons.slice(0, 3).map(l => <LessonCard key={l.id} lesson={l} t={t} onClick={openLesson} />)}
      </div>

      {/* Quick Stats */}
      <div style={{ padding: '8px 20px 28px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
        {[
          { label: 'Total Scans', value: '47', icon: window.lucide.Camera, color: t.primary },
          { label: 'Lessons Done', value: '23', icon: window.lucide.BookOpen, color: t.secondary },
          { label: 'XP Earned', value: '890', icon: window.lucide.Zap, color: t.warning },
        ].map(s => (
          <div key={s.label} style={{ background: t.surface2, border: `1px solid ${t.border}`, borderRadius: '14px', padding: '12px 8px', textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '6px' }}>
              {React.createElement(s.icon, { size: 18, color: s.color })}
            </div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: t.text }}>{s.value}</div>
            <div style={{ fontSize: '10px', color: t.textSub, marginTop: '1px' }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── ScanScreen ───────────────────────────────────────────────────────────────
function ScanScreen({ t, openLesson }) {
  const [phase, setPhase] = useState('idle');
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState(null);
  const [pulse, setPulse] = useState(true);

  useEffect(() => {
    const iv = setInterval(() => setPulse(p => !p), 1100);
    return () => clearInterval(iv);
  }, []);

  const startScan = () => {
    setPhase('scanning');
    setProgress(0);
    let p = 0;
    const iv = setInterval(() => {
      p += 14;
      setProgress(Math.min(p, 100));
      if (p >= 100) {
        clearInterval(iv);
        const r = lessons[Math.floor(Math.random() * lessons.length)];
        setResult(r);
        setPhase('result');
      }
    }, 160);
  };

  const reset = () => { setPhase('idle'); setResult(null); setProgress(0); };

  const corner = (top, right, bottom, left) => ({
    position: 'absolute', width: '26px', height: '26px',
    borderTop: top ? `2.5px solid ${t.primary}` : 'none',
    borderRight: right ? `2.5px solid ${t.primary}` : 'none',
    borderBottom: bottom ? `2.5px solid ${t.primary}` : 'none',
    borderLeft: left ? `2.5px solid ${t.primary}` : 'none',
    top: top ? 0 : 'auto', right: right ? 0 : 'auto',
    bottom: bottom ? 0 : 'auto', left: left ? 0 : 'auto',
    opacity: pulse ? 1 : 0.4,
    transition: 'opacity 0.55s ease',
  });

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: t.bg }}>
      {/* Viewfinder */}
      <div style={{ flex: 1, background: '#000', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(160deg, #081420 0%, #0E2030 50%, #091828 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {/* Grid */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: `linear-gradient(rgba(0,229,204,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,204,0.04) 1px, transparent 1px)`,
            backgroundSize: '44px 44px',
          }} />

          {/* Corner brackets */}
          <div style={{ position: 'relative', width: '200px', height: '200px' }}>
            <div style={corner(true, false, false, true)} />
            <div style={corner(true, true, false, false)} />
            <div style={corner(false, false, true, true)} />
            <div style={corner(false, true, true, false)} />

            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
              {phase === 'idle' && (
                <>
                  {React.createElement(window.lucide.Camera, { size: 38, color: t.primary, style: { opacity: 0.5 } })}
                  <div style={{ fontSize: '12px', color: t.primary, marginTop: '10px', opacity: 0.6, textAlign: 'center', lineHeight: 1.4 }}>Aim at any object,<br />sign, or label</div>
                </>
              )}
              {phase === 'scanning' && (
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '30px', marginBottom: '8px' }}>🔍</div>
                  <div style={{ fontSize: '12px', color: t.primary, fontWeight: 600 }}>Analyzing...</div>
                  <div style={{ marginTop: '14px', width: '90px', height: '4px', background: 'rgba(0,229,204,0.15)', borderRadius: '2px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${progress}%`, background: t.primary, borderRadius: '2px', transition: 'width 0.16s ease' }} />
                  </div>
                </div>
              )}
              {phase === 'result' && result && (
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '36px', marginBottom: '6px' }}>{result.emoji}</div>
                  <div style={{ fontSize: '11px', color: t.primary, fontWeight: 700 }}>Identified!</div>
                </div>
              )}
            </div>
          </div>

          {/* Scan sweep line */}
          {phase === 'scanning' && (
            <div style={{
              position: 'absolute', left: '10%', right: '10%', height: '1.5px',
              background: `linear-gradient(90deg, transparent, ${t.primary}, transparent)`,
              top: `${25 + progress * 0.45}%`,
              boxShadow: `0 0 10px ${t.primary}80`,
              transition: 'top 0.16s ease',
            }} />
          )}

          {/* Object tags when idle */}
          {phase === 'idle' && (
            <div style={{ position: 'absolute', bottom: '70px', left: 0, right: 0, display: 'flex', gap: '8px', padding: '0 24px', justifyContent: 'center', flexWrap: 'wrap' }}>
              {['🚲 Bicycle', '🌿 Plant', '📦 Package', '🏷 Label'].map(tag => (
                <div key={tag} style={{ background: 'rgba(0,229,204,0.08)', border: '1px solid rgba(0,229,204,0.25)', borderRadius: '20px', padding: '5px 11px', fontSize: '11px', color: t.primary }}>
                  {tag}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Control Panel */}
      <div style={{ background: t.surface, padding: '16px 20px 20px', borderTop: `1px solid ${t.border}` }}>
        {phase === 'idle' && (
          <>
            <div style={{ textAlign: 'center', marginBottom: '14px' }}>
              <div style={{ fontSize: '16px', fontWeight: 700, color: t.text }}>Tap to SkillSnap</div>
              <div style={{ fontSize: '12px', color: t.textSub, marginTop: '3px' }}>Objects, labels, signs, documents</div>
            </div>
            <button
              onClick={startScan}
              style={{ width: '100%', height: '52px', borderRadius: '16px', background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})`, border: 'none', cursor: 'pointer', fontSize: '15px', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
            >
              {React.createElement(window.lucide.Zap, { size: 18 })}
              Start Scanning
            </button>
          </>
        )}
        {phase === 'scanning' && (
          <div style={{ textAlign: 'center', padding: '10px 0' }}>
            <div style={{ fontSize: '15px', fontWeight: 700, color: t.text }}>Scanning environment...</div>
            <div style={{ fontSize: '12px', color: t.textSub, marginTop: '4px' }}>Hold steady for best results</div>
          </div>
        )}
        {phase === 'result' && result && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
              <div style={{ fontSize: '26px' }}>{result.emoji}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '11px', color: result.catColor, fontWeight: 700, marginBottom: '2px' }}>Detected: {result.scanned}</div>
                <div style={{ fontSize: '15px', fontWeight: 700, color: t.text }}>{result.title}</div>
              </div>
              <div style={{ background: t.primaryDim, padding: '5px 10px', borderRadius: '20px' }}>
                <span style={{ fontSize: '13px', fontWeight: 700, color: t.primary }}>+{result.xp} XP</span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={reset} style={{ flex: 1, height: '46px', borderRadius: '13px', background: t.surface2, border: `1px solid ${t.border}`, color: t.text, fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}>
                Scan Again
              </button>
              <button
                onClick={() => openLesson(result)}
                style={{ flex: 2, height: '46px', borderRadius: '13px', background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})`, border: 'none', color: '#fff', fontSize: '14px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '7px' }}
              >
                {React.createElement(window.lucide.BookOpen, { size: 16 })}
                Learn Now
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── MapScreen ────────────────────────────────────────────────────────────────
function MapScreen({ t }) {
  const [expanded, setExpanded] = useState(null);

  const totalDone = paths.reduce((s, p) => s + p.done, 0);
  const totalAll = paths.reduce((s, p) => s + p.total, 0);

  return (
    <div style={{ flex: 1, overflowY: 'auto', background: t.bg }}>
      <div style={{ padding: '6px 20px 16px' }}>
        <div style={{ fontSize: '23px', fontWeight: 800, color: t.text, letterSpacing: '-0.5px' }}>Learning Map</div>
        <div style={{ fontSize: '13px', color: t.textSub, marginTop: '3px' }}>{totalDone} of {totalAll} skills unlocked</div>
      </div>

      {/* Overall banner */}
      <div style={{ margin: '0 20px 20px', background: `linear-gradient(135deg, ${t.primary}1A, ${t.secondary}1A)`, borderRadius: '18px', padding: '16px', border: `1px solid ${t.primary}28` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
          <span style={{ fontSize: '14px', fontWeight: 700, color: t.text }}>Overall Progress</span>
          <span style={{ fontSize: '14px', fontWeight: 800, color: t.primary }}>{Math.round(totalDone / totalAll * 100)}%</span>
        </div>
        <div style={{ height: '8px', background: t.border, borderRadius: '4px', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${totalDone / totalAll * 100}%`, background: `linear-gradient(90deg, ${t.primary}, ${t.secondary})`, borderRadius: '4px' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
          <span style={{ fontSize: '11px', color: t.textSub }}>{totalDone} completed</span>
          <span style={{ fontSize: '11px', color: t.textMuted }}>{totalAll - totalDone} remaining</span>
        </div>
      </div>

      {/* Pathways */}
      <div style={{ padding: '0 20px 28px' }}>
        <div style={{ fontSize: '14px', fontWeight: 700, color: t.text, marginBottom: '12px' }}>Skill Pathways</div>
        {paths.map(path => {
          const pct = Math.round(path.done / path.total * 100);
          const isExp = expanded === path.id;
          return (
            <div key={path.id} style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: '16px', marginBottom: '10px', overflow: 'hidden' }}>
              <div onClick={() => setExpanded(isExp ? null : path.id)} style={{ padding: '14px 16px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: path.color + '1E', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0 }}>
                  {path.emoji}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '7px' }}>
                    <span style={{ fontSize: '14px', fontWeight: 700, color: t.text }}>{path.name}</span>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: path.color }}>{pct}%</span>
                  </div>
                  <div style={{ height: '5px', background: t.border, borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${pct}%`, background: path.color, borderRadius: '3px', transition: 'width 0.4s ease' }} />
                  </div>
                  <div style={{ fontSize: '11px', color: t.textMuted, marginTop: '4px' }}>{path.done}/{path.total} skills</div>
                </div>
                {React.createElement(window.lucide.ChevronRight, { size: 16, color: t.textMuted, style: { transform: isExp ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s ease', flexShrink: 0 } })}
              </div>
              {isExp && (
                <div style={{ borderTop: `1px solid ${t.border}`, padding: '12px 16px 14px' }}>
                  {path.topics.map((topic, i) => (
                    <div key={topic} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '7px 0', borderBottom: i < path.topics.length - 1 ? `1px solid ${t.border}` : 'none' }}>
                      <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: i < path.done ? path.color + '28' : t.surface2, border: `1px solid ${i < path.done ? path.color + '60' : t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        {i < path.done
                          ? React.createElement(window.lucide.Check, { size: 11, color: path.color })
                          : <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: t.textMuted }} />
                        }
                      </div>
                      <span style={{ fontSize: '13px', color: i < path.done ? t.text : t.textSub, fontWeight: i < path.done ? 600 : 400 }}>{topic}</span>
                      {i < path.done && <span style={{ marginLeft: 'auto', fontSize: '10px', color: path.color, fontWeight: 700 }}>Done</span>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── ProfileScreen ────────────────────────────────────────────────────────────
function ProfileScreen({ t, isDark, setIsDark }) {
  const [notif, setNotif] = useState(true);
  const [adaptive, setAdaptive] = useState(true);

  const Toggle = ({ value, onChange, color }) => (
    <div
      onClick={() => onChange(!value)}
      style={{ width: '46px', height: '26px', borderRadius: '13px', background: value ? color : t.surface3, cursor: 'pointer', position: 'relative', transition: 'background 0.2s ease', flexShrink: 0, border: `1px solid ${value ? color + '50' : t.border}` }}
    >
      <div style={{ position: 'absolute', top: '4px', left: value ? '22px' : '3px', width: '16px', height: '16px', borderRadius: '50%', background: '#fff', transition: 'left 0.2s ease', boxShadow: '0 1px 4px rgba(0,0,0,0.3)' }} />
    </div>
  );

  const Row = ({ icon, label, sub, right }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderBottom: `1px solid ${t.border}` }}>
      <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: t.surface2, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        {React.createElement(icon, { size: 17, color: t.primary })}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: '14px', fontWeight: 600, color: t.text }}>{label}</div>
        {sub && <div style={{ fontSize: '11px', color: t.textSub, marginTop: '1px' }}>{sub}</div>}
      </div>
      {right}
    </div>
  );

  return (
    <div style={{ flex: 1, overflowY: 'auto', background: t.bg }}>
      {/* Profile Card */}
      <div style={{ margin: '6px 20px 16px', background: `linear-gradient(135deg, ${t.primary}1A, ${t.secondary}1A)`, borderRadius: '20px', padding: '22px 20px', border: `1px solid ${t.primary}28`, textAlign: 'center' }}>
        <div style={{ width: '66px', height: '66px', borderRadius: '50%', background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})`, margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>
          🧑
        </div>
        <div style={{ fontSize: '18px', fontWeight: 800, color: t.text }}>Alex Rivera</div>
        <div style={{ fontSize: '13px', color: t.textSub, marginTop: '3px' }}>Curious Explorer · Level 4</div>
        <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', marginTop: '18px' }}>
          {[['47', 'Scans'], ['23', 'Lessons'], ['890', 'XP']].map(([val, lab]) => (
            <div key={lab}>
              <div style={{ fontSize: '20px', fontWeight: 800, color: t.text }}>{val}</div>
              <div style={{ fontSize: '11px', color: t.textSub }}>{lab}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Appearance */}
      <div style={{ margin: '0 20px 12px', background: t.surface, borderRadius: '16px', overflow: 'hidden', border: `1px solid ${t.border}` }}>
        <div style={{ padding: '10px 16px 4px', fontSize: '10px', fontWeight: 700, color: t.textMuted, letterSpacing: '0.8px', textTransform: 'uppercase' }}>Appearance</div>
        <Row icon={isDark ? window.lucide.Moon : window.lucide.Sun} label="Dark Mode" sub={isDark ? 'Currently dark theme' : 'Currently light theme'} right={<Toggle value={isDark} onChange={setIsDark} color={t.primary} />} />
        <Row icon={window.lucide.Globe} label="Language" sub="English (US)" right={React.createElement(window.lucide.ChevronRight, { size: 16, color: t.textMuted })} />
      </div>

      {/* Learning */}
      <div style={{ margin: '0 20px 12px', background: t.surface, borderRadius: '16px', overflow: 'hidden', border: `1px solid ${t.border}` }}>
        <div style={{ padding: '10px 16px 4px', fontSize: '10px', fontWeight: 700, color: t.textMuted, letterSpacing: '0.8px', textTransform: 'uppercase' }}>Learning</div>
        <Row icon={window.lucide.Brain} label="Adaptive Difficulty" sub="Auto-adjusts lessons to your level" right={<Toggle value={adaptive} onChange={setAdaptive} color={t.secondary} />} />
        <Row icon={window.lucide.Bell} label="Daily Reminders" sub="Nudge to scan something new" right={<Toggle value={notif} onChange={setNotif} color={t.primary} />} />
        <Row icon={window.lucide.Target} label="Daily Goal" sub="5 lessons per day" right={React.createElement(window.lucide.ChevronRight, { size: 16, color: t.textMuted })} />
      </div>

      {/* Account */}
      <div style={{ margin: '0 20px 28px', background: t.surface, borderRadius: '16px', overflow: 'hidden', border: `1px solid ${t.border}` }}>
        <div style={{ padding: '10px 16px 4px', fontSize: '10px', fontWeight: 700, color: t.textMuted, letterSpacing: '0.8px', textTransform: 'uppercase' }}>Account</div>
        <Row icon={window.lucide.Shield} label="Privacy & Data" right={React.createElement(window.lucide.ChevronRight, { size: 16, color: t.textMuted })} />
        <Row icon={window.lucide.HelpCircle} label="Help & Support" right={React.createElement(window.lucide.ChevronRight, { size: 16, color: t.textMuted })} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', cursor: 'pointer' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: t.danger + '18', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {React.createElement(window.lucide.LogOut, { size: 17, color: t.danger })}
          </div>
          <span style={{ fontSize: '14px', fontWeight: 600, color: t.danger }}>Sign Out</span>
        </div>
      </div>
    </div>
  );
}

// ─── LessonModal ──────────────────────────────────────────────────────────────
function LessonModal({ t, lesson, onClose }) {
  const [quizAnswer, setQuizAnswer] = useState(null);
  if (!lesson) return null;
  const answered = quizAnswer !== null;
  const correct = answered && quizAnswer === lesson.quiz.ans;

  return (
    <div style={{ position: 'absolute', inset: 0, background: t.bg, zIndex: 100, display: 'flex', flexDirection: 'column', borderRadius: 'inherit', overflowY: 'auto' }}>
      {/* Sticky Header */}
      <div style={{ padding: '14px 20px 12px', display: 'flex', alignItems: 'center', gap: '12px', position: 'sticky', top: 0, background: t.bg, borderBottom: `1px solid ${t.border}`, zIndex: 1 }}>
        <button onClick={onClose} style={{ width: '36px', height: '36px', borderRadius: '10px', background: t.surface2, border: `1px solid ${t.border}`, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          {React.createElement(window.lucide.X, { size: 18, color: t.text })}
        </button>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: '10px', color: lesson.catColor, fontWeight: 700, letterSpacing: '0.3px' }}>{lesson.category} · {lesson.time}</div>
          <div style={{ fontSize: '15px', fontWeight: 700, color: t.text, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{lesson.title}</div>
        </div>
        <div style={{ background: t.primaryDim, padding: '6px 12px', borderRadius: '20px', flexShrink: 0 }}>
          <span style={{ fontSize: '13px', fontWeight: 700, color: t.primary }}>+{lesson.xp} XP</span>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: '20px', flex: 1 }}>
        {/* Scan tag */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '22px', background: t.surface2, padding: '10px 14px', borderRadius: '12px', border: `1px solid ${t.border}` }}>
          {React.createElement(window.lucide.Camera, { size: 15, color: t.primary })}
          <span style={{ fontSize: '12px', color: t.textSub }}>You scanned: <strong style={{ color: t.text }}>{lesson.scanned}</strong></span>
          <span style={{ fontSize: '18px', marginLeft: 'auto' }}>{lesson.emoji}</span>
        </div>

        {/* Lesson sections */}
        {lesson.body.map((sec, i) => (
          <div key={i} style={{ marginBottom: '20px' }}>
            <div style={{ fontSize: '14px', fontWeight: 700, color: t.text, marginBottom: '7px', display: 'flex', alignItems: 'center', gap: '9px' }}>
              <div style={{ width: '3px', height: '16px', background: `linear-gradient(180deg, ${t.primary}, ${t.secondary})`, borderRadius: '2px', flexShrink: 0 }} />
              {sec.h}
            </div>
            <div style={{ fontSize: '13px', color: t.textSub, lineHeight: 1.75, paddingLeft: '12px' }}>{sec.p}</div>
          </div>
        ))}

        {/* Quiz */}
        <div style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: '16px', padding: '16px', marginTop: '6px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            {React.createElement(window.lucide.HelpCircle, { size: 15, color: t.secondary })}
            <span style={{ fontSize: '13px', fontWeight: 700, color: t.text }}>Quick Check</span>
          </div>
          <div style={{ fontSize: '14px', fontWeight: 600, color: t.text, marginBottom: '14px', lineHeight: 1.5 }}>{lesson.quiz.q}</div>
          {lesson.quiz.opts.map((opt, i) => {
            let bg = t.surface2, border = t.border, color = t.text;
            if (answered) {
              if (i === lesson.quiz.ans) { bg = t.success + '1E'; border = t.success + '55'; color = t.success; }
              else if (i === quizAnswer && i !== lesson.quiz.ans) { bg = t.danger + '14'; border = t.danger + '44'; color = t.danger; }
            }
            return (
              <div
                key={i}
                onClick={() => !answered && setQuizAnswer(i)}
                style={{ padding: '11px 14px', borderRadius: '11px', background: bg, border: `1px solid ${border}`, marginBottom: '8px', cursor: answered ? 'default' : 'pointer', fontSize: '13px', color, fontWeight: 500, transition: 'all 0.18s ease', display: 'flex', alignItems: 'center', gap: '9px' }}
              >
                {answered && i === lesson.quiz.ans && React.createElement(window.lucide.Check, { size: 14, color: t.success })}
                {answered && i === quizAnswer && i !== lesson.quiz.ans && React.createElement(window.lucide.X, { size: 14, color: t.danger })}
                {!answered && <div style={{ width: '14px', height: '14px', borderRadius: '50%', border: `2px solid ${t.border}`, flexShrink: 0 }} />}
                {opt}
              </div>
            );
          })}
          {answered && (
            <div style={{ marginTop: '10px', padding: '12px 14px', background: correct ? t.success + '14' : t.danger + '0E', borderRadius: '11px', border: `1px solid ${correct ? t.success + '40' : t.danger + '30'}` }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: correct ? t.success : t.danger, marginBottom: '5px' }}>
                {correct ? '🎉 Correct!' : '💡 Not quite —'}
              </div>
              <div style={{ fontSize: '12px', color: t.textSub, lineHeight: 1.6 }}>{lesson.quiz.explain}</div>
            </div>
          )}
        </div>

        {answered && (
          <button
            onClick={onClose}
            style={{ width: '100%', height: '52px', borderRadius: '14px', background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})`, border: 'none', color: '#fff', fontSize: '15px', fontWeight: 700, cursor: 'pointer', marginTop: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
          >
            {React.createElement(window.lucide.Trophy, { size: 18 })}
            Lesson Complete!
          </button>
        )}
      </div>
    </div>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isDark, setIsDark] = useState(true);
  const [lesson, setLesson] = useState(null);

  const t = isDark ? themes.dark : themes.light;

  const tabs = [
    { id: 'home', label: 'Home', icon: window.lucide.Home },
    { id: 'scan', label: 'Scan', icon: window.lucide.Camera },
    { id: 'map', label: 'Map', icon: window.lucide.Map },
    { id: 'profile', label: 'Profile', icon: window.lucide.User },
  ];

  const screens = {
    home: HomeScreen,
    scan: ScanScreen,
    map: MapScreen,
    profile: ProfileScreen,
  };

  const screenProps = {
    home: { t, openLesson: (l) => setLesson(l) },
    scan: { t, openLesson: (l) => setLesson(l) },
    map: { t },
    profile: { t, isDark, setIsDark },
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { display: none; }
        button { font-family: 'Plus Jakarta Sans', sans-serif; }
      `}</style>

      {/* Phone Frame */}
      <div style={{
        width: '375px', height: '812px', background: t.bg,
        borderRadius: '50px', overflow: 'hidden', position: 'relative',
        boxShadow: isDark
          ? '0 32px 80px rgba(0,0,0,0.75), 0 0 0 1px rgba(255,255,255,0.07), inset 0 0 0 1px rgba(255,255,255,0.04)'
          : '0 32px 80px rgba(0,0,0,0.22), 0 0 0 1px rgba(0,0,0,0.12)',
        display: 'flex', flexDirection: 'column',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}>
        {/* Dynamic Island */}
        <div style={{ position: 'absolute', top: '12px', left: '50%', transform: 'translateX(-50%)', width: '120px', height: '34px', background: '#000', borderRadius: '20px', zIndex: 50 }} />

        {/* Status Bar */}
        <StatusBar t={t} />

        {/* Screen */}
        <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', position: 'relative' }}>
          {React.createElement(screens[activeTab], screenProps[activeTab])}
          {lesson && <LessonModal t={t} lesson={lesson} onClose={() => setLesson(null)} />}
        </div>

        {/* Bottom Nav */}
        <div style={{ height: '80px', background: t.surface, borderTop: `1px solid ${t.border}`, display: 'flex', alignItems: 'flex-start', paddingTop: '8px' }}>
          {tabs.map(tab => {
            const isActive = activeTab === tab.id;
            const navItemStyle = {
              flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px',
              cursor: 'pointer', padding: '4px 0', transition: 'opacity 0.15s ease',
            };
            const labelStyle = {
              fontSize: '10px', fontWeight: isActive ? 700 : 500,
              color: isActive ? t.primary : t.textMuted,
              letterSpacing: '0.1px',
            };
            return React.createElement('div', {
              key: tab.id,
              onClick: () => setActiveTab(tab.id),
              style: navItemStyle,
            },
              React.createElement('div', {
                style: {
                  width: '38px', height: '30px', borderRadius: '10px',
                  background: isActive ? t.primaryDim : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'background 0.2s ease',
                  color: isActive ? t.primary : t.textMuted,
                }
              },
                React.createElement(tab.icon, { size: 21 })
              ),
              React.createElement('span', { style: labelStyle }, tab.label)
            );
          })}
        </div>
      </div>
    </div>
  );
}
