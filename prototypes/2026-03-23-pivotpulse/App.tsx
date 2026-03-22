const { useState, useEffect, useRef } = React;

const themes = {
  dark: {
    bg: '#08080F',
    surface: '#101018',
    card: '#161623',
    cardAlt: '#1C1C2E',
    primary: '#8B5CF6',
    primaryLight: '#A78BFA',
    primaryGlow: 'rgba(139,92,246,0.28)',
    primaryDim: 'rgba(139,92,246,0.12)',
    secondary: '#22D3EE',
    secondaryDim: 'rgba(34,211,238,0.12)',
    accent: '#F472B6',
    text: '#F0F0FF',
    textSecondary: '#9E9EC0',
    textMuted: '#52527A',
    border: '#1E1E32',
    borderMid: '#282840',
    success: '#34D399',
    successDim: 'rgba(52,211,153,0.12)',
    warning: '#FBBF24',
    warningDim: 'rgba(251,191,36,0.12)',
    danger: '#F87171',
    dangerDim: 'rgba(248,113,113,0.12)',
    inputBg: '#0C0C18',
    navBg: '#0C0C18',
    navBorder: '#1A1A2E',
  },
  light: {
    bg: '#EEEEFF',
    surface: '#FFFFFF',
    card: '#F8F7FF',
    cardAlt: '#F2F1FF',
    primary: '#7C3AED',
    primaryLight: '#8B5CF6',
    primaryGlow: 'rgba(124,58,237,0.2)',
    primaryDim: 'rgba(124,58,237,0.09)',
    secondary: '#0891B2',
    secondaryDim: 'rgba(8,145,178,0.09)',
    accent: '#DB2777',
    text: '#0C0B1A',
    textSecondary: '#6366F1',
    textMuted: '#9CA3AF',
    border: '#E2E0F5',
    borderMid: '#D0CEF0',
    success: '#059669',
    successDim: 'rgba(5,150,105,0.1)',
    warning: '#D97706',
    warningDim: 'rgba(217,119,6,0.1)',
    danger: '#DC2626',
    dangerDim: 'rgba(220,38,38,0.1)',
    inputBg: '#F5F4FF',
    navBg: '#FFFFFF',
    navBorder: '#E8E6F8',
  },
};

const sampleMeetings = [
  {
    id: 1,
    title: 'Q2 Pricing Strategy Review',
    ago: '1h ago',
    duration: '47 min',
    attendees: ['Sarah K.', 'Marcus T.', 'You'],
    decisions: 4,
    openItems: 2,
    deferred: 1,
    tags: ['pricing', 'strategy'],
    summary: 'Discussed enterprise tier adjustments. Competitive positioning vs Notion flagged. Pricing page redesign deferred to next sprint.',
  },
  {
    id: 2,
    title: 'Investor Update Prep',
    ago: '5h ago',
    duration: '32 min',
    attendees: ['Alex R.', 'You'],
    decisions: 3,
    openItems: 1,
    deferred: 0,
    tags: ['investor', 'deck'],
    summary: 'Q1 metrics confirmed. Slide order adjusted. Revenue chart needs update from finance team before Friday.',
  },
  {
    id: 3,
    title: 'Pipeline Review — West Coast',
    ago: '1d ago',
    duration: '58 min',
    attendees: ['James L.', 'Priya M.', 'Dan F.', 'You'],
    decisions: 7,
    openItems: 3,
    deferred: 2,
    tags: ['sales', 'pipeline'],
    summary: 'Acme Corp deal pushed to Q3. TechStart needs legal review. 3 reps need coaching on objection handling.',
  },
];

const sampleDecisions = [
  {
    id: 1,
    title: 'Finalize enterprise pricing at $299/seat',
    meeting: 'Q2 Pricing Strategy Review',
    owner: 'Sarah K.',
    deadline: 'Apr 2',
    status: 'open',
    priority: 'high',
    blockedBy: null,
    daysOpen: 0,
  },
  {
    id: 2,
    title: 'Update revenue chart with Q1 actuals',
    meeting: 'Investor Update Prep',
    owner: 'Alex R.',
    deadline: 'Mar 25',
    status: 'open',
    priority: 'high',
    blockedBy: 'Finance team',
    daysOpen: 0,
  },
  {
    id: 3,
    title: 'Schedule legal review for TechStart contract',
    meeting: 'Pipeline Review — West Coast',
    owner: 'Dan F.',
    deadline: 'Mar 28',
    status: 'open',
    priority: 'medium',
    blockedBy: null,
    daysOpen: 1,
  },
  {
    id: 4,
    title: 'Redesign pricing page for new enterprise tiers',
    meeting: 'Q2 Pricing Strategy Review',
    owner: 'Unassigned',
    deadline: 'Apr 15',
    status: 'deferred',
    priority: 'low',
    blockedBy: null,
    daysOpen: 0,
  },
  {
    id: 5,
    title: 'Send competitive analysis to board',
    meeting: 'Weekly Exec Sync',
    owner: 'You',
    deadline: 'Mar 22',
    status: 'deferred',
    priority: 'high',
    blockedBy: 'Missing data from Priya',
    daysOpen: 3,
  },
  {
    id: 6,
    title: 'Set up monthly investor email digest',
    meeting: 'Investor Update Prep',
    owner: 'You',
    deadline: 'Done',
    status: 'resolved',
    priority: 'medium',
    blockedBy: null,
    daysOpen: 0,
  },
  {
    id: 7,
    title: 'Assign West Coast reps to coaching tracks',
    meeting: 'Pipeline Review — West Coast',
    owner: 'James L.',
    deadline: 'Mar 30',
    status: 'resolved',
    priority: 'medium',
    blockedBy: null,
    daysOpen: 0,
  },
];

