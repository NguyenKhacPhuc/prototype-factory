const { useState, useEffect, useRef } = React;

const themes = {
  dark: {
    bg: '#070D1B',
    surface: '#101826',
    card: '#18243A',
    cardAlt: '#1E2E46',
    border: 'rgba(30,80,160,0.25)',
    borderBright: 'rgba(0,200,255,0.22)',
    primary: '#00C8FF',
    primaryGlow: 'rgba(0,200,255,0.15)',
    primaryDim: 'rgba(0,200,255,0.1)',
    primary20: 'rgba(0,200,255,0.2)',
    secondary: '#9B8FFF',
    secondaryDim: 'rgba(155,143,255,0.15)',
    accent: '#FF7B54',
    accentDim: 'rgba(255,123,84,0.15)',
    success: '#00E5A0',
    successDim: 'rgba(0,229,160,0.12)',
    warning: '#FFB800',
    warningDim: 'rgba(255,184,0,0.12)',
    danger: '#FF4560',
    dangerDim: 'rgba(255,69,96,0.12)',
    text: '#EDF2FF',
    textSub: '#7A90B8',
    textMuted: '#3A4A68',
    navBg: '#080E1C',
    inputBg: 'rgba(255,255,255,0.05)',
    toggleOff: '#2A3A5A',
  },
  light: {
    bg: '#EEF3FF',
    surface: '#FFFFFF',
    card: '#FFFFFF',
    cardAlt: '#F3F7FF',
    border: 'rgba(180,200,240,0.6)',
    borderBright: 'rgba(0,124,200,0.25)',
    primary: '#007CC8',
    primaryGlow: 'rgba(0,124,200,0.12)',
    primaryDim: 'rgba(0,124,200,0.08)',
    primary20: 'rgba(0,124,200,0.15)',
    secondary: '#6B5FEF',
    secondaryDim: 'rgba(107,95,239,0.1)',
    accent: '#E85A30',
    accentDim: 'rgba(232,90,48,0.1)',
    success: '#00A870',
    successDim: 'rgba(0,168,112,0.1)',
    warning: '#CC9200',
    warningDim: 'rgba(204,146,0,0.1)',
    danger: '#CC2040',
    dangerDim: 'rgba(204,32,64,0.1)',
    text: '#0A1830',
    textSub: '#4A6080',
    textMuted: '#9AAAC8',
    navBg: '#FFFFFF',
    inputBg: 'rgba(0,0,0,0.04)',
    toggleOff: '#C8D4E8',
  }
};

