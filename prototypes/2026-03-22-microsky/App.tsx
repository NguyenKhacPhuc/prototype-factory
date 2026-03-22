const { useState, useEffect, useRef } = React;

function App() {
  const themes = {
    dark: {
      bg: '#06101f',
      surface: '#0d1f38',
      card: '#112641',
      cardBorder: '#1a3a5c',
      text: '#e8f4ff',
      textSec: '#7ab8d4',
      textMuted: '#3d6a8a',
      primary: '#22d3ee',
      primaryGlow: 'rgba(34,211,238,0.18)',
      accent: '#a78bfa',
      accentGlow: 'rgba(167,139,250,0.18)',
      danger: '#f87171',
      warning: '#fbbf24',
      success: '#34d399',
      navBg: '#08172b',
      navBorder: '#1a3a5c',
      mapBg: '#091525',
      gradTop: 'linear-gradient(180deg,#06101f 0%,#0d1f38 100%)',
    },
    light: {
      bg: '#eef5ff',
      surface: '#ffffff',
      card: '#dceeff',
      cardBorder: '#a8ccf0',
      text: '#071428',
      textSec: '#1a5a8a',
      textMuted: '#6b8eaa',
      primary: '#0891b2',
      primaryGlow: 'rgba(8,145,178,0.12)',
      accent: '#7c3aed',
      accentGlow: 'rgba(124,58,237,0.12)',
      danger: '#dc2626',
      warning: '#ca8a04',
      success: '#059669',
      navBg: '#ffffff',
      navBorder: '#a8ccf0',
      mapBg: '#d4e8ff',
      gradTop: 'linear-gradient(180deg,#eef5ff 0%,#dceeff 100%)',
    },
  };

  const [theme, setTheme] = useState('dark');
  const [tab, setTab] = useState('home');
  const [pressed, setPressed] = useState(null);
  const [dryWindow, setDryWindow] = useState(12);
  const [alertsRead, setAlertsRead] = useState(false);
  const [activeRoute, setActiveRoute] = useState(0);
  const [mapLayer, setMapLayer] = useState('rain');
  const [time, setTime] = useState('');
  const [habitToggle, setHabitToggle] = useState({ commute: true, workout: false, pickup: true });
  const [savedLocations, setSavedLocations] = useState(['Union Square', 'Home - 4th Ave', 'Gym - Market St']);

  const t = themes[theme];

  useEffect(() => {
    const update = () => {
      const d = new Date();
      setTime(d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }));
    };
    update();
    const iv = setInterval(update, 1000);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    const iv = setInterval(() => setDryWindow(w => w > 0 ? w - 1 : 14), 8000);
    return () => clearInterval(iv);
  }, []);

  const btn = (id) => ({
    transform: pressed === id ? 'scale(0.96)' : 'scale(1)',
    transition: 'transform 0.12s ease, opacity 0.12s ease',
    cursor: 'pointer',
  });

  const press = (id) => { setPressed(id); setTimeout(() => setPressed(null), 150); };

  // Inject font
  const fontTag = `@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');* { font-family: 'Outfit', sans-serif; box-sizing: border-box; }::-webkit-scrollbar { display: none; }`;

  const PhoneShell = ({ children }) => (
    <div style={{
      minHeight: '100vh', backgroundColor: '#1a1a2e',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '20px',
      backgroundImage: 'radial-gradient(ellipse at 30% 30%, #0d2a4a 0%, #1a1a2e 60%)',
    }}>
      <style>{fontTag}</style>
      <div style={{
        width: 375, height: 812, borderRadius: 52,
        background: t.bg, overflow: 'hidden', position: 'relative',
        boxShadow: '0 40px 120px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.08), inset 0 0 0 1px rgba(255,255,255,0.04)',
        display: 'flex', flexDirection: 'column',
      }}>
        {children}
      </div>
    </div>
  );

  const StatusBar = () => (
    <div style={{
      height: 44, background: t.bg, display: 'flex',
      alignItems: 'center', justifyContent: 'space-between',
      padding: '0 28px', flexShrink: 0, position: 'relative', zIndex: 10,
    }}>
      <span style={{ color: t.text, fontSize: 15, fontWeight: 600, letterSpacing: 0.3 }}>{time || '09:41'}</span>
      <div style={{
        position: 'absolute', left: '50%', transform: 'translateX(-50%)',
        top: 8, width: 120, height: 34, background: '#000',
        borderRadius: 20, boxShadow: '0 0 0 2px rgba(255,255,255,0.06)',
      }} />
      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        {React.createElement(window.lucide.Wifi, { size: 14, color: t.text })}
        {React.createElement(window.lucide.Battery, { size: 16, color: t.text })}
      </div>
    </div>
  );

  const NavBar = () => {
    const tabs = [
      { id: 'home', icon: 'CloudRain', label: 'Now' },
      { id: 'map', icon: 'Map', label: 'Map' },
      { id: 'routes', icon: 'Navigation', label: 'Routes' },
      { id: 'alerts', icon: 'Bell', label: 'Alerts' },
      { id: 'profile', icon: 'User', label: 'Me' },
    ];
    return (
      <div style={{
        height: 80, background: t.navBg, borderTop: `1px solid ${t.navBorder}`,
        display: 'flex', alignItems: 'center', justifyContent: 'space-around',
        flexShrink: 0, paddingBottom: 12,
      }}>
        {tabs.map(({ id, icon, label }) => {
          const active = tab === id;
          const IconComp = window.lucide[icon];
          return (
            <div key={id} onClick={() => { setTab(id); press('nav-' + id); }}
              style={{ ...btn('nav-' + id), display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, padding: '8px 12px', borderRadius: 16, background: active ? t.primaryGlow : 'transparent', position: 'relative' }}>
              {id === 'alerts' && !alertsRead && (
                <div style={{ position: 'absolute', top: 4, right: 10, width: 8, height: 8, borderRadius: '50%', background: t.danger, border: `2px solid ${t.navBg}` }} />
              )}
              {IconComp && React.createElement(IconComp, { size: 22, color: active ? t.primary : t.textMuted, strokeWidth: active ? 2.5 : 1.8 })}
              <span style={{ fontSize: 10, color: active ? t.primary : t.textMuted, fontWeight: active ? 700 : 400 }}>{label}</span>
            </div>
          );
        })}
      </div>
    );
  };

  // ─── HOME SCREEN ───────────────────────────────────────────────────────────
  const HomeScreen = () => {
    const conditions = [
      { icon: 'Droplets', label: 'Rain', value: '82%', sub: 'chance', color: '#60a5fa' },
      { icon: 'Wind', label: 'Wind', value: '14', sub: 'mph NE', color: '#a78bfa' },
      { icon: 'Thermometer', label: 'Feels', value: '61°', sub: 'humid', color: '#fb923c' },
      { icon: 'Eye', label: 'Pollen', value: 'High', sub: 'tree', color: '#34d399' },
    ];
    const timeline = [
      { time: 'Now', icon: 'CloudDrizzle', desc: 'Light drizzle', temp: 63, bar: 0.3, color: '#60a5fa' },
      { time: '+5m', icon: 'Cloud', desc: 'Overcast', temp: 62, bar: 0.1, color: '#8ab4d4' },
      { time: '+10m', icon: 'Sun', desc: 'Dry window', temp: 64, bar: 0, color: '#fbbf24' },
      { time: '+20m', icon: 'CloudRain', desc: 'Rain starts', temp: 61, bar: 0.7, color: '#60a5fa' },
      { time: '+35m', icon: 'CloudRain', desc: 'Heavy rain', temp: 59, bar: 0.95, color: '#3b82f6' },
      { time: '+50m', icon: 'Cloud', desc: 'Clearing', temp: 60, bar: 0.2, color: '#8ab4d4' },
    ];
    return (
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 20px 20px', background: t.bg }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
              {React.createElement(window.lucide.MapPin, { size: 14, color: t.primary })}
              <span style={{ color: t.primary, fontSize: 13, fontWeight: 600 }}>Union Square, SF</span>
            </div>
            <div style={{ color: t.text, fontSize: 36, fontWeight: 800, lineHeight: 1.1 }}>63°<span style={{ fontSize: 16, fontWeight: 400, color: t.textSec }}>F</span></div>
            <div style={{ color: t.textSec, fontSize: 14, marginTop: 2 }}>Drizzle — feels like 58°</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 48, lineHeight: 1 }}>🌦️</div>
            <div style={{ color: t.textMuted, fontSize: 11, marginTop: 4 }}>Updated 2m ago</div>
          </div>
        </div>

        {/* Dry Window Alert */}
        <div style={{
          background: `linear-gradient(135deg, ${t.success}22 0%, ${t.primary}22 100%)`,
          border: `1px solid ${t.success}55`, borderRadius: 18, padding: '14px 16px',
          marginBottom: 16, display: 'flex', alignItems: 'center', gap: 14,
        }}>
          <div style={{ width: 44, height: 44, borderRadius: '50%', background: `${t.success}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            {React.createElement(window.lucide.Timer, { size: 22, color: t.success })}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ color: t.text, fontSize: 14, fontWeight: 700 }}>Dry window in {dryWindow} min</div>
            <div style={{ color: t.textSec, fontSize: 12, marginTop: 2 }}>Leave by 9:53 for a dry walk to Bart. Rain resumes at 10:08.</div>
          </div>
          <div onClick={() => press('dismiss')} style={{ ...btn('dismiss'), color: t.textMuted }}>
            {React.createElement(window.lucide.X, { size: 16 })}
          </div>
        </div>

        {/* Condition Chips */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
          {conditions.map(({ icon, label, value, sub, color }) => {
            const IC = window.lucide[icon];
            return (
              <div key={label} style={{ background: t.card, border: `1px solid ${t.cardBorder}`, borderRadius: 16, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 36, height: 36, borderRadius: 12, background: color + '22', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {IC && React.createElement(IC, { size: 18, color })}
                </div>
                <div>
                  <div style={{ color: t.textMuted, fontSize: 10, fontWeight: 500 }}>{label}</div>
                  <div style={{ color: t.text, fontSize: 18, fontWeight: 700, lineHeight: 1.1 }}>{value}</div>
                  <div style={{ color: t.textSec, fontSize: 11 }}>{sub}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Minute-by-minute timeline */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ color: t.textSec, fontSize: 12, fontWeight: 600, marginBottom: 10, letterSpacing: 0.8, textTransform: 'uppercase' }}>Next 50 Minutes</div>
          <div style={{ background: t.card, border: `1px solid ${t.cardBorder}`, borderRadius: 18, overflow: 'hidden' }}>
            {/* rain bars */}
            <div style={{ display: 'flex', alignItems: 'flex-end', height: 50, padding: '0 16px', gap: 4, paddingTop: 10 }}>
              {timeline.map(({ time: t2, bar, color }) => (
                <div key={t2} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                  <div style={{ width: '100%', borderRadius: 3, background: bar > 0 ? color : t.cardBorder, height: Math.max(4, bar * 32), transition: 'height 0.3s' }} />
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', padding: '6px 16px 12px', gap: 4 }}>
              {timeline.map(({ time: t2, icon: ic, color, desc }) => {
                const IC = window.lucide[ic];
                return (
                  <div key={t2} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                    {IC && React.createElement(IC, { size: 14, color })}
                    <span style={{ color: t.textMuted, fontSize: 9, textAlign: 'center' }}>{t2}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{ color: t.textSec, fontSize: 12, fontWeight: 600, marginBottom: 10, letterSpacing: 0.8, textTransform: 'uppercase' }}>Quick Check</div>
        <div style={{ display: 'flex', gap: 10 }}>
          {[
            { icon: 'Bike', label: 'Bike Route', id: 'bike' },
            { icon: 'PersonStanding', label: 'Walk Commute', id: 'walk' },
            { icon: 'Coffee', label: 'Café Seats', id: 'cafe' },
          ].map(({ icon, label, id }) => {
            const IC = window.lucide[icon];
            return (
              <div key={id} onClick={() => { press(id); setTab('routes'); }}
                style={{ ...btn(id), flex: 1, background: t.card, border: `1px solid ${t.cardBorder}`, borderRadius: 14, padding: '12px 8px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                {IC && React.createElement(IC, { size: 20, color: t.primary })}
                <span style={{ color: t.textSec, fontSize: 10, textAlign: 'center', fontWeight: 500 }}>{label}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // ─── MAP SCREEN ────────────────────────────────────────────────────────────
  const MapScreen = () => {
    const layers = ['rain', 'wind', 'heat', 'pollen'];
    const layerColors = { rain: '#60a5fa', wind: '#a78bfa', heat: '#fb923c', pollen: '#34d399' };
    return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', background: t.bg }}>
        {/* Layer selector */}
        <div style={{ padding: '12px 20px 0', display: 'flex', gap: 8 }}>
          {layers.map(l => (
            <div key={l} onClick={() => setMapLayer(l)}
              style={{ flex: 1, padding: '8px 0', borderRadius: 20, textAlign: 'center', fontSize: 11, fontWeight: 600, background: mapLayer === l ? layerColors[l] + '33' : t.card, border: `1px solid ${mapLayer === l ? layerColors[l] : t.cardBorder}`, color: mapLayer === l ? layerColors[l] : t.textMuted, cursor: 'pointer', textTransform: 'capitalize', transition: 'all 0.2s' }}>
              {l}
            </div>
          ))}
        </div>

        {/* Map SVG */}
        <div style={{ flex: 1, position: 'relative', margin: '12px 20px', borderRadius: 20, overflow: 'hidden', border: `1px solid ${t.cardBorder}` }}>
          <svg width="100%" height="100%" viewBox="0 0 335 360" style={{ background: t.mapBg }}>
            {/* Grid streets */}
            {[0,1,2,3,4,5].map(i => (
              <g key={i}>
                <line x1={0} y1={i*60+20} x2={335} y2={i*60+20} stroke={t.cardBorder} strokeWidth={1} opacity={0.6} />
                <line x1={i*55+20} y1={0} x2={i*55+20} y2={360} stroke={t.cardBorder} strokeWidth={1} opacity={0.6} />
              </g>
            ))}
            {/* Buildings */}
            {[
              [30,30,60,50],[110,30,80,45],[210,30,55,60],[280,30,45,40],
              [30,110,50,65],[100,120,70,55],[190,110,65,60],[270,115,55,50],
              [30,200,65,55],[115,205,60,50],[195,195,70,65],[275,200,50,55],
              [35,285,55,60],[110,290,75,55],[200,285,60,60],[275,285,50,55],
            ].map(([x,y,w,h], i) => (
              <rect key={i} x={x} y={y} width={w} height={h} rx={4} fill={t.surface} stroke={t.cardBorder} strokeWidth={1} />
            ))}

            {/* Weather overlay based on layer */}
            {mapLayer === 'rain' && [
              { cx: 80, cy: 80, r: 55, op: 0.35 },
              { cx: 200, cy: 120, r: 70, op: 0.5 },
              { cx: 280, cy: 60, r: 40, op: 0.25 },
              { cx: 120, cy: 250, r: 60, op: 0.4 },
            ].map((c, i) => (
              <circle key={i} cx={c.cx} cy={c.cy} r={c.r} fill="#3b82f6" opacity={c.op} />
            ))}
            {mapLayer === 'wind' && [
              { x1: 50, y1: 80, x2: 130, y2: 65 }, { x1: 160, y1: 100, x2: 250, y2: 80 },
              { x1: 80, y1: 180, x2: 180, y2: 165 }, { x1: 200, y1: 200, x2: 310, y2: 185 },
              { x1: 50, y1: 270, x2: 150, y2: 255 }, { x1: 170, y1: 290, x2: 290, y2: 270 },
            ].map((l, i) => (
              <g key={i}>
                <line x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke="#a78bfa" strokeWidth={2.5} opacity={0.6} strokeLinecap="round" />
                <polygon points={`${l.x2},${l.y2} ${l.x2-12},${l.y2-6} ${l.x2-12},${l.y2+6}`} fill="#a78bfa" opacity={0.7} />
              </g>
            ))}
            {mapLayer === 'heat' && [
              { cx: 100, cy: 90, r: 50, op: 0.4 },
              { cx: 250, cy: 170, r: 65, op: 0.45 },
              { cx: 150, cy: 280, r: 55, op: 0.35 },
            ].map((c, i) => (
              <circle key={i} cx={c.cx} cy={c.cy} r={c.r} fill="#f97316" opacity={c.op} />
            ))}
            {mapLayer === 'pollen' && [
              { cx: 80, cy: 70, r: 45, op: 0.35 },
              { cx: 220, cy: 140, r: 55, op: 0.4 },
              { cx: 170, cy: 270, r: 60, op: 0.3 },
              { cx: 290, cy: 240, r: 35, op: 0.25 },
            ].map((c, i) => (
              <circle key={i} cx={c.cx} cy={c.cy} r={c.r} fill="#22c55e" opacity={c.op} />
            ))}

            {/* User location */}
            <circle cx={168} cy={180} r={12} fill={t.primary} opacity={0.25} />
            <circle cx={168} cy={180} r={6} fill={t.primary} />
            <circle cx={168} cy={180} r={3} fill="white" />

            {/* Destination pin */}
            <circle cx={270} cy={90} r={8} fill={t.accent} />
            <line x1={270} y1={90} x2={270} y2={108} stroke={t.accent} strokeWidth={2} />
          </svg>

          {/* Legend */}
          <div style={{
            position: 'absolute', bottom: 12, left: 12, right: 12,
            background: theme === 'dark' ? 'rgba(9,21,37,0.88)' : 'rgba(255,255,255,0.88)',
            backdropFilter: 'blur(8px)', borderRadius: 12, padding: '8px 12px',
            border: `1px solid ${t.cardBorder}`,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: t.textSec, fontSize: 11, fontWeight: 500 }}>
                {mapLayer === 'rain' ? '🌧 Rain intensity by block' : mapLayer === 'wind' ? '💨 Wind direction & speed' : mapLayer === 'heat' ? '🌡 Heat island zones' : '🌿 Pollen concentration'}
              </span>
              <div style={{ display: 'flex', gap: 4 }}>
                {['Low','Med','High'].map((l, i) => (
                  <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                    <div style={{ width: 8, height: 8, borderRadius: 2, opacity: 0.3 + i * 0.3, background: layerColors[mapLayer] }} />
                    <span style={{ color: t.textMuted, fontSize: 9 }}>{l}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Street condition pills */}
        <div style={{ padding: '0 20px 12px' }}>
          <div style={{ color: t.textSec, fontSize: 12, fontWeight: 600, marginBottom: 8, letterSpacing: 0.8, textTransform: 'uppercase' }}>Nearby Conditions</div>
          <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
            {[
              { label: 'Market St', status: '💦 Flooding', color: t.danger },
              { label: '4th & Howard', status: '💨 Crosswinds', color: t.accent },
              { label: 'Union Sq', status: '🌤 Clear now', color: t.success },
              { label: 'The Embarcadero', status: '🌧 Heavy rain', color: '#60a5fa' },
            ].map(({ label, status, color }) => (
              <div key={label} style={{ flexShrink: 0, background: t.card, border: `1px solid ${t.cardBorder}`, borderRadius: 12, padding: '8px 12px' }}>
                <div style={{ color: t.text, fontSize: 12, fontWeight: 600 }}>{label}</div>
                <div style={{ color, fontSize: 11, marginTop: 2 }}>{status}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // ─── ROUTES SCREEN ─────────────────────────────────────────────────────────
  const RoutesScreen = () => {
    const routes = [
      {
        name: 'Weather-Smart Route',
        tag: 'Recommended',
        tagColor: t.success,
        time: '18 min',
        extra: '+4 min',
        desc: 'Via Kearny St & Sutter. Under awnings for 80% of route. Avoids wind tunnel on Montgomery.',
        stats: [
          { icon: 'Umbrella', val: '20%', label: 'Rain exp.' },
          { icon: 'Wind', val: 'Low', label: 'Wind' },
          { icon: 'Route', val: '0.9mi', label: 'Distance' },
        ],
        incidents: ['Shade from Transamerica', 'Coffee stop at 3rd'],
        color: t.success,
      },
      {
        name: 'Direct Route',
        tag: 'Fastest',
        tagColor: t.warning,
        time: '14 min',
        extra: 'Shortest',
        desc: 'Via Market St. Direct but exposed. Heavy rain likely in 10 min. Crosswind risk near Embarcadero.',
        stats: [
          { icon: 'Umbrella', val: '76%', label: 'Rain exp.' },
          { icon: 'Wind', val: 'High', label: 'Wind' },
          { icon: 'Route', val: '0.7mi', label: 'Distance' },
        ],
        incidents: ['Flood risk at 3rd & Market', 'No shelter zone for 6 blocks'],
        color: t.danger,
      },
      {
        name: 'Indoor-Heavy Route',
        tag: 'All Covered',
        tagColor: t.primary,
        time: '22 min',
        extra: '+8 min',
        desc: 'Via Westfield Mall & underground BART connector. Almost entirely sheltered.',
        stats: [
          { icon: 'Umbrella', val: '5%', label: 'Rain exp.' },
          { icon: 'Wind', val: 'None', label: 'Wind' },
          { icon: 'Route', val: '1.1mi', label: 'Distance' },
        ],
        incidents: ['Macy\'s atrium shortcut', 'BART underground link'],
        color: t.primary,
      },
    ];

    return (
      <div style={{ flex: 1, overflowY: 'auto', padding: '14px 20px 20px', background: t.bg }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div>
            <div style={{ color: t.text, fontSize: 20, fontWeight: 800 }}>Route Planner</div>
            <div style={{ color: t.textSec, fontSize: 13 }}>Union Sq → Embarcadero BART</div>
          </div>
          <div style={{ background: t.card, border: `1px solid ${t.cardBorder}`, borderRadius: 12, padding: '6px 12px', display: 'flex', alignItems: 'center', gap: 6 }}>
            {React.createElement(window.lucide.Clock, { size: 14, color: t.primary })}
            <span style={{ color: t.primary, fontSize: 12, fontWeight: 600 }}>Leave Now</span>
          </div>
        </div>

        {routes.map((r, i) => (
          <div key={i} onClick={() => { setActiveRoute(i); press('route-' + i); }}
            style={{ ...btn('route-' + i), background: t.card, border: `1.5px solid ${activeRoute === i ? r.color : t.cardBorder}`, borderRadius: 18, padding: 16, marginBottom: 12, cursor: 'pointer', transition: 'border-color 0.2s' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <div style={{ background: r.tagColor + '22', border: `1px solid ${r.tagColor}55`, borderRadius: 8, padding: '2px 8px' }}>
                    <span style={{ color: r.tagColor, fontSize: 10, fontWeight: 700 }}>{r.tag}</span>
                  </div>
                  {activeRoute === i && React.createElement(window.lucide.CheckCircle, { size: 14, color: r.color })}
                </div>
                <div style={{ color: t.text, fontSize: 15, fontWeight: 700 }}>{r.name}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ color: t.text, fontSize: 20, fontWeight: 800 }}>{r.time}</div>
                <div style={{ color: t.textMuted, fontSize: 11 }}>{r.extra}</div>
              </div>
            </div>

            <div style={{ color: t.textSec, fontSize: 12, lineHeight: 1.5, marginBottom: 12 }}>{r.desc}</div>

            <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
              {r.stats.map(({ icon, val, label }) => {
                const IC = window.lucide[icon];
                return (
                  <div key={label} style={{ flex: 1, background: t.surface, borderRadius: 12, padding: '8px 6px', textAlign: 'center' }}>
                    {IC && React.createElement(IC, { size: 14, color: r.color })}
                    <div style={{ color: t.text, fontSize: 14, fontWeight: 700, marginTop: 2 }}>{val}</div>
                    <div style={{ color: t.textMuted, fontSize: 10 }}>{label}</div>
                  </div>
                );
              })}
            </div>

            {r.incidents.map((inc, j) => (
              <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                {React.createElement(window.lucide.Info, { size: 12, color: t.textMuted })}
                <span style={{ color: t.textMuted, fontSize: 11 }}>{inc}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  // ─── ALERTS SCREEN ─────────────────────────────────────────────────────────
  const AlertsScreen = () => {
    const alerts = [
      {
        id: 1, type: 'urgent', icon: 'CloudLightning', color: t.danger,
        title: 'Rain in 8 minutes',
        desc: 'Radar shows heavy cell moving SW. Your commute block will be hit first.',
        time: 'Now', action: 'Leave in 3 min for dry window',
      },
      {
        id: 2, type: 'info', icon: 'Wind', color: t.accent,
        title: 'Crosswind alert: 4th & Market',
        desc: 'Wind speed expected 22mph NE at that intersection. Bike route affected.',
        time: '10 min', action: 'View alternate route',
      },
      {
        id: 3, type: 'habit', icon: 'GraduationCap', color: '#fbbf24',
        title: 'School pickup at 3pm',
        desc: 'Weather at school: Clear until 3:20pm. Return path will have light rain. Bring umbrella.',
        time: '2h 15m', action: 'Check return route',
      },
      {
        id: 4, type: 'success', icon: 'Sun', color: t.success,
        title: 'Workout window: 5:30pm',
        desc: 'Dolores Park clear, 68°F, no pollen. Your usual 45-min run will be comfortable.',
        time: '5:30 PM', action: 'Set reminder',
      },
      {
        id: 5, type: 'info', icon: 'Coffee', color: '#fb923c',
        title: 'Café meeting at Sightglass',
        desc: 'Outdoor seats will be wet until 2pm. Arrive after 2:15 for dry outdoor seating.',
        time: '1:45 PM', action: 'Update arrival time',
      },
    ];

    return (
      <div style={{ flex: 1, overflowY: 'auto', padding: '14px 20px 20px', background: t.bg }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div style={{ color: t.text, fontSize: 20, fontWeight: 800 }}>Smart Alerts</div>
          <div onClick={() => { setAlertsRead(true); press('markread'); }}
            style={{ ...btn('markread'), color: t.primary, fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
            Mark all read
          </div>
        </div>

        {alerts.map((a) => {
          const IC = window.lucide[a.icon];
          return (
            <div key={a.id} style={{
              background: t.card, border: `1px solid ${t.cardBorder}`, borderRadius: 18,
              padding: 16, marginBottom: 12, borderLeft: `3px solid ${a.color}`,
            }}>
              <div style={{ display: 'flex', gap: 12, marginBottom: 8 }}>
                <div style={{ width: 40, height: 40, borderRadius: 14, background: a.color + '22', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {IC && React.createElement(IC, { size: 20, color: a.color })}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ color: t.text, fontSize: 14, fontWeight: 700 }}>{a.title}</div>
                    <span style={{ color: t.textMuted, fontSize: 11 }}>{a.time}</span>
                  </div>
                  <div style={{ color: t.textSec, fontSize: 12, marginTop: 4, lineHeight: 1.5 }}>{a.desc}</div>
                </div>
              </div>
              <div onClick={() => press('action-' + a.id)}
                style={{ ...btn('action-' + a.id), display: 'flex', alignItems: 'center', gap: 6, background: a.color + '18', borderRadius: 10, padding: '8px 12px', cursor: 'pointer', width: 'fit-content' }}>
                {React.createElement(window.lucide.ArrowRight, { size: 12, color: a.color })}
                <span style={{ color: a.color, fontSize: 11, fontWeight: 600 }}>{a.action}</span>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  // ─── PROFILE SCREEN ────────────────────────────────────────────────────────
  const ProfileScreen = () => {
    const habits = [
      { id: 'commute', icon: 'Train', label: 'Commute Alerts', sub: 'Mon–Fri, 8:30am & 5:45pm' },
      { id: 'workout', icon: 'Dumbbell', label: 'Workout Windows', sub: 'Weekdays, 5–7pm' },
      { id: 'pickup', icon: 'Users', label: 'School Pickup', sub: 'Mon–Fri, 3pm' },
    ];

    return (
      <div style={{ flex: 1, overflowY: 'auto', padding: '14px 20px 20px', background: t.bg }}>
        {/* Profile header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
          <div style={{ width: 60, height: 60, borderRadius: '50%', background: `linear-gradient(135deg, ${t.primary}, ${t.accent})`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: 'white', fontSize: 24, fontWeight: 800 }}>A</span>
          </div>
          <div>
            <div style={{ color: t.text, fontSize: 18, fontWeight: 700 }}>Alex Chen</div>
            <div style={{ color: t.textSec, fontSize: 13 }}>San Francisco, CA</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 4 }}>
              {React.createElement(window.lucide.Zap, { size: 12, color: t.warning })}
              <span style={{ color: t.warning, fontSize: 11, fontWeight: 600 }}>34 accurate forecasts this week</span>
            </div>
          </div>
        </div>

        {/* Theme Toggle */}
        <div style={{ background: t.card, border: `1px solid ${t.cardBorder}`, borderRadius: 18, padding: 16, marginBottom: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: 12, background: theme === 'dark' ? '#fbbf2422' : '#0891b222', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {theme === 'dark'
                  ? React.createElement(window.lucide.Moon, { size: 18, color: '#a78bfa' })
                  : React.createElement(window.lucide.Sun, { size: 18, color: '#fbbf24' })}
              </div>
              <div>
                <div style={{ color: t.text, fontSize: 14, fontWeight: 600 }}>{theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</div>
                <div style={{ color: t.textMuted, fontSize: 12 }}>Tap to switch theme</div>
              </div>
            </div>
            <div onClick={() => { setTheme(th => th === 'dark' ? 'light' : 'dark'); press('theme'); }}
              style={{ ...btn('theme'), width: 50, height: 28, borderRadius: 14, background: theme === 'dark' ? t.primary : t.card, border: `2px solid ${t.cardBorder}`, position: 'relative', cursor: 'pointer', transition: 'background 0.3s' }}>
              <div style={{ position: 'absolute', top: 3, left: theme === 'dark' ? 24 : 3, width: 18, height: 18, borderRadius: '50%', background: theme === 'dark' ? 'white' : t.primary, transition: 'left 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)' }} />
            </div>
          </div>
        </div>

        {/* Saved Locations */}
        <div style={{ color: t.textSec, fontSize: 12, fontWeight: 600, marginBottom: 10, letterSpacing: 0.8, textTransform: 'uppercase' }}>Saved Places</div>
        <div style={{ background: t.card, border: `1px solid ${t.cardBorder}`, borderRadius: 18, marginBottom: 14, overflow: 'hidden' }}>
          {savedLocations.map((loc, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', borderBottom: i < savedLocations.length - 1 ? `1px solid ${t.cardBorder}` : 'none' }}>
              {React.createElement(window.lucide.MapPin, { size: 16, color: t.primary })}
              <span style={{ flex: 1, color: t.text, fontSize: 14, fontWeight: 500 }}>{loc}</span>
              {React.createElement(window.lucide.ChevronRight, { size: 14, color: t.textMuted })}
            </div>
          ))}
          <div onClick={() => press('addloc')} style={{ ...btn('addloc'), display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', cursor: 'pointer' }}>
            {React.createElement(window.lucide.Plus, { size: 16, color: t.primary })}
            <span style={{ color: t.primary, fontSize: 14, fontWeight: 600 }}>Add location</span>
          </div>
        </div>

        {/* Habits */}
        <div style={{ color: t.textSec, fontSize: 12, fontWeight: 600, marginBottom: 10, letterSpacing: 0.8, textTransform: 'uppercase' }}>My Habits</div>
        <div style={{ background: t.card, border: `1px solid ${t.cardBorder}`, borderRadius: 18, marginBottom: 14, overflow: 'hidden' }}>
          {habits.map(({ id, icon, label, sub }, i) => {
            const IC = window.lucide[icon];
            const on = habitToggle[id];
            return (
              <div key={id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', borderBottom: i < habits.length - 1 ? `1px solid ${t.cardBorder}` : 'none' }}>
                <div style={{ width: 36, height: 36, borderRadius: 12, background: on ? t.primaryGlow : t.surface, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {IC && React.createElement(IC, { size: 17, color: on ? t.primary : t.textMuted })}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ color: t.text, fontSize: 13, fontWeight: 600 }}>{label}</div>
                  <div style={{ color: t.textMuted, fontSize: 11 }}>{sub}</div>
                </div>
                <div onClick={() => setHabitToggle(h => ({ ...h, [id]: !h[id] }))}
                  style={{ width: 44, height: 24, borderRadius: 12, background: on ? t.primary : t.surface, border: `1.5px solid ${on ? t.primary : t.cardBorder}`, position: 'relative', cursor: 'pointer', transition: 'background 0.25s' }}>
                  <div style={{ position: 'absolute', top: 3, left: on ? 22 : 3, width: 15, height: 15, borderRadius: '50%', background: on ? 'white' : t.textMuted, transition: 'left 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)' }} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats */}
        <div style={{ color: t.textSec, fontSize: 12, fontWeight: 600, marginBottom: 10, letterSpacing: 0.8, textTransform: 'uppercase' }}>Weather Intelligence</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {[
            { label: 'Routes Taken', val: '142', icon: 'Navigation', color: t.primary },
            { label: 'Rain Avoided', val: '31×', icon: 'Umbrella', color: '#60a5fa' },
            { label: 'Dry Windows Used', val: '28', icon: 'Timer', color: t.success },
            { label: 'Accuracy', val: '94%', icon: 'Target', color: t.accent },
          ].map(({ label, val, icon, color }) => {
            const IC = window.lucide[icon];
            return (
              <div key={label} style={{ background: t.card, border: `1px solid ${t.cardBorder}`, borderRadius: 16, padding: 14 }}>
                {IC && React.createElement(IC, { size: 18, color })}
                <div style={{ color: t.text, fontSize: 22, fontWeight: 800, marginTop: 6 }}>{val}</div>
                <div style={{ color: t.textMuted, fontSize: 11 }}>{label}</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const screens = { home: HomeScreen, map: MapScreen, routes: RoutesScreen, alerts: AlertsScreen, profile: ProfileScreen };
  const ActiveScreen = screens[tab] || HomeScreen;

  return (
    <PhoneShell>
      <StatusBar />
      <ActiveScreen />
      <NavBar />
    </PhoneShell>
  );
}
