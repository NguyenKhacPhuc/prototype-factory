function App() {
  const { useState, useEffect, useRef } = React;

  const [activeTab, setActiveTab] = useState('home');
  const [isDark, setIsDark] = useState(false);
  const [pressedBtn, setPressedBtn] = useState(null);
  const [time, setTime] = useState('09:41');
  const [showInterruptModal, setShowInterruptModal] = useState(false);
  const [interruptType, setInterruptType] = useState('call');
  const [interruptNote, setInterruptNote] = useState('');
  const [interruptions, setInterruptions] = useState([
    { id: 1, type: 'call', label: 'Client call – Acme Corp', time: '08:15', duration: 22, task: 'Finalize Q2 report', impact: 'high' },
    { id: 2, type: 'slack', label: 'Slack thread – deployment issue', time: '07:50', duration: 8, task: 'Morning planning', impact: 'medium' },
  ]);
  const [sprintActive, setSprintActive] = useState(false);
  const [sprintSeconds, setSprintSeconds] = useState(0);
  const [sprintTotal, setSprintTotal] = useState(15 * 60);
  const [sprintTask, setSprintTask] = useState('Finalize Q2 report introduction');
  const [selectedCard, setSelectedCard] = useState(null);
  const [replanTasks, setReplanTasks] = useState([
    { id: 1, title: 'Finalize Q2 report', time: '09:00', duration: 45, status: 'delayed', priority: 'high', canSlip: false },
    { id: 2, title: 'Team standup notes', time: '09:50', duration: 20, status: 'buffer', priority: 'medium', canSlip: true },
    { id: 3, title: 'Client proposal draft', time: '10:15', duration: 60, status: 'on-track', priority: 'high', canSlip: false },
    { id: 4, title: 'Review PRs', time: '11:20', duration: 30, status: 'can-slip', priority: 'low', canSlip: true },
    { id: 5, title: 'Lunch break', time: '12:00', duration: 45, status: 'buffer', priority: 'low', canSlip: false },
    { id: 6, title: 'Call with design team', time: '13:00', duration: 30, status: 'on-track', priority: 'medium', canSlip: false },
  ]);

  const themes = {
    light: {
      bg: '#F0EEFF',
      surface: '#FFFFFF',
      surface2: '#F5F3FF',
      primary: '#6C63FF',
      primaryLight: '#EDE9FF',
      primaryDark: '#5A52E0',
      secondary: '#10B981',
      secondaryLight: '#D1FAE5',
      accent: '#F59E0B',
      accentLight: '#FEF3C7',
      danger: '#EF4444',
      dangerLight: '#FEE2E2',
      text: '#1E1B4B',
      textMid: '#6B7280',
      textLight: '#9CA3AF',
      border: '#E5E0FF',
      card: '#FFFFFF',
      navBg: '#FFFFFF',
      statusBar: '#6C63FF',
      shadow: 'rgba(108,99,255,0.12)',
    },
    dark: {
      bg: '#0B0A1A',
      surface: '#16142A',
      surface2: '#1E1C34',
      primary: '#8B83FF',
      primaryLight: '#2A2550',
      primaryDark: '#A09AFF',
      secondary: '#34D399',
      secondaryLight: '#064E3B',
      accent: '#FBBF24',
      accentLight: '#451A03',
      danger: '#F87171',
      dangerLight: '#450A0A',
      text: '#EDE9FF',
      textMid: '#9CA3AF',
      textLight: '#6B7280',
      border: '#2A2550',
      card: '#1E1C34',
      navBg: '#16142A',
      statusBar: '#16142A',
      shadow: 'rgba(0,0,0,0.4)',
    },
  };

  const t = isDark ? themes.dark : themes.light;

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
      * { box-sizing: border-box; margin: 0; padding: 0; }
      ::-webkit-scrollbar { width: 0px; }
      body { background: #e8e8e8; display: flex; justify-content: center; align-items: center; min-height: 100vh; font-family: 'Space Grotesk', sans-serif; }
      input, textarea { font-family: 'Space Grotesk', sans-serif; outline: none; border: none; background: transparent; }
      .press-anim:active { transform: scale(0.96); }
    `;
    document.head.appendChild(style);
  }, []);

  useEffect(() => {
    const iv = setInterval(() => {
      const now = new Date();
      const h = now.getHours().toString().padStart(2, '0');
      const m = now.getMinutes().toString().padStart(2, '0');
      setTime(`${h}:${m}`);
    }, 15000);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    let iv;
    if (sprintActive && sprintSeconds < sprintTotal) {
      iv = setInterval(() => setSprintSeconds(s => s + 1), 1000);
    } else if (sprintSeconds >= sprintTotal) {
      setSprintActive(false);
    }
    return () => clearInterval(iv);
  }, [sprintActive, sprintSeconds, sprintTotal]);

  const press = (id) => { setPressedBtn(id); setTimeout(() => setPressedBtn(null), 180); };

  const fmtTime = (s) => {
    const m = Math.floor((sprintTotal - s) / 60);
    const sec = (sprintTotal - s) % 60;
    return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  const sprintPct = sprintSeconds / sprintTotal;

  const logInterrupt = () => {
    const types = { call: 'Call', slack: 'Slack/Chat', meeting: 'Meeting', email: 'Email', other: 'Other' };
    const newInt = {
      id: Date.now(),
      type: interruptType,
      label: interruptNote || `${types[interruptType]} interruption`,
      time: time,
      duration: 15,
      task: 'Current work block',
      impact: 'medium',
    };
    setInterruptions(prev => [newInt, ...prev]);
    setShowInterruptModal(false);
    setInterruptNote('');
  };

  const reentryCards = [
    {
      id: 1,
      task: 'Finalize Q2 report',
      context: 'Writing the executive summary. Data from finance team confirmed. Need to add risk section (pg 4) and finalize chart on slide 7.',
      lastEdited: '22 min ago',
      nextStep: 'Open slide 7 → update revenue chart with Q2 actuals from finance_q2.xlsx',
      tags: ['High priority', 'Due today'],
      color: t.danger,
    },
    {
      id: 2,
      task: 'Client proposal draft',
      context: 'Section 2 (pricing) left incomplete. Waiting on Marcus for the enterprise tier discount. Intro and scope sections done.',
      lastEdited: '1h 14min ago',
      nextStep: 'Ping Marcus on Slack → then complete Section 2 pricing table',
      tags: ['High priority', 'Due Friday'],
      color: t.primary,
    },
    {
      id: 3,
      task: 'Review PRs',
      context: 'Three PRs queued: auth-refactor (complex), icon-update (quick), and CI fix (urgent). CI fix should go first.',
      lastEdited: '2h ago',
      nextStep: 'Open GitHub → merge CI fix PR #142 first (5 min)',
      tags: ['Low priority', 'Can delegate'],
      color: t.secondary,
    },
  ];

  const interruptIcons = {
    call: window.lucide && React.createElement(window.lucide.Phone, { size: 14 }),
    slack: window.lucide && React.createElement(window.lucide.MessageCircle, { size: 14 }),
    meeting: window.lucide && React.createElement(window.lucide.Users, { size: 14 }),
    email: window.lucide && React.createElement(window.lucide.Mail, { size: 14 }),
    other: window.lucide && React.createElement(window.lucide.Zap, { size: 14 }),
  };

  const impactColors = {
    high: t.danger,
    medium: t.accent,
    low: t.secondary,
  };

  const statusColors = {
    delayed: t.danger,
    buffer: t.accent,
    'on-track': t.secondary,
    'can-slip': t.textMid,
  };

  const statusLabels = {
    delayed: 'Delayed',
    buffer: 'Buffer',
    'on-track': 'On Track',
    'can-slip': 'Can Slip',
  };

  // ─── STATUS BAR ───
  const StatusBar = () => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 20px 4px', background: t.surface }}>
      <span style={{ fontSize: 13, fontWeight: 600, color: t.text }}>{time}</span>
      <div style={{ width: 120, height: 28, background: '#000', borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#333', marginRight: 6 }} />
        <div style={{ width: 60, height: 8, borderRadius: 4, background: '#222' }} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        {window.lucide && React.createElement(window.lucide.Wifi, { size: 14, color: t.text })}
        {window.lucide && React.createElement(window.lucide.Battery, { size: 14, color: t.text })}
      </div>
    </div>
  );

  // ─── NAV BAR ───
  const NavBar = () => {
    const tabs = [
      { id: 'home', icon: window.lucide && window.lucide.Home, label: 'Today' },
      { id: 'catch', icon: window.lucide && window.lucide.Zap, label: 'Catch' },
      { id: 'replan', icon: window.lucide && window.lucide.RefreshCw, label: 'Replan' },
      { id: 'cards', icon: window.lucide && window.lucide.Layers, label: 'Cards' },
      { id: 'sprint', icon: window.lucide && window.lucide.Timer, label: 'Sprint' },
    ];
    return (
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: t.navBg, borderTop: `1px solid ${t.border}`, padding: '8px 4px 20px', display: 'flex', justifyContent: 'space-around' }}>
        {tabs.map(tab => {
          const active = activeTab === tab.id;
          return (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, padding: '4px 10px', borderRadius: 12, transition: 'all 0.2s', transform: pressedBtn === `nav-${tab.id}` ? 'scale(0.92)' : 'scale(1)' }} onMouseDown={() => press(`nav-${tab.id}`)}>
              <div style={{ width: 32, height: 32, borderRadius: 10, background: active ? t.primaryLight : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}>
                {tab.icon && React.createElement(tab.icon, { size: 18, color: active ? t.primary : t.textLight, strokeWidth: active ? 2.5 : 2 })}
              </div>
              <span style={{ fontSize: 10, fontWeight: active ? 600 : 400, color: active ? t.primary : t.textLight, letterSpacing: 0.2 }}>{tab.label}</span>
            </button>
          );
        })}
      </div>
    );
  };

  // ─── HOME SCREEN ───
  const HomeScreen = () => {
    const todayTasks = [
      { id: 1, title: 'Finalize Q2 report', time: '09:00', done: false, priority: 'high', interrupted: true },
      { id: 2, title: 'Team standup', time: '09:50', done: true, priority: 'medium', interrupted: false },
      { id: 3, title: 'Client proposal draft', time: '10:15', done: false, priority: 'high', interrupted: false },
      { id: 4, title: 'Review PRs', time: '11:20', done: false, priority: 'low', interrupted: false },
      { id: 5, title: 'Call with design team', time: '13:00', done: false, priority: 'medium', interrupted: false },
    ];

    return (
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 90 }}>
        {/* Header */}
        <div style={{ background: `linear-gradient(135deg, ${t.primary} 0%, ${t.primaryDark} 100%)`, padding: '16px 20px 24px', borderRadius: '0 0 28px 28px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -30, right: -30, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
          <div style={{ position: 'absolute', bottom: -20, left: 20, width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
            <div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', fontWeight: 500, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 2 }}>Sunday, Mar 22</div>
              <div style={{ fontSize: 22, color: '#fff', fontWeight: 700 }}>Good morning, Alex</div>
            </div>
            <button onClick={() => setIsDark(!isDark)} style={{ background: 'rgba(255,255,255,0.18)', border: 'none', borderRadius: 12, width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              {isDark ? (window.lucide && React.createElement(window.lucide.Sun, { size: 16, color: '#fff' })) : (window.lucide && React.createElement(window.lucide.Moon, { size: 16, color: '#fff' }))}
            </button>
          </div>
          {/* Interruption stats */}
          <div style={{ display: 'flex', gap: 10 }}>
            <div style={{ flex: 1, background: 'rgba(255,255,255,0.15)', borderRadius: 14, padding: '10px 12px' }}>
              <div style={{ fontSize: 22, fontWeight: 700, color: '#fff' }}>{interruptions.length}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.75)' }}>Interruptions today</div>
            </div>
            <div style={{ flex: 1, background: 'rgba(255,255,255,0.15)', borderRadius: 14, padding: '10px 12px' }}>
              <div style={{ fontSize: 22, fontWeight: 700, color: '#fff' }}>37 min</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.75)' }}>Time lost</div>
            </div>
            <div style={{ flex: 1, background: 'rgba(255,255,255,0.15)', borderRadius: 14, padding: '10px 12px' }}>
              <div style={{ fontSize: 22, fontWeight: 700, color: '#fff' }}>3/5</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.75)' }}>Tasks on track</div>
            </div>
          </div>
        </div>

        <div style={{ padding: '16px 16px 0' }}>
          {/* Catch interruption CTA */}
          <button onClick={() => setShowInterruptModal(true)} onMouseDown={() => press('catch-cta')} style={{ width: '100%', background: `linear-gradient(135deg, ${t.danger} 0%, #C0392B 100%)`, border: 'none', borderRadius: 16, padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', marginBottom: 16, transform: pressedBtn === 'catch-cta' ? 'scale(0.98)' : 'scale(1)', transition: 'transform 0.15s', boxShadow: `0 4px 16px ${t.danger}44` }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {window.lucide && React.createElement(window.lucide.Zap, { size: 18, color: '#fff', fill: '#fff' })}
            </div>
            <div style={{ flex: 1, textAlign: 'left' }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>Log Interruption</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.8)' }}>Tap to catch a disruption now</div>
            </div>
            {window.lucide && React.createElement(window.lucide.ChevronRight, { size: 18, color: 'rgba(255,255,255,0.7)' })}
          </button>

          {/* Current focus */}
          <div style={{ background: t.surface, borderRadius: 18, padding: 16, marginBottom: 14, border: `1px solid ${t.border}`, boxShadow: `0 2px 12px ${t.shadow}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: t.primary, textTransform: 'uppercase', letterSpacing: 1 }}>Current Focus</span>
              <span style={{ fontSize: 11, color: t.textMid, background: t.surface2, padding: '3px 8px', borderRadius: 20 }}>In progress</span>
            </div>
            <div style={{ fontSize: 16, fontWeight: 700, color: t.text, marginBottom: 6 }}>Finalize Q2 report</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
              {window.lucide && React.createElement(window.lucide.AlertCircle, { size: 13, color: t.danger })}
              <span style={{ fontSize: 12, color: t.danger, fontWeight: 500 }}>Interrupted 22 min ago — needs recovery</span>
            </div>
            <div style={{ height: 6, background: t.surface2, borderRadius: 3, marginBottom: 8, overflow: 'hidden' }}>
              <div style={{ width: '42%', height: '100%', background: `linear-gradient(90deg, ${t.primary}, ${t.primaryDark})`, borderRadius: 3 }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 11, color: t.textMid }}>42% complete</span>
              <span style={{ fontSize: 11, color: t.textMid }}>~26 min remaining</span>
            </div>
          </div>

          {/* Today's tasks */}
          <div style={{ marginBottom: 8 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: t.textMid, marginBottom: 10, textTransform: 'uppercase', letterSpacing: 1 }}>Today's Schedule</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {todayTasks.map(task => (
                <div key={task.id} style={{ background: t.surface, borderRadius: 14, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 12, border: `1px solid ${task.interrupted ? t.dangerLight : t.border}`, opacity: task.done ? 0.55 : 1 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: task.done ? t.textLight : (task.priority === 'high' ? t.danger : task.priority === 'medium' ? t.accent : t.secondary), flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: t.text, textDecoration: task.done ? 'line-through' : 'none', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{task.title}</div>
                    <div style={{ fontSize: 11, color: t.textMid }}>{task.time}</div>
                  </div>
                  {task.interrupted && (
                    <div style={{ background: t.dangerLight, padding: '2px 8px', borderRadius: 20 }}>
                      <span style={{ fontSize: 10, color: t.danger, fontWeight: 600 }}>DISRUPTED</span>
                    </div>
                  )}
                  {task.done && window.lucide && React.createElement(window.lucide.CheckCircle2, { size: 16, color: t.secondary })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ─── CATCH SCREEN ───
  const CatchScreen = () => {
    const typeOptions = [
      { id: 'call', label: 'Call', icon: window.lucide && window.lucide.Phone },
      { id: 'slack', label: 'Chat', icon: window.lucide && window.lucide.MessageCircle },
      { id: 'meeting', label: 'Meeting', icon: window.lucide && window.lucide.Users },
      { id: 'email', label: 'Email', icon: window.lucide && window.lucide.Mail },
      { id: 'other', label: 'Other', icon: window.lucide && window.lucide.Zap },
    ];

    return (
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 90 }}>
        <div style={{ padding: '16px 16px 0' }}>
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 20, fontWeight: 700, color: t.text }}>Interruption Catch</div>
            <div style={{ fontSize: 13, color: t.textMid, marginTop: 2 }}>Tag disruptions as they happen. We'll track the impact.</div>
          </div>

          {/* Quick log card */}
          <div style={{ background: t.surface, borderRadius: 20, padding: 16, marginBottom: 16, border: `1px solid ${t.border}`, boxShadow: `0 2px 12px ${t.shadow}` }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: t.text, marginBottom: 12 }}>Quick Log</div>
            <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
              {typeOptions.map(opt => (
                <button key={opt.id} onClick={() => setInterruptType(opt.id)} style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '7px 12px', borderRadius: 20, border: `1.5px solid ${interruptType === opt.id ? t.primary : t.border}`, background: interruptType === opt.id ? t.primaryLight : t.surface2, cursor: 'pointer', transition: 'all 0.2s' }}>
                  {opt.icon && React.createElement(opt.icon, { size: 13, color: interruptType === opt.id ? t.primary : t.textMid })}
                  <span style={{ fontSize: 12, fontWeight: 500, color: interruptType === opt.id ? t.primary : t.textMid }}>{opt.label}</span>
                </button>
              ))}
            </div>
            <input
              value={interruptNote}
              onChange={e => setInterruptNote(e.target.value)}
              placeholder="Describe the interruption..."
              style={{ width: '100%', padding: '10px 12px', background: t.surface2, borderRadius: 12, fontSize: 13, color: t.text, marginBottom: 12, border: `1px solid ${t.border}` }}
            />
            <button onClick={logInterrupt} onMouseDown={() => press('log-btn')} style={{ width: '100%', background: `linear-gradient(135deg, ${t.danger}, #C0392B)`, border: 'none', borderRadius: 12, padding: '12px', fontSize: 14, fontWeight: 700, color: '#fff', cursor: 'pointer', transform: pressedBtn === 'log-btn' ? 'scale(0.97)' : 'scale(1)', transition: 'transform 0.15s', boxShadow: `0 4px 14px ${t.danger}44` }}>
              Catch This Interruption
            </button>
          </div>

          {/* Interruption history */}
          <div style={{ fontSize: 13, fontWeight: 600, color: t.textMid, marginBottom: 10, textTransform: 'uppercase', letterSpacing: 1 }}>Today's Disruptions</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {interruptions.map(item => (
              <div key={item.id} style={{ background: t.surface, borderRadius: 16, padding: '14px 14px', border: `1px solid ${t.border}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 30, height: 30, borderRadius: 10, background: `${impactColors[item.impact]}22`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {interruptIcons[item.type]}
                    </div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: t.text }}>{item.label}</div>
                      <div style={{ fontSize: 11, color: t.textMid }}>{item.time} · {item.duration} min</div>
                    </div>
                  </div>
                  <div style={{ background: `${impactColors[item.impact]}22`, padding: '3px 8px', borderRadius: 20 }}>
                    <span style={{ fontSize: 10, fontWeight: 600, color: impactColors[item.impact], textTransform: 'uppercase' }}>{item.impact}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: t.surface2, borderRadius: 10, padding: '7px 10px' }}>
                  {window.lucide && React.createElement(window.lucide.CornerDownRight, { size: 12, color: t.textMid })}
                  <span style={{ fontSize: 11, color: t.textMid }}>Disrupted: <span style={{ fontWeight: 600, color: t.text }}>{item.task}</span></span>
                </div>
              </div>
            ))}
          </div>

          {interruptions.length === 0 && (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: t.textLight }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>🎉</div>
              <div style={{ fontSize: 15, fontWeight: 600 }}>No interruptions yet!</div>
              <div style={{ fontSize: 13, marginTop: 4 }}>Keep it up — uninterrupted time is golden.</div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // ─── REPLAN SCREEN ───
  const ReplanScreen = () => {
    const [expanded, setExpanded] = useState(null);

    return (
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 90 }}>
        <div style={{ padding: '16px 16px 0' }}>
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 20, fontWeight: 700, color: t.text }}>Recovery Replanner</div>
            <div style={{ fontSize: 13, color: t.textMid, marginTop: 2 }}>Your afternoon, rebuilt around reality.</div>
          </div>

          {/* Recovery summary */}
          <div style={{ background: `linear-gradient(135deg, ${t.primary}22, ${t.primaryLight})`, borderRadius: 18, padding: 16, marginBottom: 14, border: `1px solid ${t.border}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              {window.lucide && React.createElement(window.lucide.Sparkles, { size: 16, color: t.primary })}
              <span style={{ fontSize: 13, fontWeight: 700, color: t.primary }}>Delay Decoder</span>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <div style={{ flex: 1, background: t.surface, borderRadius: 12, padding: '10px 12px', textAlign: 'center' }}>
                <div style={{ fontSize: 18, fontWeight: 700, color: t.danger }}>2</div>
                <div style={{ fontSize: 10, color: t.textMid }}>Can't slip</div>
              </div>
              <div style={{ flex: 1, background: t.surface, borderRadius: 12, padding: '10px 12px', textAlign: 'center' }}>
                <div style={{ fontSize: 18, fontWeight: 700, color: t.secondary }}>2</div>
                <div style={{ fontSize: 10, color: t.textMid }}>Can slip</div>
              </div>
              <div style={{ flex: 1, background: t.surface, borderRadius: 12, padding: '10px 12px', textAlign: 'center' }}>
                <div style={{ fontSize: 18, fontWeight: 700, color: t.accent }}>2</div>
                <div style={{ fontSize: 10, color: t.textMid }}>Buffers</div>
              </div>
            </div>
          </div>

          {/* Least friction next step */}
          <div style={{ background: t.surface, borderRadius: 16, padding: '12px 14px', marginBottom: 14, border: `1.5px solid ${t.secondary}`, boxShadow: `0 2px 12px ${t.secondary}22` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
              {window.lucide && React.createElement(window.lucide.ArrowRight, { size: 14, color: t.secondary })}
              <span style={{ fontSize: 11, fontWeight: 700, color: t.secondary, textTransform: 'uppercase', letterSpacing: 1 }}>Least-Friction Next Step</span>
            </div>
            <div style={{ fontSize: 14, fontWeight: 600, color: t.text }}>Open Q2 report → skip to slide 7 → update chart (5 min)</div>
            <div style={{ fontSize: 12, color: t.textMid, marginTop: 4 }}>This unblocks everything downstream.</div>
          </div>

          {/* Task list */}
          <div style={{ fontSize: 13, fontWeight: 600, color: t.textMid, marginBottom: 10, textTransform: 'uppercase', letterSpacing: 1 }}>Rescheduled Timeline</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {replanTasks.map((task, i) => (
              <div key={task.id}>
                <button onClick={() => setExpanded(expanded === task.id ? null : task.id)} style={{ width: '100%', background: t.surface, borderRadius: 14, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10, border: `1px solid ${task.status === 'delayed' ? t.danger + '44' : t.border}`, cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s' }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: t.textMid, minWidth: 42 }}>{task.time}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: t.text, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{task.title}</div>
                    <div style={{ fontSize: 11, color: t.textMid }}>{task.duration} min</div>
                  </div>
                  <div style={{ padding: '3px 8px', borderRadius: 20, background: `${statusColors[task.status]}22` }}>
                    <span style={{ fontSize: 10, fontWeight: 600, color: statusColors[task.status] }}>{statusLabels[task.status]}</span>
                  </div>
                </button>
                {expanded === task.id && (
                  <div style={{ background: t.surface2, borderRadius: '0 0 14px 14px', padding: '10px 14px', marginTop: -4, border: `1px solid ${t.border}`, borderTop: 'none' }}>
                    {task.canSlip ? (
                      <div style={{ fontSize: 12, color: t.textMid }}>
                        {window.lucide && React.createElement(window.lucide.ArrowDownRight, { size: 13, color: t.secondary, style: { marginRight: 4 } })}
                        This task can be pushed to tomorrow. Delegation option available.
                      </div>
                    ) : (
                      <div style={{ fontSize: 12, color: t.danger }}>
                        This task is time-sensitive and cannot slip today.
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // ─── CARDS SCREEN ───
  const CardsScreen = () => (
    <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 90 }}>
      <div style={{ padding: '16px 16px 0' }}>
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: t.text }}>Re-entry Cards</div>
          <div style={{ fontSize: 13, color: t.textMid, marginTop: 2 }}>Pick up exactly where you left off — no re-reading needed.</div>
        </div>

        {selectedCard ? (
          <div style={{ background: t.surface, borderRadius: 20, padding: 18, border: `1.5px solid ${reentryCards.find(c => c.id === selectedCard)?.color}44`, boxShadow: `0 4px 20px ${reentryCards.find(c => c.id === selectedCard)?.color}22` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: t.text }}>{reentryCards.find(c => c.id === selectedCard)?.task}</div>
              <button onClick={() => setSelectedCard(null)} style={{ background: t.surface2, border: 'none', borderRadius: 10, width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                {window.lucide && React.createElement(window.lucide.X, { size: 14, color: t.textMid })}
              </button>
            </div>

            <div style={{ display: 'flex', gap: 6, marginBottom: 14, flexWrap: 'wrap' }}>
              {reentryCards.find(c => c.id === selectedCard)?.tags.map(tag => (
                <span key={tag} style={{ fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 20, background: t.primaryLight, color: t.primary }}>{tag}</span>
              ))}
            </div>

            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: t.textMid, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>Context Snapshot</div>
              <div style={{ fontSize: 13, color: t.text, lineHeight: 1.6, background: t.surface2, borderRadius: 12, padding: 12 }}>
                {reentryCards.find(c => c.id === selectedCard)?.context}
              </div>
            </div>

            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: t.textMid, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>Next Step</div>
              <div style={{ background: `${reentryCards.find(c => c.id === selectedCard)?.color}15`, borderRadius: 12, padding: 12, border: `1px solid ${reentryCards.find(c => c.id === selectedCard)?.color}33`, display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                {window.lucide && React.createElement(window.lucide.ArrowRight, { size: 14, color: reentryCards.find(c => c.id === selectedCard)?.color, style: { marginTop: 2, flexShrink: 0 } })}
                <span style={{ fontSize: 13, fontWeight: 600, color: t.text }}>{reentryCards.find(c => c.id === selectedCard)?.nextStep}</span>
              </div>
            </div>

            <button onMouseDown={() => press('start-here')} style={{ width: '100%', background: reentryCards.find(c => c.id === selectedCard)?.color, border: 'none', borderRadius: 14, padding: '13px', fontSize: 14, fontWeight: 700, color: '#fff', cursor: 'pointer', transform: pressedBtn === 'start-here' ? 'scale(0.97)' : 'scale(1)', transition: 'transform 0.15s' }}>
              Start Here →
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {reentryCards.map(card => (
              <button key={card.id} onClick={() => setSelectedCard(card.id)} onMouseDown={() => press(`card-${card.id}`)} style={{ background: t.surface, borderRadius: 18, padding: '14px 16px', border: `1px solid ${t.border}`, cursor: 'pointer', textAlign: 'left', transform: pressedBtn === `card-${card.id}` ? 'scale(0.97)' : 'scale(1)', transition: 'transform 0.15s', boxShadow: `0 2px 8px ${t.shadow}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                  <div style={{ flex: 1, minWidth: 0, marginRight: 10 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: t.text, marginBottom: 2 }}>{card.task}</div>
                    <div style={{ fontSize: 12, color: t.textMid }}>Last edited {card.lastEdited}</div>
                  </div>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: card.color, flexShrink: 0, marginTop: 4 }} />
                </div>
                <div style={{ fontSize: 12, color: t.textMid, lineHeight: 1.5, marginBottom: 10, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{card.context}</div>
                <div style={{ background: t.surface2, borderRadius: 10, padding: '8px 10px', display: 'flex', alignItems: 'center', gap: 6 }}>
                  {window.lucide && React.createElement(window.lucide.ArrowRight, { size: 12, color: card.color })}
                  <span style={{ fontSize: 11, fontWeight: 600, color: t.text, flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{card.nextStep}</span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  // ─── SPRINT SCREEN ───
  const SprintScreen = () => {
    const durations = [5, 10, 15, 20, 25];
    const radius = 90;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference * (1 - sprintPct);

    return (
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 90 }}>
        <div style={{ padding: '16px 16px 0' }}>
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 20, fontWeight: 700, color: t.text }}>Focus Sprint</div>
            <div style={{ fontSize: 13, color: t.textMid, marginTop: 2 }}>One action. Full focus. Then breathe.</div>
          </div>

          {/* Timer ring */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: t.surface, borderRadius: 24, padding: '28px 20px 22px', marginBottom: 14, border: `1px solid ${t.border}`, boxShadow: `0 4px 20px ${t.shadow}` }}>
            <div style={{ position: 'relative', width: 210, height: 210, marginBottom: 20 }}>
              <svg width={210} height={210} style={{ transform: 'rotate(-90deg)' }}>
                <circle cx={105} cy={105} r={radius} stroke={t.surface2} strokeWidth={14} fill="none" />
                <circle cx={105} cy={105} r={radius} stroke={t.primary} strokeWidth={14} fill="none" strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" style={{ transition: 'stroke-dashoffset 1s linear' }} />
              </svg>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ fontSize: 42, fontWeight: 700, color: t.text, letterSpacing: -2, lineHeight: 1 }}>{fmtTime(sprintSeconds)}</div>
                <div style={{ fontSize: 11, color: t.textMid, marginTop: 4, fontWeight: 500 }}>{sprintActive ? 'IN FLOW' : 'READY'}</div>
              </div>
            </div>

            {/* Sprint task */}
            <div style={{ width: '100%', background: t.surface2, borderRadius: 14, padding: '12px 14px', marginBottom: 14 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: t.primary, marginBottom: 4, textTransform: 'uppercase', letterSpacing: 0.8 }}>Sprint Task</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: t.text }}>{sprintTask}</div>
            </div>

            {/* Duration selector */}
            {!sprintActive && (
              <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
                {durations.map(d => (
                  <button key={d} onClick={() => { setSprintTotal(d * 60); setSprintSeconds(0); }} style={{ flex: 1, padding: '7px 0', borderRadius: 12, border: `1.5px solid ${sprintTotal === d * 60 ? t.primary : t.border}`, background: sprintTotal === d * 60 ? t.primaryLight : t.surface, cursor: 'pointer', fontSize: 12, fontWeight: 600, color: sprintTotal === d * 60 ? t.primary : t.textMid, transition: 'all 0.2s' }}>
                    {d}m
                  </button>
                ))}
              </div>
            )}

            {/* Controls */}
            <div style={{ display: 'flex', gap: 10, width: '100%' }}>
              {sprintActive ? (
                <>
                  <button onMouseDown={() => press('pause')} onClick={() => setSprintActive(false)} style={{ flex: 1, background: t.surface2, border: `1px solid ${t.border}`, borderRadius: 14, padding: '13px', fontSize: 14, fontWeight: 700, color: t.text, cursor: 'pointer', transform: pressedBtn === 'pause' ? 'scale(0.97)' : 'scale(1)', transition: 'transform 0.15s' }}>
                    Pause
                  </button>
                  <button onMouseDown={() => press('end')} onClick={() => { setSprintActive(false); setSprintSeconds(0); }} style={{ flex: 1, background: t.dangerLight, border: `1px solid ${t.danger}33`, borderRadius: 14, padding: '13px', fontSize: 14, fontWeight: 700, color: t.danger, cursor: 'pointer', transform: pressedBtn === 'end' ? 'scale(0.97)' : 'scale(1)', transition: 'transform 0.15s' }}>
                    End Sprint
                  </button>
                </>
              ) : (
                <button onMouseDown={() => press('start')} onClick={() => { setSprintSeconds(0); setSprintActive(true); }} style={{ flex: 1, background: `linear-gradient(135deg, ${t.primary}, ${t.primaryDark})`, border: 'none', borderRadius: 14, padding: '14px', fontSize: 15, fontWeight: 700, color: '#fff', cursor: 'pointer', transform: pressedBtn === 'start' ? 'scale(0.97)' : 'scale(1)', transition: 'transform 0.15s', boxShadow: `0 4px 16px ${t.primary}44` }}>
                  Start Sprint →
                </button>
              )}
            </div>
          </div>

          {/* Sprint tasks selection */}
          {!sprintActive && (
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: t.textMid, marginBottom: 10, textTransform: 'uppercase', letterSpacing: 1 }}>Choose a Sprint Task</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[
                  'Finalize Q2 report introduction',
                  'Send follow-up email to Acme Corp',
                  'Review and merge CI fix PR #142',
                  'Add risk section to slide 4',
                  'Reply to Marcus re: enterprise pricing',
                ].map((task, i) => (
                  <button key={i} onClick={() => setSprintTask(task)} onMouseDown={() => press(`task-${i}`)} style={{ background: sprintTask === task ? t.primaryLight : t.surface, border: `1.5px solid ${sprintTask === task ? t.primary : t.border}`, borderRadius: 12, padding: '11px 14px', textAlign: 'left', cursor: 'pointer', fontSize: 13, fontWeight: sprintTask === task ? 600 : 400, color: sprintTask === task ? t.primary : t.text, transform: pressedBtn === `task-${i}` ? 'scale(0.97)' : 'scale(1)', transition: 'all 0.2s' }}>
                    {task}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // ─── INTERRUPT MODAL ───
  const InterruptModal = () => {
    const typeOptions = [
      { id: 'call', label: 'Call', icon: window.lucide && window.lucide.Phone },
      { id: 'slack', label: 'Chat', icon: window.lucide && window.lucide.MessageCircle },
      { id: 'meeting', label: 'Meeting', icon: window.lucide && window.lucide.Users },
      { id: 'email', label: 'Email', icon: window.lucide && window.lucide.Mail },
      { id: 'other', label: 'Other', icon: window.lucide && window.lucide.Zap },
    ];

    if (!showInterruptModal) return null;
    return (
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)', borderRadius: 50, display: 'flex', alignItems: 'flex-end', zIndex: 100 }}>
        <div style={{ background: t.surface, borderRadius: '24px 24px 0 0', padding: '20px 20px 36px', width: '100%' }}>
          <div style={{ width: 40, height: 4, background: t.border, borderRadius: 2, margin: '0 auto 16px' }} />
          <div style={{ fontSize: 17, fontWeight: 700, color: t.text, marginBottom: 6 }}>Catching Interruption</div>
          <div style={{ fontSize: 13, color: t.textMid, marginBottom: 14 }}>What pulled you away?</div>
          <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
            {typeOptions.map(opt => (
              <button key={opt.id} onClick={() => setInterruptType(opt.id)} style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '7px 12px', borderRadius: 20, border: `1.5px solid ${interruptType === opt.id ? t.primary : t.border}`, background: interruptType === opt.id ? t.primaryLight : t.surface2, cursor: 'pointer' }}>
                {opt.icon && React.createElement(opt.icon, { size: 13, color: interruptType === opt.id ? t.primary : t.textMid })}
                <span style={{ fontSize: 12, fontWeight: 500, color: interruptType === opt.id ? t.primary : t.textMid }}>{opt.label}</span>
              </button>
            ))}
          </div>
          <input value={interruptNote} onChange={e => setInterruptNote(e.target.value)} placeholder="Brief description..." style={{ width: '100%', padding: '11px 14px', background: t.surface2, borderRadius: 12, fontSize: 13, color: t.text, marginBottom: 12, border: `1px solid ${t.border}` }} />
          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={() => setShowInterruptModal(false)} style={{ flex: 1, background: t.surface2, border: `1px solid ${t.border}`, borderRadius: 13, padding: '13px', fontSize: 14, fontWeight: 600, color: t.textMid, cursor: 'pointer' }}>Cancel</button>
            <button onClick={logInterrupt} onMouseDown={() => press('modal-log')} style={{ flex: 2, background: t.danger, border: 'none', borderRadius: 13, padding: '13px', fontSize: 14, fontWeight: 700, color: '#fff', cursor: 'pointer', transform: pressedBtn === 'modal-log' ? 'scale(0.97)' : 'scale(1)', transition: 'transform 0.15s' }}>
              Log It →
            </button>
          </div>
        </div>
      </div>
    );
  };

  const screens = {
    home: HomeScreen,
    catch: CatchScreen,
    replan: ReplanScreen,
    cards: CardsScreen,
    sprint: SprintScreen,
  };

  const ActiveScreen = screens[activeTab] || HomeScreen;

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#e0dff0' }}>
      {/* Phone frame */}
      <div style={{ width: 375, height: 812, background: t.bg, borderRadius: 50, overflow: 'hidden', position: 'relative', boxShadow: '0 40px 80px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column' }}>
        {/* Outer ring */}
        <div style={{ position: 'absolute', inset: -3, borderRadius: 53, border: '3px solid rgba(0,0,0,0.2)', pointerEvents: 'none', zIndex: 200 }} />

        <StatusBar />

        {/* Dynamic Island */}
        <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: 6, background: t.surface }}>
          <div style={{ width: 126, height: 34, background: '#000', borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#1a1a1a', border: '1px solid #333' }} />
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#222' }} />
          </div>
        </div>

        {/* Screen area */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden', background: t.bg }}>
          <ActiveScreen />
          <NavBar />
          <InterruptModal />
        </div>
      </div>
    </div>
  );
}
