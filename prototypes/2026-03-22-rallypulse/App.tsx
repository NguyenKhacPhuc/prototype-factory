const { useState, useEffect, useRef } = React;

const THEMES = {
  light: {
    bg: '#F0F2FA', surface: '#FFFFFF', surfaceAlt: '#F5F6FB', surfaceLow: '#ECEEF8',
    text: '#0F1022', textSub: '#64687D', textMuted: '#9498B0',
    primary: '#FF6B35', primarySoft: 'rgba(255,107,53,0.10)',
    primaryGrad: 'linear-gradient(135deg, #FF6B35 0%, #FF9A3C 100%)',
    border: '#E2E4F0', success: '#10B981', successSoft: 'rgba(16,185,129,0.10)',
    warning: '#F59E0B', warningSoft: 'rgba(245,158,11,0.10)',
    purple: '#8B5CF6', purpleSoft: 'rgba(139,92,246,0.10)',
    blue: '#3B82F6', blueSoft: 'rgba(59,130,246,0.10)',
    navBg: '#FFFFFF', shadow: '0 4px 24px rgba(15,16,34,0.08)',
    cardShadow: '0 2px 12px rgba(15,16,34,0.06)',
  },
  dark: {
    bg: '#0C0D14', surface: '#14151F', surfaceAlt: '#1C1D28', surfaceLow: '#10111A',
    text: '#E8EAFF', textSub: '#858AA8', textMuted: '#52566C',
    primary: '#FF7A47', primarySoft: 'rgba(255,122,71,0.15)',
    primaryGrad: 'linear-gradient(135deg, #FF7A47 0%, #FFB070 100%)',
    border: '#22233A', success: '#34D399', successSoft: 'rgba(52,211,153,0.12)',
    warning: '#FBBF24', warningSoft: 'rgba(251,191,36,0.12)',
    purple: '#A78BFA', purpleSoft: 'rgba(167,139,250,0.12)',
    blue: '#60A5FA', blueSoft: 'rgba(96,165,250,0.12)',
    navBg: '#14151F', shadow: '0 4px 24px rgba(0,0,0,0.50)',
    cardShadow: '0 2px 12px rgba(0,0,0,0.40)',
  },
};

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isDark, setIsDark] = useState(false);
  const [timeWindow, setTimeWindow] = useState('60');
  const [skillLevel, setSkillLevel] = useState('intermediate');

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  const t = isDark ? THEMES.dark : THEMES.light;
  const ff = { fontFamily: "'Plus Jakarta Sans', sans-serif" };

  const StatusBar = () => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 22px 2px', ...ff }}>
      <span style={{ fontSize: 13, fontWeight: 700, color: t.text }}>9:41</span>
      <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
        {React.createElement(window.lucide.Wifi, { size: 14, color: t.text })}
        {React.createElement(window.lucide.Battery, { size: 16, color: t.text })}
      </div>
    </div>
  );

  const HomeScreen = () => {
    const [pressed, setPressed] = useState(null);
    const [joined, setJoined] = useState(false);
    const nearby = [
      { id: 2, emoji: '🎾', name: 'Eastside Tennis Club', type: 'Tennis', dist: '0.9 mi', eta: '15 min', players: '2/4', openness: 60, confidence: 78, time: 'Now–7:45 PM', cond: t.warning, condSoft: t.warningSoft },
      { id: 3, emoji: '⚽', name: 'Millbrook Field B', type: 'Soccer', dist: '1.2 mi', eta: '18 min', players: '10/22', openness: 45, confidence: 65, time: '6:30–8:00 PM', cond: t.primary, condSoft: t.primarySoft },
    ];
    return (
      <div style={{ flex: 1, overflowY: 'auto', ...ff }}>
        <div style={{ padding: '6px 20px 14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ fontSize: 13, color: t.textSub, margin: 0, fontWeight: 500 }}>Good evening</p>
              <h1 style={{ fontSize: 22, fontWeight: 800, color: t.text, margin: '2px 0 0', letterSpacing: -0.5 }}>Hi, Marcus 👋</h1>
            </div>
            <div style={{ width: 42, height: 42, borderRadius: 21, background: t.primaryGrad, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: 17, boxShadow: '0 4px 12px rgba(255,107,53,0.35)' }}>M</div>
          </div>
          <div style={{ marginTop: 16 }}>
            <p style={{ fontSize: 11, color: t.textSub, margin: '0 0 8px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.6 }}>I have available</p>
            <div style={{ display: 'flex', gap: 8 }}>
              {[['30', '30m'], ['60', '1 hr'], ['90', '90m'], ['120', '2h+']].map(([val, label]) => (
                <button key={val} onClick={() => setTimeWindow(val)} style={{ flex: 1, padding: '9px 4px', borderRadius: 12, border: 'none', cursor: 'pointer', background: timeWindow === val ? t.primary : t.surfaceAlt, color: timeWindow === val ? '#fff' : t.textSub, fontWeight: 700, fontSize: 12, fontFamily: "'Plus Jakarta Sans', sans-serif", transition: 'all 0.15s', boxShadow: timeWindow === val ? '0 4px 12px rgba(255,107,53,0.30)' : 'none' }}>
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div style={{ padding: '0 20px' }}>
          <div style={{ background: t.primaryGrad, borderRadius: 22, padding: '20px', boxShadow: '0 10px 36px rgba(255,107,53,0.38)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: -30, right: -20, width: 110, height: 110, background: 'rgba(255,255,255,0.10)', borderRadius: 55 }} />
            <div style={{ position: 'absolute', bottom: -25, right: 50, width: 75, height: 75, background: 'rgba(255,255,255,0.07)', borderRadius: 40 }} />
            <div style={{ position: 'relative' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                <div>
                  <span style={{ background: 'rgba(255,255,255,0.25)', color: '#fff', fontSize: 10, fontWeight: 800, padding: '3px 9px', borderRadius: 20, letterSpacing: 0.5 }}>⚡ BEST MATCH NOW</span>
                  <h2 style={{ fontSize: 19, fontWeight: 800, color: '#fff', margin: '8px 0 3px', letterSpacing: -0.3 }}>🏀 Riverside Park Courts</h2>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)', margin: 0 }}>Basketball · 0.4 mi · 8 min away</p>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.20)', borderRadius: 14, padding: '8px 12px', textAlign: 'center', flexShrink: 0 }}>
                  <div style={{ fontSize: 22, fontWeight: 800, color: '#fff', lineHeight: 1 }}>92%</div>
                  <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.80)', fontWeight: 700, marginTop: 2 }}>MATCH</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
                {[['PLAYERS', '6/10'], ['WINDOW', 'Until 8:30'], ['WEATHER', '☀️ 72°F']].map(([lbl, val]) => (
                  <div key={lbl} style={{ flex: 1, background: 'rgba(255,255,255,0.15)', borderRadius: 12, padding: '9px 10px' }}>
                    <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.75)', fontWeight: 700, marginBottom: 2 }}>{lbl}</div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>{val}</div>
                  </div>
                ))}
              </div>
              <button onClick={() => setJoined(!joined)} style={{ width: '100%', padding: '13px', background: joined ? 'rgba(255,255,255,0.30)' : 'rgba(255,255,255,0.95)', border: 'none', borderRadius: 13, color: joined ? '#fff' : '#FF6B35', fontWeight: 800, fontSize: 14, cursor: 'pointer', fontFamily: "'Plus Jakarta Sans', sans-serif", transition: 'all 0.2s' }}>
                {joined ? '✅ You\'re In! Tap to Leave' : 'Join This Game →'}
              </button>
            </div>
          </div>
        </div>

        <div style={{ padding: '18px 20px 0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <h3 style={{ fontSize: 15, fontWeight: 800, color: t.text, margin: 0 }}>Nearby Now</h3>
            <span style={{ fontSize: 12, color: t.primary, fontWeight: 700, cursor: 'pointer' }}>See all</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {nearby.map(op => (
              <div key={op.id} onMouseDown={() => setPressed(op.id)} onMouseUp={() => setPressed(null)} onMouseLeave={() => setPressed(null)} style={{ background: t.surface, borderRadius: 18, padding: '14px 16px', boxShadow: t.cardShadow, border: `1px solid ${t.border}`, transform: pressed === op.id ? 'scale(0.97)' : 'scale(1)', transition: 'all 0.15s', cursor: 'pointer' }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <div style={{ width: 46, height: 46, borderRadius: 13, background: t.primarySoft, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>{op.emoji}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: t.text }}>{op.name}</div>
                      <div style={{ background: op.confidence > 75 ? t.successSoft : t.warningSoft, color: op.confidence > 75 ? t.success : t.warning, fontSize: 11, fontWeight: 800, padding: '3px 7px', borderRadius: 8, flexShrink: 0, marginLeft: 6 }}>{op.confidence}%</div>
                    </div>
                    <div style={{ fontSize: 12, color: t.textSub, marginTop: 2 }}>{op.type} · {op.dist} · {op.eta} · {op.players} players</div>
                    <div style={{ marginTop: 9 }}>
                      <div style={{ height: 5, background: t.surfaceAlt, borderRadius: 3, overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${op.openness}%`, background: op.openness > 70 ? t.success : op.openness > 45 ? t.warning : t.primary, borderRadius: 3 }} />
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                        <span style={{ fontSize: 10, color: t.textMuted, fontWeight: 600 }}>Openness</span>
                        <span style={{ fontSize: 10, color: t.textMuted, fontWeight: 600 }}>{op.openness}% · {op.time}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ padding: '16px 20px 24px' }}>
          <div style={{ background: t.surface, borderRadius: 18, padding: '16px', border: `1px solid ${t.border}`, boxShadow: t.cardShadow }}>
            <h4 style={{ fontSize: 11, fontWeight: 800, color: t.textSub, margin: '0 0 14px', textTransform: 'uppercase', letterSpacing: 0.6 }}>Today's Conditions</h4>
            <div style={{ display: 'flex', gap: 10 }}>
              {[[window.lucide.Sun, 'Weather', '72°F Clear', t.warning], [window.lucide.Wind, 'Wind', '8 mph NW', t.blue], [window.lucide.Clock, 'Daylight', '3h 20m left', t.primary]].map(([Icon, label, val, color], i) => (
                <div key={i} style={{ flex: 1, textAlign: 'center' }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: `${color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 6px' }}>
                    {React.createElement(Icon, { size: 17, color })}
                  </div>
                  <div style={{ fontSize: 10, color: t.textMuted, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.3 }}>{label}</div>
                  <div style={{ fontSize: 11, color: t.text, fontWeight: 700, marginTop: 3 }}>{val}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const DiscoverScreen = () => {
    const [sport, setSport] = useState('all');
    const sports = [['all', '🏟️', 'All'], ['basketball', '🏀', 'Basketball'], ['tennis', '🎾', 'Tennis'], ['soccer', '⚽', 'Soccer'], ['volleyball', '🏐', 'Volleyball']];
    const venues = [
      { id: 1, emoji: '🏀', type: 'basketball', name: 'Riverside Park Courts', addr: '220 River Blvd', dist: '0.4 mi', players: 6, max: 10, openCourts: 2, totalCourts: 3, activity: 'High', level: 85, cond: 'Excellent', open: 'Now', checkins: 12 },
      { id: 2, emoji: '🎾', type: 'tennis', name: 'Eastside Tennis Club', addr: '45 Pine Ave', dist: '0.9 mi', players: 2, max: 4, openCourts: 4, totalCourts: 6, activity: 'Moderate', level: 55, cond: 'Good', open: 'Now', checkins: 5 },
      { id: 3, emoji: '⚽', type: 'soccer', name: 'Millbrook Field B', addr: 'Millbrook Park', dist: '1.2 mi', players: 10, max: 22, openCourts: 1, totalCourts: 2, activity: 'Moderate', level: 62, cond: 'Slightly damp', open: '6:30 PM', checkins: 8 },
      { id: 4, emoji: '🏐', type: 'volleyball', name: 'Marina Beach Courts', addr: 'Waterfront Dr', dist: '1.8 mi', players: 4, max: 12, openCourts: 3, totalCourts: 4, activity: 'Low', level: 30, cond: 'Sandy, dry', open: 'Now', checkins: 3 },
      { id: 5, emoji: '🏀', type: 'basketball', name: 'Lincoln Comm. Center', addr: '100 Lincoln Ave', dist: '2.1 mi', players: 9, max: 10, openCourts: 1, totalCourts: 1, activity: 'High', level: 90, cond: 'Indoor — Perfect', open: 'Tomorrow 9 AM', checkins: 15 },
    ];
    const filtered = sport === 'all' ? venues : venues.filter(v => v.type === sport);
    return (
      <div style={{ flex: 1, overflowY: 'auto', ...ff }}>
        <div style={{ padding: '6px 20px 12px' }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: t.text, margin: 0, letterSpacing: -0.3 }}>Discover</h2>
          <p style={{ fontSize: 13, color: t.textSub, margin: '2px 0 0', fontWeight: 500 }}>Find courts & fields near you</p>
        </div>
        <div style={{ padding: '0 20px 14px' }}>
          <div style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 14, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 8, boxShadow: t.cardShadow }}>
            {React.createElement(window.lucide.Search, { size: 16, color: t.textSub })}
            <span style={{ fontSize: 14, color: t.textMuted }}>Search locations...</span>
          </div>
        </div>
        <div style={{ paddingLeft: 20, paddingBottom: 16, display: 'flex', gap: 8, overflowX: 'auto', scrollbarWidth: 'none' }}>
          {sports.map(([id, emoji, label]) => (
            <button key={id} onClick={() => setSport(id)} style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '7px 14px', borderRadius: 20, border: sport === id ? 'none' : `1px solid ${t.border}`, cursor: 'pointer', whiteSpace: 'nowrap', background: sport === id ? t.primary : t.surface, color: sport === id ? '#fff' : t.textSub, fontWeight: 700, fontSize: 13, boxShadow: sport === id ? '0 4px 14px rgba(255,107,53,0.30)' : t.cardShadow, fontFamily: "'Plus Jakarta Sans', sans-serif", transition: 'all 0.15s', flexShrink: 0 }}>
              <span>{emoji}</span><span>{label}</span>
            </button>
          ))}
          <div style={{ minWidth: 4 }} />
        </div>
        <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 12, paddingBottom: 24 }}>
          {filtered.map(v => (
            <div key={v.id} style={{ background: t.surface, borderRadius: 20, border: `1px solid ${t.border}`, boxShadow: t.cardShadow, overflow: 'hidden', cursor: 'pointer' }}>
              <div style={{ padding: '16px 16px 12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                  <div style={{ display: 'flex', gap: 12 }}>
                    <div style={{ width: 48, height: 48, borderRadius: 14, background: t.primarySoft, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0 }}>{v.emoji}</div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 800, color: t.text }}>{v.name}</div>
                      <div style={{ fontSize: 12, color: t.textSub, marginTop: 2 }}>{v.addr} · {v.dist}</div>
                    </div>
                  </div>
                  <div style={{ background: v.open === 'Now' ? t.successSoft : t.warningSoft, color: v.open === 'Now' ? t.success : t.warning, fontSize: 11, fontWeight: 800, padding: '4px 8px', borderRadius: 9, flexShrink: 0 }}>
                    {v.open === 'Now' ? '● Open' : `↻ ${v.open}`}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  {[['PLAYERS', `${v.players}/${v.max}`], ['OPEN', `${v.openCourts}/${v.totalCourts} courts`], ['SURFACE', v.cond]].map(([lbl, val]) => (
                    <div key={lbl} style={{ flex: 1, background: t.surfaceAlt, borderRadius: 10, padding: '8px 9px' }}>
                      <div style={{ fontSize: 10, color: t.textMuted, fontWeight: 700 }}>{lbl}</div>
                      <div style={{ fontSize: 12, color: t.text, fontWeight: 700, marginTop: 2 }}>{val}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ padding: '10px 16px', borderTop: `1px solid ${t.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                  <div style={{ display: 'flex', gap: 3 }}>
                    {[1,2,3,4,5].map(dot => (
                      <div key={dot} style={{ width: 7, height: 7, borderRadius: 4, background: dot <= Math.ceil(v.level / 20) ? (v.level > 70 ? t.success : v.level > 45 ? t.warning : t.textMuted) : t.surfaceAlt }} />
                    ))}
                  </div>
                  <span style={{ fontSize: 12, color: t.textSub, fontWeight: 600 }}>{v.activity}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: t.textSub }}>
                  {React.createElement(window.lucide.Users, { size: 12, color: t.textSub })}
                  <span style={{ fontSize: 12, fontWeight: 600, color: t.textSub }}>{v.checkins} check-ins</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const AlertsScreen = () => {
    const [checkedIn, setCheckedIn] = useState(false);
    const [dismissed, setDismissed] = useState([]);
    const alerts = [
      { id: 1, emoji: '🔥', title: 'Game Forming Now', desc: 'Basketball at Riverside Park — 6 players ready, needs 4 more. Starting in ~15 min.', time: 'Just now', action: 'Join Game', color: t.primary, soft: t.primarySoft },
      { id: 2, emoji: '🎾', title: 'Court Just Cleared', desc: 'Tennis Court 3 at Eastside Club is now free. Typically stays open 45+ min on weekdays.', time: '3 min ago', action: 'Directions', color: t.success, soft: t.successSoft },
      { id: 3, emoji: '⏰', title: 'Predicted Opening', desc: 'Soccer field at Millbrook Park typically clears at 6:30 PM on weekday evenings.', time: '12 min ago', action: 'Set Reminder', color: t.purple, soft: t.purpleSoft },
      { id: 4, emoji: '☀️', title: 'Weather Window', desc: 'Rain clearing by 5:45 PM — 2 hour dry window near Lincoln Park courts.', time: '18 min ago', action: 'View Courts', color: t.warning, soft: t.warningSoft },
      { id: 5, emoji: '🎯', title: 'Skill Match Found', desc: 'A 3-on-3 basketball run at your level is forming 0.7 mi away on Oak Ave Courts.', time: '31 min ago', action: 'View Game', color: t.blue, soft: t.blueSoft },
    ];
    const visible = alerts.filter(a => !dismissed.includes(a.id));
    return (
      <div style={{ flex: 1, overflowY: 'auto', ...ff }}>
        <div style={{ padding: '6px 20px 14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h2 style={{ fontSize: 22, fontWeight: 800, color: t.text, margin: 0, letterSpacing: -0.3 }}>Alerts</h2>
              <p style={{ fontSize: 13, color: t.textSub, margin: '2px 0 0', fontWeight: 500 }}>Live opportunity feed</p>
            </div>
            <div style={{ background: t.primary, borderRadius: 20, padding: '4px 10px', color: '#fff', fontSize: 12, fontWeight: 800 }}>{visible.length} new</div>
          </div>
        </div>

        <div style={{ padding: '0 20px 14px' }}>
          <div style={{ background: checkedIn ? t.successSoft : t.primarySoft, border: `1.5px solid ${checkedIn ? t.success + '60' : t.primary + '50'}`, borderRadius: 18, padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 22 }}>{checkedIn ? '✅' : '📍'}</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 800, color: t.text }}>{checkedIn ? "You're checked in!" : 'Check in here'}</div>
                <div style={{ fontSize: 11, color: t.textSub, marginTop: 1 }}>Riverside Park Courts · 6 active players</div>
              </div>
            </div>
            <button onClick={() => setCheckedIn(!checkedIn)} style={{ background: checkedIn ? t.success : t.primary, color: '#fff', border: 'none', borderRadius: 11, padding: '9px 14px', fontSize: 12, fontWeight: 800, cursor: 'pointer', fontFamily: "'Plus Jakarta Sans', sans-serif", transition: 'all 0.2s' }}>
              {checkedIn ? 'Leave' : 'Check In'}
            </button>
          </div>
        </div>

        <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 10, paddingBottom: 24 }}>
          {visible.map(alert => (
            <div key={alert.id} style={{ background: t.surface, borderRadius: 18, border: `1px solid ${t.border}`, boxShadow: t.cardShadow, overflow: 'hidden', display: 'flex' }}>
              <div style={{ width: 4, background: alert.color, flexShrink: 0 }} />
              <div style={{ flex: 1, padding: '14px 14px 14px 13px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 5 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                    <span style={{ fontSize: 18 }}>{alert.emoji}</span>
                    <span style={{ fontSize: 14, fontWeight: 800, color: t.text }}>{alert.title}</span>
                  </div>
                  <button onClick={() => setDismissed([...dismissed, alert.id])} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 2, color: t.textMuted, marginLeft: 4 }}>
                    {React.createElement(window.lucide.X, { size: 14, color: t.textMuted })}
                  </button>
                </div>
                <p style={{ fontSize: 12, color: t.textSub, margin: '0 0 10px', lineHeight: 1.55 }}>{alert.desc}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <button style={{ background: alert.soft, color: alert.color, border: 'none', borderRadius: 9, padding: '7px 13px', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    {alert.action}
                  </button>
                  <span style={{ fontSize: 11, color: t.textMuted, fontWeight: 500 }}>{alert.time}</span>
                </div>
              </div>
            </div>
          ))}
          {visible.length === 0 && (
            <div style={{ textAlign: 'center', padding: '40px 20px' }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>🎉</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: t.text }}>You're all caught up!</div>
              <div style={{ fontSize: 13, color: t.textSub, marginTop: 4 }}>New opportunities will appear here.</div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const ProfileScreen = () => {
    const stats = [
      [window.lucide.Zap, 'Games Joined', '47'],
      [window.lucide.MapPin, 'Courts Visited', '18'],
      [window.lucide.CheckCircle, 'Check-ins', '112'],
      [window.lucide.Calendar, 'This Month', '8'],
    ];
    const mySports = [['🏀 Basketball', 'Intermediate'], ['🎾 Tennis', 'Beginner'], ['⚽ Soccer', 'Advanced']];
    const settings = [
      [window.lucide.Bell, 'Smart Alerts', 'On', null],
      [window.lucide.MapPin, 'Location Radius', '2 mi', null],
      [window.lucide.Clock, 'Default Window', '60 min', null],
      [isDark ? window.lucide.Sun : window.lucide.Moon, 'Dark Mode', isDark ? 'On' : 'Off', () => setIsDark(!isDark)],
    ];
    return (
      <div style={{ flex: 1, overflowY: 'auto', ...ff }}>
        <div style={{ padding: '6px 20px 20px', background: t.surface, borderBottom: `1px solid ${t.border}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: t.text, margin: 0 }}>Profile</h2>
            <button onClick={() => setIsDark(!isDark)} style={{ width: 40, height: 40, borderRadius: 13, background: t.surfaceAlt, border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              {React.createElement(isDark ? window.lucide.Sun : window.lucide.Moon, { size: 18, color: t.primary })}
            </button>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 70, height: 70, borderRadius: 35, background: t.primaryGrad, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 30, color: '#fff', fontWeight: 800, boxShadow: '0 6px 20px rgba(255,107,53,0.38)', flexShrink: 0 }}>M</div>
            <div>
              <div style={{ fontSize: 20, fontWeight: 800, color: t.text }}>Marcus Chen</div>
              <div style={{ fontSize: 12, color: t.textSub, marginTop: 2 }}>marcus@email.com · San Francisco</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8 }}>
                <span style={{ background: t.primarySoft, color: t.primary, fontSize: 11, fontWeight: 700, padding: '3px 9px', borderRadius: 20 }}>🏀 Intermediate</span>
                <span style={{ background: t.successSoft, color: t.success, fontSize: 11, fontWeight: 700, padding: '3px 9px', borderRadius: 20 }}>⭐ 4.8</span>
              </div>
            </div>
          </div>
        </div>

        <div style={{ padding: '16px 20px 0' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {stats.map(([Icon, label, val], i) => (
              <div key={i} style={{ background: t.surface, borderRadius: 16, padding: '14px', border: `1px solid ${t.border}`, boxShadow: t.cardShadow }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                  {React.createElement(Icon, { size: 15, color: t.primary })}
                  <span style={{ fontSize: 10, color: t.textSub, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.4 }}>{label}</span>
                </div>
                <div style={{ fontSize: 28, fontWeight: 800, color: t.text }}>{val}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ padding: '16px 20px 0' }}>
          <h4 style={{ fontSize: 11, color: t.textSub, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.6, margin: '0 0 10px' }}>My Sports</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {mySports.map(([sport, level], i) => (
              <div key={i} style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 14, padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: t.cardShadow }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: t.text }}>{sport}</span>
                <span style={{ background: t.primarySoft, color: t.primary, fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 20 }}>{level}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ padding: '16px 20px 0' }}>
          <h4 style={{ fontSize: 11, color: t.textSub, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.6, margin: '0 0 10px' }}>Skill Level</h4>
          <div style={{ display: 'flex', gap: 8 }}>
            {['beginner', 'intermediate', 'advanced'].map(level => (
              <button key={level} onClick={() => setSkillLevel(level)} style={{ flex: 1, padding: '10px 6px', borderRadius: 12, border: skillLevel === level ? 'none' : `1px solid ${t.border}`, cursor: 'pointer', background: skillLevel === level ? t.primary : t.surface, color: skillLevel === level ? '#fff' : t.textSub, fontWeight: 700, fontSize: 11, fontFamily: "'Plus Jakarta Sans', sans-serif", textTransform: 'capitalize', transition: 'all 0.15s', boxShadow: skillLevel === level ? '0 4px 12px rgba(255,107,53,0.30)' : 'none' }}>
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div style={{ padding: '16px 20px 30px' }}>
          <h4 style={{ fontSize: 11, color: t.textSub, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.6, margin: '0 0 10px' }}>Settings</h4>
          <div style={{ background: t.surface, borderRadius: 18, border: `1px solid ${t.border}`, overflow: 'hidden', boxShadow: t.cardShadow }}>
            {settings.map(([Icon, label, val, action], i) => (
              <div key={i} onClick={action || undefined} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '13px 16px', borderBottom: i < settings.length - 1 ? `1px solid ${t.border}` : 'none', cursor: action ? 'pointer' : 'default' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 9, background: t.primarySoft, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {React.createElement(Icon, { size: 15, color: t.primary })}
                  </div>
                  <span style={{ fontSize: 14, fontWeight: 600, color: t.text }}>{label}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <span style={{ fontSize: 13, color: t.textSub, fontWeight: 500 }}>{val}</span>
                  {React.createElement(window.lucide.ChevronRight, { size: 15, color: t.textMuted })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const tabs = [
    { id: 'home', Icon: window.lucide.Home, label: 'Home' },
    { id: 'discover', Icon: window.lucide.Compass, label: 'Discover' },
    { id: 'alerts', Icon: window.lucide.Bell, label: 'Alerts' },
    { id: 'profile', Icon: window.lucide.User, label: 'Profile' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#CBD5E1', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <div style={{ width: 375, height: 812, background: t.bg, borderRadius: 50, overflow: 'hidden', boxShadow: '0 32px 100px rgba(0,0,0,0.35), 0 0 0 10px #1E293B', display: 'flex', flexDirection: 'column', position: 'relative' }}>
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 12, background: t.bg, flexShrink: 0 }}>
          <div style={{ width: 124, height: 36, background: '#000', borderRadius: 22 }} />
        </div>
        <StatusBar />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {activeTab === 'home' && <HomeScreen />}
          {activeTab === 'discover' && <DiscoverScreen />}
          {activeTab === 'alerts' && <AlertsScreen />}
          {activeTab === 'profile' && <ProfileScreen />}
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', padding: '8px 0 22px', borderTop: `1px solid ${t.border}`, background: t.navBg, flexShrink: 0 }}>
          {tabs.map(({ id, Icon, label }) => (
            <button key={id} onClick={() => setActiveTab(id)} style={{ background: 'none', border: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, cursor: 'pointer', padding: '4px 18px', borderRadius: 14, transition: 'all 0.15s', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              {React.createElement(Icon, { size: 22, color: activeTab === id ? t.primary : t.textSub, strokeWidth: activeTab === id ? 2.5 : 1.8 })}
              <span style={{ fontSize: 11, fontWeight: activeTab === id ? 800 : 500, color: activeTab === id ? t.primary : t.textSub }}>{label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
