const { useState, useEffect, useRef } = React;

// ─── Theme System ─────────────────────────────────────────────────────────────
const themes = {
  dark: {
    bg: '#070A14',
    surface: '#0C1222',
    card: '#121929',
    cardAlt: '#182033',
    primary: '#4D8BFF',
    primaryDim: 'rgba(77,139,255,0.13)',
    accent: '#06D6FF',
    accentDim: 'rgba(6,214,255,0.13)',
    text: '#ECF0FF',
    textSec: '#6A7FAB',
    textMuted: '#374263',
    urgent: '#FF3B5C',
    urgentDim: 'rgba(255,59,92,0.13)',
    high: '#FF7A35',
    highDim: 'rgba(255,122,53,0.13)',
    medium: '#FFB627',
    mediumDim: 'rgba(255,182,39,0.13)',
    low: '#00D97A',
    lowDim: 'rgba(0,217,122,0.13)',
    border: 'rgba(255,255,255,0.055)',
    nav: '#090C19',
    navBorder: 'rgba(255,255,255,0.07)',
    tag: 'rgba(77,139,255,0.13)',
    tagText: '#4D8BFF',
    toggleBg: '#1A2338',
    gradient: 'linear-gradient(135deg, #4D8BFF 0%, #06D6FF 100%)',
  },
  light: {
    bg: '#EDF1FF',
    surface: '#FFFFFF',
    card: '#F7F9FF',
    cardAlt: '#EEF2FF',
    primary: '#2557E7',
    primaryDim: 'rgba(37,87,231,0.08)',
    accent: '#0891B2',
    accentDim: 'rgba(8,145,178,0.08)',
    text: '#0D1B3E',
    textSec: '#4A5680',
    textMuted: '#98A8C8',
    urgent: '#D9263A',
    urgentDim: 'rgba(217,38,58,0.08)',
    high: '#E05A19',
    highDim: 'rgba(224,90,25,0.08)',
    medium: '#B07A10',
    mediumDim: 'rgba(176,122,16,0.08)',
    low: '#047A4F',
    lowDim: 'rgba(4,122,79,0.08)',
    border: 'rgba(0,0,0,0.06)',
    nav: '#FFFFFF',
    navBorder: 'rgba(0,0,0,0.08)',
    tag: 'rgba(37,87,231,0.08)',
    tagText: '#2557E7',
    toggleBg: '#EEF2FF',
    gradient: 'linear-gradient(135deg, #2557E7 0%, #0891B2 100%)',
  },
};

// ─── Data ─────────────────────────────────────────────────────────────────────
const feedData = [
  {
    id: 1, impact: 94, urgency: 'critical',
    title: 'MTA Transit Strike Vote at 7 AM Tomorrow',
    summary: 'Union workers vote at 7 AM. If passed, all subway and bus service could suspend by noon. 3.5M daily riders affected city-wide.',
    consequence: "Your usual commute won't work. Plan for 45–60 min delays or zero service.",
    category: 'Commute', time: '18 min ago', source: 'NYC Transit Authority',
    area: 'All NYC', tags: ['Transit', 'Strike'],
  },
  {
    id: 2, impact: 87, urgency: 'high',
    title: 'All NYC Public Schools Closed Thursday',
    summary: 'NYC DOE announced closure of all 1,700+ public schools Thursday due to storm forecast. No remote learning required. Affects 1.1M students.',
    consequence: 'Arrange childcare or remote work before Wednesday night.',
    category: 'Education', time: '1 hr ago', source: 'NYC Dept. of Education',
    area: 'All NYC Districts', tags: ['Schools', 'Storm'],
  },
  {
    id: 3, impact: 76, urgency: 'high',
    title: 'IRS Freelance Deduction Rules Change April 1',
    summary: 'New IRS guidance alters home office and equipment deductions for self-employed workers. Q1 estimates filed under old rules may be underpaid.',
    consequence: 'Recalculate Q1 estimate before March 31. Potential $400–900 underpayment.',
    category: 'Finance', time: '2 hrs ago', source: 'IRS / Tax Policy Center',
    area: 'National', tags: ['Tax', 'Freelance'],
  },
  {
    id: 4, impact: 68, urgency: 'medium',
    title: 'Fed Holds Rates — Mortgage Relief Possible in Q3',
    summary: 'Federal Reserve signals no rate change through June. Analysts project a 0.25% cut in July if core inflation stays below 2.8%.',
    consequence: 'Q3 may offer a better refinance window. Watch July FOMC closely.',
    category: 'Finance', time: '3 hrs ago', source: 'Federal Reserve',
    area: 'National', tags: ['Economy', 'Rates'],
  },
  {
    id: 5, impact: 62, urgency: 'medium',
    title: 'Air Quality Alert: AQI 158 Tuesday 1–7 PM',
    summary: 'Wildfire smoke from New Jersey pushes NYC into Unhealthy range (AQI 150–200) Tuesday afternoon. Visible haze expected from noon.',
    consequence: 'Limit outdoor activity 1–7 PM. Wear N95 if you must go outside.',
    category: 'Health', time: '4 hrs ago', source: 'NYC DEP / AirNow',
    area: 'Manhattan, Brooklyn, Queens', tags: ['Air Quality', 'Health'],
  },
  {
    id: 6, impact: 51, urgency: 'low',
    title: 'Midtown Tunnel Lane Reduction Starting Monday',
    summary: 'Queens-Midtown Tunnel emergency repairs reduce inbound lanes from 3 to 2 starting Monday through Wednesday evening.',
    consequence: 'Add 20–30 min to Midtown-bound drives from Queens during PM peak.',
    category: 'Commute', time: '5 hrs ago', source: 'NYC DOT',
    area: 'Queens / Midtown', tags: ['Traffic', 'Roads'],
  },
];

