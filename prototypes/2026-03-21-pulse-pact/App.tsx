
const { useState, useEffect, useRef } = React;

// ─── Google Fonts ───────────────────────────────────────────────────────────
const FontLoader = () => {
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap';
    document.head.appendChild(link);
  }, []);
  return null;
};

// ─── Themes ─────────────────────────────────────────────────────────────────
const themes = {
  dark: {
    bg: '#0B0E1A',
    surface: '#131729',
    card: '#1C2140',
    cardAlt: '#1A1E36',
    border: '#252B4A',
    primary: '#A8ED64',
    primaryDim: '#1E3410',
    accent: '#6C7FFF',
    accentDim: '#1A1F45',
    orange: '#FF8A3D',
    orangeDim: '#2A1A0A',
    text: '#EEF2FF',
    textSub: '#7B85B0',
    textMuted: '#4A5180',
    danger: '#FF5A6A',
    dangerDim: '#2A0D12',
    success: '#A8ED64',
    navBg: '#0F1222',
    overlay: 'rgba(11,14,26,0.92)',
  },
  light: {
    bg: '#EFF3F0',
    surface: '#FFFFFF',
    card: '#FFFFFF',
    cardAlt: '#F4F7F5',
    border: '#E2E8E4',
    primary: '#3D9A1F',
    primaryDim: '#DFF4D5',
    accent: '#4355E8',
    accentDim: '#EBF0FF',
    orange: '#E06B1F',
    orangeDim: '#FFF0E5',
    text: '#1A2020',
    textSub: '#5A7060',
    textMuted: '#9AAFA2',
    danger: '#D93B4A',
    dangerDim: '#FFE5E8',
    success: '#3D9A1F',
    navBg: '#FFFFFF',
    overlay: 'rgba(239,243,240,0.95)',
  },
};

// ─── Data ────────────────────────────────────────────────────────────────────
const todayQueue = [
  { id: 1, title: 'Post-Call Neck Reset', duration: '2 min', type: 'Recovery', icon: 'Wind', color: '#6C7FFF', done: true },
  { id: 2, title: 'Stair Sprint Burst', duration: '4 min', type: 'Cardio', icon: 'Zap', color: '#A8ED64', done: true },
  { id: 3, title: 'Desk Hip Opener', duration: '3 min', type: 'Mobility', icon: 'Activity', color: '#FF8A3D', done: false, active: true },
  { id: 4, title: 'Squat Ladder', duration: '5 min', type: 'Strength', icon: 'Dumbbell', color: '#A8ED64', done: false },
  { id: 5, title: 'Breathwork Reset', duration: '2 min', type: 'Recovery', icon: 'Wind', color: '#6C7FFF', done: false },
];

const workoutLibrary = [
  {
    category: 'Recovery',
    color: '#6C7FFF',
    icon: 'Wind',
    items: [
      { name: 'Neck & Shoulder Reset', duration: '90 sec', cals: 4 },
      { name: 'Wrist Relief Flow', duration: '2 min', cals: 5 },
      { name: '4-7-8 Breathwork', duration: '3 min', cals: 3 },
      { name: 'Eye Rest Protocol', duration: '60 sec', cals: 1 },
    ]
  },
  {
    category: 'Mobility',
    color: '#FF8A3D',
    icon: 'Activity',
    items: [
      { name: 'Hip Flexor Release', duration: '3 min', cals: 10 },
      { name: 'Thoracic Rotation', duration: '2 min', cals: 8 },
      { name: 'Ankle Mobility Loop', duration: '2 min', cals: 7 },
      { name: 'Full Spine Wake-Up', duration: '4 min', cals: 12 },
    ]
  },
  {
    category: 'Cardio',
    color: '#A8ED64',
    icon: 'Zap',
    items: [
      { name: 'Stair Sprint Burst', duration: '3 min', cals: 28 },
      { name: 'Jump Rope Emulator', duration: '4 min', cals: 35 },
      { name: 'Shadow Boxing', duration: '5 min', cals: 42 },
      { name: 'Power Walk Push', duration: '8 min', cals: 55 },
    ]
  },
  {
    category: 'Strength',
    color: '#FF5A6A',
    icon: 'Dumbbell',
    items: [
      { name: 'Squat Ladder', duration: '4 min', cals: 32 },
      { name: 'Desk Push-Up Drop', duration: '3 min', cals: 25 },
      { name: 'Core Tension Holds', duration: '4 min', cals: 22 },
      { name: 'Calf Raise Marathon', duration: '2 min', cals: 15 },
    ]
  },
];

const scheduleGaps = [
  { time: '9:00 AM', label: 'Before standup', gap: '18 min', suggestion: 'Morning Mobility Flow', type: 'Mobility', confidence: 94 },
  { time: '11:30 AM', label: 'Between calls', gap: '12 min', suggestion: 'Desk Cardio Burst', type: 'Cardio', confidence: 88 },
  { time: '1:15 PM', label: 'After lunch', gap: '20 min', suggestion: 'Posture Recovery', type: 'Recovery', confidence: 97 },
  { time: '3:45 PM', label: 'Pre-review break', gap: '8 min', suggestion: 'Focus Reset Breathwork', type: 'Recovery', confidence: 81 },
  { time: '6:00 PM', label: 'End of workday', gap: '25 min', suggestion: 'Strength Finisher', type: 'Strength', confidence: 76 },
];

