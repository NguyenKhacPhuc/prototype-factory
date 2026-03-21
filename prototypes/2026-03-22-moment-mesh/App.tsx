const { useState, useEffect, useRef } = React;

const themes = {
  light: {
    bg: '#F0ECFF',
    surface: '#FFFFFF',
    surfaceAlt: '#F7F4FF',
    primary: '#7C3AED',
    primarySoft: '#EDE9FE',
    primaryGrad: 'linear-gradient(135deg, #7C3AED 0%, #9F67FA 100%)',
    heroGrad: 'linear-gradient(180deg, #7C3AED 0%, #9333EA 60%, #A855F7 100%)',
    heroStatus: '#7C3AED',
    accent: '#F59E0B',
    accentSoft: '#FEF3C7',
    text: '#1C1033',
    textSec: '#6B7280',
    textMute: '#9CA3AF',
    border: '#EAE3FF',
    divider: '#F5F0FF',
    success: '#059669',
    successSoft: '#D1FAE5',
    danger: '#EF4444',
    dangerSoft: '#FEE2E2',
    navBg: '#FFFFFF',
    navBorder: '#F0ECFF',
    shadow: '0 2px 16px rgba(124,58,237,0.10)',
  },
  dark: {
    bg: '#0D0920',
    surface: '#150D2B',
    surfaceAlt: '#1E1440',
    primary: '#A78BFA',
    primarySoft: '#2A1A5C',
    primaryGrad: 'linear-gradient(135deg, #6D28D9 0%, #7C3AED 100%)',
    heroGrad: 'linear-gradient(180deg, #1A0D3D 0%, #2D1664 60%, #3B1F6B 100%)',
    heroStatus: '#1A0D3D',
    accent: '#FBBF24',
    accentSoft: '#422006',
    text: '#EDE9FE',
    textSec: '#9B87C7',
    textMute: '#5E4E8A',
    border: '#2A1A5C',
    divider: '#1E1440',
    success: '#34D399',
    successSoft: '#052E2B',
    danger: '#F87171',
    dangerSoft: '#450A0A',
    navBg: '#0D0920',
    navBorder: '#1E1440',
    shadow: '0 2px 16px rgba(0,0,0,0.5)',
  }
};

const taskData = [
  { id: 1, title: 'Reply to Marcus about Q2 budget review', category: 'Email', shards: [2, 5], energy: 'low', context: 'public', steps: ['Open the email thread', 'Confirm the numbers look correct', 'Send brief confirmation reply'], project: 'Q2 Planning' },
  { id: 2, title: 'Draft agenda bullet points for Thursday standup', category: 'Prep', shards: [5, 10], energy: 'medium', context: 'public', steps: ["Review last week's notes", 'Identify 3 key updates to share', 'Note blockers to discuss'], project: 'Team Operations' },
  { id: 3, title: 'Review first section of product spec doc', category: 'Reading', shards: [10, 15], energy: 'high', context: 'private', steps: ['Open the spec document', 'Read Overview + Goals sections', 'Add inline comments on key points'], project: 'Product Launch' },
  { id: 4, title: 'Update project status in task tracker', category: 'Admin', shards: [2, 5], energy: 'low', context: 'public', steps: ['Log into project tracker', 'Mark 3 completed tasks as done', 'Add brief note to open items'], project: 'Q2 Planning' },
  { id: 5, title: "Prep 3 talking points for tomorrow's client call", category: 'Prep', shards: [10, 15], energy: 'medium', context: 'public', steps: ['Review the client brief', 'Note key deliverable status', 'Draft 3 concise talking points'], project: 'Client Account' },
  { id: 6, title: 'Clear Slack and flag urgent messages', category: 'Comms', shards: [2, 5], energy: 'low', context: 'public', steps: ['Open Slack inbox', 'Scan unreads by channel', 'Star or react to urgent items'], project: 'Team Operations' },
];

const gapData = [
  { time: '10:47 AM', mins: 8, label: 'Before Sprint Review', color: '#F59E0B' },
  { time: '1:15 PM', mins: 12, label: 'After Lunch Block', color: '#7C3AED' },
  { time: '3:30 PM', mins: 20, label: 'Before EOD Sync', color: '#059669' },
];

