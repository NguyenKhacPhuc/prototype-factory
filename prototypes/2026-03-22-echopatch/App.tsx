const { useState, useEffect, useRef } = React;

// ── THEMES ─────────────────────────────────────────────────────────────────
const THEMES = {
  dark: {
    bg: '#0C0914',
    surface: '#16122A',
    surfaceAlt: '#1E1A35',
    card: '#261F3E',
    cardHigh: '#2E2748',
    text: '#EDE8FF',
    sub: '#9A94BC',
    muted: '#524E6B',
    primary: '#9D6FFF',
    primaryGlow: 'rgba(157,111,255,0.22)',
    pink: '#F070C0',
    teal: '#3DD9AC',
    amber: '#FFBB40',
    blue: '#60A5FA',
    border: 'rgba(157,111,255,0.18)',
    faint: 'rgba(255,255,255,0.05)',
    nav: '#100D20',
    tag: 'rgba(157,111,255,0.14)',
    tagText: '#9D6FFF',
    red: '#FF6B6B',
  },
  light: {
    bg: '#F0EAFF',
    surface: '#FFFFFF',
    surfaceAlt: '#EBE2FF',
    card: '#F5EEFF',
    cardHigh: '#EDE3FF',
    text: '#160F34',
    sub: '#5A5280',
    muted: '#A8A2C0',
    primary: '#7C3AED',
    primaryGlow: 'rgba(124,58,237,0.13)',
    pink: '#D6308A',
    teal: '#059669',
    amber: '#C97A06',
    blue: '#2563EB',
    border: 'rgba(124,58,237,0.18)',
    faint: 'rgba(0,0,0,0.055)',
    nav: '#FFFFFF',
    tag: 'rgba(124,58,237,0.1)',
    tagText: '#7C3AED',
    red: '#E53E3E',
  },
};

// ── SAMPLE DATA ────────────────────────────────────────────────────────────
const FRAGS = [
  { id: 1, type: 'text', content: 'the way light hits old glass differently in winter', tags: ['#light', '#texture'], time: '2m', cluster: 'Urban Textures' },
  { id: 2, type: 'voice', content: 'cities breathing at 3am — that low electric hum', tags: ['#urban', '#night'], time: '15m', cluster: 'Late Night', dur: '0:12' },
  { id: 3, type: 'photo', content: 'cracked pavement · oil rainbow', tags: ['#texture', '#color'], time: '1h', cluster: 'Urban Textures', photoColor: '#2B1D48' },
  { id: 4, type: 'text', content: 'clients always say bold but mean safe', tags: ['#brand', '#insight'], time: '2h', cluster: 'Brand Speak' },
  { id: 5, type: 'text', content: 'dried ink, almost black but warmer', tags: ['#color', '#material'], time: '3h', cluster: 'Urban Textures' },
  { id: 6, type: 'voice', content: 'nostalgia as a smell you could bottle', tags: ['#concept', '#memory'], time: '5h', cluster: 'Memory Archive', dur: '0:28' },
  { id: 7, type: 'text', content: 'rust as a feature, not a flaw', tags: ['#design', '#philosophy'], time: 'Yest.', cluster: 'Urban Textures' },
];

const CLUSTERS = [
  { id: 'c1', name: 'Urban Textures', mood: 'Contemplative', count: 5, color: '#9D6FFF', bg: 'rgba(157,111,255,0.12)', tags: ['#texture', '#material', '#urban'] },
  { id: 'c2', name: 'Late Night', mood: 'Introspective', count: 4, color: '#60A5FA', bg: 'rgba(96,165,250,0.12)', tags: ['#night', '#concept', '#city'] },
  { id: 'c3', name: 'Brand Speak', mood: 'Critical', count: 3, color: '#FFBB40', bg: 'rgba(255,187,64,0.12)', tags: ['#brand', '#client', '#insight'] },
  { id: 'c4', name: 'Memory Archive', mood: 'Nostalgic', count: 6, color: '#F070C0', bg: 'rgba(240,112,192,0.12)', tags: ['#memory', '#time', '#emotion'] },
];

const FORGE_OUTPUTS = [
  { type: 'Story Seed', icon: 'BookOpen', color: '#9D6FFF', content: "A city archivist discovers that surfaces hold emotional imprints from everyone who's touched them. Cracked pavement carries grief; old glass holds longing. When she reads the city like a book, she finds the oldest textures carry a message addressed specifically to her.", tags: ['literary fiction', 'urban fantasy', '~2,400 words'] },
  { type: 'Campaign Brief', icon: 'Target', color: '#F070C0', content: "'Earned Imperfection' — A heritage brand campaign celebrating things that age with beauty. Extreme close-up photography of worn, patinated surfaces. Tagline: Made to outlast perfect. Audience: creatives 28–42 who reject disposable aesthetics.", tags: ['brand strategy', 'print + social'] },
  { type: 'Design Brief', icon: 'Palette', color: '#3DD9AC', content: "Identity direction: Industrial Warmth. Palette — deep charcoal #1A1A1A, rust clay #B05C3A, worn white #F5F0E8. Typography: slightly imperfect serif + clean geometric mono. Texture overlays throughout. Handmade feeling, never precious.", tags: ['brand identity', 'visual language'] },
  { type: 'Concept Prompt', icon: 'Lightbulb', color: '#FFBB40', content: "App: A city texture map where users photograph surfaces and the app builds an emotional topography of neighborhoods over time. Neighborhoods develop visual signatures. Gentrification shows in the texture shift. The city becomes readable, legible, emotional.", tags: ['product concept', 'UX idea'] },
];

