const { useState, useEffect, useRef } = React;

const ds = {
  colors: {
    primary: '#A78BFA',
    secondary: '#F59E0B',
    accent: '#EC4899',
    bg: '#0D0B17',
    surface: '#1A1628',
    surfaceHigh: '#231F35',
    text: '#F5F0FF',
    textSub: '#9B93C4',
    border: 'rgba(167,139,250,0.15)',
    success: '#34D399',
  },
  fonts: {
    display: "'Playfair Display', serif",
    body: "'DM Sans', sans-serif",
  },
  r: { sm: 8, md: 12, lg: 16, xl: 24, full: 9999 },
};

const sampleBrief = {
  emotion: "hopeful but grounded",
  interpretation: "You're sitting at a threshold — optimistic about what's ahead, but tethered to something real. There's warmth here, not delusion.",
  palette: ["#D4A574","#8B9E7A","#C4B5A0","#5C6B5A","#E8DDD0"],
  paletteNames: ["Warm Sand","Sage","Driftwood","Moss","Oat"],
  directions: [
    { type: "Writing Prompt", icon: "FileText", text: "Write about the last ordinary thing that felt extraordinary. Don't explain why — just describe it." },
    { type: "Art Direction", icon: "Palette", text: "Golden hour light through imperfect glass. Soft focus. Nothing too sharp, nothing too vague." },
    { type: "Brand Voice", icon: "MessageSquare", text: "Honest. Warm. Doesn't try too hard. Speaks like a trusted friend who also happens to know a lot." },
    { type: "Headline", icon: "Type", text: '"Not every beginning announces itself."' },
  ],
  keywords: ["threshold","warmth","honest","unhurried","earthy"],
};

const archiveItems = [
  { id:1, date:"Today, 2:14 PM", emotion:"restless but curious", tags:["exploring","tension","electric"], color:"#7C3AED" },
  { id:2, date:"Yesterday, 9:30 AM", emotion:"quietly proud", tags:["milestone","soft","grounded"], color:"#0D9488" },
  { id:3, date:"Mar 18, 7:45 PM", emotion:"nostalgic and tender", tags:["memory","warmth","longing"], color:"#D97706" },
  { id:4, date:"Mar 16, 11:22 AM", emotion:"energized chaos", tags:["brainstorm","urgent","bold"], color:"#DC2626" },
  { id:5, date:"Mar 14, 3:00 PM", emotion:"serene and open", tags:["clarity","minimal","space"], color:"#2563EB" },
];