const timelineData = [
  {
    date: 'Mar 23',
    label: 'Today',
    items: [
      { title: 'Q2 Pricing Strategy Review', type: 'meeting', decisions: 4, open: 2 },
      { title: 'Investor Update Prep', type: 'meeting', decisions: 3, open: 1 },
    ],
  },
  {
    date: 'Mar 22',
    label: 'Yesterday',
    items: [
      { title: 'Pipeline Review — West Coast', type: 'meeting', decisions: 7, open: 3 },
      { title: 'Send competitive analysis to board', type: 'stuck', deferCount: 3 },
    ],
  },
  {
    date: 'Mar 20',
    label: 'Thursday',
    items: [
      { title: 'Product Roadmap Sync', type: 'meeting', decisions: 5, open: 0 },
      { title: 'Engineering Sprint Planning', type: 'meeting', decisions: 4, open: 1 },
    ],
  },
  {
    date: 'Mar 18',
    label: 'Tuesday',
    items: [
      { title: 'Customer Success Review', type: 'meeting', decisions: 3, open: 0 },
      { title: 'Weekly Exec Sync', type: 'meeting', decisions: 6, open: 2 },
    ],
  },
];

// ─── Shared helpers ─────────────────────────────────────────────────────────

function SectionBlock({ theme, label, color, bg, items }) {
  if (!items || !items.length) return null;
  return (
    <div style={{ background: bg, border: `1px solid ${color}30`, borderRadius: 12, padding: '10px 13px', marginBottom: 12 }}>
      <span style={{ fontSize: 10, fontWeight: 700, color, marginBottom: 6, display: 'block', letterSpacing: 0.5 }}>{label}</span>
      {items.map((item, i) => (
        <p key={i} style={{ fontSize: 12, color: theme.textSecondary, margin: i < items.length - 1 ? '0 0 5px' : 0, lineHeight: 1.55 }}>
          {item}
        </p>
      ))}
    </div>
  );
}

function ToggleRow({ label, sub, on: defaultOn, theme, isLast }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '13px 15px', borderBottom: isLast ? 'none' : `1px solid ${theme.border}` }}>
      <div style={{ flex: 1 }}>
        <p style={{ fontSize: 13, fontWeight: 600, color: theme.text, margin: 0 }}>{label}</p>
        <p style={{ fontSize: 11, color: theme.textMuted, margin: '2px 0 0' }}>{sub}</p>
      </div>
      <div
        onClick={() => setOn(!on)}
        style={{ width: 42, height: 24, borderRadius: 12, background: on ? theme.primary : theme.border, position: 'relative', cursor: 'pointer', transition: 'background 0.25s', flexShrink: 0 }}
      >
        <div style={{ width: 18, height: 18, borderRadius: 9, background: '#fff', position: 'absolute', top: 3, left: on ? 21 : 3, transition: 'left 0.25s', boxShadow: '0 1px 4px rgba(0,0,0,0.35)' }} />
      </div>
    </div>
  );
}

function SectionHeader({ label, theme }) {
  return <p style={{ fontSize: 10, fontWeight: 700, color: theme.textMuted, letterSpacing: 1, margin: '0 0 8px', textTransform: 'uppercase' }}>{label}</p>;
}

// ─── Status Bar ──────────────────────────────────────────────────────────────

function StatusBar({ theme }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 22px 0', color: theme.text, flexShrink: 0 }}>
      <span style={{ fontSize: 13, fontWeight: 700 }}>9:41</span>
      <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
        {React.createElement(window.lucide.Wifi, { size: 14, color: theme.text })}
        {React.createElement(window.lucide.Signal, { size: 14, color: theme.text })}
        {React.createElement(window.lucide.Battery, { size: 16, color: theme.text })}
      </div>
    </div>
  );
}

// ─── Home Screen ─────────────────────────────────────────────────────────────

