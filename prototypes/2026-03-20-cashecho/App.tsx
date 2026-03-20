
function App() {
  const { useState, useEffect, useRef } = React;

  const [activeTab, setActiveTab] = useState('home');
  const [showCheckIn, setShowCheckIn] = useState(false);
  const [selectedMood, setSelectedMood] = useState(null);
  const [checkInStep, setCheckInStep] = useState(1);
  const [shieldActive, setShieldActive] = useState(null);
  const [shieldTimer, setShieldTimer] = useState(0);
  const [pressedTab, setPressedTab] = useState(null);
  const timerRef = useRef(null);

  const colors = {
    bg: '#0D0F1A',
    surface: '#161929',
    card: '#1E2235',
    cardHover: '#252A42',
    primary: '#7C6FF7',
    primaryLight: '#9D93F9',
    primaryDim: 'rgba(124,111,247,0.15)',
    amber: '#F5A623',
    amberDim: 'rgba(245,166,35,0.15)',
    teal: '#4ECDC4',
    tealDim: 'rgba(78,205,196,0.15)',
    rose: '#FF6B8A',
    roseDim: 'rgba(255,107,138,0.15)',
    green: '#52D68A',
    greenDim: 'rgba(82,214,138,0.15)',
    text: '#E8EAF6',
    textMuted: '#8B90B0',
    textDim: '#555A7A',
    border: 'rgba(255,255,255,0.06)',
    borderLight: 'rgba(255,255,255,0.1)',
  };

  // Font injection
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Syne:wght@600;700;800&display=swap');
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body { background: #070810; display: flex; align-items: center; justify-content: center; min-height: 100vh; font-family: 'Inter', sans-serif; }
      ::-webkit-scrollbar { width: 0px; }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  // Shield timer
  useEffect(() => {
    if (shieldActive && shieldTimer > 0) {
      timerRef.current = setTimeout(() => setShieldTimer(t => t - 1), 1000);
    } else if (shieldTimer === 0 && shieldActive) {
      // timer done
    }
    return () => clearTimeout(timerRef.current);
  }, [shieldActive, shieldTimer]);

  const moods = [
    { id: 'stressed', emoji: '😤', label: 'Stressed', color: colors.rose },
    { id: 'bored', emoji: '😑', label: 'Bored', color: colors.amber },
    { id: 'anxious', emoji: '😰', label: 'Anxious', color: '#A78BFA' },
    { id: 'happy', emoji: '😊', label: 'Happy', color: colors.green },
    { id: 'tired', emoji: '😴', label: 'Tired', color: '#60A5FA' },
    { id: 'lonely', emoji: '🥺', label: 'Lonely', color: '#F472B6' },
  ];

  const triggers = [
    {
      id: 1,
      icon: '🌙',
      title: 'Late Night Scroll',
      pattern: 'After 9 PM on weekdays',
      category: 'Time',
      risk: 'high',
      avgSpend: '$34',
      frequency: '3× per week',
      mood: 'Bored / Tired',
      color: '#A78BFA',
      savings: '$408/yr',
    },
    {
      id: 2,
      icon: '💼',
      title: 'Post-Work Stress',
      pattern: 'After 6 PM, high-stress days',
      category: 'Emotion',
      risk: 'high',
      avgSpend: '$28',
      frequency: '2× per week',
      mood: 'Stressed',
      color: colors.rose,
      savings: '$291/yr',
    },
    {
      id: 3,
      icon: '💰',
      title: 'Payday Window',
      pattern: '24–72 hrs after pay deposit',
      category: 'Event',
      risk: 'medium',
      avgSpend: '$67',
      frequency: '2× per month',
      mood: 'Happy / Celebratory',
      color: colors.amber,
      savings: '$134/yr',
    },
    {
      id: 4,
      icon: '🚇',
      title: 'Commute Browsing',
      pattern: 'Morning transit, 7–9 AM',
      category: 'Context',
      risk: 'medium',
      avgSpend: '$19',
      frequency: '4× per week',
      mood: 'Bored',
      color: colors.teal,
      savings: '$395/yr',
    },
  ];

  const transactions = [
    { id: 1, name: 'Uber Eats', amount: -34.50, time: 'Last night · 10:23 PM', mood: '😴', moodLabel: 'Tired', category: 'Food', flag: true, color: colors.rose },
    { id: 2, name: 'ASOS', amount: -67.00, time: 'Tue · 11:41 PM', mood: '😑', moodLabel: 'Bored', category: 'Shopping', flag: true, color: colors.amber },
    { id: 3, name: 'Starbucks', amount: -6.80, time: 'Wed · 8:14 AM', mood: '😤', moodLabel: 'Stressed', category: 'Food', flag: false, color: colors.teal },
    { id: 4, name: 'Spotify', amount: -9.99, time: 'Mar 18 · Recurring', mood: null, moodLabel: null, category: 'Subscription', flag: false, color: colors.primary },
    { id: 5, name: 'Nike App', amount: -89.00, time: 'Mar 17 · Payday +1d', mood: '😊', moodLabel: 'Happy', category: 'Shopping', flag: true, color: colors.amber },
    { id: 6, name: 'Amazon', amount: -22.49, time: 'Mar 15 · 9:56 PM', mood: '🥺', moodLabel: 'Lonely', category: 'Shopping', flag: true, color: '#F472B6' },
  ];

  const shields = [
    {
      id: 1,
      trigger: 'Late Night Scroll',
      icon: '🌙',
      action: 'Buy Tomorrow Rule',
      description: 'Add to cart, don\'t buy. Check back at noon tomorrow.',
      duration: 480,
      type: 'delay',
      color: '#A78BFA',
      active: false,
    },
    {
      id: 2,
      trigger: 'Post-Work Stress',
      icon: '💼',
      action: '10-Minute Walk',
      description: 'Step outside for 10 min. Craving often passes.',
      duration: 600,
      type: 'routine',
      color: colors.rose,
      active: false,
    },
    {
      id: 3,
      trigger: 'Payday Window',
      icon: '💰',
      action: '48-Hour Wait',
      description: 'Transfer 20% to savings first, then reconsider.',
      duration: 172800,
      type: 'delay',
      color: colors.amber,
      active: true,
    },
    {
      id: 4,
      trigger: 'Commute Browsing',
      icon: '🚇',
      action: 'Podcast Mode',
      description: 'Open podcast app instead. No browsing on commute.',
      duration: 0,
      type: 'replace',
      color: colors.teal,
      active: false,
    },
  ];

  const timelineData = [
    { week: 'Feb 24', emotional: 142, planned: 87, total: 229 },
    { week: 'Mar 3', emotional: 98, planned: 91, total: 189 },
    { week: 'Mar 10', emotional: 76, planned: 95, total: 171 },
    { week: 'Mar 17', emotional: 54, planned: 89, total: 143 },
  ];

  const maxBar = 229;

  const getRiskColor = (risk) => {
    if (risk === 'high') return colors.rose;
    if (risk === 'medium') return colors.amber;
    return colors.green;
  };

  function HomeScreen() {
    const [activeCheckIn, setActiveCheckIn] = useState(false);
    const [chosenMood, setChosenMood] = useState(null);
    const [step, setStep] = useState(1);

    return (
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 90 }}>
        {/* Header */}
        <div style={{ padding: '16px 20px 8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 12, color: colors.textMuted, fontWeight: 500 }}>Good evening, Sarah 👋</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: colors.text, fontFamily: "'Syne', sans-serif", lineHeight: 1.2 }}>
              Your Spending<br />
              <span style={{ color: colors.primary }}>Pulse</span>
            </div>
          </div>
          <div style={{ width: 42, height: 42, borderRadius: '50%', background: `linear-gradient(135deg, ${colors.primary}, ${colors.teal})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>
            S
          </div>
        </div>

        {/* Trigger Alert */}
        <div style={{ margin: '8px 20px', padding: '14px 16px', borderRadius: 16, background: `linear-gradient(135deg, rgba(255,107,138,0.2), rgba(167,139,250,0.2))`, border: `1px solid rgba(255,107,138,0.3)` }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
            <div style={{ fontSize: 20, marginTop: 1 }}>⚡</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: colors.rose, letterSpacing: 0.5, textTransform: 'uppercase' }}>Trigger Detected</div>
              <div style={{ fontSize: 13, color: colors.text, fontWeight: 500, marginTop: 2 }}>
                It's 9:24 PM on a Tuesday — your peak late-night scroll window.
              </div>
              <div style={{ fontSize: 12, color: colors.textMuted, marginTop: 2 }}>You've spent avg. $34 in the next 30 min on similar nights.</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
            <button
              onClick={() => { setActiveTab('shields'); }}
              style={{ flex: 1, padding: '9px 0', borderRadius: 10, background: colors.rose, border: 'none', color: '#fff', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}
            >
              Activate Shield
            </button>
            <button
              style={{ flex: 1, padding: '9px 0', borderRadius: 10, background: colors.border, border: `1px solid ${colors.borderLight}`, color: colors.textMuted, fontSize: 12, fontWeight: 600, cursor: 'pointer' }}
            >
              Dismiss
            </button>
          </div>
        </div>

        {/* Check-in card */}
        {!activeCheckIn ? (
          <div
            style={{ margin: '8px 20px', padding: '14px 16px', borderRadius: 16, background: colors.card, border: `1px solid ${colors.border}`, cursor: 'pointer' }}
            onClick={() => setActiveCheckIn(true)}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, color: colors.primary }}>MOOD CHECK-IN</div>
                <div style={{ fontSize: 14, color: colors.text, fontWeight: 500, marginTop: 2 }}>How are you feeling right now?</div>
              </div>
              <div style={{ fontSize: 28 }}>🎭</div>
            </div>
          </div>
        ) : (
          <div style={{ margin: '8px 20px', padding: '16px', borderRadius: 16, background: colors.card, border: `1px solid ${colors.primaryDim}` }}>
            {step === 1 && (
              <>
                <div style={{ fontSize: 13, fontWeight: 600, color: colors.primary, marginBottom: 10 }}>How are you feeling?</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                  {moods.map(m => (
                    <button
                      key={m.id}
                      onClick={() => { setChosenMood(m); setStep(2); }}
                      style={{
                        padding: '10px 6px', borderRadius: 12, border: `1px solid ${colors.border}`,
                        background: chosenMood?.id === m.id ? m.color + '33' : colors.surface,
                        cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                      }}
                    >
                      <span style={{ fontSize: 22 }}>{m.emoji}</span>
                      <span style={{ fontSize: 10, color: colors.textMuted, fontWeight: 500 }}>{m.label}</span>
                    </button>
                  ))}
                </div>
              </>
            )}
            {step === 2 && chosenMood && (
              <>
                <div style={{ fontSize: 13, fontWeight: 600, color: colors.primary, marginBottom: 8 }}>Got it — {chosenMood.emoji} {chosenMood.label}</div>
                <div style={{ fontSize: 12, color: colors.textMuted, marginBottom: 12 }}>Tag your last purchase?</div>
                <div style={{ display: 'flex', gap: 8 }}>
                  {['Uber Eats', 'Amazon', 'Shopping', 'Other'].map(tag => (
                    <button
                      key={tag}
                      onClick={() => setStep(3)}
                      style={{ padding: '7px 12px', borderRadius: 20, border: `1px solid ${colors.borderLight}`, background: colors.surface, color: colors.textMuted, fontSize: 11, fontWeight: 500, cursor: 'pointer' }}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </>
            )}
            {step === 3 && (
              <div style={{ textAlign: 'center', padding: '8px 0' }}>
                <div style={{ fontSize: 28, marginBottom: 6 }}>✅</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: colors.text }}>Check-in saved!</div>
                <div style={{ fontSize: 11, color: colors.textMuted, marginTop: 4 }}>Pattern updated · 12 check-ins this week</div>
                <button onClick={() => { setActiveCheckIn(false); setStep(1); setChosenMood(null); }}
                  style={{ marginTop: 10, padding: '7px 20px', borderRadius: 20, background: colors.primaryDim, border: 'none', color: colors.primary, fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
                  Done
                </button>
              </div>
            )}
          </div>
        )}

        {/* Spending Summary */}
        <div style={{ margin: '8px 20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {[
            { label: 'This Week', value: '$143', sub: '↓ 21% vs last', color: colors.green, bg: colors.greenDim },
            { label: 'Emotional Spend', value: '$54', sub: '37% of total', color: colors.amber, bg: colors.amberDim },
            { label: 'Triggers Avoided', value: '4', sub: 'Saved ~$68', color: colors.primary, bg: colors.primaryDim },
            { label: 'Streak', value: '8 days', sub: 'Personal best 🔥', color: colors.teal, bg: colors.tealDim },
          ].map(stat => (
            <div key={stat.label} style={{ padding: '14px', borderRadius: 14, background: stat.bg, border: `1px solid ${stat.color}22` }}>
              <div style={{ fontSize: 11, color: stat.color, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.4 }}>{stat.label}</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: colors.text, fontFamily: "'Syne', sans-serif", marginTop: 4 }}>{stat.value}</div>
              <div style={{ fontSize: 10, color: colors.textMuted, marginTop: 2 }}>{stat.sub}</div>
            </div>
          ))}
        </div>

        {/* Recent Transactions */}
        <div style={{ padding: '8px 20px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: colors.text }}>Recent Transactions</div>
            <div style={{ fontSize: 11, color: colors.primary, fontWeight: 600 }}>See all</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {transactions.slice(0, 4).map(tx => (
              <div key={tx.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 12, background: colors.card, border: `1px solid ${tx.flag ? tx.color + '22' : colors.border}` }}>
                {tx.flag && <div style={{ width: 3, height: 32, borderRadius: 2, background: tx.color, flexShrink: 0 }} />}
                <div style={{ width: 36, height: 36, borderRadius: 10, background: tx.color + '22', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>
                  {tx.category === 'Food' ? '🍔' : tx.category === 'Shopping' ? '🛍' : '🎵'}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: colors.text }}>{tx.name}</div>
                  <div style={{ fontSize: 10, color: colors.textMuted, marginTop: 1, display: 'flex', alignItems: 'center', gap: 4 }}>
                    {tx.mood && <span>{tx.mood} {tx.moodLabel}</span>}
                    {tx.mood && <span>·</span>}
                    <span>{tx.time}</span>
                  </div>
                </div>
                <div style={{ fontSize: 14, fontWeight: 700, color: tx.flag ? tx.color : colors.textMuted }}>{tx.amount.toFixed(2)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  function TriggersScreen() {
    const [expanded, setExpanded] = useState(null);

    return (
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 90 }}>
        <div style={{ padding: '16px 20px 8px' }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: colors.textMuted, letterSpacing: 0.5, textTransform: 'uppercase' }}>Your Patterns</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: colors.text, fontFamily: "'Syne', sans-serif", marginTop: 2 }}>Spending Triggers</div>
          <div style={{ fontSize: 12, color: colors.textMuted, marginTop: 4 }}>4 patterns detected · Updated today</div>
        </div>

        {/* Total impact */}
        <div style={{ margin: '0 20px 12px', padding: '14px 16px', borderRadius: 16, background: `linear-gradient(135deg, ${colors.primaryDim}, ${colors.tealDim})`, border: `1px solid ${colors.primary}33` }}>
          <div style={{ fontSize: 11, color: colors.primary, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.4 }}>Combined Annual Impact</div>
          <div style={{ fontSize: 26, fontWeight: 800, color: colors.text, fontFamily: "'Syne', sans-serif", marginTop: 4 }}>$1,228 / year</div>
          <div style={{ fontSize: 11, color: colors.textMuted, marginTop: 2 }}>Potential savings if you interrupt all 4 triggers</div>
        </div>

        <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          {triggers.map(trigger => (
            <div key={trigger.id}>
              <div
                onClick={() => setExpanded(expanded === trigger.id ? null : trigger.id)}
                style={{ padding: '14px', borderRadius: 14, background: colors.card, border: `1px solid ${expanded === trigger.id ? trigger.color + '44' : colors.border}`, cursor: 'pointer' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: trigger.color + '22', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>
                    {trigger.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: colors.text }}>{trigger.title}</div>
                      <div style={{ padding: '2px 7px', borderRadius: 20, background: getRiskColor(trigger.risk) + '22', fontSize: 9, fontWeight: 700, color: getRiskColor(trigger.risk), textTransform: 'uppercase', letterSpacing: 0.5 }}>
                        {trigger.risk}
                      </div>
                    </div>
                    <div style={{ fontSize: 11, color: colors.textMuted, marginTop: 2 }}>{trigger.pattern}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: trigger.color }}>{trigger.avgSpend}</div>
                    <div style={{ fontSize: 10, color: colors.textMuted }}>avg/event</div>
                  </div>
                </div>

                {expanded === trigger.id && (
                  <div style={{ marginTop: 14, paddingTop: 12, borderTop: `1px solid ${colors.border}` }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 12 }}>
                      {[
                        { label: 'Frequency', value: trigger.frequency },
                        { label: 'Typical Mood', value: trigger.mood },
                        { label: 'Annual Leak', value: trigger.savings },
                      ].map(stat => (
                        <div key={stat.label} style={{ padding: '8px', borderRadius: 10, background: colors.surface, textAlign: 'center' }}>
                          <div style={{ fontSize: 9, color: colors.textMuted, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.4 }}>{stat.label}</div>
                          <div style={{ fontSize: 12, fontWeight: 700, color: colors.text, marginTop: 3 }}>{stat.value}</div>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() => setActiveTab('shields')}
                      style={{ width: '100%', padding: '10px', borderRadius: 10, background: trigger.color, border: 'none', color: '#fff', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}
                    >
                      Set Up Trigger Shield →
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  function TimelineScreen() {
    return (
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 90 }}>
        <div style={{ padding: '16px 20px 8px' }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: colors.textMuted, letterSpacing: 0.5, textTransform: 'uppercase' }}>Private History</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: colors.text, fontFamily: "'Syne', sans-serif", marginTop: 2 }}>Emotion Timeline</div>
        </div>

        {/* Progress Summary */}
        <div style={{ margin: '0 20px 12px', padding: '16px', borderRadius: 16, background: colors.card, border: `1px solid ${colors.border}` }}>
          <div style={{ fontSize: 12, color: colors.textMuted, marginBottom: 12 }}>Weekly Emotional vs. Planned Spending</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {timelineData.map((week, i) => (
              <div key={week.week}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <div style={{ fontSize: 11, fontWeight: 500, color: colors.textMuted }}>{week.week}</div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: colors.text }}>${week.total}</div>
                </div>
                <div style={{ height: 20, borderRadius: 6, background: colors.surface, overflow: 'hidden', display: 'flex' }}>
                  <div style={{ width: `${(week.emotional / maxBar) * 100}%`, background: `linear-gradient(90deg, ${colors.rose}, ${colors.amber})`, borderRadius: '6px 0 0 6px', transition: 'width 0.8s ease' }} />
                  <div style={{ width: `${(week.planned / maxBar) * 100}%`, background: colors.teal + '88', transition: 'width 0.8s ease' }} />
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 16, marginTop: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <div style={{ width: 10, height: 10, borderRadius: 2, background: colors.rose }} />
              <div style={{ fontSize: 10, color: colors.textMuted }}>Emotional</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <div style={{ width: 10, height: 10, borderRadius: 2, background: colors.teal + '88' }} />
              <div style={{ fontSize: 10, color: colors.textMuted }}>Planned</div>
            </div>
          </div>
        </div>

        {/* Trend insight */}
        <div style={{ margin: '0 20px 12px', padding: '14px', borderRadius: 14, background: colors.greenDim, border: `1px solid ${colors.green}33` }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: colors.green, textTransform: 'uppercase', letterSpacing: 0.4 }}>4-Week Trend</div>
          <div style={{ fontSize: 15, fontWeight: 700, color: colors.text, marginTop: 4 }}>Emotional spending ↓ 62%</div>
          <div style={{ fontSize: 11, color: colors.textMuted, marginTop: 3 }}>From $142 down to $54 this week. Your shields are working.</div>
        </div>

        {/* Mood breakdown */}
        <div style={{ padding: '0 20px', marginBottom: 12 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: colors.text, marginBottom: 10 }}>Mood Breakdown — March</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {[
              { mood: '😤 Stressed', amount: 124, pct: 0.38, color: colors.rose },
              { mood: '😑 Bored', amount: 89, pct: 0.27, color: colors.amber },
              { mood: '😴 Tired', amount: 68, pct: 0.21, color: '#A78BFA' },
              { mood: '🥺 Lonely', amount: 46, pct: 0.14, color: '#F472B6' },
            ].map(item => (
              <div key={item.mood} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ fontSize: 11, color: colors.text, fontWeight: 500, width: 100, flexShrink: 0 }}>{item.mood}</div>
                <div style={{ flex: 1, height: 8, borderRadius: 4, background: colors.surface, overflow: 'hidden' }}>
                  <div style={{ width: `${item.pct * 100}%`, height: '100%', background: item.color, borderRadius: 4, transition: 'width 1s ease' }} />
                </div>
                <div style={{ fontSize: 11, fontWeight: 700, color: item.color, width: 36, textAlign: 'right' }}>${item.amount}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Life events */}
        <div style={{ padding: '0 20px' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: colors.text, marginBottom: 10 }}>Life Event Tags</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {[
              { date: 'Mar 17', event: 'Payday', impact: '+$89 impulse', color: colors.amber, icon: '💰' },
              { date: 'Mar 14', event: 'Late deliverable at work', impact: '+$52 stress spend', color: colors.rose, icon: '😤' },
              { date: 'Mar 10', event: 'Used "Buy Tomorrow" rule', impact: '-$34 saved', color: colors.green, icon: '🛡' },
              { date: 'Mar 5', event: 'Quiet weekend', impact: '-$61 vs prior week', color: colors.teal, icon: '🌿' },
            ].map(ev => (
              <div key={ev.date} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 12, background: colors.card, border: `1px solid ${colors.border}` }}>
                <div style={{ fontSize: 18 }}>{ev.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: colors.text }}>{ev.event}</div>
                  <div style={{ fontSize: 10, color: colors.textMuted, marginTop: 1 }}>{ev.date}</div>
                </div>
                <div style={{ fontSize: 11, fontWeight: 700, color: ev.color }}>{ev.impact}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  function ShieldsScreen() {
    const [activeShieldId, setActiveShieldId] = useState(3);
    const [countdown, setCountdown] = useState(null);
    const [countdownVal, setCountdownVal] = useState(600);

    useEffect(() => {
      if (countdown) {
        const t = setInterval(() => setCountdownVal(v => v > 0 ? v - 1 : 0), 1000);
        return () => clearInterval(t);
      }
    }, [countdown]);

    const fmt = (s) => `${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`;

    return (
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 90 }}>
        <div style={{ padding: '16px 20px 8px' }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: colors.textMuted, letterSpacing: 0.5, textTransform: 'uppercase' }}>Behavioral Guardrails</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: colors.text, fontFamily: "'Syne', sans-serif", marginTop: 2 }}>Trigger Shields</div>
          <div style={{ fontSize: 12, color: colors.textMuted, marginTop: 4 }}>Replace impulse with intention</div>
        </div>

        {/* Active shield spotlight */}
        {countdown && (
          <div style={{ margin: '0 20px 12px', padding: '20px', borderRadius: 18, background: `linear-gradient(135deg, ${colors.rose}33, ${colors.primary}33)`, border: `1px solid ${colors.rose}55`, textAlign: 'center' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: colors.rose, textTransform: 'uppercase', letterSpacing: 0.5 }}>🛡 Shield Active</div>
            <div style={{ fontSize: 42, fontWeight: 800, color: colors.text, fontFamily: "'Syne', sans-serif", margin: '8px 0' }}>{fmt(countdownVal)}</div>
            <div style={{ fontSize: 12, color: colors.textMuted }}>Post-Work stress shield · Walk mode</div>
            <button
              onClick={() => setCountdown(null)}
              style={{ marginTop: 12, padding: '8px 24px', borderRadius: 20, background: 'rgba(255,255,255,0.1)', border: `1px solid ${colors.borderLight}`, color: colors.textMuted, fontSize: 12, fontWeight: 600, cursor: 'pointer' }}
            >
              Cancel Shield
            </button>
          </div>
        )}

        {/* Shield cards */}
        <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {shields.map(shield => (
            <div key={shield.id} style={{ padding: '16px', borderRadius: 16, background: colors.card, border: `1px solid ${shield.id === activeShieldId ? shield.color + '44' : colors.border}` }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: shield.color + '22', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>
                  {shield.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: colors.text }}>{shield.action}</div>
                    {(shield.active || shield.id === activeShieldId) && (
                      <div style={{ padding: '2px 8px', borderRadius: 20, background: colors.green + '22', fontSize: 9, fontWeight: 700, color: colors.green, textTransform: 'uppercase' }}>Active</div>
                    )}
                  </div>
                  <div style={{ fontSize: 11, color: colors.textMuted, marginBottom: 2 }}>Trigger: {shield.trigger}</div>
                  <div style={{ fontSize: 11, color: colors.text, opacity: 0.7, marginBottom: 10 }}>{shield.description}</div>

                  <div style={{ display: 'flex', gap: 6 }}>
                    <div style={{ padding: '4px 10px', borderRadius: 20, background: colors.surface, fontSize: 10, color: colors.textMuted, fontWeight: 500 }}>
                      {shield.type === 'delay' ? '⏰ Delay' : shield.type === 'routine' ? '🏃 Routine' : '🔄 Replace'}
                    </div>
                    {shield.duration > 0 && (
                      <div style={{ padding: '4px 10px', borderRadius: 20, background: colors.surface, fontSize: 10, color: colors.textMuted, fontWeight: 500 }}>
                        {shield.duration < 3600 ? `${shield.duration / 60}m cooldown` : `${Math.round(shield.duration/3600)}h wait`}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                {shield.type === 'routine' && !countdown ? (
                  <button
                    onClick={() => { setCountdown(true); setCountdownVal(shield.duration); setActiveShieldId(shield.id); }}
                    style={{ flex: 1, padding: '9px', borderRadius: 10, background: shield.color, border: 'none', color: '#fff', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}
                  >
                    Start Timer
                  </button>
                ) : (
                  <button
                    onClick={() => setActiveShieldId(shield.id === activeShieldId ? null : shield.id)}
                    style={{ flex: 1, padding: '9px', borderRadius: 10, background: shield.id === activeShieldId ? shield.color + '22' : colors.surface, border: `1px solid ${shield.id === activeShieldId ? shield.color : colors.border}`, color: shield.id === activeShieldId ? shield.color : colors.textMuted, fontSize: 12, fontWeight: 600, cursor: 'pointer' }}
                  >
                    {shield.id === activeShieldId ? 'Enabled ✓' : 'Enable'}
                  </button>
                )}
                <button
                  style={{ padding: '9px 14px', borderRadius: 10, background: colors.surface, border: `1px solid ${colors.border}`, color: colors.textMuted, fontSize: 12, fontWeight: 600, cursor: 'pointer' }}
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add shield */}
        <div style={{ margin: '10px 20px' }}>
          <button
            style={{ width: '100%', padding: '13px', borderRadius: 14, background: 'transparent', border: `1.5px dashed ${colors.borderLight}`, color: colors.textMuted, fontSize: 13, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
          >
            + Add Custom Shield
          </button>
        </div>
      </div>
    );
  }

  function GoalsScreen() {
    const [claimedGoal, setClaimedGoal] = useState(null);

    const goals = [
      { id: 1, title: 'Break the Late-Night Loop', trigger: 'Late Night Scroll', progress: 72, target: 4, current: 3, saved: 68, reward: '$85 savings', color: '#A78BFA', icon: '🌙', weeks: 3 },
      { id: 2, title: 'Stress-Less Spender', trigger: 'Post-Work Stress', progress: 45, target: 4, current: 2, saved: 42, reward: '$120 savings', color: colors.rose, icon: '💼', weeks: 2 },
      { id: 3, title: 'Payday Defender', trigger: 'Payday Window', progress: 100, target: 2, current: 2, saved: 134, reward: 'Claim Reward 🎉', color: colors.amber, icon: '💰', weeks: 4, complete: true },
    ];

    return (
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 90 }}>
        <div style={{ padding: '16px 20px 8px' }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: colors.textMuted, letterSpacing: 0.5, textTransform: 'uppercase' }}>Progress</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: colors.text, fontFamily: "'Syne', sans-serif", marginTop: 2 }}>Saving Goals</div>
        </div>

        {/* Total saved */}
        <div style={{ margin: '0 20px 12px', padding: '20px', borderRadius: 18, background: `linear-gradient(135deg, ${colors.primary}33, ${colors.teal}22)`, border: `1px solid ${colors.primary}33`, textAlign: 'center' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: colors.primary, textTransform: 'uppercase', letterSpacing: 0.5 }}>Total Saved via Shields</div>
          <div style={{ fontSize: 38, fontWeight: 800, color: colors.text, fontFamily: "'Syne', sans-serif", margin: '6px 0 2px' }}>$244</div>
          <div style={{ fontSize: 11, color: colors.textMuted }}>Across 3 active goals · This month</div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 12 }}>
            {[{ label: 'Goals', val: '3' }, { label: 'Shields Used', val: '9×' }, { label: 'Streak', val: '8d 🔥' }].map(s => (
              <div key={s.label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 16, fontWeight: 800, color: colors.text, fontFamily: "'Syne', sans-serif" }}>{s.val}</div>
                <div style={{ fontSize: 9, color: colors.textMuted, textTransform: 'uppercase', letterSpacing: 0.4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {goals.map(goal => (
            <div key={goal.id} style={{ padding: '16px', borderRadius: 16, background: colors.card, border: `1px solid ${goal.complete ? goal.color + '66' : colors.border}` }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 12 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: goal.color + '22', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>
                  {goal.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: colors.text }}>{goal.title}</div>
                  <div style={{ fontSize: 11, color: colors.textMuted, marginTop: 1 }}>Interrupt {goal.trigger} · {goal.weeks} weeks</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 16, fontWeight: 800, color: goal.color }}>${goal.saved}</div>
                  <div style={{ fontSize: 9, color: colors.textMuted }}>saved</div>
                </div>
              </div>

              {/* Progress bar */}
              <div style={{ marginBottom: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                  <div style={{ fontSize: 11, color: colors.textMuted }}>{goal.current} of {goal.target} triggers interrupted</div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: goal.color }}>{goal.progress}%</div>
                </div>
                <div style={{ height: 8, borderRadius: 4, background: colors.surface, overflow: 'hidden' }}>
                  <div style={{ width: `${goal.progress}%`, height: '100%', background: `linear-gradient(90deg, ${goal.color}, ${goal.color}BB)`, borderRadius: 4, transition: 'width 1s ease' }} />
                </div>
              </div>

              {goal.complete ? (
                <button
                  onClick={() => setClaimedGoal(goal.id)}
                  style={{
                    width: '100%', padding: '10px', borderRadius: 10,
                    background: claimedGoal === goal.id ? colors.greenDim : `linear-gradient(90deg, ${goal.color}, ${goal.color}BB)`,
                    border: claimedGoal === goal.id ? `1px solid ${colors.green}` : 'none',
                    color: claimedGoal === goal.id ? colors.green : '#fff', fontSize: 12, fontWeight: 700, cursor: 'pointer'
                  }}
                >
                  {claimedGoal === goal.id ? '✓ Reward Claimed!' : goal.reward}
                </button>
              ) : (
                <div style={{ fontSize: 11, color: colors.textMuted, padding: '8px 10px', borderRadius: 10, background: colors.surface, textAlign: 'center' }}>
                  {goal.target - goal.current} more interruptions to unlock: <span style={{ color: goal.color, fontWeight: 700 }}>{goal.reward}</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Tips */}
        <div style={{ margin: '10px 20px', padding: '14px', borderRadius: 14, background: colors.card, border: `1px solid ${colors.border}` }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: colors.primary, textTransform: 'uppercase', letterSpacing: 0.4, marginBottom: 8 }}>Coaching Tip</div>
          <div style={{ fontSize: 12, color: colors.text, lineHeight: 1.6 }}>
            "Interrupting just one trigger per week adds up fast. At your current pace, you're on track to save <span style={{ color: colors.amber, fontWeight: 700 }}>$1,228 this year</span> — enough for a real vacation."
          </div>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'home', label: 'Home', icon: 'Home' },
    { id: 'triggers', label: 'Triggers', icon: 'Zap' },
    { id: 'timeline', label: 'Timeline', icon: 'BarChart2' },
    { id: 'shields', label: 'Shields', icon: 'Shield' },
    { id: 'goals', label: 'Goals', icon: 'Target' },
  ];

  const renderScreen = () => {
    if (activeTab === 'home') return <HomeScreen />;
    if (activeTab === 'triggers') return <TriggersScreen />;
    if (activeTab === 'timeline') return <TimelineScreen />;
    if (activeTab === 'shields') return <ShieldsScreen />;
    if (activeTab === 'goals') return <GoalsScreen />;
    return <HomeScreen />;
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100vw', minHeight: '100vh', background: '#070810' }}>
      {/* Phone frame */}
      <div style={{
        width: 375, height: 812, borderRadius: 50, overflow: 'hidden',
        background: colors.bg,
        boxShadow: '0 30px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.08), inset 0 0 0 1px rgba(255,255,255,0.04)',
        display: 'flex', flexDirection: 'column', position: 'relative',
      }}>
        {/* Status bar */}
        <div style={{ height: 44, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px 0 28px', flexShrink: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: colors.text }}>9:24</div>
          {/* Dynamic island */}
          <div style={{ position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)', width: 120, height: 34, background: '#000', borderRadius: 20 }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            {/* Signal */}
            <div style={{ display: 'flex', gap: 1.5, alignItems: 'flex-end', height: 12 }}>
              {[4,6,8,10,12].map((h,i) => (
                <div key={i} style={{ width: 2.5, height: h, borderRadius: 1, background: i < 4 ? colors.text : colors.textDim }} />
              ))}
            </div>
            {/* Wifi */}
            <div style={{ fontSize: 10, color: colors.text }}>
              {React.createElement(window.lucide.Wifi, { size: 12, color: colors.text })}
            </div>
            {/* Battery */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <div style={{ width: 22, height: 11, borderRadius: 3, border: `1.5px solid ${colors.text}`, position: 'relative', display: 'flex', alignItems: 'center', padding: '1.5px' }}>
                <div style={{ width: '78%', height: '100%', background: colors.text, borderRadius: 1.5 }} />
              </div>
              <div style={{ width: 2, height: 5, borderRadius: 1, background: colors.text }} />
            </div>
          </div>
        </div>

        {/* Screen content */}
        <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          {renderScreen()}
        </div>

        {/* Bottom nav */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: 82,
          background: colors.surface,
          borderTop: `1px solid ${colors.border}`,
          display: 'flex', alignItems: 'flex-start', paddingTop: 8,
          backdropFilter: 'blur(20px)',
        }}>
          {tabs.map(tab => {
            const isActive = activeTab === tab.id;
            const IconComp = window.lucide[tab.icon];
            return (
              <button
                key={tab.id}
                onClick={() => { setPressedTab(tab.id); setActiveTab(tab.id); setTimeout(() => setPressedTab(null), 200); }}
                style={{
                  flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
                  background: 'transparent', border: 'none', cursor: 'pointer',
                  transform: pressedTab === tab.id ? 'scale(0.88)' : 'scale(1)',
                  transition: 'transform 0.15s ease',
                  padding: '4px 0',
                }}
              >
                {isActive && (
                  <div style={{ position: 'absolute', width: 36, height: 36, borderRadius: '50%', background: colors.primaryDim, marginTop: -2 }} />
                )}
                <div style={{ position: 'relative' }}>
                  {IconComp && React.createElement(IconComp, { size: 22, color: isActive ? colors.primary : colors.textDim, strokeWidth: isActive ? 2.5 : 1.8 })}
                </div>
                <span style={{ fontSize: 9, fontWeight: isActive ? 700 : 500, color: isActive ? colors.primary : colors.textDim, letterSpacing: 0.2 }}>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
