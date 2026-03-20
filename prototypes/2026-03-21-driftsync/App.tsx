const { useState, useEffect, useRef } = React;

// ─── Design Tokens ─────────────────────────────────────────────────────────────
const T = {
  bg: '#0C0B18',
  surface: 'rgba(255,255,255,0.05)',
  surfaceMid: 'rgba(255,255,255,0.08)',
  surfaceHigh: 'rgba(255,255,255,0.11)',
  border: 'rgba(255,255,255,0.07)',
  borderFocus: 'rgba(124,111,255,0.4)',
  primary: '#7C6FFF',
  primaryGlow: 'rgba(124,111,255,0.18)',
  primaryLight: 'rgba(124,111,255,0.12)',
  teal: '#4ECDC4',
  tealLight: 'rgba(78,205,196,0.12)',
  amber: '#FFB347',
  amberLight: 'rgba(255,179,71,0.12)',
  rose: '#FF6B8A',
  roseLight: 'rgba(255,107,138,0.12)',
  text: '#EEEDF8',
  textSub: '#9291B8',
  textDim: 'rgba(146,145,184,0.45)',
  font: "'Inter', sans-serif",
  r: { xs: 6, sm: 10, md: 14, lg: 18, xl: 24, full: 9999 },
};

// ─── Sample Data ────────────────────────────────────────────────────────────────
const TODAY_ITEMS = [
  { id: 'a1', text: 'Reply to Maya about Thursday dinner', tag: 'message', urgent: true,  effort: '1 min',  icon: 'MessageCircle' },
  { id: 'a2', text: 'Submit expense report from Tuesday meeting', tag: 'work',    urgent: true,  effort: '5 min',  icon: 'FileText' },
  { id: 'a3', text: 'Pick up prescription — CVS on Oak St', tag: 'location', urgent: false, effort: '10 min', icon: 'MapPin' },
  { id: 'a4', text: 'Finish slides 4–6 of the product deck', tag: 'work',    urgent: false, effort: '20 min', icon: 'FileText' },
  { id: 'a5', text: 'Call Mom back', tag: 'call',    urgent: false, effort: '8 min',  icon: 'Phone' },
  { id: 'a6', text: 'Order new charger cable', tag: 'shop',    urgent: false, effort: '2 min',  icon: 'ShoppingCart' },
];

const CLUSTERS = [
  {
    id: 'c1', name: 'Reply Later', icon: 'MessageCircle', color: T.primary,
    items: [
      { id: 'ci1', text: 'Maya — Thursday dinner plans', src: 'iMessage', age: '2h ago' },
      { id: 'ci2', text: 'Jake — Q2 budget review on Slack', src: 'Slack', age: '4h ago' },
      { id: 'ci3', text: 'Dr. Chen — appointment confirm', src: 'Email', age: '1d ago' },
      { id: 'ci4', text: 'Newsletter reader survey', src: 'Email', age: '2d ago' },
    ],
  },
  {
    id: 'c2', name: 'Buy on Next Outing', icon: 'ShoppingCart', color: T.teal,
    items: [
      { id: 'ci5', text: 'CVS — pick up prescription', src: 'Reminder', age: '3d ago' },
      { id: 'ci6', text: 'Grocery — oat milk, spinach, eggs', src: 'Voice note', age: '1d ago' },
      { id: 'ci7', text: 'Post office — mail birthday card', src: 'Task', age: '5h ago' },
      { id: 'ci8', text: 'USB-C cable replacement', src: 'Screenshot', age: '6h ago' },
    ],
  },
  {
    id: 'c3', name: 'Do When Home', icon: 'Home', color: T.amber,
    items: [
      { id: 'ci9',  text: 'Water the plants', src: 'Reminder', age: '2d ago' },
      { id: 'ci10', text: 'Sign lease renewal form', src: 'Screenshot', age: '3d ago' },
      { id: 'ci11', text: 'Check if AC filter needs replacing', src: 'Task', age: '1w ago' },
    ],
  },
  {
    id: 'c4', name: 'Meeting Follow-ups', icon: 'Calendar', color: T.rose,
    items: [
      { id: 'ci12', text: 'Submit expense report from Tuesday', src: 'Calendar', age: '2d ago' },
      { id: 'ci13', text: 'Send recap notes to Sarah & Dan', src: 'Calendar', age: '4h ago' },
    ],
  },
];

