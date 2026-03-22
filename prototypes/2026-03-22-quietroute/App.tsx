const { useState, useEffect, useRef } = React;

// ============================================================
// DESIGN SYSTEM
// ============================================================
const themes = {
  light: {
    bg: '#F2FAF6',
    surface: '#FFFFFF',
    surfaceAlt: '#EDF7F2',
    surfaceMid: '#F7FCF9',
    text: '#0C1F17',
    textSec: '#3A6651',
    textTert: '#7AA898',
    primary: '#0CBF78',
    primaryLight: '#D4F5E7',
    primaryDim: '#E8FAF2',
    primaryDark: '#09A064',
    border: '#D1EDE0',
    borderMid: '#E4F4EC',
    navBg: '#FFFFFF',
    red: '#E53E3E',
    redLight: '#FFF0F0',
    redBorder: '#FFC5C5',
    amber: '#D97706',
    amberLight: '#FEF3C7',
    amberBorder: '#FDE68A',
    blue: '#2563EB',
    blueLight: '#DBEAFE',
    blueBorder: '#BFDBFE',
    shadow: '0 2px 16px rgba(12,191,120,0.10)',
    shadowMd: '0 6px 28px rgba(12,191,120,0.14)',
    shadowCard: '0 1px 6px rgba(12,191,120,0.08)',
  },
  dark: {
    bg: '#071910',
    surface: '#0E2A1C',
    surfaceAlt: '#142E20',
    surfaceMid: '#112618',
    text: '#E0F2EA',
    textSec: '#72B898',
    textTert: '#3A6E55',
    primary: '#2ECC8A',
    primaryLight: '#0A3020',
    primaryDim: '#0C2A1A',
    primaryDark: '#26B07A',
    border: '#173D28',
    borderMid: '#122E1E',
    navBg: '#0A2015',
    red: '#F87171',
    redLight: '#200E0E',
    redBorder: '#4A1414',
    amber: '#FBB040',
    amberLight: '#221508',
    amberBorder: '#4A2E08',
    blue: '#60A5FA',
    blueLight: '#0F1E35',
    blueBorder: '#1E3A5F',
    shadow: '0 2px 16px rgba(0,0,0,0.5)',
    shadowMd: '0 6px 28px rgba(0,0,0,0.6)',
    shadowCard: '0 1px 6px rgba(0,0,0,0.4)',
  },
};

// ============================================================
// STATUS BAR
// ============================================================
function StatusBar({ theme, themeMode, setThemeMode }) {
  const MoonIcon = window.lucide.Moon;
  const SunIcon = window.lucide.Sun;
  return React.createElement('div', {
    style: {
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '14px 22px 8px', backgroundColor: theme.surface, flexShrink: 0,
      position: 'relative', zIndex: 20,
    },
  },
    React.createElement('span', {
      style: { fontSize: 13, fontWeight: 700, color: theme.text, letterSpacing: 0.2 },
    }, '9:41'),
    React.createElement('div', {
      style: {
        position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)',
        width: 116, height: 32, backgroundColor: '#060F0A', borderRadius: 20,
        zIndex: 30,
      },
    }),
    React.createElement('div', { style: { display: 'flex', gap: 8, alignItems: 'center', zIndex: 25 } },
      React.createElement('div', {
        onClick: () => setThemeMode(themeMode === 'light' ? 'dark' : 'light'),
        style: {
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          width: 26, height: 26, borderRadius: 13,
          backgroundColor: themeMode === 'light' ? theme.primaryDim : theme.primaryLight,
          border: `1px solid ${theme.border}`,
        },
      },
        themeMode === 'light'
          ? React.createElement(MoonIcon, { size: 13, color: theme.primary })
          : React.createElement(SunIcon, { size: 13, color: theme.primary }),
      ),
      React.createElement('svg', { width: 16, height: 12, viewBox: '0 0 16 12', fill: 'none' },
        React.createElement('rect', { x: 0.75, y: 0.75, width: 12.5, height: 10.5, rx: 2.25, stroke: theme.textTert, strokeWidth: 1.5 }),
        React.createElement('rect', { x: 2.5, y: 2.5, width: 7, height: 7, rx: 1, fill: theme.textSec }),
        React.createElement('path', { d: 'M13.25 4.5H15.25', stroke: theme.textTert, strokeWidth: 1.5, strokeLinecap: 'round' }),
      ),
      React.createElement('svg', { width: 16, height: 12, viewBox: '0 0 16 12', fill: 'none' },
        React.createElement('rect', { x: 0, y: 2, width: 4, height: 10, rx: 1, fill: theme.textTert }),
        React.createElement('rect', { x: 5, y: 0, width: 4, height: 12, rx: 1, fill: theme.textTert }),
        React.createElement('rect', { x: 10, y: 0, width: 4, height: 12, rx: 1, fill: theme.primary }),
        React.createElement('rect', { x: 14, y: 4, width: 2, height: 4, rx: 1, fill: theme.textTert }),
      ),
    ),
  );
}

