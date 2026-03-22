const { useState, useEffect, useRef } = React;

// ─── THEMES ───────────────────────────────────────────────────────────────────
const themes = {
  dark: {
    bg: '#060C18',
    surface: '#0C1826',
    surface2: '#111F2E',
    card: '#162435',
    cardBorder: '#1E3248',
    primary: '#00E5AD',
    primaryDim: 'rgba(0,229,173,0.12)',
    primaryBright: '#33EDBE',
    danger: '#FF4560',
    dangerDim: 'rgba(255,69,96,0.13)',
    warning: '#FFB020',
    warningDim: 'rgba(255,176,32,0.13)',
    success: '#00C48C',
    successDim: 'rgba(0,196,140,0.13)',
    info: '#5B9EFF',
    infoDim: 'rgba(91,158,255,0.13)',
    text: '#DCF0FF',
    textSub: '#5A82A0',
    textMuted: '#2E4A62',
    border: '#1A3048',
    navBg: '#07111E',
  },
  light: {
    bg: '#EBF3FA',
    surface: '#FFFFFF',
    surface2: '#F4F9FD',
    card: '#FFFFFF',
    cardBorder: '#C8DFF0',
    primary: '#00A882',
    primaryDim: 'rgba(0,168,130,0.1)',
    primaryBright: '#00C899',
    danger: '#E53E56',
    dangerDim: 'rgba(229,62,86,0.1)',
    warning: '#D08000',
    warningDim: 'rgba(208,128,0,0.1)',
    success: '#028A5A',
    successDim: 'rgba(2,138,90,0.1)',
    info: '#2563EB',
    infoDim: 'rgba(37,99,235,0.1)',
    text: '#071E30',
    textSub: '#4A6880',
    textMuted: '#8AAAC0',
    border: '#C0D8EC',
    navBg: '#FFFFFF',
  },
};

// ─── MOCK DATA ────────────────────────────────────────────────────────────────
const SUBS = [
  { id:1, name:'Netflix',        cat:'Streaming',  amt:22.99, next:3,  emoji:'🎬', alert:null,          trial:false, priceChange:null },
  { id:2, name:'Spotify',        cat:'Music',       amt:10.99, next:7,  emoji:'🎵', alert:null,          trial:false, priceChange:null },
  { id:3, name:'Adobe CC',       cat:'Software',    amt:54.99, next:12, emoji:'🎨', alert:'price_hike',  trial:false, priceChange:{old:49.99} },
  { id:4, name:'Gym Pro',        cat:'Fitness',     amt:49.00, next:5,  emoji:'💪', alert:'trial',       trial:true,  priceChange:null },
  { id:5, name:'AWS',            cat:'Cloud',       amt:87.50, next:15, emoji:'☁️', alert:null,          trial:false, priceChange:null },
  { id:6, name:'iCloud 200GB',   cat:'Storage',     amt:2.99,  next:8,  emoji:'📱', alert:null,          trial:false, priceChange:null },
  { id:7, name:'Car Insurance',  cat:'Insurance',   amt:187.00,next:4,  emoji:'🚗', alert:'overlap',     trial:false, priceChange:null },
  { id:8, name:'Hulu Bundle',    cat:'Streaming',   amt:17.99, next:3,  emoji:'📺', alert:'price_hike',  trial:false, priceChange:{old:13.99} },
  { id:9, name:'Dropbox Plus',   cat:'Storage',     amt:9.99,  next:22, emoji:'📦', alert:'duplicate',   trial:false, priceChange:null },
  { id:10,name:'GitHub Pro',     cat:'Dev Tools',   amt:4.00,  next:20, emoji:'⚙️', alert:null,          trial:false, priceChange:null },
];

const ALERTS_DATA = [
  { id:1, type:'danger',  title:'Cash Flow Danger Zone',    msg:"Car Insurance + Rent + Gym trial all land Apr 3–5. You risk overdrafting by $312.",  impact:'$1,686 at risk',   icon:'AlertTriangle', actions:['Move Gym date','Reserve funds'], time:'2m ago',  read:false },
  { id:2, type:'warning', title:'Price Hike: Hulu Bundle',  msg:"Hulu quietly raised your bundle from $13.99 → $17.99/mo. That's $48/yr more.",       impact:'+$4.00/mo',        icon:'TrendingUp',    actions:['View plan options','Cancel Hulu'], time:'1h ago', read:false },
  { id:3, type:'warning', title:'Trial Ends in 5 Days',     msg:"Gym Pro free trial converts Apr 5. Cancel now or you'll be auto-charged $49/mo.",     impact:'$49 on Apr 5',     icon:'Clock',         actions:['Cancel for free','Keep it'], time:'3h ago',  read:false },
  { id:4, type:'info',    title:'Duplicate Storage Found',  msg:"You pay for iCloud 200GB ($2.99) and Dropbox Plus ($9.99). One may be redundant.",    impact:'Save up to $9.99/mo', icon:'Copy',        actions:['Compare plans','Cancel Dropbox'], time:'Yesterday', read:true },
  { id:5, type:'success', title:'Annual Renewal Covered',   msg:"Adobe CC annual charge ($659.88) was predicted and funds allocated 2 weeks early.",   impact:'No overdraft risk', icon:'ShieldCheck',  actions:['View details'], time:'2d ago', read:true },
];

const DAYS = [
  { label:'Today', date:'Mar 22', bills:[],                                     end:2840, risk:0 },
  { label:'Sun',   date:'Mar 23', bills:[],                                     end:2840, risk:0 },
  { label:'Mon',   date:'Mar 24', bills:[{n:'Spotify',a:10.99}],                end:2829, risk:1 },
  { label:'Tue',   date:'Mar 25', bills:[],                                     end:2829, risk:0 },
  { label:'Wed',   date:'Mar 26', bills:[{n:'Car Insurance',a:187},{n:'Netflix',a:22.99}], end:2619, risk:3 },
  { label:'Thu',   date:'Mar 27', bills:[],                                     end:2619, risk:0 },
  { label:'Fri',   date:'Mar 28', bills:[],                                     end:2619, risk:0 },
  { label:'Sat',   date:'Mar 29', bills:[{n:'Hulu Bundle',a:17.99}],            end:2601, risk:1 },
  { label:'Sun',   date:'Mar 30', bills:[],                                     end:2601, risk:0 },
  { label:'Mon',   date:'Mar 31', bills:[],                                     end:2601, risk:0 },
  { label:'Tue',   date:'Apr 1',  bills:[],                                     end:4051, risk:0, income:1450 },
  { label:'Wed',   date:'Apr 2',  bills:[],                                     end:4051, risk:0 },
  { label:'Thu',   date:'Apr 3',  bills:[{n:'Rent',a:1450},{n:'Car Insurance',a:187}], end:2414, risk:3 },
  { label:'Fri',   date:'Apr 4',  bills:[{n:'Gym Pro Trial',a:49}],             end:2365, risk:2 },
];

