function App() {
  const { useState, useEffect, useRef } = React;

  // Inject Google Fonts
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap');`;
    document.head.appendChild(style);
  }, []);

  const [activeTab, setActiveTab] = useState('home');
  const [checkinDone, setCheckinDone] = useState(false);
  const [timerActive, setTimerActive] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [activeWorkout, setActiveWorkout] = useState(null);
  const timerRef = useRef(null);

  // Check-in state
  const [checkin, setCheckin] = useState({ sleep: 0, soreness: 0, mood: 0, energy: 0 });
  const [checkinStep, setCheckinStep] = useState(0);
  const [showResult, setShowResult] = useState(false);

  // Readiness score derived from check-in
  const readinessScore = checkinDone
    ? Math.round(((checkin.sleep + (5 - checkin.soreness) + checkin.mood + checkin.energy) / 16) * 100)
    : 72;

  const getReadinessLabel = (score) => {
    if (score >= 80) return { label: 'Peak Ready', color: '#00D4AA', bg: 'rgba(0,212,170,0.12)' };
    if (score >= 60) return { label: 'Moderate', color: '#F59E0B', bg: 'rgba(245,158,11,0.12)' };
    return { label: 'Recovery Day', color: '#FF6B35', bg: 'rgba(255,107,53,0.12)' };
  };

  const readiness = getReadinessLabel(readinessScore);

  const workoutRecommendation = readinessScore >= 80
    ? { type: 'Performance', title: 'Progressive Interval Run', duration: '28 min', intensity: 'High', icon: '⚡', color: '#00D4AA', desc: 'Your body is primed. Push your limits with high-intensity intervals.' }
    : readinessScore >= 60
    ? { type: 'Maintenance', title: 'Moderate Strength Flow', duration: '20 min', intensity: 'Medium', icon: '🔥', color: '#F59E0B', desc: 'Good baseline energy. A steady session will build consistency.' }
    : { type: 'Recovery', title: 'Mobility Reset', duration: '12 min', intensity: 'Low', icon: '🌿', color: '#FF6B35', desc: 'Your body signals rest. Light movement will help you recover faster.' };

  // Timer logic
  useEffect(() => {
    if (timerActive) {
      timerRef.current = setInterval(() => setTimerSeconds(s => s + 1), 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [timerActive]);

  const fmtTime = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  const C = {
    bg: '#080C14',
    card: '#111827',
    card2: '#1A2234',
    primary: '#00D4AA',
    secondary: '#FF6B35',
    accent: '#6366F1',
    text: '#E8EDF5',
    muted: '#6B7A8D',
    border: 'rgba(255,255,255,0.07)',
    font: "'Space Grotesk', 'Inter', sans-serif",
  };

  const s = {
    phone: { width: 375, height: 812, background: C.bg, borderRadius: 48, overflow: 'hidden', position: 'relative', fontFamily: C.font, color: C.text, display: 'flex', flexDirection: 'column', boxShadow: '0 40px 120px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.1)' },
    wrap: { minHeight: '100vh', background: '#03060E', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 },
    statusBar: { height: 50, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '0 28px 8px', flexShrink: 0 },
    di: { position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)', width: 120, height: 34, background: '#000', borderRadius: 20, zIndex: 10 },
    scroll: { flex: 1, overflowY: 'auto', scrollbarWidth: 'none' },
    nav: { height: 80, background: 'rgba(8,12,20,0.95)', backdropFilter: 'blur(20px)', borderTop: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-around', padding: '0 8px 12px', flexShrink: 0 },
    navBtn: (active) => ({ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, padding: '8px 16px', borderRadius: 16, background: active ? 'rgba(0,212,170,0.1)' : 'transparent', border: 'none', cursor: 'pointer', transition: 'all 0.2s' }),
    navIcon: (active) => ({ color: active ? C.primary : C.muted }),
    navLabel: (active) => ({ fontSize: 10, fontWeight: 600, color: active ? C.primary : C.muted, letterSpacing: '0.5px' }),
    card: (extra = {}) => ({ background: C.card, borderRadius: 20, padding: 16, border: `1px solid ${C.border}`, ...extra }),
    pill: (color, bg) => ({ background: bg, color: color, borderRadius: 20, padding: '4px 12px', fontSize: 11, fontWeight: 700, letterSpacing: '0.5px', display: 'inline-block' }),
    btn: (bg, color = '#fff', extra = {}) => ({ background: bg, color, borderRadius: 14, padding: '14px 24px', fontWeight: 700, fontSize: 15, border: 'none', cursor: 'pointer', width: '100%', transition: 'all 0.15s', fontFamily: C.font, ...extra }),
  };

  // ── HOME SCREEN ──
  const HomeScreen = () => (
    <div style={{ padding: '8px 20px 20px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 13, color: C.muted, marginBottom: 2 }}>Friday, March 20</div>
          <div style={{ fontSize: 24, fontWeight: 700, lineHeight: 1.2 }}>Good morning,<br />Alex 👋</div>
        </div>
        <div style={{ width: 44, height: 44, borderRadius: 22, background: `linear-gradient(135deg, ${C.primary}, ${C.accent})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🏃</div>
      </div>

      {/* Readiness Card */}
      <div style={{ ...s.card(), background: `linear-gradient(135deg, #111827, #0F1D2E)`, marginBottom: 16, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -30, right: -30, width: 120, height: 120, borderRadius: '50%', background: `radial-gradient(circle, ${readiness.color}20, transparent)` }} />
        <div style={{ fontSize: 12, color: C.muted, marginBottom: 8, fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>Today's Readiness</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ position: 'relative' }}>
            <svg width={80} height={80} viewBox="0 0 80 80">
              <circle cx={40} cy={40} r={32} fill="none" stroke={C.border} strokeWidth={6} />
              <circle cx={40} cy={40} r={32} fill="none" stroke={readiness.color} strokeWidth={6}
                strokeDasharray={`${2 * Math.PI * 32 * readinessScore / 100} ${2 * Math.PI * 32 * (1 - readinessScore / 100)}`}
                strokeLinecap="round" transform="rotate(-90 40 40)" />
              <text x={40} y={44} textAnchor="middle" fill={C.text} fontSize={18} fontWeight={700} fontFamily={C.font}>{readinessScore}</text>
            </svg>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ ...s.pill(readiness.color, readiness.bg), marginBottom: 8 }}>{readiness.label}</div>
            <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.5 }}>
              {checkinDone ? 'Based on your morning check-in' : 'Complete check-in for accuracy'}
            </div>
            {!checkinDone && (
              <button style={{ ...s.btn(C.primary, '#000', { width: 'auto', padding: '8px 16px', fontSize: 12, marginTop: 8, borderRadius: 10 }) }}
                onClick={() => setActiveTab('checkin')}>
                Check In Now
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Recommended Workout */}
      <div style={{ fontSize: 12, color: C.muted, fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 10 }}>Recommended Workout</div>
      <div style={{ ...s.card(), background: `linear-gradient(135deg, ${workoutRecommendation.color}15, ${C.card})`, border: `1px solid ${workoutRecommendation.color}30`, marginBottom: 16 }}
        onClick={() => { setActiveWorkout(workoutRecommendation); setActiveTab('workout'); }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
          <div>
            <div style={{ fontSize: 11, color: workoutRecommendation.color, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 4 }}>{workoutRecommendation.type} SESSION</div>
            <div style={{ fontSize: 18, fontWeight: 700 }}>{workoutRecommendation.title}</div>
          </div>
          <div style={{ fontSize: 28 }}>{workoutRecommendation.icon}</div>
        </div>
        <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.5, marginBottom: 12 }}>{workoutRecommendation.desc}</div>
        <div style={{ display: 'flex', gap: 10 }}>
          {[['⏱', workoutRecommendation.duration], ['📊', workoutRecommendation.intensity]].map(([icon, val]) => (
            <div key={val} style={{ background: C.bg, borderRadius: 10, padding: '6px 12px', display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: 12 }}>{icon}</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: C.muted }}>{val}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div style={{ fontSize: 12, color: C.muted, fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 10 }}>This Week</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 16 }}>
        {[['4', 'Workouts', '🏋️'], ['78%', 'Avg Ready', '📈'], ['2h 14m', 'Active', '⚡']].map(([val, label, icon]) => (
          <div key={label} style={{ ...s.card(), textAlign: 'center', padding: 12 }}>
            <div style={{ fontSize: 18, marginBottom: 2 }}>{icon}</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: C.primary }}>{val}</div>
            <div style={{ fontSize: 10, color: C.muted, fontWeight: 500 }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Recovery Alert */}
      <div style={{ ...s.card(), background: 'rgba(255,107,53,0.08)', border: '1px solid rgba(255,107,53,0.2)', display: 'flex', alignItems: 'flex-start', gap: 12 }}>
        <div style={{ fontSize: 20, marginTop: 2 }}>⚠️</div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#FF6B35', marginBottom: 4 }}>Recovery Alert</div>
          <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.5 }}>You've trained 3 days in a row. Consider a light session or full rest today.</div>
        </div>
      </div>
    </div>
  );

  // ── CHECK-IN SCREEN ──
  const CheckinScreen = () => {
    const steps = [
      { key: 'sleep', label: 'Sleep Quality', question: 'How well did you sleep last night?', emoji: '🌙', options: ['Very Poor', 'Poor', 'Fair', 'Good', 'Great'] },
      { key: 'soreness', label: 'Muscle Soreness', question: 'How sore does your body feel?', emoji: '💪', options: ['None', 'Slight', 'Moderate', 'Significant', 'Severe'] },
      { key: 'mood', label: 'Mental Mood', question: 'How\'s your mental state today?', emoji: '🧠', options: ['Anxious', 'Low', 'Neutral', 'Good', 'Energized'] },
      { key: 'energy', label: 'Energy Levels', question: 'How energized do you feel?', emoji: '⚡', options: ['Drained', 'Low', 'Moderate', 'High', 'Pumped'] },
    ];

    const step = steps[checkinStep];
    const progress = (checkinStep / steps.length) * 100;

    if (showResult) {
      return (
        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
          <div style={{ fontSize: 64 }}>✅</div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Check-in Complete!</div>
            <div style={{ fontSize: 14, color: C.muted }}>Your readiness score is ready</div>
          </div>
          <div style={{ width: 120, height: 120, borderRadius: '50%', background: `${readiness.bg}`, border: `3px solid ${readiness.color}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ fontSize: 32, fontWeight: 800, color: readiness.color }}>{readinessScore}</div>
            <div style={{ fontSize: 11, color: C.muted }}>Readiness</div>
          </div>
          <div style={{ ...s.card(), width: '100%', textAlign: 'center' }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: workoutRecommendation.color, marginBottom: 8 }}>{workoutRecommendation.title}</div>
            <div style={{ fontSize: 13, color: C.muted }}>{workoutRecommendation.duration} · {workoutRecommendation.intensity} Intensity</div>
          </div>
          <button style={s.btn(`linear-gradient(135deg, ${C.primary}, ${C.accent})`)} onClick={() => { setActiveTab('home'); setShowResult(false); }}>
            View Today's Plan →
          </button>
        </div>
      );
    }

    return (
      <div style={{ padding: '20px' }}>
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <div style={{ fontSize: 13, color: C.muted, fontWeight: 500 }}>Step {checkinStep + 1} of {steps.length}</div>
            <div style={{ fontSize: 13, color: C.primary, fontWeight: 700 }}>{Math.round(progress)}%</div>
          </div>
          <div style={{ height: 4, background: C.border, borderRadius: 2 }}>
            <div style={{ height: 4, background: `linear-gradient(90deg, ${C.primary}, ${C.accent})`, borderRadius: 2, width: `${progress}%`, transition: 'width 0.4s ease' }} />
          </div>
        </div>

        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>{step.emoji}</div>
          <div style={{ fontSize: 11, color: C.primary, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 8 }}>{step.label}</div>
          <div style={{ fontSize: 20, fontWeight: 700, lineHeight: 1.3 }}>{step.question}</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
          {step.options.map((opt, i) => {
            const selected = checkin[step.key] === i + 1;
            return (
              <button key={opt} style={{
                ...s.btn(selected ? `${C.primary}20` : C.card),
                color: selected ? C.primary : C.text,
                border: `1px solid ${selected ? C.primary : C.border}`,
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '14px 18px', textAlign: 'left'
              }} onClick={() => setCheckin(prev => ({ ...prev, [step.key]: i + 1 }))}>
                <span>{opt}</span>
                {selected && <span style={{ color: C.primary }}>✓</span>}
              </button>
            );
          })}
        </div>

        <button
          disabled={!checkin[step.key]}
          style={{ ...s.btn(checkin[step.key] ? `linear-gradient(135deg, ${C.primary}, ${C.accent})` : C.card, checkin[step.key] ? '#000' : C.muted) }}
          onClick={() => {
            if (checkinStep < steps.length - 1) {
              setCheckinStep(s => s + 1);
            } else {
              setCheckinDone(true);
              setShowResult(true);
            }
          }}>
          {checkinStep < steps.length - 1 ? 'Continue →' : 'See My Plan'}
        </button>
      </div>
    );
  };

  // ── WORKOUT SCREEN ──
  const WorkoutScreen = () => {
    const workout = activeWorkout || workoutRecommendation;
    const exercises = workout.type === 'Recovery'
      ? [{ name: 'Hip Flexor Stretch', sets: '2 min', rest: '30s' }, { name: 'Thoracic Rotation', sets: '1 min each', rest: '15s' }, { name: 'Cat-Cow Flow', sets: '10 reps', rest: '30s' }, { name: 'Child\'s Pose', sets: '90 sec', rest: '' }]
      : workout.type === 'Maintenance'
      ? [{ name: 'Goblet Squats', sets: '3×10', rest: '60s' }, { name: 'Push-Up Variations', sets: '3×12', rest: '60s' }, { name: 'Dumbbell Row', sets: '3×10 ea.', rest: '60s' }, { name: 'Plank Hold', sets: '3×30s', rest: '45s' }]
      : [{ name: 'Dynamic Warm-Up', sets: '5 min', rest: '' }, { name: '400m Sprint', sets: '4× efforts', rest: '90s' }, { name: 'Tempo Intervals', sets: '3×3 min', rest: '2 min' }, { name: 'Cool-Down Jog', sets: '5 min', rest: '' }];

    return (
      <div style={{ padding: '8px 20px 20px' }}>
        <div style={{ ...s.card(), background: `linear-gradient(135deg, ${workout.color}20, ${C.card})`, border: `1px solid ${workout.color}30`, marginBottom: 16 }}>
          <div style={{ fontSize: 11, color: workout.color, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 6 }}>{workout.type} SESSION</div>
          <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>{workout.title}</div>
          <div style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
            {[['⏱', workout.duration], ['🔥', workout.intensity + ' Intensity'], [workout.icon, workout.type]].map(([icon, val]) => (
              <div key={val} style={{ background: C.bg, borderRadius: 8, padding: '5px 10px', fontSize: 11, color: C.muted, display: 'flex', alignItems: 'center', gap: 4 }}>
                <span>{icon}</span><span style={{ fontWeight: 600 }}>{val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Timer */}
        <div style={{ ...s.card(), textAlign: 'center', marginBottom: 16, background: timerActive ? `linear-gradient(135deg, ${C.primary}10, ${C.card})` : C.card }}>
          <div style={{ fontSize: 48, fontWeight: 800, fontFamily: 'monospace', color: timerActive ? C.primary : C.text, marginBottom: 12 }}>
            {fmtTime(timerSeconds)}
          </div>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
            <button style={{ ...s.btn(timerActive ? C.secondary : C.primary, '#000', { width: 'auto', padding: '10px 24px' }) }}
              onClick={() => setTimerActive(a => !a)}>
              {timerActive ? '⏸ Pause' : timerSeconds > 0 ? '▶ Resume' : '▶ Start'}
            </button>
            <button style={{ ...s.btn(C.card2, C.muted, { width: 'auto', padding: '10px 16px' }) }}
              onClick={() => { setTimerSeconds(0); setTimerActive(false); }}>
              ↺
            </button>
          </div>
        </div>

        {/* Exercise List */}
        <div style={{ fontSize: 12, color: C.muted, fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 10 }}>Exercises</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {exercises.map((ex, i) => (
            <div key={i} style={{ ...s.card(), display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 36, height: 36, borderRadius: 18, background: `${workout.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: workout.color, fontWeight: 700, fontSize: 14, flexShrink: 0 }}>{i + 1}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{ex.name}</div>
                <div style={{ fontSize: 12, color: C.muted }}>{ex.sets}{ex.rest ? ` · Rest ${ex.rest}` : ''}</div>
              </div>
              <div style={{ width: 28, height: 28, borderRadius: 14, border: `2px solid ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 14 }}>☐</div>
            </div>
          ))}
        </div>

        <button style={{ ...s.btn(`linear-gradient(135deg, ${C.primary}, ${C.accent})`, '#000', { marginTop: 16 }) }}
          onClick={() => setActiveTab('home')}>
          Complete Workout ✓
        </button>
      </div>
    );
  };

  // ── JOURNAL SCREEN ──
  const JournalScreen = () => {
    const entries = [
      { date: 'Today', signals: ['Tight shoulders', 'Good energy'], readiness: 72, note: 'Desk work yesterday likely caused shoulder tightness.' },
      { date: 'Yesterday', signals: ['Low sleep', 'Mild soreness'], readiness: 54, note: 'Poor recovery after Tuesday\'s hard session.' },
      { date: 'Wed Mar 18', signals: ['High energy', 'Refreshed'], readiness: 88, note: 'Best session of the week — PR on interval splits.' },
      { date: 'Tue Mar 17', signals: ['Moderate energy', 'Stiff legs'], readiness: 66, note: 'Stiffness from Monday. Switched to moderate session.' },
    ];

    const patterns = [
      { label: 'Poor sleep → next-day fatigue', frequency: '87%', icon: '🌙', color: '#6366F1' },
      { label: 'Desk days → shoulder tension', frequency: '73%', icon: '💻', color: '#FF6B35' },
      { label: '3+ days training → readiness drop', frequency: '91%', icon: '📉', color: '#EF4444' },
    ];

    return (
      <div style={{ padding: '8px 20px 20px' }}>
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Body Journal</div>
          <div style={{ fontSize: 13, color: C.muted }}>Patterns your body is teaching you</div>
        </div>

        {/* Patterns */}
        <div style={{ fontSize: 12, color: C.muted, fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 10 }}>Detected Patterns</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
          {patterns.map((p, i) => (
            <div key={i} style={{ ...s.card(), display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ fontSize: 24 }}>{p.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 2 }}>{p.label}</div>
                <div style={{ height: 4, background: C.border, borderRadius: 2, marginTop: 6 }}>
                  <div style={{ height: 4, background: p.color, borderRadius: 2, width: p.frequency }} />
                </div>
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, color: p.color }}>{p.frequency}</div>
            </div>
          ))}
        </div>

        {/* Weekly Readiness Chart */}
        <div style={{ fontSize: 12, color: C.muted, fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 10 }}>Readiness This Week</div>
        <div style={{ ...s.card(), marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 80, marginBottom: 8 }}>
            {[54, 88, 66, 72, 72, 0, 0].map((v, i) => {
              const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
              const isToday = i === 4;
              const color = v >= 80 ? C.primary : v >= 60 ? '#F59E0B' : v > 0 ? C.secondary : C.border;
              return (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                  <div style={{ width: '100%', borderRadius: '4px 4px 0 0', background: color, height: v ? `${(v / 100) * 70}px` : 4, opacity: v ? 1 : 0.3, transition: 'height 0.3s' }} />
                  <div style={{ fontSize: 10, color: isToday ? C.primary : C.muted, fontWeight: isToday ? 700 : 400 }}>{days[i]}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Daily Log */}
        <div style={{ fontSize: 12, color: C.muted, fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 10 }}>Daily Log</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {entries.map((e, i) => (
            <div key={i} style={{ ...s.card() }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <div style={{ fontSize: 13, fontWeight: 700 }}>{e.date}</div>
                <div style={{ ...s.pill(e.readiness >= 80 ? C.primary : e.readiness >= 60 ? '#F59E0B' : C.secondary, e.readiness >= 80 ? 'rgba(0,212,170,0.1)' : e.readiness >= 60 ? 'rgba(245,158,11,0.1)' : 'rgba(255,107,53,0.1)') }}>
                  {e.readiness}% Ready
                </div>
              </div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 8 }}>
                {e.signals.map(sig => (
                  <div key={sig} style={{ background: C.bg, borderRadius: 8, padding: '3px 10px', fontSize: 11, color: C.muted }}>{sig}</div>
                ))}
              </div>
              <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.5 }}>{e.note}</div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ── PROFILE SCREEN ──
  const ProfileScreen = () => {
    const [notifOn, setNotifOn] = useState(true);
    const [hrOn, setHrOn] = useState(false);

    const Toggle = ({ val, set }) => (
      <div onClick={() => set(v => !v)} style={{ width: 44, height: 24, borderRadius: 12, background: val ? C.primary : C.border, cursor: 'pointer', position: 'relative', transition: 'background 0.2s', flexShrink: 0 }}>
        <div style={{ position: 'absolute', top: 3, left: val ? 23 : 3, width: 18, height: 18, borderRadius: 9, background: '#fff', transition: 'left 0.2s', boxShadow: '0 1px 4px rgba(0,0,0,0.3)' }} />
      </div>
    );

    const stats = [{ label: 'Streak', value: '12 days', icon: '🔥' }, { label: 'Workouts', value: '41 total', icon: '🏋️' }, { label: 'Avg Ready', value: '71%', icon: '📊' }, { label: 'Rest Days', value: '8 this mo.', icon: '🌿' }];

    return (
      <div style={{ padding: '8px 20px 20px' }}>
        {/* Profile Header */}
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div style={{ width: 80, height: 80, borderRadius: 40, background: `linear-gradient(135deg, ${C.primary}, ${C.accent})`, margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32 }}>🧑</div>
          <div style={{ fontSize: 20, fontWeight: 700 }}>Alex Rivera</div>
          <div style={{ fontSize: 13, color: C.muted, marginBottom: 6 }}>Member since Jan 2026</div>
          <div style={{ ...s.pill(C.primary, 'rgba(0,212,170,0.1)') }}>Active Member</div>
        </div>

        {/* Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
          {stats.map(stat => (
            <div key={stat.label} style={{ ...s.card(), textAlign: 'center' }}>
              <div style={{ fontSize: 22, marginBottom: 4 }}>{stat.icon}</div>
              <div style={{ fontSize: 17, fontWeight: 700, color: C.primary }}>{stat.value}</div>
              <div style={{ fontSize: 11, color: C.muted }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Settings */}
        <div style={{ fontSize: 12, color: C.muted, fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 10 }}>Preferences</div>
        <div style={{ ...s.card(), marginBottom: 10 }}>
          {[
            ['Morning Check-in', 'Daily reminders at 7:00 AM', notifOn, setNotifOn],
            ['Heart Rate Sync', 'Connect Apple Watch / Garmin', hrOn, setHrOn],
          ].map(([title, sub, val, set]) => (
            <div key={title} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: title === 'Morning Check-in' ? `1px solid ${C.border}` : 'none' }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{title}</div>
                <div style={{ fontSize: 12, color: C.muted }}>{sub}</div>
              </div>
              <Toggle val={val} set={set} />
            </div>
          ))}
        </div>

        <div style={{ ...s.card() }}>
          {['Edit Profile', 'Fitness Goals', 'Notification Settings', 'Privacy & Data'].map((item, i, arr) => (
            <div key={item} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '13px 0', borderBottom: i < arr.length - 1 ? `1px solid ${C.border}` : 'none', cursor: 'pointer' }}>
              <div style={{ fontSize: 14, fontWeight: 500 }}>{item}</div>
              <div style={{ color: C.muted }}>›</div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <div style={{ fontSize: 12, color: C.muted }}>Pulse Path v1.0.0 · Built for your body</div>
        </div>
      </div>
    );
  };

  const tabs = [
    { id: 'home', label: 'Home', icon: '⌂' },
    { id: 'checkin', label: 'Check-in', icon: '✦' },
    { id: 'workout', label: 'Workout', icon: '▶' },
    { id: 'journal', label: 'Journal', icon: '◈' },
    { id: 'profile', label: 'Profile', icon: '◉' },
  ];

  const screens = { home: HomeScreen, checkin: CheckinScreen, workout: WorkoutScreen, journal: JournalScreen, profile: ProfileScreen };
  const ActiveScreen = screens[activeTab];

  return (
    <div style={s.wrap}>
      <div style={s.phone}>
        {/* Dynamic Island */}
        <div style={s.di} />

        {/* Status Bar */}
        <div style={s.statusBar}>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.text }}>9:41</div>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            <svg width={16} height={12} viewBox="0 0 16 12" fill={C.text}>
              <rect x={0} y={6} width={3} height={6} rx={1} opacity={0.4} />
              <rect x={4} y={4} width={3} height={8} rx={1} opacity={0.6} />
              <rect x={8} y={2} width={3} height={10} rx={1} opacity={0.8} />
              <rect x={12} y={0} width={3} height={12} rx={1} />
            </svg>
            <svg width={16} height={12} viewBox="0 0 20 14" fill={C.text}>
              <path d="M10 2C13 2 15.6 3.2 17.5 5.1L19 3.6C16.7 1.4 13.5 0 10 0S3.3 1.4 1 3.6l1.5 1.5C4.4 3.2 7 2 10 2z" opacity={0.4} />
              <path d="M10 6c1.9 0 3.6.8 4.8 2L16.3 6.5C14.7 4.9 12.5 4 10 4S5.3 4.9 3.7 6.5L5.2 8C6.4 6.8 8.1 6 10 6z" opacity={0.7} />
              <circle cx={10} cy={12} r={2} />
            </svg>
            <div style={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <div style={{ width: 22, height: 11, border: `1.5px solid ${C.text}`, borderRadius: 3, padding: 2, display: 'flex', gap: 1, alignItems: 'center' }}>
                <div style={{ width: 12, height: '100%', background: C.primary, borderRadius: 1 }} />
              </div>
              <div style={{ width: 3, height: 5, background: C.text, borderRadius: '0 1px 1px 0' }} />
            </div>
          </div>
        </div>

        {/* Screen Title */}
        <div style={{ padding: '0 20px 6px', flexShrink: 0 }}>
          <div style={{ fontSize: 13, color: C.primary, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' }}>
            {activeTab === 'home' ? '✦ PULSE PATH' : activeTab === 'checkin' ? '✦ MORNING CHECK-IN' : activeTab === 'workout' ? '✦ TODAY\'S WORKOUT' : activeTab === 'journal' ? '✦ BODY JOURNAL' : '✦ PROFILE'}
          </div>
        </div>

        {/* Scrollable Content */}
        <div style={s.scroll}>
          <ActiveScreen />
        </div>

        {/* Bottom Nav */}
        <div style={s.nav}>
          {tabs.map(tab => (
            <button key={tab.id} style={s.navBtn(activeTab === tab.id)} onClick={() => setActiveTab(tab.id)}>
              <div style={{ fontSize: 20, color: activeTab === tab.id ? C.primary : C.muted }}>{tab.icon}</div>
              <div style={s.navLabel(activeTab === tab.id)}>{tab.label}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
