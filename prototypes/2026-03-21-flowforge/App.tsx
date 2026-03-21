const { useState, useEffect } = React;

function App() {
  // ─── Global State ────────────────────────────────────────────────────
  const [activeTab, setActiveTab] = useState('today');
  const [time, setTime] = useState('9:41');
  const [pressedBtn, setPressedBtn] = useState(null);

  // ─── Today Screen State ──────────────────────────────────────────────
  const [ctxDismissed, setCtxDismissed] = useState(false);

  // ─── Flow Screen State ───────────────────────────────────────────────
  const [flowMode, setFlowMode] = useState(15);
  const [activeStep, setActiveStep] = useState(0);
  const [stepDone, setStepDone] = useState({});

  // ─── Capture Screen State ────────────────────────────────────────────
  const [isRecording, setIsRecording] = useState(false);
  const [recTime, setRecTime] = useState(0);
  const [captureText, setCaptureText] = useState('');
  const [captures, setCaptures] = useState([
    { id: 1, type: 'voice', text: 'Need to loop in Alex on Q2 numbers before Friday standup', time: '2m ago', done: false },
    { id: 2, type: 'email', text: 'Budget approved for Phase 2 — Fwd from Sarah Chen', time: '34m ago', done: true },
    { id: 3, type: 'note', text: 'Ask design team about updated brand guidelines for Apex deck', time: '1h ago', done: false },
    { id: 4, type: 'screenshot', text: 'Screenshot: Wireframe from design review #4', time: '2h ago', done: false },
  ]);

  // ─── Effects ─────────────────────────────────────────────────────────
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');*{box-sizing:border-box;-webkit-tap-highlight-color:transparent;}::-webkit-scrollbar{display:none;}input::placeholder{color:#404060;}`;
    document.head.appendChild(style);
    const tick = () => {
      const n = new Date();
      setTime(`${n.getHours()}:${String(n.getMinutes()).padStart(2, '0')}`);
    };
    tick();
    const ti = setInterval(tick, 1000);
    return () => { clearInterval(ti); document.head.removeChild(style); };
  }, []);

  useEffect(() => {
    let id;
    if (isRecording) { id = setInterval(() => setRecTime(t => t + 1), 1000); }
    else { setRecTime(0); }
    return () => clearInterval(id);
  }, [isRecording]);

  // ─── Design Tokens ───────────────────────────────────────────────────
  const c = {
    primary: '#7B6FFF',
    primaryDim: 'rgba(123,111,255,0.15)',
    secondary: '#00CFAA',
    secondaryDim: 'rgba(0,207,170,0.15)',
    amber: '#FFB347',
    amberDim: 'rgba(255,179,71,0.15)',
    red: '#FF6565',
    redDim: 'rgba(255,101,101,0.15)',
    pink: '#FF6DB3',
    bg: '#07070F',
    card: '#0D0D1E',
    border: '#1A1A35',
    text: '#EEEEFF',
    sub: '#7575A0',
    muted: '#404060',
    surface: '#111128',
    pill: '#161630',
  };
  const f = 'Inter, sans-serif';

  // ─── Utilities ───────────────────────────────────────────────────────
  const Icon = ({ name, size = 20, color = c.text, strokeWidth = 1.8 }) => {
    const L = window.lucide?.[name];
    if (!L) return <span style={{ width: size, height: size, display: 'inline-block' }} />;
    return <L size={size} color={color} strokeWidth={strokeWidth} />;
  };

  const bStyle = (id) => ({
    transform: pressedBtn === id ? 'scale(0.94)' : 'scale(1)',
    transition: 'transform 0.12s ease',
    cursor: 'pointer',
    userSelect: 'none',
  });

  const press = (id, fn) => {
    setPressedBtn(id);
    setTimeout(() => { setPressedBtn(null); fn?.(); }, 140);
  };

  // ─── TODAY SCREEN ────────────────────────────────────────────────────
  const renderToday = () => (
    <div style={{ flex: 1, overflowY: 'auto', padding: '16px 16px 0' }}>
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 11, color: c.sub, fontFamily: f, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4 }}>
          Friday, March 21
        </div>
        <div style={{ fontSize: 22, fontWeight: 800, color: c.text, fontFamily: f }}>Ready to resume?</div>
      </div>

      {!ctxDismissed && (
        <div style={{
          background: 'linear-gradient(135deg, rgba(123,111,255,0.18), rgba(0,207,170,0.08))',
          border: '1px solid rgba(123,111,255,0.3)',
          borderRadius: 16, padding: '13px 14px', marginBottom: 14,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 5 }}>
            <Icon name="Zap" size={13} color={c.primary} />
            <span style={{ fontSize: 10, fontWeight: 700, color: c.primary, textTransform: 'uppercase', letterSpacing: 0.8, fontFamily: f }}>
              Transition Detected
            </span>
            <div style={{ marginLeft: 'auto', cursor: 'pointer', padding: 2 }} onClick={() => setCtxDismissed(true)}>
              <Icon name="X" size={13} color={c.sub} />
            </div>
          </div>
          <div style={{ fontSize: 14, color: c.text, fontWeight: 600, fontFamily: f }}>Client call ended 12 min ago</div>
          <div style={{ fontSize: 12, color: c.sub, marginTop: 2, fontFamily: f }}>Apex Marketing — Q2 Strategy Call · 47 min</div>
        </div>
      )}

      <div style={{ fontSize: 11, fontWeight: 600, color: c.sub, textTransform: 'uppercase', letterSpacing: 0.9, marginBottom: 8, fontFamily: f }}>
        Your Next Best Action
      </div>

      <div style={{
        background: c.card, border: `1px solid ${c.border}`,
        borderRadius: 20, padding: '16px', marginBottom: 14, ...bStyle('nba'),
      }} onClick={() => press('nba', () => {})}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 11 }}>
          <div style={{ background: c.primaryDim, borderRadius: 9, padding: '5px 10px', display: 'flex', alignItems: 'center', gap: 5 }}>
            <Icon name="Mail" size={12} color={c.primary} />
            <span style={{ fontSize: 11, fontWeight: 600, color: c.primary, fontFamily: f }}>Draft Email</span>
          </div>
          <span style={{ fontSize: 11, color: c.sub, fontFamily: f }}>~5 min</span>
        </div>
        <div style={{ fontSize: 16, fontWeight: 700, color: c.text, marginBottom: 5, fontFamily: f, lineHeight: 1.3 }}>
          Follow-up with Sarah Chen
        </div>
        <div style={{ fontSize: 13, color: c.sub, lineHeight: 1.5, marginBottom: 12, fontFamily: f }}>
          Summarize Q2 decisions, attach revised proposal, confirm Phase 2 timeline.
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 12 }}>
          {['Apex-Proposal-v3.pdf', 'Due: Monday', 'CC: Tom R.'].map(chip => (
            <span key={chip} style={{ background: c.pill, borderRadius: 7, padding: '4px 8px', fontSize: 11, color: c.sub, fontFamily: f }}>{chip}</span>
          ))}
        </div>
        <div style={{
          background: c.amberDim, border: '1px solid rgba(255,179,71,0.22)',
          borderRadius: 10, padding: '8px 10px', display: 'flex', alignItems: 'center', gap: 7, marginBottom: 12,
        }}>
          <Icon name="AlertTriangle" size={13} color={c.amber} />
          <span style={{ fontSize: 12, color: c.amber, fontFamily: f }}>Waiting on budget sign-off from Tom</span>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <div style={{
            flex: 1, background: c.primary, borderRadius: 12, padding: '11px',
            textAlign: 'center', fontSize: 13, fontWeight: 700, color: '#FFF', fontFamily: f,
            boxShadow: '0 4px 16px rgba(123,111,255,0.3)', ...bStyle('start-nba'),
          }} onClick={(e) => { e.stopPropagation(); press('start-nba', () => {}); }}>
            Start Now
          </div>
          <div style={{ background: c.surface, borderRadius: 12, padding: '11px 14px', display: 'flex', alignItems: 'center', ...bStyle('snooze') }}
            onClick={(e) => { e.stopPropagation(); press('snooze', () => {}); }}>
            <Icon name="Clock" size={16} color={c.sub} />
          </div>
          <div style={{ background: c.surface, borderRadius: 12, padding: '11px 14px', display: 'flex', alignItems: 'center', ...bStyle('skip') }}
            onClick={(e) => { e.stopPropagation(); press('skip', () => {}); }}>
            <Icon name="ChevronRight" size={16} color={c.sub} />
          </div>
        </div>
      </div>

      <div style={{ fontSize: 11, fontWeight: 600, color: c.sub, textTransform: 'uppercase', letterSpacing: 0.9, marginBottom: 8, fontFamily: f }}>
        Also On Your Plate
      </div>
      {[
        { icon: 'FileText', label: 'Finalize Q2 Budget Deck', tag: 'In Progress', tagColor: c.secondary, due: 'Today 5pm' },
        { icon: 'Users', label: 'Team standup prep notes', tag: 'Tomorrow', tagColor: c.muted, due: 'Mon 9am' },
        { icon: 'Code', label: 'Review API integration PR', tag: 'Blocked', tagColor: c.red, due: 'Overdue' },
      ].map((item, i) => (
        <div key={i} style={{
          background: c.card, border: `1px solid ${c.border}`,
          borderRadius: 14, padding: '12px 13px', marginBottom: 7,
          display: 'flex', alignItems: 'center', gap: 11, ...bStyle(`task-${i}`),
        }} onClick={() => press(`task-${i}`, () => {})}>
          <div style={{ width: 36, height: 36, background: c.surface, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Icon name={item.icon} size={16} color={c.sub} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 500, color: c.text, fontFamily: f }}>{item.label}</div>
            <div style={{ fontSize: 11, color: c.sub, marginTop: 2, fontFamily: f }}>{item.due}</div>
          </div>
          <span style={{ fontSize: 10, fontWeight: 700, color: item.tagColor, background: `${item.tagColor}22`, borderRadius: 6, padding: '3px 7px', fontFamily: f }}>
            {item.tag}
          </span>
        </div>
      ))}
      <div style={{ height: 24 }} />
    </div>
  );

  // ─── FLOW SCREEN ─────────────────────────────────────────────────────
  const flowSteps = {
    5: [
      { label: 'Skim call notes', detail: 'Key decisions from Apex meeting', dur: '2 min', icon: 'FileText' },
      { label: 'Open email draft', detail: 'Follow-up to Sarah — auto-started', dur: '1 min', icon: 'Mail' },
      { label: 'Send & log', detail: 'One task done. Momentum restored.', dur: '2 min', icon: 'Send' },
    ],
    15: [
      { label: 'Review call notes', detail: 'Decisions from Apex Q2 strategy call', dur: '2 min', icon: 'FileText' },
      { label: 'Open Apex proposal', detail: 'v3 draft — pricing section needs edit', dur: '3 min', icon: 'Folder' },
      { label: 'Draft follow-up email', detail: 'To Sarah Chen — attach proposal PDF', dur: '5 min', icon: 'Mail' },
      { label: 'Update CRM notes', detail: 'Log call summary in Salesforce', dur: '5 min', icon: 'Database' },
    ],
    30: [
      { label: 'Review call notes', detail: 'Decisions from Apex Q2 strategy call', dur: '3 min', icon: 'FileText' },
      { label: 'Update proposal doc', detail: 'Revise pricing in section 4', dur: '10 min', icon: 'Edit' },
      { label: 'Draft follow-up email', detail: 'To Sarah — attach updated proposal', dur: '7 min', icon: 'Mail' },
      { label: 'Ping Tom on budget', detail: 'Slack or email — need sign-off today', dur: '2 min', icon: 'MessageSquare' },
      { label: 'Update CRM + calendar', detail: 'Log call, set Phase 2 kickoff date', dur: '8 min', icon: 'Calendar' },
    ],
  };

  const renderFlow = () => (
    <div style={{ flex: 1, overflowY: 'auto', padding: '16px 16px 0' }}>
      <div style={{ fontSize: 22, fontWeight: 800, color: c.text, fontFamily: f, marginBottom: 3 }}>Flow Plan</div>
      <div style={{ fontSize: 13, color: c.sub, fontFamily: f, marginBottom: 16 }}>Your re-entry path for right now</div>

      <div style={{ background: c.card, border: `1px solid ${c.border}`, borderRadius: 14, padding: 4, display: 'flex', marginBottom: 14, gap: 3 }}>
        {[5, 15, 30].map(m => (
          <div key={m} style={{
            flex: 1, padding: '10px', borderRadius: 10, textAlign: 'center',
            background: flowMode === m ? c.primary : 'transparent',
            fontSize: 13, fontWeight: 600,
            color: flowMode === m ? '#FFF' : c.sub, fontFamily: f,
            cursor: 'pointer', transition: 'all 0.2s',
            boxShadow: flowMode === m ? '0 3px 12px rgba(123,111,255,0.3)' : 'none',
          }} onClick={() => { setFlowMode(m); setActiveStep(0); }}>
            {m} min
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: c.surface, borderRadius: 11, padding: '9px 12px', marginBottom: 14 }}>
        <Icon name="Zap" size={13} color={c.primary} />
        <span style={{ fontSize: 12, color: c.sub, fontFamily: f }}>
          Context: <span style={{ color: c.text }}>Post — Apex client call</span>
        </span>
        <span style={{ marginLeft: 'auto', fontSize: 11, color: c.secondary, fontFamily: f, fontWeight: 600 }}>{flowMode} min</span>
      </div>

      {flowSteps[flowMode].map((step, i) => {
        const doneKey = `${flowMode}-${i}`;
        const done = !!stepDone[doneKey];
        const isActive = i === activeStep && !done;
        return (
          <div key={doneKey} style={{ display: 'flex', gap: 10, marginBottom: 6, opacity: done ? 0.5 : 1, transition: 'opacity 0.2s' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 36, flexShrink: 0 }}>
              <div style={{
                width: 36, height: 36, borderRadius: 11,
                background: done ? c.secondaryDim : isActive ? c.primaryDim : c.surface,
                border: `1.5px solid ${done ? c.secondary : isActive ? c.primary : c.border}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', transition: 'all 0.2s', flexShrink: 0,
              }} onClick={() => {
                const newDone = !done;
                setStepDone(s => ({ ...s, [doneKey]: newDone }));
                if (newDone && i === activeStep) setActiveStep(i + 1);
                if (!newDone && i < activeStep) setActiveStep(i);
              }}>
                <Icon name={done ? 'Check' : step.icon} size={15} color={done ? c.secondary : isActive ? c.primary : c.sub} />
              </div>
              {i < flowSteps[flowMode].length - 1 && (
                <div style={{ width: 2, flex: 1, minHeight: 10, background: done ? c.secondary : c.border, margin: '3px 0', borderRadius: 1, transition: 'background 0.2s' }} />
              )}
            </div>
            <div style={{
              flex: 1, background: isActive ? 'rgba(123,111,255,0.08)' : c.card,
              border: `1px solid ${isActive ? 'rgba(123,111,255,0.25)' : c.border}`,
              borderRadius: 14, padding: '11px 13px', cursor: 'pointer', marginBottom: 2,
            }} onClick={() => !done && setActiveStep(i)}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: done ? c.sub : c.text, fontFamily: f, textDecoration: done ? 'line-through' : 'none' }}>
                  {step.label}
                </span>
                <span style={{ fontSize: 11, color: c.sub, fontFamily: f }}>{step.dur}</span>
              </div>
              <span style={{ fontSize: 12, color: c.sub, fontFamily: f }}>{step.detail}</span>
            </div>
          </div>
        );
      })}

      <div style={{
        background: 'linear-gradient(135deg, #7B6FFF, #9B6FFF)',
        borderRadius: 16, padding: '13px', textAlign: 'center',
        fontSize: 15, fontWeight: 700, color: '#FFF', fontFamily: f,
        marginTop: 10, boxShadow: '0 6px 24px rgba(123,111,255,0.35)', ...bStyle('start-flow'),
      }} onClick={() => press('start-flow', () => {})}>
        Begin {flowMode}-min Flow
      </div>
      <div style={{ height: 24 }} />
    </div>
  );

  // ─── CAPTURE SCREEN ──────────────────────────────────────────────────
  const captureTypeIcon = { voice: 'Mic', email: 'Mail', note: 'FileText', screenshot: 'Image' };
  const captureTypeColor = { voice: c.primary, email: c.secondary, note: c.amber, screenshot: c.pink };

  const renderCapture = () => (
    <div style={{ flex: 1, overflowY: 'auto', padding: '16px 16px 0' }}>
      <div style={{ fontSize: 22, fontWeight: 800, color: c.text, fontFamily: f, marginBottom: 3 }}>Capture</div>
      <div style={{ fontSize: 13, color: c.sub, fontFamily: f, marginBottom: 18 }}>Dump it here — FlowForge sorts it out</div>

      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: isRecording ? 10 : 18 }}>
        <div style={{
          width: 80, height: 80, borderRadius: '50%',
          background: isRecording
            ? 'radial-gradient(circle, #FF6565 0%, rgba(255,101,101,0.8) 100%)'
            : 'radial-gradient(circle, #7B6FFF 0%, rgba(123,111,255,0.8) 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          boxShadow: isRecording
            ? '0 0 0 10px rgba(255,101,101,0.18), 0 0 30px rgba(255,101,101,0.25)'
            : '0 0 0 10px rgba(123,111,255,0.12), 0 0 30px rgba(123,111,255,0.2)',
          transition: 'all 0.25s ease', ...bStyle('mic'),
        }} onClick={() => press('mic', () => setIsRecording(r => !r))}>
          <Icon name={isRecording ? 'Square' : 'Mic'} size={28} color="#FFF" strokeWidth={2} />
        </div>
      </div>

      {isRecording && (
        <div style={{ textAlign: 'center', marginBottom: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7 }}>
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: c.red }} />
            <span style={{ fontSize: 14, color: c.red, fontFamily: f, fontWeight: 600 }}>
              {String(Math.floor(recTime / 60)).padStart(2, '0')}:{String(recTime % 60).padStart(2, '0')}
            </span>
          </div>
        </div>
      )}

      <div style={{
        background: c.card, border: `1px solid ${c.border}`,
        borderRadius: 14, padding: '11px 13px', display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16,
      }}>
        <Icon name="PenLine" size={15} color={c.sub} />
        <input
          value={captureText}
          onChange={e => setCaptureText(e.target.value)}
          placeholder="Quick note, email snippet, reminder..."
          style={{ flex: 1, background: 'none', border: 'none', outline: 'none', fontSize: 13, color: c.text, fontFamily: f, caretColor: c.primary }}
          onKeyDown={e => {
            if (e.key === 'Enter' && captureText.trim()) {
              setCaptures(prev => [{ id: Date.now(), type: 'note', text: captureText.trim(), time: 'Just now', done: false }, ...prev]);
              setCaptureText('');
            }
          }}
        />
        <div style={{ display: 'flex', gap: 8 }}>
          <Icon name="Camera" size={15} color={c.sub} />
          <Icon name="Paperclip" size={15} color={c.sub} />
        </div>
      </div>

      <div style={{ display: 'flex', gap: 6, marginBottom: 14 }}>
        {['All', 'Voice', 'Email', 'Notes'].map((src, si) => (
          <div key={src} style={{
            padding: '5px 12px', borderRadius: 20,
            background: si === 0 ? c.primary : c.pill,
            fontSize: 12, fontWeight: 600,
            color: si === 0 ? '#FFF' : c.sub, fontFamily: f,
            cursor: 'pointer', ...bStyle(`src-${src}`),
          }} onClick={() => press(`src-${src}`, () => {})}>
            {src}
          </div>
        ))}
      </div>

      <div style={{ fontSize: 11, fontWeight: 600, color: c.sub, textTransform: 'uppercase', letterSpacing: 0.9, marginBottom: 10, fontFamily: f }}>
        Recent Captures
      </div>

      {captures.map(item => (
        <div key={item.id} style={{
          background: c.card, border: `1px solid ${c.border}`,
          borderRadius: 13, padding: '12px 13px', marginBottom: 7,
          display: 'flex', gap: 10, alignItems: 'flex-start', ...bStyle(`cap-${item.id}`),
        }} onClick={() => press(`cap-${item.id}`, () => {})}>
          <div style={{
            width: 34, height: 34, borderRadius: 10,
            background: `${captureTypeColor[item.type]}22`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <Icon name={captureTypeIcon[item.type]} size={15} color={captureTypeColor[item.type]} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, color: c.text, fontFamily: f, lineHeight: 1.4 }}>{item.text}</div>
            <div style={{ fontSize: 11, color: c.sub, marginTop: 3, fontFamily: f }}>{item.time}</div>
          </div>
          {item.done ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>
              <Icon name="CheckCircle" size={14} color={c.secondary} />
              <span style={{ fontSize: 11, color: c.secondary, fontFamily: f }}>Done</span>
            </div>
          ) : (
            <div style={{
              background: c.primaryDim, borderRadius: 8, padding: '4px 9px',
              fontSize: 11, fontWeight: 600, color: c.primary, fontFamily: f,
              flexShrink: 0, ...bStyle(`conv-${item.id}`),
            }} onClick={(e) => {
              e.stopPropagation();
              press(`conv-${item.id}`, () => setCaptures(prev => prev.map(cap => cap.id === item.id ? { ...cap, done: true } : cap)));
            }}>
              Convert
            </div>
          )}
        </div>
      ))}
      <div style={{ height: 24 }} />
    </div>
  );

  // ─── INSIGHTS SCREEN ─────────────────────────────────────────────────
  const barData = [65, 40, 85, 55, 90, 30, 48];
  const barDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const maxBar = Math.max(...barData);

  const renderInsights = () => (
    <div style={{ flex: 1, overflowY: 'auto', padding: '16px 16px 0' }}>
      <div style={{ fontSize: 22, fontWeight: 800, color: c.text, fontFamily: f, marginBottom: 3 }}>Insights</div>
      <div style={{ fontSize: 13, color: c.sub, fontFamily: f, marginBottom: 16 }}>How your work week actually unfolded</div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
        {[
          { label: 'Interruptions', value: '23', sub: 'this week', icon: 'Zap', color: c.primary },
          { label: 'Avg Recovery', value: '4.2m', sub: '↓ 38% better', icon: 'Timer', color: c.secondary },
        ].map((stat, i) => (
          <div key={i} style={{ flex: 1, background: c.card, border: `1px solid ${c.border}`, borderRadius: 16, padding: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
              <Icon name={stat.icon} size={13} color={stat.color} />
              <span style={{ fontSize: 11, color: c.sub, fontFamily: f }}>{stat.label}</span>
            </div>
            <div style={{ fontSize: 24, fontWeight: 800, color: c.text, fontFamily: f }}>{stat.value}</div>
            <div style={{ fontSize: 11, color: stat.color, marginTop: 2, fontFamily: f }}>{stat.sub}</div>
          </div>
        ))}
      </div>

      <div style={{ background: c.card, border: `1px solid ${c.border}`, borderRadius: 20, padding: '16px', marginBottom: 14 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: c.text, fontFamily: f }}>Interruptions This Week</span>
          <span style={{ fontSize: 11, color: c.primary, fontFamily: f, fontWeight: 600 }}>Mar 17–21</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 86 }}>
          {barData.map((h, i) => (
            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
              <div style={{ position: 'relative', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {i === 4 && (
                  <div style={{ fontSize: 9, color: c.primary, fontFamily: f, fontWeight: 700, marginBottom: 3 }}>90</div>
                )}
                <div style={{
                  width: '100%', height: `${(h / maxBar) * 60}px`,
                  background: i === 4
                    ? `linear-gradient(180deg, ${c.primary} 0%, rgba(123,111,255,0.4) 100%)`
                    : 'rgba(123,111,255,0.22)',
                  borderRadius: '4px 4px 0 0',
                }} />
              </div>
              <span style={{ fontSize: 10, color: i === 4 ? c.text : c.sub, fontFamily: f, fontWeight: i === 4 ? 700 : 400 }}>
                {barDays[i]}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ fontSize: 11, fontWeight: 600, color: c.sub, textTransform: 'uppercase', letterSpacing: 0.9, marginBottom: 10, fontFamily: f }}>
        Top Derailers
      </div>
      {[
        { label: 'Unplanned meetings', pct: 72, color: c.red },
        { label: 'Slack context switches', pct: 58, color: c.amber },
        { label: 'Cross-task interruptions', pct: 41, color: c.primary },
      ].map((d, i) => (
        <div key={i} style={{ background: c.card, border: `1px solid ${c.border}`, borderRadius: 13, padding: '12px 13px', marginBottom: 7 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: 13, color: c.text, fontFamily: f }}>{d.label}</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: d.color, fontFamily: f }}>{d.pct}%</span>
          </div>
          <div style={{ height: 4, background: c.surface, borderRadius: 2 }}>
            <div style={{ height: '100%', width: `${d.pct}%`, background: d.color, borderRadius: 2 }} />
          </div>
        </div>
      ))}

      <div style={{
        background: 'linear-gradient(135deg, rgba(0,207,170,0.12), rgba(123,111,255,0.08))',
        border: '1px solid rgba(0,207,170,0.22)',
        borderRadius: 20, padding: '16px', marginTop: 6,
        display: 'flex', alignItems: 'center', gap: 14,
      }}>
        <div style={{ position: 'relative', width: 58, height: 58, flexShrink: 0 }}>
          <svg width="58" height="58" viewBox="0 0 58 58">
            <circle cx="29" cy="29" r="24" fill="none" stroke={c.surface} strokeWidth="5" />
            <circle cx="29" cy="29" r="24" fill="none" stroke={c.secondary} strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 24 * 0.78} ${2 * Math.PI * 24}`}
              transform="rotate(-90 29 29)"
            />
          </svg>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 800, color: c.secondary, fontFamily: f }}>
            78
          </div>
        </div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: c.text, fontFamily: f }}>Adaptation Score</div>
          <div style={{ fontSize: 12, color: c.sub, marginTop: 3, fontFamily: f, lineHeight: 1.4 }}>
            FlowForge is learning your patterns and improving suggestions each week.
          </div>
        </div>
      </div>

      <div style={{
        background: c.card, border: `1px solid ${c.border}`,
        borderRadius: 16, padding: '13px 14px', marginTop: 10,
        display: 'flex', alignItems: 'center', gap: 12,
      }}>
        <div style={{ width: 40, height: 40, background: c.amberDim, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Icon name="Flame" size={20} color={c.amber} />
        </div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 600, color: c.text, fontFamily: f }}>5-day streak</div>
          <div style={{ fontSize: 12, color: c.sub, marginTop: 2, fontFamily: f }}>Using FlowForge every workday this week</div>
        </div>
        <div style={{ marginLeft: 'auto', fontSize: 11, fontWeight: 700, color: c.amber, fontFamily: f }}>+12 XP</div>
      </div>

      <div style={{ height: 24 }} />
    </div>
  );

  // ─── MAIN RENDER ─────────────────────────────────────────────────────
  const navItems = [
    { id: 'today', label: 'Today', icon: 'Zap' },
    { id: 'flow', label: 'Flow', icon: 'Timer' },
    { id: 'capture', label: 'Capture', icon: 'Plus' },
    { id: 'insights', label: 'Insights', icon: 'TrendingUp' },
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'radial-gradient(ellipse 80% 60% at 50% 20%, #100D2E 0%, #050508 60%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 20, fontFamily: f,
    }}>
      <div style={{
        width: 375, height: 812,
        background: c.bg,
        borderRadius: 50,
        overflow: 'hidden',
        boxShadow: '0 0 0 1px rgba(255,255,255,0.07), 0 40px 100px rgba(0,0,0,0.85), 0 0 80px rgba(123,111,255,0.08)',
        display: 'flex', flexDirection: 'column',
        fontFamily: f,
      }}>
        {/* Status Bar */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '14px 26px 0', flexShrink: 0, position: 'relative', zIndex: 10,
        }}>
          <span style={{ fontSize: 15, fontWeight: 700, color: c.text, fontFamily: f, zIndex: 1 }}>{time}</span>
          {/* Dynamic Island */}
          <div style={{
            position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)',
            width: 120, height: 34, background: '#000', borderRadius: 20, zIndex: 0,
          }} />
          <div style={{ display: 'flex', gap: 5, alignItems: 'center', zIndex: 1 }}>
            <Icon name="Signal" size={14} color={c.text} />
            <Icon name="Wifi" size={14} color={c.text} />
            <Icon name="Battery" size={16} color={c.text} />
          </div>
        </div>

        <div style={{ height: 18, flexShrink: 0 }} />

        {/* Screen Content */}
        <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          {activeTab === 'today' && renderToday()}
          {activeTab === 'flow' && renderFlow()}
          {activeTab === 'capture' && renderCapture()}
          {activeTab === 'insights' && renderInsights()}
        </div>

        {/* Bottom Nav */}
        <div style={{
          background: 'rgba(10,10,25,0.97)',
          borderTop: `1px solid ${c.border}`,
          display: 'flex', padding: '8px 6px 22px',
          flexShrink: 0, gap: 2,
        }}>
          {navItems.map(nav => {
            const active = activeTab === nav.id;
            return (
              <div key={nav.id} style={{
                flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
                padding: '7px 4px', borderRadius: 12,
                background: active ? c.primaryDim : 'transparent',
                cursor: 'pointer', transition: 'all 0.2s', ...bStyle(`nav-${nav.id}`),
              }} onClick={() => press(`nav-${nav.id}`, () => setActiveTab(nav.id))}>
                <Icon name={nav.icon} size={20} color={active ? c.primary : c.muted} strokeWidth={active ? 2.2 : 1.6} />
                <span style={{ fontSize: 10, fontWeight: active ? 700 : 400, color: active ? c.primary : c.muted, fontFamily: f }}>
                  {nav.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
