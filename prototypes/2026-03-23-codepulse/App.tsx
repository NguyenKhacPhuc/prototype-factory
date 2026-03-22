const { useState, useEffect, useRef } = React;

// ── Font + Global Styles ───────────────────────────────────────────────────
(function injectStyles() {
  const link = document.createElement('link');
  link.href = 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&display=swap';
  link.rel = 'stylesheet';
  document.head.appendChild(link);
  const style = document.createElement('style');
  style.textContent = `
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: #0e0b1f; font-family: 'Space Grotesk', sans-serif; }
    ::-webkit-scrollbar { display: none; }
    @keyframes pulse-dot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(0.85)} }
    @keyframes slide-up { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
    @keyframes ring-pulse { 0%{box-shadow:0 0 0 0 rgba(220,38,38,0.5)} 70%{box-shadow:0 0 0 8px rgba(220,38,38,0)} 100%{box-shadow:0 0 0 0 rgba(220,38,38,0)} }
    @keyframes shimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
  `;
  document.head.appendChild(style);
})();

// ── Themes ─────────────────────────────────────────────────────────────────
const themes = {
  light: {
    outerBg:    '#e8e2f8',
    phoneBg:    '#f7f5ff',
    surface:    '#ffffff',
    surfaceAlt: '#f0ecff',
    text:       '#1a0f3c',
    textSec:    '#6b5ca5',
    textMute:   '#a99cc8',
    primary:    '#7c3aed',
    primaryLt:  '#ede9fe',
    primaryDk:  '#5b21b6',
    accent:     '#c026d3',
    border:     '#e4dcff',
    borderLt:   '#f0ecff',
    navBg:      '#ffffff',
    red:        '#dc2626', redBg:   '#fef2f2',
    amber:      '#d97706', amberBg: '#fffbeb',
    green:      '#059669', greenBg: '#ecfdf5',
    blue:       '#0284c7', blueBg:  '#e0f2fe',
    shadow:     '0 4px 24px rgba(124,58,237,0.12)',
    cardShadow: '0 2px 12px rgba(124,58,237,0.08)',
    grad:       'linear-gradient(145deg, #7c3aed 0%, #6d28d9 60%, #5b21b6 100%)',
    gradCard:   'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
  },
  dark: {
    outerBg:    '#0a0714',
    phoneBg:    '#100c22',
    surface:    '#1a163a',
    surfaceAlt: '#221d42',
    text:       '#ede9fe',
    textSec:    '#9d8ec9',
    textMute:   '#4f4575',
    primary:    '#a78bfa',
    primaryLt:  '#2d1f5c',
    primaryDk:  '#7c3aed',
    accent:     '#e879f9',
    border:     '#2a2252',
    borderLt:   '#1e1940',
    navBg:      '#1a163a',
    red:        '#f87171', redBg:   '#3b1111',
    amber:      '#fcd34d', amberBg: '#3b2900',
    green:      '#34d399', greenBg: '#083d2a',
    blue:       '#38bdf8', blueBg:  '#0c2f40',
    shadow:     '0 4px 24px rgba(0,0,0,0.5)',
    cardShadow: '0 2px 12px rgba(0,0,0,0.35)',
    grad:       'linear-gradient(145deg, #7c3aed 0%, #4c1d95 60%, #3b0764 100%)',
    gradCard:   'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)',
  },
};

// ── Sample Data ─────────────────────────────────────────────────────────────
const incidents = [
  { id:1, title:'Checkout Failure Spike', sev:'critical', service:'payment-service', region:'us-east-1', dur:'18 min', metric:'8.3% errors', summary:'Payment SDK v2.4.1 deployed 12 min ago — likely regression', users:2400, revenue:'~$12,000/hr', time:'14:23' },
  { id:2, title:'High Latency · Auth',    sev:'warning',  service:'auth-service',    region:'global',    dur:'34 min', metric:'p99: 2,400ms', summary:'Traffic spike from marketing email correlates with slowdown', users:800, revenue:'~$2,000/hr', time:'13:55' },
  { id:3, title:'Memory Leak · Workers',  sev:'warning',  service:'worker-pool',     region:'us-west-2', dur:'2h 15m', metric:'Memory: 87%', summary:'Gradual heap growth since last night\'s cron schedule change', users:0, revenue:'Low risk', time:'12:08' },
];

const timelineEvents = [
  { id:1, time:'14:23', type:'error',   icon:'AlertCircle',   title:'Error Rate Spike',              desc:'checkout-api hit 8.3% errors (SLO threshold: 1%)',     detail:'8,347 err/min — all StripePaymentException in stack' },
  { id:2, time:'14:22', type:'deploy',  icon:'Package',       title:'Deploy: payment-service v2.4.1', desc:'Released to production by @sarah.chen',               detail:'PR #2847 · Upgrade stripe-android SDK 4.2 → 4.3' },
  { id:3, time:'14:20', type:'flag',    icon:'Flag',          title:'Feature Flag Enabled',           desc:'enable_new_payment_sdk_v2 toggled → true',            detail:'Changed by @sarah.chen via LaunchDarkly' },
  { id:4, time:'14:18', type:'page',    icon:'Bell',          title:'PagerDuty: P1 Alert',            desc:'Checkout error rate exceeded SLO threshold',           detail:'INC-4892 · Assigned to on-call rotation' },
  { id:5, time:'14:15', type:'message', icon:'MessageSquare', title:'Slack: #incidents',              desc:'"Android payment failures in us-east-1"',              detail:'Reported by @liam.dev — 14 reactions' },
  { id:6, time:'14:12', type:'dep',     icon:'GitMerge',      title:'Dependency Auto-merged',         desc:'stripe-android 4.2.0 → 4.3.1 (Renovate bot)',         detail:'PR #2843 · Approved 2 days prior, passed CI' },
  { id:7, time:'14:00', type:'deploy',  icon:'Package',       title:'Deploy: frontend v3.2.0  ✓',    desc:'Released to production by @mike.torres',              detail:'PR #2841 · Checkout UI refresh — no anomalies' },
];

const alerts = [
  { id:1, title:'Checkout Failures',    service:'payment-service', sev:'critical', count:3, time:'2 min ago',  desc:'8.3% error rate · 3 duplicates merged', acked:false },
  { id:2, title:'Elevated p99 Latency', service:'auth-service',    sev:'warning',  count:1, time:'34 min ago', desc:'p99 latency: 2,400ms (SLO: 800ms)',      acked:false },
  { id:3, title:'High Memory Usage',    service:'worker-pool',     sev:'warning',  count:2, time:'2h 15m ago', desc:'87% heap used · gradual 2h increase',    acked:true  },
  { id:4, title:'Deployment Complete',  service:'frontend',        sev:'info',     count:1, time:'23 min ago', desc:'v3.2.0 deployed successfully',             acked:true  },
  { id:5, title:'SSL Cert Expiring',    service:'api-gateway',     sev:'warning',  count:1, time:'1h ago',     desc:'Certificate expires in 14 days',          acked:false },
];

