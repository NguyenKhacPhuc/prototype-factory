// Mindful Atlas — Retro-analog travel mindfulness prototype

const SCREEN_ORDER = ['home', 'explore', 'collection', 'journey'];

const RITUALS_DATA = [
  { id:'r1', title:'Light on Ancient Stone', type:'Visual', location:'Kyoto Old Quarter', coords:"35°01'N 135°46'E", duration:'5 min', description:'Observe how morning light traces the contours of the stone garden wall. Note how shadows shift with each quiet breath.', completed:false, rarity:'Common', icon:'Eye', shardColor:'#C8963E' },
  { id:'r2', title:'Market Sound Weave', type:'Auditory', location:'Grand Bazaar District', coords:"41°00'N 28°58'E", duration:'8 min', description:'Close your eyes and isolate one continuous sound thread within the market noise—follow it until it fades completely.', completed:true, rarity:'Rare', icon:'Wind', shardColor:'#6B8C5A' },
  { id:'r3', title:"The River's Language", type:'Reflective', location:'Seine Embankment, Paris', coords:"48°51'N 02°21'E", duration:'10 min', description:'Sit by the water and write three things the river seems to be saying to this city and its people.', completed:false, rarity:'Uncommon', icon:'BookOpen', shardColor:'#8B6B3D' },
  { id:'r4', title:'Threshold Breath', type:'Kinesthetic', location:'Medina Doorways, Fes', coords:"33°59'N 06°51'W", duration:'3 min', description:'Before crossing any threshold, pause. Take one breath in the liminal space between inside and outside.', completed:true, rarity:'Common', icon:'Wind', shardColor:'#C8963E' },
  { id:'r5', title:'Sky Archive', type:'Visual', location:'Santorini Heights', coords:"36°23'N 25°27'E", duration:'6 min', description:'Study the sky for exactly 5 minutes. Note the cloud progression as a form of slow geological time.', completed:false, rarity:'Rare', icon:'Eye', shardColor:'#6B8C5A' },
];

const LORE_SECTIONS = [
  {
    title:'Ancient Echoes', subtitle:'Lore older than living memory',
    items:[
      { id:'l1', place:'Kyoto Moss Garden', entry:"Silence here carries weight. Three monks, three centuries, the same morning light on the same stone.", contributor:'wanderer_73', year:'est. 1847', color:'#C8963E' },
      { id:'l2', place:'Roman Forum', entry:"The stones still remember feet. A thousand voices compressed into one low hum at dusk.", contributor:'atlas_keeper', year:'2019', color:'#6B8C5A' },
      { id:'l3', place:'Saharan Dune Edge', entry:"The wind reads the dunes like braille. Each ridge a sentence only the desert understands.", contributor:'meridian_soul', year:'2021', color:'#8B6B3D' },
      { id:'l4', place:'Angkor at Dawn', entry:"First light through the east gate—the stone absorbs it like breath. The jungle holds its sound.", contributor:'quietpilgrim', year:'2022', color:'#C8963E' },
    ]
  },
  {
    title:'This Season', subtitle:'Contributions from the current quarter',
    items:[
      { id:'l5', place:'Lisbon Alfama', entry:"Fado from an open window at 9pm. The whole street leaned in, without knowing it, to listen.", contributor:'nocturnalist', year:'2026', color:'#6B8C5A' },
      { id:'l6', place:'Tokyo Back Lane', entry:"A vending machine hum beside cherry blossom silence. The contrast was almost painful in its beauty.", contributor:'urbanmonk', year:'2026', color:'#C8963E' },
      { id:'l7', place:'Tbilisi Old Town', entry:"Sulfur water and ancient tile. The bathhouse holds five hundred years of hushed conversation.", contributor:'thermal.pilgrim', year:'2026', color:'#8B6B3D' },
      { id:'l8', place:'Oaxaca Market', entry:"Copal smoke and marigold dust. The dead are not gone here—they are present in the scent.", contributor:'slow.compass', year:'2026', color:'#6B8C5A' },
    ]
  },
  {
    title:'Rare Frequencies', subtitle:'Extraordinary sensory contributions',
    items:[
      { id:'l9', place:'Dead Sea Shore', entry:"Silence below sea level sounds different. Thicker. More honest than any silence above.", contributor:'depth.finder', year:'2025', color:'#C8963E' },
      { id:'l10', place:'Reykjavik Harbour', entry:"Midnight sun on the water. My shadow refused to disappear. I stayed to watch it try.", contributor:'northern.drift', year:'2025', color:'#6B8C5A' },
      { id:'l11', place:'Varanasi Ghats', entry:"The river burns and the river cleanses. Both at once. Always both at once, without contradiction.", contributor:'dawn.keeper', year:'2025', color:'#8B6B3D' },
    ]
  },
];

const SHARD_SECTIONS = [
  {
    title:'Sensory Fragments', subtitle:'Visual & auditory captures',
    items:[
      { id:'s1', name:'Kyoto Morning', type:'Visual', location:'Japan', rarity:'Common', color:'#C8963E', acquired:'Mar 2026' },
      { id:'s2', name:'Bazaar Weave', type:'Auditory', location:'Turkey', rarity:'Rare', color:'#6B8C5A', acquired:'Feb 2026' },
      { id:'s3', name:'Seine Current', type:'Visual', location:'France', rarity:'Uncommon', color:'#8B6B3D', acquired:'Jan 2026' },
      { id:'s4', name:'Medina Door', type:'Kinesthetic', location:'Morocco', rarity:'Common', color:'#C8963E', acquired:'Dec 2025' },
      { id:'s5', name:'Santorini Sky', type:'Visual', location:'Greece', rarity:'Rare', color:'#6B8C5A', acquired:'Nov 2025' },
    ]
  },
  {
    title:'Reflective Shards', subtitle:'Written & contemplative fragments',
    items:[
      { id:'s6', name:"River's Language", type:'Reflective', location:'France', rarity:'Uncommon', color:'#8B6B3D', acquired:'Mar 2026' },
      { id:'s7', name:'Threshold Light', type:'Reflective', location:'Morocco', rarity:'Common', color:'#C8963E', acquired:'Jan 2026' },
      { id:'s8', name:'Sky Archive', type:'Reflective', location:'Greece', rarity:'Rare', color:'#6B8C5A', acquired:'Nov 2025' },
      { id:'s9', name:'Forum Echo', type:'Reflective', location:'Italy', rarity:'Legendary', color:'#8B6B3D', acquired:'Oct 2025' },
    ]
  },
  {
    title:'Rare Discoveries', subtitle:'Exceptional & legendary acquisitions',
    items:[
      { id:'s10', name:'Dead Calm', type:'Sensory', location:'Jordan', rarity:'Legendary', color:'#C8963E', acquired:'Sep 2025' },
      { id:'s11', name:'Midnight Sun', type:'Visual', location:'Iceland', rarity:'Legendary', color:'#6B8C5A', acquired:'Aug 2025' },
      { id:'s12', name:'Ghat Flame', type:'Multisensory', location:'India', rarity:'Legendary', color:'#8B6B3D', acquired:'Jul 2025' },
    ]
  },
];

