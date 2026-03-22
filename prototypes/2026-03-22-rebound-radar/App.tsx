const { useState, useEffect, useRef } = React;

// ─── Fonts ────────────────────────────────────────────────────────────────────
const fontStyle = document.createElement('style');
fontStyle.textContent = `@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');
* { box-sizing: border-box; margin: 0; padding: 0; }
::-webkit-scrollbar { display: none; }
`;
document.head.appendChild(fontStyle);

// ─── Themes ──────────────────────────────────────────────────────────────────
const themes = {
  light: {
    bg: '#FFF7F0',
    surface: '#FFFFFF',
    surfaceAlt: '#FFF2E8',
    surfaceElevated: '#FFFFFF',
    text: '#1A0F00',
    textSecondary: '#6B4226',
    textMuted: '#B07050',
    primary: '#FF5C1A',
    primaryDark: '#E04400',
    primaryLight: '#FFE8DC',
    primaryGrad: 'linear-gradient(135deg, #FF5C1A 0%, #FF8C42 100%)',
    secondary: '#3B82F6',
    secondaryLight: '#EFF6FF',
    accent: '#22C55E',
    accentLight: '#DCFCE7',
    border: '#F2D9C8',
    borderLight: '#FFF2E8',
    navBg: '#FFFFFF',
    danger: '#EF4444',
    dangerLight: '#FEE2E2',
    warning: '#F59E0B',
    warningLight: '#FEF3C7',
    success: '#22C55E',
    successLight: '#DCFCE7',
    shadow: 'rgba(255,92,26,0.08)',
    shadowMd: 'rgba(0,0,0,0.10)',
    overlay: 'rgba(26,15,0,0.45)',
    tagBall: '#FFF2E8',
    tagBallText: '#FF5C1A',
    tagSoccer: '#EFF6FF',
    tagSoccerText: '#3B82F6',
    tagTennis: '#DCFCE7',
    tagTennisText: '#16A34A',
  },
  dark: {
    bg: '#0E0600',
    surface: '#1A0E04',
    surfaceAlt: '#241408',
    surfaceElevated: '#2A180A',
    text: '#FFF3EC',
    textSecondary: '#C48060',
    textMuted: '#7A4E32',
    primary: '#FF6B2B',
    primaryDark: '#E04A00',
    primaryLight: '#3A1500',
    primaryGrad: 'linear-gradient(135deg, #FF6B2B 0%, #FF9A56 100%)',
    secondary: '#60A5FA',
    secondaryLight: '#0A1A30',
    accent: '#4ADE80',
    accentLight: '#052210',
    border: '#2E1A0A',
    borderLight: '#1E1006',
    navBg: '#0E0600',
    danger: '#F87171',
    dangerLight: '#2A0808',
    warning: '#FBBF24',
    warningLight: '#261A04',
    success: '#4ADE80',
    successLight: '#062212',
    shadow: 'rgba(0,0,0,0.4)',
    shadowMd: 'rgba(0,0,0,0.6)',
    overlay: 'rgba(14,6,0,0.7)',
    tagBall: '#2E1400',
    tagBallText: '#FF8C52',
    tagSoccer: '#0A1828',
    tagSoccerText: '#60A5FA',
    tagTennis: '#062210',
    tagTennisText: '#4ADE80',
  },
};

// ─── Data ─────────────────────────────────────────────────────────────────────
const nearbyGames = [
  {
    id: 1, sport: 'Basketball', title: '3v3 Half-Court Run', location: 'Riverside Park Court 2',
    distance: '0.4 mi', time: '12 min', slots: 2, totalSlots: 6, intensity: 'Competitive',
    skill: 'Intermediate', duration: '45 min', weather: '72°F Sunny', host: 'Marcus T.',
    avatar: 'MT', joined: ['JL', 'RK', 'BB', 'CS'], vibe: 'Fast-paced, winners stay',
    matchScore: 94, lat: 40.7831, lng: -73.9712,
  },
  {
    id: 2, sport: 'Soccer', title: 'Sunday Scrimmage 5v5', location: 'Meadowbrook Field A',
    distance: '0.9 mi', time: '28 min', slots: 3, totalSlots: 10, intensity: 'Casual',
    skill: 'Beginner-Friendly', duration: '60 min', weather: '72°F Sunny', host: 'Priya N.',
    avatar: 'PN', joined: ['TR', 'MK', 'VW', 'AL', 'SJ', 'DE', 'FG'], vibe: 'Relaxed, all skill levels welcome',
    matchScore: 81, lat: 40.7741, lng: -73.9630,
  },
  {
    id: 3, sport: 'Tennis', title: 'Beginner Hitting Session', location: 'Central Park Courts',
    distance: '1.2 mi', time: '35 min', slots: 1, totalSlots: 2, intensity: 'Low-Key',
    skill: 'Beginner', duration: '60 min', weather: '72°F Sunny', host: 'Alexis M.',
    avatar: 'AM', joined: ['SB'], vibe: 'Drilling, tips welcome, no pressure',
    matchScore: 76, lat: 40.7812, lng: -73.9665,
  },
  {
    id: 4, sport: 'Basketball', title: 'Full-Court Competitive', location: 'Harlem YMCA Gym',
    distance: '1.8 mi', time: '42 min', slots: 4, totalSlots: 10, intensity: 'High',
    skill: 'Advanced', duration: '90 min', weather: 'Indoor', host: 'DeShawn B.',
    avatar: 'DB', joined: ['TJ', 'RM', 'KP', 'WS', 'NL'], vibe: 'Serious run, foul-calling',
    matchScore: 68, lat: 40.8116, lng: -73.9465,
  },
  {
    id: 5, sport: 'Volleyball', title: 'Beach 2v2 Pickup', location: 'North Cove Marina',
    distance: '2.1 mi', time: '55 min', slots: 2, totalSlots: 4, intensity: 'Casual',
    skill: 'Intermediate', duration: '50 min', weather: '72°F Sunny', host: 'Sofia R.',
    avatar: 'SR', joined: ['MH', 'GC'], vibe: 'Sand court, fun vibes',
    matchScore: 71, lat: 40.7096, lng: -74.0151,
  },
];

