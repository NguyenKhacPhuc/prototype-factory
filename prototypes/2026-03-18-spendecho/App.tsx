const { useState, useEffect, useRef } = React;

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [prevTab, setPrevTab] = useState('home');
  const [pressedItem, setPressedItem] = useState(null);
  const [showNudge, setShowNudge] = useState(false);
  const [nudgeDismissed, setNudgeDismissed] = useState(false);
  const [selectedPattern, setSelectedPattern] = useState(null);
  const [goalToggled, setGoalToggled] = useState({ friday: true, payday: false, commute: true });

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
      * { box-sizing: border-box; margin: 0; padding: 0; }
      ::-webkit-scrollbar { display: none; }
      body { background: #1a1a2e; display: flex; justify-content: center; align-items: center; min-height: 100vh; font-family: 'Plus Jakarta Sans', sans-serif; }
      @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
      @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      @keyframes pulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.05); } }
      @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
      @keyframes bounceIn { 0% { transform: scale(0.8); opacity: 0; } 60% { transform: scale(1.05); } 100% { transform: scale(1); opacity: 1; } }
      .screen-enter { animation: slideUp 0.35s ease forwards; }
      .nudge-enter { animation: bounceIn 0.4s ease forwards; }
      .tab-press { transform: scale(0.92) !important; transition: transform 0.1s ease !important; }
    `;
    document.head.appendChild(style);
    const timer = setTimeout(() => setShowNudge(true), 2000);
    return () => { clearTimeout(timer); document.head.removeChild(style); };
  }, []);

  const navigate = (tab) => {
    setPrevTab(activeTab);
    setActiveTab(tab);
  };

  const colors = {
    bg: '#FFF8F0',
    rose: '#E8A0BF',
    roseDark: '#D4789F',
    sage: '#B4D4AA',
    sageDark: '#8BBE81',
    lavender: '#C3B1E1',
    lavenderDark: '#A08BC7',
    cream: '#FFF0E0',
    peach: '#FFD9B8',
    text: '#2D2D2D',
    textMuted: '#8A8A9A',
    textLight: '#B0B0C0',
    card: '#FFFFFF',
    border: '#F0E8E0',
    gold: '#F4B942',
    coral: '#F28B70',
  };

  const transactions = [
    { id: 1, name: 'Blue Bottle Coffee', amount: -6.50, category: 'Coffee', time: 'Fri 8:42am', trigger: 'stress-shopping', icon: '☕', color: colors.rose },
    { id: 2, name: 'Uber Eats – Chipotle', amount: -23.40, category: 'Food Delivery', time: 'Fri 7:15pm', trigger: 'stress-shopping', icon: '🌯', color: colors.rose },
    { id: 3, name: 'Amazon – Books', amount: -34.99, category: 'Shopping', time: 'Fri 9:30pm', trigger: 'stress-shopping', icon: '📦', color: colors.rose },
    { id: 4, name: 'Whole Foods', amount: -89.20, category: 'Groceries', time: 'Sat after payday', trigger: 'payday-splurge', icon: '🛒', color: colors.peach },
    { id: 5, name: 'Sephora', amount: -67.00, category: 'Beauty', time: 'Sat after payday', trigger: 'payday-splurge', icon: '💄', color: colors.peach },
    { id: 6, name: 'Spotify Premium', amount: -9.99, category: 'Subscriptions', time: 'Monthly', trigger: null, icon: '🎵', color: colors.sage },
    { id: 7, name: 'Starbucks', amount: -5.75, category: 'Coffee', time: 'Mon commute', trigger: 'commute', icon: '☕', color: colors.lavender },
    { id: 8, name: 'Lyft – to office', amount: -12.40, category: 'Transport', time: 'Mon commute', trigger: 'commute', icon: '🚗', color: colors.lavender },
  ];

  const triggers = [
    { id: 'friday', label: 'Stress-Shopping Fridays', emoji: '😤', color: colors.rose, bgColor: '#FDE8F2', count: 12, avg: '$64', description: 'You tend to overspend on Fridays when work stress peaks. Average 3 impulsive purchases.', days: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], spends: [12, 18, 22, 19, 64, 41, 15] },
    { id: 'payday', label: 'Post-Payday Splurges', emoji: '💸', color: colors.peach, bgColor: '#FFF0DC', count: 8, avg: '$156', description: 'The 2 days after payday see 3x your normal spending. Big ticket items dominate.', days: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], spends: [25, 156, 89, 30, 22, 41, 15] },
    { id: 'commute', label: 'Commute-Linked Spending', emoji: '🚇', color: colors.lavender, bgColor: '#EDE8F8', count: 20, avg: '$18', description: 'Morning commutes consistently add $15–22 in unplanned stops and rides.', days: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], spends: [18, 21, 17, 20, 19, 5, 3] },
  ];

  const predictions = [
    { id: 1, title: 'Stress-Shopping Window', time: 'This Friday, 6–10pm', confidence: 87, risk: 'High', riskColor: colors.rose, emoji: '😤', desc: 'Based on 12 past Fridays, you\'re likely to spend $60–80 after 6pm.', nudge: 'Pre-commit to no purchases after 7pm tonight', action: 'Set Cool-Off Goal' },
    { id: 2, title: 'Payday Splurge Zone', time: 'Next Saturday (after pay)', confidence: 92, risk: 'High', riskColor: colors.peach, emoji: '💸', desc: 'Your last 8 paydays included $120+ extra spend within 48 hours.', nudge: 'Auto-stash $50 the moment your paycheck lands', action: 'Enable Auto-Stash' },
    { id: 3, title: 'Commute Coffee Spend', time: 'Tomorrow, 8–9am', confidence: 74, risk: 'Medium', riskColor: colors.lavender, emoji: '🚇', desc: 'You\'ve bought commute coffee 18 of the last 20 weekdays.', nudge: 'Brew at home tonight — save $5.75 tomorrow', action: 'Set Reminder' },
  ];

  const goals = [
    { id: 'friday', label: 'Friday Cool-Off Mode', desc: 'Block impulse buys after 7pm on Fridays', icon: '🧘', saved: 128, target: 200, color: colors.rose, bgColor: '#FDE8F2', active: goalToggled.friday },
    { id: 'payday', label: 'Payday Auto-Stash', desc: 'Move $50 to savings when pay arrives', icon: '🏦', saved: 200, target: 600, color: colors.peach, bgColor: '#FFF0DC', active: goalToggled.payday },
    { id: 'commute', label: 'Commute Budget', desc: 'Cap commute-linked spending at $10/day', icon: '🚇', saved: 76, target: 150, color: colors.lavender, bgColor: '#EDE8F8', active: goalToggled.commute },
  ];

  const weeklyData = [
    { day: 'Mon', amount: 18, trigger: 'commute' },
    { day: 'Tue', amount: 24, trigger: null },
    { day: 'Wed', amount: 31, trigger: null },
    { day: 'Thu', amount: 19, trigger: null },
    { day: 'Fri', amount: 87, trigger: 'friday' },
    { day: 'Sat', amount: 156, trigger: 'payday' },
    { day: 'Sun', amount: 22, trigger: null },
  ];
  const maxAmount = Math.max(...weeklyData.map(d => d.amount));

  const triggerColors = { friday: colors.rose, payday: colors.peach, commute: colors.lavender };

  // Status bar
  const StatusBar = () => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 20px 8px', color: colors.text, fontSize: 12, fontWeight: 600, letterSpacing: 0.2 }}>
      <span>9:41</span>
      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none"><path d="M8 3C9.8 3 11.4 3.7 12.6 4.8L14 3.4C12.4 1.9 10.3 1 8 1C5.7 1 3.6 1.9 2 3.4L3.4 4.8C4.6 3.7 6.2 3 8 3Z" fill={colors.text}/><path d="M8 6C9.1 6 10.1 6.4 10.8 7.1L12.2 5.7C11.1 4.6 9.6 4 8 4C6.4 4 4.9 4.6 3.8 5.7L5.2 7.1C5.9 6.4 6.9 6 8 6Z" fill={colors.text}/><circle cx="8" cy="10" r="1.5" fill={colors.text}/></svg>
        <svg width="25" height="12" viewBox="0 0 25 12"><rect x="0.5" y="0.5" width="22" height="11" rx="3.5" stroke={colors.text} strokeOpacity="0.35"/><rect x="23" y="3.5" width="2" height="5" rx="1" fill={colors.text} fillOpacity="0.4"/><rect x="2" y="2" width="17" height="8" rx="2" fill={colors.text}/></svg>
      </div>
    </div>
  );

  // Dynamic Island
  const DynamicIsland = () => (
    <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: 4 }}>
      <div style={{ width: 126, height: 37, background: '#000', borderRadius: 20 }} />
    </div>
  );

  // Bottom Nav
  const BottomNav = () => {
    const tabs = [
      { id: 'home', label: 'Home', icon: 'House' },
      { id: 'patterns', label: 'Patterns', icon: 'BarChart3' },
      { id: 'predict', label: 'Predict', icon: 'Zap' },
      { id: 'goals', label: 'Goals', icon: 'Target' },
    ];
    return (
      <div style={{ display: 'flex', background: '#FFFFFF', borderTop: `1px solid ${colors.border}`, paddingBottom: 24, paddingTop: 10, boxShadow: '0 -4px 20px rgba(0,0,0,0.06)' }}>
        {tabs.map(tab => {
          const Icon = window.lucide[tab.icon];
          const active = activeTab === tab.id;
          return (
            <button key={tab.id} onClick={() => navigate(tab.id)}
              style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, background: 'none', border: 'none', cursor: 'pointer', padding: '4px 0', transition: 'all 0.2s ease' }}>
              <div style={{ width: 44, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 14, background: active ? colors.lavender : 'transparent', transition: 'all 0.3s ease' }}>
                {Icon && <Icon size={18} color={active ? '#FFF' : colors.textMuted} strokeWidth={active ? 2.5 : 2} />}
              </div>
              <span style={{ fontSize: 10, fontWeight: active ? 700 : 500, color: active ? colors.lavenderDark : colors.textMuted, transition: 'all 0.2s' }}>{tab.label}</span>
            </button>
          );
        })}
      </div>
    );
  };

  // Nudge overlay
  const NudgeCard = () => {
    if (!showNudge || nudgeDismissed) return null;
    return (
      <div className="nudge-enter" style={{ position: 'absolute', bottom: 100, left: 16, right: 16, background: '#FFFFFF', borderRadius: 20, padding: 16, boxShadow: '0 8px 32px rgba(0,0,0,0.18)', zIndex: 100, border: `2px solid ${colors.rose}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: '#FDE8F2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>😤</div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: colors.rose, letterSpacing: 0.5, textTransform: 'uppercase' }}>Impulse Alert</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: colors.text, marginTop: 1 }}>Friday Spending Window Open</div>
            </div>
          </div>
          <button onClick={() => setNudgeDismissed(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
            {window.lucide.X && <window.lucide.X size={16} color={colors.textMuted} />}
          </button>
        </div>
        <p style={{ fontSize: 12, color: colors.textMuted, marginTop: 8, lineHeight: 1.5 }}>You've spent $23.40 already. Your pattern suggests $40 more by 10pm. Want to cool off?</p>
        <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
          <button onClick={() => setNudgeDismissed(true)} style={{ flex: 1, padding: '10px 0', borderRadius: 12, background: colors.rose, border: 'none', color: '#FFF', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>Set Cool-Off Goal</button>
          <button onClick={() => setNudgeDismissed(true)} style={{ flex: 1, padding: '10px 0', borderRadius: 12, background: colors.cream, border: 'none', color: colors.textMuted, fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Not Now</button>
        </div>
      </div>
    );
  };

  // HOME SCREEN
  const HomeScreen = () => (
    <div className="screen-enter" style={{ flex: 1, overflowY: 'auto', padding: '0 0 8px' }}>
      <div style={{ padding: '8px 20px 16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p style={{ fontSize: 12, color: colors.textMuted, fontWeight: 500 }}>Good evening, Maya 👋</p>
            <h1 style={{ fontSize: 22, fontWeight: 800, color: colors.text, marginTop: 2 }}>SpendEcho</h1>
          </div>
          <div style={{ width: 42, height: 42, borderRadius: 14, background: `linear-gradient(135deg, ${colors.rose}, ${colors.lavender})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🌸</div>
        </div>
      </div>

      {/* Balance card */}
      <div style={{ margin: '0 16px', background: `linear-gradient(135deg, #C3B1E1 0%, #E8A0BF 100%)`, borderRadius: 24, padding: 20, marginBottom: 16, boxShadow: '0 8px 24px rgba(195,177,225,0.4)' }}>
        <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.75)', fontWeight: 600, letterSpacing: 0.5 }}>THIS WEEK'S SPEND</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 4 }}>
          <div>
            <h2 style={{ fontSize: 36, fontWeight: 800, color: '#FFF', letterSpacing: -1 }}>$357</h2>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)', marginTop: 2 }}>↑ $89 vs last week</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ background: 'rgba(255,255,255,0.25)', borderRadius: 10, padding: '4px 10px', marginBottom: 4 }}>
              <span style={{ fontSize: 11, color: '#FFF', fontWeight: 700 }}>2 triggers active</span>
            </div>
            <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.7)' }}>Fri & Sat patterns</p>
          </div>
        </div>
        {/* Mini bar chart */}
        <div style={{ display: 'flex', gap: 4, marginTop: 14, alignItems: 'flex-end', height: 36 }}>
          {weeklyData.map((d, i) => (
            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
              <div style={{ width: '100%', height: Math.max(4, (d.amount / maxAmount) * 32), borderRadius: 4, background: d.trigger ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.35)', transition: 'height 0.4s ease' }} />
              <span style={{ fontSize: 8, color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>{d.day[0]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Trigger Moments */}
      <div style={{ padding: '0 20px 8px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: colors.text }}>Trigger Moments</h3>
          <button onClick={() => navigate('patterns')} style={{ background: 'none', border: 'none', fontSize: 12, color: colors.lavenderDark, fontWeight: 600, cursor: 'pointer' }}>See all →</button>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {triggers.map(t => (
            <div key={t.id} onClick={() => { navigate('patterns'); setSelectedPattern(t.id); }}
              style={{ flex: 1, background: t.bgColor, borderRadius: 16, padding: 12, cursor: 'pointer', transition: 'transform 0.15s', border: `1.5px solid ${t.color}40` }}>
              <span style={{ fontSize: 20 }}>{t.emoji}</span>
              <p style={{ fontSize: 10, fontWeight: 700, color: t.color, marginTop: 4, lineHeight: 1.3 }}>{t.label.split(' ').slice(0, 2).join(' ')}</p>
              <p style={{ fontSize: 13, fontWeight: 800, color: colors.text, marginTop: 2 }}>{t.avg}<span style={{ fontSize: 9, fontWeight: 500, color: colors.textMuted }}>/avg</span></p>
            </div>
          ))}
        </div>
      </div>

      {/* Transaction Timeline */}
      <div style={{ padding: '12px 20px 0' }}>
        <h3 style={{ fontSize: 14, fontWeight: 700, color: colors.text, marginBottom: 10 }}>Spending Timeline</h3>
        {transactions.map((tx, i) => {
          const hasTrigger = !!tx.trigger;
          return (
            <div key={tx.id} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8, padding: '10px 12px', background: hasTrigger ? tx.color + '18' : colors.card, borderRadius: 14, border: hasTrigger ? `1.5px solid ${tx.color}50` : `1px solid ${colors.border}`, transition: 'all 0.2s' }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: tx.color + '30', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>{tx.icon}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: colors.text, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{tx.name}</p>
                <p style={{ fontSize: 10, color: colors.textMuted, marginTop: 1 }}>{tx.time}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: 14, fontWeight: 700, color: hasTrigger ? tx.color : colors.text }}>${Math.abs(tx.amount).toFixed(2)}</p>
                {hasTrigger && <div style={{ background: tx.color, borderRadius: 4, padding: '1px 6px', marginTop: 2 }}><span style={{ fontSize: 8, color: '#FFF', fontWeight: 700 }}>TRIGGER</span></div>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  // PATTERNS SCREEN
  const PatternsScreen = () => {
    const [activePattern, setActivePattern] = useState(selectedPattern || 'friday');
    const pattern = triggers.find(t => t.id === activePattern);
    const maxSpend = Math.max(...pattern.spends);

    return (
      <div className="screen-enter" style={{ flex: 1, overflowY: 'auto' }}>
        <div style={{ padding: '8px 20px 16px' }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: colors.text }}>Pattern Replay</h2>
          <p style={{ fontSize: 12, color: colors.textMuted, marginTop: 2 }}>Your hidden spending habits, decoded</p>
        </div>

        {/* Pattern tabs */}
        <div style={{ padding: '0 20px', display: 'flex', gap: 8, marginBottom: 16, overflowX: 'auto' }}>
          {triggers.map(t => (
            <button key={t.id} onClick={() => setActivePattern(t.id)}
              style={{ flexShrink: 0, padding: '8px 14px', borderRadius: 20, border: 'none', background: activePattern === t.id ? t.color : colors.cream, color: activePattern === t.id ? '#FFF' : colors.textMuted, fontSize: 12, fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s', display: 'flex', gap: 6, alignItems: 'center' }}>
              <span>{t.emoji}</span><span>{t.label.split(' ')[0]}</span>
            </button>
          ))}
        </div>

        {/* Pattern detail card */}
        <div style={{ margin: '0 16px 16px', background: pattern.bgColor, borderRadius: 20, padding: 18, border: `1.5px solid ${pattern.color}40` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
            <div>
              <span style={{ fontSize: 28 }}>{pattern.emoji}</span>
              <h3 style={{ fontSize: 16, fontWeight: 800, color: colors.text, marginTop: 4 }}>{pattern.label}</h3>
              <p style={{ fontSize: 11, color: colors.textMuted, marginTop: 2, lineHeight: 1.4, maxWidth: 200 }}>{pattern.description}</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: 11, color: colors.textMuted, fontWeight: 500 }}>avg spend</p>
              <p style={{ fontSize: 28, fontWeight: 800, color: pattern.color }}>{pattern.avg}</p>
              <p style={{ fontSize: 10, color: colors.textMuted }}>{pattern.count}x detected</p>
            </div>
          </div>

          {/* Bar chart */}
          <div>
            <p style={{ fontSize: 10, fontWeight: 700, color: colors.textMuted, letterSpacing: 0.5, marginBottom: 8 }}>SPEND BY DAY OF WEEK</p>
            <div style={{ display: 'flex', gap: 6, alignItems: 'flex-end', height: 80 }}>
              {pattern.days.map((day, i) => {
                const height = Math.max(6, (pattern.spends[i] / maxSpend) * 72);
                const isHighlight = pattern.spends[i] === maxSpend;
                return (
                  <div key={day} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                    <span style={{ fontSize: 9, color: pattern.color, fontWeight: 700, opacity: isHighlight ? 1 : 0 }}>${pattern.spends[i]}</span>
                    <div style={{ width: '100%', height, borderRadius: 6, background: isHighlight ? pattern.color : pattern.color + '40', transition: 'all 0.4s ease' }} />
                    <span style={{ fontSize: 9, color: isHighlight ? pattern.color : colors.textMuted, fontWeight: isHighlight ? 700 : 500 }}>{day.slice(0, 2)}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Related transactions */}
        <div style={{ padding: '0 20px' }}>
          <h3 style={{ fontSize: 13, fontWeight: 700, color: colors.text, marginBottom: 10 }}>Related Transactions</h3>
          {transactions.filter(t => t.trigger === activePattern).map(tx => (
            <div key={tx.id} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8, padding: '10px 12px', background: colors.card, borderRadius: 14, border: `1px solid ${colors.border}` }}>
              <div style={{ width: 34, height: 34, borderRadius: 10, background: tx.color + '25', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15 }}>{tx.icon}</div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: colors.text }}>{tx.name}</p>
                <p style={{ fontSize: 10, color: colors.textMuted }}>{tx.category} · {tx.time}</p>
              </div>
              <p style={{ fontSize: 14, fontWeight: 700, color: pattern.color }}>${Math.abs(tx.amount).toFixed(2)}</p>
            </div>
          ))}
        </div>

        {/* Insight */}
        <div style={{ margin: '12px 16px 8px', background: '#FFF', borderRadius: 16, padding: 14, border: `1px solid ${colors.border}` }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
            <span style={{ fontSize: 18 }}>💡</span>
            <div>
              <p style={{ fontSize: 12, fontWeight: 700, color: colors.text }}>SpendEcho Insight</p>
              <p style={{ fontSize: 11, color: colors.textMuted, marginTop: 3, lineHeight: 1.5 }}>If you reduce {pattern.label.toLowerCase()} by 50%, you'd save <strong style={{ color: pattern.color }}>${parseInt(pattern.avg.replace('$','')) * 6}/mo</strong> — enough for a weekend trip in 3 months.</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // PREDICT SCREEN
  const PredictScreen = () => {
    const [expandedId, setExpandedId] = useState(null);
    return (
      <div className="screen-enter" style={{ flex: 1, overflowY: 'auto' }}>
        <div style={{ padding: '8px 20px 16px' }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: colors.text }}>Impulse Forecast</h2>
          <p style={{ fontSize: 12, color: colors.textMuted, marginTop: 2 }}>Predicted spending windows ahead</p>
        </div>

        {/* Confidence meter */}
        <div style={{ margin: '0 16px 16px', background: `linear-gradient(135deg, ${colors.lavender}50, ${colors.rose}30)`, borderRadius: 20, padding: 16, border: `1.5px solid ${colors.lavender}50` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ fontSize: 11, color: colors.textMuted, fontWeight: 600 }}>MODEL ACCURACY</p>
              <p style={{ fontSize: 28, fontWeight: 800, color: colors.text }}>87%</p>
              <p style={{ fontSize: 11, color: colors.textMuted }}>Based on 12 weeks of data</p>
            </div>
            <div style={{ width: 70, height: 70, borderRadius: '50%', background: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 4px 16px ${colors.lavender}80` }}>
              <div style={{ textAlign: 'center' }}>
                <span style={{ fontSize: 24 }}>🎯</span>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
            {['Fridays', 'Paydays', 'Commutes'].map((l, i) => (
              <div key={l} style={{ flex: 1, background: '#FFF', borderRadius: 10, padding: '6px 8px', textAlign: 'center' }}>
                <p style={{ fontSize: 11, fontWeight: 700, color: [colors.rose, colors.peach, colors.lavenderDark][i] }}>{[87, 92, 74][i]}%</p>
                <p style={{ fontSize: 9, color: colors.textMuted, marginTop: 1 }}>{l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Prediction cards */}
        <div style={{ padding: '0 16px' }}>
          <h3 style={{ fontSize: 13, fontWeight: 700, color: colors.text, marginBottom: 10 }}>Upcoming Risk Windows</h3>
          {predictions.map(p => (
            <div key={p.id} onClick={() => setExpandedId(expandedId === p.id ? null : p.id)}
              style={{ marginBottom: 10, background: colors.card, borderRadius: 18, border: `1.5px solid ${p.riskColor}40`, overflow: 'hidden', cursor: 'pointer', transition: 'all 0.2s' }}>
              <div style={{ padding: '14px 14px 12px', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{ width: 44, height: 44, borderRadius: 14, background: p.riskColor + '25', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>{p.emoji}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <p style={{ fontSize: 13, fontWeight: 700, color: colors.text }}>{p.title}</p>
                    <div style={{ background: p.riskColor + '25', borderRadius: 8, padding: '2px 8px' }}>
                      <span style={{ fontSize: 10, fontWeight: 700, color: p.riskColor }}>{p.risk}</span>
                    </div>
                  </div>
                  <p style={{ fontSize: 11, color: colors.textMuted, marginTop: 2 }}>{p.time}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8 }}>
                    <div style={{ flex: 1, height: 6, background: colors.cream, borderRadius: 3, overflow: 'hidden' }}>
                      <div style={{ width: `${p.confidence}%`, height: '100%', background: `linear-gradient(90deg, ${p.riskColor}80, ${p.riskColor})`, borderRadius: 3, transition: 'width 0.6s ease' }} />
                    </div>
                    <span style={{ fontSize: 10, fontWeight: 700, color: p.riskColor, flexShrink: 0 }}>{p.confidence}%</span>
                  </div>
                </div>
              </div>
              {expandedId === p.id && (
                <div style={{ borderTop: `1px solid ${colors.border}`, padding: 14, background: p.riskColor + '08' }}>
                  <p style={{ fontSize: 11, color: colors.textMuted, lineHeight: 1.5, marginBottom: 10 }}>{p.desc}</p>
                  <div style={{ display: 'flex', gap: 6, alignItems: 'flex-start', background: '#FFF', borderRadius: 12, padding: 10, marginBottom: 10 }}>
                    <span style={{ fontSize: 14 }}>💬</span>
                    <p style={{ fontSize: 11, color: colors.text, fontWeight: 500, lineHeight: 1.4 }}>{p.nudge}</p>
                  </div>
                  <button onClick={(e) => { e.stopPropagation(); navigate('goals'); }}
                    style={{ width: '100%', padding: '10px 0', borderRadius: 12, background: p.riskColor, border: 'none', color: '#FFF', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>{p.action}</button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* History */}
        <div style={{ padding: '8px 16px 8px' }}>
          <h3 style={{ fontSize: 13, fontWeight: 700, color: colors.text, marginBottom: 10 }}>Past Predictions</h3>
          {[
            { label: 'Last Friday window', hit: true, predicted: '$64', actual: '$87' },
            { label: 'March payday splurge', hit: true, predicted: '$120', actual: '$156' },
            { label: 'Wed stress buy', hit: false, predicted: '$40', actual: '$12' },
          ].map((h, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', marginBottom: 8, background: colors.card, borderRadius: 14, border: `1px solid ${colors.border}` }}>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <span style={{ fontSize: 14 }}>{h.hit ? '✅' : '❌'}</span>
                <div>
                  <p style={{ fontSize: 12, fontWeight: 600, color: colors.text }}>{h.label}</p>
                  <p style={{ fontSize: 10, color: colors.textMuted }}>Predicted {h.predicted}</p>
                </div>
              </div>
              <p style={{ fontSize: 13, fontWeight: 700, color: h.hit ? colors.coral : colors.sageDark }}>Actual {h.actual}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // GOALS SCREEN
  const GoalsScreen = () => {
    const [localToggles, setLocalToggles] = useState({ ...goalToggled });
    const toggle = (id) => {
      const next = { ...localToggles, [id]: !localToggles[id] };
      setLocalToggles(next);
      setGoalToggled(next);
    };

    const totalSaved = goals.reduce((s, g) => s + (localToggles[g.id] ? g.saved : 0), 0);

    return (
      <div className="screen-enter" style={{ flex: 1, overflowY: 'auto' }}>
        <div style={{ padding: '8px 20px 16px' }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: colors.text }}>Habit Goals</h2>
          <p style={{ fontSize: 12, color: colors.textMuted, marginTop: 2 }}>Micro-interventions for your trigger moments</p>
        </div>

        {/* Total saved */}
        <div style={{ margin: '0 16px 16px', background: `linear-gradient(135deg, ${colors.sage}, ${colors.sageDark})`, borderRadius: 20, padding: 18, boxShadow: `0 8px 24px ${colors.sage}80` }}>
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.8)', fontWeight: 600, letterSpacing: 0.5 }}>SAVED THIS MONTH</p>
          <h2 style={{ fontSize: 38, fontWeight: 800, color: '#FFF', letterSpacing: -1, marginTop: 2 }}>${totalSaved}</h2>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)', marginTop: 4 }}>from {goals.filter(g => localToggles[g.id]).length} active interventions</p>
          <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
            {goals.map(g => (
              <div key={g.id} style={{ flex: 1, background: 'rgba(255,255,255,0.2)', borderRadius: 8, padding: '6px 4px', textAlign: 'center' }}>
                <span style={{ fontSize: 14 }}>{g.icon}</span>
                <p style={{ fontSize: 10, color: '#FFF', fontWeight: 600, marginTop: 2 }}>${localToggles[g.id] ? g.saved : 0}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Goal cards */}
        <div style={{ padding: '0 16px' }}>
          {goals.map(goal => {
            const isActive = localToggles[goal.id];
            const progress = goal.saved / goal.target;
            return (
              <div key={goal.id} style={{ marginBottom: 12, background: isActive ? goal.bgColor : colors.card, borderRadius: 20, padding: 16, border: `1.5px solid ${isActive ? goal.color + '50' : colors.border}`, transition: 'all 0.3s ease' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                    <div style={{ width: 42, height: 42, borderRadius: 14, background: isActive ? goal.color + '30' : colors.cream, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, transition: 'all 0.3s' }}>{goal.icon}</div>
                    <div>
                      <p style={{ fontSize: 13, fontWeight: 700, color: colors.text }}>{goal.label}</p>
                      <p style={{ fontSize: 11, color: colors.textMuted, marginTop: 1, maxWidth: 180, lineHeight: 1.3 }}>{goal.desc}</p>
                    </div>
                  </div>
                  {/* Toggle */}
                  <div onClick={() => toggle(goal.id)} style={{ width: 44, height: 26, borderRadius: 13, background: isActive ? goal.color : '#DDD', cursor: 'pointer', position: 'relative', transition: 'all 0.3s ease', flexShrink: 0 }}>
                    <div style={{ position: 'absolute', top: 3, left: isActive ? 21 : 3, width: 20, height: 20, borderRadius: '50%', background: '#FFF', boxShadow: '0 2px 6px rgba(0,0,0,0.2)', transition: 'left 0.3s ease' }} />
                  </div>
                </div>

                {isActive && (
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                      <span style={{ fontSize: 11, color: colors.textMuted, fontWeight: 500 }}>Saved</span>
                      <span style={{ fontSize: 11, fontWeight: 700, color: goal.color }}>${goal.saved} / ${goal.target}</span>
                    </div>
                    <div style={{ height: 8, background: goal.color + '25', borderRadius: 4, overflow: 'hidden' }}>
                      <div style={{ width: `${progress * 100}%`, height: '100%', background: `linear-gradient(90deg, ${goal.color}80, ${goal.color})`, borderRadius: 4, transition: 'width 0.5s ease' }} />
                    </div>
                    <p style={{ fontSize: 10, color: colors.textMuted, marginTop: 6 }}>{Math.round(progress * 100)}% to goal · ~{Math.ceil((goal.target - goal.saved) / (goal.saved / 4))} weeks left</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Add ritual */}
        <div style={{ margin: '4px 16px 12px', background: '#FFF', borderRadius: 18, padding: 14, border: `1.5px dashed ${colors.border}`, display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: colors.cream, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {window.lucide.Plus && <window.lucide.Plus size={18} color={colors.textMuted} />}
          </div>
          <div>
            <p style={{ fontSize: 13, fontWeight: 600, color: colors.textMuted }}>Add Low-Cost Ritual</p>
            <p style={{ fontSize: 11, color: colors.textLight }}>Replace trigger spending with better habits</p>
          </div>
        </div>

        {/* Ritual suggestions */}
        <div style={{ padding: '0 16px 8px' }}>
          <h3 style={{ fontSize: 13, fontWeight: 700, color: colors.text, marginBottom: 10 }}>Suggested Rituals</h3>
          {[
            { label: 'Friday walk instead of shopping', emoji: '🚶', saves: '$40/wk', color: colors.rose },
            { label: 'Brew home coffee before commute', emoji: '☕', saves: '$25/wk', color: colors.lavender },
            { label: 'Payday savings challenge', emoji: '🎯', saves: '$60/mo', color: colors.peach },
          ].map((r, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', marginBottom: 8, background: colors.card, borderRadius: 14, border: `1px solid ${colors.border}` }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <span style={{ fontSize: 18 }}>{r.emoji}</span>
                <p style={{ fontSize: 12, fontWeight: 500, color: colors.text, maxWidth: 180 }}>{r.label}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: 12, fontWeight: 700, color: r.color }}>{r.saves}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const screens = { home: HomeScreen, patterns: PatternsScreen, predict: PredictScreen, goals: GoalsScreen };
  const ActiveScreen = screens[activeTab] || HomeScreen;

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#0f0f1a', padding: 20, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* Phone frame */}
      <div style={{ width: 375, height: 812, background: colors.bg, borderRadius: 52, overflow: 'hidden', boxShadow: '0 40px 80px rgba(0,0,0,0.6), 0 0 0 12px #1c1c2e, 0 0 0 14px #2a2a3e', display: 'flex', flexDirection: 'column', position: 'relative' }}>
        {/* Status + Island */}
        <div style={{ background: colors.bg, zIndex: 10 }}>
          <StatusBar />
          <DynamicIsland />
        </div>

        {/* Screen content */}
        <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', position: 'relative' }}>
          <ActiveScreen key={activeTab} />
          <NudgeCard />
        </div>

        {/* Bottom nav */}
        <BottomNav />
      </div>
    </div>
  );
}
