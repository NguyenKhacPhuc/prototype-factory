const { useState, useEffect, useRef } = React;

const GOOGLE_FONTS_STYLE = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800;900&family=Barlow:wght@300;400;500;600;700&display=swap');
`;

const ANIMATIONS = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes slideUp {
    from { opacity: 0; transform: translateY(22px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-7px); }
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.55; }
  }
  @keyframes growIn {
    from { transform: scale(0.4) rotate(-8deg); opacity: 0; }
    to { transform: scale(1) rotate(0deg); opacity: 1; }
  }
  @keyframes bloomGlow {
    0%, 100% { box-shadow: 0 0 8px rgba(34,197,94,0.3), 0 0 0 0 rgba(34,197,94,0.2); }
    50% { box-shadow: 0 0 20px rgba(34,197,94,0.6), 0 0 40px rgba(34,197,94,0.15); }
  }
  @keyframes shimmer {
    0% { background-position: -400px 0; }
    100% { background-position: 400px 0; }
  }
  @keyframes typing {
    0%, 60%, 100% { transform: translateY(0); }
    30% { transform: translateY(-5px); }
  }
  @keyframes orbFloat {
    0%, 100% { transform: translate(0,0) scale(1); }
    33% { transform: translate(4px,-6px) scale(1.1); }
    66% { transform: translate(-3px,3px) scale(0.95); }
  }
`;

const themes = {
  dark: {
    bg: '#1F2937',
    surface: '#111827',
    surfaceAlt: '#162032',
    card: '#2D3748',
    cardBorder: '#374151',
    text: '#F9FAFB',
    textSec: '#D1D5DB',
    textMuted: '#6B7280',
    border: '#374151',
    borderLight: '#4B5563',
    primary: '#F97316',
    primaryLight: '#FDBA74',
    primaryDark: '#EA580C',
    secondary: '#FB923C',
    cta: '#22C55E',
    ctaLight: '#4ADE80',
    ctaDark: '#16A34A',
    accent: '#818CF8',
    ocean: 'linear-gradient(180deg,#0C4A6E 0%,#0369A1 55%,#0EA5E9 100%)',
    islandGreen: 'linear-gradient(160deg,#14532D 0%,#166534 50%,#15803D 100%)',
    navBg: '#111827',
  },
  light: {
    bg: '#F0FDF4',
    surface: '#FFFFFF',
    surfaceAlt: '#ECFDF5',
    card: '#FFFFFF',
    cardBorder: '#D1FAE5',
    text: '#111827',
    textSec: '#374151',
    textMuted: '#9CA3AF',
    border: '#D1FAE5',
    borderLight: '#86EFAC',
    primary: '#F97316',
    primaryLight: '#FDBA74',
    primaryDark: '#EA580C',
    secondary: '#FB923C',
    cta: '#22C55E',
    ctaLight: '#4ADE80',
    ctaDark: '#16A34A',
    accent: '#6366F1',
    ocean: 'linear-gradient(180deg,#BAE6FD 0%,#7DD3FC 55%,#38BDF8 100%)',
    islandGreen: 'linear-gradient(160deg,#BBF7D0 0%,#86EFAC 50%,#4ADE80 100%)',
    navBg: '#FFFFFF',
  }
};

