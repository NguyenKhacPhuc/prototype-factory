function App() {
  const { useState, useEffect, useRef } = React;

  // Load Google Fonts
  const fontStyle = document.createElement('style');
  fontStyle.textContent = `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');`;
  if (!document.head.querySelector('[data-bill-echo-fonts]')) {
    fontStyle.setAttribute('data-bill-echo-fonts', '1');
    document.head.appendChild(fontStyle);
  }

  const [activeTab, setActiveTab] = useState('home');
  const [selectedDay, setSelectedDay] = useState(null);
  const [pressedButton, setPressedButton] = useState(null);
  const [purchaseAmount, setPurchaseAmount] = useState('');
  const [purchaseResult, setPurchaseResult] = useState(null);
  const [showSuggestion, setShowSuggestion] = useState(null);
  const [snoozeToggle, setSnoozeToggle] = useState({});
  const [animateIn, setAnimateIn] = useState(true);

  useEffect(() => {
    setAnimateIn(false);
    setTimeout(() => setAnimateIn(true), 50);
  }, [activeTab]);

  const colors = {
    bg: '#0A0D14',
    surface: '#111827',
    card: '#1A2235',
    cardHover: '#1F2D44',
    primary: '#00D4AA',
    primaryDark: '#00A884',
    primaryGlow: 'rgba(0,212,170,0.15)',
    secondary: '#F5A623',
    secondaryGlow: 'rgba(245,166,35,0.15)',
    danger: '#FF4D6D',
    dangerGlow: 'rgba(255,77,109,0.15)',
    safe: '#00D4AA',
    warning: '#F5A623',
    text: '#F0F4FF',
    textMuted: '#8892A4',
    textFaint: '#4A5568',
    border: 'rgba(255,255,255,0.07)',
    borderLight: 'rgba(255,255,255,0.12)',
  };

  const today = 21;
  const currentMonth = 'March 2026';

  // Cash flow data for the next 30 days
  const cashFlowData = [
    { day: 21, balance: 847, type: 'normal', events: [] },
    { day: 22, balance: 847, type: 'normal', events: [] },
    { day: 23, balance: 627, type: 'warning', events: [{ name: 'Spotify', amount: -9.99, type: 'bill' }, { name: 'Phone Bill', amount: -65, type: 'bill' }, { name: 'Groceries', amount: -145, type: 'spend' }] },
    { day: 24, balance: 627, type: 'warning', events: [] },
    { day: 25, balance: 627, type: 'warning', events: [] },
    { day: 26, balance: 107, type: 'danger', events: [{ name: 'Rent', amount: -520, type: 'bill' }] },
    { day: 27, balance: 107, type: 'danger', events: [] },
    { day: 28, balance: 107, type: 'danger', events: [] },
    { day: 29, balance: 107, type: 'danger', events: [] },
    { day: 30, balance: 107, type: 'danger', events: [] },
    { day: 31, balance: 107, type: 'danger', events: [] },
    { day: 1, balance: 2357, type: 'safe', events: [{ name: 'Paycheck', amount: 2250, type: 'income' }], isPayday: true },
    { day: 2, balance: 2357, type: 'safe', events: [] },
    { day: 3, balance: 2107, type: 'safe', events: [{ name: 'Netflix', amount: -15.99, type: 'bill' }, { name: 'Gym', amount: -39, type: 'bill' }, { name: 'Groceries', amount: -120, type: 'spend' }] },
    { day: 4, balance: 2107, type: 'safe', events: [] },
    { day: 5, balance: 2107, type: 'safe', events: [] },
    { day: 6, balance: 1987, type: 'safe', events: [{ name: 'Electric Bill', amount: -120, type: 'bill' }] },
    { day: 7, balance: 1987, type: 'safe', events: [] },
  ];

  const bills = [
    { id: 1, name: 'Rent', amount: 520, dueDay: 26, category: 'housing', status: 'danger', daysLeft: 5, icon: '🏠', recurring: 'monthly' },
    { id: 2, name: 'Phone Bill', amount: 65, dueDay: 23, category: 'utilities', status: 'warning', daysLeft: 2, icon: '📱', recurring: 'monthly' },
    { id: 3, name: 'Spotify', amount: 9.99, dueDay: 23, category: 'entertainment', status: 'warning', daysLeft: 2, icon: '🎵', recurring: 'monthly' },
    { id: 4, name: 'Netflix', amount: 15.99, dueDay: 3, category: 'entertainment', status: 'safe', daysLeft: 13, icon: '🎬', recurring: 'monthly' },
    { id: 5, name: 'Gym Membership', amount: 39, dueDay: 3, category: 'health', status: 'safe', daysLeft: 13, icon: '💪', recurring: 'monthly' },
    { id: 6, name: 'Electric Bill', amount: 120, dueDay: 6, category: 'utilities', status: 'safe', daysLeft: 16, icon: '⚡', recurring: 'monthly' },
    { id: 7, name: 'Car Insurance', amount: 180, dueDay: 15, category: 'insurance', status: 'safe', daysLeft: 25, icon: '🚗', recurring: 'monthly', microSaving: { daily: 6, saved: 72, target: 180 } },
  ];

  const suggestions = [
    { id: 1, title: 'Move Spotify to after payday', savings: 'Avoids danger zone Mar 26–31', action: 'Move to Apr 2', icon: 'move', color: colors.primary },
    { id: 2, title: 'Pause Netflix this month', savings: 'Frees up $15.99 for gap period', action: 'Pause 1 month', icon: 'pause', color: colors.secondary },
    { id: 3, title: 'Trim groceries by $40', savings: 'Keeps buffer above $150', action: 'Set weekly limit', icon: 'trim', color: colors.primary },
  ];

  const buttonPress = (id) => {
    setPressedButton(id);
    setTimeout(() => setPressedButton(null), 150);
  };

  const checkPurchase = () => {
    const amount = parseFloat(purchaseAmount);
    if (!amount) return;
    const minBalance = Math.min(...cashFlowData.slice(0, 11).map(d => d.balance));
    if (amount <= 50 && minBalance > 300) {
      setPurchaseResult({ status: 'safe', message: 'Good to go! This won\'t affect your upcoming bills.', detail: 'Your lowest balance before payday stays above $300.' });
    } else if (amount <= 150 && minBalance > 150) {
      setPurchaseResult({ status: 'caution', message: 'Risky — tight gap before payday.', detail: `Your balance dips to $${(minBalance - amount).toFixed(0)} on Mar 26–31. Consider waiting 5 days.` });
    } else {
      setPurchaseResult({ status: 'danger', message: 'Not recommended right now.', detail: `Spending $${amount} now leaves only $${(minBalance - amount).toFixed(0)} before rent is due. High overdraft risk.` });
    }
  };

  const styles = {
    wrapper: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #050709 0%, #0D1520 50%, #070A10 100%)',
      fontFamily: "'Inter', sans-serif",
    },
    phone: {
      width: '375px',
      height: '812px',
      background: colors.bg,
      borderRadius: '50px',
      overflow: 'hidden',
      position: 'relative',
      boxShadow: '0 0 0 1px rgba(255,255,255,0.1), 0 30px 80px rgba(0,0,0,0.8), 0 0 120px rgba(0,212,170,0.05)',
      display: 'flex',
      flexDirection: 'column',
    },
    statusBar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '16px 28px 8px',
      flexShrink: 0,
    },
    dynamicIsland: {
      width: '120px',
      height: '34px',
      background: '#000',
      borderRadius: '20px',
      position: 'absolute',
      top: '12px',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 10,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 14px',
    },
    content: {
      flex: 1,
      overflowY: 'auto',
      overflowX: 'hidden',
      paddingBottom: '80px',
      opacity: animateIn ? 1 : 0,
      transform: animateIn ? 'translateY(0)' : 'translateY(8px)',
      transition: 'opacity 0.2s ease, transform 0.2s ease',
    },
    navBar: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: '80px',
      background: 'rgba(17,24,39,0.95)',
      backdropFilter: 'blur(20px)',
      borderTop: `1px solid ${colors.border}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      padding: '0 8px 12px',
    },
    navItem: (tab) => ({
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '4px',
      padding: '8px 16px',
      borderRadius: '12px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      opacity: activeTab === tab ? 1 : 0.5,
    }),
    navDot: (tab) => ({
      width: '4px',
      height: '4px',
      borderRadius: '50%',
      background: colors.primary,
      opacity: activeTab === tab ? 1 : 0,
      transition: 'opacity 0.2s ease',
      marginTop: '2px',
    }),
    sectionTitle: {
      fontSize: '11px',
      fontWeight: '600',
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: colors.textMuted,
      marginBottom: '12px',
    },
    card: {
      background: colors.card,
      borderRadius: '16px',
      padding: '16px',
      border: `1px solid ${colors.border}`,
    },
    tag: (color) => ({
      fontSize: '10px',
      fontWeight: '600',
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      padding: '3px 8px',
      borderRadius: '6px',
      background: color + '20',
      color: color,
    }),
    pill: (color) => ({
      display: 'inline-flex',
      alignItems: 'center',
      gap: '4px',
      padding: '4px 10px',
      borderRadius: '20px',
      background: color + '15',
      border: `1px solid ${color}30`,
      color: color,
      fontSize: '11px',
      fontWeight: '600',
    }),
    btn: (pressed) => ({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '6px',
      padding: '12px 20px',
      borderRadius: '12px',
      background: colors.primary,
      color: '#000',
      fontWeight: '700',
      fontSize: '14px',
      cursor: 'pointer',
      border: 'none',
      transform: pressed ? 'scale(0.96)' : 'scale(1)',
      transition: 'transform 0.1s ease',
      fontFamily: "'Inter', sans-serif",
    }),
    btnGhost: (pressed) => ({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '6px',
      padding: '10px 16px',
      borderRadius: '12px',
      background: colors.primaryGlow,
      color: colors.primary,
      fontWeight: '600',
      fontSize: '13px',
      cursor: 'pointer',
      border: `1px solid ${colors.primary}30`,
      transform: pressed ? 'scale(0.96)' : 'scale(1)',
      transition: 'transform 0.1s ease',
      fontFamily: "'Inter', sans-serif",
    }),
  };

  // ─── Status Bar ───────────────────────────────────────────────────────────
  const StatusBar = () => {
    const HeartIcon = window.lucide?.Wifi;
    return (
      <div style={styles.statusBar}>
        <span style={{ fontSize: '12px', fontWeight: '700', color: colors.text }}>9:41</span>
        <div style={{ width: '120px', height: '34px' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <svg width="15" height="11" viewBox="0 0 15 11" fill="none">
            <rect x="0" y="4" width="3" height="7" rx="1" fill={colors.textMuted}/>
            <rect x="4" y="2.5" width="3" height="8.5" rx="1" fill={colors.textMuted}/>
            <rect x="8" y="1" width="3" height="10" rx="1" fill={colors.text}/>
            <rect x="12" y="0" width="3" height="11" rx="1" fill={colors.text}/>
          </svg>
          <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
            <path d="M8 2.5C10.3 2.5 12.4 3.5 13.8 5.1L15.2 3.7C13.4 1.8 10.8 0.5 8 0.5C5.2 0.5 2.6 1.8 0.8 3.7L2.2 5.1C3.6 3.5 5.7 2.5 8 2.5Z" fill={colors.text}/>
            <path d="M8 5.5C9.6 5.5 11.1 6.2 12.1 7.3L13.5 5.9C12.1 4.5 10.2 3.5 8 3.5C5.8 3.5 3.9 4.5 2.5 5.9L3.9 7.3C4.9 6.2 6.4 5.5 8 5.5Z" fill={colors.text}/>
            <circle cx="8" cy="10" r="1.5" fill={colors.text}/>
          </svg>
          <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
            <div style={{ width: '22px', height: '11px', borderRadius: '3px', border: `1.5px solid ${colors.text}`, padding: '1.5px', display: 'flex', alignItems: 'center' }}>
              <div style={{ width: '60%', height: '100%', borderRadius: '1px', background: colors.primary }} />
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ─── Dynamic Island ──────────────────────────────────────────────────────
  const DynamicIsland = () => (
    <div style={styles.dynamicIsland}>
      <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#1a1a1a', border: '1px solid #333' }} />
      <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#333' }} />
    </div>
  );

  // ─── HOME SCREEN ─────────────────────────────────────────────────────────
  const HomeScreen = () => {
    const dangerDays = cashFlowData.filter(d => d.type === 'danger').length;

    return (
      <div style={{ padding: '0 20px 20px' }}>
        {/* Header */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
            <div>
              <p style={{ fontSize: '13px', color: colors.textMuted, marginBottom: '4px' }}>Good morning, Alex</p>
              <h1 style={{ fontSize: '26px', fontWeight: '800', color: colors.text, lineHeight: 1.1 }}>
                Your next <span style={{ color: colors.danger }}>30 days</span>
              </h1>
            </div>
            <div style={{ width: '38px', height: '38px', borderRadius: '12px', background: colors.card, border: `1px solid ${colors.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>
              🔔
            </div>
          </div>
        </div>

        {/* Balance Card */}
        <div style={{ background: `linear-gradient(135deg, ${colors.card} 0%, #1E2D4A 100%)`, borderRadius: '20px', padding: '20px', marginBottom: '16px', border: `1px solid ${colors.borderLight}`, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '120px', height: '120px', borderRadius: '50%', background: colors.primaryGlow }} />
          <p style={{ fontSize: '12px', color: colors.textMuted, marginBottom: '6px', fontWeight: '500' }}>Current Balance</p>
          <div style={{ fontSize: '36px', fontWeight: '800', color: colors.text, letterSpacing: '-1px', marginBottom: '16px' }}>$847.00</div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <div style={{ flex: 1, background: 'rgba(0,0,0,0.3)', borderRadius: '10px', padding: '10px 12px' }}>
              <p style={{ fontSize: '10px', color: colors.textMuted, marginBottom: '3px' }}>Payday in</p>
              <p style={{ fontSize: '16px', fontWeight: '700', color: colors.text }}>11 <span style={{ fontSize: '12px', fontWeight: '500', color: colors.textMuted }}>days</span></p>
            </div>
            <div style={{ flex: 1, background: 'rgba(0,0,0,0.3)', borderRadius: '10px', padding: '10px 12px' }}>
              <p style={{ fontSize: '10px', color: colors.textMuted, marginBottom: '3px' }}>Bills due</p>
              <p style={{ fontSize: '16px', fontWeight: '700', color: colors.danger }}>$594.99</p>
            </div>
            <div style={{ flex: 1, background: 'rgba(0,0,0,0.3)', borderRadius: '10px', padding: '10px 12px' }}>
              <p style={{ fontSize: '10px', color: colors.textMuted, marginBottom: '3px' }}>Safe buffer</p>
              <p style={{ fontSize: '16px', fontWeight: '700', color: colors.warning }}>$107</p>
            </div>
          </div>
        </div>

        {/* Danger Alert */}
        <div style={{ background: colors.dangerGlow, border: `1px solid ${colors.danger}30`, borderRadius: '14px', padding: '14px 16px', marginBottom: '16px', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
          <div style={{ fontSize: '18px', marginTop: '1px' }}>⚠️</div>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: '13px', fontWeight: '700', color: colors.danger, marginBottom: '3px' }}>Cash gap detected: Mar 26–31</p>
            <p style={{ fontSize: '12px', color: colors.textMuted, lineHeight: 1.5 }}>Rent due on the 26th leaves only $107 buffer for {dangerDays} days before payday. 3 easy fixes available.</p>
          </div>
        </div>

        {/* Cash Flow Mini Calendar */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <p style={styles.sectionTitle}>Cash Flow — {currentMonth}</p>
            <span style={{ fontSize: '11px', color: colors.primary, fontWeight: '600', cursor: 'pointer' }} onClick={() => setActiveTab('calendar')}>Full view →</span>
          </div>
          <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '4px' }}>
            {cashFlowData.slice(0, 12).map((day, i) => {
              const barColor = day.type === 'danger' ? colors.danger : day.type === 'warning' ? colors.warning : colors.primary;
              const isToday = day.day === today;
              const maxBal = 2500;
              const barH = Math.max(16, Math.min(52, (day.balance / maxBal) * 52));
              return (
                <div
                  key={i}
                  onClick={() => { setSelectedDay(selectedDay === i ? null : i); setActiveTab('calendar'); }}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', flexShrink: 0, cursor: 'pointer' }}
                >
                  <div style={{ height: '52px', display: 'flex', alignItems: 'flex-end' }}>
                    <div style={{ width: '22px', height: `${barH}px`, borderRadius: '5px 5px 3px 3px', background: isToday ? colors.primary : barColor + '80', border: isToday ? `1px solid ${colors.primary}` : 'none', transition: 'height 0.3s ease' }} />
                  </div>
                  <p style={{ fontSize: '10px', color: isToday ? colors.primary : colors.textMuted, fontWeight: isToday ? '700' : '400' }}>{day.day}</p>
                  {day.isPayday && <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: colors.primary }} />}
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{ marginBottom: '20px' }}>
          <p style={styles.sectionTitle}>Quick Actions</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            {[
              { label: 'Check a Purchase', icon: '🛒', tab: 'check', color: colors.primary },
              { label: 'View Bills', icon: '📋', tab: 'bills', color: colors.warning },
              { label: 'See Suggestions', icon: '💡', tab: 'calendar', color: colors.secondary },
              { label: 'Micro-Savings', icon: '🎯', tab: 'bills', color: colors.primary },
            ].map((a, i) => (
              <div
                key={i}
                onClick={() => { buttonPress(a.label); setActiveTab(a.tab); }}
                style={{ background: colors.card, borderRadius: '14px', padding: '14px', border: `1px solid ${colors.border}`, cursor: 'pointer', transform: pressedButton === a.label ? 'scale(0.96)' : 'scale(1)', transition: 'transform 0.1s ease' }}
              >
                <div style={{ fontSize: '22px', marginBottom: '8px' }}>{a.icon}</div>
                <p style={{ fontSize: '12px', fontWeight: '600', color: colors.text, lineHeight: 1.3 }}>{a.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Bills Preview */}
        <div>
          <p style={styles.sectionTitle}>Up Next</p>
          {bills.slice(0, 3).map((bill) => {
            const statusColor = bill.status === 'danger' ? colors.danger : bill.status === 'warning' ? colors.warning : colors.primary;
            return (
              <div key={bill.id} style={{ ...styles.card, marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: statusColor + '15', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', flexShrink: 0 }}>{bill.icon}</div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '13px', fontWeight: '600', color: colors.text }}>{bill.name}</p>
                  <p style={{ fontSize: '11px', color: colors.textMuted }}>Due in {bill.daysLeft} days · Mar {bill.dueDay}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: '14px', fontWeight: '700', color: statusColor }}>-${bill.amount}</p>
                  <div style={styles.tag(statusColor)}>{bill.status}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // ─── CALENDAR SCREEN ─────────────────────────────────────────────────────
  const CalendarScreen = () => {
    const [localSelected, setLocalSelected] = useState(0);
    const day = cashFlowData[localSelected];
    const statusColor = day.type === 'danger' ? colors.danger : day.type === 'warning' ? colors.warning : colors.primary;

    return (
      <div style={{ padding: '0 20px 20px' }}>
        <div style={{ marginBottom: '20px' }}>
          <p style={{ fontSize: '13px', color: colors.textMuted, marginBottom: '4px' }}>Cash Flow Calendar</p>
          <h1 style={{ fontSize: '22px', fontWeight: '800', color: colors.text }}>30-Day Simulation</h1>
        </div>

        {/* Suggestions Strip */}
        <div style={{ marginBottom: '20px' }}>
          <p style={styles.sectionTitle}>Reshaping Suggestions</p>
          {suggestions.map((s, i) => (
            <div
              key={s.id}
              style={{ background: showSuggestion === s.id ? colors.cardHover : colors.card, borderRadius: '14px', padding: '14px', marginBottom: '8px', border: `1px solid ${showSuggestion === s.id ? s.color + '40' : colors.border}`, cursor: 'pointer', transition: 'all 0.2s ease' }}
              onClick={() => setShowSuggestion(showSuggestion === s.id ? null : s.id)}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '10px', background: s.color + '15', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>
                    {i === 0 ? '📅' : i === 1 ? '⏸️' : '✂️'}
                  </div>
                  <div>
                    <p style={{ fontSize: '13px', fontWeight: '600', color: colors.text }}>{s.title}</p>
                    <p style={{ fontSize: '11px', color: colors.textMuted }}>{s.savings}</p>
                  </div>
                </div>
                <div style={{ fontSize: '12px', color: showSuggestion === s.id ? '▲' : s.color }}>
                  {showSuggestion === s.id ? '▲' : '▼'}
                </div>
              </div>
              {showSuggestion === s.id && (
                <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: `1px solid ${colors.border}`, display: 'flex', gap: '8px' }}>
                  <button
                    onClick={(e) => { e.stopPropagation(); buttonPress('apply-' + s.id); }}
                    style={{ ...styles.btn(pressedButton === 'apply-' + s.id), flex: 1, padding: '10px', fontSize: '13px' }}
                  >
                    {s.action}
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); setShowSuggestion(null); }}
                    style={{ ...styles.btnGhost(false), padding: '10px 14px', fontSize: '13px' }}
                  >
                    Skip
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Day Detail */}
        <div style={{ marginBottom: '20px' }}>
          <p style={styles.sectionTitle}>Day Detail</p>
          <div style={{ background: colors.card, borderRadius: '16px', padding: '16px', border: `1px solid ${statusColor}30` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
              <div>
                <p style={{ fontSize: '13px', color: colors.textMuted }}>Mar {day.day}</p>
                <p style={{ fontSize: '24px', fontWeight: '800', color: statusColor }}>
                  ${day.balance.toLocaleString()}
                </p>
                <p style={{ fontSize: '11px', color: colors.textMuted }}>Projected balance</p>
              </div>
              <div style={styles.tag(statusColor)}>{day.type}</div>
            </div>
            {day.events.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {day.events.map((ev, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 10px', background: 'rgba(0,0,0,0.2)', borderRadius: '8px' }}>
                    <p style={{ fontSize: '12px', color: colors.text }}>{ev.name}</p>
                    <p style={{ fontSize: '13px', fontWeight: '700', color: ev.type === 'income' ? colors.primary : colors.danger }}>
                      {ev.amount > 0 ? '+' : ''}${Math.abs(ev.amount)}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ fontSize: '12px', color: colors.textFaint }}>No transactions on this day</p>
            )}
          </div>
        </div>

        {/* Full Day Bars */}
        <div>
          <p style={styles.sectionTitle}>Next 30 Days</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px' }}>
            {cashFlowData.map((d, i) => {
              const bc = d.type === 'danger' ? colors.danger : d.type === 'warning' ? colors.warning : colors.primary;
              const isActive = i === localSelected;
              const maxBal = 2500;
              const barH = Math.max(12, Math.min(40, (d.balance / maxBal) * 40));
              return (
                <div
                  key={i}
                  onClick={() => setLocalSelected(i)}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', cursor: 'pointer', padding: '4px 2px', borderRadius: '8px', background: isActive ? bc + '15' : 'transparent', border: `1px solid ${isActive ? bc + '40' : 'transparent'}`, transition: 'all 0.15s ease' }}
                >
                  <div style={{ height: '40px', display: 'flex', alignItems: 'flex-end' }}>
                    <div style={{ width: '100%', minWidth: '28px', height: `${barH}px`, borderRadius: '4px 4px 2px 2px', background: isActive ? bc : bc + '50', transition: 'all 0.15s ease' }} />
                  </div>
                  <p style={{ fontSize: '9px', color: isActive ? bc : colors.textFaint, fontWeight: isActive ? '700' : '400' }}>{d.day}</p>
                </div>
              );
            })}
          </div>
          {/* Legend */}
          <div style={{ display: 'flex', gap: '12px', marginTop: '12px', justifyContent: 'center' }}>
            {[['Safe', colors.primary], ['Warning', colors.warning], ['Danger', colors.danger]].map(([label, color]) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: color }} />
                <span style={{ fontSize: '10px', color: colors.textMuted }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // ─── BILLS SCREEN ─────────────────────────────────────────────────────────
  const BillsScreen = () => {
    const totalDue = bills.reduce((s, b) => s + b.amount, 0);
    return (
      <div style={{ padding: '0 20px 20px' }}>
        <div style={{ marginBottom: '20px' }}>
          <p style={{ fontSize: '13px', color: colors.textMuted, marginBottom: '4px' }}>Upcoming Bills</p>
          <h1 style={{ fontSize: '22px', fontWeight: '800', color: colors.text }}>This Month</h1>
        </div>

        {/* Summary */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          {[
            { label: 'Total Due', value: `$${totalDue.toFixed(0)}`, color: colors.text },
            { label: 'Danger', value: '1 bill', color: colors.danger },
            { label: 'Warning', value: '2 bills', color: colors.warning },
          ].map((s, i) => (
            <div key={i} style={{ flex: 1, background: colors.card, borderRadius: '12px', padding: '12px', border: `1px solid ${colors.border}` }}>
              <p style={{ fontSize: '10px', color: colors.textMuted, marginBottom: '4px' }}>{s.label}</p>
              <p style={{ fontSize: '15px', fontWeight: '700', color: s.color }}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Micro-savings card */}
        <div style={{ marginBottom: '20px' }}>
          <p style={styles.sectionTitle}>Micro-Savings Goals</p>
          {bills.filter(b => b.microSaving).map(bill => {
            const ms = bill.microSaving;
            const pct = (ms.saved / ms.target) * 100;
            return (
              <div key={bill.id} style={{ background: colors.card, borderRadius: '16px', padding: '16px', border: `1px solid ${colors.border}`, marginBottom: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ fontSize: '22px' }}>{bill.icon}</div>
                    <div>
                      <p style={{ fontSize: '14px', fontWeight: '600', color: colors.text }}>{bill.name}</p>
                      <p style={{ fontSize: '11px', color: colors.textMuted }}>Due in {bill.daysLeft} days</p>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: '13px', fontWeight: '700', color: colors.primary }}>${ms.daily}/day</p>
                    <p style={{ fontSize: '10px', color: colors.textMuted }}>micro-goal</p>
                  </div>
                </div>
                <div style={{ marginBottom: '8px' }}>
                  <div style={{ height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${pct}%`, background: `linear-gradient(90deg, ${colors.primary}, ${colors.primaryDark})`, borderRadius: '3px', transition: 'width 0.5s ease' }} />
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '11px', color: colors.textMuted }}>Saved: <span style={{ color: colors.primary, fontWeight: '600' }}>${ms.saved}</span></span>
                  <span style={{ fontSize: '11px', color: colors.textMuted }}>Target: <span style={{ color: colors.text, fontWeight: '600' }}>${ms.target}</span></span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bills List */}
        <div>
          <p style={styles.sectionTitle}>All Bills</p>
          {bills.map((bill) => {
            const statusColor = bill.status === 'danger' ? colors.danger : bill.status === 'warning' ? colors.warning : colors.primary;
            const isSnoozed = snoozeToggle[bill.id];
            return (
              <div key={bill.id} style={{ background: colors.card, borderRadius: '14px', padding: '14px 16px', marginBottom: '8px', border: `1px solid ${isSnoozed ? colors.textFaint + '40' : statusColor + '20'}`, opacity: isSnoozed ? 0.6 : 1, transition: 'all 0.2s ease' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: statusColor + '15', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0 }}>{bill.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
                      <p style={{ fontSize: '14px', fontWeight: '600', color: isSnoozed ? colors.textMuted : colors.text }}>{bill.name}</p>
                      {!isSnoozed && <div style={styles.tag(statusColor)}>{bill.status}</div>}
                    </div>
                    <p style={{ fontSize: '11px', color: colors.textMuted }}>Due Mar {bill.dueDay} · {bill.recurring}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: '15px', fontWeight: '700', color: isSnoozed ? colors.textMuted : statusColor }}>
                      -${bill.amount}
                    </p>
                    <div
                      onClick={() => setSnoozeToggle(prev => ({ ...prev, [bill.id]: !prev[bill.id] }))}
                      style={{ fontSize: '10px', color: isSnoozed ? colors.textMuted : colors.primary, fontWeight: '600', cursor: 'pointer', marginTop: '2px' }}
                    >
                      {isSnoozed ? 'Unsnooze' : 'Snooze'}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // ─── CHECK PURCHASE SCREEN ────────────────────────────────────────────────
  const CheckScreen = () => {
    const safeColor = purchaseResult?.status === 'safe' ? colors.primary : purchaseResult?.status === 'caution' ? colors.warning : colors.danger;
    const presets = [29, 59, 99, 149, 249];

    return (
      <div style={{ padding: '0 20px 20px' }}>
        <div style={{ marginBottom: '20px' }}>
          <p style={{ fontSize: '13px', color: colors.textMuted, marginBottom: '4px' }}>Purchase Check</p>
          <h1 style={{ fontSize: '22px', fontWeight: '800', color: colors.text }}>Is it safe to buy?</h1>
          <p style={{ fontSize: '13px', color: colors.textMuted, marginTop: '4px', lineHeight: 1.5 }}>Enter an amount and we'll tell you exactly what it means for your cash flow.</p>
        </div>

        {/* Amount Input */}
        <div style={{ background: colors.card, borderRadius: '20px', padding: '20px', marginBottom: '16px', border: `1px solid ${colors.border}` }}>
          <p style={{ fontSize: '11px', color: colors.textMuted, marginBottom: '8px', fontWeight: '500' }}>Amount to spend</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <span style={{ fontSize: '32px', fontWeight: '800', color: colors.textMuted }}>$</span>
            <input
              type="number"
              value={purchaseAmount}
              onChange={(e) => { setPurchaseAmount(e.target.value); setPurchaseResult(null); }}
              placeholder="0.00"
              style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', fontSize: '32px', fontWeight: '800', color: colors.text, fontFamily: "'Inter', sans-serif", width: '100%' }}
            />
          </div>
          {/* Preset amounts */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
            {presets.map(p => (
              <div
                key={p}
                onClick={() => { setPurchaseAmount(String(p)); setPurchaseResult(null); }}
                style={{ padding: '6px 14px', borderRadius: '20px', background: purchaseAmount == p ? colors.primaryGlow : 'rgba(255,255,255,0.05)', border: `1px solid ${purchaseAmount == p ? colors.primary + '50' : colors.border}`, color: purchaseAmount == p ? colors.primary : colors.textMuted, fontSize: '13px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.15s ease' }}
              >
                ${p}
              </div>
            ))}
          </div>
          <button
            onClick={() => { buttonPress('check'); checkPurchase(); }}
            style={{ ...styles.btn(pressedButton === 'check'), width: '100%' }}
          >
            Check this purchase
          </button>
        </div>

        {/* Result */}
        {purchaseResult && (
          <div style={{ background: safeColor + '10', borderRadius: '16px', padding: '20px', marginBottom: '16px', border: `1px solid ${safeColor}30`, animation: 'fadeIn 0.3s ease' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <div style={{ fontSize: '24px' }}>
                {purchaseResult.status === 'safe' ? '✅' : purchaseResult.status === 'caution' ? '⚠️' : '🚫'}
              </div>
              <p style={{ fontSize: '16px', fontWeight: '700', color: safeColor }}>{purchaseResult.message}</p>
            </div>
            <p style={{ fontSize: '13px', color: colors.textMuted, lineHeight: 1.6 }}>{purchaseResult.detail}</p>
            {purchaseResult.status !== 'safe' && (
              <div style={{ marginTop: '14px', padding: '12px', background: 'rgba(0,0,0,0.2)', borderRadius: '10px' }}>
                <p style={{ fontSize: '11px', color: colors.primary, fontWeight: '600', marginBottom: '4px' }}>💡 Suggested Alternative</p>
                <p style={{ fontSize: '12px', color: colors.textMuted }}>Wait until Apr 1 after payday — then your balance jumps to $2,357 and this purchase is completely safe.</p>
              </div>
            )}
          </div>
        )}

        {/* Context Cards */}
        <div>
          <p style={styles.sectionTitle}>Your Current Snapshot</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[
              { label: 'Balance today', value: '$847', icon: '💵', status: 'neutral' },
              { label: 'Lowest balance (Mar 26–31)', value: '$107', icon: '📉', status: 'danger' },
              { label: 'Next payday', value: 'Apr 1 · +$2,250', icon: '📅', status: 'safe' },
              { label: 'Bills before payday', value: '$594.99', icon: '📋', status: 'warning' },
            ].map((item, i) => {
              const c = item.status === 'safe' ? colors.primary : item.status === 'danger' ? colors.danger : item.status === 'warning' ? colors.warning : colors.textMuted;
              return (
                <div key={i} style={{ background: colors.card, borderRadius: '12px', padding: '12px 14px', display: 'flex', alignItems: 'center', gap: '10px', border: `1px solid ${colors.border}` }}>
                  <span style={{ fontSize: '16px' }}>{item.icon}</span>
                  <p style={{ flex: 1, fontSize: '13px', color: colors.textMuted }}>{item.label}</p>
                  <p style={{ fontSize: '13px', fontWeight: '700', color: c }}>{item.value}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  // ─── INSIGHTS SCREEN ──────────────────────────────────────────────────────
  const InsightsScreen = () => {
    const patterns = [
      { icon: '🔁', title: 'Bill cluster detected', body: 'Phone, Spotify, and rent all due within 3 days. This happens every month — moving Spotify avoids the crunch.', tag: 'Pattern', tagColor: colors.warning },
      { icon: '📊', title: 'You earn enough overall', body: 'Monthly income ($2,250) covers all bills ($949.99) with $1,300+ leftover. The issue is timing, not total income.', tag: 'Insight', tagColor: colors.primary },
      { icon: '💸', title: 'Subscriptions: $64.99/mo', body: 'Netflix, Spotify, and Gym = $64.99. Pausing just one during tight months adds $15–39 buffer.', tag: 'Review', tagColor: colors.secondary },
      { icon: '🎯', title: 'Micro-saving is working', body: 'You\'re $72 of $180 saved for car insurance. At $6/day, you\'ll hit the target 4 days before it\'s due.', tag: 'On Track', tagColor: colors.primary },
    ];

    const monthlyBreakdown = [
      { cat: 'Housing', amount: 520, pct: 55, color: colors.danger },
      { cat: 'Utilities', amount: 185, pct: 19, color: colors.warning },
      { cat: 'Subscriptions', amount: 64.99, pct: 7, color: colors.secondary },
      { cat: 'Groceries', amount: 265, pct: 28, color: colors.primary },
      { cat: 'Insurance', amount: 180, pct: 19, color: colors.textMuted },
    ];

    return (
      <div style={{ padding: '0 20px 20px' }}>
        <div style={{ marginBottom: '20px' }}>
          <p style={{ fontSize: '13px', color: colors.textMuted, marginBottom: '4px' }}>Financial Intelligence</p>
          <h1 style={{ fontSize: '22px', fontWeight: '800', color: colors.text }}>Your Insights</h1>
        </div>

        {/* Spending Breakdown */}
        <div style={{ marginBottom: '20px' }}>
          <p style={styles.sectionTitle}>Monthly Breakdown</p>
          <div style={{ background: colors.card, borderRadius: '16px', padding: '16px', border: `1px solid ${colors.border}` }}>
            {monthlyBreakdown.map((item, i) => (
              <div key={i} style={{ marginBottom: i < monthlyBreakdown.length - 1 ? '12px' : '0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                  <span style={{ fontSize: '12px', color: colors.text, fontWeight: '500' }}>{item.cat}</span>
                  <span style={{ fontSize: '12px', color: item.color, fontWeight: '600' }}>${item.amount}</span>
                </div>
                <div style={{ height: '5px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${item.pct}%`, background: item.color, borderRadius: '3px' }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Patterns */}
        <div>
          <p style={styles.sectionTitle}>Patterns & Plain-Language Insights</p>
          {patterns.map((p, i) => (
            <div key={i} style={{ background: colors.card, borderRadius: '16px', padding: '16px', marginBottom: '10px', border: `1px solid ${colors.border}` }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: p.tagColor + '15', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', flexShrink: 0 }}>{p.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '5px' }}>
                    <p style={{ fontSize: '13px', fontWeight: '700', color: colors.text }}>{p.title}</p>
                  </div>
                  <p style={{ fontSize: '12px', color: colors.textMuted, lineHeight: 1.6 }}>{p.body}</p>
                  <div style={{ marginTop: '8px' }}>
                    <span style={styles.tag(p.tagColor)}>{p.tag}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Month Score */}
        <div style={{ background: `linear-gradient(135deg, ${colors.card}, #1E2D4A)`, borderRadius: '16px', padding: '20px', marginTop: '10px', border: `1px solid ${colors.borderLight}`, textAlign: 'center' }}>
          <p style={{ fontSize: '11px', color: colors.textMuted, marginBottom: '6px', fontWeight: '600', letterSpacing: '0.06em', textTransform: 'uppercase' }}>March Cash Health Score</p>
          <div style={{ fontSize: '56px', fontWeight: '800', color: colors.warning, lineHeight: 1, marginBottom: '4px' }}>72</div>
          <p style={{ fontSize: '13px', color: colors.textMuted }}>Moderate — Timing issue, not income issue</p>
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '14px' }}>
            <span style={styles.pill(colors.primary)}>✓ Income sufficient</span>
            <span style={styles.pill(colors.warning)}>⚠ Timing cluster</span>
          </div>
        </div>
      </div>
    );
  };

  // ─── NAV BAR ─────────────────────────────────────────────────────────────
  const tabs = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'calendar', label: 'Flow', icon: '📈' },
    { id: 'bills', label: 'Bills', icon: '📋' },
    { id: 'check', label: 'Check', icon: '🛒' },
    { id: 'insights', label: 'Insights', icon: '💡' },
  ];

  const renderScreen = () => {
    switch (activeTab) {
      case 'home': return <HomeScreen />;
      case 'calendar': return <CalendarScreen />;
      case 'bills': return <BillsScreen />;
      case 'check': return <CheckScreen />;
      case 'insights': return <InsightsScreen />;
      default: return <HomeScreen />;
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.phone}>
        <DynamicIsland />
        <StatusBar />
        <div style={styles.content}>
          {renderScreen()}
        </div>
        {/* Nav Bar */}
        <div style={styles.navBar}>
          {tabs.map(tab => (
            <div
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={styles.navItem(tab.id)}
            >
              <span style={{ fontSize: '20px', lineHeight: 1 }}>{tab.icon}</span>
              <span style={{ fontSize: '10px', fontWeight: activeTab === tab.id ? '700' : '500', color: activeTab === tab.id ? colors.primary : colors.textMuted }}>
                {tab.label}
              </span>
              <div style={styles.navDot(tab.id)} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
