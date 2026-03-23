const { useState, useEffect, useRef } = React;

// ── Google Fonts & Global Resets ────────────────────────────────────────────
(() => {
  const s = document.createElement('style');
  s.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    ::-webkit-scrollbar { display: none; }
    body { background: #060A10; }
  `;
  document.head.appendChild(s);
})();

// ── Design System ───────────────────────────────────────────────────────────
const themes = {
  dark: {
    bg: '#080C14',
    surface: '#0E1625',
    card: '#131D2E',
    cardAlt: '#192338',
    border: '#1E2F48',
    borderMid: '#2A4060',
    primary: '#00E8B4',
    primaryDim: 'rgba(0,232,180,0.10)',
    primaryMid: 'rgba(0,232,180,0.20)',
    primaryGlow: 'rgba(0,232,180,0.30)',
    secondary: '#7C6FF5',
    secondaryDim: 'rgba(124,111,245,0.12)',
    secondaryMid: 'rgba(124,111,245,0.22)',
    text: '#EDF2FF',
    textSec: '#6E8AAA',
    textMuted: '#344A66',
    danger: '#FF5252',
    dangerDim: 'rgba(255,82,82,0.12)',
    warning: '#FFAD4A',
    warningDim: 'rgba(255,173,74,0.12)',
    coral: '#FF6E4A',
    coralDim: 'rgba(255,110,74,0.12)',
  },
  light: {
    bg: '#EDF2F8',
    surface: '#FFFFFF',
    card: '#FFFFFF',
    cardAlt: '#F4F8FC',
    border: '#DDE6F0',
    borderMid: '#C8D8EA',
    primary: '#00C498',
    primaryDim: 'rgba(0,196,152,0.10)',
    primaryMid: 'rgba(0,196,152,0.20)',
    primaryGlow: 'rgba(0,196,152,0.28)',
    secondary: '#6B5FD8',
    secondaryDim: 'rgba(107,95,216,0.10)',
    secondaryMid: 'rgba(107,95,216,0.20)',
    text: '#0C1825',
    textSec: '#4A6080',
    textMuted: '#96AABF',
    danger: '#E03030',
    dangerDim: 'rgba(224,48,48,0.10)',
    warning: '#D97706',
    warningDim: 'rgba(217,119,6,0.10)',
    coral: '#D94F2A',
    coralDim: 'rgba(217,79,42,0.10)',
  }
};

// ── Data ────────────────────────────────────────────────────────────────────
const MOVES = [
  {
    id: 1, name: 'Neck & Shoulder Reset', duration: '90s', category: 'desk',
    benefit: 'Relieves screen-time tension', difficulty: 'Easy', calories: 3,
    color: '#00E8B4', colorDark: '#00E8B4',
    steps: ['Roll shoulders back 5x slowly', 'Tilt right ear to shoulder — hold 12s', 'Tilt left ear to shoulder — hold 12s', 'Chin tucks 8x with deep breaths'],
    tags: ['neck', 'posture'],
  },
  {
    id: 2, name: 'Hallway Walk Reset', duration: '2m', category: 'walking',
    benefit: 'Circulation boost after long sitting', difficulty: 'Easy', calories: 14,
    color: '#7C6FF5', colorDark: '#7C6FF5',
    steps: ['Walk briskly down the hallway', 'Do 5 light calf raises at each end', 'Arm swings while walking back', 'Take 3 deep belly breaths on return'],
    tags: ['cardio', 'energy'],
  },
  {
    id: 3, name: 'Seated Spinal Twist', duration: '60s', category: 'desk',
    benefit: 'Releases lower back compression', difficulty: 'Easy', calories: 2,
    color: '#FF6E4A', colorDark: '#FF6E4A',
    steps: ['Sit tall, feet flat on floor', 'Place right hand on left knee', 'Twist left, look over shoulder — hold 15s', 'Repeat to the right side'],
    tags: ['back', 'spine'],
  },
  {
    id: 4, name: '4-7-8 Breathing', duration: '2m', category: 'breathe',
    benefit: 'Cuts cortisol in under 2 minutes', difficulty: 'Easy', calories: 1,
    color: '#FFAD4A', colorDark: '#FFAD4A',
    steps: ['Inhale through nose for 4 counts', 'Hold breath for 7 counts', 'Exhale slowly through mouth for 8 counts', 'Repeat 5 full cycles'],
    tags: ['stress', 'focus'],
  },
  {
    id: 5, name: 'Standing Hip Flexor', duration: '90s', category: 'standing',
    benefit: 'Counters all-day sitting tightness', difficulty: 'Medium', calories: 6,
    color: '#00E8B4', colorDark: '#00E8B4',
    steps: ['Step right foot forward into a lunge', 'Lower back knee toward the floor', 'Hold 20s, squeeze glute of back leg', 'Switch sides and repeat'],
    tags: ['hips', 'mobility'],
  },
  {
    id: 6, name: 'Wrist & Hand Relief', duration: '60s', category: 'desk',
    benefit: 'Counters keyboard & trackpad strain', difficulty: 'Easy', calories: 2,
    color: '#7C6FF5', colorDark: '#7C6FF5',
    steps: ['Extend arms, bend wrists down — hold 10s', 'Circle wrists 10x each direction', 'Spread fingers wide, hold 5s — repeat 3x', 'Make fists and release 8 times'],
    tags: ['wrists', 'hands'],
  },
  {
    id: 7, name: 'Post-Meeting Energizer', duration: '3m', category: 'standing',
    benefit: 'Resets after back-to-back video calls', difficulty: 'Medium', calories: 20,
    color: '#FF6E4A', colorDark: '#FF6E4A',
    steps: ['20 standing calf raises', '10 air squats (slow, controlled)', 'Full body stretch — arms overhead 10s', 'Shake out hands and roll shoulders'],
    tags: ['energy', 'cardio'],
  },
  {
    id: 8, name: 'Eye Strain Relief', duration: '60s', category: 'desk',
    benefit: 'Reduces digital eye fatigue', difficulty: 'Easy', calories: 1,
    color: '#FFAD4A', colorDark: '#FFAD4A',
    steps: ['Cup palms over eyes — darkness for 10s', 'Focus on a distant object for 20s', 'Slow eye circles each direction 5x', 'Blink rapidly 15x to re-moisturize'],
    tags: ['eyes', 'screen'],
  },
];

const WEEK = [
  { day: 'M', moves: 5, stress: 72, mood: 62 },
  { day: 'T', moves: 8, stress: 55, mood: 76 },
  { day: 'W', moves: 3, stress: 88, mood: 46 },
  { day: 'T', moves: 7, stress: 60, mood: 72 },
  { day: 'F', moves: 9, stress: 48, mood: 84 },
  { day: 'S', moves: 6, stress: 36, mood: 90 },
  { day: 'S', moves: 4, stress: 40, mood: 80 },
];

const TRIGGERS = [
  { time: '9am',  label: 'Morning Warmup',    intensity: 42, type: 'energy',  typeColor: null },
  { time: '11am', label: 'Pre-Lunch Stress',   intensity: 74, type: 'stress',  typeColor: null },
  { time: '2pm',  label: 'Post-Lunch Fog',     intensity: 88, type: 'focus',   typeColor: null },
  { time: '4pm',  label: 'Desk Stiffness',     intensity: 76, type: 'posture', typeColor: null },
  { time: '6pm',  label: 'End-Day Burnout',    intensity: 62, type: 'stress',  typeColor: null },
];

// ── StatusBar ───────────────────────────────────────────────────────────────
function StatusBar({ t }) {
  return (
    <div style={{ height: 54, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '0 24px 10px' }}>
      <span style={{ fontSize: 14, fontWeight: 600, color: t.text, letterSpacing: '0.01em' }}>9:41</span>
      <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
        {/* Wifi icon */}
        <svg width="16" height="13" viewBox="0 0 16 13" fill="none">
          <circle cx="8" cy="12" r="1.2" fill={t.text} />
          <path d="M5.1 9.2C5.9 8.4 6.9 7.9 8 7.9s2.1.5 2.9 1.3" stroke={t.text} strokeWidth="1.5" strokeLinecap="round" />
          <path d="M2.4 6.5C3.9 5 5.9 4.1 8 4.1s4.1.9 5.6 2.4" stroke={t.text} strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        {/* Signal bars */}
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 1.5 }}>
          {[4, 7, 10, 13].map((h, i) => (
            <div key={i} style={{ width: 3, height: h, background: i < 3 ? t.text : t.textMuted, borderRadius: 1.5 }} />
          ))}
        </div>
        {/* Battery */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ width: 22, height: 11, border: `1.5px solid ${t.text}80`, borderRadius: 3, padding: '1.5px', display: 'flex' }}>
            <div style={{ width: '78%', background: t.primary, borderRadius: 1.5 }} />
          </div>
          <div style={{ width: 2, height: 5, background: `${t.text}80`, borderRadius: '0 1px 1px 0', marginLeft: 1 }} />
        </div>
      </div>
    </div>
  );
}

// ── StressOrb ────────────────────────────────────────────────────────────────
function StressOrb({ t, level }) {
  const color = level >= 70 ? t.danger : level >= 50 ? t.warning : t.primary;
  const label = level >= 70 ? 'High' : level >= 50 ? 'Moderate' : 'Low';
  return (
    <div style={{ position: 'relative', width: 100, height: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      {[110, 90].map((sz, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: sz, height: sz, borderRadius: '50%',
          border: `1.5px solid ${color}`,
          opacity: i === 0 ? 0.10 : 0.18,
        }} />
      ))}
      <div style={{
        width: 72, height: 72, borderRadius: '50%',
        background: `radial-gradient(circle at 40% 35%, ${color}30 0%, ${color}08 70%)`,
        border: `2px solid ${color}60`,
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column',
        boxShadow: `0 0 20px ${color}20`,
      }}>
        <span style={{ fontSize: 22, fontWeight: 700, color, lineHeight: 1 }}>{level}</span>
        <span style={{ fontSize: 9, color: `${color}BB`, fontWeight: 500, marginTop: 1 }}>{label}</span>
      </div>
    </div>
  );
}

// ── HomeScreen ───────────────────────────────────────────────────────────────
function HomeScreen({ t }) {
  const [started, setStarted] = useState(false);
  const [btnDown, setBtnDown] = useState(false);
  const stressLevel = 68;

  const plan = [
    { time: '10:30', name: 'Morning Shoulder Reset', done: true, dur: '90s' },
    { time: '12:15', name: 'Post-Lunch Walk Loop',   done: true, dur: '2m' },
    { time: '14:00', name: 'Neck Release',            done: false, now: true, dur: '90s' },
    { time: '15:45', name: 'Breathing Reset',         done: false, dur: '2m' },
    { time: '17:30', name: 'End-Day Full Stretch',    done: false, dur: '3m' },
  ];

  return (
    <div style={{ paddingBottom: 16 }}>
      {/* Header */}
      <div style={{ padding: '4px 20px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <p style={{ fontSize: 13, color: t.textSec, fontWeight: 400 }}>Good afternoon,</p>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: t.text, marginTop: 2 }}>Alex</h1>
        </div>
        <div style={{ width: 42, height: 42, borderRadius: '50%', background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 700, color: '#fff', flexShrink: 0, boxShadow: `0 4px 14px ${t.primaryGlow}` }}>A</div>
      </div>

      {/* Body Status Card */}
      <div style={{ margin: '0 16px 14px', padding: '18px 18px 16px', background: t.card, borderRadius: 22, border: `1px solid ${t.border}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Body Status</p>
            <p style={{ fontSize: 16, fontWeight: 700, color: t.warning, marginTop: 4 }}>⚠ Elevated Stress</p>
            <p style={{ fontSize: 12, color: t.textSec, marginTop: 2 }}>47 min sitting · 3 meetings back-to-back</p>
          </div>
          <StressOrb t={t} level={stressLevel} />
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          {[
            { icon: '♥', label: 'Heart Rate', val: '78', unit: 'bpm', color: t.danger },
            { icon: '⏱', label: 'Sitting',    val: '47', unit: 'min', color: t.warning },
            { icon: '⚡', label: 'Moves Done', val: '4',  unit: 'today', color: t.primary },
          ].map((s, i) => (
            <div key={i} style={{ flex: 1, background: t.cardAlt, borderRadius: 14, padding: '10px 8px', border: `1px solid ${t.border}`, textAlign: 'center' }}>
              <p style={{ fontSize: 15 }}>{s.icon}</p>
              <p style={{ fontSize: 18, fontWeight: 700, color: s.color, marginTop: 4 }}>{s.val}</p>
              <p style={{ fontSize: 9, color: t.textSec, fontWeight: 500 }}>{s.unit}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Active Suggestion */}
      <div style={{ margin: '0 16px 14px' }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10, paddingLeft: 4 }}>Suggested Right Now</p>
        <div style={{ padding: '18px', background: `linear-gradient(135deg, ${t.primaryDim} 0%, ${t.secondaryDim} 100%)`, border: `1px solid ${t.primary}30`, borderRadius: 22 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
            <div style={{ flex: 1, paddingRight: 12 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: t.warning, borderRadius: 8, padding: '3px 8px', marginBottom: 8 }}>
                <span style={{ fontSize: 10, fontWeight: 800, color: '#000', letterSpacing: '0.05em' }}>⚡ TRIGGERED</span>
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: t.text }}>Neck & Shoulder Reset</h3>
              <p style={{ fontSize: 12, color: t.textSec, marginTop: 4, lineHeight: 1.5 }}>3 back-to-back calls detected — tension building in your shoulders</p>
            </div>
            <div style={{ background: t.primaryDim, border: `1px solid ${t.primary}35`, borderRadius: 14, padding: '10px 14px', textAlign: 'center', flexShrink: 0 }}>
              <p style={{ fontSize: 20, fontWeight: 700, color: t.primary }}>90s</p>
              <p style={{ fontSize: 9, color: t.textSec }}>duration</p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onMouseDown={() => setBtnDown(true)}
              onMouseUp={() => { setBtnDown(false); setStarted(p => !p); }}
              onMouseLeave={() => setBtnDown(false)}
              style={{
                flex: 1, padding: '12px 16px',
                background: started ? t.cardAlt : t.primary,
                color: started ? t.primary : '#000',
                border: started ? `2px solid ${t.primary}` : 'none',
                borderRadius: 14, fontSize: 14, fontWeight: 700, cursor: 'pointer',
                transform: btnDown ? 'scale(0.97)' : 'scale(1)',
                transition: 'transform 0.15s, background 0.2s',
                fontFamily: "'Space Grotesk', sans-serif",
                boxShadow: !started ? `0 4px 16px ${t.primaryGlow}` : 'none',
              }}>
              {started ? '⏸  Pause' : '▶  Start Now'}
            </button>
            <button style={{ padding: '12px 18px', background: t.cardAlt, color: t.textSec, border: `1px solid ${t.border}`, borderRadius: 14, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: "'Space Grotesk', sans-serif" }}>
              Skip
            </button>
          </div>
        </div>
      </div>

      {/* Today's Plan */}
      <div style={{ margin: '0 16px' }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10, paddingLeft: 4 }}>Today's Movement Plan</p>
        {plan.map((item, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '12px 14px', marginBottom: 6,
            background: item.now ? t.primaryDim : t.card,
            border: `1px solid ${item.now ? `${t.primary}35` : t.border}`,
            borderRadius: 16, opacity: item.done ? 0.55 : 1,
            transition: 'background 0.2s',
          }}>
            <div style={{
              width: 30, height: 30, borderRadius: '50%', flexShrink: 0,
              background: item.done ? t.primary : item.now ? t.primaryMid : t.cardAlt,
              border: `2px solid ${item.done || item.now ? t.primary : t.borderMid}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {item.done && <span style={{ fontSize: 13, color: '#000', fontWeight: 700 }}>✓</span>}
              {item.now && !item.done && <div style={{ width: 9, height: 9, borderRadius: '50%', background: t.primary }} />}
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 13, fontWeight: item.now ? 700 : 500, color: t.text, textDecoration: item.done ? 'line-through' : 'none' }}>{item.name}</p>
              <p style={{ fontSize: 11, color: t.textSec, marginTop: 1 }}>{item.time} · {item.dur}</p>
            </div>
            {item.now && <span style={{ fontSize: 10, fontWeight: 800, color: t.primary, background: t.primaryDim, border: `1px solid ${t.primary}40`, padding: '3px 9px', borderRadius: 20, letterSpacing: '0.05em' }}>NOW</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── MovesScreen ──────────────────────────────────────────────────────────────
function MovesScreen({ t }) {
  const [cat, setCat] = useState('all');
  const [sel, setSel] = useState(null);
  const [running, setRunning] = useState(false);

  const cats = [
    { id: 'all',      label: 'All' },
    { id: 'desk',     label: 'Desk' },
    { id: 'standing', label: 'Standing' },
    { id: 'walking',  label: 'Walking' },
    { id: 'breathe',  label: 'Breathe' },
  ];

  const filtered = cat === 'all' ? MOVES : MOVES.filter(m => m.category === cat);

  if (sel !== null) {
    const move = MOVES.find(m => m.id === sel);
    return (
      <div style={{ paddingBottom: 20 }}>
        <div style={{ padding: '8px 20px 14px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={() => { setSel(null); setRunning(false); }} style={{ width: 36, height: 36, background: t.card, border: `1px solid ${t.border}`, borderRadius: 10, cursor: 'pointer', color: t.textSec, fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Space Grotesk', sans-serif", flexShrink: 0 }}>←</button>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: t.text }}>Move Details</h2>
        </div>

        <div style={{ margin: '0 16px', padding: 20, background: `linear-gradient(135deg, ${move.color}18 0%, ${move.color}06 100%)`, border: `1px solid ${move.color}30`, borderRadius: 22 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
            <div style={{ flex: 1, paddingRight: 12 }}>
              <h3 style={{ fontSize: 21, fontWeight: 700, color: t.text }}>{move.name}</h3>
              <p style={{ fontSize: 13, color: t.textSec, marginTop: 5, lineHeight: 1.4 }}>{move.benefit}</p>
            </div>
            <div style={{ background: `${move.color}18`, border: `1px solid ${move.color}35`, borderRadius: 14, padding: '10px 14px', textAlign: 'center', flexShrink: 0 }}>
              <p style={{ fontSize: 20, fontWeight: 700, color: move.color }}>{move.duration}</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
            {move.tags.map(tag => (
              <span key={tag} style={{ background: t.primaryDim, border: `1px solid ${t.primary}30`, borderRadius: 20, padding: '3px 10px', fontSize: 11, fontWeight: 600, color: t.primary }}>{tag}</span>
            ))}
            <span style={{ background: t.secondaryDim, border: `1px solid ${t.secondary}30`, borderRadius: 20, padding: '3px 10px', fontSize: 11, fontWeight: 600, color: t.secondary }}>{move.difficulty}</span>
            <span style={{ background: t.cardAlt, border: `1px solid ${t.border}`, borderRadius: 20, padding: '3px 10px', fontSize: 11, fontWeight: 600, color: t.textSec }}>~{move.calories} kcal</span>
          </div>
        </div>

        <div style={{ margin: '14px 16px', background: t.card, borderRadius: 22, border: `1px solid ${t.border}`, padding: '18px' }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 14 }}>Step-by-Step</p>
          {move.steps.map((step, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, marginBottom: i < move.steps.length - 1 ? 14 : 0, alignItems: 'flex-start' }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: `${move.color}18`, border: `2px solid ${move.color}50`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: move.color }}>{i + 1}</span>
              </div>
              <p style={{ fontSize: 14, color: t.text, lineHeight: 1.5, paddingTop: 4 }}>{step}</p>
            </div>
          ))}
        </div>

        <div style={{ padding: '0 16px' }}>
          <button onClick={() => setRunning(p => !p)} style={{
            width: '100%', padding: 15, background: running ? t.cardAlt : move.color,
            color: running ? move.color : '#000',
            border: running ? `2px solid ${move.color}` : 'none',
            borderRadius: 16, fontSize: 15, fontWeight: 700, cursor: 'pointer',
            fontFamily: "'Space Grotesk', sans-serif",
            boxShadow: !running ? `0 6px 20px ${move.color}35` : 'none',
            transition: 'all 0.2s',
          }}>
            {running ? '⏸  Pause Move' : '▶  Start This Move'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ paddingBottom: 12 }}>
      <div style={{ padding: '4px 20px 14px' }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: t.text }}>Movement Snacks</h2>
        <p style={{ fontSize: 13, color: t.textSec, marginTop: 3 }}>Quick resets under 3 minutes</p>
      </div>

      <div style={{ paddingLeft: 16, paddingRight: 16, marginBottom: 14, display: 'flex', gap: 7, overflowX: 'auto', scrollbarWidth: 'none' }}>
        {cats.map(c => (
          <button key={c.id} onClick={() => setCat(c.id)} style={{
            padding: '7px 15px', borderRadius: 20,
            background: cat === c.id ? t.primary : t.card,
            color: cat === c.id ? '#000' : t.textSec,
            border: `1px solid ${cat === c.id ? t.primary : t.border}`,
            fontSize: 13, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap',
            fontFamily: "'Space Grotesk', sans-serif",
            transition: 'all 0.15s',
          }}>{c.label}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {filtered.map(move => (
          <div key={move.id} onClick={() => setSel(move.id)} style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 18, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer', transition: 'border-color 0.15s' }}>
            <div style={{ width: 50, height: 50, borderRadius: 15, background: `${move.color}18`, border: `1px solid ${move.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <div style={{ width: 22, height: 22, borderRadius: '50%', background: move.color, boxShadow: `0 2px 10px ${move.color}50` }} />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 14, fontWeight: 600, color: t.text }}>{move.name}</p>
              <p style={{ fontSize: 12, color: t.textSec, marginTop: 2 }}>{move.benefit}</p>
              <div style={{ display: 'flex', gap: 6, marginTop: 7 }}>
                <span style={{ fontSize: 11, color: t.textSec, background: t.cardAlt, padding: '2px 8px', borderRadius: 10, border: `1px solid ${t.border}` }}>{move.duration}</span>
                <span style={{ fontSize: 11, color: t.textSec, background: t.cardAlt, padding: '2px 8px', borderRadius: 10, border: `1px solid ${t.border}` }}>{move.difficulty}</span>
              </div>
            </div>
            <span style={{ color: t.textMuted, fontSize: 20, flexShrink: 0 }}>›</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── InsightsScreen ───────────────────────────────────────────────────────────
function InsightsScreen({ t }) {
  const [metric, setMetric] = useState('moves');

  const typeColors = (type, t) => ({
    energy: t.warning, stress: t.danger, focus: t.secondary, posture: t.primary
  }[type] || t.primary);

  return (
    <div style={{ paddingBottom: 12 }}>
      <div style={{ padding: '4px 20px 14px' }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: t.text }}>Insights</h2>
        <p style={{ fontSize: 13, color: t.textSec, marginTop: 3 }}>Your personalized trigger map</p>
      </div>

      {/* Summary Row */}
      <div style={{ padding: '0 16px', display: 'flex', gap: 10, marginBottom: 14 }}>
        {[
          { label: 'Avg Stress Drop', val: '−34%', sub: 'after a move', color: t.primary },
          { label: 'Peak Trigger',    val: '2 pm', sub: 'post-lunch fog', color: t.warning },
          { label: 'Daily Streak',    val: '6 days', sub: 'moving daily', color: t.secondary },
        ].map((s, i) => (
          <div key={i} style={{ flex: 1, background: t.card, border: `1px solid ${t.border}`, borderRadius: 16, padding: '12px 10px', textAlign: 'center' }}>
            <p style={{ fontSize: 18, fontWeight: 700, color: s.color }}>{s.val}</p>
            <p style={{ fontSize: 9, fontWeight: 700, color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: 3 }}>{s.label}</p>
            <p style={{ fontSize: 10, color: t.textMuted, marginTop: 1 }}>{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Weekly Chart */}
      <div style={{ margin: '0 16px 14px', background: t.card, border: `1px solid ${t.border}`, borderRadius: 20, padding: '16px 16px 12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <p style={{ fontSize: 14, fontWeight: 600, color: t.text }}>This Week</p>
          <div style={{ display: 'flex', gap: 5 }}>
            {['moves', 'stress', 'mood'].map(m => (
              <button key={m} onClick={() => setMetric(m)} style={{
                padding: '4px 10px', borderRadius: 10,
                background: metric === m ? t.primary : t.cardAlt,
                color: metric === m ? '#000' : t.textSec,
                border: `1px solid ${metric === m ? t.primary : t.border}`,
                fontSize: 11, fontWeight: 700, cursor: 'pointer',
                fontFamily: "'Space Grotesk', sans-serif",
                transition: 'all 0.15s',
              }}>{m}</button>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 80 }}>
          {WEEK.map((d, i) => {
            const raw = metric === 'moves' ? d.moves / 10 : metric === 'stress' ? d.stress / 100 : d.mood / 100;
            const color = metric === 'stress'
              ? (d.stress >= 70 ? t.danger : d.stress >= 50 ? t.warning : t.primary)
              : t.primary;
            const isToday = i === 5;
            return (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
                <div style={{ width: '100%', height: 68, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                  <div style={{
                    width: '65%', height: `${Math.max(raw * 100, 6)}%`,
                    background: isToday ? color : `${color}80`,
                    borderRadius: '5px 5px 3px 3px',
                    boxShadow: isToday ? `0 0 10px ${color}40` : 'none',
                  }} />
                </div>
                <span style={{ fontSize: 10, color: isToday ? t.primary : t.textSec, fontWeight: isToday ? 700 : 400 }}>{d.day}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Trigger Map */}
      <div style={{ margin: '0 16px 14px', background: t.card, border: `1px solid ${t.border}`, borderRadius: 20, padding: 16 }}>
        <p style={{ fontSize: 14, fontWeight: 600, color: t.text, marginBottom: 4 }}>Daily Trigger Map</p>
        <p style={{ fontSize: 12, color: t.textSec, marginBottom: 14 }}>From your last 30 days of patterns</p>

        {TRIGGERS.map((tr, i) => {
          const tc = typeColors(tr.type, t);
          return (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: i < TRIGGERS.length - 1 ? 10 : 0 }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: t.textSec, width: 34, flexShrink: 0 }}>{tr.time}</span>
              <div style={{ flex: 1, height: 9, background: t.cardAlt, borderRadius: 5, overflow: 'hidden', border: `1px solid ${t.border}` }}>
                <div style={{ width: `${tr.intensity}%`, height: '100%', background: `linear-gradient(90deg, ${tc}BB, ${tc})`, borderRadius: 5, transition: 'width 0.3s' }} />
              </div>
              <span style={{ fontSize: 11, fontWeight: 700, color: tc, width: 30, textAlign: 'right', flexShrink: 0 }}>{tr.intensity}%</span>
              <div style={{ background: `${tc}18`, border: `1px solid ${tc}30`, borderRadius: 8, padding: '2px 7px', flexShrink: 0 }}>
                <span style={{ fontSize: 10, color: tc, fontWeight: 700 }}>{tr.type}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Top Effective Moves */}
      <div style={{ margin: '0 16px', background: t.card, border: `1px solid ${t.border}`, borderRadius: 20, padding: 16 }}>
        <p style={{ fontSize: 14, fontWeight: 600, color: t.text, marginBottom: 12 }}>Most Effective for You</p>
        {[
          { name: 'Neck & Shoulder Reset', improvement: '+42%', metric: 'focus', color: t.primary },
          { name: '4-7-8 Breathing',        improvement: '−38%', metric: 'stress', color: t.secondary },
          { name: 'Post-Meeting Energizer', improvement: '+55%', metric: 'energy', color: t.warning },
        ].map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: i < 2 ? 9 : 0, padding: '10px 12px', background: t.cardAlt, borderRadius: 14, border: `1px solid ${t.border}` }}>
            <div style={{ width: 36, height: 36, borderRadius: 11, background: `${item.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: `1px solid ${item.color}30` }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: item.color }}>#{i + 1}</span>
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: t.text }}>{item.name}</p>
              <p style={{ fontSize: 11, color: t.textSec, marginTop: 1 }}>{item.metric} impact</p>
            </div>
            <span style={{ fontSize: 15, fontWeight: 700, color: item.color }}>{item.improvement}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── ProfileScreen ────────────────────────────────────────────────────────────
function ProfileScreen({ t, theme, toggleTheme }) {
  const [notifs, setNotifs]   = useState(true);
  const [wearable, setWearable] = useState(true);
  const [smart, setSmart]     = useState(true);
  const [cal, setCal]         = useState(true);

  function Toggle({ on, onChange, accent }) {
    const ac = accent || t.primary;
    return (
      <div onClick={onChange} style={{ width: 46, height: 26, borderRadius: 13, background: on ? ac : t.borderMid, position: 'relative', cursor: 'pointer', transition: 'background 0.2s', flexShrink: 0 }}>
        <div style={{ position: 'absolute', top: 3, left: on ? 23 : 3, width: 20, height: 20, borderRadius: '50%', background: '#fff', transition: 'left 0.2s', boxShadow: '0 1px 4px rgba(0,0,0,0.2)' }} />
      </div>
    );
  }

  function SectionHeader({ label }) {
    return <p style={{ fontSize: 11, fontWeight: 700, color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 8px 20px' }}>{label}</p>;
  }

  function SettingRow({ icon, label, sub, on, onToggle, accent, last }) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', padding: '14px 16px', borderBottom: last ? 'none' : `1px solid ${t.border}` }}>
        <div style={{ width: 38, height: 38, borderRadius: 11, background: t.cardAlt, display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 13, flexShrink: 0, fontSize: 18, border: `1px solid ${t.border}` }}>{icon}</div>
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: 14, fontWeight: 600, color: t.text }}>{label}</p>
          {sub && <p style={{ fontSize: 12, color: t.textSec, marginTop: 1 }}>{sub}</p>}
        </div>
        <Toggle on={on} onChange={onToggle} accent={accent} />
      </div>
    );
  }

  return (
    <div style={{ paddingBottom: 24 }}>
      <div style={{ padding: '4px 20px 14px' }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: t.text }}>Profile</h2>
      </div>

      {/* Profile Hero */}
      <div style={{ margin: '0 16px 20px', padding: '20px', background: `linear-gradient(135deg, ${t.primaryDim} 0%, ${t.secondaryDim} 100%)`, border: `1px solid ${t.primary}22`, borderRadius: 22, display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ width: 64, height: 64, borderRadius: '50%', background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, fontWeight: 700, color: '#fff', flexShrink: 0, boxShadow: `0 6px 20px ${t.primaryGlow}` }}>A</div>
        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: t.text }}>Alex Johnson</h3>
          <p style={{ fontSize: 13, color: t.textSec, marginTop: 2 }}>alex@company.com</p>
          <div style={{ display: 'flex', gap: 7, marginTop: 8 }}>
            <span style={{ background: t.primaryDim, border: `1px solid ${t.primary}30`, borderRadius: 9, padding: '3px 9px', fontSize: 11, fontWeight: 700, color: t.primary }}>6-day streak</span>
            <span style={{ background: t.secondaryDim, border: `1px solid ${t.secondary}30`, borderRadius: 9, padding: '3px 9px', fontSize: 11, fontWeight: 700, color: t.secondary }}>42 moves</span>
          </div>
        </div>
      </div>

      {/* Appearance */}
      <div style={{ marginBottom: 20 }}>
        <SectionHeader label="Appearance" />
        <div style={{ margin: '0 16px', background: t.card, border: `1px solid ${t.border}`, borderRadius: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', padding: '14px 16px' }}>
            <div style={{ width: 38, height: 38, borderRadius: 11, background: t.cardAlt, display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 13, flexShrink: 0, fontSize: 18, border: `1px solid ${t.border}` }}>{theme === 'dark' ? '🌙' : '☀️'}</div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 14, fontWeight: 600, color: t.text }}>{theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</p>
              <p style={{ fontSize: 12, color: t.textSec, marginTop: 1 }}>Tap to switch app theme</p>
            </div>
            <div onClick={toggleTheme} style={{ width: 46, height: 26, borderRadius: 13, background: theme === 'dark' ? t.secondary : t.warning, position: 'relative', cursor: 'pointer', transition: 'background 0.25s', flexShrink: 0 }}>
              <div style={{ position: 'absolute', top: 3, left: theme === 'dark' ? 23 : 3, width: 20, height: 20, borderRadius: '50%', background: '#fff', transition: 'left 0.25s', boxShadow: '0 1px 4px rgba(0,0,0,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11 }}>{theme === 'dark' ? '🌙' : '☀️'}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Connections */}
      <div style={{ marginBottom: 20 }}>
        <SectionHeader label="Connected Devices" />
        <div style={{ margin: '0 16px', background: t.card, border: `1px solid ${t.border}`, borderRadius: 18 }}>
          <SettingRow icon="⌚" label="Apple Watch" sub="Connected · Series 9 · HR + Activity" on={wearable} onToggle={() => setWearable(p => !p)} />
          <SettingRow icon="📅" label="Google Calendar" sub="Detects meetings & schedule context" on={cal} onToggle={() => setCal(p => !p)} />
          <SettingRow icon="🏃" label="Apple Health" sub="Activity, heart rate & movement data" on={true} onToggle={() => {}} last />
        </div>
      </div>

      {/* Notifications */}
      <div style={{ marginBottom: 20 }}>
        <SectionHeader label="Smart Alerts" />
        <div style={{ margin: '0 16px', background: t.card, border: `1px solid ${t.border}`, borderRadius: 18 }}>
          <SettingRow icon="🔔" label="Smart Notifications" sub="Only nudges you when it truly matters" on={notifs} onToggle={() => setNotifs(p => !p)} />
          <SettingRow icon="⚡" label="Context Awareness" sub="Respects meetings, focus time & calls" on={smart} onToggle={() => setSmart(p => !p)} last />
        </div>
      </div>

      {/* Data summary mini-card */}
      <div style={{ margin: '0 16px 16px', background: t.card, border: `1px solid ${t.border}`, borderRadius: 18, padding: '14px 16px' }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>Your Data This Month</p>
        <div style={{ display: 'flex', gap: 0 }}>
          {[
            { val: '42', label: 'Moves Done', color: t.primary },
            { val: '138m', label: 'Active Time', color: t.secondary },
            { val: '−31%', label: 'Stress Score', color: t.warning },
          ].map((s, i) => (
            <div key={i} style={{ flex: 1, textAlign: 'center', borderRight: i < 2 ? `1px solid ${t.border}` : 'none', padding: '0 4px' }}>
              <p style={{ fontSize: 20, fontWeight: 700, color: s.color }}>{s.val}</p>
              <p style={{ fontSize: 10, color: t.textSec, marginTop: 2 }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Sign out */}
      <div style={{ padding: '0 16px' }}>
        <button style={{ width: '100%', padding: 14, background: 'transparent', border: `1px solid ${t.border}`, borderRadius: 16, fontSize: 14, fontWeight: 600, color: t.danger, cursor: 'pointer', fontFamily: "'Space Grotesk', sans-serif", transition: 'border-color 0.2s' }}>
          Sign Out
        </button>
      </div>
    </div>
  );
}

// ── App ──────────────────────────────────────────────────────────────────────
function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [theme, setTheme] = useState('dark');
  const t = themes[theme];
  const toggleTheme = () => setTheme(p => p === 'dark' ? 'light' : 'dark');

  const tabs = [
    { id: 'home',     label: 'Home',     icon: window.lucide.Home },
    { id: 'moves',    label: 'Moves',    icon: window.lucide.Zap },
    { id: 'insights', label: 'Insights', icon: window.lucide.BarChart2 },
    { id: 'profile',  label: 'Profile',  icon: window.lucide.User },
  ];

  const screens = {
    home:     HomeScreen,
    moves:    MovesScreen,
    insights: InsightsScreen,
    profile:  ProfileScreen,
  };

  const ActiveScreen = screens[activeTab];

  return (
    <div style={{ background: '#050810', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Space Grotesk', sans-serif", padding: 20 }}>
      <div style={{
        width: 375, height: 812,
        background: t.bg,
        borderRadius: 46,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex', flexDirection: 'column',
        boxShadow: '0 40px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.07)',
        transition: 'background 0.3s ease',
      }}>
        {/* Dynamic Island */}
        <div style={{ position: 'absolute', top: 13, left: '50%', transform: 'translateX(-50%)', width: 128, height: 36, background: '#000', borderRadius: 22, zIndex: 100, boxShadow: '0 2px 10px rgba(0,0,0,0.5)' }} />

        <StatusBar t={t} />

        {/* Scrollable Screen Area */}
        <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}>
          <ActiveScreen t={t} theme={theme} toggleTheme={toggleTheme} />
        </div>

        {/* Bottom Navigation */}
        <div style={{ background: t.surface, borderTop: `1px solid ${t.border}`, padding: '10px 4px 22px', display: 'flex', transition: 'background 0.3s' }}>
          {tabs.map(tab =>
            React.createElement('div', {
              key: tab.id,
              onClick: () => setActiveTab(tab.id),
              style: {
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 4,
                cursor: 'pointer',
                padding: '2px 0',
                color: activeTab === tab.id ? t.primary : t.textMuted,
                transition: 'color 0.18s ease',
                fontFamily: "'Space Grotesk', sans-serif",
                position: 'relative',
              }
            },
              activeTab === tab.id && React.createElement('div', {
                style: {
                  position: 'absolute', top: -2, width: 28, height: 3,
                  background: t.primary, borderRadius: '0 0 3px 3px',
                  boxShadow: `0 2px 8px ${t.primaryGlow}`,
                }
              }),
              React.createElement(tab.icon, {
                size: 22,
                strokeWidth: activeTab === tab.id ? 2.5 : 1.8,
              }),
              React.createElement('span', {
                style: {
                  fontSize: 10,
                  fontWeight: activeTab === tab.id ? 700 : 500,
                  fontFamily: "'Space Grotesk', sans-serif",
                  letterSpacing: '0.02em',
                }
              }, tab.label)
            )
          )}
        </div>
      </div>
    </div>
  );
}