// ─── HomeScreen ───────────────────────────────────────────────────────────────
function HomeScreen({ t, theme, setTheme, setActiveScreen }) {
  const { useState } = React;
  const [activeRitual, setActiveRitual] = useState(null);
  const [btnPressed, setBtnPressed] = useState(null);
  const MapPin = window.lucide.MapPin;
  const Eye = window.lucide.Eye;
  const Wind = window.lucide.Wind;
  const BookOpen = window.lucide.BookOpen;
  const Sun = window.lucide.Sun;
  const Moon = window.lucide.Moon;
  const Clock = window.lucide.Clock;
  const CheckCircle = window.lucide.CheckCircle;
  const ChevronRight = window.lucide.ChevronRight;

  const iconMap = { Eye, Wind, BookOpen };
  const rarityBadge = { Common: t.textDim, Uncommon: t.secondary, Rare: t.primary, Legendary: '#D4A847' };

  return React.createElement('div', {
    style: { flex: 1, overflowY: 'auto', background: t.bg, paddingBottom: 80 }
  },
    // Header
    React.createElement('div', { style: { padding: '20px 20px 0' } },
      React.createElement('div', { style: { display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom: 4 } },
        React.createElement('div', null,
          React.createElement('div', { style: { fontSize:10, color: t.textDim, textTransform:'uppercase', letterSpacing:'0.15em', fontFamily:"'Fraunces', serif", marginBottom:2 } }, 'Current Position'),
          React.createElement('div', { style: { display:'flex', alignItems:'center', gap:6 } },
            MapPin && React.createElement(MapPin, { size:14, color: t.primary, strokeWidth:1.5 }),
            React.createElement('span', { style: { fontSize:16, fontWeight:700, color: t.text, fontFamily:"'Fraunces', serif" } }, 'Kyoto, Japan')
          ),
          React.createElement('div', { style: { fontSize:10, color: t.textDim, fontFamily:"'Fraunces', serif", marginTop:2, fontStyle:'italic' } }, "35°01'N  135°46'E")
        ),
        React.createElement('button', {
          onClick: () => setTheme(theme === 'dark' ? 'light' : 'dark'),
          style: { background: t.surface, border:`1px solid ${t.border}`, borderRadius:4, padding:'6px 8px', cursor:'pointer', display:'flex', alignItems:'center', gap:4 }
        },
          theme === 'dark'
            ? (Sun && React.createElement(Sun, { size:14, color: t.primary, strokeWidth:1.5 }))
            : (Moon && React.createElement(Moon, { size:14, color: t.primary, strokeWidth:1.5 })),
          React.createElement('span', { style: { fontSize:10, color: t.textMuted, fontFamily:"'Fraunces', serif", textTransform:'uppercase', letterSpacing:'0.1em' } },
            theme === 'dark' ? 'Light' : 'Dark')
        )
      ),
      // Divider
      React.createElement('div', { style: { height:1, background: t.border, margin:'14px 0 0', borderStyle:'dashed', borderWidth:'1px 0 0', borderColor: t.border } })
    ),

    // Active Ritual Banner
    activeRitual
      ? React.createElement('div', { style: { margin:'14px 20px', padding:'12px 14px', background: t.surfaceAlt || t.surface, border:`1px solid ${t.primary}`, borderRadius:3, borderLeft:`3px solid ${t.primary}` } },
          React.createElement('div', { style: { fontSize:9, color: t.primary, textTransform:'uppercase', letterSpacing:'0.15em', marginBottom:4, fontFamily:"'Fraunces', serif" } }, '◆ Ritual In Progress'),
          React.createElement('div', { style: { fontSize:13, fontWeight:600, color: t.text, fontFamily:"'Fraunces', serif", marginBottom:2 } }, activeRitual.title),
          React.createElement('div', { style: { fontSize:11, color: t.textMuted, fontFamily:"'Fraunces', serif", fontStyle:'italic' } }, activeRitual.location),
          React.createElement('button', {
            onClick: () => setActiveRitual(null),
            style: { marginTop:8, fontSize:10, color: t.secondary, background:'none', border:`1px solid ${t.secondary}`, borderRadius:2, padding:'3px 8px', cursor:'pointer', fontFamily:"'Fraunces', serif", letterSpacing:'0.05em' }
          }, 'Complete Ritual')
        )
      : null,

    // Section: Nearby Rituals (horizontal scroll)
    React.createElement('div', { style: { padding:'16px 0 0' } },
      React.createElement('div', { style: { padding:'0 20px', display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:10 } },
        React.createElement('div', null,
          React.createElement('div', { style: { fontSize:10, color: t.primary, textTransform:'uppercase', letterSpacing:'0.15em', fontFamily:"'Fraunces', serif" } }, '§ Nearby Rituals'),
          React.createElement('div', { style: { fontSize:11, color: t.textDim, fontStyle:'italic', fontFamily:"'Fraunces', serif", marginTop:1 } }, '5 discovered in range')
        ),
        React.createElement('button', { onClick: () => setActiveScreen('explore'), style: { background:'none', border:'none', cursor:'pointer', display:'flex', alignItems:'center', gap:3 } },
          React.createElement('span', { style: { fontSize:10, color: t.textDim, fontFamily:"'Fraunces', serif" } }, 'All Lore'),
          ChevronRight && React.createElement(ChevronRight, { size:12, color: t.textDim })
        )
      ),
      React.createElement('div', { style: { overflowX:'auto', display:'flex', gap:12, padding:'4px 20px 12px', scrollbarWidth:'none' } },
        RITUALS_DATA.map(r => {
          const Icon = iconMap[r.icon] || Eye;
          return React.createElement('div', {
            key: r.id,
            onClick: () => setActiveRitual(r),
            style: {
              flexShrink:0, width:140, background: t.surface, border:`1px solid ${r.completed ? t.secondary : t.border}`,
              borderRadius:3, padding:'12px 12px 10px', cursor:'pointer',
              borderTop:`3px solid ${r.completed ? t.secondary : r.shardColor}`,
              opacity: r.completed ? 0.75 : 1,
            }
          },
            React.createElement('div', { style: { display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:6 } },
              Icon && React.createElement(Icon, { size:14, color: r.shardColor, strokeWidth:1.5 }),
              r.completed && CheckCircle && React.createElement(CheckCircle, { size:12, color: t.secondary, strokeWidth:1.5 })
            ),
            React.createElement('div', { style: { fontSize:12, fontWeight:600, color: t.text, fontFamily:"'Fraunces', serif", lineHeight:1.3, marginBottom:4 } }, r.title),
            React.createElement('div', { style: { fontSize:10, color: t.textDim, fontFamily:"'Fraunces', serif", marginBottom:6, fontStyle:'italic' } }, r.location),
            React.createElement('div', { style: { display:'flex', alignItems:'center', justifyContent:'space-between' } },
              React.createElement('div', { style: { display:'flex', alignItems:'center', gap:3 } },
                Clock && React.createElement(Clock, { size:10, color: t.textDim, strokeWidth:1.5 }),
                React.createElement('span', { style: { fontSize:10, color: t.textDim, fontFamily:"'Fraunces', serif" } }, r.duration)
              ),
              React.createElement('span', { style: { fontSize:9, color: rarityBadge[r.rarity], textTransform:'uppercase', letterSpacing:'0.08em', fontFamily:"'Fraunces', serif" } }, r.rarity)
            )
          );
        })
      )
    ),

    // Section: Today's Offering (large featured card)
    React.createElement('div', { style: { padding:'4px 20px 0' } },
      React.createElement('div', { style: { height:1, borderTop:`1px dashed ${t.border}`, marginBottom:14 } }),
      React.createElement('div', { style: { fontSize:10, color: t.primary, textTransform:'uppercase', letterSpacing:'0.15em', fontFamily:"'Fraunces', serif", marginBottom:10 } }, '§ Today\'s Offering'),
      React.createElement('div', {
        style: { background: t.surface, border:`1px solid ${t.border}`, borderRadius:3, overflow:'hidden' }
      },
        // Decorative top stripe
        React.createElement('div', { style: { height:3, background:`linear-gradient(90deg, ${t.primary} 0%, ${t.secondary} 50%, #8B6B3D 100%)` } }),
        React.createElement('div', { style: { padding:'16px' } },
          React.createElement('div', { style: { display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:10 } },
            React.createElement('div', null,
              React.createElement('div', { style: { fontSize:9, color: t.textDim, textTransform:'uppercase', letterSpacing:'0.12em', fontFamily:"'Fraunces', serif", marginBottom:4 } }, 'Reflective · 10 min'),
              React.createElement('div', { style: { fontSize:17, fontWeight:700, color: t.text, fontFamily:"'Fraunces', serif", lineHeight:1.2 } }, "The River's Language")
            ),
            React.createElement('div', { style: { background: t.bg, border:`1px solid ${t.border}`, borderRadius:2, padding:'4px 8px', textAlign:'center' } },
              React.createElement('div', { style: { fontSize:10, color:'#8B6B3D', fontFamily:"'Fraunces', serif", fontWeight:600 } }, 'Uncommon'),
              React.createElement('div', { style: { fontSize:9, color: t.textDim, fontFamily:"'Fraunces', serif" } }, 'Shard')
            )
          ),
          React.createElement('div', { style: { fontSize:13, color: t.textMuted, fontFamily:"'Fraunces', serif", fontStyle:'italic', lineHeight:1.6, marginBottom:12, borderLeft:`2px solid ${t.border}`, paddingLeft:10 } },
            "Sit by the water and write three things the river seems to be saying to this city and its people."
          ),
          React.createElement('div', { style: { display:'flex', alignItems:'center', gap:6, marginBottom:12 } },
            MapPin && React.createElement(MapPin, { size:11, color: t.textDim, strokeWidth:1.5 }),
            React.createElement('span', { style: { fontSize:11, color: t.textDim, fontFamily:"'Fraunces', serif", fontStyle:'italic' } }, "Seine Embankment, Paris · 48°51'N 02°21'E")
          ),
          React.createElement('button', {
            onMouseDown: () => setBtnPressed('begin'),
            onMouseUp: () => setBtnPressed(null),
            onMouseLeave: () => setBtnPressed(null),
            onClick: () => setActiveRitual(RITUALS_DATA[2]),
            style: {
              width:'100%', padding:'10px', background: btnPressed === 'begin' ? t.primaryDark || '#A07828' : t.primary,
              border:'none', borderRadius:2, cursor:'pointer', fontFamily:"'Fraunces', serif",
              fontSize:13, fontWeight:600, color: theme === 'dark' ? '#1A1610' : '#F5EDD8',
              letterSpacing:'0.05em', transition:'transform 0.1s',
              transform: btnPressed === 'begin' ? 'scale(0.98)' : 'scale(1)',
            }
          }, 'Begin Ritual →')
        )
      )
    )
  );
}

