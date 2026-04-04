
const { useState, useEffect, useRef } = React;

// ─── THEMES ───────────────────────────────────────────────────────────────────
const themes = {
  light: {
    bg: '#F4EDD6',
    surface: '#EDE0C4',
    card: '#FBF5E8',
    primary: '#3D6B35',
    primaryLight: '#5A8A52',
    secondary: '#8B4FB8',
    secondaryLight: '#A87FD4',
    accent: '#C4621D',
    accentLight: '#E8845A',
    sage: '#5B9B8A',
    warm: '#E8A45A',
    text: '#2A2018',
    textMuted: '#6B5A3E',
    textLight: '#9B8B6A',
    border: '#C8B89A',
    borderLight: '#DDD0B4',
    shadow: 'rgba(42,32,24,0.10)',
  },
  dark: {
    bg: '#1A1F15',
    surface: '#252B1E',
    card: '#2A3322',
    primary: '#7CB87A',
    primaryLight: '#9DD49B',
    secondary: '#B87FD4',
    secondaryLight: '#CCA0E8',
    accent: '#E8845A',
    accentLight: '#F0A077',
    sage: '#7BC4AD',
    warm: '#D4945A',
    text: '#EDE8D5',
    textMuted: '#A89B7E',
    textLight: '#786A52',
    border: '#3A4530',
    borderLight: '#2E3825',
    shadow: 'rgba(0,0,0,0.35)',
  },
};

// ─── DATA ─────────────────────────────────────────────────────────────────────
const bioGemsData = [
  { id:1,  name:'Moonbell Orchid',  type:'flora',    rarity:'common',    gemColor:'#C4A8E8', emoji:'🌸', lore:'Blooms under starlight, humming with gentle frequencies that heal nearby plants.',             earned:true  },
  { id:2,  name:'Ember Toad',       type:'fauna',    rarity:'uncommon',  gemColor:'#E8845A', emoji:'🐸', lore:'Found near volcanic springs; its skin glows warmly like cooling lava at dusk.',             earned:true  },
  { id:3,  name:'Crystal Fern',     type:'flora',    rarity:'rare',      gemColor:'#7BC4AD', emoji:'🌿', lore:'Each frond refracts sunlight into healing wavelengths visible only to forest creatures.',    earned:true  },
  { id:4,  name:'Void Jellyfish',   type:'fauna',    rarity:'epic',      gemColor:'#5A8A52', emoji:'🎐', lore:'Drifts between dimensions, trailing quantum silk that mends torn ecosystems.',               earned:false },
  { id:5,  name:'Sunheart Bloom',   type:'flora',    rarity:'common',    gemColor:'#E8A45A', emoji:'🌻', lore:'Converts pure emotion into photosynthetic energy, feeding entire meadows.',                  earned:true  },
  { id:6,  name:'Stone Moth',       type:'fauna',    rarity:'uncommon',  gemColor:'#9B8B6A', emoji:'🦋', lore:'Wings carved from ancient limestone by millions of years of patient wind.',                  earned:false },
  { id:7,  name:'Prism Coral',      type:'mystical', rarity:'epic',      gemColor:'#E8845A', emoji:'🪸', lore:'A living prism that splits ocean currents into rainbow tides, restoring entire reefs.',     earned:true  },
  { id:8,  name:'Whisper Reed',     type:'flora',    rarity:'common',    gemColor:'#5A8A52', emoji:'🌾', lore:'Rustles with forgotten melodies encoded by ancient forests deep within its fibres.',        earned:true  },
  { id:9,  name:'Aurora Hare',      type:'fauna',    rarity:'legendary', gemColor:'#8B4FB8', emoji:'🐇', lore:'Leaps between northern auroras, leaving spiralling ribbons of borealis in its wake.',      earned:false },
  { id:10, name:'Bone Sage',        type:'mystical', rarity:'rare',      gemColor:'#C4621D', emoji:'🌵', lore:'An ancient desert spirit who grants absolute clarity through perfect stillness.',           earned:true  },
  { id:11, name:'Dew Sprite',       type:'mystical', rarity:'uncommon',  gemColor:'#7BC4AD', emoji:'💧', lore:'Born from the first morning dew of the spring equinox; cleanses polluted streams.',        earned:false },
  { id:12, name:'Lava Lily',        type:'flora',    rarity:'rare',      gemColor:'#E8A45A', emoji:'🌺', lore:'Blooms only when volcanic soil is enriched by the very first rainfall after an eruption.', earned:true  },
];

const questsData = [
  { id:1, title:'Morning Migration',  desc:'Channel the great wildebeest herds', type:'steps',       goal:8000, current:5420, unit:'steps',     icon:'👣', reward:'Sunheart Bloom', gemColor:'#E8A45A', questColor:'#C4621D' },
  { id:2, title:'Stillwater Ritual',  desc:'Find peace like a mountain lake',    type:'mindfulness', goal:15,   current:10,   unit:'min',        icon:'🧘', reward:'Crystal Fern',  gemColor:'#7BC4AD', questColor:'#5B9B8A' },
  { id:3, title:'Rain Harvest',        desc:'Restore your inner watershed',        type:'hydration',   goal:8,    current:5,    unit:'glasses',    icon:'💧', reward:'Dew Sprite',    gemColor:'#7BC4AD', questColor:'#3D6B35' },
  { id:4, title:'Wild Runner',          desc:'Run with the ghost leopards',         type:'active',      goal:30,   current:0,    unit:'min active', icon:'🏃', reward:'Aurora Hare',   gemColor:'#8B4FB8', questColor:'#8B4FB8' },
];

const rarityColors = {
  common: '#9B8B6A',
  uncommon: '#5B9B8A',
  rare: '#4A7AB8',
  epic: '#8B4FB8',
  legendary: '#C4A820',
};

const rarityLabel = { common:'●', uncommon:'●●', rare:'●●●', epic:'●●●●', legendary:'★' };

