const { useState, useEffect, useRef } = React;

const { Home, Shield, BarChart2, User, Zap, Heart, Moon, Droplets, Calendar, ChevronRight, Bell, Lock, RefreshCw, Play, Pause, RotateCcw, TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Clock, Wifi, Battery } = window.lucide;

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [mood, setMood] = useState(null);
  const [timerSec, setTimerSec] = useState(420);
  const [timerRunning, setTimerRunning] = useState(false);
  const [exerciseStep, setExerciseStep] = useState(0);
  const [notifEnabled, setNotifEnabled] = useState(true);
  const [calSync, setCalSync] = useState(true);
  const [sleepTrack, setSleepTrack] = useState(false);
  const [alertDismissed, setAlertDismissed] = useState(false);
  const [pressedTab, setPressedTab] = useState(null);

  const c = {
    bg: '#080B12',
    card: '#0E1118',
    cardAlt: '#131820',
    border: '#1C2336',
    borderLight: '#222840',
    primary: '#5DDFB4',
    primaryDim: 'rgba(93,223,180,0.12)',
    primaryGlow: 'rgba(93,223,180,0.25)',
    amber: '#F59E0B',
    amberDim: 'rgba(245,158,11,0.12)',
    red: '#F06060',
    redDim: 'rgba(240,96,96,0.12)',
    purple: '#A78BFA',
    purpleDim: 'rgba(167,139,250,0.12)',
    blue: '#60A5FA',
    text: '#F1F5F9',
    sub: '#8896AA',
    muted: '#3D4A5C',
  };

  useEffect(() => {
    let iv;
    if (timerRunning && timerSec > 0) {
      iv = setInterval(() => setTimerSec(s => s - 1), 1000);
    } else if (timerSec === 0) {
      setTimerRunning(false);
    }
    return () => clearInterval(iv);
  }, [timerRunning, timerSec]);

  const fmt = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

  const strainVal = 67;
  const recoveryScore = 72;

  // ─── SHARED UI ATOMS ───────────────────────────────────────────────────────

  const Pill = ({ label, color }) => (
    <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.8, color, background: color + '22', padding: '3px 9px', borderRadius: 20, textTransform: 'uppercase' }}>{label}</span>
  );

  const Card = ({ children, glow, style = {} }) => (
    <div style={{
      background: glow ? `linear-gradient(145deg, ${glow}, ${c.card})` : c.card,
      borderRadius: 20,
      border: `1px solid ${glow ? glow.replace('0.12', '0.35') : c.border}`,
      padding: '16px',
      marginBottom: 12,
      ...style,
    }}>{children}</div>
  );

  const SectionLabel = ({ children }) => (
    <p style={{ color: c.sub, fontSize: 11, fontWeight: 700, letterSpacing: 1.2, margin: '8px 0 10px', textTransform: 'uppercase' }}>{children}</p>
  );

  const Toggle = ({ on, onToggle }) => (
    <div onClick={onToggle} style={{
      width: 44, height: 26, borderRadius: 13,
      background: on ? c.primary : c.muted,
      padding: 3, display: 'flex',
      justifyContent: on ? 'flex-end' : 'flex-start',
      cursor: 'pointer', transition: 'background 0.25s',
      flexShrink: 0,
    }}>
      <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.4)', transition: 'all 0.25s' }} />
    </div>
  );

  // ─── STRAIN GAUGE SVG ──────────────────────────────────────────────────────

  const StrainGauge = ({ value }) => {
    const r = 76;
    const circ = 2 * Math.PI * r;
    const arcFrac = 0.75;
    const arc = circ * arcFrac;
    const gap = circ * (1 - arcFrac);
    const filled = arc * (value / 100);
    const barColor = value < 45 ? c.primary : value < 72 ? c.amber : c.red;
    const label = value < 45 ? 'Low' : value < 72 ? 'Moderate' : 'High';
    return (
      <svg width="200" height="200" viewBox="0 0 200 200" style={{ display: 'block', margin: '0 auto' }}>
        <defs>
          <filter id="glow"><feGaussianBlur stdDeviation="3" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        </defs>
        {/* Track */}
        <circle cx="100" cy="100" r={r} fill="none" stroke={c.border} strokeWidth="12"
          strokeDasharray={`${arc} ${gap}`}
          strokeDashoffset={-(gap / 2)}
          strokeLinecap="round"
        />
        {/* Fill */}
        <circle cx="100" cy="100" r={r} fill="none" stroke={barColor} strokeWidth="12"
          strokeDasharray={`${filled} ${circ - filled}`}
          strokeDashoffset={-(gap / 2)}
          strokeLinecap="round"
          style={{ filter: `drop-shadow(0 0 6px ${barColor})`, transition: 'stroke-dasharray 1.2s ease' }}
        />
        {/* Value */}
        <text x="100" y="92" textAnchor="middle" fill={c.text} fontSize="40" fontWeight="800" fontFamily="Inter, sans-serif">{value}</text>
        <text x="100" y="112" textAnchor="middle" fill={c.sub} fontSize="11" fontFamily="Inter, sans-serif" letterSpacing="2">STRAIN</text>
        <text x="100" y="134" textAnchor="middle" fill={barColor} fontSize="13" fontWeight="700" fontFamily="Inter, sans-serif">{label}</text>
      </svg>
    );
  };

  // ─── HOME SCREEN ───────────────────────────────────────────────────────────

  const renderHome = () => (
    <div style={{ flex: 1, overflowY: 'auto', padding: '4px 16px 90px' }}>

      <div style={{ paddingTop: 8, marginBottom: 18 }}>
        <p style={{ color: c.sub, fontSize: 12, margin: 0 }}>Friday, March 20</p>
        <h2 style={{ color: c.text, fontSize: 22, fontWeight: 700, margin: '3px 0 0', lineHeight: 1.2 }}>Good morning, Alex 👋</h2>
      </div>

      {/* Strain Gauge Card */}
      <Card>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
          <span style={{ color: c.text, fontSize: 14, fontWeight: 600 }}>Body Strain</span>
          <span style={{ color: c.muted, fontSize: 11 }}>Updated 8m ago</span>
        </div>
        <StrainGauge value={strainVal} />
        {/* Stats Row */}
        <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
          {[
            { label: 'HRV', val: '42', unit: 'ms', color: c.primary },
            { label: 'Sleep', val: '5.8', unit: 'hrs', color: c.amber },
            { label: 'Resting HR', val: '68', unit: 'bpm', color: c.text },
          ].map((s, i) => (
            <div key={i} style={{ flex: 1, background: c.cardAlt, borderRadius: 14, padding: '10px 10px 8px', border: `1px solid ${c.border}` }}>
              <p style={{ color: c.sub, fontSize: 10, margin: '0 0 4px', fontWeight: 600 }}>{s.label}</p>
              <p style={{ color: s.color, fontSize: 18, fontWeight: 800, margin: 0 }}>{s.val}<span style={{ fontSize: 10, color: c.sub, fontWeight: 400 }}> {s.unit}</span></p>
            </div>
          ))}
        </div>
      </Card>

      {/* Mood Check-in */}
      {!mood ? (
        <Card>
          <p style={{ color: c.text, fontSize: 14, fontWeight: 600, margin: '0 0 12px' }}>How are you feeling right now?</p>
          <div style={{ display: 'flex', gap: 6 }}>
            {[['😴', 'Tired'], ['😤', 'Stressed'], ['😐', 'Okay'], ['😊', 'Good'], ['⚡', 'Charged']].map(([em, lbl]) => (
              <button key={lbl} onClick={() => setMood(lbl)} style={{
                flex: 1, background: c.cardAlt, border: `1px solid ${c.border}`, borderRadius: 14,
                padding: '10px 2px', cursor: 'pointer', display: 'flex', flexDirection: 'column',
                alignItems: 'center', gap: 5, transition: 'all 0.15s',
              }}>
                <span style={{ fontSize: 20 }}>{em}</span>
                <span style={{ color: c.sub, fontSize: 9, fontWeight: 600 }}>{lbl}</span>
              </button>
            ))}
          </div>
        </Card>
      ) : (
        <div style={{
          background: c.primaryDim, borderRadius: 16,
          border: `1px solid ${c.primary}44`, padding: '12px 14px',
          marginBottom: 12, display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <CheckCircle size={18} color={c.primary} />
          <div>
            <p style={{ color: c.primary, fontSize: 13, fontWeight: 600, margin: 0 }}>Check-in recorded — {mood}</p>
            <p style={{ color: c.sub, fontSize: 11, margin: '2px 0 0' }}>Logged at 9:14 AM · synced to strain model</p>
          </div>
        </div>
      )}

      {/* Strain Alert */}
      {!alertDismissed && (
        <div style={{
          background: c.amberDim, borderRadius: 20,
          border: `1px solid ${c.amber}55`, padding: '16px',
          marginBottom: 12,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <AlertTriangle size={15} color={c.amber} />
            <span style={{ color: c.amber, fontSize: 11, fontWeight: 700, letterSpacing: 1 }}>STRAIN ALERT</span>
          </div>
          <p style={{ color: c.text, fontSize: 15, fontWeight: 700, margin: '0 0 6px' }}>Skip tonight's run — recovery circuit instead</p>
          <p style={{ color: c.sub, fontSize: 12, margin: '0 0 14px', lineHeight: 1.55 }}>
            Poor sleep (5.8 hrs) + 3 consecutive meetings detected. Your body needs restoration, not more load.
          </p>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => setActiveTab('recovery')} style={{
              flex: 2, background: c.amber, border: 'none', borderRadius: 12,
              padding: '12px', color: '#000', fontSize: 13, fontWeight: 700, cursor: 'pointer',
            }}>View Recovery Plan →</button>
            <button onClick={() => setAlertDismissed(true)} style={{
              flex: 1, background: c.cardAlt, border: `1px solid ${c.border}`,
              borderRadius: 12, padding: '12px', color: c.sub, fontSize: 13, cursor: 'pointer',
            }}>Dismiss</button>
          </div>
        </div>
      )}

      {/* Today's Schedule */}
      <Card>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <span style={{ color: c.text, fontSize: 14, fontWeight: 600 }}>Today's Schedule</span>
          <Pill label="4 events" color={c.purple} />
        </div>
        {[
          { time: '9:00', label: 'Team Standup', type: 'meeting' },
          { time: '10:30', label: 'Product Review', type: 'meeting' },
          { time: '12:00', label: '🧘 Recovery Window', type: 'recovery' },
          { time: '15:00', label: 'Sprint Planning', type: 'meeting' },
        ].map((ev, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: i < 3 ? `1px solid ${c.border}` : 'none' }}>
            <span style={{ color: c.muted, fontSize: 11, width: 36, flexShrink: 0 }}>{ev.time}</span>
            <div style={{ width: 3, height: 3, borderRadius: '50%', background: ev.type === 'recovery' ? c.primary : c.muted, flexShrink: 0 }} />
            <span style={{ color: ev.type === 'recovery' ? c.primary : c.text, fontSize: 13, fontWeight: ev.type === 'recovery' ? 600 : 400 }}>{ev.label}</span>
            {ev.type === 'recovery' && <Pill label="auto-blocked" color={c.primary} />}
          </div>
        ))}
      </Card>

      {/* Recovery Score */}
      <Card glow={c.primaryDim}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 56, height: 56, borderRadius: '50%', background: `conic-gradient(${c.primary} ${recoveryScore * 3.6}deg, ${c.border} 0deg)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <div style={{ width: 44, height: 44, borderRadius: '50%', background: c.card, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: c.primary, fontSize: 15, fontWeight: 800 }}>{recoveryScore}</span>
            </div>
          </div>
          <div>
            <p style={{ color: c.text, fontSize: 14, fontWeight: 600, margin: '0 0 3px' }}>Recovery Readiness</p>
            <p style={{ color: c.sub, fontSize: 12, margin: 0, lineHeight: 1.4 }}>72/100 — Above average. Your body can handle moderate activity with proper warm-up.</p>
          </div>
        </div>
      </Card>

    </div>
  );

  // ─── RECOVERY SCREEN ───────────────────────────────────────────────────────

  const exercises = [
    { name: 'Hip Flexor Stretch', dur: '90s', desc: 'Kneel on left knee, push hips forward gently. Switch sides.', icon: '🧎', secs: 90 },
    { name: "Child's Pose", dur: '60s', desc: 'Arms extended, breathe deep into your lower back.', icon: '🧘', secs: 60 },
    { name: 'Thoracic Rotation', dur: '60s', desc: 'Seated, rotate upper body 10 reps each side slowly.', icon: '🔄', secs: 60 },
    { name: '4-7-8 Breathing', dur: '2m', desc: 'Inhale 4s · Hold 7s · Exhale 8s. Repeat 4 cycles.', icon: '💨', secs: 120 },
    { name: 'Neck Decompression', dur: '30s', desc: 'Slow ear-to-shoulder tilts, 3 reps each side.', icon: '💆', secs: 30 },
  ];

  const timerPct = (timerSec / 420) * 100;

  const renderRecovery = () => (
    <div style={{ flex: 1, overflowY: 'auto', padding: '4px 16px 90px' }}>

      <div style={{ paddingTop: 8, marginBottom: 18 }}>
        <p style={{ color: c.sub, fontSize: 12, margin: 0 }}>Your prescription</p>
        <h2 style={{ color: c.text, fontSize: 22, fontWeight: 700, margin: '3px 0 0' }}>Recovery Plan</h2>
      </div>

      {/* Plan Hero */}
      <div style={{ background: `linear-gradient(145deg, ${c.primaryDim}, ${c.card})`, borderRadius: 20, border: `1px solid ${c.primary}44`, padding: '20px 16px', marginBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
          <div style={{ width: 44, height: 44, borderRadius: 14, background: c.primaryDim, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>🛡️</div>
          <div>
            <p style={{ color: c.primary, fontSize: 14, fontWeight: 700, margin: '0 0 2px' }}>7-Minute Mobility Reset</p>
            <p style={{ color: c.sub, fontSize: 12, margin: 0 }}>5 exercises · Strain-matched · Low intensity</p>
          </div>
        </div>

        {/* Circular Timer */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '8px 0 4px' }}>
          <div style={{ position: 'relative', width: 110, height: 110, marginBottom: 8 }}>
            <svg width="110" height="110" viewBox="0 0 110 110" style={{ position: 'absolute', top: 0, left: 0, transform: 'rotate(-90deg)' }}>
              <circle cx="55" cy="55" r="48" fill="none" stroke={c.border} strokeWidth="6" />
              <circle cx="55" cy="55" r="48" fill="none" stroke={c.primary} strokeWidth="6"
                strokeDasharray={`${301.6 * (timerPct / 100)} 301.6`}
                strokeLinecap="round"
                style={{ transition: 'stroke-dasharray 1s linear', filter: `drop-shadow(0 0 4px ${c.primary})` }}
              />
            </svg>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: c.text, fontSize: 22, fontWeight: 800, fontFamily: 'monospace', letterSpacing: 1 }}>{fmt(timerSec)}</span>
              <span style={{ color: c.sub, fontSize: 9, marginTop: 2 }}>remaining</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, width: '100%' }}>
            <button onClick={() => setTimerRunning(r => !r)} style={{
              flex: 2, background: timerRunning ? c.amber : c.primary, border: 'none',
              borderRadius: 14, padding: '13px', color: '#000', fontSize: 14,
              fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            }}>
              {timerRunning ? <><Pause size={16} />&nbsp;Pause</> : <><Play size={16} />&nbsp;{timerSec < 420 ? 'Resume' : 'Start Session'}</>}
            </button>
            <button onClick={() => { setTimerSec(420); setTimerRunning(false); setExerciseStep(0); }} style={{
              flex: 1, background: c.cardAlt, border: `1px solid ${c.border}`,
              borderRadius: 14, padding: '13px', color: c.sub, fontSize: 14, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <RotateCcw size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* Exercise Steps */}
      <SectionLabel>Exercises</SectionLabel>
      {exercises.map((ex, i) => {
        const done = i < exerciseStep;
        const active = i === exerciseStep;
        return (
          <div key={i} onClick={() => setExerciseStep(i)} style={{
            background: active ? `linear-gradient(145deg, ${c.primaryDim}, ${c.card})` : done ? c.cardAlt : c.card,
            borderRadius: 16, border: `1px solid ${active ? c.primary + '55' : c.border}`,
            padding: '14px', marginBottom: 8, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12,
            opacity: done ? 0.6 : 1,
          }}>
            <div style={{ width: 42, height: 42, borderRadius: 12, background: active ? c.primaryDim : c.cardAlt, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>
              {done ? '✓' : ex.icon}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 }}>
                <p style={{ color: active ? c.primary : done ? c.muted : c.text, fontSize: 13, fontWeight: 600, margin: 0 }}>{ex.name}</p>
                <span style={{ color: c.sub, fontSize: 10, background: c.cardAlt, padding: '2px 7px', borderRadius: 20, flexShrink: 0, marginLeft: 6 }}>{ex.dur}</span>
              </div>
              <p style={{ color: c.sub, fontSize: 11, margin: 0, lineHeight: 1.45 }}>{ex.desc}</p>
            </div>
          </div>
        );
      })}

      {exerciseStep < exercises.length && (
        <button onClick={() => setExerciseStep(s => Math.min(s + 1, exercises.length))} style={{
          width: '100%', background: c.primaryDim, border: `1px solid ${c.primary}44`,
          borderRadius: 14, padding: '13px', color: c.primary, fontSize: 14, fontWeight: 700, cursor: 'pointer', marginBottom: 12,
        }}>
          Mark Complete & Next →
        </button>
      )}

      {/* Hydration */}
      <SectionLabel>After Session</SectionLabel>
      {[
        { icon: '💧', label: 'Hydration Target', detail: '500ml water + electrolytes within 20 min', value: '500ml', color: c.blue },
        { icon: '🥩', label: 'Protein Timing', detail: '25–30g protein within 45 min of finishing', value: '30g', color: c.amber },
      ].map((item, i) => (
        <div key={i} style={{ background: c.card, borderRadius: 14, border: `1px solid ${c.border}`, padding: '13px 14px', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 20 }}>{item.icon}</span>
          <div style={{ flex: 1 }}>
            <p style={{ color: c.text, fontSize: 13, fontWeight: 600, margin: '0 0 2px' }}>{item.label}</p>
            <p style={{ color: c.sub, fontSize: 11, margin: 0 }}>{item.detail}</p>
          </div>
          <span style={{ color: item.color, fontSize: 13, fontWeight: 700 }}>{item.value}</span>
        </div>
      ))}

    </div>
  );

  // ─── INSIGHTS SCREEN ───────────────────────────────────────────────────────

  const renderInsights = () => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const strains = [45, 72, 58, 81, 67, 34, 29];
    const maxS = Math.max(...strains);

    return (
      <div style={{ flex: 1, overflowY: 'auto', padding: '4px 16px 90px' }}>
        <div style={{ paddingTop: 8, marginBottom: 18 }}>
          <p style={{ color: c.sub, fontSize: 12, margin: 0 }}>Trends & patterns</p>
          <h2 style={{ color: c.text, fontSize: 22, fontWeight: 700, margin: '3px 0 0' }}>Your Insights</h2>
        </div>

        {/* Recovery Streak */}
        <div style={{ background: `linear-gradient(145deg, ${c.purpleDim}, ${c.card})`, borderRadius: 20, border: `1px solid ${c.purple}44`, padding: '18px 16px', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ flexShrink: 0, textAlign: 'center' }}>
            <p style={{ color: c.purple, fontSize: 44, fontWeight: 900, margin: 0, lineHeight: 1 }}>11</p>
            <p style={{ color: c.sub, fontSize: 10, margin: '3px 0 0', fontWeight: 600 }}>DAY STREAK</p>
          </div>
          <div>
            <p style={{ color: c.text, fontSize: 15, fontWeight: 700, margin: '0 0 4px' }}>Recovery Streak 🔥</p>
            <p style={{ color: c.sub, fontSize: 12, margin: 0, lineHeight: 1.5 }}>11 consecutive days with at least one recovery action completed. Best: 14 days.</p>
          </div>
        </div>

        {/* Strain Bar Chart */}
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <span style={{ color: c.text, fontSize: 14, fontWeight: 600 }}>Weekly Strain</span>
            <span style={{ color: c.sub, fontSize: 12 }}>This week avg: <span style={{ color: c.amber, fontWeight: 700 }}>55</span></span>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 5, height: 90 }}>
            {strains.map((v, i) => {
              const h = Math.round((v / maxS) * 76);
              const barColor = v < 50 ? c.primary : v < 75 ? c.amber : c.red;
              const isToday = i === 4;
              return (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                  {isToday && <span style={{ color: c.sub, fontSize: 8, fontWeight: 700 }}>NOW</span>}
                  <div style={{ width: '100%', height: h, background: isToday ? barColor : barColor + '55', borderRadius: '5px 5px 2px 2px', boxShadow: isToday ? `0 0 10px ${barColor}66` : 'none', transition: 'height 0.6s ease' }} />
                  <span style={{ color: isToday ? c.text : c.muted, fontSize: 9, fontWeight: isToday ? 700 : 400 }}>{days[i]}</span>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Pattern Detections */}
        <SectionLabel>Detected Patterns</SectionLabel>
        {[
          { icon: '⚠️', color: c.red, badge: 'HIGH RISK', title: 'Late workout + poor sleep', desc: 'Occurred 3× this week. Workouts after 8 PM correlate with 34% worse sleep quality for you.' },
          { icon: '📅', color: c.amber, badge: 'RECURRING', title: 'Back-to-back meeting fatigue', desc: 'HRV drops 18% on days with 3+ consecutive meetings. Block a decompression window.' },
          { icon: '🦵', color: c.red, badge: 'INJURY RISK', title: 'Leg overload pattern detected', desc: '3 heavy leg sessions in 5 days. Recommend 48-hr lower body rest.' },
          { icon: '✅', color: c.primary, badge: 'POSITIVE', title: 'Morning mobility is working', desc: 'Soreness scores down 32% since you started daily stretching 11 days ago.' },
        ].map((p, i) => (
          <div key={i} style={{ background: c.card, borderRadius: 16, border: `1px solid ${c.border}`, padding: '14px', marginBottom: 8 }}>
            <div style={{ display: 'flex', gap: 10 }}>
              <span style={{ fontSize: 18, flexShrink: 0 }}>{p.icon}</span>
              <div>
                <p style={{ color: c.text, fontSize: 13, fontWeight: 700, margin: '0 0 4px' }}>{p.title}</p>
                <p style={{ color: c.sub, fontSize: 12, margin: '0 0 8px', lineHeight: 1.45 }}>{p.desc}</p>
                <Pill label={p.badge} color={p.color} />
              </div>
            </div>
          </div>
        ))}

        {/* What's Working */}
        <SectionLabel>What's Working For You</SectionLabel>
        <Card>
          {[
            { label: 'Morning stretching', impact: '+28% energy', pct: 0.78 },
            { label: '4-7-8 breathing', impact: '+22% focus', pct: 0.65 },
            { label: 'Protein timing', impact: '−15% soreness', pct: 0.55 },
          ].map((item, i) => (
            <div key={i} style={{ marginBottom: i < 2 ? 14 : 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                <span style={{ color: c.text, fontSize: 13 }}>{item.label}</span>
                <span style={{ color: c.primary, fontSize: 12, fontWeight: 700 }}>{item.impact}</span>
              </div>
              <div style={{ height: 5, background: c.border, borderRadius: 3 }}>
                <div style={{ height: '100%', width: `${item.pct * 100}%`, background: `linear-gradient(90deg, ${c.primary}, ${c.purple})`, borderRadius: 3 }} />
              </div>
            </div>
          ))}
        </Card>

      </div>
    );
  };

  // ─── PROFILE SCREEN ────────────────────────────────────────────────────────

  const renderProfile = () => (
    <div style={{ flex: 1, overflowY: 'auto', padding: '4px 16px 90px' }}>

      <div style={{ paddingTop: 8, marginBottom: 18 }}>
        <p style={{ color: c.sub, fontSize: 12, margin: 0 }}>Your account</p>
        <h2 style={{ color: c.text, fontSize: 22, fontWeight: 700, margin: '3px 0 0' }}>Profile</h2>
      </div>

      {/* User Card */}
      <div style={{ background: `linear-gradient(145deg, ${c.primaryDim}, ${c.purpleDim}, ${c.card})`, borderRadius: 20, border: `1px solid ${c.border}`, padding: '20px 16px', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{ width: 60, height: 60, borderRadius: '50%', background: `linear-gradient(135deg, ${c.primary}, ${c.purple})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 800, color: '#000', flexShrink: 0 }}>A</div>
        <div style={{ flex: 1 }}>
          <p style={{ color: c.text, fontSize: 17, fontWeight: 700, margin: '0 0 2px' }}>Alex Rivera</p>
          <p style={{ color: c.sub, fontSize: 12, margin: '0 0 8px' }}>alex@email.com</p>
          <Pill label="Pro Member" color={c.primary} />
        </div>
        <ChevronRight size={18} color={c.muted} />
      </div>

      {/* Stats Row */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        {[
          { val: '89', label: 'Sessions', color: c.primary },
          { val: '11', label: 'Streak', color: c.purple },
          { val: '23%', label: 'Energy ↑', color: c.amber },
        ].map((s, i) => (
          <div key={i} style={{ flex: 1, background: c.card, borderRadius: 16, border: `1px solid ${c.border}`, padding: '14px 8px', textAlign: 'center' }}>
            <p style={{ color: s.color, fontSize: 24, fontWeight: 800, margin: '0 0 4px' }}>{s.val}</p>
            <p style={{ color: c.sub, fontSize: 10, margin: 0, fontWeight: 600 }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Connected Devices */}
      <SectionLabel>Connected Devices</SectionLabel>
      <Card>
        {[
          { name: 'Apple Watch Series 9', icon: '⌚', status: 'Connected', color: c.primary },
          { name: 'Whoop 4.0', icon: '📿', status: 'Sync pending', color: c.amber },
        ].map((d, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: i === 0 ? `1px solid ${c.border}` : 'none' }}>
            <span style={{ fontSize: 22 }}>{d.icon}</span>
            <div style={{ flex: 1 }}>
              <p style={{ color: c.text, fontSize: 13, fontWeight: 500, margin: '0 0 2px' }}>{d.name}</p>
              <p style={{ color: d.color, fontSize: 11, margin: 0 }}>{d.status}</p>
            </div>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: d.color, flexShrink: 0 }} />
          </div>
        ))}
        <button style={{ width: '100%', background: 'none', border: `1px dashed ${c.border}`, borderRadius: 12, padding: '11px', color: c.sub, fontSize: 13, cursor: 'pointer', marginTop: 10 }}>
          + Add Device
        </button>
      </Card>

      {/* Preferences */}
      <SectionLabel>Preferences</SectionLabel>
      <Card>
        {[
          { icon: Bell, label: 'Strain notifications', toggle: true, val: notifEnabled, set: setNotifEnabled },
          { icon: Calendar, label: 'Calendar sync', toggle: true, val: calSync, set: setCalSync },
          { icon: Moon, label: 'Sleep tracking', toggle: true, val: sleepTrack, set: setSleepTrack },
          { icon: TrendingUp, label: 'Weekly goals', toggle: false },
          { icon: Lock, label: 'Privacy settings', toggle: false },
        ].map(({ icon: Icon, label, toggle, val, set }, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 0', borderBottom: i < 4 ? `1px solid ${c.border}` : 'none' }}>
            <Icon size={17} color={c.sub} />
            <p style={{ flex: 1, color: c.text, fontSize: 14, margin: 0 }}>{label}</p>
            {toggle ? <Toggle on={val} onToggle={() => set(v => !v)} /> : <ChevronRight size={16} color={c.muted} />}
          </div>
        ))}
      </Card>

      {/* Sign Out */}
      <button style={{ width: '100%', background: c.redDim, border: `1px solid ${c.red}33`, borderRadius: 14, padding: '13px', color: c.red, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
        Sign Out
      </button>

    </div>
  );

  // ─── NAV BAR ───────────────────────────────────────────────────────────────

  const navItems = [
    { id: 'home', label: 'Today', Icon: Home },
    { id: 'recovery', label: 'Recovery', Icon: Shield },
    { id: 'insights', label: 'Insights', Icon: BarChart2 },
    { id: 'profile', label: 'Profile', Icon: User },
  ];

  // ─── ROOT RENDER ───────────────────────────────────────────────────────────

  return (
    <div style={{ minHeight: '100vh', background: '#03050A', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 0; background: transparent; }
        button, input { font-family: Inter, sans-serif; }
      `}</style>

      {/* Phone Frame */}
      <div style={{
        width: 375, height: 812,
        background: c.bg,
        borderRadius: 50,
        overflow: 'hidden',
        boxShadow: '0 40px 120px rgba(0,0,0,0.95), 0 0 0 2px #1A1F2E, inset 0 0 0 1px #252A3A',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'Inter, sans-serif',
      }}>

        {/* Status Bar */}
        <div style={{ padding: '16px 26px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
          <span style={{ color: c.text, fontSize: 15, fontWeight: 700 }}>9:41</span>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            <Wifi size={14} color={c.text} />
            <Battery size={16} color={c.text} />
          </div>
        </div>

        {/* Dynamic Island */}
        <div style={{ display: 'flex', justifyContent: 'center', padding: '6px 0 10px', flexShrink: 0 }}>
          <div style={{ width: 120, height: 34, background: '#000', borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#222' }} />
            <div style={{ width: 14, height: 14, borderRadius: '50%', background: '#1a1a1a', border: '2px solid #333' }} />
          </div>
        </div>

        {/* App Header */}
        <div style={{ padding: '0 16px 10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
            <Zap size={18} color={c.primary} fill={c.primary} />
            <span style={{ color: c.primary, fontSize: 16, fontWeight: 800, letterSpacing: -0.3 }}>PulsePatch</span>
          </div>
          <div style={{ width: 34, height: 34, borderRadius: '50%', background: c.card, border: `1px solid ${c.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Bell size={15} color={c.sub} />
          </div>
        </div>

        {/* Screen Content */}
        <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          {activeTab === 'home' && renderHome()}
          {activeTab === 'recovery' && renderRecovery()}
          {activeTab === 'insights' && renderInsights()}
          {activeTab === 'profile' && renderProfile()}
        </div>

        {/* Bottom Navigation */}
        <div style={{
          background: c.card,
          borderTop: `1px solid ${c.border}`,
          padding: '8px 0 22px',
          display: 'flex',
          flexShrink: 0,
        }}>
          {navItems.map(({ id, label, Icon }) => {
            const active = activeTab === id;
            return (
              <button key={id} onClick={() => setActiveTab(id)} style={{
                flex: 1, background: 'none', border: 'none', cursor: 'pointer',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, padding: '6px 0',
              }}>
                <div style={{ position: 'relative' }}>
                  <Icon size={22} color={active ? c.primary : c.muted} strokeWidth={active ? 2.5 : 1.8} />
                  {active && <div style={{ position: 'absolute', bottom: -4, left: '50%', transform: 'translateX(-50%)', width: 4, height: 4, borderRadius: '50%', background: c.primary }} />}
                </div>
                <span style={{ color: active ? c.primary : c.muted, fontSize: 10, fontWeight: active ? 700 : 500 }}>{label}</span>
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
}
