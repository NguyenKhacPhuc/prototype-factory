const { useState, useEffect, useRef } = React;

const themes = {
  dark: {
    bg: '#080C18',
    surface: '#111827',
    card: '#0F1C2E',
    surfaceElevated: '#1A2440',
    border: '#1E3050',
    primary: '#38BDF8',
    primaryGlow: 'rgba(56,189,248,0.15)',
    secondary: '#818CF8',
    accent: '#34D399',
    text: '#F1F5FF',
    textSecondary: '#8899BB',
    textMuted: '#2D4060',
    success: '#34D399',
    warning: '#FBBF24',
    danger: '#F87171',
    rain: '#60A5FA',
    wind: '#A78BFA',
    heat: '#FB923C',
    ice: '#BAE6FD',
    navBg: '#080C18',
    mapBg: '#060E1E',
    mapStreet: '#1A2D4A',
  },
  light: {
    bg: '#EDF2FF',
    surface: '#FFFFFF',
    card: '#FFFFFF',
    surfaceElevated: '#F0F6FF',
    border: '#C7D8F0',
    primary: '#0284C7',
    primaryGlow: 'rgba(2,132,199,0.10)',
    secondary: '#6366F1',
    accent: '#059669',
    text: '#0F172A',
    textSecondary: '#475569',
    textMuted: '#94A3B8',
    success: '#059669',
    warning: '#D97706',
    danger: '#DC2626',
    rain: '#2563EB',
    wind: '#7C3AED',
    heat: '#EA580C',
    ice: '#0369A1',
    navBg: '#FFFFFF',
    mapBg: '#D8E8FF',
    mapStreet: '#B0CAE8',
  },
};

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isDark, setIsDark] = useState(true);
  const t = isDark ? themes.dark : themes.light;

  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&display=swap';
    document.head.appendChild(link);

    const style = document.createElement('style');
    style.textContent = `
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body {
        background: linear-gradient(135deg, #050912 0%, #0D1830 50%, #060A18 100%);
        display: flex; align-items: center; justify-content: center;
        min-height: 100vh; font-family: 'Plus Jakarta Sans', sans-serif;
      }
      ::-webkit-scrollbar { display: none; }
      .tab-press { transform: scale(0.92); transition: transform 0.12s; }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(link);
      document.head.removeChild(style);
    };
  }, []);

  // ─── STATUS BAR ───────────────────────────────────────────────────────────
  const StatusBar = () =>
    React.createElement('div', {
      style: {
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '16px 24px 6px', fontSize: 12, fontWeight: 700,
        color: t.text, flexShrink: 0, position: 'relative', zIndex: 10,
      },
    },
      React.createElement('span', null, '9:41'),
      React.createElement('div', {
        style: {
          position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
          width: 120, height: 34, background: '#000', borderRadius: '0 0 20px 20px',
        },
      }),
      React.createElement('div', { style: { display: 'flex', gap: 5, alignItems: 'center' } },
        React.createElement(window.lucide.Wifi, { size: 13, color: t.text }),
        React.createElement(window.lucide.Battery, { size: 14, color: t.text }),
      ),
    );

  // ─── HOME SCREEN ─────────────────────────────────────────────────────────
  const HomeScreen = () => {
    const riskData = [
      { time: '6AM', risk: 'low',    temp: 62, icon: '🌤' },
      { time: '8AM', risk: 'low',    temp: 65, icon: '⛅' },
      { time: '10AM', risk: 'medium', temp: 69, icon: '🌧' },
      { time: '12PM', risk: 'medium', temp: 72, icon: '⛈' },
      { time: '2PM',  risk: 'high',   temp: 74, icon: '⛈' },
      { time: '4PM',  risk: 'medium', temp: 71, icon: '🌧' },
      { time: '6PM',  risk: 'low',    temp: 68, icon: '🌤' },
      { time: '8PM',  risk: 'low',    temp: 64, icon: '🌙' },
    ];

    const riskColor = (r) => ({ low: t.success, medium: t.warning, high: t.danger }[r]);

    const routes = [
      { name: 'Morning Commute', time: 'Leave by 8:15 AM', risk: 'low',    detail: 'Clear skies · Light wind', icon: '🚗', km: '12.4km' },
      { name: 'Dog Walk',        time: '2:00 – 2:45 PM',  risk: 'medium', detail: 'Rain arriving at 2:30 PM',  icon: '🐕', km: '2.1km'  },
      { name: 'School Pickup',   time: '3:30 PM',          risk: 'low',    detail: 'Sunny · UV moderate',       icon: '🏫', km: '5.8km'  },
    ];

    const comfortFactors = [
      { label: 'UV Index',   value: '5',    level: 'Moderate',    color: t.warning,        icon: '☀️' },
      { label: 'Pollen',     value: 'High', level: 'Tree pollen', color: t.danger,         icon: '🌿' },
      { label: 'AQI',        value: '42',   level: 'Good',        color: t.success,        icon: '💨' },
      { label: 'Wind Chill', value: '68°',  level: 'Comfortable', color: t.primary,        icon: '🌬' },
    ];

    return React.createElement('div', {
      style: { height: '100%', overflowY: 'auto', background: t.bg },
    },
      // Header
      React.createElement('div', {
        style: { padding: '10px 20px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
      },
        React.createElement('div', null,
          React.createElement('p', { style: { fontSize: 11, color: t.textSecondary, fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase' } }, 'Mon, March 23'),
          React.createElement('h2', { style: { fontSize: 22, fontWeight: 800, color: t.text, marginTop: 2 } }, 'Good Morning, Alex'),
        ),
        React.createElement('div', {
          style: {
            width: 42, height: 42, borderRadius: 21,
            background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          },
        },
          React.createElement(window.lucide.Bell, { size: 18, color: '#fff' }),
        ),
      ),

      // Hero weather card
      React.createElement('div', {
        style: {
          margin: '16px 20px',
          borderRadius: 24,
          background: 'linear-gradient(135deg, #0A2A5E 0%, #1A3A7A 50%, #0E1A4A 100%)',
          padding: '22px',
          position: 'relative',
          overflow: 'hidden',
        },
      },
        React.createElement('div', {
          style: { position: 'absolute', top: -40, right: -40, width: 180, height: 180, borderRadius: '50%', background: 'rgba(56,189,248,0.07)' },
        }),
        React.createElement('div', {
          style: { position: 'absolute', bottom: -25, left: -25, width: 110, height: 110, borderRadius: '50%', background: 'rgba(129,140,248,0.07)' },
        }),
        React.createElement('div', {
          style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative', zIndex: 1 },
        },
          React.createElement('div', null,
            React.createElement('div', { style: { fontSize: 66, fontWeight: 800, color: '#fff', lineHeight: 1 } }, '72°'),
            React.createElement('div', { style: { fontSize: 16, color: '#A8D4F4', fontWeight: 600, marginTop: 4 } }, 'Partly Cloudy'),
            React.createElement('div', { style: { fontSize: 12, color: '#6A9EC8', marginTop: 3 } }, 'San Francisco, CA'),
          ),
          React.createElement('div', { style: { fontSize: 58, lineHeight: 1, marginTop: 4 } }, '⛅'),
        ),
        React.createElement('div', {
          style: {
            display: 'flex', marginTop: 20, position: 'relative', zIndex: 1,
            background: 'rgba(0,0,0,0.22)', borderRadius: 14, overflow: 'hidden',
          },
        },
          [
            { label: 'Feels Like', value: '68°', icon: '🌡' },
            { label: 'Wind',       value: '14mph', icon: '💨' },
            { label: 'Humidity',   value: '62%',  icon: '💧' },
          ].map((s, i) =>
            React.createElement('div', {
              key: i,
              style: {
                flex: 1, textAlign: 'center', padding: '10px 0',
                borderRight: i < 2 ? '1px solid rgba(255,255,255,0.09)' : 'none',
              },
            },
              React.createElement('div', { style: { fontSize: 15 } }, s.icon),
              React.createElement('div', { style: { fontSize: 14, fontWeight: 700, color: '#fff', marginTop: 2 } }, s.value),
              React.createElement('div', { style: { fontSize: 10, color: '#7AA4C8', fontWeight: 500 } }, s.label),
            )
          ),
        ),
        React.createElement('div', {
          style: {
            marginTop: 14, padding: '9px 13px',
            background: 'rgba(56,189,248,0.14)',
            borderRadius: 12, border: '1px solid rgba(56,189,248,0.28)',
            display: 'flex', alignItems: 'center', gap: 8, position: 'relative', zIndex: 1,
          },
        },
          React.createElement(window.lucide.Zap, { size: 13, color: '#38BDF8' }),
          React.createElement('span', { style: { fontSize: 12, color: '#B0D4F4', fontWeight: 500 } },
            'Best outdoor window: 7–9 AM. Storm risk arrives at 1 PM.',
          ),
        ),
      ),

      // Risk Timeline
      React.createElement('div', { style: { padding: '0 20px' } },
        React.createElement('h3', {
          style: { fontSize: 11, fontWeight: 700, color: t.textSecondary, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 },
        }, 'Risk Timeline'),
        React.createElement('div', { style: { display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 } },
          riskData.map((d, i) =>
            React.createElement('div', {
              key: i,
              style: {
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5,
                background: t.card, border: `1px solid ${t.border}`, borderRadius: 14,
                padding: '10px 10px', minWidth: 54, flexShrink: 0,
              },
            },
              React.createElement('span', { style: { fontSize: 15 } }, d.icon),
              React.createElement('div', {
                style: {
                  width: 7, height: 7, borderRadius: 4,
                  background: riskColor(d.risk),
                  boxShadow: `0 0 6px ${riskColor(d.risk)}`,
                },
              }),
              React.createElement('span', { style: { fontSize: 9, color: t.textSecondary, fontWeight: 600 } }, d.time),
              React.createElement('span', { style: { fontSize: 11, color: t.text, fontWeight: 700 } }, `${d.temp}°`),
            )
          ),
        ),
      ),

      // Your Routes
      React.createElement('div', { style: { padding: '16px 20px 0' } },
        React.createElement('div', {
          style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
        },
          React.createElement('h3', { style: { fontSize: 11, fontWeight: 700, color: t.textSecondary, letterSpacing: '0.08em', textTransform: 'uppercase' } }, 'Your Routes Today'),
          React.createElement('span', { style: { fontSize: 12, color: t.primary, fontWeight: 700 } }, 'See all'),
        ),
        React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 10 } },
          routes.map((route, i) =>
            React.createElement('div', {
              key: i,
              style: {
                background: t.card, border: `1px solid ${t.border}`,
                borderRadius: 16, padding: '13px 15px',
                display: 'flex', alignItems: 'center', gap: 12,
              },
            },
              React.createElement('div', { style: { fontSize: 26, lineHeight: 1 } }, route.icon),
              React.createElement('div', { style: { flex: 1 } },
                React.createElement('div', { style: { fontSize: 13, fontWeight: 700, color: t.text } }, route.name),
                React.createElement('div', { style: { fontSize: 11, color: t.textSecondary, marginTop: 2 } }, route.detail),
                React.createElement('div', { style: { fontSize: 11, color: t.primary, marginTop: 3, fontWeight: 600 } }, route.time),
              ),
              React.createElement('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 5 } },
                React.createElement('div', {
                  style: {
                    padding: '3px 9px', borderRadius: 20,
                    background: `${riskColor(route.risk)}18`,
                    border: `1px solid ${riskColor(route.risk)}35`,
                    fontSize: 10, fontWeight: 700,
                    color: riskColor(route.risk), textTransform: 'capitalize',
                  },
                }, route.risk),
                React.createElement('span', { style: { fontSize: 10, color: t.textMuted, fontWeight: 600 } }, route.km),
              ),
            )
          ),
        ),
      ),

      // Comfort Factors
      React.createElement('div', { style: { padding: '16px 20px 20px' } },
        React.createElement('h3', {
          style: { fontSize: 11, fontWeight: 700, color: t.textSecondary, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 },
        }, 'Comfort Factors'),
        React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 } },
          comfortFactors.map((f, i) =>
            React.createElement('div', {
              key: i,
              style: {
                background: t.card,
                border: `1px solid ${f.color}22`,
                borderRadius: 14, padding: '12px 14px',
              },
            },
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 } },
                React.createElement('span', { style: { fontSize: 13 } }, f.icon),
                React.createElement('span', { style: { fontSize: 10, color: t.textSecondary, fontWeight: 600 } }, f.label),
              ),
              React.createElement('div', { style: { fontSize: 18, fontWeight: 800, color: f.color } }, f.value),
              React.createElement('div', { style: { fontSize: 10, color: t.textMuted, marginTop: 2 } }, f.level),
            )
          ),
        ),
      ),
    );
  };

  // ─── ROUTES SCREEN ───────────────────────────────────────────────────────
  const RoutesScreen = () => {
    const [selectedRoute, setSelectedRoute] = useState(0);

    const routes = [
      {
        name: 'Home → Office',
        distance: '8.2 mi', time: '24 min', risk: 'medium', riskScore: 42,
        segments: [
          { type: 'clear', label: 'Clear start',    pct: 35 },
          { type: 'wind',  label: 'Crosswind zone', pct: 30 },
          { type: 'rain',  label: 'Light rain',     pct: 35 },
        ],
        tip: 'Crosswind hits at mile 3.5. Take Valencia St instead of Embarcadero.',
      },
      {
        name: 'Home → Park (Bike)',
        distance: '3.4 mi', time: '18 min', risk: 'high', riskScore: 71,
        segments: [
          { type: 'clear', label: 'Clear',       pct: 20 },
          { type: 'wind',  label: 'Strong wind', pct: 50 },
          { type: 'heat',  label: 'Heat pocket', pct: 30 },
        ],
        tip: 'Avoid waterfront corridor 4–7 PM. Strong gusts up to 23 mph.',
      },
      {
        name: 'School Pickup (Walk)',
        distance: '1.1 mi', time: '22 min', risk: 'low', riskScore: 12,
        segments: [
          { type: 'clear', label: 'Clear path',  pct: 80 },
          { type: 'wind',  label: 'Light breeze', pct: 20 },
        ],
        tip: 'Optimal conditions. Sunny side of playground faces west at 3 PM.',
      },
    ];

    const segColor = (type) => ({
      clear: t.success, wind: t.wind, rain: t.rain, heat: t.heat,
    }[type] || t.primary);

    const riskColor = (r) => ({ low: t.success, medium: t.warning, high: t.danger }[r]);

    return React.createElement('div', {
      style: { height: '100%', display: 'flex', flexDirection: 'column', background: t.bg },
    },
      // Header & search
      React.createElement('div', { style: { padding: '10px 20px 12px', flexShrink: 0 } },
        React.createElement('h2', { style: { fontSize: 22, fontWeight: 800, color: t.text, marginBottom: 12 } }, 'Route Weather'),
        React.createElement('div', {
          style: {
            display: 'flex', alignItems: 'center', gap: 10,
            background: t.card, border: `1.5px solid ${t.primary}50`,
            borderRadius: 14, padding: '10px 14px',
          },
        },
          React.createElement(window.lucide.Navigation, { size: 15, color: t.primary }),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', { style: { fontSize: 10, color: t.textSecondary, fontWeight: 500 } }, 'From'),
            React.createElement('div', { style: { fontSize: 12, fontWeight: 700, color: t.text } }, '📍 Home, Oak Street'),
          ),
          React.createElement('div', { style: { width: 1, height: 28, background: t.border } }),
          React.createElement('div', { style: { flex: 1, paddingLeft: 10 } },
            React.createElement('div', { style: { fontSize: 10, color: t.textSecondary, fontWeight: 500 } }, 'To'),
            React.createElement('div', { style: { fontSize: 12, fontWeight: 700, color: t.text } }, '🏢 Office, Market St'),
          ),
        ),
      ),

      // SVG Map
      React.createElement('div', { style: { padding: '0 20px', flexShrink: 0 } },
        React.createElement('svg', {
          viewBox: '0 0 335 190',
          style: {
            width: '100%', borderRadius: 18,
            border: `1px solid ${t.border}`, display: 'block',
          },
        },
          // Background
          React.createElement('rect', { x: 0, y: 0, width: 335, height: 190, fill: t.mapBg }),
          // City blocks
          React.createElement('g', null,
            [0, 35, 70, 105, 140, 175].map((y, i) =>
              React.createElement('rect', { key: `b${i}`, x: 0, y, width: 335, height: 28, fill: isDark ? '#0D1A30' : '#C8DBED', opacity: 0.7 })
            ),
          ),
          React.createElement('g', null,
            [40, 100, 160, 220, 280].map((x, i) =>
              React.createElement('rect', { key: `bv${i}`, x, y: 0, width: 22, height: 190, fill: isDark ? '#0D1A30' : '#C8DBED', opacity: 0.7 })
            ),
          ),
          // Streets
          React.createElement('g', null,
            [28, 63, 98, 133, 168].map((y, i) =>
              React.createElement('line', { key: `sh${i}`, x1: 0, y1: y, x2: 335, y2: y, stroke: t.mapStreet, strokeWidth: 4 })
            ),
          ),
          React.createElement('g', null,
            [51, 111, 171, 231, 291].map((x, i) =>
              React.createElement('line', { key: `sv${i}`, x1: x, y1: 0, x2: x, y2: 190, stroke: t.mapStreet, strokeWidth: 4 })
            ),
          ),
          // Weather zones
          React.createElement('rect', { x: 0, y: 0, width: 130, height: 110, fill: 'rgba(96,165,250,0.11)' }),
          React.createElement('rect', { x: 140, y: 55, width: 120, height: 135, fill: 'rgba(167,139,250,0.13)' }),
          React.createElement('rect', { x: 200, y: 0, width: 135, height: 80, fill: 'rgba(251,146,60,0.10)' }),
          // Zone labels
          React.createElement('text', { x: 6, y: 13, fill: '#60A5FA', fontSize: 8, fontWeight: '700', fontFamily: 'Plus Jakarta Sans' }, '🌧 RAIN'),
          React.createElement('text', { x: 145, y: 70, fill: '#A78BFA', fontSize: 8, fontWeight: '700', fontFamily: 'Plus Jakarta Sans' }, '💨 WIND'),
          React.createElement('text', { x: 204, y: 13, fill: '#FB923C', fontSize: 8, fontWeight: '700', fontFamily: 'Plus Jakarta Sans' }, '🌡 HEAT'),
          // Route: clear (green)
          React.createElement('polyline', {
            points: '20,168 51,168 51,133 51,98',
            fill: 'none', stroke: '#34D399', strokeWidth: 3.5,
            strokeLinecap: 'round', strokeLinejoin: 'round',
          }),
          // Route: wind (amber dashed)
          React.createElement('polyline', {
            points: '51,98 111,98 171,98',
            fill: 'none', stroke: '#FBBF24', strokeWidth: 3.5,
            strokeLinecap: 'round', strokeLinejoin: 'round', strokeDasharray: '7 4',
          }),
          // Route: rain (blue)
          React.createElement('polyline', {
            points: '171,98 171,63 231,63 291,63 312,63',
            fill: 'none', stroke: '#60A5FA', strokeWidth: 3.5,
            strokeLinecap: 'round', strokeLinejoin: 'round',
          }),
          // Start marker
          React.createElement('circle', { cx: 20, cy: 168, r: 9, fill: '#34D399', opacity: 0.25 }),
          React.createElement('circle', { cx: 20, cy: 168, r: 6, fill: '#34D399' }),
          React.createElement('circle', { cx: 20, cy: 168, r: 2.5, fill: '#fff' }),
          // Risk marker
          React.createElement('circle', { cx: 111, cy: 98, r: 7, fill: '#FBBF24' }),
          React.createElement('text', { x: 111, y: 101, textAnchor: 'middle', fill: '#000', fontSize: 8, fontWeight: 'bold', fontFamily: 'Plus Jakarta Sans' }, '!'),
          // End marker
          React.createElement('circle', { cx: 312, cy: 63, r: 9, fill: '#F87171', opacity: 0.25 }),
          React.createElement('circle', { cx: 312, cy: 63, r: 6, fill: '#F87171' }),
          React.createElement('circle', { cx: 312, cy: 63, r: 2.5, fill: '#fff' }),
        ),
      ),

      // Route list
      React.createElement('div', {
        style: { flex: 1, overflowY: 'auto', padding: '12px 20px', display: 'flex', flexDirection: 'column', gap: 10 },
      },
        React.createElement('h3', { style: { fontSize: 11, fontWeight: 700, color: t.textSecondary, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 2 } }, 'Route Options'),
        routes.map((route, i) =>
          React.createElement('div', {
            key: i,
            onClick: () => setSelectedRoute(i),
            style: {
              background: selectedRoute === i ? t.primaryGlow : t.card,
              border: `1.5px solid ${selectedRoute === i ? t.primary : t.border}`,
              borderRadius: 16, padding: '13px 14px', cursor: 'pointer',
              transition: 'all 0.2s',
            },
          },
            React.createElement('div', {
              style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
            },
              React.createElement('div', null,
                React.createElement('div', { style: { fontSize: 13, fontWeight: 700, color: t.text } }, route.name),
                React.createElement('div', { style: { fontSize: 11, color: t.textSecondary, marginTop: 2 } }, `${route.distance} · ${route.time}`),
              ),
              React.createElement('div', {
                style: {
                  display: 'flex', alignItems: 'center', gap: 5,
                  background: `${riskColor(route.risk)}18`,
                  padding: '4px 10px', borderRadius: 20,
                },
              },
                React.createElement('div', {
                  style: { width: 6, height: 6, borderRadius: 3, background: riskColor(route.risk) },
                }),
                React.createElement('span', {
                  style: { fontSize: 10, fontWeight: 700, color: riskColor(route.risk), textTransform: 'capitalize' },
                }, route.risk + ' risk'),
              ),
            ),
            // Segment bar
            React.createElement('div', {
              style: { display: 'flex', borderRadius: 6, overflow: 'hidden', height: 6, gap: 1 },
            },
              route.segments.map((seg, j) =>
                React.createElement('div', {
                  key: j,
                  style: {
                    width: `${seg.pct}%`, background: segColor(seg.type),
                    borderRadius: j === 0 ? '6px 0 0 6px' : j === route.segments.length - 1 ? '0 6px 6px 0' : 0,
                  },
                })
              ),
            ),
            React.createElement('div', { style: { display: 'flex', gap: 10, marginTop: 8, flexWrap: 'wrap' } },
              route.segments.map((seg, j) =>
                React.createElement('div', { key: j, style: { display: 'flex', alignItems: 'center', gap: 4 } },
                  React.createElement('div', { style: { width: 8, height: 8, borderRadius: 2, background: segColor(seg.type) } }),
                  React.createElement('span', { style: { fontSize: 10, color: t.textSecondary } }, seg.label),
                )
              ),
            ),
            selectedRoute === i && React.createElement('div', {
              style: {
                marginTop: 10, padding: '8px 10px',
                background: `${t.primary}12`, borderRadius: 10,
                border: `1px solid ${t.primary}22`,
                display: 'flex', alignItems: 'flex-start', gap: 7,
              },
            },
              React.createElement(window.lucide.Zap, { size: 12, color: t.primary, style: { flexShrink: 0, marginTop: 1 } }),
              React.createElement('span', { style: { fontSize: 11, color: t.textSecondary, lineHeight: 1.5 } }, route.tip),
            ),
          )
        ),
      ),
    );
  };

  // ─── ACTIVITIES SCREEN ───────────────────────────────────────────────────
  const ActivitiesScreen = () => {
    const [expanded, setExpanded] = useState(0);

    const activities = [
      {
        name: 'Morning Jog',
        location: 'Golden Gate Park',
        icon: '🏃', planned: '7:00 AM',
        bestWindow: '6:45 – 8:00 AM', risk: 'low',
        reason: 'Clear skies, 62°F, light breeze at 7 mph. Perfect running conditions before city heats up.',
        backup: 'If rain moves in early: Treadmill at Fitness SF, 0.3 mi from park entrance.',
        tags: ['Cool', 'Low UV', 'Light Wind'],
      },
      {
        name: 'Outdoor Lunch',
        location: 'Ferry Building Plaza',
        icon: '🥗', planned: '12:30 PM',
        bestWindow: '12:00 – 12:45 PM', risk: 'medium',
        reason: 'Rain front arrives ~1:15 PM. Eat by 12:45 to avoid getting caught in the storm.',
        backup: 'Nearby covered option: Inside Ferry Building — same food vendors, rain-free.',
        tags: ['Early Slot', 'Watch Rain', 'Leave by 12:45'],
      },
      {
        name: 'Evening Bike Ride',
        location: 'Embarcadero → Crissy Field',
        icon: '🚴', planned: '5:30 PM',
        bestWindow: 'Postpone → 7:15 PM', risk: 'high',
        reason: 'Strong crosswind 18–23 mph along waterfront 4:00–7:00 PM. Dangerous for cyclists on return.',
        backup: 'Alternative: Inland route via Valencia St avoids wind corridor entirely.',
        tags: ['Reschedule', 'Crosswind', 'Avoid 4–7 PM'],
      },
      {
        name: 'Weekend Hike',
        location: 'Marin Headlands',
        icon: '🥾', planned: 'Sat 10:00 AM',
        bestWindow: 'Sat 9:00 AM – 1:00 PM', risk: 'low',
        reason: 'Saturday morning is optimal. Clear, 68°F, UV moderate only after noon.',
        backup: 'Bring layers — hilltops run 7–8°F cooler. Apply SPF before noon descent.',
        tags: ['Optimal', 'Bring Layers', 'SPF Noon+'],
      },
    ];

    const riskColor = (r) => ({ low: t.success, medium: t.warning, high: t.danger }[r]);

    const days = ['Today', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    return React.createElement('div', { style: { height: '100%', overflowY: 'auto', background: t.bg } },
      React.createElement('div', { style: { padding: '10px 20px 0' } },
        React.createElement('h2', { style: { fontSize: 22, fontWeight: 800, color: t.text } }, 'Activity Advisor'),
        React.createElement('p', { style: { fontSize: 12, color: t.textSecondary, marginTop: 3 } }, 'Optimal windows for your planned outings'),
      ),

      // Day selector
      React.createElement('div', {
        style: { display: 'flex', gap: 7, padding: '12px 20px', overflowX: 'auto' },
      },
        days.map((day, i) =>
          React.createElement('div', {
            key: i,
            style: {
              padding: '6px 13px', borderRadius: 20, flexShrink: 0,
              background: i === 0 ? t.primary : t.card,
              border: `1px solid ${i === 0 ? t.primary : t.border}`,
              fontSize: 12, fontWeight: 700,
              color: i === 0 ? '#fff' : t.textSecondary, cursor: 'pointer',
            },
          }, day)
        ),
      ),

      // Activity cards
      React.createElement('div', { style: { padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 11, paddingBottom: 20 } },
        activities.map((act, i) =>
          React.createElement('div', {
            key: i,
            onClick: () => setExpanded(expanded === i ? null : i),
            style: {
              background: t.card,
              border: `1.5px solid ${expanded === i ? riskColor(act.risk) : riskColor(act.risk) + '30'}`,
              borderRadius: 18, overflow: 'hidden', cursor: 'pointer',
              transition: 'border-color 0.2s',
            },
          },
            React.createElement('div', { style: { padding: '13px 15px', display: 'flex', alignItems: 'flex-start', gap: 12 } },
              React.createElement('div', {
                style: {
                  width: 46, height: 46, borderRadius: 14,
                  background: `${riskColor(act.risk)}14`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 24, flexShrink: 0,
                },
              }, act.icon),
              React.createElement('div', { style: { flex: 1 } },
                React.createElement('div', {
                  style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' },
                },
                  React.createElement('div', null,
                    React.createElement('div', { style: { fontSize: 14, fontWeight: 700, color: t.text } }, act.name),
                    React.createElement('div', { style: { fontSize: 11, color: t.textSecondary, marginTop: 2 } }, `📍 ${act.location}`),
                  ),
                  React.createElement('div', {
                    style: {
                      padding: '2px 8px', borderRadius: 10,
                      background: `${riskColor(act.risk)}18`,
                      fontSize: 9, fontWeight: 700,
                      color: riskColor(act.risk), textTransform: 'uppercase', letterSpacing: '0.06em',
                    },
                  }, act.risk),
                ),
                React.createElement('div', {
                  style: {
                    marginTop: 9, padding: '6px 10px',
                    background: `${riskColor(act.risk)}10`,
                    borderRadius: 10, display: 'flex', alignItems: 'center', gap: 6,
                  },
                },
                  React.createElement(window.lucide.Clock, { size: 12, color: riskColor(act.risk) }),
                  React.createElement('span', { style: { fontSize: 12, fontWeight: 700, color: riskColor(act.risk) } }, act.bestWindow),
                ),
              ),
            ),
            expanded === i && React.createElement('div', {
              style: {
                borderTop: `1px solid ${t.border}`, padding: '12px 15px',
                background: isDark ? 'rgba(0,0,0,0.15)' : 'rgba(0,0,0,0.02)',
              },
            },
              React.createElement('p', { style: { fontSize: 12, color: t.textSecondary, marginBottom: 10, lineHeight: 1.6 } }, act.reason),
              React.createElement('div', { style: { display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 11 } },
                act.tags.map((tag, j) =>
                  React.createElement('span', {
                    key: j,
                    style: {
                      fontSize: 10, fontWeight: 600, padding: '3px 9px', borderRadius: 8,
                      background: t.surfaceElevated, color: t.textSecondary, border: `1px solid ${t.border}`,
                    },
                  }, tag)
                ),
              ),
              React.createElement('div', {
                style: {
                  padding: '10px 12px',
                  background: isDark ? 'rgba(56,189,248,0.07)' : 'rgba(2,132,199,0.05)',
                  borderRadius: 12, border: `1px solid ${t.primary}22`,
                  display: 'flex', gap: 8, alignItems: 'flex-start',
                },
              },
                React.createElement(window.lucide.Shield, { size: 13, color: t.primary, style: { flexShrink: 0, marginTop: 1 } }),
                React.createElement('span', { style: { fontSize: 11, color: t.textSecondary, lineHeight: 1.5 } }, act.backup),
              ),
            ),
          )
        ),
      ),
    );
  };

  // ─── ALERTS SCREEN ───────────────────────────────────────────────────────
  const AlertsScreen = () => {
    const alerts = [
      {
        severity: 'danger',
        title: 'Thunderstorm Warning',
        subtitle: 'Arrives 1:15 PM · Duration 2–3 hrs',
        detail: 'Sudden storm moving northeast. Lightning risk, heavy rain. Avoid open areas.',
        icon: '⛈',
        affected: ['Dog Walk Route', 'Park Areas', 'Waterfront'],
      },
      {
        severity: 'wind',
        title: 'Strong Crosswind Alert',
        subtitle: '4:00–7:00 PM · Embarcadero',
        detail: '18–23 mph gusts across waterfront corridor. Dangerous for cyclists on return leg.',
        icon: '💨',
        affected: ['Bike Route', 'Crissy Field Path'],
      },
      {
        severity: 'heat',
        title: 'Heat Pocket — Downtown Core',
        subtitle: 'All day · Market St / Civic Center',
        detail: '4–6°F warmer than surrounding areas due to concrete density and low airflow.',
        icon: '🌡',
        affected: ['Noon Walks', 'Outdoor Lunch Spots'],
      },
    ];

    const microclimates = [
      { name: 'Downtown',   temp: 82, wind: '8 mph',  icon: '🏙', condition: 'Sunny',       color: t.warning   },
      { name: 'Waterfront', temp: 72, wind: '21 mph', icon: '🌊', condition: 'Windy',       color: t.wind      },
      { name: 'Noe Valley', temp: 77, wind: '5 mph',  icon: '🏘', condition: 'Part. Cloudy', color: t.primary   },
      { name: 'Twin Peaks', temp: 66, wind: '14 mph', icon: '⛰', condition: 'Foggy',        color: t.textMuted },
    ];

    const sevColor = (s) => ({ danger: t.danger, wind: t.wind, heat: t.heat }[s] || t.warning);

    return React.createElement('div', { style: { height: '100%', overflowY: 'auto', background: t.bg } },
      React.createElement('div', { style: { padding: '10px 20px 0' } },
        React.createElement('h2', { style: { fontSize: 22, fontWeight: 800, color: t.text } }, 'Alerts & Microclimates'),
        React.createElement('p', { style: { fontSize: 12, color: t.textSecondary, marginTop: 3 } }, 'Hyperlocal conditions around you'),
      ),

      // Active alerts
      React.createElement('div', { style: { padding: '14px 20px 0' } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 } },
          React.createElement('h3', { style: { fontSize: 11, fontWeight: 700, color: t.textSecondary, letterSpacing: '0.08em', textTransform: 'uppercase' } }, 'Active Alerts'),
          React.createElement('div', {
            style: {
              padding: '2px 9px', background: `${t.danger}20`,
              borderRadius: 20, fontSize: 10, fontWeight: 700, color: t.danger,
            },
          }, '3 active'),
        ),
        React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 10 } },
          alerts.map((alert, i) =>
            React.createElement('div', {
              key: i,
              style: {
                background: t.card,
                borderRadius: 16,
                borderLeft: `4px solid ${sevColor(alert.severity)}`,
                border: `1px solid ${sevColor(alert.severity)}25`,
                borderLeftWidth: 4,
                padding: '13px 14px',
              },
            },
              React.createElement('div', { style: { display: 'flex', gap: 12, alignItems: 'flex-start' } },
                React.createElement('div', {
                  style: {
                    width: 42, height: 42, borderRadius: 12,
                    background: `${sevColor(alert.severity)}12`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 20, flexShrink: 0,
                  },
                }, alert.icon),
                React.createElement('div', { style: { flex: 1 } },
                  React.createElement('div', { style: { fontSize: 13, fontWeight: 700, color: t.text } }, alert.title),
                  React.createElement('div', { style: { fontSize: 11, color: sevColor(alert.severity), fontWeight: 600, marginTop: 2 } }, alert.subtitle),
                  React.createElement('div', { style: { fontSize: 11, color: t.textSecondary, marginTop: 6, lineHeight: 1.5 } }, alert.detail),
                  React.createElement('div', { style: { display: 'flex', gap: 6, marginTop: 8, flexWrap: 'wrap' } },
                    alert.affected.map((a, j) =>
                      React.createElement('span', {
                        key: j,
                        style: {
                          fontSize: 9, fontWeight: 600, padding: '2px 8px', borderRadius: 8,
                          background: `${sevColor(alert.severity)}12`,
                          color: sevColor(alert.severity),
                          border: `1px solid ${sevColor(alert.severity)}22`,
                        },
                      }, a)
                    ),
                  ),
                ),
              ),
            )
          ),
        ),
      ),

      // Microclimate comparison
      React.createElement('div', { style: { padding: '16px 20px 0' } },
        React.createElement('h3', { style: { fontSize: 11, fontWeight: 700, color: t.textSecondary, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 } }, 'Neighborhood Microclimates'),
        React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 } },
          microclimates.map((mc, i) =>
            React.createElement('div', {
              key: i,
              style: { background: t.card, border: `1px solid ${t.border}`, borderRadius: 16, padding: '14px' },
            },
              React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' } },
                React.createElement('span', { style: { fontSize: 24 } }, mc.icon),
                React.createElement('div', {
                  style: {
                    width: 8, height: 8, borderRadius: 4,
                    background: mc.color, boxShadow: `0 0 8px ${mc.color}`, marginTop: 4,
                  },
                }),
              ),
              React.createElement('div', { style: { fontSize: 24, fontWeight: 800, color: t.text, marginTop: 8 } }, `${mc.temp}°`),
              React.createElement('div', { style: { fontSize: 11, fontWeight: 600, color: mc.color } }, mc.condition),
              React.createElement('div', { style: { fontSize: 10, color: t.textSecondary, marginTop: 2 } }, mc.name),
              React.createElement('div', { style: { fontSize: 10, color: t.textMuted, marginTop: 2 } }, `Wind: ${mc.wind}`),
            )
          ),
        ),
      ),

      // AI Backup suggestion
      React.createElement('div', { style: { padding: '16px 20px 20px' } },
        React.createElement('div', {
          style: {
            background: isDark
              ? 'linear-gradient(135deg, #0A2040, #0F1A35)'
              : 'linear-gradient(135deg, #E0F0FF, #EDF6FF)',
            border: `1px solid ${t.primary}28`, borderRadius: 18, padding: '16px',
          },
        },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 } },
            React.createElement(window.lucide.Lightbulb, { size: 15, color: t.primary }),
            React.createElement('span', { style: { fontSize: 12, fontWeight: 700, color: t.primary } }, 'CloudPilot Backup Plan'),
          ),
          React.createElement('p', { style: { fontSize: 12, color: t.textSecondary, lineHeight: 1.65 } },
            'Storm arrives 1:15 PM. Move your afternoon dog walk to 12:00–12:45 PM at the sheltered Dolores Park path — avoids both the waterfront wind and the incoming rain.',
          ),
          React.createElement('div', {
            style: {
              marginTop: 12, padding: '8px 16px',
              background: t.primary, borderRadius: 10,
              textAlign: 'center', cursor: 'pointer',
            },
          },
            React.createElement('span', { style: { fontSize: 12, fontWeight: 700, color: '#fff' } }, 'Apply to My Schedule'),
          ),
        ),
      ),
    );
  };

  // ─── SETTINGS SCREEN ─────────────────────────────────────────────────────
  const SettingsScreen = () => {
    const [notifs, setNotifs] = useState(true);
    const [microAlerts, setMicroAlerts] = useState(true);
    const [backupSuggest, setBackupSuggest] = useState(true);
    const [units, setUnits] = useState('imperial');

    const Toggle = ({ value, onChange }) =>
      React.createElement('div', {
        onClick: () => onChange(!value),
        style: {
          width: 44, height: 25, borderRadius: 13, flexShrink: 0,
          background: value ? t.primary : (isDark ? '#2D4060' : '#CBD5E1'),
          position: 'relative', cursor: 'pointer', transition: 'background 0.3s',
        },
      },
        React.createElement('div', {
          style: {
            position: 'absolute', top: 2.5, left: value ? 21 : 2.5,
            width: 20, height: 20, borderRadius: 10, background: '#fff',
            transition: 'left 0.3s', boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
          },
        }),
      );

    const Row = ({ iconEl, label, sub, children }) =>
      React.createElement('div', {
        style: {
          display: 'flex', alignItems: 'center', gap: 12,
          padding: '13px 0', borderBottom: `1px solid ${t.border}`,
        },
      },
        React.createElement('div', {
          style: {
            width: 34, height: 34, borderRadius: 10,
            background: t.surfaceElevated,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          },
        }, iconEl),
        React.createElement('div', { style: { flex: 1 } },
          React.createElement('div', { style: { fontSize: 13, fontWeight: 600, color: t.text } }, label),
          sub && React.createElement('div', { style: { fontSize: 10, color: t.textSecondary, marginTop: 2 } }, sub),
        ),
        children,
      );

    return React.createElement('div', { style: { height: '100%', overflowY: 'auto', background: t.bg } },
      // Profile
      React.createElement('div', {
        style: {
          padding: '10px 20px 18px',
          background: isDark
            ? 'linear-gradient(180deg, #0F1C2E, #080C18)'
            : 'linear-gradient(180deg, #DBEAFE, #EDF2FF)',
        },
      },
        React.createElement('h2', { style: { fontSize: 22, fontWeight: 800, color: t.text, marginBottom: 14 } }, 'Settings'),
        React.createElement('div', {
          style: {
            display: 'flex', alignItems: 'center', gap: 14,
            padding: '14px 15px', background: t.card,
            borderRadius: 18, border: `1px solid ${t.border}`,
          },
        },
          React.createElement('div', {
            style: {
              width: 50, height: 50, borderRadius: 25,
              background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 22,
            },
          }, '👤'),
          React.createElement('div', null,
            React.createElement('div', { style: { fontSize: 15, fontWeight: 700, color: t.text } }, 'Alex Rivera'),
            React.createElement('div', { style: { fontSize: 11, color: t.textSecondary } }, 'alex@email.com'),
            React.createElement('div', { style: { fontSize: 10, color: t.primary, fontWeight: 700, marginTop: 2 } }, '⚡ CloudPilot Pro'),
          ),
        ),
      ),

      // Appearance
      React.createElement('div', {
        style: { margin: '0 20px 14px', padding: '14px 15px', background: t.card, borderRadius: 18, border: `1px solid ${t.border}` },
      },
        React.createElement('div', { style: { fontSize: 10, fontWeight: 700, color: t.textSecondary, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 } }, 'Appearance'),
        React.createElement('div', { style: { display: 'flex', gap: 10 } },
          ['dark', 'light'].map((mode) =>
            React.createElement('div', {
              key: mode,
              onClick: () => setIsDark(mode === 'dark'),
              style: {
                flex: 1, padding: '11px 0', borderRadius: 13,
                background: ((mode === 'dark') === isDark) ? t.primary : t.surfaceElevated,
                border: `1.5px solid ${((mode === 'dark') === isDark) ? t.primary : t.border}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
                cursor: 'pointer', transition: 'all 0.3s',
              },
            },
              React.createElement(mode === 'dark' ? window.lucide.Moon : window.lucide.Sun, {
                size: 15,
                color: ((mode === 'dark') === isDark) ? '#fff' : t.textSecondary,
              }),
              React.createElement('span', {
                style: {
                  fontSize: 12, fontWeight: 700, textTransform: 'capitalize',
                  color: ((mode === 'dark') === isDark) ? '#fff' : t.textSecondary,
                },
              }, mode),
            )
          ),
        ),
      ),

      // Preferences
      React.createElement('div', {
        style: { margin: '0 20px 14px', padding: '0 15px', background: t.card, borderRadius: 18, border: `1px solid ${t.border}` },
      },
        React.createElement('div', { style: { fontSize: 10, fontWeight: 700, color: t.textSecondary, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '14px 0 6px' } }, 'Preferences'),
        React.createElement(Row, {
          iconEl: React.createElement(window.lucide.Bell, { size: 15, color: t.primary }),
          label: 'Route Alerts',
          sub: 'Notify before risky conditions',
        }, React.createElement(Toggle, { value: notifs, onChange: setNotifs })),
        React.createElement(Row, {
          iconEl: React.createElement(window.lucide.MapPin, { size: 15, color: t.secondary }),
          label: 'Microclimate Alerts',
          sub: 'Hyperlocal neighborhood warnings',
        }, React.createElement(Toggle, { value: microAlerts, onChange: setMicroAlerts })),
        React.createElement(Row, {
          iconEl: React.createElement(window.lucide.Shield, { size: 15, color: t.accent }),
          label: 'Backup Suggestions',
          sub: 'Auto-generate alternative plans',
        }, React.createElement(Toggle, { value: backupSuggest, onChange: setBackupSuggest })),
        React.createElement('div', {
          style: {
            display: 'flex', alignItems: 'center', gap: 12, padding: '13px 0',
          },
        },
          React.createElement('div', {
            style: {
              width: 34, height: 34, borderRadius: 10,
              background: t.surfaceElevated,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            },
          }, React.createElement(window.lucide.Thermometer, { size: 15, color: t.heat })),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', { style: { fontSize: 13, fontWeight: 600, color: t.text } }, 'Units'),
            React.createElement('div', { style: { fontSize: 10, color: t.textSecondary, marginTop: 2 } },
              units === 'imperial' ? 'Imperial · °F, mph, mi' : 'Metric · °C, kph, km',
            ),
          ),
          React.createElement('div', {
            onClick: () => setUnits(units === 'imperial' ? 'metric' : 'imperial'),
            style: {
              padding: '5px 12px', background: t.surfaceElevated,
              borderRadius: 8, fontSize: 12, fontWeight: 700,
              color: t.textSecondary, border: `1px solid ${t.border}`, cursor: 'pointer',
            },
          }, units === 'imperial' ? '°F' : '°C'),
        ),
      ),

      // Saved Locations
      React.createElement('div', {
        style: { margin: '0 20px 14px', padding: '0 15px', background: t.card, borderRadius: 18, border: `1px solid ${t.border}` },
      },
        React.createElement('div', { style: { fontSize: 10, fontWeight: 700, color: t.textSecondary, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '14px 0 6px' } }, 'Saved Locations'),
        [
          { name: 'Home',             address: '123 Oak Street',         icon: '🏠' },
          { name: 'Office',           address: 'Market Street, SoMa',    icon: '🏢' },
          { name: 'Golden Gate Park', address: 'Main Meadow Entrance',   icon: '🌳' },
        ].map((loc, i) =>
          React.createElement('div', {
            key: i,
            style: {
              display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0',
              borderBottom: i < 2 ? `1px solid ${t.border}` : 'none',
            },
          },
            React.createElement('span', { style: { fontSize: 20 } }, loc.icon),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', { style: { fontSize: 13, fontWeight: 600, color: t.text } }, loc.name),
              React.createElement('div', { style: { fontSize: 10, color: t.textSecondary } }, loc.address),
            ),
            React.createElement(window.lucide.ChevronRight, { size: 15, color: t.textMuted }),
          )
        ),
        React.createElement('div', { style: { height: 13 } }),
      ),

      // Footer
      React.createElement('div', { style: { padding: '0 20px 24px', textAlign: 'center' } },
        React.createElement('div', { style: { fontSize: 12, fontWeight: 700, color: t.primary } }, '☁ CloudPilot v2.1.0'),
        React.createElement('div', { style: { fontSize: 10, color: t.textMuted, marginTop: 3 } }, 'Weather intelligence for daily life'),
      ),
    );
  };

  // ─── TABS & NAV ──────────────────────────────────────────────────────────
  const tabs = [
    { id: 'home',       label: 'Home',       icon: window.lucide.Home     },
    { id: 'routes',     label: 'Routes',     icon: window.lucide.Map      },
    { id: 'activities', label: 'Activities', icon: window.lucide.Calendar },
    { id: 'alerts',     label: 'Alerts',     icon: window.lucide.Bell     },
    { id: 'settings',   label: 'Settings',   icon: window.lucide.Settings },
  ];

  const screens = {
    home:       HomeScreen,
    routes:     RoutesScreen,
    activities: ActivitiesScreen,
    alerts:     AlertsScreen,
    settings:   SettingsScreen,
  };

  return React.createElement('div', {
    style: {
      minHeight: '100vh',
      background: isDark
        ? 'linear-gradient(135deg, #050912 0%, #0D1830 50%, #060A18 100%)'
        : 'linear-gradient(135deg, #C0D4F0 0%, #D5E5FF 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20,
    },
  },
    React.createElement('div', {
      style: {
        width: 375, height: 812,
        borderRadius: 50,
        background: t.bg,
        boxShadow: isDark
          ? '0 40px 80px rgba(0,0,0,0.85), 0 0 0 1px rgba(255,255,255,0.06), inset 0 1px 0 rgba(255,255,255,0.08)'
          : '0 40px 80px rgba(0,0,70,0.18), 0 0 0 1px rgba(0,0,0,0.08)',
        overflow: 'hidden',
        display: 'flex', flexDirection: 'column',
        position: 'relative',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      },
    },
      // Dynamic Island
      React.createElement('div', {
        style: {
          position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)',
          width: 120, height: 34, background: '#000', borderRadius: 22, zIndex: 100,
        },
      }),

      React.createElement(StatusBar),

      // Screen content
      React.createElement('div', { style: { flex: 1, overflow: 'hidden', position: 'relative' } },
        React.createElement(screens[activeTab]),
      ),

      // Bottom nav
      React.createElement('div', {
        style: {
          display: 'flex', background: t.navBg,
          borderTop: `1px solid ${t.border}`,
          paddingBottom: 18, paddingTop: 2, flexShrink: 0,
        },
      },
        tabs.map(tab =>
          React.createElement('div', {
            key: tab.id,
            onClick: () => setActiveTab(tab.id),
            style: {
              flex: 1, display: 'flex', flexDirection: 'column',
              alignItems: 'center', gap: 3, padding: '8px 0',
              cursor: 'pointer', transition: 'opacity 0.15s',
              position: 'relative',
            },
          },
            activeTab === tab.id && React.createElement('div', {
              style: {
                position: 'absolute', top: 0,
                width: 22, height: 2.5, borderRadius: 2, background: t.primary,
              },
            }),
            React.createElement(tab.icon, {
              size: 21,
              color: activeTab === tab.id ? t.primary : t.textMuted,
              strokeWidth: activeTab === tab.id ? 2.5 : 1.5,
            }),
            React.createElement('span', {
              style: {
                fontSize: 9, fontWeight: activeTab === tab.id ? 700 : 500,
                color: activeTab === tab.id ? t.primary : t.textMuted,
              },
            }, tab.label),
          )
        ),
      ),
    ),
  );
}
