const { useState, useEffect, useRef } = React;

function App() {
  const fontStyle = `
    @import url('https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@300;400;500;600;700&display=swap');
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(18px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeInLeft {
      from { opacity: 0; transform: translateX(-12px); }
      to   { opacity: 1; transform: translateX(0); }
    }
    @keyframes blink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0; }
    }
    @keyframes scanline {
      0%   { top: 0%; }
      100% { top: 100%; }
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    ::-webkit-scrollbar { width: 3px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: #FFAB91; }
  `;

  const themes = {
    light: {
      bg: '#FAFAFA',
      surface: '#FFFFFF',
      surfaceAlt: '#F0EFED',
      primary: '#FFAB91',
      primaryDark: '#E87451',
      secondary: '#37474F',
      text: '#1A1A1A',
      textMuted: '#607D8B',
      border: '#37474F',
      cardBg: '#FFFFFF',
      navBg: '#FAFAFA',
      inputBg: '#F5F5F5',
      accent: '#FF7043',
    },
    dark: {
      bg: '#0D1117',
      surface: '#161B22',
      surfaceAlt: '#1C2128',
      primary: '#FFAB91',
      primaryDark: '#E87451',
      secondary: '#90A4AE',
      text: '#E6EDF3',
      textMuted: '#8B949E',
      border: '#FFAB91',
      cardBg: '#161B22',
      navBg: '#0D1117',
      inputBg: '#1C2128',
      accent: '#FF7043',
    },
  };

  const [activeScreen, setActiveScreen] = useState('home');
  const [isDark, setIsDark] = useState(false);
  const [pressed, setPressed] = useState(null);

  const t = isDark ? themes.dark : themes.light;

  const press = (id, fn) => {
    setPressed(id);
    setTimeout(() => setPressed(null), 140);
    if (fn) fn();
  };

  const btn = (id, extra = {}) => ({
    cursor: 'pointer',
    transform: pressed === id ? 'scale(0.96)' : 'scale(1)',
    transition: 'all 0.12s',
    ...extra,
  });

  // ─── HOME SCREEN ──────────────────────────────────────────────────────────
  const HomeScreen = () => {
    const cards = [
      {
        id: 1, title: 'Neon Coral Reef at Dawn', author: '@voidweaver',
        segs: 47, weavers: 23, tag: 'ANOMALY BLEND', tagColor: '#E87451',
        accent: '#FFCCBC',
        desc: 'Bioluminescent coral merges with industrial scaffolding under a perpetual orange sunrise',
      },
      {
        id: 2, title: 'Fractal Storm Cities', author: '@luminacraft',
        segs: 112, weavers: 58, tag: 'TRENDING', tagColor: '#37474F',
        accent: '#B0BEC5',
        desc: 'Recursive cityscapes spiral infinitely inward — each layer a new civilisation',
      },
      {
        id: 3, title: 'Crystal Memory Gardens', author: '@echoform',
        segs: 31, weavers: 14, tag: 'NEW SEED', tagColor: '#26A69A',
        accent: '#F8BBD0',
        desc: 'Crystalline structures hold frozen moments of human memory, softly glowing',
      },
      {
        id: 4, title: 'Magnetic Tide Engines', author: '@driftpilot',
        segs: 78, weavers: 41, tag: 'HOT', tagColor: '#FF5722',
        accent: '#DCEDC8',
        desc: 'Massive electromagnetic tide machines power an ocean of liquid light',
      },
    ];

    return (
      <div style={{ fontFamily: "'Chakra Petch', monospace", height: '100%', overflowY: 'auto', background: t.bg }}>
        {/* Sticky header */}
        <div style={{ position: 'sticky', top: 0, zIndex: 20, background: t.navBg, borderBottom: `2px solid ${t.border}`, padding: '12px 16px 10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <div>
              <div style={{ fontSize: 18, fontWeight: 700, color: t.text, letterSpacing: '0.08em', lineHeight: 1 }}>DREAMWEAVE</div>
              <div style={{ fontSize: 9, color: t.primary, fontWeight: 600, letterSpacing: '0.18em', marginTop: 2 }}>CO-CREATE INFINITE AI DREAMSCAPES</div>
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              <div
                onClick={() => setIsDark(!isDark)}
                style={{ ...btn('theme'), width: 32, height: 32, border: `2px solid ${t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', background: t.surface }}
                onMouseDown={() => setPressed('theme')}
              >
                {isDark
                  ? React.createElement(window.lucide.Sun,  { size: 14, color: t.primary })
                  : React.createElement(window.lucide.Moon, { size: 14, color: t.secondary })}
              </div>
              <div style={{ width: 32, height: 32, background: t.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                {React.createElement(window.lucide.Bell, { size: 14, color: '#fff' })}
              </div>
            </div>
          </div>
          {/* Live stats bar */}
          <div style={{ display: 'flex', border: `2px solid ${t.border}` }}>
            {[['12.4K','DREAMERS'],['847','LIVE NOW'],['3.2M','SEGMENTS']].map(([v, l], i) => (
              <div key={l} style={{ flex: 1, padding: '5px 6px', borderRight: i < 2 ? `1px solid ${t.border}` : 'none', textAlign: 'center' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: t.primary, lineHeight: 1 }}>{v}</div>
                <div style={{ fontSize: 8, color: t.textMuted, letterSpacing: '0.12em', marginTop: 1 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ padding: '12px 14px 0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: t.secondary, letterSpacing: '0.16em' }}>// LIVE DREAMSCAPES</div>
            <div style={{ fontSize: 9, color: t.primary, letterSpacing: '0.1em', cursor: 'pointer' }}>FILTER ↓</div>
          </div>
        </div>

        {/* Staggered waterfall */}
        <div style={{ padding: '0 14px 14px' }}>
          {cards.map((c, i) => (
            <div
              key={c.id}
              onClick={() => { press(`card${c.id}`); setActiveScreen('explore'); }}
              style={{
                ...btn(`card${c.id}`),
                marginBottom: 10,
                marginLeft: i % 2 === 1 ? 14 : 0,
                marginRight: i % 2 === 0 ? 14 : 0,
                border: `2px solid ${t.border}`,
                background: t.cardBg,
                animation: `fadeInUp 0.45s ease both`,
                animationDelay: `${i * 0.09}s`,
              }}
            >
              <div style={{ height: 5, background: c.accent, borderBottom: `2px solid ${t.border}` }} />
              <div style={{ padding: '9px 11px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 5 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: t.text, lineHeight: 1.25, marginBottom: 2 }}>{c.title}</div>
                    <div style={{ fontSize: 9, color: t.textMuted }}>{c.author}</div>
                  </div>
                  <div style={{ padding: '2px 5px', background: c.tagColor, marginLeft: 6, flexShrink: 0 }}>
                    <span style={{ fontSize: 7, fontWeight: 700, color: '#fff', letterSpacing: '0.1em' }}>{c.tag}</span>
                  </div>
                </div>
                <div style={{ fontSize: 10, color: t.textMuted, lineHeight: 1.55, marginBottom: 7 }}>{c.desc}</div>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                    {React.createElement(window.lucide.Layers, { size: 11, color: t.primary })}
                    <span style={{ fontSize: 9, color: t.textMuted }}>{c.segs} segs</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                    {React.createElement(window.lucide.Users, { size: 11, color: t.primary })}
                    <span style={{ fontSize: 9, color: t.textMuted }}>{c.weavers} weavers</span>
                  </div>
                  <div style={{ marginLeft: 'auto' }}>
                    {React.createElement(window.lucide.ArrowRight, { size: 13, color: t.primary })}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Anomaly alert */}
        <div style={{ margin: '0 14px 16px', border: `2px solid ${t.primary}`, background: isDark ? '#1a0e06' : '#FFF3E0', padding: '11px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 6 }}>
            <div style={{ width: 7, height: 7, background: t.primary, borderRadius: '50%', animation: 'blink 1.4s ease infinite' }} />
            <span style={{ fontSize: 9, fontWeight: 700, color: t.primary, letterSpacing: '0.18em' }}>ANOMALY DETECTED</span>
          </div>
          <div style={{ fontSize: 11, color: t.text, lineHeight: 1.5, marginBottom: 9 }}>
            AI found resonance between <strong>Crystal Memory Gardens</strong> and <strong>Magnetic Tide Engines</strong> — a mutation awaits your blessing.
          </div>
          <div
            onClick={() => press('anomaly', () => setActiveScreen('explore'))}
            style={{ ...btn('anomaly'), padding: '8px', background: pressed === 'anomaly' ? t.primaryDark : t.primary, textAlign: 'center', cursor: 'pointer' }}
          >
            <span style={{ fontSize: 10, fontWeight: 700, color: '#fff', letterSpacing: '0.12em' }}>EXPLORE ANOMALY BLEND →</span>
          </div>
        </div>
      </div>
    );
  };

  // ─── EXPLORE SCREEN ───────────────────────────────────────────────────────
  const ExploreScreen = () => {
    const [selected, setSelected] = useState(null);

    const nodes = [
      { id: 'a', x: 28,  y: 20,  sz: 58, label: 'NEON CORAL REEF', color: '#FFAB91', segs: 47 },
      { id: 'b', x: 190, y: 60,  sz: 44, label: 'FRACTAL STORM',   color: '#90A4AE', segs: 112 },
      { id: 'c', x: 110, y: 140, sz: 36, label: 'CRYSTAL MEM',     color: '#F48FB1', segs: 31 },
      { id: 'd', x: 250, y: 148, sz: 50, label: 'TIDE ENGINES',    color: '#A5D6A7', segs: 78 },
      { id: 'e', x: 22,  y: 188, sz: 30, label: 'VOID ATLAS',      color: '#CE93D8', segs: 19 },
      { id: 'f', x: 298, y: 42,  sz: 38, label: 'PRISM WALLS',     color: '#FFE082', segs: 55 },
    ];
    const conns = [['a','b'],['a','c'],['b','d'],['c','d'],['d','f'],['a','e'],['b','f']];

    return (
      <div style={{ fontFamily: "'Chakra Petch', monospace", height: '100%', overflowY: 'auto', background: t.bg }}>
        <div style={{ padding: '13px 16px', borderBottom: `2px solid ${t.border}`, background: t.navBg }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: t.text, letterSpacing: '0.14em', marginBottom: 2 }}>// SPATIAL DREAM MAP</div>
          <div style={{ fontSize: 9, color: t.textMuted, letterSpacing: '0.06em' }}>Navigate the collective dreamscape universe</div>
        </div>

        {/* Map canvas */}
        <div style={{ position: 'relative', margin: '14px 14px 0', border: `2px solid ${t.border}`, background: isDark ? '#050810' : '#EEF1F5', height: 260, overflow: 'hidden' }}>
          {/* Grid */}
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.12 }}>
            {Array.from({ length: 11 }).map((_, i) => (
              <line key={`h${i}`} x1="0" y1={i * 26} x2="347" y2={i * 26} stroke={t.secondary} strokeWidth="1" />
            ))}
            {Array.from({ length: 14 }).map((_, i) => (
              <line key={`v${i}`} x1={i * 26} y1="0" x2={i * 26} y2="260" stroke={t.secondary} strokeWidth="1" />
            ))}
          </svg>

          {/* Connections */}
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
            {conns.map(([fa, tb]) => {
              const f = nodes.find(n => n.id === fa);
              const to = nodes.find(n => n.id === tb);
              return (
                <line key={`${fa}-${tb}`}
                  x1={f.x + f.sz / 2} y1={f.y + f.sz / 2}
                  x2={to.x + to.sz / 2} y2={to.y + to.sz / 2}
                  stroke={t.primary} strokeWidth="1.5" strokeDasharray="5,4" opacity="0.55"
                />
              );
            })}
          </svg>

          {/* Nodes */}
          {nodes.map(node => (
            <div
              key={node.id}
              onClick={() => setSelected(selected?.id === node.id ? null : node)}
              style={{
                position: 'absolute', left: node.x, top: node.y,
                width: node.sz, height: node.sz,
                background: node.color,
                border: `2px solid ${selected?.id === node.id ? t.secondary : 'rgba(0,0,0,0.2)'}`,
                outline: selected?.id === node.id ? `3px solid ${t.primary}` : 'none',
                cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.18s',
              }}
            >
              <span style={{ fontSize: 7, fontWeight: 700, color: '#111', textAlign: 'center', padding: '0 3px', lineHeight: 1.2 }}>{node.label}</span>
            </div>
          ))}

          <div style={{ position: 'absolute', bottom: 6, right: 8, fontSize: 8, color: t.textMuted, fontFamily: 'monospace', letterSpacing: '0.1em' }}>
            GRID v2.1 · {nodes.length} NODES
          </div>
        </div>

        {/* Selected node info */}
        {selected && (
          <div style={{ margin: '10px 14px 0', border: `2px solid ${t.primary}`, background: t.cardBg, animation: 'fadeInUp 0.25s ease' }}>
            <div style={{ padding: '9px 11px', borderBottom: `1px solid ${t.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: t.text, letterSpacing: '0.1em' }}>{selected.label}</span>
              <div style={{ padding: '2px 7px', background: selected.color }}>
                <span style={{ fontSize: 8, fontWeight: 700, color: '#111' }}>{selected.segs} SEGS</span>
              </div>
            </div>
            <div style={{ padding: '9px 11px', display: 'flex', gap: 7 }}>
              <div
                onClick={() => press('weave', () => setActiveScreen('create'))}
                style={{ ...btn('weave'), flex: 1, padding: '7px', background: t.primary, textAlign: 'center', cursor: 'pointer' }}
              >
                <span style={{ fontSize: 9, fontWeight: 700, color: '#fff', letterSpacing: '0.1em' }}>+ WEAVE SEGMENT</span>
              </div>
              <div style={{ flex: 1, padding: '7px', border: `2px solid ${t.border}`, textAlign: 'center', cursor: 'pointer' }}>
                <span style={{ fontSize: 9, fontWeight: 700, color: t.text, letterSpacing: '0.08em' }}>FLY INTO →</span>
              </div>
            </div>
          </div>
        )}

        {/* Nearby list */}
        <div style={{ padding: '14px 14px 16px' }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: t.secondary, letterSpacing: '0.16em', marginBottom: 9 }}>// NEARBY NODES</div>
          {[
            { name: 'VOID ATLAS',   weavers: 8,  color: '#CE93D8' },
            { name: 'PRISM WALLS',  weavers: 22, color: '#FFE082' },
            { name: 'ECHO BASIN',   weavers: 15, color: '#80DEEA' },
            { name: 'RUST COMPASS', weavers: 6,  color: '#FFAB91' },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                marginBottom: 7,
                border: `2px solid ${t.border}`,
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '8px 10px',
                background: t.cardBg,
                cursor: 'pointer',
                animation: `fadeInLeft 0.38s ease both`,
                animationDelay: `${i * 0.07}s`,
              }}
            >
              <div style={{ width: 18, height: 18, background: item.color, flexShrink: 0 }} />
              <div style={{ flex: 1, fontSize: 10, fontWeight: 700, color: t.text, letterSpacing: '0.08em' }}>{item.name}</div>
              <div style={{ fontSize: 9, color: t.textMuted }}>{item.weavers} active</div>
              {React.createElement(window.lucide.ChevronRight, { size: 13, color: t.primary })}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ─── CREATE SCREEN ────────────────────────────────────────────────────────
  const CreateScreen = () => {
    const [prompt, setPrompt] = useState('');
    const [mode, setMode] = useState(0);
    const [style, setStyle] = useState('ABSTRACT');
    const [generating, setGenerating] = useState(false);

    const styles = ['ABSTRACT','CRYSTALLINE','ORGANIC','INDUSTRIAL','COSMIC','AQUATIC'];
    const suggestions = [
      'A clockwork ocean where gears replace coral',
      'Cities built inside the bones of sleeping giants',
      'Libraries containing books of unwritten futures',
    ];

    const generate = () => {
      if (generating) return;
      setGenerating(true);
      setTimeout(() => setGenerating(false), 2200);
    };

    return (
      <div style={{ fontFamily: "'Chakra Petch', monospace", height: '100%', overflowY: 'auto', background: t.bg }}>
        <div style={{ padding: '13px 16px', borderBottom: `2px solid ${t.border}`, background: t.navBg }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: t.text, letterSpacing: '0.14em', marginBottom: 2 }}>// PLANT DREAM SEED</div>
          <div style={{ fontSize: 9, color: t.textMuted }}>Initiate a new visual narrative for the community</div>
        </div>

        <div style={{ padding: 14 }}>
          {/* Mode tabs */}
          <div style={{ display: 'flex', border: `2px solid ${t.border}`, marginBottom: 14 }}>
            {['NEW SEED','WEAVE IN'].map((m, i) => (
              <div
                key={m}
                onClick={() => setMode(i)}
                style={{
                  flex: 1, padding: '8px', textAlign: 'center',
                  background: mode === i ? t.primary : t.surface,
                  borderRight: i === 0 ? `2px solid ${t.border}` : 'none',
                  cursor: 'pointer',
                }}
              >
                <span style={{ fontSize: 9, fontWeight: 700, color: mode === i ? '#fff' : t.textMuted, letterSpacing: '0.12em' }}>{m}</span>
              </div>
            ))}
          </div>

          {/* Visual style chips */}
          <div style={{ marginBottom: 13 }}>
            <div style={{ fontSize: 9, fontWeight: 700, color: t.secondary, letterSpacing: '0.16em', marginBottom: 7 }}>VISUAL STYLE</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
              {styles.map(s => (
                <div
                  key={s}
                  onClick={() => setStyle(s)}
                  style={{
                    padding: '4px 9px',
                    border: `2px solid ${style === s ? t.primary : t.border}`,
                    background: style === s ? t.primary : 'transparent',
                    cursor: 'pointer',
                    transition: 'all 0.12s',
                  }}
                >
                  <span style={{ fontSize: 8, fontWeight: 700, color: style === s ? '#fff' : t.textMuted, letterSpacing: '0.08em' }}>{s}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Prompt box */}
          <div style={{ marginBottom: 13 }}>
            <div style={{ fontSize: 9, fontWeight: 700, color: t.secondary, letterSpacing: '0.16em', marginBottom: 7 }}>DREAM SEED PROMPT</div>
            <div style={{ border: `2px solid ${t.border}`, background: t.surface }}>
              <textarea
                value={prompt}
                onChange={e => setPrompt(e.target.value)}
                placeholder="Describe your vision… A labyrinthine city built from discarded mechanical clocks, each tick echoing through crystalline corridors..."
                style={{
                  width: '100%', minHeight: 90, padding: '9px 11px',
                  background: 'transparent', border: 'none', outline: 'none',
                  fontFamily: "'Chakra Petch', monospace",
                  fontSize: 11, color: t.text, resize: 'none', lineHeight: 1.55,
                }}
              />
              <div style={{ padding: '5px 9px', borderTop: `1px solid ${t.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 8, color: t.textMuted }}>{prompt.length}/280 chars</span>
                <div style={{ padding: '2px 8px', border: `1px solid ${t.border}`, cursor: 'pointer' }}>
                  <span style={{ fontSize: 8, color: t.textMuted, letterSpacing: '0.1em' }}>AI ASSIST ✦</span>
                </div>
              </div>
            </div>
          </div>

          {/* Parameters */}
          <div style={{ marginBottom: 13 }}>
            <div style={{ fontSize: 9, fontWeight: 700, color: t.secondary, letterSpacing: '0.16em', marginBottom: 7 }}>GENERATION PARAMETERS</div>
            <div style={{ border: `2px solid ${t.border}` }}>
              {[['COHERENCE',73],['ABSTRACTION',85],['MUTATION RATE',42]].map(([label, val], i) => (
                <div key={label} style={{ padding: '7px 10px', borderBottom: i < 2 ? `1px solid ${t.border}` : 'none', display: 'flex', alignItems: 'center', gap: 9 }}>
                  <span style={{ fontSize: 8, color: t.textMuted, width: 96, flexShrink: 0, letterSpacing: '0.08em' }}>{label}</span>
                  <div style={{ flex: 1, height: 5, background: t.surfaceAlt, border: `1px solid ${t.border}`, position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: `${val}%`, background: t.primary }} />
                  </div>
                  <span style={{ fontSize: 10, fontWeight: 700, color: t.primary, width: 24, textAlign: 'right' }}>{val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Generate CTA */}
          <div
            onClick={() => press('gen', generate)}
            style={{
              ...btn('gen'),
              padding: '11px', background: t.secondary, textAlign: 'center',
              cursor: 'pointer', border: `2px solid ${t.border}`, marginBottom: 13,
            }}
          >
            <span style={{ fontSize: 12, fontWeight: 700, color: t.primary, letterSpacing: '0.18em' }}>
              {generating ? '⟳  WEAVING DREAM...' : '◆  GENERATE DREAMSCAPE'}
            </span>
          </div>

          {/* Seed suggestions */}
          <div style={{ fontSize: 10, fontWeight: 700, color: t.secondary, letterSpacing: '0.16em', marginBottom: 8 }}>// SEED INSPIRATIONS</div>
          {suggestions.map((s, i) => (
            <div
              key={i}
              onClick={() => setPrompt(s)}
              style={{
                padding: '8px 10px',
                border: `1px dashed ${t.border}`,
                marginBottom: 6,
                cursor: 'pointer',
                background: t.surface,
                animation: `fadeInUp 0.4s ease both`,
                animationDelay: `${i * 0.09}s`,
              }}
            >
              <span style={{ fontSize: 10, color: t.textMuted, fontStyle: 'italic', lineHeight: 1.4 }}>"{s}"</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ─── TRAILS SCREEN ────────────────────────────────────────────────────────
  const TrailsScreen = () => {
    const [tab, setTab] = useState('trails');

    const trails = [
      { name: 'Industrial Romanticism', segs: 8,  dur: '12 min', author: '@voidweaver', color: '#FFAB91' },
      { name: 'The Midnight Migration',  segs: 15, dur: '22 min', author: '@luminacraft', color: '#90A4AE' },
      { name: 'Crystal Epoch Archives', segs: 6,  dur: '9 min',  author: '@echoform',    color: '#F48FB1' },
      { name: 'Omega Structures',        segs: 11, dur: '16 min', author: '@driftpilot',  color: '#A5D6A7' },
    ];

    return (
      <div style={{ fontFamily: "'Chakra Petch', monospace", height: '100%', overflowY: 'auto', background: t.bg }}>
        {/* Header + tabs */}
        <div style={{ borderBottom: `2px solid ${t.border}`, background: t.navBg }}>
          <div style={{ padding: '13px 16px 0' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: t.text, letterSpacing: '0.14em', marginBottom: 10 }}>// DREAM TRAILS & PROFILE</div>
          </div>
          <div style={{ display: 'flex', paddingLeft: 16 }}>
            {['trails','my seeds','badges'].map(tb => (
              <div
                key={tb}
                onClick={() => setTab(tb)}
                style={{
                  padding: '7px 12px',
                  borderBottom: tab === tb ? `3px solid ${t.primary}` : '3px solid transparent',
                  cursor: 'pointer',
                }}
              >
                <span style={{ fontSize: 9, fontWeight: 700, color: tab === tb ? t.primary : t.textMuted, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{tb}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Profile card */}
        <div style={{ margin: '13px 14px 13px', border: `2px solid ${t.border}`, background: t.cardBg }}>
          <div style={{ height: 56, background: `linear-gradient(135deg, ${t.primary} 0%, ${t.secondary} 100%)`, position: 'relative' }}>
            <div style={{ position: 'absolute', bottom: -16, left: 12, width: 32, height: 32, background: t.primary, border: `3px solid ${t.bg}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>✦</div>
          </div>
          <div style={{ padding: '20px 12px 11px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: t.text }}>@voidweaver</div>
            <div style={{ fontSize: 9, color: t.textMuted, marginBottom: 9, letterSpacing: '0.06em' }}>Digital alchemist · joined 2024</div>
            <div style={{ display: 'flex', gap: 18 }}>
              {[['24','SEEDS'],['1.2K','SEGMENTS'],['89','TRAILS']].map(([v, l]) => (
                <div key={l}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: t.primary }}>{v}</div>
                  <div style={{ fontSize: 8, color: t.textMuted, letterSpacing: '0.1em' }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tab content */}
        {tab === 'trails' && (
          <div style={{ padding: '0 14px' }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: t.secondary, letterSpacing: '0.16em', marginBottom: 9 }}>// CURATED TRAILS</div>
            {trails.map((tr, i) => (
              <div
                key={i}
                style={{
                  marginBottom: 9,
                  marginLeft: i % 2 === 1 ? 14 : 0,
                  border: `2px solid ${t.border}`,
                  background: t.cardBg,
                  cursor: 'pointer',
                  animation: `fadeInUp 0.42s ease both`,
                  animationDelay: `${i * 0.08}s`,
                }}
              >
                <div style={{ height: 4, background: tr.color }} />
                <div style={{ padding: '9px 11px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 5 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: t.text, lineHeight: 1.2 }}>{tr.name}</div>
                    {React.createElement(window.lucide.Play, { size: 13, color: t.primary })}
                  </div>
                  <div style={{ display: 'flex', gap: 10 }}>
                    <span style={{ fontSize: 9, color: t.textMuted }}>{tr.segs} segments</span>
                    <span style={{ fontSize: 9, color: t.textMuted }}>{tr.dur}</span>
                    <span style={{ fontSize: 9, color: t.textMuted }}>{tr.author}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'my seeds' && (
          <div style={{ padding: '0 14px' }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: t.secondary, letterSpacing: '0.16em', marginBottom: 9 }}>// MY DREAM SEEDS</div>
            {[
              { title: 'Clockwork Ocean',  status: 'ACTIVE',  segs: 47, statusColor: '#4CAF50' },
              { title: 'Bone Libraries',   status: 'WEAVING', segs: 12, statusColor: t.primary },
              { title: 'Glass Epoch',      status: 'DORMANT', segs: 3,  statusColor: t.textMuted },
              { title: 'Mirror Collapse',  status: 'ACTIVE',  segs: 29, statusColor: '#4CAF50' },
            ].map((seed, i) => (
              <div
                key={i}
                style={{
                  marginBottom: 7,
                  border: `2px solid ${t.border}`,
                  background: t.cardBg,
                  padding: '9px 11px',
                  display: 'flex', alignItems: 'center', gap: 9,
                  cursor: 'pointer',
                  animation: `fadeInUp 0.4s ease both`,
                  animationDelay: `${i * 0.09}s`,
                }}
              >
                <div style={{ width: 9, height: 9, background: seed.statusColor, flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: t.text }}>{seed.title}</div>
                  <div style={{ fontSize: 8, color: t.textMuted, marginTop: 1 }}>{seed.segs} segments grown</div>
                </div>
                <div style={{ padding: '2px 6px', border: `1px solid ${seed.statusColor}` }}>
                  <span style={{ fontSize: 7, color: seed.statusColor, letterSpacing: '0.1em' }}>{seed.status}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'badges' && (
          <div style={{ padding: '0 14px 16px' }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: t.secondary, letterSpacing: '0.16em', marginBottom: 9 }}>// ACHIEVEMENTS</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 7 }}>
              {[
                { icon: '◆', name: 'FIRST SEED',   desc: 'Planted your first dream',     earned: true },
                { icon: '⟡', name: 'WEAVER',        desc: 'Added 10 dream segments',      earned: true },
                { icon: '✦', name: 'ANOMALIST',     desc: 'Blessed 5 anomaly blends',     earned: true },
                { icon: '⊕', name: 'TRAIL MAKER',   desc: 'Curated 3 dream trails',       earned: false },
                { icon: '◈', name: 'DEEP DIVER',    desc: 'Explored 100 segments',        earned: false },
                { icon: '⊞', name: 'GRAND WEAVER',  desc: 'Contributed 1K+ segments',     earned: false },
              ].map((badge, i) => (
                <div
                  key={i}
                  style={{
                    border: `2px solid ${badge.earned ? t.primary : t.border}`,
                    background: badge.earned ? (isDark ? '#1a0e06' : '#FFF8F5') : t.cardBg,
                    padding: '9px 10px',
                    opacity: badge.earned ? 1 : 0.48,
                    animation: `fadeInUp 0.4s ease both`,
                    animationDelay: `${i * 0.07}s`,
                  }}
                >
                  <div style={{ fontSize: 20, marginBottom: 4, color: badge.earned ? t.primary : t.textMuted }}>{badge.icon}</div>
                  <div style={{ fontSize: 9, fontWeight: 700, color: t.text, letterSpacing: '0.08em', marginBottom: 2 }}>{badge.name}</div>
                  <div style={{ fontSize: 8, color: t.textMuted, lineHeight: 1.4 }}>{badge.desc}</div>
                </div>
              ))}
            </div>
          </div>
        )}
        <div style={{ height: 20 }} />
      </div>
    );
  };

  // ─── ROUTER ───────────────────────────────────────────────────────────────
  const screens = { home: HomeScreen, explore: ExploreScreen, create: CreateScreen, trails: TrailsScreen };

  const navItems = [
    { id: 'home',    icon: 'Home',   label: 'HOME'    },
    { id: 'explore', icon: 'Globe',  label: 'EXPLORE' },
    { id: 'create',  icon: 'Plus',   label: 'CREATE'  },
    { id: 'trails',  icon: 'Map',    label: 'TRAILS'  },
  ];

  return (
    <>
      <style>{fontStyle}</style>
      <div style={{ minHeight: '100vh', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px 0' }}>
        <div style={{
          width: 375, height: 812,
          background: t.bg,
          borderRadius: 42,
          overflow: 'hidden',
          boxShadow: '0 48px 96px rgba(0,0,0,0.32), 0 0 0 1px rgba(0,0,0,0.12)',
          border: '8px solid #111',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
        }}>
          {/* Segmented top nav */}
          <div style={{
            background: t.navBg,
            borderBottom: `2px solid ${t.border}`,
            padding: '6px 6px',
            display: 'flex',
            gap: 4,
            flexShrink: 0,
          }}>
            {navItems.map(item => {
              const Icon = window.lucide[item.icon];
              const active = activeScreen === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setActiveScreen(item.id)}
                  style={{
                    flex: 1,
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    padding: '6px 4px',
                    cursor: 'pointer',
                    background: active ? t.primary : 'transparent',
                    border: active ? `2px solid ${t.secondary}` : '2px solid transparent',
                    transition: 'all 0.15s',
                    gap: 3,
                  }}
                >
                  {React.createElement(Icon, { size: 15, color: active ? '#fff' : t.textMuted })}
                  <span style={{ fontSize: 7, fontWeight: 700, color: active ? '#fff' : t.textMuted, letterSpacing: '0.1em' }}>{item.label}</span>
                </div>
              );
            })}
          </div>

          {/* Screen */}
          <div style={{ flex: 1, overflow: 'hidden' }}>
            {React.createElement(screens[activeScreen])}
          </div>
        </div>
      </div>
    </>
  );
}
