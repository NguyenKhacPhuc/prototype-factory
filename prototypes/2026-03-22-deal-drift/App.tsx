const { useState, useEffect, useRef } = React;

function App() {
  const [activeTab, setActiveTab] = useState('deals');
  const [isDark, setIsDark] = useState(true);
  const [selectedDeal, setSelectedDeal] = useState(null);
  const [pressedBtn, setPressedBtn] = useState(null);
  const [expandedFollowUp, setExpandedFollowUp] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const [time, setTime] = useState('9:41');

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
      * { box-sizing: border-box; margin: 0; padding: 0; }
      ::-webkit-scrollbar { width: 0; }
      body { background: #0a0a0f; display: flex; justify-content: center; align-items: center; min-height: 100vh; font-family: 'Plus Jakarta Sans', sans-serif; }
      @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
      @keyframes slideUp { from{transform:translateY(20px);opacity:0} to{transform:translateY(0);opacity:1} }
      @keyframes fadeIn { from{opacity:0} to{opacity:1} }
      @keyframes shimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
      .pulse { animation: pulse 2s infinite; }
      .slide-up { animation: slideUp 0.3s ease forwards; }
      .fade-in { animation: fadeIn 0.2s ease forwards; }
    `;
    document.head.appendChild(style);
    const interval = setInterval(() => {
      const now = new Date();
      setTime(`${now.getHours() % 12 || 12}:${String(now.getMinutes()).padStart(2, '0')}`);
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const themes = {
    dark: {
      bg: '#070C18',
      surface: '#0D1526',
      card: '#131E35',
      cardHover: '#1A2844',
      primary: '#00D4AA',
      primaryGlow: 'rgba(0,212,170,0.15)',
      primaryDim: 'rgba(0,212,170,0.08)',
      secondary: '#7C5CFC',
      secondaryDim: 'rgba(124,92,252,0.12)',
      text: '#EFF4FF',
      textSub: '#7B90B8',
      textMuted: '#3D5070',
      border: '#1B2A45',
      borderLight: '#243655',
      success: '#00C896',
      successDim: 'rgba(0,200,150,0.1)',
      warning: '#FFB347',
      warningDim: 'rgba(255,179,71,0.1)',
      danger: '#FF5A5A',
      dangerDim: 'rgba(255,90,90,0.1)',
      navBg: '#09101F',
      pill: '#1B2A45',
      gradient: 'linear-gradient(135deg, #00D4AA 0%, #7C5CFC 100%)',
    },
    light: {
      bg: '#F0F4FF',
      surface: '#FFFFFF',
      card: '#FFFFFF',
      cardHover: '#F7F9FF',
      primary: '#00A98A',
      primaryGlow: 'rgba(0,169,138,0.12)',
      primaryDim: 'rgba(0,169,138,0.07)',
      secondary: '#6D28D9',
      secondaryDim: 'rgba(109,40,217,0.08)',
      text: '#0E1726',
      textSub: '#4A607E',
      textMuted: '#94A3B8',
      border: '#E2EAF4',
      borderLight: '#EBF1FA',
      success: '#059669',
      successDim: 'rgba(5,150,105,0.08)',
      warning: '#D97706',
      warningDim: 'rgba(217,119,6,0.08)',
      danger: '#DC2626',
      dangerDim: 'rgba(220,38,38,0.08)',
      navBg: '#FFFFFF',
      pill: '#EBF1FA',
      gradient: 'linear-gradient(135deg, #00A98A 0%, #6D28D9 100%)',
    },
  };

  const t = isDark ? themes.dark : themes.light;

  const deals = [
    {
      id: 1,
      name: 'Acme Corp SaaS License',
      contact: 'Jordan Kim',
      role: 'VP of Engineering',
      company: 'Acme Corp',
      value: '$48,000/yr',
      rawValue: 48000,
      stage: 'Negotiation',
      health: 72,
      lastActivity: '2h ago',
      daysStale: 2,
      driftAlerts: 2,
      tags: ['Enterprise', 'Q1 Close'],
      avatar: 'JK',
      avatarColor: '#00D4AA',
      summary: 'Originally agreed annual billing. CFO now requesting monthly. Legal review pending.',
      nextStep: 'Align on billing structure with CFO before legal proceeds.',
    },
    {
      id: 2,
      name: 'Meridian Consulting Retainer',
      contact: 'Priya Sharma',
      role: 'COO',
      company: 'Meridian Consulting',
      value: '$12,000/mo',
      rawValue: 144000,
      stage: 'Proposal',
      health: 45,
      lastActivity: '4d ago',
      daysStale: 4,
      driftAlerts: 3,
      tags: ['Retainer', 'At Risk'],
      avatar: 'PS',
      avatarColor: '#FF6B6B',
      summary: 'Scope expanded 3x from original brief. Budget for new deliverables not confirmed.',
      nextStep: 'Schedule scope alignment call. Revise budget before proceeding.',
    },
    {
      id: 3,
      name: 'Vertex Studios Brand Refresh',
      contact: 'Marcus Lee',
      role: 'Creative Director',
      company: 'Vertex Studios',
      value: '$28,500',
      rawValue: 28500,
      stage: 'Closing',
      health: 91,
      lastActivity: '1h ago',
      daysStale: 0,
      driftAlerts: 0,
      tags: ['Design', 'Hot'],
      avatar: 'ML',
      avatarColor: '#7C5CFC',
      summary: 'Contract sent. Awaiting counter-signature. Start date confirmed April 1.',
      nextStep: 'Send contract reminder. Check for signature by EOD.',
    },
    {
      id: 4,
      name: 'Nexus Health Platform',
      contact: 'Dr. Alicia Tran',
      role: 'Chief Medical Officer',
      company: 'Nexus Health',
      value: '$95,000',
      rawValue: 95000,
      stage: 'Discovery',
      health: 58,
      lastActivity: '1d ago',
      daysStale: 1,
      driftAlerts: 1,
      tags: ['HealthTech', 'Strategic'],
      avatar: 'AT',
      avatarColor: '#FFB347',
      summary: 'Demo well received. Procurement added to thread. HIPAA compliance questions open.',
      nextStep: 'Send HIPAA compliance deck. Schedule technical review with procurement.',
    },
  ];

  const timelineEvents = [
    {
      id: 1,
      date: 'Mar 20',
      time: '2:30 PM',
      type: 'call',
      title: 'Discovery Call — 45 min',
      note: 'Jordan confirmed annual budget of $48K. Legal team needs to review DPA before signing. Target start date Q2. Team size 120 users.',
      drift: false,
      commitments: ['$48K annual budget approved', 'Legal DPA review required', 'Q2 start target'],
    },
    {
      id: 2,
      date: 'Mar 17',
      time: '10:15 AM',
      type: 'email',
      title: 'Proposal v1 Sent',
      note: 'Sent formal proposal with annual billing terms, SLA guarantees (99.9% uptime), and 3-month onboarding package included.',
      drift: false,
      commitments: ['Annual billing structure agreed', '3-month onboarding included', '99.9% SLA'],
    },
    {
      id: 3,
      date: 'Mar 14',
      time: '4:00 PM',
      type: 'meeting',
      title: 'Follow-up Meeting — CFO Joined',
      note: 'CFO (Rachel Wong) joined unexpectedly. Expressed preference for monthly billing to align with current vendor cycle. Conflicts with annual terms already discussed.',
      drift: true,
      commitments: ['CFO prefers monthly billing — DRIFT detected', 'Rachel Wong added as stakeholder'],
    },
    {
      id: 4,
      date: 'Mar 10',
      time: '11:40 AM',
      type: 'dm',
      title: 'Slack DM — Security Flag',
      note: 'Jordan flagged security team requirement for a penetration test report before contract can be signed. Not mentioned in original scope or any prior conversations.',
      drift: true,
      commitments: ['Pen test report required — NEW requirement', 'Security team approval needed'],
    },
    {
      id: 5,
      date: 'Mar 5',
      time: '9:00 AM',
      type: 'email',
      title: 'Initial Outreach',
      note: 'Cold intro via LinkedIn mutual. Jordan expressed interest in replacing legacy CRM with modern SaaS solution. Mentioned team frustration with current tooling.',
      drift: false,
      commitments: ['Replace legacy CRM', 'Modern SaaS solution'],
    },
  ];

  const followUps = [
    {
      id: 1,
      deal: 'Acme Corp SaaS License',
      contact: 'Jordan Kim',
      urgency: 'high',
      type: 'Clarify',
      icon: 'AlertCircle',
      message: 'Hi Jordan — circling back on the billing structure conversation. Can we get 15 minutes with Rachel (CFO) to align on monthly vs annual before legal proceeds? Happy to model out both options and show the cost difference.',
      reason: 'CFO billing preference unresolved for 6 days',
      channel: 'Email',
    },
    {
      id: 2,
      deal: 'Meridian Consulting Retainer',
      contact: 'Priya Sharma',
      urgency: 'critical',
      type: 'Scope',
      icon: 'TrendingUp',
      message: 'Priya — I wanted to flag that the deliverables we discussed last week represent roughly 3x the original brief. Before we proceed, can we schedule a 30-min call this week to align on budget for the expanded scope? I want to make sure we\'re set up for success.',
      reason: 'Scope expanded 3x, budget not confirmed — 4 days stale',
      channel: 'Email',
    },
    {
      id: 3,
      deal: 'Vertex Studios Brand Refresh',
      contact: 'Marcus Lee',
      urgency: 'medium',
      type: 'Contract',
      icon: 'FileText',
      message: 'Hey Marcus — just a quick nudge on the contract. We\'re still good for April 1 kick-off and I want to make sure we have everything locked in before then. Let me know if you have any questions or need any changes!',
      reason: 'Contract sent 2 days ago, no counter-signature yet',
      channel: 'Slack',
    },
  ];

  const stats = {
    totalPipeline: '$327,500',
    activeDeals: 4,
    avgHealth: 67,
    driftAlerts: 6,
  };

  const handlePress = (id) => {
    setPressedBtn(id);
    setTimeout(() => setPressedBtn(null), 150);
  };

  const handleCopy = (id, text) => {
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const healthColor = (score) => {
    if (score >= 80) return t.success;
    if (score >= 55) return t.warning;
    return t.danger;
  };

  const healthBg = (score) => {
    if (score >= 80) return t.successDim;
    if (score >= 55) return t.warningDim;
    return t.dangerDim;
  };

  const urgencyColor = (u) => {
    if (u === 'critical') return t.danger;
    if (u === 'high') return t.warning;
    return t.primary;
  };

  const typeIcon = (type) => {
    const map = { call: window.lucide.Phone, email: window.lucide.Mail, meeting: window.lucide.Users, dm: window.lucide.MessageSquare };
    return map[type] || window.lucide.Circle;
  };

  // ─── Screens ───────────────────────────────────────────────────────────────

  const renderDeals = () => (
    <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 16 }} className="fade-in">
      {/* Header */}
      <div style={{ padding: '0 20px 16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
          <div>
            <div style={{ fontSize: 22, fontWeight: 800, color: t.text, letterSpacing: '-0.5px' }}>Your Deals</div>
            <div style={{ fontSize: 13, color: t.textSub, marginTop: 2 }}>Sunday, March 22</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ position: 'relative' }}>
              {React.createElement(window.lucide.Bell, { size: 20, color: t.textSub })}
              <div style={{ position: 'absolute', top: -2, right: -2, width: 8, height: 8, borderRadius: '50%', background: t.danger, border: `2px solid ${t.surface}` }} />
            </div>
            <div style={{ width: 34, height: 34, borderRadius: 10, background: t.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff' }}>SD</div>
          </div>
        </div>

        {/* Stats Row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 4 }}>
          {[
            { label: 'Pipeline', value: stats.totalPipeline, icon: 'DollarSign', color: t.primary },
            { label: 'Drift Alerts', value: stats.driftAlerts, icon: 'AlertTriangle', color: t.danger },
          ].map((s) => (
            <div key={s.label} style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 14, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: s.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {React.createElement(window.lucide[s.icon], { size: 16, color: s.color })}
              </div>
              <div>
                <div style={{ fontSize: 17, fontWeight: 800, color: t.text, letterSpacing: '-0.5px' }}>{s.value}</div>
                <div style={{ fontSize: 11, color: t.textSub, fontWeight: 500 }}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Alert banner */}
        <div style={{ background: t.danger + '12', border: `1px solid ${t.danger}30`, borderRadius: 12, padding: '10px 14px', marginTop: 10, display: 'flex', alignItems: 'center', gap: 10 }}>
          {React.createElement(window.lucide.AlertTriangle, { size: 15, color: t.danger })}
          <div style={{ fontSize: 12, color: t.danger, fontWeight: 600 }}>Meridian deal is 4 days stale — action needed today</div>
        </div>
      </div>

      {/* Filter Pills */}
      <div style={{ display: 'flex', gap: 8, padding: '0 20px 16px', overflowX: 'auto' }}>
        {['All', 'Closing', 'Negotiation', 'At Risk'].map((f) => (
          <div key={f} style={{ padding: '6px 14px', borderRadius: 20, background: f === 'All' ? t.primary : t.pill, color: f === 'All' ? '#fff' : t.textSub, fontSize: 12, fontWeight: 600, whiteSpace: 'nowrap', cursor: 'pointer', border: `1px solid ${f === 'All' ? 'transparent' : t.border}` }}>
            {f}
          </div>
        ))}
      </div>

      {/* Deal Cards */}
      <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {deals.map((deal) => (
          <div
            key={deal.id}
            onClick={() => { setSelectedDeal(deal); setActiveTab('timeline'); }}
            style={{
              background: t.card,
              border: `1px solid ${deal.driftAlerts > 0 ? t.danger + '30' : t.border}`,
              borderRadius: 18,
              padding: 16,
              cursor: 'pointer',
              transform: pressedBtn === deal.id ? 'scale(0.98)' : 'scale(1)',
              transition: 'transform 0.15s ease',
              position: 'relative',
              overflow: 'hidden',
            }}
            onMouseDown={() => handlePress(deal.id)}
          >
            {deal.driftAlerts > 0 && (
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${t.danger}, transparent)` }} />
            )}

            {/* Top Row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1 }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: deal.avatarColor + '20', border: `1px solid ${deal.avatarColor}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 800, color: deal.avatarColor, flexShrink: 0 }}>
                  {deal.avatar}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: t.text, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{deal.name}</div>
                  <div style={{ fontSize: 12, color: t.textSub, marginTop: 1 }}>{deal.contact} · {deal.role}</div>
                </div>
              </div>
              <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: 8 }}>
                <div style={{ fontSize: 15, fontWeight: 800, color: t.text }}>{deal.value}</div>
                <div style={{ fontSize: 11, color: t.textSub, marginTop: 1 }}>{deal.stage}</div>
              </div>
            </div>

            {/* Summary */}
            <div style={{ fontSize: 12, color: t.textSub, lineHeight: 1.5, marginBottom: 12 }}>{deal.summary}</div>

            {/* Health Bar */}
            <div style={{ marginBottom: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                <div style={{ fontSize: 11, color: t.textMuted, fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase' }}>Deal Health</div>
                <div style={{ fontSize: 12, fontWeight: 800, color: healthColor(deal.health) }}>{deal.health}%</div>
              </div>
              <div style={{ height: 4, background: t.border, borderRadius: 4, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${deal.health}%`, background: `linear-gradient(90deg, ${healthColor(deal.health)}, ${healthColor(deal.health)}aa)`, borderRadius: 4, transition: 'width 0.8s ease' }} />
              </div>
            </div>

            {/* Footer */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: 6 }}>
                {deal.tags.map((tag) => (
                  <div key={tag} style={{ padding: '3px 8px', borderRadius: 6, background: t.pill, fontSize: 10, fontWeight: 700, color: t.textSub, letterSpacing: '0.3px' }}>{tag}</div>
                ))}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {deal.driftAlerts > 0 && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, background: t.dangerDim, padding: '3px 8px', borderRadius: 6 }}>
                    {React.createElement(window.lucide.AlertCircle, { size: 10, color: t.danger })}
                    <span style={{ fontSize: 10, fontWeight: 700, color: t.danger }}>{deal.driftAlerts} drift</span>
                  </div>
                )}
                <div style={{ fontSize: 11, color: t.textMuted }}>{deal.lastActivity}</div>
                {React.createElement(window.lucide.ChevronRight, { size: 14, color: t.textMuted })}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ height: 20 }} />
    </div>
  );

  const renderTimeline = () => {
    const deal = selectedDeal || deals[0];
    return (
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 16 }} className="fade-in">
        {/* Back + Header */}
        <div style={{ padding: '0 20px 16px' }}>
          <div
            onClick={() => setActiveTab('deals')}
            style={{ display: 'flex', alignItems: 'center', gap: 6, color: t.primary, fontSize: 13, fontWeight: 600, marginBottom: 14, cursor: 'pointer' }}
          >
            {React.createElement(window.lucide.ChevronLeft, { size: 16, color: t.primary })}
            All Deals
          </div>

          {/* Deal Hero */}
          <div style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 18, padding: 16, marginBottom: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <div style={{ width: 48, height: 48, borderRadius: 14, background: deal.avatarColor + '20', border: `1px solid ${deal.avatarColor}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 800, color: deal.avatarColor }}>
                {deal.avatar}
              </div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 800, color: t.text }}>{deal.name}</div>
                <div style={{ fontSize: 12, color: t.textSub, marginTop: 2 }}>{deal.contact} · {deal.role}</div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
              {[
                { label: 'Value', value: deal.value },
                { label: 'Stage', value: deal.stage },
                { label: 'Health', value: `${deal.health}%` },
              ].map((m) => (
                <div key={m.label} style={{ textAlign: 'center', padding: '8px 4px', background: t.surface, borderRadius: 10, border: `1px solid ${t.border}` }}>
                  <div style={{ fontSize: 13, fontWeight: 800, color: m.label === 'Health' ? healthColor(deal.health) : t.text }}>{m.value}</div>
                  <div style={{ fontSize: 10, color: t.textMuted, marginTop: 2, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.4px' }}>{m.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Next Step Card */}
          <div style={{ background: t.primaryGlow, border: `1px solid ${t.primary}30`, borderRadius: 14, padding: '12px 14px', display: 'flex', alignItems: 'flex-start', gap: 10 }}>
            {React.createElement(window.lucide.Zap, { size: 15, color: t.primary })}
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: t.primary, marginBottom: 3, textTransform: 'uppercase', letterSpacing: '0.4px' }}>Suggested Next Step</div>
              <div style={{ fontSize: 13, color: t.text, lineHeight: 1.5 }}>{deal.nextStep}</div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div style={{ padding: '0 20px' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: t.textSub, marginBottom: 14, textTransform: 'uppercase', letterSpacing: '0.8px' }}>Deal Timeline</div>

          <div style={{ position: 'relative' }}>
            {/* Vertical line */}
            <div style={{ position: 'absolute', left: 19, top: 0, bottom: 0, width: 1, background: t.border }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {timelineEvents.map((event, idx) => {
                const Icon = typeIcon(event.type);
                return (
                  <div key={event.id} style={{ display: 'flex', gap: 14, marginBottom: 16, position: 'relative' }}>
                    {/* Node */}
                    <div style={{ width: 38, height: 38, borderRadius: '50%', background: event.drift ? t.dangerDim : t.primaryDim, border: `2px solid ${event.drift ? t.danger : t.primary}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, zIndex: 1 }}>
                      {React.createElement(Icon, { size: 14, color: event.drift ? t.danger : t.primary })}
                    </div>

                    {/* Content */}
                    <div style={{ flex: 1, background: t.card, border: `1px solid ${event.drift ? t.danger + '40' : t.border}`, borderRadius: 14, padding: 14, marginTop: 2 }}>
                      {event.drift && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8, background: t.dangerDim, borderRadius: 6, padding: '4px 8px', width: 'fit-content' }}>
                          {React.createElement(window.lucide.AlertTriangle, { size: 10, color: t.danger })}
                          <span style={{ fontSize: 10, fontWeight: 700, color: t.danger, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Drift Detected</span>
                        </div>
                      )}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: t.text, flex: 1 }}>{event.title}</div>
                        <div style={{ fontSize: 11, color: t.textMuted, flexShrink: 0, marginLeft: 8 }}>{event.date}</div>
                      </div>
                      <div style={{ fontSize: 12, color: t.textSub, lineHeight: 1.6, marginBottom: event.commitments.length > 0 ? 10 : 0 }}>{event.note}</div>

                      {event.commitments.length > 0 && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                          {event.commitments.map((c, ci) => (
                            <div key={ci} style={{ display: 'flex', alignItems: 'flex-start', gap: 6 }}>
                              <div style={{ width: 4, height: 4, borderRadius: '50%', background: c.includes('DRIFT') || c.includes('NEW') ? t.danger : t.primary, marginTop: 5, flexShrink: 0 }} />
                              <div style={{ fontSize: 11, color: c.includes('DRIFT') || c.includes('NEW') ? t.danger : t.textSub, fontWeight: c.includes('DRIFT') || c.includes('NEW') ? 600 : 400 }}>{c}</div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div style={{ height: 20 }} />
      </div>
    );
  };

  const renderFollowUps = () => (
    <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 16 }} className="fade-in">
      <div style={{ padding: '0 20px 16px' }}>
        <div style={{ fontSize: 22, fontWeight: 800, color: t.text, letterSpacing: '-0.5px', marginBottom: 4 }}>Smart Follow-ups</div>
        <div style={{ fontSize: 13, color: t.textSub }}>AI-crafted messages ready to send</div>

        {/* Score banner */}
        <div style={{ marginTop: 16, background: t.secondaryDim, border: `1px solid ${t.secondary}30`, borderRadius: 14, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 42, height: 42, borderRadius: 12, background: t.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {React.createElement(window.lucide.Sparkles, { size: 18, color: '#fff' })}
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: t.text }}>3 follow-ups ready</div>
            <div style={{ fontSize: 12, color: t.textSub, marginTop: 1 }}>Based on drift analysis and response gaps</div>
          </div>
        </div>
      </div>

      <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        {followUps.map((fu) => {
          const isExpanded = expandedFollowUp === fu.id;
          const isCopied = copiedId === fu.id;
          const uc = urgencyColor(fu.urgency);
          const Icon = window.lucide[fu.icon];
          return (
            <div key={fu.id} style={{ background: t.card, border: `1px solid ${fu.urgency === 'critical' ? t.danger + '40' : t.border}`, borderRadius: 18, overflow: 'hidden' }}>
              {/* Header */}
              <div style={{ padding: 16, cursor: 'pointer' }} onClick={() => setExpandedFollowUp(isExpanded ? null : fu.id)}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: uc + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      {React.createElement(Icon, { size: 16, color: uc })}
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                        <div style={{ fontSize: 11, fontWeight: 700, color: uc, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{fu.urgency}</div>
                        <div style={{ width: 3, height: 3, borderRadius: '50%', background: t.textMuted }} />
                        <div style={{ fontSize: 11, color: t.textMuted, fontWeight: 500 }}>{fu.type}</div>
                      </div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: t.text }}>{fu.deal}</div>
                      <div style={{ fontSize: 12, color: t.textSub, marginTop: 1 }}>To: {fu.contact}</div>
                    </div>
                  </div>
                  <div style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s', color: t.textMuted }}>
                    {React.createElement(window.lucide.ChevronDown, { size: 16, color: t.textMuted })}
                  </div>
                </div>

                <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 6, background: t.surface, borderRadius: 8, padding: '6px 10px' }}>
                  {React.createElement(window.lucide.Info, { size: 11, color: t.textMuted })}
                  <div style={{ fontSize: 11, color: t.textSub }}>{fu.reason}</div>
                </div>
              </div>

              {/* Expanded Message */}
              {isExpanded && (
                <div style={{ borderTop: `1px solid ${t.border}`, padding: '14px 16px' }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 8 }}>Draft Message</div>
                  <div style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 10, padding: 12, fontSize: 13, color: t.textSub, lineHeight: 1.7, marginBottom: 12 }}>
                    {fu.message}
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <div
                      onClick={() => handleCopy(fu.id, fu.message)}
                      style={{ flex: 1, padding: '10px', borderRadius: 10, background: isCopied ? t.successDim : t.primaryDim, border: `1px solid ${isCopied ? t.success + '40' : t.primary + '30'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, cursor: 'pointer' }}
                    >
                      {React.createElement(isCopied ? window.lucide.Check : window.lucide.Copy, { size: 14, color: isCopied ? t.success : t.primary })}
                      <span style={{ fontSize: 13, fontWeight: 600, color: isCopied ? t.success : t.primary }}>{isCopied ? 'Copied!' : 'Copy'}</span>
                    </div>
                    <div style={{ flex: 2, padding: '10px', borderRadius: 10, background: t.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, cursor: 'pointer' }}>
                      {React.createElement(window.lucide.Send, { size: 14, color: '#fff' })}
                      <span style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>Send via {fu.channel}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Add Manual Follow-up */}
      <div style={{ padding: '14px 16px 0' }}>
        <div style={{ border: `1.5px dashed ${t.border}`, borderRadius: 18, padding: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, cursor: 'pointer' }}>
          {React.createElement(window.lucide.Plus, { size: 16, color: t.textMuted })}
          <span style={{ fontSize: 13, fontWeight: 600, color: t.textMuted }}>Add manual follow-up</span>
        </div>
      </div>
      <div style={{ height: 20 }} />
    </div>
  );

  const renderSettings = () => (
    <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 16 }} className="fade-in">
      <div style={{ padding: '0 20px 16px' }}>
        <div style={{ fontSize: 22, fontWeight: 800, color: t.text, letterSpacing: '-0.5px', marginBottom: 4 }}>Settings</div>
        <div style={{ fontSize: 13, color: t.textSub }}>Customize your Deal Drift experience</div>

        {/* Profile Card */}
        <div style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 18, padding: 16, marginTop: 18, display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 54, height: 54, borderRadius: 16, background: t.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 800, color: '#fff' }}>SD</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 16, fontWeight: 800, color: t.text }}>Steve D.</div>
            <div style={{ fontSize: 12, color: t.textSub, marginTop: 2 }}>steve@example.com</div>
            <div style={{ marginTop: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: t.success }} className="pulse" />
              <div style={{ fontSize: 11, color: t.success, fontWeight: 600 }}>Pro Plan Active</div>
            </div>
          </div>
          {React.createElement(window.lucide.ChevronRight, { size: 16, color: t.textMuted })}
        </div>
      </div>

      {/* Settings Sections */}
      {[
        {
          title: 'Appearance',
          items: [
            {
              icon: isDark ? 'Moon' : 'Sun',
              label: 'Theme',
              value: isDark ? 'Dark' : 'Light',
              action: 'toggle',
              color: t.secondary,
            },
          ],
        },
        {
          title: 'Notifications',
          items: [
            { icon: 'AlertTriangle', label: 'Drift Alerts', value: 'Instant', color: t.danger },
            { icon: 'Clock', label: 'Stale Deal Reminders', value: 'Daily at 9am', color: t.warning },
            { icon: 'Bell', label: 'Follow-up Nudges', value: 'On', color: t.primary },
          ],
        },
        {
          title: 'Integrations',
          items: [
            { icon: 'Mail', label: 'Gmail', value: 'Connected', color: '#EA4335' },
            { icon: 'MessageSquare', label: 'Slack', value: 'Connected', color: '#4A154B' },
            { icon: 'Calendar', label: 'Google Calendar', value: 'Connect', color: '#4285F4' },
            { icon: 'Phone', label: 'Zoom', value: 'Connect', color: '#2D8CFF' },
          ],
        },
        {
          title: 'Deal Intelligence',
          items: [
            { icon: 'Cpu', label: 'AI Analysis Model', value: 'Claude 3.5', color: t.primary },
            { icon: 'BarChart2', label: 'Health Score Refresh', value: 'Every 4h', color: t.secondary },
            { icon: 'Target', label: 'Drift Sensitivity', value: 'Medium', color: t.warning },
          ],
        },
      ].map((section) => (
        <div key={section.title} style={{ padding: '0 16px', marginBottom: 14 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 8, paddingLeft: 4 }}>{section.title}</div>
          <div style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 16, overflow: 'hidden' }}>
            {section.items.map((item, idx) => (
              <div
                key={item.label}
                onClick={() => { if (item.action === 'toggle') setIsDark(!isDark); }}
                style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '13px 16px', borderBottom: idx < section.items.length - 1 ? `1px solid ${t.border}` : 'none', cursor: item.action === 'toggle' ? 'pointer' : 'default' }}
              >
                <div style={{ width: 32, height: 32, borderRadius: 9, background: item.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {React.createElement(window.lucide[item.icon], { size: 15, color: item.color })}
                </div>
                <div style={{ fontSize: 14, fontWeight: 500, color: t.text, flex: 1 }}>{item.label}</div>
                {item.action === 'toggle' ? (
                  <div style={{ width: 44, height: 24, borderRadius: 12, background: isDark ? t.secondary : t.border, position: 'relative', transition: 'background 0.25s', cursor: 'pointer' }}>
                    <div style={{ position: 'absolute', top: 2, left: isDark ? 22 : 2, width: 20, height: 20, borderRadius: '50%', background: '#fff', transition: 'left 0.25s', boxShadow: '0 1px 4px rgba(0,0,0,0.3)' }} />
                  </div>
                ) : (
                  <div style={{ fontSize: 12, color: t.textSub, fontWeight: 500 }}>{item.value}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Danger Zone */}
      <div style={{ padding: '0 16px' }}>
        <div style={{ background: t.dangerDim, border: `1px solid ${t.danger}30`, borderRadius: 16, padding: '13px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {React.createElement(window.lucide.LogOut, { size: 16, color: t.danger })}
            <span style={{ fontSize: 14, fontWeight: 600, color: t.danger }}>Sign Out</span>
          </div>
          {React.createElement(window.lucide.ChevronRight, { size: 16, color: t.danger })}
        </div>
      </div>

      <div style={{ height: 20 }} />
    </div>
  );

  // ─── Nav Items ─────────────────────────────────────────────────────────────

  const navItems = [
    { id: 'deals', label: 'Deals', icon: 'Briefcase' },
    { id: 'timeline', label: 'Timeline', icon: 'GitCommit' },
    { id: 'followups', label: 'Follow-ups', icon: 'Send' },
    { id: 'settings', label: 'Settings', icon: 'Settings' },
  ];

  const renderScreen = () => {
    if (activeTab === 'deals') return renderDeals();
    if (activeTab === 'timeline') return renderTimeline();
    if (activeTab === 'followups') return renderFollowUps();
    if (activeTab === 'settings') return renderSettings();
    return renderDeals();
  };

  // ─── Root ──────────────────────────────────────────────────────────────────

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: isDark ? '#050810' : '#dde4f0', padding: 24 }}>
      {/* Phone Frame */}
      <div style={{ width: 375, height: 812, background: t.surface, borderRadius: 50, overflow: 'hidden', position: 'relative', display: 'flex', flexDirection: 'column', boxShadow: isDark ? '0 40px 120px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.08)' : '0 40px 120px rgba(0,0,0,0.25), 0 0 0 1px rgba(0,0,0,0.08)', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

        {/* Status Bar */}
        <div style={{ background: t.surface, padding: '14px 28px 6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0, zIndex: 10 }}>
          <div style={{ fontSize: 15, fontWeight: 800, color: t.text }}>{time}</div>
          {/* Dynamic Island */}
          <div style={{ width: 120, height: 34, background: '#000', borderRadius: 20, position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)', zIndex: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#1a1a1a', border: '1px solid #2a2a2a' }} />
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#0a0a0a', border: '1px solid #1a1a1a' }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            {React.createElement(window.lucide.Wifi, { size: 14, color: t.textSub })}
            {React.createElement(window.lucide.Signal, { size: 14, color: t.textSub })}
            <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <div style={{ width: 22, height: 12, border: `1.5px solid ${t.textSub}`, borderRadius: 3, display: 'flex', alignItems: 'center', padding: '2px 2px' }}>
                <div style={{ width: '75%', height: '100%', background: t.success, borderRadius: 1.5 }} />
              </div>
              <div style={{ width: 2, height: 6, background: t.textSub, borderRadius: 1 }} />
            </div>
          </div>
        </div>

        {/* App Header */}
        <div style={{ background: t.surface, padding: '8px 20px 12px', flexShrink: 0, borderBottom: `1px solid ${t.border}` }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, background: t.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {React.createElement(window.lucide.TrendingDown, { size: 14, color: '#fff' })}
              </div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 800, color: t.text, letterSpacing: '-0.3px' }}>Deal Drift</div>
                <div style={{ fontSize: 10, color: t.primary, fontWeight: 600, letterSpacing: '0.2px' }}>Turn messy deals into clear next steps</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              {React.createElement(window.lucide.Search, { size: 18, color: t.textSub })}
            </div>
          </div>
        </div>

        {/* Screen Content */}
        <div style={{ flex: 1, overflowY: 'auto', paddingTop: 16 }}>
          {renderScreen()}
        </div>

        {/* Bottom Nav */}
        <div style={{ background: t.navBg, borderTop: `1px solid ${t.border}`, padding: '10px 0 24px', display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexShrink: 0 }}>
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <div
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, cursor: 'pointer', padding: '4px 12px', borderRadius: 12, transition: 'all 0.2s', flex: 1 }}
              >
                <div style={{ width: 36, height: 36, borderRadius: 11, background: isActive ? t.primaryDim : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s', border: isActive ? `1px solid ${t.primary}30` : '1px solid transparent' }}>
                  {React.createElement(window.lucide[item.icon], { size: 18, color: isActive ? t.primary : t.textMuted, strokeWidth: isActive ? 2.5 : 1.8 })}
                </div>
                <div style={{ fontSize: 10, fontWeight: isActive ? 700 : 500, color: isActive ? t.primary : t.textMuted, transition: 'color 0.2s' }}>{item.label}</div>
                {isActive && <div style={{ width: 4, height: 4, borderRadius: '50%', background: t.primary }} />}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
