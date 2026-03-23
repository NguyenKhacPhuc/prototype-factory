const { useState, useEffect, useRef } = React;

// Load Google Font
(() => {
  const link = document.createElement('link');
  link.href = 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap';
  link.rel = 'stylesheet';
  document.head.appendChild(link);
})();

// ─── Themes ─────────────────────────────────────────────────────────────────
const themes = {
  dark: {
    bg: '#07090F',
    surface: '#0F1520',
    surface2: '#1A2235',
    surface3: '#243047',
    primary: '#00E5BB',
    primaryAlpha: 'rgba(0,229,187,0.12)',
    primaryGradient: 'linear-gradient(135deg, #00E5BB 0%, #00B8D9 100%)',
    secondary: '#8B5CF6',
    secondaryAlpha: 'rgba(139,92,246,0.12)',
    text: '#F8FAFC',
    textMuted: '#7C8FA8',
    textDim: '#2E3E52',
    border: '#1E2D40',
    danger: '#FF4D6D',
    dangerAlpha: 'rgba(255,77,109,0.12)',
    warning: '#FBBF24',
    warningAlpha: 'rgba(251,191,36,0.12)',
    success: '#00E5BB',
    navBg: '#0A1221',
    heroGradient: 'linear-gradient(145deg, #1A2235 0%, #111D30 50%, #0D1825 100%)',
    outerBg: '#0d1117',
  },
  light: {
    bg: '#EEF2F7',
    surface: '#FFFFFF',
    surface2: '#F1F5FB',
    surface3: '#DDE3EE',
    primary: '#00A880',
    primaryAlpha: 'rgba(0,168,128,0.10)',
    primaryGradient: 'linear-gradient(135deg, #00A880 0%, #0096C2 100%)',
    secondary: '#7C3AED',
    secondaryAlpha: 'rgba(124,58,237,0.10)',
    text: '#0D1117',
    textMuted: '#6B7A99',
    textDim: '#B8C4D4',
    border: '#DDE3EE',
    danger: '#E63553',
    dangerAlpha: 'rgba(230,53,83,0.10)',
    warning: '#D97706',
    warningAlpha: 'rgba(217,119,6,0.10)',
    success: '#00A880',
    navBg: '#FFFFFF',
    heroGradient: 'linear-gradient(145deg, #FFFFFF 0%, #F8FAFE 50%, #EEF2F7 100%)',
    outerBg: '#d4dae4',
  },
};

// ─── Mock Data ───────────────────────────────────────────────────────────────
const billsData = [
  { id: 1,  name: 'Netflix',      category: 'Streaming', amount: 15.49, icon: '🎬', color: '#E50914', dueDate: 28, trend: 0,  status: 'stable' },
  { id: 2,  name: 'Spotify',      category: 'Music',     amount: 10.99, icon: '🎵', color: '#1DB954', dueDate: 3,  trend: 10, status: 'increased' },
  { id: 3,  name: 'Amazon Prime', category: 'Shopping',  amount: 14.99, icon: '📦', color: '#FF9900', dueDate: 15, trend: 0,  status: 'stable' },
  { id: 4,  name: 'Hulu',         category: 'Streaming', amount: 17.99, icon: '📺', color: '#1CE783', dueDate: 22, trend: 5,  status: 'increased' },
  { id: 5,  name: 'AT&T',         category: 'Phone',     amount: 89.99, icon: '📱', color: '#00A8E0', dueDate: 8,  trend: 0,  status: 'stable' },
  { id: 6,  name: 'Electric',     category: 'Utility',   amount: 142.00,icon: '⚡', color: '#F59E0B', dueDate: 12, trend: 18, status: 'warning' },
  { id: 7,  name: 'Internet',     category: 'Utility',   amount: 79.99, icon: '🌐', color: '#6366F1', dueDate: 20, trend: 0,  status: 'stable' },
  { id: 8,  name: 'Adobe CC',     category: 'Software',  amount: 54.99, icon: '🎨', color: '#FF0000', dueDate: 5,  trend: 0,  status: 'duplicate' },
  { id: 9,  name: 'iCloud',       category: 'Storage',   amount: 9.99,  icon: '☁️', color: '#007AFF', dueDate: 18, trend: 0,  status: 'stable' },
  { id: 10, name: 'Gym',          category: 'Health',    amount: 45.00, icon: '💪', color: '#EF4444', dueDate: 1,  trend: 0,  status: 'unused' },
];

