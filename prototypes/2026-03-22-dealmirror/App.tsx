
const { useState, useEffect, useRef } = React;

// ─── Font & Global Styles ─────────────────────────────────────────────────────
(() => {
  const s = document.createElement('style');
  s.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; -webkit-font-smoothing: antialiased; font-family: 'Space Grotesk', sans-serif; }
    ::-webkit-scrollbar { display: none; }
    @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    @keyframes slideUp { from { transform: translateY(16px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
    .slide-up { animation: slideUp 0.3s ease forwards; }
    .fade-in { animation: fadeIn 0.2s ease forwards; }
  `;
  document.head.appendChild(s);
})();

// ─── Themes ───────────────────────────────────────────────────────────────────
const themes = {
  dark: {
    bg: '#08091A',
    surface: '#0D0F22',
    card: '#131628',
    card2: '#181C30',
    border: '#222640',
    primary: '#7B68EE',
    primaryLight: '#A394FF',
    primaryDim: 'rgba(123,104,238,0.13)',
    primaryGlow: 'rgba(123,104,238,0.28)',
    secondary: '#00DFA0',
    secondaryDim: 'rgba(0,223,160,0.12)',
    text: '#EDF0FF',
    textSec: '#7A84A8',
    textMuted: '#3D4466',
    success: '#00DFA0',
    successDim: 'rgba(0,223,160,0.12)',
    warning: '#FFB347',
    warningDim: 'rgba(255,179,71,0.13)',
    danger: '#FF4D6D',
    dangerDim: 'rgba(255,77,109,0.13)',
    info: '#4DA6FF',
    infoDim: 'rgba(77,166,255,0.13)',
    navBg: '#0A0B1E',
    navBorder: '#1A1E33',
    gradient: 'linear-gradient(135deg, #7B68EE 0%, #A394FF 100%)',
    gradientAlt: 'linear-gradient(135deg, #00DFA0 0%, #00B87A 100%)',
  },
  light: {
    bg: '#F0F2FF',
    surface: '#FFFFFF',
    card: '#FFFFFF',
    card2: '#F5F7FF',
    border: '#DDE1F5',
    primary: '#5B4FE0',
    primaryLight: '#7B70F0',
    primaryDim: 'rgba(91,79,224,0.09)',
    primaryGlow: 'rgba(91,79,224,0.2)',
    secondary: '#00B87A',
    secondaryDim: 'rgba(0,184,122,0.1)',
    text: '#111327',
    textSec: '#4A5280',
    textMuted: '#9097C0',
    success: '#00B87A',
    successDim: 'rgba(0,184,122,0.1)',
    warning: '#E89020',
    warningDim: 'rgba(232,144,32,0.1)',
    danger: '#E03050',
    dangerDim: 'rgba(224,48,80,0.1)',
    info: '#2E7FD9',
    infoDim: 'rgba(46,127,217,0.1)',
    navBg: '#FFFFFF',
    navBorder: '#DDE1F5',
    gradient: 'linear-gradient(135deg, #5B4FE0 0%, #7B70F0 100%)',
    gradientAlt: 'linear-gradient(135deg, #00B87A 0%, #009966 100%)',
  },
};

// ─── Deal Data ────────────────────────────────────────────────────────────────
const dealsData = [
  {
    id: 1,
    name: 'Meridian Creative Rebrand',
    client: 'Meridian Group',
    initials: 'MG',
    value: '$28,000',
    status: 'Proposal Sent',
    health: 34,
    risk: 'critical',
    daysStale: 2,
    type: 'Design & Branding',
    risks: [
      { level: 'danger', label: 'Scope not confirmed', desc: 'Client mentioned "Phase 2" with zero deliverables defined — scope creep risk is high.' },
      { level: 'danger', label: 'Budget verbal only', desc: 'No written budget confirmation received. Verbal approval is not bankable.' },
      { level: 'warning', label: 'Decision maker unclear', desc: 'Marketing lead engaged, but CEO sign-off mentioned as required for final approval.' },
      { level: 'warning', label: 'Content ownership open', desc: 'Existing brand asset transfer rights have not been discussed or agreed upon.' },
    ],
    checklist: [
      { done: true, text: 'Initial proposal sent' },
      { done: true, text: 'Discovery call completed' },
      { done: false, text: 'Get written budget confirmation' },
      { done: false, text: 'Define Phase 2 deliverables' },
      { done: false, text: 'Identify final decision maker' },
      { done: false, text: 'Resolve content ownership rights' },
      { done: false, text: 'Contract signed' },
    ],
    followUp: `Hi Sarah,\n\nThank you for our conversation — I'm genuinely excited about the direction for Meridian's rebrand.\n\nTo keep us on track before I finalize the proposal, I have a few quick clarifications:\n\n1. Could you confirm the approved budget in writing so I can lock in the full scope?\n2. Will the CEO need to sign off before we proceed? If so, how would you recommend looping them in?\n3. For "Phase 2" — would you prefer I scope that now, or treat it as a separate engagement down the line?\n\nLooking forward to getting this moving!\n\nBest,\nAlex`,
  },
  {
    id: 2,
    name: 'TechFlow SaaS Integration',
    client: 'TechFlow Inc.',
    initials: 'TF',
    value: '$65,000',
    status: 'In Negotiation',
    health: 58,
    risk: 'medium',
    daysStale: 1,
    type: 'Software Development',
    risks: [
      { level: 'warning', label: 'Legal review pending', desc: 'IP clauses flagged by client legal team — no timeline or owner specified.' },
      { level: 'warning', label: 'Timeline pressure', desc: 'Q3 launch desired but scope complexity may exceed the available runway.' },
      { level: 'info', label: 'Multi-dept buy-in needed', desc: 'Product, engineering, and marketing must all align before final sign-off.' },
    ],
    checklist: [
      { done: true, text: 'Proposal delivered' },
      { done: true, text: 'Technical scoping completed' },
      { done: true, text: 'Budget range confirmed verbally' },
      { done: false, text: 'Schedule legal review' },
      { done: false, text: 'Multi-stakeholder alignment call' },
      { done: false, text: 'Confirm Q3 timeline feasibility' },
      { done: false, text: 'Contract signed' },
    ],
    followUp: `Hi Marcus,\n\nGreat progress on our discussions — I'm confident we can build something exceptional for TechFlow.\n\nA few things to keep us on the critical path:\n\n1. To meet your Q3 target, we need to kick off by March 15th. Can your legal team complete their review by March 10th?\n2. I'd recommend a 30-min alignment call with your product, engineering, and marketing leads this week. Can you help coordinate?\n3. I'm preparing a detailed timeline breakdown — is there any flexibility if we need an extra 2–3 weeks?\n\nLet me know your availability.\n\nBest,\nAlex`,
  },
  {
    id: 3,
    name: 'Lighthouse Consulting Retainer',
    client: 'Lighthouse Partners',
    initials: 'LP',
    value: '$4,500/mo',
    status: 'Contract Review',
    health: 82,
    risk: 'low',
    daysStale: 0,
    type: 'Consulting Retainer',
    risks: [
      { level: 'info', label: 'Termination clause to confirm', desc: '30-day notice period requested by client — confirm this is acceptable before signing.' },
    ],
    checklist: [
      { done: true, text: 'Scope defined and agreed' },
      { done: true, text: 'Monthly rate confirmed' },
      { done: true, text: 'Key contacts identified' },
      { done: true, text: 'Contract drafted' },
      { done: false, text: 'Finalize termination clause' },
      { done: false, text: 'Contract signed' },
      { done: false, text: 'Set up billing cycle' },
    ],
    followUp: `Hi Jennifer,\n\nI'm really looking forward to partnering with Lighthouse! I've updated the contract to include the 30-day termination notice as we discussed.\n\nCould you review the attached and confirm everything looks good? Once signed, I'll send the first invoice and we'll be all set for the April 1st start date.\n\nExcited to get started!\n\nBest,\nAlex`,
  },
  {
    id: 4,
    name: 'Apex E-commerce Overhaul',
    client: 'Apex Retail Co.',
    initials: 'AR',
    value: '$112,000',
    status: 'Discovery',
    health: 22,
    risk: 'critical',
    daysStale: 5,
    type: 'E-commerce Development',
    risks: [
      { level: 'danger', label: 'Payment terms undefined', desc: 'No deposit or milestone structure agreed — client expects "flexible payment" on a $112k project.' },
      { level: 'danger', label: 'Deal stalling — 5 days dark', desc: 'Last email unanswered. At this deal size, silence is a serious red flag.' },
      { level: 'danger', label: 'Scope creep in progress', desc: 'Client adding features ad hoc in conversation — no change order process agreed.' },
      { level: 'warning', label: 'Technical risk unassessed', desc: 'Legacy Magento migration complexity not yet evaluated by either party.' },
    ],
    checklist: [
      { done: true, text: 'Initial discovery call' },
      { done: false, text: 'Technical audit of Magento system' },
      { done: false, text: 'Define payment terms and deposit structure' },
      { done: false, text: 'Establish change order process' },
      { done: false, text: 'Scope freeze sign-off' },
      { done: false, text: 'Proposal delivery' },
      { done: false, text: 'Contract signed' },
    ],
    followUp: `Hi David,\n\nHope you're well — I wanted to follow up before I finalize the proposal for your platform overhaul.\n\n1. For a project of this scale, I typically structure payment as 40% upfront, 40% at mid-point milestone, and 20% at launch. Does that work for Apex, or would you prefer milestone-based alternatives?\n2. As we continue scoping, I'd like to establish a quick change-order process so there are no surprises mid-project. A 20-min call to align on this would go a long way.\n3. A brief technical audit call with your dev team would let me give you a much more accurate timeline — could we get 30 mins this week?\n\nLooking forward to making this Black Friday launch happen!\n\nBest,\nAlex`,
  },
  {
    id: 5,
    name: 'Sunstone Financial Dashboard',
    client: 'Sunstone Capital',
    initials: 'SC',
    value: '$38,500',
    status: 'Proposal Sent',
    health: 61,
    risk: 'medium',
    daysStale: 3,
    type: 'Data & Analytics',
    risks: [
      { level: 'warning', label: 'Kickoff delayed 6 weeks', desc: 'Internal restructuring pushed start date — warm deal risks cooling significantly.' },
      { level: 'warning', label: 'API access not approved', desc: 'Bloomberg & Refinitiv data feeds pending IT approval — critical path item.' },
    ],
    checklist: [
      { done: true, text: 'Requirements gathering complete' },
      { done: true, text: 'Proposal delivered' },
      { done: true, text: 'Budget approved at $38.5k' },
      { done: false, text: 'Confirm revised kickoff date' },
      { done: false, text: 'Resolve IT/API access approval' },
      { done: false, text: 'Data architecture sign-off' },
      { done: false, text: 'Contract signed' },
    ],
    followUp: `Hi Robert,\n\nHope the restructuring is wrapping up smoothly! As we approach late March, I wanted to check in on a couple of items before finalizing our timeline.\n\n1. Has a revised kickoff date been confirmed for late April? I want to make sure the right team is available.\n2. Has your IT team initiated the API access approval for Bloomberg and Refinitiv? This is on the critical path for your Q2 MVP.\n3. If it would help, I'm happy to join a brief call with your IT team to walk through the technical requirements directly.\n\nLooking forward to getting started!\n\nBest,\nAlex`,
  },
];

// ─── Demo Analyze Data ────────────────────────────────────────────────────────
const demoInputText = `Call notes - Apex website meeting - March 20, 2026
Attendees: Me, David (Head of Marketing), someone from IT (didn't catch name)

- David confirmed they want a full ecommerce rebuild, moving away from Magento
- Mentioned "phase 2 will include the loyalty program" - didn't define what that means
- Budget: David said "we have budget for this" but wouldn't give a number. Said his CFO needs to approve anything over $100k
- Timeline: they want this live before Black Friday (November). That's aggressive.
- Payment: David mentioned "we usually pay net-60" and expects "flexible terms"
- IT guy said there's existing customer data that needs to migrate but "IT handles that separately"
- David mentioned board sign-off is needed since it's a major investment
- He'll "loop in legal next week" - wasn't specific
- They want weekly progress calls throughout
- Competitor is also bidding but "you're our preferred vendor"`;

const demoAnalysisResult = {
  commitments: [
    'Full ecommerce rebuild confirmed (migrating away from Magento)',
    'Phase 2 loyalty program mentioned — zero deliverables defined',
    'Black Friday launch target (approx. Nov 28, 2026)',
    '"Preferred vendor" status confirmed verbally',
    'Weekly progress calls agreed upon',
  ],
  risks: [
    { level: 'danger', label: 'No budget number disclosed', desc: 'CFO approval required above $100k — no figure given. Cannot scope accurately without this.' },
    { level: 'danger', label: 'Phase 2 scope is undefined', desc: '"Loyalty program" added verbally with no deliverables. Classic scope creep vector.' },
    { level: 'danger', label: 'Payment terms are risky', desc: 'Net-60 + "flexible terms" on a $100k+ project creates significant cash flow exposure.' },
    { level: 'danger', label: 'Board approval discovered late', desc: 'A major bottleneck surfaced at end of call — this could add weeks of delay.' },
    { level: 'warning', label: 'Data migration ownership unclear', desc: '"IT handles that separately" leaves scope boundary dangerously undefined.' },
    { level: 'warning', label: 'Legal review has no timeline', desc: '"Loop in legal next week" is not a commitment — no owner, no date, no follow-up.' },
    { level: 'warning', label: 'Black Friday timeline is very aggressive', desc: 'Full Magento migration + rebuild in ~8 months is high-risk without scope freeze now.' },
  ],
  questions: [
    'What is the approved budget range for this project?',
    'Who specifically needs to approve — CFO only, or does the board also vote?',
    'Can you define the Phase 2 loyalty program scope so we can plan or price it separately?',
    'Our standard terms are 50% upfront — is that workable, or would milestones help?',
    'Who owns the customer data migration — your IT team or is it in our scope?',
    'When exactly is the legal review, and who is our point of contact on your legal team?',
  ],
};

// ─── Shared Components ────────────────────────────────────────────────────────
function HealthBar({ score, colors, size }) {
  const h = size === 'lg' ? 10 : 6;
  const color = score >= 70 ? colors.success : score >= 45 ? colors.warning : colors.danger;
  return (
    <div style={{ width: '100%', height: h, borderRadius: h, background: colors.border, overflow: 'hidden' }}>
      <div style={{
        width: `${score}%`, height: '100%', borderRadius: h,
        background: `linear-gradient(90deg, ${color}88, ${color})`,
        transition: 'width 0.6s ease',
      }} />
    </div>
  );
}

function RiskBadge({ risk, colors }) {
  const cfg = {
    critical: { bg: colors.dangerDim, color: colors.danger, label: 'Critical' },
    medium:   { bg: colors.warningDim, color: colors.warning, label: 'At Risk' },
    low:      { bg: colors.successDim, color: colors.success, label: 'Healthy' },
  };
  const c = cfg[risk] || cfg.medium;
  return (
    <span style={{
      background: c.bg, color: c.color, fontSize: 10, fontWeight: 700,
      padding: '3px 9px', borderRadius: 99, letterSpacing: '0.05em',
      textTransform: 'uppercase', flexShrink: 0,
    }}>{c.label}</span>
  );
}

function RiskItem({ risk, colors }) {
  const cfg = {
    danger:  { color: colors.danger,  bg: colors.dangerDim,  symbol: '▲' },
    warning: { color: colors.warning, bg: colors.warningDim, symbol: '◆' },
    info:    { color: colors.info,    bg: colors.infoDim,    symbol: '●' },
  };
  const c = cfg[risk.level] || cfg.info;
  return (
    <div style={{
      display: 'flex', gap: 10, padding: '11px 12px',
      background: colors.card2, borderRadius: 11, marginBottom: 8,
      borderLeft: `3px solid ${c.color}`,
    }}>
      <div style={{
        width: 26, height: 26, borderRadius: 7, background: c.bg,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: c.color, fontSize: 11, flexShrink: 0, marginTop: 1,
      }}>{c.symbol}</div>
      <div>
        <div style={{ fontSize: 13, fontWeight: 700, color: colors.text, marginBottom: 3 }}>{risk.label}</div>
        <div style={{ fontSize: 11.5, color: colors.textSec, lineHeight: 1.45 }}>{risk.desc}</div>
      </div>
    </div>
  );
}

function Avatar({ initials, size, colors }) {
  size = size || 38;
  return (
    <div style={{
      width: size, height: size, borderRadius: Math.round(size / 3.2),
      background: colors.primaryDim, border: `1.5px solid ${colors.primary}33`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: colors.primary, fontSize: Math.round(size * 0.34), fontWeight: 700, flexShrink: 0,
    }}>{initials}</div>
  );
}

function Toggle({ value, onChange, colors }) {
  return (
    <div onClick={() => onChange(!value)} style={{
      width: 46, height: 26, borderRadius: 13, cursor: 'pointer',
      background: value ? colors.primary : colors.card2,
      border: `1.5px solid ${value ? colors.primary : colors.border}`,
      position: 'relative', transition: 'all 0.22s', flexShrink: 0,
    }}>
      <div style={{
        position: 'absolute', top: 3, left: value ? 23 : 3,
        width: 18, height: 18, borderRadius: '50%', background: '#fff',
        transition: 'left 0.22s', boxShadow: '0 1px 4px rgba(0,0,0,0.25)',
      }} />
    </div>
  );
}

function SectionHeader({ label, action, onAction, colors }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
      <div style={{ fontSize: 14, fontWeight: 700, color: colors.text }}>{label}</div>
      {action && (
        <div onClick={onAction} style={{ fontSize: 12, color: colors.primary, fontWeight: 600, cursor: 'pointer' }}>
          {action}
        </div>
      )}
    </div>
  );
}

// ─── Home Screen ──────────────────────────────────────────────────────────────
function HomeScreen({ colors, onSelectDeal, setActiveTab }) {
  const urgent = dealsData.filter(d => d.risk === 'critical');
  const activity = [
    { icon: '✉️', text: 'Follow-up drafted for Lighthouse Partners', time: '2h ago' },
    { icon: '⚠️', text: 'Apex deal stalling — 5 days no response', time: '5h ago' },
    { icon: '📋', text: 'TechFlow closing checklist updated', time: 'Yesterday' },
    { icon: '🔍', text: 'Meridian transcript analyzed — 4 risks found', time: 'Yesterday' },
  ];

  return (
    <div style={{ padding: '4px 16px 24px', overflowY: 'auto', flex: 1 }}>
      {/* Greeting */}
      <div style={{ marginBottom: 18 }}>
        <div style={{ fontSize: 12, color: colors.textSec, fontWeight: 500, marginBottom: 3 }}>Sunday, March 22</div>
        <div style={{ fontSize: 22, fontWeight: 700, color: colors.text }}>Good morning, Alex</div>
        <div style={{ fontSize: 13, color: colors.textSec, marginTop: 3 }}>
          {urgent.length} deal{urgent.length !== 1 ? 's' : ''} need your attention today
        </div>
      </div>

      {/* Pipeline Card */}
      <div style={{
        background: colors.gradient, borderRadius: 20, padding: '18px 20px',
        marginBottom: 20, position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', right: -24, top: -24, width: 130, height: 130, borderRadius: '50%', background: 'rgba(255,255,255,0.07)' }} />
        <div style={{ position: 'absolute', right: 30, bottom: -30, width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.65)', fontWeight: 600, marginBottom: 4, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
          Active Pipeline
        </div>
        <div style={{ fontSize: 34, fontWeight: 700, color: '#fff', marginBottom: 18, letterSpacing: '-0.5px' }}>
          $248,000
        </div>
        <div style={{ display: 'flex', gap: 0 }}>
          {[
            { label: 'Active Deals', value: '5' },
            { label: 'Critical Risk', value: '2' },
            { label: 'Avg Health', value: '51%' },
          ].map((stat, i) => (
            <div key={stat.label} style={{ flex: 1, paddingLeft: i > 0 ? 16 : 0, borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.15)' : 'none' }}>
              <div style={{ fontSize: 20, fontWeight: 700, color: '#fff' }}>{stat.value}</div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.6)', fontWeight: 500 }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Urgent Deals */}
      <div style={{ marginBottom: 20 }}>
        <SectionHeader label="🚨 Needs Attention" action="See all" onAction={() => setActiveTab('deals')} colors={colors} />
        {urgent.map(deal => (
          <div
            key={deal.id}
            onClick={() => { onSelectDeal(deal); setActiveTab('deals'); }}
            style={{
              background: colors.card, border: `1px solid ${colors.border}`,
              borderRadius: 16, padding: '14px 15px', marginBottom: 10, cursor: 'pointer',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <Avatar initials={deal.initials} size={38} colors={colors} />
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: colors.text }}>{deal.name}</div>
                  <div style={{ fontSize: 11, color: colors.textSec }}>{deal.value} · {deal.status}</div>
                </div>
              </div>
              <RiskBadge risk={deal.risk} colors={colors} />
            </div>
            <div style={{ marginBottom: 8 }}><HealthBar score={deal.health} colors={colors} /></div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ fontSize: 11.5, color: colors.danger, fontWeight: 500 }}>
                {deal.risks.length} risks identified
              </div>
              <div style={{ fontSize: 11.5, color: colors.textSec }}>
                {deal.daysStale > 0 ? `${deal.daysStale}d stale` : 'Active today'}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div style={{ marginBottom: 20 }}>
        <SectionHeader label="Recent Activity" colors={colors} />
        <div style={{ background: colors.card, border: `1px solid ${colors.border}`, borderRadius: 16, overflow: 'hidden' }}>
          {activity.map((item, i) => (
            <div key={i} style={{
              display: 'flex', gap: 12, alignItems: 'center', padding: '12px 14px',
              borderBottom: i < activity.length - 1 ? `1px solid ${colors.border}` : 'none',
            }}>
              <div style={{
                width: 34, height: 34, borderRadius: 10, background: colors.card2,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, flexShrink: 0,
              }}>{item.icon}</div>
              <div style={{ flex: 1, fontSize: 12.5, color: colors.text, lineHeight: 1.35 }}>{item.text}</div>
              <div style={{ fontSize: 10.5, color: colors.textMuted, flexShrink: 0 }}>{item.time}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Analyze CTA */}
      <div
        onClick={() => setActiveTab('analyze')}
        style={{
          background: colors.primaryDim, border: `1.5px dashed ${colors.primary}55`,
          borderRadius: 16, padding: '14px 16px', display: 'flex', alignItems: 'center',
          gap: 12, cursor: 'pointer',
        }}
      >
        <div style={{
          width: 38, height: 38, borderRadius: 11, background: colors.gradient,
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          {React.createElement(window.lucide.Zap, { size: 18, color: '#fff' })}
        </div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: colors.primary }}>Analyze a New Deal</div>
          <div style={{ fontSize: 11.5, color: colors.textSec }}>Paste call notes or a transcript</div>
        </div>
        {React.createElement(window.lucide.ChevronRight, { size: 16, color: colors.textMuted, style: { marginLeft: 'auto' } })}
      </div>
    </div>
  );
}

// ─── Deals List Screen ────────────────────────────────────────────────────────
function DealsScreen({ colors, onSelectDeal }) {
  const [filter, setFilter] = useState('all');
  const filters = [
    { id: 'all', label: 'All' },
    { id: 'critical', label: 'Critical' },
    { id: 'medium', label: 'At Risk' },
    { id: 'low', label: 'Healthy' },
  ];
  const filtered = filter === 'all' ? dealsData : dealsData.filter(d => d.risk === filter);

  return (
    <div style={{ padding: '4px 16px 24px', overflowY: 'auto', flex: 1 }}>
      <div style={{ fontSize: 20, fontWeight: 700, color: colors.text, marginBottom: 14 }}>My Deals</div>

      {/* Filter pills */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
        {filters.map(f => (
          <div key={f.id} onClick={() => setFilter(f.id)} style={{
            padding: '6px 13px', borderRadius: 99, fontSize: 12, fontWeight: 600, cursor: 'pointer',
            background: filter === f.id ? colors.primary : colors.card2,
            color: filter === f.id ? '#fff' : colors.textSec,
            border: `1px solid ${filter === f.id ? 'transparent' : colors.border}`,
            transition: 'all 0.15s',
          }}>{f.label}</div>
        ))}
      </div>

      {filtered.map(deal => (
        <div
          key={deal.id}
          onClick={() => onSelectDeal(deal)}
          style={{
            background: colors.card, border: `1px solid ${colors.border}`,
            borderRadius: 16, padding: '15px', marginBottom: 12, cursor: 'pointer',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <Avatar initials={deal.initials} size={40} colors={colors} />
              <div>
                <div style={{ fontSize: 13.5, fontWeight: 700, color: colors.text }}>{deal.name}</div>
                <div style={{ fontSize: 11, color: colors.textSec, marginTop: 1 }}>{deal.client} · {deal.type}</div>
              </div>
            </div>
            <RiskBadge risk={deal.risk} colors={colors} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
            <div>
              <div style={{ fontSize: 17, fontWeight: 700, color: colors.text }}>{deal.value}</div>
              <div style={{ fontSize: 11, color: colors.textSec }}>{deal.status}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{
                fontSize: 24, fontWeight: 700, lineHeight: 1,
                color: deal.health >= 70 ? colors.success : deal.health >= 45 ? colors.warning : colors.danger,
              }}>{deal.health}</div>
              <div style={{ fontSize: 10, color: colors.textSec }}>health</div>
            </div>
          </div>
          <div style={{ marginBottom: 10 }}><HealthBar score={deal.health} colors={colors} /></div>
          <div style={{
            display: 'flex', justifyContent: 'space-between', paddingTop: 10,
            borderTop: `1px solid ${colors.border}`,
          }}>
            <div style={{ fontSize: 11.5, color: deal.risks.length > 2 ? colors.danger : colors.textSec, fontWeight: 500 }}>
              {deal.risks.length} risk{deal.risks.length !== 1 ? 's' : ''} found
            </div>
            <div style={{ fontSize: 11.5, color: colors.textSec }}>
              {deal.daysStale > 0 ? `${deal.daysStale}d since activity` : 'Active today'}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Deal Detail Screen ───────────────────────────────────────────────────────
function DealDetailScreen({ deal, colors, onBack }) {
  const [tab, setTab] = useState('risks');
  const [copied, setCopied] = useState(false);
  const done = deal.checklist.filter(c => c.done).length;
  const healthColor = deal.health >= 70 ? colors.success : deal.health >= 45 ? colors.warning : colors.danger;

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ padding: '4px 16px 14px', background: colors.surface, borderBottom: `1px solid ${colors.border}`, flexShrink: 0 }}>
        <div onClick={onBack} style={{
          display: 'flex', alignItems: 'center', gap: 5, marginBottom: 12,
          color: colors.primary, fontSize: 13, fontWeight: 600, cursor: 'pointer',
        }}>
          {React.createElement(window.lucide.ChevronLeft, { size: 16 })} All Deals
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
          <div style={{ flex: 1, paddingRight: 10 }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: colors.text, lineHeight: 1.25, marginBottom: 3 }}>{deal.name}</div>
            <div style={{ fontSize: 11.5, color: colors.textSec }}>{deal.client} · {deal.type}</div>
          </div>
          <RiskBadge risk={deal.risk} colors={colors} />
        </div>

        {/* Health bar */}
        <div style={{ background: colors.card2, borderRadius: 12, padding: '12px 14px', marginBottom: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <div style={{ fontSize: 12, color: colors.textSec, fontWeight: 500 }}>Deal Health Score</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: healthColor }}>{deal.health}/100</div>
          </div>
          <HealthBar score={deal.health} colors={colors} size="lg" />
        </div>

        {/* Quick stats */}
        <div style={{ display: 'flex', gap: 8 }}>
          {[
            { label: 'Value', value: deal.value },
            { label: 'Status', value: deal.status },
            { label: 'Checklist', value: `${done}/${deal.checklist.length}` },
          ].map(stat => (
            <div key={stat.label} style={{ flex: 1, background: colors.card2, borderRadius: 10, padding: '8px 10px' }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: colors.text }}>{stat.value}</div>
              <div style={{ fontSize: 10, color: colors.textSec, marginTop: 1 }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tab bar */}
      <div style={{
        display: 'flex', background: colors.surface, borderBottom: `1px solid ${colors.border}`, flexShrink: 0,
      }}>
        {[
          { id: 'risks', label: 'Risk Map' },
          { id: 'checklist', label: 'Checklist' },
          { id: 'followup', label: 'Follow-up' },
        ].map(t => (
          <div key={t.id} onClick={() => setTab(t.id)} style={{
            flex: 1, padding: '11px 0', textAlign: 'center', fontSize: 12.5, fontWeight: 600, cursor: 'pointer',
            color: tab === t.id ? colors.primary : colors.textSec,
            borderBottom: tab === t.id ? `2px solid ${colors.primary}` : '2px solid transparent',
            marginBottom: -1, transition: 'all 0.15s',
          }}>{t.label}</div>
        ))}
      </div>

      {/* Tab content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
        {tab === 'risks' && (
          <div>
            <div style={{ fontSize: 13, color: colors.textSec, marginBottom: 12, lineHeight: 1.5 }}>
              {deal.risks.length} friction point{deal.risks.length !== 1 ? 's' : ''} detected that could delay or derail this deal.
            </div>
            {deal.risks.map((risk, i) => <RiskItem key={i} risk={risk} colors={colors} />)}
          </div>
        )}

        {tab === 'checklist' && (
          <div>
            <div style={{ fontSize: 13, color: colors.textSec, marginBottom: 12 }}>
              {done} of {deal.checklist.length} closing steps completed
            </div>
            {deal.checklist.map((item, i) => (
              <div key={i} style={{
                display: 'flex', gap: 11, alignItems: 'center', padding: '11px 0',
                borderBottom: i < deal.checklist.length - 1 ? `1px solid ${colors.border}` : 'none',
              }}>
                <div style={{
                  width: 21, height: 21, borderRadius: 6, flexShrink: 0,
                  background: item.done ? colors.success : 'transparent',
                  border: `1.5px solid ${item.done ? colors.success : colors.border}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {item.done && React.createElement(window.lucide.Check, { size: 12, color: '#fff', strokeWidth: 3 })}
                </div>
                <div style={{
                  fontSize: 13, fontWeight: 500,
                  color: item.done ? colors.textSec : colors.text,
                  textDecoration: item.done ? 'line-through' : 'none',
                }}>{item.text}</div>
              </div>
            ))}
          </div>
        )}

        {tab === 'followup' && (
          <div>
            <div style={{ fontSize: 13, color: colors.textSec, marginBottom: 12 }}>
              AI-drafted follow-up tailored to this deal's open risks and missing confirmations.
            </div>
            <div style={{
              background: colors.card2, border: `1px solid ${colors.border}`,
              borderRadius: 12, padding: '14px', fontSize: 12.5, color: colors.text,
              lineHeight: 1.7, whiteSpace: 'pre-line', marginBottom: 12,
            }}>{deal.followUp}</div>
            <div style={{ display: 'flex', gap: 8 }}>
              <div onClick={handleCopy} style={{
                flex: 1, padding: '10px 0', textAlign: 'center', borderRadius: 11, cursor: 'pointer',
                background: copied ? colors.successDim : colors.card2,
                border: `1.5px solid ${copied ? colors.success : colors.border}`,
                color: copied ? colors.success : colors.textSec,
                fontSize: 12.5, fontWeight: 600,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, transition: 'all 0.2s',
              }}>
                {React.createElement(copied ? window.lucide.Check : window.lucide.Copy, { size: 14 })}
                {copied ? 'Copied!' : 'Copy'}
              </div>
              <div style={{
                flex: 2, padding: '10px 0', textAlign: 'center', borderRadius: 11, cursor: 'pointer',
                background: colors.gradient, color: '#fff', fontSize: 12.5, fontWeight: 600,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              }}>
                {React.createElement(window.lucide.Send, { size: 14 })}
                Send via Email
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Analyze Screen ───────────────────────────────────────────────────────────
function AnalyzeScreen({ colors }) {
  const [text, setText] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState(null);
  const [openSection, setOpenSection] = useState('risks');

  const handleAnalyze = () => {
    if (!text.trim()) return;
    setAnalyzing(true);
    setResults(null);
    setTimeout(() => {
      setAnalyzing(false);
      setResults(demoAnalysisResult);
      setOpenSection('risks');
    }, 2400);
  };

  const loadDemo = () => {
    setText(demoInputText);
    setResults(null);
  };

  const sections = [
    { id: 'commitments', label: '📌 Commitments Extracted', count: results ? results.commitments.length : 0 },
    { id: 'risks', label: '⚠️ Risks Detected', count: results ? results.risks.length : 0 },
    { id: 'questions', label: '❓ Questions to Ask', count: results ? results.questions.length : 0 },
  ];

  return (
    <div style={{ padding: '4px 16px 24px', overflowY: 'auto', flex: 1 }}>
      <div style={{ fontSize: 20, fontWeight: 700, color: colors.text, marginBottom: 4 }}>Analyze Deal</div>
      <div style={{ fontSize: 13, color: colors.textSec, marginBottom: 16 }}>
        Paste call notes, an email, or a transcript
      </div>

      {/* Text input */}
      <div style={{
        border: `1.5px solid ${text ? colors.primary + '66' : colors.border}`,
        borderRadius: 14, overflow: 'hidden', background: colors.card,
        transition: 'border-color 0.2s', marginBottom: 10, position: 'relative',
      }}>
        <textarea
          value={text}
          onChange={e => { setText(e.target.value); setResults(null); }}
          placeholder="Paste meeting notes, email thread, or call transcript here..."
          style={{
            width: '100%', minHeight: 130, padding: '12px 14px',
            background: 'transparent', border: 'none', outline: 'none', resize: 'none',
            color: colors.text, fontSize: 13, lineHeight: 1.6,
            fontFamily: 'Space Grotesk, sans-serif',
          }}
        />
        {text.length > 0 && (
          <div onClick={() => { setText(''); setResults(null); }} style={{
            position: 'absolute', top: 10, right: 10,
            width: 22, height: 22, borderRadius: '50%', background: colors.card2,
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          }}>
            {React.createElement(window.lucide.X, { size: 12, color: colors.textSec })}
          </div>
        )}
      </div>

      {/* Action buttons */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <div onClick={loadDemo} style={{
          flex: 1, padding: '10px 0', textAlign: 'center', borderRadius: 11, cursor: 'pointer',
          background: colors.card2, border: `1px solid ${colors.border}`,
          color: colors.textSec, fontSize: 12.5, fontWeight: 600,
        }}>Try Demo</div>
        <div onClick={handleAnalyze} style={{
          flex: 2, padding: '10px 0', textAlign: 'center', borderRadius: 11,
          background: text.trim() ? colors.gradient : colors.card2,
          color: text.trim() ? '#fff' : colors.textMuted,
          fontSize: 13, fontWeight: 700, cursor: text.trim() ? 'pointer' : 'default',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
          transition: 'all 0.2s',
        }}>
          {analyzing
            ? React.createElement(window.lucide.Loader2, { size: 16, color: '#fff', style: { animation: 'spin 1s linear infinite' } })
            : React.createElement(window.lucide.Zap, { size: 15 })
          }
          {analyzing ? 'Analyzing...' : 'Analyze Deal'}
        </div>
      </div>

      {/* Analyzing state */}
      {analyzing && (
        <div style={{ textAlign: 'center', padding: '16px 0' }}>
          <div style={{ fontSize: 13, color: colors.textSec, marginBottom: 12 }}>Scanning for deal signals...</div>
          {['Extracting commitments', 'Mapping risk patterns', 'Generating clarifying questions'].map((step, i) => (
            <div key={i} style={{
              fontSize: 12, color: colors.textMuted, marginBottom: 6,
              animation: `pulse ${1.2 + i * 0.4}s ease infinite`,
            }}>◈ {step}</div>
          ))}
        </div>
      )}

      {/* Results */}
      {results && (
        <div style={{ animation: 'slideUp 0.3s ease' }}>
          <div style={{
            background: colors.successDim, border: `1px solid ${colors.success}33`,
            borderRadius: 12, padding: '10px 14px', marginBottom: 14,
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            {React.createElement(window.lucide.CheckCircle2, { size: 16, color: colors.success })}
            <div style={{ fontSize: 13, color: colors.success, fontWeight: 600 }}>
              Analysis complete — {results.risks.length} risks found
            </div>
          </div>

          {sections.map(section => (
            <div key={section.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setOpenSection(openSection === section.id ? null : section.id)} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                background: colors.card2, borderRadius: openSection === section.id ? '12px 12px 0 0' : 12,
                padding: '12px 14px', cursor: 'pointer', border: `1px solid ${colors.border}`,
                borderBottom: openSection === section.id ? 'none' : `1px solid ${colors.border}`,
              }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: colors.text }}>{section.label}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{
                    background: colors.primaryDim, color: colors.primary,
                    fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 99,
                  }}>{section.count}</div>
                  {React.createElement(
                    openSection === section.id ? window.lucide.ChevronUp : window.lucide.ChevronDown,
                    { size: 15, color: colors.textSec }
                  )}
                </div>
              </div>

              {openSection === section.id && (
                <div style={{
                  background: colors.card, border: `1px solid ${colors.border}`,
                  borderTop: 'none', borderRadius: '0 0 12px 12px', padding: '12px 14px',
                }}>
                  {section.id === 'commitments' && results.commitments.map((c, i) => (
                    <div key={i} style={{
                      display: 'flex', gap: 8, alignItems: 'flex-start', padding: '6px 0',
                      borderBottom: i < results.commitments.length - 1 ? `1px solid ${colors.border}` : 'none',
                    }}>
                      <div style={{ color: colors.secondary, fontSize: 13, marginTop: 1, flexShrink: 0 }}>✓</div>
                      <div style={{ fontSize: 12.5, color: colors.text, lineHeight: 1.45 }}>{c}</div>
                    </div>
                  ))}
                  {section.id === 'risks' && results.risks.map((r, i) => (
                    <div key={i} style={{ marginBottom: i < results.risks.length - 1 ? 0 : 0 }}>
                      <RiskItem risk={r} colors={colors} />
                    </div>
                  ))}
                  {section.id === 'questions' && results.questions.map((q, i) => (
                    <div key={i} style={{
                      display: 'flex', gap: 9, alignItems: 'flex-start', padding: '7px 0',
                      borderBottom: i < results.questions.length - 1 ? `1px solid ${colors.border}` : 'none',
                    }}>
                      <div style={{
                        background: colors.primaryDim, color: colors.primary,
                        width: 20, height: 20, borderRadius: '50%', display: 'flex',
                        alignItems: 'center', justifyContent: 'center', fontSize: 10,
                        fontWeight: 700, flexShrink: 0, marginTop: 1,
                      }}>{i + 1}</div>
                      <div style={{ fontSize: 12.5, color: colors.text, lineHeight: 1.45 }}>{q}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          <div style={{
            background: colors.gradient, borderRadius: 14, padding: '14px 16px',
            display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', marginTop: 6,
          }}>
            {React.createElement(window.lucide.MessageSquare, { size: 20, color: '#fff' })}
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>Generate Follow-up Message</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)' }}>Tailored to the risks above</div>
            </div>
            {React.createElement(window.lucide.ArrowRight, { size: 16, color: 'rgba(255,255,255,0.7)', style: { marginLeft: 'auto' } })}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Messages Screen ──────────────────────────────────────────────────────────
function MessagesScreen({ colors }) {
  const [expanded, setExpanded] = useState(null);
  const [copied, setCopied] = useState(null);

  const handleCopy = (id) => {
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div style={{ padding: '4px 16px 24px', overflowY: 'auto', flex: 1 }}>
      <div style={{ fontSize: 20, fontWeight: 700, color: colors.text, marginBottom: 4 }}>Follow-ups</div>
      <div style={{ fontSize: 13, color: colors.textSec, marginBottom: 16 }}>
        AI-drafted messages ready to review and send
      </div>

      {dealsData.map(deal => (
        <div key={deal.id} style={{
          background: colors.card, border: `1px solid ${colors.border}`,
          borderRadius: 16, marginBottom: 10, overflow: 'hidden',
        }}>
          <div
            onClick={() => setExpanded(expanded === deal.id ? null : deal.id)}
            style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '13px 15px', cursor: 'pointer',
            }}
          >
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', flex: 1, minWidth: 0 }}>
              <Avatar initials={deal.initials} size={36} colors={colors} />
              <div style={{ minWidth: 0 }}>
                <div style={{
                  fontSize: 13, fontWeight: 700, color: colors.text,
                  overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                }}>{deal.name}</div>
                <div style={{ fontSize: 11, color: colors.textSec }}>{deal.client}</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexShrink: 0, marginLeft: 8 }}>
              <RiskBadge risk={deal.risk} colors={colors} />
              {React.createElement(
                expanded === deal.id ? window.lucide.ChevronUp : window.lucide.ChevronDown,
                { size: 15, color: colors.textSec }
              )}
            </div>
          </div>

          {expanded === deal.id && (
            <div style={{
              borderTop: `1px solid ${colors.border}`,
              padding: '14px 15px', background: colors.card2,
            }}>
              <div style={{
                fontSize: 12.5, color: colors.text, lineHeight: 1.7,
                whiteSpace: 'pre-line', marginBottom: 12,
              }}>{deal.followUp}</div>
              <div style={{ display: 'flex', gap: 8 }}>
                <div onClick={() => handleCopy(deal.id)} style={{
                  flex: 1, padding: '9px 0', textAlign: 'center', borderRadius: 10, cursor: 'pointer',
                  background: copied === deal.id ? colors.successDim : colors.card,
                  border: `1.5px solid ${copied === deal.id ? colors.success : colors.border}`,
                  color: copied === deal.id ? colors.success : colors.textSec,
                  fontSize: 12.5, fontWeight: 600, transition: 'all 0.2s',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5,
                }}>
                  {React.createElement(copied === deal.id ? window.lucide.Check : window.lucide.Copy, { size: 13 })}
                  {copied === deal.id ? 'Copied!' : 'Copy'}
                </div>
                <div style={{
                  flex: 2, padding: '9px 0', textAlign: 'center', borderRadius: 10,
                  background: colors.gradient, color: '#fff', fontSize: 12.5, fontWeight: 600,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5, cursor: 'pointer',
                }}>
                  {React.createElement(window.lucide.Send, { size: 13 })}
                  Send via Email
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Settings Screen ──────────────────────────────────────────────────────────
function SettingsScreen({ colors, theme, setTheme }) {
  const [notifs, setNotifs] = useState(true);
  const [staleAlerts, setStaleAlerts] = useState(true);
  const [weeklyReport, setWeeklyReport] = useState(false);

  const prefRows = [
    { label: 'Default Deal Type', value: 'Project-based', Icon: window.lucide.Briefcase },
    { label: 'Stale Deal Threshold', value: '3 days', Icon: window.lucide.Clock },
    { label: 'Follow-up Tone', value: 'Professional', Icon: window.lucide.MessageSquare },
    { label: 'Currency', value: 'USD ($)', Icon: window.lucide.DollarSign },
  ];

  return (
    <div style={{ padding: '4px 16px 24px', overflowY: 'auto', flex: 1 }}>
      <div style={{ fontSize: 20, fontWeight: 700, color: colors.text, marginBottom: 18 }}>Settings</div>

      {/* Profile card */}
      <div style={{
        background: colors.gradient, borderRadius: 18, padding: '16px 18px',
        marginBottom: 22, display: 'flex', gap: 14, alignItems: 'center',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', right: -20, top: -20, width: 110, height: 110, borderRadius: '50%', background: 'rgba(255,255,255,0.07)' }} />
        <div style={{
          width: 50, height: 50, borderRadius: 14, background: 'rgba(255,255,255,0.2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff', fontSize: 20, fontWeight: 700, flexShrink: 0,
        }}>A</div>
        <div>
          <div style={{ fontSize: 16, fontWeight: 700, color: '#fff' }}>Alex Morgan</div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>alex@studiocraft.co</div>
          <div style={{
            display: 'inline-block', marginTop: 5, background: 'rgba(255,255,255,0.2)',
            borderRadius: 99, padding: '2px 9px', fontSize: 10, color: '#fff', fontWeight: 600,
          }}>Pro Plan</div>
        </div>
      </div>

      {/* Appearance */}
      <div style={{ fontSize: 11, fontWeight: 700, color: colors.textMuted, marginBottom: 8, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
        Appearance
      </div>
      <div style={{
        background: colors.card, border: `1px solid ${colors.border}`,
        borderRadius: 14, overflow: 'hidden', marginBottom: 20,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 15px' }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10, background: colors.primaryDim,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {React.createElement(theme === 'dark' ? window.lucide.Moon : window.lucide.Sun, { size: 17, color: colors.primary })}
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: colors.text }}>{theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</div>
              <div style={{ fontSize: 11, color: colors.textSec }}>Switch to {theme === 'dark' ? 'light' : 'dark'} theme</div>
            </div>
          </div>
          <Toggle value={theme === 'dark'} onChange={v => setTheme(v ? 'dark' : 'light')} colors={colors} />
        </div>
      </div>

      {/* Notifications */}
      <div style={{ fontSize: 11, fontWeight: 700, color: colors.textMuted, marginBottom: 8, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
        Notifications
      </div>
      <div style={{
        background: colors.card, border: `1px solid ${colors.border}`,
        borderRadius: 14, overflow: 'hidden', marginBottom: 20,
      }}>
        {[
          { label: 'Deal risk alerts', desc: 'New risks and friction points', value: notifs, set: setNotifs },
          { label: 'Stale deal warnings', desc: 'When a deal goes quiet', value: staleAlerts, set: setStaleAlerts },
          { label: 'Weekly deal report', desc: 'Pipeline summary every Monday', value: weeklyReport, set: setWeeklyReport },
        ].map((item, i) => (
          <div key={i} style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '13px 15px',
            borderBottom: i < 2 ? `1px solid ${colors.border}` : 'none',
          }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: colors.text }}>{item.label}</div>
              <div style={{ fontSize: 11, color: colors.textSec }}>{item.desc}</div>
            </div>
            <Toggle value={item.value} onChange={item.set} colors={colors} />
          </div>
        ))}
      </div>

      {/* Preferences */}
      <div style={{ fontSize: 11, fontWeight: 700, color: colors.textMuted, marginBottom: 8, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
        Deal Preferences
      </div>
      <div style={{
        background: colors.card, border: `1px solid ${colors.border}`,
        borderRadius: 14, overflow: 'hidden', marginBottom: 20,
      }}>
        {prefRows.map((item, i) => (
          <div key={i} style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '12px 15px',
            borderBottom: i < prefRows.length - 1 ? `1px solid ${colors.border}` : 'none',
          }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <div style={{
                width: 32, height: 32, borderRadius: 9, background: colors.primaryDim,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {React.createElement(item.Icon, { size: 14, color: colors.primary })}
              </div>
              <div style={{ fontSize: 13, fontWeight: 500, color: colors.text }}>{item.label}</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <div style={{ fontSize: 12.5, color: colors.textSec }}>{item.value}</div>
              {React.createElement(window.lucide.ChevronRight, { size: 14, color: colors.textMuted })}
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center', fontSize: 12, color: colors.textMuted, paddingBottom: 4 }}>
        DealMirror v1.0.0 — Turn shaky deals into clear next steps.
      </div>
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
function App() {
  const [theme, setTheme] = useState('dark');
  const [activeTab, setActiveTab] = useState('home');
  const [selectedDeal, setSelectedDeal] = useState(null);

  const colors = themes[theme];

  const tabs = [
    { id: 'home',     label: 'Home',     icon: window.lucide.Home },
    { id: 'deals',    label: 'Deals',    icon: window.lucide.Briefcase },
    { id: 'analyze',  label: 'Analyze',  icon: window.lucide.Zap },
    { id: 'messages', label: 'Messages', icon: window.lucide.MessageCircle },
    { id: 'settings', label: 'Settings', icon: window.lucide.Settings },
  ];

  const handleTabChange = (id) => {
    setActiveTab(id);
    if (id !== 'deals') setSelectedDeal(null);
  };

  const now = new Date();
  const timeStr = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

  const navItemStyle = {
    flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
    justifyContent: 'center', gap: 3, padding: '8px 0', cursor: 'pointer',
    transition: 'all 0.15s',
  };

  const labelStyle = { fontSize: 10, fontWeight: 600 };

  const renderScreen = () => {
    const props = { colors, theme, setTheme };
    if (activeTab === 'home') {
      return React.createElement(HomeScreen, {
        ...props,
        onSelectDeal: (deal) => { setSelectedDeal(deal); setActiveTab('deals'); },
        setActiveTab: handleTabChange,
      });
    }
    if (activeTab === 'deals') {
      if (selectedDeal) {
        return React.createElement(DealDetailScreen, {
          ...props,
          deal: selectedDeal,
          onBack: () => setSelectedDeal(null),
        });
      }
      return React.createElement(DealsScreen, {
        ...props,
        onSelectDeal: setSelectedDeal,
      });
    }
    if (activeTab === 'analyze') return React.createElement(AnalyzeScreen, props);
    if (activeTab === 'messages') return React.createElement(MessagesScreen, props);
    if (activeTab === 'settings') return React.createElement(SettingsScreen, props);
    return null;
  };

  return (
    <div style={{
      minHeight: '100vh', background: '#e4e6f0',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: "'Space Grotesk', sans-serif", padding: '20px 0',
    }}>
      {/* Phone frame */}
      <div style={{
        width: 375, height: 812, background: colors.bg, borderRadius: 55,
        overflow: 'hidden', position: 'relative', display: 'flex', flexDirection: 'column',
        boxShadow: theme === 'dark'
          ? '0 50px 100px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.06), inset 0 0 0 1px rgba(255,255,255,0.04)'
          : '0 50px 100px rgba(0,0,40,0.18), 0 0 0 1px rgba(0,0,0,0.08)',
      }}>
        {/* Dynamic Island */}
        <div style={{
          position: 'absolute', top: 13, left: '50%', transform: 'translateX(-50%)',
          width: 122, height: 35, background: '#000', borderRadius: 22, zIndex: 100,
        }} />

        {/* Status bar */}
        <div style={{
          height: 52, display: 'flex', alignItems: 'flex-end',
          justifyContent: 'space-between', padding: '0 26px 8px',
          background: colors.bg, flexShrink: 0, zIndex: 10,
        }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: colors.text }}>{timeStr}</div>
          <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
            {React.createElement(window.lucide.Signal, { size: 15, color: colors.text })}
            {React.createElement(window.lucide.Wifi, { size: 15, color: colors.text })}
            {React.createElement(window.lucide.Battery, { size: 16, color: colors.text })}
          </div>
        </div>

        {/* Screen content */}
        <div style={{
          flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column',
          background: colors.bg,
        }}>
          {renderScreen()}
        </div>

        {/* Bottom nav */}
        <div style={{
          height: 82, background: colors.navBg, borderTop: `1px solid ${colors.navBorder}`,
          display: 'flex', alignItems: 'center', paddingBottom: 12, flexShrink: 0,
        }}>
          {tabs.map(tab => React.createElement('div', {
            key: tab.id,
            onClick: () => handleTabChange(tab.id),
            style: {
              ...navItemStyle,
              color: activeTab === tab.id ? colors.primary : colors.textMuted,
            },
          },
            React.createElement('div', {
              style: {
                width: 42, height: 28, borderRadius: 10,
                background: activeTab === tab.id ? colors.primaryDim : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.15s',
              },
            },
              React.createElement(tab.icon, {
                size: 20,
                color: activeTab === tab.id ? colors.primary : colors.textMuted,
              })
            ),
            React.createElement('span', {
              style: { ...labelStyle, color: activeTab === tab.id ? colors.primary : colors.textMuted },
            }, tab.label)
          ))}
        </div>
      </div>
    </div>
  );
}