const BOARDS = [
  {
    name: 'Urban Textures', color: '#9D6FFF',
    palette: ['#1A1A1A', '#2C2018', '#4A3525', '#8B6347', '#B8956A', '#E8D5B0'],
    photos: [
      { color: '#1E1530', label: 'cracked pavement' },
      { color: '#3D2B1F', label: 'rusted gate' },
      { color: '#141828', label: 'old glass' },
      { color: '#2E1E14', label: 'worn leather' },
    ],
    fragments: ['the way light hits old glass differently in winter', 'dried ink, almost black but warmer', 'rust as a feature, not a flaw'],
    mood: 'Contemplative · Industrial Warmth',
  },
  {
    name: 'Late Night', color: '#60A5FA',
    palette: ['#0A0E1A', '#141B2D', '#1E2D4A', '#2E4A7A', '#4A6FA5', '#A8C4F0'],
    photos: [
      { color: '#06090F', label: 'wet asphalt' },
      { color: '#1A2744', label: 'neon blur' },
      { color: '#0E1525', label: 'empty platform' },
      { color: '#1C2E50', label: '3am window' },
    ],
    fragments: ['cities breathing at 3am — that low electric hum', 'nostalgia as a smell you could bottle', 'the silence between traffic lights'],
    mood: 'Introspective · Quiet Urban',
  },
];

// ── ICON HELPER ────────────────────────────────────────────────────────────
const Icon = ({ name, size = 20, color, sw = 1.8 }) => {
  const C = window.lucide && window.lucide[name];
  if (!C) return null;
  return React.createElement(C, { size, color, strokeWidth: sw });
};

const Pill = ({ label, color, bg }) =>
  React.createElement('span', {
    style: { fontSize: 11, fontWeight: 600, color, background: bg || color + '18', padding: '2px 8px', borderRadius: 20, letterSpacing: '0.02em', whiteSpace: 'nowrap' },
  }, label);

const TypeChip = ({ type, t }) => {
  const map = { text: ['Type', t.primary], voice: ['Mic', t.pink], photo: ['Image', t.teal], sound: ['Music', t.amber] };
  const [icon, color] = map[type] || ['FileText', t.primary];
  return React.createElement('div', {
    style: { width: 32, height: 32, borderRadius: 10, background: color + '1E', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: `1px solid ${color}30` },
  }, React.createElement(Icon, { name: icon, size: 14, color }));
};

// ── STATUS BAR ─────────────────────────────────────────────────────────────
const StatusBar = ({ t }) => {
  const now = new Date();
  const time = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
  return React.createElement('div', {
    style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 22px 2px', flexShrink: 0 },
  },
    React.createElement('span', { style: { fontSize: 13, fontWeight: 700, color: t.text } }, time),
    React.createElement('div', { style: { display: 'flex', gap: 5, alignItems: 'center' } },
      React.createElement(Icon, { name: 'Signal', size: 13, color: t.sub }),
      React.createElement(Icon, { name: 'Wifi', size: 13, color: t.sub }),
      React.createElement(Icon, { name: 'Battery', size: 13, color: t.sub }),
    ),
  );
};

// ── DYNAMIC ISLAND ─────────────────────────────────────────────────────────
const DynamicIsland = () =>
  React.createElement('div', {
    style: { display: 'flex', justifyContent: 'center', marginBottom: 6 },
  },
    React.createElement('div', { style: { width: 120, height: 32, background: '#000', borderRadius: 20 } }),
  );