const MOMENTS = [
  {
    id: 'mo1', window: 'Right Now', duration: '~3 min', active: true,
    context: 'Commuting · Quiet', icon: 'Zap',
    tasks: [
      { id: 'mt1', text: 'Reply to Maya', effort: '1 min' },
      { id: 'mt2', text: 'Mark expense report as pending', effort: '1 min' },
    ],
  },
  {
    id: 'mo2', window: 'In ~20 min', duration: '~10 min', active: false,
    context: 'Near CVS · En route', icon: 'MapPin',
    tasks: [
      { id: 'mt3', text: 'Pick up prescription', effort: '10 min' },
      { id: 'mt4', text: 'Grab oat milk next door', effort: '3 min' },
    ],
  },
  {
    id: 'mo3', window: 'Tonight 7–9 PM', duration: '~2 hours', active: false,
    context: 'Home · Relaxed', icon: 'Moon',
    tasks: [
      { id: 'mt5', text: 'Sign lease renewal form', effort: '5 min' },
      { id: 'mt6', text: 'Water the plants', effort: '3 min' },
      { id: 'mt7', text: 'Finish slides 4–6', effort: '20 min' },
    ],
  },
];

const RECENT_CAPTURES = [
  { id: 'rc1', text: 'Buy oat milk and spinach on the way home', mode: 'text',  cluster: 'Buy on Next Outing', time: '10 min ago' },
  { id: 'rc2', text: 'Follow up with Jake about the Q2 budget', mode: 'voice', cluster: 'Reply Later',          time: '2h ago' },
  { id: 'rc3', text: 'Lease renewal form screenshot',            mode: 'photo', cluster: 'Do When Home',        time: '3d ago' },
];

// ─── Helpers ────────────────────────────────────────────────────────────────────
const tagColor = (tag) => {
  switch (tag) {
    case 'message':  return T.primary;
    case 'work':     return T.amber;
    case 'location': return T.teal;
    case 'call':     return '#A8E6CF';
    case 'shop':     return T.rose;
    default:         return T.textSub;
  }
};

const clusterAccent = (color) => {
  if (color === T.primary) return '124,111,255';
  if (color === T.teal)    return '78,205,196';
  if (color === T.amber)   return '255,179,71';
  if (color === T.rose)    return '255,107,138';
  return '124,111,255';
};

// ─── Icon wrapper ───────────────────────────────────────────────────────────────
function Icon({ name, size = 16, color = T.textSub, strokeWidth = 2 }) {
  const C = window.lucide[name];
  if (!C) return null;
  return React.createElement(C, { size, color, strokeWidth });
}

// ─── Pill ───────────────────────────────────────────────────────────────────────
function Pill({ children, color, bg }) {
  return React.createElement('span', {
    style: {
      fontSize: 9, fontWeight: 700, letterSpacing: 0.8, textTransform: 'uppercase',
      color: color || T.primary,
      background: bg || T.primaryLight,
      padding: '2px 7px', borderRadius: T.r.full,
    },
  }, children);
}

