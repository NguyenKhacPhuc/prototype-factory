const { useState, useEffect } = React;

// ─── Theme System ───────────────────────────────────────────────────────────
const themes = {
  dark: {
    bg: '#0D0B1A', surface: '#16132B', card: '#1E1A35', cardAlt: '#251F40',
    border: '#2D2850', borderLight: '#3A3462',
    text: '#EDE9FE', textSec: '#A79BC8', textMuted: '#6B6390',
    primary: '#8B5CF6', primaryLight: '#A78BFA', primaryDark: '#6D28D9',
    primaryBg: 'rgba(139,92,246,0.12)', primaryGlow: 'rgba(139,92,246,0.25)',
    amber: '#FBBF24', amberBg: 'rgba(251,191,36,0.12)',
    teal: '#2DD4BF', tealBg: 'rgba(45,212,191,0.12)',
    rose: '#FB7185', roseBg: 'rgba(251,113,133,0.12)',
    green: '#34D399', greenBg: 'rgba(52,211,153,0.12)',
    tagBg: '#201C3B', navBg: '#100E22',
  },
  light: {
    bg: '#F2EEFF', surface: '#FFFFFF', card: '#FDFCFF', cardAlt: '#F7F4FF',
    border: '#E4DEFF', borderLight: '#CCC4FF',
    text: '#1A1535', textSec: '#5B4D8A', textMuted: '#9E94C0',
    primary: '#7C3AED', primaryLight: '#8B5CF6', primaryDark: '#6D28D9',
    primaryBg: 'rgba(124,58,237,0.09)', primaryGlow: 'rgba(124,58,237,0.2)',
    amber: '#D97706', amberBg: 'rgba(217,119,6,0.1)',
    teal: '#0D9488', tealBg: 'rgba(13,148,136,0.1)',
    rose: '#E11D48', roseBg: 'rgba(225,29,72,0.1)',
    green: '#059669', greenBg: 'rgba(5,150,105,0.1)',
    tagBg: '#EDE9FE', navBg: '#FFFFFF',
  }
};

// ─── Data ───────────────────────────────────────────────────────────────────
const booksData = [
  { id:1, title:'Never Split the Difference', author:'Chris Voss', emoji:'🤝', progress:78, highlights:23, tags:['Negotiation','Leadership','Communication'] },
  { id:2, title:'The Whole-Brain Child', author:'Daniel J. Siegel', emoji:'🧠', progress:45, highlights:17, tags:['Parenting','Mental Health','Communication'] },
  { id:3, title:'Deep Work', author:'Cal Newport', emoji:'⚡', progress:100, highlights:31, tags:['Focus','Productivity','Studying'] },
  { id:4, title:'Atomic Habits', author:'James Clear', emoji:'🔄', progress:92, highlights:28, tags:['Habits','Leadership','Productivity'] },
  { id:5, title:'The Coddling of the American Mind', author:'Jonathan Haidt', emoji:'📖', progress:30, highlights:9, tags:['Parenting','Mental Health','Studying'] },
];

const highlightsData = [
  { id:1, text:"The most dangerous negotiation is the one you don't know you're in.", book:'Never Split the Difference', author:'Chris Voss', emoji:'🤝', tags:['Negotiation','Leadership'], plain:'Stay alert — even casual conversations can shift into negotiations.', usedCount:7 },
  { id:2, text:"Connect first, then redirect. When your child is upset, empathize before you educate.", book:'The Whole-Brain Child', author:'Daniel J. Siegel', emoji:'🧠', tags:['Parenting','Mental Health'], plain:'Acknowledge feelings first, correct behavior second.', usedCount:12 },
  { id:3, text:"Clarity about what matters provides clarity about what does not.", book:'Deep Work', author:'Cal Newport', emoji:'⚡', tags:['Focus','Productivity'], plain:'Knowing your priorities automatically filters out distractions.', usedCount:5 },
  { id:4, text:"You do not rise to the level of your goals. You fall to the level of your systems.", book:'Atomic Habits', author:'James Clear', emoji:'🔄', tags:['Habits','Leadership'], plain:'Good systems beat strong willpower every time.', usedCount:19 },
];

const momentsData = [
  { id:'job-interview', label:'Job Interview', emoji:'💼', count:8 },
  { id:'anxious-night', label:'Anxious Night', emoji:'🌙', count:12 },
  { id:'team-feedback', label:'Team Feedback', emoji:'💬', count:15 },
  { id:'parenting', label:'Parenting', emoji:'👨‍👧', count:22 },
  { id:'studying', label:'Studying', emoji:'📚', count:18 },
  { id:'leadership', label:'Leadership', emoji:'🎯', count:19 },
  { id:'negotiation', label:'Negotiation', emoji:'🤝', count:14 },
  { id:'mental-health', label:'Mental Health', emoji:'🌿', count:11 },
];