// ─── ExploreScreen ────────────────────────────────────────────────────────────
function ExploreScreen({ t, theme, setTheme, setActiveScreen }) {
  const { useState } = React;
  const [activeLocation, setActiveLocation] = useState(0);
  const MapPin = window.lucide.MapPin;
  const Sun = window.lucide.Sun;
  const Moon = window.lucide.Moon;
  const Globe = window.lucide.Globe;

  const locations = ['All Regions', 'Asia Pacific', 'Europe', 'Middle East', 'Americas'];

  return React.createElement('div', { style: { flex:1, overflowY:'auto', background: t.bg, paddingBottom:80 } },
    // Header
    React.createElement('div', { style: { padding:'20px 20px 0' } },
      React.createElement('div', { style: { display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:4 } },
        React.createElement('div', null,
          React.createElement('div', { style: { fontSize:10, color: t.textDim, textTransform:'uppercase', letterSpacing:'0.15em', fontFamily:"'Fraunces', serif", marginBottom:2 } }, 'Archive'),
          React.createElement('div', { style: { fontSize:22, fontWeight:700, color: t.text, fontFamily:"'Fraunces', serif", lineHeight:1 } }, 'Local Lore'),
          React.createElement('div', { style: { fontSize:11, color: t.textDim, fontStyle:'italic', fontFamily:"'Fraunces', serif", marginTop:3 } }, 'Co-authored by 1,247 travelers')
        ),
        React.createElement('button', {
          onClick: () => setTheme(theme === 'dark' ? 'light' : 'dark'),
          style: { background: t.surface, border:`1px solid ${t.border}`, borderRadius:4, padding:'6px 8px', cursor:'pointer', display:'flex', alignItems:'center', gap:4 }
        },
          theme === 'dark'
            ? (Sun && React.createElement(Sun, { size:14, color: t.primary, strokeWidth:1.5 }))
            : (Moon && React.createElement(Moon, { size:14, color: t.primary, strokeWidth:1.5 }))
        )
      ),
      React.createElement('div', { style: { height:1, borderTop:`1px dashed ${t.border}`, margin:'14px 0 0' } })
    ),

    // Location Filter (horizontal scroll tabs)
    React.createElement('div', { style: { overflowX:'auto', display:'flex', gap:8, padding:'12px 20px', scrollbarWidth:'none' } },
      locations.map((loc, i) =>
        React.createElement('button', {
          key: loc,
          onClick: () => setActiveLocation(i),
          style: {
            flexShrink:0, background: activeLocation === i ? t.primary : t.surface,
            border:`1px solid ${activeLocation === i ? t.primary : t.border}`,
            borderRadius:2, padding:'5px 12px', cursor:'pointer',
            fontFamily:"'Fraunces', serif", fontSize:11, fontWeight: activeLocation === i ? 600 : 400,
            color: activeLocation === i ? (theme === 'dark' ? '#1A1610' : '#F5EDD8') : t.textMuted,
            letterSpacing:'0.05em', transition:'all 0.15s',
          }
        }, loc)
      )
    ),

    // Stacked Horizontal Scroll Sections
    LORE_SECTIONS.map((section, si) =>
      React.createElement('div', { key: section.title, style: { marginBottom: 6 } },
        // Section Header
        React.createElement('div', { style: { padding:'10px 20px 0' } },
          React.createElement('div', { style: { display:'flex', alignItems:'baseline', gap:8, marginBottom:2 } },
            React.createElement('span', { style: { fontSize:9, color: t.primary, textTransform:'uppercase', letterSpacing:'0.15em', fontFamily:"'Fraunces', serif" } }, `§${si + 1}`),
            React.createElement('span', { style: { fontSize:14, fontWeight:600, color: t.text, fontFamily:"'Fraunces', serif" } }, section.title),
          ),
          React.createElement('div', { style: { fontSize:11, color: t.textDim, fontStyle:'italic', fontFamily:"'Fraunces', serif", marginBottom:8 } }, section.subtitle),
          React.createElement('div', { style: { height:1, borderTop:`1px dashed ${t.border}` } })
        ),
        // Horizontal Scroll Cards
        React.createElement('div', { style: { overflowX:'auto', display:'flex', gap:12, padding:'10px 20px 14px', scrollbarWidth:'none' } },
          section.items.map(item =>
            React.createElement('div', {
              key: item.id,
              style: {
                flexShrink:0, width:200, background: t.surface, border:`1px solid ${t.border}`,
                borderRadius:3, padding:'14px', borderLeft:`3px solid ${item.color}`,
              }
            },
              React.createElement('div', { style: { fontSize:12, fontWeight:600, color: t.text, fontFamily:"'Fraunces', serif", marginBottom:8, lineHeight:1.3 } }, item.place),
              React.createElement('div', { style: { fontSize:12, color: t.textMuted, fontFamily:"'Fraunces', serif", fontStyle:'italic', lineHeight:1.6, marginBottom:10 } },
                `"${item.entry}"`
              ),
              React.createElement('div', { style: { height:1, borderTop:`1px dashed ${t.border}`, marginBottom:8 } }),
              React.createElement('div', { style: { display:'flex', justifyContent:'space-between', alignItems:'center' } },
                React.createElement('div', { style: { fontSize:10, color: t.textDim, fontFamily:"'Fraunces', serif" } },
                  `— ${item.contributor}`
                ),
                React.createElement('div', { style: { fontSize:9, color: item.color, fontFamily:"'Fraunces', serif", letterSpacing:'0.05em' } }, item.year)
              )
            )
          )
        )
      )
    )
  );
}

