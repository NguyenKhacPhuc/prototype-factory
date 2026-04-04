// Cognito Remix — Interactive Prototype
// Design: Duotone Graphic | Teal + Burnt Orange + Electric Indigo | Lexend Font

const { useState, useEffect, useRef } = React;

// ─── THEMES ────────────────────────────────────────────────────────────────
const THEMES = {
  dark: {
    bg: '#0F0F16', surface: '#1A1A24', surfaceAlt: '#22222E', surfaceHover: '#2A2A38',
    teal: '#0ED8D8', tealDim: '#0A4F4F', orange: '#FF6B35', orangeDim: '#5A2510',
    indigo: '#818CF8', indigoDim: '#312E81',
    text: '#EDE8E0', textMuted: '#7A7A8E', textDim: '#3E3E52', border: '#2A2A38', borderBright: '#3A3A4E',
  },
  light: {
    bg: '#F5F0E8', surface: '#FFFFFF', surfaceAlt: '#EDE8DF', surfaceHover: '#E5DFD5',
    teal: '#0D7B80', tealDim: '#CCEEF0', orange: '#C2542D', orangeDim: '#F5DDD5',
    indigo: '#4338CA', indigoDim: '#E0E7FF',
    text: '#2D2D3A', textMuted: '#6B6B7E', textDim: '#C0BFCC', border: '#D8D2C8', borderBright: '#C5BEB2',
  }
};

// ─── DATA ──────────────────────────────────────────────────────────────────
const STEMS = {
  science: [
    { id: 's1', type: 'fact', text: 'Photosynthesis converts light energy into chemical energy stored in glucose', tags: ['biology', 'energy'] },
    { id: 's2', type: 'principle', text: 'Entropy always increases in a closed system — disorder is destiny', tags: ['thermodynamics', 'physics'] },
    { id: 's3', type: 'metaphor', text: 'DNA as a recipe book — each gene a different dish for the cell kitchen', tags: ['genetics', 'analogy'] },
    { id: 's4', type: 'fact', text: 'Neurons fire in patterns that create memory through synaptic strengthening', tags: ['neuroscience', 'memory'] },
    { id: 's5', type: 'concept', text: 'Emergence: complex behavior arising from simple, repeated rules', tags: ['systems', 'complexity'] },
  ],
  history: [
    { id: 'h1', type: 'event', text: 'The printing press democratized knowledge in the 15th century, breaking clerical monopoly', tags: ['technology', 'democracy'] },
    { id: 'h2', type: 'quote', text: '"Those who cannot remember the past are condemned to repeat it." — Santayana', tags: ['wisdom', 'cycles'] },
    { id: 'h3', type: 'pattern', text: 'Empires tend to overextend — Roman, Mongol, British all followed this fatal arc', tags: ['decline', 'power'] },
    { id: 'h4', type: 'event', text: 'The Black Death reshaped labor dynamics, giving peasants unprecedented bargaining power', tags: ['economics', 'society'] },
  ],
  philosophy: [
    { id: 'p1', type: 'concept', text: 'Socratic method: truth through systematic questioning of assumptions', tags: ['epistemology', 'dialogue'] },
    { id: 'p2', type: 'principle', text: "Occam's Razor: simpler explanations are generally preferable to complex ones", tags: ['logic', 'parsimony'] },
    { id: 'p3', type: 'quote', text: '"The unexamined life is not worth living." — Socrates at his trial', tags: ['introspection'] },
    { id: 'p4', type: 'concept', text: 'Cognitive dissonance: psychological discomfort from holding contradictory beliefs', tags: ['psychology', 'belief'] },
  ],
  economics: [
    { id: 'e1', type: 'principle', text: 'Supply and demand curves intersect at market equilibrium — price as signal', tags: ['markets', 'price'] },
    { id: 'e2', type: 'metaphor', text: 'Economy as ecosystem — companies as organisms competing for resource niches', tags: ['analogy', 'competition'] },
    { id: 'e3', type: 'fact', text: 'UBI trials in Finland & Stockton show minimal work disincentive effects', tags: ['policy', 'welfare'] },
    { id: 'e4', type: 'concept', text: 'Creative destruction: innovation kills old industries to birth transformative new ones', tags: ['innovation', 'capitalism'] },
  ],
  arts: [
    { id: 'a1', type: 'quote', text: '"Art is not what you see, but what you make others see." — Edgar Degas', tags: ['perception', 'creativity'] },
    { id: 'a2', type: 'concept', text: 'Negative space: what is absent defines and gives meaning to what is present', tags: ['design', 'composition'] },
    { id: 'a3', type: 'metaphor', text: 'Writing as archaeology — excavating meaning layer by careful layer', tags: ['language', 'process'] },
  ],
};

const CHALLENGES = [
  { id: 'c1', title: 'Photosynthesis as Cuisine', prompt: 'Explain photosynthesis using only culinary metaphors', stems: 4, difficulty: 'Creative', color: '#0ED8D8' },
  { id: 'c2', title: 'UBI Through History', prompt: 'Argue for Universal Basic Income with historical precedents', stems: 6, difficulty: 'Analytical', color: '#FF6B35' },
  { id: 'c3', title: 'Entropy of Empires', prompt: 'Connect thermodynamic entropy to the fall of civilizations', stems: 5, difficulty: 'Synthesis', color: '#818CF8' },
  { id: 'c4', title: 'Memory Architecture', prompt: 'Design a metaphor for how memory consolidates during sleep', stems: 4, difficulty: 'Creative', color: '#0ED8D8' },
];

