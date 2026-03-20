const { useState, useEffect } = React;

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [completedActions, setCompletedActions] = useState(new Set());
  const [calmMode, setCalmMode] = useState(false);
  const [billFilter, setBillFilter] = useState('all');
  const [paidBills, setPaidBills] = useState(new Set([6]));
  const [breathePulse, setBreathePulse] = useState(false);

  useEffect(() => {
    if (!calmMode) return;
    const t = setInterval(() => setBreathePulse(p => !p), 4000);
    return () => clearInterval(t);
  }, [calmMode]);

  const C = {
    bg: '#070D1A', card: '#0F1729', surface: '#141E33',
    border: 'rgba(255,255,255,0.07)', borderHi: 'rgba(255,255,255,0.12)',
    teal: '#14B8A6', tealDim: 'rgba(20,184,166,0.14)',
    sky: '#38BDF8', skyDim: 'rgba(56,189,248,0.12)',
    green: '#34D399', greenDim: 'rgba(52,211,153,0.12)',
    amber: '#FBBF24', amberDim: 'rgba(251,191,36,0.12)',
    red: '#F87171', redDim: 'rgba(248,113,113,0.12)',
    purple: '#A78BFA', purpleDim: 'rgba(167,139,250,0.12)',
    text: '#F1F5F9', sub: '#94A3B8', muted: '#475569',
  };

  const cashFlow = [
    { d: '20', b: 847 }, { d: '21', b: 820 }, { d: '22', b: 769 },
    { d: '23', b: 614, ev: 'Phone' }, { d: '24', b: 490 },
    { d: '25', b: 312, ev: 'Netflix' }, { d: '26', b: 278 },
    { d: '27', b: 1085, ev: 'Payday' }, { d: '28', b: 1038 },
    { d: '29', b: 970 }, { d: '30', b: 875 },
    { d: '1', b: 407, ev: 'Rent' }, { d: '2', b: 370 }, { d: '3', b: 303, ev: 'Electric' },
  ];

  const billsData = [
    { id: 1, name: 'Rent', amount: 1200, due: 'Apr 1', flex: 'fixed', emoji: '🏠', days: 12, note: 'Landlord – strict' },
    { id: 2, name: 'Phone Bill', amount: 85, due: 'Mar 23', flex: 'semi', emoji: '📱', days: 3, note: '3-day grace period' },
    { id: 3, name: 'Netflix', amount: 18, due: 'Mar 25', flex: 'flexible', emoji: '🎬', days: 5, note: 'Can delay 7 days' },
    { id: 4, name: 'Car Insurance', amount: 142, due: 'Mar 28', flex: 'fixed', emoji: '🚗', days: 8, note: 'Auto-pay on file' },
    { id: 5, name: 'Electricity', amount: 67, due: 'Apr 3', flex: 'semi', emoji: '⚡', days: 14, note: '5-day grace' },
    { id: 6, name: 'Spotify', amount: 11, due: 'Mar 22', flex: 'flexible', emoji: '🎵', days: 2, note: 'Can cancel anytime' },
  ];

  const microActions = [
    { id: 'a1', emoji: '🛒', text: 'Buy groceries — safe today', sub: "Won't dip below warning zone", type: 'green', cta: 'Got it' },
    { id: 'a2', emoji: '⏸', text: 'Pause Netflix until Mar 27', sub: '$18 saved · Payday covers it', type: 'amber', cta: 'Snooze' },
    { id: 'a3', emoji: '🛡', text: 'Move $45 to rent buffer', sub: 'Protects you if payday is late', type: 'sky', cta: 'Set Aside' },
  ];

  const incomes = [
    { src: 'Rideshare (Uber)', amt: 340, date: 'Mar 27', prob: 87, emoji: '🚗', note: 'Based on last 4 weeks avg' },
    { src: 'Client: Alex Davidson', amt: 600, date: 'Mar 28', prob: 71, emoji: '💼', note: 'Invoice #1042 sent' },
    { src: 'Weekend Shifts', amt: 210, date: 'Apr 2', prob: 95, emoji: '⏰', note: 'Scheduled hours confirmed' },
  ];

  const calmSteps = [
    { n: 1, action: 'Pay phone bill today', detail: '$85 · Due Mar 23 · Fixed', urgency: 'red' },
    { n: 2, action: 'Snooze Netflix 48 hrs', detail: '$18 saved · Resume after payday', urgency: 'amber' },
    { n: 3, action: 'Protect $45 for rent', detail: 'Move to buffer before Wednesday', urgency: 'amber' },
    { n: 4, action: 'Skip takeout Wed & Thu', detail: 'Save ~$30 in the tight window', urgency: 'teal' },
    { n: 5, action: 'Confirm client payment', detail: 'Chase invoice #1042 due Mar 28', urgency: 'teal' },
  ];

  const flexCfg = {
    fixed:    { label: 'Fixed',     color: '#F87171', bg: 'rgba(248,113,113,0.12)' },
    semi:     { label: 'Semi-flex', color: '#FBBF24', bg: 'rgba(251,191,36,0.12)' },
    flexible: { label: 'Flexible',  color: '#34D399', bg: 'rgba(52,211,153,0.12)' },
  };

  const toggle = (id) => setCompletedActions(prev => {
    const s = new Set(prev); s.has(id) ? s.delete(id) : s.add(id); return s;
  });

  const drawChart = (data, w, h, mini = false) => {
    const pL = mini ? 4 : 32, pR = 4, pT = mini ? 4 : 10, pB = mini ? 4 : 26;
    const cW = w - pL - pR, cH = h - pT - pB;
    const MAX = 1300;
    const gx = i => pL + (i / (data.length - 1)) * cW;
    const gy = v => pT + cH - (v / MAX) * cH;
    const pts = data.map((d, i) => ({ x: gx(i), y: gy(d.b), ...d }));
    let line = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 1; i < pts.length; i++) {
      const dx = pts[i].x - pts[i - 1].x;
      line += ` C ${pts[i-1].x+dx*0.4} ${pts[i-1].y} ${pts[i].x-dx*0.4} ${pts[i].y} ${pts[i].x} ${pts[i].y}`;
    }
    const area = line + ` L ${pts[pts.length-1].x} ${pT+cH} L ${pts[0].x} ${pT+cH} Z`;
    const dY = gy(300), wY = gy(500);
    const uid = mini ? 'm' : 'f';
    return (
      React.createElement('svg', { width: w, height: h, style: { display: 'block', overflow: 'visible' } },
        React.createElement('defs', null,
          React.createElement('linearGradient', { id: `ag${uid}`, x1: '0', y1: '0', x2: '0', y2: '1' },
            React.createElement('stop', { offset: '0%', stopColor: '#14B8A6', stopOpacity: '0.4' }),
            React.createElement('stop', { offset: '100%', stopColor: '#14B8A6', stopOpacity: '0' })
          ),
          React.createElement('linearGradient', { id: `lg${uid}`, x1: '0', y1: '0', x2: '1', y2: '0' },
            React.createElement('stop', { offset: '0%', stopColor: '#14B8A6' }),
            React.createElement('stop', { offset: '44%', stopColor: '#FBBF24' }),
            React.createElement('stop', { offset: '52%', stopColor: '#F87171' }),
            React.createElement('stop', { offset: '54%', stopColor: '#34D399' }),
            React.createElement('stop', { offset: '100%', stopColor: '#38BDF8' })
          )
        ),
        !mini && React.createElement(React.Fragment, null,
          React.createElement('rect', { x: pL, y: dY, width: cW, height: pT + cH - dY, fill: 'rgba(248,113,113,0.06)' }),
          React.createElement('rect', { x: pL, y: wY, width: cW, height: dY - wY, fill: 'rgba(251,191,36,0.05)' }),
          React.createElement('line', { x1: pL, y1: dY, x2: pL+cW, y2: dY, stroke: 'rgba(248,113,113,0.35)', strokeWidth: 1, strokeDasharray: '3,3' }),
          React.createElement('line', { x1: pL, y1: wY, x2: pL+cW, y2: wY, stroke: 'rgba(251,191,36,0.3)', strokeWidth: 1, strokeDasharray: '3,3' }),
          React.createElement('text', { x: pL-4, y: dY+3, textAnchor: 'end', fontSize: 7, fill: 'rgba(248,113,113,0.65)' }, '$300'),
          React.createElement('text', { x: pL-4, y: wY+3, textAnchor: 'end', fontSize: 7, fill: 'rgba(251,191,36,0.65)' }, '$500')
        ),
        React.createElement('path', { d: area, fill: `url(#ag${uid})` }),
        React.createElement('path', { d: line, fill: 'none', stroke: `url(#lg${uid})`, strokeWidth: mini ? 2 : 2.5, strokeLinecap: 'round' }),
        !mini && pts.map((p, i) => {
          if (!p.ev && i !== 0) return null;
          const isLow = p.b < 350, isPay = p.ev === 'Payday', isToday = i === 0;
          const col = isLow ? '#F87171' : isPay ? '#34D399' : '#14B8A6';
          return React.createElement('g', { key: i },
            React.createElement('circle', { cx: p.x, cy: p.y, r: 7, fill: col, opacity: 0.2 }),
            React.createElement('circle', { cx: p.x, cy: p.y, r: 3.5, fill: col }),
            p.ev && React.createElement('text', { x: p.x, y: p.y - 11, textAnchor: 'middle', fontSize: 7.5, fill: col, fontWeight: 700 }, p.ev)
          );
        }),
        !mini && pts.map((p, i) => i % 2 === 0
          ? React.createElement('text', { key: i, x: p.x, y: h - 5, textAnchor: 'middle', fontSize: 7.5, fill: 'rgba(148,163,184,0.55)' }, p.d)
          : null
        )
      )
    );
  };

  const homeScreen = () => (
    React.createElement('div', { style: { padding: '16px 16px 0' } },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 } },
        React.createElement('div', null,
          React.createElement('div', { style: { fontSize: 11, color: C.sub, letterSpacing: 0.5 } }, 'Friday · Mar 20, 2026'),
          React.createElement('div', { style: { fontSize: 20, fontWeight: 800, color: C.text, marginTop: 2 } }, 'Good evening, Alex 👋')
        ),
        React.createElement('div', { style: { width: 38, height: 38, borderRadius: 12, background: C.card, border: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' } },
          React.createElement('span', { style: { fontSize: 17 } }, '🔔'),
          React.createElement('div', { style: { position: 'absolute', top: 8, right: 8, width: 7, height: 7, borderRadius: '50%', background: '#F87171', border: `1.5px solid ${C.bg}` } })
        )
      ),
      React.createElement('div', { style: { background: 'linear-gradient(135deg, #0F1729 0%, #0D1F38 100%)', border: `1px solid ${C.borderHi}`, borderRadius: 22, padding: '18px 18px 16px', marginBottom: 12, position: 'relative', overflow: 'hidden' } },
        React.createElement('div', { style: { position: 'absolute', top: -30, right: -30, width: 120, height: 120, borderRadius: '50%', background: 'rgba(20,184,166,0.1)', filter: 'blur(35px)' } }),
        React.createElement('div', { style: { fontSize: 11, color: C.sub, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4 } }, 'Current Balance'),
        React.createElement('div', { style: { display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 14 } },
          React.createElement('span', { style: { fontSize: 38, fontWeight: 900, color: C.text, letterSpacing: -1 } }, '$847'),
          React.createElement('span', { style: { fontSize: 12, color: '#34D399', fontWeight: 700, background: 'rgba(52,211,153,0.12)', padding: '2px 8px', borderRadius: 6 } }, '+$0 today')
        ),
        React.createElement('div', { style: { marginBottom: 12 } }, drawChart(cashFlow, 312, 54, true)),
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.22)', borderRadius: 11, padding: '9px 12px' } },
          React.createElement('span', { style: { fontSize: 16 } }, '⚠️'),
          React.createElement('div', null,
            React.createElement('div', { style: { fontSize: 12, fontWeight: 700, color: C.amber } }, 'Tight spot in 5 days · Mar 25'),
            React.createElement('div', { style: { fontSize: 10, color: C.sub } }, 'Balance may drop to ~$278 · Act today')
          )
        )
      ),
      React.createElement('div', { style: { marginBottom: 12 } },
        React.createElement('div', { style: { fontSize: 13, fontWeight: 700, color: C.text, marginBottom: 9 } }, "Today's Actions"),
        microActions.map(a => {
          const done = completedActions.has(a.id);
          const cc = a.type === 'green' ? C.green : a.type === 'amber' ? C.amber : C.sky;
          const cd = a.type === 'green' ? C.greenDim : a.type === 'amber' ? C.amberDim : C.skyDim;
          return React.createElement('div', { key: a.id, style: { background: done ? 'rgba(52,211,153,0.06)' : cd, border: `1px solid ${done ? 'rgba(52,211,153,0.2)' : cc+'33'}`, borderRadius: 14, padding: '11px 14px', marginBottom: 7, display: 'flex', alignItems: 'center', gap: 11, opacity: done ? 0.55 : 1, transition: 'all 0.2s' } },
            React.createElement('span', { style: { fontSize: 20 } }, done ? '✅' : a.emoji),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', { style: { fontSize: 13, fontWeight: 600, color: done ? C.sub : C.text, textDecoration: done ? 'line-through' : 'none' } }, a.text),
              React.createElement('div', { style: { fontSize: 10, color: C.muted, marginTop: 2 } }, a.sub)
            ),
            !done && React.createElement('div', { onClick: () => toggle(a.id), style: { background: cc, color: '#000', fontSize: 10, fontWeight: 800, padding: '5px 11px', borderRadius: 8, cursor: 'pointer', whiteSpace: 'nowrap', letterSpacing: 0.3 } }, a.cta)
          );
        })
      ),
      React.createElement('div', { style: { marginBottom: 16 } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 9 } },
          React.createElement('div', { style: { fontSize: 13, fontWeight: 700, color: C.text } }, 'Upcoming Bills'),
          React.createElement('div', { onClick: () => setActiveTab('bills'), style: { fontSize: 11, color: C.teal, fontWeight: 700, cursor: 'pointer' } }, 'View All →')
        ),
        billsData.slice(0, 3).map(b => {
          const fc = flexCfg[b.flex], urgent = b.days <= 5;
          return React.createElement('div', { key: b.id, style: { display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', background: C.card, border: `1px solid ${urgent ? 'rgba(248,113,113,0.25)' : C.border}`, borderRadius: 13, marginBottom: 6 } },
            React.createElement('span', { style: { fontSize: 20 } }, b.emoji),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', { style: { fontSize: 13, fontWeight: 600, color: C.text } }, b.name),
              React.createElement('div', { style: { fontSize: 10, color: C.sub, marginTop: 1 } }, `${b.due} · ${b.days}d`)
            ),
            React.createElement('div', { style: { textAlign: 'right' } },
              React.createElement('div', { style: { fontSize: 14, fontWeight: 800, color: urgent ? C.red : C.text } }, `$${b.amount}`),
              React.createElement('div', { style: { fontSize: 9, fontWeight: 700, color: fc.color, background: fc.bg, padding: '2px 6px', borderRadius: 5, marginTop: 3 } }, fc.label)
            )
          );
        })
      )
    )
  );

  const forecastScreen = () => (
    React.createElement('div', { style: { padding: '16px 16px 0' } },
      React.createElement('div', { style: { marginBottom: 18 } },
        React.createElement('div', { style: { fontSize: 11, color: C.sub, letterSpacing: 0.5, textTransform: 'uppercase' } }, '14-Day View'),
        React.createElement('div', { style: { fontSize: 20, fontWeight: 800, color: C.text, marginTop: 2 } }, 'Cash Flow Forecast')
      ),
      React.createElement('div', { style: { background: C.card, border: `1px solid ${C.border}`, borderRadius: 20, padding: '14px 10px 12px', marginBottom: 13 } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, padding: '0 4px' } },
          React.createElement('div', { style: { fontSize: 11, color: C.sub } }, 'Mar 20 — Apr 3'),
          React.createElement('div', { style: { display: 'flex', gap: 10 } },
            [['Safe', '#34D399'], ['Tight', '#FBBF24'], ['Risk', '#F87171']].map(([l, c]) =>
              React.createElement('div', { key: l, style: { display: 'flex', alignItems: 'center', gap: 4 } },
                React.createElement('div', { style: { width: 6, height: 6, borderRadius: '50%', background: c } }),
                React.createElement('span', { style: { fontSize: 9, color: C.sub } }, l)
              )
            )
          )
        ),
        drawChart(cashFlow, 332, 148)
      ),
      React.createElement('div', { style: { background: C.redDim, border: '1px solid rgba(248,113,113,0.22)', borderRadius: 14, padding: '12px 14px', marginBottom: 13 } },
        React.createElement('div', { style: { display: 'flex', gap: 10 } },
          React.createElement('span', { style: { fontSize: 18 } }, '🚨'),
          React.createElement('div', null,
            React.createElement('div', { style: { fontSize: 13, fontWeight: 700, color: C.red, marginBottom: 3 } }, 'Risk Window: Mar 25–26'),
            React.createElement('div', { style: { fontSize: 11, color: C.sub, lineHeight: 1.55 } }, 'Balance may drop to ~$278. Three bills with no confirmed income. 2 actions today smooth this gap entirely.')
          )
        )
      ),
      React.createElement('div', { style: { marginBottom: 13 } },
        React.createElement('div', { style: { fontSize: 13, fontWeight: 700, color: C.text, marginBottom: 9 } }, 'Income Predictions'),
        incomes.map((inc, i) =>
          React.createElement('div', { key: i, style: { background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: '12px 13px', marginBottom: 8 } },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 9 } },
              React.createElement('span', { style: { fontSize: 20 } }, inc.emoji),
              React.createElement('div', { style: { flex: 1 } },
                React.createElement('div', { style: { fontSize: 13, fontWeight: 600, color: C.text } }, inc.src),
                React.createElement('div', { style: { fontSize: 10, color: C.sub } }, `${inc.date} · ${inc.note}`)
              ),
              React.createElement('div', { style: { fontSize: 15, fontWeight: 800, color: C.green } }, `+$${inc.amt}`)
            ),
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8 } },
              React.createElement('div', { style: { flex: 1, height: 5, background: 'rgba(255,255,255,0.06)', borderRadius: 3, overflow: 'hidden' } },
                React.createElement('div', { style: { width: `${inc.prob}%`, height: '100%', background: 'linear-gradient(90deg, #34D399, #14B8A6)', borderRadius: 3 } })
              ),
              React.createElement('span', { style: { fontSize: 11, color: C.green, fontWeight: 700, minWidth: 30 } }, `${inc.prob}%`)
            )
          )
        )
      ),
      React.createElement('div', { style: { marginBottom: 16 } },
        React.createElement('div', { style: { fontSize: 13, fontWeight: 700, color: C.text, marginBottom: 9 } }, 'Key Dates'),
        cashFlow.filter(d => d.ev).map((d, i) => {
          const pos = d.ev === 'Payday', low = d.b < 400 && !pos;
          const col = pos ? C.green : low ? C.red : C.amber;
          return React.createElement('div', { key: i, style: { display: 'flex', gap: 12, marginBottom: 9, alignItems: 'center' } },
            React.createElement('div', { style: { width: 38, height: 38, borderRadius: 11, background: `${col}18`, border: `1px solid ${col}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 } },
              React.createElement('span', { style: { fontSize: 13, fontWeight: 900, color: col } }, d.d)
            ),
            React.createElement('div', null,
              React.createElement('div', { style: { fontSize: 13, fontWeight: 600, color: C.text } }, d.ev),
              React.createElement('div', { style: { fontSize: 11, color: C.sub } },
                'Balance: ', React.createElement('span', { style: { color: col, fontWeight: 700 } }, `$${d.b.toLocaleString()}`)
              )
            )
          );
        })
      )
    )
  );

  const billsScreen = () => {
    const filtered = billFilter === 'all' ? billsData : billsData.filter(b => b.flex === billFilter);
    return React.createElement('div', { style: { padding: '16px 16px 0' } },
      React.createElement('div', { style: { marginBottom: 18 } },
        React.createElement('div', { style: { fontSize: 11, color: C.sub, letterSpacing: 0.5, textTransform: 'uppercase' } }, 'Bill Manager'),
        React.createElement('div', { style: { fontSize: 20, fontWeight: 800, color: C.text, marginTop: 2 } }, 'Your Bills')
      ),
      React.createElement('div', { style: { display: 'flex', gap: 7, marginBottom: 14 } },
        [['Total Due', '$1,523', C.teal], ['This Week', '$114', C.amber], ['Flexible', '$29', C.green]].map(([l, v, col]) =>
          React.createElement('div', { key: l, style: { flex: 1, background: C.card, border: `1px solid ${C.border}`, borderRadius: 13, padding: '10px 6px', textAlign: 'center' } },
            React.createElement('div', { style: { fontSize: 14, fontWeight: 800, color: col } }, v),
            React.createElement('div', { style: { fontSize: 9, color: C.sub, marginTop: 2 } }, l)
          )
        )
      ),
      React.createElement('div', { style: { display: 'flex', gap: 5, marginBottom: 14, background: C.card, borderRadius: 12, padding: 4 } },
        [['all', 'All'], ['fixed', 'Fixed'], ['semi', 'Semi'], ['flexible', 'Flex']].map(([k, l]) =>
          React.createElement('div', { key: k, onClick: () => setBillFilter(k), style: { flex: 1, textAlign: 'center', padding: '7px 3px', borderRadius: 9, cursor: 'pointer', background: billFilter === k ? C.teal : 'transparent', fontSize: 11, fontWeight: 700, color: billFilter === k ? '#000' : C.sub, transition: 'all 0.2s' } }, l)
        )
      ),
      filtered.map(b => {
        const fc = flexCfg[b.flex], paid = paidBills.has(b.id), urgent = b.days <= 4 && !paid;
        return React.createElement('div', { key: b.id, style: { background: C.card, border: `1px solid ${urgent ? 'rgba(248,113,113,0.28)' : C.border}`, borderRadius: 17, padding: '13px 14px', marginBottom: 9, opacity: paid ? 0.5 : 1, transition: 'all 0.2s' } },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12 } },
            React.createElement('div', { style: { width: 44, height: 44, borderRadius: 13, background: fc.bg, border: `1px solid ${fc.color}28`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 } }, b.emoji),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' } },
                React.createElement('div', { style: { fontSize: 14, fontWeight: 700, color: paid ? C.sub : C.text, textDecoration: paid ? 'line-through' : 'none' } }, b.name),
                React.createElement('div', { style: { fontSize: 9, fontWeight: 800, color: fc.color, background: fc.bg, padding: '2px 6px', borderRadius: 5, letterSpacing: 0.3 } }, fc.label.toUpperCase())
              ),
              React.createElement('div', { style: { fontSize: 10, color: C.sub, marginTop: 2 } }, `Due ${b.due} · ${b.days}d · ${b.note}`)
            ),
            React.createElement('div', { style: { textAlign: 'right' } },
              React.createElement('div', { style: { fontSize: 16, fontWeight: 900, color: paid ? C.sub : urgent ? C.red : C.text } }, `$${b.amount}`),
              React.createElement('div', { onClick: () => setPaidBills(prev => { const s = new Set(prev); s.has(b.id) ? s.delete(b.id) : s.add(b.id); return s; }), style: { fontSize: 10, fontWeight: 600, color: paid ? C.green : C.muted, cursor: 'pointer', marginTop: 4 } }, paid ? '✓ Paid' : 'Mark paid')
            )
          ),
          urgent && React.createElement('div', { style: { marginTop: 9, padding: '7px 10px', background: 'rgba(248,113,113,0.08)', borderRadius: 8, fontSize: 10, color: C.red, fontWeight: 500 } }, '🔴 Due soon — overlaps with risk window Mar 25–26')
        );
      }),
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: 13, borderRadius: 14, marginBottom: 16, border: `1.5px dashed ${C.border}`, cursor: 'pointer' } },
        React.createElement('span', { style: { fontSize: 18, color: C.teal } }, '+'),
        React.createElement('span', { style: { fontSize: 13, color: C.muted } }, 'Add a bill')
      )
    );
  };

  const calmScreen = () => {
    const done = calmSteps.filter((_, i) => completedActions.has(`c${i}`)).length;
    return React.createElement('div', { style: { padding: '16px 16px 0' } },
      React.createElement('div', { style: { marginBottom: 18 } },
        React.createElement('div', { style: { fontSize: 11, color: C.sub, letterSpacing: 0.5, textTransform: 'uppercase' } }, 'Stress Reducer'),
        React.createElement('div', { style: { fontSize: 20, fontWeight: 800, color: C.text, marginTop: 2 } }, 'Calm Plan')
      ),
      React.createElement('div', { style: { background: 'linear-gradient(135deg, #091422 0%, #0C1A2E 100%)', border: `1px solid rgba(56,189,248,0.18)`, borderRadius: 22, padding: '22px 18px', marginBottom: 14, textAlign: 'center', position: 'relative', overflow: 'hidden' } },
        React.createElement('div', { style: { position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 200, height: 200, borderRadius: '50%', background: `radial-gradient(circle, rgba(56,189,248,${calmMode ? 0.07 : 0.03}) 0%, transparent 70%)` } }),
        React.createElement('div', { onClick: () => setCalmMode(c => !c), style: { width: 76, height: 76, borderRadius: '50%', margin: '0 auto 14px', background: calmMode ? 'rgba(56,189,248,0.15)' : 'rgba(56,189,248,0.07)', border: `2px solid rgba(56,189,248,${calmMode ? 0.65 : 0.2})`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.8s ease', transform: calmMode && breathePulse ? 'scale(1.16)' : 'scale(1)', boxShadow: calmMode ? '0 0 40px rgba(56,189,248,0.18)' : 'none' } },
          React.createElement('span', { style: { fontSize: 30 } }, '🌬')
        ),
        React.createElement('div', { style: { fontSize: 15, fontWeight: 700, color: C.text, marginBottom: 4 } }, calmMode ? "Breathe… you've got this." : 'Tap to activate calm mode'),
        React.createElement('div', { style: { fontSize: 11, color: C.sub } }, calmMode ? 'Focus on one action at a time.' : 'Reduce decision fatigue · Clear your path forward')
      ),
      React.createElement('div', { style: { background: C.redDim, border: '1px solid rgba(248,113,113,0.18)', borderRadius: 14, padding: '12px 14px', marginBottom: 14 } },
        React.createElement('div', { style: { fontSize: 13, fontWeight: 700, color: C.red, marginBottom: 3 } }, '⚡ Stressful week ahead'),
        React.createElement('div', { style: { fontSize: 11, color: C.sub, lineHeight: 1.55 } }, 'Balance dips to ~$278 on Mar 25. Complete all 5 actions and your minimum stays above $380 — even if payday is 2 days late.')
      ),
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 } },
        React.createElement('div', { style: { fontSize: 13, fontWeight: 700, color: C.text } }, 'Priority Actions'),
        React.createElement('div', { style: { fontSize: 12, color: C.teal, fontWeight: 700 } }, `${done}/${calmSteps.length} done`)
      ),
      React.createElement('div', { style: { height: 4, background: 'rgba(255,255,255,0.06)', borderRadius: 2, marginBottom: 13, overflow: 'hidden' } },
        React.createElement('div', { style: { height: '100%', width: `${(done / calmSteps.length) * 100}%`, background: 'linear-gradient(90deg, #14B8A6, #38BDF8)', borderRadius: 2, transition: 'width 0.4s ease' } })
      ),
      calmSteps.map((s, i) => {
        const isDone = completedActions.has(`c${i}`);
        const col = s.urgency === 'red' ? C.red : s.urgency === 'amber' ? C.amber : C.teal;
        return React.createElement('div', { key: i, onClick: () => toggle(`c${i}`), style: { display: 'flex', gap: 11, alignItems: 'flex-start', padding: '11px 13px', marginBottom: 7, background: isDone ? 'rgba(52,211,153,0.06)' : C.card, border: `1px solid ${isDone ? 'rgba(52,211,153,0.2)' : C.border}`, borderRadius: 14, cursor: 'pointer', opacity: isDone ? 0.55 : 1, transition: 'all 0.2s' } },
          React.createElement('div', { style: { width: 28, height: 28, borderRadius: '50%', flexShrink: 0, background: isDone ? 'rgba(52,211,153,0.2)' : `${col}18`, border: `2px solid ${isDone ? '#34D399' : col}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 900, color: isDone ? '#34D399' : col } }, isDone ? '✓' : s.n),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', { style: { fontSize: 13, fontWeight: 600, color: isDone ? C.sub : C.text, textDecoration: isDone ? 'line-through' : 'none' } }, s.action),
            React.createElement('div', { style: { fontSize: 10, color: C.muted, marginTop: 2 } }, s.detail)
          )
        );
      }),
      React.createElement('div', { style: { background: C.greenDim, border: '1px solid rgba(52,211,153,0.18)', borderRadius: 14, padding: '12px 14px', marginBottom: 16, marginTop: 4 } },
        React.createElement('div', { style: { fontSize: 12, fontWeight: 700, color: C.green, marginBottom: 5 } }, '✅ If you follow this plan:'),
        React.createElement('div', { style: { fontSize: 11, color: C.sub, lineHeight: 1.65 } },
          '· Min balance stays above $380 (vs $278 today)\n· Rent fully covered with $45 buffer\n· No overdraft risk even if payday is 2 days late\n· Total effort: ~3 minutes of your time'
        )
      )
    );
  };

  const profileScreen = () => (
    React.createElement('div', { style: { padding: '16px 16px 0' } },
      React.createElement('div', { style: { marginBottom: 18 } },
        React.createElement('div', { style: { fontSize: 11, color: C.sub, letterSpacing: 0.5, textTransform: 'uppercase' } }, 'Account'),
        React.createElement('div', { style: { fontSize: 20, fontWeight: 800, color: C.text, marginTop: 2 } }, 'Profile')
      ),
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 14, background: C.card, border: `1px solid ${C.borderHi}`, borderRadius: 20, padding: '16px 16px', marginBottom: 18 } },
        React.createElement('div', { style: { width: 58, height: 58, borderRadius: 18, background: 'linear-gradient(135deg, #14B8A6, #38BDF8)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 900, color: '#000', flexShrink: 0 } }, 'A'),
        React.createElement('div', null,
          React.createElement('div', { style: { fontSize: 17, fontWeight: 800, color: C.text } }, 'Alex Rivera'),
          React.createElement('div', { style: { fontSize: 12, color: C.sub, marginTop: 2 } }, 'alex.rivera@email.com'),
          React.createElement('div', { style: { fontSize: 10, color: C.teal, fontWeight: 700, background: C.tealDim, padding: '3px 9px', borderRadius: 6, marginTop: 5, display: 'inline-block' } }, 'Gig Worker · Rideshare')
        )
      ),
      React.createElement('div', { style: { marginBottom: 16 } },
        React.createElement('div', { style: { fontSize: 13, fontWeight: 700, color: C.text, marginBottom: 9 } }, 'Income Sources'),
        [
          { src: 'Uber / Rideshare', type: 'Variable', emoji: '🚗', avg: '~$340/wk', linked: true },
          { src: 'Client: Alex Davidson', type: 'Freelance', emoji: '💼', avg: '~$600/mo', linked: true },
          { src: 'Weekend Shifts', type: 'Part-time', emoji: '⏰', avg: '~$210/wk', linked: false },
        ].map((inc, i) =>
          React.createElement('div', { key: i, style: { display: 'flex', alignItems: 'center', gap: 12, background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: '11px 13px', marginBottom: 7 } },
            React.createElement('span', { style: { fontSize: 22 } }, inc.emoji),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', { style: { fontSize: 13, fontWeight: 600, color: C.text } }, inc.src),
              React.createElement('div', { style: { fontSize: 10, color: C.sub } }, `${inc.type} · ${inc.avg}`)
            ),
            React.createElement('div', { style: { fontSize: 10, fontWeight: 700, color: inc.linked ? C.green : C.muted, background: inc.linked ? C.greenDim : 'rgba(255,255,255,0.05)', padding: '3px 9px', borderRadius: 6 } }, inc.linked ? 'Linked' : 'Manual')
          )
        )
      ),
      React.createElement('div', { style: { marginBottom: 16 } },
        React.createElement('div', { style: { fontSize: 13, fontWeight: 700, color: C.text, marginBottom: 9 } }, 'Settings'),
        [
          { emoji: '🔔', label: 'Smart Notifications', sub: 'Alerts before tight windows', on: true },
          { emoji: '🎯', label: 'Calm Plan Auto-trigger', sub: 'Activates when stress score > 7', on: true },
          { emoji: '📊', label: 'Income Tracking', sub: 'Learn from payment history', on: false },
          { emoji: '🏦', label: 'Connected Bank', sub: 'Chase ••••4521 · Syncing', on: true },
        ].map((s, i) =>
          React.createElement('div', { key: i, style: { display: 'flex', alignItems: 'center', gap: 12, background: C.card, border: `1px solid ${C.border}`, borderRadius: 13, padding: '11px 13px', marginBottom: 6 } },
            React.createElement('span', { style: { fontSize: 18 } }, s.emoji),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', { style: { fontSize: 13, fontWeight: 600, color: C.text } }, s.label),
              React.createElement('div', { style: { fontSize: 10, color: C.sub } }, s.sub)
            ),
            React.createElement('div', { style: { width: 38, height: 22, borderRadius: 11, background: s.on ? C.teal : C.muted, position: 'relative', cursor: 'pointer', transition: 'background 0.25s', flexShrink: 0 } },
              React.createElement('div', { style: { position: 'absolute', top: 3, left: s.on ? 19 : 3, width: 16, height: 16, borderRadius: '50%', background: '#fff', transition: 'left 0.25s', boxShadow: '0 1px 4px rgba(0,0,0,0.3)' } })
            )
          )
        )
      )
    )
  );

  const navItems = [
    { key: 'home', label: 'Home', icon: 'Home' },
    { key: 'forecast', label: 'Forecast', icon: 'TrendingUp' },
    { key: 'bills', label: 'Bills', icon: 'List' },
    { key: 'calm', label: 'Calm', icon: 'Wind' },
    { key: 'profile', label: 'Profile', icon: 'User' },
  ];

  const screens = { home: homeScreen, forecast: forecastScreen, bills: billsScreen, calm: calmScreen, profile: profileScreen };

  return React.createElement(React.Fragment, null,
    React.createElement('style', null, `
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
      *, *::before, *::after { box-sizing: border-box; }
      body { background: #020810; font-family: 'Inter', -apple-system, sans-serif; margin: 0; }
      ::-webkit-scrollbar { display: none; }
      * { scrollbar-width: none; -ms-overflow-style: none; }
    `),
    React.createElement('div', { style: { minHeight: '100vh', background: 'radial-gradient(ellipse 80% 60% at 50% 30%, #0B1830 0%, #020810 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 } },
      React.createElement('div', { style: { width: 375, height: 812, background: C.bg, borderRadius: 54, overflow: 'hidden', position: 'relative', boxShadow: '0 50px 100px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.09), inset 0 0 0 1px rgba(255,255,255,0.04)', display: 'flex', flexDirection: 'column', fontFamily: "'Inter', sans-serif" } },
        React.createElement('div', { style: { position: 'absolute', top: 14, left: '50%', transform: 'translateX(-50%)', width: 126, height: 37, background: '#000', borderRadius: 20, zIndex: 100, boxShadow: '0 0 0 1px rgba(255,255,255,0.1)' } }),
        React.createElement('div', { style: { height: 59, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '0 26px 10px', flexShrink: 0 } },
          React.createElement('span', { style: { fontSize: 13, fontWeight: 700, color: '#fff', letterSpacing: -0.3 } }, '9:41'),
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6 } },
            React.createElement('div', { style: { display: 'flex', alignItems: 'flex-end', gap: 1.5, height: 12 } },
              [4, 7, 10, 12].map((h, i) => React.createElement('div', { key: i, style: { width: 3, height: h, background: i < 3 ? '#fff' : 'rgba(255,255,255,0.3)', borderRadius: 1 } }))
            ),
            React.createElement('svg', { width: 16, height: 12, viewBox: '0 0 16 12' },
              React.createElement('path', { d: 'M8 9.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2z', fill: 'white' }),
              React.createElement('path', { d: 'M4 6.5q2-2.5 8 0', stroke: 'white', strokeWidth: 1.5, fill: 'none', strokeLinecap: 'round', opacity: 0.7 }),
              React.createElement('path', { d: 'M1 3.5q3.5-3.5 14 0', stroke: 'white', strokeWidth: 1.5, fill: 'none', strokeLinecap: 'round', opacity: 0.4 })
            ),
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 1 } },
              React.createElement('div', { style: { width: 23, height: 12, border: '1.5px solid rgba(255,255,255,0.75)', borderRadius: 3, padding: 2 } },
                React.createElement('div', { style: { width: '78%', height: '100%', background: '#34D399', borderRadius: 1 } })
              ),
              React.createElement('div', { style: { width: 2, height: 5, background: 'rgba(255,255,255,0.5)', borderRadius: '0 1px 1px 0' } })
            )
          )
        ),
        React.createElement('div', { style: { flex: 1, overflowY: 'auto', WebkitOverflowScrolling: 'touch' } },
          (screens[activeTab] || screens.home)()
        ),
        React.createElement('div', { style: { height: 82, background: 'rgba(7,13,26,0.97)', backdropFilter: 'blur(20px)', borderTop: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', padding: '0 2px 8px', flexShrink: 0 } },
          navItems.map(item => {
            const active = activeTab === item.key;
            const IconComp = window.lucide && window.lucide[item.icon];
            return React.createElement('div', { key: item.key, onClick: () => setActiveTab(item.key), style: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, cursor: 'pointer', padding: '8px 2px', transition: 'transform 0.15s', transform: active ? 'scale(1.06)' : 'scale(1)' } },
              React.createElement('div', { style: { width: 44, height: 28, borderRadius: 14, background: active ? C.tealDim : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s' } },
                IconComp
                  ? React.createElement(IconComp, { size: 20, color: active ? C.teal : 'rgba(148,163,184,0.5)', strokeWidth: active ? 2.5 : 1.8 })
                  : React.createElement('span', { style: { fontSize: 16 } }, { home: '🏠', forecast: '📈', bills: '📋', calm: '🌬', profile: '👤' }[item.key])
              ),
              React.createElement('span', { style: { fontSize: 9, fontWeight: active ? 800 : 500, color: active ? C.teal : 'rgba(148,163,184,0.45)', letterSpacing: 0.2 } }, item.label)
            );
          })
        )
      )
    )
  );
}
