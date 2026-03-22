const { useState, useEffect, useRef } = React;

// === THEMES ===
const themes = {
  dark: {
    bg: '#07091A',
    surface: '#0D1127',
    card: '#131829',
    cardAlt: '#192038',
    border: 'rgba(255,255,255,0.07)',
    text: '#ECF0FF',
    sub: '#8892AA',
    muted: '#3D4562',
    primary: '#7C5CFF',
    primaryAlpha: 'rgba(124,92,255,0.18)',
    green: '#0EEBA8',
    greenAlpha: 'rgba(14,235,168,0.15)',
    amber: '#FFB020',
    amberAlpha: 'rgba(255,176,32,0.15)',
    red: '#FF4757',
    redAlpha: 'rgba(255,71,87,0.15)',
    blue: '#3B9EFF',
    blueAlpha: 'rgba(59,158,255,0.15)',
  },
  light: {
    bg: '#EDF0F8',
    surface: '#FFFFFF',
    card: '#FFFFFF',
    cardAlt: '#F4F6FE',
    border: 'rgba(0,0,0,0.07)',
    text: '#0D1026',
    sub: '#5A6478',
    muted: '#BCC5D8',
    primary: '#6B4AFF',
    primaryAlpha: 'rgba(107,74,255,0.1)',
    green: '#00C080',
    greenAlpha: 'rgba(0,192,128,0.1)',
    amber: '#D4860A',
    amberAlpha: 'rgba(212,134,10,0.1)',
    red: '#E53535',
    redAlpha: 'rgba(229,53,53,0.1)',
    blue: '#2D87F0',
    blueAlpha: 'rgba(45,135,240,0.1)',
  },
};

// === DATA ===
const READINESS_SCORE = 68;

const QUICK_STATS = [
  { label: 'HRV', value: '52', unit: 'ms', icon: 'Activity', trend: '+4', positive: true },
  { label: 'Sleep', value: '6.2', unit: 'hrs', icon: 'Moon', trend: '-0.8', positive: false },
  { label: 'Resting HR', value: '58', unit: 'bpm', icon: 'Heart', trend: '-2', positive: true },
  { label: 'Stress', value: '42', unit: '/100', icon: 'Zap', trend: '+8', positive: false },
];

const TODAYS_WORKOUT = {
  originalPlan: 'Heavy Leg Day',
  adaptedPlan: 'Moderate Leg Session',
  reason: 'Sleep quality was below average last night. Workout intensity reduced to 70% to avoid overtraining.',
  duration: '45 min',
  intensity: '70%',
  exercises: [
    { name: 'Goblet Squat', sets: 3, reps: '12', weight: '24 kg', original: '4×8 @ 40 kg' },
    { name: 'Romanian Deadlift', sets: 3, reps: '10', weight: '30 kg', original: '4×6 @ 60 kg' },
    { name: 'Walking Lunges', sets: 2, reps: '16', weight: 'Bodyweight', original: '3×12 @ 20 kg' },
    { name: 'Leg Press', sets: 3, reps: '15', weight: '60 kg', original: '4×8 @ 120 kg' },
    { name: 'Standing Calf Raises', sets: 3, reps: '20', weight: '20 kg', original: '4×15 @ 40 kg' },
  ],
};

const RECOVERY_ITEMS = [
  { id: 1, title: '4-7-8 Breathing', duration: '5 min', type: 'Breathing', icon: 'Wind', benefit: 'Activates the parasympathetic nervous system and lowers cortisol. Ideal after a stressful workday.' },
  { id: 2, title: 'Hip Flexor Flow', duration: '8 min', type: 'Mobility', icon: 'Layers', benefit: 'Releases compression from prolonged sitting. Improves range of motion for lower-body training tomorrow.' },
  { id: 3, title: 'Foam Roll — Legs', duration: '6 min', type: 'Myofascial', icon: 'Circle', benefit: 'Increases blood flow to worked muscles. Reduces DOMS and speeds cellular repair.' },
  { id: 4, title: 'Cold Exposure Finish', duration: '3 min', type: 'Recovery', icon: 'Droplets', benefit: 'Reduces inflammation markers and has been shown to improve next-day HRV scores by up to 12%.' },
];