// ─── CollectionScreen ─────────────────────────────────────────────────────────
function CollectionScreen({ t, theme, setTheme, setActiveScreen }) {
  const { useState } = React;
  const [selectedShard, setSelectedShard] = useState(null);
  const Layers = window.lucide.Layers;
  const Sun = window.lucide.Sun;
  const Moon = window.lucide.Moon;
  const X = window.lucide.X;

  const rarityColor = { Common: t.textDim, Uncommon:'#8B6B3D', Rare: t.primary, Legendary:'#D4A847' };

  // Shard pattern visual
  const ShardVisual = ({ color, rarity, name }) => {
    const size = rarity === 'Legendary' ? 3 : rarity === 'Rare' ? 2 : 1;
    return React.createElement('div', {
      style: {
        width:'100%', height:72, background: t.bg,
        border:`1px solid ${color}30`, borderRadius:2, marginBottom:10,
        position:'relative', overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center',
      }
    },
      // Background texture lines
      React.createElement('div', { style: { position:'absolute', inset:0, opacity:0.15,
        backgroundImage:`repeating-linear-gradient(45deg, ${color} 0px, ${color} 1px, transparent 1px, transparent 8px)` } }),
      // Center glyph
      React.createElement('div', { style: {
        width: 28 + size * 6, height: 28 + size * 6, borderRadius:'50%',
        background: `${color}20`, border:`1px solid ${color}60`,
        display:'flex', alignItems:'center', justifyContent:'center',
        boxShadow: rarity === 'Legendary' ? `0 0 12px ${color}40` : 'none',
      } },
        React.createElement('div', { style: { width:8, height:8, background: color, borderRadius:'50%', opacity:0.8 } })
      ),
      // Rarity indicator dots
      rarity === 'Legendary' && React.createElement('div', { style: { position:'absolute', top:6, right:6, display:'flex', gap:2 } },
        [1,2,3].map(d => React.createElement('div', { key: d, style: { width:4, height:4, borderRadius:'50%', background:'#D4A847' } }))
      )
    );
  };

  return React.createElement('div', { style: { flex:1, overflowY:'auto', background: t.bg, paddingBottom:80 } },
    // Header
    React.createElement('div', { style: { padding:'20px 20px 0' } },
      React.createElement('div', { style: { display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:4 } },
        React.createElement('div', null,
          React.createElement('div', { style: { fontSize:10, color: t.textDim, textTransform:'uppercase', letterSpacing:'0.15em', fontFamily:"'Fraunces', serif", marginBottom:2 } }, 'Personal Archive'),
          React.createElement('div', { style: { fontSize:22, fontWeight:700, color: t.text, fontFamily:"'Fraunces', serif", lineHeight:1 } }, 'Memory Shards'),
          React.createElement('div', { style: { fontSize:11, color: t.textDim, fontStyle:'italic', fontFamily:"'Fraunces', serif", marginTop:3 } }, '12 shards acquired · 3 locations')
        ),
        React.createElement('button', {
          onClick: () => setTheme(theme === 'dark' ? 'light' : 'dark'),
          style: { background: t.surface, border:`1px solid ${t.border}`, borderRadius:4, padding:'6px 8px', cursor:'pointer', display:'flex', alignItems:'center', gap:4 }
        },
          theme === 'dark'
            ? (Sun && React.createElement(Sun, { size:14, color: t.primary, strokeWidth:1.5 }))
            : (Moon && React.createElement(Moon, { size:14, color: t.primary, strokeWidth:1.5 }))
        )
      ),
      // Stats row
      React.createElement('div', { style: { display:'flex', gap:0, margin:'14px 0 0', border:`1px solid ${t.border}`, borderRadius:3, overflow:'hidden' } },
        [['12', 'Total'], ['3', 'Locations'], ['2', 'Legendary'], ['4', 'Rare']].map(([val, label], i) =>
          React.createElement('div', {
            key: label,
            style: { flex:1, padding:'8px 0', textAlign:'center', borderRight: i < 3 ? `1px solid ${t.border}` : 'none', background: t.surface }
          },
            React.createElement('div', { style: { fontSize:16, fontWeight:700, color: t.primary, fontFamily:"'Fraunces', serif" } }, val),
            React.createElement('div', { style: { fontSize:9, color: t.textDim, textTransform:'uppercase', letterSpacing:'0.1em', fontFamily:"'Fraunces', serif" } }, label)
          )
        )
      ),
      React.createElement('div', { style: { height:1, borderTop:`1px dashed ${t.border}`, marginTop:14 } })
    ),

    // Stacked Horizontal Scroll Sections
    SHARD_SECTIONS.map((section, si) =>
      React.createElement('div', { key: section.title, style: { marginBottom:6 } },
        React.createElement('div', { style: { padding:'12px 20px 0' } },
          React.createElement('div', { style: { display:'flex', alignItems:'baseline', gap:8, marginBottom:2 } },
            React.createElement('span', { style: { fontSize:9, color: t.primary, textTransform:'uppercase', letterSpacing:'0.15em', fontFamily:"'Fraunces', serif" } }, `§${si + 1}`),
            React.createElement('span', { style: { fontSize:14, fontWeight:600, color: t.text, fontFamily:"'Fraunces', serif" } }, section.title),
          ),
          React.createElement('div', { style: { fontSize:11, color: t.textDim, fontStyle:'italic', fontFamily:"'Fraunces', serif", marginBottom:8 } }, section.subtitle),
          React.createElement('div', { style: { height:1, borderTop:`1px dashed ${t.border}` } })
        ),
        React.createElement('div', { style: { overflowX:'auto', display:'flex', gap:12, padding:'10px 20px 14px', scrollbarWidth:'none' } },
          section.items.map(shard =>
            React.createElement('div', {
              key: shard.id,
              onClick: () => setSelectedShard(shard),
              style: {
                flexShrink:0, width:130, background: t.surface, border:`1px solid ${t.border}`,
                borderRadius:3, padding:'12px', cursor:'pointer',
                borderTop: shard.rarity === 'Legendary' ? `3px solid #D4A847` : `3px solid ${shard.color}`,
              }
            },
              React.createElement(ShardVisual, { color: shard.color, rarity: shard.rarity, name: shard.name }),
              React.createElement('div', { style: { fontSize:12, fontWeight:600, color: t.text, fontFamily:"'Fraunces', serif", marginBottom:3, lineHeight:1.2 } }, shard.name),
              React.createElement('div', { style: { fontSize:10, color: t.textDim, fontFamily:"'Fraunces', serif", fontStyle:'italic', marginBottom:6 } }, shard.location),
              React.createElement('div', { style: { display:'flex', justifyContent:'space-between', alignItems:'center' } },
                React.createElement('span', { style: { fontSize:9, color: rarityColor[shard.rarity] || t.textDim, fontFamily:"'Fraunces', serif", textTransform:'uppercase', letterSpacing:'0.08em' } }, shard.rarity),
                React.createElement('span', { style: { fontSize:9, color: t.textDim, fontFamily:"'Fraunces', serif" } }, shard.acquired)
              )
            )
          )
        )
      )
    ),

    // Shard Detail Modal
    selectedShard && React.createElement('div', {
      onClick: () => setSelectedShard(null),
      style: { position:'absolute', inset:0, background:'rgba(0,0,0,0.7)', zIndex:100, display:'flex', alignItems:'flex-end', padding:'0 0 80px' }
    },
      React.createElement('div', {
        onClick: e => e.stopPropagation(),
        style: { width:'100%', background: t.bg, border:`1px solid ${t.border}`, borderRadius:'6px 6px 0 0', padding:'20px 20px 24px', borderTop:`3px solid ${selectedShard.rarity === 'Legendary' ? '#D4A847' : selectedShard.color}` }
      },
        React.createElement('div', { style: { display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:14 } },
          React.createElement('div', null,
            React.createElement('div', { style: { fontSize:9, color: rarityColor[selectedShard.rarity] || t.textDim, textTransform:'uppercase', letterSpacing:'0.15em', fontFamily:"'Fraunces', serif", marginBottom:3 } }, `${selectedShard.rarity} Shard · ${selectedShard.type}`),
            React.createElement('div', { style: { fontSize:20, fontWeight:700, color: t.text, fontFamily:"'Fraunces', serif" } }, selectedShard.name)
          ),
          X && React.createElement('button', { onClick: () => setSelectedShard(null), style: { background:'none', border:'none', cursor:'pointer' } },
            React.createElement(X, { size:18, color: t.textDim })
          )
        ),
        React.createElement('div', { style: { height:100, background: t.surface, border:`1px solid ${selectedShard.color}30`, borderRadius:3, marginBottom:14, display:'flex', alignItems:'center', justifyContent:'center', position:'relative', overflow:'hidden' } },
          React.createElement('div', { style: { position:'absolute', inset:0, opacity:0.1, backgroundImage:`repeating-linear-gradient(45deg, ${selectedShard.color} 0px, ${selectedShard.color} 1px, transparent 1px, transparent 10px)` } }),
          React.createElement('div', { style: { textAlign:'center' } },
            React.createElement('div', { style: { width:40, height:40, borderRadius:'50%', background:`${selectedShard.color}25`, border:`1px solid ${selectedShard.color}60`, margin:'0 auto 6px', display:'flex', alignItems:'center', justifyContent:'center' } },
              React.createElement('div', { style: { width:12, height:12, background: selectedShard.color, borderRadius:'50%' } })
            ),
            React.createElement('div', { style: { fontSize:10, color: t.textDim, fontFamily:"'Fraunces', serif", fontStyle:'italic' } }, 'Sensory imprint preserved')
          )
        ),
        React.createElement('div', { style: { display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 } },
          [['Origin', selectedShard.location], ['Acquired', selectedShard.acquired], ['Type', selectedShard.type], ['Rarity', selectedShard.rarity]].map(([label, value]) =>
            React.createElement('div', { key: label, style: { background: t.surface, border:`1px solid ${t.border}`, borderRadius:2, padding:'8px 10px' } },
              React.createElement('div', { style: { fontSize:9, color: t.textDim, textTransform:'uppercase', letterSpacing:'0.1em', fontFamily:"'Fraunces', serif", marginBottom:2 } }, label),
              React.createElement('div', { style: { fontSize:12, color: t.text, fontFamily:"'Fraunces', serif", fontWeight:600 } }, value)
            )
          )
        )
      )
    )
  );
}

