const { useState, useEffect, useRef } = React;

const themes = {
  light: {
    bg: '#F5F4F2',
    surface: '#FFFFFF',
    surfaceAlt: '#F0EEF8',
    card: '#FFFFFF',
    border: '#E8E5F0',
    text: '#1A1628',
    textSecondary: '#6B6480',
    textMuted: '#A09AB8',
    primary: '#6C47FF',
    primaryLight: '#EDE9FF',
    primaryDark: '#4D2FE0',
    accent: '#FF6B47',
    accentLight: '#FFF0EC',
    success: '#22C55E',
    successLight: '#DCFCE7',
    warning: '#F59E0B',
    warningLight: '#FEF3C7',
    danger: '#EF4444',
    dangerLight: '#FEE2E2',
    gradient: 'linear-gradient(135deg, #6C47FF 0%, #A78BFA 100%)',
    navBg: '#FFFFFF',
    statusBar: '#1A1628',
  },
  dark: {
    bg: '#0F0D1A',
    surface: '#1A1628',
    surfaceAlt: '#221E35',
    card: '#221E35',
    border: '#2D2845',
    text: '#F0EEFF',
    textSecondary: '#9D93C8',
    textMuted: '#5E5880',
    primary: '#8B6DFF',
    primaryLight: '#2D2459',
    primaryDark: '#6C47FF',
    accent: '#FF7A5C',
    accentLight: '#3D1F17',
    success: '#34D399',
    successLight: '#0D2E23',
    warning: '#FBBF24',
    warningLight: '#2E2309',
    danger: '#F87171',
    dangerLight: '#2E0F0F',
    gradient: 'linear-gradient(135deg, #8B6DFF 0%, #C4B5FD 100%)',
    navBg: '#1A1628',
    statusBar: '#F0EEFF',
  }
};

const fontLink = `@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');`;

const deals = [
  { id: 1, company: 'Meridian Software', contact: 'Alex Torres', value: 48000, stage: 'Proposal Sent', daysStalled: 6, riskLevel: 'high', lastActivity: 'Proposal opened 4x last night', avatar: 'MT', signal: 'Proposal viewed 4 times after 9pm — high intent, no reply', suggestedAction: 'Send a personal video message today', recoveryChance: 82 },
  { id: 2, company: 'Creston Logistics', contact: 'Dana Park', value: 22000, stage: 'Discovery', daysStalled: 12, riskLevel: 'high', lastActivity: 'No reply after demo', avatar: 'DP', signal: 'Went silent after 45-min demo — common drop-off pattern', suggestedAction: 'Share a relevant case study from their industry', recoveryChance: 61 },
  { id: 3, company: 'Vantage Health', contact: 'Marcus Webb', value: 95000, stage: 'Negotiation', daysStalled: 3, riskLevel: 'medium', lastActivity: 'Last call 3 days ago', avatar: 'MW', signal: 'Contract not reviewed yet, Q2 budget closes soon', suggestedAction: 'Offer a 30-min budget review call this week', recoveryChance: 74 },
  { id: 4, company: 'Oakfield Retail', contact: 'Priya Nair', value: 15500, stage: 'Qualification', daysStalled: 8, riskLevel: 'medium', lastActivity: 'Email opened, no click', avatar: 'PN', signal: 'Opened email 3x but didn\'t click pricing link', suggestedAction: 'Follow up with a direct pricing summary', recoveryChance: 55 },
  { id: 5, company: 'Bluewave Media', contact: 'Jordan Lee', value: 31000, stage: 'Proposal Sent', daysStalled: 2, riskLevel: 'low', lastActivity: 'Meeting scheduled', avatar: 'JL', signal: 'Meeting booked for Friday — warm lead', suggestedAction: 'Prepare a custom ROI one-pager', recoveryChance: 88 },
];

const renewals = [
  { id: 1, company: 'TechCore Inc.', value: 64000, daysUntil: 18, usageDrop: 42, contactName: 'Sarah Kim', avatar: 'SK', risk: 'high', note: 'Usage dropped 42% in last 30 days' },
  { id: 2, company: 'Pinnacle Group', value: 28500, daysUntil: 34, usageDrop: 12, contactName: 'Ben Okafor', avatar: 'BO', risk: 'medium', note: 'No support tickets — could be content or disengaged' },
  { id: 3, company: 'Summit Analytics', value: 41000, daysUntil: 7, usageDrop: 0, contactName: 'Lily Chen', avatar: 'LC', risk: 'low', note: 'Active user, expansion opportunity detected' },
  { id: 4, company: 'Harlow Consulting', value: 19200, daysUntil: 52, usageDrop: 28, contactName: 'Tom Rivera', avatar: 'TR', risk: 'medium', note: 'Key user left the company last month' },
];