const weekData = [
  { day: 'M', mins: 22, target: 20 },
  { day: 'T', mins: 15, target: 20 },
  { day: 'W', mins: 31, target: 20 },
  { day: 'T', mins: 8, target: 20 },
  { day: 'F', mins: 18, target: 20 },
  { day: 'S', mins: 0, target: 20 },
  { day: 'S', mins: 11, target: 20 },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────
const LucideIcon = ({ name, size = 20, color = 'currentColor', strokeWidth = 2 }) => {
  const iconRef = useRef(null);
  useEffect(() => {
    if (iconRef.current && window.lucide) {
      const Icon = window.lucide[name];
      if (Icon) {
        iconRef.current.innerHTML = '';
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', size);
        svg.setAttribute('height', size);
        svg.setAttribute('viewBox', '0 0 24 24');
        svg.setAttribute('fill', 'none');
        svg.setAttribute('stroke', color);
        svg.setAttribute('stroke-width', strokeWidth);
        svg.setAttribute('stroke-linecap', 'round');
        svg.setAttribute('stroke-linejoin', 'round');
        const iconData = Icon([['svg', {}], ...[]]);
        svg.innerHTML = window.lucide[name].toString().match(/createElement\("svg",[^,]+,(.+)\)\s*$/)?.[1] || '';
        // fallback: use createIcons
        iconRef.current.appendChild(svg);
      }
    }
  }, [name, size, color, strokeWidth]);

  // Simpler approach: inline SVG paths
  const paths = {
    Home: '<polyline points="3 9 12 2 21 9"/><line x1="9" y1="21" x2="9" y2="12"/><line x1="15" y1="21" x2="15" y2="12"/><path d="M3 9v12h18V9"/>',
    Dumbbell: '<path d="M14.4 14.4 9.6 9.6"/><path d="M18.657 5.343a4 4 0 0 1 0 5.657l-1.414 1.414-5.657-5.657 1.414-1.414a4 4 0 0 1 5.657 0z"/><path d="M5.343 18.657a4 4 0 0 1 0-5.657L6.757 11.6l5.657 5.657-1.414 1.414a4 4 0 0 1-5.657-.014z"/><path d="m7.5 7.5-5 5"/><path d="m21.5 11.5-5 5"/>',
    Calendar: '<rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
    BarChart2: '<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>',
    Settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>',
    Zap: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
    Wind: '<path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"/>',
    Activity: '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>',
    Heart: '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>',
    Flame: '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>',
    Sun: '<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>',
    Moon: '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>',
    ChevronRight: '<polyline points="9 18 15 12 9 6"/>',
    Check: '<polyline points="20 6 9 16 4 11"/>',
    Timer: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
    Clock: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
    PlayCircle: '<circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/>',
    Plus: '<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',
    TrendingUp: '<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>',
    Award: '<circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>',
    Bell: '<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>',
    MapPin: '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>',
    User: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
    X: '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
    Info: '<circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>',
    Wifi: '<path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/>',
    Battery: '<rect x="1" y="6" width="18" height="12" rx="2" ry="2"/><line x1="23" y1="13" x2="23" y2="11"/>',
    Signal: '<line x1="1" y1="20" x2="1" y2="14"/><line x1="7" y1="20" x2="7" y2="9"/><line x1="13" y1="20" x2="13" y2="4"/><line x1="19" y1="20" x2="19" y2="1"/>',
    SkipForward: '<polygon points="5 4 15 12 5 20 5 4"/><line x1="19" y1="5" x2="19" y2="19"/>',
    Loader: '<line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/>',
  };

  return React.createElement('svg', {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: color,
    strokeWidth: strokeWidth,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    dangerouslySetInnerHTML: { __html: paths[name] || '' },
    style: { display: 'block', flexShrink: 0 },
  });
};

// ─── Ring Component ───────────────────────────────────────────────────────────
const DebtRing = ({ percent, theme }) => {
  const r = 54;
  const circ = 2 * Math.PI * r;
  const dash = circ * (1 - percent / 100);
  const color = percent > 70 ? theme.danger : percent > 40 ? theme.orange : theme.primary;

  return React.createElement('svg', { width: 140, height: 140, viewBox: '0 0 140 140' },
    React.createElement('circle', { cx: 70, cy: 70, r, fill: 'none', stroke: theme.border, strokeWidth: 10 }),
    React.createElement('circle', {
      cx: 70, cy: 70, r, fill: 'none',
      stroke: color, strokeWidth: 10,
      strokeDasharray: circ,
      strokeDashoffset: dash,
      strokeLinecap: 'round',
      transform: 'rotate(-90 70 70)',
      style: { transition: 'stroke-dashoffset 1s ease' }
    }),
  );
};

// ─── MiniBar Chart ────────────────────────────────────────────────────────────
const MiniBar = ({ value, max, color, theme }) => {
  const pct = Math.min((value / max) * 100, 100);
  return React.createElement('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 } },
    React.createElement('div', { style: { width: 28, height: 80, background: theme.border, borderRadius: 6, overflow: 'hidden', display: 'flex', alignItems: 'flex-end' } },
      React.createElement('div', { style: { width: '100%', height: `${pct}%`, background: color, borderRadius: 6, transition: 'height 0.8s ease' } })
    )
  );
};

// ─── Screen: Home ────────────────────────────────────────────────────────────
const HomeScreen = ({ theme, isDark }) => {
  const [activeWorkout, setActiveWorkout] = useState(null);
  const [expandedItem, setExpandedItem] = useState(null);
  const debtPercent = 58;

  const typeColors = { Recovery: theme.accent, Mobility: theme.orange, Cardio: theme.primary, Strength: theme.danger };

  return React.createElement('div', {
    style: { flex: 1, overflowY: 'auto', paddingBottom: 90, background: theme.bg }
  },
    // Header greeting
    React.createElement('div', { style: { padding: '20px 20px 0' } },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' } },
        React.createElement('div', null,
          React.createElement('div', { style: { fontSize: 13, color: theme.textSub, fontWeight: 500, marginBottom: 2 } }, 'Good afternoon, Maya'),
          React.createElement('div', { style: { fontSize: 22, color: theme.text, fontWeight: 800, lineHeight: 1.1 } }, 'Keep the\nmomentum going'),
        ),
        React.createElement('div', {
          style: { width: 40, height: 40, borderRadius: 20, background: `linear-gradient(135deg, ${theme.primary}, ${theme.accent})`, display: 'flex', alignItems: 'center', justifyContent: 'center' }
        },
          React.createElement('span', { style: { fontSize: 16 } }, '🔥')
        )
      )
    ),

    // Movement Debt Card
    React.createElement('div', { style: { margin: '16px 20px 0', background: theme.card, borderRadius: 20, padding: 20, border: `1px solid ${theme.border}` } },
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 16 } },
        React.createElement('div', { style: { position: 'relative' } },
          React.createElement(DebtRing, { percent: debtPercent, theme }),
          React.createElement('div', { style: { position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' } },
            React.createElement('div', { style: { fontSize: 22, fontWeight: 800, color: theme.orange } }, '58'),
            React.createElement('div', { style: { fontSize: 10, color: theme.textSub, fontWeight: 500 } }, 'DEBT')
          )
        ),
        React.createElement('div', { style: { flex: 1 } },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 } },
            React.createElement('div', { style: { fontSize: 16, fontWeight: 800, color: theme.text } }, 'Movement Debt'),
            React.createElement('div', { style: { background: theme.orangeDim, borderRadius: 6, padding: '2px 6px' } },
              React.createElement('span', { style: { fontSize: 10, color: theme.orange, fontWeight: 700 } }, 'MODERATE')
            )
          ),
          React.createElement('div', { style: { fontSize: 12, color: theme.textSub, lineHeight: 1.5, marginBottom: 12 } }, '4h 20m sedentary · 1 missed window · 1 stress spike'),
          React.createElement('div', { style: { display: 'flex', gap: 8 } },
            [{ label: 'Sit', val: '4h 20m', key: 's' }, { label: 'Moved', val: '14 min', key: 'm' }, { label: 'Left', val: '3 gaps', key: 'l' }].map(s =>
              React.createElement('div', { key: s.key, style: { flex: 1, background: theme.cardAlt, borderRadius: 10, padding: '6px 4px', textAlign: 'center' } },
                React.createElement('div', { style: { fontSize: 13, fontWeight: 700, color: theme.text } }, s.val),
                React.createElement('div', { style: { fontSize: 9, color: theme.textSub, fontWeight: 500 } }, s.label)
              )
            )
          )
        )
      )
    ),

    // Active Prescription
    React.createElement('div', { style: { margin: '12px 20px 0' } },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 } },
        React.createElement('div', { style: { fontSize: 14, fontWeight: 700, color: theme.text } }, "Today's Queue"),
        React.createElement('div', { style: { fontSize: 12, color: theme.primary, fontWeight: 600 } }, '5 moves')
      ),
      todayQueue.map((item, i) =>
        React.createElement('div', {
          key: item.id,
          onClick: () => setExpandedItem(expandedItem === item.id ? null : item.id),
          style: {
            background: item.active ? theme.primaryDim : item.done ? theme.cardAlt : theme.card,
            border: `1px solid ${item.active ? theme.primary : theme.border}`,
            borderRadius: 14,
            padding: '12px 14px',
            marginBottom: 8,
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            cursor: 'pointer',
            opacity: item.done && !item.active ? 0.6 : 1,
            transition: 'all 0.2s',
          }
        },
          // Status dot
          React.createElement('div', {
            style: {
              width: 28, height: 28, borderRadius: 14,
              background: item.done ? typeColors[item.type] : item.active ? theme.primary : theme.border,
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
            }
          },
            item.done
              ? React.createElement(LucideIcon, { name: 'Check', size: 14, color: isDark ? '#0B0E1A' : '#fff', strokeWidth: 3 })
              : React.createElement('div', { style: { width: 8, height: 8, borderRadius: 4, background: item.active ? '#0B0E1A' : theme.textMuted } })
          ),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', { style: { fontSize: 14, fontWeight: 600, color: item.done ? theme.textSub : theme.text } }, item.title),
            React.createElement('div', { style: { fontSize: 11, color: theme.textSub, marginTop: 1 } },
              item.type, ' · ', item.duration
            )
          ),
          item.active && React.createElement('div', {
            style: { background: theme.primary, borderRadius: 20, padding: '6px 14px', fontSize: 12, fontWeight: 700, color: isDark ? '#0B0E1A' : '#fff' }
          }, 'Start'),
          !item.active && !item.done && React.createElement(LucideIcon, { name: 'ChevronRight', size: 16, color: theme.textMuted }),
        )
      )
    ),

    // Quick Recovery
    React.createElement('div', { style: { margin: '16px 20px 0' } },
      React.createElement('div', { style: { fontSize: 14, fontWeight: 700, color: theme.text, marginBottom: 10 } }, 'Instant Recovery'),
      React.createElement('div', { style: { display: 'flex', gap: 10 } },
        [
          { label: 'Neck Reset', time: '90s', icon: 'Wind', color: theme.accent },
          { label: 'Box Breath', time: '2 min', icon: 'Activity', color: theme.orange },
          { label: 'Hip Reset', time: '2 min', icon: 'Loader', color: theme.primary },
        ].map((r, i) =>
          React.createElement('div', {
            key: i,
            style: { flex: 1, background: theme.card, border: `1px solid ${theme.border}`, borderRadius: 14, padding: '12px 10px', textAlign: 'center', cursor: 'pointer' }
          },
            React.createElement('div', {
              style: { width: 36, height: 36, borderRadius: 12, background: theme.cardAlt, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px' }
            },
              React.createElement(LucideIcon, { name: r.icon, size: 18, color: r.color })
            ),
            React.createElement('div', { style: { fontSize: 11, fontWeight: 600, color: theme.text } }, r.label),
            React.createElement('div', { style: { fontSize: 10, color: theme.textSub, marginTop: 2 } }, r.time)
          )
        )
      )
    ),

    // Streak card
    React.createElement('div', { style: { margin: '12px 20px 0', background: `linear-gradient(135deg, ${isDark ? '#1A2830' : '#E8F5FF'}, ${isDark ? '#1A2040' : '#F0F0FF'})`, border: `1px solid ${theme.border}`, borderRadius: 20, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 14 } },
      React.createElement('div', { style: { fontSize: 36 } }, '🔥'),
      React.createElement('div', null,
        React.createElement('div', { style: { fontSize: 22, fontWeight: 800, color: theme.text } }, '12-day streak'),
        React.createElement('div', { style: { fontSize: 12, color: theme.textSub, marginTop: 2 } }, 'Best ever: 19 days · 3 workouts today')
      )
    )
  );
};