const COMMUNITY_WEAVES = [
  { id: 'w1', author: 'maya_thinks', title: 'The Democracy of Ideas', stems: 8, forks: 127, likes: 342, preview: ['Printing press', 'Info flow', 'Democracy'], color: '#0ED8D8' },
  { id: 'w2', author: 'quantum_leo', title: 'Entropy & Collapse', stems: 6, forks: 89, likes: 218, preview: ['Entropy', 'Roman Empire', 'Complexity'], color: '#FF6B35' },
  { id: 'w3', author: 'philosophix', title: 'Examined Markets', stems: 7, forks: 64, likes: 195, preview: ['Socratic method', 'Equilibrium'], color: '#818CF8' },
  { id: 'w4', author: 'bio_remix', title: 'Cells as Cities', stems: 5, forks: 203, likes: 512, preview: ['DNA', 'Emergence', 'Systems'], color: '#0ED8D8' },
  { id: 'w5', author: 'arthistory_x', title: 'Negative Spaces of Power', stems: 9, forks: 156, likes: 423, preview: ['Negative space', 'Power'], color: '#FF6B35' },
];

const GRAPH_NODES = [
  { id: 'n1', label: 'Entropy', x: 180, y: 110, size: 26, mastery: 0.9, color: '#0ED8D8' },
  { id: 'n2', label: 'Complexity', x: 310, y: 70, size: 20, mastery: 0.7, color: '#818CF8' },
  { id: 'n3', label: 'Emergence', x: 295, y: 170, size: 22, mastery: 0.75, color: '#818CF8' },
  { id: 'n4', label: 'Systems', x: 175, y: 220, size: 24, mastery: 0.85, color: '#0ED8D8' },
  { id: 'n5', label: 'Evolution', x: 75, y: 160, size: 18, mastery: 0.6, color: '#FF6B35' },
  { id: 'n6', label: 'Memory', x: 72, y: 268, size: 20, mastery: 0.65, color: '#FF6B35' },
  { id: 'n7', label: 'Language', x: 195, y: 305, size: 16, mastery: 0.5, color: '#818CF8' },
  { id: 'n8', label: 'Culture', x: 318, y: 275, size: 22, mastery: 0.8, color: '#FF6B35' },
  { id: 'n9', label: 'Power', x: 358, y: 185, size: 18, mastery: 0.55, color: '#0ED8D8' },
];

const GRAPH_EDGES = [
  ['n1', 'n4'], ['n1', 'n2'], ['n2', 'n3'], ['n3', 'n4'], ['n4', 'n5'],
  ['n4', 'n6'], ['n5', 'n6'], ['n6', 'n7'], ['n7', 'n8'], ['n8', 'n9'],
  ['n3', 'n8'], ['n2', 'n9'], ['n1', 'n3'],
];

// ─── HELPERS ───────────────────────────────────────────────────────────────
function Icon({ name, size = 16, color = 'currentColor', strokeWidth = 2 }) {
  const LucideIcon = window.lucide && window.lucide[name];
  if (!LucideIcon) return null;
  return React.createElement(LucideIcon, { size, color, strokeWidth });
}

function StemBadge({ type, t }) {
  const map = {
    fact:      { bg: t.tealDim, fg: t.teal },
    principle: { bg: t.indigoDim, fg: t.indigo },
    metaphor:  { bg: t.orangeDim, fg: t.orange },
    quote:     { bg: t.indigoDim, fg: t.indigo },
    event:     { bg: t.orangeDim, fg: t.orange },
    pattern:   { bg: t.tealDim, fg: t.teal },
    concept:   { bg: t.tealDim, fg: t.teal },
  };
  const c = map[type] || { bg: t.surfaceAlt, fg: t.textMuted };
  return React.createElement('span', {
    style: {
      display: 'inline-block', padding: '2px 8px', borderRadius: 4,
      fontSize: 9, fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase',
      background: c.bg, color: c.fg,
    }
  }, type);
}

