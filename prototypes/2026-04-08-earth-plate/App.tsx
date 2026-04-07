const { useState, useEffect, useRef, useCallback } = React;

function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [isDark, setIsDark] = useState(true);
  const [animReady, setAnimReady] = useState(false);
  const [streakDay, setStreakDay] = useState(12);
  const [activeGuild, setActiveGuild] = useState(null);
  const [journalExpanded, setJournalExpanded] = useState(null);
  const [mapFilter, setMapFilter] = useState('all');
  const [pressedBtn, setPressedBtn] = useState(null);

  useEffect(() => {
    setTimeout(() => setAnimReady(true), 100);
  }, []);

  useEffect(() => {
    setAnimReady(false);
    setTimeout(() => setAnimReady(true), 50);
  }, [activeScreen]);

  const themes = {
    dark: {
      bg: '#1A0A0A',
      surface: '#2A1515',
      surfaceAlt: '#3A2020',
      card: '#2E1818',
      cardAlt: '#3D2222',
      text: '#FEF2F2',
      textSecondary: '#F5BCBC',
      textMuted: '#C08080',
      primary: '#DC2626',
      secondary: '#F87171',
      cta: '#CA8A04',
      ctaText: '#1A0A0A',
      border: '#4A2A2A',
      navBg: '#1A0A0A',
      navBorder: '#3A2020',
      overlay: 'rgba(26,10,10,0.85)',
      streakBg: 'linear-gradient(135deg, #DC2626 0%, #991B1B 100%)',
      accentGlow: 'rgba(220,38,38,0.15)',
    },
    light: {
      bg: '#FEF2F2',
      surface: '#FFFFFF',
      surfaceAlt: '#FFF5F5',
      card: '#FFFFFF',
      cardAlt: '#FEE2E2',
      text: '#1A0A0A',
      textSecondary: '#6B2121',
      textMuted: '#9A5050',
      primary: '#DC2626',
      secondary: '#F87171',
      cta: '#CA8A04',
      ctaText: '#FFFFFF',
      border: '#FECACA',
      navBg: '#FFFFFF',
      navBorder: '#FEE2E2',
      overlay: 'rgba(254,242,242,0.9)',
      streakBg: 'linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)',
      accentGlow: 'rgba(220,38,38,0.08)',
    }
  };

  const t = isDark ? themes.dark : themes.light;
  const font = "-apple-system, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif";

  const icons = window.lucide || {};
  const createIcon = (IconComp, size = 24, color = t.text, props = {}) => {
    if (!IconComp) return null;
    return React.createElement(IconComp, { size, color, strokeWidth: 1.8, ...props });
  };

  // Style tag for animations
  const styleTag = React.createElement('style', null, `
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes slideInRight {
      from { opacity: 0; transform: translateX(30px); }
      to { opacity: 1; transform: translateX(0); }
    }
    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.05); }
    }
    @keyframes shimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }
    @keyframes streakFire {
      0%, 100% { transform: translateY(0) scale(1); opacity: 1; }
      50% { transform: translateY(-3px) scale(1.1); opacity: 0.8; }
    }
    @keyframes rotateIn {
      from { opacity: 0; transform: rotate(-10deg) scale(0.9); }
      to { opacity: 1; transform: rotate(0deg) scale(1); }
    }
    @keyframes countUp {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `);

  const animStyle = (delay = 0) => ({
    animation: animReady ? `fadeInUp 0.5s ease ${delay}s both` : 'none',
  });

  const slideStyle = (delay = 0) => ({
    animation: animReady ? `slideInRight 0.4s ease ${delay}s both` : 'none',
  });

  // =============== HOME SCREEN ===============
  function HomeScreen() {
    const weekDays = ['M','T','W','T','F','S','S'];
    const streakData = [true, true, true, true, true, false, false];
    const seasonalIngredients = [
      { name: 'Ramps', season: 'Spring', origin: 'Blue Ridge Mountains', pts: 45, color: '#4ADE80' },
      { name: 'Morel Mushrooms', season: 'Spring', origin: 'Ozark Forest Floor', pts: 60, color: '#A78BFA' },
      { name: 'Fiddlehead Ferns', season: 'Spring', origin: 'New England Riverbanks', pts: 35, color: '#34D399' },
    ];
    const recentActivity = [
      { user: 'MariaG', action: 'discovered Wild Garlic at Elm Creek Farm', time: '2h ago', pts: 25 },
      { user: 'ChefTomas', action: 'completed the Spring Forager quest', time: '4h ago', pts: 100 },
      { user: 'LocalLisa', action: 'added River Valley Honey to the Atlas', time: '6h ago', pts: 40 },
    ];

    return React.createElement('div', { style: { padding: '20px 16px 100px', minHeight: '100%' } },
      // Header
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, ...animStyle(0) } },
        React.createElement('div', null,
          React.createElement('div', { style: { fontSize: 15, fontWeight: 500, color: t.textMuted, fontFamily: font, letterSpacing: 0.3 } }, 'Good morning, Alex'),
          React.createElement('div', { style: { fontSize: 34, fontWeight: 800, color: t.text, fontFamily: font, letterSpacing: -0.5 } }, 'Earth Plate'),
        ),
        React.createElement('div', {
          onClick: () => setIsDark(!isDark),
          style: { width: 44, height: 44, borderRadius: 22, background: t.surfaceAlt, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: `1px solid ${t.border}`, transition: 'all 0.2s ease' }
        }, createIcon(isDark ? icons.Sun : icons.Moon, 20, t.textSecondary))
      ),

      // Streak Card
      React.createElement('div', { style: { background: t.streakBg, borderRadius: 20, padding: '20px 20px 16px', marginBottom: 20, position: 'relative', overflow: 'hidden', boxShadow: '0 8px 32px rgba(220,38,38,0.3)', ...animStyle(0.1) } },
        React.createElement('div', { style: { position: 'absolute', top: -20, right: -20, width: 100, height: 100, borderRadius: 50, background: 'rgba(255,255,255,0.08)' } }),
        React.createElement('div', { style: { position: 'absolute', bottom: -30, left: 40, width: 80, height: 80, borderRadius: 40, background: 'rgba(255,255,255,0.05)' } }),
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16, position: 'relative', zIndex: 1 } },
          React.createElement('div', null,
            React.createElement('div', { style: { fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.7)', fontFamily: font, textTransform: 'uppercase', letterSpacing: 1 } }, 'Terroir Streak'),
            React.createElement('div', { style: { fontSize: 48, fontWeight: 800, color: '#FFF', fontFamily: font, letterSpacing: -1, lineHeight: 1.1, animation: 'countUp 0.6s ease both' } }, `${streakDay} days`),
          ),
          React.createElement('div', { style: { animation: 'streakFire 1.5s ease infinite' } },
            createIcon(icons.Flame, 40, '#FDE047')
          )
        ),
        React.createElement('div', { style: { display: 'flex', gap: 8, position: 'relative', zIndex: 1 } },
          weekDays.map((d, i) => React.createElement('div', { key: i, style: { flex: 1, textAlign: 'center' } },
            React.createElement('div', { style: { width: 36, height: 36, borderRadius: 12, background: streakData[i] ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 4px', border: streakData[i] ? '2px solid rgba(255,255,255,0.4)' : '2px solid transparent' } },
              streakData[i] ? createIcon(icons.Check, 16, '#FFF') : null
            ),
            React.createElement('div', { style: { fontSize: 11, color: 'rgba(255,255,255,0.6)', fontFamily: font, fontWeight: 600 } }, d)
          ))
        )
      ),

      // Today's Challenge
      React.createElement('div', { style: { marginBottom: 20, ...animStyle(0.2) } },
        React.createElement('div', { style: { fontSize: 22, fontWeight: 700, color: t.text, fontFamily: font, letterSpacing: -0.3, marginBottom: 12 } }, "Today's Challenge"),
        React.createElement('div', {
          style: { background: t.card, borderRadius: 16, padding: 16, border: `1px solid ${t.border}`, display: 'flex', gap: 14, alignItems: 'center', cursor: 'pointer', transition: 'all 0.2s ease', transform: pressedBtn === 'challenge' ? 'scale(0.98)' : 'scale(1)' },
          onMouseDown: () => setPressedBtn('challenge'),
          onMouseUp: () => setPressedBtn(null),
          onMouseLeave: () => setPressedBtn(null),
        },
          React.createElement('div', { style: { width: 56, height: 56, borderRadius: 16, background: 'linear-gradient(135deg, #4ADE80, #16A34A)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 } },
            createIcon(icons.Leaf, 28, '#FFF')
          ),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', { style: { fontSize: 17, fontWeight: 700, color: t.text, fontFamily: font } }, 'Cook with Spring Ramps'),
            React.createElement('div', { style: { fontSize: 13, color: t.textMuted, fontFamily: font, marginTop: 2 } }, 'Find and cook with wild ramps from a local source'),
          ),
          React.createElement('div', { style: { background: `${t.cta}22`, borderRadius: 10, padding: '6px 10px' } },
            React.createElement('div', { style: { fontSize: 15, fontWeight: 700, color: t.cta, fontFamily: font } }, '+45 pts')
          )
        )
      ),

      // Seasonal Ingredients
      React.createElement('div', { style: { marginBottom: 20, ...animStyle(0.3) } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 } },
          React.createElement('div', { style: { fontSize: 22, fontWeight: 700, color: t.text, fontFamily: font, letterSpacing: -0.3 } }, 'In Season Now'),
          React.createElement('div', { style: { fontSize: 15, fontWeight: 600, color: t.primary, fontFamily: font, cursor: 'pointer' }, onClick: () => setActiveScreen('explore') }, 'See all')
        ),
        React.createElement('div', { style: { display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 4 } },
          seasonalIngredients.map((ing, i) => React.createElement('div', { key: i, style: { minWidth: 140, background: t.card, borderRadius: 16, padding: 14, border: `1px solid ${t.border}`, cursor: 'pointer', transition: 'all 0.2s ease', animation: animReady ? `slideInRight 0.4s ease ${0.1 * i}s both` : 'none' } },
            React.createElement('div', { style: { width: 40, height: 40, borderRadius: 12, background: `${ing.color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10 } },
              createIcon(icons.Sprout, 20, ing.color)
            ),
            React.createElement('div', { style: { fontSize: 15, fontWeight: 700, color: t.text, fontFamily: font } }, ing.name),
            React.createElement('div', { style: { fontSize: 13, color: t.textMuted, fontFamily: font, marginTop: 2 } }, ing.origin),
            React.createElement('div', { style: { fontSize: 11, fontWeight: 700, color: t.cta, fontFamily: font, marginTop: 6 } }, `+${ing.pts} pts`)
          ))
        )
      ),

      // Community Activity
      React.createElement('div', { style: { ...animStyle(0.4) } },
        React.createElement('div', { style: { fontSize: 22, fontWeight: 700, color: t.text, fontFamily: font, letterSpacing: -0.3, marginBottom: 12 } }, 'Community Feed'),
        recentActivity.map((act, i) => React.createElement('div', { key: i, style: { display: 'flex', gap: 12, alignItems: 'flex-start', padding: '12px 0', borderBottom: i < recentActivity.length - 1 ? `1px solid ${t.border}` : 'none' } },
          React.createElement('div', { style: { width: 40, height: 40, borderRadius: 20, background: `${t.primary}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 } },
            createIcon(icons.User, 18, t.primary)
          ),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', { style: { fontSize: 15, color: t.text, fontFamily: font } },
              React.createElement('span', { style: { fontWeight: 700 } }, act.user),
              ' ',
              act.action
            ),
            React.createElement('div', { style: { fontSize: 13, color: t.textMuted, fontFamily: font, marginTop: 2, display: 'flex', justifyContent: 'space-between' } },
              React.createElement('span', null, act.time),
              React.createElement('span', { style: { color: t.cta, fontWeight: 600 } }, `+${act.pts}`)
            )
          )
        ))
      )
    );
  }

  // =============== EXPLORE / ATLAS SCREEN ===============
  function ExploreScreen() {
    const filters = [
      { id: 'all', label: 'All', icon: icons.LayoutGrid },
      { id: 'farms', label: 'Farms', icon: icons.Tractor },
      { id: 'markets', label: 'Markets', icon: icons.Store },
      { id: 'artisan', label: 'Artisan', icon: icons.ChefHat },
    ];
    const locations = [
      { name: 'Elm Creek Farm', type: 'farms', dist: '3.2 mi', rating: 4.8, reviews: 42, desc: 'Organic heritage vegetables & heirloom tomatoes', tags: ['Organic', 'Seasonal'], color: '#4ADE80' },
      { name: 'River Valley Apiary', type: 'artisan', dist: '5.1 mi', rating: 4.9, reviews: 67, desc: 'Small-batch wildflower honey & beeswax products', tags: ['Raw Honey', 'Artisan'], color: '#F59E0B' },
      { name: 'Saturday Morning Market', type: 'markets', dist: '1.8 mi', rating: 4.7, reviews: 156, desc: '50+ local vendors every Saturday 7am-1pm', tags: ['Weekly', 'Community'], color: '#3B82F6' },
      { name: 'Stone Mill Bakery', type: 'artisan', dist: '2.4 mi', rating: 4.6, reviews: 89, desc: 'Sourdough from locally milled heritage grains', tags: ['Bread', 'Heritage'], color: '#EC4899' },
      { name: 'Whispering Pines Dairy', type: 'farms', dist: '8.7 mi', rating: 4.9, reviews: 34, desc: 'Grass-fed dairy, aged cheeses & fresh butter', tags: ['Dairy', 'Grass-fed'], color: '#8B5CF6' },
    ];

    const filtered = mapFilter === 'all' ? locations : locations.filter(l => l.type === mapFilter);

    return React.createElement('div', { style: { padding: '20px 16px 100px', minHeight: '100%' } },
      React.createElement('div', { style: { fontSize: 34, fontWeight: 800, color: t.text, fontFamily: font, letterSpacing: -0.5, marginBottom: 4, ...animStyle(0) } }, 'Ingredient Atlas'),
      React.createElement('div', { style: { fontSize: 15, color: t.textMuted, fontFamily: font, marginBottom: 16, ...animStyle(0.05) } }, 'Discover local farms, markets & artisans'),

      // Search Bar
      React.createElement('div', { style: { display: 'flex', gap: 10, marginBottom: 16, ...animStyle(0.1) } },
        React.createElement('div', { style: { flex: 1, display: 'flex', alignItems: 'center', gap: 8, background: t.surface, borderRadius: 14, padding: '10px 14px', border: `1px solid ${t.border}` } },
          createIcon(icons.Search, 18, t.textMuted),
          React.createElement('div', { style: { fontSize: 15, color: t.textMuted, fontFamily: font } }, 'Search places...')
        ),
        React.createElement('div', { style: { width: 44, height: 44, borderRadius: 14, background: t.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' } },
          createIcon(icons.SlidersHorizontal, 18, '#FFF')
        )
      ),

      // Map Preview
      React.createElement('div', { style: { background: t.surfaceAlt, borderRadius: 20, height: 180, marginBottom: 16, position: 'relative', overflow: 'hidden', border: `1px solid ${t.border}`, ...animStyle(0.15) } },
        // Fake map grid
        React.createElement('div', { style: { position: 'absolute', inset: 0, opacity: 0.15 } },
          Array.from({ length: 6 }).map((_, i) => React.createElement('div', { key: `h${i}`, style: { position: 'absolute', top: i * 30, left: 0, right: 0, height: 1, background: t.textMuted } })),
          Array.from({ length: 8 }).map((_, i) => React.createElement('div', { key: `v${i}`, style: { position: 'absolute', left: i * 48, top: 0, bottom: 0, width: 1, background: t.textMuted } }))
        ),
        // Map pins
        [{ x: '25%', y: '35%', c: '#4ADE80' }, { x: '55%', y: '25%', c: '#F59E0B' }, { x: '40%', y: '65%', c: '#3B82F6' }, { x: '70%', y: '50%', c: '#EC4899' }, { x: '15%', y: '70%', c: '#8B5CF6' }].map((pin, i) =>
          React.createElement('div', { key: i, style: { position: 'absolute', left: pin.x, top: pin.y, transform: 'translate(-50%,-50%)', animation: `pulse 2s ease ${i * 0.3}s infinite` } },
            React.createElement('div', { style: { width: 24, height: 24, borderRadius: 12, background: pin.c, border: '3px solid white', boxShadow: `0 2px 8px ${pin.c}66` } })
          )
        ),
        React.createElement('div', { style: { position: 'absolute', bottom: 12, left: 12, background: t.overlay, borderRadius: 10, padding: '6px 12px', backdropFilter: 'blur(10px)' } },
          React.createElement('div', { style: { fontSize: 13, fontWeight: 600, color: t.text, fontFamily: font } }, `${filtered.length} places nearby`)
        )
      ),

      // Filter Chips
      React.createElement('div', { style: { display: 'flex', gap: 8, marginBottom: 16, ...animStyle(0.2) } },
        filters.map(f => React.createElement('div', {
          key: f.id,
          onClick: () => setMapFilter(f.id),
          style: { display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', borderRadius: 12, background: mapFilter === f.id ? t.primary : t.surface, border: `1px solid ${mapFilter === f.id ? t.primary : t.border}`, cursor: 'pointer', transition: 'all 0.2s ease' }
        },
          createIcon(f.icon, 14, mapFilter === f.id ? '#FFF' : t.textMuted),
          React.createElement('span', { style: { fontSize: 13, fontWeight: 600, color: mapFilter === f.id ? '#FFF' : t.textSecondary, fontFamily: font } }, f.label)
        ))
      ),

      // Location Cards
      filtered.map((loc, i) => React.createElement('div', {
        key: i,
        style: { background: t.card, borderRadius: 16, padding: 16, marginBottom: 12, border: `1px solid ${t.border}`, cursor: 'pointer', transition: 'all 0.2s ease', transform: pressedBtn === `loc-${i}` ? 'scale(0.98)' : 'scale(1)', ...animStyle(0.2 + i * 0.08) },
        onMouseDown: () => setPressedBtn(`loc-${i}`),
        onMouseUp: () => setPressedBtn(null),
        onMouseLeave: () => setPressedBtn(null),
      },
        React.createElement('div', { style: { display: 'flex', gap: 14 } },
          React.createElement('div', { style: { width: 52, height: 52, borderRadius: 14, background: `${loc.color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 } },
            createIcon(icons.MapPin, 24, loc.color)
          ),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' } },
              React.createElement('div', { style: { fontSize: 17, fontWeight: 700, color: t.text, fontFamily: font } }, loc.name),
              React.createElement('div', { style: { fontSize: 13, color: t.textMuted, fontFamily: font } }, loc.dist)
            ),
            React.createElement('div', { style: { fontSize: 14, color: t.textSecondary, fontFamily: font, marginTop: 3, lineHeight: 1.4 } }, loc.desc),
            React.createElement('div', { style: { display: 'flex', gap: 8, marginTop: 8, alignItems: 'center' } },
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 3 } },
                createIcon(icons.Star, 13, '#F59E0B'),
                React.createElement('span', { style: { fontSize: 13, fontWeight: 600, color: t.text, fontFamily: font } }, loc.rating)
              ),
              React.createElement('span', { style: { fontSize: 13, color: t.textMuted, fontFamily: font } }, `(${loc.reviews})`),
              React.createElement('div', { style: { flex: 1 } }),
              loc.tags.map((tag, j) => React.createElement('span', { key: j, style: { fontSize: 11, fontWeight: 600, color: t.primary, background: `${t.primary}15`, borderRadius: 6, padding: '3px 8px', fontFamily: font } }, tag))
            )
          )
        )
      ))
    );
  }

  // =============== JOURNAL SCREEN ===============
  function JournalScreen() {
    const entries = [
      { id: 0, ingredient: 'Wild Garlic', origin: 'Elm Creek Farm', date: 'Apr 6', flavor: 'Pungent, bright garlic with grassy undertones', texture: 'Tender leaves, crisp stems', notes: 'Found growing along the creek bed. Best sauteed quickly with butter. The flowers make a beautiful garnish.', color: '#4ADE80', pts: 30 },
      { id: 1, ingredient: 'Sourdough Starter Culture', origin: 'Stone Mill Bakery', date: 'Apr 4', flavor: 'Complex tang with malty sweetness', texture: 'Bubbly, elastic, alive', notes: 'Chef Marcus shared his 15-year-old culture. Fed with local heritage wheat. Makes incredibly open crumb.', color: '#F59E0B', pts: 20 },
      { id: 2, ingredient: 'River Valley Honey', origin: 'River Valley Apiary', date: 'Apr 2', flavor: 'Floral, hints of clover and wildflower meadow', texture: 'Thick, crystallized edges, smooth center', notes: 'Spring harvest from hives near the wildflower fields. Darker than summer batch, with deeper caramel notes.', color: '#EC4899', pts: 25 },
      { id: 3, ingredient: 'Purple Carrots', origin: 'Saturday Morning Market', date: 'Mar 30', flavor: 'Earthy sweetness with slight berry undertone', texture: 'Dense, snappy when raw, silky when roasted', notes: 'Heritage variety from the Hendricks family farm. The purple pigment bleeds beautifully into soups.', color: '#8B5CF6', pts: 15 },
    ];

    const totalEntries = entries.length;
    const totalPts = entries.reduce((s, e) => s + e.pts, 0);

    return React.createElement('div', { style: { padding: '20px 16px 100px', minHeight: '100%' } },
      React.createElement('div', { style: { fontSize: 34, fontWeight: 800, color: t.text, fontFamily: font, letterSpacing: -0.5, marginBottom: 4, ...animStyle(0) } }, 'Flavor Journal'),
      React.createElement('div', { style: { fontSize: 15, color: t.textMuted, fontFamily: font, marginBottom: 20, ...animStyle(0.05) } }, 'Your personal taste compendium'),

      // Stats Row
      React.createElement('div', { style: { display: 'flex', gap: 12, marginBottom: 20, ...animStyle(0.1) } },
        [
          { label: 'Entries', value: totalEntries, icon: icons.BookOpen, color: t.primary },
          { label: 'Points', value: totalPts, icon: icons.Award, color: t.cta },
          { label: 'Unique', value: totalEntries, icon: icons.Fingerprint, color: '#8B5CF6' },
        ].map((s, i) => React.createElement('div', { key: i, style: { flex: 1, background: t.card, borderRadius: 14, padding: 14, border: `1px solid ${t.border}`, textAlign: 'center' } },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'center', marginBottom: 6 } },
            createIcon(s.icon, 18, s.color)
          ),
          React.createElement('div', { style: { fontSize: 22, fontWeight: 800, color: t.text, fontFamily: font } }, s.value),
          React.createElement('div', { style: { fontSize: 11, fontWeight: 600, color: t.textMuted, fontFamily: font, textTransform: 'uppercase', letterSpacing: 0.5 } }, s.label)
        ))
      ),

      // Add Entry Button
      React.createElement('div', {
        style: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: t.primary, borderRadius: 14, padding: '14px 20px', marginBottom: 20, cursor: 'pointer', transition: 'all 0.2s ease', transform: pressedBtn === 'addEntry' ? 'scale(0.97)' : 'scale(1)', boxShadow: `0 4px 16px ${t.primary}44`, ...animStyle(0.15) },
        onMouseDown: () => setPressedBtn('addEntry'),
        onMouseUp: () => setPressedBtn(null),
        onMouseLeave: () => setPressedBtn(null),
      },
        createIcon(icons.Plus, 20, '#FFF'),
        React.createElement('span', { style: { fontSize: 17, fontWeight: 700, color: '#FFF', fontFamily: font } }, 'New Journal Entry')
      ),

      // Journal Entries
      entries.map((entry, i) => React.createElement('div', {
        key: entry.id,
        style: { background: t.card, borderRadius: 16, marginBottom: 12, border: `1px solid ${t.border}`, overflow: 'hidden', transition: 'all 0.3s ease', ...animStyle(0.2 + i * 0.08) },
      },
        React.createElement('div', {
          onClick: () => setJournalExpanded(journalExpanded === entry.id ? null : entry.id),
          style: { padding: 16, cursor: 'pointer', display: 'flex', gap: 14, alignItems: 'center' }
        },
          React.createElement('div', { style: { width: 48, height: 48, borderRadius: 14, background: `${entry.color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 } },
            createIcon(icons.Utensils, 22, entry.color)
          ),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', { style: { fontSize: 17, fontWeight: 700, color: t.text, fontFamily: font } }, entry.ingredient),
            React.createElement('div', { style: { fontSize: 13, color: t.textMuted, fontFamily: font, marginTop: 2 } }, `${entry.origin} · ${entry.date}`),
          ),
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6 } },
            React.createElement('span', { style: { fontSize: 13, fontWeight: 700, color: t.cta, fontFamily: font } }, `+${entry.pts}`),
            React.createElement('div', { style: { transform: journalExpanded === entry.id ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.3s ease' } },
              createIcon(icons.ChevronDown, 18, t.textMuted)
            )
          )
        ),
        journalExpanded === entry.id ? React.createElement('div', { style: { padding: '0 16px 16px', borderTop: `1px solid ${t.border}`, paddingTop: 14, animation: 'fadeInUp 0.3s ease both' } },
          [
            { label: 'Flavor', value: entry.flavor, icon: icons.Droplets },
            { label: 'Texture', value: entry.texture, icon: icons.Layers },
            { label: 'Notes', value: entry.notes, icon: icons.FileText },
          ].map((field, j) => React.createElement('div', { key: j, style: { marginBottom: j < 2 ? 12 : 0 } },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 } },
              createIcon(field.icon, 14, t.primary),
              React.createElement('span', { style: { fontSize: 13, fontWeight: 700, color: t.textSecondary, fontFamily: font, textTransform: 'uppercase', letterSpacing: 0.5 } }, field.label)
            ),
            React.createElement('div', { style: { fontSize: 15, color: t.text, fontFamily: font, lineHeight: 1.5 } }, field.value)
          ))
        ) : null
      ))
    );
  }

  // =============== GUILDS SCREEN ===============
  function GuildsScreen() {
    const guilds = [
      { name: "Forager's Fellowship", members: 48, quests: 3, desc: 'Masters of wild edibles and foraged ingredients', icon: icons.Trees, color: '#4ADE80', level: 'Intermediate', xp: 72 },
      { name: 'Preservation Pioneers', members: 35, quests: 2, desc: 'Fermentation, pickling, and the art of keeping food alive', icon: icons.Beaker, color: '#F59E0B', level: 'Advanced', xp: 85 },
      { name: 'Grain Guild', members: 29, quests: 1, desc: 'Heritage grains, milling, and bread-making traditions', icon: icons.Wheat, color: '#EC4899', level: 'Beginner', xp: 30 },
      { name: 'Root & Tuber Society', members: 22, quests: 2, desc: 'Deep-earth flavors from potatoes to parsnips', icon: icons.Carrot, color: '#8B5CF6', level: 'Intermediate', xp: 55 },
    ];

    const activeQuests = [
      { title: 'Spring Foraging Challenge', guild: "Forager's Fellowship", deadline: '5 days left', progress: 0.65, reward: 200, participants: 23 },
      { title: 'Ferment 5 Vegetables', guild: 'Preservation Pioneers', deadline: '12 days left', progress: 0.4, reward: 150, participants: 18 },
    ];

    return React.createElement('div', { style: { padding: '20px 16px 100px', minHeight: '100%' } },
      React.createElement('div', { style: { fontSize: 34, fontWeight: 800, color: t.text, fontFamily: font, letterSpacing: -0.5, marginBottom: 4, ...animStyle(0) } }, 'Guilds & Quests'),
      React.createElement('div', { style: { fontSize: 15, color: t.textMuted, fontFamily: font, marginBottom: 20, ...animStyle(0.05) } }, 'Join culinary guilds, complete quests together'),

      // Active Quests
      React.createElement('div', { style: { marginBottom: 24, ...animStyle(0.1) } },
        React.createElement('div', { style: { fontSize: 22, fontWeight: 700, color: t.text, fontFamily: font, letterSpacing: -0.3, marginBottom: 12 } }, 'Active Quests'),
        activeQuests.map((q, i) => React.createElement('div', { key: i, style: { background: t.card, borderRadius: 16, padding: 16, marginBottom: 12, border: `1px solid ${t.border}`, position: 'relative', overflow: 'hidden', cursor: 'pointer', transition: 'transform 0.2s ease', transform: pressedBtn === `quest-${i}` ? 'scale(0.98)' : 'scale(1)' },
          onMouseDown: () => setPressedBtn(`quest-${i}`),
          onMouseUp: () => setPressedBtn(null),
          onMouseLeave: () => setPressedBtn(null),
        },
          React.createElement('div', { style: { position: 'absolute', bottom: 0, left: 0, width: `${q.progress * 100}%`, height: 3, background: `linear-gradient(90deg, ${t.primary}, ${t.secondary})`, borderRadius: 2 } }),
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 } },
            React.createElement('div', null,
              React.createElement('div', { style: { fontSize: 17, fontWeight: 700, color: t.text, fontFamily: font } }, q.title),
              React.createElement('div', { style: { fontSize: 13, color: t.textMuted, fontFamily: font, marginTop: 2 } }, q.guild),
            ),
            React.createElement('div', { style: { background: `${t.cta}22`, borderRadius: 8, padding: '4px 10px' } },
              React.createElement('div', { style: { fontSize: 13, fontWeight: 700, color: t.cta, fontFamily: font } }, `${q.reward} pts`)
            )
          ),
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8 } },
              React.createElement('div', { style: { flex: 1, height: 6, background: t.surfaceAlt, borderRadius: 3, width: 140, overflow: 'hidden' } },
                React.createElement('div', { style: { width: `${q.progress * 100}%`, height: '100%', background: `linear-gradient(90deg, ${t.primary}, ${t.secondary})`, borderRadius: 3, transition: 'width 0.5s ease' } })
              ),
              React.createElement('span', { style: { fontSize: 13, fontWeight: 600, color: t.textSecondary, fontFamily: font } }, `${Math.round(q.progress * 100)}%`)
            ),
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
              createIcon(icons.Users, 13, t.textMuted),
              React.createElement('span', { style: { fontSize: 13, color: t.textMuted, fontFamily: font } }, q.participants),
              React.createElement('span', { style: { fontSize: 13, color: t.secondary, fontFamily: font, marginLeft: 8 } }, q.deadline)
            )
          )
        ))
      ),

      // Guilds
      React.createElement('div', { style: { ...animStyle(0.2) } },
        React.createElement('div', { style: { fontSize: 22, fontWeight: 700, color: t.text, fontFamily: font, letterSpacing: -0.3, marginBottom: 12 } }, 'Your Guilds'),
        guilds.map((g, i) => React.createElement('div', {
          key: i,
          onClick: () => setActiveGuild(activeGuild === i ? null : i),
          style: { background: activeGuild === i ? t.cardAlt : t.card, borderRadius: 16, padding: 16, marginBottom: 12, border: `1px solid ${activeGuild === i ? t.primary : t.border}`, cursor: 'pointer', transition: 'all 0.25s ease', ...animStyle(0.25 + i * 0.08) }
        },
          React.createElement('div', { style: { display: 'flex', gap: 14, alignItems: 'center' } },
            React.createElement('div', { style: { width: 52, height: 52, borderRadius: 16, background: `${g.color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: `2px solid ${g.color}44` } },
              createIcon(g.icon, 26, g.color)
            ),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', { style: { fontSize: 17, fontWeight: 700, color: t.text, fontFamily: font } }, g.name),
              React.createElement('div', { style: { fontSize: 13, color: t.textMuted, fontFamily: font, marginTop: 2 } }, g.desc),
              React.createElement('div', { style: { display: 'flex', gap: 12, marginTop: 8, alignItems: 'center' } },
                React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
                  createIcon(icons.Users, 12, t.textMuted),
                  React.createElement('span', { style: { fontSize: 12, color: t.textMuted, fontFamily: font } }, `${g.members} members`)
                ),
                React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
                  createIcon(icons.Target, 12, t.textMuted),
                  React.createElement('span', { style: { fontSize: 12, color: t.textMuted, fontFamily: font } }, `${g.quests} active`)
                ),
                React.createElement('div', { style: { marginLeft: 'auto' } },
                  React.createElement('span', { style: { fontSize: 11, fontWeight: 700, color: g.color, background: `${g.color}15`, borderRadius: 6, padding: '3px 8px', fontFamily: font } }, g.level)
                )
              ),
              // XP bar
              React.createElement('div', { style: { marginTop: 8, height: 4, background: t.surfaceAlt, borderRadius: 2, overflow: 'hidden' } },
                React.createElement('div', { style: { width: `${g.xp}%`, height: '100%', background: g.color, borderRadius: 2, transition: 'width 0.5s ease' } })
              )
            )
          )
        ))
      )
    );
  }

  // =============== LEADERBOARD SCREEN ===============
  function LeaderboardScreen() {
    const leaders = [
      { rank: 1, name: 'ChefTomas', pts: 2840, streak: 45, contributions: 67, badge: 'Master Steward' },
      { rank: 2, name: 'MariaG', pts: 2560, streak: 38, contributions: 52, badge: 'Regional Expert' },
      { rank: 3, name: 'LocalLisa', pts: 2180, streak: 31, contributions: 43, badge: 'Atlas Pioneer' },
      { rank: 4, name: 'FarmFreshAlex', pts: 1920, streak: 28, contributions: 38, badge: 'Guild Leader' },
      { rank: 5, name: 'RootRunner', pts: 1650, streak: 22, contributions: 29, badge: 'Forager' },
      { rank: 6, name: 'SoilSavant', pts: 1420, streak: 19, contributions: 24, badge: 'Apprentice' },
      { rank: 7, name: 'You', pts: 1180, streak: 12, contributions: 18, badge: 'Explorer' },
    ];

    const rankColors = ['#F59E0B', '#94A3B8', '#CD7F32'];

    return React.createElement('div', { style: { padding: '20px 16px 100px', minHeight: '100%' } },
      React.createElement('div', { style: { fontSize: 34, fontWeight: 800, color: t.text, fontFamily: font, letterSpacing: -0.5, marginBottom: 4, ...animStyle(0) } }, 'Leaderboard'),
      React.createElement('div', { style: { fontSize: 15, color: t.textMuted, fontFamily: font, marginBottom: 20, ...animStyle(0.05) } }, "Stewards' Regional Palate Rankings"),

      // Top 3 Podium
      React.createElement('div', { style: { display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 10, marginBottom: 28, paddingTop: 20, ...animStyle(0.1) } },
        // 2nd place
        React.createElement('div', { style: { textAlign: 'center', flex: 1 } },
          React.createElement('div', { style: { width: 56, height: 56, borderRadius: 28, background: `${t.primary}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px', border: `3px solid ${rankColors[1]}` } },
            createIcon(icons.User, 24, rankColors[1])
          ),
          React.createElement('div', { style: { fontSize: 15, fontWeight: 700, color: t.text, fontFamily: font } }, leaders[1].name),
          React.createElement('div', { style: { fontSize: 13, fontWeight: 600, color: rankColors[1], fontFamily: font } }, `${leaders[1].pts} pts`),
          React.createElement('div', { style: { background: `${rankColors[1]}22`, borderRadius: '0 0 12px 12px', height: 60, marginTop: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 12 } },
            React.createElement('span', { style: { fontSize: 28, fontWeight: 800, color: rankColors[1], fontFamily: font } }, '2')
          )
        ),
        // 1st place
        React.createElement('div', { style: { textAlign: 'center', flex: 1 } },
          React.createElement('div', { style: { animation: 'pulse 2s ease infinite', marginBottom: 8 } },
            React.createElement('div', { style: { width: 72, height: 72, borderRadius: 36, background: `${t.primary}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', border: `3px solid ${rankColors[0]}`, boxShadow: `0 0 20px ${rankColors[0]}44` } },
              createIcon(icons.User, 32, rankColors[0])
            ),
          ),
          React.createElement('div', { style: { fontSize: 17, fontWeight: 800, color: t.text, fontFamily: font } }, leaders[0].name),
          React.createElement('div', { style: { fontSize: 15, fontWeight: 700, color: rankColors[0], fontFamily: font } }, `${leaders[0].pts} pts`),
          React.createElement('div', { style: { background: `${rankColors[0]}22`, height: 80, marginTop: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 12 } },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
              createIcon(icons.Crown, 20, rankColors[0]),
              React.createElement('span', { style: { fontSize: 28, fontWeight: 800, color: rankColors[0], fontFamily: font } }, '1')
            )
          )
        ),
        // 3rd place
        React.createElement('div', { style: { textAlign: 'center', flex: 1 } },
          React.createElement('div', { style: { width: 56, height: 56, borderRadius: 28, background: `${t.primary}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px', border: `3px solid ${rankColors[2]}` } },
            createIcon(icons.User, 24, rankColors[2])
          ),
          React.createElement('div', { style: { fontSize: 15, fontWeight: 700, color: t.text, fontFamily: font } }, leaders[2].name),
          React.createElement('div', { style: { fontSize: 13, fontWeight: 600, color: rankColors[2], fontFamily: font } }, `${leaders[2].pts} pts`),
          React.createElement('div', { style: { background: `${rankColors[2]}22`, height: 45, marginTop: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 12 } },
            React.createElement('span', { style: { fontSize: 28, fontWeight: 800, color: rankColors[2], fontFamily: font } }, '3')
          )
        )
      ),

      // Full Rankings List
      React.createElement('div', { style: { ...animStyle(0.2) } },
        leaders.slice(3).map((leader, i) => React.createElement('div', {
          key: i,
          style: { display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px', background: leader.name === 'You' ? `${t.primary}12` : t.card, borderRadius: 14, marginBottom: 8, border: `1px solid ${leader.name === 'You' ? t.primary : t.border}`, transition: 'all 0.2s ease', ...animStyle(0.25 + i * 0.06) }
        },
          React.createElement('div', { style: { width: 32, fontSize: 17, fontWeight: 800, color: t.textMuted, fontFamily: font, textAlign: 'center' } }, `${leader.rank}`),
          React.createElement('div', { style: { width: 40, height: 40, borderRadius: 20, background: `${t.primary}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
            createIcon(icons.User, 18, leader.name === 'You' ? t.primary : t.textMuted)
          ),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', { style: { fontSize: 15, fontWeight: leader.name === 'You' ? 800 : 600, color: leader.name === 'You' ? t.primary : t.text, fontFamily: font } }, leader.name),
            React.createElement('div', { style: { fontSize: 12, color: t.textMuted, fontFamily: font } }, leader.badge),
          ),
          React.createElement('div', { style: { textAlign: 'right' } },
            React.createElement('div', { style: { fontSize: 15, fontWeight: 700, color: t.text, fontFamily: font } }, `${leader.pts}`),
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 3, justifyContent: 'flex-end' } },
              createIcon(icons.Flame, 11, t.secondary),
              React.createElement('span', { style: { fontSize: 12, color: t.textMuted, fontFamily: font } }, `${leader.streak}d`)
            )
          )
        ))
      ),

      // Your Stats Summary
      React.createElement('div', { style: { background: t.card, borderRadius: 16, padding: 20, marginTop: 12, border: `1px solid ${t.border}`, ...animStyle(0.4) } },
        React.createElement('div', { style: { fontSize: 17, fontWeight: 700, color: t.text, fontFamily: font, marginBottom: 14 } }, 'Your Stats'),
        React.createElement('div', { style: { display: 'flex', gap: 16, justifyContent: 'space-around' } },
          [
            { label: 'Points', value: '1,180', icon: icons.Award, color: t.cta },
            { label: 'Streak', value: '12 days', icon: icons.Flame, color: t.secondary },
            { label: 'Atlas Adds', value: '18', icon: icons.MapPin, color: '#4ADE80' },
          ].map((s, i) => React.createElement('div', { key: i, style: { textAlign: 'center' } },
            React.createElement('div', { style: { display: 'flex', justifyContent: 'center', marginBottom: 6 } },
              createIcon(s.icon, 22, s.color)
            ),
            React.createElement('div', { style: { fontSize: 20, fontWeight: 800, color: t.text, fontFamily: font } }, s.value),
            React.createElement('div', { style: { fontSize: 12, color: t.textMuted, fontFamily: font } }, s.label)
          ))
        )
      )
    );
  }

  // =============== NAVIGATION ===============
  const tabs = [
    { id: 'home', label: 'Home', icon: icons.Home },
    { id: 'explore', label: 'Atlas', icon: icons.Map },
    { id: 'journal', label: 'Journal', icon: icons.BookOpen },
    { id: 'guilds', label: 'Guilds', icon: icons.Shield },
    { id: 'leaderboard', label: 'Ranks', icon: icons.Trophy },
  ];

  const screens = {
    home: HomeScreen,
    explore: ExploreScreen,
    journal: JournalScreen,
    guilds: GuildsScreen,
    leaderboard: LeaderboardScreen,
  };

  const ActiveScreenComp = screens[activeScreen] || HomeScreen;

  return React.createElement('div', {
    style: { minHeight: '100vh', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: font, padding: '20px 0' }
  },
    styleTag,
    React.createElement('div', {
      style: { width: 375, height: 812, borderRadius: 44, overflow: 'hidden', position: 'relative', background: t.bg, boxShadow: '0 25px 80px rgba(0,0,0,0.3)', display: 'flex', flexDirection: 'column' }
    },
      // Content
      React.createElement('div', {
        style: { flex: 1, overflowY: 'auto', overflowX: 'hidden', WebkitOverflowScrolling: 'touch' }
      },
        React.createElement(ActiveScreenComp)
      ),

      // Bottom Navigation
      React.createElement('div', {
        style: { display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: '8px 8px 24px', background: t.navBg, borderTop: `1px solid ${t.navBorder}`, position: 'relative', zIndex: 10 }
      },
        tabs.map(tab => React.createElement('div', {
          key: tab.id,
          onClick: () => setActiveScreen(tab.id),
          style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, cursor: 'pointer', padding: '6px 12px', borderRadius: 12, minWidth: 56, minHeight: 44, justifyContent: 'center', transition: 'all 0.2s ease', background: activeScreen === tab.id ? `${t.primary}15` : 'transparent' }
        },
          createIcon(tab.icon, 22, activeScreen === tab.id ? t.primary : t.textMuted),
          React.createElement('span', { style: { fontSize: 10, fontWeight: activeScreen === tab.id ? 700 : 500, color: activeScreen === tab.id ? t.primary : t.textMuted, fontFamily: font } }, tab.label)
        ))
      )
    )
  );
}
