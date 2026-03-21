
const { useState, useEffect, useRef } = React;

const themes = {
  dark: {
    bg: '#0A0A0F',
    surface: '#13131E',
    surfaceAlt: '#1C1C2E',
    card: '#1E1E30',
    cardBorder: '#2A2A40',
    primary: '#FF6B35',
    primaryGlow: 'rgba(255,107,53,0.2)',
    secondary: '#7B61FF',
    secondaryGlow: 'rgba(123,97,255,0.2)',
    accent: '#00D2C8',
    accentGlow: 'rgba(0,210,200,0.15)',
    text: '#F0EFF9',
    textSub: '#9B9AB0',
    textMuted: '#5A5A78',
    success: '#2ECC71',
    warning: '#F39C12',
    danger: '#E74C3C',
    navBg: '#111120',
    navBorder: '#1E1E35',
    pillBg: '#1E1E30',
    pillActive: '#FF6B35',
    energyLow: '#E74C3C',
    energyMid: '#F39C12',
    energyHigh: '#2ECC71',
  },
  light: {
    bg: '#F2F0FA',
    surface: '#FFFFFF',
    surfaceAlt: '#EEEDF8',
    card: '#FFFFFF',
    cardBorder: '#E0DEEE',
    primary: '#FF6B35',
    primaryGlow: 'rgba(255,107,53,0.15)',
    secondary: '#7B61FF',
    secondaryGlow: 'rgba(123,97,255,0.12)',
    accent: '#00ADA5',
    accentGlow: 'rgba(0,173,165,0.12)',
    text: '#1A1830',
    textSub: '#5A5870',
    textMuted: '#9896A8',
    success: '#27AE60',
    warning: '#E67E22',
    danger: '#C0392B',
    navBg: '#FFFFFF',
    navBorder: '#E0DEEE',
    pillBg: '#EEEDF8',
    pillActive: '#FF6B35',
    energyLow: '#C0392B',
    energyMid: '#E67E22',
    energyHigh: '#27AE60',
  }
};

const fontLink = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&display=swap');
  * { font-family: 'Sora', sans-serif; box-sizing: border-box; }
  ::-webkit-scrollbar { display: none; }