const services = [
  { name:'payment-service', status:'critical', latency:'840ms',   uptime:'98.1%' },
  { name:'auth-service',    status:'warning',  latency:'2,400ms', uptime:'99.2%' },
  { name:'checkout-api',    status:'critical', latency:'1,200ms', uptime:'97.8%' },
  { name:'worker-pool',     status:'warning',  latency:'220ms',   uptime:'99.9%' },
  { name:'frontend',        status:'ok',       latency:'180ms',   uptime:'100%'  },
  { name:'api-gateway',     status:'ok',       latency:'45ms',    uptime:'100%'  },
];

const integrations = [
  { name:'Datadog',    icon:'BarChart2',  status:'connected', detail:'12 monitors active' },
  { name:'PagerDuty',  icon:'Bell',       status:'connected', detail:'On-call schedule synced' },
  { name:'GitHub',     icon:'GitBranch',  status:'connected', detail:'4 repos tracked' },
  { name:'Slack',      icon:'MessageSquare', status:'connected', detail:'#incidents, #deploys' },
  { name:'Sentry',     icon:'Bug',        status:'error',     detail:'Re-auth required' },
  { name:'LaunchDarkly',icon:'Flag',      status:'connected', detail:'32 flags monitored' },
];

// ── Helpers ─────────────────────────────────────────────────────────────────
function LI({ name, size=16, color, style={} }) {
  const C = window.lucide[name];
  if (!C) return null;
  return React.createElement(C, { size, color, style });
}

function sevStyle(sev, t) {
  if (sev === 'critical') return { color:t.red,   bg:t.redBg   };
  if (sev === 'warning')  return { color:t.amber, bg:t.amberBg };
  if (sev === 'info')     return { color:t.blue,  bg:t.blueBg  };
  return { color:t.green, bg:t.greenBg };
}

function evStyle(type, t) {
  if (type === 'error')   return { color:t.red,     bg:t.redBg,    line:'#dc2626' };
  if (type === 'deploy')  return { color:t.blue,    bg:t.blueBg,   line:'#0284c7' };
  if (type === 'flag')    return { color:t.amber,   bg:t.amberBg,  line:'#d97706' };
  if (type === 'dep')     return { color:t.accent,  bg:t.primaryLt,line:t.accent  };
  if (type === 'message') return { color:t.textSec, bg:t.surfaceAlt,line:t.border };
  if (type === 'page')    return { color:t.red,     bg:t.redBg,    line:'#dc2626' };
  return { color:t.primary, bg:t.primaryLt, line:t.primary };
}

// ── Status Bar ──────────────────────────────────────────────────────────────
function StatusBar({ t }) {
  const [time, setTime] = useState(() => {
    const d = new Date(); return d.getHours().toString().padStart(2,'0') + ':' + d.getMinutes().toString().padStart(2,'0');
  });
  useEffect(() => {
    const iv = setInterval(() => {
      const d = new Date(); setTime(d.getHours().toString().padStart(2,'0') + ':' + d.getMinutes().toString().padStart(2,'0'));
    }, 15000);
    return () => clearInterval(iv);
  }, []);
  return React.createElement('div', { style:{ height:52, display:'flex', alignItems:'center', justifyContent:'space-between', padding:'12px 24px 0' } },
    React.createElement('span', { style:{ fontSize:15, fontWeight:700, color:t.text, letterSpacing:'-0.3px' } }, time),
    React.createElement('div', { style:{ display:'flex', gap:5, alignItems:'center' } },
      React.createElement(LI, { name:'Signal', size:13, color:t.text }),
      React.createElement(LI, { name:'Wifi', size:13, color:t.text }),
      React.createElement('div', { style:{ display:'flex', alignItems:'center', gap:2 } },
        React.createElement(LI, { name:'Battery', size:13, color:t.text }),
        React.createElement('span', { style:{ fontSize:11, fontWeight:600, color:t.text } }, '87%'),
      ),
    ),
  );
}

// ── Dynamic Island ──────────────────────────────────────────────────────────
function DynamicIsland() {
  return React.createElement('div', { style:{ position:'absolute', top:10, left:'50%', transform:'translateX(-50%)', width:126, height:34, background:'#000', borderRadius:20, zIndex:100 } });
}

