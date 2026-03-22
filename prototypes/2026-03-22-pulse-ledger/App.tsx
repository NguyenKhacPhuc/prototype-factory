const { useState, useEffect, useRef } = React;

const themes = {
  dark: {
    bg: '#080C14',
    surface: '#0F1623',
    card: '#161F30',
    cardAlt: '#1A2640',
    border: '#1E2E47',
    accent: '#00E5A0',
    accentDim: '#00E5A020',
    accentMid: '#00E5A040',
    accentText: '#00E5A0',
    warn: '#FF6B6B',
    warnDim: '#FF6B6B20',
    gold: '#FFB347',
    goldDim: '#FFB34720',
    blue: '#5B8DEF',
    blueDim: '#5B8DEF20',
    text: '#F0F4FF',
    textSub: '#8B9CC7',
    textMuted: '#4A5A7A',
    navBg: '#0C1220',
    navBorder: '#1A2640',
    statusBar: '#080C14',
  },
  light: {
    bg: '#EFF2F8',
    surface: '#FFFFFF',
    card: '#FFFFFF',
    cardAlt: '#F5F7FC',
    border: '#E2E8F4',
    accent: '#00B882',
    accentDim: '#00B88215',
    accentMid: '#00B88230',
    accentText: '#00916A',
    warn: '#E5484D',
    warnDim: '#E5484D15',
    gold: '#D97706',
    goldDim: '#D9770615',
    blue: '#3B6FD4',
    blueDim: '#3B6FD415',
    text: '#0F172A',
    textSub: '#475569',
    textMuted: '#94A3B8',
    navBg: '#FFFFFF',
    navBorder: '#E2E8F4',
    statusBar: '#FFFFFF',
  }
};