// ─── ISLAND CANVAS ────────────────────────────────────────────────────────────
function IslandCanvas({ t, compact }) {
  const floraList = compact ? [
    { l:'30%', b:'54%', w:10, h:16, c:'#4ADE80', d:'0s' },
    { l:'46%', b:'62%', w:14, h:22, c:'#22C55E', d:'0.2s' },
    { l:'62%', b:'56%', w:10, h:15, c:'#16A34A', d:'0.4s' },
  ] : [
    { l:'22%', b:'50%', w:9,  h:14, c:'#4ADE80', d:'0s' },
    { l:'32%', b:'58%', w:13, h:20, c:'#22C55E', d:'0.15s' },
    { l:'44%', b:'64%', w:18, h:28, c:'#16A34A', d:'0.05s' },
    { l:'55%', b:'61%', w:14, h:22, c:'#4ADE80', d:'0.3s' },
    { l:'66%', b:'53%', w:10, h:16, c:'#22C55E', d:'0.5s' },
    { l:'75%', b:'47%', w:8,  h:12, c:'#15803D', d:'0.7s' },
    { l:'35%', b:'43%', w:7,  h:11, c:'#FB923C', d:'0.4s' },
    { l:'60%', b:'44%', w:7,  h:11, c:'#F97316', d:'0.6s' },
    { l:'25%', b:'44%', w:6,  h:10, c:'#4ADE80', d:'0.8s' },
  ];

  return (
    <div style={{ width:'100%', height:'100%', background: t.ocean, borderRadius:16, position:'relative', overflow:'hidden' }}>
      {/* Sky depth */}
      <div style={{ position:'absolute', top:0, left:0, right:0, height:'50%', background:'linear-gradient(180deg,rgba(0,0,0,0.2) 0%,transparent 100%)' }} />

      {/* Sun */}
      <div style={{ position:'absolute', top:18, right:28, width:38, height:38, borderRadius:'50%',
        background:'radial-gradient(circle,#FDE68A 0%,#F59E0B 60%,transparent 100%)',
        boxShadow:'0 0 20px #F59E0BAA', animation:'pulse 3s ease-in-out infinite' }} />

      {/* Clouds */}
      <div style={{ position:'absolute', top:22, left:18, display:'flex' }}>
        {[22,32,20].map((w,i) => (
          <div key={i} style={{ width:w, height:12, borderRadius:'50%', background:'rgba(255,255,255,0.65)', marginLeft: i>0 ? -9 : 0 }} />
        ))}
      </div>

      {/* Ocean shimmer */}
      <div style={{ position:'absolute', bottom:0, left:0, right:0, height:'38%', background:'linear-gradient(180deg,transparent 0%,rgba(0,40,80,0.45) 100%)' }} />

      {/* Island base */}
      <div style={{ position:'absolute', bottom:14, left:'50%', transform:'translateX(-50%)',
        width:'76%', height: compact ? '52%' : '58%',
        borderRadius:'50% 50% 35% 35% / 65% 65% 35% 35%',
        background: t.islandGreen, boxShadow:'0 10px 28px rgba(0,0,0,0.35)', position:'absolute', bottom:14, left:'50%', transform:'translateX(-50%)' }}>

        {/* Sandy shore ring */}
        <div style={{ position:'absolute', bottom:-5, left:-10, right:-10, height:18,
          borderRadius:'0 0 35% 35%', background:'linear-gradient(180deg,#92400E 0%,#B45309 100%)' }} />

        {/* Mountain */}
        {!compact && <>
          <div style={{ position:'absolute', top:8, left:'50%', transform:'translateX(-50%)',
            width:0, height:0, borderLeft:'20px solid transparent', borderRight:'20px solid transparent',
            borderBottom:'36px solid #374151', filter:'drop-shadow(0 4px 10px rgba(0,0,0,0.4))' }} />
          <div style={{ position:'absolute', top:10, left:'50%', transform:'translateX(-50%)',
            width:0, height:0, borderLeft:'8px solid transparent', borderRight:'8px solid transparent',
            borderBottom:'13px solid rgba(255,255,255,0.85)' }} />
        </>}

        {/* Flora */}
        {floraList.map((f,i) => (
          <div key={i} style={{ position:'absolute', left:f.l, bottom:f.b, width:f.w, height:f.h,
            borderRadius:'50% 50% 30% 30%', background:f.c,
            animation:`float ${2+i*0.25}s ease-in-out infinite`, animationDelay:f.d }} />
        ))}

        {/* Glow creature orbs */}
        {[
          { l:'28%', b:'32%', c:'#818CF8' },
          { l:'68%', b:'35%', c:'#22C55E' },
        ].map((o,i) => (
          <div key={i} style={{ position:'absolute', left:o.l, bottom:o.b, width:8, height:8,
            borderRadius:'50%', background:o.c, boxShadow:`0 0 8px ${o.c}`,
            animation:`orbFloat ${2.5+i*0.8}s ease-in-out infinite` }} />
        ))}
      </div>

      {/* Floating eco-energy particles */}
      {[{l:'18%',t:'35%',d:'0s'},{l:'50%',t:'25%',d:'0.6s'},{l:'78%',t:'40%',d:'1.1s'}].map((p,i) => (
        <div key={i} style={{ position:'absolute', left:p.l, top:p.t, width:5, height:5,
          borderRadius:'50%', background:'#22C55E', boxShadow:'0 0 8px #22C55E',
          animation:`float ${1.8+i*0.5}s ease-in-out infinite`, animationDelay:p.d }} />
      ))}
    </div>
  );
}