const myGames = [
  { id: 'g1', sport: 'Basketball', title: '3v3 Run @Riverside', date: 'Today, 6:30 PM', status: 'Confirmed', players: 5, max: 6 },
  { id: 'g2', sport: 'Soccer', title: 'Tue Scrimmage @Meadowbrook', date: 'Tue Mar 24, 7:00 PM', status: 'Open', players: 7, max: 10 },
  { id: 'g3', sport: 'Basketball', title: 'Morning Pickup @Riverside', date: 'Sat Mar 22, 8:00 AM', status: 'Completed', players: 6, max: 6 },
];

const alerts = [
  { id: 'a1', type: 'new', sport: 'Basketball', msg: '3v3 game forming 0.3 mi away — starts in 8 min', time: '2m ago', read: false },
  { id: 'a2', type: 'slot', sport: 'Soccer', msg: 'Slot opened in Sunday Scrimmage you saved', time: '15m ago', read: false },
  { id: 'a3', type: 'match', sport: 'Tennis', msg: 'New hitting session matches your preferences', time: '1h ago', read: true },
  { id: 'a4', type: 'reminder', sport: 'Basketball', msg: 'Your game at Riverside starts in 2 hours', time: '3h ago', read: true },
];

const sportIcons = { Basketball: '🏀', Soccer: '⚽', Tennis: '🎾', Volleyball: '🏐', Baseball: '⚾', Softball: '🥎' };
const intensityColors = {
  'Low-Key': { bg: '#DCFCE7', text: '#16A34A', darkBg: '#052210', darkText: '#4ADE80' },
  'Casual': { bg: '#EFF6FF', text: '#2563EB', darkBg: '#0A1828', darkText: '#60A5FA' },
  'Competitive': { bg: '#FEF3C7', text: '#D97706', darkBg: '#261A04', darkText: '#FBBF24' },
  'High': { bg: '#FEE2E2', text: '#DC2626', darkBg: '#2A0808', darkText: '#F87171' },
};

// ─── Components ───────────────────────────────────────────────────────────────
function StatusBar({ t, isDark }) {
  const [time, setTime] = useState('');
  useEffect(() => {
    const update = () => {
      const d = new Date();
      setTime(d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }).replace(' ', ''));
    };
    update();
    const i = setInterval(update, 1000);
    return () => clearInterval(i);
  }, []);
  const Wifi = window.lucide.Wifi;
  const Battery = window.lucide.Battery;
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 20px 4px', position: 'relative', zIndex: 10 }}>
      <span style={{ fontSize: 13, fontWeight: 600, color: t.text, letterSpacing: 0.3 }}>{time}</span>
      <div style={{ width: 120, height: 32, background: '#000', borderRadius: 20, position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: 8 }} />
      <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
        <Wifi size={13} color={t.text} />
        <Battery size={15} color={t.text} />
      </div>
    </div>
  );
}

function MatchBadge({ score, t }) {
  const color = score >= 90 ? t.accent : score >= 75 ? t.warning : t.textMuted;
  return (
    <div style={{ background: score >= 90 ? t.accentLight : score >= 75 ? t.warningLight : t.surfaceAlt, borderRadius: 8, padding: '2px 8px', display: 'flex', alignItems: 'center', gap: 4 }}>
      <span style={{ fontSize: 10, fontWeight: 700, color }}>⚡ {score}% fit</span>
    </div>
  );
}

function SportTag({ sport, t, isDark }) {
  const colors = {
    Basketball: { bg: isDark ? t.tagBall : '#FFF2E8', text: isDark ? t.tagBallText : '#FF5C1A' },
    Soccer: { bg: isDark ? t.tagSoccer : '#EFF6FF', text: isDark ? t.tagSoccerText : '#3B82F6' },
    Tennis: { bg: isDark ? t.tagTennis : '#DCFCE7', text: isDark ? t.tagTennisText : '#16A34A' },
    Volleyball: { bg: isDark ? '#1A1040' : '#F5F3FF', text: isDark ? '#A78BFA' : '#7C3AED' },
    Baseball: { bg: isDark ? '#1A0A20' : '#FDF4FF', text: isDark ? '#E879F9' : '#A21CAF' },
    Softball: { bg: isDark ? '#1A0A20' : '#FDF4FF', text: isDark ? '#E879F9' : '#A21CAF' },
  };
  const c = colors[sport] || { bg: t.surfaceAlt, text: t.textSecondary };
  return (
    <span style={{ fontSize: 10, fontWeight: 600, background: c.bg, color: c.text, padding: '2px 8px', borderRadius: 6 }}>
      {sportIcons[sport]} {sport}
    </span>
  );
}