// ============================================================
// MAP VIEW
// ============================================================
function MapView({ theme, themeMode, showPulse }) {
  const [pulse, setPulse] = useState(1);
  useEffect(() => {
    const id = setInterval(() => setPulse(p => p === 1 ? 1.25 : 1), 1200);
    return () => clearInterval(id);
  }, []);
  const isLight = themeMode === 'light';
  const mapBg = isLight ? '#D8EEE2' : '#091910';
  const blockFill = isLight ? '#C4E0CE' : '#0D2418';
  const blockStroke = isLight ? '#B4D4BE' : '#142E1E';
  const streetColor = isLight ? '#E8F5EE' : '#0A1F12';

  return React.createElement('div', {
    style: { width: '100%', height: '100%', position: 'relative', backgroundColor: mapBg, overflow: 'hidden' },
  },
    React.createElement('svg', {
      width: '100%', height: '100%', viewBox: '0 0 375 215', preserveAspectRatio: 'xMidYMid slice',
    },
      React.createElement('rect', { width: 375, height: 215, fill: mapBg }),
      // Horizontal streets
      ...[30, 80, 130, 175, 215].map((y, i) =>
        React.createElement('rect', { key: `hs${i}`, x: 0, y: y - 6, width: 375, height: 12, fill: streetColor })
      ),
      // Vertical streets
      ...[55, 120, 185, 250, 315].map((x, i) =>
        React.createElement('rect', { key: `vs${i}`, x: x - 6, y: 0, width: 12, height: 215, fill: streetColor })
      ),
      // City blocks
      React.createElement('rect', { x: 62, y: 37, width: 50, height: 36, rx: 3, fill: blockFill, stroke: blockStroke, strokeWidth: 0.5 }),
      React.createElement('rect', { x: 127, y: 37, width: 50, height: 36, rx: 3, fill: blockFill, stroke: blockStroke, strokeWidth: 0.5 }),
      React.createElement('rect', { x: 192, y: 37, width: 50, height: 36, rx: 3, fill: blockFill, stroke: blockStroke, strokeWidth: 0.5 }),
      React.createElement('rect', { x: 257, y: 37, width: 50, height: 36, rx: 3, fill: blockFill, stroke: blockStroke, strokeWidth: 0.5 }),
      React.createElement('rect', { x: 62, y: 87, width: 50, height: 36, rx: 3, fill: blockFill, stroke: blockStroke, strokeWidth: 0.5 }),
      React.createElement('rect', { x: 127, y: 87, width: 50, height: 36, rx: 3, fill: blockFill, stroke: blockStroke, strokeWidth: 0.5 }),
      React.createElement('rect', { x: 192, y: 87, width: 50, height: 36, rx: 3, fill: blockFill, stroke: blockStroke, strokeWidth: 0.5 }),
      React.createElement('rect', { x: 257, y: 87, width: 50, height: 36, rx: 3, fill: blockFill, stroke: blockStroke, strokeWidth: 0.5 }),
      React.createElement('rect', { x: 62, y: 137, width: 50, height: 32, rx: 3, fill: blockFill, stroke: blockStroke, strokeWidth: 0.5 }),
      React.createElement('rect', { x: 127, y: 137, width: 50, height: 32, rx: 3, fill: blockFill, stroke: blockStroke, strokeWidth: 0.5 }),
      React.createElement('rect', { x: 192, y: 137, width: 50, height: 32, rx: 3, fill: blockFill, stroke: blockStroke, strokeWidth: 0.5 }),
      React.createElement('rect', { x: 257, y: 137, width: 50, height: 32, rx: 3, fill: blockFill, stroke: blockStroke, strokeWidth: 0.5 }),
      React.createElement('rect', { x: 62, y: 182, width: 50, height: 30, rx: 3, fill: blockFill, stroke: blockStroke, strokeWidth: 0.5 }),
      React.createElement('rect', { x: 127, y: 182, width: 50, height: 30, rx: 3, fill: blockFill, stroke: blockStroke, strokeWidth: 0.5 }),
      React.createElement('rect', { x: 192, y: 182, width: 50, height: 30, rx: 3, fill: blockFill, stroke: blockStroke, strokeWidth: 0.5 }),
      React.createElement('rect', { x: 257, y: 182, width: 50, height: 30, rx: 3, fill: blockFill, stroke: blockStroke, strokeWidth: 0.5 }),
      // Busy zone tint (red)
      React.createElement('rect', { x: 185, y: 80, width: 132, height: 100, rx: 6, fill: 'rgba(229,62,62,0.10)', stroke: 'rgba(229,62,62,0.25)', strokeWidth: 1.5, strokeDasharray: '4 3' }),
      // Calm zone tint (green)
      React.createElement('rect', { x: 48, y: 22, width: 76, height: 172, rx: 6, fill: 'rgba(12,191,120,0.08)', stroke: 'rgba(12,191,120,0.2)', strokeWidth: 1.5, strokeDasharray: '4 3' }),
      // Route glow (calm path)
      React.createElement('path', { d: 'M 186 200 L 120 200 L 120 174 L 120 128 L 120 82 L 120 50', fill: 'none', stroke: theme.primary, strokeWidth: 9, strokeLinecap: 'round', strokeLinejoin: 'round', opacity: 0.18 }),
      // Route line
      React.createElement('path', { d: 'M 186 200 L 120 200 L 120 174 L 120 128 L 120 82 L 120 50', fill: 'none', stroke: theme.primary, strokeWidth: 3.5, strokeLinecap: 'round', strokeLinejoin: 'round', strokeDasharray: '7 0' }),
      // Destination marker
      React.createElement('circle', { cx: 120, cy: 50, r: 14, fill: '#E53E3E', opacity: 0.15 }),
      React.createElement('circle', { cx: 120, cy: 50, r: 8, fill: '#E53E3E' }),
      React.createElement('circle', { cx: 120, cy: 50, r: 4, fill: 'white' }),
      // Origin pulse ring
      showPulse && React.createElement('circle', { cx: 186, cy: 200, r: 16 * pulse, fill: 'none', stroke: theme.primary, strokeWidth: 1.5, opacity: 0.3 }),
      // Origin dot
      React.createElement('circle', { cx: 186, cy: 200, r: 10, fill: theme.primary, opacity: 0.18 }),
      React.createElement('circle', { cx: 186, cy: 200, r: 7, fill: theme.primary }),
      React.createElement('circle', { cx: 186, cy: 200, r: 3.5, fill: 'white' }),
      // Zone labels
      React.createElement('text', { x: 60, y: 118, fontSize: 8.5, fill: theme.primary, fontWeight: '700', opacity: 0.9, fontFamily: 'Plus Jakarta Sans, sans-serif', letterSpacing: 0.5 }, 'CALM ZONE'),
      React.createElement('text', { x: 210, y: 120, fontSize: 8.5, fill: '#E53E3E', fontWeight: '700', opacity: 0.9, fontFamily: 'Plus Jakarta Sans, sans-serif', letterSpacing: 0.5 }, 'BUSY ZONE'),
    ),
    // Floating badge
    React.createElement('div', {
      style: {
        position: 'absolute', top: 10, right: 10,
        backgroundColor: 'rgba(229,62,62,0.88)', borderRadius: 20, padding: '4px 11px',
        fontSize: 11, color: 'white', fontWeight: 700, backdropFilter: 'blur(8px)',
        display: 'flex', alignItems: 'center', gap: 5,
      },
    },
      React.createElement('span', {}, '⚡'),
      React.createElement('span', {}, 'Busy area avoided'),
    ),
    // Zoom controls
    React.createElement('div', {
      style: {
        position: 'absolute', bottom: 10, right: 10,
        backgroundColor: theme.surface, borderRadius: 10, overflow: 'hidden',
        boxShadow: theme.shadow, border: `1px solid ${theme.border}`,
      },
    },
      React.createElement('div', { style: { padding: '5px 11px', fontSize: 17, color: theme.text, cursor: 'pointer', textAlign: 'center', fontWeight: 300, lineHeight: 1.3 } }, '+'),
      React.createElement('div', { style: { height: 1, backgroundColor: theme.border } }),
      React.createElement('div', { style: { padding: '5px 11px', fontSize: 17, color: theme.text, cursor: 'pointer', textAlign: 'center', fontWeight: 300, lineHeight: 1.3 } }, '−'),
    ),
  );
}

// ============================================================
// CALM SCORE RING
// ============================================================
function CalmRing({ score, size, color, theme }) {
  const r = (size - 8) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;
  return React.createElement('svg', { width: size, height: size, viewBox: `0 0 ${size} ${size}` },
    React.createElement('circle', { cx: size / 2, cy: size / 2, r, fill: 'none', stroke: theme.border, strokeWidth: 4 }),
    React.createElement('circle', {
      cx: size / 2, cy: size / 2, r,
      fill: 'none', stroke: color || theme.primary, strokeWidth: 4,
      strokeLinecap: 'round',
      strokeDasharray: `${dash} ${circ - dash}`,
      transform: `rotate(-90 ${size / 2} ${size / 2})`,
    }),
    React.createElement('text', {
      x: size / 2, y: size / 2 + 5, textAnchor: 'middle',
      fontSize: size > 60 ? 18 : 13, fontWeight: '800',
      fill: color || theme.primary, fontFamily: 'Plus Jakarta Sans, sans-serif',
    }, score),
    React.createElement('text', {
      x: size / 2, y: size / 2 + 16, textAnchor: 'middle',
      fontSize: 8, fontWeight: '700', fill: theme.textTert,
      fontFamily: 'Plus Jakarta Sans, sans-serif', letterSpacing: 0.5,
    }, 'CALM'),
  );
}

