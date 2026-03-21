const { useState, useEffect, useRef } = React;

// ─── THEME SYSTEM ─────────────────────────────────────────────────────────────
const themes = {
  dark: {
    bg: '#0C0F1A', surface: '#141826', surfaceAlt: '#1A2238', card: '#141826',
    text: '#EDF2FF', textSec: '#7A87AA', textMuted: '#3A456A',
    primary: '#00E5B8', primaryDim: 'rgba(0,229,184,0.13)', primaryBorder: 'rgba(0,229,184,0.28)',
    secondary: '#8B5CF6', secondaryDim: 'rgba(139,92,246,0.15)',
    accent: '#FF6B35', accentYellow: '#FFD166', accentGreen: '#06D6A0', accentRed: '#FF4757',
    border: '#1E2840', borderLight: '#252E4A', navBg: '#0C0F1A', notch: '#000',
  },
  light: {
    bg: '#F0F4FF', surface: '#FFFFFF', surfaceAlt: '#F5F7FF', card: '#FFFFFF',
    text: '#0E1428', textSec: '#5A667A', textMuted: '#9AA3B8',
    primary: '#00B899', primaryDim: 'rgba(0,184,153,0.1)', primaryBorder: 'rgba(0,184,153,0.3)',
    secondary: '#6644E0', secondaryDim: 'rgba(102,68,224,0.1)',
    accent: '#D4520F', accentYellow: '#B7870A', accentGreen: '#048A6E', accentRed: '#C53030',
    border: '#E4E9F4', borderLight: '#EDF1FA', navBg: '#FFFFFF', notch: '#1A1A1A',
  }
};

// ─── MOCK DATA ──────────────────────────────────────────────────────────────────
const LOANS = [
  { id: 1, item: 'Power Drill', emoji: '🔨', borrower: 'Alex K.', av: 'AK', daysLeft: 2, maxDays: 7, status: 'urgent', value: 85, category: 'Tools' },
  { id: 2, item: 'DSLR Tripod', emoji: '📷', borrower: 'Maya R.', av: 'MR', daysLeft: 5, maxDays: 14, status: 'ontrack', value: 60, category: 'Electronics' },
  { id: 3, item: 'Camping Tent', emoji: '⛺', borrower: 'Jordan M.', av: 'JM', daysLeft: -2, maxDays: 10, status: 'overdue', value: 120, category: 'Outdoor' },
  { id: 4, item: 'Kitchen Mixer', emoji: '🥣', borrower: 'Sam L.', av: 'SL', daysLeft: 8, maxDays: 10, status: 'ontrack', value: 95, category: 'Kitchen' },
  { id: 5, item: 'Projector', emoji: '📽️', borrower: 'Chris P.', av: 'CP', daysLeft: 1, maxDays: 5, status: 'urgent', value: 200, category: 'Electronics' },
];
const BORROWED = [
  { id: 6, item: 'Ladder', emoji: '🪜', from: 'Tom N.', daysLeft: 4, maxDays: 7 },
  { id: 7, item: 'Pasta Maker', emoji: '🍝', from: 'Sam L.', daysLeft: -1, maxDays: 5 },
];
const QUESTS = [
  { id: 1, type: 'reminder', title: 'Camping Tent is 2 days overdue', subtitle: 'Jordan still has it. Send a friendly nudge?', urgent: true, icon: 'Bell' },
  { id: 2, type: 'unlock', title: 'Trust Bonus Unlocked! +15 pts', subtitle: 'Alex returned the drill early. Your score just went up.', urgent: false, icon: 'Star' },
  { id: 3, type: 'quest', title: 'Weekly Return Quest', subtitle: 'Get 3 items back this week to earn a community bonus.', urgent: false, icon: 'Target' },
  { id: 4, type: 'reminder', title: 'Power Drill due tomorrow', subtitle: 'Remind Alex K. to return before Saturday noon.', urgent: true, icon: 'Clock' },
  { id: 5, type: 'milestone', title: 'Community Hit 50 Loans! 🎉', subtitle: 'Your group has logged 50 loans together.', urgent: false, icon: 'Award' },
];
const HISTORY = [
  { id: 1, item: 'Snow Shovel', emoji: '🪣', person: 'Tom N.', action: 'returned', onTime: true, date: 'Mar 18' },
  { id: 2, item: 'Extension Cord', emoji: '🔌', person: 'Alex K.', action: 'borrowed', onTime: true, date: 'Mar 17' },
  { id: 3, item: 'Board Games Set', emoji: '🎲', person: 'Maya R.', action: 'returned', onTime: false, date: 'Mar 15' },
  { id: 4, item: 'Portable Speaker', emoji: '🔊', person: 'Jordan M.', action: 'borrowed', onTime: true, date: 'Mar 12' },
  { id: 5, item: 'Yoga Mat', emoji: '🧘', person: 'Sam L.', action: 'returned', onTime: true, date: 'Mar 10' },
  { id: 6, item: 'Power Drill', emoji: '🔨', person: 'Chris P.', action: 'borrowed', onTime: true, date: 'Mar 8' },
];
const GROUPS = [
  { id: 1, name: 'Apartment 4B', type: 'home', members: 4, activeLoans: 6, emoji: '🏠', trust: 88 },
  { id: 2, name: 'Riverside Makers', type: 'club', members: 12, activeLoans: 14, emoji: '⚙️', trust: 92 },
  { id: 3, name: 'Oak St. Neighbors', type: 'neighborhood', members: 8, activeLoans: 3, emoji: '🌳', trust: 76 },
];

