const { useState, useEffect, useRef } = React;

// Inject Google Font
(function() {
  const s = document.createElement('style');
  s.textContent = "@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&display=swap');";
  document.head.appendChild(s);
})();

const themes = {
  light: {
    bg: '#F5F3FF',
    surface: '#FFFFFF',
    surfaceAlt: '#EDE9FE',
    surfaceHover: '#F9F7FF',
    primary: '#7C3AED',
    primaryDark: '#5B21B6',
    primaryLight: '#DDD6FE',
    secondary: '#06B6D4',
    secondaryLight: '#CFFAFE',
    accent: '#F59E0B',
    accentLight: '#FEF3C7',
    text: '#1E1B4B',
    textSec: '#6366F1',
    textMuted: '#9CA3AF',
    border: '#EDE9FE',
    borderStrong: '#C4B5FD',
    success: '#10B981',
    successLight: '#D1FAE5',
    danger: '#EF4444',
    dangerLight: '#FEE2E2',
    warning: '#F59E0B',
    warningLight: '#FEF3C7',
    card: '#FFFFFF',
    navBg: '#FFFFFF',
    navBorder: '#F0EEFF',
    statusText: '#1E1B4B',
    shadow: '0 4px 24px rgba(124,58,237,0.12)',
    shadowSm: '0 2px 8px rgba(124,58,237,0.08)',
    gradient: 'linear-gradient(135deg, #7C3AED 0%, #4F46E5 60%, #2563EB 100%)',
    gradientSoft: 'linear-gradient(135deg, #EDE9FE 0%, #DBEAFE 100%)',
    pillBg: '#EDE9FE',
  },
  dark: {
    bg: '#0D0B1A',
    surface: '#1A1730',
    surfaceAlt: '#221E3B',
    surfaceHover: '#201C38',
    primary: '#A78BFA',
    primaryDark: '#7C3AED',
    primaryLight: '#2D2460',
    secondary: '#22D3EE',
    secondaryLight: '#0C4A6E',
    accent: '#FBBF24',
    accentLight: '#451A03',
    text: '#F0EEFF',
    textSec: '#A78BFA',
    textMuted: '#6B6890',
    border: '#2A2448',
    borderStrong: '#4C3F7A',
    success: '#34D399',
    successLight: '#022C22',
    danger: '#F87171',
    dangerLight: '#450A0A',
    warning: '#FBBF24',
    warningLight: '#451A03',
    card: '#1A1730',
    navBg: '#120F24',
    navBorder: '#1E1A35',
    statusText: '#E8E4FF',
    shadow: '0 4px 24px rgba(0,0,0,0.4)',
    shadowSm: '0 2px 8px rgba(0,0,0,0.3)',
    gradient: 'linear-gradient(135deg, #7C3AED 0%, #4338CA 60%, #1D4ED8 100%)',
    gradientSoft: 'linear-gradient(135deg, #1E1A3C 0%, #1E2A4A 100%)',
    pillBg: '#221E3B',
  }
};

// ── Helpers ──────────────────────────────────────────────────────────────────

function StatusBar({ t }) {
  const Icon = window.lucide;
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 22px 4px', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
      <span style={{ fontSize: 13, fontWeight: 700, color: t.statusText }}>9:41</span>
      <div style={{ width: 120, height: 30, background: '#000', borderRadius: 20, position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: 0 }} />
      <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
        <svg width="15" height="11" viewBox="0 0 15 11" fill="none">
          <path d="M7.5 2.2C5.4 2.2 3.5 3 2.1 4.4L0.6 2.9C2.5 1.1 5 0 7.5 0s5 1.1 6.9 2.9L12.9 4.4C11.5 3 9.6 2.2 7.5 2.2z" fill={t.statusText}/>
          <path d="M7.5 5.8c-1.1 0-2.1.4-2.8 1.1L3.1 5.3C4.2 4.2 5.8 3.5 7.5 3.5s3.3.7 4.4 1.8L10.3 6.9C9.6 6.2 8.6 5.8 7.5 5.8z" fill={t.statusText}/>
          <circle cx="7.5" cy="10" r="1.5" fill={t.statusText}/>
        </svg>
        <div style={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <div style={{ width: 21, height: 10, border: `1.5px solid ${t.statusText}`, borderRadius: 2.5, padding: 1.5, display: 'flex' }}>
            <div style={{ width: '78%', height: '100%', background: t.statusText, borderRadius: 1 }} />
          </div>
          <div style={{ width: 2, height: 5, background: t.statusText, borderRadius: 1 }} />
        </div>
      </div>
    </div>
  );
}

function Card({ children, style = {}, t, onClick = null, pressed = false }) {
  return (
    <div onClick={onClick} style={{
      background: t.card,
      borderRadius: 20,
      padding: '18px 18px',
      boxShadow: t.shadow,
      border: `1px solid ${t.border}`,
      cursor: onClick ? 'pointer' : 'default',
      transform: pressed ? 'scale(0.97)' : 'scale(1)',
      transition: 'transform 0.15s ease',
      ...style
    }}>
      {children}
    </div>
  );
}