// ══════════════════════════════════════════════════════════════════════════════
// HOME SCREEN
// ══════════════════════════════════════════════════════════════════════════════
function HomeScreen({ t, setActiveTab }) {
  const crit = incidents.filter(i => i.sev === 'critical').length;
  const warn = incidents.filter(i => i.sev === 'warning').length;

  return React.createElement('div', { style:{ paddingBottom:24, animation:'slide-up 0.3s ease' } },
    // Header gradient
    React.createElement('div', { style:{ background:t.grad, padding:'14px 20px 22px', position:'relative', overflow:'hidden' } },
      React.createElement('div', { style:{ position:'absolute', top:-40, right:-30, width:150, height:150, borderRadius:'50%', background:'rgba(255,255,255,0.06)' } }),
      React.createElement('div', { style:{ position:'absolute', bottom:-50, left:-20, width:120, height:120, borderRadius:'50%', background:'rgba(255,255,255,0.04)' } }),
      React.createElement('div', { style:{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16, position:'relative' } },
        React.createElement('div', null,
          React.createElement('div', { style:{ fontSize:11, color:'rgba(255,255,255,0.65)', fontWeight:500, letterSpacing:'1px', textTransform:'uppercase' } }, 'Production · Live'),
          React.createElement('div', { style:{ fontSize:22, fontWeight:800, color:'#fff', marginTop:1, letterSpacing:'-0.5px' } }, 'CodePulse'),
        ),
        React.createElement('div', { style:{ position:'relative' } },
          React.createElement('div', { style:{ width:38, height:38, borderRadius:19, background:'rgba(255,255,255,0.18)', display:'flex', alignItems:'center', justifyContent:'center', animation:'ring-pulse 2s infinite' } },
            React.createElement(LI, { name:'Bell', size:18, color:'#fff' }),
          ),
          React.createElement('div', { style:{ position:'absolute', top:4, right:4, width:10, height:10, borderRadius:5, background:'#f87171', border:'2px solid #7c3aed' } }),
        ),
      ),
      React.createElement('div', { style:{ display:'flex', gap:8, position:'relative' } },
        [['CRITICAL', crit, '🔴'], ['WARNING', warn, '🟡'], ['HEALTHY', 18, '🟢']].map(([label, count, _]) =>
          React.createElement('div', { key:label, style:{ flex:1, background:'rgba(255,255,255,0.14)', borderRadius:12, padding:'10px 10px 8px', backdropFilter:'blur(10px)' } },
            React.createElement('div', { style:{ fontSize:26, fontWeight:800, color:'#fff', lineHeight:1 } }, count),
            React.createElement('div', { style:{ fontSize:10, color:'rgba(255,255,255,0.7)', marginTop:3, fontWeight:500, letterSpacing:'0.5px' } }, label),
          )
        ),
      ),
    ),

    React.createElement('div', { style:{ padding:'14px 16px 0' } },
      // Active incidents label
      React.createElement('div', { style:{ fontSize:11, fontWeight:700, color:t.textSec, letterSpacing:'1px', textTransform:'uppercase', marginBottom:10 } }, 'Active Incidents'),

      // Critical card
      React.createElement('div', {
        style:{ background:t.surface, borderRadius:18, padding:16, marginBottom:10, boxShadow:t.shadow, border:`1.5px solid ${t.border}`, cursor:'pointer' },
        onClick:() => setActiveTab('timeline'),
      },
        React.createElement('div', { style:{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:10 } },
          React.createElement('div', { style:{ flex:1, paddingRight:8 } },
            React.createElement('div', { style:{ display:'flex', alignItems:'center', gap:7, marginBottom:6 } },
              React.createElement('div', { style:{ width:8, height:8, borderRadius:4, background:t.red, animation:'pulse-dot 1.5s ease-in-out infinite' } }),
              React.createElement('span', { style:{ fontSize:10, fontWeight:700, color:t.red, background:t.redBg, padding:'2px 8px', borderRadius:20, letterSpacing:'0.5px' } }, 'CRITICAL'),
              React.createElement('span', { style:{ fontSize:10, color:t.textMute } }, incidents[0].time),
            ),
            React.createElement('div', { style:{ fontSize:16, fontWeight:700, color:t.text, lineHeight:1.3, marginBottom:3 } }, incidents[0].title),
            React.createElement('div', { style:{ fontSize:12, color:t.textSec } }, incidents[0].service + ' · ' + incidents[0].region),
          ),
          React.createElement('div', { style:{ textAlign:'right', flexShrink:0 } },
            React.createElement('div', { style:{ fontSize:18, fontWeight:800, color:t.red, lineHeight:1 } }, '8.3%'),
            React.createElement('div', { style:{ fontSize:10, color:t.textMute, marginTop:2 } }, 'error rate'),
          ),
        ),
        React.createElement('div', { style:{ background:t.primaryLt, borderRadius:10, padding:'8px 12px', marginBottom:12 } },
          React.createElement('div', { style:{ display:'flex', gap:7, alignItems:'flex-start' } },
            React.createElement(LI, { name:'Zap', size:13, color:t.primary, style:{ flexShrink:0, marginTop:1 } }),
            React.createElement('span', { style:{ fontSize:12, color:t.primary, lineHeight:1.45, fontWeight:500 } }, incidents[0].summary),
          ),
        ),
        React.createElement('div', { style:{ display:'flex', justifyContent:'space-between', alignItems:'center' } },
          React.createElement('div', { style:{ display:'flex', gap:14 } },
            React.createElement('div', { style:{ display:'flex', alignItems:'center', gap:4 } },
              React.createElement(LI, { name:'Clock', size:12, color:t.textMute }),
              React.createElement('span', { style:{ fontSize:11, color:t.textMute } }, incidents[0].dur),
            ),
            React.createElement('div', { style:{ display:'flex', alignItems:'center', gap:4 } },
              React.createElement(LI, { name:'Users', size:12, color:t.textMute }),
              React.createElement('span', { style:{ fontSize:11, color:t.textMute } }, incidents[0].users.toLocaleString() + ' affected'),
            ),
            React.createElement('div', { style:{ display:'flex', alignItems:'center', gap:4 } },
              React.createElement(LI, { name:'TrendingDown', size:12, color:t.red }),
              React.createElement('span', { style:{ fontSize:11, color:t.red } }, incidents[0].revenue),
            ),
          ),
          React.createElement('div', { style:{ display:'flex', alignItems:'center', gap:3 } },
            React.createElement('span', { style:{ fontSize:12, fontWeight:600, color:t.primary } }, 'Timeline'),
            React.createElement(LI, { name:'ChevronRight', size:14, color:t.primary }),
          ),
        ),
      ),

      // Warning incident cards
      ...incidents.slice(1).map(inc => {
        const ss = sevStyle(inc.sev, t);
        return React.createElement('div', { key:inc.id,
          style:{ background:t.surface, borderRadius:14, padding:'11px 14px', marginBottom:10, border:`1px solid ${t.border}`, cursor:'pointer', display:'flex', alignItems:'center', gap:12 },
        },
          React.createElement('div', { style:{ width:38, height:38, borderRadius:11, background:ss.bg, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 } },
            React.createElement(LI, { name:'AlertTriangle', size:18, color:ss.color }),
          ),
          React.createElement('div', { style:{ flex:1 } },
            React.createElement('div', { style:{ fontSize:14, fontWeight:600, color:t.text, marginBottom:2 } }, inc.title),
            React.createElement('div', { style:{ fontSize:11, color:t.textSec } }, inc.service + ' · ' + inc.dur),
          ),
          React.createElement('div', { style:{ textAlign:'right', flexShrink:0 } },
            React.createElement('div', { style:{ fontSize:12, fontWeight:700, color:ss.color, marginBottom:2 } }, inc.metric),
            React.createElement('div', { style:{ fontSize:10, color:t.textMute } }, inc.time),
          ),
        );
      }),

      // Service Status
      React.createElement('div', { style:{ marginTop:6 } },
        React.createElement('div', { style:{ fontSize:11, fontWeight:700, color:t.textSec, letterSpacing:'1px', textTransform:'uppercase', marginBottom:10 } }, 'Service Status'),
        React.createElement('div', { style:{ background:t.surface, borderRadius:16, overflow:'hidden', border:`1px solid ${t.border}` } },
          ...services.map((s, i) => {
            const dot = s.status === 'critical' ? t.red : s.status === 'warning' ? t.amber : t.green;
            return React.createElement('div', { key:s.name,
              style:{ display:'flex', alignItems:'center', padding:'9px 14px', borderBottom: i < services.length-1 ? `1px solid ${t.borderLt}` : 'none' },
            },
              React.createElement('div', { style:{ width:8, height:8, borderRadius:4, background:dot, marginRight:10, flexShrink:0, animation: s.status === 'critical' ? 'pulse-dot 1.5s infinite' : 'none' } }),
              React.createElement('span', { style:{ flex:1, fontSize:12, fontWeight:500, color:t.text } }, s.name),
              React.createElement('span', { style:{ fontSize:11, color:t.textSec, marginRight:12, fontVariantNumeric:'tabular-nums' } }, s.latency),
              React.createElement('span', { style:{ fontSize:11, fontWeight:600, color:dot } }, s.uptime),
            );
          })
        ),
      ),
    ),
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// TIMELINE SCREEN
// ══════════════════════════════════════════════════════════════════════════════
function TimelineScreen({ t }) {
  const [expanded, setExpanded] = useState(null);

  return React.createElement('div', { style:{ paddingBottom:24, animation:'slide-up 0.3s ease' } },
    // Incident header
    React.createElement('div', { style:{ background:t.grad, padding:'14px 20px 20px', position:'relative', overflow:'hidden' } },
      React.createElement('div', { style:{ position:'absolute', top:-30, right:-20, width:130, height:130, borderRadius:'50%', background:'rgba(255,255,255,0.05)' } }),
      React.createElement('div', { style:{ display:'flex', alignItems:'center', gap:10, marginBottom:12 } },
        React.createElement('div', { style:{ width:8, height:8, borderRadius:4, background:'#f87171', animation:'pulse-dot 1.5s infinite' } }),
        React.createElement('span', { style:{ fontSize:10, fontWeight:700, color:'rgba(255,255,255,0.8)', letterSpacing:'1px' } }, 'LIVE INCIDENT · INC-4892'),
      ),
      React.createElement('div', { style:{ fontSize:18, fontWeight:800, color:'#fff', marginBottom:4, letterSpacing:'-0.3px' } }, 'Checkout Failure Spike'),
      React.createElement('div', { style:{ fontSize:12, color:'rgba(255,255,255,0.7)', marginBottom:14 } }, 'payment-service · us-east-1 · 18 min active'),
      React.createElement('div', { style:{ background:'rgba(255,255,255,0.12)', borderRadius:12, padding:'10px 14px' } },
        React.createElement('div', { style:{ display:'flex', gap:8, alignItems:'flex-start' } },
          React.createElement(LI, { name:'Brain', size:13, color:'rgba(255,255,255,0.9)', style:{ flexShrink:0, marginTop:1 } }),
          React.createElement('span', { style:{ fontSize:12, color:'rgba(255,255,255,0.9)', lineHeight:1.5, fontWeight:500 } },
            'Probable cause: stripe-android SDK upgrade (4.3.1) deployed 60 sec before error spike. Confidence: 87%. Blast radius: Android clients in us-east-1 only.'
          ),
        ),
      ),
    ),

    // Timeline events
    React.createElement('div', { style:{ padding:'16px 16px 0' } },
      React.createElement('div', { style:{ fontSize:11, fontWeight:700, color:t.textSec, letterSpacing:'1px', textTransform:'uppercase', marginBottom:14 } }, 'Incident Timeline'),
      React.createElement('div', { style:{ position:'relative', paddingLeft:32 } },
        // Vertical line
        React.createElement('div', { style:{ position:'absolute', left:14, top:8, bottom:8, width:2, background:t.border, borderRadius:1 } }),

        ...timelineEvents.map((ev, i) => {
          const es = evStyle(ev.type, t);
          const isExp = expanded === ev.id;
          return React.createElement('div', { key:ev.id, style:{ position:'relative', marginBottom:10, animation:`slide-up 0.3s ease ${i * 0.05}s both` } },
            // Dot on line
            React.createElement('div', { style:{ position:'absolute', left:-25, top:14, width:12, height:12, borderRadius:6, background:es.color, border:`2px solid ${t.phoneBg}`, zIndex:1 } }),
            React.createElement('div', {
              style:{ background:t.surface, borderRadius:14, padding:'11px 14px', border:`1px solid ${t.border}`, cursor:'pointer', transition:'all 0.2s' },
              onClick:() => setExpanded(isExp ? null : ev.id),
            },
              React.createElement('div', { style:{ display:'flex', gap:10, alignItems:'flex-start' } },
                React.createElement('div', { style:{ width:30, height:30, borderRadius:9, background:es.bg, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 } },
                  React.createElement(LI, { name:ev.icon, size:14, color:es.color }),
                ),
                React.createElement('div', { style:{ flex:1 } },
                  React.createElement('div', { style:{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' } },
                    React.createElement('div', { style:{ fontSize:13, fontWeight:700, color:t.text, lineHeight:1.3, flex:1, paddingRight:8 } }, ev.title),
                    React.createElement('div', { style:{ display:'flex', alignItems:'center', gap:4, flexShrink:0 } },
                      React.createElement('span', { style:{ fontSize:11, color:t.textMute, fontVariantNumeric:'tabular-nums' } }, ev.time),
                      React.createElement(LI, { name: isExp ? 'ChevronUp' : 'ChevronDown', size:13, color:t.textMute }),
                    ),
                  ),
                  React.createElement('div', { style:{ fontSize:12, color:t.textSec, marginTop:3, lineHeight:1.4 } }, ev.desc),
                  isExp && React.createElement('div', { style:{ marginTop:8, padding:'8px 10px', background:t.surfaceAlt, borderRadius:8, fontSize:11, color:t.textSec, lineHeight:1.5, borderLeft:`3px solid ${es.color}` } }, ev.detail),
                ),
              ),
            ),
          );
        }),
      ),

      // Action buttons
      React.createElement('div', { style:{ marginTop:16 } },
        React.createElement('div', { style:{ fontSize:11, fontWeight:700, color:t.textSec, letterSpacing:'1px', textTransform:'uppercase', marginBottom:10 } }, 'Suggested Actions'),
        React.createElement('div', { style:{ display:'flex', flexDirection:'column', gap:8 } },
          [
            { icon:'RotateCcw', label:'Rollback payment-service to v2.4.0', color:t.red,     bg:t.redBg   },
            { icon:'Flag',      label:'Disable enable_new_payment_sdk_v2',  color:t.amber,   bg:t.amberBg },
            { icon:'Users',     label:'Page Android team (@android-oncall)', color:t.primary, bg:t.primaryLt },
          ].map(a => React.createElement('div', { key:a.label, style:{ display:'flex', alignItems:'center', gap:12, background:a.bg, borderRadius:12, padding:'11px 14px', cursor:'pointer' } },
            React.createElement(LI, { name:a.icon, size:16, color:a.color }),
            React.createElement('span', { style:{ fontSize:13, fontWeight:600, color:a.color, flex:1 } }, a.label),
            React.createElement(LI, { name:'ChevronRight', size:14, color:a.color }),
          )),
        ),
      ),
    ),
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// ALERTS SCREEN
// ══════════════════════════════════════════════════════════════════════════════
function AlertsScreen({ t }) {
  const [filter, setFilter] = useState('all');
  const [acked, setAcked] = useState({});

  const filters = ['all', 'critical', 'warning', 'info'];
  const visible = alerts.filter(a => filter === 'all' || a.sev === filter);

  return React.createElement('div', { style:{ paddingBottom:24, animation:'slide-up 0.3s ease' } },
    React.createElement('div', { style:{ padding:'16px 16px 0' } },
      React.createElement('div', { style:{ fontSize:20, fontWeight:800, color:t.text, letterSpacing:'-0.5px', marginBottom:4 } }, 'Alert Center'),
      React.createElement('div', { style:{ fontSize:12, color:t.textSec, marginBottom:14 } }, '5 active · 2 require attention'),

      // Dedup notice
      React.createElement('div', { style:{ background:t.primaryLt, borderRadius:12, padding:'10px 14px', display:'flex', gap:9, alignItems:'center', marginBottom:14 } },
        React.createElement(LI, { name:'Layers', size:14, color:t.primary }),
        React.createElement('span', { style:{ fontSize:12, color:t.primary, fontWeight:500 } }, 'Noise reduction active — 3 duplicate alerts merged into 1 card'),
      ),

      // Filter tabs
      React.createElement('div', { style:{ display:'flex', background:t.surfaceAlt, borderRadius:12, padding:4, gap:2, marginBottom:14 } },
        ...filters.map(f => React.createElement('div', { key:f,
          style:{ flex:1, textAlign:'center', padding:'6px 4px', borderRadius:9, fontSize:11, fontWeight:600, cursor:'pointer', transition:'all 0.2s',
            background: filter === f ? t.surface : 'transparent',
            color: filter === f ? t.primary : t.textSec,
            boxShadow: filter === f ? t.cardShadow : 'none',
            textTransform:'capitalize',
          },
          onClick:() => setFilter(f),
        }, f)),
      ),

      // Alert list
      React.createElement('div', { style:{ display:'flex', flexDirection:'column', gap:8 } },
        ...visible.map(a => {
          const ss = sevStyle(a.sev, t);
          const isAcked = acked[a.id];
          const sevLabel = a.sev.toUpperCase();
          const icon = a.sev === 'critical' ? 'AlertCircle' : a.sev === 'warning' ? 'AlertTriangle' : 'Info';
          return React.createElement('div', { key:a.id,
            style:{ background:t.surface, borderRadius:16, padding:14, border:`1px solid ${isAcked ? t.border : ss.bg}`, opacity: isAcked ? 0.7 : 1, transition:'all 0.2s' },
          },
            React.createElement('div', { style:{ display:'flex', gap:12, alignItems:'flex-start' } },
              React.createElement('div', { style:{ width:38, height:38, borderRadius:11, background:ss.bg, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, position:'relative' } },
                React.createElement(LI, { name:icon, size:18, color:ss.color }),
                a.count > 1 && React.createElement('div', { style:{ position:'absolute', top:-5, right:-5, width:16, height:16, borderRadius:8, background:ss.color, display:'flex', alignItems:'center', justifyContent:'center' } },
                  React.createElement('span', { style:{ fontSize:9, fontWeight:700, color:'#fff' } }, a.count),
                ),
              ),
              React.createElement('div', { style:{ flex:1 } },
                React.createElement('div', { style:{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:3 } },
                  React.createElement('div', { style:{ fontSize:14, fontWeight:700, color:t.text, lineHeight:1.2 } }, a.title),
                  React.createElement('span', { style:{ fontSize:10, color:t.textMute, flexShrink:0, marginLeft:8 } }, a.time),
                ),
                React.createElement('div', { style:{ fontSize:11, color:t.textSec, marginBottom:8 } }, a.service + ' · ' + a.desc),
                React.createElement('div', { style:{ display:'flex', gap:8 } },
                  !isAcked && React.createElement('div', {
                    style:{ fontSize:11, fontWeight:600, color:t.primary, background:t.primaryLt, borderRadius:8, padding:'4px 10px', cursor:'pointer' },
                    onClick:() => setAcked(prev => ({ ...prev, [a.id]: true })),
                  }, 'Acknowledge'),
                  React.createElement('div', { style:{ fontSize:11, fontWeight:600, color:t.textSec, background:t.surfaceAlt, borderRadius:8, padding:'4px 10px', cursor:'pointer' } }, 'View Logs'),
                ),
              ),
            ),
          );
        }),
      ),
    ),
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// INSIGHTS SCREEN
// ══════════════════════════════════════════════════════════════════════════════
function InsightsScreen({ t }) {
  const [activeSection, setActiveSection] = useState('rootcause');
  const sections = ['rootcause', 'blast', 'runbooks'];
  const sectionLabels = { rootcause:'Root Cause', blast:'Blast Radius', runbooks:'Runbooks' };

  return React.createElement('div', { style:{ paddingBottom:24, animation:'slide-up 0.3s ease' } },
    React.createElement('div', { style:{ padding:'16px 16px 0' } },
      React.createElement('div', { style:{ fontSize:20, fontWeight:800, color:t.text, letterSpacing:'-0.5px', marginBottom:4 } }, 'AI Insights'),
      React.createElement('div', { style:{ fontSize:12, color:t.textSec, marginBottom:14 } }, 'Analysing: Checkout Failure Spike · INC-4892'),

      // Section tabs
      React.createElement('div', { style:{ display:'flex', background:t.surfaceAlt, borderRadius:12, padding:4, gap:2, marginBottom:16 } },
        ...sections.map(s => React.createElement('div', { key:s,
          style:{ flex:1, textAlign:'center', padding:'6px 2px', borderRadius:9, fontSize:10, fontWeight:700, cursor:'pointer', transition:'all 0.2s',
            background: activeSection === s ? t.surface : 'transparent',
            color: activeSection === s ? t.primary : t.textSec,
            boxShadow: activeSection === s ? t.cardShadow : 'none',
          },
          onClick:() => setActiveSection(s),
        }, sectionLabels[s])),
      ),

      // Root Cause section
      activeSection === 'rootcause' && React.createElement('div', null,
        // Probable cause card
        React.createElement('div', { style:{ background:t.gradCard, borderRadius:18, padding:16, marginBottom:12 } },
          React.createElement('div', { style:{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:10 } },
            React.createElement('div', null,
              React.createElement('div', { style:{ fontSize:10, fontWeight:700, color:'rgba(255,255,255,0.7)', letterSpacing:'1px', marginBottom:4 } }, 'PROBABLE CAUSE'),
              React.createElement('div', { style:{ fontSize:16, fontWeight:700, color:'#fff', lineHeight:1.3 } }, 'payment-service v2.4.1'),
              React.createElement('div', { style:{ fontSize:12, color:'rgba(255,255,255,0.75)', marginTop:2 } }, 'stripe-android 4.2 → 4.3 regression'),
            ),
            React.createElement('div', { style:{ background:'rgba(255,255,255,0.15)', borderRadius:12, padding:'6px 12px', textAlign:'center' } },
              React.createElement('div', { style:{ fontSize:22, fontWeight:800, color:'#fff' } }, '87%'),
              React.createElement('div', { style:{ fontSize:9, color:'rgba(255,255,255,0.7)' } }, 'confidence'),
            ),
          ),
          React.createElement('div', { style:{ display:'flex', gap:8 } },
            React.createElement('div', { style:{ flex:1, background:'rgba(255,255,255,0.12)', borderRadius:10, padding:'8px 10px', textAlign:'center' } },
              React.createElement('div', { style:{ fontSize:15, fontWeight:700, color:'#fff' } }, '60s'),
              React.createElement('div', { style:{ fontSize:9, color:'rgba(255,255,255,0.65)' } }, 'deploy → spike'),
            ),
            React.createElement('div', { style:{ flex:1, background:'rgba(255,255,255,0.12)', borderRadius:10, padding:'8px 10px', textAlign:'center' } },
              React.createElement('div', { style:{ fontSize:15, fontWeight:700, color:'#fff' } }, '100%'),
              React.createElement('div', { style:{ fontSize:9, color:'rgba(255,255,255,0.65)' } }, 'errors match'),
            ),
            React.createElement('div', { style:{ flex:1, background:'rgba(255,255,255,0.12)', borderRadius:10, padding:'8px 10px', textAlign:'center' } },
              React.createElement('div', { style:{ fontSize:15, fontWeight:700, color:'#fff' } }, '1'),
              React.createElement('div', { style:{ fontSize:9, color:'rgba(255,255,255,0.65)' } }, 'causal event'),
            ),
          ),
        ),
        // Evidence list
        React.createElement('div', { style:{ background:t.surface, borderRadius:16, border:`1px solid ${t.border}`, overflow:'hidden' } },
          React.createElement('div', { style:{ padding:'12px 14px', borderBottom:`1px solid ${t.borderLt}` } },
            React.createElement('div', { style:{ fontSize:12, fontWeight:700, color:t.textSec, letterSpacing:'0.5px' } }, 'EVIDENCE'),
          ),
          ...[
            { e:'Error spike began exactly 60s after payment-service v2.4.1 deploy', c:t.green },
            { e:'All 8,347 errors contain StripePaymentException in stack trace', c:t.green },
            { e:'Only affects Android clients — iOS payments running normally', c:t.green },
            { e:'Scoped to us-east-1 region where deploy rolled out first', c:t.amber },
            { e:'stripe-android 4.3.1 has known breaking change in payment flow', c:t.green },
          ].map((item, i) => React.createElement('div', { key:i, style:{ display:'flex', gap:10, padding:'10px 14px', borderBottom: i < 4 ? `1px solid ${t.borderLt}` : 'none', alignItems:'flex-start' } },
            React.createElement(LI, { name: item.c === t.amber ? 'AlertTriangle' : 'CheckCircle', size:14, color:item.c, style:{ flexShrink:0, marginTop:1 } }),
            React.createElement('span', { style:{ fontSize:12, color:t.text, lineHeight:1.45 } }, item.e),
          )),
        ),
      ),

      // Blast Radius section
      activeSection === 'blast' && React.createElement('div', null,
        React.createElement('div', { style:{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:12 } },
          ...[
            { label:'Affected Users',    value:'~2,400',    sub:'of 128k total', icon:'Users',       color:t.red   },
            { label:'Revenue Impact',    value:'$12k/hr',   sub:'est. ongoing',  icon:'TrendingDown', color:t.red   },
            { label:'Services at Risk',  value:'3',         sub:'dependent svcs',icon:'Layers',      color:t.amber },
            { label:'Error Duration',    value:'18 min',    sub:'still active',  icon:'Clock',       color:t.amber },
          ].map(m => React.createElement('div', { key:m.label, style:{ background:t.surface, borderRadius:16, padding:14, border:`1px solid ${t.border}` } },
            React.createElement('div', { style:{ width:32, height:32, borderRadius:9, background: m.color === t.red ? t.redBg : t.amberBg, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:8 } },
              React.createElement(LI, { name:m.icon, size:16, color:m.color }),
            ),
            React.createElement('div', { style:{ fontSize:20, fontWeight:800, color:t.text, lineHeight:1 } }, m.value),
            React.createElement('div', { style:{ fontSize:11, fontWeight:600, color:t.textSec, marginTop:3 } }, m.label),
            React.createElement('div', { style:{ fontSize:10, color:t.textMute } }, m.sub),
          )),
        ),
        React.createElement('div', { style:{ background:t.surface, borderRadius:16, padding:14, border:`1px solid ${t.border}` } },
          React.createElement('div', { style:{ fontSize:12, fontWeight:700, color:t.textSec, letterSpacing:'0.5px', marginBottom:12 } }, 'AFFECTED SEGMENTS'),
          ...[
            { label:'Android users · us-east-1', pct:100, color:t.red   },
            { label:'Android users · eu-west-1', pct:0,   color:t.green },
            { label:'iOS users (all regions)',   pct:0,   color:t.green },
            { label:'Web checkout (all)',        pct:0,   color:t.green },
          ].map((seg, i) => React.createElement('div', { key:i, style:{ marginBottom: i < 3 ? 10 : 0 } },
            React.createElement('div', { style:{ display:'flex', justifyContent:'space-between', marginBottom:4 } },
              React.createElement('span', { style:{ fontSize:12, color:t.text } }, seg.label),
              React.createElement('span', { style:{ fontSize:12, fontWeight:700, color:seg.color } }, seg.pct + '%'),
            ),
            React.createElement('div', { style:{ height:6, background:t.border, borderRadius:3, overflow:'hidden' } },
              React.createElement('div', { style:{ height:'100%', width:seg.pct + '%', background:seg.color, borderRadius:3 } }),
            ),
          )),
        ),
      ),

      // Runbooks section
      activeSection === 'runbooks' && React.createElement('div', null,
        React.createElement('div', { style:{ display:'flex', flexDirection:'column', gap:10 } },
          ...[
            { title:'Payment Service Rollback Procedure', tag:'Rollback', icon:'RotateCcw', time:'~5 min', relevance:'Directly relevant' },
            { title:'SDK Upgrade Incident Runbook',        tag:'SDK',      icon:'Package',  time:'~8 min', relevance:'Highly relevant'   },
            { title:'Feature Flag Emergency Disable',      tag:'Flags',   icon:'Flag',     time:'~2 min', relevance:'Directly relevant' },
            { title:'On-Call Escalation Protocol',         tag:'Escalate',icon:'Users',    time:'~3 min', relevance:'If needed'          },
          ].map((r, i) => React.createElement('div', { key:i,
            style:{ background:t.surface, borderRadius:16, padding:14, border:`1px solid ${t.border}`, cursor:'pointer' },
          },
            React.createElement('div', { style:{ display:'flex', gap:12, alignItems:'center' } },
              React.createElement('div', { style:{ width:36, height:36, borderRadius:10, background:t.primaryLt, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 } },
                React.createElement(LI, { name:r.icon, size:17, color:t.primary }),
              ),
              React.createElement('div', { style:{ flex:1 } },
                React.createElement('div', { style:{ fontSize:13, fontWeight:700, color:t.text, marginBottom:2 } }, r.title),
                React.createElement('div', { style:{ display:'flex', gap:8, alignItems:'center' } },
                  React.createElement('span', { style:{ fontSize:10, background:t.primaryLt, color:t.primary, padding:'2px 7px', borderRadius:20, fontWeight:600 } }, r.tag),
                  React.createElement('span', { style:{ fontSize:10, color:t.textMute } }, r.time),
                  React.createElement('span', { style:{ fontSize:10, color:t.green } }, r.relevance),
                ),
              ),
              React.createElement(LI, { name:'ExternalLink', size:14, color:t.textMute }),
            ),
          )),
        ),
      ),
    ),
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// SETTINGS SCREEN
// ══════════════════════════════════════════════════════════════════════════════
function SettingsScreen({ t, theme, setTheme }) {
  const [notifOn, setNotifOn] = useState(true);
  const [smartFilter, setSmartFilter] = useState(true);

  function Toggle({ val, onChange }) {
    return React.createElement('div', {
      style:{ width:44, height:26, borderRadius:13, background: val ? t.primary : t.border, cursor:'pointer', position:'relative', transition:'background 0.2s' },
      onClick:() => onChange(!val),
    },
      React.createElement('div', { style:{ position:'absolute', top:3, left: val ? 21 : 3, width:20, height:20, borderRadius:10, background:'#fff', transition:'left 0.2s', boxShadow:'0 1px 4px rgba(0,0,0,0.2)' } }),
    );
  }

  return React.createElement('div', { style:{ paddingBottom:24, animation:'slide-up 0.3s ease' } },
    // Profile card
    React.createElement('div', { style:{ background:t.grad, padding:'16px 20px 20px', position:'relative', overflow:'hidden' } },
      React.createElement('div', { style:{ position:'absolute', top:-30, right:-20, width:120, height:120, borderRadius:'50%', background:'rgba(255,255,255,0.06)' } }),
      React.createElement('div', { style:{ display:'flex', alignItems:'center', gap:14 } },
        React.createElement('div', { style:{ width:52, height:52, borderRadius:26, background:'rgba(255,255,255,0.2)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:20 } }, '👨‍💻'),
        React.createElement('div', { style:{ flex:1 } },
          React.createElement('div', { style:{ fontSize:17, fontWeight:700, color:'#fff' } }, 'Alex Sharma'),
          React.createElement('div', { style:{ fontSize:12, color:'rgba(255,255,255,0.75)' } }, 'Senior Platform Engineer'),
        ),
        React.createElement('div', { style:{ textAlign:'right' } },
          React.createElement('div', { style:{ fontSize:10, color:'rgba(255,255,255,0.7)', marginBottom:2 } }, 'ON-CALL'),
          React.createElement('div', { style:{ fontSize:13, fontWeight:700, color:'#fff' } }, 'Ends in 3h 42m'),
        ),
      ),
    ),

    React.createElement('div', { style:{ padding:'14px 16px 0' } },
      // Theme toggle
      React.createElement('div', { style:{ background:t.surface, borderRadius:16, border:`1px solid ${t.border}`, overflow:'hidden', marginBottom:12 } },
        React.createElement('div', { style:{ padding:'12px 14px', borderBottom:`1px solid ${t.borderLt}` } },
          React.createElement('span', { style:{ fontSize:11, fontWeight:700, color:t.textSec, letterSpacing:'1px' } }, 'APPEARANCE'),
        ),
        React.createElement('div', { style:{ padding:'12px 14px', display:'flex', alignItems:'center', gap:12 } },
          React.createElement('div', { style:{ width:34, height:34, borderRadius:10, background:t.primaryLt, display:'flex', alignItems:'center', justifyContent:'center' } },
            React.createElement(LI, { name: theme === 'light' ? 'Sun' : 'Moon', size:17, color:t.primary }),
          ),
          React.createElement('div', { style:{ flex:1 } },
            React.createElement('div', { style:{ fontSize:14, fontWeight:600, color:t.text } }, theme === 'light' ? 'Light Mode' : 'Dark Mode'),
            React.createElement('div', { style:{ fontSize:11, color:t.textSec } }, 'Toggle appearance'),
          ),
          React.createElement('div', { style:{ display:'flex', gap:6 } },
            ...[
              { id:'light', icon:'Sun' },
              { id:'dark', icon:'Moon' },
            ].map(opt => React.createElement('div', { key:opt.id,
              style:{ width:36, height:36, borderRadius:10, background: theme === opt.id ? t.primary : t.surfaceAlt, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', transition:'all 0.2s' },
              onClick:() => setTheme(opt.id),
            },
              React.createElement(LI, { name:opt.icon, size:16, color: theme === opt.id ? '#fff' : t.textSec }),
            )),
          ),
        ),
      ),

      // Notifications
      React.createElement('div', { style:{ background:t.surface, borderRadius:16, border:`1px solid ${t.border}`, overflow:'hidden', marginBottom:12 } },
        React.createElement('div', { style:{ padding:'12px 14px', borderBottom:`1px solid ${t.borderLt}` } },
          React.createElement('span', { style:{ fontSize:11, fontWeight:700, color:t.textSec, letterSpacing:'1px' } }, 'NOTIFICATIONS'),
        ),
        ...[
          { label:'Push Notifications', sub:'Critical & warning alerts', val:notifOn, fn:setNotifOn },
          { label:'Smart Noise Filter', sub:'Merge duplicate alerts', val:smartFilter, fn:setSmartFilter },
        ].map((item, i) => React.createElement('div', { key:i, style:{ padding:'12px 14px', display:'flex', alignItems:'center', gap:12, borderBottom: i === 0 ? `1px solid ${t.borderLt}` : 'none' } },
          React.createElement('div', { style:{ flex:1 } },
            React.createElement('div', { style:{ fontSize:14, fontWeight:600, color:t.text } }, item.label),
            React.createElement('div', { style:{ fontSize:11, color:t.textSec } }, item.sub),
          ),
          React.createElement(Toggle, { val:item.val, onChange:item.fn }),
        )),
      ),

      // Integrations
      React.createElement('div', { style:{ background:t.surface, borderRadius:16, border:`1px solid ${t.border}`, overflow:'hidden', marginBottom:12 } },
        React.createElement('div', { style:{ padding:'12px 14px', borderBottom:`1px solid ${t.borderLt}` } },
          React.createElement('span', { style:{ fontSize:11, fontWeight:700, color:t.textSec, letterSpacing:'1px' } }, 'INTEGRATIONS'),
        ),
        ...integrations.map((intg, i) => React.createElement('div', { key:intg.name,
          style:{ padding:'10px 14px', display:'flex', alignItems:'center', gap:12, borderBottom: i < integrations.length-1 ? `1px solid ${t.borderLt}` : 'none' },
        },
          React.createElement('div', { style:{ width:32, height:32, borderRadius:9, background: intg.status === 'error' ? t.redBg : t.greenBg, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 } },
            React.createElement(LI, { name:intg.icon, size:15, color: intg.status === 'error' ? t.red : t.green }),
          ),
          React.createElement('div', { style:{ flex:1 } },
            React.createElement('div', { style:{ fontSize:13, fontWeight:600, color:t.text } }, intg.name),
            React.createElement('div', { style:{ fontSize:11, color:t.textSec } }, intg.detail),
          ),
          React.createElement('span', { style:{ fontSize:10, fontWeight:600, color: intg.status === 'error' ? t.red : t.green, background: intg.status === 'error' ? t.redBg : t.greenBg, padding:'3px 8px', borderRadius:20 } },
            intg.status === 'error' ? 'Error' : 'Connected',
          ),
        )),
      ),

      // App info
      React.createElement('div', { style:{ textAlign:'center', paddingTop:4 } },
        React.createElement('div', { style:{ fontSize:12, color:t.textMute } }, 'CodePulse v1.0.0 · Built with  for on-call heroes'),
      ),
    ),
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// APP ROOT
// ══════════════════════════════════════════════════════════════════════════════
function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [theme, setTheme] = useState('light');
  const t = themes[theme];

  const tabs = [
    { id:'home',     label:'Home',     icon: window.lucide.Home         },
    { id:'timeline', label:'Timeline', icon: window.lucide.Activity     },
    { id:'alerts',   label:'Alerts',   icon: window.lucide.Bell         },
    { id:'insights', label:'Insights', icon: window.lucide.Zap          },
    { id:'settings', label:'Settings', icon: window.lucide.Settings     },
  ];

  const screens = {
    home:     () => React.createElement(HomeScreen,     { t, setActiveTab }),
    timeline: () => React.createElement(TimelineScreen, { t }),
    alerts:   () => React.createElement(AlertsScreen,   { t }),
    insights: () => React.createElement(InsightsScreen, { t }),
    settings: () => React.createElement(SettingsScreen, { t, theme, setTheme }),
  };

  return React.createElement('div', {
    style:{ background: t.outerBg, minHeight:'100vh', display:'flex', justifyContent:'center', alignItems:'center', padding:24, fontFamily:"'Space Grotesk', sans-serif", transition:'background 0.3s' }
  },
    React.createElement('div', {
      style:{
        width:375, height:812,
        background: t.phoneBg,
        borderRadius:52,
        overflow:'hidden',
        position:'relative',
        boxShadow:'0 40px 100px rgba(0,0,0,0.35), 0 0 0 10px #1a1a1a, 0 0 0 11px #2a2a2a, 0 0 0 13px rgba(255,255,255,0.05)',
        display:'flex',
        flexDirection:'column',
        transition:'background 0.3s',
      }
    },
      React.createElement(DynamicIsland),
      React.createElement(StatusBar, { t }),

      // Main content area
      React.createElement('div', {
        style:{ flex:1, overflowY:'auto', overflowX:'hidden', msOverflowStyle:'none', scrollbarWidth:'none' }
      },
        React.createElement(screens[activeTab]),
      ),

      // Bottom nav
      React.createElement('div', {
        style:{ height:70, background:t.navBg, borderTop:`1px solid ${t.border}`, display:'flex', alignItems:'center', justifyContent:'space-around', padding:'0 4px 6px', flexShrink:0, transition:'background 0.3s, border-color 0.3s' }
      },
        ...tabs.map(tab => {
          const active = activeTab === tab.id;
          const hasAlert = tab.id === 'alerts' && alerts.some(a => !a.acked && a.sev === 'critical');
          return React.createElement('div', {
            key: tab.id,
            onClick: () => setActiveTab(tab.id),
            style:{ display:'flex', flexDirection:'column', alignItems:'center', gap:3, padding:'6px 10px', cursor:'pointer', borderRadius:14, flex:1, position:'relative', transition:'all 0.2s', background: active ? t.primaryLt : 'transparent' }
          },
            React.createElement('div', { style:{ position:'relative' } },
              React.createElement(tab.icon, { size:22, color: active ? t.primary : t.textMute }),
              hasAlert && React.createElement('div', { style:{ position:'absolute', top:-2, right:-3, width:7, height:7, borderRadius:4, background:t.red } }),
            ),
            React.createElement('span', { style:{ fontSize:10, fontWeight: active ? 700 : 500, color: active ? t.primary : t.textMute, letterSpacing:'0.3px', transition:'color 0.2s' } }, tab.label),
          );
        }),
      ),
    ),
  );
}