// ============================================================
// HOME SCREEN
// ============================================================
function HomeScreen({ theme, themeMode, setActiveTab }) {
  const [activeFilter, setActiveFilter] = useState('quiet');
  const [searchFocused, setSearchFocused] = useState(false);
  const SearchIcon = window.lucide.Search;
  const NavigationIcon = window.lucide.Navigation2;
  const ZapOffIcon = window.lucide.ZapOff;
  const UsersIcon = window.lucide.Users;
  const SunIcon = window.lucide.Sun;
  const ArrowRightIcon = window.lucide.ArrowRight;
  const ClockIcon = window.lucide.Clock;
  const LeafIcon = window.lucide.Leaf;
  const MapPinIcon = window.lucide.MapPin;
  const TrendingUpIcon = window.lucide.TrendingUp;

  const filters = [
    { id: 'quiet', label: 'Quiet', icon: ZapOffIcon },
    { id: 'uncrowded', label: 'Uncrowded', icon: UsersIcon },
    { id: 'bright', label: 'Well-lit', icon: SunIcon },
    { id: 'smooth', label: 'Smooth', icon: LeafIcon },
  ];

  const recents = [
    { name: 'Work', address: '420 5th Ave, Midtown', emoji: '🏢', calm: 86 },
    { name: 'Yoga Studio', address: '112 W 72nd St', emoji: '🧘', calm: 93 },
    { name: 'Whole Foods', address: 'Columbus Ave & 97th', emoji: '🛒', calm: 78 },
  ];

  return React.createElement('div', {
    style: { flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', backgroundColor: theme.bg },
  },
    // Header section
    React.createElement('div', {
      style: {
        padding: '12px 20px 14px', backgroundColor: theme.surface,
        borderBottom: `1px solid ${theme.border}`,
      },
    },
      React.createElement('div', { style: { marginBottom: 10 } },
        React.createElement('div', { style: { fontSize: 13, color: theme.textSec, marginBottom: 1 } }, 'Good morning, Alex 🌿'),
        React.createElement('div', { style: { fontSize: 19, fontWeight: 800, color: theme.text } }, 'Where to today?'),
      ),
      // Search bar
      React.createElement('div', {
        onClick: () => setSearchFocused(!searchFocused),
        style: {
          display: 'flex', alignItems: 'center', gap: 10,
          backgroundColor: searchFocused ? theme.bg : theme.surfaceAlt,
          borderRadius: 16, padding: '13px 16px',
          border: `1.5px solid ${searchFocused ? theme.primary : theme.border}`,
          cursor: 'text', transition: 'all 0.2s',
          boxShadow: searchFocused ? `0 0 0 3px ${theme.primaryDim}` : 'none',
        },
      },
        React.createElement(SearchIcon, { size: 17, color: searchFocused ? theme.primary : theme.textTert }),
        React.createElement('span', { style: { color: theme.textTert, fontSize: 14, flex: 1 } }, 'Search destination or address…'),
        React.createElement('div', {
          style: {
            backgroundColor: theme.primaryLight, borderRadius: 8,
            padding: '3px 8px', fontSize: 11, color: theme.primary, fontWeight: 700,
          },
        }, 'NYC'),
      ),
      // Filter chips
      React.createElement('div', { style: { display: 'flex', gap: 7, marginTop: 12, overflowX: 'auto', paddingBottom: 2 } },
        filters.map(f =>
          React.createElement('div', {
            key: f.id,
            onClick: () => setActiveFilter(f.id),
            style: {
              display: 'flex', alignItems: 'center', gap: 5, padding: '6px 13px',
              borderRadius: 20, cursor: 'pointer', whiteSpace: 'nowrap',
              backgroundColor: activeFilter === f.id ? theme.primary : theme.surfaceAlt,
              border: `1.5px solid ${activeFilter === f.id ? theme.primary : theme.border}`,
              transition: 'all 0.18s',
            },
          },
            React.createElement(f.icon, { size: 12, color: activeFilter === f.id ? 'white' : theme.textSec }),
            React.createElement('span', { style: { fontSize: 12, fontWeight: 700, color: activeFilter === f.id ? 'white' : theme.textSec } }, f.label),
          )
        ),
      ),
    ),
    // Map
    React.createElement('div', { style: { flex: '0 0 215px', position: 'relative', flexShrink: 0 } },
      React.createElement(MapView, { theme, themeMode, showPulse: true }),
    ),
    // Scrollable bottom
    React.createElement('div', { style: { flex: 1, overflowY: 'auto', padding: '14px 16px 8px', backgroundColor: theme.bg } },
      // Suggested route card
      React.createElement('div', {
        style: {
          backgroundColor: theme.surface, borderRadius: 20, padding: '16px',
          marginBottom: 14, border: `1px solid ${theme.border}`, boxShadow: theme.shadowCard,
        },
      },
        React.createElement('div', { style: { display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 10 } },
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', { style: { fontSize: 11, fontWeight: 700, color: theme.textTert, letterSpacing: 0.5, marginBottom: 3 } }, 'SUGGESTED CALM ROUTE'),
            React.createElement('div', { style: { fontSize: 17, fontWeight: 800, color: theme.text } }, 'Central Park North'),
            React.createElement('div', { style: { fontSize: 12, color: theme.textSec, marginTop: 2 } }, 'Via Amsterdam Ave — Low noise, few crowds'),
          ),
          React.createElement(CalmRing, { score: 92, size: 58, theme }),
        ),
        // Stats row
        React.createElement('div', { style: { display: 'flex', gap: 16, marginBottom: 12 } },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 5 } },
            React.createElement(ClockIcon, { size: 13, color: theme.textSec }),
            React.createElement('span', { style: { fontSize: 13, color: theme.textSec } }, '24 min walk'),
          ),
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 5 } },
            React.createElement(NavigationIcon, { size: 13, color: theme.textSec }),
            React.createElement('span', { style: { fontSize: 13, color: theme.textSec } }, '1.4 km'),
          ),
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 5 } },
            React.createElement(TrendingUpIcon, { size: 13, color: theme.amber }),
            React.createElement('span', { style: { fontSize: 13, color: theme.amber, fontWeight: 600 } }, '+6 min vs fastest'),
          ),
        ),
        // Tags
        React.createElement('div', { style: { display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 13 } },
          [
            { label: 'Low noise', color: theme.primary, bg: theme.primaryLight },
            { label: 'Few crowds', color: theme.primary, bg: theme.primaryLight },
            { label: 'Good lighting', color: theme.blue, bg: theme.blueLight },
            { label: 'Smooth pavement', color: theme.primary, bg: theme.primaryLight },
          ].map((tag, i) =>
            React.createElement('div', {
              key: i,
              style: { backgroundColor: tag.bg, borderRadius: 20, padding: '3px 10px', fontSize: 11, color: tag.color, fontWeight: 600 },
            }, tag.label)
          ),
        ),
        // CTA button
        React.createElement('div', {
          onClick: () => setActiveTab('navigate'),
          style: {
            background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.primaryDark} 100%)`,
            borderRadius: 14, padding: '14px', textAlign: 'center', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            boxShadow: `0 4px 14px ${theme.primary}40`,
          },
        },
          React.createElement('span', { style: { color: 'white', fontWeight: 700, fontSize: 15 } }, 'Start Calm Route'),
          React.createElement(ArrowRightIcon, { size: 18, color: 'white' }),
        ),
      ),
      // Recent destinations
      React.createElement('div', { style: { marginBottom: 4 } },
        React.createElement('div', { style: { fontSize: 13, fontWeight: 800, color: theme.text, marginBottom: 10 } }, 'Recent Destinations'),
        recents.map((dest, i) =>
          React.createElement('div', {
            key: i,
            style: {
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '11px 14px', backgroundColor: theme.surface,
              borderRadius: 14, marginBottom: 7,
              border: `1px solid ${theme.border}`, cursor: 'pointer',
            },
          },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10 } },
              React.createElement('div', {
                style: {
                  width: 36, height: 36, borderRadius: 11, backgroundColor: theme.primaryDim,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0,
                },
              }, dest.emoji),
              React.createElement('div', {},
                React.createElement('div', { style: { fontSize: 13, fontWeight: 700, color: theme.text } }, dest.name),
                React.createElement('div', { style: { fontSize: 11, color: theme.textTert } }, dest.address),
              ),
            ),
            React.createElement('div', {
              style: {
                backgroundColor: dest.calm >= 85 ? theme.primaryLight : dest.calm >= 75 ? theme.blueLight : theme.amberLight,
                borderRadius: 10, padding: '4px 9px', textAlign: 'center',
              },
            },
              React.createElement('div', { style: { fontSize: 12, fontWeight: 800, color: dest.calm >= 85 ? theme.primary : dest.calm >= 75 ? theme.blue : theme.amber } }, dest.calm),
              React.createElement('div', { style: { fontSize: 9, fontWeight: 700, color: theme.textTert } }, 'CALM'),
            ),
          )
        ),
      ),
    ),
  );
}

// ============================================================
// NAVIGATE SCREEN
// ============================================================
function NavigateScreen({ theme, themeMode }) {
  const [stepIndex, setStepIndex] = useState(0);
  const NavigationIcon = window.lucide.Navigation2;
  const AlertTriangleIcon = window.lucide.AlertTriangle;
  const CheckCircleIcon = window.lucide.CheckCircle2;
  const ChevronRightIcon = window.lucide.ChevronRight;
  const PauseIcon = window.lucide.Pause;
  const FlagIcon = window.lucide.Flag;
  const EyeOffIcon = window.lucide.EyeOff;

  const steps = [
    {
      instruction: 'Head north on Amsterdam Ave',
      detail: 'Quiet residential stretch — low traffic, shaded sidewalk',
      type: 'calm', distance: '0.3 km', eta: '~4 min',
    },
    {
      instruction: 'Turn left onto W 110th St',
      detail: 'Wide sidewalk, very low foot traffic at this time',
      type: 'calm', distance: '0.1 km', eta: '~1 min',
    },
    {
      instruction: 'Busy crossing ahead at 5th Ave',
      detail: 'Morning rush at Morningside Park entrance. Use the side entrance at W 111th St to avoid the crowd.',
      type: 'warning', distance: '50 m', eta: '~1 min',
    },
    {
      instruction: 'Enter Central Park via north gate',
      detail: 'Very peaceful path, no traffic noise, tree-lined walkway',
      type: 'calm', distance: '0.2 km', eta: '~3 min',
    },
    {
      instruction: 'Arrived at your destination',
      detail: 'Central Park North — Calm Score 92/100 · Great choice!',
      type: 'arrived', distance: '', eta: '',
    },
  ];

  const cur = steps[stepIndex];
  const progress = stepIndex / (steps.length - 1);

  const headerBg = cur.type === 'warning'
    ? `linear-gradient(135deg, ${theme.red}, #B91C1C)`
    : cur.type === 'arrived'
    ? `linear-gradient(135deg, ${theme.primary}, ${theme.primaryDark})`
    : `linear-gradient(135deg, ${theme.primary}, ${theme.primaryDark})`;

  return React.createElement('div', {
    style: { flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', backgroundColor: theme.bg },
  },
    // Map
    React.createElement('div', { style: { flex: '0 0 200px', position: 'relative', flexShrink: 0 } },
      React.createElement(MapView, { theme, themeMode, showPulse: false }),
      // Instruction overlay on map
      React.createElement('div', {
        style: {
          position: 'absolute', top: 10, left: 10, right: 10,
          background: headerBg, borderRadius: 16, padding: '11px 15px',
          boxShadow: theme.shadowMd, display: 'flex', alignItems: 'center', gap: 11,
        },
      },
        React.createElement('div', {
          style: {
            width: 36, height: 36, borderRadius: 10, backgroundColor: 'rgba(255,255,255,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          },
        },
          React.createElement(
            cur.type === 'warning' ? AlertTriangleIcon : cur.type === 'arrived' ? FlagIcon : NavigationIcon,
            { size: 18, color: 'white' }
          ),
        ),
        React.createElement('div', { style: { flex: 1 } },
          React.createElement('div', { style: { fontSize: 13, fontWeight: 700, color: 'white', lineHeight: 1.3 } }, cur.instruction),
          cur.distance && React.createElement('div', { style: { fontSize: 11, color: 'rgba(255,255,255,0.82)', marginTop: 2 } }, `${cur.distance} · ${cur.eta}`),
        ),
      ),
    ),
    // Scroll content
    React.createElement('div', { style: { flex: 1, overflowY: 'auto', padding: '14px 16px 8px' } },
      // Guidance card
      React.createElement('div', {
        style: {
          backgroundColor: cur.type === 'warning' ? theme.redLight : theme.primaryDim,
          borderRadius: 16, padding: '14px 16px', marginBottom: 12,
          border: `1px solid ${cur.type === 'warning' ? theme.redBorder : theme.border}`,
        },
      },
        React.createElement('div', { style: { fontSize: 11, fontWeight: 800, color: cur.type === 'warning' ? theme.red : theme.primary, marginBottom: 5, letterSpacing: 0.5 } },
          cur.type === 'warning' ? '⚠ HEADS UP — STRESSFUL SEGMENT' : cur.type === 'arrived' ? '✓ DESTINATION REACHED' : '🌿 CALM SEGMENT',
        ),
        React.createElement('div', { style: { fontSize: 13, color: theme.text, lineHeight: 1.5 } }, cur.detail),
      ),
      // Progress card
      React.createElement('div', {
        style: {
          backgroundColor: theme.surface, borderRadius: 16, padding: '14px 16px', marginBottom: 12,
          border: `1px solid ${theme.border}`, boxShadow: theme.shadowCard,
        },
      },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 9 } },
          React.createElement('span', { style: { fontSize: 12, fontWeight: 700, color: theme.text } }, 'Journey Progress'),
          React.createElement('div', { style: { display: 'flex', gap: 12 } },
            React.createElement('span', { style: { fontSize: 12, color: theme.textTert } }, `${stepIndex + 1}/${steps.length} steps`),
            React.createElement('span', { style: { fontSize: 12, fontWeight: 700, color: theme.primary } }, `${Math.round(progress * 100)}%`),
          ),
        ),
        React.createElement('div', { style: { height: 7, backgroundColor: theme.border, borderRadius: 4, overflow: 'hidden' } },
          React.createElement('div', {
            style: {
              height: '100%', width: `${progress * 100}%`,
              background: `linear-gradient(90deg, ${theme.primary}, ${theme.primaryDark})`,
              borderRadius: 4, transition: 'width 0.4s ease',
            },
          }),
        ),
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginTop: 7 } },
          React.createElement('span', { style: { fontSize: 11, color: theme.textTert } }, 'Central Park North'),
          React.createElement('span', { style: { fontSize: 11, color: theme.textTert } },
            stepIndex < steps.length - 1 ? `~${(steps.length - 1 - stepIndex) * 2} min remaining` : 'Arrived!'),
        ),
      ),
      // Steps list
      React.createElement('div', {
        style: {
          backgroundColor: theme.surface, borderRadius: 16, border: `1px solid ${theme.border}`,
          overflow: 'hidden', marginBottom: 12,
        },
      },
        React.createElement('div', { style: { padding: '11px 16px', borderBottom: `1px solid ${theme.border}` } },
          React.createElement('span', { style: { fontSize: 11, fontWeight: 800, color: theme.textSec, letterSpacing: 0.5 } }, 'ALL STEPS'),
        ),
        steps.map((s, i) =>
          React.createElement('div', {
            key: i,
            onClick: () => setStepIndex(i),
            style: {
              display: 'flex', alignItems: 'flex-start', gap: 11, padding: '11px 14px',
              borderBottom: i < steps.length - 1 ? `1px solid ${theme.border}` : 'none',
              backgroundColor: i === stepIndex ? theme.primaryDim : 'transparent',
              cursor: 'pointer', transition: 'background 0.15s',
            },
          },
            React.createElement('div', {
              style: {
                width: 26, height: 26, borderRadius: 13, flexShrink: 0, marginTop: 1,
                backgroundColor: i < stepIndex ? theme.primary + '30' : i === stepIndex ? theme.primary : theme.surfaceAlt,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: i === stepIndex ? `2px solid ${theme.primary}` : 'none',
              },
            },
              i < stepIndex
                ? React.createElement(CheckCircleIcon, { size: 14, color: theme.primary })
                : React.createElement('span', { style: { fontSize: 10, fontWeight: 800, color: i === stepIndex ? 'white' : theme.textTert } }, i + 1),
            ),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', { style: { fontSize: 12, fontWeight: 600, color: i === stepIndex ? theme.text : theme.textSec, lineHeight: 1.3 } }, s.instruction),
              i === stepIndex && React.createElement('div', { style: { fontSize: 11, color: theme.textTert, marginTop: 3 } }, s.detail),
            ),
            s.type === 'warning' && React.createElement(AlertTriangleIcon, { size: 13, color: theme.red }),
          )
        ),
      ),
      // Controls
      React.createElement('div', { style: { display: 'flex', gap: 10 } },
        React.createElement('div', {
          style: {
            flex: 1, backgroundColor: theme.surface, borderRadius: 14, padding: '14px',
            textAlign: 'center', border: `1px solid ${theme.border}`, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
          },
        },
          React.createElement(PauseIcon, { size: 15, color: theme.textSec }),
          React.createElement('span', { style: { fontSize: 13, fontWeight: 600, color: theme.textSec } }, 'Pause'),
        ),
        React.createElement('div', {
          onClick: () => setStepIndex(Math.min(stepIndex + 1, steps.length - 1)),
          style: {
            flex: 2, background: `linear-gradient(135deg, ${theme.primary}, ${theme.primaryDark})`,
            borderRadius: 14, padding: '14px', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
            boxShadow: `0 4px 14px ${theme.primary}40`,
          },
        },
          React.createElement('span', { style: { fontSize: 13, fontWeight: 700, color: 'white' } },
            stepIndex < steps.length - 1 ? 'Next Step' : 'Finish Trip'),
          React.createElement(ChevronRightIcon, { size: 18, color: 'white' }),
        ),
      ),
    ),
  );
}