const alertsData = [
  {
    id: 1, severity: 'critical', icon: 'AlertTriangle',
    title: 'Transit Strike Risk — Tomorrow AM',
    detail: 'MTA union vote at 7 AM. Service suspension of all subways and buses likely by noon if vote passes.',
    time: 'Tomorrow, 7:00 AM', action: 'Plan alternate route now', area: 'All NYC', countdown: '14h',
  },
  {
    id: 2, severity: 'high', icon: 'CloudRain',
    title: 'Severe Thunderstorm Warning',
    detail: 'NWS issued warning for 45+ mph winds, heavy rain, and possible hail from 2 PM–8 PM today.',
    time: 'Today, 2:00 PM – 8:00 PM', action: 'Move outdoor plans indoors', area: 'NYC Metro', countdown: '3h',
  },
  {
    id: 3, severity: 'high', icon: 'BookOpen',
    title: 'School Closure — Thursday',
    detail: 'All 1,700+ NYC public schools closed Thursday due to storm forecast. No remote learning required.',
    time: 'Thursday, All Day', action: 'Arrange childcare by Wed night', area: 'All NYC Districts', countdown: '2d',
  },
  {
    id: 4, severity: 'medium', icon: 'Wind',
    title: 'Unhealthy Air Quality Tuesday',
    detail: 'AQI forecast 158 (Unhealthy) Tuesday 1–7 PM. Wildfire smoke from NJ. Stay indoors if possible.',
    time: 'Tuesday, 1:00 PM – 7:00 PM', action: 'Limit outdoor exposure', area: 'Manhattan, Brooklyn, Queens', countdown: '1d',
  },
  {
    id: 5, severity: 'low', icon: 'Wrench',
    title: 'Tunnel Lane Reduction This Week',
    detail: 'Queens-Midtown Tunnel: 3→2 inbound lanes Mon–Wed for emergency joint repair.',
    time: 'Mon – Wed, PM Peak', action: 'Use alternate bridge routes', area: 'Queens / Midtown', countdown: '',
  },
];

const timelinesData = [
  {
    id: 1, title: 'MTA Strike: Full Scenario', category: 'Transit', urgency: 'critical',
    summary: 'How the transit situation unfolds from tonight through potential resolution.',
    events: [
      { time: 'Tonight, 11 PM', label: 'Negotiation deadline', status: 'upcoming', detail: 'Last chance for management and union to reach agreement before vote.' },
      { time: 'Tomorrow, 7 AM', label: 'Union vote held', status: 'upcoming', detail: 'Workers vote on strike authorization. Results expected by 9 AM.' },
      { time: 'Tomorrow, 12 PM', label: 'Potential service stop', status: 'upcoming', detail: 'All subway and bus lines halted if strike passes. Roads will be gridlocked.' },
      { time: 'Day 3–5', label: 'Federal mediation', status: 'future', detail: 'Federal mediators typically step in after 72 hours of strike action.' },
      { time: 'Week 2', label: 'Court injunction likely', status: 'future', detail: 'Courts may order workers back under NY Taylor Law provisions.' },
    ],
  },
  {
    id: 2, title: 'Storm System: 48-Hour Track', category: 'Weather', urgency: 'high',
    summary: 'The storm moving through the metro area over the next two days.',
    events: [
      { time: 'Today, 2 PM', label: 'Storm arrives', status: 'upcoming', detail: 'First bands of rain hit NYC. Winds pick up to 35 mph.' },
      { time: 'Today, 5 PM', label: 'Peak intensity', status: 'upcoming', detail: 'Heaviest rain and gusts of 45–55 mph. Lightning risk high.' },
      { time: 'Today, 8 PM', label: 'Main system clears', status: 'upcoming', detail: 'Rain tapers off. Flash flooding possible in low-lying areas.' },
      { time: 'Tomorrow AM', label: 'Lingering delays', status: 'future', detail: 'Debris on roads. MTA signal issues likely. Add 20 min to commute.' },
      { time: 'Thursday', label: 'Second wave arrives', status: 'future', detail: 'Weaker system brings more rain and wind — reason for school closure.' },
    ],
  },
  {
    id: 3, title: 'Freelance Tax Rules: Key Dates', category: 'Finance', urgency: 'medium',
    summary: 'New IRS deduction changes and deadlines for self-employed workers.',
    events: [
      { time: 'March 22 (Today)', label: 'IRS guidance published', status: 'done', detail: 'New deduction rules officially released. Review your deduction categories.' },
      { time: 'March 31', label: 'Q1 estimate deadline', status: 'upcoming', detail: 'File using new rules to avoid underpayment penalty (5% monthly).' },
      { time: 'April 1', label: 'New rules take effect', status: 'upcoming', detail: 'All filings must use updated deduction categories from this date.' },
      { time: 'April 15', label: 'Standard tax deadline', status: 'future', detail: 'File 2025 return or extension. Updated home office rules apply.' },
    ],
  },
];