// ─── TRUST RING ───────────────────────────────────────────────────────────────
function TrustRing({ score, size, t }) {
  const r = (size - 8) / 2;
  const circ = 2 * Math.PI * r;
  const off = circ - (score / 100) * circ;
  const col = score >= 80 ? t.accentGreen : score >= 60 ? t.accentYellow : t.accentRed;
  return (
    <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={t.border} strokeWidth={4} />
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={col} strokeWidth={4}
          strokeDasharray={circ} strokeDashoffset={off} strokeLinecap="round" />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontSize: size < 48 ? 10 : 13, fontWeight: 700, color: col, lineHeight: 1 }}>{score}</span>
      </div>
    </div>
  );
}

// ─── BOARD SCREEN ─────────────────────────────────────────────────────────────
function BoardScreen({ t, themeKey }) {
  const [sel, setSel] = useState(null);
  const col = s => s === 'overdue' ? t.accentRed : s === 'urgent' ? t.accentYellow : t.accentGreen;
  const lbl = l => l.status === 'overdue' ? `${Math.abs(l.daysLeft)}d overdue` : l.daysLeft === 0 ? 'Due today' : `${l.daysLeft}d left`;
  const pct = l => l.daysLeft < 0 ? 100 : Math.max(4, ((l.maxDays - l.daysLeft) / l.maxDays) * 100);

  return (
    <div style={{ paddingBottom: 16 }}>
      {/* Header */}
      <div style={{ padding: '16px 20px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <p style={{ fontSize: 11, color: t.textSec, margin: 0, letterSpacing: 1.3, textTransform: 'uppercase', fontWeight: 600 }}>Loan Trail</p>
          <h1 style={{ fontSize: 26, fontWeight: 700, color: t.text, margin: '2px 0 0', lineHeight: 1.15 }}>Your Board</h1>
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <TrustRing score={84} size={44} t={t} />
            <div style={{ fontSize: 9, color: t.textSec, marginTop: 2 }}>Trust</div>
          </div>
          <button style={{ width: 36, height: 36, borderRadius: 10, background: t.primaryDim, border: `1px solid ${t.primaryBorder}`, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {React.createElement(window.lucide.Plus, { size: 18, color: t.primary })}
          </button>
        </div>
      </div>

      {/* Stats strip */}
      <div style={{ display: 'flex', gap: 8, padding: '0 20px 16px' }}>
        {[
          { label: 'Active', value: '5', icon: 'Package', color: t.primary },
          { label: 'Overdue', value: '1', icon: 'AlertCircle', color: t.accentRed },
          { label: 'Due Soon', value: '2', icon: 'Clock', color: t.accentYellow },
          { label: 'Returned', value: '31', icon: 'CheckCircle', color: t.accentGreen },
        ].map(s => (
          <div key={s.label} style={{ flex: 1, background: t.surface, borderRadius: 12, padding: '10px 4px', border: `1px solid ${t.border}`, textAlign: 'center' }}>
            {React.createElement(window.lucide[s.icon], { size: 14, color: s.color, style: { margin: '0 auto 3px', display: 'block' } })}
            <div style={{ fontSize: 18, fontWeight: 700, color: t.text, lineHeight: 1.1 }}>{s.value}</div>
            <div style={{ fontSize: 9, color: t.textSec, marginTop: 1 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Board trail label */}
      <div style={{ padding: '0 20px 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: t.textSec, textTransform: 'uppercase', letterSpacing: 1 }}>Active Loans</span>
        <span style={{ fontSize: 12, color: t.primary, fontWeight: 600 }}>See all →</span>
      </div>

      {/* Loan token cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: '0 20px' }}>
        {LOANS.map(loan => {
          const c = col(loan.status);
          const isOpen = sel === loan.id;
          return (
            <div key={loan.id} onClick={() => setSel(isOpen ? null : loan.id)}
              style={{ background: t.surface, borderRadius: 16, border: `1px solid ${isOpen ? c + '70' : t.border}`, padding: '14px', cursor: 'pointer', transition: 'border-color 0.2s, box-shadow 0.2s', boxShadow: isOpen ? `0 0 0 2px ${c}25, 0 4px 16px rgba(0,0,0,0.12)` : 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                {/* Emoji token */}
                <div style={{ width: 50, height: 50, borderRadius: 14, background: `${c}15`, border: `2px solid ${c}35`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0 }}>
                  {loan.emoji}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                    <span style={{ fontSize: 15, fontWeight: 600, color: t.text }}>{loan.item}</span>
                    <span style={{ fontSize: 11, fontWeight: 700, color: c, background: `${c}18`, padding: '2px 9px', borderRadius: 20 }}>{lbl(loan)}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                    <div style={{ width: 20, height: 20, borderRadius: 6, background: t.secondaryDim || t.border, border: `1px solid ${t.secondary}50`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, fontWeight: 700, color: t.secondary }}>
                      {loan.av}
                    </div>
                    <span style={{ fontSize: 12, color: t.textSec }}>{loan.borrower}</span>
                    <span style={{ fontSize: 11, color: t.textMuted }}>• ${loan.value}</span>
                    <span style={{ fontSize: 10, color: t.textMuted, marginLeft: 'auto', background: t.surfaceAlt, padding: '1px 6px', borderRadius: 6 }}>{loan.category}</span>
                  </div>
                  {/* Progress bar */}
                  <div style={{ height: 4, background: t.border, borderRadius: 2, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${pct(loan)}%`, background: c, borderRadius: 2, transition: 'width 0.4s ease' }} />
                  </div>
                </div>
              </div>
              {/* Expanded actions */}
              {isOpen && (
                <div style={{ marginTop: 12, paddingTop: 12, borderTop: `1px solid ${t.border}`, display: 'flex', gap: 8 }}>
                  <button style={{ flex: 1, padding: '8px', background: t.primaryDim, border: 'none', borderRadius: 10, color: t.primary, fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>📩 Send Nudge</button>
                  <button style={{ flex: 1, padding: '8px', background: t.surfaceAlt, border: 'none', borderRadius: 10, color: t.textSec, fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>✓ Returned</button>
                  <button style={{ padding: '8px 12px', background: t.surfaceAlt, border: 'none', borderRadius: 10, color: t.textSec, fontSize: 14, cursor: 'pointer', fontFamily: 'inherit' }}>⋯</button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── LOANS SCREEN ─────────────────────────────────────────────────────────────
function LoansScreen({ t }) {
  const [tab, setTab] = useState('lent');
  const items = tab === 'lent' ? LOANS : BORROWED;
  return (
    <div style={{ paddingBottom: 16 }}>
      <div style={{ padding: '16px 20px 12px' }}>
        <h1 style={{ fontSize: 26, fontWeight: 700, color: t.text, margin: 0 }}>Loans</h1>
        <p style={{ fontSize: 13, color: t.textSec, margin: '4px 0 0' }}>Track what you've lent and borrowed</p>
      </div>

      {/* Tab switcher */}
      <div style={{ display: 'flex', margin: '0 20px 16px', background: t.surface, borderRadius: 12, padding: 4, border: `1px solid ${t.border}` }}>
        {['lent', 'borrowed'].map(id => (
          <button key={id} onClick={() => setTab(id)}
            style={{ flex: 1, padding: '9px', border: 'none', borderRadius: 9, cursor: 'pointer', fontFamily: 'inherit', background: tab === id ? t.primary : 'transparent', color: tab === id ? '#fff' : t.textSec, fontWeight: tab === id ? 700 : 500, fontSize: 13, transition: 'all 0.2s' }}>
            {id === 'lent' ? `🏷️ Lent Out (${LOANS.length})` : `📦 Borrowed (${BORROWED.length})`}
          </button>
        ))}
      </div>

      {/* Add button */}
      <button style={{ width: 'calc(100% - 40px)', margin: '0 20px 16px', padding: '14px', background: t.primaryDim, border: `2px dashed ${t.primaryBorder}`, borderRadius: 16, color: t.primary, fontSize: 14, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontFamily: 'inherit' }}>
        {React.createElement(window.lucide.Plus, { size: 18 })}
        {tab === 'lent' ? 'Log a New Loan' : 'Record a Borrow'}
      </button>

      {/* Items */}
      <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {items.map((loan, i) => {
          const over = loan.daysLeft < 0;
          const urg = !over && loan.daysLeft <= 2;
          const c = over ? t.accentRed : urg ? t.accentYellow : t.accentGreen;
          return (
            <div key={i} style={{ background: t.surface, borderRadius: 14, padding: '14px', border: `1px solid ${t.border}`, display: 'flex', gap: 12, alignItems: 'center' }}>
              <div style={{ width: 48, height: 48, borderRadius: 13, background: `${c}15`, border: `2px solid ${c}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 23, flexShrink: 0 }}>{loan.emoji}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 600, color: t.text }}>{loan.item}</div>
                <div style={{ fontSize: 12, color: t.textSec, marginTop: 2 }}>{tab === 'lent' ? `→ ${loan.borrower}` : `← From ${loan.from}`}</div>
                <div style={{ marginTop: 7, height: 3, background: t.border, borderRadius: 2 }}>
                  <div style={{ height: '100%', width: `${loan.daysLeft < 0 ? 100 : Math.max(4, ((loan.maxDays - loan.daysLeft) / loan.maxDays) * 100)}%`, background: c, borderRadius: 2 }} />
                </div>
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, color: c, background: `${c}18`, padding: '4px 10px', borderRadius: 20, whiteSpace: 'nowrap' }}>
                {over ? `${Math.abs(loan.daysLeft)}d late` : `${loan.daysLeft}d left`}
              </div>
            </div>
          );
        })}
      </div>

      {/* Items tip */}
      <div style={{ margin: '16px 20px 0', padding: '12px 14px', background: t.surface, borderRadius: 14, border: `1px solid ${t.border}`, display: 'flex', gap: 10, alignItems: 'center' }}>
        {React.createElement(window.lucide.Info, { size: 16, color: t.primary })}
        <span style={{ fontSize: 12, color: t.textSec, flex: 1 }}>Items returned on time boost your Trust Score and unlock group perks.</span>
      </div>
    </div>
  );
}

// ─── QUESTS SCREEN ────────────────────────────────────────────────────────────
function QuestsScreen({ t }) {
  const [dismissed, setDismissed] = useState([]);
  const qColor = type => type === 'reminder' ? t.accentYellow : type === 'unlock' ? t.accentGreen : type === 'milestone' ? t.secondary : t.primary;
  const active = QUESTS.filter(q => !dismissed.includes(q.id));

  return (
    <div style={{ paddingBottom: 16 }}>
      <div style={{ padding: '16px 20px 12px' }}>
        <h1 style={{ fontSize: 26, fontWeight: 700, color: t.text, margin: 0 }}>Quests</h1>
        <p style={{ fontSize: 13, color: t.textSec, margin: '4px 0 0' }}>Missions, reminders, and rewards</p>
      </div>

      {/* Streak card */}
      <div style={{ margin: '0 20px 16px', borderRadius: 18, padding: '16px', background: `linear-gradient(135deg, ${t.secondary}22 0%, ${t.primary}15 100%)`, border: `1px solid ${t.primaryBorder}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
          <div>
            <div style={{ fontSize: 12, color: t.textSec, marginBottom: 4, fontWeight: 500 }}>🔥 Trust Streak</div>
            <div style={{ fontSize: 30, fontWeight: 700, color: t.text, lineHeight: 1 }}>12 days</div>
            <div style={{ fontSize: 12, color: t.accentGreen, fontWeight: 600, marginTop: 4 }}>All returns on time!</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <TrustRing score={84} size={54} t={t} />
            <div style={{ fontSize: 10, color: t.textSec, marginTop: 2 }}>Trust Score</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 5 }}>
          {['M','T','W','T','F','S','S'].map((d, i) => (
            <div key={i} style={{ flex: 1, textAlign: 'center' }}>
              <div style={{ paddingTop: '100%', position: 'relative', borderRadius: 6, overflow: 'hidden', background: i < 5 ? t.primary : t.border }}>
                {i < 5 && <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10 }}>✓</div>}
              </div>
              <div style={{ fontSize: 9, color: t.textMuted, marginTop: 3 }}>{d}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: '0 20px 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: t.textSec, textTransform: 'uppercase', letterSpacing: 1 }}>Active Missions</span>
        <span style={{ fontSize: 12, color: t.primary, fontWeight: 600 }}>{active.length} active</span>
      </div>

      <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {active.map(q => {
          const c = qColor(q.type);
          return (
            <div key={q.id} style={{ background: t.surface, borderRadius: 14, padding: '14px', border: `1px solid ${q.urgent ? c + '55' : t.border}`, display: 'flex', gap: 12, alignItems: 'flex-start', boxShadow: q.urgent ? `0 0 0 1px ${c}20` : 'none' }}>
              <div style={{ width: 42, height: 42, borderRadius: 12, background: `${c}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {React.createElement(window.lucide[q.icon], { size: 18, color: c })}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: t.text, marginBottom: 3 }}>{q.title}</div>
                <div style={{ fontSize: 12, color: t.textSec, lineHeight: 1.4 }}>{q.subtitle}</div>
                {q.urgent && (
                  <button style={{ marginTop: 10, padding: '6px 14px', background: c, border: 'none', borderRadius: 20, fontSize: 11, fontWeight: 700, color: '#000', cursor: 'pointer', fontFamily: 'inherit' }}>
                    Take Action →
                  </button>
                )}
                {q.type === 'quest' && (
                  <div style={{ marginTop: 8 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <span style={{ fontSize: 10, color: t.textSec }}>Progress</span>
                      <span style={{ fontSize: 10, color: c, fontWeight: 600 }}>1 / 3</span>
                    </div>
                    <div style={{ height: 4, background: t.border, borderRadius: 2 }}>
                      <div style={{ height: '100%', width: '33%', background: c, borderRadius: 2 }} />
                    </div>
                  </div>
                )}
              </div>
              <button onClick={e => { e.stopPropagation(); setDismissed(d => [...d, q.id]); }}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, flexShrink: 0 }}>
                {React.createElement(window.lucide.X, { size: 14, color: t.textMuted })}
              </button>
            </div>
          );
        })}
        {active.length === 0 && (
          <div style={{ textAlign: 'center', padding: '32px 16px', color: t.textSec }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>🎉</div>
            <div style={{ fontSize: 14, fontWeight: 600, color: t.text }}>All clear!</div>
            <div style={{ fontSize: 12, marginTop: 4 }}>No active missions right now.</div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── COMMUNITY SCREEN ─────────────────────────────────────────────────────────
function CommunityScreen({ t }) {
  const [expandedGroup, setExpandedGroup] = useState(null);
  return (
    <div style={{ paddingBottom: 16 }}>
      <div style={{ padding: '16px 20px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 700, color: t.text, margin: 0 }}>Groups</h1>
          <p style={{ fontSize: 13, color: t.textSec, margin: '4px 0 0' }}>Your sharing communities</p>
        </div>
        <button style={{ width: 36, height: 36, borderRadius: 10, background: t.primaryDim, border: `1px solid ${t.primaryBorder}`, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {React.createElement(window.lucide.Plus, { size: 18, color: t.primary })}
        </button>
      </div>

      <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {GROUPS.map(g => {
          const isOpen = expandedGroup === g.id;
          return (
            <div key={g.id} onClick={() => setExpandedGroup(isOpen ? null : g.id)}
              style={{ background: t.surface, borderRadius: 18, padding: '16px', border: `1px solid ${isOpen ? t.primaryBorder : t.border}`, cursor: 'pointer', transition: 'border-color 0.2s' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 48, height: 48, borderRadius: 14, background: t.surfaceAlt, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, border: `1px solid ${t.border}` }}>{g.emoji}</div>
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: t.text }}>{g.name}</div>
                    <div style={{ fontSize: 12, color: t.textSec, marginTop: 2, textTransform: 'capitalize' }}>{g.members} members · {g.type}</div>
                  </div>
                </div>
                <TrustRing score={g.trust} size={42} t={t} />
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                {[{ l: 'Active Loans', v: g.activeLoans }, { l: 'Members', v: g.members }, { l: 'Trust', v: `${g.trust}%` }].map(s => (
                  <div key={s.l} style={{ flex: 1, background: t.surfaceAlt, borderRadius: 10, padding: '8px 4px', textAlign: 'center' }}>
                    <div style={{ fontSize: 16, fontWeight: 700, color: t.text }}>{s.v}</div>
                    <div style={{ fontSize: 9, color: t.textSec, marginTop: 1 }}>{s.l}</div>
                  </div>
                ))}
              </div>
              {isOpen && (
                <div style={{ marginTop: 12, paddingTop: 12, borderTop: `1px solid ${t.border}`, display: 'flex', gap: 8 }}>
                  <button style={{ flex: 1, padding: '8px', background: t.primaryDim, border: 'none', borderRadius: 10, color: t.primary, fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Open Board</button>
                  <button style={{ flex: 1, padding: '8px', background: t.surfaceAlt, border: 'none', borderRadius: 10, color: t.textSec, fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Invite +</button>
                </div>
              )}
            </div>
          );
        })}

        <button style={{ width: '100%', padding: '18px 0', background: 'transparent', border: `2px dashed ${t.border}`, borderRadius: 16, cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, fontFamily: 'inherit' }}>
          {React.createElement(window.lucide.Plus, { size: 20, color: t.textSec })}
          <span style={{ fontSize: 14, color: t.textSec, fontWeight: 500 }}>Join or create a group</span>
          <span style={{ fontSize: 11, color: t.textMuted }}>Invite via link or board code</span>
        </button>
      </div>

      <div style={{ padding: '16px 20px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: t.textSec, textTransform: 'uppercase', letterSpacing: 1 }}>Recent Activity</span>
          <span style={{ fontSize: 12, color: t.primary, fontWeight: 600 }}>See all →</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {HISTORY.slice(0, 4).map(h => (
            <div key={h.id} style={{ display: 'flex', alignItems: 'center', gap: 10, background: t.surface, borderRadius: 12, padding: '10px 12px', border: `1px solid ${t.border}` }}>
              <span style={{ fontSize: 18 }}>{h.emoji}</span>
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: t.text }}>{h.person} </span>
                <span style={{ fontSize: 13, color: t.textSec }}>{h.action} {h.item}</span>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: h.onTime ? t.accentGreen : t.accentRed }}>{h.onTime ? '✓ On Time' : '⚠ Late'}</div>
                <div style={{ fontSize: 10, color: t.textMuted }}>{h.date}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── PROFILE SCREEN ───────────────────────────────────────────────────────────
function ProfileScreen({ t, themeKey, setThemeKey }) {
  return (
    <div style={{ paddingBottom: 24 }}>
      {/* Hero */}
      <div style={{ padding: '16px 20px 20px', background: `linear-gradient(160deg, ${t.secondary}28 0%, ${t.primary}12 100%)` }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
          <button onClick={() => setThemeKey(k => k === 'dark' ? 'light' : 'dark')}
            style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 20, padding: '6px 14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 7, fontFamily: 'inherit' }}>
            {React.createElement(themeKey === 'dark' ? window.lucide.Sun : window.lucide.Moon, { size: 14, color: t.text })}
            <span style={{ fontSize: 12, color: t.text, fontWeight: 500 }}>{themeKey === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 68, height: 68, borderRadius: 20, background: `linear-gradient(135deg, ${t.secondary}, ${t.primary})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 30, flexShrink: 0 }}>👤</div>
          <div style={{ flex: 1 }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: t.text, margin: 0 }}>Maya Rodriguez</h2>
            <p style={{ fontSize: 13, color: t.textSec, margin: '2px 0 6px' }}>@maya_r · 3 groups</p>
            <div style={{ display: 'flex', gap: 6 }}>
              <span style={{ fontSize: 11, color: t.primary, fontWeight: 600, background: t.primaryDim, padding: '2px 8px', borderRadius: 10 }}>⭐ Top Lender</span>
              <span style={{ fontSize: 11, color: t.accentGreen, fontWeight: 600, background: `${t.accentGreen}15`, padding: '2px 8px', borderRadius: 10 }}>🔥 12-Day Streak</span>
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <TrustRing score={84} size={52} t={t} />
            <div style={{ fontSize: 10, color: t.textSec, marginTop: 2 }}>Trust</div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'flex', gap: 10, padding: '16px 20px 0' }}>
        {[{ l: 'Loans Given', v: '34', e: '📤' }, { l: 'On-Time Rate', v: '97%', e: '✅' }, { l: 'Items Listed', v: '18', e: '📦' }].map(s => (
          <div key={s.l} style={{ flex: 1, background: t.surface, borderRadius: 14, padding: '12px 8px', border: `1px solid ${t.border}`, textAlign: 'center' }}>
            <div style={{ fontSize: 22, marginBottom: 4 }}>{s.e}</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: t.text }}>{s.v}</div>
            <div style={{ fontSize: 10, color: t.textSec, marginTop: 2 }}>{s.l}</div>
          </div>
        ))}
      </div>

      {/* History */}
      <div style={{ padding: '16px 20px 0' }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: t.textSec, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10 }}>Loan History</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
          {HISTORY.map(h => (
            <div key={h.id} style={{ display: 'flex', alignItems: 'center', gap: 10, background: t.surface, borderRadius: 12, padding: '10px 12px', border: `1px solid ${t.border}` }}>
              <span style={{ fontSize: 18 }}>{h.emoji}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: t.text }}>{h.item}</div>
                <div style={{ fontSize: 11, color: t.textSec }}>{h.action} by {h.person}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: h.onTime ? t.accentGreen : t.accentRed, background: h.onTime ? `${t.accentGreen}15` : `${t.accentRed}15`, padding: '2px 8px', borderRadius: 20 }}>{h.onTime ? 'On Time' : 'Late'}</div>
                <div style={{ fontSize: 10, color: t.textMuted, marginTop: 2 }}>{h.date}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Settings */}
        <div style={{ fontSize: 11, fontWeight: 700, color: t.textSec, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10 }}>Settings</div>
        {[
          { l: 'Notifications', i: 'Bell', v: 'On' },
          { l: 'Privacy', i: 'Lock', v: 'Friends only' },
          { l: 'Reminders', i: 'Clock', v: '1 day prior' },
          { l: 'About BorrowBoard', i: 'Info', v: 'v1.0.0' },
        ].map(item => (
          <div key={item.l} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '13px 0', borderBottom: `1px solid ${t.border}`, cursor: 'pointer' }}>
            {React.createElement(window.lucide[item.i], { size: 18, color: t.textSec })}
            <span style={{ flex: 1, fontSize: 14, color: t.text }}>{item.l}</span>
            <span style={{ fontSize: 13, color: t.textSec }}>{item.v}</span>
            {React.createElement(window.lucide.ChevronRight, { size: 16, color: t.textMuted })}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
function App() {
  const [themeKey, setThemeKey] = useState('dark');
  const [activeTab, setActiveTab] = useState('board');
  const t = themes[themeKey];

  useEffect(() => {
    const el = document.createElement('style');
    el.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      .bb-scroll::-webkit-scrollbar { display: none; }
      .bb-scroll { -ms-overflow-style: none; scrollbar-width: none; }
      body { background: #080A10; }
    `;
    document.head.appendChild(el);
  }, []);

  const navItems = [
    { id: 'board', label: 'Board', icon: 'LayoutGrid' },
    { id: 'loans', label: 'Loans', icon: 'ArrowLeftRight' },
    { id: 'quests', label: 'Quests', icon: 'Zap' },
    { id: 'community', label: 'Groups', icon: 'Users' },
    { id: 'profile', label: 'Profile', icon: 'User' },
  ];

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#080A10', fontFamily: "'Space Grotesk', sans-serif" }}>
      <div style={{ width: 375, height: 812, background: t.bg, borderRadius: 50, overflow: 'hidden', position: 'relative', boxShadow: '0 50px 100px rgba(0,0,0,0.85), inset 0 0 0 1px rgba(255,255,255,0.07)', display: 'flex', flexDirection: 'column', fontFamily: "'Space Grotesk', sans-serif" }}>

        {/* Status bar */}
        <div style={{ height: 50, background: t.bg, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 26px', flexShrink: 0, position: 'relative', zIndex: 1 }}>
          <div style={{ position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)', width: 120, height: 32, background: t.notch, borderRadius: 20, zIndex: 2 }} />
          <span style={{ fontSize: 14, fontWeight: 600, color: t.text, zIndex: 3 }}>9:41</span>
          <div style={{ display: 'flex', gap: 5, alignItems: 'center', zIndex: 3 }}>
            {React.createElement(window.lucide.Signal, { size: 14, color: t.text })}
            {React.createElement(window.lucide.Wifi, { size: 14, color: t.text })}
            {React.createElement(window.lucide.Battery, { size: 16, color: t.text })}
          </div>
        </div>

        {/* Screen content */}
        <div className="bb-scroll" style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
          {activeTab === 'board' && <BoardScreen t={t} themeKey={themeKey} />}
          {activeTab === 'loans' && <LoansScreen t={t} />}
          {activeTab === 'quests' && <QuestsScreen t={t} />}
          {activeTab === 'community' && <CommunityScreen t={t} />}
          {activeTab === 'profile' && <ProfileScreen t={t} themeKey={themeKey} setThemeKey={setThemeKey} />}
        </div>

        {/* Bottom Nav */}
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', padding: '8px 0 14px', borderTop: `1px solid ${t.border}`, background: t.navBg, flexShrink: 0 }}>
          {navItems.map(item => {
            const isActive = activeTab === item.id;
            const Icon = window.lucide[item.icon];
            return (
              <button key={item.id} onClick={() => setActiveTab(item.id)}
                style={{ background: 'none', border: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, cursor: 'pointer', padding: '4px 10px', fontFamily: "'Space Grotesk', sans-serif" }}>
                <div style={{ width: 38, height: 28, borderRadius: 10, background: isActive ? t.primaryDim : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s' }}>
                  {React.createElement(Icon, { size: 20, color: isActive ? t.primary : t.textMuted })}
                </div>
                <span style={{ fontSize: 10, fontWeight: isActive ? 700 : 400, color: isActive ? t.primary : t.textMuted }}>{item.label}</span>
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
}
