const { useState, useEffect, useRef } = React;

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [prevTab, setPrevTab] = useState('home');
  const [transitioning, setTransitioning] = useState(false);
  const [patchedLeaks, setPatchedLeaks] = useState({});
  const [expandedLeak, setExpandedLeak] = useState(null);
  const [showPatchModal, setShowPatchModal] = useState(null);
  const [pressedBtn, setPressedBtn] = useState(null);
  const [scoreAnimated, setScoreAnimated] = useState(false);
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
      * { box-sizing: border-box; margin: 0; padding: 0; }
      ::-webkit-scrollbar { width: 0; }
      .scroll-container { overflow-y: auto; scrollbar-width: none; -ms-overflow-style: none; }
      @keyframes fadeSlideIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
      @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
      @keyframes ripple { 0% { transform: scale(0); opacity: 0.6; } 100% { transform: scale(2.5); opacity: 0; } }
      @keyframes slideUp { from { transform: translateY(100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
      @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
      .fade-in { animation: fadeSlideIn 0.35s ease forwards; }
      .leak-dot { animation: pulse 2s infinite; }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  useEffect(() => {
    if (activeTab === 'home' && !scoreAnimated) {
      setScoreAnimated(true);
      let start = 0;
      const target = 847;
      const duration = 1200;
      const step = (target / duration) * 16;
      const timer = setInterval(() => {
        start += step;
        if (start >= target) { setDisplayScore(target); clearInterval(timer); }
        else setDisplayScore(Math.floor(start));
      }, 16);
      return () => clearInterval(timer);
    }
  }, [activeTab]);

  const navigate = (tab) => {
    if (tab === activeTab) return;
    setPrevTab(activeTab);
    setTransitioning(true);
    setTimeout(() => { setActiveTab(tab); setTransitioning(false); }, 150);
  };

  const handleBtnPress = (id) => {
    setPressedBtn(id);
    setTimeout(() => setPressedBtn(null), 200);
  };

  const leaks = [
    { id: 1, name: 'Netflix + Hulu Overlap', category: 'Streaming', amount: 15.99, severity: 'high', icon: '📺', color: '#FF6B6B', description: 'You watch Netflix 94% of the time. Hulu has been idle for 23 days.', nextCharge: '3 days', actions: ['Cancel Hulu', 'Downgrade Plan', 'Snooze 30d'] },
    { id: 2, name: 'Adobe CC Trial → Paid', category: 'Software', amount: 54.99, severity: 'critical', icon: '⚠️', color: '#FF4444', description: 'Free trial converts to $54.99/mo on March 24. You\'ve only used it once.', nextCharge: '3 days', actions: ['Cancel Trial', 'Downgrade to Free', 'Set Reminder'] },
    { id: 3, name: 'Morning Coffee Habit', category: 'Food & Drink', amount: 94.00, severity: 'medium', icon: '☕', color: '#FF9F40', description: 'Starbucks 4x per week × $5.50 avg. That\'s $94/mo vs. $18 home brew.', nextCharge: 'Ongoing', actions: ['Set Weekly Limit', 'Find Alternative', 'Track Habit'] },
    { id: 4, name: 'Gym Membership – Unused', category: 'Health', amount: 39.99, severity: 'high', icon: '🏋️', color: '#FF6B6B', description: 'Last check-in: 47 days ago. Charged monthly. Freeze or cancel options available.', nextCharge: '11 days', actions: ['Freeze Account', 'Cancel Membership', 'Find Nearby Alt'] },
    { id: 5, name: 'Spotify + YouTube Premium', category: 'Music', amount: 10.99, severity: 'medium', icon: '🎵', color: '#FF9F40', description: 'Both services offer music. YouTube Premium includes ad-free music. Overlap detected.', nextCharge: '8 days', actions: ['Cancel Spotify', 'Keep Both', 'Compare Plans'] },
    { id: 6, name: 'Bank Overdraft Fees', category: 'Banking', amount: 35.00, severity: 'high', icon: '🏦', color: '#FF6B6B', description: '3 overdraft incidents this month ($11.67 avg). Triggered by small lunch app top-ups.', nextCharge: 'Ongoing', actions: ['Enable Alerts', 'Link Buffer', 'Dispute Fees'] },
    { id: 7, name: 'Late-Night Delivery Habit', category: 'Food & Drink', amount: 127.50, severity: 'medium', icon: '🌙', color: '#FF9F40', description: '8 UberEats orders after 10pm this month. Avg order $15.94 + $5.99 delivery fee.', nextCharge: 'Ongoing', actions: ['Set Time Limit', 'Meal Prep Plan', 'Track Pattern'] },
  ];

  const recoveryPlan = [
    { id: 1, action: 'Cancel Hulu', saving: 15.99, timeframe: 'Today', difficulty: 'Easy', done: patchedLeaks[1] },
    { id: 2, action: 'Cancel Adobe CC Trial', saving: 54.99, timeframe: 'Before Mar 24', difficulty: 'Easy', done: patchedLeaks[2] },
    { id: 3, action: 'Freeze Gym Membership', saving: 39.99, timeframe: 'This Week', difficulty: 'Medium', done: patchedLeaks[4] },
    { id: 4, action: 'Cancel Spotify', saving: 10.99, timeframe: 'This Week', difficulty: 'Easy', done: patchedLeaks[5] },
    { id: 5, action: 'Set Coffee Weekly Limit ($20)', saving: 74.00, timeframe: 'Ongoing', difficulty: 'Medium', done: false },
    { id: 6, action: 'Enable Overdraft Protection', saving: 35.00, timeframe: 'Today', difficulty: 'Easy', done: patchedLeaks[6] },
  ];

  const totalRecoverable = leaks.reduce((s, l) => s + l.amount, 0);
  const patched = Object.values(patchedLeaks).filter(Boolean).length;
  const recoveredAmount = leaks.filter(l => patchedLeaks[l.id]).reduce((s, l) => s + l.amount, 0);

  const colors = {
    bg: '#0D0F1A',
    card: '#161825',
    cardHover: '#1E2135',
    border: '#252840',
    primary: '#00D4AA',
    primaryDark: '#00A882',
    secondary: '#7C6FFF',
    danger: '#FF4D6D',
    warning: '#FF9F40',
    success: '#00D4AA',
    text: '#FFFFFF',
    textMuted: '#8B8FA8',
    textDim: '#5A5E75',
  };

  const styles = {
    phone: {
      width: 375, height: 812,
      background: colors.bg,
      borderRadius: 44,
      overflow: 'hidden',
      position: 'relative',
      fontFamily: "'Inter', sans-serif",
      boxShadow: '0 40px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.08)',
      display: 'flex',
      flexDirection: 'column',
    },
    statusBar: {
      padding: '14px 28px 0',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      flexShrink: 0,
    },
    dynamicIsland: {
      width: 120, height: 34,
      background: '#000',
      borderRadius: 20,
      margin: '8px auto 0',
    },
    content: {
      flex: 1, overflow: 'hidden',
      display: 'flex', flexDirection: 'column',
    },
    scrollable: {
      flex: 1,
      overflowY: 'auto',
      paddingBottom: 16,
    },
    bottomNav: {
      flexShrink: 0,
      padding: '10px 4px 24px',
      display: 'flex', justifyContent: 'space-around', alignItems: 'flex-start',
      borderTop: `1px solid ${colors.border}`,
      background: colors.card,
    },
    navBtn: (isActive) => ({
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
      padding: '6px 16px',
      borderRadius: 12,
      background: isActive ? `rgba(0,212,170,0.12)` : 'transparent',
      cursor: 'pointer',
      transition: 'all 0.2s',
      border: 'none',
      outline: 'none',
    }),
    navLabel: (isActive) => ({
      fontSize: 10, fontWeight: 600,
      color: isActive ? colors.primary : colors.textDim,
      transition: 'color 0.2s',
    }),
  };

  const StatusBar = () => (
    <div style={styles.statusBar}>
      <span style={{ fontSize: 13, fontWeight: 700, color: colors.text }}>9:41</span>
      <div style={styles.dynamicIsland} />
      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: 2, alignItems: 'flex-end' }}>
          {[3,5,7].map((h,i) => <div key={i} style={{ width: 3, height: h, background: colors.text, borderRadius: 1 }} />)}
        </div>
        <svg width="15" height="12" viewBox="0 0 15 12" fill="none">
          <path d="M7.5 2.5C9.5 2.5 11.3 3.3 12.6 4.6L14 3.2C12.3 1.5 10 0.5 7.5 0.5C5 0.5 2.7 1.5 1 3.2L2.4 4.6C3.7 3.3 5.5 2.5 7.5 2.5Z" fill={colors.text} fillOpacity="0.5"/>
          <path d="M7.5 5.5C8.8 5.5 10 6 10.9 6.9L12.3 5.5C11 4.2 9.3 3.5 7.5 3.5C5.7 3.5 4 4.2 2.7 5.5L4.1 6.9C5 6 6.2 5.5 7.5 5.5Z" fill={colors.text} fillOpacity="0.75"/>
          <circle cx="7.5" cy="10" r="1.5" fill={colors.text}/>
        </svg>
        <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <div style={{ width: 22, height: 11, borderRadius: 3, border: `1.5px solid rgba(255,255,255,0.5)`, padding: 2, display: 'flex', alignItems: 'center' }}>
            <div style={{ width: '76%', height: '100%', background: '#4ADE80', borderRadius: 1 }} />
          </div>
        </div>
      </div>
    </div>
  );

  const BottomNav = () => {
    const tabs = [
      { id: 'home', label: 'Home', IconName: 'Home' },
      { id: 'leaks', label: 'Leaks', IconName: 'Droplets' },
      { id: 'patch', label: 'Patch', IconName: 'Wrench' },
      { id: 'insights', label: 'Insights', IconName: 'BarChart2' },
      { id: 'profile', label: 'Profile', IconName: 'User' },
    ];
    return (
      <div style={styles.bottomNav}>
        {tabs.map(tab => {
          const Icon = window.lucide[tab.IconName];
          const isActive = activeTab === tab.id;
          return (
            <button key={tab.id} style={styles.navBtn(isActive)} onClick={() => navigate(tab.id)}>
              <div style={{ position: 'relative' }}>
                {Icon && <Icon size={20} color={isActive ? colors.primary : colors.textDim} strokeWidth={isActive ? 2.5 : 1.8} />}
                {tab.id === 'leaks' && (
                  <div style={{ position: 'absolute', top: -2, right: -2, width: 7, height: 7, background: colors.danger, borderRadius: '50%', border: `1.5px solid ${colors.card}` }} className="leak-dot" />
                )}
              </div>
              <span style={styles.navLabel(isActive)}>{tab.label}</span>
            </button>
          );
        })}
      </div>
    );
  };

  // HOME SCREEN
  const HomeScreen = () => {
    const [notifDismissed, setNotifDismissed] = useState([]);
    const notifications = [
      { id: 'n1', text: 'Adobe CC trial converts in 3 days', type: 'critical', amount: '$54.99' },
      { id: 'n2', text: 'You ordered coffee 4x this week', type: 'warning', amount: '$22.00' },
      { id: 'n3', text: 'Netflix & Hulu overlap detected', type: 'warning', amount: '$15.99' },
    ].filter(n => !notifDismissed.includes(n.id));

    return (
      <div style={{ padding: '20px 20px 0' }} className="fade-in">
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
          <div>
            <p style={{ fontSize: 13, color: colors.textMuted, marginBottom: 2 }}>Good morning, Alex 👋</p>
            <h1 style={{ fontSize: 22, fontWeight: 800, color: colors.text, letterSpacing: -0.5 }}>Patch Dashboard</h1>
          </div>
          <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'linear-gradient(135deg, #7C6FFF, #00D4AA)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>A</div>
        </div>

        {/* Recovery Score Card */}
        <div style={{ background: 'linear-gradient(135deg, #0B2027 0%, #0D2A35 50%, #0B1E2C 100%)', borderRadius: 20, padding: 20, marginBottom: 16, border: `1px solid rgba(0,212,170,0.2)`, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -20, right: -20, width: 120, height: 120, borderRadius: '50%', background: 'rgba(0,212,170,0.06)' }} />
          <div style={{ position: 'absolute', bottom: -30, left: 60, width: 80, height: 80, borderRadius: '50%', background: 'rgba(124,111,255,0.08)' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative' }}>
            <div>
              <p style={{ fontSize: 12, color: colors.primary, fontWeight: 600, marginBottom: 4, textTransform: 'uppercase', letterSpacing: 1 }}>30-Day Recovery</p>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4 }}>
                <span style={{ fontSize: 42, fontWeight: 900, color: colors.text, letterSpacing: -2 }}>${displayScore.toLocaleString()}</span>
              </div>
              <p style={{ fontSize: 12, color: colors.textMuted, marginTop: 4 }}>recoverable this month</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(0,212,170,0.15)', border: `3px solid ${colors.primary}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                <span style={{ fontSize: 18, fontWeight: 900, color: colors.primary }}>72</span>
                <span style={{ fontSize: 9, color: colors.textMuted, fontWeight: 600 }}>SCORE</span>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
            {[
              { label: 'Leaks Found', val: `${leaks.length}`, color: colors.danger },
              { label: 'Patched', val: `${patched}`, color: colors.primary },
              { label: 'Saved', val: `$${recoveredAmount.toFixed(0)}`, color: colors.secondary },
            ].map((stat, i) => (
              <div key={i} style={{ flex: 1, background: 'rgba(255,255,255,0.04)', borderRadius: 10, padding: '8px 10px', textAlign: 'center' }}>
                <p style={{ fontSize: 16, fontWeight: 800, color: stat.color }}>{stat.val}</p>
                <p style={{ fontSize: 10, color: colors.textDim, marginTop: 1 }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Urgent Alerts */}
        {notifications.length > 0 && (
          <div style={{ marginBottom: 16 }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: colors.textMuted, marginBottom: 10, textTransform: 'uppercase', letterSpacing: 0.8 }}>Urgent Alerts</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {notifications.map(n => (
                <div key={n.id} style={{ background: colors.card, borderRadius: 14, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10, border: `1px solid ${n.type === 'critical' ? 'rgba(255,77,109,0.3)' : 'rgba(255,159,64,0.2)'}` }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: n.type === 'critical' ? colors.danger : colors.warning, flexShrink: 0 }} />
                  <span style={{ flex: 1, fontSize: 13, color: colors.text, fontWeight: 500 }}>{n.text}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: n.type === 'critical' ? colors.danger : colors.warning }}>{n.amount}</span>
                  <button onClick={() => setNotifDismissed(p => [...p, n.id])} style={{ background: 'none', border: 'none', color: colors.textDim, cursor: 'pointer', fontSize: 16, lineHeight: 1, padding: 0 }}>×</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Spending Behaviors */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: colors.textMuted, textTransform: 'uppercase', letterSpacing: 0.8 }}>Behavior Clusters</p>
            <button onClick={() => navigate('insights')} style={{ fontSize: 11, color: colors.primary, background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>See All</button>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            {[
              { label: 'Streaming', amount: '$26.98', leaks: 2, icon: '📺', grad: 'rgba(255,77,109,0.15)' },
              { label: 'Coffee', amount: '$94/mo', leaks: 1, icon: '☕', grad: 'rgba(255,159,64,0.15)' },
              { label: 'Delivery', amount: '$127', leaks: 1, icon: '🛵', grad: 'rgba(124,111,255,0.15)' },
            ].map((c, i) => (
              <div key={i} style={{ flex: 1, background: c.grad, borderRadius: 14, padding: '12px 10px', textAlign: 'center', border: `1px solid rgba(255,255,255,0.06)` }}>
                <div style={{ fontSize: 22, marginBottom: 6 }}>{c.icon}</div>
                <p style={{ fontSize: 13, fontWeight: 700, color: colors.text }}>{c.amount}</p>
                <p style={{ fontSize: 10, color: colors.textMuted, marginTop: 2 }}>{c.label}</p>
                <div style={{ marginTop: 6, fontSize: 10, color: colors.danger, fontWeight: 600 }}>{c.leaks} leak{c.leaks > 1 ? 's' : ''}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Leaks Preview */}
        <div style={{ marginBottom: 8 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: colors.textMuted, textTransform: 'uppercase', letterSpacing: 0.8 }}>Top Leaks</p>
            <button onClick={() => navigate('leaks')} style={{ fontSize: 11, color: colors.primary, background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>View All</button>
          </div>
          {leaks.slice(0, 3).map(leak => (
            <div key={leak.id} onClick={() => navigate('leaks')} style={{ background: colors.card, borderRadius: 14, padding: '12px 14px', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 12, border: `1px solid ${colors.border}`, cursor: 'pointer' }}>
              <span style={{ fontSize: 22 }}>{leak.icon}</span>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: colors.text }}>{leak.name}</p>
                <p style={{ fontSize: 11, color: colors.textMuted, marginTop: 2 }}>Charges in {leak.nextCharge}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: 14, fontWeight: 800, color: patchedLeaks[leak.id] ? colors.primary : colors.danger }}>{patchedLeaks[leak.id] ? '✓' : `$${leak.amount}`}</p>
                <p style={{ fontSize: 10, color: colors.textMuted }}>/mo</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // LEAKS SCREEN
  const LeaksScreen = () => {
    const severityOrder = { critical: 0, high: 1, medium: 2 };
    const sorted = [...leaks].sort((a, b) => severityOrder[a.severity] - severityOrder[b.severity]);

    return (
      <div style={{ padding: '20px 20px 0' }} className="fade-in">
        <div style={{ marginBottom: 20 }}>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: colors.text, letterSpacing: -0.5 }}>Money Leaks</h1>
          <p style={{ fontSize: 13, color: colors.textMuted, marginTop: 4 }}>${totalRecoverable.toFixed(2)}/mo slipping away</p>
        </div>

        {/* Filter Chips */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 20, overflowX: 'auto', paddingBottom: 4 }}>
          {['All', 'Critical', 'Subscriptions', 'Habits', 'Fees'].map((f, i) => (
            <div key={i} style={{ flexShrink: 0, padding: '6px 14px', borderRadius: 20, background: i === 0 ? colors.primary : colors.card, border: `1px solid ${i === 0 ? colors.primary : colors.border}`, fontSize: 12, fontWeight: 600, color: i === 0 ? '#000' : colors.textMuted, cursor: 'pointer' }}>{f}</div>
          ))}
        </div>

        {sorted.map(leak => {
          const isExpanded = expandedLeak === leak.id;
          const isPatched = patchedLeaks[leak.id];
          return (
            <div key={leak.id} style={{ background: colors.card, borderRadius: 18, marginBottom: 10, border: `1px solid ${isPatched ? 'rgba(0,212,170,0.3)' : leak.severity === 'critical' ? 'rgba(255,68,68,0.3)' : colors.border}`, overflow: 'hidden', transition: 'all 0.3s' }}>
              <div onClick={() => setExpandedLeak(isExpanded ? null : leak.id)} style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: `${leak.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>{leak.icon}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                    <p style={{ fontSize: 14, fontWeight: 700, color: isPatched ? colors.textMuted : colors.text, textDecoration: isPatched ? 'line-through' : 'none' }}>{leak.name}</p>
                    {leak.severity === 'critical' && !isPatched && <span style={{ fontSize: 9, fontWeight: 800, background: 'rgba(255,68,68,0.15)', color: colors.danger, padding: '2px 6px', borderRadius: 6, textTransform: 'uppercase', letterSpacing: 0.5 }}>URGENT</span>}
                  </div>
                  <p style={{ fontSize: 11, color: colors.textMuted }}>{leak.category} · Next: {leak.nextCharge}</p>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <p style={{ fontSize: 16, fontWeight: 800, color: isPatched ? colors.primary : colors.danger }}>{isPatched ? '✓ Patched' : `$${leak.amount}`}</p>
                  {!isPatched && <p style={{ fontSize: 10, color: colors.textDim }}>per month</p>}
                </div>
              </div>
              {isExpanded && (
                <div style={{ padding: '0 16px 16px', animation: 'fadeSlideIn 0.2s ease' }}>
                  <div style={{ height: 1, background: colors.border, marginBottom: 12 }} />
                  <p style={{ fontSize: 13, color: colors.textMuted, lineHeight: 1.6, marginBottom: 14 }}>{leak.description}</p>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {leak.actions.map((action, i) => (
                      <button key={i} onClick={(e) => { e.stopPropagation(); if (i === 0) { setPatchedLeaks(p => ({ ...p, [leak.id]: true })); setExpandedLeak(null); } handleBtnPress(`${leak.id}-${i}`); }} style={{ flex: i === 0 ? 'none' : 1, padding: '9px 14px', borderRadius: 10, background: i === 0 ? colors.primary : 'rgba(255,255,255,0.06)', border: 'none', fontSize: 12, fontWeight: 700, color: i === 0 ? '#000' : colors.textMuted, cursor: 'pointer', transform: pressedBtn === `${leak.id}-${i}` ? 'scale(0.95)' : 'scale(1)', transition: 'transform 0.15s', whiteSpace: 'nowrap' }}>{action}</button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  // PATCH SCREEN
  const PatchScreen = () => {
    const totalPossible = recoveryPlan.reduce((s, r) => s + r.saving, 0);
    const totalPatched = recoveryPlan.filter(r => r.done).reduce((s, r) => s + r.saving, 0);
    const progress = totalPatched / totalPossible;

    return (
      <div style={{ padding: '20px 20px 0' }} className="fade-in">
        <div style={{ marginBottom: 20 }}>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: colors.text, letterSpacing: -0.5 }}>Patch Plan</h1>
          <p style={{ fontSize: 13, color: colors.textMuted, marginTop: 4 }}>Your personalized recovery roadmap</p>
        </div>

        {/* Progress Card */}
        <div style={{ background: 'linear-gradient(135deg, #0F1E18, #0D2420)', borderRadius: 20, padding: 20, marginBottom: 20, border: `1px solid rgba(0,212,170,0.2)` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
            <div>
              <p style={{ fontSize: 12, color: colors.primary, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>Recovery Progress</p>
              <p style={{ fontSize: 32, fontWeight: 900, color: colors.text }}>${totalPatched.toFixed(2)}</p>
              <p style={{ fontSize: 12, color: colors.textMuted }}>of ${totalPossible.toFixed(2)} recoverable</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: 28, fontWeight: 900, color: colors.primary }}>{Math.round(progress * 100)}%</p>
              <p style={{ fontSize: 11, color: colors.textMuted }}>complete</p>
            </div>
          </div>
          <div style={{ height: 8, background: 'rgba(255,255,255,0.08)', borderRadius: 4, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${progress * 100}%`, background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`, borderRadius: 4, transition: 'width 0.8s ease' }} />
          </div>
        </div>

        {/* Action Items */}
        <p style={{ fontSize: 12, fontWeight: 700, color: colors.textMuted, marginBottom: 12, textTransform: 'uppercase', letterSpacing: 0.8 }}>Action Items</p>
        {recoveryPlan.map((item, i) => (
          <div key={item.id} style={{ background: colors.card, borderRadius: 16, padding: '14px 16px', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 12, border: `1px solid ${item.done ? 'rgba(0,212,170,0.25)' : colors.border}`, opacity: item.done ? 0.7 : 1 }}>
            <button onClick={() => setPatchedLeaks(p => ({ ...p, [item.id]: !p[item.id] }))} style={{ width: 24, height: 24, borderRadius: 8, background: item.done ? colors.primary : 'transparent', border: `2px solid ${item.done ? colors.primary : colors.border}`, cursor: 'pointer', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}>
              {item.done && <svg width="12" height="12" viewBox="0 0 12 12"><path d="M2 6L5 9L10 3" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
            </button>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: 14, fontWeight: 600, color: colors.text, textDecoration: item.done ? 'line-through' : 'none' }}>{item.action}</p>
              <div style={{ display: 'flex', gap: 8, marginTop: 3 }}>
                <span style={{ fontSize: 11, color: colors.textMuted }}>{item.timeframe}</span>
                <span style={{ fontSize: 11, padding: '1px 6px', borderRadius: 4, background: item.difficulty === 'Easy' ? 'rgba(0,212,170,0.12)' : 'rgba(255,159,64,0.12)', color: item.difficulty === 'Easy' ? colors.primary : colors.warning, fontWeight: 600 }}>{item.difficulty}</span>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: 15, fontWeight: 800, color: item.done ? colors.primary : colors.text }}>+${item.saving}</p>
              <p style={{ fontSize: 10, color: colors.textDim }}>/mo saved</p>
            </div>
          </div>
        ))}

        {/* One-Tap Patch Banner */}
        <div style={{ background: 'linear-gradient(135deg, rgba(124,111,255,0.15), rgba(0,212,170,0.1))', borderRadius: 16, padding: 16, marginTop: 4, border: '1px solid rgba(124,111,255,0.2)', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ fontSize: 28 }}>⚡</div>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: colors.text }}>Auto-Patch Available</p>
            <p style={{ fontSize: 11, color: colors.textMuted, marginTop: 2 }}>We can handle 3 cancellations on your behalf</p>
          </div>
          <button style={{ padding: '8px 14px', background: colors.secondary, borderRadius: 10, border: 'none', fontSize: 12, fontWeight: 700, color: '#fff', cursor: 'pointer' }}>Enable</button>
        </div>
      </div>
    );
  };

  // INSIGHTS SCREEN
  const InsightsScreen = () => {
    const months = ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];
    const leakData = [210, 245, 290, 320, 387, 428];
    const maxVal = Math.max(...leakData);

    const habits = [
      { name: 'Morning Coffee', frequency: '4x/week', monthlyCost: 94, icon: '☕', trend: '+12%', dayBreakdown: [1,1,0,1,1,0,0] },
      { name: 'Late-Night Delivery', frequency: '2x/week', monthlyCost: 127, icon: '🌙', trend: '+34%', dayBreakdown: [0,0,1,0,0,1,1] },
      { name: 'Impulse Apps', frequency: '1x/week', monthlyCost: 23, icon: '📱', trend: '-5%', dayBreakdown: [0,1,0,0,0,0,1] },
    ];

    return (
      <div style={{ padding: '20px 20px 0' }} className="fade-in">
        <div style={{ marginBottom: 20 }}>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: colors.text, letterSpacing: -0.5 }}>Insights</h1>
          <p style={{ fontSize: 13, color: colors.textMuted, marginTop: 4 }}>Behavior patterns & spending trends</p>
        </div>

        {/* Trend Chart */}
        <div style={{ background: colors.card, borderRadius: 20, padding: 20, marginBottom: 16, border: `1px solid ${colors.border}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
            <div>
              <p style={{ fontSize: 13, fontWeight: 700, color: colors.text }}>Leak Growth Trend</p>
              <p style={{ fontSize: 11, color: colors.textMuted, marginTop: 2 }}>Monthly drain accumulation</p>
            </div>
            <span style={{ fontSize: 12, color: colors.danger, fontWeight: 700, background: 'rgba(255,77,109,0.12)', padding: '3px 8px', borderRadius: 8 }}>↑ 10.6%</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 100 }}>
            {leakData.map((val, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <div style={{ width: '100%', height: `${(val / maxVal) * 85}px`, background: i === 5 ? `linear-gradient(180deg, ${colors.primary}, ${colors.secondary})` : 'rgba(255,255,255,0.08)', borderRadius: '6px 6px 3px 3px', transition: 'height 0.5s ease', position: 'relative' }}>
                  {i === 5 && <div style={{ position: 'absolute', top: -20, left: '50%', transform: 'translateX(-50%)', fontSize: 10, fontWeight: 700, color: colors.primary, whiteSpace: 'nowrap' }}>$428</div>}
                </div>
                <span style={{ fontSize: 9, color: i === 5 ? colors.primary : colors.textDim, fontWeight: i === 5 ? 700 : 400 }}>{months[i]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Behavior Clusters */}
        <p style={{ fontSize: 12, fontWeight: 700, color: colors.textMuted, marginBottom: 12, textTransform: 'uppercase', letterSpacing: 0.8 }}>Habit Clusters</p>
        {habits.map((h, i) => (
          <div key={i} style={{ background: colors.card, borderRadius: 16, padding: '14px 16px', marginBottom: 10, border: `1px solid ${colors.border}` }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 12 }}>
              <span style={{ fontSize: 28 }}>{h.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <p style={{ fontSize: 14, fontWeight: 700, color: colors.text }}>{h.name}</p>
                  <span style={{ fontSize: 12, fontWeight: 700, color: h.trend.startsWith('+') ? colors.danger : colors.primary }}>{h.trend}</span>
                </div>
                <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
                  <span style={{ fontSize: 11, color: colors.textMuted }}>{h.frequency}</span>
                  <span style={{ fontSize: 11, color: colors.danger, fontWeight: 600 }}>${h.monthlyCost}/mo</span>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 5 }}>
              {['M','T','W','T','F','S','S'].map((d, j) => (
                <div key={j} style={{ flex: 1, textAlign: 'center' }}>
                  <div style={{ width: '100%', height: 24, borderRadius: 6, background: h.dayBreakdown[j] ? `${colors.danger}33` : 'rgba(255,255,255,0.04)', border: h.dayBreakdown[j] ? `1px solid ${colors.danger}66` : '1px solid transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {h.dayBreakdown[j] ? <div style={{ width: 6, height: 6, borderRadius: '50%', background: colors.danger }} /> : null}
                  </div>
                  <p style={{ fontSize: 9, color: colors.textDim, marginTop: 3 }}>{d}</p>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Prediction Box */}
        <div style={{ background: 'linear-gradient(135deg, rgba(124,111,255,0.1), rgba(0,212,170,0.08))', borderRadius: 16, padding: 16, marginTop: 4, border: '1px solid rgba(124,111,255,0.2)' }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
            <span style={{ fontSize: 24 }}>🔮</span>
            <div>
              <p style={{ fontSize: 13, fontWeight: 700, color: colors.text }}>Next Month Forecast</p>
              <p style={{ fontSize: 12, color: colors.textMuted, marginTop: 4, lineHeight: 1.5 }}>Without patching, your leaks are projected to reach <span style={{ color: colors.danger, fontWeight: 700 }}>$471</span> by April. Apply all patches to drop to <span style={{ color: colors.primary, fontWeight: 700 }}>$68</span>.</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // PROFILE SCREEN
  const ProfileScreen = () => {
    const [notifications, setNotifications] = useState(true);
    const [autoScan, setAutoScan] = useState(true);
    const [weeklyReport, setWeeklyReport] = useState(false);

    const Toggle = ({ val, onChange }) => (
      <div onClick={() => onChange(!val)} style={{ width: 44, height: 26, borderRadius: 13, background: val ? colors.primary : colors.border, cursor: 'pointer', position: 'relative', transition: 'background 0.3s', flexShrink: 0 }}>
        <div style={{ position: 'absolute', top: 3, left: val ? 21 : 3, width: 20, height: 20, borderRadius: '50%', background: '#fff', transition: 'left 0.3s', boxShadow: '0 1px 4px rgba(0,0,0,0.3)' }} />
      </div>
    );

    return (
      <div style={{ padding: '20px 20px 0' }} className="fade-in">
        <div style={{ marginBottom: 24 }}>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: colors.text, letterSpacing: -0.5 }}>Profile</h1>
        </div>

        {/* Profile Card */}
        <div style={{ background: colors.card, borderRadius: 20, padding: 20, marginBottom: 16, border: `1px solid ${colors.border}`, display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'linear-gradient(135deg, #7C6FFF, #00D4AA)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 700 }}>A</div>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 17, fontWeight: 800, color: colors.text }}>Alex Johnson</p>
            <p style={{ fontSize: 13, color: colors.textMuted, marginTop: 2 }}>alex@email.com</p>
            <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
              <span style={{ fontSize: 11, padding: '3px 8px', borderRadius: 6, background: 'rgba(0,212,170,0.12)', color: colors.primary, fontWeight: 600 }}>Recovery Score: 72</span>
              <span style={{ fontSize: 11, padding: '3px 8px', borderRadius: 6, background: 'rgba(124,111,255,0.12)', color: colors.secondary, fontWeight: 600 }}>Pro Plan</span>
            </div>
          </div>
        </div>

        {/* Connected Accounts */}
        <div style={{ background: colors.card, borderRadius: 16, padding: 16, marginBottom: 12, border: `1px solid ${colors.border}` }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: colors.textMuted, marginBottom: 12, textTransform: 'uppercase', letterSpacing: 0.8 }}>Connected Accounts</p>
          {[
            { name: 'Chase Checking', icon: '🏦', status: 'Active', last4: '4829' },
            { name: 'PayPal', icon: '💙', status: 'Active', last4: '••••' },
            { name: 'Apple Card', icon: '🍎', status: 'Pending', last4: '7731' },
          ].map((acc, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, paddingVertical: 8, marginBottom: i < 2 ? 10 : 0 }}>
              <span style={{ fontSize: 20 }}>{acc.icon}</span>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: colors.text }}>{acc.name} ···{acc.last4}</p>
              </div>
              <span style={{ fontSize: 11, fontWeight: 600, color: acc.status === 'Active' ? colors.primary : colors.warning, background: acc.status === 'Active' ? 'rgba(0,212,170,0.1)' : 'rgba(255,159,64,0.1)', padding: '3px 8px', borderRadius: 6 }}>{acc.status}</span>
            </div>
          ))}
          <button style={{ width: '100%', marginTop: 12, padding: '10px', borderRadius: 10, background: 'rgba(255,255,255,0.04)', border: `1px dashed ${colors.border}`, fontSize: 13, fontWeight: 600, color: colors.textMuted, cursor: 'pointer' }}>+ Add Account</button>
        </div>

        {/* Settings */}
        <div style={{ background: colors.card, borderRadius: 16, padding: 16, marginBottom: 12, border: `1px solid ${colors.border}` }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: colors.textMuted, marginBottom: 12, textTransform: 'uppercase', letterSpacing: 0.8 }}>Preferences</p>
          {[
            { label: 'Leak Alerts', desc: 'Notify when new leaks detected', val: notifications, set: setNotifications },
            { label: 'Auto-Scan', desc: 'Daily transaction analysis', val: autoScan, set: setAutoScan },
            { label: 'Weekly Report', desc: 'Email digest every Monday', val: weeklyReport, set: setWeeklyReport },
          ].map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: i < 2 ? 14 : 0 }}>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 14, fontWeight: 600, color: colors.text }}>{s.label}</p>
                <p style={{ fontSize: 11, color: colors.textMuted, marginTop: 2 }}>{s.desc}</p>
              </div>
              <Toggle val={s.val} onChange={s.set} />
            </div>
          ))}
        </div>

        {/* Stats Summary */}
        <div style={{ background: colors.card, borderRadius: 16, padding: 16, border: `1px solid ${colors.border}` }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: colors.textMuted, marginBottom: 12, textTransform: 'uppercase', letterSpacing: 0.8 }}>Your Impact</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {[
              { label: 'Total Saved', val: '$1,240', color: colors.primary },
              { label: 'Leaks Patched', val: '23', color: colors.secondary },
              { label: 'Months Active', val: '4', color: colors.warning },
              { label: 'Recovery Rate', val: '87%', color: '#4ADE80' },
            ].map((stat, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 12, padding: '12px', textAlign: 'center' }}>
                <p style={{ fontSize: 22, fontWeight: 900, color: stat.color }}>{stat.val}</p>
                <p style={{ fontSize: 11, color: colors.textDim, marginTop: 3 }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const screens = { home: HomeScreen, leaks: LeaksScreen, patch: PatchScreen, insights: InsightsScreen, profile: ProfileScreen };
  const CurrentScreen = screens[activeTab];

  return (
    <div style={{ minHeight: '100vh', background: '#060810', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, fontFamily: "'Inter', sans-serif" }}>
      {/* Ambient Glow */}
      <div style={{ position: 'fixed', top: '30%', left: '50%', transform: 'translateX(-50%)', width: 400, height: 300, background: 'radial-gradient(ellipse, rgba(0,212,170,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={styles.phone}>
        <StatusBar />
        <div style={styles.content}>
          <div style={{ ...styles.scrollable, opacity: transitioning ? 0 : 1, transition: 'opacity 0.15s ease' }} className="scroll-container">
            <CurrentScreen />
            <div style={{ height: 20 }} />
          </div>
        </div>
        <BottomNav />
      </div>

      {/* Patch Modal */}
      {showPatchModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', zIndex: 100 }} onClick={() => setShowPatchModal(null)}>
          <div style={{ background: colors.card, borderRadius: '20px 20px 0 0', padding: 24, width: 375, animation: 'slideUp 0.3s ease' }} onClick={e => e.stopPropagation()}>
            <p style={{ fontSize: 18, fontWeight: 800, color: colors.text, marginBottom: 8 }}>Patch Applied!</p>
            <p style={{ fontSize: 14, color: colors.textMuted }}>You've saved an additional ${showPatchModal}/mo</p>
            <button onClick={() => setShowPatchModal(null)} style={{ width: '100%', marginTop: 20, padding: 14, borderRadius: 14, background: colors.primary, border: 'none', fontSize: 15, fontWeight: 700, color: '#000', cursor: 'pointer' }}>Done</button>
          </div>
        </div>
      )}
    </div>
  );
}