// ─── HOME SCREEN ───────────────────────────────────────────────────────────
function HomeScreen({ t, setActiveScreen }) {
  const [pressed, setPressed] = useState(null);

  return React.createElement('div', { style: { height: '100%', overflowY: 'auto', background: t.bg } },
    // Header
    React.createElement('div', {
      style: { padding: '20px 20px 14px', background: t.surface, borderBottom: `1px solid ${t.border}` }
    },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' } },
        React.createElement('div', null,
          React.createElement('div', { style: { fontSize: 11, color: t.textMuted, fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: 5 } }, 'Saturday · Apr 4'),
          React.createElement('div', { style: { fontSize: 22, fontWeight: 800, color: t.text, lineHeight: 1.2 } }, 'Weave something'),
          React.createElement('div', { style: { fontSize: 22, fontWeight: 800, lineHeight: 1.2 } },
            React.createElement('span', { style: { color: t.teal } }, 'brilliant'),
            React.createElement('span', { style: { color: t.text } }, ' today')
          )
        ),
        React.createElement('div', {
          style: {
            background: t.orange, color: '#fff', borderRadius: 14, padding: '9px 14px',
            textAlign: 'center', minWidth: 58,
          }
        },
          React.createElement('div', { style: { fontSize: 18, fontWeight: 800, lineHeight: 1 } }, '🔥 12'),
          React.createElement('div', { style: { fontSize: 9, fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase', opacity: 0.9, marginTop: 3 } }, 'day streak')
        )
      )
    ),

    // Stats row
    React.createElement('div', {
      style: { display: 'flex', gap: 10, padding: '12px 16px', background: t.surface, borderBottom: `1px solid ${t.border}` }
    },
      [{ label: 'Weaves', value: '47', color: t.teal }, { label: 'Stems', value: '312', color: t.orange }, { label: 'Forks', value: '23', color: t.indigo }]
        .map(s => React.createElement('div', {
          key: s.label,
          style: {
            flex: 1, background: t.surfaceAlt, borderRadius: 10, padding: '10px 8px',
            textAlign: 'center', borderTop: `3px solid ${s.color}`,
          }
        },
          React.createElement('div', { style: { fontSize: 20, fontWeight: 800, color: s.color, lineHeight: 1 } }, s.value),
          React.createElement('div', { style: { fontSize: 9, color: t.textMuted, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', marginTop: 4 } }, s.label)
        ))
    ),

    // Today's Challenges — horizontal scroll section
    React.createElement('div', { style: { padding: '18px 0 0' } },
      React.createElement('div', {
        style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 16px 10px' }
      },
        React.createElement('span', { style: { fontSize: 14, fontWeight: 700, color: t.text } }, "Today's Challenges"),
        React.createElement('span', { style: { fontSize: 11, color: t.teal, fontWeight: 600, cursor: 'pointer' } }, 'See all')
      ),
      React.createElement('div', {
        style: { display: 'flex', gap: 10, paddingLeft: 16, paddingRight: 16, overflowX: 'auto', scrollbarWidth: 'none', paddingBottom: 4 }
      },
        CHALLENGES.map(c => React.createElement('div', {
          key: c.id,
          onClick: () => setActiveScreen('weave'),
          onMouseDown: () => setPressed(c.id),
          onMouseUp: () => setPressed(null),
          onTouchStart: () => setPressed(c.id),
          onTouchEnd: () => setPressed(null),
          style: {
            flexShrink: 0, width: 210, background: t.surface, borderRadius: 14, padding: '14px',
            cursor: 'pointer', border: `1px solid ${t.border}`, borderLeft: `4px solid ${c.color}`,
            transform: pressed === c.id ? 'scale(0.96)' : 'scale(1)', transition: 'transform 0.12s ease',
          }
        },
          React.createElement('div', {
            style: {
              display: 'inline-block', background: c.color + '22', color: c.color,
              borderRadius: 4, padding: '2px 8px', fontSize: 9, fontWeight: 700,
              letterSpacing: '0.09em', textTransform: 'uppercase', marginBottom: 9,
            }
          }, c.difficulty),
          React.createElement('div', { style: { fontSize: 13, fontWeight: 700, color: t.text, marginBottom: 6, lineHeight: 1.4 } }, c.title),
          React.createElement('div', { style: { fontSize: 11, color: t.textMuted, lineHeight: 1.5, marginBottom: 10 } }, c.prompt),
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: t.textMuted } },
            React.createElement(Icon, { name: 'Layers', size: 11, color: c.color }),
            React.createElement('span', null, `${c.stems} stems suggested`)
          )
        ))
      )
    ),

    // Recent Weaves — list section
    React.createElement('div', { style: { padding: '20px 0 24px' } },
      React.createElement('div', {
        style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 16px 10px' }
      },
        React.createElement('span', { style: { fontSize: 14, fontWeight: 700, color: t.text } }, 'Your Recent Weaves'),
        React.createElement('span', { style: { fontSize: 11, color: t.teal, fontWeight: 600, cursor: 'pointer' } }, 'All')
      ),
      ...[
        { title: 'Democracy of Information', date: '2 days ago', stems: 6, color: t.teal },
        { title: 'Entropy & Empire', date: '5 days ago', stems: 8, color: t.orange },
        { title: 'Culinary Photosynthesis', date: '1 week ago', stems: 4, color: t.indigo },
      ].map((w, i) => React.createElement('div', {
        key: i, onClick: () => setActiveScreen('weave'),
        style: {
          display: 'flex', alignItems: 'center', gap: 12, padding: '11px 16px',
          borderBottom: `1px solid ${t.border}`, cursor: 'pointer',
        }
      },
        React.createElement('div', {
          style: {
            width: 38, height: 38, borderRadius: 10, background: w.color + '18',
            border: `2px solid ${w.color}`, display: 'flex', alignItems: 'center',
            justifyContent: 'center', flexShrink: 0,
          }
        }, React.createElement(Icon, { name: 'GitMerge', size: 16, color: w.color })),
        React.createElement('div', { style: { flex: 1 } },
          React.createElement('div', { style: { fontSize: 13, fontWeight: 600, color: t.text, marginBottom: 2 } }, w.title),
          React.createElement('div', { style: { fontSize: 11, color: t.textMuted } }, `${w.stems} stems · ${w.date}`)
        ),
        React.createElement(Icon, { name: 'ChevronRight', size: 15, color: t.textDim })
      ))
    )
  );
}

// ─── LIBRARY SCREEN ────────────────────────────────────────────────────────
function LibraryScreen({ t }) {
  const [activeCat, setActiveCat] = useState('science');
  const [selectedStem, setSelectedStem] = useState(null);

  const cats = [
    { id: 'science', label: 'Science', icon: 'Atom', color: t.teal },
    { id: 'history', label: 'History', icon: 'Clock', color: t.orange },
    { id: 'philosophy', label: 'Philosophy', icon: 'Brain', color: t.indigo },
    { id: 'economics', label: 'Economics', icon: 'TrendingUp', color: t.orange },
    { id: 'arts', label: 'Arts', icon: 'Palette', color: t.indigo },
  ];

  return React.createElement('div', { style: { height: '100%', overflowY: 'auto', background: t.bg } },
    React.createElement('div', {
      style: { padding: '18px 16px 0', background: t.surface, borderBottom: `1px solid ${t.border}` }
    },
      React.createElement('div', { style: { fontSize: 20, fontWeight: 800, color: t.text, marginBottom: 12 } }, 'Stem Library'),
      React.createElement('div', {
        style: {
          display: 'flex', alignItems: 'center', gap: 8, background: t.surfaceAlt,
          borderRadius: 10, padding: '9px 12px', marginBottom: 12, border: `1px solid ${t.border}`,
        }
      },
        React.createElement(Icon, { name: 'Search', size: 14, color: t.textMuted }),
        React.createElement('span', { style: { fontSize: 13, color: t.textMuted } }, 'Search 2,400+ knowledge stems...')
      ),
      // Category filter — horizontal scroll section 1
      React.createElement('div', {
        style: { display: 'flex', gap: 6, overflowX: 'auto', scrollbarWidth: 'none', paddingBottom: 12 }
      },
        cats.map(cat => React.createElement('button', {
          key: cat.id, onClick: () => setActiveCat(cat.id),
          style: {
            flexShrink: 0, display: 'flex', alignItems: 'center', gap: 5, padding: '6px 12px',
            borderRadius: 20, border: activeCat === cat.id ? 'none' : `1px solid ${t.border}`,
            background: activeCat === cat.id ? cat.color : t.surfaceAlt,
            color: activeCat === cat.id ? '#fff' : t.textMuted,
            fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'Lexend, sans-serif',
            transition: 'all 0.2s ease',
          }
        },
          React.createElement(Icon, { name: cat.icon, size: 11, color: activeCat === cat.id ? '#fff' : t.textMuted }),
          React.createElement('span', null, cat.label)
        ))
      )
    ),

    // Stacked horizontal scroll sections — one per discipline
    React.createElement('div', { style: { padding: '16px 0' } },
      Object.keys(STEMS).map(discipline => {
        const catCfg = cats.find(c => c.id === discipline);
        const accentColor = catCfg?.color || t.teal;
        return React.createElement('div', { key: discipline, style: { marginBottom: 22 } },
          React.createElement('div', {
            style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 16px 8px' }
          },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8 } },
              React.createElement('div', { style: { width: 3, height: 14, background: accentColor, borderRadius: 2 } }),
              React.createElement('span', { style: { fontSize: 12, fontWeight: 700, color: t.text, textTransform: 'capitalize' } }, discipline)
            ),
            React.createElement('span', { style: { fontSize: 10, color: t.textMuted } }, `${STEMS[discipline].length} stems`)
          ),
          // Horizontal scroll section 2
          React.createElement('div', {
            style: { display: 'flex', gap: 8, paddingLeft: 16, paddingRight: 16, overflowX: 'auto', scrollbarWidth: 'none' }
          },
            STEMS[discipline].map(stem => React.createElement('div', {
              key: stem.id,
              onClick: () => setSelectedStem(selectedStem?.id === stem.id ? null : stem),
              style: {
                flexShrink: 0, width: 195, background: t.surface, borderRadius: 12, padding: '12px',
                cursor: 'pointer', border: selectedStem?.id === stem.id ? `2px solid ${accentColor}` : `1px solid ${t.border}`,
                transition: 'border 0.15s ease',
              }
            },
              React.createElement('div', { style: { marginBottom: 7 } }, React.createElement(StemBadge, { type: stem.type, t })),
              React.createElement('div', { style: { fontSize: 11, color: t.text, lineHeight: 1.55, marginBottom: 9 } }, stem.text),
              React.createElement('div', { style: { display: 'flex', flexWrap: 'wrap', gap: 3 } },
                stem.tags.slice(0, 2).map(tag => React.createElement('span', {
                  key: tag,
                  style: { fontSize: 9, color: t.textMuted, background: t.surfaceAlt, padding: '2px 6px', borderRadius: 3 }
                }, `#${tag}`))
              ),
              selectedStem?.id === stem.id && React.createElement('div', {
                style: {
                  marginTop: 10, padding: '7px 10px', background: accentColor + '14',
                  borderRadius: 7, fontSize: 11, color: accentColor, fontWeight: 600,
                  display: 'flex', alignItems: 'center', gap: 5,
                }
              },
                React.createElement(Icon, { name: 'Plus', size: 11, color: accentColor }),
                React.createElement('span', null, 'Add to current weave')
              )
            )),
            // Add stem slot
            React.createElement('div', {
              style: {
                flexShrink: 0, width: 72, borderRadius: 12, border: `1px dashed ${t.border}`,
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                gap: 4, cursor: 'pointer', minHeight: 100,
              }
            },
              React.createElement(Icon, { name: 'Plus', size: 16, color: t.textMuted }),
              React.createElement('span', { style: { fontSize: 9, color: t.textMuted, fontWeight: 600 } }, 'Add')
            )
          )
        );
      })
    )
  );
}