// ─── Screen: Workouts ────────────────────────────────────────────────────────
const WorkoutsScreen = ({ theme, isDark }) => {
  const [selected, setSelected] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const cats = ['All', 'Recovery', 'Mobility', 'Cardio', 'Strength'];
  const catColors = { Recovery: theme.accent, Mobility: theme.orange, Cardio: theme.primary, Strength: theme.danger };
  const catIconBg = { Recovery: theme.accentDim, Mobility: theme.orangeDim, Cardio: theme.primaryDim, Strength: theme.dangerDim };

  const filtered = activeCategory === 'All' ? workoutLibrary : workoutLibrary.filter(c => c.category === activeCategory);

  return React.createElement('div', { style: { flex: 1, overflowY: 'auto', paddingBottom: 90, background: theme.bg } },
    React.createElement('div', { style: { padding: '20px 20px 0' } },
      React.createElement('div', { style: { fontSize: 22, fontWeight: 800, color: theme.text, marginBottom: 4 } }, 'Micro-Workouts'),
      React.createElement('div', { style: { fontSize: 13, color: theme.textSub } }, '2–8 minute prescriptions, anytime')
    ),

    // Category pills
    React.createElement('div', { style: { display: 'flex', gap: 8, padding: '12px 20px', overflowX: 'auto' } },
      cats.map(c =>
        React.createElement('div', {
          key: c,
          onClick: () => setActiveCategory(c),
          style: {
            padding: '7px 14px', borderRadius: 20, cursor: 'pointer', flexShrink: 0,
            fontSize: 13, fontWeight: 600,
            background: activeCategory === c ? theme.primary : theme.card,
            color: activeCategory === c ? (isDark ? '#0B0E1A' : '#fff') : theme.textSub,
            border: `1px solid ${activeCategory === c ? theme.primary : theme.border}`,
            transition: 'all 0.2s',
          }
        }, c)
      )
    ),

    // Workout categories
    React.createElement('div', { style: { padding: '0 20px' } },
      filtered.map((cat, ci) =>
        React.createElement('div', { key: cat.category, style: { marginBottom: 20 } },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 } },
            React.createElement('div', { style: { width: 28, height: 28, borderRadius: 8, background: catIconBg[cat.category], display: 'flex', alignItems: 'center', justifyContent: 'center' } },
              React.createElement(LucideIcon, { name: cat.icon, size: 14, color: catColors[cat.category] })
            ),
            React.createElement('div', { style: { fontSize: 15, fontWeight: 700, color: theme.text } }, cat.category),
            React.createElement('div', { style: { marginLeft: 'auto', fontSize: 12, color: theme.textSub } }, `${cat.items.length} moves`)
          ),
          cat.items.map((item, ii) =>
            React.createElement('div', {
              key: ii,
              onClick: () => setSelected(selected === `${ci}-${ii}` ? null : `${ci}-${ii}`),
              style: {
                background: theme.card, border: `1px solid ${theme.border}`, borderRadius: 14,
                padding: '12px 14px', marginBottom: 8, cursor: 'pointer',
                transition: 'all 0.15s',
              }
            },
              React.createElement('div', { style: { display: 'flex', alignItems: 'center' } },
                React.createElement('div', { style: { flex: 1 } },
                  React.createElement('div', { style: { fontSize: 14, fontWeight: 600, color: theme.text } }, item.name),
                  React.createElement('div', { style: { fontSize: 12, color: theme.textSub, marginTop: 2 } }, `${item.duration} · ~${item.cals} kcal`)
                ),
                React.createElement('div', {
                  style: { background: catColors[cat.category] + '22', borderRadius: 20, padding: '5px 12px', fontSize: 12, fontWeight: 600, color: catColors[cat.category] }
                }, 'Go')
              ),
              selected === `${ci}-${ii}` && React.createElement('div', { style: { marginTop: 12, paddingTop: 12, borderTop: `1px solid ${theme.border}` } },
                React.createElement('div', { style: { display: 'flex', gap: 8 } },
                  React.createElement('div', { style: { flex: 1, background: theme.cardAlt, borderRadius: 10, padding: '10px 12px' } },
                    React.createElement('div', { style: { fontSize: 12, color: theme.textSub } }, 'Duration'),
                    React.createElement('div', { style: { fontSize: 15, fontWeight: 700, color: theme.text } }, item.duration)
                  ),
                  React.createElement('div', { style: { flex: 1, background: theme.cardAlt, borderRadius: 10, padding: '10px 12px' } },
                    React.createElement('div', { style: { fontSize: 12, color: theme.textSub } }, 'Calories'),
                    React.createElement('div', { style: { fontSize: 15, fontWeight: 700, color: theme.text } }, `~${item.cals} kcal`)
                  ),
                  React.createElement('div', { style: { flex: 1, background: theme.cardAlt, borderRadius: 10, padding: '10px 12px' } },
                    React.createElement('div', { style: { fontSize: 12, color: theme.textSub } }, 'Equipment'),
                    React.createElement('div', { style: { fontSize: 15, fontWeight: 700, color: theme.text } }, 'None')
                  ),
                )
              )
            )
          )
        )
      )
    )
  );
};

