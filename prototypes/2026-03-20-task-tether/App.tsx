const { useState, useEffect, useRef } = React;

const ds = {
  colors: {
    primary: '#4F8EF7',
    primaryDark: '#2563EB',
    primaryGlow: 'rgba(79,142,247,0.18)',
    secondary: '#38BDF8',
    accent: '#34D399',
    warning: '#FBBF24',
    danger: '#F87171',
    bg: '#0B0F1A',
    surface: '#111827',
    surfaceHigh: '#1C2435',
    surfaceBorder: 'rgba(79,142,247,0.12)',
    text: '#F0F4FF',
    textSub: '#7A8AAA',
    textMuted: '#4A5568',
    border: 'rgba(255,255,255,0.07)',
  },
  fonts: {
    display: "'Plus Jakarta Sans', sans-serif",
    body: "'Inter', sans-serif",
    mono: "'JetBrains Mono', monospace",
  },
  r: { xs: 6, sm: 10, md: 14, lg: 20, xl: 28, full: 9999 },
};

const SNAPSHOTS = [
  {
    id: 1,
    title: 'Q2 Budget Review',
    context: 'Marketing → Finance',
    lastAction: 'Reviewing row 47 — headcount vs actuals for March',
    nextAction: 'Compare projected vs actual for Apr-Jun, flag variances >10%',
    reason: 'Board meeting Thursday. CFO wants sign-off by Wed noon.',
    tags: ['finance', 'urgent'],
    time: '2m ago',
    color: '#4F8EF7',
    decisions: ['Freeze discretionary spend until Q3', 'Move $12k from events → digital'],
    files: ['budget-q2-draft.xlsx', 'headcount-model.gdoc'],
    timeEst: '25 min',
  },
  {
    id: 2,
    title: 'Homepage Redesign',
    context: 'Design → Dev handoff',
    lastAction: 'Adjusting hero section padding, stopped at mobile breakpoint',
    nextAction: 'Fix 375px breakpoint — hero text overlaps CTA on iPhone SE',
    reason: 'Launch blocked on design approval. Dev is waiting.',
    tags: ['design', 'blocked'],
    time: '1h ago',
    color: '#A78BFA',
    decisions: ['Use Inter not Geist for body text', 'Dark mode default'],
    files: ['homepage-v3.fig', 'brand-tokens.json'],
    timeEst: '15 min',
  },
  {
    id: 3,
    title: 'Weekly Groceries',
    context: 'Errands → Personal',
    lastAction: 'Added milk, eggs, bread. Left store after call from school.',
    nextAction: 'Return to aisle 7 — still need: pasta, olive oil, parmesan',
    reason: 'Dinner guests Friday. Nothing else in the fridge.',
    tags: ['personal', 'today'],
    time: '3h ago',
    color: '#34D399',
    decisions: ['Skip organic section this week', 'Budget under $80'],
    files: [],
    timeEst: '10 min',
  },
  {
    id: 4,
    title: 'Candidate Interview Notes',
    context: 'HR → Engineering',
    lastAction: 'Scored technical section 7/10, paused before culture fit',
    nextAction: 'Complete culture-fit rubric, write recommendation paragraph',
    reason: 'Offer decision meeting tomorrow at 9 AM.',
    tags: ['hr', 'tomorrow'],
    color: '#FBBF24',
    time: '5h ago',
    decisions: ['Strong systems design, weak on communication clarity'],
    files: ['interview-scorecard.gdoc'],
    timeEst: '8 min',
  },
];

const WINDOWS = [
  { time: '12:45–1:00 PM', label: 'Before lunch', mins: 15, tasks: ['Reply to Slack thread', 'Review candidate notes'], type: 'now' },
  { time: '2:15–2:30 PM', label: 'Between calls', mins: 15, tasks: ['Homepage breakpoint fix', 'Check Figma comments'], type: 'soon' },
  { time: '4:00–4:45 PM', label: 'Focus block', mins: 45, tasks: ['Q2 Budget Review', 'Write board deck summary'], type: 'later' },
  { time: '6:30–7:00 PM', label: 'After work wind-down', mins: 30, tasks: ['Weekly groceries return', 'Plan Friday dinner'], type: 'later' },
];

const PATTERNS = [
  { label: 'Avg interruptions/day', value: '11', trend: '-2 vs last week', up: false },
  { label: 'Recovery time', value: '4.2 min', trend: '-1.1 min improved', up: false },
  { label: 'Tasks resumed', value: '87%', trend: '+12% this week', up: true },
  { label: 'Focus windows used', value: '6/8', trend: '+2 windows', up: true },
];

const CAPTURES = [
  { id: 1, type: 'text', content: 'Follow up with Jake re: API rate limits — mentioned 429 errors in staging', time: '10:22 AM', converted: false },
  { id: 2, type: 'screenshot', content: 'Screenshot of error modal — blank state UI needs copy update', time: '9:44 AM', converted: true },
  { id: 3, type: 'voice', content: '"Remind me to check the Stripe webhook logs before 3pm call"', time: '9:15 AM', converted: false },
  { id: 4, type: 'link', content: 'https://docs.stripe.com/webhooks/signatures — review for security hardening', time: 'Yesterday', converted: true },
];