// ─── WEAVE SCREEN ──────────────────────────────────────────────────────────
function WeaveScreen({ t, setActiveScreen }) {
  const [stems, setStems] = useState([
    { id: 'w1', text: 'Economy as ecosystem — organisms competing for resource niches', type: 'metaphor', color: t.orange },
    { id: 'w2', text: 'Emergence: complex behavior arising from simple, repeated rules', type: 'concept', color: t.indigo },
    { id: 'w3', text: 'Creative destruction: innovation kills old industries to birth new ones', type: 'concept', color: t.teal },
  ]);
  const [showAI, setShowAI] = useState(true);
  const [dragOver, setDragOver] = useState(false);
  const [connectors] = useState(['similarly →', 'therefore →', 'yet →']);

  const removeStem = (id) => setStems(prev => prev.filter(s => s.id !== id));
  const addSuggestion = (s) => setStems(prev => [...prev, { ...s, id: 'sug' + Date.now() }]);

  const suggestions = [
    { text: 'Entropy always increases — disorder is the default state of systems', type: 'principle', color: t.teal },
    { text: 'Negative space: what is absent defines what is present', type: 'concept', color: t.indigo },
  ];

  return React.createElement('div', { style: { height: '100%', display: 'flex', flexDirection: 'column', background: t.bg } },
    React.createElement('div', {
      style: {
        padding: '16px', background: t.surface, borderBottom: `1px solid ${t.border}`,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0,
      }
    },
      React.createElement('div', null,
        React.createElement('div', { style: { fontSize: 17, fontWeight: 800, color: t.text } }, 'Active Weave'),
        React.createElement('div', { style: { fontSize: 11, color: t.textMuted, marginTop: 2 } }, `${stems.length} stems · unsaved draft`)
      ),
      React.createElement('div', { style: { display: 'flex', gap: 8 } },
        React.createElement('button', {
          style: {
            padding: '7px 14px', borderRadius: 8, border: `1px solid ${t.border}`,
            background: t.surfaceAlt, color: t.textMuted, fontSize: 12, fontWeight: 600,
            cursor: 'pointer', fontFamily: 'Lexend, sans-serif',
          }
        }, 'Save'),
        React.createElement('button', {
          style: {
            padding: '7px 14px', borderRadius: 8, border: 'none', background: t.teal,
            color: '#0F0F16', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'Lexend, sans-serif',
          }
        }, 'Share ↗')
      )
    ),

    React.createElement('div', { style: { flex: 1, overflowY: 'auto', padding: '14px' } },
      // Title block
      React.createElement('div', {
        style: {
          background: t.surface, borderRadius: 12, padding: '12px 14px', marginBottom: 12,
          border: `1px solid ${t.border}`, borderLeft: `4px solid ${t.teal}`,
        }
      },
        React.createElement('div', { style: { fontSize: 10, color: t.textMuted, fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: 5 } }, 'Weave Title'),
        React.createElement('div', { style: { fontSize: 15, fontWeight: 700, color: t.text } }, 'Ecosystems of Thought')
      ),

      // Stems chain
      ...stems.map((stem, i) => React.createElement('div', { key: stem.id },
        React.createElement('div', {
          style: {
            background: t.surface, borderRadius: 12, padding: '12px',
            border: `1px solid ${t.border}`, borderLeft: `4px solid ${stem.color}`,
          }
        },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 7 } },
            React.createElement(StemBadge, { type: stem.type, t }),
            React.createElement('button', {
              onClick: () => removeStem(stem.id),
              style: { background: 'none', border: 'none', cursor: 'pointer', padding: 2, opacity: 0.6 }
            }, React.createElement(Icon, { name: 'X', size: 13, color: t.textMuted }))
          ),
          React.createElement('div', { style: { fontSize: 12, color: t.text, lineHeight: 1.55 } }, stem.text),
          i === 1 && React.createElement('div', {
            style: {
              marginTop: 9, padding: '7px 10px', background: t.surfaceAlt, borderRadius: 8,
              fontSize: 11, color: t.textMuted, fontStyle: 'italic',
            }
          }, '✍ "Both systems self-regulate through feedback loops and resource flows..."')
        ),
        i < stems.length - 1 && React.createElement('div', {
          style: { display: 'flex', alignItems: 'center', padding: '5px 14px' }
        },
          React.createElement('div', { style: { width: 2, height: 18, background: t.border, marginRight: 10, marginLeft: 4, borderRadius: 2 } }),
          React.createElement('div', {
            style: {
              background: t.surfaceAlt, border: `1px solid ${t.border}`, borderRadius: 6,
              padding: '3px 10px', fontSize: 10, color: t.textMuted, fontWeight: 600, cursor: 'pointer',
            }
          }, connectors[i % connectors.length])
        )
      )),

      // Drop zone
      React.createElement('div', {
        onDragOver: (e) => { e.preventDefault(); setDragOver(true); },
        onDragLeave: () => setDragOver(false),
        onDrop: () => setDragOver(false),
        onClick: () => setActiveScreen('library'),
        style: {
          marginTop: 6, border: `2px dashed ${dragOver ? t.teal : t.border}`,
          borderRadius: 12, padding: '18px', textAlign: 'center',
          background: dragOver ? t.teal + '10' : 'transparent', cursor: 'pointer',
          transition: 'all 0.2s ease',
        }
      },
        React.createElement(Icon, { name: 'Plus', size: 18, color: dragOver ? t.teal : t.textMuted }),
        React.createElement('div', { style: { fontSize: 11, color: dragOver ? t.teal : t.textMuted, marginTop: 5, fontWeight: 500 } },
          'Drop a stem or tap to browse Library'
        )
      )
    ),

    // AI Weave Assistant panel
    showAI && React.createElement('div', {
      style: { background: t.surface, borderTop: `1px solid ${t.border}`, padding: '10px 14px 14px', flexShrink: 0 }
    },
      React.createElement('div', {
        style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }
      },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6 } },
          React.createElement('div', { style: { width: 7, height: 7, borderRadius: '50%', background: t.teal, boxShadow: `0 0 8px ${t.teal}88` } }),
          React.createElement('span', { style: { fontSize: 10, fontWeight: 700, color: t.teal, letterSpacing: '0.07em', textTransform: 'uppercase' } }, 'Weave Assistant')
        ),
        React.createElement('button', {
          onClick: () => setShowAI(false),
          style: { background: 'none', border: 'none', cursor: 'pointer', fontSize: 10, color: t.textMuted }
        }, 'Hide')
      ),
      React.createElement('div', { style: { display: 'flex', gap: 8, overflowX: 'auto', scrollbarWidth: 'none' } },
        suggestions.map((s, i) => React.createElement('div', {
          key: i, onClick: () => addSuggestion(s),
          style: {
            flexShrink: 0, width: 195, background: t.surfaceAlt, borderRadius: 10, padding: '10px 12px',
            border: `1px solid ${t.border}`, cursor: 'pointer', borderLeft: `3px solid ${s.color}`,
          }
        },
          React.createElement('div', { style: { marginBottom: 6 } }, React.createElement(StemBadge, { type: s.type, t })),
          React.createElement('div', { style: { fontSize: 11, color: t.text, lineHeight: 1.45, marginBottom: 7 } }, s.text),
          React.createElement('div', {
            style: { display: 'flex', alignItems: 'center', gap: 4, fontSize: 10, color: s.color, fontWeight: 700 }
          },
            React.createElement(Icon, { name: 'Plus', size: 10, color: s.color }),
            React.createElement('span', null, 'Add to weave')
          )
        ))
      )
    )
  );
}