// ─── Screen: Schedule ────────────────────────────────────────────────────────
const ScheduleScreen = ({ theme, isDark }) => {
  const [selected, setSelected] = useState(null);
  const typeColors = { Recovery: theme.accent, Mobility: theme.orange, Cardio: theme.primary, Strength: theme.danger };
  const confColor = (c) => c >= 90 ? theme.primary : c >= 80 ? theme.orange : theme.textSub;

  const hours = ['9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM'];
  const events = [
    { time: '9:30 AM', label: 'Team Standup', duration: 30, color: theme.accent },
    { time: '10:00 AM', label: 'Deep Work', duration: 90, color: theme.accentDim },
    { time: '11:30 AM', label: '→ Desk Cardio Gap', duration: 12, color: theme.primary, gap: true },
    { time: '11:45 AM', label: 'Design Review', duration: 45, color: theme.accent },
    { time: '1:00 PM', label: 'Lunch Break', duration: 60, color: theme.orangeDim },
    { time: '1:15 PM', label: '→ Posture Flow', duration: 20, color: theme.orange, gap: true },
    { time: '2:00 PM', label: 'Client Sync', duration: 30, color: theme.accent },
    { time: '3:45 PM', label: '→ Breathwork Gap', duration: 8, color: theme.accentDim, gap: true },
    { time: '4:00 PM', label: 'Sprint Planning', duration: 60, color: theme.accent },
    { time: '6:00 PM', label: '→ Strength Finish', duration: 25, color: theme.primary, gap: true },
  ];

  return React.createElement('div', { style: { flex: 1, overflowY: 'auto', paddingBottom: 90, background: theme.bg } },
    React.createElement('div', { style: { padding: '20px 20px 0' } },
      React.createElement('div', { style: { fontSize: 22, fontWeight: 800, color: theme.text, marginBottom: 4 } }, 'Smart Schedule'),
      React.createElement('div', { style: { fontSize: 13, color: theme.textSub, marginBottom: 16 } }, 'Movement gaps detected in your day')
    ),

    // Today summary
    React.createElement('div', { style: { display: 'flex', gap: 10, padding: '0 20px 16px' } },
      [
        { label: 'Gaps Found', val: '5', color: theme.primary },
        { label: 'Free Time', val: '83 min', color: theme.accent },
        { label: 'Suggested', val: '22 min', color: theme.orange },
      ].map((s, i) =>
        React.createElement('div', { key: i, style: { flex: 1, background: theme.card, border: `1px solid ${theme.border}`, borderRadius: 14, padding: '10px 8px', textAlign: 'center' } },
          React.createElement('div', { style: { fontSize: 18, fontWeight: 800, color: s.color } }, s.val),
          React.createElement('div', { style: { fontSize: 10, color: theme.textSub, marginTop: 2, fontWeight: 500 } }, s.label)
        )
      )
    ),

    // Gap cards
    React.createElement('div', { style: { padding: '0 20px', marginBottom: 16 } },
      React.createElement('div', { style: { fontSize: 14, fontWeight: 700, color: theme.text, marginBottom: 10 } }, "Today's Movement Windows"),
      scheduleGaps.map((gap, i) =>
        React.createElement('div', {
          key: i,
          onClick: () => setSelected(selected === i ? null : i),
          style: {
            background: theme.card, border: `1px solid ${selected === i ? typeColors[gap.type] : theme.border}`,
            borderRadius: 14, padding: '12px 14px', marginBottom: 8, cursor: 'pointer', transition: 'all 0.2s'
          }
        },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12 } },
            React.createElement('div', { style: { width: 40, height: 40, borderRadius: 12, background: typeColors[gap.type] + '20', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' } },
              React.createElement('div', { style: { fontSize: 10, fontWeight: 700, color: typeColors[gap.type] } }, gap.gap),
            ),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', { style: { fontSize: 14, fontWeight: 600, color: theme.text } }, gap.suggestion),
              React.createElement('div', { style: { fontSize: 11, color: theme.textSub, marginTop: 2 } }, `${gap.time} · ${gap.label}`)
            ),
            React.createElement('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 } },
              React.createElement('div', { style: { fontSize: 11, fontWeight: 700, color: confColor(gap.confidence) } }, `${gap.confidence}% fit`),
              React.createElement('div', { style: { background: typeColors[gap.type] + '22', borderRadius: 6, padding: '2px 8px', fontSize: 10, fontWeight: 600, color: typeColors[gap.type] } }, gap.type)
            )
          ),
          selected === i && React.createElement('div', { style: { marginTop: 12, paddingTop: 12, borderTop: `1px solid ${theme.border}`, display: 'flex', gap: 8 } },
            React.createElement('div', {
              style: { flex: 1, background: typeColors[gap.type], borderRadius: 10, padding: '10px', textAlign: 'center', cursor: 'pointer' }
            },
              React.createElement('div', { style: { fontSize: 13, fontWeight: 700, color: isDark ? '#0B0E1A' : '#fff' } }, 'Schedule It')
            ),
            React.createElement('div', {
              style: { flex: 1, background: theme.cardAlt, border: `1px solid ${theme.border}`, borderRadius: 10, padding: '10px', textAlign: 'center', cursor: 'pointer' }
            },
              React.createElement('div', { style: { fontSize: 13, fontWeight: 600, color: theme.text } }, 'Preview')
            )
          )
        )
      )
    )
  );
};