function GameCard({ game, t, isDark, onJoin }) {
  const [pressed, setPressed] = useState(false);
  const ic = intensityColors[game.intensity] || intensityColors['Casual'];
  const filledSlots = game.totalSlots - game.slots;
  return (
    <div style={{ background: t.surface, borderRadius: 20, padding: 16, marginBottom: 14, boxShadow: `0 2px 12px ${t.shadow}`, border: `1px solid ${t.border}` }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 6 }}>
            <SportTag sport={game.sport} t={t} isDark={isDark} />
            <span style={{ fontSize: 10, fontWeight: 600, color: isDark ? ic.darkText : ic.text, background: isDark ? ic.darkBg : ic.bg, padding: '2px 8px', borderRadius: 6 }}>{game.intensity}</span>
          </div>
          <div style={{ fontSize: 15, fontWeight: 700, color: t.text, marginBottom: 2 }}>{game.title}</div>
          <div style={{ fontSize: 12, color: t.textMuted }}>📍 {game.location}</div>
        </div>
        <MatchBadge score={game.matchScore} t={t} />
      </div>

      <div style={{ display: 'flex', gap: 10, marginBottom: 12, flexWrap: 'wrap' }}>
        {[
          { icon: '🕐', val: `Starts in ${game.time}` },
          { icon: '📏', val: game.distance },
          { icon: '⏱', val: game.duration },
          { icon: '🌤', val: game.weather },
        ].map(({ icon, val }) => (
          <span key={val} style={{ fontSize: 11, color: t.textSecondary, background: t.surfaceAlt, padding: '3px 8px', borderRadius: 8 }}>
            {icon} {val}
          </span>
        ))}
      </div>

      <div style={{ marginBottom: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
          <span style={{ fontSize: 11, color: t.textMuted }}>Players: {filledSlots}/{game.totalSlots}</span>
          <span style={{ fontSize: 11, fontWeight: 600, color: game.slots <= 1 ? t.danger : t.primary }}>{game.slots} slot{game.slots !== 1 ? 's' : ''} left</span>
        </div>
        <div style={{ display: 'flex', gap: 4 }}>
          {Array.from({ length: game.totalSlots }).map((_, i) => (
            <div key={i} style={{ flex: 1, height: 4, borderRadius: 2, background: i < filledSlots ? t.primary : t.border }} />
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 28, height: 28, borderRadius: 14, background: t.primaryGrad, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 10, fontWeight: 700, color: '#fff' }}>{game.avatar}</span>
          </div>
          <div>
            <div style={{ fontSize: 11, color: t.textMuted }}>Hosted by</div>
            <div style={{ fontSize: 12, fontWeight: 600, color: t.text }}>{game.host}</div>
          </div>
        </div>
        <button
          onMouseDown={() => setPressed(true)}
          onMouseUp={() => setPressed(false)}
          onTouchStart={() => setPressed(true)}
          onTouchEnd={() => { setPressed(false); onJoin(game); }}
          onClick={() => onJoin(game)}
          style={{
            background: pressed ? t.primaryDark : t.primaryGrad,
            color: '#fff', border: 'none', borderRadius: 12, padding: '8px 20px',
            fontSize: 13, fontWeight: 700, cursor: 'pointer',
            transform: pressed ? 'scale(0.96)' : 'scale(1)',
            transition: 'all 0.12s ease', boxShadow: `0 4px 14px ${t.shadow}`,
          }}
        >
          Join →
        </button>
      </div>

      <div style={{ marginTop: 10, padding: '8px 10px', background: t.surfaceAlt, borderRadius: 10, fontSize: 11, color: t.textSecondary, fontStyle: 'italic' }}>
        "{game.vibe}"
      </div>
    </div>
  );
}

// ─── Screen: Discover ─────────────────────────────────────────────────────────
function DiscoverScreen({ t, isDark, onJoin }) {
  const [filter, setFilter] = useState('All');
  const [skillFilter, setSkillFilter] = useState('Any');
  const sports = ['All', '🏀', '⚽', '🎾', '🏐'];
  const skills = ['Any', 'Beginner', 'Intermediate', 'Advanced'];

  const filtered = nearbyGames.filter(g => {
    const sportMatch = filter === 'All' || g.sport.charAt(0) === (filter === '🏀' ? 'B' : filter === '⚽' ? 'S' : filter === '🎾' ? 'T' : 'V');
    const skillMatch = skillFilter === 'Any' || g.skill.includes(skillFilter);
    return sportMatch && skillMatch;
  });

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '0 16px' }}>
      {/* Header */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 22, fontWeight: 800, color: t.text, marginBottom: 2 }}>Nearby Games</div>
        <div style={{ fontSize: 13, color: t.textMuted }}>📍 New York, NY · Updated just now</div>
      </div>

      {/* Map Sketch */}
      <div style={{ background: isDark ? '#1A1206' : '#FFF8F0', borderRadius: 20, height: 130, marginBottom: 16, overflow: 'hidden', position: 'relative', border: `1px solid ${t.border}` }}>
        {/* Pseudo map */}
        <svg width="100%" height="100%" viewBox="0 0 343 130" xmlns="http://www.w3.org/2000/svg">
          <rect width="343" height="130" fill={isDark ? '#1A1206' : '#FFF8F0'} />
          <rect x="0" y="60" width="343" height="3" fill={isDark ? '#2E1A0A' : '#F2D9C8'} opacity="0.6" />
          <rect x="160" y="0" width="3" height="130" fill={isDark ? '#2E1A0A' : '#F2D9C8'} opacity="0.6" />
          <rect x="60" y="0" width="2" height="130" fill={isDark ? '#2A1608' : '#F5E0D0'} opacity="0.4" />
          <rect x="260" y="0" width="2" height="130" fill={isDark ? '#2A1608' : '#F5E0D0'} opacity="0.4" />
          <rect x="0" y="25" width="343" height="2" fill={isDark ? '#2A1608' : '#F5E0D0'} opacity="0.4" />
          <rect x="0" y="100" width="343" height="2" fill={isDark ? '#2A1608' : '#F5E0D0'} opacity="0.4" />
          {/* Park blob */}
          <ellipse cx="110" cy="45" rx="45" ry="28" fill={isDark ? '#0A2208' : '#D4EDDA'} opacity="0.8" />
          <ellipse cx="240" cy="90" rx="35" ry="20" fill={isDark ? '#0A2208' : '#D4EDDA'} opacity="0.6" />
          {/* Game pins */}
          {nearbyGames.slice(0, 4).map((g, i) => {
            const positions = [{ x: 108, y: 42 }, { x: 195, y: 78 }, { x: 142, y: 95 }, { x: 270, y: 50 }];
            const p = positions[i];
            return (
              <g key={g.id}>
                <circle cx={p.x} cy={p.y} r="13" fill={isDark ? '#FF6B2B' : '#FF5C1A'} opacity="0.9" />
                <text x={p.x} y={p.y + 4} textAnchor="middle" fontSize="12" fill="white">{sportIcons[g.sport]}</text>
              </g>
            );
          })}
          {/* User pin */}
          <circle cx="175" cy="62" r="8" fill={isDark ? '#60A5FA' : '#3B82F6'} />
          <circle cx="175" cy="62" r="4" fill="white" />
        </svg>
        <div style={{ position: 'absolute', bottom: 10, right: 12, background: t.surface, borderRadius: 10, padding: '4px 10px', fontSize: 11, fontWeight: 600, color: t.primary, boxShadow: `0 2px 8px ${t.shadow}` }}>
          {nearbyGames.length} games within 2.5 mi
        </div>
      </div>

      {/* Sport Filter */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 10, overflowX: 'auto', paddingBottom: 4 }}>
        {sports.map(s => (
          <button key={s} onClick={() => setFilter(s)} style={{
            background: filter === s ? t.primaryGrad : t.surface,
            color: filter === s ? '#fff' : t.textSecondary,
            border: `1px solid ${filter === s ? 'transparent' : t.border}`,
            borderRadius: 12, padding: '6px 14px', fontSize: 13, fontWeight: 600,
            cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.15s',
          }}>{s}</button>
        ))}
      </div>

      {/* Skill Filter */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
        {skills.map(s => (
          <button key={s} onClick={() => setSkillFilter(s)} style={{
            background: skillFilter === s ? t.primaryLight : t.surfaceAlt,
            color: skillFilter === s ? t.primary : t.textMuted,
            border: `1px solid ${skillFilter === s ? t.primary : 'transparent'}`,
            borderRadius: 10, padding: '4px 10px', fontSize: 11, fontWeight: 600,
            cursor: 'pointer', transition: 'all 0.15s',
          }}>{s}</button>
        ))}
      </div>

      {/* Games List */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px 0', color: t.textMuted }}>
          <div style={{ fontSize: 36, marginBottom: 10 }}>🔍</div>
          <div style={{ fontSize: 14, fontWeight: 600 }}>No games match your filters</div>
          <div style={{ fontSize: 12, marginTop: 4 }}>Try broadening your search</div>
        </div>
      ) : filtered.map(g => <GameCard key={g.id} game={g} t={t} isDark={isDark} onJoin={onJoin} />)}

      <div style={{ height: 20 }} />
    </div>
  );
}