function HomeScreen({ theme }) {
  const [pressedId, setPressedId] = useState(null);

  const statCards = [
    { label: 'Open', value: 6, color: theme.warning, bg: theme.warningDim, icon: window.lucide.AlertCircle },
    { label: 'Deferred', value: 2, color: theme.danger, bg: theme.dangerDim, icon: window.lucide.Pause },
    { label: 'Resolved', value: 14, color: theme.success, bg: theme.successDim, icon: window.lucide.CheckCircle2 },
  ];

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '14px 18px 8px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 18 }}>
        <div>
          <p style={{ fontSize: 11, color: theme.textMuted, margin: 0, letterSpacing: 0.8, fontWeight: 600 }}>MON, MAR 23</p>
          <h1 style={{ fontSize: 23, fontWeight: 800, color: theme.text, margin: '3px 0 0', lineHeight: 1.2 }}>
            Good afternoon,{' '}
            <span style={{ background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Jordan
            </span>
          </h1>
        </div>
        <div style={{ width: 40, height: 40, borderRadius: 20, background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <span style={{ fontSize: 16, fontWeight: 800, color: '#fff' }}>J</span>
        </div>
      </div>

      {/* Quick Capture CTA */}
      <div
        onMouseDown={() => setPressedId('cta')}
        onMouseUp={() => setPressedId(null)}
        onMouseLeave={() => setPressedId(null)}
        style={{
          background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
          borderRadius: 18,
          padding: '15px 18px',
          marginBottom: 18,
          cursor: 'pointer',
          transform: pressedId === 'cta' ? 'scale(0.97)' : 'scale(1)',
          transition: 'transform 0.15s',
          boxShadow: `0 10px 32px ${theme.primaryGlow}`,
          display: 'flex',
          alignItems: 'center',
          gap: 13,
        }}
      >
        <div style={{ width: 46, height: 46, borderRadius: 14, background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          {React.createElement(window.lucide.Mic, { size: 24, color: '#fff' })}
        </div>
        <div style={{ flex: 1 }}>
          <p style={{ color: '#fff', fontWeight: 800, fontSize: 15, margin: '0 0 2px' }}>New Capture</p>
          <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: 12, margin: 0 }}>Voice, transcript, or bullet points</p>
        </div>
        {React.createElement(window.lucide.ChevronRight, { size: 18, color: 'rgba(255,255,255,0.7)' })}
      </div>

      {/* Stats row */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
        {statCards.map(s => (
          <div key={s.label} style={{ flex: 1, background: theme.card, border: `1px solid ${theme.border}`, borderRadius: 14, padding: '12px 10px', textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 5 }}>
              {React.createElement(s.icon, { size: 15, color: s.color })}
            </div>
            <p style={{ fontSize: 22, fontWeight: 800, color: s.color, margin: 0, lineHeight: 1 }}>{s.value}</p>
            <p style={{ fontSize: 10, color: theme.textMuted, margin: '4px 0 0', fontWeight: 600 }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Recent Meetings */}
      <div style={{ marginBottom: 18 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <h2 style={{ fontSize: 14, fontWeight: 800, color: theme.text, margin: 0 }}>Recent Meetings</h2>
          <span style={{ fontSize: 12, color: theme.primary, fontWeight: 700 }}>See all</span>
        </div>
        {sampleMeetings.map(m => (
          <div
            key={m.id}
            onMouseDown={() => setPressedId(m.id)}
            onMouseUp={() => setPressedId(null)}
            onMouseLeave={() => setPressedId(null)}
            style={{
              background: theme.card,
              border: `1px solid ${theme.border}`,
              borderRadius: 15,
              padding: '13px 14px',
              marginBottom: 10,
              cursor: 'pointer',
              transform: pressedId === m.id ? 'scale(0.98)' : 'scale(1)',
              transition: 'transform 0.12s',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 7 }}>
              <div style={{ flex: 1, paddingRight: 8 }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: theme.text, margin: '0 0 2px' }}>{m.title}</p>
                <p style={{ fontSize: 11, color: theme.textMuted, margin: 0 }}>{m.ago} · {m.duration} · {m.attendees.length} people</p>
              </div>
              <div style={{ background: m.openItems > 0 ? theme.warningDim : theme.successDim, borderRadius: 8, padding: '3px 8px', flexShrink: 0 }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: m.openItems > 0 ? theme.warning : theme.success }}>
                  {m.openItems > 0 ? `${m.openItems} open` : 'clear'}
                </span>
              </div>
            </div>
            <p style={{ fontSize: 12, color: theme.textSecondary, margin: '0 0 10px', lineHeight: 1.55 }}>{m.summary}</p>
            <div style={{ display: 'flex', gap: 6 }}>
              {m.tags.map(t => (
                <span key={t} style={{ fontSize: 10, color: theme.primary, fontWeight: 700, background: theme.primaryDim, padding: '2px 8px', borderRadius: 10 }}>{t}</span>
              ))}
              <span style={{ fontSize: 10, color: theme.textMuted, marginLeft: 'auto', fontWeight: 600 }}>{m.decisions} decisions</span>
            </div>
          </div>
        ))}
      </div>

      {/* Stuck Items Alert */}
      <div style={{ background: theme.dangerDim, border: `1px solid ${theme.danger}35`, borderRadius: 15, padding: '13px 14px', marginBottom: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 8 }}>
          {React.createElement(window.lucide.AlertTriangle, { size: 14, color: theme.danger })}
          <span style={{ fontSize: 13, fontWeight: 800, color: theme.danger }}>Stuck Items (2)</span>
        </div>
        <p style={{ fontSize: 12, color: theme.textSecondary, margin: '0 0 10px', lineHeight: 1.5 }}>
          2 decisions deferred 3+ times. Review before your next sync.
        </p>
        <div style={{ background: theme.card, borderRadius: 11, padding: '10px 12px', cursor: 'pointer' }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: theme.text, margin: 0 }}>Send competitive analysis to board</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 4 }}>
            {React.createElement(window.lucide.Clock, { size: 11, color: theme.danger })}
            <p style={{ fontSize: 11, color: theme.danger, margin: 0, fontWeight: 600 }}>Deferred 3x · Missing data from Priya</p>
          </div>
        </div>
      </div>

      <div style={{ height: 8 }} />
    </div>
  );
}

// ─── Capture Screen ───────────────────────────────────────────────────────────

function CaptureScreen({ theme }) {
  const [mode, setMode] = useState('bullets');
  const [inputText, setInputText] = useState('');
  const [processing, setProcessing] = useState(false);
  const [processed, setProcessed] = useState(false);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    if (!processing) return;
    const t = setInterval(() => setRotation(r => r + 18), 50);
    return () => clearInterval(t);
  }, [processing]);

  const modes = [
    { id: 'voice', label: 'Voice', icon: window.lucide.Mic },
    { id: 'transcript', label: 'Transcript', icon: window.lucide.FileText },
    { id: 'bullets', label: 'Bullets', icon: window.lucide.List },
  ];

  const sampleBullets = `• Discussed Q2 pricing — Sarah wants $299/seat enterprise
• Marcus concerned about churn at higher price point
• Need competitive data from Priya by Friday Mar 28
• Pricing page redesign pushed to next sprint
• Follow up with legal on SLA terms this week`;

  const handleProcess = () => {
    if (!inputText.trim() && mode !== 'voice') return;
    setProcessing(true);
    setTimeout(() => { setProcessing(false); setProcessed(true); }, 2200);
  };

  const result = {
    title: 'Q2 Pricing Discussion',
    decided: ['Enterprise pricing set at $299/seat — Owner: Sarah K.'],
    actions: [
      { text: 'Get competitive pricing data from market', owner: 'Priya M.', deadline: 'Mar 28' },
      { text: 'Follow up with legal on SLA terms', owner: 'You', deadline: 'Mar 26' },
    ],
    deferred: ['Pricing page redesign (Next sprint)'],
    flags: ['Churn risk at $299 unresolved — needs further data before final sign-off'],
  };

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '14px 18px 8px' }}>
      <h1 style={{ fontSize: 22, fontWeight: 800, color: theme.text, margin: '0 0 16px' }}>New Capture</h1>

      {/* Mode selector */}
      <div style={{ display: 'flex', background: theme.card, border: `1px solid ${theme.border}`, borderRadius: 13, padding: 4, marginBottom: 16, gap: 3 }}>
        {modes.map(m => (
          <div
            key={m.id}
            onClick={() => { setMode(m.id); setProcessed(false); setInputText(''); }}
            style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5, padding: '8px 0', borderRadius: 10, cursor: 'pointer', background: mode === m.id ? theme.primary : 'transparent', transition: 'background 0.2s' }}
          >
            {React.createElement(m.icon, { size: 13, color: mode === m.id ? '#fff' : theme.textMuted })}
            <span style={{ fontSize: 12, fontWeight: 600, color: mode === m.id ? '#fff' : theme.textMuted }}>{m.label}</span>
          </div>
        ))}
      </div>

      {!processed ? (
        <>
          {mode === 'voice' ? (
            <div style={{ background: theme.card, border: `1px solid ${theme.border}`, borderRadius: 18, padding: '38px 20px', textAlign: 'center', marginBottom: 16 }}>
              <div style={{ position: 'relative', width: 80, height: 80, margin: '0 auto 16px' }}>
                <div style={{ position: 'absolute', inset: -8, borderRadius: 50, border: `2px solid ${theme.primary}30`, animation: 'none' }} />
                <div style={{ position: 'absolute', inset: -4, borderRadius: 50, border: `2px solid ${theme.primary}50` }} />
                <div style={{ width: 80, height: 80, borderRadius: 40, background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 0 32px ${theme.primaryGlow}` }}>
                  {React.createElement(window.lucide.Mic, { size: 32, color: '#fff' })}
                </div>
              </div>
              <p style={{ color: theme.text, fontSize: 14, fontWeight: 700, margin: '0 0 6px' }}>Tap to record</p>
              <p style={{ color: theme.textMuted, fontSize: 12, margin: 0 }}>Speak naturally — PivotPulse extracts decisions, owners, and next steps automatically</p>
            </div>
          ) : (
            <div style={{ marginBottom: 14 }}>
              <textarea
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                placeholder={mode === 'transcript' ? 'Paste your meeting transcript here...' : '• One bullet per decision or action item\n• Include names and deadlines if mentioned\n• Add context about blockers or risks'}
                style={{ width: '100%', height: 160, background: theme.inputBg, border: `1px solid ${theme.border}`, borderRadius: 14, padding: '13px 14px', color: theme.text, fontSize: 12, fontFamily: 'Plus Jakarta Sans, sans-serif', resize: 'none', outline: 'none', lineHeight: 1.65, boxSizing: 'border-box' }}
              />
              <button
                onClick={() => setInputText(sampleBullets)}
                style={{ fontSize: 11, color: theme.primary, background: 'none', border: 'none', cursor: 'pointer', padding: '3px 0', fontFamily: 'Plus Jakarta Sans', fontWeight: 700 }}
              >
                Load sample data
              </button>
            </div>
          )}

          <button
            onClick={handleProcess}
            disabled={processing}
            style={{ width: '100%', padding: '14px', background: processing ? theme.primaryDim : `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`, border: 'none', borderRadius: 14, color: processing ? theme.primary : '#fff', fontSize: 14, fontWeight: 700, fontFamily: 'Plus Jakarta Sans', cursor: processing ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: processing ? 'none' : `0 8px 24px ${theme.primaryGlow}` }}
          >
            {processing ? (
              <>
                <span style={{ display: 'inline-block', transform: `rotate(${rotation}deg)` }}>
                  {React.createElement(window.lucide.Loader, { size: 16, color: theme.primary })}
                </span>
                Extracting decisions...
              </>
            ) : (
              <>
                {React.createElement(window.lucide.Zap, { size: 16, color: '#fff' })}
                Extract Decision Brief
              </>
            )}
          </button>
        </>
      ) : (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14, background: theme.successDim, border: `1px solid ${theme.success}35`, borderRadius: 12, padding: '10px 13px' }}>
            {React.createElement(window.lucide.CheckCircle2, { size: 16, color: theme.success })}
            <span style={{ fontSize: 13, fontWeight: 700, color: theme.success }}>Decision brief ready</span>
          </div>

          <h2 style={{ fontSize: 16, fontWeight: 800, color: theme.text, margin: '0 0 14px' }}>{result.title}</h2>

          <SectionBlock theme={theme} label="DECIDED" color={theme.success} bg={theme.successDim} items={result.decided} />

          <div style={{ marginBottom: 13 }}>
            <span style={{ fontSize: 10, fontWeight: 700, color: theme.primary, background: theme.primaryDim, padding: '3px 9px', borderRadius: 8, letterSpacing: 0.5, display: 'inline-block', marginBottom: 9 }}>ACTION ITEMS</span>
            {result.actions.map((a, i) => (
              <div key={i} style={{ background: theme.card, border: `1px solid ${theme.border}`, borderRadius: 12, padding: '10px 13px', marginBottom: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 12, fontWeight: 700, color: theme.text, margin: '0 0 3px' }}>{a.text}</p>
                  <p style={{ fontSize: 11, color: theme.textMuted, margin: 0 }}>{a.owner}</p>
                </div>
                <span style={{ fontSize: 10, color: theme.warning, background: theme.warningDim, padding: '3px 8px', borderRadius: 8, fontWeight: 700, flexShrink: 0, marginLeft: 8 }}>{a.deadline}</span>
              </div>
            ))}
          </div>

          <SectionBlock theme={theme} label="DEFERRED" color={theme.textMuted} bg={theme.card} items={result.deferred} />
          <SectionBlock theme={theme} label="NEEDS ATTENTION" color={theme.warning} bg={theme.warningDim} items={result.flags} />

          <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
            <button style={{ flex: 1, padding: '12px', background: theme.card, border: `1px solid ${theme.border}`, borderRadius: 12, color: theme.text, fontSize: 12, fontWeight: 600, fontFamily: 'Plus Jakarta Sans', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
              {React.createElement(window.lucide.Share2, { size: 13, color: theme.primary })}
              Share
            </button>
            <button style={{ flex: 2, padding: '12px', background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`, border: 'none', borderRadius: 12, color: '#fff', fontSize: 12, fontWeight: 700, fontFamily: 'Plus Jakarta Sans', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, boxShadow: `0 4px 16px ${theme.primaryGlow}` }}>
              {React.createElement(window.lucide.Save, { size: 13, color: '#fff' })}
              Save to Decisions
            </button>
          </div>

          <button
            onClick={() => { setProcessed(false); setInputText(''); }}
            style={{ width: '100%', padding: '10px', background: 'none', border: 'none', color: theme.textMuted, fontSize: 12, fontFamily: 'Plus Jakarta Sans', cursor: 'pointer', marginTop: 6 }}
          >
            New capture
          </button>
        </div>
      )}

      <div style={{ height: 10 }} />
    </div>
  );
}