// ─── Screen: Stats ───────────────────────────────────────────────────────────
const StatsScreen = ({ theme, isDark }) => {
  const totalMins = weekData.reduce((s, d) => s + d.mins, 0);
  const maxMins = Math.max(...weekData.map(d => d.mins));
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const badges = [
    { emoji: '🔥', name: 'On Fire', desc: '12-day streak', unlocked: true },
    { emoji: '⚡', name: 'Zap Master', desc: '50 micro-sessions', unlocked: true },
    { emoji: '🧘', name: 'Recovery Pro', desc: '20 breathwork done', unlocked: true },
    { emoji: '🏃', name: 'Gap Hunter', desc: '10 calendar gaps used', unlocked: false },
    { emoji: '💪', name: 'Strength Week', desc: '5 strength moves in 7 days', unlocked: false },
    { emoji: '🌙', name: 'Night Owl', desc: 'Work out after 9pm', unlocked: false },
  ];

  return React.createElement('div', { style: { flex: 1, overflowY: 'auto', paddingBottom: 90, background: theme.bg } },
    React.createElement('div', { style: { padding: '20px 20px 0' } },
      React.createElement('div', { style: { fontSize: 22, fontWeight: 800, color: theme.text, marginBottom: 4 } }, 'Progress'),
      React.createElement('div', { style: { fontSize: 13, color: theme.textSub } }, 'Week of March 17–23')
    ),

    // Weekly bar chart
    React.createElement('div', { style: { margin: '16px 20px 0', background: theme.card, border: `1px solid ${theme.border}`, borderRadius: 20, padding: '16px' } },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 } },
        React.createElement('div', null,
          React.createElement('div', { style: { fontSize: 13, color: theme.textSub, fontWeight: 500 } }, 'Total this week'),
          React.createElement('div', { style: { fontSize: 28, fontWeight: 800, color: theme.text } }, `${totalMins} min`),
        ),
        React.createElement('div', { style: { background: theme.primaryDim, borderRadius: 10, padding: '6px 10px', textAlign: 'center' } },
          React.createElement('div', { style: { fontSize: 14, fontWeight: 800, color: theme.primary } }, '5/7'),
          React.createElement('div', { style: { fontSize: 10, color: theme.primary, opacity: 0.7 } }, 'days active')
        )
      ),
      React.createElement('div', { style: { display: 'flex', gap: 6, alignItems: 'flex-end', height: 80 } },
        weekData.map((d, i) => {
          const pct = maxMins > 0 ? (d.mins / maxMins) * 100 : 0;
          const isToday = i === 4; // Friday
          return React.createElement('div', { key: i, style: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 } },
            React.createElement('div', { style: { width: '100%', height: 68, display: 'flex', alignItems: 'flex-end' } },
              React.createElement('div', {
                style: {
                  width: '100%', height: `${Math.max(pct, d.mins > 0 ? 8 : 2)}%`,
                  background: d.mins === 0 ? theme.border : isToday ? theme.primary : theme.accent + '99',
                  borderRadius: '4px 4px 2px 2px',
                  minHeight: d.mins > 0 ? 6 : 2,
                  transition: 'height 0.8s ease',
                  border: isToday ? `1px solid ${theme.primary}` : 'none',
                }
              })
            ),
            React.createElement('div', { style: { fontSize: 10, color: isToday ? theme.primary : theme.textSub, fontWeight: isToday ? 700 : 500 } }, d.day)
          );
        })
      )
    ),

    // Type breakdown
    React.createElement('div', { style: { margin: '12px 20px 0', background: theme.card, border: `1px solid ${theme.border}`, borderRadius: 20, padding: '16px' } },
      React.createElement('div', { style: { fontSize: 14, fontWeight: 700, color: theme.text, marginBottom: 12 } }, 'Activity Breakdown'),
      [
        { type: 'Recovery', mins: 28, pct: 27, color: theme.accent },
        { type: 'Mobility', mins: 22, pct: 21, color: theme.orange },
        { type: 'Cardio', mins: 35, pct: 33, color: theme.primary },
        { type: 'Strength', mins: 20, pct: 19, color: theme.danger },
      ].map((t, i) =>
        React.createElement('div', { key: i, style: { marginBottom: 10 } },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: 4 } },
            React.createElement('div', { style: { fontSize: 13, fontWeight: 500, color: theme.text } }, t.type),
            React.createElement('div', { style: { fontSize: 12, color: theme.textSub } }, `${t.mins} min`)
          ),
          React.createElement('div', { style: { height: 6, background: theme.border, borderRadius: 3, overflow: 'hidden' } },
            React.createElement('div', { style: { height: '100%', width: `${t.pct}%`, background: t.color, borderRadius: 3 } })
          )
        )
      )
    ),

    // Stat highlights
    React.createElement('div', { style: { margin: '12px 20px 0', display: 'flex', gap: 10 } },
      [
        { label: 'Sessions', val: '24', sub: 'this week', icon: 'Activity', color: theme.primary },
        { label: 'Calories', val: '418', sub: 'burned', icon: 'Flame', color: theme.orange },
        { label: 'Streak', val: '12', sub: 'days', icon: 'Award', color: theme.accent },
      ].map((s, i) =>
        React.createElement('div', { key: i, style: { flex: 1, background: theme.card, border: `1px solid ${theme.border}`, borderRadius: 16, padding: '12px 10px' } },
          React.createElement(LucideIcon, { name: s.icon, size: 18, color: s.color }),
          React.createElement('div', { style: { fontSize: 20, fontWeight: 800, color: theme.text, marginTop: 6 } }, s.val),
          React.createElement('div', { style: { fontSize: 10, color: theme.textSub, fontWeight: 500 } }, s.label),
          React.createElement('div', { style: { fontSize: 10, color: theme.textMuted } }, s.sub)
        )
      )
    ),

    // Badges
    React.createElement('div', { style: { margin: '12px 20px 0' } },
      React.createElement('div', { style: { fontSize: 14, fontWeight: 700, color: theme.text, marginBottom: 10 } }, 'Achievements'),
      React.createElement('div', { style: { display: 'flex', flexWrap: 'wrap', gap: 8 } },
        badges.map((b, i) =>
          React.createElement('div', { key: i, style: { width: 'calc(33.333% - 6px)', background: b.unlocked ? theme.card : theme.cardAlt, border: `1px solid ${b.unlocked ? theme.border : theme.border}`, borderRadius: 14, padding: '10px 8px', textAlign: 'center', opacity: b.unlocked ? 1 : 0.4 } },
            React.createElement('div', { style: { fontSize: 24, marginBottom: 4 } }, b.emoji),
            React.createElement('div', { style: { fontSize: 11, fontWeight: 700, color: theme.text } }, b.name),
            React.createElement('div', { style: { fontSize: 9, color: theme.textSub, marginTop: 2, lineHeight: 1.3 } }, b.desc)
          )
        )
      )
    )
  );
};