const actionsData = [
  {
    id: 1, type: 'negotiate', priority: 'high',
    title: 'Negotiate your AT&T plan',
    description: "Customers who call AT&T and mention competitor rates save an average of $23/mo. Your contract ended 3 months ago.",
    savings: 23, effort: 'Medium', deadline: 'Best before Mar 31', icon: '📞',
    script: "Hi, I'd like to review my current plan. I've seen better rates from competitors and I want to know what retention offers you have available for loyal customers.",
  },
  {
    id: 2, type: 'cancel', priority: 'high',
    title: 'Cancel your Gym membership',
    description: "You haven't visited in 47 days. Next billing cycle hits Apr 1 — cancel before then to avoid another month.",
    savings: 45, effort: 'Low', deadline: 'Cancel by Apr 1', icon: '✂️', script: null,
  },
  {
    id: 3, type: 'switch', priority: 'medium',
    title: 'Downgrade Hulu to Basic',
    description: "You watched 2 shows this month. The Basic plan covers your usage and saves $8/mo — before the next billing on Mar 28.",
    savings: 8, effort: 'Low', deadline: 'Before Mar 28', icon: '⬇️', script: null,
  },
  {
    id: 4, type: 'duplicate', priority: 'medium',
    title: 'Duplicate cloud storage detected',
    description: "You're paying for both iCloud ($9.99) and Google One ($5.99). You use less than 200GB combined — one plan covers you.",
    savings: 10, effort: 'Low', deadline: null, icon: '🔁', script: null,
  },
  {
    id: 5, type: 'negotiate', priority: 'low',
    title: 'Review Internet provider deal',
    description: "Comcast is offering $40/mo for new customers. Ask for a loyalty discount — current customers often get matched.",
    savings: 20, effort: 'Medium', deadline: 'After Jun 15 (contract)', icon: '🌐', script: null,
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────
function StatusBar({ theme }) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '14px 28px 6px', fontSize: 12, fontWeight: 700, color: theme.text,
      position: 'relative', zIndex: 10, flexShrink: 0,
    }}>
      <span style={{ letterSpacing: 0.2 }}>9:41</span>
      <div style={{
        position: 'absolute', left: '50%', transform: 'translateX(-50%)',
        top: 0, width: 120, height: 34, background: '#000',
        borderRadius: '0 0 20px 20px', zIndex: 20,
      }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
        {React.createElement(window.lucide.Signal, { size: 13, color: theme.text })}
        {React.createElement(window.lucide.Wifi, { size: 13, color: theme.text })}
        {React.createElement(window.lucide.Battery, { size: 16, color: theme.text })}
      </div>
    </div>
  );
}

function Toggle({ value, onChange, theme }) {
  return (
    <div onClick={onChange} style={{
      width: 44, height: 26, borderRadius: 13,
      background: value ? theme.primary : theme.surface3,
      position: 'relative', cursor: 'pointer',
      transition: 'background 0.25s', flexShrink: 0,
    }}>
      <div style={{
        position: 'absolute', top: 3,
        left: value ? 21 : 3,
        width: 20, height: 20, borderRadius: '50%', background: '#fff',
        transition: 'left 0.25s', boxShadow: '0 1px 6px rgba(0,0,0,0.35)',
      }} />
    </div>
  );
}