const WEEKLY_READINESS = [52, 68, 82, 74, 58, 65, 68];
const WEEKLY_HRV = [48, 55, 62, 52, 50, 49, 52];
const WEEK_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const SLEEP_DATA = [
  { day: 'Thu', hrs: 7.5, quality: 'Great' },
  { day: 'Fri', hrs: 5.9, quality: 'Poor' },
  { day: 'Sat', hrs: 7.4, quality: 'Good' },
  { day: 'Sun', hrs: 6.2, quality: 'Fair' },
];

// === ICON HELPER ===
const Icon = ({ name, size = 20, color = 'currentColor', strokeWidth = 1.8 }) => {
  const LucideIcon = window.lucide && window.lucide[name];
  if (!LucideIcon) return React.createElement('span', { style: { display: 'inline-block', width: size, height: size } });
  return React.createElement(LucideIcon, { size, color, strokeWidth });
};

// === READINESS RING ===
const ReadinessRing = ({ score, t }) => {
  const r = 64;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - score / 100);
  const ringColor = score >= 75 ? t.green : score >= 50 ? t.amber : t.red;
  const label = score >= 75 ? 'HIGH' : score >= 50 ? 'MODERATE' : 'LOW';
  return (
    <div style={{ position: 'relative', width: 174, height: 174, margin: '0 auto' }}>
      <svg width="174" height="174" viewBox="0 0 174 174">
        <circle cx="87" cy="87" r={r} fill="none" stroke={t.muted + '55'} strokeWidth="11" />
        <circle
          cx="87" cy="87" r={r} fill="none"
          stroke={ringColor} strokeWidth="11"
          strokeDasharray={circ} strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 87 87)"
          style={{ filter: `drop-shadow(0 0 10px ${ringColor}cc)`, transition: 'stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1)' }}
        />
      </svg>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
        <div style={{ fontSize: 36, fontWeight: 700, color: t.text, lineHeight: 1 }}>{score}</div>
        <div style={{ fontSize: 11, color: t.sub, letterSpacing: 1.5, marginTop: 3, textTransform: 'uppercase' }}>Readiness</div>
        <div style={{ marginTop: 8, fontSize: 11, fontWeight: 700, color: ringColor, background: `${ringColor}22`, padding: '3px 12px', borderRadius: 20, letterSpacing: 1 }}>
          {label}
        </div>
      </div>
    </div>
  );
};

// === STRAIN METER ===
const StrainMeter = ({ level, t }) => {
  const color = level < 40 ? t.green : level < 72 ? t.amber : t.red;
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
        <span style={{ fontSize: 13, color: t.sub, fontWeight: 500 }}>Live Strain</span>
        <span style={{ fontSize: 13, fontWeight: 700, color }}>{level}%</span>
      </div>
      <div style={{ height: 10, borderRadius: 10, background: t.muted + '33', overflow: 'hidden', position: 'relative' }}>
        <div style={{
          height: '100%', width: `${level}%`, borderRadius: 10,
          background: `linear-gradient(90deg, ${t.green}, ${color})`,
          boxShadow: `0 0 14px ${color}99`,
          transition: 'width 0.8s cubic-bezier(0.4,0,0.2,1)',
        }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 5 }}>
        {['Recovery', 'Aerobic', 'Threshold', 'Max'].map((z, i) => (
          <span key={i} style={{ fontSize: 10, color: t.muted }}>{z}</span>
        ))}
      </div>
    </div>
  );
};

// === LINE CHART ===
const LineChart = ({ data, labels, color, gradId, t }) => {
  const W = 295, H = 72;
  const max = Math.max(...data) + 5;
  const min = Math.min(...data) - 5;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * (W - 20) + 10;
    const y = (1 - (v - min) / (max - min)) * (H - 16) + 8;
    return [x, y];
  });
  const linePath = 'M ' + pts.map(p => p.join(',')).join(' L ');
  const areaPath = `M ${pts[0].join(',')} ${pts.map(p => 'L ' + p.join(',')).join(' ')} L ${pts[pts.length-1][0]},${H} L ${pts[0][0]},${H} Z`;
  return (
    <div>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ overflow: 'visible' }}>
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.28" />
            <stop offset="100%" stopColor={color} stopOpacity="0.01" />
          </linearGradient>
        </defs>
        <path d={areaPath} fill={`url(#${gradId})`} />
        <path d={linePath} fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        {pts.map(([x, y], i) => {
          const isLast = i === pts.length - 1;
          return (
            <g key={i}>
              {isLast && <circle cx={x} cy={y} r={8} fill={color} fillOpacity={0.18} />}
              <circle cx={x} cy={y} r={isLast ? 4.5 : 2.5} fill={isLast ? color : t.surface} stroke={color} strokeWidth={isLast ? 0 : 1.5} />
            </g>
          );
        })}
      </svg>
      <div style={{ display: 'flex', justifyContent: 'space-between', paddingLeft: 10, paddingRight: 10, marginTop: 4 }}>
        {labels.map((l, i) => (
          <span key={i} style={{ fontSize: 10.5, color: i === labels.length - 1 ? color : t.muted, fontWeight: i === labels.length - 1 ? 600 : 400 }}>{l}</span>
        ))}
      </div>
    </div>
  );
};