// ============================================================
// ROUTES SCREEN
// ============================================================
function RoutesScreen({ theme }) {
  const [selected, setSelected] = useState('calm');
  const [showDetails, setShowDetails] = useState(true);
  const ClockIcon = window.lucide.Clock;
  const NavigationIcon = window.lucide.Navigation2;
  const AlertCircleIcon = window.lucide.AlertCircle;
  const VolumeXIcon = window.lucide.VolumeX;
  const UsersIcon = window.lucide.Users;
  const TrendingUpIcon = window.lucide.TrendingUp;
  const SunIcon = window.lucide.Sun;
  const InfoIcon = window.lucide.Info;
  const ChevronDownIcon = window.lucide.ChevronDown;

  const routes = [
    {
      id: 'calm',
      label: 'Calmest', badge: '🌿',
      time: '24 min', distance: '1.4 km',
      calm: 92, color: theme.primary, colorLight: theme.primaryLight, colorBorder: theme.border,
      extra: '+6 min',
      highlight: 'Quiet streets, no construction, smooth pavement throughout',
      factors: [
        { icon: VolumeXIcon, label: 'Noise Level', value: 'Very Low', score: 94, color: theme.primary },
        { icon: UsersIcon, label: 'Crowd Density', value: 'Sparse', score: 90, color: theme.primary },
        { icon: AlertCircleIcon, label: 'Stress Points', value: '1 mild', score: 86, color: theme.amber },
        { icon: TrendingUpIcon, label: 'Surface Quality', value: 'Excellent', score: 97, color: theme.primary },
        { icon: SunIcon, label: 'Lighting', value: 'Well-lit', score: 91, color: theme.primary },
      ],
      warnings: [],
    },
    {
      id: 'balanced',
      label: 'Balanced', badge: '⚖️',
      time: '19 min', distance: '1.1 km',
      calm: 72, color: theme.blue, colorLight: theme.blueLight, colorBorder: theme.blueBorder,
      extra: '+1 min',
      highlight: 'Good compromise — minor detour around Times Square',
      factors: [
        { icon: VolumeXIcon, label: 'Noise Level', value: 'Moderate', score: 65, color: theme.amber },
        { icon: UsersIcon, label: 'Crowd Density', value: 'Medium', score: 70, color: theme.amber },
        { icon: AlertCircleIcon, label: 'Stress Points', value: '2 moderate', score: 60, color: theme.amber },
        { icon: TrendingUpIcon, label: 'Surface Quality', value: 'Good', score: 84, color: theme.primary },
        { icon: SunIcon, label: 'Lighting', value: 'Adequate', score: 76, color: theme.blue },
      ],
      warnings: ['Passes near a busy subway exit at W 66th St'],
    },
    {
      id: 'fast',
      label: 'Fastest', badge: '⚡',
      time: '18 min', distance: '1.0 km',
      calm: 41, color: theme.red, colorLight: theme.redLight, colorBorder: theme.redBorder,
      extra: 'Fastest',
      highlight: 'Direct but stressful — heavy foot traffic and construction zones',
      factors: [
        { icon: VolumeXIcon, label: 'Noise Level', value: 'High', score: 28, color: theme.red },
        { icon: UsersIcon, label: 'Crowd Density', value: 'Dense', score: 38, color: theme.red },
        { icon: AlertCircleIcon, label: 'Stress Points', value: '4 intense', score: 22, color: theme.red },
        { icon: TrendingUpIcon, label: 'Surface Quality', value: 'Mixed', score: 58, color: theme.amber },
        { icon: SunIcon, label: 'Lighting', value: 'Variable', score: 55, color: theme.amber },
      ],
      warnings: ['Times Square crowds at peak', 'Active construction on 8th Ave', '2 crowded subway exits', 'Loud delivery trucks on 42nd St'],
    },
  ];

  const active = routes.find(r => r.id === selected);

  return React.createElement('div', {
    style: { flex: 1, overflowY: 'auto', backgroundColor: theme.bg, padding: '16px 16px 8px' },
  },
    // Title
    React.createElement('div', { style: { marginBottom: 14 } },
      React.createElement('div', { style: { fontSize: 20, fontWeight: 800, color: theme.text, marginBottom: 2 } }, 'Choose Your Route'),
      React.createElement('div', { style: { fontSize: 13, color: theme.textSec } }, 'To Central Park North · 3 options found'),
    ),
    // Route tab selector
    React.createElement('div', { style: { display: 'flex', gap: 8, marginBottom: 16 } },
      routes.map(r =>
        React.createElement('div', {
          key: r.id,
          onClick: () => setSelected(r.id),
          style: {
            flex: 1, padding: '11px 6px', borderRadius: 16, textAlign: 'center', cursor: 'pointer',
            backgroundColor: selected === r.id ? r.color : theme.surface,
            border: `1.5px solid ${selected === r.id ? r.color : theme.border}`,
            transition: 'all 0.2s',
            boxShadow: selected === r.id ? `0 4px 12px ${r.color}40` : 'none',
          },
        },
          React.createElement('div', { style: { fontSize: 18, marginBottom: 4 } }, r.badge),
          React.createElement('div', { style: { fontSize: 11, fontWeight: 700, color: selected === r.id ? 'white' : theme.textTert, marginBottom: 2 } }, r.label),
          React.createElement('div', { style: { fontSize: 16, fontWeight: 800, color: selected === r.id ? 'white' : r.color } }, r.time),
        )
      ),
    ),
    // Route detail card
    React.createElement('div', {
      style: {
        backgroundColor: theme.surface, borderRadius: 20,
        border: `1.5px solid ${active.color}30`, marginBottom: 14,
        overflow: 'hidden', boxShadow: theme.shadowCard,
      },
    },
      // Header
      React.createElement('div', {
        style: {
          background: `linear-gradient(135deg, ${active.color}12, ${active.color}05)`,
          padding: '16px', borderBottom: `1px solid ${theme.border}`,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        },
      },
        React.createElement('div', { style: { flex: 1 } },
          React.createElement('div', { style: { fontSize: 16, fontWeight: 800, color: theme.text, marginBottom: 5 } },
            `${active.badge} ${active.label} Route`,
          ),
          React.createElement('div', { style: { display: 'flex', gap: 14 } },
            React.createElement('span', {
              style: { fontSize: 12, color: theme.textSec, display: 'flex', alignItems: 'center', gap: 4 },
            },
              React.createElement(ClockIcon, { size: 12, color: theme.textTert }),
              active.time,
            ),
            React.createElement('span', {
              style: { fontSize: 12, color: theme.textSec, display: 'flex', alignItems: 'center', gap: 4 },
            },
              React.createElement(NavigationIcon, { size: 12, color: theme.textTert }),
              active.distance,
            ),
            React.createElement('span', { style: { fontSize: 12, color: active.color, fontWeight: 700 } }, active.extra),
          ),
          React.createElement('div', { style: { fontSize: 12, color: theme.textTert, marginTop: 6, lineHeight: 1.4 } }, active.highlight),
        ),
        React.createElement(CalmRing, { score: active.calm, size: 62, color: active.color, theme }),
      ),
      // Comfort factors
      React.createElement('div', {
        onClick: () => setShowDetails(!showDetails),
        style: { padding: '12px 16px', borderBottom: showDetails ? `1px solid ${theme.border}` : 'none', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
      },
        React.createElement('span', { style: { fontSize: 11, fontWeight: 800, color: theme.textSec, letterSpacing: 0.5 } }, 'COMFORT BREAKDOWN'),
        React.createElement(ChevronDownIcon, { size: 15, color: theme.textTert, style: { transform: showDetails ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' } }),
      ),
      showDetails && React.createElement('div', { style: { padding: '12px 16px 14px' } },
        active.factors.map((f, i) =>
          React.createElement('div', { key: i, style: { marginBottom: i < active.factors.length - 1 ? 11 : 0 } },
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 } },
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 7 } },
                React.createElement(f.icon, { size: 13, color: theme.textTert }),
                React.createElement('span', { style: { fontSize: 12, color: theme.textSec, fontWeight: 500 } }, f.label),
              ),
              React.createElement('span', { style: { fontSize: 12, fontWeight: 700, color: f.color } }, f.value),
            ),
            React.createElement('div', { style: { height: 5, backgroundColor: theme.border, borderRadius: 3, overflow: 'hidden' } },
              React.createElement('div', {
                style: { height: '100%', width: `${f.score}%`, backgroundColor: f.color, borderRadius: 3, transition: 'width 0.4s ease' },
              }),
            ),
          )
        ),
      ),
    ),
    // Warning card for fast route
    active.warnings.length > 0 && React.createElement('div', {
      style: {
        backgroundColor: active.id === 'fast' ? theme.redLight : theme.amberLight,
        borderRadius: 16, padding: '13px 15px', marginBottom: 14,
        border: `1px solid ${active.id === 'fast' ? theme.redBorder : theme.amberBorder}`,
      },
    },
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 7, marginBottom: 8 } },
        React.createElement(InfoIcon, { size: 14, color: active.id === 'fast' ? theme.red : theme.amber }),
        React.createElement('span', { style: { fontSize: 12, fontWeight: 800, color: active.id === 'fast' ? theme.red : theme.amber } },
          'Stressful segments on this route',
        ),
      ),
      active.warnings.map((w, i) =>
        React.createElement('div', { key: i, style: { display: 'flex', alignItems: 'flex-start', gap: 7, marginBottom: i < active.warnings.length - 1 ? 5 : 0 } },
          React.createElement('div', { style: { width: 5, height: 5, borderRadius: 3, backgroundColor: active.id === 'fast' ? theme.red : theme.amber, marginTop: 5, flexShrink: 0 } }),
          React.createElement('span', { style: { fontSize: 12, color: theme.textSec, lineHeight: 1.4 } }, w),
        )
      ),
    ),
    // CTA
    React.createElement('div', {
      style: {
        background: `linear-gradient(135deg, ${active.color}, ${active.color}CC)`,
        borderRadius: 16, padding: '16px', textAlign: 'center', cursor: 'pointer',
        marginBottom: 8, boxShadow: `0 4px 16px ${active.color}40`,
      },
    },
      React.createElement('span', { style: { color: 'white', fontWeight: 700, fontSize: 16 } },
        `Start ${active.label} Route`,
      ),
    ),
  );
}