const weekStats = [
  { day: 'M', mins: 22, shards: 4 },
  { day: 'T', mins: 41, shards: 7 },
  { day: 'W', mins: 28, shards: 5 },
  { day: 'T', mins: 52, shards: 9 },
  { day: 'F', mins: 35, shards: 6 },
  { day: 'S', mins: 11, shards: 2 },
  { day: 'S', mins: 18, shards: 3 },
];

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isDark, setIsDark] = useState(false);
  const [energy, setEnergy] = useState('medium');
  const [filter, setFilter] = useState('all');
  const [focusTask, setFocusTask] = useState(null);
  const [focusStep, setFocusStep] = useState(0);
  const [done, setDone] = useState([]);
  const [timerSec, setTimerSec] = useState(0);
  const [running, setRunning] = useState(false);
  const [pressed, setPressed] = useState(null);
  const timerRef = useRef(null);

  const c = isDark ? themes.dark : themes.light;

  useEffect(() => {
    if (running) {
      timerRef.current = setInterval(() => setTimerSec(s => s + 1), 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [running]);

  const fmtTimer = s => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  const energyColor = { high: c.success, medium: c.accent, low: c.danger };
  const energyEmoji = { high: '⚡', medium: '🎯', low: '🌿' };
  const energyLabel = { high: 'High', medium: 'Steady', low: 'Low' };

  const remaining = taskData.filter(t => !done.includes(t.id));

  const filtered = remaining.filter(task => {
    if (filter === 'all') return true;
    return task.shards.includes(parseInt(filter));
  });

  const recommended = (
    energy === 'low' ? remaining.find(t => t.energy === 'low') :
    energy === 'medium' ? remaining.find(t => t.energy !== 'high') :
    remaining[0]
  ) || remaining[0];

  const startTask = task => {
    setFocusTask(task);
    setFocusStep(0);
    setTimerSec(0);
    setRunning(true);
    setActiveTab('focus');
  };

  const finishTask = () => {
    if (focusTask) {
      setDone(d => [...d, focusTask.id]);
      setFocusTask(null);
      setRunning(false);
      setActiveTab('insights');
    }
  };

  const pBtn = id => ({
    transform: pressed === id ? 'scale(0.96)' : 'scale(1)',
    transition: 'transform 0.12s ease',
  });

  // ──────────────── HOME SCREEN ────────────────
  const HomeScreen = () => (
    <div style={{ height: '100%', overflowY: 'auto', background: c.bg }}>
      {/* Hero */}
      <div style={{ background: c.heroGrad, padding: '16px 20px 24px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -30, right: -30, width: 150, height: 150, borderRadius: '50%', background: 'rgba(255,255,255,0.07)' }} />
        <div style={{ position: 'absolute', bottom: -20, left: 10, width: 90, height: 90, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12, margin: 0, fontFamily: 'Outfit,sans-serif' }}>Sunday, March 22</p>
          <h1 style={{ color: '#fff', fontSize: 22, fontWeight: 800, margin: '3px 0 2px', fontFamily: 'Outfit,sans-serif' }}>Good morning, Alex</h1>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13, margin: '0 0 16px', fontFamily: 'Outfit,sans-serif' }}>{gapData.length} gaps detected · {remaining.length} tasks waiting</p>
          <div style={{ background: 'rgba(255,255,255,0.15)', borderRadius: 14, padding: '10px 12px', backdropFilter: 'blur(8px)' }}>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 10, margin: '0 0 8px', fontFamily: 'Outfit,sans-serif', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 700 }}>How's your energy?</p>
            <div style={{ display: 'flex', gap: 6 }}>
              {['high', 'medium', 'low'].map(lvl => (
                <button key={lvl} onClick={() => setEnergy(lvl)} style={{ flex: 1, padding: '7px 0', borderRadius: 9, border: energy === lvl ? '2px solid rgba(255,255,255,0.9)' : '2px solid transparent', background: energy === lvl ? 'rgba(255,255,255,0.28)' : 'rgba(255,255,255,0.1)', color: '#fff', fontSize: 11, fontWeight: 700, fontFamily: 'Outfit,sans-serif', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, transition: 'all 0.2s ease' }}>
                  <span style={{ fontSize: 13 }}>{energyEmoji[lvl]}</span>{energyLabel[lvl]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Next Gap Card */}
      <div style={{ padding: '14px 16px 6px' }}>
        <div style={{ background: c.surface, borderRadius: 16, padding: 15, boxShadow: c.shadow, border: `1px solid ${c.border}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 4 }}>
                {React.createElement(window.lucide.Clock, { size: 13, color: c.accent })}
                <span style={{ fontSize: 10, fontWeight: 700, color: c.accent, fontFamily: 'Outfit,sans-serif', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Next Gap Detected</span>
              </div>
              <p style={{ fontSize: 18, fontWeight: 800, color: c.text, margin: 0, fontFamily: 'Outfit,sans-serif' }}>8 min window</p>
              <p style={{ fontSize: 12, color: c.textSec, margin: '2px 0 0', fontFamily: 'Outfit,sans-serif' }}>10:47 AM — Before Sprint Review</p>
            </div>
            <div style={{ background: c.accentSoft, borderRadius: 10, padding: '9px 13px', textAlign: 'center' }}>
              <p style={{ fontSize: 20, fontWeight: 900, color: c.accent, margin: 0, fontFamily: 'Outfit,sans-serif' }}>8m</p>
              <p style={{ fontSize: 9, color: c.accent, margin: 0, fontFamily: 'Outfit,sans-serif', opacity: 0.7 }}>free</p>
            </div>
          </div>
          <div style={{ background: c.border, borderRadius: 4, height: 5, overflow: 'hidden' }}>
            <div style={{ width: '40%', height: '100%', background: `linear-gradient(90deg, ${c.primary}, ${c.accent})`, borderRadius: 4 }} />
          </div>
          <p style={{ fontSize: 10, color: c.textMute, margin: '5px 0 0', fontFamily: 'Outfit,sans-serif' }}>Starts in ~13 minutes</p>
        </div>
      </div>

      {/* Recommended Task */}
      {recommended && (
        <div style={{ padding: '6px 16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 9 }}>
            <h2 style={{ fontSize: 14, fontWeight: 700, color: c.text, margin: 0, fontFamily: 'Outfit,sans-serif' }}>Best match for you</h2>
            <span style={{ fontSize: 11, color: c.primary, fontFamily: 'Outfit,sans-serif', fontWeight: 600 }}>{energyEmoji[energy]} {energyLabel[energy]} energy</span>
          </div>
          <div style={{ background: c.surface, borderRadius: 16, overflow: 'hidden', boxShadow: c.shadow, border: `1px solid ${c.border}` }}>
            <div style={{ background: c.primaryGrad, padding: '12px 16px' }}>
              <div style={{ display: 'flex', gap: 6, marginBottom: 7 }}>
                <span style={{ background: 'rgba(255,255,255,0.22)', color: '#fff', fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 20, fontFamily: 'Outfit,sans-serif', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{recommended.category}</span>
                <span style={{ background: 'rgba(255,255,255,0.22)', color: '#fff', fontSize: 10, fontWeight: 600, padding: '2px 8px', borderRadius: 20, fontFamily: 'Outfit,sans-serif' }}>{recommended.shards[0]}–{recommended.shards[1]} min</span>
              </div>
              <p style={{ fontSize: 14, fontWeight: 700, color: '#fff', margin: 0, fontFamily: 'Outfit,sans-serif', lineHeight: 1.35 }}>{recommended.title}</p>
            </div>
            <div style={{ padding: '12px 16px' }}>
              <p style={{ fontSize: 12, color: c.textSec, margin: '0 0 9px', fontFamily: 'Outfit,sans-serif' }}>{recommended.steps.length} micro-steps · {recommended.project}</p>
              <div style={{ display: 'flex', gap: 6, marginBottom: 11 }}>
                {recommended.steps.slice(0, 2).map((step, i) => (
                  <div key={i} style={{ flex: 1, background: c.surfaceAlt, borderRadius: 8, padding: '6px 8px', fontSize: 10, color: c.textSec, fontFamily: 'Outfit,sans-serif', lineHeight: 1.4 }}>
                    <span style={{ color: c.primary, fontWeight: 700 }}>{i + 1}. </span>{step}
                  </div>
                ))}
              </div>
              <button
                onMouseDown={() => setPressed('start-home')}
                onMouseUp={() => { setPressed(null); startTask(recommended); }}
                onMouseLeave={() => setPressed(null)}
                onClick={() => startTask(recommended)}
                style={{ ...pBtn('start-home'), width: '100%', padding: '11px', background: c.primaryGrad, color: '#fff', border: 'none', borderRadius: 11, fontSize: 13, fontWeight: 700, fontFamily: 'Outfit,sans-serif', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7 }}
              >
                {React.createElement(window.lucide.Zap, { size: 15 })}
                Start Time Shard
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Gap Map */}
      <div style={{ padding: '8px 16px 24px' }}>
        <h2 style={{ fontSize: 14, fontWeight: 700, color: c.text, margin: '0 0 9px', fontFamily: 'Outfit,sans-serif' }}>Today's Gap Map</h2>
        <div style={{ background: c.surface, borderRadius: 16, padding: '14px 15px', boxShadow: c.shadow, border: `1px solid ${c.border}` }}>
          {gapData.map((gap, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 11, paddingBottom: i < gapData.length - 1 ? 12 : 0, marginBottom: i < gapData.length - 1 ? 12 : 0, borderBottom: i < gapData.length - 1 ? `1px solid ${c.divider}` : 'none' }}>
              <div style={{ width: 44, height: 44, borderRadius: 11, background: `${gap.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800, color: gap.color, fontFamily: 'Outfit,sans-serif', flexShrink: 0 }}>{gap.mins}m</div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: c.text, margin: 0, fontFamily: 'Outfit,sans-serif' }}>{gap.label}</p>
                <p style={{ fontSize: 11, color: c.textSec, margin: '2px 0 0', fontFamily: 'Outfit,sans-serif' }}>{gap.time} · {gap.mins} min free</p>
              </div>
              {React.createElement(window.lucide.ChevronRight, { size: 15, color: c.textMute })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ──────────────── TASKS SCREEN ────────────────
  const TasksScreen = () => (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: c.bg }}>
      <div style={{ background: c.surface, borderBottom: `1px solid ${c.border}`, padding: '14px 16px 10px', flexShrink: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 11 }}>
          <div>
            <h1 style={{ fontSize: 20, fontWeight: 800, color: c.text, margin: 0, fontFamily: 'Outfit,sans-serif' }}>Task Shards</h1>
            <p style={{ fontSize: 12, color: c.textSec, margin: '2px 0 0', fontFamily: 'Outfit,sans-serif' }}>{filtered.length} ready · {done.length} completed today</p>
          </div>
          <button style={{ width: 36, height: 36, borderRadius: 10, background: c.primarySoft, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {React.createElement(window.lucide.Plus, { size: 18, color: c.primary })}
          </button>
        </div>
        <div style={{ display: 'flex', gap: 7, overflowX: 'auto', paddingBottom: 2 }}>
          {[{ id: 'all', label: 'All' }, { id: '2', label: '2 min' }, { id: '5', label: '5 min' }, { id: '10', label: '10 min' }, { id: '15', label: '15 min' }].map(f => (
            <button key={f.id} onClick={() => setFilter(f.id)} style={{ padding: '5px 13px', borderRadius: 20, border: filter === f.id ? 'none' : `1px solid ${c.border}`, background: filter === f.id ? c.primary : c.surface, color: filter === f.id ? '#fff' : c.textSec, fontSize: 12, fontWeight: 600, fontFamily: 'Outfit,sans-serif', cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.2s ease', flexShrink: 0 }}>
              {f.label}
            </button>
          ))}
        </div>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '12px 16px 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {filtered.map(task => (
          <div key={task.id} style={{ background: c.surface, borderRadius: 14, padding: 14, boxShadow: c.shadow, border: `1px solid ${c.border}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 9 }}>
              <div style={{ flex: 1, marginRight: 8 }}>
                <div style={{ display: 'flex', gap: 5, marginBottom: 6, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: c.primary, background: c.primarySoft, padding: '2px 7px', borderRadius: 4, fontFamily: 'Outfit,sans-serif', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{task.category}</span>
                  <span style={{ fontSize: 10, fontWeight: 600, color: energyColor[task.energy], background: `${energyColor[task.energy]}20`, padding: '2px 7px', borderRadius: 4, fontFamily: 'Outfit,sans-serif' }}>{energyEmoji[task.energy]} {task.energy === 'high' ? 'High' : task.energy === 'medium' ? 'Med' : 'Low'}</span>
                  {task.context === 'public' && <span style={{ fontSize: 10, fontWeight: 600, color: c.textSec, background: c.surfaceAlt, padding: '2px 7px', borderRadius: 4, fontFamily: 'Outfit,sans-serif' }}>📱 On-the-go</span>}
                </div>
                <p style={{ fontSize: 13, fontWeight: 600, color: c.text, margin: 0, fontFamily: 'Outfit,sans-serif', lineHeight: 1.4 }}>{task.title}</p>
              </div>
              <div style={{ background: `${c.primary}18`, borderRadius: 9, padding: '7px 10px', textAlign: 'center', flexShrink: 0 }}>
                <p style={{ fontSize: 13, fontWeight: 800, color: c.primary, margin: 0, fontFamily: 'Outfit,sans-serif' }}>{task.shards[0]}–{task.shards[1]}</p>
                <p style={{ fontSize: 9, color: c.primary, margin: 0, fontFamily: 'Outfit,sans-serif', opacity: 0.8 }}>min</p>
              </div>
            </div>
            <div style={{ background: c.surfaceAlt, borderRadius: 9, padding: '8px 10px', marginBottom: 10 }}>
              {task.steps.map((step, i) => (
                <div key={i} style={{ display: 'flex', gap: 6, alignItems: 'flex-start', marginBottom: i < task.steps.length - 1 ? 5 : 0 }}>
                  <span style={{ fontSize: 10, color: c.primary, fontWeight: 700, fontFamily: 'Outfit,sans-serif', lineHeight: 1.6, flexShrink: 0 }}>{i + 1}.</span>
                  <span style={{ fontSize: 11, color: c.textSec, fontFamily: 'Outfit,sans-serif', lineHeight: 1.5 }}>{step}</span>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 7 }}>
              <button onClick={() => startTask(task)} style={{ flex: 1, padding: '9px 0', background: c.primaryGrad, color: '#fff', border: 'none', borderRadius: 10, fontSize: 12, fontWeight: 700, fontFamily: 'Outfit,sans-serif', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                {React.createElement(window.lucide.Zap, { size: 13 })} Start Shard
              </button>
              <button onClick={() => setDone(d => [...d, task.id])} style={{ width: 38, height: 36, border: `1px solid ${c.border}`, background: c.surface, borderRadius: 10, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {React.createElement(window.lucide.Check, { size: 16, color: c.success })}
              </button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '50px 20px' }}>
            <div style={{ fontSize: 44, marginBottom: 12 }}>🎉</div>
            <p style={{ fontSize: 16, fontWeight: 700, color: c.text, fontFamily: 'Outfit,sans-serif', margin: '0 0 6px' }}>All caught up!</p>
            <p style={{ fontSize: 13, color: c.textSec, fontFamily: 'Outfit,sans-serif' }}>No tasks in this window. Try another filter.</p>
          </div>
        )}
      </div>
    </div>
  );

  // ──────────────── FOCUS SCREEN ────────────────
  const FocusScreen = () => {
    if (!focusTask) return (
      <div style={{ height: '100%', background: c.bg, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 32 }}>
        <div style={{ fontSize: 60, marginBottom: 16 }}>⚡</div>
        <h2 style={{ fontSize: 20, fontWeight: 800, color: c.text, textAlign: 'center', margin: '0 0 8px', fontFamily: 'Outfit,sans-serif' }}>No active shard</h2>
        <p style={{ fontSize: 14, color: c.textSec, textAlign: 'center', margin: '0 0 28px', fontFamily: 'Outfit,sans-serif', lineHeight: 1.55 }}>Start a task from Home or Tasks to begin a focused time shard session.</p>
        <button onClick={() => setActiveTab('home')} style={{ padding: '12px 32px', background: c.primaryGrad, color: '#fff', border: 'none', borderRadius: 12, fontSize: 14, fontWeight: 700, fontFamily: 'Outfit,sans-serif', cursor: 'pointer' }}>Go to Home</button>
      </div>
    );

    const progress = focusTask.steps.length > 0 ? (focusStep / focusTask.steps.length) * 100 : 0;

    return (
      <div style={{ height: '100%', overflowY: 'auto', background: c.bg }}>
        <div style={{ background: c.heroGrad, padding: '16px 20px 22px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -30, left: -30, width: 140, height: 140, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />
          <div style={{ position: 'absolute', bottom: -10, right: 10, width: 100, height: 100, borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <span style={{ background: 'rgba(255,255,255,0.2)', color: '#fff', fontSize: 11, fontWeight: 700, padding: '4px 11px', borderRadius: 20, fontFamily: 'Outfit,sans-serif', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Focus Mode</span>
              <button onClick={() => { setFocusTask(null); setRunning(false); }} style={{ background: 'rgba(255,255,255,0.18)', border: 'none', borderRadius: 8, padding: '5px 12px', color: '#fff', fontSize: 12, fontFamily: 'Outfit,sans-serif', cursor: 'pointer', fontWeight: 600 }}>End</button>
            </div>
            <div style={{ textAlign: 'center', padding: '6px 0 14px' }}>
              <div style={{ fontSize: 54, fontWeight: 900, color: '#fff', fontFamily: 'Outfit,sans-serif', letterSpacing: '-0.02em', lineHeight: 1 }}>{fmtTimer(timerSec)}</div>
              <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 12, margin: '5px 0 0', fontFamily: 'Outfit,sans-serif' }}>Time elapsed</p>
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 11, fontFamily: 'Outfit,sans-serif' }}>Step {Math.min(focusStep + 1, focusTask.steps.length)} of {focusTask.steps.length}</span>
                <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: 11, fontWeight: 700, fontFamily: 'Outfit,sans-serif' }}>{Math.round(progress)}% done</span>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: 4, height: 6, overflow: 'hidden' }}>
                <div style={{ width: `${progress}%`, height: '100%', background: 'rgba(255,255,255,0.9)', borderRadius: 4, transition: 'width 0.4s ease' }} />
              </div>
            </div>
          </div>
        </div>

        <div style={{ padding: '14px 16px 6px' }}>
          <div style={{ background: c.surface, borderRadius: 14, padding: '13px 15px', boxShadow: c.shadow, border: `1px solid ${c.border}` }}>
            <p style={{ fontSize: 10, fontWeight: 700, color: c.primary, textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 4px', fontFamily: 'Outfit,sans-serif' }}>{focusTask.category} · {focusTask.project}</p>
            <p style={{ fontSize: 15, fontWeight: 700, color: c.text, margin: 0, fontFamily: 'Outfit,sans-serif', lineHeight: 1.4 }}>{focusTask.title}</p>
          </div>
        </div>

        <div style={{ padding: '8px 16px' }}>
          <h3 style={{ fontSize: 13, fontWeight: 700, color: c.text, margin: '0 0 9px', fontFamily: 'Outfit,sans-serif' }}>Micro-steps</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
            {focusTask.steps.map((step, i) => (
              <div key={i} style={{ background: c.surface, borderRadius: 12, padding: '11px 13px', border: `1px solid ${i === focusStep ? c.primary : c.border}`, display: 'flex', alignItems: 'center', gap: 11, opacity: i < focusStep ? 0.45 : 1, transition: 'all 0.25s ease', boxShadow: i === focusStep ? `0 0 0 3px ${c.primary}25` : 'none' }}>
                <div style={{ width: 26, height: 26, borderRadius: 13, background: i < focusStep ? c.success : i === focusStep ? c.primary : c.border, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'background 0.25s ease' }}>
                  {i < focusStep ? React.createElement(window.lucide.Check, { size: 13, color: '#fff' }) : <span style={{ fontSize: 10, color: i === focusStep ? '#fff' : c.textMute, fontFamily: 'Outfit,sans-serif', fontWeight: 700 }}>{i + 1}</span>}
                </div>
                <p style={{ fontSize: 13, fontWeight: i === focusStep ? 600 : 400, color: i === focusStep ? c.text : c.textSec, margin: 0, fontFamily: 'Outfit,sans-serif' }}>{step}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ padding: '12px 16px 6px', display: 'flex', gap: 9 }}>
          {focusStep < focusTask.steps.length - 1 ? (
            <button onClick={() => setFocusStep(s => s + 1)} style={{ flex: 1, padding: '13px', background: c.primaryGrad, color: '#fff', border: 'none', borderRadius: 12, fontSize: 14, fontWeight: 700, fontFamily: 'Outfit,sans-serif', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7 }}>
              {React.createElement(window.lucide.ChevronRight, { size: 16 })} Next Step
            </button>
          ) : (
            <button onClick={finishTask} style={{ flex: 1, padding: '13px', background: `linear-gradient(135deg, ${c.success}, #34D399)`, color: '#fff', border: 'none', borderRadius: 12, fontSize: 14, fontWeight: 700, fontFamily: 'Outfit,sans-serif', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7 }}>
              {React.createElement(window.lucide.CheckCircle, { size: 16 })} Complete Shard!
            </button>
          )}
          <button onClick={() => setFocusStep(s => Math.max(0, s - 1))} style={{ width: 46, height: 46, border: `1px solid ${c.border}`, background: c.surface, borderRadius: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {React.createElement(window.lucide.ChevronLeft, { size: 18, color: c.textSec })}
          </button>
        </div>

        <div style={{ padding: '4px 16px 20px' }}>
          <button onClick={() => setRunning(r => !r)} style={{ width: '100%', padding: '10px', background: c.surface, border: `1px solid ${c.border}`, borderRadius: 10, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, fontSize: 12, fontWeight: 600, color: c.textSec, fontFamily: 'Outfit,sans-serif' }}>
            {running ? React.createElement(window.lucide.Pause, { size: 14 }) : React.createElement(window.lucide.Play, { size: 14 })}
            {running ? 'Pause Timer' : 'Resume Timer'}
          </button>
        </div>
      </div>
    );
  };

  // ──────────────── INSIGHTS SCREEN ────────────────
  const InsightsScreen = () => {
    const maxMins = Math.max(...weekStats.map(d => d.mins));
    return (
      <div style={{ height: '100%', overflowY: 'auto', background: c.bg }}>
        <div style={{ background: c.surface, borderBottom: `1px solid ${c.border}`, padding: '14px 16px 12px' }}>
          <h1 style={{ fontSize: 20, fontWeight: 800, color: c.text, margin: 0, fontFamily: 'Outfit,sans-serif' }}>Momentum Insights</h1>
          <p style={{ fontSize: 12, color: c.textSec, margin: '2px 0 0', fontFamily: 'Outfit,sans-serif' }}>This week · March 16–22</p>
        </div>

        <div style={{ padding: '14px 16px 6px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {[
            { icon: 'Clock', value: '3h 27m', label: 'Time Recovered', color: c.primary, bg: c.primarySoft },
            { icon: 'Zap', value: '36', label: 'Shards Completed', color: c.success, bg: c.successSoft },
            { icon: 'Clock', value: '5.8m', label: 'Avg Shard Size', color: c.accent, bg: c.accentSoft },
            { icon: 'Star', value: '7 days', label: 'Day Streak', color: '#FF6B35', bg: isDark ? '#3D1A00' : '#FFF0EA' },
          ].map((s, i) => (
            <div key={i} style={{ background: c.surface, borderRadius: 14, padding: 14, boxShadow: c.shadow, border: `1px solid ${c.border}` }}>
              <div style={{ width: 34, height: 34, borderRadius: 10, background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 9 }}>
                {React.createElement(window.lucide[s.icon] || window.lucide.Star, { size: 17, color: s.color })}
              </div>
              <p style={{ fontSize: 20, fontWeight: 800, color: c.text, margin: 0, fontFamily: 'Outfit,sans-serif' }}>{s.value}</p>
              <p style={{ fontSize: 11, color: c.textSec, margin: '2px 0 0', fontFamily: 'Outfit,sans-serif' }}>{s.label}</p>
            </div>
          ))}
        </div>

        <div style={{ padding: '6px 16px' }}>
          <div style={{ background: c.surface, borderRadius: 16, padding: 16, boxShadow: c.shadow, border: `1px solid ${c.border}` }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: c.text, margin: '0 0 14px', fontFamily: 'Outfit,sans-serif' }}>Minutes recovered per day</h3>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 7, height: 84 }}>
              {weekStats.map((d, i) => (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
                  <div style={{ width: '100%', height: `${(d.mins / maxMins) * 72}px`, background: i === 6 ? c.primary : `${c.primary}45`, borderRadius: '4px 4px 0 0', minHeight: 5, transition: 'height 0.4s ease' }} />
                  <span style={{ fontSize: 10, color: i === 6 ? c.primary : c.textMute, fontFamily: 'Outfit,sans-serif', fontWeight: i === 6 ? 700 : 400 }}>{d.day}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ padding: '10px 16px 6px' }}>
          <div style={{ background: c.surface, borderRadius: 16, padding: 16, boxShadow: c.shadow, border: `1px solid ${c.border}` }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: c.text, margin: '0 0 14px', fontFamily: 'Outfit,sans-serif' }}>Top categories</h3>
            {[
              { name: 'Email & Comms', count: 12, pct: 33, color: c.primary },
              { name: 'Meeting Prep', count: 9, pct: 25, color: c.success },
              { name: 'Admin Tasks', count: 8, pct: 22, color: c.accent },
              { name: 'Deep Reading', count: 7, pct: 20, color: '#EC4899' },
            ].map((cat, i) => (
              <div key={i} style={{ marginBottom: i < 3 ? 13 : 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: c.text, fontFamily: 'Outfit,sans-serif' }}>{cat.name}</span>
                  <span style={{ fontSize: 11, color: c.textSec, fontFamily: 'Outfit,sans-serif' }}>{cat.count} shards</span>
                </div>
                <div style={{ background: c.border, borderRadius: 4, height: 6, overflow: 'hidden' }}>
                  <div style={{ width: `${cat.pct}%`, height: '100%', background: cat.color, borderRadius: 4, transition: 'width 0.5s ease' }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ padding: '10px 16px 24px' }}>
          <div style={{ background: 'linear-gradient(135deg, #FF6B35, #F59E0B)', borderRadius: 16, padding: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 13 }}>
              <div style={{ fontSize: 38 }}>🔥</div>
              <div>
                <p style={{ fontSize: 19, fontWeight: 800, color: '#fff', margin: 0, fontFamily: 'Outfit,sans-serif' }}>7-Day Streak!</p>
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.85)', margin: '3px 0 0', fontFamily: 'Outfit,sans-serif', lineHeight: 1.5 }}>You've used at least one gap every day this week. Keep the momentum going!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ──────────────── SETTINGS SCREEN ────────────────
  const SettingsScreen = () => (
    <div style={{ height: '100%', overflowY: 'auto', background: c.bg }}>
      <div style={{ background: c.surface, borderBottom: `1px solid ${c.border}`, padding: '14px 16px 12px' }}>
        <h1 style={{ fontSize: 20, fontWeight: 800, color: c.text, margin: 0, fontFamily: 'Outfit,sans-serif' }}>Settings</h1>
      </div>

      <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 11 }}>
        {/* Theme Toggle */}
        <div style={{ background: c.surface, borderRadius: 16, padding: 16, boxShadow: c.shadow, border: `1px solid ${c.border}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 42, height: 42, borderRadius: 12, background: isDark ? c.primarySoft : '#FEF3C7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {isDark ? React.createElement(window.lucide.Moon, { size: 21, color: c.primary }) : React.createElement(window.lucide.Sun, { size: 21, color: '#F59E0B' })}
              </div>
              <div>
                <p style={{ fontSize: 14, fontWeight: 700, color: c.text, margin: 0, fontFamily: 'Outfit,sans-serif' }}>{isDark ? 'Dark Mode' : 'Light Mode'}</p>
                <p style={{ fontSize: 11, color: c.textSec, margin: '2px 0 0', fontFamily: 'Outfit,sans-serif' }}>{isDark ? 'Easy on the eyes at night' : 'Clean & bright for daytime'}</p>
              </div>
            </div>
            <button onClick={() => setIsDark(d => !d)} style={{ width: 50, height: 28, borderRadius: 14, background: isDark ? c.primary : c.border, border: 'none', cursor: 'pointer', position: 'relative', transition: 'background 0.3s ease', flexShrink: 0 }}>
              <div style={{ position: 'absolute', top: 3, left: isDark ? 24 : 3, width: 22, height: 22, borderRadius: 11, background: '#fff', transition: 'left 0.3s ease', boxShadow: '0 1px 4px rgba(0,0,0,0.2)' }} />
            </button>
          </div>
        </div>

        {/* Energy Profile */}
        <div style={{ background: c.surface, borderRadius: 16, padding: 16, boxShadow: c.shadow, border: `1px solid ${c.border}` }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: c.text, margin: '0 0 12px', fontFamily: 'Outfit,sans-serif' }}>Default Energy Level</h3>
          <div style={{ display: 'flex', gap: 8 }}>
            {['high', 'medium', 'low'].map(lvl => (
              <button key={lvl} onClick={() => setEnergy(lvl)} style={{ flex: 1, padding: '10px 0', borderRadius: 10, border: `2px solid ${energy === lvl ? energyColor[lvl] : c.border}`, background: energy === lvl ? `${energyColor[lvl]}18` : c.surfaceAlt, color: energy === lvl ? energyColor[lvl] : c.textSec, fontSize: 11, fontWeight: 700, fontFamily: 'Outfit,sans-serif', cursor: 'pointer', transition: 'all 0.2s ease', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <span style={{ fontSize: 18 }}>{energyEmoji[lvl]}</span>
                {lvl.charAt(0).toUpperCase() + lvl.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Context Preferences */}
        <div style={{ background: c.surface, borderRadius: 16, padding: 16, boxShadow: c.shadow, border: `1px solid ${c.border}` }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: c.text, margin: '0 0 13px', fontFamily: 'Outfit,sans-serif' }}>Context Preferences</h3>
          {[
            { label: 'Show public / commute tasks', icon: 'Globe', on: true },
            { label: 'Calendar gap detection', icon: 'Calendar', on: true },
            { label: 'Smart energy matching', icon: 'Target', on: true },
            { label: 'Daily rhythm learning', icon: 'TrendingUp', on: false },
          ].map((p, i, arr) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: i < arr.length - 1 ? 12 : 0, marginBottom: i < arr.length - 1 ? 12 : 0, borderBottom: i < arr.length - 1 ? `1px solid ${c.divider}` : 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                {React.createElement(window.lucide[p.icon] || window.lucide.Settings, { size: 16, color: c.textSec })}
                <span style={{ fontSize: 13, color: c.text, fontFamily: 'Outfit,sans-serif' }}>{p.label}</span>
              </div>
              <div style={{ width: 44, height: 24, borderRadius: 12, background: p.on ? c.primary : c.border, position: 'relative', flexShrink: 0 }}>
                <div style={{ position: 'absolute', top: 2, left: p.on ? 22 : 2, width: 20, height: 20, borderRadius: 10, background: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
              </div>
            </div>
          ))}
        </div>

        {/* Gap Alerts */}
        <div style={{ background: c.surface, borderRadius: 16, padding: 16, boxShadow: c.shadow, border: `1px solid ${c.border}` }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: c.text, margin: '0 0 13px', fontFamily: 'Outfit,sans-serif' }}>Gap Alerts</h3>
          {[
            { label: 'Alert 2 min before gap starts', on: true },
            { label: 'Daily momentum summary', on: true },
            { label: 'Streak reminders', on: false },
          ].map((n, i, arr) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: i < arr.length - 1 ? 11 : 0, marginBottom: i < arr.length - 1 ? 11 : 0, borderBottom: i < arr.length - 1 ? `1px solid ${c.divider}` : 'none' }}>
              <span style={{ fontSize: 13, color: c.text, fontFamily: 'Outfit,sans-serif' }}>{n.label}</span>
              <div style={{ width: 44, height: 24, borderRadius: 12, background: n.on ? c.primary : c.border, position: 'relative', flexShrink: 0 }}>
                <div style={{ position: 'absolute', top: 2, left: n.on ? 22 : 2, width: 20, height: 20, borderRadius: 10, background: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
              </div>
            </div>
          ))}
        </div>

        {/* App info */}
        <div style={{ background: c.primarySoft, borderRadius: 16, padding: 16, border: `1px solid ${c.primary}35` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 13 }}>
            <div style={{ width: 46, height: 46, borderRadius: 13, background: c.primaryGrad, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              {React.createElement(window.lucide.Zap, { size: 22, color: '#fff' })}
            </div>
            <div>
              <p style={{ fontSize: 15, fontWeight: 800, color: c.primary, margin: 0, fontFamily: 'Outfit,sans-serif' }}>Moment Mesh</p>
              <p style={{ fontSize: 11, color: c.textSec, margin: '2px 0 0', fontFamily: 'Outfit,sans-serif' }}>Turn scattered time into useful momentum.</p>
              <p style={{ fontSize: 10, color: c.textMute, margin: '3px 0 0', fontFamily: 'Outfit,sans-serif' }}>Version 1.0.0</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const isGradientTab = activeTab === 'home' || activeTab === 'focus';
  const statusTextColor = isGradientTab ? 'rgba(255,255,255,0.9)' : c.text;
  const statusIconColor = isGradientTab ? 'rgba(255,255,255,0.7)' : c.textSec;
  const statusBg = isGradientTab ? (isDark ? '#1A0D3D' : '#7C3AED') : c.surface;

  return (
    <div style={{ minHeight: '100vh', background: isDark ? '#0A0618' : '#DDD5F5', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, fontFamily: 'Outfit,sans-serif' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap'); * { box-sizing: border-box; margin: 0; padding: 0; } ::-webkit-scrollbar { width: 0; height: 0; }`}</style>

      {/* Phone Frame */}
      <div style={{ width: 375, height: 812, borderRadius: 50, background: c.bg, boxShadow: `0 50px 120px rgba(0,0,0,${isDark ? '0.7' : '0.35'}), 0 0 0 12px #1C1C1E, 0 0 0 14px #2C2C2E`, display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>

        {/* Dynamic Island */}
        <div style={{ position: 'absolute', top: 13, left: '50%', transform: 'translateX(-50%)', width: 122, height: 36, background: '#000', borderRadius: 20, zIndex: 100 }} />

        {/* Status Bar */}
        <div style={{ height: 54, background: statusBg, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '0 22px 9px', flexShrink: 0, transition: 'background 0.3s ease' }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: statusTextColor, fontFamily: 'Outfit,sans-serif', transition: 'color 0.3s ease' }}>9:41</span>
          <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
            {React.createElement(window.lucide.Wifi, { size: 14, color: statusIconColor })}
            {React.createElement(window.lucide.Battery, { size: 16, color: statusIconColor })}
          </div>
        </div>

        {/* Screen Content */}
        <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
          {activeTab === 'home' && <HomeScreen />}
          {activeTab === 'tasks' && <TasksScreen />}
          {activeTab === 'focus' && <FocusScreen />}
          {activeTab === 'insights' && <InsightsScreen />}
          {activeTab === 'settings' && <SettingsScreen />}
        </div>

        {/* Bottom Navigation */}
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', padding: '8px 0 20px', background: c.navBg, borderTop: `1px solid ${c.navBorder}`, flexShrink: 0 }}>
          {[
            { id: 'home', icon: 'Home', label: 'Home' },
            { id: 'tasks', icon: 'CheckSquare', label: 'Tasks' },
            { id: 'focus', icon: 'Zap', label: 'Focus' },
            { id: 'insights', icon: 'BarChart2', label: 'Insights' },
            { id: 'settings', icon: 'Settings', label: 'Settings' },
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ background: 'none', border: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, cursor: 'pointer', padding: '4px 6px' }}>
              <div style={{ width: 38, height: 32, borderRadius: 9, background: activeTab === tab.id ? c.primarySoft : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s ease' }}>
                {React.createElement(window.lucide[tab.icon] || window.lucide.Circle, { size: 20, color: activeTab === tab.id ? c.primary : c.textMute })}
              </div>
              <span style={{ fontSize: 10, fontWeight: activeTab === tab.id ? 700 : 400, color: activeTab === tab.id ? c.primary : c.textMute, fontFamily: 'Outfit,sans-serif', transition: 'color 0.2s ease' }}>
                {tab.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