function Icon({ name, size = 20, color = ds.colors.text, style = {} }) {
  const LucideIcon = window.lucide && window.lucide[name];
  if (!LucideIcon) return null;
  return React.createElement(LucideIcon, { size, color, style, strokeWidth: 1.8 });
}

function StatusBar() {
  const [time, setTime] = useState('');
  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }));
    };
    update();
    const t = setInterval(update, 1000);
    return () => clearInterval(t);
  }, []);
  return (
    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'0 22px', height:20, marginBottom:2 }}>
      <span style={{ fontSize:12, fontWeight:600, color:ds.colors.text, fontFamily:ds.fonts.body }}>{time}</span>
      <div style={{ display:'flex', gap:6, alignItems:'center' }}>
        <Icon name="Wifi" size={12} color={ds.colors.text} />
        <Icon name="Signal" size={12} color={ds.colors.text} />
        <div style={{ width:22, height:11, border:`1.5px solid ${ds.colors.text}`, borderRadius:3, display:'flex', alignItems:'center', padding:'1px 2px', position:'relative' }}>
          <div style={{ width:'70%', height:7, background:ds.colors.accent, borderRadius:1.5 }} />
          <div style={{ position:'absolute', right:-4, top:'50%', transform:'translateY(-50%)', width:3, height:6, background:ds.colors.text, borderRadius:'0 2px 2px 0' }} />
        </div>
      </div>
    </div>
  );
}

function DynamicIsland() {
  return (
    <div style={{ display:'flex', justifyContent:'center', paddingTop:12, paddingBottom:6 }}>
      <div style={{ width:120, height:34, background:'#000', borderRadius:20, display:'flex', alignItems:'center', justifyContent:'center', gap:10 }}>
        <div style={{ width:10, height:10, borderRadius:'50%', background:'#1a1a2e', border:'1px solid #222' }} />
        <div style={{ width:10, height:10, borderRadius:'50%', background:'#1a1a2e', border:'1px solid #222' }} />
      </div>
    </div>
  );
}

function Tag({ label, color }) {
  return (
    <span style={{
      fontSize:10, fontWeight:600, padding:'3px 8px', borderRadius:ds.r.full,
      background:`${color}22`, color, border:`1px solid ${color}44`,
      fontFamily:ds.fonts.body, letterSpacing:'0.03em', textTransform:'uppercase',
    }}>{label}</span>
  );
}

function Pill({ label, active, onClick }) {
  return (
    <button onClick={onClick} style={{
      padding:'6px 14px', borderRadius:ds.r.full, border:'none', cursor:'pointer',
      background: active ? ds.colors.primary : ds.colors.surfaceHigh,
      color: active ? '#fff' : ds.colors.textSub,
      fontSize:12, fontWeight:600, fontFamily:ds.fonts.body,
      transition:'all 0.18s ease',
    }}>{label}</button>
  );
}

function SnapshotCard({ snap, onTap }) {
  const [pressed, setPressed] = useState(false);
  return (
    <div
      onClick={() => onTap(snap)}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      style={{
        background:ds.colors.surface, borderRadius:ds.r.lg, padding:'16px',
        border:`1px solid ${ds.colors.border}`, marginBottom:12,
        transform: pressed ? 'scale(0.975)' : 'scale(1)',
        transition:'transform 0.12s ease', cursor:'pointer',
        boxShadow:`0 0 0 1px ${snap.color}22`,
      }}
    >
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:10 }}>
        <div style={{ flex:1 }}>
          <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:4 }}>
            <div style={{ width:8, height:8, borderRadius:'50%', background:snap.color, boxShadow:`0 0 6px ${snap.color}` }} />
            <span style={{ fontSize:15, fontWeight:700, color:ds.colors.text, fontFamily:ds.fonts.display }}>{snap.title}</span>
          </div>
          <span style={{ fontSize:11, color:ds.colors.textSub, fontFamily:ds.fonts.body }}>{snap.context} · {snap.time}</span>
        </div>
        <div style={{ background:`${snap.color}18`, borderRadius:ds.r.sm, padding:'4px 8px' }}>
          <span style={{ fontSize:11, fontWeight:600, color:snap.color, fontFamily:ds.fonts.body }}>{snap.timeEst}</span>
        </div>
      </div>
      <div style={{ background:ds.colors.surfaceHigh, borderRadius:ds.r.sm, padding:'10px 12px', marginBottom:10 }}>
        <div style={{ display:'flex', alignItems:'flex-start', gap:8 }}>
          <Icon name="ArrowRight" size={14} color={snap.color} style={{ marginTop:2, flexShrink:0 }} />
          <span style={{ fontSize:13, color:ds.colors.text, fontFamily:ds.fonts.body, lineHeight:1.5 }}>{snap.nextAction}</span>
        </div>
      </div>
      <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
        {snap.tags.map(t => <Tag key={t} label={t} color={snap.color} />)}
      </div>
    </div>
  );
}

