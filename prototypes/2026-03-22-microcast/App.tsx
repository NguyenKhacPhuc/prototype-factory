
function App() {
  const { useState, useEffect, useRef } = React;

  // Load Google Font
  const fontStyle = React.createElement('style', null, `
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    ::-webkit-scrollbar { display: none; }
  `);

  const themes = {
    light: {
      bg: '#E8F4F8',
      surface: '#FFFFFF',
      surfaceAlt: '#F0F8FF',
      card: '#FFFFFF',
      cardAlt: '#EBF5FB',
      text: '#0D1B2A',
      textSec: '#4A6572',
      textMuted: '#8AA8B8',
      primary: '#0096C7',
      primaryLight: '#48CAE4',
      primaryDark: '#0077B6',
      accent: '#00B4D8',
      accentGlow: 'rgba(0,180,216,0.18)',
      success: '#2DC653',
      warning: '#F4A261',
      danger: '#E63946',
      border: '#C8E0EA',
      navBg: '#FFFFFF',
      statusBar: '#0077B6',
      gradient1: 'linear-gradient(135deg, #0096C7 0%, #00B4D8 50%, #48CAE4 100%)',
      gradient2: 'linear-gradient(135deg, #023E8A 0%, #0096C7 100%)',
      gradient3: 'linear-gradient(180deg, #ADE8F4 0%, #CAF0F8 100%)',
      mapBg: '#D0EAF5',
      shadow: '0 4px 20px rgba(0,150,199,0.12)',
      shadowStrong: '0 8px 32px rgba(0,150,199,0.22)',
    },
    dark: {
      bg: '#060D14',
      surface: '#0D1B2A',
      surfaceAlt: '#111F2E',
      card: '#122333',
      cardAlt: '#152840',
      text: '#E8F4F8',
      textSec: '#90B8CC',
      textMuted: '#4A6E84',
      primary: '#00B4D8',
      primaryLight: '#48CAE4',
      primaryDark: '#0096C7',
      accent: '#48CAE4',
      accentGlow: 'rgba(72,202,228,0.15)',
      success: '#2DC653',
      warning: '#F4A261',
      danger: '#E63946',
      border: '#1A3348',
      navBg: '#0D1B2A',
      statusBar: '#060D14',
      gradient1: 'linear-gradient(135deg, #023E8A 0%, #0096C7 50%, #00B4D8 100%)',
      gradient2: 'linear-gradient(135deg, #010B14 0%, #023E8A 100%)',
      gradient3: 'linear-gradient(180deg, #0A2235 0%, #0D2F47 100%)',
      mapBg: '#0A1A28',
      shadow: '0 4px 20px rgba(0,0,0,0.4)',
      shadowStrong: '0 8px 32px rgba(0,0,0,0.6)',
    }
  };

  const [isDark, setIsDark] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [pressedTab, setPressedTab] = useState(null);

  const t = isDark ? themes.dark : themes.light;
  const font = "'Plus Jakarta Sans', sans-serif";

  const tabs = [
    { id: 'home', label: 'Home', icon: window.lucide.Home },
    { id: 'route', label: 'Route', icon: window.lucide.Navigation },
    { id: 'alerts', label: 'Alerts', icon: window.lucide.Bell },
    { id: 'explore', label: 'Explore', icon: window.lucide.Map },
    { id: 'settings', label: 'Settings', icon: window.lucide.Settings },
  ];

  // ── STATUS BAR ──────────────────────────────────────────────────
  function StatusBar() {
    return React.createElement('div', {
      style: {
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '14px 20px 6px', fontFamily: font, fontSize: 12, fontWeight: 600,
        color: t.text, userSelect: 'none',
      }
    },
      React.createElement('span', null, '9:41'),
      React.createElement('div', { style: { width: 120, height: 34, background: '#000', borderRadius: 20, position: 'absolute', left: '50%', top: 0, transform: 'translateX(-50%)' } }),
      React.createElement('div', { style: { display: 'flex', gap: 5, alignItems: 'center' } },
        React.createElement(window.lucide.Wifi, { size: 14, color: t.text }),
        React.createElement(window.lucide.Battery, { size: 16, color: t.text }),
      )
    );
  }

  // ── HOME SCREEN ─────────────────────────────────────────────────
  function HomeScreen() {
    const [expanded, setExpanded] = useState(null);

    const hourly = [
      { time: 'Now', icon: window.lucide.CloudRain, temp: 58, rain: 90, label: 'Heavy Rain' },
      { time: '11am', icon: window.lucide.CloudDrizzle, temp: 59, rain: 60, label: 'Drizzle' },
      { time: '12pm', icon: window.lucide.Cloud, temp: 61, rain: 20, label: 'Cloudy' },
      { time: '1pm', icon: window.lucide.CloudSun, temp: 64, rain: 5, label: 'Partly Sunny' },
      { time: '2pm', icon: window.lucide.Sun, temp: 67, rain: 0, label: 'Sunny' },
      { time: '3pm', icon: window.lucide.Sun, temp: 68, rain: 0, label: 'Sunny' },
    ];

    const microzones = [
      { name: 'Your Block', sub: 'Columbus Ave & 72nd', icon: window.lucide.MapPin, color: t.danger, status: 'Soaked', detail: 'Heavy puddles forming at curb cutouts. 0.3in fallen.' },
      { name: 'Riverside Park', sub: '0.4 mi north', icon: window.lucide.Trees, color: t.success, status: 'Dry', detail: 'Protected by tree canopy. Path clear through 1:15pm.' },
      { name: '72nd St Station', sub: 'Broadway entrance', icon: window.lucide.Train, color: t.warning, status: 'Windy', detail: 'Tunnel gusts 22mph. Use the 73rd St entrance instead.' },
      { name: 'Café Margot', sub: 'Columbus & 69th', icon: window.lucide.Coffee, color: t.success, status: 'Covered', detail: 'West patio has overhead cover. Dry seating available.' },
    ];

    return React.createElement('div', {
      style: { flex: 1, overflowY: 'scroll', fontFamily: font }
    },
      // Hero weather card
      React.createElement('div', {
        style: {
          margin: '8px 16px 0', borderRadius: 24, padding: '20px 20px 16px',
          background: t.gradient1, boxShadow: t.shadowStrong, position: 'relative', overflow: 'hidden',
        }
      },
        React.createElement('div', {
          style: { position: 'absolute', top: -30, right: -30, width: 140, height: 140, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }
        }),
        React.createElement('div', {
          style: { position: 'absolute', bottom: -20, left: -10, width: 100, height: 100, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }
        }),
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' } },
          React.createElement('div', null,
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 5, marginBottom: 4 } },
              React.createElement(window.lucide.MapPin, { size: 14, color: 'rgba(255,255,255,0.9)' }),
              React.createElement('span', { style: { color: 'rgba(255,255,255,0.9)', fontSize: 13, fontWeight: 600 } }, 'Upper West Side, NYC'),
            ),
            React.createElement('div', { style: { fontSize: 64, fontWeight: 800, color: '#fff', lineHeight: 1, letterSpacing: -2 } }, '58°'),
            React.createElement('div', { style: { color: 'rgba(255,255,255,0.85)', fontSize: 15, fontWeight: 500, marginTop: 4 } }, 'Heavy Rain · Feels 53°'),
          ),
          React.createElement('div', { style: { textAlign: 'right' } },
            React.createElement(window.lucide.CloudRain, { size: 52, color: 'rgba(255,255,255,0.7)', strokeWidth: 1.5 }),
            React.createElement('div', { style: { color: 'rgba(255,255,255,0.8)', fontSize: 12, marginTop: 4 } }, 'H:65° L:52°'),
          )
        ),
        React.createElement('div', {
          style: {
            marginTop: 14, padding: '10px 14px', borderRadius: 14,
            background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)',
            display: 'flex', alignItems: 'center', gap: 8,
          }
        },
          React.createElement(window.lucide.AlertCircle, { size: 15, color: '#fff' }),
          React.createElement('span', { style: { color: '#fff', fontSize: 12, fontWeight: 500 } },
            'Your bus stop soaks in ~12 min · Leave now or shelter at Café Margot'
          ),
        )
      ),

      // Hourly scroll
      React.createElement('div', { style: { margin: '14px 0 0', paddingLeft: 16 } },
        React.createElement('div', { style: { fontSize: 13, fontWeight: 700, color: t.textSec, marginBottom: 10, letterSpacing: 0.5, textTransform: 'uppercase' } }, 'Next 90 Minutes'),
        React.createElement('div', { style: { display: 'flex', gap: 10, overflowX: 'scroll', paddingRight: 16, paddingBottom: 4 } },
          ...hourly.map((h, i) =>
            React.createElement('div', {
              key: i,
              style: {
                minWidth: 70, padding: '12px 10px', borderRadius: 18, textAlign: 'center',
                background: i === 0 ? t.primary : t.card,
                border: `1px solid ${i === 0 ? t.primary : t.border}`,
                boxShadow: i === 0 ? t.shadow : 'none',
                flexShrink: 0,
              }
            },
              React.createElement('div', { style: { fontSize: 11, color: i === 0 ? 'rgba(255,255,255,0.85)' : t.textMuted, fontWeight: 600, marginBottom: 6 } }, h.time),
              React.createElement(h.icon, { size: 22, color: i === 0 ? '#fff' : t.primary, strokeWidth: 1.8 }),
              React.createElement('div', { style: { fontSize: 15, fontWeight: 700, color: i === 0 ? '#fff' : t.text, marginTop: 6 } }, `${h.temp}°`),
              React.createElement('div', { style: { fontSize: 10, color: i === 0 ? 'rgba(255,255,255,0.75)' : t.textMuted, marginTop: 2, fontWeight: 600 } }, `${h.rain}%`),
            )
          )
        )
      ),

      // Microzone cards
      React.createElement('div', { style: { padding: '14px 16px' } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 } },
          React.createElement('span', { style: { fontSize: 13, fontWeight: 700, color: t.textSec, letterSpacing: 0.5, textTransform: 'uppercase' } }, 'Nearby Microzones'),
          React.createElement('span', { style: { fontSize: 12, color: t.primary, fontWeight: 600 } }, 'See all'),
        ),
        React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 10 } },
          ...microzones.map((z, i) =>
            React.createElement('div', {
              key: i,
              onClick: () => setExpanded(expanded === i ? null : i),
              style: {
                background: t.card, borderRadius: 18, padding: '14px 16px',
                border: `1px solid ${t.border}`, cursor: 'pointer',
                boxShadow: t.shadow,
                transition: 'all 0.2s ease',
              }
            },
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12 } },
                React.createElement('div', {
                  style: { width: 42, height: 42, borderRadius: 14, background: `${z.color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }
                }, React.createElement(z.icon, { size: 20, color: z.color })),
                React.createElement('div', { style: { flex: 1 } },
                  React.createElement('div', { style: { fontSize: 14, fontWeight: 700, color: t.text } }, z.name),
                  React.createElement('div', { style: { fontSize: 12, color: t.textMuted, marginTop: 2 } }, z.sub),
                ),
                React.createElement('div', {
                  style: { padding: '4px 10px', borderRadius: 20, background: `${z.color}22`, fontSize: 12, fontWeight: 700, color: z.color }
                }, z.status),
              ),
              expanded === i && React.createElement('div', {
                style: { marginTop: 10, paddingTop: 10, borderTop: `1px solid ${t.border}`, fontSize: 13, color: t.textSec, lineHeight: 1.5 }
              }, z.detail)
            )
          )
        )
      ),

      // Wind & Pressure stats
      React.createElement('div', { style: { padding: '0 16px 24px' } },
        React.createElement('div', { style: { fontSize: 13, fontWeight: 700, color: t.textSec, letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 10 } }, 'Conditions'),
        React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 } },
          ...[
            { label: 'Wind', value: '14 mph', sub: 'NE gusts 22', icon: window.lucide.Wind },
            { label: 'Humidity', value: '87%', sub: 'Dew point 55°', icon: window.lucide.Droplets },
            { label: 'Visibility', value: '0.8 mi', sub: 'Fog reducing', icon: window.lucide.Eye },
            { label: 'UV Index', value: '1 Low', sub: 'No protection', icon: window.lucide.Sun },
          ].map((s, i) =>
            React.createElement('div', {
              key: i,
              style: { background: t.card, borderRadius: 18, padding: '14px', border: `1px solid ${t.border}` }
            },
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 } },
                React.createElement(s.icon, { size: 16, color: t.primary }),
                React.createElement('span', { style: { fontSize: 12, color: t.textMuted, fontWeight: 600 } }, s.label),
              ),
              React.createElement('div', { style: { fontSize: 18, fontWeight: 800, color: t.text } }, s.value),
              React.createElement('div', { style: { fontSize: 11, color: t.textMuted, marginTop: 2 } }, s.sub),
            )
          )
        )
      )
    );
  }

  // ── ROUTE SCREEN ────────────────────────────────────────────────
  function RouteScreen() {
    const [selectedRoute, setSelectedRoute] = useState(0);
    const routes = [
      { label: 'Walk to Office', time: '28 min', dist: '1.4 mi', risk: 'high', score: 32 },
      { label: 'Bike via Riverside', time: '19 min', dist: '2.1 mi', risk: 'medium', score: 66 },
      { label: 'Subway + Walk', time: '22 min', dist: '1.1 mi', risk: 'low', score: 88 },
    ];
    const riskColor = { high: t.danger, medium: t.warning, low: t.success };
    const segments = [
      { name: 'Columbus Ave (72nd–70th)', icon: window.lucide.CloudRain, severity: 'high', note: 'Pooling water at crosswalk', time: '0–4 min' },
      { name: 'Central Park West', icon: window.lucide.Wind, severity: 'medium', note: 'Gusts 18 mph, tree exposure', time: '4–10 min' },
      { name: 'W 65th underpass', icon: window.lucide.CheckCircle, severity: 'low', note: 'Covered walkway, dry', time: '10–14 min' },
      { name: 'Lincoln Center plaza', icon: window.lucide.CloudDrizzle, severity: 'medium', note: 'Light drizzle, 40% chance', time: '14–22 min' },
      { name: 'Amsterdam Ave', icon: window.lucide.CheckCircle, severity: 'low', note: 'Clearing up, comfortable', time: '22–28 min' },
    ];
    const sevColor = { high: t.danger, medium: t.warning, low: t.success };
    const sevBg = { high: `${t.danger}18`, medium: `${t.warning}18`, low: `${t.success}18` };

    return React.createElement('div', { style: { flex: 1, overflowY: 'scroll', fontFamily: font } },
      React.createElement('div', { style: { padding: '12px 16px 0' } },
        React.createElement('div', { style: { fontSize: 20, fontWeight: 800, color: t.text, marginBottom: 4 } }, 'Route Forecast'),
        React.createElement('div', { style: { fontSize: 13, color: t.textSec } }, 'Weather along your exact path'),
      ),

      // Route selector
      React.createElement('div', { style: { padding: '12px 16px', display: 'flex', gap: 8 } },
        ...routes.map((r, i) =>
          React.createElement('div', {
            key: i, onClick: () => setSelectedRoute(i),
            style: {
              flex: 1, padding: '10px 8px', borderRadius: 16, textAlign: 'center', cursor: 'pointer',
              background: selectedRoute === i ? t.primary : t.card,
              border: `1.5px solid ${selectedRoute === i ? t.primary : t.border}`,
              transition: 'all 0.2s',
            }
          },
            React.createElement('div', { style: { fontSize: 10, fontWeight: 700, color: selectedRoute === i ? '#fff' : t.textMuted, marginBottom: 3 } }, r.label),
            React.createElement('div', { style: { fontSize: 16, fontWeight: 800, color: selectedRoute === i ? '#fff' : t.text } }, r.time),
            React.createElement('div', {
              style: {
                marginTop: 4, display: 'inline-block', fontSize: 10, fontWeight: 700,
                padding: '2px 7px', borderRadius: 8,
                background: selectedRoute === i ? 'rgba(255,255,255,0.2)' : sevBg[r.risk],
                color: selectedRoute === i ? '#fff' : riskColor[r.risk],
              }
            }, r.risk.toUpperCase()),
          )
        )
      ),

      // Comfort score
      React.createElement('div', {
        style: {
          margin: '0 16px 14px', padding: '16px', borderRadius: 20,
          background: t.gradient1, boxShadow: t.shadow,
        }
      },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
          React.createElement('div', null,
            React.createElement('div', { style: { fontSize: 12, color: 'rgba(255,255,255,0.8)', fontWeight: 600, marginBottom: 4 } }, 'COMFORT SCORE'),
            React.createElement('div', { style: { fontSize: 42, fontWeight: 800, color: '#fff', lineHeight: 1 } }, routes[selectedRoute].score),
            React.createElement('div', { style: { fontSize: 12, color: 'rgba(255,255,255,0.7)', marginTop: 4 } },
              routes[selectedRoute].score > 70 ? 'Good conditions — go for it' :
              routes[selectedRoute].score > 45 ? 'Manageable with prep' : 'Challenging — consider alternatives'
            ),
          ),
          React.createElement('div', { style: { width: 80, height: 80, position: 'relative' } },
            React.createElement('svg', { width: 80, height: 80, viewBox: '0 0 80 80' },
              React.createElement('circle', { cx: 40, cy: 40, r: 34, fill: 'none', stroke: 'rgba(255,255,255,0.2)', strokeWidth: 8 }),
              React.createElement('circle', {
                cx: 40, cy: 40, r: 34, fill: 'none',
                stroke: '#fff', strokeWidth: 8,
                strokeDasharray: `${(routes[selectedRoute].score / 100) * 213.6} 213.6`,
                strokeLinecap: 'round',
                transform: 'rotate(-90 40 40)',
              }),
            ),
            React.createElement('div', {
              style: { position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#fff' }
            }, `${routes[selectedRoute].score}%`)
          )
        )
      ),

      // Route segments
      React.createElement('div', { style: { padding: '0 16px', marginBottom: 8 } },
        React.createElement('div', { style: { fontSize: 13, fontWeight: 700, color: t.textSec, letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 10 } }, 'Segment Breakdown'),
        React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 1 } },
          ...segments.map((s, i) =>
            React.createElement('div', {
              key: i,
              style: {
                display: 'flex', alignItems: 'flex-start', gap: 12, padding: '12px 14px',
                background: t.card, borderRadius: i === 0 ? '18px 18px 4px 4px' : i === segments.length-1 ? '4px 4px 18px 18px' : '4px',
                border: `1px solid ${t.border}`,
              }
            },
              React.createElement('div', {
                style: { width: 36, height: 36, borderRadius: 12, background: sevBg[s.severity], display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }
              }, React.createElement(s.icon, { size: 18, color: sevColor[s.severity] })),
              React.createElement('div', { style: { flex: 1 } },
                React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between' } },
                  React.createElement('span', { style: { fontSize: 13, fontWeight: 700, color: t.text } }, s.name),
                  React.createElement('span', { style: { fontSize: 11, color: t.textMuted, fontWeight: 600 } }, s.time),
                ),
                React.createElement('div', { style: { fontSize: 12, color: t.textSec, marginTop: 2 } }, s.note),
              )
            )
          )
        )
      ),

      // Tip
      React.createElement('div', {
        style: { margin: '12px 16px 24px', padding: '14px 16px', borderRadius: 18, background: t.accentGlow, border: `1px solid ${t.primary}44` }
      },
        React.createElement('div', { style: { display: 'flex', gap: 10, alignItems: 'flex-start' } },
          React.createElement(window.lucide.Lightbulb, { size: 18, color: t.primary }),
          React.createElement('div', null,
            React.createElement('div', { style: { fontSize: 13, fontWeight: 700, color: t.primary, marginBottom: 2 } }, 'Microcast Suggests'),
            React.createElement('div', { style: { fontSize: 12, color: t.textSec, lineHeight: 1.5 } },
              'Take the subway. Use the 72nd St covered exit to stay dry. Rain clears near your office by 1:05pm.'
            ),
          )
        )
      )
    );
  }

  // ── ALERTS SCREEN ───────────────────────────────────────────────
  function AlertsScreen() {
    const [activeFilter, setActiveFilter] = useState('all');
    const filters = ['all', 'today', 'calendar', 'community'];

    const alerts = [
      {
        type: 'calendar', urgent: true,
        title: 'Pediatrician appointment at risk',
        body: 'Heavy rain & 22mph gusts forecast at E 86th & Park Ave at 2:30pm. Plan to leave 15 min early.',
        time: '2:30 PM · Today', icon: window.lucide.Calendar, color: t.danger, tag: 'calendar',
      },
      {
        type: 'community', urgent: false,
        title: 'Hail confirmed near Times Square',
        body: '14 users reported marble-sized hail at W 44th & 7th Ave. Avoiding that zone for 30 min.',
        time: '9 min ago', icon: window.lucide.Users, color: t.warning, tag: 'community',
      },
      {
        type: 'today', urgent: false,
        title: 'Sunny window: 1:00–3:30pm',
        body: 'Your neighborhood will be dry and comfortable. Ideal time for outdoor lunch or errands.',
        time: '1:00 PM · Today', icon: window.lucide.Sun, color: t.success, tag: 'today',
      },
      {
        type: 'calendar', urgent: false,
        title: 'Morning run looks great tomorrow',
        body: 'Riverside Park: 58°, 5mph breeze, no rain until 9am. Your 6:30am run window is clear.',
        time: '6:30 AM · Tomorrow', icon: window.lucide.Activity, color: t.success, tag: 'calendar',
      },
      {
        type: 'today', urgent: false,
        title: 'Fog advisory until 11am',
        body: 'Visibility below 1/4 mile in your area. Allow extra travel time; cyclists should use lights.',
        time: '11:00 AM · Today', icon: window.lucide.CloudFog, color: t.warning, tag: 'today',
      },
      {
        type: 'community', urgent: false,
        title: 'Flooding at Lexington & 68th',
        body: '6 users report overflowing drain. Bike lane blocked; detour via Third Ave recommended.',
        time: '4 min ago', icon: window.lucide.AlertTriangle, color: t.danger, tag: 'community',
      },
    ];

    const filtered = activeFilter === 'all' ? alerts : alerts.filter(a => a.tag === activeFilter);

    return React.createElement('div', { style: { flex: 1, overflowY: 'scroll', fontFamily: font } },
      React.createElement('div', { style: { padding: '12px 16px 0' } },
        React.createElement('div', { style: { fontSize: 20, fontWeight: 800, color: t.text, marginBottom: 2 } }, 'Smart Alerts'),
        React.createElement('div', { style: { fontSize: 13, color: t.textSec, marginBottom: 12 } }, '6 active notifications'),
      ),

      // Filter pills
      React.createElement('div', { style: { display: 'flex', gap: 8, padding: '0 16px 14px', overflowX: 'scroll' } },
        ...filters.map(f =>
          React.createElement('div', {
            key: f, onClick: () => setActiveFilter(f),
            style: {
              padding: '7px 16px', borderRadius: 20, cursor: 'pointer', flexShrink: 0,
              background: activeFilter === f ? t.primary : t.card,
              border: `1.5px solid ${activeFilter === f ? t.primary : t.border}`,
              fontSize: 12, fontWeight: 700, textTransform: 'capitalize',
              color: activeFilter === f ? '#fff' : t.textSec,
              transition: 'all 0.2s',
            }
          }, f)
        )
      ),

      // Alert cards
      React.createElement('div', { style: { padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 10 } },
        ...filtered.map((a, i) =>
          React.createElement('div', {
            key: i,
            style: {
              background: t.card, borderRadius: 20, padding: '14px 16px',
              border: `1.5px solid ${a.urgent ? a.color + '55' : t.border}`,
              boxShadow: a.urgent ? `0 4px 16px ${a.color}22` : t.shadow,
            }
          },
            React.createElement('div', { style: { display: 'flex', gap: 12, alignItems: 'flex-start' } },
              React.createElement('div', {
                style: { width: 40, height: 40, borderRadius: 14, background: `${a.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }
              }, React.createElement(a.icon, { size: 19, color: a.color })),
              React.createElement('div', { style: { flex: 1 } },
                React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 6 } },
                  React.createElement('div', { style: { fontSize: 13, fontWeight: 700, color: t.text, lineHeight: 1.3, flex: 1 } }, a.title),
                  a.urgent && React.createElement('div', {
                    style: { padding: '2px 8px', borderRadius: 8, background: t.danger, fontSize: 10, fontWeight: 700, color: '#fff', flexShrink: 0 }
                  }, 'URGENT'),
                ),
                React.createElement('div', { style: { fontSize: 12, color: t.textSec, marginTop: 4, lineHeight: 1.5 } }, a.body),
                React.createElement('div', { style: { fontSize: 11, color: t.textMuted, marginTop: 6, fontWeight: 600 } }, a.time),
              )
            )
          )
        )
      ),
      React.createElement('div', { style: { height: 20 } })
    );
  }

  // ── EXPLORE SCREEN ──────────────────────────────────────────────
  function ExploreScreen() {
    const [reportMode, setReportMode] = useState(false);
    const [selected, setSelected] = useState(null);

    const mapPins = [
      { x: 52, y: 32, type: 'rain', label: 'Heavy Rain', color: t.danger, icon: window.lucide.CloudRain, reports: 24 },
      { x: 75, y: 55, type: 'wind', label: 'Strong Gusts', color: t.warning, icon: window.lucide.Wind, reports: 8 },
      { x: 30, y: 65, type: 'clear', label: 'Clear & Dry', color: t.success, icon: window.lucide.Sun, reports: 11 },
      { x: 60, y: 78, type: 'flood', label: 'Street Flooding', color: '#9B59B6', icon: window.lucide.AlertTriangle, reports: 5 },
      { x: 20, y: 42, type: 'haze', label: 'Dense Fog', color: t.textMuted, icon: window.lucide.CloudFog, reports: 3 },
    ];

    const reportTypes = [
      { id: 'rain', label: 'Rain', icon: window.lucide.CloudRain, color: t.primary },
      { id: 'wind', label: 'Wind', icon: window.lucide.Wind, color: t.warning },
      { id: 'hail', label: 'Hail', icon: window.lucide.CloudSnow, color: '#9B59B6' },
      { id: 'flood', label: 'Flooding', icon: window.lucide.Waves, color: t.danger },
      { id: 'clear', label: 'Clear', icon: window.lucide.Sun, color: t.success },
    ];

    return React.createElement('div', { style: { flex: 1, overflowY: 'scroll', fontFamily: font } },
      React.createElement('div', { style: { padding: '12px 16px 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
        React.createElement('div', null,
          React.createElement('div', { style: { fontSize: 20, fontWeight: 800, color: t.text } }, 'Explore'),
          React.createElement('div', { style: { fontSize: 13, color: t.textSec } }, 'Live crowd-verified conditions'),
        ),
        React.createElement('div', {
          onClick: () => setReportMode(!reportMode),
          style: {
            padding: '8px 14px', borderRadius: 20,
            background: reportMode ? t.primary : t.card,
            border: `1.5px solid ${reportMode ? t.primary : t.border}`,
            fontSize: 12, fontWeight: 700, color: reportMode ? '#fff' : t.text, cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 5,
          }
        },
          React.createElement(window.lucide.Plus, { size: 14, color: reportMode ? '#fff' : t.text }),
          'Report'
        ),
      ),

      // Map placeholder
      React.createElement('div', {
        style: {
          margin: '0 16px', height: 220, borderRadius: 24, overflow: 'hidden',
          background: t.gradient3, position: 'relative', border: `1.5px solid ${t.border}`,
        }
      },
        // Grid lines
        ...([20, 40, 60, 80].map((p, i) =>
          React.createElement('div', { key: `h${i}`, style: { position: 'absolute', left: 0, right: 0, top: `${p}%`, height: 1, background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)' } })
        )),
        ...([20, 40, 60, 80].map((p, i) =>
          React.createElement('div', { key: `v${i}`, style: { position: 'absolute', top: 0, bottom: 0, left: `${p}%`, width: 1, background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)' } })
        )),
        // Rain blob
        React.createElement('div', {
          style: { position: 'absolute', left: '35%', top: '15%', width: 120, height: 90, borderRadius: '50%', background: 'rgba(0,150,199,0.18)', filter: 'blur(20px)' }
        }),
        // Pins
        ...mapPins.map((pin, i) =>
          React.createElement('div', {
            key: i, onClick: () => setSelected(selected === i ? null : i),
            style: {
              position: 'absolute', left: `${pin.x}%`, top: `${pin.y}%`,
              transform: 'translate(-50%, -50%)', cursor: 'pointer',
              display: 'flex', flexDirection: 'column', alignItems: 'center',
            }
          },
            React.createElement('div', {
              style: {
                width: selected === i ? 40 : 32, height: selected === i ? 40 : 32,
                borderRadius: '50%', background: pin.color,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: `0 2px 12px ${pin.color}66`,
                transition: 'all 0.2s', border: '2px solid #fff',
              }
            }, React.createElement(pin.icon, { size: selected === i ? 20 : 15, color: '#fff', strokeWidth: 2 })),
            selected === i && React.createElement('div', {
              style: {
                position: 'absolute', bottom: '100%', marginBottom: 4,
                background: t.card, padding: '4px 8px', borderRadius: 8, whiteSpace: 'nowrap',
                fontSize: 11, fontWeight: 700, color: t.text, boxShadow: t.shadow,
                border: `1px solid ${t.border}`,
              }
            }, `${pin.label} · ${pin.reports} reports`)
          )
        ),
        // My location dot
        React.createElement('div', {
          style: {
            position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)',
            width: 16, height: 16, borderRadius: '50%', background: t.primary,
            border: '3px solid #fff', boxShadow: `0 0 0 6px ${t.primary}33`,
          }
        }),
        React.createElement('div', {
          style: { position: 'absolute', bottom: 10, left: 10, display: 'flex', gap: 6 }
        },
          React.createElement('div', {
            style: { padding: '5px 10px', borderRadius: 12, background: isDark ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.85)', backdropFilter: 'blur(8px)', fontSize: 11, fontWeight: 700, color: t.text }
          }, 'Live · 47 reports nearby'),
        )
      ),

      // Report panel
      reportMode && React.createElement('div', {
        style: {
          margin: '12px 16px 0', padding: '16px', borderRadius: 20,
          background: t.card, border: `1.5px solid ${t.primary}55`, boxShadow: t.shadow,
        }
      },
        React.createElement('div', { style: { fontSize: 14, fontWeight: 700, color: t.text, marginBottom: 12 } }, 'What are you seeing?'),
        React.createElement('div', { style: { display: 'flex', gap: 8, flexWrap: 'wrap' } },
          ...reportTypes.map((r, i) =>
            React.createElement('div', {
              key: i,
              style: {
                padding: '8px 14px', borderRadius: 16,
                background: `${r.color}18`, border: `1.5px solid ${r.color}44`,
                display: 'flex', alignItems: 'center', gap: 6,
                fontSize: 13, fontWeight: 600, color: r.color, cursor: 'pointer',
              }
            },
              React.createElement(r.icon, { size: 15, color: r.color }),
              r.label
            )
          )
        ),
        React.createElement('div', {
          style: {
            marginTop: 12, padding: '10px 14px', borderRadius: 14,
            background: t.primary, display: 'flex', justifyContent: 'center', alignItems: 'center',
            gap: 6, cursor: 'pointer',
          }
        },
          React.createElement(window.lucide.Send, { size: 15, color: '#fff' }),
          React.createElement('span', { style: { fontSize: 13, fontWeight: 700, color: '#fff' } }, 'Submit Report'),
        )
      ),

      // Recent reports feed
      React.createElement('div', { style: { padding: '14px 16px 24px' } },
        React.createElement('div', { style: { fontSize: 13, fontWeight: 700, color: t.textSec, letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 10 } }, 'Recent Reports'),
        React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 8 } },
          ...[
            { user: 'Maria V.', loc: 'W 72nd & Columbus', msg: 'Huge puddle blocking bike lane corner — bike through carefully', time: '2 min', type: 'flood', color: '#9B59B6' },
            { user: 'James K.', loc: 'Riverside Dr & 79th', msg: 'Strong gusts off the river, knocked over umbrella!', time: '7 min', type: 'wind', color: t.warning },
            { user: 'Priya S.', loc: 'Central Park, 72nd transverse', msg: 'Totally dry under tree canopy, path looks clear', time: '11 min', type: 'clear', color: t.success },
          ].map((r, i) =>
            React.createElement('div', {
              key: i,
              style: { background: t.card, borderRadius: 16, padding: '12px 14px', border: `1px solid ${t.border}` }
            },
              React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: 4 } },
                React.createElement('span', { style: { fontSize: 13, fontWeight: 700, color: t.text } }, r.user),
                React.createElement('span', { style: { fontSize: 11, color: t.textMuted } }, `${r.time} ago`),
              ),
              React.createElement('div', { style: { fontSize: 11, color: t.primary, fontWeight: 600, marginBottom: 4 } }, r.loc),
              React.createElement('div', { style: { fontSize: 12, color: t.textSec, lineHeight: 1.4 } }, r.msg),
            )
          )
        )
      )
    );
  }

  // ── SETTINGS SCREEN ─────────────────────────────────────────────
  function SettingsScreen() {
    const [notifEnabled, setNotifEnabled] = useState(true);
    const [calSync, setCalSync] = useState(true);
    const [crowdReports, setCrowdReports] = useState(true);
    const [unit, setUnit] = useState('F');

    function Toggle({ value, onChange }) {
      return React.createElement('div', {
        onClick: () => onChange(!value),
        style: {
          width: 46, height: 26, borderRadius: 13,
          background: value ? t.primary : t.border,
          position: 'relative', cursor: 'pointer',
          transition: 'background 0.25s',
          flexShrink: 0,
        }
      },
        React.createElement('div', {
          style: {
            position: 'absolute', top: 3, left: value ? 23 : 3,
            width: 20, height: 20, borderRadius: '50%',
            background: '#fff', transition: 'left 0.25s',
            boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
          }
        })
      );
    }

    function Section({ title, children }) {
      return React.createElement('div', { style: { marginBottom: 14 } },
        React.createElement('div', { style: { fontSize: 11, fontWeight: 700, color: t.textMuted, letterSpacing: 0.8, textTransform: 'uppercase', padding: '0 16px', marginBottom: 6 } }, title),
        React.createElement('div', { style: { background: t.card, borderRadius: 20, margin: '0 16px', border: `1px solid ${t.border}` } }, children)
      );
    }

    function Row({ icon, label, right, last }) {
      return React.createElement('div', {
        style: {
          display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px',
          borderBottom: last ? 'none' : `1px solid ${t.border}`,
        }
      },
        React.createElement('div', {
          style: { width: 34, height: 34, borderRadius: 10, background: t.accentGlow, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }
        }, React.createElement(icon, { size: 17, color: t.primary })),
        React.createElement('div', { style: { flex: 1, fontSize: 14, fontWeight: 600, color: t.text } }, label),
        right,
      );
    }

    return React.createElement('div', { style: { flex: 1, overflowY: 'scroll', fontFamily: font } },
      // Profile header
      React.createElement('div', {
        style: { margin: '8px 16px 16px', padding: '18px', borderRadius: 24, background: t.gradient1, boxShadow: t.shadow }
      },
        React.createElement('div', { style: { display: 'flex', gap: 14, alignItems: 'center' } },
          React.createElement('div', {
            style: { width: 56, height: 56, borderRadius: 20, background: 'rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }
          }, React.createElement(window.lucide.User, { size: 28, color: '#fff' })),
          React.createElement('div', null,
            React.createElement('div', { style: { fontSize: 17, fontWeight: 800, color: '#fff' } }, 'Alex Rivera'),
            React.createElement('div', { style: { fontSize: 12, color: 'rgba(255,255,255,0.75)', marginTop: 2 } }, 'Upper West Side · 4 saved places'),
            React.createElement('div', { style: { marginTop: 6, display: 'inline-flex', alignItems: 'center', gap: 4, padding: '3px 10px', borderRadius: 10, background: 'rgba(255,255,255,0.2)' } },
              React.createElement(window.lucide.Star, { size: 12, color: '#fff', fill: '#fff' }),
              React.createElement('span', { style: { fontSize: 11, color: '#fff', fontWeight: 700 } }, '112 reports submitted'),
            )
          )
        )
      ),

      Section('Appearance',
        Row({ icon: isDark ? window.lucide.Moon : window.lucide.Sun, label: 'Dark Mode', right: React.createElement(Toggle, { value: isDark, onChange: setIsDark }), last: true })
      ),

      Section('Notifications',
        React.createElement('div', null,
          Row({ icon: window.lucide.Bell, label: 'Push Notifications', right: React.createElement(Toggle, { value: notifEnabled, onChange: setNotifEnabled }) }),
          Row({ icon: window.lucide.Calendar, label: 'Calendar Sync', right: React.createElement(Toggle, { value: calSync, onChange: setCalSync }) }),
          Row({ icon: window.lucide.Users, label: 'Crowd Reports', right: React.createElement(Toggle, { value: crowdReports, onChange: setCrowdReports }), last: true }),
        )
      ),

      Section('Preferences',
        React.createElement('div', null,
          Row({
            icon: window.lucide.Thermometer, label: 'Temperature Unit',
            right: React.createElement('div', { style: { display: 'flex', gap: 4 } },
              ...['F', 'C'].map(u =>
                React.createElement('div', {
                  key: u, onClick: () => setUnit(u),
                  style: {
                    width: 32, height: 32, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: unit === u ? t.primary : t.surfaceAlt,
                    fontSize: 13, fontWeight: 700, color: unit === u ? '#fff' : t.textSec, cursor: 'pointer',
                  }
                }, `°${u}`)
              )
            ),
          }),
          Row({ icon: window.lucide.MapPin, label: 'Saved Places', right: React.createElement(window.lucide.ChevronRight, { size: 16, color: t.textMuted }) }),
          Row({ icon: window.lucide.Navigation, label: 'Default Route Mode', right: React.createElement('span', { style: { fontSize: 12, color: t.textMuted, fontWeight: 600 } }, 'Walking'), last: true }),
        )
      ),

      Section('About',
        React.createElement('div', null,
          Row({ icon: window.lucide.Info, label: 'Microcast v2.1.0', right: React.createElement('span', { style: { fontSize: 12, color: t.textMuted } }, 'Up to date') }),
          Row({ icon: window.lucide.Shield, label: 'Privacy Policy', right: React.createElement(window.lucide.ChevronRight, { size: 16, color: t.textMuted }) }),
          Row({ icon: window.lucide.LogOut, label: 'Sign Out', right: null, last: true }),
        )
      ),
      React.createElement('div', { style: { height: 20 } })
    );
  }

  const screens = {
    home: HomeScreen,
    route: RouteScreen,
    alerts: AlertsScreen,
    explore: ExploreScreen,
    settings: SettingsScreen,
  };

  return React.createElement('div', {
    style: { display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#E0E8EC', fontFamily: font }
  },
    fontStyle,
    React.createElement('div', {
      style: {
        width: 375, height: 812, borderRadius: 48, overflow: 'hidden',
        background: t.bg, display: 'flex', flexDirection: 'column',
        boxShadow: '0 30px 80px rgba(0,0,0,0.35), 0 0 0 10px #1A1A1A, 0 0 0 12px #333',
        position: 'relative', fontFamily: font,
        transition: 'background 0.3s ease',
      }
    },
      React.createElement(StatusBar),
      React.createElement('div', { style: { flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' } },
        React.createElement(screens[activeTab])
      ),

      // Bottom Nav
      React.createElement('div', {
        style: {
          display: 'flex', background: t.navBg,
          borderTop: `1px solid ${t.border}`,
          padding: '8px 0 16px',
          boxShadow: `0 -4px 20px ${t.shadow}`,
        }
      },
        ...tabs.map(tab =>
          React.createElement('div', {
            key: tab.id,
            onClick: () => setActiveTab(tab.id),
            style: {
              flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
              cursor: 'pointer', padding: '4px 0',
              transition: 'all 0.2s',
              opacity: activeTab === tab.id ? 1 : 0.55,
            }
          },
            React.createElement('div', {
              style: {
                width: activeTab === tab.id ? 36 : 0, height: 3, borderRadius: 2,
                background: t.primary, marginBottom: 4,
                transition: 'width 0.25s ease',
              }
            }),
            React.createElement(tab.icon, {
              size: 22,
              color: activeTab === tab.id ? t.primary : t.textMuted,
              strokeWidth: activeTab === tab.id ? 2.2 : 1.8,
            }),
            React.createElement('span', {
              style: {
                fontSize: 10, fontWeight: activeTab === tab.id ? 700 : 500,
                color: activeTab === tab.id ? t.primary : t.textMuted,
                fontFamily: font,
              }
            }, tab.label)
          )
        )
      )
    )
  );
}
