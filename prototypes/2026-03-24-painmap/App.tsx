// PainMap — Track symptoms where life happens.
// Design System: Soft UI Evolution + Inclusive Design
// Style: Empathetic, trustworthy, calming violet palette
// Font: Plus Jakarta Sans

const { useState, useEffect, useRef } = React;

// ─────────────────────────────────────────────
//  THEME DEFINITIONS
// ─────────────────────────────────────────────
const themes = {
  light: {
    bg: '#F8F7FF',
    surface: '#FFFFFF',
    surfaceAlt: '#F1EFF9',
    card: '#FFFFFF',
    primary: '#7C3AED',
    primaryMid: '#9333EA',
    primaryLight: '#EDE9FE',
    primaryGrad: 'linear-gradient(135deg, #7C3AED 0%, #9333EA 100%)',
    accent: '#F43F5E',
    accentLight: '#FFE4E8',
    cyan: '#06B6D4',
    cyanLight: '#ECFEFF',
    text: '#1E1B2E',
    subtext: '#6B6A8A',
    muted: '#A09ABF',
    border: '#E8E5F5',
    success: '#10B981',
    warning: '#F59E0B',
    danger: '#EF4444',
    shadow: '0 4px 20px rgba(124,58,237,0.12)',
    shadowSm: '0 2px 8px rgba(124,58,237,0.08)',
    notch: '#000',
    statusText: '#1E1B2E',
  },
  dark: {
    bg: '#0D0B18',
    surface: '#1A1729',
    surfaceAlt: '#211E34',
    card: '#231F38',
    primary: '#A78BFA',
    primaryMid: '#9333EA',
    primaryLight: '#2D2550',
    primaryGrad: 'linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)',
    accent: '#F87171',
    accentLight: '#3B1A1A',
    cyan: '#22D3EE',
    cyanLight: '#0A2A32',
    text: '#F4F2FF',
    subtext: '#A09ABF',
    muted: '#6B6A8A',
    border: '#2E2A44',
    success: '#34D399',
    warning: '#FBBF24',
    danger: '#F87171',
    shadow: '0 4px 20px rgba(0,0,0,0.45)',
    shadowSm: '0 2px 8px rgba(0,0,0,0.3)',
    notch: '#000',
    statusText: '#F4F2FF',
  }
};

// ─────────────────────────────────────────────
//  SAMPLE DATA
// ─────────────────────────────────────────────
const recentLogs = [
  { id: 1, time: '2:30 PM', area: 'Head', intensity: 7, type: 'Throbbing', tags: ['bright light', 'stress'] },
  { id: 2, time: '9:15 AM', area: 'Lower Back', intensity: 4, type: 'Aching', tags: ['long sit', 'morning'] },
  { id: 3, time: 'Yesterday', area: 'Joints', intensity: 6, type: 'Stiffness', tags: ['weather change'] },
];

const weekData = [6, 4, 7, 3, 8, 5, 4];
const weekDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

const triggerData = [
  { name: 'Poor Sleep', pct: 85, color: '#7C3AED' },
  { name: 'High Stress', pct: 72, color: '#9333EA' },
  { name: 'Skipped Meals', pct: 68, color: '#F43F5E' },
  { name: 'Screen Time', pct: 61, color: '#F97316' },
  { name: 'Weather Shift', pct: 54, color: '#EAB308' },
];

// ─────────────────────────────────────────────
//  UTILITY COMPONENTS
// ─────────────────────────────────────────────
function StatusBar({ t }) {
  return (
    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'12px 24px 0', height:'44px' }}>
      <span style={{ fontSize:14, fontWeight:700, color:t.statusText, fontFamily:"'Plus Jakarta Sans',sans-serif" }}>9:41</span>
      <div style={{ display:'flex', gap:6, alignItems:'center' }}>
        {/* Signal bars */}
        <div style={{ display:'flex', gap:2, alignItems:'flex-end' }}>
          {[4,6,8,11].map((h,i) => (
            <div key={i} style={{ width:3, height:h, borderRadius:1.5, background: i<3 ? t.statusText : t.muted, opacity: i<3?1:0.4 }} />
          ))}
        </div>
        {/* WiFi */}
        <svg width="16" height="12" viewBox="0 0 16 12">
          <circle cx="8" cy="11" r="1.5" fill={t.statusText}/>
          <path d="M4.8 7.8 C5.9 6.4 6.9 5.8 8 5.8s2.1.6 3.2 2" stroke={t.statusText} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          <path d="M2 4.5C3.7 2.3 5.7 1.2 8 1.2s4.3 1.1 6 3.3" stroke={t.statusText} strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.5"/>
        </svg>
        {/* Battery */}
        <div style={{ display:'flex', alignItems:'center' }}>
          <div style={{ width:22, height:11, border:`1.5px solid ${t.statusText}`, borderRadius:3, padding:1.5, display:'flex' }}>
            <div style={{ width:'80%', background:t.statusText, borderRadius:1 }} />
          </div>
          <div style={{ width:2, height:5, background:t.statusText, borderRadius:'0 1px 1px 0', marginLeft:0.5 }} />
        </div>
      </div>
    </div>
  );
}

function DynamicIsland() {
  return (
    <div style={{ display:'flex', justifyContent:'center', paddingTop:10 }}>
      <div style={{ width:120, height:34, background:'#000', borderRadius:20 }} />
    </div>
  );
}

function PainBadge({ level, size='sm' }) {
  const colors = ['#22C55E','#84CC16','#EAB308','#F97316','#F97316','#EF4444','#EF4444','#DC2626','#DC2626','#991B1B'];
  const c = colors[Math.min((level||1)-1, 9)];
  const sz = size==='lg' ? {w:52,h:52,fs:22} : size==='md' ? {w:36,h:36,fs:15} : {w:28,h:28,fs:12};
  return (
    <div style={{ width:sz.w, height:sz.h, borderRadius:'50%', background:c, display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontWeight:800, fontSize:sz.fs, flexShrink:0, boxShadow:`0 4px 12px ${c}55` }}>
      {level}
    </div>
  );
}

function Tag({ label, color, bg }) {
  return (
    <span style={{ fontSize:10, padding:'3px 8px', background:bg, color, borderRadius:20, fontWeight:600, whiteSpace:'nowrap' }}>
      {label}
    </span>
  );
}

function SectionLabel({ children, t, action, onAction }) {
  return (
    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10 }}>
      <p style={{ fontSize:11, fontWeight:700, color:t.muted, textTransform:'uppercase', letterSpacing:'0.07em', margin:0 }}>{children}</p>
      {action && <span onClick={onAction} style={{ fontSize:12, color:t.primary, fontWeight:600, cursor:'pointer' }}>{action}</span>}
    </div>
  );
}