function SnapshotDetail({ snap, onBack }) {
  const [tabInner, setTabInner] = useState('context');
  return (
    <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' }}>
      <div style={{ padding:'0 20px 16px', borderBottom:`1px solid ${ds.colors.border}` }}>
        <button onClick={onBack} style={{ background:'none', border:'none', cursor:'pointer', display:'flex', alignItems:'center', gap:6, color:snap.color, padding:'8px 0', marginBottom:8 }}>
          <Icon name="ChevronLeft" size={18} color={snap.color} />
          <span style={{ fontSize:13, fontWeight:600, fontFamily:ds.fonts.body }}>All snapshots</span>
        </button>
        <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:4 }}>
          <div style={{ width:10, height:10, borderRadius:'50%', background:snap.color, boxShadow:`0 0 8px ${snap.color}` }} />
          <span style={{ fontSize:18, fontWeight:700, color:ds.colors.text, fontFamily:ds.fonts.display }}>{snap.title}</span>
        </div>
        <span style={{ fontSize:12, color:ds.colors.textSub, fontFamily:ds.fonts.body }}>{snap.context} · saved {snap.time}</span>
      </div>

      {/* Resume card */}
      <div style={{ margin:'16px 20px', background:`linear-gradient(135deg, ${snap.color}22 0%, ${snap.color}08 100%)`, borderRadius:ds.r.lg, padding:'16px', border:`1px solid ${snap.color}44` }}>
        <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:10 }}>
          <Icon name="Zap" size={14} color={snap.color} />
          <span style={{ fontSize:11, fontWeight:700, color:snap.color, fontFamily:ds.fonts.body, letterSpacing:'0.05em', textTransform:'uppercase' }}>Resume here</span>
        </div>
        <p style={{ fontSize:14, color:ds.colors.text, fontFamily:ds.fonts.body, lineHeight:1.55, margin:'0 0 12px' }}>{snap.nextAction}</p>
        <div style={{ fontSize:12, color:ds.colors.textSub, fontFamily:ds.fonts.body, padding:'8px 12px', background:'rgba(0,0,0,0.25)', borderRadius:ds.r.sm }}>
          <strong style={{ color:ds.colors.textMuted }}>Why it matters: </strong>{snap.reason}
        </div>
      </div>

      {/* Inner tabs */}
      <div style={{ display:'flex', gap:0, borderBottom:`1px solid ${ds.colors.border}`, margin:'0 20px' }}>
        {['context','decisions','files'].map(t => (
          <button key={t} onClick={() => setTabInner(t)} style={{
            flex:1, padding:'10px 0', background:'none', border:'none', cursor:'pointer',
            fontSize:12, fontWeight:600, fontFamily:ds.fonts.body, textTransform:'capitalize',
            color: tabInner===t ? snap.color : ds.colors.textSub,
            borderBottom: tabInner===t ? `2px solid ${snap.color}` : '2px solid transparent',
            transition:'all 0.15s ease',
          }}>{t}</button>
        ))}
      </div>

      <div style={{ flex:1, overflowY:'auto', padding:'16px 20px' }}>
        {tabInner === 'context' && (
          <div>
            <div style={{ marginBottom:12 }}>
              <span style={{ fontSize:11, fontWeight:600, color:ds.colors.textMuted, fontFamily:ds.fonts.body, textTransform:'uppercase', letterSpacing:'0.06em' }}>Last action</span>
              <p style={{ fontSize:13, color:ds.colors.text, fontFamily:ds.fonts.body, lineHeight:1.5, marginTop:6 }}>{snap.lastAction}</p>
            </div>
            <div style={{ background:ds.colors.surface, borderRadius:ds.r.md, padding:'12px 14px' }}>
              <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:8 }}>
                <Icon name="Clock" size=  {13} color={ds.colors.textSub} />
                <span style={{ fontSize:11, color:ds.colors.textSub, fontFamily:ds.fonts.body }}>Estimated time to complete</span>
              </div>
              <span style={{ fontSize:22, fontWeight:700, color:ds.colors.text, fontFamily:ds.fonts.display }}>{snap.timeEst}</span>
            </div>
          </div>
        )}
        {tabInner === 'decisions' && (
          <div>
            <span style={{ fontSize:11, fontWeight:600, color:ds.colors.textMuted, fontFamily:ds.fonts.body, textTransform:'uppercase', letterSpacing:'0.06em' }}>Recent decisions</span>
            {snap.decisions.map((d, i) => (
              <div key={i} style={{ display:'flex', gap:10, marginTop:12, alignItems:'flex-start' }}>
                <div style={{ width:6, height:6, borderRadius:'50%', background:snap.color, marginTop:5, flexShrink:0 }} />
                <span style={{ fontSize:13, color:ds.colors.text, fontFamily:ds.fonts.body, lineHeight:1.5 }}>{d}</span>
              </div>
            ))}
          </div>
        )}
        {tabInner === 'files' && (
          <div>
            <span style={{ fontSize:11, fontWeight:600, color:ds.colors.textMuted, fontFamily:ds.fonts.body, textTransform:'uppercase', letterSpacing:'0.06em' }}>Attached files</span>
            {snap.files.length === 0
              ? <p style={{ fontSize:13, color:ds.colors.textSub, fontFamily:ds.fonts.body, marginTop:12 }}>No files attached to this snapshot.</p>
              : snap.files.map((f, i) => (
                <div key={i} style={{ display:'flex', alignItems:'center', gap:10, padding:'10px 12px', background:ds.colors.surface, borderRadius:ds.r.sm, marginTop:8, border:`1px solid ${ds.colors.border}` }}>
                  <Icon name="FileText" size={16} color={snap.color} />
                  <span style={{ fontSize:13, color:ds.colors.text, fontFamily:ds.fonts.mono }}>{f}</span>
                </div>
              ))
            }
          </div>
        )}
      </div>
    </div>
  );
}