// ── CATCH SCREEN ───────────────────────────────────────────────────────────
const CatchScreen = ({ t }) => {
  const [pressed, setPressed] = useState(null);
  const [added, setAdded] = useState(false);

  const captureTypes = [
    { key: 'text', label: 'Text', icon: 'Type', color: t.primary },
    { key: 'voice', label: 'Voice', icon: 'Mic', color: t.pink },
    { key: 'photo', label: 'Photo', icon: 'Camera', color: t.teal },
    { key: 'sound', label: 'Sound', icon: 'Music', color: t.amber },
  ];

  const handleCapture = (key) => {
    setAdded(key);
    setTimeout(() => setAdded(null), 1400);
  };

  return React.createElement('div', { style: { flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' } },
    // Header
    React.createElement('div', { style: { padding: '10px 20px 6px' } },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' } },
        React.createElement('div', null,
          React.createElement('div', { style: { fontSize: 22, fontWeight: 800, color: t.text, letterSpacing: '-0.5px' } }, 'EchoPatch'),
          React.createElement('div', { style: { fontSize: 12, color: t.sub, marginTop: 2 } }, '7 fragments captured today'),
        ),
        React.createElement('div', {
          style: { background: t.primaryGlow, border: `1.5px solid ${t.border}`, borderRadius: 12, padding: '4px 10px', fontSize: 12, fontWeight: 700, color: t.primary, display: 'flex', alignItems: 'center', gap: 4 },
        },
          React.createElement(Icon, { name: 'Zap', size: 12, color: t.primary }),
          '3-day streak',
        ),
      ),
    ),

    // Capture strip
    React.createElement('div', { style: { padding: '6px 16px' } },
      React.createElement('div', {
        style: { background: t.surface, borderRadius: 20, padding: '10px 12px', border: `1px solid ${t.faint}`, display: 'flex', gap: 4 },
      },
        captureTypes.map(({ key, label, icon, color }) =>
          React.createElement('button', {
            key,
            onMouseDown: () => setPressed(key),
            onMouseUp: () => setPressed(null),
            onMouseLeave: () => setPressed(null),
            onClick: () => handleCapture(key),
            style: {
              flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5,
              background: added === key ? color + '22' : pressed === key ? t.faint : 'transparent',
              border: 'none', cursor: 'pointer', padding: '8px 4px', borderRadius: 14,
              transform: pressed === key ? 'scale(0.93)' : 'scale(1)',
              transition: 'transform 0.1s, background 0.15s',
            },
          },
            React.createElement('div', {
              style: { width: 40, height: 40, borderRadius: 13, background: color + '1E', display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1.5px solid ${color}30` },
            }, React.createElement(Icon, { name: added === key ? 'Check' : icon, size: 17, color })),
            React.createElement('span', { style: { fontSize: 11, fontWeight: 600, color: t.sub } }, label),
          ),
        ),
      ),
    ),

    // Flash message
    added && React.createElement('div', {
      style: { margin: '4px 16px 0', padding: '8px 14px', background: t.primaryGlow, borderRadius: 12, border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', gap: 8, animation: 'fadeIn 0.2s' },
    },
      React.createElement(Icon, { name: 'Sparkles', size: 13, color: t.primary }),
      React.createElement('span', { style: { fontSize: 12, color: t.primary, fontWeight: 600 } }, 'Fragment captured — Pattern Weave is watching'),
    ),

    // Fragment list
    React.createElement('div', { style: { padding: '10px 16px 16px', flex: 1 } },
      React.createElement('div', { style: { fontSize: 11, fontWeight: 700, color: t.muted, letterSpacing: '0.09em', marginBottom: 8, paddingLeft: 2 } }, 'RECENT FRAGMENTS'),
      FRAGS.map(frag =>
        React.createElement('div', {
          key: frag.id,
          style: { background: t.surface, borderRadius: 14, padding: '11px 13px', marginBottom: 7, border: `1px solid ${t.faint}`, display: 'flex', gap: 11, alignItems: 'flex-start' },
        },
          frag.type === 'photo'
            ? React.createElement('div', {
                style: { width: 32, height: 32, borderRadius: 10, background: frag.photoColor || '#2B1D48', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.08)' },
              }, React.createElement(Icon, { name: 'Image', size: 13, color: 'rgba(255,255,255,0.55)' }))
            : React.createElement(TypeChip, { type: frag.type, t }),
          React.createElement('div', { style: { flex: 1, minWidth: 0 } },
            React.createElement('p', {
              style: { margin: 0, fontSize: 13, lineHeight: 1.42, color: t.text, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' },
            }, frag.type === 'voice' ? `"${frag.content}"` : frag.content),
            React.createElement('div', { style: { display: 'flex', gap: 5, marginTop: 5, flexWrap: 'wrap', alignItems: 'center' } },
              frag.tags.map(tag => React.createElement(Pill, { key: tag, label: tag, color: t.tagText, bg: t.tag })),
              frag.type === 'voice' && React.createElement('span', { style: { fontSize: 10, color: t.muted } }, frag.dur),
            ),
          ),
          React.createElement('span', { style: { fontSize: 10, color: t.muted, flexShrink: 0, marginTop: 2 } }, frag.time),
        ),
      ),
    ),
  );
};

// ── WEAVE SCREEN ───────────────────────────────────────────────────────────
const WeaveScreen = ({ t }) => {
  const [selected, setSelected] = useState(null);

  return React.createElement('div', { style: { flex: 1, overflowY: 'auto' } },
    React.createElement('div', { style: { padding: '10px 20px 6px' } },
      React.createElement('div', { style: { fontSize: 22, fontWeight: 800, color: t.text, letterSpacing: '-0.5px' } }, 'Pattern Weave'),
      React.createElement('div', { style: { fontSize: 13, color: t.sub, marginTop: 2 } }, 'Hidden connections in your material'),
    ),

    // AI insight banner
    React.createElement('div', {
      style: { margin: '4px 16px 12px', padding: '10px 14px', background: t.primaryGlow, borderRadius: 13, border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', gap: 10 },
    },
      React.createElement(Icon, { name: 'Sparkles', size: 14, color: t.primary }),
      React.createElement('span', { style: { fontSize: 12, color: t.primary, fontWeight: 600 } }, '4 new cross-cluster connections found this week'),
    ),

    // Cluster list
    React.createElement('div', { style: { padding: '0 16px 16px' } },
      React.createElement('div', { style: { fontSize: 11, fontWeight: 700, color: t.muted, letterSpacing: '0.09em', marginBottom: 10, paddingLeft: 2 } }, 'IDEA CLUSTERS'),

      CLUSTERS.map(cluster =>
        React.createElement('div', {
          key: cluster.id,
          onClick: () => setSelected(selected === cluster.id ? null : cluster.id),
          style: {
            background: selected === cluster.id ? cluster.bg : t.surface,
            borderRadius: 16, padding: '13px 15px', marginBottom: 9,
            border: `1.5px solid ${selected === cluster.id ? cluster.color + '55' : t.faint}`,
            cursor: 'pointer', transition: 'all 0.15s',
          },
        },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 } },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10 } },
              React.createElement('div', {
                style: { width: 36, height: 36, borderRadius: 12, background: cluster.color + '22', display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1.5px solid ${cluster.color}44` },
              }, React.createElement('div', { style: { width: 10, height: 10, borderRadius: '50%', background: cluster.color } })),
              React.createElement('div', null,
                React.createElement('div', { style: { fontSize: 15, fontWeight: 700, color: t.text } }, cluster.name),
                React.createElement('div', { style: { fontSize: 11, color: t.sub, marginTop: 1 } }, `${cluster.mood} · ${cluster.count} fragments`),
              ),
            ),
            React.createElement('div', {
              style: { transform: selected === cluster.id ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.2s' },
            }, React.createElement(Icon, { name: 'ChevronRight', size: 18, color: t.muted })),
          ),

          React.createElement('div', { style: { display: 'flex', gap: 5 } },
            cluster.tags.map(tag =>
              React.createElement(Pill, { key: tag, label: tag, color: cluster.color, bg: cluster.color + '18' }),
            ),
          ),

          // Progress bar row
          React.createElement('div', { style: { display: 'flex', gap: 3, marginTop: 10 } },
            Array.from({ length: cluster.count }).map((_, i) =>
              React.createElement('div', {
                key: i,
                style: { height: 3, borderRadius: 2, flex: i === 0 ? 2 : 1, background: i < 2 ? cluster.color : cluster.color + '35' },
              }),
            ),
          ),

          // Expanded view
          selected === cluster.id && React.createElement('div', {
            style: { marginTop: 12, paddingTop: 12, borderTop: `1px solid ${cluster.color}22` },
          },
            React.createElement('div', { style: { fontSize: 11, fontWeight: 700, color: t.muted, letterSpacing: '0.08em', marginBottom: 6 } }, 'FRAGMENTS IN THIS CLUSTER'),
            FRAGS.filter(f => f.cluster === cluster.name).map(frag =>
              React.createElement('div', {
                key: frag.id,
                style: { fontSize: 12, color: t.sub, lineHeight: 1.4, padding: '5px 0', borderBottom: `1px solid ${t.faint}`, display: 'flex', gap: 8, alignItems: 'center' },
              },
                React.createElement('div', { style: { width: 5, height: 5, borderRadius: '50%', background: cluster.color, flexShrink: 0 } }),
                React.createElement('span', { style: { color: t.text } }, frag.content),
              ),
            ),
            React.createElement('button', {
              style: { marginTop: 10, width: '100%', padding: '8px', background: cluster.color + '22', border: `1px solid ${cluster.color}44`, borderRadius: 10, color: cluster.color, fontSize: 12, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 },
            },
              React.createElement(Icon, { name: 'Wand2', size: 13, color: cluster.color }),
              'Forge outputs from this cluster',
            ),
          ),
        ),
      ),

      React.createElement('button', {
        style: { width: '100%', padding: '12px', background: 'transparent', border: `1.5px dashed ${t.border}`, borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, cursor: 'pointer', color: t.muted, fontSize: 13, fontWeight: 600 },
      },
        React.createElement(Icon, { name: 'Plus', size: 15, color: t.muted }),
        'Create cluster manually',
      ),
    ),
  );
};

// ── FORGE SCREEN ───────────────────────────────────────────────────────────
const ForgeScreen = ({ t }) => {
  const [selectedCluster, setSelectedCluster] = useState('c1');
  const [activeOutput, setActiveOutput] = useState(0);
  const [generating, setGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const cluster = CLUSTERS.find(c => c.id === selectedCluster);
  const output = FORGE_OUTPUTS[activeOutput];

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => setGenerating(false), 1300);
  };

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return React.createElement('div', { style: { flex: 1, overflowY: 'auto' } },
    React.createElement('div', { style: { padding: '10px 20px 6px' } },
      React.createElement('div', { style: { fontSize: 22, fontWeight: 800, color: t.text, letterSpacing: '-0.5px' } }, 'Prompt Forge'),
      React.createElement('div', { style: { fontSize: 13, color: t.sub, marginTop: 2 } }, 'Transform fragments into creative outputs'),
    ),

    // Cluster selector
    React.createElement('div', { style: { padding: '4px 16px 6px', display: 'flex', gap: 7, overflowX: 'auto' } },
      CLUSTERS.map(c =>
        React.createElement('button', {
          key: c.id,
          onClick: () => setSelectedCluster(c.id),
          style: {
            padding: '5px 13px', borderRadius: 20, flexShrink: 0,
            background: selectedCluster === c.id ? c.color : t.surface,
            color: selectedCluster === c.id ? '#fff' : t.sub,
            border: `1.5px solid ${selectedCluster === c.id ? c.color : t.faint}`,
            fontSize: 12, fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s',
          },
        }, c.name),
      ),
    ),

    // Output type selector
    React.createElement('div', { style: { padding: '6px 16px 10px', display: 'flex', gap: 6 } },
      FORGE_OUTPUTS.map((f, i) =>
        React.createElement('button', {
          key: i,
          onClick: () => setActiveOutput(i),
          style: {
            padding: '4px 11px', borderRadius: 20, flexShrink: 0,
            background: activeOutput === i ? f.color + '22' : 'transparent',
            color: activeOutput === i ? f.color : t.muted,
            border: `1px solid ${activeOutput === i ? f.color + '55' : 'transparent'}`,
            fontSize: 11, fontWeight: 700, cursor: 'pointer', letterSpacing: '0.02em',
          },
        }, f.type),
      ),
    ),

    // Main output card
    React.createElement('div', { style: { padding: '0 16px' } },
      React.createElement('div', {
        style: { background: t.surface, borderRadius: 18, overflow: 'hidden', border: `1px solid ${output.color}33`, boxShadow: `0 0 40px ${output.color}12` },
      },
        // Card header
        React.createElement('div', {
          style: { background: `linear-gradient(135deg, ${output.color}22 0%, ${output.color}08 100%)`, padding: '13px 16px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: `1px solid ${output.color}22` },
        },
          React.createElement('div', {
            style: { width: 36, height: 36, borderRadius: 11, background: output.color + '22', display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1.5px solid ${output.color}44` },
          }, React.createElement(Icon, { name: output.icon, size: 16, color: output.color })),
          React.createElement('div', null,
            React.createElement('div', { style: { fontSize: 14, fontWeight: 800, color: t.text } }, output.type),
            React.createElement('div', { style: { fontSize: 11, color: t.sub } }, `Source · ${cluster?.name}`),
          ),
        ),

        // Content
        React.createElement('div', { style: { padding: '15px 16px' } },
          React.createElement('p', {
            style: { margin: 0, fontSize: 13.5, lineHeight: 1.68, color: generating ? t.muted : t.text, transition: 'color 0.3s', fontStyle: generating ? 'italic' : 'normal' },
          }, generating ? 'Weaving new fragments together...' : output.content),

          React.createElement('div', { style: { display: 'flex', gap: 6, marginTop: 13, flexWrap: 'wrap' } },
            output.tags.map(tag => React.createElement(Pill, { key: tag, label: tag, color: output.color })),
          ),

          // Action row
          React.createElement('div', { style: { display: 'flex', gap: 7, marginTop: 15 } },
            React.createElement('button', {
              onClick: handleGenerate,
              style: { flex: 1, padding: '10px', borderRadius: 12, background: `linear-gradient(135deg, ${t.primary} 0%, ${t.primary}BB 100%)`, color: '#fff', border: 'none', fontSize: 13, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 },
            },
              React.createElement(Icon, { name: generating ? 'Loader' : 'RefreshCw', size: 14, color: '#fff' }),
              generating ? 'Forging...' : 'Regenerate',
            ),
            React.createElement('button', {
              onClick: handleCopy,
              style: { padding: '10px 13px', borderRadius: 12, background: copied ? t.primary + '22' : t.faint, color: copied ? t.primary : t.sub, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' },
            }, React.createElement(Icon, { name: copied ? 'Check' : 'Copy', size: 15, color: copied ? t.primary : t.sub })),
            React.createElement('button', {
              style: { padding: '10px 13px', borderRadius: 12, background: t.faint, color: t.sub, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' },
            }, React.createElement(Icon, { name: 'Share2', size: 15, color: t.sub })),
          ),
        ),
      ),
    ),

    // Remix Export
    React.createElement('div', { style: { padding: '16px' } },
      React.createElement('div', { style: { fontSize: 11, fontWeight: 700, color: t.muted, letterSpacing: '0.09em', marginBottom: 10 } }, 'REMIX & EXPORT'),
      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 } },
        [
          { label: 'One-page pitch', icon: 'FileText', color: t.primary },
          { label: 'Storyboard', icon: 'Film', color: t.pink },
          { label: 'Social post', icon: 'Share2', color: t.teal },
          { label: 'Mood doc', icon: 'Layers', color: t.amber },
        ].map(({ label, icon, color }) =>
          React.createElement('button', {
            key: label,
            style: { padding: '12px 12px', borderRadius: 14, background: t.surface, border: `1px solid ${t.faint}`, display: 'flex', alignItems: 'center', gap: 9, cursor: 'pointer' },
          },
            React.createElement('div', {
              style: { width: 28, height: 28, borderRadius: 8, background: color + '22', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
            }, React.createElement(Icon, { name: icon, size: 13, color })),
            React.createElement('span', { style: { fontSize: 12, fontWeight: 600, color: t.text, textAlign: 'left', lineHeight: 1.3 } }, label),
          ),
        ),
      ),
    ),
  );
};

// ── BOARD SCREEN ───────────────────────────────────────────────────────────
const BoardScreen = ({ t }) => {
  const [activeBoard, setActiveBoard] = useState(0);
  const board = BOARDS[activeBoard];

  return React.createElement('div', { style: { flex: 1, overflowY: 'auto' } },
    React.createElement('div', { style: { padding: '10px 20px 6px' } },
      React.createElement('div', { style: { fontSize: 22, fontWeight: 800, color: t.text, letterSpacing: '-0.5px' } }, 'Living Moodboard'),
      React.createElement('div', { style: { fontSize: 13, color: t.sub, marginTop: 2 } }, 'Auto-assembled from your fragments'),
    ),

    // Board tabs
    React.createElement('div', { style: { padding: '4px 16px 10px', display: 'flex', gap: 7 } },
      BOARDS.map((b, i) =>
        React.createElement('button', {
          key: i,
          onClick: () => setActiveBoard(i),
          style: {
            padding: '5px 15px', borderRadius: 20,
            background: activeBoard === i ? b.color : t.surface,
            color: activeBoard === i ? '#fff' : t.sub,
            border: `1.5px solid ${activeBoard === i ? b.color : t.faint}`,
            fontSize: 12, fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s',
          },
        }, b.name),
      ),
    ),

    // Photo grid (2 cols)
    React.createElement('div', { style: { padding: '0 16px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 12 } },
      board.photos.map((p, i) =>
        React.createElement('div', {
          key: i,
          style: {
            height: i < 2 ? 100 : 72, borderRadius: 14, background: p.color, position: 'relative',
            display: 'flex', alignItems: 'flex-end', overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.06)',
          },
        },
          React.createElement('div', {
            style: { position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 55%)' },
          }),
          React.createElement('span', {
            style: { position: 'relative', fontSize: 10, color: 'rgba(255,255,255,0.82)', padding: '6px 8px', fontWeight: 500 },
          }, p.label),
        ),
      ),
    ),

    // Palette
    React.createElement('div', { style: { padding: '0 16px 12px' } },
      React.createElement('div', { style: { fontSize: 11, fontWeight: 700, color: t.muted, letterSpacing: '0.09em', marginBottom: 8 } }, 'EXTRACTED PALETTE'),
      React.createElement('div', { style: { display: 'flex', height: 38, borderRadius: 12, overflow: 'hidden' } },
        board.palette.map((c, i) =>
          React.createElement('div', { key: i, style: { flex: 1, background: c } }),
        ),
      ),
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginTop: 5 } },
        board.palette.map((c, i) =>
          React.createElement('span', { key: i, style: { fontSize: 9, color: t.muted } }, c),
        ),
      ),
    ),

    // Mood tag
    React.createElement('div', {
      style: { margin: '0 16px 12px', padding: '10px 14px', background: t.surface, borderRadius: 12, border: `1px solid ${t.faint}`, display: 'flex', alignItems: 'center', gap: 10 },
    },
      React.createElement('div', { style: { width: 8, height: 8, borderRadius: '50%', background: board.color, flexShrink: 0 } }),
      React.createElement('span', { style: { fontSize: 13, color: t.sub, fontWeight: 500 } }, board.mood),
    ),

    // Fragment quotes
    React.createElement('div', { style: { padding: '0 16px 8px' } },
      React.createElement('div', { style: { fontSize: 11, fontWeight: 700, color: t.muted, letterSpacing: '0.09em', marginBottom: 8 } }, 'SOURCE FRAGMENTS'),
      board.fragments.map((f, i) =>
        React.createElement('div', {
          key: i,
          style: { padding: '9px 13px', background: t.surface, borderRadius: 12, border: `1px solid ${t.faint}`, marginBottom: 6, display: 'flex', gap: 10, alignItems: 'center' },
        },
          React.createElement('div', { style: { width: 3, borderRadius: 2, alignSelf: 'stretch', minHeight: 14, background: board.color, flexShrink: 0 } }),
          React.createElement('span', { style: { fontSize: 12, color: t.text, lineHeight: 1.42, fontStyle: 'italic' } }, `"${f}"`),
        ),
      ),
    ),

    // Export
    React.createElement('div', { style: { padding: '8px 16px 20px' } },
      React.createElement('button', {
        style: { width: '100%', padding: '13px', background: `linear-gradient(135deg, ${board.color} 0%, ${board.color}99 100%)`, borderRadius: 14, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, color: '#fff', fontSize: 14, fontWeight: 700 },
      },
        React.createElement(Icon, { name: 'Download', size: 16, color: '#fff' }),
        'Export Moodboard',
      ),
    ),
  );
};

// ── SETTINGS SCREEN ────────────────────────────────────────────────────────
const SettingsScreen = ({ t, theme, setTheme }) => {
  const [notifications, setNotifications] = useState(true);
  const [autoGroup, setAutoGroup] = useState(true);

  const Toggle = ({ value, onChange, color }) =>
    React.createElement('button', {
      onClick: () => onChange(!value),
      style: { width: 46, height: 26, borderRadius: 13, background: value ? (color || t.primary) : t.faint, border: 'none', cursor: 'pointer', position: 'relative', transition: 'background 0.22s', flexShrink: 0 },
    },
      React.createElement('div', {
        style: { width: 20, height: 20, borderRadius: '50%', background: '#fff', position: 'absolute', top: 3, left: value ? 23 : 3, transition: 'left 0.22s', boxShadow: '0 1px 4px rgba(0,0,0,0.3)' },
      }),
    );

  const Row = ({ icon, iconColor, title, subtitle, right }) =>
    React.createElement('div', {
      style: { padding: '13px 15px', display: 'flex', alignItems: 'center', gap: 12, borderBottom: `1px solid ${t.faint}` },
    },
      React.createElement('div', {
        style: { width: 32, height: 32, borderRadius: 10, background: (iconColor || t.primary) + '1E', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
      }, React.createElement(Icon, { name: icon, size: 15, color: iconColor || t.primary })),
      React.createElement('div', { style: { flex: 1 } },
        React.createElement('div', { style: { fontSize: 14, fontWeight: 600, color: t.text } }, title),
        subtitle && React.createElement('div', { style: { fontSize: 11, color: t.muted, marginTop: 1 } }, subtitle),
      ),
      right,
    );

  return React.createElement('div', { style: { flex: 1, overflowY: 'auto', padding: '10px 0 20px' } },
    React.createElement('div', { style: { padding: '2px 20px 12px' } },
      React.createElement('div', { style: { fontSize: 22, fontWeight: 800, color: t.text, letterSpacing: '-0.5px' } }, 'Settings'),
    ),

    // Profile card
    React.createElement('div', {
      style: { margin: '0 16px 16px', background: `linear-gradient(135deg, ${t.primary}22 0%, ${t.pink}18 100%)`, borderRadius: 18, padding: '16px', border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', gap: 14 },
    },
      React.createElement('div', {
        style: { width: 50, height: 50, borderRadius: 18, background: `linear-gradient(135deg, ${t.primary}, ${t.pink})`, display: 'flex', alignItems: 'center', justifyContent: 'center' },
      }, React.createElement('span', { style: { fontSize: 22, fontWeight: 800, color: '#fff' } }, 'A')),
      React.createElement('div', null,
        React.createElement('div', { style: { fontSize: 16, fontWeight: 700, color: t.text } }, 'Alex Reeve'),
        React.createElement('div', { style: { fontSize: 12, color: t.sub } }, 'Creative · 3-day streak 🔥'),
      ),
    ),

    // Stats
    React.createElement('div', {
      style: { margin: '0 16px 16px', background: t.surface, borderRadius: 16, border: `1px solid ${t.faint}`, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', overflow: 'hidden' },
    },
      [{ value: '47', label: 'Fragments' }, { value: '8', label: 'Clusters' }, { value: '23', label: 'Outputs' }].map(({ value, label }, i) =>
        React.createElement('div', {
          key: label,
          style: { padding: '14px', textAlign: 'center', borderRight: i < 2 ? `1px solid ${t.faint}` : 'none' },
        },
          React.createElement('div', { style: { fontSize: 22, fontWeight: 800, color: t.primary } }, value),
          React.createElement('div', { style: { fontSize: 11, color: t.muted, marginTop: 2 } }, label),
        ),
      ),
    ),

    // Appearance section
    React.createElement('div', { style: { fontSize: 11, fontWeight: 700, color: t.muted, letterSpacing: '0.09em', margin: '4px 20px 8px', paddingTop: 4 } }, 'APPEARANCE'),
    React.createElement('div', { style: { margin: '0 16px', background: t.surface, borderRadius: 16, border: `1px solid ${t.faint}`, overflow: 'hidden' } },
      React.createElement(Row, {
        icon: theme === 'dark' ? 'Moon' : 'Sun', iconColor: theme === 'dark' ? t.blue : t.amber,
        title: 'Theme', subtitle: theme === 'dark' ? 'Dark mode active' : 'Light mode active',
        right: React.createElement(Toggle, { value: theme === 'dark', onChange: (v) => setTheme(v ? 'dark' : 'light'), color: t.primary }),
      }),
    ),

    // Preferences
    React.createElement('div', { style: { fontSize: 11, fontWeight: 700, color: t.muted, letterSpacing: '0.09em', margin: '16px 20px 8px' } }, 'PREFERENCES'),
    React.createElement('div', { style: { margin: '0 16px', background: t.surface, borderRadius: 16, border: `1px solid ${t.faint}`, overflow: 'hidden' } },
      React.createElement(Row, {
        icon: 'Bell', iconColor: t.pink, title: 'Capture reminders', subtitle: 'Daily nudge at 9am',
        right: React.createElement(Toggle, { value: notifications, onChange: setNotifications, color: t.pink }),
      }),
      React.createElement(Row, {
        icon: 'GitBranch', iconColor: t.teal, title: 'Auto-group fragments', subtitle: 'Pattern Weave AI',
        right: React.createElement(Toggle, { value: autoGroup, onChange: setAutoGroup, color: t.teal }),
      }),
      React.createElement('div', {
        style: { padding: '13px 15px', display: 'flex', alignItems: 'center', gap: 12 },
      },
        React.createElement('div', {
          style: { width: 32, height: 32, borderRadius: 10, background: t.amber + '1E', display: 'flex', alignItems: 'center', justifyContent: 'center' },
        }, React.createElement(Icon, { name: 'Layers', size: 15, color: t.amber })),
        React.createElement('div', { style: { flex: 1 } },
          React.createElement('div', { style: { fontSize: 14, fontWeight: 600, color: t.text } }, 'Export format'),
          React.createElement('div', { style: { fontSize: 11, color: t.muted, marginTop: 1 } }, 'Markdown + PDF'),
        ),
        React.createElement(Icon, { name: 'ChevronRight', size: 16, color: t.muted }),
      ),
    ),

    // About
    React.createElement('div', { style: { fontSize: 11, fontWeight: 700, color: t.muted, letterSpacing: '0.09em', margin: '16px 20px 8px' } }, 'ABOUT'),
    React.createElement('div', { style: { margin: '0 16px', background: t.surface, borderRadius: 16, border: `1px solid ${t.faint}`, padding: '14px 16px' } },
      React.createElement('div', { style: { fontSize: 15, fontWeight: 800, color: t.text } }, 'EchoPatch'),
      React.createElement('div', { style: { fontSize: 12, color: t.sub, marginTop: 3 } }, 'Turn scattered moments into made ideas.'),
      React.createElement('div', { style: { fontSize: 11, color: t.muted, marginTop: 8 } }, 'v1.0.0-beta · Pattern Weave AI Engine'),
    ),
  );
};

// ── MAIN APP ───────────────────────────────────────────────────────────────
function App() {
  const [theme, setTheme] = useState('dark');
  const [tab, setTab] = useState('catch');
  const t = THEMES[theme];

  useEffect(() => {
    const el = document.createElement('style');
    el.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&display=swap');
      * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
      ::-webkit-scrollbar { display: none; }
      body { margin: 0; }
    `;
    document.head.appendChild(el);
    return () => el.remove();
  }, []);

  const navItems = [
    { key: 'catch', icon: 'Inbox', label: 'Catch' },
    { key: 'weave', icon: 'GitBranch', label: 'Weave' },
    { key: 'forge', icon: 'Wand2', label: 'Forge' },
    { key: 'board', icon: 'LayoutGrid', label: 'Board' },
    { key: 'settings', icon: 'Settings', label: 'Settings' },
  ];

  const renderScreen = () => {
    const props = { t, theme, setTheme };
    switch (tab) {
      case 'catch': return React.createElement(CatchScreen, props);
      case 'weave': return React.createElement(WeaveScreen, props);
      case 'forge': return React.createElement(ForgeScreen, props);
      case 'board': return React.createElement(BoardScreen, props);
      case 'settings': return React.createElement(SettingsScreen, props);
      default: return null;
    }
  };

  return React.createElement('div', {
    style: { width: '100vw', minHeight: '100vh', background: '#E4DDF5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Space Grotesk', sans-serif" },
  },
    React.createElement('div', {
      style: {
        width: 375, height: 812,
        background: t.bg,
        borderRadius: 54,
        overflow: 'hidden',
        position: 'relative',
        boxShadow: '0 50px 130px rgba(0,0,0,0.55), 0 0 0 1.5px rgba(255,255,255,0.08), inset 0 0 0 1px rgba(255,255,255,0.04)',
        display: 'flex',
        flexDirection: 'column',
        transition: 'background 0.3s',
      },
    },
      React.createElement(StatusBar, { t }),
      React.createElement(DynamicIsland, null),

      // Screen area
      React.createElement('div', { style: { flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', position: 'relative' } },
        renderScreen(),
      ),

      // Nav bar
      React.createElement('div', {
        style: { background: t.nav, borderTop: `1px solid ${t.faint}`, padding: '8px 4px 22px', display: 'flex', justifyContent: 'space-around', flexShrink: 0, transition: 'background 0.3s' },
      },
        navItems.map(({ key, icon, label }) =>
          React.createElement('button', {
            key,
            onClick: () => setTab(key),
            style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, background: 'none', border: 'none', cursor: 'pointer', padding: '5px 10px', borderRadius: 12, outline: 'none' },
          },
            React.createElement('div', {
              style: { width: 30, height: 30, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', background: tab === key ? t.primaryGlow : 'transparent', transition: 'background 0.2s' },
            },
              React.createElement(Icon, { name: icon, size: 19, color: tab === key ? t.primary : t.muted }),
            ),
            React.createElement('span', {
              style: { fontSize: 10, fontWeight: 700, color: tab === key ? t.primary : t.muted, transition: 'color 0.2s' },
            }, label),
          ),
        ),
      ),
    ),
  );
}