// ─── Decisions Screen ─────────────────────────────────────────────────────────

function DecisionsScreen({ theme }) {
  const [filter, setFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'open', label: 'Open' },
    { id: 'deferred', label: 'Deferred' },
    { id: 'resolved', label: 'Resolved' },
  ];

  const filtered = filter === 'all' ? sampleDecisions : sampleDecisions.filter(d => d.status === filter);

  const statusConfig = {
    open: { color: theme.warning, bg: theme.warningDim, label: 'Open' },
    deferred: { color: theme.danger, bg: theme.dangerDim, label: 'Deferred' },
    resolved: { color: theme.success, bg: theme.successDim, label: 'Done' },
  };

  const priorityDot = { high: theme.danger, medium: theme.warning, low: theme.textMuted };

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '14px 18px 8px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: theme.text, margin: 0 }}>Decisions</h1>
        <div style={{ background: theme.primaryDim, borderRadius: 9, padding: '5px 10px', display: 'flex', alignItems: 'center', gap: 5 }}>
          {React.createElement(window.lucide.Filter, { size: 13, color: theme.primary })}
          <span style={{ fontSize: 11, color: theme.primary, fontWeight: 700 }}>Sort</span>
        </div>
      </div>

      {/* Filter pills */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, overflowX: 'auto' }}>
        {filters.map(f => (
          <div
            key={f.id}
            onClick={() => setFilter(f.id)}
            style={{ padding: '6px 15px', borderRadius: 20, cursor: 'pointer', background: filter === f.id ? theme.primary : theme.card, border: `1px solid ${filter === f.id ? theme.primary : theme.border}`, flexShrink: 0, transition: 'background 0.2s' }}
          >
            <span style={{ fontSize: 12, fontWeight: 600, color: filter === f.id ? '#fff' : theme.textSecondary }}>{f.label}</span>
          </div>
        ))}
      </div>

      {filtered.map(d => {
        const sc = statusConfig[d.status];
        return (
          <div key={d.id} style={{ background: theme.card, border: `1px solid ${theme.border}`, borderRadius: 15, padding: '13px 14px', marginBottom: 10, borderLeft: `3px solid ${sc.color}`, cursor: 'pointer' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: theme.text, margin: 0, flex: 1, paddingRight: 10, lineHeight: 1.45 }}>{d.title}</p>
              <div style={{ background: sc.bg, borderRadius: 8, padding: '3px 8px', flexShrink: 0 }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: sc.color }}>{sc.label}</span>
              </div>
            </div>

            <p style={{ fontSize: 11, color: theme.textMuted, margin: '0 0 10px' }}>From: {d.meeting}</p>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  {React.createElement(window.lucide.User, { size: 11, color: theme.textMuted })}
                  <span style={{ fontSize: 11, color: d.owner === 'Unassigned' ? theme.danger : theme.textSecondary, fontWeight: d.owner === 'Unassigned' ? 700 : 400 }}>{d.owner}</span>
                </div>
                {d.deadline !== 'Done' && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    {React.createElement(window.lucide.Calendar, { size: 11, color: theme.textMuted })}
                    <span style={{ fontSize: 11, color: theme.textSecondary }}>{d.deadline}</span>
                  </div>
                )}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <div style={{ width: 6, height: 6, borderRadius: 3, background: priorityDot[d.priority] }} />
                <span style={{ fontSize: 10, color: theme.textMuted, textTransform: 'capitalize' }}>{d.priority}</span>
              </div>
            </div>

            {d.blockedBy && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 10, background: theme.warningDim, borderRadius: 9, padding: '7px 10px' }}>
                {React.createElement(window.lucide.AlertCircle, { size: 12, color: theme.warning })}
                <span style={{ fontSize: 11, color: theme.warning, fontWeight: 600 }}>Blocked: {d.blockedBy}</span>
              </div>
            )}
          </div>
        );
      })}

      <div style={{ height: 8 }} />
    </div>
  );
}