const threadsData = [
  {
    id:1, theme:'The Power of Listening', color:'#8B5CF6',
    desc:'Three authors, same insight — deep listening changes outcomes.',
    quotes:[
      { book:'Never Split the Difference', text:"The sweetest sound to anyone is their own name being taken seriously." },
      { book:'The Whole-Brain Child', text:"Feeling felt is the foundation of connection." },
      { book:'Atomic Habits', text:"You become what you repeatedly attend to." },
    ]
  },
  {
    id:2, theme:'Resistance & Behavior Change', color:'#FBBF24',
    desc:'Why we resist change and how tiny actions unlock big shifts.',
    quotes:[
      { book:'Atomic Habits', text:"You do not rise to your goals. You fall to your systems." },
      { book:'Deep Work', text:"Efforts to deepen focus fail if you don't wean from distraction." },
      { book:'Never Split the Difference', text:"No is not the end. It's the beginning of the negotiation." },
    ]
  },
  {
    id:3, theme:'Calm Wins Every Room', color:'#2DD4BF',
    desc:'Composure is a superpower across parenting, leadership, and conflict.',
    quotes:[
      { book:'The Whole-Brain Child', text:"A regulated adult is the most powerful tool in any difficult moment." },
      { book:'Never Split the Difference', text:"When you're calm, you radiate confidence — and people feel it." },
      { book:'Deep Work', text:"The ability to concentrate is becoming the superpower of the 21st century." },
    ]
  },
];

// ─── Reusable Components ─────────────────────────────────────────────────────
function Chip({ label, color, bg }) {
  return React.createElement('span', {
    style:{ fontSize:11, fontWeight:600, color, backgroundColor:bg, borderRadius:20, padding:'3px 10px', whiteSpace:'nowrap', letterSpacing:0.2 }
  }, label);
}

function StatusBar({ t }) {
  const Wifi = window.lucide.Wifi;
  const Battery = window.lucide.Battery;
  return React.createElement('div', {
    style:{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'14px 20px 6px', backgroundColor:t.bg, position:'relative', flexShrink:0 }
  },
    React.createElement('span', { style:{ fontSize:13, fontWeight:700, color:t.text } }, '9:41'),
    React.createElement('div', { style:{ position:'absolute', left:'50%', top:10, transform:'translateX(-50%)', width:120, height:32, backgroundColor:'#000', borderRadius:20 } }),
    React.createElement('div', { style:{ display:'flex', alignItems:'center', gap:6 } },
      React.createElement(Wifi, { size:14, color:t.textSec }),
      React.createElement(Battery, { size:15, color:t.textSec })
    )
  );
}