// ─── COMMUNITY SCREEN ──────────────────────────────────────────────────────
function CommunityScreen({ t }) {
  const [tab, setTab] = useState('featured');
  const [liked, setLiked] = useState(new Set());

  const toggleLike = (id) => setLiked(prev => {
    const next = new Set(prev);
    next.has(id) ? next.delete(id) : next.add(id);
    return next;
  });

  const topics = ['Epistemology', 'Climate', 'AI Ethics', 'Art History', 'Game Theory', 'Linguistics', 'Urban Design'];
  const activity = [
    { user: 'bio_remix', action: 'forked your weave', target: '"Democracy of Information"', time: '2m ago', color: t.teal },
    { user: 'quantum_leo', action: 'liked', target: '"Entropy & Empire"', time: '15m ago', color: t.orange },
    { user: 'philosophix', action: 'commented on', target: '"Culinary Photosynthesis"', time: '1h ago', color: t.indigo },
    { user: 'maya_thinks', action: 'started following you', target: null, time: '3h ago', color: t.teal },
  ];

  return React.createElement('div', { style: { height: '100%', overflowY: 'auto', background: t.bg } },
    React.createElement('div', {
      style: { padding: '18px 16px 0', background: t.surface, borderBottom: `1px solid ${t.border}` }
    },
      React.createElement('div', { style: { fontSize: 20, fontWeight: 800, color: t.text, marginBottom: 12 } }, 'Community'),
      React.createElement('div', { style: { display: 'flex', gap: 0 } },
        ['featured', 'trending', 'following'].map(tab_id => React.createElement('button', {
          key: tab_id, onClick: () => setTab(tab_id),
          style: {
            padding: '7px 14px', background: 'none', border: 'none',
            borderBottom: tab === tab_id ? `2px solid ${t.teal}` : '2px solid transparent',
            color: tab === tab_id ? t.teal : t.textMuted,
            fontSize: 12, fontWeight: 600, cursor: 'pointer',
            textTransform: 'capitalize', fontFamily: 'Lexend, sans-serif', marginBottom: -1,
          }
        }, tab_id))
      )
    ),

    // Featured Weaves — horizontal scroll section
    React.createElement('div', { style: { padding: '18px 0 0' } },
      React.createElement('div', { style: { padding: '0 16px 10px', fontSize: 13, fontWeight: 700, color: t.text } }, 'Featured Weaves'),
      React.createElement('div', {
        style: { display: 'flex', gap: 10, paddingLeft: 16, paddingRight: 16, overflowX: 'auto', scrollbarWidth: 'none', paddingBottom: 4 }
      },
        COMMUNITY_WEAVES.slice(0, 4).map(w => React.createElement('div', {
          key: w.id,
          style: {
            flexShrink: 0, width: 230, background: t.surface, borderRadius: 14,
            overflow: 'hidden', border: `1px solid ${t.border}`,
          }
        },
          React.createElement('div', { style: { height: 5, background: w.color } }),
          React.createElement('div', { style: { padding: '12px' } },
            React.createElement('div', { style: { fontSize: 13, fontWeight: 700, color: t.text, marginBottom: 4 } }, w.title),
            React.createElement('div', { style: { fontSize: 10, color: t.textMuted, marginBottom: 9 } }, `by @${w.author} · ${w.stems} stems`),
            React.createElement('div', { style: { display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 10 } },
              w.preview.map(tag => React.createElement('span', {
                key: tag,
                style: {
                  fontSize: 9, background: w.color + '18', color: w.color,
                  padding: '3px 7px', borderRadius: 4, fontWeight: 600,
                }
              }, tag))
            ),
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
              React.createElement('div', { style: { display: 'flex', gap: 10 } },
                React.createElement('button', {
                  onClick: () => toggleLike(w.id),
                  style: {
                    display: 'flex', alignItems: 'center', gap: 4, background: 'none', border: 'none',
                    cursor: 'pointer', fontSize: 11, fontWeight: 600, fontFamily: 'Lexend, sans-serif',
                    color: liked.has(w.id) ? t.orange : t.textMuted,
                  }
                },
                  React.createElement(Icon, { name: 'Heart', size: 12, color: liked.has(w.id) ? t.orange : t.textMuted }),
                  React.createElement('span', null, w.likes + (liked.has(w.id) ? 1 : 0))
                ),
                React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: t.textMuted } },
                  React.createElement(Icon, { name: 'GitFork', size: 12, color: t.textMuted }),
                  React.createElement('span', null, w.forks)
                )
              ),
              React.createElement('button', {
                style: {
                  padding: '4px 10px', borderRadius: 6, border: `1px solid ${w.color}`,
                  background: 'none', color: w.color, fontSize: 10, fontWeight: 700,
                  cursor: 'pointer', fontFamily: 'Lexend, sans-serif',
                }
              }, 'Fork')
            )
          )
        ))
      )
    ),

    // Trending Topics — horizontal scroll section
    React.createElement('div', { style: { padding: '18px 0 0' } },
      React.createElement('div', { style: { padding: '0 16px 10px', fontSize: 13, fontWeight: 700, color: t.text } }, 'Trending Topics'),
      React.createElement('div', {
        style: { display: 'flex', gap: 7, paddingLeft: 16, paddingRight: 16, overflowX: 'auto', scrollbarWidth: 'none', paddingBottom: 4 }
      },
        topics.map((topic, i) => {
          const accent = i % 3 === 0 ? t.teal : i % 3 === 1 ? t.orange : t.indigo;
          return React.createElement('div', {
            key: topic,
            style: {
              flexShrink: 0, padding: '7px 14px', borderRadius: 20, cursor: 'pointer',
              background: accent + '18', border: `1px solid ${accent}33`,
              fontSize: 11, fontWeight: 600, color: accent,
            }
          }, `#${topic}`);
        })
      )
    ),

    // Activity feed
    React.createElement('div', { style: { padding: '18px 16px 100px' } },
      React.createElement('div', { style: { fontSize: 13, fontWeight: 700, color: t.text, marginBottom: 10 } }, 'Recent Activity'),
      ...activity.map((a, i) => React.createElement('div', {
        key: i,
        style: {
          display: 'flex', alignItems: 'flex-start', gap: 10, padding: '10px 0',
          borderBottom: i < activity.length - 1 ? `1px solid ${t.border}` : 'none',
        }
      },
        React.createElement('div', {
          style: {
            width: 32, height: 32, borderRadius: 8, background: a.color + '18',
            border: `2px solid ${a.color}`, display: 'flex', alignItems: 'center',
            justifyContent: 'center', flexShrink: 0, fontSize: 12, fontWeight: 800, color: a.color,
          }
        }, a.user[0].toUpperCase()),
        React.createElement('div', { style: { flex: 1 } },
          React.createElement('div', { style: { fontSize: 12, color: t.text, lineHeight: 1.45 } },
            React.createElement('strong', null, `@${a.user}`),
            ` ${a.action}`,
            a.target && React.createElement('span', { style: { color: t.teal } }, ` ${a.target}`)
          ),
          React.createElement('div', { style: { fontSize: 10, color: t.textMuted, marginTop: 2 } }, a.time)
        )
      ))
    )
  );
}