function SnapScreen() {
  const [detail, setDetail] = useState(null);
  const [filter, setFilter] = useState('all');
  const filters = ['all','urgent','today','design','finance'];
  const filtered = filter === 'all' ? SNAPSHOTS : SNAPSHOTS.filter(s => s.tags.includes(filter));
  if (detail) return <SnapshotDetail snap={detail} onBack={() => setDetail(null)} />;
  return (
    <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' }}>
      <div style={{ padding:'16px 20px 12px' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:4 }}>
          <div>
            <h1 style={{ fontSize:22, fontWeight:800, color:ds.colors.text, fontFamily:ds.fonts.display, margin:0 }}>Snapshots</h1>
            <p style={{ fontSize:12, color:ds.colors.textSub, fontFamily:ds.fonts.body, margin:'4px 0 0' }}>{SNAPSHOTS.length} paused · ready to resume</p>
          </div>
          <button style={{ width:38, height:38, borderRadius:ds.r.full, background:ds.colors.primary, border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:`0 0 12px ${ds.colors.primary}66` }}>
            <Icon name="Plus" size={20} color="#fff" />
          </button>
        </div>
      </div>
      <div style={{ display:'flex', gap:6, padding:'0 20px 12px', overflowX:'auto' }}>
        {filters.map(f => <Pill key={f} label={f} active={filter===f} onClick={() => setFilter(f)} />)}
      </div>
      <div style={{ flex:1, overflowY:'auto', padding:'0 20px 16px' }}>
        {filtered.map(s => <SnapshotCard key={s.id} snap={s} onTap={setDetail} />)}
      </div>
    </div>
  );
}