// ─── Home Screen ─────────────────────────────────────────────────────────────
function HomeScreen({ t }) {
  const [idx, setIdx] = useState(0);
  const Bell = window.lucide.Bell;
  const RefreshCw = window.lucide.RefreshCw;
  const ChevronRight = window.lucide.ChevronRight;
  const Zap = window.lucide.Zap;
  const h = highlightsData[idx % highlightsData.length];

  return React.createElement('div', { style:{ flex:1, overflowY:'auto', backgroundColor:t.bg, padding:'0 16px 16px' } },
    // Header
    React.createElement('div', { style:{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', paddingTop:4, marginBottom:18 } },
      React.createElement('div', null,
        React.createElement('p', { style:{ fontSize:12, color:t.textMuted, margin:0, marginBottom:2 } }, 'Monday, March 23'),
        React.createElement('h1', { style:{ fontSize:21, fontWeight:800, color:t.text, margin:0 } }, 'Good evening, Alex 👋')
      ),
      React.createElement('div', { style:{ width:38, height:38, borderRadius:12, backgroundColor:t.primaryBg, border:`1px solid ${t.border}`, display:'flex', alignItems:'center', justifyContent:'center' } },
        React.createElement(Bell, { size:18, color:t.primary })
      )
    ),
    // Context alert
    React.createElement('div', { style:{ backgroundColor:t.amberBg, border:`1px solid ${t.amber}35`, borderRadius:14, padding:'11px 14px', marginBottom:16, display:'flex', alignItems:'center', gap:10, cursor:'pointer' } },
      React.createElement('span', { style:{ fontSize:20 } }, '📅'),
      React.createElement('div', { style:{ flex:1 } },
        React.createElement('p', { style:{ fontSize:12, fontWeight:700, color:t.amber, margin:0, marginBottom:1 } }, 'Team 1-on-1 in 2 hours'),
        React.createElement('p', { style:{ fontSize:12, color:t.textSec, margin:0 } }, '3 conflict-resolution passages ready')
      ),
      React.createElement(ChevronRight, { size:15, color:t.amber })
    ),
    // Resurface card
    React.createElement('div', { style:{ marginBottom:20 } },
      React.createElement('div', { style:{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10 } },
        React.createElement('h2', { style:{ fontSize:14, fontWeight:700, color:t.text, margin:0 } }, "Today's Resurface"),
        React.createElement('button', { onClick:()=>setIdx(idx+1), style:{ display:'flex', alignItems:'center', gap:4, fontSize:12, color:t.primary, fontWeight:600, background:'none', border:'none', cursor:'pointer', fontFamily:'inherit', padding:0 } },
          React.createElement(RefreshCw, { size:12 }), ' Refresh'
        )
      ),
      React.createElement('div', { style:{ backgroundColor:t.card, border:`1px solid ${t.border}`, borderRadius:18, padding:'16px 16px 14px', position:'relative', overflow:'hidden' } },
        React.createElement('div', { style:{ position:'absolute', top:-12, left:8, fontSize:80, color:t.primary, opacity:0.07, fontWeight:900, lineHeight:1, userSelect:'none', pointerEvents:'none' } }, '"'),
        React.createElement('div', { style:{ display:'flex', alignItems:'center', gap:8, marginBottom:10 } },
          React.createElement('span', { style:{ fontSize:18 } }, h.emoji),
          React.createElement('div', null,
            React.createElement('p', { style:{ fontSize:12, fontWeight:700, color:t.textSec, margin:0 } }, h.book),
            React.createElement('p', { style:{ fontSize:11, color:t.textMuted, margin:0 } }, h.author)
          )
        ),
        React.createElement('p', { style:{ fontSize:14, lineHeight:1.65, color:t.text, fontStyle:'italic', marginBottom:12, fontWeight:500 } }, `"${h.text}"`),
        React.createElement('div', { style:{ backgroundColor:t.primaryBg, borderRadius:10, padding:'9px 12px', marginBottom:12 } },
          React.createElement('p', { style:{ fontSize:11, fontWeight:700, color:t.primary, margin:0, marginBottom:3 } }, '💡 Plain Rewrite'),
          React.createElement('p', { style:{ fontSize:13, color:t.textSec, margin:0, lineHeight:1.5 } }, h.plain)
        ),
        React.createElement('div', { style:{ display:'flex', justifyContent:'space-between', alignItems:'center' } },
          React.createElement('div', { style:{ display:'flex', gap:6, flexWrap:'wrap' } },
            h.tags.map(tag => React.createElement(Chip, { key:tag, label:tag, color:t.primary, bg:t.primaryBg }))
          ),
          React.createElement('div', { style:{ display:'flex', alignItems:'center', gap:3 } },
            React.createElement(Zap, { size:12, color:t.amber }),
            React.createElement('span', { style:{ fontSize:11, color:t.textMuted } }, `Used ${h.usedCount}×`)
          )
        )
      )
    ),
    // Continue reading
    React.createElement('div', { style:{ marginBottom:20 } },
      React.createElement('div', { style:{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10 } },
        React.createElement('h2', { style:{ fontSize:14, fontWeight:700, color:t.text, margin:0 } }, 'Continue Reading'),
        React.createElement('span', { style:{ fontSize:12, color:t.primary, fontWeight:600 } }, 'See all')
      ),
      React.createElement('div', { style:{ display:'flex', gap:10, overflowX:'auto', paddingBottom:4 } },
        booksData.slice(0,3).map(b =>
          React.createElement('div', { key:b.id, style:{ minWidth:138, backgroundColor:t.card, border:`1px solid ${t.border}`, borderRadius:14, padding:13, flexShrink:0 } },
            React.createElement('span', { style:{ fontSize:28, display:'block', marginBottom:8 } }, b.emoji),
            React.createElement('p', { style:{ fontSize:12, fontWeight:700, color:t.text, margin:0, marginBottom:3, lineHeight:1.3 } }, b.title),
            React.createElement('p', { style:{ fontSize:11, color:t.textMuted, margin:0, marginBottom:9 } }, b.author),
            React.createElement('div', { style:{ height:4, backgroundColor:t.border, borderRadius:2, marginBottom:4 } },
              React.createElement('div', { style:{ height:'100%', width:`${b.progress}%`, backgroundColor:t.primary, borderRadius:2 } })
            ),
            React.createElement('p', { style:{ fontSize:11, color:t.textMuted, margin:0 } }, `${b.progress}% · ${b.highlights} saved`)
          )
        )
      )
    ),
    // Applied knowledge
    React.createElement('div', { style:{ backgroundColor:t.card, border:`1px solid ${t.border}`, borderRadius:16, padding:'14px 16px' } },
      React.createElement('p', { style:{ fontSize:13, fontWeight:700, color:t.text, margin:0, marginBottom:12 } }, '🔥 Applied Knowledge This Week'),
      React.createElement('div', { style:{ display:'flex', gap:8 } },
        [{ v:'108', l:'Saved' }, { v:'47', l:'Applied' }, { v:'8', l:'Contexts' }].map(s =>
          React.createElement('div', { key:s.l, style:{ flex:1, textAlign:'center', backgroundColor:t.bg, borderRadius:12, padding:'10px 4px' } },
            React.createElement('p', { style:{ fontSize:20, fontWeight:800, color:t.primary, margin:0 } }, s.v),
            React.createElement('p', { style:{ fontSize:11, color:t.textMuted, margin:0 } }, s.l)
          )
        )
      )
    )
  );
}

// ─── Library Screen ───────────────────────────────────────────────────────────
function LibraryScreen({ t }) {
  const [selected, setSelected] = useState(null);
  const Plus = window.lucide.Plus;
  const Search = window.lucide.Search;
  const ChevronRight = window.lucide.ChevronRight;

  if (selected) {
    const book = booksData.find(b => b.id === selected);
    const bookHighlights = highlightsData.filter(h => h.book === book.title);
    return React.createElement('div', { style:{ flex:1, overflowY:'auto', backgroundColor:t.bg } },
      React.createElement('div', { style:{ background:`linear-gradient(180deg,${t.primaryBg} 0%,${t.bg} 100%)`, padding:'12px 16px 20px' } },
        React.createElement('button', { onClick:()=>setSelected(null), style:{ fontSize:13, color:t.primary, fontWeight:600, background:'none', border:'none', cursor:'pointer', fontFamily:'inherit', padding:0, marginBottom:16 } }, '← Back'),
        React.createElement('div', { style:{ display:'flex', gap:14, alignItems:'flex-start' } },
          React.createElement('span', { style:{ fontSize:48 } }, book.emoji),
          React.createElement('div', null,
            React.createElement('h2', { style:{ fontSize:17, fontWeight:800, color:t.text, margin:0, marginBottom:4, lineHeight:1.3 } }, book.title),
            React.createElement('p', { style:{ fontSize:13, color:t.textSec, margin:0, marginBottom:10 } }, book.author),
            React.createElement('div', { style:{ display:'flex', gap:5, flexWrap:'wrap' } },
              book.tags.map(tag => React.createElement(Chip, { key:tag, label:tag, color:t.primary, bg:t.primaryBg }))
            )
          )
        ),
        React.createElement('div', { style:{ marginTop:14, height:5, backgroundColor:t.border, borderRadius:3 } },
          React.createElement('div', { style:{ height:'100%', width:`${book.progress}%`, background:`linear-gradient(90deg,${t.primary},${t.primaryLight})`, borderRadius:3 } })
        ),
        React.createElement('p', { style:{ fontSize:12, color:t.textMuted, marginTop:5 } }, `${book.progress}% · ${book.highlights} highlights`)
      ),
      React.createElement('div', { style:{ padding:'0 16px 16px' } },
        React.createElement('h3', { style:{ fontSize:14, fontWeight:700, color:t.text, marginBottom:12 } }, bookHighlights.length ? `${bookHighlights.length} Saved Highlights` : 'No highlights yet'),
        bookHighlights.map(h =>
          React.createElement('div', { key:h.id, style:{ backgroundColor:t.card, border:`1px solid ${t.border}`, borderRadius:14, padding:14, marginBottom:12 } },
            React.createElement('p', { style:{ fontSize:14, fontStyle:'italic', color:t.text, margin:0, marginBottom:10, lineHeight:1.6 } }, `"${h.text}"`),
            React.createElement('div', { style:{ backgroundColor:t.primaryBg, borderRadius:8, padding:'7px 10px', marginBottom:8 } },
              React.createElement('p', { style:{ fontSize:12, color:t.primary, margin:0 } }, '💡 ' + h.plain)
            ),
            React.createElement('div', { style:{ display:'flex', gap:5 } },
              h.tags.map(tag => React.createElement(Chip, { key:tag, label:tag, color:t.primary, bg:t.primaryBg }))
            )
          )
        )
      )
    );
  }

  return React.createElement('div', { style:{ flex:1, overflowY:'auto', backgroundColor:t.bg, padding:'0 16px 16px' } },
    React.createElement('div', { style:{ display:'flex', justifyContent:'space-between', alignItems:'center', paddingTop:4, marginBottom:14 } },
      React.createElement('h1', { style:{ fontSize:21, fontWeight:800, color:t.text, margin:0 } }, 'Library'),
      React.createElement('div', { style:{ width:36, height:36, borderRadius:10, backgroundColor:t.primary, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' } },
        React.createElement(Plus, { size:18, color:'#fff' })
      )
    ),
    React.createElement('div', { style:{ display:'flex', alignItems:'center', gap:10, backgroundColor:t.card, border:`1px solid ${t.border}`, borderRadius:12, padding:'10px 14px', marginBottom:14 } },
      React.createElement(Search, { size:15, color:t.textMuted }),
      React.createElement('span', { style:{ fontSize:14, color:t.textMuted } }, 'Search books, highlights…')
    ),
    React.createElement('div', { style:{ display:'flex', gap:8, marginBottom:18 } },
      [{ l:'5 Books' }, { l:'108 Ideas' }, { l:'8 Contexts' }].map((s,i) =>
        React.createElement('div', { key:i, style:{ flex:1, backgroundColor:t.card, border:`1px solid ${t.border}`, borderRadius:12, padding:'10px 6px', textAlign:'center' } },
          React.createElement('p', { style:{ fontSize:13, fontWeight:700, color:t.text, margin:0 } }, s.l)
        )
      )
    ),
    booksData.map(b =>
      React.createElement('div', { key:b.id, onClick:()=>setSelected(b.id), style:{ backgroundColor:t.card, border:`1px solid ${t.border}`, borderRadius:16, padding:'13px 14px', marginBottom:10, display:'flex', alignItems:'center', gap:12, cursor:'pointer' } },
        React.createElement('span', { style:{ fontSize:30, flexShrink:0 } }, b.emoji),
        React.createElement('div', { style:{ flex:1, minWidth:0 } },
          React.createElement('p', { style:{ fontSize:14, fontWeight:700, color:t.text, margin:0, marginBottom:2 } }, b.title),
          React.createElement('p', { style:{ fontSize:12, color:t.textMuted, margin:0, marginBottom:7 } }, `${b.author} · ${b.highlights} highlights`),
          React.createElement('div', { style:{ height:4, backgroundColor:t.border, borderRadius:2 } },
            React.createElement('div', { style:{ height:'100%', width:`${b.progress}%`, backgroundColor:t.primary, borderRadius:2 } })
          )
        ),
        React.createElement(ChevronRight, { size:15, color:t.textMuted, flexShrink:0 })
      )
    )
  );
}

// ─── Insights Screen ──────────────────────────────────────────────────────────
function InsightsScreen({ t }) {
  const [sel, setSel] = useState(null);
  const Sparkles = window.lucide.Sparkles;
  const BookOpen = window.lucide.BookOpen;

  if (sel !== null) {
    const thread = threadsData[sel];
    return React.createElement('div', { style:{ flex:1, overflowY:'auto', backgroundColor:t.bg, padding:'0 16px 16px' } },
      React.createElement('button', { onClick:()=>setSel(null), style:{ fontSize:13, color:t.primary, fontWeight:600, background:'none', border:'none', cursor:'pointer', fontFamily:'inherit', padding:'4px 0 0', marginBottom:16 } }, '← All Threads'),
      React.createElement('div', { style:{ background:`linear-gradient(135deg,${thread.color}18,${thread.color}06)`, border:`1px solid ${thread.color}35`, borderRadius:16, padding:'16px', marginBottom:20 } },
        React.createElement('h2', { style:{ fontSize:18, fontWeight:800, color:t.text, margin:0, marginBottom:6 } }, thread.theme),
        React.createElement('p', { style:{ fontSize:13, color:t.textSec, margin:0 } }, thread.desc)
      ),
      React.createElement('h3', { style:{ fontSize:13, fontWeight:700, color:t.textMuted, marginBottom:14, textTransform:'uppercase', letterSpacing:0.8 } }, `${thread.quotes.length} Books · Same Insight`),
      thread.quotes.map((q, i) =>
        React.createElement('div', { key:i, style:{ marginBottom:14 } },
          React.createElement('div', { style:{ display:'flex', alignItems:'center', gap:8, marginBottom:7 } },
            React.createElement('div', { style:{ width:22, height:22, borderRadius:7, backgroundColor:`${thread.color}20`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 } },
              React.createElement('span', { style:{ fontSize:11, fontWeight:700, color:thread.color } }, i+1)
            ),
            React.createElement('p', { style:{ fontSize:12, fontWeight:700, color:t.textSec, margin:0 } }, q.book)
          ),
          React.createElement('div', { style:{ backgroundColor:t.card, border:`1px solid ${t.border}`, borderLeft:`3px solid ${thread.color}`, borderRadius:'0 12px 12px 0', padding:'12px 14px', marginLeft:11 } },
            React.createElement('p', { style:{ fontSize:14, fontStyle:'italic', color:t.text, margin:0, lineHeight:1.65 } }, `"${q.text}"`)
          )
        )
      )
    );
  }

  return React.createElement('div', { style:{ flex:1, overflowY:'auto', backgroundColor:t.bg, padding:'0 16px 16px' } },
    React.createElement('div', { style:{ paddingTop:4, marginBottom:18 } },
      React.createElement('h1', { style:{ fontSize:21, fontWeight:800, color:t.text, margin:0, marginBottom:4 } }, 'Cross-Book Insights'),
      React.createElement('p', { style:{ fontSize:13, color:t.textMuted, margin:0 } }, 'Themes that connect your reading')
    ),
    React.createElement('div', { style:{ background:`linear-gradient(135deg,${t.primaryBg},${t.bg})`, border:`1px solid ${t.primary}30`, borderRadius:16, padding:'13px 16px', marginBottom:18, display:'flex', gap:12, alignItems:'center' } },
      React.createElement(Sparkles, { size:26, color:t.primary }),
      React.createElement('div', null,
        React.createElement('p', { style:{ fontSize:13, fontWeight:700, color:t.text, margin:0, marginBottom:2 } }, '3 insight threads found'),
        React.createElement('p', { style:{ fontSize:12, color:t.textSec, margin:0 } }, 'Patterns detected across your 5 books')
      )
    ),
    threadsData.map((thread, i) =>
      React.createElement('div', { key:thread.id, onClick:()=>setSel(i), style:{ backgroundColor:t.card, border:`1px solid ${t.border}`, borderRadius:18, padding:16, marginBottom:12, cursor:'pointer' } },
        React.createElement('div', { style:{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:8 } },
          React.createElement('h3', { style:{ fontSize:15, fontWeight:700, color:t.text, margin:0, lineHeight:1.3, maxWidth:'70%' } }, thread.theme),
          React.createElement('span', { style:{ fontSize:11, fontWeight:700, color:thread.color, backgroundColor:`${thread.color}18`, padding:'3px 10px', borderRadius:20 } }, `${thread.quotes.length} books`)
        ),
        React.createElement('p', { style:{ fontSize:13, color:t.textSec, margin:0, marginBottom:12, lineHeight:1.5 } }, thread.desc),
        React.createElement('div', { style:{ display:'flex', gap:6, flexWrap:'wrap' } },
          thread.quotes.map(q =>
            React.createElement('span', { key:q.book, style:{ fontSize:11, color:t.textSec, backgroundColor:t.tagBg, padding:'3px 9px', borderRadius:8 } },
              q.book.split(' ').slice(0,3).join(' ') + (q.book.split(' ').length > 3 ? '…' : '')
            )
          )
        )
      )
    ),
    React.createElement('div', { style:{ border:`1px dashed ${t.border}`, borderRadius:16, padding:20, textAlign:'center' } },
      React.createElement(BookOpen, { size:26, color:t.textMuted, style:{ margin:'0 auto 8px', display:'block' } }),
      React.createElement('p', { style:{ fontSize:13, color:t.textMuted, margin:0 } }, 'Add more highlights to unlock new threads')
    )
  );
}

// ─── Moments Screen ───────────────────────────────────────────────────────────
function MomentsScreen({ t }) {
  const [selMoment, setSelMoment] = useState(null);
  const LucideTag = window.lucide.Tag;

  if (selMoment) {
    const moment = momentsData.find(m => m.id === selMoment);
    return React.createElement('div', { style:{ flex:1, overflowY:'auto', backgroundColor:t.bg, padding:'0 16px 16px' } },
      React.createElement('button', { onClick:()=>setSelMoment(null), style:{ fontSize:13, color:t.primary, fontWeight:600, background:'none', border:'none', cursor:'pointer', fontFamily:'inherit', padding:'4px 0 0', marginBottom:16 } }, '← All Moments'),
      React.createElement('div', { style:{ display:'flex', alignItems:'center', gap:14, marginBottom:20 } },
        React.createElement('div', { style:{ width:60, height:60, borderRadius:18, backgroundColor:t.primaryBg, border:`1px solid ${t.border}`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:30 } }, moment.emoji),
        React.createElement('div', null,
          React.createElement('h2', { style:{ fontSize:20, fontWeight:800, color:t.text, margin:0 } }, moment.label),
          React.createElement('p', { style:{ fontSize:13, color:t.textMuted, margin:0 } }, `${moment.count} saved passages`)
        )
      ),
      highlightsData.concat(highlightsData).slice(0,3).map((h, i) =>
        React.createElement('div', { key:i, style:{ backgroundColor:t.card, border:`1px solid ${t.border}`, borderRadius:16, padding:14, marginBottom:12 } },
          React.createElement('div', { style:{ display:'flex', alignItems:'center', gap:6, marginBottom:10 } },
            React.createElement('span', { style:{ fontSize:14 } }, h.emoji),
            React.createElement('span', { style:{ fontSize:12, fontWeight:700, color:t.textSec } }, h.book)
          ),
          React.createElement('p', { style:{ fontSize:14, fontStyle:'italic', color:t.text, margin:0, marginBottom:10, lineHeight:1.65 } }, `"${h.text}"`),
          React.createElement('div', { style:{ backgroundColor:t.primaryBg, borderRadius:8, padding:'8px 10px' } },
            React.createElement('p', { style:{ fontSize:12, color:t.primary, margin:0, fontWeight:600 } }, '💡 ' + h.plain)
          )
        )
      )
    );
  }

  return React.createElement('div', { style:{ flex:1, overflowY:'auto', backgroundColor:t.bg, padding:'0 16px 16px' } },
    React.createElement('div', { style:{ paddingTop:4, marginBottom:18 } },
      React.createElement('h1', { style:{ fontSize:21, fontWeight:800, color:t.text, margin:0, marginBottom:4 } }, 'Life Moments'),
      React.createElement('p', { style:{ fontSize:13, color:t.textMuted, margin:0 } }, 'The right insight for any situation')
    ),
    React.createElement('div', { style:{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:14 } },
      momentsData.map(m =>
        React.createElement('div', { key:m.id, onClick:()=>setSelMoment(m.id), style:{ backgroundColor:t.card, border:`1px solid ${t.border}`, borderRadius:16, padding:'15px 13px', cursor:'pointer' } },
          React.createElement('span', { style:{ fontSize:30, display:'block', marginBottom:8 } }, m.emoji),
          React.createElement('p', { style:{ fontSize:13, fontWeight:700, color:t.text, margin:0, marginBottom:3 } }, m.label),
          React.createElement('p', { style:{ fontSize:11, color:t.textMuted, margin:0 } }, `${m.count} passages`)
        )
      )
    ),
    React.createElement('div', { style:{ backgroundColor:t.primaryBg, border:`1px solid ${t.primary}30`, borderRadius:16, padding:'13px 16px', display:'flex', alignItems:'center', justifyContent:'space-between', cursor:'pointer' } },
      React.createElement('div', null,
        React.createElement('p', { style:{ fontSize:13, fontWeight:700, color:t.text, margin:0, marginBottom:2 } }, '+ Create a life context'),
        React.createElement('p', { style:{ fontSize:12, color:t.textSec, margin:0 } }, 'Tag passages to any moment')
      ),
      React.createElement(LucideTag, { size:18, color:t.primary })
    )
  );
}

// ─── Settings / Profile Screen ────────────────────────────────────────────────
function SettingsScreen({ t, isDark, setIsDark }) {
  const Sun = window.lucide.Sun;
  const Moon = window.lucide.Moon;
  const Bell = window.lucide.Bell;
  const Shield = window.lucide.Shield;
  const HelpCircle = window.lucide.HelpCircle;
  const ChevronRight = window.lucide.ChevronRight;
  const Zap = window.lucide.Zap;

  const settingsItems = [
    { icon:Bell, label:'Notifications', sub:'Context-aware resurfacing' },
    { icon:Shield, label:'Privacy & Data', sub:'Your highlights stay private' },
    { icon:HelpCircle, label:'Help & Feedback', sub:'Contact support' },
  ];

  return React.createElement('div', { style:{ flex:1, overflowY:'auto', backgroundColor:t.bg, padding:'0 16px 16px' } },
    React.createElement('h1', { style:{ fontSize:21, fontWeight:800, color:t.text, margin:0, paddingTop:4, marginBottom:16 } }, 'Profile'),
    // Avatar card
    React.createElement('div', { style:{ backgroundColor:t.card, border:`1px solid ${t.border}`, borderRadius:18, padding:16, display:'flex', alignItems:'center', gap:14, marginBottom:16 } },
      React.createElement('div', { style:{ width:56, height:56, borderRadius:18, background:`linear-gradient(135deg,${t.primary},#C084FC)`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:24 } }, '📚'),
      React.createElement('div', null,
        React.createElement('h2', { style:{ fontSize:16, fontWeight:800, color:t.text, margin:0 } }, 'Alex Thompson'),
        React.createElement('p', { style:{ fontSize:12, color:t.textMuted, margin:0 } }, 'Reading since Jan 2024')
      )
    ),
    // Applied Knowledge
    React.createElement('div', { style:{ backgroundColor:t.card, border:`1px solid ${t.border}`, borderRadius:16, padding:16, marginBottom:16 } },
      React.createElement('div', { style:{ display:'flex', alignItems:'center', gap:6, marginBottom:14 } },
        React.createElement(Zap, { size:15, color:t.amber }),
        React.createElement('h3', { style:{ fontSize:14, fontWeight:700, color:t.text, margin:0 } }, 'Applied Knowledge Record')
      ),
      React.createElement('div', { style:{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 } },
        [
          { l:'Total Highlights', v:'108', c:t.primary },
          { l:'Times Applied', v:'47', c:t.amber },
          { l:'Books Read', v:'5', c:t.teal },
          { l:'Day Streak', v:'12 🔥', c:t.rose },
        ].map(s =>
          React.createElement('div', { key:s.l, style:{ backgroundColor:t.bg, borderRadius:12, padding:'11px 13px' } },
            React.createElement('p', { style:{ fontSize:20, fontWeight:800, color:s.c, margin:0, marginBottom:2 } }, s.v),
            React.createElement('p', { style:{ fontSize:11, color:t.textMuted, margin:0 } }, s.l)
          )
        )
      )
    ),
    // Theme toggle
    React.createElement('div', { style:{ backgroundColor:t.card, border:`1px solid ${t.border}`, borderRadius:16, padding:'13px 16px', marginBottom:12 } },
      React.createElement('div', { style:{ display:'flex', justifyContent:'space-between', alignItems:'center' } },
        React.createElement('div', { style:{ display:'flex', alignItems:'center', gap:10 } },
          React.createElement('div', { style:{ width:36, height:36, borderRadius:10, backgroundColor:t.primaryBg, display:'flex', alignItems:'center', justifyContent:'center' } },
            isDark ? React.createElement(Moon, { size:17, color:t.primary }) : React.createElement(Sun, { size:17, color:t.primary })
          ),
          React.createElement('div', null,
            React.createElement('p', { style:{ fontSize:14, fontWeight:600, color:t.text, margin:0 } }, isDark ? 'Dark Mode' : 'Light Mode'),
            React.createElement('p', { style:{ fontSize:12, color:t.textMuted, margin:0 } }, 'Tap to switch theme')
          )
        ),
        React.createElement('div', { onClick:()=>setIsDark(!isDark), style:{ width:52, height:28, borderRadius:14, backgroundColor:isDark ? t.primary : t.border, position:'relative', cursor:'pointer', transition:'background-color 0.3s' } },
          React.createElement('div', { style:{ position:'absolute', top:3, left:isDark ? 26 : 3, width:22, height:22, borderRadius:11, backgroundColor:'#fff', transition:'left 0.3s', boxShadow:'0 1px 4px rgba(0,0,0,0.3)' } })
        )
      )
    ),
    settingsItems.map((item, i) =>
      React.createElement('div', { key:i, style:{ backgroundColor:t.card, border:`1px solid ${t.border}`, borderRadius:14, padding:'13px 16px', marginBottom:8, display:'flex', alignItems:'center', gap:12, cursor:'pointer' } },
        React.createElement('div', { style:{ width:36, height:36, borderRadius:10, backgroundColor:t.primaryBg, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 } },
          React.createElement(item.icon, { size:17, color:t.primary })
        ),
        React.createElement('div', { style:{ flex:1 } },
          React.createElement('p', { style:{ fontSize:14, fontWeight:600, color:t.text, margin:0 } }, item.label),
          React.createElement('p', { style:{ fontSize:12, color:t.textMuted, margin:0 } }, item.sub)
        ),
        React.createElement(ChevronRight, { size:15, color:t.textMuted })
      )
    ),
    React.createElement('p', { style:{ textAlign:'center', fontSize:12, color:t.textMuted, marginTop:16 } }, 'MarginMuse v1.0.0 · Books, reframed around your life.')
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500&display=swap';
    document.head.appendChild(link);
    document.body.style.cssText = 'margin:0;padding:0;background:#1a1625;display:flex;align-items:center;justify-content:center;min-height:100vh;font-family:"Plus Jakarta Sans",sans-serif;';
  }, []);

  const t = isDark ? themes.dark : themes.light;

  const tabs = [
    { id:'home',     label:'Home',     icon: window.lucide.Home },
    { id:'library',  label:'Library',  icon: window.lucide.BookOpen },
    { id:'insights', label:'Insights', icon: window.lucide.Sparkles },
    { id:'moments',  label:'Moments',  icon: window.lucide.Tag },
    { id:'profile',  label:'Profile',  icon: window.lucide.User },
  ];

  const screens = {
    home:     HomeScreen,
    library:  LibraryScreen,
    insights: InsightsScreen,
    moments:  MomentsScreen,
    profile:  SettingsScreen,
  };

  const navItemStyle = (isActive) => ({
    display:'flex', flexDirection:'column', alignItems:'center', gap:3,
    padding:'6px 12px', borderRadius:12, cursor:'pointer', transition:'all 0.2s',
    backgroundColor: isActive ? t.primaryBg : 'transparent',
  });

  const labelStyle = (isActive) => ({
    fontSize:10, fontWeight: isActive ? 700 : 500,
    color: isActive ? t.primary : t.textMuted,
    letterSpacing:0.3,
  });

  return React.createElement('div', {
    style:{ minHeight:'100vh', backgroundColor:'#1a1625', display:'flex', alignItems:'center', justifyContent:'center', padding:'20px 0' }
  },
    React.createElement('div', {
      style:{
        width:375, height:812, borderRadius:44, overflow:'hidden',
        backgroundColor:t.bg, display:'flex', flexDirection:'column',
        fontFamily:'"Plus Jakarta Sans",sans-serif',
        boxShadow: isDark
          ? '0 40px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.06), inset 0 0 0 1px rgba(255,255,255,0.03)'
          : '0 40px 100px rgba(0,0,0,0.25), 0 0 0 1px rgba(0,0,0,0.1)',
        transition:'background-color 0.3s',
      }
    },
      React.createElement(StatusBar, { t }),
      React.createElement('div', { style:{ flex:1, overflow:'hidden', display:'flex', flexDirection:'column' } },
        React.createElement(screens[activeTab], { t, isDark, setIsDark })
      ),
      // Bottom nav
      React.createElement('div', {
        style:{ backgroundColor:t.navBg, borderTop:`1px solid ${t.border}`, padding:'8px 4px 20px', display:'flex', justifyContent:'space-around', alignItems:'center', flexShrink:0 }
      },
        tabs.map(tab => {
          const isActive = activeTab === tab.id;
          return React.createElement('div', {
            key: tab.id,
            onClick: () => setActiveTab(tab.id),
            style: navItemStyle(isActive),
          },
            React.createElement(tab.icon, { size:22, color: isActive ? t.primary : t.textMuted, strokeWidth: isActive ? 2.5 : 1.8 }),
            React.createElement('span', { style: labelStyle(isActive) }, tab.label)
          );
        })
      )
    )
  );
}
