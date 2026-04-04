function App() {
  const { useState, useEffect, useRef } = React;

  const [activeTab, setActiveTab] = useState('home');
  const [isDark, setIsDark] = useState(true);
  const [pressedBtn, setPressedBtn] = useState(null);
  const [streakDay, setStreakDay] = useState(12);
  const [verifiedEntry, setVerifiedEntry] = useState(false);
  const [expandedEntry, setExpandedEntry] = useState(null);
  const [questJoined, setQuestJoined] = useState(false);

  const themes = {
    dark: {
      bg: '#1C1007',
      surface: '#2A1A0A',
      surfaceAlt: '#321F0D',
      border: '#5C3A1E',
      borderLight: '#7A4F2D',
      text: '#F5E6C8',
      textMuted: '#B8956A',
      textFaint: '#8C6A45',
      accent: '#C8440A',
      accentHover: '#E04E10',
      gold: '#D4A017',
      goldLight: '#F0B830',
      cream: '#F5E6C8',
      mapBg: '#1A2810',
      mapSurface: '#243818',
      stamp: '#8B2500',
    },
    light: {
      bg: '#F5EDD8',
      surface: '#FAECD0',
      surfaceAlt: '#EFE0B8',
      border: '#C8956A',
      borderLight: '#D4A87A',
      text: '#2A1208',
      textMuted: '#6B3A1F',
      textFaint: '#9C6040',
      accent: '#C8440A',
      accentHover: '#E04E10',
      gold: '#B8880A',
      goldLight: '#D4A017',
      cream: '#2A1208',
      mapBg: '#E8F0D8',
      mapSurface: '#D8E8C8',
      stamp: '#8B2500',
    }
  };

  const t = isDark ? themes.dark : themes.light;

  const fontLink = `@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,600;0,9..144,700;0,9..144,900;1,9..144,400;1,9..144,600&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  ::-webkit-scrollbar { width: 0px; }
  body { font-family: 'Fraunces', Georgia, serif; }`;

  const press = (id, fn) => {
    setPressedBtn(id);
    setTimeout(() => { setPressedBtn(null); if (fn) fn(); }, 150);
  };

  const tabs = [
    { id: 'home', label: 'Home', icon: window.lucide.Home },
    { id: 'map', label: 'GastroMap', icon: window.lucide.Map },
    { id: 'log', label: 'Logbook', icon: window.lucide.BookOpen },
    { id: 'quests', label: 'Quests', icon: window.lucide.Compass },
    { id: 'settings', label: 'Profile', icon: window.lucide.User },
  ];

  const localEntries = [
    {
      id: 1, name: "Grandma Rosa's Sofrito Base",
      category: "Tradition", region: "East Harlem, NY",
      verified: 47, author: "MarcellaV",
      description: "A slow-cooked recao & culantro sofrito passed down three generations in the Vargas household. The key is rendering the annatto seeds in lard, not oil.",
      tags: ["Puerto Rican", "Foundational", "Endangered"],
      image: "🫕", rarity: "Rare"
    },
    {
      id: 2, name: "Miso-Pickled Ramps",
      category: "Ingredient", region: "Appalachian Trail, TN",
      verified: 23, author: "WildHarvestJim",
      description: "Spring forage tradition — ramps harvested before the first full moon of April, packed in white miso for 14 days. Local hollow families have done this since the 1800s.",
      tags: ["Wild Forage", "Seasonal", "Appalachian"],
      image: "🌿", rarity: "Seasonal"
    },
    {
      id: 3, name: "Injera Tej Pairing",
      category: "Dish", region: "Little Ethiopia, LA",
      verified: 89, author: "SelamT",
      description: "The specific tej honey wine produced by three families in the district, served only with ceremonial injera during wedding feasts. Not available commercially.",
      tags: ["Ethiopian", "Ceremonial", "Community"],
      image: "🫓", rarity: "Common"
    },
  ];

  const quests = [
    { id: 1, title: "Vanishing Dumplings", desc: "Document 3 family-run dumpling spots that predate 1990 in your city's Chinatown.", reward: "Heritage Keeper Badge", difficulty: "Medium", deadline: "Apr 18", participants: 234 },
    { id: 2, title: "Spring Wild Harvest", desc: "Photograph and log 5 seasonal forage ingredients currently available at local farmers markets.", reward: "Field Botanist Badge", difficulty: "Easy", deadline: "Apr 12", participants: 567 },
    { id: 3, title: "Corner Store Archaeology", desc: "Discover a snack, spice, or ingredient in a bodega or corner store that has no Wikipedia entry.", reward: "Urban Explorer Badge", difficulty: "Hard", deadline: "Apr 30", participants: 89 },
  ];

  const mapPins = [
    { x: 42, y: 35, name: "Rosa's Sofrito", type: "tradition", emoji: "🫕" },
    { x: 68, y: 55, name: "Night Market Mole", type: "dish", emoji: "🍲" },
    { x: 25, y: 62, name: "Wild Ramp Hollow", type: "ingredient", emoji: "🌿" },
    { x: 75, y: 28, name: "Tej Wedding Wine", type: "tradition", emoji: "🍶" },
    { x: 55, y: 70, name: "Ghost Bakery", type: "dish", emoji: "🥐" },
    { x: 38, y: 80, name: "Fermented Shrimp", type: "ingredient", emoji: "🦐" },
    { x: 82, y: 75, name: "Tamale Steam Rite", type: "tradition", emoji: "🫔" },
  ];

  const rarityColor = { Rare: '#C8440A', Seasonal: '#D4A017', Common: '#5A8A40' };

  // ---- HOME SCREEN ----
  function HomeScreen() {
    return React.createElement('div', { style: { flex: 1, overflowY: 'auto', paddingBottom: 16 } },
      // Hero streak banner - asymmetric
      React.createElement('div', {
        style: {
          background: `linear-gradient(135deg, ${t.accent} 0%, #8B2500 100%)`,
          padding: '20px 20px 16px',
          position: 'relative',
          overflow: 'hidden',
        }
      },
        // decorative texture lines
        React.createElement('div', { style: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.07,
          backgroundImage: 'repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)',
          backgroundSize: '8px 8px' } }),
        React.createElement('div', { style: { position: 'relative', zIndex: 1 } },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' } },
            React.createElement('div', null,
              React.createElement('div', { style: { fontFamily: 'Fraunces', fontSize: 11, fontWeight: 600, letterSpacing: 3, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', marginBottom: 4 } }, "Cartographer's Streak"),
              React.createElement('div', { style: { fontFamily: 'Fraunces', fontSize: 48, fontWeight: 900, color: '#fff', lineHeight: 1, fontStyle: 'italic' } }, streakDay),
              React.createElement('div', { style: { fontFamily: 'Fraunces', fontSize: 13, color: 'rgba(255,255,255,0.8)', marginTop: 2 } }, 'days active • Keep exploring!'),
            ),
            React.createElement('div', { style: {
              background: 'rgba(255,255,255,0.15)',
              border: '2px solid rgba(255,255,255,0.3)',
              borderRadius: 4,
              padding: '8px 14px',
              textAlign: 'center',
            } },
              React.createElement('div', { style: { fontSize: 24 } }, '🔥'),
              React.createElement('div', { style: { fontFamily: 'Fraunces', fontSize: 10, color: 'rgba(255,255,255,0.8)', fontWeight: 600, letterSpacing: 1 } }, 'ON FIRE'),
            )
          ),
          // streak dots
          React.createElement('div', { style: { display: 'flex', gap: 4, marginTop: 12 } },
            ...[...Array(7)].map((_, i) =>
              React.createElement('div', { key: i, style: {
                width: i < 5 ? 28 : 20, height: 6,
                background: i < 5 ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.25)',
                borderRadius: 3,
              } })
            )
          )
        )
      ),

      // Section: Recent Discoveries — asymmetric layout
      React.createElement('div', { style: { padding: '18px 16px 0' } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 } },
          React.createElement('div', { style: { fontFamily: 'Fraunces', fontSize: 20, fontWeight: 700, color: t.text } }, 'Recent Discoveries'),
          React.createElement('div', { style: { fontFamily: 'Fraunces', fontSize: 12, color: t.accent, fontStyle: 'italic' } }, 'view all →')
        ),

        // Featured large card
        React.createElement('div', {
          style: {
            background: t.surface,
            border: `2px solid ${t.border}`,
            borderRadius: 2,
            padding: 16,
            marginBottom: 10,
            cursor: 'pointer',
            position: 'relative',
          },
          onClick: () => setExpandedEntry(expandedEntry === 1 ? null : 1)
        },
          React.createElement('div', { style: { display: 'flex', gap: 14, alignItems: 'flex-start' } },
            React.createElement('div', { style: {
              width: 64, height: 64, background: t.surfaceAlt,
              border: `2px solid ${t.border}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 32, flexShrink: 0,
              fontFamily: 'Fraunces',
            } }, '🫕'),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' } },
                React.createElement('div', { style: { fontFamily: 'Fraunces', fontSize: 16, fontWeight: 700, color: t.text, lineHeight: 1.2 } }, "Grandma Rosa's Sofrito Base"),
                React.createElement('div', { style: { background: rarityColor['Rare'], padding: '2px 7px', fontSize: 9, fontWeight: 700, letterSpacing: 1, color: '#fff', borderRadius: 2 } }, 'RARE')
              ),
              React.createElement('div', { style: { fontFamily: 'Fraunces', fontSize: 11, color: t.textMuted, marginTop: 3 } }, '📍 East Harlem, NY'),
              React.createElement('div', { style: { fontFamily: 'Fraunces', fontSize: 12, color: t.textFaint, marginTop: 6, lineHeight: 1.5, fontStyle: 'italic' } },
                'A slow-cooked recao & culantro sofrito passed down three generations...'
              ),
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12, marginTop: 8 } },
                React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
                  React.createElement(window.lucide.CheckCircle, { size: 13, color: '#5A8A40' }),
                  React.createElement('span', { style: { fontFamily: 'Fraunces', fontSize: 11, color: '#5A8A40', fontWeight: 600 } }, '47 verified')
                ),
                React.createElement('div', { style: { fontFamily: 'Fraunces', fontSize: 11, color: t.textFaint } }, 'by MarcellaV'),
              )
            )
          ),
          expandedEntry === 1 && React.createElement('div', {
            style: { borderTop: `1px solid ${t.border}`, marginTop: 12, paddingTop: 12 }
          },
            React.createElement('div', { style: { fontFamily: 'Fraunces', fontSize: 13, color: t.textMuted, lineHeight: 1.6 } },
              'The key is rendering the annatto seeds in lard, not oil. The recao (culantro) must be fresh — dried won\'t do. This tradition spans three generations of the Vargas household on 116th Street.'
            ),
            React.createElement('div', { style: { display: 'flex', gap: 6, marginTop: 10, flexWrap: 'wrap' } },
              ...['Puerto Rican', 'Foundational', 'Endangered'].map(tag =>
                React.createElement('div', { key: tag, style: { background: t.surfaceAlt, border: `1px solid ${t.border}`, padding: '2px 8px', borderRadius: 2, fontSize: 10, color: t.textMuted, fontFamily: 'Fraunces' } }, tag)
              )
            )
          )
        ),

        // Two-column asymmetric cards
        React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '3fr 2fr', gap: 10 } },
          React.createElement('div', {
            style: { background: t.surface, border: `2px solid ${t.border}`, borderRadius: 2, padding: 13 }
          },
            React.createElement('div', { style: { fontSize: 28, marginBottom: 8 } }, '🌿'),
            React.createElement('div', { style: { fontFamily: 'Fraunces', fontSize: 14, fontWeight: 700, color: t.text, lineHeight: 1.2 } }, 'Miso-Pickled Ramps'),
            React.createElement('div', { style: { fontFamily: 'Fraunces', fontSize: 10, color: t.textMuted, marginTop: 4 } }, '📍 Appalachian Trail, TN'),
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4, marginTop: 8 } },
              React.createElement(window.lucide.CheckCircle, { size: 11, color: '#5A8A40' }),
              React.createElement('span', { style: { fontFamily: 'Fraunces', fontSize: 10, color: '#5A8A40' } }, '23 verified')
            )
          ),
          React.createElement('div', {
            style: {
              background: `linear-gradient(160deg, ${t.gold}22 0%, ${t.surface} 100%)`,
              border: `2px solid ${t.gold}`,
              borderRadius: 2, padding: 13, display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
            }
          },
            React.createElement('div', { style: { fontFamily: 'Fraunces', fontSize: 10, fontWeight: 700, letterSpacing: 2, color: t.gold, textTransform: 'uppercase' } }, 'Weekly\nChallenge'),
            React.createElement('div', { style: { fontSize: 32, textAlign: 'center', margin: '8px 0' } }, '🗺️'),
            React.createElement('div', { style: { fontFamily: 'Fraunces', fontSize: 11, color: t.textMuted, fontStyle: 'italic' } }, 'Document a\ncorner store\nrelic →')
          )
        )
      ),

      // Community Activity
      React.createElement('div', { style: { padding: '18px 16px 0' } },
        React.createElement('div', { style: { fontFamily: 'Fraunces', fontSize: 18, fontWeight: 700, color: t.text, marginBottom: 12 } }, 'Community Activity'),
        ...([
          { user: 'SelamT', action: 'verified', item: 'Injera Tej Pairing', time: '2m ago', emoji: '✅' },
          { user: 'WildJim', action: 'logged', item: 'Spring Ramp Harvest Route', time: '18m ago', emoji: '📝' },
          { user: 'AnaC', action: 'completed quest', item: 'Vanishing Dumplings', time: '1h ago', emoji: '🏆' },
        ].map((item, i) =>
          React.createElement('div', { key: i, style: {
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '10px 0',
            borderBottom: i < 2 ? `1px solid ${t.border}` : 'none',
          } },
            React.createElement('div', { style: { width: 36, height: 36, background: t.surfaceAlt, border: `2px solid ${t.border}`, borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 } }, item.emoji),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', { style: { fontFamily: 'Fraunces', fontSize: 13, color: t.text } },
                React.createElement('span', { style: { fontWeight: 700 } }, item.user), ` ${item.action} `,
                React.createElement('span', { style: { fontStyle: 'italic', color: t.accent } }, item.item)
              ),
              React.createElement('div', { style: { fontFamily: 'Fraunces', fontSize: 11, color: t.textFaint, marginTop: 1 } }, item.time)
            )
          )
        ))
      )
    );
  }

  // ---- MAP SCREEN ----
  function MapScreen() {
    const [selectedPin, setSelectedPin] = useState(null);
    const [filterType, setFilterType] = useState('all');

    const filterTypes = [
      { id: 'all', label: 'All' },
      { id: 'tradition', label: 'Traditions' },
      { id: 'dish', label: 'Dishes' },
      { id: 'ingredient', label: 'Ingredients' },
    ];

    const pinColors = { tradition: '#C8440A', dish: '#D4A017', ingredient: '#5A8A40' };

    return React.createElement('div', { style: { flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' } },
      // Header
      React.createElement('div', { style: { padding: '14px 16px 10px', borderBottom: `1px solid ${t.border}` } },
        React.createElement('div', { style: { fontFamily: 'Fraunces', fontSize: 22, fontWeight: 900, color: t.text, fontStyle: 'italic' } }, 'Neighborhood GastroMap'),
        React.createElement('div', { style: { fontFamily: 'Fraunces', fontSize: 12, color: t.textMuted, marginTop: 2 } }, '127 verified entries near you'),
        // Filter tabs
        React.createElement('div', { style: { display: 'flex', gap: 6, marginTop: 10, overflowX: 'auto' } },
          ...filterTypes.map(f =>
            React.createElement('div', {
              key: f.id,
              style: {
                padding: '4px 12px',
                border: `2px solid ${filterType === f.id ? t.accent : t.border}`,
                background: filterType === f.id ? t.accent : 'transparent',
                borderRadius: 2,
                fontFamily: 'Fraunces', fontSize: 11, fontWeight: 600,
                color: filterType === f.id ? '#fff' : t.textMuted,
                cursor: 'pointer', whiteSpace: 'nowrap',
              },
              onClick: () => setFilterType(f.id)
            }, f.label)
          )
        )
      ),

      // Map area
      React.createElement('div', { style: {
        flex: 1, background: t.mapBg, position: 'relative', overflow: 'hidden',
        backgroundImage: `
          linear-gradient(${t.mapSurface}44 1px, transparent 1px),
          linear-gradient(90deg, ${t.mapSurface}44 1px, transparent 1px)`,
        backgroundSize: '40px 40px',
      } },
        // Decorative roads
        React.createElement('svg', { style: { position: 'absolute', inset: 0 }, width: '100%', height: '100%' },
          React.createElement('path', { d: 'M 0 180 Q 150 160 375 200', stroke: isDark ? '#3A4A28' : '#C8D8A8', strokeWidth: 8, fill: 'none' }),
          React.createElement('path', { d: 'M 100 0 Q 130 200 120 400', stroke: isDark ? '#3A4A28' : '#C8D8A8', strokeWidth: 6, fill: 'none' }),
          React.createElement('path', { d: 'M 200 100 Q 280 250 300 400', stroke: isDark ? '#3A4A28' : '#C8D8A8', strokeWidth: 5, fill: 'none' }),
          // Labels
          React.createElement('text', { x: 30, y: 190, fontFamily: 'Fraunces', fontSize: 8, fill: isDark ? '#5A7A38' : '#8AAA68', fontStyle: 'italic' }, 'Heritage Ave'),
          React.createElement('text', { x: 90, y: 60, fontFamily: 'Fraunces', fontSize: 8, fill: isDark ? '#5A7A38' : '#8AAA68', fontStyle: 'italic', transform: 'rotate(-85, 90, 60)' }, 'Market St'),
        ),

        // Map pins
        ...mapPins.filter(p => filterType === 'all' || p.type === filterType).map((pin, i) =>
          React.createElement('div', {
            key: i,
            style: {
              position: 'absolute',
              left: `${pin.x}%`, top: `${pin.y}%`,
              transform: 'translate(-50%, -50%)',
              cursor: 'pointer',
              zIndex: selectedPin === i ? 20 : 10,
            },
            onClick: () => setSelectedPin(selectedPin === i ? null : i)
          },
            React.createElement('div', { style: {
              background: pinColors[pin.type] || t.accent,
              border: '3px solid rgba(255,255,255,0.8)',
              borderRadius: '50% 50% 50% 0',
              transform: 'rotate(-45deg)',
              width: selectedPin === i ? 36 : 28,
              height: selectedPin === i ? 36 : 28,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
              transition: 'all 0.2s',
            } },
              React.createElement('div', { style: { transform: 'rotate(45deg)', fontSize: selectedPin === i ? 18 : 14 } }, pin.emoji)
            )
          )
        ),

        // Selected pin popup
        selectedPin !== null && React.createElement('div', {
          style: {
            position: 'absolute',
            bottom: 16, left: 12, right: 12,
            background: t.surface,
            border: `2px solid ${t.border}`,
            borderRadius: 2,
            padding: 14,
            boxShadow: '0 -4px 20px rgba(0,0,0,0.3)',
            zIndex: 30,
          }
        },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' } },
            React.createElement('div', null,
              React.createElement('div', { style: { fontSize: 22, marginBottom: 4 } }, mapPins[selectedPin].emoji),
              React.createElement('div', { style: { fontFamily: 'Fraunces', fontSize: 15, fontWeight: 700, color: t.text } }, mapPins[selectedPin].name),
              React.createElement('div', { style: { fontFamily: 'Fraunces', fontSize: 11, color: t.textMuted, marginTop: 2 } },
                mapPins[selectedPin].type.charAt(0).toUpperCase() + mapPins[selectedPin].type.slice(1)
              )
            ),
            React.createElement('div', {
              style: { padding: '6px 12px', background: t.accent, color: '#fff', fontFamily: 'Fraunces', fontSize: 12, fontWeight: 700, borderRadius: 2, cursor: 'pointer' },
              onClick: () => setSelectedPin(null)
            }, '✕')
          ),
          React.createElement('div', { style: { display: 'flex', gap: 8, marginTop: 10 } },
            React.createElement('div', { style: { flex: 1, padding: '8px 0', background: t.surfaceAlt, border: `1px solid ${t.border}`, borderRadius: 2, textAlign: 'center', fontFamily: 'Fraunces', fontSize: 12, color: t.text, cursor: 'pointer' } }, '📖 View Entry'),
            React.createElement('div', { style: { flex: 1, padding: '8px 0', background: t.accent, borderRadius: 2, textAlign: 'center', fontFamily: 'Fraunces', fontSize: 12, color: '#fff', fontWeight: 700, cursor: 'pointer' } }, '✅ Verify'),
          )
        )
      ),

      // Legend
      React.createElement('div', { style: { padding: '10px 16px', borderTop: `1px solid ${t.border}`, display: 'flex', gap: 16 } },
        ...Object.entries(pinColors).map(([type, color]) =>
          React.createElement('div', { key: type, style: { display: 'flex', alignItems: 'center', gap: 5 } },
            React.createElement('div', { style: { width: 10, height: 10, background: color, borderRadius: '50%' } }),
            React.createElement('span', { style: { fontFamily: 'Fraunces', fontSize: 11, color: t.textMuted, textTransform: 'capitalize' } }, type + 's')
          )
        )
      )
    );
  }

  // ---- LOGBOOK SCREEN ----
  function LogbookScreen() {
    const [activeCategory, setActiveCategory] = useState('all');

    const cats = ['all', 'dishes', 'ingredients', 'traditions'];

    return React.createElement('div', { style: { flex: 1, overflowY: 'auto', paddingBottom: 16 } },
      React.createElement('div', { style: { padding: '14px 16px 0', position: 'sticky', top: 0, background: t.bg, zIndex: 10, paddingBottom: 10, borderBottom: `1px solid ${t.border}` } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
          React.createElement('div', { style: { fontFamily: 'Fraunces', fontSize: 22, fontWeight: 900, color: t.text, fontStyle: 'italic' } }, 'Local Lore Logbook'),
          React.createElement('div', {
            style: { width: 36, height: 36, background: t.accent, borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' },
            onClick: () => press('add', null)
          },
            React.createElement(window.lucide.Plus, { size: 20, color: '#fff' })
          )
        ),
        React.createElement('div', { style: { display: 'flex', gap: 6, marginTop: 10 } },
          ...cats.map(c =>
            React.createElement('div', {
              key: c, style: {
                padding: '4px 10px',
                border: `2px solid ${activeCategory === c ? t.accent : t.border}`,
                background: activeCategory === c ? `${t.accent}22` : 'transparent',
                borderRadius: 2,
                fontFamily: 'Fraunces', fontSize: 11, color: activeCategory === c ? t.accent : t.textMuted,
                cursor: 'pointer', textTransform: 'capitalize',
              },
              onClick: () => setActiveCategory(c)
            }, c)
          )
        )
      ),

      // Stats bar
      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 1, background: t.border, margin: '0 0 16px' } },
        ...[{ n: 34, l: 'Entries' }, { n: 28, l: 'Verified' }, { n: 12, l: 'Rare' }].map((s, i) =>
          React.createElement('div', { key: i, style: { background: t.surface, padding: '12px 0', textAlign: 'center' } },
            React.createElement('div', { style: { fontFamily: 'Fraunces', fontSize: 22, fontWeight: 900, color: t.accent, fontStyle: 'italic' } }, s.n),
            React.createElement('div', { style: { fontFamily: 'Fraunces', fontSize: 10, color: t.textMuted, letterSpacing: 1 } }, s.l.toUpperCase())
          )
        )
      ),

      // Entries
      React.createElement('div', { style: { padding: '0 16px' } },
        ...localEntries.map((entry, i) =>
          React.createElement('div', { key: entry.id, style: {
            background: t.surface,
            border: `2px solid ${t.border}`,
            borderRadius: 2,
            marginBottom: 10,
            overflow: 'hidden',
          } },
            React.createElement('div', { style: {
              display: 'flex', gap: 0,
            } },
              // Color left stripe
              React.createElement('div', { style: { width: 6, background: rarityColor[entry.rarity] } }),
              React.createElement('div', { style: { flex: 1, padding: 14 } },
                React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' } },
                  React.createElement('div', { style: { flex: 1 } },
                    React.createElement('div', { style: { display: 'flex', gap: 8, alignItems: 'center', marginBottom: 4 } },
                      React.createElement('span', { style: { fontSize: 20 } }, entry.image),
                      React.createElement('div', { style: { fontFamily: 'Fraunces', fontSize: 15, fontWeight: 700, color: t.text } }, entry.name)
                    ),
                    React.createElement('div', { style: { fontFamily: 'Fraunces', fontSize: 11, color: t.textMuted, marginBottom: 6 } }, `📍 ${entry.region} · ${entry.category}`),
                    React.createElement('div', { style: { fontFamily: 'Fraunces', fontSize: 12, color: t.textFaint, lineHeight: 1.5, fontStyle: 'italic' } }, entry.description.substring(0, 80) + '...'),
                  )
                ),
                React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10, paddingTop: 10, borderTop: `1px solid ${t.border}` } },
                  React.createElement('div', { style: { display: 'flex', gap: 6, flexWrap: 'wrap' } },
                    ...entry.tags.slice(0, 2).map(tag =>
                      React.createElement('span', { key: tag, style: { background: t.surfaceAlt, border: `1px solid ${t.borderLight}`, padding: '1px 6px', borderRadius: 2, fontSize: 9, color: t.textMuted, fontFamily: 'Fraunces' } }, tag)
                    )
                  ),
                  React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
                    React.createElement(window.lucide.CheckCircle, { size: 13, color: '#5A8A40' }),
                    React.createElement('span', { style: { fontFamily: 'Fraunces', fontSize: 12, color: '#5A8A40', fontWeight: 600 } }, `${entry.verified}`)
                  )
                )
              )
            )
          )
        ),

        // Add entry CTA
        React.createElement('div', {
          style: {
            border: `2px dashed ${t.border}`,
            borderRadius: 2,
            padding: '20px 16px',
            textAlign: 'center',
            cursor: 'pointer',
          }
        },
          React.createElement(window.lucide.Plus, { size: 24, color: t.textFaint }),
          React.createElement('div', { style: { fontFamily: 'Fraunces', fontSize: 13, color: t.textFaint, marginTop: 6, fontStyle: 'italic' } }, 'Log a new culinary discovery'),
        )
      )
    );
  }

  // ---- QUESTS SCREEN ----
  function QuestsScreen() {
    return React.createElement('div', { style: { flex: 1, overflowY: 'auto', paddingBottom: 16 } },
      React.createElement('div', { style: { padding: '14px 16px 12px', borderBottom: `1px solid ${t.border}` } },
        React.createElement('div', { style: { fontFamily: 'Fraunces', fontSize: 22, fontWeight: 900, color: t.text, fontStyle: 'italic' } }, 'Heritage Huddles & Quests'),
        React.createElement('div', { style: { fontFamily: 'Fraunces', fontSize: 12, color: t.textMuted, marginTop: 2 } }, '3 quests active in your region'),
      ),

      // Active quest banner
      React.createElement('div', { style: { margin: '14px 16px 0', background: isDark ? '#1A2810' : '#E8F0D8', border: `2px solid ${t.gold}`, borderRadius: 2, padding: 14, position: 'relative', overflow: 'hidden' } },
        React.createElement('div', { style: { position: 'absolute', top: -10, right: -10, fontSize: 60, opacity: 0.08 } }, '🏆'),
        React.createElement('div', { style: { fontFamily: 'Fraunces', fontSize: 10, fontWeight: 700, letterSpacing: 2, color: t.gold, textTransform: 'uppercase', marginBottom: 6 } }, 'Your Active Quest'),
        React.createElement('div', { style: { fontFamily: 'Fraunces', fontSize: 16, fontWeight: 700, color: t.text } }, 'Vanishing Dumplings'),
        React.createElement('div', { style: { fontFamily: 'Fraunces', fontSize: 12, color: t.textMuted, marginTop: 4, lineHeight: 1.5 } }, 'Document 3 family-run dumpling spots that predate 1990 in your city\'s Chinatown.'),
        React.createElement('div', { style: { marginTop: 12 } },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', fontFamily: 'Fraunces', fontSize: 11, color: t.textMuted, marginBottom: 4 } },
            React.createElement('span', null, 'Progress'),
            React.createElement('span', { style: { color: t.gold, fontWeight: 700 } }, '1 / 3')
          ),
          React.createElement('div', { style: { height: 8, background: t.border, borderRadius: 4, overflow: 'hidden' } },
            React.createElement('div', { style: { width: '33%', height: '100%', background: t.gold, borderRadius: 4 } })
          )
        ),
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 } },
          React.createElement('div', { style: { fontFamily: 'Fraunces', fontSize: 11, color: t.textFaint } }, '⏰ Ends Apr 18 · 234 participants'),
          React.createElement('div', { style: { padding: '4px 12px', background: t.gold, borderRadius: 2, fontFamily: 'Fraunces', fontSize: 11, fontWeight: 700, color: '#fff' } }, 'Log Entry'),
        )
      ),

      // Browse quests
      React.createElement('div', { style: { padding: '16px 16px 0' } },
        React.createElement('div', { style: { fontFamily: 'Fraunces', fontSize: 16, fontWeight: 700, color: t.text, marginBottom: 12 } }, 'Browse All Quests'),
        ...quests.map((quest, i) =>
          React.createElement('div', { key: quest.id, style: {
            background: t.surface,
            border: `2px solid ${t.border}`,
            borderRadius: 2,
            padding: 14,
            marginBottom: 10,
          } },
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 } },
              React.createElement('div', { style: { flex: 1 } },
                React.createElement('div', { style: { display: 'flex', gap: 8, alignItems: 'center', marginBottom: 4 } },
                  React.createElement('div', { style: { fontFamily: 'Fraunces', fontSize: 15, fontWeight: 700, color: t.text } }, quest.title),
                ),
                React.createElement('div', { style: {
                  display: 'inline-block', padding: '1px 7px',
                  background: quest.difficulty === 'Easy' ? '#5A8A4022' : quest.difficulty === 'Medium' ? `${t.gold}22` : `${t.accent}22`,
                  border: `1px solid ${quest.difficulty === 'Easy' ? '#5A8A40' : quest.difficulty === 'Medium' ? t.gold : t.accent}`,
                  borderRadius: 2,
                  fontFamily: 'Fraunces', fontSize: 10, fontWeight: 700,
                  color: quest.difficulty === 'Easy' ? '#5A8A40' : quest.difficulty === 'Medium' ? t.gold : t.accent,
                } }, quest.difficulty)
              ),
            ),
            React.createElement('div', { style: { fontFamily: 'Fraunces', fontSize: 12, color: t.textMuted, lineHeight: 1.5, fontStyle: 'italic', marginBottom: 10 } }, quest.desc),
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 10, borderTop: `1px solid ${t.border}` } },
              React.createElement('div', { style: { fontFamily: 'Fraunces', fontSize: 11, color: t.textFaint } },
                `⏰ ${quest.deadline} · 👥 ${quest.participants}`
              ),
              React.createElement('div', {
                style: {
                  padding: '5px 12px',
                  background: questJoined && i === 1 ? '#5A8A40' : t.accent,
                  borderRadius: 2,
                  fontFamily: 'Fraunces', fontSize: 11, fontWeight: 700, color: '#fff',
                  cursor: 'pointer',
                },
                onClick: () => i === 1 && setQuestJoined(!questJoined)
              }, questJoined && i === 1 ? '✓ Joined!' : 'Join Quest')
            ),
            // Reward badge
            React.createElement('div', { style: { marginTop: 8, display: 'flex', alignItems: 'center', gap: 6 } },
              React.createElement('span', { style: { fontSize: 14 } }, '🏅'),
              React.createElement('span', { style: { fontFamily: 'Fraunces', fontSize: 11, color: t.gold } }, quest.reward)
            )
          )
        )
      )
    );
  }

  // ---- SETTINGS/PROFILE SCREEN ----
  function SettingsScreen() {
    return React.createElement('div', { style: { flex: 1, overflowY: 'auto', paddingBottom: 16 } },
      // Profile hero — asymmetric
      React.createElement('div', { style: {
        background: t.surface,
        borderBottom: `2px solid ${t.border}`,
        padding: '20px 16px 16px',
        position: 'relative',
        overflow: 'hidden',
      } },
        React.createElement('div', { style: { position: 'absolute', top: 0, right: 0, width: 120, height: 120, opacity: 0.05, fontSize: 100, lineHeight: 1 } }, '🗺️'),
        React.createElement('div', { style: { display: 'flex', gap: 14, alignItems: 'flex-end' } },
          React.createElement('div', { style: {
            width: 72, height: 72,
            background: t.accent,
            border: `3px solid ${t.border}`,
            borderRadius: 2,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 32,
            flexShrink: 0,
          } }, '🗺️'),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', { style: { fontFamily: 'Fraunces', fontSize: 20, fontWeight: 900, color: t.text, fontStyle: 'italic' } }, 'MarcellaV'),
            React.createElement('div', { style: { fontFamily: 'Fraunces', fontSize: 12, color: t.accent, fontWeight: 700 } }, 'Flavor Cartographer IV'),
            React.createElement('div', { style: { fontFamily: 'Fraunces', fontSize: 11, color: t.textMuted, marginTop: 2 } }, '📍 East Harlem, NY'),
          )
        ),
        // Stats row
        React.createElement('div', { style: { display: 'flex', gap: 0, marginTop: 16, background: t.surfaceAlt, border: `1px solid ${t.border}` } },
          ...[
            { n: '34', l: 'Entries' },
            { n: '12', l: 'Streak' },
            { n: '3', l: 'Quests' },
            { n: '89%', l: 'Verified' },
          ].map((s, i) =>
            React.createElement('div', { key: i, style: {
              flex: 1, padding: '10px 0', textAlign: 'center',
              borderRight: i < 3 ? `1px solid ${t.border}` : 'none',
            } },
              React.createElement('div', { style: { fontFamily: 'Fraunces', fontSize: 18, fontWeight: 900, color: t.text, fontStyle: 'italic' } }, s.n),
              React.createElement('div', { style: { fontFamily: 'Fraunces', fontSize: 9, color: t.textMuted, letterSpacing: 1 } }, s.l.toUpperCase())
            )
          )
        )
      ),

      // Badges
      React.createElement('div', { style: { padding: '16px 16px 0' } },
        React.createElement('div', { style: { fontFamily: 'Fraunces', fontSize: 16, fontWeight: 700, color: t.text, marginBottom: 10 } }, 'Earned Badges'),
        React.createElement('div', { style: { display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 4 } },
          ...[
            { emoji: '🏅', label: 'Heritage\nKeeper', color: t.gold },
            { emoji: '🌿', label: 'Field\nBotanist', color: '#5A8A40' },
            { emoji: '🗺️', label: 'First\nCartographer', color: t.accent },
            { emoji: '🔥', label: '10-Day\nStreak', color: '#C8440A' },
            { emoji: '✅', label: 'Trusted\nVerifier', color: '#4A8A9A' },
          ].map((b, i) =>
            React.createElement('div', { key: i, style: {
              flexShrink: 0, width: 70,
              background: t.surface,
              border: `2px solid ${b.color}`,
              borderRadius: 2,
              padding: '10px 6px',
              textAlign: 'center',
            } },
              React.createElement('div', { style: { fontSize: 24 } }, b.emoji),
              React.createElement('div', { style: { fontFamily: 'Fraunces', fontSize: 9, color: t.textMuted, marginTop: 4, lineHeight: 1.3, whiteSpace: 'pre-line' } }, b.label)
            )
          )
        )
      ),

      // Settings list
      React.createElement('div', { style: { padding: '16px 16px 0' } },
        React.createElement('div', { style: { fontFamily: 'Fraunces', fontSize: 16, fontWeight: 700, color: t.text, marginBottom: 10 } }, 'Settings'),
        ...[
          { icon: window.lucide.Sun, label: 'Theme', action: () => setIsDark(!isDark), value: isDark ? 'Dark' : 'Light', isToggle: true },
          { icon: window.lucide.Bell, label: 'Notifications', value: 'On' },
          { icon: window.lucide.MapPin, label: 'Home Region', value: 'East Harlem, NY' },
          { icon: window.lucide.Globe, label: 'Language', value: 'English' },
          { icon: window.lucide.Shield, label: 'Privacy', value: 'Public' },
          { icon: window.lucide.HelpCircle, label: 'About TerraBites', value: '' },
        ].map((item, i) =>
          React.createElement('div', {
            key: i,
            style: {
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '13px 0',
              borderBottom: `1px solid ${t.border}`,
              cursor: item.action ? 'pointer' : 'default',
            },
            onClick: item.action
          },
            React.createElement(item.icon, { size: 18, color: t.textMuted }),
            React.createElement('div', { style: { flex: 1, fontFamily: 'Fraunces', fontSize: 14, color: t.text } }, item.label),
            item.isToggle
              ? React.createElement('div', { style: {
                  width: 44, height: 24, background: isDark ? t.border : t.accent,
                  borderRadius: 12, position: 'relative', cursor: 'pointer',
                  transition: 'background 0.2s',
                } },
                  React.createElement('div', { style: {
                    width: 18, height: 18, background: '#fff', borderRadius: '50%',
                    position: 'absolute', top: 3,
                    left: isDark ? 3 : 23,
                    transition: 'left 0.2s',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
                  } })
                )
              : React.createElement('div', { style: { fontFamily: 'Fraunces', fontSize: 12, color: t.textFaint } }, item.value)
          )
        )
      )
    );
  }

  const screens = {
    home: HomeScreen,
    map: MapScreen,
    log: LogbookScreen,
    quests: QuestsScreen,
    settings: SettingsScreen,
  };

  const ActiveScreen = screens[activeTab];

  return React.createElement('div', {
    style: {
      minHeight: '100vh',
      background: '#f0f0f0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: 'Fraunces, Georgia, serif',
    }
  },
    React.createElement('style', null, fontLink),

    // Phone frame
    React.createElement('div', {
      style: {
        width: 375,
        height: 812,
        background: t.bg,
        borderRadius: 44,
        overflow: 'hidden',
        boxShadow: '0 30px 80px rgba(0,0,0,0.35), inset 0 0 0 2px rgba(255,255,255,0.1)',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        border: '2px solid rgba(255,255,255,0.08)',
      }
    },

      // Dynamic Island
      React.createElement('div', { style: {
        position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)',
        width: 120, height: 34,
        background: '#000',
        borderRadius: 20,
        zIndex: 100,
      } }),

      // Status bar
      React.createElement('div', {
        style: {
          height: 52, display: 'flex', alignItems: 'flex-end',
          justifyContent: 'space-between',
          padding: '0 28px 8px',
          flexShrink: 0,
        }
      },
        React.createElement('span', { style: { fontFamily: 'Fraunces', fontSize: 12, fontWeight: 700, color: t.text } }, '9:41'),
        React.createElement('div', { style: { display: 'flex', gap: 5, alignItems: 'center' } },
          React.createElement(window.lucide.Wifi, { size: 14, color: t.text }),
          React.createElement(window.lucide.Battery, { size: 16, color: t.text }),
        )
      ),

      // App header bar
      React.createElement('div', { style: {
        padding: '6px 16px 10px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        borderBottom: `2px solid ${t.border}`,
        flexShrink: 0,
      } },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8 } },
          React.createElement('div', { style: { fontSize: 22 } }, '🌿'),
          React.createElement('div', { style: { fontFamily: 'Fraunces', fontSize: 18, fontWeight: 900, color: t.text, fontStyle: 'italic', letterSpacing: -0.5 } }, 'TerraBites'),
        ),
        React.createElement('div', { style: { display: 'flex', gap: 10, alignItems: 'center' } },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
            React.createElement('span', { style: { fontSize: 12 } }, '🔥'),
            React.createElement('span', { style: { fontFamily: 'Fraunces', fontSize: 13, fontWeight: 700, color: t.accent } }, '12'),
          ),
          React.createElement(window.lucide.Bell, { size: 18, color: t.textMuted }),
        )
      ),

      // Screen content
      React.createElement('div', { style: { flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' } },
        React.createElement(ActiveScreen)
      ),

      // Bottom navigation
      React.createElement('div', { style: {
        height: 78,
        background: t.surface,
        borderTop: `2px solid ${t.border}`,
        display: 'flex',
        alignItems: 'flex-start',
        paddingTop: 6,
        flexShrink: 0,
      } },
        ...tabs.map(tab =>
          React.createElement('div', {
            key: tab.id,
            onClick: () => setActiveTab(tab.id),
            style: {
              flex: 1,
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', gap: 3,
              padding: '6px 0',
              cursor: 'pointer',
              opacity: pressedBtn === tab.id ? 0.6 : 1,
              transition: 'opacity 0.1s',
            },
            onMouseDown: () => setPressedBtn(tab.id),
            onMouseUp: () => setPressedBtn(null),
          },
            React.createElement('div', { style: {
              width: 32, height: 32, borderRadius: 2,
              background: activeTab === tab.id ? `${t.accent}22` : 'transparent',
              border: activeTab === tab.id ? `1px solid ${t.accent}44` : '1px solid transparent',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s',
            } },
              React.createElement(tab.icon, { size: 18, color: activeTab === tab.id ? t.accent : t.textMuted })
            ),
            React.createElement('span', { style: {
              fontFamily: 'Fraunces',
              fontSize: 9,
              fontWeight: activeTab === tab.id ? 700 : 400,
              color: activeTab === tab.id ? t.accent : t.textFaint,
              letterSpacing: 0.5,
              lineHeight: 1,
            } }, tab.label)
          )
        )
      )
    )
  );
}
