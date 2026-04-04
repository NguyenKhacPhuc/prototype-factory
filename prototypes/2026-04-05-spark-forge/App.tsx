const { useState, useEffect, useRef } = React;

function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [isDark, setIsDark] = useState(true);
  const [bottomSheet, setBottomSheet] = useState(null);

  const themes = {
    dark: {
      bg: '#1A1208', surface: '#2D1F10', surfaceAlt: '#3D2A14', border: '#5D4030',
      text: '#FFFDE7', textMuted: '#C8A878', primary: '#4FC3F7', secondary: '#D84315',
      accent: '#FF8A65', success: '#66BB6A',
    },
    light: {
      bg: '#FFFDE7', surface: '#FFF8E1', surfaceAlt: '#FFF0C0', border: '#D4A04A',
      text: '#2A1500', textMuted: '#8D6E40', primary: '#0288D1', secondary: '#D84315',
      accent: '#E64A19', success: '#388E3C',
    },
  };
  const t = isDark ? themes.dark : themes.light;

  const fontStyle = `
    @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;600;700&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    ::-webkit-scrollbar { width: 0; height: 0; }
    button { font-family: 'Caveat', cursive; }
    input, textarea { font-family: 'Caveat', cursive; }
  `;

  const projects = [
    { id:1, title:'Neon Wilderness — 12 Illustrations', creator:'Mara Chen', avatar:'MC', category:'Art', catColor:'#4FC3F7', deadline:'Apr 28', daysLeft:23, stake:450, backers:18, progress:33, milestones:['Character designs','Background series','Final compositions','Digital prints'], completedMilestones:1, description:'A series of 12 detailed illustrations merging bioluminescent jungle landscapes with cyberpunk aesthetics. Each piece delivered at 4K resolution with process notes.' },
    { id:2, title:'Field Notes: Ambient EP', creator:'Dayo Okafor', avatar:'DO', category:'Music', catColor:'#D84315', deadline:'May 10', daysLeft:35, stake:280, backers:24, progress:60, milestones:['Track 1 draft','Track 2 draft','Mix session','Final master'], completedMilestones:2, description:'An ambient EP capturing sounds from 6 months of solo travel through rural Japan. Field recordings layered with minimal synthesis and spatial audio.' },
    { id:3, title:'Brutalist Ceramics — 5 Pieces', creator:'Lena Vasquez', avatar:'LV', category:'Craft', catColor:'#FF8A65', deadline:'Apr 20', daysLeft:15, stake:190, backers:11, progress:80, milestones:['Clay prep','Forming','Glaze testing','Final firing','Documentation'], completedMilestones:4, description:'Five large-format ceramic vessels inspired by Soviet constructivist architecture. Raw textures, geometric forms, matte glazes in iron oxide and ash.' },
    { id:4, title:'Ghost Protocol — Short Story', creator:'James Wright', avatar:'JW', category:'Writing', catColor:'#81C784', deadline:'Apr 14', daysLeft:9, stake:120, backers:31, progress:90, milestones:['Outline','First draft','Revision','Final edit'], completedMilestones:3, description:'A sci-fi short story exploring AI consciousness through a haunted house narrative lens. Target: 8,000 words. Submitting to three literary magazines post-completion.' },
    { id:5, title:'Urban Botanicals Zine', creator:'Priya Singh', avatar:'PS', category:'Art', catColor:'#4FC3F7', deadline:'May 22', daysLeft:47, stake:320, backers:15, progress:10, milestones:['Research','Photography','Layout design','Print run'], completedMilestones:0, description:'A 32-page risograph zine documenting invasive plant species found in Tokyo concrete infrastructure. 200-copy limited print run with hand-numbered pages.' },
  ];

  const navItems = [
    { id:'home',    label:'Home',    icon:'Home' },
    { id:'explore', label:'Explore', icon:'Compass' },
    { id:'create',  label:'Create',  icon:'PlusCircle' },
    { id:'muse',    label:'Muse',    icon:'Sparkles' },
    { id:'profile', label:'Profile', icon:'User' },
  ];

  // ── HOME SCREEN ────────────────────────────────────────────────────────────
  const HomeScreen = () => {
    const myProjects = [projects[1], projects[3]];
    return React.createElement('div', { style:{ height:'100%', overflowY:'auto', background:t.bg, fontFamily:"'Caveat', cursive" } },
      // Header
      React.createElement('div', { style:{ padding:'20px 16px 14px', background:t.surface, borderBottom:`3px solid ${t.border}` } },
        React.createElement('div', { style:{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' } },
          React.createElement('div', null,
            React.createElement('div', { style:{ fontSize:12, color:t.textMuted, letterSpacing:2, textTransform:'uppercase' } }, 'Good morning,'),
            React.createElement('div', { style:{ fontSize:28, fontWeight:700, color:t.text, lineHeight:1.1 } }, 'Dayo Okafor'),
          ),
          React.createElement('div', { onClick:()=>setIsDark(!isDark), style:{ width:36, height:36, border:`2px solid ${t.primary}`, borderRadius:4, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', background:t.bg } },
            React.createElement(isDark ? window.lucide.Sun : window.lucide.Moon, { size:16, color:t.primary })
          )
        ),
        React.createElement('div', { style:{ display:'flex', gap:10, marginTop:16 } },
          [{ label:'SPARKS', value:'2,840', color:t.primary }, { label:'ACTIVE', value:'2', color:t.secondary }, { label:'BACKED', value:'12', color:t.accent }].map(s =>
            React.createElement('div', { key:s.label, style:{ flex:1, background:t.bg, border:`2px solid ${s.color}`, padding:'8px 10px', borderRadius:4 } },
              React.createElement('div', { style:{ fontSize:20, fontWeight:700, color:s.color } }, s.value),
              React.createElement('div', { style:{ fontSize:10, color:t.textMuted, letterSpacing:1.5 } }, s.label),
            )
          )
        )
      ),
      // Active projects
      React.createElement('div', { style:{ padding:'16px 16px 8px' } },
        React.createElement('div', { style:{ fontSize:12, fontWeight:700, color:t.textMuted, letterSpacing:2, textTransform:'uppercase', marginBottom:12 } }, '— Your Active Projects'),
        myProjects.map(p =>
          React.createElement('div', { key:p.id, onClick:()=>setBottomSheet({ type:'project', data:p }), style:{ background:t.surface, border:`2px solid ${t.border}`, borderLeft:`4px solid ${p.catColor}`, borderRadius:6, padding:14, marginBottom:10, cursor:'pointer' } },
            React.createElement('div', { style:{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:8 } },
              React.createElement('div', { style:{ fontSize:17, fontWeight:700, color:t.text, lineHeight:1.2, flex:1, paddingRight:8 } }, p.title),
              React.createElement('div', { style:{ fontSize:11, color:p.catColor, border:`1px solid ${p.catColor}`, padding:'2px 6px', borderRadius:2 } }, p.category),
            ),
            React.createElement('div', { style:{ height:5, background:t.surfaceAlt, borderRadius:1, marginBottom:4, overflow:'hidden' } },
              React.createElement('div', { style:{ height:'100%', width:`${p.progress}%`, background:p.catColor } })
            ),
            React.createElement('div', { style:{ display:'flex', justifyContent:'space-between' } },
              React.createElement('div', { style:{ fontSize:12, color:t.textMuted } }, `${p.progress}% complete`),
              React.createElement('div', { style:{ fontSize:12, color:t.secondary, fontWeight:600 } }, `${p.daysLeft}d left`),
            )
          )
        )
      ),
      // Hot stakes
      React.createElement('div', { style:{ padding:'8px 16px 20px' } },
        React.createElement('div', { style:{ fontSize:12, fontWeight:700, color:t.textMuted, letterSpacing:2, textTransform:'uppercase', marginBottom:12 } }, '— Hot Stakes Today'),
        React.createElement('div', { style:{ display:'flex', gap:10, overflowX:'auto', paddingBottom:6 } },
          [projects[0], projects[2], projects[4]].map(p =>
            React.createElement('div', { key:p.id, onClick:()=>setBottomSheet({ type:'project', data:p }), style:{ minWidth:155, background:t.surface, border:`2px solid ${t.border}`, borderTop:`4px solid ${p.catColor}`, borderRadius:6, padding:12, cursor:'pointer' } },
              React.createElement('div', { style:{ fontSize:10, color:p.catColor, letterSpacing:1.5, textTransform:'uppercase', marginBottom:6 } }, p.category),
              React.createElement('div', { style:{ fontSize:14, fontWeight:700, color:t.text, lineHeight:1.2, marginBottom:8, height:36, overflow:'hidden' } }, p.title),
              React.createElement('div', { style:{ fontSize:24, fontWeight:700, color:t.secondary } }, p.stake),
              React.createElement('div', { style:{ fontSize:11, color:t.textMuted, marginBottom:8 } }, 'sparks at stake'),
              React.createElement('div', { style:{ height:4, background:t.surfaceAlt, borderRadius:1 } },
                React.createElement('div', { style:{ height:'100%', width:`${p.progress}%`, background:p.catColor } })
              )
            )
          )
        )
      ),
      // Community pulse
      React.createElement('div', { style:{ padding:'0 16px 24px' } },
        React.createElement('div', { style:{ fontSize:12, fontWeight:700, color:t.textMuted, letterSpacing:2, textTransform:'uppercase', marginBottom:12 } }, '— Community Pulse'),
        [
          { text:'James Wright posted milestone update for Ghost Protocol', time:'2h ago', icon:'✍️' },
          { text:'Lena Vasquez completed "Final firing" milestone!', time:'4h ago', icon:'🔥' },
          { text:'New project: "Coastal Typefaces Vol.3" by Petra M.', time:'6h ago', icon:'🆕' },
        ].map((item, i) =>
          React.createElement('div', { key:i, style:{ display:'flex', gap:10, padding:'10px 0', borderBottom:i<2?`1px solid ${t.border}`:'none' } },
            React.createElement('div', { style:{ fontSize:18 } }, item.icon),
            React.createElement('div', null,
              React.createElement('div', { style:{ fontSize:14, color:t.text, lineHeight:1.3 } }, item.text),
              React.createElement('div', { style:{ fontSize:12, color:t.textMuted } }, item.time),
            )
          )
        )
      )
    );
  };

  // ── EXPLORE SCREEN ─────────────────────────────────────────────────────────
  const ExploreScreen = () => {
    const [filter, setFilter] = useState('All');
    const filters = ['All','Art','Music','Writing','Craft'];
    const filtered = filter === 'All' ? projects : projects.filter(p => p.category === filter);
    return React.createElement('div', { style:{ height:'100%', display:'flex', flexDirection:'column', background:t.bg, fontFamily:"'Caveat', cursive" } },
      React.createElement('div', { style:{ padding:'20px 16px 12px', background:t.surface, borderBottom:`3px solid ${t.border}`, flexShrink:0 } },
        React.createElement('div', { style:{ fontSize:28, fontWeight:700, color:t.text } }, 'Explore'),
        React.createElement('div', { style:{ fontSize:14, color:t.textMuted, marginBottom:12 } }, 'Stake your belief in creators'),
        React.createElement('div', { style:{ display:'flex', alignItems:'center', background:t.bg, border:`2px solid ${t.border}`, borderRadius:4, padding:'8px 12px', gap:8 } },
          React.createElement(window.lucide.Search, { size:15, color:t.textMuted }),
          React.createElement('div', { style:{ fontSize:15, color:t.textMuted } }, 'Search projects...'),
        )
      ),
      React.createElement('div', { style:{ display:'flex', gap:8, padding:'10px 16px', background:t.surface, borderBottom:`2px solid ${t.border}`, overflowX:'auto', flexShrink:0 } },
        filters.map(f =>
          React.createElement('button', { key:f, onClick:()=>setFilter(f), style:{ padding:'6px 14px', background:filter===f?t.primary:'transparent', border:`2px solid ${filter===f?t.primary:t.border}`, borderRadius:3, color:filter===f?'#fff':t.textMuted, fontSize:14, fontWeight:600, cursor:'pointer', whiteSpace:'nowrap' } }, f)
        )
      ),
      React.createElement('div', { style:{ flex:1, overflowY:'auto', padding:16 } },
        filtered.map(p =>
          React.createElement('div', { key:p.id, onClick:()=>setBottomSheet({ type:'project', data:p }), style:{ background:t.surface, border:`2px solid ${t.border}`, borderRadius:6, marginBottom:12, cursor:'pointer', overflow:'hidden' } },
            React.createElement('div', { style:{ background:p.catColor, padding:'8px 14px', display:'flex', justifyContent:'space-between' } },
              React.createElement('div', { style:{ fontSize:11, fontWeight:700, color:'#fff', letterSpacing:1.5, textTransform:'uppercase' } }, p.category),
              React.createElement('div', { style:{ fontSize:13, color:'rgba(255,255,255,0.9)' } }, `${p.daysLeft}d left`),
            ),
            React.createElement('div', { style:{ padding:'12px 14px' } },
              React.createElement('div', { style:{ fontSize:18, fontWeight:700, color:t.text, lineHeight:1.2, marginBottom:6 } }, p.title),
              React.createElement('div', { style:{ display:'flex', alignItems:'center', gap:8, marginBottom:10 } },
                React.createElement('div', { style:{ width:26, height:26, borderRadius:'50%', background:p.catColor, display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, fontWeight:700, color:'#fff' } }, p.avatar),
                React.createElement('div', { style:{ fontSize:14, color:t.textMuted } }, p.creator),
              ),
              React.createElement('div', { style:{ height:5, background:t.surfaceAlt, borderRadius:1, marginBottom:6, overflow:'hidden' } },
                React.createElement('div', { style:{ height:'100%', width:`${p.progress}%`, background:p.catColor } })
              ),
              React.createElement('div', { style:{ display:'flex', justifyContent:'space-between', alignItems:'center' } },
                React.createElement('div', { style:{ fontSize:13, color:t.textMuted } }, `${p.completedMilestones}/${p.milestones.length} milestones`),
                React.createElement('div', { style:{ display:'flex', alignItems:'baseline', gap:4 } },
                  React.createElement('div', { style:{ fontSize:20, fontWeight:700, color:t.secondary } }, p.stake),
                  React.createElement('div', { style:{ fontSize:12, color:t.textMuted } }, ` sparks · ${p.backers} backing`),
                )
              )
            )
          )
        )
      )
    );
  };

  // ── CREATE SCREEN ──────────────────────────────────────────────────────────
  const CreateScreen = () => {
    const [step, setStep] = useState(1);
    const [form, setForm] = useState({ title:'', category:'Art', description:'', stake:'100', deadline:'30' });
    const [milestones, setMilestones] = useState(['','','']);
    const cats = ['Art','Music','Writing','Craft','Film','Design'];
    return React.createElement('div', { style:{ height:'100%', display:'flex', flexDirection:'column', background:t.bg, fontFamily:"'Caveat', cursive" } },
      React.createElement('div', { style:{ padding:'20px 16px 14px', background:t.surface, borderBottom:`3px solid ${t.border}`, flexShrink:0 } },
        React.createElement('div', { style:{ fontSize:28, fontWeight:700, color:t.text } }, 'Forge a Project'),
        React.createElement('div', { style:{ fontSize:14, color:t.textMuted, marginBottom:14 } }, 'Commit publicly. Create together.'),
        React.createElement('div', { style:{ display:'flex', gap:6 } },
          [1,2,3].map(s =>
            React.createElement('div', { key:s, style:{ flex:1, height:5, borderRadius:2, background:step>=s?t.secondary:t.border, transition:'background 0.3s' } })
          )
        )
      ),
      React.createElement('div', { style:{ flex:1, overflowY:'auto', padding:16 } },
        step===1 && React.createElement('div', null,
          React.createElement('div', { style:{ fontSize:18, fontWeight:700, color:t.text, marginBottom:16 } }, 'What are you creating?'),
          React.createElement('div', { style:{ marginBottom:14 } },
            React.createElement('div', { style:{ fontSize:11, color:t.textMuted, letterSpacing:1.5, textTransform:'uppercase', marginBottom:6 } }, 'Project Title'),
            React.createElement('input', { placeholder:'e.g. "Midnight Garden — 10 Paintings"', value:form.title, onChange:e=>setForm({...form,title:e.target.value}), style:{ width:'100%', background:t.surface, border:`2px solid ${t.border}`, borderRadius:4, padding:'10px 12px', color:t.text, fontSize:16, outline:'none' } })
          ),
          React.createElement('div', { style:{ marginBottom:14 } },
            React.createElement('div', { style:{ fontSize:11, color:t.textMuted, letterSpacing:1.5, textTransform:'uppercase', marginBottom:8 } }, 'Category'),
            React.createElement('div', { style:{ display:'flex', flexWrap:'wrap', gap:8 } },
              cats.map(c =>
                React.createElement('button', { key:c, onClick:()=>setForm({...form,category:c}), style:{ padding:'6px 14px', background:form.category===c?t.secondary:'transparent', border:`2px solid ${form.category===c?t.secondary:t.border}`, borderRadius:3, color:form.category===c?'#fff':t.textMuted, fontSize:14, fontWeight:600, cursor:'pointer' } }, c)
              )
            )
          ),
          React.createElement('div', { style:{ marginBottom:20 } },
            React.createElement('div', { style:{ fontSize:11, color:t.textMuted, letterSpacing:1.5, textTransform:'uppercase', marginBottom:6 } }, 'Description'),
            React.createElement('textarea', { placeholder:'What are you making? Be specific — supporters stake based on your vision.', value:form.description, onChange:e=>setForm({...form,description:e.target.value}), rows:4, style:{ width:'100%', background:t.surface, border:`2px solid ${t.border}`, borderRadius:4, padding:'10px 12px', color:t.text, fontSize:15, outline:'none', resize:'none' } })
          ),
          React.createElement('button', { onClick:()=>setStep(2), style:{ width:'100%', background:t.secondary, border:'none', borderRadius:4, padding:14, color:'#fff', fontSize:18, fontWeight:700, cursor:'pointer' } }, 'Next: Set Milestones →')
        ),
        step===2 && React.createElement('div', null,
          React.createElement('div', { style:{ fontSize:18, fontWeight:700, color:t.text, marginBottom:4 } }, 'Define Milestones'),
          React.createElement('div', { style:{ fontSize:14, color:t.textMuted, marginBottom:16 } }, 'Break into verifiable checkpoints.'),
          milestones.map((m,i) =>
            React.createElement('div', { key:i, style:{ display:'flex', gap:8, marginBottom:10, alignItems:'center' } },
              React.createElement('div', { style:{ width:28, height:28, borderRadius:'50%', background:'transparent', border:`2px solid ${t.primary}`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:13, fontWeight:700, color:t.primary, flexShrink:0 } }, i+1),
              React.createElement('input', { placeholder:`Milestone ${i+1}`, value:m, onChange:e=>{ const n=[...milestones]; n[i]=e.target.value; setMilestones(n); }, style:{ flex:1, background:t.surface, border:`2px solid ${t.border}`, borderRadius:4, padding:'8px 12px', color:t.text, fontSize:15, outline:'none' } })
            )
          ),
          React.createElement('button', { onClick:()=>setMilestones([...milestones,'']), style:{ width:'100%', background:'transparent', border:`2px dashed ${t.border}`, borderRadius:4, padding:'8px 14px', color:t.textMuted, fontSize:14, cursor:'pointer', marginBottom:16 } }, '+ Add milestone'),
          React.createElement('div', { style:{ display:'flex', gap:10 } },
            React.createElement('button', { onClick:()=>setStep(1), style:{ flex:1, background:'transparent', border:`2px solid ${t.border}`, borderRadius:4, padding:12, color:t.textMuted, fontSize:16, cursor:'pointer' } }, '← Back'),
            React.createElement('button', { onClick:()=>setStep(3), style:{ flex:2, background:t.secondary, border:'none', borderRadius:4, padding:12, color:'#fff', fontSize:17, fontWeight:700, cursor:'pointer' } }, 'Next: Your Stake →'),
          )
        ),
        step===3 && React.createElement('div', null,
          React.createElement('div', { style:{ fontSize:18, fontWeight:700, color:t.text, marginBottom:4 } }, 'Set Your Spark Stake'),
          React.createElement('div', { style:{ fontSize:14, color:t.textMuted, marginBottom:20 } }, 'Skin in the game makes commitment real.'),
          React.createElement('div', { style:{ background:t.surface, border:`3px solid ${t.secondary}`, borderRadius:6, padding:20, textAlign:'center', marginBottom:16 } },
            React.createElement('div', { style:{ fontSize:12, color:t.textMuted, marginBottom:4 } }, 'YOUR STAKE'),
            React.createElement('div', { style:{ display:'flex', alignItems:'center', justifyContent:'center', gap:12 } },
              React.createElement('button', { onClick:()=>setForm({...form,stake:String(Math.max(50,parseInt(form.stake)-50))}), style:{ width:36, height:36, borderRadius:'50%', border:`2px solid ${t.border}`, background:t.bg, color:t.text, fontSize:20, cursor:'pointer' } }, '−'),
              React.createElement('div', { style:{ fontSize:52, fontWeight:700, color:t.secondary, width:110, textAlign:'center' } }, form.stake),
              React.createElement('button', { onClick:()=>setForm({...form,stake:String(parseInt(form.stake)+50)}), style:{ width:36, height:36, borderRadius:'50%', border:`2px solid ${t.border}`, background:t.bg, color:t.text, fontSize:20, cursor:'pointer' } }, '+'),
            ),
            React.createElement('div', { style:{ fontSize:15, color:t.textMuted } }, 'sparks'),
          ),
          React.createElement('div', { style:{ marginBottom:20 } },
            React.createElement('div', { style:{ fontSize:11, color:t.textMuted, letterSpacing:1.5, textTransform:'uppercase', marginBottom:8 } }, 'Deadline'),
            React.createElement('div', { style:{ display:'flex', gap:8 } },
              ['14','30','60','90'].map(d =>
                React.createElement('button', { key:d, onClick:()=>setForm({...form,deadline:d}), style:{ flex:1, padding:'8px 4px', background:form.deadline===d?t.primary:'transparent', border:`2px solid ${form.deadline===d?t.primary:t.border}`, borderRadius:3, color:form.deadline===d?'#fff':t.textMuted, fontSize:14, fontWeight:600, cursor:'pointer' } }, `${d}d`)
              )
            )
          ),
          React.createElement('div', { style:{ background:t.surface, border:`2px solid ${t.border}`, borderLeft:`4px solid ${t.secondary}`, borderRadius:6, padding:14, marginBottom:16 } },
            React.createElement('div', { style:{ fontSize:11, color:t.textMuted, marginBottom:4 } }, 'PREVIEW'),
            React.createElement('div', { style:{ fontSize:18, fontWeight:700, color:t.text, marginBottom:4 } }, form.title||'Your project title'),
            React.createElement('div', { style:{ display:'flex', gap:12, fontSize:13, color:t.textMuted } },
              React.createElement('span', null, `${form.stake} sparks`),
              React.createElement('span', null, `${form.deadline} days`),
              React.createElement('span', null, form.category),
            )
          ),
          React.createElement('div', { style:{ display:'flex', gap:10 } },
            React.createElement('button', { onClick:()=>setStep(2), style:{ flex:1, background:'transparent', border:`2px solid ${t.border}`, borderRadius:4, padding:12, color:t.textMuted, fontSize:16, cursor:'pointer' } }, '← Back'),
            React.createElement('button', { onClick:()=>setActiveScreen('home'), style:{ flex:2, background:t.secondary, border:'none', borderRadius:4, padding:12, color:'#fff', fontSize:17, fontWeight:700, cursor:'pointer' } },
              React.createElement('span', null, '⚡ Launch Project')
            ),
          )
        )
      )
    );
  };

  // ── MUSE SCREEN ────────────────────────────────────────────────────────────
  const MuseScreen = () => {
    const [messages, setMessages] = useState([
      { role:'ai', text:"Welcome back, Dayo! 🎵 Your Field Notes EP is at 60% — 35 days left, 24 backers counting on you. What's the hold up on Track 2?" },
      { role:'user', text:"I can't decide on the arrangement for the second half of track 2." },
      { role:'ai', text:"Classic decision paralysis — you're close! Here are 3 paths:\n\n1. Fade into silence — let the field recording breathe\n2. Reintroduce the opening motif — creates satisfying closure\n3. Blend into Track 3's atmosphere — narrative continuity\n\nWhich feels most true to that rural Japan memory?" },
    ]);
    const [input, setInput] = useState('');
    const [typing, setTyping] = useState(false);
    const replies = [
      "Strong instinct! Field recordings often do the heavy lifting — trust the environment you captured.",
      "Your backers are watching. Even a short milestone update boosts community momentum.",
      "Creative blocks signal you're on the edge of something new. What rule could you break for this track?",
      "Commit to one direction for 20 minutes — if it's wrong you'll know fast. Momentum beats perfection.",
    ];
    const send = () => {
      if (!input.trim()) return;
      const next = [...messages, { role:'user', text:input }];
      setMessages(next); setInput(''); setTyping(true);
      setTimeout(() => { setTyping(false); setMessages([...next, { role:'ai', text:replies[Math.floor(Math.random()*replies.length)] }]); }, 1500);
    };
    return React.createElement('div', { style:{ height:'100%', display:'flex', flexDirection:'column', background:t.bg, fontFamily:"'Caveat', cursive" } },
      React.createElement('div', { style:{ padding:'20px 16px 14px', background:t.surface, borderBottom:`3px solid ${t.border}`, flexShrink:0 } },
        React.createElement('div', { style:{ display:'flex', alignItems:'center', gap:10 } },
          React.createElement('div', { style:{ width:40, height:40, borderRadius:6, background:`linear-gradient(135deg, ${t.primary}, ${t.secondary})`, display:'flex', alignItems:'center', justifyContent:'center' } },
            React.createElement(window.lucide.Sparkles, { size:20, color:'#fff' })
          ),
          React.createElement('div', null,
            React.createElement('div', { style:{ fontSize:22, fontWeight:700, color:t.text } }, 'AI Muse'),
            React.createElement('div', { style:{ fontSize:13, color:t.primary } }, '● Online · Watching your progress'),
          )
        )
      ),
      React.createElement('div', { style:{ flex:1, overflowY:'auto', padding:'16px', display:'flex', flexDirection:'column', gap:12 } },
        messages.map((msg,i) =>
          React.createElement('div', { key:i, style:{ display:'flex', justifyContent:msg.role==='user'?'flex-end':'flex-start' } },
            React.createElement('div', { style:{ maxWidth:'82%', background:msg.role==='user'?t.secondary:t.surface, border:`2px solid ${msg.role==='user'?t.secondary:t.border}`, borderRadius:msg.role==='user'?'12px 12px 2px 12px':'12px 12px 12px 2px', padding:'10px 14px', fontSize:15, color:msg.role==='user'?'#fff':t.text, lineHeight:1.5, whiteSpace:'pre-line' } }, msg.text)
          )
        ),
        typing && React.createElement('div', { style:{ display:'flex', gap:5, padding:'10px 14px', background:t.surface, border:`2px solid ${t.border}`, borderRadius:'12px 12px 12px 2px', width:'fit-content' } },
          [0,1,2].map(i => React.createElement('div', { key:i, style:{ width:7, height:7, borderRadius:'50%', background:t.textMuted, opacity: 0.6 } }))
        )
      ),
      React.createElement('div', { style:{ padding:'10px 16px 14px', background:t.surface, borderTop:`3px solid ${t.border}`, flexShrink:0 } },
        React.createElement('div', { style:{ display:'flex', gap:8, marginBottom:10, overflowX:'auto' } },
          ['Get unstuck','Next milestone','Boost motivation','Review draft'].map(p =>
            React.createElement('button', { key:p, onClick:()=>setInput(p), style:{ padding:'4px 10px', background:'transparent', border:`1px solid ${t.primary}`, borderRadius:12, color:t.primary, fontSize:13, cursor:'pointer', whiteSpace:'nowrap' } }, p)
          )
        ),
        React.createElement('div', { style:{ display:'flex', gap:8 } },
          React.createElement('input', { placeholder:'Ask your Muse...', value:input, onChange:e=>setInput(e.target.value), onKeyPress:e=>e.key==='Enter'&&send(), style:{ flex:1, background:t.bg, border:`2px solid ${t.border}`, borderRadius:4, padding:'10px 12px', color:t.text, fontSize:16, outline:'none' } }),
          React.createElement('button', { onClick:send, style:{ width:44, height:44, background:t.secondary, border:'none', borderRadius:4, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', flexShrink:0 } },
            React.createElement(window.lucide.Send, { size:18, color:'#fff' })
          )
        )
      )
    );
  };

  // ── PROFILE SCREEN ─────────────────────────────────────────────────────────
  const ProfileScreen = () => {
    const completed = [
      { title:'Echoes of Form — Photo Series', cat:'Art', earned:680, date:'Mar 2026' },
      { title:'Coastal Drift — EP', cat:'Music', earned:520, date:'Feb 2026' },
      { title:'Stitch Work — Textile Collection', cat:'Craft', earned:340, date:'Jan 2026' },
    ];
    const badges = [
      { name:'First Forge', icon:'🔥', desc:'First project' },
      { name:'On Streak', icon:'⚡', desc:'3 months active' },
      { name:'Patron', icon:'🎯', desc:'Backed 10' },
      { name:'Community', icon:'⭐', desc:'50 reviews' },
    ];
    return React.createElement('div', { style:{ height:'100%', overflowY:'auto', background:t.bg, fontFamily:"'Caveat', cursive" } },
      React.createElement('div', { style:{ padding:'24px 16px 20px', background:t.surface, borderBottom:`3px solid ${t.border}`, textAlign:'center' } },
        React.createElement('div', { style:{ width:72, height:72, borderRadius:8, background:t.secondary, margin:'0 auto 12px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:26, fontWeight:700, color:'#fff', border:`3px solid ${t.border}` } }, 'DO'),
        React.createElement('div', { style:{ fontSize:26, fontWeight:700, color:t.text } }, 'Dayo Okafor'),
        React.createElement('div', { style:{ fontSize:13, color:t.textMuted, marginBottom:16 } }, 'Sound artist & field recordist · Lagos/Tokyo'),
        React.createElement('div', { style:{ display:'flex', border:`2px solid ${t.border}`, borderRadius:6, overflow:'hidden' } },
          [{ v:'2,840', l:'Sparks' }, { v:'8', l:'Done' }, { v:'12', l:'Backed' }].map((s,i) =>
            React.createElement('div', { key:s.l, style:{ flex:1, padding:'10px 8px', background:i%2===0?t.bg:t.surface, borderRight:i<2?`2px solid ${t.border}`:'none', textAlign:'center' } },
              React.createElement('div', { style:{ fontSize:22, fontWeight:700, color:t.text } }, s.v),
              React.createElement('div', { style:{ fontSize:10, color:t.textMuted, letterSpacing:1.5 } }, s.l.toUpperCase()),
            )
          )
        )
      ),
      React.createElement('div', { style:{ padding:'16px 16px 8px' } },
        React.createElement('div', { style:{ fontSize:12, fontWeight:700, color:t.textMuted, letterSpacing:2, textTransform:'uppercase', marginBottom:10 } }, '— Badges'),
        React.createElement('div', { style:{ display:'flex', gap:10, overflowX:'auto', paddingBottom:4 } },
          badges.map(b =>
            React.createElement('div', { key:b.name, style:{ minWidth:75, background:t.surface, border:`2px solid ${t.border}`, borderRadius:6, padding:'10px 8px', textAlign:'center' } },
              React.createElement('div', { style:{ fontSize:24, marginBottom:4 } }, b.icon),
              React.createElement('div', { style:{ fontSize:12, fontWeight:700, color:t.text } }, b.name),
              React.createElement('div', { style:{ fontSize:11, color:t.textMuted } }, b.desc),
            )
          )
        )
      ),
      React.createElement('div', { style:{ padding:'8px 16px 16px' } },
        React.createElement('div', { style:{ fontSize:12, fontWeight:700, color:t.textMuted, letterSpacing:2, textTransform:'uppercase', marginBottom:10 } }, '— Completed Projects'),
        completed.map((p,i) =>
          React.createElement('div', { key:i, style:{ background:t.surface, border:`2px solid ${t.border}`, borderRadius:6, padding:'12px 14px', marginBottom:8, display:'flex', justifyContent:'space-between', alignItems:'center' } },
            React.createElement('div', null,
              React.createElement('div', { style:{ fontSize:15, fontWeight:700, color:t.text, marginBottom:2 } }, p.title),
              React.createElement('div', { style:{ fontSize:13, color:t.textMuted } }, `${p.cat} · ${p.date}`),
            ),
            React.createElement('div', { style:{ textAlign:'right' } },
              React.createElement('div', { style:{ fontSize:20, fontWeight:700, color:t.success } }, `+${p.earned}`),
              React.createElement('div', { style:{ fontSize:11, color:t.textMuted } }, 'sparks'),
            )
          )
        )
      ),
      React.createElement('div', { style:{ padding:'0 16px 24px' } },
        React.createElement('button', { onClick:()=>setIsDark(!isDark), style:{ width:'100%', background:'transparent', border:`2px solid ${t.border}`, borderRadius:4, padding:12, color:t.textMuted, fontSize:16, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:8 } },
          React.createElement(isDark?window.lucide.Sun:window.lucide.Moon, { size:16, color:t.textMuted }),
          React.createElement('span', null, isDark?'Switch to Light Mode':'Switch to Dark Mode')
        )
      )
    );
  };

  // ── BOTTOM SHEET ───────────────────────────────────────────────────────────
  const BottomSheet = () => {
    const [stakeAmt, setStakeAmt] = useState('50');
    if (!bottomSheet) return null;
    const { type, data } = bottomSheet;
    return React.createElement('div', { style:{ position:'absolute', inset:0, background:'rgba(0,0,0,0.65)', zIndex:100, display:'flex', flexDirection:'column', justifyContent:'flex-end' }, onClick:e=>{ if(e.target===e.currentTarget) setBottomSheet(null); } },
      React.createElement('div', { style:{ background:t.surface, borderRadius:'16px 16px 0 0', borderTop:`4px solid ${data.catColor||t.primary}`, maxHeight:'78%', overflowY:'auto', padding:'20px 16px 32px', fontFamily:"'Caveat', cursive" } },
        React.createElement('div', { style:{ width:40, height:4, background:t.border, borderRadius:2, margin:'-8px auto 16px' } }),
        type==='project' && React.createElement('div', null,
          React.createElement('div', { style:{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:12 } },
            React.createElement('div', { style:{ flex:1, paddingRight:12 } },
              React.createElement('div', { style:{ fontSize:11, color:data.catColor, letterSpacing:1.5, textTransform:'uppercase', marginBottom:4 } }, data.category),
              React.createElement('div', { style:{ fontSize:22, fontWeight:700, color:t.text, lineHeight:1.2 } }, data.title),
            ),
            React.createElement('button', { onClick:()=>setBottomSheet(null), style:{ background:'transparent', border:'none', color:t.textMuted, cursor:'pointer', fontSize:22, lineHeight:1 } }, '✕')
          ),
          React.createElement('div', { style:{ display:'flex', alignItems:'center', gap:10, marginBottom:14 } },
            React.createElement('div', { style:{ width:32, height:32, borderRadius:'50%', background:data.catColor, display:'flex', alignItems:'center', justifyContent:'center', fontSize:12, fontWeight:700, color:'#fff' } }, data.avatar),
            React.createElement('div', null,
              React.createElement('div', { style:{ fontSize:15, color:t.text } }, data.creator),
              React.createElement('div', { style:{ fontSize:12, color:t.textMuted } }, `Due ${data.deadline} · ${data.daysLeft} days left`),
            )
          ),
          React.createElement('div', { style:{ fontSize:15, color:t.textMuted, lineHeight:1.55, marginBottom:16 } }, data.description),
          React.createElement('div', { style:{ marginBottom:14 } },
            React.createElement('div', { style:{ fontSize:11, color:t.textMuted, letterSpacing:1.5, textTransform:'uppercase', marginBottom:8 } }, 'Milestones'),
            data.milestones.map((m,i) =>
              React.createElement('div', { key:i, style:{ display:'flex', alignItems:'center', gap:10, padding:'8px 0', borderBottom:i<data.milestones.length-1?`1px solid ${t.border}`:'none' } },
                React.createElement('div', { style:{ width:20, height:20, borderRadius:'50%', background:i<data.completedMilestones?data.catColor:'transparent', border:`2px solid ${i<data.completedMilestones?data.catColor:t.border}`, flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center' } },
                  i<data.completedMilestones && React.createElement('div', { style:{ width:8, height:8, borderRadius:'50%', background:'#fff' } })
                ),
                React.createElement('div', { style:{ fontSize:15, color:i<data.completedMilestones?t.textMuted:t.text, textDecoration:i<data.completedMilestones?'line-through':'none' } }, m)
              )
            )
          ),
          React.createElement('div', { style:{ display:'flex', background:t.bg, border:`2px solid ${t.border}`, borderRadius:6, overflow:'hidden', marginBottom:16 } },
            [{ l:'Staked', v:`${data.stake}`, u:'sparks' }, { l:'Backers', v:`${data.backers}`, u:'people' }, { l:'Progress', v:`${data.progress}%`, u:'done' }].map((s,i) =>
              React.createElement('div', { key:s.l, style:{ flex:1, padding:'10px 6px', borderRight:i<2?`2px solid ${t.border}`:'none', textAlign:'center' } },
                React.createElement('div', { style:{ fontSize:20, fontWeight:700, color:data.catColor } }, s.v),
                React.createElement('div', { style:{ fontSize:10, color:t.textMuted } }, s.l),
              )
            )
          ),
          React.createElement('button', { onClick:()=>setBottomSheet({ type:'stake', data }), style:{ width:'100%', background:t.secondary, border:'none', borderRadius:6, padding:16, color:'#fff', fontSize:20, fontWeight:700, cursor:'pointer' } },
            React.createElement('span', null, `⚡ Stake on ${data.creator.split(' ')[0]}`)
          )
        ),
        type==='stake' && React.createElement('div', null,
          React.createElement('div', { style:{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:6 } },
            React.createElement('div', { style:{ fontSize:22, fontWeight:700, color:t.text } }, 'Place Your Stake'),
            React.createElement('button', { onClick:()=>setBottomSheet(null), style:{ background:'transparent', border:'none', color:t.textMuted, cursor:'pointer', fontSize:22 } }, '✕')
          ),
          React.createElement('div', { style:{ fontSize:15, color:t.textMuted, marginBottom:20 } }, `Betting on ${data.creator}'s ability to deliver.`),
          React.createElement('div', { style:{ background:t.bg, border:`2px solid ${data.catColor}`, borderRadius:6, padding:16, textAlign:'center', marginBottom:14 } },
            React.createElement('div', { style:{ fontSize:12, color:t.textMuted, marginBottom:6 } }, 'STAKE AMOUNT'),
            React.createElement('div', { style:{ display:'flex', alignItems:'center', justifyContent:'center', gap:12 } },
              React.createElement('button', { onClick:()=>setStakeAmt(String(Math.max(25,parseInt(stakeAmt)-25))), style:{ width:34, height:34, borderRadius:'50%', border:`2px solid ${t.border}`, background:t.surface, color:t.text, fontSize:18, cursor:'pointer' } }, '−'),
              React.createElement('div', { style:{ fontSize:48, fontWeight:700, color:data.catColor, width:100, textAlign:'center' } }, stakeAmt),
              React.createElement('button', { onClick:()=>setStakeAmt(String(parseInt(stakeAmt)+25)), style:{ width:34, height:34, borderRadius:'50%', border:`2px solid ${t.border}`, background:t.surface, color:t.text, fontSize:18, cursor:'pointer' } }, '+'),
            ),
            React.createElement('div', { style:{ fontSize:14, color:t.textMuted } }, 'sparks · You have 2,840'),
          ),
          React.createElement('div', { style:{ display:'flex', gap:8, marginBottom:16 } },
            ['25','50','100','200'].map(a =>
              React.createElement('button', { key:a, onClick:()=>setStakeAmt(a), style:{ flex:1, padding:'8px 4px', background:stakeAmt===a?data.catColor:'transparent', border:`2px solid ${stakeAmt===a?data.catColor:t.border}`, borderRadius:3, color:stakeAmt===a?'#fff':t.textMuted, fontSize:15, fontWeight:600, cursor:'pointer' } }, a)
            )
          ),
          React.createElement('div', { style:{ background:t.bg, border:`1px solid ${t.border}`, borderRadius:4, padding:'10px 12px', marginBottom:16, fontSize:13, color:t.textMuted, lineHeight:1.6 } }, `✓ If ${data.creator} completes by ${data.deadline}: you earn +15 sparks\n✗ If they fail: you lose your ${stakeAmt} spark stake`),
          React.createElement('button', { onClick:()=>setBottomSheet(null), style:{ width:'100%', background:t.secondary, border:'none', borderRadius:6, padding:16, color:'#fff', fontSize:20, fontWeight:700, cursor:'pointer' } },
            React.createElement('span', null, '🎯 Confirm Stake')
          )
        )
      )
    );
  };

  const screens = { home:HomeScreen, explore:ExploreScreen, create:CreateScreen, muse:MuseScreen, profile:ProfileScreen };
  const iconMap = { home:'Home', explore:'Compass', create:'PlusCircle', muse:'Sparkles', profile:'User' };

  return React.createElement('div', { style:{ minHeight:'100vh', background:'#f0f0f0', display:'flex', alignItems:'center', justifyContent:'center', padding:20 } },
    React.createElement('style', { dangerouslySetInnerHTML:{ __html:fontStyle } }),
    React.createElement('div', { style:{ width:375, height:812, background:t.bg, borderRadius:40, overflow:'hidden', display:'flex', flexDirection:'row', position:'relative', boxShadow:'0 30px 80px rgba(0,0,0,0.45)', border:'2px solid rgba(255,255,255,0.08)' } },
      // Sidebar
      React.createElement('div', { style:{ width:56, background:t.surface, borderRight:`3px solid ${t.border}`, display:'flex', flexDirection:'column', alignItems:'center', paddingTop:20, paddingBottom:20, gap:6, flexShrink:0, zIndex:10 } },
        React.createElement('div', { style:{ width:36, height:36, background:t.secondary, borderRadius:7, display:'flex', alignItems:'center', justifyContent:'center', fontSize:18, marginBottom:18, flexShrink:0 } }, '⚡'),
        navItems.map(item => {
          const Icon = window.lucide[iconMap[item.id]];
          const active = activeScreen===item.id;
          return React.createElement('button', { key:item.id, onClick:()=>setActiveScreen(item.id), title:item.label, style:{ width:42, height:46, background:active?t.secondary:'transparent', border:active?`2px solid ${t.secondary}`:'2px solid transparent', borderRadius:8, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', cursor:'pointer', gap:2, transition:'all 0.15s', flexShrink:0 } },
            React.createElement(Icon, { size:17, color:active?'#fff':t.textMuted }),
            React.createElement('span', { style:{ fontSize:8, color:active?'#fff':t.textMuted, fontFamily:"'Caveat', cursive", letterSpacing:0.3 } }, item.label)
          );
        })
      ),
      // Content
      React.createElement('div', { style:{ flex:1, overflow:'hidden', position:'relative', display:'flex', flexDirection:'column' } },
        React.createElement(screens[activeScreen]),
        React.createElement(BottomSheet),
      )
    )
  );
}