`;

// --- DATA ---
const todayPlan = [
  {
    id: 1, time: '9:10 AM', duration: 8, title: 'Desk Reset Circuit',
    type: 'Mobility', context: 'Between meetings', energy: 'low',
    reason: 'You have 10 min before your next call and sat for 2h.',
    exercises: ['Neck rolls × 8', 'Seated spinal twist × 10', 'Chest opener × 6', 'Hip flexor stretch 30s each', 'Wrist circles × 10'],
    calories: 45, icon: '🧘', color: '#7B61FF'
  },
  {
    id: 2, time: '12:45 PM', duration: 14, title: 'Lunchtime Leg Flush',
    type: 'Strength', context: 'Office / outdoors', energy: 'medium',
    reason: 'You have been sitting since 8 AM. Legs need circulation.',
    exercises: ['Bodyweight squats × 15', 'Walking lunges × 12', 'Calf raises × 20', 'Glute bridges × 15', 'Step-up taps × 10 each'],
    calories: 110, icon: '💪', color: '#FF6B35'
  },
  {
    id: 3, time: '6:30 PM', duration: 22, title: 'Post-Commute Stress Burn',
    type: 'Cardio', context: 'Home / outdoors', energy: 'high',
    reason: 'Calendar shows commute ends ~6:15 PM. Cortisol release window.',
    exercises: ['Jump rope 90s', 'High knees 45s', 'Mountain climbers × 20', 'Burpee × 8', 'Jumping jacks 60s', 'Cool-down walk 5 min'],
    calories: 195, icon: '🔥', color: '#00D2C8'
  }
];

const contextRoutines = [
  { id: 1, icon: '✈️', label: 'Airport / Flight', color: '#7B61FF', routines: ['Gate-side mobility 7 min', 'Seated circulation 5 min', 'Terminal walk circuit 12 min'] },
  { id: 2, icon: '🏨', label: 'Hotel Room', color: '#FF6B35', routines: ['Room-sized HIIT 15 min', 'Recovery stretch 10 min', 'No-noise night routine 8 min'] },
  { id: 3, icon: '💼', label: 'Office Desk', color: '#00D2C8', routines: ['Silent desk circuit 8 min', 'Posture reset 5 min', 'Walking meeting prep 3 min'] },
  { id: 4, icon: '🏠', label: 'Apartment', color: '#2ECC71', routines: ['Compact HIIT 20 min', 'Floor yoga 15 min', 'Low-impact cardio 18 min'] },
  { id: 5, icon: '🌳', label: 'Outdoors', color: '#E67E22', routines: ['Park circuit 25 min', 'Trail mobility jog 20 min', 'Bench strength 15 min'] },
  { id: 6, icon: '🚗', label: 'In Transit', color: '#E74C3C', routines: ['Seated breathing 4 min', 'Red-light stretches 3 min', 'Arrival activation 6 min'] },
];

const lifeGoals = [
  { label: 'Posture Relief', icon: '🦴', progress: 72, color: '#7B61FF', streak: 5 },
  { label: 'Stress Release', icon: '🧠', progress: 58, color: '#FF6B35', streak: 3 },
  { label: 'Commute Recovery', icon: '🚇', progress: 85, color: '#00D2C8', streak: 8 },
  { label: 'Sleep Quality', icon: '😴', progress: 41, color: '#2ECC71', streak: 2 },
  { label: 'Hip Mobility', icon: '🔄', progress: 63, color: '#E67E22', streak: 6 },
];

const weekData = [
  { day: 'M', done: true, type: 'strength', minutes: 22 },
  { day: 'T', done: true, type: 'mobility', minutes: 14 },
  { day: 'W', done: false, type: null, minutes: 0 },
  { day: 'T', done: true, type: 'cardio', minutes: 18 },
  { day: 'F', done: true, type: 'strength', minutes: 26 },
  { day: 'S', done: false, type: null, minutes: 0 },
  { day: 'S', done: false, type: null, minutes: 0 },
];

const typeColor = { strength: '#FF6B35', mobility: '#7B61FF', cardio: '#00D2C8', recovery: '#2ECC71' };

// --- COMPONENTS ---

function StatusBar({ theme }) {
  const t = themes[theme];
  const [time, setTime] = useState('');
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setTime(d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }));
    };
    tick();
    const id = setInterval(tick, 10000);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 20px 4px', fontSize: 12, fontWeight: 600, color: t.text }}>
      <span>{time || '09:41'}</span>
      <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
        {/* wifi */}
        <svg width="16" height="12" viewBox="0 0 24 18" fill={t.text}>
          <path d="M12 14.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"/>
          <path d="M6.5 10.5C8.1 9 10 8 12 8s3.9 1 5.5 2.5l1.5-1.8C17 6.8 14.6 6 12 6s-5 .8-7 2.7l1.5 1.8z"/>
          <path d="M2 6.5C5 3.8 8.3 2 12 2s7 1.8 10 4.5l1.5-1.8C20 1.8 16.2 0 12 0S4 1.8 1 4.7L2 6.5z" opacity=".5"/>
        </svg>
        {/* battery */}
        <svg width="22" height="12" viewBox="0 0 28 14" fill="none">
          <rect x="0" y="1" width="24" height="12" rx="3" stroke={t.text} strokeWidth="1.5"/>
          <rect x="25" y="4" width="3" height="6" rx="1.5" fill={t.text} opacity=".6"/>
          <rect x="2" y="3" width="16" height="8" rx="1.5" fill={t.success}/>
        </svg>
      </div>
    </div>
  );
}

function DynamicIsland() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 2, marginBottom: 4 }}>
      <div style={{ width: 120, height: 34, background: '#000', borderRadius: 20 }} />
    </div>
  );
}

function BottomNav({ tab, setTab, theme }) {
  const t = themes[theme];
  const items = [
    { id: 'home', icon: 'home', label: 'Today' },
    { id: 'context', icon: 'map-pin', label: 'Context' },
    { id: 'workout', icon: 'zap', label: 'Workout' },
    { id: 'progress', icon: 'bar-chart-2', label: 'Progress' },
    { id: 'settings', icon: 'settings', label: 'Settings' },
  ];

  return (
    <div style={{
      display: 'flex', justifyContent: 'space-around', alignItems: 'center',
      background: t.navBg, borderTop: `1px solid ${t.navBorder}`,
      padding: '10px 0 20px', position: 'absolute', bottom: 0, left: 0, right: 0
    }}>
      {items.map(item => {
        const active = tab === item.id;
        const Icon = window.lucide[item.icon.split('-').map((w,i) => i===0?w:w[0].toUpperCase()+w.slice(1)).join('')] ||
                     window.lucide[item.icon.charAt(0).toUpperCase() + item.icon.slice(1).replace(/-([a-z])/g, (_,c)=>c.toUpperCase())];
        return (
          <button key={item.id}
            onClick={() => setTab(item.id)}
            style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
              background: 'none', border: 'none', cursor: 'pointer',
              color: active ? t.primary : t.textMuted, padding: '4px 10px',
              transition: 'all 0.2s'
            }}>
            <div style={{
              background: active ? t.primaryGlow : 'transparent',
              borderRadius: 12, padding: '6px 10px',
              transform: active ? 'scale(1.1)' : 'scale(1)',
              transition: 'all 0.2s'
            }}>
              {Icon && React.createElement(Icon, { size: 22, strokeWidth: active ? 2.5 : 1.8 })}
            </div>
            <span style={{ fontSize: 10, fontWeight: active ? 700 : 500 }}>{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}

// --- SCREENS ---

function HomeScreen({ theme, setTab, setActiveWorkout }) {
  const t = themes[theme];
  const [energyLevel] = useState(68);
  const [selectedWorkout, setSelectedWorkout] = useState(null);

  const energyColor = energyLevel < 40 ? t.energyLow : energyLevel < 70 ? t.energyMid : t.energyHigh;
  const energyLabel = energyLevel < 40 ? 'Low — Recovery Mode' : energyLevel < 70 ? 'Moderate — Smart Effort' : 'High — Go Hard';

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '0 0 100px' }}>
      {/* Header */}
      <div style={{ padding: '8px 20px 16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <p style={{ margin: 0, fontSize: 13, color: t.textSub, fontWeight: 500 }}>Saturday, Mar 21</p>
            <h2 style={{ margin: '2px 0 0', fontSize: 22, fontWeight: 800, color: t.text }}>Good morning, Alex 👋</h2>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ width: 44, height: 44, borderRadius: '50%', background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>
              🧑
            </div>
          </div>
        </div>
      </div>

      {/* Energy Card */}
      <div style={{ margin: '0 16px 16px', background: t.card, border: `1px solid ${t.cardBorder}`, borderRadius: 20, padding: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: t.textSub }}>⚡ ENERGY SCORE</span>
          <span style={{ fontSize: 12, fontWeight: 700, color: energyColor, background: energyColor + '22', padding: '3px 10px', borderRadius: 20 }}>{energyLabel}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ fontSize: 40, fontWeight: 800, color: energyColor }}>{energyLevel}</div>
          <div style={{ flex: 1 }}>
            <div style={{ background: t.surfaceAlt, borderRadius: 10, height: 10, overflow: 'hidden' }}>
              <div style={{ width: `${energyLevel}%`, height: '100%', background: `linear-gradient(90deg, ${energyColor}88, ${energyColor})`, borderRadius: 10, transition: 'width 0.8s ease' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
              {[{label:'Sleep', val:'6.5h', ok:false},{label:'Steps', val:'3.2k', ok:false},{label:'HRV', val:'52ms', ok:true}].map(s => (
                <div key={s.label} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 11, color: s.ok ? t.success : t.warning, fontWeight: 700 }}>{s.val}</div>
                  <div style={{ fontSize: 10, color: t.textMuted }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Calendar Scan */}
      <div style={{ margin: '0 16px 16px', background: `linear-gradient(135deg, ${t.secondary}22, ${t.accent}11)`, border: `1px solid ${t.secondary}33`, borderRadius: 20, padding: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <span style={{ fontSize: 14 }}>📅</span>
          <span style={{ fontSize: 12, fontWeight: 700, color: t.secondary }}>CALENDAR SCAN</span>
        </div>
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
          {[
            {time:'9:00',label:'Standup',dur:'30m',busy:true},
            {time:'10:00',label:'💨 8 min window',dur:'8m',busy:false},
            {time:'11:30',label:'Client Call',dur:'60m',busy:true},
            {time:'12:45',label:'💨 14 min window',dur:'14m',busy:false},
            {time:'2:00',label:'Design Review',dur:'90m',busy:true},
          ].map((ev, i) => (
            <div key={i} style={{ flexShrink: 0, background: ev.busy ? t.surfaceAlt : t.primary + '22', border: `1px solid ${ev.busy ? t.cardBorder : t.primary + '44'}`, borderRadius: 12, padding: '6px 10px', minWidth: 90 }}>
              <div style={{ fontSize: 10, color: t.textMuted }}>{ev.time}</div>
              <div style={{ fontSize: 11, fontWeight: 600, color: ev.busy ? t.textSub : t.primary, marginTop: 2 }}>{ev.label}</div>
              <div style={{ fontSize: 10, color: t.textMuted }}>{ev.dur}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Today's Workout Plan */}
      <div style={{ padding: '0 16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: t.text }}>Today's Plan</h3>
          <span style={{ fontSize: 12, color: t.textSub }}>{todayPlan.length} sessions</span>
        </div>

        {todayPlan.map((w, i) => (
          <div key={w.id}
            onClick={() => setSelectedWorkout(selectedWorkout === w.id ? null : w.id)}
            style={{
              background: t.card, border: `1px solid ${selectedWorkout === w.id ? w.color : t.cardBorder}`,
              borderRadius: 20, padding: 16, marginBottom: 10, cursor: 'pointer',
              transition: 'all 0.25s', boxShadow: selectedWorkout === w.id ? `0 0 0 1px ${w.color}44, 0 4px 20px ${w.color}22` : 'none'
            }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 48, height: 48, borderRadius: 16, background: w.color + '22', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, border: `1px solid ${w.color}44` }}>
                {w.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 15, fontWeight: 700, color: t.text }}>{w.title}</span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: w.color }}>{w.duration} min</span>
                </div>
                <div style={{ fontSize: 12, color: t.textSub, marginTop: 2 }}>{w.time} · {w.type} · {w.calories} kcal</div>
                <div style={{ fontSize: 11, color: t.textMuted, marginTop: 2 }}>{w.context}</div>
              </div>
            </div>

            {selectedWorkout === w.id && (
              <div style={{ marginTop: 14, paddingTop: 14, borderTop: `1px solid ${t.cardBorder}` }}>
                <p style={{ margin: '0 0 10px', fontSize: 12, color: t.textSub, lineHeight: 1.5 }}>
                  💡 {w.reason}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
                  {w.exercises.map((ex, j) => (
                    <span key={j} style={{ fontSize: 11, fontWeight: 500, color: t.textSub, background: t.surfaceAlt, padding: '4px 10px', borderRadius: 20 }}>{ex}</span>
                  ))}
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); setActiveWorkout(w); setTab('workout'); }}
                  style={{
                    width: '100%', background: `linear-gradient(135deg, ${w.color}, ${w.color}cc)`,
                    border: 'none', borderRadius: 14, padding: '12px', color: '#fff',
                    fontSize: 14, fontWeight: 700, cursor: 'pointer', letterSpacing: 0.3
                  }}>
                  Start Now →
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ContextScreen({ theme, setActiveWorkout, setTab }) {
  const t = themes[theme];
  const [selected, setSelected] = useState(null);

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '0 0 100px' }}>
      <div style={{ padding: '8px 20px 16px' }}>
        <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: t.text }}>Where are you?</h2>
        <p style={{ margin: '4px 0 0', fontSize: 13, color: t.textSub }}>Pick your current situation for a tailored workout.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, padding: '0 16px' }}>
        {contextRoutines.map(ctx => (
          <div key={ctx.id}
            onClick={() => setSelected(selected === ctx.id ? null : ctx.id)}
            style={{
              background: t.card, border: `1.5px solid ${selected === ctx.id ? ctx.color : t.cardBorder}`,
              borderRadius: 20, padding: 16, cursor: 'pointer', transition: 'all 0.2s',
              boxShadow: selected === ctx.id ? `0 0 0 1px ${ctx.color}33, 0 6px 24px ${ctx.color}22` : 'none'
            }}>
            <div style={{ fontSize: 30, marginBottom: 8 }}>{ctx.icon}</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: t.text, marginBottom: 4 }}>{ctx.label}</div>
            <div style={{ fontSize: 11, color: t.textMuted }}>{ctx.routines.length} routines</div>
          </div>
        ))}
      </div>

      {selected && (() => {
        const ctx = contextRoutines.find(c => c.id === selected);
        return (
          <div style={{ margin: '16px 16px 0', background: t.card, border: `1px solid ${ctx.color}44`, borderRadius: 20, padding: 16 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: t.text, marginBottom: 12 }}>
              {ctx.icon} {ctx.label} routines
            </div>
            {ctx.routines.map((r, i) => {
              const dur = r.match(/\d+/)?.[0];
              const typeHint = r.toLowerCase().includes('hiit') || r.toLowerCase().includes('cardio') ? 'cardio'
                : r.toLowerCase().includes('stretch') || r.toLowerCase().includes('mobility') || r.toLowerCase().includes('yoga') ? 'mobility'
                : r.toLowerCase().includes('strength') ? 'strength' : 'recovery';
              return (
                <div key={i}
                  onClick={() => { const w = { id: 90+i, title: r.split(' ').slice(0,3).join(' '), type: typeHint, duration: parseInt(dur)||10, icon: ctx.icon, color: ctx.color, calories: parseInt(dur)*8||60, exercises: ['Exercise 1 × 12', 'Exercise 2 × 10', 'Exercise 3 × 15', 'Cool-down stretch'] }; setActiveWorkout(w); setTab('workout'); }}
                  style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    background: t.surfaceAlt, borderRadius: 14, padding: '12px 14px', marginBottom: 8, cursor: 'pointer'
                  }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: t.text }}>{r}</div>
                    <div style={{ fontSize: 11, color: t.textSub, marginTop: 2 }}>{typeHint} · no equipment</div>
                  </div>
                  <div style={{ color: ctx.color, fontSize: 18 }}>›</div>
                </div>
              );
            })}
          </div>
        );
      })()}
    </div>
  );
}

function WorkoutScreen({ theme, activeWorkout }) {
  const t = themes[theme];
  const [phase, setPhase] = useState('preview'); // preview | active | done
  const [currentEx, setCurrentEx] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const timerRef = useRef(null);

  const w = activeWorkout || todayPlan[1];
  const exercises = w.exercises || [];
  const totalSecs = w.duration * 60;

  useEffect(() => {
    if (running) {
      timerRef.current = setInterval(() => setSeconds(s => {
        if (s >= totalSecs - 1) { clearInterval(timerRef.current); setPhase('done'); setRunning(false); return totalSecs; }
        return s + 1;
      }), 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [running]);

  const fmt = (s) => `${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`;
  const progress = seconds / totalSecs;
  const exProgress = exercises.length ? Math.min(currentEx / exercises.length, 1) : 0;

  const radius = 72;
  const circ = 2 * Math.PI * radius;

  if (phase === 'done') return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 24px 100px' }}>
      <div style={{ fontSize: 64, marginBottom: 16 }}>🎉</div>
      <h2 style={{ margin: '0 0 8px', fontSize: 26, fontWeight: 800, color: t.text }}>Workout Complete!</h2>
      <p style={{ margin: '0 0 24px', fontSize: 14, color: t.textSub, textAlign: 'center' }}>You crushed it. {w.calories} kcal burned in {w.duration} min.</p>
      <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
        {[{l:'Duration',v:w.duration+'m'},{l:'Calories',v:w.calories},{l:'Exercises',v:exercises.length}].map(s => (
          <div key={s.l} style={{ background: t.card, borderRadius: 16, padding: '14px 18px', textAlign: 'center' }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: w.color || t.primary }}>{s.v}</div>
            <div style={{ fontSize: 11, color: t.textMuted, marginTop: 2 }}>{s.l}</div>
          </div>
        ))}
      </div>
      <button onClick={() => { setPhase('preview'); setSeconds(0); setCurrentEx(0); setRunning(false); }}
        style={{ background: `linear-gradient(135deg, ${w.color||t.primary}, ${t.secondary})`, border: 'none', borderRadius: 16, padding: '14px 40px', color: '#fff', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>
        Back to Plan
      </button>
    </div>
  );

  if (phase === 'preview') return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '0 16px 100px' }}>
      <div style={{ padding: '8px 4px 16px' }}>
        <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: t.text }}>{w.title}</h2>
        <div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
          {[w.type, `${w.duration} min`, `${w.calories} kcal`].map(tag => (
            <span key={tag} style={{ fontSize: 12, fontWeight: 600, color: w.color||t.primary, background: (w.color||t.primary)+'22', padding: '4px 12px', borderRadius: 20 }}>{tag}</span>
          ))}
        </div>
      </div>

      {/* Ring preview */}
      <div style={{ display: 'flex', justifyContent: 'center', margin: '8px 0 20px' }}>
        <svg width={180} height={180} viewBox="0 0 180 180">
          <circle cx={90} cy={90} r={radius} fill="none" stroke={t.surfaceAlt} strokeWidth={10}/>
          <circle cx={90} cy={90} r={radius} fill="none" stroke={w.color||t.primary} strokeWidth={10}
            strokeDasharray={circ} strokeDashoffset={circ * (1-exProgress)}
            strokeLinecap="round" transform="rotate(-90 90 90)" style={{transition:'stroke-dashoffset 0.5s'}}/>
          <text x={90} y={85} textAnchor="middle" fill={t.text} fontSize={30} fontWeight={800} fontFamily="Sora">{w.icon||'💪'}</text>
          <text x={90} y={108} textAnchor="middle" fill={t.textSub} fontSize={12} fontFamily="Sora">Ready</text>
        </svg>
      </div>

      <div style={{ marginBottom: 16 }}>
        <h3 style={{ margin: '0 0 10px', fontSize: 14, fontWeight: 700, color: t.text }}>Exercises</h3>
        {exercises.map((ex, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, background: t.card, borderRadius: 14, padding: '12px 14px', marginBottom: 8 }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: (w.color||t.primary)+'22', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: w.color||t.primary }}>
              {i+1}
            </div>
            <span style={{ fontSize: 13, fontWeight: 500, color: t.text }}>{ex}</span>
          </div>
        ))}
      </div>

      <button onClick={() => setPhase('active')}
        style={{ width: '100%', background: `linear-gradient(135deg, ${w.color||t.primary}, ${t.secondary})`, border: 'none', borderRadius: 16, padding: '16px', color: '#fff', fontSize: 16, fontWeight: 800, cursor: 'pointer', letterSpacing: 0.5 }}>
        Begin Workout →
      </button>
    </div>
  );

  // active phase
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '0 20px 100px' }}>
      <div style={{ padding: '8px 0 12px' }}>
        <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: t.text }}>{w.title}</h2>
      </div>

      {/* Timer ring */}
      <div style={{ display: 'flex', justifyContent: 'center', margin: '8px 0 16px' }}>
        <svg width={200} height={200} viewBox="0 0 200 200">
          <circle cx={100} cy={100} r={radius} fill="none" stroke={t.surfaceAlt} strokeWidth={12}/>
          <circle cx={100} cy={100} r={radius} fill="none" stroke={w.color||t.primary} strokeWidth={12}
            strokeDasharray={circ} strokeDashoffset={circ * (1-progress)}
            strokeLinecap="round" transform="rotate(-90 100 100)" style={{transition:'stroke-dashoffset 0.5s'}}/>
          <text x={100} y={93} textAnchor="middle" fill={t.text} fontSize={32} fontWeight={800} fontFamily="Sora">{fmt(seconds)}</text>
          <text x={100} y={117} textAnchor="middle" fill={t.textSub} fontSize={13} fontFamily="Sora">{running ? 'In Progress' : 'Paused'}</text>
        </svg>
      </div>

      {/* Current exercise */}
      {exercises.length > 0 && (
        <div style={{ background: (w.color||t.primary)+'22', border: `1px solid ${w.color||t.primary}44`, borderRadius: 20, padding: 18, marginBottom: 14, textAlign: 'center' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: t.textMuted, marginBottom: 4 }}>CURRENT EXERCISE</div>
          <div style={{ fontSize: 18, fontWeight: 800, color: t.text }}>{exercises[currentEx]}</div>
          <div style={{ fontSize: 12, color: t.textSub, marginTop: 4 }}>{currentEx + 1} of {exercises.length}</div>
        </div>
      )}

      {/* Controls */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 14 }}>
        <button onClick={() => setRunning(r => !r)}
          style={{ flex: 1, background: running ? t.surfaceAlt : `linear-gradient(135deg, ${w.color||t.primary}, ${t.secondary})`, border: 'none', borderRadius: 16, padding: '14px', color: running ? t.text : '#fff', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>
          {running ? '⏸ Pause' : '▶ Resume'}
        </button>
        {currentEx < exercises.length - 1 && (
          <button onClick={() => setCurrentEx(c => c + 1)}
            style={{ background: t.surfaceAlt, border: 'none', borderRadius: 16, padding: '14px 18px', color: t.text, fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>
            Next →
          </button>
        )}
      </div>

      <button onClick={() => setPhase('done')}
        style={{ background: 'none', border: `1px solid ${t.cardBorder}`, borderRadius: 16, padding: '12px', color: t.textMuted, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
        Finish Early
      </button>
    </div>
  );
}

function ProgressScreen({ theme }) {
  const t = themes[theme];

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '0 0 100px' }}>
      <div style={{ padding: '8px 20px 16px' }}>
        <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: t.text }}>Progress</h2>
        <p style={{ margin: '4px 0 0', fontSize: 13, color: t.textSub }}>Your daily life balance goals.</p>
      </div>

      {/* Week summary */}
      <div style={{ margin: '0 16px 16px', background: t.card, border: `1px solid ${t.cardBorder}`, borderRadius: 20, padding: 16 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: t.textSub, marginBottom: 12 }}>THIS WEEK</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          {weekData.map((d, i) => (
            <div key={i} style={{ textAlign: 'center', flex: 1 }}>
              <div style={{ height: 60, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center', marginBottom: 4 }}>
                <div style={{
                  width: 28, height: d.done ? Math.max(12, d.minutes * 1.8) : 6,
                  background: d.done ? (typeColor[d.type] || t.primary) : t.surfaceAlt,
                  borderRadius: 6, transition: 'height 0.6s ease'
                }} />
              </div>
              <div style={{ fontSize: 10, color: i === 5 ? t.text : t.textMuted, fontWeight: i === 5 ? 700 : 500 }}>{d.day}</div>
              {d.done && <div style={{ fontSize: 9, color: t.textMuted, marginTop: 1 }}>{d.minutes}m</div>}
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 12, marginTop: 14 }}>
          {[{l:'Workouts',v:'4'},{l:'Minutes',v:'80'},{l:'Kcal',v:'370'},{l:'Streak',v:'4d'}].map(s => (
            <div key={s.l} style={{ flex: 1, textAlign: 'center', background: t.surfaceAlt, borderRadius: 12, padding: '10px 4px' }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: t.primary }}>{s.v}</div>
              <div style={{ fontSize: 10, color: t.textMuted }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Life Balance Goals */}
      <div style={{ padding: '0 16px' }}>
        <h3 style={{ margin: '0 0 12px', fontSize: 15, fontWeight: 700, color: t.text }}>Life Balance Goals</h3>
        {lifeGoals.map(g => (
          <div key={g.label} style={{ background: t.card, border: `1px solid ${t.cardBorder}`, borderRadius: 18, padding: '14px 16px', marginBottom: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 22 }}>{g.icon}</span>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: t.text }}>{g.label}</div>
                  <div style={{ fontSize: 11, color: t.textMuted }}>🔥 {g.streak} day streak</div>
                </div>
              </div>
              <div style={{ fontSize: 20, fontWeight: 800, color: g.color }}>{g.progress}%</div>
            </div>
            <div style={{ background: t.surfaceAlt, borderRadius: 8, height: 8 }}>
              <div style={{ width: `${g.progress}%`, height: '100%', background: `linear-gradient(90deg, ${g.color}88, ${g.color})`, borderRadius: 8, transition: 'width 0.8s ease' }} />
            </div>
          </div>
        ))}
      </div>

      {/* Insight */}
      <div style={{ margin: '16px 16px 0', background: `linear-gradient(135deg, ${t.secondary}22, ${t.accent}11)`, border: `1px solid ${t.secondary}33`, borderRadius: 20, padding: 16 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: t.secondary, marginBottom: 8 }}>🤖 AI INSIGHT</div>
        <p style={{ margin: 0, fontSize: 13, color: t.textSub, lineHeight: 1.6 }}>
          Your Commute Recovery score is highest this week — great consistency! Back mobility is trending up. Try adding 1 more posture reset session tomorrow to close the gap.
        </p>
      </div>
    </div>
  );
}

function SettingsScreen({ theme, setTheme }) {
  const t = themes[theme];

  const Toggle = ({ value, onChange }) => (
    <div onClick={() => onChange(!value)}
      style={{ width: 46, height: 26, background: value ? t.primary : t.surfaceAlt, borderRadius: 13, position: 'relative', cursor: 'pointer', transition: 'background 0.3s' }}>
      <div style={{ position: 'absolute', top: 3, left: value ? 23 : 3, width: 20, height: 20, borderRadius: '50%', background: '#fff', transition: 'left 0.3s', boxShadow: '0 1px 4px rgba(0,0,0,0.2)' }} />
    </div>
  );

  const [calendar, setCalendar] = useState(true);
  const [sleep, setSleep] = useState(true);
  const [hrv, setHrv] = useState(false);
  const [notifs, setNotifs] = useState(true);

  const connectedApps = [
    { name: 'Google Calendar', icon: '📅', connected: calendar, toggle: setCalendar },
    { name: 'Apple Health (Sleep)', icon: '😴', connected: sleep, toggle: setSleep },
    { name: 'Whoop / Garmin HRV', icon: '❤️', connected: hrv, toggle: setHrv },
    { name: 'Workout Reminders', icon: '🔔', connected: notifs, toggle: setNotifs },
  ];

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '0 0 100px' }}>
      <div style={{ padding: '8px 20px 16px' }}>
        <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: t.text }}>Settings</h2>
      </div>

      {/* Profile */}
      <div style={{ margin: '0 16px 16px', background: t.card, border: `1px solid ${t.cardBorder}`, borderRadius: 20, padding: 16, display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{ width: 54, height: 54, borderRadius: '50%', background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>🧑</div>
        <div>
          <div style={{ fontSize: 16, fontWeight: 700, color: t.text }}>Alex Rivera</div>
          <div style={{ fontSize: 12, color: t.textSub }}>alex@example.com</div>
          <div style={{ fontSize: 11, color: t.primary, marginTop: 2, fontWeight: 600 }}>Pro Plan · Active</div>
        </div>
      </div>

      {/* Theme toggle */}
      <div style={{ margin: '0 16px 12px', background: t.card, border: `1px solid ${t.cardBorder}`, borderRadius: 20, overflow: 'hidden' }}>
        <div style={{ padding: '12px 16px', borderBottom: `1px solid ${t.cardBorder}` }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: t.textMuted, marginBottom: 4 }}>APPEARANCE</div>
        </div>
        <div style={{ display: 'flex', padding: '12px 16px', gap: 12 }}>
          {['dark','light'].map(mode => (
            <div key={mode}
              onClick={() => setTheme(mode)}
              style={{
                flex: 1, textAlign: 'center', padding: '12px 8px', borderRadius: 14, cursor: 'pointer',
                background: theme === mode ? t.primary + '22' : t.surfaceAlt,
                border: `1.5px solid ${theme === mode ? t.primary : t.cardBorder}`,
                transition: 'all 0.2s'
              }}>
              <div style={{ fontSize: 22, marginBottom: 4 }}>{mode === 'dark' ? '🌙' : '☀️'}</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: theme === mode ? t.primary : t.textSub }}>
                {mode.charAt(0).toUpperCase() + mode.slice(1)} Mode
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Connected data */}
      <div style={{ margin: '0 16px 12px', background: t.card, border: `1px solid ${t.cardBorder}`, borderRadius: 20, overflow: 'hidden' }}>
        <div style={{ padding: '12px 16px', borderBottom: `1px solid ${t.cardBorder}` }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: t.textMuted }}>CONNECTED DATA SOURCES</div>
        </div>
        {connectedApps.map((app, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', borderBottom: i < connectedApps.length - 1 ? `1px solid ${t.cardBorder}` : 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 20 }}>{app.icon}</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: t.text }}>{app.name}</div>
                <div style={{ fontSize: 11, color: app.connected ? t.success : t.textMuted }}>{app.connected ? '● Connected' : '○ Disconnected'}</div>
              </div>
            </div>
            <Toggle value={app.connected} onChange={app.toggle} />
          </div>
        ))}
      </div>

      {/* Stats */}
      <div style={{ margin: '0 16px', background: t.card, border: `1px solid ${t.cardBorder}`, borderRadius: 20, padding: 16 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: t.textMuted, marginBottom: 12 }}>YOUR STATS</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {[{l:'Total Workouts',v:'47'},{l:'Total Minutes',v:'620'},{l:'Avg Duration',v:'13 min'},{l:'Best Streak',v:'12 days'}].map(s => (
            <div key={s.l} style={{ background: t.surfaceAlt, borderRadius: 14, padding: '12px 14px' }}>
              <div style={{ fontSize: 20, fontWeight: 800, color: t.primary }}>{s.v}</div>
              <div style={{ fontSize: 11, color: t.textMuted, marginTop: 2 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// --- MAIN APP ---
function App() {
  const [theme, setTheme] = useState('dark');
  const [tab, setTab] = useState('home');
  const [activeWorkout, setActiveWorkout] = useState(null);

  const t = themes[theme];

  return (
    <div style={{ minHeight: '100vh', background: '#1a1a2e', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <style>{fontLink}</style>
      {/* Phone frame */}
      <div style={{
        width: 375, height: 812, background: t.bg,
        borderRadius: 48, overflow: 'hidden', position: 'relative',
        boxShadow: '0 40px 120px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.08)',
        display: 'flex', flexDirection: 'column',
        border: theme === 'light' ? '1px solid #ddd' : '1px solid #2a2a40',
        transition: 'background 0.3s'
      }}>
        <StatusBar theme={theme} />
        <DynamicIsland />

        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', position: 'relative' }}>
          {tab === 'home' && <HomeScreen theme={theme} setTab={setTab} setActiveWorkout={setActiveWorkout} />}
          {tab === 'context' && <ContextScreen theme={theme} setActiveWorkout={setActiveWorkout} setTab={setTab} />}
          {tab === 'workout' && <WorkoutScreen theme={theme} activeWorkout={activeWorkout} />}
          {tab === 'progress' && <ProgressScreen theme={theme} />}
          {tab === 'settings' && <SettingsScreen theme={theme} setTheme={setTheme} />}
        </div>

        <BottomNav tab={tab} setTab={setTab} theme={theme} />
      </div>
    </div>
  );
}