const actionsData = [
  {
    id: 1, priority: 'urgent', icon: 'Navigation',
    title: "Plan Tomorrow's Commute Now",
    reason: 'Transit strike vote at 7 AM. Service may stop by noon.',
    steps: ['Check Citi Bike availability in your area', 'Download a rideshare app as backup', 'Leave 45–60 min earlier than usual', 'Alert your team you may arrive late'],
    deadline: 'Tonight', impact: 94,
  },
  {
    id: 2, priority: 'urgent', icon: 'Users',
    title: 'Arrange Childcare for Thursday',
    reason: 'All NYC schools closed Thursday. No remote learning.',
    steps: ['Contact backup caregiver or family member', 'Check if your employer allows remote Thursday', 'Explore local school-age care programs', 'Coordinate with other parents in your network'],
    deadline: 'By Wednesday Evening', impact: 87,
  },
  {
    id: 3, priority: 'high', icon: 'DollarSign',
    title: 'Review Q1 Tax Estimate',
    reason: 'New IRS rules may leave you underpaid by $400–900.',
    steps: ["Pull last year's Schedule C for comparison", 'Recalculate home office deduction under new rules', 'Update equipment depreciation categories', 'Submit revised estimate by March 31'],
    deadline: 'March 31', impact: 76,
  },
  {
    id: 4, priority: 'medium', icon: 'Wind',
    title: 'Reschedule Outdoor Activities Today',
    reason: 'AQI 158 + thunderstorms 2–8 PM today.',
    steps: ['Move outdoor meetings indoors before 1 PM', 'Close windows this afternoon', 'Wear N95 if you must go outside', 'Postpone evening outdoor exercise or runs'],
    deadline: 'Before 1 PM Today', impact: 64,
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function impactColor(score, urgency, t) {
  if (urgency === 'critical' || urgency === 'urgent' || score >= 90) return t.urgent;
  if (urgency === 'high' || score >= 70) return t.high;
  if (urgency === 'medium' || score >= 50) return t.medium;
  return t.low;
}
function impactDim(score, urgency, t) {
  if (urgency === 'critical' || urgency === 'urgent' || score >= 90) return t.urgentDim;
  if (urgency === 'high' || score >= 70) return t.highDim;
  if (urgency === 'medium' || score >= 50) return t.mediumDim;
  return t.lowDim;
}
function urgencyLabel(u) {
  return { critical: 'CRITICAL', urgent: 'URGENT', high: 'HIGH', medium: 'MEDIUM', low: 'LOW' }[u] || 'LOW';
}
function severityColor(s, t) {
  return { critical: t.urgent, high: t.high, medium: t.medium, low: t.low }[s] || t.low;
}
function severityDim(s, t) {
  return { critical: t.urgentDim, high: t.highDim, medium: t.mediumDim, low: t.lowDim }[s] || t.lowDim;
}

// ─── Home Screen ──────────────────────────────────────────────────────────────
function HomeScreen({ t }) {
  const [filter, setFilter] = useState('All');
  const [expanded, setExpanded] = useState(null);
  const filters = ['All', 'Commute', 'Finance', 'Health', 'Education'];
  const data = filter === 'All' ? feedData : feedData.filter(d => d.category === filter);

  return (
    <div style={{ flex: 1, overflowY: 'auto', background: t.bg }}>
      <div style={{ background: t.surface, padding: '0 16px 12px', borderBottom: `1px solid ${t.border}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <div>
            <div style={{ fontSize: 22, fontWeight: 800, color: t.text, letterSpacing: -0.5 }}>Impact Feed</div>
            <div style={{ fontSize: 12, color: t.textSec }}>Ranked by what matters to you</div>
          </div>
          <div style={{ background: t.primaryDim, borderRadius: 10, padding: '5px 10px', display: 'flex', alignItems: 'center', gap: 5 }}>
            {React.createElement(window.lucide.MapPin, { size: 12, color: t.primary })}
            <span style={{ fontSize: 12, color: t.primary, fontWeight: 700 }}>New York</span>
          </div>
        </div>
        <div style={{ background: t.urgentDim, border: `1px solid ${t.urgent}25`, borderRadius: 12, padding: '9px 12px', display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
          {React.createElement(window.lucide.AlertCircle, { size: 16, color: t.urgent })}
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: t.urgent }}>3 high-impact events today</div>
            <div style={{ fontSize: 11, color: t.textSec, marginTop: 1 }}>Transit strike vote · school closure · storm warning</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 7, overflowX: 'auto', paddingBottom: 2 }}>
          {filters.map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{ padding: '5px 13px', borderRadius: 20, border: 'none', cursor: 'pointer', fontSize: 11, fontWeight: 600, whiteSpace: 'nowrap', background: filter === f ? t.primary : t.card, color: filter === f ? '#fff' : t.textSec, fontFamily: "'Space Grotesk', sans-serif", flexShrink: 0 }}>
              {f}
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding: '10px 14px 80px' }}>
        {data.map(item => {
          const color = impactColor(item.impact, item.urgency, t);
          const dim = impactDim(item.impact, item.urgency, t);
          const isOpen = expanded === item.id;
          return (
            <div key={item.id} onClick={() => setExpanded(isOpen ? null : item.id)}
              style={{ background: t.card, borderRadius: 16, padding: '14px 14px 12px', marginBottom: 10, border: `1px solid ${t.border}`, cursor: 'pointer', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 3.5, background: color, borderRadius: '16px 0 0 16px' }} />
              <div style={{ paddingLeft: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                  <div style={{ display: 'flex', gap: 5, flex: 1, marginRight: 10, flexWrap: 'wrap' }}>
                    <span style={{ background: dim, color, fontSize: 9, fontWeight: 800, padding: '3px 7px', borderRadius: 5, letterSpacing: 0.8 }}>{urgencyLabel(item.urgency)}</span>
                    <span style={{ background: t.tag, color: t.tagText, fontSize: 9, fontWeight: 700, padding: '3px 7px', borderRadius: 5 }}>{item.category}</span>
                  </div>
                  <div style={{ width: 38, height: 38, borderRadius: '50%', background: dim, border: `2px solid ${color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ fontSize: 13, fontWeight: 800, color, lineHeight: 1 }}>{item.impact}</span>
                  </div>
                </div>
                <div style={{ fontSize: 14, fontWeight: 700, color: t.text, lineHeight: 1.4, marginBottom: 7 }}>{item.title}</div>
                <div style={{ fontSize: 12, color: t.textSec, lineHeight: 1.55, marginBottom: 8 }}>{item.summary}</div>
                <div style={{ background: dim, borderRadius: 10, padding: '7px 10px', display: 'flex', gap: 7, alignItems: 'flex-start' }}>
                  {React.createElement(window.lucide.ArrowRight, { size: 12, color, style: { marginTop: 1, flexShrink: 0 } })}
                  <span style={{ fontSize: 12, color, fontWeight: 600, lineHeight: 1.4 }}>{item.consequence}</span>
                </div>
                {isOpen && (
                  <div style={{ marginTop: 10, paddingTop: 10, borderTop: `1px solid ${t.border}` }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: t.textMuted }}>
                      <span>📍 {item.area}</span>
                      <span>{item.source}</span>
                    </div>
                    <div style={{ display: 'flex', gap: 5, marginTop: 7, flexWrap: 'wrap' }}>
                      {item.tags.map(tag => <span key={tag} style={{ fontSize: 10, color: t.textMuted, background: t.cardAlt, padding: '3px 8px', borderRadius: 5 }}>#{tag}</span>)}
                    </div>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 9 }}>
                  <span style={{ fontSize: 11, color: t.textMuted }}>{item.time}</span>
                  <span style={{ fontSize: 11, color: t.textSec }}>{isOpen ? '▲ Less' : '▼ Why this matters'}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Alerts Screen ────────────────────────────────────────────────────────────
function AlertsScreen({ t }) {
  const [dismissed, setDismissed] = useState([]);
  const active = alertsData.filter(a => !dismissed.includes(a.id));

  return (
    <div style={{ flex: 1, overflowY: 'auto', background: t.bg }}>
      <div style={{ background: t.surface, padding: '0 16px 14px', borderBottom: `1px solid ${t.border}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 22, fontWeight: 800, color: t.text, letterSpacing: -0.5 }}>Live Alerts</div>
            <div style={{ fontSize: 12, color: t.textSec, marginTop: 3 }}>{active.length} active alerts in your area</div>
          </div>
          <div style={{ position: 'relative' }}>
            {React.createElement(window.lucide.Bell, { size: 22, color: t.primary })}
            {active.length > 0 && <div style={{ position: 'absolute', top: -3, right: -3, width: 8, height: 8, borderRadius: '50%', background: t.urgent, border: `2px solid ${t.surface}` }} />}
          </div>
        </div>
      </div>

      <div style={{ padding: '12px 14px 80px' }}>
        {active.length === 0 && (
          <div style={{ textAlign: 'center', padding: '50px 20px', color: t.textMuted }}>
            <div style={{ width: 56, height: 56, borderRadius: '50%', background: t.lowDim, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
              {React.createElement(window.lucide.Check, { size: 26, color: t.low })}
            </div>
            <div style={{ fontWeight: 700, color: t.textSec, fontSize: 15 }}>All clear</div>
            <div style={{ fontSize: 13, marginTop: 4 }}>No active alerts for your area</div>
          </div>
        )}
        {active.map(alert => {
          const color = severityColor(alert.severity, t);
          const dim = severityDim(alert.severity, t);
          const IconEl = window.lucide[alert.icon] || window.lucide.AlertTriangle;
          return (
            <div key={alert.id} style={{ background: t.card, borderRadius: 16, marginBottom: 10, overflow: 'hidden', border: `1px solid ${t.border}` }}>
              <div style={{ height: 4, background: color }} />
              <div style={{ padding: '12px 14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', flex: 1 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: dim, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      {React.createElement(IconEl, { size: 18, color })}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', gap: 7, marginBottom: 5, alignItems: 'center' }}>
                        <span style={{ fontSize: 9, fontWeight: 800, color, background: dim, padding: '2px 7px', borderRadius: 5, letterSpacing: 0.8 }}>{alert.severity.toUpperCase()}</span>
                        {alert.countdown && (
                          <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                            {React.createElement(window.lucide.Clock, { size: 11, color: t.textMuted })}
                            <span style={{ fontSize: 11, color: t.textMuted }}>in {alert.countdown}</span>
                          </div>
                        )}
                      </div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: t.text, lineHeight: 1.35 }}>{alert.title}</div>
                    </div>
                  </div>
                  <button onClick={(e) => { e.stopPropagation(); setDismissed([...dismissed, alert.id]); }}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: t.textMuted, padding: 4, fontFamily: "'Space Grotesk', sans-serif" }}>
                    {React.createElement(window.lucide.X, { size: 16 })}
                  </button>
                </div>
                <div style={{ fontSize: 13, color: t.textSec, lineHeight: 1.5, marginBottom: 10 }}>{alert.detail}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
                    {React.createElement(window.lucide.MapPin, { size: 11, color: t.textMuted })}
                    <span style={{ fontSize: 11, color: t.textMuted }}>{alert.area}</span>
                  </div>
                  <div style={{ background: dim, borderRadius: 8, padding: '5px 10px', display: 'flex', alignItems: 'center', gap: 5 }}>
                    {React.createElement(window.lucide.ArrowRight, { size: 11, color })}
                    <span style={{ fontSize: 11, color, fontWeight: 700 }}>{alert.action}</span>
                  </div>
                </div>
                <div style={{ marginTop: 8, fontSize: 11, color: t.textMuted }}>
                  {React.createElement(window.lucide.Clock, { size: 11, color: t.textMuted, style: { display: 'inline', marginRight: 4, verticalAlign: 'middle' } })}
                  {alert.time}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Timeline Screen ──────────────────────────────────────────────────────────
function TimelineScreen({ t }) {
  const [openId, setOpenId] = useState(1);

  return (
    <div style={{ flex: 1, overflowY: 'auto', background: t.bg }}>
      <div style={{ background: t.surface, padding: '0 16px 14px', borderBottom: `1px solid ${t.border}` }}>
        <div style={{ fontSize: 22, fontWeight: 800, color: t.text, letterSpacing: -0.5 }}>Impact Timelines</div>
        <div style={{ fontSize: 12, color: t.textSec, marginTop: 3 }}>How today's stories unfold over time</div>
      </div>

      <div style={{ padding: '12px 14px 80px' }}>
        {timelinesData.map(story => {
          const color = impactColor(99, story.urgency, t);
          const dim = impactDim(99, story.urgency, t);
          const isOpen = openId === story.id;
          return (
            <div key={story.id} style={{ background: t.card, borderRadius: 16, marginBottom: 10, border: `1px solid ${t.border}`, overflow: 'hidden' }}>
              <button onClick={() => setOpenId(isOpen ? null : story.id)}
                style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', padding: '14px', textAlign: 'left', fontFamily: "'Space Grotesk', sans-serif" }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ flex: 1, marginRight: 10 }}>
                    <div style={{ display: 'flex', gap: 6, marginBottom: 6 }}>
                      <span style={{ fontSize: 9, fontWeight: 800, color, background: dim, padding: '2px 7px', borderRadius: 5, letterSpacing: 0.8 }}>{story.urgency.toUpperCase()}</span>
                      <span style={{ fontSize: 9, fontWeight: 700, color: t.tagText, background: t.tag, padding: '2px 7px', borderRadius: 5 }}>{story.category}</span>
                    </div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: t.text, lineHeight: 1.3 }}>{story.title}</div>
                    <div style={{ fontSize: 12, color: t.textSec, marginTop: 4, lineHeight: 1.4 }}>{story.summary}</div>
                  </div>
                  <div style={{ color: t.textMuted, marginTop: 4, flexShrink: 0 }}>
                    {React.createElement(isOpen ? window.lucide.ChevronUp : window.lucide.ChevronDown, { size: 18 })}
                  </div>
                </div>
              </button>

              {isOpen && (
                <div style={{ padding: '0 14px 14px' }}>
                  <div style={{ borderLeft: `2px solid ${t.border}`, marginLeft: 8, paddingLeft: 16 }}>
                    {story.events.map((ev, i) => {
                      const isDone = ev.status === 'done';
                      const isFuture = ev.status === 'future';
                      const dotColor = isDone ? t.low : isFuture ? t.textMuted : color;
                      return (
                        <div key={i} style={{ position: 'relative', paddingBottom: i === story.events.length - 1 ? 0 : 18 }}>
                          <div style={{ position: 'absolute', left: -21, top: 4, width: 10, height: 10, borderRadius: '50%', background: dotColor, border: `2px solid ${t.card}`, boxShadow: `0 0 0 2px ${dotColor}` }} />
                          <div style={{ fontSize: 10, color: dotColor, fontWeight: 700, marginBottom: 2, letterSpacing: 0.3 }}>{ev.time}</div>
                          <div style={{ fontSize: 13, fontWeight: 700, color: isFuture ? t.textSec : t.text }}>{ev.label}</div>
                          <div style={{ fontSize: 12, color: t.textSec, lineHeight: 1.5, marginTop: 2 }}>{ev.detail}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Actions Screen ───────────────────────────────────────────────────────────
function ActionsScreen({ t }) {
  const [completed, setCompleted] = useState([]);
  const [expanded, setExpanded] = useState(null);

  const toggle = (id) => setCompleted(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  const active = actionsData.filter(a => !completed.includes(a.id));
  const done = actionsData.filter(a => completed.includes(a.id));
  const pct = Math.round(completed.length / actionsData.length * 100);

  return (
    <div style={{ flex: 1, overflowY: 'auto', background: t.bg }}>
      <div style={{ background: t.surface, padding: '0 16px 14px', borderBottom: `1px solid ${t.border}` }}>
        <div style={{ fontSize: 22, fontWeight: 800, color: t.text, letterSpacing: -0.5 }}>What To Do</div>
        <div style={{ fontSize: 12, color: t.textSec, marginTop: 3 }}>Practical actions based on today's news</div>
        <div style={{ marginTop: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: t.textSec, marginBottom: 6 }}>
            <span>{completed.length} of {actionsData.length} actions taken</span>
            <span style={{ color: t.low, fontWeight: 700 }}>{pct}%</span>
          </div>
          <div style={{ height: 4, background: t.card, borderRadius: 4, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${pct}%`, background: t.low, borderRadius: 4, transition: 'width 0.4s ease' }} />
          </div>
        </div>
      </div>

      <div style={{ padding: '12px 14px 80px' }}>
        {active.map(action => {
          const color = impactColor(action.impact, action.priority, t);
          const dim = impactDim(action.impact, action.priority, t);
          const isOpen = expanded === action.id;
          const IconEl = window.lucide[action.icon] || window.lucide.ArrowRight;
          return (
            <div key={action.id} style={{ background: t.card, borderRadius: 16, marginBottom: 10, border: `1px solid ${t.border}`, overflow: 'hidden' }}>
              <div style={{ padding: '14px' }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <button onClick={() => toggle(action.id)}
                    style={{ width: 26, height: 26, borderRadius: '50%', border: `2px solid ${color}`, background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2, fontFamily: "'Space Grotesk', sans-serif" }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', gap: 6, marginBottom: 5, alignItems: 'center' }}>
                      <span style={{ fontSize: 9, fontWeight: 800, color, background: dim, padding: '2px 7px', borderRadius: 5, letterSpacing: 0.8 }}>{urgencyLabel(action.priority)}</span>
                      <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                        {React.createElement(window.lucide.Zap, { size: 11, color: t.textMuted })}
                        <span style={{ fontSize: 10, color: t.textMuted }}>Impact {action.impact}</span>
                      </div>
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: t.text, lineHeight: 1.35 }}>{action.title}</div>
                    <div style={{ fontSize: 12, color: t.textSec, marginTop: 4, lineHeight: 1.4 }}>{action.reason}</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
                      <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
                        {React.createElement(window.lucide.Clock, { size: 11, color: t.textMuted })}
                        <span style={{ fontSize: 11, color: t.textMuted }}>{action.deadline}</span>
                      </div>
                      <button onClick={() => setExpanded(isOpen ? null : action.id)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 11, color: t.primary, fontWeight: 600, fontFamily: "'Space Grotesk', sans-serif" }}>
                        {isOpen ? 'Hide steps ▲' : 'Show steps ▼'}
                      </button>
                    </div>
                  </div>
                </div>
                {isOpen && (
                  <div style={{ marginTop: 12, paddingTop: 12, borderTop: `1px solid ${t.border}` }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: t.textMuted, marginBottom: 8, letterSpacing: 0.6 }}>NEXT STEPS</div>
                    {action.steps.map((step, i) => (
                      <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: 8 }}>
                        <div style={{ width: 20, height: 20, borderRadius: '50%', background: dim, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <span style={{ fontSize: 10, fontWeight: 800, color }}>{i + 1}</span>
                        </div>
                        <span style={{ fontSize: 13, color: t.textSec, lineHeight: 1.4, flex: 1 }}>{step}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {done.length > 0 && (
          <div style={{ marginTop: 8 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: t.textMuted, marginBottom: 8, letterSpacing: 0.6 }}>COMPLETED</div>
            {done.map(action => (
              <div key={action.id} style={{ background: t.card, borderRadius: 12, padding: '12px 14px', marginBottom: 8, opacity: 0.55, display: 'flex', gap: 10, alignItems: 'center', border: `1px solid ${t.border}` }}>
                <div style={{ width: 22, height: 22, borderRadius: '50%', background: t.low, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {React.createElement(window.lucide.Check, { size: 13, color: '#fff' })}
                </div>
                <span style={{ fontSize: 13, fontWeight: 600, color: t.textSec, textDecoration: 'line-through', flex: 1 }}>{action.title}</span>
                <button onClick={() => toggle(action.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: t.textMuted, fontSize: 11, fontFamily: "'Space Grotesk', sans-serif" }}>Undo</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Settings Screen ──────────────────────────────────────────────────────────
function SettingsScreen({ t, isDark, toggleTheme }) {
  const [notifOn, setNotifOn] = useState(true);
  const [locationOn, setLocationOn] = useState(true);
  const [calOn, setCalOn] = useState(false);
  const categories = ['Commute', 'Finance', 'Health', 'Education', 'Local Gov', 'Weather'];
  const [selectedCats, setSelectedCats] = useState(['Commute', 'Finance', 'Health']);
  const toggleCat = (c) => setSelectedCats(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]);

  const Toggle = ({ on, onToggle }) => (
    <button onClick={onToggle} style={{ width: 44, height: 24, borderRadius: 12, background: on ? t.primary : t.toggleBg, border: 'none', cursor: 'pointer', position: 'relative', transition: 'background 0.2s', flexShrink: 0, fontFamily: "'Space Grotesk', sans-serif" }}>
      <div style={{ position: 'absolute', top: 3, left: on ? 23 : 3, width: 18, height: 18, borderRadius: '50%', background: '#fff', transition: 'left 0.2s ease', boxShadow: '0 1px 3px rgba(0,0,0,0.25)' }} />
    </button>
  );

  const Row = ({ icon, label, sub, right }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px' }}>
      <div style={{ width: 36, height: 36, borderRadius: 10, background: t.primaryDim, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        {React.createElement(window.lucide[icon], { size: 17, color: t.primary })}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: t.text }}>{label}</div>
        {sub && <div style={{ fontSize: 11, color: t.textSec, marginTop: 1 }}>{sub}</div>}
      </div>
      {right}
    </div>
  );

  const Divider = () => <div style={{ height: 1, background: t.border, marginLeft: 64 }} />;

  return (
    <div style={{ flex: 1, overflowY: 'auto', background: t.bg }}>
      <div style={{ background: t.surface, padding: '0 16px 20px', borderBottom: `1px solid ${t.border}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
          <div style={{ width: 52, height: 52, borderRadius: '50%', background: t.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <span style={{ fontSize: 22, fontWeight: 800, color: '#fff' }}>A</span>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 18, fontWeight: 800, color: t.text }}>Alex Rivera</div>
            <div style={{ fontSize: 12, color: t.textSec }}>Freelancer · New York, NY</div>
          </div>
          <button onClick={toggleTheme} style={{ width: 40, height: 40, borderRadius: '50%', background: t.toggleBg, border: `1px solid ${t.border}`, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Space Grotesk', sans-serif" }}>
            {React.createElement(isDark ? window.lucide.Sun : window.lucide.Moon, { size: 18, color: isDark ? '#FFB627' : t.primary })}
          </button>
        </div>
        <div style={{ background: t.primaryDim, borderRadius: 14, padding: '12px 14px', display: 'flex', justifyContent: 'space-around' }}>
          {[{ n: '6', l: 'Stories Today' }, { n: '3', l: 'High Impact' }, { n: '4', l: 'Pending Actions' }].map(({ n, l }) => (
            <div key={l} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: t.primary }}>{n}</div>
              <div style={{ fontSize: 11, color: t.textSec }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: '12px 14px 80px' }}>
        <div style={{ background: t.card, borderRadius: 16, overflow: 'hidden', border: `1px solid ${t.border}`, marginBottom: 12 }}>
          <div style={{ padding: '10px 16px 6px', fontSize: 11, fontWeight: 700, color: t.textMuted, letterSpacing: 0.8 }}>NOTIFICATIONS & DATA</div>
          <Row icon="Bell" label="Push Notifications" sub="Breaking news & local alerts" right={<Toggle on={notifOn} onToggle={() => setNotifOn(!notifOn)} />} />
          <Divider />
          <Row icon="MapPin" label="Location Access" sub="New York, NY (auto-detected)" right={<Toggle on={locationOn} onToggle={() => setLocationOn(!locationOn)} />} />
          <Divider />
          <Row icon="Calendar" label="Calendar Sync" sub="Personalize based on your schedule" right={<Toggle on={calOn} onToggle={() => setCalOn(!calOn)} />} />
        </div>

        <div style={{ background: t.card, borderRadius: 16, overflow: 'hidden', border: `1px solid ${t.border}`, marginBottom: 12 }}>
          <div style={{ padding: '10px 16px 6px', fontSize: 11, fontWeight: 700, color: t.textMuted, letterSpacing: 0.8 }}>MY IMPACT CATEGORIES</div>
          <div style={{ padding: '8px 16px 14px', display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {categories.map(c => (
              <button key={c} onClick={() => toggleCat(c)}
                style={{ padding: '6px 14px', borderRadius: 20, border: `1px solid ${selectedCats.includes(c) ? t.primary : t.border}`, background: selectedCats.includes(c) ? t.primaryDim : 'none', color: selectedCats.includes(c) ? t.primary : t.textSec, fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: "'Space Grotesk', sans-serif" }}>
                {c}
              </button>
            ))}
          </div>
        </div>

        <div style={{ background: t.card, borderRadius: 16, overflow: 'hidden', border: `1px solid ${t.border}`, marginBottom: 12 }}>
          <div style={{ padding: '10px 16px 6px', fontSize: 11, fontWeight: 700, color: t.textMuted, letterSpacing: 0.8 }}>APPEARANCE</div>
          <div style={{ padding: '8px 16px 14px', display: 'flex', gap: 10 }}>
            {[{ label: 'Dark Mode', val: true }, { label: 'Light Mode', val: false }].map(({ label, val }) => (
              <button key={label} onClick={() => val !== isDark && toggleTheme()}
                style={{ flex: 1, padding: '10px', borderRadius: 12, border: `2px solid ${isDark === val ? t.primary : t.border}`, background: isDark === val ? t.primaryDim : 'none', cursor: 'pointer', fontFamily: "'Space Grotesk', sans-serif", display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                {React.createElement(val ? window.lucide.Moon : window.lucide.Sun, { size: 20, color: isDark === val ? t.primary : t.textMuted })}
                <span style={{ fontSize: 12, fontWeight: 600, color: isDark === val ? t.primary : t.textSec }}>{label}</span>
              </button>
            ))}
          </div>
        </div>

        <div style={{ background: t.card, borderRadius: 16, overflow: 'hidden', border: `1px solid ${t.border}`, marginBottom: 12 }}>
          <div style={{ padding: '10px 16px 6px', fontSize: 11, fontWeight: 700, color: t.textMuted, letterSpacing: 0.8 }}>ACCOUNT</div>
          <Row icon="Shield" label="Privacy & Data" sub="Control what Signal Slice learns" right={React.createElement(window.lucide.ChevronRight, { size: 16, color: t.textMuted })} />
          <Divider />
          <Row icon="Star" label="Rate Signal Slice" sub="Help us improve" right={React.createElement(window.lucide.ChevronRight, { size: 16, color: t.textMuted })} />
        </div>

        <div style={{ textAlign: 'center', padding: '8px 0 4px' }}>
          <div style={{ fontSize: 11, color: t.textMuted }}>Signal Slice v1.0.0 · Prototype</div>
          <div style={{ fontSize: 11, color: t.textMuted, marginTop: 2 }}>News ranked by impact, not noise.</div>
        </div>
      </div>
    </div>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isDark, setIsDark] = useState(true);
  const t = isDark ? themes.dark : themes.light;

  const tabs = [
    { id: 'home', icon: 'Zap', label: 'Feed' },
    { id: 'alerts', icon: 'Bell', label: 'Alerts' },
    { id: 'timeline', icon: 'TrendingUp', label: 'Timeline' },
    { id: 'actions', icon: 'CheckCircle', label: 'Actions' },
    { id: 'settings', icon: 'User', label: 'Profile' },
  ];

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#06080F', fontFamily: "'Space Grotesk', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 0; height: 0; }
        button { font-family: 'Space Grotesk', sans-serif; }
        @keyframes pulseUrgent {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.65; }
        }
      `}</style>

      {/* Glow behind phone */}
      <div style={{ position: 'fixed', width: 400, height: 400, borderRadius: '50%', background: isDark ? 'radial-gradient(circle, rgba(77,139,255,0.12) 0%, transparent 70%)' : 'radial-gradient(circle, rgba(37,87,231,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />

      {/* Phone frame */}
      <div style={{
        width: 375, height: 812, background: t.surface,
        borderRadius: 44, overflow: 'hidden',
        display: 'flex', flexDirection: 'column',
        boxShadow: isDark
          ? '0 60px 130px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.09)'
          : '0 60px 130px rgba(0,0,0,0.35), 0 0 0 1px rgba(0,0,0,0.12)',
        position: 'relative',
      }}>
        {/* Status bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 24px 0', background: t.surface }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: t.text }}>9:41</span>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center', color: t.text }}>
            {React.createElement(window.lucide.Wifi, { size: 14 })}
            {React.createElement(window.lucide.Battery, { size: 16 })}
          </div>
        </div>

        {/* Dynamic Island */}
        <div style={{ display: 'flex', justifyContent: 'center', padding: '8px 0 6px', background: t.surface }}>
          <div style={{ width: 118, height: 34, background: '#000', borderRadius: 20 }} />
        </div>

        {/* Main content */}
        <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
          {activeTab === 'home' && <HomeScreen t={t} />}
          {activeTab === 'alerts' && <AlertsScreen t={t} />}
          {activeTab === 'timeline' && <TimelineScreen t={t} />}
          {activeTab === 'actions' && <ActionsScreen t={t} />}
          {activeTab === 'settings' && <SettingsScreen t={t} isDark={isDark} toggleTheme={() => setIsDark(!isDark)} />}
        </div>

        {/* Bottom navigation */}
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', padding: '8px 0 22px', background: t.nav, borderTop: `1px solid ${t.navBorder}` }}>
          {tabs.map(tab => {
            const active = activeTab === tab.id;
            return (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ background: 'none', border: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, cursor: 'pointer', padding: '4px 10px', color: active ? t.primary : t.textMuted, fontFamily: "'Space Grotesk', sans-serif", position: 'relative' }}>
                {tab.id === 'alerts' && alertsData.length > 0 && (
                  <div style={{ position: 'absolute', top: 2, right: 8, width: 7, height: 7, borderRadius: '50%', background: t.urgent, border: `1.5px solid ${t.nav}` }} />
                )}
                {React.createElement(window.lucide[tab.icon], { size: 22, strokeWidth: active ? 2.5 : 2 })}
                <span style={{ fontSize: 10, fontWeight: active ? 700 : 500 }}>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