// ─── JourneyScreen ────────────────────────────────────────────────────────────
function JourneyScreen({ t, theme, setTheme, setActiveScreen }) {
  const { useState } = React;
  const [expandedBadge, setExpandedBadge] = useState(null);
  const Star = window.lucide.Star;
  const Sun = window.lucide.Sun;
  const Moon = window.lucide.Moon;
  const CheckCircle = window.lucide.CheckCircle;
  const Award = window.lucide.Award;
  const TrendingUp = window.lucide.TrendingUp;

  const BADGES = [
    { id:'b1', name:'First Light', desc:'Completed your first visual ritual', earned:true, color:'#C8963E', symbol:'◈' },
    { id:'b2', name:'Sound Seeker', desc:'Completed 3 auditory rituals', earned:true, color:'#6B8C5A', symbol:'◉' },
    { id:'b3', name:'Lore Keeper', desc:'Contributed 5 memory shards to Local Lore', earned:true, color:'#8B6B3D', symbol:'◊' },
    { id:'b4', name:'Continental Pilgrim', desc:'Completed rituals on 3 continents', earned:false, color:'#C8963E', symbol:'✦' },
    { id:'b5', name:'Deep Listener', desc:'10 hours of total ritual engagement', earned:false, color:'#6B8C5A', symbol:'◎' },
    { id:'b6', name:'Atlas Bearer', desc:'Unlock all ritual types in one city', earned:false, color:'#D4A847', symbol:'⊛' },
  ];

  const COMPLETIONS = [
    { id:'c1', ritual:'Market Sound Weave', location:'Grand Bazaar', date:'Today, 2h ago', shard:'Rare', color:'#6B8C5A' },
    { id:'c2', ritual:'Threshold Breath', location:'Medina, Fes', date:'Yesterday', shard:'Common', color:'#C8963E' },
    { id:'c3', ritual:'Sky Archive', location:'Santorini', date:'3 days ago', shard:'Rare', color:'#6B8C5A' },
    { id:'c4', ritual:'Light on Stone', location:'Kyoto', date:'Last week', shard:'Common', color:'#C8963E' },
  ];

  const progressPct = 62;

  return React.createElement('div', { style: { flex:1, overflowY:'auto', background: t.bg, paddingBottom:80 } },
    // Header
    React.createElement('div', { style: { padding:'20px 20px 0' } },
      React.createElement('div', { style: { display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:4 } },
        React.createElement('div', null,
          React.createElement('div', { style: { fontSize:10, color: t.textDim, textTransform:'uppercase', letterSpacing:'0.15em', fontFamily:"'Fraunces', serif", marginBottom:2 } }, 'Personal Path'),
          React.createElement('div', { style: { fontSize:22, fontWeight:700, color: t.text, fontFamily:"'Fraunces', serif", lineHeight:1 } }, 'Wellness Journey'),
          React.createElement('div', { style: { fontSize:11, color: t.textDim, fontStyle:'italic', fontFamily:"'Fraunces', serif", marginTop:3 } }, 'Level III — Wandering Scholar')
        ),
        React.createElement('button', {
          onClick: () => setTheme(theme === 'dark' ? 'light' : 'dark'),
          style: { background: t.surface, border:`1px solid ${t.border}`, borderRadius:4, padding:'6px 8px', cursor:'pointer' }
        },
          theme === 'dark'
            ? (Sun && React.createElement(Sun, { size:14, color: t.primary, strokeWidth:1.5 }))
            : (Moon && React.createElement(Moon, { size:14, color: t.primary, strokeWidth:1.5 }))
        )
      ),
      React.createElement('div', { style: { height:1, borderTop:`1px dashed ${t.border}`, margin:'14px 0 0' } })
    ),

    // Progress Section
    React.createElement('div', { style: { padding:'16px 20px' } },
      React.createElement('div', { style: { background: t.surface, border:`1px solid ${t.border}`, borderRadius:3, padding:'16px', display:'flex', gap:16, alignItems:'center' } },
        // Progress Ring
        React.createElement('div', { style: { position:'relative', flexShrink:0 } },
          React.createElement('svg', { width:80, height:80, viewBox:'0 0 80 80' },
            React.createElement('circle', { cx:40, cy:40, r:32, fill:'none', stroke: t.border, strokeWidth:5 }),
            React.createElement('circle', { cx:40, cy:40, r:32, fill:'none', stroke: t.primary, strokeWidth:5,
              strokeDasharray:`${2 * Math.PI * 32}`, strokeDashoffset:`${2 * Math.PI * 32 * (1 - progressPct / 100)}`,
              strokeLinecap:'round', transform:'rotate(-90 40 40)', style:{ transition:'stroke-dashoffset 0.5s' } }),
            React.createElement('text', { x:40, y:36, textAnchor:'middle', fill: t.text, fontSize:16, fontFamily:"'Fraunces', serif", fontWeight:700 }, `${progressPct}%`),
            React.createElement('text', { x:40, y:50, textAnchor:'middle', fill: t.textDim, fontSize:8, fontFamily:"'Fraunces', serif" }, 'to Level IV')
          )
        ),
        // Stats
        React.createElement('div', { style: { flex:1 } },
          React.createElement('div', { style: { fontSize:13, fontWeight:600, color: t.text, fontFamily:"'Fraunces', serif", marginBottom:10 } }, 'Journey Progress'),
          [['Rituals Complete', '14'], ['Shards Collected', '12'], ['Lore Contributed', '8'], ['Countries Visited', '6']].map(([label, val]) =>
            React.createElement('div', { key: label, style: { display:'flex', justifyContent:'space-between', marginBottom:5 } },
              React.createElement('span', { style: { fontSize:11, color: t.textMuted, fontFamily:"'Fraunces', serif" } }, label),
              React.createElement('span', { style: { fontSize:11, fontWeight:600, color: t.primary, fontFamily:"'Fraunces', serif" } }, val)
            )
          )
        )
      )
    ),

    // Badges Section (horizontal scroll)
    React.createElement('div', { style: { padding:'0 20px' } },
      React.createElement('div', { style: { height:1, borderTop:`1px dashed ${t.border}`, marginBottom:12 } }),
      React.createElement('div', { style: { fontSize:10, color: t.primary, textTransform:'uppercase', letterSpacing:'0.15em', fontFamily:"'Fraunces', serif", marginBottom:4 } }, '§ Achievements'),
      React.createElement('div', { style: { fontSize:11, color: t.textDim, fontStyle:'italic', fontFamily:"'Fraunces', serif", marginBottom:10 } }, '3 of 6 earned'),
    ),
    React.createElement('div', { style: { overflowX:'auto', display:'flex', gap:10, padding:'0 20px 14px', scrollbarWidth:'none' } },
      BADGES.map(badge =>
        React.createElement('div', {
          key: badge.id,
          onClick: () => setExpandedBadge(expandedBadge === badge.id ? null : badge.id),
          style: {
            flexShrink:0, width:100, background: badge.earned ? t.surface : t.bg,
            border:`1px solid ${badge.earned ? badge.color : t.border}`,
            borderRadius:3, padding:'12px 10px', cursor:'pointer', textAlign:'center',
            opacity: badge.earned ? 1 : 0.5,
          }
        },
          React.createElement('div', { style: { fontSize:22, color: badge.earned ? badge.color : t.textDim, marginBottom:6, fontFamily:"'Fraunces', serif" } }, badge.symbol),
          React.createElement('div', { style: { fontSize:11, fontWeight:600, color: badge.earned ? t.text : t.textDim, fontFamily:"'Fraunces', serif", lineHeight:1.3, marginBottom:4 } }, badge.name),
          expandedBadge === badge.id && React.createElement('div', { style: { fontSize:10, color: t.textDim, fontFamily:"'Fraunces', serif", fontStyle:'italic', lineHeight:1.4, marginTop:6, borderTop:`1px dashed ${t.border}`, paddingTop:6 } }, badge.desc)
        )
      )
    ),

    // Recent Completions
    React.createElement('div', { style: { padding:'0 20px' } },
      React.createElement('div', { style: { height:1, borderTop:`1px dashed ${t.border}`, marginBottom:12 } }),
      React.createElement('div', { style: { fontSize:10, color: t.primary, textTransform:'uppercase', letterSpacing:'0.15em', fontFamily:"'Fraunces', serif", marginBottom:12 } }, '§ Recent Completions'),
      COMPLETIONS.map(c =>
        React.createElement('div', { key: c.id, style: { display:'flex', gap:12, alignItems:'flex-start', marginBottom:12, paddingBottom:12, borderBottom:`1px dashed ${t.border}` } },
          React.createElement('div', { style: { width:32, height:32, borderRadius:2, background: t.surface, border:`1px solid ${c.color}40`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 } },
            CheckCircle && React.createElement(CheckCircle, { size:14, color: c.color, strokeWidth:1.5 })
          ),
          React.createElement('div', { style: { flex:1 } },
            React.createElement('div', { style: { fontSize:13, fontWeight:600, color: t.text, fontFamily:"'Fraunces', serif", marginBottom:2 } }, c.ritual),
            React.createElement('div', { style: { fontSize:11, color: t.textDim, fontStyle:'italic', fontFamily:"'Fraunces', serif" } }, c.location),
          ),
          React.createElement('div', { style: { textAlign:'right', flexShrink:0 } },
            React.createElement('div', { style: { fontSize:9, color: t.textDim, fontFamily:"'Fraunces', serif", marginBottom:3 } }, c.date),
            React.createElement('div', { style: { fontSize:9, color: c.color, textTransform:'uppercase', letterSpacing:'0.08em', fontFamily:"'Fraunces', serif" } }, c.shard)
          )
        )
      )
    )
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
function App() {
  const { useState, useEffect, useRef } = React;

  const themes = {
    dark: {
      bg:'#1A1610', surface:'#26201A', surfaceAlt:'#302820',
      text:'#E8DCC8', textMuted:'#A89878', textDim:'#6A5C48',
      primary:'#C8963E', primaryDark:'#A07828', secondary:'#6B8C5A',
      border:'#3A3028', borderMid:'#4A3F32', navBg:'#141210',
    },
    light: {
      bg:'#F5EDD8', surface:'#EDE0C0', surfaceAlt:'#E4D4A8',
      text:'#2A2218', textMuted:'#6A5848', textDim:'#9A8E78',
      primary:'#B8821E', primaryDark:'#9A6A10', secondary:'#4A6A3A',
      border:'#D4C8A0', borderMid:'#C4B888', navBg:'#EDE0C0',
    }
  };

  const [theme, setTheme] = useState('dark');
  const [activeScreen, setActiveScreen] = useState('home');
  const [pressedNav, setPressedNav] = useState(null);
  const [swipeX, setSwipeX] = useState(0);
  const t = themes[theme];

  useEffect(() => {
    const style = document.createElement('style');
    style.id = 'mindful-atlas-fonts';
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,600;0,9..144,700;1,9..144,300;1,9..144,400&display=swap');
      * { box-sizing: border-box; margin: 0; padding: 0; }
      ::-webkit-scrollbar { display: none; }
    `;
    if (!document.getElementById('mindful-atlas-fonts')) document.head.appendChild(style);
  }, []);

  const screens = { home: HomeScreen, explore: ExploreScreen, collection: CollectionScreen, journey: JourneyScreen };
  const CurrentScreen = screens[activeScreen];

  const navItems = [
    { id:'home', label:'Compass', icon:'Compass' },
    { id:'explore', label:'Lore', icon:'BookOpen' },
    { id:'collection', label:'Shards', icon:'Layers' },
    { id:'journey', label:'Journey', icon:'Star' },
  ];

  const handleTouchStart = (e) => setSwipeX(e.touches[0].clientX);
  const handleTouchEnd = (e) => {
    const dx = swipeX - e.changedTouches[0].clientX;
    if (Math.abs(dx) < 60) return;
    const idx = SCREEN_ORDER.indexOf(activeScreen);
    if (dx > 0 && idx < SCREEN_ORDER.length - 1) setActiveScreen(SCREEN_ORDER[idx + 1]);
    if (dx < 0 && idx > 0) setActiveScreen(SCREEN_ORDER[idx - 1]);
  };

  return React.createElement('div', {
    style: { minHeight:'100vh', background:'#f0f0f0', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'Fraunces', serif" }
  },
    React.createElement('div', {
      onTouchStart: handleTouchStart,
      onTouchEnd: handleTouchEnd,
      style: {
        width:375, height:812, background: t.bg, borderRadius:40,
        overflow:'hidden', position:'relative', display:'flex', flexDirection:'column',
        boxShadow:'0 32px 80px rgba(0,0,0,0.45), 0 0 0 1px rgba(200,150,62,0.15)',
      }
    },
      // Screen Content
      React.createElement('div', { style: { flex:1, overflow:'hidden', display:'flex', flexDirection:'column' } },
        React.createElement(CurrentScreen, { t, theme, setTheme, setActiveScreen, activeScreen })
      ),

      // Swipe Indicator Dots
      React.createElement('div', { style: { position:'absolute', bottom:82, left:0, right:0, display:'flex', justifyContent:'center', gap:6, pointerEvents:'none' } },
        SCREEN_ORDER.map(id =>
          React.createElement('div', {
            key: id,
            style: {
              width: activeScreen === id ? 16 : 5, height:5, borderRadius:3,
              background: activeScreen === id ? t.primary : t.textDim,
              transition:'all 0.2s ease',
            }
          })
        )
      ),

      // Bottom Navigation — vintage instrument panel style
      React.createElement('div', { style: { background: t.navBg, borderTop:`1px solid ${t.border}`, display:'flex', alignItems:'stretch', height:72, flexShrink:0 } },
        navItems.map((item, i) => {
          const Icon = window.lucide[item.icon];
          const isActive = activeScreen === item.id;
          const isPressed = pressedNav === item.id;
          return React.createElement('button', {
            key: item.id,
            onClick: () => setActiveScreen(item.id),
            onMouseDown: () => setPressedNav(item.id),
            onMouseUp: () => setPressedNav(null),
            onMouseLeave: () => setPressedNav(null),
            style: {
              flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:4,
              background: isActive ? `${t.primary}12` : 'none',
              border:'none', borderRight: i < 3 ? `1px solid ${t.border}` : 'none',
              borderTop: isActive ? `2px solid ${t.primary}` : '2px solid transparent',
              cursor:'pointer', paddingBottom:10, transition:'all 0.1s',
              transform: isPressed ? 'scale(0.92)' : 'scale(1)',
            }
          },
            Icon && React.createElement(Icon, { size:18, color: isActive ? t.primary : t.textDim, strokeWidth: isActive ? 2 : 1.5 }),
            React.createElement('span', { style: {
              fontSize:9, color: isActive ? t.primary : t.textDim,
              fontFamily:"'Fraunces', serif", fontWeight: isActive ? 600 : 400,
              textTransform:'uppercase', letterSpacing:'0.1em',
            } }, item.label)
          );
        })
      )
    )
  );
}