// ─── STYLE INJECTION ──────────────────────────────────────────────────────────
function StyleInjector() {
  useEffect(() => {
    const el = document.createElement('style');
    el.id = 'bloomverse-styles';
    el.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700&display=swap');
      .bv-root * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Quicksand', sans-serif; }
      .bv-root ::-webkit-scrollbar { width: 3px; }
      .bv-root ::-webkit-scrollbar-thumb { background: rgba(61,107,53,0.25); border-radius: 2px; }
      @keyframes bv-float  { 0%,100%{transform:translateY(0) rotate(0deg)} 40%{transform:translateY(-10px) rotate(2deg)} 70%{transform:translateY(-5px) rotate(-1deg)} }
      @keyframes bv-float2 { 0%,100%{transform:translateY(0) rotate(0deg)} 30%{transform:translateY(-7px) rotate(-2deg)} 65%{transform:translateY(-12px) rotate(1.5deg)} }
      @keyframes bv-float3 { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-9px) rotate(3deg)} }
      @keyframes bv-sway   { 0%,100%{transform:rotate(-4deg) scaleX(1)} 50%{transform:rotate(4deg) scaleX(1.02)} }
      @keyframes bv-pulse  { 0%,100%{transform:scale(1)} 50%{transform:scale(1.04)} }
      @keyframes bv-bloom  { 0%{transform:scale(0) rotate(-120deg);opacity:0} 65%{transform:scale(1.15) rotate(8deg);opacity:1} 100%{transform:scale(1) rotate(0);opacity:1} }
      @keyframes bv-shimmer{ 0%,100%{opacity:0.45} 50%{opacity:1} }
      @keyframes bv-draw   { 0%{stroke-dashoffset:400} 100%{stroke-dashoffset:0} }
      @keyframes bv-rise   { 0%{transform:translateY(0) scale(1);opacity:1} 100%{transform:translateY(-50px) scale(0);opacity:0} }
      .bv-float  { animation: bv-float  4s ease-in-out infinite; }
      .bv-float2 { animation: bv-float2 5.5s ease-in-out infinite 0.8s; }
      .bv-float3 { animation: bv-float3 6.5s ease-in-out infinite 1.6s; }
      .bv-sway   { animation: bv-sway   3.5s ease-in-out infinite; transform-origin: bottom center; }
      .bv-pulse  { animation: bv-pulse  2.5s ease-in-out infinite; }
      .bv-bloom  { animation: bv-bloom  0.65s cubic-bezier(0.34,1.56,0.64,1) forwards; }
      .bv-shimmer{ animation: bv-shimmer 2.2s ease-in-out infinite; }
      .bv-press:active { transform: scale(0.96) !important; transition: transform 0.1s ease !important; }
    `;
    document.head.appendChild(el);
    return () => { const s = document.getElementById('bloomverse-styles'); if(s) s.remove(); };
  }, []);
  return null;
}

// ─── SMALL SHARED COMPONENTS ──────────────────────────────────────────────────
function WavyLine({ color, opacity = 0.3 }) {
  return React.createElement('svg', { width:'100%', height:'14', viewBox:'0 0 375 14', style:{ display:'block' } },
    React.createElement('path', {
      d:'M0 7 Q25 1,50 7 T100 7 T150 7 T200 7 T250 7 T300 7 T375 7',
      fill:'none', stroke: color, strokeWidth:1.5, opacity,
    })
  );
}

function OrgProgressBar({ pct, color, height = 8 }) {
  return React.createElement('div', {
    style:{ height, background:'rgba(150,130,100,0.15)', borderRadius: height/2, overflow:'hidden' }
  },
    React.createElement('div', {
      style:{ height:'100%', width:`${pct}%`, background:`linear-gradient(90deg,${color}bb,${color})`, borderRadius: height/2, transition:'width 0.5s cubic-bezier(0.34,1.2,0.64,1)' }
    })
  );
}

function GemBadge({ gem, size = 48, floating = true, delay = 0 }) {
  const cls = floating ? (delay === 0 ? 'bv-float' : delay === 1 ? 'bv-float2' : 'bv-float3') : '';
  return React.createElement('div', {
    className: cls,
    style:{ width:size, height:size, borderRadius:'50% 30% 50% 30%', background:`radial-gradient(circle at 35% 35%, ${gem.gemColor}88, ${gem.gemColor}44)`, border:`2px solid ${gem.gemColor}66`, display:'flex', alignItems:'center', justifyContent:'center', fontSize: size*0.46, filter:`drop-shadow(0 3px 8px ${gem.gemColor}55)`, animationDelay:`${delay*0.7}s`, flexShrink:0 }
  }, gem.earned ? gem.emoji : '❓');
}

// ─── HOME SCREEN ──────────────────────────────────────────────────────────────
function HomeScreen({ t, isDark, setIsDark, setActiveScreen }) {
  const [coachOpen, setCoachOpen] = useState(false);

  const hubCards = [
    { id:'sanctuary', label:'Bio-Sanctuary',     sub:'8 gems growing',    icon:'🌿', w:1.65, h:128, br:'22px 6px 22px 22px', borderC: isDark?'#3D6B3566':'#B8D4B0', bgC: isDark?'#1E2E1E':'#E2F0D8', hiC: t.primary  },
    { id:'quests',     label:'Restoration Quests', sub:'3 active today',   icon:'🎯', w:1,    h:128, br:'6px 22px 6px 22px',  borderC: isDark?'#5C3A2266':'#D8C0A8', bgC: isDark?'#2A1E18':'#F4EBE0', hiC: t.accent   },
    { id:'impact',     label:'Impact Nexus',       sub:'23 trees planted', icon:'🌍', w:1,    h:108, br:'22px 6px 6px 22px',  borderC: isDark?'#1E3A3466':'#AACCC4', bgC: isDark?'#182020':'#DFF0EC', hiC: t.sage     },
    { id:'collection', label:'Discovery Journal',  sub:'8 of 12 found',    icon:'📖', w:1.65, h:108, br:'6px 22px 22px 6px',  borderC: isDark?'#3A2D5266':'#C8B8D8', bgC: isDark?'#1E1828':'#EEE0F4', hiC: t.secondary},
  ];

  return React.createElement('div', { style:{ height:'100%', background:t.bg, overflowY:'auto' } },
    // ── Header
    React.createElement('div', { style:{ padding:'32px 22px 12px', display:'flex', justifyContent:'space-between', alignItems:'flex-start' } },
      React.createElement('div', null,
        React.createElement('div', { style:{ fontSize:11, color:t.textMuted, fontWeight:700, letterSpacing:'0.12em', marginBottom:3 } }, 'DAY 23 · SPRING BLOOM'),
        React.createElement('div', { style:{ fontSize:23, fontWeight:700, color:t.text, lineHeight:1.2 } }, 'Welcome back,'),
        React.createElement('div', { style:{ fontSize:23, fontWeight:700, color:t.primary } }, 'Earth Keeper 🌱'),
      ),
      React.createElement('button', {
        onClick:()=>setIsDark(!isDark),
        style:{ width:42, height:42, borderRadius:'50%', background: isDark?t.card:t.surface, border:`2px solid ${t.border}`, cursor:'pointer', fontSize:18, display:'flex', alignItems:'center', justifyContent:'center' }
      }, isDark ? '☀️' : '🌙'),
    ),

    // ── Eco-Coach bubble
    React.createElement('div', { style:{ padding:'0 22px 18px' } },
      React.createElement('div', {
        onClick:()=>setCoachOpen(!coachOpen),
        className:'bv-press',
        style:{ background:t.card, border:`2px solid ${t.border}`, borderRadius:'18px 18px 18px 4px', padding:'12px 14px', cursor:'pointer' }
      },
        React.createElement('div', { style:{ display:'flex', alignItems:'flex-start', gap:10 } },
          React.createElement('div', {
            className:'bv-pulse',
            style:{ width:34, height:34, borderRadius:'50%', background:`linear-gradient(135deg,${t.primary},${t.sage})`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:17, flexShrink:0 }
          }, '🌱'),
          React.createElement('div', null,
            React.createElement('div', { style:{ fontSize:10, color:t.primary, fontWeight:700, marginBottom:2, letterSpacing:'0.08em' } }, 'SAGE · ECO-COACH'),
            React.createElement('div', { style:{ fontSize:12.5, color:t.text, lineHeight:1.5 } },
              coachOpen
                ? "You're 2,580 steps from blooming a Sunheart Bloom! 🌻 Your hydration is 62% — drink 3 more glasses to unlock the Dew Sprite. You've had a beautiful 5-day streak. Keep growing! 🌟"
                : "You're on a 5-day streak! Ready to bloom your next Bio-Gem? Tap to see tips ✨"
            ),
          ),
        )
      )
    ),

    // ── 7-day streak row
    React.createElement('div', { style:{ padding:'0 22px 18px' } },
      React.createElement('div', { style:{ display:'flex', alignItems:'center', gap:6 } },
        React.createElement('span', { style:{ fontSize:10, color:t.textMuted, fontWeight:700, letterSpacing:'0.1em', marginRight:4 } }, 'STREAK'),
        ...[1,2,3,4,5,6,7].map(d =>
          React.createElement('div', { key:d, style:{
            width:30, height:30, borderRadius:'50%',
            background: d<=5 ? t.primary : (isDark?'#2A3322':'#EDE0C4'),
            display:'flex', alignItems:'center', justifyContent:'center',
            fontSize: d<=5?13:10,
            color: d<=5?'white':t.textLight,
            fontWeight:700,
            border: d===5?`3px solid ${t.accent}`:`2px solid ${d<=5?t.primaryLight:t.border}`,
            flexShrink:0,
          }}, d<=5?'🌱':d)
        ),
      )
    ),

    React.createElement(WavyLine, { color:t.primary, opacity:0.18 }),

    // ── Hub nav cards
    React.createElement('div', { style:{ padding:'18px 22px 0' } },
      React.createElement('div', { style:{ fontSize:10, color:t.textMuted, fontWeight:700, letterSpacing:'0.12em', marginBottom:12 } }, 'YOUR SANCTUARY'),

      // Row 1
      React.createElement('div', { style:{ display:'flex', gap:10, marginBottom:10 } },
        ...[hubCards[0], hubCards[1]].map(card =>
          React.createElement('div', {
            key:card.id,
            onClick:()=>setActiveScreen(card.id),
            className:'bv-press',
            style:{ flex:card.w, height:card.h, background:card.bgC, border:`2px solid ${card.borderC}`, borderRadius:card.br, padding:14, cursor:'pointer', position:'relative', overflow:'hidden' }
          },
            React.createElement('div', { style:{ position:'absolute', right:-8, bottom:-8, fontSize:58, opacity:0.13 } }, card.icon),
            React.createElement('div', { style:{ fontSize:26, marginBottom:8 } }, card.icon),
            React.createElement('div', { style:{ fontSize:13, fontWeight:700, color:card.hiC } }, card.label),
            React.createElement('div', { style:{ fontSize:10, color:t.textMuted } }, card.sub),
            React.createElement('span', { style:{ display:'none' } }, card.id),
          )
        )
      ),

      // Row 2
      React.createElement('div', { style:{ display:'flex', gap:10, marginBottom:18 } },
        ...[hubCards[2], hubCards[3]].map(card =>
          React.createElement('div', {
            key:card.id,
            onClick:()=>setActiveScreen(card.id),
            className:'bv-press',
            style:{ flex:card.w, height:card.h, background:card.bgC, border:`2px solid ${card.borderC}`, borderRadius:card.br, padding:14, cursor:'pointer', position:'relative', overflow:'hidden' }
          },
            React.createElement('div', { style:{ position:'absolute', right:-6, bottom:-6, fontSize:50, opacity:0.12 } }, card.icon),
            React.createElement('div', { style:{ fontSize:22, marginBottom:7 } }, card.icon),
            React.createElement('div', { style:{ fontSize:12.5, fontWeight:700, color:card.hiC } }, card.label),
            React.createElement('div', { style:{ fontSize:10, color:t.textMuted } }, card.sub),
            React.createElement('span', { style:{ display:'none' } }, card.id),
          )
        )
      ),
    ),

    // ── Next Bio-Gem teaser
    React.createElement('div', { style:{ padding:'0 22px 28px' } },
      React.createElement('div', { style:{ background:t.card, border:`2px dashed ${t.border}`, borderRadius:16, padding:'12px 14px' } },
        React.createElement('div', { style:{ fontSize:10, color:t.textMuted, fontWeight:700, marginBottom:8 } }, 'NEXT BIO-GEM · CLOSE TO BLOOMING'),
        React.createElement('div', { style:{ display:'flex', alignItems:'center', gap:12 } },
          React.createElement('div', {
            className:'bv-float2',
            style:{ width:50, height:50, borderRadius:'50%', background:`${t.secondary}22`, border:`2px dashed ${t.secondary}55`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:28, flexShrink:0 }
          }, '🐇'),
          React.createElement('div', { style:{ flex:1 } },
            React.createElement('div', { style:{ fontSize:13.5, fontWeight:700, color:t.text } }, 'Aurora Hare'),
            React.createElement('div', { style:{ fontSize:11, color:t.textMuted, marginBottom:6 } }, 'Complete "Wild Runner" to bloom'),
            React.createElement(OrgProgressBar, { pct:0, color:t.secondary, height:7 }),
          ),
        )
      )
    ),
  );
}

// ─── SANCTUARY SCREEN ─────────────────────────────────────────────────────────
function SanctuaryScreen({ t, isDark, setActiveScreen }) {
  const earned = bioGemsData.filter(g => g.earned);

  const layers = [
    // Back layer (small, faded)
    { gem:earned[0], x:38,  y:160, sz:52, cls:'bv-float3',  delay:0,   alpha:0.75 },
    { gem:earned[1], x:195, y:140, sz:48, cls:'bv-float2',  delay:1.2, alpha:0.75 },
    { gem:earned[2], x:300, y:175, sz:44, cls:'bv-float',   delay:0.6, alpha:0.75 },
    // Mid layer
    { gem:earned[3], x:70,  y:265, sz:64, cls:'bv-float2',  delay:0.4, alpha:0.9  },
    { gem:earned[4], x:220, y:280, sz:60, cls:'bv-float',   delay:1.8, alpha:0.9  },
    // Front layer (large, vivid)
    { gem:earned[5], x:22,  y:380, sz:82, cls:'bv-float3',  delay:0.9, alpha:1    },
    { gem:earned[6], x:148, y:400, sz:76, cls:'bv-float2',  delay:2.0, alpha:1    },
    { gem:earned[7], x:278, y:360, sz:70, cls:'bv-float',   delay:0.3, alpha:1    },
  ].filter(l => l.gem);

  const skyTop    = isDark ? '#0A1008' : '#D8F0E0';
  const skyBottom = isDark ? 'transparent' : 'transparent';
  const hillFar   = isDark ? '#152510' : '#6AAA7A';
  const hillNear  = isDark ? '#0E1A0C' : '#4A8A5A';
  const bgGrad    = isDark
    ? 'linear-gradient(180deg,#0A1008 0%,#152510 35%,#101A0D 70%,#0D1508 100%)'
    : 'linear-gradient(180deg,#C0E8C8 0%,#90C8A0 30%,#6AAA7A 60%,#4A8A5A 100%)';

  return React.createElement('div', { style:{ height:'100%', background:bgGrad, position:'relative', overflow:'hidden' } },
    // Sky glow
    React.createElement('div', { style:{ position:'absolute', top:0, left:0, right:0, height:180, background: isDark?'linear-gradient(180deg,#0A1008 0%,transparent 100%)':'linear-gradient(180deg,#D8F0E0 0%,transparent 100%)' } }),

    // Ambient orbs (parallax depth elements)
    ...[
      { x:60,  y:100, r:44, c: isDark?'#3D6B3528':'#5A8A5225' },
      { x:285, y:75,  r:58, c: isDark?'#8B4FB820':'#8B4FB818' },
      { x:152, y:185, r:68, c: isDark?'#5B9B8A22':'#5B9B8A1E' },
      { x:320, y:280, r:40, c: isDark?'#E8A45A18':'#E8A45A15' },
    ].map((o, i) =>
      React.createElement('div', {
        key:`orb${i}`, className:'bv-shimmer',
        style:{ position:'absolute', left:o.x-o.r, top:o.y-o.r, width:o.r*2, height:o.r*2, borderRadius:'50%', background:o.c, animationDelay:`${i*0.65}s` }
      })
    ),

    // Ground terrain SVG
    React.createElement('svg', { style:{ position:'absolute', bottom:0, left:0, width:'100%', height:170 }, viewBox:'0 0 375 170', preserveAspectRatio:'none' },
      React.createElement('path', { d:'M0 170L0 100Q35 80,75 92T155 88T235 98T310 82T375 93L375 170Z', fill:hillFar }),
      React.createElement('path', { d:'M0 170L0 125Q55 108,110 118T220 112T340 122T375 118L375 170Z', fill:hillNear }),
    ),

    // Foreground plants (sway animation)
    React.createElement('div', { className:'bv-sway', style:{ position:'absolute', bottom:24, left:14, fontSize:40, transformOrigin:'bottom center', animationDelay:'0s' } }, '🌿'),
    React.createElement('div', { className:'bv-sway', style:{ position:'absolute', bottom:28, right:18, fontSize:36, transformOrigin:'bottom center', animationDelay:'0.9s' } }, '🌾'),
    React.createElement('div', { className:'bv-sway', style:{ position:'absolute', bottom:20, left:180, fontSize:32, transformOrigin:'bottom center', animationDelay:'1.6s' } }, '🌱'),

    // Floating Bio-Gems (3 depth layers)
    ...layers.map((l, i) =>
      React.createElement('div', {
        key:`gem${i}`, className:l.cls,
        style:{ position:'absolute', left:l.x, top:l.y, width:l.sz, height:l.sz, cursor:'pointer', animationDelay:`${l.delay}s`, opacity:l.alpha, filter:`drop-shadow(0 4px 14px ${l.gem.gemColor}66)` }
      },
        React.createElement('div', {
          style:{ width:'100%', height:'100%', borderRadius:'50% 30% 50% 30%', background:`radial-gradient(circle at 33% 33%, ${l.gem.gemColor}99, ${l.gem.gemColor}44)`, border:`2px solid ${l.gem.gemColor}66`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:l.sz*0.46 }
        }, l.gem.emoji)
      )
    ),

    // Header bar (translucent)
    React.createElement('div', { style:{ position:'absolute', top:0, left:0, right:0, padding:'30px 20px 14px', display:'flex', justifyContent:'space-between', alignItems:'flex-start', background: isDark?'linear-gradient(180deg,rgba(0,0,0,0.55) 0%,transparent)':'linear-gradient(180deg,rgba(190,230,200,0.6) 0%,transparent)' } },
      React.createElement('div', null,
        React.createElement('div', { style:{ fontSize:19, fontWeight:700, color: isDark?'#EDE8D5':'#1A3020' } }, '🌿 Bio-Sanctuary'),
        React.createElement('div', { style:{ fontSize:11.5, color: isDark?'#7CB87A':'#2D5016', fontWeight:700 } }, '8 of 12 gems bloomed'),
      ),
      React.createElement('button', {
        onClick:()=>setActiveScreen('home'), className:'bv-press',
        style:{ background: isDark?'rgba(26,31,21,0.85)':'rgba(255,255,255,0.75)', border:`2px solid ${isDark?'#3A4530':'#C0D8B8'}`, borderRadius:12, padding:'7px 13px', cursor:'pointer', fontSize:11.5, fontWeight:700, color: isDark?'#EDE8D5':'#2A2018' }
      },
        React.createElement('span', null, '← Home'),
      ),
    ),

    // Bottom stats bar
    React.createElement('div', { style:{ position:'absolute', bottom:0, left:0, right:0, padding:'48px 20px 22px', background: isDark?'linear-gradient(0deg,rgba(8,16,6,0.92) 0%,transparent)':'linear-gradient(0deg,rgba(50,100,60,0.88) 0%,transparent)' } },
      React.createElement('div', { style:{ display:'flex', justifyContent:'space-around' } },
        ...[{l:'Gems',v:'8',i:'💎'},{l:'Rare+',v:'3',i:'⭐'},{l:'Area',v:'4.2ha',i:'🗺️'}].map(s =>
          React.createElement('div', { key:s.l, style:{ textAlign:'center' } },
            React.createElement('div', { style:{ fontSize:20, marginBottom:2 } }, s.i),
            React.createElement('div', { style:{ fontSize:17, fontWeight:700, color:'white' } }, s.v),
            React.createElement('div', { style:{ fontSize:9.5, color:'rgba(255,255,255,0.75)', fontWeight:700, letterSpacing:'0.08em' } }, s.l.toUpperCase()),
          )
        )
      )
    ),
  );
}

// ─── QUESTS SCREEN ────────────────────────────────────────────────────────────
function QuestsScreen({ t, isDark, setActiveScreen }) {
  const [progresses, setProgresses] = useState(questsData.map(q => q.current));
  const [doneIds, setDoneIds] = useState([]);
  const [blooming, setBlooming] = useState(null);

  const tap = (idx) => {
    const q = questsData[idx];
    if (doneIds.includes(q.id)) return;
    const next = [...progresses];
    const inc = q.type==='steps' ? 540 : q.type==='hydration' ? 1 : 5;
    next[idx] = Math.min(next[idx] + inc, q.goal);
    setProgresses(next);
    if (next[idx] >= q.goal) {
      setDoneIds(d => [...d, q.id]);
      setBlooming(q.id);
      setTimeout(() => setBlooming(null), 1800);
    }
  };

  return React.createElement('div', { style:{ height:'100%', background:t.bg, overflowY:'auto' } },
    // Header
    React.createElement('div', { style:{ padding:'32px 22px 14px', display:'flex', justifyContent:'space-between', alignItems:'flex-start' } },
      React.createElement('div', null,
        React.createElement('div', { style:{ fontSize:10, color:t.textMuted, fontWeight:700, letterSpacing:'0.12em', marginBottom:3 } }, "TODAY'S RESTORATION"),
        React.createElement('div', { style:{ fontSize:22, fontWeight:700, color:t.text } }, 'Quest Log 🎯'),
      ),
      React.createElement('button', {
        onClick:()=>setActiveScreen('home'), className:'bv-press',
        style:{ background:t.surface, border:`2px solid ${t.border}`, borderRadius:12, padding:'7px 13px', cursor:'pointer', fontSize:11.5, fontWeight:700, color:t.textMuted }
      },
        React.createElement('span', null, '← Home'),
      ),
    ),

    // Coach tip
    React.createElement('div', { style:{ padding:'0 22px 16px' } },
      React.createElement('div', { style:{ background: isDark?'#1E2E1E':'#E8F4E0', border:`2px solid ${isDark?'#3D6B3555':'#B0D0A8'}`, borderRadius:12, padding:'11px 13px', display:'flex', alignItems:'flex-start', gap:9 } },
        React.createElement('span', { style:{ fontSize:17 } }, '🌱'),
        React.createElement('div', null,
          React.createElement('div', { style:{ fontSize:10, color:t.primary, fontWeight:700, marginBottom:2, letterSpacing:'0.08em' } }, 'SAGE SAYS'),
          React.createElement('div', { style:{ fontSize:12, color:t.textMuted, lineHeight:1.55 } }, "Tap a quest card to log progress! Each step nourishes your sanctuary. Two quests near bloom today — keep flowing 🌊"),
        ),
      )
    ),

    React.createElement(WavyLine, { color:t.border }),

    // Quest cards
    React.createElement('div', { style:{ padding:'14px 22px' } },
      ...questsData.map((q, idx) => {
        const pct = Math.round((progresses[idx]/q.goal)*100);
        const done = doneIds.includes(q.id);
        const isBlooming = blooming === q.id;
        const borderRadius = idx%2===0 ? '22px 6px 22px 6px' : '6px 22px 6px 22px';

        return React.createElement('div', {
          key:q.id, onClick:()=>tap(idx), className:'bv-press',
          style:{ marginBottom:13, background: done?(isDark?'#1E2E1E':'#E8F4E0'):t.card, border:`2px solid ${done?q.questColor+'55':t.border}`, borderRadius, padding:'13px 15px', cursor: done?'default':'pointer', position:'relative', overflow:'hidden' }
        },
          // Background watermark
          React.createElement('div', { style:{ position:'absolute', right:-2, top:'50%', transform:'translateY(-50%)', fontSize:64, opacity:0.055 } }, q.icon),

          // Bloom burst overlay
          isBlooming && React.createElement('div', {
            className:'bv-bloom',
            style:{ position:'absolute', inset:0, background:`radial-gradient(circle at center, ${q.questColor}44, transparent)`, display:'flex', alignItems:'center', justifyContent:'center', zIndex:10, pointerEvents:'none' }
          },
            React.createElement('div', { style:{ fontSize:52 } }, q.icon)
          ),

          // Title row
          React.createElement('div', { style:{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:7 } },
            React.createElement('div', { style:{ display:'flex', alignItems:'center', gap:9 } },
              React.createElement('span', { style:{ fontSize:22 } }, q.icon),
              React.createElement('div', null,
                React.createElement('div', { style:{ fontSize:13.5, fontWeight:700, color: done?q.questColor:t.text } }, q.title),
                React.createElement('div', { style:{ fontSize:11, color:t.textMuted } }, q.desc),
              ),
            ),
            React.createElement('div', {
              style:{ background: done?q.questColor+'1E':(isDark?'#2A3322':'#EDE0C4'), border:`1.5px solid ${done?q.questColor:t.border}`, borderRadius:20, padding:'3px 9px', fontSize:10.5, fontWeight:700, color: done?q.questColor:t.textMuted, whiteSpace:'nowrap' }
            }, done ? '✓ BLOOMED' : `${pct}%`),
          ),

          // Progress bar
          React.createElement(OrgProgressBar, { pct, color:q.questColor, height:8 }),

          // Footer row
          React.createElement('div', { style:{ display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:7 } },
            React.createElement('span', { style:{ fontSize:11.5, color:t.textMuted } }, `${progresses[idx].toLocaleString()} / ${q.goal.toLocaleString()} ${q.unit}`),
            React.createElement('div', { style:{ display:'flex', alignItems:'center', gap:5 } },
              React.createElement('div', { style:{ width:15, height:15, borderRadius:'50%', background:q.gemColor+'33', border:`1.5px solid ${q.gemColor}66`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:9 } }, done?'✓':'?'),
              React.createElement('span', { style:{ fontSize:10.5, color:t.textMuted } }, done ? q.reward : `Unlock: ${q.reward}`),
            ),
          ),
        );
      })
    ),

    React.createElement('div', { style:{ height:24 } }),
  );
}

// ─── IMPACT SCREEN ────────────────────────────────────────────────────────────
function ImpactScreen({ t, isDark, setActiveScreen }) {
  const [view, setView] = useState('personal');

  const metrics = [
    { l:'Trees Planted',  v:23,   u:'trees',    i:'🌳', c:t.primary,  max:50,   desc:'Via Moonbell Orchid, Crystal Fern & 6 more' },
    { l:'Ocean Plastic',  v:4.7,  u:'kg removed',i:'🌊', c:'#3D7BA8',  max:10,   desc:'Linked to Prism Coral & Void Jellyfish' },
    { l:'Water Saved',    v:1240, u:'liters',    i:'💧', c:t.sage,     max:2000, desc:'Hydration quests & Bio-Gem blooms' },
    { l:'Coral Restored', v:3,    u:'sq meters', i:'🪸', c:t.accentLight,max:8,  desc:'Through Prism Coral collection' },
  ];

  const comm = [
    { v:'98,432', l:'Trees Planted',  i:'🌳' },
    { v:'12.4t',  l:'Plastic Removed',i:'🌊' },
    { v:'5.2M',   l:'Liters Saved',   i:'💧' },
    { v:'847m²',  l:'Coral Restored', i:'🪸' },
  ];

  return React.createElement('div', { style:{ height:'100%', background:t.bg, overflowY:'auto' } },
    // Header
    React.createElement('div', { style:{ padding:'32px 22px 14px', display:'flex', justifyContent:'space-between', alignItems:'flex-start' } },
      React.createElement('div', null,
        React.createElement('div', { style:{ fontSize:10, color:t.textMuted, fontWeight:700, letterSpacing:'0.12em', marginBottom:3 } }, 'YOUR PLANETARY LEGACY'),
        React.createElement('div', { style:{ fontSize:22, fontWeight:700, color:t.text } }, 'Impact Nexus 🌍'),
      ),
      React.createElement('button', {
        onClick:()=>setActiveScreen('home'), className:'bv-press',
        style:{ background:t.surface, border:`2px solid ${t.border}`, borderRadius:12, padding:'7px 13px', cursor:'pointer', fontSize:11.5, fontWeight:700, color:t.textMuted }
      },
        React.createElement('span', null, '← Home'),
      ),
    ),

    // Toggle
    React.createElement('div', { style:{ padding:'0 22px 18px' } },
      React.createElement('div', { style:{ display:'flex', background:t.surface, border:`2px solid ${t.border}`, borderRadius:12, padding:4 } },
        ...(['personal','collective']).map((id, i) =>
          React.createElement('button', {
            key:id, onClick:()=>setView(id), className:'bv-press',
            style:{ flex:1, padding:'8px 6px', borderRadius:8, border:'none', cursor:'pointer', fontSize:12.5, fontWeight:700, background: view===id?t.primary:'transparent', color: view===id?'white':t.textMuted, transition:'background 0.2s, color 0.2s' }
          }, i===0?'🌱 My Impact':'🌍 Community')
        )
      )
    ),

    view==='personal'
      ? React.createElement('div', { style:{ padding:'0 22px' } },
          // Score card
          React.createElement('div', { style:{ background: isDark?'#1E2E1E':'#E8F4E0', border:`2px solid ${isDark?'#3D6B3555':'#B0D0A8'}`, borderRadius:20, padding:18, textAlign:'center', marginBottom:14 } },
            React.createElement('div', { className:'bv-pulse', style:{ fontSize:46, marginBottom:4 } }, '🌱'),
            React.createElement('div', { style:{ fontSize:10.5, color:t.primary, fontWeight:700, letterSpacing:'0.1em', marginBottom:3 } }, 'TOTAL IMPACT SCORE'),
            React.createElement('div', { style:{ fontSize:34, fontWeight:700, color:t.primary } }, '2,847'),
            React.createElement('div', { style:{ fontSize:11.5, color:t.textMuted } }, 'points · Top 12% of Earth Keepers'),
          ),
          ...metrics.map((m, i) =>
            React.createElement('div', {
              key:i,
              style:{ background:t.card, border:`2px solid ${t.border}`, borderRadius: i%2===0?'18px 6px 18px 6px':'6px 18px 6px 18px', padding:13, marginBottom:10 }
            },
              React.createElement('div', { style:{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8 } },
                React.createElement('div', { style:{ display:'flex', alignItems:'center', gap:9 } },
                  React.createElement('span', { style:{ fontSize:22 } }, m.i),
                  React.createElement('div', null,
                    React.createElement('div', { style:{ fontSize:13, fontWeight:700, color:t.text } }, m.l),
                    React.createElement('div', { style:{ fontSize:10.5, color:t.textMuted } }, m.desc),
                  ),
                ),
                React.createElement('div', { style:{ textAlign:'right' } },
                  React.createElement('div', { style:{ fontSize:19, fontWeight:700, color:m.c } }, m.v),
                  React.createElement('div', { style:{ fontSize:9.5, color:t.textMuted } }, m.u),
                ),
              ),
              React.createElement(OrgProgressBar, { pct:Math.min((m.v/m.max)*100,100), color:m.c, height:6 }),
            )
          ),
          React.createElement('div', { style:{ height:24 } }),
        )
      : React.createElement('div', { style:{ padding:'0 22px 24px' } },
          React.createElement('div', { style:{ background: isDark?'#1E2E1E':'#E8F4E0', border:`2px solid ${isDark?'#3D6B3555':'#B0D0A8'}`, borderRadius:20, padding:18, marginBottom:14 } },
            React.createElement('div', { style:{ fontSize:13.5, fontWeight:700, color:t.primary, textAlign:'center', marginBottom:14 } }, '🌍 BloomVerse Community'),
            React.createElement('div', { style:{ fontSize:30, fontWeight:700, color:t.text, textAlign:'center', marginBottom:2 } }, '42,890'),
            React.createElement('div', { style:{ fontSize:11.5, color:t.textMuted, textAlign:'center', marginBottom:16 } }, 'Earth Keepers active worldwide'),
            React.createElement('div', { style:{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:9 } },
              ...comm.map((s, i) =>
                React.createElement('div', { key:i, style:{ background:t.card, borderRadius:12, padding:'11px 10px', textAlign:'center', border:`1.5px solid ${t.border}` } },
                  React.createElement('div', { style:{ fontSize:22, marginBottom:3 } }, s.i),
                  React.createElement('div', { style:{ fontSize:16, fontWeight:700, color:t.text } }, s.v),
                  React.createElement('div', { style:{ fontSize:9.5, color:t.textMuted } }, s.l),
                )
              )
            )
          ),
          // Your share bar
          React.createElement('div', { style:{ background:t.card, border:`2px solid ${t.border}`, borderRadius:16, padding:'13px 15px' } },
            React.createElement('div', { style:{ fontSize:11, fontWeight:700, color:t.textMuted, marginBottom:8 } }, 'YOUR SHARE OF COMMUNITY IMPACT'),
            React.createElement('div', { style:{ display:'flex', alignItems:'center', gap:8 } },
              React.createElement('div', { style:{ flex:1, height:11, background: isDark?'#1A1F15':'#E8DEC8', borderRadius:5.5, overflow:'hidden' } },
                React.createElement('div', { className:'bv-shimmer', style:{ height:'100%', width:'2.4%', minWidth:22, background:`linear-gradient(90deg,${t.primary},${t.sage})`, borderRadius:5.5 } })
              ),
              React.createElement('span', { style:{ fontSize:11.5, fontWeight:700, color:t.primary, whiteSpace:'nowrap' } }, '~0.024%'),
            ),
          ),
        ),
  );
}

// ─── COLLECTION SCREEN ────────────────────────────────────────────────────────
function CollectionScreen({ t, isDark, setActiveScreen }) {
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState(null);

  const filters = [
    { id:'all',      label:'All',      icon:'✨' },
    { id:'flora',    label:'Flora',    icon:'🌿' },
    { id:'fauna',    label:'Fauna',    icon:'🦋' },
    { id:'mystical', label:'Mystical', icon:'💫' },
  ];

  const shown = filter==='all' ? bioGemsData : bioGemsData.filter(g => g.type===filter);

  return React.createElement('div', { style:{ height:'100%', background:t.bg, overflowY:'auto', position:'relative' } },
    // Header
    React.createElement('div', { style:{ padding:'32px 22px 14px', display:'flex', justifyContent:'space-between', alignItems:'flex-start' } },
      React.createElement('div', null,
        React.createElement('div', { style:{ fontSize:10, color:t.textMuted, fontWeight:700, letterSpacing:'0.12em', marginBottom:3 } }, `${bioGemsData.filter(g=>g.earned).length} OF ${bioGemsData.length} DISCOVERED`),
        React.createElement('div', { style:{ fontSize:22, fontWeight:700, color:t.text } }, 'Discovery Journal 📖'),
      ),
      React.createElement('button', {
        onClick:()=>setActiveScreen('home'), className:'bv-press',
        style:{ background:t.surface, border:`2px solid ${t.border}`, borderRadius:12, padding:'7px 13px', cursor:'pointer', fontSize:11.5, fontWeight:700, color:t.textMuted }
      },
        React.createElement('span', null, '← Home'),
      ),
    ),

    // Filter tabs
    React.createElement('div', { style:{ padding:'0 22px 14px', display:'flex', gap:7, flexWrap:'wrap' } },
      ...filters.map(f =>
        React.createElement('button', {
          key:f.id, onClick:()=>setFilter(f.id), className:'bv-press',
          style:{ background: filter===f.id?t.primary:(isDark?t.card:t.surface), border:`2px solid ${filter===f.id?t.primary:t.border}`, borderRadius:20, padding:'5px 13px', cursor:'pointer', fontSize:11.5, fontWeight:700, color: filter===f.id?'white':t.textMuted, display:'flex', alignItems:'center', gap:4 }
        }, f.icon + ' ' + f.label)
      )
    ),

    React.createElement(WavyLine, { color:t.border, opacity:0.25 }),

    // Gem grid — asymmetric with alternating border-radius shapes
    React.createElement('div', { style:{ padding:'12px 16px 28px', display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:9 } },
      ...shown.map((gem, i) => {
        const shapes = ['50% 20% 40% 20%','20% 50% 20% 40%','30% 40% 50% 30%','40% 20% 30% 50%','50% 30% 40% 20%','20% 40% 50% 30%'];
        const br = shapes[i % shapes.length];
        const floatCls = gem.earned ? (i%3===0?'bv-float':i%3===1?'bv-float2':'bv-float3') : '';

        return React.createElement('div', {
          key:gem.id, onClick:()=>setSelected(gem), className:`${floatCls} bv-press`,
          style:{ aspectRatio:'1', background: gem.earned?(isDark?t.card:'#FBF5E8'):(isDark?'#1A1F15':'#F0E8D4'), border:`2px solid ${gem.earned?gem.gemColor+'55':t.border}`, borderRadius:br, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', cursor:'pointer', position:'relative', overflow:'hidden', opacity: gem.earned?1:0.48, animationDelay:`${(i*0.22)%2}s` }
        },
          // Rarity dot
          React.createElement('div', { style:{ position:'absolute', top:5, right:6, width:6, height:6, borderRadius:'50%', background:rarityColors[gem.rarity] } }),
          React.createElement('div', { style:{ fontSize:28, filter: gem.earned?`drop-shadow(0 2px 7px ${gem.gemColor}88)`:'grayscale(1)', marginBottom:2 } }, gem.earned?gem.emoji:'❓'),
          React.createElement('div', { style:{ fontSize:8.5, fontWeight:700, color: gem.earned?t.text:t.textLight, textAlign:'center', lineHeight:1.3, padding:'0 3px' } }, gem.earned?gem.name:'???'),
        );
      })
    ),

    // Gem detail modal
    selected && React.createElement('div', {
      onClick:()=>setSelected(null),
      style:{ position:'absolute', inset:0, background:'rgba(0,0,0,0.68)', zIndex:200, display:'flex', alignItems:'center', justifyContent:'center', padding:20 }
    },
      React.createElement('div', {
        className:'bv-bloom', onClick:e=>e.stopPropagation(),
        style:{ background:t.card, border:`3px solid ${selected.gemColor}`, borderRadius:26, padding:24, width:'100%', maxWidth:310 }
      },
        React.createElement('div', { style:{ textAlign:'center', marginBottom:16 } },
          React.createElement('div', { className:'bv-float2', style:{ fontSize:58, marginBottom:8 } }, selected.emoji),
          React.createElement('div', { style:{ fontSize:18, fontWeight:700, color:t.text, marginBottom:5 } }, selected.name),
          React.createElement('div', { style:{ display:'inline-block', background:rarityColors[selected.rarity]+'22', border:`1.5px solid ${rarityColors[selected.rarity]}`, borderRadius:20, padding:'3px 11px', fontSize:10.5, fontWeight:700, color:rarityColors[selected.rarity], textTransform:'uppercase', letterSpacing:'0.08em' } }, `${rarityLabel[selected.rarity]} ${selected.rarity}`),
        ),
        React.createElement('div', { style:{ background:selected.gemColor+'18', border:`1.5px solid ${selected.gemColor}44`, borderRadius:12, padding:'11px 13px', marginBottom:14 } },
          React.createElement('div', { style:{ fontSize:10, color:t.textMuted, fontWeight:700, marginBottom:4, letterSpacing:'0.08em' } }, 'LORE'),
          React.createElement('div', { style:{ fontSize:12.5, color:t.text, lineHeight:1.65, fontStyle:'italic' } }, `"${selected.lore}"`),
        ),
        React.createElement('div', { style:{ display:'flex', gap:8, marginBottom:14 } },
          ...[['TYPE',selected.type],['STATUS',selected.earned?'Collected':'Undiscovered']].map(([k,v], i) =>
            React.createElement('div', { key:k, style:{ flex:1, background: isDark?'#1A1F15':t.surface, borderRadius:10, padding:'8px 10px', textAlign:'center' } },
              React.createElement('div', { style:{ fontSize:10, color:t.textMuted, marginBottom:2 } }, k),
              React.createElement('div', { style:{ fontSize:12.5, fontWeight:700, color: i===1?(selected.earned?t.primary:t.textLight):t.text, textTransform:'capitalize' } }, v),
            )
          )
        ),
        React.createElement('button', {
          onClick:()=>setSelected(null), className:'bv-press',
          style:{ width:'100%', padding:'10px 0', background:t.primary, border:'none', borderRadius:12, cursor:'pointer', fontSize:13, fontWeight:700, color:'white' }
        }, 'Close'),
      )
    ),
  );
}

// ─── APP ROOT ─────────────────────────────────────────────────────────────────
function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [isDark, setIsDark] = useState(false);

  const t = isDark ? themes.dark : themes.light;

  const screens = {
    home:       HomeScreen,
    sanctuary:  SanctuaryScreen,
    quests:     QuestsScreen,
    impact:     ImpactScreen,
    collection: CollectionScreen,
  };

  const Screen = screens[activeScreen] || HomeScreen;

  return React.createElement('div', {
    style:{ minHeight:'100vh', background:'#f0f0f0', display:'flex', alignItems:'center', justifyContent:'center', padding:'24px 16px', fontFamily:"'Quicksand',sans-serif" }
  },
    React.createElement(StyleInjector),
    React.createElement('div', {
      className:'bv-root',
      style:{ width:375, height:812, borderRadius:44, overflow:'hidden', boxShadow:'0 28px 72px rgba(0,0,0,0.28)', position:'relative', background:t.bg, flexShrink:0 }
    },
      React.createElement(Screen, { t, isDark, setIsDark, setActiveScreen }),
    )
  );
}
