function App() {
  const { useState, useEffect, useRef } = React;

  const [activeTab, setActiveTab] = useState('timeline');
  const [pressedBtn, setPressedBtn] = useState(null);
  const [simulateAmount, setSimulateAmount] = useState('');
  const [showSimResult, setShowSimResult] = useState(false);
  const [deferredBills, setDeferredBills] = useState([]);
  const [time, setTime] = useState('9:41');
  const [selectedDay, setSelectedDay] = useState(null);
  const [alertDismissed, setAlertDismissed] = useState([]);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&display=swap');
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body { background: #1a0a2e; display: flex; justify-content: center; align-items: center; min-height: 100vh; font-family: 'Sora', sans-serif; }
      ::-webkit-scrollbar { display: none; }
      .tab-press { transform: scale(0.92); transition: transform 0.1s; }
    `;
    document.head.appendChild(style);
    const t = setInterval(() => {
      const now = new Date();
      setTime(`${now.getHours()}:${String(now.getMinutes()).padStart(2,'0')}`);
    }, 10000);
    return () => clearInterval(t);
  }, []);

  const colors = {
    bg: '#FFF5EE',
    amber: '#F6A623',
    pink: '#FFB6C1',
    plum: '#6B3A5B',
    plumLight: '#8B4F7A',
    cream: '#FFF0E5',
    lightPink: '#FFF0F5',
    green: '#4CAF82',
    red: '#E05C5C',
    textPrimary: '#2D1B35',
    textSecondary: '#8B6B7A',
    cardBg: '#FFFFFF',
    border: '#F0E0E8',
  };

  const gradient = `linear-gradient(135deg, ${colors.plum} 0%, #A0527A 50%, ${colors.amber} 100%)`;
  const sunsetGrad = `linear-gradient(135deg, #FF6B6B 0%, ${colors.amber} 50%, ${colors.pink} 100%)`;

  const today = new Date();
  const payday = 15;

  const bills = [
    { id: 1, name: 'Netflix', amount: 15.99, day: 3, category: 'Entertainment', color: '#E84393', icon: '🎬', recurring: true },
    { id: 2, name: 'Spotify', amount: 9.99, day: 5, category: 'Entertainment', color: '#1DB954', icon: '🎵', recurring: true },
    { id: 3, name: 'Rent', amount: 1450.00, day: 1, category: 'Housing', color: colors.plum, icon: '🏠', recurring: true },
    { id: 4, name: 'Electric Bill', amount: 87.50, day: 12, category: 'Utilities', color: colors.amber, icon: '⚡', recurring: true },
    { id: 5, name: 'Internet', amount: 59.99, day: 18, category: 'Utilities', color: '#2196F3', icon: '📡', recurring: true },
    { id: 6, name: 'Gym', amount: 29.99, day: 22, category: 'Health', color: '#FF5722', icon: '💪', recurring: true },
    { id: 7, name: 'Adobe CC', amount: 54.99, day: 25, category: 'Software', color: '#FF0000', icon: '🎨', recurring: true },
    { id: 8, name: 'Car Insurance', amount: 142.00, day: 28, category: 'Insurance', color: '#607D8B', icon: '🚗', recurring: true },
  ];

  const income = 3200;
  const currentBalance = 2847.50;

  const getTimelineDays = () => {
    const days = [];
    for (let i = 0; i < 30; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      const dayNum = d.getDate();
      const dayBills = bills.filter(b => b.day === dayNum && !deferredBills.includes(b.id));
      const totalOut = dayBills.reduce((s, b) => s + b.amount, 0);
      const isPayday = dayNum === payday && d.getMonth() >= today.getMonth();
      const inflow = isPayday ? income : 0;
      days.push({ date: d, dayNum, bills: dayBills, totalOut, isPayday, inflow, index: i });
    }
    // compute running balance
    let bal = currentBalance;
    return days.map(d => {
      bal = bal + d.inflow - d.totalOut;
      return { ...d, runningBalance: bal };
    });
  };

  const timelineDays = getTimelineDays();
  const lowestBalance = Math.min(...timelineDays.map(d => d.runningBalance));
  const stressDay = timelineDays.find(d => d.runningBalance < 200);

  const alerts = [
    { id: 1, type: 'warning', title: 'Low balance alert', desc: 'Your balance drops below $200 on Mar 28 after Car Insurance ($142)', date: 'Mar 28', severity: 'high' },
    { id: 2, type: 'info', title: 'Payday in 4 days', desc: '$3,200 expected deposit on Mar 15. You\'re safe until then.', date: 'Mar 15', severity: 'good' },
    { id: 3, type: 'warning', title: 'Heavy week ahead', desc: 'Netflix, Spotify, and Electric Bill total $113.48 due Mar 3–12', date: 'Mar 3–12', severity: 'medium' },
    { id: 4, type: 'tip', title: 'Safe to spend today', desc: 'Based on upcoming bills, you can safely spend up to $420 before your next payday.', date: 'Today', severity: 'good' },
    { id: 5, type: 'tip', title: 'Irregular expense detected', desc: 'You spent ~$80 on groceries last week. Budgeting $85 this week.', date: 'Recurring', severity: 'neutral' },
  ];

  const safeToSpend = 420;

  const handlePress = (id) => {
    setPressedBtn(id);
    setTimeout(() => setPressedBtn(null), 150);
  };

  const handleDefer = (billId) => {
    setDeferredBills(prev => [...prev, billId]);
  };

  const handleSimulate = () => {
    if (simulateAmount) setShowSimResult(true);
  };

  const simAmount = parseFloat(simulateAmount) || 0;
  const newBalance = currentBalance - simAmount;
  const simSafe = newBalance >= 200;

  // --- SCREENS ---

  const TimelineScreen = () => {
    const scrollRef = useRef(null);
    return (
      <div style={{ flex: 1, overflowY: 'auto', background: colors.bg }}>
        {/* Header */}
        <div style={{ background: gradient, padding: '16px 20px 20px', borderRadius: '0 0 24px 24px' }}>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 12, marginBottom: 4 }}>Current Balance</p>
          <h1 style={{ color: '#fff', fontSize: 32, fontWeight: 700, letterSpacing: -1 }}>$2,847.50</h1>
          <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
            <div style={{ background: 'rgba(255,255,255,0.15)', borderRadius: 20, padding: '6px 14px', display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: 12 }}>💰</span>
              <span style={{ color: '#fff', fontSize: 12, fontWeight: 500 }}>Payday Mar 15</span>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.15)', borderRadius: 20, padding: '6px 14px', display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: 12 }}>✅</span>
              <span style={{ color: '#fff', fontSize: 12, fontWeight: 500 }}>Safe: $420</span>
            </div>
          </div>
        </div>

        {/* Stress alert */}
        {stressDay && (
          <div style={{ margin: '16px 16px 0', background: 'linear-gradient(135deg, #FFE0E0, #FFF0F0)', border: `1.5px solid #FFCCCC`, borderRadius: 16, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 20 }}>⚠️</span>
            <div>
              <p style={{ fontSize: 13, fontWeight: 600, color: colors.red }}>Balance stress detected!</p>
              <p style={{ fontSize: 11, color: colors.textSecondary }}>Drops to ${stressDay.runningBalance.toFixed(0)} on day {stressDay.dayNum}</p>
            </div>
          </div>
        )}

        {/* Mini bar chart */}
        <div style={{ padding: '16px 16px 0' }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: colors.textPrimary, marginBottom: 10 }}>30-Day Balance Forecast</p>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 60, background: colors.cardBg, borderRadius: 12, padding: '8px 10px', border: `1px solid ${colors.border}` }}>
            {timelineDays.map((d, i) => {
              const maxBal = Math.max(...timelineDays.map(x => x.runningBalance));
              const pct = Math.max(2, (d.runningBalance / maxBal) * 100);
              const isLow = d.runningBalance < 200;
              const isSel = selectedDay && selectedDay.index === i;
              return (
                <div
                  key={i}
                  onClick={() => setSelectedDay(isSel ? null : d)}
                  style={{
                    flex: 1,
                    height: `${pct}%`,
                    background: isLow ? colors.red : isSel ? colors.plum : d.isPayday ? colors.green : `linear-gradient(180deg, ${colors.amber}, ${colors.pink})`,
                    borderRadius: 3,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    transform: isSel ? 'scaleY(1.15)' : 'scaleY(1)',
                    minHeight: 4,
                  }}
                />
              );
            })}
          </div>
          {selectedDay && (
            <div style={{ marginTop: 8, background: colors.cardBg, border: `1px solid ${colors.border}`, borderRadius: 12, padding: '10px 12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: colors.textPrimary }}>
                  {selectedDay.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </p>
                <p style={{ fontSize: 13, fontWeight: 700, color: selectedDay.runningBalance < 200 ? colors.red : colors.green }}>
                  ${selectedDay.runningBalance.toFixed(2)}
                </p>
              </div>
              {selectedDay.bills.length > 0 && (
                <p style={{ fontSize: 11, color: colors.textSecondary, marginTop: 4 }}>
                  Bills: {selectedDay.bills.map(b => b.name).join(', ')} (−${selectedDay.totalOut.toFixed(2)})
                </p>
              )}
              {selectedDay.isPayday && (
                <p style={{ fontSize: 11, color: colors.green, marginTop: 2 }}>+ $3,200 paycheck</p>
              )}
            </div>
          )}
        </div>

        {/* Day-by-day list */}
        <div style={{ padding: '12px 16px 16px' }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: colors.textPrimary, marginBottom: 10 }}>Upcoming Days</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {timelineDays.slice(0, 14).map((d, i) => {
              const isToday = i === 0;
              const hasBills = d.bills.length > 0;
              const isLow = d.runningBalance < 200;
              return (
                <div
                  key={i}
                  style={{
                    background: colors.cardBg,
                    border: `1.5px solid ${isLow ? '#FFCCCC' : isToday ? colors.amber : colors.border}`,
                    borderRadius: 14,
                    padding: '10px 14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                  }}
                >
                  <div style={{
                    width: 38, height: 38, borderRadius: 10, flexShrink: 0,
                    background: isToday ? gradient : d.isPayday ? `linear-gradient(135deg, ${colors.green}, #6FCFA0)` : `linear-gradient(135deg, ${colors.lightPink}, ${colors.cream})`,
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
                  }}>
                    <span style={{ fontSize: 10, color: isToday || d.isPayday ? '#fff' : colors.textSecondary, fontWeight: 600 }}>
                      {d.date.toLocaleDateString('en-US', { weekday: 'short' }).slice(0,2).toUpperCase()}
                    </span>
                    <span style={{ fontSize: 14, fontWeight: 700, color: isToday || d.isPayday ? '#fff' : colors.textPrimary, lineHeight: 1 }}>
                      {d.dayNum}
                    </span>
                  </div>
                  <div style={{ flex: 1 }}>
                    {hasBills ? (
                      <p style={{ fontSize: 12, fontWeight: 600, color: colors.textPrimary }}>
                        {d.bills.map(b => b.name).join(', ')}
                      </p>
                    ) : d.isPayday ? (
                      <p style={{ fontSize: 12, fontWeight: 600, color: colors.green }}>💰 Payday +$3,200</p>
                    ) : (
                      <p style={{ fontSize: 12, color: colors.textSecondary }}>No charges</p>
                    )}
                    {isToday && <span style={{ fontSize: 10, color: colors.amber, fontWeight: 600 }}>TODAY</span>}
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    {hasBills && <p style={{ fontSize: 12, fontWeight: 700, color: colors.red }}>−${d.totalOut.toFixed(2)}</p>}
                    <p style={{ fontSize: 11, color: isLow ? colors.red : colors.textSecondary }}>${d.runningBalance.toFixed(0)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  const BillsScreen = () => (
    <div style={{ flex: 1, overflowY: 'auto', background: colors.bg }}>
      <div style={{ background: gradient, padding: '16px 20px 20px', borderRadius: '0 0 24px 24px' }}>
        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 12, marginBottom: 4 }}>Monthly Recurring</p>
        <h1 style={{ color: '#fff', fontSize: 28, fontWeight: 700 }}>$1,850.45</h1>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12, marginTop: 4 }}>8 recurring charges detected</p>
      </div>

      <div style={{ padding: '16px 16px 0' }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 16, overflowX: 'auto' }}>
          {['All', 'Housing', 'Utilities', 'Entertainment', 'Health'].map(cat => (
            <div key={cat} style={{
              flexShrink: 0, padding: '6px 14px', borderRadius: 20,
              background: cat === 'All' ? gradient : colors.cardBg,
              border: `1px solid ${cat === 'All' ? 'transparent' : colors.border}`,
              fontSize: 12, fontWeight: 500,
              color: cat === 'All' ? '#fff' : colors.textSecondary,
              cursor: 'pointer',
            }}>
              {cat}
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {bills.map(bill => {
            const isDeferred = deferredBills.includes(bill.id);
            return (
              <div key={bill.id} style={{
                background: colors.cardBg, border: `1.5px solid ${isDeferred ? '#DDD' : colors.border}`,
                borderRadius: 16, padding: '12px 14px', opacity: isDeferred ? 0.6 : 1,
                display: 'flex', alignItems: 'center', gap: 12,
              }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 12, background: `${bill.color}20`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0,
                }}>
                  {bill.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <p style={{ fontSize: 14, fontWeight: 600, color: colors.textPrimary }}>{bill.name}</p>
                      <p style={{ fontSize: 11, color: colors.textSecondary }}>{bill.category} · Due {bill.day}th</p>
                    </div>
                    <p style={{ fontSize: 15, fontWeight: 700, color: isDeferred ? colors.textSecondary : colors.plum }}>
                      ${bill.amount.toFixed(2)}
                    </p>
                  </div>
                  {!isDeferred && (
                    <div style={{ marginTop: 8, display: 'flex', gap: 6 }}>
                      <button
                        onClick={() => handleDefer(bill.id)}
                        style={{
                          padding: '4px 10px', borderRadius: 8, border: `1px solid ${colors.amber}`,
                          background: 'transparent', fontSize: 10, fontWeight: 600, color: colors.amber, cursor: 'pointer',
                        }}
                      >
                        Defer suggestion
                      </button>
                      <div style={{ padding: '4px 10px', borderRadius: 8, background: `${bill.color}15`, fontSize: 10, fontWeight: 500, color: bill.color }}>
                        {bill.recurring ? '♻️ Auto-detected' : 'Manual'}
                      </div>
                    </div>
                  )}
                  {isDeferred && (
                    <p style={{ fontSize: 10, color: colors.amber, fontWeight: 600, marginTop: 4 }}>⏸ Deferred — contact provider</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div style={{ height: 16 }} />
    </div>
  );

  const AlertsScreen = () => {
    const visible = alerts.filter(a => !alertDismissed.includes(a.id));
    return (
      <div style={{ flex: 1, overflowY: 'auto', background: colors.bg }}>
        <div style={{ background: gradient, padding: '16px 20px 20px', borderRadius: '0 0 24px 24px' }}>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 12, marginBottom: 4 }}>Spending Intelligence</p>
          <h1 style={{ color: '#fff', fontSize: 28, fontWeight: 700 }}>Alerts & Tips</h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12, marginTop: 4 }}>{visible.length} active insights</p>
        </div>

        {/* Safe-to-spend card */}
        <div style={{ margin: '16px 16px 0', background: `linear-gradient(135deg, #E8F5EC, #F0FAF3)`, border: `1.5px solid #B8E6C8`, borderRadius: 18, padding: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ fontSize: 12, color: colors.green, fontWeight: 600, marginBottom: 4 }}>✓ Safe to Spend Today</p>
              <p style={{ fontSize: 36, fontWeight: 700, color: '#1B6B3A', letterSpacing: -1 }}>${safeToSpend}</p>
              <p style={{ fontSize: 11, color: '#4A8C62', marginTop: 4 }}>Before next bill on Mar {bills.sort((a,b) => a.day - b.day).find(b => b.day >= today.getDate())?.day}</p>
            </div>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'linear-gradient(135deg, #4CAF82, #6FCFA0)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>
              💚
            </div>
          </div>
          <div style={{ marginTop: 12, background: '#fff', borderRadius: 10, overflow: 'hidden' }}>
            <div style={{ height: 6, background: `linear-gradient(90deg, ${colors.green}, #6FCFA0)`, width: '65%', borderRadius: 10 }} />
          </div>
          <p style={{ fontSize: 10, color: '#4A8C62', marginTop: 4 }}>65% of buffer remaining this pay period</p>
        </div>

        <div style={{ padding: '12px 16px 16px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {visible.map(alert => {
              const isGood = alert.severity === 'good';
              const isHigh = alert.severity === 'high';
              const isMed = alert.severity === 'medium';
              const bgColor = isGood ? '#F0FAF3' : isHigh ? '#FFF0F0' : isMed ? '#FFF8E8' : '#F8F0FF';
              const borderColor = isGood ? '#B8E6C8' : isHigh ? '#FFCCCC' : isMed ? '#FFE4AA' : colors.border;
              const icon = isGood ? '✅' : isHigh ? '🚨' : isMed ? '⚠️' : '💡';
              return (
                <div key={alert.id} style={{
                  background: bgColor, border: `1.5px solid ${borderColor}`,
                  borderRadius: 14, padding: '12px 14px',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ display: 'flex', gap: 10, flex: 1 }}>
                      <span style={{ fontSize: 20, flexShrink: 0 }}>{icon}</span>
                      <div style={{ flex: 1 }}>
                        <p style={{ fontSize: 13, fontWeight: 600, color: colors.textPrimary }}>{alert.title}</p>
                        <p style={{ fontSize: 11, color: colors.textSecondary, marginTop: 3, lineHeight: 1.4 }}>{alert.desc}</p>
                        <span style={{ fontSize: 10, color: colors.textSecondary, marginTop: 4, display: 'block' }}>{alert.date}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => setAlertDismissed(prev => [...prev, alert.id])}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, color: colors.textSecondary, padding: '0 4px', flexShrink: 0 }}
                    >
                      ×
                    </button>
                  </div>
                </div>
              );
            })}
            {visible.length === 0 && (
              <div style={{ textAlign: 'center', padding: '40px 20px', color: colors.textSecondary }}>
                <p style={{ fontSize: 32, marginBottom: 12 }}>🎉</p>
                <p style={{ fontSize: 14, fontWeight: 600, color: colors.textPrimary }}>All clear!</p>
                <p style={{ fontSize: 12, marginTop: 4 }}>No active alerts right now</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const SimulateScreen = () => (
    <div style={{ flex: 1, overflowY: 'auto', background: colors.bg }}>
      <div style={{ background: gradient, padding: '16px 20px 20px', borderRadius: '0 0 24px 24px' }}>
        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 12, marginBottom: 4 }}>What-If Calculator</p>
        <h1 style={{ color: '#fff', fontSize: 28, fontWeight: 700 }}>Simulate</h1>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12, marginTop: 4 }}>See spending impact before you commit</p>
      </div>

      <div style={{ padding: '16px' }}>
        {/* Input */}
        <div style={{ background: colors.cardBg, border: `1.5px solid ${colors.border}`, borderRadius: 18, padding: '16px', marginBottom: 12 }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: colors.textPrimary, marginBottom: 12 }}>How much do you want to spend?</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 28, fontWeight: 700, color: colors.plum }}>$</span>
            <input
              type="number"
              value={simulateAmount}
              onChange={e => { setSimulateAmount(e.target.value); setShowSimResult(false); }}
              placeholder="0.00"
              style={{
                flex: 1, fontSize: 28, fontWeight: 700, color: colors.textPrimary,
                border: 'none', outline: 'none', background: 'transparent', fontFamily: 'Sora, sans-serif',
              }}
            />
          </div>
          <div style={{ height: 2, background: `linear-gradient(90deg, ${colors.amber}, ${colors.pink})`, borderRadius: 2, marginTop: 8 }} />
        </div>

        {/* Quick amounts */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
          {['25', '50', '100', '250', '500'].map(amt => (
            <button
              key={amt}
              onClick={() => { setSimulateAmount(amt); setShowSimResult(false); }}
              style={{
                flex: 1, padding: '8px 4px', borderRadius: 10,
                background: simulateAmount === amt ? gradient : colors.cardBg,
                border: `1px solid ${simulateAmount === amt ? 'transparent' : colors.border}`,
                fontSize: 12, fontWeight: 600,
                color: simulateAmount === amt ? '#fff' : colors.textSecondary,
                cursor: 'pointer',
              }}
            >
              ${amt}
            </button>
          ))}
        </div>

        <button
          onClick={handleSimulate}
          style={{
            width: '100%', padding: '14px', borderRadius: 14, border: 'none',
            background: gradient, color: '#fff', fontSize: 15, fontWeight: 700,
            cursor: 'pointer', letterSpacing: 0.3,
          }}
        >
          Simulate Impact →
        </button>

        {showSimResult && (
          <div style={{
            marginTop: 16, background: simSafe ? '#F0FAF3' : '#FFF0F0',
            border: `1.5px solid ${simSafe ? '#B8E6C8' : '#FFCCCC'}`,
            borderRadius: 18, padding: '16px', animation: 'fadeIn 0.3s',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <span style={{ fontSize: 28 }}>{simSafe ? '✅' : '⚠️'}</span>
              <div>
                <p style={{ fontSize: 14, fontWeight: 700, color: simSafe ? '#1B6B3A' : colors.red }}>
                  {simSafe ? 'Looks good!' : 'Caution advised'}
                </p>
                <p style={{ fontSize: 11, color: colors.textSecondary }}>
                  {simSafe ? 'This purchase fits your budget' : 'This may cause cash-flow issues'}
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: `1px solid ${colors.border}` }}>
                <span style={{ fontSize: 12, color: colors.textSecondary }}>Current balance</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: colors.textPrimary }}>${currentBalance.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: `1px solid ${colors.border}` }}>
                <span style={{ fontSize: 12, color: colors.textSecondary }}>Simulated spend</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: colors.red }}>−${simAmount.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: `1px solid ${colors.border}` }}>
                <span style={{ fontSize: 12, color: colors.textSecondary }}>Remaining balance</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: newBalance < 200 ? colors.red : colors.green }}>${newBalance.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0' }}>
                <span style={{ fontSize: 12, color: colors.textSecondary }}>Bills before payday</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: colors.plum }}>
                  −${bills.filter(b => b.day >= today.getDate() && b.day < payday).reduce((s, b) => s + b.amount, 0).toFixed(2)}
                </span>
              </div>
            </div>

            {!simSafe && (
              <div style={{ marginTop: 12, background: '#FFEDED', borderRadius: 10, padding: '10px 12px' }}>
                <p style={{ fontSize: 11, fontWeight: 600, color: colors.red }}>💡 Recommendation</p>
                <p style={{ fontSize: 11, color: colors.textSecondary, marginTop: 3, lineHeight: 1.4 }}>
                  Consider waiting until after payday (Mar 15) or reduce spending to ${Math.max(0, currentBalance - 200 - bills.filter(b => b.day >= today.getDate() && b.day < payday).reduce((s, b) => s + b.amount, 0)).toFixed(0)}.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Popular scenarios */}
        <div style={{ marginTop: 20 }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: colors.textPrimary, marginBottom: 10 }}>Common Scenarios</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { label: 'Dinner & drinks', amount: 85, icon: '🍽️' },
              { label: 'Weekend trip', amount: 320, icon: '✈️' },
              { label: 'New sneakers', amount: 150, icon: '👟' },
              { label: 'Concert tickets', amount: 120, icon: '🎵' },
            ].map(scenario => (
              <button
                key={scenario.label}
                onClick={() => { setSimulateAmount(String(scenario.amount)); setShowSimResult(false); }}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  background: colors.cardBg, border: `1px solid ${colors.border}`,
                  borderRadius: 12, padding: '10px 14px', cursor: 'pointer', width: '100%',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 18 }}>{scenario.icon}</span>
                  <span style={{ fontSize: 13, color: colors.textPrimary, fontWeight: 500 }}>{scenario.label}</span>
                </div>
                <span style={{ fontSize: 13, fontWeight: 700, color: colors.plum }}>${scenario.amount}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      <div style={{ height: 16 }} />
    </div>
  );

  const tabs = [
    { id: 'timeline', label: 'Timeline', icon: '📈' },
    { id: 'bills', label: 'Bills', icon: '💳' },
    { id: 'alerts', label: 'Alerts', icon: '🔔' },
    { id: 'simulate', label: 'Simulate', icon: '🔮' },
  ];

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#1a0a2e', fontFamily: 'Sora, sans-serif', padding: '20px' }}>
      {/* Phone frame */}
      <div style={{
        width: 375, height: 812,
        background: colors.bg,
        borderRadius: 54,
        boxShadow: '0 0 0 10px #2a1a3e, 0 30px 80px rgba(0,0,0,0.7), inset 0 0 0 1px rgba(255,255,255,0.1)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}>
        {/* Status bar */}
        <div style={{ padding: '12px 28px 4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: colors.bg, flexShrink: 0 }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: colors.textPrimary }}>{time}</span>
          <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
            <span style={{ fontSize: 11 }}>▲▲▲</span>
            <span style={{ fontSize: 11 }}>WiFi</span>
            <span style={{ fontSize: 11 }}>▇▇</span>
          </div>
        </div>

        {/* Dynamic Island */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 6, flexShrink: 0 }}>
          <div style={{ width: 120, height: 32, background: '#111', borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#333' }} />
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#2a2a2a' }} />
          </div>
        </div>

        {/* Screen content */}
        <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          {activeTab === 'timeline' && <TimelineScreen />}
          {activeTab === 'bills' && <BillsScreen />}
          {activeTab === 'alerts' && <AlertsScreen />}
          {activeTab === 'simulate' && <SimulateScreen />}
        </div>

        {/* Bottom nav */}
        <div style={{
          background: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(20px)',
          borderTop: `1px solid ${colors.border}`,
          display: 'flex',
          padding: '8px 0 20px',
          flexShrink: 0,
        }}>
          {tabs.map(tab => {
            const isActive = activeTab === tab.id;
            const isPressed = pressedBtn === tab.id;
            return (
              <button
                key={tab.id}
                onMouseDown={() => handlePress(tab.id)}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 3,
                  border: 'none',
                  background: 'transparent',
                  cursor: 'pointer',
                  padding: '4px 0',
                  transform: isPressed ? 'scale(0.9)' : 'scale(1)',
                  transition: 'transform 0.1s',
                }}
              >
                <div style={{
                  width: 36, height: 36, borderRadius: 12,
                  background: isActive ? gradient : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 18, transition: 'all 0.2s',
                  boxShadow: isActive ? `0 4px 12px ${colors.plum}40` : 'none',
                }}>
                  {tab.icon}
                </div>
                <span style={{ fontSize: 10, fontWeight: isActive ? 700 : 500, color: isActive ? colors.plum : colors.textSecondary }}>
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