function Pill({ label, color, bg }) {
  return (
    <span style={{
      background: bg,
      color: color,
      fontSize: 11,
      fontWeight: 700,
      padding: '3px 10px',
      borderRadius: 20,
      letterSpacing: 0.3,
      textTransform: 'uppercase',
    }}>{label}</span>
  );
}

function ProgressBar({ value, color, bg, height = 8 }) {
  return (
    <div style={{ background: bg, borderRadius: 999, height, overflow: 'hidden' }}>
      <div style={{ width: `${Math.min(value, 100)}%`, height: '100%', background: color, borderRadius: 999, transition: 'width 0.6s ease' }} />
    </div>
  );
}

// ── Screen: Home ─────────────────────────────────────────────────────────────

function HomeScreen({ t, setActiveTab }) {
  const [pressedId, setPressedId] = useState(null);
  const [nudgeDismissed, setNudgeDismissed] = useState(false);
  const [showSwitch, setShowSwitch] = useState(false);

  const recentTxns = [
    { id: 1, name: 'Blue Bottle Coffee', cat: 'Dining', amount: 6.50, time: '8:14 AM', icon: '☕', color: '#7C3AED', catColor: '#7C3AED', catBg: '#EDE9FE' },
    { id: 2, name: 'Uber Pool', cat: 'Transport', amount: 9.20, time: '7:52 AM', icon: '🚗', color: '#06B6D4', catColor: '#06B6D4', catBg: '#CFFAFE' },
    { id: 3, name: 'Spotify Premium', cat: 'Subscriptions', amount: 9.99, time: 'Yesterday', icon: '🎵', color: '#10B981', catColor: '#10B981', catBg: '#D1FAE5' },
    { id: 4, name: 'Trader Joe\'s', cat: 'Groceries', amount: 34.20, time: 'Yesterday', icon: '🛒', color: '#F59E0B', catColor: '#F59E0B', catBg: '#FEF3C7' },
  ];

  const spentToday = 15.70;
  const dailyBudget = 40;
  const pct = Math.round((spentToday / dailyBudget) * 100);

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '0 16px 16px', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
        <div>
          <p style={{ fontSize: 13, color: t.textMuted, margin: 0, fontWeight: 500 }}>Good morning,</p>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: t.text, margin: '2px 0 0' }}>Alex 👋</h2>
        </div>
        <div style={{ width: 42, height: 42, borderRadius: 14, background: t.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: t.shadowSm }}>
          <span style={{ fontSize: 18 }}>💜</span>
        </div>
      </div>

      {/* Daily Budget Card */}
      <div style={{ background: t.gradient, borderRadius: 24, padding: '22px 22px 18px', marginBottom: 16, boxShadow: '0 8px 32px rgba(124,58,237,0.35)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -20, right: -20, width: 120, height: 120, background: 'rgba(255,255,255,0.06)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', bottom: -30, right: 30, width: 80, height: 80, background: 'rgba(255,255,255,0.04)', borderRadius: '50%' }} />
        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', margin: 0, fontWeight: 600, letterSpacing: 0.5, textTransform: 'uppercase' }}>Today's Spending</p>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, margin: '8px 0 16px' }}>
          <span style={{ fontSize: 38, fontWeight: 800, color: '#FFF' }}>${spentToday.toFixed(2)}</span>
          <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', fontWeight: 500 }}>/ ${dailyBudget} budget</span>
        </div>
        <ProgressBar value={pct} color="rgba(255,255,255,0.9)" bg="rgba(255,255,255,0.2)" height={6} />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)', fontWeight: 500 }}>{pct}% of daily budget</span>
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)', fontWeight: 600 }}>${(dailyBudget - spentToday).toFixed(2)} left</span>
        </div>
      </div>

      {/* Active Nudge */}
      {!nudgeDismissed && (
        <div style={{ background: t.warningLight, border: `1.5px solid ${t.accent}`, borderRadius: 20, padding: '16px 16px', marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', flex: 1 }}>
              <div style={{ fontSize: 22 }}>🍜</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: t.text }}>Lunch nudge detected</span>
                  <Pill label="Now" color={t.accent} bg={t.accentLight} />
                </div>
                <p style={{ fontSize: 12, color: t.text, margin: 0, lineHeight: 1.5, opacity: 0.8 }}>
                  You're near Chipotle. $15 here = <strong>3 breakfasts</strong> or <strong>5% of Trip Fund</strong>
                </p>
              </div>
            </div>
            <button onClick={() => setNudgeDismissed(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: t.textMuted, fontSize: 18, padding: '0 0 0 8px', lineHeight: 1 }}>×</button>
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
            <button onClick={() => setActiveTab('intercept')} style={{
              flex: 1, padding: '9px 0', background: t.accent, color: '#FFF', fontFamily: 'Plus Jakarta Sans, sans-serif',
              fontWeight: 700, fontSize: 12, border: 'none', borderRadius: 12, cursor: 'pointer'
            }}>See Switch Options</button>
            <button onClick={() => setNudgeDismissed(true)} style={{
              flex: 1, padding: '9px 0', background: 'rgba(0,0,0,0.06)', color: t.text, fontFamily: 'Plus Jakarta Sans, sans-serif',
              fontWeight: 600, fontSize: 12, border: 'none', borderRadius: 12, cursor: 'pointer'
            }}>Dismiss</button>
          </div>
        </div>
      )}

      {/* Goal Snapshot */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
        {[
          { label: 'Trip Fund', pct: 42, color: t.primary, bg: t.primaryLight, emoji: '✈️', amount: '$840' },
          { label: 'Emergency', pct: 68, color: t.success, bg: t.successLight, emoji: '🛡️', amount: '$3,400' },
        ].map(g => (
          <div key={g.label} style={{ flex: 1, background: t.card, borderRadius: 18, padding: '14px 14px', boxShadow: t.shadowSm, border: `1px solid ${t.border}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <span style={{ fontSize: 16 }}>{g.emoji}</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: g.color }}>{g.pct}%</span>
            </div>
            <p style={{ fontSize: 12, fontWeight: 700, color: t.text, margin: '0 0 2px' }}>{g.label}</p>
            <p style={{ fontSize: 11, color: t.textMuted, margin: '0 0 8px', fontWeight: 500 }}>{g.amount} saved</p>
            <ProgressBar value={g.pct} color={g.color} bg={g.bg} height={5} />
          </div>
        ))}
      </div>

      {/* Recent Transactions */}
      <div style={{ marginBottom: 8 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <h3 style={{ fontSize: 15, fontWeight: 800, color: t.text, margin: 0 }}>Recent Activity</h3>
          <span style={{ fontSize: 12, color: t.primary, fontWeight: 600, cursor: 'pointer' }}>See all</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {recentTxns.map(tx => (
            <div key={tx.id} style={{ display: 'flex', alignItems: 'center', background: t.card, borderRadius: 16, padding: '12px 14px', boxShadow: t.shadowSm, border: `1px solid ${t.border}` }}>
              <div style={{ width: 40, height: 40, borderRadius: 13, background: tx.catBg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, marginRight: 12 }}>
                {tx.icon}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: t.text, margin: 0 }}>{tx.name}</p>
                <p style={{ fontSize: 11, color: t.textMuted, margin: '1px 0 0', fontWeight: 500 }}>{tx.time}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: 14, fontWeight: 700, color: t.text, margin: 0 }}>-${tx.amount.toFixed(2)}</p>
                <span style={{ fontSize: 10, color: tx.catColor, fontWeight: 700, background: tx.catBg, padding: '2px 7px', borderRadius: 20 }}>{tx.cat}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Screen: Intercept ─────────────────────────────────────────────────────────

function InterceptScreen({ t }) {
  const [selected, setSelected] = useState(null);
  const [confirmed, setConfirmed] = useState(false);
  const [amount, setAmount] = useState(22);

  const purchase = { name: 'Takeout Lunch', place: 'Chipotle Bowl + Drink', emoji: '🌯', amount };

  const switches = [
    {
      id: 'delay',
      icon: '⏰',
      label: 'Delay 48h',
      desc: 'Check if you still want it on Tuesday',
      impact: '+$22 to savings',
      color: t.primary,
      bg: t.primaryLight,
    },
    {
      id: 'downsize',
      icon: '🥗',
      label: 'Downsize it',
      desc: 'Get just the burrito bowl ($12) — save $10',
      impact: '$10 → Trip Fund',
      color: t.success,
      bg: t.successLight,
    },
    {
      id: 'redirect',
      icon: '✈️',
      label: 'Redirect to Goal',
      desc: 'Skip it, push full $22 to Trip Fund',
      impact: '+7% trip progress',
      color: '#7C3AED',
      bg: '#EDE9FE',
    },
    {
      id: 'cook',
      icon: '🍳',
      label: 'Cook Instead',
      desc: 'You have groceries — $22 saves 3 breakfasts',
      impact: 'Covers 3 meals',
      color: t.accent,
      bg: t.accentLight,
    },
  ];

  const equivalents = [
    { label: '2 days of breakfast', emoji: '🥐' },
    { label: '2 Uber Pool rides', emoji: '🚗' },
    { label: '7% of Trip Fund', emoji: '✈️' },
    { label: '2 Spotify months', emoji: '🎵' },
  ];

  if (confirmed) {
    const sw = switches.find(s => s.id === selected);
    return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 24px', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
        <div style={{ fontSize: 64, marginBottom: 16 }}>🎉</div>
        <h2 style={{ fontSize: 24, fontWeight: 800, color: t.text, textAlign: 'center', margin: '0 0 8px' }}>
          Smart Switch!
        </h2>
        <p style={{ fontSize: 14, color: t.textMuted, textAlign: 'center', margin: '0 0 24px', lineHeight: 1.6 }}>
          You chose <strong style={{ color: t.primary }}>{sw?.label}</strong>.<br />
          This decision was logged to your journal.
        </p>
        <div style={{ background: t.successLight, border: `1.5px solid ${t.success}`, borderRadius: 20, padding: '16px 20px', width: '100%', textAlign: 'center', marginBottom: 24 }}>
          <p style={{ fontSize: 13, color: t.success, fontWeight: 700, margin: 0 }}>{sw?.impact} ✓</p>
        </div>
        <div style={{ display: 'flex', gap: 8, width: '100%' }}>
          <button onClick={() => { setConfirmed(false); setSelected(null); }} style={{
            flex: 1, padding: '14px 0', background: t.primaryLight, color: t.primary,
            fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700, fontSize: 14,
            border: 'none', borderRadius: 16, cursor: 'pointer'
          }}>New Decision</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '0 16px 16px', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
      {/* Header */}
      <div style={{ marginBottom: 16 }}>
        <p style={{ fontSize: 12, color: t.textMuted, margin: '0 0 4px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>Spending Intercept</p>
        <h2 style={{ fontSize: 20, fontWeight: 800, color: t.text, margin: 0 }}>Before you spend...</h2>
      </div>

      {/* Purchase Card */}
      <div style={{ background: t.gradient, borderRadius: 22, padding: '20px 20px', marginBottom: 16, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -15, right: -15, width: 100, height: 100, background: 'rgba(255,255,255,0.07)', borderRadius: '50%' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 52, height: 52, borderRadius: 16, background: 'rgba(255,255,255,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>
            {purchase.emoji}
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)', margin: 0, fontWeight: 500 }}>{purchase.place}</p>
            <p style={{ fontSize: 18, fontWeight: 800, color: '#FFF', margin: '2px 0 0' }}>{purchase.name}</p>
          </div>
          <span style={{ fontSize: 26, fontWeight: 800, color: '#FFF' }}>${purchase.amount}</span>
        </div>
      </div>

      {/* Equivalent Value */}
      <div style={{ marginBottom: 16 }}>
        <p style={{ fontSize: 12, color: t.textMuted, margin: '0 0 8px', fontWeight: 600 }}>$22 = what else?</p>
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
          {equivalents.map((e, i) => (
            <div key={i} style={{ minWidth: 90, background: t.card, border: `1px solid ${t.border}`, borderRadius: 14, padding: '10px 10px', textAlign: 'center', boxShadow: t.shadowSm, flexShrink: 0 }}>
              <div style={{ fontSize: 20, marginBottom: 4 }}>{e.emoji}</div>
              <p style={{ fontSize: 10, color: t.text, margin: 0, fontWeight: 600, lineHeight: 1.3 }}>{e.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Switch Options */}
      <div style={{ marginBottom: 16 }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: t.text, margin: '0 0 10px' }}>Choose your switch:</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {switches.map(sw => (
            <div key={sw.id} onClick={() => setSelected(sw.id)} style={{
              background: selected === sw.id ? sw.bg : t.card,
              border: `1.5px solid ${selected === sw.id ? sw.color : t.border}`,
              borderRadius: 18, padding: '14px 14px', display: 'flex', alignItems: 'center', gap: 12,
              cursor: 'pointer', transition: 'all 0.2s ease', boxShadow: selected === sw.id ? `0 4px 16px ${sw.color}30` : t.shadowSm,
            }}>
              <div style={{ width: 40, height: 40, borderRadius: 13, background: sw.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>
                {sw.icon}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: sw.color, margin: 0 }}>{sw.label}</p>
                <p style={{ fontSize: 11, color: t.textMuted, margin: '2px 0 0', fontWeight: 500 }}>{sw.desc}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: 11, color: sw.color, fontWeight: 700, margin: 0 }}>{sw.impact}</p>
                {selected === sw.id && (
                  <div style={{ width: 18, height: 18, borderRadius: '50%', background: sw.color, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 4, marginLeft: 'auto' }}>
                    <span style={{ fontSize: 10, color: '#FFF' }}>✓</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Confirm Button */}
      <button
        onClick={() => selected && setConfirmed(true)}
        style={{
          width: '100%', padding: '15px 0',
          background: selected ? t.gradient : t.border,
          color: selected ? '#FFF' : t.textMuted,
          fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700, fontSize: 15,
          border: 'none', borderRadius: 18, cursor: selected ? 'pointer' : 'not-allowed',
          transition: 'all 0.2s ease', boxShadow: selected ? '0 6px 20px rgba(124,58,237,0.35)' : 'none',
        }}
      >
        {selected ? 'Confirm My Switch ✓' : 'Select an option above'}
      </button>

      <button style={{
        width: '100%', marginTop: 8, padding: '12px 0',
        background: 'none', color: t.textMuted, fontFamily: 'Plus Jakarta Sans, sans-serif',
        fontWeight: 600, fontSize: 13, border: 'none', cursor: 'pointer',
      }}>
        Go ahead with purchase anyway
      </button>
    </div>
  );
}

// ── Screen: Goals ─────────────────────────────────────────────────────────────

function GoalsScreen({ t }) {
  const [activeGoalId, setActiveGoalId] = useState(null);

  const goals = [
    { id: 1, name: 'Japan Trip', emoji: '✈️', target: 2000, saved: 840, color: t.primary, bg: t.primaryLight, monthly: 180, daysLeft: 92, lastBoost: '+$22 last Thursday' },
    { id: 2, name: 'Emergency Fund', emoji: '🛡️', target: 5000, saved: 3400, color: t.success, bg: t.successLight, monthly: 220, daysLeft: 136, lastBoost: '+$30 Monday' },
    { id: 3, name: 'New MacBook', emoji: '💻', target: 1500, saved: 275, color: t.secondary, bg: t.secondaryLight, monthly: 120, daysLeft: 210, lastBoost: '+$15 last week' },
    { id: 4, name: 'Car Insurance', emoji: '🚗', target: 800, saved: 600, color: t.accent, bg: t.accentLight, monthly: 100, daysLeft: 45, lastBoost: '+$20 yesterday' },
  ];

  const totalSaved = goals.reduce((sum, g) => sum + g.saved, 0);
  const totalTarget = goals.reduce((sum, g) => sum + g.target, 0);

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '0 16px 16px', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
      <div style={{ marginBottom: 16 }}>
        <p style={{ fontSize: 12, color: t.textMuted, margin: '0 0 2px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>Your Goals</p>
        <h2 style={{ fontSize: 20, fontWeight: 800, color: t.text, margin: 0 }}>Saving Progress</h2>
      </div>

      {/* Summary */}
      <div style={{ background: t.gradientSoft, border: `1px solid ${t.border}`, borderRadius: 22, padding: '18px 20px', marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
          <div>
            <p style={{ fontSize: 12, color: t.textMuted, margin: 0, fontWeight: 500 }}>Total saved across all goals</p>
            <p style={{ fontSize: 28, fontWeight: 800, color: t.text, margin: '4px 0 0' }}>${totalSaved.toLocaleString()}</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: 12, color: t.textMuted, margin: 0, fontWeight: 500 }}>of ${totalTarget.toLocaleString()}</p>
            <p style={{ fontSize: 18, fontWeight: 800, color: t.primary, margin: '4px 0 0' }}>{Math.round((totalSaved / totalTarget) * 100)}%</p>
          </div>
        </div>
        <ProgressBar value={(totalSaved / totalTarget) * 100} color={t.primary} bg={t.primaryLight} height={8} />
        <p style={{ fontSize: 11, color: t.textMuted, margin: '8px 0 0', fontWeight: 500 }}>Switches saved you ~$340 this month 💜</p>
      </div>

      {/* Goals list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {goals.map(g => {
          const pct = Math.round((g.saved / g.target) * 100);
          const isActive = activeGoalId === g.id;
          return (
            <div key={g.id} onClick={() => setActiveGoalId(isActive ? null : g.id)} style={{
              background: t.card, border: `1.5px solid ${isActive ? g.color : t.border}`,
              borderRadius: 20, padding: '16px 16px', cursor: 'pointer',
              boxShadow: isActive ? `0 4px 20px ${g.color}25` : t.shadowSm,
              transition: 'all 0.2s ease',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                <div style={{ width: 44, height: 44, borderRadius: 14, background: g.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>
                  {g.emoji}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 14, fontWeight: 700, color: t.text, margin: 0 }}>{g.name}</p>
                  <p style={{ fontSize: 11, color: t.textMuted, margin: '1px 0 0', fontWeight: 500 }}>{g.daysLeft} days left</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: 15, fontWeight: 800, color: g.color, margin: 0 }}>{pct}%</p>
                  <p style={{ fontSize: 11, color: t.textMuted, margin: '1px 0 0', fontWeight: 500 }}>${g.saved.toLocaleString()} / ${g.target.toLocaleString()}</p>
                </div>
              </div>
              <ProgressBar value={pct} color={g.color} bg={g.bg} height={7} />

              {isActive && (
                <div style={{ marginTop: 14, paddingTop: 14, borderTop: `1px solid ${t.border}` }}>
                  <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
                    <div style={{ flex: 1, background: g.bg, borderRadius: 12, padding: '10px 10px', textAlign: 'center' }}>
                      <p style={{ fontSize: 16, fontWeight: 800, color: g.color, margin: 0 }}>${g.monthly}/mo</p>
                      <p style={{ fontSize: 10, color: t.textMuted, margin: '2px 0 0', fontWeight: 500 }}>Monthly target</p>
                    </div>
                    <div style={{ flex: 1, background: t.successLight, borderRadius: 12, padding: '10px 10px', textAlign: 'center' }}>
                      <p style={{ fontSize: 16, fontWeight: 800, color: t.success, margin: 0 }}>{g.lastBoost}</p>
                      <p style={{ fontSize: 10, color: t.textMuted, margin: '2px 0 0', fontWeight: 500 }}>Last switch boost</p>
                    </div>
                  </div>
                  <button style={{
                    width: '100%', padding: '11px 0', background: g.color, color: '#FFF',
                    fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700, fontSize: 13,
                    border: 'none', borderRadius: 14, cursor: 'pointer',
                  }}>+ Add to this goal</button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Add Goal */}
      <button style={{
        width: '100%', marginTop: 12, padding: '14px 0',
        background: t.primaryLight, color: t.primary,
        fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700, fontSize: 14,
        border: `1.5px dashed ${t.primary}`, borderRadius: 18, cursor: 'pointer',
      }}>
        + New Goal
      </button>
    </div>
  );
}

// ── Screen: Journal ───────────────────────────────────────────────────────────

function JournalScreen({ t }) {
  const [filter, setFilter] = useState('all');

  const entries = [
    { id: 1, date: 'Today, 8:30 AM', type: 'delayed', saved: 22, purchase: 'Takeout lunch', switched: 'Delayed 48h', emoji: '⏰', goal: 'Trip Fund', streak: true },
    { id: 2, date: 'Today, 7:15 AM', type: 'downsized', saved: 10, purchase: 'Starbucks latte', switched: 'Downsized to drip', emoji: '☕', goal: 'Emergency Fund', streak: false },
    { id: 3, date: 'Yesterday, 6:45 PM', type: 'redirected', saved: 35, purchase: 'DoorDash dinner', switched: 'Cooked at home', emoji: '🍳', goal: 'Trip Fund', streak: true },
    { id: 4, date: 'Yesterday, 1:20 PM', type: 'redirected', saved: 18, purchase: 'Amazon impulse', switched: 'Redirected to savings', emoji: '📦', goal: 'MacBook', streak: false },
    { id: 5, date: 'Mar 21, 9:00 AM', type: 'delayed', saved: 12, purchase: 'Lyft ride', switched: 'Took subway', emoji: '🚇', goal: 'Emergency Fund', streak: true },
    { id: 6, date: 'Mar 20, 7:30 PM', type: 'downsized', saved: 25, purchase: 'New shoes browse', switched: 'Waited for sale', emoji: '👟', goal: 'Trip Fund', streak: false },
  ];

  const typeConfig = {
    delayed: { label: 'Delayed', color: t.primary, bg: t.primaryLight },
    downsized: { label: 'Downsized', color: t.success, bg: t.successLight },
    redirected: { label: 'Redirected', color: t.secondary, bg: t.secondaryLight },
  };

  const totalSaved = entries.reduce((s, e) => s + e.saved, 0);
  const filtered = filter === 'all' ? entries : entries.filter(e => e.type === filter);

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '0 16px 16px', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
      <div style={{ marginBottom: 14 }}>
        <p style={{ fontSize: 12, color: t.textMuted, margin: '0 0 2px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>Decision Journal</p>
        <h2 style={{ fontSize: 20, fontWeight: 800, color: t.text, margin: 0 }}>Smart Choices Made</h2>
      </div>

      {/* Stats Row */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        {[
          { label: 'Saved this week', value: `$${totalSaved}`, emoji: '💰', color: t.success, bg: t.successLight },
          { label: 'Decisions', value: `${entries.length}`, emoji: '🧠', color: t.primary, bg: t.primaryLight },
          { label: 'Day streak', value: '7 🔥', emoji: '', color: t.accent, bg: t.accentLight },
        ].map((stat, i) => (
          <div key={i} style={{ flex: 1, background: stat.bg, borderRadius: 16, padding: '12px 10px', textAlign: 'center' }}>
            <p style={{ fontSize: 16, fontWeight: 800, color: stat.color, margin: 0 }}>{stat.value}</p>
            <p style={{ fontSize: 10, color: t.textMuted, margin: '2px 0 0', fontWeight: 500, lineHeight: 1.3 }}>{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Filter Pills */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 14, overflowX: 'auto', paddingBottom: 2 }}>
        {[
          { id: 'all', label: 'All' },
          { id: 'delayed', label: 'Delayed' },
          { id: 'downsized', label: 'Downsized' },
          { id: 'redirected', label: 'Redirected' },
        ].map(f => (
          <button key={f.id} onClick={() => setFilter(f.id)} style={{
            padding: '7px 14px', borderRadius: 20, flexShrink: 0,
            background: filter === f.id ? t.primary : t.pillBg,
            color: filter === f.id ? '#FFF' : t.textMuted,
            fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 600, fontSize: 12,
            border: 'none', cursor: 'pointer', transition: 'all 0.15s',
          }}>{f.label}</button>
        ))}
      </div>

      {/* Journal Entries */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {filtered.map(e => {
          const cfg = typeConfig[e.type];
          return (
            <div key={e.id} style={{ background: t.card, borderRadius: 18, padding: '14px 14px', border: `1px solid ${t.border}`, boxShadow: t.shadowSm }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                <div style={{ width: 42, height: 42, borderRadius: 13, background: cfg.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>
                  {e.emoji}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <p style={{ fontSize: 13, fontWeight: 700, color: t.text, margin: 0 }}>{e.purchase}</p>
                    <span style={{ fontSize: 14, fontWeight: 800, color: t.success }}>+${e.saved}</span>
                  </div>
                  <p style={{ fontSize: 11, color: t.textMuted, margin: '2px 0 4px', fontWeight: 500 }}>{e.date}</p>
                  <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                    <span style={{ fontSize: 10, color: cfg.color, fontWeight: 700, background: cfg.bg, padding: '2px 8px', borderRadius: 20 }}>{cfg.label}</span>
                    <span style={{ fontSize: 10, color: t.textMuted, fontWeight: 500 }}>→ {e.switched}</span>
                    {e.streak && <span style={{ fontSize: 10 }}>🔥</span>}
                  </div>
                  <p style={{ fontSize: 10, color: t.primary, margin: '4px 0 0', fontWeight: 600 }}>→ {e.goal}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Encouragement */}
      <div style={{ background: t.gradientSoft, border: `1px solid ${t.border}`, borderRadius: 18, padding: '14px 16px', marginTop: 12, textAlign: 'center' }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: t.text, margin: '0 0 4px' }}>You're on a roll! 🌟</p>
        <p style={{ fontSize: 11, color: t.textMuted, margin: 0, lineHeight: 1.5 }}>7-day streak of smart switches. Keep it up and reach your Trip Fund 2 weeks early!</p>
      </div>
    </div>
  );
}

// ── Screen: Settings ──────────────────────────────────────────────────────────

function SettingsScreen({ t, isDark, setIsDark }) {
  const [notifications, setNotifications] = useState(true);
  const [learningMode, setLearningMode] = useState(true);
  const [nudgeSensitivity, setNudgeSensitivity] = useState('medium');

  const Toggle = ({ value, onChange }) => (
    <div onClick={() => onChange(!value)} style={{
      width: 46, height: 26, borderRadius: 13,
      background: value ? t.primary : t.border,
      position: 'relative', cursor: 'pointer', transition: 'background 0.2s',
    }}>
      <div style={{
        position: 'absolute', top: 3, left: value ? 23 : 3,
        width: 20, height: 20, borderRadius: '50%', background: '#FFF',
        boxShadow: '0 1px 4px rgba(0,0,0,0.2)', transition: 'left 0.2s',
      }} />
    </div>
  );

  const Row = ({ label, sub, right }) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px', borderBottom: `1px solid ${t.border}` }}>
      <div>
        <p style={{ fontSize: 14, fontWeight: 600, color: t.text, margin: 0 }}>{label}</p>
        {sub && <p style={{ fontSize: 11, color: t.textMuted, margin: '2px 0 0', fontWeight: 500 }}>{sub}</p>}
      </div>
      {right}
    </div>
  );

  const Section = ({ title, children }) => (
    <div style={{ marginBottom: 16 }}>
      <p style={{ fontSize: 11, color: t.textMuted, fontWeight: 700, letterSpacing: 0.8, textTransform: 'uppercase', margin: '0 0 6px 4px' }}>{title}</p>
      <div style={{ background: t.card, borderRadius: 18, border: `1px solid ${t.border}`, overflow: 'hidden', boxShadow: t.shadowSm }}>
        {children}
      </div>
    </div>
  );

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '0 16px 16px', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
      <div style={{ marginBottom: 16 }}>
        <p style={{ fontSize: 12, color: t.textMuted, margin: '0 0 2px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>Preferences</p>
        <h2 style={{ fontSize: 20, fontWeight: 800, color: t.text, margin: 0 }}>Settings</h2>
      </div>

      {/* Profile */}
      <div style={{ background: t.gradient, borderRadius: 22, padding: '18px 20px', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{ width: 52, height: 52, borderRadius: 16, background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>
          👤
        </div>
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: 16, fontWeight: 800, color: '#FFF', margin: 0 }}>Alex Johnson</p>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', margin: '2px 0 0', fontWeight: 500 }}>alex@email.com · Pro Plan</p>
        </div>
        <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', fontWeight: 600 }}>Edit →</span>
      </div>

      <Section title="Appearance">
        <Row
          label="Dark Mode"
          sub={isDark ? 'Dark theme active' : 'Light theme active'}
          right={<Toggle value={isDark} onChange={setIsDark} />}
        />
        <div style={{ padding: '14px 16px', display: 'flex', gap: 8 }}>
          {['Auto', 'Light', 'Dark'].map(opt => (
            <button key={opt} style={{
              flex: 1, padding: '8px 0', borderRadius: 12,
              background: (opt === 'Dark' && isDark) || (opt === 'Light' && !isDark) ? t.primary : t.pillBg,
              color: (opt === 'Dark' && isDark) || (opt === 'Light' && !isDark) ? '#FFF' : t.textMuted,
              fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 600, fontSize: 12,
              border: 'none', cursor: 'pointer',
            }}>{opt}</button>
          ))}
        </div>
      </Section>

      <Section title="Nudges">
        <Row label="Push Notifications" sub="Receive spending nudges" right={<Toggle value={notifications} onChange={setNotifications} />} />
        <Row label="Smart Learning" sub="AI adapts to your patterns" right={<Toggle value={learningMode} onChange={setLearningMode} />} />
        <div style={{ padding: '14px 16px' }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: t.text, margin: '0 0 8px' }}>Nudge Sensitivity</p>
          <div style={{ display: 'flex', gap: 6 }}>
            {['low', 'medium', 'high'].map(s => (
              <button key={s} onClick={() => setNudgeSensitivity(s)} style={{
                flex: 1, padding: '8px 0', borderRadius: 12,
                background: nudgeSensitivity === s ? t.primary : t.pillBg,
                color: nudgeSensitivity === s ? '#FFF' : t.textMuted,
                fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 600, fontSize: 12,
                border: 'none', cursor: 'pointer', textTransform: 'capitalize',
              }}>{s}</button>
            ))}
          </div>
        </div>
      </Section>

      <Section title="Budget">
        <Row label="Daily Budget" sub="$40.00" right={<span style={{ fontSize: 13, color: t.primary, fontWeight: 600 }}>Edit</span>} />
        <Row label="Monthly Reset" sub="1st of each month" right={<span style={{ fontSize: 13, color: t.primary, fontWeight: 600 }}>Edit</span>} />
        <Row label="Connected Accounts" sub="Chase ••4821" right={<span style={{ fontSize: 13, color: t.primary, fontWeight: 600 }}>Manage</span>} />
      </Section>

      <Section title="Account">
        <Row label="Export Data" sub="Download your journal" right={<span style={{ fontSize: 13, color: t.primary, fontWeight: 600 }}>Export</span>} />
        <Row label="Privacy Policy" sub="" right={<span style={{ fontSize: 13, color: t.textMuted }}>→</span>} />
        <div style={{ padding: '14px 16px' }}>
          <button style={{
            width: '100%', padding: '12px 0', background: t.dangerLight, color: t.danger,
            fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700, fontSize: 13,
            border: `1px solid ${t.danger}20`, borderRadius: 14, cursor: 'pointer',
          }}>Sign Out</button>
        </div>
      </Section>

      <p style={{ textAlign: 'center', fontSize: 11, color: t.textMuted, fontWeight: 500 }}>Pocket Switch v1.0.0 · Built with 💜</p>
    </div>
  );
}

// ── Main App ──────────────────────────────────────────────────────────────────

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isDark, setIsDark] = useState(false);

  const theme = isDark ? 'dark' : 'light';
  const t = { ...themes[theme], gradientSoft: themes[theme].gradientSoft };

  const tabs = [
    { id: 'home', label: 'Home', icon: window.lucide.Home },
    { id: 'intercept', label: 'Switch', icon: window.lucide.Zap },
    { id: 'goals', label: 'Goals', icon: window.lucide.Target },
    { id: 'journal', label: 'Journal', icon: window.lucide.BookOpen },
    { id: 'settings', label: 'Settings', icon: window.lucide.Settings },
  ];

  const screens = {
    home: () => <HomeScreen t={t} setActiveTab={setActiveTab} />,
    intercept: () => <InterceptScreen t={t} />,
    goals: () => <GoalsScreen t={t} />,
    journal: () => <JournalScreen t={t} />,
    settings: () => <SettingsScreen t={t} isDark={isDark} setIsDark={setIsDark} />,
  };

  const ScreenComponent = screens[activeTab];

  return (
    <div style={{
      minHeight: '100vh',
      background: '#E8E4F0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Plus Jakarta Sans, sans-serif',
      backgroundImage: 'radial-gradient(ellipse at 30% 20%, #D8D0F0 0%, #E8E4F0 50%, #D0D8EE 100%)',
    }}>
      {/* Phone Frame */}
      <div style={{
        width: 375,
        height: 812,
        background: t.bg,
        borderRadius: 52,
        overflow: 'hidden',
        boxShadow: '0 40px 120px rgba(0,0,0,0.35), 0 0 0 8px #1A1A1A, 0 0 0 10px #333',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}>
        {/* Status Bar */}
        <StatusBar t={t} />

        {/* Screen Content */}
        <div style={{ flex: 1, overflowY: 'hidden', display: 'flex', flexDirection: 'column', paddingTop: 8 }}>
          <ScreenComponent />
        </div>

        {/* Bottom Nav */}
        <div style={{
          background: t.navBg,
          borderTop: `1px solid ${t.navBorder}`,
          paddingBottom: 20,
          paddingTop: 8,
          display: 'flex',
          justifyContent: 'space-around',
          boxShadow: `0 -4px 20px rgba(0,0,0,0.06)`,
        }}>
          {tabs.map(tab => {
            const isActive = activeTab === tab.id;
            const IconComp = tab.icon;
            return (
              <div
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 3,
                  cursor: 'pointer',
                  padding: '4px 10px',
                  borderRadius: 14,
                  background: isActive ? t.primaryLight : 'transparent',
                  transition: 'all 0.15s ease',
                  minWidth: 52,
                }}
              >
                <IconComp
                  size={22}
                  color={isActive ? t.primary : t.textMuted}
                  strokeWidth={isActive ? 2.5 : 1.8}
                />
                <span style={{
                  fontSize: 10,
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? t.primary : t.textMuted,
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                }}>{tab.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