// ─── Screen: Settings ────────────────────────────────────────────────────────
const SettingsScreen = ({ theme, isDark, toggleTheme }) => {
  const [notifs, setNotifs] = useState(true);
  const [calSync, setCalSync] = useState(true);
  const [location, setLocation] = useState(false);
  const [adaptive, setAdaptive] = useState(true);

  const Toggle = ({ value, onToggle }) =>
    React.createElement('div', {
      onClick: onToggle,
      style: {
        width: 44, height: 26, borderRadius: 13, cursor: 'pointer',
        background: value ? theme.primary : theme.border,
        position: 'relative', transition: 'background 0.2s',
        flexShrink: 0,
      }
    },
      React.createElement('div', {
        style: {
          position: 'absolute', top: 3, left: value ? 21 : 3,
          width: 20, height: 20, borderRadius: 10,
          background: '#fff', transition: 'left 0.2s',
          boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
        }
      })
    );

  const Row = ({ label, sub, value, onToggle, icon }) =>
    React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12, padding: '13px 0', borderBottom: `1px solid ${theme.border}` } },
      React.createElement('div', { style: { width: 32, height: 32, borderRadius: 10, background: theme.cardAlt, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
        React.createElement(LucideIcon, { name: icon, size: 16, color: theme.textSub })
      ),
      React.createElement('div', { style: { flex: 1 } },
        React.createElement('div', { style: { fontSize: 14, fontWeight: 600, color: theme.text } }, label),
        sub && React.createElement('div', { style: { fontSize: 11, color: theme.textSub, marginTop: 1 } }, sub)
      ),
      React.createElement(Toggle, { value, onToggle })
    );

  return React.createElement('div', { style: { flex: 1, overflowY: 'auto', paddingBottom: 90, background: theme.bg } },
    // Profile header
    React.createElement('div', { style: { padding: '20px 20px 0' } },
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 } },
        React.createElement('div', { style: { width: 56, height: 56, borderRadius: 28, background: `linear-gradient(135deg, ${theme.primary}, ${theme.accent})`, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
          React.createElement('span', { style: { fontSize: 24 } }, '🧘')
        ),
        React.createElement('div', null,
          React.createElement('div', { style: { fontSize: 18, fontWeight: 800, color: theme.text } }, 'Maya Chen'),
          React.createElement('div', { style: { fontSize: 12, color: theme.textSub } }, 'Remote developer · San Francisco'),
          React.createElement('div', { style: { fontSize: 11, color: theme.primary, fontWeight: 600, marginTop: 2 } }, 'Pro Member · Joined Jan 2026')
        )
      )
    ),

    // Theme toggle highlight card
    React.createElement('div', {
      onClick: toggleTheme,
      style: {
        margin: '0 20px 16px', background: isDark
          ? `linear-gradient(135deg, #1A2030, #1A1A35)`
          : `linear-gradient(135deg, #FFF9E6, #FFF3E8)`,
        border: `1px solid ${theme.border}`, borderRadius: 18, padding: '14px 16px',
        display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer'
      }
    },
      React.createElement('div', { style: { width: 40, height: 40, borderRadius: 14, background: isDark ? '#252A45' : '#FFE5B4', display: 'flex', alignItems: 'center', justifyContent: 'center' } },
        React.createElement(LucideIcon, { name: isDark ? 'Moon' : 'Sun', size: 20, color: isDark ? theme.accent : '#E0901F' })
      ),
      React.createElement('div', { style: { flex: 1 } },
        React.createElement('div', { style: { fontSize: 15, fontWeight: 700, color: theme.text } }, isDark ? 'Dark Mode' : 'Light Mode'),
        React.createElement('div', { style: { fontSize: 12, color: theme.textSub } }, 'Tap to switch theme')
      ),
      React.createElement('div', { style: { background: isDark ? theme.accent + '30' : '#FFE5B4', borderRadius: 20, padding: '5px 12px', fontSize: 12, fontWeight: 600, color: isDark ? theme.accent : '#C97A1A' } },
        isDark ? 'On' : 'On'
      )
    ),

    // Settings sections
    React.createElement('div', { style: { margin: '0 20px', background: theme.card, border: `1px solid ${theme.border}`, borderRadius: 18, padding: '0 14px', marginBottom: 12 } },
      React.createElement('div', { style: { fontSize: 11, fontWeight: 700, color: theme.textMuted, letterSpacing: 1, padding: '12px 0 4px' } }, 'SMART FEATURES'),
      React.createElement(Row, { label: 'Smart Notifications', sub: 'Context-aware movement reminders', value: notifs, onToggle: () => setNotifs(!notifs), icon: 'Bell' }),
      React.createElement(Row, { label: 'Calendar Sync', sub: 'Detect gaps in your schedule', value: calSync, onToggle: () => setCalSync(!calSync), icon: 'Calendar' }),
      React.createElement(Row, { label: 'Location Awareness', sub: 'Tailor moves to your environment', value: location, onToggle: () => setLocation(!location), icon: 'MapPin' }),
      React.createElement('div', { style: { padding: '13px 0', display: 'flex', alignItems: 'center', gap: 12 } },
        React.createElement('div', { style: { width: 32, height: 32, borderRadius: 10, background: theme.cardAlt, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
          React.createElement(LucideIcon, { name: 'Activity', size: 16, color: theme.textSub })
        ),
        React.createElement('div', { style: { flex: 1 } },
          React.createElement('div', { style: { fontSize: 14, fontWeight: 600, color: theme.text } }, 'Adaptive Learning'),
          React.createElement('div', { style: { fontSize: 11, color: theme.textSub, marginTop: 1 } }, 'Improve timing from your patterns')
        ),
        React.createElement('div', {
          onClick: () => setAdaptive(!adaptive),
          style: {
            width: 44, height: 26, borderRadius: 13, cursor: 'pointer',
            background: adaptive ? theme.primary : theme.border, position: 'relative', transition: 'background 0.2s',
          }
        },
          React.createElement('div', { style: { position: 'absolute', top: 3, left: adaptive ? 21 : 3, width: 20, height: 20, borderRadius: 10, background: '#fff', transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.3)' } })
        )
      )
    ),

    // Goals
    React.createElement('div', { style: { margin: '0 20px 12px', background: theme.card, border: `1px solid ${theme.border}`, borderRadius: 18, padding: '0 14px' } },
      React.createElement('div', { style: { fontSize: 11, fontWeight: 700, color: theme.textMuted, letterSpacing: 1, padding: '12px 0 4px' } }, 'GOALS'),
      [
        { label: 'Daily Movement Target', val: '20 min', icon: 'Timer' },
        { label: 'Focus Type', val: 'Mobility', icon: 'Activity' },
        { label: 'Reminder Intensity', val: 'Gentle', icon: 'Bell' },
      ].map((r, i) =>
        React.createElement('div', { key: i, style: { display: 'flex', alignItems: 'center', gap: 12, padding: '13px 0', borderBottom: i < 2 ? `1px solid ${theme.border}` : 'none' } },
          React.createElement('div', { style: { width: 32, height: 32, borderRadius: 10, background: theme.cardAlt, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
            React.createElement(LucideIcon, { name: r.icon, size: 16, color: theme.textSub })
          ),
          React.createElement('div', { style: { flex: 1, fontSize: 14, fontWeight: 600, color: theme.text } }, r.label),
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
            React.createElement('div', { style: { fontSize: 13, color: theme.textSub } }, r.val),
            React.createElement(LucideIcon, { name: 'ChevronRight', size: 14, color: theme.textMuted })
          )
        )
      )
    ),

    // App info
    React.createElement('div', { style: { padding: '0 20px 8px', textAlign: 'center' } },
      React.createElement('div', { style: { fontSize: 12, color: theme.textMuted } }, 'Pulse Pact v1.0.0 · Fitness built around your real day.')
    )
  );
};

// ─── Main App ────────────────────────────────────────────────────────────────
function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isDark, setIsDark] = useState(true);
  const theme = isDark ? themes.dark : themes.light;

  const tabs = [
    { id: 'home', label: 'Home', icon: 'Home' },
    { id: 'workouts', label: 'Library', icon: 'Dumbbell' },
    { id: 'schedule', label: 'Schedule', icon: 'Calendar' },
    { id: 'stats', label: 'Stats', icon: 'BarChart2' },
    { id: 'settings', label: 'Profile', icon: 'Settings' },
  ];

  const renderScreen = () => {
    switch (activeTab) {
      case 'home': return React.createElement(HomeScreen, { theme, isDark });
      case 'workouts': return React.createElement(WorkoutsScreen, { theme, isDark });
      case 'schedule': return React.createElement(ScheduleScreen, { theme, isDark });
      case 'stats': return React.createElement(StatsScreen, { theme, isDark });
      case 'settings': return React.createElement(SettingsScreen, { theme, isDark, toggleTheme: () => setIsDark(!isDark) });
      default: return null;
    }
  };

  return React.createElement('div', {
    style: {
      minHeight: '100vh', background: '#0A0A0F',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
    }
  },
    React.createElement(FontLoader, null),

    // Phone frame
    React.createElement('div', {
      style: {
        width: 375, height: 812, background: theme.bg,
        borderRadius: 50, overflow: 'hidden',
        boxShadow: '0 40px 120px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.08)',
        display: 'flex', flexDirection: 'column', position: 'relative',
        border: `2px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.15)'}`,
      }
    },
      // Status bar
      React.createElement('div', {
        style: {
          height: 44, paddingTop: 12, paddingLeft: 24, paddingRight: 16,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: theme.bg, flexShrink: 0, position: 'relative', zIndex: 10,
        }
      },
        React.createElement('div', { style: { fontSize: 13, fontWeight: 700, color: theme.text } }, '9:41'),
        // Dynamic Island
        React.createElement('div', {
          style: {
            position: 'absolute', top: 8, left: '50%', transform: 'translateX(-50%)',
            width: 120, height: 34, background: '#000', borderRadius: 20,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }
        },
          React.createElement('div', { style: { width: 12, height: 12, borderRadius: 6, background: '#1a1a1a', border: '1px solid #333' } }),
          React.createElement('div', { style: { width: 8, height: 8, borderRadius: 4, background: '#222' } })
        ),
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 5 } },
          React.createElement(LucideIcon, { name: 'Signal', size: 14, color: theme.text, strokeWidth: 2 }),
          React.createElement(LucideIcon, { name: 'Wifi', size: 14, color: theme.text, strokeWidth: 2 }),
          React.createElement(LucideIcon, { name: 'Battery', size: 16, color: theme.text, strokeWidth: 2 }),
        )
      ),

      // Screen content
      React.createElement('div', { style: { flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' } },
        renderScreen()
      ),

      // Bottom nav
      React.createElement('div', {
        style: {
          height: 82, background: theme.navBg,
          borderTop: `1px solid ${theme.border}`,
          display: 'flex', alignItems: 'flex-start', justifyContent: 'space-around',
          paddingTop: 10, paddingBottom: 20, flexShrink: 0,
        }
      },
        tabs.map(tab =>
          React.createElement('div', {
            key: tab.id,
            onClick: () => setActiveTab(tab.id),
            style: {
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
              cursor: 'pointer', padding: '2px 10px',
              transition: 'opacity 0.15s',
            }
          },
            React.createElement('div', {
              style: {
                width: 36, height: 36, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: activeTab === tab.id ? theme.primaryDim : 'transparent',
                transition: 'background 0.2s',
              }
            },
              React.createElement(LucideIcon, {
                name: tab.icon, size: 20,
                color: activeTab === tab.id ? theme.primary : theme.textMuted,
                strokeWidth: activeTab === tab.id ? 2.5 : 2,
              })
            ),
            React.createElement('div', {
              style: {
                fontSize: 10, fontWeight: activeTab === tab.id ? 700 : 500,
                color: activeTab === tab.id ? theme.primary : theme.textMuted,
                transition: 'color 0.2s',
              }
            }, tab.label)
          )
        )
      )
    )
  );
}