function App() {
  const [theme, setTheme] = useState('dark');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [pressedBtn, setPressedBtn] = useState(null);
  const [logModal, setLogModal] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [whatIfScenario, setWhatIfScenario] = useState(null);
  const [eodVisible, setEodVisible] = useState(false);
  const [pulse, setPulse] = useState(false);

  const t = themes[theme];

  useEffect(() => {
    const interval = setInterval(() => setPulse(p => !p), 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
      * { box-sizing: border-box; margin: 0; padding: 0; }
      ::-webkit-scrollbar { width: 0px; }
      body { background: #1a1a2e; display: flex; justify-content: center; align-items: center; min-height: 100vh; font-family: 'Space Grotesk', sans-serif; }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const press = (id, fn) => {
    setPressedBtn(id);
    setTimeout(() => { setPressedBtn(null); if (fn) fn(); }, 150);
  };

  const btnStyle = (id, base = {}) => ({
    ...base,
    transform: pressedBtn === id ? 'scale(0.95)' : 'scale(1)',
    transition: 'all 0.15s ease',
    cursor: 'pointer',
  });

  const Icon = ({ name, size = 20, color, strokeWidth = 1.8 }) => {
    const LucideIcon = window.lucide && window.lucide[name];
    if (!LucideIcon) return null;
    return React.createElement(LucideIcon, { size, color: color || t.text, strokeWidth });
  };

  // ─── DATA ────────────────────────────────────────────────────────────────────
  const clients = [
    { name: 'Acme Corp', margin: 82, revenue: 4200, hours: 12, color: t.accent, status: 'healthy' },
    { name: 'Studio Bloom', margin: 51, revenue: 1800, hours: 14, color: t.gold, status: 'warn' },
    { name: 'Nexus Health', margin: 34, revenue: 960, hours: 11, color: t.warn, status: 'danger' },
    { name: 'Drift Labs', margin: 71, revenue: 3100, hours: 18, color: t.blue, status: 'healthy' },
  ];

  const activities = [
    { id: 1, type: 'Call', label: 'Revision call — Acme Corp', time: '9:30 AM', duration: 90, impact: -340, tag: 'drain' },
    { id: 2, type: 'Task', label: 'Brand deck v3 — Studio Bloom', time: '11:00 AM', duration: 45, impact: +210, tag: 'gain' },
    { id: 3, type: 'Meeting', label: 'Kickoff — Drift Labs', time: '2:00 PM', duration: 60, impact: +480, tag: 'gain' },
    { id: 4, type: 'Expense', label: 'Adobe CC subscription', time: '3:15 PM', duration: 0, impact: -54, tag: 'expense' },
    { id: 5, type: 'Task', label: 'Rush logo — Nexus Health', time: '4:30 PM', duration: 120, impact: +120, tag: 'warn' },
  ];

  const insights = [
    { id: 1, severity: 'danger', icon: 'TrendingDown', title: 'Nexus Health cutting margin in half', body: 'You\'ve logged 11 hrs this month at ~$87/hr effective. Your target is $180/hr. Revision requests have doubled.', action: 'Renegotiate scope', color: t.warn },
    { id: 2, severity: 'warn', icon: 'Clock', title: '90-min revision cycles cost you $340', body: 'Acme Corp\'s revision loops average 3.2 per project. Adding a 2-revision cap would recover ~$1,020/month.', action: 'Add revision cap', color: t.gold },
    { id: 3, severity: 'info', icon: 'Zap', title: 'Rush jobs profit 2x with Maya assigned', body: 'Last 8 rush jobs: avg margin 67% when Maya handles delivery vs 29% when you do. Consider routing all rush work.', action: 'Update workflow', color: t.blue },
    { id: 4, severity: 'gain', icon: 'TrendingUp', title: 'Drift Labs retainer worth scaling', body: 'At current pace, Drift Labs generates $172/hr effective — your best client. A 20% retainer increase = +$620/mo.', action: 'Propose increase', color: t.accent },
  ];

  const scenarios = [
    { id: 'rush', label: 'Add rush fee (+30%)', delta: '+$1,240/mo', desc: 'Based on 4 avg rush jobs/mo', color: t.accent },
    { id: 'meetings', label: 'Cut weekly meetings by half', delta: '+$680/mo', desc: 'Recover ~8hrs, redirect to billable', color: t.blue },
    { id: 'retainer', label: 'Raise Acme retainer 20%', delta: '+$840/mo', desc: 'Increases effective rate to $198/hr', color: t.gold },
    { id: 'hire', label: 'Hire part-time contractor', delta: '-$400/mo net', desc: 'Breaks even at 6 additional projects', color: t.warn },
    { id: 'minimum', label: 'Set $2K minimum engagement', delta: '+$2,100/mo', desc: 'Drops 2 low-margin clients, gains capacity', color: t.accent },
  ];

  // ─── SCREENS ─────────────────────────────────────────────────────────────────

  const DashboardScreen = () => {
    const todayNet = 416;
    const weekNet = 2840;
    const monthNet = 9840;
    const [view, setView] = useState('today');

    const bars = [65, 80, 45, 90, 72, 55, 88];
    const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
    const todayIdx = 4;

    return (
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 80 }}>
        {/* Header */}
        <div style={{ padding: '16px 20px 0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: 12, color: t.textMuted, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Sunday, Mar 22</div>
              <div style={{ fontSize: 22, fontWeight: 700, color: t.text, marginTop: 2 }}>Live P&L</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{
                width: 8, height: 8, borderRadius: 4,
                background: pulse ? t.accent : t.accentMid,
                boxShadow: pulse ? `0 0 8px ${t.accent}` : 'none',
                transition: 'all 0.6s ease'
              }} />
              <span style={{ fontSize: 11, color: t.textSub, fontWeight: 500 }}>LIVE</span>
            </div>
          </div>

          {/* Period Toggle */}
          <div style={{ display: 'flex', background: t.surface, borderRadius: 10, padding: 3, marginTop: 16, border: `1px solid ${t.border}` }}>
            {['today', 'week', 'month'].map(p => (
              <div key={p} onClick={() => setView(p)} style={{
                flex: 1, textAlign: 'center', padding: '7px 0', borderRadius: 8, cursor: 'pointer',
                background: view === p ? t.accent : 'transparent',
                color: view === p ? '#000' : t.textSub,
                fontSize: 12, fontWeight: 600, transition: 'all 0.2s ease',
                textTransform: 'capitalize'
              }}>{p}</div>
            ))}
          </div>
        </div>

        {/* Main P&L Card */}
        <div style={{ margin: '16px 20px 0', background: t.card, borderRadius: 20, border: `1px solid ${t.border}`, overflow: 'hidden' }}>
          <div style={{ padding: '20px 20px 16px', background: `linear-gradient(135deg, ${t.accentDim}, transparent)` }}>
            <div style={{ fontSize: 12, color: t.textSub, fontWeight: 500 }}>Net Profit · {view === 'today' ? 'Today' : view === 'week' ? 'This Week' : 'This Month'}</div>
            <div style={{ fontSize: 42, fontWeight: 700, color: t.accent, marginTop: 4, letterSpacing: '-1px' }}>
              ${view === 'today' ? '416' : view === 'week' ? '2,840' : '9,840'}
            </div>
            <div style={{ display: 'flex', gap: 4, alignItems: 'center', marginTop: 4 }}>
              <Icon name="TrendingUp" size={14} color={t.accent} />
              <span style={{ fontSize: 12, color: t.accent, fontWeight: 600 }}>+12.4% vs last {view}</span>
            </div>
          </div>
          <div style={{ display: 'flex', borderTop: `1px solid ${t.border}` }}>
            {[
              { label: 'Revenue', value: view === 'today' ? '$960' : view === 'week' ? '$5,200' : '$18,400', color: t.accent },
              { label: 'Expenses', value: view === 'today' ? '$544' : view === 'week' ? '$2,360' : '$8,560', color: t.warn },
              { label: 'Eff. Rate', value: view === 'today' ? '$128/hr' : view === 'week' ? '$142/hr' : '$138/hr', color: t.blue },
            ].map((m, i) => (
              <div key={i} style={{ flex: 1, padding: '14px 12px', borderLeft: i > 0 ? `1px solid ${t.border}` : 'none' }}>
                <div style={{ fontSize: 11, color: t.textMuted, fontWeight: 500 }}>{m.label}</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: m.color, marginTop: 3 }}>{m.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Bar Chart */}
        <div style={{ margin: '16px 20px 0', background: t.card, borderRadius: 20, border: `1px solid ${t.border}`, padding: '16px 20px' }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: t.text, marginBottom: 16 }}>Weekly Profit Trend</div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 70 }}>
            {bars.map((h, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <div style={{
                  width: '100%', height: `${h}%`, borderRadius: '4px 4px 0 0',
                  background: i === todayIdx
                    ? `linear-gradient(180deg, ${t.accent}, ${t.accentMid})`
                    : i < todayIdx ? t.accentDim : t.border,
                  border: i === todayIdx ? `1px solid ${t.accent}` : 'none',
                  transition: 'all 0.3s ease'
                }} />
                <span style={{ fontSize: 10, color: i === todayIdx ? t.accent : t.textMuted, fontWeight: i === todayIdx ? 700 : 400 }}>{days[i]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Client Snapshot */}
        <div style={{ margin: '16px 20px 0' }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: t.text, marginBottom: 12 }}>Client Margins</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {clients.map((c, i) => (
              <div key={i} style={{ background: t.card, borderRadius: 16, padding: '14px 16px', border: `1px solid ${c.status === 'danger' ? t.warn + '40' : t.border}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 32, height: 32, borderRadius: 10, background: c.color + '20', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: c.color }}>{c.name[0]}</span>
                    </div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: t.text }}>{c.name}</div>
                      <div style={{ fontSize: 11, color: t.textMuted }}>{c.hours}h logged · ${c.revenue.toLocaleString()}</div>
                    </div>
                  </div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: c.color }}>{c.margin}%</div>
                </div>
                <div style={{ height: 5, background: t.border, borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${c.margin}%`, background: `linear-gradient(90deg, ${c.color}80, ${c.color})`, borderRadius: 3, transition: 'width 0.5s ease' }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* EOD Recap Button */}
        <div style={{ margin: '20px 20px 0' }}>
          <div onClick={() => { press('eod'); setEodVisible(true); }} style={btnStyle('eod', {
            background: `linear-gradient(135deg, ${t.accent}, #00C9A7)`,
            borderRadius: 16, padding: '16px 20px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer'
          })}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name="Sunset" size={20} color="#000" />
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#000' }}>End-of-Day Recap</div>
                <div style={{ fontSize: 12, color: 'rgba(0,0,0,0.6)' }}>One tap summary ready</div>
              </div>
            </div>
            <Icon name="ChevronRight" size={20} color="#000" />
          </div>
        </div>
      </div>
    );
  };

  const ActivityScreen = () => {
    const [logType, setLogType] = useState('Call');
    const types = ['Call', 'Task', 'Meeting', 'Expense'];

    return (
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 80 }}>
        <div style={{ padding: '16px 20px 0' }}>
          <div style={{ fontSize: 22, fontWeight: 700, color: t.text }}>Activity Log</div>
          <div style={{ fontSize: 13, color: t.textSub, marginTop: 2 }}>Today's tracked work</div>
        </div>

        {/* Quick Log */}
        <div style={{ margin: '16px 20px 0', background: t.card, borderRadius: 20, border: `1px solid ${t.border}`, padding: 16 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: t.textMuted, marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Quick Log</div>
          <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
            {types.map(tp => (
              <div key={tp} onClick={() => setLogType(tp)} style={{
                padding: '7px 12px', borderRadius: 10, cursor: 'pointer',
                background: logType === tp ? t.accent : t.cardAlt,
                color: logType === tp ? '#000' : t.textSub,
                fontSize: 12, fontWeight: 600, transition: 'all 0.2s ease',
                border: `1px solid ${logType === tp ? t.accent : t.border}`
              }}>{tp}</div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <div style={{ flex: 1, background: t.cardAlt, borderRadius: 12, padding: '12px 14px', border: `1px solid ${t.border}` }}>
              <span style={{ fontSize: 13, color: t.textMuted }}>e.g. "Client revision call, 45 min"</span>
            </div>
            <div onClick={() => press('log-submit')} style={btnStyle('log-submit', {
              width: 44, height: 44, borderRadius: 13, background: t.accent,
              display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0
            })}>
              <Icon name="Plus" size={20} color="#000" strokeWidth={2.5} />
            </div>
          </div>
        </div>

        {/* Today's Activities */}
        <div style={{ margin: '20px 20px 0' }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: t.text, marginBottom: 12 }}>Today · {activities.reduce((s, a) => s + (a.impact > 0 ? a.impact : 0), 0).toLocaleString()} earned</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {activities.map((a, i) => {
              const tagColor = a.tag === 'gain' ? t.accent : a.tag === 'expense' ? t.warn : a.tag === 'warn' ? t.gold : t.warn;
              const tagBg = a.tag === 'gain' ? t.accentDim : a.tag === 'expense' ? t.warnDim : a.tag === 'warn' ? t.goldDim : t.warnDim;
              const typeIcon = a.type === 'Call' ? 'Phone' : a.type === 'Task' ? 'CheckSquare' : a.type === 'Meeting' ? 'Users' : 'CreditCard';
              return (
                <div key={a.id} onClick={() => setSelectedActivity(a)} style={{
                  background: t.card, borderRadius: 16, padding: '14px 16px',
                  border: `1px solid ${t.border}`, cursor: 'pointer', transition: 'all 0.15s ease'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 38, height: 38, borderRadius: 12, background: tagBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Icon name={typeIcon} size={18} color={tagColor} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: t.text, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{a.label}</div>
                      <div style={{ fontSize: 11, color: t.textMuted, marginTop: 2 }}>{a.time} {a.duration > 0 ? `· ${a.duration}min` : ''}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: a.impact > 0 ? t.accent : t.warn }}>
                        {a.impact > 0 ? '+' : ''}${Math.abs(a.impact)}
                      </div>
                      <div style={{ fontSize: 10, color: t.textMuted }}>{a.type}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Today Summary */}
        <div style={{ margin: '20px 20px 0', background: t.accentDim, borderRadius: 20, border: `1px solid ${t.accentMid}`, padding: '16px 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <Icon name="Sparkles" size={16} color={t.accent} />
            <span style={{ fontSize: 13, fontWeight: 700, color: t.accent }}>AI Insight</span>
          </div>
          <div style={{ fontSize: 13, color: t.text, lineHeight: 1.6 }}>
            The 90-min Acme Corp revision call cut your effective hourly rate to <span style={{ color: t.warn, fontWeight: 600 }}>$68/hr</span>. Adding a 2-revision policy would recover <span style={{ color: t.accent, fontWeight: 600 }}>$340 today alone</span>.
          </div>
        </div>
      </div>
    );
  };

  const InsightsScreen = () => {
    const [activeFilter, setActiveFilter] = useState('all');
    const filters = ['all', 'danger', 'warn', 'gain'];

    const filtered = activeFilter === 'all' ? insights : insights.filter(i => i.severity === activeFilter);

    return (
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 80 }}>
        <div style={{ padding: '16px 20px 0' }}>
          <div style={{ fontSize: 22, fontWeight: 700, color: t.text }}>Insights</div>
          <div style={{ fontSize: 13, color: t.textSub, marginTop: 2 }}>What's making (and costing) you money</div>
        </div>

        {/* Score Card */}
        <div style={{ margin: '16px 20px 0', background: t.card, borderRadius: 20, border: `1px solid ${t.border}`, padding: '18px 20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 12, color: t.textMuted, fontWeight: 500 }}>Business Health Score</div>
              <div style={{ fontSize: 38, fontWeight: 700, color: t.gold, marginTop: 4 }}>72</div>
              <div style={{ fontSize: 12, color: t.textSub, marginTop: 2 }}>3 issues to address</div>
            </div>
            <div style={{ position: 'relative', width: 80, height: 80 }}>
              <svg width="80" height="80" viewBox="0 0 80 80">
                <circle cx="40" cy="40" r="34" fill="none" stroke={t.border} strokeWidth="8" />
                <circle cx="40" cy="40" r="34" fill="none" stroke={t.gold} strokeWidth="8"
                  strokeDasharray={`${2 * Math.PI * 34 * 0.72} ${2 * Math.PI * 34}`}
                  strokeDashoffset={2 * Math.PI * 34 * 0.25}
                  strokeLinecap="round" />
              </svg>
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: 16, fontWeight: 700, color: t.gold }}>72</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
            {[{ label: '2 Flags', color: t.warn }, { label: '1 Warning', color: t.gold }, { label: '1 Opportunity', color: t.accent }].map((b, i) => (
              <div key={i} style={{ flex: 1, textAlign: 'center', padding: '7px 6px', borderRadius: 10, background: b.color + '15', border: `1px solid ${b.color + '30'}` }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: b.color }}>{b.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Filter */}
        <div style={{ padding: '16px 20px 0', display: 'flex', gap: 8 }}>
          {filters.map(f => (
            <div key={f} onClick={() => setActiveFilter(f)} style={{
              padding: '7px 14px', borderRadius: 10, cursor: 'pointer',
              background: activeFilter === f ? t.accent : t.surface,
              color: activeFilter === f ? '#000' : t.textSub,
              fontSize: 12, fontWeight: 600, transition: 'all 0.2s ease',
              border: `1px solid ${activeFilter === f ? t.accent : t.border}`,
              textTransform: 'capitalize'
            }}>{f}</div>
          ))}
        </div>

        {/* Insight Cards */}
        <div style={{ margin: '14px 20px 0', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {filtered.map((ins, i) => (
            <div key={ins.id} style={{ background: t.card, borderRadius: 20, border: `1px solid ${ins.color + '30'}`, overflow: 'hidden' }}>
              <div style={{ padding: '16px 16px 12px', borderBottom: `1px solid ${t.border}` }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                  <div style={{ width: 38, height: 38, borderRadius: 12, background: ins.color + '20', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                    <Icon name={ins.icon} size={18} color={ins.color} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: t.text, lineHeight: 1.4 }}>{ins.title}</div>
                    <div style={{ fontSize: 12, color: t.textSub, marginTop: 5, lineHeight: 1.5 }}>{ins.body}</div>
                  </div>
                </div>
              </div>
              <div onClick={() => press(`ins-${i}`)} style={btnStyle(`ins-${i}`, {
                padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                background: ins.color + '10', cursor: 'pointer'
              })}>
                <span style={{ fontSize: 12, fontWeight: 700, color: ins.color }}>{ins.action}</span>
                <Icon name="ArrowRight" size={16} color={ins.color} />
              </div>
            </div>
          ))}
        </div>

        {/* Pricing Suggestions */}
        <div style={{ margin: '20px 20px 0', background: t.card, borderRadius: 20, border: `1px solid ${t.border}`, padding: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
            <Icon name="DollarSign" size={16} color={t.accent} />
            <span style={{ fontSize: 13, fontWeight: 700, color: t.text }}>Smart Pricing Suggestions</span>
          </div>
          {[
            { label: 'Rush Fee', current: 'None', suggested: '+30%', impact: '+$1,240/mo' },
            { label: 'Nexus Health Rate', current: '$87/hr', suggested: '$150/hr', impact: '+$690/mo' },
            { label: 'Min. Engagement', current: 'None', suggested: '$2,000', impact: '+$2,100/mo' },
          ].map((p, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: i < 2 ? `1px solid ${t.border}` : 'none' }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: t.text }}>{p.label}</div>
                <div style={{ fontSize: 11, color: t.textMuted, marginTop: 2 }}>{p.current} → <span style={{ color: t.accent }}>{p.suggested}</span></div>
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, color: t.accent }}>{p.impact}</div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const SimulatorScreen = () => {
    const [active, setActive] = useState(null);
    const [sliderVal, setSliderVal] = useState(30);
    const baseMonthly = 9840;

    const totalDelta = active
      ? scenarios.find(s => s.id === active)?.delta || '+$0'
      : '+$0';

    return (
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 80 }}>
        <div style={{ padding: '16px 20px 0' }}>
          <div style={{ fontSize: 22, fontWeight: 700, color: t.text }}>What-If Simulator</div>
          <div style={{ fontSize: 13, color: t.textSub, marginTop: 2 }}>Test decisions before you make them</div>
        </div>

        {/* Baseline */}
        <div style={{ margin: '16px 20px 0', background: t.card, borderRadius: 20, border: `1px solid ${t.border}`, padding: '18px 20px' }}>
          <div style={{ fontSize: 12, color: t.textMuted, fontWeight: 500 }}>Baseline · This Month</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 6 }}>
            <div style={{ fontSize: 36, fontWeight: 700, color: t.text }}>${baseMonthly.toLocaleString()}</div>
            <div style={{ fontSize: 14, color: active ? t.accent : t.textMuted, fontWeight: 600, transition: 'color 0.3s' }}>
              {active ? `→ ${totalDelta}` : 'select a scenario'}
            </div>
          </div>
          <div style={{ height: 5, background: t.border, borderRadius: 3, overflow: 'hidden', marginTop: 12 }}>
            <div style={{ height: '100%', width: active ? '85%' : '62%', background: `linear-gradient(90deg, ${t.accent}60, ${t.accent})`, borderRadius: 3, transition: 'width 0.6s ease' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
            <span style={{ fontSize: 11, color: t.textMuted }}>Current margin: 53%</span>
            <span style={{ fontSize: 11, color: t.accent, fontWeight: 600 }}>{active ? 'Projected: 68%' : ''}</span>
          </div>
        </div>

        {/* Scenarios */}
        <div style={{ margin: '16px 20px 0' }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: t.text, marginBottom: 12 }}>Choose a Scenario</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {scenarios.map(s => (
              <div key={s.id} onClick={() => setActive(active === s.id ? null : s.id)} style={{
                background: active === s.id ? s.color + '15' : t.card,
                borderRadius: 16, padding: '14px 16px', cursor: 'pointer',
                border: `1.5px solid ${active === s.id ? s.color : t.border}`,
                transition: 'all 0.2s ease'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 8, height: 8, borderRadius: 4, background: active === s.id ? s.color : t.border, transition: 'all 0.2s' }} />
                      <span style={{ fontSize: 13, fontWeight: 600, color: t.text }}>{s.label}</span>
                    </div>
                    <div style={{ fontSize: 11, color: t.textMuted, marginTop: 5, marginLeft: 16 }}>{s.desc}</div>
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: s.color, flexShrink: 0, marginLeft: 8 }}>{s.delta}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Custom Slider */}
        <div style={{ margin: '20px 20px 0', background: t.card, borderRadius: 20, border: `1px solid ${t.border}`, padding: '16px 20px' }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: t.text, marginBottom: 4 }}>Custom: Raise rates by {sliderVal}%</div>
          <div style={{ fontSize: 12, color: t.textMuted, marginBottom: 14 }}>Impact: <span style={{ color: t.accent, fontWeight: 600 }}>+${Math.round(baseMonthly * sliderVal / 100 * 0.3).toLocaleString()}/mo</span></div>
          <input type="range" min={5} max={100} value={sliderVal} onChange={e => setSliderVal(Number(e.target.value))} style={{
            width: '100%', accentColor: t.accent, height: 6, borderRadius: 3, cursor: 'pointer'
          }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
            <span style={{ fontSize: 11, color: t.textMuted }}>5%</span>
            <span style={{ fontSize: 11, color: t.textMuted }}>100%</span>
          </div>
        </div>

        {/* CTA */}
        <div style={{ margin: '20px 20px 0' }}>
          <div onClick={() => press('apply-sim')} style={btnStyle('apply-sim', {
            background: active ? `linear-gradient(135deg, ${t.accent}, #00C9A7)` : t.border,
            borderRadius: 16, padding: '16px 20px', textAlign: 'center', cursor: 'pointer',
            transition: 'all 0.3s ease'
          })}>
            <span style={{ fontSize: 14, fontWeight: 700, color: active ? '#000' : t.textMuted }}>
              {active ? 'Apply This Change' : 'Select a scenario first'}
            </span>
          </div>
        </div>
      </div>
    );
  };

  const SettingsScreen = () => {
    const [notif, setNotif] = useState(true);
    const [eodPrompt, setEodPrompt] = useState(true);
    const [aiCoach, setAiCoach] = useState(true);

    const Toggle = ({ val, onToggle }) => (
      <div onClick={onToggle} style={{
        width: 46, height: 26, borderRadius: 13, cursor: 'pointer', transition: 'all 0.3s ease',
        background: val ? t.accent : t.border, position: 'relative', flexShrink: 0
      }}>
        <div style={{
          position: 'absolute', top: 3, left: val ? 23 : 3, width: 20, height: 20,
          borderRadius: 10, background: val ? '#000' : t.textMuted,
          transition: 'all 0.3s ease', boxShadow: '0 1px 3px rgba(0,0,0,0.3)'
        }} />
      </div>
    );

    const Section = ({ title, children }) => (
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10, paddingHorizontal: 20 }}>{title}</div>
        <div style={{ background: t.card, borderRadius: 20, border: `1px solid ${t.border}`, overflow: 'hidden' }}>{children}</div>
      </div>
    );

    const Row = ({ icon, label, sub, right, onPress, last }) => (
      <div onClick={onPress} style={{
        padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12,
        borderBottom: last ? 'none' : `1px solid ${t.border}`, cursor: onPress ? 'pointer' : 'default'
      }}>
        <div style={{ width: 36, height: 36, borderRadius: 11, background: t.cardAlt, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Icon name={icon} size={17} color={t.textSub} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: t.text }}>{label}</div>
          {sub && <div style={{ fontSize: 11, color: t.textMuted, marginTop: 1 }}>{sub}</div>}
        </div>
        {right}
      </div>
    );

    return (
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 80, padding: '0 20px' }}>
        {/* Profile */}
        <div style={{ padding: '16px 0 0' }}>
          <div style={{ fontSize: 22, fontWeight: 700, color: t.text }}>Settings</div>
        </div>

        <div style={{ marginTop: 20, background: t.card, borderRadius: 20, border: `1px solid ${t.border}`, padding: '18px 16px', display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
          <div style={{ width: 54, height: 54, borderRadius: 18, background: `linear-gradient(135deg, ${t.accent}, #00C9A7)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <span style={{ fontSize: 22, fontWeight: 700, color: '#000' }}>JR</span>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: t.text }}>Jordan Riley</div>
            <div style={{ fontSize: 12, color: t.textSub }}>Freelance Brand Consultant</div>
            <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
              <div style={{ padding: '3px 8px', borderRadius: 6, background: t.accentDim, border: `1px solid ${t.accentMid}` }}>
                <span style={{ fontSize: 10, color: t.accent, fontWeight: 600 }}>Pro Plan</span>
              </div>
            </div>
          </div>
          <Icon name="ChevronRight" size={18} color={t.textMuted} />
        </div>

        <Section title="Appearance">
          <Row icon={theme === 'dark' ? 'Moon' : 'Sun'} label="Theme" sub={theme === 'dark' ? 'Dark mode active' : 'Light mode active'} last
            right={
              <div onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} style={{
                display: 'flex', alignItems: 'center', gap: 6, padding: '7px 12px', borderRadius: 10,
                background: t.accentDim, border: `1px solid ${t.accentMid}`, cursor: 'pointer'
              }}>
                <Icon name={theme === 'dark' ? 'Sun' : 'Moon'} size={14} color={t.accent} />
                <span style={{ fontSize: 12, fontWeight: 600, color: t.accent }}>{theme === 'dark' ? 'Light' : 'Dark'}</span>
              </div>
            }
          />
        </Section>

        <Section title="Notifications">
          <Row icon="Bell" label="Activity Prompts" sub="After calls & meetings" right={<Toggle val={notif} onToggle={() => setNotif(!notif)} />} />
          <Row icon="Sunset" label="End-of-Day Recap" sub="Daily at 6:00 PM" right={<Toggle val={eodPrompt} onToggle={() => setEodPrompt(!eodPrompt)} />} />
          <Row icon="Sparkles" label="AI Coach Nudges" sub="When margin dips" right={<Toggle val={aiCoach} onToggle={() => setAiCoach(!aiCoach)} />} last />
        </Section>

        <Section title="Business">
          <Row icon="Target" label="Hourly Rate Target" sub="$180/hr" right={<Icon name="ChevronRight" size={16} color={t.textMuted} />} />
          <Row icon="Users" label="Team Members" sub="2 active" right={<Icon name="ChevronRight" size={16} color={t.textMuted} />} />
          <Row icon="Calendar" label="Connected Calendar" sub="Google Calendar" right={<Icon name="CheckCircle" size={16} color={t.accent} />} last />
        </Section>

        <Section title="Data">
          <Row icon="Download" label="Export Report" sub="PDF or CSV" right={<Icon name="ChevronRight" size={16} color={t.textMuted} />} />
          <Row icon="RefreshCw" label="Sync Data" sub="Last synced 2 min ago" right={<Icon name="ChevronRight" size={16} color={t.textMuted} />} last />
        </Section>
      </div>
    );
  };

  // ─── NAV TABS ────────────────────────────────────────────────────────────────
  const tabs = [
    { id: 'dashboard', icon: 'LayoutDashboard', label: 'Dashboard' },
    { id: 'activity', icon: 'Activity', label: 'Log' },
    { id: 'insights', icon: 'TrendingUp', label: 'Insights' },
    { id: 'simulator', icon: 'Sliders', label: 'Simulator' },
    { id: 'settings', icon: 'Settings', label: 'Settings' },
  ];

  const renderScreen = () => {
    switch (activeTab) {
      case 'dashboard': return <DashboardScreen />;
      case 'activity': return <ActivityScreen />;
      case 'insights': return <InsightsScreen />;
      case 'simulator': return <SimulatorScreen />;
      case 'settings': return <SettingsScreen />;
      default: return <DashboardScreen />;
    }
  };

  // ─── MODALS ──────────────────────────────────────────────────────────────────
  const ActivityModal = () => {
    if (!selectedActivity) return null;
    const a = selectedActivity;
    const tagColor = a.tag === 'gain' ? t.accent : a.tag === 'expense' ? t.warn : a.tag === 'warn' ? t.gold : t.warn;

    return (
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 50, display: 'flex', alignItems: 'flex-end', borderRadius: 44 }}>
        <div style={{ width: '100%', background: t.surface, borderRadius: '24px 24px 0 0', padding: '20px 20px 40px', border: `1px solid ${t.border}` }}>
          <div style={{ width: 40, height: 4, borderRadius: 2, background: t.border, margin: '0 auto 20px' }} />
          <div style={{ fontSize: 16, fontWeight: 700, color: t.text, marginBottom: 4 }}>{a.label}</div>
          <div style={{ fontSize: 13, color: t.textMuted, marginBottom: 20 }}>{a.time} · {a.type}</div>

          <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
            {[
              { label: 'Impact', value: `${a.impact > 0 ? '+' : ''}$${Math.abs(a.impact)}`, color: a.impact > 0 ? t.accent : t.warn },
              { label: 'Duration', value: a.duration > 0 ? `${a.duration}min` : '—', color: t.blue },
              { label: 'Eff. Rate', value: a.duration > 0 ? `$${Math.round(Math.abs(a.impact) / (a.duration / 60))}/hr` : '—', color: t.gold },
            ].map((m, i) => (
              <div key={i} style={{ flex: 1, background: t.card, borderRadius: 14, padding: '12px 10px', border: `1px solid ${t.border}`, textAlign: 'center' }}>
                <div style={{ fontSize: 11, color: t.textMuted }}>{m.label}</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: m.color, marginTop: 4 }}>{m.value}</div>
              </div>
            ))}
          </div>

          <div style={{ background: tagColor + '15', borderRadius: 14, padding: '14px', border: `1px solid ${tagColor + '30'}`, marginBottom: 16 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: tagColor, marginBottom: 4 }}>AI Coach Note</div>
            <div style={{ fontSize: 12, color: t.textSub, lineHeight: 1.6 }}>
              {a.tag === 'drain' ? 'This activity reduced your effective hourly rate significantly. Consider setting clearer revision limits with this client.' :
                a.tag === 'gain' ? 'High-value activity! This type of work is your most profitable. Prioritize similar tasks.' :
                  a.tag === 'warn' ? 'Profitable but below target margin. A rush fee policy would improve this.' :
                    'Track this expense against project budgets to maintain accurate P&L.'}
            </div>
          </div>

          <div onClick={() => setSelectedActivity(null)} style={{
            background: t.card, borderRadius: 14, padding: '14px', textAlign: 'center',
            border: `1px solid ${t.border}`, cursor: 'pointer'
          }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: t.text }}>Close</span>
          </div>
        </div>
      </div>
    );
  };

  const EODModal = () => {
    if (!eodVisible) return null;
    return (
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 50, display: 'flex', alignItems: 'flex-end', borderRadius: 44 }}>
        <div style={{ width: '100%', background: t.surface, borderRadius: '24px 24px 0 0', padding: '20px 20px 40px', border: `1px solid ${t.border}` }}>
          <div style={{ width: 40, height: 4, borderRadius: 2, background: t.border, margin: '0 auto 20px' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
            <div style={{ width: 40, height: 40, borderRadius: 13, background: t.accentDim, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name="Sunset" size={20} color={t.accent} />
            </div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: t.text }}>End-of-Day Recap</div>
              <div style={{ fontSize: 12, color: t.textMuted }}>Sunday, March 22</div>
            </div>
          </div>

          {[
            { icon: 'Clock', label: 'Time Logged', value: '6.25 hours', color: t.blue },
            { icon: 'DollarSign', label: 'Revenue Earned', value: '$960', color: t.accent },
            { icon: 'TrendingDown', label: 'Biggest Drain', value: 'Acme revision call', color: t.warn },
            { icon: 'Star', label: 'Best Activity', value: 'Drift Labs kickoff', color: t.gold },
          ].map((row, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: i < 3 ? `1px solid ${t.border}` : 'none' }}>
              <div style={{ width: 34, height: 34, borderRadius: 10, background: row.color + '20', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name={row.icon} size={16} color={row.color} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, color: t.textMuted }}>{row.label}</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: t.text }}>{row.value}</div>
              </div>
            </div>
          ))}

          <div style={{ margin: '16px 0 12px', background: t.accentDim, borderRadius: 14, padding: '14px', border: `1px solid ${t.accentMid}` }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: t.accent, marginBottom: 4 }}>Tomorrow's Priority</div>
            <div style={{ fontSize: 12, color: t.text, lineHeight: 1.6 }}>Follow up on Drift Labs retainer proposal. At current rate, securing a 6-month retainer adds <span style={{ color: t.accent, fontWeight: 600 }}>+$3,720 in guaranteed income</span>.</div>
          </div>

          <div onClick={() => setEodVisible(false)} style={{
            background: `linear-gradient(135deg, ${t.accent}, #00C9A7)`,
            borderRadius: 14, padding: '14px', textAlign: 'center', cursor: 'pointer'
          }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: '#000' }}>Done for the Day</span>
          </div>
        </div>
      </div>
    );
  };

  // ─── RENDER ──────────────────────────────────────────────────────────────────
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#1a1a2e', fontFamily: "'Space Grotesk', sans-serif" }}>
      {/* Phone Frame */}
      <div style={{
        width: 375, height: 812, background: t.bg, borderRadius: 44,
        boxShadow: '0 30px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.08), inset 0 0 0 1px rgba(255,255,255,0.04)',
        position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column'
      }}>
        {/* Dynamic Island */}
        <div style={{
          position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)',
          width: 126, height: 34, background: '#000', borderRadius: 20, zIndex: 100,
          display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 12, gap: 6
        }}>
          <div style={{ width: 12, height: 12, borderRadius: 6, background: '#1a1a1a', border: '2px solid #333' }} />
        </div>

        {/* Status Bar */}
        <div style={{ height: 54, background: t.statusBar, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '0 24px 8px', flexShrink: 0 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: t.text }}>9:41</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ display: 'flex', gap: 2, alignItems: 'flex-end' }}>
              {[3, 5, 7, 9].map((h, i) => (
                <div key={i} style={{ width: 3, height: h, borderRadius: 1.5, background: i < 3 ? t.text : t.textMuted }} />
              ))}
            </div>
            <Icon name="Wifi" size={14} color={t.text} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <div style={{ width: 22, height: 11, border: `1.5px solid ${t.text}`, borderRadius: 3, position: 'relative', display: 'flex', alignItems: 'center', padding: '0 2px' }}>
                <div style={{ flex: 1, height: 7, background: t.text, borderRadius: 1.5 }} />
              </div>
              <div style={{ width: 2, height: 5, background: t.text, borderRadius: 1 }} />
            </div>
          </div>
        </div>

        {/* Screen Content */}
        <div style={{ flex: 1, overflow: 'hidden', position: 'relative', display: 'flex', flexDirection: 'column' }}>
          {renderScreen()}
          <ActivityModal />
          <EODModal />
        </div>

        {/* Bottom Nav */}
        <div style={{
          height: 82, background: t.navBg, borderTop: `1px solid ${t.navBorder}`,
          display: 'flex', alignItems: 'center', justifyContent: 'space-around',
          paddingBottom: 16, paddingTop: 4, flexShrink: 0, zIndex: 40
        }}>
          {tabs.map(tab => {
            const isActive = activeTab === tab.id;
            return (
              <div key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                cursor: 'pointer', padding: '6px 10px', borderRadius: 14, transition: 'all 0.2s ease',
                background: isActive ? t.accentDim : 'transparent'
              }}>
                <Icon name={tab.icon} size={20} color={isActive ? t.accent : t.textMuted} strokeWidth={isActive ? 2.2 : 1.6} />
                <span style={{ fontSize: 10, fontWeight: isActive ? 700 : 500, color: isActive ? t.accent : t.textMuted, transition: 'all 0.2s ease' }}>
                  {tab.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