// ─── Timeline Screen ──────────────────────────────────────────────────────────

function TimelineScreen({ theme }) {
  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '14px 18px 8px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: theme.text, margin: 0 }}>Timeline</h1>
        <div style={{ background: theme.card, border: `1px solid ${theme.border}`, borderRadius: 9, padding: '5px 11px' }}>
          <span style={{ fontSize: 11, color: theme.textMuted, fontWeight: 600 }}>This week</span>
        </div>
      </div>

      {/* Summary strip */}
      <div style={{ background: `linear-gradient(135deg, ${theme.primary}18, ${theme.secondary}12)`, border: `1px solid ${theme.primary}28`, borderRadius: 16, padding: '14px 16px', marginBottom: 20, display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
        {[
          { val: 8, label: 'MEETINGS', color: theme.primary },
          { val: 26, label: 'DECISIONS', color: theme.warning },
          { val: 2, label: 'STUCK', color: theme.danger },
          { val: 14, label: 'RESOLVED', color: theme.success },
        ].map((s, i, arr) => (
          <React.Fragment key={s.label}>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: 22, fontWeight: 800, color: s.color, margin: 0 }}>{s.val}</p>
              <p style={{ fontSize: 9, color: theme.textMuted, margin: '3px 0 0', fontWeight: 700, letterSpacing: 0.5 }}>{s.label}</p>
            </div>
            {i < arr.length - 1 && <div style={{ width: 1, height: 34, background: theme.border }} />}
          </React.Fragment>
        ))}
      </div>

      {timelineData.map((day, di) => (
        <div key={di} style={{ marginBottom: 22 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <span style={{ fontSize: 12, fontWeight: 800, color: theme.primary }}>{day.label}</span>
            <span style={{ fontSize: 10, color: theme.textMuted }}>{day.date}</span>
            <div style={{ flex: 1, height: 1, background: theme.border }} />
          </div>

          {day.items.map((item, ii) => (
            <div key={ii} style={{ display: 'flex', alignItems: 'flex-start', gap: 11, marginBottom: 10 }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 5, flexShrink: 0 }}>
                <div style={{ width: 10, height: 10, borderRadius: 5, background: item.type === 'stuck' ? theme.danger : theme.primary, boxShadow: `0 0 8px ${item.type === 'stuck' ? theme.danger + '80' : theme.primary + '80'}` }} />
                {ii < day.items.length - 1 && <div style={{ width: 2, height: 28, background: theme.border, marginTop: 4 }} />}
              </div>

              <div style={{ flex: 1, background: theme.card, border: `1px solid ${item.type === 'stuck' ? theme.danger + '45' : theme.border}`, borderRadius: 13, padding: '10px 13px', cursor: 'pointer' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <p style={{ fontSize: 12, fontWeight: 700, color: theme.text, margin: 0, flex: 1, lineHeight: 1.45 }}>{item.title}</p>
                  {item.type === 'stuck' ? (
                    <span style={{ fontSize: 10, color: theme.danger, fontWeight: 700, background: theme.dangerDim, padding: '2px 7px', borderRadius: 8, flexShrink: 0, marginLeft: 8 }}>
                      x{item.deferCount} deferred
                    </span>
                  ) : (
                    <div style={{ display: 'flex', gap: 5, flexShrink: 0, marginLeft: 8 }}>
                      <span style={{ fontSize: 10, color: theme.primary, background: theme.primaryDim, padding: '2px 7px', borderRadius: 8, fontWeight: 700 }}>
                        {item.decisions}
                      </span>
                      {item.open > 0 && (
                        <span style={{ fontSize: 10, color: theme.warning, background: theme.warningDim, padding: '2px 7px', borderRadius: 8, fontWeight: 700 }}>
                          {item.open} open
                        </span>
                      )}
                    </div>
                  )}
                </div>
                {item.type === 'stuck' && (
                  <p style={{ fontSize: 11, color: theme.danger, margin: '5px 0 0', fontWeight: 600 }}>Needs resolution before next sync</p>
                )}
              </div>
            </div>
          ))}
        </div>
      ))}

      <div style={{ height: 8 }} />
    </div>
  );
}

// ─── Settings Screen ──────────────────────────────────────────────────────────

function SettingsScreen({ theme, toggleTheme, isDark }) {
  const integrations = [
    { name: 'Slack', status: 'connected', emoji: '💬' },
    { name: 'Gmail', status: 'connected', emoji: '📧' },
    { name: 'WhatsApp', status: 'disconnected', emoji: '💚' },
    { name: 'Notion', status: 'disconnected', emoji: '⬛' },
  ];

  const prefs = [
    { label: 'Auto-assign owners', sub: 'Based on names mentioned in meeting', on: true },
    { label: 'Deadline reminders', sub: '24h before due date', on: true },
    { label: 'Weekly digest email', sub: 'Summary of stuck decisions', on: false },
    { label: 'Team language learning', sub: 'Adapts to your team\'s terminology', on: true },
  ];

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '14px 18px 8px' }}>
      <h1 style={{ fontSize: 22, fontWeight: 800, color: theme.text, margin: '0 0 18px' }}>Settings</h1>

      {/* Profile card */}
      <div style={{ background: `linear-gradient(135deg, ${theme.primary}22, ${theme.secondary}14)`, border: `1px solid ${theme.primary}28`, borderRadius: 18, padding: '16px', marginBottom: 22, display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer' }}>
        <div style={{ width: 52, height: 52, borderRadius: 26, background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: `0 4px 16px ${theme.primaryGlow}` }}>
          <span style={{ fontSize: 20, fontWeight: 800, color: '#fff' }}>J</span>
        </div>
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: 15, fontWeight: 800, color: theme.text, margin: 0 }}>Jordan Rivera</p>
          <p style={{ fontSize: 11, color: theme.textMuted, margin: '3px 0 0' }}>jordan@pivotpulse.io · Founder</p>
        </div>
        {React.createElement(window.lucide.ChevronRight, { size: 16, color: theme.textMuted })}
      </div>

      {/* Theme toggle */}
      <SectionHeader label="Appearance" theme={theme} />
      <div style={{ background: theme.card, border: `1px solid ${theme.border}`, borderRadius: 14, padding: '13px 15px', marginBottom: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <p style={{ fontSize: 13, fontWeight: 600, color: theme.text, margin: 0 }}>Color Theme</p>
          <p style={{ fontSize: 11, color: theme.textMuted, margin: '2px 0 0' }}>{isDark ? 'Dark mode active' : 'Light mode active'}</p>
        </div>
        <div
          onClick={toggleTheme}
          style={{ display: 'flex', alignItems: 'center', gap: 8, background: isDark ? theme.primaryDim : theme.warningDim, border: `1px solid ${isDark ? theme.primary + '50' : theme.warning + '50'}`, borderRadius: 10, padding: '7px 13px', cursor: 'pointer' }}
        >
          {isDark
            ? React.createElement(window.lucide.Moon, { size: 14, color: theme.primary })
            : React.createElement(window.lucide.Sun, { size: 14, color: theme.warning })
          }
          <span style={{ fontSize: 12, fontWeight: 700, color: isDark ? theme.primary : theme.warning }}>{isDark ? 'Dark' : 'Light'}</span>
        </div>
      </div>

      {/* Integrations */}
      <SectionHeader label="Integrations" theme={theme} />
      <div style={{ background: theme.card, border: `1px solid ${theme.border}`, borderRadius: 14, overflow: 'hidden', marginBottom: 20 }}>
        {integrations.map((intg, i) => (
          <div key={intg.name} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '13px 15px', borderBottom: i < integrations.length - 1 ? `1px solid ${theme.border}` : 'none', cursor: 'pointer' }}>
            <span style={{ fontSize: 18, width: 24, textAlign: 'center' }}>{intg.emoji}</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: theme.text, flex: 1 }}>{intg.name}</span>
            <span style={{ fontSize: 10, fontWeight: 700, color: intg.status === 'connected' ? theme.success : theme.textMuted, background: intg.status === 'connected' ? theme.successDim : theme.cardAlt, border: `1px solid ${intg.status === 'connected' ? theme.success + '40' : theme.border}`, padding: '3px 9px', borderRadius: 8 }}>
              {intg.status === 'connected' ? 'Connected' : 'Connect'}
            </span>
          </div>
        ))}
      </div>

      {/* Preferences */}
      <SectionHeader label="Preferences" theme={theme} />
      <div style={{ background: theme.card, border: `1px solid ${theme.border}`, borderRadius: 14, overflow: 'hidden', marginBottom: 20 }}>
        {prefs.map((p, i) => (
          <ToggleRow key={p.label} {...p} theme={theme} isLast={i === prefs.length - 1} />
        ))}
      </div>

      {/* Danger zone */}
      <div style={{ background: theme.dangerDim, border: `1px solid ${theme.danger}30`, borderRadius: 14, padding: '13px 15px', marginBottom: 8, display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: theme.danger }}>Sign Out</span>
        {React.createElement(window.lucide.LogOut, { size: 14, color: theme.danger })}
      </div>

      <div style={{ height: 8 }} />
    </div>
  );
}

