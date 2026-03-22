const { useState, useEffect, useRef } = React;

// Inject Google Font + global resets
const _style = document.createElement('style');
_style.textContent = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  ::-webkit-scrollbar { width: 0px; }
  input:focus { outline: none; }
  button { font-family: 'Plus Jakarta Sans', sans-serif; }
`;
document.head.appendChild(_style);

// ─── Themes ──────────────────────────────────────────────────────────────────
const THEMES = {
  dark: {
    bg: '#070C18',
    surface: '#0D1526',
    card: '#132030',
    cardAlt: '#192840',
    border: '#1B2B42',
    accent: '#00E5CC',
    accentDim: 'rgba(0,229,204,0.12)',
    accentGlow: 'rgba(0,229,204,0.3)',
    accentGrad: 'linear-gradient(135deg, #00E5CC 0%, #00B4D8 100%)',
    secondary: '#FF6B8A',
    secondaryDim: 'rgba(255,107,138,0.12)',
    amber: '#FFAB40',
    amberDim: 'rgba(255,171,64,0.12)',
    violet: '#A78BFA',
    violetDim: 'rgba(167,139,250,0.12)',
    green: '#4ADE80',
    greenDim: 'rgba(74,222,128,0.12)',
    text: '#EEF2FF',
    textSub: '#6272A4',
    textMuted: '#2A3A58',
    overlay: 'rgba(7,12,24,0.92)',
  },
  light: {
    bg: '#EFF3FF',
    surface: '#FFFFFF',
    card: '#F7F9FF',
    cardAlt: '#EDF1FF',
    border: '#DDE4F5',
    accent: '#00B8A9',
    accentDim: 'rgba(0,184,169,0.1)',
    accentGlow: 'rgba(0,184,169,0.25)',
    accentGrad: 'linear-gradient(135deg, #00B8A9 0%, #0095B8 100%)',
    secondary: '#F43F5E',
    secondaryDim: 'rgba(244,63,94,0.1)',
    amber: '#D97706',
    amberDim: 'rgba(217,119,6,0.1)',
    violet: '#7C3AED',
    violetDim: 'rgba(124,58,237,0.1)',
    green: '#059669',
    greenDim: 'rgba(5,150,105,0.1)',
    text: '#0F172A',
    textSub: '#475569',
    textMuted: '#94A3B8',
    overlay: 'rgba(239,243,255,0.92)',
  },
};

// ─── Mock Data ────────────────────────────────────────────────────────────────
const TIDES = [
  {
    id: 'tide1', time: '8:00', period: 'AM', endTime: '9:30', endPeriod: 'AM',
    title: 'Deep Work Block', subtitle: 'Q2 Report — Key Findings',
    type: 'deep', energy: 'high', colorKey: 'accent', icon: 'Brain',
    tasks: [
      { id: 't1', text: 'Draft executive summary', done: true, mins: 20 },
      { id: 't2', text: 'Pull last month\'s metrics', done: true, mins: 15 },
      { id: 't3', text: 'Write key findings section', done: false, mins: 45 },
      { id: 't4', text: 'Format charts & graphs', done: false, mins: 25 },
    ],
  },
  {
    id: 'tide2', time: '10:00', period: 'AM', endTime: '10:45', endPeriod: 'AM',
    title: 'Call Batch', subtitle: '3 calls, same mental mode',
    type: 'calls', energy: 'medium', colorKey: 'violet', icon: 'Phone',
    tasks: [
      { id: 't5', text: 'Check in with Sarah (design)', done: false, mins: 10 },
      { id: 't6', text: 'Client call re: timeline', done: false, mins: 15 },
      { id: 't7', text: 'Book dentist appointment', done: false, mins: 5 },
    ],
  },
  {
    id: 'tide3', time: '12:00', period: 'PM', endTime: '12:30', endPeriod: 'PM',
    title: 'Email Sweep', subtitle: 'Low-energy window — perfect timing',
    type: 'email', energy: 'low', colorKey: 'secondary', icon: 'Mail',
    tasks: [
      { id: 't8', text: 'Reply to 3 pending approvals', done: false, mins: 10 },
      { id: 't9', text: 'Forward vendor quote to finance', done: false, mins: 5 },
      { id: 't10', text: 'Clear newsletter backlog', done: false, mins: 8 },
    ],
  },
  {
    id: 'tide4', time: '3:00', period: 'PM', endTime: '4:00', endPeriod: 'PM',
    title: 'School Run + Errands', subtitle: 'Audio content recommended',
    type: 'errands', energy: 'medium', colorKey: 'amber', icon: 'Car',
    tasks: [
      { id: 't11', text: 'Pick up kids from school', done: false, mins: 20 },
      { id: 't12', text: 'Grocery stop (list in notes)', done: false, mins: 25 },
      { id: 't13', text: 'Return Amazon package', done: false, mins: 10 },
    ],
  },
  {
    id: 'tide5', time: '9:00', period: 'PM', endTime: '10:00', endPeriod: 'PM',
    title: 'Night Focus', subtitle: 'Your reliable second wind',
    type: 'deep', energy: 'medium', colorKey: 'accent', icon: 'Moon',
    tasks: [
      { id: 't14', text: 'Review tomorrow\'s agenda', done: false, mins: 10 },
      { id: 't15', text: 'Finish key findings section', done: false, mins: 40 },
    ],
  },
];

const ENERGY_CURVE = [
  { h: '6A', v: 38 }, { h: '7A', v: 55 }, { h: '8A', v: 82 }, { h: '9A', v: 91 },
  { h: '10A', v: 76 }, { h: '11A', v: 68 }, { h: '12P', v: 52 }, { h: '1P', v: 38 },
  { h: '2P', v: 32 }, { h: '3P', v: 48 }, { h: '4P', v: 62 }, { h: '5P', v: 57 },
  { h: '6P', v: 44 }, { h: '7P', v: 52 }, { h: '8P', v: 68 }, { h: '9P', v: 72 },
  { h: '10P', v: 50 },
];

const INSIGHTS = [
  { title: 'Peak Focus Hours', body: 'You do 3× better on demanding tasks between 8–10 AM. Deep work is always scheduled here first.', icon: 'Sunrise', colorKey: 'accent' },
  { title: 'Afternoon Dip', body: 'Energy drops sharply 1:00–2:30 PM. TaskTide now reserves this for calls, email, and passive tasks.', icon: 'TrendingDown', colorKey: 'amber' },
  { title: 'Procrastination Trigger', body: 'Admin tasks linger when grouped with deep work. Context bundles improved your clearance rate by 40%.', icon: 'Clock', colorKey: 'violet' },
  { title: 'Night Owl Pattern', body: 'You have a reliable second wind after 8:30 PM — great for finishing creative or reflective work.', icon: 'Moon', colorKey: 'secondary' },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function tc(t, key) {
  const map = { accent: t.accent, secondary: t.secondary, amber: t.amber, violet: t.violet, green: t.green };
  return map[key] || t.accent;
}
function tcDim(t, key) {
  const map = { accent: t.accentDim, secondary: t.secondaryDim, amber: t.amberDim, violet: t.violetDim, green: t.greenDim };
  return map[key] || t.accentDim;
}
function Icon(name, props) {
  const C = window.lucide[name] || window.lucide.Circle;
  return React.createElement(C, props);
}

// ─── Dynamic Island ───────────────────────────────────────────────────────────
function DynamicIsland({ t }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '14px', paddingBottom: '6px', backgroundColor: t.bg, flexShrink: 0 }}>
      <div style={{ width: '126px', height: '36px', backgroundColor: '#000', borderRadius: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
        <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#111', border: '1.5px solid #2a2a2a' }} />
        <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#1a1a1a' }} />
      </div>
    </div>
  );
}

// ─── Status Bar ───────────────────────────────────────────────────────────────
function StatusBar({ t }) {
  const [time, setTime] = useState('');
  useEffect(() => {
    const fmt = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }));
    };
    fmt();
    const id = setInterval(fmt, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingLeft: '26px', paddingRight: '22px', paddingBottom: '8px', backgroundColor: t.bg, flexShrink: 0 }}>
      <span style={{ fontSize: '14px', fontWeight: '700', color: t.text, letterSpacing: '-0.02em' }}>{time}</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
        {Icon('Signal', { size: 13, color: t.textSub })}
        {Icon('Wifi', { size: 13, color: t.textSub })}
        {Icon('Battery', { size: 16, color: t.textSub })}
      </div>
    </div>
  );
}

// ─── Home Screen ──────────────────────────────────────────────────────────────
function HomeScreen({ t }) {
  const [expanded, setExpanded] = useState('tide1');
  const [done, setDone] = useState({ t1: true, t2: true });

  const totalTasks = TIDES.reduce((s, tide) => s + tide.tasks.length, 0);
  const doneCount = Object.values(done).filter(Boolean).length;

  return (
    <div style={{ backgroundColor: t.bg, paddingBottom: '20px' }}>
      {/* Header */}
      <div style={{ padding: '4px 20px 16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
          <div>
            <p style={{ fontSize: '12px', color: t.textSub, fontWeight: '600', letterSpacing: '0.04em', marginBottom: '3px' }}>SUNDAY, MARCH 22</p>
            <h1 style={{ fontSize: '26px', fontWeight: '800', color: t.text, letterSpacing: '-0.03em', lineHeight: 1.1 }}>Good Morning,{'\n'}Alex</h1>
          </div>
          <div style={{ backgroundColor: t.accentDim, border: `1px solid ${t.accent}35`, borderRadius: '14px', padding: '10px 14px', textAlign: 'center' }}>
            <div style={{ fontSize: '10px', color: t.accent, fontWeight: '700', letterSpacing: '0.06em', marginBottom: '3px' }}>ENERGY</div>
            <div style={{ fontSize: '22px', fontWeight: '800', color: t.accent, letterSpacing: '-0.03em' }}>87%</div>
            <div style={{ fontSize: '10px', color: t.textSub, fontWeight: '500' }}>Peak now</div>
          </div>
        </div>
        {/* Progress bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '7px' }}>
          <span style={{ fontSize: '12px', color: t.textSub, fontWeight: '500' }}>Today's progress</span>
          <span style={{ fontSize: '12px', color: t.accent, fontWeight: '700' }}>{doneCount}/{totalTasks} tasks done</span>
        </div>
        <div style={{ height: '5px', backgroundColor: t.border, borderRadius: '99px', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${(doneCount / totalTasks) * 100}%`, background: t.accentGrad, borderRadius: '99px', transition: 'width 0.5s ease' }} />
        </div>
      </div>

      {/* Active tide banner */}
      <div style={{ padding: '0 16px 16px' }}>
        <div style={{ background: `linear-gradient(135deg, ${t.accent}20 0%, ${t.accent}08 100%)`, border: `1px solid ${t.accent}45`, borderRadius: '18px', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '44px', height: '44px', background: t.accentGrad, borderRadius: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: `0 4px 16px ${t.accentGlow}` }}>
            {Icon('Zap', { size: 21, color: '#fff', strokeWidth: 2.5 })}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '10px', color: t.accent, fontWeight: '700', letterSpacing: '0.07em', marginBottom: '2px' }}>ACTIVE TIDE</div>
            <div style={{ fontSize: '15px', fontWeight: '800', color: t.text }}>Deep Work Block</div>
            <div style={{ fontSize: '11px', color: t.textSub }}>8:00 – 9:30 AM · 45 min remaining</div>
          </div>
          <div style={{ backgroundColor: t.accent, color: t.bg, fontSize: '12px', fontWeight: '800', padding: '6px 12px', borderRadius: '99px', letterSpacing: '0.04em' }}>GO</div>
        </div>
      </div>

      {/* Tides list */}
      <div style={{ padding: '0 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
          {Icon('Waves', { size: 14, color: t.accent })}
          <span style={{ fontSize: '11px', fontWeight: '700', color: t.textSub, letterSpacing: '0.07em' }}>TODAY'S TIDES</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
          {TIDES.map(tide => {
            const isExp = expanded === tide.id;
            const color = tc(t, tide.colorKey);
            const colorDim = tcDim(t, tide.colorKey);
            const doneInTide = tide.tasks.filter(tk => done[tk.id]).length;
            return (
              <div key={tide.id} style={{ backgroundColor: t.card, border: `1px solid ${t.border}`, borderLeft: `3px solid ${color}`, borderRadius: '14px', overflow: 'hidden', transition: 'all 0.2s ease' }}>
                <div onClick={() => setExpanded(isExp ? null : tide.id)} style={{ display: 'flex', alignItems: 'center', gap: '11px', padding: '13px 14px', cursor: 'pointer' }}>
                  <div style={{ textAlign: 'right', minWidth: '40px' }}>
                    <div style={{ fontSize: '13px', fontWeight: '700', color: t.text }}>{tide.time}</div>
                    <div style={{ fontSize: '10px', color: t.textSub }}>{tide.period}</div>
                  </div>
                  <div style={{ width: '34px', height: '34px', backgroundColor: colorDim, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {Icon(tide.icon, { size: 16, color })}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '14px', fontWeight: '700', color: t.text, lineHeight: 1.3 }}>{tide.title}</div>
                    <div style={{ fontSize: '11px', color: t.textSub }}>{doneInTide}/{tide.tasks.length} tasks</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
                    <div style={{ fontSize: '10px', fontWeight: '700', color: tide.energy === 'high' ? t.accent : tide.energy === 'medium' ? t.amber : t.secondary, backgroundColor: tide.energy === 'high' ? t.accentDim : tide.energy === 'medium' ? t.amberDim : t.secondaryDim, padding: '3px 7px', borderRadius: '99px' }}>{tide.energy.toUpperCase()}</div>
                    {Icon(isExp ? 'ChevronUp' : 'ChevronDown', { size: 14, color: t.textMuted })}
                  </div>
                </div>
                {isExp && (
                  <div style={{ padding: '0 14px 13px', borderTop: `1px solid ${t.border}` }}>
                    <div style={{ height: '8px' }} />
                    <div style={{ fontSize: '11px', color: t.textSub, marginBottom: '8px', fontStyle: 'italic' }}>{tide.subtitle}</div>
                    {tide.tasks.map(task => {
                      const isDone = !!done[task.id];
                      return (
                        <div key={task.id} onClick={() => setDone(p => ({ ...p, [task.id]: !p[task.id] }))} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 0', cursor: 'pointer', borderBottom: `1px solid ${t.border}10` }}>
                          <div style={{ width: '21px', height: '21px', borderRadius: '7px', border: `2px solid ${isDone ? color : t.border}`, backgroundColor: isDone ? color : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.15s ease' }}>
                            {isDone && Icon('Check', { size: 11, color: '#fff', strokeWidth: 3 })}
                          </div>
                          <span style={{ flex: 1, fontSize: '13px', fontWeight: '500', color: isDone ? t.textMuted : t.text, textDecoration: isDone ? 'line-through' : 'none' }}>{task.text}</span>
                          <span style={{ fontSize: '11px', color: t.textMuted, fontWeight: '500' }}>{task.mins}m</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Focus Screen ─────────────────────────────────────────────────────────────
function FocusScreen({ t }) {
  const [activeIdx, setActiveIdx] = useState(2);
  const [running, setRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(45 * 60);
  const [reEntry, setReEntry] = useState(false);
  const [recDone, setRecDone] = useState({});
  const timerRef = useRef(null);

  useEffect(() => {
    if (running) {
      timerRef.current = setInterval(() => setTimeLeft(prev => Math.max(0, prev - 1)), 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [running]);

  const fmt = s => `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`;
  const tide = TIDES[0];
  const currentTask = tide.tasks[activeIdx];
  const progress = 1 - timeLeft / (45 * 60);
  const R = 88;
  const circ = 2 * Math.PI * R;

  const recoverySteps = [
    { text: 'Take 2 deep breaths — let it go', mins: 1, colorKey: 'green' },
    { text: 'Check where you left off (last 3 lines)', mins: 2, colorKey: 'accent' },
    { text: 'Write ONE sentence: key findings intro', mins: 5, colorKey: 'accent' },
    { text: 'Set a 15-min sprint — no distractions', mins: 15, colorKey: 'violet' },
    { text: 'Decide: continue now or reschedule?', mins: 2, colorKey: 'amber' },
  ];

  if (reEntry) {
    return (
      <div style={{ padding: '16px', backgroundColor: t.bg, minHeight: '100%' }}>
        <div style={{ backgroundColor: t.amberDim, border: `1px solid ${t.amber}45`, borderRadius: '18px', padding: '16px', marginBottom: '22px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            {Icon('AlertTriangle', { size: 18, color: t.amber })}
            <span style={{ fontSize: '16px', fontWeight: '800', color: t.amber }}>Re-entry Mode</span>
          </div>
          <p style={{ fontSize: '13px', color: t.textSub, lineHeight: 1.6 }}>Day went off-script? Here's your fastest path back. Complete these in order — momentum builds step by step.</p>
        </div>
        <h2 style={{ fontSize: '14px', fontWeight: '700', color: t.textSub, letterSpacing: '0.05em', marginBottom: '12px' }}>RECOVERY SEQUENCE</h2>
        {recoverySteps.map((step, i) => {
          const d = !!recDone[i];
          const color = tc(t, step.colorKey);
          return (
            <div key={i} onClick={() => setRecDone(p => ({ ...p, [i]: !p[i] }))} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px', backgroundColor: t.card, border: `1px solid ${d ? color + '50' : t.border}`, borderRadius: '14px', marginBottom: '8px', cursor: 'pointer', transition: 'all 0.2s ease', opacity: d ? 0.55 : 1 }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: d ? color : t.cardAlt, border: `2px solid ${d ? color : t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '12px', fontWeight: '800', color: d ? '#fff' : t.textSub, transition: 'all 0.2s' }}>
                {d ? Icon('Check', { size: 13, strokeWidth: 3 }) : i + 1}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '13px', fontWeight: '600', color: d ? t.textMuted : t.text, textDecoration: d ? 'line-through' : 'none' }}>{step.text}</div>
                <div style={{ fontSize: '11px', color: t.textSub, marginTop: '2px' }}>{step.mins} min</div>
              </div>
              {Icon('ArrowRight', { size: 14, color: t.textMuted })}
            </div>
          );
        })}
        <button onClick={() => { setReEntry(false); setRecDone({}); }} style={{ width: '100%', marginTop: '14px', padding: '15px', background: t.accentGrad, border: 'none', borderRadius: '15px', fontSize: '15px', fontWeight: '800', color: '#fff', cursor: 'pointer', letterSpacing: '-0.01em' }}>
          Back to Focus Mode
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '16px 20px', backgroundColor: t.bg, minHeight: '100%' }}>
      <div style={{ textAlign: 'center', marginBottom: '6px' }}>
        <p style={{ fontSize: '11px', color: t.textSub, fontWeight: '600', letterSpacing: '0.07em', marginBottom: '6px' }}>FOCUSED ON</p>
        <h2 style={{ fontSize: '19px', fontWeight: '800', color: t.text, letterSpacing: '-0.02em', lineHeight: 1.3, minHeight: '52px' }}>
          {currentTask ? currentTask.text : 'All tasks complete!'}
        </h2>
      </div>

      {/* Circular timer */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
        <div style={{ position: 'relative', width: '204px', height: '204px' }}>
          <svg width="204" height="204" style={{ transform: 'rotate(-90deg)' }}>
            <circle cx="102" cy="102" r={R} fill="none" stroke={t.border} strokeWidth="8" />
            <circle cx="102" cy="102" r={R} fill="none" stroke={t.accent} strokeWidth="8" strokeLinecap="round"
              strokeDasharray={circ} strokeDashoffset={circ * (1 - progress)}
              style={{ transition: 'stroke-dashoffset 1s linear', filter: `drop-shadow(0 0 8px ${t.accentGlow})` }} />
          </svg>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
            <div style={{ fontSize: '42px', fontWeight: '800', color: t.text, letterSpacing: '-0.04em', lineHeight: 1 }}>{fmt(timeLeft)}</div>
            <div style={{ fontSize: '12px', color: running ? t.accent : t.textSub, fontWeight: '600', letterSpacing: '0.04em' }}>{running ? 'IN FLOW' : 'PAUSED'}</div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '22px' }}>
        <button onClick={() => setRunning(r => !r)} style={{ flex: 1, padding: '15px', background: t.accentGrad, border: 'none', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '15px', fontWeight: '800', color: '#fff', cursor: 'pointer', boxShadow: `0 4px 20px ${t.accentGlow}` }}>
          {Icon(running ? 'Pause' : 'Play', { size: 18, strokeWidth: 2.5 })}
          {running ? 'Pause' : 'Start'}
        </button>
        <button onClick={() => setActiveIdx(i => Math.min(i + 1, tide.tasks.length - 1))} style={{ padding: '15px 18px', backgroundColor: t.card, border: `1px solid ${t.border}`, borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          {Icon('SkipForward', { size: 18, color: t.textSub })}
        </button>
      </div>

      {/* Micro-actions */}
      <div style={{ marginBottom: '18px' }}>
        <h3 style={{ fontSize: '11px', fontWeight: '700', color: t.textSub, letterSpacing: '0.07em', marginBottom: '10px' }}>MICRO-ACTIONS</h3>
        {tide.tasks.map((task, i) => {
          const isActive = i === activeIdx;
          const isPast = i < activeIdx;
          return (
            <div key={task.id} onClick={() => setActiveIdx(i)} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '11px 12px', backgroundColor: isActive ? t.accentDim : 'transparent', border: `1px solid ${isActive ? t.accent + '45' : 'transparent'}`, borderRadius: '12px', marginBottom: '4px', cursor: 'pointer', transition: 'all 0.2s' }}>
              <div style={{ width: '22px', height: '22px', borderRadius: '50%', border: `2px solid ${isPast || isActive ? t.accent : t.border}`, backgroundColor: isPast ? t.accent : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.2s' }}>
                {isPast && Icon('Check', { size: 11, color: '#fff', strokeWidth: 3 })}
                {isActive && !isPast && <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: t.accent }} />}
              </div>
              <span style={{ flex: 1, fontSize: '13px', fontWeight: isActive ? '700' : '500', color: isPast ? t.textMuted : isActive ? t.text : t.textSub, textDecoration: isPast ? 'line-through' : 'none' }}>{task.text}</span>
              <span style={{ fontSize: '11px', color: t.textMuted, fontWeight: '500' }}>{task.mins}m</span>
            </div>
          );
        })}
      </div>

      {/* Re-entry */}
      <button onClick={() => setReEntry(true)} style={{ width: '100%', padding: '13px', backgroundColor: t.amberDim, border: `1px solid ${t.amber}40`, borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '13px', fontWeight: '700', color: t.amber, cursor: 'pointer' }}>
        {Icon('RefreshCw', { size: 15, color: t.amber })}
        Day went off-script? Re-entry Mode
      </button>
    </div>
  );
}

// ─── Plan Screen ──────────────────────────────────────────────────────────────
function PlanScreen({ t }) {
  const [input, setInput] = useState('');
  const [breakdown, setBreakdown] = useState(null);
  const [selectedBundle, setSelectedBundle] = useState('deep');
  const [added, setAdded] = useState(false);

  const suggestedSteps = [
    { text: 'Draft outline (5 bullet points)', mins: 15, energy: 'medium' },
    { text: 'Research — find 3 supporting sources', mins: 20, energy: 'medium' },
    { text: 'Write introduction paragraph', mins: 25, energy: 'high' },
    { text: 'Write first main section', mins: 30, energy: 'high' },
    { text: 'Send draft to reviewer', mins: 5, energy: 'low' },
  ];

  const bundles = [
    { id: 'deep', label: 'Deep Work', icon: 'Brain', colorKey: 'accent', count: 2 },
    { id: 'calls', label: 'Calls', icon: 'Phone', colorKey: 'violet', count: 3 },
    { id: 'email', label: 'Email', icon: 'Mail', colorKey: 'secondary', count: 3 },
    { id: 'errands', label: 'Errands', icon: 'Car', colorKey: 'amber', count: 3 },
  ];

  const week = [
    { day: 'Mon', date: '23', tides: 4 },
    { day: 'Tue', date: '24', tides: 3 },
    { day: 'Wed', date: '25', tides: 5 },
    { day: 'Thu', date: '26', tides: 2 },
    { day: 'Fri', date: '27', tides: 4 },
  ];

  return (
    <div style={{ padding: '16px', backgroundColor: t.bg, paddingBottom: '20px' }}>
      <h1 style={{ fontSize: '24px', fontWeight: '800', color: t.text, letterSpacing: '-0.03em', marginBottom: '3px' }}>Plan</h1>
      <p style={{ fontSize: '13px', color: t.textSub, marginBottom: '20px' }}>Break goals into tide-ready micro-actions</p>

      {/* Task breakdown input */}
      <div style={{ backgroundColor: t.card, border: `1px solid ${t.border}`, borderRadius: '18px', padding: '14px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', gap: '9px', marginBottom: breakdown ? '16px' : '0' }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="What's the big goal or task?"
            style={{ flex: 1, backgroundColor: t.cardAlt, border: `1px solid ${t.border}`, borderRadius: '11px', padding: '11px 13px', fontSize: '13px', color: t.text, fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          />
          <button onClick={() => { setBreakdown(suggestedSteps); setAdded(false); }} style={{ padding: '11px 14px', background: t.accentGrad, border: 'none', borderRadius: '11px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: '700', color: '#fff', cursor: 'pointer', whiteSpace: 'nowrap' }}>
            {Icon('Sparkles', { size: 14, strokeWidth: 2.5 })}
            Break Down
          </button>
        </div>
        {breakdown && (
          <div>
            <p style={{ fontSize: '11px', color: t.accent, fontWeight: '700', letterSpacing: '0.05em', marginBottom: '10px' }}>
              AI BREAKDOWN — "{input || 'Write blog post'}"
            </p>
            {breakdown.map((step, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 0', borderBottom: i < breakdown.length - 1 ? `1px solid ${t.border}` : 'none' }}>
                <div style={{ width: '22px', height: '22px', backgroundColor: t.accentDim, borderRadius: '7px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '800', color: t.accent, flexShrink: 0 }}>{i + 1}</div>
                <span style={{ flex: 1, fontSize: '13px', fontWeight: '500', color: t.text }}>{step.text}</span>
                <span style={{ fontSize: '11px', color: t.textMuted }}>{step.mins}m</span>
                <div style={{ fontSize: '10px', fontWeight: '700', color: step.energy === 'high' ? t.accent : step.energy === 'medium' ? t.amber : t.secondary, backgroundColor: step.energy === 'high' ? t.accentDim : step.energy === 'medium' ? t.amberDim : t.secondaryDim, padding: '2px 6px', borderRadius: '99px' }}>{step.energy}</div>
              </div>
            ))}
            <button onClick={() => setAdded(true)} style={{ width: '100%', marginTop: '12px', padding: '13px', background: added ? t.greenDim : t.accentGrad, border: added ? `1px solid ${t.green}50` : 'none', borderRadius: '12px', fontSize: '13px', fontWeight: '800', color: added ? t.green : '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', transition: 'all 0.3s' }}>
              {Icon(added ? 'Check' : 'Plus', { size: 15, strokeWidth: 2.5 })}
              {added ? 'Added to Today\'s Tides!' : 'Add to Today\'s Tides'}
            </button>
          </div>
        )}
      </div>

      {/* Context bundles */}
      <h3 style={{ fontSize: '11px', fontWeight: '700', color: t.textSub, letterSpacing: '0.07em', marginBottom: '10px' }}>CONTEXT BUNDLES</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '20px' }}>
        {bundles.map(bundle => {
          const color = tc(t, bundle.colorKey);
          const colorDim = tcDim(t, bundle.colorKey);
          const isSel = selectedBundle === bundle.id;
          return (
            <div key={bundle.id} onClick={() => setSelectedBundle(bundle.id)} style={{ backgroundColor: isSel ? colorDim : t.card, border: `1px solid ${isSel ? color + '55' : t.border}`, borderRadius: '14px', padding: '14px', cursor: 'pointer', transition: 'all 0.2s' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                {Icon(bundle.icon, { size: 18, color })}
                <span style={{ fontSize: '11px', fontWeight: '700', backgroundColor: colorDim, color, padding: '2px 8px', borderRadius: '99px' }}>{bundle.count}</span>
              </div>
              <div style={{ fontSize: '13px', fontWeight: '700', color: t.text }}>{bundle.label}</div>
              <div style={{ fontSize: '11px', color: t.textSub, marginTop: '2px' }}>tasks grouped</div>
            </div>
          );
        })}
      </div>

      {/* Mini week calendar */}
      <h3 style={{ fontSize: '11px', fontWeight: '700', color: t.textSub, letterSpacing: '0.07em', marginBottom: '10px' }}>UPCOMING WEEK</h3>
      <div style={{ display: 'flex', gap: '7px' }}>
        {week.map(d => (
          <div key={d.day} style={{ flex: 1, backgroundColor: t.card, border: `1px solid ${t.border}`, borderRadius: '13px', padding: '10px 6px', textAlign: 'center' }}>
            <div style={{ fontSize: '10px', color: t.textSub, fontWeight: '600', marginBottom: '4px' }}>{d.day}</div>
            <div style={{ fontSize: '17px', fontWeight: '800', color: t.text, marginBottom: '7px' }}>{d.date}</div>
            <div style={{ display: 'flex', gap: '2px', justifyContent: 'center', flexWrap: 'wrap' }}>
              {Array.from({ length: Math.min(d.tides, 4) }).map((_, i) => (
                <div key={i} style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: t.accent, opacity: 0.7 }} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Insights Screen ──────────────────────────────────────────────────────────
function InsightsScreen({ t }) {
  const W = 318, H = 90;
  const pts = ENERGY_CURVE.map((d, i) => {
    const x = (i / (ENERGY_CURVE.length - 1)) * W;
    const y = H - (d.v / 100) * H;
    return [x, y];
  });
  const pathD = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ');
  const areaD = `${pathD} L ${W},${H} L 0,${H} Z`;

  const hour = new Date().getHours();
  const curIdx = Math.max(0, Math.min(hour - 6, pts.length - 1));
  const [cx, cy] = pts[curIdx] || pts[0];

  const stats = [
    { label: 'Tasks Done', value: '8', sub: '+3 vs yesterday', colorKey: 'accent' },
    { label: 'Focus Time', value: '2h 40m', sub: 'Personal best!', colorKey: 'green' },
    { label: 'Day Score', value: '87', sub: 'Great momentum', colorKey: 'violet' },
    { label: 'Streak', value: '12d', sub: 'keep it going', colorKey: 'amber' },
  ];

  return (
    <div style={{ padding: '16px', backgroundColor: t.bg, paddingBottom: '20px' }}>
      <h1 style={{ fontSize: '24px', fontWeight: '800', color: t.text, letterSpacing: '-0.03em', marginBottom: '3px' }}>Insights</h1>
      <p style={{ fontSize: '13px', color: t.textSub, marginBottom: '20px' }}>TaskTide is learning your rhythms</p>

      {/* Stats grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '18px' }}>
        {stats.map(stat => {
          const color = tc(t, stat.colorKey);
          return (
            <div key={stat.label} style={{ backgroundColor: t.card, border: `1px solid ${t.border}`, borderRadius: '16px', padding: '14px' }}>
              <div style={{ fontSize: '26px', fontWeight: '800', color, letterSpacing: '-0.03em', marginBottom: '3px' }}>{stat.value}</div>
              <div style={{ fontSize: '12px', fontWeight: '700', color: t.text, marginBottom: '2px' }}>{stat.label}</div>
              <div style={{ fontSize: '11px', color: t.textSub }}>{stat.sub}</div>
            </div>
          );
        })}
      </div>

      {/* Energy chart */}
      <div style={{ backgroundColor: t.card, border: `1px solid ${t.border}`, borderRadius: '18px', padding: '16px', marginBottom: '18px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: '700', color: t.text }}>Energy Curve — Today</h3>
          <span style={{ fontSize: '10px', color: t.accent, fontWeight: '700', backgroundColor: t.accentDim, padding: '3px 9px', borderRadius: '99px', letterSpacing: '0.04em' }}>LIVE</span>
        </div>
        <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: '75px', overflow: 'visible' }}>
          <defs>
            <linearGradient id="eg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={t.accent} stopOpacity="0.35" />
              <stop offset="100%" stopColor={t.accent} stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={areaD} fill="url(#eg)" />
          <path d={pathD} fill="none" stroke={t.accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx={cx} cy={cy} r="5" fill={t.accent} />
          <circle cx={cx} cy={cy} r="11" fill={t.accent} opacity="0.2" />
        </svg>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
          {['6A', '9A', '12P', '3P', '6P', '9P'].map(h => (
            <span key={h} style={{ fontSize: '10px', color: t.textMuted, fontWeight: '500' }}>{h}</span>
          ))}
        </div>
      </div>

      {/* Pattern insights */}
      <h3 style={{ fontSize: '11px', fontWeight: '700', color: t.textSub, letterSpacing: '0.07em', marginBottom: '10px' }}>LEARNED PATTERNS</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {INSIGHTS.map((insight, i) => {
          const color = tc(t, insight.colorKey);
          const colorDim = tcDim(t, insight.colorKey);
          return (
            <div key={i} style={{ backgroundColor: t.card, border: `1px solid ${t.border}`, borderRadius: '14px', padding: '14px', display: 'flex', gap: '12px' }}>
              <div style={{ width: '38px', height: '38px', backgroundColor: colorDim, borderRadius: '11px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {Icon(insight.icon, { size: 17, color })}
              </div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: '700', color: t.text, marginBottom: '4px' }}>{insight.title}</div>
                <div style={{ fontSize: '12px', color: t.textSub, lineHeight: 1.55 }}>{insight.body}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Settings Screen ──────────────────────────────────────────────────────────
function SettingsScreen({ t, isDark, setIsDark }) {
  const groups = [
    {
      title: 'Behavior',
      items: [
        { icon: 'Bell', label: 'Notifications', value: 'Smart alerts', colorKey: 'accent' },
        { icon: 'Calendar', label: 'Calendar Sync', value: 'Connected', colorKey: 'green' },
        { icon: 'Zap', label: 'Energy Calibration', value: '87% accurate', colorKey: 'amber' },
      ],
    },
    {
      title: 'Privacy & Data',
      items: [
        { icon: 'Shield', label: 'Privacy Mode', value: 'On-device only', colorKey: 'violet' },
        { icon: 'Sliders', label: 'Preferences', value: '', colorKey: 'secondary' },
        { icon: 'Download', label: 'Export Data', value: '', colorKey: 'accent' },
      ],
    },
  ];

  return (
    <div style={{ padding: '16px', backgroundColor: t.bg, paddingBottom: '24px' }}>
      {/* Profile card */}
      <div style={{ background: `linear-gradient(135deg, ${t.accent}22 0%, ${t.violet}14 100%)`, border: `1px solid ${t.accent}35`, borderRadius: '22px', padding: '20px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ width: '62px', height: '62px', background: t.accentGrad, borderRadius: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px', fontWeight: '800', color: '#fff', flexShrink: 0, boxShadow: `0 4px 18px ${t.accentGlow}` }}>A</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '18px', fontWeight: '800', color: t.text, marginBottom: '2px' }}>Alex Morgan</div>
          <div style={{ fontSize: '12px', color: t.textSub, marginBottom: '8px' }}>alex@example.com</div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', backgroundColor: t.accentDim, color: t.accent, fontSize: '11px', fontWeight: '700', padding: '4px 10px', borderRadius: '99px' }}>
            {Icon('Zap', { size: 11, strokeWidth: 2.5 })}
            Pro Member
          </div>
        </div>
      </div>

      {/* Theme toggle */}
      <div style={{ backgroundColor: t.card, border: `1px solid ${t.border}`, borderRadius: '16px', padding: '16px', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '38px', height: '38px', backgroundColor: isDark ? t.amberDim : t.violetDim, borderRadius: '11px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {Icon(isDark ? 'Sun' : 'Moon', { size: 17, color: isDark ? t.amber : t.violet })}
          </div>
          <div>
            <div style={{ fontSize: '14px', fontWeight: '700', color: t.text }}>{isDark ? 'Dark Mode' : 'Light Mode'}</div>
            <div style={{ fontSize: '12px', color: t.textSub }}>Tap to switch theme</div>
          </div>
        </div>
        <div onClick={() => setIsDark(d => !d)} style={{ width: '50px', height: '28px', backgroundColor: isDark ? t.accent : t.border, borderRadius: '99px', position: 'relative', cursor: 'pointer', transition: 'background-color 0.3s ease', flexShrink: 0 }}>
          <div style={{ position: 'absolute', top: '3px', left: isDark ? '25px' : '3px', width: '22px', height: '22px', backgroundColor: '#fff', borderRadius: '50%', transition: 'left 0.3s ease', boxShadow: '0 2px 6px rgba(0,0,0,0.25)' }} />
        </div>
      </div>

      {/* Settings groups */}
      {groups.map(group => (
        <div key={group.title} style={{ marginBottom: '16px' }}>
          <h3 style={{ fontSize: '11px', fontWeight: '700', color: t.textSub, letterSpacing: '0.07em', marginBottom: '8px' }}>{group.title.toUpperCase()}</h3>
          <div style={{ backgroundColor: t.card, border: `1px solid ${t.border}`, borderRadius: '16px', overflow: 'hidden' }}>
            {group.items.map((item, i) => {
              const color = tc(t, item.colorKey);
              const colorDim = tcDim(t, item.colorKey);
              return (
                <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 16px', borderBottom: i < group.items.length - 1 ? `1px solid ${t.border}` : 'none', cursor: 'pointer' }}>
                  <div style={{ width: '34px', height: '34px', backgroundColor: colorDim, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {Icon(item.icon, { size: 15, color })}
                  </div>
                  <span style={{ flex: 1, fontSize: '14px', fontWeight: '600', color: t.text }}>{item.label}</span>
                  {item.value && <span style={{ fontSize: '12px', color: t.textSub }}>{item.value}</span>}
                  {Icon('ChevronRight', { size: 15, color: t.textMuted })}
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {/* App version */}
      <div style={{ textAlign: 'center', marginTop: '8px' }}>
        <div style={{ fontSize: '12px', color: t.textMuted, fontWeight: '500', marginBottom: '10px' }}>TaskTide v1.0.0 · Made with intention</div>
        <button style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: 'transparent', border: 'none', fontSize: '13px', fontWeight: '600', color: t.secondary, cursor: 'pointer', padding: '6px 12px' }}>
          {Icon('LogOut', { size: 14, color: t.secondary })}
          Sign Out
        </button>
      </div>
    </div>
  );
}

// ─── App ─────────────────────────────────────────────────────────────────────
function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isDark, setIsDark] = useState(true);

  const t = isDark ? THEMES.dark : THEMES.light;

  const tabs = [
    { id: 'home', label: 'Today', icon: window.lucide.Waves },
    { id: 'focus', label: 'Focus', icon: window.lucide.Zap },
    { id: 'plan', label: 'Plan', icon: window.lucide.CalendarDays },
    { id: 'insights', label: 'Insights', icon: window.lucide.BarChart3 },
    { id: 'settings', label: 'Profile', icon: window.lucide.User },
  ];

  const screens = {
    home: HomeScreen,
    focus: FocusScreen,
    plan: PlanScreen,
    insights: InsightsScreen,
    settings: SettingsScreen,
  };

  const ScreenComponent = screens[activeTab];

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: isDark
        ? 'radial-gradient(ellipse at 35% 55%, rgba(0,229,204,0.07) 0%, #020408 65%)'
        : 'radial-gradient(ellipse at 35% 55%, rgba(0,184,169,0.1) 0%, #c2d0ee 65%)',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
    }}>
      <div style={{
        width: '375px',
        height: '812px',
        backgroundColor: t.bg,
        borderRadius: '46px',
        overflow: 'hidden',
        position: 'relative',
        boxShadow: isDark
          ? '0 50px 160px rgba(0,0,0,0.92), 0 0 0 1px rgba(255,255,255,0.07), inset 0 1px 0 rgba(255,255,255,0.05)'
          : '0 50px 160px rgba(0,0,0,0.22), 0 0 0 1px rgba(0,0,0,0.07)',
        display: 'flex',
        flexDirection: 'column',
      }}>
        <DynamicIsland t={t} />
        <StatusBar t={t} />

        {/* Screen */}
        <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
          <ScreenComponent t={t} isDark={isDark} setIsDark={setIsDark} />
        </div>

        {/* Bottom nav */}
        <div style={{ backgroundColor: t.surface, borderTop: `1px solid ${t.border}`, paddingBottom: '24px', paddingTop: '10px', display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexShrink: 0 }}>
          {tabs.map(tab => {
            const isActive = activeTab === tab.id;
            return (
              <div
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', padding: '6px 12px', borderRadius: '13px', cursor: 'pointer', backgroundColor: isActive ? t.accentDim : 'transparent', transition: 'all 0.2s ease' }}
              >
                {React.createElement(tab.icon, { size: 22, color: isActive ? t.accent : t.textMuted, strokeWidth: isActive ? 2.5 : 1.8 })}
                <span style={{ fontSize: '10px', fontWeight: isActive ? '700' : '500', color: isActive ? t.accent : t.textMuted, letterSpacing: '0.01em' }}>
                  {tab.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