// ============================================================
// PROFILE SCREEN
// ============================================================
function ProfileScreen({ theme, themeMode, setThemeMode }) {
  const [noise, setNoise] = useState(82);
  const [crowd, setCrowd] = useState(70);
  const [light, setLight] = useState(60);
  const [smooth, setSmooth] = useState(78);
  const [decisions, setDecisions] = useState(55);
  const MoonIcon = window.lucide.Moon;
  const SunIcon = window.lucide.Sun;
  const BellIcon = window.lucide.Bell;
  const MapIcon = window.lucide.Map;
  const HeartIcon = window.lucide.Heart;
  const StarIcon = window.lucide.Star;
  const ChevronRightIcon = window.lucide.ChevronRight;
  const AwardIcon = window.lucide.Award;
  const HistoryIcon = window.lucide.History;
  const ShieldIcon = window.lucide.Shield;
  const LogOutIcon = window.lucide.LogOut;

  function Slider({ value, onChange, color }) {
    return React.createElement('div', {
      style: { position: 'relative', height: 22, display: 'flex', alignItems: 'center', cursor: 'pointer' },
      onClick: (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const pct = Math.round(Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100)));
        onChange(pct);
      },
    },
      React.createElement('div', { style: { width: '100%', height: 6, backgroundColor: theme.border, borderRadius: 3, position: 'relative' } },
        React.createElement('div', { style: { width: `${value}%`, height: '100%', backgroundColor: color || theme.primary, borderRadius: 3 } }),
      ),
      React.createElement('div', {
        style: {
          position: 'absolute', top: '50%', left: `${value}%`,
          transform: 'translate(-50%, -50%)',
          width: 20, height: 20, borderRadius: 10,
          backgroundColor: color || theme.primary,
          border: '3px solid white', boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
          pointerEvents: 'none',
        },
      }),
    );
  }

  const prefs = [
    { label: 'Avoid loud streets', desc: 'Traffic, construction, sirens', value: noise, onChange: setNoise },
    { label: 'Avoid crowds', desc: 'Busy sidewalks and intersections', value: crowd, onChange: setCrowd },
    { label: 'Prefer good lighting', desc: 'Well-lit paths and crossings', value: light, onChange: setLight },
    { label: 'Smooth pavement only', desc: 'Avoid uneven or cobbled paths', value: smooth, onChange: setSmooth },
    { label: 'Fewer decision points', desc: 'Simple, predictable turns', value: decisions, onChange: setDecisions },
  ];

  const trips = [
    { from: 'Home', to: 'Whole Foods', score: 89, date: 'Today, 9:15am', mood: '😌', moodText: 'Felt calm' },
    { from: 'Subway', to: 'Work', score: 72, date: 'Yesterday, 8:40am', mood: '😐', moodText: 'Somewhat busy' },
    { from: 'Yoga Studio', to: 'Home', score: 96, date: 'Mon Mar 18', mood: '😊', moodText: 'Very peaceful' },
  ];

  const menuItems = [
    { icon: BellIcon, label: 'Notifications', desc: 'Stress alerts & reminders', color: theme.amber },
    { icon: MapIcon, label: 'Map Preferences', desc: 'Display & route options', color: theme.blue },
    { icon: HeartIcon, label: 'Accessibility', desc: 'Mobility & sensory settings', color: theme.red },
    { icon: ShieldIcon, label: 'Privacy & Data', desc: 'Trip history & location', color: theme.primary },
  ];

  return React.createElement('div', { style: { flex: 1, overflowY: 'auto', backgroundColor: theme.bg } },
    // Profile header
    React.createElement('div', {
      style: {
        backgroundColor: theme.surface, padding: '18px 20px 20px',
        borderBottom: `1px solid ${theme.border}`,
      },
    },
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 } },
        React.createElement('div', {
          style: {
            width: 62, height: 62, borderRadius: 31,
            background: `linear-gradient(135deg, ${theme.primary}88, ${theme.primaryDark})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 26, border: `2.5px solid ${theme.primaryLight}`,
          },
        }, '🧘'),
        React.createElement('div', { style: { flex: 1 } },
          React.createElement('div', { style: { fontSize: 18, fontWeight: 800, color: theme.text, marginBottom: 1 } }, 'Alex Morgan'),
          React.createElement('div', { style: { fontSize: 12, color: theme.textSec, marginBottom: 5 } }, 'Neurodivergent profile · New York, NY'),
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 5 } },
            React.createElement('div', {
              style: {
                display: 'flex', alignItems: 'center', gap: 4, backgroundColor: theme.amberLight,
                borderRadius: 12, padding: '3px 9px', border: `1px solid ${theme.amberBorder}`,
              },
            },
              React.createElement(AwardIcon, { size: 12, color: theme.amber }),
              React.createElement('span', { style: { fontSize: 11, color: theme.amber, fontWeight: 700 } }, 'Calm Traveler — Level 7'),
            ),
          ),
        ),
        React.createElement('div', {
          onClick: () => setThemeMode(themeMode === 'light' ? 'dark' : 'light'),
          style: {
            width: 42, height: 42, borderRadius: 21,
            backgroundColor: theme.surfaceAlt, border: `1.5px solid ${theme.border}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          },
        },
          themeMode === 'light'
            ? React.createElement(MoonIcon, { size: 18, color: theme.textSec })
            : React.createElement(SunIcon, { size: 18, color: theme.amber }),
        ),
      ),
      // Stats row
      React.createElement('div', { style: { display: 'flex', gap: 1, borderRadius: 16, overflow: 'hidden', backgroundColor: theme.border } },
        [
          { val: '47', sub: 'Calm routes' },
          { val: '8.2km', sub: 'This week' },
          { val: '88', sub: 'Avg calm' },
        ].map((s, i) =>
          React.createElement('div', {
            key: i,
            style: { flex: 1, backgroundColor: theme.surfaceAlt, padding: '11px 8px', textAlign: 'center' },
          },
            React.createElement('div', { style: { fontSize: 17, fontWeight: 800, color: theme.primary } }, s.val),
            React.createElement('div', { style: { fontSize: 9, fontWeight: 700, color: theme.textTert, letterSpacing: 0.3 } }, s.sub.toUpperCase()),
          )
        ),
      ),
    ),
    React.createElement('div', { style: { padding: '14px 16px' } },
      // Calm preferences
      React.createElement('div', {
        style: {
          backgroundColor: theme.surface, borderRadius: 20, border: `1px solid ${theme.border}`,
          marginBottom: 14, overflow: 'hidden',
        },
      },
        React.createElement('div', { style: { padding: '13px 16px', borderBottom: `1px solid ${theme.border}` } },
          React.createElement('div', { style: { fontSize: 14, fontWeight: 800, color: theme.text } }, 'Calm Preferences'),
          React.createElement('div', { style: { fontSize: 11, color: theme.textTert, marginTop: 2 } }, 'Tap to adjust your sensory sensitivity'),
        ),
        prefs.map((p, i) =>
          React.createElement('div', {
            key: i,
            style: {
              padding: '13px 16px',
              borderBottom: i < prefs.length - 1 ? `1px solid ${theme.border}` : 'none',
            },
          },
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 9 } },
              React.createElement('div', {},
                React.createElement('div', { style: { fontSize: 13, fontWeight: 600, color: theme.text } }, p.label),
                React.createElement('div', { style: { fontSize: 11, color: theme.textTert, marginTop: 1 } }, p.desc),
              ),
              React.createElement('div', {
                style: {
                  backgroundColor: p.value >= 70 ? theme.primaryLight : p.value >= 45 ? theme.blueLight : theme.amberLight,
                  borderRadius: 8, padding: '2px 8px',
                  fontSize: 12, fontWeight: 800,
                  color: p.value >= 70 ? theme.primary : p.value >= 45 ? theme.blue : theme.amber,
                },
              }, `${p.value}%`),
            ),
            React.createElement(Slider, { value: p.value, onChange: p.onChange }),
          )
        ),
      ),
      // Recent trips
      React.createElement('div', {
        style: {
          backgroundColor: theme.surface, borderRadius: 20, border: `1px solid ${theme.border}`,
          marginBottom: 14, overflow: 'hidden',
        },
      },
        React.createElement('div', {
          style: {
            padding: '13px 16px', borderBottom: `1px solid ${theme.border}`,
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          },
        },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 7 } },
            React.createElement(HistoryIcon, { size: 15, color: theme.textSec }),
            React.createElement('span', { style: { fontSize: 14, fontWeight: 800, color: theme.text } }, 'Recent Trips'),
          ),
          React.createElement('span', { style: { fontSize: 12, color: theme.primary, fontWeight: 700 } }, 'View all'),
        ),
        trips.map((t, i) =>
          React.createElement('div', {
            key: i,
            style: {
              display: 'flex', alignItems: 'center', gap: 11, padding: '12px 16px',
              borderBottom: i < trips.length - 1 ? `1px solid ${theme.border}` : 'none',
            },
          },
            React.createElement('div', {
              style: {
                width: 40, height: 40, borderRadius: 12, flexShrink: 0,
                backgroundColor: t.score >= 85 ? theme.primaryLight : t.score >= 70 ? theme.blueLight : theme.redLight,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18,
              },
            }, t.mood),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', { style: { fontSize: 13, fontWeight: 700, color: theme.text } }, `${t.from} → ${t.to}`),
              React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginTop: 2 } },
                React.createElement('span', { style: { fontSize: 11, color: theme.textTert } }, t.date),
                React.createElement('span', { style: { fontSize: 11, color: theme.textSec } }, t.moodText),
              ),
            ),
            React.createElement('div', {
              style: {
                borderRadius: 10, padding: '4px 9px', textAlign: 'center',
                backgroundColor: t.score >= 85 ? theme.primaryLight : t.score >= 70 ? theme.blueLight : theme.redLight,
              },
            },
              React.createElement('div', { style: { fontSize: 13, fontWeight: 800, color: t.score >= 85 ? theme.primary : t.score >= 70 ? theme.blue : theme.red } }, t.score),
              React.createElement('div', { style: { fontSize: 9, color: theme.textTert, fontWeight: 700 } }, 'CALM'),
            ),
          )
        ),
      ),
      // Settings menu
      React.createElement('div', {
        style: {
          backgroundColor: theme.surface, borderRadius: 20, border: `1px solid ${theme.border}`,
          overflow: 'hidden', marginBottom: 14,
        },
      },
        menuItems.map((item, i) =>
          React.createElement('div', {
            key: i,
            style: {
              display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', cursor: 'pointer',
              borderBottom: i < menuItems.length - 1 ? `1px solid ${theme.border}` : 'none',
            },
          },
            React.createElement('div', {
              style: {
                width: 36, height: 36, borderRadius: 10,
                backgroundColor: `${item.color}18`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              },
            },
              React.createElement(item.icon, { size: 18, color: item.color }),
            ),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', { style: { fontSize: 13, fontWeight: 600, color: theme.text } }, item.label),
              React.createElement('div', { style: { fontSize: 11, color: theme.textTert, marginTop: 1 } }, item.desc),
            ),
            React.createElement(ChevronRightIcon, { size: 15, color: theme.textTert }),
          )
        ),
      ),
      // Sign out
      React.createElement('div', {
        style: {
          backgroundColor: theme.surface, borderRadius: 16, border: `1px solid ${theme.border}`,
          padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer',
        },
      },
        React.createElement(LogOutIcon, { size: 16, color: theme.textTert }),
        React.createElement('span', { style: { fontSize: 13, color: theme.textTert, fontWeight: 500 } }, 'Sign out'),
      ),
    ),
  );
}