// ─── STATUS BAR ───────────────────────────────────────────────────────────────
function StatusBar({ theme }) {
  const WifiIcon = window.lucide.Wifi;
  const BatteryFullIcon = window.lucide.BatteryFull;
  const SignalIcon = window.lucide.Signal;
  return (
    <div style={{
      display:'flex', justifyContent:'space-between', alignItems:'center',
      paddingLeft:28, paddingRight:22, paddingTop:14, paddingBottom:2,
      flexShrink:0,
    }}>
      <span style={{ fontSize:13, fontWeight:700, color:theme.text, letterSpacing:'-0.3px' }}>9:41</span>
      <div style={{ display:'flex', gap:5, alignItems:'center' }}>
        <SignalIcon size={13} color={theme.text} />
        <WifiIcon size={13} color={theme.text} />
        <BatteryFullIcon size={16} color={theme.text} />
      </div>
    </div>
  );
}

// ─── DYNAMIC ISLAND ───────────────────────────────────────────────────────────
function DynamicIsland() {
  return (
    <div style={{ display:'flex', justifyContent:'center', paddingBottom:10, flexShrink:0 }}>
      <div style={{
        width:126, height:36, background:'#000',
        borderRadius:20, display:'flex', alignItems:'center', justifyContent:'center',
        gap:8,
      }}>
        <div style={{ width:9, height:9, borderRadius:'50%', background:'#111', border:'1.5px solid #222' }} />
        <div style={{ width:18, height:18, borderRadius:'50%', background:'#111', border:'1.5px solid #222' }} />
      </div>
    </div>
  );
}