function App() {
  const [themeKey, setThemeKey] = useState('dark');
  const [activeTab, setActiveTab] = useState('home');
  const t = themes[themeKey];

  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap';
    document.head.appendChild(link);
  }, []);

  const toggleTheme = () => setThemeKey(k => k === 'dark' ? 'light' : 'dark');

  // ─── Shared Mini-Components ────────────────────────────────────

  const WeatherStat = ({ emoji, value, label }) => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
      <span style={{ fontSize: 18 }}>{emoji}</span>
      <span style={{ fontSize: 13, fontWeight: 700, color: t.text }}>{value}</span>
      <span style={{ fontSize: 10, color: t.textSub }}>{label}</span>
    </div>
  );

  const Chip = ({ label, color, bg }) => (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '3px 10px', borderRadius: 20, background: bg, color: color, fontSize: 10, fontWeight: 700 }}>
      <span style={{ width: 5, height: 5, borderRadius: '50%', background: color, flexShrink: 0 }} />
      {label}
    </span>
  );

  const Toggle = ({ value, onToggle }) => (
    <div onClick={onToggle} style={{ width: 46, height: 26, borderRadius: 13, cursor: 'pointer', background: value ? t.primary : t.toggleOff, position: 'relative', transition: 'background 0.25s', flexShrink: 0 }}>
      <div style={{ position: 'absolute', top: 3, left: value ? 23 : 3, width: 20, height: 20, borderRadius: '50%', background: 'white', transition: 'left 0.25s', boxShadow: '0 1px 4px rgba(0,0,0,0.3)' }} />
    </div>
  );

  // ─── HOME SCREEN ────────────────────────────────────────────────

  const HomeScreen = () => {
    const mainGrad = themeKey === 'dark'
      ? 'linear-gradient(140deg, #0B2550 0%, #091830 55%, #0A1428 100%)'
      : 'linear-gradient(140deg, #C6DFFB 0%, #D8EBFF 55%, #BEDAEF 100%)';

    return (
      <div style={{ height: '100%', overflowY: 'auto', background: t.bg, fontFamily: "'Space Grotesk', sans-serif" }}>
        {/* Header */}
        <div style={{ padding: '14px 20px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontSize: 12, color: t.textSub, fontWeight: 500 }}>Good afternoon</div>
            <div style={{ fontSize: 21, fontWeight: 700, color: t.text, lineHeight: 1.2 }}>Midtown Manhattan</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: t.primaryDim, padding: '6px 12px', borderRadius: 20, border: `1px solid ${t.borderBright}` }}>
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: t.primary, boxShadow: `0 0 6px ${t.primary}` }} />
            <span style={{ fontSize: 11, color: t.primary, fontWeight: 700 }}>LIVE</span>
          </div>
        </div>

        {/* Main Weather Card */}
        <div style={{ margin: '14px 20px 0', padding: '20px', borderRadius: 24, background: mainGrad, border: `1px solid ${t.borderBright}`, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -40, right: -40, width: 160, height: 160, borderRadius: '50%', background: 'rgba(0,200,255,0.06)' }} />
          <div style={{ position: 'absolute', bottom: -20, left: -10, width: 100, height: 100, borderRadius: '50%', background: 'rgba(155,143,255,0.06)' }} />

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative' }}>
            <div>
              <div style={{ fontSize: 60, fontWeight: 300, color: t.text, lineHeight: 1 }}>72°</div>
              <div style={{ fontSize: 14, color: t.textSub, marginTop: 4, fontWeight: 500 }}>Partly Cloudy</div>
              <div style={{ marginTop: 12 }}>
                <Chip label="RAIN IN 14 MIN" color={t.warning} bg={t.warningDim} />
              </div>
            </div>
            <div style={{ fontSize: 68, filter: 'drop-shadow(0 4px 12px rgba(0,200,255,0.2))' }}>🌤️</div>
          </div>

          <div style={{ marginTop: 18, display: 'flex', justifyContent: 'space-between', paddingTop: 16, borderTop: `1px solid rgba(255,255,255,0.08)` }}>
            <WeatherStat emoji="💧" value="68%" label="Humidity" />
            <WeatherStat emoji="💨" value="12 mph" label="SE Wind" />
            <WeatherStat emoji="👁️" value="8 mi" label="Visibility" />
            <WeatherStat emoji="🌡️" value="74°" label="Feels Like" />
          </div>
        </div>

        {/* 30-Minute Timeline */}
        <div style={{ margin: '12px 20px 0', padding: '16px', borderRadius: 22, background: t.card, border: `1px solid ${t.border}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: t.text, letterSpacing: '0.04em' }}>NEXT 30 MINUTES</span>
            <span style={{ fontSize: 11, color: t.primary, fontWeight: 600 }}>Your route ›</span>
          </div>

          <div>
            <div style={{ height: 8, borderRadius: 4, background: `linear-gradient(to right, ${t.success} 0%, ${t.success} 25%, ${t.warning} 35%, ${t.warning} 42%, #4466FF 52%, #3355CC 75%, ${t.success} 90%, ${t.success} 100%)`, marginBottom: 6 }} />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              {['Now', '8m', '14m', '22m', '30m'].map((l, i) => (
                <span key={i} style={{ fontSize: 10, color: t.textSub }}>{l}</span>
              ))}
            </div>
          </div>

          <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', borderRadius: 12, background: t.warningDim, border: `1px solid rgba(255,184,0,0.15)` }}>
              <span style={{ fontSize: 18 }}>💨</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: t.text }}>Wind gusts near Columbus Circle</div>
                <div style={{ fontSize: 11, color: t.textSub }}>22 mph in 8 minutes · Use west exit</div>
              </div>
              <span style={{ fontSize: 12, fontWeight: 800, color: t.warning }}>8m</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', borderRadius: 12, background: 'rgba(68,102,255,0.1)', border: `1px solid rgba(68,102,255,0.2)` }}>
              <span style={{ fontSize: 18 }}>🌧️</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: t.text }}>Rain band — 72nd St corridor</div>
                <div style={{ fontSize: 11, color: t.textSub }}>Light rain, 0.2 in/hr for ~20 minutes</div>
              </div>
              <span style={{ fontSize: 12, fontWeight: 800, color: '#6688FF' }}>14m</span>
            </div>
          </div>
        </div>

        {/* Feel-like Impact Score */}
        <div style={{ margin: '12px 20px 0', padding: '14px 16px', borderRadius: 20, background: t.card, border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ position: 'relative', width: 54, height: 54, flexShrink: 0 }}>
            <svg width="54" height="54" style={{ position: 'absolute', top: 0, left: 0 }}>
              <circle cx="27" cy="27" r="22" fill="none" stroke={t.border} strokeWidth="4" />
              <circle cx="27" cy="27" r="22" fill="none" stroke={t.warning} strokeWidth="4"
                strokeDasharray={`${138.2 * 0.55} ${138.2 * 0.45}`}
                strokeLinecap="round" transform="rotate(-90 27 27)" />
            </svg>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 13, fontWeight: 800, color: t.warning }}>55</span>
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: t.text }}>Moderate Discomfort</div>
            <div style={{ fontSize: 11, color: t.textSub, marginTop: 2 }}>Wind + humidity raises feel-like impact</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 10, color: t.textSub }}>Feels Like</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: t.text }}>74°</div>
          </div>
        </div>

        {/* Departure Nudge */}
        <div style={{ margin: '12px 20px 20px', padding: '14px 16px', borderRadius: 20, background: `linear-gradient(135deg, ${t.successDim}, ${t.primaryDim})`, border: `1px solid rgba(0,229,160,0.18)` }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
            <span style={{ fontSize: 22 }}>⏰</span>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: t.success, letterSpacing: '0.06em' }}>BEST DEPARTURE WINDOW</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: t.text, marginTop: 3 }}>Leave in 3 min or wait until 3:20 PM</div>
              <div style={{ fontSize: 11, color: t.textSub, marginTop: 2 }}>Avoid rain band hitting at 2:48 PM</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ─── ROUTE SCREEN ───────────────────────────────────────────────

  const RouteScreen = () => {
    const [mode, setMode] = useState('subway');

    const routePoints = [
      { time: 'Now', stop: '34th St Herald Sq', temp: '72°', feel: '74°', cond: 'Partly Cloudy', icon: '🌤️', impact: 'low', tip: null },
      { time: '+8 min', stop: 'Columbus Circle (B/C)', temp: '72°', feel: '68°', cond: 'Gusty Wind', icon: '💨', impact: 'medium', tip: 'Exit on the west side — avoid the gust channel along 8th Ave.' },
      { time: '+14 min', stop: '72nd St (1/2/3)', temp: '69°', feel: '65°', cond: 'Light Rain', icon: '🌧️', impact: 'high', tip: 'Rain band crossing. Umbrella recommended or stay underground.' },
      { time: '+22 min', stop: '86th St (1/2/3)', temp: '67°', feel: '66°', cond: 'Rain Clearing', icon: '🌦️', impact: 'low', tip: 'Rain ending. Stay on east side of Broadway — less puddles.' },
      { time: '+34 min', stop: '89th St — Arrival', temp: '67°', feel: '66°', cond: 'Mostly Clear', icon: '⛅', impact: 'low', tip: null },
    ];

    const impactColor = { low: t.success, medium: t.warning, high: t.danger };

    return (
      <div style={{ height: '100%', overflowY: 'auto', background: t.bg, fontFamily: "'Space Grotesk', sans-serif" }}>
        <div style={{ padding: '14px 20px 0' }}>
          <div style={{ fontSize: 21, fontWeight: 700, color: t.text }}>Route Forecast</div>
          <div style={{ fontSize: 12, color: t.textSub, marginTop: 1 }}>Weather changes along your path</div>
        </div>

        {/* Route Input */}
        <div style={{ margin: '14px 20px 0', padding: '14px 16px', borderRadius: 20, background: t.card, border: `1px solid ${t.border}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: t.primary, boxShadow: `0 0 0 3px ${t.primaryDim}` }} />
              <div style={{ width: 2, height: 22, background: t.border, margin: '3px 0' }} />
              <div style={{ width: 10, height: 10, borderRadius: 2, background: t.accent, boxShadow: `0 0 0 3px ${t.accentDim}` }} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ padding: '8px 12px', borderRadius: 10, background: t.inputBg, marginBottom: 6 }}>
                <div style={{ fontSize: 10, color: t.textSub, fontWeight: 600 }}>FROM</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: t.text }}>340 Park Ave (Office)</div>
              </div>
              <div style={{ padding: '8px 12px', borderRadius: 10, background: t.inputBg }}>
                <div style={{ fontSize: 10, color: t.textSub, fontWeight: 600 }}>TO</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: t.text }}>89 W 83rd St (Home)</div>
              </div>
            </div>
          </div>
        </div>

        {/* Mode selector */}
        <div style={{ margin: '10px 20px 0', display: 'flex', gap: 8 }}>
          {[
            { id: 'subway', label: '🚇 Subway', time: '34 min' },
            { id: 'walk', label: '🚶 Walk', time: '52 min' },
            { id: 'bike', label: '🚲 Bike', time: '28 min' },
          ].map(m => (
            <div key={m.id} onClick={() => setMode(m.id)} style={{
              flex: 1, padding: '9px 0', borderRadius: 14, textAlign: 'center', cursor: 'pointer',
              background: mode === m.id ? t.primary20 : t.card,
              border: `1px solid ${mode === m.id ? t.primary : t.border}`,
            }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: mode === m.id ? t.primary : t.textSub }}>{m.label}</div>
              <div style={{ fontSize: 10, color: t.textMuted, marginTop: 1 }}>{m.time}</div>
            </div>
          ))}
        </div>

        {/* Warning banner */}
        <div style={{ margin: '10px 20px 0', padding: '10px 14px', borderRadius: 14, background: t.dangerDim, border: `1px solid rgba(255,69,96,0.2)`, display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 16 }}>⚠️</span>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: t.danger }}>Weather disruption on this route</div>
            <div style={{ fontSize: 11, color: t.textSub }}>Rain band hits 72nd–86th St in 14 min</div>
          </div>
        </div>

        {/* Route Timeline */}
        <div style={{ padding: '14px 20px 24px' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: t.textSub, letterSpacing: '0.06em', marginBottom: 12 }}>WEATHER ALONG ROUTE</div>
          {routePoints.map((p, i) => (
            <div key={i} style={{ display: 'flex', gap: 12 }}>
              {/* Spine */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 24, flexShrink: 0 }}>
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: impactColor[p.impact], border: `2px solid ${t.bg}`, boxShadow: `0 0 0 2px ${impactColor[p.impact]}55`, marginTop: 16, flexShrink: 0 }} />
                {i < routePoints.length - 1 && <div style={{ width: 2, flex: 1, minHeight: 12, background: t.border }} />}
              </div>

              {/* Card */}
              <div style={{ flex: 1, padding: '12px 14px', borderRadius: 16, background: t.card, border: `1px solid ${t.border}`, marginBottom: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 10, fontWeight: 800, color: impactColor[p.impact], letterSpacing: '0.04em' }}>{p.time}</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: t.text, marginTop: 2 }}>{p.stop}</div>
                    <div style={{ fontSize: 11, color: t.textSub, marginTop: 1 }}>{p.cond}</div>
                  </div>
                  <div style={{ textAlign: 'right', marginLeft: 8 }}>
                    <div style={{ fontSize: 28 }}>{p.icon}</div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: t.text, marginTop: 2 }}>{p.temp}</div>
                    <div style={{ fontSize: 10, color: t.textSub }}>feels {p.feel}</div>
                  </div>
                </div>
                {p.tip && (
                  <div style={{ marginTop: 8, padding: '7px 10px', borderRadius: 10, background: `${impactColor[p.impact]}12`, display: 'flex', gap: 6, alignItems: 'flex-start' }}>
                    <span style={{ fontSize: 12 }}>💡</span>
                    <span style={{ fontSize: 11, color: t.text, lineHeight: 1.5 }}>{p.tip}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ─── ALERTS SCREEN ──────────────────────────────────────────────

  const AlertsScreen = () => {
    const [filter, setFilter] = useState('all');
    const [expanded, setExpanded] = useState(null);

    const alerts = [
      {
        id: 1, urgency: 'high', icon: '🌧️', cat: 'rain', time: '14 min',
        title: 'Rain Band Approaching',
        sub: '72nd St Corridor — In 14 minutes',
        detail: 'A narrow rain band 0.4 miles wide will cross your commute route near 72nd–79th Streets. Duration: 18–22 minutes. Intensity: 0.2 in/hr. Expect wet pavement and reduced visibility.',
        action: 'Take shelter at 72nd St Station or exit 2 stops early at 59th St.',
      },
      {
        id: 2, urgency: 'medium', icon: '💨', cat: 'wind', time: '8 min',
        title: 'Wind Gust Channel',
        sub: 'Columbus Circle — In 8 minutes',
        detail: 'Building geometry at Columbus Circle creates a sustained wind acceleration zone. Gusts 22–26 mph from SE. Affects cyclists and anyone exiting the station at ground level.',
        action: 'Use the west exit (59th St side) to bypass the main gust channel.',
      },
      {
        id: 3, urgency: 'low', icon: '☀️', cat: 'clear', time: '3:20 PM',
        title: 'Clear Window Opening',
        sub: 'Your area — Starting 3:20 PM',
        detail: 'After the rain band passes, an 85-minute clear window develops. Temperature stabilizes at 67°F with light wind and low humidity. Ideal for outdoor errands.',
        action: 'Schedule outdoor tasks between 3:20 PM and 4:45 PM.',
      },
      {
        id: 4, urgency: 'medium', icon: '🌫️', cat: 'fog', time: '6:00 PM',
        title: 'Hudson River Fog',
        sub: 'West Side — After 6:00 PM',
        detail: 'River fog expected along the Hudson corridor after 6 PM as temperatures drop. Reduces visibility on Riverside Dr and the Hudson River Greenway to under 0.3 miles.',
        action: 'Complete Greenway cycling rides before 5:45 PM.',
      },
      {
        id: 5, urgency: 'resolved', icon: '🌡️', cat: 'heat', time: 'Just now',
        title: 'Heat Pocket Cleared',
        sub: 'Park Ave Tunnel — Resolved',
        detail: 'The heat pocket on Park Ave (40th–50th St) has dissipated. Feel-like temperature dropped from 82° back to 74°. Normal comfort levels restored.',
        action: 'No action needed.',
      },
    ];

    const uc = { high: t.danger, medium: t.warning, low: t.primary, resolved: t.success };
    const ub = { high: t.dangerDim, medium: t.warningDim, low: t.primaryDim, resolved: t.successDim };

    const filtered = filter === 'all' ? alerts : alerts.filter(a => a.cat === filter);

    return (
      <div style={{ height: '100%', overflowY: 'auto', background: t.bg, fontFamily: "'Space Grotesk', sans-serif" }}>
        <div style={{ padding: '14px 20px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontSize: 21, fontWeight: 700, color: t.text }}>Microalerts</div>
            <div style={{ fontSize: 12, color: t.textSub, marginTop: 1 }}>4 active · 1 resolved</div>
          </div>
          <div style={{ padding: '5px 12px', borderRadius: 12, background: t.dangerDim, border: `1px solid rgba(255,69,96,0.2)` }}>
            <span style={{ fontSize: 11, fontWeight: 800, color: t.danger }}>2 HIGH</span>
          </div>
        </div>

        {/* Filter chips */}
        <div style={{ margin: '12px 0 0', padding: '0 20px', display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
          {['all', 'rain', 'wind', 'fog', 'heat', 'clear'].map(f => (
            <div key={f} onClick={() => setFilter(f)} style={{
              padding: '5px 14px', borderRadius: 20, cursor: 'pointer', flexShrink: 0,
              background: filter === f ? t.primary : t.card,
              color: filter === f ? '#fff' : t.textSub,
              fontSize: 11, fontWeight: 600,
              border: `1px solid ${filter === f ? t.primary : t.border}`,
            }}>
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </div>
          ))}
        </div>

        {/* Alert cards */}
        <div style={{ padding: '12px 20px 24px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {filtered.map(a => (
            <div key={a.id} onClick={() => setExpanded(expanded === a.id ? null : a.id)} style={{
              borderRadius: 20, background: t.card, border: `1px solid ${t.border}`,
              overflow: 'hidden', cursor: 'pointer',
              borderLeftWidth: 3, borderLeftColor: uc[a.urgency], borderLeftStyle: 'solid',
            }}>
              <div style={{ padding: '14px 16px', display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                <div style={{ width: 42, height: 42, borderRadius: 12, background: ub[a.urgency], display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>
                  {a.icon}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: t.text, flex: 1 }}>{a.title}</div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: uc[a.urgency], marginLeft: 8, flexShrink: 0 }}>{a.time}</div>
                  </div>
                  <div style={{ fontSize: 11, color: t.textSub, marginTop: 2 }}>{a.sub}</div>
                </div>
              </div>
              {expanded === a.id && (
                <div style={{ padding: '0 16px 14px', borderTop: `1px solid ${t.border}` }}>
                  <div style={{ paddingTop: 12, fontSize: 12, color: t.textSub, lineHeight: 1.65 }}>{a.detail}</div>
                  <div style={{ marginTop: 10, padding: '8px 12px', borderRadius: 10, background: ub[a.urgency], display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                    <span style={{ fontSize: 14, flexShrink: 0 }}>💡</span>
                    <span style={{ fontSize: 11, color: t.text, fontWeight: 500, lineHeight: 1.5 }}>{a.action}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ─── SHELTERS SCREEN ────────────────────────────────────────────

  const SheltersScreen = () => {
    const [sel, setSel] = useState(null);

    const shelters = [
      { name: 'Grand Central Terminal', type: 'Transit Hub', dist: '0.3 mi', walk: '4 min', cover: '100%', emoji: '🏛️', quality: 5, note: 'Full indoor shelter with food, seating & connections to 42nd St' },
      { name: '47th St Bus Shelter', type: 'Covered Stop', dist: '0.1 mi', walk: '1 min', cover: '60%', emoji: '🚌', quality: 3, note: 'Partial rain cover, exposed to wind from 6th Ave corridor' },
      { name: 'Rockefeller Concourse', type: 'Indoor Mall', dist: '0.5 mi', walk: '7 min', cover: '100%', emoji: '🏢', quality: 5, note: 'Underground passage connects 48th–50th. Warm, dry, accessible' },
      { name: 'Bryant Park Pavilion', type: 'Park Shelter', dist: '0.4 mi', walk: '5 min', cover: '80%', emoji: '🌳', quality: 4, note: 'Covered tables and seating. Some wind exposure from the east' },
      { name: 'Penn Station Main Hall', type: 'Transit Hub', dist: '0.2 mi', walk: '3 min', cover: '100%', emoji: '🚂', quality: 4, note: 'Full indoor shelter. Can be crowded during peak commute hours' },
    ];

    const coverColor = c => c === '100%' ? t.success : c === '80%' ? t.primary : t.warning;

    const mapDotPositions = [
      { left: '32%', top: '42%', main: true },
      { left: '54%', top: '24%' }, { left: '28%', top: '62%' },
      { left: '68%', top: '38%' }, { left: '72%', top: '60%' }, { left: '45%', top: '68%' },
    ];

    return (
      <div style={{ height: '100%', overflowY: 'auto', background: t.bg, fontFamily: "'Space Grotesk', sans-serif" }}>
        <div style={{ padding: '14px 20px 0' }}>
          <div style={{ fontSize: 21, fontWeight: 700, color: t.text }}>Nearby Shelters</div>
          <div style={{ fontSize: 12, color: t.textSub, marginTop: 1 }}>
            <span style={{ color: t.danger }}>Rain in 14 min</span> · 5 covered spots
          </div>
        </div>

        {/* Simulated map */}
        <div style={{ margin: '14px 20px 0', height: 136, borderRadius: 22, background: themeKey === 'dark' ? '#0C1B30' : '#C8DFF5', border: `1px solid ${t.border}`, position: 'relative', overflow: 'hidden' }}>
          {/* Grid lines */}
          {[20, 40, 60, 80].map(p => (
            <div key={p} style={{ position: 'absolute', top: 0, bottom: 0, left: `${p}%`, width: 1, background: themeKey === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.05)' }} />
          ))}
          {[33, 66].map(p => (
            <div key={p} style={{ position: 'absolute', left: 0, right: 0, top: `${p}%`, height: 1, background: themeKey === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.05)' }} />
          ))}

          {/* Shelter dots */}
          {mapDotPositions.map((pos, i) => (
            <div key={i} style={{
              position: 'absolute', left: pos.left, top: pos.top,
              width: pos.main ? 14 : 10, height: pos.main ? 14 : 10,
              borderRadius: '50%',
              background: pos.main ? t.accent : t.success,
              border: `2px solid ${pos.main ? t.accentDim : t.bg}`,
              boxShadow: pos.main ? `0 0 0 4px ${t.accentDim}, 0 0 12px ${t.accent}55` : `0 0 6px ${t.success}88`,
              transform: 'translate(-50%, -50%)',
            }} />
          ))}
          {/* Rain overlay */}
          <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '30%', background: 'rgba(68,102,255,0.08)', borderLeft: `1px dashed rgba(68,102,255,0.3)` }}>
            <div style={{ padding: '4px 6px', fontSize: 9, color: '#7799FF', fontWeight: 600 }}>RAIN BAND</div>
          </div>
          <div style={{ position: 'absolute', bottom: 10, left: 10, padding: '3px 8px', borderRadius: 6, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}>
            <span style={{ fontSize: 10, color: 'white', fontWeight: 600 }}>Your location · 5 shelters near you</span>
          </div>
        </div>

        {/* Shelter list */}
        <div style={{ padding: '12px 20px 24px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {shelters.map((s, i) => (
            <div key={i} onClick={() => setSel(sel === i ? null : i)} style={{
              borderRadius: 18, background: sel === i ? t.cardAlt : t.card,
              border: `1px solid ${sel === i ? t.primary : t.border}`,
              padding: '14px 16px', cursor: 'pointer', transition: 'all 0.15s',
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: t.primaryDim, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>
                  {s.emoji}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: t.text }}>{s.name}</div>
                    <div style={{ fontSize: 12, color: t.textSub, flexShrink: 0, marginLeft: 8 }}>{s.dist}</div>
                  </div>
                  <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginTop: 4, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 10, color: t.primary, fontWeight: 600, background: t.primaryDim, padding: '2px 8px', borderRadius: 8 }}>{s.type}</span>
                    <span style={{ fontSize: 10, color: t.textSub }}>{s.walk} walk</span>
                    <span style={{ fontSize: 10, color: coverColor(s.cover), fontWeight: 600 }}>▲ {s.cover} cover</span>
                  </div>
                </div>
              </div>
              {sel === i && (
                <div style={{ marginTop: 10, paddingTop: 10, borderTop: `1px solid ${t.border}` }}>
                  <div style={{ fontSize: 11, color: t.textSub, lineHeight: 1.6, marginBottom: 10 }}>{s.note}</div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <div style={{ flex: 1, padding: '9px', borderRadius: 12, background: t.primary20, border: `1px solid ${t.primary}`, textAlign: 'center', fontSize: 12, fontWeight: 700, color: t.primary, cursor: 'pointer' }}>Get Directions</div>
                    <div style={{ flex: 1, padding: '9px', borderRadius: 12, background: t.card, border: `1px solid ${t.border}`, textAlign: 'center', fontSize: 12, fontWeight: 600, color: t.textSub, cursor: 'pointer' }}>Add to Route</div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ─── SETTINGS SCREEN ────────────────────────────────────────────

  const SettingsScreen = () => {
    const [notif, setNotif] = useState(true);
    const [gps, setGps] = useState(true);
    const [haptic, setHaptic] = useState(false);
    const [unit, setUnit] = useState('imperial');
    const [sens, setSens] = useState('medium');

    const SettingRow = ({ emoji, label, sub, right }) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '13px 0', borderBottom: `1px solid ${t.border}` }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: t.primaryDim, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17, flexShrink: 0 }}>
          {emoji}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: t.text }}>{label}</div>
          {sub && <div style={{ fontSize: 11, color: t.textSub, marginTop: 1 }}>{sub}</div>}
        </div>
        {right}
      </div>
    );

    const Section = ({ title, children }) => (
      <div style={{ margin: '12px 20px 0', padding: '2px 16px 4px', borderRadius: 20, background: t.card, border: `1px solid ${t.border}` }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: t.textSub, letterSpacing: '0.07em', paddingTop: 12, paddingBottom: 2 }}>{title}</div>
        {children}
      </div>
    );

    return (
      <div style={{ height: '100%', overflowY: 'auto', background: t.bg, fontFamily: "'Space Grotesk', sans-serif" }}>
        <div style={{ padding: '14px 20px 0' }}>
          <div style={{ fontSize: 21, fontWeight: 700, color: t.text }}>Settings</div>
        </div>

        {/* Profile */}
        <div style={{ margin: '14px 20px 0', padding: '16px', borderRadius: 20, background: `linear-gradient(135deg, ${t.primary20}, ${t.secondaryDim})`, border: `1px solid ${t.borderBright}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 50, height: 50, borderRadius: '50%', background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>👤</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: t.text }}>Steve</div>
              <div style={{ fontSize: 11, color: t.textSub }}>Midtown, New York · Pro Plan</div>
            </div>
            <div style={{ padding: '5px 12px', borderRadius: 10, background: t.primary, fontSize: 11, fontWeight: 800, color: themeKey === 'dark' ? '#070D1B' : '#fff' }}>PRO</div>
          </div>
        </div>

        {/* Appearance */}
        <Section title="APPEARANCE">
          <SettingRow
            emoji={themeKey === 'dark' ? '🌙' : '☀️'}
            label="Theme"
            sub={themeKey === 'dark' ? 'Dark mode' : 'Light mode'}
            right={<Toggle value={themeKey === 'dark'} onToggle={toggleTheme} />}
          />
        </Section>

        {/* Notifications */}
        <Section title="NOTIFICATIONS & LOCATION">
          <SettingRow emoji="🔔" label="Push Alerts" sub="Microalert notifications" right={<Toggle value={notif} onToggle={() => setNotif(!notif)} />} />
          <SettingRow emoji="📍" label="Auto-detect Location" sub="Continuous GPS for live data" right={<Toggle value={gps} onToggle={() => setGps(!gps)} />} />
          <SettingRow emoji="📳" label="Haptic Feedback" sub="Vibrate on urgent alerts" right={<Toggle value={haptic} onToggle={() => setHaptic(!haptic)} />} />
        </Section>

        {/* Alert Sensitivity */}
        <div style={{ margin: '12px 20px 0', padding: '14px 16px', borderRadius: 20, background: t.card, border: `1px solid ${t.border}` }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: t.textSub, letterSpacing: '0.07em', marginBottom: 12 }}>ALERT SENSITIVITY</div>
          <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
            {['low', 'medium', 'high'].map(s => (
              <div key={s} onClick={() => setSens(s)} style={{
                flex: 1, padding: '10px 0', borderRadius: 12, textAlign: 'center', cursor: 'pointer',
                background: sens === s ? t.primary20 : t.inputBg,
                border: `1px solid ${sens === s ? t.primary : t.border}`,
              }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: sens === s ? t.primary : t.textSub }}>
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </div>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 11, color: t.textSub }}>
            {sens === 'low' ? 'Critical alerts only (severe disruptions)' : sens === 'medium' ? 'Moderate and severe weather events' : 'All changes within 0.5 mi of your route'}
          </div>
        </div>

        {/* Units */}
        <div style={{ margin: '12px 20px 0', padding: '14px 16px', borderRadius: 20, background: t.card, border: `1px solid ${t.border}` }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: t.textSub, letterSpacing: '0.07em', marginBottom: 12 }}>MEASUREMENT UNITS</div>
          <div style={{ display: 'flex', gap: 8 }}>
            {[{ id: 'imperial', l: '°F / mph / in' }, { id: 'metric', l: '°C / km/h / mm' }].map(u => (
              <div key={u.id} onClick={() => setUnit(u.id)} style={{
                flex: 1, padding: '10px 0', borderRadius: 12, textAlign: 'center', cursor: 'pointer',
                background: unit === u.id ? t.primary20 : t.inputBg,
                border: `1px solid ${unit === u.id ? t.primary : t.border}`,
              }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: unit === u.id ? t.primary : t.textSub }}>{u.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Data sources */}
        <div style={{ margin: '12px 20px 0', padding: '14px 16px', borderRadius: 20, background: t.card, border: `1px solid ${t.border}` }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: t.textSub, letterSpacing: '0.07em', marginBottom: 10 }}>DATA SOURCES</div>
          {[
            { icon: '🛰️', label: 'NEXRAD Radar', status: 'Active', ok: true },
            { icon: '📡', label: 'Street Sensors (NYC)', status: '247 nodes', ok: true },
            { icon: '🌐', label: 'NWS API', status: 'Active', ok: true },
            { icon: '🗺️', label: 'Topography Model', status: 'v3.2', ok: true },
          ].map((src, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 0', borderBottom: i < 3 ? `1px solid ${t.border}` : 'none' }}>
              <span style={{ fontSize: 16 }}>{src.icon}</span>
              <span style={{ flex: 1, fontSize: 12, fontWeight: 500, color: t.text }}>{src.label}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: src.ok ? t.success : t.danger }} />
                <span style={{ fontSize: 11, color: t.textSub }}>{src.status}</span>
              </div>
            </div>
          ))}
        </div>

        <div style={{ padding: '16px 20px 32px', textAlign: 'center' }}>
          <div style={{ fontSize: 11, color: t.textMuted }}>MicroShift v1.0.0 · © 2026 · Hyperlocal Weather Intelligence</div>
        </div>
      </div>
    );
  };

  // ─── Navigation ──────────────────────────────────────────────────

  const tabs = [
    { id: 'home', label: 'Home', icon: window.lucide.Home },
    { id: 'route', label: 'Route', icon: window.lucide.Navigation },
    { id: 'alerts', label: 'Alerts', icon: window.lucide.Bell },
    { id: 'shelters', label: 'Shelters', icon: window.lucide.MapPin },
    { id: 'settings', label: 'Settings', icon: window.lucide.Settings },
  ];

  const screens = {
    home: HomeScreen,
    route: RouteScreen,
    alerts: AlertsScreen,
    shelters: SheltersScreen,
    settings: SettingsScreen,
  };

  const ActiveScreen = screens[activeTab];

  const WifiIcon = window.lucide.Wifi;
  const BatteryIcon = window.lucide.Battery;
  const SignalIcon = window.lucide.Signal;

  return (
    <div style={{ background: '#dde3ee', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Space Grotesk', sans-serif", padding: '30px 0' }}>
      <div style={{
        width: 375,
        height: 812,
        background: t.bg,
        borderRadius: 52,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 40px 100px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.08), inset 0 0 0 1px rgba(255,255,255,0.03)',
      }}>
        {/* Dynamic Island */}
        <div style={{ position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)', width: 122, height: 34, background: '#000', borderRadius: 21, zIndex: 100 }} />

        {/* Status Bar */}
        <div style={{ height: 52, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '0 26px 10px', flexShrink: 0 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: t.text }}>9:41</span>
          <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
            <SignalIcon size={14} color={t.textSub} />
            <WifiIcon size={14} color={t.textSub} />
            <BatteryIcon size={16} color={t.textSub} />
          </div>
        </div>

        {/* Screen Content */}
        <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
          <ActiveScreen />
        </div>

        {/* Bottom Navigation */}
        <div style={{ height: 78, background: t.navBg, borderTop: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-around', padding: '0 6px 8px', flexShrink: 0 }}>
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <div
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
                  cursor: 'pointer', padding: '8px 10px', borderRadius: 14,
                  background: isActive ? t.primaryDim : 'transparent',
                  minWidth: 52, transition: 'all 0.15s',
                }}
              >
                <Icon size={20} color={isActive ? t.primary : t.textSub} />
                <span style={{ fontSize: 10, fontWeight: isActive ? 700 : 500, color: isActive ? t.primary : t.textSub }}>
                  {tab.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
