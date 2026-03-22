function App() {
  const { useState, useEffect } = React;

  const [isDark, setIsDark] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const [joinedGames, setJoinedGames] = useState(new Set([1]));
  const [currentTime, setCurrentTime] = useState(() => {
    const n = new Date();
    return `${n.getHours()}:${String(n.getMinutes()).padStart(2, '0')}`;
  });

  useEffect(() => {
    const iv = setInterval(() => {
      const n = new Date();
      setCurrentTime(`${n.getHours()}:${String(n.getMinutes()).padStart(2, '0')}`);
    }, 30000);
    return () => clearInterval(iv);
  }, []);

  const themes = {
    dark: {
      bg: '#07090F',
      surface: '#0F1623',
      surfaceElevated: '#18243A',
      surfaceCard: '#1C2B40',
      border: '#253650',
      borderSubtle: '#1A2840',
      primary: '#FF5C28',
      primaryLight: '#FF7D52',
      primaryGlow: 'rgba(255,92,40,0.35)',
      primarySoft: 'rgba(255,92,40,0.12)',
      accent: '#00D4AA',
      accentSoft: 'rgba(0,212,170,0.12)',
      text: '#EEF2F7',
      textSecondary: '#7FA3C0',
      textMuted: '#3D5570',
      success: '#22C55E',
      successSoft: 'rgba(34,197,94,0.15)',
      warning: '#F59E0B',
      warningSoft: 'rgba(245,158,11,0.15)',
      danger: '#EF4444',
      dangerSoft: 'rgba(239,68,68,0.15)',
      info: '#60A5FA',
      infoSoft: 'rgba(96,165,250,0.15)',
      navBg: '#080D18',
      mapBg: '#0A1020',
      mapGrid: '#0F1D30',
      mapBuilding: '#121B2A',
      mapPark: '#0B2218',
    },
    light: {
      bg: '#EEF2F7',
      surface: '#FFFFFF',
      surfaceElevated: '#F5F8FF',
      surfaceCard: '#FFFFFF',
      border: '#DDE4EF',
      borderSubtle: '#EDF2F7',
      primary: '#FF5C28',
      primaryLight: '#FF7D52',
      primaryGlow: 'rgba(255,92,40,0.25)',
      primarySoft: 'rgba(255,92,40,0.1)',
      accent: '#00A896',
      accentSoft: 'rgba(0,168,150,0.1)',
      text: '#0D1F36',
      textSecondary: '#4A6580',
      textMuted: '#9AAFCC',
      success: '#16A34A',
      successSoft: 'rgba(22,163,74,0.1)',
      warning: '#D97706',
      warningSoft: 'rgba(217,119,6,0.1)',
      danger: '#DC2626',
      dangerSoft: 'rgba(220,38,38,0.1)',
      info: '#2563EB',
      infoSoft: 'rgba(37,99,235,0.1)',
      navBg: '#FFFFFF',
      mapBg: '#E5EEFA',
      mapGrid: '#D8E4F0',
      mapBuilding: '#DDE4EF',
      mapPark: '#C8E6C9',
    },
  };

  const T = isDark ? themes.dark : themes.light;

  const sportColors = {
    Basketball: '#FF8C00',
    Tennis: '#84CC16',
    Soccer: '#3B82F6',
    Volleyball: '#A855F7',
    Badminton: '#EC4899',
  };

  const sportEmoji = {
    Basketball: '🏀',
    Tennis: '🎾',
    Soccer: '⚽',
    Volleyball: '🏐',
    Badminton: '🏸',
  };

  const games = [
    { id: 1, sport: 'Basketball', venue: 'Riverside Park', address: '42 Riverside Dr', distance: '0.2 mi', players: 3, maxPlayers: 5, skill: 2, skillLabel: 'Beginner', timeStatus: 'Starts in 15 min', matchScore: 94, status: 'forming', tags: ['3-on-3', 'Casual'], host: 'Marcus T.', px: 56, py: 38 },
    { id: 2, sport: 'Tennis', venue: 'Westside Tennis', address: '15 Court Ave', distance: '0.8 mi', players: 1, maxPlayers: 2, skill: 3, skillLabel: 'Intermediate', timeStatus: 'In progress · 30 min', matchScore: 78, status: 'active', tags: ['Singles', 'Competitive'], host: 'Sarah K.', px: 76, py: 56 },
    { id: 3, sport: 'Soccer', venue: 'Memorial Field', address: '8 Park Blvd', distance: '1.2 mi', players: 8, maxPlayers: 11, skill: 2, skillLabel: 'Mixed', timeStatus: 'In progress · 22 min', matchScore: 65, status: 'active', tags: ['5-a-side', 'Friendly'], host: 'Diego M.', px: 28, py: 66 },
    { id: 4, sport: 'Volleyball', venue: 'Beach Courts', address: '1 Ocean Dr', distance: '0.5 mi', players: 4, maxPlayers: 6, skill: 4, skillLabel: 'Advanced', timeStatus: 'Needs 2 more', matchScore: 55, status: 'forming', tags: ['Beach', '3v3'], host: 'Priya N.', px: 83, py: 30 },
    { id: 5, sport: 'Badminton', venue: 'Lakeside Sports', address: '120 Lake Rd', distance: '1.5 mi', players: 2, maxPlayers: 4, skill: 3, skillLabel: 'Intermediate', timeStatus: 'Starts in 45 min', matchScore: 71, status: 'forming', tags: ['Doubles', 'Casual'], host: 'Chen W.', px: 18, py: 44 },
  ];

  // ── HELPER COMPONENTS ──────────────────────────────────────────────────────

  function SkillDots({ level, color }) {
    return React.createElement('div', { style: { display: 'flex', gap: 3 } },
      [1, 2, 3, 4, 5].map(i =>
        React.createElement('div', {
          key: i,
          style: { width: 6, height: 6, borderRadius: '50%', background: i <= level ? color : T.border },
        })
      )
    );
  }

  function OccupancyBar({ current, max, color }) {
    const pct = (current / max) * 100;
    return React.createElement('div', {
      style: { height: 4, borderRadius: 2, background: T.border, overflow: 'hidden', flex: 1 },
    },
      React.createElement('div', {
        style: {
          height: '100%', width: `${pct}%`,
          background: pct > 80 ? T.warning : pct > 50 ? color : T.success,
          borderRadius: 2, transition: 'width 0.3s ease',
        },
      })
    );
  }

  function MatchBadge({ score }) {
    const color = score >= 80 ? T.success : score >= 60 ? T.accent : T.warning;
    const bg = score >= 80 ? T.successSoft : score >= 60 ? T.accentSoft : T.warningSoft;
    return React.createElement('div', {
      style: { background: bg, color, fontSize: 10, fontWeight: 700, padding: '2px 7px', borderRadius: 8, letterSpacing: '0.02em', whiteSpace: 'nowrap' },
    }, `${score}% match`);
  }

  function Toggle({ value, onChange }) {
    return React.createElement('div', {
      onClick: () => onChange(!value),
      style: {
        width: 40, height: 22, borderRadius: 11,
        background: value ? T.primary : T.border,
        cursor: 'pointer', position: 'relative', transition: 'background 0.2s ease', flexShrink: 0,
      },
    },
      React.createElement('div', {
        style: {
          position: 'absolute', top: 3,
          left: value ? 21 : 3, width: 16, height: 16,
          background: '#FFF', borderRadius: '50%',
          transition: 'left 0.2s ease', boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
        },
      })
    );
  }

  function GameCard({ game }) {
    const isJoined = joinedGames.has(game.id);
    const sc = sportColors[game.sport];
    return React.createElement('div', {
      style: {
        background: T.surfaceCard, borderRadius: 16, padding: '14px 16px', marginBottom: 10,
        border: `1px solid ${T.border}`, position: 'relative', overflow: 'hidden',
      },
    },
      React.createElement('div', {
        style: { position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, borderRadius: '16px 0 0 16px', background: sc },
      }),
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 } },
        React.createElement('div', null,
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 } },
            React.createElement('span', { style: { fontSize: 15 } }, sportEmoji[game.sport]),
            React.createElement('span', { style: { fontWeight: 700, fontSize: 13, color: T.text } }, game.venue),
          ),
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 5, color: T.textSecondary, fontSize: 11 } },
            React.createElement(window.lucide.Navigation, { size: 10, color: T.textMuted }),
            React.createElement('span', null, game.distance),
            React.createElement('span', { style: { color: T.border } }, '·'),
            React.createElement(window.lucide.Clock, { size: 10, color: T.textMuted }),
            React.createElement('span', null, game.timeStatus),
          ),
        ),
        React.createElement(MatchBadge, { score: game.matchScore }),
      ),
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 } },
        React.createElement(SkillDots, { level: game.skill, color: sc }),
        React.createElement('span', { style: { fontSize: 11, color: T.textSecondary, fontWeight: 500 } }, game.skillLabel),
        React.createElement('div', { style: { flex: 1 } }),
        React.createElement('span', { style: { fontSize: 11, color: T.textSecondary, marginRight: 6 } }, `${game.players}/${game.maxPlayers}`),
        React.createElement(OccupancyBar, { current: game.players, max: game.maxPlayers, color: sc }),
      ),
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' } },
        ...game.tags.map(tag =>
          React.createElement('span', {
            key: tag,
            style: { fontSize: 10, fontWeight: 600, padding: '2px 7px', background: T.surfaceElevated, color: T.textSecondary, borderRadius: 6, border: `1px solid ${T.border}` },
          }, tag)
        ),
        React.createElement('div', { style: { flex: 1 } }),
        React.createElement('button', {
          onClick: () => setJoinedGames(prev => {
            const next = new Set(prev);
            isJoined ? next.delete(game.id) : next.add(game.id);
            return next;
          }),
          style: {
            background: isJoined ? T.successSoft : `linear-gradient(135deg, #FF5C28 0%, #FF8C4A 100%)`,
            color: isJoined ? T.success : '#FFF',
            border: isJoined ? `1px solid ${T.success}40` : 'none',
            borderRadius: 10, padding: '6px 14px', fontSize: 12, fontWeight: 700,
            cursor: 'pointer', fontFamily: "'Space Grotesk', sans-serif", transition: 'all 0.2s ease',
          },
        }, isJoined ? '✓ Joined' : 'Join'),
      ),
    );
  }

  function MapView() {
    const W = 335, H = 200;
    return React.createElement('div', {
      style: {
        height: 210, background: T.mapBg, borderRadius: 16, marginBottom: 16,
        position: 'relative', overflow: 'hidden', border: `1px solid ${T.border}`, flexShrink: 0,
      },
    },
      React.createElement('svg', { width: '100%', height: '100%', viewBox: `0 0 ${W} ${H}`, style: { position: 'absolute', inset: 0 } },
        React.createElement('rect', { width: W, height: H, fill: T.mapBg }),
        // Parks
        React.createElement('rect', { x: 42, y: 58, width: 55, height: 42, fill: T.mapPark, rx: 5 }),
        React.createElement('rect', { x: 222, y: 118, width: 75, height: 48, fill: T.mapPark, rx: 5 }),
        React.createElement('rect', { x: 162, y: 18, width: 48, height: 32, fill: T.mapPark, rx: 4 }),
        // Street grid horizontals
        ...[28, 56, 100, 132, 166, 196].map((y, i) =>
          React.createElement('line', { key: `h${i}`, x1: 0, y1: y, x2: W, y2: y, stroke: T.mapGrid, strokeWidth: 8 })
        ),
        // Street grid verticals
        ...[38, 88, 138, 196, 252, 298].map((x, i) =>
          React.createElement('line', { key: `v${i}`, x1: x, y1: 0, x2: x, y2: H, stroke: T.mapGrid, strokeWidth: 8 })
        ),
        // Buildings
        React.createElement('rect', { x: 46, y: 8, width: 34, height: 18, fill: T.mapBuilding, rx: 3 }),
        React.createElement('rect', { x: 100, y: 36, width: 30, height: 14, fill: T.mapBuilding, rx: 3 }),
        React.createElement('rect', { x: 148, y: 62, width: 40, height: 26, fill: T.mapBuilding, rx: 3 }),
        React.createElement('rect', { x: 215, y: 36, width: 35, height: 18, fill: T.mapBuilding, rx: 3 }),
        React.createElement('rect', { x: 264, y: 62, width: 26, height: 24, fill: T.mapBuilding, rx: 3 }),
        React.createElement('rect', { x: 100, y: 142, width: 48, height: 22, fill: T.mapBuilding, rx: 3 }),
        React.createElement('rect', { x: 46, y: 110, width: 34, height: 16, fill: T.mapBuilding, rx: 3 }),
        React.createElement('rect', { x: 264, y: 110, width: 26, height: 20, fill: T.mapBuilding, rx: 3 }),
        // User location pulse
        React.createElement('circle', { cx: 168, cy: 112, r: 18, fill: 'rgba(255,92,40,0.12)' }),
        React.createElement('circle', { cx: 168, cy: 112, r: 10, fill: 'rgba(255,92,40,0.25)' }),
        React.createElement('circle', { cx: 168, cy: 112, r: 6, fill: '#FF5C28', stroke: '#FFF', strokeWidth: 2.5 }),
        // Game pins
        ...games.map(g => {
          const x = g.px / 100 * W;
          const y = g.py / 100 * H;
          const c = sportColors[g.sport];
          return React.createElement('g', { key: g.id },
            React.createElement('circle', { cx: x, cy: y, r: 14, fill: c + '25' }),
            React.createElement('circle', { cx: x, cy: y, r: 8, fill: c, stroke: '#FFF', strokeWidth: 2 }),
          );
        }),
      ),
      React.createElement('div', {
        style: {
          position: 'absolute', bottom: 8, left: 8,
          background: isDark ? 'rgba(7,9,15,0.82)' : 'rgba(255,255,255,0.88)',
          backdropFilter: 'blur(8px)', borderRadius: 10, padding: '5px 10px',
          fontSize: 10, color: T.textSecondary, border: `1px solid ${T.border}`,
          display: 'flex', alignItems: 'center', gap: 5,
        },
      },
        React.createElement('div', { style: { width: 7, height: 7, borderRadius: '50%', background: T.success, flexShrink: 0 } }),
        React.createElement('span', { style: { color: T.text, fontWeight: 700 } }, `${games.length} games`),
        React.createElement('span', null, '· Live'),
      ),
      React.createElement('div', {
        style: {
          position: 'absolute', top: 8, right: 8,
          background: isDark ? 'rgba(7,9,15,0.82)' : 'rgba(255,255,255,0.88)',
          backdropFilter: 'blur(8px)', borderRadius: 8, padding: '5px 8px',
          fontSize: 10, color: T.textSecondary, border: `1px solid ${T.border}`,
          display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer',
        },
      },
        React.createElement(window.lucide.Maximize2, { size: 11, color: T.textSecondary }),
        React.createElement('span', null, 'Full map'),
      ),
      // Sport legend dots
      React.createElement('div', {
        style: {
          position: 'absolute', top: 8, left: 8, display: 'flex', gap: 5,
        },
      },
        Object.entries(sportColors).map(([sport, color]) =>
          React.createElement('div', {
            key: sport,
            title: sport,
            style: {
              width: 20, height: 20, borderRadius: '50%',
              background: isDark ? 'rgba(7,9,15,0.82)' : 'rgba(255,255,255,0.88)',
              backdropFilter: 'blur(8px)',
              border: `1.5px solid ${color}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9,
            },
          }, sportEmoji[sport])
        )
      ),
    );
  }

  // ── SCREENS ────────────────────────────────────────────────────────────────

  function HomeScreen() {
    const [sportFilter, setSportFilter] = useState('All');
    const filters = ['All', '🏀', '🎾', '⚽', '🏐', '🏸'];
    const filterMap = { '🏀': 'Basketball', '🎾': 'Tennis', '⚽': 'Soccer', '🏐': 'Volleyball', '🏸': 'Badminton' };
    const filtered = sportFilter === 'All' ? games : games.filter(g => g.sport === filterMap[sportFilter]);

    return React.createElement('div', { style: { flex: 1, overflowY: 'auto', padding: '12px 16px 0' } },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 } },
        React.createElement('div', null,
          React.createElement('div', { style: { fontSize: 12, color: T.textSecondary, marginBottom: 2 } }, 'Good evening, Alex'),
          React.createElement('div', { style: { fontSize: 20, fontWeight: 800, color: T.text, lineHeight: 1.2 } }, 'Ready to play?'),
        ),
        React.createElement('div', {
          style: {
            background: T.primarySoft, border: `1px solid ${T.primaryGlow}`,
            borderRadius: 12, padding: '6px 12px', display: 'flex', alignItems: 'center', gap: 5,
          },
        },
          React.createElement(window.lucide.Zap, { size: 13, color: T.primary }),
          React.createElement('span', { style: { fontSize: 12, fontWeight: 700, color: T.primary } }, '5 nearby'),
        ),
      ),
      React.createElement(MapView),
      React.createElement('div', { style: { display: 'flex', gap: 7, marginBottom: 14, overflowX: 'auto', paddingBottom: 4 } },
        filters.map(f =>
          React.createElement('button', {
            key: f, onClick: () => setSportFilter(f),
            style: {
              background: sportFilter === f ? T.primary : T.surfaceCard,
              color: sportFilter === f ? '#FFF' : T.textSecondary,
              border: `1px solid ${sportFilter === f ? T.primary : T.border}`,
              borderRadius: 20, padding: '5px 12px',
              fontSize: sportFilter === f ? 11 : 15,
              fontWeight: sportFilter === f ? 700 : 400,
              cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0,
              fontFamily: "'Space Grotesk', sans-serif", transition: 'all 0.15s ease',
            },
          }, f)
        )
      ),
      React.createElement('div', { style: { fontSize: 11, fontWeight: 700, color: T.textSecondary, marginBottom: 10, letterSpacing: '0.06em', textTransform: 'uppercase' } }, 'Nearby Games'),
      ...filtered.map(g => React.createElement(GameCard, { key: g.id, game: g })),
      React.createElement('div', { style: { height: 16 } }),
    );
  }

  function DiscoverScreen() {
    const [query, setQuery] = useState('');
    const [sportF, setSportF] = useState('All');
    const [skillF, setSkillF] = useState('All');
    const allSports = ['All', 'Basketball', 'Tennis', 'Soccer', 'Volleyball', 'Badminton'];
    const skills = ['All', 'Beginner', 'Intermediate', 'Advanced'];
    const filtered = games.filter(g => {
      const ms = sportF === 'All' || g.sport === sportF;
      const mk = skillF === 'All' || g.skillLabel === skillF || g.skillLabel === 'Mixed';
      const mq = !query || g.venue.toLowerCase().includes(query.toLowerCase()) || g.sport.toLowerCase().includes(query.toLowerCase());
      return ms && mk && mq;
    });

    return React.createElement('div', { style: { flex: 1, overflowY: 'auto', padding: '12px 16px 0' } },
      React.createElement('div', { style: { fontSize: 20, fontWeight: 800, color: T.text, marginBottom: 14 } }, 'Find Your Game'),
      React.createElement('div', {
        style: {
          display: 'flex', alignItems: 'center', gap: 10,
          background: T.surfaceCard, border: `1.5px solid ${T.border}`,
          borderRadius: 14, padding: '10px 14px', marginBottom: 12,
        },
      },
        React.createElement(window.lucide.Search, { size: 15, color: T.textMuted }),
        React.createElement('input', {
          placeholder: 'Sport, venue, or area…',
          value: query, onChange: e => setQuery(e.target.value),
          style: {
            flex: 1, background: 'transparent', border: 'none', outline: 'none',
            color: T.text, fontSize: 13, fontFamily: "'Space Grotesk', sans-serif",
          },
        }),
        query && React.createElement('div', { onClick: () => setQuery(''), style: { cursor: 'pointer' } },
          React.createElement(window.lucide.X, { size: 13, color: T.textMuted })
        ),
      ),
      React.createElement('div', { style: { display: 'flex', gap: 6, marginBottom: 8, overflowX: 'auto', paddingBottom: 2 } },
        allSports.map(s =>
          React.createElement('button', {
            key: s, onClick: () => setSportF(s),
            style: {
              background: sportF === s ? T.primary : T.surfaceCard,
              color: sportF === s ? '#FFF' : T.textSecondary,
              border: `1px solid ${sportF === s ? T.primary : T.border}`,
              borderRadius: 20, padding: '5px 11px', fontSize: 11,
              fontWeight: sportF === s ? 700 : 500, cursor: 'pointer',
              whiteSpace: 'nowrap', flexShrink: 0,
              fontFamily: "'Space Grotesk', sans-serif", transition: 'all 0.15s ease',
            },
          }, s)
        )
      ),
      React.createElement('div', { style: { display: 'flex', gap: 6, marginBottom: 12 } },
        skills.map(s =>
          React.createElement('button', {
            key: s, onClick: () => setSkillF(s),
            style: {
              background: skillF === s ? T.accentSoft : 'transparent',
              color: skillF === s ? T.accent : T.textMuted,
              border: `1px solid ${skillF === s ? T.accent : T.border}`,
              borderRadius: 8, padding: '4px 10px', fontSize: 10, fontWeight: 600,
              cursor: 'pointer', transition: 'all 0.15s ease',
              fontFamily: "'Space Grotesk', sans-serif",
            },
          }, s)
        )
      ),
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: T.textSecondary, marginBottom: 10 } },
        React.createElement(window.lucide.Filter, { size: 11, color: T.textMuted }),
        `${filtered.length} game${filtered.length !== 1 ? 's' : ''} found`,
      ),
      filtered.length === 0
        ? React.createElement('div', { style: { textAlign: 'center', padding: '40px 20px', color: T.textSecondary } },
            React.createElement('div', { style: { fontSize: 36, marginBottom: 10 } }, '🔍'),
            React.createElement('div', { style: { fontWeight: 700, color: T.text, marginBottom: 4, fontSize: 14 } }, 'No games found'),
            React.createElement('div', { style: { fontSize: 12 } }, 'Try different filters or check back soon'),
          )
        : React.createElement('div', null, ...filtered.map(g => React.createElement(GameCard, { key: g.id, game: g }))),
      React.createElement('div', { style: { height: 16 } }),
    );
  }

  function ActivityScreen() {
    const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
    const activity = [3, 1, 4, 2, 5, 8, 6];
    const maxA = 8;
    const stats = [
      { label: 'Games', value: '14', icon: window.lucide.Trophy, color: T.primary },
      { label: 'Hours', value: '18.5h', icon: window.lucide.Clock, color: T.accent },
      { label: 'Win Rate', value: '67%', icon: window.lucide.TrendingUp, color: T.success },
      { label: 'Streak', value: '5 🔥', icon: window.lucide.Zap, color: T.warning },
    ];
    const recommended = [
      { sport: '🏀', name: 'Basketball', venue: 'Riverside Park', time: 'Tue & Thu · 6–8 PM', rel: 92 },
      { sport: '🏸', name: 'Badminton', venue: 'Lakeside Sports', time: 'Sat · 10 AM–12 PM', rel: 85 },
    ];
    const recent = [
      { sport: '🏀', venue: 'Riverside Park', date: 'Today', result: 'Won', gain: '+0.2' },
      { sport: '⚽', venue: 'Memorial Field', date: 'Yesterday', result: 'Lost', gain: '+0.1' },
      { sport: '🎾', venue: 'Westside Tennis', date: 'Mar 21', result: 'Won', gain: '+0.3' },
      { sport: '🏐', venue: 'Beach Courts', date: 'Mar 19', result: 'Won', gain: '+0.4' },
    ];

    return React.createElement('div', { style: { flex: 1, overflowY: 'auto', padding: '12px 16px 0' } },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 14 } },
        React.createElement('div', null,
          React.createElement('div', { style: { fontSize: 20, fontWeight: 800, color: T.text } }, 'Your Activity'),
          React.createElement('div', { style: { fontSize: 11, color: T.textSecondary, marginTop: 2 } }, 'March 2026'),
        ),
        React.createElement('div', { style: { background: T.successSoft, color: T.success, fontSize: 10, fontWeight: 700, padding: '4px 10px', borderRadius: 8 } }, 'On track'),
      ),
      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 12 } },
        stats.map((s, i) =>
          React.createElement('div', {
            key: i,
            style: { background: T.surfaceCard, borderRadius: 14, padding: '12px 14px', border: `1px solid ${T.border}` },
          },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 5, marginBottom: 6 } },
              React.createElement(s.icon, { size: 13, color: s.color }),
              React.createElement('span', { style: { fontSize: 10, color: T.textSecondary, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' } }, s.label),
            ),
            React.createElement('div', { style: { fontSize: 22, fontWeight: 800, color: T.text } }, s.value),
          )
        )
      ),
      React.createElement('div', {
        style: { background: T.surfaceCard, borderRadius: 14, padding: '14px', border: `1px solid ${T.border}`, marginBottom: 12 },
      },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 } },
          React.createElement('span', { style: { fontSize: 12, fontWeight: 700, color: T.text } }, 'This Week'),
          React.createElement('span', { style: { fontSize: 11, color: T.primary, fontWeight: 600 } }, '5 games played'),
        ),
        React.createElement('div', { style: { display: 'flex', gap: 6, alignItems: 'flex-end', height: 64 } },
          days.map((d, i) => {
            const pct = (activity[i] / maxA) * 100;
            const isToday = i === 5;
            return React.createElement('div', {
              key: i, style: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, height: '100%' },
            },
              React.createElement('div', { style: { flex: 1, display: 'flex', alignItems: 'flex-end', width: '100%' } },
                React.createElement('div', {
                  style: {
                    width: '100%', borderRadius: 4,
                    background: isToday ? T.primary : (pct > 0 ? (isDark ? '#1F4A6E' : '#B8D4F0') : T.border),
                    height: `${Math.max(pct, pct > 0 ? 15 : 6)}%`,
                    transition: 'height 0.3s ease',
                  },
                })
              ),
              React.createElement('span', { style: { fontSize: 9, color: isToday ? T.primary : T.textMuted, fontWeight: isToday ? 700 : 400 } }, d),
            );
          })
        ),
      ),
      React.createElement('div', { style: { fontSize: 11, fontWeight: 700, color: T.textSecondary, marginBottom: 8, letterSpacing: '0.06em', textTransform: 'uppercase' } }, 'Best Times to Play'),
      ...recommended.map((r, i) =>
        React.createElement('div', {
          key: i,
          style: { background: T.surfaceCard, borderRadius: 12, padding: '11px 14px', border: `1px solid ${T.border}`, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 10 },
        },
          React.createElement('span', { style: { fontSize: 20 } }, r.sport),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', { style: { fontWeight: 700, fontSize: 12, color: T.text } }, `${r.name} · ${r.venue}`),
            React.createElement('div', { style: { fontSize: 11, color: T.textSecondary, marginTop: 2 } }, r.time),
          ),
          React.createElement('div', { style: { background: T.successSoft, color: T.success, fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: 8 } }, `${r.rel}%`),
        )
      ),
      React.createElement('div', { style: { fontSize: 11, fontWeight: 700, color: T.textSecondary, margin: '12px 0 8px', letterSpacing: '0.06em', textTransform: 'uppercase' } }, 'Recent Games'),
      ...recent.map((g, i) =>
        React.createElement('div', {
          key: i,
          style: { background: T.surfaceCard, borderRadius: 12, padding: '10px 14px', border: `1px solid ${T.border}`, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 10 },
        },
          React.createElement('span', { style: { fontSize: 18 } }, g.sport),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', { style: { fontWeight: 600, fontSize: 12, color: T.text } }, g.venue),
            React.createElement('div', { style: { fontSize: 10, color: T.textMuted, marginTop: 2 } }, g.date),
          ),
          React.createElement('div', { style: { background: g.result === 'Won' ? T.successSoft : T.dangerSoft, color: g.result === 'Won' ? T.success : T.danger, fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 7, marginRight: 4 } }, g.result),
          React.createElement('div', { style: { fontSize: 11, color: T.accent, fontWeight: 700 } }, g.gain),
        )
      ),
      React.createElement('div', { style: { height: 16 } }),
    );
  }

  function ProfileScreen() {
    const [notifs, setNotifs] = useState(true);
    const [smartMatch, setSmartMatch] = useState(true);
    const [locationShare, setLocationShare] = useState(true);
    const sportSkills = [
      { sport: '🏀 Basketball', level: 2, label: 'Beginner', color: '#FF8C00' },
      { sport: '🎾 Tennis', level: 3, label: 'Intermediate', color: '#84CC16' },
      { sport: '⚽ Soccer', level: 2, label: 'Beginner', color: '#3B82F6' },
      { sport: '🏐 Volleyball', level: 4, label: 'Advanced', color: '#A855F7' },
    ];

    return React.createElement('div', { style: { flex: 1, overflowY: 'auto', padding: '12px 16px 0' } },
      React.createElement('div', {
        style: {
          background: T.surfaceCard, borderRadius: 16, padding: '18px 18px 16px',
          border: `1px solid ${T.border}`, marginBottom: 12,
          display: 'flex', alignItems: 'center', gap: 14, position: 'relative', overflow: 'hidden',
        },
      },
        React.createElement('div', {
          style: {
            position: 'absolute', top: 0, right: 0, width: 120, height: 80,
            background: `radial-gradient(circle at top right, ${T.primaryGlow}, transparent 70%)`,
          },
        }),
        React.createElement('div', {
          style: {
            width: 56, height: 56, borderRadius: '50%', flexShrink: 0,
            background: 'linear-gradient(135deg, #FF5C28 0%, #FF8C4A 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 20, fontWeight: 800, color: '#FFF',
          },
        }, 'AJ'),
        React.createElement('div', { style: { flex: 1 } },
          React.createElement('div', { style: { fontWeight: 800, fontSize: 15, color: T.text } }, 'Alex Johnson'),
          React.createElement('div', { style: { fontSize: 11, color: T.textSecondary, marginTop: 2 } }, '📍 Downtown · Member since 2024'),
          React.createElement('div', { style: { display: 'flex', gap: 6, marginTop: 8 } },
            React.createElement('span', { style: { background: T.primarySoft, color: T.primary, fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 6 } }, 'Level 12'),
            React.createElement('span', { style: { background: T.successSoft, color: T.success, fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 6 } }, '142 games'),
            React.createElement('span', { style: { background: T.accentSoft, color: T.accent, fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 6 } }, 'Top 8%'),
          ),
        ),
      ),
      React.createElement('div', {
        style: { background: T.surfaceCard, borderRadius: 14, padding: '14px 16px', border: `1px solid ${T.border}`, marginBottom: 12 },
      },
        React.createElement('div', { style: { fontSize: 11, fontWeight: 700, color: T.textSecondary, marginBottom: 12, letterSpacing: '0.06em', textTransform: 'uppercase' } }, 'Sport Skills'),
        ...sportSkills.map((s, i) =>
          React.createElement('div', {
            key: i, style: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: i < sportSkills.length - 1 ? 10 : 0 },
          },
            React.createElement('span', { style: { fontSize: 14, width: 20 } }, s.sport.split(' ')[0]),
            React.createElement('span', { style: { flex: 1, fontSize: 12, color: T.text, fontWeight: 600 } }, s.sport.split(' ').slice(1).join(' ')),
            React.createElement(SkillDots, { level: s.level, color: s.color }),
            React.createElement('span', { style: { fontSize: 10, color: T.textMuted, width: 70, textAlign: 'right' } }, s.label),
          )
        ),
      ),
      React.createElement('div', {
        style: { background: T.surfaceCard, borderRadius: 14, padding: '14px 16px', border: `1px solid ${T.border}`, marginBottom: 12 },
      },
        React.createElement('div', { style: { fontSize: 11, fontWeight: 700, color: T.textSecondary, marginBottom: 12, letterSpacing: '0.06em', textTransform: 'uppercase' } }, 'Preferences'),
        [
          { icon: isDark ? window.lucide.Moon : window.lucide.Sun, label: isDark ? 'Dark Mode' : 'Light Mode', color: T.primary, value: isDark, onChange: setIsDark },
          { icon: window.lucide.Bell, label: 'Game Alerts', color: T.accent, value: notifs, onChange: setNotifs },
          { icon: window.lucide.Target, label: 'AI Skill Matching', color: T.info, value: smartMatch, onChange: setSmartMatch },
          { icon: window.lucide.Navigation, label: 'Location Sharing', color: T.success, value: locationShare, onChange: setLocationShare },
        ].map((item, i, arr) =>
          React.createElement('div', {
            key: i,
            style: {
              display: 'flex', alignItems: 'center', gap: 10, paddingBottom: i < arr.length - 1 ? 12 : 0,
              marginBottom: i < arr.length - 1 ? 12 : 0,
              borderBottom: i < arr.length - 1 ? `1px solid ${T.borderSubtle}` : 'none',
            },
          },
            React.createElement(item.icon, { size: 15, color: item.color }),
            React.createElement('span', { style: { flex: 1, fontSize: 12, color: T.text, fontWeight: 600 } }, item.label),
            React.createElement(Toggle, { value: item.value, onChange: item.onChange }),
          )
        ),
      ),
      React.createElement('div', {
        style: { background: T.surfaceCard, borderRadius: 14, border: `1px solid ${T.border}`, overflow: 'hidden', marginBottom: 16 },
      },
        [
          { icon: window.lucide.Users, label: 'Friends & Following', sub: '23 friends', color: T.accent },
          { icon: window.lucide.Star, label: 'Favorite Venues', sub: '4 saved', color: T.warning },
          { icon: window.lucide.Settings, label: 'Account Settings', sub: null, color: T.textSecondary },
        ].map((item, i, arr) =>
          React.createElement('div', {
            key: i,
            style: {
              display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px',
              borderBottom: i < arr.length - 1 ? `1px solid ${T.borderSubtle}` : 'none',
              cursor: 'pointer',
            },
          },
            React.createElement('div', {
              style: { width: 32, height: 32, borderRadius: 10, background: T.surfaceElevated, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
            }, React.createElement(item.icon, { size: 15, color: item.color })),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', { style: { fontSize: 12, color: T.text, fontWeight: 600 } }, item.label),
              item.sub && React.createElement('div', { style: { fontSize: 10, color: T.textMuted, marginTop: 1 } }, item.sub),
            ),
            React.createElement(window.lucide.ChevronRight, { size: 14, color: T.textMuted }),
          )
        )
      ),
    );
  }

  // ── NAVIGATION ─────────────────────────────────────────────────────────────

  const tabs = [
    { id: 'home', label: 'Home', icon: window.lucide.MapPin },
    { id: 'discover', label: 'Discover', icon: window.lucide.Search },
    { id: 'activity', label: 'Activity', icon: window.lucide.Activity },
    { id: 'profile', label: 'Profile', icon: window.lucide.User },
  ];

  const screens = {
    home: HomeScreen,
    discover: DiscoverScreen,
    activity: ActivityScreen,
    profile: ProfileScreen,
  };

  // ── RENDER ─────────────────────────────────────────────────────────────────

  return React.createElement('div', {
    style: {
      minHeight: '100vh',
      background: isDark ? '#111827' : '#D1D9E6',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: "'Space Grotesk', sans-serif",
    },
  },
    React.createElement('style', null, `
      @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&display=swap');
      * { box-sizing: border-box; margin: 0; padding: 0; }
      ::-webkit-scrollbar { display: none; }
      input::placeholder { color: ${T.textMuted}; }
      button { cursor: pointer; font-family: 'Space Grotesk', sans-serif; }
      @keyframes rallyPulse {
        0%,100% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.3); opacity: 0.5; }
      }
    `),
    React.createElement('div', {
      style: {
        width: 375, height: 812,
        background: T.bg,
        borderRadius: 50, overflow: 'hidden',
        boxShadow: isDark
          ? '0 40px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.06), inset 0 0 0 1px rgba(255,255,255,0.04)'
          : '0 40px 100px rgba(0,0,0,0.25), 0 0 0 1px rgba(0,0,0,0.08)',
        display: 'flex', flexDirection: 'column',
        border: isDark ? '2px solid rgba(255,255,255,0.1)' : '2px solid rgba(0,0,0,0.08)',
        position: 'relative',
      },
    },
      // Status bar
      React.createElement('div', {
        style: {
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '14px 24px 0',
          fontSize: 13, fontWeight: 700, color: T.text,
          flexShrink: 0, position: 'relative', zIndex: 10,
        },
      },
        React.createElement('span', null, currentTime),
        React.createElement('div', {
          style: {
            width: 120, height: 34, background: '#000', borderRadius: 20,
            position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: 10,
          },
        }),
        React.createElement('div', { style: { display: 'flex', gap: 5, alignItems: 'center' } },
          React.createElement(window.lucide.Wifi, { size: 13, color: T.text }),
          React.createElement(window.lucide.Battery, { size: 16, color: T.text }),
        ),
      ),

      // Screen content
      React.createElement('div', { style: { flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', marginTop: 6 } },
        React.createElement(screens[activeTab])
      ),

      // Bottom navigation
      React.createElement('div', {
        style: {
          display: 'flex', background: T.navBg,
          borderTop: `1px solid ${T.border}`,
          padding: '8px 0 20px', flexShrink: 0,
        },
      },
        tabs.map(tab =>
          React.createElement('div', {
            key: tab.id,
            onClick: () => setActiveTab(tab.id),
            style: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, cursor: 'pointer', padding: '2px 0' },
          },
            React.createElement('div', {
              style: {
                padding: '5px 12px', borderRadius: 12,
                background: activeTab === tab.id ? T.primarySoft : 'transparent',
                transition: 'background 0.15s ease',
              },
            },
              React.createElement(tab.icon, { size: 22, color: activeTab === tab.id ? T.primary : T.textMuted }),
            ),
            React.createElement('span', {
              style: {
                fontSize: 10, fontWeight: activeTab === tab.id ? 700 : 500,
                color: activeTab === tab.id ? T.primary : T.textMuted,
                letterSpacing: '0.02em',
              },
            }, tab.label),
          )
        )
      ),
    ),
  );
}
