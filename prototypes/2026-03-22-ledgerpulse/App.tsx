const { useState, useEffect, useRef } = React;

// ─── Theme System ──────────────────────────────────────────────────────────────
const themes = {
  dark: {
    bg: '#08101F', surface: '#0F1A2E', card: '#162035', cardAlt: '#1A2844',
    primary: '#00E5C3', primaryDim: 'rgba(0,229,195,0.12)', primaryGlow: 'rgba(0,229,195,0.25)',
    secondary: '#7C6FF7', secondaryDim: 'rgba(124,111,247,0.12)',
    danger: '#FF5E7D', dangerDim: 'rgba(255,94,125,0.12)',
    warning: '#FFB547', warningDim: 'rgba(255,181,71,0.12)',
    text: '#E8F0FF', textMuted: '#3A5070', textSub: '#7A90B8',
    border: 'rgba(255,255,255,0.07)', navBg: '#0A1525',
  },
  light: {
    bg: '#EEF3FF', surface: '#FFFFFF', card: '#FFFFFF', cardAlt: '#F0F5FF',
    primary: '#00A882', primaryDim: 'rgba(0,168,130,0.1)', primaryGlow: 'rgba(0,168,130,0.2)',
    secondary: '#6357E8', secondaryDim: 'rgba(99,87,232,0.1)',
    danger: '#E0365A', dangerDim: 'rgba(224,54,90,0.1)',
    warning: '#C07A10', warningDim: 'rgba(192,122,16,0.1)',
    text: '#0C1829', textMuted: '#A0AEC0', textSub: '#5A6A85',
    border: 'rgba(0,0,0,0.07)', navBg: '#FFFFFF',
  }
};

// ─── Mock Data ────────────────────────────────────────────────────────────────
const cashFlowData = [47500,44200,44200,41800,47200,47200,45800,43200,43200,55600,55600,53100,50800,50800,48200,28700,28700,42900,42900,42900,40200,38100,38100,47500,47500,45800,43200,41500,39800,39800];
const clients = [
  { id:1, name:'Downtown Deli Co.', amount:3200, due:'Mar 25', pct:90, status:'On track', av:'DD' },
  { id:2, name:'Metro Catering Co.', amount:12400, due:'Mar 27', pct:78, status:'On track', av:'MC' },
  { id:3, name:'Sunrise Bakery Chain', amount:8750, due:'Mar 29', pct:62, status:'Watch', av:'SB' },
  { id:4, name:'Fresh Fields Market', amount:15200, due:'Apr 2', pct:45, status:'At risk', av:'FF' },
  { id:5, name:'City Events LLC', amount:6800, due:'Mar 18', pct:28, status:'Overdue', av:'CE' },
];
const bills = [
  { name:'Office Rent', amount:8500, dueIn:3, status:'ready' },
  { name:'FlourMill Pro', amount:4200, dueIn:7, status:'defer' },
  { name:'Payroll', amount:22000, dueIn:12, status:'risk' },
  { name:'Equipment Lease', amount:1800, dueIn:15, status:'ready' },
  { name:'Marketing Retainer', amount:2400, dueIn:19, status:'ready' },
];
const alerts = [
  { id:1, type:'danger', icon:'AlertTriangle', title:'Payroll gap risk', desc:'Payroll ($22K) due in 12 days but 2 invoices likely delayed.', action:'View plan' },
  { id:2, type:'warning', icon:'Clock', title:'Rent due in 3 days', desc:'$8,500 — Sufficient funds available today.', action:'Mark ready' },
  { id:3, type:'warning', icon:'TrendingDown', title:'Fresh Fields delay likely', desc:'$15,200 invoice has a 55% chance of late payment.', action:'Send nudge' },
];
const actionItems = [
  { id:1, priority:'urgent', cat:'collect', icon:'Send', title:'Nudge City Events LLC', desc:'Invoice #1079 is 4 days overdue. A firm follow-up can unlock $6,800 immediately.', impact:'+$6,800', impactVal:6800 },
  { id:2, priority:'high', cat:'defer', icon:'Calendar', title:'Defer FlourMill 7 days', desc:'Moves $4,200 past payroll — keeps your buffer intact without late fees.', impact:'$4,200 buffer', impactVal:0 },
  { id:3, priority:'high', cat:'split', icon:'Scissors', title:'Partial from Fresh Fields', desc:'Request $7,600 upfront (50%) on Invoice #1082 to bridge the payroll gap.', impact:'+$7,600 early', impactVal:7600 },
  { id:4, priority:'medium', cat:'collect', icon:'Zap', title:'Accelerate Invoice #1087', desc:'Offer Metro Catering a 2% early-pay discount for immediate settlement.', impact:'+$12,152 early', impactVal:12152 },
  { id:5, priority:'low', cat:'defer', icon:'PauseCircle', title:'Pause equipment upgrade', desc:'Deferring $3,800 adds 7 runway days and keeps cash above your threshold.', impact:'+7 runway days', impactVal:0 },
];
const scenarios = [
  { id:'hire', label:'Hire a contractor', detail:'$8,500/mo added expense', cashImpact:-8500, runwayImpact:-7, color:'danger' },
  { id:'lose', label:'Lose Fresh Fields', detail:'$15,200 revenue gone', cashImpact:-15200, runwayImpact:-12, color:'danger' },
  { id:'early', label:'All clients pay early', detail:'$28,350 in sooner', cashImpact:28350, runwayImpact:+9, color:'primary' },
  { id:'equip', label:'Buy equipment now', detail:'$12,000 capital spend', cashImpact:-12000, runwayImpact:-10, color:'warning' },
];