// ─── HOME SCREEN ──────────────────────────────────────────────────────────────
function HomeScreen({ t, theme, setTheme, setActiveScreen, ecoEnergy, stats }) {
  const [completed, setCompleted] = useState([0]);
  const [newSpecies, setNewSpecies] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setNewSpecies(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  const challenges = [
    { title:'Morning Hydration', desc:'Drink 500ml water upon waking', nrg:15, icon:'Droplets', time:'7:00 AM' },
    { title:'Midday Stretch',    desc:'5-min desk stretching routine', nrg:10, icon:'Wind',     time:'12:30 PM' },
    { title:'Evening Walk',      desc:'20 min mindful outdoor walk',   nrg:20, icon:'Leaf',     time:'6:00 PM' },
    { title:'Sleep Ritual',      desc:'Wind down by 10pm tonight',     nrg:25, icon:'Moon',     time:'10:00 PM' },
  ];

  return (
    <div style={{ height:'100%', overflowY:'auto', background:t.bg, fontFamily:'Barlow, sans-serif' }}>
      {/* Header */}
      <div style={{ padding:'20px 20px 0', display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
        <div>
          <div style={{ fontFamily:'Barlow Condensed, sans-serif', fontSize:28, fontWeight:900, color:t.text, letterSpacing:1.5, lineHeight:1 }}>BIOBLOOM</div>
          <div style={{ fontSize:12, color:t.textMuted, marginTop:3 }}>Day 47 · Lush Forest Stage</div>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
          <div style={{ background:`${t.cta}22`, borderRadius:20, padding:'5px 12px', display:'flex', alignItems:'center', gap:5, border:`1px solid ${t.cta}44` }}>
            {React.createElement(window.lucide?.Zap||'span', { size:13, color:t.cta })}
            <span style={{ fontFamily:'Barlow Condensed, sans-serif', fontSize:14, fontWeight:800, color:t.cta }}>{ecoEnergy}</span>
          </div>
          <button onClick={() => setTheme(theme==='dark'?'light':'dark')}
            style={{ width:38, height:38, borderRadius:19, background:t.card, border:`1px solid ${t.border}`, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}>
            {theme==='dark'
              ? React.createElement(window.lucide?.Sun||'span',  { size:16, color:t.secondary })
              : React.createElement(window.lucide?.Moon||'span', { size:16, color:t.primary })}
          </button>
        </div>
      </div>

      {/* New species toast */}
      {newSpecies && (
        <div style={{ margin:'12px 20px 0', background:`linear-gradient(135deg,${t.ctaDark}33,${t.cta}22)`,
          border:`1px solid ${t.cta}55`, borderRadius:14, padding:'10px 14px',
          display:'flex', alignItems:'center', gap:10, animation:'slideUp 0.4s ease' }}>
          {React.createElement(window.lucide?.Sparkles||'span', { size:16, color:t.ctaLight })}
          <div style={{ flex:1 }}>
            <span style={{ fontSize:12, fontWeight:700, color:t.ctaLight }}>New Species Discovered! </span>
            <span style={{ fontSize:12, color:t.textSec }}>Crystal Bloom added to your island</span>
          </div>
          <button onClick={() => setNewSpecies(false)} style={{ background:'none', border:'none', color:t.textMuted, cursor:'pointer', padding:2 }}>
            {React.createElement(window.lucide?.X||'span', { size:14, color:t.textMuted })}
          </button>
        </div>
      )}

      {/* Island Preview */}
      <div style={{ padding:'14px 20px 12px', animation:'slideUp 0.4s ease' }}>
        <div onClick={() => setActiveScreen('island')}
          style={{ height:182, borderRadius:22, overflow:'hidden', cursor:'pointer', position:'relative',
            boxShadow:`0 10px 36px rgba(0,0,0,0.28), 0 0 0 1px ${t.border}`,
            transition:'transform 0.2s ease' }}>
          <IslandCanvas t={t} compact={false} />
          <div style={{ position:'absolute', bottom:0, left:0, right:0,
            background:'linear-gradient(transparent,rgba(0,0,0,0.72))', padding:'24px 16px 14px',
            display:'flex', justifyContent:'space-between', alignItems:'flex-end' }}>
            <div>
              <div style={{ fontFamily:'Barlow Condensed, sans-serif', fontSize:17, fontWeight:800, color:'#fff', letterSpacing:0.8 }}>TERRAFLORA ISLE</div>
              <div style={{ fontSize:11, color:'rgba(255,255,255,0.7)', marginTop:1 }}>23 species · 4 biomes unlocked</div>
            </div>
            <div style={{ display:'flex', alignItems:'center', gap:5, background:'rgba(255,255,255,0.15)', borderRadius:9, padding:'5px 10px',
              backdropFilter:'blur(6px)', border:'1px solid rgba(255,255,255,0.2)' }}>
              {React.createElement(window.lucide?.ChevronRight||'span', { size:13, color:'#fff' })}
              <span style={{ fontSize:11, color:'#fff', fontWeight:600 }}>Explore</span>
            </div>
          </div>
        </div>
      </div>

      {/* Eco-Energy Bar */}
      <div style={{ padding:'0 20px 14px' }}>
        <div style={{ background:t.card, borderRadius:18, padding:'14px 16px', border:`1px solid ${t.border}` }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:9 }}>
            <div style={{ display:'flex', alignItems:'center', gap:7 }}>
              {React.createElement(window.lucide?.Zap||'span', { size:14, color:t.primary })}
              <span style={{ fontFamily:'Barlow Condensed, sans-serif', fontSize:13, fontWeight:700, color:t.textMuted, letterSpacing:0.8 }}>ECO-ENERGY</span>
            </div>
            <span style={{ fontFamily:'Barlow Condensed, sans-serif', fontSize:19, fontWeight:900, color:t.primary }}>{ecoEnergy}/100</span>
          </div>
          <div style={{ background:t.bg, borderRadius:8, height:9, overflow:'hidden' }}>
            <div style={{ width:`${ecoEnergy}%`, height:'100%',
              background:`linear-gradient(90deg,${t.ctaDark},${t.cta},${t.ctaLight})`,
              borderRadius:8, boxShadow:`0 0 10px ${t.cta}99`,
              animation:'bloomGlow 2.5s ease-in-out infinite' }} />
          </div>
          <div style={{ marginTop:7, fontSize:11, color:t.textMuted }}>
            +12 more to unlock <span style={{ color:t.ctaLight, fontWeight:700 }}>Crystal Cave Biome ✦</span>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div style={{ padding:'0 20px 16px', display:'flex', gap:10 }}>
        {stats.map((s,i) => (
          <div key={i} style={{ flex:1, textAlign:'center', background:t.card, borderRadius:16,
            padding:'11px 6px', border:`1px solid ${t.border}` }}>
            <div style={{ fontFamily:'Barlow Condensed, sans-serif', fontSize:26, fontWeight:900, color:[t.primary,t.cta,t.secondary][i] }}>{s.value}</div>
            <div style={{ fontSize:10, color:t.textMuted, marginTop:1 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Challenges */}
      <div style={{ padding:'0 20px 24px' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:13 }}>
          <span style={{ fontFamily:'Barlow Condensed, sans-serif', fontSize:15, fontWeight:800, color:t.text, letterSpacing:0.8 }}>TODAY'S BLOOM CHALLENGES</span>
          <span style={{ fontSize:11, color:t.primary, fontWeight:600 }}>{completed.length}/4 done</span>
        </div>
        {challenges.map((ch,i) => {
          const Icon = window.lucide?.[ch.icon];
          const done = completed.includes(i);
          return (
            <div key={i} onClick={() => !done && setCompleted(p=>[...p,i])}
              style={{ background: done ? `linear-gradient(135deg,${t.ctaDark}1F,${t.cta}0F)` : t.card,
                borderRadius:15, padding:'13px 14px', marginBottom:9,
                display:'flex', alignItems:'center', gap:12, cursor: done ? 'default' : 'pointer',
                border:`1px solid ${done ? t.cta+'55' : t.border}`,
                transition:'all 0.2s ease',
                boxShadow: done ? `0 5px 14px ${t.cta}22` : `0 2px 8px rgba(0,0,0,0.1)` }}>
              <div style={{ width:40, height:40, borderRadius:12, flexShrink:0,
                background: done ? t.cta : `${t.primary}22`,
                display:'flex', alignItems:'center', justifyContent:'center' }}>
                {done
                  ? React.createElement(window.lucide?.Check||'span', { size:20, color:'#fff' })
                  : (Icon ? React.createElement(Icon, { size:19, color:t.primary }) : null)}
              </div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:13, fontWeight:700, color: done ? t.cta : t.text }}>{ch.title}</div>
                <div style={{ fontSize:11, color:t.textMuted, marginTop:2 }}>{ch.desc}</div>
              </div>
              <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-end', gap:3 }}>
                <div style={{ display:'flex', alignItems:'center', gap:4 }}>
                  {React.createElement(window.lucide?.Zap||'span', { size:11, color:t.primary })}
                  <span style={{ fontFamily:'Barlow Condensed, sans-serif', fontSize:14, fontWeight:800, color:t.primary }}>+{ch.nrg}</span>
                </div>
                <span style={{ fontSize:10, color:t.textMuted }}>{ch.time}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── ISLAND SCREEN ────────────────────────────────────────────────────────────
function IslandScreen({ t }) {
  const [tab, setTab] = useState('biomes');
  const [selected, setSelected] = useState(null);

  const biomes = [
    { name:'Coastal Meadow',  status:'active', prog:100, color:t.cta,   icon:'Leaf',    desc:'Lush grasses and wildflowers line the shore' },
    { name:'Mystic Forest',   status:'active', prog:100, color:'#4ADE80',icon:'Leaf',    desc:'Ancient trees draped in luminous moss' },
    { name:'Ember Highlands', status:'active', prog:100, color:t.primary,icon:'Mountain',desc:'Volcanic ridges with heat-hardy botanics' },
    { name:'Crystal Cave',    status:'locked', prog:88,  color:t.accent, icon:'Gem',     desc:'Bioluminescent minerals, 12 energy away' },
    { name:'Starfall Peaks',  status:'locked', prog:0,   color:t.textMuted,icon:'Star',  desc:'Locked — complete Crystal Cave first' },
  ];

  const collectibles = [
    { name:'Luminos Fern',  rarity:'Common',    biome:'Meadow',    unlocked:true,  color:'#4ADE80', icon:'Leaf' },
    { name:'Crystal Bloom', rarity:'Rare',      biome:'Cave',      unlocked:true,  color:t.accent,  icon:'Gem' },
    { name:'Ember Orchid',  rarity:'Rare',      biome:'Highlands', unlocked:true,  color:t.primary, icon:'Flower2' },
    { name:'Glow Mushroom', rarity:'Common',    biome:'Forest',    unlocked:true,  color:'#34D399', icon:'Sprout' },
    { name:'Aurora Vine',   rarity:'Epic',      biome:'Peaks',     unlocked:false, color:'#A78BFA', icon:'Sparkles' },
    { name:'Tide Spirit',   rarity:'Legendary', biome:'Coastal',   unlocked:false, color:'#F59E0B', icon:'Droplets' },
  ];

  const rarityColor = { Common:'#9CA3AF', Rare:t.accent, Epic:'#A78BFA', Legendary:'#F59E0B' };

  return (
    <div style={{ height:'100%', overflowY:'auto', background:t.bg, fontFamily:'Barlow, sans-serif' }}>
      <div style={{ padding:'20px 20px 14px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <div>
          <div style={{ fontFamily:'Barlow Condensed, sans-serif', fontSize:26, fontWeight:900, color:t.text, letterSpacing:1.2 }}>TERRAFLORA ISLE</div>
          <div style={{ fontSize:12, color:t.textMuted, marginTop:2 }}>Your evolving biome world</div>
        </div>
        <div style={{ background:`${t.primary}22`, borderRadius:12, padding:'6px 14px', border:`1px solid ${t.primary}44` }}>
          <span style={{ fontFamily:'Barlow Condensed, sans-serif', fontSize:14, fontWeight:800, color:t.primary }}>LVL 12</span>
        </div>
      </div>

      {/* Island */}
      <div style={{ padding:'0 20px 16px' }}>
        <div style={{ height:200, borderRadius:22, overflow:'hidden', boxShadow:`0 10px 28px rgba(0,0,0,0.22)` }}>
          <IslandCanvas t={t} compact={false} />
        </div>
      </div>

      {/* Tabs */}
      <div style={{ padding:'0 20px 16px', display:'flex', gap:10 }}>
        {['biomes','collectibles'].map(tb => (
          <button key={tb} onClick={() => setTab(tb)} style={{
            flex:1, padding:'10px 0', borderRadius:13,
            border:`1px solid ${tab===tb ? t.primary : t.border}`,
            background: tab===tb ? `${t.primary}22` : t.card,
            color: tab===tb ? t.primary : t.textMuted,
            fontFamily:'Barlow Condensed, sans-serif', fontSize:13, fontWeight:800,
            letterSpacing:0.8, cursor:'pointer', transition:'all 0.2s ease', textTransform:'uppercase' }}>
            <span>{tb}</span>
          </button>
        ))}
      </div>

      <div style={{ padding:'0 20px 24px' }}>
        {tab === 'biomes' && biomes.map((b,i) => {
          const Icon = window.lucide?.[b.icon];
          const isActive = b.status === 'active';
          return (
            <div key={i} style={{ background:t.card, borderRadius:16, padding:'14px', marginBottom:10,
              border:`1px solid ${isActive ? b.color+'44' : t.border}`,
              opacity: b.prog === 0 ? 0.5 : 1 }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom: !isActive && b.prog>0 ? 10 : 0 }}>
                <div style={{ display:'flex', alignItems:'center', gap:11 }}>
                  <div style={{ width:40, height:40, borderRadius:12,
                    background: isActive ? `${b.color}22` : t.bg,
                    display:'flex', alignItems:'center', justifyContent:'center' }}>
                    {Icon && React.createElement(Icon, { size:19, color: isActive ? b.color : t.textMuted })}
                  </div>
                  <div>
                    <div style={{ fontSize:14, fontWeight:700, color: isActive ? t.text : t.textMuted }}>{b.name}</div>
                    <div style={{ fontSize:11, color:t.textMuted, marginTop:2 }}>{b.desc}</div>
                  </div>
                </div>
                {isActive
                  ? React.createElement(window.lucide?.CheckCircle||'span', { size:19, color:b.color })
                  : React.createElement(window.lucide?.Lock||'span',        { size:17, color:t.textMuted })}
              </div>
              {!isActive && b.prog > 0 && (
                <div style={{ background:t.bg, borderRadius:6, height:6, overflow:'hidden' }}>
                  <div style={{ width:`${b.prog}%`, height:'100%',
                    background:`linear-gradient(90deg,${b.color},${b.color}88)`, borderRadius:6 }} />
                </div>
              )}
            </div>
          );
        })}

        {tab === 'collectibles' && (
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
            {collectibles.map((c,i) => {
              const Icon = window.lucide?.[c.icon];
              const sel = selected === i;
              return (
                <div key={i} onClick={() => setSelected(sel ? null : i)}
                  style={{ background: c.unlocked ? t.card : t.bg,
                    borderRadius:18, padding:'16px 12px', cursor:'pointer',
                    border:`1px solid ${sel ? c.color : c.unlocked ? t.borderLight : t.border}`,
                    opacity: c.unlocked ? 1 : 0.6,
                    filter: c.unlocked ? 'none' : 'grayscale(55%)',
                    animation: c.unlocked ? `growIn 0.45s ease ${i*0.08}s both` : 'none',
                    transition:'all 0.2s ease',
                    boxShadow: sel ? `0 6px 20px ${c.color}55` : `0 2px 8px rgba(0,0,0,0.1)` }}>
                  <div style={{ width:46, height:46, borderRadius:14,
                    background:`${c.color}22`, display:'flex', alignItems:'center', justifyContent:'center',
                    marginBottom:10, boxShadow: c.unlocked ? `0 0 14px ${c.color}44` : 'none' }}>
                    {c.unlocked
                      ? (Icon ? React.createElement(Icon, { size:23, color:c.color }) : null)
                      : React.createElement(window.lucide?.Lock||'span', { size:18, color:t.textMuted })}
                  </div>
                  <div style={{ fontSize:12, fontWeight:700, color: c.unlocked ? t.text : t.textMuted }}>{c.name}</div>
                  <div style={{ fontSize:10, color: rarityColor[c.rarity] || c.color, marginTop:2, fontWeight:600 }}>{c.rarity}</div>
                  <div style={{ fontSize:10, color:t.textMuted }}>{c.biome}</div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── CHAT SCREEN ──────────────────────────────────────────────────────────────
function ChatScreen({ t }) {
  const [messages, setMessages] = useState([
    { from:'spirit', text:"Welcome back, Bloom Keeper! Your island feels vibrant today. You've already completed morning hydration — Terraflora Isle is grateful for your care.", time:'9:01 AM' },
    { from:'user',   text:"Thanks! What should I focus on next?", time:'9:03 AM' },
    { from:'spirit', text:"Crystal Cave is just 12 eco-energy away from unlocking! Your midday stretch challenge earns +10 and takes only 5 minutes. It also triggers a rare Prism Lichen discovery. Shall we set a reminder for 12:30 PM?", time:'9:03 AM' },
    { from:'user',   text:"Yes, let's do it!", time:'9:04 AM' },
    { from:'spirit', text:"That's the spirit! ✨ Reminder set. While you wait, your Ember Orchids are asking for sunlight — step outside for 2 minutes before your next meeting. Small acts, big blooms.", time:'9:04 AM' },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const endRef = useRef(null);

  const spiritReplies = [
    "Great question! Your BioBloom is radiating positive energy today. Keep up your evening walk and you'll unlock a new rare species by tomorrow! 🌿",
    "Your island has grown 12% this week — that's remarkable! The Crystal Cave biome senses your dedication and is nearly ready to open its gates.",
    "I detect a pattern: your best bloom days are when you hydrate early AND stretch midday. Together they give your flora an energy bonus of +15!",
    "You're on a 47-day streak — that's extraordinary! Your island's biodiversity is in the top 8% of all BioBloom explorers. Keep thriving!",
  ];
  const [replyIdx, setReplyIdx] = useState(0);

  const quickReplies = ['How is my island?', 'Unlock Crystal Cave', "Today's challenges", 'My streak stats'];

  const sendMsg = (txt) => {
    if (!txt.trim()) return;
    setMessages(p => [...p, { from:'user', text:txt, time:'Now' }]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages(p => [...p, { from:'spirit', text: spiritReplies[replyIdx % spiritReplies.length], time:'Now' }]);
      setReplyIdx(i => i + 1);
    }, 1800);
  };

  useEffect(() => { endRef.current?.scrollIntoView({ behavior:'smooth' }); }, [messages, typing]);

  return (
    <div style={{ height:'100%', display:'flex', flexDirection:'column', background:t.bg, fontFamily:'Barlow, sans-serif' }}>
      {/* Header */}
      <div style={{ padding:'18px 20px 14px', background:t.surface, borderBottom:`1px solid ${t.border}`, flexShrink:0 }}>
        <div style={{ display:'flex', alignItems:'center', gap:12 }}>
          <div style={{ width:46, height:46, borderRadius:23, flexShrink:0,
            background:`linear-gradient(135deg,${t.cta},${t.primary})`,
            display:'flex', alignItems:'center', justifyContent:'center',
            boxShadow:`0 0 18px ${t.cta}77`, animation:'bloomGlow 2.5s ease-in-out infinite' }}>
            {React.createElement(window.lucide?.Sparkles||'span', { size:22, color:'#fff' })}
          </div>
          <div>
            <div style={{ fontFamily:'Barlow Condensed, sans-serif', fontSize:20, fontWeight:900, color:t.text, letterSpacing:0.8 }}>ECO-SPIRIT</div>
            <div style={{ display:'flex', alignItems:'center', gap:6 }}>
              <div style={{ width:7, height:7, borderRadius:4, background:t.cta, animation:'pulse 1.5s ease infinite' }} />
              <span style={{ fontSize:11, color:t.cta }}>Your nature guide is awake</span>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex:1, overflowY:'auto', padding:'16px 20px', display:'flex', flexDirection:'column', gap:13 }}>
        {messages.map((m,i) => (
          <div key={i} style={{ display:'flex', flexDirection: m.from==='user' ? 'row-reverse' : 'row', alignItems:'flex-end', gap:9, animation:'slideUp 0.3s ease' }}>
            {m.from === 'spirit' && (
              <div style={{ width:30, height:30, borderRadius:15, flexShrink:0,
                background:`linear-gradient(135deg,${t.cta},${t.primary})`,
                display:'flex', alignItems:'center', justifyContent:'center' }}>
                {React.createElement(window.lucide?.Leaf||'span', { size:15, color:'#fff' })}
              </div>
            )}
            <div style={{ maxWidth:'73%',
              background: m.from==='user' ? `linear-gradient(135deg,${t.primary},${t.secondary})` : t.card,
              borderRadius: m.from==='user' ? '18px 18px 5px 18px' : '18px 18px 18px 5px',
              padding:'11px 15px',
              boxShadow: m.from==='user' ? `0 5px 14px ${t.primary}55` : `0 2px 8px rgba(0,0,0,0.15)`,
              border: m.from==='spirit' ? `1px solid ${t.border}` : 'none' }}>
              <div style={{ fontSize:13, color: m.from==='user' ? '#fff' : t.text, lineHeight:1.55 }}>{m.text}</div>
              <div style={{ fontSize:10, color: m.from==='user' ? 'rgba(255,255,255,0.65)' : t.textMuted, marginTop:4 }}>{m.time}</div>
            </div>
          </div>
        ))}
        {typing && (
          <div style={{ display:'flex', alignItems:'flex-end', gap:9 }}>
            <div style={{ width:30, height:30, borderRadius:15, background:`linear-gradient(135deg,${t.cta},${t.primary})`,
              display:'flex', alignItems:'center', justifyContent:'center' }}>
              {React.createElement(window.lucide?.Leaf||'span', { size:15, color:'#fff' })}
            </div>
            <div style={{ background:t.card, borderRadius:'18px 18px 18px 5px', padding:'13px 16px',
              display:'flex', gap:6, border:`1px solid ${t.border}` }}>
              {[0,1,2].map(j => (
                <div key={j} style={{ width:7, height:7, borderRadius:4, background:t.cta,
                  animation:`typing 1.1s ease-in-out infinite`, animationDelay:`${j*0.18}s` }} />
              ))}
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      {/* Quick replies */}
      <div style={{ padding:'8px 20px 6px', display:'flex', gap:8, overflowX:'auto', flexShrink:0 }}>
        {quickReplies.map((qr,i) => (
          <button key={i} onClick={() => sendMsg(qr)}
            style={{ background:'none', border:`1px solid ${t.cta}66`, borderRadius:20, padding:'6px 14px',
              whiteSpace:'nowrap', fontSize:11, color:t.cta, cursor:'pointer', flexShrink:0,
              transition:'all 0.15s ease', fontFamily:'Barlow, sans-serif' }}>
            {qr}
          </button>
        ))}
      </div>

      {/* Input */}
      <div style={{ padding:'8px 20px 18px', display:'flex', gap:10, alignItems:'center', flexShrink:0 }}>
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key==='Enter' && sendMsg(input)}
          placeholder="Ask your Eco-Spirit..."
          style={{ flex:1, background:t.card, border:`1px solid ${t.border}`, borderRadius:24,
            padding:'11px 16px', fontFamily:'Barlow, sans-serif', fontSize:13, color:t.text, outline:'none' }} />
        <button onClick={() => sendMsg(input)}
          style={{ width:46, height:46, borderRadius:23, flexShrink:0,
            background:`linear-gradient(135deg,${t.primary},${t.secondary})`, border:'none',
            display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer',
            boxShadow:`0 5px 14px ${t.primary}77` }}>
          {React.createElement(window.lucide?.Send||'span', { size:19, color:'#fff' })}
        </button>
      </div>
    </div>
  );
}

// ─── JOURNEY SCREEN ───────────────────────────────────────────────────────────
function JourneyScreen({ t }) {
  const [view, setView] = useState('week');

  const weekData = [
    { day:'Mon', nrg:45, tasks:2 },
    { day:'Tue', nrg:72, tasks:4 },
    { day:'Wed', nrg:68, tasks:3 },
    { day:'Thu', nrg:85, tasks:5 },
    { day:'Fri', nrg:60, tasks:3 },
    { day:'Sat', nrg:90, tasks:5 },
    { day:'Sun', nrg:68, tasks:3 },
  ];
  const maxNrg = Math.max(...weekData.map(d => d.nrg));

  const milestones = [
    { date:'Apr 5',  event:'Ember Orchid Unlocked',      icon:'Flower2',    color:t.primary },
    { date:'Apr 3',  event:'Mystic Forest Completed',    icon:'Leaf',       color:t.cta },
    { date:'Apr 1',  event:'45-Day Streak!',             icon:'Flame',      color:'#F59E0B' },
    { date:'Mar 28', event:'Crystal Bloom Discovered',   icon:'Gem',        color:t.accent },
    { date:'Mar 22', event:'Coastal Meadow Mastered',    icon:'Award',      color:'#34D399' },
  ];

  const insights = [
    { title:'Best Day', desc:'Saturday — 90 eco-energy from 5 completed habits', icon:'TrendingUp', color:t.cta },
    { title:'Power Habit', desc:'Evening walks drive 35% of your biome growth', icon:'Zap', color:t.primary },
    { title:'Sleep Impact', desc:'Quality sleep boosts next-day energy by 28%', icon:'Moon', color:t.accent },
  ];

  return (
    <div style={{ height:'100%', overflowY:'auto', background:t.bg, fontFamily:'Barlow, sans-serif' }}>
      <div style={{ padding:'20px 20px 16px' }}>
        <div style={{ fontFamily:'Barlow Condensed, sans-serif', fontSize:28, fontWeight:900, color:t.text, letterSpacing:1.5 }}>YOUR JOURNEY</div>
        <div style={{ fontSize:12, color:t.textMuted, marginTop:2 }}>47-day streak · 23 species collected</div>
      </div>

      {/* Chart Card */}
      <div style={{ padding:'0 20px 16px' }}>
        <div style={{ background:t.card, borderRadius:22, padding:'18px 16px', border:`1px solid ${t.border}` }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:6 }}>
            <span style={{ fontFamily:'Barlow Condensed, sans-serif', fontSize:13, fontWeight:700, color:t.textMuted, letterSpacing:0.8 }}>ECO-ENERGY THIS WEEK</span>
            <span style={{ fontFamily:'Barlow Condensed, sans-serif', fontSize:20, fontWeight:900, color:t.primary }}>488 total</span>
          </div>
          <div style={{ fontSize:11, color:t.ctaLight, marginBottom:14 }}>↑ 23% vs last week</div>

          {/* Bars */}
          <div style={{ display:'flex', alignItems:'flex-end', gap:7, height:90 }}>
            {weekData.map((d,i) => {
              const today = i === 6;
              const barH = Math.round((d.nrg / maxNrg) * 76);
              return (
                <div key={i} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:5 }}>
                  <div style={{ width:'100%', height:barH, borderRadius:'5px 5px 0 0',
                    background: today
                      ? `linear-gradient(180deg,${t.primary},${t.secondary})`
                      : `linear-gradient(180deg,${t.cta}99,${t.cta}44)`,
                    boxShadow: today ? `0 0 10px ${t.primary}88` : 'none',
                    transition:'height 0.6s ease' }} />
                  <span style={{ fontSize:9, fontWeight: today ? 800 : 400,
                    color: today ? t.primary : t.textMuted }}>{d.day}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Island Growth Preview */}
      <div style={{ padding:'0 20px 16px' }}>
        <div style={{ background:t.card, borderRadius:22, overflow:'hidden', border:`1px solid ${t.border}` }}>
          <div style={{ padding:'14px 16px 12px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <div>
              <div style={{ fontFamily:'Barlow Condensed, sans-serif', fontSize:14, fontWeight:800, color:t.text, letterSpacing:0.8 }}>ISLAND GROWTH REPLAY</div>
              <div style={{ fontSize:11, color:t.textMuted, marginTop:2 }}>47-day time-lapse preview</div>
            </div>
            <div style={{ display:'flex', alignItems:'center', gap:6, background:`${t.primary}22`,
              borderRadius:20, padding:'6px 12px', border:`1px solid ${t.primary}44`, cursor:'pointer' }}>
              {React.createElement(window.lucide?.Play||'span', { size:13, color:t.primary })}
              <span style={{ fontFamily:'Barlow Condensed, sans-serif', fontSize:12, fontWeight:800, color:t.primary }}>PLAY</span>
            </div>
          </div>
          <div style={{ height:110, margin:'0 16px 16px', borderRadius:14, overflow:'hidden' }}>
            <IslandCanvas t={t} compact={true} />
          </div>
        </div>
      </div>

      {/* Insights */}
      <div style={{ padding:'0 20px 16px' }}>
        <div style={{ fontFamily:'Barlow Condensed, sans-serif', fontSize:15, fontWeight:800, color:t.text, letterSpacing:0.8, marginBottom:13 }}>BLOOM INSIGHTS</div>
        {insights.map((ins,i) => {
          const Icon = window.lucide?.[ins.icon];
          return (
            <div key={i} style={{ background:t.card, borderRadius:16, padding:'14px', marginBottom:9,
              display:'flex', alignItems:'center', gap:12,
              border:`1px solid ${ins.color}22`, boxShadow:`0 2px 10px ${ins.color}11` }}>
              <div style={{ width:42, height:42, borderRadius:13, flexShrink:0,
                background:`${ins.color}22`, display:'flex', alignItems:'center', justifyContent:'center' }}>
                {Icon && React.createElement(Icon, { size:19, color:ins.color })}
              </div>
              <div>
                <div style={{ fontSize:13, fontWeight:700, color:ins.color }}>{ins.title}</div>
                <div style={{ fontSize:11, color:t.textSec, marginTop:2, lineHeight:1.4 }}>{ins.desc}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Milestones timeline */}
      <div style={{ padding:'0 20px 28px' }}>
        <div style={{ fontFamily:'Barlow Condensed, sans-serif', fontSize:15, fontWeight:800, color:t.text, letterSpacing:0.8, marginBottom:14 }}>RECENT MILESTONES</div>
        {milestones.map((m,i) => {
          const Icon = window.lucide?.[m.icon];
          return (
            <div key={i} style={{ display:'flex', gap:13, marginBottom:16, alignItems:'flex-start' }}>
              <div style={{ display:'flex', flexDirection:'column', alignItems:'center' }}>
                <div style={{ width:34, height:34, borderRadius:11, flexShrink:0,
                  background:`${m.color}22`, border:`1px solid ${m.color}66`,
                  display:'flex', alignItems:'center', justifyContent:'center' }}>
                  {Icon && React.createElement(Icon, { size:16, color:m.color })}
                </div>
                {i < milestones.length - 1 && (
                  <div style={{ width:1, height:22, background:t.border, marginTop:4 }} />
                )}
              </div>
              <div style={{ paddingTop:6 }}>
                <div style={{ fontSize:13, fontWeight:700, color:t.text }}>{m.event}</div>
                <div style={{ fontSize:11, color:t.textMuted, marginTop:2 }}>{m.date}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── ROOT APP ─────────────────────────────────────────────────────────────────
function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [theme, setTheme] = useState('dark');
  const t = themes[theme];

  const stats = [
    { value:'47', label:'Day Streak' },
    { value:'23', label:'Species' },
    { value:'4',  label:'Biomes' },
  ];

  const screens = { home: HomeScreen, island: IslandScreen, chat: ChatScreen, journey: JourneyScreen };
  const navItems = [
    { id:'home',    label:'Home',      icon:'Home' },
    { id:'island',  label:'Island',    icon:'Globe' },
    { id:'chat',    label:'Eco-Spirit',icon:'MessageCircle' },
    { id:'journey', label:'Journey',   icon:'TrendingUp' },
  ];

  const ActiveScreen = screens[activeScreen];

  return (
    <div style={{ minHeight:'100vh', background:'#f0f0f0', display:'flex', alignItems:'center', justifyContent:'center', padding:'20px 0' }}>
      <style>{GOOGLE_FONTS_STYLE + ANIMATIONS}</style>
      <div style={{
        width:375, height:812, background:t.bg, borderRadius:42, overflow:'hidden',
        boxShadow:'0 48px 96px rgba(0,0,0,0.28), 0 0 0 1px rgba(255,255,255,0.08)',
        display:'flex', flexDirection:'column', position:'relative',
        fontFamily:'Barlow, sans-serif',
      }}>
        {/* Screen area */}
        <div style={{ flex:1, overflow:'hidden', position:'relative' }}>
          <ActiveScreen
            t={t} theme={theme} setTheme={setTheme}
            setActiveScreen={setActiveScreen} activeScreen={activeScreen}
            ecoEnergy={68} stats={stats}
          />
        </div>

        {/* Bottom Navigation */}
        <div style={{ background:t.navBg, borderTop:`1px solid ${t.border}`, padding:'7px 0 20px', display:'flex', justifyContent:'space-around', flexShrink:0 }}>
          {navItems.map(item => {
            const Icon = window.lucide?.[item.icon];
            const active = activeScreen === item.id;
            return (
              <button key={item.id} onClick={() => setActiveScreen(item.id)}
                style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:3,
                  background:'none', border:'none', cursor:'pointer',
                  padding:'5px 12px', minWidth:44, minHeight:44,
                  position:'relative', transition:'opacity 0.2s' }}>
                {active && (
                  <div style={{ position:'absolute', top:0, left:'50%', transform:'translateX(-50%)',
                    width:22, height:3, borderRadius:2, background:t.primary }} />
                )}
                <div style={{ width:32, height:32, borderRadius:10, marginTop:4,
                  background: active ? `${t.primary}22` : 'transparent',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  transition:'all 0.2s ease' }}>
                  {Icon && React.createElement(Icon, { size:20, color: active ? t.primary : t.textMuted })}
                </div>
                <span style={{ fontSize:10, color: active ? t.primary : t.textMuted, fontWeight: active ? 700 : 400 }}>
                  <span>{item.label}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