// ─── App Root ─────────────────────────────────────────────────────────────────

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isDark, setIsDark] = useState(true);

  const theme = isDark ? themes.dark : themes.light;
  const toggleTheme = () => setIsDark(prev => !prev);

  const tabs = [
    { id: 'home', label: 'Home', icon: window.lucide.Home },
    { id: 'capture', label: 'Capture', icon: window.lucide.Mic },
    { id: 'decisions', label: 'Decisions', icon: window.lucide.CheckSquare },
    { id: 'timeline', label: 'Timeline', icon: window.lucide.Clock },
    { id: 'settings', label: 'Settings', icon: window.lucide.Settings },
  ];

  const screens = {
    home: HomeScreen,
    capture: CaptureScreen,
    decisions: DecisionsScreen,
    timeline: TimelineScreen,
    settings: SettingsScreen,
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0F0F1A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 0px; background: transparent; }
        textarea { font-family: 'Plus Jakarta Sans', sans-serif; }
        textarea::placeholder { opacity: 0.45; }
        button { font-family: 'Plus Jakarta Sans', sans-serif; }
      `}</style>

      <div style={{ width: 375, height: 812, background: theme.bg, borderRadius: 50, overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 40px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.06)', transition: 'background 0.3s' }}>

        {/* Dynamic Island */}
        <div style={{ width: 124, height: 34, background: '#000', borderRadius: 18, margin: '12px auto 0', flexShrink: 0 }} />

        {/* Status bar */}
        <StatusBar theme={theme} />

        {/* Screen */}
        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
          {React.createElement(screens[activeTab], {
            theme,
            ...(activeTab === 'settings' ? { toggleTheme, isDark } : {}),
          })}
        </div>

        {/* Bottom nav */}
        <div style={{ background: theme.navBg, borderTop: `1px solid ${theme.navBorder}`, display: 'flex', justifyContent: 'space-around', paddingBottom: 18, paddingTop: 6, flexShrink: 0 }}>
          {tabs.map(tab => (
            <div
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, padding: '7px 12px', cursor: 'pointer', transition: 'opacity 0.2s' }}
            >
              {React.createElement(tab.icon, { size: 22, color: activeTab === tab.id ? theme.primary : theme.textMuted })}
              <span style={{ fontSize: 10, fontWeight: 600, color: activeTab === tab.id ? theme.primary : theme.textMuted }}>{tab.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