const fmt = (n) => n >= 1000 ? `$${(n/1000).toFixed(1)}K` : `$${n}`;
const likColor = (pct, t) => pct >= 75 ? t.primary : pct >= 50 ? t.warning : t.danger;
const likDim = (pct, t) => pct >= 75 ? t.primaryDim : pct >= 50 ? t.warningDim : t.dangerDim;

// ─── CashFlowChart ────────────────────────────────────────────────────────────
function CashFlowChart({ t, compact }) {
  const w = compact ? 335 : 335, h = compact ? 120 : 160;
  const pl = 8, pr = 8, pt = 10, pb = compact ? 12 : 20;
  const data = cashFlowData;
  const mn = Math.min(...data), mx = Math.max(...data), rng = mx - mn || 1;
  const tx = (i) => pl + (i / (data.length - 1)) * (w - pl - pr);
  const ty = (v) => pt + (1 - (v - mn) / rng) * (h - pt - pb);
  const pts = data.map((v, i) => [tx(i), ty(v)]);
  const linePath = pts.map((p,i) => `${i===0?'M':'L'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ');
  const areaPath = linePath + ` L${tx(data.length-1).toFixed(1)},${h-pb} L${pl},${h-pb} Z`;
  const dangerX = tx(15);
  const safeThreshold = ty(35000);

  return (
    <svg width={w} height={h} style={{ display:'block' }}>
      <defs>
        <linearGradient id="lpGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={t.primary} stopOpacity={0.3}/>
          <stop offset="100%" stopColor={t.primary} stopOpacity={0}/>
        </linearGradient>
        <linearGradient id="lpDanger" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={t.danger} stopOpacity={0.15}/>
          <stop offset="100%" stopColor={t.danger} stopOpacity={0}/>
        </linearGradient>
      </defs>
      <rect x={dangerX-18} y={pt} width={36} height={h-pt-pb} fill="rgba(255,94,125,0.07)" rx={4}/>
      {[0.25,0.5,0.75].map((f,i)=>(
        <line key={i} x1={pl} y1={pt+f*(h-pt-pb)} x2={w-pr} y2={pt+f*(h-pt-pb)} stroke={t.border} strokeWidth={1}/>
      ))}
      <path d={areaPath} fill="url(#lpGrad)"/>
      <path d={linePath} fill="none" stroke={t.primary} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx={tx(0)} cy={ty(data[0])} r={4} fill={t.primary}/>
      <circle cx={tx(0)} cy={ty(data[0])} r={7} fill={t.primary} opacity={0.2}/>
      <circle cx={dangerX} cy={ty(data[15])} r={4} fill={t.danger}/>
      <circle cx={dangerX} cy={ty(data[15])} r={7} fill={t.danger} opacity={0.2}/>
    </svg>
  );
}

// ─── StatusBar ────────────────────────────────────────────────────────────────
function StatusBar({ t }) {
  const now = new Date();
  const time = `${now.getHours()}:${String(now.getMinutes()).padStart(2,'0')}`;
  const W = window.lucide?.Wifi, B = window.lucide?.BatteryMedium;
  return (
    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'10px 24px 0', height:44, flexShrink:0 }}>
      <span style={{ fontSize:14, fontWeight:700, color:t.text }}>{time}</span>
      <div style={{ display:'flex', alignItems:'center', gap:6 }}>
        {W && <W size={13} color={t.textSub}/>}
        <span style={{ fontSize:11, color:t.textSub, fontWeight:600 }}>87%</span>
        {B && <B size={14} color={t.textSub}/>}
      </div>
    </div>
  );
}

// ─── HomeScreen ───────────────────────────────────────────────────────────────
function HomeScreen({ t, onNav }) {
  const Tu = window.lucide?.TrendingUp, Td = window.lucide?.TrendingDown;
  const Ar = window.lucide?.ArrowRight, Z = window.lucide?.Zap;
  const At = window.lucide?.AlertTriangle, Cl = window.lucide?.Clock, Tr = window.lucide?.TrendingDown;
  const iconMap = { AlertTriangle: At, Clock: Cl, TrendingDown: Tr };
  const [pressedAlert, setPressedAlert] = useState(null);
  const [pressedAction, setPressedAction] = useState(false);
  const runway = 23, runwayPct = (runway/90)*100;
  const runwayClr = runway < 15 ? t.danger : runway < 30 ? t.warning : t.primary;

  return (
    <div style={{ padding:'4px 20px 20px' }}>
      <div style={{ marginBottom:20 }}>
        <div style={{ fontSize:11, color:t.textSub, fontWeight:600, letterSpacing:0.5, marginBottom:4 }}>GOOD MORNING, SARAH</div>
        <div style={{ fontSize:26, fontWeight:800, color:t.text, letterSpacing:-0.5 }}>Cash Overview</div>
      </div>

      {/* Main cash card */}
      <div style={{ background:`linear-gradient(135deg, ${t.primary}18, ${t.secondary}18)`, border:`1px solid ${t.primary}30`, borderRadius:24, padding:'20px 20px 18px', marginBottom:14 }}>
        <div style={{ fontSize:11, color:t.textSub, fontWeight:600, letterSpacing:0.3 }}>CURRENT POSITION</div>
        <div style={{ fontSize:40, fontWeight:900, color:t.text, letterSpacing:-1.5, lineHeight:1.1, marginTop:4 }}>$47,500</div>
        <div style={{ marginTop:16 }}>
          <div style={{ display:'flex', justifyContent:'space-between', marginBottom:7 }}>
            <span style={{ fontSize:11, color:t.textSub, fontWeight:600 }}>Cash Runway</span>
            <span style={{ fontSize:11, fontWeight:800, color:runwayClr }}>{runway} days remaining</span>
          </div>
          <div style={{ background:`${t.border}`, borderRadius:99, height:7 }}>
            <div style={{ width:`${runwayPct}%`, height:'100%', borderRadius:99, background:`linear-gradient(90deg,${runwayClr},${t.primary})`, transition:'width 1s ease' }}/>
          </div>
        </div>
        <div style={{ display:'flex', gap:10, marginTop:16 }}>
          <div style={{ flex:1, background:t.primaryDim, borderRadius:14, padding:'10px 12px', border:`1px solid ${t.primary}20` }}>
            <div style={{ display:'flex', alignItems:'center', gap:5, marginBottom:5 }}>
              {Tu && <Tu size={12} color={t.primary}/>}
              <span style={{ fontSize:10, color:t.textSub, fontWeight:600 }}>INCOMING</span>
            </div>
            <div style={{ fontSize:17, fontWeight:800, color:t.primary }}>$83.2K</div>
          </div>
          <div style={{ flex:1, background:t.dangerDim, borderRadius:14, padding:'10px 12px', border:`1px solid ${t.danger}20` }}>
            <div style={{ display:'flex', alignItems:'center', gap:5, marginBottom:5 }}>
              {Td && <Td size={12} color={t.danger}/>}
              <span style={{ fontSize:10, color:t.textSub, fontWeight:600 }}>OUTGOING</span>
            </div>
            <div style={{ fontSize:17, fontWeight:800, color:t.danger }}>$91.4K</div>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div style={{ background:t.card, borderRadius:20, padding:'14px 16px 10px', marginBottom:14, border:`1px solid ${t.border}` }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10 }}>
          <div style={{ fontSize:13, fontWeight:700, color:t.text }}>30-Day Forecast</div>
          <div style={{ fontSize:10, fontWeight:700, color:t.danger, background:t.dangerDim, padding:'3px 8px', borderRadius:6 }}>⚠ Gap at day 16</div>
        </div>
        <CashFlowChart t={t} compact/>
        <div style={{ display:'flex', justifyContent:'space-between', marginTop:6 }}>
          <span style={{ fontSize:9, color:t.textMuted }}>Today</span>
          <span style={{ fontSize:9, color:t.textMuted }}>+30 days</span>
        </div>
      </div>

      {/* Alerts */}
      <div style={{ marginBottom:14 }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10 }}>
          <div style={{ fontSize:13, fontWeight:700, color:t.text }}>Risk Alerts</div>
          <div style={{ fontSize:11, color:t.primary, fontWeight:600, cursor:'pointer', display:'flex', alignItems:'center', gap:3 }}>All {Ar && <Ar size={11}/>}</div>
        </div>
        {alerts.map(a => {
          const Ic = iconMap[a.icon];
          const clr = a.type==='danger' ? t.danger : t.warning;
          const dim = a.type==='danger' ? t.dangerDim : t.warningDim;
          const pressed = pressedAlert === a.id;
          return (
            <div key={a.id} onMouseDown={()=>setPressedAlert(a.id)} onMouseUp={()=>setPressedAlert(null)} onMouseLeave={()=>setPressedAlert(null)}
              style={{ background:t.card, borderRadius:14, padding:'12px 14px', marginBottom:8, display:'flex', gap:10, alignItems:'flex-start', border:`1px solid ${t.border}`, transform:pressed?'scale(0.98)':'scale(1)', transition:'transform 0.12s', cursor:'pointer' }}>
              <div style={{ background:dim, borderRadius:9, padding:7, flexShrink:0 }}>
                {Ic && <Ic size={14} color={clr}/>}
              </div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:12, fontWeight:700, color:t.text, marginBottom:2 }}>{a.title}</div>
                <div style={{ fontSize:10, color:t.textSub, lineHeight:1.4 }}>{a.desc}</div>
              </div>
              <div style={{ background:dim, borderRadius:7, padding:'3px 8px', fontSize:10, fontWeight:700, color:clr, flexShrink:0, alignSelf:'center', whiteSpace:'nowrap' }}>{a.action}</div>
            </div>
          );
        })}
      </div>

      {/* CTA */}
      <div onMouseDown={()=>setPressedAction(true)} onMouseUp={()=>setPressedAction(false)} onMouseLeave={()=>setPressedAction(false)}
        onClick={()=>onNav('actions')}
        style={{ background:`linear-gradient(135deg,${t.primary},${t.secondary})`, borderRadius:18, padding:'16px 18px', display:'flex', alignItems:'center', justifyContent:'space-between', cursor:'pointer', transform:pressedAction?'scale(0.97)':'scale(1)', transition:'transform 0.12s' }}>
        <div style={{ display:'flex', alignItems:'center', gap:12 }}>
          {Z && <Z size={22} color="#fff"/>}
          <div>
            <div style={{ fontSize:14, fontWeight:800, color:'#fff' }}>5 actions ready today</div>
            <div style={{ fontSize:11, color:'rgba(255,255,255,0.75)', marginTop:1 }}>Protect your $22K payroll</div>
          </div>
        </div>
        {Ar && <Ar size={18} color="#fff"/>}
      </div>
    </div>
  );
}

// ─── ForecastScreen ───────────────────────────────────────────────────────────
function ForecastScreen({ t }) {
  const [active, setActive] = useState(null);

  return (
    <div style={{ padding:'4px 20px 20px' }}>
      <div style={{ marginBottom:20 }}>
        <div style={{ fontSize:11, color:t.textSub, fontWeight:600, letterSpacing:0.5, marginBottom:4 }}>SCENARIO PLANNING</div>
        <div style={{ fontSize:26, fontWeight:800, color:t.text, letterSpacing:-0.5 }}>Cash Forecast</div>
      </div>

      <div style={{ background:t.card, borderRadius:20, padding:'16px 16px 12px', marginBottom:16, border:`1px solid ${t.border}` }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10 }}>
          <div style={{ fontSize:13, fontWeight:700, color:t.text }}>30-Day Cash Position</div>
          <div style={{ display:'flex', gap:10 }}>
            <span style={{ fontSize:10, color:t.textSub, display:'flex', alignItems:'center', gap:3 }}><span style={{ width:8, height:8, borderRadius:99, background:t.primary, display:'inline-block' }}/> Position</span>
            <span style={{ fontSize:10, color:t.textSub, display:'flex', alignItems:'center', gap:3 }}><span style={{ width:8, height:8, borderRadius:99, background:t.danger, display:'inline-block' }}/> Gap</span>
          </div>
        </div>
        <CashFlowChart t={t}/>
        <div style={{ display:'flex', justifyContent:'space-between', marginTop:6 }}>
          <span style={{ fontSize:9, color:t.textMuted }}>Mar 22</span>
          <span style={{ fontSize:9, color:t.textMuted }}>Apr 21</span>
        </div>
      </div>

      {/* What-if */}
      <div style={{ marginBottom:16 }}>
        <div style={{ fontSize:13, fontWeight:700, color:t.text, marginBottom:10 }}>What-If Scenarios</div>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>
          {scenarios.map(s => {
            const clr = t[s.color], dim = t[s.color+'Dim'], isA = active===s.id;
            return (
              <div key={s.id} onClick={()=>setActive(isA?null:s.id)}
                style={{ background:isA?dim:t.card, border:`1px solid ${isA?clr+'50':t.border}`, borderRadius:16, padding:'12px 14px', cursor:'pointer', transition:'all 0.2s' }}>
                <div style={{ fontSize:11, fontWeight:700, color:t.text, marginBottom:6, lineHeight:1.3 }}>{s.label}</div>
                <div style={{ fontSize:11, color:t.textSub, marginBottom:8 }}>{s.detail}</div>
                <div style={{ fontSize:16, fontWeight:900, color:clr }}>{s.cashImpact>0?'+':''}{fmt(Math.abs(s.cashImpact))}</div>
                <div style={{ fontSize:10, color:t.textMuted, marginTop:2 }}>{s.runwayImpact>0?'+':''}{s.runwayImpact} runway days</div>
              </div>
            );
          })}
        </div>
        {active && (
          <div style={{ background:t.card, border:`1px solid ${t.border}`, borderRadius:14, padding:'14px 16px', marginTop:10 }}>
            <div style={{ fontSize:12, fontWeight:700, color:t.text, marginBottom:6 }}>Simulation Result</div>
            <div style={{ fontSize:11, color:t.textSub, lineHeight:1.6 }}>
              With this scenario, projected cash in 30 days drops to <span style={{ color:t.danger, fontWeight:700 }}>$21,300</span> — below your $25K safety threshold. Consider deferring 2 non-critical bills to compensate.
            </div>
          </div>
        )}
      </div>

      {/* Bills */}
      <div>
        <div style={{ fontSize:13, fontWeight:700, color:t.text, marginBottom:10 }}>Upcoming Obligations</div>
        {bills.map((b,i) => {
          const clr = b.status==='risk'?t.danger:b.status==='defer'?t.warning:t.primary;
          const label = b.status==='risk'?'⚠ At risk':b.status==='defer'?'Defer advised':'✓ Funded';
          return (
            <div key={i} style={{ background:t.card, borderRadius:14, padding:'12px 16px', marginBottom:8, display:'flex', alignItems:'center', border:`1px solid ${t.border}` }}>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:13, fontWeight:600, color:t.text }}>{b.name}</div>
                <div style={{ fontSize:10, color:t.textMuted, marginTop:2 }}>Due in {b.dueIn} days</div>
              </div>
              <div style={{ textAlign:'right' }}>
                <div style={{ fontSize:13, fontWeight:800, color:t.text }}>${b.amount.toLocaleString()}</div>
                <div style={{ fontSize:10, fontWeight:700, color:clr, marginTop:2 }}>{label}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── ClientsScreen ────────────────────────────────────────────────────────────
function ClientsScreen({ t }) {
  const [sel, setSel] = useState(null);
  const [sent, setSent] = useState({});
  const Sn = window.lucide?.Send, Ck = window.lucide?.Check;

  const nudge = (c) => `Hi ${c.name.split(' ')[0]},\n\nHope things are going well! A quick reminder that Invoice #${1078+c.id} for $${c.amount.toLocaleString()} was due ${c.due}.\n\nHappy to help with anything to process this. Just say the word!\n\nWarm regards,\nSarah Chen\nSunrise Artisan Bakery`;

  return (
    <div style={{ padding:'4px 20px 20px' }}>
      <div style={{ marginBottom:20 }}>
        <div style={{ fontSize:11, color:t.textSub, fontWeight:600, letterSpacing:0.5, marginBottom:4 }}>PAYMENT INTELLIGENCE</div>
        <div style={{ fontSize:26, fontWeight:800, color:t.text, letterSpacing:-0.5 }}>Client Risk</div>
      </div>

      <div style={{ display:'flex', gap:8, marginBottom:20 }}>
        {[{l:'On track',v:2,c:t.primary,d:t.primaryDim},{l:'At risk',v:2,c:t.warning,d:t.warningDim},{l:'Overdue',v:1,c:t.danger,d:t.dangerDim}].map(s=>(
          <div key={s.l} style={{ flex:1, background:s.d, borderRadius:14, padding:'10px 8px', textAlign:'center', border:`1px solid ${s.c}25` }}>
            <div style={{ fontSize:22, fontWeight:900, color:s.c }}>{s.v}</div>
            <div style={{ fontSize:9, color:t.textSub, fontWeight:600 }}>{s.l}</div>
          </div>
        ))}
      </div>

      {clients.map(c => {
        const lc = likColor(c.pct, t), ld = likDim(c.pct, t), isS = sel===c.id, isSent = sent[c.id];
        return (
          <div key={c.id} style={{ marginBottom:10 }}>
            <div onClick={()=>setSel(isS?null:c.id)}
              style={{ background:t.card, borderRadius:isS?'16px 16px 0 0':16, padding:'13px 15px', border:`1px solid ${isS?lc+'40':t.border}`, cursor:'pointer', transition:'all 0.2s' }}>
              <div style={{ display:'flex', alignItems:'center', gap:11 }}>
                <div style={{ width:42, height:42, borderRadius:13, background:ld, border:`1px solid ${lc}30`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, fontWeight:900, color:lc, flexShrink:0 }}>{c.av}</div>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:13, fontWeight:700, color:t.text }}>{c.name}</div>
                  <div style={{ fontSize:10, color:t.textMuted, marginTop:1 }}>Due {c.due} · ${c.amount.toLocaleString()}</div>
                </div>
                <div style={{ textAlign:'right', flexShrink:0 }}>
                  <div style={{ fontSize:16, fontWeight:900, color:lc }}>{c.pct}%</div>
                  <div style={{ fontSize:9, color:t.textMuted }}>likelihood</div>
                </div>
              </div>
              <div style={{ marginTop:10, background:t.border, borderRadius:99, height:5 }}>
                <div style={{ width:`${c.pct}%`, height:'100%', borderRadius:99, background:`linear-gradient(90deg,${lc},${lc}90)`, transition:'width 0.6s ease' }}/>
              </div>
            </div>
            {isS && (
              <div style={{ background:t.cardAlt, borderRadius:'0 0 16px 16px', padding:'14px 15px', border:`1px solid ${lc}30`, borderTop:'none' }}>
                <div style={{ fontSize:9, fontWeight:700, color:t.textMuted, letterSpacing:0.5, marginBottom:8 }}>PERSONALIZED FOLLOW-UP DRAFT</div>
                <div style={{ fontSize:10, color:t.text, lineHeight:1.7, background:t.card, borderRadius:10, padding:'10px 12px', whiteSpace:'pre-wrap', marginBottom:10, fontFamily:'monospace', border:`1px solid ${t.border}` }}>{nudge(c)}</div>
                <div onClick={()=>setSent(p=>({...p,[c.id]:true}))}
                  style={{ background:isSent?t.primaryDim:`linear-gradient(135deg,${t.primary},${t.secondary})`, borderRadius:10, padding:'10px', display:'flex', alignItems:'center', justifyContent:'center', gap:6, cursor:'pointer', color:isSent?t.primary:'#fff', fontSize:13, fontWeight:700, transition:'all 0.2s' }}>
                  {isSent?(<>{Ck&&<Ck size={14}/>} Nudge sent!</>):(<>{Sn&&<Sn size={14}/>} Send nudge</>)}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── ActionsScreen ────────────────────────────────────────────────────────────
function ActionsScreen({ t }) {
  const [done, setDone] = useState({});
  const Ck = window.lucide?.Check;
  const iconMap = { Send:window.lucide?.Send, Calendar:window.lucide?.Calendar, Scissors:window.lucide?.Scissors, Zap:window.lucide?.Zap, PauseCircle:window.lucide?.PauseCircle };
  const pConf = { urgent:{l:'Urgent',c:t.danger,d:t.dangerDim}, high:{l:'High',c:t.warning,d:t.warningDim}, medium:{l:'Medium',c:t.secondary,d:t.secondaryDim}, low:{l:'Low',c:t.textSub,d:t.border} };
  const catC = { collect:t.primary, defer:t.warning, split:t.secondary };
  const remaining = actionItems.filter(a=>!done[a.id]);
  const recovered = remaining.reduce((s,a)=>s+a.impactVal,0);

  return (
    <div style={{ padding:'4px 20px 20px' }}>
      <div style={{ marginBottom:16 }}>
        <div style={{ fontSize:11, color:t.textSub, fontWeight:600, letterSpacing:0.5, marginBottom:4 }}>TODAY'S PLAYBOOK</div>
        <div style={{ fontSize:26, fontWeight:800, color:t.text, letterSpacing:-0.5 }}>Actions</div>
      </div>

      <div style={{ background:`linear-gradient(135deg,${t.primary}18,${t.secondary}18)`, border:`1px solid ${t.primary}30`, borderRadius:20, padding:'16px 20px', marginBottom:18, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <div>
          <div style={{ fontSize:10, color:t.textSub, fontWeight:600, marginBottom:4 }}>POTENTIAL RECOVERY</div>
          <div style={{ fontSize:30, fontWeight:900, color:t.primary, letterSpacing:-1 }}>+${recovered.toLocaleString()}</div>
        </div>
        <div style={{ textAlign:'right' }}>
          <div style={{ fontSize:10, color:t.textSub, fontWeight:600, marginBottom:4 }}>ACTIONS LEFT</div>
          <div style={{ fontSize:30, fontWeight:900, color:t.text }}>{remaining.length}</div>
        </div>
      </div>

      {actionItems.map(a => {
        const p = pConf[a.priority], Ic = iconMap[a.icon], isDone = done[a.id], cc = catC[a.cat];
        return (
          <div key={a.id} style={{ background:isDone?t.border:t.card, borderRadius:18, padding:'14px 15px', marginBottom:11, border:`1px solid ${isDone?'transparent':t.border}`, opacity:isDone?0.45:1, transition:'all 0.3s' }}>
            <div style={{ display:'flex', gap:12, alignItems:'flex-start' }}>
              <div style={{ background:cc+'20', borderRadius:12, padding:10, flexShrink:0 }}>
                {Ic && <Ic size={16} color={cc}/>}
              </div>
              <div style={{ flex:1 }}>
                <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:5 }}>
                  <div style={{ background:p.d, borderRadius:5, padding:'2px 6px', fontSize:9, fontWeight:700, color:p.c }}>{p.l}</div>
                  <div style={{ fontSize:9, color:t.textMuted, fontWeight:600, textTransform:'uppercase', letterSpacing:0.3 }}>{a.cat}</div>
                </div>
                <div style={{ fontSize:13, fontWeight:700, color:t.text, marginBottom:4 }}>{a.title}</div>
                <div style={{ fontSize:11, color:t.textSub, lineHeight:1.5, marginBottom:10 }}>{a.desc}</div>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                  <div style={{ fontSize:13, fontWeight:800, color:cc }}>{a.impact}</div>
                  <div onClick={()=>setDone(p=>({...p,[a.id]:!p[a.id]}))}
                    style={{ background:isDone?t.primaryDim:`linear-gradient(135deg,${t.primary},${t.secondary})`, borderRadius:10, padding:'7px 14px', fontSize:11, fontWeight:700, color:isDone?t.primary:'#fff', cursor:'pointer', display:'flex', alignItems:'center', gap:4, transition:'all 0.2s' }}>
                    {isDone?(<>{Ck&&<Ck size={12}/>} Done</>):'Take action'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── SettingsScreen ───────────────────────────────────────────────────────────
function SettingsScreen({ t, isDark, onToggle }) {
  const Sn = window.lucide?.Sun, Mn = window.lucide?.Moon;
  const Bl = window.lucide?.Bell, Lk = window.lucide?.Link2, Sh = window.lucide?.Shield, Hp = window.lucide?.HelpCircle;
  const Bld = window.lucide?.Building2, Ch = window.lucide?.ChevronRight;
  const rows = [
    { I:Bl, l:'Alert Preferences', s:'Daily digest · Slack enabled' },
    { I:Lk, l:'Connected Accounts', s:'Chase Business · QuickBooks' },
    { I:Bld, l:'Business Profile', s:'Sunrise Artisan Bakery' },
    { I:Sh, l:'Privacy & Security', s:'Bank-level 256-bit encryption' },
    { I:Hp, l:'Help & Support', s:'Chat, docs, tutorials' },
  ];

  return (
    <div style={{ padding:'4px 20px 20px' }}>
      <div style={{ marginBottom:24 }}>
        <div style={{ fontSize:11, color:t.textSub, fontWeight:600, letterSpacing:0.5, marginBottom:4 }}>PREFERENCES</div>
        <div style={{ fontSize:26, fontWeight:800, color:t.text, letterSpacing:-0.5 }}>Settings</div>
      </div>

      <div style={{ background:t.card, borderRadius:20, padding:'18px', marginBottom:16, border:`1px solid ${t.border}`, display:'flex', gap:14, alignItems:'center' }}>
        <div style={{ width:54, height:54, borderRadius:16, background:`linear-gradient(135deg,${t.primary},${t.secondary})`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:22, fontWeight:900, color:'#fff', flexShrink:0 }}>S</div>
        <div>
          <div style={{ fontSize:17, fontWeight:800, color:t.text }}>Sarah Chen</div>
          <div style={{ fontSize:12, color:t.textSub }}>Sunrise Artisan Bakery</div>
          <div style={{ fontSize:11, color:t.primary, fontWeight:700, marginTop:3 }}>Pro Plan · Active</div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display:'flex', gap:8, marginBottom:16 }}>
        {[{l:'Runway',v:'23 days',c:t.warning},{l:'Forecasts',v:'847',c:t.primary},{l:'Saved',v:'$18.2K',c:t.secondary}].map(s=>(
          <div key={s.l} style={{ flex:1, background:t.card, borderRadius:14, padding:'12px 10px', textAlign:'center', border:`1px solid ${t.border}` }}>
            <div style={{ fontSize:15, fontWeight:900, color:s.c }}>{s.v}</div>
            <div style={{ fontSize:9, color:t.textSub, fontWeight:600, marginTop:2 }}>{s.l}</div>
          </div>
        ))}
      </div>

      {/* Theme toggle */}
      <div style={{ background:t.card, borderRadius:20, padding:'16px 18px', marginBottom:14, border:`1px solid ${t.border}` }}>
        <div style={{ fontSize:10, fontWeight:700, color:t.textMuted, marginBottom:12, textTransform:'uppercase', letterSpacing:0.5 }}>Appearance</div>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <div style={{ width:38, height:38, borderRadius:11, background:t.primaryDim, display:'flex', alignItems:'center', justifyContent:'center' }}>
              {isDark?(Mn&&<Mn size={17} color={t.primary}/>):(Sn&&<Sn size={17} color={t.primary}/>)}
            </div>
            <div>
              <div style={{ fontSize:13, fontWeight:700, color:t.text }}>{isDark?'Dark Mode':'Light Mode'}</div>
              <div style={{ fontSize:11, color:t.textSub }}>Switch to {isDark?'light':'dark'} theme</div>
            </div>
          </div>
          <div onClick={onToggle} style={{ width:52, height:30, borderRadius:99, background:isDark?t.primary:t.border, padding:3, cursor:'pointer', transition:'background 0.3s', display:'flex', alignItems:'center', justifyContent:isDark?'flex-end':'flex-start' }}>
            <div style={{ width:24, height:24, borderRadius:99, background:'#fff', boxShadow:'0 2px 8px rgba(0,0,0,0.25)', transition:'all 0.3s' }}/>
          </div>
        </div>
      </div>

      {/* Settings list */}
      <div style={{ background:t.card, borderRadius:20, border:`1px solid ${t.border}`, overflow:'hidden' }}>
        {rows.map((r,i) => {
          const Ic = r.I;
          return (
            <div key={i} style={{ padding:'13px 18px', borderBottom:i<rows.length-1?`1px solid ${t.border}`:'none', display:'flex', alignItems:'center', gap:12, cursor:'pointer' }}>
              <div style={{ width:36, height:36, borderRadius:10, background:t.primaryDim, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                {Ic && <Ic size={15} color={t.primary}/>}
              </div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:13, fontWeight:600, color:t.text }}>{r.l}</div>
                <div style={{ fontSize:10, color:t.textSub, marginTop:1 }}>{r.s}</div>
              </div>
              {Ch && <Ch size={15} color={t.textMuted}/>}
            </div>
          );
        })}
      </div>

      <div style={{ textAlign:'center', marginTop:22, color:t.textMuted, fontSize:10, fontWeight:500 }}>
        LedgerPulse v2.1.0 · Forecasting since 2023
      </div>
    </div>
  );
}

// ─── BottomNav ────────────────────────────────────────────────────────────────
function BottomNav({ active, onNav, t }) {
  const tabs = [
    { id:'home', l:'Home', I:window.lucide?.Home },
    { id:'forecast', l:'Forecast', I:window.lucide?.TrendingUp },
    { id:'clients', l:'Clients', I:window.lucide?.Users },
    { id:'actions', l:'Actions', I:window.lucide?.Zap },
    { id:'settings', l:'Settings', I:window.lucide?.Settings },
  ];
  return (
    <div style={{ display:'flex', background:t.navBg, borderTop:`1px solid ${t.border}`, paddingBottom:18, paddingTop:8, flexShrink:0 }}>
      {tabs.map(tab => {
        const isA = active===tab.id, Ic = tab.I;
        return (
          <div key={tab.id} onClick={()=>onNav(tab.id)}
            style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:3, cursor:'pointer', paddingTop:4 }}>
            <div style={{ position:'relative', display:'flex', alignItems:'center', justifyContent:'center', width:40, height:28, borderRadius:12, background:isA?t.primaryDim:'transparent', transition:'all 0.2s' }}>
              {Ic && <Ic size={20} color={isA?t.primary:t.textMuted} strokeWidth={isA?2.5:1.75}/>}
            </div>
            <span style={{ fontSize:9, fontWeight:isA?800:500, color:isA?t.primary:t.textMuted, transition:'all 0.2s' }}>{tab.l}</span>
          </div>
        );
      })}
    </div>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
function App() {
  const [themeKey, setThemeKey] = useState('dark');
  const [tab, setTab] = useState('home');
  const t = themes[themeKey];
  const isDark = themeKey === 'dark';

  useEffect(() => {
    const s = document.createElement('style');
    s.textContent = `@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap'); * { box-sizing: border-box; } ::-webkit-scrollbar { display: none; }`;
    document.head.appendChild(s);
    document.body.style.margin = '0';
    document.body.style.background = '#f0f0f0';
    return () => document.head.removeChild(s);
  }, []);

  const screens = {
    home: <HomeScreen t={t} onNav={setTab}/>,
    forecast: <ForecastScreen t={t}/>,
    clients: <ClientsScreen t={t}/>,
    actions: <ActionsScreen t={t}/>,
    settings: <SettingsScreen t={t} isDark={isDark} onToggle={()=>setThemeKey(k=>k==='dark'?'light':'dark')}/>,
  };

  return (
    <div style={{ minHeight:'100vh', background:'#f0f0f0', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'Plus Jakarta Sans', sans-serif", padding:'20px 0' }}>
      <div style={{ width:375, height:812, background:t.bg, borderRadius:54, overflow:'hidden', boxShadow:'0 50px 140px rgba(0,0,0,0.35), 0 0 0 1px rgba(0,0,0,0.15), inset 0 0 0 1px rgba(255,255,255,0.08)', display:'flex', flexDirection:'column', position:'relative', fontFamily:"'Plus Jakarta Sans', sans-serif" }}>
        {/* Dynamic Island */}
        <div style={{ position:'absolute', top:12, left:'50%', transform:'translateX(-50%)', width:126, height:36, background:'#000', borderRadius:20, zIndex:100 }}/>

        <StatusBar t={t}/>

        {/* Scrollable content */}
        <div style={{ flex:1, overflow:'hidden', position:'relative' }}>
          <div style={{ position:'absolute', inset:0, overflowY:'auto' }}>
            {screens[tab]}
          </div>
        </div>

        <BottomNav active={tab} onNav={setTab} t={t}/>
      </div>
    </div>
  );
}