// ─────────────────────────────────────────────
//  ONBOARDING SCREEN
// ─────────────────────────────────────────────
function OnboardingScreen({ t, isDark, onDone }) {
  const [slide, setSlide] = useState(0);

  const slides = [
    {
      icon: '🗺️',
      gradient: 'linear-gradient(135deg, #7C3AED 0%, #A855F7 100%)',
      title: 'Map your pain,\nnot just log it.',
      desc: 'Tap where you hurt, rate the intensity, and add context — all in under 15 seconds. No long forms.',
    },
    {
      icon: '⚡',
      gradient: 'linear-gradient(135deg, #F43F5E 0%, #F97316 100%)',
      title: 'Predict flares\nbefore they hit.',
      desc: 'PainMap spots patterns across sleep, stress, weather & meals to warn you a day early.',
    },
    {
      icon: '📋',
      gradient: 'linear-gradient(135deg, #06B6D4 0%, #3B82F6 100%)',
      title: 'Doctor-ready\nreports, instantly.',
      desc: 'Walk into every appointment with a clear 30-day summary — no more relying on memory.',
    },
  ];

  const s = slides[slide];

  return (
    <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' }}>
      {/* Illustration area */}
      <div style={{ background:s.gradient, flex:'0 0 52%', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', position:'relative', overflow:'hidden' }}>
        {/* Decorative circles */}
        <div style={{ position:'absolute', top:-60, right:-60, width:180, height:180, borderRadius:'50%', background:'rgba(255,255,255,0.08)' }} />
        <div style={{ position:'absolute', bottom:-40, left:-40, width:140, height:140, borderRadius:'50%', background:'rgba(255,255,255,0.06)' }} />
        <div style={{ fontSize:72, filter:'drop-shadow(0 8px 24px rgba(0,0,0,0.25))', transition:'all 0.3s', zIndex:1 }}>{s.icon}</div>

        {/* Slide dots */}
        <div style={{ position:'absolute', bottom:24, display:'flex', gap:8 }}>
          {slides.map((_,i) => (
            <div key={i} onClick={() => setSlide(i)} style={{ width: slide===i ? 24 : 8, height:8, borderRadius:4, background: slide===i ? '#fff' : 'rgba(255,255,255,0.4)', transition:'all 0.25s', cursor:'pointer' }} />
          ))}
        </div>
      </div>

      {/* Text area */}
      <div style={{ flex:1, display:'flex', flexDirection:'column', padding:'32px 28px 24px', background:t.bg }}>
        <h2 style={{ fontSize:26, fontWeight:800, color:t.text, margin:'0 0 12px', lineHeight:1.25, whiteSpace:'pre-line' }}>{s.title}</h2>
        <p style={{ fontSize:14, color:t.subtext, lineHeight:1.65, margin:'0 0 auto', flex:1 }}>{s.desc}</p>

        <div style={{ display:'flex', gap:12, marginTop:24 }}>
          {slide < slides.length - 1 ? (
            <>
              <button onClick={onDone} style={{ flex:1, padding:'14px', background:'transparent', color:t.muted, border:`1.5px solid ${t.border}`, borderRadius:14, fontSize:14, fontWeight:600, cursor:'pointer' }}>Skip</button>
              <button onClick={() => setSlide(s => s+1)} style={{ flex:2, padding:'14px', background:t.primaryGrad, color:'#fff', border:'none', borderRadius:14, fontSize:14, fontWeight:700, cursor:'pointer' }}>Continue →</button>
            </>
          ) : (
            <button onClick={onDone} style={{ flex:1, padding:'16px', background:t.primaryGrad, color:'#fff', border:'none', borderRadius:14, fontSize:15, fontWeight:700, cursor:'pointer', boxShadow:'0 8px 24px rgba(124,58,237,0.35)' }}>Get Started →</button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
//  HOME SCREEN
// ─────────────────────────────────────────────
function HomeScreen({ t, isDark, setActiveTab }) {
  return (
    <div style={{ flex:1, overflowY:'auto', paddingBottom:20 }}>
      {/* Header */}
      <div style={{ padding:'14px 20px 10px', display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
        <div>
          <p style={{ fontSize:13, color:t.subtext, margin:0 }}>Good afternoon,</p>
          <h2 style={{ fontSize:22, fontWeight:800, color:t.text, margin:'2px 0 0' }}>Sarah ✦</h2>
        </div>
        <div style={{ width:40, height:40, borderRadius:'50%', background:t.primaryGrad, display:'flex', alignItems:'center', justifyContent:'center', boxShadow:t.shadow, position:'relative' }}>
          <span style={{ fontSize:18 }}>👤</span>
          <div style={{ position:'absolute', top:0, right:0, width:12, height:12, borderRadius:'50%', background:t.accent, border:`2px solid ${t.bg}` }} />
        </div>
      </div>

      {/* Flare Warning */}
      <div style={{ margin:'0 16px 14px', padding:'16px 18px', background:t.primaryGrad, borderRadius:18, color:'#fff', boxShadow:'0 8px 28px rgba(124,58,237,0.35)' }}>
        <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:6 }}>
          <div style={{ width:8, height:8, borderRadius:'50%', background:'#FCD34D', boxShadow:'0 0 8px #FCD34D' }} />
          <span style={{ fontSize:11, fontWeight:700, letterSpacing:'0.06em', opacity:0.9 }}>FLARE PREVIEW · TOMORROW</span>
        </div>
        <p style={{ fontSize:15, fontWeight:700, margin:'0 0 6px', lineHeight:1.3 }}>Elevated risk detected</p>
        <p style={{ fontSize:12, opacity:0.85, margin:'0 0 14px', lineHeight:1.5 }}>Poor sleep + high stress pattern matches 3 of your last 5 flare-ups.</p>
        <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
          {['Poor sleep','High stress','Low hydration'].map(tag => (
            <span key={tag} style={{ fontSize:11, padding:'4px 10px', background:'rgba(255,255,255,0.18)', borderRadius:20, fontWeight:600 }}>{tag}</span>
          ))}
        </div>
      </div>

      {/* Today Stats */}
      <div style={{ padding:'0 16px 14px' }}>
        <SectionLabel t={t}>Today's Overview</SectionLabel>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
          {[
            { label:'Avg Pain', value:'5.2', unit:'/ 10', color:'#F43F5E', bg: isDark?'#3B1A1A':'#FFF0F3', icon:'🌡️' },
            { label:'Logs Today', value:'3', unit:'entries', color:'#7C3AED', bg: isDark?'#2D2550':'#F5F0FF', icon:'📝' },
            { label:'Sleep Last Night', value:'6.5', unit:'hrs', color:'#3B82F6', bg: isDark?'#1E2D4A':'#EFF6FF', icon:'🌙' },
            { label:'Hydration', value:'4', unit:'/ 8 glasses', color:'#06B6D4', bg: isDark?'#0A2A32':'#ECFEFF', icon:'💧' },
          ].map((item,i) => (
            <div key={i} style={{ padding:'14px 14px 12px', background:item.bg, borderRadius:16, border:`1px solid ${isDark?'rgba(255,255,255,0.04)':'rgba(0,0,0,0.04)'}` }}>
              <div style={{ fontSize:22, marginBottom:8 }}>{item.icon}</div>
              <p style={{ fontSize:11, color:t.subtext, margin:'0 0 2px', fontWeight:500 }}>{item.label}</p>
              <div style={{ display:'flex', alignItems:'baseline', gap:3 }}>
                <span style={{ fontSize:24, fontWeight:800, color:item.color }}>{item.value}</span>
                <span style={{ fontSize:11, color:t.muted }}>{item.unit}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Chart */}
      <div style={{ margin:'0 16px 14px', padding:'16px', background:t.surface, borderRadius:18, border:`1px solid ${t.border}`, boxShadow:t.shadowSm }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 }}>
          <p style={{ fontSize:13, fontWeight:700, color:t.text, margin:0 }}>Pain This Week</p>
          <div style={{ display:'flex', gap:12, alignItems:'center' }}>
            <span style={{ fontSize:11, color:t.muted }}>Avg:</span>
            <span style={{ fontSize:13, fontWeight:800, color:t.primary }}>5.3</span>
          </div>
        </div>
        <div style={{ display:'flex', alignItems:'flex-end', gap:5, height:64 }}>
          {weekData.map((val,i) => (
            <div key={i} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:5 }}>
              <div style={{
                width:'100%', height:`${(val/10)*54}px`, borderRadius:'5px 5px 0 0',
                background: i===6 ? t.primaryGrad : (isDark ? t.border : '#E9E4FA'),
                transition:'height 0.4s ease'
              }} />
              <span style={{ fontSize:10, color: i===6 ? t.primary : t.muted, fontWeight: i===6 ? 700 : 400 }}>{weekDays[i]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Logs */}
      <div style={{ padding:'0 16px' }}>
        <SectionLabel t={t} action="See all">Recent Logs</SectionLabel>
        {recentLogs.map(log => (
          <div key={log.id} style={{ display:'flex', alignItems:'center', gap:12, padding:'12px 14px', background:t.surface, borderRadius:14, border:`1px solid ${t.border}`, marginBottom:8, boxShadow:t.shadowSm, cursor:'pointer' }}>
            <PainBadge level={log.intensity} />
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <p style={{ fontSize:14, fontWeight:700, color:t.text, margin:0 }}>{log.area}</p>
                <span style={{ fontSize:11, color:t.muted }}>{log.time}</span>
              </div>
              <p style={{ fontSize:12, color:t.subtext, margin:'2px 0 6px' }}>{log.type}</p>
              <div style={{ display:'flex', gap:4, flexWrap:'wrap' }}>
                {log.tags.map((tag,i) => (
                  <Tag key={i} label={tag} color={t.primary} bg={t.primaryLight} />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Log CTA */}
      <div style={{ padding:'12px 16px 0' }}>
        <button onClick={() => setActiveTab('log')} style={{
          width:'100%', padding:'16px', background:t.primaryGrad, color:'#fff', border:'none', borderRadius:16,
          fontSize:15, fontWeight:700, cursor:'pointer', boxShadow:'0 8px 24px rgba(124,58,237,0.3)',
          display:'flex', alignItems:'center', justifyContent:'center', gap:10
        }}>
          {React.createElement(window.lucide.Plus, { size:18 })}
          Log a Symptom Now
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
//  LOG SCREEN
// ─────────────────────────────────────────────
function LogScreen({ t, isDark }) {
  const [step, setStep] = useState(1);
  const [selectedArea, setSelectedArea] = useState(null);
  const [intensity, setIntensity] = useState(5);
  const [painType, setPainType] = useState(null);
  const [contextTags, setContextTags] = useState([]);
  const [saved, setSaved] = useState(false);

  const areas = ['Head','Neck','Chest','Left Shoulder','Right Shoulder','Abdomen','Upper Back','Lower Back','Left Arm','Right Arm','Hips','Left Knee','Right Knee','Left Foot','Right Foot'];
  const painTypes = ['Throbbing','Sharp','Burning','Aching','Stabbing','Cramping','Pressure','Tingling','Radiating','Pulsing'];
  const tags = ['Poor sleep','High stress','Skipped meal','Screen time','Weather change','Exercise','Alcohol','Caffeine','Long travel','Dehydration'];

  const toggleTag = tag => setContextTags(prev => prev.includes(tag) ? prev.filter(t=>t!==tag) : [...prev,tag]);

  const intensityColor = intensity <= 3 ? '#22C55E' : intensity <= 6 ? '#F97316' : '#EF4444';
  const intensityLabel = intensity <= 2 ? 'Minimal' : intensity <= 4 ? 'Mild' : intensity <= 6 ? 'Moderate' : intensity <= 8 ? 'Severe' : 'Extreme';

  const reset = () => { setStep(1); setSelectedArea(null); setIntensity(5); setPainType(null); setContextTags([]); setSaved(false); };

  if (saved) {
    return (
      <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:32 }}>
        <div style={{ width:80, height:80, borderRadius:'50%', background:t.primaryGrad, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:20, boxShadow:'0 12px 32px rgba(124,58,237,0.4)', fontSize:36 }}>✓</div>
        <h3 style={{ fontSize:22, fontWeight:800, color:t.text, margin:'0 0 8px', textAlign:'center' }}>Logged!</h3>
        <p style={{ fontSize:14, color:t.subtext, textAlign:'center', lineHeight:1.6, margin:'0 0 12px' }}>
          <strong style={{ color:t.primary }}>{selectedArea}</strong> pain at intensity <strong style={{ color:intensityColor }}>{intensity}/10</strong>
        </p>
        <p style={{ fontSize:13, color:t.muted, textAlign:'center', margin:'0 0 32px' }}>{contextTags.length} context signals saved. PainMap is learning your patterns.</p>
        <button onClick={reset} style={{ padding:'14px 32px', background:t.primaryGrad, color:'#fff', border:'none', borderRadius:14, fontSize:14, fontWeight:700, cursor:'pointer' }}>Log Another +</button>
      </div>
    );
  }

  return (
    <div style={{ flex:1, overflowY:'auto', paddingBottom:20 }}>
      <div style={{ padding:'14px 20px 0' }}>
        <h2 style={{ fontSize:20, fontWeight:800, color:t.text, margin:'0 0 4px' }}>Log Symptoms</h2>
        <p style={{ fontSize:13, color:t.subtext, margin:'0 0 14px' }}>Quick capture — under 15 seconds</p>
        {/* Steps */}
        <div style={{ display:'flex', gap:6, marginBottom:20 }}>
          {['Location','Intensity','Context'].map((s,i) => (
            <div key={i} style={{ flex:1, display:'flex', flexDirection:'column', gap:5, alignItems:'flex-start', cursor: step>i+1?'pointer':'default' }} onClick={() => { if(step>i+1) setStep(i+1); }}>
              <div style={{ width:'100%', height:4, borderRadius:2, background: step>i+1 ? t.primary : step===i+1 ? t.primary : t.border, opacity: step===i+1?1:step>i+1?0.5:0.25, transition:'all 0.3s' }} />
              <span style={{ fontSize:10, color: step===i+1?t.primary:t.muted, fontWeight: step===i+1?700:400 }}>{s}</span>
            </div>
          ))}
        </div>
      </div>

      {step===1 && (
        <div style={{ padding:'0 16px' }}>
          <p style={{ fontSize:14, fontWeight:700, color:t.text, margin:'0 0 14px' }}>Where does it hurt?</p>

          {/* Body map */}
          <div style={{ background:t.surface, borderRadius:18, border:`1px solid ${t.border}`, padding:'18px 16px', marginBottom:16, boxShadow:t.shadowSm }}>
            <div style={{ position:'relative', height:230, display:'flex', justifyContent:'center' }}>
              <svg width="110" height="230" viewBox="0 0 110 230" style={{ position:'absolute' }}>
                {/* Head */}
                <ellipse cx="55" cy="21" rx="15" ry="18" fill={isDark?'#2D2550':'#EDE9FE'} stroke={t.border} strokeWidth="1.5"/>
                {/* Neck */}
                <rect x="48" y="38" width="14" height="12" rx="3" fill={isDark?'#2D2550':'#EDE9FE'} stroke={t.border} strokeWidth="1.5"/>
                {/* Torso */}
                <path d="M32 50 Q26 58 24 80 Q22 108 26 125 Q30 136 55 138 Q80 136 84 125 Q88 108 86 80 Q84 58 78 50 Z" fill={isDark?'#2D2550':'#EDE9FE'} stroke={t.border} strokeWidth="1.5"/>
                {/* Left arm */}
                <path d="M32 54 Q17 64 15 88 Q13 108 19 122" stroke={isDark?'#2D2550':'#EDE9FE'} strokeWidth="12" strokeLinecap="round" fill="none"/>
                <path d="M32 54 Q17 64 15 88 Q13 108 19 122" stroke={t.border} strokeWidth="13" strokeLinecap="round" fill="none" strokeOpacity="0.5"/>
                <path d="M32 54 Q17 64 15 88 Q13 108 19 122" stroke={isDark?'#2D2550':'#EDE9FE'} strokeWidth="11" strokeLinecap="round" fill="none"/>
                {/* Right arm */}
                <path d="M78 54 Q93 64 95 88 Q97 108 91 122" stroke={t.border} strokeWidth="13" strokeLinecap="round" fill="none" strokeOpacity="0.5"/>
                <path d="M78 54 Q93 64 95 88 Q97 108 91 122" stroke={isDark?'#2D2550':'#EDE9FE'} strokeWidth="11" strokeLinecap="round" fill="none"/>
                {/* Hips */}
                <path d="M26 125 Q24 148 34 154 Q55 160 76 154 Q86 148 84 125 Z" fill={isDark?'#2D2550':'#EDE9FE'} stroke={t.border} strokeWidth="1.5"/>
                {/* Left leg */}
                <path d="M42 154 Q36 184 38 208 Q39 218 44 222" stroke={t.border} strokeWidth="14" strokeLinecap="round" fill="none" strokeOpacity="0.5"/>
                <path d="M42 154 Q36 184 38 208 Q39 218 44 222" stroke={isDark?'#2D2550':'#EDE9FE'} strokeWidth="12" strokeLinecap="round" fill="none"/>
                {/* Right leg */}
                <path d="M68 154 Q74 184 72 208 Q71 218 66 222" stroke={t.border} strokeWidth="14" strokeLinecap="round" fill="none" strokeOpacity="0.5"/>
                <path d="M68 154 Q74 184 72 208 Q71 218 66 222" stroke={isDark?'#2D2550':'#EDE9FE'} strokeWidth="12" strokeLinecap="round" fill="none"/>
              </svg>

              {/* Interactive tap zones */}
              {[
                { id:'Head', top:2, left:40, w:30, h:36 },
                { id:'Neck', top:38, left:47, w:16, h:14 },
                { id:'Chest', top:52, left:30, w:50, h:36 },
                { id:'Upper Back', top:52, left:20, w:70, h:20 },
                { id:'Abdomen', top:88, left:30, w:50, h:30 },
                { id:'Lower Back', top:106, left:20, w:70, h:22 },
                { id:'Hips', top:126, left:26, w:58, h:28 },
                { id:'Left Arm', top:54, left:6, w:22, h:60 },
                { id:'Right Arm', top:54, left:82, w:22, h:60 },
                { id:'Left Knee', top:164, left:24, w:26, h:24 },
                { id:'Right Knee', top:164, left:60, w:26, h:24 },
                { id:'Left Foot', top:208, left:26, w:22, h:18 },
                { id:'Right Foot', top:208, left:62, w:22, h:18 },
              ].map(zone => (
                <div key={zone.id} onClick={() => setSelectedArea(zone.id)} style={{
                  position:'absolute', top:zone.top, left:zone.left, width:zone.w, height:zone.h, zIndex:10,
                  borderRadius:8, cursor:'pointer',
                  background: selectedArea===zone.id ? 'rgba(124,58,237,0.3)' : 'transparent',
                  border: `2px solid ${selectedArea===zone.id ? '#7C3AED' : 'transparent'}`,
                  transition:'all 0.15s'
                }} />
              ))}
            </div>
            {selectedArea && (
              <p style={{ textAlign:'center', fontSize:13, fontWeight:700, color:t.primary, margin:'8px 0 0' }}>
                {React.createElement(window.lucide.MapPin, { size:13, style:{display:'inline',marginRight:4} })}
                {selectedArea} selected
              </p>
            )}
          </div>

          {/* Quick area chips */}
          <div style={{ display:'flex', flexWrap:'wrap', gap:7, marginBottom:20 }}>
            {areas.map(a => (
              <button key={a} onClick={() => setSelectedArea(a)} style={{
                padding:'8px 13px', borderRadius:20, border:`1.5px solid ${selectedArea===a?t.primary:t.border}`,
                background: selectedArea===a ? t.primaryLight : t.surface,
                color: selectedArea===a ? t.primary : t.text,
                fontSize:12, fontWeight: selectedArea===a?700:400, cursor:'pointer', transition:'all 0.15s'
              }}>{a}</button>
            ))}
          </div>

          <button disabled={!selectedArea} onClick={() => setStep(2)} style={{
            width:'100%', padding:16, background: selectedArea?t.primaryGrad:t.border,
            color:'#fff', border:'none', borderRadius:14, fontSize:15, fontWeight:700,
            cursor: selectedArea?'pointer':'default', transition:'opacity 0.2s'
          }}>Next: Rate Intensity →</button>
        </div>
      )}

      {step===2 && (
        <div style={{ padding:'0 16px' }}>
          <p style={{ fontSize:14, fontWeight:700, color:t.text, margin:'0 0 4px' }}>How intense is it?</p>
          <p style={{ fontSize:12, color:t.subtext, margin:'0 0 24px' }}>{selectedArea} pain level</p>

          <div style={{ textAlign:'center', marginBottom:28 }}>
            <div style={{ width:96, height:96, borderRadius:'50%', margin:'0 auto 12px', background:intensityColor, display:'flex', alignItems:'center', justifyContent:'center', fontSize:40, fontWeight:900, color:'#fff', boxShadow:`0 10px 32px ${intensityColor}55`, transition:'all 0.25s' }}>
              {intensity}
            </div>
            <p style={{ fontSize:15, fontWeight:700, color:intensityColor, margin:'0 0 2px' }}>{intensityLabel}</p>
            <p style={{ fontSize:12, color:t.muted, margin:0 }}>on a scale of 1–10</p>
          </div>

          <div style={{ padding:'0 4px', marginBottom:24 }}>
            <input type="range" min={1} max={10} value={intensity} onChange={e => setIntensity(Number(e.target.value))}
              style={{ width:'100%', accentColor:t.primary, cursor:'pointer', height:6 }} />
            <div style={{ display:'flex', justifyContent:'space-between', marginTop:8 }}>
              <span style={{ fontSize:11, color:t.muted }}>1 — Barely noticeable</span>
              <span style={{ fontSize:11, color:t.muted }}>10 — Unbearable</span>
            </div>
          </div>

          <p style={{ fontSize:14, fontWeight:700, color:t.text, margin:'0 0 12px' }}>What does it feel like?</p>
          <div style={{ display:'flex', flexWrap:'wrap', gap:7, marginBottom:24 }}>
            {painTypes.map(type => (
              <button key={type} onClick={() => setPainType(type)} style={{
                padding:'9px 14px', borderRadius:20, border:`1.5px solid ${painType===type?t.primary:t.border}`,
                background: painType===type ? t.primaryLight : t.surface,
                color: painType===type ? t.primary : t.text,
                fontSize:12, fontWeight: painType===type?700:400, cursor:'pointer', transition:'all 0.15s'
              }}>{type}</button>
            ))}
          </div>

          <div style={{ display:'flex', gap:10 }}>
            <button onClick={() => setStep(1)} style={{ flex:1, padding:16, background:t.surface, color:t.text, border:`1.5px solid ${t.border}`, borderRadius:14, fontSize:14, cursor:'pointer' }}>← Back</button>
            <button onClick={() => setStep(3)} style={{ flex:2, padding:16, background:t.primaryGrad, color:'#fff', border:'none', borderRadius:14, fontSize:14, fontWeight:700, cursor:'pointer' }}>Next: Context →</button>
          </div>
        </div>
      )}

      {step===3 && (
        <div style={{ padding:'0 16px' }}>
          <p style={{ fontSize:14, fontWeight:700, color:t.text, margin:'0 0 4px' }}>What's been happening?</p>
          <p style={{ fontSize:12, color:t.subtext, margin:'0 0 16px' }}>Select anything that applies in the last 24 hours</p>

          <div style={{ display:'flex', flexWrap:'wrap', gap:8, marginBottom:18 }}>
            {tags.map(tag => (
              <button key={tag} onClick={() => toggleTag(tag)} style={{
                padding:'10px 15px', borderRadius:20, border:`1.5px solid ${contextTags.includes(tag)?t.primary:t.border}`,
                background: contextTags.includes(tag) ? t.primaryLight : t.surface,
                color: contextTags.includes(tag) ? t.primary : t.text,
                fontSize:12, fontWeight: contextTags.includes(tag)?700:400, cursor:'pointer', transition:'all 0.15s'
              }}>{tag}</button>
            ))}
          </div>

          {/* Auto-detected */}
          <div style={{ background:isDark?t.cyanLight:'#ECFEFF', border:`1px solid ${isDark?'#134E5A':'#A5F3FC'}`, borderRadius:14, padding:'12px 14px', marginBottom:20 }}>
            <p style={{ fontSize:12, fontWeight:700, color:t.cyan, margin:'0 0 8px' }}>📡 Auto-detected from sensors:</p>
            <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
              {['Low movement today','Overcast/cloudy','3.2 hrs screen time','Slept 6.5 hrs'].map(d => (
                <span key={d} style={{ fontSize:11, padding:'3px 9px', background:`${t.cyan}18`, color:t.cyan, borderRadius:20, fontWeight:600 }}>{d}</span>
              ))}
            </div>
          </div>

          <div style={{ display:'flex', gap:10 }}>
            <button onClick={() => setStep(2)} style={{ flex:1, padding:16, background:t.surface, color:t.text, border:`1.5px solid ${t.border}`, borderRadius:14, fontSize:14, cursor:'pointer' }}>← Back</button>
            <button onClick={() => setSaved(true)} style={{ flex:2, padding:16, background:t.primaryGrad, color:'#fff', border:'none', borderRadius:14, fontSize:14, fontWeight:700, cursor:'pointer' }}>Save Log ✓</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
//  INSIGHTS SCREEN
// ─────────────────────────────────────────────
function InsightsScreen({ t, isDark }) {
  const [tab, setTab] = useState('triggers');

  return (
    <div style={{ flex:1, overflowY:'auto', paddingBottom:20 }}>
      <div style={{ padding:'14px 20px 0' }}>
        <h2 style={{ fontSize:20, fontWeight:800, color:t.text, margin:'0 0 4px' }}>Insights</h2>
        <p style={{ fontSize:13, color:t.subtext, margin:'0 0 14px' }}>30 days · 87 data points</p>
        <div style={{ display:'flex', background:t.surfaceAlt, borderRadius:14, padding:3, marginBottom:18 }}>
          {['triggers','patterns','experiments'].map(id => (
            <button key={id} onClick={() => setTab(id)} style={{
              flex:1, padding:'8px 4px', borderRadius:11, border:'none', cursor:'pointer',
              background: tab===id ? t.surface : 'transparent',
              color: tab===id ? t.primary : t.subtext,
              fontSize:12, fontWeight: tab===id?700:400,
              boxShadow: tab===id ? t.shadowSm : 'none',
              transition:'all 0.2s', textTransform:'capitalize'
            }}>{id}</button>
          ))}
        </div>
      </div>

      {tab==='triggers' && (
        <div style={{ padding:'0 16px' }}>
          {/* AI Pattern Card */}
          <div style={{ background: isDark?'#1E1535':'#FDF8FF', border:`1px solid ${isDark?'#3B2060':'#DDD6FE'}`, borderRadius:16, padding:16, marginBottom:18 }}>
            <div style={{ display:'flex', gap:10, alignItems:'flex-start' }}>
              <div style={{ width:36, height:36, borderRadius:10, background:t.primaryGrad, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                {React.createElement(window.lucide.Sparkles, { size:18, color:'#fff' })}
              </div>
              <div>
                <p style={{ fontSize:13, fontWeight:700, color:t.text, margin:'0 0 4px' }}>Key Pattern Found</p>
                <p style={{ fontSize:13, color:t.subtext, margin:0, lineHeight:1.6 }}>
                  Headaches occur <strong style={{ color:t.text }}>3.2× more often</strong> on days following under 6hrs sleep combined with high screen time.
                </p>
              </div>
            </div>
          </div>

          {/* Trigger bars */}
          <SectionLabel t={t}>Top Triggers (correlation)</SectionLabel>
          {triggerData.map((item,i) => (
            <div key={i} style={{ marginBottom:14 }}>
              <div style={{ display:'flex', justifyContent:'space-between', marginBottom:6 }}>
                <span style={{ fontSize:13, fontWeight:500, color:t.text }}>{item.name}</span>
                <span style={{ fontSize:13, fontWeight:800, color:item.color }}>{item.pct}%</span>
              </div>
              <div style={{ height:9, background:t.surfaceAlt, borderRadius:5, overflow:'hidden' }}>
                <div style={{ height:'100%', width:`${item.pct}%`, background:item.color, borderRadius:5, transition:'width 0.5s ease' }} />
              </div>
            </div>
          ))}

          {/* Heatmap */}
          <SectionLabel t={t} style={{ marginTop:20 }}>Pain by Time of Day</SectionLabel>
          <div style={{ background:t.surface, borderRadius:14, border:`1px solid ${t.border}`, padding:'14px 12px', marginTop:10 }}>
            {[['Morning',[3,5,4,2,6,3,4]],['Afternoon',[7,6,8,4,7,5,5]],['Evening',[5,4,6,3,5,4,3]],['Night',[4,5,3,4,6,3,2]]].map(([period,vals],i) => (
              <div key={i} style={{ display:'flex', alignItems:'center', gap:7, marginBottom:7 }}>
                <span style={{ fontSize:10, color:t.subtext, width:56, flexShrink:0 }}>{period}</span>
                <div style={{ display:'flex', gap:3, flex:1 }}>
                  {vals.map((v,j) => {
                    const bg = v<=3 ? (isDark?'#1A3A2A':'#DCFCE7') : v<=6 ? (isDark?'#3A2A0A':'#FEF3C7') : (isDark?'#3A1A1A':'#FEE2E2');
                    const col = v<=3 ? '#22C55E' : v<=6 ? '#F59E0B' : '#EF4444';
                    return <div key={j} style={{ flex:1, height:24, borderRadius:4, background:bg, display:'flex', alignItems:'center', justifyContent:'center', fontSize:10, fontWeight:700, color:col }}>{v}</div>;
                  })}
                </div>
              </div>
            ))}
            <div style={{ display:'flex', gap:3, paddingLeft:63 }}>
              {weekDays.map(d => <span key={d} style={{ flex:1, textAlign:'center', fontSize:10, color:t.muted }}>{d}</span>)}
            </div>
          </div>
        </div>
      )}

      {tab==='patterns' && (
        <div style={{ padding:'0 16px' }}>
          {[
            { emoji:'🌧️', title:'Weather Sensitivity', desc:'Joint pain increases 40% during barometric pressure drops. Storms trigger episodes within 24hrs.', conf:'87%' },
            { emoji:'🍔', title:'Meal Timing', desc:'Skipping lunch correlates with 68% of afternoon headaches. Eating after 9pm worsens next-day fatigue.', conf:'74%' },
            { emoji:'😴', title:'Sleep Debt', desc:'Cumulative sleep under 6hrs for 2+ nights raises flare risk by 2.8×, especially for migraines.', conf:'91%' },
            { emoji:'💻', title:'Screen Exposure', desc:'More than 5hrs of screen time correlates with next-day head pain in 61% of logged episodes.', conf:'61%' },
          ].map((p,i) => (
            <div key={i} style={{ background:t.surface, borderRadius:16, border:`1px solid ${t.border}`, padding:16, marginBottom:12, boxShadow:t.shadowSm }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:10 }}>
                <div style={{ display:'flex', gap:10, alignItems:'center' }}>
                  <div style={{ width:40, height:40, borderRadius:12, background:t.surfaceAlt, display:'flex', alignItems:'center', justifyContent:'center', fontSize:20 }}>{p.emoji}</div>
                  <span style={{ fontSize:14, fontWeight:700, color:t.text }}>{p.title}</span>
                </div>
                <span style={{ fontSize:12, fontWeight:800, color:t.primary, background:t.primaryLight, padding:'3px 9px', borderRadius:20 }}>{p.conf}</span>
              </div>
              <p style={{ fontSize:13, color:t.subtext, margin:0, lineHeight:1.55 }}>{p.desc}</p>
            </div>
          ))}
        </div>
      )}

      {tab==='experiments' && (
        <div style={{ padding:'0 16px' }}>
          <p style={{ fontSize:13, color:t.subtext, margin:'0 0 16px', lineHeight:1.6 }}>Test small lifestyle changes and track whether they reduce your symptoms.</p>
          {[
            { name:'Drink 8 glasses of water daily', status:'active', days:7, progress:50, reduction:null, emoji:'💧' },
            { name:'Limit caffeine after 2pm', status:'done', days:14, progress:100, reduction:'−23%', emoji:'☕' },
            { name:'10-min stretch before bed', status:'done', days:21, progress:100, reduction:'−31%', emoji:'🧘' },
          ].map((exp,i) => (
            <div key={i} style={{ background:t.surface, borderRadius:16, border:`1px solid ${t.border}`, padding:16, marginBottom:12 }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom: exp.status==='active'?12:0 }}>
                <div style={{ display:'flex', gap:10, alignItems:'flex-start', flex:1 }}>
                  <span style={{ fontSize:24 }}>{exp.emoji}</span>
                  <div>
                    <p style={{ fontSize:13, fontWeight:700, color:t.text, margin:'0 0 3px' }}>{exp.name}</p>
                    <p style={{ fontSize:11, color:t.muted, margin:0 }}>Day {exp.days} · {exp.status==='active'?'In progress':'Completed'}</p>
                  </div>
                </div>
                {exp.reduction ? (
                  <div style={{ textAlign:'right', flexShrink:0 }}>
                    <p style={{ fontSize:18, fontWeight:800, color:'#22C55E', margin:'0 0 1px' }}>{exp.reduction}</p>
                    <p style={{ fontSize:10, color:t.muted, margin:0 }}>pain reduction</p>
                  </div>
                ) : (
                  <span style={{ fontSize:11, color:t.primary, background:t.primaryLight, padding:'3px 9px', borderRadius:20, fontWeight:700, flexShrink:0 }}>Active</span>
                )}
              </div>
              {exp.status==='active' && (
                <div style={{ height:5, background:t.surfaceAlt, borderRadius:3, overflow:'hidden' }}>
                  <div style={{ height:'100%', width:`${exp.progress}%`, background:t.primaryGrad, borderRadius:3, transition:'width 0.5s' }} />
                </div>
              )}
            </div>
          ))}
          <button style={{ width:'100%', padding:14, background:'transparent', color:t.primary, border:`2px dashed ${t.primary}`, borderRadius:14, fontSize:14, fontWeight:700, cursor:'pointer', opacity:0.8 }}>
            + Start New Experiment
          </button>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
//  REPORTS SCREEN
// ─────────────────────────────────────────────
function ReportsScreen({ t, isDark }) {
  const [view, setView] = useState('list');

  return (
    <div style={{ flex:1, overflowY:'auto', paddingBottom:20 }}>
      <div style={{ padding:'14px 20px 0' }}>
        <h2 style={{ fontSize:20, fontWeight:800, color:t.text, margin:'0 0 4px' }}>Reports</h2>
        <p style={{ fontSize:13, color:t.subtext, margin:'0 0 16px' }}>Doctor-ready summaries, always prepared</p>
      </div>

      {view==='list' ? (
        <div style={{ padding:'0 16px' }}>
          {/* CTA Card */}
          <div style={{ background:t.primaryGrad, borderRadius:20, padding:'20px 20px 22px', marginBottom:16, color:'#fff', boxShadow:'0 12px 32px rgba(124,58,237,0.35)', position:'relative', overflow:'hidden' }}>
            <div style={{ position:'absolute', top:-20, right:-20, width:100, height:100, borderRadius:'50%', background:'rgba(255,255,255,0.08)' }} />
            <p style={{ fontSize:12, opacity:0.8, margin:'0 0 4px', fontWeight:600 }}>Next appointment in 5 days</p>
            <h3 style={{ fontSize:19, fontWeight:800, margin:'0 0 10px', lineHeight:1.2 }}>March Report Ready{'\n'}for Dr. Martinez</h3>
            <p style={{ fontSize:12, opacity:0.85, margin:'0 0 18px', lineHeight:1.55 }}>30-day summary with trigger analysis, flare timeline, and medication response data.</p>
            <button onClick={() => setView('report')} style={{ background:'rgba(255,255,255,0.22)', color:'#fff', border:'1.5px solid rgba(255,255,255,0.4)', padding:'10px 20px', borderRadius:10, fontSize:13, fontWeight:700, cursor:'pointer' }}>
              View Report →
            </button>
          </div>

          <SectionLabel t={t}>Previous Reports</SectionLabel>
          {[
            { title:'February 2026', date:'Feb 28', entries:64, flares:3 },
            { title:'January 2026', date:'Jan 31', entries:71, flares:4 },
            { title:'December 2025', date:'Dec 31', entries:58, flares:2 },
          ].map((rep,i) => (
            <div key={i} onClick={() => setView('report')} style={{ display:'flex', alignItems:'center', gap:12, padding:'14px', background:t.surface, borderRadius:14, border:`1px solid ${t.border}`, marginBottom:9, cursor:'pointer', boxShadow:t.shadowSm }}>
              <div style={{ width:44, height:44, borderRadius:12, background:t.primaryLight, display:'flex', alignItems:'center', justifyContent:'center' }}>
                {React.createElement(window.lucide.FileText, { size:20, color:t.primary })}
              </div>
              <div style={{ flex:1 }}>
                <p style={{ fontSize:14, fontWeight:700, color:t.text, margin:'0 0 3px' }}>{rep.title}</p>
                <p style={{ fontSize:12, color:t.muted, margin:0 }}>{rep.entries} entries · {rep.flares} flares · {rep.date}</p>
              </div>
              <span style={{ color:t.muted, fontSize:20 }}>›</span>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ padding:'0 16px' }}>
          <button onClick={() => setView('list')} style={{ display:'flex', alignItems:'center', gap:6, background:'none', border:'none', color:t.primary, fontSize:14, fontWeight:700, cursor:'pointer', padding:'0 0 16px', marginLeft:-2 }}>
            {React.createElement(window.lucide.ChevronLeft, { size:18 })} Back
          </button>

          <div style={{ background:t.surface, borderRadius:18, border:`1px solid ${t.border}`, padding:18, marginBottom:12, boxShadow:t.shadowSm }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 }}>
              <div>
                <p style={{ fontSize:11, color:t.muted, margin:'0 0 2px', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.05em' }}>For Dr. Martinez</p>
                <h3 style={{ fontSize:17, fontWeight:800, color:t.text, margin:0 }}>March 2026 Summary</h3>
              </div>
              <span style={{ fontSize:11, color:t.primary, background:t.primaryLight, padding:'4px 10px', borderRadius:20, fontWeight:700 }}>Ready</span>
            </div>

            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:9, marginBottom:16 }}>
              {[['87','Total Logs'],['5.2','Avg Pain'],['6','Flare Days']].map(([v,l],i) => (
                <div key={i} style={{ textAlign:'center', padding:'10px 6px', background:t.surfaceAlt, borderRadius:12 }}>
                  <p style={{ fontSize:20, fontWeight:800, color:t.primary, margin:'0 0 2px' }}>{v}</p>
                  <p style={{ fontSize:10, color:t.muted, margin:0 }}>{l}</p>
                </div>
              ))}
            </div>

            <div style={{ height:1, background:t.border, margin:'0 0 14px' }} />

            <p style={{ fontSize:13, fontWeight:700, color:t.text, margin:'0 0 10px' }}>Key Findings</p>
            {[
              'Migraine frequency increased in weeks with <6hrs avg sleep',
              'Joint pain peaked during 3 barometric pressure drops this month',
              'Stretching experiment reduced lower back pain by 31%',
              'Hydration below 6 glasses correlated with 74% of fatigue days',
            ].map((f,i) => (
              <div key={i} style={{ display:'flex', gap:8, marginBottom:8, alignItems:'flex-start' }}>
                <div style={{ width:6, height:6, borderRadius:'50%', background:t.primary, flexShrink:0, marginTop:6 }} />
                <p style={{ fontSize:13, color:t.subtext, margin:0, lineHeight:1.5 }}>{f}</p>
              </div>
            ))}

            <button style={{ width:'100%', marginTop:16, padding:'13px', background:t.primaryGrad, color:'#fff', border:'none', borderRadius:13, fontSize:14, fontWeight:700, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:8 }}>
              {React.createElement(window.lucide.Share2, { size:15 })}
              Share with Doctor
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
//  SETTINGS SCREEN
// ─────────────────────────────────────────────
function SettingsScreen({ t, isDark, toggleTheme }) {
  const [notifs, setNotifs] = useState({ checkin:true, flare:true, weekly:false });
  const toggle = key => setNotifs(prev => ({ ...prev, [key]: !prev[key] }));

  function Toggle({ on, onPress }) {
    return (
      <div onClick={onPress} style={{ width:48, height:26, borderRadius:13, background: on?t.primary:t.border, cursor:'pointer', position:'relative', transition:'background 0.2s', flexShrink:0 }}>
        <div style={{ position:'absolute', top:3, left: on?24:3, width:20, height:20, borderRadius:'50%', background:'#fff', transition:'left 0.2s', boxShadow:'0 1px 4px rgba(0,0,0,0.25)' }} />
      </div>
    );
  }

  return (
    <div style={{ flex:1, overflowY:'auto', paddingBottom:20 }}>
      <div style={{ padding:'14px 20px 16px' }}>
        <h2 style={{ fontSize:20, fontWeight:800, color:t.text, margin:0 }}>Settings</h2>
      </div>

      {/* Profile */}
      <div style={{ margin:'0 16px 16px', padding:16, background:t.surface, borderRadius:18, border:`1px solid ${t.border}`, boxShadow:t.shadowSm }}>
        <div style={{ display:'flex', gap:14, alignItems:'center' }}>
          <div style={{ width:58, height:58, borderRadius:'50%', background:t.primaryGrad, display:'flex', alignItems:'center', justifyContent:'center', fontSize:26, boxShadow:t.shadow }}>👤</div>
          <div style={{ flex:1 }}>
            <p style={{ fontSize:17, fontWeight:800, color:t.text, margin:'0 0 3px' }}>Sarah Chen</p>
            <p style={{ fontSize:12, color:t.subtext, margin:'0 0 6px' }}>Migraine · Fibromyalgia</p>
            <div style={{ display:'flex', gap:5 }}>
              <Tag label="87 logs" color={t.primary} bg={t.primaryLight} />
              <Tag label="30 days" color={t.primary} bg={t.primaryLight} />
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding:'0 16px' }}>
        {/* Appearance */}
        <SectionLabel t={t}>Appearance</SectionLabel>
        <div style={{ background:t.surface, borderRadius:16, border:`1px solid ${t.border}`, overflow:'hidden', marginBottom:16 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'14px 16px' }}>
            <div style={{ display:'flex', gap:10, alignItems:'center' }}>
              {React.createElement(isDark ? window.lucide.Moon : window.lucide.Sun, { size:18, color:t.primary })}
              <span style={{ fontSize:14, color:t.text, fontWeight:500 }}>Dark Mode</span>
            </div>
            <Toggle on={isDark} onPress={toggleTheme} />
          </div>
          <div style={{ height:1, background:t.border }} />
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'14px 16px' }}>
            <div style={{ display:'flex', gap:10, alignItems:'center' }}>
              {React.createElement(window.lucide.Type, { size:18, color:t.primary })}
              <span style={{ fontSize:14, color:t.text, fontWeight:500 }}>Large Text</span>
            </div>
            <Toggle on={false} onPress={() => {}} />
          </div>
        </div>

        {/* Notifications */}
        <SectionLabel t={t}>Notifications</SectionLabel>
        <div style={{ background:t.surface, borderRadius:16, border:`1px solid ${t.border}`, overflow:'hidden', marginBottom:16 }}>
          {[
            { key:'checkin', label:'Daily check-in reminder', Icon:window.lucide.Bell },
            { key:'flare', label:'Flare risk alerts', Icon:window.lucide.Zap },
            { key:'weekly', label:'Weekly insights digest', Icon:window.lucide.BarChart2 },
          ].map(({key,label,Icon},i) => (
            <div key={key}>
              {i>0 && <div style={{ height:1, background:t.border }} />}
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'14px 16px' }}>
                <div style={{ display:'flex', gap:10, alignItems:'center' }}>
                  {React.createElement(Icon, { size:18, color:t.primary })}
                  <span style={{ fontSize:14, color:t.text, fontWeight:500 }}>{label}</span>
                </div>
                <Toggle on={notifs[key]} onPress={() => toggle(key)} />
              </div>
            </div>
          ))}
        </div>

        {/* Data & Privacy */}
        <SectionLabel t={t}>Data & Privacy</SectionLabel>
        <div style={{ background:t.surface, borderRadius:16, border:`1px solid ${t.border}`, overflow:'hidden', marginBottom:20 }}>
          {[
            { label:'Export my data', Icon:window.lucide.Download },
            { label:'Connected apps', Icon:window.lucide.Link },
            { label:'Privacy & security', Icon:window.lucide.Shield },
          ].map(({label,Icon},i) => (
            <div key={label}>
              {i>0 && <div style={{ height:1, background:t.border }} />}
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'14px 16px', cursor:'pointer' }}>
                <div style={{ display:'flex', gap:10, alignItems:'center' }}>
                  {React.createElement(Icon, { size:18, color:t.primary })}
                  <span style={{ fontSize:14, color:t.text, fontWeight:500 }}>{label}</span>
                </div>
                {React.createElement(window.lucide.ChevronRight, { size:16, color:t.muted })}
              </div>
            </div>
          ))}
        </div>

        <p style={{ textAlign:'center', fontSize:12, color:t.muted, lineHeight:1.5 }}>PainMap v1.0.0{'\n'}Built with care for chronic warriors</p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
//  MAIN APP
// ─────────────────────────────────────────────
function App() {
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const [isDark, setIsDark] = useState(false);
  const t = isDark ? themes.dark : themes.light;

  // Load font
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap';
    document.head.appendChild(link);

    const style = document.createElement('style');
    style.textContent = `
      * { font-family: 'Plus Jakarta Sans', sans-serif !important; box-sizing: border-box; }
      ::-webkit-scrollbar { display: none; }
      input[type=range] { -webkit-appearance: none; appearance: none; width: 100%; height: 6px; background: #EDE9FE; border-radius: 3px; outline: none; }
      input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; width: 24px; height: 24px; border-radius: 50%; background: #7C3AED; cursor: pointer; box-shadow: 0 2px 8px rgba(124,58,237,0.45); }
    `;
    document.head.appendChild(style);
  }, []);

  const tabs = [
    { id: 'home', label: 'Home', icon: window.lucide.Home },
    { id: 'log', label: 'Log', icon: window.lucide.PlusCircle },
    { id: 'insights', label: 'Insights', icon: window.lucide.TrendingUp },
    { id: 'reports', label: 'Reports', icon: window.lucide.FileText },
    { id: 'settings', label: 'Settings', icon: window.lucide.Settings },
  ];

  const screens = {
    home: HomeScreen,
    log: LogScreen,
    insights: InsightsScreen,
    reports: ReportsScreen,
    settings: SettingsScreen,
  };

  const ActiveScreen = screens[activeTab];

  return (
    <div style={{ minHeight:'100vh', background:'#E8E6EF', display:'flex', alignItems:'center', justifyContent:'center', padding:24, fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
      {/* Phone frame */}
      <div style={{
        width:375, height:812, background:t.bg, borderRadius:50, overflow:'hidden', position:'relative',
        boxShadow:'0 50px 100px rgba(0,0,0,0.28), 0 0 0 8px #1C1C1E, 0 0 0 10px #2C2C2E',
        display:'flex', flexDirection:'column', transition:'background 0.3s ease'
      }}>
        {/* Dynamic Island */}
        <DynamicIsland />
        {/* Status Bar */}
        <StatusBar t={t} />

        {/* Content */}
        <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' }}>
          {showOnboarding ? (
            <OnboardingScreen t={t} isDark={isDark} onDone={() => setShowOnboarding(false)} />
          ) : (
            <ActiveScreen t={t} isDark={isDark} toggleTheme={() => setIsDark(d => !d)} setActiveTab={setActiveTab} />
          )}
        </div>

        {/* Bottom Nav */}
        {!showOnboarding && (
          <div style={{
            display:'flex', background:t.surface, borderTop:`1px solid ${t.border}`,
            paddingBottom:20, paddingTop:8,
            boxShadow: isDark ? 'none' : '0 -6px 20px rgba(0,0,0,0.06)'
          }}>
            {tabs.map(tab => {
              const isActive = activeTab === tab.id;
              const navItemStyle = {
                flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:3,
                cursor:'pointer', padding:'4px 0', position:'relative', transition:'all 0.2s',
              };
              const labelStyle = {
                fontSize:10, fontWeight: isActive ? 700 : 400,
                color: isActive ? t.primary : t.muted,
                transition:'color 0.2s'
              };
              return React.createElement('div', {
                  key: tab.id,
                  onClick: () => setActiveTab(tab.id),
                  style: navItemStyle
                },
                isActive && React.createElement('div', {
                  style: {
                    position:'absolute', top:-8, width:32, height:3,
                    background:t.primaryGrad, borderRadius:'0 0 4px 4px'
                  }
                }),
                React.createElement(tab.icon, {
                  size: 22,
                  strokeWidth: isActive ? 2.5 : 1.5,
                  color: isActive ? t.primary : t.muted,
                }),
                React.createElement('span', { style: labelStyle }, tab.label)
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