// ============================================================
// MAIN APP
// ============================================================
function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [themeMode, setThemeMode] = useState('light');
  const theme = themes[themeMode];

  const tabs = [
    { id: 'home', label: 'Home', icon: window.lucide.Home },
    { id: 'routes', label: 'Routes', icon: window.lucide.Map },
    { id: 'navigate', label: 'Navigate', icon: window.lucide.Navigation2 },
    { id: 'profile', label: 'Profile', icon: window.lucide.User },
  ];

  const screens = {
    home: HomeScreen,
    routes: RoutesScreen,
    navigate: NavigateScreen,
    profile: ProfileScreen,
  };

  const ActiveScreen = screens[activeTab];

  return React.createElement('div', {
    style: {
      minHeight: '100vh', backgroundColor: '#e8eae8',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '20px', fontFamily: "'Plus Jakarta Sans', sans-serif",
    },
  },
    React.createElement('style', {},
      `@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
       *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
       ::-webkit-scrollbar { display: none; }
       * { -ms-overflow-style: none; scrollbar-width: none; }`,
    ),
    // Phone frame
    React.createElement('div', {
      style: {
        width: 375, height: 812,
        backgroundColor: theme.surface,
        borderRadius: 55, overflow: 'hidden',
        display: 'flex', flexDirection: 'column',
        boxShadow: '0 40px 100px rgba(0,0,0,0.32), 0 0 0 11px #1a1a1a, 0 0 0 13px #2a2a2a, 0 0 0 14px #1a1a1a',
        position: 'relative',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      },
    },
      // Status bar
      React.createElement(StatusBar, { theme, themeMode, setThemeMode }),
      // Active screen
      React.createElement('div', {
        style: { flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' },
      },
        React.createElement(ActiveScreen, { theme, themeMode, setThemeMode, setActiveTab }),
      ),
      // Bottom navigation
      React.createElement('div', {
        style: {
          display: 'flex', justifyContent: 'space-around', alignItems: 'center',
          padding: '10px 8px 22px', backgroundColor: theme.navBg,
          borderTop: `1px solid ${theme.border}`, flexShrink: 0,
        },
      },
        tabs.map(tab =>
          React.createElement('div', {
            key: tab.id,
            onClick: () => setActiveTab(tab.id),
            style: {
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
              padding: '7px 18px', borderRadius: 16, cursor: 'pointer',
              backgroundColor: activeTab === tab.id ? theme.primaryDim : 'transparent',
              transition: 'all 0.15s',
            },
          },
            React.createElement(tab.icon, {
              size: 22,
              color: activeTab === tab.id ? theme.primary : theme.textTert,
            }),
            React.createElement('span', {
              style: {
                fontSize: 10, fontWeight: 700, fontFamily: 'inherit',
                color: activeTab === tab.id ? theme.primary : theme.textTert,
                letterSpacing: 0.2,
              },
            }, tab.label),
          )
        ),
      ),
    ),
  );
}