const activities = [
  { id: 1, type: 'proposal_viewed', company: 'Meridian Software', time: '2h ago', detail: 'Proposal viewed 4 times', icon: 'Eye', color: '#6C47FF' },
  { id: 2, type: 'renewal_risk', company: 'TechCore Inc.', time: '4h ago', detail: 'Usage dropped below threshold', icon: 'TrendingDown', color: '#EF4444' },
  { id: 3, type: 'follow_up_sent', company: 'Vantage Health', time: '6h ago', detail: 'Follow-up sent via suggestion', icon: 'Mail', color: '#22C55E' },
  { id: 4, type: 'meeting_gap', company: 'Creston Logistics', time: '1d ago', detail: '12 days since last contact', icon: 'Clock', color: '#F59E0B' },
  { id: 5, type: 'reply_received', company: 'Bluewave Media', time: '1d ago', detail: 'Replied to follow-up email', icon: 'MessageCircle', color: '#22C55E' },
  { id: 6, type: 'contract_stalled', company: 'Oakfield Retail', time: '2d ago', detail: 'Contract not opened in 8 days', icon: 'FileText', color: '#F59E0B' },
];

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [theme, setTheme] = useState('light');
  const [selectedDeal, setSelectedDeal] = useState(null);
  const [pressedBtn, setPressedBtn] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [nudgeSent, setNudgeSent] = useState({});
  const [expandedAlert, setExpandedAlert] = useState(null);

  const t = themes[theme];

  const styleTag = `
    ${fontLink}
    * { box-sizing: border-box; margin: 0; padding: 0; }
    ::-webkit-scrollbar { display: none; }
    .scroll-container { -webkit-overflow-scrolling: touch; }
  `;

  const handleNudge = (dealId) => {
    setNudgeSent(prev => ({ ...prev, [dealId]: true }));
    setTimeout(() => setNudgeSent(prev => ({ ...prev, [dealId]: false })), 3000);
  };

  const handlePress = (id) => {
    setPressedBtn(id);
    setTimeout(() => setPressedBtn(null), 150);
  };

  const filteredDeals = activeFilter === 'all' ? deals :
    activeFilter === 'high' ? deals.filter(d => d.riskLevel === 'high') :
    activeFilter === 'medium' ? deals.filter(d => d.riskLevel === 'medium') :
    deals.filter(d => d.riskLevel === 'low');

  const totalAtRisk = deals.reduce((sum, d) => d.riskLevel !== 'low' ? sum + d.value : sum, 0);
  const highRiskCount = deals.filter(d => d.riskLevel === 'high').length;

  // ── Screens ──

  const HomeScreen = () => (
    <div style={{ flex: 1, overflowY: 'auto', background: t.bg }} className="scroll-container">
      <style>{styleTag}</style>
      {/* Header */}
      <div style={{ background: t.surface, padding: '16px 20px 20px', borderBottom: `1px solid ${t.border}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div>
            <div style={{ fontSize: 13, color: t.textMuted, fontWeight: 500, marginBottom: 2 }}>Good morning,</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: t.text, fontFamily: 'Plus Jakarta Sans' }}>Revenue Radar</div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: t.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {React.createElement(window.lucide.Bell, { size: 16, color: t.primary })}
            </div>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: t.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#fff', fontSize: 13 }}>
              JD
            </div>
          </div>
        </div>

        {/* Summary pills */}
        <div style={{ display: 'flex', gap: 10 }}>
          <div style={{ flex: 1, background: t.dangerLight, borderRadius: 14, padding: '12px 14px' }}>
            <div style={{ fontSize: 20, fontWeight: 800, color: t.danger }}>${(totalAtRisk/1000).toFixed(0)}k</div>
            <div style={{ fontSize: 11, color: t.textSecondary, marginTop: 2, fontWeight: 500 }}>At Risk Revenue</div>
          </div>
          <div style={{ flex: 1, background: t.primaryLight, borderRadius: 14, padding: '12px 14px' }}>
            <div style={{ fontSize: 20, fontWeight: 800, color: t.primary }}>{highRiskCount}</div>
            <div style={{ fontSize: 11, color: t.textSecondary, marginTop: 2, fontWeight: 500 }}>Urgent Actions</div>
          </div>
          <div style={{ flex: 1, background: t.successLight, borderRadius: 14, padding: '12px 14px' }}>
            <div style={{ fontSize: 20, fontWeight: 800, color: t.success }}>3</div>
            <div style={{ fontSize: 11, color: t.textSecondary, marginTop: 2, fontWeight: 500 }}>Wins This Week</div>
          </div>
        </div>
      </div>

      <div style={{ padding: '20px 20px 100px' }}>
        {/* Top Priority */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>Top Priority Today</div>
          <div style={{ background: t.gradient, borderRadius: 20, padding: 20, color: '#fff', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: -20, right: -20, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 600, opacity: 0.7, marginBottom: 4 }}>HIGH INTENT SIGNAL</div>
                <div style={{ fontSize: 17, fontWeight: 800 }}>Meridian Software</div>
                <div style={{ fontSize: 13, opacity: 0.8, marginTop: 2 }}>Alex Torres · $48,000</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: 12, padding: '6px 12px', fontSize: 13, fontWeight: 700 }}>82%</div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.15)', borderRadius: 12, padding: '10px 14px', marginBottom: 14, fontSize: 13 }}>
              Proposal viewed 4× after 9pm — strong buying signal detected
            </div>
            <div
              onClick={() => { handlePress('nudge-top'); handleNudge(0); }}
              style={{ background: '#fff', color: t.primary, borderRadius: 12, padding: '10px 16px', fontSize: 13, fontWeight: 700, textAlign: 'center', cursor: 'pointer', transform: pressedBtn === 'nudge-top' ? 'scale(0.97)' : 'scale(1)', transition: 'transform 0.15s' }}
            >
              {nudgeSent[0] ? '✓ Follow-up Queued!' : 'Send Personal Video Follow-up →'}
            </div>
          </div>
        </div>

        {/* Recent Signals */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Live Signals</div>
            <div style={{ fontSize: 12, color: t.primary, fontWeight: 600 }}>See all</div>
          </div>
          {activities.slice(0, 4).map(a => {
            const Icon = window.lucide[a.icon];
            return (
              <div key={a.id} style={{ background: t.card, borderRadius: 14, padding: '12px 14px', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 12, border: `1px solid ${t.border}` }}>
                <div style={{ width: 38, height: 38, borderRadius: 12, background: a.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {Icon && React.createElement(Icon, { size: 17, color: a.color })}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: t.text }}>{a.company}</div>
                  <div style={{ fontSize: 12, color: t.textSecondary, marginTop: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{a.detail}</div>
                </div>
                <div style={{ fontSize: 11, color: t.textMuted, flexShrink: 0 }}>{a.time}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const DealsScreen = () => (
    <div style={{ flex: 1, overflowY: 'auto', background: t.bg }} className="scroll-container">
      {selectedDeal ? (
        <DealDetailView deal={selectedDeal} />
      ) : (
        <div>
          <div style={{ background: t.surface, padding: '16px 20px 14px', borderBottom: `1px solid ${t.border}` }}>
            <div style={{ fontSize: 20, fontWeight: 800, color: t.text, marginBottom: 14 }}>Stalled Deals</div>
            <div style={{ display: 'flex', gap: 8, overflowX: 'auto' }} className="scroll-container">
              {['all', 'high', 'medium', 'low'].map(f => (
                <div
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  style={{ padding: '6px 14px', borderRadius: 20, fontSize: 12, fontWeight: 600, cursor: 'pointer', flexShrink: 0, background: activeFilter === f ? t.primary : t.surfaceAlt, color: activeFilter === f ? '#fff' : t.textSecondary, transition: 'all 0.2s' }}
                >
                  {f === 'all' ? 'All Deals' : f.charAt(0).toUpperCase() + f.slice(1) + ' Risk'}
                </div>
              ))}
            </div>
          </div>
          <div style={{ padding: '16px 20px 100px' }}>
            {filteredDeals.map(deal => {
              const riskColor = deal.riskLevel === 'high' ? t.danger : deal.riskLevel === 'medium' ? t.warning : t.success;
              const riskBg = deal.riskLevel === 'high' ? t.dangerLight : deal.riskLevel === 'medium' ? t.warningLight : t.successLight;
              return (
                <div
                  key={deal.id}
                  onClick={() => setSelectedDeal(deal)}
                  style={{ background: t.card, borderRadius: 16, padding: '14px 16px', marginBottom: 12, border: `1px solid ${t.border}`, cursor: 'pointer', transition: 'transform 0.15s' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                    <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                      <div style={{ width: 40, height: 40, borderRadius: 12, background: t.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 13 }}>
                        {deal.avatar}
                      </div>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 700, color: t.text }}>{deal.company}</div>
                        <div style={{ fontSize: 12, color: t.textSecondary }}>{deal.contact}</div>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: 15, fontWeight: 800, color: t.text }}>${(deal.value/1000).toFixed(0)}k</div>
                      <div style={{ fontSize: 11, color: riskColor, background: riskBg, padding: '2px 8px', borderRadius: 20, fontWeight: 600 }}>
                        {deal.riskLevel} risk
                      </div>
                    </div>
                  </div>
                  <div style={{ background: t.surfaceAlt, borderRadius: 10, padding: '8px 12px', marginBottom: 10, fontSize: 12, color: t.textSecondary }}>
                    {React.createElement(window.lucide.Zap, { size: 12, color: t.primary, style: { display: 'inline', marginRight: 4 } })}
                    {deal.signal}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontSize: 11, color: t.textMuted }}>{deal.stage} · {deal.daysStalled}d stalled</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <div style={{ width: 60, height: 4, borderRadius: 2, background: t.border, overflow: 'hidden' }}>
                        <div style={{ width: `${deal.recoveryChance}%`, height: '100%', background: t.primary, borderRadius: 2 }} />
                      </div>
                      <div style={{ fontSize: 11, fontWeight: 700, color: t.primary }}>{deal.recoveryChance}%</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );

  const DealDetailView = ({ deal }) => {
    const riskColor = deal.riskLevel === 'high' ? t.danger : deal.riskLevel === 'medium' ? t.warning : t.success;
    return (
      <div style={{ background: t.bg }}>
        <div style={{ background: t.surface, padding: '14px 20px 16px', borderBottom: `1px solid ${t.border}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
            <div onClick={() => setSelectedDeal(null)} style={{ width: 34, height: 34, borderRadius: 10, background: t.surfaceAlt, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              {React.createElement(window.lucide.ChevronLeft, { size: 18, color: t.text })}
            </div>
            <div style={{ fontSize: 17, fontWeight: 700, color: t.text }}>Deal Details</div>
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <div style={{ width: 52, height: 52, borderRadius: 16, background: t.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: 16 }}>
              {deal.avatar}
            </div>
            <div>
              <div style={{ fontSize: 18, fontWeight: 800, color: t.text }}>{deal.company}</div>
              <div style={{ fontSize: 13, color: t.textSecondary }}>{deal.contact} · {deal.stage}</div>
            </div>
          </div>
        </div>
        <div style={{ padding: '20px 20px 100px', overflowY: 'auto' }} className="scroll-container">
          {/* Value + Risk row */}
          <div style={{ display: 'flex', gap: 10, marginBottom: 18 }}>
            <div style={{ flex: 1, background: t.card, borderRadius: 14, padding: '14px', border: `1px solid ${t.border}` }}>
              <div style={{ fontSize: 11, color: t.textMuted, marginBottom: 4, fontWeight: 500 }}>DEAL VALUE</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: t.text }}>${deal.value.toLocaleString()}</div>
            </div>
            <div style={{ flex: 1, background: t.card, borderRadius: 14, padding: '14px', border: `1px solid ${t.border}` }}>
              <div style={{ fontSize: 11, color: t.textMuted, marginBottom: 4, fontWeight: 500 }}>RECOVERY ODDS</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: t.primary }}>{deal.recoveryChance}%</div>
            </div>
          </div>

          {/* AI Signal */}
          <div style={{ background: t.primaryLight, borderRadius: 16, padding: '14px 16px', marginBottom: 16, border: `1px solid ${t.primary}30` }}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, background: t.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                {React.createElement(window.lucide.Zap, { size: 14, color: '#fff' })}
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: t.primary, marginBottom: 4 }}>AI SIGNAL DETECTED</div>
                <div style={{ fontSize: 13, color: t.text, lineHeight: 1.5 }}>{deal.signal}</div>
              </div>
            </div>
          </div>

          {/* Suggested Action */}
          <div style={{ background: t.card, borderRadius: 16, padding: '14px 16px', marginBottom: 16, border: `1px solid ${t.border}` }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: t.textMuted, marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Recommended Action</div>
            <div style={{ fontSize: 14, color: t.text, lineHeight: 1.5, marginBottom: 14 }}>{deal.suggestedAction}</div>
            <div style={{ display: 'flex', gap: 10 }}>
              <div
                onClick={() => handleNudge(deal.id)}
                style={{ flex: 1, background: t.gradient, color: '#fff', borderRadius: 12, padding: '11px', fontSize: 13, fontWeight: 700, textAlign: 'center', cursor: 'pointer' }}
              >
                {nudgeSent[deal.id] ? '✓ Sent!' : 'Send Nudge'}
              </div>
              <div style={{ flex: 1, background: t.surfaceAlt, color: t.text, borderRadius: 12, padding: '11px', fontSize: 13, fontWeight: 600, textAlign: 'center', cursor: 'pointer' }}>
                Customize
              </div>
            </div>
          </div>

          {/* Activity timeline */}
          <div style={{ background: t.card, borderRadius: 16, padding: '14px 16px', border: `1px solid ${t.border}` }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: t.textMuted, marginBottom: 14, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Activity Timeline</div>
            {[
              { label: 'Proposal viewed ×4', time: '2 hours ago', icon: 'Eye', color: t.primary },
              { label: 'Proposal sent', time: '6 days ago', icon: 'Send', color: t.success },
              { label: 'Demo call — 45 min', time: '9 days ago', icon: 'Video', color: t.warning },
              { label: 'Initial contact', time: '14 days ago', icon: 'Mail', color: t.textMuted },
            ].map((item, i) => {
              const Icon = window.lucide[item.icon];
              return (
                <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: i < 3 ? 14 : 0 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                    <div style={{ width: 30, height: 30, borderRadius: 8, background: item.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {Icon && React.createElement(Icon, { size: 13, color: item.color })}
                    </div>
                    {i < 3 && <div style={{ width: 1, height: 14, background: t.border, marginTop: 2 }} />}
                  </div>
                  <div>
                    <div style={{ fontSize: 13, color: t.text, fontWeight: 500 }}>{item.label}</div>
                    <div style={{ fontSize: 11, color: t.textMuted }}>{item.time}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  const RenewalsScreen = () => (
    <div style={{ flex: 1, overflowY: 'auto', background: t.bg }} className="scroll-container">
      <div style={{ background: t.surface, padding: '16px 20px 16px', borderBottom: `1px solid ${t.border}` }}>
        <div style={{ fontSize: 20, fontWeight: 800, color: t.text, marginBottom: 4 }}>Renewals Watch</div>
        <div style={{ fontSize: 13, color: t.textSecondary }}>Monitor accounts before they quietly churn</div>
      </div>
      <div style={{ padding: '16px 20px 100px' }}>
        {/* Upcoming alert banner */}
        <div style={{ background: t.accentLight, border: `1px solid ${t.accent}40`, borderRadius: 16, padding: '12px 16px', marginBottom: 18, display: 'flex', gap: 10, alignItems: 'center' }}>
          {React.createElement(window.lucide.AlertTriangle, { size: 18, color: t.accent })}
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: t.accent }}>Summit Analytics renews in 7 days</div>
            <div style={{ fontSize: 12, color: t.textSecondary }}>Expansion opportunity detected — high engagement</div>
          </div>
        </div>

        {renewals.map(r => {
          const riskColor = r.risk === 'high' ? t.danger : r.risk === 'medium' ? t.warning : t.success;
          const riskBg = r.risk === 'high' ? t.dangerLight : r.risk === 'medium' ? t.warningLight : t.successLight;
          const daysBar = Math.max(0, Math.min(100, (60 - r.daysUntil) / 60 * 100));
          return (
            <div key={r.id} style={{ background: t.card, borderRadius: 16, padding: '14px 16px', marginBottom: 12, border: `1px solid ${t.border}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <div style={{ width: 40, height: 40, borderRadius: 12, background: riskBg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: riskColor, fontWeight: 800, fontSize: 13 }}>
                    {r.avatar}
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: t.text }}>{r.company}</div>
                    <div style={{ fontSize: 12, color: t.textSecondary }}>{r.contactName}</div>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 15, fontWeight: 800, color: t.text }}>${(r.value/1000).toFixed(0)}k</div>
                  <div style={{ fontSize: 11, color: riskColor, background: riskBg, padding: '2px 8px', borderRadius: 20, fontWeight: 600 }}>
                    {r.daysUntil}d left
                  </div>
                </div>
              </div>

              {/* Urgency bar */}
              <div style={{ marginBottom: 10 }}>
                <div style={{ width: '100%', height: 4, borderRadius: 2, background: t.border, overflow: 'hidden' }}>
                  <div style={{ width: `${daysBar}%`, height: '100%', background: riskColor, borderRadius: 2, transition: 'width 0.5s' }} />
                </div>
              </div>

              <div style={{ fontSize: 12, color: t.textSecondary, marginBottom: 12 }}>{r.note}</div>

              {r.usageDrop > 0 && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
                  {React.createElement(window.lucide.TrendingDown, { size: 13, color: t.danger })}
                  <span style={{ fontSize: 12, color: t.danger, fontWeight: 600 }}>Usage down {r.usageDrop}% this month</span>
                </div>
              )}

              <div style={{ display: 'flex', gap: 8 }}>
                <div
                  onClick={() => handleNudge(r.id + 100)}
                  style={{ flex: 1, background: nudgeSent[r.id + 100] ? t.successLight : t.primaryLight, color: nudgeSent[r.id + 100] ? t.success : t.primary, borderRadius: 10, padding: '9px', fontSize: 12, fontWeight: 700, textAlign: 'center', cursor: 'pointer', transition: 'all 0.2s' }}
                >
                  {nudgeSent[r.id + 100] ? '✓ Check-in Sent!' : 'Send Check-in'}
                </div>
                <div style={{ flex: 1, background: t.surfaceAlt, color: t.text, borderRadius: 10, padding: '9px', fontSize: 12, fontWeight: 600, textAlign: 'center', cursor: 'pointer' }}>
                  View Account
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const InsightsScreen = () => {
    const weeklyData = [65, 82, 58, 90, 74, 88, 95];
    const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
    const maxVal = Math.max(...weeklyData);

    return (
      <div style={{ flex: 1, overflowY: 'auto', background: t.bg }} className="scroll-container">
        <div style={{ background: t.surface, padding: '16px 20px 16px', borderBottom: `1px solid ${t.border}` }}>
          <div style={{ fontSize: 20, fontWeight: 800, color: t.text, marginBottom: 4 }}>Insights</div>
          <div style={{ fontSize: 13, color: t.textSecondary }}>How your nudges are performing</div>
        </div>

        <div style={{ padding: '20px 20px 100px' }}>
          {/* Score card */}
          <div style={{ background: t.gradient, borderRadius: 20, padding: '20px', color: '#fff', marginBottom: 18, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', bottom: -30, right: -30, width: 140, height: 140, borderRadius: '50%', background: 'rgba(255,255,255,0.07)' }} />
            <div style={{ fontSize: 12, fontWeight: 600, opacity: 0.75, marginBottom: 6, letterSpacing: '0.05em' }}>REVENUE RECOVERY SCORE</div>
            <div style={{ fontSize: 52, fontWeight: 800, lineHeight: 1, marginBottom: 6 }}>84<span style={{ fontSize: 24, fontWeight: 600, opacity: 0.7 }}>/100</span></div>
            <div style={{ fontSize: 13, opacity: 0.8 }}>↑ +12 points vs. last month</div>
          </div>

          {/* Quick stats */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 18 }}>
            {[
              { label: 'Nudges Sent', value: '47', sub: 'this month', icon: 'Send', color: t.primary },
              { label: 'Replies Received', value: '31', sub: '66% reply rate', icon: 'MessageCircle', color: t.success },
              { label: 'Deals Recovered', value: '8', sub: '$142k saved', icon: 'TrendingUp', color: t.accent },
              { label: 'Avg Response Time', value: '4.2h', sub: 'down from 11h', icon: 'Clock', color: t.warning },
            ].map((s, i) => {
              const Icon = window.lucide[s.icon];
              return (
                <div key={i} style={{ background: t.card, borderRadius: 16, padding: '14px', border: `1px solid ${t.border}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                    <div style={{ fontSize: 22, fontWeight: 800, color: t.text }}>{s.value}</div>
                    <div style={{ width: 30, height: 30, borderRadius: 8, background: s.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {Icon && React.createElement(Icon, { size: 14, color: s.color })}
                    </div>
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: t.text }}>{s.label}</div>
                  <div style={{ fontSize: 11, color: t.textMuted }}>{s.sub}</div>
                </div>
              );
            })}
          </div>

          {/* Weekly bar chart */}
          <div style={{ background: t.card, borderRadius: 16, padding: '16px', marginBottom: 18, border: `1px solid ${t.border}` }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: t.text, marginBottom: 14 }}>Weekly Engagement Score</div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end', height: 80 }}>
              {weeklyData.map((val, i) => (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                  <div style={{ width: '100%', height: `${val / maxVal * 70}px`, borderRadius: 6, background: i === 6 ? t.primary : t.primaryLight, transition: 'height 0.5s' }} />
                  <div style={{ fontSize: 10, color: t.textMuted }}>{days[i]}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Best nudge times */}
          <div style={{ background: t.card, borderRadius: 16, padding: '16px', border: `1px solid ${t.border}` }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: t.text, marginBottom: 14 }}>Best Follow-up Windows</div>
            {[
              { time: 'Tue 8–10am', rate: 78, label: 'Highest reply rate' },
              { time: 'Thu 5–7pm', rate: 71, label: 'Strong engagement' },
              { time: 'Sun 8–9pm', rate: 65, label: 'Decision-maker window' },
            ].map((w, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: i < 2 ? 12 : 0 }}>
                <div style={{ width: 70, fontSize: 12, fontWeight: 600, color: t.text }}>{w.time}</div>
                <div style={{ flex: 1, height: 6, borderRadius: 3, background: t.border, overflow: 'hidden' }}>
                  <div style={{ width: `${w.rate}%`, height: '100%', background: t.gradient, borderRadius: 3 }} />
                </div>
                <div style={{ fontSize: 12, color: t.primary, fontWeight: 700, width: 30, textAlign: 'right' }}>{w.rate}%</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const SettingsScreen = () => (
    <div style={{ flex: 1, overflowY: 'auto', background: t.bg }} className="scroll-container">
      <div style={{ background: t.surface, padding: '16px 20px 16px', borderBottom: `1px solid ${t.border}` }}>
        <div style={{ fontSize: 20, fontWeight: 800, color: t.text }}>Settings</div>
      </div>

      <div style={{ padding: '20px 20px 100px' }}>
        {/* Profile card */}
        <div style={{ background: t.card, borderRadius: 20, padding: '20px', marginBottom: 20, border: `1px solid ${t.border}`, display: 'flex', gap: 14, alignItems: 'center' }}>
          <div style={{ width: 56, height: 56, borderRadius: 16, background: t.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: 18 }}>JD</div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, color: t.text }}>Jamie Doyle</div>
            <div style={{ fontSize: 13, color: t.textSecondary }}>Account Executive</div>
            <div style={{ fontSize: 12, color: t.primary, marginTop: 2 }}>jamie@acmecorp.com</div>
          </div>
        </div>

        {/* Theme toggle */}
        <div style={{ background: t.card, borderRadius: 16, padding: '14px 16px', marginBottom: 16, border: `1px solid ${t.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: t.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {React.createElement(theme === 'light' ? window.lucide.Sun : window.lucide.Moon, { size: 17, color: t.primary })}
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: t.text }}>Appearance</div>
              <div style={{ fontSize: 12, color: t.textSecondary }}>{theme === 'light' ? 'Light mode' : 'Dark mode'}</div>
            </div>
          </div>
          <div
            onClick={() => setTheme(prev => prev === 'light' ? 'dark' : 'light')}
            style={{ width: 48, height: 28, borderRadius: 14, background: theme === 'dark' ? t.primary : t.border, cursor: 'pointer', position: 'relative', transition: 'background 0.3s' }}
          >
            <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#fff', position: 'absolute', top: 3, left: theme === 'dark' ? 23 : 3, transition: 'left 0.3s', boxShadow: '0 1px 4px rgba(0,0,0,0.2)' }} />
          </div>
        </div>

        {/* Integrations */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 10 }}>Integrations</div>
          {[
            { name: 'Salesforce CRM', status: 'Connected', icon: 'Database', color: '#00A1E0' },
            { name: 'Gmail', status: 'Connected', icon: 'Mail', color: '#EA4335' },
            { name: 'Google Calendar', status: 'Connected', icon: 'Calendar', color: '#4285F4' },
            { name: 'QuickBooks', status: 'Connect', icon: 'Receipt', color: t.textMuted },
            { name: 'HubSpot', status: 'Connect', icon: 'Layers', color: t.textMuted },
          ].map((item, i) => {
            const Icon = window.lucide[item.icon];
            const isConnected = item.status === 'Connected';
            return (
              <div key={i} style={{ background: t.card, borderRadius: 14, padding: '12px 14px', marginBottom: 8, border: `1px solid ${t.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <div style={{ width: 34, height: 34, borderRadius: 10, background: isConnected ? item.color + '18' : t.surfaceAlt, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {Icon && React.createElement(Icon, { size: 16, color: isConnected ? item.color : t.textMuted })}
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 500, color: t.text }}>{item.name}</div>
                </div>
                <div style={{ fontSize: 12, fontWeight: 600, color: isConnected ? t.success : t.primary, background: isConnected ? t.successLight : t.primaryLight, padding: '4px 10px', borderRadius: 20 }}>
                  {item.status}
                </div>
              </div>
            );
          })}
        </div>

        {/* Notification settings */}
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 10 }}>Notifications</div>
          {[
            { label: 'Deal stall alerts', desc: 'Get notified when deals go cold', enabled: true },
            { label: 'Renewal reminders', desc: '30, 14, 7 days before renewal', enabled: true },
            { label: 'Follow-up suggestions', desc: 'AI-generated timing nudges', enabled: true },
            { label: 'Weekly digest', desc: 'Summary every Monday at 8am', enabled: false },
          ].map((item, i) => {
            const [enabled, setEnabled] = useState(item.enabled);
            return (
              <div key={i} style={{ background: t.card, borderRadius: 14, padding: '12px 14px', marginBottom: 8, border: `1px solid ${t.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: t.text }}>{item.label}</div>
                  <div style={{ fontSize: 11, color: t.textMuted, marginTop: 2 }}>{item.desc}</div>
                </div>
                <div
                  onClick={() => setEnabled(e => !e)}
                  style={{ width: 40, height: 24, borderRadius: 12, background: enabled ? t.primary : t.border, cursor: 'pointer', position: 'relative', transition: 'background 0.3s', flexShrink: 0 }}
                >
                  <div style={{ width: 18, height: 18, borderRadius: '50%', background: '#fff', position: 'absolute', top: 3, left: enabled ? 19 : 3, transition: 'left 0.3s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  // ── Navigation ──
  const navItems = [
    { id: 'home', icon: 'Home', label: 'Home' },
    { id: 'deals', icon: 'TrendingUp', label: 'Deals' },
    { id: 'renewals', icon: 'RefreshCw', label: 'Renewals' },
    { id: 'insights', icon: 'BarChart2', label: 'Insights' },
    { id: 'settings', icon: 'Settings', label: 'Settings' },
  ];

  const renderScreen = () => {
    if (activeTab === 'home') return <HomeScreen />;
    if (activeTab === 'deals') return <DealsScreen />;
    if (activeTab === 'renewals') return <RenewalsScreen />;
    if (activeTab === 'insights') return <InsightsScreen />;
    if (activeTab === 'settings') return <SettingsScreen />;
  };

  return (
    <div style={{ minHeight: '100vh', background: '#E8E8E8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Plus Jakarta Sans', sans-serif", padding: 20 }}>
      <style>{`
        ${fontLink}
        body { margin: 0; background: #E8E8E8; }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { display: none; }
      `}</style>

      {/* Phone frame */}
      <div style={{ width: 375, height: 812, borderRadius: 50, background: '#1A1A1A', boxShadow: '0 40px 100px rgba(0,0,0,0.4), 0 0 0 2px #333', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>

        {/* Dynamic Island */}
        <div style={{ position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)', width: 120, height: 34, background: '#000', borderRadius: 20, zIndex: 100 }} />

        {/* Status Bar */}
        <div style={{ background: t.surface, padding: '14px 24px 8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 54, flexShrink: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: t.text }}>9:41</div>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            {React.createElement(window.lucide.Wifi, { size: 14, color: t.text })}
            {React.createElement(window.lucide.Signal, { size: 14, color: t.text })}
            {React.createElement(window.lucide.Battery, { size: 16, color: t.text })}
          </div>
        </div>

        {/* Screen content */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minHeight: 0 }}>
          {renderScreen()}
        </div>

        {/* Bottom Nav */}
        <div style={{ background: t.navBg, borderTop: `1px solid ${t.border}`, padding: '8px 4px 24px', display: 'flex', flexShrink: 0 }}>
          {navItems.map(item => {
            const Icon = window.lucide[item.icon];
            const active = activeTab === item.id;
            return (
              <div
                key={item.id}
                onClick={() => { setActiveTab(item.id); if (item.id !== 'deals') setSelectedDeal(null); }}
                style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, cursor: 'pointer', padding: '6px 0' }}
              >
                <div style={{ width: 32, height: 32, borderRadius: 10, background: active ? t.primaryLight : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}>
                  {Icon && React.createElement(Icon, { size: 18, color: active ? t.primary : t.textMuted, strokeWidth: active ? 2.5 : 1.8 })}
                </div>
                <div style={{ fontSize: 10, fontWeight: active ? 700 : 500, color: active ? t.primary : t.textMuted, transition: 'color 0.2s' }}>{item.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