// ─── Home Screen ─────────────────────────────────────────────────────────────
function HomeScreen({ theme }) {
  const [pressed, setPressed] = useState(null);
  const dueSoon = billsData.filter(b => b.dueDate <= 10);

  return (
    <div style={{ height: '100%', overflowY: 'auto', background: theme.bg, paddingBottom: 24 }}>
      {/* Header */}
      <div style={{ padding: '2px 20px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <p style={{ color: theme.textMuted, fontSize: 13, margin: '0 0 2px' }}>Good morning 👋</p>
          <h1 style={{ color: theme.text, fontSize: 22, fontWeight: 800, margin: 0 }}>Alex Johnson</h1>
        </div>
        <div style={{
          width: 42, height: 42, borderRadius: '50%',
          background: theme.primaryGradient,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff', fontSize: 16, fontWeight: 800,
        }}>AJ</div>
      </div>

      {/* Alert Banner */}
      <div style={{ padding: '0 20px 14px' }}>
        <div style={{
          background: theme.warningAlpha, border: `1px solid ${theme.warning}50`,
          borderRadius: 16, padding: '12px 16px',
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          {React.createElement(window.lucide.AlertTriangle, { size: 17, color: theme.warning })}
          <div style={{ flex: 1 }}>
            <p style={{ color: theme.warning, fontSize: 13, fontWeight: 700, margin: 0 }}>3 price increases detected</p>
            <p style={{ color: theme.textMuted, fontSize: 11, margin: '1px 0 0' }}>Electric +18% · Spotify +10% · Hulu +5%</p>
          </div>
          {React.createElement(window.lucide.ChevronRight, { size: 15, color: theme.warning })}
        </div>
      </div>

      {/* Hero card */}
      <div style={{ padding: '0 20px 18px' }}>
        <div style={{
          background: theme.primaryGradient, borderRadius: 26,
          padding: '22px 22px 20px', position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: -30, right: -30, width: 130, height: 130, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
          <div style={{ position: 'absolute', bottom: -25, right: 10, width: 90, height: 90, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
          <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: 11, fontWeight: 700, margin: '0 0 3px', textTransform: 'uppercase', letterSpacing: 1.1 }}>March 2026 · Total Bills</p>
          <h2 style={{ color: '#fff', fontSize: 38, fontWeight: 800, margin: '0 0 18px', letterSpacing: -1 }}>$481.43</h2>
          <div style={{ display: 'flex', gap: 18 }}>
            <div>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 10, margin: '0 0 2px' }}>Paid so far</p>
              <p style={{ color: '#fff', fontSize: 15, fontWeight: 700, margin: 0 }}>$342.67</p>
            </div>
            <div style={{ width: 1, background: 'rgba(255,255,255,0.22)' }} />
            <div>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 10, margin: '0 0 2px' }}>vs Last month</p>
              <p style={{ color: '#fff', fontSize: 15, fontWeight: 700, margin: 0 }}>↑ $23.18</p>
            </div>
            <div style={{ width: 1, background: 'rgba(255,255,255,0.22)' }} />
            <div>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 10, margin: '0 0 2px' }}>Bills tracked</p>
              <p style={{ color: '#fff', fontSize: 15, fontWeight: 700, margin: 0 }}>10</p>
            </div>
          </div>
        </div>
      </div>

      {/* Savings opportunity */}
      <div style={{ padding: '0 20px 18px' }}>
        <div style={{
          background: theme.surface, border: `1px solid ${theme.border}`,
          borderRadius: 22, padding: '18px',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <div>
              <p style={{ color: theme.text, fontSize: 14, fontWeight: 700, margin: '0 0 2px' }}>💰 You could save</p>
              <p style={{ color: theme.textMuted, fontSize: 12, margin: 0 }}>5 smart actions available</p>
            </div>
            <p style={{ color: theme.primary, fontSize: 26, fontWeight: 800, margin: 0 }}>$106<span style={{ fontSize: 14 }}>/mo</span></p>
          </div>
          <div style={{ background: theme.surface2, borderRadius: 8, height: 7, marginBottom: 8 }}>
            <div style={{ background: theme.primaryGradient, width: '22%', height: '100%', borderRadius: 8 }} />
          </div>
          <p style={{ color: theme.textMuted, fontSize: 11, margin: 0 }}>22% of monthly bill spend recoverable</p>
        </div>
      </div>

      {/* Due this week */}
      <div style={{ padding: '0 20px 16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <h3 style={{ color: theme.text, fontSize: 15, fontWeight: 700, margin: 0 }}>Due this week</h3>
          <span style={{ color: theme.primary, fontSize: 13, fontWeight: 600 }}>See all →</span>
        </div>
        {dueSoon.map(bill => (
          <div key={bill.id}
            onMouseDown={() => setPressed(bill.id)}
            onMouseUp={() => setPressed(null)}
            onMouseLeave={() => setPressed(null)}
            style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '13px 16px',
              background: theme.surface, border: `1px solid ${theme.border}`,
              borderRadius: 18, marginBottom: 8,
              transition: 'transform 0.1s',
              transform: pressed === bill.id ? 'scale(0.97)' : 'scale(1)',
              cursor: 'pointer',
            }}>
            <div style={{
              width: 42, height: 42, borderRadius: 13,
              background: bill.color + '20',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20,
            }}>{bill.icon}</div>
            <div style={{ flex: 1 }}>
              <p style={{ color: theme.text, fontSize: 14, fontWeight: 600, margin: 0 }}>{bill.name}</p>
              <p style={{ color: theme.textMuted, fontSize: 12, margin: '2px 0 0' }}>{bill.category} · Due Mar {bill.dueDate}</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ color: theme.text, fontSize: 15, fontWeight: 700, margin: 0 }}>${bill.amount.toFixed(2)}</p>
              {bill.status === 'increased' && <span style={{ color: theme.warning, fontSize: 10, fontWeight: 700 }}>↑ {bill.trend}%</span>}
              {bill.status === 'warning' && <span style={{ color: theme.danger, fontSize: 10, fontWeight: 700 }}>↑ {bill.trend}%</span>}
            </div>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div style={{ padding: '0 20px' }}>
        <h3 style={{ color: theme.text, fontSize: 15, fontWeight: 700, margin: '0 0 12px' }}>Quick add</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {[
            { icon: '📷', label: 'Scan Invoice' },
            { icon: '🏦', label: 'Connect Bank' },
            { icon: '📧', label: 'Scan Email' },
            { icon: '📄', label: 'Upload Bill' },
          ].map((a, i) => (
            <div key={i} style={{
              background: theme.surface, border: `1px solid ${theme.border}`,
              borderRadius: 18, padding: '14px 16px',
              display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer',
            }}>
              <span style={{ fontSize: 20 }}>{a.icon}</span>
              <p style={{ color: theme.text, fontSize: 13, fontWeight: 600, margin: 0 }}>{a.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Calendar Screen ──────────────────────────────────────────────────────────
function CalendarScreen({ theme }) {
  const [selectedDay, setSelectedDay] = useState(23);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const weekDays = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  const paydays = [1, 15];
  const riskDays = [8, 12];

  const billsByDay = {};
  billsData.forEach(b => {
    if (!billsByDay[b.dueDate]) billsByDay[b.dueDate] = [];
    billsByDay[b.dueDate].push(b);
  });
  const selectedBills = billsByDay[selectedDay] || [];

  return (
    <div style={{ height: '100%', overflowY: 'auto', background: theme.bg, paddingBottom: 24 }}>
      <div style={{ padding: '2px 20px 14px' }}>
        <h1 style={{ color: theme.text, fontSize: 22, fontWeight: 800, margin: '0 0 3px' }}>Bill Calendar</h1>
        <p style={{ color: theme.textMuted, fontSize: 13, margin: 0 }}>Synced with your paydays</p>
      </div>

      {/* Month nav */}
      <div style={{ padding: '0 20px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 12, padding: '7px 14px', color: theme.textMuted, fontSize: 13 }}>← Feb</div>
        <span style={{ color: theme.text, fontSize: 16, fontWeight: 700 }}>March 2026</span>
        <div style={{ background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 12, padding: '7px 14px', color: theme.textMuted, fontSize: 13 }}>Apr →</div>
      </div>

      {/* Legend */}
      <div style={{ padding: '0 20px 12px', display: 'flex', gap: 16 }}>
        {[
          { color: theme.primary,  label: 'Bill due' },
          { color: '#4ADE80',      label: 'Payday' },
          { color: theme.danger,   label: 'Risk day' },
        ].map((l, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: l.color }} />
            <span style={{ color: theme.textMuted, fontSize: 11 }}>{l.label}</span>
          </div>
        ))}
      </div>

      {/* Calendar */}
      <div style={{ padding: '0 20px 18px' }}>
        <div style={{ background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 24, padding: '16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', marginBottom: 6 }}>
            {['S','M','T','W','T','F','S'].map((d, i) => (
              <div key={i} style={{ textAlign: 'center', color: theme.textMuted, fontSize: 11, fontWeight: 700, padding: '3px 0' }}>{d}</div>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2 }}>
            {days.map(day => {
              const hasBill   = !!billsByDay[day];
              const isPayday  = paydays.includes(day);
              const isRisk    = riskDays.includes(day);
              const isSelected = selectedDay === day;
              const isToday   = day === 23;
              const dotColor  = isPayday ? '#4ADE80' : isRisk ? theme.danger : theme.primary;
              return (
                <div key={day} onClick={() => setSelectedDay(day)} style={{
                  aspectRatio: '1', borderRadius: 10,
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', position: 'relative',
                  background: isSelected ? theme.primary : isToday ? theme.primaryAlpha : 'transparent',
                  border: isToday && !isSelected ? `1.5px solid ${theme.primary}` : '1.5px solid transparent',
                  transition: 'background 0.15s',
                }}>
                  <span style={{ fontSize: 12, fontWeight: isSelected || isToday ? 700 : 400, color: isSelected ? '#fff' : theme.text }}>{day}</span>
                  {(hasBill || isPayday) && (
                    <div style={{ width: 4, height: 4, borderRadius: '50%', background: isSelected ? 'rgba(255,255,255,0.7)' : dotColor, position: 'absolute', bottom: 3 }} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Selected day */}
      <div style={{ padding: '0 20px 14px' }}>
        <h3 style={{ color: theme.text, fontSize: 14, fontWeight: 700, margin: '0 0 10px' }}>
          March {selectedDay}{selectedDay === 23 ? ' · Today' : ''}{paydays.includes(selectedDay) ? ' · Payday 💵' : ''}
        </h3>
        {paydays.includes(selectedDay) && (
          <div style={{ background: 'rgba(74,222,128,0.12)', border: '1px solid rgba(74,222,128,0.3)', borderRadius: 16, padding: '12px 16px', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 18 }}>💵</span>
            <div>
              <p style={{ color: '#4ADE80', fontSize: 13, fontWeight: 700, margin: 0 }}>Payday!</p>
              <p style={{ color: theme.textMuted, fontSize: 12, margin: '2px 0 0' }}>Expected deposit: $2,840.00</p>
            </div>
          </div>
        )}
        {selectedBills.length > 0 ? selectedBills.map(bill => (
          <div key={bill.id} style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '13px 16px', background: theme.surface,
            border: `1px solid ${theme.border}`, borderRadius: 18, marginBottom: 8,
          }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: bill.color + '20', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>{bill.icon}</div>
            <div style={{ flex: 1 }}>
              <p style={{ color: theme.text, fontSize: 14, fontWeight: 600, margin: 0 }}>{bill.name}</p>
              <p style={{ color: theme.textMuted, fontSize: 12, margin: '2px 0 0' }}>{bill.category} · Auto-pay</p>
            </div>
            <p style={{ color: theme.text, fontSize: 15, fontWeight: 700, margin: 0 }}>${bill.amount.toFixed(2)}</p>
          </div>
        )) : (
          <div style={{ padding: '20px', textAlign: 'center', color: theme.textMuted, fontSize: 13 }}>No bills due this day ✓</div>
        )}
      </div>

      {/* Cash flow risk */}
      <div style={{ padding: '0 20px' }}>
        <div style={{ background: theme.dangerAlpha, border: `1px solid ${theme.danger}40`, borderRadius: 20, padding: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            {React.createElement(window.lucide.AlertTriangle, { size: 15, color: theme.danger })}
            <p style={{ color: theme.danger, fontSize: 13, fontWeight: 700, margin: 0 }}>Cash flow risk: Mar 8–12</p>
          </div>
          <p style={{ color: theme.textMuted, fontSize: 12, margin: 0, lineHeight: 1.6 }}>
            AT&T ($89.99) + Electric ($142) both hit before your payday on the 15th. Consider moving Electric auto-pay to Mar 16 to avoid overdraft.
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Insights Screen ──────────────────────────────────────────────────────────
function InsightsScreen({ theme }) {
  const chartData = [
    { month: 'Nov', amount: 412, projected: false },
    { month: 'Dec', amount: 445, projected: false },
    { month: 'Jan', amount: 428, projected: false },
    { month: 'Feb', amount: 458, projected: false },
    { month: 'Mar', amount: 481, projected: false },
    { month: 'Apr', amount: 509, projected: true },
    { month: 'May', amount: 497, projected: true },
  ];
  const maxVal = 550;

  return (
    <div style={{ height: '100%', overflowY: 'auto', background: theme.bg, paddingBottom: 24 }}>
      <div style={{ padding: '2px 20px 14px' }}>
        <h1 style={{ color: theme.text, fontSize: 22, fontWeight: 800, margin: '0 0 3px' }}>Insights</h1>
        <p style={{ color: theme.textMuted, fontSize: 13, margin: 0 }}>AI-powered bill intelligence</p>
      </div>

      {/* Forecast */}
      <div style={{ padding: '0 20px 18px' }}>
        <div style={{ background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 24, padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
            <p style={{ color: theme.textMuted, fontSize: 11, fontWeight: 700, margin: 0, textTransform: 'uppercase', letterSpacing: 0.8 }}>April Forecast</p>
            <div style={{ background: theme.dangerAlpha, borderRadius: 8, padding: '3px 10px', color: theme.danger, fontSize: 12, fontWeight: 700 }}>↑ $27.79</div>
          </div>
          <h2 style={{ color: theme.text, fontSize: 30, fontWeight: 800, margin: '2px 0 18px', letterSpacing: -0.5 }}>$509.22</h2>

          {/* Bar chart */}
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 5, height: 70, marginBottom: 10 }}>
            {chartData.map((d, i) => {
              const h = Math.round((d.amount / maxVal) * 60);
              const isProjHigh = d.projected && d.amount > 490;
              return (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                  <div style={{
                    width: '100%', height: h,
                    background: d.projected
                      ? (isProjHigh ? `${theme.danger}55` : `${theme.textDim}88`)
                      : theme.primaryGradient,
                    borderRadius: '6px 6px 0 0',
                    border: d.projected ? `1px dashed ${isProjHigh ? theme.danger : theme.textMuted}` : 'none',
                  }} />
                  <span style={{ color: theme.textMuted, fontSize: 9, fontWeight: 600 }}>{d.month}</span>
                </div>
              );
            })}
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <div style={{ width: 10, height: 10, borderRadius: 3, background: theme.primaryGradient }} />
              <span style={{ color: theme.textMuted, fontSize: 10 }}>Actual</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <div style={{ width: 10, height: 10, borderRadius: 3, background: theme.danger + '55', border: `1px dashed ${theme.danger}` }} />
              <span style={{ color: theme.textMuted, fontSize: 10 }}>Projected</span>
            </div>
          </div>
          <p style={{ color: theme.textMuted, fontSize: 11, margin: '10px 0 0' }}>📈 Seasonal electric spike driving April increase</p>
        </div>
      </div>

      {/* Price creep */}
      <div style={{ padding: '0 20px 18px' }}>
        <h3 style={{ color: theme.text, fontSize: 15, fontWeight: 700, margin: '0 0 12px' }}>🔍 Price Creep Detected</h3>
        {[
          { name: 'Electric',  icon: '⚡', color: '#F59E0B', old: 120.00, now: 142.00, pct: 18.3, reason: 'Winter/spring seasonal spike' },
          { name: 'Spotify',   icon: '🎵', color: '#1DB954', old: 9.99,  now: 10.99,  pct: 10.0, reason: 'Silent price hike · Jan 2026' },
          { name: 'Hulu',      icon: '📺', color: '#1CE783', old: 17.09, now: 17.99,  pct: 5.3,  reason: 'Plan price increase' },
        ].map((item, i) => (
          <div key={i} style={{ background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 20, padding: '16px', marginBottom: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 38, height: 38, borderRadius: 11, background: item.color + '22', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17 }}>{item.icon}</div>
                <div>
                  <p style={{ color: theme.text, fontSize: 14, fontWeight: 700, margin: 0 }}>{item.name}</p>
                  <p style={{ color: theme.textMuted, fontSize: 11, margin: '2px 0 0' }}>{item.reason}</p>
                </div>
              </div>
              <div style={{ background: theme.dangerAlpha, borderRadius: 8, padding: '3px 10px', color: theme.danger, fontSize: 12, fontWeight: 700 }}>+{item.pct.toFixed(1)}%</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ color: theme.textMuted, fontSize: 13 }}>${item.old.toFixed(2)}</span>
              <div style={{ flex: 1, height: 3, background: theme.surface2, borderRadius: 3, position: 'relative' }}>
                <div style={{ position: 'absolute', left: 0, width: `${(item.old / item.now) * 100}%`, height: '100%', background: theme.primary, borderRadius: 3 }} />
              </div>
              <span style={{ color: theme.danger, fontSize: 13, fontWeight: 700 }}>${item.now.toFixed(2)}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Duplicates */}
      <div style={{ padding: '0 20px 18px' }}>
        <h3 style={{ color: theme.text, fontSize: 15, fontWeight: 700, margin: '0 0 12px' }}>🔁 Overlaps & Duplicates</h3>
        <div style={{ background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 20, padding: '16px', marginBottom: 10 }}>
          <p style={{ color: theme.warning, fontSize: 13, fontWeight: 700, margin: '0 0 4px' }}>Cloud Storage Overlap</p>
          <p style={{ color: theme.textMuted, fontSize: 12, margin: '0 0 12px', lineHeight: 1.5 }}>iCloud + Google One both active. You're paying for 2TB combined but using &lt;200GB total.</p>
          <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
            {[{ e: '☁️', n: 'iCloud', p: '$9.99' }, { e: '📁', n: 'Google One', p: '$5.99' }].map((s, i) => (
              <div key={i} style={{ flex: 1, background: theme.surface2, borderRadius: 12, padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 16 }}>{s.e}</span>
                <div><p style={{ color: theme.text, fontSize: 12, fontWeight: 600, margin: 0 }}>{s.n}</p><p style={{ color: theme.textMuted, fontSize: 11, margin: 0 }}>{s.p}/mo</p></div>
              </div>
            ))}
          </div>
          <div style={{ background: theme.primaryAlpha, borderRadius: 10, padding: '8px 12px', color: theme.primary, fontSize: 12, fontWeight: 600 }}>💡 Cancel one → Save up to $9.99/mo</div>
        </div>
        <div style={{ background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 20, padding: '16px' }}>
          <p style={{ color: theme.warning, fontSize: 13, fontWeight: 700, margin: '0 0 4px' }}>Design Tool Overlap</p>
          <p style={{ color: theme.textMuted, fontSize: 12, margin: '0 0 10px', lineHeight: 1.5 }}>Adobe CC + Figma both active. Last Adobe usage was 43 days ago.</p>
          <div style={{ background: theme.dangerAlpha, borderRadius: 10, padding: '8px 12px', color: theme.danger, fontSize: 12, fontWeight: 600 }}>⚠️ Cancel Adobe CC → Save $54.99/mo</div>
        </div>
      </div>

      {/* Category breakdown */}
      <div style={{ padding: '0 20px' }}>
        <h3 style={{ color: theme.text, fontSize: 15, fontWeight: 700, margin: '0 0 12px' }}>Spending Breakdown</h3>
        {[
          { cat: 'Utilities',  amount: 221.99, pct: 46, color: '#F59E0B' },
          { cat: 'Phone',      amount: 89.99,  pct: 19, color: '#00A8E0' },
          { cat: 'Software',   amount: 54.99,  pct: 11, color: '#FF6B6B' },
          { cat: 'Streaming',  amount: 48.47,  pct: 10, color: '#E50914' },
          { cat: 'Health',     amount: 45.00,  pct: 9,  color: '#EF4444' },
          { cat: 'Other',      amount: 20.98,  pct: 5,  color: '#6366F1' },
        ].map((item, i) => (
          <div key={i} style={{ marginBottom: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
              <span style={{ color: theme.text, fontSize: 13, fontWeight: 600 }}>{item.cat}</span>
              <span style={{ color: theme.textMuted, fontSize: 12 }}>${item.amount.toFixed(2)} · {item.pct}%</span>
            </div>
            <div style={{ background: theme.surface2, borderRadius: 6, height: 6 }}>
              <div style={{ background: item.color, width: `${item.pct}%`, height: '100%', borderRadius: 6 }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Actions Screen ───────────────────────────────────────────────────────────
function ActionsScreen({ theme }) {
  const [completed, setCompleted] = useState([]);
  const [expandedId, setExpandedId] = useState(null);

  const remaining = actionsData.filter(a => !completed.includes(a.id));
  const totalSavings = remaining.reduce((s, a) => s + a.savings, 0);

  const priorityColor = { high: theme.danger, medium: theme.warning, low: theme.primary };

  return (
    <div style={{ height: '100%', overflowY: 'auto', background: theme.bg, paddingBottom: 24 }}>
      <div style={{ padding: '2px 20px 14px' }}>
        <h1 style={{ color: theme.text, fontSize: 22, fontWeight: 800, margin: '0 0 3px' }}>Actions</h1>
        <p style={{ color: theme.textMuted, fontSize: 13, margin: 0 }}>Your personalized savings playbook</p>
      </div>

      {/* Summary card */}
      <div style={{ padding: '0 20px 18px' }}>
        <div style={{ background: theme.primaryGradient, borderRadius: 24, padding: '20px 22px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -25, right: -25, width: 110, height: 110, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
          <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: 11, fontWeight: 700, margin: '0 0 3px', textTransform: 'uppercase', letterSpacing: 1 }}>Available savings</p>
          <h2 style={{ color: '#fff', fontSize: 34, fontWeight: 800, margin: '0 0 8px', letterSpacing: -1 }}>${totalSavings}<span style={{ fontSize: 16 }}>/mo</span></h2>
          <p style={{ color: 'rgba(255,255,255,0.78)', fontSize: 13, margin: 0 }}>
            {remaining.length} actions remaining · {completed.length} completed ✓
          </p>
        </div>
      </div>

      {/* Action cards */}
      {actionsData.map(action => {
        const isDone = completed.includes(action.id);
        const isOpen = expandedId === action.id;
        return (
          <div key={action.id} style={{ padding: '0 20px 12px' }}>
            <div style={{
              background: theme.surface,
              border: `1px solid ${isDone ? theme.primary + '50' : theme.border}`,
              borderRadius: 22, padding: '16px',
              opacity: isDone ? 0.55 : 1, transition: 'opacity 0.2s',
            }}>
              <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
                <span style={{ fontSize: 24, flexShrink: 0 }}>{action.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 7, flexWrap: 'wrap', marginBottom: 4 }}>
                    <p style={{ color: theme.text, fontSize: 14, fontWeight: 700, margin: 0 }}>{action.title}</p>
                    <span style={{
                      background: priorityColor[action.priority] + '22',
                      color: priorityColor[action.priority],
                      fontSize: 9, fontWeight: 800, padding: '2px 7px', borderRadius: 6, textTransform: 'uppercase', letterSpacing: 0.5,
                    }}>{action.priority}</span>
                  </div>
                  <p style={{ color: theme.textMuted, fontSize: 12, margin: 0, lineHeight: 1.55 }}>{action.description}</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
                <span style={{ background: theme.primaryAlpha, color: theme.primary, fontSize: 13, fontWeight: 700, padding: '4px 12px', borderRadius: 9 }}>Save ${action.savings}/mo</span>
                <span style={{ color: theme.textMuted, fontSize: 11 }}>· {action.effort} effort</span>
                {action.deadline && <span style={{ color: theme.warning, fontSize: 11, fontWeight: 600 }}>· ⏰ {action.deadline}</span>}
              </div>

              {action.script && !isDone && (
                <div style={{ marginBottom: 10 }}>
                  <div
                    onClick={() => setExpandedId(isOpen ? null : action.id)}
                    style={{
                      background: theme.surface2, borderRadius: isOpen ? '10px 10px 0 0' : 10,
                      padding: '9px 14px', color: theme.primary,
                      fontSize: 12, fontWeight: 600, cursor: 'pointer',
                    }}
                  >{isOpen ? '▲ Hide script' : '▼ Show negotiation script'}</div>
                  {isOpen && (
                    <div style={{ background: theme.surface2, borderRadius: '0 0 10px 10px', padding: '12px 14px' }}>
                      <p style={{ color: theme.text, fontSize: 12, lineHeight: 1.65, margin: 0, fontStyle: 'italic' }}>"{action.script}"</p>
                    </div>
                  )}
                </div>
              )}

              {!isDone ? (
                <div style={{ display: 'flex', gap: 8 }}>
                  <button
                    onClick={() => setCompleted([...completed, action.id])}
                    style={{
                      flex: 1, background: theme.primaryGradient, border: 'none',
                      borderRadius: 14, padding: '11px', color: '#fff',
                      fontSize: 13, fontWeight: 700, cursor: 'pointer',
                    }}>Done ✓</button>
                  <button style={{
                    background: theme.surface2, border: 'none', borderRadius: 14,
                    padding: '11px 16px', color: theme.textMuted, fontSize: 12, cursor: 'pointer',
                  }}>Skip</button>
                </div>
              ) : (
                <div style={{ background: theme.primaryAlpha, borderRadius: 12, padding: '9px', textAlign: 'center', color: theme.primary, fontSize: 13, fontWeight: 700 }}>✓ Completed</div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Settings Screen ──────────────────────────────────────────────────────────
function SettingsScreen({ theme, isDark, toggleTheme }) {
  const [notifs, setNotifs]   = useState(true);
  const [autoScan, setAutoScan] = useState(true);
  const [budgetAlert, setBudgetAlert] = useState(false);

  function SettingGroup({ label, children }) {
    return (
      <div style={{ padding: '0 20px 16px' }}>
        <p style={{ color: theme.textMuted, fontSize: 11, fontWeight: 700, margin: '0 0 8px', textTransform: 'uppercase', letterSpacing: 0.9 }}>{label}</p>
        <div style={{ background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 20, overflow: 'hidden' }}>
          {children}
        </div>
      </div>
    );
  }

  function SettingRow({ icon, label, sub, right, last }) {
    return (
      <div style={{
        display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px',
        borderBottom: last ? 'none' : `1px solid ${theme.border}`,
      }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: theme.surface2, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17, flexShrink: 0 }}>{icon}</div>
        <div style={{ flex: 1 }}>
          <p style={{ color: theme.text, fontSize: 14, fontWeight: 600, margin: 0 }}>{label}</p>
          {sub && <p style={{ color: theme.textMuted, fontSize: 11, margin: '2px 0 0' }}>{sub}</p>}
        </div>
        {right}
      </div>
    );
  }

  return (
    <div style={{ height: '100%', overflowY: 'auto', background: theme.bg, paddingBottom: 24 }}>
      <div style={{ padding: '2px 20px 14px' }}>
        <h1 style={{ color: theme.text, fontSize: 22, fontWeight: 800, margin: '0 0 3px' }}>Settings</h1>
        <p style={{ color: theme.textMuted, fontSize: 13, margin: 0 }}>Manage your BillBloom account</p>
      </div>

      {/* Profile card */}
      <div style={{ padding: '0 20px 18px' }}>
        <div style={{
          background: theme.surface, border: `1px solid ${theme.border}`,
          borderRadius: 22, padding: '18px',
          display: 'flex', alignItems: 'center', gap: 14,
        }}>
          <div style={{ width: 54, height: 54, borderRadius: '50%', background: theme.primaryGradient, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 20, fontWeight: 800, flexShrink: 0 }}>AJ</div>
          <div style={{ flex: 1 }}>
            <p style={{ color: theme.text, fontSize: 16, fontWeight: 700, margin: '0 0 2px' }}>Alex Johnson</p>
            <p style={{ color: theme.textMuted, fontSize: 13, margin: '0 0 4px' }}>alex@email.com</p>
            <span style={{ background: theme.primaryAlpha, color: theme.primary, fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 8 }}>Pro Plan · 10 bills</span>
          </div>
          {React.createElement(window.lucide.ChevronRight, { size: 17, color: theme.textMuted })}
        </div>
      </div>

      {/* Appearance */}
      <SettingGroup label="Appearance">
        <SettingRow
          icon={isDark ? React.createElement(window.lucide.Moon, { size: 17, color: theme.primary }) : React.createElement(window.lucide.Sun, { size: 17, color: theme.warning })}
          label={isDark ? 'Dark Mode' : 'Light Mode'}
          sub="Toggle app theme"
          last={true}
          right={<Toggle value={isDark} onChange={toggleTheme} theme={theme} />}
        />
      </SettingGroup>

      {/* Notifications */}
      <SettingGroup label="Notifications">
        <SettingRow icon="🔔" label="Bill Reminders" sub="3 days before due date" right={<Toggle value={notifs} onChange={() => setNotifs(!notifs)} theme={theme} />} />
        <SettingRow icon="🔄" label="Auto-Scan" sub="Scan for new bills weekly" right={<Toggle value={autoScan} onChange={() => setAutoScan(!autoScan)} theme={theme} />} />
        <SettingRow icon="⚠️" label="Budget Alerts" sub="Alert when bills exceed $500/mo" last right={<Toggle value={budgetAlert} onChange={() => setBudgetAlert(!budgetAlert)} theme={theme} />} />
      </SettingGroup>

      {/* Connected accounts */}
      <SettingGroup label="Connected Accounts">
        {[
          { icon: '🏦', name: 'Chase Checking', status: 'Connected', color: '#0B5FB3' },
          { icon: '📧', name: 'Gmail Inbox',    status: 'Connected', color: '#EA4335' },
          { icon: '💳', name: 'PayPal',          status: 'Connect',   color: '#003087' },
        ].map((acc, i) => (
          <SettingRow
            key={i}
            icon={<div style={{ width: 36, height: 36, borderRadius: 10, background: acc.color + '20', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17 }}>{acc.icon}</div>}
            label={acc.name}
            last={i === 2}
            right={
              <span style={{
                color: acc.status === 'Connected' ? theme.primary : theme.textMuted,
                background: acc.status === 'Connected' ? theme.primaryAlpha : theme.surface2,
                fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 8,
              }}>{acc.status}</span>
            }
          />
        ))}
      </SettingGroup>

      {/* More options */}
      <SettingGroup label="More">
        <SettingRow icon="🔒" label="Privacy & Security" sub="Manage data access" right={React.createElement(window.lucide.ChevronRight, { size: 15, color: theme.textMuted })} />
        <SettingRow icon="📊" label="Export Data" sub="Download your bill history" right={React.createElement(window.lucide.ChevronRight, { size: 15, color: theme.textMuted })} />
        <SettingRow icon="❓" label="Help & Support" sub="Docs, contact us" last right={React.createElement(window.lucide.ChevronRight, { size: 15, color: theme.textMuted })} />
      </SettingGroup>

      <p style={{ color: theme.textDim, fontSize: 11, textAlign: 'center', margin: '4px 0 0' }}>BillBloom v2.1.4 · Pro Plan</p>
    </div>
  );
}

// ─── App Root ─────────────────────────────────────────────────────────────────
function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isDark, setIsDark] = useState(true);

  const theme = themes[isDark ? 'dark' : 'light'];

  const tabs = [
    { id: 'home',     label: 'Home',     icon: window.lucide.Home },
    { id: 'calendar', label: 'Calendar', icon: window.lucide.Calendar },
    { id: 'insights', label: 'Insights', icon: window.lucide.TrendingUp },
    { id: 'actions',  label: 'Actions',  icon: window.lucide.Zap },
    { id: 'settings', label: 'Settings', icon: window.lucide.Settings },
  ];

  const screens = {
    home:     HomeScreen,
    calendar: CalendarScreen,
    insights: InsightsScreen,
    actions:  ActionsScreen,
    settings: SettingsScreen,
  };

  const ActiveScreen = screens[activeTab];

  return (
    <div style={{
      minHeight: '100vh',
      background: theme.outerBg,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      transition: 'background 0.3s',
    }}>
      {/* Phone frame */}
      <div style={{
        width: 375, height: 812,
        background: theme.bg,
        borderRadius: 54,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex', flexDirection: 'column',
        boxShadow: isDark
          ? '0 40px 100px rgba(0,0,0,0.7), 0 0 0 1.5px rgba(255,255,255,0.08), inset 0 0 0 1px rgba(255,255,255,0.04)'
          : '0 30px 80px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.08)',
        transition: 'background 0.3s, box-shadow 0.3s',
      }}>
        {/* Status bar */}
        <StatusBar theme={theme} />

        {/* Screen content */}
        <div style={{ flex: 1, overflow: 'hidden' }}>
          <ActiveScreen theme={theme} isDark={isDark} toggleTheme={() => setIsDark(p => !p)} />
        </div>

        {/* Bottom nav */}
        <div style={{
          background: theme.navBg,
          borderTop: `1px solid ${theme.border}`,
          paddingBottom: 6,
          flexShrink: 0,
          transition: 'background 0.3s',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-around', padding: '8px 4px 2px' }}>
            {tabs.map(tab => React.createElement('div', {
              key: tab.id,
              onClick: () => setActiveTab(tab.id),
              style: {
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
                padding: '7px 10px', borderRadius: 14, cursor: 'pointer', minWidth: 52,
                background: activeTab === tab.id ? theme.primaryAlpha : 'transparent',
                transition: 'background 0.15s',
              },
            },
              React.createElement(tab.icon, {
                size: 21,
                color: activeTab === tab.id ? theme.primary : theme.textMuted,
                strokeWidth: activeTab === tab.id ? 2.5 : 1.8,
              }),
              React.createElement('span', {
                style: {
                  fontSize: 10, fontWeight: activeTab === tab.id ? 700 : 500,
                  color: activeTab === tab.id ? theme.primary : theme.textMuted,
                  transition: 'color 0.15s',
                },
              }, tab.label)
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