// ─── Screen: Board ────────────────────────────────────────────────────────────
function BoardScreen({ t, isDark }) {
  const [tab, setTab] = useState('my');

  const tabs = [{ id: 'my', label: 'My Games' }, { id: 'alerts', label: 'Alerts' }, { id: 'saved', label: 'Saved' }];

  const statusStyle = (status) => {
    if (status === 'Confirmed') return { bg: t.accentLight, text: t.accent };
    if (status === 'Open') return { bg: t.primaryLight, text: t.primary };
    return { bg: t.surfaceAlt, text: t.textMuted };
  };

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '0 16px' }}>
      <div style={{ fontSize: 22, fontWeight: 800, color: t.text, marginBottom: 16 }}>Game Board</div>

      {/* Tabs */}
      <div style={{ display: 'flex', background: t.surfaceAlt, borderRadius: 14, padding: 4, marginBottom: 20, gap: 4 }}>
        {tabs.map(tab2 => (
          <button key={tab2.id} onClick={() => setTab(tab2.id)} style={{
            flex: 1, background: tab === tab2.id ? t.surface : 'transparent',
            color: tab === tab2.id ? t.text : t.textMuted,
            border: 'none', borderRadius: 11, padding: '7px 0',
            fontSize: 12, fontWeight: 700, cursor: 'pointer',
            boxShadow: tab === tab2.id ? `0 2px 8px ${t.shadow}` : 'none',
            transition: 'all 0.2s',
          }}>{tab2.label}</button>
        ))}
      </div>

      {tab === 'my' && (
        <div>
          {myGames.map(g => {
            const sc = statusStyle(g.status);
            return (
              <div key={g.id} style={{ background: t.surface, borderRadius: 18, padding: 16, marginBottom: 12, border: `1px solid ${t.border}`, boxShadow: `0 2px 10px ${t.shadow}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: t.text, marginBottom: 3 }}>{g.title}</div>
                    <div style={{ fontSize: 12, color: t.textMuted }}>🗓 {g.date}</div>
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 700, background: sc.bg, color: sc.text, padding: '3px 10px', borderRadius: 8 }}>{g.status}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: 4 }}>
                    {Array.from({ length: g.max }).map((_, i) => (
                      <div key={i} style={{ width: 22, height: 22, borderRadius: 11, background: i < g.players ? t.primaryGrad : t.border, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {i < g.players && <span style={{ fontSize: 10 }}>👤</span>}
                      </div>
                    ))}
                  </div>
                  <span style={{ fontSize: 11, color: t.textMuted }}>{g.players}/{g.max} players</span>
                </div>
                {g.status === 'Open' && (
                  <div style={{ marginTop: 10, background: t.primaryLight, borderRadius: 10, padding: '8px 12px', fontSize: 12, color: t.primary, fontWeight: 600 }}>
                    📢 Share to fill {g.max - g.players} open spot{g.max - g.players !== 1 ? 's' : ''}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {tab === 'alerts' && (
        <div>
          {alerts.map(a => (
            <div key={a.id} style={{
              background: a.read ? t.surface : (isDark ? '#2A1800' : '#FFF7F0'),
              borderRadius: 16, padding: '12px 14px', marginBottom: 10,
              border: `1px solid ${a.read ? t.border : t.primary}`,
              display: 'flex', gap: 12, alignItems: 'flex-start',
            }}>
              <div style={{ width: 36, height: 36, borderRadius: 12, background: a.read ? t.surfaceAlt : t.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ fontSize: 18 }}>{sportIcons[a.sport]}</span>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: a.read ? 400 : 600, color: t.text, marginBottom: 2, lineHeight: 1.4 }}>{a.msg}</div>
                <div style={{ fontSize: 11, color: t.textMuted }}>{a.time}</div>
              </div>
              {!a.read && <div style={{ width: 8, height: 8, borderRadius: 4, background: t.primary, marginTop: 4, flexShrink: 0 }} />}
            </div>
          ))}
        </div>
      )}

      {tab === 'saved' && (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: t.textMuted }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🔖</div>
          <div style={{ fontSize: 15, fontWeight: 700, color: t.textSecondary, marginBottom: 6 }}>No saved games yet</div>
          <div style={{ fontSize: 13, lineHeight: 1.5 }}>Bookmark games from Discover to track them here. You'll get alerts when slots open.</div>
        </div>
      )}

      <div style={{ height: 20 }} />
    </div>
  );
}

// ─── Screen: Post ─────────────────────────────────────────────────────────────
function PostScreen({ t, isDark }) {
  const [sport, setSport] = useState('Basketball');
  const [intensity, setIntensity] = useState('Casual');
  const [skill, setSkill] = useState('Intermediate');
  const [slots, setSlots] = useState(4);
  const [duration, setDuration] = useState('60');
  const [posted, setPosted] = useState(false);
  const [btnPressed, setBtnPressed] = useState(false);

  const sports = ['Basketball', 'Soccer', 'Tennis', 'Volleyball', 'Baseball'];
  const intensities = ['Low-Key', 'Casual', 'Competitive', 'High'];
  const skills = ['Beginner', 'Beginner-Friendly', 'Intermediate', 'Advanced'];

  if (posted) {
    return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 32 }}>
        <div style={{ width: 80, height: 80, borderRadius: 40, background: t.primaryGrad, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, boxShadow: `0 8px 24px ${t.shadow}` }}>
          <span style={{ fontSize: 36 }}>🎉</span>
        </div>
        <div style={{ fontSize: 22, fontWeight: 800, color: t.text, marginBottom: 8, textAlign: 'center' }}>Game Posted!</div>
        <div style={{ fontSize: 14, color: t.textMuted, textAlign: 'center', marginBottom: 28, lineHeight: 1.5 }}>
          Your {sport} game is now live. Players matching your criteria will be notified nearby.
        </div>
        <div style={{ background: t.surface, borderRadius: 18, padding: 18, width: '100%', border: `1px solid ${t.border}`, marginBottom: 24 }}>
          <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
            <SportTag sport={sport} t={t} isDark={isDark} />
            <span style={{ fontSize: 11, fontWeight: 600, background: intensityColors[intensity]?.bg || t.surfaceAlt, color: intensityColors[intensity]?.text || t.textSecondary, padding: '2px 8px', borderRadius: 6 }}>{intensity}</span>
          </div>
          <div style={{ fontSize: 13, color: t.textSecondary }}>📍 Your current location · {duration} min · {slots} slots open</div>
        </div>
        <button onClick={() => setPosted(false)} style={{ background: t.primaryGrad, color: '#fff', border: 'none', borderRadius: 14, padding: '12px 32px', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>
          Post Another Game
        </button>
      </div>
    );
  }

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '0 16px' }}>
      <div style={{ fontSize: 22, fontWeight: 800, color: t.text, marginBottom: 6 }}>Post a Game</div>
      <div style={{ fontSize: 13, color: t.textMuted, marginBottom: 20 }}>Fill an open slot or start a new pickup game</div>

      {/* Sport */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: t.textSecondary, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 }}>Sport</div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {sports.map(s => (
            <button key={s} onClick={() => setSport(s)} style={{
              background: sport === s ? t.primaryGrad : t.surfaceAlt,
              color: sport === s ? '#fff' : t.textSecondary,
              border: 'none', borderRadius: 12, padding: '8px 14px',
              fontSize: 13, fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s',
            }}>
              {sportIcons[s]} {s}
            </button>
          ))}
        </div>
      </div>

      {/* Intensity */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: t.textSecondary, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 }}>Intensity / Vibe</div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {intensities.map(i => {
            const ic = intensityColors[i];
            return (
              <button key={i} onClick={() => setIntensity(i)} style={{
                background: intensity === i ? (isDark ? ic?.darkBg : ic?.bg) : t.surfaceAlt,
                color: intensity === i ? (isDark ? ic?.darkText : ic?.text) : t.textMuted,
                border: `1.5px solid ${intensity === i ? (isDark ? ic?.darkText : ic?.text) : 'transparent'}`,
                borderRadius: 12, padding: '7px 14px', fontSize: 12, fontWeight: 700,
                cursor: 'pointer', transition: 'all 0.15s',
              }}>{i}</button>
            );
          })}
        </div>
      </div>

      {/* Skill */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: t.textSecondary, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 }}>Skill Level</div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {skills.map(s => (
            <button key={s} onClick={() => setSkill(s)} style={{
              background: skill === s ? t.primaryLight : t.surfaceAlt,
              color: skill === s ? t.primary : t.textMuted,
              border: `1.5px solid ${skill === s ? t.primary : 'transparent'}`,
              borderRadius: 12, padding: '7px 14px', fontSize: 12, fontWeight: 700,
              cursor: 'pointer', transition: 'all 0.15s',
            }}>{s}</button>
          ))}
        </div>
      </div>

      {/* Slots & Duration */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: t.textSecondary, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 }}>Open Slots</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: t.surfaceAlt, borderRadius: 14, padding: '10px 14px' }}>
            <button onClick={() => setSlots(Math.max(1, slots - 1))} style={{ width: 28, height: 28, borderRadius: 14, background: t.surface, border: `1px solid ${t.border}`, fontSize: 16, cursor: 'pointer', color: t.text, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>−</button>
            <span style={{ fontSize: 18, fontWeight: 800, color: t.text, minWidth: 20, textAlign: 'center' }}>{slots}</span>
            <button onClick={() => setSlots(Math.min(20, slots + 1))} style={{ width: 28, height: 28, borderRadius: 14, background: t.primaryGrad, border: 'none', fontSize: 16, cursor: 'pointer', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: t.textSecondary, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 }}>Duration</div>
          <select value={duration} onChange={e => setDuration(e.target.value)} style={{
            width: '100%', background: t.surfaceAlt, color: t.text, border: 'none',
            borderRadius: 14, padding: '12px 14px', fontSize: 14, fontWeight: 600,
            cursor: 'pointer', outline: 'none', fontFamily: 'Outfit, sans-serif',
          }}>
            {['30', '45', '60', '90', '120'].map(d => <option key={d} value={d}>{d} min</option>)}
          </select>
        </div>
      </div>

      {/* Location */}
      <div style={{ marginBottom: 24, background: t.surfaceAlt, borderRadius: 14, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: 20 }}>📍</span>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: t.text }}>Riverside Park Court 2</div>
          <div style={{ fontSize: 11, color: t.textMuted }}>Detected from GPS · Tap to change</div>
        </div>
      </div>

      {/* Post Button */}
      <button
        onMouseDown={() => setBtnPressed(true)}
        onMouseUp={() => setBtnPressed(false)}
        onClick={() => { setBtnPressed(false); setPosted(true); }}
        style={{
          width: '100%', background: btnPressed ? t.primaryDark : t.primaryGrad,
          color: '#fff', border: 'none', borderRadius: 16, padding: '15px 0',
          fontSize: 16, fontWeight: 800, cursor: 'pointer',
          transform: btnPressed ? 'scale(0.97)' : 'scale(1)',
          transition: 'all 0.12s ease',
          boxShadow: `0 6px 20px ${t.shadow}`,
          letterSpacing: 0.3,
        }}
      >
        🚀 Post Game Now
      </button>

      <div style={{ height: 24 }} />
    </div>
  );
}

// ─── Screen: Profile ──────────────────────────────────────────────────────────
function ProfileScreen({ t, isDark, toggleTheme }) {
  const [editingPref, setEditingPref] = useState(false);
  const [radius, setRadius] = useState(3);
  const [notifs, setNotifs] = useState(true);
  const [weatherAlert, setWeatherAlert] = useState(true);

  const stats = [
    { label: 'Games Played', value: '47', icon: '🏃' },
    { label: 'Avg Fit Score', value: '88%', icon: '⚡' },
    { label: 'Sports', value: '3', icon: '🎯' },
    { label: 'Streak', value: '12d', icon: '🔥' },
  ];

  const prefs = [
    { label: 'Primary Sport', value: 'Basketball' },
    { label: 'Preferred Intensity', value: 'Competitive' },
    { label: 'Skill Level', value: 'Intermediate' },
    { label: 'Available Hours', value: 'Evenings & Weekends' },
  ];

  const Toggle = ({ on, onToggle }) => (
    <div onClick={onToggle} style={{ width: 44, height: 26, borderRadius: 13, background: on ? t.primaryGrad : t.border, cursor: 'pointer', position: 'relative', transition: 'all 0.2s', flexShrink: 0 }}>
      <div style={{ width: 20, height: 20, borderRadius: 10, background: '#fff', position: 'absolute', top: 3, left: on ? 21 : 3, transition: 'left 0.2s', boxShadow: '0 1px 4px rgba(0,0,0,0.2)' }} />
    </div>
  );

  const Moon = window.lucide.Moon;
  const Sun = window.lucide.Sun;
  const Settings = window.lucide.Settings;

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '0 16px' }}>
      {/* Profile Header */}
      <div style={{ background: t.primaryGrad, borderRadius: 24, padding: '24px 20px', marginBottom: 20, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', right: -20, top: -20, width: 100, height: 100, borderRadius: 50, background: 'rgba(255,255,255,0.1)' }} />
        <div style={{ position: 'absolute', right: 20, top: 20, width: 50, height: 50, borderRadius: 25, background: 'rgba(255,255,255,0.1)' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 60, height: 60, borderRadius: 30, background: 'rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid rgba(255,255,255,0.5)', flexShrink: 0 }}>
            <span style={{ fontSize: 26 }}>👤</span>
          </div>
          <div>
            <div style={{ fontSize: 19, fontWeight: 800, color: '#fff' }}>Jordan Lee</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)' }}>@jordanlee · NYC</div>
            <div style={{ marginTop: 4, background: 'rgba(255,255,255,0.2)', borderRadius: 8, padding: '2px 10px', display: 'inline-block' }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#fff' }}>🏀 Baller · ⚽ Regular · 🎾 Learning</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
        {stats.map(s => (
          <div key={s.label} style={{ background: t.surface, borderRadius: 16, padding: '14px 16px', border: `1px solid ${t.border}`, boxShadow: `0 2px 8px ${t.shadow}` }}>
            <div style={{ fontSize: 22, marginBottom: 4 }}>{s.icon}</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: t.text }}>{s.value}</div>
            <div style={{ fontSize: 11, color: t.textMuted }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Preferences */}
      <div style={{ background: t.surface, borderRadius: 20, padding: 16, marginBottom: 16, border: `1px solid ${t.border}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: t.text }}>My Preferences</div>
          <button onClick={() => setEditingPref(!editingPref)} style={{ background: editingPref ? t.primaryLight : t.surfaceAlt, color: editingPref ? t.primary : t.textMuted, border: 'none', borderRadius: 8, padding: '4px 12px', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
            {editingPref ? 'Done' : 'Edit'}
          </button>
        </div>
        {prefs.map(p => (
          <div key={p.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 10, marginBottom: 10, borderBottom: `1px solid ${t.border}` }}>
            <span style={{ fontSize: 12, color: t.textMuted }}>{p.label}</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: t.text, background: t.surfaceAlt, padding: '3px 10px', borderRadius: 8 }}>{p.value}</span>
          </div>
        ))}

        {/* Travel Radius */}
        <div style={{ marginBottom: 10 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
            <span style={{ fontSize: 12, color: t.textMuted }}>Travel Radius</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: t.primary }}>{radius} mi</span>
          </div>
          <input type="range" min={1} max={10} value={radius} onChange={e => setRadius(Number(e.target.value))}
            style={{ width: '100%', accentColor: t.primary, cursor: 'pointer' }} />
        </div>
      </div>

      {/* Settings */}
      <div style={{ background: t.surface, borderRadius: 20, padding: 16, marginBottom: 16, border: `1px solid ${t.border}` }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: t.text, marginBottom: 14 }}>Settings</div>
        {[
          { label: 'Game Alerts', sub: 'Notify when nearby games form', on: notifs, toggle: () => setNotifs(!notifs) },
          { label: 'Weather Alerts', sub: 'Skip alerts in bad weather', on: weatherAlert, toggle: () => setWeatherAlert(!weatherAlert) },
        ].map(item => (
          <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: t.text }}>{item.label}</div>
              <div style={{ fontSize: 11, color: t.textMuted }}>{item.sub}</div>
            </div>
            <Toggle on={item.on} onToggle={item.toggle} />
          </div>
        ))}

        {/* Theme Toggle */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: t.text }}>Dark Mode</div>
            <div style={{ fontSize: 11, color: t.textMuted }}>Switch app appearance</div>
          </div>
          <div onClick={toggleTheme} style={{ width: 44, height: 26, borderRadius: 13, background: isDark ? t.primaryGrad : t.border, cursor: 'pointer', position: 'relative', transition: 'all 0.2s', flexShrink: 0 }}>
            <div style={{ position: 'absolute', top: 3, left: isDark ? 21 : 3, transition: 'left 0.2s', width: 20, height: 20, borderRadius: 10, background: '#fff', boxShadow: '0 1px 4px rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {isDark ? <Moon size={11} color={t.primary} /> : <Sun size={11} color={t.primary} />}
            </div>
          </div>
        </div>
      </div>

      {/* Fit History */}
      <div style={{ background: t.surface, borderRadius: 20, padding: 16, marginBottom: 20, border: `1px solid ${t.border}` }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: t.text, marginBottom: 12 }}>Recent Game Fit</div>
        {[
          { game: '3v3 @Riverside', score: 96, date: 'Mar 20' },
          { game: 'Soccer Scrimmage', score: 78, date: 'Mar 18' },
          { game: 'Tennis Hitting', score: 62, date: 'Mar 15' },
        ].map(r => (
          <div key={r.game} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <div style={{ fontSize: 12, color: t.textMuted, width: 40, flexShrink: 0 }}>{r.date}</div>
            <div style={{ flex: 1, height: 6, borderRadius: 3, background: t.border, overflow: 'hidden' }}>
              <div style={{ width: `${r.score}%`, height: '100%', borderRadius: 3, background: r.score >= 90 ? t.accent : r.score >= 75 ? t.warning : t.primary }} />
            </div>
            <div style={{ fontSize: 12, fontWeight: 700, color: t.text, width: 32, textAlign: 'right' }}>{r.score}%</div>
            <div style={{ fontSize: 11, color: t.textMuted, width: 100, flexShrink: 0 }}>{r.game}</div>
          </div>
        ))}
      </div>

      <div style={{ height: 20 }} />
    </div>
  );
}