// === HOME SCREEN ===
function HomeScreen({ t }) {
  const statColors = (i) => [t.blue, t.primary, t.green, t.amber][i];
  return (
    <div style={{ height: '100%', overflowY: 'auto' }}>
      {/* Header */}
      <div style={{ padding: '12px 20px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: 13, color: t.sub }}>Good morning</div>
          <div style={{ fontSize: 21, fontWeight: 700, color: t.text, marginTop: 1 }}>Alex Chen</div>
        </div>
        <div style={{ width: 38, height: 38, borderRadius: '50%', background: `linear-gradient(135deg, ${t.primary}, ${t.blue})`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: `0 4px 14px ${t.primary}55` }}>
          <Icon name="Bell" size={17} color="#fff" strokeWidth={2} />
        </div>
      </div>

      {/* Readiness Card */}
      <div style={{ margin: '14px 18px', background: t.card, borderRadius: 26, padding: '22px 18px', border: `1px solid ${t.border}`, boxShadow: '0 4px 24px rgba(0,0,0,0.12)' }}>
        <div style={{ textAlign: 'center', fontSize: 12, color: t.sub, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 12 }}>Sunday · March 22</div>
        <ReadinessRing score={READINESS_SCORE} t={t} />
        <div style={{ marginTop: 16, padding: '12px 14px', background: t.amberAlpha, borderRadius: 14, borderLeft: `3px solid ${t.amber}` }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: t.amber, marginBottom: 4 }}>Today's Recommendation</div>
          <div style={{ fontSize: 12.5, color: t.sub, lineHeight: 1.55 }}>
            Your body is in recovery. Consider a <strong style={{ color: t.text }}>moderate session</strong> — reduce intensity by 30% and prioritize movement quality over load.
          </div>
        </div>
      </div>

      {/* Body Signals */}
      <div style={{ padding: '0 18px', marginBottom: 14 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: t.text, marginBottom: 10 }}>Body Signals</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {QUICK_STATS.map((stat, i) => {
            const c = statColors(i);
            const trendGood = (stat.label === 'Stress' || stat.label === 'Resting HR') ? !stat.positive : stat.positive;
            return (
              <div key={i} style={{ background: t.card, borderRadius: 18, padding: '14px 14px', border: `1px solid ${t.border}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ width: 30, height: 30, borderRadius: 9, background: `${c}22`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon name={stat.icon} size={15} color={c} />
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 600, color: trendGood ? t.green : t.red, background: trendGood ? t.greenAlpha : t.redAlpha, padding: '2px 7px', borderRadius: 8 }}>
                    {stat.trend}
                  </span>
                </div>
                <div style={{ marginTop: 10, fontSize: 22, fontWeight: 700, color: t.text, lineHeight: 1 }}>
                  {stat.value}<span style={{ fontSize: 12, fontWeight: 400, color: t.sub, marginLeft: 2 }}>{stat.unit}</span>
                </div>
                <div style={{ fontSize: 11.5, color: t.sub, marginTop: 3 }}>{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Today's Plan Preview */}
      <div style={{ padding: '0 18px 24px' }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: t.text, marginBottom: 10 }}>Today's Plan</div>
        <div style={{ background: `linear-gradient(135deg, ${t.primary}22, ${t.primary}08)`, border: `1px solid ${t.primary}44`, borderRadius: 20, padding: '16px 16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: 11, color: t.primary, fontWeight: 700, letterSpacing: 0.8, textTransform: 'uppercase' }}>Adapted Workout</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: t.text, marginTop: 4 }}>{TODAYS_WORKOUT.adaptedPlan}</div>
              <div style={{ fontSize: 12, color: t.sub, marginTop: 2 }}>{TODAYS_WORKOUT.exercises.length} exercises · {TODAYS_WORKOUT.duration}</div>
            </div>
            <div style={{ width: 42, height: 42, borderRadius: 14, background: t.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 6px 18px ${t.primary}66`, cursor: 'pointer', flexShrink: 0 }}>
              <Icon name="Play" size={18} color="#fff" strokeWidth={2.5} />
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 11, color: t.amber, background: t.amberAlpha, padding: '3px 10px', borderRadius: 8, fontWeight: 600 }}>70% Intensity</span>
            <span style={{ fontSize: 11, color: t.sub, background: t.primaryAlpha, padding: '3px 10px', borderRadius: 8 }}>↓ from: {TODAYS_WORKOUT.originalPlan}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// === WORKOUT SCREEN ===
function WorkoutScreen({ t }) {
  const [strain, setStrain] = useState(28);
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState([]);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (started) {
      intervalRef.current = setInterval(() => setStrain(p => Math.min(p + 0.4, 96)), 400);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [started]);

  const toggle = (i) => setDone(p => p.includes(i) ? p.filter(x => x !== i) : [...p, i]);

  return (
    <div style={{ height: '100%', overflowY: 'auto' }}>
      {/* Header */}
      <div style={{ padding: '12px 18px 10px' }}>
        <div style={{ fontSize: 13, color: t.sub }}>Sunday · March 22</div>
        <div style={{ fontSize: 20, fontWeight: 700, color: t.text, marginTop: 2 }}>{TODAYS_WORKOUT.adaptedPlan}</div>
        <div style={{ marginTop: 10, padding: '10px 13px', background: t.amberAlpha, borderRadius: 12, display: 'flex', gap: 9, alignItems: 'flex-start', border: `1px solid ${t.amber}33` }}>
          <Icon name="Info" size={15} color={t.amber} />
          <div style={{ fontSize: 12, color: t.sub, lineHeight: 1.55 }}>{TODAYS_WORKOUT.reason}</div>
        </div>
      </div>

      {/* Strain Meter Card */}
      <div style={{ margin: '4px 18px 12px', background: t.card, borderRadius: 20, padding: '16px 16px', border: `1px solid ${t.border}` }}>
        <StrainMeter level={Math.round(strain)} t={t} />
        {strain > 72 && (
          <div style={{ marginTop: 11, padding: '8px 12px', background: t.redAlpha, borderRadius: 10, display: 'flex', gap: 8, alignItems: 'center', border: `1px solid ${t.red}33` }}>
            <Icon name="AlertTriangle" size={14} color={t.red} />
            <span style={{ fontSize: 12, color: t.red, fontWeight: 500 }}>High strain — your body is approaching its limit</span>
          </div>
        )}
      </div>

      {/* Exercise List */}
      <div style={{ padding: '0 18px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: t.text }}>Exercises</div>
          <div style={{ fontSize: 12, color: t.sub }}>{done.length}/{TODAYS_WORKOUT.exercises.length} complete</div>
        </div>
        {TODAYS_WORKOUT.exercises.map((ex, i) => {
          const isDone = done.includes(i);
          return (
            <div key={i} onClick={() => toggle(i)} style={{
              background: isDone ? t.greenAlpha : t.card,
              borderRadius: 16, padding: '13px 14px', marginBottom: 8,
              border: `1px solid ${isDone ? t.green + '55' : t.border}`,
              cursor: 'pointer', transition: 'all 0.2s ease',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', flex: 1 }}>
                  <div style={{ width: 22, height: 22, borderRadius: 7, background: isDone ? t.green : t.primaryAlpha, border: `1.5px solid ${isDone ? t.green : t.primary}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                    {isDone && <Icon name="Check" size={12} color="#fff" strokeWidth={3} />}
                  </div>
                  <div>
                    <div style={{ fontSize: 13.5, fontWeight: 600, color: isDone ? t.sub : t.text, textDecoration: isDone ? 'line-through' : 'none' }}>{ex.name}</div>
                    <div style={{ fontSize: 12, color: t.text, marginTop: 3, fontWeight: 500 }}>
                      {ex.sets} sets × {ex.reps} <span style={{ color: t.sub, fontWeight: 400 }}>@ {ex.weight}</span>
                    </div>
                  </div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ fontSize: 10, color: t.muted }}>was:</div>
                  <div style={{ fontSize: 11, color: t.muted, textDecoration: 'line-through' }}>{ex.original}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Start/End Button */}
      <div style={{ padding: '14px 18px 24px' }}>
        <button onClick={() => setStarted(p => !p)} style={{
          width: '100%', padding: '15px', borderRadius: 16, border: 'none',
          background: started ? t.red : `linear-gradient(135deg, ${t.primary} 0%, ${t.blue} 100%)`,
          color: '#fff', fontSize: 15, fontWeight: 700, cursor: 'pointer',
          boxShadow: `0 6px 22px ${started ? t.red : t.primary}55`,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          transition: 'all 0.2s ease', fontFamily: "'Space Grotesk', sans-serif",
        }}>
          <Icon name={started ? 'Square' : 'Play'} size={17} color="#fff" strokeWidth={2.5} />
          {started ? 'End Session' : 'Begin Workout'}
        </button>
      </div>
    </div>
  );
}

// === RECOVERY SCREEN ===
function RecoveryScreen({ t }) {
  const [expanded, setExpanded] = useState(null);
  const [completed, setCompleted] = useState([]);
  const typeColor = { Breathing: t.blue, Mobility: t.green, Myofascial: t.primary, Recovery: t.amber };

  return (
    <div style={{ height: '100%', overflowY: 'auto' }}>
      {/* Header */}
      <div style={{ padding: '12px 18px 10px' }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: t.text }}>Recovery</div>
        <div style={{ fontSize: 13, color: t.sub, marginTop: 2 }}>Micro-prescriptions for today</div>
      </div>

      {/* Recovery Score */}
      <div style={{ margin: '4px 18px 14px', background: t.card, borderRadius: 22, padding: '18px 16px', border: `1px solid ${t.border}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontSize: 12, color: t.sub, marginBottom: 4 }}>Recovery Score</div>
            <div style={{ fontSize: 34, fontWeight: 700, color: t.text, lineHeight: 1 }}>68<span style={{ fontSize: 16, color: t.sub, fontWeight: 400 }}>/100</span></div>
            <div style={{ fontSize: 12, color: t.amber, fontWeight: 600, marginTop: 5 }}>Needs attention today</div>
          </div>
          <div>
            <div style={{ fontSize: 11, color: t.sub, marginBottom: 7, textAlign: 'right' }}>Daily goal</div>
            <div style={{ display: 'flex', gap: 6 }}>
              {RECOVERY_ITEMS.map((_, i) => {
                const done = completed.length > i;
                return (
                  <div key={i} style={{ width: 26, height: 26, borderRadius: 8, background: done ? t.green : t.card, border: `1.5px solid ${done ? t.green : t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {done && <Icon name="Check" size={13} color="#fff" strokeWidth={2.5} />}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div style={{ marginTop: 14 }}>
          <div style={{ height: 6, borderRadius: 6, background: t.muted + '44', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${(completed.length / RECOVERY_ITEMS.length) * 100}%`, background: t.green, borderRadius: 6, boxShadow: `0 0 10px ${t.green}88`, transition: 'width 0.4s ease' }} />
          </div>
          <div style={{ fontSize: 11, color: t.sub, marginTop: 5 }}>{completed.length} of {RECOVERY_ITEMS.length} completed</div>
        </div>
      </div>

      {/* Prescriptions */}
      <div style={{ padding: '0 18px 24px' }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: t.text, marginBottom: 10 }}>Prescriptions</div>
        {RECOVERY_ITEMS.map((item) => {
          const isDone = completed.includes(item.id);
          const isOpen = expanded === item.id;
          const c = typeColor[item.type];
          return (
            <div key={item.id} style={{ background: isDone ? t.greenAlpha : t.card, borderRadius: 20, padding: '14px 14px', marginBottom: 10, border: `1px solid ${isDone ? t.green + '44' : isOpen ? t.primary + '44' : t.border}`, cursor: 'pointer' }}
              onClick={() => setExpanded(isOpen ? null : item.id)}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', gap: 11, alignItems: 'flex-start', flex: 1 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 12, background: `${c}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon name={item.icon} size={19} color={c} />
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: t.text }}>{item.title}</div>
                    <div style={{ display: 'flex', gap: 7, marginTop: 5 }}>
                      <span style={{ fontSize: 11, color: c, background: `${c}18`, padding: '2px 8px', borderRadius: 7, fontWeight: 600 }}>{item.type}</span>
                      <span style={{ fontSize: 11, color: t.sub }}>{item.duration}</span>
                    </div>
                  </div>
                </div>
                <button onClick={(e) => { e.stopPropagation(); setCompleted(p => isDone ? p.filter(x => x !== item.id) : [...p, item.id]); }} style={{
                  width: 30, height: 30, borderRadius: 9, background: isDone ? t.green : 'transparent',
                  border: `1.5px solid ${isDone ? t.green : t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0,
                }}>
                  {isDone && <Icon name="Check" size={14} color="#fff" strokeWidth={2.5} />}
                </button>
              </div>
              {isOpen && (
                <div style={{ marginTop: 12, paddingTop: 12, borderTop: `1px solid ${t.border}` }}>
                  <div style={{ fontSize: 12.5, color: t.sub, lineHeight: 1.6 }}>{item.benefit}</div>
                  <button style={{ marginTop: 11, width: '100%', padding: '10px', borderRadius: 12, background: c, border: 'none', color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: "'Space Grotesk', sans-serif" }}>
                    Begin {item.duration} Session
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// === INSIGHTS SCREEN ===
function InsightsScreen({ t }) {
  const qualityColor = (q) => ({ Great: t.green, Good: t.blue, Fair: t.amber, Poor: t.red }[q] || t.sub);
  return (
    <div style={{ height: '100%', overflowY: 'auto' }}>
      {/* Header */}
      <div style={{ padding: '12px 18px 8px' }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: t.text }}>Insights</div>
        <div style={{ fontSize: 13, color: t.sub, marginTop: 2 }}>7-day performance overview</div>
      </div>

      {/* Readiness Trend */}
      <div style={{ margin: '8px 18px', background: t.card, borderRadius: 22, padding: '16px 16px 14px', border: `1px solid ${t.border}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: t.text }}>Readiness Trend</div>
            <div style={{ fontSize: 12, color: t.sub, marginTop: 2 }}>7-day rolling</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 24, fontWeight: 700, color: t.text }}>68</div>
            <div style={{ fontSize: 11, color: t.amber }}>▼ 3 pts vs. yesterday</div>
          </div>
        </div>
        <LineChart data={WEEKLY_READINESS} labels={WEEK_LABELS} color={t.primary} gradId="readGrad" t={t} />
      </div>

      {/* HRV Trend */}
      <div style={{ margin: '10px 18px', background: t.card, borderRadius: 22, padding: '16px 16px 14px', border: `1px solid ${t.border}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: t.text }}>Heart Rate Variability</div>
            <div style={{ fontSize: 12, color: t.sub, marginTop: 2 }}>ms — higher is better</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 24, fontWeight: 700, color: t.blue }}>52<span style={{ fontSize: 13, color: t.sub }}> ms</span></div>
            <div style={{ fontSize: 11, color: t.green }}>▲ 4 above avg</div>
          </div>
        </div>
        <LineChart data={WEEKLY_HRV} labels={WEEK_LABELS} color={t.blue} gradId="hrvGrad" t={t} />
      </div>

      {/* Sleep Quality */}
      <div style={{ padding: '0 18px 10px' }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: t.text, marginBottom: 10 }}>Sleep Quality</div>
        <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
          {SLEEP_DATA.map((s, i) => {
            const c = qualityColor(s.quality);
            return (
              <div key={i} style={{ flex: 1, background: t.card, borderRadius: 16, padding: '12px 10px', border: `1px solid ${t.border}`, textAlign: 'center' }}>
                <div style={{ fontSize: 11, color: t.sub }}>{s.day}</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: t.text, margin: '6px 0 2px' }}>{s.hrs}</div>
                <div style={{ fontSize: 10, color: c, fontWeight: 600 }}>{s.quality}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* AI Insight */}
      <div style={{ padding: '0 18px 24px' }}>
        <div style={{ background: `linear-gradient(135deg, ${t.primary}1A, ${t.primary}08)`, border: `1px solid ${t.primary}33`, borderRadius: 20, padding: '16px 15px' }}>
          <div style={{ display: 'flex', gap: 11 }}>
            <div style={{ width: 34, height: 34, borderRadius: 11, background: t.primaryAlpha, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Icon name="Sparkles" size={17} color={t.primary} />
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: t.primary }}>PulsePair Intelligence</div>
              <div style={{ fontSize: 12.5, color: t.sub, marginTop: 6, lineHeight: 1.65 }}>
                Your HRV dropped <strong style={{ color: t.text }}>14% this week</strong> while training load stayed constant. Your body is accumulating fatigue. Consider scheduling a full rest day within the next 48 hours to prevent overtraining.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// === SETTINGS SCREEN ===
function SettingsScreen({ t, theme, setTheme }) {
  const devices = [
    { name: 'Apple Watch Series 9', status: 'Connected', icon: 'Clock' },
    { name: 'Oura Ring Gen 3', status: 'Connected', icon: 'Circle' },
  ];
  const prefs = ['Workout Goals', 'Notification Settings', 'Connected Apps', 'Data & Privacy', 'Help & Support'];

  return (
    <div style={{ height: '100%', overflowY: 'auto' }}>
      <div style={{ padding: '12px 18px 8px' }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: t.text }}>Profile</div>
      </div>

      {/* Profile Card */}
      <div style={{ margin: '8px 18px 14px', background: t.card, borderRadius: 22, padding: '18px 16px', border: `1px solid ${t.border}`, display: 'flex', gap: 14, alignItems: 'center' }}>
        <div style={{ width: 52, height: 52, borderRadius: '50%', background: `linear-gradient(135deg, ${t.primary}, ${t.blue})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 700, color: '#fff', flexShrink: 0, boxShadow: `0 4px 14px ${t.primary}55` }}>A</div>
        <div>
          <div style={{ fontSize: 17, fontWeight: 700, color: t.text }}>Alex Chen</div>
          <div style={{ fontSize: 12.5, color: t.sub, marginTop: 2 }}>Intermediate · Running + Strength</div>
          <div style={{ fontSize: 12, color: t.primary, marginTop: 4, fontWeight: 500 }}>147 days with PulsePair</div>
        </div>
      </div>

      {/* Appearance */}
      <div style={{ padding: '0 18px', marginBottom: 12 }}>
        <div style={{ fontSize: 11, color: t.sub, marginBottom: 8, fontWeight: 600, letterSpacing: 0.8, textTransform: 'uppercase' }}>Appearance</div>
        <div style={{ background: t.card, borderRadius: 18, border: `1px solid ${t.border}`, overflow: 'hidden' }}>
          <div style={{ padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: 11, alignItems: 'center' }}>
              <div style={{ width: 34, height: 34, borderRadius: 10, background: t.primaryAlpha, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name={theme === 'dark' ? 'Moon' : 'Sun'} size={17} color={t.primary} />
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 500, color: t.text }}>{theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</div>
                <div style={{ fontSize: 12, color: t.sub }}>Tap to switch theme</div>
              </div>
            </div>
            <div onClick={() => setTheme(p => p === 'dark' ? 'light' : 'dark')} style={{ width: 48, height: 27, borderRadius: 14, background: theme === 'dark' ? t.primary : t.muted + '88', position: 'relative', cursor: 'pointer', transition: 'background 0.3s ease', flexShrink: 0 }}>
              <div style={{ position: 'absolute', top: 3, left: theme === 'dark' ? 24 : 3, width: 21, height: 21, borderRadius: '50%', background: '#fff', transition: 'left 0.3s cubic-bezier(0.4,0,0.2,1)', boxShadow: '0 2px 6px rgba(0,0,0,0.3)' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Devices */}
      <div style={{ padding: '0 18px', marginBottom: 12 }}>
        <div style={{ fontSize: 11, color: t.sub, marginBottom: 8, fontWeight: 600, letterSpacing: 0.8, textTransform: 'uppercase' }}>Connected Devices</div>
        <div style={{ background: t.card, borderRadius: 18, border: `1px solid ${t.border}`, overflow: 'hidden' }}>
          {devices.map((d, i) => (
            <div key={i} style={{ padding: '13px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: i < devices.length - 1 ? `1px solid ${t.border}` : 'none' }}>
              <div style={{ display: 'flex', gap: 11, alignItems: 'center' }}>
                <div style={{ width: 34, height: 34, borderRadius: 10, background: t.greenAlpha, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon name={d.icon} size={17} color={t.green} />
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500, color: t.text }}>{d.name}</div>
                  <div style={{ fontSize: 11, color: t.green }}>{d.status}</div>
                </div>
              </div>
              <Icon name="ChevronRight" size={16} color={t.muted} />
            </div>
          ))}
        </div>
      </div>

      {/* Preferences */}
      <div style={{ padding: '0 18px 24px' }}>
        <div style={{ fontSize: 11, color: t.sub, marginBottom: 8, fontWeight: 600, letterSpacing: 0.8, textTransform: 'uppercase' }}>Preferences</div>
        <div style={{ background: t.card, borderRadius: 18, border: `1px solid ${t.border}`, overflow: 'hidden' }}>
          {prefs.map((item, i) => (
            <div key={i} style={{ padding: '13px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: i < prefs.length - 1 ? `1px solid ${t.border}` : 'none', cursor: 'pointer' }}>
              <span style={{ fontSize: 13.5, color: t.text }}>{item}</span>
              <Icon name="ChevronRight" size={15} color={t.muted} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// === MAIN APP ===
function App() {
  const [theme, setTheme] = useState('dark');
  const [activeTab, setActiveTab] = useState('home');
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const iv = setInterval(() => setTime(new Date()), 30000);
    return () => clearInterval(iv);
  }, []);

  const t = themes[theme];
  const timeStr = time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });

  const tabs = [
    { id: 'home', label: 'Home', icon: 'Home' },
    { id: 'workout', label: 'Workout', icon: 'Dumbbell' },
    { id: 'recovery', label: 'Recovery', icon: 'Wind' },
    { id: 'insights', label: 'Insights', icon: 'TrendingUp' },
    { id: 'profile', label: 'Profile', icon: 'User' },
  ];

  const renderScreen = () => {
    switch (activeTab) {
      case 'home': return React.createElement(HomeScreen, { t });
      case 'workout': return React.createElement(WorkoutScreen, { t });
      case 'recovery': return React.createElement(RecoveryScreen, { t });
      case 'insights': return React.createElement(InsightsScreen, { t });
      case 'profile': return React.createElement(SettingsScreen, { t, theme, setTheme });
      default: return React.createElement(HomeScreen, { t });
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: theme === 'dark' ? '#0A0C1B' : '#CBD5E8', fontFamily: "'Space Grotesk', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { display: none; }
        button, input { font-family: 'Space Grotesk', sans-serif; }
      `}</style>

      {/* Phone Frame */}
      <div style={{
        width: 375, height: 812, borderRadius: 50,
        background: t.bg, overflow: 'hidden', position: 'relative',
        boxShadow: theme === 'dark'
          ? '0 32px 80px rgba(0,0,0,0.7), 0 0 0 1.5px rgba(255,255,255,0.09), inset 0 1px 0 rgba(255,255,255,0.04)'
          : '0 32px 80px rgba(0,0,0,0.28), 0 0 0 1.5px rgba(0,0,0,0.1)',
        display: 'flex', flexDirection: 'column',
      }}>
        {/* Dynamic Island */}
        <div style={{ position: 'absolute', top: 13, left: '50%', transform: 'translateX(-50%)', width: 118, height: 33, borderRadius: 20, background: '#000', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#111', border: '1px solid #2a2a2a' }} />
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#1c1c1c' }} />
        </div>

        {/* Status Bar */}
        <div style={{ height: 52, paddingTop: 16, paddingLeft: 28, paddingRight: 22, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexShrink: 0 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: t.text }}>{timeStr}</span>
          <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
            <Icon name="Wifi" size={14} color={t.sub} strokeWidth={2} />
            <Icon name="Battery" size={16} color={t.sub} strokeWidth={2} />
          </div>
        </div>

        {/* Screen Content */}
        <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
          {renderScreen()}
        </div>

        {/* Bottom Nav */}
        <div style={{ height: 80, background: t.surface, borderTop: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-around', paddingBottom: 14, flexShrink: 0 }}>
          {tabs.map(tab => {
            const active = activeTab === tab.id;
            return (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
                background: 'none', border: 'none', cursor: 'pointer', padding: '6px 10px', borderRadius: 12,
              }}>
                <div style={{ width: 38, height: 32, borderRadius: 11, background: active ? t.primaryAlpha : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s ease' }}>
                  <Icon name={tab.icon} size={20} color={active ? t.primary : t.muted} strokeWidth={active ? 2.2 : 1.8} />
                </div>
                <span style={{ fontSize: 10.5, color: active ? t.primary : t.muted, fontWeight: active ? 700 : 400, transition: 'color 0.2s' }}>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
