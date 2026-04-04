const { useState, useEffect, useRef } = React;

function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [theme, setTheme] = useState('dark');
  const [pressedItem, setPressedItem] = useState(null);

  const themes = {
    dark: {
      bg: '#0C1610',
      surface: '#121E16',
      card: '#192A1D',
      cardAlt: '#1B1326',
      border: '#2A4030',
      borderAlt: '#3A2650',
      text: '#F0E6D0',
      textSub: '#A89880',
      textMuted: '#645848',
      moss: '#5A8A5E',
      mossLight: '#7ABD7E',
      aubergine: '#6A2860',
      aubergineLight: '#9A4890',
      ochre: '#C08028',
      ochreLight: '#E0A040',
      fuchsia: '#E04870',
      fuchsiaLight: '#F07898',
    },
    light: {
      bg: '#F4EADA',
      surface: '#ECD8B8',
      card: '#E2CC9E',
      cardAlt: '#ECD8E8',
      border: '#C8A870',
      borderAlt: '#C0A0C0',
      text: '#1C0E08',
      textSub: '#503820',
      textMuted: '#907060',
      moss: '#3A5838',
      mossLight: '#5A8A5E',
      aubergine: '#4A1840',
      aubergineLight: '#6A2860',
      ochre: '#B07020',
      ochreLight: '#C08028',
      fuchsia: '#C03058',
      fuchsiaLight: '#E04870',
    },
  };

  const t = themes[theme];

  const press = (id, fn) => {
    setPressedItem(id);
    setTimeout(() => { setPressedItem(null); fn && fn(); }, 140);
  };

  // ── Data ──────────────────────────────────────────────────────────
  const curios = [
    { id: 1, name: 'The Voynich Manuscript', category: 'mysteries', rarity: 'legendary', visual: '📜', desc: 'An undeciphered illustrated codex, written in an unknown script, carbon-dated to the early 15th century. Scholars still cannot determine its language, origin, or purpose.', tags: ['history', 'cryptography'], unlocked: true },
    { id: 2, name: 'Tardigrade Resilience', category: 'science', rarity: 'rare', visual: '🦠', desc: 'Microscopic water bears survive the vacuum of space, extreme radiation, and temperatures near absolute zero. They compress into a "tun" state — essentially pausing life itself.', tags: ['biology', 'space'], unlocked: true },
    { id: 3, name: 'The Dancing Plague of 1518', category: 'history', rarity: 'common', visual: '🌸', desc: 'In Strasbourg, hundreds of citizens danced uncontrollably for days — some until they collapsed from exhaustion. No one has ever fully explained why.', tags: ['history', 'medicine'], unlocked: true },
    { id: 4, name: 'Synesthesia', category: 'science', rarity: 'rare', visual: '💎', desc: 'A neurological phenomenon where one sense triggers another automatically — hearing colors, tasting music, seeing numbers as textured shapes. Estimated 4% of people experience it.', tags: ['neuroscience', 'perception'], unlocked: true },
    { id: 5, name: 'The Antikythera Mechanism', category: 'mysteries', rarity: 'legendary', visual: '⚙️', desc: 'A 2,000-year-old Greek analog computer with intricate bronze gears that tracked astronomical positions, eclipses, and the Olympic calendar with astonishing accuracy.', tags: ['ancient', 'technology'], unlocked: true },
    { id: 6, name: "Euler's Identity", category: 'science', rarity: 'common', visual: '∑', desc: "Often called the most beautiful equation in mathematics: eⁱᵖ + 1 = 0 elegantly connects five of mathematics' fundamental constants in a single, impossible-seeming truth.", tags: ['mathematics', 'philosophy'], unlocked: true },
    { id: 7, name: 'Phantom Architectures', category: 'art', rarity: 'common', visual: '🏛️', desc: "Giovanni Piranesi's imaginary prisons — the Carceri — depicted recursive, impossible architecture that influenced surrealism, science fiction, and modern horror aesthetics.", tags: ['art', 'architecture'], unlocked: true },
    { id: 8, name: 'Bioluminescent Bays', category: 'nature', rarity: 'rare', visual: '✨', desc: 'Mosquito Bay in Vieques glows electric blue at night, lit by millions of dinoflagellates. Stir the water and it blooms with cold fire.', tags: ['biology', 'ocean'], unlocked: false },
  ];

  const expeditions = [
    { id: 1, name: 'Forgotten Atlases', subtitle: 'Cartographic Mysteries of the Ancient World', progress: 68, total: 12, completed: 8, active: true, timeLeft: '4d 12h', reward: 'Legendary Curio', color: '#C08028', icon: '🗺️', desc: 'Traverse lost maps, phantom islands, and territories that existed only in the imagination of explorers who dared to draw what they could not see.' },
    { id: 2, name: 'Bioluminescent Wonders', subtitle: "Nature's Living Light", progress: 0, total: 10, completed: 0, active: false, timeLeft: '12d', reward: 'Rare Curio × 3', color: '#5A8A5E', icon: '✨', desc: 'Dive into oceans of light, discover organisms that glow from within, and understand the strange chemistry of living luminescence.' },
    { id: 3, name: 'Songs Between Worlds', subtitle: 'Music at the Threshold', progress: 0, total: 8, completed: 0, active: false, timeLeft: '21d', reward: 'Legendary + New Species', color: '#E04870', icon: '🎵', desc: 'From Tibetan singing bowls to whale migration — how sound carries meaning across the threshold of what can be heard and felt.' },
  ];

  const seedlings = [
    { id: 1, title: 'The Library of Babel', teaser: 'A thought experiment about infinite information', fact: "Jorge Luis Borges imagined a universe-sized library containing every possible combination of 25 characters — meaning it contains every book ever written, every book that could be written, and infinite nonsense. If it existed, finding any meaningful text would be statistically miraculous. Every truth you could ever seek is in there. So is every lie about it.", category: 'philosophy', visual: '📚', completed: false },
    { id: 2, title: 'How Coral Communicates', teaser: 'Reefs are talking — just not with words', fact: 'Coral polyps communicate through chemical signals traveling through shared tissue networks. A stressed coral can alert its neighbors within minutes, triggering coordinated defensive responses across the entire reef system. They have been doing this for 500 million years.', category: 'science', visual: '🪸', completed: true },
    { id: 3, title: 'The Stradivarius Mystery', teaser: 'What makes them sing after 300 years?', fact: "Stradivarius violins still outperform modern instruments. Scientists recently found the wood was treated with minerals — borax, zinc, copper — possibly to prevent woodworm, accidentally creating a perfect acoustic medium. The cure for an imagined problem became one of history's greatest accidental inventions.", category: 'history', visual: '🎻', completed: false },
  ];

  // ── Garden SVG ─────────────────────────────────────────────────────
  const GardenSVG = () => {
    const isDark = theme === 'dark';
    return React.createElement('svg', { width: 375, height: 210, viewBox: '0 0 375 210', style: { display: 'block' } },
      React.createElement('defs', null,
        React.createElement('linearGradient', { id: 'skyG', x1: '0', y1: '0', x2: '0', y2: '1' },
          React.createElement('stop', { offset: '0%', stopColor: isDark ? '#060E08' : '#B8D89A' }),
          React.createElement('stop', { offset: '100%', stopColor: isDark ? '#0C2214' : '#78A850' })
        ),
        React.createElement('linearGradient', { id: 'groundG', x1: '0', y1: '0', x2: '0', y2: '1' },
          React.createElement('stop', { offset: '0%', stopColor: isDark ? '#162E1A' : '#5A7A30' }),
          React.createElement('stop', { offset: '100%', stopColor: isDark ? '#0A180C' : '#3A5820' })
        ),
        React.createElement('radialGradient', { id: 'moonG', cx: '78%', cy: '18%', r: '22%' },
          React.createElement('stop', { offset: '0%', stopColor: isDark ? '#E8D870' : '#FFEE80', stopOpacity: isDark ? 0.5 : 0.6 }),
          React.createElement('stop', { offset: '100%', stopColor: 'transparent' })
        )
      ),
      // Sky & ground
      React.createElement('rect', { width: 375, height: 210, fill: 'url(#skyG)' }),
      React.createElement('rect', { width: 375, height: 210, fill: 'url(#moonG)' }),
      React.createElement('rect', { x: 0, y: 155, width: 375, height: 55, fill: 'url(#groundG)' }),
      React.createElement('ellipse', { cx: 188, cy: 156, rx: 230, ry: 18, fill: isDark ? '#162E1A' : '#5A7A30' }),
      // Moon / Sun
      React.createElement('circle', { cx: 316, cy: 34, r: 22, fill: isDark ? '#E0D060' : '#FFD040', opacity: 0.92 }),
      React.createElement('circle', { cx: 316, cy: 34, r: 17, fill: isDark ? '#C8B840' : '#FFE860' }),
      // Stars (dark only)
      ...(isDark ? [[35,18],[72,32],[115,14],[158,26],[195,10],[242,38],[268,20],[60,52],[135,46],[215,58],[290,30],[345,45]] : [])
        .map(([x,y],i) => React.createElement('circle',{key:'st'+i,cx:x,cy:y,r:1.5,fill:'#E0D8B8',opacity:0.55})),
      // Fireflies / light orbs
      ...(isDark ? [[85,118],[198,96],[272,126],[148,86],[328,108]] : [[80,110],[190,90],[270,120]])
        .map(([x,y],i) => React.createElement('circle',{key:'ff'+i,cx:x,cy:y,r:isDark?2:3,fill:isDark?t.ochreLight:'#FFFFFF',opacity:isDark?0.75:0.5})),
      // Background grass
      ...[28,54,88,118,155,195,232,268,305,342].map((x,i) =>
        React.createElement('line',{key:'gbg'+i,x1:x,y1:165,x2:x+(i%3-1)*7,y2:145+(i%2)*5,stroke:isDark?'#2A5030':'#4A6A28',strokeWidth:2.5,strokeLinecap:'round'})
      ),
      // ── Flora ──
      // Fern (left)
      React.createElement('g', { transform: 'translate(52, 150)' },
        ...[[-35,25],[-18,20],[0,30],[18,20],[35,25]].map(([angle,len],i) =>
          React.createElement('g',{key:'frn'+i,transform:`rotate(${angle})`},
            React.createElement('line',{x1:0,y1:0,x2:0,y2:-len,stroke:t.mossLight,strokeWidth:1.5,strokeLinecap:'round'}),
            React.createElement('ellipse',{cx:0,cy:-len*0.7,rx:5,ry:2,fill:t.moss,transform:`rotate(90,0,${-len*0.7})`}),
            React.createElement('ellipse',{cx:0,cy:-len*0.45,rx:4,ry:1.8,fill:t.mossLight,transform:`rotate(90,0,${-len*0.45})`})
          )
        )
      ),
      // Aubergine flower (tall stem)
      React.createElement('g', { transform: 'translate(122, 145)' },
        React.createElement('line',{x1:0,y1:0,x2:0,y2:-48,stroke:t.mossLight,strokeWidth:2.5}),
        React.createElement('line',{x1:0,y1:-26,x2:-13,y2:-18,stroke:t.mossLight,strokeWidth:1.5}),
        React.createElement('line',{x1:0,y1:-18,x2:13,y2:-12,stroke:t.mossLight,strokeWidth:1.5}),
        ...[0,60,120,180,240,300].map((ang,i) =>
          React.createElement('ellipse',{key:'aup'+i,cx:0,cy:-48,rx:6,ry:14,fill:t.aubergine,transform:`rotate(${ang},0,-48)`,opacity:0.9})
        ),
        React.createElement('circle',{cx:0,cy:-48,r:6,fill:t.ochre})
      ),
      // Crystal cluster
      React.createElement('g', { transform: 'translate(178, 152)' },
        React.createElement('polygon',{points:'0,-32 9,-11 0,0 -9,-11',fill:t.aubergineLight,opacity:0.88}),
        React.createElement('polygon',{points:'11,-23 19,-8 11,1 3,-8',fill:t.fuchsia,opacity:0.72}),
        React.createElement('polygon',{points:'-11,-20 -3,-7 -11,1 -18,-7',fill:t.aubergine,opacity:0.82})
      ),
      // Mushroom
      React.createElement('g', { transform: 'translate(240, 154)' },
        React.createElement('rect',{x:-5,y:-22,width:10,height:24,fill:'#D4B090',rx:2}),
        React.createElement('ellipse',{cx:0,cy:-22,rx:20,ry:12,fill:t.fuchsia}),
        React.createElement('ellipse',{cx:-6,cy:-20,rx:3.5,ry:2.2,fill:'#FFFFFF',opacity:0.38}),
        React.createElement('ellipse',{cx:6,cy:-15,rx:2.5,ry:1.8,fill:'#FFFFFF',opacity:0.28})
      ),
      // Ochre tall flower
      React.createElement('g', { transform: 'translate(296, 142)' },
        React.createElement('line',{x1:0,y1:0,x2:0,y2:-50,stroke:t.moss,strokeWidth:2.5}),
        ...[0,45,90,135,180,225,270,315].map((ang,i) =>
          React.createElement('ellipse',{key:'och'+i,cx:0,cy:-50,rx:4,ry:12,fill:i%2===0?t.ochre:t.ochreLight,transform:`rotate(${ang},0,-50)`,opacity:0.88})
        ),
        React.createElement('circle',{cx:0,cy:-50,r:5,fill:t.fuchsia})
      ),
      // Butterfly
      React.createElement('g', { transform: 'translate(158, 88)' },
        React.createElement('ellipse',{cx:-11,cy:0,rx:13,ry:8,fill:t.fuchsia,opacity:0.78,transform:'rotate(-18)'}),
        React.createElement('ellipse',{cx:11,cy:0,rx:13,ry:8,fill:t.fuchsiaLight,opacity:0.78,transform:'rotate(18)'}),
        React.createElement('ellipse',{cx:-6,cy:2,rx:6,ry:4,fill:t.aubergine,opacity:0.4,transform:'rotate(-18)'}),
        React.createElement('ellipse',{cx:6,cy:2,rx:6,ry:4,fill:t.aubergine,opacity:0.4,transform:'rotate(18)'}),
        React.createElement('line',{x1:-2,y1:-2,x2:2,y2:-2,stroke:t.textMuted,strokeWidth:1.5})
      ),
      // Vine connecting elements
      React.createElement('path',{d:'M 52 158 Q 88 132 122 144 Q 150 152 178 152 Q 206 152 240 154',stroke:t.moss,strokeWidth:1.5,fill:'none',opacity:0.42,strokeDasharray:'4 3'}),
      // Euler text floating
      React.createElement('text',{x:224,y:76,fill:isDark?'#C0B070':'#6A5020',fontSize:9,fontFamily:'serif',opacity:0.65,textAnchor:'middle'},'eⁱᵖ + 1 = 0'),
      // Locked orb (glowing)
      React.createElement('circle',{cx:340,cy:150,r:14,fill:t.moss,opacity:0.18}),
      React.createElement('circle',{cx:340,cy:150,r:9,fill:t.mossLight,opacity:0.4}),
      React.createElement('circle',{cx:340,cy:150,r:4,fill:'#FFFFFF',opacity:0.28}),
      React.createElement('text',{x:340,y:154,fill:t.mossLight,fontSize:7,textAnchor:'middle',opacity:0.7},'?'),
      // Foreground grass
      ...[12,40,75,108,145,188,228,263,298,332,365].map((x,i) =>
        React.createElement('line',{key:'fgr'+i,x1:x,y1:165,x2:x+(i%3-1)*9,y2:144+(i%2)*6,stroke:isDark?'#3A6840':'#4A7030',strokeWidth:2.5,strokeLinecap:'round'})
      ),
      // Horizon mist
      React.createElement('rect',{x:0,y:153,width:375,height:4,fill:isDark?'#204030':'#80A050',opacity:0.35,rx:2})
    );
  };

  // ── Shared UI ──────────────────────────────────────────────────────
  const BackBtn = () =>
    React.createElement('button', {
      onClick: () => press('back', () => setActiveScreen('home')),
      style: {
        background: 'transparent', border: `1px solid ${t.border}`,
        color: t.textSub, padding: '5px 13px', borderRadius: 20,
        cursor: 'pointer', fontFamily: "'Playfair Display', serif",
        fontSize: 11, display: 'flex', alignItems: 'center', gap: 6,
        letterSpacing: 0.5, transform: pressedItem === 'back' ? 'scale(0.94)' : 'scale(1)', transition: 'transform 0.12s',
      },
      onMouseDown: () => setPressedItem('back'), onMouseUp: () => setPressedItem(null),
    },
      React.createElement(window.lucide.ChevronLeft, { size: 12, color: t.textSub }),
      React.createElement('span', null, 'Bloom')
    );

  const ThemeBtn = () =>
    React.createElement('button', {
      onClick: () => setTheme(theme === 'dark' ? 'light' : 'dark'),
      style: {
        background: t.card, border: `1px solid ${t.border}`, color: t.textSub,
        width: 34, height: 34, borderRadius: 17, cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
      }
    }, theme === 'dark'
      ? React.createElement(window.lucide.Sun, { size: 14, color: t.ochreLight })
      : React.createElement(window.lucide.Moon, { size: 14, color: t.aubergineLight })
    );

  const RarityBadge = ({ rarity }) => {
    const cols = { legendary: t.ochre, rare: t.aubergineLight, common: t.moss };
    return React.createElement('span', {
      style: {
        background: cols[rarity] + '25', color: cols[rarity],
        border: `1px solid ${cols[rarity]}45`, fontSize: 8,
        padding: '2px 7px', borderRadius: 10, letterSpacing: 1.5,
        textTransform: 'uppercase', fontWeight: 600,
      }
    }, rarity);
  };

  // ── SCREEN: Home ───────────────────────────────────────────────────
  const HomeScreen = () =>
    React.createElement('div', { style: { height: 812, display: 'flex', flexDirection: 'column', background: t.bg, overflow: 'hidden' } },
      // Header
      React.createElement('div', { style: { padding: '18px 20px 10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' } },
        React.createElement('div', null,
          React.createElement('div', { style: { fontSize: 9, letterSpacing: 3.5, color: t.ochre, textTransform: 'uppercase', marginBottom: 1 } }, 'Your'),
          React.createElement('div', { style: { fontSize: 28, fontWeight: 700, color: t.text, lineHeight: 1, letterSpacing: -0.5 } }, 'Curio Bloom')
        ),
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8 } },
          React.createElement('div', { style: { background: t.ochre + '22', border: `1px solid ${t.ochre}40`, borderRadius: 16, padding: '4px 10px', display: 'flex', alignItems: 'center', gap: 5 } },
            React.createElement(window.lucide.Leaf, { size: 10, color: t.ochre }),
            React.createElement('span', { style: { fontSize: 9, color: t.ochre, letterSpacing: 1, fontWeight: 600 } }, 'KEEPER II')
          ),
          ThemeBtn()
        )
      ),
      // Garden
      React.createElement('div', { style: { margin: '0 16px', borderRadius: 20, overflow: 'hidden', border: `1px solid ${t.border}`, position: 'relative' } },
        GardenSVG(),
        React.createElement('div', { style: { position: 'absolute', bottom: 10, left: 12, background: t.bg + 'CC', borderRadius: 10, padding: '3px 10px' } },
          React.createElement('span', { style: { fontSize: 8, color: t.textSub, letterSpacing: 1.5, textTransform: 'uppercase' } }, '7 Curios · 1 Active Expedition')
        ),
        React.createElement('div', { style: { position: 'absolute', top: 10, right: 12, background: t.bg + 'BB', borderRadius: 10, padding: '3px 10px' } },
          React.createElement('span', { style: { fontSize: 8, color: t.mossLight, letterSpacing: 1.2 } }, '✦ FLOURISHING')
        )
      ),
      // Stats strip
      React.createElement('div', { style: { display: 'flex', gap: 8, margin: '12px 16px 0' } },
        ...[
          { v: '7', l: 'Curios', c: t.moss, icon: window.lucide.Sparkles },
          { v: '68%', l: 'Expedition', c: t.ochre, icon: window.lucide.Map },
          { v: '12', l: 'Day Streak', c: t.fuchsia, icon: window.lucide.Flame },
        ].map((s, i) =>
          React.createElement('div', { key: i, style: { flex: 1, background: t.surface, borderRadius: 12, padding: '9px 8px', textAlign: 'center', border: `1px solid ${t.border}` } },
            React.createElement('div', { style: { fontSize: 17, fontWeight: 700, color: s.c } }, s.v),
            React.createElement('div', { style: { fontSize: 8, color: t.textMuted, letterSpacing: 1.5, textTransform: 'uppercase', marginTop: 2 } }, s.l)
          )
        )
      ),
      // Hub nav cards
      React.createElement('div', { style: { flex: 1, padding: '12px 16px 18px', overflow: 'hidden' } },
        React.createElement('div', { style: { fontSize: 9, letterSpacing: 2.5, color: t.textMuted, textTransform: 'uppercase', marginBottom: 10 } }, 'Explore Your Bloom'),
        React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, height: 'calc(100% - 28px)' } },
          // Expeditions — tall left card
          React.createElement('div', {
            onClick: () => press('navExp', () => setActiveScreen('expeditions')),
            style: {
              background: `linear-gradient(145deg, ${t.cardAlt}, ${t.aubergine}40)`,
              borderRadius: 18, padding: 15, cursor: 'pointer',
              border: `1px solid ${t.borderAlt}`, gridRow: 'span 2',
              transform: pressedItem === 'navExp' ? 'scale(0.96)' : 'scale(1)', transition: 'transform 0.12s',
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            }
          },
            React.createElement('div', null,
              React.createElement('div', { style: { fontSize: 26, marginBottom: 8 } }, '🗺️'),
              React.createElement('div', { style: { fontSize: 15, fontWeight: 700, color: t.text, lineHeight: 1.25, marginBottom: 4 } }, 'Seasonal\nExpeditions'),
              React.createElement('div', { style: { fontSize: 9, color: t.ochre, letterSpacing: 1.5, display: 'flex', alignItems: 'center', gap: 4 } },
                React.createElement(window.lucide.Circle, { size: 6, color: t.ochre, fill: t.ochre }),
                React.createElement('span', null, '1 ACTIVE')
              )
            ),
            React.createElement('div', null,
              React.createElement('div', { style: { fontSize: 8, color: t.textMuted, marginBottom: 4 } }, 'Forgotten Atlases'),
              React.createElement('div', { style: { background: t.border, borderRadius: 4, height: 5, overflow: 'hidden', marginBottom: 8 } },
                React.createElement('div', { style: { background: `linear-gradient(90deg,${t.ochre},${t.fuchsia})`, width: '68%', height: '100%', borderRadius: 4 } })
              ),
              React.createElement('div', {
                style: { fontSize: 10, color: t.aubergineLight, border: `1px solid ${t.aubergineLight}`, borderRadius: 12, padding: '4px 10px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }
              },
                React.createElement('span', null, 'Enter'),
                React.createElement(window.lucide.ArrowRight, { size: 10, color: t.aubergineLight })
              )
            )
          ),
          // Seedlings
          React.createElement('div', {
            onClick: () => press('navSeed', () => setActiveScreen('seedlings')),
            style: {
              background: `linear-gradient(135deg, ${t.card}, ${t.moss}22)`,
              borderRadius: 18, padding: 14, cursor: 'pointer',
              border: `1px solid ${t.border}`,
              transform: pressedItem === 'navSeed' ? 'scale(0.96)' : 'scale(1)', transition: 'transform 0.12s',
            }
          },
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' } },
              React.createElement('div', { style: { fontSize: 22 } }, '🌱'),
              React.createElement('div', { style: { background: t.moss + '30', borderRadius: 8, padding: '2px 6px', fontSize: 7, color: t.mossLight, letterSpacing: 1 } }, 'NEW')
            ),
            React.createElement('div', { style: { fontSize: 12, fontWeight: 700, color: t.text, marginTop: 6 } }, 'Daily Seedling'),
            React.createElement('div', { style: { fontSize: 8, color: t.mossLight, marginTop: 2 } }, 'Library of Babel')
          ),
          // Archive
          React.createElement('div', {
            onClick: () => press('navArch', () => setActiveScreen('archive')),
            style: {
              background: `linear-gradient(135deg, ${t.card}, ${t.fuchsia}12)`,
              borderRadius: 18, padding: 14, cursor: 'pointer',
              border: `1px solid ${t.border}`,
              transform: pressedItem === 'navArch' ? 'scale(0.96)' : 'scale(1)', transition: 'transform 0.12s',
            }
          },
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' } },
              React.createElement('div', { style: { fontSize: 22 } }, '🏛️'),
              React.createElement('div', { style: { background: t.fuchsia + '22', borderRadius: 8, padding: '2px 6px', fontSize: 7, color: t.fuchsiaLight, letterSpacing: 1 } }, '7')
            ),
            React.createElement('div', { style: { fontSize: 12, fontWeight: 700, color: t.text, marginTop: 6 } }, 'Curio Archive'),
            React.createElement('div', { style: { fontSize: 8, color: t.fuchsiaLight, marginTop: 2 } }, 'Weave terrariums')
          ),
          // Profile — full width bottom
          React.createElement('div', {
            onClick: () => press('navProf', () => setActiveScreen('profile')),
            style: {
              background: `linear-gradient(135deg, ${t.surface}, ${t.moss}12)`,
              borderRadius: 18, padding: '12px 16px', cursor: 'pointer',
              border: `1px solid ${t.border}`, gridColumn: 'span 2',
              transform: pressedItem === 'navProf' ? 'scale(0.97)' : 'scale(1)', transition: 'transform 0.12s',
              display: 'flex', alignItems: 'center', gap: 12,
            }
          },
            React.createElement('div', { style: { fontSize: 26 } }, '🌿'),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', { style: { fontSize: 12, fontWeight: 700, color: t.text } }, 'Arborist Tiers'),
              React.createElement('div', { style: { fontSize: 8, color: t.textMuted } }, 'Keeper II → Cultivar III · 320 pts needed')
            ),
            React.createElement(window.lucide.ChevronRight, { size: 16, color: t.textMuted })
          )
        )
      )
    );

  // ── SCREEN: Expeditions ────────────────────────────────────────────
  const ExpeditionsScreen = () => {
    const [sel, setSel] = useState(expeditions[0]);
    return React.createElement('div', { style: { height: 812, display: 'flex', flexDirection: 'column', background: t.bg, overflow: 'hidden' } },
      // Header
      React.createElement('div', { style: { padding: '18px 20px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' } },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12 } },
          BackBtn(),
          React.createElement('div', null,
            React.createElement('div', { style: { fontSize: 9, letterSpacing: 3, color: t.ochre, textTransform: 'uppercase' } }, 'Seasonal'),
            React.createElement('div', { style: { fontSize: 22, fontWeight: 700, color: t.text, lineHeight: 1 } }, 'Expeditions')
          )
        ),
        ThemeBtn()
      ),
      // Active expedition hero — ASYMMETRIC: left col wider
      React.createElement('div', { style: { margin: '0 16px', background: `linear-gradient(135deg, ${t.cardAlt}, ${t.aubergine}50)`, borderRadius: 22, padding: 18, border: `1px solid ${t.borderAlt}`, position: 'relative', overflow: 'hidden' } },
        React.createElement('div', { style: { position: 'absolute', right: -8, top: -8, fontSize: 90, opacity: 0.1, pointerEvents: 'none' } }, '🗺️'),
        React.createElement('div', { style: { display: 'flex', gap: 14 } },
          // Left col (flex: 7)
          React.createElement('div', { style: { flex: 7 } },
            React.createElement('div', { style: { fontSize: 8, color: t.ochre, letterSpacing: 2.5, textTransform: 'uppercase', marginBottom: 5, display: 'flex', alignItems: 'center', gap: 5 } },
              React.createElement('span', { style: { width: 6, height: 6, borderRadius: 3, background: t.ochre, display: 'inline-block' } }),
              React.createElement('span', null, 'Active Expedition')
            ),
            React.createElement('div', { style: { fontSize: 20, fontWeight: 700, color: t.text, lineHeight: 1.15, marginBottom: 5 } }, 'Forgotten Atlases'),
            React.createElement('div', { style: { fontSize: 10, color: t.textSub, fontStyle: 'italic', marginBottom: 12, lineHeight: 1.5 } }, 'Cartographic mysteries of the ancient world'),
            React.createElement('div', { style: { fontSize: 8, color: t.textMuted, marginBottom: 5 } }, '8 of 12 chapters complete'),
            React.createElement('div', { style: { background: t.border, borderRadius: 4, height: 6, overflow: 'hidden', marginBottom: 10 } },
              React.createElement('div', { style: { background: `linear-gradient(90deg,${t.ochre},${t.fuchsia})`, width: '68%', height: '100%', borderRadius: 4 } })
            ),
            React.createElement('div', { style: { display: 'flex', gap: 6, flexWrap: 'wrap' } },
              React.createElement('div', { style: { background: t.ochre + '22', border: `1px solid ${t.ochre}44`, borderRadius: 10, padding: '3px 8px', fontSize: 7, color: t.ochreLight, display: 'flex', alignItems: 'center', gap: 3 } },
                React.createElement(window.lucide.Clock, { size: 8, color: t.ochreLight }),
                React.createElement('span', null, '4d 12h left')
              ),
              React.createElement('div', { style: { background: t.moss + '22', border: `1px solid ${t.moss}44`, borderRadius: 10, padding: '3px 8px', fontSize: 7, color: t.mossLight } }, '✦ Legendary reward')
            )
          ),
          // Right col (flex: 3) — chapter list
          React.createElement('div', { style: { flex: 3, display: 'flex', flexDirection: 'column', gap: 4, justifyContent: 'flex-start' } },
            ...[
              { ch: 'Terra Incognita', done: true },
              { ch: 'Phantom Islands', done: true },
              { ch: 'Sea of Darkness', done: false },
              { ch: 'The Lost City', done: false },
              { ch: 'Dragon Margins', done: false },
            ].map((item, i) =>
              React.createElement('div', { key: i, style: { background: item.done ? t.moss + '28' : t.surface, borderRadius: 8, padding: '5px 8px', border: `1px solid ${item.done ? t.moss + '40' : t.border}`, display: 'flex', alignItems: 'center', gap: 4 } },
                React.createElement('div', { style: { fontSize: 8, color: item.done ? t.mossLight : t.textMuted } }, item.done ? '✓' : '○'),
                React.createElement('div', { style: { fontSize: 7.5, color: item.done ? t.text : t.textMuted, lineHeight: 1.3 } }, item.ch)
              )
            )
          )
        ),
        React.createElement('button', { style: { marginTop: 14, width: '100%', background: `linear-gradient(90deg,${t.aubergine},${t.fuchsia})`, border: 'none', borderRadius: 14, padding: '11px 0', color: '#FFF', fontFamily: "'Playfair Display', serif", fontSize: 12, fontWeight: 600, cursor: 'pointer', letterSpacing: 0.8 } },
          '✦  Continue Expedition — Sea of Darkness'
        )
      ),
      // Upcoming header
      React.createElement('div', { style: { padding: '14px 16px 6px' } },
        React.createElement('div', { style: { fontSize: 9, letterSpacing: 2.5, color: t.textMuted, textTransform: 'uppercase' } }, 'Coming Expeditions')
      ),
      // Asymmetric upcoming list
      React.createElement('div', { style: { flex: 1, overflow: 'auto', padding: '0 16px 20px', display: 'flex', flexDirection: 'column', gap: 8 } },
        // Card 1 — horizontal wide
        React.createElement('div', { style: { background: `linear-gradient(135deg,${t.card},${t.moss}22)`, borderRadius: 18, padding: '14px 16px', border: `1px solid ${t.border}`, display: 'flex', gap: 14, alignItems: 'center' } },
          React.createElement('div', { style: { fontSize: 38, lineHeight: 1 } }, '✨'),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 3 } },
              React.createElement('div', { style: { fontSize: 14, fontWeight: 700, color: t.text, lineHeight: 1.2 } }, 'Bioluminescent Wonders'),
              React.createElement('div', { style: { fontSize: 8, color: t.textMuted } }, 'in 12d')
            ),
            React.createElement('div', { style: { fontSize: 9, color: t.textSub, fontStyle: 'italic', marginBottom: 6 } }, "Nature's Living Light — dive into glowing depths"),
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
              React.createElement('div', { style: { fontSize: 8, color: t.mossLight } }, '10 chapters · Rare × 3 reward'),
              React.createElement('div', { style: { fontSize: 9, color: t.moss, border: `1px solid ${t.moss}`, borderRadius: 10, padding: '2px 8px', cursor: 'pointer' } }, 'Preview')
            )
          )
        ),
        // Card 2 — taller, italic excerpt block
        React.createElement('div', { style: { background: `linear-gradient(155deg,${t.surface},${t.fuchsia}14)`, borderRadius: 18, padding: '16px 18px', border: `1px solid ${t.fuchsia}35` } },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 } },
            React.createElement('div', null,
              React.createElement('div', { style: { fontSize: 9, color: t.fuchsia, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 4 } }, 'Coming Soon'),
              React.createElement('div', { style: { fontSize: 16, fontWeight: 700, color: t.text, lineHeight: 1.2 } }, 'Songs Between Worlds')
            ),
            React.createElement('div', { style: { fontSize: 34 } }, '🎵')
          ),
          React.createElement('div', { style: { fontSize: 9, color: t.textSub, lineHeight: 1.65, fontStyle: 'italic', borderLeft: `2px solid ${t.fuchsia}40`, paddingLeft: 12, marginBottom: 8 } },
            '"From Tibetan singing bowls to whale migration — exploring how sound carries meaning across the threshold of what can be heard and felt."'
          ),
          React.createElement('div', { style: { fontSize: 8, color: t.textMuted } }, '8 chapters · Legendary reward + New Species unlock')
        )
      )
    );
  };

  // ── SCREEN: Seedlings ──────────────────────────────────────────────
  const SeedlingsScreen = () => {
    const [revealed, setRevealed] = useState(false);
    const todaySeedling = seedlings[0];
    return React.createElement('div', { style: { height: 812, display: 'flex', flexDirection: 'column', background: t.bg, overflow: 'hidden' } },
      React.createElement('div', { style: { padding: '18px 20px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' } },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12 } },
          BackBtn(),
          React.createElement('div', null,
            React.createElement('div', { style: { fontSize: 9, letterSpacing: 3, color: t.mossLight, textTransform: 'uppercase' } }, "Today's"),
            React.createElement('div', { style: { fontSize: 22, fontWeight: 700, color: t.text, lineHeight: 1 } }, 'Seedling')
          )
        ),
        ThemeBtn()
      ),
      // Main seedling card
      React.createElement('div', { style: { margin: '0 16px' } },
        React.createElement('div', {
          onClick: () => setRevealed(!revealed),
          style: {
            background: revealed ? `linear-gradient(135deg,${t.card},${t.moss}38)` : `linear-gradient(135deg,${t.card},${t.aubergine}28)`,
            borderRadius: 24, padding: '22px 20px', cursor: 'pointer',
            border: `1px solid ${revealed ? t.moss + '70' : t.border}`, transition: 'all 0.3s', position: 'relative', overflow: 'hidden',
          }
        },
          React.createElement('div', { style: { position: 'absolute', right: -5, top: -5, fontSize: 100, opacity: 0.07, pointerEvents: 'none' } }, todaySeedling.visual),
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 } },
            React.createElement('div', { style: { background: t.moss + '30', border: `1px solid ${t.moss}55`, borderRadius: 12, padding: '3px 10px', fontSize: 8, color: t.mossLight, letterSpacing: 1.5, textTransform: 'uppercase' } }, todaySeedling.category),
            React.createElement('div', { style: { fontSize: 7, color: t.textMuted, letterSpacing: 1.2 } }, revealed ? '▲ HIDE' : '▼ REVEAL')
          ),
          React.createElement('div', { style: { fontSize: 32, marginBottom: 8 } }, todaySeedling.visual),
          React.createElement('div', { style: { fontSize: 22, fontWeight: 700, color: t.text, lineHeight: 1.2, marginBottom: 7 } }, todaySeedling.title),
          React.createElement('div', { style: { fontSize: 11, color: t.textSub, fontStyle: 'italic', lineHeight: 1.5 } }, todaySeedling.teaser),
          revealed && React.createElement('div', { style: { marginTop: 14, fontSize: 13, color: t.text, lineHeight: 1.75, borderTop: `1px solid ${t.border}`, paddingTop: 14 } }, todaySeedling.fact),
          revealed && React.createElement('div', { style: { marginTop: 16, display: 'flex', gap: 8 } },
            React.createElement('button', {
              onClick: e => e.stopPropagation(),
              style: { flex: 1, background: `linear-gradient(90deg,${t.moss},${t.mossLight})`, border: 'none', borderRadius: 14, padding: '11px 0', color: '#FFF', fontFamily: "'Playfair Display', serif", fontSize: 12, fontWeight: 600, cursor: 'pointer' }
            }, '🌱  Add to Bloom'),
            React.createElement('button', {
              onClick: e => e.stopPropagation(),
              style: { background: 'transparent', border: `1px solid ${t.border}`, borderRadius: 14, padding: '11px 16px', color: t.textSub, fontFamily: "'Playfair Display', serif", fontSize: 11, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5 }
            }, React.createElement(window.lucide.Share2, { size: 12, color: t.textSub }), React.createElement('span', null, 'Share'))
          )
        )
      ),
      // Streak & progress
      React.createElement('div', { style: { margin: '14px 16px 0', display: 'flex', gap: 8 } },
        React.createElement('div', { style: { flex: 3, background: t.surface, borderRadius: 16, padding: '12px 14px', border: `1px solid ${t.border}` } },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 } },
            React.createElement('span', { style: { fontSize: 9, color: t.textMuted, letterSpacing: 1.5, textTransform: 'uppercase' } }, 'Streak'),
            React.createElement('span', { style: { fontSize: 20, fontWeight: 700, color: t.fuchsia } }, '12')
          ),
          React.createElement('div', { style: { display: 'flex', gap: 3, marginBottom: 4 } },
            ...Array.from({length: 7}).map((_, i) =>
              React.createElement('div', { key: i, style: { flex: 1, height: 6, borderRadius: 3, background: i < 5 ? (i === 4 ? t.fuchsia : t.moss) : t.border } })
            )
          ),
          React.createElement('div', { style: { fontSize: 7, color: t.textMuted } }, 'Past 7 days')
        ),
        React.createElement('div', { style: { flex: 1, background: t.surface, borderRadius: 16, padding: '12px 14px', border: `1px solid ${t.border}`, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' } },
          React.createElement('div', { style: { fontSize: 8, color: t.textMuted, letterSpacing: 1, textTransform: 'uppercase' } }, 'Today'),
          React.createElement('div', { style: { fontSize: 26, fontWeight: 700, color: t.ochre } }, '1/2'),
          React.createElement('div', { style: { fontSize: 7, color: t.textMuted } }, 'done')
        )
      ),
      // Previous seedlings
      React.createElement('div', { style: { padding: '12px 16px 4px' } },
        React.createElement('div', { style: { fontSize: 9, letterSpacing: 2.5, color: t.textMuted, textTransform: 'uppercase' } }, 'Recent Seedlings')
      ),
      React.createElement('div', { style: { flex: 1, overflow: 'auto', padding: '4px 16px 20px', display: 'flex', flexDirection: 'column', gap: 6 } },
        ...seedlings.slice(1).map(s =>
          React.createElement('div', { key: s.id, style: { background: t.surface, borderRadius: 14, padding: '12px 14px', border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', gap: 12, opacity: s.completed ? 1 : 0.6 } },
            React.createElement('div', { style: { fontSize: 24 } }, s.visual),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', { style: { fontSize: 12, fontWeight: 600, color: t.text, marginBottom: 2 } }, s.title),
              React.createElement('div', { style: { fontSize: 8, color: t.textMuted, fontStyle: 'italic' } }, s.teaser)
            ),
            React.createElement('div', { style: { width: 24, height: 24, borderRadius: 12, background: s.completed ? t.moss + '40' : t.border, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: s.completed ? t.mossLight : t.textMuted, flexShrink: 0 } },
              s.completed ? '✓' : '○'
            )
          )
        )
      )
    );
  };

  // ── SCREEN: Archive ────────────────────────────────────────────────
  const ArchiveScreen = () => {
    const [activeCat, setActiveCat] = useState('all');
    const [expandedId, setExpandedId] = useState(null);
    const cats = ['all', 'mysteries', 'science', 'history', 'nature', 'art'];
    const filtered = activeCat === 'all' ? curios : curios.filter(c => c.category === activeCat);
    return React.createElement('div', { style: { height: 812, display: 'flex', flexDirection: 'column', background: t.bg } },
      React.createElement('div', { style: { padding: '18px 20px 10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' } },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12 } },
          BackBtn(),
          React.createElement('div', null,
            React.createElement('div', { style: { fontSize: 9, letterSpacing: 3, color: t.fuchsia, textTransform: 'uppercase' } }, 'Curio'),
            React.createElement('div', { style: { fontSize: 22, fontWeight: 700, color: t.text, lineHeight: 1 } }, 'Archives')
          )
        ),
        ThemeBtn()
      ),
      // Category filters
      React.createElement('div', { style: { padding: '0 16px 10px', display: 'flex', gap: 6, overflowX: 'auto', scrollbarWidth: 'none' } },
        ...cats.map(cat =>
          React.createElement('button', { key: cat, onClick: () => setActiveCat(cat), style: { background: activeCat === cat ? t.fuchsia : t.surface, border: `1px solid ${activeCat === cat ? t.fuchsia : t.border}`, borderRadius: 16, padding: '5px 13px', color: activeCat === cat ? '#FFF' : t.textSub, fontFamily: "'Playfair Display', serif", fontSize: 9, cursor: 'pointer', letterSpacing: 0.8, textTransform: 'capitalize', flexShrink: 0, transition: 'all 0.15s' } }, cat)
        )
      ),
      // Asymmetric two-column masonry grid
      React.createElement('div', { style: { flex: 1, overflow: 'auto', padding: '0 16px 20px' } },
        React.createElement('div', { style: { columns: 2, columnGap: 8 } },
          ...filtered.map((curio, i) => {
            const isExp = expandedId === curio.id;
            const isBig = i === 0 || curio.rarity === 'legendary';
            const borderColor = curio.rarity === 'legendary' ? t.ochre + '60' : curio.rarity === 'rare' ? t.aubergineLight + '50' : t.border;
            const bgColor = curio.rarity === 'legendary' ? `linear-gradient(135deg,${t.card},${t.ochre}22)` : curio.rarity === 'rare' ? `linear-gradient(135deg,${t.card},${t.aubergine}22)` : t.card;
            return React.createElement('div', {
              key: curio.id, onClick: () => curio.unlocked && setExpandedId(isExp ? null : curio.id),
              style: { breakInside: 'avoid', marginBottom: 8, background: curio.unlocked ? bgColor : t.surface, borderRadius: 14, padding: isBig ? 14 : 12, border: `1px solid ${borderColor}`, cursor: curio.unlocked ? 'pointer' : 'default', opacity: curio.unlocked ? 1 : 0.5, transition: 'all 0.18s' }
            },
              React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 } },
                React.createElement('div', { style: { fontSize: isBig ? 26 : 22 } }, curio.visual),
                curio.unlocked && RarityBadge({ rarity: curio.rarity })
              ),
              React.createElement('div', { style: { fontSize: isBig ? 12 : 10, fontWeight: 700, color: t.text, lineHeight: 1.3, marginBottom: 4 } }, curio.name),
              !curio.unlocked && React.createElement('div', { style: { fontSize: 8, color: t.textMuted, display: 'flex', alignItems: 'center', gap: 4 } },
                React.createElement(window.lucide.Lock, { size: 9, color: t.textMuted }),
                React.createElement('span', null, 'Complete an expedition')
              ),
              curio.unlocked && React.createElement('div', { style: { fontSize: 9, color: t.textSub, lineHeight: 1.5 } }, isExp ? curio.desc : curio.desc.slice(0, 55) + '…'),
              curio.unlocked && isExp && React.createElement('div', { style: { marginTop: 8, display: 'flex', gap: 3, flexWrap: 'wrap' } },
                ...curio.tags.map(tag => React.createElement('span', { key: tag, style: { background: t.moss + '22', border: `1px solid ${t.moss}44`, borderRadius: 8, padding: '2px 7px', fontSize: 7, color: t.mossLight, letterSpacing: 0.5 } }, '#' + tag))
              )
            );
          })
        )
      )
    );
  };

  // ── SCREEN: Profile ────────────────────────────────────────────────
  const ProfileScreen = () => {
    const tiers = [
      { name: 'Spore',     level: 1, pts: '0–50',     color: t.textMuted,       unlocked: true,  current: false, perks: ['Access to Daily Seedlings'] },
      { name: 'Seedling',  level: 2, pts: '51–150',   color: t.mossLight,       unlocked: true,  current: false, perks: ['First Expedition unlocked', 'Basic Bloom customization'] },
      { name: 'Keeper',    level: 3, pts: '151–500',  color: t.moss,            unlocked: true,  current: true,  perks: ['Legendary Curio eligibility', 'Terrarium Weaving', '2 active Expeditions'] },
      { name: 'Cultivar',  level: 4, pts: '501–1200', color: t.ochre,           unlocked: false, current: false, perks: ['Rare species unlocks', 'Advanced Bloom animations', 'Expedition co-creation'] },
      { name: 'Arborist',  level: 5, pts: '1201–3000',color: t.aubergineLight,  unlocked: false, current: false, perks: ['All expedition categories', 'Custom Curio naming', 'Bloom sharing & exhibition'] },
      { name: 'Luminarch', level: 6, pts: '3001+',    color: t.fuchsia,         unlocked: false, current: false, perks: ['All features unlocked', 'Legendary garden skins', 'Community Curation rights'] },
    ];
    return React.createElement('div', { style: { height: 812, display: 'flex', flexDirection: 'column', background: t.bg, overflow: 'hidden' } },
      React.createElement('div', { style: { padding: '18px 20px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' } },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12 } },
          BackBtn(),
          React.createElement('div', null,
            React.createElement('div', { style: { fontSize: 9, letterSpacing: 3, color: t.moss, textTransform: 'uppercase' } }, 'Arborist'),
            React.createElement('div', { style: { fontSize: 22, fontWeight: 700, color: t.text, lineHeight: 1 } }, 'Tiers')
          )
        ),
        ThemeBtn()
      ),
      // Current status card
      React.createElement('div', { style: { margin: '0 16px 12px', background: `linear-gradient(135deg,${t.card},${t.moss}28)`, borderRadius: 22, padding: 18, border: `1px solid ${t.moss}50` } },
        React.createElement('div', { style: { display: 'flex', gap: 14, alignItems: 'center', marginBottom: 14 } },
          React.createElement('div', { style: { width: 62, height: 62, borderRadius: 31, background: `radial-gradient(circle,${t.moss}70,${t.aubergine}50)`, border: `2px solid ${t.moss}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, flexShrink: 0 } }, '🌿'),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', { style: { fontSize: 20, fontWeight: 700, color: t.text, marginBottom: 2 } }, 'Keeper II'),
            React.createElement('div', { style: { fontSize: 9, color: t.textSub, marginBottom: 8, fontStyle: 'italic' } }, '420 curiosity points · 7 Curios collected'),
            React.createElement('div', { style: { fontSize: 8, color: t.textMuted, marginBottom: 4 } }, 'Progress to Cultivar III: 80 / 500 pts'),
            React.createElement('div', { style: { background: t.border, borderRadius: 4, height: 6, overflow: 'hidden' } },
              React.createElement('div', { style: { background: `linear-gradient(90deg,${t.moss},${t.ochre})`, width: '16%', height: '100%', borderRadius: 4 } })
            )
          )
        ),
        React.createElement('div', { style: { display: 'flex', gap: 7 } },
          ...[{v:'7',l:'Curios'},{v:'12',l:'Streak'},{v:'1',l:'Expedition'},{v:'420',l:'Points'}].map((s,i) =>
            React.createElement('div', { key: i, style: { flex: 1, textAlign: 'center', background: t.surface + '88', borderRadius: 10, padding: '7px 0', border: `1px solid ${t.border}` } },
              React.createElement('div', { style: { fontSize: 15, fontWeight: 700, color: t.ochre } }, s.v),
              React.createElement('div', { style: { fontSize: 7, color: t.textMuted, letterSpacing: 1, textTransform: 'uppercase' } }, s.l)
            )
          )
        )
      ),
      // Tiers list
      React.createElement('div', { style: { flex: 1, overflow: 'auto', padding: '0 16px 20px' } },
        React.createElement('div', { style: { fontSize: 9, color: t.textMuted, letterSpacing: 2.5, textTransform: 'uppercase', marginBottom: 10 } }, 'Tier Progression'),
        ...tiers.map((tier, i) =>
          React.createElement('div', { key: i, style: { display: 'flex', gap: 12, alignItems: 'flex-start', padding: '12px 14px', marginBottom: 6, background: tier.current ? `linear-gradient(135deg,${t.card},${t.moss}28)` : t.surface, borderRadius: 14, border: `1px solid ${tier.current ? t.moss + '70' : tier.unlocked ? t.border : t.border + '44'}`, opacity: tier.unlocked ? 1 : 0.5 } },
            // Tier circle + connector
            React.createElement('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, flexShrink: 0 } },
              React.createElement('div', { style: { width: 36, height: 36, borderRadius: 18, background: tier.unlocked ? tier.color + '30' : t.border + '30', border: `2px solid ${tier.unlocked ? tier.color : t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, color: tier.unlocked ? tier.color : t.textMuted, fontWeight: 700 } },
                tier.current ? '★' : tier.unlocked ? '✓' : tier.level
              ),
              i < tiers.length - 1 && React.createElement('div', { style: { width: 1, height: 10, background: t.border } })
            ),
            // Info
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 } },
                React.createElement('div', { style: { fontSize: 14, fontWeight: tier.current ? 700 : 600, color: tier.unlocked ? t.text : t.textMuted } }, tier.name),
                React.createElement('div', { style: { fontSize: 8, color: tier.color, letterSpacing: 1 } }, tier.pts + ' pts')
              ),
              ...tier.perks.map((perk, j) =>
                React.createElement('div', { key: j, style: { fontSize: 9, color: tier.unlocked ? t.textSub : t.textMuted, display: 'flex', alignItems: 'center', gap: 4, marginBottom: 2 } },
                  React.createElement('span', { style: { color: tier.unlocked ? tier.color : t.textMuted, fontSize: 7 } }, '◆'),
                  React.createElement('span', null, perk)
                )
              )
            )
          )
        )
      )
    );
  };

  // ── Render ─────────────────────────────────────────────────────────
  const screens = { home: HomeScreen, expeditions: ExpeditionsScreen, seedlings: SeedlingsScreen, archive: ArchiveScreen, profile: ProfileScreen };

  return React.createElement('div', {
    style: { minHeight: '100vh', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Playfair Display', serif" }
  },
    React.createElement('style', null, `
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&display=swap');
      * { box-sizing: border-box; margin: 0; padding: 0; }
      ::-webkit-scrollbar { display: none; }
    `),
    React.createElement('div', {
      style: {
        width: 375, height: 812, background: t.bg,
        borderRadius: 46, overflow: 'hidden', position: 'relative',
        boxShadow: '0 32px 80px rgba(0,0,0,0.38), 0 0 0 1px rgba(255,255,255,0.08)',
      }
    },
      React.createElement(screens[activeScreen])
    )
  );
}