// ─── GRAPH SCREEN ──────────────────────────────────────────────────────────
function GraphScreen({ t }) {
  const [selected, setSelected] = useState(null);
  const [hovered, setHovered] = useState(null);
  const active = selected || hovered;

  return React.createElement('div', { style: { height: '100%', overflowY: 'auto', background: t.bg } },
    React.createElement('div', {
      style: { padding: '18px 16px 12px', background: t.surface, borderBottom: `1px solid ${t.border}` }
    },
      React.createElement('div', { style: { fontSize: 20, fontWeight: 800, color: t.text, marginBottom: 4 } }, 'Knowledge Graph'),
      React.createElement('div', { style: { fontSize: 11, color: t.textMuted } }, '9 concepts · 13 connections · 3 disciplines')
    ),

    // SVG Knowledge Graph
    React.createElement('div', {
      style: {
        background: t.surface, margin: '14px', borderRadius: 16,
        overflow: 'hidden', border: `1px solid ${t.border}`, position: 'relative',
      }
    },
      React.createElement('svg', { width: '100%', viewBox: '0 0 440 360', style: { display: 'block' } },
        React.createElement('defs', null,
          React.createElement('pattern', { id: 'gridpat', width: 28, height: 28, patternUnits: 'userSpaceOnUse' },
            React.createElement('path', { d: 'M 28 0 L 0 0 0 28', fill: 'none', stroke: t.border, strokeWidth: 0.6, opacity: 0.6 })
          )
        ),
        React.createElement('rect', { width: '100%', height: '100%', fill: 'url(#gridpat)' }),

        // Edges
        ...GRAPH_EDGES.map(([from, to], i) => {
          const fn = GRAPH_NODES.find(n => n.id === from);
          const tn = GRAPH_NODES.find(n => n.id === to);
          const hi = active && (active.id === from || active.id === to);
          return React.createElement('line', {
            key: i, x1: fn.x, y1: fn.y, x2: tn.x, y2: tn.y,
            stroke: hi ? t.teal : t.border, strokeWidth: hi ? 1.5 : 1,
            opacity: hi ? 0.9 : 0.5, strokeDasharray: hi ? 'none' : '5,4',
          });
        }),

        // Nodes
        ...GRAPH_NODES.map(n => {
          const isSel = selected?.id === n.id;
          const isHov = hovered?.id === n.id;
          const hi = isSel || isHov;
          const circum = 2 * Math.PI * (n.size + 5);
          return React.createElement('g', {
            key: n.id, onClick: () => setSelected(selected?.id === n.id ? null : n),
            onMouseEnter: () => setHovered(n), onMouseLeave: () => setHovered(null),
            style: { cursor: 'pointer' }
          },
            React.createElement('circle', {
              cx: n.x, cy: n.y, r: n.size + 5, fill: 'none',
              stroke: n.color, strokeWidth: 1.5, opacity: n.mastery,
              strokeDasharray: `${circum * n.mastery} ${circum}`,
              strokeLinecap: 'round',
            }),
            React.createElement('circle', {
              cx: n.x, cy: n.y, r: n.size,
              fill: hi ? n.color : n.color + '2A',
              stroke: n.color, strokeWidth: hi ? 2 : 1,
              style: { transition: 'all 0.2s ease' },
            }),
            React.createElement('text', {
              x: n.x, y: n.y + n.size + 16, textAnchor: 'middle',
              fill: hi ? n.color : t.textMuted, fontSize: 10,
              fontWeight: hi ? 700 : 500, fontFamily: 'Lexend, sans-serif',
            }, n.label)
          );
        })
      ),

      active && React.createElement('div', {
        style: {
          position: 'absolute', bottom: 10, left: 10, right: 10,
          background: t.bg + 'EE', borderRadius: 10, padding: '10px 12px',
          border: `1px solid ${active.color}44`, borderLeft: `3px solid ${active.color}`,
          backdropFilter: 'blur(6px)',
        }
      },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
          React.createElement('div', null,
            React.createElement('div', { style: { fontSize: 14, fontWeight: 700, color: t.text } }, active.label),
            React.createElement('div', { style: { fontSize: 10, color: t.textMuted, marginTop: 2 } },
              `${Math.round(active.mastery * 100)}% mastery · ${GRAPH_EDGES.filter(([a, b]) => a === active.id || b === active.id).length} connections`
            )
          ),
          React.createElement('div', {
            style: {
              background: active.color + '22', color: active.color,
              padding: '4px 10px', borderRadius: 6, fontSize: 13, fontWeight: 800,
            }
          }, `${Math.round(active.mastery * 100)}%`)
        )
      )
    ),

    // Stat cards
    React.createElement('div', { style: { display: 'flex', gap: 8, padding: '0 14px 14px' } },
      [
        { label: 'Concepts', value: '9', icon: 'Network', color: t.teal },
        { label: 'Avg Mastery', value: '70%', icon: 'TrendingUp', color: t.orange },
        { label: 'Connections', value: '13', icon: 'Share2', color: t.indigo },
      ].map(s => React.createElement('div', {
        key: s.label,
        style: {
          flex: 1, background: t.surface, borderRadius: 12, padding: '11px 8px',
          textAlign: 'center', border: `1px solid ${t.border}`, borderTop: `3px solid ${s.color}`,
        }
      },
        React.createElement(Icon, { name: s.icon, size: 16, color: s.color }),
        React.createElement('div', { style: { fontSize: 18, fontWeight: 800, color: s.color, marginTop: 5, lineHeight: 1 } }, s.value),
        React.createElement('div', { style: { fontSize: 9, color: t.textMuted, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', marginTop: 4 } }, s.label)
      ))
    ),

    // Mastery list
    React.createElement('div', { style: { padding: '0 14px 100px' } },
      React.createElement('div', { style: { fontSize: 13, fontWeight: 700, color: t.text, marginBottom: 10 } }, 'Mastery Breakdown'),
      ...[...GRAPH_NODES].sort((a, b) => b.mastery - a.mastery).map((n, i) => React.createElement('div', {
        key: n.id, onClick: () => setSelected(selected?.id === n.id ? null : n),
        style: {
          display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0',
          borderBottom: i < GRAPH_NODES.length - 1 ? `1px solid ${t.border}` : 'none', cursor: 'pointer',
        }
      },
        React.createElement('div', { style: { width: 7, height: 7, borderRadius: '50%', background: n.color, flexShrink: 0 } }),
        React.createElement('div', { style: { fontSize: 12, fontWeight: 600, color: t.text, flex: 1 } }, n.label),
        React.createElement('div', {
          style: { width: 90, height: 4, background: t.surfaceAlt, borderRadius: 2, overflow: 'hidden' }
        },
          React.createElement('div', { style: { height: '100%', width: `${n.mastery * 100}%`, background: n.color, borderRadius: 2 } })
        ),
        React.createElement('div', { style: { fontSize: 10, color: t.textMuted, width: 28, textAlign: 'right', fontWeight: 600 } }, `${Math.round(n.mastery * 100)}%`)
      ))
    )
  );
}

// ─── ROOT APP ──────────────────────────────────────────────────────────────
function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [darkMode, setDarkMode] = useState(true);

  const t = darkMode ? THEMES.dark : THEMES.light;

  const navItems = [
    { id: 'home', label: 'Home', icon: 'Home' },
    { id: 'library', label: 'Library', icon: 'BookOpen' },
    { id: 'weave', label: 'Weave', icon: 'GitMerge' },
    { id: 'community', label: 'Community', icon: 'Users' },
    { id: 'graph', label: 'Graph', icon: 'Network' },
  ];

  const screens = { home: HomeScreen, library: LibraryScreen, weave: WeaveScreen, community: CommunityScreen, graph: GraphScreen };
  const CurrentScreen = screens[activeScreen];

  return React.createElement('div', {
    style: {
      minHeight: '100vh', background: '#f0f0f0',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'Lexend, sans-serif',
    }
  },
    React.createElement('style', null, `
      @import url('https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700;800&display=swap');
      * { box-sizing: border-box; }
      ::-webkit-scrollbar { display: none; }
    `),

    React.createElement('div', {
      style: {
        width: 375, height: 812, borderRadius: 40, background: t.bg,
        overflow: 'hidden', boxShadow: '0 28px 70px rgba(0,0,0,0.32)',
        display: 'flex', flexDirection: 'column', position: 'relative',
      }
    },
      // Main content
      React.createElement('div', { style: { flex: 1, overflow: 'hidden', position: 'relative' } },
        React.createElement(CurrentScreen, { t, setActiveScreen })
      ),

      // Bottom nav
      React.createElement('div', {
        style: {
          background: t.surface, borderTop: `1px solid ${t.border}`,
          display: 'flex', padding: '6px 0 18px', flexShrink: 0,
        }
      },
        navItems.map(item => React.createElement('button', {
          key: item.id, onClick: () => setActiveScreen(item.id),
          style: {
            flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
            background: 'none', border: 'none', cursor: 'pointer', padding: '4px 0',
            fontFamily: 'Lexend, sans-serif',
          }
        },
          React.createElement('div', {
            style: {
              width: 38, height: 26, borderRadius: 8, display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              background: activeScreen === item.id ? t.teal + '22' : 'transparent',
              transition: 'background 0.2s ease',
            }
          }, React.createElement(Icon, { name: item.icon, size: 17, color: activeScreen === item.id ? t.teal : t.textMuted })),
          React.createElement('span', {
            style: { fontSize: 9, fontWeight: 600, color: activeScreen === item.id ? t.teal : t.textMuted, letterSpacing: '0.03em' }
          }, item.label)
        ))
      ),

      // Theme toggle
      React.createElement('button', {
        onClick: () => setDarkMode(!darkMode),
        style: {
          position: 'absolute', top: 14, right: 14, width: 30, height: 30, borderRadius: 8,
          background: t.surfaceAlt, border: `1px solid ${t.border}`, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100,
        }
      }, React.createElement(Icon, { name: darkMode ? 'Sun' : 'Moon', size: 13, color: t.textMuted }))
    )
  );
}