// ─── Join Modal ───────────────────────────────────────────────────────────────
function JoinModal({ game, t, isDark, onClose }) {
  const [joined, setJoined] = useState(false);
  const [pressed, setPressed] = useState(false);
  if (!game) return null;
  const ic = intensityColors[game.intensity] || intensityColors['Casual'];

  return (
    <div style={{ position: 'absolute', inset: 0, background: t.overlay, zIndex: 100, display: 'flex', alignItems: 'flex-end', borderRadius: 40 }}>
      <div style={{ background: t.surface, borderRadius: '28px 28px 0 0', width: '100%', padding: 24, maxHeight: '80%', overflowY: 'auto' }}>
        <div style={{ width: 36, height: 4, borderRadius: 2, background: t.border, margin: '0 auto 20px' }} />

        {!joined ? (
          <>
            <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
              <SportTag sport={game.sport} t={t} isDark={isDark} />
              <span style={{ fontSize: 11, fontWeight: 600, background: isDark ? ic.darkBg : ic.bg, color: isDark ? ic.darkText : ic.text, padding: '2px 8px', borderRadius: 6 }}>{game.intensity}</span>
            </div>
            <div style={{ fontSize: 20, fontWeight: 800, color: t.text, marginBottom: 6 }}>{game.title}</div>
            <div style={{ fontSize: 13, color: t.textMuted, marginBottom: 18 }}>📍 {game.location}</div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 18 }}>
              {[
                { label: 'Starts In', value: game.time },
                { label: 'Distance', value: game.distance },
                { label: 'Duration', value: game.duration },
                { label: 'Skill', value: game.skill },
              ].map(({ label, value }) => (
                <div key={label} style={{ background: t.surfaceAlt, borderRadius: 12, padding: '10px 12px' }}>
                  <div style={{ fontSize: 11, color: t.textMuted, marginBottom: 2 }}>{label}</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: t.text }}>{value}</div>
                </div>
              ))}
            </div>

            <div style={{ background: t.surfaceAlt, borderRadius: 14, padding: '12px 14px', marginBottom: 18 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: t.textSecondary, marginBottom: 4 }}>Game Vibe</div>
              <div style={{ fontSize: 13, color: t.text, fontStyle: 'italic' }}>"{game.vibe}"</div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
              <div style={{ width: 40, height: 40, borderRadius: 20, background: t.primaryGrad, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>{game.avatar}</span>
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: t.text }}>{game.host}</div>
                <div style={{ fontSize: 11, color: t.textMuted }}>Organizer · ⚡ {game.matchScore}% fit for you</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={onClose} style={{ flex: 1, background: t.surfaceAlt, color: t.textSecondary, border: 'none', borderRadius: 14, padding: '13px 0', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Cancel</button>
              <button
                onMouseDown={() => setPressed(true)}
                onMouseUp={() => setPressed(false)}
                onClick={() => { setPressed(false); setJoined(true); }}
                style={{ flex: 2, background: pressed ? t.primaryDark : t.primaryGrad, color: '#fff', border: 'none', borderRadius: 14, padding: '13px 0', fontSize: 14, fontWeight: 700, cursor: 'pointer', transform: pressed ? 'scale(0.97)' : 'scale(1)', transition: 'all 0.12s' }}>
                Confirm Join →
              </button>
            </div>
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{ fontSize: 56, marginBottom: 16 }}>🎯</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: t.text, marginBottom: 8 }}>You're In!</div>
            <div style={{ fontSize: 14, color: t.textMuted, marginBottom: 24, lineHeight: 1.6 }}>
              You've joined <strong style={{ color: t.text }}>{game.title}</strong>. A reminder will be sent 30 minutes before the game.
            </div>
            <div style={{ background: t.primaryLight, borderRadius: 14, padding: '12px 16px', marginBottom: 20, textAlign: 'left' }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: t.primary, marginBottom: 4 }}>Getting there</div>
              <div style={{ fontSize: 13, color: t.text }}>📍 {game.location} · {game.distance} from you</div>
              <div style={{ fontSize: 13, color: t.text }}>🕐 Starts in approximately {game.time}</div>
            </div>
            <button onClick={onClose} style={{ width: '100%', background: t.primaryGrad, color: '#fff', border: 'none', borderRadius: 14, padding: '13px 0', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>Done</button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
function App() {
  const [isDark, setIsDark] = useState(false);
  const [activeTab, setActiveTab] = useState('discover');
  const [selectedGame, setSelectedGame] = useState(null);
  const t = themes[isDark ? 'dark' : 'light'];

  const MapPin = window.lucide.MapPin;
  const LayoutGrid = window.lucide.LayoutGrid;
  const PlusCircle = window.lucide.PlusCircle;
  const User = window.lucide.User;
  const Bell = window.lucide.Bell;

  const tabs = [
    { id: 'discover', label: 'Discover', Icon: MapPin },
    { id: 'board', label: 'Board', Icon: LayoutGrid },
    { id: 'post', label: 'Post', Icon: PlusCircle },
    { id: 'profile', label: 'Profile', Icon: User },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#E8E8E8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Outfit, sans-serif' }}>
      {/* Phone Frame */}
      <div style={{ width: 375, height: 812, background: t.bg, borderRadius: 40, overflow: 'hidden', position: 'relative', display: 'flex', flexDirection: 'column', boxShadow: '0 32px 80px rgba(0,0,0,0.25), 0 8px 24px rgba(0,0,0,0.15)', border: '8px solid #1A1A1A' }}>

        <StatusBar t={t} isDark={isDark} />

        {/* App Header */}
        <div style={{ padding: '8px 20px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: t.primary, textTransform: 'uppercase', letterSpacing: 1 }}>Rebound Radar</div>
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <div style={{ position: 'relative' }}>
              <Bell size={20} color={t.text} />
              <div style={{ position: 'absolute', top: -2, right: -2, width: 8, height: 8, borderRadius: 4, background: t.primary }} />
            </div>
          </div>
        </div>

        {/* Screen Content */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>
          {activeTab === 'discover' && <DiscoverScreen t={t} isDark={isDark} onJoin={setSelectedGame} />}
          {activeTab === 'board' && <BoardScreen t={t} isDark={isDark} />}
          {activeTab === 'post' && <PostScreen t={t} isDark={isDark} />}
          {activeTab === 'profile' && <ProfileScreen t={t} isDark={isDark} toggleTheme={() => setIsDark(!isDark)} />}

          {selectedGame && <JoinModal game={selectedGame} t={t} isDark={isDark} onClose={() => setSelectedGame(null)} />}
        </div>

        {/* Bottom Nav */}
        <div style={{ background: t.navBg, borderTop: `1px solid ${t.border}`, padding: '8px 0 20px', display: 'flex', boxShadow: `0 -4px 20px ${t.shadow}` }}>
          {tabs.map(({ id, label, Icon }) => {
            const active = activeTab === id;
            return (
              <button key={id} onClick={() => setActiveTab(id)} style={{
                flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
                background: 'none', border: 'none', cursor: 'pointer', padding: '6px 0',
              }}>
                {id === 'post' ? (
                  <div style={{ width: 44, height: 44, borderRadius: 22, background: active ? t.primaryDark : t.primaryGrad, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 4px 14px ${t.shadow}`, transform: active ? 'scale(1.08)' : 'scale(1)', transition: 'all 0.15s', marginTop: -16 }}>
                    <Icon size={22} color="#fff" strokeWidth={2.5} />
                  </div>
                ) : (
                  <div style={{ width: 36, height: 36, borderRadius: 12, background: active ? t.primaryLight : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s' }}>
                    <Icon size={20} color={active ? t.primary : t.textMuted} strokeWidth={active ? 2.5 : 2} />
                  </div>
                )}
                <span style={{ fontSize: 10, fontWeight: 700, color: active ? t.primary : t.textMuted, letterSpacing: 0.2, marginTop: id === 'post' ? 2 : 0 }}>{label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