// ─── CheckRow ──────────────────────────────────────────────────────────────────
function CheckRow({ item, checked, onToggle }) {
  const color = tagColor(item.tag);
  const rgb = item.tag === 'message' ? '124,111,255'
    : item.tag === 'work'     ? '255,179,71'
    : item.tag === 'location' ? '78,205,196'
    : item.tag === 'call'     ? '168,230,207'
    : '255,107,138';

  return React.createElement('div', {
    onClick: onToggle,
    style: {
      display: 'flex', alignItems: 'center', gap: 10,
      padding: '11px 12px', borderRadius: T.r.md,
      background: checked ? `rgba(${rgb},0.04)` : T.surface,
      border: `1px solid ${checked ? `rgba(${rgb},0.18)` : T.border}`,
      marginBottom: 7, cursor: 'pointer',
      opacity: checked ? 0.45 : 1,
      transition: 'all 0.22s ease',
    },
  },
    // Checkbox circle
    React.createElement('div', {
      style: {
        width: 20, height: 20, borderRadius: 10, flexShrink: 0,
        border: `2px solid ${checked ? T.teal : T.border}`,
        background: checked ? T.teal : 'transparent',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'all 0.2s ease',
      },
    }, checked ? React.createElement(Icon, { name: 'Check', size: 11, color: '#fff', strokeWidth: 3 }) : null),
    // Text block
    React.createElement('div', { style: { flex: 1, minWidth: 0 } },
      React.createElement('p', {
        style: {
          margin: 0, fontSize: 13, color: checked ? T.textSub : T.text, fontWeight: 500,
          textDecoration: checked ? 'line-through' : 'none',
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          transition: 'color 0.2s',
        },
      }, item.text),
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 5, marginTop: 3 } },
        React.createElement(Icon, { name: 'Clock', size: 10, color: T.textDim }),
        React.createElement('span', { style: { fontSize: 11, color: T.textDim } }, item.effort),
        item.urgent && React.createElement(Pill, { children: 'urgent', color: T.rose, bg: T.roseLight }),
      ),
    ),
    // Tag icon badge
    React.createElement('div', {
      style: {
        width: 28, height: 28, borderRadius: 8, flexShrink: 0,
        background: `rgba(${rgb},0.12)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      },
    }, React.createElement(Icon, { name: item.icon, size: 13, color, strokeWidth: 2 })),
  );
}

// ─── Screen: Today ──────────────────────────────────────────────────────────────
function ScreenToday({ checked, onToggle }) {
  const done = TODAY_ITEMS.filter(i => checked[i.id]).length;
  const pct  = Math.round((done / TODAY_ITEMS.length) * 100);

  return React.createElement('div', { style: { flex: 1, overflowY: 'auto', paddingBottom: 16 } },
    // Header
    React.createElement('div', { style: { padding: '10px 18px 14px' } },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' } },
        React.createElement('div', {},
          React.createElement('p', { style: { margin: 0, fontSize: 11, fontWeight: 700, letterSpacing: 1.2, textTransform: 'uppercase', color: T.teal } }, 'Saturday, Mar 21'),
          React.createElement('h1', { style: { margin: '3px 0 0', fontSize: 22, fontWeight: 700, color: T.text, lineHeight: 1.2 } }, 'Unfinished\nBusiness'),
        ),
        React.createElement('div', {
          style: {
            width: 38, height: 38, borderRadius: 12, background: T.primaryLight,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          },
        }, React.createElement(Icon, { name: 'Bell', size: 17, color: T.primary })),
      ),
      // Progress bar
      React.createElement('div', { style: { marginTop: 14 } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: 5 } },
          React.createElement('span', { style: { fontSize: 11, color: T.textSub } }, `${done} of ${TODAY_ITEMS.length} cleared`),
          React.createElement('span', { style: { fontSize: 11, fontWeight: 600, color: T.primary } }, `${pct}%`),
        ),
        React.createElement('div', { style: { height: 3, background: T.border, borderRadius: 2, overflow: 'hidden' } },
          React.createElement('div', {
            style: {
              height: '100%', width: `${pct}%`,
              background: `linear-gradient(90deg, ${T.primary}, ${T.teal})`,
              borderRadius: 2, transition: 'width 0.4s ease',
            },
          }),
        ),
      ),
    ),

    // Moment nudge card
    React.createElement('div', { style: { padding: '0 14px 12px' } },
      React.createElement('div', {
        style: {
          background: `linear-gradient(130deg, rgba(124,111,255,0.18) 0%, rgba(78,205,196,0.12) 100%)`,
          border: `1px solid rgba(124,111,255,0.28)`,
          borderRadius: T.r.lg, padding: '11px 13px',
          display: 'flex', alignItems: 'center', gap: 10,
        },
      },
        React.createElement('div', {
          style: {
            width: 34, height: 34, borderRadius: 10, background: T.primaryLight,
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          },
        }, React.createElement(Icon, { name: 'Zap', size: 15, color: T.primary })),
        React.createElement('div', { style: { flex: 1 } },
          React.createElement('p', { style: { margin: 0, fontSize: 10, fontWeight: 700, letterSpacing: 0.9, color: T.primary } }, 'MOMENT MATCH'),
          React.createElement('p', { style: { margin: '2px 0 0', fontSize: 12, color: T.text, lineHeight: 1.35 } }, 'You have ~3 min. Reply to Maya now?'),
        ),
        React.createElement(Icon, { name: 'ChevronRight', size: 15, color: T.textSub }),
      ),
    ),

    // Task list
    React.createElement('div', { style: { padding: '0 14px' } },
      React.createElement('p', {
        style: { margin: '0 0 9px 2px', fontSize: 10, fontWeight: 700, letterSpacing: 1.1, textTransform: 'uppercase', color: T.textDim },
      }, 'Loose Ends'),
      TODAY_ITEMS.map(item =>
        React.createElement(CheckRow, { key: item.id, item, checked: !!checked[item.id], onToggle: () => onToggle(item.id) }),
      ),
    ),
  );
}

// ─── Screen: Capture ───────────────────────────────────────────────────────────
function ScreenCapture() {
  const [mode, setMode]       = useState('text');
  const [draft, setDraft]     = useState('');
  const [recording, setRec]   = useState(false);
  const [saved, setSaved]     = useState(false);

  const handleSave = () => {
    if (!draft.trim()) return;
    setSaved(true);
    setTimeout(() => { setSaved(false); setDraft(''); }, 1400);
  };

  const modeConfig = [
    { id: 'text',  label: 'Text',  icon: 'Type' },
    { id: 'voice', label: 'Voice', icon: 'Mic' },
    { id: 'photo', label: 'Photo', icon: 'Camera' },
  ];

  return React.createElement('div', { style: { flex: 1, overflowY: 'auto', paddingBottom: 16 } },
    // Header
    React.createElement('div', { style: { padding: '10px 18px 14px' } },
      React.createElement('h1', { style: { margin: '0 0 3px', fontSize: 22, fontWeight: 700, color: T.text } }, 'Capture'),
      React.createElement('p', { style: { margin: 0, fontSize: 13, color: T.textSub } }, 'Save a loose end before it drifts away'),
    ),

    // Mode tabs
    React.createElement('div', { style: { padding: '0 14px 12px' } },
      React.createElement('div', {
        style: {
          display: 'flex', gap: 4, background: T.surface,
          padding: 3, borderRadius: T.r.md, border: `1px solid ${T.border}`,
        },
      }, modeConfig.map(m =>
        React.createElement('button', {
          key: m.id, onClick: () => setMode(m.id),
          style: {
            flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5,
            padding: '7px 4px', borderRadius: T.r.sm,
            background: mode === m.id ? T.primary : 'transparent',
            border: 'none', cursor: 'pointer', transition: 'background 0.18s ease',
          },
        },
          React.createElement(Icon, { name: m.icon, size: 13, color: mode === m.id ? '#fff' : T.textSub }),
          React.createElement('span', { style: { fontSize: 12, fontWeight: 500, color: mode === m.id ? '#fff' : T.textSub } }, m.label),
        ),
      )),
    ),

    // Input area
    React.createElement('div', { style: { padding: '0 14px 14px' } },
      mode === 'text' && React.createElement('div', {
        style: {
          background: T.surface, border: `1px solid ${T.borderFocus}`,
          borderRadius: T.r.lg, padding: 13, minHeight: 100,
        },
      },
        React.createElement('textarea', {
          value: draft,
          onChange: e => setDraft(e.target.value),
          placeholder: 'e.g. "remind me to call back Dr. Chen" or "buy adapter at Best Buy"',
          style: {
            width: '100%', background: 'transparent', border: 'none', outline: 'none',
            color: T.text, fontSize: 13, fontFamily: T.font,
            resize: 'none', minHeight: 72, lineHeight: 1.55,
          },
        }),
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 6 } },
          React.createElement('span', { style: { fontSize: 10, color: T.textDim } }, saved ? '✓ Saved to clusters' : 'Auto-clusters on save'),
          React.createElement('button', {
            onClick: handleSave,
            style: {
              background: saved ? T.teal : T.primary, color: '#fff', border: 'none',
              borderRadius: T.r.sm, padding: '6px 14px', fontSize: 12, fontWeight: 600,
              cursor: 'pointer', opacity: draft.trim() ? 1 : 0.45, transition: 'all 0.2s',
            },
          }, saved ? '✓ Saved!' : 'Save'),
        ),
      ),

      mode === 'voice' && React.createElement('div', {
        style: {
          background: T.surface,
          border: `1px solid ${recording ? 'rgba(255,107,138,0.45)' : T.border}`,
          borderRadius: T.r.lg, padding: '28px 14px',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14,
        },
      },
        React.createElement('div', {
          onClick: () => setRec(!recording),
          style: {
            width: 68, height: 68, borderRadius: 34, cursor: 'pointer',
            background: recording ? T.roseLight : T.primaryLight,
            border: `2px solid ${recording ? T.rose : T.primary}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: recording ? `0 0 0 10px rgba(255,107,138,0.08)` : 'none',
            transition: 'all 0.22s ease',
          },
        }, React.createElement(Icon, { name: 'Mic', size: 26, color: recording ? T.rose : T.primary })),
        React.createElement('div', { style: { textAlign: 'center' } },
          React.createElement('p', { style: { margin: 0, fontSize: 13, color: recording ? T.rose : T.textSub } },
            recording ? 'Listening… tap to stop' : 'Tap to start recording',
          ),
          React.createElement('p', { style: { margin: '4px 0 0', fontSize: 11, color: T.textDim } }, 'Speak naturally — AI extracts the task'),
        ),
        recording && React.createElement('div', { style: { display: 'flex', gap: 3, alignItems: 'center' } },
          [0,1,2,3,4].map(i => React.createElement('div', {
            key: i,
            style: {
              width: 3, borderRadius: 3, background: T.rose,
              height: 6 + Math.sin(i * 1.2) * 10 + 8,
              animation: 'none', opacity: 0.7,
            },
          })),
        ),
      ),

      mode === 'photo' && React.createElement('div', {
        style: {
          background: T.surface, border: `2px dashed ${T.border}`,
          borderRadius: T.r.lg, padding: '32px 14px',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
        },
      },
        React.createElement('div', {
          style: {
            width: 52, height: 52, borderRadius: 14, background: T.tealLight,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          },
        }, React.createElement(Icon, { name: 'Camera', size: 24, color: T.teal })),
        React.createElement('p', { style: { margin: 0, fontSize: 13, color: T.textSub, textAlign: 'center' } }, 'Take a screenshot or paste from clipboard'),
        React.createElement('p', { style: { margin: 0, fontSize: 11, color: T.textDim, textAlign: 'center' } }, 'AI reads the context and creates a task automatically'),
        React.createElement('button', {
          style: {
            marginTop: 6, background: T.tealLight, color: T.teal, border: `1px solid rgba(78,205,196,0.3)`,
            borderRadius: T.r.sm, padding: '8px 20px', fontSize: 12, fontWeight: 600, cursor: 'pointer',
          },
        }, 'Open Camera'),
      ),
    ),

    // Recent captures
    React.createElement('div', { style: { padding: '0 14px' } },
      React.createElement('p', {
        style: { margin: '0 0 9px 2px', fontSize: 10, fontWeight: 700, letterSpacing: 1.1, textTransform: 'uppercase', color: T.textDim },
      }, 'Recent Captures'),
      RECENT_CAPTURES.map(rc => {
        const iconName = rc.mode === 'text' ? 'Type' : rc.mode === 'voice' ? 'Mic' : 'Camera';
        return React.createElement('div', {
          key: rc.id,
          style: {
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '10px 12px', borderRadius: T.r.md,
            background: T.surface, border: `1px solid ${T.border}`, marginBottom: 7,
          },
        },
          React.createElement('div', {
            style: { width: 30, height: 30, borderRadius: 8, background: T.primaryLight, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' },
          }, React.createElement(Icon, { name: iconName, size: 13, color: T.primary })),
          React.createElement('div', { style: { flex: 1, minWidth: 0 } },
            React.createElement('p', { style: { margin: 0, fontSize: 13, color: T.text, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' } }, rc.text),
            React.createElement('div', { style: { display: 'flex', gap: 5, marginTop: 2 } },
              React.createElement('span', { style: { fontSize: 11, color: T.textDim } }, rc.time),
              React.createElement('span', { style: { fontSize: 11, color: T.textDim } }, '·'),
              React.createElement('span', { style: { fontSize: 11, color: T.primary } }, rc.cluster),
            ),
          ),
        );
      }),
    ),
  );
}

// ─── Screen: Clusters ──────────────────────────────────────────────────────────
function ScreenClusters() {
  const [expanded, setExpanded] = useState('c1');
  const total = CLUSTERS.reduce((s, c) => s + c.items.length, 0);

  return React.createElement('div', { style: { flex: 1, overflowY: 'auto', paddingBottom: 16 } },
    React.createElement('div', { style: { padding: '10px 18px 14px' } },
      React.createElement('h1', { style: { margin: '0 0 3px', fontSize: 22, fontWeight: 700, color: T.text } }, 'Clusters'),
      React.createElement('p', { style: { margin: 0, fontSize: 13, color: T.textSub } }, `${total} loose ends grouped by context`),
    ),
    React.createElement('div', { style: { padding: '0 14px' } },
      CLUSTERS.map(cluster => {
        const open = expanded === cluster.id;
        const rgb  = clusterAccent(cluster.color);
        const iconMap = {
          MessageCircle: 'MessageCircle',
          ShoppingCart:  'ShoppingCart',
          Home:          'Home',
          Calendar:      'Calendar',
        };
        return React.createElement('div', {
          key: cluster.id,
          style: {
            background: T.surface, border: `1px solid ${open ? `rgba(${rgb},0.25)` : T.border}`,
            borderRadius: T.r.lg, marginBottom: 8, overflow: 'hidden',
            transition: 'border-color 0.2s',
          },
        },
          // Cluster header
          React.createElement('div', {
            onClick: () => setExpanded(open ? null : cluster.id),
            style: {
              display: 'flex', alignItems: 'center', gap: 11, padding: '13px 13px',
              cursor: 'pointer',
            },
          },
            React.createElement('div', {
              style: {
                width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                background: `rgba(${rgb},0.13)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              },
            }, React.createElement(Icon, { name: iconMap[cluster.icon], size: 16, color: cluster.color })),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('p', { style: { margin: 0, fontSize: 14, fontWeight: 600, color: T.text } }, cluster.name),
              React.createElement('p', { style: { margin: '2px 0 0', fontSize: 11, color: T.textSub } }, `${cluster.items.length} items`),
            ),
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6 } },
              React.createElement('span', {
                style: {
                  fontSize: 11, fontWeight: 700, color: cluster.color,
                  background: `rgba(${rgb},0.12)`, padding: '2px 8px', borderRadius: T.r.full,
                },
              }, cluster.items.length),
              React.createElement(Icon, {
                name: open ? 'ChevronDown' : 'ChevronRight',
                size: 15, color: T.textSub,
              }),
            ),
          ),

          // Expanded items
          open && React.createElement('div', { style: { borderTop: `1px solid ${T.border}` } },
            cluster.items.map((item, idx) =>
              React.createElement('div', {
                key: item.id,
                style: {
                  display: 'flex', alignItems: 'center', gap: 10, padding: '9px 13px',
                  borderBottom: idx < cluster.items.length - 1 ? `1px solid ${T.border}` : 'none',
                },
              },
                React.createElement('div', { style: { width: 5, height: 5, borderRadius: 3, background: cluster.color, flexShrink: 0 } }),
                React.createElement('div', { style: { flex: 1, minWidth: 0 } },
                  React.createElement('p', { style: { margin: 0, fontSize: 13, color: T.text, lineHeight: 1.3 } }, item.text),
                  React.createElement('div', { style: { display: 'flex', gap: 4, marginTop: 2 } },
                    React.createElement('span', { style: { fontSize: 11, color: T.textDim } }, item.src),
                    React.createElement('span', { style: { fontSize: 11, color: T.textDim } }, '·'),
                    React.createElement('span', { style: { fontSize: 11, color: T.textDim } }, item.age),
                  ),
                ),
                React.createElement(Icon, { name: 'ChevronRight', size: 13, color: T.textDim }),
              ),
            ),
          ),
        );
      }),
    ),
  );
}

// ─── Screen: Moments ──────────────────────────────────────────────────────────
function ScreenMoments() {
  const [started, setStarted] = useState(null);

  const contextTags = ['Commuting', '~3 min free', 'Quiet'];

  return React.createElement('div', { style: { flex: 1, overflowY: 'auto', paddingBottom: 16 } },
    React.createElement('div', { style: { padding: '10px 18px 12px' } },
      React.createElement('h1', { style: { margin: '0 0 3px', fontSize: 22, fontWeight: 700, color: T.text } }, 'Moments'),
      React.createElement('p', { style: { margin: 0, fontSize: 13, color: T.textSub } }, 'Best tasks for your current context'),
    ),

    // Context chips
    React.createElement('div', { style: { padding: '0 14px 14px', display: 'flex', gap: 6 } },
      contextTags.map(tag =>
        React.createElement('span', {
          key: tag,
          style: {
            fontSize: 11, fontWeight: 600, color: T.primary, letterSpacing: 0.6,
            background: T.primaryLight, padding: '4px 10px', borderRadius: T.r.full,
          },
        }, tag),
      ),
    ),

    React.createElement('div', { style: { padding: '0 14px' } },
      MOMENTS.map(moment => {
        const rgb = moment.active ? '124,111,255' : '255,255,255';
        const isStarted = started === moment.id;

        return React.createElement('div', {
          key: moment.id,
          style: {
            background: moment.active
              ? `linear-gradient(135deg, rgba(124,111,255,0.14) 0%, rgba(78,205,196,0.08) 100%)`
              : T.surface,
            border: `1px solid ${moment.active ? 'rgba(124,111,255,0.28)' : T.border}`,
            borderRadius: T.r.lg, padding: 13, marginBottom: 10,
          },
        },
          // Moment header
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 9 } },
            React.createElement('div', {},
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 } },
                moment.active && React.createElement('div', {
                  style: { width: 6, height: 6, borderRadius: 3, background: T.teal },
                }),
                React.createElement('span', { style: { fontSize: 14, fontWeight: 700, color: T.text } }, moment.window),
              ),
              React.createElement('span', { style: { fontSize: 11, color: T.textSub } }, `${moment.duration} · ${moment.context}`),
            ),
            moment.active
              ? React.createElement(Pill, { children: 'Now', color: T.teal, bg: T.tealLight })
              : React.createElement('div', {
                  style: {
                    width: 28, height: 28, borderRadius: 8, background: T.surface,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  },
                }, React.createElement(Icon, { name: moment.icon, size: 13, color: T.textSub })),
          ),

          // Task rows
          moment.tasks.map(task =>
            React.createElement('div', {
              key: task.id,
              style: {
                display: 'flex', alignItems: 'center', gap: 8, padding: '7px 9px',
                background: `rgba(${rgb},0.04)`, borderRadius: T.r.sm, marginBottom: 5,
              },
            },
              React.createElement(Icon, { name: 'Circle', size: 13, color: moment.active ? T.primary : T.textDim }),
              React.createElement('span', { style: { flex: 1, fontSize: 13, color: T.text } }, task.text),
              React.createElement('span', {
                style: {
                  fontSize: 10, fontWeight: 500, color: T.textSub,
                  background: T.border, padding: '2px 6px', borderRadius: 5,
                },
              }, task.effort),
            ),
          ),

          // CTA
          moment.active && React.createElement('button', {
            onClick: () => setStarted(isStarted ? null : moment.id),
            style: {
              width: '100%', marginTop: 8, padding: '9px',
              background: isStarted ? T.teal : T.primary,
              border: 'none', borderRadius: T.r.md,
              color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer',
              transition: 'background 0.2s',
              letterSpacing: 0.3,
            },
          }, isStarted ? '✓ In progress...' : 'Start Now →'),
        );
      }),
    ),
  );
}

// ─── Bottom Nav ─────────────────────────────────────────────────────────────────
function BottomNav({ active, onSelect }) {
  const [pressed, setPressed] = useState(null);
  const tabs = [
    { id: 'today',    label: 'Today',    icon: 'Home' },
    { id: 'capture',  label: 'Capture',  icon: 'Plus' },
    { id: 'clusters', label: 'Clusters', icon: 'Layers' },
    { id: 'moments',  label: 'Moments',  icon: 'Zap' },
  ];

  return React.createElement('div', {
    style: {
      position: 'absolute', bottom: 0, left: 0, right: 0, height: 76,
      background: 'rgba(12,11,24,0.96)', backdropFilter: 'blur(20px)',
      borderTop: `1px solid ${T.border}`,
      display: 'flex', alignItems: 'center', justifyContent: 'space-around',
      padding: '0 6px 14px', borderRadius: '0 0 40px 40px',
    },
  }, tabs.map(tab =>
    React.createElement('button', {
      key: tab.id,
      onClick: () => { onSelect(tab.id); setPressed(tab.id); setTimeout(() => setPressed(null), 140); },
      style: {
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
        background: 'none', border: 'none', cursor: 'pointer', padding: '6px 10px',
        borderRadius: T.r.md,
        transform: pressed === tab.id ? 'scale(0.88)' : 'scale(1)',
        transition: 'transform 0.12s ease',
      },
    },
      React.createElement('div', {
        style: {
          width: 38, height: 26, borderRadius: 9,
          background: active === tab.id ? T.primaryLight : 'transparent',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'background 0.2s',
        },
      }, React.createElement(Icon, {
        name: tab.icon,
        size: 18,
        color: active === tab.id ? T.primary : T.textSub,
        strokeWidth: active === tab.id ? 2.5 : 2,
      })),
      React.createElement('span', {
        style: {
          fontSize: 9.5, fontWeight: active === tab.id ? 700 : 400,
          color: active === tab.id ? T.primary : T.textSub,
          letterSpacing: 0.2, transition: 'color 0.2s',
        },
      }, tab.label),
    ),
  ));
}

// ─── Status Bar ────────────────────────────────────────────────────────────────
function StatusBar() {
  const [time, setTime] = useState(() => {
    const n = new Date();
    return `${n.getHours()}:${String(n.getMinutes()).padStart(2, '0')}`;
  });

  useEffect(() => {
    const iv = setInterval(() => {
      const n = new Date();
      setTime(`${n.getHours()}:${String(n.getMinutes()).padStart(2, '0')}`);
    }, 15000);
    return () => clearInterval(iv);
  }, []);

  return React.createElement('div', {
    style: {
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '13px 22px 2px', flexShrink: 0,
    },
  },
    React.createElement('span', { style: { fontSize: 13, fontWeight: 700, color: T.text, letterSpacing: 0.3 } }, time),
    React.createElement('div', { style: { display: 'flex', gap: 5, alignItems: 'center' } },
      React.createElement(Icon, { name: 'Signal', size: 13, color: T.text }),
      React.createElement(Icon, { name: 'Wifi', size: 13, color: T.text }),
      React.createElement(Icon, { name: 'Battery', size: 15, color: T.text }),
    ),
  );
}

// ─── Dynamic Island ────────────────────────────────────────────────────────────
function DynamicIsland() {
  return React.createElement('div', {
    style: {
      width: 116, height: 30, background: '#000',
      borderRadius: 18, margin: '0 auto 4px',
      flexShrink: 0,
    },
  });
}

// ─── Root App ──────────────────────────────────────────────────────────────────
function App() {
  const [tab, setTab]         = useState('today');
  const [checked, setChecked] = useState({});

  const toggleCheck = (id) => setChecked(prev => ({ ...prev, [id]: !prev[id] }));

  const screens = {
    today:    React.createElement(ScreenToday,    { checked, onToggle: toggleCheck }),
    capture:  React.createElement(ScreenCapture,  {}),
    clusters: React.createElement(ScreenClusters, {}),
    moments:  React.createElement(ScreenMoments,  {}),
  };

  return React.createElement('div', {
    style: {
      minHeight: '100vh',
      background: 'radial-gradient(ellipse at 30% 20%, rgba(124,111,255,0.12) 0%, #07060F 60%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: T.font,
    },
  },
    // Inject fonts
    React.createElement('style', {
      dangerouslySetInnerHTML: {
        __html: `
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          ::-webkit-scrollbar { width: 0; }
          textarea { font-family: 'Inter', sans-serif; }
          textarea::placeholder { color: rgba(146,145,184,0.4); }
          button { font-family: 'Inter', sans-serif; }
        `,
      },
    }),

    // Phone frame
    React.createElement('div', {
      style: {
        width: 375, height: 812,
        background: T.bg,
        borderRadius: 44,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex', flexDirection: 'column',
        boxShadow: '0 50px 100px rgba(0,0,0,0.85), 0 0 0 1px rgba(255,255,255,0.08), inset 0 1px 0 rgba(255,255,255,0.1)',
      },
    },
      React.createElement(StatusBar),
      React.createElement(DynamicIsland),

      // Screen area
      React.createElement('div', {
        style: {
          flex: 1, overflow: 'hidden',
          display: 'flex', flexDirection: 'column',
          paddingBottom: 76,
        },
      }, screens[tab]),

      React.createElement(BottomNav, { active: tab, onSelect: setTab }),
    ),
  );
}
