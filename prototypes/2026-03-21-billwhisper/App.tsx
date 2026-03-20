function App() {
  const { useState, useEffect, useRef } = React;

  // Load Google Fonts
  const fontStyle = `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');`;

  const [activeTab, setActiveTab] = useState('forecast');
  const [pressedBtn, setPressedBtn] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [simAmount, setSimAmount] = useState('');
  const [simResult, setSimResult] = useState(null);
  const [toggledItems, setToggledItems] = useState({});
  const [animating, setAnimating] = useState(false);
  const [prevTab, setPrevTab] = useState('forecast');

  const colors = {
    bg: '#080C14',
    surface: '#0F1622',
    card: '#141D2E',
    cardHover: '#1A2540',
    border: '#1E2D47',
    primary: '#00C2A8',
    primaryDim: 'rgba(0,194,168,0.15)',
    primaryGlow: 'rgba(0,194,168,0.3)',
    warning: '#F59E0B',
    warningDim: 'rgba(245,158,11,0.15)',
    danger: '#EF4444',
    dangerDim: 'rgba(239,68,68,0.15)',
    safe: '#10B981',
    safeDim: 'rgba(16,185,129,0.15)',
    text: '#F0F4FF',
    textMuted: '#8896B3',
    textDim: '#4A5A7A',
    accent: '#6366F1',
    accentDim: 'rgba(99,102,241,0.15)',
  };

  const handleTabPress = (tab) => {
    if (tab === activeTab) return;
    setPrevTab(activeTab);
    setAnimating(true);
    setTimeout(() => {
      setActiveTab(tab);
      setAnimating(false);
    }, 150);
  };

  const handleBtn = (id, fn) => {
    setPressedBtn(id);
    setTimeout(() => setPressedBtn(null), 200);
    if (fn) fn();
  };

  const toggleItem = (key) => {
    setToggledItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const runSim = (label, amount) => {
    const amt = parseFloat(amount || simAmount);
    if (!amt) return;
    const balance = 1247;
    const upcoming = 847;
    const cushion = balance - upcoming;
    const risk = amt > cushion * 0.8 ? 'high' : amt > cushion * 0.4 ? 'medium' : 'low';
    setSimResult({ label: label || `$${amt} purchase`, amount: amt, risk, cushion, remaining: cushion - amt });
  };

  // --- Forecast Screen ---
  const forecastDays = [
    { day: 'Today', label: 'Fri', balance: 1247, risk: 'safe', icon: '🟢' },
    { day: 'Sat', label: 'Sat', balance: 1180, risk: 'safe', icon: '🟢' },
    { day: 'Sun', label: 'Sun', balance: 1050, risk: 'safe', icon: '🟢' },
    { day: 'Mon', label: 'Mon', balance: 340, risk: 'danger', icon: '🔴', event: 'Rent $720' },
    { day: 'Tue', label: 'Tue', balance: 280, risk: 'danger', icon: '🔴' },
    { day: 'Wed', label: 'Wed', balance: 245, risk: 'danger', icon: '🔴', event: 'Car ins. $95' },
    { day: 'Thu', label: 'Thu', balance: 2145, risk: 'safe', icon: '🟢', event: '💰 Paycheck' },
    { day: 'Fri+', label: 'Fri+', balance: 1890, risk: 'safe', icon: '🟢' },
  ];

  const upcomingBills = [
    { name: 'Rent', amount: 720, dueIn: 3, risk: 'danger', icon: '🏠' },
    { name: 'Car Insurance', amount: 95, dueIn: 5, risk: 'warning', icon: '🚗' },
    { name: 'Netflix', amount: 15, dueIn: 7, risk: 'safe', icon: '📺' },
    { name: 'Spotify', amount: 10, dueIn: 9, risk: 'safe', icon: '🎵' },
    { name: 'Gym', amount: 45, dueIn: 11, risk: 'safe', icon: '💪' },
  ];

  const riskColor = (r) => r === 'danger' ? colors.danger : r === 'warning' ? colors.warning : colors.safe;
  const riskBg = (r) => r === 'danger' ? colors.dangerDim : r === 'warning' ? colors.warningDim : colors.safeDim;

  // Bar chart heights
  const maxBal = 2145;
  const barH = (b) => Math.max(6, (b / maxBal) * 72);

  const ForecastScreen = () => (
    <div style={{ padding: '0 16px 80px', overflowY: 'auto', height: '100%' }}>
      {/* Weather Banner */}
      <div style={{
        background: `linear-gradient(135deg, #0A1628 0%, #0F2040 50%, ${colors.primary}22 100%)`,
        borderRadius: 20, padding: '20px', marginBottom: 16,
        border: `1px solid ${colors.border}`, position: 'relative', overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute', top: -30, right: -20,
          width: 120, height: 120, borderRadius: '50%',
          background: `radial-gradient(circle, ${colors.warning}33 0%, transparent 70%)`
        }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ color: colors.textMuted, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 4 }}>Financial Weather</div>
            <div style={{ color: colors.warning, fontSize: 26, fontWeight: 800, lineHeight: 1.1 }}>⚠️ Stormy</div>
            <div style={{ color: colors.text, fontSize: 13, marginTop: 6, opacity: 0.85 }}>Rough patch in 3 days</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ color: colors.textMuted, fontSize: 11, marginBottom: 2 }}>Checking balance</div>
            <div style={{ color: colors.text, fontSize: 28, fontWeight: 800 }}>$1,247</div>
            <div style={{ color: colors.danger, fontSize: 12, marginTop: 2 }}>↓ Low point: $245 in 5d</div>
          </div>
        </div>
        {/* Risk gauge */}
        <div style={{ marginTop: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
            <span style={{ color: colors.textMuted, fontSize: 11 }}>30-day risk score</span>
            <span style={{ color: colors.warning, fontSize: 11, fontWeight: 600 }}>67 / 100 — Moderate</span>
          </div>
          <div style={{ background: colors.border, borderRadius: 6, height: 6 }}>
            <div style={{
              background: `linear-gradient(90deg, ${colors.safe}, ${colors.warning}, ${colors.danger})`,
              width: '67%', height: '100%', borderRadius: 6,
              boxShadow: `0 0 8px ${colors.warning}88`
            }} />
          </div>
        </div>
      </div>

      {/* 8-Day Bar Chart */}
      <div style={{ background: colors.card, borderRadius: 16, padding: '16px', marginBottom: 16, border: `1px solid ${colors.border}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <span style={{ color: colors.text, fontSize: 13, fontWeight: 600 }}>Cash Flow Forecast</span>
          <span style={{ color: colors.primary, fontSize: 11 }}>8-day view</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 88 }}>
          {forecastDays.map((d, i) => (
            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
              {d.event && (
                <div style={{
                  fontSize: 8, color: d.risk === 'safe' ? colors.primary : colors.danger,
                  textAlign: 'center', lineHeight: 1.2, maxWidth: 36,
                  marginBottom: 2, fontWeight: 600
                }}>{d.event.split(' ')[0]}</div>
              )}
              {!d.event && <div style={{ height: 16 }} />}
              <div style={{
                width: '100%', borderRadius: '4px 4px 0 0',
                height: barH(d.balance),
                background: d.risk === 'danger'
                  ? `linear-gradient(180deg, ${colors.danger}CC, ${colors.danger}66)`
                  : d.risk === 'warning'
                    ? `linear-gradient(180deg, ${colors.warning}CC, ${colors.warning}66)`
                    : `linear-gradient(180deg, ${colors.primary}CC, ${colors.primary}44)`,
                boxShadow: d.risk === 'danger' ? `0 0 6px ${colors.danger}66` : `0 0 6px ${colors.primary}44`,
                transition: 'all 0.3s ease'
              }} />
              <span style={{ color: colors.textMuted, fontSize: 9, textAlign: 'center' }}>{d.label}</span>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 12, marginTop: 10, justifyContent: 'center' }}>
          {[['safe', 'Safe'], ['danger', 'Risky'], ['warning', 'Caution']].map(([r, l]) => (
            <div key={r} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <div style={{ width: 8, height: 8, borderRadius: 2, background: riskColor(r) }} />
              <span style={{ color: colors.textMuted, fontSize: 10 }}>{l}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Bills */}
      <div style={{ background: colors.card, borderRadius: 16, padding: '16px', border: `1px solid ${colors.border}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <span style={{ color: colors.text, fontSize: 13, fontWeight: 600 }}>Upcoming Bills</span>
          <span style={{ color: colors.primary, fontSize: 11 }}>30 days</span>
        </div>
        {upcomingBills.map((bill, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '10px 0', borderBottom: i < upcomingBills.length - 1 ? `1px solid ${colors.border}` : 'none'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 34, height: 34, borderRadius: 10, background: riskBg(bill.risk),
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16
              }}>{bill.icon}</div>
              <div>
                <div style={{ color: colors.text, fontSize: 13, fontWeight: 500 }}>{bill.name}</div>
                <div style={{ color: colors.textMuted, fontSize: 11 }}>Due in {bill.dueIn} days</div>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ color: colors.text, fontSize: 13, fontWeight: 600 }}>-${bill.amount}</div>
              <div style={{
                fontSize: 10, color: riskColor(bill.risk), fontWeight: 500,
                background: riskBg(bill.risk), borderRadius: 4, padding: '1px 6px', marginTop: 2
              }}>
                {bill.risk === 'danger' ? 'High risk' : bill.risk === 'warning' ? 'Watch' : 'OK'}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // --- Alerts Screen ---
  const alerts = [
    {
      id: 'a1', type: 'danger', icon: '🚨', title: 'Paycheck Gap Alert',
      body: 'Your rent ($720) clears Monday but your next paycheck arrives Thursday. You\'ll dip to $245.',
      time: 'Now', action: 'Move to buffer', tag: 'URGENT'
    },
    {
      id: 'a2', type: 'warning', icon: '⏸️', title: 'Hold Off 48 Hours',
      body: 'Avoid non-essential spending today and tomorrow. Your car insurance ($95) hits Wednesday.',
      time: '2h ago', action: 'Set reminder', tag: 'TIMING'
    },
    {
      id: 'a3', type: 'safe', icon: '✅', title: 'Safe to Spend: Thursday',
      body: 'After your paycheck lands Thursday, you\'ll have $1,298 cushion. Good window for bigger purchases.',
      time: '5h ago', action: 'Plan a purchase', tag: 'GREEN LIGHT'
    },
    {
      id: 'a4', type: 'warning', icon: '🔁', title: 'Subscription Collision',
      body: 'Netflix ($15) and Spotify ($10) both renew within 2 days of your car insurance. $120 exits in 72h.',
      time: 'Yesterday', action: 'Review subs', tag: 'FRICTION'
    },
    {
      id: 'a5', type: 'danger', icon: '💳', title: 'Overdraft Risk: Weekend',
      body: 'Your weekend spending pattern averages $180 but your pre-rent balance won\'t support that safely.',
      time: 'Yesterday', action: 'See forecast', tag: 'PREDICT'
    },
  ];

  const AlertsScreen = () => (
    <div style={{ padding: '0 16px 80px', overflowY: 'auto', height: '100%' }}>
      {/* Summary strip */}
      <div style={{
        display: 'flex', gap: 8, marginBottom: 16
      }}>
        {[['2', 'Urgent', colors.danger, colors.dangerDim], ['2', 'Caution', colors.warning, colors.warningDim], ['1', 'Green', colors.safe, colors.safeDim]].map(([n, l, c, bg], i) => (
          <div key={i} style={{
            flex: 1, background: bg, borderRadius: 12, padding: '10px 8px', textAlign: 'center',
            border: `1px solid ${c}44`
          }}>
            <div style={{ color: c, fontSize: 20, fontWeight: 800 }}>{n}</div>
            <div style={{ color: c, fontSize: 10, opacity: 0.8 }}>{l}</div>
          </div>
        ))}
      </div>

      {alerts.map((alert, i) => (
        <div key={alert.id} style={{
          background: colors.card, borderRadius: 16, padding: '14px',
          marginBottom: 10, border: `1px solid ${riskColor(alert.type)}33`,
          borderLeft: `3px solid ${riskColor(alert.type)}`
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 18 }}>{alert.icon}</span>
              <div>
                <div style={{ color: colors.text, fontSize: 13, fontWeight: 600 }}>{alert.title}</div>
                <div style={{ color: colors.textMuted, fontSize: 10 }}>{alert.time}</div>
              </div>
            </div>
            <div style={{
              background: riskBg(alert.type), color: riskColor(alert.type),
              fontSize: 9, fontWeight: 700, borderRadius: 4, padding: '2px 7px',
              letterSpacing: '0.06em'
            }}>{alert.tag}</div>
          </div>
          <p style={{ color: colors.textMuted, fontSize: 12, lineHeight: 1.5, margin: '0 0 10px' }}>{alert.body}</p>
          <button
            onClick={() => handleBtn(alert.id)}
            style={{
              background: pressedBtn === alert.id ? riskColor(alert.type) : riskBg(alert.type),
              color: pressedBtn === alert.id ? '#fff' : riskColor(alert.type),
              border: `1px solid ${riskColor(alert.type)}44`,
              borderRadius: 8, padding: '7px 14px', fontSize: 12, fontWeight: 600,
              cursor: 'pointer', transition: 'all 0.15s',
              transform: pressedBtn === alert.id ? 'scale(0.97)' : 'scale(1)'
            }}
          >{alert.action} →</button>
        </div>
      ))}
    </div>
  );

  // --- Simulate Screen ---
  const scenarios = [
    { label: 'Concert tickets', amount: 120, icon: '🎵' },
    { label: 'Groceries run', amount: 85, icon: '🛒' },
    { label: 'Dinner out', amount: 65, icon: '🍽️' },
    { label: 'Gas fill-up', amount: 55, icon: '⛽' },
  ];

  const SimulateScreen = () => (
    <div style={{ padding: '0 16px 80px', overflowY: 'auto', height: '100%' }}>
      {/* Header card */}
      <div style={{
        background: `linear-gradient(135deg, ${colors.accentDim}, ${colors.card})`,
        borderRadius: 20, padding: '18px', marginBottom: 16,
        border: `1px solid ${colors.accent}33`
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
          <span style={{ fontSize: 24 }}>🔮</span>
          <div>
            <div style={{ color: colors.text, fontSize: 15, fontWeight: 700 }}>What-If Simulator</div>
            <div style={{ color: colors.textMuted, fontSize: 11 }}>Test before you spend</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <div style={{ flex: 1, background: colors.surface, borderRadius: 10, padding: '8px 12px', border: `1px solid ${colors.border}` }}>
            <div style={{ color: colors.textMuted, fontSize: 10 }}>Available cushion</div>
            <div style={{ color: colors.primary, fontSize: 16, fontWeight: 700 }}>$400</div>
            <div style={{ color: colors.textMuted, fontSize: 9 }}>after bills</div>
          </div>
          <div style={{ flex: 1, background: colors.surface, borderRadius: 10, padding: '8px 12px', border: `1px solid ${colors.border}` }}>
            <div style={{ color: colors.textMuted, fontSize: 10 }}>Safe to spend</div>
            <div style={{ color: colors.safe, fontSize: 16, fontWeight: 700 }}>$200</div>
            <div style={{ color: colors.textMuted, fontSize: 9 }}>without risk</div>
          </div>
          <div style={{ flex: 1, background: colors.surface, borderRadius: 10, padding: '8px 12px', border: `1px solid ${colors.border}` }}>
            <div style={{ color: colors.textMuted, fontSize: 10 }}>Next paycheck</div>
            <div style={{ color: colors.warning, fontSize: 16, fontWeight: 700 }}>6 days</div>
            <div style={{ color: colors.textMuted, fontSize: 9 }}>$1,900</div>
          </div>
        </div>
      </div>

      {/* Custom amount */}
      <div style={{ background: colors.card, borderRadius: 16, padding: '16px', marginBottom: 16, border: `1px solid ${colors.border}` }}>
        <div style={{ color: colors.text, fontSize: 13, fontWeight: 600, marginBottom: 10 }}>Enter custom amount</div>
        <div style={{ display: 'flex', gap: 8 }}>
          <div style={{
            flex: 1, background: colors.surface, borderRadius: 10,
            border: `1px solid ${colors.border}`, padding: '10px 14px',
            display: 'flex', alignItems: 'center', gap: 6
          }}>
            <span style={{ color: colors.primary, fontSize: 16, fontWeight: 700 }}>$</span>
            <input
              type="number"
              placeholder="0.00"
              value={simAmount}
              onChange={e => { setSimAmount(e.target.value); setSimResult(null); }}
              style={{
                background: 'transparent', border: 'none', outline: 'none',
                color: colors.text, fontSize: 18, fontWeight: 600, width: '100%',
                fontFamily: 'Inter, sans-serif'
              }}
            />
          </div>
          <button
            onClick={() => handleBtn('sim-run', () => runSim(null, simAmount))}
            style={{
              background: pressedBtn === 'sim-run' ? colors.primary : colors.primaryDim,
              color: pressedBtn === 'sim-run' ? '#000' : colors.primary,
              border: `1px solid ${colors.primary}55`,
              borderRadius: 10, padding: '0 18px', fontSize: 13, fontWeight: 700,
              cursor: 'pointer', transition: 'all 0.15s',
              transform: pressedBtn === 'sim-run' ? 'scale(0.95)' : 'scale(1)'
            }}
          >Test</button>
        </div>
      </div>

      {/* Quick scenarios */}
      <div style={{ color: colors.textMuted, fontSize: 11, marginBottom: 8, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Quick scenarios</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 16 }}>
        {scenarios.map((s, i) => (
          <button
            key={i}
            onClick={() => handleBtn(`sc-${i}`, () => { setSimAmount(s.amount.toString()); runSim(s.label, s.amount); })}
            style={{
              background: pressedBtn === `sc-${i}` ? colors.cardHover : colors.card,
              border: `1px solid ${colors.border}`,
              borderRadius: 12, padding: '12px', textAlign: 'left',
              cursor: 'pointer', transition: 'all 0.15s',
              transform: pressedBtn === `sc-${i}` ? 'scale(0.97)' : 'scale(1)'
            }}
          >
            <div style={{ fontSize: 20, marginBottom: 4 }}>{s.icon}</div>
            <div style={{ color: colors.text, fontSize: 12, fontWeight: 500 }}>{s.label}</div>
            <div style={{ color: colors.primary, fontSize: 14, fontWeight: 700 }}>${s.amount}</div>
          </button>
        ))}
      </div>

      {/* Result card */}
      {simResult && (
        <div style={{
          background: simResult.risk === 'high' ? colors.dangerDim : simResult.risk === 'medium' ? colors.warningDim : colors.safeDim,
          border: `1px solid ${simResult.risk === 'high' ? colors.danger : simResult.risk === 'medium' ? colors.warning : colors.safe}55`,
          borderRadius: 16, padding: '16px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <div style={{ color: colors.text, fontSize: 14, fontWeight: 700 }}>{simResult.label}</div>
            <div style={{
              color: simResult.risk === 'high' ? colors.danger : simResult.risk === 'medium' ? colors.warning : colors.safe,
              fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em'
            }}>
              {simResult.risk === 'high' ? '⛔ HIGH RISK' : simResult.risk === 'medium' ? '⚠️ CAUTION' : '✅ SAFE'}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <div style={{ flex: 1, background: 'rgba(0,0,0,0.2)', borderRadius: 8, padding: '8px 10px' }}>
              <div style={{ color: colors.textMuted, fontSize: 10 }}>Spending</div>
              <div style={{ color: colors.text, fontSize: 14, fontWeight: 700 }}>-${simResult.amount}</div>
            </div>
            <div style={{ flex: 1, background: 'rgba(0,0,0,0.2)', borderRadius: 8, padding: '8px 10px' }}>
              <div style={{ color: colors.textMuted, fontSize: 10 }}>Remaining</div>
              <div style={{
                color: simResult.remaining < 0 ? colors.danger : colors.text,
                fontSize: 14, fontWeight: 700
              }}>${simResult.remaining}</div>
            </div>
          </div>
          <p style={{ color: colors.textMuted, fontSize: 12, lineHeight: 1.5, margin: '10px 0 0' }}>
            {simResult.risk === 'high'
              ? `⚠️ This would leave you with only $${simResult.remaining} cushion — dangerously close to overdraft territory given your upcoming rent.`
              : simResult.risk === 'medium'
                ? `Watch out — spending $${simResult.amount} eats into your bills buffer. Consider waiting until Thursday after your paycheck.`
                : `You're good! $${simResult.amount} is within your safe zone. Your bills are covered and you'll still have $${simResult.remaining} cushion.`
            }
          </p>
        </div>
      )}
    </div>
  );

  // --- Insights Screen ---
  const subs = [
    { name: 'Netflix', amount: 15.99, next: 'Mar 24', status: 'active', icon: '📺', collision: true },
    { name: 'Spotify', amount: 9.99, next: 'Mar 25', status: 'active', icon: '🎵', collision: true },
    { name: 'Adobe CC', amount: 54.99, next: 'Apr 1', status: 'active', icon: '🎨', collision: false },
    { name: 'iCloud', amount: 2.99, next: 'Mar 28', status: 'active', icon: '☁️', collision: false },
    { name: 'Amazon Prime', amount: 14.99, next: 'Apr 5', status: 'active', icon: '📦', collision: false },
    { name: 'Headspace', amount: 12.99, next: 'Apr 3', status: 'paused', icon: '🧘', collision: false },
  ];

  const patterns = [
    { icon: '🍔', label: 'Food delivery spikes Mon–Wed', sub: 'Avg $47 extra vs. weekend', color: colors.warning },
    { icon: '⛽', label: 'Gas every 12 days', sub: 'Next predicted: Mar 26', color: colors.primary },
    { icon: '🛒', label: 'Grocery runs: biweekly', sub: 'Usually Fri, ~$85', color: colors.safe },
    { icon: '🎉', label: 'Weekend social spending', sub: 'Avg $140, spikes in summer', color: colors.accent },
  ];

  const InsightsScreen = () => (
    <div style={{ padding: '0 16px 80px', overflowY: 'auto', height: '100%' }}>
      {/* Monthly summary */}
      <div style={{ background: colors.card, borderRadius: 16, padding: '16px', marginBottom: 16, border: `1px solid ${colors.border}` }}>
        <div style={{ color: colors.text, fontSize: 13, fontWeight: 600, marginBottom: 12 }}>March Overview</div>
        <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
          {[['Income', '$3,800', colors.safe], ['Bills', '$1,240', colors.danger], ['Variable', '$680', colors.warning], ['Buffer', '$1,880', colors.primary]].map(([l, v, c], i) => (
            <div key={i} style={{ flex: 1, background: colors.surface, borderRadius: 8, padding: '8px 6px', textAlign: 'center' }}>
              <div style={{ color: c, fontSize: 12, fontWeight: 700 }}>{v}</div>
              <div style={{ color: colors.textMuted, fontSize: 9 }}>{l}</div>
            </div>
          ))}
        </div>
        {/* Stacked bar */}
        <div style={{ background: colors.border, borderRadius: 6, height: 8, overflow: 'hidden', display: 'flex' }}>
          <div style={{ width: '32.6%', background: colors.danger, height: '100%' }} />
          <div style={{ width: '17.9%', background: colors.warning, height: '100%' }} />
          <div style={{ width: '49.5%', background: colors.primary, height: '100%' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 5 }}>
          <span style={{ color: colors.textMuted, fontSize: 9 }}>Bills 33%</span>
          <span style={{ color: colors.textMuted, fontSize: 9 }}>Variable 18%</span>
          <span style={{ color: colors.textMuted, fontSize: 9 }}>Yours 49%</span>
        </div>
      </div>

      {/* Subscription radar */}
      <div style={{ background: colors.card, borderRadius: 16, padding: '16px', marginBottom: 16, border: `1px solid ${colors.border}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
          <div style={{ color: colors.text, fontSize: 13, fontWeight: 600 }}>Subscription Radar</div>
          <div style={{ color: colors.warning, fontSize: 11, background: colors.warningDim, borderRadius: 4, padding: '2px 7px' }}>2 collisions</div>
        </div>
        <div style={{ color: colors.textMuted, fontSize: 11, marginBottom: 12 }}>Monthly: $111.94</div>
        {subs.map((s, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '9px 0', borderBottom: i < subs.length - 1 ? `1px solid ${colors.border}` : 'none',
            opacity: s.status === 'paused' ? 0.5 : 1
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 32, height: 32, borderRadius: 9,
                background: s.collision ? colors.warningDim : s.status === 'paused' ? colors.border : colors.surface,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15,
                border: s.collision ? `1px solid ${colors.warning}55` : 'none'
              }}>{s.icon}</div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <span style={{ color: colors.text, fontSize: 13, fontWeight: 500 }}>{s.name}</span>
                  {s.collision && <span style={{ fontSize: 9, color: colors.warning, fontWeight: 700 }}>⚠️ COLLISION</span>}
                </div>
                <div style={{ color: colors.textMuted, fontSize: 11 }}>Renews {s.next}</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ color: colors.text, fontSize: 12, fontWeight: 600 }}>${s.amount}</div>
              <div
                onClick={() => toggleItem(`sub-${i}`)}
                style={{
                  width: 32, height: 18, borderRadius: 9,
                  background: (toggledItems[`sub-${i}`] || s.status === 'active') && s.status !== 'paused' ? colors.primary : colors.border,
                  position: 'relative', cursor: 'pointer', transition: 'background 0.2s'
                }}
              >
                <div style={{
                  position: 'absolute', top: 2,
                  left: (toggledItems[`sub-${i}`] || s.status === 'active') && s.status !== 'paused' ? 14 : 2,
                  width: 14, height: 14, borderRadius: '50%', background: '#fff',
                  transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.3)'
                }} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Spending patterns */}
      <div style={{ background: colors.card, borderRadius: 16, padding: '16px', border: `1px solid ${colors.border}` }}>
        <div style={{ color: colors.text, fontSize: 13, fontWeight: 600, marginBottom: 12 }}>Detected Patterns</div>
        {patterns.map((p, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '9px 0', borderBottom: i < patterns.length - 1 ? `1px solid ${colors.border}` : 'none'
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: `${p.color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18
            }}>{p.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ color: colors.text, fontSize: 12, fontWeight: 500 }}>{p.label}</div>
              <div style={{ color: colors.textMuted, fontSize: 11 }}>{p.sub}</div>
            </div>
            <div style={{ width: 4, height: 28, borderRadius: 2, background: p.color }} />
          </div>
        ))}
      </div>
    </div>
  );

  // --- Profile Screen ---
  const ProfileScreen = () => (
    <div style={{ padding: '0 16px 80px', overflowY: 'auto', height: '100%' }}>
      {/* Profile card */}
      <div style={{
        background: `linear-gradient(135deg, ${colors.primaryDim}, ${colors.card})`,
        borderRadius: 20, padding: '20px', marginBottom: 16,
        border: `1px solid ${colors.primary}33`, textAlign: 'center'
      }}>
        <div style={{
          width: 64, height: 64, borderRadius: '50%',
          background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 26, margin: '0 auto 10px', boxShadow: `0 0 20px ${colors.primary}55`
        }}>👤</div>
        <div style={{ color: colors.text, fontSize: 16, fontWeight: 700 }}>Alex Rivera</div>
        <div style={{ color: colors.textMuted, fontSize: 12, marginTop: 2 }}>alex@email.com</div>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 5, marginTop: 8,
          background: colors.primaryDim, borderRadius: 20, padding: '4px 12px',
          border: `1px solid ${colors.primary}33`
        }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: colors.primary }} />
          <span style={{ color: colors.primary, fontSize: 11, fontWeight: 600 }}>Pro Plan • Linked 3 accounts</span>
        </div>
      </div>

      {/* Paycheck settings */}
      <div style={{ background: colors.card, borderRadius: 16, padding: '16px', marginBottom: 16, border: `1px solid ${colors.border}` }}>
        <div style={{ color: colors.text, fontSize: 13, fontWeight: 600, marginBottom: 12 }}>Paycheck Settings</div>
        {[
          ['💰', 'Amount', '$1,900.00', colors.primary],
          ['📅', 'Frequency', 'Bi-weekly (Thursdays)', colors.text],
          ['🏦', 'Direct deposit', 'Chase ****4521', colors.text],
          ['⏰', 'Alert timing', '3 days before gap', colors.warning],
        ].map(([icon, label, val, c], i) => (
          <div key={i} style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '9px 0', borderBottom: i < 3 ? `1px solid ${colors.border}` : 'none'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span>{icon}</span>
              <span style={{ color: colors.textMuted, fontSize: 12 }}>{label}</span>
            </div>
            <span style={{ color: c, fontSize: 12, fontWeight: 500 }}>{val}</span>
          </div>
        ))}
      </div>

      {/* Connected accounts */}
      <div style={{ background: colors.card, borderRadius: 16, padding: '16px', marginBottom: 16, border: `1px solid ${colors.border}` }}>
        <div style={{ color: colors.text, fontSize: 13, fontWeight: 600, marginBottom: 12 }}>Connected Accounts</div>
        {[
          ['🏦', 'Chase Checking', '****4521', '$1,247', true],
          ['💳', 'Chase Credit', '****8834', '-$320', true],
          ['🏧', 'Savings', '****2290', '$4,150', true],
        ].map(([icon, name, num, bal, linked], i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '9px 0', borderBottom: i < 2 ? `1px solid ${colors.border}` : 'none'
          }}>
            <div style={{
              width: 34, height: 34, borderRadius: 10, background: colors.surface,
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16
            }}>{icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ color: colors.text, fontSize: 12, fontWeight: 500 }}>{name} {num}</div>
              <div style={{ color: colors.primary, fontSize: 11 }}>{bal}</div>
            </div>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: colors.safe }} />
          </div>
        ))}
        <button
          onClick={() => handleBtn('add-acct')}
          style={{
            width: '100%', background: pressedBtn === 'add-acct' ? colors.primaryDim : 'transparent',
            border: `1px dashed ${colors.border}`,
            borderRadius: 10, padding: '9px', marginTop: 8,
            color: colors.textMuted, fontSize: 12, cursor: 'pointer',
            transition: 'all 0.15s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6
          }}
        >+ Add account</button>
      </div>

      {/* Notification prefs */}
      <div style={{ background: colors.card, borderRadius: 16, padding: '16px', border: `1px solid ${colors.border}` }}>
        <div style={{ color: colors.text, fontSize: 13, fontWeight: 600, marginBottom: 12 }}>Notifications</div>
        {[
          ['Gap alerts', 'notif-1', true],
          ['Safe-to-spend windows', 'notif-2', true],
          ['Subscription collisions', 'notif-3', true],
          ['Weekly forecast digest', 'notif-4', false],
        ].map(([label, key, def], i) => (
          <div key={key} style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '9px 0', borderBottom: i < 3 ? `1px solid ${colors.border}` : 'none'
          }}>
            <span style={{ color: colors.textMuted, fontSize: 12 }}>{label}</span>
            <div
              onClick={() => toggleItem(key)}
              style={{
                width: 36, height: 20, borderRadius: 10,
                background: (toggledItems[key] !== undefined ? toggledItems[key] : def) ? colors.primary : colors.border,
                position: 'relative', cursor: 'pointer', transition: 'background 0.2s'
              }}
            >
              <div style={{
                position: 'absolute', top: 3,
                left: (toggledItems[key] !== undefined ? toggledItems[key] : def) ? 17 : 3,
                width: 14, height: 14, borderRadius: '50%', background: '#fff',
                transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.3)'
              }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // --- Nav tabs ---
  const tabs = [
    { id: 'forecast', label: 'Forecast', icon: '📊' },
    { id: 'alerts', label: 'Alerts', icon: '🔔', badge: 2 },
    { id: 'simulate', label: 'Simulate', icon: '🔮' },
    { id: 'insights', label: 'Insights', icon: '💡' },
    { id: 'profile', label: 'Profile', icon: '👤' },
  ];

  const screens = {
    forecast: ForecastScreen,
    alerts: AlertsScreen,
    simulate: SimulateScreen,
    insights: InsightsScreen,
    profile: ProfileScreen,
  };

  const ActiveScreen = screens[activeTab];

  const screenTitles = {
    forecast: 'Financial Forecast',
    alerts: 'Smart Alerts',
    simulate: 'What-If Simulator',
    insights: 'Spending Insights',
    profile: 'Your Profile',
  };

  return (
    <div style={{
      minHeight: '100vh', background: '#050810',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'Inter, sans-serif',
      backgroundImage: `radial-gradient(ellipse at 30% 20%, ${colors.primary}18 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, ${colors.accent}15 0%, transparent 50%)`
    }}>
      <style>{fontStyle}</style>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 0; background: transparent; }
        input[type=number]::-webkit-inner-spin-button { -webkit-appearance: none; }
        input { -webkit-tap-highlight-color: transparent; }
        button { -webkit-tap-highlight-color: transparent; font-family: Inter, sans-serif; }
        @keyframes fadeSlideIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity: 0.5; } }
      `}</style>

      {/* Phone frame */}
      <div style={{
        width: 375, height: 812,
        background: colors.bg,
        borderRadius: 52,
        overflow: 'hidden',
        position: 'relative',
        boxShadow: `0 40px 80px rgba(0,0,0,0.7), 0 0 0 1px ${colors.border}, inset 0 0 0 1px rgba(255,255,255,0.05)`,
        display: 'flex', flexDirection: 'column'
      }}>
        {/* Dynamic Island */}
        <div style={{
          position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)',
          width: 120, height: 34, background: '#000',
          borderRadius: 20, zIndex: 50,
          boxShadow: '0 0 0 1px rgba(255,255,255,0.08)'
        }} />

        {/* Status bar */}
        <div style={{
          height: 54, display: 'flex', alignItems: 'flex-end',
          justifyContent: 'space-between', padding: '0 24px 6px',
          position: 'relative', zIndex: 10, flexShrink: 0
        }}>
          <span style={{ color: colors.text, fontSize: 13, fontWeight: 700 }}>9:41</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <div style={{ display: 'flex', gap: 1.5, alignItems: 'flex-end' }}>
              {[6, 9, 12, 10].map((h, i) => (
                <div key={i} style={{ width: 3, height: h, borderRadius: 1, background: colors.textMuted }} />
              ))}
            </div>
            <div style={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <div style={{ width: 14, height: 10, border: `1.5px solid ${colors.textMuted}`, borderRadius: 2.5, position: 'relative' }}>
                <div style={{ position: 'absolute', right: -4, top: '50%', transform: 'translateY(-50%)', width: 3, height: 5, background: colors.textMuted, borderRadius: 1 }} />
                <div style={{ width: '75%', height: '100%', background: colors.safe, borderRadius: 1 }} />
              </div>
            </div>
          </div>
        </div>

        {/* App header */}
        <div style={{
          padding: '0 20px 12px', flexShrink: 0,
          borderBottom: `1px solid ${colors.border}`
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                <div style={{
                  width: 28, height: 28, borderRadius: 8,
                  background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14
                }}>🌤️</div>
                <div>
                  <span style={{ color: colors.text, fontSize: 16, fontWeight: 800 }}>BillWhisper</span>
                </div>
              </div>
              <div style={{ color: colors.textMuted, fontSize: 11, marginTop: 1, paddingLeft: 35 }}>{screenTitles[activeTab]}</div>
            </div>
            <div style={{
              background: colors.dangerDim, borderRadius: 20, padding: '5px 10px',
              border: `1px solid ${colors.danger}44`, display: 'flex', alignItems: 'center', gap: 5
            }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: colors.danger, animation: 'pulse 1.5s infinite' }} />
              <span style={{ color: colors.danger, fontSize: 11, fontWeight: 700 }}>Alert active</span>
            </div>
          </div>
        </div>

        {/* Screen content */}
        <div style={{
          flex: 1, overflowY: 'auto', paddingTop: 14,
          opacity: animating ? 0 : 1,
          transform: animating ? 'translateY(8px)' : 'translateY(0)',
          transition: 'opacity 0.15s ease, transform 0.15s ease'
        }}>
          <ActiveScreen />
        </div>

        {/* Bottom Nav */}
        <div style={{
          height: 80, background: colors.surface,
          borderTop: `1px solid ${colors.border}`,
          display: 'flex', alignItems: 'center',
          padding: '0 8px 8px', flexShrink: 0,
          backdropFilter: 'blur(20px)'
        }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => handleTabPress(tab.id)}
              style={{
                flex: 1, display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center', gap: 3,
                background: 'transparent', border: 'none', cursor: 'pointer',
                padding: '8px 4px', borderRadius: 12,
                transform: activeTab === tab.id ? 'translateY(-1px)' : 'translateY(0)',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ position: 'relative' }}>
                <span style={{
                  fontSize: 20,
                  filter: activeTab === tab.id ? 'none' : 'grayscale(1) opacity(0.4)',
                  transition: 'filter 0.2s'
                }}>{tab.icon}</span>
                {tab.badge && (
                  <div style={{
                    position: 'absolute', top: -3, right: -5,
                    width: 14, height: 14, borderRadius: '50%',
                    background: colors.danger, display: 'flex',
                    alignItems: 'center', justifyContent: 'center',
                    fontSize: 8, color: '#fff', fontWeight: 800
                  }}>{tab.badge}</div>
                )}
              </div>
              <span style={{
                fontSize: 9, fontWeight: activeTab === tab.id ? 700 : 400,
                color: activeTab === tab.id ? colors.primary : colors.textDim,
                transition: 'color 0.2s'
              }}>{tab.label}</span>
              {activeTab === tab.id && (
                <div style={{
                  width: 18, height: 2, borderRadius: 1, background: colors.primary,
                  boxShadow: `0 0 6px ${colors.primary}`
                }} />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