// ─── DASHBOARD SCREEN ─────────────────────────────────────────────────────────
function DashboardScreen({ theme, isDark }) {
  const [pressedIdx, setPressedIdx] = useState(null);
  const AlertTriangleIcon = window.lucide.AlertTriangle;
  const BellIcon = window.lucide.Bell;
  const ShieldIcon = window.lucide.Shield;
  const XIcon = window.lucide.X;
  const CalendarIcon = window.lucide.Calendar;

  const urgentBills = SUBS.filter(s => s.next <= 5).sort((a,b) => a.next - b.next);
  const weekTotal = SUBS.filter(s => s.next <= 7).reduce((sum,s) => sum + s.amt, 0);
  const cashBalance = 2840;

  return (
    <div style={{ height:'100%', overflowY:'auto', background:theme.bg, padding:'0 16px 16px' }}>

      {/* Header */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', paddingTop:4, paddingBottom:14 }}>
        <div>
          <div style={{ fontSize:11, color:theme.textSub, fontWeight:700, letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:2 }}>
            Good morning, Maya
          </div>
          <div style={{ fontSize:23, fontWeight:800, color:theme.text, lineHeight:1.15 }}>Expense Forecast</div>
        </div>
        <div style={{
          width:38, height:38, borderRadius:12,
          background:theme.dangerDim, border:`1.5px solid ${theme.danger}60`,
          display:'flex', alignItems:'center', justifyContent:'center',
          position:'relative', flexShrink:0,
        }}>
          <BellIcon size={17} color={theme.danger} />
          <div style={{
            position:'absolute', top:-3, right:-3,
            width:12, height:12, borderRadius:'50%',
            background:theme.danger, border:`2px solid ${theme.bg}`,
            fontSize:7, fontWeight:800, color:'#fff',
            display:'flex', alignItems:'center', justifyContent:'center',
          }}>3</div>
        </div>
      </div>

      {/* Risk Hero Card */}
      <div style={{
        background: isDark
          ? 'linear-gradient(140deg, #1A0820 0%, #080F22 60%, #04101C 100%)'
          : 'linear-gradient(140deg, #FFF3EE 0%, #FFEEF5 60%, #F0F8FF 100%)',
        border: `1px solid ${isDark ? '#3A1030' : '#FFD0C8'}`,
        borderRadius:22, padding:18, marginBottom:12,
        position:'relative', overflow:'hidden',
      }}>
        <div style={{
          position:'absolute', top:-50, right:-50, width:160, height:160,
          borderRadius:'50%',
          background: isDark ? 'rgba(255,69,96,0.12)' : 'rgba(255,69,96,0.07)',
          filter:'blur(40px)',
        }} />
        <div style={{ position:'relative' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:14 }}>
            <div>
              <div style={{ fontSize:10, color:theme.danger, fontWeight:800, letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:4 }}>
                ⚡ HIGH RISK WEEK
              </div>
              <div style={{ fontSize:24, fontWeight:800, color:theme.text, lineHeight:1.1 }}>Stormy Ahead</div>
              <div style={{ fontSize:13, color:theme.textSub, marginTop:3 }}>3 bill clusters in the next 7 days</div>
            </div>
            <div style={{
              width:52, height:52, borderRadius:16,
              background:theme.dangerDim, border:`1.5px solid ${theme.danger}60`,
              display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0,
            }}>
              <AlertTriangleIcon size={24} color={theme.danger} />
            </div>
          </div>

          {/* Risk bar */}
          <div style={{ background:'rgba(255,255,255,0.06)', borderRadius:8, height:7, marginBottom:14, overflow:'hidden' }}>
            <div style={{
              width:'76%', height:7, borderRadius:8,
              background:`linear-gradient(90deg, ${theme.warning}, ${theme.danger})`,
            }} />
          </div>

          {/* Stats row */}
          <div style={{ display:'flex', gap:0 }}>
            {[
              { label:'AT RISK', value:`$${weekTotal.toFixed(0)}`, color:theme.danger },
              { label:'BALANCE', value:`$${cashBalance.toLocaleString()}`, color:theme.text },
              { label:'AFTER BILLS', value:`$${(cashBalance-weekTotal).toFixed(0)}`, color:theme.success },
            ].map((s, i) => (
              <div key={i} style={{ flex:1, paddingLeft: i>0 ? 12 : 0, borderLeft: i>0 ? `1px solid ${theme.border}` : 'none', marginLeft: i>0 ? 12 : 0 }}>
                <div style={{ fontSize:9, color:theme.textSub, fontWeight:700, letterSpacing:'0.06em', marginBottom:3 }}>{s.label}</div>
                <div style={{ fontSize:17, fontWeight:800, color:s.color, lineHeight:1 }}>{s.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upcoming Bills */}
      <div style={{ marginBottom:12 }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8 }}>
          <div style={{ fontSize:14, fontWeight:700, color:theme.text }}>Urgent Bills</div>
          <div style={{ fontSize:12, color:theme.primary, fontWeight:700 }}>See all →</div>
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:7 }}>
          {urgentBills.slice(0,4).map(sub => (
            <div key={sub.id} style={{
              background:theme.card,
              border:`1px solid ${sub.next <= 3 ? theme.danger + '50' : theme.cardBorder}`,
              borderRadius:14, padding:'10px 12px',
              display:'flex', alignItems:'center', gap:10,
            }}>
              <div style={{
                width:38, height:38, borderRadius:12,
                background:theme.surface2, fontSize:20,
                display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0,
              }}>{sub.emoji}</div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ display:'flex', alignItems:'center', gap:5, marginBottom:2 }}>
                  <span style={{ fontSize:13, fontWeight:700, color:theme.text }}>{sub.name}</span>
                  {sub.trial && (
                    <span style={{ fontSize:9, fontWeight:800, color:theme.warning, background:theme.warningDim, padding:'1px 5px', borderRadius:4 }}>TRIAL</span>
                  )}
                  {sub.alert === 'price_hike' && (
                    <span style={{ fontSize:9, fontWeight:800, color:theme.danger, background:theme.dangerDim, padding:'1px 5px', borderRadius:4 }}>↑ PRICE</span>
                  )}
                </div>
                <div style={{ fontSize:11, color:theme.textSub }}>Due in {sub.next} day{sub.next !== 1 ? 's' : ''} · {sub.cat}</div>
              </div>
              <div style={{ textAlign:'right', flexShrink:0 }}>
                <div style={{ fontSize:15, fontWeight:800, color: sub.next <= 3 ? theme.danger : theme.text }}>
                  ${sub.amt.toFixed(2)}
                </div>
                {sub.priceChange && (
                  <div style={{ fontSize:10, color:theme.textMuted, textDecoration:'line-through' }}>
                    ${sub.priceChange.old.toFixed(2)}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 7-Day Strip */}
      <div style={{ marginBottom:12 }}>
        <div style={{ fontSize:14, fontWeight:700, color:theme.text, marginBottom:8 }}>7-Day Cash Flow</div>
        <div style={{
          background:theme.card, border:`1px solid ${theme.cardBorder}`,
          borderRadius:16, padding:14,
        }}>
          <div style={{ display:'flex', gap:4, justifyContent:'space-between' }}>
            {DAYS.slice(0, 7).map((day, i) => {
              const riskColors = [theme.primary + '50', theme.warning + 'AA', theme.warning, theme.danger];
              const barAmt = day.bills.reduce((s,b) => s + b.a, 0);
              const barH = barAmt > 0 ? Math.min(58, Math.max(14, barAmt / 4)) : 4;
              return (
                <div key={i} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:3 }}>
                  <div style={{ fontSize:9, color:theme.textMuted, fontWeight:600 }}>{day.label.slice(0,3)}</div>
                  <div style={{ width:'100%', height:60, display:'flex', alignItems:'flex-end', justifyContent:'center' }}>
                    <div style={{
                      width:'66%', borderRadius:4,
                      height: barH,
                      background: riskColors[day.risk],
                      transition:'height 0.4s ease',
                    }} />
                  </div>
                  <div style={{ width:5, height:5, borderRadius:'50%', background: day.bills.length > 0 ? (day.risk >= 2 ? theme.danger : theme.warning) : 'transparent' }} />
                  <div style={{ fontSize:9, color:theme.textMuted }}>{day.date.split(' ')[1]}</div>
                </div>
              );
            })}
          </div>
          <div style={{ display:'flex', gap:12, marginTop:10, paddingTop:10, borderTop:`1px solid ${theme.border}` }}>
            {[{c:theme.primary+'50',l:'Safe'},{c:theme.warning,l:'Caution'},{c:theme.danger,l:'High Risk'}].map((item,i) => (
              <div key={i} style={{ display:'flex', alignItems:'center', gap:4 }}>
                <div style={{ width:8, height:8, borderRadius:2, background:item.c }} />
                <span style={{ fontSize:10, color:theme.textSub }}>{item.l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <div style={{ fontSize:14, fontWeight:700, color:theme.text, marginBottom:8 }}>Quick Actions</div>
        <div style={{ display:'flex', gap:8 }}>
          {[
            { label:'Cancel\nGym Trial', icon:'X',        color:theme.danger,  bg:theme.dangerDim },
            { label:'Reserve\n$500 Now', icon:'Shield',    color:theme.primary, bg:theme.primaryDim },
            { label:'Shift\nPayment',    icon:'Calendar',  color:theme.info,    bg:theme.infoDim },
          ].map((a, i) => {
            const Icon = window.lucide[a.icon];
            return (
              <div
                key={i}
                onMouseDown={() => setPressedIdx(i)}
                onMouseUp={() => setPressedIdx(null)}
                onMouseLeave={() => setPressedIdx(null)}
                style={{
                  flex:1, background:a.bg, border:`1px solid ${a.color}50`,
                  borderRadius:14, padding:'12px 8px',
                  display:'flex', flexDirection:'column', alignItems:'center', gap:7,
                  cursor:'pointer',
                  transform: pressedIdx === i ? 'scale(0.94)' : 'scale(1)',
                  transition:'transform 0.1s ease',
                }}
              >
                <div style={{
                  width:34, height:34, borderRadius:10,
                  background:`${a.color}20`, border:`1px solid ${a.color}40`,
                  display:'flex', alignItems:'center', justifyContent:'center',
                }}>
                  <Icon size={16} color={a.color} />
                </div>
                <span style={{ fontSize:10, fontWeight:800, color:a.color, textAlign:'center', lineHeight:1.3 }}>{a.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── FORECAST SCREEN ──────────────────────────────────────────────────────────
function ForecastScreen({ theme }) {
  const [selectedDay, setSelectedDay] = useState(0);
  const day = DAYS[selectedDay];

  return (
    <div style={{ height:'100%', overflowY:'auto', background:theme.bg, padding:'0 16px 16px' }}>

      {/* Header */}
      <div style={{ paddingTop:4, paddingBottom:14 }}>
        <div style={{ fontSize:11, color:theme.textSub, fontWeight:700, letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:2 }}>14-DAY OUTLOOK</div>
        <div style={{ fontSize:23, fontWeight:800, color:theme.text }}>Bill Forecast</div>
      </div>

      {/* Summary pills */}
      <div style={{ display:'flex', gap:8, marginBottom:12 }}>
        {[
          { label:'Total Bills',     value:'$1,902', sub:'next 14 days', color:theme.danger },
          { label:'Overlap Zones',   value:'2',      sub:'detected',     color:theme.warning },
          { label:'Lowest Balance',  value:'$2,365', sub:'Apr 4',        color:theme.info },
        ].map((s,i) => (
          <div key={i} style={{
            flex:1, background:theme.card, border:`1px solid ${theme.cardBorder}`,
            borderRadius:14, padding:'10px 8px', textAlign:'center',
          }}>
            <div style={{ fontSize:16, fontWeight:800, color:s.color }}>{s.value}</div>
            <div style={{ fontSize:9, fontWeight:700, color:theme.text, marginTop:2, lineHeight:1.3 }}>{s.label}</div>
            <div style={{ fontSize:9, color:theme.textSub }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Day Scroller */}
      <div style={{
        background:theme.card, border:`1px solid ${theme.cardBorder}`,
        borderRadius:16, padding:12, marginBottom:12,
      }}>
        <div style={{ fontSize:11, fontWeight:700, color:theme.textSub, marginBottom:8 }}>Tap a day to inspect</div>
        <div style={{ display:'flex', gap:5, overflowX:'auto', paddingBottom:2 }}>
          {DAYS.map((d, i) => {
            const isSelected = selectedDay === i;
            const riskBorder = d.risk >= 3 ? theme.danger : d.risk >= 2 ? theme.warning : d.risk >= 1 ? theme.warning : theme.border;
            const riskBg = d.risk >= 3 ? theme.dangerDim : d.risk >= 2 ? theme.warningDim : d.risk >= 1 ? theme.warningDim : 'transparent';
            return (
              <div
                key={i}
                onClick={() => setSelectedDay(i)}
                style={{
                  minWidth:46, padding:'6px 4px', borderRadius:12, cursor:'pointer',
                  background: isSelected ? theme.primary : riskBg,
                  border:`1.5px solid ${isSelected ? theme.primary : riskBorder}`,
                  textAlign:'center', flexShrink:0, transition:'all 0.15s',
                }}
              >
                <div style={{ fontSize:9, fontWeight:600, color: isSelected ? '#000' : theme.textSub, marginBottom:2 }}>
                  {d.label.slice(0,3)}
                </div>
                <div style={{ fontSize:12, fontWeight:700, color: isSelected ? '#000' : theme.text }}>
                  {d.date.split(' ')[1]}
                </div>
                {d.bills.length > 0 && !isSelected && (
                  <div style={{ width:4, height:4, borderRadius:'50%', background: d.risk >= 2 ? theme.danger : theme.warning, margin:'3px auto 0' }} />
                )}
                {d.income && !isSelected && (
                  <div style={{ width:4, height:4, borderRadius:'50%', background: theme.success, margin:'3px auto 0' }} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Day Detail */}
      <div style={{
        background:theme.card,
        border:`1px solid ${day.risk >= 3 ? theme.danger + '60' : day.risk >= 2 ? theme.warning + '60' : theme.cardBorder}`,
        borderRadius:16, padding:14, marginBottom:12,
      }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12 }}>
          <div>
            <div style={{ fontSize:16, fontWeight:800, color:theme.text }}>{day.label} · {day.date}</div>
            <div style={{ fontSize:12, color:theme.textSub }}>
              {day.bills.length === 0 ? 'No bills due' : `${day.bills.length} bill${day.bills.length > 1 ? 's' : ''} due`}
            </div>
          </div>
          {day.income && (
            <div style={{
              background:theme.successDim, border:`1px solid ${theme.success}50`,
              borderRadius:8, padding:'4px 10px', fontSize:11, fontWeight:800, color:theme.success,
            }}>+${day.income.toLocaleString()} IN</div>
          )}
        </div>

        {day.bills.length > 0 ? (
          <div style={{ display:'flex', flexDirection:'column', gap:6, marginBottom:12 }}>
            {day.bills.map((b, i) => (
              <div key={i} style={{
                display:'flex', justifyContent:'space-between', alignItems:'center',
                padding:'8px 12px', background:theme.surface2, borderRadius:10,
              }}>
                <span style={{ fontSize:13, fontWeight:600, color:theme.text }}>{b.n}</span>
                <span style={{ fontSize:14, fontWeight:800, color: day.risk >= 2 ? theme.danger : theme.text }}>
                  -${b.a.toLocaleString('en-US', {minimumFractionDigits:2})}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign:'center', padding:'18px 0', color:theme.textSub, fontSize:13, marginBottom:12 }}>
            ✓ Clear day — no bills scheduled
          </div>
        )}

        <div style={{ display:'flex', justifyContent:'space-between', paddingTop:10, borderTop:`1px solid ${theme.border}` }}>
          <div>
            <div style={{ fontSize:9, color:theme.textSub, fontWeight:700, letterSpacing:'0.06em' }}>END BALANCE</div>
            <div style={{ fontSize:20, fontWeight:800, color: day.end < 500 ? theme.danger : day.end < 1000 ? theme.warning : theme.success }}>
              ${day.end.toLocaleString()}
            </div>
          </div>
          <div style={{ textAlign:'right' }}>
            <div style={{ fontSize:9, color:theme.textSub, fontWeight:700, letterSpacing:'0.06em' }}>RISK LEVEL</div>
            <div style={{ fontSize:15, fontWeight:800, color: [theme.success, theme.warning, theme.warning, theme.danger][day.risk] }}>
              {['SAFE','LOW','MEDIUM','HIGH'][day.risk]}
            </div>
          </div>
        </div>
      </div>

      {/* Balance Projection Chart */}
      <div style={{
        background:theme.card, border:`1px solid ${theme.cardBorder}`,
        borderRadius:16, padding:14,
      }}>
        <div style={{ fontSize:13, fontWeight:700, color:theme.text, marginBottom:12 }}>Balance Projection</div>
        <svg width="100%" height="80" viewBox="0 0 340 80" preserveAspectRatio="none">
          <defs>
            <linearGradient id="areaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={theme.primary} stopOpacity="0.28" />
              <stop offset="100%" stopColor={theme.primary} stopOpacity="0" />
            </linearGradient>
          </defs>
          {(() => {
            const maxV = 4200, minV = 2000;
            const pts = DAYS.map((d, i) => {
              const x = (i / (DAYS.length - 1)) * 340;
              const y = 72 - ((d.end - minV) / (maxV - minV)) * 65;
              return [x, y];
            });
            const area = `M${pts[0][0]},${pts[0][1]} ${pts.slice(1).map(p => `L${p[0]},${p[1]}`).join(' ')} L340,80 L0,80 Z`;
            const line = `M${pts[0][0]},${pts[0][1]} ${pts.slice(1).map(p => `L${p[0]},${p[1]}`).join(' ')}`;
            return (
              <>
                <path d={area} fill="url(#areaGrad)" />
                <path d={line} fill="none" stroke={theme.primary} strokeWidth="2" strokeLinejoin="round" />
                {DAYS.map((d, i) => {
                  if (d.risk < 2) return null;
                  return <circle key={i} cx={pts[i][0]} cy={pts[i][1]} r="4.5" fill={d.risk >= 3 ? theme.danger : theme.warning} />;
                })}
                {DAYS.map((d, i) => {
                  if (!d.income) return null;
                  return <circle key={`inc${i}`} cx={pts[i][0]} cy={pts[i][1]} r="4.5" fill={theme.success} />;
                })}
              </>
            );
          })()}
        </svg>
        <div style={{ display:'flex', justifyContent:'space-between', marginTop:4 }}>
          <span style={{ fontSize:9, color:theme.textMuted }}>Mar 22</span>
          <span style={{ fontSize:9, color:theme.textMuted }}>Apr 4</span>
        </div>
        <div style={{ display:'flex', gap:12, marginTop:8 }}>
          {[{c:theme.primary,l:'Balance'},{c:theme.danger,l:'Risk day'},{c:theme.success,l:'Income'}].map((x,i) => (
            <div key={i} style={{ display:'flex', alignItems:'center', gap:4 }}>
              <div style={{ width:7, height:7, borderRadius:'50%', background:x.c }} />
              <span style={{ fontSize:9, color:theme.textSub }}>{x.l}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── BILLS SCREEN ─────────────────────────────────────────────────────────────
function BillsScreen({ theme }) {
  const [filter, setFilter] = useState('all');
  const filters = [
    { id:'all',        label:'All' },
    { id:'alert',      label:'⚠️ Alerts' },
    { id:'trial',      label:'Trials' },
    { id:'price_hike', label:'Price ↑' },
  ];
  const filtered = filter === 'all'        ? SUBS
    : filter === 'alert'      ? SUBS.filter(s => s.alert)
    : filter === 'trial'      ? SUBS.filter(s => s.trial)
    : filter === 'price_hike' ? SUBS.filter(s => s.alert === 'price_hike')
    : SUBS;
  const totalMo = SUBS.reduce((s, sub) => s + sub.amt, 0);

  return (
    <div style={{ height:'100%', overflowY:'auto', background:theme.bg, padding:'0 16px 16px' }}>

      {/* Header */}
      <div style={{ paddingTop:4, paddingBottom:12 }}>
        <div style={{ fontSize:11, color:theme.textSub, fontWeight:700, letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:2 }}>DETECTED BILLS</div>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end' }}>
          <div style={{ fontSize:23, fontWeight:800, color:theme.text }}>Subscriptions</div>
          <div>
            <span style={{ fontSize:22, fontWeight:800, color:theme.text }}>${totalMo.toFixed(0)}</span>
            <span style={{ fontSize:11, color:theme.textSub, fontWeight:500 }}>/mo</span>
          </div>
        </div>
      </div>

      {/* Summary chips */}
      <div style={{ display:'flex', gap:7, marginBottom:12 }}>
        {[
          { val:'3', label:'Need Action', color:theme.danger, bg:theme.dangerDim },
          { val:'2', label:'Price Hikes',  color:theme.warning, bg:theme.warningDim },
          { val:'1', label:'Trials',        color:theme.info, bg:theme.infoDim },
          { val:String(SUBS.length), label:'Total', color:theme.textSub, bg:theme.surface2 },
        ].map((s,i) => (
          <div key={i} style={{
            flex:1, background:s.bg, border:`1px solid ${s.color}40`,
            borderRadius:12, padding:'8px 6px', textAlign:'center',
          }}>
            <div style={{ fontSize:17, fontWeight:800, color:s.color }}>{s.val}</div>
            <div style={{ fontSize:9, fontWeight:700, color:theme.textSub, lineHeight:1.2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filter pills */}
      <div style={{ display:'flex', gap:6, marginBottom:12, overflowX:'auto' }}>
        {filters.map(f => (
          <div
            key={f.id}
            onClick={() => setFilter(f.id)}
            style={{
              padding:'5px 14px', borderRadius:20, cursor:'pointer', flexShrink:0,
              background: filter === f.id ? theme.primary : theme.card,
              border:`1px solid ${filter === f.id ? theme.primary : theme.cardBorder}`,
              color: filter === f.id ? '#000' : theme.textSub,
              fontSize:12, fontWeight:700, transition:'all 0.15s',
            }}
          >{f.label}</div>
        ))}
      </div>

      {/* List */}
      <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
        {filtered.map(sub => {
          const alertBorder =
            sub.alert === 'trial'      ? theme.warning + '55' :
            sub.alert === 'price_hike' ? theme.danger  + '55' :
            sub.alert === 'overlap'    ? theme.danger  + '55' :
            sub.alert === 'duplicate'  ? theme.info    + '55' :
            theme.cardBorder;
          return (
            <div key={sub.id} style={{
              background:theme.card, border:`1px solid ${alertBorder}`,
              borderRadius:14, padding:'12px 14px',
            }}>
              <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                <div style={{
                  width:42, height:42, borderRadius:13, background:theme.surface2,
                  display:'flex', alignItems:'center', justifyContent:'center',
                  fontSize:21, flexShrink:0,
                }}>{sub.emoji}</div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:5, flexWrap:'wrap', marginBottom:2 }}>
                    <span style={{ fontSize:14, fontWeight:700, color:theme.text }}>{sub.name}</span>
                    {sub.trial && <span style={{ fontSize:9, fontWeight:800, color:theme.warning, background:theme.warningDim, padding:'1px 5px', borderRadius:4 }}>TRIAL</span>}
                    {sub.alert === 'price_hike' && <span style={{ fontSize:9, fontWeight:800, color:theme.danger, background:theme.dangerDim, padding:'1px 5px', borderRadius:4 }}>PRICE ↑</span>}
                    {sub.alert === 'duplicate'  && <span style={{ fontSize:9, fontWeight:800, color:theme.info, background:theme.infoDim, padding:'1px 5px', borderRadius:4 }}>DUPE</span>}
                    {sub.alert === 'overlap'    && <span style={{ fontSize:9, fontWeight:800, color:theme.warning, background:theme.warningDim, padding:'1px 5px', borderRadius:4 }}>OVERLAP</span>}
                  </div>
                  <div style={{ fontSize:11, color:theme.textSub }}>{sub.cat} · due in {sub.next}d</div>
                </div>
                <div style={{ textAlign:'right', flexShrink:0 }}>
                  <div style={{ fontSize:15, fontWeight:800, color:theme.text }}>
                    ${sub.amt.toFixed(2)}<span style={{ fontSize:9, color:theme.textSub }}>/mo</span>
                  </div>
                  {sub.priceChange && (
                    <div style={{ fontSize:10, color:theme.textMuted, textDecoration:'line-through' }}>
                      ${sub.priceChange.old.toFixed(2)}
                    </div>
                  )}
                </div>
              </div>

              {sub.alert && (
                <div style={{ marginTop:10, paddingTop:8, borderTop:`1px solid ${theme.border}`, display:'flex', gap:6 }}>
                  {sub.alert === 'trial' && <>
                    <div style={{ flex:1, padding:'6px 0', background:theme.dangerDim, borderRadius:8, textAlign:'center', fontSize:11, fontWeight:700, color:theme.danger, cursor:'pointer' }}>Cancel Trial</div>
                    <div style={{ flex:1, padding:'6px 0', background:theme.surface2, borderRadius:8, textAlign:'center', fontSize:11, fontWeight:600, color:theme.textSub, cursor:'pointer' }}>Keep It</div>
                  </>}
                  {sub.alert === 'price_hike' && <>
                    <div style={{ flex:1, padding:'6px 0', background:theme.dangerDim, borderRadius:8, textAlign:'center', fontSize:11, fontWeight:700, color:theme.danger, cursor:'pointer' }}>Downgrade</div>
                    <div style={{ flex:1, padding:'6px 0', background:theme.surface2, borderRadius:8, textAlign:'center', fontSize:11, fontWeight:600, color:theme.textSub, cursor:'pointer' }}>Keep Plan</div>
                  </>}
                  {sub.alert === 'duplicate' && <>
                    <div style={{ flex:1, padding:'6px 0', background:theme.primaryDim, borderRadius:8, textAlign:'center', fontSize:11, fontWeight:700, color:theme.primary, cursor:'pointer' }}>Compare</div>
                    <div style={{ flex:1, padding:'6px 0', background:theme.dangerDim, borderRadius:8, textAlign:'center', fontSize:11, fontWeight:700, color:theme.danger, cursor:'pointer' }}>Cancel One</div>
                  </>}
                  {sub.alert === 'overlap' && (
                    <div style={{ flex:1, padding:'6px 0', background:theme.warningDim, borderRadius:8, textAlign:'center', fontSize:11, fontWeight:700, color:theme.warning, cursor:'pointer' }}>Shift Payment Date</div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── ALERTS SCREEN ────────────────────────────────────────────────────────────
function AlertsScreen({ theme }) {
  const [dismissed, setDismissed] = useState([]);
  const XIcon = window.lucide.X;

  const typeColors = {
    danger:  theme.danger,
    warning: theme.warning,
    info:    theme.info,
    success: theme.success,
  };
  const typeBgs = {
    danger:  theme.dangerDim,
    warning: theme.warningDim,
    info:    theme.infoDim,
    success: theme.successDim,
  };

  const visible = ALERTS_DATA.filter(a => !dismissed.includes(a.id));
  const unread  = visible.filter(a => !a.read).length;

  const getIcon = (name) => {
    const map = {
      AlertTriangle: window.lucide.AlertTriangle,
      TrendingUp:    window.lucide.TrendingUp,
      Clock:         window.lucide.Clock,
      Copy:          window.lucide.Copy,
      ShieldCheck:   window.lucide.ShieldCheck,
    };
    return map[name] || window.lucide.Bell;
  };

  return (
    <div style={{ height:'100%', overflowY:'auto', background:theme.bg, padding:'0 16px 16px' }}>

      {/* Header */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', paddingTop:4, paddingBottom:14 }}>
        <div>
          <div style={{ fontSize:11, color:theme.textSub, fontWeight:700, letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:2 }}>NOTIFICATIONS</div>
          <div style={{ fontSize:23, fontWeight:800, color:theme.text }}>
            Alerts{' '}
            {unread > 0 && (
              <span style={{
                fontSize:11, fontWeight:800,
                background:theme.danger, color:'#fff',
                padding:'2px 7px', borderRadius:10, verticalAlign:'middle',
              }}>{unread} new</span>
            )}
          </div>
        </div>
        {unread > 0 && (
          <div style={{ fontSize:12, color:theme.primary, fontWeight:700, cursor:'pointer' }}>Mark all read</div>
        )}
      </div>

      <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
        {visible.map(alert => {
          const color  = typeColors[alert.type];
          const bg     = typeBgs[alert.type];
          const Icon   = getIcon(alert.icon);
          return (
            <div key={alert.id} style={{
              background:theme.card,
              border:`1px solid ${color}40`,
              borderLeft:`3px solid ${color}`,
              borderRadius:16, padding:14,
              position:'relative',
            }}>
              {!alert.read && (
                <div style={{
                  position:'absolute', top:12, right:12,
                  width:7, height:7, borderRadius:'50%', background:color,
                }} />
              )}

              {/* Icon + title */}
              <div style={{ display:'flex', gap:10, alignItems:'flex-start', marginBottom:10 }}>
                <div style={{
                  width:38, height:38, borderRadius:11,
                  background:bg, border:`1px solid ${color}30`,
                  display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0,
                }}>
                  <Icon size={17} color={color} />
                </div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize:13, fontWeight:800, color:theme.text, marginBottom:3 }}>{alert.title}</div>
                  <div style={{ fontSize:12, color:theme.textSub, lineHeight:1.45 }}>{alert.msg}</div>
                </div>
              </div>

              {/* Impact + time */}
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10 }}>
                <div style={{
                  background:bg, border:`1px solid ${color}35`,
                  borderRadius:6, padding:'3px 9px',
                  fontSize:11, fontWeight:800, color:color,
                }}>{alert.impact}</div>
                <div style={{ fontSize:10, color:theme.textMuted }}>{alert.time}</div>
              </div>

              {/* Actions */}
              <div style={{ display:'flex', gap:6 }}>
                {alert.actions.map((action, ai) => (
                  <div key={ai} style={{
                    flex:1, padding:'7px 6px', cursor:'pointer',
                    background: ai === 0 ? bg : theme.surface2,
                    border:`1px solid ${ai === 0 ? color + '50' : theme.border}`,
                    borderRadius:9, textAlign:'center',
                    fontSize:11, fontWeight:700,
                    color: ai === 0 ? color : theme.textSub,
                  }}>{action}</div>
                ))}
                <div
                  onClick={() => setDismissed(d => [...d, alert.id])}
                  style={{
                    width:34, height:34, background:theme.surface2,
                    border:`1px solid ${theme.border}`, borderRadius:9,
                    display:'flex', alignItems:'center', justifyContent:'center',
                    cursor:'pointer', flexShrink:0,
                  }}
                >
                  <XIcon size={13} color={theme.textSub} />
                </div>
              </div>
            </div>
          );
        })}

        {visible.length === 0 && (
          <div style={{ textAlign:'center', paddingTop:60, color:theme.textSub }}>
            <div style={{ fontSize:36, marginBottom:10 }}>🎉</div>
            <div style={{ fontSize:17, fontWeight:800, color:theme.text, marginBottom:4 }}>All clear!</div>
            <div style={{ fontSize:13 }}>No active alerts right now.</div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── SETTINGS SCREEN ──────────────────────────────────────────────────────────
function SettingsScreen({ theme, isDark, setIsDark }) {
  const SunIcon          = window.lucide.Sun;
  const MoonIcon         = window.lucide.Moon;
  const ChevronRightIcon = window.lucide.ChevronRight;
  const LogOutIcon       = window.lucide.LogOut;
  const ShieldIcon       = window.lucide.Shield;

  const [notifs, setNotifs] = useState({ priceHikes:true, trialEnd:true, cashRisk:true, weekly:true });

  const toggle = (key) => setNotifs(prev => ({ ...prev, [key]: !prev[key] }));

  const Switch = ({ on, onToggle }) => (
    <div
      onClick={onToggle}
      style={{
        width:48, height:27, borderRadius:13.5, flexShrink:0,
        background: on ? theme.primary : theme.border,
        position:'relative', cursor:'pointer', transition:'background 0.2s',
      }}
    >
      <div style={{
        position:'absolute', top:3,
        left: on ? 23 : 3,
        width:21, height:21, borderRadius:'50%',
        background:'#fff', boxShadow:'0 1px 4px rgba(0,0,0,0.25)',
        transition:'left 0.2s', display:'flex', alignItems:'center', justifyContent:'center',
      }}>
        {on
          ? <MoonIcon size={9} color={theme.primary} />
          : <SunIcon  size={9} color={theme.warning} />
        }
      </div>
    </div>
  );

  return (
    <div style={{ height:'100%', overflowY:'auto', background:theme.bg, padding:'0 16px 16px' }}>

      {/* Header */}
      <div style={{ paddingTop:4, paddingBottom:14 }}>
        <div style={{ fontSize:11, color:theme.textSub, fontWeight:700, letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:2 }}>CONFIGURATION</div>
        <div style={{ fontSize:23, fontWeight:800, color:theme.text }}>Settings</div>
      </div>

      {/* Profile */}
      <div style={{
        background:theme.card, border:`1px solid ${theme.cardBorder}`,
        borderRadius:16, padding:14, marginBottom:12,
        display:'flex', alignItems:'center', gap:12,
      }}>
        <div style={{
          width:52, height:52, borderRadius:16, flexShrink:0,
          background:`linear-gradient(135deg, ${theme.primary}, ${theme.info})`,
          display:'flex', alignItems:'center', justifyContent:'center',
          fontSize:20, fontWeight:800, color:'#000',
        }}>M</div>
        <div style={{ flex:1 }}>
          <div style={{ fontSize:15, fontWeight:700, color:theme.text }}>Maya Chen</div>
          <div style={{ fontSize:12, color:theme.textSub }}>maya@email.com · Free Plan</div>
        </div>
        <div style={{
          background:theme.primaryDim, border:`1px solid ${theme.primary}50`,
          borderRadius:8, padding:'5px 12px',
          fontSize:11, fontWeight:800, color:theme.primary, cursor:'pointer',
        }}>Upgrade</div>
      </div>

      {/* Appearance */}
      <div style={{
        background:theme.card, border:`1px solid ${theme.cardBorder}`,
        borderRadius:16, padding:14, marginBottom:12,
      }}>
        <div style={{ fontSize:11, fontWeight:700, color:theme.textSub, textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:12 }}>Appearance</div>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <div style={{
              width:36, height:36, borderRadius:10,
              background: isDark ? 'rgba(91,158,255,0.12)' : 'rgba(255,176,32,0.12)',
              display:'flex', alignItems:'center', justifyContent:'center',
            }}>
              {isDark ? <MoonIcon size={17} color={theme.info} /> : <SunIcon size={17} color={theme.warning} />}
            </div>
            <div>
              <div style={{ fontSize:14, fontWeight:700, color:theme.text }}>{isDark ? 'Dark Mode' : 'Light Mode'}</div>
              <div style={{ fontSize:11, color:theme.textSub }}>Toggle app appearance</div>
            </div>
          </div>
          <Switch on={isDark} onToggle={() => setIsDark(!isDark)} />
        </div>
      </div>

      {/* Notifications */}
      <div style={{
        background:theme.card, border:`1px solid ${theme.cardBorder}`,
        borderRadius:16, padding:14, marginBottom:12,
      }}>
        <div style={{ fontSize:11, fontWeight:700, color:theme.textSub, textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:12 }}>Notifications</div>
        {[
          { key:'priceHikes', label:'Price Hike Alerts',    sub:'When subscriptions raise prices' },
          { key:'trialEnd',   label:'Trial Expiry Warnings', sub:'3 days before a trial ends' },
          { key:'cashRisk',   label:'Cash Flow Warnings',    sub:'When balance risk is detected' },
          { key:'weekly',     label:'Weekly Summary',        sub:'Every Monday morning' },
        ].map((n, i, arr) => (
          <div key={n.key} style={{
            display:'flex', alignItems:'center', justifyContent:'space-between',
            paddingBottom: i < arr.length-1 ? 12 : 0,
            marginBottom: i < arr.length-1 ? 12 : 0,
            borderBottom: i < arr.length-1 ? `1px solid ${theme.border}` : 'none',
          }}>
            <div>
              <div style={{ fontSize:13, fontWeight:600, color:theme.text }}>{n.label}</div>
              <div style={{ fontSize:11, color:theme.textSub }}>{n.sub}</div>
            </div>
            <div
              onClick={() => toggle(n.key)}
              style={{
                width:44, height:25, borderRadius:12.5, flexShrink:0,
                background: notifs[n.key] ? theme.primary : theme.border,
                position:'relative', cursor:'pointer', transition:'background 0.2s',
              }}
            >
              <div style={{
                position:'absolute', top:2.5,
                left: notifs[n.key] ? 21 : 2.5,
                width:20, height:20, borderRadius:'50%',
                background:'#fff', boxShadow:'0 1px 3px rgba(0,0,0,0.2)',
                transition:'left 0.2s',
              }} />
            </div>
          </div>
        ))}
      </div>

      {/* Connected Accounts */}
      <div style={{
        background:theme.card, border:`1px solid ${theme.cardBorder}`,
        borderRadius:16, padding:14, marginBottom:12,
      }}>
        <div style={{ fontSize:11, fontWeight:700, color:theme.textSub, textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:12 }}>Connected Accounts</div>
        {[
          { emoji:'🏦', label:'Chase Checking ••••4521', sub:'Synced 2h ago',  color:theme.info },
          { emoji:'💳', label:'Amex Gold ••••8903',      sub:'Synced 1h ago',  color:theme.warning },
          { emoji:'➕', label:'Connect account',          sub:'Add bank or card', color:theme.primary },
        ].map((acc, i, arr) => (
          <div key={i} style={{
            display:'flex', alignItems:'center', gap:10, cursor:'pointer',
            paddingBottom: i < arr.length-1 ? 12 : 0,
            marginBottom: i < arr.length-1 ? 12 : 0,
            borderBottom: i < arr.length-1 ? `1px solid ${theme.border}` : 'none',
          }}>
            <div style={{
              width:36, height:36, borderRadius:10,
              background:theme.surface2, fontSize:18,
              display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0,
            }}>{acc.emoji}</div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:13, fontWeight:600, color: i === 2 ? acc.color : theme.text }}>{acc.label}</div>
              <div style={{ fontSize:11, color:theme.textSub }}>{acc.sub}</div>
            </div>
            <ChevronRightIcon size={14} color={theme.textMuted} />
          </div>
        ))}
      </div>

      {/* Security */}
      <div style={{
        background:theme.card, border:`1px solid ${theme.cardBorder}`,
        borderRadius:16, padding:14, marginBottom:12,
        display:'flex', alignItems:'center', gap:10, cursor:'pointer',
      }}>
        <div style={{
          width:36, height:36, borderRadius:10,
          background:theme.primaryDim, border:`1px solid ${theme.primary}40`,
          display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0,
        }}>
          <ShieldIcon size={16} color={theme.primary} />
        </div>
        <div style={{ flex:1 }}>
          <div style={{ fontSize:13, fontWeight:600, color:theme.text }}>Privacy & Security</div>
          <div style={{ fontSize:11, color:theme.textSub }}>Face ID, data access, export</div>
        </div>
        <ChevronRightIcon size={14} color={theme.textMuted} />
      </div>

      {/* Sign Out */}
      <div style={{
        background:theme.dangerDim, border:`1px solid ${theme.danger}35`,
        borderRadius:16, padding:14, display:'flex', alignItems:'center', gap:10, cursor:'pointer',
      }}>
        <LogOutIcon size={16} color={theme.danger} />
        <span style={{ fontSize:14, fontWeight:700, color:theme.danger }}>Sign Out</span>
      </div>
    </div>
  );
}

// ─── BOTTOM NAV ───────────────────────────────────────────────────────────────
function BottomNav({ activeTab, setActiveTab, theme }) {
  const tabs = [
    { id:'home',     Icon:window.lucide.Home,       label:'Home' },
    { id:'forecast', Icon:window.lucide.Calendar,   label:'Forecast' },
    { id:'bills',    Icon:window.lucide.CreditCard, label:'Bills' },
    { id:'alerts',   Icon:window.lucide.Bell,       label:'Alerts',  badge:3 },
    { id:'settings', Icon:window.lucide.Settings,   label:'Settings' },
  ];

  return (
    <div style={{
      display:'flex', background:theme.navBg,
      borderTop:`1px solid ${theme.border}`,
      paddingTop:6, paddingBottom:10, flexShrink:0,
    }}>
      {tabs.map(({ id, Icon, label, badge }) => {
        const active = activeTab === id;
        return (
          <div
            key={id}
            onClick={() => setActiveTab(id)}
            style={{
              flex:1, display:'flex', flexDirection:'column', alignItems:'center',
              gap:2, cursor:'pointer', padding:'2px 0', position:'relative',
            }}
          >
            <div style={{
              width:40, height:36, borderRadius:12,
              background: active ? theme.primaryDim : 'transparent',
              border: active ? `1px solid ${theme.primary}35` : '1px solid transparent',
              display:'flex', alignItems:'center', justifyContent:'center',
              transition:'all 0.15s',
              position:'relative',
            }}>
              <Icon size={20} color={active ? theme.primary : theme.textSub} strokeWidth={active ? 2.2 : 1.8} />
              {badge && !active && (
                <div style={{
                  position:'absolute', top:-2, right:-2,
                  width:15, height:15, borderRadius:'50%',
                  background:theme.danger, border:`2px solid ${theme.navBg}`,
                  fontSize:8, fontWeight:800, color:'#fff',
                  display:'flex', alignItems:'center', justifyContent:'center',
                }}>{badge}</div>
              )}
            </div>
            <span style={{
              fontSize:9, fontWeight: active ? 800 : 500,
              color: active ? theme.primary : theme.textMuted,
              letterSpacing: active ? '-0.2px' : '0',
            }}>{label}</span>
          </div>
        );
      })}
    </div>
  );
}

// ─── APP ROOT ─────────────────────────────────────────────────────────────────
function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isDark, setIsDark]       = useState(true);
  const theme = isDark ? themes.dark : themes.light;

  useEffect(() => {
    const link = document.createElement('link');
    link.rel  = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,600&display=swap';
    document.head.appendChild(link);

    const style = document.createElement('style');
    style.textContent = `
      *, *::before, *::after {
        font-family: 'Plus Jakarta Sans', sans-serif !important;
        box-sizing: border-box;
        -webkit-tap-highlight-color: transparent;
      }
      ::-webkit-scrollbar { display: none; }
      body { margin: 0; padding: 20px 0; background: #080808; }
    `;
    document.head.appendChild(style);
  }, []);

  const screens = {
    home:     <DashboardScreen theme={theme} isDark={isDark} />,
    forecast: <ForecastScreen theme={theme} />,
    bills:    <BillsScreen theme={theme} />,
    alerts:   <AlertsScreen theme={theme} />,
    settings: <SettingsScreen theme={theme} isDark={isDark} setIsDark={setIsDark} />,
  };

  return (
    <div style={{
      display:'flex', alignItems:'center', justifyContent:'center',
      minHeight:'100vh', background:'#080808',
      fontFamily:"'Plus Jakarta Sans', sans-serif",
    }}>
      <div style={{
        width:375, height:812,
        background:theme.bg,
        borderRadius:52,
        overflow:'hidden',
        position:'relative',
        boxShadow:`
          0 60px 120px rgba(0,0,0,0.75),
          0 0 0 1px rgba(255,255,255,0.08),
          inset 0 0 0 1px rgba(255,255,255,0.04)
        `,
        display:'flex', flexDirection:'column',
        transition:'background 0.3s ease',
      }}>
        <StatusBar theme={theme} />
        <DynamicIsland />

        {/* Screen content with fade transitions */}
        <div style={{ flex:1, overflow:'hidden', position:'relative' }}>
          {Object.entries(screens).map(([key, screen]) => (
            <div key={key} style={{
              position:'absolute', inset:0,
              opacity: activeTab === key ? 1 : 0,
              pointerEvents: activeTab === key ? 'auto' : 'none',
              transition:'opacity 0.18s ease',
              overflow:'hidden',
            }}>
              {screen}
            </div>
          ))}
        </div>

        <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} theme={theme} />
      </div>
    </div>
  );
}