function App() {
  const [screen, setScreen] = useState('onboard');
  const [onboardPage, setOnboardPage] = useState(0);
  const [tab, setTab] = useState('capture');
  const [inputMode, setInputMode] = useState('text');
  const [moodText, setMoodText] = useState('');
  const [generating, setGenerating] = useState(false);
  const [briefVisible, setBriefVisible] = useState(false);
  const [pressedBtn, setPressedBtn] = useState(null);
  const [likedColors, setLikedColors] = useState({});
  const [savedItems, setSavedItems] = useState({});
  const [expandedDirection, setExpandedDirection] = useState(null);

  const press = (id) => { setPressedBtn(id); setTimeout(()=>setPressedBtn(null),150); };

  const onboards = [
    {
      title: "Capture the feeling",
      sub: "Type a few words, record a voice note, or drop a photo. MoodMuse reads between the lines.",
      icon: "Mic",
      grad: "linear-gradient(135deg, #A78BFA22, #EC489922)",
    },
    {
      title: "Get a creative brief",
      sub: "We translate your emotional input into palettes, prompts, and directions you can actually use.",
      icon: "Sparkles",
      grad: "linear-gradient(135deg, #F59E0B22, #A78BFA22)",
    },
    {
      title: "Build your mood archive",
      sub: "Save directions, revisit emotional states, and build a creative identity that's entirely yours.",
      icon: "Archive",
      grad: "linear-gradient(135deg, #34D39922, #2563EB22)",
    },
  ];

  const handleGenerate = () => {
    if (!moodText.trim()) return;
    setGenerating(true);
    setTimeout(() => { setGenerating(false); setBriefVisible(true); setTab('brief'); }, 2200);
  };

  const StatusBar = () => (
    <div style={{ height:54, padding:'14px 24px 0', display:'flex', justifyContent:'space-between', alignItems:'center', flexShrink:0 }}>
      <span style={{ fontSize:15, fontWeight:600, color:ds.colors.text, fontFamily:ds.fonts.body }}>9:41</span>
      <div style={{ display:'flex', gap:5, alignItems:'center' }}>
        <svg width="16" height="12" viewBox="0 0 16 12" fill={ds.colors.text}><rect x="0" y="3" width="3" height="9" rx="1" opacity="0.4"/><rect x="4.5" y="2" width="3" height="10" rx="1" opacity="0.6"/><rect x="9" y="0" width="3" height="12" rx="1"/><rect x="13.5" y="4" width="2" height="8" rx="1" opacity="0.3"/></svg>
        <svg width="16" height="12" viewBox="0 0 16 12" fill={ds.colors.text}><path d="M8 2.5C10.5 2.5 12.7 3.5 14.3 5.1L15.5 3.9C13.6 2 11 1 8 1C5 1 2.4 2 0.5 3.9L1.7 5.1C3.3 3.5 5.5 2.5 8 2.5Z" opacity="0.4"/><path d="M8 5.5C9.7 5.5 11.2 6.2 12.3 7.3L13.5 6.1C12.1 4.8 10.1 4 8 4C5.9 4 3.9 4.8 2.5 6.1L3.7 7.3C4.8 6.2 6.3 5.5 8 5.5Z" opacity="0.7"/><circle cx="8" cy="10" r="1.5"/></svg>
        <div style={{ display:'flex', alignItems:'center', gap:1 }}>
          <div style={{ width:22, height:11, border:`1.5px solid ${ds.colors.text}`, borderRadius:3, display:'flex', alignItems:'center', padding:'0 2px' }}>
            <div style={{ width:'70%', height:7, background:ds.colors.text, borderRadius:2 }}/>
          </div>
        </div>
      </div>
    </div>
  );

  const DynamicIsland = () => (
    <div style={{ position:'absolute', top:10, left:'50%', transform:'translateX(-50%)', width:120, height:32, borderRadius:20, background:'#000', zIndex:100 }}/>
  );

  // ONBOARDING
  if (screen === 'onboard') {
    const ob = onboards[onboardPage];
    const Icon = window.lucide[ob.icon];
    return (
      <div style={{ display:'flex', justifyContent:'center', alignItems:'center', minHeight:'100vh', background:'#07060F' }}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap'); * { box-sizing:border-box; margin:0; padding:0; } ::-webkit-scrollbar{display:none;}`}</style>
        <div style={{ width:375, height:812, borderRadius:44, border:'8px solid #1a1a1a', overflow:'hidden', position:'relative', boxShadow:'0 30px 80px rgba(0,0,0,0.6)', background:ds.colors.bg, display:'flex', flexDirection:'column' }}>
          <DynamicIsland/>
          <StatusBar/>
          <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'0 32px', position:'relative', overflow:'hidden' }}>
            {/* Background glow */}
            <div style={{ position:'absolute', width:300, height:300, borderRadius:'50%', background:ob.grad, filter:'blur(60px)', top:'10%', left:'50%', transform:'translateX(-50%)' }}/>
            {/* Icon */}
            <div style={{ width:96, height:96, borderRadius:ds.r.xl, background:'rgba(167,139,250,0.12)', border:'1px solid rgba(167,139,250,0.3)', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:32, position:'relative', zIndex:1 }}>
              {Icon && <Icon size={44} color={ds.colors.primary} strokeWidth={1.5}/>}
            </div>
            <h1 style={{ fontFamily:ds.fonts.display, fontSize:30, color:ds.colors.text, textAlign:'center', lineHeight:1.25, marginBottom:16, position:'relative', zIndex:1 }}>{ob.title}</h1>
            <p style={{ fontFamily:ds.fonts.body, fontSize:16, color:ds.colors.textSub, textAlign:'center', lineHeight:1.65, position:'relative', zIndex:1 }}>{ob.sub}</p>
            {/* Dots */}
            <div style={{ display:'flex', gap:8, marginTop:40, position:'relative', zIndex:1 }}>
              {onboards.map((_,i)=> <div key={i} style={{ width:i===onboardPage?24:8, height:8, borderRadius:ds.r.full, background:i===onboardPage?ds.colors.primary:'rgba(167,139,250,0.25)', transition:'all 0.3s ease' }}/>)}
            </div>
          </div>
          <div style={{ padding:'0 32px 48px', display:'flex', flexDirection:'column', gap:12 }}>
            <button onClick={()=>{ press('next'); onboardPage<2?setOnboardPage(p=>p+1):setScreen('app'); }}
              style={{ width:'100%', height:54, borderRadius:ds.r.full, background:`linear-gradient(135deg, ${ds.colors.primary}, ${ds.colors.accent})`, border:'none', color:'#fff', fontFamily:ds.fonts.body, fontSize:16, fontWeight:600, cursor:'pointer', transform:pressedBtn==='next'?'scale(0.97)':'scale(1)', transition:'transform 0.15s ease', boxShadow:'0 8px 24px rgba(167,139,250,0.35)' }}>
              {onboardPage<2?'Continue':'Get Started'}
            </button>
            {onboardPage<2&&<button onClick={()=>setScreen('app')} style={{ width:'100%', height:44, borderRadius:ds.r.full, background:'transparent', border:'none', color:ds.colors.textSub, fontFamily:ds.fonts.body, fontSize:15, cursor:'pointer' }}>Skip</button>}
          </div>
        </div>
      </div>
    );
  }

  // MAIN APP
  const TabBar = () => {
    const tabs = [
      { id:'capture', icon:'Feather', label:'Capture' },
      { id:'brief', icon:'Sparkles', label:'Brief' },
      { id:'archive', icon:'Archive', label:'Archive' },
      { id:'profile', icon:'User', label:'Me' },
    ];
    return (
      <div style={{ position:'absolute', bottom:0, left:0, right:0, height:90, background:ds.colors.surface, borderTop:`1px solid ${ds.colors.border}`, display:'flex', justifyContent:'space-around', alignItems:'flex-start', paddingTop:10 }}>
        {tabs.map(t => {
          const Icon = window.lucide[t.icon];
          const active = tab===t.id;
          return (
            <button key={t.id} onClick={()=>setTab(t.id)}
              style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:4, background:'none', border:'none', cursor:'pointer', padding:'4px 12px', minWidth:60 }}>
              <div style={{ width:44, height:44, borderRadius:ds.r.lg, background:active?'rgba(167,139,250,0.15)':'transparent', display:'flex', alignItems:'center', justifyContent:'center', transition:'all 0.2s ease' }}>
                {Icon && <Icon size={20} color={active?ds.colors.primary:ds.colors.textSub} strokeWidth={active?2:1.5}/>}
              </div>
              <span style={{ fontFamily:ds.fonts.body, fontSize:11, color:active?ds.colors.primary:ds.colors.textSub, fontWeight:active?600:400, transition:'color 0.2s' }}>{t.label}</span>
            </button>
          );
        })}
      </div>
    );
  };

  // CAPTURE SCREEN
  const CaptureScreen = () => {
    const modes = [
      { id:'text', icon:'Type', label:'Type' },
      { id:'voice', icon:'Mic', label:'Voice' },
      { id:'photo', icon:'Camera', label:'Photo' },
      { id:'sketch', icon:'PenTool', label:'Sketch' },
    ];
    const suggestions = ["restless before a big decision","warm, like old photographs","like the sky right before rain","quietly triumphant","overwhelmed but trusting the process"];
    return (
      <div style={{ padding:'16px 20px', display:'flex', flexDirection:'column', gap:20 }}>
        <div>
          <h2 style={{ fontFamily:ds.fonts.display, fontSize:26, color:ds.colors.text, fontStyle:'italic', lineHeight:1.2, marginBottom:4 }}>How are you feeling?</h2>
          <p style={{ fontFamily:ds.fonts.body, fontSize:14, color:ds.colors.textSub }}>Vague is fine. We'll figure it out.</p>
        </div>
        {/* Input mode tabs */}
        <div style={{ display:'flex', gap:8, background:ds.colors.surface, borderRadius:ds.r.xl, padding:4 }}>
          {modes.map(m=>{
            const Icon=window.lucide[m.icon]; const a=inputMode===m.id;
            return <button key={m.id} onClick={()=>setInputMode(m.id)}
              style={{ flex:1, height:40, borderRadius:ds.r.lg, background:a?ds.colors.primary:'transparent', border:'none', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:2, cursor:'pointer', transition:'all 0.2s ease' }}>
              {Icon&&<Icon size={14} color={a?'#fff':ds.colors.textSub}/>}
              <span style={{ fontFamily:ds.fonts.body, fontSize:10, color:a?'#fff':ds.colors.textSub, fontWeight:a?600:400 }}>{m.label}</span>
            </button>;
          })}
        </div>
        {/* Text input area */}
        {inputMode==='text'&&(
          <div style={{ background:ds.colors.surface, borderRadius:ds.r.xl, border:`1px solid ${ds.colors.border}`, padding:16, minHeight:130 }}>
            <textarea value={moodText} onChange={e=>setMoodText(e.target.value)}
              placeholder="Try: 'I want this to feel hopeful but grounded' or 'like Sunday morning after something heavy'"
              style={{ width:'100%', background:'transparent', border:'none', outline:'none', color:ds.colors.text, fontFamily:ds.fonts.body, fontSize:15, lineHeight:1.65, resize:'none', minHeight:100 }}/>
          </div>
        )}
        {inputMode==='voice'&&(
          <div style={{ background:ds.colors.surface, borderRadius:ds.r.xl, border:`1px solid ${ds.colors.border}`, padding:24, display:'flex', flexDirection:'column', alignItems:'center', gap:16 }}>
            <div style={{ width:72, height:72, borderRadius:'50%', background:'rgba(236,72,153,0.15)', border:'2px solid rgba(236,72,153,0.4)', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 0 0 16px rgba(236,72,153,0.06)' }}>
              {window.lucide.Mic&&<window.lucide.Mic size={28} color={ds.colors.accent}/>}
            </div>
            <p style={{ fontFamily:ds.fonts.body, fontSize:14, color:ds.colors.textSub, textAlign:'center' }}>Tap to record your thoughts.<br/>Say it messy — that's the point.</p>
          </div>
        )}
        {(inputMode==='photo'||inputMode==='sketch')&&(
          <div style={{ background:ds.colors.surface, borderRadius:ds.r.xl, border:`2px dashed ${ds.colors.border}`, padding:32, display:'flex', flexDirection:'column', alignItems:'center', gap:12 }}>
            {window.lucide[inputMode==='photo'?'Upload':'Pencil']&&React.createElement(window.lucide[inputMode==='photo'?'Upload':'Pencil'],{size:32,color:ds.colors.textSub})}
            <p style={{ fontFamily:ds.fonts.body, fontSize:14, color:ds.colors.textSub, textAlign:'center' }}>{inputMode==='photo'?'Drop a photo or screenshot that matches the vibe':'Draw something. Messy is better.'}</p>
          </div>
        )}
        {/* Mood suggestions */}
        <div>
          <p style={{ fontFamily:ds.fonts.body, fontSize:12, color:ds.colors.textSub, marginBottom:10, fontWeight:500, letterSpacing:0.5, textTransform:'uppercase' }}>Try one of these</p>
          <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
            {suggestions.map((s,i)=>(
              <button key={i} onClick={()=>setMoodText(s)}
                style={{ background:'rgba(167,139,250,0.1)', border:`1px solid rgba(167,139,250,0.2)`, borderRadius:ds.r.full, padding:'8px 14px', color:ds.colors.text, fontFamily:ds.fonts.body, fontSize:13, cursor:'pointer' }}>
                {s}
              </button>
            ))}
          </div>
        </div>
        {/* Generate button */}
        <button onClick={()=>{press('gen');handleGenerate();}}
          style={{ width:'100%', height:56, borderRadius:ds.r.full, background:moodText.trim()?`linear-gradient(135deg, ${ds.colors.primary}, ${ds.colors.accent})`:'rgba(255,255,255,0.06)', border:'none', color:moodText.trim()?'#fff':ds.colors.textSub, fontFamily:ds.fonts.body, fontSize:16, fontWeight:600, cursor:moodText.trim()?'pointer':'not-allowed', transform:pressedBtn==='gen'?'scale(0.97)':'scale(1)', transition:'all 0.2s ease', display:'flex', alignItems:'center', justifyContent:'center', gap:8, boxShadow:moodText.trim()?'0 8px 24px rgba(167,139,250,0.3)':'none' }}>
          {generating?<>
            <div style={{ width:18, height:18, border:'2px solid rgba(255,255,255,0.3)', borderTopColor:'#fff', borderRadius:'50%', animation:'spin 0.8s linear infinite' }}/>
            Interpreting your mood...
          </>:<>
            {window.lucide.Sparkles&&<window.lucide.Sparkles size={18}/>}
            Generate Creative Brief
          </>}
        </button>
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    );
  };

  // BRIEF SCREEN
  const BriefScreen = () => {
    if (!briefVisible) return (
      <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', height:'100%', padding:32, gap:20 }}>
        <div style={{ width:80, height:80, borderRadius:'50%', background:'rgba(167,139,250,0.1)', display:'flex', alignItems:'center', justifyContent:'center' }}>
          {window.lucide.Sparkles&&<window.lucide.Sparkles size={36} color={ds.colors.primary} strokeWidth={1.5}/>}
        </div>
        <div style={{ textAlign:'center' }}>
          <h3 style={{ fontFamily:ds.fonts.display, fontSize:22, color:ds.colors.text, marginBottom:8 }}>No brief yet</h3>
          <p style={{ fontFamily:ds.fonts.body, fontSize:15, color:ds.colors.textSub, lineHeight:1.6 }}>Head to Capture and describe how you're feeling to generate your first creative brief.</p>
        </div>
        <button onClick={()=>setTab('capture')} style={{ padding:'12px 28px', borderRadius:ds.r.full, background:`linear-gradient(135deg,${ds.colors.primary},${ds.colors.accent})`, border:'none', color:'#fff', fontFamily:ds.fonts.body, fontSize:15, fontWeight:600, cursor:'pointer' }}>Start Capturing</button>
      </div>
    );
    return (
      <div style={{ padding:'16px 20px', display:'flex', flexDirection:'column', gap:20 }}>
        {/* Emotion tag */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <div>
            <p style={{ fontFamily:ds.fonts.body, fontSize:12, color:ds.colors.textSub, fontWeight:500, textTransform:'uppercase', letterSpacing:0.5, marginBottom:4 }}>Emotional Brief</p>
            <h2 style={{ fontFamily:ds.fonts.display, fontSize:22, color:ds.colors.text, fontStyle:'italic' }}>"{sampleBrief.emotion}"</h2>
          </div>
          <button onClick={()=>{ press('save'); setSavedItems(s=>({...s,brief:!s.brief})); press('save'); }}
            style={{ width:44, height:44, borderRadius:'50%', background:'rgba(255,255,255,0.05)', border:`1px solid ${ds.colors.border}`, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', transform:pressedBtn==='save'?'scale(0.88)':'scale(1)', transition:'transform 0.15s ease' }}>
            {window.lucide.Bookmark&&<window.lucide.Bookmark size={18} color={savedItems.brief?ds.colors.primary:ds.colors.textSub} fill={savedItems.brief?ds.colors.primary:'none'}/>}
          </button>
        </div>
        {/* Interpretation */}
        <div style={{ background:ds.colors.surface, borderRadius:ds.r.xl, padding:16, border:`1px solid ${ds.colors.border}` }}>
          <p style={{ fontFamily:ds.fonts.body, fontSize:14, color:ds.colors.text, lineHeight:1.7, fontStyle:'italic' }}>"{sampleBrief.interpretation}"</p>
        </div>
        {/* Color palette */}
        <div>
          <p style={{ fontFamily:ds.fonts.body, fontSize:12, color:ds.colors.textSub, fontWeight:500, textTransform:'uppercase', letterSpacing:0.5, marginBottom:12 }}>Color Direction</p>
          <div style={{ display:'flex', gap:8, alignItems:'flex-end' }}>
            {sampleBrief.palette.map((c,i)=>(
              <div key={i} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:6 }}>
                <button onClick={()=>setLikedColors(l=>({...l,[i]:!l[i]}))}
                  style={{ width:'100%', aspectRatio:'1', borderRadius:ds.r.md, background:c, border:likedColors[i]?`2px solid #fff`:'2px solid transparent', cursor:'pointer', transition:'transform 0.15s', transform:likedColors[i]?'scale(1.08)':'scale(1)', boxShadow:likedColors[i]?`0 4px 16px ${c}66`:'none' }}/>
                <span style={{ fontFamily:ds.fonts.body, fontSize:10, color:ds.colors.textSub, textAlign:'center' }}>{sampleBrief.paletteNames[i]}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Creative directions */}
        <div>
          <p style={{ fontFamily:ds.fonts.body, fontSize:12, color:ds.colors.textSub, fontWeight:500, textTransform:'uppercase', letterSpacing:0.5, marginBottom:12 }}>Creative Directions</p>
          <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
            {sampleBrief.directions.map((d,i)=>{
              const Icon=window.lucide[d.icon]; const exp=expandedDirection===i;
              return (
                <button key={i} onClick={()=>setExpandedDirection(exp?null:i)}
                  style={{ background:ds.colors.surface, border:`1px solid ${exp?ds.colors.primary:ds.colors.border}`, borderRadius:ds.r.xl, padding:'14px 16px', cursor:'pointer', textAlign:'left', transition:'all 0.2s ease' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:exp?10:0 }}>
                    <div style={{ width:32, height:32, borderRadius:ds.r.md, background:'rgba(167,139,250,0.1)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                      {Icon&&<Icon size={16} color={ds.colors.primary}/>}
                    </div>
                    <span style={{ fontFamily:ds.fonts.body, fontSize:13, fontWeight:600, color:ds.colors.text, flex:1 }}>{d.type}</span>
                    {window.lucide.ChevronDown&&<window.lucide.ChevronDown size={16} color={ds.colors.textSub} style={{ transform:exp?'rotate(180deg)':'none', transition:'transform 0.2s' }}/>}
                  </div>
                  {exp&&<p style={{ fontFamily:ds.fonts.body, fontSize:14, color:ds.colors.textSub, lineHeight:1.65, paddingLeft:42 }}>{d.text}</p>}
                </button>
              );
            })}
          </div>
        </div>
        {/* Keywords */}
        <div>
          <p style={{ fontFamily:ds.fonts.body, fontSize:12, color:ds.colors.textSub, fontWeight:500, textTransform:'uppercase', letterSpacing:0.5, marginBottom:10 }}>Key Signals</p>
          <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
            {sampleBrief.keywords.map((k,i)=>(
              <span key={i} style={{ background:'rgba(167,139,250,0.1)', border:`1px solid rgba(167,139,250,0.25)`, borderRadius:ds.r.full, padding:'6px 14px', fontFamily:ds.fonts.body, fontSize:13, color:ds.colors.primary }}>#{k}</span>
            ))}
          </div>
        </div>
        <div style={{ height:20 }}/>
      </div>
    );
  };

  // ARCHIVE SCREEN
  const ArchiveScreen = () => {
    const [filter,setFilter]=useState('all');
    return (
      <div style={{ padding:'16px 20px', display:'flex', flexDirection:'column', gap:20 }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <div>
            <h2 style={{ fontFamily:ds.fonts.display, fontSize:24, color:ds.colors.text }}>Mood Archive</h2>
            <p style={{ fontFamily:ds.fonts.body, fontSize:13, color:ds.colors.textSub }}>{archiveItems.length} briefs saved</p>
          </div>
          <button style={{ width:44, height:44, borderRadius:'50%', background:ds.colors.surface, border:`1px solid ${ds.colors.border}`, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}>
            {window.lucide.Search&&<window.lucide.Search size={18} color={ds.colors.textSub}/>}
          </button>
        </div>
        {/* Filter pills */}
        <div style={{ display:'flex', gap:8, overflowX:'auto', paddingBottom:4 }}>
          {['all','saved','this week','brand','writing'].map(f=>(
            <button key={f} onClick={()=>setFilter(f)}
              style={{ flexShrink:0, padding:'8px 16px', borderRadius:ds.r.full, background:filter===f?ds.colors.primary:'rgba(255,255,255,0.05)', border:`1px solid ${filter===f?ds.colors.primary:ds.colors.border}`, color:filter===f?'#fff':ds.colors.textSub, fontFamily:ds.fonts.body, fontSize:13, fontWeight:filter===f?600:400, cursor:'pointer', textTransform:'capitalize', transition:'all 0.2s ease' }}>{f}</button>
          ))}
        </div>
        {/* Archive items */}
        <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
          {archiveItems.map(item=>(
            <div key={item.id} style={{ background:ds.colors.surface, border:`1px solid ${ds.colors.border}`, borderRadius:ds.r.xl, padding:16, display:'flex', gap:14, alignItems:'flex-start', cursor:'pointer' }}>
              <div style={{ width:48, height:48, borderRadius:ds.r.lg, background:item.color+'22', border:`1px solid ${item.color}44`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                {window.lucide.Brain&&<window.lucide.Brain size={22} color={item.color}/>}
              </div>
              <div style={{ flex:1, minWidth:0 }}>
                <p style={{ fontFamily:ds.fonts.display, fontSize:15, color:ds.colors.text, fontStyle:'italic', marginBottom:6 }}>"{item.emotion}"</p>
                <div style={{ display:'flex', flexWrap:'wrap', gap:6, marginBottom:8 }}>
                  {item.tags.map((t,i)=><span key={i} style={{ background:'rgba(255,255,255,0.06)', borderRadius:ds.r.full, padding:'3px 10px', fontFamily:ds.fonts.body, fontSize:11, color:ds.colors.textSub }}>#{t}</span>)}
                </div>
                <p style={{ fontFamily:ds.fonts.body, fontSize:12, color:ds.colors.textSub }}>{item.date}</p>
              </div>
              {window.lucide.ChevronRight&&<window.lucide.ChevronRight size={18} color={ds.colors.textSub} style={{ flexShrink:0 }}/>}
            </div>
          ))}
        </div>
        <div style={{ height:20 }}/>
      </div>
    );
  };

  // PROFILE SCREEN
  const ProfileScreen = () => {
    const [notifs, setNotifs]=useState(true);
    const [personalise, setPersonalise]=useState(true);
    const [darkMode, setDarkMode]=useState(true);
    const Toggle=({on,toggle})=>(
      <button onClick={toggle} style={{ width:48, height:28, borderRadius:14, background:on?ds.colors.primary:'rgba(255,255,255,0.1)', border:'none', cursor:'pointer', position:'relative', transition:'background 0.25s ease', flexShrink:0 }}>
        <div style={{ width:22, height:22, borderRadius:'50%', background:'#fff', position:'absolute', top:3, left:on?23:3, transition:'left 0.25s ease', boxShadow:'0 2px 4px rgba(0,0,0,0.2)' }}/>
      </button>
    );
    const styles = ['Minimal & Clean','Bold & Expressive','Nostalgic & Warm','Futuristic & Sleek'];
    const [selStyle, setSelStyle]=useState(2);
    return (
      <div style={{ padding:'16px 20px', display:'flex', flexDirection:'column', gap:20 }}>
        {/* Profile header */}
        <div style={{ display:'flex', alignItems:'center', gap:14 }}>
          <div style={{ width:64, height:64, borderRadius:'50%', background:`linear-gradient(135deg, ${ds.colors.primary}, ${ds.colors.accent})`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
            <span style={{ fontFamily:ds.fonts.display, fontSize:26, color:'#fff' }}>A</span>
          </div>
          <div>
            <h3 style={{ fontFamily:ds.fonts.body, fontSize:18, fontWeight:600, color:ds.colors.text }}>Alex Morgan</h3>
            <p style={{ fontFamily:ds.fonts.body, fontSize:13, color:ds.colors.textSub }}>Freelance Creative Director</p>
            <div style={{ display:'flex', gap:12, marginTop:6 }}>
              <span style={{ fontFamily:ds.fonts.body, fontSize:12, color:ds.colors.primary }}>23 briefs</span>
              <span style={{ fontFamily:ds.fonts.body, fontSize:12, color:ds.colors.textSub }}>·</span>
              <span style={{ fontFamily:ds.fonts.body, fontSize:12, color:ds.colors.primary }}>8 saved palettes</span>
            </div>
          </div>
        </div>
        {/* Aesthetic style */}
        <div style={{ background:ds.colors.surface, borderRadius:ds.r.xl, padding:16, border:`1px solid ${ds.colors.border}` }}>
          <p style={{ fontFamily:ds.fonts.body, fontSize:13, fontWeight:600, color:ds.colors.text, marginBottom:12 }}>Your Aesthetic</p>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>
            {styles.map((s,i)=>(
              <button key={i} onClick={()=>setSelStyle(i)}
                style={{ padding:'10px 14px', borderRadius:ds.r.lg, background:selStyle===i?'rgba(167,139,250,0.15)':'rgba(255,255,255,0.04)', border:`1px solid ${selStyle===i?ds.colors.primary:ds.colors.border}`, color:selStyle===i?ds.colors.primary:ds.colors.textSub, fontFamily:ds.fonts.body, fontSize:12, fontWeight:selStyle===i?600:400, cursor:'pointer', textAlign:'left', transition:'all 0.2s ease' }}>{s}</button>
            ))}
          </div>
        </div>
        {/* Settings */}
        <div style={{ background:ds.colors.surface, borderRadius:ds.r.xl, border:`1px solid ${ds.colors.border}`, overflow:'hidden' }}>
          {[
            { label:'Daily inspiration nudge', icon:'Bell', val:notifs, toggle:()=>setNotifs(v=>!v) },
            { label:'Personalise outputs', icon:'Sliders', val:personalise, toggle:()=>setPersonalise(v=>!v) },
            { label:'Dark mode', icon:'Moon', val:darkMode, toggle:()=>setDarkMode(v=>!v) },
          ].map((s,i,arr)=>{
            const Icon=window.lucide[s.icon];
            return <div key={i} style={{ display:'flex', alignItems:'center', gap:12, padding:'14px 16px', borderBottom:i<arr.length-1?`1px solid ${ds.colors.border}`:'none' }}>
              <div style={{ width:34, height:34, borderRadius:ds.r.md, background:'rgba(167,139,250,0.1)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                {Icon&&<Icon size={16} color={ds.colors.primary}/>}
              </div>
              <span style={{ fontFamily:ds.fonts.body, fontSize:14, color:ds.colors.text, flex:1 }}>{s.label}</span>
              <Toggle on={s.val} toggle={s.toggle}/>
            </div>;
          })}
        </div>
        {/* Stats */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:10 }}>
          {[['23','Briefs'],['8','Palettes'],['47','Prompts']].map(([n,l],i)=>(
            <div key={i} style={{ background:ds.colors.surface, borderRadius:ds.r.xl, padding:'14px 10px', border:`1px solid ${ds.colors.border}`, textAlign:'center' }}>
              <p style={{ fontFamily:ds.fonts.display, fontSize:22, color:ds.colors.primary, fontWeight:700 }}>{n}</p>
              <p style={{ fontFamily:ds.fonts.body, fontSize:11, color:ds.colors.textSub }}>{l}</p>
            </div>
          ))}
        </div>
        <div style={{ height:20 }}/>
      </div>
    );
  };

  const screens = { capture:<CaptureScreen/>, brief:<BriefScreen/>, archive:<ArchiveScreen/>, profile:<ProfileScreen/> };

  return (
    <div style={{ display:'flex', justifyContent:'center', alignItems:'center', minHeight:'100vh', background:'#07060F' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap'); *{box-sizing:border-box;margin:0;padding:0;} textarea{outline:none;} ::-webkit-scrollbar{display:none;} button{outline:none;}`}</style>
      <div style={{ width:375, height:812, borderRadius:44, border:'8px solid #1a1a1a', overflow:'hidden', position:'relative', boxShadow:'0 30px 80px rgba(0,0,0,0.6)', background:ds.colors.bg, display:'flex', flexDirection:'column' }}>
        <DynamicIsland/>
        <StatusBar/>
        {/* Screen title bar */}
        <div style={{ padding:'4px 20px 12px', display:'flex', alignItems:'center', justifyContent:'space-between', flexShrink:0 }}>
          <div>
            <span style={{ fontFamily:ds.fonts.body, fontSize:12, color:ds.colors.primary, fontWeight:500, letterSpacing:1, textTransform:'uppercase' }}>MoodMuse</span>
          </div>
          <div style={{ display:'flex', gap:8 }}>
            {window.lucide.Bell&&<button style={{ width:36, height:36, borderRadius:'50%', background:'rgba(255,255,255,0.05)', border:'none', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}><window.lucide.Bell size={16} color={ds.colors.textSub}/></button>}
          </div>
        </div>
        {/* Scrollable content */}
        <div style={{ flex:1, overflowY:'auto', overflowX:'hidden' }}>
          {screens[tab]}
        </div>
        <TabBar/>
      </div>
    </div>
  );
}