function CaptureScreen() {
  const [mode, setMode] = useState('text');
  const [text, setText] = useState('');
  const [saved, setSaved] = useState(false);
  const modes = [
    { key:'text', icon:'Type', label:'Note' },
    { key:'voice', icon:'Mic', label:'Voice' },
    { key:'screenshot', icon:'Camera', label:'Screen' },
    { key:'link', icon:'Link', label:'Link' },
  ];

  const handleSave = () => {
    if (!text.trim()) return;
    setSaved(true);
    setTimeout(() => { setSaved(false); setText(''); }, 1800);
  };

  return (
    <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' }}>
      <div style={{ padding:'16px 20px 12px' }}>
        <h1 style={{ fontSize:22, fontWeight:800, color:ds.colors.text, fontFamily:ds.fonts.display, margin:'0 0 4px' }}>Quick Capture</h1>
        <p style={{ fontSize:12, color:ds.colors.textSub, fontFamily:ds.fonts.body, margin:0 }}>Save what's in your head before it's gone</p>
      </div>

      {/* Interrupt banner */}
      <div style={{ margin:'0 20px 16px', background:`linear-gradient(135deg, #F87171 0%, #FCA5A5 100%)`, borderRadius:ds.r.md, padding:'12px 14px', display:'flex', alignItems:'center', gap:10 }}>
        <Icon name="AlertCircle" size={16} color="#fff" />
        <div style={{ flex:1 }}>
          <div style={{ fontSize:12, fontWeight:700, color:'#fff', fontFamily:ds.fonts.body }}>Interruption detected</div>
          <div style={{ fontSize:11, color:'rgba(255,255,255,0.8)', fontFamily:ds.fonts.body }}>You've been in this screen for 2s. Capture now?</div>
        </div>
        <button style={{ background:'rgba(255,255,255,0.25)', border:'none', borderRadius:ds.r.sm, padding:'4px 10px', cursor:'pointer', fontSize:12, fontWeight:700, color:'#fff', fontFamily:ds.fonts.body }}>Snap</button>
      </div>

      {/* Mode picker */}
      <div style={{ display:'flex', gap:8, padding:'0 20px 14px' }}>
        {modes.map(m => (
          <button key={m.key} onClick={() => setMode(m.key)} style={{
            flex:1, padding:'10px 0', borderRadius:ds.r.md, border:`1px solid ${mode===m.key ? ds.colors.primary : ds.colors.border}`,
            background: mode===m.key ? `${ds.colors.primary}22` : ds.colors.surface, cursor:'pointer',
            display:'flex', flexDirection:'column', alignItems:'center', gap:4,
            transition:'all 0.15s ease',
          }}>
            <Icon name={m.icon} size={16} color={mode===m.key ? ds.colors.primary : ds.colors.textSub} />
            <span style={{ fontSize:10, fontWeight:600, color:mode===m.key ? ds.colors.primary : ds.colors.textSub, fontFamily:ds.fonts.body }}>{m.label}</span>
          </button>
        ))}
      </div>

      {/* Input area */}
      <div style={{ flex:1, padding:'0 20px', display:'flex', flexDirection:'column' }}>
        {mode === 'text' && (
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="What were you working on? What's the next action?&#10;&#10;e.g. 'Paused mid-way through the Stripe integration — next: test webhook signature validation'"
            style={{
              flex:1, background:ds.colors.surface, border:`1px solid ${text ? ds.colors.primary : ds.colors.border}`,
              borderRadius:ds.r.lg, padding:'14px', color:ds.colors.text, fontFamily:ds.fonts.body,
              fontSize:14, lineHeight:1.6, resize:'none', outline:'none',
              transition:'border-color 0.2s ease',
            }}
          />
        )}
        {mode === 'voice' && (
          <div style={{ flex:1, background:ds.colors.surface, borderRadius:ds.r.lg, border:`1px solid ${ds.colors.border}`, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:16 }}>
            <div style={{ width:72, height:72, borderRadius:'50%', background:`${ds.colors.danger}22`, border:`2px solid ${ds.colors.danger}`, display:'flex', alignItems:'center', justifyContent:'center', boxShadow:`0 0 24px ${ds.colors.danger}44` }}>
              <Icon name="Mic" size={30} color={ds.colors.danger} />
            </div>
            <span style={{ fontSize:13, color:ds.colors.textSub, fontFamily:ds.fonts.body }}>Tap to record a voice note</span>
            <div style={{ display:'flex', gap:4, alignItems:'center' }}>
              {[3,5,8,4,7,5,3,6,4,8,5,3,7].map((h,i) => (
                <div key={i} style={{ width:3, height:h*3, background:`${ds.colors.danger}66`, borderRadius:2 }} />
              ))}
            </div>
          </div>
        )}
        {mode === 'screenshot' && (
          <div style={{ flex:1, background:ds.colors.surface, borderRadius:ds.r.lg, border:`2px dashed ${ds.colors.border}`, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:12 }}>
            <Icon name="Camera" size={32} color={ds.colors.textMuted} />
            <span style={{ fontSize:13, color:ds.colors.textSub, fontFamily:ds.fonts.body }}>Attach a screenshot</span>
            <span style={{ fontSize:11, color:ds.colors.textMuted, fontFamily:ds.fonts.body }}>Auto-analyzed for context</span>
          </div>
        )}
        {mode === 'link' && (
          <div style={{ flex:1, display:'flex', flexDirection:'column', gap:10 }}>
            <div style={{ background:ds.colors.surface, borderRadius:ds.r.md, padding:'14px', border:`1px solid ${ds.colors.border}`, display:'flex', alignItems:'center', gap:10 }}>
              <Icon name="Link" size={16} color={ds.colors.textSub} />
              <input placeholder="Paste a URL..." style={{ flex:1, background:'none', border:'none', outline:'none', color:ds.colors.text, fontSize:13, fontFamily:ds.fonts.body }} />
            </div>
            <div style={{ background:ds.colors.surface, borderRadius:ds.r.md, padding:'12px 14px', border:`1px solid ${ds.colors.border}` }}>
              <div style={{ fontSize:11, color:ds.colors.textSub, fontFamily:ds.fonts.body, marginBottom:6 }}>Clipboard detected:</div>
              <span style={{ fontSize:12, color:ds.colors.primary, fontFamily:ds.fonts.mono }}>https://docs.stripe.com/webhooks</span>
            </div>
          </div>
        )}

        <button
          onClick={handleSave}
          style={{
            margin:'14px 0', padding:'15px', borderRadius:ds.r.lg, border:'none', cursor:'pointer',
            background: saved ? ds.colors.accent : ds.colors.primary,
            color:'#fff', fontSize:15, fontWeight:700, fontFamily:ds.fonts.body,
            boxShadow:`0 4px 20px ${saved ? ds.colors.accent : ds.colors.primary}55`,
            transition:'all 0.2s ease',
            display:'flex', alignItems:'center', justifyContent:'center', gap:8,
          }}
        >
          <Icon name={saved ? 'Check' : 'Bookmark'} size={18} color="#fff" />
          {saved ? 'Snapshot saved!' : 'Save snapshot'}
        </button>
      </div>

      {/* Recent captures */}
      <div style={{ padding:'0 20px 16px' }}>
        <span style={{ fontSize:11, fontWeight:600, color:ds.colors.textMuted, fontFamily:ds.fonts.body, textTransform:'uppercase', letterSpacing:'0.06em' }}>Recent captures</span>
        {CAPTURES.slice(0,2).map(c => (
          <div key={c.id} style={{ display:'flex', gap:10, alignItems:'flex-start', padding:'10px 0', borderBottom:`1px solid ${ds.colors.border}` }}>
            <div style={{ width:28, height:28, borderRadius:ds.r.sm, background:ds.colors.surfaceHigh, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
              <Icon name={c.type==='text'?'Type':c.type==='voice'?'Mic':c.type==='screenshot'?'Camera':'Link'} size={13} color={ds.colors.textSub} />
            </div>
            <div style={{ flex:1 }}>
              <p style={{ fontSize:12, color:ds.colors.text, fontFamily:ds.fonts.body, margin:'0 0 3px', lineHeight:1.4 }}>{c.content}</p>
              <div style={{ display:'flex', gap:8, alignItems:'center' }}>
                <span style={{ fontSize:10, color:ds.colors.textMuted, fontFamily:ds.fonts.body }}>{c.time}</span>
                {c.converted && <Tag label="converted" color={ds.colors.accent} />}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function WindowsScreen() {
  const [active, setActive] = useState(null);
  const typeColor = { now: ds.colors.accent, soon: ds.colors.warning, later: ds.colors.primary };
  return (
    <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' }}>
      <div style={{ padding:'16px 20px 12px' }}>
        <h1 style={{ fontSize:22, fontWeight:800, color:ds.colors.text, fontFamily:ds.fonts.display, margin:'0 0 4px' }}>Focus Windows</h1>
        <p style={{ fontSize:12, color:ds.colors.textSub, fontFamily:ds.fonts.body, margin:0 }}>Smart gaps in your day — matched to real tasks</p>
      </div>

      {/* Timeline viz */}
      <div style={{ margin:'0 20px 16px', background:ds.colors.surface, borderRadius:ds.r.lg, padding:'14px', border:`1px solid ${ds.colors.border}` }}>
        <div style={{ display:'flex', justifyContent:'space-between', marginBottom:8 }}>
          <span style={{ fontSize:11, color:ds.colors.textMuted, fontFamily:ds.fonts.body }}>9 AM</span>
          <span style={{ fontSize:11, color:ds.colors.textMuted, fontFamily:ds.fonts.body }}>12 PM</span>
          <span style={{ fontSize:11, color:ds.colors.textMuted, fontFamily:ds.fonts.body }}>6 PM</span>
        </div>
        <div style={{ height:20, background:ds.colors.surfaceHigh, borderRadius:ds.r.full, position:'relative', overflow:'hidden' }}>
          <div style={{ position:'absolute', left:'37%', width:'5%', height:'100%', background:ds.colors.accent, borderRadius:2 }} />
          <div style={{ position:'absolute', left:'53%', width:'5%', height:'100%', background:ds.colors.warning, borderRadius:2 }} />
          <div style={{ position:'absolute', left:'69%', width:'13%', height:'100%', background:ds.colors.primary, borderRadius:2 }} />
          <div style={{ position:'absolute', left:'88%', width:'8%', height:'100%', background:ds.colors.primaryDark, borderRadius:2 }} />
          <div style={{ position:'absolute', left:'32%', width:'2px', height:'100%', background:'rgba(255,255,255,0.3)' }} />
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:6, marginTop:8 }}>
          <div style={{ width:8, height:8, borderRadius:2, background:ds.colors.accent }} />
          <span style={{ fontSize:10, color:ds.colors.textSub, fontFamily:ds.fonts.body }}>Now</span>
          <div style={{ width:8, height:8, borderRadius:2, background:ds.colors.warning, marginLeft:8 }} />
          <span style={{ fontSize:10, color:ds.colors.textSub, fontFamily:ds.fonts.body }}>Soon</span>
          <div style={{ width:8, height:8, borderRadius:2, background:ds.colors.primary, marginLeft:8 }} />
          <span style={{ fontSize:10, color:ds.colors.textSub, fontFamily:ds.fonts.body }}>Later</span>
        </div>
      </div>

      {/* Windows list */}
      <div style={{ flex:1, overflowY:'auto', padding:'0 20px 16px' }}>
        {WINDOWS.map((w, i) => (
          <div
            key={i}
            onClick={() => setActive(active===i?null:i)}
            style={{
              background:ds.colors.surface, borderRadius:ds.r.lg, padding:'14px 16px',
              border:`1px solid ${active===i ? typeColor[w.type]+'66' : ds.colors.border}`,
              marginBottom:10, cursor:'pointer', transition:'all 0.15s ease',
              boxShadow: active===i ? `0 0 16px ${typeColor[w.type]}22` : 'none',
            }}
          >
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom: active===i?10:0 }}>
              <div>
                <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                  <Tag label={w.type} color={typeColor[w.type]} />
                  <span style={{ fontSize:14, fontWeight:700, color:ds.colors.text, fontFamily:ds.fonts.display }}>{w.label}</span>
                </div>
                <span style={{ fontSize:11, color:ds.colors.textSub, fontFamily:ds.fonts.body }}>{w.time} · {w.mins} min window</span>
              </div>
              <Icon name={active===i?'ChevronUp':'ChevronDown'} size={16} color={ds.colors.textSub} />
            </div>
            {active===i && (
              <div style={{ borderTop:`1px solid ${ds.colors.border}`, paddingTop:10 }}>
                <span style={{ fontSize:11, fontWeight:600, color:ds.colors.textMuted, fontFamily:ds.fonts.body, textTransform:'uppercase', letterSpacing:'0.06em' }}>Suggested tasks</span>
                {w.tasks.map((t,j) => (
                  <div key={j} style={{ display:'flex', alignItems:'center', gap:8, marginTop:8 }}>
                    <div style={{ width:20, height:20, borderRadius:ds.r.xs, border:`1.5px solid ${typeColor[w.type]}`, display:'flex', alignItems:'center', justifyContent:'center' }}>
                      <Icon name="Check" size={11} color={typeColor[w.type]} />
                    </div>
                    <span style={{ fontSize:13, color:ds.colors.text, fontFamily:ds.fonts.body }}>{t}</span>
                  </div>
                ))}
                <button style={{
                  marginTop:12, width:'100%', padding:'10px', borderRadius:ds.r.sm, border:`1px solid ${typeColor[w.type]}`,
                  background:`${typeColor[w.type]}18`, color:typeColor[w.type], fontSize:13, fontWeight:600,
                  fontFamily:ds.fonts.body, cursor:'pointer',
                }}>Start this window</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function InsightsScreen() {
  return (
    <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' }}>
      <div style={{ padding:'16px 20px 14px' }}>
        <h1 style={{ fontSize:22, fontWeight:800, color:ds.colors.text, fontFamily:ds.fonts.display, margin:'0 0 4px' }}>Insights</h1>
        <p style={{ fontSize:12, color:ds.colors.textSub, fontFamily:ds.fonts.body, margin:0 }}>Your interruption patterns this week</p>
      </div>

      <div style={{ flex:1, overflowY:'auto', padding:'0 20px 16px' }}>
        {/* Stats grid */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:16 }}>
          {PATTERNS.map((p, i) => (
            <div key={i} style={{ background:ds.colors.surface, borderRadius:ds.r.md, padding:'14px', border:`1px solid ${ds.colors.border}` }}>
              <div style={{ fontSize:11, color:ds.colors.textSub, fontFamily:ds.fonts.body, marginBottom:6 }}>{p.label}</div>
              <div style={{ fontSize:20, fontWeight:800, color:ds.colors.text, fontFamily:ds.fonts.display, marginBottom:4 }}>{p.value}</div>
              <div style={{ display:'flex', alignItems:'center', gap:4 }}>
                <Icon name={p.up?'TrendingUp':'TrendingDown'} size={12} color={p.up ? ds.colors.accent : ds.colors.primary} />
                <span style={{ fontSize:10, color:p.up ? ds.colors.accent : ds.colors.primary, fontFamily:ds.fonts.body }}>{p.trend}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Interruption heatmap */}
        <div style={{ background:ds.colors.surface, borderRadius:ds.r.lg, padding:'16px', border:`1px solid ${ds.colors.border}`, marginBottom:16 }}>
          <div style={{ display:'flex', justifyContent:'space-between', marginBottom:12 }}>
            <span style={{ fontSize:13, fontWeight:700, color:ds.colors.text, fontFamily:ds.fonts.display }}>Daily interruption map</span>
            <span style={{ fontSize:11, color:ds.colors.textSub, fontFamily:ds.fonts.body }}>This week</span>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
            {['Mon','Tue','Wed','Thu','Fri'].map((day, di) => {
              const vals = [[2,1,4,3,6,5,3,2],[1,3,5,4,7,6,4,3],[3,2,6,8,5,4,2,1],[4,3,7,9,6,5,3,2],[2,1,3,5,4,3,2,1]][di];
              return (
                <div key={day} style={{ display:'flex', alignItems:'center', gap:8 }}>
                  <span style={{ fontSize:11, color:ds.colors.textMuted, fontFamily:ds.fonts.body, width:24 }}>{day}</span>
                  <div style={{ flex:1, display:'flex', gap:3 }}>
                    {vals.map((v,vi) => (
                      <div key={vi} style={{ flex:1, height:18, borderRadius:3, background:`${ds.colors.primary}${Math.min(v*25,255).toString(16).padStart(2,'0')}`, minWidth:0 }} />
                    ))}
                  </div>
                </div>
              );
            })}
            <div style={{ display:'flex', alignItems:'center', gap:8, marginTop:4 }}>
              <span style={{ width:24 }} />
              <div style={{ flex:1, display:'flex', justifyContent:'space-between' }}>
                {['9A','10A','11A','12P','1P','2P','3P','4P'].map(t => (
                  <span key={t} style={{ fontSize:9, color:ds.colors.textMuted, fontFamily:ds.fonts.body }}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Top interruption sources */}
        <div style={{ background:ds.colors.surface, borderRadius:ds.r.lg, padding:'16px', border:`1px solid ${ds.colors.border}`, marginBottom:16 }}>
          <span style={{ fontSize:13, fontWeight:700, color:ds.colors.text, fontFamily:ds.fonts.display }}>Top interrupt sources</span>
          {[
            { label:'Slack messages', pct:38, color:ds.colors.primary },
            { label:'Meeting overruns', pct:27, color:ds.colors.warning },
            { label:'Phone calls', pct:19, color:ds.colors.danger },
            { label:'Walk-ups', pct:16, color:ds.colors.secondary },
          ].map((s,i) => (
            <div key={i} style={{ marginTop:12 }}>
              <div style={{ display:'flex', justifyContent:'space-between', marginBottom:5 }}>
                <span style={{ fontSize:12, color:ds.colors.text, fontFamily:ds.fonts.body }}>{s.label}</span>
                <span style={{ fontSize:12, fontWeight:600, color:s.color, fontFamily:ds.fonts.body }}>{s.pct}%</span>
              </div>
              <div style={{ height:6, background:ds.colors.surfaceHigh, borderRadius:ds.r.full }}>
                <div style={{ width:`${s.pct}%`, height:'100%', background:s.color, borderRadius:ds.r.full, transition:'width 0.6s ease' }} />
              </div>
            </div>
          ))}
        </div>

        {/* Insight cards */}
        <div style={{ background:`linear-gradient(135deg, ${ds.colors.primary}22, ${ds.colors.secondary}11)`, borderRadius:ds.r.lg, padding:'16px', border:`1px solid ${ds.colors.primary}44` }}>
          <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:10 }}>
            <Icon name="Lightbulb" size={16} color={ds.colors.primary} />
            <span style={{ fontSize:13, fontWeight:700, color:ds.colors.text, fontFamily:ds.fonts.display }}>Weekly insight</span>
          </div>
          <p style={{ fontSize:13, color:ds.colors.text, fontFamily:ds.fonts.body, lineHeight:1.6, margin:'0 0 10px' }}>
            You're most interrupted between <strong style={{ color:ds.colors.warning }}>1–2 PM</strong>. Scheduling deep focus before noon improves task completion by <strong style={{ color:ds.colors.accent }}>40%</strong> based on your patterns.
          </p>
          <button style={{ background:ds.colors.primary, border:'none', borderRadius:ds.r.sm, padding:'8px 14px', color:'#fff', fontSize:12, fontWeight:600, fontFamily:ds.fonts.body, cursor:'pointer' }}>
            Block 10–12 AM for focus
          </button>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [tab, setTab] = useState('snapshots');

  const fontLink = `
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
    * { box-sizing: border-box; }
    ::-webkit-scrollbar { display: none; }
    body { margin: 0; background: #0B0F1A; }
    textarea::placeholder { color: #4A5568; }
    input::placeholder { color: #4A5568; }
  `;

  const tabs = [
    { key:'snapshots', icon:'Layers', label:'Snapshots' },
    { key:'capture', icon:'PlusCircle', label:'Capture' },
    { key:'windows', icon:'Clock', label:'Windows' },
    { key:'insights', icon:'BarChart2', label:'Insights' },
  ];

  return (
    <div style={{ minHeight:'100vh', background:'#060A14', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:ds.fonts.body }}>
      <style>{fontLink}</style>

      {/* Ambient glow */}
      <div style={{ position:'fixed', top:'20%', left:'50%', transform:'translateX(-50%)', width:400, height:400, borderRadius:'50%', background:`radial-gradient(circle, ${ds.colors.primary}15 0%, transparent 70%)`, pointerEvents:'none', zIndex:0 }} />

      {/* Phone frame */}
      <div style={{
        width:375, height:812, background:ds.colors.bg,
        borderRadius:52, overflow:'hidden', position:'relative', zIndex:1,
        boxShadow:'0 40px 120px rgba(0,0,0,0.8), inset 0 0 0 1px rgba(255,255,255,0.08)',
        display:'flex', flexDirection:'column',
        border:'8px solid #0A0E1A',
        outline:'1px solid rgba(255,255,255,0.05)',
      }}>
        {/* Status bar area */}
        <StatusBar />
        <DynamicIsland />

        {/* Screen content */}
        <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' }}>
          {tab === 'snapshots' && <SnapScreen />}
          {tab === 'capture' && <CaptureScreen />}
          {tab === 'windows' && <WindowsScreen />}
          {tab === 'insights' && <InsightsScreen />}
        </div>

        {/* Bottom nav */}
        <div style={{
          background:ds.colors.surface, borderTop:`1px solid ${ds.colors.border}`,
          display:'flex', padding:'10px 8px 20px',
        }}>
          {tabs.map(t => {
            const active = tab === t.key;
            return (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                style={{
                  flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:4,
                  background:'none', border:'none', cursor:'pointer', padding:'6px 0',
                  transition:'all 0.15s ease',
                }}
              >
                <div style={{
                  width:36, height:36, borderRadius:ds.r.md, display:'flex', alignItems:'center', justifyContent:'center',
                  background: active ? `${ds.colors.primary}22` : 'transparent',
                  transition:'all 0.15s ease',
                }}>
                  <Icon name={t.icon} size={20} color={active ? ds.colors.primary : ds.colors.textSub} />
                </div>
                <span style={{ fontSize:10, fontWeight:600, fontFamily:ds.fonts.body, color:active ? ds.colors.primary : ds.colors.textSub }}>
                  {t.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
