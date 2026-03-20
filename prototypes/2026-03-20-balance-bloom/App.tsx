function App() {
  const { useState, useEffect, useRef } = React;

  // ── STATE ────────────────────────────────────────────────────────────────────
  const [tab, setTab] = useState('garden');
  const [nudgeDismissed, setNudgeDismissed] = useState(false);
  const [selectedPetal, setSelectedPetal] = useState(null);
  const [lifeFilter, setLifeFilter] = useState('all');
  const [goalTab, setGoalTab] = useState('active');
  const [mounted, setMounted] = useState(false);
  const [pressedTab, setPressedTab] = useState(null);
  const [transferPressed, setTransferPressed] = useState(false);
  const [boostPressed, setBoostPressed] = useState(false);

  useEffect(() => { setTimeout(() => setMounted(true), 100); }, []);

  // ── DESIGN TOKENS ────────────────────────────────────────────────────────────
  const c = {
    bg:         '#06101C',
    surface:    '#0C1826',
    surfaceAlt: '#111F2E',
    border:     '#182535',
    borderBright:'#203044',
    // Brand
    primary:    '#2FD98C',
    primaryBg:  '#0A2E1C',
    primaryDim: '#1B5C3A',
    // Gold / urgency medium
    gold:       '#F5C030',
    goldBg:     '#2E2208',
    // Purple / accent
    purple:     '#9A78F0',
    purpleBg:   '#1D1545',
    // Red / urgent
    red:        '#FF5A5A',
    redBg:      '#2C0D0D',
    // Orange
    orange:     '#FF8A47',
    orangeBg:   '#2D1608',
    // Text
    text:       '#DFF0EA',
    textSub:    '#3D6059',
    textMid:    '#7FA89E',
  };

  const font = "'Plus Jakarta Sans', sans-serif";

  // ── DATA ─────────────────────────────────────────────────────────────────────
  const petals = [
    {
      id: 1, name: "Lily's Birthday", emoji: '🎂',
      target: 120, saved: 45, deadline: 'Apr 8', daysLeft: 19,
      urgency: 'high', color: c.orange, colorBg: c.orangeBg,
      subGoals: [
        { label: 'Gift', amount: 80 },
        { label: 'Wrap & Card', amount: 40 },
      ],
      tip: 'She loves art supplies and book sets.',
    },
    {
      id: 2, name: 'Luna — Vet Visit', emoji: '🐾',
      target: 320, saved: 180, deadline: 'Apr 10', daysLeft: 21,
      urgency: 'high', color: c.red, colorBg: c.redBg,
      subGoals: [
        { label: 'Annual checkup', amount: 150 },
        { label: 'Vaccinations', amount: 170 },
      ],
      tip: 'Luna is due for rabies and bordetella shots.',
    },
    {
      id: 3, name: 'Summer Tires', emoji: '🔧',
      target: 600, saved: 240, deadline: 'May 1', daysLeft: 42,
      urgency: 'medium', color: c.gold, colorBg: c.goldBg,
      subGoals: [
        { label: '4× Michelin tires', amount: 480 },
        { label: 'Installation & balance', amount: 120 },
      ],
      tip: 'Dealer recommended swap by April 30 for road safety.',
    },
    {
      id: 4, name: "Emma's Wedding", emoji: '💍',
      target: 850, saved: 420, deadline: 'Jun 14', daysLeft: 86,
      urgency: 'medium', color: c.purple, colorBg: c.purpleBg,
      subGoals: [
        { label: 'Wedding gift', amount: 300 },
        { label: 'Outfit', amount: 250 },
        { label: 'Flights', amount: 200 },
        { label: 'Hotel (1 night)', amount: 100 },
      ],
      tip: 'Booked flights already — 3 items still uncovered.',
    },
    {
      id: 5, name: 'Holiday Travel', emoji: '✈️',
      target: 1200, saved: 890, deadline: 'Dec 20', daysLeft: 275,
      urgency: 'low', color: c.primary, colorBg: c.primaryBg,
      subGoals: [
        { label: 'Flights (round-trip)', amount: 600 },
        { label: 'Hotels (4 nights)', amount: 400 },
        { label: 'Activities & dining', amount: 200 },
      ],
      tip: 'On track! Keep $30/week to finish by November.',
    },
    {
      id: 6, name: 'Adobe CC Renewal', emoji: '💻',
      target: 660, saved: 440, deadline: 'Sep 15', daysLeft: 179,
      urgency: 'low', color: '#FF7847', colorBg: '#2A1008',
      subGoals: [
        { label: 'Annual Creative Cloud plan', amount: 660 },
      ],
      tip: 'Auto-renews Sep 15. Petal covers full year.',
    },
  ];

  const completedPetals = [
    { id: 7, name: 'Car Insurance', emoji: '🚗', target: 1100, saved: 1100, deadline: 'Mar 1', daysLeft: 0, urgency: 'done', color: c.primary, colorBg: c.primaryBg },
    { id: 8, name: "Mom's Birthday", emoji: '🌸', target: 200, saved: 200, deadline: 'Feb 20', daysLeft: 0, urgency: 'done', color: c.purple, colorBg: c.purpleBg },
    { id: 9, name: 'Tax Filing Fee', emoji: '📋', target: 350, saved: 350, deadline: 'Mar 15', daysLeft: 0, urgency: 'done', color: c.gold, colorBg: c.goldBg },
  ];

  const predictions = [
    { name: 'Property Tax', emoji: '🏠', estimate: '$2,400', when: 'Jul 2026', confidence: 92 },
    { name: 'Annual Dentist', emoji: '🦷', estimate: '$280', when: 'May 2026', confidence: 85 },
    { name: 'Back-to-School', emoji: '🎒', estimate: '$380', when: 'Aug 2026', confidence: 78 },
    { name: 'Car Service', emoji: '🚘', estimate: '$450', when: 'Jun 2026', confidence: 71 },
  ];

  const velocityData = [
    { month: 'Oct', pct: 58 },
    { month: 'Nov', pct: 44 },
    { month: 'Dec', pct: 82 },
    { month: 'Jan', pct: 53 },
    { month: 'Feb', pct: 67 },
    { month: 'Mar', pct: 72, current: true },
  ];

  const getPct = (p) => Math.min(100, Math.round((p.saved / p.target) * 100));
  const totalSaved = petals.reduce((s, p) => s + p.saved, 0);
  const totalTarget = petals.reduce((s, p) => s + p.target, 0);

  // ── SHARED COMPONENTS ────────────────────────────────────────────────────────

  const Ring = ({ size, pct, color, bg, sw = 5, children }) => {
    const r = (size - sw * 2) / 2;
    const circ = 2 * Math.PI * r;
    const offset = circ - (pct / 100) * circ;
    return (
      <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)', position: 'absolute', top: 0, left: 0 }}>
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={bg} strokeWidth={sw} />
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={sw}
            strokeDasharray={circ} strokeDashoffset={mounted ? offset : circ}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 0.9s cubic-bezier(0.34,1.56,0.64,1)' }}
          />
        </svg>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {children}
        </div>
      </div>
    );
  };

  const Pill = ({ label, color, bg }) => (
    <div style={{ background: bg, borderRadius: 99, padding: '3px 9px', display: 'inline-flex', alignItems: 'center' }}>
      <span style={{ color, fontSize: 10, fontFamily: font, fontWeight: 700 }}>{label}</span>
    </div>
  );

  const ProgressBar = ({ pct, color, bg, height = 5 }) => (
    <div style={{ background: bg, borderRadius: 99, height, overflow: 'hidden' }}>
      <div style={{ height: '100%', width: `${mounted ? pct : 0}%`, background: color, borderRadius: 99, transition: 'width 0.8s cubic-bezier(0.34,1.56,0.64,1)' }} />
    </div>
  );

  // ── PETAL DETAIL SHEET ────────────────────────────────────────────────────────
  const PetalSheet = ({ petal, onClose }) => {
    const pct = getPct(petal);
    const deficit = petal.target - petal.saved;
    const daily = deficit > 0 ? Math.ceil(deficit / Math.max(petal.daysLeft, 1)) : 0;
    return (
      <div
        style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.75)', zIndex: 200, display: 'flex', alignItems: 'flex-end', backdropFilter: 'blur(4px)' }}
        onClick={e => e.target === e.currentTarget && onClose()}
      >
        <div style={{ background: c.surface, borderRadius: '28px 28px 0 0', padding: '6px 0 0', width: '100%', maxHeight: '82%', overflowY: 'auto', border: `1px solid ${c.border}` }}>
          {/* Handle */}
          <div style={{ width: 40, height: 4, background: c.border, borderRadius: 99, margin: '8px auto 0' }} />

          <div style={{ padding: '18px 22px 30px' }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 18 }}>
              <div>
                <div style={{ fontSize: 34, marginBottom: 8 }}>{petal.emoji}</div>
                <div style={{ color: c.text, fontSize: 20, fontFamily: font, fontWeight: 800 }}>{petal.name}</div>
                <div style={{ color: c.textSub, fontSize: 13, fontFamily: font, marginTop: 4 }}>Due {petal.deadline}{petal.daysLeft > 0 ? ` · ${petal.daysLeft} days left` : ''}</div>
              </div>
              <Ring size={78} pct={pct} color={petal.color} bg={petal.colorBg} sw={7}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ color: petal.color, fontSize: 14, fontFamily: font, fontWeight: 800 }}>{pct}%</div>
                </div>
              </Ring>
            </div>

            {/* Progress bar */}
            <ProgressBar pct={pct} color={petal.color} bg={petal.colorBg} height={6} />

            {/* Stats */}
            <div style={{ display: 'flex', gap: 10, marginTop: 16, marginBottom: 18 }}>
              {[
                { label: 'Saved', value: `$${petal.saved}`, color: c.primary },
                { label: 'Remaining', value: `$${deficit}`, color: c.text },
                { label: daily > 0 ? '/day needed' : 'All set!', value: daily > 0 ? `$${daily}` : '✓', color: c.gold },
              ].map((s, i) => (
                <div key={i} style={{ flex: 1, background: c.surfaceAlt, borderRadius: 14, padding: '11px 12px', textAlign: 'center' }}>
                  <div style={{ color: s.color, fontSize: 17, fontFamily: font, fontWeight: 800 }}>{s.value}</div>
                  <div style={{ color: c.textSub, fontSize: 10, fontFamily: font, marginTop: 3 }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Breakdown */}
            <div style={{ color: c.textMid, fontSize: 11, fontFamily: font, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 10 }}>Breakdown</div>
            <div style={{ background: c.surfaceAlt, borderRadius: 16, overflow: 'hidden' }}>
              {petal.subGoals.map((sg, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', borderBottom: i < petal.subGoals.length - 1 ? `1px solid ${c.border}` : 'none' }}>
                  <div style={{ color: c.text, fontSize: 13, fontFamily: font }}>{sg.label}</div>
                  <div style={{ color: petal.color, fontSize: 13, fontFamily: font, fontWeight: 700 }}>${sg.amount}</div>
                </div>
              ))}
            </div>

            {/* Tip */}
            {petal.tip && (
              <div style={{ background: `${petal.color}15`, border: `1px solid ${petal.color}30`, borderRadius: 14, padding: '12px 14px', marginTop: 14, display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 16 }}>💡</span>
                <div style={{ color: c.textMid, fontSize: 12, fontFamily: font, lineHeight: 1.5 }}>{petal.tip}</div>
              </div>
            )}

            {/* Actions */}
            <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
              <button
                onMouseDown={() => setBoostPressed(true)} onMouseUp={() => setBoostPressed(false)}
                style={{ flex: 1, background: petal.color, color: '#000', border: 'none', borderRadius: 16, padding: '15px', fontSize: 14, fontFamily: font, fontWeight: 700, cursor: 'pointer', transition: 'transform 0.12s', transform: boostPressed ? 'scale(0.96)' : 'scale(1)' }}
              >
                Boost This Petal
              </button>
              <button
                onClick={onClose}
                style={{ background: c.surfaceAlt, color: c.textMid, border: `1px solid ${c.border}`, borderRadius: 16, padding: '15px 20px', fontSize: 14, fontFamily: font, fontWeight: 600, cursor: 'pointer' }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ── GARDEN SCREEN ─────────────────────────────────────────────────────────────
  const GardenScreen = () => {
    const [hovered, setHovered] = useState(null);
    const totalPct = Math.round((totalSaved / totalTarget) * 100);
    return (
      <div style={{ height: '100%', overflowY: 'auto', paddingBottom: 20 }}>
        {/* Header */}
        <div style={{ padding: '14px 20px 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ color: c.textSub, fontSize: 11, fontFamily: font, fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase' }}>Good morning</div>
            <div style={{ color: c.text, fontSize: 22, fontFamily: font, fontWeight: 800, marginTop: 2 }}>Sarah ✨</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {React.createElement(window.lucide.Bell, { size: 20, color: c.textMid })}
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: `linear-gradient(135deg, ${c.primary}, ${c.purple})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, color: '#000', fontFamily: font, fontWeight: 800 }}>S</div>
          </div>
        </div>

        {/* Balance Card */}
        <div style={{ margin: '0 16px 14px', background: `linear-gradient(140deg, ${c.primaryBg} 0%, #0D1838 60%, ${c.purpleBg} 100%)`, border: `1px solid ${c.borderBright}`, borderRadius: 22, padding: '18px 20px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -20, right: -20, width: 100, height: 100, borderRadius: '50%', background: `${c.primary}12`, pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: -30, left: 60, width: 80, height: 80, borderRadius: '50%', background: `${c.purple}10`, pointerEvents: 'none' }} />
          <div style={{ color: c.textSub, fontSize: 10, fontFamily: font, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 6 }}>Protected across {petals.length} petals</div>
          <div style={{ color: c.text, fontSize: 34, fontFamily: font, fontWeight: 800, marginBottom: 2 }}>${totalSaved.toLocaleString()}</div>
          <div style={{ color: c.textMid, fontSize: 13, fontFamily: font, marginBottom: 14 }}>of ${totalTarget.toLocaleString()} planned</div>
          <ProgressBar pct={totalPct} color={`linear-gradient(90deg, ${c.primary}, ${c.purple})`} bg={c.border} height={6} />
          <div style={{ marginTop: 7, display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ color: c.textSub, fontSize: 11, fontFamily: font }}>{totalPct}% of garden funded</div>
            <div style={{ color: c.primary, fontSize: 11, fontFamily: font, fontWeight: 600 }}>+$340 this week ↑</div>
          </div>
        </div>

        {/* Nudge */}
        {!nudgeDismissed && (
          <div style={{ margin: '0 16px 14px', background: c.redBg, border: `1px solid ${c.red}45`, borderRadius: 18, padding: '14px 16px', display: 'flex', gap: 12, alignItems: 'flex-start', position: 'relative' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${c.red}, transparent)`, borderRadius: '18px 18px 0 0' }} />
            <div style={{ fontSize: 26, flexShrink: 0, lineHeight: 1 }}>🎂</div>
            <div style={{ flex: 1 }}>
              <div style={{ color: c.text, fontSize: 13, fontFamily: font, fontWeight: 700, marginBottom: 3 }}>Lily's birthday is in 19 days</div>
              <div style={{ color: c.textMid, fontSize: 12, fontFamily: font, lineHeight: 1.5 }}>You're $75 short of your goal. Saving $4/day gets you there in time.</div>
              <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
                <button
                  style={{ background: c.red, color: '#fff', border: 'none', borderRadius: 10, padding: '7px 14px', fontSize: 12, fontFamily: font, fontWeight: 700, cursor: 'pointer' }}
                  onClick={() => setSelectedPetal(petals.find(p => p.id === 1))}
                >
                  Boost Petal
                </button>
                <button
                  onClick={() => setNudgeDismissed(true)}
                  style={{ background: 'transparent', color: c.textSub, border: `1px solid ${c.border}`, borderRadius: 10, padding: '7px 12px', fontSize: 12, fontFamily: font, cursor: 'pointer' }}
                >
                  Remind me later
                </button>
              </div>
            </div>
            <button onClick={() => setNudgeDismissed(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 2, flexShrink: 0 }}>
              {React.createElement(window.lucide.X, { size: 15, color: c.textSub })}
            </button>
          </div>
        )}

        {/* Petals Grid */}
        <div style={{ padding: '0 16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <div style={{ color: c.text, fontSize: 16, fontFamily: font, fontWeight: 700 }}>Active Petals</div>
            <button
              onClick={() => setTab('goals')}
              style={{ background: `${c.primary}20`, border: 'none', borderRadius: 10, padding: '6px 12px', color: c.primary, fontSize: 12, fontFamily: font, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}
            >
              {React.createElement(window.lucide.Plus, { size: 13 })} New Petal
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {petals.map(petal => {
              const pct = getPct(petal);
              const isHovered = hovered === petal.id;
              return (
                <div
                  key={petal.id}
                  onClick={() => setSelectedPetal(petal)}
                  onMouseEnter={() => setHovered(petal.id)}
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    background: isHovered ? c.surfaceAlt : c.surface,
                    border: `1px solid ${petal.urgency === 'high' ? petal.color + '50' : c.border}`,
                    borderRadius: 20,
                    padding: '14px',
                    cursor: 'pointer',
                    transition: 'all 0.18s ease',
                    position: 'relative',
                    overflow: 'hidden',
                    transform: isHovered ? 'translateY(-2px)' : 'none',
                  }}
                >
                  {petal.urgency === 'high' && (
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${petal.color}, transparent)`, borderRadius: '20px 20px 0 0' }} />
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                    <div>
                      <div style={{ fontSize: 24, lineHeight: 1 }}>{petal.emoji}</div>
                      <div style={{ color: c.text, fontSize: 12, fontFamily: font, fontWeight: 700, marginTop: 6, lineHeight: 1.3 }}>{petal.name}</div>
                    </div>
                    <Ring size={44} pct={pct} color={petal.color} bg={petal.colorBg} sw={4}>
                      <span style={{ color: petal.color, fontSize: 9, fontFamily: font, fontWeight: 800 }}>{pct}%</span>
                    </Ring>
                  </div>
                  <div style={{ color: c.textSub, fontSize: 10, fontFamily: font, marginBottom: 8 }}>
                    <span style={{ color: c.textMid, fontWeight: 700 }}>${petal.saved}</span> / ${petal.target}
                  </div>
                  <ProgressBar pct={pct} color={petal.color} bg={petal.colorBg} height={3} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
                    <Pill label={`${petal.daysLeft}d left`} color={petal.color} bg={petal.colorBg} />
                    <div style={{ color: c.textSub, fontSize: 10, fontFamily: font }}>{petal.deadline}</div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick transfer */}
          <button
            onMouseDown={() => setTransferPressed(true)}
            onMouseUp={() => setTransferPressed(false)}
            onMouseLeave={() => setTransferPressed(false)}
            style={{
              width: '100%', marginTop: 14, background: `linear-gradient(135deg, ${c.primaryBg}, ${c.purpleBg})`, border: `1px solid ${c.borderBright}`, borderRadius: 16, padding: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, cursor: 'pointer',
              transition: 'transform 0.12s', transform: transferPressed ? 'scale(0.97)' : 'scale(1)',
            }}
          >
            {React.createElement(window.lucide.Zap, { size: 16, color: c.primary })}
            <span style={{ color: c.primary, fontSize: 14, fontFamily: font, fontWeight: 700 }}>Auto-distribute $200 across petals</span>
          </button>
        </div>
      </div>
    );
  };

  // ── LIFE MAP SCREEN ───────────────────────────────────────────────────────────
  const LifeMapScreen = () => {
    const filters = [
      { key: 'all', label: 'All Events', icon: '🌿' },
      { key: 'high', label: 'Urgent', icon: '🚨' },
      { key: 'medium', label: 'Soon', icon: '⏰' },
      { key: 'low', label: 'Growing', icon: '🌱' },
    ];
    const filtered = lifeFilter === 'all'
      ? [...petals].sort((a, b) => a.daysLeft - b.daysLeft)
      : petals.filter(p => p.urgency === lifeFilter);

    const urgencyLabel = {
      high: { label: 'Urgent — act now', color: c.red },
      medium: { label: 'Upcoming — building', color: c.gold },
      low: { label: 'Growing — on track', color: c.primary },
    };

    let lastUrgency = null;

    return (
      <div style={{ height: '100%', overflowY: 'auto', paddingBottom: 20 }}>
        <div style={{ padding: '14px 20px 8px' }}>
          <div style={{ color: c.textSub, fontSize: 10, fontFamily: font, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 4 }}>March 2026</div>
          <div style={{ color: c.text, fontSize: 22, fontFamily: font, fontWeight: 800 }}>Life Season Map</div>
          <div style={{ color: c.textMid, fontSize: 12, fontFamily: font, marginTop: 3 }}>Your money connected to your moments</div>
        </div>

        {/* Filter pills */}
        <div style={{ display: 'flex', gap: 7, padding: '8px 16px 10px', overflowX: 'auto' }}>
          {filters.map(f => (
            <button
              key={f.key}
              onClick={() => setLifeFilter(f.key)}
              style={{
                background: lifeFilter === f.key ? c.primary : c.surface,
                color: lifeFilter === f.key ? '#000' : c.textMid,
                border: `1px solid ${lifeFilter === f.key ? c.primary : c.border}`,
                borderRadius: 99, padding: '7px 14px', fontSize: 12, fontFamily: font, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0, transition: 'all 0.2s',
              }}
            >
              {f.icon} {f.label}
            </button>
          ))}
        </div>

        {/* Timeline */}
        <div style={{ padding: '4px 16px' }}>
          {filtered.map((petal, i) => {
            const pct = getPct(petal);
            const deficit = petal.target - petal.saved;
            const daily = deficit > 0 ? Math.ceil(deficit / Math.max(petal.daysLeft, 1)) : 0;
            const showDivider = lifeFilter === 'all' && petal.urgency !== lastUrgency;
            if (showDivider) lastUrgency = petal.urgency;
            const urg = urgencyLabel[petal.urgency] || {};

            return (
              <div key={petal.id}>
                {showDivider && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10, marginTop: i === 0 ? 0 : 6 }}>
                    <div style={{ height: 1, background: `${urg.color}40`, flex: 1 }} />
                    <div style={{ color: urg.color, fontSize: 10, fontFamily: font, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.8px', whiteSpace: 'nowrap' }}>{urg.label}</div>
                    <div style={{ height: 1, background: `${urg.color}40`, flex: 1 }} />
                  </div>
                )}

                <div style={{ display: 'flex', gap: 12, marginBottom: 10 }} onClick={() => setSelectedPetal(petal)}>
                  {/* Timeline */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 22, flexShrink: 0 }}>
                    <div style={{ width: 14, height: 14, borderRadius: '50%', background: petal.color, border: `3px solid ${petal.colorBg}`, flexShrink: 0, marginTop: 16, zIndex: 1 }} />
                    {i < filtered.length - 1 && <div style={{ width: 2, flex: 1, background: `linear-gradient(to bottom, ${petal.color}50, transparent)`, marginTop: 3 }} />}
                  </div>

                  {/* Card */}
                  <div style={{ flex: 1, background: c.surface, border: `1px solid ${petal.urgency === 'high' ? petal.color + '45' : c.border}`, borderRadius: 18, padding: '14px', cursor: 'pointer', marginBottom: 4 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                        <div style={{ width: 38, height: 38, background: petal.colorBg, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>{petal.emoji}</div>
                        <div>
                          <div style={{ color: c.text, fontSize: 13, fontFamily: font, fontWeight: 700 }}>{petal.name}</div>
                          <div style={{ color: c.textSub, fontSize: 11, fontFamily: font, marginTop: 2 }}>{petal.deadline} · {petal.daysLeft} days away</div>
                        </div>
                      </div>
                      <div style={{ background: petal.colorBg, borderRadius: 10, padding: '5px 9px', textAlign: 'right' }}>
                        <div style={{ color: petal.color, fontSize: 12, fontFamily: font, fontWeight: 800 }}>{pct}%</div>
                        <div style={{ color: `${petal.color}80`, fontSize: 10, fontFamily: font }}>funded</div>
                      </div>
                    </div>

                    <ProgressBar pct={pct} color={petal.color} bg={petal.colorBg} height={5} />

                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
                      <span style={{ color: c.textSub, fontSize: 11, fontFamily: font }}>${petal.saved} of ${petal.target}</span>
                      {deficit > 0
                        ? <span style={{ color: petal.color, fontSize: 11, fontFamily: font, fontWeight: 600 }}>Need ${daily}/day</span>
                        : <span style={{ color: c.primary, fontSize: 11, fontFamily: font, fontWeight: 600 }}>✓ Fully funded</span>
                      }
                    </div>

                    {petal.subGoals && petal.subGoals.length > 1 && (
                      <div style={{ marginTop: 10, display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                        {petal.subGoals.map((sg, si) => (
                          <div key={si} style={{ background: c.surfaceAlt, borderRadius: 7, padding: '3px 8px' }}>
                            <span style={{ color: c.textMid, fontSize: 10, fontFamily: font }}>{sg.label}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // ── GOALS / PETALS SCREEN ─────────────────────────────────────────────────────
  const GoalsScreen = () => {
    const list = goalTab === 'active' ? petals : completedPetals;
    return (
      <div style={{ height: '100%', overflowY: 'auto', paddingBottom: 20 }}>
        <div style={{ padding: '14px 20px 10px' }}>
          <div style={{ color: c.text, fontSize: 22, fontFamily: font, fontWeight: 800, marginBottom: 12 }}>Your Garden</div>

          {/* Stats row */}
          <div style={{ display: 'flex', gap: 8 }}>
            {[
              { label: 'Active Petals', value: petals.length, color: c.primary },
              { label: 'Total Saved', value: `$${totalSaved.toLocaleString()}`, color: c.gold },
              { label: 'Completed', value: completedPetals.length, color: c.purple },
            ].map((s, i) => (
              <div key={i} style={{ flex: 1, background: c.surface, border: `1px solid ${c.border}`, borderRadius: 14, padding: '10px 10px', textAlign: 'center' }}>
                <div style={{ color: s.color, fontSize: 17, fontFamily: font, fontWeight: 800 }}>{s.value}</div>
                <div style={{ color: c.textSub, fontSize: 10, fontFamily: font, marginTop: 3, lineHeight: 1.3 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Active / Completed tabs */}
        <div style={{ display: 'flex', margin: '0 16px 14px', background: c.surface, borderRadius: 14, padding: 4, border: `1px solid ${c.border}` }}>
          {['active', 'completed'].map(t => (
            <button
              key={t}
              onClick={() => setGoalTab(t)}
              style={{ flex: 1, background: goalTab === t ? c.primary : 'transparent', color: goalTab === t ? '#000' : c.textSub, border: 'none', borderRadius: 11, padding: '9px', fontSize: 13, fontFamily: font, fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s' }}
            >
              {t === 'active' ? 'Active' : 'Completed'}
            </button>
          ))}
        </div>

        {/* List */}
        <div style={{ padding: '0 16px' }}>
          {list.map((petal) => {
            const pct = getPct(petal);
            return (
              <div
                key={petal.id}
                onClick={() => setSelectedPetal(petal)}
                style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 18, padding: '14px', marginBottom: 10, display: 'flex', gap: 12, alignItems: 'center', cursor: 'pointer' }}
              >
                <div style={{ width: 46, height: 46, background: petal.colorBg, borderRadius: 15, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 23, flexShrink: 0 }}>
                  {petal.emoji}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <div style={{ color: c.text, fontSize: 14, fontFamily: font, fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 150 }}>{petal.name}</div>
                    <div style={{ color: petal.color, fontSize: 13, fontFamily: font, fontWeight: 800 }}>{pct}%</div>
                  </div>
                  <ProgressBar pct={pct} color={petal.color} bg={petal.colorBg} height={4} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
                    <span style={{ color: c.textSub, fontSize: 11, fontFamily: font }}>${petal.saved} / ${petal.target}</span>
                    <span style={{ color: c.textSub, fontSize: 11, fontFamily: font }}>
                      {petal.daysLeft > 0 ? `${petal.daysLeft}d · ${petal.deadline}` : '✓ Done'}
                    </span>
                  </div>
                </div>

                {React.createElement(window.lucide.ChevronRight, { size: 16, color: c.textSub })}
              </div>
            );
          })}

          {goalTab === 'active' && (
            <div
              style={{ border: `2px dashed ${c.border}`, borderRadius: 18, padding: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, cursor: 'pointer' }}
            >
              {React.createElement(window.lucide.Plus, { size: 18, color: c.textSub })}
              <span style={{ color: c.textSub, fontSize: 14, fontFamily: font, fontWeight: 600 }}>Add a new petal</span>
            </div>
          )}
        </div>

        {/* FAB */}
        {goalTab === 'active' && (
          <div style={{ position: 'absolute', bottom: 90, right: 20, zIndex: 50 }}>
            <div style={{ width: 54, height: 54, background: `linear-gradient(135deg, ${c.primary}, ${c.purple})`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: `0 6px 24px ${c.primary}50` }}>
              {React.createElement(window.lucide.Plus, { size: 24, color: '#000' })}
            </div>
          </div>
        )}
      </div>
    );
  };

  // ── INSIGHTS SCREEN ───────────────────────────────────────────────────────────
  const InsightsScreen = () => {
    const score = 72;
    const maxBar = Math.max(...velocityData.map(d => d.pct));
    return (
      <div style={{ height: '100%', overflowY: 'auto', paddingBottom: 20 }}>
        <div style={{ padding: '14px 20px 10px' }}>
          <div style={{ color: c.text, fontSize: 22, fontFamily: font, fontWeight: 800 }}>Insights</div>
          <div style={{ color: c.textMid, fontSize: 12, fontFamily: font, marginTop: 3 }}>How your garden is growing</div>
        </div>

        {/* Bloom Score */}
        <div style={{ margin: '0 16px 14px', background: `linear-gradient(140deg, ${c.primaryBg}, #0C1835, ${c.purpleBg})`, border: `1px solid ${c.borderBright}`, borderRadius: 22, padding: '20px', display: 'flex', alignItems: 'center', gap: 20 }}>
          <Ring size={86} pct={score} color={c.primary} bg={c.primaryBg} sw={8}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ color: c.primary, fontSize: 20, fontFamily: font, fontWeight: 800 }}>{score}</div>
              <div style={{ color: c.textSub, fontSize: 9, fontFamily: font }}>/ 100</div>
            </div>
          </Ring>
          <div style={{ flex: 1 }}>
            <div style={{ color: c.textSub, fontSize: 10, fontFamily: font, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 4 }}>Bloom Score</div>
            <div style={{ color: c.text, fontSize: 19, fontFamily: font, fontWeight: 800 }}>Growing Well 🌿</div>
            <div style={{ color: c.textMid, fontSize: 12, fontFamily: font, lineHeight: 1.5, marginTop: 5 }}>Ahead of 68% of users your age. Fund 2 more petals to reach <span style={{ color: c.primary, fontWeight: 700 }}>Flourishing</span>.</div>
          </div>
        </div>

        {/* Savings velocity chart */}
        <div style={{ margin: '0 16px 14px', background: c.surface, border: `1px solid ${c.border}`, borderRadius: 22, padding: '18px 18px 14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div style={{ color: c.text, fontSize: 14, fontFamily: font, fontWeight: 700 }}>Savings Velocity</div>
            <Pill label="6 months" color={c.primary} bg={c.primaryBg} />
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 7, height: 70, paddingBottom: 4 }}>
            {velocityData.map((d, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
                <div style={{
                  width: '100%',
                  height: mounted ? `${(d.pct / maxBar) * 55}px` : '4px',
                  background: d.current ? `linear-gradient(to top, ${c.primary}, ${c.purple})` : `${c.primary}25`,
                  borderRadius: '5px 5px 2px 2px',
                  transition: 'height 0.7s cubic-bezier(0.34,1.56,0.64,1)',
                  transitionDelay: `${i * 0.06}s`,
                  border: d.current ? `1px solid ${c.primary}60` : 'none',
                  minHeight: 4,
                }} />
                <div style={{ color: d.current ? c.primary : c.textSub, fontSize: 9, fontFamily: font, fontWeight: d.current ? 700 : 400 }}>{d.month}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly snapshot */}
        <div style={{ margin: '0 16px 14px', display: 'flex', gap: 10 }}>
          {[
            { label: 'Protected', value: '$2,215', sub: 'this month', color: c.primary },
            { label: 'Upcoming', value: '$440', sub: 'in 30 days', color: c.gold },
            { label: 'Idle cash', value: '$380', sub: 'unallocated', color: c.purple },
          ].map((s, i) => (
            <div key={i} style={{ flex: 1, background: c.surface, border: `1px solid ${c.border}`, borderRadius: 16, padding: '12px 10px', textAlign: 'center' }}>
              <div style={{ color: s.color, fontSize: 16, fontFamily: font, fontWeight: 800 }}>{s.value}</div>
              <div style={{ color: c.textSub, fontSize: 9, fontFamily: font, marginTop: 3, lineHeight: 1.4 }}>{s.label}<br />{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Smart Predictions */}
        <div style={{ padding: '0 16px' }}>
          <div style={{ color: c.text, fontSize: 15, fontFamily: font, fontWeight: 700, marginBottom: 4 }}>Smart Predictions</div>
          <div style={{ color: c.textSub, fontSize: 12, fontFamily: font, marginBottom: 12 }}>Irregular expenses detected from your patterns</div>
          {predictions.map((p, i) => (
            <div key={i} style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 16, padding: '13px 14px', marginBottom: 9, display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 42, height: 42, background: c.surfaceAlt, borderRadius: 13, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 21, flexShrink: 0 }}>{p.emoji}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 }}>
                  <div style={{ color: c.text, fontSize: 13, fontFamily: font, fontWeight: 700 }}>{p.name}</div>
                  <div style={{ color: c.gold, fontSize: 13, fontFamily: font, fontWeight: 700 }}>{p.estimate}</div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ color: c.textSub, fontSize: 11, fontFamily: font }}>{p.when}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                    <div style={{ width: 40, height: 3, background: c.border, borderRadius: 99, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${p.confidence}%`, background: c.primary, borderRadius: 99 }} />
                    </div>
                    <div style={{ color: c.textSub, fontSize: 10, fontFamily: font }}>{p.confidence}%</div>
                  </div>
                </div>
              </div>
              <button style={{ background: c.primaryBg, border: `1px solid ${c.primary}40`, borderRadius: 10, padding: '6px 10px', color: c.primary, fontSize: 11, fontFamily: font, fontWeight: 700, cursor: 'pointer', flexShrink: 0 }}>
                + Petal
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ── BOTTOM NAV ────────────────────────────────────────────────────────────────
  const navTabs = [
    { key: 'garden',   label: 'Garden',   icon: 'Leaf' },
    { key: 'lifemap',  label: 'Life Map', icon: 'Calendar' },
    { key: 'goals',    label: 'Petals',   icon: 'Target' },
    { key: 'insights', label: 'Insights', icon: 'BarChart2' },
  ];

  // ── RENDER ────────────────────────────────────────────────────────────────────
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { display: none; }
        body { background: #020810; }
      `}</style>

      <div style={{ minHeight: '100vh', background: 'radial-gradient(ellipse 80% 60% at 50% 0%, #0a1f14 0%, #020810 70%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, fontFamily: font }}>
        <div style={{
          width: 375, height: 812,
          background: c.bg,
          borderRadius: 52,
          overflow: 'hidden',
          position: 'relative',
          boxShadow: `0 50px 100px rgba(0,0,0,0.8), 0 0 0 1px #1a2e22, 0 0 0 12px #080f0a, 0 0 0 13px #111a13`,
          flexShrink: 0,
        }}>

          {/* Status Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 30px 0', position: 'relative', zIndex: 30 }}>
            <div style={{ color: c.text, fontSize: 15, fontFamily: font, fontWeight: 700, letterSpacing: '-0.3px' }}>9:41</div>
            {/* Dynamic Island */}
            <div style={{ position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)', width: 126, height: 36, background: '#000', borderRadius: 22, zIndex: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#1a1a1a' }} />
              <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#111', border: '1px solid #222' }} />
            </div>
            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              {React.createElement(window.lucide.Signal, { size: 14, color: c.text })}
              {React.createElement(window.lucide.Wifi, { size: 14, color: c.text })}
              {React.createElement(window.lucide.Battery, { size: 15, color: c.text })}
            </div>
          </div>

          {/* Screen Content */}
          <div style={{ position: 'absolute', top: 58, bottom: 78, left: 0, right: 0, overflow: 'hidden' }}>
            {tab === 'garden'   && <GardenScreen />}
            {tab === 'lifemap'  && <LifeMapScreen />}
            {tab === 'goals'    && <GoalsScreen />}
            {tab === 'insights' && <InsightsScreen />}

            {selectedPetal && (
              <PetalSheet petal={selectedPetal} onClose={() => setSelectedPetal(null)} />
            )}
          </div>

          {/* Bottom Nav */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: 78,
            background: c.surface,
            borderTop: `1px solid ${c.border}`,
            display: 'flex', alignItems: 'center', justifyContent: 'space-around',
            padding: '0 4px 10px',
          }}>
            {navTabs.map(t => {
              const isActive = tab === t.key;
              const isPressed = pressedTab === t.key;
              const Icon = window.lucide[t.icon];
              return (
                <button
                  key={t.key}
                  onMouseDown={() => setPressedTab(t.key)}
                  onMouseUp={() => { setPressedTab(null); setTab(t.key); }}
                  onMouseLeave={() => setPressedTab(null)}
                  style={{
                    flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
                    background: 'none', border: 'none', cursor: 'pointer', padding: '10px 2px',
                    borderRadius: 14,
                    transform: isPressed ? 'scale(0.9)' : 'scale(1)',
                    transition: 'transform 0.12s ease',
                  }}
                >
                  <div style={{
                    width: 34, height: 34, borderRadius: 12,
                    background: isActive ? c.primaryBg : 'transparent',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 0.2s ease',
                    border: isActive ? `1px solid ${c.primary}40` : '1px solid transparent',
                  }}>
                    {Icon && React.createElement(Icon, { size: 19, color: isActive ? c.primary : c.textSub, strokeWidth: isActive ? 2.5 : 2 })}
                  </div>
                  <div style={{
                    color: isActive ? c.primary : c.textSub,
                    fontSize: 10, fontFamily: font,
                    fontWeight: isActive ? 700 : 500,
                    transition: 'color 0.2s',
                  }}>
                    {t.label}
                  </div>
                </button>
              );
            })}
          </div>

        </div>
      </div>
    </>
  );
}
